import { useMemo, useState } from 'react';
import { LESSONS, ALL_LESSONS, TRACKS, PROGRAMS, trackLessons, trackClassState, openSlots, sideByWeek, weekNumber } from './data/path';
import LessonView from './components/LessonView';
import Roadmap from './components/Roadmap';
import NotesPanel from './components/NotesPanel';
import TopNav from './components/TopNav';
import ProgramPage from './components/ProgramPage';
import Welcome from './components/Welcome';
import Timeline from './components/Timeline';
import LibraryPage from './components/LibraryPage';
import PathwaysPage from './components/PathwaysPage';
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

  // The open class may be a core class or one from a specialization track.
  const active = ALL_LESSONS.find((l) => l.id === state.activeLessonId) || LESSONS[0];
  const seq = active.spec ? trackLessons(active.spec) : LESSONS;
  const pos = seq.findIndex((l) => l.id === active.id);
  const lesson = active;
  const idx = Math.max(0, LESSONS.findIndex((l) => l.id === active.id));
  const nextUp = LESSONS.find((l) => !state.passed[l.id]) || null;
  const done = LESSONS.filter((l) => state.passed[l.id]).length;
  const streak = streaks(state.days).current;
  const dueNow = dueCards(state.passed, state.review).length;

  // Roadmap card: a newly opened track slot, or the next class of a chosen track.
  const slots = openSlots(state.passed);
  const picked = TRACKS.filter((t) => state.readings[`spec:${t.id}`]);
  const trackNext = picked
    .map((t) => trackLessons(t.id).find((l) => !state.passed[l.id]))
    .find((l) => l && trackClassState(l, state.passed).open);
  const spec =
    slots > picked.length
      ? { eyebrow: '🔓 Specialization unlocked', title: 'Choose a track: metals, electronic or energy materials', meta: 'A short run of deeper classes on top of your timetable.', go: () => setView('spec') }
      : trackNext
        ? { eyebrow: `Your ${TRACKS.find((t) => t.id === trackNext.spec).title} track`, title: trackNext.title, meta: trackNext.subtitle, go: () => actions.open(trackNext.id) }
        : null;

  const actions = {
    ...store,
    open: (id) => {
      store.setActive(id);
      setView('lesson');
      window.scrollTo({ top: 0 });
    },
  };

  const saveMode = status.mode === 'sqlite' ? 'sqlite' : status.mode === 'offline' ? 'offline' : 'loading';

  const lessonLabel = lesson.side ? 'GE class' : lesson.spec ? 'Track class' : `Lesson ${idx + 1}`;
  const navItems = useMemo(
    () => [
      { id: 'roadmap', label: 'Roadmap' },
      { id: 'lesson', label: lessonLabel },
      { id: 'review', label: <>Review{dueNow > 0 && <span className="nav-badge">{dueNow}</span>}</> },
      { id: 'spec', label: 'Program' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'paths', label: 'Pathways' },
      { id: 'library', label: 'Library' },
      { id: 'glossary', label: 'Glossary' },
      { id: 'notes', label: 'My notes' },
      { id: 'exams', label: 'Exams' },
      { id: 'progress', label: 'Progress' },
    ],
    [lessonLabel, dueNow],
  );

  const startWeek = nextUp ? weekNumber(nextUp) : 1;
  const sideWeeks = useMemo(() => sideByWeek(state.readings), [state.readings]);
  const hasProgram = PROGRAMS.some((p) => state.readings[`program:${p.id}`]);

  if (status.mode && status.mode !== 'loading' && !hasProgram)
    return (
      <Welcome
        onDone={(program, sides) => {
          actions.toggleReading(`program:${program}`);
          for (const id of sides) actions.toggleReading(`side:${id}@${startWeek}`);
        }}
      />
    );
  if (guideWeek) return <StudyGuide week={guideWeek} notes={state.notes} onClose={() => setGuideWeek(null)} />;

  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => setView('roadmap')}>
          <span className="brand-mark">∂</span>
          <span>Study Mats</span>
        </button>
        <TopNav items={navItems} view={view} onPick={setView} />
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
          <Roadmap progress={state} nextUp={nextUp} onOpen={actions.open} status={saveMode} dueNow={dueNow} onReview={() => setView('review')} spec={spec} sideWeeks={sideWeeks} />
        ) : view === 'review' ? (
          <ReviewPage progress={state} actions={actions} />
        ) : view === 'spec' ? (
          <ProgramPage
            progress={state}
            onOpen={actions.open}
            onToggle={(id) => actions.toggleReading(`spec:${id}`)}
            onToggleKey={(key) => actions.toggleReading(key)}
            startWeek={startWeek}
          />
        ) : view === 'timeline' ? (
          <Timeline progress={state} onOpen={actions.open} />
        ) : view === 'paths' ? (
          <PathwaysPage progress={state} onOpen={actions.open} />
        ) : view === 'library' ? (
          <LibraryPage progress={state} onOpen={actions.open} onGo={setView} onMark={(id) => !state.readings[id] && actions.toggleReading(id)} />
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
            index={pos}
            total={seq.length}
            progress={state}
            actions={actions}
            prevLesson={seq[pos - 1]}
            nextLesson={seq[pos + 1]}
          />
        )}
      </main>

      <Ambush progress={state} activeIdx={idx} paused={view === 'exams'} onAnswered={() => actions.logActivity()} />
      <NotesPanel lesson={lesson} notes={state.notes} scratch={state.scratch} onNote={actions.setNote} />
    </div>
  );
}
