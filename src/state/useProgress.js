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
