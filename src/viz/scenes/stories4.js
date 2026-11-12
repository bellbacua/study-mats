// Story versions, batch 4: weeks 9–12 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as origins from './origins';
import * as foundations from './foundations';
import * as chemistry from './chemistry';
import * as physics from './physics';
import * as calculus from './calculus';
import * as um_chem1 from './um_chem1';
import * as um_math1 from './um_math1';
import * as um_mate1 from './um_mate1';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);

// ---------------------------------------------------------------------------
// MATH 05. Lines on a grid: slope and intercept you can drag
// ---------------------------------------------------------------------------
export const cartesian_slope_wave = extend(foundations.cartesian_slope_wave, {
  ease: 2.2,
  beats: [
    {
      say: 'Descartes, 1637: give every point an address, (across, up). The point (2, 2) is 2 across and 2 up.',
      set: { m: 1, b: 0, x0: 1 },
      ms: 8500,
    },
    {
      say: 'Mark every point whose up equals its across: (1, 1), (2, 2), (−3, −3)… They fall on one straight line, y = x.',
      set: {},
      ms: 9000,
      notes: [{ text: 'every point here has y equal to x', at: [-4.4, 2.0], to: [2, 2] }],
    },
    {
      say: 'The slope says how steep the line is: walk 1 to the right and see how far you climb. Here, 1.',
      set: {},
      ms: 8000,
      notes: [{ text: '1 across, 1 up', at: [4.4, -0.6], to: [2.1, 1.5], color: C.green }],
    },
    {
      say: 'Make it y = 2x. Now every step of 1 to the right climbs 2, wherever you stand on the line.',
      set: { m: 2, x0: -1 },
      ms: 9000,
      notes: [{ text: '1 across, 2 up: slope 2', at: [-5.0, -1.2], to: [-0.4, -1.2], color: C.green }],
    },
    {
      say: 'Add 2: y = 2x + 2. The whole line lifts by 2. The number added, b, is where the line crosses the up-down axis.',
      set: { b: 2 },
      ms: 9500,
      notes: [{ text: 'b = 2: where it crosses the up-down axis', at: [-4.8, 0.6], to: [-0.1, 1.9], color: C.red }],
    },
    {
      say: 'A negative slope walks downhill: y = −0.5x + 2 drops half a unit for every step to the right.',
      set: { m: -0.5, x0: 2 },
      ms: 9000,
      notes: [{ text: 'negative slope: walks downhill', at: [4.6, -2.2], to: [3, 0.6], color: C.gold }],
    },
    { say: 'Your turn: drag the red point to move b, and the green corner to change the slope.', set: {}, ms: 7000 },
  ],
  more(kit) {
    const hb = kit.handle([0, 0], { color: C.red, onDrag: ([, y]) => ({ b: snap(y, 0.5, -3, 3) }) });
    const cur = { x0: 1, b: 0 };
    const hm = kit.handle([0, 0], {
      color: C.green,
      onDrag: ([, y]) => {
        const f0 = cur.m * cur.x0 + cur.b;
        return { m: snap(y - f0, 0.25, -3, 3) };
      },
    });
    return (p, t) => {
      Object.assign(cur, { x0: t.x0, b: t.b, m: t.m });
      hb.set([0, p.b]);
      hm.set([p.x0 + 1, p.m * (p.x0 + 1) + p.b]);
    };
  },
});

