import { C } from '../theme';
import { clamp, lerp, poly, range, smooth } from '../kit';

const n2 = (v) => Math.round(v * 100) / 100;
const ease = (dt, rate = 5) => 1 - Math.exp(-dt * rate);

// ---------------------------------------------------------------------------
// 1. Counting: one notch per sheep, grouped in fives
// ---------------------------------------------------------------------------
export const tally_counting = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.4] },
  params: [
    { key: 'n', label: 'How many sheep', min: 0, max: 30, step: 1, value: 4 },
    {
      key: 'group',
      label: 'Notches',
      type: 'choice',
      value: 'ones',
      options: [
        { value: 'ones', label: 'One by one' },
        { value: 'fives', label: 'Bundled in fives' },
      ],
    },
  ],
  beats: [
    { say: 'Before there were number words, a shepherd could still keep track: one notch for every sheep. Matching things one-to-one is the oldest idea in maths.', set: { n: 4, group: 'ones' } },
    { say: 'Past a handful, loose notches are hard to read at a glance. So people bundled them: four strokes and a slash make a five.', set: { n: 12, group: 'fives' } },
    { say: 'Twenty-seven sheep = five bundles of five, plus two. Bundling is the seed of every number system that followed.', set: { n: 27, group: 'fives' } },
  ],
  readout: (t) => [
    ['Sheep counted', t.n],
    ['As bundles of 5', `${Math.floor(t.n / 5)} fives + ${t.n % 5}`],
    ['Natural numbers', '1, 2, 3, 4, … (no end)'],
  ],
  setup(kit) {
    const N = 30;
    const sheep = Array.from({ length: N }, (_, i) => {
      const x = -7.2 + (i % 6) * 0.85;
      const y = 3 - Math.floor(i / 6) * 1.1;
      return { x, y, d: kit.dot([x, y], { r: 0.28, color: 0xe8e8e8 }), head: kit.dot([x + 0.24, y + 0.12], { r: 0.12, color: 0x3a3a3a, z: 5 }) };
    });
    const links = Array.from({ length: N }, () => kit.line([[0, 0], [0, 0]], { color: C.blue, width: 1, opacity: 0.25, create: false }));
    const marks = Array.from({ length: N }, () => kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 4, create: false }));
    const count = kit.label('', [4.2, -3.4], { size: 30 });
    kit.label('flock', [-5.1, -3.6], { tex: false, cls: 'tick' });
    kit.label('notches on a bone', [4.2, 3.9], { tex: false, cls: 'tick' });
    const bone = kit.rect(0.6, -2.6, 7.2, 6, { color: 0xd8ccb0, opacity: 0.08, strokeColor: 0x8a7f66, width: 1.5 });
    void bone;
    let fives = 0;

    return (p, t, _time, dt) => {
      fives += ((t.group === 'fives' ? 1 : 0) - fives) * ease(dt, 4);
      const markPos = (i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = 1.1 + (g % 3) * 2.2;
        const gy = 2.3 - Math.floor(g / 3) * 2.2;
        // Loose layout: evenly spaced strokes; bundled layout: 4 strokes + slash.
        const loose = [1.1 + (i % 15) * 0.45, 2.3 - Math.floor(i / 15) * 2.2];
        if (k === 4) {
          const a = [gx - 0.15, gy - 0.6];
          const b = [gx + 0.75, gy + 0.6];
          return [
            [lerp(loose[0], a[0], fives), lerp(loose[1] - 0.6, a[1], fives)],
            [lerp(loose[0], b[0], fives), lerp(loose[1] + 0.6, b[1], fives)],
          ];
        }
        const x = lerp(loose[0], gx + k * 0.2, fives);
        const y = lerp(loose[1], gy, fives);
        return [
          [x, y - 0.6],
          [x, y + 0.6],
        ];
      };
      for (let i = 0; i < N; i++) {
        const a = clamp(p.n - i, 0, 1);
        sheep[i].d.opacity(a);
        sheep[i].head.opacity(a);
        const m = markPos(i);
        marks[i].set(m).opacity(a).visible(a > 0.01);
        const mid = [(m[0][0] + m[1][0]) / 2, (m[0][1] + m[1][1]) / 2];
        links[i].set([[sheep[i].x, sheep[i].y], mid]).opacity(0.25 * a).visible(a > 0.01);
      }
      count.set(t.group === 'fives' && t.n >= 5 ? `${t.n} = ${Math.floor(t.n / 5)}\\times 5 + ${t.n % 5}` : `${t.n}`);
    };
  },
};

// ---------------------------------------------------------------------------
// 2. Writing numbers: the same quantity in different systems and bases
// ---------------------------------------------------------------------------
function toRoman(n) {
  if (n <= 0) return '(no zero in Roman numerals)';
  const map = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of map) while (n >= v) {
    out += s;
    n -= v;
  }
  return out;
}
const toEgyptian = (n) =>
  `${'𓆼'.repeat(Math.floor(n / 1000))}${'𓍢'.repeat(Math.floor(n / 100) % 10)}${'𓎆'.repeat(Math.floor(n / 10) % 10)}${'𓏺'.repeat(n % 10)}` || '—';
const digitsIn = (n, b) => {
  if (n === 0) return [0];
  const out = [];
  while (n > 0) {
    out.unshift(n % b);
    n = Math.floor(n / b);
  }
  return out;
};
const toBabylonian = (n) =>
  digitsIn(n, 60)
    .map((d) => `${'𒌋'.repeat(Math.floor(d / 10))}${'𒁹'.repeat(d % 10)}` || '␣')
    .join('  ');

