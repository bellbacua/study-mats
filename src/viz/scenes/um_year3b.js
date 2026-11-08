import { C } from '../theme';
import { clamp, range } from '../kit';

const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const big = (v) => Math.round(v).toLocaleString('en-US').replace('-', '−');
const rad = (d) => (d * Math.PI) / 180;
const lerpC = (a, b, t) => {
  const ca = [(a >> 16) & 255, (a >> 8) & 255, a & 255];
  const cb = [(b >> 16) & 255, (b >> 8) & 255, b & 255];
  const m = ca.map((v, i) => Math.round(v + (cb[i] - v) * clamp(t, 0, 1)));
  return (m[0] << 16) | (m[1] << 8) | m[2];
};
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
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
// lower tail of the standard normal, P(Z < -b) for b >= 0
function tail(b) {
  if (b > 3) {
    const pdf = Math.exp(-b * b / 2) / Math.sqrt(2 * Math.PI);
    return (pdf / b) * (1 - 1 / b ** 2 + 3 / b ** 4 - 15 / b ** 6);
  }
  const x = b / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erfc = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x);
  return erfc / 2;
}
const oneIn = (p) => (p < 1e-9 ? 'less than 1 in a billion' : p > 0.2 ? `${Math.round(p * 100)}%` : `1 in ${big(1 / p)}`);

// ---------------------------------------------------------------------------
// Pourbaix diagram of iron (25 °C, dissolved iron 10⁻⁶)
// ---------------------------------------------------------------------------
const lowFe = (pH) => (pH < 9 ? -0.617 : -0.085 - 0.0591 * pH);
const topFe2 = (pH) => (pH < 1.76 ? 0.771 : Math.min(1.51 - 0.236 * pH, 1.083 - 0.1773 * pH));
function pbRegion(pH, E) {
  if (E < lowFe(pH)) return 'imm';
  if (pH < 9 && E < topFe2(pH)) return 'fe2';
  if (pH < 1.76) return 'fe3';
  return 'pass';
}
const PB = {
  imm: ['immunity: bare iron is stable', C.green],
  fe2: ['corrosion: iron dissolves as Fe²⁺', C.red],
  fe3: ['corrosion: iron dissolves as Fe³⁺', C.maroon],
  pass: ['passivation: an oxide film protects it', C.blue],
};

export const pourbaix_iron = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'A steel pier stands in seawater (pH about 8). Find a potential that makes it immune.',
  goal: (t) => t.pH >= 7.5 && t.pH <= 8.5 && pbRegion(t.pH, t.E) === 'imm',
  params: [
    { key: 'pH', label: 'pH (acid ← → alkaline)', min: 0, max: 14, step: 0.1, value: 7 },
    { key: 'E', label: 'Potential E (volts)', min: -1.2, max: 1.6, step: 0.01, value: -0.3 },
  ],
  beats: [
    { say: 'Steel in neutral water at −0.3 V sits in the red region: iron dissolves as Fe²⁺ ions, and rust follows.', set: { pH: 7, E: -0.3 } },
    { say: 'Push the potential below about −0.62 V (with zinc anodes or a small current) and the point drops into immunity: bare iron is the stable form.', set: { pH: 7, E: -0.8 } },
    { say: 'Inside concrete the pH is about 12.5. At ordinary potentials that is the blue passive region: an oxide film seals the steel. That is why reinforcing bars last.', set: { pH: 12.5, E: 0 } },
  ],
  readout: (t) => [
    ['pH', r1(t.pH)],
    ['Potential E', `${r2(t.E)} V`],
    ['Iron is…', PB[pbRegion(t.pH, t.E)][0]],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 14, 1], y: [-1.2, 1.6, 0.2], sx: 0.66, sy: 2.6, origin: [-7.3, -3.6 + 1.2 * 2.6], axisAt: [0, -1.2], xEvery: 2, yEvery: 0.4, xLabel: '\\text{pH}', yLabel: 'E\\;(\\text{V})', grid: false });
    const xs = range(0, 14, 141);
    const xs9 = range(0, 9, 91);
    kit.fill([P.toW(0, -1.2), ...xs.map((x) => P.toW(x, lowFe(x))), P.toW(14, -1.2)], { color: C.green, opacity: 0.3 });
    kit.fill([...xs9.map((x) => P.toW(x, lowFe(x))), ...xs9.slice().reverse().map((x) => P.toW(x, topFe2(x)))], { color: C.red, opacity: 0.3 });
    kit.fill([P.toW(0, 0.771), P.toW(1.76, 0.771), P.toW(1.76, 1.6), P.toW(0, 1.6)], { color: C.maroon, opacity: 0.35 });
    const xp = range(1.76, 9, 80);
    kit.fill([...xp.map((x) => P.toW(x, topFe2(x))), ...range(9, 14, 50).map((x) => P.toW(x, lowFe(x))), P.toW(14, 1.6), P.toW(1.76, 1.6)], { color: C.blue, opacity: 0.3 });
    kit.line(xs.map((x) => P.toW(x, lowFe(x))), { color: C.white, width: 2 });
    kit.line(xs9.map((x) => P.toW(x, topFe2(x))), { color: C.white, width: 2 });
    kit.line([P.toW(1.76, 0.771), P.toW(1.76, 1.6)], { color: C.white, width: 2 });
    kit.line([P.toW(0, 1.23), P.toW(14, 1.23 - 0.0591 * 14)], { color: C.teal, width: 1.5, dashed: true });
    kit.line([P.toW(0, 0), P.toW(14, -0.0591 * 14)], { color: C.teal, width: 1.5, dashed: true });
    kit.label('\\text{water stable between the dashed lines}', [P.toW(14, 0)[0], P.toW(0, 1.45)[1]], { size: 11, color: C.teal, align: 'right' });
    kit.label('\\text{immunity}', P.toW(5, -1.0), { size: 14, color: C.green });
    kit.label('\\text{corrosion}\\;\\text{Fe}^{2+}', P.toW(3.6, 0.15), { size: 14, color: C.red });
    kit.label('\\text{Fe}^{3+}', P.toW(0.9, 1.15), { size: 13, color: C.maroon });
    kit.label('\\text{passivation (oxide)}', P.toW(9.5, 0.55), { size: 14, color: C.blue });
    const dot = kit.dot([0, 0], { r: 0.15, color: C.yellow, z: 6 });
    const ring = kit.dot([0, 0], { r: 0.28, color: C.yellow, opacity: 0.35, z: 5 });
    // right: a piece of steel in that water
    const bx = 3.4;
    kit.rect(bx - 0.4, -2.4, 4.6, 4.8, { color: C.teal, opacity: 0.08, strokeColor: C.grid });
    kit.label('\\text{steel in the water}', [bx + 1.9, 2.8], { size: 12 });
    const steel = kit.rect(bx + 1.1, -1.8, 1.6, 3.4, { color: C.grey, opacity: 0.9, strokeColor: C.white });
    const film = kit.line([], { color: C.blue, width: 6, create: false });
    const ions = range(0, 13, 14).map(() => kit.dot([0, 0], { r: 0.07, color: C.red }));
    const state = kit.label('', [bx + 1.9, -3.0], { size: 12, tex: false });
    return (p, t, time) => {
      dot.set(P.toW(p.pH, p.E));
      ring.set(P.toW(p.pH, p.E)).scale(1 + 0.2 * Math.sin(time * 4));
      const reg = pbRegion(p.pH, p.E);
      state.set(PB[reg][0]).color(PB[reg][1]);
      steel.color(reg === 'imm' ? 0xb8c2cc : reg === 'pass' ? 0x8e9aa6 : 0x8a5a44);
      const L = bx + 1.1;
      const R = bx + 2.7;
      film.visible(reg === 'pass').set([[L - 0.06, -1.86], [L - 0.06, 1.66], [R + 0.06, 1.66], [R + 0.06, -1.86]]);
      ions.forEach((d, i) => {
        const side = i % 2 ? 1 : -1;
        const ph = (time * 0.35 + i / 14) % 1;
        const x = side > 0 ? R + 0.1 + ph * 1.2 : L - 0.1 - ph * 1.2;
        d.visible(reg === 'fe2' || reg === 'fe3').set([x, -1.6 + ((i * 0.53) % 3.2)]).opacity(1 - ph);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Gyroscope: a spinning disc on an overhanging axle precesses
// ---------------------------------------------------------------------------
const GR = 0.15; // wheel radius, m
const gyroOmega = (rpm, r) => (2 * 9.8 * r) / (GR * GR * ((rpm * 2 * Math.PI) / 60));
const gyro = { phi: 0, spin: 0 };

export const gyroscope = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Spin the wheel fast enough that one slow circle of precession takes more than 10 seconds.',
  goal: (t) => (2 * Math.PI) / gyroOmega(t.rpm, t.r) > 10,
  params: [
    { key: 'rpm', label: 'Spin speed (rpm)', min: 300, max: 4000, step: 10, value: 1000 },
    { key: 'r', label: 'Axle overhang r (m)', min: 0.08, max: 0.3, step: 0.01, value: 0.2 },
  ],
  beats: [
    { say: 'The wheel spins at 1,000 rpm on an axle held only at one end. Gravity pulls it down, yet it swings around the post once every 3.8 s.', set: { rpm: 1000, r: 0.2 } },
    { say: 'Triple the spin to 3,000 rpm. The angular momentum is three times larger, so the same torque turns it three times more slowly: once every 11 s.', set: { rpm: 3000, r: 0.2 } },
    { say: 'Shorten the overhang to 0.1 m: half the torque, half the precession speed. The disc’s mass cancels out: heavier wheels feel more torque but carry more spin.', set: { rpm: 1000, r: 0.1 } },
  ],
  readout: (t) => {
    const w = (t.rpm * 2 * Math.PI) / 60;
    const Om = gyroOmega(t.rpm, t.r);
    return [
      ['Spin ω', `${r1(w)} rad/s`],
      ['Torque ÷ angular momentum = Ω', `${r2(Om)} rad/s`],
      ['One circle of precession', `${r1((2 * Math.PI) / Om)} s`],
    ];
  },
  setup(kit) {
    const piv = [-2.6, 0.6];
    const S = 9; // world units per metre
    const proj = (q) => [piv[0] + q[0] * S, piv[1] + q[1] * S + q[2] * S * 0.35];
    kit.line([[-2.6, -3.6], [-2.6, 0.55]], { color: C.axis, width: 5 });
    kit.fill([[-3.6, -3.6], [-1.6, -3.6], [-2.1, -3.2], [-3.1, -3.2]], { color: C.grey, opacity: 0.6 });
    const trailPts = range(0, 2 * Math.PI, 90);
    const orbit = kit.line([], { color: C.grid, width: 1.5, dashed: true, create: false });
    const axle = kit.line([], { color: C.white, width: 4, create: false });
    const rim = kit.line([], { color: C.gold, width: 4, create: false });
    const spokes = [0, 1, 2].map(() => kit.line([], { color: C.gold, width: 2, opacity: 0.8, create: false }));
    const Larr = kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3 });
    const Tarr = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3 });
    const Warr = kit.arrow([0, 0], [0, 0], { color: C.green, width: 3 });
    const lL = kit.label('L = I\\omega', [0, 0], { size: 13, color: C.blue });
    const lT = kit.label('\\tau', [0, 0], { size: 14, color: C.red });
    const lW = kit.label('mg', [0, 0], { size: 13, color: C.green });
    kit.label('\\text{torque turns } L \\text{ sideways, so the axle swings round}', [0, 4.0], { size: 12 });
    const per = kit.label('', [5.4, -3.6], { size: 13, color: C.yellow, tex: false });
    return (p, t, time, dt) => {
      const Om = gyroOmega(p.rpm, p.r);
      const h = Math.min(dt || 0.016, 0.05);
      gyro.phi += Om * h;
      gyro.spin += Math.min(40, (p.rpm * 2 * Math.PI) / 60 / 8) * h;
      const c = Math.cos(gyro.phi);
      const s = Math.sin(gyro.phi);
      const d = [c, 0, s];
      const w = [-s, 0, c];
      const ctr = [d[0] * p.r, 0, d[2] * p.r];
      orbit.set(trailPts.map((a) => proj([Math.cos(a) * p.r, 0, Math.sin(a) * p.r])));
      axle.set([proj([0, 0, 0]), proj([d[0] * (p.r + 0.04), 0, d[2] * (p.r + 0.04)])]);
      const circ = (a) => [ctr[0] + GR * Math.sin(a) * w[0], GR * Math.cos(a), ctr[2] + GR * Math.sin(a) * w[2]];
      rim.set(range(0, 2 * Math.PI, 60).map((a) => proj(circ(a))));
      spokes.forEach((sp, i) => {
        const a = gyro.spin + (i * 2 * Math.PI) / 3;
        sp.set([proj(ctr), proj(circ(a))]);
      });
      const tip = [ctr[0] + d[0] * 0.17, 0, ctr[2] + d[2] * 0.17];
      Larr.set(proj(ctr), proj(tip));
      lL.pos(proj([tip[0] + d[0] * 0.03, 0.03, tip[2] + d[2] * 0.03]));
      const tq = [ctr[0] + w[0] * 0.14, 0, ctr[2] + w[2] * 0.14];
      Tarr.set(proj(ctr), proj(tq));
      lT.pos(proj([tq[0] + w[0] * 0.02, 0.03, tq[2] + w[2] * 0.02]));
      Warr.set(proj([ctr[0], -0.02, ctr[2]]), proj([ctr[0], -0.16, ctr[2]]));
      lW.pos(proj([ctr[0] + 0.03, -0.12, ctr[2]]));
      per.set(`one circle every ${r1((2 * Math.PI) / Om)} s`);
      void t;
      void time;
    };
  },
};

