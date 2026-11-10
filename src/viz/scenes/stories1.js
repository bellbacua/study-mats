// Story versions of the first animations a learner meets.
// Each one plays as a short story: one idea per step, things appear one at a
// time, motion is slow enough to follow, and the labels sit on the picture.
// Story-only settings are `hidden` params (no slider); touching any control
// switches them to their `free` values so the full picture is there to play with.
import { C } from '../theme';
import { clamp, smooth } from '../kit';
import { PIPELINES } from './foundations';

const n2 = (v) => Math.round(v * 100) / 100;
const ease = (dt, rate = 3) => 1 - Math.exp(-dt * rate);

// Fade a kit object in or out; `base` is its normal fill opacity.
function show(o, a, base = 1) {
  if (!o) return;
  const v = clamp(a, 0, 1);
  if (o.fill || o.outline) {
    o.fill?.opacity(base * v);
    o.outline?.opacity(v);
  } else o.opacity?.(base * v);
  o.visible(v > 0.01);
}

// ---------------------------------------------------------------------------
// PHYS 01. Same length, different rulers
// ---------------------------------------------------------------------------
const UNITS = {
  m: { size: 1, name: 'metre', short: 'm' },
  cubit: { size: 0.524, name: 'royal cubit', short: 'cubits' },
  ft: { size: 0.3048, name: 'foot', short: 'ft' },
  hand: { size: 0.1016, name: 'hand', short: 'hands' },
};
const OBJECTS = {
  beam: { len: 2.1, name: 'steel beam' },
  door: { len: 0.9, name: 'doorway width' },
  rod: { len: 1.05, name: 'cubit rod ×2' },
};

export const units_ruler = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.8, 3.8] },
  ease: 2.2,
  params: [
    { key: 'obj', label: 'Measure', type: 'choice', value: 'beam', options: Object.entries(OBJECTS).map(([value, o]) => ({ value, label: o.name })) },
    { key: 'unit', label: 'Using', type: 'choice', value: 'cubit', options: Object.entries(UNITS).map(([value, u]) => ({ value, label: u.name })) },
    { key: 'lay', hidden: true, value: 0 },
    { key: 'q', hidden: true, value: 1 },
    { key: 'cmp', hidden: true, value: 0 },
  ],
  free: { lay: 99, q: 0, cmp: 0 },
  beats: [
    {
      say: 'A steel beam. How long is it? You can’t answer yet: first you need something to count with, a unit.',
      set: { obj: 'beam', unit: 'cubit', lay: 0, q: 1, cmp: 0 },
    },
    {
      say: 'Egyptian builders used the royal cubit: elbow to fingertip, about 52.4 cm. Here is one.',
      set: { lay: 1, q: 0 },
      notes: [{ text: 'one royal cubit = 52.4 cm', at: [-4.6, -2.4], to: [-5.2, -0.35] }],
    },
    {
      say: 'Lay cubits end to end along the beam and count them: 1, 2, 3, 4…',
      set: { lay: 4 },
      ms: 7000,
    },
    {
      say: 'Four whole cubits and a thin sliver left over. To say how big the sliver is, you need a smaller unit.',
      set: { lay: 5 },
      notes: [{ text: 'the leftover sliver', at: [3.4, -2.5], to: [6.0, -0.35] }],
    },
    {
      say: 'Switch to the hand, about 10 cm. Counting again, the same beam is about 21 hands.',
      set: { unit: 'hand', lay: 21 },
      ms: 8000,
      notes: [{ text: 'smaller unit, bigger number', at: [3.6, 2.9], to: [1.6, -0.2] }],
    },
    {
      say: 'The beam never changed. Number × size of the unit always gives the same length: 4.01 × 52.4 cm = 20.67 × 10.16 cm = 210 cm.',
      set: { cmp: 1 },
      ms: 9000,
    },
    {
      say: 'In 1799 France fixed the metre, meant to be a unit “for all people, for all time”. The beam is 2.1 metres. Engineers today work almost entirely in metres.',
      set: { unit: 'm', lay: 3, cmp: 0 },
      notes: [{ text: 'the shared unit: the metre', at: [-3.2, -2.5], to: [-3.6, -0.35] }],
    },
  ],
  readout: (t) => {
    const L = OBJECTS[t.obj].len;
    return Object.entries(UNITS).map(([k, u]) => [`In ${u.name}s`, `${n2(L / u.size)}${k === t.unit ? '  ◀' : ''}`]);
  },
  setup(kit) {
    const S = 6; // world units per metre
    const x0 = -6.6;
    const bar = kit.rect(x0, 0.4, 1, 0.9, { color: 0x9aa4ad, opacity: 0.85, strokeColor: 0xd0d6dc, width: 2 });
    const barL = kit.label('', [0, 1.75], { tex: false, size: 16 });
    const qm = kit.label('?', [0, 2.6], { tex: false, size: 54, color: C.yellow });
    const N = 30;
    const blocks = Array.from({ length: N }, (_, i) => kit.rect(0, 0, 0, 0.5, { color: i % 2 ? C.gold : C.yellow, opacity: 0.45, strokeColor: C.yellow, width: 1.5 }));
    const nums = Array.from({ length: N }, () => kit.label('', [0, 0], { tex: false, cls: 'tick' }));
    const count = kit.label('', [0, -1.9], { size: 28 });
    const cmpL = [0, 1, 2].map((i) => kit.label('', [0, -2.7 - i * 0.55], { size: 20, color: [C.yellow, C.gold, C.text][i] }));
    let len = OBJECTS.beam.len;
    let unit = UNITS.cubit.size;
    let q = 1;
    let cmp = 0;
    return (p, t, time, dt) => {
      len += (OBJECTS[t.obj].len - len) * ease(dt, 3);
      unit += (UNITS[t.unit].size - unit) * ease(dt, 2.2);
      q += (t.q - q) * ease(dt, 4);
      cmp += (t.cmp - cmp) * ease(dt, 2.5);
      bar.set(x0, 0.4, len * S, 0.9);
      barL.set(OBJECTS[t.obj].name).pos([x0 + (len * S) / 2, 1.65]);
      show(qm, q);
      qm.pos([x0 + (len * S) / 2, 2.55 + 0.08 * Math.sin(time * 3)]);
      const n = Math.ceil(len / unit - 1e-6);
      let shown = 0;
      blocks.forEach((b, i) => {
        const a = smooth(clamp(p.lay - i, 0, 1)) * (i < n ? 1 : 0);
        if (a < 0.01) {
          b.visible(false);
          nums[i].visible(false);
          return;
        }
        if (a > 0.5) shown = i + 1;
        const w = Math.max(0.02, Math.min(unit, len - i * unit)) * S;
        const drop = (1 - a) * 1.2; // each unit drops into place
        b.set(x0 + i * unit * S, -0.35 + drop, w, 0.5);
        show(b, a, 0.45);
        const whole = len - i * unit >= unit - 1e-6;
        const big = unit * S > 0.5 || (i + 1) % 5 === 0;
        nums[i].set(`${i + 1}`).pos([x0 + (i * unit + Math.min(unit, len - i * unit)) * S, -0.65 + drop]);
        show(nums[i], whole && big ? a : 0);
      });
      const exact = n2(OBJECTS[t.obj].len / UNITS[t.unit].size);
      const num = shown >= n ? exact : shown;
      const word = num === 1 ? UNITS[t.unit].name : UNITS[t.unit].short;
      count.set(shown ? `${n2(OBJECTS[t.obj].len)}\\,\\text{m} = ${num}\\ \\text{${word}}${shown >= n ? '' : '\\ \\dots'}` : '');
      cmpL[0].set('4.01 \\times 52.4\\,\\text{cm} = 210\\,\\text{cm}');
      cmpL[1].set('20.67 \\times 10.16\\,\\text{cm} = 210\\,\\text{cm}');
      cmpL[2].set('\\text{number} \\times \\text{unit} = \\text{the same length}');
      cmpL.forEach((l, i) => show(l, clamp(cmp * 3 - i, 0, 1)));
      count.pos([0, cmp > 0.05 ? -1.75 : -1.9]);
    };
  },
};

