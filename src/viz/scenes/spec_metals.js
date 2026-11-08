// Scenes for the Metals and Metallurgy specialization.
import { C } from '../theme';
import { clamp, range } from '../kit';

const r0 = (v) => `${Math.round(v)}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
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

// ---------------------------------------------------------------------------
// Basic oxygen furnace: carbon falls linearly, then slows below about 0.3%
// ---------------------------------------------------------------------------
const C0 = 4.4;
const CCRIT = 0.3;
const CFLOOR = 0.03;
const TAU = 3;
const bofRate = (flow) => 0.11 * flow; // % carbon per minute while carbon is plentiful
function bofC(t, flow) {
  const r = bofRate(flow);
  const t1 = (C0 - CCRIT) / r;
  if (t <= t1) return C0 - r * t;
  return CFLOOR + (CCRIT - CFLOOR) * Math.exp(-(t - t1) / TAU);
}
const grade = (c) =>
  c > 2 ? 'still cast iron (over 2% C)' : c > 0.6 ? 'high-carbon steel' : c > 0.3 ? 'medium-carbon steel' : c > 0.1 ? 'low-carbon (mild) steel' : 'extra-low-carbon steel';

export const bof_blow = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Blow a heat down to 0.10% carbon or less in 16 minutes or less.',
  goal: (t) => t.t <= 16 && bofC(t.t, t.flow) <= 0.1,
  params: [
    { key: 'flow', label: 'Oxygen flow (m³ per minute per tonne)', min: 2, max: 4, step: 0.1, value: 3 },
    { key: 't', label: 'Blowing time (minutes)', min: 0, max: 25, step: 0.5, value: 0 },
  ],
  beats: [
    { say: 'The vessel holds hot metal from the blast furnace at 4.4% carbon. No oxygen has been blown yet.', set: { flow: 3, t: 0 } },
    { say: 'Oxygen burns the carbon to CO gas at a steady rate, about 0.33% per minute at this flow. The line is straight.', set: { flow: 3, t: 8 } },
    { say: 'Below about 0.3% carbon the reaction runs short of carbon and slows down. The last tenth of a percent takes several minutes.', set: { flow: 3, t: 17.5 } },
    { say: 'More oxygen shortens the straight part, but not the slow tail at the end.', set: { flow: 4, t: 13.5 } },
  ],
  readout: (p) => {
    const c = bofC(p.t, p.flow);
    return [
      ['Carbon in the bath', `${r2(c)}%`],
      ['What it is now', grade(c)],
      ['Carbon burned per tonne', `${r1((10 * (C0 - c)))} kg`],
      ['Oxygen used (to CO), per tonne', `${r1(0.933 * 10 * (C0 - c))} m³`],
    ];
  },
  setup(kit) {
    // vessel
    const vx = -5.2;
    const top = 2.2;
    const bot = -3.4;
    const wTop = 1.3;
    const wMid = 2.4;
    const shell = [
      [vx - wTop, top + 0.6],
      [vx - wMid, top - 1.2],
      [vx - wMid, bot + 0.8],
      [vx - wMid + 0.8, bot],
      [vx + wMid - 0.8, bot],
      [vx + wMid, bot + 0.8],
      [vx + wMid, top - 1.2],
      [vx + wTop, top + 0.6],
    ];
    kit.line(shell, { color: C.grey, width: 4, create: false });
    const bathTop = -0.6;
    const bath = kit.fill(
      [
        [vx - wMid + 0.08, bathTop],
        [vx - wMid + 0.08, bot + 0.8],
        [vx - wMid + 0.85, bot + 0.08],
        [vx + wMid - 0.85, bot + 0.08],
        [vx + wMid - 0.08, bot + 0.8],
        [vx + wMid - 0.08, bathTop],
      ],
      { color: C.gold, opacity: 0.8 }
    );
    kit.line([[vx, 4.2], [vx, bathTop + 0.9]], { color: C.blue, width: 5, create: false });
    kit.label('\\text{O}_2\\text{ lance}', [vx + 0.25, 3.9], { size: 12, color: C.blue, align: 'left' });
    kit.label('\\text{hot metal}', [vx, bot + 0.5], { size: 12, color: 0x222222 });
    const rnd = rng(77);
    const bubbles = range(0, 13, 14).map(() => ({ d: kit.dot([0, 0], { r: 0.1, color: C.white, opacity: 0.8, z: 5 }), x: (rnd() - 0.5) * 3.2, ph: rnd() }));
    const flame = kit.dot([vx, bathTop + 0.1], { r: 0.5, color: C.yellow, glow: true, z: 3 });
    // plot
    const P = kit.plane({ x: [0, 25, 5], y: [0, 4.5, 0.5], sx: 7.4 / 25, sy: 6.8 / 4.5, origin: [-0.6, -3.5], xEvery: 5, yEvery: 1, xLabel: '\\text{minutes}', yLabel: '\\%\\,\\text{C}' });
    kit.line([P.toW(0, 2), P.toW(25, 2)], { color: C.grey, width: 1, dashed: true });
    kit.label('\\text{steel below } 2\\%', [P.toW(25, 2)[0], P.toW(0, 2)[1] + 0.22], { size: 11, color: C.grey, align: 'right' });
    kit.line([P.toW(0, 0.1), P.toW(25, 0.1)], { color: C.green, width: 1.5, dashed: true });
    kit.label('\\text{target } 0.10\\%', [P.toW(20, 0)[0], P.toW(0, 0.1)[1] + 0.25], { size: 11, color: C.green });
    const full = kit.line([], { color: C.gold, width: 1.5, opacity: 0.35, create: false });
    const done = kit.line([], { color: C.gold, width: 3, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow, z: 6 });
    return (p, _t, time) => {
      const c = bofC(p.t, p.flow);
      full.set(range(0, 25, 120).map((x) => P.toW(x, bofC(x, p.flow))));
      done.set(range(0, Math.max(0.01, p.t), 80).map((x) => P.toW(x, bofC(x, p.flow))));
      dot.set(P.toW(p.t, c));
      bath.color(lerpC(0xf6d36b, 0xff8a3d, 1 - c / C0));
      const blowing = p.t > 0 && p.t < 25;
      flame.visible(blowing).scale(0.6 + 0.15 * p.flow * (c > CCRIT ? 1 : c / CCRIT));
      const rate = c > CCRIT ? 1 : c / CCRIT;
      bubbles.forEach((b) => {
        const f = (b.ph + time * 0.5 * p.flow * 0.4) % 1;
        b.d.visible(blowing && f < rate).set([vx + b.x * (1 - 0.3 * f), bot + 0.5 + f * (bathTop - bot + 0.6)]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Ellingham diagram (kJ per mole of O2; rough standard values)
// ---------------------------------------------------------------------------
const OXIDES = [
  { key: 'ni', tex: '2\\text{Ni} + \\text{O}_2 \\to 2\\text{NiO}', name: 'NiO', H: -479.4, S: -0.172, color: C.green },
  { key: 'fe', tex: '2\\text{Fe} + \\text{O}_2 \\to 2\\text{FeO}', name: 'FeO', H: -528, S: -0.13, color: C.red },
  { key: 'si', tex: '\\text{Si} + \\text{O}_2 \\to \\text{SiO}_2', name: 'SiO₂', H: -911, S: -0.18, color: C.purple },
];
const CARBON = { H: -221, S: 0.179 };
const G = (o, T) => o.H - T * o.S;

export const ellingham = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the lowest temperature (to the nearest 10 K) at which carbon can reduce FeO.',
  goal: (t) => G(CARBON, t.T) < G(OXIDES[1], t.T) && G(CARBON, t.T - 10) >= G(OXIDES[1], t.T - 10),
  params: [{ key: 'T', label: 'Temperature (K)', min: 300, max: 2300, step: 10, value: 600 }],
  beats: [
    { say: 'Each line is ΔG° for burning one mole of O₂. Metal lines rise with temperature because they use up a gas. Carbon’s line (dashed) falls, because 2C + O₂ makes two moles of CO gas.', set: { T: 600 } },
    { say: 'At 800 K carbon’s line has dropped below nickel’s: carbon can now pull oxygen off NiO.', set: { T: 800 } },
    { say: 'Above about 1000 K carbon also beats FeO. That is why a blast furnace works.', set: { T: 1100 } },
    { say: 'Silica needs over 1900 K, which is why silicon is made in electric arc furnaces.', set: { T: 2000 } },
  ],
  readout: (p) => {
    const gc = G(CARBON, p.T);
    const can = OXIDES.filter((o) => gc < G(o, p.T)).map((o) => o.name);
    return [
      ['Temperature', `${p.T} K (${r0(p.T - 273)} °C)`],
      ['ΔG° for 2C + O₂ → 2CO', `${r0(gc)} kJ`],
      ...OXIDES.map((o) => [`ΔG° for ${o.name}`, `${r0(G(o, p.T))} kJ`]),
      ['Carbon can reduce', can.length ? can.join(', ') : 'none of these'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 2400, 200], y: [-1000, 0, 100], sx: 12 / 2400, sy: 7.6 / 1000, origin: [-6.2, 3.8], axisAt: [0, 0], xEvery: 400, yEvery: 200, xLabel: 'T\\,(\\text{K})', yLabel: '\\Delta G^\\circ\\,(\\text{kJ})' });
    for (const o of OXIDES) {
      kit.line([P.toW(0, G(o, 0)), P.toW(2400, G(o, 2400))], { color: o.color, width: 2.5 });
      kit.label(`\\text{${o.name.replace('₂', '}_2\\text{')}}`, [P.toW(2400, 0)[0] + 0.15, P.toW(0, G(o, 2400))[1]], { size: 12, color: o.color, align: 'left' });
    }
    kit.line([P.toW(0, G(CARBON, 0)), P.toW(2400, G(CARBON, 2400))], { color: C.white, width: 2.5, dashed: true });
    kit.label('2\\text{C}\\to 2\\text{CO}', [P.toW(2400, 0)[0] + 0.15, P.toW(0, G(CARBON, 2400))[1]], { size: 12, color: C.white, align: 'left' });
    const vline = kit.line([], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const dots = OXIDES.map((o) => kit.dot([0, 0], { r: 0.1, color: o.color, z: 6 }));
    const cdot = kit.dot([0, 0], { r: 0.12, color: C.white, z: 7 });
    return (p) => {
      vline.set([P.toW(p.T, 0), P.toW(p.T, -1000)]);
      const gc = G(CARBON, p.T);
      OXIDES.forEach((o, i) => dots[i].set(P.toW(p.T, G(o, p.T))).scale(gc < G(o, p.T) ? 1.6 : 1));
      cdot.set(P.toW(p.T, gc));
    };
  },
};

// ---------------------------------------------------------------------------
// Solid solution in copper (rough strengthening constants, MPa)
// ---------------------------------------------------------------------------
const R_CU = 0.128;
const SOLUTES = {
  ni: { name: 'Nickel', r: 0.125, K: 150, limit: 100, color: C.green },
  zn: { name: 'Zinc', r: 0.133, K: 220, limit: 35, color: C.blue },
  sn: { name: 'Tin', r: 0.151, K: 600, limit: 9, color: C.purple },
};
const misfit = (s) => (100 * (SOLUTES[s].r - R_CU)) / R_CU;
const dSigma = (s, c) => SOLUTES[s].K * Math.sqrt(c / 100);
const N = 9;
const ORDER = (() => {
  const r = rng(4242);
  const ids = range(0, N * N - 1, N * N).map((v) => Math.round(v));
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
})();

export const solid_solution = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Add as much tin as copper can keep dissolved (about 9%), then compare its strength with 30% nickel.',
  goal: (t, seen) => t.s === 'sn' && t.c === 9 && !!seen.s?.has('ni'),
  params: [
    { key: 's', label: 'Solute', type: 'choice', value: 'ni', options: Object.entries(SOLUTES).map(([k, d]) => ({ value: k, label: `${d.name} (r = ${d.r} nm)` })) },
    { key: 'c', label: 'Solute (atom %)', min: 0, max: 40, step: 1, value: 10 },
  ],
  beats: [
    { say: 'Nickel atoms are only 2% smaller than copper atoms. They fit almost perfectly, and copper and nickel mix in any amount.', set: { s: 'ni', c: 30 } },
    { say: 'Zinc is 4% bigger. Up to about 35% dissolves, which is brass. Each odd atom strains the lattice and makes slip harder.', set: { s: 'zn', c: 30 } },
    { say: 'Tin is 18% bigger, past the 15% rule. Only about 9% dissolves, but each tin atom strengthens a lot. That is bronze.', set: { s: 'sn', c: 9 } },
    { say: 'Push tin past its limit and the extra forms a separate, brittle phase instead.', set: { s: 'sn', c: 20 } },
  ],
  readout: (p) => {
    const d = SOLUTES[p.s];
    const over = p.c > d.limit;
    return [
      ['Size misfit', `${r1(misfit(p.s))}% ${Math.abs(misfit(p.s)) > 15 ? '(over the 15% rule)' : '(inside the 15% rule)'}`],
      ['Dissolves up to about', d.limit >= 100 ? 'any amount' : `${d.limit}%`],
      ['Strength added (rough)', over ? `${r0(dSigma(p.s, d.limit))} MPa, then a second phase forms` : `${r0(dSigma(p.s, p.c))} MPa`],
      ['Yield strength (copper ≈ 70 MPa)', `${r0(70 + dSigma(p.s, Math.min(p.c, d.limit)))} MPa`],
    ];
  },
  setup(kit) {
    const gx = -7.2;
    const gy = -3.4;
    const step = 0.72;
    const atoms = range(0, N * N - 1, N * N).map((v) => {
      const i = Math.round(v);
      const x = gx + (i % N) * step;
      const y = gy + Math.floor(i / N) * step;
      return { x, y, d: kit.dot([x, y], { r: 0.3, color: C.gold, z: 4 }), ring: kit.dot([x, y], { r: 0.4, color: C.red, opacity: 0, z: 3 }) };
    });
    kit.label('\\text{copper crystal}', [gx + ((N - 1) * step) / 2, gy + N * step + 0.05], { size: 12 });
    const P = kit.plane({ x: [0, 40, 10], y: [0, 300, 50], sx: 6.2 / 40, sy: 6.6 / 300, origin: [0.9, -3.4], xEvery: 10, yEvery: 100, xLabel: '\\text{atom \\%}', yLabel: '\\Delta\\sigma\\,(\\text{MPa})' });
    const curves = Object.keys(SOLUTES).map((k) => ({
      k,
      ok: kit.line([], { color: SOLUTES[k].color, width: 2.5, create: false }),
      past: kit.line([], { color: SOLUTES[k].color, width: 1.5, dashed: true, opacity: 0.5, create: false }),
    }));
    for (const [k, x] of [['ni', 40], ['zn', 35], ['sn', 9]]) {
      const [wx, wy] = P.toW(x, dSigma(k, x));
      kit.label(`\\text{${SOLUTES[k].name}}`, [wx - 0.1, wy + 0.25], { size: 11, color: SOLUTES[k].color, align: 'right' });
    }
    const lim = kit.line([], { color: C.red, width: 1.5, dashed: true, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    return (p) => {
      const d = SOLUTES[p.s];
      const n = Math.round((p.c / 100) * N * N);
      const nIn = Math.round((Math.min(p.c, d.limit) / 100) * N * N);
      const set = new Set(ORDER.slice(0, n));
      const inSol = new Set(ORDER.slice(0, nIn));
      const near = new Set();
      for (const id of inSol) for (const nb of [id - 1, id + 1, id - N, id + N]) near.add(nb);
      atoms.forEach((a, i) => {
        const isS = set.has(i);
        const strain = Math.abs(misfit(p.s)) / 18;
        a.d.color(isS ? (inSol.has(i) ? d.color : C.grey) : C.gold).scale(isS ? d.r / R_CU : 1);
        a.ring.opacity(!isS && near.has(i) ? 0.15 + 0.4 * clamp(strain, 0, 1) : 0);
      });
      for (const cv of curves) {
        const s = SOLUTES[cv.k];
        const top = Math.min(40, s.limit);
        const on = cv.k === p.s;
        cv.ok.set(range(0, top, 60).map((x) => P.toW(x, dSigma(cv.k, x))));
        cv.ok.opacity(on ? 1 : 0.3);
        cv.past.set(top < 40 ? [P.toW(top, dSigma(cv.k, top)), P.toW(40, dSigma(cv.k, top))] : []);
      }
      lim.set(d.limit < 40 ? [P.toW(d.limit, 0), P.toW(d.limit, 300)] : []);
      dot.set(P.toW(p.c, dSigma(p.s, Math.min(p.c, d.limit))));
    };
  },
};

// ---------------------------------------------------------------------------
// Ageing curves for an aluminium alloy (illustrative, Q = 130 kJ/mol)
// ---------------------------------------------------------------------------
const AQ = 130000 / 8.314;
const tPeak = (Tc) => 10 * Math.exp(AQ * (1 / (Tc + 273.15) - 1 / 433.15)); // hours; 10 h at 160 °C
const hRise = (Tc) => 80 - 0.3 * (Tc - 120);
const hard = (Tc, hours) => {
  const x = hours / tPeak(Tc);
  return 70 + (hRise(Tc) * 2 * x) / (1 + x * x);
};
const TEMPS = [120, 140, 160, 180, 200, 220];

export const ageing_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Age at 160 °C and stop right at the peak.',
  goal: (t) => t.T === 160 && Math.abs(t.lt - 1) <= 0.05,
  params: [
    { key: 'T', label: 'Ageing temperature (°C)', min: 120, max: 220, step: 10, value: 160 },
    { key: 'lt', label: 'Ageing time (log₁₀ of hours)', min: -1, max: 3, step: 0.05, value: 0 },
  ],
  beats: [
    { say: 'Just after quenching the alloy is soft (about 70 HV). After 1 hour at 160 °C the copper atoms have begun to cluster.', set: { T: 160, lt: 0 } },
    { say: 'At 10 hours the particles are as fine and as many as they will get: peak hardness.', set: { T: 160, lt: 1 } },
    { say: 'Keep going to 1000 hours and the particles coarsen. The alloy is overaged and softer.', set: { T: 160, lt: 3 } },
    { say: 'At 200 °C the peak comes in under an hour, but it is lower: hotter ageing grows bigger particles.', set: { T: 200, lt: -0.35 } },
  ],
  readout: (p) => {
    const h = 10 ** p.lt;
    const tp = tPeak(p.T);
    return [
      ['Ageing time', h < 1 ? `${r0(h * 60)} minutes` : `${r1(h)} hours`],
      ['Hardness', `${r0(hard(p.T, h))} HV`],
      ['Peak at this temperature', `${r0(70 + hRise(p.T))} HV after ${tp < 1 ? `${r0(tp * 60)} min` : `${r1(tp)} h`}`],
      ['State', Math.abs(Math.log10(h / tp)) < 0.1 ? 'peak aged' : h < tp ? 'underaged' : 'overaged'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-1, 3, 1], y: [60, 160, 10], sx: 12 / 4, sy: 7.2 / 100, origin: [-6 + 3, -3.6 - 60 * (7.2 / 100)], axisAt: [-1, 60], xEvery: 1, yEvery: 20, fmt: (v, ax) => (ax === 'x' ? `${10 ** v}` : `${v}`), xLabel: '\\text{hours (log scale)}', yLabel: '\\text{HV}' });
    const lines = TEMPS.map((T) => ({ T, l: kit.line(range(-1, 3, 160).map((x) => P.toW(x, hard(T, 10 ** x))), { color: lerpC(C.blue, C.red, (T - 120) / 100), width: 1.5, opacity: 0.35 }) }));
    TEMPS.forEach((T) => {
      const x = Math.log10(tPeak(T));
      if (x > -1 && x < 3) kit.label(`${T}^\\circ`, [P.toW(x, 0)[0], P.toW(0, 70 + hRise(T))[1] + 0.25], { size: 10, color: lerpC(C.blue, C.red, (T - 120) / 100) });
    });
    const bold = kit.line([], { color: C.yellow, width: 3, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    const vl = kit.line([], { color: C.grey, width: 1, dashed: true, create: false });
    return (p) => {
      lines.forEach((l) => l.l.opacity(l.T === p.T ? 0 : 0.35));
      bold.set(range(-1, 3, 160).map((x) => P.toW(x, hard(p.T, 10 ** x))));
      const y = hard(p.T, 10 ** p.lt);
      dot.set(P.toW(p.lt, y));
      vl.set([P.toW(p.lt, 60), P.toW(p.lt, y)]);
    };
  },
};

// ---------------------------------------------------------------------------
// Hall–Petch for mild steel: σy = 70 + 0.74/√d (d in m)
// ---------------------------------------------------------------------------
const hp = (dum) => 70 + 0.74 / Math.sqrt(dum * 1e-6);

export const hall_petch = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the grain size that gives a yield strength of about 300 MPa.',
  goal: (t) => Math.abs(hp(t.d) - 300) < 8,
  params: [{ key: 'd', label: 'Grain size d (µm)', min: 2, max: 200, step: 1, value: 50 }],
  beats: [
    { say: 'Grains of 50 µm, about the width of a hair. Each boundary stops slipping dislocations. Yield strength: about 175 MPa.', set: { d: 50 } },
    { say: 'Coarse 200 µm grains, as near a slow-cooled weld. Fewer walls: only about 122 MPa.', set: { d: 200 } },
    { say: 'Fine 5 µm grains from controlled rolling: about 400 MPa. Plotted against 1/√d, every point falls on one straight line.', set: { d: 5 } },
  ],
  readout: (p) => [
    ['Grain size', `${p.d} µm`],
    ['1/√d', `${r1(1 / Math.sqrt(p.d / 1000))} mm^−½`],
    ['Yield strength', `${r0(hp(p.d))} MPa`],
    ['Grains across 1 mm', `${r0(1000 / p.d)}`],
  ],
  setup(kit) {
    const bx = -7.4;
    const by = -3.2;
    const S = 5.6;
    kit.rect(bx, by, S, S, { color: 0x3a3f47, opacity: 0.6, strokeColor: C.white });
    kit.label('\\text{a } 400\\,\\mu\\text{m square}', [bx + S / 2, by + S + 0.3], { size: 12 });
    const MAXL = 40;
    const rnd = rng(99);
    const jit = range(0, 2 * MAXL, 2 * MAXL + 1).map(() => range(0, 6, 7).map(() => rnd() - 0.5));
    const vlines = range(0, MAXL - 1, MAXL).map(() => kit.line([], { color: C.gold, width: 1.2, create: false }));
    const hlines = range(0, MAXL - 1, MAXL).map(() => kit.line([], { color: C.gold, width: 1.2, create: false }));
    const fine = kit.label('\\text{too fine to draw: }', [bx + S / 2, by - 0.35], { size: 11, color: C.grey });
    const P = kit.plane({ x: [0, 25, 5], y: [0, 700, 100], sx: 6.4 / 25, sy: 6.6 / 700, origin: [0.9, -3.4], xEvery: 5, yEvery: 100, xLabel: '1/\\sqrt{d}\\;(\\text{mm}^{-1/2})', yLabel: '\\sigma_y\\,(\\text{MPa})' });
    const k = 0.74 * Math.sqrt(1000);
    kit.line([P.toW(0, 70), P.toW(25, 70 + 25 * k)], { color: C.blue, width: 2.5 });
    kit.label('\\sigma_0 = 70', [P.toW(0, 70)[0] + 0.15, P.toW(0, 70)[1] - 0.25], { size: 11, color: C.blue, align: 'left' });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow, z: 6 });
    return (p) => {
      const n = Math.round(400 / p.d);
      const show = n <= MAXL;
      fine.visible(!show).set(`\\text{too fine to draw: ${n} grains across}`);
      const wig = (i, j, u) => 0.18 * (S / Math.max(n, 1)) * jit[i][j % 7] * Math.sin(u * Math.PI);
      for (let i = 0; i < MAXL; i++) {
        const on = show && i > 0 && i < n;
        const a = bx + (i * S) / Math.max(n, 1);
        const b = by + (i * S) / Math.max(n, 1);
        vlines[i].visible(on).set(on ? range(0, 1, 8).map((u, j) => [a + wig(i, j, u * n), by + u * S]) : []);
        hlines[i].visible(on).set(on ? range(0, 1, 8).map((u, j) => [bx + u * S, b + wig(i + MAXL, j, u * n)]) : []);
      }
      dot.set(P.toW(1 / Math.sqrt(p.d / 1000), hp(p.d)));
    };
  },
};

// ---------------------------------------------------------------------------
// Stainless steel: chromium threshold and PREN
// ---------------------------------------------------------------------------
const corr = (cr) => 0.02 + 0.5 / (1 + Math.exp((cr - 11) / 0.6)); // mm per year in damp air, illustrative
const pren = (p) => p.cr + 3.3 * p.mo + 16 * p.n;
const use = (p) => {
  if (p.cr < 10.5) return 'rusts: not stainless';
  const v = pren(p);
  if (v < 23) return 'indoors, kitchens, dry inland air';
  if (v < 32) return 'coastal air if washed often, food plants';
  if (v < 40) return 'chemical plants, brackish water';
  return 'seawater';
};

export const stainless_pren = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Design a steel fit for seawater (PREN 40 or more) with no more than 25% chromium.',
  goal: (t) => t.cr <= 25 && t.cr >= 10.5 && pren(t) >= 40,
  params: [
    { key: 'cr', label: 'Chromium (%)', min: 0, max: 30, step: 0.5, value: 5 },
    { key: 'mo', label: 'Molybdenum (%)', min: 0, max: 6, step: 0.1, value: 0 },
    { key: 'n', label: 'Nitrogen (%)', min: 0, max: 0.3, step: 0.01, value: 0.05 },
  ],
  beats: [
    { say: 'With 5% chromium the oxide forms only in patches. Rust gets through the gaps.', set: { cr: 5, mo: 0, n: 0.05 } },
    { say: 'Past about 10.5% the chromium oxide joins into one continuous film, and the corrosion rate drops by more than ten times.', set: { cr: 12, mo: 0, n: 0.05 } },
    { say: 'Grade 316: 17% Cr and 2.1% Mo. PREN about 25: good for coastal air if washed.', set: { cr: 17, mo: 2.1, n: 0.05 } },
    { say: 'Super-duplex: 25% Cr, 3.5% Mo, 0.25% N. PREN about 41: fit for seawater.', set: { cr: 25, mo: 3.5, n: 0.25 } },
  ],
  readout: (p) => [
    ['Corrosion rate in damp air (rough)', `${r2(corr(p.cr))} mm/year`],
    ['PREN = Cr + 3.3 Mo + 16 N', `${r1(pren(p))}`],
    ['Good for', use(p)],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 30, 5], y: [0, 0.6, 0.1], sx: 7.6 / 30, sy: 6.6 / 0.6, origin: [-7, -3.4], xEvery: 5, yEvery: 0.1, xLabel: '\\%\\,\\text{Cr}', yLabel: '\\text{mm/yr}' });
    kit.line(range(0, 30, 200).map((x) => P.toW(x, corr(x))), { color: C.red, width: 2.5 });
    kit.line([P.toW(10.5, 0), P.toW(10.5, 0.6)], { color: C.green, width: 1.5, dashed: true });
    kit.label('10.5\\%', [P.toW(10.5, 0)[0] + 0.1, P.toW(0, 0.57)[1]], { size: 11, color: C.green, align: 'left' });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow, z: 6 });
    // PREN bar
    const bx = 3.2;
    const by = -3.4;
    const H = 6.6;
    const top = 50;
    const yOf = (v) => by + (H * clamp(v, 0, top)) / top;
    kit.rect(bx, by, 1.2, H, { color: C.grey, opacity: 0.12, strokeColor: C.grey });
    const bar = kit.rect(bx, by, 1.2, 0.01, { color: C.blue, opacity: 0.8, stroke: false });
    for (const [v, txt] of [[23, '23'], [32, '32'], [40, '40\\;\\text{seawater}']]) {
      kit.line([[bx - 0.1, yOf(v)], [bx + 1.3, yOf(v)]], { color: C.white, width: 1.5, dashed: true });
      kit.label(txt, [bx + 1.5, yOf(v)], { size: 11, align: 'left' });
    }
    kit.label('\\text{PREN}', [bx + 0.6, by + H + 0.3], { size: 12 });
    const val = kit.label('', [bx + 0.6, by + 0.3], { size: 12, color: C.white });
    return (p) => {
      dot.set(P.toW(p.cr, corr(p.cr)));
      const v = pren(p);
      bar.set(bx, by, 1.2, Math.max(0.01, yOf(v) - by)).color(v >= 40 ? C.green : p.cr < 10.5 ? C.red : C.blue);
      val.set(r1(v)).pos([bx + 0.6, Math.min(yOf(v) + 0.3, by + H - 0.2)]);
    };
  },
};