// ---------------------------------------------------------------------------
// Kirchhoff: two batteries and three resistors
// ---------------------------------------------------------------------------
const KV1 = 12;
const KR1 = 4;
const KR2 = 6;
function kirch(V2, R3) {
  const Va = (KV1 / KR1 + V2 / R3) / (1 / KR1 + 1 / KR2 + 1 / R3);
  return { Va, I1: (KV1 - Va) / KR1, I2: Va / KR2, I3: (V2 - Va) / R3 };
}
const kflow = { s: [0, 0, 0] };

export const kirchhoff_circuit = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Set the right battery and resistor so that no current flows through the right battery at all.',
  goal: (t) => Math.abs(kirch(t.V2, t.R3).I3) < 0.02,
  params: [
    { key: 'V2', label: 'Right battery V₂ (volts)', min: 0, max: 18, step: 0.1, value: 6 },
    { key: 'R3', label: 'Right resistor R₃ (ohms)', min: 1, max: 10, step: 0.5, value: 2 },
  ],
  beats: [
    { say: 'With V₂ = 6 V, the junction sits at 6.5 V. That is above the right battery’s 6 V, so current is pushed backwards into it: it is being charged.', set: { V2: 6, R3: 2 } },
    { say: 'Raise V₂ to 12 V. Now both batteries push current into the junction, and together they drive 1.6 A down through the middle resistor.', set: { V2: 12, R3: 2 } },
    { say: 'Whatever the settings, the current law holds at the junction: I₁ + I₃ = I₂. Nothing piles up.', set: { V2: 9, R3: 6 } },
  ],
  readout: (t) => {
    const k = kirch(t.V2, t.R3);
    return [
      ['Junction voltage V_a', `${r2(k.Va)} V`],
      ['I₁ (left)', `${r2(k.I1)} A`],
      ['I₃ (right)', `${r2(k.I3)} A`],
      ['I₂ (middle) = I₁ + I₃', `${r2(k.I2)} A`],
    ];
  },
  setup(kit) {
    const X = [-5.5, -1.5, 2.5];
    const T = 2.4;
    const B = -2.6;
    const wire = (pts) => kit.line(pts, { color: C.axis, width: 2.5 });
    wire([[X[0], T], [X[2], T]]);
    wire([[X[0], B], [X[2], B]]);
    const zig = (x, y0, y1) => {
      const pts = [[x, y0]];
      for (let i = 1; i < 8; i++) pts.push([x + (i % 2 ? 0.3 : -0.3), y0 + ((y1 - y0) * i) / 8]);
      pts.push([x, y1]);
      return pts;
    };
    const battery = (x, y) => {
      kit.line([[x - 0.55, y + 0.12], [x + 0.55, y + 0.12]], { color: C.white, width: 4 });
      kit.line([[x - 0.3, y - 0.12], [x + 0.3, y - 0.12]], { color: C.white, width: 4 });
      kit.label('+', [x + 0.75, y + 0.3], { size: 13, color: C.white, tex: false });
    };
    // left branch: battery below, resistor above
    wire([[X[0], B], [X[0], -1.0]]);
    battery(X[0], -0.88);
    wire([[X[0], -0.76], [X[0], 0.3]]);
    kit.line(zig(X[0], 0.3, 1.7), { color: C.gold, width: 2.5 });
    wire([[X[0], 1.7], [X[0], T]]);
    // middle: resistor
    wire([[X[1], T], [X[1], 0.7]]);
    kit.line(zig(X[1], 0.7, -0.9), { color: C.gold, width: 2.5 });
    wire([[X[1], -0.9], [X[1], B]]);
    // right branch
    wire([[X[2], B], [X[2], -1.0]]);
    battery(X[2], -0.88);
    wire([[X[2], -0.76], [X[2], 0.3]]);
    kit.line(zig(X[2], 0.3, 1.7), { color: C.gold, width: 2.5 });
    wire([[X[2], 1.7], [X[2], T]]);
    kit.label('V_1 = 12\\,\\text{V}', [X[0] - 1.3, -0.9], { size: 13 });
    kit.label('R_1 = 4\\,\\Omega', [X[0] - 1.25, 1.0], { size: 13, color: C.gold });
    kit.label('R_2 = 6\\,\\Omega', [X[1] + 1.25, -0.1], { size: 13, color: C.gold });
    const lV2 = kit.label('', [X[2] + 1.45, -0.9], { size: 13 });
    const lR3 = kit.label('', [X[2] + 1.3, 1.0], { size: 13, color: C.gold });
    kit.dot([X[1], T], { r: 0.14, color: C.yellow, z: 6 });
    const lVa = kit.label('', [X[1], T + 0.45], { size: 13, color: C.yellow });
    kit.label('\\text{ground, }0\\,\\text{V}', [X[1], B - 0.4], { size: 11, color: C.grey });
    // current dots on each branch
    const loops = [
      [[X[0], B], [X[0], T], [X[1], T]], // I1 path into the junction
      [[X[1], T], [X[1], B]], // I2 down the middle
      [[X[2], B], [X[2], T], [X[1], T]], // I3 into the junction
    ];
    const ret = [
      [[X[1], B], [X[0], B]],
      null,
      [[X[1], B], [X[2], B]],
    ];
    const pathLen = (pts) => pts.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
    const at = (pts, d) => {
      for (let i = 1; i < pts.length; i++) {
        const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        if (d <= L) return [pts[i - 1][0] + ((pts[i][0] - pts[i - 1][0]) * d) / L, pts[i - 1][1] + ((pts[i][1] - pts[i - 1][1]) * d) / L];
        d -= L;
      }
      return pts[pts.length - 1];
    };
    const cols = [C.blue, C.green, C.pink];
    const sp = 0.55;
    const dots = loops.map((pts, k) => {
      const full = ret[k] ? [...ret[k], ...pts.slice(0)] : pts;
      const n = Math.floor(pathLen(full) / sp);
      return { full, n, ds: range(0, n - 1, n).map(() => kit.dot([0, 0], { r: 0.08, color: cols[k], z: 5 })) };
    });
    const arrows = [0, 1, 2].map((k) => kit.label('', [0, 0], { size: 13, color: cols[k] }));
    return (p, t, time, dt) => {
      const k = kirch(p.V2, p.R3);
      const I = [k.I1, k.I2, k.I3];
      const h = Math.min(dt || 0.016, 0.05);
      dots.forEach((g, j) => {
        kflow.s[j] += I[j] * h * 1.4;
        const L = pathLen(g.full);
        g.ds.forEach((d, i) => {
          const pos = ((((i * sp + kflow.s[j]) % L) + L) % L);
          d.set(at(g.full, pos)).visible(Math.abs(I[j]) > 0.005);
        });
      });
      lV2.set(`V_2 = ${r1(p.V2)}\\,\\text{V}`);
      lR3.set(`R_3 = ${r1(p.R3)}\\,\\Omega`);
      lVa.set(`V_a = ${r2(k.Va)}\\,\\text{V}`);
      arrows[0].set(`I_1 = ${r2(k.I1)}\\,\\text{A}`).pos([X[0] + 2.0, T + 0.45]);
      arrows[1].set(`I_2 = ${r2(k.I2)}\\,\\text{A}`).pos([X[1] + 1.35, -1.6]);
      arrows[2].set(`I_3 = ${r2(k.I3)}\\,\\text{A}`).pos([X[2] - 2.0, T + 0.45]);
      void time;
    };
  },
};