// ---------------------------------------------------------------------------
// PHYS 05. A pendulum trading height for speed
// ---------------------------------------------------------------------------
export const pendulum_energy = extend(physics.pendulum_energy, {
  ease: 2.2,
  beats: [
    {
      say: 'Pull a pendulum aside and let go. At the top of its swing it is still for an instant: all its energy is stored as height (blue).',
      set: { amp: 45, friction: 0 },
      ms: 9000,
    },
    {
      say: 'As it falls, height turns into speed (yellow). At the lowest point it is fastest: all speed, no height.',
      set: {},
      ms: 9000,
      notes: [{ text: 'lowest point = fastest', at: [-5.8, -3.4], to: [-1.0, -1.6], color: C.gold }],
    },
    {
      say: 'Then speed turns back into height on the other side. Blue plus yellow always add to the same total: energy is conserved.',
      set: {},
      ms: 10000,
      notes: [{ text: 'blue + yellow always add to the same total', at: [1.2, 2.8], to: [4.8, 0.6] }],
    },
    {
      say: 'A higher release stores more energy, so the bob swings through the bottom faster.',
      set: { amp: 65 },
      ms: 8000,
    },
    {
      say: 'Real pendulums rub against the air. Add friction: each swing is a little lower…',
      set: { amp: 45, friction: 0.4 },
      ms: 9000,
      notes: [{ text: 'friction turns swing into heat', at: [1.2, 2.8], to: [6.8, 0.6], color: C.red }],
    },
    {
      say: '…but nothing disappears. The lost energy shows up as heat (red). Joule measured the exchange rate in the 1840s: about 4.18 joules of work warms 1 gram of water by 1 °C.',
      set: { friction: 0.8 },
      ms: 12000,
      notes: [{ text: 'the swing dies; the lost energy is all here as heat', at: [0.8, 3.0], to: [6.8, 1.6], color: C.red }],
    },
    { say: 'Drag the glowing point to choose where to let go.', set: { amp: 50, friction: 0 }, ms: 6000 },
  ],
  more(kit) {
    const P = [-2.5, 3.6];
    const R = 5.2;
    const h = kit.handle([0, 0], {
      color: C.gold,
      onDrag: ([x, y]) => ({ amp: snap((Math.atan2(Math.abs(x - P[0]), P[1] - y) * 180) / Math.PI, 5, 10, 70) }),
    });
    return (p) => {
      const a = (p.amp * Math.PI) / 180;
      h.set([P[0] + R * Math.sin(a), P[1] - R * Math.cos(a)]);
    };
  },
});

// ---------------------------------------------------------------------------
// CHEM 06. Gas in a cylinder: Boyle and Charles
// ---------------------------------------------------------------------------
export const gas_piston = {
  ...um_chem1.gas_piston,
  ease: 2,
  beats: [
    {
      say: 'A cylinder holds a gas: billions of tiny molecules flying about and bouncing off the walls. Each flash is one molecule hitting a wall.',
      set: { V: 2.5, T: 300, n: 0.1 },
      ms: 9500,
      notes: [{ text: 'each flash = one molecule pushing on the wall', at: [-4.8, 3.6], to: [-2.6, 1.0] }],
    },
    {
      say: 'All those little pushes add up to pressure. Here it is about 100 kPa, the same as ordinary air.',
      set: {},
      ms: 8000,
      notes: [{ text: '≈ 100 kPa: ordinary air pressure', at: [5.4, 1.2], to: [5.0, -2.4], color: C.gold }],
    },
    {
      say: 'Push the piston in to half the volume. The same molecules now reach a wall twice as often.',
      set: { V: 1.25 },
      ms: 8500,
      notes: [{ text: 'half the room → each wall hit twice as often', at: [-1.4, 2.6], to: [-5.2, 1.0] }],
    },
    {
      say: 'So the pressure doubles. Half the volume, twice the pressure: Robert Boyle found this in 1662.',
      set: {},
      ms: 8500,
      notes: [{ text: 'half the volume → double the pressure', at: [5.4, 1.4], to: [3.5, -1.7], color: C.gold }],
    },
    {
      say: 'Now heat it, from 300 to 600 kelvin. The molecules fly faster and hit harder and more often.',
      set: { T: 600 },
      ms: 8500,
      notes: [{ text: 'hotter = faster, harder hits', at: [-1.4, 2.6], to: [-5.2, 1.0], color: C.red }],
    },
    {
      say: 'Double the kelvin temperature and the pressure doubles again. All of it fits in one rule: pressure × volume = n × R × temperature.',
      set: {},
      ms: 10000,
      notes: [{ text: 'same volume, pressure doubled again', at: [5.4, 1.8], to: [3.5, -0.5], color: C.gold }],
    },
    { say: 'Twice as much gas in the same space, at the same temperature, means twice as many hits too.', set: { n: 0.2, T: 300, V: 2.5 }, ms: 8000 },
  ],
};

