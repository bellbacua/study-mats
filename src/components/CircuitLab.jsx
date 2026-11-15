import { useEffect, useMemo, useRef, useState } from 'react';
import { Board3D } from '../lab/Board3D.js';
import { PART_INFO, LED_COLORS, si } from '../lab/circuitSim.js';
import { LOGIC_INFO, GATES, runTest } from '../lab/logicSim.js';
import {
  CIRCUIT_EXAMPLES, LOGIC_EXAMPLES, CIRCUIT_CHALLENGES, LOGIC_CHALLENGES, PART_NOTES, LOGIC_NOTES,
  CIRCUIT_HISTORY, LOGIC_HISTORY, CIRCUIT_SOURCES, LOGIC_SOURCES, CIRCUIT_CLASSES, LOGIC_CLASSES,
} from '../data/lab';
import { lessonById } from '../data/path';
import Cited from './Cited';
import '../lab/lab.css';

// Circuit lab: a 3D workbench with two benches.
//  · Circuit playground: batteries, resistors, bulbs, capacitors, LEDs, switches.
//  · Logic sandbox: switches, gates, lamps, a clock and a number display.
// Builds are saved per bench; challenge wins are readings `lab:<id>`.

const MODES = [
  { id: 'circuit', label: 'Circuit playground', hint: 'Batteries, resistors, LEDs' },
  { id: 'logic', label: 'Logic sandbox', hint: 'Gates, adders, memory' },
];
const SAVE_KEY = (m) => `study_mats_lab_${m}`;

// Tiny drawings for the tray, made for this app.
function Icon({ t }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const body = {
    select: <path {...s} d="M6 4l11 7-5 1.5L15 19l-2.2 1-3-6.3L6 17z" />,
    wire: <path {...s} d="M3 17h6V7h7M16 7h5" />,
    erase: <path {...s} d="M5 15l7-8 7 6-5 6H8zM9 19h11" />,
    battery: <><rect {...s} x="3" y="8" width="15" height="8" rx="1.5" /><path {...s} d="M18 10.5h3v3h-3M7 12h3M13.5 10.5v3M12 12h3" /></>,
    resistor: <path {...s} d="M2 12h4l1.5-3 3 6 3-6 3 6 1.5-3h4" />,
    bulb: <><circle {...s} cx="12" cy="10" r="5.5" /><path {...s} d="M9.5 17h5M10 20h4M10 10l2 2 2-2" /></>,
    capacitor: <path {...s} d="M2 12h8M10 6v12M14 6v12M14 12h8" />,
    led: <><path {...s} d="M2 12h6M16 12h6M8 7l8 5-8 5zM16 7v10" /><path {...s} d="M14 4l2-2M17 5l2-2" /></>,
    switch: <><path {...s} d="M2 15h4l10-6M18 15h4" /><circle {...s} cx="6" cy="15" r="1" /><circle {...s} cx="18" cy="15" r="1" /></>,
    input: <><rect {...s} x="3" y="8" width="14" height="8" rx="4" /><circle cx="13" cy="12" r="2.6" fill="currentColor" /><path {...s} d="M17 12h4" /></>,
    clock: <><path {...s} d="M2 15h4V8h5v7h5V8h5" /></>,
    lamp: <><circle {...s} cx="14" cy="12" r="5" /><path {...s} d="M2 12h7M12 10l4 4M16 10l-4 4" /></>,
    display: <><rect {...s} x="4" y="3" width="16" height="18" rx="2" /><path {...s} d="M9 7h6M9 12h6M9 17h6M9 7v10M15 7v10" /></>,
    and: <path {...s} d="M2 8h5M2 16h5M7 5h6a7 7 0 010 14H7zM20 12h2" />,
    nand: <><path {...s} d="M2 8h4M2 16h4M6 5h5a7 7 0 010 14H6z" /><circle {...s} cx="19.5" cy="12" r="1.5" /></>,
    or: <path {...s} d="M2 8h5M2 16h5M5 5c5 0 10 2 14 7-4 5-9 7-14 7 2-4 2-10 0-14zM19 12h3" />,
    nor: <><path {...s} d="M2 8h5M2 16h5M5 5c4 0 8 2 11 7-3 5-7 7-11 7 2-4 2-10 0-14z" /><circle {...s} cx="18.5" cy="12" r="1.5" /></>,
    xor: <path {...s} d="M2 8h6M2 16h6M7 5c5 0 9 2 13 7-4 5-8 7-13 7 2-4 2-10 0-14zM4 5c2 4 2 10 0 14M20 12h2" />,
    not: <><path {...s} d="M2 12h4M6 6l10 6-10 6z" /><circle {...s} cx="18" cy="12" r="1.6" /><path {...s} d="M20 12h2" /></>,
  }[t];
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      {body}
    </svg>
  );
}

