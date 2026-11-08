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
const ease = (u) => u * u * (3 - 2 * u);

// ---------------------------------------------------------------------------
// Casting: a plate and its riser freezing (Chvorinov)
// ---------------------------------------------------------------------------
const M_PLATE = 1600 / 1120;
const T_PLATE = 2 * M_PLATE ** 2;
const tRiser = (D) => 2 * (D / 6) ** 2;
const cast = { tau: 0 };

export const casting_riser = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the smallest riser that still freezes after the plate (with the 1.2 safety margin on its modulus).',
  goal: (t) => t.D >= 10.3 && t.D <= 11,
  params: [{ key: 'D', label: 'Riser diameter D = height (cm)', min: 4, max: 16, step: 0.1, value: 6 }],
  beats: [
    { say: 'A 6 cm riser has a modulus of only 1 cm, smaller than the plate’s 1.43 cm. It freezes first, so the plate’s last liquid has nothing to feed it: a shrinkage hole.', set: { D: 6 } },
    { say: 'At 10.3 cm the riser’s modulus is 1.2 times the plate’s. It stays liquid longest and feeds the plate; the shrinkage ends up in the riser, which is cut off.', set: { D: 10.3 } },
    { say: 'Bigger is safe but wasteful: a 16 cm riser holds more steel than the plate itself, all to be remelted.', set: { D: 16 } },
  ],
  readout: (t) => {
    const tr = tRiser(t.D);
    return [
      ['Plate modulus, freezing time', `${r2(M_PLATE)} cm, ${r1(T_PLATE)} min`],
      ['Riser modulus, freezing time', `${r2(t.D / 6)} cm, ${r1(tr)} min`],
      ['Riser ÷ plate modulus', r2(t.D / 6 / M_PLATE)],
      ['Result', tr > T_PLATE ? 'sound plate: the riser feeds it' : 'shrinkage hole in the plate'],
    ];
  },
  setup(kit) {
    const s = 0.3; // world units per cm
    const px0 = -7.4;
    const pw = 20 * s;
    const py = -2.6;
    const ph = 4 * s;
    kit.rect(px0 - 0.4, py - 0.4, pw + 0.8, ph + 6.2, { color: 0xc2a36b, opacity: 0.18, strokeColor: 0x8a7650 });
    kit.label('\\text{sand mould}', [px0 + 1.2, 3.85], { size: 12, color: 0xc2a36b });
    const plateSolid = kit.rect(px0, py, pw, ph, { color: C.grey, opacity: 0.9, strokeColor: C.white });
    void plateSolid;
    const plateLiq = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.95, stroke: false });
    const riserSolid = kit.rect(0, 0, 0.01, 0.01, { color: C.grey, opacity: 0.9, strokeColor: C.white });
    const riserLiq = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.95, stroke: false });
    const hole = kit.fill([], { color: 0x111111, opacity: 1, z: 5 });
    const pipe = kit.fill([], { color: 0x111111, opacity: 1, z: 5 });
    kit.label('\\text{plate } 20 \\times 20 \\times 4\\,\\text{cm}', [px0 + pw / 2, py - 0.75], { size: 12 });
    const clock = kit.label('', [px0 + 1.2, 3.3], { size: 14, color: C.yellow, tex: false });
    // right: fraction frozen against time
    const P = kit.plane({ x: [0, 16, 2], y: [0, 1, 0.25], sx: 4.6 / 16, sy: 4.2, origin: [2.8, -2.6], xEvery: 4, yEvery: 0.5, xLabel: '\\text{min}', yLabel: '\\text{frozen}' });
    const cp = kit.line([], { color: C.blue, width: 2.5, create: false });
    const cr = kit.line([], { color: C.pink, width: 2.5, create: false });
    kit.label('\\text{plate}', [7.6, 2.4], { size: 14, color: C.blue, align: 'right' });
    kit.label('\\text{riser}', [7.6, 1.85], { size: 14, color: C.pink, align: 'right' });
    const now = kit.line([], { color: C.yellow, width: 1.5, dashed: true, create: false });
    return (p, t, time, dt) => {
      const tr = tRiser(p.D);
      const span = Math.max(T_PLATE, tr) * 1.15 + 1.5;
      cast.tau = (cast.tau + Math.min(dt || 0.016, 0.05) * 1.6) % span;
      const tau = Math.min(cast.tau, Math.max(T_PLATE, tr) * 1.15);
      const fp = clamp(Math.sqrt(tau / T_PLATE), 0, 1);
      const fr = clamp(Math.sqrt(tau / tr), 0, 1);
      // the plate freezes from all sides
      const ins = (1 - fp) * (ph / 2);
      plateLiq.visible(fp < 1).set(px0 + (ph / 2 - ins), py + (ph / 2 - ins), Math.max(0.01, pw - 2 * (ph / 2 - ins)), Math.max(0.01, 2 * ins));
      // the riser sits on the right end of the plate
      const rw = p.D * s;
      const rx = px0 + pw - rw;
      const ry = py + ph;
      riserSolid.set(rx, ry, rw, rw);
      const ri = (1 - fr) * (rw / 2);
      riserLiq.visible(fr < 1).set(rx + rw / 2 - ri, ry + rw / 2 - ri, Math.max(0.01, 2 * ri), Math.max(0.01, 2 * ri));
      const fed = tr > T_PLATE;
      const late = tau > Math.min(T_PLATE, tr);
      const cx = px0 + (fed ? pw - rw / 2 : pw * 0.42);
      hole.visible(!fed && fp >= 0.98).set(range(0, 2 * Math.PI, 24).map((a) => [cx + 0.9 * Math.cos(a), py + ph / 2 + 0.22 * Math.sin(a)]));
      pipe.visible(fed && late && fr >= 0.98).set([[rx + rw * 0.3, ry + rw - 0.02], [rx + rw * 0.7, ry + rw - 0.02], [rx + rw / 2, ry + rw * 0.45]]);
      clock.set(`${r1(tau)} min after pouring`);
      cp.set(range(0, 16, 120).map((x) => P.toW(x, Math.min(1, Math.sqrt(x / T_PLATE)))));
      cr.set(range(0, 16, 120).map((x) => P.toW(x, Math.min(1, Math.sqrt(x / tr)))));
      now.set([P.toW(Math.min(tau, 16), 0), P.toW(Math.min(tau, 16), 1)]);
      void t;
      void time;
    };
  },
};

// ---------------------------------------------------------------------------
// Stokes's law: a falling-ball viscometer
// ---------------------------------------------------------------------------
const FLUIDS = {
  glycerol: { name: 'glycerol', mu: 1.4, rho: 1260, col: 0xcfe8f0 },
  honey: { name: 'honey', mu: 10, rho: 1420, col: C.gold },
  oil: { name: 'engine oil', mu: 0.25, rho: 870, col: 0xb07a2a },
};
const RHO_BALL = 7800;
const vStokes = (rmm, f) => (2 * (RHO_BALL - FLUIDS[f].rho) * 9.8 * (rmm / 1000) ** 2) / (9 * FLUIDS[f].mu);
const fall = { y: 0 };

