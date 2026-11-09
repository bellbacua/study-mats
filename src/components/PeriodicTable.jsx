import { useMemo, useRef, useState } from 'react';
import { ELEMENTS } from '../data/library/elements';
import { ClassChips, Sources } from './LibBits';
import { filePage } from './Pictures';

export const EL_FAMILIES = [
  { id: 'alkali', label: 'Alkali metals', color: '#fc6255' },
  { id: 'alkaline', label: 'Alkaline earth metals', color: '#f0ac5f' },
  { id: 'transition', label: 'Transition metals', color: '#58c4dd' },
  { id: 'post', label: 'Other metals', color: '#8fa8ff' },
  { id: 'metalloid', label: 'Metalloids', color: '#5cd0b3' },
  { id: 'nonmetal', label: 'Nonmetals', color: '#83c167' },
  { id: 'noble', label: 'Noble gases', color: '#b48ad0' },
  { id: 'lanthanide', label: 'Lanthanides (rare earths)', color: '#e59ac0' },
  { id: 'actinide', label: 'Actinides', color: '#e8c26a' },
  { id: 'unknown', label: 'Not yet known', color: '#6c7480' },
];
const famOf = Object.fromEntries(EL_FAMILIES.map((f) => [f.id, f]));

const SRC = {
  data: { title: 'Periodic Table JSON (values compiled from Wikipedia), Bowserinator on GitHub', url: 'https://github.com/Bowserinator/Periodic-Table-JSON' },
  usgs: { title: 'U.S. Geological Survey, Mineral Commodity Summaries 2025 (who mines what)', url: 'https://pubs.usgs.gov/publication/mcs2025' },
  rsc: (e) => ({ title: `Royal Society of Chemistry periodic table: ${e.name}`, url: `https://www.rsc.org/periodic-table/element/${e.z}/${e.name.toLowerCase()}` }),
  wiki: (e) => ({ title: `Wikipedia: ${e.name} (and its references)`, url: e.wiki }),
};
export const PT_SOURCES = [SRC.data, SRC.usgs, { title: 'Royal Society of Chemistry, Periodic Table', url: 'https://www.rsc.org/periodic-table' }];

const c = (k) => (k == null ? null : Math.round(k - 273.15));
const yearNum = (y) => {
  const m = /(\d{3,4})/.exec(y);
  return m ? Number(m[1]) : null;
};

// Colour scales for the "colour by" switch.
const SCALES = {
  family: { label: 'Family' },
  year: { label: 'When found', get: (e) => (e.year === 'Ancient' ? null : yearNum(e.year)), lo: 1700, hi: 2010, fmt: (v) => v },
  mp: { label: 'Melting point', get: (e) => c(e.mp), lo: -270, hi: 3500, fmt: (v) => `${v} °C` },
  rho: { label: 'Density', get: (e) => e.rho, lo: 0, hi: 22.6, fmt: (v) => `${v < 0.01 ? v.toFixed(4) : v.toFixed(2)} g/cm³` },
};
const heat = (t) => `hsl(${220 - 205 * t} 75% ${38 + 14 * t}%)`;

// Element names that are also everyday words are not auto-linked to classes.
const NO_LINK = new Set(['Lead', 'Mercury', 'Tin']);

