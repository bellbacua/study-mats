// Scenes for the Energy Materials specialization.
import { C } from '../theme';
import { clamp, range } from '../kit';

const r0 = (v) => `${Math.round(v)}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const kg = (m) => (m >= 1e6 ? `${r1(m / 1e6)} million kg` : m >= 1000 ? `${r1(m / 1000)} t` : m >= 10 ? `${r0(m)} kg` : `${r1(m)} kg`);

// ---------------------------------------------------------------------------
// Energy per kilogram: mass of each store for the same useful energy (log bars)
// ---------------------------------------------------------------------------
const STORES = [
  { name: 'Hydrogen (fuel cell, tank not counted)', e: 120e6, eta: 0.5, color: C.teal },
  { name: 'Diesel (engine)', e: 46e6, eta: 0.3, color: C.gold },
  { name: 'Lithium-ion cells (motor)', e: 0.9e6, eta: 0.9, color: C.blue },
  { name: 'Flywheel', e: 0.36e6, eta: 0.9, color: C.purple },
  { name: 'Lead-acid battery', e: 0.126e6, eta: 0.85, color: C.grey },
  { name: 'Water 100 m up a dam', e: 981, eta: 0.9, color: C.green },
];
const massFor = (s, kWh) => (kWh * 3.6e6) / (s.e * s.eta);

export const energy_density = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find how much useful energy makes the lithium-ion cells weigh about 500 kg (between 450 and 550 kg).',
  goal: (t) => massFor(STORES[2], t.E) > 450 && massFor(STORES[2], t.E) < 550,
  params: [{ key: 'E', label: 'Useful energy needed (kWh)', min: 1, max: 200, step: 1, value: 20 }],
  beats: [
    { say: '1 kWh of useful work: enough to run an electric fan for about 16 hours, or to lift a car 300 m. Diesel needs a quarter of a kilogram; the dam needs over 4 tonnes of water.', set: { E: 1 } },
    { say: '20 kWh, a small electric car’s 100 km. Diesel: about 5 kg. Lithium-ion cells: about 90 kg, still about 17 times heavier.', set: { E: 20 } },
    { say: '200 kWh, an electric jeepney’s day. Lead-acid would need almost 7 tonnes, which is why nobody builds it that way.', set: { E: 200 } },
  ],
  readout: (p) => [
    ['Diesel', kg(massFor(STORES[1], p.E))],
    ['Lithium-ion cells', kg(massFor(STORES[2], p.E))],
    ['Li-ion ÷ diesel', `${r0(massFor(STORES[2], p.E) / massFor(STORES[1], p.E))} × heavier`],
    ['Water 100 m up', kg(massFor(STORES[5], p.E))],
  ],
  setup(kit) {
    const x0 = -1.6;
    const x1 = 7.4;
    const lo = -1;
    const hi = 7;
    const xOf = (m) => x0 + ((x1 - x0) * (clamp(Math.log10(m), lo, hi) - lo)) / (hi - lo);
    const top = 3.0;
    const gap = 1.05;
    for (let d = lo; d <= hi; d++) {
      kit.line([[xOf(10 ** d), top + 0.55], [xOf(10 ** d), top - gap * 5 - 0.55]], { color: C.grid, width: 1, opacity: 0.7 });
      const t = d === -1 ? '0.1' : d === 0 ? '1' : d === 1 ? '10' : d === 2 ? '100' : `${['1', '10', '100', '1000', '10 000'][d - 3] ?? `10^{${d - 3}}`} t`;
      kit.label(d >= 3 ? `\\text{${t}}` : t, [xOf(10 ** d), top - gap * 5 - 0.85], { size: 11 });
    }
    kit.label('\\text{mass needed (kg, each step ×10)}', [(x0 + x1) / 2, top - gap * 5 - 1.35], { size: 12, color: C.axis });
    const bars = STORES.map((s, i) => {
      const y = top - gap * i;
      kit.label(`\\text{${s.name}}`, [x0 - 0.2, y], { size: 11, align: 'right', color: s.color });
      return { r: kit.rect(x0, y - 0.32, 0.01, 0.64, { color: s.color, opacity: 0.85, stroke: false }), m: kit.label('', [x0, y], { size: 11, align: 'left', tex: false }), y, s };
    });
    kit.label('\\text{same useful energy from each store}', [(x0 + x1) / 2 - 2, 4.1], { size: 13 });
    return (p) => {
      for (const b of bars) {
        const m = massFor(b.s, p.E);
        const w = Math.max(0.01, xOf(m) - x0);
        b.r.set(x0, b.y - 0.32, w, 0.64);
        b.m.set(kg(m)).pos([x0 + w + 0.12, b.y]);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Pairing electrodes: grams per amp-hour and the voltage ladder
// ---------------------------------------------------------------------------
const CATH = {
  lco: { name: 'LiCoO₂ (LCO)', q: 140, v: 3.9 },
  nmc: { name: 'NMC (nickel-rich)', q: 180, v: 3.8 },
  lfp: { name: 'LiFePO₄ (LFP)', q: 160, v: 3.4 },
  nca: { name: 'NCA', q: 200, v: 3.8 },
};
const ANOD = {
  gr: { name: 'Graphite', q: 360, v: 0.1 },
  sib: { name: 'Silicon–graphite blend', q: 1000, v: 0.2 },
  si: { name: 'Silicon', q: 3500, v: 0.3 },
  lto: { name: 'Li₄Ti₅O₁₂ (LTO)', q: 175, v: 1.55 },
};
const cellQ = (p) => 1 / (1 / CATH[p.c].q + 1 / ANOD[p.a].q);
const cellV = (p) => CATH[p.c].v - ANOD[p.a].v;
const cellE = (p) => cellQ(p) * cellV(p);

export const electrode_capacity = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a pair of electrodes that stores more than 650 Wh per kilogram of electrode material.',
  goal: (t) => cellE(t) > 650,
  params: [
    { key: 'c', label: 'Cathode (positive)', type: 'choice', value: 'lco', options: Object.entries(CATH).map(([k, d]) => ({ value: k, label: `${d.name}, ${d.q} mAh/g` })) },
    { key: 'a', label: 'Anode (negative)', type: 'choice', value: 'gr', options: Object.entries(ANOD).map(([k, d]) => ({ value: k, label: `${d.name}, ${d.q} mAh/g` })) },
  ],
  beats: [
    { say: 'The 1991 pairing: LiCoO₂ with graphite. Each amp-hour needs about 7 g of cathode but under 3 g of anode.', set: { c: 'lco', a: 'gr' } },
    { say: 'Swap in pure silicon, ten times graphite. The anode part almost vanishes, but the cathode stays: only about a third more per gram.', set: { c: 'lco', a: 'si' } },
    { say: 'A better cathode, NMC, with a silicon blend: the kind of cell newer electric cars aim for.', set: { c: 'nmc', a: 'sib' } },
    { say: 'LFP with LTO: very safe and long-lived (buses, grid storage), but the voltage gap shrinks to 1.85 V, so the energy is low.', set: { c: 'lfp', a: 'lto' } },
  ],
  readout: (p) => [
    ['Cell voltage', `${r2(cellV(p))} V`],
    ['Capacity per g of both electrodes', `${r0(cellQ(p))} mAh/g`],
    ['Energy per kg of electrodes', `${r0(cellE(p))} Wh/kg`],
    ['Whole cell (about half)', `≈ ${r0(cellE(p) / 2)} Wh/kg`],
  ],
  setup(kit) {
    // voltage ladder (vs lithium metal)
    const lx = -6.4;
    const ly = -3.2;
    const vs = 1.6;
    kit.line([[lx, ly], [lx, ly + 4.2 * vs]], { color: C.axis, width: 2 });
    for (let v = 0; v <= 4; v++) {
      kit.line([[lx - 0.12, ly + v * vs], [lx, ly + v * vs]], { color: C.axis, width: 2 });
      kit.label(`${v}\\,\\text{V}`, [lx - 0.2, ly + v * vs], { size: 11, align: 'right' });
    }
    kit.label('\\text{voltage vs lithium}', [lx + 0.3, ly + 4.2 * vs + 0.05], { size: 11, align: 'left', color: C.axis });
    const cL = kit.line([], { color: C.red, width: 4, create: false });
    const aL = kit.line([], { color: C.blue, width: 4, create: false });
    const gapA = kit.arrow([lx + 1.0, ly], [lx + 1.0, ly + 1], { color: C.yellow, width: 2.5 });
    const gapT = kit.label('', [lx + 1.2, ly], { size: 12, color: C.yellow, align: 'left' });
    const cT = kit.label('\\text{cathode}', [lx + 1.8, ly], { size: 11, color: C.red, align: 'left' });
    const aT = kit.label('\\text{anode}', [lx + 1.8, ly], { size: 11, color: C.blue, align: 'left' });
    // grams per Ah stacked bar
    const bx = -0.6;
    const by = -3.2;
    const gs = 0.5;
    kit.line([[bx - 0.3, by], [bx + 3.2, by]], { color: C.axis, width: 2 });
    kit.line([[bx - 0.3, by], [bx - 0.3, by + 13 * gs]], { color: C.axis, width: 2 });
    for (let g = 0; g <= 12; g += 2) kit.label(`${g}`, [bx - 0.4, by + g * gs], { size: 11, align: 'right', tex: false });
    kit.label('\\text{grams per amp-hour}', [bx - 0.3, by + 13 * gs + 0.3], { size: 11, color: C.axis });
    const cB = kit.rect(bx + 0.4, by, 2.2, 0.01, { color: C.red, opacity: 0.8, stroke: false });
    const aB = kit.rect(bx + 0.4, by, 2.2, 0.01, { color: C.blue, opacity: 0.8, stroke: false });
    const cG = kit.label('', [bx + 1.5, by], { size: 11, tex: false });
    const aG = kit.label('', [bx + 1.5, by], { size: 11, tex: false });
    // energy bar
    const ex = 4.6;
    const es = 6.6 / 800;
    kit.line([[ex - 0.3, by], [ex + 2.4, by]], { color: C.axis, width: 2 });
    for (let e = 0; e <= 800; e += 200) {
      kit.line([[ex - 0.3, by + e * es], [ex + 2.4, by + e * es]], { color: C.grid, width: 1, opacity: 0.7 });
      kit.label(`${e}`, [ex - 0.4, by + e * es], { size: 11, align: 'right', tex: false });
    }
    kit.line([[ex - 0.3, by + 650 * es], [ex + 2.4, by + 650 * es]], { color: C.green, width: 1.5, dashed: true });
    kit.label('\\text{Wh per kg of electrodes}', [ex + 1.0, by + 800 * es + 0.3], { size: 11, color: C.axis });
    const eB = kit.rect(ex + 0.2, by, 1.7, 0.01, { color: C.yellow, opacity: 0.85, stroke: false });
    return (p) => {
      const c = CATH[p.c];
      const a = ANOD[p.a];
      const yc = ly + c.v * vs;
      const ya = ly + a.v * vs;
      cL.set([[lx, yc], [lx + 1.6, yc]]);
      aL.set([[lx, ya], [lx + 1.6, ya]]);
      gapA.set([lx + 1.0, ya], [lx + 1.0, yc]);
      gapT.set(`${r2(cellV(p))}\\,\\text{V}`).pos([lx + 1.15, (ya + yc) / 2]);
      cT.pos([lx + 1.75, yc + 0.25]);
      aT.pos([lx + 1.75, ya - 0.25]);
      const gc = 1000 / c.q;
      const ga = 1000 / a.q;
      aB.set(bx + 0.4, by, 2.2, Math.max(0.01, ga * gs));
      cB.set(bx + 0.4, by + ga * gs, 2.2, Math.max(0.01, gc * gs));
      aG.set(`anode ${r1(ga)} g`).pos([bx + 1.5, by + (ga * gs) / 2]).visible(ga * gs > 0.4);
      cG.set(`cathode ${r1(gc)} g`).pos([bx + 1.5, by + ga * gs + (gc * gs) / 2]);
      eB.set(ex + 0.2, by, 1.7, Math.max(0.01, cellE(p) * es));
    };
  },
};

// ---------------------------------------------------------------------------
// Solar cells: sunlight spectrum, band gap, detailed-balance limit
// ---------------------------------------------------------------------------
const kB = 8.617e-5; // eV/K
const TS = 5778;
const TC = 300;
const ES = range(0.02, 6, 600);
const dE = ES[1] - ES[0];
const bb = (E) => (E * E) / Math.expm1(E / (kB * TS)); // photons per eV (relative)
const PW = ES.reduce((s, E) => s + E * bb(E) * dE, 0);
// photon flux scaled so the sunlight carries 1000 W/m²
const QE = 1.602e-19;
const fluxScale = 1000 / (PW * QE);
const photonsAbove = (Eg) => ES.reduce((s, E) => (E >= Eg ? s + bb(E) * dE : s), 0) * fluxScale;
const ultimate = (Eg) => (Eg * photonsAbove(Eg) * QE) / 1000;
// cell's own glow (detailed balance), A/m²
const J0 = (Eg) => {
  const kT = kB * TC;
  const pref = (2 * Math.PI * (QE ** 3)) / (6.626e-34 ** 3 * (3e8) ** 2);
  return QE * pref * kT * (Eg * Eg + 2 * Eg * kT + 2 * kT * kT) * Math.exp(-Eg / kT);
};
const sq = (Eg) => {
  const Jsc = QE * photonsAbove(Eg);
  const j0 = J0(Eg);
  const kT = kB * TC;
  let best = 0;
  const Voc = kT * Math.log(Jsc / j0 + 1);
  for (let i = 1; i <= 200; i++) {
    const V = (Voc * i) / 200;
    best = Math.max(best, V * (Jsc - j0 * Math.expm1(V / kT)));
  }
  return best / 1000;
};
const SQ_TABLE = range(0.4, 3.2, 281).map((Eg) => [Eg, sq(Eg)]);
const sqAt = (Eg) => {
  const i = clamp(Math.round((Eg - 0.4) / 0.01), 0, SQ_TABLE.length - 1);
  return SQ_TABLE[i][1];
};
const SQ_BEST = SQ_TABLE.reduce((b, r) => (r[1] > b[1] ? r : b));
const SPEC_MAX = Math.max(...ES.map((E) => E * bb(E)));

export const solar_bandgap = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the band gap that gives the highest possible efficiency for a single-junction cell (within 0.3 percentage points of the best).',
  goal: (t) => sqAt(t.Eg) > SQ_BEST[1] - 0.003,
  params: [{ key: 'Eg', label: 'Band gap (eV)', min: 0.5, max: 3, step: 0.01, value: 1.12 }],
  beats: [
    { say: 'Silicon, 1.12 eV. The grey photons pass through; the yellow part is what the cell can keep; the red part is the extra energy lost as heat.', set: { Eg: 1.12 } },
    { say: 'A tiny gap, 0.5 eV, catches almost every photon, but keeps only 0.5 eV from each one. Most of the sunlight becomes heat.', set: { Eg: 0.5 } },
    { say: 'A wide gap, 2.5 eV, keeps a lot from each photon it catches, but most photons pass straight through.', set: { Eg: 2.5 } },
    { say: 'Gallium arsenide, 1.42 eV, sits near the best compromise. It holds the single-junction record, used on satellites.', set: { Eg: 1.42 } },
  ],
  readout: (p) => {
    const tot = photonsAbove(0.02);
    return [
      ['Light it can catch', `wavelengths below ${r0(1240 / p.Eg)} nm`],
      ['Photons caught', `${r0((100 * photonsAbove(p.Eg)) / tot)}%`],
      ['Kept if no other losses', `${r0(100 * ultimate(p.Eg))}%`],
      ['Best possible efficiency', `${r1(100 * sqAt(p.Eg))}%`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 4, 0.5], y: [0, 1.1, 0.2], sx: 12.4 / 4, sy: 6.6 / 1.1, origin: [-6.4, -3.4], xEvery: 0.5, yEvery: 0.2, fmt: (v, ax) => (ax === 'y' ? '' : `${v}`), xLabel: '\\text{photon energy (eV)}', yLabel: '\\text{sunlight power (relative)}' });
    const s = (E) => (E * bb(E)) / SPEC_MAX;
    const xs = range(0.02, 4, 400);
    kit.line(xs.map((E) => P.toW(E, s(E))), { color: C.white, width: 2 });
    const lost = kit.fill([], { color: C.grey, opacity: 0.45 });
    const heat = kit.fill([], { color: C.red, opacity: 0.55 });
    const keep = kit.fill([], { color: C.yellow, opacity: 0.75 });
    const gapL = kit.line([], { color: C.blue, width: 3, create: false });
    const gapT = kit.label('', [0, 0], { size: 12, color: C.blue, align: 'left' });
    kit.label('\\text{grey: passes through}', [3.6, 2.6], { size: 12, color: C.grey, align: 'left' });
    kit.label('\\text{yellow: kept}', [3.6, 2.15], { size: 12, color: C.yellow, align: 'left' });
    kit.label('\\text{red: lost as heat}', [3.6, 1.7], { size: 12, color: C.red, align: 'left' });
    const vis = [[1.65, 'violet'], [3.1, 'blue']];
    void vis;
    kit.rect(P.toW(1.65, 0)[0], -4.0, P.toW(3.1, 0)[0] - P.toW(1.65, 0)[0], 0.12, { color: C.purple, opacity: 0.7, stroke: false });
    kit.label('\\text{visible light}', [P.toW(3.1, 0)[0] + 0.15, -3.94], { size: 10, color: C.purple, align: 'left' });
    return (p) => {
      const Eg = p.Eg;
      const below = xs.filter((E) => E <= Eg);
      const above = xs.filter((E) => E >= Eg);
      lost.set(below.length > 1 ? [...below.map((E) => P.toW(E, s(E))), P.toW(Eg, 0), P.toW(0.02, 0)] : []);
      // kept: Eg/E of each photon's energy
      const k = (E) => (s(E) * Eg) / E;
      heat.set([...above.map((E) => P.toW(E, s(E))), ...[...above].reverse().map((E) => P.toW(E, k(E)))]);
      keep.set([...above.map((E) => P.toW(E, k(E))), P.toW(4, 0), P.toW(Eg, 0)]);
      gapL.set([P.toW(Eg, 0), P.toW(Eg, 1.05)]);
      gapT.set(`E_g = ${r2(Eg)}\\,\\text{eV}`).pos([P.toW(Eg, 0)[0] + 0.12, P.toW(0, 1.02)[1]]);
    };
  },
};

// ---------------------------------------------------------------------------
// Fuel cell polarisation curve
// ---------------------------------------------------------------------------
const FC = { E: 1.229, A: 0.05, i0: 1e-3, iN: 0.002, B: 0.05, iL: 1.6 };
const losses = (i, r) => ({
  act: FC.A * Math.log((i + FC.iN) / FC.i0),
  ohm: i * r,
  conc: -FC.B * Math.log(Math.max(1e-6, 1 - i / FC.iL)),
});
const fcV = (i, r) => {
  const l = losses(i, r);
  return Math.max(0, FC.E - l.act - l.ohm - l.conc);
};
const bestI = (r) => range(0, 1.58, 791).reduce((b, i) => (i * fcV(i, r) > b * fcV(b, r) ? i : b), 0);

export const fuel_cell_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'For the membrane you choose, find the current that gives the most power (within 0.05 A/cm²).',
  goal: (t) => Math.abs(t.i - bestI(t.r)) < 0.05,
  params: [
    { key: 'i', label: 'Current drawn (A per cm²)', min: 0, max: 1.58, step: 0.01, value: 0.02 },
    { key: 'r', label: 'Membrane resistance (Ω·cm²)', min: 0.05, max: 0.4, step: 0.01, value: 0.15 },
  ],
  beats: [
    { say: 'At almost no current the cell already sits below 1.1 V, not 1.23 V: getting the reaction going on the catalyst costs voltage (activation loss).', set: { i: 0.02, r: 0.15 } },
    { say: 'In the middle the voltage falls in a straight line: the membrane’s resistance, V = iR, like any resistor.', set: { i: 0.8, r: 0.15 } },
    { say: 'Near the limit, gas cannot reach the catalyst fast enough and the voltage falls off a cliff.', set: { i: 1.5, r: 0.15 } },
    { say: 'A thinner membrane (lower resistance) keeps more voltage at high current, so more power from the same cell.', set: { i: 1.0, r: 0.05 } },
  ],
  readout: (p) => {
    const V = fcV(p.i, p.r);
    const l = losses(p.i, p.r);
    return [
      ['Cell voltage', `${r2(V)} V`],
      ['Power', `${r2(p.i * V)} W/cm²`],
      ['Efficiency (V ÷ 1.48 V)', `${r0((100 * V) / 1.48)}%`],
      ['Losses: activation / resistance / gas', `${r2(l.act)} / ${r2(l.ohm)} / ${r2(l.conc)} V`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 1.6, 0.2], y: [0, 1.4, 0.2], sx: 11.6 / 1.6, sy: 7 / 1.4, origin: [-6.2, -3.6], xEvery: 0.4, yEvery: 0.2, fmt: (v) => `${Math.round(v * 10) / 10}`, xLabel: 'i\\,(\\text{A/cm}^2)', yLabel: 'V\\,(\\text{volts})' });
    kit.line([P.toW(0, FC.E), P.toW(1.6, FC.E)], { color: C.green, width: 1.5, dashed: true });
    kit.label('1.23\\,\\text{V: the most a hydrogen cell can give}', [P.toW(0.8, FC.E + 0.07)[0], P.toW(0, FC.E + 0.07)[1]], { size: 11, color: C.green });
    const curve = kit.line([], { color: C.yellow, width: 3, create: false });
    const pow = kit.line([], { color: C.pink, width: 2, dashed: true, create: false });
    kit.label('\\text{power} = V \\times i', [4.0, -2.4], { size: 11, color: C.pink });
    const segA = kit.line([], { color: C.red, width: 7, create: false });
    const segO = kit.line([], { color: C.gold, width: 7, create: false });
    const segC = kit.line([], { color: C.purple, width: 7, create: false });
    kit.label('\\text{voltage lost to activation}', [-5.2, -0.4], { size: 11, color: C.red, align: 'left' });
    kit.label('\\text{resistance}', [-5.2, -0.8], { size: 11, color: C.gold, align: 'left' });
    kit.label('\\text{gas supply}', [-5.2, -1.2], { size: 11, color: C.purple, align: 'left' });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    return (p) => {
      const is = range(0, 1.58, 300);
      curve.set(is.map((i) => P.toW(i, fcV(i, p.r))));
      pow.set(is.map((i) => P.toW(i, i * fcV(i, p.r))));
      const l = losses(p.i, p.r);
      const x = P.toW(p.i, 0)[0];
      const y = (v) => P.toW(0, v)[1];
      const a1 = FC.E - l.act;
      const o1 = a1 - l.ohm;
      const c1 = Math.max(0, o1 - l.conc);
      segA.set([[x, y(FC.E)], [x, y(a1)]]);
      segO.set([[x, y(a1)], [x, y(Math.max(0, o1))]]);
      segC.set([[x, y(Math.max(0, o1))], [x, y(c1)]]);
      dot.set(P.toW(p.i, fcV(p.i, p.r)));
    };
  },
};

// ---------------------------------------------------------------------------
// Thermoelectric efficiency vs Carnot
// ---------------------------------------------------------------------------
const TCOLD = 300;
const carnot = (Th) => (Th - TCOLD) / Th;
const teEta = (Th, ZT) => {
  const s = Math.sqrt(1 + ZT);
  return carnot(Th) * ((s - 1) / (s + TCOLD / Th));
};

export const thermoelectric_zt = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Reach 10% efficiency with the hot side no hotter than 600 K.',
  goal: (t) => t.Th <= 600 && teEta(t.Th, t.ZT) >= 0.1,
  params: [
    { key: 'Th', label: 'Hot side (K), cold side 300 K', min: 320, max: 1000, step: 10, value: 400 },
    { key: 'ZT', label: 'Material ZT', min: 0.2, max: 3, step: 0.1, value: 1 },
  ],
  beats: [
    { say: 'Hot side 400 K, a little above boiling water, with ZT = 1. Carnot allows 25%, the material gets about 5%.', set: { Th: 400, ZT: 1 } },
    { say: 'A truck exhaust, 500 K. Carnot 40%, the thermoelectric about 8%.', set: { Th: 500, ZT: 1 } },
    { say: 'Silicon–germanium in space generators runs near 1000 K, with ZT about 0.6: about 12% at best, and real units get about half of that.', set: { Th: 1000, ZT: 0.6 } },
    { say: 'A future material with ZT = 3 would almost double that, to about 15%, close to small engines.', set: { Th: 500, ZT: 3 } },
  ],
  readout: (p) => [
    ['Carnot limit', `${r1(100 * carnot(p.Th))}%`],
    ['Thermoelectric (best)', `${r1(100 * teEta(p.Th, p.ZT))}%`],
    ['Share of Carnot', `${r0((100 * teEta(p.Th, p.ZT)) / carnot(p.Th))}%`],
    ['100 couples, S = 400 µV/K each', `${r1(100 * 400e-6 * (p.Th - TCOLD))} V`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [300, 1000, 100], y: [0, 0.7, 0.1], sx: 8.4 / 700, sy: 7 / 0.7, origin: [-1.8 - 300 * (8.4 / 700), -3.6], xEvery: 100, yEvery: 0.1, axisAt: [300, 0], fmt: (v, ax) => (ax === 'y' ? `${Math.round(v * 100)}%` : `${v}`), xLabel: 'T_h\\,(\\text{K})', yLabel: '\\text{efficiency}' });
    const ts = range(310, 1000, 140);
    kit.line(ts.map((T) => P.toW(T, carnot(T))), { color: C.green, width: 2, dashed: true });
    kit.label('\\text{Carnot}', [P.toW(900, carnot(900) + 0.04)[0], P.toW(0, carnot(900) + 0.04)[1]], { size: 12, color: C.green });
    const cur = kit.line([], { color: C.yellow, width: 3, create: false });
    const curT = kit.label('', [0, 0], { size: 12, color: C.yellow });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    // device sketch
    const dx = -6.6;
    const hot = kit.rect(dx - 0.4, 2.0, 3.4, 0.4, { color: C.red, opacity: 0.9, stroke: false });
    kit.rect(dx - 0.4, -2.4, 3.4, 0.4, { color: C.blue, opacity: 0.9, stroke: false });
    kit.label('\\text{hot side}', [dx + 1.3, 2.75], { size: 11, color: C.red });
    kit.label('\\text{cold side, 300 K}', [dx + 1.3, -2.75], { size: 11, color: C.blue });
    kit.rect(dx, -2.0, 0.9, 4.0, { color: C.gold, opacity: 0.35 });
    kit.rect(dx + 1.7, -2.0, 0.9, 4.0, { color: C.purple, opacity: 0.35 });
    kit.label('n', [dx + 0.45, -1.6], { size: 13 });
    kit.label('p', [dx + 2.15, -1.6], { size: 13 });
    const ce = range(0, 5, 6).map(() => kit.dot([0, 0], { r: 0.08, color: C.blue, z: 5 }));
    const ch = range(0, 5, 6).map(() => kit.dot([0, 0], { r: 0.08, color: C.red, z: 5 }));
    void hot;
    return (p, _t, time) => {
      cur.set(ts.map((T) => P.toW(T, teEta(T, p.ZT))));
      const e = teEta(p.Th, p.ZT);
      dot.set(P.toW(p.Th, e));
      curT.set(`ZT = ${r1(p.ZT)}`).pos([P.toW(960, 0)[0], P.toW(0, teEta(960, p.ZT) + 0.035)[1]]);
      const sp = 0.15 + (p.Th - TCOLD) / 1400;
      ce.forEach((d, i) => d.set([dx + 0.2 + (i % 3) * 0.25, 1.8 - ((i / 6 + time * sp) % 1) * 3.6]));
      ch.forEach((d, i) => d.set([dx + 1.9 + (i % 3) * 0.25, 1.8 - ((i / 6 + time * sp + 0.5) % 1) * 3.6]));
    };
  },
};

// ---------------------------------------------------------------------------
// Geothermal separator: steam fraction vs silica saturation
// ---------------------------------------------------------------------------
const STEAM = [[100, 419.1, 2256.4], [120, 503.8, 2202.1], [140, 589.2, 2144.3], [160, 675.5, 2082.0], [180, 763.1, 2014.6], [200, 852.3, 1939.7], [220, 943.6, 1857.4], [240, 1037.6, 1766.0]];
const steamProp = (t, k) => {
  for (let i = 0; i < STEAM.length - 1; i++)
    if (t <= STEAM[i + 1][0]) {
      const f = (t - STEAM[i][0]) / (STEAM[i + 1][0] - STEAM[i][0]);
      return STEAM[i][k] + f * (STEAM[i + 1][k] - STEAM[i][k]);
    }
  return STEAM[STEAM.length - 1][k];
};
const H_RES = 1085.8; // liquid at 250 °C, kJ/kg
const SIO2_0 = 10 ** (5.19 - 1309 / 523.15); // quartz solubility at 250 °C, mg/kg
const flash = (t) => (H_RES - steamProp(t, 1)) / steamProp(t, 2);
const silica = (t) => SIO2_0 / (1 - flash(t));
const amorph = (t) => 10 ** (4.52 - 731 / (t + 273.15));
const ssi = (t) => silica(t) / amorph(t);

export const geothermal_flash = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the lowest separator temperature that still keeps the brine below silica saturation (SSI under 1).',
  goal: (t) => ssi(t.Ts) < 1 && ssi(t.Ts - 1) >= 1,
  params: [{ key: 'Ts', label: 'Separator temperature (°C)', min: 100, max: 230, step: 1, value: 200 }],
  beats: [
    { say: 'Water comes up from a 250 °C reservoir. Flashed at 200 °C, only 12% becomes steam, and the brine is far below saturation.', set: { Ts: 200 } },
    { say: 'At 160 °C, about 20% flashes to steam: much more power. Silica in the brine rises to about 607 mg/kg, still under the 680 that can stay dissolved.', set: { Ts: 160 } },
    { say: 'Push it to 120 °C: 26% steam, but the brine is now 45% oversaturated. Silica scale starts lining the pipes.', set: { Ts: 120 } },
  ],
  readout: (p) => [
    ['Steam (flash fraction)', `${r1(100 * flash(p.Ts))}% of the well flow`],
    ['Silica in the brine', `${r0(silica(p.Ts))} mg/kg`],
    ['Most that stays dissolved', `${r0(amorph(p.Ts))} mg/kg`],
    ['Saturation ratio', `${r2(ssi(p.Ts))} ${ssi(p.Ts) >= 1 ? '(scale forms)' : '(safe)'}`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [100, 230, 10], y: [0, 2, 0.25], sx: 7.6 / 130, sy: 6.8 / 2, origin: [0 - 100 * (7.6 / 130), -3.5], axisAt: [100, 0], xEvery: 20, yEvery: 0.5, fmt: (v) => `${v}`, xLabel: 'T_s\\,(°\\text{C})', yLabel: '\\text{SSI}' });
    kit.fill([P.toW(100, 1), P.toW(230, 1), P.toW(230, 2), P.toW(100, 2)], { color: C.red, opacity: 0.12 });
    kit.line([P.toW(100, 1), P.toW(230, 1)], { color: C.red, width: 1.5, dashed: true });
    kit.label('\\text{scale forms}', [P.toW(200, 1.6)[0], P.toW(0, 1.6)[1]], { size: 12, color: C.red });
    const ts = range(100, 230, 131);
    kit.line(ts.map((t) => P.toW(t, Math.min(2, ssi(t)))), { color: C.yellow, width: 3 });
    const stF = kit.line(ts.map((t) => P.toW(t, flash(t) * 5)), { color: C.blue, width: 2, dashed: true });
    void stF;
    kit.label('\\text{steam share} \\times 5', [P.toW(102, 1.25)[0], P.toW(0, 1.25)[1]], { size: 11, color: C.blue, align: 'left' });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    // separator sketch
    const sx = -5.2;
    kit.rect(sx - 0.8, -1.2, 1.6, 3.0, { color: C.grey, opacity: 0.25 });
    kit.label('\\text{separator}', [sx, 2.15], { size: 11 });
    kit.line([[-7.6, -0.6], [sx - 0.8, -0.6]], { color: C.gold, width: 5 });
    kit.label('\\text{from well}', [-7.0, -0.25], { size: 10, color: C.gold });
    const steamA = kit.arrow([sx, 1.8], [sx, 3.6], { color: C.white, width: 3 });
    kit.label('\\text{steam to turbine}', [sx + 0.2, 3.9], { size: 10 });
    kit.line([[sx, -1.2], [sx, -3.2], [-2.0, -3.2]], { color: C.blue, width: 5 });
    kit.label('\\text{brine to reinjection}', [-3.6, -3.6], { size: 10, color: C.blue });
    const scale = range(0, 13, 14).map((i) => kit.dot([sx + 0.25 * i * (i < 8 ? 0 : 1), 0], { r: 0.07, color: 0xe8e8e8, z: 5 }));
    const scalePos = range(0, 13, 14).map((i) => (i < 8 ? [sx + (i % 2 ? 0.12 : -0.12), -1.4 - i * 0.24] : [sx + 0.3 + (i - 8) * 0.45, -3.2 + (i % 2 ? 0.12 : -0.12)]));
    return (p, _t, time) => {
      const s = ssi(p.Ts);
      dot.set(P.toW(p.Ts, Math.min(2, s)));
      steamA.set([sx, 1.8], [sx, 1.9 + flash(p.Ts) * 7]);
      const n = s < 1 ? 0 : Math.round(clamp((s - 1) / 0.6, 0, 1) * 14);
      scale.forEach((d, i) => d.visible(i < n).set(scalePos[i]));
      void time;
    };
  },
};
