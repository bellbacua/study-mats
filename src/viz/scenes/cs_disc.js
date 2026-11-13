// Computer Science program: Discrete Structures (cs-111 to cs-116).
// Written as stories: hidden params drive the reveals, and touching any
// control switches to the `free` values.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono' };
const arc = (cx, cy, r, a0, a1, n = 40) => Array.from({ length: n + 1 }, (_, i) => {
  const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
});

// ---------------------------------------------------------------------------
// cs-111: truth tables with two switches and a lamp
// ---------------------------------------------------------------------------
const OPS = {
  and: { label: 'p AND q', f: (p, q) => p && q },
  or: { label: 'p OR q', f: (p, q) => p || q },
  xor: { label: 'p XOR q', f: (p, q) => p !== q },
  imp: { label: 'IF p THEN q', f: (p, q) => !p || q },
};
const ROWS = [[1, 1], [1, 0], [0, 1], [0, 0]];
export const logic_table = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 7,
  mission: 'Find the one row where “IF p THEN q” is false.',
  goal: (t) => t.op === 'imp' && R(t.p) === 1 && R(t.q) === 0,
  params: [
    { key: 'op', label: 'Operator', type: 'choice', value: 'and', options: Object.entries(OPS).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'p', label: 'p (1 = true)', min: 0, max: 1, step: 1, value: 1 },
    { key: 'q', label: 'q (1 = true)', min: 0, max: 1, step: 1, value: 1 },
    { key: 'rows', hidden: true, value: 4 },
  ],
  free: { rows: 4 },
  beats: [
    { say: 'Two switches, p and q, and a lamp. Each switch is true (on) or false (off). The lamp shows the value of the whole sentence. This one is p AND q.', set: { op: 'and', p: 1, q: 1, rows: 1 }, ms: 11000 },
    { say: 'Turn q off. AND needs both, so the lamp goes dark. Each combination of switches is one row of the truth table.', set: { q: 0, rows: 2 }, ms: 10000, notes: [{ text: 'one row per combination', at: [-1.6, -3.0], to: [-0.4, 1.2] }] },
    { say: 'Two switches give 2 × 2 = 4 rows. Three would give 8: every new proposition doubles the cases.', set: { p: 0, q: 0, rows: 4 }, ms: 10500 },
    { say: 'OR lights the lamp when at least one switch is on. XOR, “exclusive or”, when exactly one is on.', set: { op: 'or', p: 0, q: 1 }, ms: 10500 },
    { say: 'IF p THEN q is a promise: “if it rains (p), I bring an umbrella (q)”. If it does not rain, the promise is not broken, whatever I bring.', set: { op: 'imp', p: 0, q: 0 }, ms: 12000, notes: [{ text: 'no rain: promise kept', at: [4.4, -3.6], to: [2.2, -2.3], color: C.green }] },
    { say: 'Only one row breaks it: rain, and no umbrella. That single false row is the whole meaning of “if … then”.', set: { p: 1, q: 0 }, ms: 11000, notes: [{ text: 'the only false row', at: [3.0, -3.6], to: [3.0, 0.9], color: C.red }] },
  ],
  readout: (t) => [
    ['Sentence', OPS[t.op].label],
    ['p, q', `${R(t.p) ? 'true' : 'false'}, ${R(t.q) ? 'true' : 'false'}`],
    ['Value', OPS[t.op].f(!!R(t.p), !!R(t.q)) ? 'true' : 'false'],
  ],
  setup(kit) {
    // switches and lamp (left)
    const sw = (y, name) => {
      kit.label(name, [-7.0, y], { size: 20 });
      kit.line([[-6.4, y], [-5.6, y]], { color: C.grey, width: 3 });
      kit.dot([-5.6, y], { r: 0.1, color: C.grey });
      const blade = kit.line([[-5.6, y], [-4.6, y]], { color: C.white, width: 4 });
      kit.dot([-4.6, y], { r: 0.1, color: C.grey });
      return blade;
    };
    const bp = sw(1.6, 'p');
    const bq = sw(-0.4, 'q');
    const lamp = kit.dot([-5.4, -2.6], { r: 0.55, color: 0x333333, glow: true });
    const lampL = kit.label('', [-5.4, -3.55], { tex: false, size: 14 });
    // table (right)
    const X = [0.2, 1.6, 3.6];
    const Y0 = 2.4;
    kit.label('p', [X[0], Y0 + 0.9], { size: 18 });
    kit.label('q', [X[1], Y0 + 0.9], { size: 18 });
    const head = kit.label('', [X[2] + 0.6, Y0 + 0.9], { tex: false, size: 16, color: C.gold });
    kit.line([[-0.6, Y0 + 0.45], [6.0, Y0 + 0.45]], { color: C.grid, width: 1.5 });
    const hl = kit.rect(-0.6, 0, 6.6, 0.95, { color: C.gold, opacity: 0.18, strokeColor: C.gold, width: 2 });
    const cells = ROWS.map(([p, q], i) => {
      const y = Y0 - i * 1.1;
      return [
        kit.label(p ? 'T' : 'F', [X[0], y], { ...mono, size: 20, color: p ? C.green : C.red }),
        kit.label(q ? 'T' : 'F', [X[1], y], { ...mono, size: 20, color: q ? C.green : C.red }),
        kit.label('', [X[2] + 0.6, y], { ...mono, size: 20 }),
      ];
    });
    return (t) => {
      const p = R(t.p);
      const q = R(t.q);
      const ang = (on) => (on ? 0 : 35);
      const blade = (b, y, on) => b.set([[-5.6, y], [-5.6 + Math.cos((ang(on) * Math.PI) / 180), y + Math.sin((ang(on) * Math.PI) / 180)]]).color(on ? C.green : C.grey);
      blade(bp, 1.6, p);
      blade(bq, -0.4, q);
      const v = OPS[t.op].f(!!p, !!q);
      lamp.color(v ? C.yellow : 0x333333);
      lampL.set(v ? 'lamp ON: true' : 'lamp off: false');
      head.set(OPS[t.op].label);
      const row = ROWS.findIndex(([a, b]) => a === p && b === q);
      hl.set(-0.6, Y0 - row * 1.1 - 0.47, 6.6, 0.95);
      cells.forEach((c, i) => {
        const shown = i < Math.max(1, R(t.rows)) || i === row;
        const r = OPS[t.op].f(!!ROWS[i][0], !!ROWS[i][1]);
        c.forEach((l) => l.visible(shown));
        c[2].set(r ? 'T' : 'F').color(r ? C.green : C.red);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// cs-112: Venn diagram with the region of each operation shaded
// ---------------------------------------------------------------------------
const SA = [1, 2, 3, 5, 8];
const SB = [2, 3, 4, 6, 8, 9];
const POS = {
  1: [-3.0, 0.9], 5: [-2.8, -0.9], 2: [0, 1.0], 3: [0, 0], 8: [0, -1.0], 4: [2.8, 1.1], 6: [3.0, 0], 9: [2.7, -1.1], 7: [5.8, -2.6], 10: [-5.8, -2.6],
};
const SETOPS = {
  union: { label: 'A ∪ B (union)', has: (x) => SA.includes(x) || SB.includes(x) },
  inter: { label: 'A ∩ B (intersection)', has: (x) => SA.includes(x) && SB.includes(x) },
  amb: { label: 'A − B (difference)', has: (x) => SA.includes(x) && !SB.includes(x) },
  bma: { label: 'B − A (difference)', has: (x) => SB.includes(x) && !SA.includes(x) },
};
const CA = [-1.3, 0];
const CB = [1.3, 0];
const RR = 2.6;
const REGION = {
  union: [...arc(...CA, RR, 60, 300), ...arc(...CB, RR, -120, 120)],
  inter: [...arc(...CA, RR, -60, 60), ...arc(...CB, RR, 120, 240)],
  amb: [...arc(...CA, RR, 60, 300), ...arc(...CB, RR, 240, 120)],
  bma: [...arc(...CB, RR, -120, 120), ...arc(...CA, RR, 60, -60)],
};
export const venn_sets = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Which operation gives exactly {2, 3, 8}? Then check: |A| + |B| − |A ∩ B| = |A ∪ B|.',
  goal: (t) => t.op === 'inter',
  params: [
    { key: 'op', label: 'Operation', type: 'choice', value: 'union', options: Object.entries(SETOPS).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'show', hidden: true, value: 1 },
  ],
  free: { show: 1 },
  beats: [
    { say: 'Two sets of numbers. A = {1, 2, 3, 5, 8} on the left, B = {2, 3, 4, 6, 8, 9} on the right. 7 and 10 belong to neither: they sit outside both circles.', set: { op: 'union', show: 0 }, ms: 12000 },
    { say: 'The overlap holds what A and B share: 2, 3 and 8. That is the intersection, A ∩ B.', set: { op: 'inter', show: 1 }, ms: 10500, notes: [{ text: 'in both', at: [0, 3.6], to: [0, 1.6], color: C.gold }] },
    { say: 'The union, A ∪ B, holds everything in either circle: eight numbers. Notice 5 + 6 = 11, not 8: the shared three were counted twice.', set: { op: 'union' }, ms: 11500 },
    { say: 'So |A ∪ B| = |A| + |B| − |A ∩ B| = 5 + 6 − 3 = 8. This “inclusion–exclusion” rule counts without double-counting.', set: {}, ms: 11000 },
    { say: 'A − B keeps what is in A but not in B: the left crescent, {1, 5}. B − A is the right crescent. Order matters for difference.', set: { op: 'amb' }, ms: 11000 },
  ],
  readout: (t) => {
    const all = Object.keys(POS).map(Number).sort((a, b) => a - b);
    const res = all.filter((x) => SETOPS[t.op].has(x));
    return [
      ['Operation', SETOPS[t.op].label],
      ['Result', t.show >= 0.5 ? `{${res.join(', ')}}` : '…'],
      ['Size', t.show >= 0.5 ? `${res.length}` : '…'],
    ];
  },
  setup(kit) {
    const shade = kit.fill(REGION.union, { color: C.gold, opacity: 0.22 });
    kit.line(arc(...CA, RR, 0, 360, 80), { color: C.blue, width: 3 });
    kit.line(arc(...CB, RR, 0, 360, 80), { color: C.green, width: 3 });
    kit.label('A', [-3.6, 2.6], { size: 22, color: C.blue });
    kit.label('B', [3.6, 2.6], { size: 22, color: C.green });
    const nums = Object.entries(POS).map(([n, p]) => [Number(n), kit.label(n, p, { ...mono, size: 22 })]);
    const title = kit.label('', [0, -3.6], { tex: false, size: 17, color: C.gold });
    return (t) => {
      const on = t.show >= 0.5;
      shade.set(REGION[t.op]);
      shade.visible(on);
      nums.forEach(([n, l]) => l.color(on && SETOPS[t.op].has(n) ? C.gold : C.text).opacity(on && !SETOPS[t.op].has(n) ? 0.45 : 1));
      title.set(on ? SETOPS[t.op].label : '');
    };
  },
};

// ---------------------------------------------------------------------------
// cs-113: dominoes, then two staircases making a rectangle
// ---------------------------------------------------------------------------
export const domino_induction = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 2.5,
  mission: 'Set n = 8. How many squares are in one staircase? Check with n(n + 1)/2.',
  goal: (t) => R(t.n) === 8 && t.stair >= 0.9,
  params: [
    { key: 'n', label: 'n', min: 1, max: 10, step: 1, value: 6 },
    { key: 'fall', hidden: true, value: 10 },
    { key: 'stair', hidden: true, value: 1 },
  ],
  free: { fall: 10, stair: 1 },
  beats: [
    { say: 'A row of dominoes, one for each number 1, 2, 3, … We want them all to fall: a statement true for every n.', set: { n: 6, fall: 0, stair: 0 }, ms: 10000 },
    { say: 'Two things are enough. The base case: the first domino falls.', set: { fall: 1 }, ms: 8500, notes: [{ text: 'base case', at: [-6.2, 3.6], to: [-6.2, 2.2], color: C.green }] },
    { say: 'The inductive step: whenever domino n falls, it knocks over domino n + 1. Together, every domino falls, however many there are.', set: { fall: 10 }, ms: 11000 },
    { say: 'Now a real statement: 1 + 2 + … + n = n(n + 1)/2. Here is 1 + 2 + … + 6 as a staircase of squares.', set: { stair: 0.5 }, ms: 10500 },
    { say: 'A second, upside-down copy fits on top, making a 6 by 7 rectangle: 42 squares, so one staircase is 21.', set: { stair: 1 }, ms: 11000, notes: [{ text: 'n × (n + 1) squares', at: [5.4, 3.6], to: [3.6, 1.0], color: C.gold }] },
    { say: 'The inductive step in algebra: if the sum to n is n(n + 1)/2, adding n + 1 gives (n + 1)(n + 2)/2, the same formula for n + 1.', set: { n: 9 }, ms: 12000 },
  ],
  readout: (t) => {
    const n = R(t.n);
    return [
      ['n', `${n}`],
      ['1 + 2 + … + n', `${(n * (n + 1)) / 2}`],
      ['Rectangle', `${n} × ${n + 1} = ${n * (n + 1)}`],
    ];
  },
  setup(kit) {
    kit.line([[-7.4, 1.0], [7.4, 1.0]], { color: C.axis, width: 2 });
    const dom = Array.from({ length: 10 }, () => kit.line([[0, 0], [0, 1]], { color: C.blue, width: 9 }));
    const dl = Array.from({ length: 10 }, (_, i) => kit.label(`${i + 1}`, [-6.4 + i * 1.35, 0.6], { tex: false, size: 13, color: C.grey }));
    const S = 0.36;
    const sq = [];
    for (let i = 0; i < 10; i++) for (let j = 0; j <= 10; j++) sq.push([i, j, kit.rect(0, 0, S * 0.92, S * 0.92, { color: C.blue, opacity: 0.7, strokeColor: C.blue, width: 1 })]);
    return (t) => {
      const n = R(t.n);
      dom.forEach((d, i) => {
        const on = i < n;
        d.visible(on);
        dl[i].visible(on);
        if (!on) return;
        const fallen = Math.max(0, Math.min(1, t.fall - i));
        const a = (Math.PI / 2) * (1 - 0.62 * fallen);
        const x = -6.4 + i * 1.35;
        d.set([[x, 1.0], [x + 1.6 * Math.cos(a), 1.0 + 1.6 * Math.sin(a)]]).color(fallen > 0.5 ? C.gold : C.blue);
      });
      // staircases: column i (0-based) has i + 1 squares in the lower copy; the upper copy fills the rest of n + 1.
      const x0 = -S * (n / 2);
      const y0 = -4.0;
      sq.forEach(([i, j, r]) => {
        const lower = i < n && j <= i;
        const upper = i < n && j > i && j <= n;
        const show = (lower && t.stair >= 0.3) || (upper && t.stair >= 0.85);
        r.visible(show);
        if (show) r.set(x0 + i * S, y0 + j * S, S * 0.92, S * 0.92).color(lower ? C.blue : C.gold);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// cs-114: Pascal's triangle, each entry the sum of the two above
// ---------------------------------------------------------------------------
const binom = (n, k) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return R(r);
};
export const pascal_paths = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Find C(8, 3): the number of ways to choose 3 of 8. Which two numbers above add up to it?',
  goal: (t) => R(t.n) === 8 && R(t.k) === 3,
  params: [
    { key: 'n', label: 'Row n', min: 0, max: 8, step: 1, value: 4 },
    { key: 'k', label: 'Position k', min: 0, max: 8, step: 1, value: 2 },
    { key: 'rows', hidden: true, value: 9 },
  ],
  free: { rows: 9 },
  beats: [
    { say: 'Start with 1 at the top. Each new row begins and ends with 1, and every other number is the sum of the two just above it.', set: { n: 2, k: 1, rows: 3 }, ms: 10500 },
    { say: 'Row 4 reads 1, 4, 6, 4, 1. The 6 is 3 + 3 from the row above.', set: { n: 4, k: 2, rows: 5 }, ms: 9500, notes: [{ text: '3 + 3 = 6', at: [-4.6, 3.4], to: [-0.2, 1.4], color: C.gold }] },
    { say: 'Why it counts choices: to choose 2 of 4 friends, either you pick friend 4 (and 1 more from 3) or you do not (and 2 from 3). C(3, 1) + C(3, 2) = 3 + 3.', set: {}, ms: 12500 },
    { say: 'So entry k of row n is C(n, k), the number of ways to choose k things from n. Row 8, position 3: 56 ways to pick 3 of 8.', set: { n: 8, k: 3, rows: 9 }, ms: 11000 },
    { say: 'Each row adds up to a power of 2: row 8 sums to 256, the number of all subsets of 8 things. Yang Hui printed this triangle in 1261; Pascal studied it in 1654.', set: { n: 8, k: 4 }, ms: 12000 },
  ],
  readout: (t) => {
    const n = R(t.n);
    const k = Math.min(R(t.k), n);
    return [
      ['C(n, k)', `C(${n}, ${k}) = ${binom(n, k)}`],
      ['From above', n > 0 && k > 0 && k < n ? `${binom(n - 1, k - 1)} + ${binom(n - 1, k)}` : 'an edge: always 1'],
      ['Row total', `2^${n} = ${2 ** n}`],
    ];
  },
  setup(kit) {
    const P = (n, k) => [(k - n / 2) * 1.35, 3.6 - n * 0.9];
    const labs = [];
    for (let n = 0; n <= 8; n++) for (let k = 0; k <= n; k++) labs.push([n, k, kit.label(`${binom(n, k)}`, P(n, k), { ...mono, size: 17 })]);
    const ring = kit.dot([0, 0], { r: 0.42, color: C.gold, opacity: 0.35 });
    const a1 = kit.arrow([0, 0], [1, 1], { color: C.blue });
    const a2 = kit.arrow([0, 0], [1, 1], { color: C.blue });
    return (t) => {
      const n = R(t.n);
      const k = Math.min(R(t.k), n);
      labs.forEach(([a, b, l]) => {
        l.visible(a < Math.max(1, R(t.rows)) || a <= n);
        const parent = a === n - 1 && (b === k - 1 || b === k);
        l.color(a === n && b === k ? C.gold : parent ? C.blue : C.text);
      });
      ring.set(P(n, k));
      const showP = n > 0 && k > 0 && k < n;
      a1.visible(showP);
      a2.visible(showP);
      if (showP) {
        const [x, y] = P(n, k);
        const [x1, y1] = P(n - 1, k - 1);
        const [x2, y2] = P(n - 1, k);
        a1.set([x1 + 0.15, y1 - 0.25], [x - 0.25, y + 0.25]);
        a2.set([x2 - 0.15, y2 - 0.25], [x + 0.25, y + 0.25]);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// cs-115: Königsberg as a graph
// ---------------------------------------------------------------------------
const KV = { N: [0, 2.9], S: [0, -2.9], K: [-2.4, 0], E: [3.2, 0] };
const KNAME = { N: 'north bank', S: 'south bank', K: 'Kneiphof island', E: 'east island' };
const BRIDGES = [
  ['N', 'K', -0.55], ['N', 'K', 0.55], ['S', 'K', -0.55], ['S', 'K', 0.55], ['N', 'E', 0], ['S', 'E', 0], ['K', 'E', 0],
];
const EXTRA = { none: [], ns: [['N', 'S', 0.9]], ke: 'remove' };
export const konigsberg = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Change the city so that a walk over every bridge exactly once becomes possible.',
  goal: (t) => t.city !== 'none',
  params: [
    { key: 'city', label: 'The city', type: 'choice', value: 'none', options: [{ value: 'none', label: 'Königsberg, 1736' }, { value: 'ns', label: 'Add a north–south bridge' }, { value: 'ke', label: 'Remove the island–island bridge' }] },
    { key: 'graph', hidden: true, value: 1 },
  ],
  free: { graph: 1 },
  beats: [
    { say: 'Königsberg, 1736: a river, two islands and two banks, joined by seven bridges. Can you walk across every bridge exactly once?', set: { city: 'none', graph: 0 }, ms: 11000 },
    { say: 'Euler’s insight: shapes and distances do not matter. Shrink each land mass to a dot, keep the bridges as lines. A graph: 4 vertices, 7 edges.', set: { graph: 1 }, ms: 11500 },
    { say: 'Count the edges at each dot, its degree: 5, 3, 3, 3. A walker passing through a land mass uses one bridge in and one out, so in-between stops need an even degree.', set: {}, ms: 12500, notes: [{ text: 'degree 5: odd', at: [-6.0, 2.8], to: [-2.7, 0.5], color: C.red }] },
    { say: 'Only the start and the end may be odd. Königsberg has four odd vertices, so no such walk exists. Euler’s proof needed no trial and error at all.', set: {}, ms: 11500 },
    { say: 'Build one more bridge, north to south: now only two vertices are odd, and a walk exists, starting at one and ending at the other.', set: { city: 'ns' }, ms: 11000, notes: [{ text: 'now 2 odd vertices', at: [5.4, 3.6], to: [3.4, 0.4], color: C.green }] },
  ],
  readout: (t) => {
    const es = t.city === 'ke' ? BRIDGES.slice(0, 6) : [...BRIDGES, ...(t.city === 'ns' ? EXTRA.ns : [])];
    const deg = { N: 0, S: 0, K: 0, E: 0 };
    es.forEach(([a, b]) => {
      deg[a] += 1;
      deg[b] += 1;
    });
    const odd = Object.values(deg).filter((d) => d % 2).length;
    return [
      ['Bridges', `${es.length}`],
      ['Degrees', Object.entries(deg).map(([v, d]) => `${v}:${d}`).join('  ')],
      ['Odd vertices', `${odd} → ${odd === 0 || odd === 2 ? 'a walk exists' : 'impossible'}`],
    ];
  },
  setup(kit) {
    // river drawn behind
    const river = kit.fill([[-8, 0.9], [8, 0.9], [8, -0.9], [-8, -0.9]], { color: 0x1d4e89, opacity: 0.35 });
    const isl = kit.fill(arc(-2.4, 0, 1.1, 0, 360, 30), { color: 0x2c3e50, opacity: 0.9 });
    const isl2 = kit.fill(arc(3.2, 0, 1.1, 0, 360, 30), { color: 0x2c3e50, opacity: 0.9 });
    const curve = (a, b, bend) => {
      const [x1, y1] = KV[a];
      const [x2, y2] = KV[b];
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const L = Math.hypot(dx, dy);
      const cx = mx - (dy / L) * bend * 2;
      const cy = my + (dx / L) * bend * 2;
      return Array.from({ length: 21 }, (_, i) => {
        const s = i / 20;
        return [(1 - s) ** 2 * x1 + 2 * (1 - s) * s * cx + s * s * x2, (1 - s) ** 2 * y1 + 2 * (1 - s) * s * cy + s * s * y2];
      });
    };
    const edges = [...BRIDGES, ...EXTRA.ns].map(([a, b, bend]) => kit.line(curve(a, b, bend), { color: C.blue, width: 4 }));
    const dots = Object.entries(KV).map(([v, p]) => [v, kit.dot(p, { r: 0.32, color: C.white })]);
    const dlab = Object.entries(KV).map(([v, p]) => [v, kit.label('', [p[0] + (v === 'K' ? -1.5 : v === 'E' ? 1.4 : 1.9), p[1] + (v === 'N' ? 0.3 : v === 'S' ? -0.3 : 0.6)], { tex: false, size: 14 })]);
    return (t) => {
      const g = t.graph >= 0.5;
      river.opacity(g ? 0.12 : 0.35);
      isl.opacity(g ? 0.25 : 0.9);
      isl2.opacity(g ? 0.25 : 0.9);
      const on = edges.map((_, i) => (i < 6 ? true : i === 6 ? t.city !== 'ke' : t.city === 'ns'));
      const deg = { N: 0, S: 0, K: 0, E: 0 };
      [...BRIDGES, ...EXTRA.ns].forEach(([a, b], i) => {
        if (!on[i]) return;
        deg[a] += 1;
        deg[b] += 1;
      });
      edges.forEach((e, i) => e.visible(on[i]).color(i === 7 ? C.green : C.blue));
      dots.forEach(([v, d]) => d.color(!g ? C.white : deg[v] % 2 ? C.red : C.green));
      dlab.forEach(([v, l]) => l.set(g ? `${KNAME[v]} · degree ${deg[v]}` : KNAME[v]).color(!g ? C.text : deg[v] % 2 ? C.red : C.green));
    };
  },
};

// ---------------------------------------------------------------------------
// cs-116: clock arithmetic, stepping by a around a clock of n hours
// ---------------------------------------------------------------------------
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
export const clock_mod = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'On the 12-hour clock, find a step size other than 1 that visits every hour.',
  goal: (t) => R(t.n) === 12 && R(t.a) !== 1 && gcd(R(t.a), 12) === 1,
  params: [
    { key: 'n', label: 'Clock size n', min: 3, max: 12, step: 1, value: 12 },
    { key: 'a', label: 'Step a', min: 1, max: 11, step: 1, value: 5 },
    { key: 'k', label: 'Steps taken', min: 0, max: 12, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A 12-hour clock. 10 o’clock plus 5 hours is 3 o’clock: we only keep the remainder after dividing by 12. In Gauss’s notation, 15 ≡ 3 (mod 12).', set: { n: 12, a: 5, k: 0 }, ms: 12000 },
    { say: 'Start at 0 and keep adding 5: 5, 10, 3, 8, 1, … The pointer jumps around the clock.', set: { k: 5 }, ms: 10500 },
    { say: 'Twelve jumps of 5 visit every hour once before returning home. That works because 5 and 12 share no common factor.', set: { k: 12 }, ms: 11000, notes: [{ text: 'all 12 hours visited', at: [5.4, 3.6], to: [2.6, 2.0], color: C.green }] },
    { say: 'Step 4 instead: 4, 8, 0, and round again. Only three hours are ever reached, because 4 and 12 share the factor 4.', set: { a: 4, k: 12 }, ms: 11000, notes: [{ text: 'stuck on 3 hours', at: [5.4, -3.6], to: [2.6, -1.6], color: C.red }] },
    { say: 'On a prime-sized clock, like 7, every step except 0 visits all hours. Facts like these, Fermat’s little theorem among them, are what RSA encryption is built on.', set: { n: 7, a: 3, k: 7 }, ms: 12500 },
  ],
  readout: (t) => {
    const n = R(t.n);
    const a = R(t.a) % n;
    const seq = Array.from({ length: R(t.k) + 1 }, (_, i) => (i * a) % n);
    return [
      ['Visited', seq.join(' → ')],
      ['gcd(a, n)', `${gcd(a, n)}`],
      ['Hours reachable', `${n / gcd(a || n, n)} of ${n}`],
    ];
  },
  setup(kit) {
    const O = [-1.2, 0];
    const RA = 3.3;
    const ticks = Array.from({ length: 12 }, () => kit.dot([0, 0], { r: 0.2, color: C.grey }));
    const nums = Array.from({ length: 12 }, () => kit.label('', [0, 0], { ...mono, size: 17 }));
    kit.line(arc(...O, RA, 0, 360, 80), { color: C.grid, width: 2 });
    const chords = Array.from({ length: 12 }, () => kit.arrow([0, 0], [1, 1], { color: C.gold, head: 0.28 }));
    const hand = kit.dot([0, 0], { r: 0.3, color: C.yellow, glow: true });
    const P = (i, n) => {
      const a = Math.PI / 2 - (2 * Math.PI * i) / n;
      return [O[0] + RA * Math.cos(a), O[1] + RA * Math.sin(a)];
    };
    return (t) => {
      const n = R(t.n);
      const a = R(t.a) % n;
      const k = R(t.k);
      const seen = new Set([0]);
      for (let i = 1; i <= k; i++) seen.add((i * a) % n);
      ticks.forEach((d, i) => {
        d.visible(i < n);
        if (i < n) d.set(P(i, n)).color(seen.has(i) ? C.green : C.grey);
      });
      nums.forEach((l, i) => {
        l.visible(i < n);
        if (i < n) {
          const [x, y] = P(i, n);
          l.set(`${i}`).pos([O[0] + (x - O[0]) * 1.2, O[1] + (y - O[1]) * 1.2]);
        }
      });
      chords.forEach((c, i) => {
        const on = i < k;
        c.visible(on);
        if (on) c.set(P((i * a) % n, n), P(((i + 1) * a) % n, n));
      });
      hand.set(P((k * a) % n, n));
    };
  },
};
