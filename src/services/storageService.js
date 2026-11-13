/**
 * Storage service interfacing with the SQLite backend (/api/progress)
 * with robust offline fallback to browser localStorage and auto-migration.
 */

export const STORAGE_KEYS = {
  ACTIVE_LESSON: 'um_mate_active_lesson',
  COMPLETED_LABS: 'um_mate_completed_labs',
  PASSED_LESSONS: 'um_mate_passed_lessons',
  COMPLETED_READINGS: 'um_mate_completed_readings',
  OVERTIME_MODE: 'um_mate_overtime_mode',
  STREAK_SHIELDS: 'um_mate_streak_shields',
  BRAIN_DUMP: 'um_mate_brain_dump',
};

export const DEFAULT_BRAIN_DUMP = `• Why does Al₂O₃ need 2 Al and 3 O? (+6 and -6 = 0)
• Ask UM Registrar about GE subject crediting from CS degree`;

export function safeGetStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
}

export function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // safely ignore
  }
}

// Global sync listeners
const statusListeners = new Set();
let currentStatus = {
  mode: 'sqlite', // 'sqlite' | 'offline'
  state: 'synced', // 'saving' | 'synced' | 'error'
  lastSaved: null,
  dbPath: 'data/study_mats.db',
  error: null,
};

export function subscribeStorageStatus(callback) {
  statusListeners.add(callback);
  callback(currentStatus);
  return () => statusListeners.delete(callback);
}

function updateStatus(patch) {
  currentStatus = { ...currentStatus, ...patch };
  for (const listener of statusListeners) {
    listener(currentStatus);
  }
}

/**
 * Reads local storage snapshot to see if there is any existing pre-SQLite progress
 */
export function getLocalStorageSnapshot() {
  let completedLabs = {};
  let passedLessons = {};
  let completedReadings = {};

  try {
    completedLabs = JSON.parse(safeGetStorage(STORAGE_KEYS.COMPLETED_LABS, '{}'));
  } catch {
    completedLabs = {};
  }

  try {
    passedLessons = JSON.parse(safeGetStorage(STORAGE_KEYS.PASSED_LESSONS, '{}'));
  } catch {
    passedLessons = {};
  }

  try {
    completedReadings = JSON.parse(safeGetStorage(STORAGE_KEYS.COMPLETED_READINGS, '{}'));
  } catch {
    completedReadings = {};
  }

  const activeLessonId = safeGetStorage(STORAGE_KEYS.ACTIVE_LESSON, 'math-001');
  const overtimeMode = safeGetStorage(STORAGE_KEYS.OVERTIME_MODE, 'false') === 'true';
  const streakShieldsSaved = safeGetStorage(STORAGE_KEYS.STREAK_SHIELDS, null);
  const streakShields = streakShieldsSaved !== null ? Number(streakShieldsSaved) : 3;
  const brainDump = safeGetStorage(STORAGE_KEYS.BRAIN_DUMP, DEFAULT_BRAIN_DUMP);

  const hasLocalData =
    Object.keys(passedLessons).length > 0 ||
    Object.keys(completedLabs).length > 0 ||
    Object.keys(completedReadings).length > 0 ||
    brainDump !== DEFAULT_BRAIN_DUMP;

  return {
    activeLessonId,
    overtimeMode,
    streakShields,
    brainDump,
    passedLessons,
    completedLabs,
    completedReadings,
    hasLocalData,
  };
}

/**
 * Initializes app data from SQLite backend.
 * If SQLite is fresh/empty and localStorage has prior data, automatically migrates to SQLite.
 */
export async function initializeProgress() {
  try {
    const res = await fetch('/api/progress');
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch progress');
    }

    const localSnapshot = getLocalStorageSnapshot();

    // If SQLite is fresh and user had data in browser localStorage, auto-migrate to SQLite
    if (data.isFresh && localSnapshot.hasLocalData) {
      updateStatus({ mode: 'sqlite', state: 'saving' });
      const syncRes = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localSnapshot),
      });
      if (syncRes.ok) {
        const synced = await syncRes.json();
        updateStatus({
          mode: 'sqlite',
          state: 'synced',
          lastSaved: new Date().toLocaleTimeString(),
        });
        return {
          source: 'sqlite-migrated',
          progress: synced.progress,
        };
      }
    }

    // SQLite has data or is ready
    updateStatus({
      mode: 'sqlite',
      state: 'synced',
      lastSaved: new Date().toLocaleTimeString(),
    });

    // Mirror to localStorage as cache
    mirrorToLocalStorage(data);

    return {
      source: 'sqlite',
      progress: {
        activeLessonId: data.activeLessonId,
        overtimeMode: data.overtimeMode,
        streakShields: data.streakShields,
        brainDump: data.brainDump,
        passedLessons: data.passedLessons,
        completedLabs: data.completedLabs,
        completedReadings: data.completedReadings,
        lessonNotes: data.lessonNotes,
        lessonNotesAt: data.lessonNotesAt,
        examResults: data.examResults,
        studyDays: data.studyDays,
        reviewCards: data.reviewCards,
        learnerItems: data.learnerItems,
      },
    };
  } catch (err) {
    console.warn('SQLite backend unreachable, using localStorage fallback:', err);
    updateStatus({
      mode: 'offline',
      state: 'error',
      error: err.message,
    });

    const local = getLocalStorageSnapshot();
    return {
      source: 'local',
      progress: local,
    };
  }
}