// ---------------------------------------------------------------------------
// NUM 05. Multiplication as area; the distributive split
// ---------------------------------------------------------------------------
export const area_multiplication = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  ease: 2,
  params: [
    { key: 'a', label: 'Width (a)', min: 1, max: 20, step: 1, value: 4 },
    { key: 'b', label: 'Height (b)', min: 1, max: 20, step: 1, value: 3 },
    {
      key: 'split',
      label: 'View',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Whole rectangle' },
        { value: 1, label: 'Split into tens and ones' },
      ],
    },
    { key: 'rows', hidden: true, value: 0 },
    { key: 'hl', hidden: true, value: 0 },
    { key: 'cut', hidden: true, value: 0 },
    { key: 'sum', hidden: true, value: 0 },
  ],
  free: { rows: 99, hl: 0, cut: 1, sum: 4 },
  beats: [
    { say: '4 × 3 means “4, three times”. Start with one row of 4 squares.', set: { a: 4, b: 3, split: 0, rows: 1, hl: 0, cut: 0, sum: 0 } },
    {
      say: 'Stack three rows of 4. Count them: 12 squares. Multiplying is finding an area: width × height.',
      set: { rows: 3 },
      ms: 6500,
    },
    {
      say: 'Now read the same squares as columns: 4 columns of 3. Still 12. That is why 4 × 3 = 3 × 4.',
      set: { hl: 2 },
      notes: [{ text: 'one column of 3', at: [-5.6, 2.3], to: [-2.7, 0.9] }],
    },
    {
      say: 'A bigger one: 13 × 12. The rows pile up, and counting 156 squares one by one is slow and easy to get wrong.',
      set: { a: 13, b: 12, hl: 0, rows: 12 },
      ms: 9000,
    },
    {
      say: 'Trick: cut each side at 10. 13 = 10 + 3 and 12 = 10 + 2.',
      set: { cut: 1 },
      notes: [{ text: 'cut at 10', at: [5.6, 3.4], to: [2.15, 2.6] }],
    },
    { say: 'Pull the pieces apart. Each one is easy to multiply in your head.', set: { split: 1 } },
    {
      say: 'Add the four pieces: 100 + 30 + 20 + 6 = 156. Long multiplication on paper is exactly this picture, written in rows.',
      set: { sum: 4 },
      ms: 9000,
    },
  ],
  readout: (t) => {
    const rows = [];
    for (let k = 1, v = t.b; k <= t.a; k *= 2, v *= 2) if (t.a & k) rows.push(`${k}×${t.b}=${v}`);
    return [
      ['a × b', t.a * t.b],
      ['Division undoes it', `${t.a * t.b} ÷ ${t.a} = ${t.b}`],
      ['Egyptian doubling', rows.join(' + ')],
    ];
  },
  setup(kit) {
    const MAX = 20;
    const COL = [C.blue, C.teal, C.yellow, C.gold];
    const parts = COL.map((c) => kit.rect(0, 0, 0, 0, { color: c, opacity: 0.5, strokeColor: c, width: 2 }));
    const grid = Array.from({ length: 2 * MAX }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.35, create: false }));
    const bands = Array.from({ length: MAX }, () => kit.rect(0, 0, 0, 0, { color: C.yellow, opacity: 0.3, stroke: false }));
    const plabels = [0, 1, 2, 3].map(() => kit.label('', [0, 0], { size: 18 }));
    const cutX = kit.line([[0, 0], [0, 0]], { color: C.red, width: 2.5, dashed: true, create: false });
    const cutY = kit.line([[0, 0], [0, 0]], { color: C.red, width: 2.5, dashed: true, create: false });
    const aL = kit.label('', [0, 0], { size: 20, color: C.blue });
    const bL = kit.label('', [0, 0], { size: 20, color: C.blue, align: 'right' });
    const eq = kit.label('', [0, 3.9], { size: 26 });
    const cnt = kit.label('', [0, 0], { size: 30, color: C.yellow });
    let split = 0;
    let hl = 0;
    let hlKind = 0;
    let cut = 0;
    return (p, t, _time, dt) => {
      split += ((t.split ? 1 : 0) - split) * ease(dt, 2.2);
      cut += (t.cut - cut) * ease(dt, 3);
      if (t.hl) hlKind = t.hl;
      hl += ((t.hl ? 1 : 0) - hl) * ease(dt, 3);
      const s = Math.min(12 / Math.max(p.a, 1), 6.4 / Math.max(p.b, 1), 0.9);
      const A = t.a;
      const B = t.b;
      const rowsF = clamp(p.rows, 0, B);
      const W = p.a * s;
      const Hfull = p.b * s;
      const H = rowsF * s;
      const x0 = -W / 2;
      const y0 = -Hfull / 2 - 0.3;
      const gap = 0.45 * smooth(split);
      const at = Math.min(10, A);
      const ao = A - at;
      const bt = Math.min(10, B);
      const bo = B - bt;
      const doSplit = A > 10 && B > 10 && split > 0.01;
      const segs = doSplit
        ? [
            [0, 0, at, bt],
            [at, 0, ao, bt],
            [0, bt, at, bo],
            [at, bt, ao, bo],
          ]
        : [[0, 0, A, rowsF]];
      parts.forEach((r, i) => {
        const sg = segs[i];
        const on = !!sg && sg[2] > 0 && sg[3] > 0.01;
        r.visible(on);
        plabels[i].visible(on && doSplit);
        if (!on) return;
        const [cx, cy, w, h] = sg;
        const gx = cx > 0 ? gap : 0;
        const gy = cy > 0 ? gap : 0;
        r.set(x0 + cx * s + gx - gap / 2, y0 + cy * s + gy - gap / 2, w * s, h * s);
        plabels[i].set(`${w}\\times${h}=${w * h}`).pos([x0 + (cx + w / 2) * s + gx - gap / 2, y0 + (cy + h / 2) * s + gy - gap / 2]);
        show(plabels[i], smooth(split));
      });
      grid.forEach((l, i) => {
        if (i < MAX) {
          const c = i + 1;
          const x = x0 + c * s + (doSplit ? (c >= at ? gap / 2 : -gap / 2) : 0);
          const top = doSplit ? y0 + Hfull + gap / 2 : y0 + H;
          l.set([[x, y0 - (doSplit ? gap / 2 : 0)], [x, top]]).visible(c < A && s > 0.25 && H > 0.01 && !(doSplit && c === at));
        } else {
          const r = i - MAX + 1;
          const y = y0 + r * s + (doSplit ? (r >= bt ? gap / 2 : -gap / 2) : 0);
          l.set([[x0 - (doSplit ? gap / 2 : 0), y], [x0 + W + (doSplit ? gap / 2 : 0), y]]).visible(r < rowsF - 0.02 && s > 0.25 && !(doSplit && r === bt));
        }
      });
      // read as rows or as columns: every other stripe lights up
      bands.forEach((bd, i) => {
        const cols = hlKind === 2;
        const on = (cols ? i < A : i < B) && i % 2 === 0 && hl > 0.01 && !doSplit;
        bd.visible(on);
        if (!on) return;
        if (cols) bd.set(x0 + i * s, y0, s, H);
        else bd.set(x0, y0 + i * s, W, s);
        show(bd, hl, 0.32);
      });
      cutX.set([[x0 + at * s, y0 - 0.25], [x0 + at * s, y0 + Hfull + 0.25]]);
      cutY.set([[x0 - 0.25, y0 + bt * s], [x0 + W + 0.25, y0 + bt * s]]);
      show(cutX, A > 10 ? cut * (1 - smooth(split)) : 0);
      show(cutY, B > 10 ? cut * (1 - smooth(split)) : 0);
      aL.set(A > 10 && cut > 0.5 ? `${A} = 10 + ${ao}` : `${A}`).pos([0, y0 - 0.55]);
      bL.set(B > 10 && cut > 0.5 ? `${B} = 10 + ${bo}` : `${Math.max(1, Math.min(B, Math.round(rowsF)))}`).pos([x0 - 0.35, y0 + Hfull / 2]);
      const n = Math.round(A * Math.min(B, Math.floor(rowsF + 1e-3)));
      cnt.set(!doSplit && rowsF > 0.5 && t.sum === 0 ? `${n}` : '').pos([x0 + W + 0.9, y0 + H / 2]);
      const terms = [at * bt, ao * bt, at * bo, ao * bo];
      const k = Math.round(t.sum);
      eq.set(
        doSplit && k > 0
          ? `${terms.slice(0, k).join(' + ')}${k >= 4 ? ` = ${A * B}` : ''}`
          : `${A} \\times ${Math.min(B, Math.max(1, Math.floor(rowsF + 1e-3)))} = ${n}`
      );
    };
  },
};

