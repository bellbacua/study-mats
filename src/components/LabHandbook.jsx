import { useMemo, useState } from 'react';
import { TECHNIQUES, GROUPS } from '../data/library/techniques';
import { ClassChips, Sources } from './LibBits';
import { useWikiPic, filePage } from './Pictures';

const grp = Object.fromEntries(GROUPS.map((g) => [g.id, g]));

// Hand-drawn sketches of what a typical result looks like. Shapes only, not data.
function Sketch({ kind }) {
  const W = 320;
  const H = 150;
  const axes = (
    <>
      <line x1={30} y1={H - 24} x2={W - 8} y2={H - 24} className="lh-axis" />
      <line x1={30} y1={10} x2={30} y2={H - 24} className="lh-axis" />
    </>
  );
  if (kind === 'xrd') {
    const peaks = [
      [44.7, 100],
      [65.0, 15],
      [82.3, 25],
    ];
    const x = (a) => 30 + ((a - 20) / 70) * (W - 40);
    let d = `M30 ${H - 30}`;
    for (let a = 20; a <= 90; a += 0.25) {
      const y = peaks.reduce((s, [p, h]) => s + h * Math.exp(-((a - p) ** 2) / 0.35), 0);
      d += ` L${x(a).toFixed(1)} ${(H - 30 - y * 0.95).toFixed(1)}`;
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="lh-sketch" role="img" aria-label="Sketch of an X-ray diffraction pattern">
        {axes}
        <path d={d} className="lh-curve" />
        {[
          [44.7, '(110)'],
          [65.0, '(200)'],
          [82.3, '(211)'],
        ].map(([a, t]) => (
          <text key={t} x={x(a)} y={a === 44.7 ? 18 : 92} textAnchor="middle" className="lh-note">
            {t}
          </text>
        ))}
        <text x={W - 8} y={H - 8} textAnchor="end" className="lh-lab">
          2θ (degrees) →
        </text>
        <text x={34} y={H - 8} className="lh-lab">
          20°
        </text>
        <text x={36} y={20} className="lh-lab">
          intensity (BCC iron, copper X-rays)
        </text>
      </svg>
    );
  }
  if (kind === 'tensile') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="lh-sketch" role="img" aria-label="Sketch of a stress–strain curve">
        {axes}
        <path d="M30 126 L70 50 C80 38 100 32 140 28 C190 24 220 26 245 36 C262 44 272 56 280 72" className="lh-curve" />
        <line x1={44} y1={126} x2={86} y2={46} className="lh-dash" />
        <text x={62} y={118} className="lh-note">slope = modulus (dashed: 0.2% offset)</text>
        <text x={72} y={44} className="lh-note" textAnchor="end">yield</text>
        <text x={200} y={20} className="lh-note">tensile strength</text>
        <text x={312} y={92} className="lh-note" textAnchor="end">neck, then break</text>
        <text x={W - 8} y={H - 8} textAnchor="end" className="lh-lab">strain →</text>
        <text x={36} y={20} className="lh-lab">stress</text>
      </svg>
    );
  }
  if (kind === 'charpy') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="lh-sketch" role="img" aria-label="Sketch of a ductile-to-brittle transition curve">
        {axes}
        <path d="M34 112 C120 112 130 110 160 72 C190 34 200 30 300 30" className="lh-curve" />
        <text x={40} y={104} className="lh-note">brittle (cold)</text>
        <text x={230} y={22} className="lh-note">ductile (warm)</text>
        <text x={166} y={92} className="lh-note">transition</text>
        <text x={W - 8} y={H - 8} textAnchor="end" className="lh-lab">temperature →</text>
        <text x={36} y={20} className="lh-lab">energy absorbed</text>
      </svg>
    );
  }
  if (kind === 'dsc') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="lh-sketch" role="img" aria-label="Sketch of a DSC curve for a polymer">
        {axes}
        <path d="M34 70 L90 70 C96 70 98 80 104 80 L150 80 C158 80 160 100 168 100 C176 100 178 80 186 80 L222 80 C230 80 232 40 242 40 C252 40 254 80 262 80 L300 80" className="lh-curve" />
        <text x={86} y={62} className="lh-note">glass transition (step)</text>
        <text x={146} y={118} className="lh-note">crystallises (gives heat)</text>
        <text x={222} y={32} className="lh-note">melts (takes heat)</text>
        <text x={W - 8} y={H - 8} textAnchor="end" className="lh-lab">temperature →</text>
        <text x={36} y={20} className="lh-lab">heat flow (endothermic up)</text>
      </svg>
    );
  }
  return null;
}

