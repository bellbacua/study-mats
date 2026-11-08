// Scenes for the Electronic Materials specialization.
import { C } from '../theme';
import { clamp, range } from '../kit';

const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const sci = (v, d = 2) => {
  if (v === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = Number((v / 10 ** e).toFixed(d - 1));
  if (Math.abs(m) >= 10) {
    m /= 10;
    e += 1;
  }
  if (e === 0) return m.toFixed(d - 1);
  return `${m.toFixed(d - 1)} × 10^${e}`.replace('-', '−');
};
const sup = (s) => s.replace(/\^(−?\d+)/g, (_, n) => [...n].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c] ?? (c === '−' ? '⁻' : c)).join(''));
const sciU = (v, d = 2) => sup(sci(v, d));
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------------------------------------------------------------------------
// Resistivity vs temperature with Matthiessen's rule (ρ in 10⁻⁸ Ω·m)
// ---------------------------------------------------------------------------
const METALS = {
  cu: { name: 'Copper', r20: 1.68, a: 0.00393, color: C.gold },
  al: { name: 'Aluminium', r20: 2.65, a: 0.00429, color: C.blue },
  fe: { name: 'Iron', r20: 9.7, a: 0.0065, color: C.red },
};
const rhoT = (m, T) => METALS[m].r20 * (1 + METALS[m].a * (T - 20));
const rho = (p) => rhoT(p.m, p.T) + p.imp;

export const resistivity_temp = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Add impurities to copper at 20 °C until it is as poor a conductor as pure copper at 100 °C.',
  goal: (t) => t.m === 'cu' && t.T === 20 && Math.abs(rho(t) - rhoT('cu', 100)) < 0.03,
  params: [
    { key: 'm', label: 'Metal', type: 'choice', value: 'cu', options: Object.entries(METALS).map(([k, d]) => ({ value: k, label: d.name })) },
    { key: 'T', label: 'Temperature (°C)', min: -50, max: 300, step: 5, value: 20 },
    { key: 'imp', label: 'Impurity resistivity (×10⁻⁸ Ω·m)', min: 0, max: 2, step: 0.05, value: 0 },
  ],
  beats: [
    { say: 'Pure copper at 20 °C: 1.68 × 10⁻⁸ Ω·m. Electrons drift along and bounce off the vibrating atoms.', set: { m: 'cu', T: 20, imp: 0 } },
    { say: 'Heat it to 200 °C: the atoms shake harder, electrons scatter more, and resistivity rises by about 70%.', set: { m: 'cu', T: 200, imp: 0 } },
    { say: 'Back at 20 °C, add impurities. The whole line shifts up by a fixed amount: Matthiessen’s rule.', set: { m: 'cu', T: 20, imp: 0.6 } },
    { say: 'Iron scatters electrons far more: almost six times copper’s resistivity.', set: { m: 'fe', T: 20, imp: 0 } },
  ],
  readout: (p) => [
    ['Resistivity', `${r2(rho(p))} × 10⁻⁸ Ω·m`],
    ['100 m of 2 mm² wire', `${r2((rho(p) * 1e-8 * 100) / 2e-6)} Ω`],
    ['Conductivity (% IACS)', `${r1((100 * 1.7241) / rho(p))}%`],
  ],
  setup(kit) {
    // wire with lattice
    const x0 = -7.4;
    const y0 = -1.2;
    const W = 6.2;
    const H = 2.4;
    kit.rect(x0, y0, W, H, { color: 0x2a2f37, opacity: 0.7, strokeColor: C.grey });
    kit.label('\\text{inside the wire}', [x0 + W / 2, y0 + H + 0.35], { size: 12 });
    const atoms = [];
    for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) atoms.push({ x: x0 + 0.4 + i * 0.68, y: y0 + 0.35 + j * 0.57, d: kit.dot([0, 0], { r: 0.13, color: C.gold, z: 3 }), ph: i * 1.7 + j * 2.3 });
    const imps = range(0, 7, 8).map((_, i) => kit.dot([x0 + 0.75 + ((i * 2.3) % 5.6), y0 + 0.62 + ((i * 1.3) % 1.8)], { r: 0.15, color: C.red, z: 3 }));
    const rnd = rng(11);
    const elec = range(0, 9, 10).map(() => ({ d: kit.dot([0, 0], { r: 0.07, color: C.blue, z: 5 }), y: rnd(), ph: rnd() }));
    kit.arrow([x0 + 1.5, y0 - 0.5], [x0 + W - 1.5, y0 - 0.5], { color: C.blue });
    kit.label('\\text{electron drift}', [x0 + W / 2, y0 - 0.85], { size: 11, color: C.blue });
    // plot
    const P = kit.plane({ x: [-50, 300, 50], y: [0, 30, 5], sx: 5.4 / 350, sy: 6.8 / 30, origin: [0.9 + (50 * 5.4) / 350, -3.6], axisAt: [-50, 0], xEvery: 50, yEvery: 5, xLabel: 'T\\,(^\\circ\\text{C})', yLabel: '\\rho\\,(10^{-8}\\,\\Omega\\,\\text{m})' });
    const lines = Object.keys(METALS).map((k) => ({ k, l: kit.line([], { color: METALS[k].color, width: 2.5, create: false }) }));
    Object.entries(METALS).forEach(([k, d]) => kit.label(`\\text{${d.name}}`, [P.toW(300, 0)[0] + 0.1, P.toW(0, clamp(rhoT(k, 300), 0, 29))[1]], { size: 11, color: d.color, align: 'left' }));
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    return (p, _t, time) => {
      const amp = 0.03 + 0.09 * clamp((p.T + 50) / 350, 0, 1);
      atoms.forEach((a) => a.d.set([a.x + amp * Math.sin(time * 9 + a.ph), a.y + amp * Math.cos(time * 7 + a.ph * 1.3)]).color(METALS[p.m].color));
      const nImp = Math.round(p.imp * 4);
      imps.forEach((d, i) => d.visible(i < nImp));
      const speed = 0.6 / rho(p);
      elec.forEach((e) => {
        const f = (e.ph + time * speed) % 1;
        e.d.set([x0 + 0.1 + f * (W - 0.2), y0 + 0.15 + e.y * (H - 0.3) + 0.12 * Math.sin(time * 13 + e.ph * 20) * clamp(rho(p) / 4, 0.3, 1.5)]);
      });
      lines.forEach(({ k, l }) => {
        l.set(range(-50, 300, 60).map((T) => P.toW(T, clamp(rhoT(k, T) + (k === p.m ? p.imp : 0), 0, 30))));
        l.opacity(k === p.m ? 1 : 0.3);
      });
      dot.set(P.toW(p.T, clamp(rho(p), 0, 30)));
    };
  },
};

