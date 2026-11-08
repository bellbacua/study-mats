import { C } from '../theme';
import { clamp, range } from '../kit';

const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r3 = (v) => `${Math.round(v * 1000) / 1000}`.replace('-', '−');
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
const peso = (v) => `₱${r2(v)} M`;

// ---------------------------------------------------------------------------
// Shewhart control chart
// ---------------------------------------------------------------------------
const CC_HOURS = 30;
const CC_START = 15;
const CC_SIG = 0.1;
const CC_Z = range(0, CC_HOURS - 1, CC_HOURS).map((i) => normals(10, 2706 + i * 37));
const ccMeans = (n, drift) => CC_Z.map((zs, i) => 100 + (i >= CC_START ? drift : 0) + (CC_SIG * zs.slice(0, n).reduce((a, b) => a + b, 0)) / n);
const ccLim = (n) => (3 * CC_SIG) / Math.sqrt(n);
function ccSignal(n, drift) {
  const m = ccMeans(n, drift);
  const L = ccLim(n);
  const out = m.map((v) => Math.abs(v - 100) > L);
  const first = out.findIndex((o, i) => o && i >= CC_START);
  const falseA = out.filter((o, i) => o && i < CC_START).length;
  return { m, L, first, falseA };
}

export const control_chart = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'A 0.1 mm drift starts at hour 15. Find the smallest sample size that catches it within 3 hours.',
  goal: (t) => {
    const s = ccSignal(t.n, t.drift);
    const quick = (n) => {
      const q = ccSignal(n, 0.1);
      return q.first >= 0 && q.first - CC_START <= 2 && q.falseA === 0;
    };
    return Math.abs(t.drift - 0.1) < 0.005 && s.falseA === 0 && quick(t.n) && !quick(t.n - 1);
  },
  params: [
    { key: 'drift', label: 'Drift after hour 15 (mm)', min: 0, max: 0.3, step: 0.01, value: 0 },
    { key: 'n', label: 'Rods per sample n', min: 2, max: 10, step: 1, value: 5 },
  ],
  beats: [
    { say: 'No change in the machine: every hourly average wanders inside the limits. This is ordinary noise, and adjusting the machine would only add to it.', set: { drift: 0, n: 5 } },
    { say: 'At hour 15 the cutter drifts 0.2 mm long. The very first sample after it jumps above the upper limit: a real signal. Stop and find the cause.', set: { drift: 0.2, n: 5 } },
    { say: 'A smaller drift of 0.1 mm with samples of only 2 rods: the limits are wide and the change hides in the noise for 7 hours. Bigger samples narrow the limits.', set: { drift: 0.1, n: 2 } },
  ],
  readout: (t) => {
    const s = ccSignal(t.n, t.drift);
    return [
      ['Control limits', `100 ± ${r3(s.L)} mm`],
      ['False alarms before hour 15', `${s.falseA}`],
      ['First signal after the drift', s.first < 0 ? 'none in 30 hours' : `hour ${s.first + 1} (${s.first - CC_START + 1} h after it began)`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 30, 5], y: [99.6, 100.5, 0.1], sx: 14 / 30, sy: 7.2 / 0.9, origin: [-7.2, -3.4 - 99.6 * 8], axisAt: [0, 99.6], xEvery: 5, yEvery: 0.2, fmt: (v, ax) => (ax === 'y' ? r1(v) : `${v}`), xLabel: '\\text{hour}', yLabel: '\\text{mean length (mm)}' });
    kit.line([P.toW(0, 100), P.toW(30, 100)], { color: C.green, width: 2 });
    const ucl = kit.line([], { color: C.red, width: 2, dashed: true, create: false });
    const lcl = kit.line([], { color: C.red, width: 2, dashed: true, create: false });
    const uL = kit.label('\\text{UCL}', [0, 0], { size: 12, color: C.red, align: 'right' });
    const lL = kit.label('\\text{LCL}', [0, 0], { size: 12, color: C.red, align: 'right' });
    kit.line([P.toW(CC_START + 0.5, 99.6), P.toW(CC_START + 0.5, 100.5)], { color: C.grey, width: 1, dashed: true });
    kit.label('\\text{drift begins}', [P.toW(CC_START + 0.6, 0)[0], P.toW(0, 100.45)[1]], { size: 11, color: C.grey, align: 'right' });
    const path = kit.line([], { color: C.blue, width: 1.5, opacity: 0.7, create: false });
    const dots = range(0, CC_HOURS - 1, CC_HOURS).map(() => kit.dot([0, 0], { r: 0.1, color: C.blue, z: 4 }));
    return (p, t, time) => {
      const s = ccSignal(t.n, p.drift);
      const shown = CC_HOURS;
      const pulse = Math.floor(time * 2) % CC_HOURS;
      const pts = s.m.map((v, i) => P.toW(i + 0.5, clamp(v, 99.6, 100.5)));
      path.set(pts.slice(0, shown));
      dots.forEach((d, i) => {
        const out = Math.abs(s.m[i] - 100) > s.L;
        d.visible(i < shown).set(pts[i]).color(out ? C.red : C.blue).scale((out ? 1.5 : 1) * (i === pulse ? 1.35 : 1));
      });
      ucl.set([P.toW(0, 100 + s.L), P.toW(30, 100 + s.L)]);
      lcl.set([P.toW(0, 100 - s.L), P.toW(30, 100 - s.L)]);
      uL.pos([P.toW(30, 0)[0], P.toW(0, 100 + s.L)[1] + 0.22]);
      lL.pos([P.toW(30, 0)[0], P.toW(0, 100 - s.L)[1] - 0.22]);
    };
  },
};

