import { C } from '../theme';
import { clamp, range } from '../kit';

const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r3 = (v) => `${Math.round(v * 1000) / 1000}`.replace('-', '−');
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => `${n}`.split('').map((c) => SUP[c] ?? c).join('');
// a number given by its base-10 logarithm, written like 1.8 × 10¹⁸
function sci(lg) {
  if (lg < 4) return `${Math.round(10 ** lg)}`;
  let e = Math.floor(lg);
  let m = Math.round(10 ** (lg - e) * 10) / 10;
  if (m >= 10) {
    m = 1;
    e += 1;
  }
  return `${m} × 10${sup(e)}`;
}
const lnFact = (n) => {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
};
const lnChoose = (n, k) => lnFact(n) - lnFact(k) - lnFact(n - k);
const circle = (cx, cy, r, n = 28) => range(0, 2 * Math.PI, n + 1).map((q) => [cx + r * Math.cos(q), cy + r * Math.sin(q)]);
// small repeatable pseudo-random numbers
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------------------------------------------------------------------------
// X-ray diffraction: Bragg reflection from stacked planes
// ---------------------------------------------------------------------------
const LAMBDA = 0.154; // nm, copper K-alpha X-rays
const PLANES = { 111: 0.208, 200: 0.180, 220: 0.128 };
const NPL = 8; // planes that add up in the brightness curve
function braggI(tt, d) {
  const th = (tt / 2) * (Math.PI / 180);
  const phi = (2 * Math.PI * 2 * d * Math.sin(th)) / LAMBDA;
  const s = Math.sin(phi / 2);
  if (Math.abs(s) < 1e-6) return 1;
  return (Math.sin((NPL * phi) / 2) / (NPL * s)) ** 2;
}

export const bragg_planes = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find copper’s (111) peak: turn 2θ until the waves from neighbouring planes line up and the reflection is bright.',
  goal: (t) => t.hkl === '111' && braggI(t.tt, PLANES[111]) > 0.9,
  params: [
    { key: 'tt', label: 'Detector angle 2θ (degrees)', min: 20, max: 110, step: 0.1, value: 30 },
    { key: 'hkl', label: 'Planes in copper', type: 'choice', value: '111', options: Object.entries(PLANES).map(([k, d]) => ({ value: k, label: `(${k}), d = ${d} nm` })) },
  ],
  beats: [
    { say: 'At 2θ = 30° the wave from the second plane arrives out of step with the first, so the two only partly add. Each deeper plane is a bit further out of step, and over many planes they cancel: almost no reflection.', set: { tt: 30, hkl: '111' } },
    { say: 'At 2θ = 43.3° the extra path, 2d sin θ, is exactly one wavelength. Every plane’s wave lines up with the next, and a bright peak appears.', set: { tt: 43.3, hkl: '111' } },
    { say: 'The (220) planes are closer together, so their peak sits at a larger angle, 74.1°. Each spacing gives its own peak: the crystal’s fingerprint.', set: { tt: 74.1, hkl: '220' } },
  ],
  readout: (t) => {
    const d = PLANES[t.hkl];
    const th = t.tt / 2;
    const path = 2 * d * Math.sin((th * Math.PI) / 180);
    return [
      ['Angle θ', `${r1(th)}°`],
      ['Plane spacing d', `${d} nm`],
      ['Extra path 2d sin θ', `${r3(path)} nm = ${r2(path / LAMBDA)} λ`],
      ['Brightness', `${Math.round(braggI(t.tt, d) * 100)}%`],
    ];
  },
  setup(kit) {
    const ys = [3.0, 1.9, 0.8];
    const s = ys[0] - ys[1];
    const hx = -4.2;
    for (const y of ys) {
      kit.line([[-7.6, y], [-0.8, y]], { color: C.grid, width: 1 });
      for (let x = -7.5; x <= -0.8; x += 0.45) kit.dot([x, y], { r: 0.09, color: C.gold });
    }
    kit.label('\\text{planes of atoms}', [-1.2, 0.35], { size: 12, color: C.gold, align: 'right' });
    const dim = kit.line([], { color: C.white, width: 1, create: false });
    kit.label('d', [-0.55, (ys[0] + ys[1]) / 2], { size: 14 });
    dim.set([[-0.75, ys[0]], [-0.75, ys[1]]]);
    const inc = ys.slice(0, 2).map(() => kit.line([], { color: C.blue, width: 2.5, create: false }));
    const out = ys.slice(0, 2).map(() => kit.line([], { color: C.blue, width: 2.5, create: false }));
    const extra = [kit.line([], { color: C.yellow, width: 4, create: false }), kit.line([], { color: C.yellow, width: 4, create: false })];
    const perp = [kit.line([], { color: C.white, width: 1, dashed: true, opacity: 0.5, create: false }), kit.line([], { color: C.white, width: 1, dashed: true, opacity: 0.5, create: false })];
    const thLab = kit.label('\\theta', [0, 0], { size: 14, color: C.blue });

    // waves panel
    const wy = [-1.0, -2.0, -3.5];
    kit.label('\\text{from plane 1}', [-7.6, wy[0] + 0.45], { size: 12, color: C.blue, align: 'left' });
    kit.label('\\text{from plane 2}', [-7.6, wy[1] + 0.45], { size: 12, color: C.teal, align: 'left' });
    kit.label('\\text{sum}', [-7.6, wy[2] + 0.75], { size: 12, color: C.yellow, align: 'left' });
    const w1 = kit.line([], { color: C.blue, width: 2, create: false });
    const w2 = kit.line([], { color: C.teal, width: 2, create: false });
    const ws = kit.line([], { color: C.yellow, width: 2.5, create: false });

    // brightness against 2θ
    const P = kit.plane({ x: [20, 110, 10], y: [0, 1, 0.25], sx: 6.4 / 90, sy: 6.2, origin: [0.9 - (20 * 6.4) / 90, -3.4], axisAt: [20, 0], xEvery: 20, yEvery: 0.5, xLabel: '2\\theta', yLabel: '\\text{brightness}' });
    const ghost = Object.entries(PLANES).map(([, d]) => kit.line(range(20, 110, 900).map((x) => P.toW(x, braggI(x, d))), { color: C.grey, width: 1.5, opacity: 0.25 }));
    void ghost;
    const crv = kit.line([], { color: C.pink, width: 3, create: false });
    const cur = kit.line([], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    let last = '';
    return (p, t, time) => {
      const d = PLANES[t.hkl];
      if (t.hkl !== last) {
        last = t.hkl;
        crv.set(range(20, 110, 900).map((x) => P.toW(x, braggI(x, d))));
      }
      const th = ((p.tt / 2) * Math.PI) / 180;
      const c = Math.cos(th);
      const sn = Math.sin(th);
      ys.slice(0, 2).forEach((y, i) => {
        const L = Math.min(3.2, (4.2 - y) / sn, 3.3 / c);
        inc[i].set([[hx - L * c, y + L * sn], [hx, y]]);
        out[i].set([[hx, y], [hx + L * c, y + L * sn]]);
      });
      const y2 = ys[1];
      const e = s * sn;
      const qin = [hx - e * c, y2 + e * sn];
      const qout = [hx + e * c, y2 + e * sn];
      extra[0].set([qin, [hx, y2]]);
      extra[1].set([[hx, y2], qout]);
      perp[0].set([[hx, ys[0]], qin]);
      perp[1].set([[hx, ys[0]], qout]);
      thLab.pos([hx - 1.3, ys[0] + 0.25]);
      // waves: phase shift from the extra path, in wavelengths
      const delta = (2 * d * Math.sin(th)) / LAMBDA;
      const xs = range(-7.6, -0.8, 160);
      const k = 2.6;
      const ph = (x) => k * x - time * 3;
      w1.set(xs.map((x) => [x, wy[0] + 0.32 * Math.sin(ph(x))]));
      w2.set(xs.map((x) => [x, wy[1] + 0.32 * Math.sin(ph(x) - 2 * Math.PI * delta)]));
      ws.set(xs.map((x) => [x, wy[2] + 0.32 * (Math.sin(ph(x)) + Math.sin(ph(x) - 2 * Math.PI * delta))]));
      const I = braggI(p.tt, d);
      dot.set(P.toW(p.tt, I));
      cur.set([P.toW(p.tt, 0), P.toW(p.tt, 1)]);
    };
  },
};

