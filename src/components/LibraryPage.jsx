import { useEffect, useMemo, useRef, useState } from 'react';
import { MATERIALS, FAMILIES, PROPS, PRICE_BANDS, STRENGTH_NOTE, SOURCES as MSRC } from '../data/library/materials';
import { FAILURES } from '../data/library/failures';
import { FORMULAS, GROUPS, SOURCES as FSRC } from '../data/library/formulas';
import { PEOPLE, FIELDS } from '../data/library/people';
import { DISCOVERIES } from '../data/library/discoveries';
import { ALL_LESSONS } from '../data/path';
import { useWikiPic, filePage } from './Pictures';
import MathFormula from './MathFormula';
import PhMap from './PhMap';
import { SITES } from '../data/library/phSites';
import { useReveal } from '../state/useReveal';
import { ClassChips, Sources } from './LibBits';
import PhaseDiagrams from './PhaseDiagrams';
import LabHandbook from './LabHandbook';
import MicrographGallery from './MicrographGallery';
import { MICROGRAPHS, MIC_SOURCES } from '../data/library/micrographs';
import { TECHNIQUES } from '../data/library/techniques';
import { DIAGRAMS } from '../data/library/phases';
import PeriodicTable, { PT_SOURCES } from './PeriodicTable';
import { ELEMENTS } from '../data/library/elements';

const SHELVES = [
  { id: 'materials', icon: '🧱', label: 'Materials', blurb: `${MATERIALS.length} materials with their typical properties. Plot any two properties against each other, or pick two to compare.` },
  { id: 'failures', icon: '🗂️', label: 'Failure files', blurb: `${FAILURES.length} famous accidents: what broke, why, and what engineers changed afterwards.` },
  { id: 'formulas', icon: '∑', label: 'Formula sheet', blurb: `${FORMULAS.length} key equations of the course, with their symbols, units and the class that teaches each.` },
  { id: 'people', icon: '👤', label: 'Who’s who', blurb: `${PEOPLE.length} people from the class stories, with the classes they appear in.` },
  { id: 'elements', icon: '⚛️', label: 'Periodic table', blurb: `All ${ELEMENTS.length} elements. Tap one for when and how it was found, its crystal structure, what it is used for and where it is mined.` },
  { id: 'phases', icon: '🌡️', label: 'Phase diagrams', blurb: `${DIAGRAMS.length} real alloy phase diagrams. Tap anywhere to see which phases are there and how much of each, or cool an alloy down slowly.` },
  { id: 'lab', icon: '🔬', label: 'Lab handbook', blurb: `${TECHNIQUES.length} lab tests: what each one tells you, how it is done, how to read the result, and the usual mistakes.` },
  { id: 'micro', icon: '🔍', label: 'Microscope pictures', blurb: `${MICROGRAPHS.length} microstructures seen under the microscope, with real photos and what to notice in each.` },
  { id: 'map', icon: '🗺️', label: 'Philippine map', blurb: `${SITES.length} places in the Philippines where materials are mined, made or studied. Tap a pin for its story.` },
  { id: 'discoveries', icon: '💡', label: 'Discoveries', blurb: `${DISCOVERIES.length} famous discoveries, how they were made, and which ones were lucky accidents.` },
];

const KEY = 'library:shelf';
const loadShelf = () => {
  try {
    return localStorage.getItem(KEY) || 'materials';
  } catch {
    return 'materials';
  }
};

const yearLabel = (y, approx) => (y == null ? '' : `${approx ? 'c. ' : ''}${y < 0 ? `${-y} BC` : y}`);
const norm = (s) => (s || '').toLowerCase();
const matches = (q, ...fields) => !q || fields.some((f) => norm(f).includes(q));

