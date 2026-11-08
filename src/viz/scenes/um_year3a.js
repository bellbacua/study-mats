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
// rescale to mean 0 and sample standard deviation 1
function standardise(z) {
  const m = z.reduce((a, b) => a + b, 0) / z.length;
  const sd = Math.sqrt(z.reduce((a, b) => a + (b - m) ** 2, 0) / (z.length - 1));
  return z.map((v) => (v - m) / sd);
}

// ---------------------------------------------------------------------------
// Statics: a lamp on two cables and the closed force triangle
// ---------------------------------------------------------------------------
function tensions(t1, t2, W) {
  const s = Math.sin(rad(t1 + t2));
  return [(W * Math.cos(rad(t2))) / s, (W * Math.cos(rad(t1))) / s];
}

export const force_balance = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Set the cable angles so that each cable pulls with exactly the lamp’s weight.',
  goal: (t) => {
    const [a, b] = tensions(t.t1, t.t2, t.W);
    return Math.abs(a - t.W) / t.W < 0.03 && Math.abs(b - t.W) / t.W < 0.03;
  },
  params: [
    { key: 't1', label: 'Left cable angle (degrees)', min: 5, max: 80, step: 1, value: 45 },
    { key: 't2', label: 'Right cable angle (degrees)', min: 5, max: 80, step: 1, value: 45 },
    { key: 'W', label: 'Lamp weight W (N)', min: 100, max: 1000, step: 10, value: 500 },
  ],
  beats: [
    { say: 'Both cables at 45°. Each pulls with 354 N, less than the 500 N lamp, because both share the job of holding it up.', set: { t1: 45, t2: 45, W: 500 } },
    { say: 'Flatten them to 15°. Only a small part of each pull points upwards, so each cable must pull with 966 N, almost twice the lamp’s weight.', set: { t1: 15, t2: 15, W: 500 } },
    { say: 'Uneven angles: the steeper cable carries more. Whatever the angles, the three arrows placed head to tail always close into a triangle. That is balance.', set: { t1: 60, t2: 25, W: 500 } },
  ],
  readout: (t) => {
    const [a, b] = tensions(t.t1, t.t2, t.W);
    return [
      ['Left tension T₁', `${big(a)} N`],
      ['Right tension T₂', `${big(b)} N`],
      ['Sideways: T₁cos θ₁ − T₂cos θ₂', `${r1(a * Math.cos(rad(t.t1)) - b * Math.cos(rad(t.t2)))} N`],
      ['Upwards: T₁sin θ₁ + T₂sin θ₂ − W', `${r1(a * Math.sin(rad(t.t1)) + b * Math.sin(rad(t.t2)) - t.W)} N`],
    ];
  },
  setup(kit) {
    const top = 3.4;
    const lamp = [-3, -0.6];
    kit.line([[-7.9, top], [1.4, top]], { color: C.axis, width: 3 });
    for (let x = -7.8; x < 1.4; x += 0.4) kit.line([[x, top], [x + 0.25, top + 0.25]], { color: C.grey, width: 1 });
    const c1 = kit.line([], { color: C.blue, width: 3, create: false });
    const c2 = kit.line([], { color: C.green, width: 3, create: false });
    kit.rect(lamp[0] - 0.45, lamp[1] - 0.55, 0.9, 0.5, { color: C.gold, opacity: 0.8, strokeColor: C.gold });
    kit.dot(lamp, { r: 0.1, color: C.white });
    const glow = kit.dot([lamp[0], lamp[1] - 0.65], { r: 0.22, color: C.yellow, opacity: 0.7 });
    const wA = kit.arrow(lamp, lamp, { color: C.red, width: 3 });
    const a1 = kit.arrow(lamp, lamp, { color: C.blue, width: 3 });
    const a2 = kit.arrow(lamp, lamp, { color: C.green, width: 3 });
    const th1 = kit.label('\\theta_1', [0, 0], { size: 14, color: C.blue });
    const th2 = kit.label('\\theta_2', [0, 0], { size: 14, color: C.green });
    const wLab = kit.label('W', [0, 0], { size: 15, color: C.red });
    kit.label('\\text{forces head to tail}', [5.4, 3.7], { size: 13, color: C.white });
    const fw = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3 });
    const f2 = kit.arrow([0, 0], [0, 0], { color: C.green, width: 3 });
    const f1 = kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3 });
    const lw = kit.label('W', [0, 0], { size: 14, color: C.red });
    const l2 = kit.label('T_2', [0, 0], { size: 14, color: C.green });
    const l1 = kit.label('T_1', [0, 0], { size: 14, color: C.blue });
    const scaleLab = kit.label('', [5.4, -3.9], { size: 12, color: C.grey, tex: false });
    const end = (ang, dir) => {
      const c = Math.cos(rad(ang));
      const s = Math.sin(rad(ang));
      let L = (top - lamp[1]) / s;
      const xEnd = lamp[0] + dir * L * c;
      if (xEnd < -7.9) L = (lamp[0] + 7.9) / c;
      if (xEnd > 1.4) L = (1.4 - lamp[0]) / c;
      return [lamp[0] + dir * L * c, lamp[1] + L * s];
    };
    return (p, t, time) => {
      const [T1, T2] = tensions(p.t1, p.t2, p.W);
      c1.set([lamp, end(p.t1, -1)]);
      c2.set([lamp, end(p.t2, 1)]);
      glow.opacity(0.55 + 0.15 * Math.sin(time * 3));
      const k1 = 1.9 / 1000;
      const u1 = [-Math.cos(rad(p.t1)), Math.sin(rad(p.t1))];
      const u2 = [Math.cos(rad(p.t2)), Math.sin(rad(p.t2))];
      const cap = (v) => Math.min(v * k1, 2.6);
      wA.set([lamp[0], lamp[1] - 0.6], [lamp[0], lamp[1] - 0.6 - cap(p.W)]);
      wLab.pos([lamp[0] + 0.35, lamp[1] - 0.6 - cap(p.W) / 2]);
      a1.set(lamp, [lamp[0] + u1[0] * cap(T1), lamp[1] + u1[1] * cap(T1)]);
      a2.set(lamp, [lamp[0] + u2[0] * cap(T2), lamp[1] + u2[1] * cap(T2)]);
      th1.pos([lamp[0] - 1.25, lamp[1] + 0.3]);
      th2.pos([lamp[0] + 1.25, lamp[1] + 0.3]);
      // force triangle
      const k = 3.4 / Math.max(p.W, T1 * Math.max(Math.abs(u1[0]), 0.4), T2);
      const A = [3.2, 2.1];
      const B = [A[0], A[1] - p.W * k];
      const Cc = [B[0] + u2[0] * T2 * k, B[1] + u2[1] * T2 * k];
      fw.set(A, B);
      f2.set(B, Cc);
      f1.set(Cc, [Cc[0] + u1[0] * T1 * k, Cc[1] + u1[1] * T1 * k]);
      lw.pos([A[0] - 0.35, (A[1] + B[1]) / 2]);
      l2.pos([(B[0] + Cc[0]) / 2 + 0.35, (B[1] + Cc[1]) / 2 - 0.3]);
      l1.pos([(Cc[0] + A[0]) / 2, (Cc[1] + A[1]) / 2 + 0.35]);
      scaleLab.set(`1 unit of arrow = ${big(1 / k)} N`);
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// ANOVA: three tempering temperatures
// ---------------------------------------------------------------------------
const AZ = [standardise(normals(10, 77)), standardise(normals(10, 1077)), standardise(normals(10, 2077))];
const anovaF = (sep, s) => (10 * sep * sep) / (s * s);
const anovaP = (F) => (1 + (2 * F) / 27) ** -13.5; // exact for 2 and 27 degrees of freedom
const pTxt = (p) => (p < 0.001 ? '< 0.001' : r2(p) === '0' ? r2(p * 10) / 10 : `${Math.round(p * 1000) / 1000}`);

export const anova_groups = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With the true means only 1.5 HRC apart, make the difference significant (p below 0.05).',
  goal: (t) => t.sep <= 1.5 && anovaP(anovaF(t.sep, t.s)) < 0.05,
  params: [
    { key: 'sep', label: 'Gap between group means (HRC)', min: 0, max: 6, step: 0.1, value: 0 },
    { key: 's', label: 'Scatter within each group (HRC)', min: 0.5, max: 5, step: 0.1, value: 3 },
  ],
  beats: [
    { say: 'All three temperatures give the same true hardness. The groups differ only by chance, so F is about 0 and p is 1.', set: { sep: 0, s: 3 } },
    { say: 'Now the means are 3 HRC apart. The spread between groups is large compared with the scatter inside them: F = 10, p < 0.001.', set: { sep: 3, s: 3 } },
    { say: 'A 1.5 HRC gap hidden in a scatter of 4 HRC: F = 1.4 and p = 0.26. Not enough evidence; the groups overlap too much.', set: { sep: 1.5, s: 4 } },
  ],
  readout: (t) => {
    const F = anovaF(t.sep, t.s);
    return [
      ['Between-group mean square', r2(10 * t.sep * t.sep)],
      ['Within-group mean square', r2(t.s * t.s)],
      ['F ratio', r2(F)],
      ['p-value', pTxt(anovaP(F))],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 4, 1], y: [25, 65, 5], sx: 1.7, sy: 0.17, origin: [-7.3, -3.5 - 25 * 0.17], axisAt: [0, 25], xEvery: 10, yEvery: 10, yLabel: '\\text{hardness (HRC)}', grid: false });
    kit.line([P.toW(0, 65), P.toW(4, 65)], { color: C.grid, width: 1, opacity: 0.4 });
    const cols = [C.blue, C.gold, C.red];
    const names = ['400\\,°\\text{C}', '500\\,°\\text{C}', '600\\,°\\text{C}'];
    const grand = kit.line([P.toW(0.3, 45), P.toW(3.7, 45)], { color: C.white, width: 1.5, dashed: true, opacity: 0.7 });
    void grand;
    kit.label('\\text{overall mean}', [P.toW(3.75, 45)[0], P.toW(0, 45)[1]], { size: 11, color: C.white, align: 'left' });
    const dots = AZ.map((g, i) => g.map(() => kit.dot([0, 0], { r: 0.08, color: cols[i] })));
    const ticks = AZ.map((g, i) => g.map(() => kit.line([], { color: cols[i], width: 1, opacity: 0.5, create: false })));
    const means = AZ.map((g, i) => kit.line([], { color: cols[i], width: 3, create: false }));
    const betw = AZ.map(() => kit.line([], { color: C.white, width: 3, create: false }));
    names.forEach((n, i) => kit.label(n, [P.toW(i + 1, 25)[0], -3.95], { size: 12, color: cols[i] }));
    // right: two mean squares as bars
    const bx = 2.2;
    const by = -3.2;
    kit.line([[bx - 0.4, by], [7.6, by]], { color: C.axis, width: 2 });
    kit.label('\\text{between groups}', [bx + 0.9, by - 0.35], { size: 12, color: C.white });
    kit.label('\\text{within groups}', [bx + 3.6, by - 0.35], { size: 12, color: C.white });
    const barB = kit.rect(bx, by, 1.8, 0.01, { color: C.yellow, opacity: 0.75, strokeColor: C.yellow });
    const barW = kit.rect(bx + 2.7, by, 1.8, 0.01, { color: C.blue, opacity: 0.75, strokeColor: C.blue });
    const fLab = kit.label('', [4.9, 3.6], { size: 18, color: C.yellow });
    const pLab = kit.label('', [4.9, 2.9], { size: 14, color: C.white });
    return (p) => {
      const mu = [45 - p.sep, 45, 45 + p.sep];
      AZ.forEach((g, i) => {
        const x0 = i + 1;
        g.forEach((z, j) => {
          const xj = x0 - 0.35 + (j / 9) * 0.7;
          const y = clamp(mu[i] + p.s * z, 25, 65);
          dots[i][j].set(P.toW(xj, y));
          ticks[i][j].set([P.toW(xj, y), P.toW(xj, mu[i])]);
        });
        means[i].set([P.toW(x0 - 0.45, mu[i]), P.toW(x0 + 0.45, mu[i])]);
        betw[i].set([P.toW(x0 + 0.5, 45), P.toW(x0 + 0.5, mu[i])]);
      });
      const msb = 10 * p.sep * p.sep;
      const msw = p.s * p.s;
      const sc = 5.4 / Math.max(msb, msw, 20);
      barB.set(bx, by, 1.8, Math.max(0.01, msb * sc));
      barW.set(bx + 2.7, by, 1.8, Math.max(0.01, msw * sc));
      const F = msb / msw;
      fLab.set(`F = \\dfrac{${r1(msb)}}{${r1(msw)}} = ${r2(F)}`);
      const pv = anovaP(F);
      pLab.set(`p ${pv < 0.001 ? '< 0.001' : `= ${Math.round(pv * 1000) / 1000}`}`);
      pLab.color(pv < 0.05 ? C.green : C.white);
    };
  },
};

