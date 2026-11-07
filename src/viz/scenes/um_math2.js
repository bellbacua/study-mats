import { C } from '../theme';
import { clamp, range } from '../kit';

const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r3 = (v) => `${Math.round(v * 1000) / 1000}`.replace('-', '−');
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
// pairs of standard normal numbers from a seeded generator (Box–Muller)
function normals(n, seed) {
  const u = rng(seed);
  const out = [];
  while (out.length < n) {
    const a = Math.max(1e-12, u());
    const b = u();
    const r = Math.sqrt(-2 * Math.log(a));
    out.push(r * Math.cos(2 * Math.PI * b), r * Math.sin(2 * Math.PI * b));
  }
  return out.slice(0, n);
}
// split a sampled curve into the run around `x0` that stays inside |y| <= lim
function segment(f, xr, lim, n = 300) {
  const xs = range(xr[0], xr[1], n);
  const ys = xs.map(f);
  let i0 = xs.findIndex((x) => x >= (xr[2] ?? 0));
  if (i0 < 0) i0 = 0;
  let a = i0;
  let b = i0;
  while (a > 0 && Number.isFinite(ys[a - 1]) && Math.abs(ys[a - 1]) <= lim) a--;
  while (b < xs.length - 1 && Number.isFinite(ys[b + 1]) && Math.abs(ys[b + 1]) <= lim) b++;
  return xs.slice(a, b + 1).map((x, i) => [x, ys[a + i]]);
}
const areaFill = (P, f, x0, x1, sign) => {
  const xs = range(x0, x1, 120);
  return [P.toW(x0, 0), ...xs.map((x) => P.toW(x, sign > 0 ? Math.max(0, f(x)) : Math.min(0, f(x)))), P.toW(x1, 0)];
};

// ---------------------------------------------------------------------------
// Integration methods: substitution moves an area; parts splits a rectangle
// ---------------------------------------------------------------------------
const fsub = (x) => 2 * x * Math.cos(x * x);