export const numeral_systems = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  params: [
    { key: 'N', label: 'The number', min: 0, max: 500, step: 1, value: 23 },
    {
      key: 'base',
      label: 'Group in bundles of',
      type: 'choice',
      value: 10,
      options: [
        { value: 10, label: '10 (Egypt, India, us)' },
        { value: 60, label: '60 (Babylon)' },
        { value: 5, label: '5 (hands)' },
        { value: 2, label: '2 (computers)' },
      ],
    },
  ],
  beats: [
    { say: 'Egypt (c. 3000 BC) drew a stroke for 1, a heel-bone for 10, a coil of rope for 100. To write 23 you draw 2 heel-bones and 3 strokes.', set: { N: 23, base: 10 } },
    { say: 'Babylon bundled in 60s, which is why an hour still has 60 minutes and a circle 360°. 75 = one sixty and fifteen ones.', set: { N: 75, base: 60 } },
    { say: 'Any bundle size works. In base 2 there are only two digits, 0 and 1, which is exactly how your computer stores 23: 10111.', set: { N: 23, base: 2 } },
  ],
  readout: (t) => [
    ['Egyptian hieroglyphs', toEgyptian(t.N)],
    ['Roman numerals', toRoman(t.N)],
    ['Babylonian (base 60)', toBabylonian(t.N)],
    [`Base ${t.base} digits`, digitsIn(t.N, t.base).join(t.base > 10 ? ' | ' : '')],
  ],
  setup(kit) {
    const MAXC = 9;
    const cols = Array.from({ length: MAXC }, () => ({
      frame: kit.rect(0, 0, 1.3, 5, { fill: false, color: C.grid, width: 1.5 }),
      digit: kit.label('', [0, 0], { size: 30 }),
      place: kit.label('', [0, 0], { size: 15 }),
      blocks: Array.from({ length: 60 }, () => kit.rect(0, 0, 0.18, 0.18, { color: C.blue, opacity: 0.85, stroke: false })),
    }));
    const eq = kit.label('', [0, 3.9], { size: 22 });
    return (_p, t) => {
      const ds = digitsIn(t.N, t.base);
      const n = ds.length;
      const W = 1.5;
      const x0 = -(n * W) / 2;
      cols.forEach((c, i) => {
        const on = i < n;
        c.frame.visible(on);
        c.digit.visible(on);
        c.place.visible(on);
        c.blocks.forEach((b) => b.visible(false));
        if (!on) return;
        const x = x0 + i * W;
        const d = ds[i];
        const power = n - 1 - i;
        c.frame.set(x, -2.6, 1.3, 5.6);
        c.digit.set(`${d}`).pos([x + 0.65, -3.3]);
        c.place.set(`${t.base}^{${power}}${power > 0 ? `=${t.base ** power}` : '=1'}`).pos([x + 0.65, 3.35]);
        const perRow = t.base === 60 ? 6 : 1;
        const size = t.base === 60 ? 0.17 : 0.46;
        for (let j = 0; j < d; j++) {
          const b = c.blocks[j];
          const col = j % perRow;
          const row = Math.floor(j / perRow);
          b.visible(true).color([C.blue, C.teal, C.green, C.yellow, C.gold, C.red, C.purple, C.pink, C.maroon][power % 9]);
          b.set(x + 0.1 + col * (size + 0.03) + (t.base === 60 ? 0 : 0.32), -2.45 + row * (size + 0.04), size, size);
        }
      });
      eq.set(`${t.N} = ${ds.map((d, i) => `${d}\\times${t.base}^{${n - 1 - i}}`).join(' + ')}`);
    };
  },
};