// ---------------------------------------------------------------------------
// Compound growth and discounting
// ---------------------------------------------------------------------------
export const compound_growth = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'In discount mode, find the interest rate at which ₱110,000 in two years is worth exactly ₱100,000 today.',
  goal: (t) => t.mode === 'disc' && t.N === 2 && Math.abs(110000 / (1 + t.i / 100) ** 2 - 100000) < 400,
  params: [
    { key: 'mode', label: 'View', type: 'choice', value: 'grow', options: [{ value: 'grow', label: 'grow ₱100,000 forward' }, { value: 'disc', label: 'discount ₱110,000 back to today' }] },
    { key: 'i', label: 'Interest rate i (% per year)', min: 1, max: 15, step: 0.1, value: 8 },
    { key: 'N', label: 'Years n', min: 0, max: 20, step: 1, value: 10 },
  ],
  beats: [
    { say: '₱100,000 at 8% for 10 years. Simple interest adds ₱8,000 a year: ₱180,000. Compound interest earns interest on interest: ₱215,892.', set: { mode: 'grow', i: 8, N: 10 } },
    { say: 'After 20 years the gap is huge: ₱260,000 simple, ₱466,096 compound. The curve bends upwards because each year adds 8% of a bigger amount.', set: { mode: 'grow', i: 8, N: 20 } },
    { say: 'Run time backwards. ₱110,000 arriving in 2 years is worth 110,000 ÷ 1.08² = ₱94,307 today. Less than ₱100,000 now, so take the money now.', set: { mode: 'disc', i: 8, N: 2 } },
  ],
  readout: (t) => {
    const i = t.i / 100;
    if (t.mode === 'grow')
      return [
        ['Simple: P(1 + ni)', `₱${big(100000 * (1 + t.N * i))}`],
        ['Compound: P(1 + i)ⁿ', `₱${big(100000 * (1 + i) ** t.N)}`],
        ['Difference', `₱${big(100000 * ((1 + i) ** t.N - 1 - t.N * i))}`],
      ];
    return [
      ['Future amount F', '₱110,000'],
      ['Present worth F / (1 + i)ⁿ', `₱${big(110000 / (1 + i) ** t.N)}`],
      ['Compared with ₱100,000 now', 110000 / (1 + i) ** t.N >= 100000 ? 'wait for it' : 'take it now'],
    ];
  },
  setup(kit) {
    const gG = kit.group();
    const gD = kit.group();
    const fmtK = (v, ax) => (ax === 'y' ? `${v}k` : `${v}`);
    const PG = kit.plane({ x: [0, 20, 2], y: [0, 500, 100], sx: 0.68, sy: 0.0135, origin: [-6.6, -3.4], xEvery: 4, yEvery: 100, fmt: fmtK, xLabel: '\\text{years}', yLabel: '\\text{pesos}', parent: gG });
    const PD = kit.plane({ x: [0, 20, 2], y: [0, 120, 20], sx: 0.68, sy: 0.056, origin: [-6.6, -3.4], xEvery: 4, yEvery: 20, fmt: fmtK, xLabel: '\\text{years until paid}', yLabel: '\\text{worth today}', parent: gD });
    const simple = kit.line([], { color: C.blue, width: 3, create: false, parent: gG });
    const comp = kit.line([], { color: C.yellow, width: 3, create: false, parent: gG });
    const dS = kit.dot([0, 0], { r: 0.11, color: C.blue, parent: gG });
    const dC = kit.dot([0, 0], { r: 0.13, color: C.yellow, parent: gG });
    const gap = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false, parent: gG });
    kit.label('\\text{simple}', [7.2, -0.9], { size: 13, color: C.blue, align: 'left', parent: gG });
    kit.label('\\text{compound}', [6.6, 3.5], { size: 13, color: C.yellow, align: 'right', parent: gG });
    const pw = kit.line([], { color: C.teal, width: 3, create: false, parent: gD });
    kit.line([PD.toW(0, 100), PD.toW(20, 100)], { color: C.gold, width: 2, dashed: true, parent: gD });
    kit.label('\\text{₱100,000 now}', [PD.toW(20, 100)[0], PD.toW(0, 103.5)[1]], { size: 12, color: C.gold, align: 'right', parent: gD });
    const dP = kit.dot([0, 0], { r: 0.13, color: C.teal, parent: gD });
    const drop = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false, parent: gD });
    const vLab = kit.label('', [0, 0], { size: 13, color: C.white });
    return (p, t) => {
      const i = p.i / 100;
      const grow = t.mode === 'grow';
      gG.visible = grow;
      gD.visible = !grow;
      if (grow) {
        simple.set([PG.toW(0, 100), PG.toW(20, 100 * (1 + 20 * i))].map(([x, y]) => [x, Math.min(y, 3.4)]));
        comp.set(range(0, 20, 120).map((x) => [x, 100 * (1 + i) ** x]).filter(([, y]) => y <= 500).map(([x, y]) => PG.toW(x, y)));
        const s = 100 * (1 + p.N * i);
        const c = 100 * (1 + i) ** p.N;
        dS.set(PG.toW(p.N, Math.min(s, 500)));
        dC.set(PG.toW(p.N, Math.min(c, 500)));
        gap.set([PG.toW(p.N, Math.min(s, 500)), PG.toW(p.N, Math.min(c, 500))]);
        vLab.set(`\\text{₱${big(c * 1000)}}`).pos([PG.toW(p.N, 0)[0] + 0.15, Math.min(PG.toW(0, c)[1], 3.3) + 0.35]).color(C.yellow);
      } else {
        pw.set(range(0, 20, 120).map((x) => PD.toW(x, 110 / (1 + i) ** x)));
        const v = 110 / (1 + i) ** p.N;
        dP.set(PD.toW(p.N, v));
        drop.set([PD.toW(p.N, 0), PD.toW(p.N, v)]);
        vLab.set(`\\text{₱${big(v * 1000)}}`).pos([PD.toW(p.N, 0)[0] + 0.2, PD.toW(0, v)[1] - 0.4]).color(C.teal);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Thermal analysis: a DSC trace
// ---------------------------------------------------------------------------
const DSC = {
  PET: { name: 'PET, quenched (amorphous)', tg: 75, dTg: 0.45, tc: 130, hc: 1.1, tm: 250, hm: 1.6 },
  ANN: { name: 'PET, annealed (crystalline)', tg: 78, dTg: 0.15, tc: null, hc: 0, tm: 252, hm: 1.6 },
  PP: { name: 'polypropylene', tg: -10, dTg: 0, tc: null, hc: 0, tm: 165, hm: 2.2 },
};
const sig = (x) => 1 / (1 + Math.exp(-x));
const heatFlow = (T, m) => {
  const d = DSC[m];
  let y = 0.2 - 0.0015 * (T - 25) - d.dTg * sig((T - d.tg) / 2.5);
  if (d.tc) y += d.hc * Math.exp(-(((T - d.tc) / 7) ** 2));
  y -= d.hm * Math.exp(-(((T - d.tm) / 5.5) ** 2));
  return y;
};
function dscState(T, m) {
  const d = DSC[m];
  if (T > d.tm + 8) return 'melted';
  if (Math.abs(T - d.tm) <= 8) return 'melting';
  if (d.tc && Math.abs(T - d.tc) < 12) return 'crystallising';
  if (d.tc && T >= d.tc + 12) return 'crystalline solid';
  if (m === 'PP') return 'crystalline solid';
  if (T < d.tg - 3) return 'glassy (hard, amorphous)';
  if (Math.abs(T - d.tg) <= 3) return 'glass transition';
  return m === 'ANN' ? 'crystalline solid' : 'rubbery (soft, amorphous)';
}

export const dsc_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Put the probe on the bottom of the melting peak of quenched PET.',
  goal: (t) => t.m === 'PET' && Math.abs(t.T - 250) < 3,
  params: [
    { key: 'T', label: 'Sample temperature (°C)', min: 25, max: 300, step: 1, value: 80 },
    { key: 'm', label: 'Sample', type: 'choice', value: 'PET', options: Object.entries(DSC).map(([k, d]) => ({ value: k, label: d.name })) },
  ],
  beats: [
    { say: 'Quenched PET, heated at 10 °C per minute. Near 75 °C the trace steps down: the glass transition, where the hard glassy plastic turns rubbery and needs more heat to warm.', set: { T: 80, m: 'PET' } },
    { say: 'At 130 °C the chains have room to line up, and they crystallise, giving out heat: an upward (exothermic) peak.', set: { T: 130, m: 'PET' } },
    { say: 'Annealed PET was already crystalline: no cold-crystallisation peak, just melting near 250 °C, a deep downward (endothermic) peak.', set: { T: 250, m: 'ANN' } },
  ],
  readout: (t) => [
    ['Temperature', `${Math.round(t.T)} °C`],
    ['State of the sample', dscState(t.T, t.m)],
    ['Heat flow (exothermic up)', `${r2(heatFlow(t.T, t.m))} mW`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [25, 300, 25], y: [-2.5, 1.5, 0.5], sx: 9 / 275, sy: 1.55, origin: [-1.6 - 25 * (9 / 275), -0.6], axisAt: [25, -2.5], xEvery: 50, yEvery: 1, xLabel: 'T\\;(°\\text{C})', yLabel: '\\text{heat flow}', numbers: true });
    kit.label('\\uparrow \\text{exo}', [7.6, 2.5], { size: 12, color: C.gold, align: 'right' });
    kit.label('\\downarrow \\text{endo}', [7.6, -3.5], { size: 12, color: C.blue, align: 'right' });
    const ghost = kit.line([], { color: C.grey, width: 1.5, opacity: 0.35, create: false });
    const crv = kit.line([], { color: C.pink, width: 3, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    const cur = kit.line([], { color: C.yellow, width: 1.2, dashed: true, create: false });
    const tags = [kit.label('T_g', [0, 0], { size: 13, color: C.white }), kit.label('T_c', [0, 0], { size: 13, color: C.gold }), kit.label('T_m', [0, 0], { size: 13, color: C.blue })];
    // left: the furnace with two pans
    kit.rect(-7.6, -2.6, 5.0, 4.2, { color: C.maroon, opacity: 0.18, strokeColor: C.maroon });
    kit.label('\\text{furnace}', [-5.1, 1.95], { size: 12, color: C.maroon });
    kit.rect(-7.0, -1.4, 1.5, 0.35, { color: C.grey, opacity: 0.6, strokeColor: C.grey });
    kit.rect(-4.6, -1.4, 1.5, 0.35, { color: C.grey, opacity: 0.6, strokeColor: C.grey });
    const sample = kit.rect(-6.8, -1.05, 1.1, 0.4, { color: C.blue, opacity: 0.9, strokeColor: C.white });
    kit.label('\\text{sample}', [-6.25, -1.85], { size: 12 });
    kit.label('\\text{empty reference}', [-3.85, -1.85], { size: 12 });
    const heat = [0, 1, 2, 3, 4].map(() => kit.line([], { color: C.red, width: 2, opacity: 0.6, create: false }));
    const state = kit.label('', [-5.1, 0.9], { size: 13, color: C.white, tex: false });
    const tLab = kit.label('', [-5.1, -3.3], { size: 16, color: C.yellow, tex: false });
    let last = '';
    return (p, t, time) => {
      if (t.m !== last) {
        last = t.m;
        crv.set(range(25, 300, 500).map((x) => P.toW(x, heatFlow(x, t.m))));
        ghost.set(range(25, 300, 500).map((x) => P.toW(x, heatFlow(x, t.m === 'PET' ? 'ANN' : 'PET'))));
        const d = DSC[t.m];
        tags[0].visible(d.tg > 25).pos([P.toW(d.tg, 0)[0] - 0.1, P.toW(0, heatFlow(d.tg, t.m))[1] + 0.45]);
        tags[1].visible(!!d.tc).pos([P.toW(d.tc ?? 0, 0)[0], P.toW(0, heatFlow(d.tc ?? 25, t.m))[1] + 0.4]);
        tags[2].pos([P.toW(d.tm, 0)[0] + 0.55, P.toW(0, heatFlow(d.tm, t.m))[1]]);
      }
      const y = heatFlow(p.T, t.m);
      dot.set(P.toW(p.T, y));
      cur.set([P.toW(p.T, -2.5), P.toW(p.T, 1.5)]);
      const st = dscState(p.T, t.m);
      state.set(st);
      tLab.set(`${Math.round(p.T)} °C`);
      const melt = clamp((p.T - DSC[t.m].tm + 8) / 16, 0, 1);
      const soft = clamp((p.T - DSC[t.m].tg) / 10, 0, 1);
      sample.color(lerpC(lerpC(C.blue, C.teal, soft), C.gold, melt));
      sample.set(-6.8, -1.05, 1.1, 0.4 - 0.12 * melt);
      heat.forEach((h, i) => {
        const x = -7.2 + i * 1.0;
        h.set(range(0, 1, 16).map((s) => [x + 0.12 * Math.sin(s * 9 + time * 5 + i), -2.45 + s * 0.8]));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Friction on a tilting ramp
// ---------------------------------------------------------------------------
const PAIRS = {
  wood: { name: 'wood on wood', ms: 0.5, mk: 0.3 },
  steel: { name: 'steel on steel, dry', ms: 0.74, mk: 0.57 },
  oily: { name: 'steel on steel, oily', ms: 0.1, mk: 0.08 },
};
const slide = { s: 0, v: 0 };

export const friction_ramp = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the angle of repose of wood on wood: the steepest tilt before the block slides.',
  goal: (t) => t.pair === 'wood' && t.a <= 26.6 && t.a >= 25.8,
  params: [
    { key: 'a', label: 'Ramp angle θ (degrees)', min: 0, max: 45, step: 0.1, value: 15 },
    { key: 'pair', label: 'Surfaces', type: 'choice', value: 'wood', options: Object.entries(PAIRS).map(([k, d]) => ({ value: k, label: `${d.name} (μₛ = ${d.ms})` })) },
  ],
  beats: [
    { say: 'At 15° the pull down the slope, mg sin θ, is smaller than the most friction can give, μₛmg cos θ. Friction simply matches the pull and the block stays.', set: { a: 15, pair: 'wood' } },
    { say: 'Past 26.6°, where tan θ = 0.5, the pull wins. The block slides, and friction drops to the smaller sliding value μₖN.', set: { a: 30, pair: 'wood' } },
    { say: 'Oily steel has μₛ = 0.1, so it slides from just 5.7°. That is why oily plates must never be stacked on a slope.', set: { a: 10, pair: 'oily' } },
  ],
  readout: (t) => {
    const d = PAIRS[t.pair];
    const pull = Math.sin(rad(t.a));
    const lim = d.ms * Math.cos(rad(t.a));
    return [
      ['Pull down slope, mg sin θ', `${r2(pull)} mg`],
      ['Most static friction, μₛmg cos θ', `${r2(lim)} mg`],
      ['Angle of repose, tan⁻¹ μₛ', `${r1((Math.atan(d.ms) * 180) / Math.PI)}°`],
      ['Block', pull > lim ? 'sliding' : 'holding still'],
    ];
  },
  setup(kit) {
    const piv = [-7.4, -3.4];
    const L = 8.4;
    const ramp = kit.line([], { color: C.axis, width: 4, create: false });
    const base = kit.line([piv, [piv[0] + L, piv[1]]], { color: C.grey, width: 2 });
    void base;
    const wedge = kit.fill([], { color: C.grey, opacity: 0.15 });
    const block = kit.fill([], { color: C.gold, opacity: 0.85 });
    const W = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3 });
    const N = kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3 });
    const F = kit.arrow([0, 0], [0, 0], { color: C.green, width: 3 });
    const D = kit.arrow([0, 0], [0, 0], { color: C.white, width: 2, opacity: 0.7 });
    const lW = kit.label('mg', [0, 0], { size: 13, color: C.red });
    const lN = kit.label('N', [0, 0], { size: 13, color: C.blue });
    const lF = kit.label('F', [0, 0], { size: 13, color: C.green });
    const lth = kit.label('\\theta', [piv[0] + 1.6, piv[1] + 0.25], { size: 14, color: C.white });
    // graph: pull and friction limit as fractions of mg
    const P = kit.plane({ x: [0, 45, 5], y: [0, 1, 0.25], sx: 5.4 / 45, sy: 4.6, origin: [1.9, -3.4], xEvery: 15, yEvery: 0.5, xLabel: '\\theta', yLabel: '\\text{force}\\,/\\,mg' });
    kit.curve((x) => Math.sin(rad(x)), [0, 45], { plane: P, color: C.white, width: 2.5 });
    const lim = kit.line([], { color: C.green, width: 2.5, create: false });
    kit.label('mg\\sin\\theta', [P.toW(45, 0)[0] - 0.1, P.toW(0, 0.76)[1]], { size: 12, color: C.white, align: 'right' });
    const limLab = kit.label('\\mu_s mg\\cos\\theta', [0, 0], { size: 12, color: C.green, align: 'right' });
    const cur = kit.dot([0, 0], { r: 0.11, color: C.yellow });
    const rep = kit.line([], { color: C.yellow, width: 1.2, dashed: true, create: false });
    let last = '';
    return (p, t, time, dt) => {
      const d = PAIRS[t.pair];
      if (t.pair !== last) {
        last = t.pair;
        lim.set(range(0, 45, 90).map((x) => P.toW(x, Math.min(1, d.ms * Math.cos(rad(x))))));
        limLab.pos([P.toW(45, 0)[0] - 0.1, P.toW(0, Math.min(1, d.ms * Math.cos(rad(45)))) [1] + (d.ms > 0.8 ? 0.3 : 0.3)]);
        const ar = (Math.atan(d.ms) * 180) / Math.PI;
        rep.set([P.toW(ar, 0), P.toW(ar, Math.sin(rad(ar)))]);
      }
      const a = rad(p.a);
      const c = Math.cos(a);
      const s = Math.sin(a);
      const u = [c, s];
      const n = [-s, c];
      const top = [piv[0] + L * c, piv[1] + L * s];
      ramp.set([piv, top]);
      wedge.set([piv, top, [top[0], piv[1]]]);
      const sliding = Math.tan(a) > d.ms;
      if (sliding) {
        const acc = 9.8 * (s - d.mk * c) * 0.25;
        slide.v += acc * Math.min(dt || 0.016, 0.05);
        slide.s += slide.v * Math.min(dt || 0.016, 0.05);
        if (slide.s > 5.2) {
          slide.s = 0;
          slide.v = 0;
        }
      } else {
        slide.s = 0;
        slide.v = 0;
      }
      const along = 6.2 - slide.s;
      const b0 = [piv[0] + along * c, piv[1] + along * s];
      const h = 0.9;
      const P0 = [b0[0] - (u[0] * h) / 2, b0[1] - (u[1] * h) / 2];
      const corner = (i, j) => [P0[0] + u[0] * h * i + n[0] * h * j, P0[1] + u[1] * h * i + n[1] * h * j];
      block.set([corner(0, 0), corner(1, 0), corner(1, 1), corner(0, 1)]);
      const ctr = [b0[0] + (n[0] * h) / 2, b0[1] + (n[1] * h) / 2];
      const k = 2.2;
      W.set(ctr, [ctr[0], ctr[1] - k]);
      N.set(ctr, [ctr[0] + n[0] * k * c, ctr[1] + n[1] * k * c]);
      const fr = sliding ? d.mk * c : s;
      F.set(b0, [b0[0] + u[0] * k * fr, b0[1] + u[1] * k * fr]);
      D.set(ctr, [ctr[0] - u[0] * k * s, ctr[1] - u[1] * k * s]);
      lW.pos([ctr[0] + 0.35, ctr[1] - k + 0.2]);
      lN.pos([ctr[0] + n[0] * k * c - 0.2, ctr[1] + n[1] * k * c + 0.25]);
      lF.pos([b0[0] + u[0] * k * fr + 0.1, b0[1] + u[1] * k * fr + 0.35]);
      lth.pos([piv[0] + 1.7 * Math.cos(a / 2), piv[1] + 1.7 * Math.sin(a / 2)]);
      cur.set(P.toW(p.a, s)).color(sliding ? C.red : C.yellow);
      void time;
    };
  },
};

// ---------------------------------------------------------------------------
// Welding: fusion zone and heat-affected zone from heat input
// ---------------------------------------------------------------------------
const ETA = 0.8;
const VOLT = 25;
const RHOC = 0.0039; // J per mm³ per K, steel
const KST = 0.025; // W per mm per K
const heatIn = (I, v) => (ETA * VOLT * I) / v; // J/mm
const peakR = (H, Tp) => Math.sqrt((2 * H) / (Math.PI * Math.E * RHOC * (Tp - 25))); // mm, thick plate
const t85 = (H) => (H / (2 * Math.PI * KST)) * (1 / 475 - 1 / 775); // s

export const weld_haz = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Choose a current and speed that make the weld cool from 800 to 500 °C in 10 to 20 seconds, slow enough to avoid brittle martensite.',
  goal: (t) => {
    const c = t85(heatIn(t.I, t.v));
    return c >= 10 && c <= 20;
  },
  params: [
    { key: 'I', label: 'Welding current I (A)', min: 80, max: 250, step: 5, value: 150 },
    { key: 'v', label: 'Travel speed v (mm/s)', min: 2, max: 10, step: 0.5, value: 4 },
  ],
  beats: [
    { say: '150 A at 4 mm/s gives 750 J for each millimetre of weld. Metal melts within about 5 mm of the centre line; beyond that a band was heated above 727 °C: the heat-affected zone.', set: { I: 150, v: 4 } },
    { say: 'Weld fast with low current: only 200 J/mm. The zones are thin, but the cold plate pulls the heat out in about a second: a recipe for hard, brittle martensite.', set: { I: 100, v: 10 } },
    { say: 'High current, slow travel: 2,500 J/mm. Wide zones, coarse grains, but slow cooling of about 13 s from 800 to 500 °C.', set: { I: 250, v: 2 } },
  ],
  readout: (t) => {
    const H = heatIn(t.I, t.v);
    return [
      ['Heat input H = ηVI / v', `${big(H)} J/mm`],
      ['Fusion zone half-width', `${r1(peakR(H, 1500))} mm`],
      ['Heat-affected zone width', `${r1(peakR(H, 727) - peakR(H, 1500))} mm`],
      ['Cooling time 800 → 500 °C', `${r1(t85(H))} s`],
    ];
  },
  setup(kit) {
    const mm = 0.2; // world units per mm
    const yc = 0.3;
    const x0 = -7.6;
    const x1 = 0.8;
    kit.rect(x0, yc - 3.6, x1 - x0, 7.2, { color: C.grey, opacity: 0.28, strokeColor: C.axis });
    kit.label('\\text{steel plate, seen from above}', [(x0 + x1) / 2, 4.15], { size: 12 });
    const haz = kit.fill([], { color: C.gold, opacity: 0.75 });
    const fz = kit.fill([], { color: C.red, opacity: 0.9 });
    const arc = kit.dot([0, 0], { r: 0.25, color: C.white, glow: true });
    const halo = kit.dot([0, 0], { r: 0.5, color: C.yellow, opacity: 0.35 });
    kit.label('\\text{fusion zone}', [x0 + 0.2, -3.85], { size: 12, color: C.red, align: 'left' });
    kit.label('\\text{HAZ}', [x0 + 2.4, -3.85], { size: 12, color: C.gold, align: 'left' });
    kit.label('\\text{base metal}', [x0 + 3.8, -3.85], { size: 12, color: C.grey, align: 'left' });
    // right: peak temperature against distance from the centre line
    const P = kit.plane({ x: [0, 20, 5], y: [0, 2500, 500], sx: 5.6 / 20, sy: 6.4 / 2500, origin: [2.1, -3.3], xEvery: 5, yEvery: 500, xLabel: '\\text{mm from centre}', yLabel: '\\text{peak }T\\;(°\\text{C})' });
    kit.line([P.toW(0, 1500), P.toW(20, 1500)], { color: C.red, width: 1.5, dashed: true });
    kit.line([P.toW(0, 727), P.toW(20, 727)], { color: C.gold, width: 1.5, dashed: true });
    kit.label('\\text{melts}', [P.toW(20, 0)[0], P.toW(0, 1500)[1] + 0.22], { size: 11, color: C.red, align: 'right' });
    kit.label('727\\,°\\text{C}', [P.toW(20, 0)[0], P.toW(0, 727)[1] + 0.22], { size: 11, color: C.gold, align: 'right' });
    const pk = kit.line([], { color: C.pink, width: 3, create: false });
    const mFz = kit.dot([0, 0], { r: 0.1, color: C.red });
    const mHz = kit.dot([0, 0], { r: 0.1, color: C.gold });
    return (p, t, time) => {
      const H = heatIn(p.I, p.v);
      const rf = Math.min(peakR(H, 1500) * mm, 3.5);
      const rh = Math.min(peakR(H, 727) * mm, 3.55);
      const xa = x0 + 0.3 + ((time * 1.3) % (x1 - x0 - 0.6));
      const band = (r) => {
        const cap = range(-Math.PI / 2, Math.PI / 2, 24).map((a) => [xa + r * 0.9 * Math.cos(a), yc + r * Math.sin(a)]);
        return [[x0 + 0.05, yc - r], ...cap, [x0 + 0.05, yc + r]];
      };
      haz.set(band(rh));
      fz.set(band(rf));
      arc.set([xa, yc]);
      halo.set([xa, yc]).scale(0.85 + 0.2 * Math.sin(time * 20));
      pk.set(range(0.6, 20, 140).map((r) => [r, 25 + (2 * H) / (Math.PI * Math.E * RHOC * r * r)]).filter(([, T]) => T <= 2500).map(([r, T]) => P.toW(r, T)));
      mFz.set(P.toW(Math.min(peakR(H, 1500), 20), 1500));
      mHz.set(P.toW(Math.min(peakR(H, 727), 20), 727));
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// Comparing two furnaces by present worth
// ---------------------------------------------------------------------------
const annuity = (i, n) => (i < 1e-6 ? n : ((1 + i) ** n - 1) / (i * (1 + i) ** n));
const pwA = (i, n) => 2 + 0.6 * annuity(i, n);
const pwB = (i, n) => 3.2 + 0.35 * annuity(i, n);

export const cashflow_compare = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the interest rate at which both furnaces cost the same over 10 years (the break-even rate).',
  goal: (t) => Math.abs(pwA(t.i / 100, 10) - pwB(t.i / 100, 10)) < 0.02,
  params: [{ key: 'i', label: 'Interest rate i (% per year)', min: 0, max: 30, step: 0.1, value: 10 }],
  beats: [
    { say: 'At 10%, add up each furnace’s present worth year by year. Furnace A starts cheaper, but its fuel bills climb faster. By year 10, B is about ₱340,000 cheaper.', set: { i: 10 } },
    { say: 'At 25%, money now is precious and future fuel savings are worth little today. Now cheap furnace A wins.', set: { i: 25 } },
    { say: 'At about 16% the two totals end level: the break-even rate. Below it, buy the efficient furnace; above it, the cheap one.', set: { i: 16.1 } },
  ],
  readout: (t) => {
    const i = t.i / 100;
    const a = pwA(i, 10);
    const b = pwB(i, 10);
    return [
      ['Annuity factor (10 years)', r2(annuity(i, 10))],
      ['Furnace A, present worth', `₱${r2(a)} M`],
      ['Furnace B, present worth', `₱${r2(b)} M`],
      ['Cheaper over 10 years', Math.abs(a - b) < 0.02 ? 'a tie' : a < b ? `A, by ₱${big((b - a) * 1e6)}` : `B, by ₱${big((a - b) * 1e6)}`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 10, 1], y: [0, 8, 1], sx: 0.62, sy: 0.85, origin: [-7.0, -3.5], xEvery: 2, yEvery: 2, fmt: (v, ax) => (ax === 'y' ? `₱${v}M` : `${v}`), xLabel: '\\text{year}', yLabel: '\\text{total present worth}' });
    const lA = kit.line([], { color: C.red, width: 3, create: false });
    const lB = kit.line([], { color: C.blue, width: 3, create: false });
    const dA = range(0, 10, 11).map(() => kit.dot([0, 0], { r: 0.07, color: C.red }));
    const dB = range(0, 10, 11).map(() => kit.dot([0, 0], { r: 0.07, color: C.blue }));
    const tA = kit.label('\\text{A: ₱2.0M + ₱0.60M a year}', [-0.9, -2.15], { size: 12, color: C.red, align: 'right' });
    const tB = kit.label('\\text{B: ₱3.2M + ₱0.35M a year}', [-0.9, -2.6], { size: 12, color: C.blue, align: 'right' });
    void tA;
    void tB;
    const cross = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    // right: this year's fuel bill, then its value today
    kit.label('\\text{one year’s fuel bill for A, worth today}', [4.6, 3.95], { size: 12, color: C.white });
    const bars = range(1, 10, 10).map((k) => kit.rect(0.6 + k * 0.62, -3.5, 0.42, 0.01, { color: C.red, opacity: 0.7, strokeColor: C.red }));
    range(1, 10, 10).forEach((k) => kit.label(`${k}`, [0.81 + k * 0.62, -3.8], { size: 11, color: C.grey, tex: false }));
    kit.line([[1.1, -3.5], [7.6, -3.5]], { color: C.axis, width: 2 });
    kit.line([[1.1, -3.5 + 0.6 * 9], [7.6, -3.5 + 0.6 * 9]], { color: C.red, width: 1, dashed: true, opacity: 0.6 });
    kit.label('\\text{₱0.6M if paid today}', [7.6, -3.5 + 0.6 * 9 + 0.25], { size: 11, color: C.red, align: 'right' });
    return (p) => {
      const i = p.i / 100;
      const ptsA = range(0, 10, 11).map((k) => P.toW(k, pwA(i, k)));
      const ptsB = range(0, 10, 11).map((k) => P.toW(k, pwB(i, k)));
      lA.set(ptsA);
      lB.set(ptsB);
      ptsA.forEach((q, k) => dA[k].set(q));
      ptsB.forEach((q, k) => dB[k].set(q));
      // crossing year (continuous)
      let cx = null;
      for (let k = 0; k < 10; k++) {
        const g0 = pwA(i, k) - pwB(i, k);
        const g1 = pwA(i, k + 1) - pwB(i, k + 1);
        if (g0 < 0 && g1 >= 0) cx = k + -g0 / (g1 - g0);
      }
      cross.visible(cx != null);
      if (cx != null) cross.set(P.toW(cx, pwA(i, Math.floor(cx)) + (pwA(i, Math.ceil(cx)) - pwA(i, Math.floor(cx))) * (cx - Math.floor(cx))));
      bars.forEach((b, j) => b.set(0.6 + (j + 1) * 0.62, -3.5, 0.42, Math.max(0.01, (5.4 * 1) / (1 + i) ** (j + 1))));
    };
  },
};

// ---------------------------------------------------------------------------
// A 2³ factorial: eight heat-treated samples on a cube
// ---------------------------------------------------------------------------
const FAC = {
  A: { name: 'A: tempering temperature', f: (a) => a[0] },
  B: { name: 'B: tempering time', f: (a) => a[1] },
  C: { name: 'C: cooling rate', f: (a) => a[2] },
  AB: { name: 'AB: temperature × time', f: (a) => a[0] * a[1] },
};
const CORNERS = [];
for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) CORNERS.push([a, b, c]);
const NOISE = normals(8, 4242);
const yHard = (k) => {
  const [a, b, c] = CORNERS[k];
  return Math.round((45 - 4 * a - 2 * b + 0.5 * c - 1.5 * a * b + 0.4 * NOISE[k]) * 10) / 10;
};
const effect = (key) => {
  const plus = [];
  const minus = [];
  CORNERS.forEach((cr, k) => (FAC[key].f(cr) > 0 ? plus : minus).push(yHard(k)));
  const m = (v) => v.reduce((x, y) => x + y, 0) / v.length;
  return { plus: m(plus), minus: m(minus), e: m(plus) - m(minus) };
};

export const factorial_cube = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the factor with the biggest effect on hardness (largest bar, either sign).',
  goal: (t) => t.eff === 'A',
  params: [
    { key: 'eff', label: 'Effect to examine', type: 'choice', value: 'B', options: Object.entries(FAC).map(([k, d]) => ({ value: k, label: d.name })) },
    { key: 'spin', label: 'Turn the cube', min: -0.8, max: 0.8, step: 0.01, value: 0.45 },
  ],
  beats: [
    { say: 'Eight runs, one at each corner. To see the effect of time (B), compare the top face (long time) with the bottom face (short time): all four samples on each face.', set: { eff: 'B', spin: 0.45 } },
    { say: 'Temperature (A): right face against left face. Raising the temperature lowers hardness by about 8 HRC: the biggest effect.', set: { eff: 'A', spin: 0.3 } },
    { say: 'The interaction AB compares the corners where temperature and time are both high or both low with the mixed ones. Its effect, about −3 HRC, is invisible to one-at-a-time testing.', set: { eff: 'AB', spin: -0.3 } },
  ],
  readout: (t) => {
    const e = effect(t.eff);
    return [
      ['Average of the + runs', `${r1(e.plus)} HRC`],
      ['Average of the − runs', `${r1(e.minus)} HRC`],
      ['Effect = (+) − (−)', `${r1(e.e)} HRC`],
    ];
  },
  setup(kit) {
    const cx = -3.4;
    const cy = -0.2;
    const S = 1.9;
    const proj = (q, yaw) => {
      const [a, b, c] = q;
      const X = a * Math.cos(yaw) - c * Math.sin(yaw);
      const d = a * Math.sin(yaw) + c * Math.cos(yaw);
      return [cx + S * X, cy + S * (b * 0.95 + d * 0.32)];
    };
    const EDGES = [];
    CORNERS.forEach((p, i) => CORNERS.forEach((q, j) => {
      if (j > i && p.filter((v, k) => v !== q[k]).length === 1) EDGES.push([i, j]);
    }));
    const faceP = kit.fill([], { color: C.teal, opacity: 0.25 });
    const faceM = kit.fill([], { color: C.red, opacity: 0.25 });
    const edges = EDGES.map(() => kit.line([], { color: C.axis, width: 2, create: false }));
    const dots = CORNERS.map(() => kit.dot([0, 0], { r: 0.16, color: C.white }));
    const vals = CORNERS.map((_, k) => kit.label(`${yHard(k)}`, [0, 0], { size: 12, tex: false }));
    const axA = kit.label('A\\to', [0, 0], { size: 13, color: C.gold });
    const axB = kit.label('B\\uparrow', [0, 0], { size: 13, color: C.gold });
    const axC = kit.label('C\\nearrow', [0, 0], { size: 13, color: C.gold });
    // right: bar chart of all four effects
    const keys = Object.keys(FAC);
    const zero = 1.4;
    kit.line([[2.3, zero], [7.6, zero]], { color: C.axis, width: 2 });
    kit.label('\\text{effects on hardness (HRC)}', [4.95, 3.9], { size: 12 });
    const barObjs = keys.map((k, i) => {
      const e = effect(k).e;
      const x = 2.7 + i * 1.25;
      const r = kit.rect(x, Math.min(zero, zero + e * 0.55), 0.8, Math.abs(e) * 0.55, { color: e < 0 ? C.red : C.teal, opacity: 0.55, strokeColor: e < 0 ? C.red : C.teal });
      kit.label(k, [x + 0.4, 3.2], { size: 13, color: C.white });
      kit.label(r1(e), [x + 0.4, zero + e * 0.55 - (e < 0 ? 0.3 : -0.3)], { size: 12, color: C.white, tex: false });
      return r;
    });
    const sel = kit.rect(0, 0, 1, 1, { fill: false, strokeColor: C.yellow, width: 3 });
    return (p, t, time) => {
      const yaw = p.spin + 0.05 * Math.sin(time * 0.6);
      const Pq = CORNERS.map((q) => proj(q, yaw));
      EDGES.forEach(([i, j], k) => edges[k].set([Pq[i], Pq[j]]));
      const f = FAC[t.eff].f;
      CORNERS.forEach((q, k) => {
        dots[k].set(Pq[k]).color(f(q) > 0 ? C.teal : C.red);
        vals[k].pos([Pq[k][0] + (q[0] > 0 ? 0.45 : -0.45), Pq[k][1] + 0.3]);
      });
      if (t.eff === 'AB') {
        faceP.visible(false);
        faceM.visible(false);
      } else {
        const ax = { A: 0, B: 1, C: 2 }[t.eff];
        const face = (sgn) => {
          const idx = CORNERS.map((q, k) => [q, k]).filter(([q]) => q[ax] === sgn);
          // order the four corners around the face
          const others = [0, 1, 2].filter((v) => v !== ax);
          const order = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
          return order.map(([u, v]) => Pq[idx.find(([q]) => q[others[0]] === u && q[others[1]] === v)[1]]);
        };
        faceP.visible(true).set(face(1));
        faceM.visible(true).set(face(-1));
      }
      axA.pos(proj([1.55, -1, -1], yaw));
      axB.pos(proj([-1.25, 1.5, -1], yaw));
      axC.pos(proj([-1, -1, 1.55], yaw));
      const i = keys.indexOf(t.eff);
      const e = effect(t.eff).e;
      sel.set(2.6 + i * 1.25, Math.min(zero, zero + e * 0.55) - 0.1, 1.0, Math.abs(e) * 0.55 + 0.2);
      void barObjs;
    };
  },
};

