import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_LESSONS, LESSONS, PROGRAM, PROGRAM_ID, SUBJECTS, needsOf, whereLabel } from '../data/path';
import { useReveal } from '../state/useReveal';
import { IDEA_LINKS } from '../data/ideaLinks';

// A map of how ideas connect. Every class is a dot; a line runs from each
// class to the classes that build on it. Rows are subjects, and columns go
// left to right from "needs nothing" to "needs the most before it". Click a
// dot to light up the path from zero to it (everything it builds on) and
// what it unlocks.

const COL = 76;
const ROW = 58;
const PAD_X = 40;
const PAD_Y = 34;
const LANE_ORDER = ['math', 'phys', 'chem', 'mate', 'eng', 'prog', 'disc', 'algo', 'sys', 'ai', 'comp', 'philo', 'bio', 'econ'];

const BY_ID = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));
// What each class builds on: the app's own prerequisites plus the links
// between subjects written for the map.
const NEEDS = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, [...new Set([...needsOf(l.id), ...(IDEA_LINKS[l.id] || []).filter((x) => BY_ID[x])])]]));
const UNLOCKS = {};
for (const l of ALL_LESSONS) for (const n of NEEDS[l.id]) (UNLOCKS[n] ||= []).push(l.id);

// Everything a class builds on, directly or through others (or everything
// that builds on it, with `down`).
function closure(id, down = false) {
  const seen = new Set();
  const walk = (x) => {
    for (const y of (down ? UNLOCKS : NEEDS)[x] || []) {
      if (seen.has(y)) continue;
      seen.add(y);
      walk(y);
    }
  };
  walk(id);
  return seen;
}

// Columns by longest chain of needs inside the set; rows by subject, with a
// few sub-rows where one subject has several classes in a column.
function layout(ids) {
  const set = new Set(ids);
  const depth = {};
  const visiting = new Set();
  const d = (id) => {
    if (depth[id] != null) return depth[id];
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const n = NEEDS[id].filter((x) => set.has(x));
    depth[id] = n.length ? 1 + Math.max(...n.map(d)) : 0;
    return depth[id];
  };
  ids.forEach(d);
  const rank = (t) => (LANE_ORDER.includes(t) ? LANE_ORDER.indexOf(t) : 99);
  const lanes = [...new Set(ids.map((id) => BY_ID[id].track))].sort((a, b) => rank(a) - rank(b));
  const cells = {};
  for (const id of ids) (cells[`${BY_ID[id].track}|${depth[id]}`] ||= []).push(id);
  const laneRows = Object.fromEntries(lanes.map((t) => [t, Math.max(1, ...Object.entries(cells).filter(([k]) => k.startsWith(`${t}|`)).map(([, v]) => v.length))]));
  const pos = {};
  const laneTop = {};
  let row = 0;
  for (const t of lanes) {
    laneTop[t] = row;
    row += laneRows[t];
  }
  for (const [k, list] of Object.entries(cells)) {
    const [t, c] = k.split('|');
    list.forEach((id, i) => (pos[id] = { x: PAD_X + Number(c) * COL, y: PAD_Y + (laneTop[t] + i) * ROW }));
  }
  const cols = Math.max(0, ...Object.values(depth)) + 1;
  return { pos, lanes: lanes.map((t) => ({ id: t, top: PAD_Y + laneTop[t] * ROW, rows: laneRows[t] })), width: PAD_X * 2 + (cols - 1) * COL, height: PAD_Y * 2 + (row - 1) * ROW };
}

const short = (l) => l.title.split(':')[0];