// ---------------------------------------------------------------------------
// 3. Zero & place value on a 3D counting frame
// ---------------------------------------------------------------------------
export const abacus_place_value = {
  camera: { kind: '3d', position: [0, 2.5, 13] },
  params: [{ key: 'N', label: 'The number', min: 0, max: 9999, step: 1, value: 205 }],
  beats: [
    { say: 'On a counting board, each rod is a place: ones, tens, hundreds, thousands. 205 means 2 hundreds, no tens, 5 ones.', set: { N: 205 } },
    { say: 'Write it without a symbol for the empty rod and 205 looks like 25. Babylonian scribes had exactly this problem for 1,500 years.', set: { N: 25 } },
    { say: 'India’s fix (Brahmagupta, 628 AD): treat the empty place as a number in its own right, 0. Fibonacci carried it to Europe in 1202.', set: { N: 1202 } },
  ],
  readout: (t) => {
    const s = String(t.N).padStart(4, '0');
    return [
      ['Thousands · Hundreds · Tens · Ones', s.split('').join(' · ')],
      ['Expanded', s.split('').map((d, i) => `${d}×${10 ** (3 - i)}`).join(' + ')],
      ['Empty places (zeros) holding position', s.replace(/^0+/, '').split('').filter((d) => d === '0').length],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const wood = 0x7a5532;
    const frameMat = new THREE.MeshStandardMaterial({ color: wood, roughness: 0.7 });
    const bar = (y) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(10, 0.35, 0.6), frameMat);
      m.position.set(0, y, 0);
      kit.group().add(m);
    };
    bar(3.3);
    bar(-3.3);
    const colors = [C.purple, C.green, C.blue, C.gold];
    const names = ['thousands', 'hundreds', 'tens', 'ones'];
    const rods = [0, 1, 2, 3].map((r) => {
      const x = -3.6 + r * 2.4;
      kit.cylinder([x, -3.3, 0], [x, 3.3, 0], 0.05, 0xb8c2cc);
      const beads = Array.from({ length: 9 }, () => {
        const m = kit.sphere([x, 0, 0], 1, colors[r], { roughness: 0.35 });
        m.scale.set(0.55, 0.28, 0.55);
        return { m, y: -3.0 };
      });
      return {
        x,
        beads,
        digit: kit.label('', [x, -4.2, 0], { size: 30 }),
        name: kit.label(names[r], [x, 3.95, 0], { tex: false, cls: 'tick' }),
      };
    });
    return (_p, t, _time, dt) => {
      const s = String(t.N).padStart(4, '0');
      const lead = s.search(/[1-9]/);
      rods.forEach((rod, r) => {
        const d = Number(s[r]);
        rod.beads.forEach((b, j) => {
          // counted beads slide to the top, the rest stay at the bottom
          const y = j < d ? 2.85 - (d - 1 - j) * 0.58 : -2.85 + (j - d) * 0.58;
          b.y += (y - b.y) * ease(dt, 6);
          b.m.position.y = b.y;
        });
        const placeholder = d === 0 && lead !== -1 && r > lead;
        rod.digit.set(placeholder ? '\\color{#ffd84a}{0}' : `${d}`).opacity(r < lead || lead === -1 ? (r === 3 ? 1 : 0.3) : 1);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// 4. Addition & subtraction with base-ten blocks: carrying and borrowing
// ---------------------------------------------------------------------------
export const base_ten_addition = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  params: [
    { key: 'a', label: 'First number', min: 0, max: 99, step: 1, value: 27 },
    { key: 'b', label: 'Second number', min: 0, max: 99, step: 1, value: 15 },
    {
      key: 'op',
      label: 'Operation',
      type: 'choice',
      value: 'add',
      options: [
        { value: 'add', label: 'Add' },
        { value: 'sub', label: 'Subtract' },
      ],
    },
    {
      key: 'step',
      label: 'Move',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Lay out' },
        { value: 1, label: 'Combine / take away' },
        { value: 2, label: 'Trade 10 ones ↔ 1 ten' },
      ],
    },
  ],
  beats: [
    { say: 'A rod is ten little squares glued together. 27 is 2 rods and 7 squares; 15 is 1 rod and 5 squares.', set: { a: 27, b: 15, op: 'add', step: 0 } },
    { say: 'Adding just means putting the piles together: 3 rods and 12 squares.', set: { a: 27, b: 15, op: 'add', step: 1 } },
    { say: '12 loose squares is too many for one place, so glue ten of them into a rod. That is "carrying the 1": 4 rods, 2 squares, 42.', set: { a: 27, b: 15, op: 'add', step: 2 } },
  ],
  readout: (t) => {
    const r = t.op === 'add' ? t.a + t.b : t.a - t.b;
    const carry = t.op === 'add' ? (t.a % 10) + (t.b % 10) >= 10 : t.a % 10 < t.b % 10;
    return [
      ['Result', t.op === 'sub' && r < 0 ? `${r} (needs negative numbers, lesson 8)` : r],
      [t.op === 'add' ? 'Carry needed?' : 'Borrow needed?', carry ? 'yes: trade a ten' : 'no'],
    ];
  },
  setup(kit) {
    const S = 0.3;
    const pool = (n, color) =>
      Array.from({ length: n }, () => ({ r: kit.rect(0, 0, S, S, { color, opacity: 0.9, strokeColor: 0x0d1117, width: 1 }), cur: null, op: 0 }));
    const rodsA = pool(10, C.blue);
    const onesA = pool(9, C.blue);
    const rodsB = pool(10, C.yellow);
    const onesB = pool(9, C.yellow);
    const loose = pool(10, C.blue); // the ten squares a borrowed rod breaks into
    const all = [...rodsA, ...onesA, ...rodsB, ...onesB, ...loose];
    const eq = kit.label('', [0, 3.9], { size: 28 });
    const note = kit.label('', [0, -3.9], { tex: false, size: 16, color: C.green });
    const bundle = kit.rect(0, 0, 0, 0, { fill: false, color: C.green, width: 3 });

    const place = (it, x, y, w, h, op, color) => {
      it.tgt = { x, y, w, h, op };
      if (color !== undefined) it.r.color(color);
    };

    return (_p, t, _time, dt) => {
      const tA = Math.floor(t.a / 10);
      const oA = t.a % 10;
      const tB = Math.floor(t.b / 10);
      const oB = t.b % 10;
      all.forEach((it) => (it.tgt = { ...(it.tgt || { x: 0, y: 0, w: S, h: S }), op: 0 }));
      bundle.visible(false);
      note.set('');
      const rodX = (i, x0) => x0 + i * (S + 0.12);
      if (t.op === 'add') {
        if (t.step === 0) {
          rodsA.forEach((it, i) => i < tA && place(it, rodX(i, -7.4), -1.5, S, 10 * S, 1));
          onesA.forEach((it, i) => i < oA && place(it, -7.4 + tA * (S + 0.12) + 0.3, -1.5 + i * S, S, S, 1));
          rodsB.forEach((it, i) => i < tB && place(it, rodX(i, 1.2), -1.5, S, 10 * S, 1));
          onesB.forEach((it, i) => i < oB && place(it, 1.2 + tB * (S + 0.12) + 0.3, -1.5 + i * S, S, S, 1));
        } else {
          const rods = [...rodsA.slice(0, tA), ...rodsB.slice(0, tB)];
          const ones = [...onesA.slice(0, oA), ...onesB.slice(0, oB)];
          const carry = t.step === 2 && ones.length >= 10;
          const nRods = rods.length + (carry ? 1 : 0);
          const x0 = -3.5;
          rods.forEach((it, i) => place(it, rodX(i, x0), -1.5, S, 10 * S, 1));
          ones.forEach((it, j) => {
            if (carry && j < 10) place(it, rodX(rods.length, x0), -1.5 + j * S, S, S, 1, C.green);
            else {
              const k = carry ? j - 10 : j;
              place(it, rodX(nRods, x0) + 0.3 + Math.floor(k / 10) * (S + 0.1), -1.5 + (k % 10) * S, S, S, 1);
              it.r.color(onesA.includes(it) ? C.blue : C.yellow);
            }
          });
          if (carry) {
            bundle.visible(true).set(rodX(rods.length, x0) - 0.06, -1.56, S + 0.12, 10 * S + 0.12);
            note.set('10 ones glued into 1 ten: carry the 1');
          } else if (t.step === 2) note.set('fewer than 10 ones: nothing to carry');
        }
        eq.set(`${t.a} + ${t.b}${t.step === 2 ? ` = ${t.a + t.b}` : ''}`);
      } else {
        const borrow = t.step >= 1 && oA < oB && tA > 0;
        const keepRods = borrow ? tA - 1 : tA;
        rodsA.forEach((it, i) => {
          if (i >= tA) return;
          const taken = t.step === 2 && i >= keepRods - tB && i < keepRods;
          if (borrow && i === tA - 1) place(it, rodX(i, -3.5), -1.5, S, 10 * S, 0);
          else place(it, rodX(i, -3.5), -1.5 + (taken ? 1.2 : 0), S, 10 * S, taken ? 0.15 : 1, taken ? C.red : C.blue);
        });
        const onesX = rodX(tA, -3.5) + 0.3;
        const onesHere = [...onesA.slice(0, oA), ...(borrow ? loose : [])];
        onesHere.forEach((it, j) => {
          const taken = t.step === 2 && j >= onesHere.length - oB;
          place(it, onesX + Math.floor(j / 10) * (S + 0.1), -1.5 + (j % 10) * S + (taken ? 1.2 : 0), S, S, taken ? 0.15 : 1, taken ? C.red : borrow && j >= oA ? C.green : C.blue);
        });
        if (borrow) note.set('not enough ones: break a ten into 10 ones (borrow)');
        else if (t.step >= 1 && oA < oB) note.set('not enough tens to borrow from');
        eq.set(`${t.a} - ${t.b}${t.step === 2 ? ` = ${t.a - t.b}` : ''}`);
      }
      const k = ease(dt, 5);
      all.forEach((it) => {
        const g = it.tgt;
        if (!it.cur) it.cur = { ...g, op: 0 };
        for (const key of ['x', 'y', 'w', 'h', 'op']) it.cur[key] += (g[key] - it.cur[key]) * k;
        it.r.set(it.cur.x, it.cur.y, it.cur.w, it.cur.h).opacity(0.9 * it.cur.op).visible(it.cur.op > 0.02);
        it.r.outline?.visible(it.cur.op > 0.3);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// 5. Multiplication as area; the distributive split
// ---------------------------------------------------------------------------
export const area_multiplication = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
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
  ],
  beats: [
    { say: '4 × 3 is 4 columns of 3, or 3 rows of 4: the same 12 squares. That is why a × b = b × a.', set: { a: 4, b: 3, split: 0 } },
    { say: 'Bigger: 13 × 12. Counting 156 squares is slow…', set: { a: 13, b: 12, split: 0 }, notes: [{ text: '156 little squares to count', at: [-6.3, 1.5], to: [-3.2, 0.5] }] },
    {
      say: '…so split each side into tens and ones. Four easy pieces: 100 + 20 + 30 + 6 = 156. Every multiplication method you learned is this picture.',
      set: { a: 13, b: 12, split: 1 },
      notes: [
        { text: 'tens × tens: the big easy block', at: [-6.2, 2.4], to: [-1.6, 0.2] },
        { text: 'ones × ones: the small corner', at: [6.2, 3.0], to: [2.75, 2.35], color: C.gold },
      ],
    },
  ],
  readout: (t) => {
    // Egyptian doubling: write a as a sum of powers of two
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
    const parts = [C.blue, C.teal, C.yellow, C.gold].map((c) => kit.rect(0, 0, 0, 0, { color: c, opacity: 0.55, strokeColor: c, width: 2 }));
    const grid = Array.from({ length: 2 * MAX }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.35, create: false }));
    const plabels = [0, 1, 2, 3].map(() => kit.label('', [0, 0], { size: 18 }));
    const aL = kit.label('', [0, 0], { size: 20, color: C.blue });
    const bL = kit.label('', [0, 0], { size: 20, color: C.blue, align: 'right' });
    const eq = kit.label('', [0, 4], { size: 26 });
    let split = 0;
    return (p, t, _time, dt) => {
      split += ((t.split ? 1 : 0) - split) * ease(dt, 4);
      const s = Math.min(12 / Math.max(p.a, 1), 6.6 / Math.max(p.b, 1), 0.9);
      const W = p.a * s;
      const H = p.b * s;
      const x0 = -W / 2;
      const y0 = -H / 2 - 0.3;
      const gap = 0.35 * split;
      const at = Math.min(10, t.a);
      const ao = t.a - at;
      const bt = Math.min(10, t.b);
      const bo = t.b - bt;
      const doSplit = split > 0.01 && t.a > 10 && t.b > 10;
      const segs = doSplit
        ? [
            [0, 0, at, bt],
            [at, 0, ao, bt],
            [0, bt, at, bo],
            [at, bt, ao, bo],
          ]
        : [[0, 0, t.a, t.b]];
      parts.forEach((r, i) => {
        const sg = segs[i];
        r.visible(!!sg && sg[2] > 0 && sg[3] > 0);
        plabels[i].visible(!!sg && doSplit && sg[2] > 0 && sg[3] > 0);
        if (!sg) return;
        const [cx, cy, w, h] = sg;
        const gx = cx > 0 ? gap : 0;
        const gy = cy > 0 ? gap : 0;
        r.set(x0 + cx * s + gx - gap / 2, y0 + cy * s + gy - gap / 2, w * s, h * s);
        plabels[i].set(`${w}\\times${h}=${w * h}`).pos([x0 + (cx + w / 2) * s + gx - gap / 2, y0 + (cy + h / 2) * s + gy - gap / 2]);
      });
      grid.forEach((l, i) => {
        if (i < MAX) {
          const c = i + 1;
          const x = x0 + c * s + (doSplit && c >= at ? gap / 2 : -gap / 2) * (doSplit ? 1 : 0);
          l.set([[x, y0 - (doSplit ? gap / 2 : 0)], [x, y0 + H + (doSplit ? gap / 2 : 0)]]).visible(c < t.a && s > 0.25 && !(doSplit && c === at));
        } else {
          const r = i - MAX + 1;
          const y = y0 + r * s + (doSplit && r >= bt ? gap / 2 : -gap / 2) * (doSplit ? 1 : 0);
          l.set([[x0 - (doSplit ? gap / 2 : 0), y], [x0 + W + (doSplit ? gap / 2 : 0), y]]).visible(r < t.b && s > 0.25 && !(doSplit && r === bt));
        }
      });
      aL.set(`a = ${t.a}`).pos([0, y0 - 0.5]);
      bL.set(`b = ${t.b}`).pos([x0 - 0.3, y0 + H / 2]);
      eq.set(
        doSplit
          ? `(${at} + ${ao})(${bt} + ${bo}) = ${at * bt} + ${ao * bt} + ${at * bo} + ${ao * bo} = ${t.a * t.b}`
          : `${t.a} \\times ${t.b} = ${t.a * t.b}`
      );
    };
  },
};

// ---------------------------------------------------------------------------
// 6. Primes: the sieve of Eratosthenes
// ---------------------------------------------------------------------------
const SIEVE = [2, 3, 5, 7];
const factorize = (n) => {
  const out = [];
  for (let p = 2; p * p <= n; p++) while (n % p === 0) {
    out.push(p);
    n /= p;
  }
  if (n > 1) out.push(n);
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
  ],
  beats: [
    { say: 'Eratosthenes (c. 240 BC): write out the numbers, then cross out every multiple of 2 except 2 itself.', set: { stage: 1, n: 60 } },
    { say: 'Then multiples of 3, then 5. Each pass removes numbers that are built from smaller ones.', set: { stage: 3, n: 60 } },
    { say: 'After 7, everything left is prime: it cannot be split. Euclid proved there are infinitely many, and every number is built from them in exactly one way: 60 = 2·2·3·5.', set: { stage: 4, n: 60 } },
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
    const x0 = -3.9;
    const y0 = 3.6;
    const cells = Array.from({ length: 100 }, (_, i) => {
      const v = i + 1;
      const x = x0 + (i % 10) * cell;
      const y = y0 - Math.floor(i / 10) * cell;
      return {
        v,
        bg: kit.rect(x - cell / 2, y - cell / 2, cell - 0.05, cell - 0.05, { color: C.blue, opacity: 0.15, stroke: false }),
        l: kit.label(`${v}`, [x - 0.025, y - 0.025], { tex: false, size: 13 }),
        fade: 0,
      };
    });
    const ring = kit.rect(0, 0, cell - 0.05, cell - 0.05, { fill: false, color: C.white, width: 3 });
    const colors = { 2: C.red, 3: C.green, 5: C.purple, 7: C.gold };
    const tree = kit.label('', [-6.3, 0], { size: 22 });
    return (_p, t, _time, dt) => {
      const active = SIEVE.slice(0, t.stage);
      cells.forEach((c) => {
        const by = active.find((p) => c.v !== p && c.v % p === 0);
        const isOne = c.v === 1;
        const gone = !!by || (isOne && t.stage > 0);
        c.fade += ((gone ? 1 : 0) - c.fade) * ease(dt, 4);
        const prime = t.stage === 4 && !gone;
        c.bg.color(prime ? C.yellow : by ? colors[by] : C.blue).opacity(prime ? 0.55 : gone ? 0.25 * (1 - c.fade) + 0.06 : 0.15);
        c.l.opacity(1 - 0.75 * c.fade).color(prime ? '#1a1400' : '');
      });
      const i = t.n - 1;
      ring.set(x0 + (i % 10) * cell - cell / 2, y0 - Math.floor(i / 10) * cell - cell / 2, cell - 0.05, cell - 0.05);
      tree.set(`${t.n} = ${factorize(t.n).join(' \\cdot ')}`);
    };
  },
};

// ---------------------------------------------------------------------------
// 9. Decimals: zooming into the number line by powers of ten
// ---------------------------------------------------------------------------
export const decimal_zoom = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  params: [
    { key: 'x', label: 'The number', min: 0, max: 0.999, step: 0.001, value: 0.375 },
    { key: 'depth', label: 'Zoom levels', min: 0, max: 3, step: 1, value: 1 },
  ],
  beats: [
    { say: 'Simon Stevin (1585): split the gap from 0 to 1 into ten equal tenths. 0.375 sits between 3 and 4 tenths.', set: { x: 0.375, depth: 1 } },
    { say: 'Zoom into that tenth and split it into ten hundredths. Now we see 0.37…', set: { x: 0.375, depth: 2 } },
    { say: '…and once more: thousandths. 0.375 = 3 tenths + 7 hundredths + 5 thousandths, which is exactly 3/8.', set: { x: 0.375, depth: 3 } },
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
        hi: kit.rect(0, 0, 0, 0.36, { color: C.yellow, opacity: 0.25, stroke: false }),
        dot: kit.dot([0, y], { r: 0.11, color: C.red, z: 6 }),
        zoomL: kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 1, opacity: 0.4, dashed: true, create: false }),
        zoomR: kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 1, opacity: 0.4, dashed: true, create: false }),
      };
    });
    return (p, t) => {
      rows.forEach((r) => {
        const a = clamp(p.depth - r.k + 1, 0, 1);
        const scale = 10 ** r.k;
        const lo = Math.floor(t.x * scale + 1e-9) / scale;
        const W = 14;
        const toX = (v) => -7 + ((v - lo) / (1 / scale)) * W;
        r.axis.opacity(a).visible(a > 0.01);
        r.ticks.forEach((tk, i) => tk.set([[-7 + (i * W) / 10, r.y - (i % 10 === 0 ? 0.25 : 0.15)], [-7 + (i * W) / 10, r.y + (i % 10 === 0 ? 0.25 : 0.15)]]).opacity(a).visible(a > 0.01));
        r.labels.forEach((lb, i) => {
          const v = lo + i / (10 * scale);
          lb.set(v.toFixed(r.k + 1).replace(/0+$/, '').replace(/\.$/, '') || '0').pos([-7 + (i * W) / 10, r.y - 0.42]).opacity(a).visible(a > 0.01 && (r.k < 2 || i % 2 === 0));
        });
        const sub = Math.floor(t.x * scale * 10 + 1e-9) / (scale * 10);
        const hx0 = toX(sub);
        const hx1 = toX(sub + 1 / (scale * 10));
        const zoom = r.k < 3 && p.depth > r.k + 0.01;
        r.hi.set(hx0, r.y - 0.18, hx1 - hx0, 0.36).opacity(0.3 * a).visible(a > 0.01 && r.k < 3);
        r.zoomL.set([[hx0, r.y - 0.2], [-7, r.y - 1.85]]).visible(zoom);
        r.zoomR.set([[hx1, r.y - 0.2], [7, r.y - 1.85]]).visible(zoom);
        r.dot.set([toX(p.x), r.y]).opacity(a).visible(a > 0.01);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// 10. Irrational numbers: √2 slips between every fraction
// ---------------------------------------------------------------------------
export const irrational_sqrt2 = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.6] },
  params: [
    {
      key: 'step',
      label: 'Show',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Unit square' },
        { value: 1, label: 'Its diagonal' },
        { value: 2, label: 'Swing it onto the line' },
      ],
    },
    { key: 'Q', label: 'Fractions with bottom up to', min: 1, max: 40, step: 1, value: 4 },
  ],
  beats: [
    { say: 'A square with sides of length 1. Pythagoras says its diagonal d obeys d² = 1² + 1² = 2.', set: { step: 1, Q: 2 } },
    { say: 'Swing the diagonal down onto the number line. It lands at a real, definite point: √2 ≈ 1.41421…', set: { step: 2, Q: 2 } },
    { say: 'Now mark every fraction p/q with q up to 40. They crowd in from both sides, yet none ever lands exactly on √2. Hippasus’s discovery that it can’t be a fraction reportedly scandalised the Pythagoreans.', set: { step: 2, Q: 40 } },
  ],
  readout: (t) => {
    let best = [1, 1];
    let err = Infinity;
    for (let q = 1; q <= t.Q; q++) {
      const p = Math.round(Math.SQRT2 * q);
      const e = Math.abs(p / q - Math.SQRT2);
      if (e < err) {
        err = e;
        best = [p, q];
      }
    }
    return [
      ['√2', '1.41421356237…'],
      ['Closest fraction so far', `${best[0]}/${best[1]} = ${(best[0] / best[1]).toFixed(6)}`],
      ['Still off by', err.toExponential(2)],
    ];
  },
  setup(kit) {
    const U = 4;
    const O = [-6, -2.2];
    const X = (v) => O[0] + v * U;
    kit.line([[X(-0.1), O[1]], [X(2.9), O[1]]], { color: C.axis, width: 2 });
    [0, 1, 2].forEach((v) => {
      kit.line([[X(v), O[1] - 0.2], [X(v), O[1] + 0.2]], { color: C.axis, width: 2 });
      kit.label(`${v}`, [X(v), O[1] - 0.5], { tex: false, cls: 'tick' });
    });
    const sq = kit.rect(O[0], O[1], U, U, { color: C.blue, opacity: 0.15, strokeColor: C.blue, width: 3 });
    void sq;
    const diag = kit.line([O, [O[0] + U, O[1] + U]], { color: C.yellow, width: 4, create: false });
    const arc = kit.line([O, O], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const tip = kit.dot(O, { r: 0.12, color: C.yellow, z: 6 });
    const dL = kit.label('d = \\sqrt{2}', [0, 0], { color: C.yellow, size: 20 });
    const ticks = Array.from({ length: 900 }, () => kit.line([[0, 0], [0, 0]], { color: C.green, width: 1, opacity: 0.6, create: false }));
    const eq = kit.label('d^2 = 1^2 + 1^2 = 2', [1.6, 3.6], { size: 26 });
    let swing = 0;
    let show = 0;
    return (p, t, _time, dt) => {
      show += ((t.step >= 1 ? 1 : 0) - show) * ease(dt, 4);
      swing += ((t.step >= 2 ? 1 : 0) - swing) * ease(dt, 2.5);
      const ang = (Math.PI / 4) * (1 - smooth(swing));
      const L = U * Math.SQRT2;
      const end = [O[0] + L * Math.cos(ang), O[1] + L * Math.sin(ang)];
      diag.set([O, end]).opacity(show).visible(show > 0.01);
      tip.set(end).opacity(show).visible(show > 0.01);
      const arcPts = range(ang, Math.PI / 4, 30).map((a) => [O[0] + L * Math.cos(a), O[1] + L * Math.sin(a)]);
      arc.set(arcPts).visible(swing > 0.02);
      dL.pos([end[0] + (swing > 0.5 ? 0 : 0.6), end[1] + 0.45]).opacity(show);
      eq.opacity(show);
      let k = 0;
      for (let q = 1; q <= t.Q; q++) {
        for (let pn = 0; pn <= 2 * q; pn++) {
          if (k >= ticks.length) break;
          const g = (a, b) => (b ? g(b, a % b) : a);
          if (g(pn, q) !== 1) continue;
          const v = pn / q;
          const h = 0.5 / Math.sqrt(q);
          ticks[k++].set([[X(v), O[1]], [X(v), O[1] + h]]).visible(swing > 0.5);
        }
      }
      for (; k < ticks.length; k++) ticks[k].visible(false);
      void p;
    };
  },
};

