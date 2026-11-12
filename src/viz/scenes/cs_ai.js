// Computer Science program: the Artificial Intelligence track (ai-001 to ai-014).
// Story scenes: hidden params drive the reveals, touching a control switches
// to the `free` values. Toy numbers are labelled as such in the narration.
import { C } from '../theme';

const R = Math.round;
const r2 = (v) => `${Math.round(v * 100) / 100}`;
const r3 = (v) => `${Math.round(v * 1000) / 1000}`;
const mono = { tex: false, cls: 'mono' };
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function gauss(rand) {
  const u = Math.max(1e-9, rand());
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const sigmoid = (x) => 1 / (1 + Math.exp(-x));

// ---------------------------------------------------------------------------
// ai-001: the perceptron rule, one example at a time
// ---------------------------------------------------------------------------
const GATES = { and: [0, 0, 0, 1], or: [0, 1, 1, 1], xor: [0, 1, 1, 0] };
const PTS = [[0, 0], [0, 1], [1, 0], [1, 1]];
function perceptronRun(gate, steps) {
  let w = [0, 0];
  let b = -0.2;
  let last = -1;
  for (let s = 0; s < steps; s++) {
    const i = s % 4;
    const [x1, x2] = PTS[i];
    const y = w[0] * x1 + w[1] * x2 + b > 0 ? 1 : 0;
    const e = GATES[gate][i] - y;
    w = [w[0] + 0.5 * e * x1, w[1] + 0.5 * e * x2];
    b += 0.5 * e;
    last = i;
  }
  const wrong = PTS.map(([x1, x2], j) => ((w[0] * x1 + w[1] * x2 + b > 0 ? 1 : 0) !== GATES[gate][j] ? 1 : 0));
  return { w, b, last, wrong };
}
export const perceptron_line = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Train on OR until there are no mistakes. Then switch to XOR and train as long as you like.',
  goal: (t, seen) => t.gate === 'xor' && !!seen.gate?.has('or') && R(t.step) >= 16,
  params: [
    { key: 'gate', label: 'Teach it', type: 'choice', value: 'and', options: [{ value: 'and', label: 'AND' }, { value: 'or', label: 'OR' }, { value: 'xor', label: 'XOR' }] },
    { key: 'step', label: 'Examples seen', min: 0, max: 40, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Four inputs, each a pair of 0s and 1s. We want the AND answer: 1 (gold) only when both inputs are 1. A neuron starts knowing nothing: weights 0, and a small negative bias so it answers 0 by default.', set: { gate: 'and', step: 0 }, ms: 11000 },
    { say: 'The neuron computes w₁x₁ + w₂x₂ + b and fires if it is above 0. The line where that sum is exactly 0 splits the square into a “1” side and a “0” side.', set: { step: 5 }, ms: 11000, notes: [{ text: 'the dividing line: w₁x₁ + w₂x₂ + b = 0', at: [3.6, 3.4], to: [-3.4, -1.3] }] },
    { say: 'Rosenblatt’s rule: show one example. If the answer is wrong, nudge each weight toward the right answer; if right, change nothing. Watch the line swing after mistakes.', set: { step: 10 }, ms: 11500 },
    { say: 'After about twenty examples the line separates the single 1 from the three 0s. No more mistakes: the neuron has learned AND from examples alone.', set: { step: 24 }, ms: 11000, notes: [{ text: 'every point on its correct side', at: [3.6, -3.4], to: [-1.0, -2.0], color: C.green }] },
    { say: 'OR is learned even faster. But now XOR: 1 when exactly one input is 1. The gold points sit on opposite corners.', set: { gate: 'xor', step: 8 }, ms: 11000 },
    { say: 'Train as long as you like: the line keeps swinging and at least one point is always wrong. No straight line can split XOR. Minsky and Papert proved this in 1969, and the cure is a second layer of neurons.', set: { step: 40 }, ms: 13000, notes: [{ text: 'always at least one point wrong', at: [3.6, 3.2], to: [0.1, 1.9], color: C.red }] },
  ],
  readout: (p) => {
    const r = perceptronRun(p.gate, R(p.step));
    return [
      ['Weights', `w₁ = ${r2(r.w[0])}, w₂ = ${r2(r.w[1])}, b = ${r2(r.b)}`],
      ['Mistakes now', `${r.wrong.reduce((a, c) => a + c, 0)} of 4`],
    ];
  },
  setup(kit) {
    const P = ([x1, x2]) => [-4.5 + 5 * x1, -2.3 + 4.6 * x2];
    kit.rect(-5.2, -3.0, 6.4, 6.0, { color: 0x0b1220, opacity: 0.7, strokeColor: C.grid, width: 1.5 });
    kit.label('x_1', [1.6, -3.0], { size: 15, color: C.grey });
    kit.label('x_2', [-5.6, 2.9], { size: 15, color: C.grey });
    const dots = PTS.map((p) => kit.dot(P(p), { r: 0.32 }));
    const rings = PTS.map((p) => kit.line(Array.from({ length: 33 }, (_, k) => [P(p)[0] + 0.55 * Math.cos((k / 32) * 2 * Math.PI), P(p)[1] + 0.55 * Math.sin((k / 32) * 2 * Math.PI)]), { color: C.red, width: 3 }));
    const tags = PTS.map((p) => kit.label(`(${p[0]},${p[1]})`, [P(p)[0], P(p)[1] - 0.7], { tex: false, size: 12, color: C.grey }));
    const line = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 4 });
    const hl = kit.dot([0, 0], { r: 0.42, color: C.yellow, opacity: 0.35 });
    const eq = kit.label('', [4.6, 0.4], { ...mono, size: 17 });
    const rule = kit.label('w \\leftarrow w + 0.5\\,(t - y)\\,x', [4.6, -0.8], { size: 16, color: C.grey });
    void tags;
    void rule;
    return (q) => {
      const r = perceptronRun(q.gate, R(q.step));
      const t = GATES[q.gate];
      dots.forEach((d, j) => d.color(t[j] ? C.gold : C.blue));
      rings.forEach((g, j) => g.visible(R(q.step) > 0 && !!r.wrong[j]));
      hl.visible(r.last >= 0).set(r.last >= 0 ? P(PTS[r.last]) : [0, 0]);
      const [w1, w2] = r.w;
      const b = r.b;
      // Line w1 x1 + w2 x2 + b = 0, drawn across x1, x2 in [-0.12, 1.12].
      const lo = -0.12;
      const hi = 1.12;
      let seg = null;
      if (Math.abs(w2) > 1e-9) {
        const pts = [];
        for (const x1 of [lo, hi]) pts.push([x1, -(w1 * x1 + b) / w2]);
        for (const x2 of [lo, hi]) if (Math.abs(w1) > 1e-9) pts.push([-(w2 * x2 + b) / w1, x2]);
        const ins = pts.filter(([a, c]) => a >= lo - 1e-9 && a <= hi + 1e-9 && c >= lo - 1e-9 && c <= hi + 1e-9);
        if (ins.length >= 2) seg = [ins[0], ins[ins.length - 1]];
      } else if (Math.abs(w1) > 1e-9) {
        const x1 = -b / w1;
        if (x1 >= lo && x1 <= hi) seg = [[x1, lo], [x1, hi]];
      }
      line.visible(!!seg);
      if (seg) line.set(seg.map(P));
      eq.set(`${r2(r.w[0])}·x₁ + ${r2(r.w[1])}·x₂ ${r.b < 0 ? '−' : '+'} ${r2(Math.abs(r.b))} > 0 ?`);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-002: gradient descent on a one-weight loss
// ---------------------------------------------------------------------------
const Lq = (w) => (w - 3) ** 2 + 1;
export const grad_descent = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Find the learning rate that lands on w = 3 in a single step.',
  goal: (t) => Math.abs(t.lr - 0.5) < 0.01 && R(t.k) >= 1,
  params: [
    { key: 'lr', label: 'Learning rate η', min: 0.05, max: 1.1, step: 0.05, value: 0.1 },
    { key: 'k', label: 'Steps taken', min: 0, max: 12, step: 1, value: 0 },
  ],
  beats: [
    { say: 'The curve is a loss: how wrong a model is for each value of one weight w. Training means finding the bottom, here at w = 3. We start at w = −0.5.', set: { lr: 0.1, k: 0 }, ms: 11000, notes: [{ text: 'the best weight: w = 3', at: [3.8, 2.4], to: [0.6, -2.6], color: C.green }] },
    { say: 'We cannot see the whole curve, only the slope where we stand. Here it slopes down to the right, so step right, by η times the slope.', set: { k: 1 }, ms: 11000, notes: [{ text: 'slope = 2(w − 3) = −7', at: [-3.4, 3.6], to: [-5.0, 2.0], color: C.gold }] },
    { say: 'With η = 0.1 each step closes 20% of the remaining gap. Safe, but slow: after twelve steps we are still not quite there.', set: { k: 12 }, ms: 11000 },
    { say: 'Raise η to 0.4: each step closes 80% of the gap. Three or four steps and we are at the bottom.', set: { lr: 0.4, k: 4 }, ms: 10500 },
    { say: 'η = 0.9: each step overshoots to the other side, but by less each time. It still settles, zigzagging.', set: { lr: 0.9, k: 8 }, ms: 10500 },
    { say: 'η = 1.1: every jump lands farther away than the last. The loss explodes. Choosing the learning rate is one of the first things anyone training a model has to get right.', set: { lr: 1.1, k: 6 }, ms: 12000, notes: [{ text: 'too big: it runs away', at: [3.6, 3.6], to: [5.6, 2.2], color: C.red }] },
  ],
  readout: (p) => {
    let w = -0.5;
    for (let i = 0; i < R(p.k); i++) w -= p.lr * 2 * (w - 3);
    return [
      ['w', r3(w)],
      ['Loss L(w)', r3(Lq(w))],
      ['Gap shrinks by', `× ${r2(1 - 2 * p.lr)} per step`],
    ];
  },
  setup(kit) {
    const X = (w) => -6.3 + 1.55 * (w + 1);
    const Y = (L) => -3.2 + 0.42 * L;
    kit.line([[-7, -3.2], [7, -3.2]], { color: C.axis, width: 2 });
    for (let w = -1; w <= 7; w++) kit.label(`${w}`, [X(w), -3.6], { tex: false, size: 12, color: C.grey });
    kit.label('w', [7.3, -3.2], { size: 15, color: C.grey });
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const w = -1 + (8 * i) / 120;
      pts.push([X(w), Y(Lq(w))]);
    }
    kit.line(pts, { color: C.blue, width: 3 });
    const trail = kit.line([[0, 0], [0, 0]], { color: C.gold, width: 2.5 });
    const marks = Array.from({ length: 13 }, () => kit.dot([0, 0], { r: 0.1, color: C.gold }));
    const ball = kit.dot([0, 0], { r: 0.22, color: C.yellow, glow: true });
    const tan = kit.line([[0, 0], [0, 0]], { color: C.gold, width: 2 });
    return (q) => {
      const ws = [-0.5];
      for (let i = 0; i < R(q.k); i++) ws.push(ws[ws.length - 1] - q.lr * 2 * (ws[ws.length - 1] - 3));
      const clampW = (w) => Math.max(-1, Math.min(7, w));
      const path = [];
      ws.forEach((w, i) => {
        const cw = clampW(w);
        path.push([X(cw), Y(Lq(cw))]);
        if (i < ws.length - 1) {
          const nw = clampW(ws[i + 1]);
          path.push([X(nw), Y(Lq(nw))]);
        }
      });
      trail.set(path.length > 1 ? path : [[0, 0], [0, 0]]);
      trail.visible(path.length > 1);
      marks.forEach((m, i) => {
        const on = i < ws.length - 1;
        m.visible(on);
        if (on) m.set([X(clampW(ws[i])), Y(Lq(clampW(ws[i])))]);
      });
      const w = clampW(ws[ws.length - 1]);
      ball.set([X(w), Y(Lq(w))]);
      const s = 2 * (w - 3);
      const d = 0.9;
      tan.set([[X(w - d), Y(Lq(w) - s * d)], [X(w + d), Y(Lq(w) + s * d)]]);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-003: forward values and backward slopes in a tiny graph
// ---------------------------------------------------------------------------
export const backprop_chain = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Use the slope ∂L/∂w to choose w so that the loss becomes exactly 0.',
  goal: (t) => Math.abs(t.w * 2 + 1 - 5) < 1e-6,
  params: [
    { key: 'w', label: 'Weight w', min: -1, max: 4, step: 0.5, value: 3 },
    { key: 'phase', hidden: true, value: 3 },
  ],
  free: { phase: 3 },
  beats: [
    { say: 'The smallest possible network: an input x = 2, a weight w = 3, a bias b = 1, a target t = 5. It computes z = wx + b and a loss L = (z − t)².', set: { w: 3, phase: 0 }, ms: 11000 },
    { say: 'Forward pass, left to right: wx = 6, then z = 7, then the error z − t = 2, and the loss L = 4.', set: { phase: 1 }, ms: 10500, notes: [{ text: 'values flow forward', at: [-1.2, 3.6], to: [1.4, 0.8] }] },
    { say: 'Backward pass, right to left. Start at the loss: ∂L/∂z = 2(z − t) = 4. “Raise z by a little, and L rises 4 times as much.”', set: { phase: 2 }, ms: 11500, notes: [{ text: '∂L/∂z = 2(z − t) = 4', at: [5.4, -2.6], to: [4.1, -0.8], color: C.red }] },
    { say: 'Chain rule: ∂L/∂w = ∂L/∂z × ∂z/∂w = 4 × x = 8. And ∂L/∂b = 4 × 1 = 4. The 4 is computed once and reused for both: that is the whole trick.', set: { phase: 3 }, ms: 12500, notes: [{ text: 'reuse the 4', at: [1.4, -3.2], to: [-1.9, -0.5], color: C.red }] },
    { say: 'A positive slope says: lower w. A gradient step with η = 0.0625 gives w = 3 − 0.5 = 2.5. Then z = 6, the error is 1, and the loss has dropped from 4 to 1.', set: { w: 2.5 }, ms: 12000 },
    { say: 'In a real network the chain is millions of steps long, but it is the same idea: one backward pass gives every weight its slope.', set: { w: 2 }, ms: 9500 },
  ],
  readout: (p) => {
    const z = p.w * 2 + 1;
    return [
      ['z = wx + b', r2(z)],
      ['L = (z − t)²', r2((z - 5) ** 2)],
      ['∂L/∂w', r2(2 * (z - 5) * 2)],
      ['∂L/∂b', r2(2 * (z - 5))],
    ];
  },
  setup(kit) {
    const node = (x, y, name, color) => {
      kit.rect(x - 0.95, y - 0.6, 1.9, 1.2, { color, opacity: 0.12, strokeColor: color, width: 2 });
      kit.label(name, [x, y + 0.95], { size: 15, color });
      return kit.label('', [x, y], { ...mono, size: 20 });
    };
    const vx = node(-6.4, 1.9, 'x', C.blue);
    const vw = node(-6.4, -0.5, 'w', C.purple);
    const vm = node(-3.4, 0.7, 'w \\cdot x', C.teal);
    const vb = node(-3.4, -1.9, 'b', C.purple);
    const vz = node(-0.4, 0.7, 'z = wx + b', C.teal);
    const vt = node(-0.4, -1.9, 't', C.grey);
    const vL = node(3.2, 0.7, 'L = (z - t)^2', C.gold);
    const arrows = [
      kit.arrow([-5.45, 1.7], [-4.35, 0.95], { color: C.grid }),
      kit.arrow([-5.45, -0.3], [-4.35, 0.45], { color: C.grid }),
      kit.arrow([-2.45, 0.7], [-1.35, 0.7], { color: C.grid }),
      kit.arrow([-2.45, -1.7], [-1.35, 0.4], { color: C.grid }),
      kit.arrow([0.55, 0.7], [2.25, 0.7], { color: C.grid }),
      kit.arrow([0.55, -1.7], [2.25, 0.4], { color: C.grid }),
    ];
    const gz = kit.label('', [3.2, -0.6], { tex: false, size: 15, color: C.red });
    const gw = kit.label('', [-6.4, -1.5], { tex: false, size: 15, color: C.red });
    const gb = kit.label('', [-3.4, -2.9], { tex: false, size: 15, color: C.red });
    const back = [kit.arrow([2.2, 0.35], [0.6, 0.35], { color: C.red }), kit.arrow([-1.35, 0.3], [-2.45, 0.3], { color: C.red }), kit.arrow([-4.35, 0.15], [-5.45, -0.55], { color: C.red }), kit.arrow([-1.25, 0.15], [-2.5, -1.25], { color: C.red })];
    return (q) => {
      const w = q.w;
      const z = w * 2 + 1;
      const f = q.phase >= 0.5;
      vx.set('2');
      vw.set(r2(w));
      vb.set('1');
      vt.set('5');
      vm.set(f ? r2(2 * w) : '?');
      vz.set(f ? r2(z) : '?');
      vL.set(f ? r2((z - 5) ** 2) : '?');
      arrows.forEach((a) => a.color(f ? C.teal : C.grid));
      const dz = 2 * (z - 5);
      gz.visible(q.phase >= 1.5).set(`∂L/∂z = ${r2(dz)}`);
      back[0].visible(q.phase >= 1.5);
      back.slice(1).forEach((a) => a.visible(q.phase >= 2.5));
      gw.visible(q.phase >= 2.5).set(`∂L/∂w = ${r2(dz)} × 2 = ${r2(dz * 2)}`);
      gb.visible(q.phase >= 2.5).set(`∂L/∂b = ${r2(dz)} × 1 = ${r2(dz)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-004: polynomial fits, training error vs test error
// ---------------------------------------------------------------------------
const truth = (x) => Math.sin(Math.PI * x) * 1.2;
const FIT = (() => {
  const rand = rng(11);
  const train = [];
  for (let i = 0; i < 10; i++) {
    const x = -1 + (2 * (i + 0.5)) / 10 + (rand() - 0.5) * 0.08;
    train.push([x, truth(x) + gauss(rand) * 0.28]);
  }
  const test = [];
  for (let i = 0; i < 10; i++) {
    const x = -0.98 + (1.96 * i) / 9;
    test.push([x, truth(x) + gauss(rand) * 0.28]);
  }
  return { train, test };
})();
function polyfit(pts, d) {
  const n = d + 1;
  const A = Array.from({ length: n }, () => Array.from({ length: n + 1 }, () => 0));
  for (const [x, y] of pts) {
    const p = Array.from({ length: n }, (_, k) => x ** k);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) A[i][j] += p[i] * p[j];
      A[i][n] += p[i] * y;
    }
  }
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r;
    [A[c], A[piv]] = [A[piv], A[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k];
    }
  }
  const coef = A.map((row, i) => row[n] / row[i]);
  return (x) => coef.reduce((s, c, k) => s + c * x ** k, 0);
}
const FITS = Array.from({ length: 10 }, (_, d) => polyfit(FIT.train, d));
const mse = (f, pts) => pts.reduce((s, [x, y]) => s + (f(x) - y) ** 2, 0) / pts.length;
export const overfit_poly = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Find the degree with the LOWEST test error. Is it the one with the lowest training error?',
  goal: (t) => {
    const errs = FITS.map((f) => mse(f, FIT.test));
    return R(t.d) === errs.indexOf(Math.min(...errs));
  },
  params: [
    { key: 'd', label: 'Polynomial degree', min: 0, max: 9, step: 1, value: 1 },
    { key: 'test', hidden: true, value: 1 },
  ],
  free: { test: 1 },
  beats: [
    { say: 'Ten measurements (blue) of a smooth wave, each with some random error. We want a curve that predicts NEW measurements well, not one that just hits these ten.', set: { d: 0, test: 0 }, ms: 11000 },
    { say: 'Degree 1, a straight line: it misses the wave’s shape. Training error is high. This is underfitting.', set: { d: 1 }, ms: 9500, notes: [{ text: 'too simple to bend', at: [-4.6, 3.4], to: [-4.2, 0.6] }] },
    { say: 'Degree 3 follows the wave and ignores most of the noise.', set: { d: 3 }, ms: 9000 },
    { say: 'Degree 9 has ten numbers to set, one per point, so it passes through all ten exactly. Training error: zero. Look at the wild swings between the points.', set: { d: 9 }, ms: 11500, notes: [{ text: 'it has memorised the noise', at: [1.2, 3.7], to: [3.6, -0.9], color: C.red }] },
    { say: 'Now the fair test: ten fresh measurements (gold) the curve never saw. Degree 9’s test error is far worse than degree 3’s. Low training error proved nothing.', set: { test: 1 }, ms: 12000 },
    { say: 'Compare the two bars as the degree rises: training error only falls, test error falls then climbs. Always judge a model on held-out data.', set: { d: 5 }, ms: 11000, notes: [{ text: 'test error is the honest score', at: [2.4, 3.7], to: [7.0, -1.4], color: C.gold }] },
  ],
  readout: (p) => {
    const f = FITS[R(p.d)];
    return [
      ['Degree', `${R(p.d)} (${R(p.d) + 1} numbers to fit)`],
      ['Training error', r3(mse(f, FIT.train))],
      ['Test error', p.test > 0.5 ? r3(mse(f, FIT.test)) : 'hidden'],
    ];
  },
  setup(kit) {
    const X = (x) => -6.2 + 5.4 * (x + 1);
    const Y = (y) => 0.5 + 1.45 * y;
    kit.line([[-6.6, 0.5], [5.0, 0.5]], { color: C.grid, width: 1 });
    const wave = [];
    for (let i = 0; i <= 80; i++) {
      const x = -1 + (2 * i) / 80;
      wave.push([X(x), Y(truth(x))]);
    }
    kit.line(wave, { color: C.grey, width: 1.5, dashed: true });
    const fit = kit.line([[0, 0], [1, 1]], { color: C.green, width: 3.5 });
    FIT.train.forEach(([x, y]) => kit.dot([X(x), Y(y)], { r: 0.13, color: C.blue }));
    const tdots = FIT.test.map(([x, y]) => kit.dot([X(x), Y(y)], { r: 0.13, color: C.gold }));
    // error bars bottom right
    kit.label('\\text{train}', [5.9, -4.1], { size: 13, color: C.blue });
    kit.label('\\text{test}', [7.1, -4.1], { size: 13, color: C.gold });
    const bTrain = kit.rect(5.5, -3.8, 0.8, 0.01, { color: C.blue, opacity: 0.6, strokeColor: C.blue, width: 1 });
    const bTest = kit.rect(6.7, -3.8, 0.8, 0.01, { color: C.gold, opacity: 0.6, strokeColor: C.gold, width: 1 });
    const dl = kit.label('', [-6.4, 3.9], { ...mono, size: 16, align: 'left' });
    return (q) => {
      const d = R(q.d);
      const f = FITS[d];
      const pts = [];
      for (let i = 0; i <= 200; i++) {
        const x = -1 + (2 * i) / 200;
        pts.push([X(x), Y(Math.max(-2.9, Math.min(2.4, f(x))))]);
      }
      fit.set(pts);
      tdots.forEach((t) => t.visible(q.test > 0.5));
      const scale = (e) => Math.min(6.5, Math.sqrt(e) * 7);
      bTrain.set(5.5, -3.8, 0.8, Math.max(0.02, scale(mse(f, FIT.train))));
      bTest.visible(q.test > 0.5).set(6.7, -3.8, 0.8, Math.max(0.02, scale(mse(f, FIT.test))));
      dl.set(`degree ${d}`);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-005: sliding a 3 × 3 filter over a small picture
// ---------------------------------------------------------------------------
const IMG = [
  '........',
  '.######.',
  '......#.',
  '.....#..',
  '....#...',
  '...#....',
  '...#....',
  '........',
].map((r) => [...r].map((c) => (c === '#' ? 1 : 0)));
const KERNELS = {
  vert: { name: 'vertical edges', k: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]] },
  horiz: { name: 'horizontal edges', k: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]] },
  blur: { name: 'blur', k: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] },
};
const convAt = (k, i, j) => {
  let s = 0;
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) s += k[a][b] * IMG[i + a][j + b];
  return s;
};
export const conv_filter = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find the filter whose output map lights up most strongly along the top bar of the 7.',
  goal: (t) => t.kern === 'horiz' && R(t.pos) >= 35,
  params: [
    { key: 'kern', label: 'Filter', type: 'choice', value: 'vert', options: Object.entries(KERNELS).map(([value, o]) => ({ value, label: o.name })) },
    { key: 'pos', label: 'Filter position', min: 0, max: 35, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A computer sees a picture as a grid of numbers. Here, an 8 × 8 picture of a 7: white squares are 1, dark ones 0.', set: { kern: 'vert', pos: 0 }, ms: 10000 },
    { say: 'A filter is a small 3 × 3 grid of weights. This one is −1 on the left, +1 on the right: it responds where brightness changes from left to right, a vertical edge.', set: { pos: 0 }, ms: 11500, notes: [{ text: 'the filter’s nine weights', at: [-3.2, 3.9], to: [-0.4, 2.6] }] },
    { say: 'Lay it on the top-left corner, multiply the nine pairs and add: one output number. Slide one square and repeat.', set: { pos: 9 }, ms: 10500, notes: [{ text: 'nine products, added', at: [3.6, 3.9], to: [4.2, 2.4], color: C.gold }] },
    { say: 'Across the whole picture the same nine weights are reused. An 8 × 8 input gives a 6 × 6 map of where the filter matched. Bright: a strong edge; dark red: an edge the other way.', set: { pos: 35 }, ms: 12000 },
    { say: 'A horizontal-edge filter finds the top bar of the 7 instead. A real network learns hundreds of filters by backpropagation, and stacks layers: edges, then shapes, then objects.', set: { kern: 'horiz', pos: 35 }, ms: 12500 },
  ],
  readout: (p) => {
    const pos = R(p.pos);
    const i = Math.floor(pos / 6);
    const j = pos % 6;
    return [
      ['Filter', KERNELS[p.kern].name],
      ['At row, column', `${i}, ${j}`],
      ['Output there', `${convAt(KERNELS[p.kern].k, i, j)}`],
    ];
  },
  setup(kit) {
    const S = 0.72;
    const ix = (j) => -7.4 + j * S;
    const iy = (i) => 2.2 - i * S;
    const cells = [];
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) cells.push(kit.rect(ix(j), iy(i), S * 0.94, S * 0.94, { color: IMG[i][j] ? 0xe6edf3 : 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1 }));
    const win = kit.rect(0, 0, 3 * S, 3 * S, { fill: false, strokeColor: C.gold, width: 4 });
    const kl = [];
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) kl.push(kit.label('', [-1.4 + b * 0.75, 2.4 - a * 0.65], { ...mono, size: 15 }));
    kit.label('\\text{filter}', [-0.65, 3.3], { size: 13, color: C.grey });
    const sum = kit.label('', [-0.65, 0.0], { ...mono, size: 15, color: C.gold });
    const O = 0.72;
    const ox = (j) => 2.2 + j * O;
    const oy = (i) => 2.2 - i * O;
    const outs = [];
    const outL = [];
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 6; j++) {
        outs.push(kit.rect(ox(j), oy(i), O * 0.94, O * 0.94, { color: C.grid, opacity: 1, strokeColor: C.grid, width: 1 }));
        outL.push(kit.label('', [ox(j) + O * 0.47, oy(i) + O * 0.47], { ...mono, size: 11 }));
      }
    kit.label('\\text{output map}', [4.4, 3.3], { size: 13, color: C.grey });
    const cur = kit.rect(0, 0, O, O, { fill: false, strokeColor: C.gold, width: 3 });
    return (q) => {
      const K = KERNELS[q.kern].k;
      const pos = R(q.pos);
      const i = Math.floor(pos / 6);
      const j = pos % 6;
      win.set(ix(j) - 0.03, iy(i + 2) - 0.03, 3 * S, 3 * S);
      kl.forEach((l, n) => l.set(`${K[Math.floor(n / 3)][n % 3]}`).color(K[Math.floor(n / 3)][n % 3] > 0 ? C.green : K[Math.floor(n / 3)][n % 3] < 0 ? C.red : C.grey));
      sum.set(`sum = ${convAt(K, i, j)}`);
      const max = q.kern === 'blur' ? 9 : 3;
      outs.forEach((o, n) => {
        const a = Math.floor(n / 6);
        const b = n % 6;
        const on = n <= pos;
        const v = convAt(K, a, b);
        const t = Math.min(1, Math.abs(v) / max);
        const col = v >= 0 ? [0.1 + 0.25 * t, 0.14 + 0.63 * t, 0.2 + 0.67 * t] : [0.1 + 0.85 * t, 0.12 + 0.25 * t, 0.12 + 0.2 * t];
        o.color(on ? (Math.round(col[0] * 255) << 16) | (Math.round(col[1] * 255) << 8) | Math.round(col[2] * 255) : 0x1a2433);
        outL[n].set(on ? `${v}` : '');
      });
      cur.set(ox(j), oy(i), O * 0.94, O * 0.94);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-006: word vectors and analogies (a made-up 2-D map)
// ---------------------------------------------------------------------------
const WORDS = {
  man: [-1.5, -2.6],
  woman: [-1.4, -0.6],
  king: [3.2, -2.1],
  queen: [3.3, -0.05],
  prince: [2.6, -3.1],
  Japan: [-6.4, 2.7],
  Tokyo: [-3.9, 1.6],
  Philippines: [-6.6, 0.9],
  Manila: [-4.1, -0.2],
  Davao: [-3.4, -1.0],
};
const ANALOGIES = {
  royal: { a: 'man', b: 'woman', c: 'king', say: 'king − man + woman' },
  capital: { a: 'Japan', b: 'Tokyo', c: 'Philippines', say: 'Tokyo − Japan + Philippines' },
};
const nearest = (p, skip) =>
  Object.entries(WORDS)
    .filter(([w]) => !skip.includes(w))
    .reduce((best, [w, v]) => {
      const d = Math.hypot(v[0] - p[0], v[1] - p[1]);
      return d < best[1] ? [w, d] : best;
    }, ['', 1e9])[0];
export const word_vectors = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Run the capital-city analogy all the way. Which word is closest to where the arrow lands?',
  goal: (t) => t.an === 'capital' && t.step >= 2,
  params: [
    { key: 'an', label: 'Analogy', type: 'choice', value: 'royal', options: [{ value: 'royal', label: 'king − man + woman' }, { value: 'capital', label: 'Tokyo − Japan + Philippines' }] },
    { key: 'step', hidden: true, value: 2 },
  ],
  free: { step: 2 },
  beats: [
    { say: 'Each word is a point. Real word vectors have about 300 directions; this is a made-up 2-D map to show the idea. Words used in similar sentences end up close together.', set: { an: 'royal', step: 0 }, ms: 11500 },
    { say: 'The step from man to woman is an arrow: a direction in the space.', set: { step: 1 }, ms: 9000, notes: [{ text: 'man → woman', at: [-4.8, -3.6], to: [-1.6, -1.7] }] },
    { say: 'Start at king and take the same step. Where do we land? Right next to queen. That is king − man + woman ≈ queen, the famous word2vec result.', set: { step: 2 }, ms: 12000, notes: [{ text: 'lands next to queen', at: [6.0, 1.6], to: [3.4, 0.2], color: C.green }] },
    { say: 'Other relationships are directions too. From Japan to Tokyo is “country → capital”.', set: { an: 'capital', step: 1 }, ms: 10000 },
    { say: 'Apply that step to the Philippines and you land near Manila. Nobody told the model about capitals; it learned it from how the words are used.', set: { step: 2 }, ms: 11500, notes: [{ text: 'near Manila', at: [-1.0, 2.8], to: [-3.9, 0.0], color: C.green }] },
  ],
  readout: (p) => {
    const A = ANALOGIES[p.an];
    const v = WORDS[A.c].map((x, i) => x - WORDS[A.a][i] + WORDS[A.b][i]);
    return [
      ['Sum', A.say],
      ['Lands nearest to', nearest(v, [A.a, A.b, A.c])],
    ];
  },
  setup(kit) {
    for (const [w, p] of Object.entries(WORDS)) {
      kit.dot(p, { r: 0.12, color: C.blue });
      kit.label(w, [p[0] + 0.2, p[1] + 0.32], { tex: false, size: 14, align: 'left' });
    }
    const a1 = kit.arrow([0, 0], [1, 1], { color: C.gold });
    const a2 = kit.arrow([0, 0], [1, 1], { color: C.gold });
    const land = kit.dot([0, 0], { r: 0.2, color: C.green, glow: true });
    return (q) => {
      const A = ANALOGIES[q.an];
      const pa = WORDS[A.a];
      const pb = WORDS[A.b];
      const pc = WORDS[A.c];
      const d = [pb[0] - pa[0], pb[1] - pa[1]];
      a1.visible(q.step >= 0.5).set(pa, pb);
      const t = Math.max(0, Math.min(1, q.step - 1));
      const end = [pc[0] + d[0] * t, pc[1] + d[1] * t];
      a2.visible(q.step >= 1.05).set(pc, end);
      land.visible(q.step >= 1.9).set(end);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-007: attention weights over a sentence (made-up scores)
// ---------------------------------------------------------------------------
const SENT = ['The', 'animal', 'didn’t', 'cross', 'the', 'street', 'because', 'it', 'was', 'too', 'END'];
const SCORES = {
  tired: { it: [0.2, 3.2, 0.4, 0.9, 0.1, 1.2, 0.3, 0.5, 0.6, 0.4, 1.6], cross: [0.3, 2.0, 1.4, 0.8, 0.2, 2.3, 0.2, 0.4, 0.2, 0.1, 0.3] },
  wide: { it: [0.2, 1.1, 0.4, 0.9, 0.1, 3.2, 0.3, 0.5, 0.6, 0.4, 1.6], cross: [0.3, 2.0, 1.4, 0.8, 0.2, 2.3, 0.2, 0.4, 0.2, 0.1, 0.3] },
};
const softmax = (s, T) => {
  const m = Math.max(...s);
  const e = s.map((x) => Math.exp((x - m) / T));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / z);
};
export const attention_weights = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Switch the last word to “wide” and see where “it” looks now.',
  goal: (t) => t.end === 'wide' && t.q === 'it',
  params: [
    { key: 'end', label: 'Last word', type: 'choice', value: 'tired', options: [{ value: 'tired', label: '…too tired' }, { value: 'wide', label: '…too wide' }] },
    { key: 'q', label: 'Word that is looking', type: 'choice', value: 'it', options: [{ value: 'it', label: 'it' }, { value: 'cross', label: 'cross' }] },
    { key: 'T', label: 'Temperature', min: 0.3, max: 3, step: 0.1, value: 1 },
    { key: 'show', hidden: true, value: 1 },
  ],
  free: { show: 1 },
  beats: [
    { say: '“The animal didn’t cross the street because it was too tired.” What does “it” mean? You know at once: the animal. How could a machine work that out?', set: { end: 'tired', q: 'it', T: 1, show: 0 }, ms: 11500, notes: [{ text: 'what does “it” point to?', at: [2.8, 1.6], to: [2.8, -2.25] }] },
    { say: 'In attention, the word “it” sends out a query. Every word has a key. A dot product scores how well each key matches. These scores are made up for the picture, but trained models learn ones like them.', set: { show: 1 }, ms: 12500 },
    { say: 'Softmax turns the scores into weights that are positive and add up to 1. “it” puts most of its weight on “animal”, and its new meaning is a mix weighted the same way.', set: { show: 2 }, ms: 11500, notes: [{ text: 'most attention: “animal”', at: [-2.6, 3.7], to: [-4.9, 1.6], color: C.gold }] },
    { say: 'Change one word: “…because it was too wide.” Now “it” must be the street, and the attention moves there.', set: { end: 'wide' }, ms: 10500, notes: [{ text: 'now: “street”', at: [3.4, 3.7], to: [0.3, 1.6], color: C.gold }] },
    { say: 'Temperature divides the scores before softmax. Low: almost all weight on the top word. High: spread evenly. Every word does this at once, in every layer: that is a transformer.', set: { T: 0.4 }, ms: 12000 },
  ],
  readout: (p) => {
    const w = softmax(SCORES[p.end][p.q], p.T);
    const top = w.indexOf(Math.max(...w));
    const words = [...SENT.slice(0, 10), p.end];
    return [
      ['Looks most at', `${words[top]} (${R(w[top] * 100)}%)`],
      ['Weights add to', '1'],
    ];
  },
  setup(kit) {
    const xs = SENT.map((_, i) => -7.0 + i * 1.4);
    const words = SENT.map((w, i) => kit.label(w, [xs[i], -2.6], { tex: false, size: 15 }));
    const bars = SENT.map((_, i) => kit.rect(xs[i] - 0.45, -2.0, 0.9, 0.01, { color: C.gold, opacity: 0.6, strokeColor: C.gold, width: 1 }));
    const pct = SENT.map((_, i) => kit.label('', [xs[i], -1.6], { tex: false, size: 12, color: C.gold }));
    const sc = SENT.map((_, i) => kit.label('', [xs[i], -3.4], { tex: false, size: 11, color: C.grey }));
    kit.label('\\text{scores}', [-7.6, -3.4], { size: 11, color: C.grey });
    return (q) => {
      const ws = softmax(SCORES[q.end][q.q], q.T);
      const s = SCORES[q.end][q.q];
      const qi = SENT.indexOf(q.q);
      words[10].set(q.end);
      words.forEach((w, i) => w.color(i === qi ? C.blue : C.text));
      bars.forEach((b, i) => b.visible(q.show >= 1.5).set(xs[i] - 0.45, -2.0, 0.9, Math.max(0.02, ws[i] * 5.5)));
      pct.forEach((p, i) => p.visible(q.show >= 1.5).set(`${R(ws[i] * 100)}%`).pos([xs[i], -1.75 + ws[i] * 5.5 + 0.3]));
      sc.forEach((l, i) => l.visible(q.show >= 0.5).set(s[i].toFixed(1)));
    };
  },
};

// ---------------------------------------------------------------------------
// ai-008: the scaling law, on ordinary and log–log axes
// ---------------------------------------------------------------------------
const LINF = 1.7;
const Lc = (lc) => LINF + 8 * 10 ** (-0.1 * (lc - 18));
export const scaling_law = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find the compute budget for which Chinchilla’s rule gives a 70-billion-weight model.',
  goal: (t) => Math.abs(Math.sqrt(10 ** t.lc / 120) / 1e9 - 70) < 8,
  params: [
    { key: 'lc', label: 'Compute (log₁₀ operations)', min: 18, max: 26, step: 0.1, value: 20 },
    { key: 'view', hidden: true, value: 0 },
  ],
  free: { view: 1 },
  beats: [
    { say: 'Train bigger models with more compute and the loss falls. Here compute grows from 10¹⁸ to 10²⁶ operations, a hundred-million-fold. The curve flattens, but never quite stops falling.', set: { lc: 20, view: 0 }, ms: 12000 },
    { say: 'Take away the floor the loss can never go below, and put both axes on a logarithmic scale. The curve becomes a straight line: a power law. Kaplan and colleagues found this in 2020.', set: { view: 1 }, ms: 12000, notes: [{ text: 'a straight line on log–log axes', at: [-3.0, -2.4], to: [-0.2, 0.0], color: C.gold }] },
    { say: 'A straight line can be extended. Measure small, cheap runs, draw the line, and predict the loss of a run 1,000 times bigger before paying for it.', set: { lc: 23 }, ms: 11500 },
    { say: 'How to split a budget between model size N and data D? Training costs about C = 6ND. Chinchilla (2022): about 20 tokens of text per weight.', set: { lc: 23.8 }, ms: 12000 },
    { say: 'At about 6 × 10²³ operations that rule gives 70 billion weights on 1.4 trillion tokens: Chinchilla itself, which beat a model four times its size.', set: { lc: 23.77 }, ms: 12000, notes: [{ text: 'Chinchilla’s budget', at: [3.4, 2.4], to: [2.45, -0.9], color: C.green }] },
  ],
  readout: (p) => {
    const C0 = 10 ** p.lc;
    const N = Math.sqrt(C0 / 120);
    const fmt = (x) => (x >= 1e12 ? `${r2(x / 1e12)} trillion` : x >= 1e9 ? `${r2(x / 1e9)} billion` : x >= 1e6 ? `${r2(x / 1e6)} million` : `${R(x)}`);
    return [
      ['Compute C', `10^${r2(p.lc)} operations`],
      ['Predicted loss', r3(Lc(p.lc))],
      ['Best size (Chinchilla)', `N ≈ ${fmt(N)} weights, D ≈ ${fmt(20 * N)} tokens`],
    ];
  },
  setup(kit) {
    const X = (lc) => -6.2 + 1.5 * (lc - 18);
    kit.line([[-6.4, -3.2], [6.2, -3.2]], { color: C.axis, width: 2 });
    kit.line([[-6.2, -3.4], [-6.2, 3.6]], { color: C.axis, width: 2 });
    for (let e = 18; e <= 26; e += 2) kit.label(`10^{${e}}`, [X(e), -3.7], { size: 12, color: C.grey });
    const yl = kit.label('', [-6.9, 3.9], { tex: false, size: 13, color: C.grey, align: 'left' });
    const curve = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 3.5 });
    const floor = kit.line([[-6.2, 0], [6.0, 0]], { color: C.red, width: 1.5, dashed: true });
    const fl = kit.label('', [4.6, 0], { tex: false, size: 12, color: C.red });
    const runs = [18.5, 19.2, 19.9, 20.6, 21.3].map(() => kit.dot([0, 0], { r: 0.12, color: C.white }));
    const me = kit.dot([0, 0], { r: 0.2, color: C.gold, glow: true });
    return (q) => {
      const v = Math.min(1, Math.max(0, q.view));
      // view 0: loss (linear, 1.5 … 10); view 1: log10(L − L∞) (−1 … 1)
      const Y0 = (L) => -3.2 + (L - 1.5) * 0.72;
      const Y1 = (L) => -2.8 + (Math.log10(L - LINF) - 0.1) * 7.5;
      const Y = (L) => (1 - v) * Y0(L) + v * Y1(L);
      const pts = [];
      for (let i = 0; i <= 80; i++) {
        const lc = 18 + (8 * i) / 80;
        pts.push([X(lc), Y(Lc(lc))]);
      }
      curve.set(pts);
      floor.visible(v < 0.5).set([[-6.2, Y0(LINF)], [6.0, Y0(LINF)]]);
      fl.visible(v < 0.5).set('floor L∞').pos([4.8, Y0(LINF) + 0.3]);
      yl.set(v < 0.5 ? 'loss' : 'loss − floor (log scale)');
      [18.5, 19.2, 19.9, 20.6, 21.3].forEach((lc, i) => runs[i].set([X(lc), Y(Lc(lc))]));
      me.set([X(q.lc), Y(Lc(q.lc))]);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-009: values spreading from the goal (value iteration on a small grid)
// ---------------------------------------------------------------------------
const GW = { cols: 4, rows: 3, goal: [3, 2], pit: [3, 1], wall: [1, 1] };
const same = (a, b) => a[0] === b[0] && a[1] === b[1];
function valueIter(gamma, sweeps) {
  let V = Array.from({ length: GW.rows }, () => Array.from({ length: GW.cols }, () => 0));
  for (let s = 0; s < sweeps; s++) {
    const N = V.map((r) => r.slice());
    for (let y = 0; y < GW.rows; y++)
      for (let x = 0; x < GW.cols; x++) {
        const c = [x, y];
        if (same(c, GW.wall)) continue;
        if (same(c, GW.goal)) {
          N[y][x] = 1;
          continue;
        }
        if (same(c, GW.pit)) {
          N[y][x] = -1;
          continue;
        }
        let best = -1e9;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          let nx = x + dx;
          let ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= GW.cols || ny >= GW.rows || same([nx, ny], GW.wall)) {
            nx = x;
            ny = y;
          }
          best = Math.max(best, -0.04 + gamma * V[ny][nx]);
        }
        N[y][x] = best;
      }
    V = N;
  }
  return V;
}
export const gridworld_values = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Set γ = 0.5 and sweep until nothing changes. How much is the start square (bottom left) worth now?',
  goal: (t) => Math.abs(t.gamma - 0.5) < 0.01 && R(t.k) >= 10,
  params: [
    { key: 'gamma', label: 'Discount γ', min: 0.5, max: 0.99, step: 0.01, value: 0.9 },
    { key: 'k', label: 'Sweeps', min: 0, max: 15, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A robot in a small world. One square pays +1 and ends the game; one pit costs −1. Each move costs a little (−0.04). Nobody tells the robot the way; it only knows rewards.', set: { gamma: 0.9, k: 0 }, ms: 12000 },
    { say: 'First sweep: only the squares next to the goal learn they are worth something: one step, then +1, discounted by γ = 0.9.', set: { k: 2 }, ms: 10500, notes: [{ text: 'next to the goal: worth ≈ 0.86', at: [-0.6, 3.8], to: [2.1, 2.2], color: C.green }] },
    { say: 'Each sweep applies Bellman’s rule everywhere: my value = best move’s reward plus γ times where it lands. Value spreads backwards from the goal, one square per sweep.', set: { k: 4 }, ms: 12000 },
    { say: 'After enough sweeps nothing changes. Following the arrows, always toward the higher neighbour, is the best route, and it steers around the pit.', set: { k: 12 }, ms: 11500, notes: [{ text: 'the best path avoids the pit', at: [-6.0, 3.9], to: [-3.3, 1.4], color: C.gold }] },
    { say: 'Lower γ to 0.5 and far-away rewards count for little: the start square barely cares about the goal. γ sets how patient the agent is.', set: { gamma: 0.5, k: 12 }, ms: 11500 },
  ],
  readout: (p) => {
    const V = valueIter(p.gamma, R(p.k));
    return [
      ['Start square (bottom left)', r3(V[0][0])],
      ['Sweeps', `${R(p.k)}`],
    ];
  },
  setup(kit) {
    const S = 2.2;
    const cx = (x) => -4.4 + x * S;
    const cy = (y) => -3.3 + y * S;
    const cells = [];
    const vals = [];
    const arrows = [];
    for (let y = 0; y < GW.rows; y++)
      for (let x = 0; x < GW.cols; x++) {
        const isWall = same([x, y], GW.wall);
        cells.push(kit.rect(cx(x), cy(y), S * 0.96, S * 0.96, { color: isWall ? 0x444c56 : 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1.5 }));
        vals.push(kit.label(isWall ? '' : '0', [cx(x) + S * 0.48, cy(y) + S * 0.62], { ...mono, size: 18 }));
        arrows.push(kit.arrow([0, 0], [0.1, 0.1], { color: C.gold }));
      }
    kit.label('goal +1', [cx(3) + S * 0.48, cy(2) + S * 0.25], { tex: false, size: 13 });
    kit.label('pit −1', [cx(3) + S * 0.48, cy(1) + S * 0.25], { tex: false, size: 13 });
    kit.label('start', [cx(0) + 0.1, cy(0) + S * 0.86], { tex: false, size: 11, color: C.grey, align: 'left' });
    return (q) => {
      const V = valueIter(q.gamma, R(q.k));
      for (let y = 0; y < GW.rows; y++)
        for (let x = 0; x < GW.cols; x++) {
          const n = y * GW.cols + x;
          const isWall = same([x, y], GW.wall);
          const term = same([x, y], GW.goal) || same([x, y], GW.pit);
          const v = V[y][x];
          if (!isWall) {
            vals[n].set(R(q.k) === 0 && !term ? '0' : r2(v));
            const t = Math.min(1, Math.abs(v));
            cells[n].color(v >= 0 ? (Math.round(26 + 70 * t) << 16) | (Math.round(36 + 140 * t) << 8) | Math.round(51 + 40 * t) : (Math.round(51 + 150 * t) << 16) | (36 << 8) | 40);
          }
          // best move arrow
          let best = null;
          let bv = -1e9;
          if (!isWall && !term && R(q.k) >= 3)
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= GW.cols || ny >= GW.rows || same([nx, ny], GW.wall)) continue;
              if (V[ny][nx] > bv + 1e-9) {
                bv = V[ny][nx];
                best = [dx, dy];
              }
            }
          arrows[n].visible(!!best);
          if (best) {
            const ox = cx(x) + S * 0.48;
            const oy = cy(y) + S * 0.3;
            arrows[n].set([ox - best[0] * 0.3, oy - best[1] * 0.3], [ox + best[0] * 0.45, oy + best[1] * 0.45]);
          }
        }
    };
  },
};

// ---------------------------------------------------------------------------
// ai-010: from reward scores to preference probabilities
// ---------------------------------------------------------------------------
export const preference_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find the score gap at which answer A is preferred 9 times out of 10.',
  goal: (t) => Math.abs(sigmoid(t.d) - 0.9) < 0.01,
  params: [{ key: 'd', label: 'Score gap r_A − r_B', min: -4, max: 4, step: 0.05, value: 0 }],
  beats: [
    { say: 'Two answers to the same question. A person picks the better one. Collect thousands of such choices and we can train a reward model to score answers.', set: { d: 0 }, ms: 11000 },
    { say: 'The Bradley–Terry model (1952): the chance A is chosen depends only on the gap in scores. Equal scores: a coin toss, 50%.', set: { d: 0 }, ms: 10500, notes: [{ text: 'equal scores → 50%', at: [-4.2, 2.6], to: [-0.1, 0.0], color: C.gold }] },
    { say: 'A gap of 1 makes A the choice 73% of the time; a gap of 2, 88%. The S-shaped curve is the sigmoid.', set: { d: 1 }, ms: 10000 },
    { say: 'Training pushes the chosen answer’s score above the rejected one’s. The loss −ln σ(gap) is large when the model gets the order wrong and small when it gets it right.', set: { d: -2 }, ms: 12000, notes: [{ text: 'wrong order: big loss', at: [-4.6, -3.6], to: [-2.9, -2.6], color: C.red }] },
    { say: 'Then the language model is trained to write answers that score highly, while a penalty keeps it close to where it started, so it cannot drift into answers that only fool the scorer.', set: { d: 2.2 }, ms: 12000 },
  ],
  readout: (p) => [
    ['P(A preferred)', `${R(sigmoid(p.d) * 1000) / 10}%`],
    ['Loss if A was chosen', r3(-Math.log(sigmoid(p.d)))],
  ],
  setup(kit) {
    const X = (d) => d * 1.45;
    const Y = (pp) => -3.0 + pp * 5.6;
    kit.line([[X(-4.3), Y(0)], [X(4.3), Y(0)]], { color: C.axis, width: 2 });
    kit.line([[0, Y(0)], [0, Y(1.05)]], { color: C.grid, width: 1 });
    kit.line([[X(-4.2), Y(1)], [X(4.2), Y(1)]], { color: C.grid, width: 1, dashed: true });
    kit.line([[X(-4.2), Y(0.5)], [X(4.2), Y(0.5)]], { color: C.grid, width: 1, dashed: true });
    kit.label('1', [X(-4.5), Y(1)], { tex: false, size: 12, color: C.grey });
    kit.label('0.5', [X(-4.6), Y(0.5)], { tex: false, size: 12, color: C.grey });
    kit.label('\\text{score gap } r_A - r_B', [X(2.9), Y(0) - 0.45], { size: 13, color: C.grey });
    for (let d = -4; d <= 4; d += 2) kit.label(`${d}`, [X(d), Y(0) - 0.4], { tex: false, size: 12, color: C.grey });
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const d = -4.2 + (8.4 * i) / 100;
      pts.push([X(d), Y(sigmoid(d))]);
    }
    kit.line(pts, { color: C.blue, width: 3.5 });
    const dot = kit.dot([0, 0], { r: 0.2, color: C.gold, glow: true });
    const drop = kit.line([[0, 0], [1, 1]], { color: C.gold, width: 1.5, dashed: true });
    const pl = kit.label('', [0, 0], { tex: false, size: 15, color: C.gold });
    const cardA = kit.label('', [-6.6, 3.9], { tex: false, size: 14, color: C.green, align: 'left' });
    const cardB = kit.label('', [2.0, 3.9], { tex: false, size: 14, color: C.red, align: 'left' });
    return (q) => {
      const p = sigmoid(q.d);
      dot.set([X(q.d), Y(p)]);
      drop.set([[X(q.d), Y(0)], [X(q.d), Y(p)]]);
      pl.set(`${R(p * 100)}%`).pos([X(q.d) + 0.7, Y(p) + 0.3]);
      cardA.set(`answer A: score ${r2(q.d / 2)}`);
      cardB.set(`answer B: score ${r2(-q.d / 2)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-011: diffusion, forward noising and reverse denoising
// ---------------------------------------------------------------------------
const DIFF = (() => {
  const rand = rng(5);
  const n = 160;
  const shape = [];
  for (let i = 0; i < n; i++) {
    if (i < 110) {
      const a = (i / 110) * 2 * Math.PI;
      shape.push([2.6 * Math.cos(a), 2.6 * Math.sin(a)]);
    } else if (i < 125) shape.push([-0.9 + (rand() - 0.5) * 0.25, 0.9 + (rand() - 0.5) * 0.25]);
    else if (i < 140) shape.push([0.9 + (rand() - 0.5) * 0.25, 0.9 + (rand() - 0.5) * 0.25]);
    else {
      const a = Math.PI * (1.15 + 0.7 * ((i - 140) / 20));
      shape.push([1.4 * Math.cos(a), 1.4 * Math.sin(a) - 0.1]);
    }
  }
  const e1 = shape.map(() => [gauss(rand) * 2.4, gauss(rand) * 2.4]);
  const e2 = shape.map(() => [gauss(rand) * 2.4, gauss(rand) * 2.4]);
  const perm = shape.map((_, i) => i).sort(() => rand() - 0.5);
  return { shape, e1, e2, perm };
})();
export const diffusion_noise = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 2.5,
  mission: 'Generate: switch to the reverse direction and bring the noise level all the way down to 0.',
  goal: (t) => t.dir === 'rev' && t.t <= 0.02,
  params: [
    { key: 'dir', label: 'Direction', type: 'choice', value: 'fwd', options: [{ value: 'fwd', label: 'Forward: add noise' }, { value: 'rev', label: 'Reverse: remove noise' }] },
    { key: 't', label: 'Noise level', min: 0, max: 1, step: 0.01, value: 0 },
  ],
  beats: [
    { say: 'Each dot is one data point. Together they make a picture: a smiling face. Real diffusion models work on images with millions of numbers; the idea is the same.', set: { dir: 'fwd', t: 0 }, ms: 10500 },
    { say: 'Forward process: at every step shrink each point slightly toward the centre and add a little random noise. The face blurs.', set: { t: 0.35 }, ms: 11000, notes: [{ text: 'signal fades, noise grows', at: [5.2, 3.6], to: [3.0, 2.2] }] },
    { say: 'Keep going and nothing of the face is left: just a round cloud of random points. Destroying structure is easy.', set: { t: 1 }, ms: 10000 },
    { say: 'The model is trained on one job: given a noisy cloud and the noise level, guess the noise that was added. Then we can run the film backwards.', set: { dir: 'rev', t: 1 }, ms: 11500 },
    { say: 'Start from fresh random noise and remove a little predicted noise at each step. A face appears out of nowhere. With a different starting cloud you get a different sample.', set: { t: 0 }, ms: 12500, notes: [{ text: 'made from pure noise', at: [5.0, -3.6], to: [2.4, -1.6], color: C.green }] },
  ],
  readout: (p) => {
    const ab = 1 - p.t;
    return [
      ['Signal kept √ᾱ', r2(Math.sqrt(ab))],
      ['Noise √(1 − ᾱ)', r2(Math.sqrt(1 - ab))],
      ['Direction', p.dir === 'fwd' ? 'adding noise' : 'removing noise'],
    ];
  },
  setup(kit) {
    const dots = DIFF.shape.map(() => kit.dot([0, 0], { r: 0.075, color: C.blue }));
    const lbl = kit.label('', [-7.4, 3.9], { tex: false, size: 15, align: 'left' });
    return (q) => {
      const ab = Math.max(0, Math.min(1, 1 - q.t));
      const a = Math.sqrt(ab);
      const s = Math.sqrt(1 - ab);
      const rev = q.dir === 'rev';
      dots.forEach((d, i) => {
        const x0 = rev ? DIFF.shape[DIFF.perm[i]] : DIFF.shape[i];
        const e = rev ? DIFF.e2[i] : DIFF.e1[i];
        d.set([a * x0[0] + s * e[0], a * x0[1] + s * e[1]]);
        d.color(rev ? C.green : C.blue);
      });
      lbl.set(`${rev ? 'reverse' : 'forward'} · noise level ${r2(q.t)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// ai-012: majority vote over k independent samples
// ---------------------------------------------------------------------------
const choose = (n, k) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
const majority = (p, k) => {
  let s = 0;
  for (let j = Math.floor(k / 2) + 1; j <= k; j++) s += choose(k, j) * p ** j * (1 - p) ** (k - j);
  return s;
};
const KS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
export const majority_vote = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find a single-sample accuracy p for which voting over 25 samples makes things WORSE.',
  goal: (t) => t.p < 0.5 && R(t.k) >= 25,
  params: [
    { key: 'p', label: 'One sample right, p', min: 0.3, max: 0.9, step: 0.01, value: 0.6 },
    { key: 'k', label: 'Samples k', min: 1, max: 25, step: 2, value: 1 },
  ],
  beats: [
    { say: 'A model answers a hard question correctly 60% of the time. Each bar is the chance that a majority vote over k independent answers is right.', set: { p: 0.6, k: 1 }, ms: 11000 },
    { say: 'Three samples and a vote: right 64.8% of the time. The extra thinking time already helps.', set: { k: 3 }, ms: 9500, notes: [{ text: '3p²(1 − p) + p³ = 0.648', at: [-2.4, 3.8], to: [-5.5, 1.3], color: C.gold }] },
    { say: 'Twenty-five samples: about 85%. This is self-consistency (2022): spend more compute when answering, get more accuracy.', set: { k: 25 }, ms: 10500 },
    { say: 'But if each answer is right only 40% of the time, voting amplifies the WRONG answer. More samples, worse result.', set: { p: 0.4, k: 25 }, ms: 11000, notes: [{ text: 'below 50%: voting hurts', at: [3.4, 3.6], to: [5.6, -1.6], color: C.red }] },
    { say: 'And it assumes the mistakes are independent. Reasoning models instead learn to check their own work, and a verifier that can test answers beats a vote whenever one exists.', set: { p: 0.75, k: 9 }, ms: 12000 },
  ],
  readout: (p) => [
    ['One sample', `${R(p.p * 100)}%`],
    [`Majority of ${R(p.k)}`, `${r2(majority(p.p, R(p.k)) * 100)}%`],
  ],
  setup(kit) {
    const X = (i) => -6.4 + i * 1.0;
    const Y = (pp) => -3.0 + pp * 6.2;
    kit.line([[-7.0, Y(0)], [6.6, Y(0)]], { color: C.axis, width: 2 });
    const base = kit.line([[-7, 0], [6.6, 0]], { color: C.gold, width: 2, dashed: true });
    const bl = kit.label('', [0, 0], { tex: false, size: 12, color: C.gold });
    const bars = KS.map((k, i) => kit.rect(X(i) - 0.35, Y(0), 0.7, 0.01, { color: C.blue, opacity: 0.55, strokeColor: C.blue, width: 1 }));
    KS.forEach((k, i) => kit.label(`${k}`, [X(i), Y(0) - 0.35], { tex: false, size: 12, color: C.grey }));
    kit.label('\\text{samples } k', [5.6, Y(0) - 0.8], { size: 13, color: C.grey });
    kit.line([[-7.0, Y(1)], [6.6, Y(1)]], { color: C.grid, width: 1, dashed: true });
    kit.label('100\\%', [-7.5, Y(1)], { size: 11, color: C.grey });
    return (q) => {
      base.set([[-7, Y(q.p)], [6.6, Y(q.p)]]);
      bl.set(`one sample: ${R(q.p * 100)}%`).pos([4.6, Y(q.p) + 0.3]);
      KS.forEach((k, i) => {
        const m = majority(q.p, k);
        bars[i].set(X(i) - 0.35, Y(0), 0.7, Math.max(0.02, m * 6.2));
        bars[i].color(k === R(q.k) ? C.gold : m >= q.p ? C.blue : C.red);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// ai-013: superposition, more features than dimensions
// ---------------------------------------------------------------------------
const angleStep = (n) => (n <= 2 ? Math.PI / 2 : (2 * Math.PI) / n);
export const superposition = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find the largest number of features that still has ZERO interference between neighbours (with negatives ignored).',
  goal: (t) => R(t.n) === 4,
  params: [{ key: 'n', label: 'Features stored in 2 dimensions', min: 2, max: 8, step: 1, value: 2 }],
  beats: [
    { say: 'Inside a network, a concept is a direction in a space of activations. This space has only 2 dimensions; real ones have thousands. Two features fit perfectly at right angles.', set: { n: 2 }, ms: 11500 },
    { say: 'What if the network needs more features than dimensions? It can still spread them out. With 4, opposite pairs share an axis, and since negatives are cut off by the network, they still do not leak.', set: { n: 4 }, ms: 12000 },
    { say: 'Five features, 72° apart, like a pentagon. Now neighbours overlap: turning on one feature leaks cos 72° ≈ 0.31 into its neighbours. That is superposition.', set: { n: 5 }, ms: 11500, notes: [{ text: 'leak = cos 72° ≈ 0.31', at: [4.6, 2.4], to: [2.85, -1.2], color: C.gold }] },
    { say: 'The leaks only matter if several features are on at once. Most concepts are absent most of the time (they are sparse), so the network accepts a little interference to hold many more concepts.', set: { n: 6 }, ms: 12500 },
    { say: 'This is why one neuron often responds to unrelated things. Sparse autoencoders undo the packing, recovering separate features that humans can name.', set: { n: 8 }, ms: 11000 },
  ],
  readout: (p) => {
    const n = R(p.n);
    const leak = Math.max(0, Math.cos(angleStep(n)));
    return [
      ['Features', `${n} in 2 dimensions`],
      ['Angle between neighbours', `${R((angleStep(n) * 180) / Math.PI)}°`],
      ['Leak into a neighbour', r2(leak < 1e-9 ? 0 : leak)],
    ];
  },
  setup(kit) {
    const O = [-2.0, -0.2];
    const Rr = 3.2;
    const circ = [];
    for (let i = 0; i <= 64; i++) circ.push([O[0] + Rr * Math.cos((i / 64) * 2 * Math.PI), O[1] + Rr * Math.sin((i / 64) * 2 * Math.PI)]);
    kit.line(circ, { color: C.grid, width: 1 });
    const cols = [C.gold, C.blue, C.green, C.pink, C.teal, C.red, C.purple, C.yellow];
    const arr = cols.map((c) => kit.arrow(O, [O[0] + 1, O[1]], { color: c }));
    const bars = cols.map((c) => kit.rect(0, 0, 0.5, 0.01, { color: c, opacity: 0.7, strokeColor: c, width: 1 }));
    kit.label('\\text{leak from feature 1 (gold) into each}', [4.6, 3.9], { size: 13, color: C.grey });
    return (q) => {
      const n = R(q.n);
      const st = angleStep(n);
      cols.forEach((_, i) => {
        const on = i < n;
        arr[i].visible(on);
        bars[i].visible(on && i > 0);
        if (!on) return;
        const a = Math.PI / 2 + i * st;
        arr[i].set(O, [O[0] + Rr * Math.cos(a), O[1] + Rr * Math.sin(a)]);
        const leak = Math.max(0, Math.cos(i * st));
        bars[i].set(1.9 + i * 0.7, -3.0, 0.5, Math.max(0.02, leak * 5.5));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// ai-014: the discovery funnel, on a log scale
// ---------------------------------------------------------------------------
const FUNNEL = [
  { n: 2.2e6, label: 'new crystal structures proposed (GNoME, 2023)', color: C.blue },
  { n: 3.8e5, label: 'predicted stable', color: C.teal },
  { n: 58, label: 'targets chosen for the robot lab (A-Lab)', color: C.gold },
  { n: 41, label: 'actually made, in 17 days', color: C.green },
];
export const discovery_funnel = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Step to the end of the funnel and read the robot lab’s success rate.',
  goal: (t) => t.stage >= 3.9,
  params: [{ key: 'stage', label: 'Stage', min: 0, max: 4, step: 1, value: 4 }],
  beats: [
    { say: 'Making a new material used to start with a chemist’s hunch and take years. Since 2023 the search can start with millions of candidates generated by computer.', set: { stage: 0 }, ms: 11000 },
    { say: 'A deep network proposed about 2.2 million new crystal structures. The bars use a log scale: each grid line is ten times more.', set: { stage: 1 }, ms: 11000, notes: [{ text: 'each line: ×10', at: [4.8, -3.6], to: [3.2, -2.6] }] },
    { say: 'About 380,000 of them were predicted to be stable, checked with physics calculations. Predicted is not the same as made.', set: { stage: 2 }, ms: 10500 },
    { say: 'A robotic lab, the A-Lab, picked 58 targets and ran for 17 days, planning and mixing powders, heating them and measuring the results, around the clock.', set: { stage: 3 }, ms: 11500 },
    { say: '41 of the 58 were made: about 71%. AI narrows the search; experiment still has the last word. When you read a new AI-for-science paper, look for this last bar.', set: { stage: 4 }, ms: 12000, notes: [{ text: '41 of 58 ≈ 71%', at: [3.2, -2.0], to: [-1.4, -2.05], color: C.green }] },
  ],
  readout: (p) => {
    const s = Math.min(4, R(p.stage));
    return s ? [[FUNNEL[s - 1].label, FUNNEL[s - 1].n.toLocaleString('en-US')]] : [['Stage', 'start']];
  },
  setup(kit) {
    const X = (n) => -6.6 + Math.log10(n) * 1.85;
    for (let e = 0; e <= 7; e++) {
      kit.line([[X(10 ** e), -3.2], [X(10 ** e), 3.4]], { color: C.grid, width: 1 });
      kit.label(e === 0 ? '1' : `10^{${e}}`, [X(10 ** e), -3.55], { size: 11, color: C.grey });
    }
    const bars = FUNNEL.map((f, i) => kit.rect(-6.6, 2.0 - i * 1.5, 0.01, 0.9, { color: f.color, opacity: 0.6, strokeColor: f.color, width: 1.5 }));
    const labs = FUNNEL.map((f, i) => kit.label(`${f.n.toLocaleString('en-US')}: ${f.label}`, [-6.4, 3.15 - i * 1.5], { tex: false, size: 13, color: f.color, align: 'left' }));
    return (q) => {
      FUNNEL.forEach((f, i) => {
        const g = Math.max(0, Math.min(1, q.stage - i));
        bars[i].visible(g > 0.01).set(-6.6, 2.0 - i * 1.5, Math.max(0.02, (X(f.n) + 6.6) * g), 0.9);
        labs[i].visible(g > 0.5);
      });
    };
  },
};
