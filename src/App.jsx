import React, { useState, useEffect, useCallback } from 'react';
import { LESSONS, CURRICULUM_TERMS } from './data/curriculum';
import VisualLab from './components/VisualLab';
import MasteryGate from './components/MasteryGate';
import AdhdToolkit from './components/AdhdToolkit';
import SkillTreeView from './components/SkillTreeView';
import PostClassReadings from './components/PostClassReadings';

export default function App() {
  // Active lesson ID
  const [activeLessonId, setActiveLessonId] = useState(() => {
    return localStorage.getItem('um_mate_active_lesson') || 'math-001';
  });

  // View tab: 'classroom' | 'curriculum'
  const [activeMainView, setActiveMainView] = useState('classroom');

  // Completed Visual Labs: { [lessonId]: true }
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('um_mate_completed_labs') || '{}');
    } catch {
      return {};
    }
  });

  // Passed Lesson Gates: { [lessonId]: { score: number, passedAt: string } }
  const [passedLessons, setPassedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('um_mate_passed_lessons') || '{}');
    } catch {
      return {};
    }
  });

  // Completed Post-Class Open-Source Readings: { [readingId]: true }
  const [completedReadings, setCompletedReadings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('um_mate_completed_readings') || '{}');
    } catch {
      return {};
    }
  });

  // Overtime 10PM Shift Mode (condenses long text into 15-min micro-sprints)
  const [overtimeMode, setOvertimeMode] = useState(() => {
    return localStorage.getItem('um_mate_overtime_mode') === 'true';
  });

  // Streak Shields for 10 PM shifts
  const [streakShields, setStreakShields] = useState(() => {
    const saved = localStorage.getItem('um_mate_streak_shields');
    return saved !== null ? Number(saved) : 3;
  });

  // Optional Peek Mode if user wants to preview a locked future class
  const [peekUnlockAll, setPeekUnlockAll] = useState(false);

  // Active step index in Guided Derivation
  const [focusedStepIdx, setFocusedStepIdx] = useState(0);

  useEffect(() => {
    localStorage.setItem('um_mate_active_lesson', activeLessonId);
    setFocusedStepIdx(0);
  }, [activeLessonId]);

  useEffect(() => {
    localStorage.setItem('um_mate_completed_labs', JSON.stringify(completedLabs));
  }, [completedLabs]);

  useEffect(() => {
    localStorage.setItem('um_mate_passed_lessons', JSON.stringify(passedLessons));
  }, [passedLessons]);

  useEffect(() => {
    localStorage.setItem('um_mate_completed_readings', JSON.stringify(completedReadings));
  }, [completedReadings]);

  useEffect(() => {
    localStorage.setItem('um_mate_overtime_mode', String(overtimeMode));
  }, [overtimeMode]);

  useEffect(() => {
    localStorage.setItem('um_mate_streak_shields', String(streakShields));
  }, [streakShields]);

  const isLessonUnlocked = useCallback(
    (lessonId) => {
      if (peekUnlockAll) return true;
      const target = LESSONS.find((l) => l.id === lessonId);
      if (!target) return false;
      if (target.prereqIds.length === 0) return true;
      return target.prereqIds.every((reqId) => !!passedLessons[reqId]);
    },
    [passedLessons, peekUnlockAll]
  );

  const activeLesson =
    LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0];
  const activeIdx = LESSONS.findIndex((l) => l.id === activeLesson.id);
  const nextLesson =
    activeIdx >= 0 && activeIdx < LESSONS.length - 1
      ? LESSONS[activeIdx + 1]
      : null;

  const readingBonusXp = Object.keys(completedReadings).length * 25;
  const totalXp =
    LESSONS.reduce(
      (acc, item) => (passedLessons[item.id] ? acc + item.xpReward : acc),
      0
    ) + readingBonusXp;
  const passedCount = Object.keys(passedLessons).length;
  const overallProgressPct = Math.round((passedCount / LESSONS.length) * 100);

  const handleCompleteLabMission = useCallback(() => {
    setCompletedLabs((prev) => {
      if (prev[activeLesson.id]) return prev;
      return { ...prev, [activeLesson.id]: true };
    });
  }, [activeLesson.id]);

  const handlePassGate = useCallback((lessonId, score) => {
    setPassedLessons((prev) => ({
      ...prev,
      [lessonId]: {
        score,
        passedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const handleToggleReadingDone = useCallback((readingId) => {
    setCompletedReadings((prev) => {
      const next = { ...prev };
      if (next[readingId]) delete next[readingId];
      else next[readingId] = true;
      return next;
    });
  }, []);

  const handleSelectLesson = (lessonId) => {
    if (!isLessonUnlocked(lessonId)) return;
    setActiveLessonId(lessonId);
    setActiveMainView('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      {/* Top Academic Navigation & Telemetry Bar */}
      <header className="top-navbar">
        <div className="brand-cluster">
          <div className="brand-emblem" aria-hidden="true">
            <span>UM</span>
          </div>
          <div>
            <h1 className="brand-title">MatE Zero-to-One Academy</h1>
            <p className="brand-subtitle">
              CS-to-Materials Engineering Bridge • University of Mindanao (BSMTE Prep)
            </p>
          </div>
        </div>

        <nav className="center-nav-tabs" aria-label="Primary Views">
          <button
            type="button"
            className={`nav-tab-btn ${activeMainView === 'classroom' ? 'active' : ''}`}
            onClick={() => setActiveMainView('classroom')}
          >
            Interactive Classroom ({activeLesson.code})
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeMainView === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveMainView('curriculum')}
          >
            Prerequisite Map & Skill Tree ({passedCount}/{LESSONS.length})
          </button>
        </nav>

        <div className="telemetry-cluster">
          <div className="xp-pill" title="Total Earned Engineering XP (Lessons + Open-Source Readings)">
            <span className="xp-label">XP</span>
            <strong>{totalXp}</strong>
          </div>
          <div
            className="shield-pill"
            title="Zero-Guilt Momentum Mode: No calendar deadlines—unlock modules at your own pace"
          >
            <span>⚡ Self-Paced Queue</span>
          </div>
          <div className="progress-mini-wrap">
            <div className="progress-mini-top">
              <span>Term Mastery</span>
              <strong>{overallProgressPct}%</strong>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${overallProgressPct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {activeMainView === 'curriculum' ? (
        <main className="curriculum-full-container">
          <SkillTreeView
            passedLessons={passedLessons}
            isLessonUnlocked={isLessonUnlocked}
            activeLessonId={activeLesson.id}
            onSelectLesson={handleSelectLesson}
          />
        </main>
      ) : (
        <div className="workspace-three-col">
          {/* LEFT SIDEBAR: Self-Paced Prerequisite Module Queue */}
          <aside className="syllabus-rail" aria-label="Course Module Queue & Prerequisite Rail">
            <div className="rail-header">
              <div>
                <span className="rail-eyebrow">NO CALENDAR DEADLINES • PREREQ QUEUE</span>
                <h2>Course Progression</h2>
              </div>
              <label className="peek-toggle" title="Temporarily unlock all lessons to browse ahead">
                <input
                  type="checkbox"
                  checked={peekUnlockAll}
                  onChange={(e) => setPeekUnlockAll(e.target.checked)}
                />
                <span>Peek All</span>
              </label>
            </div>

            {CURRICULUM_TERMS.map((term) => {
              const termLessons = LESSONS.filter((l) => l.termId === term.id);
              return (
                <div key={term.id} className="term-block">
                  <div className="term-block-header">
                    <h3>{term.title}</h3>
                    <p>{term.subtitle}</p>
                  </div>

                  <div className="lesson-rail-list">
                    {termLessons.map((item) => {
                      const isPassed = !!passedLessons[item.id];
                      const isUnlocked = isLessonUnlocked(item.id);
                      const isActive = item.id === activeLesson.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={!isUnlocked}
                          onClick={() => handleSelectLesson(item.id)}
                          className={`rail-lesson-btn ${isActive ? 'rail-active' : ''} ${
                            isPassed
                              ? 'rail-passed'
                              : isUnlocked
                              ? 'rail-unlocked'
                              : 'rail-locked'
                          }`}
                        >
                          <div className="rail-item-top">
                            <span className="rail-day-badge">
                              {item.daySlot.toUpperCase()}
                            </span>
                            <span className={`rail-code-tag track-${item.track}`}>
                              {item.code}
                            </span>
                            <span className="rail-status-icon">
                              {isPassed ? '✓' : isUnlocked ? '●' : '🔒'}
                            </span>
                          </div>
                          <div className="rail-item-title">{item.title}</div>
                          <div className="rail-item-meta">
                            <span>
                              {overtimeMode
                                ? `🌙 ${item.overtimeMins}m OT Sprint`
                                : `⏱ ${item.standardMins}m Session`}
                            </span>
                            {isPassed && (
                              <span className="rail-score-pill">
                                {passedLessons[item.id].score}%
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </aside>

          {/* CENTER COLUMN: Active Lecture, History Story, CS Compiler, 3B1B Lab, Gate & Open-Source Readings */}
          <main className="classroom-main">
            {/* Hero Banner for Current Class */}
            <section className="lesson-hero-card">
              <div className="hero-top-meta">
                <span className={`course-pill track-${activeLesson.track}`}>
                  {activeLesson.daySlot} • {activeLesson.code}
                </span>
                <span className="um-link-pill">{activeLesson.umCourseLink}</span>
                <span className="xp-reward-pill">+{activeLesson.xpReward} XP</span>
              </div>

              <h2 className="lesson-main-title">{activeLesson.title}</h2>
              <p className="lesson-main-subtitle">{activeLesson.subtitle}</p>

              {/* 10 PM Overtime Executive Digest */}
              <div className={`overtime-digest-box ${overtimeMode ? 'digest-highlighted' : ''}`}>
                <div className="digest-header">
                  <strong>
                    {overtimeMode
                      ? '🌙 10 PM Overtime Mode Active — 60-Second Core Intuition Digest:'
                      : '⚡ Quick 3-Bullet Executive Summary (ADHD Pre-Flight Check):'}
                  </strong>
                  <span>
                    {overtimeMode
                      ? `${activeLesson.overtimeMins} min sprint`
                      : `${activeLesson.standardMins} min full session`}
                  </span>
                </div>
                <ul className="digest-list">
                  {activeLesson.overtimeDigest.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* SECTION 1: THE "WHY & HISTORY" ORIGIN STORY */}
            <section className="story-origin-card" aria-label="Historical Origin Story">
              <div className="story-header">
                <div>
                  <span className="section-eyebrow">
                    WHY WAS THIS INVENTED? • HISTORICAL ORIGIN STORY
                  </span>
                  <h3 className="story-hook">{activeLesson.history.hook}</h3>
                </div>
                <div className="era-badge-box">
                  <span className="era-time">{activeLesson.history.era}</span>
                  <strong className="era-person">{activeLesson.history.protagonist}</strong>
                </div>
              </div>

              {!overtimeMode ? (
                <div className="story-narrative">
                  {activeLesson.history.narrative.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="overtime-collapsed-note">
                  <em>
                    Full 3-part historical narrative paused for 10 PM Overtime Mode so you can finish fast—switch to Standard Mode anytime to read the complete story of{' '}
                    {activeLesson.history.protagonist}!
                  </em>
                </p>
              )}

              <div className="story-takeaway">
                <strong>💡 Core "Why" Takeaway:</strong> {activeLesson.history.takeaway}
              </div>
            </section>

            {/* SECTION 2: CS BRAIN COMPILER BRIDGE */}
            <section className="cs-bridge-card" aria-label="Computer Science Mental Model Translation">
              <div className="cs-bridge-header">
                <div>
                  <span className="section-eyebrow">CS GRADUATE UNFAIR ADVANTAGE • MENTAL COMPILER</span>
                  <h3>Mapping {activeLesson.code} → {activeLesson.csBridge.concept}</h3>
                </div>
                <span className="cs-tag">CS ⇄ MatE</span>
              </div>
              <p className="cs-analogy-text">{activeLesson.csBridge.analogy}</p>
              <pre className="cs-code-block">
                <code>{activeLesson.csBridge.codeSnippet}</code>
              </pre>
            </section>

            {/* SECTION 3: 3BLUE1BROWN INTERACTIVE VISUAL LAB */}
            <VisualLab
              lesson={activeLesson}
              isMissionDone={!!completedLabs[activeLesson.id]}
              onCompleteMission={handleCompleteLabMission}
            />

            {/* SECTION 4: STEP-BY-STEP GUIDED DERIVATION */}
            <section className="guided-steps-card" aria-label="Step-by-Step Guided Breakdown">
              <div className="guided-header">
                <div>
                  <span className="section-eyebrow">STEP-BY-STEP PROCEDURAL BREAKDOWN</span>
                  <h3>Zero-Skipped-Steps Derivation</h3>
                </div>
                <div className="step-stepper-btns">
                  {activeLesson.guidedSteps.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`step-tab-btn ${focusedStepIdx === idx ? 'active' : ''}`}
                      onClick={() => setFocusedStepIdx(idx)}
                    >
                      Step {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="guided-steps-grid">
                {activeLesson.guidedSteps.map((step, idx) => {
                  const isFocused = focusedStepIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`guided-step-item ${isFocused ? 'step-focused' : ''}`}
                      onClick={() => setFocusedStepIdx(idx)}
                    >
                      <h4>{step.title}</h4>
                      <div className="formula-banner">
                        <MathFormula tex={step.formula} />
                      </div>
                      <p>{step.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 5: 3-STAGE PREREQUISITE MASTERY GATE */}
            <MasteryGate
              lesson={activeLesson}
              isLabDone={!!completedLabs[activeLesson.id]}
              isLessonPassed={!!passedLessons[activeLesson.id]}
              savedScore={passedLessons[activeLesson.id]?.score}
              onPassGate={handlePassGate}
              onJumpToNextLesson={handleSelectLesson}
              nextLesson={nextLesson}
            />

            {/* SECTION 6: POST-CLASS OPEN-SOURCE READINGS & IN-APP EXCERPTS */}
            <PostClassReadings
              lessonId={activeLesson.id}
              lessonCode={activeLesson.code}
              completedReadings={completedReadings}
              onToggleReadingDone={handleToggleReadingDone}
            />
          </main>

          {/* RIGHT SIDEBAR: ADHD Focus Timer, 10PM Mode Toggle, Step Scratchpad & Brain Dump */}
          <AdhdToolkit
            overtimeMode={overtimeMode}
            onToggleOvertime={() => setOvertimeMode((m) => !m)}
          />
        </div>
      )}
    </div>
  );
}
