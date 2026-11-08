import { C } from '../theme';
import { clamp, range, smooth } from '../kit';
import { rng } from './chemistry';

const n2 = (v) => Math.round(v * 100) / 100;
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const pow10 = (v) => `10${String(Math.round(v)).split('').map((ch) => SUP[ch] ?? ch).join('')}`;

function erf(x) {
  const s = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}

// ---------------------------------------------------------------------------
// Tensile test: curve + stretching, necking specimen
// ---------------------------------------------------------------------------
const MATS = {
  steel: { name: 'Mild steel', E: 200, sy: 250, uts: 420, eu: 0.2, ef: 0.32 },
  al: { name: 'Aluminium 6061-T6', E: 69, sy: 275, uts: 310, eu: 0.08, ef: 0.14 },
  cu: { name: 'Annealed copper', E: 117, sy: 70, uts: 220, eu: 0.35, ef: 0.48 },
  glass: { name: 'Glass', E: 70, sy: 50, uts: 50, eu: 0.02, ef: 0.02 },
};
const EY = 0.02; // elastic strain on screen (real value is ~0.001, stretched to be visible)

function stressAt(m, e) {
  if (e <= EY) return (m.sy * e) / EY;
  if (m.uts === m.sy) return null;
  if (e <= m.eu) {
    const u = (e - EY) / (m.eu - EY);
    return m.sy + (m.uts - m.sy) * (1 - (1 - u) ** 2);
  }
  if (e <= m.ef) {
    const u = (e - m.eu) / (m.ef - m.eu);
    return m.uts - (m.uts - m.sy * 0.9) * 0.55 * u * u;
  }
  return null;
}