// ---------------------------------------------------------------------------
// MATH 09. The function machine
// ---------------------------------------------------------------------------
export const function_machine = {
  ...um_math1.function_machine,
  ease: 2.2,
  beats: [
    {
      say: 'A function is a machine with a rule. This one doubles whatever goes in and adds 1: f(x) = 2x + 1.',
      set: { rule: 'lin', x: 0 },
      ms: 8500,
    },
    {
      say: 'Put in 1. It comes out as 3. The pair (in 1, out 3) becomes one dot on the graph at (1, 3).',
      set: { x: 1 },
      ms: 9000,
      notes: [
        { text: '1 goes in → 3 comes out', at: [-1.0, -2.4], to: [-4.6, -2.4], color: C.green },
        { text: 'the pair (1, 3) becomes one dot', at: [0.6, 3.2], to: [4.4, 0.2], color: C.gold },
      ],
    },
    {
      say: 'Feed it 2.5: out comes 6. Then −2: out comes −3. Every input leaves a dot, and the dots trace the graph of the function.',
      set: { x: 2.5 },
      ms: 9500,
      notes: [{ text: 'every input leaves a dot; the dots draw the line', at: [0.6, 3.2], to: [5.5, 1.5], color: C.gold }],
    },
    {
      say: 'Swap in a new rule: square it, x². Put in 2: out comes 4.',
      set: { rule: 'sq', x: 2 },
      ms: 7500,
    },
    {
      say: 'Put in −2: also 4. Two inputs may share one output. What a function may never do is give two different outputs for one input.',
      set: { x: -2 },
      ms: 10000,
      notes: [
        { text: '2 and −2 both give 4: that is allowed', at: [-0.4, 3.2], to: [2.2, 0.6], color: C.gold },
        { text: 'never allowed: one input, two outputs', at: [-0.6, -3.6], color: C.red },
      ],
    },
    {
      say: 'Some machines refuse some inputs. √x has no real answer for −2, so −2 is outside its domain: the set of inputs it accepts.',
      set: { rule: 'sqrt', x: -2 },
      ms: 10000,
    },
    { say: '4 ÷ x refuses only one input: 0, because nothing times 0 makes 4.', set: { rule: 'inv', x: 0 }, ms: 8000 },
  ],
};

// ---------------------------------------------------------------------------
// MATE 100. Why atoms bond: the energy well
// ---------------------------------------------------------------------------
const lj = (r, eps) => 4 * eps * ((1 / r) ** 12 - (1 / r) ** 6);
export const bonding_energy_well = extend(chemistry.bonding_energy_well, {
  ease: 1.8,
  beats: [
    {
      say: 'Two atoms, far apart. They barely notice each other. The curve shows their energy for each distance between them.',
      set: { r: 2.8, eps: 1, heat: 0 },
      ms: 9000,
      notes: [{ text: 'far apart: flat line, no push or pull', at: [5.4, 0.2], to: [1.2, -0.6] }],
    },
    {
      say: 'Let them drift closer. The energy goes down: they attract, like a ball rolling downhill.',
      set: { r: 1.5 },
      ms: 8500,
    },
    {
      say: 'Push them too close and the electron clouds shove back hard: the wall on the left shoots up.',
      set: { r: 0.98 },
      ms: 8500,
      notes: [{ text: 'too close: the electron clouds shove back hard', at: [-1.4, 1.6], to: [-5.8, 0.4], color: C.red }],
    },
    {
      say: 'In between is the bottom of the well. There the pull and the push cancel. That distance is the bond length.',
      set: { r: 1.122 },
      ms: 9500,
      notes: [{ text: 'bottom of the well = bond length', at: [-1.2, -3.4], to: [-5.2, -2.2], color: C.gold }],
    },
    {
      say: 'A deeper well means a stronger bond: more energy is needed to pull the atoms apart, and the material melts at a higher temperature.',
      set: { eps: 1.8 },
      ms: 10000,
    },
    {
      say: 'Add heat and the atoms rattle back and forth in the well. The well is lopsided, steep on the left and gentle on the right, so the average spacing creeps outward. That is why things expand when heated.',
      set: { eps: 1, heat: 0.6 },
      ms: 13000,
      notes: [{ text: 'heat makes them rattle; the lopsided well lets the average spacing creep outward → expansion', at: [1.6, 1.4], to: [-4.7, 0.9] }],
    },
    { say: 'Drag the glowing ball along the curve to set the distance yourself.', set: { heat: 0, r: 2.2 }, ms: 6000 },
  ],
  more(kit) {
    const sx = 10 / 2.3;
    const sy = 5 / 3.4;
    const ox = -6.4 - 0.9 * sx;
    const oy = -3.8 + 2.2 * sy;
    const h = kit.handle([0, 0], {
      color: C.yellow,
      r: 0.12,
      onDrag: ([x]) => ({ r: snap((x - ox) / sx, 0.01, 0.95, 3) }),
    });
    return (p) => {
      h.visible(p.heat < 0.05);
      h.set([ox + p.r * sx, oy + clamp(lj(p.r, p.eps), -2.2, 1.2) * sy]);
    };
  },
});

