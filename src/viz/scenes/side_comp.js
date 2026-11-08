// Scenes for the Computing and AI side topic.
import { C } from '../theme';
import { range } from '../kit';

const r1 = (v) => `${Math.round(v * 10) / 10}`;
const r2 = (v) => `${Math.round(v * 100) / 100}`;
const r3 = (v) => `${Math.round(v * 1000) / 1000}`;
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const pow10 = (e) => `10${String(Math.floor(e)).replace(/./g, (c) => SUP[c] ?? c)}`;
const big = (log10) => {
  if (log10 < 6) return Math.round(10 ** log10).toLocaleString('en-US');
  const e = Math.floor(log10);
  return `${r1(10 ** (log10 - e))} × ${pow10(e)}`;
};
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const bits = (v, n) => range(n - 1, 0, n).map((k) => (Math.round(v) >> Math.round(k)) & 1);

// ---------------------------------------------------------------------------
// Binary addition with carries
// ---------------------------------------------------------------------------
export const binary_adder = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a pair whose sum just overflows four bits: the smallest possible total that needs a fifth bit.',
  goal: (t) => t.a + t.b === 16,
  params: [
    { key: 'a', label: 'First number', min: 0, max: 15, step: 1, value: 5 },
    { key: 'b', label: 'Second number', min: 0, max: 15, step: 1, value: 3 },
  ],
  beats: [
    { say: '5 + 3: 0101 + 0011. The two right-hand 1s make 0, carry 1; the carry ripples left until 1000 = 8.', set: { a: 5, b: 3 } },
    { say: '11 + 4: no two 1s meet in any column, so there are no carries at all: 1111 = 15.', set: { a: 11, b: 4 } },
    { say: '9 + 7 = 16 needs a fifth bit. A four-bit adder would keep only 0000: overflow.', set: { a: 9, b: 7 } },
  ],
  readout: (p) => [
    ['In binary', `${bits(p.a, 4).join('')} + ${bits(p.b, 4).join('')}`],
    ['Sum', `${bits(p.a + p.b, 5).join('')} = ${p.a + p.b}`],
    ['Fits in 4 bits?', p.a + p.b < 16 ? 'yes' : 'no: overflow'],
  ],
  setup(kit) {
    const xs = [-3, -1.5, 0, 1.5, 3];
    const place = [16, 8, 4, 2, 1];
    xs.forEach((x, i) => kit.label(`${place[i]}`, [x, 3.6], { size: 13, color: C.grey, tex: false }));
    kit.label('\\text{place value}', [-5.3, 3.6], { size: 12, color: C.grey });
    const carry = xs.map((x) => kit.label('', [x, 2.6], { size: 14, color: C.gold, tex: false }));
    kit.label('\\text{carries}', [-5.3, 2.6], { size: 12, color: C.gold });
    const rowA = xs.map((x) => kit.label('', [x, 1.5], { size: 28, tex: false }));
    const rowB = xs.map((x) => kit.label('', [x, 0.2], { size: 28, tex: false }));
    kit.label('+', [-4.3, 0.2], { size: 28, tex: false });
    kit.line([[-4.6, -0.6], [3.7, -0.6]], { color: C.axis, width: 3 });
    const rowS = xs.map((x) => kit.label('', [x, -1.5], { size: 28, tex: false }));
    const decA = kit.label('', [5.6, 1.5], { size: 16, tex: false, color: C.blue });
    const decB = kit.label('', [5.6, 0.2], { size: 16, tex: false, color: C.blue });
    const decS = kit.label('', [5.6, -1.5], { size: 16, tex: false, color: C.green });
    const over = kit.rect(-3.55, -2.15, 1.1, 1.3, { color: C.red, opacity: 0.18, strokeColor: C.red, width: 2 });
    const note = kit.label('\\text{lost in a 4-bit adder}', [-3, -3.0], { size: 12, color: C.red });
    return (q) => {
      const p = { a: Math.round(q.a), b: Math.round(q.b) };
      const A = bits(p.a, 5);
      const B = bits(p.b, 5);
      const S = bits(p.a + p.b, 5);
      let c = 0;
      const cs = [0, 0, 0, 0, 0];
      for (let i = 4; i >= 0; i--) {
        const t = A[i] + B[i] + c;
        c = t >= 2 ? 1 : 0;
        if (i > 0) cs[i - 1] = c;
      }
      xs.forEach((_, i) => {
        rowA[i].set(i === 0 ? '' : `${A[i]}`).color(A[i] ? C.white : C.grey);
        rowB[i].set(i === 0 ? '' : `${B[i]}`).color(B[i] ? C.white : C.grey);
        rowS[i].set(`${S[i]}`).color(S[i] ? C.green : C.grey);
        carry[i].set(cs[i] ? '1' : '');
      });
      decA.set(`= ${p.a}`);
      decB.set(`= ${p.b}`);
      decS.set(`= ${p.a + p.b}`);
      const ov = p.a + p.b >= 16;
      over.visible(ov);
      note.visible(ov);
    };
  },
};