export const stress_strain_curve_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    {
      key: 'mat',
      label: 'Material',
      type: 'choice',
      value: 'steel',
      options: Object.entries(MATS).map(([value, m]) => ({ value, label: m.name })),
    },
    { key: 'pull', label: 'Pull (how far through the test)', min: 0, max: 1, step: 0.01, value: 0.05 },
  ],
  beats: [
    { say: 'Hooke’s law: at first stress rises in a straight line, σ = Eε. Let go and the bar springs back.', set: { mat: 'steel', pull: 0.06 } },
    { say: 'Past the yield point, atoms slip permanently (dislocations move). The metal also gets stronger as it stretches: work hardening.', set: { mat: 'steel', pull: 0.55 } },
    { say: 'After the peak (UTS) the bar necks down in one spot and breaks. Glass, by contrast, snaps while still elastic.', set: { mat: 'steel', pull: 1 } },
  ],
  readout: (t) => {
    const m = MATS[t.mat];
    const e = t.pull * m.ef * 1.05;
    const s = stressAt(m, e);
    const stage = s === null ? 'Fractured' : e <= EY ? 'Elastic (springs back)' : e <= m.eu ? 'Plastic (permanent stretch)' : 'Necking';
    return [
      ['Stage', stage],
      ['Stress σ', s === null ? '—' : `${Math.round(s)} MPa`],
      ['Young’s modulus E', `${m.E} GPa`],
      ['Yield / UTS', `${m.sy} / ${m.uts} MPa`],
      ['Note', 'elastic part is stretched ≈20× so you can see it'],
    ];
  },
  setup(kit) {
    const sx = 8 / 0.5;
    const sy = 7 / 450;
    const P = kit.plane({ x: [0, 0.5, 0.05], y: [0, 450, 50], sx, sy, origin: [-7.2, -3.6], xEvery: 0.1, yEvery: 100, xLabel: '\\varepsilon', yLabel: '\\sigma\\,(\\text{MPa})' });
    const full = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 2, opacity: 0.35 });
    const done = kit.line([[0, 0], [1, 1]], { color: C.yellow, width: 4, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    const yieldL = kit.label('yield', [0, 0], { tex: false, cls: 'tick', align: 'right' });
    const utsL = kit.label('UTS', [0, 0], { tex: false, cls: 'tick', align: 'above' });
    const specA = kit.fill([[0, 0], [1, 0], [1, 1]], { color: 0x9aa4ad, opacity: 0.85 });
    const specB = kit.fill([[0, 0], [1, 0], [1, 1]], { color: 0x9aa4ad, opacity: 0.85 });
    const grips = [0, 1].map(() => kit.rect(0, 0, 1.6, 0.6, { color: 0x555f69, opacity: 1, stroke: false }));
    const arrows = [0, 1].map(() => kit.arrow([0, 0], [0, 0], { color: C.red, width: 3 }));

    return (p, t) => {
      const m = MATS[t.mat];
      const pts = [];
      for (const e of range(0, m.ef, 200)) {
        const s = stressAt(m, e);
        if (s !== null) pts.push(P.toW(e, s));
      }
      full.set(pts);
      const e = p.pull * m.ef * 1.05;
      const broken = e > m.ef;
      const sofar = pts.filter((_, i) => (i / 199) * m.ef <= Math.min(e, m.ef));
      done.set(sofar.length > 1 ? sofar : [pts[0], pts[0]]);
      const s = stressAt(m, Math.min(e, m.ef)) ?? 0;
      dot.set(P.toW(Math.min(e, m.ef), broken ? 0 : s));
      yieldL.pos([...P.toW(EY, m.sy)].map((v, i) => (i ? v : v - 0.1)));
      utsL.pos(P.toW(m.eu, m.uts + 15)).visible(m.uts > m.sy);

      // Specimen: gauge stretches, then necks, then splits.
      const cx = 5.2;
      const L0 = 4;
      const L = L0 * (1 + Math.min(e, m.ef) * 1.6);
      const w0 = 0.9;
      const w = w0 / Math.sqrt(1 + Math.min(e, m.ef) * 1.6);
      const neck = e > m.eu && m.ef > m.eu ? smooth((Math.min(e, m.ef) - m.eu) / (m.ef - m.eu)) : 0;
      const gap = broken ? 0.35 : 0;
      const profile = (sign) => {
        const out = [];
        for (const u of range(0, 1, 40)) {
          const y = sign * (u * L) / 2;
          const g = Math.exp(-((u - 0) ** 2) / 0.02);
          const half = (w / 2) * (1 - 0.55 * neck * g);
          out.push([half, y]);
        }
        return out;
      };
      const half = (sign) => {
        const side = profile(sign).map(([hw, y]) => [cx + hw, y + sign * gap]);
        const other = profile(sign).map(([hw, y]) => [cx - hw, y + sign * gap]).reverse();
        return [...side, ...other];
      };
      specA.set(half(1));
      specB.set(half(-1));
      grips[0].set(cx - 0.8, L / 2 + gap, 1.6, 0.6);
      grips[1].set(cx - 0.8, -L / 2 - gap - 0.6, 1.6, 0.6);
      const f = broken ? 0 : clamp(s / 450, 0, 1) * 1.2;
      arrows[0].set([cx, L / 2 + gap + 0.7], [cx, L / 2 + gap + 0.7 + f]).visible(f > 0.05);
      arrows[1].set([cx, -L / 2 - gap - 0.7], [cx, -L / 2 - gap - 0.7 - f]).visible(f > 0.05);
    };
  },
};

