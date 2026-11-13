import { useEffect, useRef, useState } from 'react';
import MathFormula from './MathFormula';
import Glossed from './Glossed';
import { shuffled } from '../state/quiz';
import { crossedOut, exampleValue, firstSteps, levelsFor, nearestExample } from '../state/practiceHelp';

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
export default function LearnIt({ lessonId, deep, done, onPartDone, onFinish, onAnswer, form, startPart = 0 }) {
  const [part, setPart] = useState(startPart);
  useEffect(() => setPart(startPart), [lessonId, startPart]);
  const P = deep.parts[part];
  const allDone = deep.parts.every((_, k) => done(k));
  const levels = levelsFor(lessonId, deep);

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

      <Part
        key={`${lessonId}-${part}`}
        p={P}
        n={part}
        lessonId={lessonId}
        levels={levels}
        form={form}
        count={deep.parts.length}
        done={done(part)}
        onDone={() => onPartDone(part)}
        onAnswer={onAnswer && ((k, right, info) => onAnswer(part, k, right, info))}
      />

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

const FORM_NOTE = {
  struggling: 'Taking it gently: the easier problems come first, and the second example leaves only its last step for you.',
  cruising: 'You are on a roll: the second example is yours to try cold, and the harder problems come first.',
};

function Part({ p, n, lessonId, levels, form, count, done, onDone, onAnswer }) {
  const [right, setRight] = useState({});
  // The learner's form when the part opened; it does not reshuffle mid-part.
  const [mode] = useState(form?.mode || 'steady');
  const total = p.practice.length;
  const got = Object.values(right).filter(Boolean).length;
  useEffect(() => {
    if (!done && got === total) onDone();
  }, [got, total, done, onDone]);
  const order = p.practice.map((_, k) => k);
  if (mode === 'struggling') order.sort((a, b) => (levels[`${n}:${a}`] || 2) - (levels[`${n}:${b}`] || 2) || a - b);
  if (mode === 'cruising') order.sort((a, b) => (levels[`${n}:${b}`] || 2) - (levels[`${n}:${a}`] || 2) || a - b);
  const [watch, ...fade] = p.examples;

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

      {FORM_NOTE[mode] && <p className={`form-note ${mode}`}>{FORM_NOTE[mode]}</p>}

      <h3 className="part-h">
        <span className="fade-num">1</span> Watch one solved
      </h3>
      <p className="notes-hint">Try the next step in your head (or on paper) before you reveal it.</p>
      <Worked e={watch} k={0} />

      <h3 className="part-h">
        <span className="fade-num">2</span> Finish one yourself
      </h3>
      {fade.map((e, k) => (
        <Faded key={k} e={e} k={k + 1} cold={mode === 'cruising'} />
      ))}

      <h3 className="part-h">
        <span className="fade-num">3</span> On your own <span className="notes-hint">· {got} of {total} right</span>
      </h3>
      {p.practice.some((it) => !it.options) && (
        <p className="notes-hint">
          {p.practice.some((it) => it.options) ? 'Pick an option, or type the answer where there is a box. ' : 'Type the answer. '}
          Fractions, π, e and √ work (for example 1/6, pi/4, 2e, sqrt(2)). Use “inf” for infinity and “dne” if it does not exist. Stuck? “Hint” gives a
          little help at a time.
        </p>
      )}
      {order.map((k, i) => (
        <Problem
          key={k}
          item={p.practice[k]}
          k={i}
          part={p}
          seed={`${lessonId}:${n}:${k}`}
          onRight={() => setRight((r) => ({ ...r, [k]: true }))}
          onAnswer={onAnswer && ((ok, info) => onAnswer(k, ok, { ...info, lv: levels[`${n}:${k}`] }))}
        />
      ))}
    </article>
  );
}

