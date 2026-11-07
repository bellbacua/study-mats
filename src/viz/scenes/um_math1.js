import { C } from '../theme';
import { clamp, range } from '../kit';

const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const ease = (dt, rate = 5) => 1 - Math.exp(-dt * rate);

// ---------------------------------------------------------------------------
// Functions: input → rule → output, and the graph it leaves behind
// ---------------------------------------------------------------------------
const RULES = {
  lin: { tex: 'f(x) = 2x + 1', f: (x) => 2 * x + 1 },
  sq: { tex: 'f(x) = x^2', f: (x) => x * x },
  sqrt: { tex: 'f(x) = \\sqrt{x}', f: (x) => (x < 0 ? NaN : Math.sqrt(x)) },
  inv: { tex: 'f(x) = \\tfrac{4}{x}', f: (x) => (x === 0 ? NaN : 4 / x) },
};

export const function_machine = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Feed −2 into the √x machine and watch it refuse: −2 is outside its domain.',
  goal: (t) => t.rule === 'sqrt' && t.x < 0,
  params: [
    { key: 'rule', label: 'Rule', type: 'choice', value: 'lin', options: [
      { value: 'lin', label: '2x + 1' }, { value: 'sq', label: 'x²' }, { value: 'sqrt', label: '√x' }, { value: 'inv', label: '4 / x' },
    ] },
    { key: 'x', label: 'Input x', min: -3, max: 3, step: 0.5, value: 1 },
  ],
  beats: [
    { say: 'Put 1 into the machine f(x) = 2x + 1. It doubles and adds one: out comes 3, and a dot lands at (1, 3).', set: { rule: 'lin', x: 1 } },
    { say: 'Feed it 2.5: out comes 6. Every input leaves a dot, and together the dots trace the graph of the function.', set: { rule: 'lin', x: 2.5 } },
    { say: 'Swap in x². Both 2 and −2 come out as 4. Two inputs may share an output; what is never allowed is one input with two outputs.', set: { rule: 'sq', x: -2 } },
  ],
  readout: (t) => {
    const y = RULES[t.rule].f(t.x);
    return [
      ['Input', r2(t.x)],
      ['Output', Number.isFinite(y) ? r2(y) : 'not allowed'],
      ['In its domain?', Number.isFinite(y) ? 'yes' : 'no: outside the domain'],
    ];
  },
  setup(kit) {
    // machine
    const body = kit.rect(-7.4, -1.1, 4.6, 2.2, { color: C.blue, opacity: 0.12, strokeColor: C.blue, width: 2 });
    kit.fill([[-5.8, 1.1], [-4.4, 1.1], [-4.8, 1.7], [-5.4, 1.7]], { color: C.blue, opacity: 0.35 });
    kit.fill([[-5.4, -1.1], [-4.8, -1.1], [-4.6, -1.6], [-5.6, -1.6]], { color: C.blue, opacity: 0.35 });
    const ruleL = kit.label(RULES.lin.tex, [-5.1, 0], { size: 20 });
    const inTok = kit.label('', [-5.1, 3], { size: 22, color: C.yellow });
    const outTok = kit.label('', [-5.1, -2.4], { size: 22, color: C.green });
    kit.label('\\text{input}', [-5.1, 3.9], { size: 14, color: '#8b949e' });
    kit.label('\\text{output}', [-5.1, -3.6], { size: 14, color: '#8b949e' });
    // graph
    const P = kit.plane({ x: [-3, 3, 1], y: [-4, 9, 1], sx: 0.75, sy: 0.5, origin: [3.8, -1.6], yEvery: 2 });
    const ghost = kit.curve(RULES.lin.f, [-3, 3], { plane: P, color: C.blue, width: 2, opacity: 0.18, clipY: [-4, 9] });
    const trail = Array.from({ length: 13 }, () => kit.dot([0, 0], { r: 0.08, color: C.blue, opacity: 0.7 }).visible(false));
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    let last = null;
    let since = 10;
    const visited = {};
    return (_p, t, _time, dt) => {
      const R = RULES[t.rule];
      const key = `${t.rule}|${t.x}`;
      if (key !== last) {
        if (last?.split('|')[0] !== t.rule) {
          ruleL.set(R.tex);
          ghost.set(R.f);
          for (const k of Object.keys(visited)) delete visited[k];
        }
        last = key;
        since = 0;
      }
      since += dt;
      const y = R.f(t.x);
      const ok = Number.isFinite(y);
      // token falls in, then the output drops out
      const a = clamp(since / 0.6, 0, 1);
      const b = clamp((since - 0.6) / 0.6, 0, 1);
      inTok.set(r2(t.x)).pos([-5.1, 3 - 2.4 * a]).opacity(1 - a * 0.85);
      outTok.set(ok ? r2(y) : '\\text{refused!}').pos([-5.1, -0.9 - 1.5 * b]).opacity(b).color(ok ? C.green : C.red);
      body.color(!ok && b > 0 ? C.red : C.blue);
      if (ok && b >= 1) visited[t.x] = y;
      const pts = Object.entries(visited);
      trail.forEach((d, i) => {
        const on = i < pts.length;
        d.visible(on);
        if (on) d.set(P.toW(Number(pts[i][0]), pts[i][1]));
      });
      dot.visible(ok && b > 0.2);
      if (ok) dot.set(P.toW(t.x, clamp(y, -4, 9)));
    };
  },
};

