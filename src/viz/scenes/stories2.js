// Story versions, batch 2: weeks 1–2 of the timetable.
// Same rules as stories1.js: one idea per step, slow enough to follow,
// labels on the picture. New here: steps can move the camera (`cam`) to
// point the eye, the way a narrator would.
import { C } from '../theme';
import { clamp, lerp } from '../kit';
import * as origins from './origins';
import * as matter from './matter';

const ease = (dt, rate = 3) => 1 - Math.exp(-dt * rate);

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
// NUM 01. One notch for every sheep
// ---------------------------------------------------------------------------
function sheepAt(kit, x, y) {
  const g = kit.group();
  g.position.set(x, y, 0);
  const wool = [
    [-0.16, 0.02, 0.2],
    [0.05, 0.09, 0.22],
    [0.2, 0, 0.19],
    [-0.02, -0.1, 0.2],
    [0.17, -0.12, 0.16],
  ].map(([dx, dy, r]) => kit.dot([dx, dy], { r, color: 0xeeeae2, parent: g, z: 4 }));
  const legs = [-0.14, 0.14].map((dx) => kit.line([[dx, -0.18], [dx, -0.4]], { color: 0x3a3a3a, width: 3, parent: g, create: false }));
  const head = kit.dot([0.37, 0.08], { r: 0.13, color: 0x6a625a, parent: g, z: 5 });
  const parts = [...wool, ...legs, head];
  return {
    g,
    x,
    y,
    opacity(a) {
      parts.forEach((p) => p.opacity(a));
      g.visible = a > 0.01;
    },
  };
}