// ---------------------------------------------------------------------------
// Confidence intervals from twenty repeated experiments
// ---------------------------------------------------------------------------
const CI_TRUE = 500;
const CI_SD = 30;
const CI_DATA = range(0, 19, 20).map((i) => normals(100, 25934 + i * 97).map((z) => CI_TRUE + CI_SD * z));
const ZC = { 90: 1.645, 95: 1.96, 99: 2.576 };
const tCrit = (z, df) => z + (z ** 3 + z) / (4 * df) + (5 * z ** 5 + 16 * z ** 3 + 3 * z) / (96 * df * df);
function intervals(n, conf) {
  return CI_DATA.map((d) => {
    const x = d.slice(0, n);
    const m = x.reduce((a, b) => a + b, 0) / n;
    const s = Math.sqrt(x.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1));
    const e = (tCrit(ZC[conf], n - 1) * s) / Math.sqrt(n);
    return { m, e, hit: Math.abs(m - CI_TRUE) <= e };
  });
}

export const confidence_intervals = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'At 95% confidence, test enough samples that the average margin of error is under ±10 MPa.',
  goal: (t) => t.conf === '95' && intervals(t.n, 95).reduce((a, b) => a + b.e, 0) / 20 < 10,
  params: [
    { key: 'n', label: 'Samples per experiment n', min: 3, max: 100, step: 1, value: 5 },
    { key: 'conf', label: 'Confidence level', type: 'choice', value: '95', options: [{ value: '90', label: '90%' }, { value: '95', label: '95%' }, { value: '99', label: '99%' }] },
  ],
  beats: [
    { say: 'Twenty labs each test 5 specimens of the same alloy, whose true strength is 500 MPa. Their 95% intervals are wide, about ±40 MPa, and one of them misses the truth.', set: { n: 5, conf: '95' } },
    { say: 'With 30 specimens each, the intervals shrink to about ±11 MPa. Still, one in twenty misses the true value: that is what 95% means.', set: { n: 30, conf: '95' } },
    { say: 'Ask for 99% confidence and the intervals widen again. More certainty costs precision, unless you test more samples.', set: { n: 30, conf: '99' } },
  ],
  readout: (t) => {
    const iv = intervals(t.n, Number(t.conf));
    return [
      ['Average margin of error', `± ${r1(iv.reduce((a, b) => a + b.e, 0) / 20)} MPa`],
      ['Intervals that miss 500 MPa', `${iv.filter((v) => !v.hit).length} of 20`],
      ['Specimens tested in all', big(20 * t.n)],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [440, 560, 10], y: [0, 21, 1], sx: 12 / 120, sy: 0.36, origin: [-6 - 440 * 0.1, -3.5], axisAt: [440, 0], xEvery: 20, yAxis: false, numbers: true, grid: false, xLabel: '\\text{strength (MPa)}' });
    kit.line([P.toW(500, 0), P.toW(500, 20.8)], { color: C.yellow, width: 2, dashed: true });
    kit.label('\\text{true value}', [P.toW(500, 0)[0], 4.15], { size: 12, color: C.yellow });
    const segs = range(0, 19, 20).map(() => kit.line([], { color: C.blue, width: 3, create: false }));
    const mids = range(0, 19, 20).map(() => kit.dot([0, 0], { r: 0.07, color: C.white }));
    const miss = kit.label('', [6.1, 3.6], { size: 14, color: C.red, tex: false, align: 'right' });
    return (p, t) => {
      const iv = intervals(t.n, Number(t.conf));
      iv.forEach((v, i) => {
        const y = i + 1;
        segs[i].set([P.toW(clamp(v.m - v.e, 440, 560), y), P.toW(clamp(v.m + v.e, 440, 560), y)]).color(v.hit ? C.blue : C.red);
        mids[i].set(P.toW(clamp(v.m, 440, 560), y));
      });
      miss.set(`${iv.filter((v) => !v.hit).length} of 20 miss`);
      void p;
    };
  },
};

// ---------------------------------------------------------------------------
// Fatigue: the S–N curve
// ---------------------------------------------------------------------------
const FAT = {
  steel: { name: 'steel (UTS 700 MPa)', sf: 1200, b: -0.085, se: 350, col: C.blue },
  al: { name: 'aluminium alloy', sf: 900, b: -0.11, se: 0, col: C.gold },
};
const cyclesTo = (s, k) => {
  const m = FAT[k];
  if (s <= m.se) return Infinity;
  return 0.5 * (s / m.sf) ** (1 / m.b);
};
const sAt = (logN, k) => {
  const m = FAT[k];
  return Math.max(m.se, m.sf * (2 * 10 ** logN) ** m.b);
};
const sciN = (N) => {
  if (!Number.isFinite(N)) return 'never (below the endurance limit)';
  if (N < 1e4) return `${big(N)} cycles`;
  const e = Math.floor(Math.log10(N));
  return `${r1(N / 10 ** e)} × 10^${e} cycles`.replace('^', '').replace(/10(\d+)/, (m, d) => `10${d.split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')}`);
};