// ---------------------------------------------------------------------------
// PHYS 02. The law of the lever: weight × distance, drawn as an area
// ---------------------------------------------------------------------------
export const lever_balance = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.8, 4.4] },
  ease: 2.2,
  params: [
    { key: 'm1', label: 'Left mass (kg)', min: 1, max: 10, step: 1, value: 6 },
    { key: 'd1', label: 'Left distance (m)', min: 0.5, max: 6, step: 0.5, value: 2 },
    { key: 'm2', label: 'Right mass (kg)', min: 1, max: 10, step: 1, value: 3 },
    { key: 'd2', label: 'Right distance (m)', min: 0.5, max: 6, step: 0.5, value: 2 },
    { key: 'two', hidden: true, value: 0 },
    { key: 'prod', hidden: true, value: 0 },
  ],
  free: { two: 1, prod: 1 },
  beats: [
    { say: 'A plank resting on a pivot. Hang 6 kg on the left, 2 m from the pivot. The plank tips that way.', set: { m1: 6, d1: 2, m2: 3, d2: 2, two: 0, prod: 0 } },
    { say: 'Hang 3 kg on the right, also 2 m out. The lighter side loses: it still tips left.', set: { two: 1 } },
    {
      say: 'Archimedes’ rule: what turns the plank is weight × distance. Draw it as a rectangle, mass tall and distance wide. Left: 6 × 2 = 12. Right: 3 × 2 = 6.',
      set: { prod: 1 },
      ms: 9500,
      notes: [{ text: 'area = mass × distance', at: [-5.6, 4.0], to: [-2.6, 3.0] }],
    },
    {
      say: 'Slide the 3 kg out to 4 m. Its rectangle gets wider until both areas are 12. Now the plank balances.',
      set: { d2: 4 },
      ms: 8000,
      notes: [{ text: 'equal areas: balanced', at: [5.8, 4.0], to: [3.4, 3.0] }],
    },
    {
      say: 'Push it further: 1 kg at 6 m holds 6 kg at 1 m. A long arm lets a small force move a big weight. “Give me a place to stand and I will move the Earth.”',
      set: { m1: 6, d1: 1, m2: 1, d2: 6 },
      ms: 10000,
    },
  ],
  goal: (t) => t.m1 === 6 && t.d1 === 2 && t.m2 === 3 && t.d2 === 4,
  readout: (t) => {
    const L = t.m1 * t.d1;
    const R = t.m2 * t.d2;
    return [
      ['Left turning effect m₁d₁', `${n2(L)} kg·m`],
      ['Right turning effect m₂d₂', `${n2(R)} kg·m`],
      ['Beam', L === R ? 'balanced ✓' : L > R ? 'tips left' : 'tips right'],
    ];
  },
  setup(kit) {
    const S = 1.1;
    kit.fill([[0, 0.7], [-0.7, -2.6], [0.7, -2.6]], { color: C.grey, opacity: 0.7 });
    kit.line([[-7.5, -2.6], [7.5, -2.6]], { color: C.axis, width: 2 });
    const beam = kit.line([[-7, 0], [7, 0]], { color: 0xc8a165, width: 7, create: false });
    const ticks = Array.from({ length: 13 }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.4, create: false }));
    const boxes = [C.blue, C.yellow].map((c) => ({
      r: kit.rect(0, 0, 0, 0, { color: c, opacity: 0.85, strokeColor: c }),
      l: kit.label('', [0, 0], { tex: false, size: 15, color: '#101418' }),
      str: kit.line([[0, 0], [0, 0]], { color: C.white, width: 1.5, create: false }),
      area: kit.rect(0, 0, 0, 0, { color: c, opacity: 0.25, strokeColor: c, width: 2 }),
      aL: kit.label('', [0, 0], { size: 20, color: c }),
      dL: kit.label('', [0, 0], { size: 15, color: c }),
    }));
    const eq = kit.label('', [0, -3.3], { size: 24 });
    let ang = 0;
    let two = 0;
    let prod = 0;
    return (p, t, _time, dt) => {
      two += (t.two - two) * ease(dt, 3);
      prod += (t.prod - prod) * ease(dt, 2.5);
      const diff = p.m1 * p.d1 - p.m2 * p.d2 * smooth(two);
      ang += (clamp(-diff * 0.02, -0.17, 0.17) - ang) * ease(dt, 2.2); // the heavier side goes down
      const at = (x) => [x * S * Math.cos(ang), 0.8 - x * S * Math.sin(ang)];
      beam.set([at(-6.3), at(6.3)]);
      ticks.forEach((tk, i) => {
        const [cx, cy] = at(-6 + i);
        tk.set([[cx, cy - 0.12], [cx, cy + 0.12]]);
      });
      [
        [p.m1, -p.d1, t.m1, t.d1, 1],
        [p.m2, p.d2, t.m2, t.d2, two],
      ].forEach(([m, x, mt, dtgt, vis], i) => {
        const B = boxes[i];
        const size = 0.45 + Math.sqrt(m) * 0.22;
        const [hx, hy] = at(x);
        const top = hy - 0.6;
        const drop = (1 - smooth(vis)) * 2.5;
        B.str.set([[hx, hy], [hx, top + drop]]);
        B.r.set(hx - size / 2, top - size + drop, size, size);
        B.l.set(`${mt} kg`).pos([hx, top - size / 2 + drop]);
        [B.str, B.r, B.l].forEach((o) => show(o, vis, o === B.r ? 0.85 : 1));
        // the turning effect as an area above the arm
        const w = Math.abs(x) * S;
        const h = m * 0.22;
        const x0 = x < 0 ? -w : 0;
        B.area.set(x0, 2.4, w, h * smooth(prod));
        show(B.area, prod * vis, 0.25);
        B.aL.set(`${mt} \\times ${dtgt} = ${n2(mt * dtgt)}`).pos([x0 + w / 2, 2.4 + h * smooth(prod) + 0.35]);
        show(B.aL, prod * vis);
        B.dL.set(`${dtgt}\\,\\text{m}`).pos([x0 + w / 2, 2.1]);
        show(B.dL, vis * (1 - prod * 0.6));
      });
      const L = t.m1 * t.d1;
      const R = t.m2 * t.d2;
      eq.set(two > 0.5 && prod > 0.5 ? `${n2(L)} \\quad ${L === R ? '=' : L > R ? '>' : '<'} \\quad ${n2(R)}${L === R ? '\\quad\\text{balanced}' : ''}` : '');
    };
  },
};