const CIRCUIT_TOOLS = ['battery', 'resistor', 'led', 'bulb', 'capacitor', 'switch'];
const LOGIC_TOOLS = ['input', 'lamp', 'and', 'or', 'not', 'nand', 'nor', 'xor', 'clock', 'display'];
const toolLabel = (mode, t) => ({ select: 'Pick', wire: 'Wire', erase: 'Erase' }[t] || (mode === 'circuit' ? PART_INFO[t]?.label : LOGIC_INFO[t]?.label) || t);
const toolHint = (mode, t) =>
  ({
    select: 'Click a part to see it, drag to move it, click a switch to flip it',
    wire: 'Drag from point to point to draw a wire',
    erase: 'Click or drag over parts to remove them',
  })[t] || (mode === 'circuit' ? 'Drag between two points on the board (or just click)' : LOGIC_INFO[t]?.hint);

function loadSaved(mode, items) {
  const fromDb = items?.lab?.[mode]?.json;
  let raw = fromDb;
  if (!raw) {
    try {
      raw = localStorage.getItem(SAVE_KEY(mode));
    } catch {
      raw = null;
    }
  }
  if (raw) {
    try {
      const m = JSON.parse(raw);
      if (Array.isArray(m?.parts)) return m;
    } catch {
      // fall through to the first example
    }
  }
  return { parts: (mode === 'circuit' ? CIRCUIT_EXAMPLES : LOGIC_EXAMPLES)[0].parts };
}

