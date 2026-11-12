// Story versions, batch 6: weeks 15–19 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as calculus from './calculus';
import * as um_chem1 from './um_chem1';
import * as um_chem2 from './um_chem2';
import * as um_math1 from './um_math1';
import * as um_mate1 from './um_mate1';
import * as um_physics from './um_physics';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);

// ---------------------------------------------------------------------------
// CHEM 08. Why heat speeds reactions up
// ---------------------------------------------------------------------------
export const reaction_collisions = {
  ...um_chem1.reaction_collisions,
  ease: 2,
  beats: [
    {
      say: 'Two kinds of particle, blue A and red B, fly about in a box, bumping into each other all the time.',
      set: { T: 300, n: 25 },
      ms: 8000,
    },
    {
      say: 'Most bumps do nothing. Only a collision hard enough to break the old bonds turns A and B into a new particle, gold C. That minimum energy is the activation energy.',
      set: {},
      ms: 11000,
      notes: [{ text: 'blue A + red B → gold C, but only if they hit hard enough', at: [4.4, 1.4] }],
    },
    {
      say: 'The graph counts the A that is left. It falls as A gets used up, fast at first, then slower as A and B get scarce.',
      set: {},
      ms: 10000,
      notes: [{ text: 'A gets used up', at: [3.6, -1.6], to: [1.3, 0.3] }],
    },
    {
      say: 'Crowd in more particles. They meet more often, so the reaction starts faster.',
      set: { n: 40 },
      ms: 9000,
      notes: [{ text: 'more crowded → more collisions → faster start', at: [4.4, 1.4], to: [1.1, 2.2] }],
    },
    {
      say: 'Back to 25 each, but heat the box by 30 K. The particles fly a little faster…',
      set: { n: 25, T: 330 },
      ms: 8500,
    },
    {
      say: '…and far more of their collisions now clear the energy bar. A rise of just 10 °C often doubles a reaction’s speed. That is why food keeps longer in a fridge.',
      set: {},
      ms: 11000,
      notes: [{ text: '30 K hotter → far more hits clear the energy bar', at: [4.4, 1.4], to: [1.2, -0.7], color: C.red }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 16. e: interest on interest
// ---------------------------------------------------------------------------
export const compound_e = {
  ...um_math1.compound_e,
  ease: 1.6,
  beats: [
    {
      say: 'Jacob Bernoulli’s question, 1683: put ₱1 in a bank paying 100% interest a year. Paid once, at the year’s end, you get ₱2.',
      set: { n: '1', x0: 0 },
      ms: 10000,
      notes: [{ text: 'paid once: 1 jumps to 2 at year end', at: [-4.6, -2.5], to: [-2.0, 0.4], color: C.gold }],
    },
    {
      say: 'Paid in two halves, 50% each, the second payment earns interest on the first: 1 × 1.5 × 1.5 = ₱2.25.',
      set: { n: '2' },
      ms: 9500,
    },
    {
      say: 'Monthly, 12 payments of 1/12: ₱2.61. Each step multiplies by (1 + 1/12).',
      set: { n: '12' },
      ms: 8500,
      notes: [{ text: 'monthly: interest earns interest, step by step', at: [-4.4, -2.6], to: [-4.6, 0.0], color: C.gold }],
    },
    {
      say: 'Daily: ₱2.7146. Hourly: ₱2.7181. The staircase smooths into a curve, but the total stops growing. It creeps up to a ceiling: e = 2.71828…',
      set: { n: '8760' },
      ms: 12000,
      notes: [
        { text: 'daily: nearly smooth, still under e', at: [-4.4, -2.6], to: [-4.4, 0.3], color: C.gold },
        { text: 'e ≈ 2.718: the ceiling', at: [-0.2, 1.6], to: [-1.6, 2.5], color: C.red },
      ],
    },
    {
      say: 'On the right is eˣ, growth that compounds every instant. Its special property: at every point, its slope equals its height.',
      set: { x0: 0 },
      ms: 10000,
    },
    {
      say: 'Slide along it: at height 1 the slope is 1; at height 4.5 the slope is 4.5. Things that grow in proportion to their size, like bacteria, money or a nuclear chain reaction, all follow eˣ.',
      set: { x0: 1.5 },
      ms: 12000,
      notes: [{ text: 'eˣ: slope = height, everywhere', at: [3.0, 2.0], to: [6.2, 0.9], color: C.green }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 111. Naming planes in a crystal: Miller indices
// ---------------------------------------------------------------------------
export const miller_planes = {
  ...um_mate1.miller_planes,
  ease: 2,
  beats: [
    {
      say: 'Metals bend by layers of atoms sliding over each other, so we need names for the layers. Take one cubic unit cell, with x, y and z axes along its edges.',
      set: { h: 1, k: 0, l: 0 },
      ms: 10000,
    },
    {
      say: 'Miller’s recipe (1839): see where the plane cuts each axis, flip each number upside down, and clear any fractions. This plane cuts x at 1 and never meets y or z, which counts as ∞.',
      set: {},
      ms: 12000,
      notes: [{ text: 'cuts x at 1, never meets y or z: a cube face', at: [4.6, 2.6, 0], to: [1.5, 0.3, 0.3], color: C.yellow }],
    },
    {
      say: 'Flipped: 1/1 = 1, 1/∞ = 0, 1/∞ = 0. So it is the (100) plane: one face of the cube.',
      set: {},
      ms: 9000,
    },
    {
      say: 'Cut x at 1 and y at 1, never z: (110). A diagonal wall through the cube.',
      set: { k: 1 },
      ms: 8500,
      notes: [{ text: 'cuts x and y at 1, runs parallel to z', at: [4.6, 2.6, 0], to: [0.2, 0.5, 0], color: C.yellow }],
    },
    {
      say: 'Cut all three at 1: (111). Turn it and look. In copper and aluminium this triangle is packed tight with atoms, and it is the plane the layers slide along when the metal bends.',
      set: { l: 1 },
      ms: 12000,
      notes: [{ text: 'in copper this plane is packed tight: layers slide along it', at: [4.4, 2.8, 0], to: [-0.4, -0.3, 0.5], color: C.yellow }],
    },
    {
      say: '(200) cuts x at ½: parallel to (100) but halfway in. Bigger numbers mean planes packed closer together, which matters when X-rays bounce off them in week 22.',
      set: { h: 2, k: 0, l: 0 },
      ms: 11000,
      notes: [
        { text: '(200): halfway in', at: [4.6, 2.6, 0], to: [0, 0.6, 0], color: C.yellow },
        { text: 'faint: (100) of the same family', at: [5.0, -1.0, 0], to: [1.5, -0.6, 0], color: C.white },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 09. Equilibrium: changing both ways at once
// ---------------------------------------------------------------------------
export const equilibrium_flow = {
  ...um_chem1.equilibrium_flow,
  ease: 2,
  beats: [
    {
      say: 'Start with 60 particles of A. Each one can turn into B, and each B can turn back into A.',
      set: { K: '1', add: 'no' },
      ms: 8500,
      notes: [{ text: 'blue A ⇄ gold B: changing both ways, all the time', at: [4.4, 1.6] }],
    },
    {
      say: 'At first A turns into B fast, because there is so much A. As B builds up, more B turns back. The two counts level off.',
      set: {},
      ms: 11000,
      notes: [{ text: 'A falls, B rises… then both level off', at: [4.0, -1.4], to: [1.2, -0.2] }],
    },
    {
      say: 'With K = 1 they settle at about half and half. This is equilibrium. Look closely: particles are still switching. Only the totals have stopped changing.',
      set: {},
      ms: 11000,
      notes: [{ text: 'particles still switch; only the totals stop changing', at: [4.4, 1.8] }],
    },
    {
      say: 'K says which way is favoured. With K = 4 the forward change is four times as likely: they settle at about 4 B for every A.',
      set: { K: '4' },
      ms: 11000,
      notes: [{ text: 'K = 4: about 4 B for every 1 A', at: [4.4, -0.4], to: [1.0, -1.6], color: C.gold }],
    },
    {
      say: 'Now push it: tip in 30 more A. The balance is upset, so extra B forms until B : A is back to 4 : 1.',
      set: { add: 'yes' },
      ms: 11000,
      notes: [{ text: '+30 A upsets the balance, so more B forms', at: [4.4, 0.6], to: [1.1, -0.6], color: C.gold }],
    },
    {
      say: 'Le Chatelier, 1884: disturb a system at equilibrium and it shifts to undo part of the disturbance. Industry uses it, for example to get more ammonia for fertiliser out of the Haber process.',
      set: {},
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 08. Momentum in collisions
// ---------------------------------------------------------------------------
export const collision_carts = {
  ...um_physics.collision_carts,
  ease: 2,
  beats: [
    {
      say: 'Two equal carts. Cart 1 rolls at 2 m/s toward cart 2, which is standing still. Momentum is mass × speed: 2 kg × 2 m/s = 4 units, all in cart 1.',
      set: { m1: 2, v1: 2, m2: 2, v2: 0, kind: 'bouncy' },
      ms: 11000,
      notes: [{ text: 'momentum = mass × speed; the total before = the total after', at: [0, -2.6], color: C.gold }],
    },
    {
      say: 'A bouncy crash. Cart 1 stops dead and cart 2 leaves with all of its speed, like a snooker ball. The 4 units of momentum simply moved over.',
      set: {},
      ms: 10000,
      notes: [{ text: 'equal, bouncy carts: watch cart 1 stop dead', at: [0, 2.0] }],
    },
    {
      say: 'Now make them sticky. They lock together and roll off at half the speed: 4 kg × 1 m/s, still 4 units of momentum.',
      set: { kind: 'sticky' },
      ms: 10000,
      notes: [{ text: 'sticky: they leave together at half the speed', at: [0, 2.0] }],
    },
    {
      say: 'Momentum survived, but movement energy did not: half of it became heat and bent metal. Car crumple zones are designed to soak up energy exactly like this.',
      set: {},
      ms: 10500,
      notes: [{ text: 'half the movement energy → heat and bent metal', at: [0, -2.6], color: C.red }],
    },
    {
      say: 'A heavy cart hits a light one. The light cart shoots off faster than the heavy one ever went.',
      set: { m1: 4, m2: 1, kind: 'bouncy' },
      ms: 9500,
      notes: [{ text: 'heavy hits light: the light cart shoots off faster', at: [0, 2.0], color: C.gold }],
    },
    {
      say: 'Head-on, sticky, with equal and opposite momentum: 2 kg at 2 m/s against 2 kg at −2 m/s. Total momentum zero, so they stop dead together.',
      set: { m1: 2, v1: 2, m2: 2, v2: -2, kind: 'sticky' },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 12. Limits: sneaking up on a hole
// ---------------------------------------------------------------------------
export const limit_zoom = {
  ...um_math1.limit_zoom,
  ease: 1.8,
  beats: [
    {
      say: 'f(x) = (x² − 1) ÷ (x − 1). Try x = 1 and you get 0 ÷ 0, which means nothing. The graph has a hole there.',
      set: { fn: 'hole', side: 'left', k: 0 },
      ms: 10000,
      notes: [{ text: 'a hole: 0/0 at x = 1', at: [2.6, -1.6], to: [0.1, 0.2], color: C.red }],
    },
    {
      say: 'We can’t stand on the hole, but we can walk toward it. Start 1 away, at x = 0.',
      set: {},
      ms: 8000,
      notes: [{ text: 'start 1 away, then step closer', at: [-4.6, 2.6], to: [-2.6, -0.6], color: C.gold }],
    },
    { say: 'Step to 0.9, then 0.99, then 0.999. The values: 1.9, 1.99, 1.999…', set: { k: 3 }, ms: 9000 },
    {
      say: 'Come from the right instead: 2.1, 2.01, 2.001. Both sides close in on 2. So the limit is 2, hole or no hole.',
      set: { side: 'right' },
      ms: 10000,
      notes: [{ text: 'from both sides it heads to 2: the limit is 2', at: [3.4, -1.0], to: [0.1, 0.3], color: C.gold }],
    },
    {
      say: 'sin x ÷ x also has a hole at 0, yet it heads firmly to 1. This limit will give us the slope of the sine wave later.',
      set: { fn: 'sinc', k: 3 },
      ms: 10000,
      notes: [{ text: 'a hole at 0, yet it heads firmly to 1', at: [-3.6, 3.0], to: [-0.1, 1.7], color: C.gold }],
    },
    {
      say: 'A jump is different. Approaching 0 from the left you head to −1; from the right, to +1. The two sides disagree, so there is no limit at the jump.',
      set: { fn: 'step', side: 'left' },
      ms: 11000,
    },
    { say: 'From the right: +1. Cauchy made this idea exact in 1821, and every derivative in calculus is built on it.', set: { side: 'right' }, ms: 9000 },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 10. pH: a scale of powers of ten
// ---------------------------------------------------------------------------
export const ph_scale = extend(um_chem1.ph_scale, {
  ease: 1.6,
  beats: [
    {
      say: 'In pure water, a tiny fraction of the molecules split into hydrogen ions, H⁺, and hydroxide ions, OH⁻. Equal amounts: 10⁻⁷ mol per litre of each. That is pH 7, neutral.',
      set: { pH: 7 },
      ms: 11000,
      notes: [
        { text: 'pure water: right in the middle', at: [-4.0, 3.4], to: [-0.1, 0.9] },
        { text: 'H⁺ = OH⁻: neutral', at: [5.2, -3.4], to: [2.9, -3.3] },
      ],
    },
    {
      say: 'pH counts powers of ten of H⁺, backwards. Each step down the scale means 10 times more H⁺. Vinegar, about pH 3, has 10,000 times more than water.',
      set: { pH: 3 },
      ms: 11000,
    },
    {
      say: 'Calamansi juice, about pH 2: 100,000 times more H⁺ than water. Five steps, five factors of ten.',
      set: { pH: 2 },
      ms: 9000,
      notes: [{ text: 'each step = ×10: 5 steps → 100,000× more H⁺', at: [-3.4, 3.4], to: [-4.6, 0.9], color: C.red }],
    },
    {
      say: 'Go the other way and H⁺ becomes scarce while OH⁻ takes over. Soap, about pH 10, is alkaline.',
      set: { pH: 10 },
      ms: 9000,
    },
    {
      say: 'Wet concrete, about pH 12.5. This alkaline coat keeps a thin protective film on the steel bars inside, so they don’t rust. When it turns neutral over decades, the bars start to corrode.',
      set: { pH: 12.5 },
      ms: 12000,
      notes: [{ text: 'lots of OH⁻: this alkaline coat keeps the steel bars from rusting', at: [4.8, 3.2], to: [5.0, 1.0], color: C.blue }],
    },
    { say: 'Drag the marker along the scale. Søren Sørensen invented pH in 1909, at the Carlsberg brewery lab.', set: { pH: 7 }, ms: 8000 },
  ],
  more(kit) {
    const x0 = -7;
    const w = 14 / 15;
    const h = kit.handle([0, 0], { color: C.white, onDrag: ([x]) => ({ pH: snap((x - x0) / w - 0.5, 0.5, 0, 14) }) });
    return (p) => h.set([x0 + (p.pH + 0.5) * w, 0.65]);
  },
});

// ---------------------------------------------------------------------------
// MATH 101. The derivative: the slope at a point
// ---------------------------------------------------------------------------
const FN = {
  cubic: (x) => 0.08 * x ** 3 - 0.9 * x + 0.5,
  wave: (x) => 2 * Math.sin(x),
  bowl: (x) => 0.25 * x * x - 2,
};
export const derivative_tangent_lab = extend(calculus.derivative_tangent_lab, {
  ease: 1.6,
  beats: [
    {
      say: 'A curve. How steep is it at one point? A curve keeps changing its steepness, so rise ÷ run needs two points.',
      set: { fn: 'cubic', x0: 1, h: 2.5, trace: 0 },
      ms: 9500,
    },
    {
      say: 'Take a second point a gap h further along. The line through both, the secant, has slope rise ÷ run: the average steepness across the gap.',
      set: {},
      ms: 10000,
      notes: [
        { text: 'the secant: average slope across the gap h', at: [-5.0, 3.0], to: [-2.4, -1.6], color: C.gold },
        { text: 'rise over run', at: [5.2, -2.4], to: [2.9, -0.2] },
      ],
    },
    { say: 'Shrink the gap. The second point slides toward the first, and the secant pivots.', set: { h: 0.8 }, ms: 8500 },
    {
      say: 'Shrink it almost to nothing. The secant settles onto one line that just grazes the curve: the tangent. Its slope is the derivative at that point.',
      set: { h: 0.01 },
      cam: { x: [-2.5, 4.5], y: [-2.6, 1.6] },
      ms: 11000,
      notes: [{ text: 'shrink h: the secant settles onto the tangent', at: [3.6, -2.0], to: [1.3, -0.4], color: C.gold }],
    },
    {
      say: 'That is the limit idea from week 17: the slope that rise ÷ run heads toward as the gap shrinks to zero. Newton and Leibniz each found it in the 1670s and 80s.',
      set: {},
      cam: null,
      ms: 11000,
    },
    {
      say: 'Do it at every x and plot each slope as a height: a whole new curve, f′(x), the slope graph. Where the sine wave peaks, its slope is zero, so f′ crosses zero there.',
      set: { fn: 'wave', x0: 1.57, trace: 1 },
      ms: 12000,
      notes: [
        { text: 'green = f′(x): the slope at every x', at: [-4.0, -3.4], to: [-3.1, -1.9], color: C.green },
        { text: 'f peaks → f′ crosses zero', at: [4.4, 3.4], to: [1.6, 0.1], color: C.gold },
      ],
    },
    { say: 'Drag the white point along the curve, and the second point to change the gap.', set: { fn: 'cubic', x0: 1, h: 1.5, trace: 0 }, ms: 7000 },
  ],
  more(kit) {
    const cur = { fn: 'cubic', x0: 1 };
    const ha = kit.handle([0, 0], { color: C.white, onDrag: ([x]) => ({ x0: snap(x, 0.1, -5, 5) }) });
    const hb = kit.handle([0, 0], { color: C.yellow, onDrag: ([x]) => ({ h: snap(x - cur.x0, 0.01, 0.01, 3) }) });
    return (p, t) => {
      cur.fn = t.fn;
      cur.x0 = t.x0;
      const f = FN[t.fn];
      ha.set([p.x0, f(p.x0)]);
      hb.set([p.x0 + p.h, f(p.x0 + p.h)]);
      hb.visible(p.h > 0.15);
    };
  },
});

// ---------------------------------------------------------------------------
// PHYS 09. Rolling race: where the mass sits
// ---------------------------------------------------------------------------
export const rolling_race = {
  ...um_physics.rolling_race,
  ease: 2,
  beats: [
    {
      say: 'Three objects with the same mass and the same radius: a hoop, a solid disc and a solid ball. They race down identical 2 m ramps. Which wins?',
      set: { slope: 12 },
      ms: 10000,
      notes: [{ text: 'same mass, same radius: only where the mass sits differs', at: [-4.2, -1.2] }],
    },
    {
      say: 'The ball wins, the disc is second, the hoop is last. Every time.',
      set: {},
      ms: 8500,
    },
    {
      say: 'Why? Rolling down, height turns into two kinds of motion: moving forward and spinning. A hoop has all its mass far from the middle, so spinning it up soaks up half the energy. Less is left for going forward.',
      set: {},
      ms: 13000,
      notes: [{ text: 'ball wins: its mass sits near the middle, so less energy goes into spinning', at: [3.0, -1.0], to: [6.9, 1.2], color: C.green }],
    },
    {
      say: 'Make the slope steeper. Everyone is faster, but the order never changes: only the shape, where the mass sits, decides.',
      set: { slope: 30 },
      ms: 10000,
      notes: [{ text: 'steeper: everyone is faster, the order stays the same', at: [0, -1.2] }],
    },
    {
      say: 'This is the moment of inertia: resistance to being spun up. Flywheels put their mass at the rim on purpose, to store spinning energy.',
      set: { slope: 20 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 11. A battery from two metals
// ---------------------------------------------------------------------------
export const galvanic_cell = {
  ...um_chem2.galvanic_cell,
  ease: 2,
  beats: [
    {
      say: 'Some metals give up electrons more easily than others. Daniell’s cell, 1836: a zinc bar in one beaker, copper in the other, joined by a wire.',
      set: { pair: 'Zn-Cu' },
      ms: 10000,
    },
    {
      say: 'Zinc is the more eager to give up electrons, so they flow from zinc, through the wire and the meter, to the copper. That flow is an electric current: 1.10 volts.',
      set: {},
      ms: 11000,
      notes: [{ text: 'zinc gives up electrons; they flow through the wire to the copper', at: [0, -0.8], to: [-2.0, 3.5] }],
    },
    {
      say: 'The zinc slowly dissolves as ions. The salt bridge lets ions drift between the beakers so charge doesn’t pile up and stop the flow.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Zinc and iron: zinc still gives way first. This is the cell on every scratched galvanised roof: the zinc coating sacrifices itself to save the iron.',
      set: { pair: 'Zn-Fe' },
      ms: 11000,
      notes: [{ text: 'zinc still gives way first: it sacrifices itself to save the iron', at: [0, -0.8], to: [-3.8, 0.4] }],
    },
    {
      say: 'Magnesium is far more eager than zinc: with copper it gives 2.71 volts. Magnesium blocks are bolted to ship hulls to be eaten instead of the steel.',
      set: { pair: 'Mg-Cu' },
      ms: 11000,
      notes: [{ text: 'magnesium is far more eager: 2.71 V', at: [0, -0.8], to: [0, 3.0], color: C.green }],
    },
    {
      say: 'Rank metals by eagerness and you get the electrochemical series. The further apart two metals are, the bigger the voltage, and the faster the eager one corrodes when they touch.',
      set: { pair: 'Cu-Ag' },
      ms: 11000,
    },
  ],
};