// ---------------------------------------------------------------------------
// GEO 02. Sine and cosine from walking round a circle
// ---------------------------------------------------------------------------
export const trig_unit_circle = extend(origins.trig_unit_circle, {
  ease: 1.6,
  beats: [
    {
      say: 'A circle of radius 1. Stand on it and walk anticlockwise. θ is how far round you have turned.',
      set: { theta: 0 },
      ms: 8000,
    },
    {
      say: 'Turn 30°. Your height above the middle line is called sin θ; your distance sideways is cos θ. At 30°, the height is exactly ½.',
      set: { theta: 30 },
      ms: 10000,
      notes: [
        { text: 'height = sin θ (½ at 30°)', at: [-1.0, 3.4], to: [-2.4, 0.7], color: C.red },
        { text: 'sideways = cos θ', at: [-4.0, -3.4], to: [-3.4, -0.1], color: C.green },
      ],
    },
    {
      say: 'Height and sideways are the two legs of a right triangle whose long side is 1. So sin² + cos² = 1, always: that is Pythagoras again.',
      set: { theta: 50 },
      ms: 10000,
    },
    {
      say: 'At 90° you are at the top: height 1, sideways 0. Hipparchus made tables like this around 140 BC to predict eclipses.',
      set: { theta: 90 },
      ms: 9500,
      notes: [{ text: 'at the top: sin = 1, cos = 0', at: [-0.8, 3.7], to: [-4.4, 2.5] }],
    },
    {
      say: 'Past 180° you are below the middle line, so the height is negative.',
      set: { theta: 240 },
      ms: 8000,
    },
    {
      say: 'Now record your height at every angle on the right. Going round the circle draws a wave: the sine wave.',
      set: { theta: 360 },
      ms: 11000,
      notes: [{ text: 'your height, recorded angle by angle, draws the sine wave', at: [3.8, 3.4], to: [-0.2, 1.3], color: C.red }],
    },
    {
      say: 'It is the shape of every vibration: sound, light, alternating current. Drag the point round the circle yourself.',
      set: { theta: 150 },
      ms: 8500,
    },
  ],
  more(kit) {
    const R = 2.4;
    const Cc = [-4.6, 0];
    const h = kit.handle([0, 0], {
      color: C.yellow,
      onDrag: ([x, y]) => {
        let d = (Math.atan2(y - Cc[1], x - Cc[0]) * 180) / Math.PI;
        if (d < 0) d += 360;
        return { theta: Math.round(d) };
      },
    });
    return (p) => {
      const r = (p.theta * Math.PI) / 180;
      h.set([Cc[0] + R * Math.cos(r), Cc[1] + R * Math.sin(r)]);
    };
  },
});