// ---------------------------------------------------------------------------
// Radians and the sine wave: a spinning point unrolled over time
// ---------------------------------------------------------------------------
export const sine_wave_unwrap = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make a wave that repeats every π seconds (period T = π).',
  goal: (t) => Math.abs(t.w - 2) < 1e-9,
  params: [
    { key: 'A', label: 'Amplitude A', min: 0.5, max: 2, step: 0.25, value: 1 },
    { key: 'w', label: 'Angular speed ω (rad/s)', min: 0.5, max: 3, step: 0.25, value: 1 },
    { key: 'phi', label: 'Start φ', type: 'choice', value: '0', options: [
      { value: '0', label: '0' }, { value: 'q', label: 'π/2 (cosine)' }, { value: 'h', label: 'π' },
    ] },
  ],
  beats: [
    { say: 'A point goes round a circle at 1 radian per second. Its height, plotted against time, is the sine wave.', set: { A: 1, w: 1, phi: '0' } },
    { say: 'Double the speed to ω = 2: the wave squeezes, and one cycle now takes T = 2π/ω = π seconds.', set: { A: 1, w: 2, phi: '0' } },
    { say: 'Start a quarter turn ahead (φ = π/2) and the same wave becomes a cosine. Sine and cosine are one wave, shifted.', set: { A: 1.5, w: 1, phi: 'q' } },
  ],
  readout: (t) => [
    ['Wave', `y = ${r2(t.A)} sin(${r2(t.w)}t${t.phi === '0' ? '' : t.phi === 'q' ? ' + π/2' : ' + π'})`],
    ['Period T = 2π/ω', `${r2((2 * Math.PI) / t.w)} s`],
    ['Frequency f = 1/T', `${r2(t.w / (2 * Math.PI))} Hz`],
  ],
  setup(kit) {
    const cx = -5.2;
    const S = 1.45;
    kit.line([[-7.6, 0], [7.8, 0]], { color: C.axis, width: 1.5 });
    kit.line([[-2.4, -3.6], [-2.4, 3.6]], { color: C.axis, width: 1.5 });
    kit.label('t \\to', [7.4, -0.35], { size: 14, color: '#8b949e' });
    const circle = kit.line([], { color: C.blue, width: 2, create: false });
    const arc = kit.line([], { color: C.gold, width: 4, create: false });
    const radius = kit.line([[cx, 0], [cx, 0]], { color: C.white, width: 2, create: false });
    const pt = kit.dot([cx, 0], { r: 0.13, color: C.yellow });
    const link = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 1.5, dashed: true, opacity: 0.7, create: false });
    const wave = kit.line([], { color: C.yellow, width: 3, create: false });
    const head = kit.dot([0, 0], { r: 0.1, color: C.yellow });
    const ang = kit.label('', [cx, -3.9], { size: 18 });
    const eq = kit.label('', [2.8, 3.9], { size: 20 });
    let theta = 0;
    return (p, t, _time, dt) => {
      const phi = { 0: 0, q: Math.PI / 2, h: Math.PI }[t.phi];
      theta += p.w * dt;
      const R = p.A * S;
      circle.set(range(0, 2 * Math.PI, 90).map((a) => [cx + R * Math.cos(a), R * Math.sin(a)]));
      const th = theta + phi;
      const thm = ((th % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      arc.set(range(0, thm, 40).map((a) => [cx + R * 0.35 * Math.cos(a), R * 0.35 * Math.sin(a)]));
      const P = [cx + R * Math.cos(th), R * Math.sin(th)];
      radius.set([[cx, 0], P]);
      pt.set(P);
      link.set([P, [-2.4, P[1]]]);
      head.set([-2.4, P[1]]);
      // the wave scrolls right: x = −2.4 is now, further right is earlier
      wave.set(range(0, 10, 200).map((s) => [-2.4 + s, R * Math.sin(theta - p.w * s * 0.9 + phi)]));
      ang.set(`\\theta = ${thm.toFixed(2)}\\text{ rad} = ${Math.round((thm * 180) / Math.PI)}^\\circ`);
      eq.set(`y = ${r2(t.A)}\\sin(${r2(t.w)}t${t.phi === '0' ? '' : t.phi === 'q' ? '+\\tfrac{\\pi}{2}' : '+\\pi'})`);
    };
  },
};