// ---------------------------------------------------------------------------
// Second moment of area: same area, different shapes
// ---------------------------------------------------------------------------
// each shape: list of rectangles [x, y, w, h] in mm, y measured from the bottom
const SHAPES = {
  flat: { name: 'bar laid flat, 40 × 10', rects: [[-20, 0, 40, 10]] },
  square: { name: 'solid square, 20 × 20', rects: [[-10, 0, 20, 20]] },
  edge: { name: 'bar on edge, 10 × 40', rects: [[-5, 0, 10, 40]] },
  tube: { name: 'hollow square, 30 outside', rects: [[-15, 0, 30, 3.82], [-15, 26.18, 30, 3.82], [-15, 3.82, 3.82, 22.36], [11.18, 3.82, 3.82, 22.36]] },
  T: { name: 'T-section, 45 deep', rects: [[-20, 40, 40, 5], [-2.5, 0, 5, 40]] },
  I: { name: 'I-section, 40 deep', rects: [[-15, 0, 30, 4], [-15, 36, 30, 4], [-2.5, 4, 5, 32]] },
};
function sectionProps(key) {
  const R = SHAPES[key].rects;
  const A = R.reduce((s, r) => s + r[2] * r[3], 0);
  const yb = R.reduce((s, r) => s + r[2] * r[3] * (r[1] + r[3] / 2), 0) / A;
  const I = R.reduce((s, r) => s + (r[2] * r[3] ** 3) / 12 + r[2] * r[3] * (r[1] + r[3] / 2 - yb) ** 2, 0);
  return { A, yb, I };
}
const I_FLAT = sectionProps('flat').I;