export const stokes_fall = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'In glycerol, choose the ball radius that takes exactly 10 seconds to fall between the marks (20 cm).',
  goal: (t) => t.f === 'glycerol' && Math.abs(0.2 / vStokes(t.r, 'glycerol') - 10) < 0.3,
  params: [
    { key: 'r', label: 'Ball radius r (mm)', min: 0.5, max: 3, step: 0.01, value: 1.4 },
    { key: 'f', label: 'Liquid', type: 'choice', value: 'glycerol', options: Object.entries(FLUIDS).map(([k, d]) => ({ value: k, label: `${d.name} (μ ≈ ${d.mu} Pa·s)` })) },
  ],
  beats: [
    { say: 'A 1.4 mm steel ball in glycerol quickly reaches a steady 2 cm/s and takes 10 s between the marks. Timing it gives the viscosity.', set: { r: 1.4, f: 'glycerol' } },
    { say: 'Honey is about 7 times thicker. Even a 2 mm ball creeps down at under 6 mm/s.', set: { r: 2, f: 'honey' } },
    { say: 'Engine oil is thinner: a 1 mm ball falls at 6 cm/s. The Reynolds number is still below 1, so Stokes’s law holds.', set: { r: 1, f: 'oil' } },
  ],
  readout: (t) => {
    const v = vStokes(t.r, t.f);
    const Re = (FLUIDS[t.f].rho * v * (2 * t.r) / 1000) / FLUIDS[t.f].mu;
    return [
      ['Steady fall speed', `${r1(v * 1000)} mm/s`],
      ['Time between marks (20 cm)', `${r1(0.2 / v)} s`],
      ['Reynolds number', `${r2(Re)}${Re > 1 ? ' (too fast for Stokes’s law)' : ''}`],
    ];
  },
  setup(kit) {
    const tx = -4.6;
    const top = 3.6;
    const bot = -3.8;
    const H = top - bot; // represents 30 cm
    const cm = H / 30;
    const liquid = kit.rect(tx - 0.8, bot, 1.6, H - 0.2, { color: FLUIDS.glycerol.col, opacity: 0.35, stroke: false });
    kit.line([[tx - 0.85, top], [tx - 0.85, bot], [tx + 0.85, bot], [tx + 0.85, top]], { color: C.white, width: 2 });
    const m1 = top - 5 * cm;
    const m2 = top - 25 * cm;
    [m1, m2].forEach((y) => kit.line([[tx - 1.1, y], [tx + 1.1, y]], { color: C.red, width: 2 }));
    kit.label('\\text{start mark}', [tx + 1.25, m1], { size: 11, color: C.red, align: 'left' });
    kit.label('\\text{stop mark (20 cm lower)}', [tx + 1.25, m2], { size: 11, color: C.red, align: 'left' });
    const ball = kit.dot([tx, top], { r: 0.15, color: C.white, z: 5 });
    const clock = kit.label('', [tx, 4.1], { size: 14, color: C.yellow, tex: false });
    // right: log of fall speed against radius, all liquids
    const P = kit.plane({ x: [0.5, 3, 0.5], y: [-1, 3, 1], sx: 4.4 / 2.5, sy: 1.6, origin: [2.4 - 0.5 * 1.76, -2.2], axisAt: [0.5, -1], xEvery: 0.5, yEvery: 1, fmt: (v, ax) => (ax === 'y' ? `${10 ** v}` : `${v}`), xLabel: 'r\\;(\\text{mm})', yLabel: '\\text{mm/s}' });
    const curves = Object.keys(FLUIDS).map((k) => kit.line(range(0.5, 3, 80).map((x) => P.toW(x, clamp(Math.log10(vStokes(x, k) * 1000), -1, 3))), { color: FLUIDS[k].col, width: 2.5, opacity: 0.35 }));
    Object.keys(FLUIDS).forEach((k) => kit.label(`\\text{${FLUIDS[k].name}}`, [P.toW(3, 0)[0] + 0.1, P.toW(0, clamp(Math.log10(vStokes(3, k) * 1000), -1, 3))[1]], { size: 11, color: FLUIDS[k].col, align: 'left' }));
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    let last = '';
    let start = 0;
    return (p, t, time, dt) => {
      if (t.f !== last) {
        last = t.f;
        liquid.color(FLUIDS[t.f].col);
        Object.keys(FLUIDS).forEach((k, i) => curves[i].opacity(k === t.f ? 1 : 0.3));
      }
      const v = vStokes(p.r, t.f);
      const h = Math.min(dt || 0.016, 0.05);
      const prev = fall.y;
      fall.y += v * 100 * h; // in cm
      if (fall.y > 28) {
        fall.y = 0;
        start = 0;
      }
      if (prev < 5 && fall.y >= 5) start = time;
      const y = top - (fall.y + 0.5) * cm;
      ball.set([tx, y]).scale(clamp(p.r / 1.4, 0.4, 2));
      const el = fall.y < 5 ? 0 : Math.min(time - start, 0.2 / v);
      clock.set(fall.y < 5 ? 'waiting for the start mark' : `${r1(el)} s`);
      dot.set(P.toW(p.r, clamp(Math.log10(v * 1000), -1, 3)));
    };
  },
};

// ---------------------------------------------------------------------------
// Charpy impact test and the ductile-to-brittle transition
// ---------------------------------------------------------------------------
const STEELS = {
  ship: { name: '1940s ship plate steel', lo: 5, up: 100, T0: 5, c: 12, col: C.red },
  modern: { name: 'modern fine-grained steel', lo: 10, up: 200, T0: -45, c: 15, col: C.blue },
  ss: { name: 'austenitic stainless (FCC)', lo: 160, up: 160, T0: 0, c: 10, col: C.green },
};
const charpyE = (T, k) => {
  const s = STEELS[k];
  return s.lo + 0.5 * (s.up - s.lo) * (1 + Math.tanh((T - s.T0) / s.c));
};
const brittleShare = (T, k) => {
  const s = STEELS[k];
  return s.up === s.lo ? 0 : clamp(1 - (charpyE(T, k) - s.lo) / (s.up - s.lo), 0, 1);
};
const EMAX = 300;
const swing = { u: 0 };

export const charpy_dbtt = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the temperature at which the old ship steel absorbs only 20 J, a common minimum for ship plate.',
  goal: (t) => t.k === 'ship' && Math.abs(charpyE(t.T, 'ship') - 20) < 1.5,
  params: [
    { key: 'T', label: 'Test temperature (°C)', min: -80, max: 60, step: 1, value: 20 },
    { key: 'k', label: 'Steel', type: 'choice', value: 'ship', options: Object.entries(STEELS).map(([k, s]) => ({ value: k, label: s.name })) },
  ],
  beats: [
    { say: 'At 20 °C the ship steel absorbs about 93 J: the pendulum is slowed a lot, and the broken bar is bent and dull grey (ductile).', set: { T: 20, k: 'ship' } },
    { say: 'At −20 °C the same steel absorbs under 7 J. The pendulum hardly notices, and the fracture is flat and shiny: brittle, like the wartime ships in icy seas.', set: { T: -20, k: 'ship' } },
    { say: 'A modern fine-grained steel is still on its upper shelf at −20 °C, about 190 J. Its transition is pushed down near −45 °C.', set: { T: -20, k: 'modern' } },
  ],
  readout: (t) => [
    ['Energy absorbed', `${Math.round(charpyE(t.T, t.k))} J`],
    ['Shiny (brittle) share of fracture', `${Math.round(brittleShare(t.T, t.k) * 100)}%`],
    ['Behaviour', brittleShare(t.T, t.k) > 0.6 ? 'brittle' : brittleShare(t.T, t.k) > 0.25 ? 'in the transition' : 'ductile'],
  ],
  setup(kit) {
    const piv = [-4.4, 2.6];
    const L = 3.0;
    const th0 = rad(100);
    kit.line([[piv[0] - 1.3, piv[1] + 0.25], [piv[0] + 1.3, piv[1] + 0.25]], { color: C.axis, width: 4 });
    const arm = kit.line([], { color: C.white, width: 4, create: false });
    const bob = kit.fill([], { color: C.grey, opacity: 1, z: 4 });
    const arc = kit.line(range(-th0, th0, 60).map((a) => [piv[0] + L * Math.sin(a), piv[1] - L * Math.cos(a)]), { color: C.grid, width: 1, dashed: true });
    void arc;
    const bx = piv[0];
    const by = piv[1] - L - 0.15;
    const halfL = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.95, strokeColor: C.white });
    const halfR = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.95, strokeColor: C.white });
    kit.rect(bx - 1.4, by - 0.55, 0.35, 0.4, { color: C.axis, opacity: 0.7, stroke: false });
    kit.rect(bx + 1.05, by - 0.55, 0.35, 0.4, { color: C.axis, opacity: 0.7, stroke: false });
    const rise = kit.label('', [-4.4, -3.9], { size: 13, color: C.yellow, tex: false });
    // fracture face
    const face = kit.rect(-7.6, -3.1, 0.9, 0.9, { color: C.grey, opacity: 1, strokeColor: C.white });
    const shiny = kit.rect(-7.6, -3.1, 0.01, 0.9, { color: 0xf2f4f7, opacity: 1, stroke: false, z: 3 });
    kit.label('\\text{fracture face}', [-7.15, -1.85], { size: 11, color: C.grey });
    void face;
    // right: transition curves
    const P = kit.plane({ x: [-80, 60, 20], y: [0, 220, 50], sx: 5.4 / 140, sy: 6.6 / 220, origin: [2.0 + 80 * (5.4 / 140), -3.3], axisAt: [-80, 0], xEvery: 40, yEvery: 50, xLabel: 'T\\;(°\\text{C})', yLabel: '\\text{J}' });
    const curves = Object.keys(STEELS).map((k) => kit.line(range(-80, 60, 140).map((x) => P.toW(x, charpyE(x, k))), { color: STEELS[k].col, width: 2.5, opacity: 0.35 }));
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    let last = '';
    return (p, t, time, dt) => {
      if (t.k !== last) {
        last = t.k;
        Object.keys(STEELS).forEach((k, i) => curves[i].opacity(k === t.k ? 1 : 0.3));
      }
      const E = charpyE(p.T, t.k);
      const c1 = 1 - (1 - Math.cos(th0)) * (1 - E / EMAX);
      const th1 = Math.acos(clamp(c1, -1, 1));
      swing.u = (swing.u + Math.min(dt || 0.016, 0.05) / 2.6) % 1;
      const u = swing.u;
      let th;
      if (u < 0.25) th = th0 * (1 - ease(u / 0.25));
      else if (u < 0.5) th = -th1 * Math.sin(((u - 0.25) / 0.25) * (Math.PI / 2));
      else th = -th1;
      if (u > 0.85) th = th0 * ease((u - 0.85) / 0.15) - th1 * (1 - ease((u - 0.85) / 0.15));
      const tip = [piv[0] + L * Math.sin(th), piv[1] - L * Math.cos(th)];
      arm.set([piv, tip]);
      bob.set(range(0, 2 * Math.PI, 20).map((a) => [tip[0] + 0.45 * Math.cos(a), tip[1] + 0.45 * Math.sin(a)]));
      const broken = u >= 0.25 && u < 0.85;
      const gap = broken ? 0.12 + 0.5 * clamp((u - 0.25) / 0.2, 0, 1) * (1 - brittleShare(p.T, t.k) * 0.6) : 0;
      const bend = broken ? 0.25 * (1 - brittleShare(p.T, t.k)) : 0;
      halfL.set(bx - 1.3 - gap, by - 0.2 - bend, 1.3, 0.35);
      halfR.set(bx + gap, by - 0.2 - bend, 1.3, 0.35);
      rise.set(`absorbed ${Math.round(E)} J of ${EMAX} J`);
      shiny.set(-7.6, -3.1, Math.max(0.01, 0.9 * brittleShare(p.T, t.k)), 0.9);
      dot.set(P.toW(p.T, E));
      void time;
    };
  },
};