export default function IdeaMap({ progress, onOpen }) {
  const [scope, setScope] = useState('program');
  const [sel, setSel] = useState(null);
  const [only, setOnly] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [q, setQ] = useState('');
  const scroller = useRef(null);
  useReveal([]);
  const passed = progress.passed;

  // This program: its timetable, its tracks and side topics, and anything
  // they build on. Everything: both programs.
  const baseIds = useMemo(() => {
    if (scope === 'all') return ALL_LESSONS.map((l) => l.id);
    const mine = new Set(ALL_LESSONS.filter((l) => !l.from && (!l.program || l.program === PROGRAM_ID)).map((l) => l.id));
    for (const id of Array.from(mine)) for (const x of closure(id)) mine.add(x);
    return ALL_LESSONS.map((l) => l.id).filter((id) => mine.has(id));
  }, [scope]);

  const up = useMemo(() => (sel ? closure(sel) : new Set()), [sel]);
  const down = useMemo(() => (sel ? closure(sel, true) : new Set()), [sel]);
  const ids = useMemo(() => (sel && only ? baseIds.filter((id) => id === sel || up.has(id) || down.has(id)) : baseIds), [baseIds, sel, only, up, down]);
  const L = useMemo(() => layout(ids), [ids]);
  const idSet = useMemo(() => new Set(ids), [ids]);

  const ready = (id) => !passed[id] && NEEDS[id].every((n) => passed[n]);
  const role = (id) => (!sel ? '' : id === sel ? 'sel' : up.has(id) ? 'up' : down.has(id) ? 'down' : 'dim');

  // Bring the chosen class into view.
  useEffect(() => {
    if (!sel || !scroller.current || !L.pos[sel]) return;
    const el = scroller.current;
    el.scrollTo({ left: Math.max(0, L.pos[sel].x * zoom - el.clientWidth / 2), behavior: 'smooth' });
  }, [sel, L, zoom]);
  // Start at the first class not yet done.
  useEffect(() => {
    const first = LESSONS.find((l) => !passed[l.id]);
    if (first && L.pos[first.id] && scroller.current) scroller.current.scrollLeft = Math.max(0, L.pos[first.id].x - 160);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const matches = q.trim().length > 1 ? baseIds.map((id) => BY_ID[id]).filter((l) => `${l.title} ${l.code}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : [];
  const pick = (id) => {
    setSel(id === sel ? null : id);
    setQ('');
  };

  const chosen = sel && BY_ID[sel];
  const path = chosen ? [...up].map((id) => BY_ID[id]).sort((a, b) => (L.pos[a.id]?.x ?? 0) - (L.pos[b.id]?.x ?? 0)) : [];
  const pathDone = path.filter((l) => passed[l.id]).length;
  const unlocks = chosen ? (UNLOCKS[sel] || []).map((id) => BY_ID[id]) : [];

  const edges = [];
  for (const id of ids)
    for (const n of NEEDS[id]) {
      if (!idSet.has(n)) continue;
      const a = L.pos[n];
      const b = L.pos[id];
      const r = !sel ? '' : (n === sel || up.has(n)) && (id === sel || up.has(id)) ? 'up' : (n === sel || down.has(n)) && (id === sel || down.has(id)) ? 'down' : 'dim';
      const mx = (a.x + b.x) / 2;
      edges.push({ key: `${n}>${id}`, d: `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`, r, done: passed[n] && passed[id] });
    }

  return (
    <div className="idea-map">
      <header className="timeline-head" data-reveal>
        <span className="eyebrow">Idea map</span>
        <h1>How the ideas connect</h1>
        <p>
          Each dot is a class. A line runs from a class to the ones that build on it, so ideas flow left to right: the far left needs nothing
          at all. Click any dot to light up the path from zero to it and what it opens up next.
        </p>
      </header>

      <div className="map-tools" data-reveal>
        <div className="seg" role="tablist">
          <button type="button" className={scope === 'program' ? 'on' : ''} onClick={() => (setScope('program'), setSel(null))}>
            {PROGRAM.short || PROGRAM.title}
          </button>
          <button type="button" className={scope === 'all' ? 'on' : ''} onClick={() => setScope('all')}>
            Both programs
          </button>
        </div>
        <div className="map-search">
          <input className="search" type="search" placeholder="Find a class…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Find a class on the map" />
          {matches.length > 0 && (
            <ul className="map-matches">
              {matches.map((l) => (
                <li key={l.id}>
                  <button type="button" onClick={() => pick(l.id)}>
                    <span className={`track track-${l.track}`}>{l.code}</span> {short(l)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="map-zoom" aria-label="Zoom">
          <button type="button" className="btn ghost sm" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} aria-label="Zoom out">
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" className="btn ghost sm" onClick={() => setZoom((z) => Math.min(1.5, z + 0.25))} aria-label="Zoom in">
            +
          </button>
        </div>
        <ul className="map-legend">
          <li>
            <i className="lg-done" /> done
          </li>
          <li>
            <i className="lg-ready" /> ready to start
          </li>
          <li>
            <i className="lg-later" /> later
          </li>
        </ul>
      </div>

      <div className={`map-frame ${sel ? 'has-sel' : ''}`} data-reveal>
        <div className="map-lanes" style={{ height: L.height * zoom }}>
          {L.lanes.map((t) => (
            <span key={t.id} className={`map-lane track-${t.id}`} style={{ top: (t.top - 10) * zoom }}>
              {SUBJECTS[t.id] || t.id}
            </span>
          ))}
        </div>
        <div className="map-scroll" ref={scroller}>
          <svg className="map-svg" width={L.width * zoom} height={L.height * zoom} viewBox={`0 0 ${L.width} ${L.height}`} role="img" aria-label="Map of classes and what they build on">
            {L.lanes.map((t, i) => (
              <rect key={t.id} className={`map-band ${i % 2 ? 'odd' : ''}`} x="0" y={t.top - ROW / 2} width={L.width} height={t.rows * ROW} />
            ))}
            <g className="map-edges">
              {edges.map((e) => (
                <path key={e.key} d={e.d} className={`map-edge ${e.r} ${e.done ? 'done' : ''}`} />
              ))}
            </g>
            <g className="map-nodes">
              {ids.map((id) => {
                const l = BY_ID[id];
                const p = L.pos[id];
                const st = passed[id] ? 'done' : ready(id) ? 'ready' : 'later';
                return (
                  <g
                    key={id}
                    className={`map-node track-${l.track} ${st} ${role(id)}`}
                    transform={`translate(${p.x},${p.y})`}
                    onClick={() => pick(id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${l.code}: ${l.title}${passed[id] ? ', done' : ''}`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick(id))}
                  >
                    <title>{`${l.code} · ${l.title}`}</title>
                    <circle className="map-hit" r="20" />
                    <circle className="map-dot" r={id === sel ? 10 : 7} />
                    <text y="22" textAnchor="middle">
                      {l.code}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {chosen ? (
        <section className={`map-panel subj-${chosen.track}`} data-reveal>
          <div className="map-panel-head">
            <div>
              <span className="eyebrow">
                {chosen.code} · {SUBJECTS[chosen.track] || chosen.track} · {whereLabel(chosen)}
                {passed[sel] ? ' · ✓ done' : ''}
              </span>
              <h2>{chosen.title}</h2>
              <p className="notes-hint">{chosen.subtitle}</p>
            </div>
            <div className="map-panel-actions">
              <button type="button" className="btn primary" onClick={() => onOpen(sel)}>
                Open class →
              </button>
              <button type="button" className={`btn ghost sm ${only ? 'on' : ''}`} onClick={() => setOnly(!only)} aria-pressed={only}>
                {only ? 'Show the whole map' : 'Show only this path'}
              </button>
              <button type="button" className="btn ghost sm" onClick={() => (setSel(null), setOnly(false))}>
                Clear
              </button>
            </div>
          </div>
          <div className="map-panel-grid">
            <div>
              <span className="eyebrow">
                Path from zero · {path.length ? `${pathDone} of ${path.length} done` : 'needs nothing before it'}
              </span>
              {path.length > 0 ? (
                <>
                  <div className="meter">
                    <span style={{ width: `${(pathDone / path.length) * 100}%` }} />
                  </div>
                  <ol className="map-path">
                    {path.map((l) => (
                      <li key={l.id} className={passed[l.id] ? 'done' : ''}>
                        <button type="button" onClick={() => setSel(l.id)}>
                          <span className="plan-tick" aria-hidden="true">
                            {passed[l.id] ? '✓' : ''}
                          </span>
                          <span className={`track track-${l.track}`}>{l.code}</span> {short(l)}
                        </button>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <p className="notes-hint">This is a starting point: you can begin here with no background at all.</p>
              )}
            </div>
            <div>
              <span className="eyebrow">Opens up next · {unlocks.length}</span>
              {unlocks.length ? (
                <ul className="map-path">
                  {unlocks.map((l) => (
                    <li key={l.id} className={passed[l.id] ? 'done' : ''}>
                      <button type="button" onClick={() => setSel(l.id)}>
                        <span className={`track track-${l.track}`}>{l.code}</span> {short(l)}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="notes-hint">Nothing builds on this one yet. It is an end point of the map.</p>
              )}
              {down.size > unlocks.length && <p className="notes-hint">{down.size} classes in all build on it, directly or through others.</p>}
            </div>
          </div>
        </section>
      ) : (
        <p className="notes-hint map-tip" data-reveal>
          Tip: the lines between subjects are the interesting ones. They show where, say, a chemistry class needs a math idea first.
        </p>
      )}
    </div>
  );
}