// ---------------------------------------------------------------------------
// Doping silicon: electrons and holes (cm⁻³), lightly doped mobilities
// ---------------------------------------------------------------------------
const NI = 1e10;
const Q = 1.602e-19;
const MUN = 1400;
const MUP = 450;
function carriers(p) {
  const N = 10 ** p.lg;
  const maj = N / 2 + Math.sqrt((N * N) / 4 + NI * NI);
  const min = (NI * NI) / maj;
  return p.type === 'n' ? { n: maj, p: min } : { n: min, p: maj };
}
const sigma = (p) => {
  const c = carriers(p);
  return Q * (c.n * MUN + c.p * MUP);
};

export const doping_carriers = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make p-type silicon with a resistivity between 0.5 and 2 Ω·cm.',
  goal: (t) => t.type === 'p' && 1 / sigma(t) > 0.5 && 1 / sigma(t) < 2,
  params: [
    { key: 'type', label: 'Dopant', type: 'choice', value: 'n', options: [{ value: 'n', label: 'Phosphorus (donor, n-type)' }, { value: 'p', label: 'Boron (acceptor, p-type)' }] },
    { key: 'lg', label: 'Dopant atoms per cm³ (log₁₀)', min: 8, max: 19, step: 0.5, value: 8 },
  ],
  beats: [
    { say: 'Almost pure silicon: 10¹⁰ electrons and 10¹⁰ holes per cm³, made by heat alone. Resistivity is huge.', set: { type: 'n', lg: 8 } },
    { say: '10¹⁶ phosphorus atoms per cm³, one for every 5 million silicon atoms. Electrons jump to 10¹⁶, holes drop to 10⁴.', set: { type: 'n', lg: 16 } },
    { say: 'Switch to boron: now holes are the majority and electrons the minority. The product n·p is still 10²⁰.', set: { type: 'p', lg: 16 } },
  ],
  readout: (p) => {
    const c = carriers(p);
    return [
      ['Electrons n', `${sciU(c.n)} cm⁻³`],
      ['Holes p', `${sciU(c.p)} cm⁻³`],
      ['n × p', `${sciU(c.n * c.p)} cm⁻⁶`],
      ['Resistivity', `${sciU(1 / sigma(p))} Ω·cm`],
      ['One dopant per', `${sciU(5e22 / 10 ** p.lg)} silicon atoms`],
    ];
  },
  setup(kit) {
    const x0 = -7.2;
    const y0 = -2.6;
    const N = 6;
    const s = 0.95;
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        if (i < N - 1) kit.line([[x0 + i * s, y0 + j * s], [x0 + (i + 1) * s, y0 + j * s]], { color: C.grey, width: 1.5, opacity: 0.6 });
        if (j < N - 1) kit.line([[x0 + i * s, y0 + j * s], [x0 + i * s, y0 + (j + 1) * s]], { color: C.grey, width: 1.5, opacity: 0.6 });
      }
    const atoms = [];
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) atoms.push(kit.dot([x0 + i * s, y0 + j * s], { r: 0.2, color: 0x8a96a8, z: 3 }));
    const dop = kit.dot([x0 + 2 * s, y0 + 3 * s], { r: 0.24, color: C.green, z: 4 });
    const dopL = kit.label('', [x0 + 2 * s, y0 + 3 * s + 0.45], { size: 11 });
    kit.label('\\text{silicon crystal (Si: 4 bonds each)}', [x0 + ((N - 1) * s) / 2, y0 + N * s + 0.05], { size: 11 });
    const rnd = rng(5);
    const free = range(0, 11, 12).map(() => ({ d: kit.dot([0, 0], { r: 0.1, color: C.blue, z: 5 }), x: rnd(), y: rnd(), vx: rnd() - 0.5, vy: rnd() - 0.5 }));
    // bars on log scale
    const bx = 1.6;
    const by = -3.4;
    const H = 6.6;
    const yOf = (lg) => by + (H * clamp(lg, 0, 20)) / 20;
    kit.line([[bx - 0.2, by], [bx + 4.6, by]], { color: C.axis, width: 2 });
    kit.line([[bx - 0.2, by], [bx - 0.2, by + H]], { color: C.axis, width: 2 });
    for (const v of [0, 5, 10, 15, 20]) {
      kit.line([[bx - 0.3, yOf(v)], [bx + 4.6, yOf(v)]], { color: C.grid, width: 1, opacity: 0.7 });
      kit.label(`10^{${v}}`, [bx - 0.4, yOf(v)], { size: 11, align: 'right' });
    }
    const nBar = kit.rect(bx + 0.4, by, 1.4, 0.01, { color: C.blue, opacity: 0.85, stroke: false });
    const pBar = kit.rect(bx + 2.6, by, 1.4, 0.01, { color: C.red, opacity: 0.85, stroke: false });
    kit.label('\\text{electrons } n', [bx + 1.1, by - 0.35], { size: 12, color: C.blue });
    kit.label('\\text{holes } p', [bx + 3.3, by - 0.35], { size: 12, color: C.red });
    kit.line([[bx - 0.2, yOf(10)], [bx + 4.6, yOf(10)]], { color: C.yellow, width: 1.5, dashed: true });
    kit.label('n_i', [bx + 4.75, yOf(10)], { size: 12, color: C.yellow, align: 'left' });
    return (p, _t, time) => {
      const c = carriers(p);
      nBar.set(bx + 0.4, by, 1.4, Math.max(0.01, yOf(Math.log10(c.n)) - by));
      pBar.set(bx + 2.6, by, 1.4, Math.max(0.01, yOf(Math.log10(c.p)) - by));
      const doped = p.lg > 10.5;
      dop.visible(doped).color(p.type === 'n' ? C.green : C.purple);
      dopL.visible(doped).set(p.type === 'n' ? '\\text{P}' : '\\text{B}');
      const show = clamp(Math.round((Math.log10(p.type === 'n' ? c.n : c.p) - 9) * 1.2), 1, 12);
      free.forEach((f, i) => {
        const x = x0 - 0.3 + (((f.x + f.vx * time * 0.15) % 1) + 1) % 1 * ((N - 1) * s + 0.6);
        const y = y0 - 0.3 + (((f.y + f.vy * time * 0.15) % 1) + 1) % 1 * ((N - 1) * s + 0.6);
        f.d.visible(i < show).set([x, y]).color(p.type === 'n' ? C.blue : C.red);
      });
      atoms.forEach((a) => a.color(0x8a96a8));
    };
  },
};

