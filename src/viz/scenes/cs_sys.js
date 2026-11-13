// Computer Science program: Automata, Operating Systems, Networks, Databases and
// Security (cs-141, cs-142, cs-151 to cs-156). Story scenes: hidden params
// drive the reveals, and touching any control switches to the `free` values.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono' };

// ---------------------------------------------------------------------------
// cs-141: a three-state machine that tests divisibility by 3
// ---------------------------------------------------------------------------
const INPUTS = { 110: 6, 111: 7, 1001: 9, 10101: 21 };
function dfa(inp, k) {
  let s = 0;
  const n = Math.min(k, inp.length);
  for (let i = 0; i < n; i++) s = (2 * s + Number(inp[i])) % 3;
  return { s, n, done: n === inp.length };
}
export const dfa_machine = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Feed in 21, which is 10101 in binary. Read every bit: does the machine accept it?',
  goal: (t) => t.inp === '10101' && R(t.k) >= 5,
  params: [
    { key: 'inp', label: 'Input', type: 'choice', value: '110', options: Object.entries(INPUTS).map(([b, v]) => ({ value: b, label: `${b} (= ${v})` })) },
    { key: 'k', label: 'Bits read', min: 0, max: 5, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A machine with three states, 0, 1 and 2. The state is the remainder, so far, when the number read is divided by 3. It starts in state 0.', set: { inp: '110', k: 0 }, ms: 11500 },
    { say: 'It reads 110, which is 6, one bit at a time. Reading a bit doubles the number and adds the bit, so the new remainder is (2 × old + bit) mod 3. The first 1 takes it to state 1.', set: { k: 1 }, ms: 12500, notes: [{ text: '(2·0 + 1) mod 3 = 1', at: [3.6, 3.7], to: [0.6, 2.6], color: C.gold }] },
    { say: 'Then 1 takes it back to 0, and 0 keeps it at 0. It ends in state 0, the accepting state: 6 is divisible by 3.', set: { k: 3 }, ms: 11000 },
    { say: 'Now 111, which is 7. It ends in state 1: remainder 1, rejected. The machine never stored the number, only which of three states it was in.', set: { inp: '111', k: 3 }, ms: 12000, notes: [{ text: 'ends in state 1', at: [3.4, 3.7], to: [0.5, 2.7], color: C.red }] },
    { say: '1001 is 9: accepted. Three states are enough for numbers of any length, a million bits or more.', set: { inp: '1001', k: 4 }, ms: 10500 },
  ],
  readout: (t) => {
    const r = dfa(t.inp, R(t.k));
    return [
      ['Read', t.inp.slice(0, r.n) || '—'],
      ['State', `${r.s}`],
      ['Verdict', r.done ? (r.s === 0 ? 'accept' : 'reject') : 'reading…'],
    ];
  },
  setup(kit) {
    const P = [[-4, -0.3], [0, 2.3], [4, -0.3]];
    const edge = (a, b, bit, bend) => {
      const [x0, y0] = P[a];
      const [x1, y1] = P[b];
      const L = Math.hypot(x1 - x0, y1 - y0);
      const d = [(x1 - x0) / L, (y1 - y0) / L];
      const n = [-d[1] * bend, d[0] * bend];
      kit.arrow([x0 + d[0] * 0.8 + n[0], y0 + d[1] * 0.8 + n[1]], [x1 - d[0] * 0.8 + n[0], y1 - d[1] * 0.8 + n[1]], { color: C.grey });
      kit.label(bit, [(x0 + x1) / 2 + n[0] * 2.4, (y0 + y1) / 2 + n[1] * 2.4], { ...mono, size: 16, color: C.grey });
    };
    edge(0, 1, '1', 0.25);
    edge(1, 0, '1', 0.25);
    edge(1, 2, '0', 0.25);
    edge(2, 1, '0', 0.25);
    kit.label('0 ↺', [-5.6, -0.3], { ...mono, size: 16, color: C.grey });
    kit.label('↻ 1', [5.6, -0.3], { ...mono, size: 16, color: C.grey });
    kit.dot(P[0], { r: 0.78, color: C.green, opacity: 0.35 });
    const st = P.map((p) => kit.dot(p, { r: 0.62, color: C.blue }));
    P.forEach((p, i) => kit.label(`${i}`, p, { ...mono, size: 24, color: '#0b1220' }));
    kit.label('accepting', [-4, -1.5], { tex: false, size: 13, color: C.green });
    kit.label('start →', [-6.0, 0.6], { tex: false, size: 13, color: C.grey });
    const tape = Array.from({ length: 5 }, (_, i) => ({
      box: kit.rect(-2.2 + i * 0.9, -3.6, 0.8, 0.8, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1.5 }),
      lab: kit.label('', [-1.8 + i * 0.9, -3.2], { ...mono, size: 20 }),
    }));
    const head = kit.arrow([0, -2.0], [0, -2.6], { color: C.gold });
    const verdict = kit.label('', [4.6, -3.2], { tex: false, size: 18 });
    return (t) => {
      const r = dfa(t.inp, R(t.k));
      st.forEach((d, i) => d.color(i === r.s ? C.gold : C.blue));
      tape.forEach((c, i) => {
        const on = i < t.inp.length;
        c.box.visible(on);
        c.lab.visible(on);
        if (!on) return;
        c.lab.set(t.inp[i]).color(i < r.n ? C.grey : C.text);
        c.box.color(i === r.n - 1 ? 0x4a3b16 : 0x1a2433);
      });
      head.visible(r.n > 0);
      if (r.n > 0) head.set([-1.8 + (r.n - 1) * 0.9, -2.0], [-1.8 + (r.n - 1) * 0.9, -2.7]);
      verdict.visible(r.done);
      verdict.set(r.s === 0 ? `accept: ${INPUTS[t.inp]} = 3 × ${INPUTS[t.inp] / 3}` : `reject: remainder ${r.s}`).color(r.s === 0 ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-142: two parse trees for 2 + 3 × 4
// ---------------------------------------------------------------------------
const TREES = {
  prec: {
    label: 'with precedence (× deeper)',
    rules: ['E ::= E + T | T', 'T ::= T × F | F', 'F ::= number'],
    nodes: [['+', [0, 2.2]], ['2', [-2.6, 0.2]], ['×', [2.6, 0.2]], ['3', [1.0, -1.8]], ['4', [4.2, -1.8]]],
    edges: [[0, 1], [0, 2], [2, 3], [2, 4]],
    inner: 2,
    vals: ['= 14', '= 12'],
    answer: 14,
  },
  left: {
    label: 'strictly left to right',
    rules: ['E ::= E op number | number', 'op ::= + | ×'],
    nodes: [['×', [0, 2.2]], ['+', [-2.6, 0.2]], ['4', [2.6, 0.2]], ['2', [-4.2, -1.8]], ['3', [-1.0, -1.8]]],
    edges: [[0, 1], [0, 2], [1, 3], [1, 4]],
    inner: 1,
    vals: ['= 20', '= 5'],
    answer: 20,
  },
};
export const parse_tree = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Which grammar gives the tree that matches what a calculator says? Build it to the end.',
  goal: (t) => t.mode === 'prec' && R(t.k) >= 3,
  params: [
    { key: 'mode', label: 'Grammar', type: 'choice', value: 'prec', options: Object.entries(TREES).map(([value, g]) => ({ value, label: g.label })) },
    { key: 'k', label: 'Build steps', min: 0, max: 3, step: 1, value: 0 },
  ],
  beats: [
    { say: 'The text 2 + 3 × 4 is just a row of symbols. A parser turns it into a tree, using the grammar’s rules.', set: { mode: 'prec', k: 0 }, ms: 10500 },
    { say: 'The grammar says an expression is terms joined by plus, and a term is numbers joined by times. So 3 × 4 is grouped first, as a term.', set: { k: 1 }, ms: 12000, notes: [{ text: 'built first: deeper', at: [5.4, 2.6], to: [3.0, 0.6], color: C.gold }] },
    { say: 'Then 2 + that term becomes the whole expression, at the root.', set: { k: 2 }, ms: 9500 },
    { say: 'To get the value, work from the leaves up: 3 × 4 = 12, then 2 + 12 = 14. The tree, not the order of the text, decides the meaning.', set: { k: 3 }, ms: 12000 },
    { say: 'A grammar that just reads left to right builds a different tree: (2 + 3) × 4 = 20. Same text, different tree, different answer. That is why grammars are written so carefully.', set: { mode: 'left', k: 3 }, ms: 13000, notes: [{ text: 'a different tree', at: [-5.6, 3.6], to: [-2.9, 0.6], color: C.red }] },
  ],
  readout: (t) => [
    ['Grammar', TREES[t.mode].label],
    ['Value', R(t.k) >= 3 ? `${TREES[t.mode].answer}` : '—'],
  ],
  setup(kit) {
    kit.label('2 + 3 × 4', [0, 3.8], { ...mono, size: 22 });
    const edges = Array.from({ length: 4 }, () => kit.line([[0, 0], [1, 1]], { color: C.grey, width: 2 }));
    const dots = Array.from({ length: 5 }, () => kit.dot([0, 0], { r: 0.42, color: C.blue }));
    const labs = Array.from({ length: 5 }, () => kit.label('', [0, 0], { ...mono, size: 20, color: '#0b1220' }));
    const vals = [kit.label('', [0, 0], { ...mono, size: 18, color: C.green }), kit.label('', [0, 0], { ...mono, size: 18, color: C.green })];
    const rules = [0, 1, 2].map((i) => kit.label('', [-7.6, -2.8 - i * 0.5], { ...mono, size: 14, color: C.grey, align: 'left' }));
    return (t) => {
      const g = TREES[t.mode];
      const k = R(t.k);
      const shown = (i) => (i === 0 ? k >= 2 : i === g.inner ? k >= 1 : true);
      g.nodes.forEach(([s, p], i) => {
        dots[i].set(p).visible(shown(i));
        dots[i].color(s === '+' || s === '×' ? C.gold : C.blue);
        labs[i].set(s).pos(p).visible(shown(i));
      });
      g.edges.forEach(([a, b], i) => {
        edges[i].set([g.nodes[a][1], g.nodes[b][1]]);
        edges[i].visible(shown(a) && shown(b));
      });
      const [root, inner] = [g.nodes[0][1], g.nodes[g.inner][1]];
      vals[0].set(g.vals[0]).pos([root[0] + 1.3, root[1]]).visible(k >= 3);
      vals[1].set(g.vals[1]).pos([inner[0] + (inner[0] > 0 ? 1.3 : -1.3), inner[1] + 0.2]).visible(k >= 3);
      rules.forEach((l, i) => l.set(g.rules[i] || '').visible(!!g.rules[i]));
    };
  },
};

// ---------------------------------------------------------------------------
// cs-151: three jobs under three scheduling rules
// ---------------------------------------------------------------------------
const JOBS = { A: 8, B: 2, C: 3 };
const JOBCOL = { A: C.blue, B: C.gold, C: C.green };
const SCHED = {
  fcfs: { label: 'First come, first served', segs: [['A', 0, 8], ['B', 8, 10], ['C', 10, 13]] },
  sjf: { label: 'Shortest job first', segs: [['B', 0, 2], ['C', 2, 5], ['A', 5, 13]] },
  rr: { label: 'Round robin (turns of 2)', segs: [['A', 0, 2], ['B', 2, 4], ['C', 4, 6], ['A', 6, 8], ['C', 8, 9], ['A', 9, 11], ['A', 11, 13]] },
};
function finishes(rule) {
  const f = {};
  SCHED[rule].segs.forEach(([j, , b]) => { f[j] = b; });
  return f;
}
export const cpu_scheduler = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Find the rule with the smallest average waiting time. Run it to the end (13 ms).',
  goal: (t) => t.rule === 'sjf' && t.t >= 13,
  params: [
    { key: 'rule', label: 'Rule', type: 'choice', value: 'fcfs', options: Object.entries(SCHED).map(([value, s]) => ({ value, label: s.label })) },
    { key: 't', label: 'Time (ms)', min: 0, max: 13, step: 0.5, value: 0 },
  ],
  beats: [
    { say: 'Three jobs arrive at the same moment: A needs 8 milliseconds of processor time, B needs 2, C needs 3. One processor. Who goes first?', set: { rule: 'fcfs', t: 0 }, ms: 11500 },
    { say: 'First come, first served: A, then B, then C. B waits 8 ms for a 2 ms job; C waits 10. Average wait: 6 ms.', set: { t: 13 }, ms: 12000, notes: [{ text: 'B waits behind A', at: [3.4, 3.6], to: [1.5, 1.4], color: C.red }] },
    { say: 'Shortest job first: B, C, then A. Waits are 0, 2 and 5: average 2.3 ms. Putting short jobs first always gives the smallest average when all arrive together.', set: { rule: 'sjf', t: 13 }, ms: 13000 },
    { say: 'Round robin gives each job a turn of 2 ms, cycling. Average wait 4.3 ms, but every job starts within 4 ms. Desktops do this so the screen keeps responding.', set: { rule: 'rr', t: 13 }, ms: 13000 },
    { say: 'Real schedulers mix these ideas, switching hundreds of times a second. That is how one core seems to run many programs at once.', set: { t: 6 }, ms: 10000 },
  ],
  readout: (t) => {
    const f = finishes(t.rule);
    const done = Object.keys(JOBS).filter((j) => f[j] <= t.t + 1e-9);
    const avg = Object.keys(JOBS).reduce((s, j) => s + f[j] - JOBS[j], 0) / 3;
    return [
      ['Finished', done.join(', ') || '—'],
      ['Average wait', done.length === 3 ? `${avg.toFixed(1)} ms` : '—'],
    ];
  },
  setup(kit) {
    const X = (ms) => -6.5 + ms * (13 / 13);
    for (let ms = 0; ms <= 13; ms++) {
      kit.line([[X(ms), 0.2], [X(ms), 0.0]], { color: C.grid, width: 1 });
      if (ms % 2 === 1 || ms === 0) kit.label(`${ms}`, [X(ms), -0.25], { ...mono, size: 12, color: C.grey });
    }
    kit.line([[X(0), 0.2], [X(13), 0.2]], { color: C.axis, width: 1.5 });
    kit.label('time (ms) →', [X(13) + 0.2, -0.25], { tex: false, size: 12, color: C.grey, align: 'left' });
    const segs = Array.from({ length: 7 }, () => kit.rect(0, 0.3, 1, 1.2, { color: C.blue, opacity: 0.75, strokeColor: C.grid, width: 1 }));
    const segL = Array.from({ length: 7 }, () => kit.label('', [0, 0.9], { ...mono, size: 18, color: '#0b1220' }));
    const cursor = kit.line([[0, 0.2], [0, 1.8]], { color: C.white, width: 2 });
    const title = kit.label('', [0, 3.4], { tex: false, size: 20 });
    const rows = Object.keys(JOBS).map((j, i) => ({
      j,
      name: kit.label(`${j} (${JOBS[j]} ms)`, [-6.0, -1.4 - i * 0.75], { ...mono, size: 16, color: JOBCOL[j], align: 'left' }),
      info: kit.label('', [-2.6, -1.4 - i * 0.75], { tex: false, size: 15, align: 'left' }),
    }));
    return (t) => {
      const s = SCHED[t.rule];
      title.set(s.label);
      segs.forEach((r, i) => {
        const seg = s.segs[i];
        const on = !!seg && seg[1] < t.t;
        r.visible(on);
        segL[i].visible(on);
        if (!on) return;
        const end = Math.min(seg[2], t.t);
        r.set(X(seg[1]), 0.3, X(end) - X(seg[1]), 1.2);
        r.color(JOBCOL[seg[0]]);
        segL[i].set(end - seg[1] >= 0.8 ? seg[0] : '').pos([(X(seg[1]) + X(end)) / 2, 0.9]);
      });
      cursor.set([[X(t.t), 0.2], [X(t.t), 1.8]]);
      const f = finishes(t.rule);
      rows.forEach((r) => {
        const fin = f[r.j];
        r.info.set(fin <= t.t + 1e-9 ? `finished at ${fin} ms, waited ${fin - JOBS[r.j]} ms` : 'not finished').color(fin <= t.t + 1e-9 ? C.text : C.grey);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// cs-152: the dining philosophers
// ---------------------------------------------------------------------------
export function dine(rule, ticks) {
  const holder = [null, null, null, null, null];
  const ph = Array.from({ length: 5 }, () => ({ rest: 0, meals: 0, eating: false }));
  const order = (i) => {
    const l = i;
    const r = (i + 1) % 5;
    return rule === 'left' ? [l, r] : [Math.min(l, r), Math.max(l, r)];
  };
  for (let s = 0; s < ticks; s++) {
    for (let i = 0; i < 5; i++) {
      const p = ph[i];
      const [f1, f2] = order(i);
      if (p.eating) {
        p.meals += 1;
        p.eating = false;
        holder[f1] = null;
        holder[f2] = null;
        p.rest = 1;
      } else if (p.rest > 0) {
        p.rest -= 1;
      } else if (holder[f1] !== i) {
        if (holder[f1] === null) holder[f1] = i;
      } else if (holder[f2] === null) {
        holder[f2] = i;
        p.eating = true;
      }
    }
  }
  const stuck = holder.every((h) => h !== null) && ph.every((p) => !p.eating);
  return { holder, ph, stuck, meals: ph.reduce((a, p) => a + p.meals, 0) };
}
export const dining_philosophers = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Switch to “lower-numbered fork first” and run 12 steps. How many meals get eaten?',
  goal: (t) => t.rule === 'ordered' && R(t.k) >= 12,
  params: [
    { key: 'rule', label: 'Rule', type: 'choice', value: 'left', options: [{ value: 'left', label: 'Everyone takes the left fork first' }, { value: 'ordered', label: 'Take the lower-numbered fork first' }] },
    { key: 'k', label: 'Time steps', min: 0, max: 12, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Five philosophers around a table, five forks, one between each pair. To eat, a philosopher needs both neighbouring forks. Dijkstra set this puzzle in 1965.', set: { rule: 'left', k: 0 }, ms: 12000 },
    { say: 'The rule: pick up your left fork, then your right. In the first step, everyone grabs their left fork at once.', set: { k: 1 }, ms: 10500 },
    { say: 'Now everyone waits for their right fork, which their neighbour holds. Nobody lets go. Nobody will ever eat: a deadlock.', set: { k: 6 }, ms: 12000, notes: [{ text: 'a circle of waiting', at: [4.2, 3.6], to: [-0.4, 1.4], color: C.red }] },
    { say: 'Fix: number the forks 0 to 4 and always take the lower number first. Philosopher 4 now reaches for fork 0 before fork 4, and the circle can never close.', set: { rule: 'ordered', k: 2 }, ms: 13000 },
    { say: 'Meals happen, step after step. Taking locks in one fixed order is exactly how real programs avoid deadlock.', set: { k: 12 }, ms: 11000 },
  ],
  readout: (t) => {
    const r = dine(t.rule, R(t.k));
    return [
      ['Meals eaten', `${r.meals}`],
      ['Status', r.stuck ? 'deadlock' : 'running'],
    ];
  },
  setup(kit) {
    const O = [-2.2, -0.2];
    const ang = (i) => Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const at = (a, rad) => [O[0] + rad * Math.cos(a), O[1] + rad * Math.sin(a)];
    kit.dot(O, { r: 1.7, color: 0x22303f });
    const phD = [0, 1, 2, 3, 4].map((i) => kit.dot(at(ang(i), 3.0), { r: 0.5, color: C.blue }));
    [0, 1, 2, 3, 4].forEach((i) => kit.label(`P${i}`, at(ang(i), 3.0), { ...mono, size: 15, color: '#0b1220' }));
    // fork i sits between philosopher i (its left fork) and philosopher i+1 (its right fork)
    const forkAng = (f) => ang(f) + Math.PI / 5;
    const forks = [0, 1, 2, 3, 4].map((f) => ({
      ln: kit.line([[0, 0], [1, 1]], { color: C.white, width: 4 }),
      lab: kit.label(`${f}`, [0, 0], { ...mono, size: 12, color: C.grey }),
    }));
    const status = kit.label('', [4.6, 2.4], { tex: false, size: 22 });
    const legend = [['eating', C.green], ['holding one fork', C.gold], ['thinking', C.blue]];
    legend.forEach(([s, c], i) => {
      kit.dot([3.6, -1.2 - i * 0.7], { r: 0.18, color: c });
      kit.label(s, [4.0, -1.2 - i * 0.7], { tex: false, size: 14, color: C.grey, align: 'left' });
    });
    const meals = kit.label('', [4.6, 1.2], { tex: false, size: 16, color: C.grey });
    return (t) => {
      const r = dine(t.rule, R(t.k));
      r.ph.forEach((p, i) => {
        const held = r.holder.filter((h) => h === i).length;
        phD[i].color(p.eating ? C.green : held === 1 ? (r.stuck ? C.red : C.gold) : C.blue);
      });
      forks.forEach((fk, f) => {
        const h = r.holder[f];
        let a = forkAng(f);
        let rad = 1.95;
        if (h !== null) {
          a = ang(h) + (h === f ? 1 : -1) * 0.34;
          rad = 2.15;
        }
        const d = [Math.cos(a), Math.sin(a)];
        const c = at(a, rad);
        fk.ln.set([[c[0] - d[0] * 0.35, c[1] - d[1] * 0.35], [c[0] + d[0] * 0.35, c[1] + d[1] * 0.35]]);
        fk.ln.color(h === null ? C.white : C.gold);
        fk.lab.pos(at(a, rad - 0.62));
      });
      status.set(r.stuck ? 'DEADLOCK' : R(t.k) === 0 ? 'ready' : 'running').color(r.stuck ? C.red : C.green);
      meals.set(`meals eaten: ${r.meals}`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-153: page replacement, FIFO versus LRU, with 3 frames
// ---------------------------------------------------------------------------
const REFS = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
export function paging(rule, k, nFrames = 3) {
  const slots = [];
  const marks = [];
  let last = -1;
  for (let i = 0; i < k; i++) {
    const p = REFS[i];
    const at = slots.findIndex((s) => s.page === p);
    if (at >= 0) {
      slots[at].used = i;
      marks.push(false);
      last = at;
      continue;
    }
    marks.push(true);
    if (slots.length < nFrames) {
      slots.push({ page: p, loaded: i, used: i });
      last = slots.length - 1;
    } else {
      const key = rule === 'fifo' ? 'loaded' : 'used';
      let v = 0;
      slots.forEach((s, j) => { if (s[key] < slots[v][key]) v = j; });
      slots[v] = { page: p, loaded: i, used: i };
      last = v;
    }
  }
  return { slots, marks, faults: marks.filter(Boolean).length, last, hit: k > 0 && !marks[k - 1] };
}
export const page_table = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Run all 20 requests with FIFO and with LRU. Which causes fewer page faults, and by how many?',
  goal: (t) => t.rule === 'lru' && R(t.k) >= 20,
  params: [
    { key: 'rule', label: 'Evict', type: 'choice', value: 'fifo', options: [{ value: 'fifo', label: 'Oldest loaded (FIFO)' }, { value: 'lru', label: 'Least recently used (LRU)' }] },
    { key: 'k', label: 'Requests', min: 0, max: 20, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A program asks for pages in this order, top row. Real memory has room for only 3 pages. Each request not already in memory is a page fault: a slow trip to disk.', set: { rule: 'fifo', k: 0 }, ms: 12500 },
    { say: 'The first three requests, 7, 0, 1, fill the empty frames: three faults that no rule can avoid.', set: { k: 3 }, ms: 10000 },
    { say: 'Page 2 needs a frame. FIFO evicts the page loaded longest ago, 7. Then 0 is already there: a hit.', set: { k: 5 }, ms: 11000, notes: [{ text: 'hit: no disk trip', at: [2.8, 1.8], to: [-1.0, 0.5], color: C.green }] },
    { say: 'All 20 requests with FIFO: 15 faults.', set: { k: 20 }, ms: 9000 },
    { say: 'Least recently used evicts the page that has gone unused the longest, betting the near future looks like the recent past. Same requests: 12 faults.', set: { rule: 'lru', k: 20 }, ms: 13000, notes: [{ text: '3 fewer faults', at: [4.6, -1.6], to: [2.6, -3.0], color: C.green }] },
  ],
  readout: (t) => {
    const r = paging(t.rule, R(t.k));
    return [
      ['Faults', `${r.faults}`],
      ['Hits', `${R(t.k) - r.faults}`],
    ];
  },
  setup(kit) {
    const X = (i) => -7.4 + i * 0.74;
    const cells = REFS.map((p, i) => ({
      box: kit.rect(X(i), 2.9, 0.64, 0.7, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1.2 }),
      lab: kit.label(`${p}`, [X(i) + 0.32, 3.25], { ...mono, size: 16 }),
      mark: kit.label('', [X(i) + 0.32, 2.55], { ...mono, size: 12 }),
    }));
    kit.label('requests', [-7.4, 4.0], { tex: false, size: 13, color: C.grey, align: 'left' });
    kit.label('memory: 3 frames', [-1.5, 1.4], { tex: false, size: 14, color: C.grey });
    const frames = [0, 1, 2].map((j) => ({
      box: kit.rect(-3.9 + j * 1.6, -0.6, 1.4, 1.4, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 }),
      lab: kit.label('', [-3.2 + j * 1.6, 0.1], { ...mono, size: 28 }),
    }));
    const total = kit.label('', [0, -3.0], { tex: false, size: 22 });
    const next = kit.label('', [-1.5, -1.6], { tex: false, size: 14, color: C.grey });
    return (t) => {
      const k = R(t.k);
      const r = paging(t.rule, k);
      cells.forEach((c, i) => {
        c.box.color(i === k - 1 ? 0x4a3b16 : 0x1a2433);
        c.mark.set(i < k ? (r.marks[i] ? 'F' : '✓') : '').color(r.marks[i] ? C.red : C.green);
      });
      frames.forEach((f, j) => {
        const s = r.slots[j];
        f.lab.set(s ? `${s.page}` : '');
        f.box.color(j === r.last && k > 0 ? (r.hit ? 0x1f3d22 : 0x4a1f1f) : 0x1a2433);
      });
      if (r.slots.length === 3) {
        const key = t.rule === 'fifo' ? 'loaded' : 'used';
        const v = r.slots.reduce((a, s) => (s[key] < a[key] ? s : a));
        next.set(`next to go: ${v.page}`);
      } else next.set('');
      total.set(`${r.faults} faults`).color(t.rule === 'lru' ? C.green : C.gold);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-154: TCP numbers, acknowledges and resends (go-back-N, window of 4)
// ---------------------------------------------------------------------------
export function tcpRounds(loss) {
  const rounds = [];
  let base = 1;
  let lostOnce = !loss;
  while (base <= 8) {
    const sent = [];
    for (let n = base; n < base + 4 && n <= 8; n++) sent.push(n);
    let expect = base;
    const fate = {};
    sent.forEach((n) => {
      if (n === 3 && !lostOnce) {
        lostOnce = true;
        fate[n] = 'lost';
      } else if (n === expect) {
        fate[n] = 'ok';
        expect += 1;
      } else fate[n] = 'dropped';
    });
    rounds.push({ sent, fate, ack: expect });
    base = expect;
  }
  return rounds;
}
function tcpState(loss, k) {
  const rounds = tcpRounds(loss === 'one');
  const r = Math.min(Math.ceil(k / 2), rounds.length);
  const phase = k === 0 ? 'ready' : k % 2 === 1 ? 'send' : 'ack';
  const cur = rounds[r - 1];
  const got = new Set();
  const acked = r === 0 ? 0 : phase === 'ack' ? cur.ack - 1 : r > 1 ? rounds[r - 2].ack - 1 : 0;
  rounds.slice(0, r).forEach((rd) => rd.sent.forEach((n) => { if (rd.fate[n] === 'ok') got.add(n); }));
  return { rounds, r, phase, cur, got, acked, done: r === rounds.length && phase === 'ack' };
}
export const tcp_retransmit = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Turn on the lost packet. How many rounds does it take to deliver all 8 packets?',
  goal: (t) => t.loss === 'one' && R(t.k) >= 6,
  params: [
    { key: 'loss', label: 'Network', type: 'choice', value: 'none', options: [{ value: 'none', label: 'No loss' }, { value: 'one', label: 'Packet 3 is lost once' }] },
    { key: 'k', label: 'Steps', min: 0, max: 6, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A file is cut into 8 numbered packets. The sender may have 4 unacknowledged packets in flight at once: its window.', set: { loss: 'none', k: 0 }, ms: 11000 },
    { say: 'Round 1: packets 1 to 4 cross the network and arrive. The receiver answers “ACK 5”: send me 5 next.', set: { k: 2 }, ms: 11000 },
    { say: 'Round 2 delivers 5 to 8. ACK 9: everything arrived, in two rounds.', set: { k: 4 }, ms: 9500 },
    { say: 'Now packet 3 is lost on the way, perhaps dropped by a crowded router. Packets 1 and 2 arrive; 4 arrives out of order and, in this simple version, is thrown away.', set: { loss: 'one', k: 1 }, ms: 13000, notes: [{ text: 'lost', at: [-5.6, -0.8], to: [-3.3, -0.1], color: C.red }] },
    { say: 'The receiver keeps saying ACK 3. The sender takes the hint and resends from 3. It takes three rounds, but every byte arrives, in order. That is TCP’s promise.', set: { k: 6 }, ms: 13000 },
  ],
  readout: (t) => {
    const s = tcpState(t.loss, R(t.k));
    return [
      ['Round', s.r ? `${s.r}` : '—'],
      ['Delivered', `${s.got.size} of 8`],
    ];
  },
  setup(kit) {
    const X = (n) => -5.6 + (n - 1) * 1.3;
    kit.label('sender', [-7.2, 2.9], { tex: false, size: 14, color: C.grey });
    kit.label('receiver', [-7.2, -2.9], { tex: false, size: 14, color: C.grey });
    const snd = [];
    const rcv = [];
    for (let n = 1; n <= 8; n++) {
      snd.push(kit.rect(X(n) - 0.5, 2.5, 1.0, 0.8, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 1.5 }));
      kit.label(`${n}`, [X(n), 2.9], { ...mono, size: 18 });
      rcv.push(kit.rect(X(n) - 0.5, -3.3, 1.0, 0.8, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1.5 }));
      kit.label(`${n}`, [X(n), -2.9], { ...mono, size: 18 });
    }
    const arrows = Array.from({ length: 4 }, () => kit.arrow([0, 0], [0, 1], { color: C.blue }));
    const xs = Array.from({ length: 4 }, () => kit.label('✗', [0, 0], { tex: false, size: 26, color: C.red }));
    const ack = kit.arrow([7.3, -2.4], [7.3, 2.4], { color: C.green });
    const ackL = kit.label('', [6.6, 0], { ...mono, size: 18, color: C.green });
    const title = kit.label('', [0, 4.0], { tex: false, size: 18 });
    return (t) => {
      const s = tcpState(t.loss, R(t.k));
      for (let n = 1; n <= 8; n++) {
        snd[n - 1].color(n <= s.acked ? 0x1f3d22 : s.phase === 'send' && s.cur?.sent.includes(n) ? 0x1d3550 : 0x1a2433);
        rcv[n - 1].color(s.got.has(n) ? 0x1f3d22 : 0x1a2433);
      }
      arrows.forEach((a, i) => {
        const n = s.phase === 'send' ? s.cur.sent[i] : undefined;
        const on = n !== undefined;
        a.visible(on);
        xs[i].visible(false);
        if (!on) return;
        const f = s.cur.fate[n];
        if (f === 'lost') {
          a.set([X(n), 2.4], [X(n), 0.2]).color(C.red);
          xs[i].pos([X(n), 0]).visible(true);
        } else {
          a.set([X(n), 2.4], [X(n), -2.4]).color(f === 'ok' ? C.blue : C.grey);
          if (f === 'dropped') xs[i].pos([X(n) + 0.45, -1.9]).visible(true);
        }
      });
      ack.visible(s.phase === 'ack');
      ackL.visible(s.phase === 'ack');
      if (s.phase === 'ack') ackL.set(`ACK ${s.cur.ack}`).pos([6.2, 0]);
      title.set(s.r === 0 ? 'window: 4 packets' : s.phase === 'send' ? `round ${s.r}: send ${s.cur.sent[0]}–${s.cur.sent[s.cur.sent.length - 1]}` : s.done ? `all 8 delivered in ${s.rounds.length} rounds` : `round ${s.r}: receiver asks for ${s.cur.ack}`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-155: a query, step by step (filter, join, group)
// ---------------------------------------------------------------------------
const STUDENTS = [[1, 'Ana'], [2, 'Ben'], [3, 'Carla'], [4, 'Dan']];
const FINISHED = [[1, 'cs-101', 92], [1, 'cs-102', 75], [2, 'cs-101', 68], [3, 'cs-101', 88], [3, 'cs-111', 95], [4, 'cs-102', 81]];
const QUERIES = {
  where: { label: 'WHERE', sql: 'SELECT * FROM finished WHERE score >= 80' },
  join: { label: 'JOIN', sql: 'SELECT name, class FROM students JOIN finished ON id = student WHERE score >= 80' },
  count: { label: 'GROUP BY', sql: 'SELECT name, COUNT(*) FROM students JOIN finished ON id = student GROUP BY name' },
};
export function runQuery(q) {
  const name = Object.fromEntries(STUDENTS);
  if (q === 'where') return FINISHED.filter((r) => r[2] >= 80).map((r) => [r[0], r[1], r[2]]);
  if (q === 'join') return FINISHED.filter((r) => r[2] >= 80).map((r) => [name[r[0]], r[1]]);
  return STUDENTS.map(([id, n]) => [n, FINISHED.filter((r) => r[0] === id).length]);
}
export const sql_join = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Run the JOIN query to the end. Which student has the most classes scored 80 or above?',
  goal: (t) => t.q === 'join' && R(t.k) >= 3,
  params: [
    { key: 'q', label: 'Query', type: 'choice', value: 'where', options: Object.entries(QUERIES).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'k', label: 'Steps', min: 0, max: 3, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Two tables. students lists each student once, with an id. finished lists every class a student finished, with the student’s id and a score.', set: { q: 'where', k: 0 }, ms: 12000 },
    { say: 'WHERE score >= 80 keeps only the rows that pass the test. The other two rows are set aside.', set: { k: 1 }, ms: 10500, notes: [{ text: 'fails the test', at: [0.4, -3.6], to: [-0.4, 1.6], color: C.red }] },
    { say: 'JOIN pairs each finished row with the student whose id matches. Now we can see names next to classes.', set: { q: 'join', k: 2 }, ms: 11500 },
    { say: 'The result is a new table. You said what you wanted; the database decided how to find it, which is the heart of Codd’s idea.', set: { k: 3 }, ms: 11500 },
    { say: 'GROUP BY name with COUNT collapses each student’s rows into one, counting them: Ana 2, Ben 1, Carla 2, Dan 1.', set: { q: 'count', k: 3 }, ms: 11500 },
  ],
  readout: (t) => [
    ['Query', QUERIES[t.q].label],
    ['Result rows', R(t.k) >= 3 ? `${runQuery(t.q).length}` : '—'],
  ],
  setup(kit) {
    const H = 0.56;
    const sql = kit.label('', [0, 4.0], { ...mono, size: 13, color: C.gold });
    const table = (x, y, w, head, rows) => {
      kit.label(head[0], [x, y + 0.55], { tex: false, size: 14, color: C.grey, align: 'left' });
      kit.label(head[1], [x + 0.1, y + 0.05], { ...mono, size: 12, color: C.grey, align: 'left' });
      return rows.map((r, i) => {
        const yy = y - (i + 1) * H;
        const box = kit.rect(x, yy - H / 2, w, H - 0.06, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1 });
        const lab = kit.label(r, [x + 0.1, yy], { ...mono, size: 14, align: 'left' });
        return { box, lab };
      });
    };
    const stu = table(-7.7, 2.6, 2.6, ['students', 'id  name'], STUDENTS.map(([i, n]) => `${i}   ${n}`));
    const fin = table(-3.4, 2.6, 3.9, ['finished', 'student  class   score'], FINISHED.map(([s, c, sc]) => `${s}        ${c}  ${sc}`));
    const res = Array.from({ length: 6 }, (_, i) => ({
      box: kit.rect(1.7, 2.6 - (i + 1) * H - H / 2, 5.9, H - 0.06, { color: 0x1f3d22, opacity: 1, strokeColor: C.grid, width: 1 }),
      lab: kit.label('', [1.8, 2.6 - (i + 1) * H], { ...mono, size: 14, align: 'left' }),
    }));
    const resHead = kit.label('result', [1.7, 3.15], { tex: false, size: 14, color: C.green, align: 'left' });
    const links = FINISHED.map(() => kit.line([[0, 0], [1, 1]], { color: C.gold, width: 1.5 }));
    return (t) => {
      const k = R(t.k);
      sql.set(QUERIES[t.q].sql);
      const filt = t.q !== 'count';
      fin.forEach((f, i) => {
        const pass = FINISHED[i][2] >= 80;
        f.box.color(k >= 1 && filt ? (pass ? 0x1f3d22 : 0x3a1f1f) : 0x1a2433);
        f.lab.opacity(k >= 1 && filt && !pass ? 0.4 : 1);
      });
      stu.forEach((s) => s.box.color(k >= 2 && t.q !== 'where' ? 0x1d3550 : 0x1a2433));
      links.forEach((l, i) => {
        const r = FINISHED[i];
        const on = k >= 2 && t.q !== 'where' && (!filt || r[2] >= 80);
        l.visible(on);
        if (on) l.set([[-5.1, 2.6 - r[0] * H], [-3.4, 2.6 - (i + 1) * H]]);
      });
      const out = runQuery(t.q);
      resHead.visible(k >= 3);
      res.forEach((r, i) => {
        const on = k >= 3 && i < out.length;
        r.box.visible(on);
        r.lab.visible(on);
        if (on) r.lab.set(out[i].join('   '));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// cs-156: breaking a Caesar cipher by letter frequencies
// ---------------------------------------------------------------------------
const PLAIN = 'THE KATIPUNAN USED SECRET WRITING TO PROTECT ITS MEMBERS. A MESSAGE THAT ONLY SHIFTS EACH LETTER IS EASY TO BREAK, BECAUSE THE LETTERS OF ENGLISH ARE NOT EQUALLY COMMON. THE LETTER E APPEARS MOST OFTEN, THEN T, A AND O. COUNT THE LETTERS OF THE SECRET TEXT, LINE THEM UP WITH THE USUAL PATTERN, AND THE KEY FALLS OUT. THAT IS WHY MODERN CIPHERS MUST HIDE EVERY PATTERN IN THE TEXT. NEVER TRUST A CIPHER THAT LEAVES THESE PATTERNS FREE TO SEE.';
const KEY = 7;
const shift = (s, k) => s.replace(/[A-Z]/g, (ch) => String.fromCharCode(((ch.charCodeAt(0) - 65 + k + 26) % 26) + 65));
const CIPHER = shift(PLAIN, KEY);
const ENG = [8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.15, 0.77, 4.0, 2.4, 6.7, 7.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4, 0.15, 2.0, 0.07];
const CFREQ = (() => {
  const c = Array(26).fill(0);
  let n = 0;
  for (const ch of CIPHER) {
    const i = ch.charCodeAt(0) - 65;
    if (i >= 0 && i < 26) {
      c[i] += 1;
      n += 1;
    }
  }
  return c.map((v) => (100 * v) / n);
})();
export const caesar_freq = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Slide the shift until the bars match the gold English outline. What is the key, and what does the message say?',
  goal: (t) => R(t.guess) === KEY,
  params: [
    { key: 'guess', label: 'Shift back by', min: 0, max: 25, step: 1, value: 0 },
    { key: 'eng', hidden: true, value: 1 },
  ],
  free: { eng: 1 },
  beats: [
    { say: 'A secret message, encrypted with a Caesar shift: every letter moved the same number of places along the alphabet. Unreadable as it stands.', set: { guess: 0, eng: 0 }, ms: 11500 },
    { say: 'Count the letters. The bars show how often each letter appears in the secret text. One letter, L, is the tallest of all.', set: {}, ms: 10500, notes: [{ text: 'the most common letter', at: [-4.6, 2.0], to: [-1.0, 0.2], color: C.gold }] },
    { say: 'In ordinary English, E is the most common letter, about 13%, then T, A and O. The gold marks show that usual pattern. Al-Kindi used this idea over a thousand years ago.', set: { eng: 1 }, ms: 12500 },
    { say: 'Caesar himself used a shift of 3. Shift back by 3: the bars still do not line up, and the text is still nonsense.', set: { guess: 3 }, ms: 10500 },
    { say: 'L is 7 letters after E. Shift back by 7: the bars match the English pattern, and the message appears. Twenty-five possible keys and a leaky pattern: no match for a counter.', set: { guess: 7 }, ms: 13000 },
  ],
  readout: (t) => [
    ['Shift back', `${R(t.guess)}`],
    ['Readable?', R(t.guess) === KEY ? 'yes' : 'no'],
  ],
  setup(kit) {
    const dx = 14 / 26;
    const X = (i) => -7 + i * dx + dx / 2;
    const BASE = -2.9;
    const S = 0.32;
    const bars = Array.from({ length: 26 }, (_, i) => kit.rect(X(i) - dx * 0.38, BASE, dx * 0.76, 0.1, { color: C.blue, opacity: 0.8, strokeColor: C.blue, width: 1 }));
    const marks = ENG.map((f, i) => kit.line([[X(i) - dx * 0.45, BASE + f * S], [X(i) + dx * 0.45, BASE + f * S]], { color: C.gold, width: 3 }));
    const letters = Array.from({ length: 26 }, (_, i) => kit.label('', [X(i), BASE - 0.3], { ...mono, size: 12, color: C.grey }));
    const text = [kit.label('', [0, 3.9], { ...mono, size: 14 }), kit.label('', [0, 3.35], { ...mono, size: 14 })];
    return (t) => {
      const g = R(t.guess);
      const ok = g === KEY;
      bars.forEach((b, i) => {
        // bar at position i shows the cipher letter that decrypts to letter i
        const f = CFREQ[(i + g) % 26];
        b.set(X(i) - dx * 0.38, BASE, dx * 0.76, Math.max(0.02, f * S));
        b.color(ok ? C.green : C.blue);
        letters[i].set(String.fromCharCode(65 + i));
      });
      marks.forEach((m) => m.visible(t.eng > 0.5));
      const out = shift(CIPHER, -g);
      text[0].set(out.slice(0, 52)).color(ok ? C.green : C.text);
      text[1].set(out.slice(52, 104)).color(ok ? C.green : C.text);
    };
  },
};
