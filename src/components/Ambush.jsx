import { useEffect, useRef, useState } from 'react';
import { LESSONS } from '../data/path';
import { lessonQuestions, shuffled } from '../state/quiz';
import Glossed from './Glossed';

// "Professor ambush": now and then, while you're actively studying, a pop
// question from a class you've already reached appears. On by default.
const PREF = 'ambush_prefs';
const loadPrefs = () => {
  try {
    return { enabled: true, every: 15, ...JSON.parse(localStorage.getItem(PREF) || '{}') };
  } catch {
    return { enabled: true, every: 15 };
  }
};

const LINES = ['Pop quiz! The professor points at you…', 'Quick, without looking it up:', 'Eyes up front! A question for you:', 'Before you move on, answer me this:'];

export default function Ambush({ progress, activeIdx, paused, onAnswered }) {
  const [prefs, setPrefs] = useState(loadPrefs);
  const [q, setQ] = useState(null);
  const [picked, setPicked] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const activeSeconds = useRef(0);
  const lastInput = useRef(0);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    try {
      localStorage.setItem(PREF, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs]);

  useEffect(() => {
    const mark = () => (lastInput.current = Date.now());
    const evs = ['pointermove', 'keydown', 'wheel', 'touchstart'];
    evs.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = setInterval(() => {
      const active = document.visibilityState === 'visible' && document.hasFocus() && Date.now() - lastInput.current < 30_000;
      if (!prefs.enabled || !active || pausedRef.current || q) return;
      activeSeconds.current += 5;
      if (activeSeconds.current >= prefs.every * 60) {
        activeSeconds.current = 0;
        // ask about classes you've passed, or anything before the current class
        const pool = LESSONS.filter((l, i) => progress.passed[l.id] || i < activeIdx);
        if (!pool.length) return;
        const lesson = pool[Math.floor(Math.random() * pool.length)];
        const qs = lessonQuestions(lesson).filter((x) => x.kind !== 'problem');
        const pick = qs[Math.floor(Math.random() * qs.length)];
        setPicked(null);
        setQ({ ...shuffled({ ...pick, id: `${pick.id}-${Date.now()}` }), line: LINES[Math.floor(Math.random() * LINES.length)], lesson });
      }
    }, 5000);
    return () => {
      clearInterval(id);
      evs.forEach((e) => window.removeEventListener(e, mark));
    };
  }, [prefs, progress.passed, activeIdx, q]);

  const answer = (k) => {
    if (picked != null) return;
    setPicked(k);
    onAnswered?.(q.lesson.id, k === q.correctIndex);
  };

  return (
    <>
      {q && (
        <div className="ambush" role="dialog" aria-label="Pop quiz">
          <div className="ambush-head">
            <span>🎓 {q.line}</span>
            <button type="button" onClick={() => setQ(null)} title="Dismiss">
              ✕
            </button>
          </div>
          <p className="ambush-q">
            <Glossed text={q.question} />
          </p>
          <div className="ambush-opts">
            {q.options.map((o, k) => (
              <button
                key={k}
                type="button"
                className={`option ${picked != null && k === q.correctIndex ? 'right' : ''} ${picked === k && k !== q.correctIndex ? 'wrong' : ''}`}
                onClick={() => answer(k)}
              >
                {o}
              </button>
            ))}
          </div>
          {picked != null && (
            <p className={`ambush-res ${picked === q.correctIndex ? 'ok' : 'no'}`}>
              <strong>{picked === q.correctIndex ? 'Correct!' : 'Not quite.'}</strong> {q.explanation}{' '}
              <span className="notes-hint">({q.lesson.code})</span>
            </p>
          )}
          <div className="ambush-foot">
            <button type="button" className="tl-link-btn" onClick={() => setShowSettings(!showSettings)}>
              Pop-quiz settings
            </button>
            {picked != null && (
              <button type="button" className="btn primary sm" onClick={() => setQ(null)}>
                Back to work
              </button>
            )}
          </div>
          {showSettings && <AmbushSettings prefs={prefs} setPrefs={setPrefs} />}
        </div>
      )}
      <button type="button" className={`ambush-toggle ${prefs.enabled ? 'on' : ''}`} onClick={() => setShowSettings((s) => !s)} title="Pop quizzes">
        🎓
      </button>
      {showSettings && !q && (
        <div className="ambush ambush-settings-only">
          <div className="ambush-head">
            <span>Professor pop quizzes</span>
            <button type="button" onClick={() => setShowSettings(false)}>
              ✕
            </button>
          </div>
          <AmbushSettings prefs={prefs} setPrefs={setPrefs} />
        </div>
      )}
    </>
  );
}

function AmbushSettings({ prefs, setPrefs }) {
  return (
    <div className="ambush-settings">
      <label className="check">
        <input type="checkbox" checked={prefs.enabled} onChange={(e) => setPrefs({ ...prefs, enabled: e.target.checked })} /> Ask me pop questions while I
        study
      </label>
      <label className="control">
        <span className="control-label">
          About every <output>{prefs.every} min</output> of active study
        </span>
        <input type="range" min={3} max={60} step={1} value={prefs.every} onChange={(e) => setPrefs({ ...prefs, every: Number(e.target.value) })} />
      </label>
      <p className="notes-hint">Only counts time when you&apos;re actually active in the app, and never interrupts quizzes or exams.</p>
    </div>
  );
}