// ---------------------------------------------------------------------------
// Diode current–voltage curve (silicon, I₀ = 1 pA at 300 K)
// ---------------------------------------------------------------------------
const KB = 8.617e-5;
const vt = (T) => KB * T;
const i0 = (T) => 1e-12 * (T / 300) ** 3 * Math.exp(-(1.12 / KB) * (1 / T - 1 / 300));
const diodeI = (V, T) => i0(T) * (Math.exp(V / vt(T)) - 1);

export const diode_iv = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'At 300 K, find the forward voltage that gives a current between 15 and 25 mA (a typical LED-sized current).',
  goal: (t) => t.T === 300 && diodeI(t.V, 300) > 0.015 && diodeI(t.V, 300) < 0.025,
  params: [
    { key: 'V', label: 'Voltage across the diode (V)', min: -1, max: 0.8, step: 0.01, value: 0.3 },
    { key: 'T', label: 'Temperature (K)', min: 250, max: 400, step: 10, value: 300 },
  ],
  beats: [
    { say: 'At 0.3 V forward the barrier is only slightly lowered. The current is a few microamps at most.', set: { V: 0.3, T: 300 } },
    { say: 'Past about 0.6 V the current shoots up: every extra 60 mV multiplies it by ten.', set: { V: 0.62, T: 300 } },
    { say: 'Reverse bias raises the barrier. Only the tiny leakage I₀, a picoamp, gets through.', set: { V: -0.8, T: 300 } },
    { say: 'Heat the diode to 350 K and the same current flows at a lower voltage, about 2 mV less per kelvin.', set: { V: 0.52, T: 350 } },
  ],
  readout: (p) => {
    const I = diodeI(p.V, p.T);
    const s = Math.abs(I) >= 1e-3 ? `${r2(I * 1000)} mA` : Math.abs(I) >= 1e-6 ? `${r2(I * 1e6)} µA` : `${sciU(I)} A`;
    return [
      ['Current', s],
      ['Thermal voltage V_T', `${r2(vt(p.T) * 1000)} mV`],
      ['State', p.V < 0 ? 'reverse bias: blocked' : I < 1e-4 ? 'forward, below turn-on' : 'forward: conducting'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-1, 0.8, 0.2], y: [-5, 50, 5], sx: 12.6 / 1.8, sy: 7.4 / 55, origin: [-6.3 + 12.6 / 1.8, -3.7 + (5 * 7.4) / 55], xEvery: 0.2, yEvery: 10, fmt: (v) => `${Math.round(v * 10) / 10}`.replace('-', '−'), xLabel: 'V\\,(\\text{volts})', yLabel: 'I\\,(\\text{mA})' });
    const curve = kit.line([], { color: C.yellow, width: 3, create: false });
    const ref = kit.line(range(-1, 0.8, 600).filter((V) => diodeI(V, 300) * 1000 <= 50).map((V) => P.toW(V, Math.max(-5, diodeI(V, 300) * 1000))), { color: C.grey, width: 1.5, opacity: 0.4 });
    void ref;
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    // diode symbol
    const sx = -5.2;
    const sy = 2.6;
    kit.fill([[sx - 0.4, sy - 0.4], [sx - 0.4, sy + 0.4], [sx + 0.3, sy]], { color: C.blue, opacity: 0.9 });
    kit.line([[sx + 0.3, sy - 0.4], [sx + 0.3, sy + 0.4]], { color: C.blue, width: 3 });
    kit.line([[sx - 1.1, sy], [sx + 1.0, sy]], { color: C.blue, width: 2 });
    kit.label('\\text{p}', [sx - 0.8, sy + 0.45], { size: 12 });
    kit.label('\\text{n}', [sx + 0.7, sy + 0.45], { size: 12 });
    const flow = range(0, 4, 5).map(() => kit.dot([0, 0], { r: 0.08, color: C.yellow, z: 6 }));
    return (p, _t, time) => {
      curve.set(range(-1, 0.8, 600).filter((V) => diodeI(V, p.T) * 1000 <= 50).map((V) => P.toW(V, Math.max(-5, diodeI(V, p.T) * 1000))));
      const I = diodeI(p.V, p.T) * 1000;
      dot.set(P.toW(p.V, clamp(I, -5, 50)));
      const on = I > 0.5;
      flow.forEach((f, i) => f.visible(on).set([sx - 1.1 + (((i / 5 + time * clamp(I / 20, 0.2, 2)) % 1) * 2.1), sy]));
    };
  },
};