// ---------------------------------------------------------------------------
// Entropy: nickel atoms mixing among copper on 64 sites
// ---------------------------------------------------------------------------
const NS = 64;
const R = 8.314;
const smix = (x) => (x <= 0 || x >= 1 ? 0 : -R * (x * Math.log(x) + (1 - x) * Math.log(1 - x)));

export const entropy_mixing = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the mix with the most possible arrangements, and so the most entropy.',
  goal: (t) => t.n === 32,
  params: [{ key: 'n', label: 'Nickel atoms (out of 64)', min: 0, max: 64, step: 1, value: 0 }],
  beats: [
    { say: 'Pure copper: every site holds copper, so there is exactly one arrangement. W = 1 and S = k ln 1 = 0.', set: { n: 0 } },
    { say: 'One nickel atom can sit on any of the 64 sites: 64 arrangements. As atoms swap places, every one of them is equally likely.', set: { n: 1 } },
    { say: 'Half and half: about 1.8 × 10¹⁸ arrangements, the most possible. Almost all of them look "mixed", which is why a mix never un-mixes on its own.', set: { n: 32 } },
  ],
  readout: (t) => {
    const lw = lnChoose(NS, t.n);
    const x = t.n / NS;
    return [
      ['Nickel fraction x', r2(x)],
      ['Arrangements W', sci(lw / Math.LN10)],
      ['ln W', r1(lw)],
      ['S = k ln W', lw === 0 ? '0' : `${r2(lw * 1.38)} × 10⁻²³ J/K`],
      ['ΔS_mix per mole', `${r2(smix(x))} J/(mol·K)`],
    ];
  },
  setup(kit) {
    const cell = 0.7;
    const x0 = -7.3;
    const y0 = -2.45;
    const sites = [];
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) sites.push([x0 + c * cell, y0 + r * cell]);
    kit.rect(x0 - cell / 2, y0 - cell / 2, cell * 8, cell * 8, { color: C.white, opacity: 0.03, strokeColor: C.grid, width: 1 });
    const atoms = sites.map((q) => kit.dot(q, { r: 0.27, color: C.gold }));
    kit.label('\\text{copper}', [-6.6, 3.5], { size: 13, color: C.gold });
    kit.label('\\text{nickel}', [-4.4, 3.5], { size: 13, color: C.teal });
    kit.dot([-7.4, 3.5], { r: 0.15, color: C.gold });
    kit.dot([-5.2, 3.5], { r: 0.15, color: C.teal });
    const P = kit.plane({ x: [0, 1, 0.25], y: [0, 45, 10], sx: 6.0, sy: 0.15, origin: [1.2, -3.3], xLabel: 'x', yLabel: '\\ln W', xEvery: 0.25, yEvery: 10 });
    kit.line(range(0, NS, NS + 1).map((n) => P.toW(n / NS, lnChoose(NS, n))), { color: C.pink, width: 3 });
    kit.line(range(0, 1, 101).map((x) => P.toW(x, (NS * smix(x)) / R)), { color: C.grey, width: 1.5, dashed: true, opacity: 0.7 });
    kit.label('\\text{counted}', P.toW(0.5, 39.5), { size: 12, color: C.pink });
    kit.label('64 \\cdot \\Delta S_{\\text{mix}}/R', P.toW(0.86, 40), { size: 12, color: C.grey });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    let order = sites.map((_, i) => i);
    const rand = rng(7);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    let acc = 0;
    return (_p, t, _time, dt) => {
      const n = t.n;
      // the first n sites in `order` hold nickel; swap one nickel with one copper now and then
      acc += dt;
      if (acc > 0.18 && n > 0 && n < NS) {
        acc = 0;
        const a = Math.floor(rand() * n);
        const b = n + Math.floor(rand() * (NS - n));
        [order[a], order[b]] = [order[b], order[a]];
      }
      const ni = new Set(order.slice(0, n));
      atoms.forEach((d, i) => d.color(ni.has(i) ? C.teal : C.gold));
      dot.set(P.toW(n / NS, lnChoose(NS, n)));
    };
  },
};

