import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LESSONS, ALL_LESSONS, TRACKS, PROGRAMS, PROGRAM_ID, rememberProgram, seqOf, trackLessons, trackClassState, openSlots, sideByWeek, weekNumber, startState } from './data/path';
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
import TodayPage from './components/TodayPage';
import SearchPalette from './components/SearchPalette';
import ReadingMenu from './components/ReadingMenu';
import { FinishRecap, StreakToast } from './components/Celebrations';
import { usePrefs } from './state/prefs';
import PlanPage from './components/PlanPage';
import MistakesPage from './components/MistakesPage';
import IdeaMap from './components/IdeaMap';
import GlossCard from './components/GlossCard';
import { getPlace } from './state/detour';
import { noteAnswer, openMisses } from './state/mistakes';
import { today as todayKey } from './state/useProgress';

const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

// Pages the search box can jump to (with extra words people might type).
const PAGES = [
  { id: 'today', label: 'Today', hint: 'Your next class, reviews and streak', icon: '☀', words: 'home start dashboard' },
  { id: 'roadmap', label: 'Roadmap', hint: 'Every week of your timetable', icon: '🗺', words: 'timetable schedule weeks plan' },
  { id: 'review', label: 'Review', hint: 'Questions due from earlier classes', icon: '↻', words: 'spaced repetition flashcards recall' },
  { id: 'spec', label: 'Program', hint: 'Your program, tracks and borrowed subjects', icon: '🎓', words: 'tracks specialization borrow switch' },
  { id: 'library', label: 'Library', hint: 'Materials, people, formulas, case files', icon: '📚', words: 'collection album shelves' },
  { id: 'map', label: 'Idea map', hint: 'How every class connects, and the path to any idea', icon: '🕸', words: 'graph prerequisites path connections tree web' },
  { id: 'timeline', label: 'Timeline', hint: 'Every class in the order it happened', icon: '⏳', words: 'history dates' },
  { id: 'glossary', label: 'Glossary', hint: 'Words from your classes, explained', icon: 'Aa', words: 'dictionary definitions terms' },
  { id: 'plan', label: 'Study plan', hint: 'A goal date and what to do each day', icon: '📅', words: 'schedule goal deadline hours pace calendar' },
  { id: 'mistakes', label: 'Mistakes', hint: 'Questions you got wrong, to redo', icon: '✗', words: 'wrong errors redo notebook missed' },
  { id: 'progress', label: 'Progress', hint: 'Streak, study days, subjects', icon: '🔥', words: 'stats calendar streak export' },
  { id: 'exams', label: 'Quizzes & exams', hint: 'Weekly quizzes, midterm, final', icon: '✎', words: 'test midterm final' },
  { id: 'notes', label: 'My notes', hint: 'Everything you have written', icon: '📝', words: 'notebook' },
];
import { useProgress } from './state/useProgress';