// ---------------------------------------------------------------------------
// Euler buckling of a steel rod
// ---------------------------------------------------------------------------
const EI = 200000 * 19175; // N·mm², 25 mm steel rod
const AREA = 491;
const ENDS = {
  pp: { name: 'pinned at both ends', K: 1 },
  ff: { name: 'fixed at both ends', K: 0.5 },
  fp: { name: 'fixed base, pinned top', K: 0.7 },
  fr: { name: 'fixed base, free top', K: 2 },
};
const pcr = (L, e) => (Math.PI ** 2 * EI) / (ENDS[e].K * L * 1000) ** 2 / 1000; // kN
const mode = (s, e) => (e === 'pp' ? Math.sin(Math.PI * s) : e === 'ff' ? (1 - Math.cos(2 * Math.PI * s)) / 2 : e === 'fr' ? 1 - Math.cos((Math.PI * s) / 2) : Math.sin(Math.PI * s ** 1.3));

export const column_buckling = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With pinned ends and a 20 kN load, find the longest rod that does not buckle.',
  goal: (t) => t.e === 'pp' && Math.abs(t.P - 20) < 0.01 && t.L >= 1.3 && t.L <= 1.376,
  params: [
    { key: 'L', label: 'Rod length L (m)', min: 0.5, max: 3, step: 0.01, value: 1 },
    { key: 'P', label: 'Load P (kN)', min: 0, max: 100, step: 1, value: 20 },
    { key: 'e', label: 'Ends', type: 'choice', value: 'pp', options: Object.entries(ENDS).map(([k, d]) => ({ value: k, label: `${d.name} (K = ${d.K})` })) },
  ],
  beats: [
    { say: 'A 1 m rod with pinned ends can carry 38 kN before it buckles. At 20 kN it stays straight.', set: { L: 1, P: 20, e: 'pp' } },
    { say: 'Make it 2 m long: the critical load drops to a quarter, 9.5 kN. The 20 kN load now bows it sideways, though the steel is nowhere near crushing.', set: { L: 2, P: 20, e: 'pp' } },
    { say: 'Fix both ends of the 2 m rod: K = 0.5, so the critical load is four times higher, 38 kN. It holds again.', set: { L: 2, P: 20, e: 'ff' } },
  ],
  readout: (t) => {
    const Pc = pcr(t.L, t.e);
    const Py = (250 * AREA) / 1000;
    return [
      ['Critical (buckling) load', `${r1(Pc)} kN`],
      ['Crushing (yield) load, 250 MPa', `${r1(Py)} kN`],
      ['Load ÷ critical load', r2(t.P / Pc)],
      ['Result', t.P < Math.min(Pc, Py) ? 'holds' : Pc < Py ? 'buckles' : 'yields (crushes)'],
    ];
  },
  setup(kit) {
    const cx = -4.2;
    const yb = -3.4;
    const sc = 2.3;
    kit.line([[cx - 1.4, yb], [cx + 1.4, yb]], { color: C.axis, width: 4 });
    const rod = kit.line([], { color: C.gold, width: 7, create: false });
    const ghost = kit.line([], { color: C.grey, width: 1.5, dashed: true, create: false });
    const load = kit.arrow([0, 0], [0, 0], { color: C.red, width: 4 });
    const lLab = kit.label('', [0, 0], { size: 13, color: C.red });
    const topSup = kit.line([], { color: C.axis, width: 4, create: false });
    const baseL = kit.label('', [cx, -3.9], { size: 11, color: C.grey, tex: false });
    const verdict = kit.label('', [cx, 4.1], { size: 15, tex: false });
    const P = kit.plane({ x: [0.5, 3, 0.5], y: [0, 160, 40], sx: 5.2 / 2.5, sy: 6.6 / 160, origin: [1.6 - 0.5 * 2.08, -3.3], axisAt: [0.5, 0], xEvery: 0.5, yEvery: 40, xLabel: 'L\\;(\\text{m})', yLabel: 'P\\;(\\text{kN})' });
    const crv = kit.line([], { color: C.blue, width: 2.5, create: false });
    const yl = kit.line([P.toW(0.5, 122.75), P.toW(3, 122.75)], { color: C.green, width: 1.5, dashed: true });
    void yl;
    kit.label('\\text{crushing}', [P.toW(3, 0)[0], P.toW(0, 122.75)[1] + 0.25], { size: 11, color: C.green, align: 'right' });
    kit.label('\\text{buckling load}', [P.toW(3, 0)[0], P.toW(0, 30)[1] + 0.3], { size: 11, color: C.blue, align: 'right' });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    let last = '';
    return (p, t, time) => {
      if (t.e !== last) {
        last = t.e;
        crv.set(range(0.5, 3, 150).map((L) => [L, Math.min(pcr(L, t.e), 160)]).map(([L, v]) => P.toW(L, v)));
        baseL.set(ENDS[t.e].name);
      }
      const Pc = pcr(p.L, t.e);
      const H = p.L * sc;
      const over = p.P / Pc;
      const amp = over > 1 ? Math.min(1.4, 0.35 + 0.6 * Math.sqrt(over - 1)) : 0.02 * Math.sin(time * 6) * over;
      const pts = range(0, 1, 40).map((s) => [cx + amp * mode(s, t.e), yb + s * H * (1 - (over > 1 ? 0.04 : 0))]);
      rod.set(pts);
      ghost.set([[cx, yb], [cx, yb + H]]);
      const tp = pts[pts.length - 1];
      load.set([tp[0], tp[1] + 0.3 + p.P * 0.012], [tp[0], tp[1] + 0.08]);
      lLab.set(`${Math.round(p.P)}\\,\\text{kN}`).pos([tp[0] + 0.8, tp[1] + 0.4]);
      topSup.visible(t.e !== 'fr').set([[cx - 0.6, tp[1] + 0.05], [cx + 0.6, tp[1] + 0.05]]);
      verdict.set(over > 1 ? 'buckled' : 'straight').color(over > 1 ? C.red : C.green);
      dot.set(P.toW(p.L, Math.min(p.P, 160)));
    };
  },
};

// ---------------------------------------------------------------------------
// Nanoparticles: surface atoms, melting point and colour
// ---------------------------------------------------------------------------
const ATOM = 0.288; // nm
const surfFrac = (D) => clamp(1 - (1 - (2 * ATOM) / D) ** 3, 0, 1);
const tmGold = (D) => 1337 * (1 - 0.95 / D) - 273; // °C
const goldColour = (D) => (D < 2 ? 0x8a6a2a : D < 30 ? lerpC(0xc0162f, 0xa0143a, (D - 2) / 28) : lerpC(0xa0143a, 0x5b2a86, (D - 30) / 20));
const NMAX = 26;

export const nano_surface = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the particle size at which half of all the atoms sit on the surface.',
  goal: (t) => Math.abs(surfFrac(t.D) - 0.5) < 0.02,
  params: [{ key: 'D', label: 'Particle diameter D (nm)', min: 1.5, max: 50, step: 0.1, value: 20 }],
  beats: [
    { say: 'A 20 nm gold particle is about 70 atoms across. Only 8% of its atoms are on the surface, yet in water it already looks ruby red, not gold.', set: { D: 20 } },
    { say: 'At 5 nm, a third of the atoms are surface atoms, held by fewer neighbours. The melting point has dropped by about 250 °C.', set: { D: 5 } },
    { say: 'At 2 nm, nearly two thirds of the atoms are on the surface. Such clusters melt far below gold’s 1,064 °C and are powerful catalysts.', set: { D: 2 } },
  ],
  readout: (t) => [
    ['Atoms across', `about ${Math.round(t.D / ATOM)}`],
    ['Share of atoms on the surface', `${Math.round(surfFrac(t.D) * 100)}%`],
    ['Estimated melting point', `${big(tmGold(t.D))} °C (bulk 1,064 °C)`],
  ],
  setup(kit) {
    const cx = -4.6;
    const cy = 0.2;
    const W = 6.4;
    const dots = [];
    for (let i = 0; i < NMAX * NMAX; i++) dots.push(kit.dot([0, 0], { r: 0.1, color: C.gold }));
    const note = kit.label('', [cx, -3.6], { size: 11, color: C.grey, tex: false });
    kit.label('\\text{slice through a gold particle}', [cx, 3.85], { size: 12 });
    kit.label('\\text{surface atoms}', [cx - 2.4, -4.05], { size: 11, color: C.yellow });
    kit.label('\\text{inside atoms}', [cx + 1.2, -4.05], { size: 11, color: 0x8a6d2a });
    // right: surface fraction and melting point
    const P = kit.plane({ x: [0, 50, 10], y: [0, 1, 0.25], sx: 4.4 / 50, sy: 2.6, origin: [2.4, 0.9], xEvery: 10, yEvery: 0.5, yLabel: '\\text{surface share}' });
    kit.line(range(1.5, 50, 200).map((d) => P.toW(d, surfFrac(d))), { color: C.yellow, width: 2.5 });
    const d1 = kit.dot([0, 0], { r: 0.11, color: C.yellow });
    const Q = kit.plane({ x: [0, 50, 10], y: [0, 1100, 250], sx: 4.4 / 50, sy: 2.6 / 1100, origin: [2.4, -3.4], xEvery: 10, yEvery: 500, xLabel: 'D\\;(\\text{nm})', yLabel: 'T_m\\;(°\\text{C})' });
    kit.line(range(2, 50, 200).map((d) => Q.toW(d, Math.max(0, tmGold(d)))), { color: C.red, width: 2.5 });
    const d2 = kit.dot([0, 0], { r: 0.11, color: C.red });
    // vial
    kit.line([[7.2, 3.6], [7.2, 1.4], [7.9, 1.4], [7.9, 3.6]], { color: C.white, width: 2 });
    const vial = kit.rect(7.22, 1.42, 0.66, 1.6, { color: C.red, opacity: 0.9, stroke: false });
    kit.label('\\text{in water}', [7.55, 1.1], { size: 10, color: C.grey });
    return (p) => {
      const nAcross = p.D / ATOM;
      const N = Math.min(NMAX, Math.round(nAcross));
      const step = W / NMAX;
      const R = N / 2;
      let k = 0;
      for (let i = 0; i < NMAX; i++) {
        for (let j = 0; j < NMAX; j++) {
          const x = i - (NMAX - 1) / 2;
          const y = j - (NMAX - 1) / 2;
          const inside = Math.hypot(x, y) <= R - 0.5 + 1e-9;
          const d = dots[k++];
          if (!inside) {
            d.visible(false);
            continue;
          }
          const surf = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => Math.hypot(x + a, y + b) > R - 0.5 + 1e-9);
          d.visible(true).set([cx + x * step, cy + y * step]).color(surf ? C.yellow : 0x8a6d2a).scale((step / 0.2) * 0.42 * 2 > 1.6 ? 1.6 : (step / 0.2) * 0.84);
        }
      }
      note.set(nAcross > NMAX ? `drawn ${NMAX} atoms across; the real particle is about ${Math.round(nAcross)} across` : '');
      d1.set(P.toW(p.D, surfFrac(p.D)));
      d2.set(Q.toW(p.D, Math.max(0, tmGold(p.D))));
      vial.color(goldColour(p.D));
    };
  },
};