// ---------------------------------------------------------------------------
// PHYS 03. Galileo's ramp: equal times, distances 1 : 3 : 5 : 7
// ---------------------------------------------------------------------------
export const galileo_ramp = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.2] },
  ease: 2.5,
  params: [
    { key: 'angle', label: 'Ramp angle (°)', min: 2, max: 20, step: 1, value: 10 },
    { key: 'T', label: 'Time rolling (s)', min: 0, max: 4, step: 0.1, value: 0 },
    { key: 'sq', hidden: true, value: 0 },
  ],
  free: { sq: 1 },
  beats: [
    { say: 'Things fall too fast to time with a water clock. Galileo’s trick (1604): slow gravity down with a gentle ramp.', set: { angle: 10, T: 0, sq: 0 } },
    { say: 'Let the ball go and mark where it is after 1 second. Call that distance 1.', set: { T: 1 }, notes: [{ text: 'distance in the 1st second: 1', at: [-4.2, -1.6], to: [-5.6, 0.85] }] },
    { say: 'In the 2nd second it covers 3 times that. It is speeding up.', set: { T: 2 } },
    { say: 'Then 5, then 7. The gaps grow by the odd numbers: 1, 3, 5, 7.', set: { T: 4 }, ms: 8000 },
    {
      say: 'Add them up: 1, then 1 + 3 = 4, then 9, then 16. Those are squares! The total distance grows as time × time: d ∝ t².',
      set: { sq: 1 },
      ms: 9500,
    },
    { say: 'A steeper ramp makes everything bigger and faster, but the pattern 1 : 3 : 5 : 7 stays exactly the same.', set: { angle: 18, T: 0 }, ms: 3000 },
    { say: 'Roll it again on the steep ramp.', set: { T: 4 }, ms: 7000 },
  ],
  goal: (t) => t.angle === 10 && t.T >= 4,
  readout: (t) => {
    const a = 9.8 * Math.sin((t.angle * Math.PI) / 180);
    const d = (s) => 0.5 * a * s * s;
    return [
      ['Acceleration down the ramp', `${n2(a)} m/s²`],
      ['Distance each second', [1, 2, 3, 4].map((s) => n2(d(s) - d(s - 1))).join(' : ') + ' m'],
      ['Ratio', '1 : 3 : 5 : 7'],
      ['Distance after T', `${n2(d(t.T))} m`],
    ];
  },
  setup(kit) {
    const L = 13;
    const top = [-6.8, 0];
    const ramp = kit.line([[0, 0], [1, 1]], { color: 0xc8a165, width: 6, create: false });
    kit.line([[-7.5, -4], [7.5, -4]], { color: C.axis, width: 2 });
    const ball = kit.dot([0, 0], { r: 0.28, color: C.blue, z: 6 });
    const clock = kit.label('', [4.2, 3.4], { size: 26, align: 'left' });
    const marks = [1, 2, 3, 4].map((s) => ({
      s,
      tick: kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 3, create: false }),
      l: kit.label(`${s}\\,\\text{s}`, [0, 0], { size: 14, color: C.yellow }),
      gap: kit.label('', [0, 0], { size: 20, color: C.green }),
      tot: kit.label('', [0, 0], { size: 18, color: C.gold }),
      seg: kit.line([[0, 0], [0, 0]], { color: C.green, width: 5, opacity: 0.6, create: false }),
    }));
    let tt = 0; // the ball's own clock: it runs in real seconds, so the motion looks right
    let sq = 0;
    return (p, t, _time, dt) => {
      if (t.T > tt) tt = Math.min(t.T, tt + dt);
      else tt = t.T;
      sq += (t.sq - sq) * ease(dt, 2.5);
      const th = (p.angle * Math.PI) / 180;
      const vis = Math.max(th, (4 * Math.PI) / 180) * 1.2;
      const dir = [Math.cos(vis), -Math.sin(vis)];
      const nrm = [-dir[1], dir[0]];
      const along = (u) => [top[0] + dir[0] * u, top[1] + 2.6 + dir[1] * u];
      ramp.set([along(0), along(L)]);
      const a = 9.8 * Math.sin(th);
      const maxD = 0.5 * 9.8 * Math.sin((18 * Math.PI) / 180) * 16;
      const scale = L / maxD;
      const d = (s) => 0.5 * a * s * s * scale;
      const [bx, by] = along(Math.min(d(tt), L));
      ball.set([bx + nrm[0] * 0.3, by + nrm[1] * 0.3]);
      clock.set(`t = ${tt.toFixed(1)}\\,\\text{s}`);
      marks.forEach((m) => {
        const on = tt >= m.s - 0.02;
        const [x, y] = along(d(m.s));
        m.tick.set([[x - nrm[0] * 0.35, y - nrm[1] * 0.35], [x + nrm[0] * 0.35, y + nrm[1] * 0.35]]).visible(on);
        m.l.pos([x + nrm[0] * 0.6, y + nrm[1] * 0.6]).visible(on);
        const A = along(d(m.s - 1));
        m.seg.set([[A[0] - nrm[0] * 0.55, A[1] - nrm[1] * 0.55], [x - nrm[0] * 0.55, y - nrm[1] * 0.55]]).visible(on);
        const [gx, gy] = along((d(m.s) + d(m.s - 1)) / 2);
        m.gap.set(`${2 * m.s - 1}`).pos([gx - nrm[0] * 0.95, gy - nrm[1] * 0.95]).visible(on);
        const off = m.s % 2 ? 1.25 : 1.9;
        m.tot.set(`\\text{total } ${m.s * m.s} = ${m.s}^2`).pos([x + nrm[0] * off, y + nrm[1] * off]);
        show(m.tot, on ? sq : 0);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// MATE 001. The materials tetrahedron, built one corner at a time
// ---------------------------------------------------------------------------
const PRODUCTS = {
  bolo: {
    name: 'a bolo knife',
    processing: 'forged hot, then only the edge is quenched in water',
    structure: 'hard martensite at the edge, softer pearlite in the spine',
    properties: 'a hard, sharp edge on a tough back',
    performance: 'cuts for years without chipping or snapping',
  },
  chip: {
    name: 'a silicon chip',
    processing: 'grown as one huge crystal, sliced, then a few boron or phosphorus atoms added',
    structure: 'a near-perfect single crystal with chosen impurity atoms',
    properties: 'conducts electricity in a precisely controllable way',
    performance: 'billions of tiny switches working reliably in a phone',
  },
  concrete: {
    name: 'a concrete bridge deck',
    processing: 'cement, sand, gravel and water poured around steel bars, kept wet while curing',
    structure: 'hardened cement crystals binding stones, steel bars inside',
    properties: 'strong when squeezed; the steel carries the pulling',
    performance: 'carries trucks for 50+ years in tropical rain',
  },
  bottle: {
    name: 'a PET water bottle',
    processing: 'a small tube of hot plastic is blown and stretched in a mould',
    structure: 'long chains lined up by the stretching, partly crystalline',
    properties: 'clear, light, and strong for its thickness',
    performance: 'holds water safely, and can be recycled',
  },
};
const CORNERS4 = ['processing', 'structure', 'properties', 'performance'];
export const materials_tetrahedron = {
  camera: { kind: '3d', position: [0, 0.4, 12.8] },
  ease: 2,
  mission: 'Look at all four products and trace each one from processing to performance.',
  goal: (_t, seen) => Object.keys(PRODUCTS).every((k) => seen.ex?.has(k)),
  params: [
    { key: 'ex', label: 'Product', type: 'choice', value: 'bolo', options: Object.entries(PRODUCTS).map(([k, v]) => ({ value: k, label: v.name })) },
    { key: 'step', hidden: true, value: 0 },
  ],
  free: { step: 5 },
  beats: [
    { say: 'Every made thing has a four-part story. Take a bolo knife. Part 1, processing: how it was made. It was forged hot, then only its edge was quenched in water.', set: { ex: 'bolo', step: 1 }, ms: 8500 },
    { say: 'Part 2: that processing set the structure inside. The quenched edge became hard martensite; the slow-cooled spine stayed softer pearlite.', set: { step: 2 }, ms: 8500 },
    { say: 'Part 3: the structure decides the properties. A hard edge holds sharpness; a tough back bends instead of breaking.', set: { step: 3 }, ms: 8000 },
    { say: 'Part 4: the properties decide the performance. The knife cuts for years without snapping.', set: { step: 4 }, ms: 7000 },
    {
      say: 'Join all four corners and you get the materials tetrahedron. Every corner affects the others, so engineers can start from any one: “I need this performance. What must I change?”',
      set: { step: 5 },
      ms: 10000,
    },
    { say: 'The same four questions explain a silicon chip: a near-perfect crystal with a few chosen impurity atoms conducts in a controllable way.', set: { ex: 'chip' }, ms: 9000 },
    { say: 'And a PET bottle: stretching hot plastic lines up its chains, so a thin wall is strong.', set: { ex: 'bottle' }, ms: 8000 },
  ],
  readout: (t) => {
    const e = PRODUCTS[t.ex];
    return CORNERS4.map((c) => [c[0].toUpperCase() + c.slice(1), e[c]]);
  },
  setup(kit) {
    const g = kit.group();
    const s = 2.4;
    // processing at the back-left, then round to performance
    const V = [
      [-s * 1.25, -s * 0.55, -s * 0.5],
      [0, s * 0.95, 0],
      [s * 1.25, -s * 0.55, -s * 0.5],
      [0, -s * 0.75, s * 0.9],
    ];
    const NAME = [
      [-1.6, -0.05],
      [0, 0.65],
      [1.6, -0.05],
      [0, -0.6],
    ];
    const TEXT = [
      [-0.9, 1.35],
      [2.9, -0.1],
      [0.9, 1.35],
      [0, -1.45],
    ];
    const cols = [C.gold, C.blue, C.green, C.pink];
    const balls = V.map((v, i) => kit.sphere(v, 0.3, cols[i], { parent: g, glow: 0.3, opacity: 1 }));
    const names = V.map((v, i) => kit.label(`\\text{${i + 1}. ${CORNERS4[i]}}`, [v[0] + NAME[i][0], v[1] + NAME[i][1], v[2]], { size: 19, color: cols[i], parent: g }));
    const texts = V.map((v, i) => kit.label('', [v[0] + TEXT[i][0], v[1] + TEXT[i][1], v[2]], { tex: false, cls: 'viz-wrap', parent: g }));
    const edges = [];
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) edges.push({ chain: j === i + 1, i, c: kit.cylinder(V[i], V[j], j === i + 1 ? 0.05 : 0.03, j === i + 1 ? C.yellow : 0x8a96a3, { parent: g, opacity: 0 }) });
    const runner = kit.sphere([0, 0, 0], 0.16, C.yellow, { parent: g, glow: 0.9 });
    const title = kit.label('', [0, 3.75, 0], { size: 24 });
    const vis = [0, 0, 0, 0];
    let all = 0;
    let fade = 1;
    let shown = null;
    return (_p, t, time, dt) => {
      // when the product changes, fade the four descriptions out and back in
      if (shown !== t.ex) {
        fade = Math.max(0, fade - dt * 3);
        if (fade === 0 || shown === null) {
          shown = t.ex;
          title.set(`\\text{${PRODUCTS[t.ex].name}}`);
          texts.forEach((l, i) => l.set(PRODUCTS[t.ex][CORNERS4[i]]));
        }
      } else fade = Math.min(1, fade + dt * 1.5);
      for (let i = 0; i < 4; i++) {
        vis[i] += ((t.step > i ? 1 : 0) - vis[i]) * ease(dt, 2.5);
        balls[i].visible = vis[i] > 0.02;
        balls[i].scale.setScalar(0.3 * smooth(clamp(vis[i] * 1.3, 0, 1)));
        show(names[i], vis[i]);
        show(texts[i], vis[i] * fade);
      }
      all += ((t.step >= 5 ? 1 : 0) - all) * ease(dt, 1.8);
      edges.forEach((e) => {
        const a = e.chain ? clamp(vis[e.i + 1] * 1.2 - 0.2, 0, 1) : all * 0.8;
        e.c.obj.material.opacity = a;
        e.c.obj.visible = a > 0.02;
      });
      title.opacity(fade);
      // a spark runs along the links that are already drawn
      const links = Math.min(3, Math.max(0, Math.round(t.step) - 1));
      runner.visible = links > 0;
      if (links > 0) {
        const u = (time * 0.4) % links;
        const k = Math.floor(u);
        const f = smooth(u - k);
        const a = V[k];
        const b = V[k + 1];
        runner.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
      }
      g.rotation.y = all * 0.25 * Math.sin(time * 0.25);
    };
  },
};

// ---------------------------------------------------------------------------
// NUM 06. The sieve of Eratosthenes, one crossing-out at a time
// ---------------------------------------------------------------------------
const SIEVE = [2, 3, 5, 7];
const factorize = (n) => {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    while (m % p === 0) {
      out.push(p);
      m /= p;
    }
  }
  if (m > 1) out.push(m);
  return out;
};
export const prime_sieve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.6, 4.4] },
  params: [
    {
      key: 'stage',
      label: 'Cross out multiples of',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Nothing yet' },
        { value: 1, label: '2' },
        { value: 2, label: '2, 3' },
        { value: 3, label: '2, 3, 5' },
        { value: 4, label: '2, 3, 5, 7' },
      ],
    },
    { key: 'n', label: 'Factor this number', min: 2, max: 100, step: 1, value: 60 },
    { key: 'lit', hidden: true, value: 0 },
    { key: 'fac', hidden: true, value: 0 },
  ],
  free: { lit: 1, fac: 1 },
  beats: [
    { say: 'A prime is a number that cannot be split into smaller whole-number factors. Eratosthenes (c. 240 BC) found them with a sieve. Write out 1 to 100. (1 is not counted as prime.)', set: { stage: 0, n: 60, lit: 0, fac: 0 }, ms: 8500 },
    { say: '2 is prime. Every other even number is 2 × something, so cross them out, one by one.', set: { stage: 1 }, ms: 9000 },
    { say: 'The next number still standing is 3: prime. Cross out its multiples. Some, like 6 and 12, were already gone.', set: { stage: 2 }, ms: 8500 },
    { say: 'Next survivor: 5. Most of its multiples are gone already; only 25, 35, 55, 65, 85 and 95 are new.', set: { stage: 3 }, ms: 8000 },
    { say: 'Then 7: only 49, 77 and 91 are new.', set: { stage: 4 }, ms: 6000 },
    {
      say: 'Why stop at 7? The next prime is 11, and 11 × 11 = 121 is past 100: any smaller multiple of 11 has a smaller factor and is already crossed out. What is left are the 25 primes up to 100.',
      set: { lit: 1 },
      ms: 11000,
    },
    { say: 'Every whole number is built from primes in exactly one way (Euclid). 60 = 2 · 2 · 3 · 5.', set: { fac: 1 }, ms: 7500 },
    { say: 'And 84 = 2 · 2 · 3 · 7. Primes are the atoms of multiplication.', set: { n: 84 }, ms: 7000 },
  ],
  readout: (t) => {
    const f = factorize(t.n);
    return [
      [`${t.n} as primes`, f.length === 1 ? `${t.n} is prime` : f.join(' × ')],
      ['Primes up to 100', '25 of them'],
      ['Why stop at 7?', '11 × 11 = 121 > 100, so 11’s multiples are already gone'],
    ];
  },
  setup(kit) {
    const cell = 0.78;
    const x0 = -2.2;
    const y0 = 3.6;
    const xy = (v) => [x0 + ((v - 1) % 10) * cell, y0 - Math.floor((v - 1) / 10) * cell];
    const cells = Array.from({ length: 100 }, (_, i) => {
      const v = i + 1;
      const [x, y] = xy(v);
      return {
        v,
        bg: kit.rect(x - cell / 2, y - cell / 2, cell - 0.05, cell - 0.05, { color: C.blue, opacity: 0.15, stroke: false }),
        l: kit.label(`${v}`, [x - 0.025, y - 0.025], { tex: false, size: 13 }),
        x: kit.line([[x - 0.25, y - 0.25], [x + 0.2, y + 0.2]], { color: C.red, width: 2.5, create: false }),
        fade: 0,
        by: 0,
      };
    });
    const colors = { 2: C.red, 3: C.green, 5: C.purple, 7: C.gold };
    const ring = kit.rect(0, 0, cell - 0.05, cell - 0.05, { fill: false, color: C.white, width: 3 });
    const pRing = kit.rect(0, 0, cell - 0.05, cell - 0.05, { fill: false, color: C.white, width: 4 });
    const head = kit.label('', [-5.6, 2.6], { size: 24 });
    const sub = kit.label('', [-5.6, 1.6], { tex: false, size: 15, color: C.muted ?? '#9aa4b2' });
    const count = kit.label('', [-5.6, 0.3], { tex: false, size: 15 });
    const fac = kit.label('', [-5.6, -1.8], { size: 24, color: C.yellow });
    let stage = -1;
    let clock = 0;
    return (_p, t, _time, dt) => {
      if (t.stage !== stage) {
        clock = t.stage > stage ? 0 : 99;
        stage = t.stage;
      }
      clock += dt;
      const active = SIEVE.slice(0, t.stage);
      const newest = SIEVE[t.stage - 1];
      let left = 0;
      cells.forEach((c) => {
        const by = c.v === 1 ? 1 : active.find((p) => c.v !== p && c.v % p === 0) || 0;
        // the newest pass crosses its multiples out one by one
        const due = by && by === newest && !active.slice(0, -1).some((p) => c.v % p === 0) ? (c.v / by - 2) * 0.11 + 0.6 : 0;
        const gone = !!by && clock >= due;
        if (gone && !c.by) c.by = by;
        if (!gone) c.by = 0;
        c.fade += ((gone ? 1 : 0) - c.fade) * ease(dt, 5);
        if (!gone && c.v > 1) left += 1;
        const prime = t.lit > 0.5 && !gone;
        const col = prime ? C.yellow : c.by > 1 ? colors[c.by] : C.blue;
        c.bg.color(col).opacity(prime ? 0.55 * t.lit : gone ? 0.3 * (1 - c.fade) + 0.06 : 0.15);
        c.l.opacity(1 - 0.7 * c.fade).color(prime ? '#1a1400' : '');
        c.x.color(c.by > 1 ? colors[c.by] : C.grey).opacity(0.8 * c.fade).visible(c.fade > 0.05);
      });
      if (newest) {
        const [px, py] = xy(newest);
        pRing.set(px - cell / 2, py - cell / 2, cell - 0.05, cell - 0.05).color(colors[newest]).visible(t.lit < 0.5);
        head.set(t.lit > 0.5 ? '25\\text{ primes}' : `\\text{multiples of }${newest}`).color(t.lit > 0.5 ? C.yellow : colors[newest]);
        sub.set(t.lit > 0.5 ? 'up to 100' : `${newest * 2}, ${newest * 3}, ${newest * 4}, …`);
      } else {
        pRing.visible(false);
        head.set('1 \\text{ to } 100').color(C.white);
        sub.set('');
      }
      count.set(`numbers still standing: ${left}`);
      count.visible(t.stage > 0);
      const i = t.n - 1;
      ring.set(x0 + (i % 10) * cell - cell / 2, y0 - Math.floor(i / 10) * cell - cell / 2, cell - 0.05, cell - 0.05);
      show(ring, t.fac);
      fac.set(`${t.n} = ${factorize(t.n).join(' \\cdot ')}`);
      show(fac, t.fac);
    };
  },
};