// ---------------------------------------------------------------------------
// Defects: a 2D close-packed crystal with one chosen defect
// ---------------------------------------------------------------------------
const KB = 8.617e-5; // eV/K
const QV = 0.9; // eV, vacancy formation energy in copper
const vacFrac = (T) => Math.exp(-QV / (KB * T));
const DEFECTS = [
  ['perfect', 'perfect crystal'],
  ['vacancy', 'vacancy'],
  ['interstitial', 'interstitial'],
  ['big', 'bigger substitutional atom'],
  ['small', 'smaller substitutional atom'],
  ['boundary', 'grain boundary'],
];

export const defect_lattice = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Look at every kind of defect, then heat copper near its melting point (1358 K) to see how many sites are empty.',
  goal: (t, seen) => (seen.type?.size ?? 0) >= DEFECTS.length && t.T >= 1300,
  params: [
    { key: 'type', label: 'Defect', type: 'choice', value: 'perfect', options: DEFECTS.map(([value, label]) => ({ value, label })) },
    { key: 'T', label: 'Temperature (K)', min: 300, max: 1350, step: 10, value: 300 },
  ],
  beats: [
    { say: 'A vacancy: one site is empty, and its neighbours sag slightly inwards. At room temperature only about 1 site in 10¹⁵ is empty.', set: { type: 'vacancy', T: 300 } },
    { say: 'An interstitial: a small atom (like carbon in iron) squeezed between the rows pushes its neighbours apart. That strain is what makes steel hard.', set: { type: 'interstitial', T: 300 } },
    { say: 'A grain boundary: two crystals with different tilts meet. Near the melting point, the atoms shake hard and about 1 site in 2,000 is empty.', set: { type: 'boundary', T: 1350 } },
  ],
  readout: (t) => {
    const f = vacFrac(t.T);
    return [
      ['Defect', DEFECTS.find((d) => d[0] === t.type)[1]],
      ['Empty sites n_v/N', `about 1 in ${sci(-Math.log10(f))}`],
      ['Vacancies in 1 cm³ of copper', sci(Math.log10(8.5e22 * f))],
      ['Temperature', `${t.T} K (${t.T - 273} °C)`],
    ];
  },
  setup(kit) {
    const a = 0.62;
    const h = (a * Math.sqrt(3)) / 2;
    const cx = -3.6;
    const cy = 0;
    const base = [];
    for (let r = -6; r <= 6; r++) for (let c = -7; c <= 7; c++) base.push([cx + c * a + (r % 2 ? a / 2 : 0), cy + r * h]);
    const inBox = (q) => q[0] > -7.6 && q[0] < 0.4 && q[1] > -4.1 && q[1] < 4.1;
    // second grain, tilted 20° about the centre, used right of the boundary
    const tilt = (20 * Math.PI) / 180;
    const grain2 = [];
    for (let r = -10; r <= 10; r++)
      for (let c = -10; c <= 10; c++) {
        const u = c * a + (r % 2 ? a / 2 : 0);
        const v = r * h;
        grain2.push([cx + u * Math.cos(tilt) - v * Math.sin(tilt), cy + u * Math.sin(tilt) + v * Math.cos(tilt)]);
      }
    const MAX = 260;
    const pool = Array.from({ length: MAX }, () => kit.dot([0, 0], { r: 0.25, color: C.gold }));
    const special = kit.dot([cx, cy], { r: 0.25, color: C.teal, z: 6 });
    const ring = kit.line(circle(cx, cy, 0.3), { color: C.red, width: 2, dashed: true, create: false });
    const bline = kit.line([[cx + 0.15, -4.1], [cx + 0.15, 4.1]], { color: C.red, width: 1.5, dashed: true, opacity: 0.6, create: false });
    const jit = Array.from({ length: MAX }, (_, i) => [i * 1.7, i * 2.3]);

    const P = kit.plane({ x: [300, 1400, 100], y: [-16, -3, 1], sx: 6.0 / 1100, sy: 0.52, origin: [1.3 - (300 * 6.0) / 1100, -3.4 + 16 * 0.52], axisAt: [300, -16], xEvery: 300, yEvery: 2, fmt: (v, ax) => (ax === 'y' ? `10${sup(v).replace('-', '⁻')}` : `${v}`), xLabel: 'T\\,(\\text{K})', yLabel: 'n_v/N' });
    kit.line(range(300, 1400, 200).map((T) => P.toW(T, Math.log10(vacFrac(T)))), { color: C.pink, width: 3 });
    kit.line([P.toW(1358, -16), P.toW(1358, -3)], { color: C.red, width: 1.5, dashed: true, opacity: 0.6 });
    kit.label('\\text{melts}', P.toW(1358, -2.6), { size: 12, color: C.red });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    let atoms = [];
    let last = '';
    return (p, t, time) => {
      if (t.type !== last) {
        last = t.type;
        let pts = base.filter(inBox);
        if (t.type === 'boundary') {
          pts = pts.filter((q) => q[0] < cx - 0.05).concat(grain2.filter((q) => inBox(q) && q[0] > cx + 0.35));
        }
        // push or pull neighbours around the defect at the centre
        const push = { vacancy: -0.05, interstitial: 0.05, big: 0.06, small: -0.05 }[t.type] ?? 0;
        if (t.type === 'interstitial') {
          // centre the extra atom in a gap between three atoms
          special.set([cx + a / 2, cy + h / 3]);
        } else special.set([cx, cy]);
        const sp = t.type === 'interstitial' ? [cx + a / 2, cy + h / 3] : [cx, cy];
        atoms = pts
          .filter((q) => !((t.type === 'vacancy' || t.type === 'big' || t.type === 'small') && Math.hypot(q[0] - cx, q[1] - cy) < 0.05))
          .map((q) => {
            const dx = q[0] - sp[0];
            const dy = q[1] - sp[1];
            const r = Math.hypot(dx, dy) || 1;
            const u = (push * a * a) / (r * r);
            return [q[0] + (dx / r) * u * a, q[1] + (dy / r) * u * a];
          });
        special.visible(['interstitial', 'big', 'small'].includes(t.type));
        special.scale({ interstitial: 0.6, big: 1.25, small: 0.75 }[t.type] ?? 1);
        ring.visible(t.type === 'vacancy');
        bline.visible(t.type === 'boundary');
      }
      const amp = 0.05 * Math.sqrt(p.T / 300);
      pool.forEach((d, i) => {
        const q = atoms[i];
        if (!q) return d.visible(false);
        d.visible(true).set([q[0] + amp * Math.sin(time * 9 + jit[i][0]), q[1] + amp * Math.cos(time * 8 + jit[i][1])]);
        return d;
      });
      dot.set(P.toW(p.T, Math.log10(vacFrac(p.T))));
    };
  },
};