function useOnScreen() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setSeen(true), { rootMargin: '200px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

function Thumb({ url, alt, className = '' }) {
  const [ref, seen] = useOnScreen();
  const pic = useWikiPic(url, seen);
  return (
    <div ref={ref} className={`lib-thumb ${className}`}>
      {pic ? <img src={pic.thumb} alt={alt} loading="lazy" /> : <span aria-hidden="true">·</span>}
    </div>
  );
}

function PicCredit({ url }) {
  const pic = useWikiPic(url, true);
  if (!pic) return null;
  return (
    <span className="lib-credit">
      Picture: <a href={pic.page} target="_blank" rel="noreferrer">Wikipedia</a>
      {filePage(pic.full) && (
        <>
          {' · '}
          <a href={filePage(pic.full)} target="_blank" rel="noreferrer">
            credit and licence
          </a>
        </>
      )}
    </span>
  );
}

// ---------------------------------------------------------------- materials

const famOf = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
const NUMERIC = PROPS.filter((p) => p.key !== 'price');
const fmt = (v) => {
  if (v == null) return '—';
  const a = Math.abs(v);
  if (a >= 1000) return Math.round(v).toLocaleString('en');
  if (a >= 100) return String(Math.round(v));
  if (a >= 10) return String(Math.round(v * 10) / 10);
  if (a >= 1) return String(Math.round(v * 100) / 100);
  return String(Number(v.toPrecision(2)));
};
const showVal = (m, key) => (key === 'price' ? (m.price ? PRICE_BANDS[m.price].label : '—') : fmt(m[key]));

// Position on a log scale across all materials (for the little bars).
const RANGE = Object.fromEntries(
  NUMERIC.filter((p) => p.key !== 't').map((p) => {
    const vs = MATERIALS.map((m) => m[p.key]).filter((v) => v > 0);
    return [p.key, [Math.log10(Math.min(...vs)), Math.log10(Math.max(...vs))]];
  }),
);
const barPos = (key, v) => {
  if (v == null) return null;
  if (key === 't') return Math.max(0, Math.min(1, (v + 150) / 3800));
  if (key === 'price') return v / 5;
  if (!(v > 0)) return null;
  const [lo, hi] = RANGE[key];
  return (Math.log10(v) - lo) / (hi - lo);
};

function Chart({ list, x, y, pick, onPick }) {
  const W = 800;
  const H = 480;
  const P = { l: 56, r: 14, t: 14, b: 44 };
  const pts = list.filter((m) => m[x] > 0 && m[y] > 0);
  const all = MATERIALS.filter((m) => m[x] > 0 && m[y] > 0);
  const ext = (k) => {
    const vs = all.map((m) => Math.log10(m[k]));
    return [Math.floor(Math.min(...vs)), Math.ceil(Math.max(...vs))];
  };
  const [x0, x1] = ext(x);
  const [y0, y1] = ext(y);
  const sx = (v) => P.l + ((Math.log10(v) - x0) / (x1 - x0 || 1)) * (W - P.l - P.r);
  const sy = (v) => H - P.b - ((Math.log10(v) - y0) / (y1 - y0 || 1)) * (H - P.t - P.b);
  const px = PROPS.find((p) => p.key === x);
  const py = PROPS.find((p) => p.key === y);
  const [hover, setHover] = useState(null);
  const tick = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const tl = (e) => (e >= 4 || e <= -3 ? `10${String(e).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])}` : String(10 ** e));
  const shown = hover || pick;
  return (
    <figure className="lib-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${py.label} against ${px.label}, log scales`}>
        {tick(x0, x1).map((e) => (
          <g key={`x${e}`}>
            <line x1={sx(10 ** e)} x2={sx(10 ** e)} y1={P.t} y2={H - P.b} className="lib-grid" />
            <text x={sx(10 ** e)} y={H - P.b + 16} textAnchor="middle" className="lib-tick">
              {tl(e)}
            </text>
          </g>
        ))}
        {tick(y0, y1).map((e) => (
          <g key={`y${e}`}>
            <line x1={P.l} x2={W - P.r} y1={sy(10 ** e)} y2={sy(10 ** e)} className="lib-grid" />
            <text x={P.l - 6} y={sy(10 ** e) + 4} textAnchor="end" className="lib-tick">
              {tl(e)}
            </text>
          </g>
        ))}
        <text x={(W + P.l) / 2} y={H - 6} textAnchor="middle" className="lib-axis">
          {px.label} ({px.unit}) →
        </text>
        <text x={14} y={(H - P.b) / 2} textAnchor="middle" className="lib-axis" transform={`rotate(-90 14 ${(H - P.b) / 2})`}>
          {py.label} ({py.unit}) →
        </text>
        {pts.map((m) => (
          <circle
            key={m.id}
            cx={sx(m[x])}
            cy={sy(m[y])}
            r={m.id === pick?.id ? 7 : 5}
            fill={famOf[m.fam].color}
            className={`lib-dot ${m.id === pick?.id ? 'on' : ''}`}
            onMouseEnter={() => setHover(m)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onPick(m)}
          >
            <title>{m.name}</title>
          </circle>
        ))}
        {shown && shown[x] > 0 && shown[y] > 0 && (
          <text x={sx(shown[x]) > W * 0.6 ? sx(shown[x]) - 9 : sx(shown[x]) + 9} y={sy(shown[y]) - 9} textAnchor={sx(shown[x]) > W * 0.6 ? 'end' : 'start'} className="lib-label">
            {shown.name.length > 30 ? `${shown.name.slice(0, 29)}…` : shown.name}
          </text>
        )}
      </svg>
      <figcaption>
        Each dot is one material; both scales jump ×10 per grid line. Materials of one family cluster together, the idea behind Michael Ashby’s selection charts. {pts.length < list.length && `${list.length - pts.length} without values are left off.`}
      </figcaption>
    </figure>
  );
}

function MatDetail({ m, other, setOther, byId, progress, onOpen }) {
  const fam = famOf[m.fam];
  return (
    <article className="lib-detail" style={{ '--subj': fam.color }}>
      <div className="lib-detail-head">
        <Thumb url={m.wiki} alt={m.name} className="big" />
        <div>
          <span className="eyebrow" style={{ color: fam.color }}>
            {fam.label}
          </span>
          <h2>{m.name}</h2>
          <p>{m.note}</p>
          <PicCredit url={m.wiki} />
        </div>
      </div>
      <div className="lib-cmp-pick">
        <label>
          Compare with{' '}
          <select value={other?.id || ''} onChange={(e) => setOther(MATERIALS.find((x) => x.id === e.target.value) || null)}>
            <option value="">(nothing)</option>
            {FAMILIES.map((f) => (
              <optgroup key={f.id} label={f.label}>
                {MATERIALS.filter((x) => x.fam === f.id && x.id !== m.id).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
      <table className="lib-props">
        <thead>
          <tr>
            <th />
            <th>{other ? m.name : 'Value'}</th>
            {other && <th>{other.name}</th>}
            {other && <th>Ratio</th>}
            {!other && <th className="lib-barcol">Where it sits among all {MATERIALS.length}</th>}
          </tr>
        </thead>
        <tbody>
          {PROPS.map((p) => {
            const a = m[p.key];
            const b = other?.[p.key];
            const pos = barPos(p.key, a);
            return (
              <tr key={p.key}>
                <th title={p.hint}>
                  {p.label}
                  {p.unit && <small> {p.unit}</small>}
                </th>
                <td>
                  {showVal(m, p.key)}
                  {p.key === 't' && a != null && <small> {m.tk}</small>}
                </td>
                {other && (
                  <td>
                    {showVal(other, p.key)}
                    {p.key === 't' && b != null && <small> {other.tk}</small>}
                  </td>
                )}
                {other && <td className="lib-ratio">{p.key !== 't' && p.key !== 'price' && a > 0 && b > 0 ? `×${fmt(a / b)}` : ''}</td>}
                {!other && (
                  <td className="lib-barcol">
                    {pos != null && (
                      <span className="lib-bar">
                        <span style={{ left: `${pos * 100}%` }} />
                      </span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {other && (
        <p className="lib-note">
          The ratio is the first material divided by the second. About {other.name}: {other.note}
        </p>
      )}
      <p className="lib-note">
        Price band: {m.price ? `${PRICE_BANDS[m.price].label} = ${PRICE_BANDS[m.price].range}` : 'not sold as a bulk material'}. {STRENGTH_NOTE}
      </p>
      <ClassChips ids={m.classes} byId={byId} progress={progress} onOpen={onOpen} />
      <Sources list={[{ title: `${m.name} on Wikipedia (properties and pictures)`, url: m.wiki }, ...m.src.map((k) => MSRC[k])]} />
    </article>
  );
}

function MaterialsShelf({ q, byId, progress, onOpen }) {
  const [fam, setFam] = useState('all');
  const [mode, setMode] = useState('chart');
  const [x, setX] = useState('rho');
  const [y, setY] = useState('E');
  const [sort, setSort] = useState('name');
  const [pick, setPick] = useState(null);
  const [other, setOther] = useState(null);
  const detailRef = useRef(null);
  const list = MATERIALS.filter((m) => (fam === 'all' || m.fam === fam) && matches(q, m.name, m.note, famOf[m.fam].label));
  const sorted = [...list].sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : (b[sort] ?? -Infinity) - (a[sort] ?? -Infinity)));
  const choose = (m) => {
    if (pick && pick.id !== m.id && !other) setOther(null);
    setPick(m);
    requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const axisOpts = NUMERIC.filter((p) => p.key !== 't');
  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${fam === 'all' ? 'on' : ''}`} style={{ '--subj': 'var(--text)' }} onClick={() => setFam('all')}>
          All families
        </button>
        {FAMILIES.map((f) => (
          <button key={f.id} type="button" className={`chip ${fam === f.id ? 'on' : ''}`} style={{ '--subj': f.color }} onClick={() => setFam(f.id)}>
            <span className="lib-swatch" style={{ background: f.color }} /> {f.label}
          </button>
        ))}
      </div>
      <div className="lib-controls">
        <div className="lib-seg" role="group" aria-label="View">
          <button type="button" className={mode === 'chart' ? 'on' : ''} onClick={() => setMode('chart')}>
            Chart
          </button>
          <button type="button" className={mode === 'list' ? 'on' : ''} onClick={() => setMode('list')}>
            List
          </button>
        </div>
        {mode === 'chart' ? (
          <>
            <label>
              Across{' '}
              <select value={x} onChange={(e) => setX(e.target.value)}>
                {axisOpts.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Up{' '}
              <select value={y} onChange={(e) => setY(e.target.value)}>
                {axisOpts.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : (
          <label>
            Sort by{' '}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="name">Name</option>
              {PROPS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label} (highest first)
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {mode === 'chart' ? (
        <Chart list={list} x={x} y={y} pick={pick} onPick={choose} />
      ) : (
        <div className="lib-table-wrap">
          <table className="lib-table">
            <thead>
              <tr>
                <th>Material</th>
                {PROPS.map((p) => (
                  <th key={p.key} title={p.hint}>
                    {p.label}
                    {p.unit && <small> {p.unit}</small>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => (
                <tr key={m.id} className={m.id === pick?.id ? 'on' : ''} onClick={() => choose(m)}>
                  <th>
                    <span className="lib-swatch" style={{ background: famOf[m.fam].color }} /> {m.name}
                  </th>
                  {PROPS.map((p) => (
                    <td key={p.key}>{showVal(m, p.key)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div ref={detailRef}>
        {pick ? (
          <MatDetail m={pick} other={other} setOther={setOther} byId={byId} progress={progress} onOpen={onOpen} />
        ) : (
          <p className="lib-hint">Tap a dot or a row to open a material’s card.</p>
        )}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- failures

function FailuresShelf({ q, byId, progress, onOpen }) {
  const [open, setOpen] = useState(null);
  const list = FAILURES.filter((x) => matches(q, x.title, x.place, x.what, x.why, x.lesson, x.mode));
  return (
    <ol className="tl-line lib-fail">
      {list.map((x, i) => (
        <li key={x.id} className={`tl-item subj-mate ${i % 2 ? 'right' : 'left'}`} data-reveal>
          <span className="tl-dot" />
          <div className={`tl-card lib-case ${open === x.id ? 'open' : ''}`}>
            <button type="button" className="lib-case-head" onClick={() => setOpen(open === x.id ? null : x.id)} aria-expanded={open === x.id}>
              <span className="tl-year">
                {x.year} · {x.place}
              </span>
              <strong>{x.title}</strong>
              <span className="lib-tag">{x.mode}</span>
            </button>
            {open === x.id && (
              <div className="lib-case-body">
                <Thumb url={x.wiki} alt={x.title} className="wide" />
                <PicCredit url={x.wiki} />
                <p className="lib-toll">Lives lost: {x.toll}</p>
                <h4>What happened</h4>
                <p>{x.what}</p>
                <h4>Why it failed</h4>
                <p>{x.why}</p>
                <h4>What changed afterwards</h4>
                <p>{x.lesson}</p>
                <ClassChips ids={x.classes} byId={byId} progress={progress} onOpen={onOpen} />
                <Sources list={x.sources} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---------------------------------------------------------------- formulas

function FormulasShelf({ q, byId, onOpen }) {
  const [g, setG] = useState('all');
  const list = FORMULAS.filter((f) => (g === 'all' || f.group === g) && matches(q, f.name, f.symbols, f.tex, byId[f.cls]?.title));
  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${g === 'all' ? 'on' : ''}`} style={{ '--subj': 'var(--blue)' }} onClick={() => setG('all')}>
          All
        </button>
        {GROUPS.map((x) => (
          <button key={x.id} type="button" className={`chip ${g === x.id ? 'on' : ''}`} style={{ '--subj': 'var(--blue)' }} onClick={() => setG(x.id)}>
            {x.label}
          </button>
        ))}
      </div>
      {GROUPS.filter((x) => list.some((f) => f.group === x.id)).map((x) => (
        <section key={x.id} className="lib-fgroup">
          <h3 className="tl-era-name">{x.label}</h3>
          <div className="lib-fgrid">
            {list
              .filter((f) => f.group === x.id)
              .map((f) => {
                const l = byId[f.cls];
                return (
                  <div key={f.name} className="lib-formula">
                    <strong>{f.name}</strong>
                    <MathFormula tex={f.tex} />
                    <p>{f.symbols}</p>
                    <div className="lib-fmeta">
                      {l && (
                        <button type="button" className="chip pw-class" onClick={() => onOpen(l.id)}>
                          {l.code} · {l.title}
                        </button>
                      )}
                      <a href={FSRC[f.src].url} target="_blank" rel="noreferrer" title={FSRC[f.src].title}>
                        source
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
      <footer className="pw-sources">
        <span className="eyebrow">Sources</span>
        <Sources list={Object.values(FSRC)} />
      </footer>
    </>
  );
}

// ---------------------------------------------------------------- people

function PeopleShelf({ q, byId, progress, onOpen, text }) {
  const [field, setField] = useState('all');
  const [open, setOpen] = useState(null);
  const withClasses = useMemo(
    () =>
      PEOPLE.map((p) => {
        const re = new RegExp(`(^|[^\\p{L}])(${p.find})`, 'u');
        return { ...p, classes: Object.keys(text).filter((id) => re.test(text[id])) };
      }).sort((a, b) => a.born - b.born),
    [text],
  );
  const list = withClasses.filter((p) => (field === 'all' || p.field === field) && matches(q, p.name, p.what));
  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${field === 'all' ? 'on' : ''}`} style={{ '--subj': 'var(--purple)' }} onClick={() => setField('all')}>
          Everyone
        </button>
        {FIELDS.map((f) => (
          <button key={f.id} type="button" className={`chip ${field === f.id ? 'on' : ''}`} style={{ '--subj': 'var(--purple)' }} onClick={() => setField(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="lib-people">
        {list.map((p) => (
          <div key={p.name} className={`lib-person ${open === p.name ? 'open' : ''}`}>
            <button type="button" className="lib-person-head" onClick={() => setOpen(open === p.name ? null : p.name)} aria-expanded={open === p.name}>
              <Thumb url={p.wiki} alt={p.name} className="face" />
              <span>
                <strong>{p.name}</strong>
                <span className="tl-year">
                  {yearLabel(p.born, p.approx)} – {p.died == null ? 'living' : yearLabel(p.died, p.approx)}
                </span>
                <span className="tl-detail">{p.what}</span>
              </span>
            </button>
            {open === p.name && (
              <div className="lib-person-body">
                <PicCredit url={p.wiki} />
                <ClassChips ids={p.classes} byId={byId} progress={progress} onOpen={onOpen} />
                {!p.classes.length && <p className="lib-note">Mentioned for context; not the subject of a class story yet.</p>}
                <Sources list={[{ title: `${p.name} on Wikipedia`, url: p.wiki }]} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- discoveries

function DiscoveriesShelf({ q, byId, progress, onOpen }) {
  const [lucky, setLucky] = useState(false);
  const list = DISCOVERIES.filter((x) => (!lucky || x.luck) && matches(q, x.title, x.who, x.how, x.why));
  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${!lucky ? 'on' : ''}`} style={{ '--subj': 'var(--yellow)' }} onClick={() => setLucky(false)}>
          All discoveries
        </button>
        <button type="button" className={`chip ${lucky ? 'on' : ''}`} style={{ '--subj': 'var(--yellow)' }} onClick={() => setLucky(true)}>
          🍀 Only lucky accidents ({DISCOVERIES.filter((x) => x.luck).length})
        </button>
      </div>
      <ol className="tl-line">
        {list.map((x, i) => (
          <li key={x.title} className={`tl-item ${x.field === 'mate' ? 'subj-mate' : x.field === 'chem' ? 'subj-chem' : x.field === 'phys' ? 'subj-phys' : 'subj-math'} ${i % 2 ? 'right' : 'left'}`} data-reveal>
            <span className="tl-dot" />
            <div className="tl-card lib-disc">
              <span className="tl-year">
                {yearLabel(x.year, x.approx)}
                {x.luck && ' · 🍀 partly luck'}
              </span>
              <strong>{x.title}</strong>
              <span className="lib-who">{x.who}</span>
              <span className="tl-detail">{x.how}</span>
              <span className="lib-why">Why it matters: {x.why}</span>
              <ClassChips ids={x.classes} byId={byId} progress={progress} onOpen={onOpen} />
              <a className="tl-link" href={x.wiki} target="_blank" rel="noreferrer">
                Source: Wikipedia article and its references
              </a>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

// ---------------------------------------------------------------- page

export default function LibraryPage({ progress, onOpen, onGo }) {
  const [shelf, setShelfState] = useState(loadShelf);
  const [query, setQuery] = useState('');
  const setShelf = (id) => {
    setShelfState(id);
    setQuery('');
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* fine: just not remembered */
    }
  };
  const byId = useMemo(() => Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l])), []);
  const text = useMemo(
    () => Object.fromEntries(ALL_LESSONS.map((l) => [l.id, [l.title, l.subtitle, l.history?.protagonist, l.history?.era, ...(l.history?.narrative || [])].join(' ')])),
    [],
  );
  const s = SHELVES.find((x) => x.id === shelf) || SHELVES[0];
  const q = norm(query.trim());
  useReveal([shelf, q]);
  const props = { q, byId, progress, onOpen };

  return (
    <div className="timeline library">
      <header className="timeline-head" data-reveal>
        <h1>Library</h1>
        <p>Reference shelves to browse between classes. Everything links back to the classes it belongs to and to its sources.</p>
      </header>
      <nav className="lib-shelves" aria-label="Shelves">
        {SHELVES.map((x) => (
          <button key={x.id} type="button" className={`lib-shelf ${x.id === shelf ? 'on' : ''}`} onClick={() => setShelf(x.id)} aria-pressed={x.id === shelf}>
            <span className="lib-shelf-icon">{x.icon}</span>
            {x.label}
          </button>
        ))}
      </nav>
      <div className="lib-bar-top">
        <p>{s.blurb}</p>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${s.label.toLowerCase()}…`} aria-label={`Search ${s.label}`} />
      </div>
      {shelf === 'materials' && <MaterialsShelf {...props} />}
      {shelf === 'failures' && <FailuresShelf {...props} />}
      {shelf === 'formulas' && <FormulasShelf {...props} />}
      {shelf === 'people' && <PeopleShelf {...props} text={text} />}
      {shelf === 'discoveries' && <DiscoveriesShelf {...props} />}
      {shelf === 'elements' && <PeriodicTable {...props} text={text} />}
      {shelf === 'phases' && <PhaseDiagrams {...props} text={text} />}
      {shelf === 'lab' && <LabHandbook {...props} text={text} />}
      {shelf === 'micro' && <MicrographGallery {...props} />}
      {shelf === 'map' && <PhMap {...props} onGo={onGo} />}
      {shelf === 'micro' && (
        <footer className="pw-sources">
          <span className="eyebrow">General sources</span>
          <Sources list={MIC_SOURCES} />
        </footer>
      )}
      {shelf === 'elements' && (
        <footer className="pw-sources">
          <span className="eyebrow">General sources</span>
          <Sources list={PT_SOURCES} />
          <p className="pw-note">Numbers are the usual reference values at normal air pressure. Pictures are real samples; where no real photo exists, none is shown.</p>
        </footer>
      )}
      {shelf === 'materials' && (
        <footer className="pw-sources">
          <span className="eyebrow">Sources for the property values</span>
          <Sources list={Object.values(MSRC)} />
          <p className="pw-note">Values are typical for the grade and condition named. Real batches vary, and design work should use the supplier’s certified data.</p>
        </footer>
      )}
    </div>
  );
}