// ---------------------------------------------------------------------------
// MATH 002. Fractions on an area grid: re-slice, then add or overlap
// ---------------------------------------------------------------------------
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const frac = (n, d) => `\\frac{${n}}{${d}}`;
const simplest = (n, d) => {
  const k = gcd(n, d) || 1;
  const N = n / k;
  const D = d / k;
  if (D === 1) return `${N}`;
  if (N > D) return `${Math.floor(N / D)}\\frac{${N % D}}{${D}}`;
  return frac(N, D);
};
export const fraction_area_grid = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.6, 4.4] },
  ease: 2.5,
  params: [
    { key: 'numA', label: 'A: top number', min: 0, max: 12, step: 1, value: 2 },
    { key: 'denA', label: 'A: bottom number', min: 1, max: 12, step: 1, value: 3 },
    { key: 'numB', label: 'B: top number', min: 0, max: 12, step: 1, value: 3 },
    { key: 'denB', label: 'B: bottom number', min: 1, max: 12, step: 1, value: 4 },
    {
      key: 'mode',
      label: 'Operation',
      type: 'choice',
      value: 'add',
      options: [
        { value: 'add', label: 'A + B' },
        { value: 'mul', label: 'A × B' },
      ],
    },
    { key: 'step', hidden: true, value: 1 },
    { key: 'cut', hidden: true, value: 0 },
    { key: 'sum', hidden: true, value: 0 },
  ],
  free: { step: 3, cut: 2, sum: 1 },
  beats: [
    { say: 'A fraction is a share of one whole. Cut a square into 3 equal columns and shade 2: that is 2/3.', set: { numA: 2, denA: 3, numB: 3, denB: 4, mode: 'add', step: 1, cut: 0, sum: 0 } },
    { say: 'Cut another square into 4 equal rows and shade 3: that is 3/4.', set: { step: 2 } },
    { say: 'Now add them. The trouble: thirds and quarters are different-sized pieces, so “2 pieces + 3 pieces” means nothing yet.', set: { step: 3 }, ms: 7500 },
    {
      say: 'Slice the first square across into 4 rows as well. The shaded area has not changed, but now it is 8 pieces out of 12. (That is multiplying by 4/4, which is just 1.)',
      set: { cut: 1 },
      ms: 10000,
      notes: [{ text: 'same area, smaller pieces', at: [-5.9, 2.65], to: [-5.9, 1.6] }],
    },
    { say: 'Slice the second into 3 columns: 9 pieces out of 12.', set: { cut: 2 }, ms: 6500 },
    {
      say: 'Now the pieces match, so we can count them: 8 twelfths + 9 twelfths = 17 twelfths. That is one whole square and 5/12 more.',
      set: { sum: 1 },
      ms: 10000,
    },
    {
      say: 'Multiplying is different: 2/3 × 3/4 means “take 2/3 of 3/4”. Lay the shaded columns over the shaded rows. Where they overlap: 6 of 12 pieces, which is 1/2.',
      set: { mode: 'mul' },
      ms: 11000,
    },
  ],
  goal: (t) => t.numA === 2 && t.denA === 3 && t.numB === 3 && t.denB === 4,
  readout: (t) => {
    const red = (n, d) => {
      const k = gcd(n, d) || 1;
      return `${n / k}/${d / k}`;
    };
    const cd = t.denA * t.denB;
    return t.mode === 'add'
      ? [
          ['Common piece size', `1/${cd}`],
          ['A in common pieces', `${t.numA * t.denB}/${cd}`],
          ['B in common pieces', `${t.numB * t.denA}/${cd}`],
          ['A + B', `${t.numA * t.denB + t.numB * t.denA}/${cd} = ${red(t.numA * t.denB + t.numB * t.denA, cd)}`],
        ]
      : [
          ['Overlap pieces', `${t.numA * t.numB} of ${cd}`],
          ['A × B', `${t.numA * t.numB}/${cd} = ${red(t.numA * t.numB, cd)}`],
        ];
  },
  setup(kit) {
    const S = 3;
    const Y = -1.5;
    const sq = { A: [-7.4, Y], B: [-3.4, Y], R0: [0.8, Y], R1: [4.6, Y] };
    const pool = () => Array.from({ length: 24 }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1.3, create: false }));
    const frame = (o) => kit.rect(o[0], o[1], S, S, { fill: false, color: C.white, width: 2.5 });
    const grid = (lines, o, cols, rows, aCol, aRow) =>
      lines.forEach((l, i) => {
        if (i < 12) {
          const c = i + 1;
          const x = o[0] + (S * c) / cols;
          l.set([[x, o[1]], [x, o[1] + S]]);
          show(l, c < cols ? aCol : 0, 0.75);
        } else {
          const r = i - 11;
          const y = o[1] + (S * r) / rows;
          l.set([[o[0], y], [o[0] + S, y]]);
          show(l, r < rows ? aRow : 0, 0.75);
        }
      });
    // A's square: shaded columns. B's square: shaded rows.
    const fA = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.6, stroke: false });
    const fB = kit.rect(0, 0, 0, 0, { color: C.yellow, opacity: 0.6, stroke: false });
    const frA = frame(sq.A);
    const frB = frame(sq.B);
    const gA = pool();
    const gB = pool();
    const lA = kit.label('', [sq.A[0] + S / 2, Y - 0.85], { size: 26, color: C.blue });
    const lB = kit.label('', [sq.B[0] + S / 2, Y - 0.85], { size: 26, color: C.yellow });
    const op = kit.label('', [-3.9, Y + S / 2], { size: 30 });
    const eqs = kit.label('', [0.3, Y + S / 2], { size: 30 });
    const top = kit.label('', [-3.9, 3.7], { size: 22 });
    // result squares
    const fr0 = frame(sq.R0);
    const fr1 = frame(sq.R1);
    const g0 = pool();
    const g1 = pool();
    const parts = (color) => Array.from({ length: 6 }, () => kit.rect(0, 0, 0, 0, { color, opacity: 0.6, stroke: false }));
    const pBlue = parts(C.blue);
    const pYel = parts(C.yellow);
    const mulA = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.3, stroke: false });
    const mulB = kit.rect(0, 0, 0, 0, { color: C.yellow, opacity: 0.3, stroke: false });
    const mulO = kit.rect(0, 0, 0, 0, { color: C.green, opacity: 0.8, stroke: false });
    const lR = kit.label('', [4.2, Y - 0.85], { size: 26 });
    const v = { s1: 0, s2: 0, s3: 0, c1: 0, c2: 0, sum: 0, mul: 0 };
    let pour = 0;
    // cells [from, to) of a cols×rows square, filled row by row from the top: up to 3 rectangles
    const range = (rects, o, cols, rows, from, to, a) => {
      const w = S / cols;
      const h = S / rows;
      const out = [];
      let k = from;
      const row = (r, c0, c1) => out.push([o[0] + c0 * w, o[1] + S - (r + 1) * h, (c1 - c0) * w, h]);
      if (k < to && k % cols) {
        const e = Math.min(to, (Math.floor(k / cols) + 1) * cols);
        row(Math.floor(k / cols), k % cols, (e - 1) % cols + 1);
        k = e;
      }
      const full = Math.floor((to - k) / cols);
      if (full > 0) {
        const r = k / cols;
        out.push([o[0], o[1] + S - (r + full) * h, S, full * h]);
        k += full * cols;
      }
      if (k < to) row(k / cols, 0, to - k);
      rects.forEach((q, i) => {
        if (out[i]) q.set(...out[i]);
        show(q, out[i] ? a : 0, 0.6);
      });
    };
    return (_p, t, _time, dt) => {
      const e = ease(dt, 2.5);
      v.s1 += ((t.step >= 1 ? 1 : 0) - v.s1) * e;
      v.s2 += ((t.step >= 2 ? 1 : 0) - v.s2) * e;
      v.s3 += ((t.step >= 3 ? 1 : 0) - v.s3) * e;
      v.c1 += ((t.cut >= 1 ? 1 : 0) - v.c1) * e;
      v.c2 += ((t.cut >= 2 ? 1 : 0) - v.c2) * e;
      const mul = t.mode === 'mul';
      v.sum += ((t.sum > 0.5 && !mul ? 1 : 0) - v.sum) * e;
      v.mul += ((mul ? 1 : 0) - v.mul) * e;
      const nA = Math.min(t.numA, t.denA);
      const nB = Math.min(t.numB, t.denB);
      const cd = t.denA * t.denB;
      // A: columns, shaded from the left; the rows appear when it is re-sliced
      fA.set(sq.A[0], Y, (S * nA) / t.denA, S * smooth(clamp(v.s1 * 1.4, 0, 1)));
      show(frA, v.s1);
      grid(gA, sq.A, t.denA, t.denB, v.s1, v.c1);
      // B: rows, shaded from the bottom; the columns appear when it is re-sliced
      fB.set(sq.B[0], Y, S * smooth(clamp(v.s2 * 1.4, 0, 1)), (S * nB) / t.denB);
      show(fB, v.s2, 0.6);
      show(frB, v.s2);
      grid(gB, sq.B, t.denA, t.denB, v.s2 * v.c2, v.s2);
      lA.set(v.c1 > 0.5 ? `${frac(t.numA, t.denA)} = ${frac(nA * t.denB, cd)}` : frac(t.numA, t.denA));
      show(lA, v.s1);
      lB.set(v.c2 > 0.5 ? `${frac(t.numB, t.denB)} = ${frac(nB * t.denA, cd)}` : frac(t.numB, t.denB));
      show(lB, v.s2);
      op.set(mul ? '\\times' : '+');
      show(op, v.s3);
      top.set(v.c2 > 0.5 || mul ? `\\text{pieces of size } ${frac(1, cd)}` : `\\text{thirds? quarters? different pieces}`);
      if (t.denA === 3 && t.denB === 4) {
        if (!(v.c2 > 0.5 || mul)) top.set('\\text{thirds and quarters: different-sized pieces}');
      } else if (!(v.c2 > 0.5 || mul)) top.set('\\text{different-sized pieces}');
      show(top, v.s3 * (t.denA === t.denB && !mul ? 0 : 1));
      // the sum: pieces pour into whole squares of `cd` pieces
      const NA = nA * t.denB;
      const NB = nB * t.denA;
      const total = NA + NB;
      if (t.sum > 0.5 && !mul) pour = Math.min(total, pour + dt * Math.max(5, total / 3));
      else pour = 0;
      const b = Math.min(pour, NA);
      const yv = clamp(pour - NA, 0, NB);
      const two = total > cd;
      const rs = [sq.R0, sq.R1];
      [pBlue, pYel].forEach((rects, ci) => {
        const [from, to] = ci === 0 ? [0, Math.floor(b)] : [NA, NA + Math.floor(yv)];
        // split across the two result squares: 3 rectangles per square
        [0, 1].forEach((s) => {
          const f = clamp(from - s * cd, 0, cd);
          const tt = clamp(to - s * cd, 0, cd);
          range(rects.slice(s * 3, s * 3 + 3), rs[s], t.denA, t.denB, f, Math.max(f, tt), v.sum);
        });
      });
      show(fr0, Math.max(v.sum, v.mul));
      show(fr1, two ? v.sum : 0);
      grid(g0, sq.R0, t.denA, t.denB, Math.max(v.sum, v.mul), Math.max(v.sum, v.mul));
      grid(g1, sq.R1, t.denA, t.denB, two ? v.sum : 0, two ? v.sum : 0);
      show(eqs, Math.max(v.sum, v.mul));
      eqs.set('=');
      // the product: A's columns over B's rows
      const wA = (S * nA) / t.denA;
      const hB = (S * nB) / t.denB;
      mulA.set(sq.R0[0], Y, wA, S);
      mulB.set(sq.R0[0], Y, S, hB);
      mulO.set(sq.R0[0], Y, wA, hB);
      show(mulA, v.mul, 0.3);
      show(mulB, v.mul, 0.3);
      show(mulO, v.mul, 0.8);
      if (mul) lR.set(`${frac(nA * nB, cd)} = ${simplest(nA * nB, cd)}`).pos([sq.R0[0] + S / 2, Y - 0.85]);
      else lR.set(`${frac(Math.round(pour), cd)}${pour >= total && total > cd ? ` = ${simplest(total, cd)}` : ''}`).pos([two ? 4.2 : sq.R0[0] + S / 2, Y - 0.85]);
      show(lR, Math.max(v.sum, v.mul));
    };
  },
};