// ---------------------------------------------------------------------------
// Vectors: tip-to-tail addition, components and the dot product
// ---------------------------------------------------------------------------
const vec = (F, a) => [F * Math.cos((a * Math.PI) / 180), F * Math.sin((a * Math.PI) / 180)];

export const vector_add = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make two 5 N forces cancel completely (sum = 0).',
  goal: (t) => t.F1 === 5 && t.F2 === 5 && Math.hypot(...[0, 1].map((i) => vec(t.F1, t.a1)[i] + vec(t.F2, t.a2)[i])) < 0.05,
  params: [
    { key: 'F1', label: 'Force a (N)', min: 1, max: 6, step: 0.5, value: 4 },
    { key: 'a1', label: 'Angle of a (°)', min: 0, max: 360, step: 5, value: 20 },
    { key: 'F2', label: 'Force b (N)', min: 1, max: 6, step: 0.5, value: 3 },
    { key: 'a2', label: 'Angle of b (°)', min: 0, max: 360, step: 5, value: 110 },
  ],
  beats: [
    { say: 'Two pulls: a (blue) and b (yellow). Slide b so its tail sits on a’s tip. The green arrow from start to finish is the sum.', set: { F1: 4, a1: 20, F2: 3, a2: 110 } },
    { say: 'Point them the same way and the sizes simply add: 4 + 3 = 7 N.', set: { F1: 4, a1: 30, F2: 3, a2: 30 } },
    { say: 'Point them opposite and they fight: 4 − 3 = 1 N. Direction matters as much as size.', set: { F1: 4, a1: 30, F2: 3, a2: 210 } },
  ],
  readout: (t) => {
    const a = vec(t.F1, t.a1);
    const b = vec(t.F2, t.a2);
    const s = [a[0] + b[0], a[1] + b[1]];
    let between = Math.abs(t.a1 - t.a2) % 360;
    if (between > 180) between = 360 - between;
    return [
      ['a = (aₓ, a_y)', `(${r2(a[0])}, ${r2(a[1])})`],
      ['b = (bₓ, b_y)', `(${r2(b[0])}, ${r2(b[1])})`],
      ['a + b', `(${r2(s[0])}, ${r2(s[1])})`],
      ['|a + b|', `${r2(Math.hypot(...s))} N`],
      ['Angle between', `${between}°`],
      ['a · b', r2(a[0] * b[0] + a[1] * b[1])],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-12, 12, 1], y: [-6, 7, 1], sx: 0.6, sy: 0.6, origin: [0, -0.6], numbers: false });
    const o = P.toW(0, 0);
    const ghostB = kit.arrow(o, o, { color: C.yellow, width: 2, opacity: 0.25 });
    const A = kit.arrow(o, o, { color: C.blue, width: 4 });
    const B = kit.arrow(o, o, { color: C.yellow, width: 4 });
    const S = kit.arrow(o, o, { color: C.green, width: 5 });
    const cx = kit.line([o, o], { color: C.green, dashed: true, width: 1.5, opacity: 0.6, create: false });
    const cy = kit.line([o, o], { color: C.green, dashed: true, width: 1.5, opacity: 0.6, create: false });
    const la = kit.label('\\vec a', o, { size: 20, color: C.blue });
    const lb = kit.label('\\vec b', o, { size: 20, color: C.yellow });
    const ls = kit.label('\\vec a + \\vec b', o, { size: 20, color: C.green });
    return (p) => {
      const a = vec(p.F1, p.a1);
      const b = vec(p.F2, p.a2);
      const tip = P.toW(a[0], a[1]);
      const end = P.toW(a[0] + b[0], a[1] + b[1]);
      A.set(o, tip);
      ghostB.set(o, P.toW(b[0], b[1]));
      B.set(tip, end);
      S.set(o, end);
      cx.set([o, [end[0], o[1]]]);
      cy.set([[end[0], o[1]], end]);
      la.pos([(o[0] + tip[0]) / 2 - 0.3, (o[1] + tip[1]) / 2 + 0.3]);
      lb.pos([(tip[0] + end[0]) / 2 + 0.3, (tip[1] + end[1]) / 2 + 0.3]);
      ls.pos([end[0] + 0.5, end[1] + 0.35]);
    };
  },
};