// ---------------------------------------------------------------------------
// Fick's 2nd law: carburising steel
// ---------------------------------------------------------------------------
export const diffusion_dislocation_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    { key: 'hours', label: 'Time in the furnace (hours)', min: 0, max: 40, step: 0.5, value: 2 },
    { key: 'T', label: 'Furnace temperature (°C)', min: 850, max: 1150, step: 10, value: 950 },
  ],
  beats: [
    { say: 'Carbon gas sits on the steel’s surface. Atoms jump randomly between iron atoms; more jump inward than outward.', set: { hours: 1, T: 950 } },
    { say: 'Depth grows like √(Dt): 4× the time only doubles the case depth.', set: { hours: 4, T: 950 } },
    { say: 'Temperature is the real lever. D rises exponentially (Arrhenius), so +150 °C does more than hours of waiting.', set: { hours: 4, T: 1100 } },
  ],
  readout: (t) => {
    const D = 2.3e-5 * Math.exp(-148000 / (8.314 * (t.T + 273)));
    const L = 2 * Math.sqrt(D * t.hours * 3600) * 1000;
    return [
      ['Diffusivity D', `${D.toExponential(2)} m²/s`],
      ['Diffusion length 2√(Dt)', `${n2(L)} mm`],
      ['Profile', 'C(x,t) = Cs − (Cs − C₀)·erf(x / 2√(Dt))'],
    ];
  },
  setup(kit) {
    const sx = 12 / 3;
    const P = kit.plane({ x: [0, 3, 0.25], y: [0, 1.2, 0.2], sx, sy: 2.7, origin: [-6, 0.9], xEvery: 0.5, yEvery: 0.4, xLabel: 'x\\,(\\text{mm})', yLabel: 'C\\,(\\text{wt\\% C})' });
    const prof = kit.curve(() => 0.2, [0, 3], { plane: P, color: C.yellow, width: 4 });
    const depth = kit.line([[0, 0], [0, 0]], { color: C.green, width: 2, dashed: true, create: false });
    kit.rect(-6, -4.1, 12, 3.6, { color: 0x3a4652, opacity: 0.5, strokeColor: 0x6b7885 });
    kit.rect(-7.6, -4.1, 1.6, 3.6, { color: C.gold, opacity: 0.15, stroke: false });
    kit.label('CO gas', [-6.8, -0.8], { tex: false, cls: 'tick' });
    kit.label('steel', [5.4, -0.8], { tex: false, cls: 'tick' });
    const rand = rng(11);
    // Inverse CDF of erfc depth distribution, so particles match the curve.
    const F = (z) => Math.sqrt(Math.PI) * z * (1 - erf(z)) + 1 - Math.exp(-z * z);
    const inv = (u) => {
      let lo = 0;
      let hi = 6;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        if (F(mid) < u) lo = mid;
        else hi = mid;
      }
      return (lo + hi) / 2;
    };
    const parts = Array.from({ length: 140 }, () => ({ z: inv(rand() * 0.995), y: rand(), ph: rand() * 6.28, d: kit.dot([0, 0], { r: 0.07, color: C.yellow, z: 6 }) }));
    const bg = Array.from({ length: 40 }, () => ({ x: rand(), y: rand(), d: kit.dot([0, 0], { r: 0.06, color: 0xbbbbbb, z: 5 }) }));
    return (p, _t, time) => {
      const D = 2.3e-5 * Math.exp(-148000 / (8.314 * (p.T + 273)));
      const L = 2 * Math.sqrt(D * Math.max(p.hours, 0.001) * 3600) * 1000;
      prof.set((x) => 1.0 - 0.8 * erf(x / Math.max(L, 1e-6)));
      depth.set([P.toW(L, 0), P.toW(L, 1.2)]).visible(L < 3);
      parts.forEach((q) => {
        const xmm = q.z * L;
        const jitter = 0.03 * Math.sin(time * 6 + q.ph);
        q.d.set([-6 + xmm * sx + jitter, -3.9 + q.y * 3.2 + jitter]).visible(xmm < 3);
      });
      bg.forEach((q) => q.d.set([-6 + q.x * 12, -3.9 + q.y * 3.2]));
    };
  },
};

// ---------------------------------------------------------------------------
// Phase diagram (Cu–Ni) + lever rule
// ---------------------------------------------------------------------------
const TA = 1085;
const TB = 1455;
const liq = (c) => TA + (TB - TA) * c + 110 * c * (1 - c);
const sol = (c) => TA + (TB - TA) * c - 110 * c * (1 - c);
const invert = (f, T) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) < T) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