export const tally_counting = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.4] },
  ease: 2.4,
  params: [
    { key: 'n', label: 'How many sheep', min: 0, max: 30, step: 1, value: 7 },
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
    { key: 'carve', hidden: true, value: 0 },
    { key: 'link', hidden: true, value: 0 },
    { key: 'miss', hidden: true, value: 0 },
    { key: 'sum', hidden: true, value: 0 },
  ],
  free: { carve: 99, link: 1, miss: 0, sum: 1 },
  beats: [
    {
      say: 'Long before anyone had words for numbers, a shepherd let seven sheep out to graze. How could she be sure they all came home?',
      set: { n: 7, group: 'ones', carve: 0, link: 0, miss: 0, sum: 0 },
      ms: 8000,
    },
    {
      say: 'As each sheep walks out, she cuts one notch in a bone. One sheep, one notch.',
      set: { carve: 7, link: 1 },
      ms: 9000,
      notes: [{ text: 'one sheep ↔ one notch', at: [-2.4, -2.6], to: [1.4, 0.9] }],
    },
    {
      say: 'In the evening she matches again, sheep to notch. One notch has no sheep. One is missing, and she knows it without ever counting.',
      set: { miss: 1 },
      ms: 10000,
      notes: [{ text: 'a notch with no partner', at: [4.6, -2.6], to: [3.2, 0.7], color: C.red }],
    },
    {
      say: 'Matching things one-to-one is the oldest idea in mathematics. The Lebombo bone, about 43,000 years old, carries 29 notches like these.',
      set: { miss: 0, n: 29, carve: 29 },
      ms: 10000,
    },
    {
      say: 'But 29 loose strokes are hard to read. Quick: how many are there? You can’t tell at a glance.',
      set: { link: 0 },
      cam: { x: [-0.3, 7.9], y: [-2.6, 3.4] },
      ms: 7500,
    },
    {
      say: 'So people bundled them: four strokes and a slash across make one five.',
      set: { group: 'fives' },
      ms: 8000,
      notes: [{ text: 'four strokes + a slash = 5', at: [2.6, -1.9], to: [1.6, 1.0] }],
    },
    {
      say: 'Now it reads at a glance: five fives and four more, 29. The Ishango bone, about 20,000 years old, already groups its notches. Bundling is the seed of every number system that followed.',
      set: { sum: 1 },
      cam: null,
      ms: 12000,
    },
  ],
  readout: (t) => [
    ['Sheep counted', t.n],
    ['As bundles of 5', `${Math.floor(t.n / 5)} fives + ${t.n % 5}`],
    ['Natural numbers', '1, 2, 3, 4, … (no end)'],
  ],
  setup(kit) {
    const N = 30;
    const sheep = Array.from({ length: N }, (_, i) => sheepAt(kit, -7.2 + (i % 6) * 0.98, 3.0 - Math.floor(i / 6) * 1.15));
    // the bone: a long pale shaft with knobbly ends
    const boneCol = 0xd9cba3;
    kit.rect(0.6, -1.15, 6.4, 3.6, { color: boneCol, opacity: 0.16, strokeColor: 0x8a7f66, width: 1.5 });
    [[0.6, 2.45], [0.6, -1.15], [7.0, 2.45], [7.0, -1.15]].forEach((q) => kit.dot(q, { r: 0.45, color: boneCol, opacity: 0.16, z: 0 }));
    kit.label('a counting bone', [3.8, 3.05], { tex: false, cls: 'tick' });
    const links = Array.from({ length: N }, () => kit.line([[0, 0], [0, 0]], { color: C.blue, width: 1.5, opacity: 0.4, create: false }));
    const marks = Array.from({ length: N }, () => kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 4, create: false }));
    const ring = kit.dot([0, 0], { r: 0.5, color: C.red, opacity: 0.25, z: 1 });
    const count = kit.label('', [3.8, -2.3], { size: 30 });
    let fives = 0;
    let miss = 0;
    let sum = 0;
    let shownCarve = 0;
    return (p, t, time, dt) => {
      fives += ((t.group === 'fives' ? 1 : 0) - fives) * ease(dt, 2);
      miss += (t.miss - miss) * ease(dt, 2.5);
      sum += (t.sum - sum) * ease(dt, 2.5);
      // notches are cut one after another, about three a second
      const want = Math.min(t.carve, t.n);
      shownCarve = want > shownCarve ? Math.min(want, shownCarve + dt * 2.6) : want;
      const lost = 5; // the sheep that does not come home
      const markPos = (i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = 1.25 + (g % 3) * 2.1;
        const gy = 1.6 - Math.floor(g / 3) * 1.9;
        const loose = [0.95 + (i % 15) * 0.4, 1.6 - Math.floor(i / 15) * 1.9];
        if (k === 4) {
          const a = [gx - 0.18, gy - 0.5];
          const b = [gx + 0.78, gy + 0.5];
          return [
            [lerp(loose[0], a[0], fives), lerp(loose[1] - 0.5, a[1], fives)],
            [lerp(loose[0], b[0], fives), lerp(loose[1] + 0.5, b[1], fives)],
          ];
        }
        const x = lerp(loose[0], gx + k * 0.2, fives);
        const y = lerp(loose[1], gy, fives);
        return [
          [x, y - 0.5],
          [x, y + 0.5],
        ];
      };
      for (let i = 0; i < N; i++) {
        const has = clamp(p.n - i, 0, 1);
        const gone = i === lost ? miss : 0;
        // a missing sheep slips away to the left
        sheep[i].g.position.x = sheep[i].x - gone * 1.6;
        sheep[i].g.position.y = sheep[i].y + Math.sin(time * 2 + i) * 0.02;
        sheep[i].opacity(has * (1 - gone));
        const cut = clamp(shownCarve - i, 0, 1);
        const m = markPos(i);
        marks[i].set(m).opacity(cut).visible(cut > 0.01);
        marks[i].color(i === lost && miss > 0.3 ? C.red : C.yellow);
        const mid = [(m[0][0] + m[1][0]) / 2, (m[0][1] + m[1][1]) / 2];
        const la = p.link * cut * (1 - gone);
        links[i].set([[sheep[i].g.position.x + 0.2, sheep[i].y], mid]).opacity(0.45 * la).visible(la > 0.01);
        if (i === lost) {
          ring.set([mid[0], mid[1], 0.01]).scale(0.85 + 0.15 * Math.sin(time * 4));
          show(ring, miss * cut, 0.3);
        }
      }
      const c = Math.round(Math.min(t.carve, t.n));
      count.set(t.group === 'fives' && c >= 5 && sum > 0.5 ? `${c} = ${Math.floor(c / 5)}\\times 5 + ${c % 5}` : t.group === 'fives' && c >= 5 ? `${Math.floor(c / 5)}\\ \\text{fives} + ${c % 5}` : '');
      show(count, t.group === 'fives' ? 1 : 0);
    };
  },
};