// ---------------------------------------------------------------------------
// Rolling: strain hardening (cold) or recrystallisation (hot)
// ---------------------------------------------------------------------------
const cuYield = (r, mode) => (mode === 'hot' ? 70 : Math.max(70, 320 * Math.log(1 / (1 - r)) ** 0.54));
const cuElong = (r, mode) => (mode === 'hot' ? 45 : 45 * Math.exp(-3 * Math.log(1 / (1 - r))) + 2);
const roll = { x: 0 };

export const rolling_mill = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the cold-rolling reduction that doubles the copper’s yield strength (from 70 to 140 MPa).',
  goal: (t) => t.mode === 'cold' && Math.abs(cuYield(t.r / 100, 'cold') - 140) < 4,
  params: [
    { key: 'r', label: 'Thickness reduction (%)', min: 0, max: 80, step: 0.5, value: 50 },
    { key: 'mode', label: 'Rolling', type: 'choice', value: 'cold', options: [{ value: 'cold', label: 'cold (room temperature)' }, { value: 'hot', label: 'hot (above recrystallisation)' }] },
  ],
  beats: [
    { say: 'Cold rolling copper from 10 to 5 mm (50%). The grains are squashed and stretched, and the yield strength rises from 70 to about 260 MPa.', set: { r: 50, mode: 'cold' } },
    { say: 'The price: ductility. At 75% cold work the elongation is down to about 3%, from 45%. Roll much further and the strip will crack.', set: { r: 75, mode: 'cold' } },
    { say: 'Rolled hot, new round grains form as fast as the old ones are squashed. The strip stays soft and ductile, ready for big reductions.', set: { r: 75, mode: 'hot' } },
  ],
  readout: (t) => {
    const r = t.r / 100;
    return [
      ['True strain ln(h₀/h)', r2(Math.log(1 / (1 - r)))],
      ['Yield strength', `${Math.round(cuYield(r, t.mode))} MPa`],
      ['Elongation', `${Math.round(cuElong(r, t.mode))}%`],
    ];
  },
  setup(kit) {
    const xr = -2.2;
    const R = 1.6;
    const yc = 0.7;
    const h0 = 1.6;
    const strip = kit.fill([], { color: 0xc9774a, opacity: 0.9 });
    const rollT = kit.line([], { color: C.axis, width: 3, create: false });
    const rollB = kit.line([], { color: C.axis, width: 3, create: false });
    const spT = kit.line([], { color: C.axis, width: 1.5, create: false });
    const spB = kit.line([], { color: C.axis, width: 1.5, create: false });
    const grains = range(0, 59, 60).map(() => kit.line([], { color: 0x5a2d16, width: 1.5, create: false }));
    kit.label('\\text{rolling direction} \\rightarrow', [-5.5, 3.9], { size: 12 });
    const P = kit.plane({ x: [0, 80, 10], y: [0, 400, 100], sx: 5.4 / 80, sy: 2.6 / 400, origin: [1.8, -3.5], xEvery: 20, yEvery: 200, xLabel: '\\%\\;\\text{reduction}', yLabel: '\\text{MPa}' });
    const ys = kit.line([], { color: C.yellow, width: 2.5, create: false });
    const el = kit.line([], { color: C.teal, width: 2.5, create: false });
    kit.label('\\text{yield strength}', [7.3, -0.5], { size: 11, color: C.yellow, align: 'right' });
    kit.label('\\text{elongation} \\times 5', [3.0, -0.5], { size: 11, color: C.teal, align: 'left' });
    const d1 = kit.dot([0, 0], { r: 0.11, color: C.yellow });
    const d2 = kit.dot([0, 0], { r: 0.11, color: C.teal });
    let last = '';
    return (p, t, time, dt) => {
      const r = p.r / 100;
      const h = h0 * (1 - r);
      const yt = yc + h / 2 + R;
      const ybt = yc - h / 2 - R;
      const circle = (cy) => range(0, 2 * Math.PI, 60).map((a) => [xr + R * Math.cos(a), cy + R * Math.sin(a)]);
      rollT.set(circle(yt));
      rollB.set(circle(ybt));
      const ang = time * 1.2;
      spT.set([[xr - R * Math.cos(ang), yt + R * Math.sin(ang)], [xr + R * Math.cos(ang), yt - R * Math.sin(ang)]]);
      spB.set([[xr - R * Math.cos(-ang), ybt + R * Math.sin(-ang)], [xr + R * Math.cos(-ang), ybt - R * Math.sin(-ang)]]);
      // contact length
      const dh = (h0 - h) / 2;
      const Lc = Math.sqrt(Math.max(0, R * dh));
      const xb = xr - Lc;
      const thick = (x) => {
        if (x <= xb) return h0;
        if (x >= xr) return h;
        const yTop = yt - Math.sqrt(Math.max(0, R * R - (x - xr) ** 2));
        return 2 * (yTop - yc);
      };
      const xs = range(-7.8, 1.2, 80);
      strip.set([...xs.map((x) => [x, yc + thick(x) / 2]), ...xs.slice().reverse().map((x) => [x, yc - thick(x) / 2])]);
      // grains move with the strip; exit speed is higher by h0/h
      roll.x = (roll.x + Math.min(dt || 0.016, 0.05) * 0.5) % 0.8;
      const hot = t.mode === 'hot';
      let g = 0;
      for (let row = 0; row < 3; row++) {
        for (let k = 0; k < 10; k++) {
          const xIn = -7.6 + k * 0.8 + roll.x;
          if (g >= grains.length) break;
          const gr = grains[g++];
          if (xIn > xb - 0.3) {
            gr.visible(false);
            continue;
          }
          const yy = yc + (row - 1) * (h0 / 3);
          gr.visible(true).set(range(0, 2 * Math.PI, 14).map((a) => [xIn + 0.3 * Math.cos(a), yy + 0.22 * Math.sin(a)]));
        }
        const sp = hot ? 0.8 * (h / h0) ** 0.5 : 0.8 / (1 - r);
        const n = 10;
        for (let k = 0; k < n; k++) {
          if (g >= grains.length) break;
          const gr = grains[g++];
          const xOut = xr + 0.2 + ((k * sp + roll.x / (1 - r)) % (n * sp));
          if (xOut > 1.1) {
            gr.visible(false);
            continue;
          }
          const yy = yc + (row - 1) * (h / 3);
          const ax = hot ? 0.3 * Math.sqrt(h / h0) : 0.3 / (1 - r);
          const ay = hot ? Math.min(0.22, h / 6.5) : 0.22 * (1 - r);
          gr.visible(true).set(range(0, 2 * Math.PI, 14).map((a) => [xOut + Math.min(ax, sp / 2) * Math.cos(a), yy + ay * Math.sin(a)]));
        }
      }
      if (t.mode !== last) {
        last = t.mode;
        ys.set(range(0, 80, 100).map((x) => P.toW(x, cuYield(x / 100, t.mode))));
        el.set(range(0, 80, 100).map((x) => P.toW(x, cuElong(x / 100, t.mode) * 5)));
      }
      d1.set(P.toW(p.r, cuYield(r, t.mode)));
      d2.set(P.toW(p.r, cuElong(r, t.mode) * 5));
    };
  },
};