// ---------------------------------------------------------------------------
// MATH 001. Signed numbers as arrows: adding slides, multiplying stretches and turns
// ---------------------------------------------------------------------------
const sg = (v) => (v < 0 ? `(-${n2(-v)})` : `${n2(v)}`);
export const number_line_vectors = {
  camera: { kind: '2d', x: [-9, 9], y: [-2.6, 4.4] },
  ease: 2.2,
  params: [
    { key: 'x', label: 'Starting arrow x', min: -5, max: 5, step: 1, value: 3 },
    { key: 'k', label: 'Multiply by k', min: -3, max: 3, step: 0.5, value: 1 },
    { key: 'b', label: 'Then add b', min: -5, max: 5, step: 1, value: 0 },
    { key: 'mult', hidden: true, value: 0 },
    { key: 'add', hidden: true, value: 0 },
  ],
  free: { mult: 1, add: 1 },
  beats: [
    { say: 'Think of a number as an arrow starting at zero. +3 is an arrow 3 steps long, pointing right.', set: { x: 3, k: 1, b: 0, mult: 0, add: 0 } },
    { say: '−3 is just as long but points left. The minus sign is a direction, not “less than nothing”.', set: { x: -3 } },
    {
      say: 'Adding is sliding. Start at −4, then slide 7 steps to the right. You land on +3: −4 + 7 = 3.',
      set: { x: -4, b: 7, add: 1 },
      ms: 8000,
    },
    { say: 'Multiplying by 2 stretches the arrow to twice its length: 2 × 3 = 6.', set: { x: 3, k: 2, b: 0, add: 0, mult: 1 }, ms: 6500 },
    {
      say: 'Multiplying by −1 swings the arrow half a turn around zero: −1 × 3 = −3.',
      set: { k: -1 },
      ms: 7000,
      notes: [{ text: 'half a turn (180°)', at: [3.4, 3.4], to: [0.6, 2.6] }],
    },
    { say: 'Now 2 × −3. Start from −3 (pointing left) and stretch it 2×: −6.', set: { x: -3, k: 2 }, ms: 6500 },
    {
      say: 'And −2 × −3: stretch 2×, and the minus swings it half a turn, so it points right: +6. Two minus signs are two half-turns, a full turn. That is why negative × negative is positive.',
      set: { k: -2 },
      ms: 11000,
    },
    {
      say: 'Put both together: 3 × 2 − 4. Multiply first (stretch to 6), then slide 4 to the left. You land on 2.',
      set: { x: 2, k: 3, b: -4, add: 1 },
      ms: 9000,
    },
  ],
  goal: (t) => t.x === -3 && t.k === -2,
  readout: (t) => {
    const r = t.k * t.x + t.b;
    return [
      ['k · x', n2(t.k * t.x)],
      ['k · x + b', n2(r)],
      ['Minus signs in the product', (t.k < 0 ? 1 : 0) + (t.x < 0 ? 1 : 0)],
    ];
  },
  setup(kit) {
    const S = 0.5;
    const P = kit.plane({ x: [-17, 17, 1], y: [0, 0, 1], sx: S, grid: false, yAxis: false, xEvery: 2 });
    kit.dot([0, 0], { r: 0.08, color: C.white });
    const base = kit.arrow([0, 0.45], [1, 0.45], { color: C.blue, width: 4 });
    const baseLbl = kit.label('', [0, 0.8], { color: C.blue });
    const arc = kit.line([[0, 0]], { color: C.yellow, width: 1.5, dashed: true, opacity: 0.6 });
    const prod = kit.arrow([0, 1.3], [1, 1.3], { color: C.yellow, width: 4 });
    const prodLbl = kit.label('', [0, 1.7], { color: C.yellow });
    const add = kit.arrow([0, 2.4], [1, 2.4], { color: C.green, width: 4 });
    const addLbl = kit.label('', [0, 2.8], { color: C.green });
    const guide = kit.line([[0, 0], [0, 0]], { color: C.green, width: 1, dashed: true, opacity: 0.5, create: false });
    const res = kit.dot([0, 0], { r: 0.14, color: C.red, z: 6 });
    const resLbl = kit.label('', [0, -0.75], { color: C.red, size: 20 });
    const eq = kit.label('', [0, 3.9], { size: 26 });
    let flip = 0;
    let m = 0;
    let a = 0;
    return (p, t, _time, dt) => {
      // the half-turn plays slowly whenever k changes sign
      flip += ((t.k < 0 ? 1 : 0) - flip) * ease(dt, 1.6);
      m += (t.mult - m) * ease(dt, 2.5);
      a += (t.add - a) * ease(dt, 2.5);
      const [bx] = P.toW(p.x, 0);
      base.set([0, 0.45], [bx, 0.45]);
      baseLbl.set(`${n2(t.x)}`).pos([bx / 2, 0.85]);

      const L = Math.abs(p.k * p.x) * S;
      const dir = Math.sign(p.x || 1);
      const ang = Math.PI * smooth(flip);
      const tip = [dir * L * Math.cos(ang), 1.3 + L * Math.sin(ang) * 0.6];
      prod.visible(m > 0.02).set([0, 1.3], tip).opacity(m);
      const arcPts = [];
      for (let i = 0; i <= 40; i++) {
        const q = (Math.PI * i) / 40;
        arcPts.push([dir * L * Math.cos(q), 1.3 + L * Math.sin(q) * 0.6]);
      }
      arc.set(arcPts);
      show(arc, t.k < 0 && L > 0.05 ? m : 0, 0.6);
      prodLbl.set(`${sg(t.k)}\\times${sg(t.x)} = ${n2(t.k * t.x)}`).pos([tip[0], tip[1] + 0.45]);
      show(prodLbl, m);

      // the slide starts from wherever the arrow above ends
      const from = m > 0.5 ? p.k * p.x * S : p.x * S;
      const row = 1.3 + 1.1 * m;
      const end = from + p.b * S * smooth(a);
      add.visible(a > 0.02 && Math.abs(t.b) > 0).set([from, row], [end, row]).opacity(a);
      addLbl.set(t.b < 0 ? `\\text{slide } ${n2(-t.b)} \\text{ left}` : `\\text{slide } ${n2(t.b)} \\text{ right}`).pos([(from + end) / 2, row + 0.4]);
      show(addLbl, Math.abs(t.b) > 0 ? a : 0);
      guide.set([[end, row], [end, 0]]);
      show(guide, Math.abs(t.b) > 0 ? a : 0, 0.5);
      const val = (t.mult > 0.5 ? t.k * t.x : t.x) + (t.add > 0.5 ? t.b : 0);
      const pos = (m > 0.5 ? p.k * p.x : p.x) * S + (Math.abs(t.b) > 0 ? p.b * S * smooth(a) : 0);
      res.set([pos, 0]);
      res.visible(t.mult > 0.5 || t.add > 0.5);
      resLbl.set(`${n2(val)}`).pos([pos, -0.75]);
      resLbl.visible(t.mult > 0.5 || t.add > 0.5);
      let s = `${n2(t.x)}`;
      if (t.mult > 0.5) s = `${sg(t.k)}\\times${sg(t.x)}`;
      if (t.add > 0.5 && t.b) s += ` + ${sg(t.b)}`;
      eq.set(t.mult > 0.5 || t.add > 0.5 ? `${s} = ${n2(val)}` : `\\text{the arrow } {${t.x > 0 ? '+' : ''}${n2(t.x)}}`);
    };
  },
};

