import { useState } from 'react';
import { BRIEFS, VERDICTS } from '../data/library/briefs';
import { CASES } from '../data/library/detective';
import { FAILURES } from '../data/library/failures';
import { MATERIALS, FAMILIES, PROPS, PRICE_BANDS, SOURCES as MSRC } from '../data/library/materials';
import { ClassChips, Sources } from './LibBits';

const matById = Object.fromEntries(MATERIALS.map((m) => [m.id, m]));
const famOf = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
const failById = Object.fromEntries(FAILURES.map((f) => [f.id, f]));
const norm = (s) => (s || '').toLowerCase();
const hit = (q, ...fields) => !q || fields.some((f) => norm(f).includes(q));

// A fixed shuffle, so the right answer is not always in the same place
// and the order does not jump around between visits.
const mix = (list, seed, key) => {
  const h = (s) => {
    let x = 7;
    for (const ch of `${seed}:${s}`) x = (x * 31 + ch.charCodeAt(0)) % 1000003;
    return x;
  };
  return [...list].sort((a, b) => h(key(a)) - h(key(b)));
};

const fmt = (v) => {
  if (v == null || Number.isNaN(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1000) return Math.round(v).toLocaleString('en');
  if (a >= 100) return `${Math.round(v)}`;
  if (a >= 10) return `${Math.round(v * 10) / 10}`;
  if (a >= 1) return `${Math.round(v * 100) / 100}`;
  return `${Number(v.toPrecision(2))}`;
};
const Stars = ({ n }) => (
  <span className="ch-stars" aria-label={`${n} of 3 stars`}>
    {'★'.repeat(n)}
    <span>{'★'.repeat(3 - n)}</span>
  </span>
);

// ---------------------------------------------------------------- design challenges

function Candidate({ c, picked, done, onPick }) {
  const m = { ...matById[c.id], ...c.use };
  const fam = famOf[m.fam];
  return (
    <button type="button" className={`ch-cand ${picked ? 'on' : ''} ${done ? `v-${c.verdict}` : ''}`} style={{ '--subj': fam?.color }} onClick={onPick} disabled={done}>
      <span className="eyebrow" style={{ color: fam?.color }}>
        {fam?.label}
      </span>
      <strong>{m.name}</strong>
      {c.useNote && <em>{c.useNote}</em>}
      <dl>
        {PROPS.map((p) => (
          <div key={p.key}>
            <dt>{p.label}</dt>
            <dd>{p.key === 'price' ? PRICE_BANDS[m.price]?.label || '—' : `${fmt(m[p.key])}${m[p.key] == null ? '' : ` ${p.unit}`}`}</dd>
          </div>
        ))}
      </dl>
    </button>
  );
}

function MetricBars({ brief, pick }) {
  const rows = brief.candidates.map((c) => ({ c, m: matById[c.id], v: brief.metric.fn({ ...matById[c.id], ...c.use }) })).filter((r) => r.v != null && !Number.isNaN(r.v));
  const max = Math.max(...rows.map((r) => r.v));
  const min = Math.min(...rows.map((r) => r.v));
  // very wide ranges are drawn on a ×10-per-step scale so small bars stay visible
  const log = min > 0 && max / min > 60;
  const w = (v) => (log ? 8 + (92 * Math.log(v / min)) / Math.log(max / min) : (100 * v) / max);
  return (
    <figure className="ch-bars">
      <figcaption>
        <strong>{brief.metric.label}</strong> ({brief.metric.unit}) = {brief.metric.formula}
        {brief.metric.lower ? '. Lower is better here.' : '.'} Worked out from the Materials shelf numbers{log ? '; the bars use a ×10-per-step scale' : ''}.
      </figcaption>
      {rows
        .sort((a, b) => b.v - a.v)
        .map(({ c, m, v }) => (
          <div key={c.id} className={`ch-bar v-${c.verdict} ${pick === c.id ? 'on' : ''}`}>
            <span>{m.name}</span>
            <i>
              <b style={{ width: `${Math.max(2, w(v))}%` }} />
            </i>
            <em>{fmt(v)}</em>
          </div>
        ))}
    </figure>
  );
}

function Brief({ brief, byId, progress, onOpen, onMark, onBack }) {
  const [pick, setPick] = useState(null);
  const cands = mix(brief.candidates, brief.id, (c) => c.id);
  const chosen = brief.candidates.find((c) => c.id === pick);
  const order = ['best', 'good', 'poor', 'fail'];
  const choose = (c) => {
    setPick(c.id);
    if (c.verdict === 'best') onMark(`brief:${brief.id}`);
  };
  const classes = brief.candidates.filter((c) => c.verdict === 'best' || c.verdict === 'good').flatMap((c) => matById[c.id].classes || []);
  return (
    <article className="lib-detail ch-open" style={{ '--subj': 'var(--teal)' }}>
      <button type="button" className="btn ghost sm" onClick={onBack}>
        ← All challenges
      </button>
      <h2>
        <span aria-hidden="true">{brief.icon}</span> {brief.title}
      </h2>
      <p className="ch-lead">{brief.brief}</p>
      <h4>What the material must do</h4>
      <ul className="ch-needs">
        {brief.needs.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <h4>{chosen ? 'Your choice and the others' : 'Which one would you use? Read the numbers, then pick.'}</h4>
      <div className="ch-cands">
        {cands.map((c) => (
          <Candidate key={c.id} c={c} picked={pick === c.id} done={!!chosen} onPick={() => choose(c)} />
        ))}
      </div>
      {chosen && (
        <div className="ch-result">
          <div className={`ch-verdict v-${chosen.verdict}`}>
            <Stars n={VERDICTS[chosen.verdict].stars} />
            <strong>
              {matById[chosen.id].name}: {VERDICTS[chosen.verdict].label.toLowerCase()}
            </strong>
            <p>{chosen.why}</p>
          </div>
          {brief.metric ? <MetricBars brief={brief} pick={pick} /> : <p className="pw-note">{brief.metricNote}</p>}
          <h4>Every candidate, from best to worst</h4>
          <ul className="ch-all">
            {order.flatMap((v) =>
              brief.candidates
                .filter((c) => c.verdict === v)
                .map((c) => (
                  <li key={c.id} className={`v-${c.verdict} ${c.id === pick ? 'on' : ''}`}>
                    <span className="ch-pill">{VERDICTS[c.verdict].label}</span>
                    <strong>{matById[c.id].name}</strong>
                    <p>{c.why}</p>
                  </li>
                )),
            )}
          </ul>
          <h4>The lesson</h4>
          <p className="ch-lead">{brief.answer}</p>
          <div className="ch-actions">
            <button type="button" className="btn ghost sm" onClick={() => setPick(null)}>
              Try again
            </button>
            <button type="button" className="btn primary sm" onClick={onBack}>
              Next challenge
            </button>
          </div>
          <ClassChips ids={classes.slice(0, 8)} byId={byId} progress={progress} onOpen={onOpen} />
          <Sources list={[...brief.sources, { title: `Property values: ${MSRC.ashby.title}`, url: MSRC.ashby.url }]} />
        </div>
      )}
    </article>
  );
}

export function BriefsShelf({ q, byId, progress, onOpen, onMark }) {
  const [open, setOpen] = useState(null);
  const brief = BRIEFS.find((b) => b.id === open);
  if (brief) return <Brief key={brief.id} brief={brief} byId={byId} progress={progress} onOpen={onOpen} onMark={onMark} onBack={() => setOpen(null)} />;
  const list = BRIEFS.filter((b) => hit(q, b.title, b.brief));
  const solved = BRIEFS.filter((b) => progress.readings[`brief:${b.id}`]).length;
  return (
    <>
      <p className="pw-note">
        Each challenge is a real design job. Read the brief, compare the candidates’ numbers, and pick the material you would use. You have picked the best fit in {solved} of {BRIEFS.length}.
      </p>
      <div className="ch-grid">
        {list.map((b) => (
          <button key={b.id} type="button" className="lib-detail ch-card" style={{ '--subj': 'var(--teal)' }} onClick={() => setOpen(b.id)}>
            <span className="ch-icon" aria-hidden="true">
              {b.icon}
            </span>
            <strong>{b.title}</strong>
            <span className="ch-sub">{b.brief}</span>
            <span className={`ch-state ${progress.readings[`brief:${b.id}`] ? 'done' : ''}`}>{progress.readings[`brief:${b.id}`] ? '✓ Best fit found' : `${b.candidates.length} candidates`}</span>
          </button>
        ))}
        {!list.length && <p className="lib-hint">Nothing matches.</p>}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- failure detective

function Case({ c, n, byId, progress, onOpen, onMark, onBack }) {
  const f = failById[c.id];
  const [clues, setClues] = useState(0);
  const [tried, setTried] = useState([]);
  const [solved, setSolved] = useState(false);
  const options = mix([{ text: c.answer, right: true }, ...c.wrong], c.id, (o) => o.text);
  const guess = (o) => {
    if (o.right) {
      setSolved(true);
      onMark(`case:${c.id}`);
    } else if (!tried.includes(o.text)) setTried([...tried, o.text]);
  };
  const stars = Math.max(1, 3 - tried.length - (clues > 1 ? 1 : 0));
  return (
    <article className="lib-detail ch-open" style={{ '--subj': 'var(--red)' }}>
      <button type="button" className="btn ghost sm" onClick={onBack}>
        ← All cases
      </button>
      <span className="eyebrow">Case {n}</span>
      <h2>{solved ? f.title : c.alias}</h2>
      <p className="ch-lead">{c.scene}</p>
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
      <h4>{solved ? 'The cause' : 'What caused it? Guess whenever you are ready.'}</h4>
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
              Solved with {clues} {clues === 1 ? 'clue' : 'clues'}
              {tried.length ? ` and ${tried.length} wrong ${tried.length === 1 ? 'guess' : 'guesses'}` : ''}.
            </strong>
            <p>
              {f.title}, {f.place}, {f.year}. Lives lost: {f.toll}.
            </p>
          </div>
          <h4>What happened</h4>
          <p className="ch-lead">{f.what}</p>
          <h4>Why it failed</h4>
          <p className="ch-lead">{f.why}</p>
          <h4>What changed afterwards</h4>
          <p className="ch-lead">{f.lesson}</p>
          <div className="ch-actions">
            <button type="button" className="btn primary sm" onClick={onBack}>
              Next case
            </button>
          </div>
          <ClassChips ids={f.classes} byId={byId} progress={progress} onOpen={onOpen} />
          <Sources list={f.sources} />
        </div>
      )}
    </article>
  );
}

export function DetectiveShelf({ q, byId, progress, onOpen, onMark }) {
  const [open, setOpen] = useState(null);
  const i = CASES.findIndex((c) => c.id === open);
  if (i >= 0) return <Case key={open} c={CASES[i]} n={i + 1} byId={byId} progress={progress} onOpen={onOpen} onMark={onMark} onBack={() => setOpen(null)} />;
  const solved = CASES.filter((c) => progress.readings[`case:${c.id}`]).length;
  return (
    <>
      <p className="pw-note">
        Each case is a real accident. You get the scene, then up to three clues, one at a time. Name the cause with as few clues and wrong guesses as you can. Solved: {solved} of {CASES.length}. (The answers are in the Failure files shelf, so try these first.)
      </p>
      <div className="ch-grid">
        {CASES.map((c, k) => {
          const done = progress.readings[`case:${c.id}`];
          const f = failById[c.id];
          if (!hit(q, c.alias, c.scene, done ? f.title : '')) return null;
          return (
            <button key={c.id} type="button" className="lib-detail ch-card" style={{ '--subj': 'var(--red)' }} onClick={() => setOpen(c.id)}>
              <span className="eyebrow">
                Case {k + 1} · {f.year}
              </span>
              <strong>{c.alias}</strong>
              <span className="ch-sub">{c.scene}</span>
              <span className={`ch-state ${done ? 'done' : ''}`}>{done ? `✓ Solved: ${f.title}` : 'Unsolved'}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