export const section_inertia = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Every shape uses 400 mm² of aluminium. Find the stiffest one (the largest I).',
  goal: (t) => t.shape === 'I',
  params: [
    { key: 'shape', label: 'Cross-section', type: 'choice', value: 'flat', options: Object.entries(SHAPES).map(([k, d]) => ({ value: k, label: d.name })) },
    { key: 'load', label: 'Load on the beam (kN)', min: 0.2, max: 2, step: 0.05, value: 1 },
  ],
  beats: [
    { say: 'A bar laid flat: all its metal sits within 5 mm of the centre line. I = 3,333 mm⁴, and the beam sags a lot.', set: { shape: 'flat', load: 1 } },
    { say: 'The same bar on its edge: the metal now reaches 20 mm from the centre. Distance counts squared, so I is 16 times larger.', set: { shape: 'edge', load: 1 } },
    { say: 'An I-section puts most metal in flanges far from the centre: I = 91,733 mm⁴, 28 times the flat bar, with exactly the same area.', set: { shape: 'I', load: 1 } },
  ],
  readout: (t) => {
    const s = sectionProps(t.shape);
    return [
      ['Area', `${big(s.A)} mm²`],
      ['Centroid height ȳ', `${r1(s.yb)} mm from the bottom`],
      ['Second moment I', `${big(s.I)} mm⁴`],
      ['Stiffness compared with flat bar', `${r1(s.I / I_FLAT)} ×`],
    ];
  },
  setup(kit) {
    const sc = 0.1;
    const ox = -4.6;
    const oy = -0.1;
    kit.label('\\text{cross-section}', [ox, 3.95], { size: 12 });
    const strips = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 14; j++) row.push(kit.rect(0, 0, 0.01, 0.01, { color: C.blue, opacity: 0.8, stroke: false }));
      strips.push(row);
    }
    const outl = [0, 1, 2, 3].map(() => kit.line([], { color: C.white, width: 2, create: false }));
    const na = kit.line([], { color: C.yellow, width: 2, dashed: true, create: false });
    const cen = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    const naLab = kit.label('\\text{neutral axis}', [0, 0], { size: 11, color: C.yellow, align: 'left' });
    kit.label('\\text{brighter = farther from the axis}', [ox, -3.95], { size: 11, color: C.grey });
    // right: the beam and its sag
    kit.label('\\text{beam on two supports}', [4.6, 3.95], { size: 12 });
    const bx0 = 1.3;
    const bx1 = 7.7;
    const by = 2.4;
    kit.dot([bx0, by - 0.25], { r: 0.18, color: C.grey });
    kit.dot([bx1, by - 0.25], { r: 0.18, color: C.grey });
    kit.line([[bx0, by], [bx1, by]], { color: C.grey, width: 1, dashed: true, opacity: 0.5 });
    const beam = kit.line([], { color: C.gold, width: 5, create: false });
    const load = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3 });
    // bars of I for all shapes
    const keys = Object.keys(SHAPES);
    const maxI = Math.max(...keys.map((k) => sectionProps(k).I));
    kit.line([[1.3, -3.4], [7.7, -3.4]], { color: C.axis, width: 2 });
    const bars = keys.map((k, i) => {
      const h = (sectionProps(k).I / maxI) * 3.6;
      kit.label(k === 'I' || k === 'T' ? k : { flat: 'flat', square: '□', edge: 'edge', tube: 'tube' }[k], [1.75 + i * 1.05, -3.75], { size: 11, color: C.grey, tex: false });
      return kit.rect(1.4 + i * 1.05, -3.4, 0.7, h, { color: C.blue, opacity: 0.45, strokeColor: C.blue });
    });
    kit.label('I', [1.0, -0.2], { size: 13, color: C.blue });
    let last = '';
    return (p, t) => {
      if (t.shape !== last) {
        last = t.shape;
        const s = sectionProps(t.shape);
        const R = SHAPES[t.shape].rects;
        const h = Math.max(...R.map((r) => r[1] + r[3]));
        const maxD = Math.max(s.yb, h - s.yb);
        const y0 = oy - (h * sc) / 2;
        strips.forEach((row, i) => {
          const r = R[i];
          row.forEach((st, j) => {
            if (!r) return st.visible(false);
            const hh = r[3] / 14;
            const ym = r[1] + (j + 0.5) * hh;
            st.visible(true).set(ox + r[0] * sc, y0 + (r[1] + j * hh) * sc, r[2] * sc, hh * sc + 0.002);
            st.color(lerpC(0x1b3d5a, C.yellow, (Math.abs(ym - s.yb) / maxD) ** 2));
          });
          if (!r) outl[i].visible(false);
          else outl[i].visible(true).set([[ox + r[0] * sc, y0 + r[1] * sc], [ox + (r[0] + r[2]) * sc, y0 + r[1] * sc], [ox + (r[0] + r[2]) * sc, y0 + (r[1] + r[3]) * sc], [ox + r[0] * sc, y0 + (r[1] + r[3]) * sc], [ox + r[0] * sc, y0 + r[1] * sc]]);
        });
        const yN = y0 + s.yb * sc;
        na.set([[ox - 2.6, yN], [ox + 2.6, yN]]);
        cen.set([ox, yN]);
        naLab.pos([ox + 2.0, yN + 0.25]);
        bars.forEach((b, i) => b.color(keys[i] === t.shape ? C.yellow : C.blue));
      }
      const s = sectionProps(t.shape);
      const sag = Math.min(2.6, (1.3 * p.load * I_FLAT) / s.I);
      beam.set(range(0, 1, 60).map((u) => [bx0 + u * (bx1 - bx0), by - sag * Math.sin(Math.PI * u)]));
      const mid = (bx0 + bx1) / 2;
      load.set([mid, by - sag + 0.4 + 0.6 * p.load], [mid, by - sag + 0.08]);
    };
  },
};