// ---------------------------------------------------------------------------
// CHEM 13. Weighing what you can't see: gravimetric analysis
// ---------------------------------------------------------------------------
export const gravimetric_steps = {
  ...um_chem1.gravimetric_steps,
  ease: 2,
  beats: [
    {
      say: 'How much chlorine is in a salt sample? You can’t pick out chlorine atoms, so you turn them into something you can weigh. Start: weigh 0.50 g of sample and dissolve it in water.',
      set: { step: 'dissolve', m: 0.5 },
      ms: 11000,
      notes: [{ text: 'the chloride is in there, dissolved and invisible', at: [1.4, 0.6], to: [-4.2, -1.4] }],
    },
    {
      say: 'Add silver nitrate. Every silver ion that meets a chloride ion locks into silver chloride, a white solid that does not dissolve. It sinks.',
      set: { step: 'precipitate' },
      ms: 10000,
      notes: [{ text: 'Ag⁺ meets Cl⁻ → white AgCl solid that sinks', at: [1.4, 0.4], to: [-4.2, -2.8] }],
    },
    {
      say: 'Pour it through a filter. The solid stays behind; the water and everything still dissolved runs through.',
      set: { step: 'filter' },
      ms: 8500,
    },
    {
      say: 'Wash it, then dry it in an oven and weigh it, again and again, until the mass stops changing. Then every drop of water is gone.',
      set: { step: 'dry' },
      ms: 9500,
      notes: [{ text: 'heat and reweigh until the mass stops changing', at: [-3.6, 1.2], to: [0.8, -1.4], color: C.red }],
    },
    {
      say: 'Weigh the dry silver chloride. About a quarter of its mass, 0.2474 of it, is chlorine, because chlorine is 35.45 of AgCl’s 143.32 mass units.',
      set: { step: 'weigh' },
      ms: 11000,
    },
    {
      say: 'Chlorine mass ÷ sample mass × 100 gives the percent chlorine. Theodore Richards used careful weighings like this to measure atomic weights, and won the 1914 Nobel Prize for it.',
      set: {},
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 102. How atoms stack in metals
// ---------------------------------------------------------------------------
export const crystal_lattice_3d = {
  ...chemistry.crystal_lattice_3d,
  camera: { kind: '3d', position: [8.5, 6.5, 11] },
  ease: 2,
  beats: [
    {
      say: 'In a metal, atoms sit in a regular repeating pattern: a crystal. The smallest box that repeats is called the unit cell. Here, a cube with an atom at each corner.',
      set: { structure: 'sc', cells: 1, size: 0.35 },
      ms: 10000,
    },
    {
      say: 'Grow the atoms until they touch. Atoms in simple cubic touch along each edge, yet only 52% of the space is filled. It is a loose way to pack.',
      set: { size: 1 },
      ms: 10000,
      notes: [{ text: 'corner atoms touch along each edge', at: [0, 3.6, 0], to: [0, 1.7, 1.6], color: C.blue }],
    },
    {
      say: 'Body-centred cubic, BCC, adds one atom in the very middle, touching all 8 corners. 68% filled. Iron at room temperature is BCC.',
      set: { structure: 'bcc', size: 0.35 },
      ms: 10000,
      notes: [{ text: 'the yellow centre atom touches all 8 corners', at: [0, 3.6, 0], to: [0, 0.4, 0], color: C.yellow }],
    },
    {
      say: 'Face-centred cubic, FCC, puts an atom in the middle of every face instead. Each atom has 12 neighbours.',
      set: { structure: 'fcc', size: 0.35 },
      ms: 9000,
      notes: [{ text: 'green: one atom in the middle of each face', at: [0, 3.6, 0], to: [0, 1.7, 0], color: C.green }],
    },
    {
      say: 'Grown until they touch, FCC fills 74% of space, the densest packing of equal spheres. Copper, aluminium and gold are FCC, and they bend easily.',
      set: { size: 1 },
      ms: 10000,
    },
    {
      say: 'Stack unit cells side by side and the pattern repeats in every direction: a whole crystal, built from one small box.',
      set: { cells: 3, size: 0.35 },
      cam: { position: [10, 7.5, 13] },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 06. Parabolas and their roots
// ---------------------------------------------------------------------------
export const quadratic_parabola_lab = extend(calculus.quadratic_parabola_lab, {
  ease: 2,
  beats: [
    { say: 'Square every number and plot it: y = x². The result is a U-shaped curve, a parabola. Its lowest point is the vertex.', set: { a: 1, b: 0, c: 0 }, ms: 9000 },
    {
      say: 'Subtract 4: y = x² − 4. The whole curve drops by 4, and now it crosses the x-axis at −2 and 2.',
      set: { c: -4 },
      ms: 9000,
      notes: [
        { text: 'a root is where the curve hits the axis', at: [-4.8, -2.4], to: [-2.0, -0.1], color: C.red },
        { text: 'the other root: x = 2', at: [4.6, -1.2], to: [2.1, -0.1], color: C.red },
      ],
    },
    { say: 'Those crossing points are the roots: the x values that make y = 0. Solving a quadratic equation means finding them.', set: {}, ms: 8500 },
    {
      say: 'y = x² + 5x + 6 = (x + 2)(x + 3). A product is zero only if one factor is zero, so the roots are −2 and −3.',
      set: { b: 5, c: 6 },
      ms: 10500,
      notes: [{ text: '(x + 2)(x + 3) = 0 → x = −2 or −3', at: [3.6, -2.0], to: [-2.1, -0.1], color: C.red }],
    },
    {
      say: 'Make a negative and the parabola flips upside down: an arch instead of a cup. y = −x² + 4 has roots at ±2.',
      set: { a: -1, b: 0, c: 4 },
      ms: 9500,
    },
    {
      say: 'Lift a cup high enough and it never touches the axis: no real roots. The test is b² − 4ac: when it is negative, there are none.',
      set: { a: 1, b: 2, c: 3 },
      ms: 10500,
      notes: [{ text: 'never touches the axis: no real roots', at: [3.8, -1.6], to: [-1.0, 0.9], color: C.red }],
    },
    { say: 'Drag the glowing vertex to move the whole parabola.', set: {}, ms: 6000 },
  ],
  more(kit) {
    // the plane in calculus.js: x 1 unit per world unit, y halved
    const cur = { a: 1 };
    const h = kit.handle([0, 0], {
      color: C.yellow,
      onDrag: ([x, y]) => {
        const a = cur.a || 1;
        const vx = snap(x, 0.25, -6, 6);
        const vy = y / 0.5;
        return { b: snap(-2 * a * vx, 0.5, -6, 6), c: snap(a * vx * vx + vy, 0.5, -8, 8) };
      },
    });
    return (p, t) => {
      cur.a = t.a;
      const a = Math.abs(p.a) < 1e-3 ? 1e-3 : p.a;
      const vx = -p.b / (2 * a);
      const vy = p.c - (p.b * p.b) / (4 * a);
      h.set([clamp(vx, -7, 7), clamp(vy, -9, 9) * 0.5]);
    };
  },
});

// ---------------------------------------------------------------------------
// MATE 110. The four families of materials, compared
// ---------------------------------------------------------------------------
export const family_bars = {
  ...um_mate1.family_bars,
  ease: 2,
  beats: [
    {
      say: 'Engineers sort solids into four families: metals, ceramics, polymers (plastics and rubbers) and composites. Compare them one property at a time. First, density: how heavy a fixed volume is.',
      set: { prop: 'rho' },
      ms: 11000,
    },
    {
      say: 'Metals are heavy, ceramics middling, polymers and wood light. Carbon fibre composite weighs about a fifth as much as steel for the same size.',
      set: {},
      ms: 9500,
      notes: [{ text: 'carbon fibre: a fifth the weight of steel', at: [3.8, -1.4], to: [-0.5, -1.0] }],
    },
    {
      say: 'Stiffness: how hard it is to stretch or bend. The scale jumps by ×10 at each grid line, because the range is so wide.',
      set: { prop: 'E' },
      ms: 9500,
      notes: [{ text: 'each grid step here is ×10', at: [5.0, -3.3], to: [2.6, -4.0] }],
    },
    {
      say: 'Ceramics are the stiffest. Polymers are hundreds of times floppier. Composites borrow their stiffness from the fibres inside them.',
      set: {},
      ms: 9500,
      notes: [{ text: 'polymers: hundreds of times floppier', at: [5.6, -1.7], to: [1.4, -2.6], color: C.green }],
    },
    {
      say: 'Melting point: ceramics survive furnace temperatures; polymers soften not far above boiling water.',
      set: { prop: 'Tm' },
      ms: 9000,
      notes: [
        { text: 'ceramics: furnace-proof', at: [3.4, -0.4], to: [4.2, 2.3], color: C.gold },
        { text: 'polymers soften just above boiling water', at: [3.2, -2.6], to: [-1.4, -1.8], color: C.green },
      ],
    },
    {
      say: 'Heat conduction: metals carry heat thousands of times better than foams and plastics. That is why a pan has a metal body and a plastic handle.',
      set: { prop: 'k' },
      ms: 10000,
    },
    { say: 'No family wins at everything. Choosing a material is always a trade-off, and that is most of a materials engineer’s job.', set: {}, ms: 8000 },
  ],
};