export const phase_diagram_lever_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    { key: 'c0', label: 'Alloy composition (wt% Ni)', min: 0, max: 100, step: 1, value: 35 },
    { key: 'T', label: 'Temperature (°C)', min: 1000, max: 1500, step: 5, value: 1250 },
  ],
  beats: [
    { say: 'A phase diagram is a map: pick a composition and a temperature, and it tells you what exists. Up here: all liquid.', set: { c0: 35, T: 1400 } },
    { say: 'Inside the lens, liquid and solid α coexist. Draw a horizontal tie line: its ends give each phase’s composition.', set: { c0: 35, T: 1250 } },
    { say: 'Lever rule: the fraction of each phase is the OPPOSITE arm of the lever divided by the whole line.', set: { c0: 35, T: 1220 } },
  ],
  goal: (t) => t.T < liq(t.c0 / 100) && t.T > sol(t.c0 / 100),
  readout: (t) => {
    const c = t.c0 / 100;
    if (t.T >= liq(c)) return [['Phases', 'Liquid only'], ['Liquid composition', `${t.c0} wt% Ni`]];
    if (t.T <= sol(c)) return [['Phases', 'Solid α only'], ['α composition', `${t.c0} wt% Ni`]];
    const cl = invert(liq, t.T);
    const ca = invert(sol, t.T);
    const wl = (ca - c) / (ca - cl);
    return [
      ['Phases', 'Liquid + α'],
      ['C_L (left end)', `${Math.round(cl * 100)} wt% Ni`],
      ['C_α (right end)', `${Math.round(ca * 100)} wt% Ni`],
      ['W_L = (Cα − C₀)/(Cα − C_L)', `${Math.round(wl * 100)}%`],
      ['W_α = (C₀ − C_L)/(Cα − C_L)', `${Math.round((1 - wl) * 100)}%`],
    ];
  },
  setup(kit) {
    const sx = 10 / 100;
    const sy = 7.6 / 500;
    const P = kit.plane({ x: [0, 100, 10], y: [1000, 1500, 50], sx, sy, origin: [-7, -3.8 - 1000 * sy], axisAt: [0, 1000], xEvery: 20, yEvery: 100, xLabel: '\\text{wt\\% Ni}', yLabel: 'T\\,(^\\circ C)' });
    const lens = [...range(0, 1, 80).map((c) => P.toW(c * 100, liq(c))), ...range(1, 0, 80).map((c) => P.toW(c * 100, sol(c)))];
    kit.fill(lens, { color: C.purple, opacity: 0.18 });
    kit.curve((c) => liq(c / 100), [0, 100], { plane: P, color: C.red, width: 3 });
    kit.curve((c) => sol(c / 100), [0, 100], { plane: P, color: C.blue, width: 3 });
    kit.label('Liquid', P.toW(25, 1430), { tex: false, size: 16 });
    kit.label('α (solid)', P.toW(75, 1120), { tex: false, size: 16 });
    kit.label('L + α', P.toW(50, 1275), { tex: false, size: 14, color: '#c9a0dc' });
    const vline = kit.line([[0, 0], [0, 0]], { color: C.grey, width: 1.5, dashed: true, create: false });
    const tie = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 4, create: false });
    const ends = [0, 1].map(() => kit.dot([0, 0], { r: 0.1, color: C.yellow, z: 6 }));
    const pt = kit.dot([0, 0], { r: 0.15, color: C.white, z: 7 });
    const barL = kit.rect(3.8, 0, 0, 0.5, { color: C.red, opacity: 0.8, stroke: false });
    const barA = kit.rect(3.8, 0, 0, 0.5, { color: C.blue, opacity: 0.8, stroke: false });
    kit.rect(3.8, 2.4, 3.6, 0.5, { fill: false, color: C.white, width: 1.5 });
    kit.label('phase amounts', [5.6, 3.3], { tex: false, cls: 'tick' });
    const lblL = kit.label('', [3.8, 1.95], { tex: false, cls: 'tick', align: 'left', color: C.red });
    const lblA = kit.label('', [7.4, 1.95], { tex: false, cls: 'tick', align: 'right', color: C.blue });
    return (p) => {
      const c = p.c0 / 100;
      pt.set(P.toW(p.c0, p.T));
      vline.set([P.toW(p.c0, 1000), P.toW(p.c0, 1500)]);
      let wl = p.T >= liq(c) ? 1 : 0;
      const inLens = p.T < liq(c) && p.T > sol(c);
      tie.visible(inLens);
      ends.forEach((e) => e.visible(inLens));
      if (inLens) {
        const cl = invert(liq, p.T);
        const ca = invert(sol, p.T);
        wl = (ca - c) / (ca - cl);
        tie.set([P.toW(cl * 100, p.T), P.toW(ca * 100, p.T)]);
        ends[0].set(P.toW(cl * 100, p.T));
        ends[1].set(P.toW(ca * 100, p.T));
      }
      barL.set(3.8, 2.4, 3.6 * wl, 0.5);
      barA.set(3.8 + 3.6 * wl, 2.4, 3.6 * (1 - wl), 0.5);
      lblL.set(`liquid ${Math.round(wl * 100)}%`);
      lblA.set(`α ${Math.round((1 - wl) * 100)}%`);
    };
  },
};

