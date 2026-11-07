import React, { useState, useEffect } from 'react';

export default function MasteryGate({
  lesson,
  isLabDone,
  isLessonPassed,
  savedScore,
  onPassGate,
  onJumpToNextLesson,
  nextLesson,
}) {
  const { drills, bossProblem } = lesson.gate;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedDrills, setSubmittedDrills] = useState({});
  const [hintLevels, setHintLevels] = useState({}); // { [questionId]: 0 | 1 | 2 }
  const [bossAnswer, setBossAnswer] = useState(null);
  const [bossSubmitted, setBossSubmitted] = useState(false);
  const [showBossHint, setShowBossHint] = useState(false);

  // Reset local quiz state when switching lessons
  useEffect(() => {
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

  return (
    <section className="mastery-gate-section" id="mastery-gate">
      <div className="gate-header-row">
        <div>
          <span className="section-eyebrow">PREREQUISITE MASTERY GATE (80% REQUIRED TO UNLOCK NEXT CLASS)</span>
          <h3 className="gate-main-title">
            {lesson.code} Competency Verification
          </h3>
        </div>

        <div className="gate-progress-pillars">
          <div className={`pillar-chip ${isLabDone ? 'pillar-done' : ''}`}>
            <span>1. Visual Lab</span>
            <strong>{isLabDone ? '✓ Done' : 'Pending'}</strong>
          </div>
          <div className={`pillar-chip ${correctDrillCount === drills.length ? 'pillar-done' : ''}`}>
            <span>2. Fluency Drills</span>
            <strong>
              {correctDrillCount}/{drills.length}
            </strong>
          </div>
          <div className={`pillar-chip ${isBossCorrect ? 'pillar-done' : ''}`}>
            <span>3. UM MatE Boss</span>
            <strong>{isBossCorrect ? '✓ Defeated' : 'Pending'}</strong>
          </div>
        </div>
      </div>

      {!isLabDone && (
        <div className="gate-warning-banner">
          <span>
            <strong>Stage 1 Reminder:</strong> Make sure to interact with the 3Blue1Brown Visual Lab above (or click{' '}
            <em>"Mark Explored ✓"</em>) so your Stage 1 Visual Intuition credit counts toward unlocking the next class!
          </span>
        </div>
      )}

      {/* Stage 2: Procedural Fluency Drills */}
      <div className="drills-list">
        {drills.map((drill, idx) => {
          const isSubmitted = !!submittedDrills[drill.id];
          const chosen = selectedAnswers[drill.id];
          const isCorrect = isSubmitted && chosen === drill.correctIndex;
          const hintLvl = hintLevels[drill.id] || 0;

          return (
            <div
              key={drill.id}
              className={`drill-card ${
                isSubmitted ? (isCorrect ? 'drill-correct' : 'drill-wrong') : ''
              }`}
            >
              <div className="drill-top-bar">
                <span className="drill-number">Fluency Drill #{idx + 1}</span>
                <div className="drill-actions-right">
                  {hintLvl < 2 && !isCorrect && (
                    <button
                      type="button"
                      className="btn-hint"
                      onClick={() => revealNextHint(drill.id)}
                    >
                      💡 {hintLvl === 0 ? 'Need a Hint? (1/2)' : 'Show Step-by-Step Hint (2/2)'}
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
                    className="btn-check-answer"
                    disabled={chosen === undefined}
                    onClick={() => handleCheckDrill(drill.id)}
                  >
                    Check Answer
                  </button>
                </div>
              ) : (
                <div className={`explanation-box ${isCorrect ? 'exp-ok' : 'exp-err'}`}>
                  <strong>
                    {isCorrect
                      ? '✓ Spot on! Full Mastery:'
                      : '✗ Not quite — here is how the step-by-step works:'}
                  </strong>
                  <p>{drill.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stage 3: Boss Problem */}
      <div
        className={`boss-problem-card ${
          bossSubmitted ? (isBossCorrect ? 'drill-correct' : 'drill-wrong') : ''
        }`}
      >
        <div className="boss-badge-row">
          <span className="boss-tag">STAGE 3 • UM MATERIALS ENGINEERING SYNTHESIS BOSS</span>
          <div className="drill-actions-right">
            {!isBossCorrect && (
              <button
                type="button"
                className="btn-hint"
                onClick={() => setShowBossHint(!showBossHint)}
              >
                💡 {showBossHint ? 'Hide Engineering Hint' : 'Reveal Engineering Setup Hint'}
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
                ↻ Retry Boss Problem
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
              className="btn-check-answer boss-submit-btn"
              disabled={bossAnswer === null}
              onClick={() => setBossSubmitted(true)}
            >
              Submit Boss Solution
            </button>
          </div>
        ) : (
          <div className={`explanation-box ${isBossCorrect ? 'exp-ok' : 'exp-err'}`}>
            <strong>
              {isBossCorrect
                ? '🏆 Boss Defeated! UM Engineering Application Mastered:'
                : 'Almost! Check the step-by-step breakdown & click Retry Boss Problem:'}
            </strong>
            <p>{bossProblem.explanation}</p>
          </div>
        )}
      </div>

      {/* Final Gate Verdict Banner */}
      <div className={`gate-verdict-banner ${isLessonPassed ? 'verdict-passed' : ''}`}>
        <div>
          <h4>
            {isLessonPassed
              ? `🎓 Class Passed (${savedScore || currentPercent}% Mastery)! Prerequisite Gate Unlocked.`
              : `Current Gate Score: ${currentPercent}% (${totalCorrect}/${totalItems} problems + ${
                  isLabDone ? '1/1' : '0/1'
                } Visual Lab)`}
          </h4>
          <p>
            {isLessonPassed
              ? `You earned +${lesson.xpReward} XP and unlocked the next scheduled class in your UM BSMTE Prep Curriculum.`
              : 'Score at least 80% (3/4 problems correct) and complete the Stage 1 Visual Lab above to unlock the next class.'}
          </p>
        </div>

        {isLessonPassed && nextLesson && (
          <button
            type="button"
            className="btn-unlock-next"
            onClick={() => onJumpToNextLesson(nextLesson.id)}
          >
            Continue to {nextLesson.daySlot}: {nextLesson.code} →
          </button>
        )}
      </div>
    </section>
  );
}
