import { useCallback, useEffect, useRef, useState } from 'react';
import {
  initializeProgress,
  subscribeStorageStatus,
  syncBrainDump,
  syncCompleteLab,
  syncPassLesson,
  syncSettings,
  syncToggleReading,
  safeSetStorage,
  STORAGE_KEYS,
} from '../services/storageService';
import { mergeWithServer, onServerNewer, saveNote } from './noteJournal';

// Thin React wrapper over the existing SQLite storage service.
const EMPTY = {
  activeLessonId: 'math-001',
  passed: {},
  labs: {},
  readings: {},
  notes: {},
  scratch: '',
  exams: {},
  days: {},
  review: {},
  items: {},
};

const REVIEW_KEY = 'um_mate_review_cards';
const loadLocalReview = () => {
  try {
    return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}');
  } catch {
    return {};
  }
};

// The study plan, missed questions and "explain it back" answers. The
// database copy is the main one; this browser keeps a copy too, so nothing is
// lost if a save does not reach the database.
const ITEMS_KEY = 'study_mats_items';
const loadLocalItems = () => {
  try {
    return JSON.parse(localStorage.getItem(ITEMS_KEY) || '{}');
  } catch {
    return {};
  }
};
const mergeItems = (local, server = {}) => {
  const out = {};
  for (const kind of new Set([...Object.keys(local), ...Object.keys(server)])) {
    const merged = { ...local[kind] };
    // The newer copy of each item wins (items carry their own "at" time).
    for (const [id, v] of Object.entries(server[kind] || {})) if (!merged[id] || (v?.at || 0) >= (merged[id]?.at || 0)) merged[id] = v;
    for (const [id, v] of Object.entries(merged)) if (v == null) delete merged[id];
    out[kind] = merged;
  }
  return out;
};

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const post = (url, body) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});

export function useProgress() {
  const [state, setState] = useState(EMPTY);
  const [status, setStatus] = useState({ mode: 'loading' });
  const latest = useRef(state);
  latest.current = state;

  useEffect(() => subscribeStorageStatus(setStatus), []);

  useEffect(() => {
    let cancelled = false;
    initializeProgress().then(({ progress }) => {
      if (cancelled || !progress) return;
      setState({
        activeLessonId: progress.activeLessonId || 'math-001',
        passed: progress.passedLessons || {},
        labs: progress.completedLabs || {},
        readings: progress.completedReadings || {},
        notes: mergeWithServer(progress.lessonNotes || {}, progress.lessonNotesAt || {}),
        scratch: progress.brainDump || '',
        exams: progress.examResults || {},
        days: progress.studyDays || {},
        review: { ...loadLocalReview(), ...progress.reviewCards },
        items: mergeItems(loadLocalItems(), progress.learnerItems),
        loaded: true,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const patch = useCallback((key, fn) => {
    setState((prev) => ({ ...prev, [key]: typeof fn === 'function' ? fn(prev[key]) : fn }));
  }, []);

  // A newer copy of a note was found on the server: show it.
  useEffect(() => onServerNewer((id, text) => patch('notes', (m) => ({ ...m, [id]: text }))), [patch]);

  // Study calendar: count an action (and optionally active minutes) for today.
  const logActivity = useCallback(
    (actions = 1, minutes = 0) => {
      const day = today();
      patch('days', (d) => ({ ...d, [day]: { actions: (d[day]?.actions || 0) + actions, minutes: (d[day]?.minutes || 0) + minutes } }));
      post('/api/progress/activity', { day, actions, minutes });
    },
    [patch]
  );

  // Count a minute of study whenever you were active in the app during it.
  useEffect(() => {
    let lastInput = 0;
    const mark = () => (lastInput = Date.now());
    const events = ['pointermove', 'keydown', 'wheel', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInput < 60_000) logActivity(0, 1);
    }, 60_000);
    return () => {
      clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, mark));
    };
  }, [logActivity]);

  const actions = {
    setActive: useCallback(
      (id) => {
        patch('activeLessonId', id);
        safeSetStorage(STORAGE_KEYS.ACTIVE_LESSON, id);
        syncSettings({ activeLessonId: id });
      },
      [patch]
    ),
    markLab: useCallback(
      (id) => {
        if (latest.current.labs[id]) return;
        patch('labs', (m) => ({ ...m, [id]: true }));
        syncCompleteLab(id, true);
        logActivity();
      },
      [patch, logActivity]
    ),
    pass: useCallback(
      (id, score) => {
        const passedAt = new Date().toISOString();
        patch('passed', (m) => ({ ...m, [id]: { score, passedAt } }));
        syncPassLesson(id, score, passedAt);
        logActivity();
      },
      [patch, logActivity]
    ),
    toggleReading: useCallback(
      (id) => {
        const done = !latest.current.readings[id];
        patch('readings', (m) => {
          const next = { ...m };
          if (done) next[id] = true;
          else delete next[id];
          return next;
        });
        syncToggleReading(id, done);
      },
      [patch]
    ),
    setNote: useCallback(
      (id, text) => {
        patch('notes', (m) => ({ ...m, [id]: text }));
        saveNote(id, text);
      },
      [patch]
    ),
    saveExam: useCallback(
      (examId, score, total, detail) => {
        const entry = { score, total, detail, takenAt: new Date().toISOString() };
        patch('exams', (m) => ({ ...m, [examId]: [...(m[examId] || []), entry] }));
        post('/api/progress/exam', { examId, score, total, detail });
        logActivity();
      },
      [patch, logActivity]
    ),
    reviewAnswer: useCallback(
      (cardId, lessonId, next) => {
        patch('review', (m) => {
          const merged = { ...m, [cardId]: { lessonId, ...next, seen: (m[cardId]?.seen || 0) + 1 } };
          try {
            localStorage.setItem(REVIEW_KEY, JSON.stringify(merged));
          } catch {
            // the server copy is the main one
          }
          return merged;
        });
        post('/api/progress/review', { cardId, lessonId, ...next });
        logActivity();
      },
      [patch, logActivity]
    ),
    // A finished part of a class. Stored with the readings (id "part:<class>:<n>").
    markPart: useCallback(
      (lessonId, n) => {
        const id = `part:${lessonId}:${n}`;
        if (latest.current.readings[id]) return;
        patch('readings', (m) => ({ ...m, [id]: true }));
        syncToggleReading(id, true);
        logActivity();
      },
      [patch, logActivity]
    ),
    // Save one item of a kind ('plan', 'miss', 'explain'); null removes it.
    setItem: useCallback(
      (kind, id, data) => {
        const value = data == null ? null : { ...data, at: Date.now() };
        patch('items', (all) => {
          const list = { ...all[kind] };
          if (value) list[id] = value;
          else delete list[id];
          const next = { ...all, [kind]: list };
          try {
            localStorage.setItem(ITEMS_KEY, JSON.stringify(next));
          } catch {
            // the database copy is the main one
          }
          return next;
        });
        post('/api/progress/item', { kind, itemId: id, data: value });
      },
      [patch]
    ),
    logActivity,
    setScratch: useCallback(
      (text) => {
        patch('scratch', text);
        syncBrainDump(text);
      },
      [patch]
    ),
  };

  return { state, status, actions };
}