// ---------------------------------------------------------------------------
// TTT diagram: quench speed decides pearlite vs martensite
// ---------------------------------------------------------------------------
const A1 = 727;
const MS = 220;
const MF = 100;
const NOSE_T = 540;
const startLog = (T) => (T >= NOSE_T ? ((T - NOSE_T) / 101) ** 2 : ((NOSE_T - T) / 170) ** 2);
const COOL = { water: 0.6, oil: 6, air: 120, furnace: 4000 };

export const ttt_cooling_curve_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    {
      key: 'medium',
      label: 'Quench in',
      type: 'choice',
      value: 'air',
      options: [
        { value: 'water', label: 'Water (fastest)' },
        { value: 'oil', label: 'Oil' },
        { value: 'air', label: 'Still air' },
        { value: 'furnace', label: 'Furnace (slowest)' },
      ],
    },
  ],
  beats: [
    { say: 'Read it like a race: the cooling curve must reach the bottom before it runs into the C-shaped "nose".', set: { medium: 'furnace' } },
    { say: 'Slow cooling crosses the C-curves: carbon has time to move, forming soft pearlite.', set: { medium: 'air' } },
    { say: 'Water quench dodges the nose. Carbon is trapped, iron snaps to martensite: very hard, brittle until tempered.', set: { medium: 'water' } },
  ],
  readout: (t) => {
    const tau = COOL[t.medium];
    const T = (s) => 25 + (850 - 25) * Math.exp(-s / tau);
    let start = null;
    let finish = null;
    for (const lg of range(-1, 5, 600)) {
      const s = 10 ** lg;
      const temp = T(s);
      if (temp > A1 || temp < MS) continue;
      if (start === null && lg >= startLog(temp)) start = temp;
      if (finish === null && lg >= startLog(temp) + 1.4) finish = temp;
    }
    const result =
      start === null ? 'Martensite (hard, brittle)' : finish === null ? 'Mix: some pearlite/bainite + martensite' : finish > 600 ? 'Coarse pearlite (soft, ductile)' : 'Fine pearlite (tougher, harder)';
    return [
      ['Result', result],
      ['Cooling time constant', `${tau} s`],
      ['Ms (martensite starts)', `${MS} °C`],
    ];
  },
  setup(kit) {
    const sx = 13 / 6;
    const sy = 7.8 / 900;
    const P = kit.plane({ x: [-1, 5, 1], y: [0, 900, 100], sx, sy, origin: [-6.2 + sx, -3.8], axisAt: [-1, 0], yEvery: 200, fmt: (v, ax) => (ax === 'x' ? pow10(v) : `${v}`), xLabel: '\\text{time (s, log)}', yLabel: 'T\\,(^\\circ C)' });
    const tRange = range(250, A1 - 2, 120);
    const sPts = tRange.map((T) => P.toW(Math.min(startLog(T), 5), T)).filter(([x]) => x <= P.toW(5, 0)[0]);
    const fPts = tRange.map((T) => P.toW(Math.min(startLog(T) + 1.4, 5), T));
    kit.line(sPts, { color: C.red, width: 3 });
    kit.line(fPts, { color: C.maroon, width: 3, dashed: true });
    kit.line([P.toW(-1, A1), P.toW(5, A1)], { color: C.grey, width: 1.5, dashed: true });
    kit.line([P.toW(-1, MS), P.toW(5, MS)], { color: C.blue, width: 2 });
    kit.line([P.toW(-1, MF), P.toW(5, MF)], { color: C.blue, width: 1.5, dashed: true });
    kit.label('A₁ 727 °C', P.toW(4.3, A1 + 25), { tex: false, cls: 'tick' });
    kit.label('Ms', P.toW(4.7, MS + 25), { tex: false, cls: 'tick', color: C.blue });
    kit.label('Mf', P.toW(4.7, MF + 25), { tex: false, cls: 'tick', color: C.blue });
    kit.label('pearlite', P.toW(3.2, 640), { tex: false, size: 14, color: '#fc6255' });
    kit.label('bainite', P.toW(3.2, 360), { tex: false, size: 14, color: '#c55f73' });
    kit.label('martensite', P.toW(0.2, 160), { tex: false, size: 14, color: '#58c4dd' });
    const cool = kit.line([[0, 0], [1, 1]], { color: C.yellow, width: 4 });
    const runner = kit.dot([0, 0], { r: 0.13, color: C.white, z: 7 });
    let pts = [];
    return (_p, t, time) => {
      const tau = COOL[t.medium];
      pts = range(-1, 5, 240).map((lg) => P.toW(lg, 25 + 825 * Math.exp(-(10 ** lg) / tau)));
      cool.set(pts);
      const u = (time * 0.25) % 1.2;
      runner.set(pts[Math.min(pts.length - 1, Math.floor(u * pts.length))]);
    };
  },
};