// ---------------------------------------------------------------------------
// Reynolds's dye experiment
// ---------------------------------------------------------------------------
const PIPE = { water: { name: 'water', rho: 1000, mu: 0.001 }, oil: { name: 'light oil', rho: 880, mu: 0.1 } };
const reyn = (v, f) => (PIPE[f].rho * v * 0.025) / PIPE[f].mu;
const DYE = (() => {
  const u = rng(4711);
  return range(0, 179, 180).map(() => ({ x: u(), y: u() * 2 - 1, ph: u() * 6.28, sp: 0.6 + u() * 0.8 }));
})();

export const reynolds_dye = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the fastest water flow in this pipe that is still laminar (Re just under 2,300).',
  goal: (t) => t.f === 'water' && reyn(t.v, 'water') >= 2100 && reyn(t.v, 'water') < 2300,
  params: [
    { key: 'v', label: 'Mean flow speed v (m/s)', min: 0.01, max: 0.5, step: 0.001, value: 0.05 },
    { key: 'f', label: 'Liquid', type: 'choice', value: 'water', options: Object.entries(PIPE).map(([k, d]) => ({ value: k, label: d.name })) },
  ],
  beats: [
    { say: 'Water at 5 cm/s in a 25 mm pipe: Re = 1,250. The dye stays a straight thread. The flow slides in smooth layers (laminar).', set: { v: 0.05, f: 'water' } },
    { say: 'At 12 cm/s, Re = 3,000. The thread starts to wave and burst in places: transitional flow, exactly what Reynolds saw.', set: { v: 0.12, f: 'water' } },
    { say: 'At 40 cm/s, Re = 10,000. The dye is torn apart and fills the pipe within a short distance: turbulent flow, with a flatter speed profile.', set: { v: 0.4, f: 'water' } },
  ],
  readout: (t) => {
    const Re = reyn(t.v, t.f);
    return [
      ['Reynolds number ρvD/μ', big(Re)],
      ['Flow', Re < 2300 ? 'laminar' : Re < 4000 ? 'transitional' : 'turbulent'],
    ];
  },
  setup(kit) {
    const y0 = 1.4;
    const R = 1.3;
    const x0 = -7.2;
    const x1 = 7.4;
    kit.rect(x0, y0 - R, x1 - x0, 2 * R, { color: C.blue, opacity: 0.1, strokeColor: C.white });
    kit.line([[x0 - 0.6, y0 + 0.08], [x0 + 0.2, y0 + 0.08]], { color: C.grey, width: 3 });
    kit.label('\\text{dye}', [x0 - 0.3, y0 + 0.45], { size: 11, color: C.red });
    const streak = kit.line([], { color: C.red, width: 2.5, create: false });
    const cloud = DYE.map(() => kit.dot([0, 0], { r: 0.06, color: C.red, opacity: 0.6 }));
    const big = kit.label('', [0, 3.6], { size: 16, tex: false });
    // speed profile
    const py = -2.4;
    kit.line([[-1.0, py - 1.4], [-1.0, py + 1.4]], { color: C.axis, width: 2 });
    kit.label('\\text{speed across the pipe}', [0.6, -0.4], { size: 12 });
    const prof = kit.line([], { color: C.yellow, width: 2.5, create: false });
    const arrows = range(0, 6, 7).map(() => kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 2 }));
    return (p, t, time) => {
      const Re = reyn(p.v, t.f);
      const tr = clamp((Re - 2000) / 2000, 0, 1);
      const onset = x1 - (x1 - x0) * 0.9 * tr; // where the streak starts to break
      const amp = (x) => (x < onset ? 0 : Math.min(R * 0.9, ((x - onset) / 3) * (0.3 + 1.5 * tr)));
      const sp = 1.5 + Re / 2000;
      const pts = range(x0 + 0.2, x1, 220).map((x) => {
        const a = amp(x);
        const w = Math.sin(2.1 * x - time * sp) * 0.6 + Math.sin(5.3 * x - time * sp * 1.7) * 0.4 * tr;
        return [x, y0 + a * w];
      });
      const cut = tr >= 1 ? pts.findIndex(([x]) => x > onset + 1.2) : -1;
      streak.set(cut > 1 ? pts.slice(0, cut) : pts);
      const show = Re >= 3000;
      cloud.forEach((d, i) => {
        const q = DYE[i];
        const span = x1 - (onset + 0.3);
        const x = onset + 0.3 + ((q.x * span + time * q.sp * sp * 0.4) % span);
        const spread = clamp((x - onset) / 2.5, 0, 1);
        d.visible(show && x < x1).set([x, y0 + R * 0.92 * q.y * spread + 0.08 * Math.sin(time * 3 + q.ph)]).opacity(0.25 + 0.5 * tr);
      });
      big.set(Re < 2300 ? 'laminar' : Re < 4000 ? 'transitional' : 'turbulent').color(Re < 2300 ? C.green : Re < 4000 ? C.yellow : C.red);
      // profile: parabola (laminar) blending to a flat 1/7-power profile (turbulent)
      const prof7 = (s) => (1 - Math.abs(s)) ** (1 / 7) * 1.22;
      const para = (s) => 2 * (1 - s * s);
      const f = (s) => (1 - tr) * para(s) + tr * prof7(s);
      prof.set(range(-1, 1, 60).map((s) => [-1.0 + f(s) * 1.4, py + s * 1.4]));
      arrows.forEach((a, i) => {
        const s = -0.9 + (i * 1.8) / 6;
        a.set([-1.0, py + s * 1.4], [-1.0 + f(s) * 1.4, py + s * 1.4]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Torsion of a solid or hollow steel shaft
// ---------------------------------------------------------------------------
const tauMax = (T, d, k) => (16 * T * 1e6 * d) / (Math.PI * (d ** 4 - (k * d) ** 4)); // MPa, T in kN·m
const twist = (T, d, k) => ((T * 1e6 * 1000) / (80000 * (Math.PI * (d ** 4 - (k * d) ** 4)) / 32)) * (180 / Math.PI); // degrees per metre

export const shaft_torsion = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'For a 1 kN·m torque, find the smallest solid shaft that keeps the shear stress at or below 80 MPa.',
  goal: (t) => t.k === 0 && Math.abs(t.T - 1) < 0.01 && tauMax(t.T, t.d, 0) <= 80 && t.d <= 41,
  params: [
    { key: 'T', label: 'Torque T (kN·m)', min: 0.2, max: 3, step: 0.05, value: 1 },
    { key: 'd', label: 'Outside diameter d (mm)', min: 20, max: 80, step: 1, value: 50 },
    { key: 'k', label: 'Hollow: inside ÷ outside diameter', min: 0, max: 0.85, step: 0.01, value: 0 },
  ],
  beats: [
    { say: 'A solid 50 mm shaft under 1 kN·m: shear stress is zero at the centre and 41 MPa at the surface. The surface line twists into a spiral (exaggerated here).', set: { T: 1, d: 50, k: 0 } },
    { say: 'Bore it out to 30 mm inside: 36% lighter, yet the surface stress rises only to 47 MPa. The removed core was carrying very little.', set: { T: 1, d: 50, k: 0.6 } },
    { say: 'A 40 mm solid shaft with 2 kN·m: stress doubles with torque and grows as 1/d³, to 159 MPa.', set: { T: 2, d: 40, k: 0 } },
  ],
  readout: (t) => {
    const A = (Math.PI / 4) * (t.d ** 2 - (t.k * t.d) ** 2);
    return [
      ['Maximum shear stress', `${r1(tauMax(t.T, t.d, t.k))} MPa`],
      ['Twist over 1 m', `${r2(twist(t.T, t.d, t.k))}°`],
      ['Mass per metre (steel)', `${r1((A * 1e-6) * 7850)} kg`],
    ];
  },
  setup(kit) {
    const x0 = -7.4;
    const x1 = -0.6;
    const yc = 0.4;
    const body = kit.rect(0, 0, 0.01, 0.01, { color: C.grey, opacity: 0.55, strokeColor: C.white });
    kit.rect(x0 - 0.5, yc - 2.2, 0.5, 4.4, { color: C.axis, opacity: 0.6, stroke: false });
    kit.label('\\text{fixed}', [x0 - 0.25, yc - 2.5], { size: 11, color: C.grey });
    const lines = range(0, 5, 6).map(() => kit.line([], { color: C.yellow, width: 2, create: false }));
    const tArrow = kit.line([], { color: C.red, width: 3, create: false });
    const tHead = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3 });
    kit.label('T', [x1 + 0.2, yc + 2.6], { size: 15, color: C.red });
    kit.label('\\text{twist exaggerated}', [(x0 + x1) / 2, -3.9], { size: 11, color: C.grey });
    // end view
    const ex = 4.6;
    const outer = kit.line([], { color: C.white, width: 2, create: false });
    const inner = kit.line([], { color: C.white, width: 2, create: false });
    const ring = kit.fill([], { color: C.grey, opacity: 0.4 });
    const hole = kit.fill([], { color: C.bg, opacity: 1, z: 2 });
    const arrs = [];
    for (let rI = 0; rI < 4; rI++) for (let a = 0; a < 8; a++) arrs.push({ rI, a, ar: kit.arrow([0, 0], [0, 0], { color: C.pink, width: 2 }) });
    kit.label('\\text{cut end: shear stress grows with radius}', [ex, 3.9], { size: 12 });
    const tl = kit.label('', [ex, -3.9], { size: 13, color: C.pink, tex: false });
    return (p) => {
      const Rw = (p.d / 80) * 2.0;
      body.set(x0, yc - Rw, x1 - x0, 2 * Rw);
      const th = rad(twist(p.T, p.d, p.k)) * 12;
      lines.forEach((l, i) => {
        const phi0 = (i * Math.PI) / 3;
        const pts = range(x0, x1, 80).map((x) => {
          const ph = phi0 + (th * (x - x0)) / (x1 - x0);
          return [x, yc + Rw * Math.cos(ph), Math.sin(ph)];
        });
        // keep only the front half of the line
        const front = [];
        for (const q of pts) if (q[2] > 0) front.push([q[0], q[1]]);
        l.set(front.length > 1 ? front : []);
      });
      tArrow.set(range(-0.6, 0.6, 20).map((u) => [x1 + 0.35 * Math.cos(u * Math.PI), yc + (Rw + 0.4) * Math.sin(u * Math.PI)]));
      tHead.set([x1 + 0.3, yc + Rw + 0.38], [x1 + 0.05, yc + Rw + 0.42]);
      const Re = 2.6;
      const Ri = Re * p.k;
      const circ = (r) => range(0, 2 * Math.PI, 60).map((a) => [ex + r * Math.cos(a), yc + r * Math.sin(a)]);
      outer.set(circ(Re));
      inner.visible(p.k > 0.02).set(circ(Math.max(Ri, 0.01)));
      ring.set(circ(Re));
      hole.visible(p.k > 0.02).set(circ(Math.max(Ri, 0.01)));
      const tm = tauMax(p.T, p.d, p.k);
      arrs.forEach(({ rI, a, ar }) => {
        const r = Re * (0.25 + 0.25 * rI);
        if (r < Ri) {
          ar.visible(false);
          return;
        }
        const ang = (a * Math.PI) / 4 + rI * 0.3;
        const len = Math.min(1.2, (tm / 100) * (r / Re) * 0.9);
        const P0 = [ex + r * Math.cos(ang), yc + r * Math.sin(ang)];
        ar.visible(len > 0.05).set(P0, [P0[0] - len * Math.sin(ang), P0[1] + len * Math.cos(ang)]);
      });
      tl.set(`surface: ${r1(tm)} MPa · centre: 0`);
    };
  },
};

// ---------------------------------------------------------------------------
// Fracture surface of a round shaft
// ---------------------------------------------------------------------------
const FRAC = (() => {
  const u = rng(2468);
  return range(0, 399, 400).map(() => {
    const r = Math.sqrt(u());
    const a = u() * 2 * Math.PI;
    return [r * Math.cos(a), r * Math.sin(a), u()];
  });
})();

export const fracture_surface = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Show a fatigue failure from a lightly loaded shaft: the final-fracture zone should be small.',
  goal: (t) => t.mode === 'fatigue' && t.load <= 0.3,
  params: [
    { key: 'mode', label: 'How it failed', type: 'choice', value: 'fatigue', options: [{ value: 'fatigue', label: 'fatigue (repeated loads)' }, { value: 'ductile', label: 'ductile overload' }, { value: 'brittle', label: 'brittle fracture' }] },
    { key: 'load', label: 'Nominal stress (low → high)', min: 0.1, max: 1, step: 0.01, value: 0.6 },
  ],
  beats: [
    { say: 'Fatigue: curved beach marks spread from one origin at the keyway corner, like ripples. The rough zone opposite is where the remaining section finally tore.', set: { mode: 'fatigue', load: 0.6 } },
    { say: 'At a low stress the crack can grow across most of the shaft before the rest gives way, so the final zone is small. Its size tells you the load.', set: { mode: 'fatigue', load: 0.15 } },
    { say: 'A single brittle fracture looks different: a flat, shiny, crystalline face with river marks running back to the origin, and no beach marks.', set: { mode: 'brittle', load: 0.6 } },
  ],
  readout: (t) => {
    if (t.mode === 'fatigue') {
      const fz = 0.08 + 0.55 * t.load;
      return [
        ['Features', 'origin, beach marks, final-fracture zone'],
        ['Final zone share of the section', `${Math.round(fz * 100)}%`],
        ['Reading', t.load < 0.35 ? 'low stress, long slow crack' : 'high stress, short crack'],
      ];
    }
    if (t.mode === 'ductile') return [['Features', 'fibrous centre, 45° shear lip all round'], ['Reading', 'a single overload; metal stretched and necked first']];
    return [['Features', 'flat shiny facets, river (chevron) marks'], ['Reading', 'sudden fracture with little energy; check temperature and toughness']];
  },
  setup(kit) {
    const cx = -3.2;
    const cy = 0.1;
    const R = 3.4;
    const O = [cx + R * Math.cos(rad(225)), cy + R * Math.sin(rad(225))];
    const disc = kit.fill(range(0, 2 * Math.PI, 80).map((a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)]), { color: 0x7d8288, opacity: 1 });
    void disc;
    kit.line(range(0, 2 * Math.PI, 80).map((a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)]), { color: C.white, width: 2 });
    kit.fill([[O[0] - 0.25, O[1] + 0.05], [O[0] + 0.05, O[1] - 0.25], [O[0] + 0.35, O[1] + 0.05], [O[0] + 0.05, O[1] + 0.35]], { color: C.bg, opacity: 1, z: 3 });
    const arcs = range(0, 9, 10).map(() => kit.line([], { color: 0xd9dde2, width: 2, opacity: 0.8, create: false }));
    const finalZ = kit.fill([], { color: 0x5b6067, opacity: 1, z: 1 });
    const texture = FRAC.map(() => kit.dot([0, 0], { r: 0.05, color: 0x3c4046 }));
    const rivers = range(0, 13, 14).map(() => kit.line([], { color: 0xf5f7fa, width: 1.5, opacity: 0.8, create: false }));
    const lip = kit.fill([], { color: 0x9ba1a8, opacity: 1, z: 1 });
    const lipHole = kit.fill([], { color: 0x6c7076, opacity: 1, z: 1 });
    const originDot = kit.dot(O, { r: 0.13, color: C.red, z: 6 });
    const oLab = kit.label('\\text{origin}', [O[0] - 0.4, O[1] - 0.45], { size: 12, color: C.red });
    const notes = range(0, 2, 3).map(() => kit.label('', [0, 0], { size: 12, tex: false, align: 'left' }));
    return (p, t) => {
      const fat = t.mode === 'fatigue';
      const br = t.mode === 'brittle';
      const du = t.mode === 'ductile';
      originDot.visible(!du);
      oLab.visible(!du);
      // fatigue crack depth: reach a distance a from the origin, leaving a final zone
      const fz = 0.08 + 0.55 * p.load;
      // find a such that the region farther than a from O covers fz of the disc
      let a = 2 * R;
      if (fat) {
        let lo = 0;
        let hi = 2 * R;
        for (let it = 0; it < 30; it++) {
          const mid = (lo + hi) / 2;
          const share = FRAC.filter(([x, y]) => Math.hypot(cx + x * R - O[0], cy + y * R - O[1]) > mid).length / FRAC.length;
          if (share > fz) lo = mid;
          else hi = mid;
        }
        a = (lo + hi) / 2;
      }
      arcs.forEach((l, i) => {
        if (!fat) return l.visible(false);
        const rr = (a * (i + 1)) / arcs.length;
        const pts = range(0, 2 * Math.PI, 160).map((g) => [O[0] + rr * Math.cos(g), O[1] + rr * Math.sin(g)]).filter(([x, y]) => Math.hypot(x - cx, y - cy) < R - 0.02);
        l.visible(pts.length > 1).set(pts.length > 1 ? pts.sort((m, n) => Math.atan2(m[1] - O[1], m[0] - O[0]) - Math.atan2(n[1] - O[1], n[0] - O[0])) : []);
      });
      const g0 = rad(225);
      const rim = range(g0 + 0.01, g0 + 2 * Math.PI - 0.01, 240).map((g) => [cx + R * Math.cos(g), cy + R * Math.sin(g)]).filter(([x, y]) => Math.hypot(x - O[0], y - O[1]) > a);
      const front = range(rad(-60), rad(150), 160).map((f) => [O[0] + a * Math.cos(f), O[1] + a * Math.sin(f)]).filter(([x, y]) => Math.hypot(x - cx, y - cy) < R).reverse();
      const fzPts = [...rim, ...front];
      finalZ.visible(fat && rim.length > 2).set(fat && rim.length > 2 ? fzPts : []);
      texture.forEach((d, i) => {
        const [x, y, w] = FRAC[i];
        const X = cx + x * R;
        const Y = cy + y * R;
        let vis = false;
        if (fat) vis = Math.hypot(X - O[0], Y - O[1]) > a;
        if (du) vis = Math.hypot(x, y) < 0.72;
        if (br) vis = w < 0.3;
        d.visible(vis).set([X, Y]).color(br ? 0xeef1f4 : 0x3c4046).scale(br ? 1.1 : 1);
      });
      rivers.forEach((l, i) => {
        if (!br) return l.visible(false);
        const g = rad(15 + (i * 120) / 13);
        const pts = range(0, 1, 30).map((u) => {
          const rr = u * 2 * R;
          return [O[0] + rr * Math.cos(g) + 0.15 * Math.sin(u * 9 + i), O[1] + rr * Math.sin(g) + 0.15 * Math.cos(u * 7 + i)];
        }).filter(([x, y]) => Math.hypot(x - cx, y - cy) < R - 0.05);
        l.visible(true).set(pts);
      });
      lip.visible(du).set(range(0, 2 * Math.PI, 80).map((g) => [cx + R * Math.cos(g), cy + R * Math.sin(g)]));
      lipHole.visible(du).set(range(0, 2 * Math.PI, 80).map((g) => [cx + R * 0.74 * Math.cos(g), cy + R * 0.74 * Math.sin(g)]));
      const txt = fat
        ? [['beach marks: crack fronts, curving away from the origin', C.white], ['dark rough zone: final fracture', 0xb0b6bd], [`final zone ≈ ${Math.round(fz * 100)}% of the section`, C.yellow]]
        : du
          ? [['fibrous, dull centre: holes grew and joined', C.white], ['smooth outer ring: 45° shear lip', 0xb0b6bd], ['the shaft necked before it broke', C.yellow]]
          : [['flat, shiny, crystalline facets', C.white], ['river marks point back to the origin', 0xb0b6bd], ['little energy absorbed', C.yellow]];
      notes.forEach((n, i) => n.set(txt[i][0]).color(txt[i][1]).pos([1.3, 1.6 - i * 1.0]));
    };
  },
};