// ---------------------------------------------------------------------------
// Babbage: tabulating x^2 + x + 41 by adding
// ---------------------------------------------------------------------------
const euler = (x0) => {
  const x = Math.round(x0);
  return x * x + x + 41;
};
const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};
export const difference_engine = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Step the engine forward until x² + x + 41 is no longer a prime number.',
  goal: (t) => t.x === 40,
  params: [{ key: 'x', label: 'x', min: 0, max: 45, step: 1, value: 3 }],
  beats: [
    { say: 'Three columns: the value, its first difference, and the second difference, always 2. Each step adds right to left.', set: { x: 3 } },
    { say: 'Still adding, still prime: 41, 43, 47, 53, 61, … all the way to x = 39.', set: { x: 20 } },
    { say: 'x = 40 gives 1681 = 41 × 41. The machine computed it perfectly; the pattern broke.', set: { x: 40 } },
  ],
  readout: (p) => {
    const v = euler(p.x);
    let f = 0;
    for (let d = 2; d * d <= v; d++) if (v % d === 0) {
      f = d;
      break;
    }
    return [
      ['f(x) = x² + x + 41', `${v}`],
      ['Next by adding', `${v} + ${2 * p.x + 2} = ${euler(p.x + 1)}`],
      ['Prime?', isPrime(v) ? 'yes' : `no: ${f} × ${v / f}`],
    ];
  },
  setup(kit) {
    const cols = [-3.6, 0, 3.6];
    ['f(x)', '\\Delta f', '\\Delta^2 f'].forEach((h, i) => kit.label(h, [cols[i], 3.7], { size: 18, color: C.gold }));
    kit.label('x', [-6.3, 3.7], { size: 18, color: C.gold });
    const rows = range(0, 5, 6).map((k) => {
      const y = 2.6 - k * 1.05;
      return {
        x: kit.label('', [-6.3, y], { size: 18, tex: false, color: C.grey }),
        f: kit.label('', [cols[0], y], { size: 20, tex: false }),
        d1: kit.label('', [cols[1], y], { size: 20, tex: false, color: C.blue }),
        d2: kit.label('', [cols[2], y], { size: 20, tex: false, color: C.teal }),
      };
    });
    const hl = kit.rect(-7, 2.1, 12.6, 0.95, { color: C.yellow, opacity: 0.1, strokeColor: C.yellow, width: 1.5 });
    const arrows = [kit.arrow([2.6, 0], [1.0, 0], { color: C.teal, width: 2, head: 0.22 }), kit.arrow([-1.0, 0], [-2.6, 0], { color: C.blue, width: 2, head: 0.22 })];
    // brass-like gear wheels for flavour
    cols.map((cx) => kit.line(range(0, 2 * Math.PI, 49).map((a, i) => [cx + (i % 2 ? 0.32 : 0.4) * Math.cos(a), -3.8 + (i % 2 ? 0.32 : 0.4) * Math.sin(a)]), { color: C.gold, width: 2 }));
    return (q) => {
      const p = { x: Math.round(q.x) };
      const start = Math.max(0, Math.min(p.x - 2, 45 - 5));
      rows.forEach((r, k) => {
        const x = start + k;
        const v = euler(x);
        r.x.set(`${x}`);
        r.f.set(`${v}`).color(isPrime(v) ? C.white : C.red);
        r.d1.set(`${2 * x + 2}`);
        r.d2.set('2');
      });
      const k = p.x - start;
      const y = 2.6 - k * 1.05;
      hl.set(-7, y - 0.47, 12.6, 0.95);
      arrows[0].set([cols[2] - 0.8, y - 0.35], [cols[1] + 0.8, y - 0.35]);
      arrows[1].set([cols[1] - 0.8, y - 0.35], [cols[0] + 0.8, y - 0.35]);
    };
  },
};

