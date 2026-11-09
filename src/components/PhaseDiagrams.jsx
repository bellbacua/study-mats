import { useEffect, useMemo, useRef, useState } from 'react';
import { DIAGRAMS, SOURCES } from '../data/library/phases';
import { ClassChips, Sources } from './LibBits';

const W = 640;
const H = 420;
const M = { l: 56, r: 16, t: 16, b: 44 };

// Composition on a boundary curve at temperature t (linear between points).
function xAt(curve, t) {
  for (let i = 0; i < curve.length - 1; i++) {
    const [x1, t1] = curve[i];
    const [x2, t2] = curve[i + 1];
    const lo = Math.min(t1, t2);
    const hi = Math.max(t1, t2);
    if (t >= lo && t <= hi) return t1 === t2 ? x1 : x1 + ((t - t1) / (t2 - t1)) * (x2 - x1);
  }
  return null;
}

function inside(poly, x, t) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, ti] = poly[i];
    const [xj, tj] = poly[j];
    if (ti > t !== tj > t && x < ((xj - xi) * (t - ti)) / (tj - ti) + xi) hit = !hit;
  }
  return hit;
}

function centroid(poly) {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const f = poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1];
    a += f;
    cx += (poly[j][0] + poly[i][0]) * f;
    cy += (poly[j][1] + poly[i][1]) * f;
  }
  return a ? [cx / (3 * a), cy / (3 * a)] : poly[0];
}

const fmt = (v, d = 1) => (Math.abs(v) < 1 ? v.toFixed(d + 1) : v.toFixed(d));