// ---------------------------------------------------------------------------
// Gibbs phase rule on water’s phase diagram
// ---------------------------------------------------------------------------
const PRESS = [0.1, 0.611, 1, 10, 101.3, 1000];
const pVap = (T) => 0.133322 * 10 ** (8.07131 - 1730.63 / (233.426 + T)); // kPa, liquid–vapour
const pSub = (T) => 0.61115 * Math.exp((22.452 * T) / (272.55 + T)); // kPa, ice–vapour
const near = (a, b) => Math.abs(Math.log(a / b)) < Math.log(1.05);
function phasesAt(T, P) {
  if (Math.abs(T - 0.01) < 0.3 && near(P, 0.611)) return ['ice', 'water', 'vapour'];
  if (Math.abs(T - 0.01) < 0.3 && P > 0.611) return ['ice', 'water'];
  if (T < 0.01) return near(P, pSub(T)) ? ['ice', 'vapour'] : P > pSub(T) ? ['ice'] : ['vapour'];
  return near(P, pVap(T)) ? ['water', 'vapour'] : P > pVap(T) ? ['water'] : ['vapour'];
}

export const phase_rule_water = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the one point where ice, water and vapour all live together, so F = 0.',
  goal: (t) => phasesAt(t.T, t.P).length === 3,
  params: [
    { key: 'T', label: 'Temperature (°C)', min: -40, max: 200, step: 0.5, value: 25 },
    { key: 'P', label: 'Pressure (kPa)', type: 'choice', value: 101.3, options: PRESS.map((v) => ({ value: v, label: v === 101.3 ? '101.3 (sea level)' : v === 0.611 ? '0.611 (triple point)' : `${v}` })) },
  ],
  beats: [
    { say: 'Liquid water at 25 °C and 1 atm. One phase: you can change the temperature and the pressure a little and it stays liquid. F = 1 − 1 + 2 = 2.', set: { T: 25, P: 101.3 } },
    { say: 'At 100 °C the dot sits on the boiling line: water and vapour together. Now F = 1. At this pressure, boiling can only happen at this temperature.', set: { T: 100, P: 101.3 } },
    { say: 'At 0.611 kPa and 0.01 °C, the triple point: ice, water and vapour all at once. F = 0: nothing can change without losing a phase.', set: { T: 0, P: 0.611 } },
  ],
  readout: (t) => {
    const ph = phasesAt(t.T, t.P);
    const F = 1 - ph.length + 2;
    return [
      ['Phases present', ph.join(' + ')],
      ['Components C', '1 (water)'],
      ['Phases P', `${ph.length}`],
      ['F = C − P + 2', `${F}`],
      ['Meaning', ['nothing is free: one exact point', 'one free: a line', 'two free: an area'][F]],
    ];
  },
  setup(kit) {
    // left: a sealed container showing what is inside
    const bx = -7.4;
    const bw = 4.2;
    kit.rect(bx, -3.4, bw, 6.4, { color: C.white, opacity: 0.03, strokeColor: C.axis, width: 2 });
    const water = kit.rect(bx + 0.05, -3.35, bw - 0.1, 2.5, { color: C.blue, opacity: 0.5, stroke: false });
    const ice = [kit.rect(0, 0, 1.1, 0.8, { color: C.white, opacity: 0.85, strokeColor: C.teal, width: 1.5 }), kit.rect(0, 0, 0.9, 0.7, { color: C.white, opacity: 0.85, strokeColor: C.teal, width: 1.5 })];
    const iceBlock = kit.rect(bx + 0.05, -3.35, bw - 0.1, 2.5, { color: C.white, opacity: 0.8, strokeColor: C.teal, width: 1.5 });
    const rv = rng(3);
    const vap = Array.from({ length: 26 }, () => ({ d: kit.dot([0, 0], { r: 0.06, color: C.teal }), x: rv(), y: rv(), vx: rv() - 0.5, vy: rv() - 0.5 }));
    const Flab = kit.label('', [bx + bw / 2, 3.55], { size: 22, color: C.yellow });

    // right: the phase diagram, log pressure
    const lg = (P) => Math.log10(P);
    const Pl = kit.plane({ x: [-40, 200, 20], y: [-1.3, 3.3, 1], sx: 6.4 / 240, sy: 6.6 / 4.6, origin: [-1.6 + (40 * 6.4) / 240 + 2.6, -3.4 + (1.3 * 6.6) / 4.6], axisAt: [-40, -1.3], xEvery: 40, numbers: false, xLabel: 'T\\,(°\\text{C})', yLabel: 'P\\,(\\text{kPa})' });
    for (let T = -40; T <= 200; T += 40) kit.label(`${T}`.replace('-', '−'), [Pl.toW(T, -1.3)[0], Pl.toW(T, -1.3)[1] - 0.25], { size: 11, color: '#8b949e', tex: false });
    for (let e = -1; e <= 3; e++) kit.label(['0.1', '1', '10', '100', '1000'][e + 1], [Pl.toW(-40, e)[0] - 0.15, Pl.toW(-40, e)[1]], { size: 11, color: '#8b949e', tex: false, align: 'right' });
    const toW = (T, P) => Pl.toW(T, lg(P));
    const sub = range(-27, 0.01, 80).map((T) => toW(T, pSub(T)));
    const vapL = range(0.01, 200, 160).map((T) => toW(T, pVap(T)));
    const melt = [toW(0.01, 0.611), toW(-0.07, 10 ** 3.3)];
    kit.fill([toW(-40, 10 ** 3.3), ...melt.slice().reverse(), ...sub.slice().reverse(), toW(-40, 10 ** -1.3)], { color: C.white, opacity: 0.08 });
    kit.fill([...melt, toW(200, 10 ** 3.3), ...vapL.slice().reverse()].reverse(), { color: C.blue, opacity: 0.12 });
    kit.line(sub, { color: C.teal, width: 2.5 });
    kit.line(vapL, { color: C.blue, width: 2.5 });
    kit.line(melt, { color: C.white, width: 2.5 });
    kit.label('\\text{ice}', toW(-25, 100), { size: 15, color: C.white });
    kit.label('\\text{water}', toW(60, 200), { size: 15, color: C.blue });
    kit.label('\\text{vapour}', toW(120, 1), { size: 15, color: C.teal });
    kit.dot(toW(0.01, 0.611), { r: 0.08, color: C.red });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.yellow, z: 7 });
    return (p, t, _time, dt) => {
      const ph = phasesAt(t.T, t.P);
      Flab.set(`F = ${3 - ph.length}`);
      const hasW = ph.includes('water');
      const hasI = ph.includes('ice');
      const hasV = ph.includes('vapour');
      const onlyI = hasI && !hasW;
      water.visible(hasW);
      iceBlock.visible(onlyI);
      ice[0].visible(hasI && hasW).set(bx + 0.6, -1.25, 1.1, 0.8);
      ice[1].visible(hasI && hasW).set(bx + 2.3, -1.15, 0.9, 0.7);
      const top = hasW || onlyI ? -0.85 : -3.35;
      vap.forEach((v) => {
        v.x += v.vx * dt * 0.6;
        v.y += v.vy * dt * 0.6;
        if (v.x < 0 || v.x > 1) v.vx *= -1;
        if (v.y < 0 || v.y > 1) v.vy *= -1;
        v.x = clamp(v.x, 0, 1);
        v.y = clamp(v.y, 0, 1);
        v.d.visible(hasV).set([bx + 0.15 + v.x * (bw - 0.3), top + 0.15 + v.y * (2.9 - top - 0.3)]);
      });
      dot.set(toW(p.T, t.P));
    };
  },
};

