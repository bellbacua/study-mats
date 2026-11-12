// Story versions, batch 3: weeks 6–9 of the timetable.
// These keep each lesson's original picture and retell it as a slower
// story: more, smaller steps, the camera pointing at what matters, and
// points you can drag where the idea is about shape.
import { C } from '../theme';
import * as origins from './origins';
import * as foundations from './foundations';
import * as chemistry from './chemistry';
import * as matter from './matter';
import * as physics from './physics';
import * as language from './language';
import * as um_mate1 from './um_mate1';

// Keep a scene's own picture and add a layer on top (handles, extra marks).
export function extend(base, extra) {
  const { more, ...rest } = extra;
  return {
    ...base,
    ...rest,
    setup(kit, ctx) {
      const a = base.setup(kit, ctx);
      const b = more ? more(kit, ctx) : null;
      return (p, t, time, dt) => {
        a?.(p, t, time, dt);
        b?.(p, t, time, dt);
      };
    },
  };
}

// The whole number in [lo, hi] whose position f(n) is nearest to `want`.
export function nearest(lo, hi, f, want) {
  let best = lo;
  let bd = Infinity;
  for (let n = lo; n <= hi; n++) {
    const d = Math.abs(f(n) - want);
    if (d < bd) {
      bd = d;
      best = n;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// NUM 08. √2: a length that is no fraction
// ---------------------------------------------------------------------------
export const irrational_sqrt2 = {
  ...origins.irrational_sqrt2,
  ease: 2.2,
  beats: [
    { say: 'A square with sides exactly 1 unit long.', set: { step: 0, Q: 1 }, ms: 5500 },
    { say: 'Draw its diagonal. How long is it?', set: { step: 1 }, ms: 5500, notes: [{ text: 'the diagonal: how long?', at: [1.6, 0.6], to: [-4.2, 0] }] },
    {
      say: 'Pythagoras: the diagonal squared is 1² + 1² = 2. So the diagonal is the number that, multiplied by itself, gives 2. We call it √2.',
      set: {},
      ms: 10000,
      notes: [{ text: 'd × d = 2', at: [4.6, 1.8], to: [2.2, 3.3] }],
    },
    {
      say: 'Swing the diagonal down onto the number line. It lands on one exact point, a bit past 1.4.',
      set: { step: 2 },
      ms: 8000,
      notes: [{ text: '√2 ≈ 1.41421…', at: [1.4, 0.2], to: [-0.35, -2.0] }],
    },
    {
      say: 'Is that point a fraction? Mark every half, third and quarter on the line.',
      set: { Q: 4 },
      ms: 7500,
    },
    {
      say: 'Now every fraction with a bottom number up to 40. Zoom in: they crowd closer and closer from both sides…',
      set: { Q: 40 },
      cam: { x: [-4.6, 3.6], y: [-3.6, 0.4] },
      ms: 9500,
    },
    {
      say: '…but none of them ever lands exactly on √2. Hippasus showed it never can, which reportedly shocked the Pythagoreans. A length like this is called irrational: it is not a ratio of whole numbers.',
      set: {},
      cam: null,
      ms: 13000,
    },
  ],
};

// ---------------------------------------------------------------------------
// ENG 01. Three flat views of a solid part
// ---------------------------------------------------------------------------
export const ortho_views = {
  ...um_mate1.ortho_views,
  ease: 2.4,
  beats: [
    {
      say: 'A machined part: an L-shaped bracket. A photo can’t tell a machinist the exact sizes. A drawing made of flat views can.',
      set: { part: 'L', view: 'all' },
      ms: 8500,
    },
    {
      say: 'Put the part inside a glass box. Look straight at its front and trace the outline onto the back wall. That is the front view: it shows width and height.',
      set: { view: 'front' },
      cam: { position: [0.6, 0.8, 11], target: [0, 0, 0] },
      ms: 11000,
      notes: [{ text: 'traced on the back wall: width and height', at: [-4.8, 3.2, 0], to: [-0.6, 0.8, -2.9], color: C.blue }],
    },
    {
      say: 'Now look straight down and trace onto the floor: the top view, showing width and depth. The line across it is where the upright meets the base.',
      set: { view: 'top' },
      cam: { position: [0.4, 11, 3], target: [0, 0, 0] },
      ms: 11000,
      notes: [{ text: 'traced on the floor: width and depth', at: [5.2, -1.2, 0], to: [1.0, -2.9, 0.5], color: C.green }],
    },
    {
      say: 'From the side you get the third view: depth and height. Three flat views together pin down every face of the part.',
      set: { view: 'side' },
      cam: null,
      ms: 9500,
    },
    {
      say: 'A block with a hole drilled down through it. From the front, the hole is hidden inside the metal.',
      set: { part: 'hole', view: 'all' },
      ms: 8000,
    },
    {
      say: 'It is still drawn, as dashed hidden lines, with a dash-dot centre line through the middle of the hole.',
      set: { view: 'front' },
      cam: { position: [0.6, 0.8, 11], target: [0, 0, 0] },
      ms: 9000,
      notes: [{ text: 'dashed: the hole you cannot see from the front', at: [-4.8, 3.2, 0], to: [0.4, -1.0, -2.9], color: C.blue }],
    },
    {
      say: 'From above you look straight down the hole, so it shows as a full circle, with two centre lines crossing at its middle.',
      set: { view: 'top' },
      cam: { position: [0.4, 11, 3], target: [0, 0, 0] },
      ms: 9500,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 04. Powers of ten, from you to an atom
// ---------------------------------------------------------------------------
export const exponent_growth_scaler = {
  ...foundations.exponent_growth_scaler,
  ease: 1.6,
  beats: [
    {
      say: 'Start at 1 metre, about your size. Written as a power of ten, that is 10⁰.',
      set: { n: 0 },
      ms: 7000,
      notes: [{ text: 'each square is 10× smaller than the one around it', at: [-3.6, -4.0], to: [-3.6, -0.4] }],
    },
    { say: 'Go out one step: 10¹ = 10 metres, a house. Up two: 10² = 100 metres, a football field. Each step multiplies by 10.', set: { n: 2 }, ms: 9000 },
    { say: 'Now come back in. 10⁻¹ m is a tenth of a metre: your hand. A negative power means divide by ten, not multiply.', set: { n: -1 }, ms: 9000 },
    { say: '10⁻³ m, a thousandth of a metre: a grain of sand.', set: { n: -3 }, ms: 7000 },
    {
      say: '10⁻⁴ m: the width of a human hair. You have divided by 10 four times.',
      set: { n: -4 },
      ms: 7500,
      notes: [{ text: 'four steps down = divide by 10 four times', at: [-3.6, -4.0], to: [0.9, -0.2], color: C.gold }],
    },
    { say: '10⁻⁶ m: one grain inside a fine steel. 10⁻⁷ m: a virus.', set: { n: -7 }, ms: 8500 },
    {
      say: '10⁻¹⁰ m: a single silicon atom. Materials engineering works across all of these scales, from the bridge down to the atom.',
      set: { n: -10 },
      ms: 10000,
      notes: [{ text: 'ten steps down: one atom', at: [-3.6, -4.0], to: [-3.6, -3.1], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// NUM 10. Number families as nested boxes
// ---------------------------------------------------------------------------
export const number_sets = {
  ...language.number_sets,
  ease: 2.4,
  beats: [
    {
      say: 'Mathematicians sort numbers into families, and the families fit inside each other like boxes. The innermost box, ℕ, holds the counting numbers: 1, 2, 3, …',
      set: { n: 'seven' },
      ms: 10000,
      notes: [{ text: '7 is in ℕ, so it is in every box around ℕ too', at: [3.4, -3.7], to: [-2.6, -0.3] }],
    },
    {
      say: 'Add zero and the negatives and you get ℤ, the integers. −3 is not a counting number, but it is an integer.',
      set: { n: 'neg' },
      ms: 8500,
      notes: [{ text: '−3: outside ℕ, but inside ℤ', at: [3.4, -3.7], to: [-0.9, -1.0] }],
    },
    { say: 'Add every fraction and you get ℚ, the rationals. 3/4 lives here.', set: { n: 'frac' }, ms: 6500 },
    { say: '0.333… goes on forever, but it repeats, so it is a fraction in disguise: 1/3. Still in ℚ.', set: { n: 'third' }, ms: 8000 },
    {
      say: 'Some numbers are on the number line but are no fraction at all: √2 and π. Adding them gives ℝ, the real numbers.',
      set: { n: 'root2' },
      ms: 9000,
      notes: [{ text: '√2: inside ℝ, but outside ℚ', at: [5.4, -3.4], to: [3.0, 1.0], color: C.gold }],
    },
    { say: 'π is real but not a fraction either.', set: { n: 'pi' }, ms: 5500 },
    {
      say: 'The outermost box, ℂ, adds numbers like 2 + i that are not on the line at all. You will meet them in week 13. Each bigger box only ever adds numbers; it never throws any out.',
      set: { n: 'complex' },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 03. Counting atoms: balancing rust
// ---------------------------------------------------------------------------
export const mole_stoichiometry_reactor = {
  ...chemistry.mole_stoichiometry_reactor,
  ease: 2.4,
  beats: [
    {
      say: 'Iron rusts: iron and oxygen make iron oxide, Fe₂O₃. Lavoisier’s rule: atoms are never created or destroyed. So count each kind on both sides.',
      set: { cFe: 1, cO2: 1, cOx: 1 },
      ms: 10000,
      notes: [{ text: 'count each kind of atom on both sides: they do not match', at: [3.2, -0.6], to: [0.6, -1.9], color: C.red }],
    },
    {
      say: 'Oxygen first. Oxygen gas comes in pairs, O₂, but rust needs oxygen in threes. 2 and 3 first meet at 6.',
      set: {},
      ms: 9000,
    },
    {
      say: 'Three O₂ give 6 oxygen atoms, and two Fe₂O₃ hold 6. Oxygen balances.',
      set: { cO2: 3, cOx: 2 },
      ms: 8500,
      notes: [{ text: 'oxygen now matches: 6 on each side', at: [3.0, -0.6], to: [1.4, -2.9], color: C.green }],
    },
    {
      say: 'Now iron. Two Fe₂O₃ hold 4 iron atoms, but we started with only 1.',
      set: {},
      ms: 7000,
    },
    {
      say: 'Start with 4 Fe. Balanced: 4 Fe + 3 O₂ → 2 Fe₂O₃. Every atom on the left turns up on the right.',
      set: { cFe: 4 },
      ms: 9000,
      notes: [{ text: '4 iron atoms in, 4 out: balanced', at: [3.0, -0.6], to: [1.4, -1.9], color: C.green }],
    },
    {
      say: 'Chemists count in moles: one mole is 6.022 × 10²³ units. So 4 moles of iron react with 3 moles of oxygen gas: the same ratio, scaled up to a size you can weigh.',
      set: {},
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// GEO 01. Pythagoras with squares you can drag
// ---------------------------------------------------------------------------
const pyScale = (a, b) => Math.min(15 / (a + 2 * b), 8.4 / (2 * a + b));
export const pythagoras_squares = extend(origins.pythagoras_squares, {
  ease: 2.4,
  beats: [
    {
      say: 'A right triangle: two short sides, called legs, 3 and 4 long, meet in a square corner. On each of its three sides stands a square.',
      set: { a: 3, b: 4 },
      ms: 9000,
    },
    {
      say: 'Count the unit squares. The square on the 3-side holds 3 × 3 = 9. The one on the 4-side holds 4 × 4 = 16.',
      set: {},
      ms: 9000,
      notes: [
        { text: '3 × 3 = 9', at: [3.2, -3.2], to: [1.4, -2.6], color: C.blue },
        { text: '4 × 4 = 16', at: [-6.4, -1.2], to: [-4.6, 0.2], color: C.green },
      ],
    },
    {
      say: 'The square on the long side, the hypotenuse, holds 25.',
      set: {},
      ms: 6500,
      notes: [{ text: '5 × 5 = 25', at: [5.6, -1.4], to: [3.6, 0.6] }],
    },
    {
      say: '9 + 16 = 25. The two small squares exactly fill the big one: a² + b² = c². A Babylonian tablet, Plimpton 322, lists triples like this from around 1800 BC; Euclid proved it always works.',
      set: {},
      ms: 13000,
    },
    { say: 'Try 5 and 12: 25 + 144 = 169 = 13². Another whole-number triple.', set: { a: 5, b: 12 }, ms: 8500 },
    {
      say: 'Legs 1 and 1 give c² = 2. This is the √2 triangle that broke the Greek belief that every length is a fraction.',
      set: { a: 1, b: 1 },
      ms: 9500,
    },
    { say: 'Drag the two glowing corners to change the legs and watch the three squares.', set: { a: 3, b: 4 }, ms: 7000 },
  ],
  more(kit) {
    const cur = { a: 3, b: 4 };
    const ha = kit.handle([0, 0], {
      color: C.blue,
      onDrag: ([x]) => {
        return { a: nearest(1, 12, (a) => (a * pyScale(a, cur.b)) / 2, x) };
      },
    });
    const hb = kit.handle([0, 0], {
      color: C.green,
      onDrag: ([, y]) => {
        return { b: nearest(1, 12, (b) => (b * pyScale(cur.a, b)) / 2, y) };
      },
    });
    return (p, t) => {
      cur.a = t.a;
      cur.b = t.b;
      const s = pyScale(p.a, p.b);
      ha.set([(p.a * s) / 2, (-p.b * s) / 2]);
      hb.set([(-p.a * s) / 2, (p.b * s) / 2]);
    };
  },
});

// ---------------------------------------------------------------------------
// CHEM 04. Mendeleev's table and its gaps
// ---------------------------------------------------------------------------
export const periodic_table_3d = {
  ...matter.periodic_table_3d,
  ease: 2.2,
  beats: [
    {
      say: 'By 1869 chemists knew 63 elements. Mendeleev wrote each on a card and sorted them by atomic weight.',
      set: { era: '1871', prop: 'flat', Z: 14 },
      ms: 8500,
    },
    {
      say: 'Properties repeated: every so often a similar element came round again. So he laid them out in rows, putting look-alikes in the same column.',
      set: {},
      ms: 9500,
    },
    {
      say: 'Where nothing fitted, he left a gap and predicted the missing element’s weight and behaviour.',
      set: { Z: 31 },
      ms: 8500,
      notes: [{ text: '?: gaps left for elements nobody had found yet', at: [0, 0.3, 4.6], to: [3.5, 0.4, 2.0], color: C.yellow }],
    },
    {
      say: 'Gallium was found in 1875, scandium in 1879, germanium in 1886, each with almost exactly the predicted properties. That convinced the world.',
      set: { era: 'today', Z: 32 },
      ms: 11000,
      notes: [{ text: 'germanium (1886) drops into its gap', at: [0, 0.3, 4.6], to: [4.5, 0.4, 2.0], color: C.yellow }],
    },
    {
      say: 'Now raise each square by the size of its atom. Turn the table and look along the rows.',
      set: { prop: 'radius', Z: 14 },
      cam: { position: [5, 9, 12], target: [0, 0.8, 0.8] },
      ms: 9500,
    },
    {
      say: 'Atoms shrink as you go right along a row and grow as you go down a column. Biggest at the bottom left, smallest at the top right.',
      set: {},
      ms: 10000,
      notes: [
        { text: 'biggest atoms: bottom left', at: [-4.5, 0.3, 4.6], to: [-8.5, 3.6, 1.8], color: C.red },
        { text: 'smallest: top right', at: [4.5, 0.3, -5.2], to: [7.5, 1.0, -0.6], color: C.blue },
      ],
    },
    {
      say: 'Electron greed, electronegativity, runs the other way: it rises to the top right. The table is really a map of each atom’s outer electrons, as you will see in the next chemistry class.',
      set: { prop: 'en' },
      cam: null,
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 03. Algebra on a balance
// ---------------------------------------------------------------------------
export const algebra_balance_beam = {
  ...foundations.algebra_balance_beam,
  ease: 2.2,
  beats: [
    {
      say: '3x + 4 = 19. Picture it as a balance: three boxes, each holding the same unknown weight x, plus 4 loose weights, balance 19 weights.',
      set: { a: 3, b: 4, c: 19, guess: 3, step: 0 },
      ms: 10000,
    },
    {
      say: 'Guess x = 3. The left pan is only 3 × 3 + 4 = 13, lighter than 19, so it rises.',
      set: {},
      ms: 8000,
      notes: [{ text: 'guess x = 3: this side weighs only 13, so it rises', at: [-4.2, 2.6], to: [-5.6, -0.5] }],
    },
    { say: 'Guess 6: now 3 × 6 + 4 = 22, too heavy. Guessing works, but slowly.', set: { guess: 6 }, ms: 8000 },
    {
      say: 'Al-Khwarizmi’s way, about 820 AD: do the same thing to both pans and the balance stays level. Take 4 weights off both sides.',
      set: { guess: 5, step: 1 },
      ms: 10000,
      notes: [{ text: 'take 4 off both pans: still level', at: [0.0, 2.4], to: [4.0, -1.2] }],
    },
    { say: 'Now 3 boxes balance 15 weights: 3x = 15.', set: {}, ms: 6000 },
    {
      say: 'Split both sides into 3 equal groups. One box balances 5 weights: x = 5.',
      set: { step: 2 },
      ms: 8500,
      notes: [{ text: 'one box balances one of three equal groups: x = 5', at: [0.0, 2.4], to: [-6.3, -1.6], color: C.green }],
    },
    { say: 'Check: 3 × 5 + 4 = 19. Every equation you will ever solve uses only these two moves: the same change on both sides.', set: {}, ms: 9500 },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 04. Newton: pushing a crate against friction
// ---------------------------------------------------------------------------
export const newton_forces = {
  ...physics.newton_forces,
  ease: 2.2,
  beats: [
    { say: 'A 50 kg crate on a floor. Nothing pushes it, so it stays put.', set: { F: 0, m: 50, mu: 0.2 }, ms: 6500 },
    {
      say: 'Push with 200 N. The floor pushes back with friction: μ × m × g = 0.2 × 50 × 9.8 = 98 N.',
      set: { F: 200 },
      ms: 9500,
      notes: [{ text: 'friction always pushes back', at: [-5.6, -3.4], to: [-3.6, -1.5], color: C.red }],
    },
    {
      say: 'What is left over, 200 − 98 = 102 N, speeds the crate up: a = F ÷ m = 102 ÷ 50 ≈ 2 m/s² every second.',
      set: {},
      ms: 10000,
      notes: [{ text: '200 − 98 = 102 N left over to speed it up', at: [3.0, 1.6], to: [-2.2, 0.6], color: C.green }],
    },
    {
      say: 'Push with exactly 98 N. Forward and back cancel: net force zero, so no speeding up. If it was already sliding it just keeps its speed. That is Newton’s first law.',
      set: { F: 98 },
      ms: 11000,
      notes: [{ text: '98 forward, 98 back: net zero, so no speeding up', at: [1.0, 1.6], to: [-4.0, -0.8] }],
    },
    {
      say: 'Back to 200 N, but double the mass to 100 kg (and a smoother floor, μ = 0.1). The same push now gives about half the acceleration.',
      set: { F: 200, m: 100, mu: 0.1 },
      ms: 10000,
      notes: [{ text: 'twice the mass → half the acceleration', at: [3.2, 1.6], to: [-3.2, -0.6], color: C.gold }],
    },
    { say: 'Newton’s second law, 1687: net force = mass × acceleration, F = ma. Heavier things are harder to speed up.', set: {}, ms: 8000 },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 01. Building atoms: protons, neutrons, electrons
// ---------------------------------------------------------------------------
export const bohr_orbital_builder = {
  ...foundations.bohr_orbital_builder,
  ease: 2,
  beats: [
    { say: 'The simplest atom, hydrogen: one proton in the middle, one electron around it.', set: { protons: 1, neutrons: 0, electrons: 1 }, ms: 7500 },
    {
      say: 'Carbon: 6 protons and 6 neutrons packed in a tiny nucleus, and 6 electrons around it. 6 positive, 6 negative: no overall charge.',
      set: { protons: 6, neutrons: 6, electrons: 6 },
      ms: 10000,
      notes: [
        { text: 'nucleus: 6 protons (red) + 6 neutrons (grey)', at: [-4.6, -3.6, 0], to: [-0.5, -0.5, 0], color: C.red },
        { text: '6 electrons: charge +6 − 6 = 0', at: [5.0, 3.8, 0], color: C.blue },
      ],
    },
    {
      say: 'The number of protons decides the element. Make it 12 and you have magnesium, whatever else you change.',
      set: { protons: 12, neutrons: 12, electrons: 12 },
      ms: 8500,
    },
    {
      say: 'Add two neutrons: still magnesium, just heavier. Magnesium-26 and magnesium-24 are isotopes of the same element.',
      set: { neutrons: 14 },
      ms: 9000,
      notes: [{ text: '14 neutrons, not 12: still magnesium, just heavier', at: [-4.2, -3.6, 0], to: [-0.6, -0.6, 0], color: C.red }],
    },
    {
      say: 'Take two electrons away and the atom is left with a charge of +2: an ion, Mg²⁺, as it is in seawater.',
      set: { electrons: 10 },
      ms: 9000,
    },
    {
      say: 'Silicon, 14 protons. Its electrons fill shells 2, then 8, then 4.',
      set: { protons: 14, neutrons: 14, electrons: 14 },
      cam: { position: [0, 2.5, 11] },
      ms: 8500,
    },
    {
      say: 'Those 4 outer electrons, the valence electrons, decide how silicon bonds. They are why it is inside every computer chip and solar cell.',
      set: {},
      cam: null,
      ms: 10000,
      notes: [{ text: 'gold dots: the 4 outer (valence) electrons', at: [4.6, 3.8, 0], color: C.yellow }],
    },
  ],
};