// ---------------------------------------------------------------------------
// Griffith fracture: crack length vs breaking stress
// ---------------------------------------------------------------------------
const TOUGH = {
  glass: { name: 'Window glass', K: 0.75 },
  alumina: { name: 'Alumina ceramic', K: 4 },
  al: { name: 'Aluminium alloy', K: 29 },
  steel: { name: 'Structural steel', K: 50 },
};

export const griffith_fracture_composite_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    {
      key: 'mat',
      label: 'Material',
      type: 'choice',
      value: 'al',
      options: Object.entries(TOUGH).map(([value, m]) => ({ value, label: m.name })),
    },
    { key: 'a', label: 'Crack half-length a (mm)', min: 0.2, max: 20, step: 0.1, value: 2 },
    { key: 's', label: 'Applied stress σ (MPa)', min: 0, max: 600, step: 5, value: 150 },
  ],
  beats: [
    { say: 'Griffith: a crack concentrates stress at its tip. Breaking stress σ_f = K_IC / √(πa). Longer crack, weaker part.', set: { mat: 'al', a: 2, s: 150 } },
    { say: 'Grow the crack to 15 mm and the same 150 MPa now exceeds the curve. The plate fails without warning.', set: { mat: 'al', a: 15, s: 150 } },
    { say: 'Glass has tiny toughness (0.75 MPa√m): even a 1 mm scratch drops its strength to ~13 MPa. That is why a glazier scores glass before snapping it.', set: { mat: 'glass', a: 1, s: 20 } },
  ],
  readout: (t) => {
    const K = TOUGH[t.mat].K;
    const sf = K / Math.sqrt(Math.PI * t.a * 1e-3);
    return [
      ['Fracture toughness K_IC', `${K} MPa√m`],
      ['Breaking stress σ_f', `${Math.round(sf)} MPa`],
      ['Safety factor σ_f / σ', t.s > 0 ? n2(sf / t.s) : '∞'],
      ['Verdict', t.s >= sf ? 'FRACTURE ✗' : 'holds ✓'],
    ];
  },
  setup(kit) {
    const sx = 8 / 20;
    const sy = 7.6 / 600;
    const P = kit.plane({ x: [0, 20, 2], y: [0, 600, 100], sx, sy, origin: [-7.4, -3.8], xEvery: 5, yEvery: 200, xLabel: 'a\\,(\\text{mm})', yLabel: '\\sigma\\,(\\text{MPa})' });
    const curve = kit.curve(() => 0, [0.2, 20], { plane: P, color: C.blue, width: 4, clipY: [0, 600] });
    const applied = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 2, dashed: true, create: false });
    const pt = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    const plate = kit.rect(2.4, -2.6, 4.4, 5.2, { color: 0x6b7885, opacity: 0.45, strokeColor: 0x9aa4ad });
    const crack = kit.fill([[0, 0], [1, 0], [0, 1]], { color: C.bg, opacity: 1, z: 3 });
    const glow = [0, 1].map(() => kit.dot([0, 0], { r: 0.3, color: C.red, opacity: 0.5, z: 4 }));
    const arrows = Array.from({ length: 6 }, () => kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 2.5, head: 0.2 }));
    const verdict = kit.label('', [4.6, 3.9], { tex: false, size: 18 });
    let run = 0;
    return (p, t, _time, dt) => {
      const K = TOUGH[t.mat].K;
      const sf = (a) => K / Math.sqrt(Math.PI * a * 1e-3);
      curve.set((a) => Math.min(sf(a), 650));
      applied.set([P.toW(0, p.s), P.toW(20, p.s)]);
      pt.set(P.toW(p.a, p.s));
      const fails = t.s >= sf(t.a);
      run += ((fails ? 1 : 0) - run) * (1 - Math.exp(-dt * 3));
      const half = Math.min(2.1, 0.12 + p.a * 0.08 + run * 2.2);
      const open = 0.05 + run * 0.25 + p.s / 6000;
      crack.set([
        [4.6 - half, 0],
        [4.6, open],
        [4.6 + half, 0],
        [4.6, -open],
      ]);
      const heat = clamp(p.s / Math.max(sf(p.a), 1), 0, 1.2);
      glow.forEach((g, i) => g.set([4.6 + (i ? half : -half), 0]).scale(0.5 + heat).opacity(0.25 + 0.5 * heat));
      plate.fill.color(fails ? 0x7a3b3b : 0x6b7885);
      const L = 0.3 + (p.s / 600) * 1.1;
      arrows.forEach((ar, i) => {
        const x = 2.9 + (i % 3) * 1.7;
        const up = i < 3;
        ar.set([x, up ? 2.7 : -2.7], [x, up ? 2.7 + L : -2.7 - L]);
      });
      verdict.set(fails ? 'crack runs: FRACTURE' : 'crack is stable').color(fails ? C.red : C.green);
    };
  },
};