// ---------------------------------------------------------------------------
// Band theory: levels split into bands as atoms join
// ---------------------------------------------------------------------------
const MATS = {
  metal: { name: 'sodium (metal)', gap: null },
  si: { name: 'silicon (semiconductor)', gap: 1.12 },
  diamond: { name: 'diamond (insulator)', gap: 5.5 },
};
function freeElectrons(mat, T) {
  const g = MATS[mat].gap;
  if (g == null) return 2.5e22;
  if (T <= 0) return 0;
  return 2.5e19 * (T / 300) ** 1.5 * Math.exp(-g / (2 * KB * T));
}

export const band_formation = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Build a full silicon crystal (30 or more atoms) and warm it until plenty of electrons reach the empty band.',
  goal: (t) => t.N >= 30 && t.mat === 'si' && freeElectrons('si', t.T) >= 1e12,
  params: [
    { key: 'N', label: 'Atoms joined together', min: 1, max: 40, step: 1, value: 1 },
    { key: 'mat', label: 'Material', type: 'choice', value: 'si', options: Object.entries(MATS).map(([value, m]) => ({ value, label: m.name })) },
    { key: 'T', label: 'Temperature (K)', min: 0, max: 1500, step: 10, value: 300 },
  ],
  beats: [
    { say: 'One silicon atom has sharp energy levels: a filled one (yellow) and an empty one above it (grey), far apart.', set: { N: 1, mat: 'si', T: 300 } },
    { say: 'Join 40 atoms and each level splits into 40, packed into a band. The gap between the filled band and the empty band shrinks to 1.12 eV.', set: { N: 40, mat: 'si', T: 300 } },
    { say: 'In a metal the band is only half full, so there are empty levels just above the electrons: they move at the slightest push, and the metal conducts.', set: { N: 40, mat: 'metal', T: 300 } },
  ],
  readout: (t) => {
    const m = MATS[t.mat];
    const n = freeElectrons(t.mat, t.T);
    return [
      ['Material', m.name],
      ['Levels in each band', `${t.N}`],
      ['Band gap (full crystal)', m.gap == null ? 'none: band half full' : `${m.gap} eV`],
      ['Free electrons per cm³', n < 1 ? 'practically none' : sci(Math.log10(n))],
    ];
  },
  setup(kit) {
    // left: the row of atoms
    const ax = [-7.6, -3.4];
    const atoms = Array.from({ length: 40 }, () => kit.dot([0, 0], { r: 0.1, color: C.gold }));
    kit.label('\\text{atoms}', [(ax[0] + ax[1]) / 2, 3.9], { size: 13, color: C.gold });
    // right: the energy levels (0.72 world units per eV)
    const S = 0.72;
    const vTop = -1.3;
    const lx = [-1.6, 3.6];
    kit.line([[-2.2, -4.2], [-2.2, 4.2]], { color: C.axis, width: 2 });
    kit.label('E', [-2.45, 4.1], { size: 15 });
    const MAXL = 80;
    const lines = Array.from({ length: MAXL }, () => kit.line([], { color: C.grey, width: 2, create: false }));
    const gapArrow = kit.arrow([0, 0], [0, 1], { color: C.red });
    const gapLab = kit.label('', [0, 0], { size: 14, color: C.red, align: 'left' });
    const vb = kit.label('\\text{filled band}', [4.0, 0], { size: 12, color: C.yellow, align: 'left' });
    const cb = kit.label('\\text{empty band}', [4.0, 0], { size: 12, color: C.grey, align: 'left' });
    const elec = Array.from({ length: 14 }, () => kit.dot([0, 0], { r: 0.1, color: C.yellow, z: 6 }));
    const holes = Array.from({ length: 14 }, () => kit.dot([0, 0], { r: 0.09, color: C.bg, z: 6 }));
    const holeRing = holes.map(() => kit.line([], { color: C.yellow, width: 1.5, create: false }));
    const rr = rng(11);
    const jx = Array.from({ length: 14 }, () => rr());
    return (p, t, time) => {
      const N = Math.round(p.N);
      atoms.forEach((d, i) => {
        if (i >= N) return d.visible(false);
        const span = Math.min(ax[1] - ax[0], (N - 1) * 0.2);
        const x = (ax[0] + ax[1]) / 2 - span / 2 + (N > 1 ? (i * span) / (N - 1) : 0);
        return d.visible(true).set([x, 1.2]);
      });
      const m = MATS[t.mat];
      const lev = (center, hw, k) => center - hw * Math.cos((k * Math.PI) / (N + 1));
      let used = 0;
      const draw = (y, filled) => {
        if (used >= MAXL) return;
        lines[used].visible(true).set([[lx[0], y], [lx[1], y]]).color(filled ? C.yellow : C.grey);
        used += 1;
      };
      let cbBottom;
      let vbTop;
      if (m.gap == null) {
        const hw = 2.5 * S;
        const c = -0.5;
        for (let k = 1; k <= N; k++) draw(lev(c, hw, k), k <= N / 2);
        vb.pos([4.0, c - hw * 0.6]).set('\\text{filled half}');
        cb.pos([4.0, c + hw * 0.6]).set('\\text{empty half}');
        vbTop = cbBottom = null;
      } else {
        const hv = 1.6 * S;
        const hc = 1.2 * S;
        const vc = vTop * 1 - hv - (m.gap > 3 ? 0.8 : 0);
        const cc = vc + hv + m.gap * S + hc;
        for (let k = 1; k <= N; k++) draw(lev(vc, hv, k), true);
        for (let k = 1; k <= N; k++) draw(lev(cc, hc, k), false);
        vbTop = lev(vc, hv, N);
        cbBottom = lev(cc, hc, 1);
        vb.pos([4.0, vc]).set('\\text{filled band}');
        cb.pos([4.0, cc]).set('\\text{empty band}');
      }
      for (let i = used; i < MAXL; i++) lines[i].visible(false);
      const showGap = vbTop != null;
      gapArrow.visible(showGap);
      gapLab.visible(showGap);
      if (showGap) {
        gapArrow.set([3.0, vbTop], [3.0, cbBottom]);
        gapLab.pos([3.15, (vbTop + cbBottom) / 2]).set(`${r2((cbBottom - vbTop) / S)}\\,\\text{eV}`);
      }
      // electrons lifted across the gap (each dot is ten times more electrons than the one before)
      const n = freeElectrons(t.mat, t.T);
      const cnt = m.gap == null ? 0 : clamp(Math.round(Math.log10(Math.max(n, 1)) - 5), 0, 14);
      elec.forEach((d, i) => {
        const on = i < cnt && showGap;
        d.visible(on);
        holes[i].visible(on);
        holeRing[i].visible(on);
        if (!on) return;
        const x = lx[0] + 0.2 + ((jx[i] + time * 0.05 * (i % 2 ? 1 : -1) + 10) % 1) * (lx[1] - lx[0] - 0.4);
        d.set([x, cbBottom + 0.08]);
        holes[i].set([x, vbTop - 0.08]);
        holeRing[i].set(circle(x, vbTop - 0.08, 0.09, 16));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Nucleation: clusters in undercooled liquid copper
// ---------------------------------------------------------------------------
const GAMMA = 0.177; // aJ/nm², solid–liquid surface energy of copper
const DHF = 1.88; // aJ/nm³, heat of fusion per volume
const TM = 1358; // K
const dGv = (dT) => (DHF * dT) / TM;
const rStar = (dT) => (2 * GAMMA) / dGv(dT);
const dGstar = (dT) => (16 * Math.PI * GAMMA ** 3) / (3 * dGv(dT) ** 2);
const dGr = (r, dT) => 4 * Math.PI * r * r * GAMMA - (4 / 3) * Math.PI * r ** 3 * dGv(dT);

export const nucleation_barrier = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Cool the copper as far below its melting point as Turnbull’s droplets went (about 236 K) and watch grains appear.',
  goal: (t) => t.dT >= 235,
  params: [{ key: 'dT', label: 'Undercooling ΔT (K below 1085 °C)', min: 20, max: 300, step: 5, value: 40 }],
  beats: [
    { say: 'Just 40 K below the melting point. Small clusters keep forming, but the critical radius is large (6.4 nm): every cluster melts away again.', set: { dT: 40 } },
    { say: 'At 150 K undercooling, r* is down to 1.7 nm. Now and then a cluster grows past the top of the barrier and keeps growing into a grain.', set: { dT: 150 } },
    { say: 'At 300 K below, r* is under 1 nm and the barrier is tiny. Grains appear everywhere: many small grains, which is a finer, stronger metal.', set: { dT: 300 } },
  ],
  readout: (t) => {
    const rs = rStar(t.dT);
    const kT = 1.381e-5 * (TM - t.dT); // aJ
    return [
      ['Liquid temperature', `${1085 - t.dT} °C`],
      ['Critical radius r*', `${r2(rs)} nm`],
      ['Atoms in a critical nucleus', `about ${Math.round(((4 / 3) * Math.PI * rs ** 3) / 0.0118).toLocaleString('en-US')}`],
      ['Barrier ΔG*', `${r2(dGstar(t.dT))} aJ = ${Math.round(dGstar(t.dT) / kT)} kT`],
    ];
  },
  setup(kit) {
    // left: liquid, 0.32 world units per nm
    const box = [-7.6, -1.4, -4.0, 3.6];
    const SC = 0.32;
    kit.rect(box[0], box[2], box[1] - box[0], box[3] - box[2], { color: C.red, opacity: 0.12, strokeColor: C.axis, width: 1.5 });
    kit.label('\\text{liquid copper}', [(box[0] + box[1]) / 2, 3.95], { size: 13, color: C.red });
    const MAXC = 24;
    const rand = rng(5);
    const cl = Array.from({ length: MAXC }, () => ({ f: kit.fill(circle(0, 0, 0.1), { color: C.gold, opacity: 0.8 }), r: 0, x: 0, y: 0, grain: false, alive: false }));
    const spawn = (c) => {
      c.alive = true;
      c.grain = false;
      c.r = 0.3 - 0.8 * Math.log(1 - rand() * 0.999);
      c.x = box[0] + 0.5 + rand() * (box[1] - box[0] - 1);
      c.y = box[2] + 0.5 + rand() * (box[3] - box[2] - 1);
    };
    // right: ΔG(r)
    const P = kit.plane({ x: [0, 6, 1], y: [-8, 8, 2], sx: 1.0, sy: 0.42, origin: [1.2, 0], xLabel: 'r\\,(\\text{nm})', yLabel: '\\Delta G\\,(\\text{aJ})', yEvery: 4 });
    const surf = kit.line([], { color: C.red, width: 1.5, dashed: true, create: false });
    const vol = kit.line([], { color: C.blue, width: 1.5, dashed: true, create: false });
    const tot = kit.line([], { color: C.yellow, width: 3, create: false });
    const rsl = kit.line([], { color: C.green, width: 1.5, dashed: true, create: false });
    const rsLab = kit.label('r^*', [0, 0], { size: 14, color: C.green });
    kit.label('\\text{surface cost}', P.toW(4.2, 7.2), { size: 12, color: C.red });
    kit.label('\\text{volume saving}', P.toW(4.4, -6.5), { size: 12, color: C.blue });
    let lastDT = null;
    let clock = 0;
    return (p, t, _time, dt) => {
      const dT = p.dT;
      const rs = rStar(dT);
      const xs = range(0, 6, 160);
      const clip = (y) => clamp(y, -8, 8);
      // keep only the part of each curve inside the chart
      const inside = (f) => xs.map((r) => [r, f(r)]).filter(([, y]) => Math.abs(y) <= 8).map(([r, y]) => P.toW(r, y));
      surf.set(inside((r) => 4 * Math.PI * r * r * GAMMA));
      vol.set(inside((r) => -(4 / 3) * Math.PI * r ** 3 * dGv(dT)));
      tot.set(inside((r) => dGr(r, dT)));
      const show = rs <= 6;
      rsl.visible(show);
      rsLab.visible(show);
      if (show) {
        rsl.set([P.toW(rs, 0), P.toW(rs, clip(dGr(rs, dT)))]);
        rsLab.pos(P.toW(rs, clip(dGr(rs, dT)) + 0.9));
      }
      // clusters: start again when the undercooling changes
      if (lastDT !== t.dT) {
        lastDT = t.dT;
        cl.forEach((c) => {
          c.alive = false;
          c.f.visible(false);
        });
      }
      clock += dt;
      if (clock > 0.08) {
        clock = 0;
        const free = cl.find((c) => !c.alive);
        if (free) spawn(free);
      }
      cl.forEach((c) => {
        if (!c.alive) return;
        if (c.grain || c.r > rs) {
          c.grain = true;
          c.r = Math.min(c.r + dt * 1.6, 3.5, (Math.min(c.x - box[0], box[1] - c.x, c.y - box[2], box[3] - c.y) - 0.05) / SC);
        } else c.r -= dt * 1.2;
        if (c.r <= 0.05) {
          c.alive = false;
          c.f.visible(false);
          return;
        }
        const rw = c.r * SC;
        c.f.visible(true).set(circle(c.x, c.y, rw)).color(c.grain ? C.gold : C.yellow).opacity(c.grain ? 0.85 : 0.5);
      });
      // when the box is full of grains, melt them and start over
      if (cl.every((c) => c.alive && c.grain)) cl.forEach((c) => (c.alive = false));
    };
  },
};

// ---------------------------------------------------------------------------
// Spreadsheet: a tensile test turned into Young’s modulus
// ---------------------------------------------------------------------------
const AREA = 20; // mm²
const GAUGE = 50; // mm
const STRAINS = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.6, 0.8, 1.0, 1.2]; // %
const NOISE = [1.2, -0.8, 0.9, -1.1, 0.6, -0.4, 1.0, -1.3, 0.7, -0.9, 1.1, -0.6];
const STRESS = STRAINS.map((e, i) => (e <= 0.35 ? 70000 * (e / 100) : 245 + 55 * (1 - Math.exp(-(e - 0.35) / 0.3))) + NOISE[i]);
const LOADS = STRESS.map((s) => Math.round(s * AREA));
const EXT = STRAINS.map((e) => (e / 100) * GAUGE);
function fitFirst(n) {
  const xs = EXT.slice(0, n).map((x) => x / GAUGE);
  const ys = LOADS.slice(0, n).map((f) => f / AREA);
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  xs.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my);
    sxx += (x - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  });
  const m = sxy / sxx;
  return { m, b: my - m * mx, r2: (sxy * sxy) / (sxx * syy) };
}