// ---------------------------------------------------------------------------
// Sintering: densifying an iron powder compact
// ---------------------------------------------------------------------------
const RHO0 = 0.6;
const kSinter = (Tc) => 6200 * Math.exp(-17860 / (Tc + 273));
const dens = (Tc, tm) => 1 - (1 - RHO0) * Math.exp(-kSinter(Tc) * tm);

export const sintering_density = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Reach at least 95% density in 60 minutes or less.',
  goal: (t) => dens(t.T, t.tm) >= 0.95 && t.tm <= 60,
  params: [
    { key: 'T', label: 'Furnace temperature (°C)', min: 900, max: 1350, step: 5, value: 1000 },
    { key: 'tm', label: 'Time at temperature (min)', min: 0, max: 120, step: 1, value: 60 },
  ],
  beats: [
    { say: 'At 1,000 °C for an hour, atoms diffuse only slowly. Necks form between the particles, but the part is still about 70% dense, full of pores.', set: { T: 1000, tm: 60 } },
    { say: 'At 1,250 °C diffusion is about ten times faster. After an hour the compact reaches about 98% density and has shrunk by about 15% in every direction.', set: { T: 1250, tm: 60 } },
    { say: 'Even at 1,250 °C, ten minutes is not enough: about 76%. Temperature and time trade against each other.', set: { T: 1250, tm: 10 } },
  ],
  readout: (t) => {
    const r = dens(t.T, t.tm);
    return [
      ['Density', `${Math.round(r * 1000) / 10}% of solid iron`],
      ['Porosity', `${Math.round((1 - r) * 1000) / 10}%`],
      ['Linear shrinkage', `${r1((1 - (RHO0 / r) ** (1 / 3)) * 100)}%`],
    ];
  },
  setup(kit) {
    const cx = -4.2;
    const cy = 0.2;
    const pr = 0.5;
    const cols = 7;
    const rows = 6;
    const parts = [];
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) parts.push({ i, j, d: kit.dot([0, 0], { r: pr, color: 0x9aa3ad }) });
    const frame = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    kit.label('\\text{green compact outline}', [cx, 3.95], { size: 11, color: C.grey });
    const P = kit.plane({ x: [0, 120, 20], y: [0.5, 1, 0.1], sx: 5.2 / 120, sy: 6.4 / 0.5, origin: [2.0, -3.4 - 0.5 * 12.8], axisAt: [0, 0.5], xEvery: 30, yEvery: 0.1, fmt: (v, ax) => (ax === 'y' ? `${Math.round(v * 100)}%` : `${v}`), xLabel: '\\text{min}', yLabel: '\\text{density}' });
    const crv = kit.line([], { color: C.blue, width: 2.5, create: false });
    kit.line([P.toW(0, 0.95), P.toW(120, 0.95)], { color: C.green, width: 1.5, dashed: true });
    kit.label('95\\%', [P.toW(120, 0)[0], P.toW(0, 0.95)[1] + 0.25], { size: 11, color: C.green, align: 'right' });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    return (p) => {
      const r = dens(p.T, p.tm);
      const sh = (RHO0 / r) ** (1 / 3);
      const sp = 2 * pr * sh;
      const glow = clamp((p.T - 900) / 450, 0, 1);
      parts.forEach(({ i, j, d }) => {
        const x = cx + (i - (cols - 1) / 2) * sp + (j % 2 ? sp / 2 : 0) - sp / 4;
        const y = cy + (j - (rows - 1) / 2) * sp * 0.87;
        d.set([x, y]).color(lerpC(0x9aa3ad, 0xe0703a, glow * 0.7));
      });
      const w0 = (cols + 0.5) * 2 * pr;
      const h0 = (rows - 1) * 2 * pr * 0.87 + 2 * pr;
      frame.set([[cx - w0 / 2, cy - h0 / 2], [cx + w0 / 2, cy - h0 / 2], [cx + w0 / 2, cy + h0 / 2], [cx - w0 / 2, cy + h0 / 2], [cx - w0 / 2, cy - h0 / 2]]);
      crv.set(range(0, 120, 120).map((x) => P.toW(x, dens(p.T, x))));
      dot.set(P.toW(p.tm, r));
    };
  },
};

