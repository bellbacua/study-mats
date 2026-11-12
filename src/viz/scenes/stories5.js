// Story versions, batch 5: weeks 12–15 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as origins from './origins';
import * as physics from './physics';
import * as calculus from './calculus';
import * as materials from './materials';
import * as um_chem1 from './um_chem1';
import * as um_math1 from './um_math1';
import * as um_mate1 from './um_mate1';
import * as um_physics from './um_physics';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);
const deg = (y, x) => {
  const d = (Math.atan2(y, x) * 180) / Math.PI;
  return d < 0 ? d + 360 : d;
};

// ---------------------------------------------------------------------------
// ENG 02. CAD: from a flat sketch to a solid
// ---------------------------------------------------------------------------
export const cad_extrude = {
  ...um_mate1.cad_extrude,
  ease: 1.8,
  beats: [
    {
      say: 'Every CAD model starts as a flat sketch. Here, an L shape drawn on the sketch plane, with every length fixed by a dimension. Its area is 9 cm².',
      set: { op: 'extrude', d: 0.5, ang: 360 },
      ms: 10000,
      notes: [{ text: 'the L sketch: 9 cm²', at: [-4.4, 3.4, 0], to: [-1.24, 2.2, -0.85], color: C.yellow }],
    },
    {
      say: 'Extrude it: push every point of the sketch straight out of the plane. Watch it grow to 4 cm deep.',
      set: { d: 4 },
      ms: 9000,
      notes: [{ text: 'every point pushed 4 cm straight out', at: [4.4, 2.8, 0], to: [0.81, 0.6, 2.0], color: C.yellow }],
    },
    {
      say: 'The volume is simply area × depth: 9 × 4 = 36 cm³. A solid made this way has the same cross-section all the way through, like a slice of bread.',
      set: {},
      ms: 10000,
    },
    {
      say: 'The second basic move is revolve. Draw half the outline of a round part next to an axis…',
      set: { op: 'revolve', ang: 30 },
      ms: 8000,
    },
    {
      say: '…and sweep it round the axis. A quarter turn, then three quarters…',
      set: { ang: 270 },
      ms: 9000,
      notes: [{ text: 'the sketch swept 270° around the red axis', at: [-4.2, 3.4, 0], to: [0, 2.6, 0], color: C.red }],
    },
    {
      say: '…then the full 360°: a flanged bushing. Anything round, like shafts, bolts and pulleys, starts as a revolve. Most machine parts are built from just these two moves.',
      set: { ang: 360 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 10. Radians, and the sine wave unrolled from a circle
// ---------------------------------------------------------------------------
export const sine_wave_unwrap = {
  ...um_math1.sine_wave_unwrap,
  ease: 2,
  beats: [
    {
      say: 'A point goes round a circle at a steady speed. Watch only its height.',
      set: { A: 1, w: 1, phi: '0' },
      ms: 7500,
      notes: [{ text: 'the dot’s height…', at: [-4.4, 3.4], to: [-5.4, 1.8] }],
    },
    {
      say: 'Carry that height across and draw it against time. The circle unrolls into a sine wave.',
      set: {},
      ms: 9000,
      notes: [{ text: '…drawn out over time = the sine wave', at: [0.6, 3.3], to: [-2.2, 1.8], color: C.gold }],
    },
    {
      say: 'Angles here are in radians: the length of arc walked on a circle of radius 1. One full turn is 2π ≈ 6.28 radians. This point turns 1 radian each second, so one cycle takes 2π seconds.',
      set: {},
      ms: 12000,
    },
    {
      say: 'Make the circle bigger and the wave gets taller. That height is the amplitude, A.',
      set: { A: 2 },
      ms: 8000,
    },
    {
      say: 'Spin twice as fast, ω = 2 radians per second. The wave squeezes: one cycle now takes 2π ÷ 2 = π seconds.',
      set: { A: 1, w: 2 },
      ms: 9500,
      notes: [{ text: 'twice as fast → squeezed: one cycle takes π seconds', at: [2.4, -3.2], to: [3.8, -1.4], color: C.gold }],
    },
    {
      say: 'Start a quarter turn ahead, φ = π/2, and the peak arrives early. That shifted wave is the cosine: sine and cosine are one wave, just started at different points.',
      set: { w: 1, phi: 'q' },
      ms: 11000,
      notes: [{ text: 'a quarter turn ahead: the peak comes early. That is cosine.', at: [3.0, -3.0], to: [-0.3, 2.0], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 101. Pulling a bar until it breaks
// ---------------------------------------------------------------------------
export const stress_strain_curve_lab = {
  ...materials.stress_strain_curve_lab,
  ease: 1.4,
  beats: [
    {
      say: 'A tensile test: grip a steel bar at both ends and pull, slowly, while measuring the force and the stretch. Stress is force per area; strain is the stretch as a fraction of the length.',
      set: { mat: 'steel', pull: 0 },
      ms: 11000,
    },
    {
      say: 'At first stress rises in a straight line: twice the pull, twice the stretch. Let go here and the bar springs back to its old length. That is Hooke’s law, 1678.',
      set: { pull: 0.06 },
      ms: 10500,
      notes: [{ text: 'straight line: let go and it springs back', at: [-2.6, -1.4], to: [-6.9, -1.6] }],
    },
    {
      say: 'Then the line bends over. This is the yield point: layers of atoms start to slip past each other, carried by defects called dislocations. Now the stretch is permanent.',
      set: { pull: 0.18 },
      ms: 11000,
      notes: [{ text: 'yield: atoms start slipping for good', at: [-3.6, -1.6], to: [-6.8, 0.3], color: C.red }],
    },
    {
      say: 'Keep pulling and the stress still climbs: the tangled dislocations block each other, so the metal gets stronger as it stretches. This is work hardening.',
      set: { pull: 0.55 },
      ms: 11000,
      notes: [{ text: 'and it gets stronger as it stretches', at: [1.8, 0.8], to: [-5.4, 2.1], color: C.gold }],
    },
    {
      say: 'The top of the curve is the ultimate tensile strength. After it, the bar thins in one spot, a neck, and the force it can carry falls…',
      set: { pull: 0.8 },
      ms: 10000,
      notes: [{ text: 'UTS: the highest point', at: [0.4, 3.4], to: [-3.9, 2.9], color: C.gold }],
    },
    {
      say: '…until it breaks.',
      set: { pull: 1 },
      ms: 6000,
      notes: [{ text: 'necking: it thins in one spot, then breaks', at: [1.6, -1.6], to: [5.0, 0.1], color: C.red }],
    },
    {
      say: 'Glass is different. Its line goes straight up and it snaps while still springy, with no yield and no warning. That is what “brittle” means.',
      set: { mat: 'glass', pull: 1 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// NUM 09. i: the quarter turn
// ---------------------------------------------------------------------------
export const complex_plane = extend(origins.complex_plane, {
  ease: 2,
  beats: [
    { say: 'An arrow from 0 to 2 on the number line.', set: { a: 2, b: 0, m: 'one' }, ms: 5500 },
    {
      say: 'Multiplying by −1 turns it right round, 180°, so it points at −2.',
      set: { m: 'neg' },
      ms: 8000,
      notes: [{ text: '× (−1) = a half turn', at: [-4.4, 2.6], to: [-0.4, 1.0], color: C.gold }],
    },
    {
      say: 'Is there a number that turns only halfway, 90°? Doing it twice would be a half turn, so that number squared would be −1. No number on the line does that.',
      set: {},
      ms: 11000,
      notes: [{ text: 'is there a number that turns only 90°?', at: [4.0, 2.4], color: C.red }],
    },
    {
      say: 'So step off the line. Call the quarter turn i. 2 × i = 2i points straight up, and i × i = −1. Bombelli worked with these numbers in 1572 to solve equations whose answers were perfectly real.',
      set: { m: 'i' },
      ms: 12000,
      notes: [
        { text: '× i = a quarter turn: 2 becomes 2i', at: [-3.6, 2.8], to: [-0.1, 1.9], color: C.gold },
        { text: 'twice = a half turn = × (−1), so i² = −1', at: [4.0, -2.4] },
      ],
    },
    {
      say: 'A complex number like 2 + i is just a point on this plane: 2 across, 1 up.',
      set: { a: 2, b: 1, m: 'one' },
      ms: 8000,
    },
    {
      say: 'Multiplying by 1 + i turns it 45° and stretches it √2 times. Every complex multiplication is a turn plus a stretch. Engineers use exactly this for alternating current and waves.',
      set: { m: 'onePlusI' },
      ms: 12000,
      notes: [{ text: 'turned 45° and stretched √2 times', at: [-3.4, 2.6], to: [0.4, 1.4], color: C.gold }],
    },
    { say: 'Drag the tip of the blue arrow and watch the yellow one turn with it.', set: { m: 'i' }, ms: 6500 },
  ],
  more(kit) {
    const h = kit.handle([0, 0], { color: C.blue, onDrag: ([x, y]) => ({ a: snap(x, 0.5, -3, 3), b: snap(y, 0.5, -3, 3) }) });
    return (p) => h.set([p.a, p.b]);
  },
});

// ---------------------------------------------------------------------------
// MATH 11. Adding forces head to tail
// ---------------------------------------------------------------------------
const vec = (F, a) => [F * Math.cos((a * Math.PI) / 180), F * Math.sin((a * Math.PI) / 180)];
export const vector_add = extend(um_math1.vector_add, {
  ease: 2,
  beats: [
    {
      say: 'A force has a size and a direction, so we draw it as an arrow. Here, two ropes pull on one ring: a, 4 newtons, and b, 3 newtons.',
      set: { F1: 4, a1: 20, F2: 3, a2: 110 },
      ms: 10000,
    },
    {
      say: 'To add them, slide b along until its tail sits on a’s tip. Don’t turn it, just move it.',
      set: {},
      ms: 8000,
      notes: [{ text: 'slide b so its tail sits on a’s tip', at: [4.6, 0.6], to: [2.1, 0.0], color: C.gold }],
    },
    {
      say: 'The arrow from the very start to the very end is the sum, a + b: the single pull that does the same job as both ropes together.',
      set: {},
      ms: 9500,
      notes: [{ text: 'start → finish = the sum', at: [-3.6, 2.4], to: [0.8, 1.0], color: C.green }],
    },
    {
      say: 'Point both ropes the same way and the sizes simply add: 4 + 3 = 7 N.',
      set: { a1: 30, a2: 30 },
      ms: 8000,
      notes: [{ text: 'same direction: 4 + 3 = 7 N', at: [-3.4, 2.0], to: [1.6, 0.5], color: C.green }],
    },
    {
      say: 'Point them opposite ways and they fight: 4 − 3 = 1 N.',
      set: { a2: 210 },
      ms: 7500,
      notes: [{ text: 'opposite: they fight, 4 − 3 = 1 N left', at: [3.6, -2.4], to: [0.5, -0.4], color: C.green }],
    },
    {
      say: 'At right angles the sum is 5 N, not 7: the 3, 4, 5 triangle again. Direction matters as much as size.',
      set: { a1: 0, a2: 90 },
      ms: 9000,
    },
    { say: 'Drag the tips of a and b to try your own pulls.', set: { a1: 20, a2: 110 }, ms: 6000 },
  ],
  more(kit) {
    const S = 0.6;
    const O = [0, -0.6];
    const cur = { F1: 4, a1: 20 };
    const ha = kit.handle([0, 0], {
      color: C.blue,
      onDrag: ([x, y]) => ({ F1: snap(Math.hypot(x - O[0], y - O[1]) / S, 0.5, 1, 6), a1: snap(deg(y - O[1], x - O[0]), 5, 0, 355) }),
    });
    const hb = kit.handle([0, 0], {
      color: C.yellow,
      onDrag: ([x, y]) => {
        const a = vec(cur.F1, cur.a1);
        const tx = O[0] + a[0] * S;
        const ty = O[1] + a[1] * S;
        return { F2: snap(Math.hypot(x - tx, y - ty) / S, 0.5, 1, 6), a2: snap(deg(y - ty, x - tx), 5, 0, 355) };
      },
    });
    return (p, t) => {
      cur.F1 = t.F1;
      cur.a1 = t.a1;
      const a = vec(p.F1, p.a1);
      const b = vec(p.F2, p.a2);
      ha.set([O[0] + a[0] * S, O[1] + a[1] * S]);
      hb.set([O[0] + (a[0] + b[0]) * S, O[1] + (a[1] + b[1]) * S]);
    };
  },
});

// ---------------------------------------------------------------------------
// CHEM 07. How much dissolves, and growing crystals
// ---------------------------------------------------------------------------
export const solubility_beaker = {
  ...um_chem1.solubility_beaker,
  ease: 1.8,
  beats: [
    {
      say: 'Stir potassium nitrate into 100 g of water at 20 °C. The first grains vanish: they break up into ions spread through the water.',
      set: { g: 20, T: 20 },
      ms: 9000,
    },
    {
      say: 'Add more, 40 g in all. Only about 32 g dissolves. The rest stays on the bottom: the water is saturated, it can hold no more.',
      set: { g: 40 },
      ms: 10000,
      notes: [{ text: 'only ~32 g dissolves; the rest sits on the bottom', at: [-2.6, -3.8], to: [-4.0, -2.6] }],
    },
    {
      say: 'The curve on the right shows how much can dissolve at each temperature. Any point above it means more than the water can hold.',
      set: {},
      ms: 9500,
      notes: [{ text: 'above the curve = more than the water can hold', at: [4.4, 2.6], to: [2.1, -2.0], color: C.red }],
    },
    {
      say: 'Heat it to 60 °C. Hot water can hold about 110 g, so even 100 g vanishes.',
      set: { g: 100, T: 60 },
      ms: 9000,
      notes: [
        { text: 'all 100 g has vanished', at: [-4.6, 3.4], to: [-4.6, 0.6] },
        { text: 'hot water holds far more: 110 g at 60 °C', at: [4.4, 2.8], to: [4.6, -0.5], color: C.green },
      ],
    },
    {
      say: 'Now let it cool to 30 °C. The water can no longer hold it all, and the extra comes back out as crystals.',
      set: { T: 30 },
      ms: 10000,
      notes: [
        { text: 'cooled: the extra comes back out as crystals', at: [-2.4, -3.8], to: [-4.2, -1.8] },
        { text: '100 g at 30 °C: far above the curve', at: [4.8, 2.6], to: [2.7, -0.5], color: C.red },
      ],
    },
    {
      say: 'Impurities, present in only small amounts, stay dissolved while the crystals grow. Filter the crystals off and you have a purer solid. Chemists call this recrystallisation.',
      set: {},
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 06. Ohm's law in a simple circuit
// ---------------------------------------------------------------------------
export const ohm_circuit = {
  ...physics.ohm_circuit,
  ease: 2,
  beats: [
    {
      say: 'A battery, a wire loop, a resistor and a bulb. The battery’s voltage is the push; the electrons (blue dots) drift round the loop.',
      set: { V: 12, R: 6 },
      ms: 9000,
      notes: [{ text: 'blue dots = electrons drifting round the loop', at: [-0.6, 0.4], to: [-2.2, -2.4] }],
    },
    {
      say: 'The resistor makes the current hard to push through. Its resistance is measured in ohms, Ω.',
      set: {},
      ms: 8000,
      notes: [{ text: 'the resistor: how hard current is to push through', at: [-4.8, 3.6], to: [-1.8, 2.4], color: C.red }],
    },
    {
      say: 'Ohm’s law, 1827: current = voltage ÷ resistance. 12 V ÷ 6 Ω = 2 amps.',
      set: {},
      ms: 8500,
    },
    {
      say: 'Halve the resistance to 3 Ω and the current doubles to 4 A. The electrons drift faster and the bulb glows brighter.',
      set: { R: 3 },
      ms: 9500,
      notes: [{ text: 'half the resistance → double the current: brighter', at: [-0.4, 0.2], to: [3.2, 0.0], color: C.gold }],
    },
    {
      say: 'The power is voltage × current: 12 × 4 = 48 watts, four times as much as before. Brightness grows faster than the current.',
      set: {},
      ms: 9500,
    },
    {
      say: 'Raise the resistance to 24 Ω: an eighth of the current, and the bulb is dim.',
      set: { R: 24 },
      ms: 8000,
      notes: [{ text: '8× the resistance → ⅛ the current: dim', at: [-0.4, 0.2], to: [3.9, 0.0], color: C.gold }],
    },
    {
      say: 'Doubling the battery voltage instead doubles the current. Materials whose resistance can be tuned over a huge range, semiconductors, are the subject of a later class.',
      set: { V: 24 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 07. Two equations, two lines, one crossing
// ---------------------------------------------------------------------------
export const linear_system_intersection = extend(calculus.linear_system_intersection, {
  ease: 2,
  beats: [
    {
      say: 'Two unknowns, two equations: y = x + 1 and y = −0.5x + 2.5. Each equation on its own is a whole line of points that fit it.',
      set: { m1: 1, b1: 1, m2: -0.5, b2: 2.5 },
      ms: 10000,
      notes: [{ text: 'every point on a line fits its equation', at: [-4.4, -2.4], to: [-2.2, -1.2] }],
    },
    {
      say: 'We need a point that fits both at once. There is only one: where the lines cross.',
      set: {},
      ms: 8000,
      notes: [{ text: 'on both lines at once: the solution', at: [5.2, 2.8], to: [1.1, 2.1], color: C.red }],
    },
    {
      say: 'Change the second equation to y = −x + 3. Algebra finds the crossing without a drawing: both equal y, so x + 1 = −x + 3. Then 2x = 2, x = 1 and y = 2.',
      set: { m2: -1, b2: 3 },
      ms: 12000,
      notes: [{ text: 'x + 1 = −x + 3 → x = 1, y = 2', at: [-4.4, 2.6], to: [0.9, 2.1], color: C.red }],
    },
    {
      say: 'Give both lines the same slope and they run side by side forever. Parallel lines never meet: no solution.',
      set: { m2: 1, b2: -2 },
      ms: 9000,
      notes: [{ text: 'same slope: parallel, never meet → no solution', at: [4.4, -2.4], color: C.red }],
    },
    {
      say: 'If the two equations describe the same line, every point fits both: infinitely many solutions.',
      set: { b2: 1 },
      ms: 8500,
    },
    { say: 'Drag where each line crosses the up-down axis and watch the crossing point move.', set: { m2: -0.5, b2: 2.5 }, ms: 6500 },
  ],
  more(kit) {
    const h1 = kit.handle([0, 0], { color: C.blue, onDrag: ([, y]) => ({ b1: snap(y, 0.5, -4, 4) }) });
    const h2 = kit.handle([0, 0], { color: C.yellow, onDrag: ([, y]) => ({ b2: snap(y, 0.5, -4, 4) }) });
    return (p) => {
      h1.set([0, p.b1]);
      h2.set([0, p.b2]);
    };
  },
});

// ---------------------------------------------------------------------------
// PHYS 07. Projectiles: two motions at once
// ---------------------------------------------------------------------------
export const projectile_launcher = extend(um_physics.projectile_launcher, {
  ease: 2,
  beats: [
    {
      say: 'Throw a ball at 30°. Galileo’s insight: its motion is two separate motions happening at once.',
      set: { a: 30, v: 18 },
      ms: 8500,
    },
    {
      say: 'Sideways, nothing pushes it, so its sideways speed (blue) never changes.',
      set: {},
      ms: 8000,
      notes: [{ text: 'sideways speed never changes', at: [1.2, -1.4], to: [-0.6, -3.3] }],
    },
    {
      say: 'Up and down, gravity pulls it. Its upward speed (red) shrinks, reaches zero at the top, flips, then grows downward. Together they make a parabola.',
      set: {},
      ms: 11000,
      notes: [{ text: 'up-down speed shrinks, flips, then grows downward', at: [-2.2, 1.6], to: [-1.7, -3.6], color: C.red }],
    },
    {
      say: 'Now 60° at the same speed. It flies higher and longer, yet it lands in exactly the same spot as at 30°. 30 + 60 = 90: such pairs always tie.',
      set: { a: 60 },
      ms: 11000,
      notes: [{ text: '60°: higher, but lands in the same spot', at: [3.6, -1.0], to: [-1.2, -3.5], color: C.gold }],
    },
    {
      say: 'Between them is 45°, which gives the longest throw for this speed: range = speed² ÷ g.',
      set: { a: 45 },
      ms: 9000,
      notes: [{ text: '45°: the farthest landing for this speed', at: [3.4, -1.2], to: [-0.3, -3.5], color: C.gold }],
    },
    {
      say: 'Throw faster and the range grows with the square of the speed: 1.4 times the speed, about twice the distance.',
      set: { v: 25 },
      ms: 9000,
    },
    { say: 'Drag the glowing point to aim and set the speed yourself.', set: { v: 18, a: 30 }, ms: 6000 },
  ],
  more(kit) {
    const O = [-7.3, -3.6];
    const K = 0.12; // world units per m/s for the aiming arrow
    const aim = kit.arrow(O, O, { color: C.yellow, width: 2, opacity: 0.6 });
    const h = kit.handle([0, 0], {
      color: C.yellow,
      onDrag: ([x, y]) => ({ a: snap(deg(y - O[1], x - O[0]), 5, 10, 80), v: snap(Math.hypot(x - O[0], y - O[1]) / K, 1, 5, 25) }),
    });
    return (p) => {
      const r = (p.a * Math.PI) / 180;
      const tip = [O[0] + Math.cos(r) * p.v * K, O[1] + Math.sin(r) * p.v * K];
      aim.set(O, tip);
      h.set(tip);
    };
  },
});

// ---------------------------------------------------------------------------
// MATH 08. Straightening a curve with logarithms
// ---------------------------------------------------------------------------
export const arrhenius_log_linearizer = {
  ...calculus.arrhenius_log_linearizer,
  ease: 1.4,
  beats: [
    {
      say: 'How fast a reaction goes depends on temperature. Here is a typical rate, k, plotted against temperature in kelvin.',
      set: { Ea: 120, morph: 0 },
      ms: 9000,
    },
    {
      say: 'From 500 to 1,000 K it seems hardly to move… then it explodes upward. A curve like this is hard to read, and hard to fit.',
      set: {},
      ms: 10000,
      notes: [
        { text: '500 → 1000 K: barely seems to move…', at: [-3.0, -1.4], to: [-2.2, -3.1], color: C.gold },
        { text: '…then it explodes. Hard to read.', at: [-1.0, 1.6], to: [3.9, -1.0] },
      ],
    },
    {
      say: 'Arrhenius (1889) wrote the rule: k = A × e^(−Ea / RT). Ea, the activation energy, is the energy hill each reaction must climb.',
      set: {},
      ms: 10500,
    },
    {
      say: 'Take the logarithm of both sides: ln k = ln A − (Ea/R) × (1/T). Now plot ln k against 1/T and watch the curve straighten.',
      set: { morph: 1 },
      ms: 11000,
      notes: [{ text: 'ln k against 1/T: a straight line', at: [-1.6, -2.2], to: [-1.0, 1.4] }],
    },
    {
      say: 'A straight line is easy to read: its slope is −Ea/R. Measure the slope, and you have measured the height of the energy hill.',
      set: {},
      ms: 10000,
    },
    {
      say: 'A reaction with a bigger hill, Ea = 220 kJ/mol, gives a steeper line: it speeds up much more sharply as you heat it.',
      set: { Ea: 220 },
      ms: 10000,
      notes: [{ text: 'bigger Ea → steeper line', at: [-1.6, -2.4], to: [-1.0, 0.4], color: C.green }],
    },
    {
      say: 'Taking logs to turn a curve into a straight line is one of the most useful tricks in science. You will use it again for diffusion and creep.',
      set: { Ea: 120 },
      ms: 9000,
    },
  ],
};