export const spreadsheet_fit = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Choose the points for the trendline so the stiffness matches the handbook value for aluminium (about 70 GPa) with R² near 1.',
  goal: (t) => t.n >= 5 && t.n <= 7,
  params: [{ key: 'n', label: 'Rows included in the trendline', min: 3, max: 12, step: 1, value: 12 }],
  beats: [
    { say: 'Columns A and B are the machine’s readings. Columns C and D are formulas: stress = load ÷ 20 mm², strain = extension ÷ 50 mm.', set: { n: 12 } },
    { say: 'A trendline through all 12 rows includes points past yielding. The slope drops to about a third of the real value and R² falls.', set: { n: 12 } },
    { say: 'Only the first 7 rows lie on the straight elastic part. Their slope gives E ≈ 70 GPa with R² ≈ 0.999: the right answer.', set: { n: 7 } },
  ],
  readout: (t) => {
    const f = fitFirst(t.n);
    const E = f.m / 1000;
    return [
      ['Rows in the fit', `2 to ${t.n + 1}`],
      ['Slope = E', `${r1(E)} GPa`],
      ['R²', f.r2.toFixed(4)],
      ['Handbook value', '≈ 70 GPa'],
      ['Error', `${Math.round(Math.abs(E - 70) / 0.7)}%`],
    ];
  },
  setup(kit) {
    // left: the spreadsheet
    const cols = [
      ['A', 'Load (N)', (i) => `${LOADS[i]}`],
      ['B', 'Ext. (mm)', (i) => EXT[i].toFixed(3)],
      ['C', 'Stress (MPa)', (i) => (LOADS[i] / AREA).toFixed(1)],
      ['D', 'Strain', (i) => (EXT[i] / GAUGE).toFixed(4)],
    ];
    const x0 = -7.7;
    const rowNo = 0.45;
    const cw = 1.55;
    const rh = 0.52;
    const top = 3.9;
    const hl = Array.from({ length: 12 }, (_, i) => kit.rect(x0 + rowNo, top - rh * (i + 3), cw * 4, rh, { color: C.green, opacity: 0.0, stroke: false }));
    for (let c = 0; c <= 4; c++) kit.line([[x0 + rowNo + c * cw, top], [x0 + rowNo + c * cw, top - rh * 14]], { color: C.grid, width: 1 });
    for (let r = 0; r <= 14; r++) kit.line([[x0, top - r * rh], [x0 + rowNo + cw * 4, top - r * rh]], { color: C.grid, width: 1 });
    cols.forEach(([L, head, fn], c) => {
      const cx = x0 + rowNo + c * cw + cw / 2;
      kit.label(L, [cx, top - rh / 2], { size: 12, color: '#8b949e', tex: false });
      kit.label(head, [cx, top - rh * 1.5], { size: 11, color: c < 2 ? C.blue : C.pink, tex: false });
      for (let i = 0; i < 12; i++) kit.label(fn(i), [cx, top - rh * (i + 2.5)], { size: 11, color: c < 2 ? '#c9d1d9' : C.pink, tex: false });
    });
    for (let r = 1; r <= 13; r++) kit.label(`${r}`, [x0 + rowNo / 2, top - rh * (r + 0.5)], { size: 10, color: '#8b949e', tex: false });
    kit.label('\\text{C3: } {=}\\text{A3}/20 \\quad \\text{D3: } {=}\\text{B3}/50', [x0 + rowNo + 2 * cw, top - rh * 14.6], { size: 12, color: C.pink });

    // right: the chart
    const P = kit.plane({ x: [0, 1.2, 0.2], y: [0, 320, 50], sx: 5.0, sy: 6.6 / 320, origin: [1.6, -3.4], xLabel: '\\text{strain}\\,(\\%)', yLabel: '\\sigma\\,(\\text{MPa})', xEvery: 0.4, yEvery: 100 });
    const pts = STRAINS.map((e, i) => kit.dot(P.toW(e, STRESS[i]), { r: 0.1, color: C.pink }));
    const fit = kit.line([], { color: C.green, width: 2.5, create: false });
    const eq = kit.label('', P.toW(0.55, 60), { size: 13, color: C.green, align: 'left' });
    kit.line([P.toW(0, 0), P.toW(0.43, 300)], { color: C.grey, width: 1, dashed: true, opacity: 0.5 });
    kit.label('70\\,\\text{GPa}', P.toW(0.43, 312), { size: 11, color: C.grey });
    return (p, t) => {
      const n = t.n;
      const f = fitFirst(n);
      hl.forEach((h, i) => h.opacity(i < n ? 0.14 : 0));
      pts.forEach((d, i) => d.color(i < n ? C.green : C.pink));
      const xe = Math.min(1.2, (310 - f.b) / (f.m / 100));
      fit.set([P.toW(0, f.b), P.toW(xe, f.b + (f.m / 100) * xe)]);
      eq.set(`E = ${r1(f.m / 1000)}\\,\\text{GPa} \\quad R^2 = ${f.r2.toFixed(4)}`);
      void p;
    };
  },
};