// ---------------------------------------------------------------------------
// Mohr's circle
// ---------------------------------------------------------------------------
function rotStress(sx, sy, txy, thDeg) {
  const c = Math.cos(rad(2 * thDeg));
  const s = Math.sin(rad(2 * thDeg));
  const m = (sx + sy) / 2;
  const d = (sx - sy) / 2;
  return { sxp: m + d * c + txy * s, syp: m - d * c - txy * s, txyp: -d * s + txy * c };
}

export const mohr_circle = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Rotate the element to a principal direction, where the shear stress on its faces is zero.',
  goal: (t) => Math.abs(rotStress(t.sx, t.sy, t.txy, t.th).txyp) < 1,
  params: [
    { key: 'sx', label: 'σx (MPa)', min: -100, max: 100, step: 1, value: 80 },
    { key: 'sy', label: 'σy (MPa)', min: -100, max: 100, step: 1, value: 20 },
    { key: 'txy', label: 'τxy (MPa)', min: -80, max: 80, step: 1, value: 40 },
    { key: 'th', label: 'Rotate the element θ (degrees)', min: 0, max: 180, step: 0.5, value: 0 },
  ],
  beats: [
    { say: 'σx = 80, σy = 20 and τxy = 40 MPa. The x-face is the point (80, 40) on the circle, the y-face (20, −40). The circle’s centre is 50, its radius 50.', set: { sx: 80, sy: 20, txy: 40, th: 0 } },
    { say: 'Rotate the element 26.6°: the point moves 53° round the circle to the axis. No shear, and σ₁ = 100 MPa: the largest normal stress at this point.', set: { sx: 80, sy: 20, txy: 40, th: 26.6 } },
    { say: 'Pure torsion: σx = σy = 0, τ = 50. The circle is centred at zero. Rotate 45° and the faces carry pure tension and compression of 50 MPa, why chalk snaps on a 45° spiral.', set: { sx: 0, sy: 0, txy: 50, th: 45 } },
  ],
  readout: (t) => {
    const r = rotStress(t.sx, t.sy, t.txy, t.th);
    const m = (t.sx + t.sy) / 2;
    const R = Math.hypot((t.sx - t.sy) / 2, t.txy);
    return [
      ['On the rotated face: σ, τ', `${r1(r.sxp)}, ${r1(r.txyp)} MPa`],
      ['Centre, radius', `${r1(m)}, ${r1(R)} MPa`],
      ['Principal stresses σ₁, σ₂', `${r1(m + R)}, ${r1(m - R)} MPa`],
      ['Principal angle θp', `${r1((0.5 * Math.atan2(2 * t.txy, t.sx - t.sy) * 180) / Math.PI)}°`],
    ];
  },
  setup(kit) {
    // element
    const ex = -5.0;
    const ey = 0.2;
    const hs = 1.0;
    const sq = kit.fill([], { color: C.gold, opacity: 0.6 });
    const sqo = kit.line([], { color: C.white, width: 2, create: false });
    const nx = [kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3 }), kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3 })];
    const ny = [kit.arrow([0, 0], [0, 0], { color: C.teal, width: 3 }), kit.arrow([0, 0], [0, 0], { color: C.teal, width: 3 })];
    const sh = range(0, 3, 4).map(() => kit.arrow([0, 0], [0, 0], { color: C.pink, width: 2.5 }));
    const thL = kit.label('', [ex, -3.2], { size: 14, color: C.yellow });
    kit.line([[ex - 2.6, ey], [ex + 2.6, ey]], { color: C.grid, width: 1, dashed: true });
    // circle
    const P = kit.plane({ x: [-160, 160, 40], y: [-120, 120, 40], sx: 8 / 320, sy: 8 / 320, origin: [3.6, 0.2], axisAt: [0, 0], xEvery: 80, yEvery: 80, xLabel: '\\sigma', yLabel: '\\tau', grid: false });
    const circ = kit.line([], { color: C.white, width: 2, create: false });
    const diam = kit.line([], { color: C.yellow, width: 2, create: false });
    const px = kit.dot([0, 0], { r: 0.14, color: C.blue, z: 6 });
    const py = kit.dot([0, 0], { r: 0.12, color: C.teal, z: 6 });
    const p1 = kit.dot([0, 0], { r: 0.1, color: C.red, z: 5 });
    const p2 = kit.dot([0, 0], { r: 0.1, color: C.red, z: 5 });
    const l1 = kit.label('\\sigma_1', [0, 0], { size: 13, color: C.red });
    const l2 = kit.label('\\sigma_2', [0, 0], { size: 13, color: C.red });
    const lx = kit.label('x', [0, 0], { size: 13, color: C.blue });
    return (p) => {
      const r = rotStress(p.sx, p.sy, p.txy, p.th);
      const a = rad(p.th);
      const u = [Math.cos(a), Math.sin(a)];
      const v = [-Math.sin(a), Math.cos(a)];
      const corner = (i, j) => [ex + hs * (i * u[0] + j * v[0]), ey + hs * (i * u[1] + j * v[1])];
      const cs = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
      sq.set(cs);
      sqo.set([...cs, cs[0]]);
      const k = 0.012;
      const face = (dir, s) => {
        const c0 = [ex + hs * dir[0], ey + hs * dir[1]];
        const L = s * k;
        return L >= 0 ? [c0, [c0[0] + dir[0] * L, c0[1] + dir[1] * L]] : [[c0[0] + dir[0] * -L, c0[1] + dir[1] * -L], c0];
      };
      [[u, 1], [u, -1]].forEach(([d, sg], i) => {
        const dir = [d[0] * sg, d[1] * sg];
        const [A, B] = face(dir, r.sxp);
        nx[i].visible(Math.abs(r.sxp) > 2).set(A, B);
      });
      [[v, 1], [v, -1]].forEach(([d, sg], i) => {
        const dir = [d[0] * sg, d[1] * sg];
        const [A, B] = face(dir, r.syp);
        ny[i].visible(Math.abs(r.syp) > 2).set(A, B);
      });
      const T = r.txyp * k;
      const shear = [
        [[ex + hs * 1.15 * u[0] - v[0] * T / 2, ey + hs * 1.15 * u[1] - v[1] * T / 2], [ex + hs * 1.15 * u[0] + v[0] * T / 2, ey + hs * 1.15 * u[1] + v[1] * T / 2]],
        [[ex - hs * 1.15 * u[0] + v[0] * T / 2, ey - hs * 1.15 * u[1] + v[1] * T / 2], [ex - hs * 1.15 * u[0] - v[0] * T / 2, ey - hs * 1.15 * u[1] - v[1] * T / 2]],
        [[ex + hs * 1.15 * v[0] - u[0] * T / 2, ey + hs * 1.15 * v[1] - u[1] * T / 2], [ex + hs * 1.15 * v[0] + u[0] * T / 2, ey + hs * 1.15 * v[1] + u[1] * T / 2]],
        [[ex - hs * 1.15 * v[0] + u[0] * T / 2, ey - hs * 1.15 * v[1] + u[1] * T / 2], [ex - hs * 1.15 * v[0] - u[0] * T / 2, ey - hs * 1.15 * v[1] - u[1] * T / 2]],
      ];
      sh.forEach((s, i) => s.visible(Math.abs(r.txyp) > 2).set(shear[i][0], shear[i][1]));
      thL.set(`\\theta = ${r1(p.th)}°`);
      const m = (p.sx + p.sy) / 2;
      const R = Math.hypot((p.sx - p.sy) / 2, p.txy);
      circ.set(range(0, 2 * Math.PI, 90).map((g) => P.toW(m + R * Math.cos(g), R * Math.sin(g))));
      const X = P.toW(r.sxp, r.txyp);
      const Y = P.toW(r.syp, -r.txyp);
      diam.set([X, Y]);
      px.set(X);
      py.set(Y);
      lx.pos([X[0] + 0.3, X[1] + 0.3]);
      p1.set(P.toW(m + R, 0));
      p2.set(P.toW(m - R, 0));
      l1.pos([P.toW(m + R, 0)[0] + 0.3, P.toW(0, 0)[1] - 0.35]);
      l2.pos([P.toW(m - R, 0)[0] - 0.3, P.toW(0, 0)[1] - 0.35]);
    };
  },
};