// ---------------------------------------------------------------------------
// CHEM 00. Splitting water with electricity
// ---------------------------------------------------------------------------
export const electrolysis_water = {
  ...matter.electrolysis_water,
  ease: 1.6,
  beats: [
    {
      say: 'For about 2,000 years, water was thought to be an element: one of four, with earth, air and fire. Is it really one simple thing?',
      set: { minutes: 0, amps: 0 },
      ms: 8500,
      notes: [{ text: 'just water… or is it?', at: [5.2, 0.8], to: [1.2, -1.4] }],
    },
    {
      say: 'Two upside-down tubes full of water, each over a metal wire. Join the wires to a battery and switch on.',
      set: { amps: 1.5, minutes: 0.4 },
      ms: 8000,
      notes: [
        { text: 'wire to − of the battery', at: [-6.6, -3.4], to: [-3.8, -3.3] },
        { text: 'wire to +', at: [3.8, -3.4], to: [0.8, -3.3], color: C.red },
      ],
    },
    {
      say: 'Bubbles stream off both wires. Gas rises and collects at the top of each tube, pushing the water down.',
      set: { minutes: 3 },
      ms: 9000,
    },
    {
      say: 'Leave it running and compare the two tubes.',
      set: { minutes: 10 },
      ms: 9000,
    },
    {
      say: 'Every time, the tube over the − wire holds twice as much gas as the other. The left gas burns with a pop: hydrogen. The right one makes a glowing splint flare: oxygen.',
      set: {},
      ms: 11000,
      notes: [
        { text: 'hydrogen: 2 parts', at: [-6.0, 1.0], to: [-3.6, 2.0] },
        { text: 'oxygen: 1 part', at: [3.2, 0.7], to: [0.6, 3.0], color: C.red },
      ],
    },
    {
      say: 'So water is not an element. It is a compound: hydrogen and oxygen joined in a fixed 2 to 1 ratio, H₂O. Nicholson and Carlisle first split it with electricity like this in 1800.',
      set: {},
      ms: 11000,
      notes: [{ text: 'water = H₂O', at: [5.3, 1.9], to: [5.3, 3.0] }],
    },
    {
      say: 'And nothing is lost. Lavoisier showed that the mass of the gases equals the mass of the water used up. Matter is only rearranged, never created or destroyed.',
      set: {},
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// NUM 02. Bundles of ten, sixty, five and two
// ---------------------------------------------------------------------------
export const numeral_systems = {
  ...origins.numeral_systems,
  ease: 2.4,
  beats: [
    {
      say: 'Tally marks get slow for big numbers. So people wrote bundles instead. Egypt, around 3000 BC: a stroke for 1, a heel-bone for 10, a coil of rope for 100.',
      set: { N: 23, base: 10 },
      ms: 10000,
    },
    {
      say: 'Each column holds one bundle size. 23 is 2 bundles of ten and 3 ones.',
      set: {},
      ms: 7500,
      notes: [
        { text: 'tens: 2 bundles of ten', at: [-5.0, 0.6], to: [-1.0, -1.4] },
        { text: 'ones: 3', at: [4.2, 0.4], to: [0.8, -1.2], color: C.gold },
      ],
    },
    {
      say: 'A bigger one: 365 days is 3 hundreds, 6 tens and 5 ones. A new column appears for each bigger bundle.',
      set: { N: 365 },
      ms: 9000,
      notes: [{ text: 'a new column: hundreds', at: [-5.6, 1.8], to: [-1.7, 0] }],
    },
    {
      say: 'Babylon, around 2000 BC, bundled in sixties instead. 75 is one sixty and 15 ones.',
      set: { N: 75, base: 60 },
      ms: 8500,
    },
    {
      say: 'That is why an hour still has 60 minutes and a circle 360 degrees. In sixties, 365 is 6 sixties and 5.',
      set: { N: 365 },
      ms: 9000,
    },
    {
      say: 'Bundle by the fingers of one hand and you get base 5: 23 is 4 fives and 3.',
      set: { N: 23, base: 5 },
      ms: 8000,
    },
    {
      say: 'Base 2 has only two digits, 0 and 1. 23 becomes 10111: one 16, no 8, one 4, one 2, one 1. That is how a computer stores it.',
      set: { base: 2 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// NUM 03. The counting board and the empty rod
// ---------------------------------------------------------------------------
export const abacus_place_value = {
  ...origins.abacus_place_value,
  ease: 2.4,
  beats: [
    {
      say: 'A counting board: four rods. Beads pushed up to the top bar count; beads left at the bottom don’t.',
      set: { N: 0 },
      ms: 7500,
    },
    {
      say: 'Push up 7 beads on the right-hand rod: 7 ones.',
      set: { N: 7 },
      cam: { position: [3.4, 1.2, 10], target: [2.2, -0.4, 0] },
      ms: 6500,
    },
    {
      say: 'Add 3 more and the rod would need 10 beads. Instead, clear the ones rod and push up one bead on the next rod: one ten.',
      set: { N: 10 },
      ms: 9500,
    },
    {
      say: 'Each rod is worth ten of the rod to its right. 205 is 2 hundreds, no tens, and 5 ones.',
      set: { N: 205 },
      cam: null,
      ms: 9000,
    },
    {
      say: 'Now write down only the rods that have beads: “2” and “5”. That reads as 25, which is a different number.',
      set: { N: 25 },
      ms: 9000,
    },
    {
      say: 'Babylonian scribes lived with this problem for about 1,500 years. The fix came from India: Brahmagupta, in 628 AD, treated the empty place as a number in its own right. Zero.',
      set: { N: 205 },
      cam: { position: [0.6, 1.0, 10.5], target: [0.6, -0.6, 0] },
      ms: 12000,
    },
    {
      say: 'Fibonacci carried these ten digits, zero included, to Europe in his book of 1202. A zero keeps every other digit in its place.',
      set: { N: 1202 },
      cam: null,
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// NUM 04. Carrying and borrowing with rods and squares
// ---------------------------------------------------------------------------
export const base_ten_addition = {
  ...origins.base_ten_addition,
  ease: 2.4,
  beats: [
    {
      say: 'A rod is ten little squares glued together. 27 is 2 rods and 7 squares; 15 is 1 rod and 5 squares.',
      set: { a: 27, b: 15, op: 'add', step: 0 },
      ms: 8500,
    },
    {
      say: 'Adding just means putting the two piles together: 3 rods and a pile of loose squares.',
      set: { step: 1 },
      ms: 8000,
    },
    {
      say: 'Count the loose squares: 12. But one place can only hold 0 to 9. Ten of them are a rod in disguise.',
      set: {},
      cam: { x: [-5.5, 2.5], y: [-2.6, 2.4] },
      ms: 9000,
    },
    {
      say: 'Glue ten squares into a new rod. That is what “carry the 1” means: one ten carried over to the tens.',
      set: { step: 2 },
      ms: 9000,
    },
    {
      say: '4 rods and 2 squares: 27 + 15 = 42.',
      set: {},
      cam: null,
      ms: 6500,
    },
    {
      say: 'Subtraction runs the trade backwards. 42 − 15: we need to take away 5 squares, but there are only 2.',
      set: { a: 42, b: 15, op: 'sub', step: 0 },
      ms: 9000,
    },
    {
      say: 'So break one rod into ten loose squares. That is “borrowing”.',
      set: { step: 1 },
      ms: 7500,
    },
    {
      say: 'Now take away 1 rod and 5 squares. What is left: 2 rods and 7 squares. 42 − 15 = 27.',
      set: { step: 2 },
      ms: 9000,
    },
  ],
};
