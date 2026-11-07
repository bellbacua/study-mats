import { useEffect, useMemo, useState } from 'react';
import { HISTORY_QUIZ } from '../data/historyQuiz';
import Glossed from './Glossed';
import { shuffled } from '../state/quiz';

const PASS = 0.75;

export default function Practice({ lesson, passed, onPass, onAttempt, onNext, nextLesson }) {
  const items = useMemo(() => {
    const { drills, bossProblem: b } = lesson.gate;
    const history = (HISTORY_QUIZ[lesson.id] || []).map((h, i) => ({
      ...h,
      id: `${lesson.id}-history-${i}`,
      label: 'History',
      isHistory: true,
      hints: [],
    }));
    const mixed = [];
    drills.forEach((d, i) => {
      mixed.push({ ...d, label: `Question ${i + 1}`, hints: [d.hint1, d.hint2].filter(Boolean) });
      if (history[i]) mixed.push(history[i]);
    });
    mixed.push(...history.slice(drills.length));
    mixed.push({ ...b, id: `${lesson.id}-boss`, label: 'Real engineering problem', question: b.scenario, heading: b.title, hints: [b.hint].filter(Boolean) });
    return mixed.map(shuffled);
  }, [lesson]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // id → { chosen, checked, hints }

  useEffect(() => {
    setIdx(0);
    setAnswers({});
  }, [lesson.id]);

  const item = items[idx];
  const a = answers[item.id] || { chosen: null, checked: false, hints: 0 };
  const set = (patch) => setAnswers((prev) => ({ ...prev, [item.id]: { ...a, ...patch } }));
  const isRight = (it) => answers[it.id]?.checked && answers[it.id].chosen === it.correctIndex;
  const correct = items.filter(isRight).length;
  const allChecked = items.every((it) => answers[it.id]?.checked);
  const score = Math.round((correct / items.length) * 100);

  useEffect(() => {
    if (allChecked && correct / items.length >= PASS && !passed) onPass(score);
  }, [allChecked, correct, items.length, passed, onPass, score]);

  const check = () => {
    set({ checked: true });
    onAttempt?.(item.id, a.chosen === item.correctIndex);
  };

  return (
    <div className="practice">
      <div className="practice-dots">
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            className={`dot ${it.isHistory ? 'history' : ''} ${i === idx ? 'current' : ''} ${answers[it.id]?.checked ? (isRight(it) ? 'right' : 'wrong') : ''}`}
            onClick={() => setIdx(i)}
            aria-label={it.label}
            title={it.isHistory ? 'History question' : it.label}
          >
            {i === items.length - 1 ? '★' : i + 1}
          </button>
        ))}
        <span className="practice-score">
          {correct}/{items.length} correct · need {Math.ceil(items.length * PASS)} to finish the lesson
        </span>
      </div>

      <article className="question">
        <span className={`eyebrow ${item.isHistory ? 'eyebrow-history' : ''}`}>
          {item.isHistory ? '📜 History · from the Story tab' : item.label}
        </span>
        {item.heading && <h3>{item.heading}</h3>}
        <p className="question-text">
          <Glossed text={item.question} />
        </p>

        {item.hints.slice(0, a.hints).map((h, i) => (
          <p key={i} className="hint">
            <strong>Hint {i + 1}.</strong> {h}
          </p>
        ))}

        <div className="options">
          {item.options.map((opt, i) => {
            let cls = 'option';
            if (a.chosen === i) cls += ' chosen';
            if (a.checked && i === item.correctIndex) cls += ' right';
            else if (a.checked && a.chosen === i) cls += ' wrong';
            return (
              <button key={i} type="button" className={cls} disabled={a.checked} onClick={() => set({ chosen: i })}>
                <span className="letter">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {a.checked && (
          <div className={`verdict ${a.chosen === item.correctIndex ? 'ok' : 'no'}`}>
            <strong>{a.chosen === item.correctIndex ? 'Correct.' : 'Not quite. Here is the working:'}</strong>
            <p>
              <Glossed text={item.explanation} />
            </p>
          </div>
        )}

        <div className="question-actions">
          {!a.checked && a.hints < item.hints.length && (
            <button type="button" className="btn ghost" onClick={() => set({ hints: a.hints + 1 })}>
              Show a hint
            </button>
          )}
          {a.checked && a.chosen !== item.correctIndex && (
            <button type="button" className="btn ghost" onClick={() => set({ chosen: null, checked: false })}>
              Try again
            </button>
          )}
          <span className="spacer" />
          {!a.checked ? (
            <button type="button" className="btn primary" disabled={a.chosen === null} onClick={check}>
              Check
            </button>
          ) : idx < items.length - 1 ? (
            <button type="button" className="btn primary" onClick={() => setIdx(idx + 1)}>
              Next question →
            </button>
          ) : null}
        </div>
      </article>

      {passed && (
        <div className="lesson-done">
          <div>
            <strong>Lesson complete.</strong> Saved to your progress.
          </div>
          {nextLesson && (
            <button type="button" className="btn primary" onClick={onNext}>
              Next lesson: {nextLesson.title.split(':')[0]} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