// ---------------------------------------------------------------------------
// 12. Pythagoras: squares on the sides
// ---------------------------------------------------------------------------
export const pythagoras_squares = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  params: [
    { key: 'a', label: 'Leg a', min: 1, max: 12, step: 1, value: 3 },
    { key: 'b', label: 'Leg b', min: 1, max: 12, step: 1, value: 4 },
  ],
  beats: [
    { say: 'A right triangle with legs 3 and 4. Build a square on each side and count the unit squares inside.', set: { a: 3, b: 4 } },
    { say: '9 + 16 = 25: the two small squares exactly fill the big one. Babylonian tablet Plimpton 322 lists triples like this around 1800 BC; Euclid proved it always works.', set: { a: 3, b: 4 } },
    { say: 'Legs 1 and 1 give c² = 2. This is the triangle that broke the Greeks’ belief that every length is a fraction.', set: { a: 1, b: 1 } },
  ],
  readout: (t) => {
    const c2 = t.a * t.a + t.b * t.b;
    const c = Math.sqrt(c2);
    return [
      ['a² + b²', `${t.a * t.a} + ${t.b * t.b} = ${c2}`],
      ['c = √(a² + b²)', Number.isInteger(c) ? `${c} (whole: a Pythagorean triple)` : `≈ ${c.toFixed(4)}`],
    ];
  },
  setup(kit) {
    const sqA = kit.fill([[0, 0], [1, 0], [1, 1]], { color: C.blue, opacity: 0.35 });
    const sqB = kit.fill([[0, 0], [1, 0], [1, 1]], { color: C.green, opacity: 0.35 });
    const sqC = kit.fill([[0, 0], [1, 0], [1, 1]], { color: C.yellow, opacity: 0.3 });
    const tri = kit.fill([[0, 0], [1, 0], [1, 1]], { color: C.white, opacity: 0.18 });
    const edges = [C.blue, C.green, C.yellow].map((c) => kit.line([[0, 0], [1, 1]], { color: c, width: 3, create: false }));
    const gridLines = Array.from({ length: 80 }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.25, create: false }));
    const lA = kit.label('', [0, 0], { size: 20, color: C.blue });
    const lB = kit.label('', [0, 0], { size: 20, color: C.green });
    const lC = kit.label('', [0, 0], { size: 20, color: C.yellow });
    return (p) => {
      const a = p.a;
      const b = p.b;
      const s = Math.min(15 / (a + 2 * b), 8.4 / (2 * a + b));
      const cx = ((a + b) / 2 - b) * s;
      const cy = ((b + a) / 2 - a) * s;
      const W = (x, y) => [x * s - cx - 0.0, y * s - cy];
      const O = W(0, 0);
      const A = W(a, 0);
      const B = W(0, b);
      tri.set([O, A, B]);
      sqA.set([O, A, W(a, -a), W(0, -a)]);
      sqB.set([O, W(-b, 0), W(-b, b), B]);
      const A2 = W(a + b, a);
      const B2 = W(b, b + a);
      sqC.set([A, A2, B2, B]);
      edges[0].set([O, A, W(a, -a), W(0, -a), O]);
      edges[1].set([O, W(-b, 0), W(-b, b), B, O]);
      edges[2].set([A, A2, B2, B, A]);
      let k = 0;
      const drawGrid = (P0, u, v, n) => {
        for (let i = 1; i < n; i++) {
          if (k + 2 > gridLines.length) return;
          const f = i / n;
          gridLines[k++].set([[P0[0] + u[0] * f, P0[1] + u[1] * f], [P0[0] + u[0] * f + v[0], P0[1] + u[1] * f + v[1]]]).visible(true);
          gridLines[k++].set([[P0[0] + v[0] * f, P0[1] + v[1] * f], [P0[0] + v[0] * f + u[0], P0[1] + v[1] * f + u[1]]]).visible(true);
        }
      };
      const ra = Math.round(a);
      const rb = Math.round(b);
      if (ra <= 12) drawGrid(O, [A[0] - O[0], 0], [0, -a * s], ra);
      if (rb <= 12) drawGrid(O, [-b * s, 0], [0, b * s], rb);
      const c = Math.sqrt(a * a + b * b);
      if (Number.isInteger(Math.round(c * 1000) / 1000) && c <= 15) drawGrid(A, [A2[0] - A[0], A2[1] - A[1]], [B[0] - A[0], B[1] - A[1]], Math.round(c));
      for (; k < gridLines.length; k++) gridLines[k].visible(false);
      lA.set(`a^2 = ${n2(a * a)}`).pos(W(a / 2, -a / 2));
      lB.set(`b^2 = ${n2(b * b)}`).pos(W(-b / 2, b / 2));
      lC.set(`c^2 = ${n2(a * a + b * b)}`).pos([(A[0] + B2[0]) / 2, (A[1] + B2[1]) / 2]);
    };
  },
};