function mirrorToLocalStorage(data) {
  if (data.activeLessonId !== undefined) {
    safeSetStorage(STORAGE_KEYS.ACTIVE_LESSON, data.activeLessonId);
  }
  if (data.overtimeMode !== undefined) {
    safeSetStorage(STORAGE_KEYS.OVERTIME_MODE, String(data.overtimeMode));
  }
  if (data.streakShields !== undefined) {
    safeSetStorage(STORAGE_KEYS.STREAK_SHIELDS, String(data.streakShields));
  }
  if (data.brainDump !== undefined) {
    safeSetStorage(STORAGE_KEYS.BRAIN_DUMP, data.brainDump);
  }
  if (data.passedLessons !== undefined) {
    safeSetStorage(STORAGE_KEYS.PASSED_LESSONS, JSON.stringify(data.passedLessons));
  }
  if (data.completedLabs !== undefined) {
    safeSetStorage(STORAGE_KEYS.COMPLETED_LABS, JSON.stringify(data.completedLabs));
  }
  if (data.completedReadings !== undefined) {
    safeSetStorage(STORAGE_KEYS.COMPLETED_READINGS, JSON.stringify(data.completedReadings));
  }
}

/**
 * Record a passed gate into SQLite & localStorage
 */
export async function syncPassLesson(lessonId, score, passedAt) {
  updateStatus({ state: 'saving' });
  try {
    const res = await fetch('/api/progress/pass-lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, score, passedAt }),
    });
    if (res.ok) {
      updateStatus({
        mode: 'sqlite',
        state: 'synced',
        lastSaved: new Date().toLocaleTimeString(),
      });
    } else {
      updateStatus({ mode: 'offline', state: 'error' });
    }
  } catch (err) {
    updateStatus({ mode: 'offline', state: 'error', error: err.message });
  }
}

/**
 * Record completed lab in SQLite & localStorage
 */
export async function syncCompleteLab(lessonId, completed = true) {
  updateStatus({ state: 'saving' });
  try {
    const res = await fetch('/api/progress/complete-lab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, completed }),
    });
    if (res.ok) {
      updateStatus({
        mode: 'sqlite',
        state: 'synced',
        lastSaved: new Date().toLocaleTimeString(),
      });
    } else {
      updateStatus({ mode: 'offline', state: 'error' });
    }
  } catch (err) {
    updateStatus({ mode: 'offline', state: 'error', error: err.message });
  }
}

/**
 * Toggle reading completion in SQLite & localStorage
 */
export async function syncToggleReading(readingId, completed) {
  updateStatus({ state: 'saving' });
  try {
    const res = await fetch('/api/progress/toggle-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readingId, completed }),
    });
    if (res.ok) {
      updateStatus({
        mode: 'sqlite',
        state: 'synced',
        lastSaved: new Date().toLocaleTimeString(),
      });
    } else {
      updateStatus({ mode: 'offline', state: 'error' });
    }
  } catch (err) {
    updateStatus({ mode: 'offline', state: 'error', error: err.message });
  }
}

/**
 * Debounced brain dump saver to avoid spamming database on every keystroke
 */
let brainDumpTimeout = null;
export function syncBrainDump(notes) {
  safeSetStorage(STORAGE_KEYS.BRAIN_DUMP, notes);
  updateStatus({ state: 'saving' });

  if (brainDumpTimeout) clearTimeout(brainDumpTimeout);

  brainDumpTimeout = setTimeout(async () => {
    try {
      const res = await fetch('/api/progress/brain-dump', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        updateStatus({
          mode: 'sqlite',
          state: 'synced',
          lastSaved: new Date().toLocaleTimeString(),
        });
      } else {
        updateStatus({ mode: 'offline', state: 'error' });
      }
    } catch (err) {
      updateStatus({ mode: 'offline', state: 'error', error: err.message });
    }
  }, 400);
}

/**
 * Update app settings in SQLite & localStorage
 */
export async function syncSettings(settings) {
  updateStatus({ state: 'saving' });
  try {
    const res = await fetch('/api/progress/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      updateStatus({
        mode: 'sqlite',
        state: 'synced',
        lastSaved: new Date().toLocaleTimeString(),
      });
    } else {
      updateStatus({ mode: 'offline', state: 'error' });
    }
  } catch (err) {
    updateStatus({ mode: 'offline', state: 'error', error: err.message });
  }
}

/**
 * Reset all progress in SQLite and clear localStorage
 */
export async function resetAllProgress() {
  updateStatus({ state: 'saving' });
  try {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }

    const res = await fetch('/api/progress/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      updateStatus({
        mode: 'sqlite',
        state: 'synced',
        lastSaved: new Date().toLocaleTimeString(),
      });
      return data.progress;
    }
  } catch (err) {
    updateStatus({ mode: 'offline', state: 'error', error: err.message });
  }
  return null;
}