// ---------------------------------------------------------------------------
// Jominy end-quench bar
// ---------------------------------------------------------------------------
const STEELS = {
  1045: { name: '1045 plain carbon', max: 58, base: 20, d50: 4 },
  4140: { name: '4140 chromium–molybdenum', max: 56, base: 28, d50: 18 },
  4340: { name: '4340 nickel–chromium–molybdenum', max: 55, base: 40, d50: 50 },
};
const hrc = (d, k) => {
  const s = STEELS[k];
  return s.base + (s.max - s.base) / (1 + (d / s.d50) ** 3);
};
const coolRate = (d) => 245 / Math.max(d, 0.8) ** 1.21;

export const jominy_bar = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find how far along the bar 4140 steel stays at 45 HRC or harder.',
  goal: (t) => t.steel === '4140' && Math.abs(hrc(t.d, '4140') - 45) < 0.4,
  params: [
    { key: 'd', label: 'Distance from the quenched end (mm)', min: 0, max: 50, step: 0.5, value: 1.5 },
    { key: 'steel', label: 'Steel', type: 'choice', value: '1045', options: Object.entries(STEELS).map(([k, s]) => ({ value: k, label: s.name })) },
  ],
  beats: [
    { say: 'Right by the water-sprayed end, 1045 steel cooled at about 150 °C per second and turned to hard martensite: about 56 HRC.', set: { d: 1.5, steel: '1045' } },
    { say: 'Just 15 mm along, it cooled at only about 9 °C per second, slow enough to form soft pearlite: 21 HRC. Plain carbon steel hardens only skin-deep.', set: { d: 15, steel: '1045' } },
    { say: '4340, with nickel, chromium and molybdenum, is still 55 HRC at 15 mm. Its alloying delays pearlite, so even slow cooling makes martensite.', set: { d: 15, steel: '4340' } },
  ],
  readout: (t) => [
    ['Distance from quenched end', `${r1(t.d)} mm`],
    ['Approximate cooling rate at 700 °C', `${Math.round(coolRate(t.d))} °C/s`],
    ['Hardness', `${r1(hrc(t.d, t.steel))} HRC`],
  ],
  setup(kit) {
    const bx = -6.6;
    const bw = 1.3;
    const yb = -2.6;
    const L = 6.3; // world units for 50 mm
    const mmY = (d) => yb + (d / 50) * L;
    const cells = range(0, 49, 50).map(() => kit.rect(bx, 0, bw, L / 50 + 0.005, { color: C.blue, stroke: false, opacity: 1 }));
    kit.rect(bx, yb, bw, L, { fill: false, strokeColor: C.white, width: 2 });
    kit.label('\\text{quenched end}', [bx + bw / 2, yb - 0.3], { size: 11, color: C.blue });
    const spray = range(0, 5, 6).map(() => kit.line([], { color: C.blue, width: 2, opacity: 0.8, create: false }));
    const probe = kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 3 });
    const pLab = kit.label('', [0, 0], { size: 12, color: C.yellow, tex: false, align: 'left' });
    kit.label('\\text{soft}', [-3.4, -2.6], { size: 11, color: C.blue });
    kit.label('\\text{hard}', [-3.4, 3.3], { size: 11, color: C.yellow });
    const key = range(0, 19, 20).map((i) => kit.rect(-3.6, -2.3 + i * 0.27, 0.4, 0.27, { color: lerpC(0x24476b, C.yellow, i / 19), stroke: false, opacity: 1 }));
    void key;
    const P = kit.plane({ x: [0, 50, 5], y: [10, 65, 5], sx: 4.8 / 50, sy: 6.6 / 55, origin: [2.2, -3.4 - 10 * (6.6 / 55)], axisAt: [0, 10], xEvery: 10, yEvery: 10, xLabel: '\\text{mm}', yLabel: '\\text{HRC}' });
    const curves = Object.keys(STEELS).map((k) => kit.line(range(0, 50, 120).map((d) => P.toW(d, hrc(d, k))), { color: C.grey, width: 2, opacity: 0.35 }));
    const tags = Object.keys(STEELS).map((k) => kit.label(k, [P.toW(50, 0)[0] + 0.1, P.toW(0, hrc(50, k))[1]], { size: 11, color: C.grey, tex: false, align: 'left' }));
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    const cur = kit.line([], { color: C.yellow, width: 1.2, dashed: true, create: false });
    let last = '';
    return (p, t, time) => {
      const ks = Object.keys(STEELS);
      if (t.steel !== last) {
        last = t.steel;
        cells.forEach((c, i) => {
          const d = i + 0.5;
          c.set(bx, mmY(i), bw, L / 50 + 0.005).color(lerpC(0x24476b, C.yellow, (hrc(d, t.steel) - 20) / 40));
        });
        curves.forEach((c, i) => c.color(ks[i] === t.steel ? C.pink : C.grey).opacity(ks[i] === t.steel ? 1 : 0.35));
        tags.forEach((g, i) => g.color(ks[i] === t.steel ? C.pink : C.grey));
      }
      spray.forEach((s, i) => {
        const x = bx + 0.1 + i * 0.22;
        const ph = (time * 2 + i * 0.37) % 1;
        s.set([[x, yb - 1.6 + ph * 1.2], [x, yb - 1.6 + ph * 1.2 + 0.25]]);
      });
      const y = mmY(p.d);
      probe.set([bx - 1.0, y], [bx - 0.05, y]);
      pLab.set(`${r1(p.d)} mm`).pos([bx - 1.0 - 0.05, y + 0.28]);
      pLab.el.style.transform = 'translateX(-60%)';
      const h = hrc(p.d, t.steel);
      dot.set(P.toW(p.d, h));
      cur.set([P.toW(p.d, 10), P.toW(p.d, 65)]);
    };
  },
};

