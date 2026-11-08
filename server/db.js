import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_PATH = process.env.STUDY_DB_PATH || path.join(DATA_DIR, 'study_mats.db');

let dbInstance = null;

const DEFAULT_BRAIN_DUMP = `• Why does Al₂O₃ need 2 Al and 3 O? (+6 and -6 = 0)
• Ask UM Registrar about GE subject crediting from CS degree`;

export function getDb() {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');

  // Initialize schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS passed_lessons (
      lesson_id TEXT PRIMARY KEY,
      score INTEGER NOT NULL DEFAULT 100,
      passed_at TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS completed_labs (
      lesson_id TEXT PRIMARY KEY,
      completed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS completed_readings (
      reading_id TEXT PRIMARY KEY,
      completed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS brain_dump (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      notes TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS lesson_notes (
      lesson_id TEXT PRIMARY KEY,
      notes TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS exam_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      detail TEXT NOT NULL DEFAULT '{}',
      taken_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS study_days (
      day TEXT PRIMARY KEY,
      actions INTEGER NOT NULL DEFAULT 0,
      minutes INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS review_cards (
      card_id TEXT PRIMARY KEY,
      lesson_id TEXT NOT NULL,
      box INTEGER NOT NULL DEFAULT 0,
      due TEXT NOT NULL,
      seen INTEGER NOT NULL DEFAULT 0,
      lapses INTEGER NOT NULL DEFAULT 0,
      last_seen TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS note_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id TEXT NOT NULL,
      notes TEXT NOT NULL,
      saved_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // When each note was last written on the device (ms since epoch), so the
  // newest copy wins when a browser and the server disagree.
  const noteCols = db.prepare('PRAGMA table_info(lesson_notes)').all().map((c) => c.name);
  if (!noteCols.includes('client_at')) db.exec('ALTER TABLE lesson_notes ADD COLUMN client_at INTEGER NOT NULL DEFAULT 0');

  // Seed default brain dump if not exists
  const existingNotes = db.prepare('SELECT notes FROM brain_dump WHERE id = 1').get();
  if (!existingNotes) {
    db.prepare('INSERT INTO brain_dump (id, notes) VALUES (1, ?)').run(DEFAULT_BRAIN_DUMP);
  }

  // Seed default settings if not exists
  const initSetting = db.prepare('INSERT OR IGNORE INTO app_settings (key, value) VALUES (?, ?)');
  initSetting.run('activeLessonId', 'math-001');
  initSetting.run('overtimeMode', 'false');
  initSetting.run('streakShields', '3');

  dbInstance = db;
  return dbInstance;
}

export function getProgress() {
  const db = getDb();

  // Settings
  const settingsRows = db.prepare('SELECT key, value FROM app_settings').all();
  const settings = {};
  for (const row of settingsRows) {
    settings[row.key] = row.value;
  }

  // Passed lessons
  const passedRows = db.prepare('SELECT lesson_id, score, passed_at FROM passed_lessons').all();
  const passedLessons = {};
  for (const row of passedRows) {
    passedLessons[row.lesson_id] = {
      score: row.score,
      passedAt: row.passed_at,
    };
  }

  // Completed labs
  const labRows = db.prepare('SELECT lesson_id FROM completed_labs').all();
  const completedLabs = {};
  for (const row of labRows) {
    completedLabs[row.lesson_id] = true;
  }

  // Completed readings
  const readingRows = db.prepare('SELECT reading_id FROM completed_readings').all();
  const completedReadings = {};
  for (const row of readingRows) {
    completedReadings[row.reading_id] = true;
  }

  // Brain dump
  const brainRow = db.prepare('SELECT notes FROM brain_dump WHERE id = 1').get();
  const brainDump = brainRow ? brainRow.notes : DEFAULT_BRAIN_DUMP;

  const lessonNotes = {};
  const lessonNotesAt = {};
  for (const row of db.prepare('SELECT lesson_id, notes, client_at FROM lesson_notes').all()) {
    lessonNotes[row.lesson_id] = row.notes;
    lessonNotesAt[row.lesson_id] = row.client_at;
  }

  const examResults = {};
  for (const row of db.prepare('SELECT exam_id, score, total, detail, taken_at FROM exam_results ORDER BY id').all()) {
    (examResults[row.exam_id] ||= []).push({ score: row.score, total: row.total, detail: JSON.parse(row.detail), takenAt: row.taken_at });
  }
  const studyDays = {};
  for (const row of db.prepare('SELECT day, actions, minutes FROM study_days').all()) {
    studyDays[row.day] = { actions: row.actions, minutes: row.minutes };
  }

  // Spaced review: where each question sits in the 1, 3, 10, 30, 90 day ladder
  const reviewCards = {};
  for (const row of db.prepare('SELECT card_id, lesson_id, box, due, seen, lapses FROM review_cards').all()) {
    reviewCards[row.card_id] = { lessonId: row.lesson_id, box: row.box, due: row.due, seen: row.seen, lapses: row.lapses };
  }

  const isFresh =
    Object.keys(passedLessons).length === 0 &&
    Object.keys(completedLabs).length === 0 &&
    Object.keys(completedReadings).length === 0;

  return {
    activeLessonId: settings.activeLessonId || 'math-001',
    overtimeMode: settings.overtimeMode === 'true',
    streakShields: settings.streakShields ? Number(settings.streakShields) : 3,
    brainDump,
    passedLessons,
    completedLabs,
    completedReadings,
    lessonNotes,
    lessonNotesAt,
    examResults,
    studyDays,
    reviewCards,
    isFresh,
  };
}

export function saveExamResult(examId, score, total, detail) {
  getDb()
    .prepare('INSERT INTO exam_results (exam_id, score, total, detail) VALUES (?, ?, ?, ?)')
    .run(examId, score, total, JSON.stringify(detail || {}));
  return { examId, score, total };
}

// One row per local calendar day; `minutes` is active study time.
export function saveReviewCard(cardId, lessonId, box, due, lapses) {
  getDb()
    .prepare(
      `INSERT INTO review_cards (card_id, lesson_id, box, due, seen, lapses, last_seen) VALUES (?, ?, ?, ?, 1, ?, datetime('now'))
       ON CONFLICT(card_id) DO UPDATE SET box = excluded.box, due = excluded.due, seen = review_cards.seen + 1, lapses = excluded.lapses, last_seen = excluded.last_seen`
    )
    .run(cardId, lessonId, box, due, lapses);
  return { cardId, box, due };
}

export function logStudyDay(day, actions = 1, minutes = 0) {
  getDb()
    .prepare(
      `INSERT INTO study_days (day, actions, minutes) VALUES (?, ?, ?)
       ON CONFLICT(day) DO UPDATE SET actions = actions + excluded.actions, minutes = minutes + excluded.minutes`
    )
    .run(day, actions, minutes);
  return { day };
}

// Newest write wins. Older writes (an old tab, a stale device) are refused
// and the caller gets the newer server copy back. Before a big change, the
// previous text is kept in note_versions so it can always be recovered.
export function saveLessonNote(lessonId, notes, clientAt = Date.now()) {
  const db = getDb();
  const cur = db.prepare('SELECT notes, client_at FROM lesson_notes WHERE lesson_id = ?').get(lessonId);
  if (cur && cur.client_at > clientAt) {
    return { lessonId, stored: false, notes: cur.notes, clientAt: cur.client_at };
  }
  if (cur && cur.notes && cur.notes !== notes) {
    const last = db.prepare('SELECT saved_at FROM note_versions WHERE lesson_id = ? ORDER BY id DESC LIMIT 1').get(lessonId);
    const lastMs = last ? Date.parse(`${last.saved_at.replace(' ', 'T')}Z`) : 0;
    const shrank = notes.length < cur.notes.length * 0.8;
    if (shrank || Date.now() - lastMs > 5 * 60_000) {
      db.prepare('INSERT INTO note_versions (lesson_id, notes) VALUES (?, ?)').run(lessonId, cur.notes);
    }
  }
  db.prepare(`
    INSERT INTO lesson_notes (lesson_id, notes, client_at, updated_at)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(lesson_id) DO UPDATE SET notes = excluded.notes, client_at = excluded.client_at, updated_at = excluded.updated_at
  `).run(lessonId, notes, clientAt);
  return { lessonId, stored: true, clientAt };
}

export function noteVersions(lessonId) {
  return getDb().prepare('SELECT id, notes, saved_at FROM note_versions WHERE lesson_id = ? ORDER BY id DESC LIMIT 50').all(lessonId);
}

export function saveProgress(progress) {
  const db = getDb();

  db.exec('BEGIN TRANSACTION');
  try {
    if (progress.activeLessonId !== undefined) {
      db.prepare(`
        INSERT INTO app_settings (key, value, updated_at)
        VALUES ('activeLessonId', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(String(progress.activeLessonId));
    }

    if (progress.overtimeMode !== undefined) {
      db.prepare(`
        INSERT INTO app_settings (key, value, updated_at)
        VALUES ('overtimeMode', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(String(progress.overtimeMode));
    }

    if (progress.streakShields !== undefined) {
      db.prepare(`
        INSERT INTO app_settings (key, value, updated_at)
        VALUES ('streakShields', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(String(progress.streakShields));
    }

    if (progress.brainDump !== undefined) {
      db.prepare(`
        INSERT INTO brain_dump (id, notes, updated_at)
        VALUES (1, ?, datetime('now'))
        ON CONFLICT(id) DO UPDATE SET notes = excluded.notes, updated_at = excluded.updated_at
      `).run(String(progress.brainDump));
    }

    if (progress.passedLessons && typeof progress.passedLessons === 'object') {
      const stmt = db.prepare(`
        INSERT INTO passed_lessons (lesson_id, score, passed_at, updated_at)
        VALUES (?, ?, ?, datetime('now'))
        ON CONFLICT(lesson_id) DO UPDATE SET
          score = excluded.score,
          passed_at = excluded.passed_at,
          updated_at = excluded.updated_at
      `);
      for (const [lessonId, data] of Object.entries(progress.passedLessons)) {
        const score = typeof data === 'object' && data.score !== undefined ? data.score : 100;
        const passedAt =
          typeof data === 'object' && data.passedAt ? data.passedAt : new Date().toISOString();
        stmt.run(lessonId, score, passedAt);
      }
    }

    if (progress.completedLabs && typeof progress.completedLabs === 'object') {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO completed_labs (lesson_id, completed_at)
        VALUES (?, datetime('now'))
      `);
      for (const [lessonId, isDone] of Object.entries(progress.completedLabs)) {
        if (isDone) {
          stmt.run(lessonId);
        } else {
          db.prepare('DELETE FROM completed_labs WHERE lesson_id = ?').run(lessonId);
        }
      }
    }

    if (progress.completedReadings && typeof progress.completedReadings === 'object') {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO completed_readings (reading_id, completed_at)
        VALUES (?, datetime('now'))
      `);
      for (const [readingId, isDone] of Object.entries(progress.completedReadings)) {
        if (isDone) {
          stmt.run(readingId);
        } else {
          db.prepare('DELETE FROM completed_readings WHERE reading_id = ?').run(readingId);
        }
      }
    }

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  return getProgress();
}

export function passLesson(lessonId, score, passedAt) {
  const db = getDb();
  const time = passedAt || new Date().toISOString();
  db.prepare(`
    INSERT INTO passed_lessons (lesson_id, score, passed_at, updated_at)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(lesson_id) DO UPDATE SET
      score = excluded.score,
      passed_at = excluded.passed_at,
      updated_at = excluded.updated_at
  `).run(lessonId, score, time);

  return { lessonId, score, passedAt: time };
}

export function completeLab(lessonId, completed = true) {
  const db = getDb();
  if (completed) {
    db.prepare(`
      INSERT OR IGNORE INTO completed_labs (lesson_id, completed_at)
      VALUES (?, datetime('now'))
    `).run(lessonId);
  } else {
    db.prepare('DELETE FROM completed_labs WHERE lesson_id = ?').run(lessonId);
  }
  return { lessonId, completed };
}

export function toggleReading(readingId, completed) {
  const db = getDb();
  if (completed) {
    db.prepare(`
      INSERT OR IGNORE INTO completed_readings (reading_id, completed_at)
      VALUES (?, datetime('now'))
    `).run(readingId);
  } else {
    db.prepare('DELETE FROM completed_readings WHERE reading_id = ?').run(readingId);
  }
  return { readingId, completed };
}

export function updateSettings(settings) {
  const db = getDb();
  db.exec('BEGIN TRANSACTION');
  try {
    for (const [key, val] of Object.entries(settings)) {
      db.prepare(`
        INSERT INTO app_settings (key, value, updated_at)
        VALUES (?, ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(key, String(val));
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return settings;
}

export function saveBrainDump(notes) {
  const db = getDb();
  db.prepare(`
    INSERT INTO brain_dump (id, notes, updated_at)
    VALUES (1, ?, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET notes = excluded.notes, updated_at = excluded.updated_at
  `).run(notes);
  return { notes };
}

export function resetProgress() {
  const db = getDb();
  db.exec('BEGIN TRANSACTION');
  try {
    db.exec('DELETE FROM passed_lessons;');
    db.exec('DELETE FROM completed_labs;');
    db.exec('DELETE FROM completed_readings;');
    db.exec('DELETE FROM app_settings;');
    db.exec('DELETE FROM brain_dump;');

    db.prepare('INSERT INTO brain_dump (id, notes) VALUES (1, ?)').run(DEFAULT_BRAIN_DUMP);

    const initSetting = db.prepare('INSERT INTO app_settings (key, value) VALUES (?, ?)');
    initSetting.run('activeLessonId', 'math-001');
    initSetting.run('overtimeMode', 'false');
    initSetting.run('streakShields', '3');

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  return getProgress();
}

export function getStats() {
  const db = getDb();
  const passedCount = db.prepare('SELECT COUNT(*) as count FROM passed_lessons').get().count;
  const labsCount = db.prepare('SELECT COUNT(*) as count FROM completed_labs').get().count;
  const readingsCount = db.prepare('SELECT COUNT(*) as count FROM completed_readings').get().count;

  let fileSizeBytes = 0;
  try {
    if (fs.existsSync(DB_PATH)) {
      fileSizeBytes = fs.statSync(DB_PATH).size;
    }
  } catch {
    // ignore
  }

  return {
    dbPath: DB_PATH,
    fileSizeBytes,
    passedCount,
    labsCount,
    readingsCount,
  };
}