// ---------------------------------------------------------------------------
// CHEM 002. Units cancel like algebra: multiply by fractions equal to 1
// ---------------------------------------------------------------------------
const CALC = {
  density: () => '7.87 \\times 1{,}000{,}000 \\div 1000',
  speed: (v) => `${v} \\times 1000 \\div 3600`,
  volume: () => '100 \\times 100 \\times 100',
  stress: (v) => `${v} \\times 1000 \\div 25`,
};
export const dimensional_pipeline = {
  camera: { kind: '2d', x: [-8, 8], y: [-3, 4] },
  ease: 2.2,
  params: [
    {
      key: 'example',
      label: 'Conversion',
      type: 'choice',
      value: 'density',
      options: [
        { value: 'density', label: 'Iron density g/cm³ → kg/m³' },
        { value: 'speed', label: 'km/h → m/s' },
        { value: 'volume', label: '1 m³ → cm³' },
        { value: 'stress', label: 'kN on 25 mm² → MPa' },
      ],
    },
    { key: 'v', label: 'Starting value', min: 10, max: 200, step: 2, value: 72 },
    { key: 'stage', label: 'Pipeline step', min: 0, max: 3, step: 1, value: 0 },
    { key: 'cx', hidden: true, value: 0 },
  ],
  free: { cx: 9 },
  beats: [
    { say: 'Start with what you know, units included, written as a fraction: iron weighs 7.87 g for every 1 cm³. We want it in kg per m³.', set: { example: 'density', v: 72, stage: 0, cx: 0 }, ms: 8000 },
    {
      say: '1 kg is exactly 1000 g, so the fraction “1 kg over 1000 g” equals 1. Multiplying by 1 changes nothing, but it brings kg in.',
      set: { stage: 1 },
      ms: 9500,
      notes: [{ text: 'top and bottom are the same amount, so this equals 1', at: [1.6, 2.7], to: [-1.9, -0.85] }],
    },
    { say: 'Now g is on top in the first fraction and on the bottom in the second. They cancel, just like x ÷ x = 1 in algebra.', set: { cx: 1 }, ms: 8000 },
    { say: 'Same trick for volume: 1 m³ = 1,000,000 cm³. Put cm³ on top, so it sits opposite the cm³ below.', set: { stage: 2 }, ms: 8500 },
    { say: 'cm³ cancels too.', set: { cx: 2 }, ms: 4000 },
    {
      say: 'Only kg on top and m³ on the bottom are left, exactly the units we wanted. Now do the numbers: 7.87 × 1,000,000 ÷ 1000 = 7,870 kg/m³.',
      set: { stage: 3 },
      ms: 10000,
    },
    { say: 'The same method works for any conversion. A car at 72 km/h: kilometres and hours cancel, leaving 20 m/s.', set: { example: 'speed', v: 72, stage: 3, cx: 9 }, ms: 8500 },
  ],
  readout: (t) => [
    ['Rule', 'Each factor equals 1, so the value never changes'],
    ['Units left after cancelling', t.stage === 3 ? 'only the target unit' : 'keep going →'],
  ],
  setup(kit) {
    const W = 2.6;
    const H = 2.4;
    const slots = Array.from({ length: 3 }, (_, i) => {
      const frame = kit.rect(0, 0, W, H, { color: C.blue, opacity: 0.08, strokeColor: C.blue, width: 2 });
      const bar = kit.line([[0, 0], [1, 0]], { color: C.white, width: 2, create: false });
      const nNum = kit.label('', [0, 0], { tex: false, cls: 'card-num', align: 'right' });
      const nU = kit.label('', [0, 0], { tex: false, cls: 'card-unit', align: 'left' });
      const dNum = kit.label('', [0, 0], { tex: false, cls: 'card-num', align: 'right' });
      const dU = kit.label('', [0, 0], { tex: false, cls: 'card-unit', align: 'left' });
      const times = kit.label('×', [0, 0], { tex: false, size: 26 });
      const one = kit.label('= 1', [0, 0], { tex: false, size: 19, color: C.green });
      return { frame, bar, nNum, nU, dNum, dU, times, one, i };
    });
    const eqSign = kit.label('=', [0, 0.5], { tex: false, size: 30 });
    const result = kit.label('', [0, 0.5], { size: 30, color: C.green, align: 'left' });
    const calc = kit.label('', [0, -2.4], { size: 22 });
    let res = 0;
    return (p, t, _time, dt) => {
      const pipe = PIPELINES[t.example];
      const cards = [pipe.start(t.v), ...pipe.cards];
      const n = cards.length;
      const widths = cards.map((c) => Math.max(W, 0.3 * Math.max(`${c.n}${c.nu}`.length, `${c.d || ''}${c.du || ''}`.length) + 1.0));
      const lefts = widths.map((_, i) => widths.slice(0, i).reduce((a, w) => a + w + 0.8, 0));
      const total = widths.reduce((a, w) => a + w, 0) + (n - 1) * 0.8;
      const x0 = -total / 2 - 1.6;
      // cancel pair j once both of its cards are on screen and the story has reached it
      const cancelled = new Set();
      pipe.cancel.forEach((pair, j) => {
        const need = Math.max(...pair.map((k) => +k[0]));
        if (t.cx > j && t.stage >= need) pair.forEach((k) => cancelled.add(k));
      });
      const allGone = pipe.cancel.every((pair) => pair.every((k) => cancelled.has(k)));
      slots.forEach((s, i) => {
        const card = cards[i];
        const a = card ? clamp(p.stage - (i === 0 ? -1 : i - 1), 0, 1) : 0;
        const w = widths[i] ?? W;
        const x = x0 + (lefts[i] ?? 0) + (1 - smooth(a)) * 1.2;
        const y = -0.7;
        const vis = !!card && a > 0.01;
        [s.frame, s.bar, s.nNum, s.nU, s.dNum, s.dU].forEach((o) => o.visible(vis));
        s.times.visible(vis && i > 0);
        s.one.visible(vis && i > 0);
        if (!vis) return;
        s.frame.set(x, y, w, H).opacity(0.08 * a);
        s.frame.outline?.opacity(a);
        s.bar.set([[x + 0.3, y + H / 2], [x + w - 0.3, y + H / 2]]).visible(!!card.d);
        const cx = x + w / 2 + 0.1;
        s.nNum.set(card.n).pos([cx - 0.05, y + H * 0.75]).opacity(a);
        s.nU.set(card.nu).pos([cx + 0.05, y + H * 0.75]).opacity(a);
        s.dNum.set(card.d).pos([cx - 0.05, y + H * 0.25]).opacity(a).visible(!!card.d);
        s.dU.set(card.du).pos([cx + 0.05, y + H * 0.25]).opacity(a).visible(!!card.d);
        s.nU.el.classList.toggle('cancel', cancelled.has(`${i}n`));
        s.dU.el.classList.toggle('cancel', cancelled.has(`${i}d`));
        s.times.pos([x - 0.4, y + H / 2]).opacity(a);
        s.one.pos([x + w / 2, y - 0.35]).opacity(a);
      });
      const done = t.stage >= 3 && allGone;
      res += ((done ? 1 : 0) - res) * ease(dt, 2.5);
      const endX = x0 + total + 0.4;
      eqSign.pos([endX, 0.5]);
      show(eqSign, res);
      result.set(pipe.result(t.v)).pos([endX + 0.45, 0.5]);
      show(result, res);
      calc.set(`${CALC[t.example](t.v)} = ${pipe.result(t.v)}`);
      show(calc, res);
    };
  },
};