// ---------------------------------------------------------------------------
// Injection moulding: one cycle, cooling time from wall thickness
// ---------------------------------------------------------------------------
const ALPHA = 1e-7;
const coolT = (s) => ((s / 1000) ** 2 / (Math.PI ** 2 * ALPHA)) * Math.log((8 / Math.PI ** 2) * (190 / 50));
const PHASES = [['fill', 1, C.gold], ['pack', 3, C.red], ['cool', 0, C.blue], ['open + eject', 2, C.green]];
const cycleOf = (s) => PHASES.map(([n, d]) => (n === 'cool' ? coolT(s) : d));
const mould = { ph: 0 };

export const injection_cycle = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make the whole cycle shorter than 12 seconds by choosing the wall thickness.',
  goal: (t) => cycleOf(t.s).reduce((a, b) => a + b, 0) < 12,
  params: [{ key: 's', label: 'Wall thickness (mm)', min: 1, max: 6, step: 0.1, value: 2 }],
  beats: [
    { say: 'A 2 mm polypropylene wall: fill in 1 s, pack for 3 s, cool for about 5 s, then open and eject. A whole part every 10.6 s.', set: { s: 2 } },
    { say: 'Double the wall to 4 mm and cooling takes four times as long, about 18 s. The cooling bar now dominates the cycle.', set: { s: 4 } },
    { say: 'A 6 mm wall needs about 41 s of cooling. Thick sections are slow and costly, so designers keep walls thin and even, and add ribs for strength.', set: { s: 6 } },
  ],
  readout: (t) => {
    const c = cycleOf(t.s);
    const tot = c.reduce((a, b) => a + b, 0);
    return [
      ['Cooling time', `${r1(c[2])} s`],
      ['Whole cycle', `${r1(tot)} s`],
      ['Share spent cooling', `${Math.round((c[2] / tot) * 100)}%`],
      ['Parts per hour', big(3600 / tot)],
    ];
  },
  setup(kit) {
    // barrel and screw
    kit.rect(-7.6, 0.2, 5.0, 1.4, { color: C.grey, opacity: 0.25, strokeColor: C.axis });
    kit.rect(-7.3, 1.6, 0.9, 1.3, { color: C.grey, opacity: 0.2, strokeColor: C.axis });
    kit.label('\\text{pellets}', [-6.85, 3.15], { size: 11 });
    const screw = kit.line([], { color: C.white, width: 2, create: false });
    const shaft = kit.line([], { color: C.axis, width: 4, create: false });
    const melt = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.8, stroke: false });
    kit.label('\\text{heated barrel and turning screw}', [-5.1, -0.2], { size: 11, color: C.grey });
    const heaters = range(0, 4, 5).map((i) => kit.rect(-6.9 + i * 0.85, 1.6, 0.6, 0.15, { color: C.red, opacity: 0.7, stroke: false }));
    void heaters;
    // mould halves
    const fixed = kit.rect(-2.4, -1.2, 1.4, 4.2, { color: C.axis, opacity: 0.35, strokeColor: C.axis });
    void fixed;
    const moving = kit.rect(0, -1.2, 1.6, 4.2, { color: C.axis, opacity: 0.35, strokeColor: C.axis });
    const part = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.95, strokeColor: C.white });
    const pin = kit.line([], { color: C.white, width: 3, create: false });
    const stage = kit.label('', [-0.6, 3.6], { size: 15, color: C.yellow, tex: false });
    // timeline bar
    const tx0 = -7.4;
    const tw = 14.8;
    const ty = -3.3;
    const segs = PHASES.map(([, , col]) => kit.rect(0, ty, 0.01, 0.5, { color: col, opacity: 0.6, strokeColor: col }));
    const segL = PHASES.map(([n]) => kit.label(n, [0, ty - 0.35], { size: 11, tex: false }));
    const cursor = kit.line([], { color: C.white, width: 3, create: false });
    const scale = kit.label('', [7.4, ty + 0.85], { size: 11, color: C.grey, tex: false, align: 'right' });
    kit.label('\\text{cross-section of the part}', [4.6, 3.6], { size: 11, color: C.grey });
    const wall = kit.rect(0, 0, 0.01, 0.01, { color: C.gold, opacity: 0.9, strokeColor: C.white });
    const core = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    return (p, t, time, dt) => {
      const c = cycleOf(p.s);
      const tot = c.reduce((a, b) => a + b, 0);
      mould.ph = (mould.ph + 4 * Math.min(dt || 0.016, 0.05)) % tot;
      if (!Number.isFinite(mould.ph)) mould.ph = 0;
      const ph = mould.ph;
      let k = 0;
      let acc = 0;
      while (k < 3 && ph > acc + c[k]) {
        acc += c[k];
        k++;
      }
      const f = clamp((ph - acc) / c[k], 0, 1);
      // timeline
      let x = tx0;
      segs.forEach((sg, i) => {
        const w = (c[i] / Math.max(tot, 50)) * tw;
        sg.set(x, ty, w, 0.5);
        segL[i].pos([x + w / 2, ty - 0.35]).visible(w > 0.9);
        x += w;
      });
      const cx = tx0 + (ph / Math.max(tot, 50)) * tw;
      cursor.set([[cx, ty - 0.1], [cx, ty + 0.6]]);
      scale.set(`cycle ${r1(tot)} s · bar width = 50 s`);
      // screw: turns while melting (pack and cool), pushes during fill
      const push = k === 0 ? f : k === 1 || k === 2 ? 1 - (k === 2 ? f : 0) : 0;
      const sx0 = -7.3 + 1.0 * push;
      const rot = k === 2 ? time * 6 : 0;
      shaft.set([[sx0, 0.9], [sx0 + 4.4, 0.9]]);
      screw.set(range(0, 1, 80).map((u) => [sx0 + u * 4.4, 0.9 + 0.5 * Math.sin(u * 40 + rot)]));
      melt.set(sx0 + 3.6, 0.35, Math.max(0.01, -2.6 - (sx0 + 3.6)), 1.1);
      // mould and part
      const open = k === 3 ? Math.sin(Math.PI * f) * 2.2 : 0;
      moving.set(-0.6 + open, -1.2, 1.6, 4.2);
      const fillH = k === 0 ? f : 1;
      const hot = k <= 1 ? 0 : k === 2 ? f : 1;
      const col = lerpC(C.gold, 0x6f8fa8, hot);
      const pw = 0.2 + p.s * 0.06;
      const eject = k === 3 && f > 0.35 ? (f - 0.35) * 2.2 : 0;
      part.set(-1.0 - pw / 2 + eject, -0.8, pw, 3.4 * fillH);
      part.color(col);
      part.visible(!(k === 3 && f > 0.9));
      pin.set(k === 3 ? [[-0.6 + open + 0.8, 0.9], [-0.6 + open + 0.8 - 0.6 * eject, 0.9]] : []);
      stage.set({ 0: 'filling', 1: 'packing', 2: 'cooling', 3: 'opening and ejecting' }[k]);
      // right: wall cross-section to scale
      const ww = p.s * 0.45;
      wall.set(4.6 - ww / 2, -1.0, ww, 4.0).color(col);
      core.set([[4.6, -1.2], [4.6, 3.2]]);
    };
  },
};