export default function PhaseDiagrams({ q, byId, progress, onOpen, text }) {
  const list = DIAGRAMS.filter((d) => !q || [d.name, d.story, d.uses].some((f) => f.toLowerCase().includes(q)));
  const [id, setId] = useState(DIAGRAMS[0].id);
  const d = DIAGRAMS.find((x) => x.id === id) || DIAGRAMS[0];
  const [pt, setPt] = useState(d.start);
  const [playing, setPlaying] = useState(false);
  const svgRef = useRef(null);
  const drag = useRef(false);
  const ptRef = useRef(pt);
  ptRef.current = pt;

  useEffect(() => {
    setPt(d.start);
    setPlaying(false);
  }, [d]);

  const sx = (x) => M.l + ((x - d.x[0]) / (d.x[1] - d.x[0])) * (W - M.l - M.r);
  const sy = (t) => M.t + ((d.t[1] - t) / (d.t[1] - d.t[0])) * (H - M.t - M.b);
  const path = (c) => c.map(([x, t], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(t).toFixed(1)}`).join(' ');

  // Slow cooling: walk the temperature down from the top.
  useEffect(() => {
    if (!playing) return undefined;
    let raf;
    let last = performance.now();
    const rate = (d.t[1] - d.t[0]) / 9; // whole range in about 9 s
    const step = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      const [x0, t0] = ptRef.current;
      const nt = Math.max(d.t[0] + 1, t0 - rate * dt);
      setPt([x0, nt]);
      if (nt <= d.t[0] + 1) setPlaying(false);
      else raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, d]);

  const toData = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const py = ((e.clientY - r.top) / r.height) * H;
    const x = d.x[0] + ((px - M.l) / (W - M.l - M.r)) * (d.x[1] - d.x[0]);
    const t = d.t[1] - ((py - M.t) / (H - M.t - M.b)) * (d.t[1] - d.t[0]);
    return [Math.max(d.x[0], Math.min(d.x[1], x)), Math.max(d.t[0] + 1, Math.min(d.t[1] - 1, t))];
  };

  const [x, t] = pt;
  const region = d.regions.find((r) => inside(r.poly, x, t));
  let lever = null;
  if (region?.left) {
    const xl = xAt(d.curves[region.left[1]], t);
    const xr = xAt(d.curves[region.right[1]], t);
    if (xl != null && xr != null && xr !== xl) {
      const fr = Math.max(0, Math.min(1, (x - xl) / (xr - xl)));
      lever = { xl, xr, fl: 1 - fr, fr, nl: region.left[0], nr: region.right[0] };
    }
  }
  const classes = useMemo(
    () =>
      Object.entries(text || {})
        .filter(([, s]) => d.find.test(s))
        .map(([k]) => k)
        .slice(0, 10),
    [d, text],
  );
  const xticks = d.x[1] > 10 ? [0, 20, 40, 60, 80, 100] : [0, 1, 2, 3, 4, 5, 6, 6.67];
  const tticks = [];
  for (let v = Math.ceil(d.t[0] / d.tick) * d.tick; v <= d.t[1]; v += d.tick) tticks.push(v);

  return (
    <>
      <div className="chips lib-fams">
        {list.map((x2) => (
          <button key={x2.id} type="button" className={`chip ${x2.id === d.id ? 'on' : ''}`} onClick={() => setId(x2.id)}>
            {x2.name}
          </button>
        ))}
        {!list.length && <span className="lib-hint">Nothing matches.</span>}
      </div>
      <div className="pd-wrap">
        <figure className="pd-plot">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`${d.name} phase diagram`}
            onPointerDown={(e) => {
              drag.current = true;
              setPlaying(false);
              e.currentTarget.setPointerCapture?.(e.pointerId);
              setPt(toData(e));
            }}
            onPointerMove={(e) => drag.current && setPt(toData(e))}
            onPointerUp={() => (drag.current = false)}
            onPointerCancel={() => (drag.current = false)}
          >
            {d.regions.map((r) => (
              <path key={r.id} d={`${path(r.poly)} Z`} fill={r.color} className={`pd-region ${region?.id === r.id ? 'on' : ''}`} />
            ))}
            {d.bands?.map((b) => (
              <g key={b.text} className="pd-band">
                <line x1={sx(b.to)} x2={sx(b.to)} y1={M.t} y2={H - M.b} />
                <text x={(sx(b.from) + sx(b.to)) / 2} y={M.t + 14} textAnchor="middle">
                  {b.text}
                </text>
              </g>
            ))}
            {d.lines.map((k) => (
              <path key={k} d={path(d.curves[k])} className="pd-line" />
            ))}
            {d.iso?.map(([a, b, tt]) => (
              <line key={`${a}-${tt}`} x1={sx(a)} x2={sx(b)} y1={sy(tt)} y2={sy(tt)} className="pd-line" />
            ))}
            {d.regions.map((r) => {
              const [cx, ct] = centroid(r.poly);
              return (
                <text key={r.id} x={sx(cx)} y={sy(ct)} className="pd-rlabel" textAnchor="middle">
                  {r.label}
                </text>
              );
            })}
            {d.marks?.map((m) => (
              <circle key={m.text} cx={sx(m.x)} cy={sy(m.t)} r={4} className="pd-mark">
                <title>{m.text}</title>
              </circle>
            ))}
            {/* axes */}
            <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} className="pd-axis" />
            <line x1={M.l} x2={M.l} y1={M.t} y2={H - M.b} className="pd-axis" />
            {xticks.map((v) => (
              <text key={v} x={sx(v)} y={H - M.b + 16} textAnchor="middle" className="pd-tick">
                {v}
              </text>
            ))}
            {tticks.map((v) => (
              <text key={v} x={M.l - 6} y={sy(v) + 4} textAnchor="end" className="pd-tick">
                {v}
              </text>
            ))}
            <text x={(M.l + W - M.r) / 2} y={H - 6} textAnchor="middle" className="pd-axlabel">
              wt% {d.b} (the rest is {d.a})
            </text>
            <text x={14} y={(M.t + H - M.b) / 2} textAnchor="middle" className="pd-axlabel" transform={`rotate(-90 14 ${(M.t + H - M.b) / 2})`}>
              Temperature (°C)
            </text>
            {/* the chosen point and its tie line */}
            {lever && <line x1={sx(lever.xl)} x2={sx(lever.xr)} y1={sy(t)} y2={sy(t)} className="pd-tie" />}
            {lever && <circle cx={sx(lever.xl)} cy={sy(t)} r={4} className="pd-end" />}
            {lever && <circle cx={sx(lever.xr)} cy={sy(t)} r={4} className="pd-end" />}
            <line x1={sx(x)} x2={sx(x)} y1={M.t} y2={H - M.b} className="pd-guide" />
            <circle cx={sx(x)} cy={sy(t)} r={7} className="pd-point" />
          </svg>
          <figcaption>Tap or drag anywhere on the diagram. Lines are simplified from the textbook diagrams; for design work use the ASM database.</figcaption>
        </figure>

        <div className="pd-side">
          <div className="pd-sliders">
            <label>
              Composition: <strong>{fmt(x, d.x[1] > 10 ? 1 : 2)} wt% {d.b}</strong>
              <input type="range" min={d.x[0]} max={d.x[1]} step={(d.x[1] - d.x[0]) / 500} value={x} onChange={(e) => setPt([Number(e.target.value), t])} />
            </label>
            <label>
              Temperature: <strong>{Math.round(t)} °C</strong>
              <input type="range" min={d.t[0] + 1} max={d.t[1] - 1} step={1} value={t} onChange={(e) => (setPlaying(false), setPt([x, Number(e.target.value)]))} />
            </label>
            <button
              type="button"
              className="chip"
              onClick={() => {
                if (!playing) setPt([x, d.t[1] - 1]);
                setPlaying(!playing);
              }}
            >
              {playing ? 'Pause' : '▶ Cool it down slowly'}
            </button>
          </div>
          <article className="lib-detail pd-card" style={{ '--subj': region?.color || 'var(--line)' }}>
            <span className="eyebrow">What you would find here</span>
            <h3>{region ? region.name : 'Right on a boundary line'}</h3>
            {lever ? (
              <>
                <div className="pd-bar" aria-hidden="true">
                  <span style={{ width: `${lever.fl * 100}%` }}>{lever.fl > 0.12 ? lever.nl : ''}</span>
                  <span style={{ width: `${lever.fr * 100}%` }}>{lever.fr > 0.12 ? lever.nr : ''}</span>
                </div>
                <p>
                  <strong>{Math.round(lever.fl * 100)}% {lever.nl}</strong>, containing {fmt(lever.xl, 2)} wt% {d.b}, and{' '}
                  <strong>{Math.round(lever.fr * 100)}% {lever.nr}</strong>, containing {fmt(lever.xr, 2)} wt% {d.b}.
                </p>
                <p className="pd-math">
                  Lever rule: share of {lever.nr} = (C₀ − C<sub>{lever.nl}</sub>) ÷ (C<sub>{lever.nr}</sub> − C<sub>{lever.nl}</sub>) = ({fmt(x, 2)} − {fmt(lever.xl, 2)}) ÷ ({fmt(lever.xr, 2)} −{' '}
                  {fmt(lever.xl, 2)}) = {lever.fr.toFixed(2)}
                </p>
                <p className="pw-note">
                  Like a see-saw balanced at your point: the phase on the far side of the line gets the bigger share. The yellow tie line runs between the two phase compositions.
                </p>
              </>
            ) : region ? (
              <p>One phase only, so 100% {region.label}, and it has the same composition as the whole alloy: {fmt(x, 2)} wt% {d.b}.</p>
            ) : (
              <p>Move the point a little to either side.</p>
            )}
          </article>
        </div>
      </div>
      <article className="lib-detail pd-about">
        <h3>{d.name}</h3>
        <p>{d.story}</p>
        <p>
          <strong>Used for: </strong>
          {d.uses}
        </p>
        {d.marks?.length ? <p className="pw-note">Special points: {d.marks.map((m) => m.text).join('; ')}.</p> : null}
        <ClassChips ids={classes} byId={byId} progress={progress} onOpen={onOpen} />
        <Sources list={d.sources.map((s) => (typeof s === 'string' ? SOURCES[s] : s))} />
      </article>
      <footer className="pw-sources">
        <span className="eyebrow">General sources</span>
        <Sources list={[SOURCES.callister, SOURCES.doitpoms, SOURCES.lever, SOURCES.asm]} />
      </footer>
    </>
  );
}