function Facts({ e }) {
  const rows = [
    ['Atomic number', e.z],
    ['Atomic mass', `${e.mass} u`],
    ['At room temperature', e.phase ? e.phase.toLowerCase() : 'not known'],
    ['Density', e.rho == null ? 'not known' : `${e.rho < 0.01 ? e.rho.toFixed(5) : e.rho} g/cm³`],
    ['Melts at', e.mp == null ? (e.note && e.z !== 15 ? 'does not melt (see below)' : 'not known') : `${c(e.mp)} °C`],
    ['Boils at', e.bp == null ? (e.note && e.z !== 15 ? '—' : 'not known') : `${c(e.bp)} °C`],
    ['Electronegativity', e.en == null ? 'not known' : e.en],
    ['Electrons', e.config],
  ];
  return (
    <dl className="pt-facts">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PeriodicTable({ q, byId, progress, onOpen, text }) {
  const [sel, setSel] = useState(() => ELEMENTS.find((e) => e.z === 26));
  const [by, setBy] = useState('family');
  const [fam, setFam] = useState(null);
  const cardRef = useRef(null);
  const hit = (e) => !q || [e.name, e.sym, String(e.z), e.uses, e.mined, e.found].some((f) => f.toLowerCase().includes(q));
  const scale = SCALES[by];
  const colour = (e) => {
    if (by === 'family') return famOf[e.fam].color;
    const v = scale.get(e);
    if (v == null) return 'var(--line)';
    return heat(Math.max(0, Math.min(1, (v - scale.lo) / (scale.hi - scale.lo))));
  };
  const classes = useMemo(() => {
    if (!sel || NO_LINK.has(sel.name)) return [];
    const re = new RegExp(`\\b${sel.name}\\b`, 'i');
    return Object.entries(text || {})
      .filter(([, t]) => re.test(t))
      .map(([id]) => id)
      .slice(0, 10);
  }, [sel, text]);
  const pick = (e) => {
    setSel(e);
    if (window.matchMedia?.('(max-width: 760px)').matches) requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const f = sel && famOf[sel.fam];
  const credit = sel?.img && (filePage(sel.img) || (sel.imgCredit && /source: (\S+)/.exec(sel.imgCredit)?.[1]));

  return (
    <>
      <div className="chips lib-fams">
        {Object.entries(SCALES).map(([id, s]) => (
          <button key={id} type="button" className={`chip ${by === id ? 'on' : ''}`} onClick={() => setBy(id)}>
            Colour by {s.label.toLowerCase()}
          </button>
        ))}
      </div>
      {by === 'family' ? (
        <div className="chips lib-fams pt-legend">
          {EL_FAMILIES.map((x) => (
            <button
              key={x.id}
              type="button"
              className={`chip ${fam === x.id ? 'on' : ''}`}
              style={{ '--subj': x.color }}
              onClick={() => setFam(fam === x.id ? null : x.id)}
              aria-pressed={fam === x.id}
            >
              <span className="lib-swatch" style={{ background: x.color }} /> {x.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="pt-ramp">
          <span>{scale.fmt(scale.lo)}</span>
          <i style={{ background: `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map(heat).join(',')})` }} />
          <span>{scale.fmt(scale.hi)}+</span>
          {by === 'year' && <small>Grey: known since ancient times</small>}
        </div>
      )}

      <div className="pt-scroll">
        <div className="pt-grid" role="grid" aria-label="Periodic table">
          {ELEMENTS.map((e) => {
            const dim = !hit(e) || (by === 'family' && fam && e.fam !== fam);
            return (
              <button
                key={e.z}
                type="button"
                className={`pt-cell ${sel?.z === e.z ? 'on' : ''} ${dim ? 'dim' : ''}`}
                style={{ gridColumn: e.x, gridRow: e.y > 7 ? e.y + 1 : e.y, '--el': colour(e) }}
                onClick={() => pick(e)}
                aria-label={`${e.z} ${e.name}`}
                title={e.name}
              >
                <small>{e.z}</small>
                <b>{e.sym}</b>
                <span>{e.name}</span>
              </button>
            );
          })}
          <span className="pt-gap" style={{ gridColumn: 3, gridRow: 6 }}>
            57–71
          </span>
          <span className="pt-gap" style={{ gridColumn: 3, gridRow: 7 }}>
            89–103
          </span>
        </div>
      </div>

      {sel && (
        <article ref={cardRef} className="lib-detail pt-card" style={{ '--subj': f.color }}>
          <div className="pt-head">
            <div className="pt-big" style={{ '--el': f.color }}>
              <small>{sel.z}</small>
              <b>{sel.sym}</b>
            </div>
            <div>
              <span className="eyebrow" style={{ color: f.color }}>
                {f.label}
              </span>
              <h2>{sel.name}</h2>
              <p className="pt-found">
                <strong>{sel.year === 'Ancient' ? 'Known since ancient times. ' : `Found ${sel.year}. `}</strong>
                {sel.found}
              </p>
            </div>
          </div>
          <div className="pt-body">
            <div>
              <Facts e={sel} />
              {sel.note && <p className="pw-note">{sel.note}</p>}
              {sel.z >= 100 && <p className="pw-note">Only a few atoms of this element have ever been made, and they last seconds or less, so most of its properties have never been measured.</p>}
            </div>
            <div>
              {sel.img && (
                <figure className="ph-pic" key={sel.img}>
                  <img src={sel.img} alt={sel.name} loading="lazy" referrerPolicy="no-referrer" onError={(ev) => (ev.currentTarget.closest('figure').style.display = 'none')} />
                  <figcaption>
                    {sel.imgTitle}
                    {credit && (
                      <>
                        {' · '}
                        <a href={credit} target="_blank" rel="noreferrer">
                          credit and licence
                        </a>
                      </>
                    )}
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
          <dl className="pt-more">
            <dt>Crystal structure</dt>
            <dd>{sel.struct}</dd>
            <dt>What it is used for</dt>
            <dd>{sel.uses}</dd>
            <dt>Where it comes from</dt>
            <dd>{sel.mined}</dd>
          </dl>
          <ClassChips ids={classes} byId={byId} progress={progress} onOpen={onOpen} />
          <Sources list={[SRC.wiki(sel), SRC.rsc(sel), ...(/not mined/i.test(sel.mined) ? [] : [SRC.usgs])]} />
        </article>
      )}
    </>
  );
}
