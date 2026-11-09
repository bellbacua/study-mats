import { useMemo, useRef, useState } from 'react';
import { PH, PH_PATH } from '../data/library/phOutline';
import { SITES, CATS, SOURCES } from '../data/library/phSites';
import { useWikiPic, filePage } from './Pictures';

const catOf = Object.fromEntries(CATS.map((c) => [c.id, c]));
const xy = (lat, lon) => [(lon - PH.L0) * PH.S * PH.K, (PH.A1 - lat) * PH.S];
const UM = SITES.find((s) => s.id === 'um');

// Great-circle distance in km.
const km = (a, b) => {
  const r = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

const REGIONS = [
  { label: 'LUZON', lat: 18.4, lon: 123.9 },
  { label: 'VISAYAS', lat: 12.95, lon: 126.6, anchor: 'end' },
  { label: 'MINDANAO', lat: 5.0, lon: 123.4 },
  { label: 'PALAWAN', lat: 11.9, lon: 118.4 },
];
const CITIES = [
  { label: 'Manila', lat: 14.6, lon: 120.98 },
  { label: 'Davao', lat: 7.19, lon: 125.45 },
];

function SitePic({ url, alt }) {
  const pic = useWikiPic(url, true);
  if (!pic) return null;
  return (
    <figure className="ph-pic">
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

export default function PhMap({ q, byId, progress, onOpen, onGo }) {
  const [cat, setCat] = useState('all');
  const [sel, setSel] = useState(UM);
  const [hover, setHover] = useState(null);
  const cardRef = useRef(null);
  const list = useMemo(
    () => SITES.filter((s) => (cat === 'all' || s.cat === cat) && (!q || [s.name, s.place, s.what, s.why].some((f) => f.toLowerCase().includes(q)))),
    [cat, q],
  );
  const pick = (s) => {
    setSel(s);
    if (window.matchMedia?.('(max-width: 760px)').matches) requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const c = sel ? catOf[sel.cat] : null;
  const label = hover || sel;

  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${cat === 'all' ? 'on' : ''}`} style={{ '--subj': 'var(--text)' }} onClick={() => setCat('all')}>
          Everything ({SITES.length})
        </button>
        {CATS.map((x) => (
          <button key={x.id} type="button" className={`chip ${cat === x.id ? 'on' : ''}`} style={{ '--subj': x.color }} onClick={() => setCat(x.id)}>
            <span className="lib-swatch" style={{ background: x.color }} /> {x.label}
          </button>
        ))}
      </div>
      <div className="ph-wrap">
        <figure className="ph-map">
          <svg viewBox={`0 0 ${PH.W} ${PH.H}`} role="img" aria-label="Map of the Philippines with materials sites">
            <defs>
              <radialGradient id="ph-sea" cx="50%" cy="45%" r="70%">
                <stop offset="0%" stopColor="color-mix(in srgb, var(--blue) 10%, var(--bg))" />
                <stop offset="100%" stopColor="var(--bg)" />
              </radialGradient>
            </defs>
            <rect width={PH.W} height={PH.H} fill="url(#ph-sea)" />
            <path d={PH_PATH} className="ph-land" />
            {REGIONS.map((r) => {
              const [x, y] = xy(r.lat, r.lon);
              return (
                <text key={r.label} x={x} y={y} className="ph-region" textAnchor={r.anchor || 'middle'}>
                  {r.label}
                </text>
              );
            })}
            {CITIES.map((r) => {
              const [x, y] = xy(r.lat, r.lon);
              return (
                <g key={r.label} className="ph-city">
                  <circle cx={x} cy={y} r={5} />
                  <text x={x - 10} y={y + 5} textAnchor="end">
                    {r.label}
                  </text>
                </g>
              );
            })}
            {sel && sel.id !== 'um' && (() => {
              const [x1, y1] = xy(UM.lat, UM.lon);
              const [x2, y2] = xy(sel.lat, sel.lon);
              return <line x1={x1} y1={y1} x2={x2} y2={y2} className="ph-line" />;
            })()}
            {list.map((s) => {
              const [x, y] = xy(s.lat, s.lon);
              const on = sel?.id === s.id;
              return (
                <g
                  key={s.id}
                  className={`ph-pin ${on ? 'on' : ''}`}
                  transform={`translate(${x} ${y})`}
                  onClick={() => pick(s)}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={s.name}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && pick(s)}
                >
                  <circle r={34} className="ph-hit" />
                  {on && <circle r={30} className="ph-halo" style={{ stroke: catOf[s.cat].color }} />}
                  {s.id === 'um' ? (
                    <path d="M0 -26 L7.7 -10.5 L24.7 -8 L12.4 4 L15.3 21 L0 13 L-15.3 21 L-12.4 4 L-24.7 -8 L-7.7 -10.5 Z" fill={catOf[s.cat].color} className="ph-dot" />
                  ) : (
                    <circle r={on ? 20 : 15} fill={catOf[s.cat].color} className="ph-dot" />
                  )}
                </g>
              );
            })}
            {label &&
              (() => {
                const [x, y] = xy(label.lat, label.lon);
                const right = x < PH.W * 0.55;
                return (
                  <text x={right ? x + 24 : x - 24} y={y - 18} textAnchor={right ? 'start' : 'end'} className="ph-label">
                    {label.name}
                  </text>
                );
              })()}
          </svg>
          <figcaption>Pins are at town level, not exact gates. The outline is Natural Earth’s public-domain map, simplified.</figcaption>
        </figure>

        <div className="ph-side">
          {sel && (
            <article ref={cardRef} className="lib-detail ph-card" style={{ '--subj': c.color }}>
              <span className="eyebrow" style={{ color: c.color }}>
                {c.icon} {c.label}
              </span>
              <h2>{sel.name}</h2>
              <p className="ph-place">
                📍 {sel.place}
                {sel.id !== 'um' && <> · about {Math.round(km(UM, sel) / 10) * 10} km from UM in a straight line</>}
              </p>
              <SitePic url={sel.sources[0]?.url} alt={sel.name} />
              <p>{sel.what}</p>
              <p className="ph-why">
                <strong>Why it matters to you: </strong>
                {sel.why}
              </p>
              {(() => {
                const ls = sel.classes.map((id) => byId[id]).filter(Boolean);
                return ls.length ? (
                  <div className="lib-classes">
                    <span className="eyebrow">In your classes</span>
                    <div className="chips">
                      {ls.map((l) => (
                        <button key={l.id} type="button" className="chip pw-class" onClick={() => onOpen(l.id)}>
                          {progress.passed[l.id] ? '✓ ' : ''}
                          {l.code} · {l.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
              {onGo && (
                <button type="button" className="chip ph-go" onClick={() => onGo('paths')}>
                  See the jobs this leads to in Pathways →
                </button>
              )}
              <ul className="lib-src">
                {sel.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          )}
          <ul className="ph-list">
            {list.map((s) => (
              <li key={s.id}>
                <button type="button" className={sel?.id === s.id ? 'on' : ''} onClick={() => pick(s)}>
                  <span className="lib-swatch" style={{ background: catOf[s.cat].color }} />
                  <span>
                    <strong>{s.name}</strong>
                    <small>{s.place}</small>
                  </span>
                </button>
              </li>
            ))}
            {!list.length && <li className="lib-hint">Nothing matches.</li>}
          </ul>
        </div>
      </div>
      <footer className="pw-sources">
        <span className="eyebrow">General sources</span>
        <ul className="lib-src">
          {Object.values(SOURCES).map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="pw-note">Mines and plants open, close and change owners. Check the latest news before planning a visit or an application.</p>
      </footer>
    </>
  );
}
