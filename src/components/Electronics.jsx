import { lazy, Suspense, useMemo, useState } from 'react';
import { PARTS, GROUPS, COLOURS, E12, ohms, CODE_SOURCES } from '../data/library/parts';
import { CIRCUIT_CASES } from '../data/library/circuitCases';
import { useWikiPic, filePage } from './Pictures';
import { ClassChips, Sources } from './LibBits';
import Schematic, { DipPinout } from './Schematic';
// three.js is only fetched when a model is on screen
const Part3DLazy = lazy(() => import('./Part3D'));
const Part3D = (props) => (
  <Suspense fallback={<div className="part3d" style={{ height: props.height || 220 }} />}>
    <Part3DLazy {...props} />
  </Suspense>
);

const norm = (s) => (s || '').toLowerCase();
const hit = (q, ...fields) => !q || fields.some((f) => norm(f).includes(q));
const byColour = Object.fromEntries(COLOURS.map((c) => [c.id, c]));

// ---------------------------------------------------------------- colour code

const DIGITS = COLOURS.filter((c) => c.digit != null);
const MULTS = COLOURS.filter((c) => c.mult != null);
const TOLS = COLOURS.filter((c) => c.tol != null);

const valueOf = (bands) => {
  const ds = bands.slice(0, bands.length - 2).map((id) => byColour[id].digit);
  const n = Number(ds.join(''));
  return n * byColour[bands[bands.length - 2]].mult;
};

// "4.7k", "220", "1M", "4k7" → ohms
const parseOhms = (s) => {
  const t = s.trim().replace(/Ω|ohms?/gi, '').replace(',', '.').toLowerCase();
  const m = /^(\d*\.?\d*)\s*([kmr]?)(\d*)$/.exec(t);
  if (!m || (!m[1] && !m[3])) return null;
  const num = m[3] ? Number(`${m[1] || 0}.${m[3]}`) : Number(m[1]);
  const mul = { k: 1e3, m: 1e6, r: 1, '': 1 }[m[2]];
  const v = num * mul;
  return v > 0 && Number.isFinite(v) ? v : null;
};

// The bands for a value, with `sig` significant digits.
const bandsFor = (v, sig, tol) => {
  let exp = Math.floor(Math.log10(v)) - (sig - 1);
  let digits = Math.round(v / 10 ** exp);
  if (digits >= 10 ** sig) {
    digits /= 10;
    exp += 1;
  }
  const mult = MULTS.find((c) => Math.abs(Math.log10(c.mult) - exp) < 1e-9);
  if (!mult) return null;
  const ds = String(digits).padStart(sig, '0').split('').map((d) => DIGITS[Number(d)].id);
  return { bands: [...ds, mult.id, tol], exact: Math.abs(digits * 10 ** exp - v) / v < 1e-6, shown: digits * 10 ** exp };
};

function Swatches({ list, value, onPick, label }) {
  return (
    <div className="rc-swatches" role="radiogroup" aria-label={label}>
      {list.map((c) => (
        <button
          key={c.id}
          type="button"
          role="radio"
          aria-checked={value === c.id}
          className={`rc-sw ${value === c.id ? 'on' : ''}`}
          style={{ '--c': c.hex }}
          onClick={() => onPick(c.id)}
          title={c.name}
        >
          <span className="sr-only">{c.name}</span>
        </button>
      ))}
    </div>
  );
}

const QUIZ_KEY = 'rcode:5';
const randomResistor = () => {
  const d = E12[Math.floor(Math.random() * E12.length)];
  const exp = Math.floor(Math.random() * 5); // 10 Ω to 820 kΩ
  return d * 10 ** exp;
};
const quizRound = () => {
  const v = randomResistor();
  const opts = new Set([v]);
  // tempting wrong answers: the same digits a factor of ten away, and the digits swapped
  const s = String(Math.round(v / 10 ** Math.floor(Math.log10(v) - 1)));
  const swapped = Number(s[1] + s[0]) * 10 ** Math.floor(Math.log10(v) - 1);
  for (const o of [v * 10, v / 10, swapped, v * 100]) if (o >= 1 && o < 1e8 && opts.size < 4 && s[1] !== '0') opts.add(o);
  while (opts.size < 4) opts.add(randomResistor());
  return { v, opts: [...opts].sort(() => Math.random() - 0.5) };
};