// ---------------------------------------------------------------------------
// Turing machine that adds one
// ---------------------------------------------------------------------------
const runTM = (input, steps0) => {
  const steps = Math.round(steps0);
  const tape = ['_', '_', ...input.split(''), '_'];
  let head = tape.length - 2;
  let halted = false;
  let n = 0;
  for (; n < steps && !halted; n++) {
    if (tape[head] === '1') {
      tape[head] = '0';
      head -= 1;
    } else {
      tape[head] = '1';
      halted = true;
    }
  }
  return { tape, head, halted, n };
};
const haltSteps = (input) => runTM(input, 99).n;
export const turing_machine = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the input that takes the most steps, and run it until the machine halts.',
  goal: (t) => t.input === '1111' && runTM(t.input, t.step).halted,
  params: [
    { key: 'input', label: 'Number on the tape', type: 'choice', value: '1011', options: [{ value: '1010', label: '1010 (ten)' }, { value: '1011', label: '1011 (eleven)' }, { value: '1111', label: '1111 (fifteen)' }] },
    { key: 'step', label: 'Steps taken', min: 0, max: 6, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Eleven on the tape. The head reads 1: write 0, move left, keep carrying.', set: { input: '1011', step: 1 } },
    { say: 'Another 1 becomes 0. Then a 0 becomes 1 and the machine halts: 1100 = twelve, in 3 steps.', set: { input: '1011', step: 3 } },
    { say: 'Fifteen: four carries, then the blank becomes 1. 10000 = sixteen after 5 steps, the most of the three.', set: { input: '1111', step: 5 } },
  ],
  readout: (p) => {
    const r = runTM(p.input, p.step);
    const val = parseInt(r.tape.join('').replace(/_/g, '') || '0', 2);
    return [
      ['State', r.halted ? 'HALT' : 'carry'],
      ['Tape now', `${r.tape.join('').replace(/_/g, '')} = ${val}`],
      ['Steps to halt for this input', `${haltSteps(p.input)}`],
    ];
  },
  setup(kit) {
    const n = 7;
    const w = 1.2;
    const x0 = -((n - 1) * w) / 2;
    const cells = range(0, n - 1, n).map((i) => kit.rect(x0 + i * w - 0.55, 0.2, 1.1, 1.3, { color: 0x1f2630, strokeColor: C.axis, width: 2, opacity: 1 }));
    const syms = range(0, n - 1, n).map((i) => kit.label('', [x0 + i * w, 0.85], { size: 30, tex: false }));
    const head = kit.arrow([0, -1.6], [0, -0.1], { color: C.yellow, width: 4, head: 0.35 });
    const state = kit.label('', [0, -2.1], { size: 16, tex: false, color: C.yellow });
    kit.label('\\text{rules: read 1 → write 0, move left;  read 0 or blank → write 1, halt}', [0, 3.2], { size: 13 });
    kit.label('\\text{tape}', [x0 - 1.4, 0.85], { size: 13, color: C.grey });
    return (p) => {
      const r = runTM(p.input, p.step);
      const pad = n - r.tape.length;
      const tape = [...Array(pad).fill('_'), ...r.tape];
      syms.forEach((s, i) => s.set(tape[i] === '_' ? '' : tape[i]).color(tape[i] === '1' ? C.white : C.grey));
      cells.forEach((c, i) => c.color(i === r.head + pad ? 0x3a3520 : 0x1f2630));
      const hx = x0 + (r.head + pad) * w;
      head.set([hx, -1.6], [hx, 0.05]).color(r.halted ? C.green : C.yellow);
      state.set(r.halted ? 'HALT' : 'state: carry').color(r.halted ? C.green : C.yellow).pos([hx, -2.1]);
    };
  },
};

// ---------------------------------------------------------------------------
// Shannon entropy of a biased coin
// ---------------------------------------------------------------------------
const H = (p) => (p <= 0 || p >= 1 ? 0 : -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p)));
export const entropy_coin = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a bias (heads below 50%) at which each toss carries exactly half a bit.',
  goal: (t) => t.p < 0.5 && Math.abs(H(t.p) - 0.5) < 0.02,
  params: [{ key: 'p', label: 'Chance of heads', min: 0, max: 1, step: 0.01, value: 0.5 }],
  beats: [
    { say: 'A fair coin: you cannot predict it at all. Each toss carries 1 full bit.', set: { p: 0.5 } },
    { say: 'Heads only 11% of the time: mostly tails, so each toss tells you about half a bit.', set: { p: 0.11 } },
    { say: 'A two-tailed coin: no surprise, no information. 0 bits.', set: { p: 0 } },
  ],
  readout: (p) => [
    ['Chance of heads', `${Math.round(p.p * 100)}%`],
    ['Entropy H', `${r3(H(p.p))} bits per toss`],
    ['1000 tosses need at least', `${Math.ceil(1000 * H(p.p))} bits`],
  ],
  setup(kit) {
    const rand = rng(17);
    const u = range(0, 39, 40).map(() => rand());
    const coins = u.map((_, i) => kit.dot([-7.3 + (i % 20) * 0.4, 3.6 - Math.floor(i / 20) * 0.5], { r: 0.15, color: C.gold }));
    kit.label('\\text{40 tosses: gold = heads, blue = tails}', [-3.5, 2.4], { size: 12 });
    const P = kit.plane({ x: [0, 1, 0.1], y: [0, 1, 0.25], sx: 12 / 1, sy: 5 / 1, origin: [-6, -3.6], axisAt: [0, 0], xEvery: 0.25, yEvery: 0.25, xLabel: '\\text{chance of heads}', yLabel: '\\text{bits per toss}' });
    kit.curve(H, [0.001, 0.999], { plane: P, color: C.blue, width: 3, samples: 200 });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    const drop = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    return (p) => {
      coins.forEach((c, i) => c.color(u[i] < p.p ? C.gold : C.blue));
      dot.set(P.toW(p.p, H(p.p)));
      drop.set([P.toW(p.p, 0), P.toW(p.p, H(p.p))]);
    };
  },
};