export const sn_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the highest stress amplitude this steel can survive forever.',
  goal: (t) => t.mat === 'steel' && t.s <= 350 && t.s >= 340,
  params: [
    { key: 's', label: 'Stress amplitude σₐ (MPa)', min: 60, max: 800, step: 5, value: 500 },
    { key: 'mat', label: 'Material', type: 'choice', value: 'steel', options: Object.entries(FAT).map(([k, m]) => ({ value: k, label: m.name })) },
  ],
  beats: [
    { say: 'Steel bent back and forth at ±500 MPa breaks after about 15,000 cycles, though it could carry 500 MPa once without trouble.', set: { s: 500, mat: 'steel' } },
    { say: 'Drop to 300 MPa and the steel is below its endurance limit, 350 MPa. The curve goes flat: it survives forever.', set: { s: 300, mat: 'steel' } },
    { say: 'Aluminium has no floor. Even at 150 MPa it fails eventually, after about 6 million cycles. Aircraft designers must count cycles.', set: { s: 150, mat: 'al' } },
  ],
  readout: (t) => [
    ['Stress amplitude', `${t.s} MPa`],
    ['Cycles to failure', sciN(cyclesTo(t.s, t.mat))],
    ['Endurance limit', FAT[t.mat].se ? `${FAT[t.mat].se} MPa` : 'none'],
  ],
  setup(kit) {
    // left: the stress going up and down
    const W = kit.plane({ x: [0, 4, 1], y: [-800, 800, 200], sx: 1.25, sy: 2.8 / 800, origin: [-7.4, 0.7], axisAt: [0, 0], numbers: false, grid: false, yLabel: '\\sigma' });
    kit.label('\\text{stress over time}', [-4.9, 4.0], { size: 12 });
    const wave = kit.line([], { color: C.pink, width: 2.5, create: false });
    const eu = kit.line([], { color: C.green, width: 1.5, dashed: true, create: false });
    const el = kit.line([], { color: C.green, width: 1.5, dashed: true, create: false });
    const lim = kit.label('\\pm\\,\\text{endurance limit}', [-4.9, -3.2], { size: 11, color: C.green });
    // right: S–N
    const P = kit.plane({ x: [2, 9, 1], y: [0, 900, 100], sx: 6.0 / 7, sy: 7.0 / 900, origin: [1.3 - 2 * (6 / 7), -3.5], axisAt: [2, 0], xEvery: 1, yEvery: 200, fmt: (v, ax) => (ax === 'x' ? `10${'⁰¹²³⁴⁵⁶⁷⁸⁹'[v]}` : `${v}`), xLabel: '\\text{cycles}', yLabel: '\\sigma_a\\;(\\text{MPa})' });
    const curves = Object.keys(FAT).map((k) => kit.line(range(2, 9, 200).map((x) => P.toW(x, sAt(x, k))), { color: FAT[k].col, width: 2.5, opacity: 0.35 }));
    const tags = [kit.label('\\text{steel}', [7.4, P.toW(0, 350)[1] + 0.3], { size: 12, color: C.blue, align: 'right' }), kit.label('\\text{aluminium}', [7.4, P.toW(0, 70)[1] + 0.3], { size: 12, color: C.gold, align: 'right' })];
    void tags;
    const hl = kit.line([], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const vl = kit.line([], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    const inf = kit.label('\\infty', [8.0, 0], { size: 18, color: C.yellow });
    let last = '';
    return (p, t, time) => {
      if (t.mat !== last) {
        last = t.mat;
        Object.keys(FAT).forEach((k, i) => curves[i].opacity(k === t.mat ? 1 : 0.3));
        const se = FAT[t.mat].se;
        eu.visible(se > 0).set([W.toW(0, se), W.toW(4, se)]);
        el.visible(se > 0).set([W.toW(0, -se), W.toW(4, -se)]);
        lim.visible(se > 0);
      }
      wave.set(range(0, 4, 200).map((x) => W.toW(x, p.s * Math.sin(2 * Math.PI * (x * 1.5 - time * 0.8)))));
      const N = cyclesTo(p.s, t.mat);
      const lg = Number.isFinite(N) ? clamp(Math.log10(N), 2, 9) : 9;
      dot.set(P.toW(lg, Math.min(p.s, 900)));
      hl.set([P.toW(2, Math.min(p.s, 900)), P.toW(lg, Math.min(p.s, 900))]);
      vl.set([P.toW(lg, 0), P.toW(lg, Math.min(p.s, 900))]);
      inf.visible(!Number.isFinite(N)).pos([P.toW(9, 0)[0] + 0.25, P.toW(0, p.s)[1]]);
    };
  },
};

// ---------------------------------------------------------------------------
// Transformer: turns ratio sets the voltage ratio
// ---------------------------------------------------------------------------
const VP = 230;
const LOADW = 100;

export const transformer = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Choose the turns so that 230 V comes out as 12 V for a lamp.',
  goal: (t) => Math.abs((VP * t.N2) / t.N1 - 12) < 0.5,
  params: [
    { key: 'N1', label: 'Primary turns N₁', min: 100, max: 1000, step: 10, value: 500 },
    { key: 'N2', label: 'Secondary turns N₂', min: 10, max: 2000, step: 10, value: 1000 },
  ],
  beats: [
    { say: 'Twice as many turns on the secondary: 230 V in, 460 V out. Each turn picks up the same voltage from the changing flux in the core.', set: { N1: 500, N2: 1000 } },
    { say: 'Now 1,000 turns in and 50 out: 230 V becomes 11.5 V. A step-down transformer, as in an old phone charger.', set: { N1: 1000, N2: 50 } },
    { say: 'Power in equals power out (nearly). The 100 W lamp draws 8.7 A at 11.5 V, but the primary carries only 0.43 A at 230 V.', set: { N1: 1000, N2: 50 } },
  ],
  readout: (t) => {
    const V2 = (VP * t.N2) / t.N1;
    return [
      ['Turns ratio N₂ / N₁', r2(t.N2 / t.N1)],
      ['Secondary voltage V₂', `${r1(V2)} V`],
      ['Primary current (100 W load)', `${r2(LOADW / VP)} A`],
      ['Secondary current', `${r2(LOADW / V2)} A`],
    ];
  },
  setup(kit) {
    // core
    const cx = -4.2;
    kit.rect(cx - 2.6, -2.6, 5.2, 5.2, { color: C.grey, opacity: 0.45, strokeColor: C.axis });
    kit.rect(cx - 1.5, -1.5, 3.0, 3.0, { color: C.bg, opacity: 1, strokeColor: C.axis });
    kit.label('\\text{laminated silicon-steel core}', [cx, 3.0], { size: 12, color: C.grey });
    const coil1 = kit.line([], { color: C.gold, width: 2.5, create: false });
    const coil2 = kit.line([], { color: C.green, width: 2.5, create: false });
    const n1L = kit.label('', [cx - 3.3, 0], { size: 13, color: C.gold });
    const n2L = kit.label('', [cx + 3.3, 0], { size: 13, color: C.green });
    const flux = range(0, 7, 8).map(() => kit.dot([0, 0], { r: 0.09, color: C.blue }));
    const loop = [[cx - 2.05, -2.05], [cx - 2.05, 2.05], [cx + 2.05, 2.05], [cx + 2.05, -2.05], [cx - 2.05, -2.05]];
    const along = (u) => {
      const k = Math.floor(u * 4) % 4;
      const f = u * 4 - Math.floor(u * 4);
      return [loop[k][0] + (loop[k + 1][0] - loop[k][0]) * f, loop[k][1] + (loop[k + 1][1] - loop[k][1]) * f];
    };
    kit.label('\\Phi', [cx, 2.4], { size: 14, color: C.blue });
    // waves
    const P = kit.plane({ x: [0, 2, 0.5], y: [-1400, 1400, 400], sx: 5.4 / 2, sy: 3.4 / 1400, origin: [1.8, 0.3], axisAt: [0, 0], numbers: false, xLabel: 't', yLabel: '\\text{volts}' });
    kit.label('\\pm 1{,}400\\,\\text{V}', [1.6, 3.9], { size: 11, color: C.grey, align: 'right' });
    const w1 = kit.line([], { color: C.gold, width: 2.5, create: false });
    const w2 = kit.line([], { color: C.green, width: 2.5, create: false });
    kit.label('\\text{in (primary)}', [7.4, 3.6], { size: 12, color: C.gold, align: 'right' });
    kit.label('\\text{out (secondary)}', [7.4, 3.15], { size: 12, color: C.green, align: 'right' });
    const vLab = kit.label('', [4.5, -3.6], { size: 15, color: C.white });
    const coil = (x, n, y0, y1) => {
      const turns = Math.max(2, Math.round(n));
      return range(0, 1, turns * 16 + 1).map((u) => [x + 0.45 * Math.cos(u * turns * 2 * Math.PI), y0 + (y1 - y0) * u + 0.08 * Math.sin(u * turns * 2 * Math.PI)]);
    };
    return (p, t, time) => {
      const n1 = clamp(p.N1 / 50, 2, 20);
      const n2 = clamp(p.N2 / 50, 1, 40);
      coil1.set(coil(cx - 2.05, n1, -1.8, 1.8));
      coil2.set(coil(cx + 2.05, n2, -1.8, 1.8));
      n1L.set(`N_1 = ${p.N1.toFixed(0)}`);
      n2L.set(`N_2 = ${p.N2.toFixed(0)}`);
      const ph = time * 1.2;
      const dir = Math.cos(2 * Math.PI * ph);
      flux.forEach((d, i) => {
        const u = (((i / 8 + 0.25 * Math.sin(2 * Math.PI * ph)) % 1) + 1) % 1;
        d.set(along(u)).opacity(0.4 + 0.6 * Math.abs(dir));
      });
      const V2 = (VP * p.N2) / p.N1;
      const pk1 = VP * Math.SQRT2;
      const pk2 = Math.min(V2 * Math.SQRT2, 1400);
      w1.set(range(0, 2, 160).map((x) => P.toW(x, pk1 * Math.sin(2 * Math.PI * (x - ph)))));
      w2.set(range(0, 2, 160).map((x) => P.toW(x, pk2 * Math.sin(2 * Math.PI * (x - ph)))));
      vLab.set(`230\\,\\text{V} \\times \\dfrac{${p.N2.toFixed(0)}}{${p.N1.toFixed(0)}} = ${r1(V2)}\\,\\text{V}`);
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// Steel: carbon content, microstructure and properties
// ---------------------------------------------------------------------------
const pearliteF = (c) => (c <= 0.022 ? 0 : c < 0.76 ? (c - 0.022) / (0.76 - 0.022) : 1);
const cementF = (c) => (c > 0.76 ? (c - 0.76) / (6.7 - 0.76) : 0);
const uts = (c) => (c < 0.8 ? 290 + 830 * c : 954 + 60 * (c - 0.8));
const elong = (c) => Math.max(2, 40 - 42 * c);
const GRAINS = (() => {
  const u = rng(909);
  const g = [];
  for (let i = 0; i < 8; i++) for (let j = 0; j < 7; j++) g.push({ i, j, r: u(), dx: (u() - 0.5) * 0.18, dy: (u() - 0.5) * 0.18, ang: u() * Math.PI });
  return g.sort((a, b) => a.r - b.r);
})();

export const steel_carbon = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the eutectoid steel: the carbon content that is 100% pearlite with no extra ferrite or cementite.',
  goal: (t) => Math.abs(t.c - 0.76) < 0.02,
  params: [{ key: 'c', label: 'Carbon content (% by weight)', min: 0, max: 1.4, step: 0.01, value: 0.2 }],
  beats: [
    { say: 'A 1020 steel (0.20% C) is mostly soft white ferrite with a few dark pearlite grains: easy to bend and weld. Think car body panels and beams.', set: { c: 0.2 } },
    { say: '1045 (0.45% C) is about 58% pearlite: much stronger, less ductile. Shafts, gears and axles.', set: { c: 0.45 } },
    { say: 'Above 0.76% C, brittle cementite (bright lines) coats the pearlite grain boundaries. Strength barely rises, but ductility keeps falling.', set: { c: 1.2 } },
  ],
  readout: (t) => [
    ['Pearlite', `${Math.round(pearliteF(t.c) * 100)}%`],
    ['Ferrite', `${Math.round((1 - pearliteF(t.c)) * 100)}%`],
    ['Cementite on grain boundaries', `${r1(cementF(t.c) * 100)}%`],
    ['Tensile strength (approx.)', `${Math.round(uts(t.c))} MPa`],
    ['Elongation (approx.)', `${Math.round(elong(t.c))}%`],
  ],
  setup(kit) {
    const ox = -7.4;
    const oy = -3.3;
    const gw = 0.72;
    const cells = GRAINS.map((g) => {
      const x = ox + g.i * gw + g.dx;
      const y = oy + g.j * gw * 1.05 + g.dy;
      const f = kit.rect(x, y, gw - 0.05, gw - 0.05, { color: 0xe6e1d3, opacity: 0.9, strokeColor: 0x6b6b6b, width: 1 });
      const stripes = [0, 1, 2, 3].map((k) => {
        const cxs = x + (gw - 0.05) / 2;
        const cys = y + (gw - 0.05) / 2;
        const off = (k - 1.5) * 0.14;
        const dx = Math.cos(g.ang) * 0.26;
        const dy = Math.sin(g.ang) * 0.26;
        const nx = -Math.sin(g.ang) * off;
        const ny = Math.cos(g.ang) * off;
        return kit.line([[cxs - dx + nx, cys - dy + ny], [cxs + dx + nx, cys + dy + ny]], { color: 0x2b2b2b, width: 2 });
      });
      const bound = kit.rect(x - 0.02, y - 0.02, gw - 0.01, gw - 0.01, { fill: false, strokeColor: C.white, width: 3 });
      return { f, stripes, bound };
    });
    kit.label('\\text{microstructure, slowly cooled}', [ox + 2.9, 2.35], { size: 12 });
    kit.label('\\text{white: ferrite} \\quad \\text{striped: pearlite}', [ox + 2.9, -3.85], { size: 11, color: C.grey });
    // right: properties
    const P = kit.plane({ x: [0, 1.4, 0.2], y: [0, 1200, 200], sx: 6 / 1.4, sy: 6.6 / 1200, origin: [1.5, -3.4], xEvery: 0.2, yEvery: 400, xLabel: '\\%\\,\\text{C}', yLabel: '\\text{MPa}' });
    kit.line(range(0, 1.4, 100).map((c) => P.toW(c, uts(c))), { color: C.yellow, width: 2.5 });
    kit.line(range(0, 1.4, 100).map((c) => P.toW(c, elong(c) * 25)), { color: C.teal, width: 2.5 });
    kit.label('\\text{strength}', [P.toW(1.4, 0)[0], P.toW(0, uts(1.4))[1] + 0.3], { size: 12, color: C.yellow, align: 'right' });
    kit.label('\\text{elongation (×25)}', [P.toW(0.15, 0)[0], P.toW(0, elong(0) * 25)[1] + 0.3], { size: 12, color: C.teal, align: 'left' });
    kit.line([P.toW(0.76, 0), P.toW(0.76, 1200)], { color: C.grey, width: 1, dashed: true });
    kit.label('0.76', [P.toW(0.76, 0)[0], P.toW(0, 1200)[1] + 0.25], { size: 11, color: C.grey, tex: false });
    const cur = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    const d1 = kit.dot([0, 0], { r: 0.11, color: C.yellow });
    const d2 = kit.dot([0, 0], { r: 0.11, color: C.teal });
    const name = kit.label('', [-4.5, 3.5], { size: 16, color: C.white, tex: false });
    return (p) => {
      const fp = pearliteF(p.c);
      const nP = Math.round(fp * GRAINS.length);
      const cem = cementF(p.c);
      cells.forEach((c, i) => {
        const isP = i < nP;
        c.f.color(isP ? 0x7d7a72 : 0xe6e1d3);
        c.stripes.forEach((s) => s.visible(isP));
        c.bound.visible(cem > 0 && i % 3 !== 2).outline.opacity(clamp(cem * 12, 0, 1));
      });
      d1.set(P.toW(p.c, uts(p.c)));
      d2.set(P.toW(p.c, elong(p.c) * 25));
      cur.set([P.toW(p.c, 0), P.toW(p.c, 1200)]);
      const code = `10${String(Math.round(p.c * 100)).padStart(2, '0')}`;
      name.set(p.c < 0.05 ? 'nearly pure iron' : p.c <= 0.99 ? `like AISI ${code}` : `${r2(p.c)}% C tool steel`);
    };
  },
};

// ---------------------------------------------------------------------------
// Four-bar linkage
// ---------------------------------------------------------------------------
const FB_G = 4;
const FB_C = 3;
const fb = { th: 0.3, dir: 1, trail: [], key: '' };
const grashof = (a, b) => {
  const L = [a, b, FB_C, FB_G].sort((x, y) => x - y);
  return { ok: L[0] + L[3] <= L[1] + L[2] + 1e-9, s: L[0], l: L[3], p: L[1], q: L[2] };
};
function fbSolve(a, b, th, O2, O4) {
  const A = [O2[0] + a * Math.cos(th), O2[1] + a * Math.sin(th)];
  const dx = O4[0] - A[0];
  const dy = O4[1] - A[1];
  const d = Math.hypot(dx, dy);
  if (d > b + FB_C || d < Math.abs(b - FB_C)) return null;
  const x = (b * b - FB_C * FB_C + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, b * b - x * x));
  const B = [A[0] + (x * dx) / d - (h * dy) / d, A[1] + (x * dy) / d + (h * dx) / d];
  return { A, B };
}

export const four_bar = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make the crank turn all the way round with a coupler at least 5 units long.',
  goal: (t) => grashof(t.a, t.b).ok && t.a <= Math.min(t.b, FB_C, FB_G) && t.b >= 5,
  params: [
    { key: 'a', label: 'Crank length (yellow)', min: 0.6, max: 3, step: 0.1, value: 1 },
    { key: 'b', label: 'Coupler length (blue)', min: 1.5, max: 6, step: 0.1, value: 4.5 },
  ],
  beats: [
    { say: 'Crank 1, coupler 4.5, rocker 3, ground 4. Shortest + longest = 5.5 ≤ 7, so Grashof’s rule holds: the short crank turns fully while the rocker swings.', set: { a: 1, b: 4.5 } },
    { say: 'Crank 2.8, coupler 2.2: now 2.2 + 4 = 6.2 is more than 2.8 + 3 = 5.8. No link can turn fully; the crank rocks back and forth.', set: { a: 2.8, b: 2.2 } },
    { say: 'A point on the coupler traces a curve (pink). Change the lengths and the curve changes: ovals, teardrops, near-straight stretches like Watt’s.', set: { a: 1.5, b: 3.5 } },
  ],
  readout: (t) => {
    const g = grashof(t.a, t.b);
    return [
      ['Links: crank, coupler, rocker, ground', `${r1(t.a)}, ${r1(t.b)}, 3, 4`],
      ['Shortest + longest', r1(g.s + g.l)],
      ['Sum of the other two', r1(g.p + g.q)],
      ['Grashof', g.ok ? (t.a <= g.s + 1e-9 ? 'yes: the crank turns fully' : 'yes, but the crank is not the shortest link') : 'no: every link only rocks'],
    ];
  },
  setup(kit) {
    const O2 = [-5.2, -1.6];
    const O4 = [O2[0] + FB_G, O2[1]];
    kit.line([O2, O4], { color: C.grey, width: 4, dashed: true });
    [O2, O4].forEach((o) => {
      kit.fill([[o[0], o[1] - 0.05], [o[0] - 0.35, o[1] - 0.55], [o[0] + 0.35, o[1] - 0.55]], { color: C.grey, opacity: 0.7 });
    });
    kit.label('\\text{ground} = 4', [(O2[0] + O4[0]) / 2, O2[1] - 0.8], { size: 12, color: C.grey });
    const crank = kit.line([], { color: C.yellow, width: 5, create: false });
    const coup = kit.line([], { color: C.blue, width: 5, create: false });
    const rock = kit.line([], { color: C.green, width: 5, create: false });
    const tri = kit.fill([], { color: C.blue, opacity: 0.2 });
    const trail = kit.line([], { color: C.pink, width: 2, create: false });
    const cp = kit.dot([0, 0], { r: 0.12, color: C.pink, z: 6 });
    const jA = kit.dot([0, 0], { r: 0.1, color: C.white, z: 6 });
    const jB = kit.dot([0, 0], { r: 0.1, color: C.white, z: 6 });
    kit.dot(O2, { r: 0.12, color: C.white, z: 6 });
    kit.dot(O4, { r: 0.12, color: C.white, z: 6 });
    const verdict = kit.label('', [4.6, 3.3], { size: 16, tex: false });
    const rule = kit.label('', [4.6, 2.3], { size: 15 });
    return (p, t, time, dt) => {
      const key = `${t.a}|${t.b}`;
      if (key !== fb.key) {
        fb.key = key;
        fb.trail = [];
        fb.dir = 1;
        if (!fbSolve(t.a, t.b, fb.th, O2, O4)) {
          for (let k = 0; k < 360; k++) {
            const th = (k * Math.PI) / 180;
            if (fbSolve(t.a, t.b, th, O2, O4)) {
              fb.th = th;
              break;
            }
          }
        }
      }
      const h = Math.min(dt || 0.016, 0.05) * 1.3;
      let next = fb.th + fb.dir * h;
      if (!fbSolve(t.a, t.b, next, O2, O4)) {
        fb.dir = -fb.dir;
        next = fb.th + fb.dir * h;
        if (!fbSolve(t.a, t.b, next, O2, O4)) next = fb.th;
      }
      fb.th = next;
      const s = fbSolve(t.a, t.b, fb.th, O2, O4);
      if (!s) return;
      const { A, B } = s;
      crank.set([O2, A]);
      coup.set([A, B]);
      rock.set([B, O4]);
      const ux = (B[0] - A[0]) / t.b;
      const uy = (B[1] - A[1]) / t.b;
      const P = [A[0] + ux * t.b * 0.5 - uy * 1.2, A[1] + uy * t.b * 0.5 + ux * 1.2];
      tri.set([A, B, P]);
      cp.set(P);
      jA.set(A);
      jB.set(B);
      fb.trail.push(P);
      if (fb.trail.length > 420) fb.trail.shift();
      trail.set(fb.trail);
      const g = grashof(t.a, t.b);
      verdict.set(g.ok ? 'Grashof: one link turns fully' : 'not Grashof: all links rock').color(g.ok ? C.green : C.red);
      rule.set(`${r1(g.s)} + ${r1(g.l)} = ${r1(g.s + g.l)} ${g.ok ? '\\le' : '>'} ${r1(g.p)} + ${r1(g.q)} = ${r1(g.p + g.q)}`);
      void p;
      void time;
    };
  },
};