function ColourCode({ progress, onMark }) {
  const [n, setN] = useState(4);
  const [bands, setBands] = useState(['yellow', 'violet', 'red', 'gold']);
  const [typed, setTyped] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState(null);
  const setCount = (k) => {
    setN(k);
    setBands(k === 5 ? ['brown', 'black', 'black', 'red', 'brown'] : ['yellow', 'violet', 'red', 'gold']);
  };
  const setBand = (i, id) => setBands(bands.map((b, j) => (j === i ? id : b)));
  const v = valueOf(bands);
  const tol = byColour[bands[bands.length - 1]].tol;
  const fromTyped = () => {
    const val = parseOhms(typed);
    if (!val) return;
    const r = bandsFor(val, n - 2, n === 5 ? 'brown' : 'gold');
    if (r) setBands(r.bands);
  };
  const typedVal = typed ? parseOhms(typed) : null;
  const typedFit = typedVal ? bandsFor(typedVal, n - 2, 'gold') : null;
  const qBands = quiz ? bandsFor(quiz.v, 2, 'gold').bands : null;
  const answer = (o) => {
    if (picked != null) return;
    setPicked(o);
    const ok = o === quiz.v;
    const s = ok ? streak + 1 : 0;
    setStreak(s);
    if (ok && s >= 5 && !progress.readings[QUIZ_KEY]) onMark(QUIZ_KEY);
  };
  const next = () => {
    setQuiz(quizRound());
    setPicked(null);
  };
  const labels = n === 5 ? ['1st digit', '2nd digit', '3rd digit', 'Zeros (multiplier)', 'Tolerance'] : ['1st digit', '2nd digit', 'Zeros (multiplier)', 'Tolerance'];
  const lists = n === 5 ? [DIGITS, DIGITS, DIGITS, MULTS, TOLS] : [DIGITS, DIGITS, MULTS, TOLS];
  return (
    <section className="lib-detail rc" style={{ '--subj': 'var(--yellow)' }}>
      <div className="rc-head">
        <div>
          <span className="eyebrow">Tool</span>
          <h2>Resistor colour code</h2>
          <p className="ch-lead">Read the bands from the end where they are bunched together. The last digit band is followed by a "how many zeros" band, then a gap and the tolerance band.</p>
        </div>
        <div className="chips">
          <button type="button" className={`chip ${!quiz ? 'on' : ''}`} onClick={() => setQuiz(null)}>
            Read a resistor
          </button>
          <button type="button" className={`chip ${quiz ? 'on' : ''}`} onClick={next}>
            Quiz me
          </button>
        </div>
      </div>
      {!quiz ? (
        <div className="rc-body">
          <div className="rc-model">
            <Part3D kind="resistor" opts={{ bands: bands.map((b) => byColour[b].hex), body: n === 5 ? 0x5a8fd0 : 0xd9c39a }} height={190} label={`a ${ohms(v)} resistor`} />
            <div className="rc-value" aria-live="polite">
              <strong>{ohms(v)}</strong> <span>± {tol}%</span>
              <small>
                {bands.map((b) => byColour[b].name).join(' · ')} → {bands.slice(0, n - 2).map((b) => byColour[b].digit).join('')} × {byColour[bands[n - 2]].mult.toLocaleString('en')}
              </small>
            </div>
          </div>
          <div className="rc-controls">
            <div className="chips">
              {[4, 5].map((k) => (
                <button key={k} type="button" className={`chip ${n === k ? 'on' : ''}`} onClick={() => setCount(k)}>
                  {k} bands
                </button>
              ))}
            </div>
            {lists.map((list, i) => (
              <div key={`${n}-${i}`} className="rc-row">
                <span>{labels[i]}</span>
                <Swatches list={list} value={bands[i]} onPick={(id) => setBand(i, id)} label={labels[i]} />
              </div>
            ))}
            <form
              className="rc-type"
              onSubmit={(e) => {
                e.preventDefault();
                fromTyped();
              }}
            >
              <label>
                Or type a value
                <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="e.g. 4.7k, 220, 1M" inputMode="decimal" />
              </label>
              <button type="submit" className="btn ghost sm" disabled={!typedVal}>
                Show its bands
              </button>
              {typedVal && typedFit && !typedFit.exact && <small>Not a {n - 2}-digit value: the nearest is {ohms(typedFit.shown)}.</small>}
            </form>
          </div>
        </div>
      ) : (
        <div className="rc-body">
          <div className="rc-model">
            <Part3D kind="resistor" opts={{ bands: qBands.map((b) => byColour[b].hex) }} height={190} label="a mystery resistor" />
            <p className="rc-streak">
              Streak: <strong>{streak}</strong>
              {progress.readings[QUIZ_KEY] ? ' · ✓ five in a row done' : ' · get five in a row'}
            </p>
          </div>
          <div className="rc-controls">
            <p className="ch-lead">What is this resistor’s value? (Bands: {picked != null ? qBands.map((b) => byColour[b].name).join(', ') : 'look at the model, drag to turn it'}.)</p>
            <div className="ch-opts">
              {quiz.opts.map((o) => (
                <button key={o} type="button" className={`ch-opt ${picked != null && o === quiz.v ? 'right' : ''} ${picked === o && o !== quiz.v ? 'wrong' : ''}`} onClick={() => answer(o)} disabled={picked != null}>
                  {ohms(o)}
                </button>
              ))}
            </div>
            {picked != null && (
              <div className="ch-actions">
                <p className="ch-no">{picked === quiz.v ? 'Right.' : `It is ${ohms(quiz.v)}: ${qBands.slice(0, 2).map((b) => byColour[b].digit).join('')} followed by ${Math.log10(byColour[qBands[2]].mult)} zeros.`}</p>
                <button type="button" className="btn primary sm" onClick={next}>
                  Next resistor
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <details className="rc-table">
        <summary>The whole colour table</summary>
        <table>
          <thead>
            <tr>
              <th>Colour</th>
              <th>Digit</th>
              <th>Zeros</th>
              <th>Tolerance</th>
            </tr>
          </thead>
          <tbody>
            {COLOURS.map((c) => (
              <tr key={c.id}>
                <td>
                  <i className="rc-dot" style={{ '--c': c.hex }} /> {c.name}
                </td>
                <td>{c.digit ?? '—'}</td>
                <td>{c.mult >= 1 ? Math.log10(c.mult) : `÷ ${1 / c.mult}`}</td>
                <td>{c.tol ? `± ${c.tol}%` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="pw-note">A memory aid: Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White, the rainbow order between black and white.</p>
      </details>
      <Sources list={CODE_SOURCES} />
    </section>
  );
}

// ---------------------------------------------------------------- parts

function PartPhoto({ url, name, big }) {
  const pic = useWikiPic(url, true);
  if (!pic?.thumb) return big ? null : <div className="lib-thumb part-thumb" aria-hidden="true" />;
  return (
    <figure className={big ? 'part-photo' : 'lib-thumb part-thumb'}>
      <img src={pic.thumb} alt={name} loading="lazy" />
      {big && (
        <figcaption className="lib-credit">
          Photo: <a href={pic.page} target="_blank" rel="noreferrer">Wikipedia</a>
          {filePage(pic.full) && (
            <>
              {' · '}
              <a href={filePage(pic.full)} target="_blank" rel="noreferrer">
                credit and licence
              </a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function PartDetail({ p, byId, progress, onOpen, onBack }) {
  const g = GROUPS.find((x) => x.id === p.group);
  return (
    <article className="lib-detail ch-open part-open" style={{ '--subj': 'var(--yellow)' }}>
      <button type="button" className="btn ghost sm" onClick={onBack}>
        ← All parts
      </button>
      <span className="eyebrow">{g.label}</span>
      <h2>{p.name}</h2>
      <p className="ch-lead">{p.what}</p>
      <div className="part-views">
        {p.model && (
          <div className="part-view">
            <Part3D kind={p.model.kind} opts={p.model.opts} height={240} label={p.name} />
            <small>Our 3D model. Drag to turn it.</small>
          </div>
        )}
        <div className="part-view">
          <PartPhoto url={p.wiki} name={p.name} big />
        </div>
        {(p.symbol || p.pins) && (
          <div className="part-view">
            {p.pins ? <DipPinout pins={p.pins} label={p.model?.opts?.label || p.name} /> : <Schematic parts={p.symbol} title={`Circuit symbol of ${p.name}`} maxWidth={260} />}
            <small>{p.pins ? 'Pin map, seen from above. Pin 1 is next to the notch.' : 'Its symbol in circuit diagrams.'}</small>
          </div>
        )}
      </div>
      {p.pinsNote && <p className="part-pins">📌 {p.pinsNote}</p>}
      <dl className="part-facts">
        <div>
          <dt>How it works</dt>
          <dd>{p.how}</dd>
        </div>
        <div>
          <dt>How to spot it</dt>
          <dd>{p.spot}</dd>
        </div>
        <div>
          <dt>Which way round</dt>
          <dd>{p.way}</dd>
        </div>
        <div>
          <dt>Typical values</dt>
          <dd>{p.values}</dd>
        </div>
        <div>
          <dt>A little history</dt>
          <dd>{p.history}</dd>
        </div>
      </dl>
      <ClassChips ids={p.classes} byId={byId} progress={progress} onOpen={onOpen} />
      <Sources list={[{ title: `${p.name}: Wikipedia article and its references`, url: p.wiki }, ...(p.datasheet ? [p.datasheet] : []), ...p.sources]} />
    </article>
  );
}

export function PartsShelf({ q, byId, progress, onOpen, onMark }) {
  const [open, setOpen] = useState(null);
  const [group, setGroup] = useState('all');
  const part = PARTS.find((p) => p.id === open);
  const list = useMemo(() => PARTS.filter((p) => (group === 'all' || p.group === group) && hit(q, p.name, p.what, p.spot)), [q, group]);
  if (part)
    return (
      <PartDetail
        key={part.id}
        p={part}
        byId={byId}
        progress={progress}
        onOpen={onOpen}
        onBack={() => {
          setOpen(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  return (
    <>
      {!q && <ColourCode progress={progress} onMark={onMark} />}
      <div className="chips pw-chips">
        <button type="button" className={`chip ${group === 'all' ? 'on' : ''}`} onClick={() => setGroup('all')}>
          All {PARTS.length}
        </button>
        {GROUPS.map((g) => (
          <button key={g.id} type="button" className={`chip ${group === g.id ? 'on' : ''}`} onClick={() => setGroup(g.id)} title={g.blurb}>
            {g.label}
          </button>
        ))}
      </div>
      {group !== 'all' && <p className="pw-note">{GROUPS.find((g) => g.id === group).blurb}</p>}
      <div className="ch-grid">
        {list.map((p) => (
          <button
            key={p.id}
            type="button"
            className="lib-detail ch-card part-card"
            style={{ '--subj': 'var(--yellow)' }}
            onClick={() => {
              setOpen(p.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <PartPhoto url={p.wiki} name={p.name} />
            <strong>{p.name}</strong>
            <span className="ch-sub">{p.what}</span>
            <span className="ch-state">{GROUPS.find((g) => g.id === p.group).label}</span>
          </button>
        ))}
        {!list.length && <p className="lib-hint">Nothing matches.</p>}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- fix the circuit

const mix = (list, seed, key) => {
  const h = (s) => {
    let x = 7;
    for (const ch of `${seed}:${s}`) x = (x * 31 + ch.charCodeAt(0)) % 1000003;
    return x;
  };
  return [...list].sort((a, b) => h(key(a)) - h(key(b)));
};

function Stars({ n }) {
  return (
    <span className="ch-stars" aria-label={`${n} of 3 stars`}>
      {'★'.repeat(n)}
      <span>{'★'.repeat(3 - n)}</span>
    </span>
  );
}

function CircuitCase({ c, n, byId, progress, onOpen, onMark, onBack }) {
  const [clues, setClues] = useState(0);
  const [tried, setTried] = useState([]);
  const [solved, setSolved] = useState(false);
  const options = mix([{ text: c.answer, right: true }, ...c.wrong], c.id, (o) => o.text);
  const guess = (o) => {
    if (o.right) {
      setSolved(true);
      onMark(`fix:${c.id}`);
    } else if (!tried.includes(o.text)) setTried([...tried, o.text]);
  };
  const stars = Math.max(1, 3 - tried.length - (clues > 1 ? 1 : 0));
  // before it is solved, the faulty part is not given away
  const plain = c.broken.map((p) => ({ ...p, hl: undefined }));
  return (
    <article className="lib-detail ch-open" style={{ '--subj': 'var(--yellow)' }}>
      <button type="button" className="btn ghost sm" onClick={onBack}>
        ← All circuits
      </button>
      <span className="eyebrow">Circuit {n}</span>
      <h2>
        <span aria-hidden="true">{c.icon}</span> {c.alias}
      </h2>
      <p className="ch-lead">{c.scene}</p>
      <div className={`fx-boards ${solved ? 'two' : ''}`}>
        <figure className="fx-board">
          <figcaption>{solved ? 'As you built it (fault in red)' : 'As you built it'}</figcaption>
          <Schematic parts={solved ? c.broken : plain} title={`The circuit as built: ${c.alias}`} />
        </figure>
        {solved && (
          <figure className="fx-board fixed">
            <figcaption>Fixed (change in green), with current flowing</figcaption>
            <Schematic parts={c.fixed} title="The repaired circuit" />
          </figure>
        )}
      </div>
      <h4>Evidence</h4>
      <ol className="ch-clues">
        {c.clues.slice(0, solved ? c.clues.length : clues).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
      {!solved && clues < c.clues.length && (
        <button type="button" className="btn ghost sm" onClick={() => setClues(clues + 1)}>
          {clues ? 'Show another clue' : 'Show the first clue'} ({c.clues.length - clues} left)
        </button>
      )}
      <h4>{solved ? 'The fault' : 'What is wrong? Guess whenever you are ready.'}</h4>
      <div className="ch-opts">
        {options.map((o) => {
          const wrong = tried.includes(o.text);
          return (
            <div key={o.text}>
              <button type="button" className={`ch-opt ${wrong ? 'wrong' : ''} ${solved && o.right ? 'right' : ''}`} onClick={() => guess(o)} disabled={solved || wrong}>
                {o.text}
              </button>
              {wrong && <p className="ch-no">Not this. {o.no}</p>}
            </div>
          );
        })}
      </div>
      {solved && (
        <div className="ch-result">
          <div className="ch-verdict v-best">
            <Stars n={stars} />
            <strong>
              Fixed with {clues} {clues === 1 ? 'clue' : 'clues'}
              {tried.length ? ` and ${tried.length} wrong ${tried.length === 1 ? 'guess' : 'guesses'}` : ''}.
            </strong>
          </div>
          <h4>Why it happened</h4>
          <p className="ch-lead">{c.why}</p>
          <h4>The fix</h4>
          <p className="ch-lead">{c.fix}</p>
          <div className="ch-actions">
            <button type="button" className="btn primary sm" onClick={onBack}>
              Next circuit
            </button>
          </div>
          <ClassChips ids={c.classes} byId={byId} progress={progress} onOpen={onOpen} />
          <Sources list={c.sources} />
        </div>
      )}
    </article>
  );
}

export function CircuitShelf({ q, byId, progress, onOpen, onMark }) {
  const [open, setOpen] = useState(null);
  const i = CIRCUIT_CASES.findIndex((c) => c.id === open);
  const back = () => {
    setOpen(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (i >= 0) return <CircuitCase key={open} c={CIRCUIT_CASES[i]} n={i + 1} byId={byId} progress={progress} onOpen={onOpen} onMark={onMark} onBack={back} />;
  const solved = CIRCUIT_CASES.filter((c) => progress.readings[`fix:${c.id}`]).length;
  return (
    <>
      <p className="pw-note">
        Each one is a mistake almost everyone makes with their first circuits. Look at the diagram, ask for clues one at a time, and name the fault. Then see the fixed circuit with current flowing. Fixed: {solved} of {CIRCUIT_CASES.length}.
      </p>
      <div className="ch-grid">
        {CIRCUIT_CASES.map((c, k) => {
          if (!hit(q, c.alias, c.scene)) return null;
          const done = progress.readings[`fix:${c.id}`];
          return (
            <button
              key={c.id}
              type="button"
              className="lib-detail ch-card"
              style={{ '--subj': 'var(--yellow)' }}
              onClick={() => {
                setOpen(c.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="eyebrow">Circuit {k + 1}</span>
              <span className="ch-icon" aria-hidden="true">
                {c.icon}
              </span>
              <strong>{c.alias}</strong>
              <span className="ch-sub">{c.scene}</span>
              <span className={`ch-state ${done ? 'done' : ''}`}>{done ? '✓ Fixed' : 'Not fixed yet'}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