// ---------------------------------------------------------------------------
// Rolling graphene into a carbon nanotube
// ---------------------------------------------------------------------------
const ACC = 0.246; // nm, lattice constant
const A1 = [ACC, 0];
const A2 = [ACC / 2, (ACC * Math.sqrt(3)) / 2];
const TUBE_L = 2.2; // nm
const tubeD = (n, m) => (ACC * Math.sqrt(n * n + n * m + m * m)) / Math.PI;
function sheet(n, m) {
  const Cv = [n * A1[0] + m * A2[0], n * A1[1] + m * A2[1]];
  const Lc = Math.hypot(Cv[0], Cv[1]);
  const c = [Cv[0] / Lc, Cv[1] / Lc];
  const tt = [-c[1], c[0]];
  const B = [(A1[0] + A2[0]) / 3, (A1[1] + A2[1]) / 3];
  const out = [];
  const N = 40;
  for (let i = -N; i <= N; i++) {
    for (let j = -N; j <= N; j++) {
      for (const off of [[0, 0], B]) {
        const x = i * A1[0] + j * A2[0] + off[0];
        const y = i * A1[1] + j * A2[1] + off[1];
        const u = x * c[0] + y * c[1];
        const v = x * tt[0] + y * tt[1];
        if (u >= -1e-6 && u < Lc - 1e-6 && v >= 0 && v < TUBE_L) out.push([u, v]);
      }
    }
  }
  return { Lc, pts: out.slice(0, 700) };
}

export const nanotube_roll = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make a chiral tube (n ≠ m, m > 0) that still conducts like a metal.',
  goal: (t) => (t.n - t.m) % 3 === 0 && t.n !== t.m && t.m > 0,
  params: [
    { key: 'n', label: 'n', min: 1, max: 12, step: 1, value: 10 },
    { key: 'm', label: 'm', min: 0, max: 12, step: 1, value: 10 },
    { key: 'roll', label: 'Roll the sheet', min: 0, max: 1, step: 0.01, value: 0 },
  ],
  beats: [
    { say: 'A flat graphene strip. The yellow arrow is the chiral vector for (10, 10): its two ends are the atoms that will meet when the sheet is rolled.', set: { n: 10, m: 10, roll: 0 } },
    { say: 'Rolled up, (10, 10) is an armchair tube 1.36 nm across. Since n − m = 0, a multiple of 3, it conducts like a metal.', set: { n: 10, m: 10, roll: 1 } },
    { say: 'Change to (10, 0), a zigzag tube. Now n − m = 10, not a multiple of 3: a semiconductor, with a band gap, from the same carbon sheet.', set: { n: 10, m: 0, roll: 1 } },
  ],
  readout: (t) => {
    const type = t.n === t.m ? 'armchair' : t.m === 0 || t.n === 0 ? 'zigzag' : 'chiral';
    return [
      ['Indices (n, m)', `(${t.n}, ${t.m})`],
      ['Diameter', `${r2(tubeD(t.n, t.m))} nm`],
      ['Type', type],
      ['Electrical', (t.n - t.m) % 3 === 0 ? 'metallic' : 'semiconducting'],
    ];
  },
  setup(kit) {
    const sc = 1.7;
    const dots = range(0, 699, 700).map(() => kit.dot([0, 0], { r: 0.08, color: C.grey }));
    const cvec = kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 3 });
    const cl = kit.label('\\vec{C} = n\\vec{a}_1 + m\\vec{a}_2', [0, 0], { size: 13, color: C.yellow });
    const verdict = kit.label('', [0, 4.0], { size: 15, tex: false });
    let key = '';
    let S = null;
    return (p, t) => {
      const k2 = `${t.n},${t.m}`;
      if (k2 !== key) {
        key = k2;
        S = sheet(t.n, t.m);
      }
      const { Lc, pts } = S;
      const roll = clamp(p.roll, 0, 1);
      const kap = roll < 1e-3 ? 0 : (roll * 2 * Math.PI) / Lc;
      const w = Math.min(sc, 13 / Lc);
      const proj = (u, v) => {
        let x = u - Lc / 2;
        let z = 0;
        if (kap > 0) {
          x = Math.sin(kap * (u - Lc / 2)) / kap;
          z = (1 - Math.cos(kap * (u - Lc / 2))) / kap;
        }
        return [x * w, (v - TUBE_L / 2) * sc * 1.25 - 0.3 + z * w * 0.25, z];
      };
      const zMax = kap > 0 ? 2 / kap : 1;
      dots.forEach((d, i) => {
        if (i >= pts.length) return d.visible(false);
        const [u, v] = pts[i];
        const [X, Y, z] = proj(u, v);
        const back = kap > 0 ? z / zMax : 0;
        d.visible(true).set([X, Y]).color(lerpC(C.white, 0x3a4250, back * 0.85)).scale(1 - 0.3 * back);
      });
      const st = proj(0, 0.05);
      const en = proj(Lc - 1e-6, 0.05);
      cvec.visible(roll < 0.35).set([st[0], st[1] - 0.25], [en[0], en[1] - 0.25]);
      cl.visible(roll < 0.35).pos([(st[0] + en[0]) / 2, st[1] - 0.7]);
      verdict.set(`(${t.n}, ${t.m}): ${r2(tubeD(t.n, t.m))} nm, ${(t.n - t.m) % 3 === 0 ? 'metallic' : 'semiconducting'}`).color((t.n - t.m) % 3 === 0 ? C.yellow : C.teal);
    };
  },
};