export const integration_methods = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With substitution, find the a where the total area is exactly zero (positive and negative parts cancel).',
  goal: (t) => t.method === 'sub' && Math.abs(Math.sin(t.a * t.a)) < 0.03,
  params: [
    { key: 'method', label: 'Method', type: 'choice', value: 'sub', options: [{ value: 'sub', label: 'substitution, u = x²' }, { value: 'parts', label: 'by parts: ∫ln u du' }] },
    { key: 'a', label: 'Upper limit a (substitution)', min: 0.2, max: 2.2, step: 0.01, value: 1 },
    { key: 'b', label: 'Upper limit b (by parts)', min: 1.2, max: 6, step: 0.1, value: 3 },
  ],
  beats: [
    { say: 'The area under 2x·cos(x²) from 0 to 1 looks awkward. But put u = x²: the same area is under cos u from 0 to 1, which is sin 1 ≈ 0.84.', set: { method: 'sub', a: 1 } },
    { say: 'Push a further. Both areas dip below the axis together and always match: sin(a²). Substitution only relabels the axis.', set: { method: 'sub', a: 2 } },
    { say: 'By parts: the rectangle u·v = b ln b splits into the area under ln u (hard) and the area beside it, ∫eᵛ dv = b − 1 (easy). So ∫ln u du = b ln b − b + 1.', set: { method: 'parts', b: 4 } },
  ],
  readout: (t) => {
    if (t.method === 'sub') {
      const A = Math.sin(t.a * t.a);
      return [
        ['x from 0 to', r2(t.a)],
        ['u from 0 to', r2(t.a * t.a)],
        ['Area under 2x cos(x²)', r3(A)],
        ['Area under cos u', r3(A)],
      ];
    }
    const L = Math.log(t.b);
    return [
      ['Rectangle u·v = b ln b', r3(t.b * L)],
      ['Beside the curve, ∫u dv = b − 1', r3(t.b - 1)],
      ['Under the curve, ∫ln u du', r3(t.b * L - t.b + 1)],
    ];
  },
  setup(kit) {
    const gS = kit.group();
    const gP = kit.group();
    // substitution: two planes
    const PL = kit.plane({ x: [0, 2.3, 0.5], y: [-4, 4, 1], sx: 6 / 2.3, sy: 0.85, origin: [-7.6, -0.2], xLabel: 'x', yLabel: '2x\\cos(x^2)', yEvery: 2, parent: gS });
    const PR = kit.plane({ x: [0, 5, 1], y: [-1, 1, 0.5], sx: 1.2, sy: 2.4, origin: [1.6, -0.2], xLabel: 'u', yLabel: '\\cos u', parent: gS });
    kit.line(range(0, 2.3, 300).map((x) => PL.toW(x, fsub(x))), { color: C.blue, width: 2.5, parent: gS });
    kit.line(range(0, 5, 200).map((u) => PR.toW(u, Math.cos(u))), { color: C.blue, width: 2.5, parent: gS });
    const fl = [kit.fill([], { color: C.green, opacity: 0.45, parent: gS }), kit.fill([], { color: C.red, opacity: 0.45, parent: gS })];
    const fr = [kit.fill([], { color: C.green, opacity: 0.45, parent: gS }), kit.fill([], { color: C.red, opacity: 0.45, parent: gS })];
    const al = kit.label('', [-4.5, 3.9], { size: 15, color: C.yellow, parent: gS });
    const ar = kit.label('', [4.5, 3.9], { size: 15, color: C.yellow, parent: gS });
    kit.label('u = x^2', [0.05, 1.0], { size: 16, color: C.teal, parent: gS });
    kit.arrow([-0.8, 0.5], [0.9, 0.5], { color: C.teal, parent: gS });
    // parts: ln u from 1 to b
    const PP = kit.plane({ x: [0, 6.5, 1], y: [0, 2, 0.5], sx: 2, sy: 3, origin: [-6.5, -3.4], xLabel: 'u', yLabel: 'v', parent: gP });
    const under = kit.fill([], { color: C.blue, opacity: 0.45, parent: gP });
    const beside = kit.fill([], { color: C.green, opacity: 0.45, parent: gP });
    const crv = kit.line([], { color: C.yellow, width: 3, create: false, parent: gP });
    const box = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false, parent: gP });
    const lu = kit.label('\\int \\ln u\\,du', [0, 0], { size: 15, color: C.blue, parent: gP });
    const lv = kit.label('\\int e^{v}\\,dv', [0, 0], { size: 15, color: C.green, parent: gP });
    kit.label('v = \\ln u', PP.toW(5.6, 2.05), { size: 15, color: C.yellow, parent: gP });
    return (p, t) => {
      gS.visible = t.method === 'sub';
      gP.visible = t.method === 'parts';
      if (t.method === 'sub') {
        const a = p.a;
        const u = a * a;
        fl[0].set(areaFill(PL, fsub, 0, a, 1));
        fl[1].set(areaFill(PL, fsub, 0, a, -1));
        fr[0].set(areaFill(PR, Math.cos, 0, u, 1));
        fr[1].set(areaFill(PR, Math.cos, 0, u, -1));
        const A = r3(Math.sin(u));
        al.set(`\\int_0^{${r2(a)}} 2x\\cos(x^2)\\,dx = ${A}`);
        ar.set(`\\int_0^{${r2(u)}} \\cos u\\,du = ${A}`);
      } else {
        const b = p.b;
        const L = Math.log(b);
        const us = range(1, b, 120);
        crv.set(range(0.6, 6.3, 200).map((x) => PP.toW(x, Math.log(x))).filter((q) => q[1] >= PP.toW(0, 0)[1]));
        under.set([PP.toW(1, 0), ...us.map((x) => PP.toW(x, Math.log(x))), PP.toW(b, 0)]);
        beside.set([PP.toW(0, 0), PP.toW(1, 0), ...us.map((x) => PP.toW(x, Math.log(x))), PP.toW(0, L)]);
        box.set([PP.toW(0, L), PP.toW(b, L), PP.toW(b, 0)]);
        lu.pos(PP.toW((1 + b) / 2 + 0.3, L * 0.3));
        lv.pos(PP.toW(Math.max(0.6, b * 0.25), L * 0.75));
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Volumes: a solid of revolution built from thin disks
// ---------------------------------------------------------------------------
const SOLIDS = {
  cone: { name: 'cone', x: [-3, 3], f: (x) => (1.8 * (x + 3)) / 6 },
  sphere: { name: 'sphere', x: [-2.2, 2.2], f: (x) => Math.sqrt(Math.max(0, 2.2 * 2.2 - x * x)) },
  barrel: { name: 'Kepler’s wine barrel', x: [-2.5, 2.5], f: (x) => 1.3 + 0.5 * Math.cos((Math.PI * x) / 5) },
};
function exactVol(s) {
  const [a, b] = s.x;
  const n = 400;
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    const w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2;
    sum += w * Math.PI * s.f(a + i * h) ** 2;
  }
  return (sum * h) / 3;
}
function diskVol(s, N) {
  const [a, b] = s.x;
  const h = (b - a) / N;
  let v = 0;
  for (let i = 0; i < N; i++) v += Math.PI * s.f(a + (i + 0.5) * h) ** 2 * h;
  return v;
}

export const disk_volume = {
  camera: { kind: '3d', position: [0, 4, 11] },
  mission: 'Use enough disks to get Kepler’s barrel volume within 0.1% of the exact integral.',
  goal: (t) => t.shape === 'barrel' && Math.abs(diskVol(SOLIDS.barrel, t.N) / exactVol(SOLIDS.barrel) - 1) < 0.001,
  params: [
    { key: 'shape', label: 'Solid', type: 'choice', value: 'cone', options: Object.entries(SOLIDS).map(([value, s]) => ({ value, label: s.name })) },
    { key: 'N', label: 'Number of disks', min: 2, max: 40, step: 1, value: 4 },
  ],
  beats: [
    { say: 'A cone made by spinning a straight line. With only 4 disks it looks like a stepped tower, and the total volume is a rough estimate.', set: { shape: 'cone', N: 4 } },
    { say: 'With 40 thin disks, the steps nearly vanish and the total is within 0.1% of ⅓πr²h. The integral is the limit of infinitely many disks.', set: { shape: 'cone', N: 40 } },
    { say: 'Kepler’s barrel: a curved side, but the same method. Slice, add π r² × thickness, and let the slices get thinner.', set: { shape: 'barrel', N: 12 } },
  ],
  readout: (t) => {
    const s = SOLIDS[t.shape];
    const v = diskVol(s, t.N);
    const e = exactVol(s);
    return [
      ['Disks', `${t.N}, each ${r2((s.x[1] - s.x[0]) / t.N)} cm thick`],
      ['Sum of disks', `${r2(v)} cm³`],
      ['Exact integral', `${r2(e)} cm³`],
      ['Error', `${r2((Math.abs(v - e) / e) * 100)}%`],
    ];
  },
  setup(kit) {
    const disks = Array.from({ length: 40 }, (_, i) => kit.cylinder([0, 0, 0], [0.1, 0, 0], 1, i % 2 ? C.blue : C.teal, { opacity: 0.85 }));
    const prof = kit.line([], { color: C.yellow, width: 3, create: false });
    const mer = Array.from({ length: 10 }, () => kit.line([], { color: C.white, width: 1, opacity: 0.25, create: false }));
    kit.line([[-4.2, 0, 0], [4.2, 0, 0]], { color: C.red, width: 1.5, dashed: true });
    kit.label('x', [4.5, 0, 0], { size: 15, color: C.red });
    let last = '';
    return (p, t) => {
      const s = SOLIDS[t.shape];
      const [a, b] = s.x;
      if (last !== t.shape) {
        last = t.shape;
        const xs = range(a, b, 80);
        prof.set(xs.map((x) => [x, s.f(x), 0]));
        mer.forEach((m, k) => {
          const q = (k / mer.length) * Math.PI * 2;
          m.set(xs.map((x) => [x, s.f(x) * Math.cos(q), s.f(x) * Math.sin(q)]));
        });
      }
      const N = Math.round(p.N);
      const h = (b - a) / N;
      disks.forEach((d, i) => {
        if (i >= N) {
          d.obj.visible = false;
          return;
        }
        const r = s.f(a + (i + 0.5) * h);
        d.set([a + i * h, 0, 0], [a + (i + 1) * h, 0, 0]);
        d.obj.visible = r > 1e-3;
        d.obj.scale.x = d.obj.scale.z = Math.max(r, 1e-3);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Partial derivatives: slicing a heated plate
// ---------------------------------------------------------------------------
const plateT = (x, y) => 20 + 60 * Math.exp(-(x * x + y * y) / 8);
const dTdx = (x, y) => -15 * x * Math.exp(-(x * x + y * y) / 8);
const dTdy = (x, y) => -15 * y * Math.exp(-(x * x + y * y) / 8);
const HS = 1 / 20; // world height per °C
const W3 = (x, y, T) => [x, (T - 20) * HS, -y];

export const partial_slice = {
  camera: { kind: '3d', position: [7, 6, 9] },
  mission: 'Find a point where the temperature drops by more than 15 °C per cm as you move in the +y direction.',
  goal: (t) => t.dir === 'y' && dTdy(t.x, t.y) < -15,
  params: [
    { key: 'x', label: 'x (cm)', min: -3.5, max: 3.5, step: 0.1, value: 1.5 },
    { key: 'y', label: 'y (cm)', min: -3.5, max: 3.5, step: 0.1, value: 0 },
    { key: 'dir', label: 'Slice direction', type: 'choice', value: 'x', options: [{ value: 'x', label: 'along x (y held fixed)' }, { value: 'y', label: 'along y (x held fixed)' }] },
  ],
  beats: [
    { say: 'Hold y = 0 and walk along x. The gold slice is an ordinary curve, and the red tangent’s slope is ∂T/∂x: about −17 °C per cm here.', set: { x: 1.5, y: 0, dir: 'x' } },
    { say: 'Same point, other direction. Along y the plate is flat at this spot, so ∂T/∂y = 0, even though ∂T/∂x is not.', set: { x: 1.5, y: 0, dir: 'y' } },
    { say: 'Move to y = 2 and slice along y: the slope is about −18 °C per cm, the steepest drop on the plate.', set: { x: 0, y: 2, dir: 'y' } },
  ],
  readout: (t) => [
    ['Temperature T(x, y)', `${r1(plateT(t.x, t.y))} °C`],
    ['∂T/∂x', `${r1(dTdx(t.x, t.y))} °C per cm`],
    ['∂T/∂y', `${r1(dTdy(t.x, t.y))} °C per cm`],
  ],
  setup(kit) {
    const g = kit.group();
    const vals = range(-4, 4, 17);
    const fine = range(-4, 4, 60);
    vals.forEach((v) => {
      kit.line(fine.map((x) => W3(x, v, plateT(x, v))), { color: C.blue, width: 1, opacity: 0.45, parent: g });
      kit.line(fine.map((y) => W3(v, y, plateT(v, y))), { color: C.blue, width: 1, opacity: 0.45, parent: g });
    });
    kit.line([[-4, 0, 4], [4, 0, 4], [4, 0, -4], [-4, 0, -4], [-4, 0, 4]], { color: C.grid, width: 1 });
    kit.label('x', [4.6, 0, 0], { size: 15, color: C.white });
    kit.label('y', [0, 0, -4.6], { size: 15, color: C.white });
    kit.label('T', [-4.3, 3.4, 4], { size: 15, color: C.white });
    kit.line([[-4, 0, 4], [-4, 3.2, 4]], { color: C.axis, width: 1.5 });
    const slice = kit.line([], { color: C.gold, width: 4, create: false });
    const tan = kit.line([], { color: C.red, width: 3, create: false });
    const drop = kit.line([], { color: C.white, width: 1, dashed: true, create: false });
    const ball = kit.sphere([0, 0, 0], 0.13, C.yellow, { glow: 0.6 });
    const lab = kit.label('', [0, 0, 0], { size: 15, color: C.red });
    return (p, t) => {
      const { x, y } = p;
      const T = plateT(x, y);
      const P0 = W3(x, y, T);
      ball.position.set(...P0);
      drop.set([P0, [x, 0, -y]]);
      if (t.dir === 'x') {
        slice.set(fine.map((s) => W3(s, y, plateT(s, y))));
        const m = dTdx(x, y);
        tan.set([W3(x - 1.3, y, T - 1.3 * m), W3(x + 1.3, y, T + 1.3 * m)]);
        lab.pos([P0[0], P0[1] + 0.6, P0[2]]).set(`\\partial T/\\partial x = ${r1(m)}`);
      } else {
        slice.set(fine.map((s) => W3(x, s, plateT(x, s))));
        const m = dTdy(x, y);
        tan.set([W3(x, y - 1.3, T - 1.3 * m), W3(x, y + 1.3, T + 1.3 * m)]);
        lab.pos([P0[0], P0[1] + 0.6, P0[2]]).set(`\\partial T/\\partial y = ${r1(m)}`);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Probability: dice frequencies settle on the exact probabilities
// ---------------------------------------------------------------------------
const DICE = { counts: [], rolls: 0, n: 2, last: '' };
const exactP = (n, s) => (n === 1 ? 1 / 6 : (6 - Math.abs(s - 7)) / 36);

export const dice_frequencies = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Roll two dice at least 5,000 times and see how close the share of 7s gets to 1/6.',
  goal: (t) => t.dice === 2 && DICE.n === 2 && DICE.rolls >= 5000,
  params: [
    { key: 'dice', label: 'Dice', type: 'choice', value: 2, options: [{ value: 1, label: 'one die' }, { value: 2, label: 'two dice (sum)' }] },
    { key: 'speed', label: 'Rolls per second', min: 1, max: 400, step: 1, value: 5 },
  ],
  beats: [
    { say: 'Two dice, a few rolls per second. Early on the bars jump around wildly: after 10 rolls, anything can happen.', set: { dice: 2, speed: 5 } },
    { say: 'Speed up. As the rolls pile into the thousands, each bar settles onto its exact probability: 7 is the most likely sum, 6 ways in 36.', set: { dice: 2, speed: 400 } },
    { say: 'One die: every face is equally likely, so the bars settle onto a flat line at 1/6. That settling is Bernoulli’s law of large numbers.', set: { dice: 1, speed: 400 } },
  ],
  readout: () => {
    const n = DICE.n;
    const target = n === 1 ? 6 : 7;
    const k = n === 1 ? target - 1 : target - 2;
    const share = DICE.rolls ? DICE.counts[k] / DICE.rolls : 0;
    return [
      ['Rolls so far', DICE.rolls.toLocaleString('en-US')],
      [`Share of ${target}s`, r3(share)],
      ['Exact probability', `${r3(exactP(n, target))} (= 1/6)`],
      ['Last roll', DICE.last || '—'],
    ];
  },
  setup(kit) {
    const rand = rng(42);
    const P = kit.plane({ x: [0, 12, 1], y: [0, 0.3, 0.05], sx: 0.55, sy: 22, origin: [-7.0, -3.3], yLabel: '\\text{share}', xLabel: '', numbers: false, grid: true });
    kit.label('0.1', [-7.15, P.toW(0, 0.1)[1]], { size: 11, color: '#8b949e', tex: false, align: 'right' });
    kit.label('0.2', [-7.15, P.toW(0, 0.2)[1]], { size: 11, color: '#8b949e', tex: false, align: 'right' });
    const bars = Array.from({ length: 11 }, () => kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.7, stroke: false }));
    const outl = Array.from({ length: 11 }, () => kit.line([], { color: C.yellow, width: 2.5, create: false }));
    const tick = Array.from({ length: 11 }, () => kit.label('', [0, -3.6], { size: 12, color: '#c9d1d9', tex: false }));
    // running share of the target outcome against log10(rolls)
    const Q = kit.plane({ x: [0, 4, 1], y: [0, 0.5, 0.1], sx: 1.5, sy: 12, origin: [1.6, -3.3], xLabel: '\\text{rolls}', fmt: (v, ax) => (ax === 'x' ? `${10 ** v}` : `${Math.round(v * 10) / 10}`), xEvery: 1, yEvery: 0.1 });
    const qlab = kit.label('', Q.toW(0.05, 0.53), { size: 13, color: '#c9d1d9', align: 'left' });
    const targetL = kit.line([], { color: C.yellow, width: 2, dashed: true, create: false });
    const run = kit.line([], { color: C.pink, width: 2.5, create: false });
    let hist = [];
    let acc = 0;
    let n = 0;
    const reset = (dn) => {
      n = dn;
      DICE.n = dn;
      DICE.counts = Array(dn === 1 ? 6 : 11).fill(0);
      DICE.rolls = 0;
      DICE.last = '';
      hist = [];
      const K = DICE.counts.length;
      const w = 6.4 / K;
      outl.forEach((o, i) => {
        const on = i < K;
        o.visible(on);
        tick[i].visible(on);
        bars[i].visible(on);
        if (!on) return;
        const s = dn === 1 ? i + 1 : i + 2;
        const x = -6.9 + i * w;
        const h = exactP(dn, s) * 22;
        o.set([[x + 0.06, -3.3 + h], [x + w - 0.06, -3.3 + h]]);
        tick[i].set(`${s}`).pos([x + w / 2, -3.6]);
      });
      targetL.set([Q.toW(0, 1 / 6), Q.toW(4, 1 / 6)]);
      qlab.set(dn === 1 ? '\\text{share of 6s}' : '\\text{share of 7s}');
    };
    return (_p, t, _time, dt) => {
      if (t.dice !== n) reset(t.dice);
      acc += dt * t.speed;
      let k = Math.floor(acc);
      acc -= k;
      k = Math.min(k, 200);
      const K = DICE.counts.length;
      for (let j = 0; j < k && DICE.rolls < 10000; j++) {
        const a = 1 + Math.floor(rand() * 6);
        const b = 1 + Math.floor(rand() * 6);
        const s = n === 1 ? a : a + b;
        DICE.counts[n === 1 ? s - 1 : s - 2] += 1;
        DICE.rolls += 1;
        DICE.last = n === 1 ? `${a}` : `${a} + ${b} = ${s}`;
        // index 5 is a 6 on one die, or a sum of 7 on two
        hist.push([Math.log10(DICE.rolls), DICE.counts[5] / DICE.rolls]);
      }
      if (hist.length > 1200) hist = hist.filter((_, i) => i % 2 === 0 || i === hist.length - 1);
      const w = 6.4 / K;
      for (let i = 0; i < K; i++) {
        const f = DICE.rolls ? DICE.counts[i] / DICE.rolls : 0;
        bars[i].set(-6.9 + i * w + 0.06, -3.3, w - 0.12, Math.max(0.001, Math.min(0.3, f) * 22));
      }
      run.set(hist.map(([x, y]) => Q.toW(x, Math.min(0.5, y))));
    };
  },
};

// ---------------------------------------------------------------------------
// Statistics: Galton’s bean machine
// ---------------------------------------------------------------------------
const GAL = { bins: [], total: 0, rows: 0 };
function galStats() {
  const { bins, total } = GAL;
  if (!total) return { mean: 0, sd: 0, within: 0 };
  let m = 0;
  bins.forEach((c, k) => (m += c * k));
  m /= total;
  let v = 0;
  bins.forEach((c, k) => (v += c * (k - m) ** 2));
  const sd = Math.sqrt(v / Math.max(1, total - 1));
  let w = 0;
  bins.forEach((c, k) => {
    if (Math.abs(k - m) <= sd + 1e-9) w += c;
  });
  return { mean: m, sd, within: w / total };
}

export const galton_board = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Use 12 rows of pins and drop at least 400 beads. Compare the pile with the bell curve.',
  goal: (t) => t.rows >= 12 && GAL.rows >= 12 && GAL.total >= 400,
  params: [{ key: 'rows', label: 'Rows of pins', min: 2, max: 14, step: 1, value: 6 }],
  beats: [
    { say: 'Each bead bounces left or right at random at every pin. With 6 rows, it can land in 7 bins. The middle bins are reached by the most paths, so they fill fastest.', set: { rows: 6 } },
    { say: 'With 12 rows, the pile becomes the smooth bell curve that de Moivre found for coin tosses and Gauss found for measurement errors.', set: { rows: 12 } },
    { say: 'About 68% of beads land within one standard deviation of the middle. Each landing spot is the sum of many small random pushes, which is why so many measurements are bell-shaped.', set: { rows: 12 } },
  ],
  readout: (t) => {
    if (GAL.rows !== t.rows) return [['Beads landed', '0']];
    const s = galStats();
    return [
      ['Beads landed', `${GAL.total}`],
      ['Mean bin', `${r2(s.mean)} (expected ${r1(t.rows / 2)})`],
      ['Standard deviation', `${r2(s.sd)} (expected ${r2(Math.sqrt(t.rows) / 2)})`],
      ['Within ±1σ of the mean', `${Math.round(s.within * 100)}%`],
    ];
  },
  setup(kit) {
    const rand = rng(9);
    const pegs = Array.from({ length: 120 }, () => kit.dot([0, 0], { r: 0.06, color: C.grey }));
    const bars = Array.from({ length: 15 }, () => kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.75, stroke: false }));
    const walls = Array.from({ length: 16 }, () => kit.line([], { color: C.grid, width: 1.5, create: false }));
    const bell = kit.line([], { color: C.yellow, width: 3, create: false });
    const MAXB = 60;
    const balls = Array.from({ length: MAXB }, () => ({ d: kit.dot([0, 0], { r: 0.09, color: C.gold }), on: false, path: [], u: 0 }));
    const top = 3.9;
    const binTop = -0.7;
    const floor = -4.1;
    let n = 0;
    let s = 0.6;
    let dy = 0.4;
    let clock = 0;
    const layout = (rows) => {
      n = rows;
      GAL.rows = rows;
      GAL.bins = Array(rows + 1).fill(0);
      GAL.total = 0;
      s = Math.min(0.9, 13 / (rows + 1));
      dy = (top - 0.4 - binTop) / rows;
      let k = 0;
      for (let j = 0; j < rows; j++)
        for (let i = 0; i <= j; i++) {
          pegs[k].visible(true).set([(i - j / 2) * s, top - 0.4 - j * dy]);
          k += 1;
        }
      for (; k < pegs.length; k++) pegs[k].visible(false);
      walls.forEach((w, i) => {
        if (i > rows + 1) return w.visible(false);
        const x = (i - 0.5 - rows / 2) * s;
        w.visible(true).set([[x, binTop], [x, floor]]);
        return w;
      });
      balls.forEach((b) => {
        b.on = false;
        b.d.visible(false);
      });
    };
    const ballPos = (b) => {
      // u: 0..n moves through the rows, then n..n+1 falls into the bin
      const j = Math.min(n, Math.floor(b.u));
      const f = b.u - j;
      let rights = 0;
      for (let q = 0; q < j; q++) rights += b.path[q];
      const x0 = (rights - j / 2) * s;
      if (j >= n) {
        const fill = (GAL.bins[rights] / Math.max(1, GAL.total)) * scaleH();
        return [x0, binTop - f * (binTop - floor - fill)];
      }
      const x1 = (rights + b.path[j] - (j + 1) / 2) * s;
      const y0 = top - 0.4 - (j - 0.5) * dy;
      return [x0 + (x1 - x0) * f, y0 - f * dy + 0.25 * Math.sin(Math.PI * f) * dy];
    };
    // bar height per unit share, so the tallest expected bin is about 3 units
    const scaleH = () => 3.0 / (1 / (Math.sqrt(2 * Math.PI) * (Math.sqrt(n) / 2)));
    return (_p, t, _time, dt) => {
      if (t.rows !== n) layout(t.rows);
      clock += dt;
      if (clock > 0.025) {
        clock = 0;
        const b = balls.find((q) => !q.on);
        if (b) {
          b.on = true;
          b.u = -0.5;
          b.path = Array.from({ length: n }, () => (rand() < 0.5 ? 0 : 1));
        }
      }
      balls.forEach((b) => {
        if (!b.on) return;
        b.u += dt * 12;
        if (b.u >= n + 1) {
          const k = b.path.reduce((a, c) => a + c, 0);
          GAL.bins[k] += 1;
          GAL.total += 1;
          b.on = false;
          b.d.visible(false);
          return;
        }
        b.d.visible(true).set(b.u < 0 ? [0, top + 0.3 - (b.u + 0.5) * 0.7] : ballPos(b));
      });
      const H = scaleH();
      bars.forEach((r, k) => {
        if (k > n) return r.visible(false);
        const h = GAL.total ? (GAL.bins[k] / GAL.total) * H : 0;
        r.visible(true).set((k - 0.5 - n / 2) * s + 0.04, floor, s - 0.08, Math.max(0.001, Math.min(3.3, h)));
        return r;
      });
      const sd = Math.sqrt(n) / 2;
      bell.set(range(-n / 2 - 0.5, n / 2 + 0.5, 120).map((z) => [z * s, floor + H * (Math.exp(-(z * z) / (2 * sd * sd)) / (Math.sqrt(2 * Math.PI) * sd))]));
    };
  },
};

// ---------------------------------------------------------------------------
// Taylor series: adding terms one by one
// ---------------------------------------------------------------------------
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const TAY = {
  sin: { f: Math.sin, term: (k, x) => ((-1) ** k * x ** (2 * k + 1)) / fact(2 * k + 1), tex: (k) => `${k ? ((-1) ** k > 0 ? '+' : '-') : ''}\\frac{x^{${2 * k + 1}}}{${2 * k + 1}!}`.replace('\\frac{x^{1}}{1!}', 'x'), name: 'sin x' },
  exp: { f: Math.exp, term: (k, x) => x ** k / fact(k), tex: (k) => (k === 0 ? '1' : k === 1 ? '+x' : `+\\frac{x^{${k}}}{${k}!}`), name: 'eˣ' },
  ln: { f: (x) => (x > -1 ? Math.log(1 + x) : NaN), term: (k, x) => ((-1) ** k * x ** (k + 1)) / (k + 1), tex: (k) => (k === 0 ? 'x' : `${(-1) ** k > 0 ? '+' : '-'}\\frac{x^{${k + 1}}}{${k + 1}}`), name: 'ln(1 + x)' },
};
const taylor = (fn, n, x) => {
  let s = 0;
  for (let k = 0; k < n; k++) s += TAY[fn].term(k, x);
  return s;
};

export const taylor_build = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Add enough terms to sin x that the polynomial matches it from −π to π (error below 0.01 at x = π).',
  goal: (t) => t.fn === 'sin' && Math.abs(taylor('sin', t.n, Math.PI)) < 0.01,
  params: [
    { key: 'fn', label: 'Function', type: 'choice', value: 'sin', options: Object.entries(TAY).map(([value, v]) => ({ value, label: v.name })) },
    { key: 'n', label: 'Number of terms', min: 1, max: 10, step: 1, value: 1 },
  ],
  beats: [
    { say: 'One term: sin x ≈ x. Near 0 it is excellent (the small-angle rule), but it shoots off as x grows.', set: { fn: 'sin', n: 1 } },
    { say: 'Five terms, up to x⁹/9!. Now the polynomial hugs the sine wave across a whole swing, from −π to π and beyond. Madhava had this around 1400.', set: { fn: 'sin', n: 5 } },
    { say: 'ln(1 + x) is different: however many terms you add, the polynomial only matches between −1 and 1. Outside, the series falls apart.', set: { fn: 'ln', n: 8 } },
  ],
  readout: (t) => {
    const f = TAY[t.fn];
    const x = 1;
    const a = taylor(t.fn, t.n, x);
    return [
      ['Terms', `${t.n}`],
      [`Polynomial at x = 1`, a.toFixed(6)],
      [`Exact ${f.name} at x = 1`, f.f(x).toFixed(6)],
      ['Error', Math.abs(a - f.f(x)).toExponential(1)],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-7, 7, 1], y: [-4, 4, 1], sx: 1.05, sy: 0.95, origin: [0, -0.1], xEvery: 1, yEvery: 1 });
    const fc = kit.line([], { color: C.blue, width: 3, create: false });
    const pc = kit.line([], { color: C.yellow, width: 3, create: false });
    const conv = [kit.line([P.toW(-1, -4), P.toW(-1, 4)], { color: C.red, width: 1.5, dashed: true, create: false }), kit.line([P.toW(1, -4), P.toW(1, 4)], { color: C.red, width: 1.5, dashed: true, create: false })];
    const eq = kit.label('', [0, 4.1], { size: 16, color: C.yellow });
    const fl = kit.label('', [0, 0], { size: 15, color: C.blue });
    let last = '';
    return (_p, t) => {
      const key = `${t.fn}-${t.n}`;
      if (key === last) return;
      last = key;
      const f = TAY[t.fn];
      const xr = t.fn === 'ln' ? [-0.999, 7] : [-7, 7];
      fc.set(segment(f.f, [...xr, 0], 4.3, 400).map(([x, y]) => P.toW(x, y)));
      pc.set(segment((x) => taylor(t.fn, t.n, x), [-7, 7, 0], 4.3, 600).map(([x, y]) => P.toW(x, y)));
      conv.forEach((c) => c.visible(t.fn === 'ln'));
      const shown = Math.min(t.n, 4);
      let s = '';
      for (let k = 0; k < shown; k++) s += f.tex(k);
      eq.set(`${f.name.replace('ˣ', '^x').replace('sin x', '\\sin x').replace('ln', '\\ln')} \\approx ${s}${t.n > 4 ? '+\\dots' : ''}`);
      fl.set(f.name.replace('ˣ', '^x').replace('sin x', '\\sin x').replace('ln', '\\ln')).pos(t.fn === 'exp' ? P.toW(1.9, 3.3) : t.fn === 'ln' ? P.toW(5.2, 2.3) : P.toW(4.7, -1.4));
    };
  },
};

// ---------------------------------------------------------------------------
// Least squares on a Hall–Petch plot
// ---------------------------------------------------------------------------
const HPX = [2.5, 3.2, 4.0, 4.6, 5.5, 6.3, 7.1, 8.0];
const HPY = HPX.map((x, i) => 70 + 20 * x + [6, -9, 4, -5, 8, -3, -7, 5][i]);
const sse = (m, b) => HPX.reduce((s, x, i) => s + (HPY[i] - (m * x + b)) ** 2, 0);
const BEST = (() => {
  const n = HPX.length;
  const mx = HPX.reduce((a, b) => a + b, 0) / n;
  const my = HPY.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  HPX.forEach((x, i) => {
    sxy += (x - mx) * (HPY[i] - my);
    sxx += (x - mx) ** 2;
    syy += (HPY[i] - my) ** 2;
  });
  const m = sxy / sxx;
  return { m, b: my - m * mx, r: sxy / Math.sqrt(sxx * syy) };
})();
const MINSSE = sse(BEST.m, BEST.b);

export const least_squares = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Move the line until the total area of the squares is within 5% of the smallest possible.',
  goal: (t) => sse(t.m, t.b) <= MINSSE * 1.05,
  params: [
    { key: 'm', label: 'Slope m (MPa per mm^−½)', min: 0, max: 40, step: 0.5, value: 8 },
    { key: 'b', label: 'Intercept b (MPa)', min: 0, max: 200, step: 1, value: 150 },
  ],
  beats: [
    { say: 'A poor guess. Each point’s residual, its vertical gap to the line, is drawn as a real square. The total area is large.', set: { m: 8, b: 150 } },
    { say: 'Steeper and lower: the squares shrink. Notice the big gaps count most, since their squares grow fastest.', set: { m: 16, b: 100 } },
    { say: `The least-squares line: slope ${Math.round(BEST.m * 2) / 2}, intercept ${Math.round(BEST.b)} MPa. No other line has a smaller total area of squares. Legendre’s 1805 method.`, set: { m: Math.round(BEST.m * 2) / 2, b: Math.round(BEST.b) } },
  ],
  readout: (t) => [
    ['Your line', `σ = ${r1(t.m)}x + ${Math.round(t.b)} MPa`],
    ['Total area of squares', `${Math.round(sse(t.m, t.b))} MPa²`],
    ['Smallest possible', `${Math.round(MINSSE)} MPa²`],
    ['Best line', `σ = ${r1(BEST.m)}x + ${r1(BEST.b)}, r = ${r3(BEST.r)}`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 9, 1], y: [0, 300, 50], sx: 0.72, sy: 7.4 / 300, origin: [-7.0, -3.7], xLabel: '1/\\sqrt{d}', yLabel: '\\sigma_y\\,(\\text{MPa})', yEvery: 100 });
    const sq = HPX.map(() => kit.rect(0, 0, 0, 0, { color: C.pink, opacity: 0.25, strokeColor: C.pink, width: 1.5 }));
    const res = HPX.map(() => kit.line([], { color: C.pink, width: 2, create: false }));
    const ln = kit.line([], { color: C.yellow, width: 3, create: false });
    HPX.forEach((x, i) => kit.dot(P.toW(x, HPY[i]), { r: 0.11, color: C.blue, z: 6 }));
    // meter: your total vs the smallest possible
    const mx = 1.8;
    kit.label('\\text{total area of squares}', [4.5, 3.9], { size: 14 });
    const bar = kit.rect(mx, 2.6, 0, 0.6, { color: C.pink, opacity: 0.7, stroke: false });
    const best = kit.rect(mx, 1.6, 5.5 * 0.2, 0.6, { color: C.green, opacity: 0.7, stroke: false });
    void best;
    kit.label('\\text{you}', [mx - 0.2, 2.9], { size: 13, align: 'right' });
    kit.label('\\text{best}', [mx - 0.2, 1.9], { size: 13, align: 'right' });
    const ratio = kit.label('', [4.5, 0.9], { size: 15, color: C.yellow });
    return (p) => {
      const { m, b } = p;
      ln.set([P.toW(0, b), P.toW(9, Math.min(330, m * 9 + b))].map((q, i) => (i === 1 && m * 9 + b > 330 ? P.toW((330 - b) / m, 330) : q)));
      HPX.forEach((x, i) => {
        const yl = m * x + b;
        const e = HPY[i] - yl;
        const [wx, wy] = P.toW(x, HPY[i]);
        const [, wl] = P.toW(x, yl);
        const side = Math.abs(wy - wl);
        res[i].set([[wx, wy], [wx, wl]]);
        sq[i].set(wx, Math.min(wy, wl), e > 0 ? -side : side, side);
      });
      const s = sse(m, b);
      bar.set(mx, 2.6, Math.min(5.8, 5.5 * 0.2 * (s / MINSSE)), 0.6);
      ratio.set(`${r1(s / MINSSE)}\\times \\text{ the smallest}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Hypothesis test: two batches of rods and Student’s t
// ---------------------------------------------------------------------------
const ZA = normals(30, 14);
const ZB = normals(30, 1014);
const SIG = 10;
const MU = 412;
function lgamma(z) {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  const x = z - 1;
  let a = c[0];
  const tt = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(tt) - tt + Math.log(a);
}
const tpdf = (x, v) => Math.exp(lgamma((v + 1) / 2) - lgamma(v / 2) - 0.5 * Math.log(v * Math.PI) - ((v + 1) / 2) * Math.log(1 + (x * x) / v));
function pTwo(t, v) {
  const T = Math.abs(t);
  const n = 400;
  const h = T / n;
  let s = 0;
  for (let i = 0; i <= n; i++) s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * tpdf(i * h, v);
  return clamp(1 - 2 * ((s * h) / 3), 0, 1);
}
function ttest(n, diff) {
  const A = ZA.slice(0, n).map((z) => MU + SIG * z);
  const B = ZB.slice(0, n).map((z) => MU + diff + SIG * z);
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const ma = mean(A);
  const mb = mean(B);
  const va = A.reduce((s, v) => s + (v - ma) ** 2, 0) / (n - 1);
  const vb = B.reduce((s, v) => s + (v - mb) ** 2, 0) / (n - 1);
  const sp = Math.sqrt((va + vb) / 2);
  const t = (mb - ma) / (sp * Math.sqrt(2 / n));
  const df = 2 * n - 2;
  return { A, B, ma, mb, sp, t, df, p: pTwo(t, df) };
}

export const t_test = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'The new process truly adds 10 MPa. Find the smallest number of rods per batch that shows it with p below 0.05.',
  goal: (t) => t.diff === 10 && ttest(t.n, 10).p < 0.05 && ttest(t.n - 1, 10).p >= 0.05,
  params: [
    { key: 'n', label: 'Rods tested per batch', min: 3, max: 30, step: 1, value: 5 },
    { key: 'diff', label: 'True improvement (MPa)', min: 0, max: 20, step: 1, value: 10 },
  ],
  beats: [
    { say: 'Five rods from each process; the new one is truly 10 MPa stronger. But with so few rods, the scatter between them is as large as the gain, so t is small and p is large: not enough evidence yet.', set: { n: 5, diff: 10 } },
    { say: 'Thirty rods each. The same 10 MPa gain now stands out from the scatter: t is large, the tails are tiny and p falls far below 0.05.', set: { n: 30, diff: 10 } },
    { say: 'Now no true difference at all. The means still differ a little by luck, but p stays large. A good test rarely cries "real!" when nothing is there.', set: { n: 30, diff: 0 } },
  ],
  readout: (t) => {
    const r = ttest(t.n, t.diff);
    return [
      ['Old mean / new mean', `${r1(r.ma)} / ${r1(r.mb)} MPa`],
      ['Pooled standard deviation', `${r1(r.sp)} MPa`],
      ['t (degrees of freedom)', `${r2(r.t)} (${r.df})`],
      ['p-value', r.p < 0.001 ? '< 0.001' : r3(r.p)],
      ['Verdict at 0.05', r.p < 0.05 ? 'reject H₀: real difference' : 'not enough evidence'],
    ];
  },
  setup(kit) {
    // left: dot strips of strengths
    const S = kit.plane({ x: [370, 470, 10], y: [0, 1, 1], sx: 0.068, sy: 1, origin: [-7.4 - 370 * 0.068, -2.2], xLabel: '\\text{MPa}', xEvery: 20, yAxis: false, grid: false });
    kit.label('\\text{old process}', [-4.0, 2.6], { size: 14, color: C.blue });
    kit.label('\\text{new process}', [-4.0, 0.2], { size: 14, color: C.green });
    const da = Array.from({ length: 30 }, () => kit.dot([0, 0], { r: 0.09, color: C.blue }));
    const db = Array.from({ length: 30 }, () => kit.dot([0, 0], { r: 0.09, color: C.green }));
    const mA = kit.line([], { color: C.blue, width: 3, create: false });
    const mB = kit.line([], { color: C.green, width: 3, create: false });
    void S;
    // right: Student’s t curve
    const T = kit.plane({ x: [-5, 5, 1], y: [0, 0.45, 0.1], sx: 0.62, sy: 12, origin: [4.6, -2.8], xLabel: 't', xEvery: 1, yEvery: 0.2, yLabel: '' });
    const crv = kit.line([], { color: C.yellow, width: 2.5, create: false });
    const tails = [kit.fill([], { color: C.red, opacity: 0.55 }), kit.fill([], { color: C.red, opacity: 0.55 })];
    const tl = kit.line([], { color: C.pink, width: 2.5, create: false });
    const plab = kit.label('', [4.6, 3.3], { size: 16, color: C.pink });
    kit.label('\\text{if } H_0 \\text{ were true}', [4.6, 3.9], { size: 13, color: C.yellow });
    return (_p, t) => {
      const n = t.n;
      const r = ttest(n, t.diff);
      const rr = rng(5);
      da.forEach((d, i) => {
        d.visible(i < n);
        if (i < n) d.set([S.toW(clamp(r.A[i], 370, 470), 0)[0], 1.7 + (rr() - 0.5) * 1.0]);
      });
      db.forEach((d, i) => {
        d.visible(i < n);
        if (i < n) d.set([S.toW(clamp(r.B[i], 370, 470), 0)[0], -0.7 + (rr() - 0.5) * 1.0]);
      });
      mA.set([[S.toW(r.ma, 0)[0], 1.0], [S.toW(r.ma, 0)[0], 2.4]]);
      mB.set([[S.toW(r.mb, 0)[0], -1.4], [S.toW(r.mb, 0)[0], 0.0]]);
      const v = r.df;
      crv.set(range(-5, 5, 200).map((x) => T.toW(x, tpdf(x, v))));
      const at = Math.min(5, Math.abs(r.t));
      tails[0].set([T.toW(at, 0), ...range(at, 5, 60).map((x) => T.toW(x, tpdf(x, v))), T.toW(5, 0)]);
      tails[1].set([T.toW(-5, 0), ...range(-5, -at, 60).map((x) => T.toW(x, tpdf(x, v))), T.toW(-at, 0)]);
      const tx = clamp(r.t, -5, 5);
      tl.set([T.toW(tx, 0), T.toW(tx, 0.42)]);
      plab.set(r.p < 0.001 ? 'p < 0.001' : `p = ${r3(r.p)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Differential equations: Newton’s cooling, slope field and Euler’s steps
// ---------------------------------------------------------------------------
const QUENCH = { air: 0.008, oil: 0.05, water: 0.12 };
const TA = 50;
const exactT = (T0, k, t) => TA + (T0 - TA) * Math.exp(-k * t);
const eulerT = (T0, k, h, t) => {
  let T = T0;
  for (let s = 0; s < Math.round(t / h); s++) T += h * -k * (T - TA);
  return T;
};

export const slope_field_cooling = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'In oil, make the step size small enough that Euler’s method is within 5 °C of the exact curve at t = 20 s.',
  goal: (t) => t.q === 'oil' && Math.abs(eulerT(t.T0, QUENCH.oil, t.h, 20) - exactT(t.T0, QUENCH.oil, 20)) < 5 && Math.abs((20 / t.h) - Math.round(20 / t.h)) < 1e-9,
  params: [
    { key: 'q', label: 'Quenched in', type: 'choice', value: 'oil', options: Object.entries(QUENCH).map(([value, k]) => ({ value, label: `${value} (k = ${k} per s)` })) },
    { key: 'T0', label: 'Starting temperature (°C)', min: 200, max: 900, step: 10, value: 850 },
    { key: 'h', label: 'Euler step size h (s)', min: 0.5, max: 20, step: 0.5, value: 10 },
  ],
  beats: [
    { say: 'Each short line is the cooling rate at that moment and temperature. The yellow curve follows them exactly: T = 50 + 800e^(−0.05t).', set: { q: 'oil', T0: 850, h: 10 } },
    { say: 'Euler’s method with 10-second steps: follow the slope in a straight line for 10 s, then look again. It cuts the corner and cools too fast.', set: { q: 'oil', T0: 850, h: 10 } },
    { say: 'In water (k = 0.12) with big 10-second steps, each step overshoots below 50 °C: the dots jump around. Small steps fix it. Simulations must choose steps with care.', set: { q: 'water', T0: 850, h: 10 } },
  ],
  readout: (t) => {
    const k = QUENCH[t.q];
    const ex = exactT(t.T0, k, 20);
    const eu = eulerT(t.T0, k, t.h, 20);
    const t450 = t.T0 > 450 ? Math.log((t.T0 - TA) / 400) / k : 0;
    return [
      ['Exact T at 20 s', `${r1(ex)} °C`],
      ['Euler T at 20 s', Math.abs((20 / t.h) - Math.round(20 / t.h)) < 1e-9 ? `${r1(eu)} °C` : 'no step lands on 20 s'],
      ['Time to reach 450 °C', t.T0 > 450 ? `${r1(t450)} s` : 'already below'],
      ['Steps to reach 60 s', `${Math.ceil(60 / t.h)}`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 60, 10], y: [-200, 900, 100], sx: 13 / 60, sy: 7.6 / 1100, origin: [-6.6, -3.8 + 200 * (7.6 / 1100)], xLabel: 't\\,(\\text{s})', yLabel: 'T\\,(°\\text{C})', yEvery: 200 });
    const field = [];
    for (let tt = 2.5; tt < 60; tt += 5) for (let T = 75; T < 900; T += 75) field.push({ tt, T, l: kit.line([], { color: C.grey, width: 1.5, opacity: 0.6, create: false }) });
    kit.line([P.toW(0, TA), P.toW(60, TA)], { color: C.teal, width: 1.5, dashed: true });
    kit.label('T_a = 50', P.toW(56, 85), { size: 13, color: C.teal });
    const ex = kit.line([], { color: C.yellow, width: 3, create: false });
    const eu = kit.line([], { color: C.pink, width: 2, create: false });
    const dots = Array.from({ length: 121 }, () => kit.dot([0, 0], { r: 0.08, color: C.pink, z: 6 }));
    let lastq = '';
    return (p, t) => {
      const k = QUENCH[t.q];
      if (lastq !== t.q) {
        lastq = t.q;
        field.forEach(({ tt, T, l }) => {
          const s = -k * (T - TA);
          const dx = P.toW(1, 0)[0] - P.toW(0, 0)[0];
          const dy = (P.toW(0, s)[1] - P.toW(0, 0)[1]);
          const L = Math.hypot(dx, dy);
          const [cx, cy] = P.toW(tt, T);
          const ux = (dx / L) * 0.22;
          const uy = (dy / L) * 0.22;
          l.set([[cx - ux, cy - uy], [cx + ux, cy + uy]]);
        });
      }
      ex.set(range(0, 60, 200).map((x) => P.toW(x, exactT(p.T0, k, x))));
      const h = t.h;
      const pts = [];
      let T = p.T0;
      for (let s = 0; s * h <= 60 + 1e-9 && s < dots.length; s++) {
        pts.push([s * h, T]);
        T += h * -k * (T - TA);
      }
      eu.set(pts.map(([x, y]) => P.toW(x, clamp(y, -200, 900))));
      dots.forEach((d, i) => {
        const q = pts[i];
        const on = !!q && q[1] >= -200 && q[1] <= 900;
        d.visible(on);
        if (on) d.set(P.toW(q[0], q[1]));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Vibrations: a damped mass on a spring
// ---------------------------------------------------------------------------
const WN = Math.PI; // natural angular frequency, rad/s (period 2 s)
function damped(z, t) {
  if (z < 1 - 1e-6) {
    const wd = WN * Math.sqrt(1 - z * z);
    return Math.exp(-z * WN * t) * (Math.cos(wd * t) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * t));
  }
  if (z <= 1 + 1e-6) return (1 + WN * t) * Math.exp(-WN * t);
  const s = Math.sqrt(z * z - 1);
  const a = -WN * (z - s);
  const b = -WN * (z + s);
  return (b * Math.exp(a * t) - a * Math.exp(b * t)) / (b - a);
}
const settle = (z) => {
  for (let t = 20; t > 0; t -= 0.01) if (Math.abs(damped(z, t)) > 0.05) return t;
  return 0;
};

export const damped_oscillator = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the damping that brings the mass back to rest fastest without overshooting.',
  goal: (t) => Math.abs(t.z - 1) < 1e-6,
  params: [{ key: 'z', label: 'Damping ratio ζ', min: 0, max: 2.5, step: 0.05, value: 0.1 }],
  beats: [
    { say: 'Light damping, ζ = 0.1. The mass rings up and down, each swing a little smaller: underdamped, like a guitar string.', set: { z: 0.1 } },
    { say: 'ζ = 1, critical damping. The mass returns to rest as fast as possible without passing it. Instrument needles aim near here.', set: { z: 1 } },
    { say: 'ζ = 2.5, overdamped. Too much damping makes it creep back slowly, like a door closer set too stiff.', set: { z: 2.5 } },
  ],
  readout: (t) => {
    const z = t.z;
    const kind = z === 0 ? 'undamped: swings forever' : z < 1 ? 'underdamped: rings down' : z === 1 ? 'critically damped' : 'overdamped: creeps back';
    let over = 0;
    for (let s = 0; s < 10; s += 0.01) over = Math.min(over, damped(z, s));
    return [
      ['Type', kind],
      ['Natural period', '2 s (ω_n = π rad/s)'],
      ['Overshoot past rest', `${Math.round(-over * 100)}% of the pull`],
      ['Time to settle within 5%', z === 0 ? 'never' : `${r1(settle(z))} s`],
    ];
  },
  setup(kit) {
    const ax = -5.0;
    kit.line([[ax - 1.6, 3.9], [ax + 1.6, 3.9]], { color: C.axis, width: 4 });
    const spring = kit.line([], { color: C.blue, width: 2.5, create: false });
    const damper = kit.rect(0, 0, 0.5, 0, { color: C.white, opacity: 0.08, strokeColor: C.grey, width: 2 });
    const rod = kit.line([], { color: C.grey, width: 3, create: false });
    kit.line([[ax + 1.0, 3.9], [ax + 1.0, 2.6]], { color: C.grey, width: 3 });
    const mass = kit.rect(0, 0, 1.6, 0.9, { color: C.gold, opacity: 0.9, strokeColor: C.gold, width: 2 });
    kit.line([[ax - 2.0, -0.3], [ax + 2.0, -0.3]], { color: C.green, width: 1, dashed: true });
    kit.label('\\text{rest}', [ax - 2.3, -0.3], { size: 12, color: C.green, align: 'right' });
    const P = kit.plane({ x: [0, 10, 1], y: [-1, 1, 0.5], sx: 0.9, sy: 2.6, origin: [-1.2, -0.3], xLabel: 't\\,(\\text{s})', yLabel: 'x', xEvery: 2 });
    const ghost = kit.line([], { color: C.yellow, width: 2.5, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.pink, z: 6 });
    const tl = kit.line([], { color: C.pink, width: 1, dashed: true, create: false });
    const band = [kit.line([P.toW(0, 0.05), P.toW(10, 0.05)], { color: C.green, width: 1, dashed: true, opacity: 0.5 }), kit.line([P.toW(0, -0.05), P.toW(10, -0.05)], { color: C.green, width: 1, dashed: true, opacity: 0.5 })];
    void band;
    return (p, _t, time) => {
      const z = p.z;
      ghost.set(range(0, 10, 300).map((s) => P.toW(s, damped(z, s))));
      const tt = time % 10;
      const x = damped(z, tt);
      const yMass = -0.3 + x * 1.8; // centre of the mass block
      const topM = yMass + 0.45;
      const coils = 14;
      const pts = [[ax - 0.4, 3.9], [ax - 0.4, 3.5]];
      for (let i = 1; i < coils; i++) pts.push([ax - 0.4 + (i % 2 ? -0.35 : 0.35), 3.5 - ((3.5 - topM - 0.3) * i) / coils]);
      pts.push([ax - 0.4, topM + 0.3], [ax - 0.4, topM]);
      spring.set(pts);
      mass.set(ax - 0.8, yMass - 0.45, 1.6, 0.9);
      damper.set(ax + 0.75, 1.0, 0.5, 1.6);
      rod.set([[ax + 1.0, topM], [ax + 1.0, 1.3 + x * 0.9]]);
      dot.set(P.toW(tt, x));
      tl.set([[ax + 0.8, yMass], P.toW(tt, x)]);
    };
  },
};

// ---------------------------------------------------------------------------
// Matrices: a 2×2 matrix moves the whole grid
// ---------------------------------------------------------------------------
export const matrix_transform = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a matrix (not all zeros) that squashes the whole plane onto a line: determinant 0.',
  goal: (t) => Math.abs(t.a * t.d - t.b * t.c) < 1e-9 && Math.abs(t.a) + Math.abs(t.b) + Math.abs(t.c) + Math.abs(t.d) > 0,
  params: [
    { key: 'a', label: 'a (top left)', min: -2, max: 2, step: 0.1, value: 1 },
    { key: 'b', label: 'b (top right)', min: -2, max: 2, step: 0.1, value: 0 },
    { key: 'c', label: 'c (bottom left)', min: -2, max: 2, step: 0.1, value: 0 },
    { key: 'd', label: 'd (bottom right)', min: -2, max: 2, step: 0.1, value: 1 },
  ],
  beats: [
    { say: 'A shear: (1, 0) stays put, (0, 1) leans over to (1, 1). Squares become slanted parallelograms, but the area stays the same: determinant 1.', set: { a: 1, b: 1, c: 0, d: 1 } },
    { say: 'A stretch of 2 sideways and 1.5 upwards: every area grows 3 times. The determinant is 2 × 1.5 = 3.', set: { a: 2, b: 0, c: 0, d: 1.5 } },
    { say: 'A rotation by 90°: (1, 0) goes to (0, 1). Turning a crystal’s axes is a matrix like this, and areas do not change.', set: { a: 0, b: -1, c: 1, d: 0 } },
  ],
  readout: (t) => {
    const det = t.a * t.d - t.b * t.c;
    return [
      ['(1, 0) goes to', `(${r1(t.a)}, ${r1(t.c)})`],
      ['(0, 1) goes to', `(${r1(t.b)}, ${r1(t.d)})`],
      ['Determinant ad − bc', r2(det)],
      ['Effect on areas', Math.abs(det) < 1e-9 ? 'squashed flat: cannot be undone' : `× ${r2(Math.abs(det))}${det < 0 ? ', flipped over' : ''}`],
    ];
  },
  setup(kit) {
    kit.plane({ x: [-8, 8, 1], y: [-5, 5, 1], numbers: false });
    const N = 11;
    const vl = range(-N, N, 2 * N + 1).map(() => kit.line([], { color: C.blue, width: 1.5, opacity: 0.8, create: false }));
    const hl = range(-N, N, 2 * N + 1).map(() => kit.line([], { color: C.blue, width: 1.5, opacity: 0.8, create: false }));
    const sq = kit.fill([], { color: C.yellow, opacity: 0.35 });
    const ei = kit.arrow([0, 0], [1, 0], { color: C.green });
    const ej = kit.arrow([0, 0], [0, 1], { color: C.red });
    kit.rect(-7.9, 1.7, 3.4, 2.75, { color: C.bg, opacity: 0.85, strokeColor: C.grid, width: 1, z: 8 });
    const mat = kit.label('', [-6.2, 3.6], { size: 20, color: C.white });
    const detL = kit.label('', [-6.2, 2.3], { size: 16, color: C.yellow });
    return (p) => {
      const { a, b, c, d } = p;
      const M = (x, y) => [a * x + b * y, c * x + d * y];
      const ks = range(-N, N, 2 * N + 1);
      ks.forEach((k, i) => {
        vl[i].set([M(k, -N), M(k, N)]);
        hl[i].set([M(-N, k), M(N, k)]);
      });
      sq.set([M(0, 0), M(1, 0), M(1, 1), M(0, 1)]);
      ei.set([0, 0], M(1, 0));
      ej.set([0, 0], M(0, 1));
      mat.set(`\\begin{pmatrix} ${r1(a)} & ${r1(b)} \\\\ ${r1(c)} & ${r1(d)} \\end{pmatrix}`);
      detL.set(`\\det = ${r2(a * d - b * c)}`);
    };
  },
};