// ---------------------------------------------------------------------------
// Stress shielding: bone and stem share the load
// ---------------------------------------------------------------------------
const STEMS = {
  ti: { name: 'titanium alloy', E: 110, col: 0xa9b4c2 },
  cocr: { name: 'cobalt-chrome', E: 210, col: 0xd7dde5 },
  ss: { name: '316L stainless steel', E: 193, col: 0xc4cad3 },
  peek: { name: 'PEEK plastic', E: 3.6, col: 0xd9c49a },
};
const E_BONE = 18;
const D_BONE = 28;
const boneShare = (d, k) => {
  const Ab = (Math.PI / 4) * (D_BONE ** 2 - d ** 2);
  const Ai = (Math.PI / 4) * d ** 2;
  return (E_BONE * Ab) / (E_BONE * Ab + STEMS[k].E * Ai);
};

export const implant_stiffness = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Choose a metal stem that leaves at least half of the load to the bone.',
  goal: (t) => t.k !== 'peek' && boneShare(t.d, t.k) >= 0.5,
  params: [
    { key: 'd', label: 'Stem diameter (mm)', min: 8, max: 16, step: 0.5, value: 14 },
    { key: 'k', label: 'Stem material', type: 'choice', value: 'cocr', options: Object.entries(STEMS).map(([k, s]) => ({ value: k, label: `${s.name} (E = ${s.E} GPa)` })) },
  ],
  beats: [
    { say: 'A 14 mm cobalt-chrome stem: it is 12 times stiffer than bone and carries about four-fifths of the load. The shielded bone around it slowly thins.', set: { d: 14, k: 'cocr' } },
    { say: 'A 12 mm titanium-alloy stem: half as stiff as cobalt-chrome, so the bone takes back about 42% of the load.', set: { d: 12, k: 'ti' } },
    { say: 'A 10 mm titanium stem lets the bone carry just over half. Too thin, though, and the stem itself may bend or break: the designer balances both.', set: { d: 10, k: 'ti' } },
  ],
  readout: (t) => {
    const b = boneShare(t.d, t.k);
    return [
      ['Load carried by bone', `${Math.round(b * 100)}%`],
      ['Load carried by stem', `${Math.round((1 - b) * 100)}%`],
      ['Bone outlook', b >= 0.5 ? 'well loaded: stays strong' : b >= 0.3 ? 'partly shielded: some bone loss' : 'heavily shielded: bone thins'],
    ];
  },
  setup(kit) {
    const cx = -4.0;
    const yb = -3.6;
    const yt = 2.6;
    const s = 0.11; // world units per mm
    const boneL = kit.rect(0, 0, 0.01, 0.01, { color: 0xe8dcc0, opacity: 1, stroke: false });
    const boneR = kit.rect(0, 0, 0.01, 0.01, { color: 0xe8dcc0, opacity: 1, stroke: false });
    const stem = kit.rect(0, 0, 0.01, 0.01, { color: C.grey, opacity: 1, strokeColor: C.white });
    const pores = range(0, 59, 60).map(() => kit.dot([0, 0], { r: 0.05, color: C.bg }));
    const PR = (() => {
      const u = rng(97);
      return range(0, 59, 60).map(() => [u(), u(), u()]);
    })();
    const head = kit.fill(range(0, 2 * Math.PI, 40).map((a) => [cx + 0.6 * Math.cos(a), yt + 0.55 + 0.6 * Math.sin(a)]), { color: C.grey, opacity: 1 });
    void head;
    kit.arrow([cx, 4.45], [cx, yt + 1.2], { color: C.red, width: 4 });
    kit.label('\\text{body weight}', [cx + 0.3, 4.1], { size: 12, color: C.red, align: 'left' });
    const fb = [kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 3 }), kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 3 })];
    const fs = kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3 });
    kit.label('\\text{bone}', [cx - 2.3, -4.1], { size: 12, color: C.yellow });
    kit.label('\\text{stem}', [cx, -4.1], { size: 12, color: C.blue });
    // share bar
    const bx = 1.6;
    kit.label('\\text{share of the load}', [4.6, 3.6], { size: 13 });
    const barB = kit.rect(bx, 2.4, 0.01, 0.6, { color: C.yellow, opacity: 0.9, stroke: false });
    const barS = kit.rect(bx, 2.4, 0.01, 0.6, { color: C.blue, opacity: 0.9, stroke: false });
    kit.line([[bx + 3, 2.25], [bx + 3, 3.15]], { color: C.white, width: 1.5, dashed: true });
    const lab = kit.label('', [bx, 1.9], { size: 13, tex: false, align: 'left' });
    // stiffness chart
    const P = kit.plane({ x: [0, 5, 1], y: [0, 220, 50], sx: 1.15, sy: 3.6 / 220, origin: [1.6, -3.5], axisAt: [0, 0], xEvery: 10, yEvery: 50, numbers: true, yLabel: 'E\\;(\\text{GPa})', fmt: (v, ax) => (ax === 'y' ? `${v}` : '') });
    const bars = [['\\text{bone}', E_BONE, C.yellow], ...Object.entries(STEMS).map(([k, d]) => [`\\text{${{ ti: 'Ti', cocr: 'CoCr', ss: '316L', peek: 'PEEK' }[k]}}`, d.E, d.col])];
    const order = ['bone', 'ti', 'cocr', 'ss', 'peek'];
    const bRects = bars.map(([tx, E, col], i) => {
      const [x0, y0] = P.toW(i + 0.2, 0);
      const [, y1] = P.toW(0, E);
      kit.label(tx, [x0 + 0.35, y0 - 0.3], { size: 11, color: col });
      return kit.rect(x0, y0, 0.7, Math.max(0.02, y1 - y0), { color: col, opacity: 0.5, stroke: false });
    });
    return (p, t) => {
      const b = boneShare(p.d, t.k);
      const wOut = D_BONE * s;
      const wIn = p.d * s;
      const thin = clamp((0.5 - b) / 0.4, 0, 1);
      const cort = (wOut - wIn) / 2;
      boneL.set(cx - wOut / 2, yb, cort, yt - yb).color(lerpC(0xe8dcc0, 0x9c8f78, thin));
      boneR.set(cx + wIn / 2, yb, cort, yt - yb).color(lerpC(0xe8dcc0, 0x9c8f78, thin));
      stem.set(cx - wIn / 2, yb + 0.6, wIn, yt - yb - 0.6 + 0.6).color(STEMS[t.k].col);
      pores.forEach((d, i) => {
        const [u, v, w] = PR[i];
        const left = i % 2 === 0;
        const x = left ? cx - wOut / 2 + u * cort : cx + wIn / 2 + u * cort;
        d.visible(w < thin * 0.9).set([x, yb + 0.2 + v * (yt - yb - 0.4)]);
      });
      const Lb = 0.4 + 2.2 * b;
      const Ls = 0.4 + 2.2 * (1 - b);
      fb[0].set([cx - wOut / 2 + cort / 2, yb + 0.2 + Lb], [cx - wOut / 2 + cort / 2, yb + 0.2]);
      fb[1].set([cx + wIn / 2 + cort / 2, yb + 0.2 + Lb], [cx + wIn / 2 + cort / 2, yb + 0.2]);
      fs.set([cx, yb + 0.8 + Ls], [cx, yb + 0.8]);
      barB.set(bx, 2.4, Math.max(0.01, 6 * b), 0.6);
      barS.set(bx + 6 * b, 2.4, Math.max(0.01, 6 * (1 - b)), 0.6);
      lab.set(`bone ${Math.round(b * 100)}%   ·   stem ${Math.round((1 - b) * 100)}%`);
      bRects.forEach((r, i) => r.opacity(order[i] === 'bone' || order[i] === t.k ? 0.95 : 0.3));
    };
  },
};