// ---------------------------------------------------------------------------
// Czochralski growth: Scheil segregation along the ingot
// ---------------------------------------------------------------------------
const IMPS = {
  b: { name: 'Boron', k: 0.8, color: C.purple },
  p: { name: 'Phosphorus', k: 0.35, color: C.green },
  al: { name: 'Aluminium', k: 0.002, color: C.blue },
  fe: { name: 'Iron', k: 8e-6, color: C.red },
};
const scheil = (imp, fs) => IMPS[imp].k * (1 - fs) ** (IMPS[imp].k - 1);

export const czochralski_scheil = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With phosphorus, grow the crystal until the dopant in it is twice what it was at the start.',
  goal: (t) => t.imp === 'p' && Math.abs(scheil('p', t.fs) / scheil('p', 0) - 2) < 0.03,
  params: [
    { key: 'imp', label: 'Impurity', type: 'choice', value: 'p', options: Object.entries(IMPS).map(([k, d]) => ({ value: k, label: `${d.name} (k = ${d.k})` })) },
    { key: 'fs', label: 'Fraction of the melt frozen', min: 0, max: 0.99, step: 0.01, value: 0.3 },
  ],
  beats: [
    { say: 'Phosphorus (k = 0.35): the first crystal holds only 35% of the melt’s phosphorus. The rest stays in the liquid.', set: { imp: 'p', fs: 0.05 } },
    { say: 'As the melt shrinks, the rejected phosphorus piles up in it, so later crystal is richer. At 90% frozen it is 4.5 times the start.', set: { imp: 'p', fs: 0.9 } },
    { say: 'Boron, with k close to 1, stays almost even along the whole ingot: that is why it is the favourite p-type dopant.', set: { imp: 'b', fs: 0.9 } },
    { say: 'Iron, k ≈ 10⁻⁵, is almost completely left behind. Freezing itself purifies the silicon.', set: { imp: 'fe', fs: 0.5 } },
  ],
  readout: (p) => [
    ['Impurity in the crystal here', `${sciU(scheil(p.imp, p.fs))} × melt’s starting level`],
    ['Compared with the start of the ingot', `${r2(scheil(p.imp, p.fs) / scheil(p.imp, 0))} ×`],
    ['Melt left', `${Math.round((1 - p.fs) * 100)}%`],
  ],
  setup(kit) {
    // crucible and ingot
    const cx = -5;
    const cy = -3.5;
    kit.line([[cx - 1.8, cy + 1.6], [cx - 1.8, cy], [cx + 1.8, cy], [cx + 1.8, cy + 1.6]], { color: C.grey, width: 4 });
    const melt = kit.rect(cx - 1.7, cy + 0.05, 3.4, 1.4, { color: C.gold, opacity: 0.7, stroke: false });
    const segs = range(0, 19, 20).map(() => kit.rect(cx - 0.45, 0, 0.9, 0.2, { color: C.blue, opacity: 0.85, stroke: false }));
    kit.line([[cx, 4.3], [cx, 3.7]], { color: C.white, width: 3 });
    kit.label('\\text{seed}', [cx + 0.3, 4.1], { size: 11, align: 'left' });
    kit.label('\\text{melt}', [cx, cy + 0.35], { size: 11, color: 0x222222 });
    // plot (log y)
    const P = kit.plane({ x: [0, 1, 0.1], y: [-6, 1, 1], sx: 6.4 / 1, sy: 6.8 / 7, origin: [0.9, -3.4 + 6 * (6.8 / 7)], axisAt: [0, -6], xEvery: 0.2, yEvery: 1, fmt: (v, ax) => (ax === 'y' ? `10${sup(`^${v}`.replace('-', '−'))}`.replace('10⁰', '1') : `${Math.round(v * 10) / 10}`), xLabel: '\\text{fraction frozen}', yLabel: 'C_s / C_0' });
    const curves = Object.keys(IMPS).map((k) => ({ k, l: kit.line(range(0, 0.99, 120).map((f) => P.toW(f, clamp(Math.log10(scheil(k, f)), -6, 1))), { color: IMPS[k].color, width: 2.5 }) }));
    Object.values(IMPS).forEach((d) => kit.label(`\\text{${d.name}}`, [P.toW(0, 0)[0] + 0.1, P.toW(0, clamp(Math.log10(d.k), -6, 1))[1] + 0.22], { size: 10, color: d.color, align: 'left' }));
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    return (p) => {
      curves.forEach(({ k, l }) => l.opacity(k === p.imp ? 1 : 0.25));
      dot.set(P.toW(p.fs, clamp(Math.log10(scheil(p.imp, p.fs)), -6, 1)));
      const L = 0.6 + 5.4 * p.fs;
      const top = 3.7;
      const n = segs.length;
      const base = scheil(p.imp, 0);
      segs.forEach((sg, i) => {
        const f0 = (i / n) * p.fs;
        const h = L / n;
        sg.set(cx - 0.45, top - (i + 1) * h, 0.9, h);
        const rel = clamp(Math.log10(scheil(p.imp, f0) / base) / Math.log10(5), 0, 1);
        sg.color(rel > 0.5 ? C.red : rel > 0.15 ? C.gold : C.blue);
      });
      melt.set(cx - 1.7, cy + 0.05, 3.4, Math.max(0.05, 1.4 * (1 - p.fs)));
    };
  },
};

