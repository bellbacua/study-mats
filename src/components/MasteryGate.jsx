import React, { useState, useEffect } from 'react';

export default function MasteryGate({
  lesson,
  isLabDone,
  isLessonPassed,
  savedScore,
  onPassGate,
  onJumpToNextLesson,
  onGoToLab,
  onCompleteLabMission,
  nextLesson,
}) {
  const { drills, bossProblem } = lesson.gate;

  // Active question index: 0..drills.length-1 are drills, drills.length is Boss Problem
  const [activeQIdx, setActiveQIdx] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedDrills, setSubmittedDrills] = useState({});
  const [hintLevels, setHintLevels] = useState({}); // { [questionId]: 0 | 1 | 2 }
  const [bossAnswer, setBossAnswer] = useState(null);
  const [bossSubmitted, setBossSubmitted] = useState(false);
  const [showBossHint, setShowBossHint] = useState(false);

  // Reset local quiz state when switching lessons
  useEffect(() => {
    setActiveQIdx(0);
    setShowSummary(false);
    setSelectedAnswers({});
    setSubmittedDrills({});
    setHintLevels({});
    setBossAnswer(null);
    setBossSubmitted(false);
    setShowBossHint(false);
  }, [lesson.id]);

  const totalItems = drills.length + 1; // 3 drills + 1 boss problem = 4 items
  const correctDrillCount = drills.filter(
    (d) => submittedDrills[d.id] && selectedAnswers[d.id] === d.correctIndex
  ).length;
  const isBossCorrect = bossSubmitted && bossAnswer === bossProblem.correctIndex;
  const totalCorrect = correctDrillCount + (isBossCorrect ? 1 : 0);
  const allAnswered =
    drills.every((d) => submittedDrills[d.id]) && bossSubmitted;
  const currentPercent = Math.round((totalCorrect / totalItems) * 100);

  useEffect(() => {
    if (allAnswered && currentPercent >= 80 && isLabDone && !isLessonPassed) {
      onPassGate(lesson.id, currentPercent);
    }
  }, [allAnswered, currentPercent, isLabDone, isLessonPassed, lesson.id, onPassGate]);

  const handleSelectDrill = (drillId, optionIdx) => {
    if (submittedDrills[drillId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [drillId]: optionIdx }));
  };

  const handleCheckDrill = (drillId) => {
    if (selectedAnswers[drillId] === undefined) return;
    setSubmittedDrills((prev) => ({ ...prev, [drillId]: true }));
  };

  const handleRetryDrill = (drillId) => {
    setSubmittedDrills((prev) => {
      const next = { ...prev };
      delete next[drillId];
      return next;
    });
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[drillId];
      return next;
    });
  };

  const revealNextHint = (drillId) => {
    setHintLevels((prev) => ({
      ...prev,
      [drillId]: Math.min(2, (prev[drillId] || 0) + 1),
    }));
  };

  const isBossStage = activeQIdx === drills.length;
  const currentDrill = !isBossStage ? drills[activeQIdx] : null;

  const getQuestionStatus = (idx) => {
    if (idx < drills.length) {
      const d = drills[idx];
      if (!submittedDrills[d.id]) return 'pending';
      return selectedAnswers[d.id] === d.correctIndex ? 'correct' : 'wrong';
    }
    if (!bossSubmitted) return 'pending';
    return isBossCorrect ? 'correct' : 'wrong';
  };

  return (
    <section className="mastery-gate-section" id="mastery-gate">
      {/* Compact Header */}
      <div className="gate-header-row">
        <div>
          <span className="section-eyebrow">STAGE 4 • COMPETENCY QUIZ (80% TO UNLOCK NEXT)</span>
          <h3 className="gate-main-title">{lesson.code} Mastery Check</h3>
        </div>

        <div className="gate-score-pill-group">
          {isLessonPassed && (
            <span className="gate-passed-badge">
              ✓ Passed ({savedScore || currentPercent}%)
            </span>
          )}
          <span className="gate-progress-counter">
            Score: <strong>{totalCorrect}/{totalItems}</strong>
          </span>
        </div>
      </div>

      {/* Lab prerequisite notice if not yet completed */}
      {!isLabDone && (
        <div className="gate-warning-banner">
          <div>
            <strong>Visual Lab Pending:</strong> Complete the Interactive Lab (or mark it explored) so your quiz score unlocks the next class.
          </div>
          <div className="gate-warning-actions">
            {onGoToLab && (
              <button type="button" className="btn-ghost-sm" onClick={onGoToLab}>
                Go to Lab
              </button>
            )}
            {onCompleteLabMission && (
              <button type="button" className="btn-ghost-sm primary-chip" onClick={onCompleteLabMission}>
                Mark Lab Explored ✓
              </button>
            )}
          </div>
        </div>
      )}

      {/* One-at-a-Time Question Stepper Bar */}
      <div className="quiz-stepper-bar" role="tablist" aria-label="Quiz Questions">
        {drills.map((d, idx) => {
          const status = getQuestionStatus(idx);
          const isCurrent = !showSummary && activeQIdx === idx;
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              className={`quiz-step-pill ${isCurrent ? 'active' : ''} status-${status}`}
              onClick={() => {
                setShowSummary(false);
                setActiveQIdx(idx);
              }}
            >
              <span className="quiz-step-dot">
                {status === 'correct' ? '✓' : status === 'wrong' ? '✗' : idx + 1}
              </span>
              <span>Question {idx + 1}</span>
            </button>
          );
        })}

        <button
          type="button"
          role="tab"
          aria-selected={!showSummary && isBossStage}
          className={`quiz-step-pill boss-pill ${!showSummary && isBossStage ? 'active' : ''} status-${getQuestionStatus(drills.length)}`}
          onClick={() => {
            setShowSummary(false);
            setActiveQIdx(drills.length);
          }}
        >
          <span className="quiz-step-dot">
            {getQuestionStatus(drills.length) === 'correct'
              ? '✓'
              : getQuestionStatus(drills.length) === 'wrong'
              ? '✗'
              : '★'}
          </span>
          <span>Synthesis Problem</span>
        </button>

        {allAnswered && (
          <button
            type="button"
            role="tab"
            aria-selected={showSummary}
            className={`quiz-step-pill summary-pill ${showSummary ? 'active' : ''}`}
            onClick={() => setShowSummary(true)}
          >
            <span>Results ({currentPercent}%)</span>
          </button>
        )}
      </div>

      {/* Active Question View OR Summary View */}
      {showSummary ? (
        <div className={`gate-verdict-banner ${isLessonPassed || (currentPercent >= 80 && isLabDone) ? 'verdict-passed' : ''}`}>
          <div className="verdict-content">
            <h4>
              {isLessonPassed
                ? `🎓 Lesson Completed (${savedScore || currentPercent}% Mastery)!`
                : `Quiz Score: ${currentPercent}% (${totalCorrect} of ${totalItems} correct)`}
            </h4>
            <p>
              {isLessonPassed
                ? `You earned +${lesson.xpReward} XP and unlocked the next module in your curriculum.`
                : currentPercent < 80
                ? 'You need at least 80% (3/4 correct) to pass. Click any red question tab above to retry it!'
                : !isLabDone
                ? 'Great score! Click "Mark Lab Explored ✓" above to complete the lesson.'
                : 'Lesson passed!'}
            </p>
            <div className="verdict-actions-row">
              <button
                type="button"
                className="btn-ghost-sm"
                onClick={() => {
                  setShowSummary(false);
                  setActiveQIdx(0);
                }}
              >
                ← Review Questions
              </button>
              {isLessonPassed && nextLesson && (
                <button
                  type="button"
                  className="btn-unlock-next"
                  onClick={() => onJumpToNextLesson(nextLesson.id)}
                >
                  Start Next Lesson: {nextLesson.code} →
                </button>
              )}
            </div>
          </div>
        </div>
      ) : !isBossStage && currentDrill ? (
        /* Single Fluency Drill Card */
        (() => {
          const drill = currentDrill;
          const isSubmitted = !!submittedDrills[drill.id];
          const chosen = selectedAnswers[drill.id];
          const isCorrect = isSubmitted && chosen === drill.correctIndex;
          const hintLvl = hintLevels[drill.id] || 0;

          return (
            <div
              key={drill.id}
              className={`drill-card single-focus-card ${
                isSubmitted ? (isCorrect ? 'drill-correct' : 'drill-wrong') : ''
              }`}
            >
              <div className="drill-top-bar">
                <span className="drill-number">
                  Question {activeQIdx + 1} of {totalItems} • Fluency Check
                </span>
                <div className="drill-actions-right">
                  {hintLvl < 2 && !isCorrect && (
                    <button
                      type="button"
                      className="btn-hint"
                      onClick={() => revealNextHint(drill.id)}
                    >
                      💡 {hintLvl === 0 ? 'Hint (1/2)' : 'Step-by-Step Hint (2/2)'}
                    </button>
                  )}
                  {isSubmitted && !isCorrect && (
                    <button
                      type="button"
                      className="btn-retry"
                      onClick={() => handleRetryDrill(drill.id)}
                    >
                      ↻ Try Again
                    </button>
                  )}
                </div>
              </div>

              <p className="drill-question">{drill.question}</p>

              {hintLvl >= 1 && (
                <div className="hint-callout">
                  <strong>Hint 1:</strong> {drill.hint1}
                </div>
              )}
              {hintLvl >= 2 && (
                <div className="hint-callout hint-lvl-2">
                  <strong>Hint 2 (Step-by-Step):</strong> {drill.hint2}
                </div>
              )}

              <div className="options-grid">
                {drill.options.map((opt, optIdx) => {
                  const isSelected = chosen === optIdx;
                  let optClass = 'option-btn';
                  if (isSelected) optClass += ' selected';
                  if (isSubmitted) {
                    if (optIdx === drill.correctIndex) optClass += ' correct-choice';
                    else if (isSelected) optClass += ' wrong-choice';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={optClass}
                      onClick={() => handleSelectDrill(drill.id, optIdx)}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!isSubmitted ? (
                <div className="drill-submit-row">
                  <button
                    type="button"
                    className="btn-ghost-sm"
                    disabled={activeQIdx === 0}
                    onClick={() => setActiveQIdx((i) => Math.max(0, i - 1))}
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    className="btn-check-answer"
                    disabled={chosen === undefined}
                    onClick={() => handleCheckDrill(drill.id)}
                  >
                    Check Answer
                  </button>
                </div>
              ) : (
                <div className="drill-feedback-footer">
                  <div className={`explanation-box ${isCorrect ? 'exp-ok' : 'exp-err'}`}>
                    <strong>
                      {isCorrect
                        ? '✓ Correct!'
                        : '✗ Not quite — here is how it works:'}
                    </strong>
                    <p>{drill.explanation}</p>
                  </div>
                  <div className="drill-submit-row">
                    <button
                      type="button"
                      className="btn-ghost-sm"
                      disabled={activeQIdx === 0}
                      onClick={() => setActiveQIdx((i) => Math.max(0, i - 1))}
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      className="btn-check-answer"
                      onClick={() => setActiveQIdx(activeQIdx + 1)}
                    >
                      {activeQIdx + 1 < drills.length
                        ? `Next: Question ${activeQIdx + 2} →`
                        : 'Next: Synthesis Problem →'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()
      ) : (
        /* Single Boss Problem Card */
        <div
          className={`boss-problem-card single-focus-card ${
            bossSubmitted ? (isBossCorrect ? 'drill-correct' : 'drill-wrong') : ''
          }`}
        >
          <div className="boss-badge-row">
            <span className="boss-tag">
              Question {totalItems} of {totalItems} • Engineering Application
            </span>
            <div className="drill-actions-right">
              {!isBossCorrect && (
                <button
                  type="button"
                  className="btn-hint"
                  onClick={() => setShowBossHint(!showBossHint)}
                >
                  💡 {showBossHint ? 'Hide Hint' : 'Formula Setup Hint'}
                </button>
              )}
              {bossSubmitted && !isBossCorrect && (
                <button
                  type="button"
                  className="btn-retry"
                  onClick={() => {
                    setBossSubmitted(false);
                    setBossAnswer(null);
                  }}
                >
                  ↻ Try Again
                </button>
              )}
            </div>
          </div>

          <h4 className="boss-title">{bossProblem.title}</h4>
          <p className="boss-scenario">{bossProblem.scenario}</p>

          {showBossHint && (
            <div className="hint-callout">
              <strong>Engineering Formula Setup:</strong> {bossProblem.hint}
            </div>
          )}

          <div className="options-grid">
            {bossProblem.options.map((opt, optIdx) => {
              const isSelected = bossAnswer === optIdx;
              let optClass = 'option-btn';
              if (isSelected) optClass += ' selected';
              if (bossSubmitted) {
                if (optIdx === bossProblem.correctIndex) optClass += ' correct-choice';
                else if (isSelected) optClass += ' wrong-choice';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  className={optClass}
                  onClick={() => {
                    if (!bossSubmitted) setBossAnswer(optIdx);
                  }}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {!bossSubmitted ? (
            <div className="drill-submit-row">
              <button
                type="button"
                className="btn-ghost-sm"
                onClick={() => setActiveQIdx(drills.length - 1)}
              >
                ← Previous Question
              </button>
              <button
                type="button"
                className="btn-check-answer boss-submit-btn"
                disabled={bossAnswer === null}
                onClick={() => setBossSubmitted(true)}
              >
                Check Solution
              </button>
            </div>
          ) : (
            <div className="drill-feedback-footer">
              <div className={`explanation-box ${isBossCorrect ? 'exp-ok' : 'exp-err'}`}>
                <strong>
                  {isBossCorrect
                    ? '🏆 Correct! Engineering Application Mastered:'
                    : 'Almost! Check the breakdown below:'}
                </strong>
                <p>{bossProblem.explanation}</p>
              </div>

              <div className="drill-submit-row">
                <button
                  type="button"
                  className="btn-ghost-sm"
                  onClick={() => setActiveQIdx(drills.length - 1)}
                >
                  ← Previous Question
                </button>
                {isLessonPassed && nextLesson ? (
                  <button
                    type="button"
                    className="btn-unlock-next"
                    onClick={() => onJumpToNextLesson(nextLesson.id)}
                  >
                    Start Next Lesson: {nextLesson.code} →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-check-answer"
                    onClick={() => setShowSummary(true)}
                  >
                    View Quiz Results ({currentPercent}%) →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