// ---------------------------------------------------------------------------
// Moore's law with real chips
// ---------------------------------------------------------------------------
const CHIPS = [
  [1971, 2300, '4004'],
  [1974, 4500, '8080'],
  [1978, 29000, '8086'],
  [1985, 275000, '80386'],
  [1989, 1.18e6, '80486'],
  [1993, 3.1e6, 'Pentium'],
  [2000, 4.2e7, 'Pentium 4'],
  [2006, 2.91e8, 'Core 2 Duo'],
  [2020, 1.6e10, 'Apple M1'],
];
const mooreErr = (T) => CHIPS.reduce((s, [y, n]) => s + (Math.log10(2300) + ((y - 1971) / T) * Math.log10(2) - Math.log10(n)) ** 2, 0);
export const moores_law = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the doubling time (to the nearest tenth of a year) that best fits the real chips.',
  goal: (t) => {
    const best = range(1, 4, 31).reduce((a, T) => (mooreErr(T) < mooreErr(a) ? T : a), 1);
    return Math.abs(t.T - best) < 0.051;
  },
  params: [{ key: 'T', label: 'Doubling time (years)', min: 1, max: 4, step: 0.1, value: 1 }],
  beats: [
    { say: 'Moore’s first guess (1965): doubling every year. By 2020 the line overshoots real chips about a hundred million times.', set: { T: 1 } },
    { say: 'His 1975 revision, every two years, runs right through the points for half a century.', set: { T: 2 } },
    { say: 'Every three years would have badly undershot: the M1 has far more transistors than this line predicts.', set: { T: 3 } },
  ],
  readout: (p) => {
    const pred = Math.log10(2300) + ((2020 - 1971) / p.T) * Math.log10(2);
    return [
      ['Line predicts for 2020', big(pred)],
      ['Apple M1 (2020) actually has', '1.6 × 10¹⁰'],
      ['Fit error (smaller is better)', r2(mooreErr(p.T))],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [1970, 2022, 10], y: [3, 12, 1], sx: 13 / 52, sy: 7 / 9, origin: [-6.5 - 1970 * (13 / 52), -3.5 - 3 * (7 / 9)], axisAt: [1970, 3], xEvery: 10, yEvery: 1, fmt: (v, a) => (a === 'y' ? pow10(v) : `${v}`), xLabel: '\\text{year}', yLabel: '\\text{transistors}' });
    CHIPS.forEach(([y, n, name], i) => {
      kit.dot(P.toW(y, Math.log10(n)), { r: 0.12, color: C.gold, z: 6 });
      kit.label(name, P.toW(y + 0.6, Math.log10(n) + (i % 2 ? -0.45 : 0.45)), { size: 11, tex: false, color: C.gold, align: 'left' });
    });
    const line = kit.line([], { color: C.blue, width: 3, create: false });
    return (p) => {
      const at = (y) => Math.log10(2300) + ((y - 1971) / p.T) * Math.log10(2);
      const yEnd = Math.min(2022, 1971 + ((12 - Math.log10(2300)) / Math.log10(2)) * p.T);
      line.set([P.toW(1971, at(1971)), P.toW(yEnd, at(yEnd))]);
    };
  },
};

// ---------------------------------------------------------------------------
// Searching: check every item vs halving
// ---------------------------------------------------------------------------
export const search_race = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the smallest list size (a power of ten) for which halving search needs 30 looks in the worst case.',
  goal: (t) => t.k === 9,
  params: [{ key: 'k', label: 'List size: 10 to the power', min: 1, max: 12, step: 1, value: 3 }],
  beats: [
    { say: 'A thousand names: checking each could take 1000 looks; halving takes at most 10.', set: { k: 3 } },
    { say: 'A million: a million looks against 20.', set: { k: 6 } },
    { say: 'A billion (every person in several countries): halving needs only 30 looks.', set: { k: 9 } },
  ],
  readout: (p) => [
    ['List size', big(p.k)],
    ['Check every item (worst case)', big(p.k)],
    ['Halving (worst case)', `${Math.ceil(Math.log2(10 ** p.k + 1))}`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 12, 1], y: [0, 12, 2], sx: 12 / 12, sy: 7 / 12, origin: [-5.5, -3.5], axisAt: [0, 0], xEvery: 2, yEvery: 2, fmt: (v, a) => (a === 'y' ? (v ? pow10(v) : '1') : pow10(v)), xLabel: '\\text{list size}', yLabel: '\\text{looks}' });
    kit.line([P.toW(0, 0), P.toW(12, 12)], { color: C.red, width: 3 });
    kit.label('\\text{check every item}', P.toW(8.2, 9.6), { size: 13, color: C.red });
    kit.curve((k) => Math.log10(Math.ceil(Math.log2(10 ** k + 1))), [0, 12], { plane: P, color: C.green, width: 3, samples: 13 });
    kit.label('\\text{halving}', P.toW(9.5, 2.3), { size: 13, color: C.green });
    const d1 = kit.dot([0, 0], { r: 0.14, color: C.red, z: 6 });
    const d2 = kit.dot([0, 0], { r: 0.14, color: C.green, z: 6 });
    const gap = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    return (p) => {
      const h = Math.log10(Math.ceil(Math.log2(10 ** p.k + 1)));
      d1.set(P.toW(p.k, p.k));
      d2.set(P.toW(p.k, h));
      gap.set([P.toW(p.k, h), P.toW(p.k, p.k)]);
    };
  },
};