// ---------------------------------------------------------------------------
// Ashby chart: modulus vs density, with a performance-index line
// ---------------------------------------------------------------------------
const FAMILIES = [
  ['Foams', [0.02, 0.3], [0.001, 1], C.gold],
  ['Elastomers', [0.9, 1.3], [0.001, 0.1], C.pink],
  ['Polymers', [0.9, 2.2], [0.2, 5], C.purple],
  ['Woods', [0.3, 0.9], [1, 20], 0xa0764a],
  ['Composites', [1.5, 2.2], [15, 200], C.green],
  ['Metals', [1.7, 20], [40, 400], C.blue],
  ['Ceramics', [2.2, 6], [150, 1000], C.red],
  ['Glasses', [2.2, 2.8], [50, 90], C.teal],
];

export const ashby_corrosion_capstone_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    {
      key: 'shape',
      label: 'What you are designing',
      type: 'choice',
      value: 1,
      options: [
        { value: 1, label: 'Tie rod (E/ρ)' },
        { value: 2, label: 'Beam (E^½/ρ)' },
        { value: 3, label: 'Flat panel (E^⅓/ρ)' },
      ],
    },
    { key: 'shift', label: 'Slide the selection line', min: -2, max: 2, step: 0.05, value: 0 },
  ],
  beats: [
    { say: 'Every material family lives in a bubble on the stiffness-vs-density map. Up-left is light and stiff.', set: { shape: 1, shift: -1 } },
    { say: 'For a light, stiff beam, maximise E^½/ρ. On log axes that is a straight line of slope 2. Slide it up.', set: { shape: 2, shift: 0.4 } },
    { say: 'Whatever sits above the line beats everything below it. For beams that leaves woods, composites and ceramics. Ceramics are too brittle to bend, so composites and woods win, which is why aircraft and bicycles use carbon fibre.', set: { shape: 2, shift: 0.56 } },
  ],
  readout: (t) => {
    const n = t.shape;
    const lc = 1 + t.shift;
    const winners = FAMILIES.filter(([, rho, E]) => Math.log10(Math.sqrt(E[0] * E[1])) > n * Math.log10(Math.sqrt(rho[0] * rho[1])) + n * lc - 2).map((f) => f[0]);
    return [
      ['Index to maximise', n === 1 ? 'E/ρ' : n === 2 ? 'E^½/ρ' : 'E^⅓/ρ'],
      ['Line slope on log axes', n],
      ['Above the line', winners.join(', ') || 'none: slide down'],
    ];
  },
  setup(kit) {
    // log10 ρ from −2..1.5 → x; log10 E from −3..3 → y
    const sx = 13 / 3.5;
    const sy = 7.8 / 6;
    const P = kit.plane({ x: [-2, 1.5, 0.5], y: [-3, 3, 1], sx, sy, origin: [-6.4 + 2 * sx, -3.9 + 3 * sy], axisAt: [-2, -3], xEvery: 1, yEvery: 1, fmt: (v) => (Number.isInteger(v) ? pow10(v) : ''), xLabel: '\\rho\\ (\\text{Mg/m}^3)', yLabel: 'E\\ (\\text{GPa})' });
    const blobs = FAMILIES.map(([name, rho, E, color]) => {
      const cx = (Math.log10(rho[0]) + Math.log10(rho[1])) / 2;
      const cy = (Math.log10(E[0]) + Math.log10(E[1])) / 2;
      const rx = Math.max(0.12, (Math.log10(rho[1]) - Math.log10(rho[0])) / 2);
      const ry = Math.max(0.2, (Math.log10(E[1]) - Math.log10(E[0])) / 2);
      const pts = range(0, Math.PI * 2, 48).map((a) => P.toW(cx + rx * Math.cos(a), cy + ry * Math.sin(a)));
      const f = kit.fill(pts, { color, opacity: 0.3 });
      kit.line([...pts, pts[0]], { color, width: 2 });
      kit.label(name, P.toW(cx, cy), { tex: false, size: 13 });
      return { f, cx, cy };
    });
    const sel = kit.line([[0, 0], [1, 1]], { color: C.white, width: 3, dashed: true, create: false });
    const eq = kit.label('', [2.6, 4.1], { size: 22 });
    return (p, t) => {
      const n = p.shape;
      const lc = 1 + p.shift;
      const y = (x) => n * x + n * lc - 2;
      const xa = Math.max(-2, (-3 - (n * lc - 2)) / n);
      const xb = Math.min(1.5, (3 - (n * lc - 2)) / n);
      sel.set([P.toW(xa, y(xa)), P.toW(xb, y(xb))]).visible(xb > xa);
      blobs.forEach((b) => b.f.opacity(b.cy > y(b.cx) ? 0.55 : 0.12));
      eq.set(t.shape === 1 ? '\\text{maximise } E/\\rho' : t.shape === 2 ? '\\text{maximise } E^{1/2}/\\rho' : '\\text{maximise } E^{1/3}/\\rho');
    };
  },
};
