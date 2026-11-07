import { useCallback, useMemo, useState } from 'react';
import { LESSONS } from './data/curriculum';
import LessonView from './components/LessonView';
import Roadmap from './components/Roadmap';
import { useProgress } from './state/useProgress';

export default function App() {
  const { state, status, update, logAttempt } = useProgress();
  const [view, setView] = useState('roadmap');

  const idx = Math.max(0, LESSONS.findIndex((l) => l.id === state.activeLessonId));
  const lesson = LESSONS[idx];
  const nextUp = LESSONS.find((l) => !state.passed[l.id]) || null;
  const done = Object.keys(state.passed).length;

  const actions = useMemo(
    () => ({
      open: (id) => {
        update('activeLessonId', id);
        setView('lesson');
        window.scrollTo({ top: 0 });
      },
      markLab: (id) => update('labs', (m) => (m[id] ? m : { ...m, [id]: true })),
      pass: (id, score) => update('passed', (m) => ({ ...m, [id]: { score, passedAt: new Date().toISOString() } })),
      toggleReading: (id) =>
        update('readings', (m) => {
          const next = { ...m };
          if (next[id]) delete next[id];
          else next[id] = true;
          return next;
        }),
      setNote: (id, text) => update('notes', (m) => ({ ...m, [id]: text })),
      attempt: (lessonId, itemId, ok) => logAttempt(lessonId, itemId, ok),
    }),
    [update, logAttempt]
  );

  const openLesson = useCallback((id) => actions.open(id), [actions]);

  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => setView('roadmap')}>
          <span className="brand-mark">∂</span>
          <span>Study Mats</span>
        </button>
        <nav className="topnav">
          <button type="button" className={view === 'roadmap' ? 'on' : ''} onClick={() => setView('roadmap')}>
            Roadmap
          </button>
          <button type="button" className={view === 'lesson' ? 'on' : ''} onClick={() => setView('lesson')}>
            Lesson {idx + 1}
          </button>
        </nav>
        <div className="topbar-right">
          <span className="count">
            {done}/{LESSONS.length}
          </span>
          {status === 'sqlite' && (
            <a className="btn ghost sm" href="/api/export" download>
              Back up
            </a>
          )}
        </div>
      </header>

      <main className="main">
        {view === 'roadmap' ? (
          <Roadmap progress={state} nextUp={nextUp} onOpen={openLesson} status={status} />
        ) : (
          <LessonView
            lesson={lesson}
            index={idx}
            total={LESSONS.length}
            progress={state}
            actions={actions}
            prevLesson={LESSONS[idx - 1]}
            nextLesson={LESSONS[idx + 1]}
          />
        )}
      </main>
    </div>
  );
}