export default function App() {
  const { state, status, actions: store } = useProgress();
  const [view, setView] = useState('today');
  const [searchOpen, setSearchOpen] = useState(false);
  const [libFocus, setLibFocus] = useState(null);
  const [recap, setRecap] = useState(null); // { id, score } of a class just passed
  const [toast, setToast] = useState(null); // streak milestone reached
  const [prefs, setPrefs] = usePrefs();
  const [guideWeek, setGuideWeek] = useState(null);
  const [opening, setOpening] = useState(null); // { id, tab, part, scroll, n }: open a class at a tab
  const [detour, setDetour] = useState(null); // { id, title, tab, card, step }: where a side trip started
  // A new page starts at the top, not where the last one was scrolled to.
  const go = (v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  };

  // The open class may be a core class or one from a specialization track.
  const active = ALL_LESSONS.find((l) => l.id === state.activeLessonId) || LESSONS[0];
  const seq = seqOf(active);
  const pos = seq.findIndex((l) => l.id === active.id);
  const lesson = active;
  const idx = Math.max(0, LESSONS.findIndex((l) => l.id === active.id));
  const nextUp = LESSONS.find((l) => !state.passed[l.id]) || null;
  // The Start here level, and where it leads after its last class.
  const startInfo = startState(state.passed, state.readings);
  const skipStart = () => actions.toggleReading('start:skip');
  const afterStart = (l) => (l?.start ? nextUp : null);
  const done = LESSONS.filter((l) => state.passed[l.id]).length;
  const streak = streaks(state.days).current;
  const dueNow = dueCards(state.passed, state.review).length;
  const plan = state.items?.plan?.main || null;
  const missCount = useMemo(() => openMisses(state.items || {}).length, [state.items]);

  // Roadmap card: a newly opened track slot, or the next class of a chosen track.
  const slots = openSlots(state.passed);
  const picked = TRACKS.filter((t) => state.readings[`spec:${t.id}`]);
  const trackNext = picked
    .map((t) => trackLessons(t.id).find((l) => !state.passed[l.id]))
    .find((l) => l && trackClassState(l, state.passed).open);
  const spec =
    slots > picked.length
      ? { eyebrow: '🔓 Specialization unlocked', title: `Choose a track: ${TRACKS.map((t) => t.title.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' or $1')}`, meta: 'A short run of deeper classes on top of your timetable.', go: () => setView('spec') }
      : trackNext
        ? { eyebrow: `Your ${TRACKS.find((t) => t.id === trackNext.spec).title} track`, title: trackNext.title, meta: trackNext.subtitle, go: () => actions.open(trackNext.id) }
        : null;

  const actions = {
    ...store,
    open: (id) => {
      setOpening(null);
      setDetour(null);
      store.setActive(id);
      setView('lesson');
      window.scrollTo({ top: 0 });
    },
    // Open a class at a tab (and a "Learn it" part), e.g. from the study plan.
    openAt: (id, tab, part = null, scroll = null, at = {}) => {
      setOpening({ id, tab, part, scroll, ...at, n: Date.now() });
      setDetour(null);
      store.setActive(id);
      setView('lesson');
      window.scrollTo({ top: 0 });
    },
    // A side trip to an earlier class ("I'm lost", a glossary word), with a
    // way back to the same tab, story card and animation step. A trip from a
    // trip keeps the first starting point.
    detour: (id) => {
      const here = getPlace();
      const from = detour || (here && view === 'lesson' ? { ...here, title: ALL_LESSONS.find((l) => l.id === here.id)?.title } : null);
      setOpening(null);
      store.setActive(id);
      setView('lesson');
      window.scrollTo({ top: 0 });
      setDetour(from && from.id !== id ? from : null);
    },
    back: () => {
      if (!detour) return;
      actions.openAt(detour.id, detour.tab, null, null, { card: detour.card, step: detour.step });
    },
    noteAnswer: (a) => noteAnswer(state.items || {}, store.setItem, a),
    // Passing a class for the first time shows the recap card.
    pass: (id, score) => {
      if (!state.passed[id]) setRecap({ id, score });
      store.pass(id, score);
    },
  };
  // A piece of a class from the study plan: open it at the right tab.
  const openUnit = (u) => actions.openAt(u.lesson.id, u.kind === 'story' ? 'story' : u.kind === 'part' ? 'learn' : 'practice', u.part ?? null);
  const openLibrary = (shelf, q = '') => {
    setLibFocus({ shelf, q, n: Date.now() });
    go('library');
  };

  // Ctrl+K (⌘K) or "/" opens search from anywhere. Esc leaves focus mode.
  useEffect(() => {
    const onKey = (e) => {
      const typing = e.target.closest?.('input, textarea, select, [contenteditable="true"], .cm-editor');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape' && prefs.focus && !searchOpen && !document.fullscreenElement && !document.querySelector('.modal-backdrop, .palette-backdrop')) {
        setPrefs({ focus: false });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prefs.focus, searchOpen, setPrefs]);

  // A streak milestone, reached while the app is open, gets a small celebration
  // (once per streak run; remembered with your progress).
  const lastStreak = useRef(null);
  useEffect(() => {
    if (!state.loaded) return; // count from the saved streak, not from zero
    const prev = lastStreak.current;
    lastStreak.current = streak;
    if (prev == null || streak <= prev || !STREAK_MILESTONES.includes(streak)) return;
    const start = new Date(Date.now() - (streak - 1) * 86_400_000);
    const key = `celebrated:streak-${streak}:${todayKey(start)}`;
    if (state.readings[key]) return;
    store.toggleReading(key);
    setToast(streak);
  }, [streak, state.loaded, state.readings, store]);
  const closeToast = useCallback(() => setToast(null), []);
  const closeRecap = useCallback(() => setRecap(null), []);

  const saveMode = status.mode === 'sqlite' ? 'sqlite' : status.mode === 'offline' ? 'offline' : 'loading';

  const lessonLabel = lesson.start ? 'Start here' : lesson.side ? 'GE class' : lesson.spec ? 'Track class' : lesson.from ? 'Borrowed class' : `Lesson ${idx + 1}`;
  const navItems = useMemo(
    () => [
      { id: 'today', label: 'Today' },
      { id: 'roadmap', label: 'Roadmap' },
      { id: 'lesson', label: lessonLabel },
      { id: 'review', label: <>Review{dueNow > 0 && <span className="nav-badge">{dueNow}</span>}</> },
      { id: 'spec', label: 'Program' },
      {
        group: 'explore',
        label: 'Explore',
        children: [
          { id: 'library', label: 'Library', hint: 'Materials, people, formulas, case files' },
          { id: 'map', label: 'Idea map', hint: 'How every class connects, and the path to any idea', icon: '🕸', words: 'graph prerequisites path connections tree web' },
  { id: 'timeline', label: 'Timeline', hint: 'Every class in the order it happened' },
          { id: 'glossary', label: 'Glossary', hint: 'Words from your classes, explained' },
          ...(PROGRAM_ID === 'mate' ? [{ id: 'paths', label: 'Pathways', hint: 'From school to licence to a career' }] : []),
        ],
      },
      {
        group: 'you',
        label: 'You',
        children: [
          { id: 'plan', label: 'Study plan', hint: 'A goal date and what to do each day', icon: '📅', words: 'schedule goal deadline hours pace calendar' },
  { id: 'mistakes', label: 'Mistakes', hint: 'Questions you got wrong, to redo', icon: '✗', words: 'wrong errors redo notebook missed' },
  { id: 'progress', label: 'Progress', hint: 'Streak, study days, subjects' },
          { id: 'exams', label: 'Quizzes & exams', hint: 'Weekly quizzes, midterm, final' },
          { id: 'notes', label: 'My notes', hint: 'Everything you have written' },
        ],
      },
    ],
    [lessonLabel, dueNow, plan, missCount],
  );

  const startWeek = nextUp ? weekNumber(nextUp) : 1;
  const sideWeeks = useMemo(() => sideByWeek(state.readings), [state.readings]);
  const savedProgram = PROGRAMS.find((p) => p.ready && state.readings[`program:${p.id}`])?.id;
  const hasProgram = Boolean(savedProgram);

  // The timetable is built for the program remembered in this browser. If the
  // saved progress says another one (a new device, an import), switch to it.
  const switchingRef = useRef(false);
  useEffect(() => {
    if (switchingRef.current) return;
    if (savedProgram && savedProgram !== PROGRAM_ID) {
      rememberProgram(savedProgram);
      window.location.reload();
    }
  }, [savedProgram]);
  const switchProgram = async (id) => {
    // Block the "saved progress says another program" check above while the
    // new choice is still being written, or it would switch straight back.
    switchingRef.current = true;
    for (const p of PROGRAMS) if (state.readings[`program:${p.id}`] && p.id !== id) actions.toggleReading(`program:${p.id}`);
    if (!state.readings[`program:${id}`]) actions.toggleReading(`program:${id}`);
    rememberProgram(id);
    // Let the save reach the database (and, in the desktop app, the file on
    // disk) before the page reloads.
    await new Promise((r) => setTimeout(r, 500));
    if (window.__studyFlush) await window.__studyFlush().catch(() => {});
    else await new Promise((r) => setTimeout(r, 700));
    window.location.reload();
  };
  const goBorrow = () => {
    setView('spec');
    setTimeout(() => document.getElementById('borrow')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };

  if (status.mode && status.mode !== 'loading' && !hasProgram)
    return (
      <Welcome
        onDone={(program, sides, startHere = true) => {
          if (!startHere && !state.readings['start:skip']) actions.toggleReading('start:skip');
          for (const id of sides) actions.toggleReading(`side:${id}@${startWeek}`);
          if (program === PROGRAM_ID) actions.toggleReading(`program:${program}`);
          else switchProgram(program);
        }}
      />
    );
  if (guideWeek) return <StudyGuide week={guideWeek} notes={state.notes} onClose={() => setGuideWeek(null)} />;

  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => go('today')}>
          <span className="brand-mark">∂</span>
          <span>Study Mats</span>
        </button>
        <TopNav items={navItems} view={view} onPick={go} />
        <div className="topbar-right">
          <button type="button" className="search-btn" onClick={() => setSearchOpen(true)} title="Search everything">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="search-btn-label">Search</span>
            <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <ReadingMenu />
          <span className={`save-dot ${saveMode}`} title={saveMode === 'sqlite' ? 'Your progress is saved' : 'Progress is not being saved right now'} />
          {streak > 0 && (
            <button type="button" className="streak" onClick={() => go('progress')} title="Study streak">
              🔥 {streak}
            </button>
          )}
          <span className="count" title="Classes finished">
            {done}/{LESSONS.length}
          </span>
        </div>
      </header>

      <main className="main">
        {view === 'today' ? (
          <TodayPage
            progress={state}
            active={active}
            nextUp={nextUp}
            dueNow={dueNow}
            spec={spec}
            plan={plan}
            missCount={missCount}
            onOpenUnit={openUnit}
            start={startInfo}
            onSkipStart={skipStart}
            onOpen={actions.open}
            onGo={go}
            onLibrary={() => openLibrary('collection')}
          />
        ) : view === 'roadmap' ? (
          <Roadmap progress={state} nextUp={nextUp} onOpen={actions.open} status={saveMode} dueNow={dueNow} onReview={() => go('review')} spec={spec} sideWeeks={sideWeeks} onBorrow={goBorrow} start={startInfo} onSkipStart={skipStart} />
        ) : view === 'plan' ? (
          <PlanPage progress={state} plan={plan} onSave={(p) => store.setItem('plan', 'main', p)} onOpenUnit={openUnit} />
        ) : view === 'mistakes' ? (
          <MistakesPage progress={state} actions={actions} onOpenClass={actions.open} />
        ) : view === 'map' ? (
          <IdeaMap progress={state} onOpen={actions.open} />
        ) : view === 'review' ? (
          <ReviewPage progress={state} actions={actions} />
        ) : view === 'spec' ? (
          <ProgramPage
            progress={state}
            onOpen={actions.open}
            onToggle={(id) => actions.toggleReading(`spec:${id}`)}
            onToggleKey={(key) => actions.toggleReading(key)}
            onSwitch={switchProgram}
            startWeek={startWeek}
          />
        ) : view === 'timeline' ? (
          <Timeline progress={state} onOpen={actions.open} />
        ) : view === 'paths' ? (
          <PathwaysPage progress={state} onOpen={actions.open} />
        ) : view === 'library' ? (
          <LibraryPage progress={state} focus={libFocus} onOpen={actions.open} onGo={go} onMark={(id) => !state.readings[id] && actions.toggleReading(id)} />
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
            nextLesson={seq[pos + 1] || afterStart(lesson)}
            opening={opening}
            detour={detour}
          />
        )}
      </main>

      {prefs.focus && (
        <button type="button" className="focus-exit" onClick={() => setPrefs({ focus: false })} title="Leave focus mode (Esc)">
          Leave focus <kbd>Esc</kbd>
        </button>
      )}

      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        pages={PAGES}
        passed={state.passed}
        suggestions={[
          ...(nextUp ? [{ group: 'page', head: 'Suggested', id: 's:next', title: nextUp.title, sub: 'Your next class', icon: '▶', track: nextUp.track, act: { open: nextUp.id } }] : []),
          ...(dueNow ? [{ group: 'page', head: 'Suggested', id: 's:review', title: `Review ${dueNow} due question${dueNow === 1 ? '' : 's'}`, sub: 'Keep earlier classes fresh', icon: '↻', act: { go: 'review' } }] : []),
          ...PAGES.map((p, i) => ({ group: 'pages', head: i === 0 ? 'Pages' : null, id: `sp:${p.id}`, title: p.label, sub: p.hint, icon: p.icon, act: { go: p.id } })),
        ]}
        onAct={(a) => (a.open ? actions.open(a.open) : a.shelf ? openLibrary(a.shelf, a.q) : go(a.go))}
      />

      {recap && ALL_LESSONS.find((l) => l.id === recap.id) && (() => {
        const l = ALL_LESSONS.find((x) => x.id === recap.id);
        const sq = seqOf(l);
        const nx = sq[sq.findIndex((x) => x.id === l.id) + 1] || afterStart(l);
        return (
          <FinishRecap
            lesson={l}
            score={recap.score}
            passed={state.passed}
            nextLesson={nx}
            onClose={closeRecap}
            onNext={() => {
              setRecap(null);
              if (nx) actions.open(nx.id);
            }}
            onLibrary={() => {
              setRecap(null);
              openLibrary('collection');
            }}
            onExplain={
              state.items?.explain?.[l.id]?.rating
                ? null
                : () => {
                    setRecap(null);
                    actions.openAt(l.id, 'practice', null, 'explain-back');
                  }
            }
          />
        );
      })()}
      <GlossCard currentId={view === 'lesson' ? lesson.id : null} onDetour={(id) => actions.detour(id)} onGlossary={() => go('glossary')} />
      {toast && <StreakToast days={toast} onClose={closeToast} />}

      <Ambush progress={state} activeIdx={idx} paused={view === 'exams'} onAnswered={() => actions.logActivity()} />
      <NotesPanel lesson={lesson} notes={state.notes} scratch={state.scratch} onNote={actions.setNote} />
    </div>
  );
}