// ---------------------------------------------------------------------------
// 15. Trigonometry: the unit circle unrolls into a sine wave
// ---------------------------------------------------------------------------
export const trig_unit_circle = {
  camera: { kind: '2d', x: [-8, 8], y: [-4, 4.4] },
  params: [{ key: 'theta', label: 'Angle θ (degrees)', min: 0, max: 360, step: 1, value: 30 }],
  beats: [
    { say: 'Walk around a circle of radius 1. At angle θ, your height is sin θ and your sideways distance is cos θ. At 30°, the height is exactly ½.', set: { theta: 30 } },
    { say: 'At 90° you are at the top: sin = 1, cos = 0. Hipparchus tabulated these (as chords) around 140 BC to predict eclipses.', set: { theta: 90 } },
    { say: 'Keep going and record your height: the circle unrolls into the sine wave, the shape of every vibration, sound and alternating current.', set: { theta: 330 } },
  ],
  readout: (t) => {
    const r = (t.theta * Math.PI) / 180;
    return [
      ['sin θ (height)', n2(Math.sin(r))],
      ['cos θ (sideways)', n2(Math.cos(r))],
      ['sin² + cos²', '1 (Pythagoras, always)'],
      ['In radians', `${n2(r)} rad`],
    ];
  },
  setup(kit) {
    const R = 2.4;
    const Cc = [-4.6, 0];
    kit.line(range(0, Math.PI * 2, 120).map((a) => [Cc[0] + R * Math.cos(a), Cc[1] + R * Math.sin(a)]), { color: C.blue, width: 3 });
    kit.line([[Cc[0] - R - 0.4, 0], [Cc[0] + R + 0.4, 0]], { color: C.axis, width: 1.5 });
    kit.line([[Cc[0], -R - 0.4], [Cc[0], R + 0.4]], { color: C.axis, width: 1.5 });
    const WX = -1;
    const WW = 8.4;
    kit.line([[WX, 0], [WX + WW, 0]], { color: C.axis, width: 1.5 });
    [90, 180, 270, 360].forEach((d) => kit.label(`${d}°`, [WX + (d / 360) * WW, -0.4], { tex: false, cls: 'tick' }));
    const wave = kit.line([[WX, 0], [WX, 0]], { color: C.red, width: 3, create: false });
    const ghost = kit.curve((x) => R * Math.sin(((x - WX) / WW) * Math.PI * 2), [WX, WX + WW], { color: C.red, width: 1, opacity: 0.2 });
    void ghost;
    const radius = kit.line([Cc, Cc], { color: C.white, width: 2, create: false });
    const cosL = kit.line([Cc, Cc], { color: C.green, width: 4, create: false });
    const sinL = kit.line([Cc, Cc], { color: C.red, width: 4, create: false });
    const P = kit.dot(Cc, { r: 0.12, color: C.yellow, z: 6 });
    const W = kit.dot([WX, 0], { r: 0.12, color: C.yellow, z: 6 });
    const link = kit.line([Cc, Cc], { color: C.yellow, width: 1, dashed: true, opacity: 0.6, create: false });
    const arc = kit.line([Cc, Cc], { color: C.yellow, width: 2, create: false });
    const thL = kit.label('\\theta', [0, 0], { color: C.yellow, size: 18 });
    return (p) => {
      const r = (p.theta * Math.PI) / 180;
      const pt = [Cc[0] + R * Math.cos(r), Cc[1] + R * Math.sin(r)];
      radius.set([Cc, pt]);
      cosL.set([Cc, [pt[0], Cc[1]]]);
      sinL.set([[pt[0], Cc[1]], pt]);
      P.set(pt);
      const wx = WX + (p.theta / 360) * WW;
      W.set([wx, R * Math.sin(r)]);
      link.set([pt, [wx, R * Math.sin(r)]]);
      wave.set(range(0, Math.max(r, 0.001), Math.max(2, Math.round(p.theta / 3))).map((a) => [WX + (a / (2 * Math.PI)) * WW, R * Math.sin(a)]));
      arc.set(range(0, Math.max(r, 0.001), 40).map((a) => [Cc[0] + 0.55 * Math.cos(a), Cc[1] + 0.55 * Math.sin(a)]));
      thL.pos([Cc[0] + 0.85 * Math.cos(r / 2), Cc[1] + 0.85 * Math.sin(r / 2)]);
    };
  },
};

