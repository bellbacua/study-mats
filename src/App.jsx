import { useState } from 'react';
import { LESSONS } from './data/path';
import LessonView from './components/LessonView';
import Roadmap from './components/Roadmap';
import NotesPanel from './components/NotesPanel';
import Timeline from './components/Timeline';
import GlossaryPage from './components/GlossaryPage';
import ExamsPage from './components/ExamsPage';
import ProgressPage, { streaks } from './components/ProgressPage';
import Ambush from './components/Ambush';
import StudyGuide from './components/StudyGuide';
import NotesPage from './components/NotesPage';
import ReviewPage from './components/ReviewPage';
import { dueCards } from './state/review';
import { useProgress } from './state/useProgress';

export default function App() {
  const { state, status, actions: store } = useProgress();
  const [view, setView] = useState('roadmap');
  const [guideWeek, setGuideWeek] = useState(null);

  const idx = Math.max(0, LESSONS.findIndex((l) => l.id === state.activeLessonId));
  const lesson = LESSONS[idx];
  const nextUp = LESSONS.find((l) => !state.passed[l.id]) || null;
  const done = Object.keys(state.passed).length;
  const streak = streaks(state.days).current;
  const dueNow = dueCards(state.passed, state.review).length;

  const actions = {
    ...store,
    open: (id) => {
      store.setActive(id);
      setView('lesson');
      window.scrollTo({ top: 0 });
    },
  };

  const saveMode = status.mode === 'sqlite' ? 'sqlite' : status.mode === 'offline' ? 'offline' : 'loading';

  if (guideWeek) return <StudyGuide week={guideWeek} notes={state.notes} onClose={() => setGuideWeek(null)} />;

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
          <button type="button" className={view === 'review' ? 'on' : ''} onClick={() => setView('review')}>
            Review{dueNow > 0 && <span className="nav-badge">{dueNow}</span>}
          </button>
          <button type="button" className={view === 'timeline' ? 'on' : ''} onClick={() => setView('timeline')}>
            Timeline
          </button>
          <button type="button" className={view === 'glossary' ? 'on' : ''} onClick={() => setView('glossary')}>
            Glossary
          </button>
          <button type="button" className={view === 'notes' ? 'on' : ''} onClick={() => setView('notes')}>
            My notes
          </button>
          <button type="button" className={view === 'exams' ? 'on' : ''} onClick={() => setView('exams')}>
            Exams
          </button>
          <button type="button" className={view === 'progress' ? 'on' : ''} onClick={() => setView('progress')}>
            Progress
          </button>
        </nav>
        <div className="topbar-right">
          <span className={`save-dot ${saveMode}`} title={saveMode === 'sqlite' ? 'Saved to SQLite' : 'Not saving to the database'} />
          {streak > 0 && (
            <button type="button" className="streak" onClick={() => setView('progress')} title="Study streak">
              🔥 {streak}
            </button>
          )}
          <span className="count">
            {done}/{LESSONS.length}
          </span>
        </div>
      </header>

      <main className="main">
        {view === 'roadmap' ? (
          <Roadmap progress={state} nextUp={nextUp} onOpen={actions.open} status={saveMode} dueNow={dueNow} onReview={() => setView('review')} />
        ) : view === 'review' ? (
          <ReviewPage progress={state} actions={actions} />
        ) : view === 'timeline' ? (
          <Timeline progress={state} onOpen={actions.open} />
        ) : view === 'notes' ? (
          <NotesPage notes={state.notes} onOpen={actions.open} />
        ) : view === 'glossary' ? (
          <GlossaryPage onOpen={actions.open} />
        ) : view === 'exams' ? (
          <ExamsPage progress={state} actions={actions} />
        ) : view === 'progress' ? (
          <ProgressPage progress={state} nextUp={nextUp} onOpen={actions.open} onPrintWeek={setGuideWeek} />
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

      <Ambush progress={state} activeIdx={idx} paused={view === 'exams'} onAnswered={() => actions.logActivity()} />
      <NotesPanel lesson={lesson} notes={state.notes} scratch={state.scratch} onNote={actions.setNote} />
    </div>
  );
}
