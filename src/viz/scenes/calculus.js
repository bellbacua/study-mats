import { C } from '../theme';
import { clamp, lerp, poly, range, smooth } from '../kit';

const n2 = (v) => Math.round(v * 100) / 100;

// ---------------------------------------------------------------------------
// Quadratics: roots, vertex, discriminant
// ---------------------------------------------------------------------------
export const quadratic_parabola_lab = {
  camera: { kind: '2d', x: [-7.5, 7.5], y: [-4.6, 4.6] },
  params: [
    { key: 'a', label: 'a (opens up/down, width)', min: -2, max: 2, step: 0.25, value: 1 },
    { key: 'b', label: 'b (slides sideways)', min: -6, max: 6, step: 0.5, value: 0 },
    { key: 'c', label: 'c (lifts up/down)', min: -8, max: 8, step: 0.5, value: -4 },
  ],
  beats: [
    { say: 'x² − 4: the parabola crosses zero at ±2. Roots are just where the curve hits the x-axis.', set: { a: 1, b: 0, c: -4 } },
    { say: 'x² + 5x + 6 = (x + 2)(x + 3): two numbers that multiply to 6 and add to 5. Roots −2 and −3.', set: { a: 1, b: 5, c: 6 } },
    { say: 'Lift it until b² − 4ac < 0: the curve never touches the axis, so there are no real roots.', set: { a: 1, b: 2, c: 3 } },
  ],
  readout: (t) => {
    const D = t.b * t.b - 4 * t.a * t.c;
    if (t.a === 0) return [['Note', 'a = 0 makes it a straight line']];
    const vx = -t.b / (2 * t.a);
    const vy = t.a * vx * vx + t.b * vx + t.c;
    const roots =
      D < 0 ? 'none (curve misses the axis)' : D === 0 ? `one: x = ${n2(vx)}` : `x = ${n2((-t.b - Math.sqrt(D)) / (2 * t.a))}, ${n2((-t.b + Math.sqrt(D)) / (2 * t.a))}`;
    return [
      ['Discriminant b² − 4ac', n2(D)],
      ['Roots', roots],
      ['Vertex', `(${n2(vx)}, ${n2(vy)})`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-7, 7, 1], y: [-8, 8, 2], sy: 0.5, yEvery: 4 });
    const curve = kit.curve((x) => x * x - 4, [-7, 7], { plane: P, color: C.blue, width: 4, clipY: [-9, 9] });
    const axis = kit.line([[0, 0], [0, 0]], { color: C.grey, width: 1.5, dashed: true, create: false });
    const vertex = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    const roots = [0, 1].map(() => kit.dot([0, 0], { r: 0.14, color: C.red, z: 6 }));
    const eq = kit.label('', [-4.5, 4.1], { size: 26 });
    return (p, t) => {
      const f = (x) => p.a * x * x + p.b * x + p.c;
      curve.set(f);
      const a = Math.abs(p.a) < 1e-3 ? 1e-3 : p.a;
      const vx = -p.b / (2 * a);
      vertex.set(P.toW(clamp(vx, -7, 7), clamp(f(vx), -9, 9)));
      axis.set([P.toW(vx, -8), P.toW(vx, 8)]).visible(Math.abs(vx) < 7);
      const D = p.b * p.b - 4 * a * p.c;
      const rs = D >= 0 ? [(-p.b - Math.sqrt(D)) / (2 * a), (-p.b + Math.sqrt(D)) / (2 * a)] : [];
      roots.forEach((r, i) => r.visible(rs[i] !== undefined && Math.abs(rs[i]) < 7).set(P.toW(rs[i] ?? 0, 0)));
      eq.set(`y = ${poly([[t.a, 'x^2'], [t.b, 'x'], [t.c, '']])}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Linear systems: two lines, one intersection
// ---------------------------------------------------------------------------
export const linear_system_intersection = {
  camera: { kind: '2d', x: [-7.5, 7.5], y: [-4.6, 4.6] },
  params: [
    { key: 'm1', label: 'Line 1 slope', min: -3, max: 3, step: 0.25, value: 1 },
    { key: 'b1', label: 'Line 1 intercept', min: -4, max: 4, step: 0.5, value: 1 },
    { key: 'm2', label: 'Line 2 slope', min: -3, max: 3, step: 0.25, value: -0.5 },
    { key: 'b2', label: 'Line 2 intercept', min: -4, max: 4, step: 0.5, value: 2.5 },
  ],
  beats: [
    { say: 'Each equation is a line of all the points that satisfy it. The solution must satisfy both: the crossing point.', set: { m1: 1, b1: 1, m2: -0.5, b2: 2.5 } },
    { say: 'Substitution: set m₁x + b₁ = m₂x + b₂ and solve for x. Here x = 1, y = 2.', set: { m1: 1, b1: 1, m2: -1, b2: 3 } },
    { say: 'Same slope, different intercepts: parallel lines never meet. No solution.', set: { m1: 1, b1: 1, m2: 1, b2: -2 } },
  ],
  readout: (t) => {
    if (t.m1 === t.m2) return [['Solution', t.b1 === t.b2 ? 'infinitely many (same line)' : 'none (parallel)']];
    const x = (t.b2 - t.b1) / (t.m1 - t.m2);
    return [
      ['x = (b₂ − b₁)/(m₁ − m₂)', n2(x)],
      ['y', n2(t.m1 * x + t.b1)],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-7, 7, 1], y: [-4, 4, 1] });
    const l1 = kit.curve((x) => x, [-7, 7], { plane: P, color: C.blue, width: 4, clipY: [-4.5, 4.5] });
    const l2 = kit.curve((x) => x, [-7, 7], { plane: P, color: C.yellow, width: 4, clipY: [-4.5, 4.5] });
    const hit = kit.dot([0, 0], { r: 0.15, color: C.red, z: 6 });
    const hitL = kit.label('', [0, 0], { size: 16, align: 'left' });
    const e1 = kit.label('', [-6.8, 4.1], { color: C.blue, align: 'left', size: 22 });
    const e2 = kit.label('', [1, 4.1], { color: C.yellow, align: 'left', size: 22 });
    return (p, t) => {
      l1.set((x) => p.m1 * x + p.b1);
      l2.set((x) => p.m2 * x + p.b2);
      const dm = p.m1 - p.m2;
      const ok = Math.abs(dm) > 1e-3;
      const x = ok ? (p.b2 - p.b1) / dm : 0;
      const y = p.m1 * x + p.b1;
      const vis = ok && Math.abs(x) < 7 && Math.abs(y) < 4.5;
      hit.set(P.toW(x, y)).visible(vis);
      hitL.set(`(${n2(x)}, ${n2(y)})`).pos([x + 0.25, y + 0.3]).visible(vis);
      e1.set(`y = ${poly([[t.m1, 'x'], [t.b1, '']])}`);
      e2.set(`y = ${poly([[t.m2, 'x'], [t.b2, '']])}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Logarithms: Arrhenius curve morphs into a straight line
// ---------------------------------------------------------------------------
export const arrhenius_log_linearizer = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.6, 4.6] },
  params: [
    { key: 'Ea', label: 'Activation energy Ea (kJ/mol)', min: 20, max: 250, step: 5, value: 120 },
    {
      key: 'morph',
      label: 'View',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Rate k vs T' },
        { value: 1, label: 'ln k vs 1/T' },
      ],
    },
  ],
  beats: [
    { say: 'Reaction rate k = A·e^(−Ea/RT) explodes with temperature. Hard to read slopes off this curve.', set: { Ea: 120, morph: 0 } },
    { say: 'Take ln of both sides: ln k = ln A − (Ea/R)·(1/T). Plot against 1/T and the curve straightens out.', set: { Ea: 120, morph: 1 } },
    { say: 'The slope of that line is −Ea/R. Bigger Ea, steeper line. That is how labs measure activation energy.', set: { Ea: 220, morph: 1 } },
  ],
  readout: (t) => [
    ['Equation', t.morph ? 'ln k = ln A − (Ea/R)(1/T)' : 'k = A·e^(−Ea/RT)'],
    ['Slope of the line', `−Ea/R = −${Math.round((t.Ea * 1000) / 8.314)} K`],
    ['Rate ratio k(1000 K)/k(500 K)', Math.exp(((t.Ea * 1000) / 8.314) * (1 / 500 - 1 / 1000)).toExponential(1)],
  ],
  setup(kit) {
    const X0 = -6;
    const W = 12;
    const Y0 = -3.4;
    const H = 6.8;
    kit.line([[X0, Y0], [X0 + W, Y0]], { color: C.axis, width: 2 });
    kit.line([[X0, Y0], [X0, Y0 + H]], { color: C.axis, width: 2 });
    const xA = kit.label('T\\ (\\text{K})', [X0 + W, Y0 - 0.45], { align: 'right' });
    const yA = kit.label('k', [X0 - 0.3, Y0 + H], { align: 'right' });
    const xB = kit.label('1/T', [X0 + W, Y0 - 0.45], { align: 'right' });
    const yB = kit.label('\\ln k', [X0 - 0.3, Y0 + H], { align: 'right' });
    const curve = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 4 });
    const marks = [500, 750, 1000, 1400].map((T) => ({ T, d: kit.dot([0, 0], { r: 0.12, color: C.yellow, z: 6 }), l: kit.label(`${T}\\,K`, [0, 0], { size: 13, align: 'left' }) }));
    const slope = kit.label('', [1.2, 2.6], { size: 22, color: C.green });
    const Ts = range(400, 1500, 160);
    return (p, t) => {
      const E = (p.Ea * 1000) / 8.314;
      const ks = Ts.map((T) => Math.exp(-E / T));
      const kmax = Math.exp(-E / 1500);
      // fixed scale for the straight-line view, so a bigger Ea really looks steeper
      const lnMin = -(250000 / 8.314) / 400;
      const lnMax = 0;
      const m = smooth(p.morph);
      const map = (T, k) => {
        const a = [X0 + (W * (T - 400)) / 1100, Y0 + H * (k / kmax)];
        const u = (1 / T - 1 / 1500) / (1 / 400 - 1 / 1500);
        const b = [X0 + W * u, Y0 + (H * (Math.log(k) - lnMin)) / (lnMax - lnMin)];
        return [lerp(a[0], b[0], m), lerp(a[1], b[1], m)];
      };
      curve.set(Ts.map((T, i) => map(T, ks[i])));
      marks.forEach(({ T, d, l }) => {
        const q = map(T, Math.exp(-E / T));
        d.set(q);
        l.pos([q[0] + 0.15, q[1] + 0.25]);
      });
      xA.opacity(1 - m);
      yA.opacity(1 - m);
      xB.opacity(m);
      yB.opacity(m);
      slope.set(`\\text{slope} = -\\tfrac{E_a}{R} = -${Math.round(E)}\\,\\text{K}`).opacity(m);
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// Derivatives: secant → tangent as h → 0
// ---------------------------------------------------------------------------
const FUNCS = {
  cubic: { f: (x) => 0.08 * x ** 3 - 0.9 * x + 0.5, d: (x) => 0.24 * x * x - 0.9, tex: '0.08x^3 - 0.9x + 0.5' },
  wave: { f: (x) => 2 * Math.sin(x), d: (x) => 2 * Math.cos(x), tex: '2\\sin x' },
  bowl: { f: (x) => 0.25 * x * x - 2, d: (x) => 0.5 * x, tex: '0.25x^2 - 2' },
};

export const derivative_tangent_lab = {
  camera: { kind: '2d', x: [-7.5, 7.5], y: [-4.6, 4.6] },
  params: [
    {
      key: 'fn',
      label: 'Function',
      type: 'choice',
      value: 'cubic',
      options: [
        { value: 'cubic', label: 'Cubic' },
        { value: 'wave', label: 'Sine wave' },
        { value: 'bowl', label: 'Parabola' },
      ],
    },
    { key: 'x0', label: 'Point x', min: -5, max: 5, step: 0.1, value: 1 },
    { key: 'h', label: 'Gap h (shrink it!)', min: 0.01, max: 3, step: 0.01, value: 2 },
    {
      key: 'trace',
      label: 'Show slope graph',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Off' },
        { value: 1, label: "On (f′)" },
      ],
    },
  ],
  beats: [
    { say: 'Average slope between two points: rise over run, with run = h.', set: { fn: 'cubic', x0: 1, h: 2.5, trace: 0 } },
    { say: 'Shrink h. The secant line pivots and settles onto the tangent. That limiting slope is the derivative.', set: { fn: 'cubic', x0: 1, h: 0.01, trace: 0 } },
    { say: 'Do it at every x and plot the slopes: you get a whole new function, f′(x). Where f peaks, f′ crosses zero.', set: { fn: 'wave', x0: 1.57, h: 0.01, trace: 1 } },
  ],
  goal: (t) => t.h <= 0.05,
  readout: (t) => {
    const F = FUNCS[t.fn];
    const sec = (F.f(t.x0 + t.h) - F.f(t.x0)) / t.h;
    return [
      ['Secant slope (Δy/Δx)', n2(sec)],
      ['True derivative f′(x)', n2(F.d(t.x0))],
      ['Difference', n2(Math.abs(sec - F.d(t.x0)))],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-7, 7, 1], y: [-4, 4, 1] });
    const curve = kit.curve(FUNCS.cubic.f, [-7, 7], { plane: P, color: C.blue, width: 4, clipY: [-4.5, 4.5] });
    const deriv = kit.curve(FUNCS.cubic.d, [-7, 7], { plane: P, color: C.green, width: 3, clipY: [-4.5, 4.5], create: false });
    const sec = kit.line([[0, 0], [1, 1]], { color: C.yellow, width: 3, create: false });
    const A = kit.dot([0, 0], { r: 0.12, color: C.white, z: 6 });
    const B = kit.dot([0, 0], { r: 0.1, color: C.yellow, z: 6 });
    const run = kit.line([[0, 0], [0, 0]], { color: C.grey, width: 1.5, dashed: true, create: false });
    const rise = kit.line([[0, 0], [0, 0]], { color: C.grey, width: 1.5, dashed: true, create: false });
    const sd = kit.dot([0, 0], { r: 0.1, color: C.green, z: 6 });
    const eq = kit.label('', [-4.2, 4.1], { size: 24 });
    let fade = 0;
    return (p, t, _time, dt) => {
      const F = FUNCS[t.fn];
      curve.set(F.f);
      fade += ((t.trace ? 1 : 0) - fade) * (1 - Math.exp(-dt * 4));
      deriv.set(F.d).opacity(fade).visible(fade > 0.02);
      sd.set([p.x0, F.d(p.x0)]).visible(fade > 0.02);
      const y0 = F.f(p.x0);
      const y1 = F.f(p.x0 + p.h);
      const m = (y1 - y0) / p.h;
      sec.set([[p.x0 - 8, y0 - 8 * m], [p.x0 + 8, y0 + 8 * m]]);
      A.set([p.x0, y0]);
      B.set([p.x0 + p.h, y1]);
      run.set([[p.x0, y0], [p.x0 + p.h, y0]]);
      rise.set([[p.x0 + p.h, y0], [p.x0 + p.h, y1]]);
      eq.set(`f(x) = ${F.tex} \\quad \\frac{\\Delta y}{\\Delta x} = ${n2(m)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Integrals: Riemann rectangles fill the area under a stress-strain curve
// ---------------------------------------------------------------------------
const sigma = (e) => 3.4 * (1 - Math.exp(-2.4 * e)) - 0.08 * e * e;

export const integral_area_toughness_lab = {
  camera: { kind: '2d', x: [-7.5, 7.5], y: [-4.4, 4.6] },
  params: [
    { key: 'n', label: 'Number of rectangles', min: 1, max: 80, step: 1, value: 4 },
    { key: 'b', label: 'Strain at fracture (upper limit)', min: 0.5, max: 4, step: 0.1, value: 3.5 },
  ],
  beats: [
    { say: 'Area under a curve, the Archimedes way: chop it into rectangles and add them up. 4 is crude.', set: { n: 4, b: 3.5 } },
    { say: '80 thin rectangles hug the curve. In the limit this sum becomes the integral ∫σ dε.', set: { n: 80, b: 3.5 } },
    { say: 'For a material, that area is toughness: energy absorbed before breaking. Fracture early and you lose most of it.', set: { n: 80, b: 1.2 } },
  ],
  goal: (t) => t.n >= 40,
  readout: (t) => {
    const w = t.b / t.n;
    let s = 0;
    for (let i = 0; i < t.n; i++) s += sigma((i + 0.5) * w) * w;
    let exact = 0;
    const N = 2000;
    for (let i = 0; i < N; i++) exact += sigma(((i + 0.5) * t.b) / N) * (t.b / N);
    return [
      ['Sum of rectangles', n2(s)],
      ['True area ∫σ dε', n2(exact)],
      ['Error', `${n2((Math.abs(s - exact) / exact) * 100)}%`],
    ];
  },
  setup(kit) {
    const sx = 12 / 4.2;
    const sy = 7.4 / 3.8;
    const P = kit.plane({ x: [0, 4.2, 0.5], y: [0, 3.8, 0.5], sx, sy, origin: [-6, -3.7], xEvery: 1, yEvery: 1, xLabel: '\\varepsilon', yLabel: '\\sigma' });
    const MAX = 80;
    const rects = Array.from({ length: MAX }, (_, i) =>
      kit.rect(0, 0, 0, 0, { color: i % 2 ? C.teal : C.blue, opacity: 0.55, strokeColor: C.blue, width: 1 })
    );
    kit.curve(sigma, [0, 4.2], { plane: P, color: C.yellow, width: 4 });
    const end = kit.line([[0, 0], [0, 0]], { color: C.red, width: 2, dashed: true, create: false });
    const endL = kit.label('fracture', [0, 0], { tex: false, cls: 'tick', color: C.red });
    const eq = kit.label('', [1.5, 4.1], { size: 24 });
    return (p, t) => {
      const n = t.n;
      const w = p.b / n;
      let s = 0;
      rects.forEach((r, i) => {
        r.visible(i < n);
        if (i >= n) return;
        const h = sigma((i + 0.5) * w);
        s += h * w;
        const [x, y] = P.toW(i * w, 0);
        r.set(x, y, w * sx, h * sy);
      });
      end.set([P.toW(p.b, 0), P.toW(p.b, 3.8)]);
      endL.pos(P.toW(p.b, 3.95));
      eq.set(`\\sum_{i=1}^{${n}} \\sigma(\\varepsilon_i)\\,\\Delta\\varepsilon \\approx ${n2(s)}`);
    };
  },
};