// ---------------------------------------------------------------------------
// e: compounding more and more often, and the curve that is its own slope
// ---------------------------------------------------------------------------
export const compound_e = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Compound every hour (8,760 times a year) and see how close you get to e.',
  goal: (t) => t.n === '8760',
  params: [
    { key: 'n', label: 'Payments per year', type: 'choice', value: '1', options: [
      { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '4', label: '4' }, { value: '12', label: '12' },
      { value: '52', label: '52' }, { value: '365', label: '365' }, { value: '8760', label: '8,760' },
    ] },
    { key: 'x0', label: 'Point on eˣ', min: -2, max: 1.9, step: 0.1, value: 0 },
  ],
  beats: [
    { say: '₱1 at 100% interest, paid once at year end, becomes ₱2.', set: { n: '1', x0: 0 } },
    { say: 'Split into 12 monthly payments of 1/12 each, interest earns interest: ₱2.61. Each step multiplies by (1 + 1/12).', set: { n: '12', x0: 0.5 } },
    { say: 'Daily gives ₱2.7146, hourly ₱2.7181. It never passes e = 2.71828… On the right, eˣ has slope equal to its height everywhere.', set: { n: '365', x0: 1.5 } },
  ],
  readout: (t) => {
    const n = Number(t.n);
    const A = (1 + 1 / n) ** n;
    return [
      ['(1 + 1/n)ⁿ', A.toFixed(5)],
      ['Gap to e', (Math.E - A).toFixed(5)],
      ['eˣ at the point', Math.exp(t.x0).toFixed(3)],
      ['Slope there', Math.exp(t.x0).toFixed(3)],
    ];
  },
  setup(kit) {
    const L = kit.plane({ x: [0, 1, 0.25], y: [0, 3, 0.5], sx: 5.6, sy: 2.2, origin: [-7.4, -3.4], xLabel: '\\text{year}', yEvery: 1 });
    kit.line([L.toW(0, Math.E), L.toW(1, Math.E)], { color: C.red, dashed: true, width: 1.5 });
    kit.label('e', L.toW(1.06, Math.E), { size: 18, color: C.red });
    const stairs = kit.line([], { color: C.yellow, width: 3, create: false });
    const amt = kit.label('', L.toW(0.5, 3.35), { size: 18 });
    const R = kit.plane({ x: [-2, 2, 1], y: [0, 7, 1], sx: 1.35, sy: 0.95, origin: [4.4, -3.4], yEvery: 2 });
    kit.curve(Math.exp, [-2, 2], { plane: R, color: C.blue, width: 3, clipY: [0, 7] });
    const tan = kit.line([[0, 0], [0, 0]], { color: C.green, width: 2, create: false });
    const pt = kit.dot([0, 0], { r: 0.11, color: C.green });
    const h = kit.line([[0, 0], [0, 0]], { color: C.white, width: 1.5, dashed: true, opacity: 0.5, create: false });
    const lab = kit.label('', [4.4, 3.9], { size: 18 });
    let shown = 1;
    return (p, t, _time, dt) => {
      const n = Number(t.n);
      shown += (n - shown) * ease(dt, 3);
      const k = Math.max(1, Math.round(shown));
      const pts = [L.toW(0, 1)];
      let a = 1;
      const steps = Math.min(k, 400);
      for (let i = 1; i <= steps; i++) {
        pts.push(L.toW(i / steps, a));
        a *= (1 + 1 / k) ** (k / steps);
        pts.push(L.toW(i / steps, a));
      }
      stairs.set(pts);
      amt.set(`\\left(1 + \\tfrac{1}{${t.n}}\\right)^{${t.n}} = ${((1 + 1 / n) ** n).toFixed(4)}`);
      const x0 = p.x0;
      const y0 = Math.exp(x0);
      const x1 = x0 - 0.9;
      const x2 = x0 + 0.9;
      tan.set([R.toW(x1, y0 + y0 * (x1 - x0)), R.toW(x2, y0 + y0 * (x2 - x0))]);
      pt.set(R.toW(x0, y0));
      h.set([R.toW(x0, 0), R.toW(x0, y0)]);
      lab.set(`\\text{height } ${y0.toFixed(2)} = \\text{slope } ${y0.toFixed(2)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Limits: approaching a point from both sides
// ---------------------------------------------------------------------------
const LIMS = {
  hole: { tex: 'f(x) = \\frac{x^2 - 1}{x - 1}', a: 1, f: (x) => (Math.abs(x - 1) < 1e-12 ? NaN : (x * x - 1) / (x - 1)), L: 2, xr: [-1.5, 3.5], yr: [-1, 4.5] },
  sinc: { tex: 'f(x) = \\frac{\\sin x}{x}', a: 0, f: (x) => (x === 0 ? NaN : Math.sin(x) / x), L: 1, xr: [-2.5, 2.5], yr: [-0.5, 1.5] },
  step: { tex: 'f(x) = \\begin{cases} 1 & x > 0 \\\\ -1 & x < 0 \\end{cases}', a: 0, f: (x) => (x > 0 ? 1 : x < 0 ? -1 : NaN), L: null, xr: [-2.5, 2.5], yr: [-1.6, 1.6] },
};

export const limit_zoom = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'On the jump, approach x = 0 from the left and from the right. Do the two sides agree?',
  goal: (t, seen) => t.fn === 'step' && !!seen.side?.has('left') && !!seen.side?.has('right'),
  params: [
    { key: 'fn', label: 'Function', type: 'choice', value: 'hole', options: [
      { value: 'hole', label: '(x² − 1)/(x − 1)' }, { value: 'sinc', label: 'sin x / x' }, { value: 'step', label: 'a jump' },
    ] },
    { key: 'side', label: 'Approach from', type: 'choice', value: 'left', options: [{ value: 'left', label: 'left' }, { value: 'right', label: 'right' }] },
    { key: 'k', label: 'Closeness (gap = 10⁻ᵏ)', min: 0, max: 4, step: 1, value: 0 },
  ],
  beats: [
    { say: 'At x = 1 this fraction is 0/0: there is a hole. Start 1 away and step closer.', set: { fn: 'hole', side: 'left', k: 0 } },
    { say: 'At a gap of 0.001 the value is 1.999. From the right it would be 2.001. Both sides head to 2: the limit is 2, hole or no hole.', set: { fn: 'hole', side: 'left', k: 3 } },
    { say: 'sin x / x also has a hole at 0, yet it heads firmly to 1. This limit will give us the slope of sin x later.', set: { fn: 'sinc', side: 'right', k: 3 } },
  ],
  readout: (t) => {
    const F = LIMS[t.fn];
    const rows = [];
    for (let k = 0; k <= t.k; k++) {
      const x = F.a + (t.side === 'left' ? -1 : 1) * 10 ** -k;
      rows.push([`x = ${x.toFixed(Math.max(1, k))}`.replace('-', '−'), `f(x) = ${F.f(x).toFixed(Math.max(2, k + 1))}`.replace('-', '−')]);
    }
    rows.push(['Limit', F.L === null ? 'does not exist (sides disagree)' : `${F.L}`]);
    return rows;
  },
  setup(kit) {
    const ring = (P, x, y, parent) => {
      const c = P.toW(x, y);
      kit.dot(c, { r: 0.1, color: C.bg, z: 5, parent });
      kit.line(range(0, 2 * Math.PI, 30).map((a) => [c[0] + 0.11 * Math.cos(a), c[1] + 0.11 * Math.sin(a)]), { color: C.blue, width: 2, z: 6, create: false, parent });
    };
    // one plane per function, shown one at a time
    const views = Object.fromEntries(
      Object.entries(LIMS).map(([k, F]) => {
        const g = kit.group();
        const sx = 13 / (F.xr[1] - F.xr[0]);
        const sy = 6.6 / (F.yr[1] - F.yr[0]);
        const P = kit.plane({ x: [...F.xr, 0.5], y: [...F.yr, 0.5], sx, sy, origin: [-6.5 - F.xr[0] * sx, -3.4 - F.yr[0] * sy], xEvery: 1, yEvery: 1, parent: g });
        if (k === 'step') {
          kit.curve(F.f, [F.xr[0], -0.001], { plane: P, color: C.blue, width: 3, parent: g });
          kit.curve(F.f, [0.001, F.xr[1]], { plane: P, color: C.blue, width: 3, parent: g });
          ring(P, 0, 1, g);
          ring(P, 0, -1, g);
        } else {
          kit.curve(F.f, F.xr, { plane: P, color: C.blue, width: 3, samples: 401, parent: g });
          ring(P, F.a, F.L, g);
        }
        g.visible = false;
        return [k, { g, P }];
      })
    );
    const eq = kit.label('', [0, 4.0], { size: 20 });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow, z: 7 });
    const vguide = kit.line([[0, 0], [0, 0]], { color: C.yellow, dashed: true, width: 1.5, opacity: 0.6, create: false });
    const hguide = kit.line([[0, 0], [0, 0]], { color: C.yellow, dashed: true, width: 1.5, opacity: 0.6, create: false });
    const band = kit.rect(0, 0, 0, 0, { color: C.green, opacity: 0.1, stroke: false });
    let built = null;
    let P;
    let gx = 1;
    return (_p, t, _time, dt) => {
      const F = LIMS[t.fn];
      if (built !== t.fn) {
        Object.entries(views).forEach(([k, v]) => (v.g.visible = k === t.fn));
        P = views[t.fn].P;
        built = t.fn;
        eq.set(F.tex);
      }
      const target = 10 ** -t.k;
      gx += (target - gx) * ease(dt, 4);
      const x = F.a + (t.side === 'left' ? -1 : 1) * gx;
      const y = F.f(x);
      const W = P.toW(x, y);
      dot.set(W);
      vguide.set([P.toW(x, 0), W]);
      hguide.set([P.toW(F.a, y), W]);
      const eps = Math.abs(y - (F.L ?? y));
      const lo = P.toW(F.xr[0], (F.L ?? y) - Math.max(eps, 0.02));
      const hi = P.toW(F.xr[1], (F.L ?? y) + Math.max(eps, 0.02));
      band.set(lo[0], lo[1], hi[0] - lo[0], hi[1] - lo[1]);
      band.visible(F.L !== null);
    };
  },
};

// ---------------------------------------------------------------------------
// Derivative rules: slide a tangent and build f′ underneath
// ---------------------------------------------------------------------------
const FNS = {
  sq: { tex: 'f(x) = x^2', d: "f'(x) = 2x", f: (x) => x * x, df: (x) => 2 * x },
  cubic: { tex: 'f(x) = x^3 - 3x', d: "f'(x) = 3x^2 - 3", f: (x) => x ** 3 - 3 * x, df: (x) => 3 * x * x - 3 },
  sin: { tex: 'f(x) = \\sin x', d: "f'(x) = \\cos x", f: Math.sin, df: Math.cos },
  exp: { tex: 'f(x) = e^x', d: "f'(x) = e^x", f: Math.exp, df: Math.exp },
  chain: { tex: 'f(x) = \\sin(2x)', d: "f'(x) = 2\\cos(2x)", f: (x) => Math.sin(2 * x), df: (x) => 2 * Math.cos(2 * x) },
};

export const slope_tracer = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'For sin x, find a point where the slope is zero. What is f′ there?',
  goal: (t) => t.fn === 'sin' && Math.abs(Math.cos(t.x0)) < 0.06,
  params: [
    { key: 'fn', label: 'Function', type: 'choice', value: 'sq', options: [
      { value: 'sq', label: 'x²' }, { value: 'cubic', label: 'x³ − 3x' }, { value: 'sin', label: 'sin x' }, { value: 'exp', label: 'eˣ' }, { value: 'chain', label: 'sin(2x)' },
    ] },
    { key: 'x0', label: 'Tangent at x', min: -3, max: 3, step: 0.05, value: -2 },
  ],
  beats: [
    { say: 'Slide the tangent along x². Its slope is plotted underneath: −4 at x = −2, 0 at the bottom, +4 at x = 2. The slope curve is the straight line 2x.', set: { fn: 'sq', x0: 2 } },
    { say: 'For sin x the slope curve is a wave too, shifted a quarter turn: cos x.', set: { fn: 'sin', x0: 1.5 } },
    { say: 'sin(2x) wiggles twice as fast, so its slopes are twice as steep: 2cos(2x). That factor 2 is the chain rule.', set: { fn: 'chain', x0: 0 } },
  ],
  readout: (t) => {
    const F = FNS[t.fn];
    return [
      ['x', r2(t.x0)],
      ['f(x)', r2(F.f(t.x0))],
      ['Slope f′(x)', r2(F.df(t.x0))],
    ];
  },
  setup(kit) {
    const top = kit.plane({ x: [-3.3, 3.3, 1], y: [-3, 4, 1], sx: 1.15, sy: 0.52, origin: [0.6, 2.0], numbers: false });
    const bot = kit.plane({ x: [-3.3, 3.3, 1], y: [-3.5, 4, 1], sx: 1.15, sy: 0.42, origin: [0.6, -2.6], numbers: false });
    kit.label('f', [-3.8, 3.8], { size: 18, color: C.blue });
    kit.label("f'", [-3.8, -1.0], { size: 18, color: C.green });
    const cf = kit.curve(FNS.sq.f, [-3.3, 3.3], { plane: top, color: C.blue, width: 3, clipY: [-3, 4] });
    const ghost = kit.curve(FNS.sq.df, [-3.3, 3.3], { plane: bot, color: C.green, width: 2, opacity: 0.15, clipY: [-3.5, 4] });
    const trace = kit.line([], { color: C.green, width: 3, create: false });
    const tan = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 2.5, create: false });
    const pt = kit.dot([0, 0], { r: 0.11, color: C.yellow });
    const pd = kit.dot([0, 0], { r: 0.11, color: C.green });
    const link = kit.line([[0, 0], [0, 0]], { color: C.white, dashed: true, width: 1, opacity: 0.4, create: false });
    const lf = kit.label(FNS.sq.tex, [-5.8, 3.4], { size: 18, color: C.blue });
    const ld = kit.label(FNS.sq.d, [-5.8, -0.9], { size: 18, color: C.green });
    let built = 'sq';
    let from = -3.3;
    return (p, t) => {
      const F = FNS[t.fn];
      if (built !== t.fn) {
        cf.set(F.f);
        ghost.set(F.df);
        lf.set(F.tex);
        ld.set(F.d);
        built = t.fn;
        from = p.x0;
      }
      from = Math.min(from, p.x0);
      const x0 = p.x0;
      const y0 = F.f(x0);
      const m = F.df(x0);
      const dx = 0.9 / Math.sqrt(1 + (m * 0.45) ** 2);
      tan.set([top.toW(x0 - dx, y0 - m * dx), top.toW(x0 + dx, y0 + m * dx)]);
      pt.set(top.toW(x0, clamp(y0, -3, 4)));
      pd.set(bot.toW(x0, clamp(m, -3.5, 4)));
      link.set([top.toW(x0, clamp(y0, -3, 4)), bot.toW(x0, clamp(m, -3.5, 4))]);
      trace.set(range(from, x0, 120).filter((x) => F.df(x) > -3.5 && F.df(x) < 4).map((x) => bot.toW(x, F.df(x))));
    };
  },
};

// ---------------------------------------------------------------------------
// Optimisation: the biggest open box from a square sheet
// ---------------------------------------------------------------------------
const V = (x) => x * (20 - 2 * x) ** 2;

export const box_optimizer = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the corner cut that gives the biggest box.',
  goal: (t) => Math.abs(t.x - 10 / 3) < 0.12,
  params: [{ key: 'x', label: 'Corner cut x (cm)', min: 0.5, max: 9.5, step: 0.1, value: 1 }],
  beats: [
    { say: 'A 20 × 20 cm steel sheet. Cut an x-by-x square from each corner and fold up the sides. A tiny cut makes a flat tray.', set: { x: 1 } },
    { say: 'A deep cut makes a tall but narrow box. Somewhere between, the volume peaks.', set: { x: 7 } },
    { say: 'At x = 10/3 ≈ 3.33 cm the volume curve is flat: slope zero, the maximum, about 593 cm³.', set: { x: 3.3 } },
  ],
  readout: (t) => [
    ['Cut x', `${r1(t.x)} cm`],
    ['Base', `${r1(20 - 2 * t.x)} × ${r1(20 - 2 * t.x)} cm`],
    ['Volume V', `${Math.round(V(t.x))} cm³`],
    ['Slope dV/dx', r1((20 - 2 * t.x) * (20 - 6 * t.x))],
  ],
  setup(kit) {
    const s = 0.25; // world units per cm
    const ox = -7.4;
    const oy = -0.6;
    kit.rect(ox, oy, 20 * s, 20 * s, { color: C.grey, opacity: 0.25, strokeColor: C.axis, width: 1.5 });
    const cuts = [0, 1, 2, 3].map(() => kit.rect(0, 0, 0, 0, { color: C.red, opacity: 0.45, strokeColor: C.red, width: 1 }));
    const folds = [0, 1, 2, 3].map(() => kit.line([[0, 0], [0, 0]], { color: C.yellow, dashed: true, width: 1.5, create: false }));
    kit.label('\\text{sheet, top view}', [ox + 2.5, oy + 5.5], { size: 14, color: '#8b949e' });
    // folded box (oblique sketch)
    const front = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.35, strokeColor: C.blue, width: 2 });
    const side = kit.fill([], { color: C.blue, opacity: 0.2 });
    const topE = kit.line([], { color: C.blue, width: 2, create: false });
    const P = kit.plane({ x: [0, 10, 1], y: [0, 650, 100], sx: 0.62, sy: 0.0105, origin: [1.2, -3.6], xEvery: 2, yEvery: 200, xLabel: 'x', yLabel: 'V' });
    kit.curve(V, [0, 10], { plane: P, color: C.blue, width: 3 });
    const tan = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 2, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    return (p) => {
      const x = p.x;
      const c = x * s;
      const W = 20 * s;
      [[ox, oy], [ox + W - c, oy], [ox, oy + W - c], [ox + W - c, oy + W - c]].forEach(([a, b], i) => cuts[i].set(a, b, c, c));
      folds[0].set([[ox + c, oy + c], [ox + W - c, oy + c]]);
      folds[1].set([[ox + c, oy + W - c], [ox + W - c, oy + W - c]]);
      folds[2].set([[ox + c, oy + c], [ox + c, oy + W - c]]);
      folds[3].set([[ox + W - c, oy + c], [ox + W - c, oy + W - c]]);
      const b = (20 - 2 * x) * 0.16;
      const h = x * 0.16;
      const bx = -7.2;
      const by = -3.9;
      const d = b * 0.45;
      front.set(bx, by, b, h);
      side.set([[bx + b, by], [bx + b + d, by + d], [bx + b + d, by + d + h], [bx + b, by + h]]);
      topE.set([[bx, by + h], [bx + d, by + h + d], [bx + b + d, by + h + d], [bx + b, by + h]]);
      const m = (20 - 2 * x) * (20 - 6 * x);
      const y = V(x);
      tan.set([P.toW(x - 1.2, y - m * 1.2), P.toW(x + 1.2, y + m * 1.2)].map(([X, Y]) => [X, clamp(Y, -3.8, 3.4)]));
      dot.set(P.toW(x, y));
    };
  },
};