// ---------------------------------------------------------------------------
// Critical path: installing a heat-treatment line
// ---------------------------------------------------------------------------
const TASKS = [
  { k: 'A', name: 'design the line', d: 3, pre: [] },
  { k: 'B', name: 'order and deliver furnace', d: 6, pre: ['A'] },
  { k: 'C', name: 'build foundation', d: 4, pre: ['A'] },
  { k: 'D', name: 'install furnace', d: 2, pre: ['B', 'C'] },
  { k: 'E', name: 'train staff', d: 3, pre: ['A'] },
  { k: 'F', name: 'test run', d: 1, pre: ['D', 'E'] },
];
function cpm(dC) {
  const T = TASKS.map((x) => ({ ...x, d: x.k === 'C' ? dC : x.d }));
  const by = Object.fromEntries(T.map((x) => [x.k, x]));
  T.forEach((x) => {
    x.es = Math.max(0, ...x.pre.map((q) => by[q].ef));
    x.ef = x.es + x.d;
  });
  const end = Math.max(...T.map((x) => x.ef));
  [...T].reverse().forEach((x) => {
    const succ = T.filter((y) => y.pre.includes(x.k));
    x.lf = succ.length ? Math.min(...succ.map((y) => y.ls)) : end;
    x.ls = x.lf - x.d;
    x.slack = x.ls - x.es;
  });
  return { T, end };
}