function Pic({ url, alt }) {
  const pic = useWikiPic(url, true);
  if (!pic) return null;
  return (
    <figure className="ph-pic lh-pic">
      <img src={pic.thumb} alt={alt} loading="lazy" />
      <figcaption>
        Picture: <a href={pic.page} target="_blank" rel="noreferrer">{pic.title}</a>
        {filePage(pic.full) && (
          <>
            {' · '}
            <a href={filePage(pic.full)} target="_blank" rel="noreferrer">
              credit and licence
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}

export default function LabHandbook({ q, byId, progress, onOpen, text }) {
  const [g, setG] = useState('all');
  const [open, setOpen] = useState('tensile');
  const list = TECHNIQUES.filter(
    (t) => (g === 'all' || t.group === g) && (!q || [t.name, t.short, t.tells, t.read, ...t.how, ...t.mistakes].some((f) => f.toLowerCase().includes(q))),
  );
  const classesFor = useMemo(() => {
    const out = {};
    for (const t of TECHNIQUES) {
      const key = t.name.split(' (')[0].split(' and ')[0];
      const re = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
      const abbr = /\(([A-Z]{2,4})\)/.exec(t.name)?.[1];
      const re2 = abbr ? new RegExp(`\\b${abbr}\\b`) : null;
      out[t.id] = Object.entries(text || {})
        .filter(([, s]) => re.test(s) || (re2 && re2.test(s)))
        .map(([k]) => k)
        .slice(0, 8);
    }
    return out;
  }, [text]);

  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${g === 'all' ? 'on' : ''}`} onClick={() => setG('all')}>
          Everything ({TECHNIQUES.length})
        </button>
        {GROUPS.map((x) => (
          <button key={x.id} type="button" className={`chip ${g === x.id ? 'on' : ''}`} style={{ '--subj': x.color }} onClick={() => setG(x.id)}>
            <span className="lib-swatch" style={{ background: x.color }} /> {x.label}
          </button>
        ))}
      </div>
      <ul className="lh-list">
        {list.map((t) => {
          const on = open === t.id;
          const c = grp[t.group].color;
          return (
            <li key={t.id} className={`lib-detail lh-item ${on ? 'on' : ''}`} style={{ '--subj': c }}>
              <button type="button" className="lh-head" onClick={() => setOpen(on ? null : t.id)} aria-expanded={on}>
                <span className="eyebrow" style={{ color: c }}>
                  {grp[t.group].label}
                </span>
                <strong>{t.name}</strong>
                <span className="lh-short">{t.short}</span>
              </button>
              {on && (
                <div className="lh-body">
                  <div className="lh-top">
                    <div>
                      <h4>What it tells you</h4>
                      <p>{t.tells}</p>
                      <h4>How it is done</h4>
                      <ol>
                        {t.how.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <Pic url={t.wiki} alt={t.name} />
                      {t.sketch && (
                        <figure className="lh-fig">
                          <Sketch kind={t.sketch} />
                          <figcaption>A sketch of the usual shape of the result, not real data.</figcaption>
                        </figure>
                      )}
                    </div>
                  </div>
                  <h4>How to read the result</h4>
                  <p>{t.read}</p>
                  <h4>Common mistakes</h4>
                  <ul className="lh-mistakes">
                    {t.mistakes.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  {t.standards && (
                    <p className="pw-note">
                      <strong>Standards: </strong>
                      {t.standards}
                    </p>
                  )}
                  <ClassChips ids={classesFor[t.id]} byId={byId} progress={progress} onOpen={onOpen} />
                  <Sources list={t.sources} />
                </div>
              )}
            </li>
          );
        })}
        {!list.length && <li className="lib-hint">Nothing matches.</li>}
      </ul>
    </>
  );
}