// ---------------------------------------------------------------------------
// A truss bridge solved by the method of joints
// ---------------------------------------------------------------------------
const TJ = [[-6, -0.8], [-3, -0.8], [0, -0.8], [3, -0.8], [6, -0.8], [-3, 1.8], [0, 1.8], [3, 1.8]]; // L0..L4, U1..U3
const TBASE = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [0, 5], [7, 4], [5, 1], [6, 2], [7, 3]];
const TDIAG = { pratt: [[5, 2], [7, 2]], howe: [[1, 6], [3, 6]] };
const LOADP = 100;
function solveTruss(type, j) {
  const M = [...TBASE, ...TDIAG[type]];
  const n = M.length + 3;
  const A = Array.from({ length: 16 }, () => Array.from({ length: n }, () => 0));
  const b = Array.from({ length: 16 }, () => 0);
  M.forEach(([a, c], m) => {
    const dx = TJ[c][0] - TJ[a][0];
    const dy = TJ[c][1] - TJ[a][1];
    const L = Math.hypot(dx, dy);
    A[2 * a][m] += dx / L;
    A[2 * a + 1][m] += dy / L;
    A[2 * c][m] -= dx / L;
    A[2 * c + 1][m] -= dy / L;
  });
  A[0][M.length] = 1; // pin at L0, horizontal
  A[1][M.length + 1] = 1; // pin at L0, vertical
  A[9][M.length + 2] = 1; // roller at L4, vertical
  b[2 * j + 1] = LOADP; // load acts downwards: move it to the right-hand side
  // Gaussian elimination with partial pivoting
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < 16; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r;
    [A[col], A[piv]] = [A[piv], A[col]];
    [b[col], b[piv]] = [b[piv], b[col]];
    for (let r = 0; r < 16; r++) {
      if (r === col || Math.abs(A[col][col]) < 1e-12) continue;
      const f = A[r][col] / A[col][col];
      for (let cc = col; cc < n; cc++) A[r][cc] -= f * A[col][cc];
      b[r] -= f * b[col];
    }
  }
  const x = A.slice(0, n).map((row, i) => b[i] / row[i]);
  return { M, F: x.slice(0, M.length).map((v) => (Math.abs(v) < 1e-6 ? 0 : v)), RA: x[M.length + 1], RB: x[M.length + 2] };
}