export const gantt_cpm = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the longest the foundation can take without delaying the whole project.',
  goal: (t) => t.dC === 6,
  params: [{ key: 'dC', label: 'Foundation time, task C (weeks)', min: 1, max: 10, step: 1, value: 4 }],
  beats: [
    { say: 'The furnace order (B, 6 weeks) is the long pole: A → B → D → F takes 12 weeks. The foundation (C) has 2 weeks of slack, shown as the faint extension of its bar.', set: { dC: 4 } },
    { say: 'If the foundation takes 6 weeks, it ties with the furnace order. Both paths are now critical; any delay to either moves the finish date.', set: { dC: 6 } },
    { say: 'At 9 weeks the foundation becomes the critical path and the project stretches to 15 weeks. The furnace order now has 3 weeks of slack.', set: { dC: 9 } },
  ],
  readout: (t) => {
    const { T, end } = cpm(t.dC);
    return [
      ['Project length', `${end} weeks`],
      ['Critical tasks', T.filter((x) => x.slack === 0).map((x) => x.k).join(', ')],
      ['Slack of C (foundation)', `${T[2].slack} weeks`],
      ['Slack of E (training)', `${T[4].slack} weeks`],
    ];
  },
  setup(kit) {
    const x0 = -3.2;
    const wk = 0.66;
    const rowY = (i) => 1.6 - i * 0.82;
    for (let w = 0; w <= 16; w += 2) {
      kit.line([[x0 + w * wk, -3.4], [x0 + w * wk, 2.3]], { color: C.grid, width: 1, opacity: 0.7 });
      kit.label(`${w}`, [x0 + w * wk, -3.75], { size: 11, color: C.grey, tex: false });
    }
    kit.label('\\text{weeks}', [x0 + 16 * wk, -4.15], { size: 11, color: C.grey, align: 'right' });
    const slackBars = TASKS.map((_, i) => kit.rect(0, rowY(i) - 0.28, 0.01, 0.56, { color: C.grey, opacity: 0.18, strokeColor: C.grey, width: 1 }));
    const bars = TASKS.map((_, i) => kit.rect(0, rowY(i) - 0.28, 0.01, 0.56, { color: C.blue, opacity: 0.7, strokeColor: C.blue }));
    TASKS.forEach((x, i) => kit.label(`${x.k}\\;\\text{${x.name}}`, [x0 - 0.25, rowY(i)], { size: 12, align: 'right' }));
    const endLine = kit.line([], { color: C.yellow, width: 2, dashed: true, create: false });
    const endLab = kit.label('', [0, 0], { size: 13, color: C.yellow, tex: false });
    kit.label('\\text{red = critical (no slack)} \\quad \\text{grey = slack}', [0.6, 3.9], { size: 12 });
    const dLab = TASKS.map((_, i) => kit.label('', [0, rowY(i)], { size: 11, color: C.white, tex: false }));
    return (p, t) => {
      const { T, end } = cpm(t.dC);
      T.forEach((x, i) => {
        const crit = x.slack === 0;
        bars[i].set(x0 + x.es * wk, rowY(i) - 0.28, x.d * wk, 0.56);
        bars[i].fill.color(crit ? C.red : C.blue);
        bars[i].outline.color(crit ? C.red : C.blue);
        slackBars[i].visible(x.slack > 0).set(x0 + x.ef * wk, rowY(i) - 0.28, Math.max(0.01, x.slack * wk), 0.56);
        dLab[i].set(`${x.d} wk`).pos([x0 + (x.es + x.d / 2) * wk, rowY(i)]);
      });
      endLine.set([[x0 + end * wk, -3.4], [x0 + end * wk, 2.3]]);
      endLab.set(`finish: week ${end}`).pos([x0 + end * wk, 2.6]);
      void p;
    };
  },
};

// ---------------------------------------------------------------------------
// Creep: three stages, and the Larson–Miller parameter
// ---------------------------------------------------------------------------
const lmpOf = (s) => 26000 - 31.25 * s;
const logLife = (s, Tc) => lmpOf(s) / (Tc + 273) - 20;
const lifeTxt = (lg) => {
  const h = 10 ** lg;
  if (h < 1) return 'under an hour';
  if (h < 48) return `${r1(h)} hours`;
  if (h < 24 * 365) return `${big(h)} hours (${r1(h / 24)} days)`;
  if (h > 1e7) return 'more than 1,000 years';
  return `${big(h)} hours (${r1(h / 8766)} years)`;
};
const creepE = (u) => 0.4 * (1 - Math.exp(-u / 0.06)) + 1.2 * u + 3.4 * u ** 9;