// ---------------------------------------------------------------------------
// Euclid's method traced step by step
// ---------------------------------------------------------------------------
const euclidSteps = (a0, b0) => {
  const out = [];
  const a = Math.round(a0);
  const b = Math.round(b0);
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  while (y) {
    out.push([x, y, x % y]);
    [x, y] = [y, x % y];
  }
  return { steps: out, gcd: x };
};
export const euclid_trace = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the pair of numbers up to 100 that needs the most passes of the loop.',
  goal: (t) => euclidSteps(t.a, t.b).steps.length === 9,
  params: [
    { key: 'a', label: 'a', min: 1, max: 100, step: 1, value: 48 },
    { key: 'b', label: 'b', min: 1, max: 100, step: 1, value: 18 },
  ],
  beats: [
    { say: '48 and 18: 48 = 2 × 18 + 12, then 18 = 1 × 12 + 6, then 12 = 2 × 6 + 0. GCD 6 in 3 passes.', set: { a: 48, b: 18 } },
    { say: '100 and 99: one pass leaves 1, the next finishes. Big numbers can be quick.', set: { a: 100, b: 99 } },
    { say: '89 and 55, neighbours in the Fibonacci sequence: every quotient is 1, so it takes 9 passes, the most possible under 100.', set: { a: 89, b: 55 } },
  ],
  readout: (p) => {
    const e = euclidSteps(p.a, p.b);
    return [
      ['Passes of the loop', `${e.steps.length}`],
      ['Greatest common divisor', `${e.gcd}`],
      ['Last line', e.steps.length ? `${e.steps.at(-1)[0]} mod ${e.steps.at(-1)[1]} = 0` : '—'],
    ];
  },
  setup(kit) {
    kit.label('\\text{while } b \\ne 0:\\quad (a, b) \\leftarrow (b,\\ a \\bmod b)', [0, 3.8], { size: 16, color: C.gold });
    const lines = range(0, 9, 10).map((k) => kit.label('', [-1.2, 2.9 - k * 0.62], { size: 15, tex: false, align: 'left' }));
    const nums = range(0, 9, 10).map((k) => kit.label('', [-6.6, 2.9 - k * 0.62], { size: 13, tex: false, color: C.grey }));
    const bars = range(0, 9, 10).map((k) => kit.rect(-6, 2.68 - k * 0.62, 1, 0.42, { color: C.blue, stroke: false, opacity: 0.8 }));
    const bars2 = range(0, 9, 10).map((k) => kit.rect(-6, 2.68 - k * 0.62, 1, 0.42, { color: C.gold, stroke: false, opacity: 0.6 }));
    return (p) => {
      const e = euclidSteps(p.a, p.b);
      const sc = 4.4 / Math.max(Math.round(p.a), Math.round(p.b), 1);
      lines.forEach((l, k) => {
        const s = e.steps[k];
        l.visible(Boolean(s));
        nums[k].visible(Boolean(s));
        bars[k].visible(Boolean(s));
        bars2[k].visible(Boolean(s));
        if (!s) return;
        const [x, y, r] = s;
        l.set(`${x} = ${Math.floor(x / y)} × ${y} + ${r}`).color(r === 0 ? C.green : C.text);
        nums[k].set(`${k + 1}`);
        bars[k].set(-6, 2.68 - k * 0.62, x * sc, 0.2);
        bars2[k].set(-6, 2.68 - k * 0.62 + 0.22, y * sc, 0.2);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Routing packets around a broken link
// ---------------------------------------------------------------------------
const NODES = { A: [-6.5, 0], B: [-3.5, 2.2], C: [-3.5, -2.2], D: [0, 2.8], E: [0, -0.2], F: [3.5, 1.8], H: [3.5, -2.4], G: [6.5, 0] };
const LINKS = [
  ['A', 'B', 10],
  ['A', 'C', 15],
  ['B', 'D', 12],
  ['B', 'E', 20],
  ['C', 'E', 10],
  ['C', 'H', 30],
  ['D', 'F', 10],
  ['E', 'F', 15],
  ['E', 'H', 12],
  ['F', 'G', 10],
  ['H', 'G', 15],
];
const route = (broken) => {
  const dist = Object.fromEntries(Object.keys(NODES).map((k) => [k, Infinity]));
  const prev = {};
  dist.A = 0;
  const left = new Set(Object.keys(NODES));
  while (left.size) {
    const u = [...left].reduce((m, k) => (dist[k] < dist[m] ? k : m));
    left.delete(u);
    for (const [a, b, d] of LINKS) {
      if (`${a}${b}` === broken) continue;
      const v = a === u ? b : b === u ? a : null;
      if (v && left.has(v) && dist[u] + d < dist[v]) {
        dist[v] = dist[u] + d;
        prev[v] = u;
      }
    }
  }
  const path = ['G'];
  while (path[0] !== 'A') path.unshift(prev[path[0]]);
  return { d: dist.G, path };
};
export const packet_route = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the single broken link that slows the message from A to G the most.',
  goal: (t) => t.cut === 'FG',
  params: [{ key: 'cut', label: 'Broken link', type: 'choice', value: 'none', options: [{ value: 'none', label: 'None' }, ...['AB', 'BD', 'DF', 'FG', 'EF'].map((k) => ({ value: k, label: `${k[0]}–${k[1]}` }))] }],
  beats: [
    { say: 'All links up: the fastest route is A → B → D → F → G, 42 ms.', set: { cut: 'none' } },
    { say: 'Cut B–D and the packets simply go A → C → E → F → G: 50 ms. Nobody had to be told.', set: { cut: 'BD' } },
    { say: 'Cut F–G, the last hop: they must swing south through H. 52 ms, the worst single failure here.', set: { cut: 'FG' } },
  ],
  readout: (p) => {
    const r = route(p.cut);
    return [
      ['Route', r.path.join(' → ')],
      ['Delay', `${r.d} ms`],
      ['Extra delay from the break', `${r.d - 42} ms`],
    ];
  },
  setup(kit) {
    const links = LINKS.map(([a, b, d]) => {
      const A = NODES[a];
      const B = NODES[b];
      const l = kit.line([A, B], { color: C.grey, width: 3 });
      const m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + 0.3];
      kit.label(`${d}`, m, { size: 12, tex: false, color: C.grey });
      return { key: `${a}${b}`, l };
    });
    Object.entries(NODES).forEach(([k, q]) => {
      kit.dot(q, { r: 0.32, color: k === 'A' || k === 'G' ? C.gold : 0x2a3340, z: 5 });
      kit.label(k, q, { size: 15, tex: false, color: C.white });
    });
    const pkt = kit.dot([0, 0], { r: 0.13, color: C.yellow, z: 7 });
    let path = [];
    return (p, t, time) => {
      const r = route(p.cut);
      path = r.path.map((k) => NODES[k]);
      const on = new Set(r.path.slice(1).map((k, i) => [r.path[i], k].sort().join('')));
      links.forEach(({ key, l }) => {
        if (key === p.cut) l.color(C.red);
        else l.color(on.has(key.split('').sort().join('')) ? C.green : 0x3a414c);
      });
      // a packet running along the route
      const f = ((time ?? 0) * 0.35) % 1;
      const seg = f * (path.length - 1);
      const i = Math.min(path.length - 2, Math.floor(seg));
      const s = seg - i;
      pkt.set([path[i][0] + (path[i + 1][0] - path[i][0]) * s, path[i][1] + (path[i + 1][1] - path[i][1]) * s]);
    };
  },
};

// ---------------------------------------------------------------------------
// Gradient descent on a bowl
// ---------------------------------------------------------------------------
const gdPath = (lr, n) => {
  const ws = [-1];
  for (let i = 0; i < Math.round(n); i++) ws.push(ws[i] - lr * 2 * (ws[i] - 3));
  return ws;
};
export const gradient_descent = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the largest learning rate for which the steps still settle at the bottom.',
  goal: (t) => Math.abs(t.lr - 0.95) < 1e-6,
  params: [
    { key: 'lr', label: 'Learning rate η', min: 0.05, max: 1.1, step: 0.05, value: 0.1 },
    { key: 'n', label: 'Steps', min: 0, max: 12, step: 1, value: 6 },
  ],
  beats: [
    { say: 'η = 0.1: small, safe steps. Each one removes 20% of the distance to the bottom.', set: { lr: 0.1, n: 8 } },
    { say: 'η = 0.5: one giant step lands exactly at w = 3. For this bowl that is the perfect rate.', set: { lr: 0.5, n: 3 } },
    { say: 'η = 0.9: overshoots back and forth but still closes in. At η = 1 it would bounce forever; above that it flies off.', set: { lr: 0.9, n: 10 } },
  ],
  readout: (p) => {
    const w = gdPath(p.lr, p.n);
    const last = w.at(-1);
    return [
      ['w after the steps', r3(last)],
      ['Loss (w − 3)²', r3((last - 3) ** 2)],
      ['Each step multiplies the error by', r2(1 - 2 * p.lr)],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-6, 12, 2], y: [0, 50, 10], sx: 14 / 18, sy: 7.2 / 50, origin: [-7 + 6 * (14 / 18), -3.6], axisAt: [-6, 0], xEvery: 2, yEvery: 10, xLabel: 'w', yLabel: 'L(w)' });
    kit.curve((w) => (w - 3) ** 2, [-6, 12], { plane: P, color: C.blue, width: 3, clipY: [0, 50] });
    const path = kit.line([], { color: C.gold, width: 2, create: false });
    const dots = range(0, 12, 13).map(() => kit.dot([0, 0], { r: 0.09, color: C.gold, z: 5 }));
    const now = kit.dot([0, 0], { r: 0.15, color: C.white, z: 6 });
    return (p) => {
      const ws = gdPath(p.lr, p.n).map((w) => Math.max(-6, Math.min(12, w)));
      const pts = ws.map((w) => P.toW(w, Math.min(50, (w - 3) ** 2)));
      path.set(pts);
      dots.forEach((d, i) => d.visible(i < pts.length).set(pts[Math.min(i, pts.length - 1)]));
      now.set(pts.at(-1));
    };
  },
};