// ---------------------------------------------------------------------------
// NUM 07. Decimals: each digit says which of ten pieces, zooming in each time
// ---------------------------------------------------------------------------
const DIGCOL = ['#e8c547', '#7fd1ae', '#d98bd9', '#7fb8e8'];
export const decimal_zoom = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  ease: 1.6,
  params: [
    { key: 'x', label: 'The number', min: 0, max: 0.999, step: 0.001, value: 0.375 },
    { key: 'depth', label: 'Zoom levels', min: 0, max: 3, step: 1, value: 0 },
    { key: 'cut', hidden: true, value: 0 },
    { key: 'fr', hidden: true, value: 0 },
  ],
  free: { cut: 1, fr: 0 },
  beats: [
    { say: 'Here is the gap from 0 to 1, and a point somewhere in it. How do we say exactly where? Simon Stevin’s answer (1585): decimals.', set: { x: 0.375, depth: 0, cut: 0, fr: 0 }, ms: 7500 },
    {
      say: 'Split the gap into ten equal pieces: tenths. The point is in piece number 3 (counting from 0). So the first digit is 3: 0.3…',
      set: { cut: 1 },
      ms: 9000,
    },
    { say: 'Zoom into that one piece and split it into ten again: hundredths. The point is in piece 7. Now we have 0.37…', set: { depth: 1 }, ms: 9000 },
    { say: 'Zoom once more: thousandths. The point lands exactly on mark 5. So the number is 0.375.', set: { depth: 2 }, ms: 8500 },
    {
      say: 'Each digit just says which of ten pieces to go into: 0.375 = 3 tenths + 7 hundredths + 5 thousandths. That happens to equal 3/8 exactly.',
      set: { fr: 1 },
      ms: 10000,
    },
    { say: 'Try 0.625 (that is 5/8): pieces 6, then 2, then 5. Zoom a fourth time and the next digit is 0: the decimal stops.', set: { x: 0.625, depth: 3, fr: 0 }, ms: 9500 },
  ],
  readout: (t) => {
    const d = t.x.toFixed(3).slice(2).split('');
    return [
      ['Digits', `0.${d.join('')}`],
      ['Meaning', `${d[0]}/10 + ${d[1]}/100 + ${d[2]}/1000`],
      ['As a fraction', `${Math.round(t.x * 1000)}/1000`],
    ];
  },
  setup(kit) {
    const rows = [0, 1, 2, 3].map((k) => {
      const y = 3 - k * 2.1;
      return {
        k,
        y,
        axis: kit.line([[-7, y], [7, y]], { color: C.axis, width: 2, create: false }),
        ticks: Array.from({ length: 11 }, () => kit.line([[0, 0], [0, 0]], { color: C.axis, width: 1.5, create: false })),
        labels: Array.from({ length: 11 }, () => kit.label('', [0, 0], { tex: false, cls: 'tick' })),
        hi: kit.rect(0, 0, 0, 0.36, { color: DIGCOL[k], opacity: 0.3, stroke: false }),
        dig: kit.label('', [0, 0], { size: 24, color: DIGCOL[k] }),
        dot: kit.dot([0, y], { r: 0.11, color: C.red, z: 6 }),
        zoomL: kit.line([[0, 0], [0, 0]], { color: DIGCOL[k], width: 1, opacity: 0.4, dashed: true, create: false }),
        zoomR: kit.line([[0, 0], [0, 0]], { color: DIGCOL[k], width: 1, opacity: 0.4, dashed: true, create: false }),
      };
    });
    const top = kit.label('', [0, 4.05], { size: 30 });
    const fr = kit.label('', [0, -3.3], { size: 26 });
    let cut = 0;
    let frA = 0;
    return (p, t, _time, dt) => {
      cut += (t.cut - cut) * ease(dt, 1.8);
      frA += (t.fr - frA) * ease(dt, 2.5);
      const digits = t.x.toFixed(4).slice(2).split('');
      let prev = null; // where the parent row's highlighted piece sits
      let shown = 0;
      rows.forEach((r) => {
        const a = clamp(p.depth - r.k + 1, 0, 1);
        const g = smooth(a);
        const scale = 10 ** r.k;
        const lo = Math.floor(t.x * scale + 1e-9) / scale;
        const W = 14;
        // the new row grows out of the piece above it
        const from = prev ?? { x0: -7, x1: 7, y: r.y };
        const mapX = (u) => (prev ? from.x0 + ((u + 7) / 14) * (from.x1 - from.x0) : u) * (1 - g) + u * g;
        const y = prev ? from.y + (r.y - from.y) * g : r.y;
        const vis = a > 0.01;
        r.axis.set([[mapX(-7), y], [mapX(7), y]]).opacity(a).visible(vis);
        const inner = r.k === 0 ? cut : 1;
        r.ticks.forEach((tk, i) => {
          const tx = mapX(-7 + (i * W) / 10);
          const end = i % 10 === 0;
          tk.set([[tx, y - (end ? 0.25 : 0.15)], [tx, y + (end ? 0.25 : 0.15)]]).opacity(a * (end ? 1 : inner)).visible(vis && (end || inner > 0.02));
        });
        r.labels.forEach((lb, i) => {
          const v = lo + i / (10 * scale);
          const end = i % 10 === 0;
          lb.set(v.toFixed(r.k + 1).replace(/0+$/, '').replace(/\.$/, '') || '0')
            .pos([mapX(-7 + (i * W) / 10), y - 0.42])
            .opacity(a * (end ? 1 : inner) * g)
            .visible(vis && (end || inner > 0.02) && (r.k < 2 || i % 2 === 0 || end));
        });
        const toX = (v) => mapX(-7 + ((v - lo) / (1 / scale)) * W);
        const sub = Math.floor(t.x * scale * 10 + 1e-9) / (scale * 10);
        const hx0 = toX(sub);
        const hx1 = toX(sub + 1 / (scale * 10));
        const hiA = a * (r.k === 0 ? cut : 1) * g;
        r.hi.set(hx0, y - 0.18, hx1 - hx0, 0.36);
        show(r.hi, hiA, 0.3);
        r.dig.set(`${digits[r.k]}`).pos([(hx0 + hx1) / 2, y + 0.55]);
        show(r.dig, hiA);
        if (hiA > 0.5) shown = r.k + 1;
        const nextA = r.k < 3 ? clamp(p.depth - r.k, 0, 1) : 0;
        r.zoomL.set([[hx0, y - 0.2], [-7, r.y - 1.85]]);
        r.zoomR.set([[hx1, y - 0.2], [7, r.y - 1.85]]);
        show(r.zoomL, nextA, 0.4);
        show(r.zoomR, nextA, 0.4);
        r.dot.set([toX(p.x), y]);
        show(r.dot, a);
        prev = { x0: hx0, x1: hx1, y };
      });
      const parts = digits.slice(0, Math.max(shown, 0)).map((d, i) => `{\\color{${DIGCOL[i]}}${d}}`);
      top.set(shown ? `0.${parts.join('')}${digits.slice(shown).some((d) => d !== '0') ? '\\ldots' : ''}` : '0 \\text{ to } 1');
      const d3 = digits.slice(0, 3);
      const k = gcd(Math.round(t.x * 1000), 1000);
      fr.set(
        `0.${d3.join('')} = \\frac{${d3[0]}}{10} + \\frac{${d3[1]}}{100} + \\frac{${d3[2]}}{1000} = \\frac{${Math.round(t.x * 1000) / k}}{${1000 / k}}`,
      );
      show(fr, t.depth < 3 ? frA : 0);
    };
  },
};