export const creep_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'At 600 °C, find the stress that gives a rupture life of 100,000 hours (about 11 years).',
  goal: (t) => t.T === 600 && Math.abs(logLife(t.s, t.T) - 5) < 0.15,
  params: [
    { key: 's', label: 'Stress σ (MPa)', min: 50, max: 300, step: 1, value: 200 },
    { key: 'T', label: 'Temperature (°C)', min: 500, max: 700, step: 5, value: 600 },
  ],
  beats: [
    { say: 'At 200 MPa and 600 °C this steel stretches quickly at first, settles into a steady creep, then speeds up and breaks after about 400 hours.', set: { s: 200, T: 600 } },
    { say: 'Halve the stress to 100 MPa and the life jumps to millions of hours. Creep life is extremely sensitive to stress.', set: { s: 100, T: 600 } },
    { say: 'Keep 100 MPa but run 100 °C hotter, at 700 °C, and the life falls to about 3,000 hours. Each stress has one Larson–Miller value; T and t trade against each other.', set: { s: 100, T: 700 } },
  ],
  readout: (t) => {
    const lg = logLife(t.s, t.T);
    return [
      ['Homologous temperature T/Tₘ', r2((t.T + 273) / 1800)],
      ['Larson–Miller parameter', big(lmpOf(t.s))],
      ['log₁₀(rupture hours)', r2(lg)],
      ['Time to rupture', lifeTxt(lg)],
    ];
  },
  setup(kit) {
    // creep curve, time as a fraction of life
    const P = kit.plane({ x: [0, 1, 0.25], y: [0, 5, 1], sx: 6.2, sy: 0.95, origin: [-7.2, -1.2], xEvery: 0.25, numbers: false, xLabel: 't / t_r', yLabel: '\\text{strain}' });
    kit.line(range(0, 0.995, 200).map((u) => P.toW(u, Math.min(creepE(u), 5))), { color: C.pink, width: 3 });
    kit.label('\\text{primary}', P.toW(0.06, 1.4), { size: 11, color: C.grey });
    kit.label('\\text{secondary (steady)}', P.toW(0.45, 1.5), { size: 11, color: C.grey });
    kit.label('\\text{tertiary}', P.toW(0.82, 3.9), { size: 11, color: C.grey });
    kit.label('\\times', P.toW(0.995, 4.75), { size: 16, color: C.red });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    // master curve
    const M = kit.plane({ x: [16, 26, 2], y: [0, 320, 50], sx: 4.6 / 10, sy: 4.4 / 320, origin: [2.4 - 16 * 0.46, -1.2], axisAt: [16, 0], xEvery: 2, yEvery: 100, fmt: (v, ax) => (ax === 'x' ? `${v}k` : `${v}`), xLabel: '\\text{LMP}', yLabel: '\\sigma' });
    kit.line(range(50, 300, 60).map((s) => M.toW(lmpOf(s) / 1000, s)), { color: C.blue, width: 2.5 });
    const md = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    // time ruler, log hours 0..7
    const rx = (lg) => -6.6 + (clamp(lg, 0, 7) / 7) * 13.4;
    kit.line([[rx(0), -3.4], [rx(7), -3.4]], { color: C.axis, width: 2 });
    [[0, '1 h'], [Math.log10(24), '1 day'], [Math.log10(8766), '1 year'], [Math.log10(87660), '10 years'], [Math.log10(876600), '100 years'], [7, '10⁷ h']].forEach(([lg, s]) => {
      kit.line([[rx(lg), -3.55], [rx(lg), -3.25]], { color: C.axis, width: 2 });
      kit.label(s, [rx(lg), -3.85], { size: 11, color: C.grey, tex: false });
    });
    const tm = kit.arrow([0, -2.6], [0, -3.3], { color: C.yellow, width: 3 });
    const tl = kit.label('', [0, -2.35], { size: 12, color: C.yellow, tex: false });
    return (p, t, time) => {
      const u = (time * 0.12) % 1;
      dot.set(P.toW(u, Math.min(creepE(u), 5)));
      md.set(M.toW(lmpOf(p.s) / 1000, p.s));
      const lg = logLife(p.s, p.T);
      const x = rx(lg);
      tm.set([x, -2.6], [x, -3.3]);
      tl.set(lifeTxt(lg)).pos([clamp(x, -5.2, 5.4), -2.35]);
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// AC power: phase angle and power factor
// ---------------------------------------------------------------------------
export const ac_power = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Set the phase angle so the power factor is 0.95, the value utilities ask for.',
  goal: (t) => Math.abs(Math.cos(rad(t.phi)) - 0.95) < 0.01,
  params: [
    { key: 'phi', label: 'Current lags voltage by φ (degrees)', min: 0, max: 90, step: 0.5, value: 0 },
    { key: 'I', label: 'Current I (A rms)', min: 1, max: 10, step: 0.1, value: 10 },
  ],
  beats: [
    { say: 'A heater: current in step with voltage (φ = 0). Their product, the power, is always positive and averages 230 × 10 = 2,300 W.', set: { phi: 0, I: 10 } },
    { say: 'A motor: current lags by 37°, power factor 0.8. Part of each cycle the power goes negative (energy flows back). The average drops to 1,840 W, for the same current.', set: { phi: 37, I: 10 } },
    { say: 'A pure coil: φ = 90°. The power swings equally positive and negative and averages zero. The cables carry 10 A while no work is done.', set: { phi: 90, I: 10 } },
  ],
  readout: (t) => {
    const pf = Math.cos(rad(t.phi));
    return [
      ['Power factor cos φ', r2(pf)],
      ['Real power P', `${big(230 * t.I * pf)} W`],
      ['Reactive power Q', `${big(230 * t.I * Math.sin(rad(t.phi)))} var`],
      ['Apparent power S', `${big(230 * t.I)} VA`],
    ];
  },
  setup(kit) {
    const P1 = kit.plane({ x: [0, 2, 0.5], y: [-1.2, 1.2, 0.5], sx: 3.9, sy: 1.25, origin: [-7.6, 2.1], axisAt: [0, 0], numbers: false, grid: false, yLabel: '' });
    kit.label('\\text{voltage}', [0.6, 3.75], { size: 12, color: C.yellow, align: 'right' });
    kit.label('\\text{current}', [0.6, 3.35], { size: 12, color: C.blue, align: 'right' });
    const vw = kit.line([], { color: C.yellow, width: 2.5, create: false });
    const iw = kit.line([], { color: C.blue, width: 2.5, create: false });
    const P2 = kit.plane({ x: [0, 2, 0.5], y: [-2400, 4800, 1200], sx: 3.9, sy: 3.4 / 7200, origin: [-7.6, -2.0], axisAt: [0, 0], numbers: false, grid: false });
    kit.label('\\text{power} = v \\times i', [0.6, -0.3], { size: 12, color: C.pink, align: 'right' });
    const pw = kit.line([], { color: C.pink, width: 2.5, create: false });
    const pfill = kit.fill([], { color: C.pink, opacity: 0.18 });
    const avg = kit.line([], { color: C.white, width: 2, dashed: true, create: false });
    const avgL = kit.label('', [0, 0], { size: 12, color: C.white, tex: false, align: 'left' });
    // power triangle
    const ox = 2.4;
    const oy = -2.6;
    const sc = 5 / 2300;
    const Pl = kit.arrow([ox, oy], [ox, oy], { color: C.pink, width: 3 });
    const Ql = kit.arrow([ox, oy], [ox, oy], { color: C.teal, width: 3 });
    const Sl = kit.arrow([ox, oy], [ox, oy], { color: C.white, width: 3 });
    const lP = kit.label('P', [0, 0], { size: 14, color: C.pink });
    const lQ = kit.label('Q', [0, 0], { size: 14, color: C.teal });
    const lS = kit.label('S', [0, 0], { size: 14, color: C.white });
    const lphi = kit.label('\\varphi', [0, 0], { size: 13, color: C.yellow });
    kit.label('\\text{power triangle}', [4.9, 3.6], { size: 12 });
    return (p, t, time) => {
      const ph = rad(p.phi);
      const sh = time * 0.25;
      const Ip = p.I * Math.SQRT2;
      vw.set(range(0, 2, 160).map((x) => P1.toW(x, Math.sin(2 * Math.PI * (x - sh)))));
      iw.set(range(0, 2, 160).map((x) => P1.toW(x, (Ip / 20) * Math.sin(2 * Math.PI * (x - sh) - ph))));
      const pts = range(0, 2, 200).map((x) => [x, 325.3 * Ip * Math.sin(2 * Math.PI * (x - sh)) * Math.sin(2 * Math.PI * (x - sh) - ph)]);
      pw.set(pts.map(([x, y]) => P2.toW(x, y)));
      pfill.set([P2.toW(0, 0), ...pts.map(([x, y]) => P2.toW(x, y)), P2.toW(2, 0)]);
      const Pavg = 230 * p.I * Math.cos(ph);
      avg.set([P2.toW(0, Pavg), P2.toW(2, Pavg)]);
      avgL.set(`average ${big(Pavg)} W`).pos([P2.toW(2, 0)[0] + 0.1, P2.toW(0, Pavg)[1]]);
      const Pw = 230 * p.I * Math.cos(ph) * sc;
      const Qw = 230 * p.I * Math.sin(ph) * sc;
      Pl.set([ox, oy], [ox + Pw, oy]);
      Ql.set([ox + Pw, oy], [ox + Pw, oy + Qw]);
      Sl.set([ox, oy], [ox + Pw, oy + Qw]);
      lP.pos([ox + Pw / 2, oy - 0.35]);
      lQ.pos([ox + Pw + 0.35, oy + Qw / 2]);
      lS.pos([ox + Pw / 2 - 0.35, oy + Qw / 2 + 0.3]);
      lphi.pos([ox + 0.9 * Math.cos(ph / 2) + 0.15, oy + 0.9 * Math.sin(ph / 2)]);
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// Glass: viscosity against temperature (soda-lime, VFT)
// ---------------------------------------------------------------------------
const logEta = (T) => -2.6 + 4500 / (T - 260);
const GPOINTS = [
  [1, 'melting', C.red],
  [3, 'working (shaping)', C.gold],
  [6.6, 'softening', C.yellow],
  [12, 'annealing', C.teal],
  [13.5, 'strain', C.blue],
];
function glassState(le) {
  if (le < 2) return 'runny melt: fining and mixing';
  if (le < 4.5) return 'thick and workable: blown, pressed, drawn';
  if (le < 8) return 'soft: sags under its own weight';
  if (le < 12.7) return 'stiff: stresses relax (annealing range)';
  return 'rigid: stresses are locked in';
}

export const glass_viscosity = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the annealing point: the temperature where the viscosity is 10¹² Pa·s.',
  goal: (t) => Math.abs(logEta(t.T) - 12) < 0.1,
  params: [{ key: 'T', label: 'Temperature (°C)', min: 450, max: 1600, step: 1, value: 1000 }],
  beats: [
    { say: 'At about 1,060 °C window glass has a viscosity of 10³ Pa·s, like very thick honey: the working range, where it is blown or pressed.', set: { T: 1060 } },
    { say: 'At about 750 °C it reaches the softening point, 10^6.6 Pa·s: a glass fibre sags under its own weight.', set: { T: 750 } },
    { say: 'Near 570 °C, 10¹² Pa·s: the annealing point. Internal stresses relax in minutes here, so new glass is held at this temperature and then cooled slowly.', set: { T: 568 } },
  ],
  readout: (t) => {
    const le = logEta(t.T);
    return [
      ['Viscosity', `10^${r1(le)} Pa·s`.replace(/\^(-?[\d.]+)/, (m, d) => d.split('').map((c) => ({ '.': '·', '-': '⁻' })[c] ?? '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''))],
      ['State', glassState(le)],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [400, 1600, 100], y: [0, 16, 2], sx: 7.2 / 1200, sy: 7.4 / 16, origin: [0.3 - 400 * 0.006, -3.6], axisAt: [400, 0], xEvery: 200, yEvery: 4, xLabel: 'T\\;(°\\text{C})', yLabel: '\\log_{10}\\eta' });
    kit.line(range(540, 1600, 300).map((T) => [T, logEta(T)]).filter(([, y]) => y <= 16).map(([T, y]) => P.toW(T, y)), { color: C.pink, width: 3 });
    GPOINTS.forEach(([le, name, col]) => {
      kit.line([P.toW(400, le), P.toW(1600, le)], { color: col, width: 1, dashed: true, opacity: 0.6 });
      kit.label(`\\text{${name}}`, [P.toW(1600, 0)[0], P.toW(0, le)[1] + 0.2], { size: 11, color: col, align: 'right' });
    });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    // left: a glass gob hanging from a rod
    kit.line([[-6.6, 3.0], [-3.0, 3.0]], { color: C.axis, width: 5 });
    const gob = kit.fill([], { color: C.gold, opacity: 0.85 });
    const st = kit.label('', [-4.8, -3.6], { size: 12, tex: false });
    const tl = kit.label('', [-4.8, -4.05], { size: 14, color: C.yellow, tex: false });
    return (p) => {
      const le = logEta(p.T);
      dot.set(P.toW(p.T, Math.min(le, 16)));
      const drip = 0.6 + 5.0 * clamp((9 - le) / 8, 0, 1);
      const neck = 0.22 + 0.5 * clamp((le - 1) / 10, 0, 1);
      const pts = [];
      range(0, 1, 30).forEach((u) => pts.push([-4.8 - neck - 0.5 * Math.sin(Math.PI * u) * 0.9 * (u > 0.6 ? 1 : u / 0.6), 2.95 - drip * u]));
      const right = pts.map(([x, y]) => [-9.6 - x, y]).reverse();
      gob.set([...pts, ...right]);
      const glow = clamp((p.T - 550) / 700, 0, 1);
      gob.color(lerpC(0x9fc7c9, lerpC(C.red, C.yellow, glow), clamp(glow * 1.6, 0, 1)));
      st.set(glassState(le));
      tl.set(`${Math.round(p.T)} °C`);
    };
  },
};

// ---------------------------------------------------------------------------
// Factor of safety: overlapping load and strength
// ---------------------------------------------------------------------------
function failure(n, cv, under) {
  const muL = 100 * (under ? 1.2 : 1);
  const sL = cv * muL;
  const muS = 100 * n;
  const sS = cv * muS;
  const beta = (muS - muL) / Math.sqrt(sS * sS + sL * sL);
  return { muL, sL, muS, sS, beta, pf: beta > 0 ? tail(beta) : 1 - tail(-beta) };
}
const pdf = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));

export const safety_factor = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With the loads estimated correctly, get the failure chance below 1 in a million using a factor of safety no higher than 2.5.',
  goal: (t) => t.case === 'ok' && t.n <= 2.5 && failure(t.n, t.cv / 100, false).pf < 1e-6,
  params: [
    { key: 'n', label: 'Design factor of safety', min: 1, max: 3, step: 0.05, value: 2 },
    { key: 'cv', label: 'Scatter in loads and strengths (%)', min: 5, max: 25, step: 1, value: 10 },
    { key: 'case', label: 'Load estimate', type: 'choice', value: 'ok', options: [{ value: 'ok', label: 'correct' }, { value: 'under', label: 'loads 20% higher than assumed' }] },
  ],
  beats: [
    { say: 'Strength twice the load, with 10% scatter in each. The humps barely touch: about 1 failure in 250,000 members.', set: { n: 2, cv: 10, case: 'ok' } },
    { say: 'Same factor of 2, but 20% scatter (poor quality control). The overlap grows and failure becomes about 1 in 80: the factor alone does not guarantee safety.', set: { n: 2, cv: 20, case: 'ok' } },
    { say: 'Back to 10% scatter, but the real loads are 20% higher than the design assumed, as at the Quebec Bridge. The risk is nearly 80 times greater, and nobody sees it on paper.', set: { n: 2, cv: 10, case: 'under' } },
  ],
  readout: (t) => {
    const f = failure(t.n, t.cv / 100, t.case === 'under');
    return [
      ['Factor of safety on paper', r2(t.n)],
      ['True factor of safety', r2(f.muS / f.muL)],
      ['Safety index β', r2(f.beta)],
      ['Chance of failure', oneIn(f.pf)],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 450, 50], y: [0, 0.045, 0.005], sx: 14 / 450, sy: 6.6 / 0.045, origin: [-7.2, -3.3], xEvery: 100, numbers: true, yAxis: false, grid: false, fmt: (v) => `${v}`, xLabel: '\\text{stress (MPa)}' });
    const lc = kit.line([], { color: C.blue, width: 3, create: false });
    const sc = kit.line([], { color: C.green, width: 3, create: false });
    const lf = kit.fill([], { color: C.blue, opacity: 0.15 });
    const sf = kit.fill([], { color: C.green, opacity: 0.15 });
    const ov = kit.fill([], { color: C.red, opacity: 0.85, z: 3 });
    const lL = kit.label('\\text{load}', [0, 0], { size: 13, color: C.blue });
    const lS = kit.label('\\text{strength}', [0, 0], { size: 13, color: C.green });
    const assumed = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    const aL = kit.label('\\text{assumed load}', [0, 0], { size: 11, color: C.white });
    const pf = kit.label('', [4.0, 3.6], { size: 15, color: C.red, tex: false });
    return (p, t) => {
      const f = failure(p.n, p.cv / 100, t.case === 'under');
      const xs = range(0, 450, 400);
      const yl = xs.map((x) => Math.min(pdf(x, f.muL, f.sL), 0.045));
      const ys = xs.map((x) => Math.min(pdf(x, f.muS, f.sS), 0.045));
      lc.set(xs.map((x, i) => P.toW(x, yl[i])));
      sc.set(xs.map((x, i) => P.toW(x, ys[i])));
      lf.set([P.toW(0, 0), ...xs.map((x, i) => P.toW(x, yl[i])), P.toW(450, 0)]);
      sf.set([P.toW(0, 0), ...xs.map((x, i) => P.toW(x, ys[i])), P.toW(450, 0)]);
      ov.set([P.toW(0, 0), ...xs.map((x, i) => P.toW(x, Math.min(yl[i], ys[i]))), P.toW(450, 0)]);
      lL.pos([P.toW(f.muL, 0)[0], P.toW(0, Math.min(pdf(f.muL, f.muL, f.sL), 0.045))[1] + 0.3]);
      lS.pos([P.toW(f.muS, 0)[0], P.toW(0, pdf(f.muS, f.muS, f.sS))[1] + 0.3]);
      assumed.visible(t.case === 'under').set([P.toW(100, 0), P.toW(100, 0.04)]);
      aL.visible(t.case === 'under').pos([P.toW(100, 0)[0] - 0.9, P.toW(0, 0.041)[1]]);
      pf.set(`chance of failure: ${oneIn(f.pf)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Beam bending: shear and moment diagrams for a point load
// ---------------------------------------------------------------------------
const BL = 3; // span, m
const BS = 83333; // mm³, 50 × 100 timber
const beamM = (P, a) => (P * a * (BL - a)) / BL; // kN·m

export const beam_bending = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With a 5 kN load, place it so the largest bending stress is exactly 30 MPa.',
  goal: (t) => Math.abs(t.P - 5) < 0.01 && Math.abs((beamM(t.P, t.a) * 1e6) / BS - 30) < 0.6,
  params: [
    { key: 'a', label: 'Load position a (m from left)', min: 0.1, max: 2.9, step: 0.01, value: 1.5 },
    { key: 'P', label: 'Load P (kN)', min: 1, max: 10, step: 0.5, value: 5 },
  ],
  beats: [
    { say: '5 kN at midspan of a 3 m beam. Each support takes 2.5 kN. The moment peaks under the load at PL/4 = 3.75 kN·m, giving 45 MPa in the outer fibres.', set: { a: 1.5, P: 5 } },
    { say: 'Move the load near a support. Most of it goes straight into that support, the moment falls to 2.1 kN·m and the stress to 25 MPa.', set: { a: 0.5, P: 5 } },
    { say: 'The stress is zero at the neutral axis and grows straight-line to the top (squeezed) and bottom (stretched). That is why the shelf cracks on its underside.', set: { a: 1.5, P: 2 } },
  ],
  readout: (t) => {
    const RA = (t.P * (BL - t.a)) / BL;
    const M = beamM(t.P, t.a);
    return [
      ['Support reactions R_A, R_B', `${r2(RA)}, ${r2(t.P - RA)} kN`],
      ['Largest moment M', `${r2(M)} kN·m`],
      ['Largest stress M / S', `${r1((M * 1e6) / BS)} MPa`],
    ];
  },
  setup(kit) {
    const x0 = -6.8;
    const W = 9.0;
    const X = (m) => x0 + (m / BL) * W;
    const by = 2.6;
    const beam = kit.line([], { color: C.gold, width: 6, create: false });
    kit.fill([[X(0), by - 0.1], [X(0) - 0.3, by - 0.6], [X(0) + 0.3, by - 0.6]], { color: C.grey, opacity: 0.8 });
    kit.dot([X(BL), by - 0.35], { r: 0.25, color: C.grey });
    const load = kit.arrow([0, 0], [0, 0], { color: C.red, width: 4 });
    const lLab = kit.label('', [0, 0], { size: 13, color: C.red });
    // shear diagram
    const vy = 0.2;
    kit.line([[X(0), vy], [X(BL), vy]], { color: C.axis, width: 1.5 });
    kit.label('V', [x0 - 0.5, vy], { size: 15, color: C.blue });
    const vline = kit.line([], { color: C.blue, width: 2.5, create: false });
    const vpos = kit.rect(0, 0, 0.01, 0.01, { color: C.blue, opacity: 0.25, stroke: false });
    const vneg = kit.rect(0, 0, 0.01, 0.01, { color: C.blue, opacity: 0.25, stroke: false });
    // moment diagram
    const my = -1.9;
    kit.line([[X(0), my], [X(BL), my]], { color: C.axis, width: 1.5 });
    kit.label('M', [x0 - 0.5, my - 0.5], { size: 15, color: C.pink });
    const mline = kit.line([], { color: C.pink, width: 2.5, create: false });
    const mfill = kit.fill([], { color: C.pink, opacity: 0.25 });
    const mLab = kit.label('', [0, 0], { size: 12, color: C.pink, tex: false });
    // right: stress across the section at the peak
    const sx = 5.6;
    const sh = 3.2;
    kit.rect(sx - 0.5, -sh / 2 - 0.3, 1.0, sh, { color: C.gold, opacity: 0.5, strokeColor: C.gold });
    kit.line([[sx - 1.6, -0.3], [sx + 2.2, -0.3]], { color: C.yellow, width: 1.5, dashed: true });
    kit.label('\\text{section at the load}', [sx + 0.3, 2.0], { size: 12 });
    kit.label('\\text{neutral axis}', [sx + 2.2, -0.05], { size: 10, color: C.yellow, align: 'right' });
    const sArr = range(0, 8, 9).map(() => kit.arrow([0, 0], [0, 0], { color: C.white, width: 2 }));
    const sTop = kit.label('', [sx + 1.5, sh / 2 - 0.1], { size: 11, color: C.red, tex: false });
    const sBot = kit.label('', [sx + 1.5, -sh / 2 - 0.5], { size: 11, color: C.blue, tex: false });
    return (p) => {
      const M = beamM(p.P, p.a);
      const RA = (p.P * (BL - p.a)) / BL;
      const kV = 0.22;
      const kM = 0.33;
      const sag = 0.03 * M;
      beam.set(range(0, BL, 60).map((x) => [X(x), by - sag * (x < p.a ? x / p.a : (BL - x) / (BL - p.a)) * 4]));
      const ly = by - sag * 4;
      load.set([X(p.a), ly + 0.3 + 0.12 * p.P], [X(p.a), ly + 0.08]);
      lLab.set(`P = ${r1(p.P)}\\,\\text{kN}`).pos([X(p.a) + 1.0, ly + 0.25 + 0.12 * p.P]);
      const V = [[X(0), vy], [X(0), vy + RA * kV], [X(p.a), vy + RA * kV], [X(p.a), vy + (RA - p.P) * kV], [X(BL), vy + (RA - p.P) * kV], [X(BL), vy]];
      vline.set(V);
      vpos.set(X(0), vy, X(p.a) - X(0), RA * kV);
      vneg.set(X(p.a), vy + (RA - p.P) * kV, X(BL) - X(p.a), (p.P - RA) * kV);
      const Mp = [[X(0), my], [X(p.a), my - M * kM], [X(BL), my]];
      mline.set(Mp);
      mfill.set(Mp);
      mLab.set(`${r2(M)} kN·m`).pos([X(p.a), my - M * kM - 0.3]);
      const sig = (M * 1e6) / BS;
      const L = Math.min(1.6, sig / 30);
      sArr.forEach((ar, i) => {
        const y = -sh / 2 + (sh * i) / 8;
        const f = (y / (sh / 2)) * L;
        const yy = y - 0.3;
        ar.set([sx, yy], [sx - f, yy]).color(f > 0 ? C.red : C.blue);
        ar.visible(Math.abs(f) > 0.04);
      });
      sTop.set(`−${r1(sig)} MPa squeezed`);
      sBot.set(`+${r1(sig)} MPa stretched`);
    };
  },
};