// ---------------------------------------------------------------------------
// One neuron: what a straight line can separate
// ---------------------------------------------------------------------------
const TARGETS = { and: [0, 0, 0, 1], or: [0, 1, 1, 1], xor: [0, 1, 1, 0] };
const CORNERS = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];
const fire = (p, [x, y]) => (p.w1 * x + p.w2 * y + p.b > 0 ? 1 : 0);
const score = (p) => CORNERS.filter((c, i) => fire(p, c) === TARGETS[p.data][i]).length;
export const neuron_line = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Choose OR and set the weights so the neuron gets all four corners right.',
  goal: (t) => t.data === 'or' && score(t) === 4,
  params: [
    { key: 'data', label: 'Data set', type: 'choice', value: 'and', options: [{ value: 'and', label: 'AND' }, { value: 'or', label: 'OR' }, { value: 'xor', label: 'XOR' }] },
    { key: 'w1', label: 'Weight w₁', min: -2, max: 2, step: 0.5, value: 1 },
    { key: 'w2', label: 'Weight w₂', min: -2, max: 2, step: 0.5, value: 1 },
    { key: 'b', label: 'Bias b', min: -3, max: 3, step: 0.5, value: -1.5 },
  ],
  beats: [
    { say: 'AND: only (1, 1) should fire. w₁ = w₂ = 1, b = −1.5 puts the line just below that corner.', set: { data: 'and', w1: 1, w2: 1, b: -1.5 } },
    { say: 'OR: anything with a 1 fires. Raise the bias to −0.5 and the line slides down past three corners.', set: { data: 'or', w1: 1, w2: 1, b: -0.5 } },
    { say: 'XOR: (0, 1) and (1, 0) fire, the diagonal corners do not. No straight line can do it: 3 of 4 is the best. This is the 1969 Perceptrons objection.', set: { data: 'xor', w1: 1, w2: 1, b: -0.5 } },
  ],
  readout: (p) => [
    ['Corners right', `${score(p)} of 4`],
    ['Outputs for (0,0) (0,1) (1,0) (1,1)', CORNERS.map((c) => fire(p, c)).join(' ')],
    ['Wanted', TARGETS[p.data].join(' ')],
  ],
  setup(kit) {
    const S = 5;
    const O = [-2.5, -2.8];
    const toW = (x, y) => [O[0] + x * S, O[1] + y * S];
    kit.rect(...toW(-0.15, -0.15), 1.3 * S, 1.3 * S, { color: 0x151b24, strokeColor: C.gridFaint, width: 1, opacity: 1 });
    const fillOn = kit.fill([], { color: C.green, opacity: 0.15 });
    const boundary = kit.line([], { color: C.yellow, width: 3, create: false });
    const dots = CORNERS.map((c) => kit.dot(toW(...c), { r: 0.3, color: C.grey, z: 5 }));
    const rings = CORNERS.map((c) => kit.line(range(0, 2 * Math.PI, 40).map((a) => [toW(...c)[0] + 0.45 * Math.cos(a), toW(...c)[1] + 0.45 * Math.sin(a)]), { color: C.red, width: 3 }));
    CORNERS.forEach((c) => kit.label(`(${c[0]}, ${c[1]})`, [toW(...c)[0], toW(...c)[1] - 0.65], { size: 12, tex: false, color: C.grey }));
    kit.label('\\text{filled = wanted 1,  green area = neuron fires,  red ring = wrong}', [0.75, 4.0], { size: 12 });
    // clip the half-plane w1 x + w2 y + b > 0 to the box [-0.15, 1.15]^2
    const clip = (p) => {
      const box = [
        [-0.15, -0.15],
        [1.15, -0.15],
        [1.15, 1.15],
        [-0.15, 1.15],
      ];
      const f = ([x, y]) => p.w1 * x + p.w2 * y + p.b;
      const out = [];
      for (let i = 0; i < 4; i++) {
        const a = box[i];
        const b = box[(i + 1) % 4];
        const fa = f(a);
        const fb = f(b);
        if (fa > 0) out.push(a);
        if (fa > 0 !== fb > 0) {
          const s = fa / (fa - fb);
          out.push([a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s]);
        }
      }
      return out;
    };
    return (p) => {
      const poly = clip(p);
      fillOn.set(poly.map((q) => toW(...q)));
      const cut = [];
      const box = [
        [-0.15, -0.15],
        [1.15, -0.15],
        [1.15, 1.15],
        [-0.15, 1.15],
      ];
      const f = ([x, y]) => p.w1 * x + p.w2 * y + p.b;
      for (let i = 0; i < 4; i++) {
        const a = box[i];
        const b = box[(i + 1) % 4];
        const fa = f(a);
        const fb = f(b);
        if (fa > 0 !== fb > 0) {
          const s = fa / (fa - fb);
          cut.push(toW(a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s));
        }
      }
      boundary.set(cut.length === 2 ? cut : []);
      CORNERS.forEach((c, i) => {
        const want = TARGETS[p.data][i];
        dots[i].color(want ? C.gold : 0x3a414c);
        rings[i].visible(fire(p, c) !== want);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Softmax and temperature
// ---------------------------------------------------------------------------
const WORDS = [
  ['red', 3.0],
  ['orange', 2.6],
  ['white', 1.5],
  ['softly', 1.2],
  ['blue', -1.0],
];
const softmax = (T) => {
  const e = WORDS.map(([, z]) => Math.exp(z / T));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / s);
};
export const next_word = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the lowest temperature at which the top word, "red", has less than a 40% chance.',
  goal: (t) => softmax(t.T)[0] < 0.4 && softmax(Math.round((t.T - 0.1) * 10) / 10)[0] >= 0.4,
  params: [{ key: 'T', label: 'Temperature T', min: 0.1, max: 3, step: 0.1, value: 1 }],
  beats: [
    { say: 'T = 1: the model’s own probabilities. "red" 48%, "orange" 32%, and a small chance of the odd "blue".', set: { T: 1 } },
    { say: 'T = 0.2: nearly always "red". Predictable, safe, and repetitive over a long text.', set: { T: 0.2 } },
    { say: 'T = 3: the choices flatten out. "blue", a strange word for glowing steel, now has 8%.', set: { T: 3 } },
  ],
  readout: (p) => {
    const q = softmax(p.T);
    return [
      ['P("red")', `${Math.round(q[0] * 1000) / 10}%`],
      ['P("blue")', `${Math.round(q[4] * 1000) / 10}%`],
      ['Temperature', r1(p.T)],
    ];
  },
  setup(kit) {
    kit.label('\\text{“The steel bar was heated until it glowed …”}', [0, 3.9], { size: 15, color: C.gold });
    const x0 = -4.2;
    const bars = WORDS.map(([w], i) => {
      const y = 2.5 - i * 1.2;
      kit.label(w, [x0 - 0.3, y + 0.25], { size: 15, tex: false, align: 'right' });
      kit.rect(x0, y, 10, 0.5, { color: 0x1a212b, stroke: false, opacity: 1 });
      return { r: kit.rect(x0, y, 1, 0.5, { color: i === 0 ? C.red : i === 1 ? C.gold : i === 4 ? C.blue : C.teal, stroke: false, opacity: 0.85, z: 2 }), l: kit.label('', [0, y + 0.25], { size: 13, tex: false, align: 'left' }), y };
    });
    return (p) => {
      const q = softmax(p.T);
      bars.forEach((b, i) => {
        const w = Math.max(0.02, q[i] * 10);
        b.r.set(x0, b.y, w, 0.5);
        b.l.set(`${Math.round(q[i] * 1000) / 10}%`).pos([x0 + w + 0.2, b.y + 0.25]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Training compute over time
// ---------------------------------------------------------------------------
const MODELS = [
  [2012.7, 4.7e17, 'AlexNet'],
  [2017.8, 3.4e23, 'AlphaGo Zero'],
  [2020.4, 3.14e23, 'GPT-3'],
  [2023.2, 2.1e25, 'GPT-4 (estimate)'],
];
const trendErr = (d) => MODELS.reduce((s, [y, c]) => s + (Math.log10(4.7e17) + ((y - 2012.7) * 12 * Math.log10(2)) / d - Math.log10(c)) ** 2, 0);
export const compute_trend = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the doubling time (in months) that best fits these four milestone models.',
  goal: (t) => {
    const best = range(3, 24, 43).reduce((a, d) => (trendErr(d) < trendErr(a) ? d : a), 3);
    return Math.abs(t.d - best) < 0.26;
  },
  params: [{ key: 'd', label: 'Doubling time (months)', min: 3, max: 24, step: 0.5, value: 24 }],
  beats: [
    { say: 'Moore’s-law pace, doubling every 24 months: the line falls far below the real models.', set: { d: 24 } },
    { say: 'Doubling every 6 months, the rate a 2022 study found across over 100 models, comes close.', set: { d: 6 } },
    { say: 'For just these four, about 4.5 months fits best: training compute grew roughly 100 million-fold in a decade.', set: { d: 4.5 } },
  ],
  readout: (p) => [
    ['Growth per year', `× ${r1(2 ** (12 / p.d))}`],
    ['Line predicts for early 2023', big(Math.log10(4.7e17) + ((2023.2 - 2012.7) * 12 * Math.log10(2)) / p.d)],
    ['Fit error (smaller is better)', r2(trendErr(p.d))],
  ],
  setup(kit) {
    const P = kit.plane({ x: [2012, 2024, 2], y: [16, 26, 1], sx: 13 / 12, sy: 7 / 10, origin: [-6.5 - 2012 * (13 / 12), -3.5 - 16 * 0.7], axisAt: [2012, 16], xEvery: 2, yEvery: 3, fmt: (v, a) => (a === 'y' ? pow10(v) : `${v}`), xLabel: '\\text{year}', yLabel: '\\text{operations to train}' });
    MODELS.forEach(([y, c, name], i) => {
      kit.dot(P.toW(y, Math.log10(c)), { r: 0.14, color: C.gold, z: 6 });
      kit.label(name, P.toW(y - 0.2, Math.log10(c) + (i === 1 ? 0.6 : -0.6)), { size: 12, tex: false, color: C.gold, align: i === 3 ? 'right' : 'left' });
    });
    const line = kit.line([], { color: C.blue, width: 3, create: false });
    return (p) => {
      const at = (y) => Math.log10(4.7e17) + ((y - 2012.7) * 12 * Math.log10(2)) / p.d;
      const yEnd = Math.min(2024, 2012.7 + ((26 - Math.log10(4.7e17)) * p.d) / (12 * Math.log10(2)));
      line.set([P.toW(2012.7, at(2012.7)), P.toW(yEnd, at(yEnd))]);
    };
  },
};