// ---------------------------------------------------------------------------
// Plant size and the six-tenths rule
// ---------------------------------------------------------------------------
const PL = { Q0: 10000, C0: 200, price: 25000, cv: 18000, F: 12, r: 0.15 };
const capCost = (Q) => PL.C0 * (Q / PL.Q0) ** 0.6; // ₱ M
const profit = (Q) => (Q * (PL.price - PL.cv)) / 1e6 - PL.F - PL.r * capCost(Q); // ₱ M per year
const costPerT = (Q) => PL.cv + ((PL.F + PL.r * capCost(Q)) * 1e6) / Q; // ₱ per tonne

export const plant_scaleup = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the smallest plant (to the nearest 100 t/yr) that makes a profit.',
  goal: (t) => profit(t.Q) >= 0 && profit(t.Q - 100) < 0,
  params: [{ key: 'Q', label: 'Plant capacity Q (t/yr)', min: 1000, max: 40000, step: 100, value: 10000 }],
  beats: [
    { say: 'The 10,000 t/yr reference plant: ₱200 M to build. Each tonne costs about ₱22,200 to make and sells for ₱25,000, a profit of ₱28 M a year.', set: { Q: 10000 } },
    { say: 'A 3,000 t/yr plant costs only ₱97 M, but its capital and fixed costs are spread over few tonnes: about ₱26,900 each. It loses money.', set: { Q: 3000 } },
    { say: 'At 40,000 t/yr the plant costs ₱460 M, 2.3 times as much for 4 times the output. Each tonne costs about ₱20,000, if the market will buy them all.', set: { Q: 40000 } },
  ],
  readout: (t) => [
    ['Capital cost', `₱${Math.round(capCost(t.Q))} M`],
    ['Cost per tonne', `₱${Math.round(costPerT(t.Q) / 100) * 100}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')],
    ['Profit per year', `${profit(t.Q) < 0 ? 'loss of ' : ''}${peso(Math.abs(profit(t.Q)))}`],
  ],
  setup(kit) {
    // tank whose volume ∝ Q
    const cx = -4.6;
    const yb = -3.4;
    const tank = kit.rect(0, 0, 0.01, 0.01, { color: C.blue, opacity: 0.35, strokeColor: C.white, width: 2 });
    const ref = kit.rect(0, 0, 0.01, 0.01, { color: C.grey, opacity: 0, strokeColor: C.grey, fill: false });
    kit.label('\\text{dashed: 10,000 t/yr plant}', [cx, -4.0], { size: 11, color: C.grey });
    const capL = kit.label('', [cx, 3.9], { size: 14, color: C.yellow, tex: false });
    const P = kit.plane({ x: [0, 40000, 5000], y: [15000, 35000, 5000], sx: 6 / 40000, sy: 6.4 / 20000, origin: [1.4, -3.3 - 15000 * (6.4 / 20000)], axisAt: [0, 15000], xEvery: 10000, yEvery: 5000, fmt: (v, ax) => (ax === 'x' ? `${v / 1000}k` : `${v / 1000}k`), xLabel: 'Q\\;(\\text{t/yr})', yLabel: '₱/\\text{t}' });
    kit.line(range(1500, 40000, 200).map((Q) => P.toW(Q, clamp(costPerT(Q), 15000, 35000))), { color: C.pink, width: 2.5 });
    kit.line([P.toW(0, PL.price), P.toW(40000, PL.price)], { color: C.green, width: 2, dashed: true });
    kit.label('\\text{selling price}', [P.toW(40000, 0)[0], P.toW(0, PL.price)[1] + 0.25], { size: 11, color: C.green, align: 'right' });
    kit.label('\\text{cost per tonne}', [P.toW(40000, 0)[0], P.toW(0, 19800)[1] + 0.3], { size: 11, color: C.pink, align: 'right' });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    const gap = kit.line([], { color: C.yellow, width: 2, create: false });
    return (p, t) => {
      // tank: height = width, volume ∝ Q → side ∝ Q^(1/3)
      const side = 2.6 * (p.Q / PL.Q0) ** (1 / 3);
      const s0 = 2.6;
      tank.set(cx - side / 2, yb, side, side).color(profit(p.Q) >= 0 ? C.blue : C.red);
      ref.set(cx - s0 / 2, yb, s0, s0);
      capL.set(`${Math.round(t.Q).toLocaleString('en-US')} t/yr · ₱${Math.round(capCost(t.Q))} M to build`);
      const c = clamp(costPerT(p.Q), 15000, 35000);
      dot.set(P.toW(p.Q, c));
      gap.set([P.toW(p.Q, c), P.toW(p.Q, PL.price)]).color(profit(p.Q) >= 0 ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// 3D printing a dome: layer height, stair steps and time
// ---------------------------------------------------------------------------
const DOME_R = 20; // mm
const layerTime = (z) => 20 + 25 * (1 - (z / DOME_R) ** 2); // s
function printTime(h) {
  let tt = 0;
  for (let z = 0; z < DOME_R - 1e-9; z += h) tt += layerTime(Math.min(DOME_R, z + h / 2));
  return tt / 60; // min
}
const step45 = (h) => h * Math.cos(Math.PI / 4);
const domeR = (z) => Math.sqrt(Math.max(0, DOME_R ** 2 - z ** 2));
const prn = { u: 0 };

export const print_layers = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Keep the stair step on the 45° slope at 0.1 mm or less, and finish the print within 2 hours.',
  goal: (t) => step45(t.h) <= 0.1 && printTime(t.h) <= 120,
  params: [{ key: 'h', label: 'Layer height h (mm)', min: 0.05, max: 1, step: 0.005, value: 0.6 }],
  beats: [
    { say: 'Thick 0.6 mm layers: only 34 layers and about 21 minutes, but the dome looks like a stack of rings. On the 45° slope each step sticks out about 0.42 mm.', set: { h: 0.6 } },
    { say: 'At 0.2 mm, 100 layers take about an hour and the steps are 0.14 mm: smooth to the eye, but still too rough for this part.', set: { h: 0.2 } },
    { say: 'At 0.05 mm the steps are only 0.035 mm, but the print takes about 4 hours. Thinner is smoother, and slower in proportion.', set: { h: 0.05 } },
  ],
  readout: (t) => [
    ['Number of layers', `${Math.ceil(DOME_R / t.h - 1e-9)}`],
    ['Print time', `${Math.round(printTime(t.h))} min`],
    ['Stair step at the 45° slope', `${r3(step45(t.h))} mm`],
  ],
  setup(kit) {
    const cx = -3.4;
    const yb = -3.6;
    const s = 0.215; // world per mm
    kit.rect(cx - DOME_R * s - 0.6, yb - 0.25, 2 * DOME_R * s + 1.2, 0.25, { color: C.axis, opacity: 0.8, stroke: false });
    kit.label('\\text{build plate}', [cx, yb - 0.55], { size: 11, color: C.grey });
    kit.line(range(0, Math.PI, 80).map((a) => [cx + DOME_R * s * Math.cos(a), yb + DOME_R * s * Math.sin(a)]), { color: C.white, width: 1, dashed: true });
    const layers = range(0, 399, 400).map(() => kit.rect(0, 0, 0.01, 0.01, { color: C.teal, opacity: 0.85, stroke: false }));
    const nozzle = kit.fill([], { color: C.red, opacity: 1, z: 6 });
    // zoom on the 45° point
    const zx = 5.0;
    const zy = 1.0;
    const zr = 2.4;
    const Z = 1.2 / 0.5; // world per mm in the zoom: 2.4 world = 1 mm across
    kit.line(range(0, 2 * Math.PI, 80).map((a) => [zx + zr * Math.cos(a), zy + zr * Math.sin(a)]), { color: C.white, width: 1.5 });
    kit.label('\\text{zoom at the } 45° \\text{ slope (circle = 2 mm)}', [zx, zy + zr + 0.4], { size: 12 });
    const zTrue = kit.line([], { color: C.white, width: 2, dashed: true, create: false });
    const zStair = kit.line([], { color: C.teal, width: 2.5, create: false });
    const zP = Math.SQRT1_2 * DOME_R;
    const time = kit.label('', [cx, 4.0], { size: 14, color: C.yellow, tex: false });
    const toZ = (r, z) => [zx + (r - zP) * Z, zy + (z - zP) * Z];
    const inZ = ([x, y]) => Math.hypot(x - zx, y - zy) <= zr;
    return (p, t, tm, dt) => {
      const h = p.h;
      const N = Math.ceil(DOME_R / h - 1e-9);
      prn.u = (prn.u + Math.min(dt || 0.016, 0.05) * 0.18) % 1.25;
      const done = Math.min(N, Math.floor(Math.min(1, prn.u) * N) + 1);
      const drawN = Math.min(N, layers.length);
      const per = N / drawN;
      layers.forEach((L, i) => {
        if (i >= drawN) return L.visible(false);
        const k0 = Math.floor(i * per);
        const z = k0 * h;
        const hh = per * h;
        const r = domeR(Math.min(DOME_R, z + hh / 2));
        L.visible(k0 < done).set(cx - r * s, yb + z * s, 2 * r * s, Math.max(0.01, hh * s * 0.96)).color(k0 === done - 1 ? C.yellow : C.teal);
      });
      const zt = Math.min(DOME_R, done * h);
      const rN = domeR(Math.max(0, zt - h / 2));
      const nx = cx + rN * s * Math.cos(tm * 3);
      const ny = yb + zt * s + 0.05;
      nozzle.set([[nx - 0.18, ny + 0.5], [nx + 0.18, ny + 0.5], [nx, ny]]);
      time.set(`layer ${done} of ${N} · ${Math.round(printTime(h))} min in total`);
      zTrue.set(range(zP - 1.2, zP + 1.2, 60).map((z) => toZ(domeR(z), z)).filter(inZ));
      const st = [];
      const k0 = Math.floor((zP - 1.5) / h);
      for (let k = Math.max(0, k0); k * h < zP + 1.5; k++) {
        const r = domeR(Math.min(DOME_R, k * h + h / 2));
        st.push(toZ(r, k * h), toZ(r, (k + 1) * h));
      }
      zStair.set(st.filter(inZ));
    };
  },
};

// ---------------------------------------------------------------------------
// Startup cash runway
// ---------------------------------------------------------------------------
const SU = { costs: 0.4, R0: 0.05, months: 48 }; // ₱ M per month
function cashPath(F, g) {
  const out = [F];
  let cash = F;
  let be = -1;
  let broke = -1;
  for (let m = 0; m < SU.months; m++) {
    const R = SU.R0 * (1 + g / 100) ** m;
    if (be < 0 && R >= SU.costs) be = m;
    cash += R - SU.costs;
    if (broke < 0 && cash < 0) broke = m;
    out.push(cash);
  }
  return { out, be, broke };
}
const survives = (F, g) => {
  const c = cashPath(F, g);
  return c.be >= 0 && (c.broke < 0 || c.broke > c.be);
};

export const startup_runway = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With ₱5 M of funding, find the slowest monthly growth that still reaches break-even before the cash runs out.',
  goal: (t) => Math.abs(t.F - 5) < 0.01 && survives(t.F, t.g) && !survives(t.F, t.g - 0.5),
  params: [
    { key: 'F', label: 'Starting funding (₱ M)', min: 1, max: 12, step: 0.5, value: 5 },
    { key: 'g', label: 'Monthly sales growth g (%)', min: 2, max: 25, step: 0.5, value: 8 },
  ],
  beats: [
    { say: 'Funding ₱5 M and sales growing 8% a month. Sales would only cover costs in month 29, but the money runs out in month 17. The company closes first.', set: { F: 5, g: 8 } },
    { say: 'Same funding, sales growing 15% a month: costs are covered in month 16, and the balance turns up while about ₱1.4 M is left.', set: { F: 5, g: 15 } },
    { say: 'Raise ₱10 M instead, keep 8% growth: the longer runway carries the company to break-even in month 29 with cash to spare.', set: { F: 10, g: 8 } },
  ],
  readout: (t) => {
    const c = cashPath(t.F, t.g);
    const low = Math.min(...c.out);
    return [
      ['Break-even month', c.be < 0 ? 'not within 4 years' : `month ${c.be + 1}`],
      ['Cash runs out', c.broke < 0 ? 'never' : `month ${c.broke + 1}`],
      ['Lowest balance', low < 0 ? 'below zero' : peso(low)],
      ['Outcome', survives(t.F, t.g) ? 'survives' : 'runs out of money'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 48, 6], y: [-4, 14, 2], sx: 13.6 / 48, sy: 7.2 / 18, origin: [-6.6, -3.3 + 4 * 0.4], axisAt: [0, -4], xEvery: 12, yEvery: 4, xLabel: '\\text{month}', yLabel: '₱\\,\\text{M}' });
    kit.line([P.toW(0, 0), P.toW(48, 0)], { color: C.white, width: 1.5 });
    const pos = kit.fill([], { color: C.green, opacity: 0.18 });
    const cash = kit.line([], { color: C.green, width: 3, create: false });
    const rev = kit.line([], { color: C.yellow, width: 2, create: false });
    kit.line([P.toW(0, SU.costs * 10), P.toW(48, SU.costs * 10)], { color: C.red, width: 1.5, dashed: true });
    kit.label('\\text{monthly costs} \\times 10', [P.toW(48, 0)[0], P.toW(0, 4)[1] + 0.25], { size: 11, color: C.red, align: 'right' });
    kit.label('\\text{monthly sales} \\times 10', [P.toW(0, 0)[0] + 0.3, P.toW(0, 6)[1]], { size: 11, color: C.yellow, align: 'left' });
    kit.label('\\text{bank balance}', [P.toW(0, 0)[0] + 0.3, P.toW(0, 12.8)[1]], { size: 11, color: C.green, align: 'left' });
    const beM = kit.line([], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const brM = kit.dot([0, 0], { r: 0.16, color: C.red, z: 6 });
    const tag = kit.label('', [2, 4.25], { size: 15, tex: false });
    return (p) => {
      const c = cashPath(p.F, p.g);
      const end = c.broke >= 0 ? c.broke + 2 : c.out.length;
      const pts = c.out.slice(0, end).map((v, m) => P.toW(m, clamp(v, -4, 14)));
      cash.set(pts).color(survives(p.F, p.g) ? C.green : C.red);
      pos.set([P.toW(0, 0), ...pts, P.toW(end - 1, 0)]).color(survives(p.F, p.g) ? C.green : C.red);
      rev.set(range(0, 48, 97).map((m) => P.toW(m, clamp(SU.R0 * (1 + p.g / 100) ** m * 10, -4, 14))));
      beM.visible(c.be >= 0).set([P.toW(Math.max(0, c.be), -4), P.toW(Math.max(0, c.be), 14)]);
      brM.visible(c.broke >= 0).set(P.toW(Math.max(0, c.broke + 1), 0));
      tag.set(survives(p.F, p.g) ? 'reaches break-even' : 'out of cash').color(survives(p.F, p.g) ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// Lithium-ion cell
// ---------------------------------------------------------------------------
const CAP = 3; // Ah
const R_INT = 0.05; // ohm
const vRest = (s) => 3.0 + 0.6 * (1 - Math.exp(-12 * s)) + 0.55 * s;
const vTerm = (s, c) => vRest(s) - c * CAP * R_INT;
const LI = 30;
const LI_POS = (() => {
  const u = rng(321);
  return range(0, LI - 1, LI).map(() => [u(), u()]);
})();

export const battery_cycle = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Under a 2C load (a heavy game), find the lowest charge at which the cell still stays above the 3.4 V cut-off.',
  goal: (t) => Math.abs(t.c - 2) < 0.01 && vTerm(t.s / 100, 2) >= 3.4 && vTerm((t.s - 1) / 100, 2) < 3.4,
  params: [
    { key: 's', label: 'State of charge (%)', min: 0, max: 100, step: 1, value: 80 },
    { key: 'c', label: 'Current drawn (C-rate)', min: 0, max: 3, step: 0.1, value: 0.5 },
  ],
  beats: [
    { say: 'At 80% charge most of the lithium sits between the graphite layers. Drawing 0.5C (1.5 A), ions drift through the electrolyte to the oxide while electrons run the outside circuit.', set: { s: 80, c: 0.5 } },
    { say: 'At 20% most lithium has moved to the oxide. At rest the cell reads about 3.65 V, still close to its 3.7 V nominal.', set: { s: 20, c: 0 } },
    { say: 'Now draw 2C (6 A) at 20%: the internal resistance steals 0.3 V and the cell falls below the phone’s 3.4 V cut-off. The phone shuts down.', set: { s: 20, c: 2 } },
  ],
  readout: (t) => {
    const s = t.s / 100;
    return [
      ['Resting voltage', `${r2(vRest(s))} V`],
      ['Voltage under load', `${r2(vTerm(s, t.c))} V (current ${r1(t.c * CAP)} A)`],
      ['Energy left (about)', `${r1(3.7 * CAP * s)} Wh`],
      ['Phone', vTerm(s, t.c) >= 3.4 ? 'running' : 'shuts down (below 3.4 V)'],
    ];
  },
  setup(kit) {
    const ax = -7.0;
    const aw = 2.2;
    const ox = -2.4;
    const ow = 2.2;
    const y0 = -1.8;
    const H = 4.2;
    kit.rect(ax, y0, aw, H, { color: 0x3a3f47, opacity: 0.9, strokeColor: C.white });
    kit.rect(ox, y0, ow, H, { color: 0x3b4a6b, opacity: 0.9, strokeColor: C.white });
    kit.rect(ax + aw, y0, ox - ax - aw, H, { color: C.teal, opacity: 0.08, stroke: false });
    for (let k = 1; k < 8; k++) {
      kit.line([[ax + 0.1, y0 + (k * H) / 8], [ax + aw - 0.1, y0 + (k * H) / 8]], { color: 0x6c737d, width: 1.5 });
      kit.line([[ox + 0.1, y0 + (k * H) / 8], [ox + ow - 0.1, y0 + (k * H) / 8]], { color: 0x6a7fb0, width: 1.5 });
    }
    kit.label('\\text{graphite}', [ax + aw / 2, y0 - 0.35], { size: 12 });
    kit.label('\\text{LiCoO}_2', [ox + ow / 2, y0 - 0.35], { size: 12 });
    kit.label('\\text{electrolyte}', [(ax + aw + ox) / 2, y0 - 0.35], { size: 11, color: C.teal });
    kit.label('(-)', [ax + aw / 2, y0 + H + 0.3], { size: 12 });
    kit.label('(+)', [ox + ow / 2, y0 + H + 0.3], { size: 12 });
    // external circuit
    const wy = y0 + H + 1.3;
    kit.line([[ax + aw / 2, y0 + H], [ax + aw / 2, wy], [ox + ow / 2, wy], [ox + ow / 2, y0 + H]], { color: C.grey, width: 2 });
    const bulb = kit.dot([(ax + ox + ow) / 2 + 0.05, wy], { r: 0.32, color: C.yellow, glow: true, z: 5 });
    const ions = LI_POS.map(() => kit.dot([0, 0], { r: 0.12, color: C.yellow, z: 4 }));
    const elec = range(0, 7, 8).map(() => kit.dot([0, 0], { r: 0.07, color: C.blue, z: 4 }));
    const P = kit.plane({ x: [0, 100, 20], y: [2.8, 4.3, 0.25], sx: 5.0 / 100, sy: 6.2 / 1.5, origin: [2.4, -3.4 - 2.8 * (6.2 / 1.5)], axisAt: [0, 2.8], xEvery: 20, yEvery: 0.5, fmt: (v, ax2) => (ax2 === 'y' ? r1(v) : `${v}`), xLabel: '\\%\\;\\text{charge}', yLabel: '\\text{V}' });
    kit.line(range(0, 100, 100).map((x) => P.toW(x, vRest(x / 100))), { color: C.white, width: 2 });
    const loaded = kit.line([], { color: C.pink, width: 2.5, create: false });
    kit.line([P.toW(0, 3.4), P.toW(100, 3.4)], { color: C.red, width: 1.5, dashed: true });
    kit.label('\\text{cut-off } 3.4\\,\\text{V}', [P.toW(100, 0)[0], P.toW(0, 3.4)[1] - 0.25], { size: 11, color: C.red, align: 'right' });
    kit.label('\\text{at rest}', [P.toW(100, 0)[0], P.toW(0, 4.25)[1]], { size: 11, color: C.white, align: 'right' });
    kit.label('\\text{under load}', [P.toW(100, 0)[0], P.toW(0, 3.85)[1]], { size: 11, color: C.pink, align: 'right' });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.pink, z: 5 });
    return (p, t, time) => {
      const s = p.s / 100;
      const nA = Math.round(s * LI);
      const flow = p.c;
      ions.forEach((d, i) => {
        const [u, v] = LI_POS[i];
        let x;
        if (i < nA) x = ax + 0.2 + u * (aw - 0.4);
        else x = ox + 0.2 + u * (ow - 0.4);
        // the ion next in line drifts across while current flows
        if (flow > 0.05 && i === nA - 1) {
          const f = (time * (0.4 + flow * 0.4)) % 1;
          x = ax + aw - 0.2 + f * (ox - ax - aw + 0.4);
        }
        d.set([x, y0 + 0.3 + v * (H - 0.6)]);
      });
      const L = (y0 + H - y0) + 1.3;
      elec.forEach((d, i) => {
        const run = (ox + ow / 2) - (ax + aw / 2);
        const tot = 2 * 1.3 + run;
        const f = (i / elec.length + time * flow * 0.15) % 1;
        const dd = f * tot;
        let pnt;
        if (dd < 1.3) pnt = [ax + aw / 2, y0 + H + dd];
        else if (dd < 1.3 + run) pnt = [ax + aw / 2 + (dd - 1.3), wy];
        else pnt = [ox + ow / 2, wy - (dd - 1.3 - run)];
        d.visible(flow > 0.05).set(pnt);
      });
      void L;
      const v = vTerm(s, p.c);
      bulb.visible(flow > 0.05 && v >= 3.4).scale(0.6 + 0.4 * clamp(flow / 2, 0, 1));
      loaded.set(range(0, 100, 100).map((x) => P.toW(x, clamp(vTerm(x / 100, p.c), 2.8, 4.3))));
      dot.set(P.toW(p.s, clamp(v, 2.8, 4.3))).color(v >= 3.4 ? C.pink : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// Two-group comparison: Student's t-test
// ---------------------------------------------------------------------------
function lgamma(x) {
  const g = [76.18009172947146, -86.5053203294168, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x;
  const tmp0 = x + 5.5;
  const tmp = tmp0 - (x + 0.5) * Math.log(tmp0);
  let ser = 1.00000000019;
  for (let j = 0; j < 6; j++) ser += g[j] / ++y;
  return -tmp + Math.log((Math.sqrt(2 * Math.PI) * ser) / x);
}
function pTwoSided(tv, df) {
  const a = Math.abs(tv);
  const c = Math.exp(lgamma((df + 1) / 2) - lgamma(df / 2)) / Math.sqrt(df * Math.PI);
  const f = (x) => c * (1 + (x * x) / df) ** (-(df + 1) / 2);
  const N = 400;
  const hh = a / N;
  let sum = f(0) + f(a);
  for (let i = 1; i < N; i++) sum += f(i * hh) * (i % 2 ? 4 : 2);
  return clamp(1 - 2 * ((sum * hh) / 3), 0, 1);
}
const TT_SD = 0.6;
const TT_A = normals(20, 5101);
const TT_B = normals(20, 7919);
// rescale a sample to mean 0 and standard deviation 1, so the averages show the true effect
function stdz(z) {
  const m = z.reduce((u, v) => u + v, 0) / z.length;
  const sd = Math.sqrt(z.reduce((u, v) => u + (v - m) ** 2, 0) / (z.length - 1));
  return z.map((v) => (v - m) / sd);
}
function tTest(n, eff) {
  const a = stdz(TT_A.slice(0, n)).map((z) => 6.5 + TT_SD * z);
  const b = stdz(TT_B.slice(0, n)).map((z) => 6.5 + eff + TT_SD * z);
  const mean = (x) => x.reduce((u, v) => u + v, 0) / x.length;
  const ma = mean(a);
  const mb = mean(b);
  const va = a.reduce((u, v) => u + (v - ma) ** 2, 0) / (n - 1);
  const vb = b.reduce((u, v) => u + (v - mb) ** 2, 0) / (n - 1);
  const sp = Math.sqrt((va + vb) / 2);
  const se = sp * Math.sqrt(2 / n);
  const tv = (mb - ma) / se;
  return { a, b, ma, mb, sp, se, t: tv, p: pTwoSided(tv, 2 * n - 2) };
}
const tCrit = (df) => {
  let lo = 1;
  let hi = 15;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (pTwoSided(m, df) > 0.05) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
};

export const thesis_ttest = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'The fibre really adds 0.5 MPa. Find the fewest bricks per group that show it with p < 0.05.',
  goal: (t) => Math.abs(t.eff - 0.5) < 0.01 && tTest(t.n, 0.5).p < 0.05 && tTest(t.n - 1, 0.5).p >= 0.05,
  params: [
    { key: 'n', label: 'Bricks tested per group n', min: 3, max: 20, step: 1, value: 5 },
    { key: 'eff', label: 'True strength gain from fibre (MPa)', min: 0, max: 1.5, step: 0.05, value: 0.5 },
  ],
  beats: [
    { say: 'Five bricks each, with a true gain of 0.5 MPa. The averages differ, but the intervals overlap widely and p is far above 0.05. The test cannot tell yet.', set: { n: 5, eff: 0.5 } },
    { say: 'Test 20 bricks each: the intervals shrink to half and the same 0.5 MPa gain stands out (p about 0.01).', set: { n: 20, eff: 0.5 } },
    { say: 'A big gain of 1.2 MPa shows clearly even with 5 bricks each. Small effects need big samples; big effects need only a few.', set: { n: 5, eff: 1.2 } },
  ],
  readout: (t) => {
    const r = tTest(t.n, t.eff);
    return [
      ['Means: plain, fibre', `${r2(r.ma)}, ${r2(r.mb)} MPa`],
      ['Difference ± SE', `${r2(r.mb - r.ma)} ± ${r2(r.se)} MPa`],
      ['t, p', `${r2(r.t)}, ${r.p < 0.001 ? '< 0.001' : r3(r.p)}`],
      ['Verdict', r.p < 0.05 ? 'difference is significant (p < 0.05)' : 'could be chance'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 3, 1], y: [4.5, 9, 0.5], sx: 2.6, sy: 7 / 4.5, origin: [-7.2, -3.4 - 4.5 * (7 / 4.5)], axisAt: [0, 4.5], xEvery: 10, yEvery: 1, numbers: true, fmt: (v, ax) => (ax === 'y' ? `${v}` : ''), yLabel: '\\text{strength (MPa)}' });
    kit.label('\\text{plain}', [P.toW(1, 0)[0], -3.8], { size: 13, color: C.blue });
    kit.label('\\text{with fibre}', [P.toW(2, 0)[0], -3.8], { size: 13, color: C.gold });
    const da = range(0, 19, 20).map(() => kit.dot([0, 0], { r: 0.09, color: C.blue, opacity: 0.8 }));
    const db = range(0, 19, 20).map(() => kit.dot([0, 0], { r: 0.09, color: C.gold, opacity: 0.8 }));
    const ma = kit.line([], { color: C.white, width: 3, create: false });
    const mb = kit.line([], { color: C.white, width: 3, create: false });
    const ca = kit.line([], { color: C.blue, width: 3, create: false });
    const cb = kit.line([], { color: C.gold, width: 3, create: false });
    // t distribution with the observed t
    const Q = kit.plane({ x: [-5, 5, 1], y: [0, 0.45, 0.1], sx: 6 / 10, sy: 4 / 0.45, origin: [4.6, -2.0], axisAt: [0, 0], xEvery: 2, yEvery: 10, numbers: true, fmt: (v, ax) => (ax === 'x' ? `${v}` : ''), grid: false, xLabel: 't' });
    const curve = kit.line([], { color: C.white, width: 2, create: false });
    const tailR = kit.fill([], { color: C.red, opacity: 0.4 });
    const tailL = kit.fill([], { color: C.red, opacity: 0.4 });
    const tMark = kit.line([], { color: C.yellow, width: 3, create: false });
    const tLab = kit.label('', [0, 0], { size: 13, color: C.yellow });
    kit.label('\\text{if the fibre did nothing}', [4.6, 2.9], { size: 12 });
    kit.label('\\text{red: the } 5\\% \\text{ most extreme results}', [4.6, -3.4], { size: 11, color: C.red });
    const verdict = kit.label('', [4.6, 3.6], { size: 15, tex: false });
    let key = '';
    return (p, t) => {
      const n = t.n;
      const r = tTest(n, p.eff);
      const jit = (i) => ((i * 0.6180339) % 1) * 0.5 - 0.25;
      da.forEach((d, i) => d.visible(i < n).set(P.toW(1 + jit(i), clamp(r.a[i] ?? 6.5, 4.5, 9))));
      db.forEach((d, i) => d.visible(i < n).set(P.toW(2 + jit(i + 7), clamp(r.b[i] ?? 6.5, 4.5, 9))));
      const tc = tCrit(2 * n - 2);
      const hw = (tc * r.sp) / Math.sqrt(n);
      ma.set([P.toW(0.7, r.ma), P.toW(1.3, r.ma)]);
      mb.set([P.toW(1.7, r.mb), P.toW(2.3, r.mb)]);
      ca.set([P.toW(1.38, r.ma - hw), P.toW(1.38, r.ma + hw)]);
      cb.set([P.toW(2.38, r.mb - hw), P.toW(2.38, r.mb + hw)]);
      const df = 2 * n - 2;
      if (key !== `${df}`) {
        key = `${df}`;
        const c = Math.exp(lgamma((df + 1) / 2) - lgamma(df / 2)) / Math.sqrt(df * Math.PI);
        const f = (x) => c * (1 + (x * x) / df) ** (-(df + 1) / 2);
        curve.set(range(-5, 5, 200).map((x) => Q.toW(x, f(x))));
        const tr = range(tc, 5, 40);
        tailR.set([Q.toW(tc, 0), ...tr.map((x) => Q.toW(x, f(x))), Q.toW(5, 0)]);
        tailL.set([Q.toW(-tc, 0), ...tr.map((x) => Q.toW(-x, f(x))), Q.toW(-5, 0)]);
      }
      const tv = clamp(r.t, -5, 5);
      tMark.set([Q.toW(tv, 0), Q.toW(tv, 0.42)]);
      tLab.set(`t = ${r2(r.t)}`).pos([Q.toW(tv, 0)[0], Q.toW(0, 0.42)[1] + 0.3]);
      verdict.set(r.p < 0.05 ? `p = ${r.p < 0.001 ? '< 0.001' : r3(r.p)}: significant` : `p = ${r3(r.p)}: could be chance`).color(r.p < 0.05 ? C.green : C.grey);
    };
  },
};