export default function CircuitLab({ progress, onOpen, onMark, setItem, startMode }) {
  const [mode, setMode] = useState(startMode === 'logic' ? 'logic' : 'circuit');
  const [tool, setTool] = useState('select');
  const [sel, setSel] = useState(null);
  const [frame, setFrame] = useState(null);
  const [opts, setOpts] = useState({ voltage: true, electrons: false, labels: true, speed: 1, slow: false, clock: 1 });
  const [toast, setToast] = useState(null);
  const [clash, setClash] = useState(false);
  const [active, setActive] = useState(null); // logic challenge being checked
  const [result, setResult] = useState(null);
  const [count, setCount] = useState(0);
  const host = useRef(null);
  const board = useRef(null);
  const mem = useRef({});
  const lastT = useRef(0);
  const saveT = useRef(0);
  // Challenges count only once the learner has changed the board themselves,
  // so a saved or freshly loaded example never wins one by itself.
  const touched = useRef(false);
  const solvedRef = useRef(progress.readings);
  solvedRef.current = progress.readings;
  const markRef = useRef(onMark);
  markRef.current = onMark;

  const say = (text, tone = '') => {
    setToast({ text, tone, n: Date.now() });
  };
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), toast.tone === 'win' ? 5200 : 4200);
    return () => clearTimeout(t);
  }, [toast]);

  const win = (c, before = '') => {
    const id = `lab:${c.id}`;
    if (solvedRef.current[id]) return false;
    solvedRef.current = { ...solvedRef.current, [id]: true };
    markRef.current?.(id);
    say(before ? `${before} ✓ Challenge done: ${c.title}.` : `✓ Challenge done: ${c.title}`, 'win');
    return true;
  };

  // one board per bench
  useEffect(() => {
    const b = new Board3D(host.current, mode, {
      onChange: (m) => {
        touched.current = true;
        setCount(m.parts.length);
        clearTimeout(saveT.current);
        saveT.current = setTimeout(() => {
          const json = JSON.stringify(m);
          try {
            localStorage.setItem(SAVE_KEY(mode), json);
          } catch {
            // the database copy is the main one
          }
          setItem?.('lab', mode, { json });
        }, 700);
        setResult(null);
      },
      onSelect: setSel,
      onTool: setTool,
      onNote: (t) => say(t),
      onLogic: ({ clash: c }) => setClash(c),
      onEvent: (e) => {
        if (e.kind === 'burn') {
          const text = `Pop! The LED burnt out at ${si(e.amps, 'A')}. LEDs are made for about 20 mA. Add a resistor in its loop, then pick the LED and press Replace.`;
          const c = CIRCUIT_CHALLENGES.find((x) => x.event === 'burn');
          if (!c || !win(c, text)) say(text, 'bad');
        }
      },
      onFrame: (res, model) => {
        setFrame(res);
        const dt = Math.max(0, res.time - lastT.current);
        lastT.current = res.time;
        if (!touched.current) return;
        for (const c of CIRCUIT_CHALLENGES) {
          if (solvedRef.current[`lab:${c.id}`] || c.event) continue;
          const ok = c.check ? c.check(res, model) : c.track(res, model, (mem.current[c.id] ||= {}), dt);
          if (ok) win(c);
        }
      },
    });
    board.current = b;
    const m = loadSaved(mode, progress.items);
    b.setModel(m);
    setCount(m.parts.length);
    b.setTool('select');
    setTool('select');
    b.setOpts(opts);
    setSel(null);
    setFrame(null);
    setResult(null);
    setActive(null);
    mem.current = {};
    lastT.current = 0;
    touched.current = false;
    return () => {
      clearTimeout(saveT.current);
      b.destroy();
      board.current = null;
    };
    // the board is rebuilt only when the bench changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => board.current?.setTool(tool), [tool]);
  useEffect(() => board.current?.setOpts(opts), [opts]);

  // keyboard: tools by letter or number, when the page (not a text box) has focus
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]') || e.ctrlKey || e.metaKey || e.altKey) return;
      const list = mode === 'circuit' ? CIRCUIT_TOOLS : LOGIC_TOOLS;
      const k = e.key.toLowerCase();
      if (k === 'v') setTool('select');
      else if (k === 'w') setTool('wire');
      else if (k === 'e') setTool('erase');
      else if (/^[1-9]$/.test(k) && list[+k - 1]) setTool(list[+k - 1]);
      else if (k === '0' && list[9]) setTool(list[9]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  const examples = mode === 'circuit' ? CIRCUIT_EXAMPLES : LOGIC_EXAMPLES;
  const challenges = mode === 'circuit' ? CIRCUIT_CHALLENGES : LOGIC_CHALLENGES;
  const tools = mode === 'circuit' ? CIRCUIT_TOOLS : LOGIC_TOOLS;
  const solved = challenges.filter((c) => progress.readings[`lab:${c.id}`]).length;
  const live = sel && frame?.parts?.[sel.id];

  const load = (ex) => {
    board.current?.commit((m) => {
      m.parts = JSON.parse(JSON.stringify(ex.parts));
    });
    board.current?.select(null);
    board.current?.resetView();
    touched.current = false;
    mem.current = {};
    say(`Loaded “${ex.title}”. Ctrl+Z puts your own build back.`);
  };

  const check = (c) => {
    setActive(c.id);
    const model = board.current?.model || { parts: [] };
    const parts = model.parts.filter((p) => p.type !== 'wire');
    const wires = model.parts.filter((p) => p.type === 'wire');
    const banned = c.allow ? [...new Set(parts.filter((p) => GATES[p.type] && !c.allow.includes(p.type)).map((p) => GATES[p.type].label))] : [];
    if (banned.length) {
      setResult({ id: c.id, ok: false, note: `This one is ${c.allow.map((a) => GATES[a].label).join(', ')} only. Remove: ${banned.join(', ')}.` });
      return;
    }
    const r = runTest({ parts, wires }, c.steps);
    setResult({ id: c.id, ...r });
    if (r.ok) win(c);
  };

  const classes = useMemo(() => (mode === 'circuit' ? CIRCUIT_CLASSES : LOGIC_CLASSES).map(lessonById).filter(Boolean), [mode]);

  return (
    <div className="lab-page">
      <header className="lab-head">
        <h1>Circuit lab</h1>
        <p>Build real circuits on a 3D workbench and watch them run. Nothing can break for real, so try things.</p>
        <div className="lab-modes" role="tablist" aria-label="Bench">
          {MODES.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? 'on' : ''} onClick={() => setMode(m.id)}>
              <strong>{m.label}</strong>
              <span>{m.hint}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="lab-shell">
        <nav className="lab-tray" aria-label="Parts">
          {['select', 'wire', 'erase'].map((t) => (
            <button key={t} type="button" className={`lab-tool ${tool === t ? 'on' : ''}`} onClick={() => setTool(t)} title={`${toolHint(mode, t)} (${t === 'select' ? 'V' : t[0].toUpperCase()})`}>
              <Icon t={t} />
              <span>{toolLabel(mode, t)}</span>
            </button>
          ))}
          <hr />
          {tools.map((t, i) => (
            <button key={t} type="button" className={`lab-tool ${tool === t ? 'on' : ''}`} onClick={() => setTool(t)} title={`${toolHint(mode, t)} (${(i + 1) % 10})`}>
              <Icon t={t} />
              <span>{toolLabel(mode, t)}</span>
            </button>
          ))}
        </nav>

        <div className="lab-main">
          <div className="lab-bar">
            <button type="button" className="btn ghost sm" onClick={() => board.current?.undo()} title="Undo (Ctrl+Z)">↶ Undo</button>
            <button type="button" className="btn ghost sm" onClick={() => board.current?.redo()} title="Redo (Ctrl+Y)">↷ Redo</button>
            <button type="button" className="btn ghost sm" onClick={() => board.current?.resetView()}>Reset view</button>
            <button type="button" className="btn ghost sm" onClick={() => board.current?.clear()} disabled={!count}>Clear board</button>
            <span className="lab-gap" />
            {mode === 'circuit' ? (
              <>
                <label className="lab-check"><input type="checkbox" checked={opts.voltage} onChange={(e) => setOpts((o) => ({ ...o, voltage: e.target.checked }))} /> Voltage colours</label>
                <label className="lab-check"><input type="checkbox" checked={opts.electrons} onChange={(e) => setOpts((o) => ({ ...o, electrons: e.target.checked }))} /> Show electrons</label>
                <label className="lab-check">
                  Time
                  <select value={opts.speed} onChange={(e) => setOpts((o) => ({ ...o, speed: +e.target.value }))}>
                    <option value={0.25}>¼×</option>
                    <option value={1}>1×</option>
                    <option value={4}>4×</option>
                  </select>
                </label>
              </>
            ) : (
              <>
                <label className="lab-check"><input type="checkbox" checked={opts.slow} onChange={(e) => setOpts((o) => ({ ...o, slow: e.target.checked }))} /> Slow motion</label>
                <label className="lab-check">
                  Clock
                  <select value={opts.clock} onChange={(e) => setOpts((o) => ({ ...o, clock: +e.target.value }))}>
                    <option value={0.5}>slow</option>
                    <option value={1}>1 tick/s</option>
                    <option value={3}>fast</option>
                  </select>
                </label>
              </>
            )}
            <label className="lab-check"><input type="checkbox" checked={opts.labels} onChange={(e) => setOpts((o) => ({ ...o, labels: e.target.checked }))} /> Labels</label>
          </div>

          <div className="lab-stage">
            <div className="lab-host" ref={host} />
            <div className="lab-hint">{toolHint(mode, tool)} · right-drag or two fingers to turn · scroll to zoom</div>
            {mode === 'circuit' && opts.voltage && (
              <div className="lab-legend" aria-label="Wire colour shows voltage">
                <span>0 V</span>
                <i />
                <span>battery V</span>
              </div>
            )}
            {mode === 'logic' && (
              <div className="lab-legend logic">
                <b className="one" /> 1 <b className="zero" /> 0 {clash && <><b className="clash" /> clash</>}
              </div>
            )}
            {frame?.warnings?.some((w) => w.kind === 'short') && <div className="lab-alert">Short circuit! A wire goes straight across a battery, so huge current flows. Real wires would get hot.</div>}
            {toast && (
              <div key={toast.n} className={`lab-toast ${toast.tone}`} role="status">
                {toast.text}
              </div>
            )}
            {!count && <div className="lab-empty">Empty board. Load an example below, or pick a part on the left and drag between two points.</div>}
          </div>
        </div>

        <aside className="lab-side">
          {sel ? (
            <Inspector mode={mode} part={sel} live={live} board={board} logicChallenge={challenges.find((c) => c.id === active)} />
          ) : (
            <div className="lab-card">
              <span className="eyebrow">How to use it</span>
              {mode === 'circuit' ? (
                <ol className="lab-steps">
                  <li>Pick a part on the left, then drag between two points on the board.</li>
                  <li>Join everything into a loop with wires. Current only flows round a closed loop.</li>
                  <li>The moving beads are current; wire colour is voltage. Pick any part to measure it.</li>
                </ol>
              ) : (
                <ol className="lab-steps">
                  <li>Place switches and lamps, then gates. A gate’s output is the point you click; its inputs sit two steps to the left.</li>
                  <li>Wire outputs to inputs. Glowing wires carry a 1.</li>
                  <li>Click switches to try every combination, or let a challenge check it for you.</li>
                </ol>
              )}
              <p className="lab-small">Keys: V pick, W wire, E erase, 1–{tools.length % 10 || 10} parts, R flip, Delete, Ctrl+Z.</p>
            </div>
          )}
          {mode === 'circuit' && frame && (
            <div className="lab-card lab-meter">
              <span className="eyebrow">Meter</span>
              <div><span>Battery current</span><b>{si(frame.batteryAmps || 0, 'A')}</b></div>
              <div><span>Time</span><b>{frame.time.toFixed(1)} s</b></div>
            </div>
          )}
        </aside>
      </div>

      <section className="lab-section">
        <h2>Examples</h2>
        <div className="lab-grid">
          {examples.map((ex) => (
            <button key={ex.id} type="button" className="lab-ex" onClick={() => load(ex)}>
              <strong>{ex.title}</strong>
              <span>{ex.blurb}</span>
              <em>Load onto the board</em>
            </button>
          ))}
        </div>
      </section>

      <section className="lab-section">
        <h2>
          Challenges <small>{solved} of {challenges.length} done</small>
        </h2>
        {mode === 'circuit' && <p className="lab-small">These check themselves while you build.</p>}
        <div className="lab-grid">
          {challenges.map((c) => {
            const done = progress.readings[`lab:${c.id}`];
            const r = result?.id === c.id ? result : null;
            return (
              <div key={c.id} className={`lab-ch ${done ? 'done' : ''} ${active === c.id ? 'active' : ''}`}>
                <div className="lab-ch-top">
                  <strong>{c.title}</strong>
                  {done && <span className="lab-done">✓ Done</span>}
                </div>
                <p>{c.goal}</p>
                <details>
                  <summary>Hint</summary>
                  <p>{c.hint}</p>
                </details>
                {mode === 'logic' && (
                  <button type="button" className="btn primary sm" onClick={() => check(c)}>
                    Check my circuit
                  </button>
                )}
                {r && <TestResult r={r} />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="lab-section lab-history">
        <h2>Where this comes from</h2>
        {(mode === 'circuit' ? CIRCUIT_HISTORY : LOGIC_HISTORY).map((t, i) => (
          <p key={i}>
            <Cited text={t} gloss={false} />
          </p>
        ))}
        <ol className="lab-sources">
          {(mode === 'circuit' ? CIRCUIT_SOURCES : LOGIC_SOURCES).map((s, i) => (
            <li key={s.u} id={`src-${i + 1}`}>
              <a href={s.u} target="_blank" rel="noreferrer">{s.t}</a>
            </li>
          ))}
        </ol>
        {classes.length > 0 && (
          <div className="lab-classes">
            <span className="eyebrow">Goes with these classes</span>
            <div className="chips">
              {classes.map((l) => (
                <button key={l.id} type="button" className="chip" onClick={() => onOpen(l.id)}>
                  {progress.passed[l.id] ? '✓ ' : ''}
                  {l.code} · {l.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function TestResult({ r }) {
  if (r.note) return <p className="lab-res bad">{r.note}</p>;
  if (r.missing) return <p className="lab-res bad">Still needed: {r.missing.join(', ')}. Pick a switch or lamp to rename it.</p>;
  const ins = Object.keys(r.rows[0].inputs);
  const outs = Object.keys(r.rows[0].expect);
  return (
    <div className={`lab-res ${r.ok ? 'good' : 'bad'}`}>
      <p>{r.ok ? 'Every row matches. Well built.' : 'Some rows are wrong (red). Click the switches to see why.'}</p>
      <table>
        <thead>
          <tr>
            {ins.map((k) => <th key={k}>{k}</th>)}
            {outs.map((k) => <th key={k}>{k} wanted / got</th>)}
          </tr>
        </thead>
        <tbody>
          {r.rows.map((row, i) => (
            <tr key={i} className={row.ok ? '' : 'miss'}>
              {ins.map((k) => <td key={k}>{row.inputs[k]}</td>)}
              {outs.map((k) => <td key={k}>{row.expect[k]} / {row.got[k]}{!row.calm ? ' (flickers)' : ''}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Inspector({ mode, part, live, board, logicChallenge }) {
  const b = board.current;
  const up = (patch) => b?.updatePart(part.id, patch);
  if (mode === 'logic') {
    const info = LOGIC_INFO[part.type] || { label: 'Wire' };
    const note = LOGIC_NOTES[part.type] || (GATES[part.type] ? GATES[part.type].rule : '');
    const names = logicChallenge
      ? [...new Set(logicChallenge.steps.flatMap((s) => Object.keys(part.type === 'input' ? s.inputs : s.expect)))]
      : [];
    return (
      <div className="lab-card">
        <span className="eyebrow">Picked</span>
        <h3>{part.type === 'wire' ? 'Wire' : info.label}</h3>
        <p className="lab-note">{note}</p>
        {GATES[part.type] && <GateTable type={part.type} />}
        {(part.type === 'input' || part.type === 'lamp') && (
          <label className="lab-field">
            Name
            <input value={part.label || ''} maxLength={5} onChange={(e) => up({ label: e.target.value.toUpperCase() })} />
          </label>
        )}
        {names.length > 0 && (
          <div className="lab-names">
            {names.map((nm) => (
              <button key={nm} type="button" className="chip" onClick={() => up({ label: nm })}>{nm}</button>
            ))}
          </div>
        )}
        {part.type === 'input' && (
          <button type="button" className="btn ghost sm" onClick={() => up({ on: !part.on })}>Turn {part.on ? 'off (0)' : 'on (1)'}</button>
        )}
        <div className="lab-actions">
          <button type="button" className="btn ghost sm" onClick={() => b?.removePart(part.id)}>Delete</button>
        </div>
      </div>
    );
  }
  const info = PART_INFO[part.type];
  return (
    <div className="lab-card">
      <span className="eyebrow">Picked</span>
      <h3>{info.label}</h3>
      <p className="lab-note"><Cited text={PART_NOTES[part.type]} gloss={false} /></p>
      {info.choices && (
        <label className="lab-field">
          {part.type === 'battery' ? 'Voltage' : part.type === 'capacitor' ? 'Capacitance' : 'Resistance'}
          <select value={part.value} onChange={(e) => up({ value: +e.target.value })}>
            {info.choices.map((v) => (
              <option key={v} value={v}>{part.type === 'capacitor' ? (v >= 1000 ? `${v / 1000} mF` : `${v} µF`) : si(v, info.unit, 3)}</option>
            ))}
          </select>
        </label>
      )}
      {part.type === 'led' && (
        <label className="lab-field">
          Colour
          <select value={part.color} onChange={(e) => up({ color: e.target.value })}>
            {Object.entries(LED_COLORS).map(([k, c]) => <option key={k} value={k}>{c.label} (needs {c.vf} V)</option>)}
          </select>
        </label>
      )}
      {part.type === 'switch' && <button type="button" className="btn ghost sm" onClick={() => up({ on: !part.on })}>{part.on ? 'Open it (break the loop)' : 'Close it (complete the loop)'}</button>}
      {part.broken && <button type="button" className="btn primary sm" onClick={() => up({ broken: false })}>Replace LED</button>}
      {live && (
        <div className="lab-read">
          <div><span>Voltage across</span><b>{si(Math.abs(live.v), 'V')}</b></div>
          <div><span>Current through</span><b>{si(Math.abs(live.i), 'A')}</b></div>
          {part.type !== 'wire' && <div><span>Power</span><b>{si(live.power, 'W')}</b></div>}
          {part.type === 'resistor' && live.power > 0.25 && <p className="lab-warn">Over ¼ W: a real one this size would scorch.</p>}
          {part.type === 'resistor' && <p className="lab-small">Check Ohm’s law: {si(Math.abs(live.v), 'V')} ÷ {si(part.value, 'Ω')} = {si(Math.abs(live.v) / part.value, 'A')}</p>}
        </div>
      )}
      <div className="lab-actions">
        {part.type !== 'wire' && <button type="button" className="btn ghost sm" onClick={() => b?.flipPart(part.id)} title="R">Flip ends</button>}
        <button type="button" className="btn ghost sm" onClick={() => b?.removePart(part.id)}>Delete</button>
      </div>
    </div>
  );
}

function GateTable({ type }) {
  const g = GATES[type];
  const rows = g.ins === 1 ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
  return (
    <table className="lab-tt">
      <thead>
        <tr>
          {rows[0].map((_, k) => <th key={k}>in {k + 1}</th>)}
          <th>out</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.join('')}>
            {r.map((v, k) => <td key={k}>{v}</td>)}
            <td className={g.f(...r) ? 'one' : ''}>{g.f(...r)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