// ---------------------------------------------------------------------------
// 17. Complex numbers: multiplying by i is a quarter turn
// ---------------------------------------------------------------------------
const MULTS = {
  neg: { re: -1, im: 0, tex: '-1' },
  i: { re: 0, im: 1, tex: 'i' },
  onePlusI: { re: 1, im: 1, tex: '(1+i)' },
  one: { re: 1, im: 0, tex: '1' },
};

export const complex_plane = {
  camera: { kind: '2d', x: [-7.5, 7.5], y: [-4.4, 4.4] },
  params: [
    { key: 'a', label: 'Real part a', min: -3, max: 3, step: 0.5, value: 2 },
    { key: 'b', label: 'Imaginary part b', min: -3, max: 3, step: 0.5, value: 1 },
    {
      key: 'm',
      label: 'Multiply by',
      type: 'choice',
      value: 'one',
      options: [
        { value: 'one', label: '1' },
        { value: 'neg', label: '−1' },
        { value: 'i', label: 'i' },
        { value: 'onePlusI', label: '1 + i' },
      ],
    },
  ],
  beats: [
    { say: 'Remember: multiplying by −1 turns an arrow 180°. Is there a number that turns it only halfway, 90°? Doing it twice would give −1…', set: { a: 2, b: 0, m: 'neg' } },
    { say: '…that number is i, with i² = −1. Bombelli (1572) needed it to solve cubic equations that had perfectly real answers. Here 2 × i = 2i: a quarter turn up.', set: { a: 2, b: 0, m: 'i' } },
    { say: 'Every complex number is a turn plus a stretch. (2 + i)(1 + i) rotates by 45° and stretches by √2. Engineers use exactly this for AC circuits and waves.', set: { a: 2, b: 1, m: 'onePlusI' } },
  ],
  readout: (t) => {
    const M = MULTS[t.m];
    const re = t.a * M.re - t.b * M.im;
    const im = t.a * M.im + t.b * M.re;
    return [
      ['z', `${t.a} + ${t.b}i`],
      ['z × ' + M.tex.replace(/[()]/g, ''), `${n2(re)} + ${n2(im)}i`],
      ['Turn by', `${Math.round((Math.atan2(M.im, M.re) * 180) / Math.PI)}°`],
      ['Stretch by', n2(Math.hypot(M.re, M.im))],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [-7, 7, 1], y: [-4, 4, 1], xLabel: '\\text{real}', yLabel: '\\text{imaginary}' });
    void P;
    const z = kit.arrow([0, 0], [1, 0], { color: C.blue, width: 4 });
    const w = kit.arrow([0, 0], [1, 0], { color: C.yellow, width: 4 });
    const arc = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const zL = kit.label('', [0, 0], { color: C.blue, size: 18 });
    const wL = kit.label('', [0, 0], { color: C.yellow, size: 18 });
    let ang = 0;
    let len = 1;
    return (p, t, _time, dt) => {
      const M = MULTS[t.m];
      const za = Math.atan2(p.b, p.a);
      const zr = Math.hypot(p.a, p.b);
      let ma = Math.atan2(M.im, M.re);
      if (ma < 0) ma += Math.PI * 2;
      ang += (ma - ang) * ease(dt, 3);
      len += (Math.hypot(M.re, M.im) - len) * ease(dt, 3);
      z.set([0, 0], [p.a, p.b]);
      const wa = za + ang;
      const wr = zr * len;
      const tip = [wr * Math.cos(wa), wr * Math.sin(wa)];
      w.set([0, 0], tip).visible(t.m !== 'one' || Math.abs(ang) > 0.01);
      arc.set(range(za, wa, 40).map((a) => [Math.min(zr, wr) * 0.45 * Math.cos(a), Math.min(zr, wr) * 0.45 * Math.sin(a)])).visible(Math.abs(ang) > 0.02 && zr > 0.1);
      zL.set(`z = ${poly([[t.a, ''], [t.b, 'i']])}`).pos([p.a * 1.12 + 0.3, p.b * 1.12 + 0.3]);
      const re = t.a * M.re - t.b * M.im;
      const im = t.a * M.im + t.b * M.re;
      wL.set(`${M.tex} \\cdot z = ${poly([[re, ''], [im, 'i']])}`).pos([tip[0] * 1.1 + 0.3, tip[1] * 1.1 + 0.35]).visible(t.m !== 'one');
    };
  },
};