// ---------------------------------------------------------------------------
// Parallel-plate capacitor with a dielectric (plates 1 cm²)
// ---------------------------------------------------------------------------
const EPS0 = 8.854e-12;
const DIEL = {
  air: { name: 'Air', er: 1, eb: 3, color: 0x445566 },
  mica: { name: 'Mica', er: 6, eb: 100, color: C.teal },
  al2o3: { name: 'Alumina', er: 9.8, eb: 15, color: C.blue },
  bto: { name: 'Barium titanate', er: 2000, eb: 8, color: C.purple },
};
const capC = (p) => (EPS0 * DIEL[p.mat].er * 1e-4) / (p.d * 1e-6);
const field = (p) => p.V / (p.d * 1e-6) / 1e6; // MV/m
const fmtF = (c) => (c >= 1e-6 ? `${r2(c * 1e6)} µF` : c >= 1e-9 ? `${r2(c * 1e9)} nF` : `${r2(c * 1e12)} pF`);

export const capacitor_dielectric = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Get at least 1 nF from the 1 cm² plates at 50 V or more, without breaking down.',
  goal: (t) => capC(t) >= 1e-9 && t.V >= 50 && field(t) < DIEL[t.mat].eb,
  params: [
    { key: 'mat', label: 'Dielectric', type: 'choice', value: 'air', options: Object.entries(DIEL).map(([k, d]) => ({ value: k, label: `${d.name} (εᵣ ≈ ${d.er})` })) },
    { key: 'd', label: 'Gap (µm)', min: 1, max: 200, step: 1, value: 100 },
    { key: 'V', label: 'Voltage (V)', min: 0, max: 500, step: 5, value: 100 },
  ],
  beats: [
    { say: 'Air, 100 µm gap, 100 V: only 8.9 pF. The field is 1 MV/m, a third of air’s breakdown.', set: { mat: 'air', d: 100, V: 100 } },
    { say: 'Fill the gap with mica (εᵣ = 6): the molecules polarise and the plates hold six times the charge.', set: { mat: 'mica', d: 100, V: 100 } },
    { say: 'Barium titanate: εᵣ around 2000. The same plates now store 18 nF.', set: { mat: 'bto', d: 100, V: 100 } },
    { say: 'Thin it to 10 µm at 100 V: the field reaches 10 MV/m, above its breakdown. It fails.', set: { mat: 'bto', d: 10, V: 100 } },
  ],
  readout: (p) => {
    const c = capC(p);
    const E = field(p);
    return [
      ['Capacitance', fmtF(c)],
      ['Stored charge', `${sciU(c * p.V)} C`],
      ['Stored energy', `${sciU(0.5 * c * p.V * p.V)} J`],
      ['Field', `${r2(E)} MV/m (breakdown ≈ ${DIEL[p.mat].eb})`],
      ['State', E >= DIEL[p.mat].eb ? 'BREAKDOWN' : 'safe'],
    ];
  },
  setup(kit) {
    const cx = -3.8;
    const top = kit.rect(-7, 0, 6.4, 0.25, { color: C.grey, opacity: 0.9, strokeColor: C.white });
    const bot = kit.rect(-7, 0, 6.4, 0.25, { color: C.grey, opacity: 0.9, strokeColor: C.white });
    const fillR = kit.rect(-7, 0, 6.4, 1, { color: C.teal, opacity: 0.3, stroke: false });
    const dip = range(0, 13, 14).map(() => kit.arrow([0, 0], [0, 0.1], { color: C.yellow }));
    const plus = kit.label('+', [cx, 0], { size: 16, color: C.red });
    const minus = kit.label('-', [cx, 0], { size: 16, color: C.blue });
    const spark = kit.label('\\text{breakdown!}', [cx, 0], { size: 14, color: C.red });
    // field gauge
    const gx = 2.2;
    const gy = -3.4;
    const GH = 6.6;
    kit.rect(gx, gy, 1.2, GH, { color: C.grey, opacity: 0.12, strokeColor: C.grey });
    const g = kit.rect(gx, gy, 1.2, 0.01, { color: C.green, opacity: 0.85, stroke: false });
    const bl = kit.line([], { color: C.red, width: 2.5, dashed: true, create: false });
    kit.label('\\text{field} / \\text{breakdown}', [gx + 0.6, gy + GH + 0.3], { size: 12 });
    const pct = kit.label('', [gx + 1.5, gy], { size: 12, align: 'left' });
    const capL = kit.label('', [5.6, 2.2], { size: 16, color: C.yellow });
    kit.label('\\text{capacitance}', [5.6, 2.8], { size: 12 });
    return (p) => {
      const gap = 0.6 + 3.4 * Math.sqrt(p.d / 200);
      const yT = gap / 2;
      top.set(-7, yT, 6.4, 0.25);
      bot.set(-7, -yT - 0.25, 6.4, 0.25);
      const d = DIEL[p.mat];
      fillR.set(-7, -yT, 6.4, 2 * yT).color(d.color).opacity(p.mat === 'air' ? 0.05 : 0.35);
      const nD = p.mat === 'air' ? 0 : Math.min(14, Math.round(2 + 3 * Math.log10(d.er)));
      const len = Math.min(0.9 * gap, 0.25 + 0.12 * Math.log10(d.er)) * clamp(p.V / 100, 0.2, 1.5);
      dip.forEach((a, i) => {
        const x = -6.6 + (i % 7) * 0.9;
        const y = i < 7 ? yT * 0.45 : -yT * 0.45;
        a.set?.([x, y - len / 2], [x, y + len / 2]);
        a.visible?.(i < nD && p.V > 0);
      });
      plus.pos([cx, yT + 0.6]);
      minus.pos([cx, -yT - 0.6]);
      const ratio = field(p) / d.eb;
      g.set(gx, gy, 1.2, Math.max(0.01, GH * clamp(ratio, 0, 1.2) / 1.2)).color(ratio >= 1 ? C.red : ratio > 0.7 ? C.gold : C.green);
      bl.set([[gx - 0.1, gy + GH / 1.2], [gx + 1.3, gy + GH / 1.2]]);
      pct.set(`${Math.round(ratio * 100)}\\%`).pos([gx + 1.4, gy + Math.min(GH, (GH * clamp(ratio, 0, 1.2)) / 1.2)]);
      spark.visible(ratio >= 1).pos([cx, -yT - 1.3]);
      capL.set(`\\text{${fmtF(capC(p)).replace('µ', '\\mu ')}}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Hysteresis loops (tanh model through B_r and H_c)
// ---------------------------------------------------------------------------
const MAGS = {
  iron: { name: 'Soft iron (transformer steel)', Bs: 1.6, Br: 1.0, Hc: 0.08, Hmax: 1, color: C.blue },
  ferrite: { name: 'Ferrite magnet', Bs: 0.45, Br: 0.4, Hc: 250, Hmax: 800, color: C.gold },
  ndfeb: { name: 'Neodymium (NdFeB)', Bs: 1.35, Br: 1.3, Hc: 900, Hmax: 2500, color: C.red },
};
const wOf = (m) => m.Hc / Math.atanh(m.Br / m.Bs);
const Hof = (m, ph) => (ph <= 0.5 ? m.Hmax * (1 - 4 * ph) : m.Hmax * (-1 + 4 * (ph - 0.5)));
const Bof = (m, ph) => {
  const H = Hof(m, ph);
  const w = wOf(m);
  return ph <= 0.5 ? m.Bs * Math.tanh((H + m.Hc) / w) : m.Bs * Math.tanh((H - m.Hc) / w);
};
const fmtH = (h) => (Math.abs(h) < 10 ? `${r2(h)} kA/m` : `${Math.round(h)} kA/m`.replace('-', '−'));

export const hysteresis_loop = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'On the neodymium loop, sweep the field down until B returns to zero: you have found the coercivity.',
  goal: (t) => t.mat === 'ndfeb' && Math.abs(Bof(MAGS.ndfeb, t.ph)) < 0.06,
  params: [
    { key: 'mat', label: 'Material', type: 'choice', value: 'ndfeb', options: Object.entries(MAGS).map(([k, d]) => ({ value: k, label: d.name })) },
    { key: 'ph', label: 'Field sweep (start at +H, down, then back up)', min: 0, max: 1, step: 0.01, value: 0.25 },
  ],
  beats: [
    { say: 'NdFeB after magnetising: the applied field is back to zero but B stays at 1.3 T. That memory is the remanence.', set: { mat: 'ndfeb', ph: 0.25 } },
    { say: 'Push the field backwards to −900 kA/m before B finally reaches zero. That huge coercivity is what makes a permanent magnet.', set: { mat: 'ndfeb', ph: 0.34 } },
    { say: 'Soft iron: it takes only 0.08 kA/m to flip. The loop is so thin it is almost a line, so little energy is lost each cycle.', set: { mat: 'iron', ph: 0.27 } },
  ],
  readout: (p) => {
    const m = MAGS[p.mat];
    return [
      ['Applied field H', fmtH(Hof(m, p.ph))],
      ['Flux density B', `${r2(Bof(m, p.ph))} T`],
      ['Remanence B_r', `${m.Br} T`],
      ['Coercivity H_c', fmtH(m.Hc)],
      ['Direction', p.ph <= 0.5 ? 'field decreasing' : 'field increasing'],
    ];
  },
  setup(kit) {
    const ox = -0.5;
    const oy = 0;
    const sx = 6;
    const sy = 2.0;
    kit.line([[ox - sx - 0.3, oy], [ox + sx + 0.3, oy]], { color: C.axis, width: 2 });
    kit.line([[ox, oy - 3.9], [ox, oy + 3.9]], { color: C.axis, width: 2 });
    for (const b of [-1.5, -1, -0.5, 0.5, 1, 1.5]) {
      kit.line([[ox - sx, oy + b * sy], [ox + sx, oy + b * sy]], { color: C.grid, width: 1, opacity: 0.6 });
      kit.label(`${b}`.replace('-', '−'), [ox - 0.15, oy + b * sy], { size: 10, align: 'right', tex: false, cls: 'tick' });
    }
    kit.label('B\\,(\\text{T})', [ox + 0.25, oy + 3.9], { size: 13, align: 'left' });
    kit.label('H', [ox + sx + 0.45, oy + 0.25], { size: 13 });
    const hmL = kit.label('', [ox + sx, oy - 0.3], { size: 11 });
    const hmR = kit.label('', [ox - sx, oy - 0.3], { size: 11 });
    const down = kit.line([], { color: C.red, width: 3, create: false });
    const up = kit.line([], { color: C.red, width: 3, opacity: 0.6, create: false });
    const dot = kit.dot([0, 0], { r: 0.15, color: C.white, z: 6 });
    const brM = kit.dot([0, 0], { r: 0.1, color: C.yellow, z: 5 });
    const hcM = kit.dot([0, 0], { r: 0.1, color: C.yellow, z: 5 });
    return (p) => {
      const m = MAGS[p.mat];
      const toW = (H, B) => [ox + (sx * H) / m.Hmax, oy + sy * B];
      down.set(range(0, 0.5, 120).map((ph) => toW(Hof(m, ph), Bof(m, ph)))).color(m.color);
      up.set(range(0.5, 1, 120).map((ph) => toW(Hof(m, ph), Bof(m, ph)))).color(m.color);
      dot.set(toW(Hof(m, p.ph), Bof(m, p.ph)));
      brM.set(toW(0, m.Br));
      hcM.set(toW(-m.Hc, 0));
      hmL.set(`+${m.Hmax}\\,\\text{kA/m}`);
      hmR.set(`-${m.Hmax}\\,\\text{kA/m}`);
    };
  },
};
