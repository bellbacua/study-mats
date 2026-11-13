import { useEffect, useRef, useState } from 'react';
import MathFormula from './MathFormula';
import Glossed from './Glossed';
import { shuffled } from '../state/quiz';

// ---- checking a typed answer -------------------------------------------------
// Accepts numbers, fractions and simple sums like "1/6", "-2.5", "2e", "sqrt(2)",
// "pi/4", plus words for infinity and "does not exist".
const WORDS = {
  inf: ['inf', 'infinity', '∞', '+∞', '+inf', '+infinity'],
  '-inf': ['-inf', '-infinity', '-∞', '−∞', '−inf'],
  dne: ['dne', 'does not exist', 'doesnt exist', "doesn't exist", 'none', 'no limit'],
};

export function parseAnswer(raw) {
  const s = String(raw).trim().toLowerCase().replace(/−/g, '-').replace(/,/g, '').replace(/\s+/g, ' ');
  if (!s) return null;
  for (const [k, list] of Object.entries(WORDS)) if (list.includes(s)) return k;
  // tiny safe calculator: numbers, + - * / ^ ( ), pi, e, sqrt, ln
  const src = s.replace(/\s/g, '').replace(/π/g, 'pi').replace(/√/g, 'sqrt');
  let i = 0;
  const peek = () => src[i];
  const num = () => {
    const m = /^(\d+\.?\d*|\.\d+)/.exec(src.slice(i));
    if (m) {
      i += m[0].length;
      return Number(m[0]);
    }
    for (const [name, v] of [['pi', Math.PI], ['e', Math.E]]) {
      if (src.startsWith(name, i) && !/[a-z]/.test(src[i + name.length] || '')) {
        i += name.length;
        return v;
      }
    }
    for (const [name, f] of [['sqrt', Math.sqrt], ['ln', Math.log]]) {
      if (src.startsWith(name, i)) {
        i += name.length;
        return f(atom());
      }
    }
    throw new Error('bad');
  };
  const atom = () => {
    if (peek() === '(') {
      i++;
      const v = expr();
      if (peek() !== ')') throw new Error('bad');
      i++;
      return v;
    }
    if (peek() === '-') {
      i++;
      return -atom();
    }
    if (peek() === '+') {
      i++;
      return atom();
    }
    return num();
  };
  const power = () => {
    let v = atom();
    // implicit multiplication like 2e, 2pi, 3sqrt(2), 2(3)
    while (i < src.length && /[a-z(0-9.]/.test(peek()) && !/[*/+\-^)]/.test(peek())) v *= atom();
    if (peek() === '^') {
      i++;
      v **= power();
    }
    return v;
  };
  const term = () => {
    let v = power();
    while (peek() === '*' || peek() === '/') {
      const op = src[i++];
      const w = power();
      v = op === '*' ? v * w : v / w;
    }
    return v;
  };
  const expr = () => {
    let v = term();
    while (peek() === '+' || peek() === '-') {
      const op = src[i++];
      const w = term();
      v = op === '+' ? v + w : v - w;
    }
    return v;
  };
  try {
    const v = expr();
    return i === src.length && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

export function isRight(item, raw) {
  const v = parseAnswer(raw);
  if (v === null) return null;
  if (typeof item.a === 'string') return v === item.a;
  if (typeof v === 'string') return false;
  const tol = item.tol ?? Math.max(0.01 * Math.abs(item.a), 0.005);
  return Math.abs(v - item.a) <= tol;
}

const shown = (a) => (a === 'inf' ? '+∞' : a === '-inf' ? '−∞' : a === 'dne' ? 'does not exist' : `${Math.round(a * 1000) / 1000}`.replace('-', '−'));

// ---- the "Learn it" section ----------------------------------------------------
export default function LearnIt({ lessonId, deep, done, onPartDone, onFinish, onAnswer, startPart = 0 }) {
  const [part, setPart] = useState(startPart);
  useEffect(() => setPart(startPart), [lessonId, startPart]);
  const P = deep.parts[part];
  const allDone = deep.parts.every((_, k) => done(k));

  return (
    <section className="learn">
      <div className="part-bar">
        {deep.parts.map((p, k) => (
          <button key={k} type="button" className={`part-chip ${k === part ? 'on' : ''} ${done(k) ? 'done' : ''}`} onClick={() => setPart(k)}>
            <span className="part-num">{done(k) ? '✓' : k + 1}</span>
            <span className="part-title">{p.title}</span>
          </button>
        ))}
      </div>

      <Part key={`${lessonId}-${part}`} p={P} n={part} count={deep.parts.length} done={done(part)} onDone={() => onPartDone(part)} onAnswer={onAnswer && ((k, right) => onAnswer(part, k, right))} />

      <div className="step-nav part-nav">
        {part > 0 ? (
          <button type="button" className="btn ghost" onClick={() => setPart(part - 1)}>
            ← Part {part}
          </button>
        ) : (
          <span />
        )}
        {part < deep.parts.length - 1 ? (
          <button type="button" className="btn primary" onClick={() => (setPart(part + 1), window.scrollTo({ top: 0, behavior: 'smooth' }))}>
            Part {part + 2}: {deep.parts[part + 1].title} →
          </button>
        ) : (
          <button type="button" className="btn primary" onClick={onFinish}>
            {allDone ? 'All parts done: take the class quiz →' : 'Go to the class quiz →'}
          </button>
        )}
      </div>
    </section>
  );
}

function Part({ p, n, count, done, onDone, onAnswer }) {
  const [right, setRight] = useState({});
  const total = p.practice.length;
  const got = Object.values(right).filter(Boolean).length;
  useEffect(() => {
    if (!done && got === total) onDone();
  }, [got, total, done, onDone]);

  return (
    <article className="part">
      <span className="eyebrow">
        Part {n + 1} of {count} · about {p.minutes} minutes {done ? '· ✓ done' : ''}
      </span>
      <h2>{p.title}</h2>
      <div className="part-explain">
        {p.explain.map((t, k) => (
          <p key={k}>
            <Glossed text={t} />
          </p>
        ))}
      </div>
      {(p.code || []).map(([label, text]) => (
        <div key={label} className="part-formula">
          <span className="eyebrow">{label}</span>
          <Code text={text} />
        </div>
      ))}
      <div className="part-formulas">
        {(p.formulas || []).map(([label, tex]) => (
          <div key={label} className="part-formula">
            <span className="eyebrow">{label}</span>
            <MathFormula tex={tex} />
          </div>
        ))}
      </div>

      <h3 className="part-h">Worked examples</h3>
      <p className="notes-hint">Read the problem and try the next step in your head (or on paper) before you reveal it.</p>
      {p.examples.map((e, k) => (
        <Worked key={k} e={e} k={k} />
      ))}

      <h3 className="part-h">
        Your turn <span className="notes-hint">· {got} of {total} right</span>
      </h3>
      {p.practice.some((it) => !it.options) && (
        <p className="notes-hint">
          {p.practice.some((it) => it.options) ? 'Pick an option, or type the answer where there is a box. ' : 'Type the answer. '}
          Fractions, π, e and √ work (for example 1/6, pi/4, 2e, sqrt(2)). Use “inf” for infinity and “dne” if it does not exist.
        </p>
      )}
      {p.practice.map((item, k) => (
        <Problem key={k} item={item} k={k} onRight={() => setRight((r) => ({ ...r, [k]: true }))} onAnswer={onAnswer && ((ok) => onAnswer(k, ok))} />
      ))}
    </article>
  );
}

function Worked({ e, k }) {
  const [shownSteps, setShown] = useState(0);
  const all = shownSteps >= e.steps.length;
  return (
    <div className="worked">
      <p className="worked-q">
        <strong>Example {k + 1}.</strong> <Glossed text={e.problem} />
      </p>
      <Code text={e.code} />
      <ol className="worked-steps">
        {e.steps.slice(0, shownSteps).map(([text, tex], i) => (
          <li key={i}>
            <span>
              <Glossed text={text} />
            </span>
            {tex && (
              <div className="formula">
                <MathFormula tex={tex} />
              </div>
            )}
          </li>
        ))}
      </ol>
      {all ? (
        <p className="worked-a">
          Answer: <strong>{e.answer}</strong>
        </p>
      ) : (
        <button type="button" className="btn ghost sm" onClick={() => setShown(shownSteps + 1)}>
          {shownSteps === 0 ? 'Show the first step' : `Show step ${shownSteps + 1} of ${e.steps.length}`}
        </button>
      )}
    </div>
  );
}

// Tells the mistakes notebook how the first try on this problem went: a miss
// goes into the notebook, a first-try right answer marks an old miss fixed.
function useReport(onAnswer) {
  const sent = useRef(false);
  return (right) => {
    if (!onAnswer || sent.current) return;
    sent.current = true;
    onAnswer(right);
  };
}

// A practice question answered by picking an option (the first one written is
// correct; they are shuffled the same way every time).
function ChoiceProblem({ item, k, onRight, onAnswer }) {
  const report = useReport(onAnswer);
  const mixed = shuffled({ id: item.q, options: item.options, correctIndex: 0 });
  const [pick, setPick] = useState(null);
  const [tries, setTries] = useState(0);
  const [hint, setHint] = useState(false);
  const right = pick === mixed.correctIndex;
  const choose = (i) => {
    if (right) return;
    setPick(i);
    setTries((t) => t + 1);
    report(i === mixed.correctIndex);
    if (i === mixed.correctIndex) onRight();
  };
  return (
    <div className={`problem ${right ? 'ok' : ''}`}>
      <p>
        <strong>{k + 1}.</strong> <Glossed text={item.q} />
      </p>
      <Code text={item.code} />
      <div className="options problem-options">
        {mixed.options.map((o, i) => (
          <button
            key={i}
            type="button"
            className={`option ${pick === i ? (i === mixed.correctIndex ? 'right' : 'wrong') : ''}`}
            disabled={right}
            onClick={() => choose(i)}
          >
            {o}
          </button>
        ))}
      </div>
      {!hint && !right && (
        <button type="button" className="btn ghost sm" onClick={() => setHint(true)}>
          Hint
        </button>
      )}
      {pick !== null && !right && <p className="problem-msg no">Not that one. {tries >= 2 ? 'Read the hint, then try again.' : 'Try again.'}</p>}
      {hint && !right && (
        <p className="problem-msg hint">
          💡 <Glossed text={item.hint} />
        </p>
      )}
      {(right || tries >= 3) && (
        <p className={`problem-msg ${right ? 'ok' : ''}`}>
          {right ? '✓ Right. ' : `Answer: ${item.options[0]}. `}
          <Glossed text={item.solution} />
        </p>
      )}
    </div>
  );
}

export function Problem({ item, k, onRight, onAnswer }) {
  if (item.options) return <ChoiceProblem item={item} k={k} onRight={onRight} onAnswer={onAnswer} />;
  return <TypedProblem item={item} k={k} onRight={onRight} onAnswer={onAnswer} />;
}

function TypedProblem({ item, k, onRight, onAnswer }) {
  const report = useReport(onAnswer);
  const [val, setVal] = useState('');
  const [state, setState] = useState(null); // null | 'right' | 'wrong' | 'unread'
  const [tries, setTries] = useState(0);
  const [hint, setHint] = useState(false);
  const [sol, setSol] = useState(false);
  const check = () => {
    const r = isRight(item, val);
    if (r === null) return setState('unread');
    setTries((t) => t + 1);
    setState(r ? 'right' : 'wrong');
    report(r);
    if (r) onRight();
  };
  return (
    <div className={`problem ${state === 'right' ? 'ok' : ''}`}>
      <p>
        <strong>{k + 1}.</strong> <Glossed text={item.q} />
      </p>
      <Code text={item.code} />
      <div className="problem-row">
        <input
          type="text"
          inputMode="decimal"
          value={val}
          placeholder="your answer"
          disabled={state === 'right'}
          onChange={(ev) => (setVal(ev.target.value), state !== 'right' && setState(null))}
          onKeyDown={(ev) => ev.key === 'Enter' && check()}
          aria-label={`Answer to problem ${k + 1}`}
        />
        <button type="button" className="btn primary sm" disabled={state === 'right' || !val.trim()} onClick={check}>
          Check
        </button>
        {!hint && state !== 'right' && (
          <button type="button" className="btn ghost sm" onClick={() => setHint(true)}>
            Hint
          </button>
        )}
        {tries >= 2 && !sol && state !== 'right' && (
          <button type="button" className="btn ghost sm" onClick={() => setSol(true)}>
            Show the solution
          </button>
        )}
      </div>
      {state === 'unread' && <p className="problem-msg">I could not read that as a number. Try something like 0.25, 1/4 or −3.</p>}
      {state === 'wrong' && <p className="problem-msg no">Not yet. {tries >= 2 ? 'Check your working, or look at the solution.' : 'Try again.'}</p>}
      {hint && state !== 'right' && (
        <p className="problem-msg hint">
          💡 <Glossed text={item.hint} />
        </p>
      )}
      {(state === 'right' || sol) && (
        <p className={`problem-msg ${state === 'right' ? 'ok' : ''}`}>
          {state === 'right' ? '✓ Right. ' : `Answer: ${shown(item.a)}. `}
          <Glossed text={item.solution} />
        </p>
      )}
    </div>
  );
}

// ---- predict before the visual ----------------------------------------------
export function Predict({ predict: raw, children }) {
  const [pick, setPick] = useState(null);
  if (!raw) return children;
  // Shuffle the options the same way every time, so the right one is not always in the same place.
  const mixed = shuffled({ id: raw.q, options: raw.options, correctIndex: raw.answer });
  const predict = { ...raw, options: mixed.options, answer: mixed.correctIndex };
  return (
    <>
      <div className="predict">
        <span className="eyebrow">Predict first</span>
        <p className="question-text">{predict.q}</p>
        <p className="notes-hint">Commit to a guess before you play with the animation. Being wrong first makes it stick.</p>
        <div className="options">
          {predict.options.map((o, k) => (
            <button
              key={k}
              type="button"
              disabled={pick !== null}
              className={`option ${pick !== null && k === predict.answer ? 'right' : ''} ${pick === k && k !== predict.answer ? 'wrong' : ''}`}
              onClick={() => setPick(k)}
            >
              <span className="letter">{String.fromCharCode(65 + k)}</span>
              {o}
            </button>
          ))}
        </div>
        {pick !== null && pick >= 0 && (
          <div className={`verdict ${pick === predict.answer ? 'ok' : 'no'}`}>
            <strong>{pick === predict.answer ? 'Good guess.' : 'Surprise.'}</strong> <Glossed text={predict.reveal} /> Now check it in the animation.
          </div>
        )}
        {pick === null && (
          <div className="predict-skip">
            <span>Not sure yet?</span>
            <button type="button" className="btn ghost sm" onClick={() => setPick(-1)}>
              Skip to the animation →
            </button>
          </div>
        )}
      </div>
      {pick !== null && children}
    </>
  );
}

// A short program to read (Computer Science classes).
function Code({ text }) {
  if (!text) return null;
  return (
    <pre className="code-block">
      <code>{text}</code>
    </pre>
  );
}