function Steps({ steps }) {
  return steps.map(([text, tex], i) => (
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
  ));
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
        <Steps steps={e.steps.slice(0, shownSteps)} />
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

// The second example with its last step left for the learner (or, when they
// are cruising, the whole thing). A number answer can be typed and checked;
// otherwise they work it on paper and compare.
function Faded({ e, k, cold: wantCold }) {
  const value = exampleValue(e, parseAnswer);
  const [cold, setCold] = useState(wantCold && value !== null);
  const given = cold ? [] : e.steps.slice(0, -1);
  const [val, setVal] = useState('');
  const [state, setState] = useState(null); // null | right | wrong | unread
  const [tries, setTries] = useState(0);
  const [open, setOpen] = useState(false);
  const [self, setSelf] = useState(null);
  const check = () => {
    const r = isRight({ a: value }, val);
    if (r === null) return setState('unread');
    setTries((t) => t + 1);
    setState(r ? 'right' : 'wrong');
    if (r) setOpen(true);
  };
  const finished = open || state === 'right';
  return (
    <div className={`worked faded ${state === 'right' || self === 'yes' ? 'ok' : ''}`}>
      <p className="worked-q">
        <strong>Example {k + 1}.</strong> <Glossed text={e.problem} />
      </p>
      <Code text={e.code} />
      <ol className="worked-steps">
        <Steps steps={finished ? e.steps : given} />
        {!finished && (
          <li className="faded-blank">
            <span>{cold ? 'Your turn: solve it from the start.' : given.length ? 'Your step: finish it from here.' : 'Your turn: solve it.'}</span>
          </li>
        )}
      </ol>
      {!finished && value !== null && (
        <div className="problem-row">
          <input
            type="text"
            inputMode="decimal"
            value={val}
            placeholder="your answer"
            onChange={(ev) => (setVal(ev.target.value), setState(null))}
            onKeyDown={(ev) => ev.key === 'Enter' && val.trim() && check()}
            aria-label={`Answer to example ${k + 1}`}
          />
          <button type="button" className="btn primary sm" disabled={!val.trim()} onClick={check}>
            Check
          </button>
          {cold ? (
            <button type="button" className="btn ghost sm" onClick={() => setCold(false)}>
              Show all but the last step
            </button>
          ) : (
            (tries >= 1 || state === 'unread') && (
              <button type="button" className="btn ghost sm" onClick={() => setOpen(true)}>
                Show the last step
              </button>
            )
          )}
        </div>
      )}
      {!finished && value === null && (
        <div className="problem-row">
          <span className="notes-hint">Work the last step on paper, then compare.</span>
          <button type="button" className="btn ghost sm" onClick={() => setOpen(true)}>
            Compare with the last step
          </button>
        </div>
      )}
      {state === 'unread' && <p className="problem-msg">I could not read that as a number. Leave out the unit, for example 12 or 0.25.</p>}
      {state === 'wrong' && <p className="problem-msg no">Not yet. Look at the steps above again, or show the last step.</p>}
      {finished && (
        <p className="worked-a">
          {state === 'right' ? '✓ Right. ' : ''}Answer: <strong>{e.answer}</strong>
        </p>
      )}
      {finished && state !== 'right' && value === null && (
        <div className="self-check">
          {self ? (
            <span className="notes-hint">{self === 'yes' ? 'Nice. On to your own problems.' : 'That is what the examples are for. Read the last step once more, then try the problems below.'}</span>
          ) : (
            <>
              <span className="notes-hint">Did your step match?</span>
              <button type="button" className="btn ghost sm" onClick={() => setSelf('yes')}>
                Yes
              </button>
              <button type="button" className="btn ghost sm" onClick={() => setSelf('no')}>
                Not quite
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// A written first step with its result filled in, for the full answer when the
// solution itself is only the result. Only when the "?" is the final result.
function working(item) {
  if (!item.steps || typeof item.a !== 'number') return null;
  const m = /\?([^?/]*)$/.exec(item.steps);
  if (!m || /^\s*\//.test(m[1])) return null;
  return item.steps.slice(0, m.index) + shown(item.a) + m[1];
}

// ---- the hint ladder ----------------------------------------------------------
const RUNG_ASK = ['Hint', 'Show a solved one like it', 'Show the first steps', 'Show the full answer'];
const RUNG_NAME = ['Nudge', 'A solved one like it', 'The first steps', 'The full answer'];

// The rungs a problem has (1 nudge, 2 solved example, 3 first steps, 4 answer).
function rungsFor(item, part) {
  const r = [];
  if (item.hint) r.push(1);
  if (part?.examples?.length) r.push(2);
  if (item.options || firstSteps(item)) r.push(3);
  r.push(4);
  return r;
}

function Ladder({ item, part, rungs, help, steps, crossed }) {
  if (!help) return null;
  const ex = part && nearestExample(part, item);
  const e = ex != null ? part.examples[ex] : null;
  return (
    <div className="ladder-open">
      {rungs
        .filter((r) => r <= help && r < 4)
        .map((r) => (
          <div key={r} className={`rung rung-${r}`}>
            <span className="rung-name">
              <span className="rung-dot">{rungs.indexOf(r) + 1}</span>
              {RUNG_NAME[r - 1]}
            </span>
            {r === 1 && (
              <p>
                <Glossed text={item.hint} />
              </p>
            )}
            {r === 2 && e && (
              <div className="rung-example">
                <p>
                  <Glossed text={e.problem} />
                </p>
                <ol className="worked-steps">
                  <Steps steps={e.steps} />
                </ol>
                <p className="worked-a">
                  Answer: <strong>{e.answer}</strong>
                </p>
              </div>
            )}
            {r === 3 &&
              (item.options ? (
                <p>
                  {crossed.length === 1 ? 'One option is' : `${crossed.length} options are`} crossed out: {crossed.length === 1 ? 'it is' : 'they are'} not the answer.
                </p>
              ) : (
                <p>
                  <Glossed text={steps} /> <span className="notes-hint">Work out the “?”.</span>
                </p>
              ))}
          </div>
        ))}
    </div>
  );
}

// Tells the mistakes notebook and the learner's form how the first try went.
// A right answer after the first steps or the full answer counts as needing
// help, so it goes into the notebook to redo later.
function useReport(onAnswer) {
  const sent = useRef(false);
  return (right, help) => {
    if (!onAnswer || sent.current) return;
    sent.current = true;
    onAnswer(right && help < 3, { help, gotIt: right });
  };
}

function useLadder(item, part) {
  const rungs = rungsFor(item, part);
  const [help, setHelp] = useState(0); // highest rung opened
  const next = rungs.find((r) => r > help);
  return { rungs, help, next, more: () => next && setHelp(next), answer: () => setHelp(4) };
}

// "Hint", then the next rung each time. The full answer shows up once some help
// has been taken or after two wrong tries.
function LadderButtons({ L, done, tries }) {
  if (done || L.help >= 4) return null;
  const n = L.rungs.indexOf(L.next) + 1;
  const answerOk = L.help > 0 || tries >= 2;
  return (
    <>
      {L.next !== 4 && (
        <button type="button" className="btn ghost sm ladder-btn" onClick={L.more}>
          {L.help === 0 ? 'Hint' : RUNG_ASK[L.next - 1]}
          <span className="ladder-count">
            {n} of {L.rungs.length}
          </span>
        </button>
      )}
      {answerOk && (L.next === 4 || tries >= 2) && (
        <button type="button" className="btn ghost sm" onClick={L.answer}>
          Show the full answer
        </button>
      )}
    </>
  );
}

// A practice question answered by picking an option (the first one written is
// correct; they are shuffled the same way every time).
function ChoiceProblem({ item, k, part, seed, onRight, onAnswer }) {
  const report = useReport(onAnswer);
  const mixed = shuffled({ id: item.q, options: item.options, correctIndex: 0 });
  const L = useLadder(item, part);
  const crossed = L.help >= 3 ? crossedOut(mixed, seed || item.q) : [];
  const [pick, setPick] = useState(null);
  const [tries, setTries] = useState(0);
  const right = pick === mixed.correctIndex;
  const showAnswer = right || tries >= 3 || L.help >= 4;
  const choose = (i) => {
    if (right) return;
    setPick(i);
    setTries((t) => t + 1);
    report(i === mixed.correctIndex, L.help);
    if (i === mixed.correctIndex) onRight();
  };
  return (
    <div className={`problem ${right ? 'ok' : ''}`}>
      <ProblemHead item={item} k={k} />
      <div className="options problem-options">
        {mixed.options.map((o, i) => (
          <button
            key={i}
            type="button"
            className={`option ${pick === i ? (i === mixed.correctIndex ? 'right' : 'wrong') : ''} ${crossed.includes(i) && !right ? 'crossed' : ''}`}
            disabled={right || crossed.includes(i)}
            onClick={() => choose(i)}
          >
            {o}
          </button>
        ))}
      </div>
      {!showAnswer && (
        <div className="problem-row ladder-row">
          <LadderButtons L={L} done={right} tries={tries} />
        </div>
      )}
      <Ladder item={item} part={part} rungs={L.rungs} help={right ? 0 : L.help} crossed={crossed} />
      {pick !== null && !right && <p className="problem-msg no">Not that one. {tries >= 2 ? 'Take a hint, then try again.' : 'Try again.'}</p>}
      {showAnswer && (
        <p className={`problem-msg ${right ? 'ok' : ''}`}>
          {right ? '✓ Right. ' : `Answer: ${item.options[0]}. `}
          <Glossed text={item.solution} />
        </p>
      )}
    </div>
  );
}

function ProblemHead({ item, k }) {
  return (
    <>
      <p>
        <strong>{k + 1}.</strong> <Glossed text={item.q} />
      </p>
      <Code text={item.code} />
    </>
  );
}

export function Problem(props) {
  if (props.item.options) return <ChoiceProblem {...props} />;
  return <TypedProblem {...props} />;
}

function TypedProblem({ item, k, part, onRight, onAnswer }) {
  const report = useReport(onAnswer);
  const L = useLadder(item, part);
  const [val, setVal] = useState('');
  const [state, setState] = useState(null); // null | 'right' | 'wrong' | 'unread'
  const [tries, setTries] = useState(0);
  const sol = L.help >= 4;
  const check = () => {
    const r = isRight(item, val);
    if (r === null) return setState('unread');
    setTries((t) => t + 1);
    setState(r ? 'right' : 'wrong');
    report(r, L.help);
    if (r) onRight();
  };
  const isDone = state === 'right';
  return (
    <div className={`problem ${isDone ? 'ok' : ''}`}>
      <ProblemHead item={item} k={k} />
      <div className="problem-row">
        <input
          type="text"
          inputMode="decimal"
          value={val}
          placeholder="your answer"
          disabled={isDone}
          onChange={(ev) => (setVal(ev.target.value), !isDone && setState(null))}
          onKeyDown={(ev) => ev.key === 'Enter' && check()}
          aria-label={`Answer to problem ${k + 1}`}
        />
        <button type="button" className="btn primary sm" disabled={isDone || !val.trim()} onClick={check}>
          Check
        </button>
        <LadderButtons L={L} done={isDone} tries={tries} />
      </div>
      {state === 'unread' && <p className="problem-msg">I could not read that as a number. Try something like 0.25, 1/4 or −3.</p>}
      {state === 'wrong' && <p className="problem-msg no">Not yet. {tries >= 2 ? 'Check your working, or take the next hint.' : 'Try again.'}</p>}
      <Ladder item={item} part={part} rungs={L.rungs} help={isDone ? 0 : L.help} steps={firstSteps(item)} />
      {(isDone || sol) && (
        <p className={`problem-msg ${isDone ? 'ok' : ''}`}>
          {isDone ? '✓ Right. ' : `Answer: ${shown(item.a)}. `}
          <Glossed text={item.solution} />
          {working(item) && <span className="worked-line">Working: {working(item)}</span>}
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