export const truss_bridge = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Move the 100 kN load until the left support carries 75 kN.',
  goal: (t) => Math.abs(solveTruss(t.type, t.j).RA - 75) < 0.5,
  params: [
    { key: 'j', label: 'Load at bottom joint', min: 1, max: 3, step: 1, value: 2 },
    { key: 'type', label: 'Pattern', type: 'choice', value: 'pratt', options: [{ value: 'pratt', label: 'Pratt (diagonals pulled)' }, { value: 'howe', label: 'Howe (diagonals pushed)' }] },
  ],
  beats: [
    { say: 'A Pratt truss with 100 kN in the middle. The top chord is squeezed (red), the bottom chord is stretched (blue), and the diagonals are pulled.', set: { j: 2, type: 'pratt' } },
    { say: 'Flip the diagonals into a Howe truss. Now the diagonals are pushed and the verticals pulled: timber struts with iron tie rods.', set: { j: 2, type: 'howe' } },
    { say: 'Move the load near the left support. The left support now takes 75 kN, and the members near it work hardest.', set: { j: 1, type: 'pratt' } },
  ],
  readout: (t) => {
    const s = solveTruss(t.type, t.j);
    const mx = Math.max(...s.F);
    const mn = Math.min(...s.F);
    return [
      ['Left support R_A', `${r1(s.RA)} kN`],
      ['Right support R_B', `${r1(s.RB)} kN`],
      ['Largest tension', `${r1(mx)} kN`],
      ['Largest compression', `${r1(-mn)} kN`],
      ['Members + reactions = 2 × joints', '13 + 3 = 2 × 8'],
    ];
  },
  setup(kit) {
    const mem = range(0, 12, 13).map(() => kit.line([], { color: C.white, width: 3, create: false }));
    const vals = range(0, 12, 13).map(() => kit.label('', [0, 0], { size: 11, tex: false }));
    TJ.forEach((q) => kit.dot(q, { r: 0.12, color: C.white, z: 6 }));
    kit.fill([[-6, -0.95], [-6.45, -1.7], [-5.55, -1.7]], { color: C.grey, opacity: 0.8 });
    kit.dot([6, -1.25], { r: 0.3, color: C.grey });
    kit.line([[-7.4, -1.7], [-5.0, -1.7]], { color: C.grey, width: 2 });
    kit.line([[5.0, -1.7], [7.4, -1.7]], { color: C.grey, width: 2 });
    const load = kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 4 });
    const lLab = kit.label('100\\,\\text{kN}', [0, 0], { size: 13, color: C.yellow });
    const ra = kit.arrow([-6, -3.1], [-6, -1.8], { color: C.green, width: 3 });
    const rb = kit.arrow([6, -3.1], [6, -1.8], { color: C.green, width: 3 });
    const raL = kit.label('', [-5.2, -2.6], { size: 12, color: C.green, tex: false });
    const rbL = kit.label('', [5.2, -2.6], { size: 12, color: C.green, tex: false });
    kit.label('\\text{blue = tension (pulled)}', [-7.6, 3.9], { size: 12, color: C.blue, align: 'left' });
    kit.label('\\text{red = compression (pushed)}', [-7.6, 3.4], { size: 12, color: C.red, align: 'left' });
    kit.label('\\text{numbers in kN}', [7.6, 3.9], { size: 12, color: C.grey, align: 'right' });
    let last = '';
    return (p, t, time) => {
      const key = `${t.type}${t.j}`;
      if (key !== last) {
        last = key;
        const s = solveTruss(t.type, t.j);
        s.M.forEach(([a, c], m) => {
          const F = s.F[m];
          const col = Math.abs(F) < 0.05 ? C.grey : F > 0 ? C.blue : C.red;
          mem[m].set([TJ[a], TJ[c]]).color(col);
          mem[m].obj.material.linewidth = 2 + Math.min(Math.abs(F) / 12, 8);
          const mx = (TJ[a][0] + TJ[c][0]) / 2;
          const my = (TJ[a][1] + TJ[c][1]) / 2;
          const horiz = Math.abs(TJ[a][1] - TJ[c][1]) < 0.01;
          vals[m].set(Math.abs(F) < 0.05 ? '0' : `${Math.round(Math.abs(F))}`).pos([mx + (horiz ? 0 : 0.35), my + (horiz ? (my > 0 ? 0.32 : -0.32) : 0.1)]).color(col);
        });
        raL.set(`${r1(s.RA)} kN`);
        rbL.set(`${r1(s.RB)} kN`);
        ra.set([-6, -1.8 - 0.018 * s.RA], [-6, -1.8]);
        rb.set([6, -1.8 - 0.018 * s.RB], [6, -1.8]);
      }
      const q = TJ[t.j];
      const bob = 0.06 * Math.sin(time * 3);
      load.set([q[0], q[1] - 0.12], [q[0], q[1] - 1.9 + bob]);
      lLab.pos([q[0] + 0.85, q[1] - 1.6 + bob]);
      void p;
    };
  },
};
