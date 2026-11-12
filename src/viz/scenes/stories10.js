// Story versions, batch 10: weeks 28–31 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as materials from './materials';
import * as um_chem2 from './um_chem2';
import * as um_math2 from './um_math2';
import * as um_mate2 from './um_mate2';
import * as um_year3a from './um_year3a';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);

// ---------------------------------------------------------------------------
// MATH 23. Least squares: the best straight line
// ---------------------------------------------------------------------------
export const least_squares = extend(um_math2.least_squares, {
  ease: 1.6,
  beats: [
    {
      say: 'Real data never sits on a perfect line. Here: metal strength against grain size (the Hall–Petch plot). Which straight line fits best?',
      set: { m: 8, b: 150 },
      ms: 9500,
    },
    {
      say: 'Measure each point’s gap to the line, straight up or down. Then draw each gap as a real square. Our poor guess leaves a big total area.',
      set: {},
      ms: 10500,
      notes: [
        { text: 'each gap to the line, drawn as a real square', at: [-4.0, -2.2], to: [-4.4, -0.2], color: C.pink },
        { text: 'a poor guess: 22× the smallest total', at: [4.6, -0.6], to: [4.4, 2.6] },
      ],
    },
    {
      say: 'Steeper and lower: the squares shrink. Big gaps count most, because a gap twice as big makes a square four times the area.',
      set: { m: 16, b: 100 },
      ms: 10500,
      notes: [{ text: 'big gaps count most: their squares grow fastest', at: [-4.0, -2.2], to: [-4.4, -0.6], color: C.pink }],
    },
    {
      say: 'Keep adjusting until the total area of the squares is as small as it can be. That line is the least-squares line: slope 20, intercept 70 MPa. Legendre published the method in 1805; Gauss used it to find the lost asteroid Ceres.',
      set: { m: 20, b: 70 },
      ms: 12000,
      notes: [{ text: 'the least-squares line: no other line has less total area', at: [-4.0, -2.2], to: [-5.0, -0.4], color: C.gold }],
    },
    {
      say: 'Your turn: drag the two glowing points. The left one moves the line up and down; the right one tilts it. Watch the squares.',
      set: { m: 10, b: 120 },
      ms: 8000,
    },
  ],
  more(kit) {
    const sx = 0.72;
    const sy = 7.4 / 300;
    let cur = { m: 10, b: 120 };
    const hb = kit.handle([0, 0], { color: C.gold, onDrag: ([, y]) => ({ b: snap((y + 3.7) / sy, 1, 0, 200) }) });
    const hm = kit.handle([0, 0], { color: C.gold, onDrag: ([, y]) => ({ m: snap(((y + 3.7) / sy - cur.b) / 8, 0.5, 0, 40) }) });
    return (p) => {
      cur = p;
      hb.set([-7, -3.7 + p.b * sy]);
      hm.set([-7 + 8 * sx, -3.7 + (8 * p.m + p.b) * sy]);
    };
  },
});

// ---------------------------------------------------------------------------
// MATE 203. Quenching steel: the TTT diagram
// ---------------------------------------------------------------------------
export const ttt_cooling_curve_lab = {
  ...materials.ttt_cooling_curve_lab,
  ease: 1.6,
  beats: [
    {
      say: 'Hot steel above 727 °C is austenite: iron with carbon dissolved evenly inside it. What it becomes as it cools depends on how fast it cools.',
      set: { medium: 'furnace' },
      ms: 10000,
    },
    {
      say: 'This map, a TTT diagram, was first drawn by Bain and Davenport in 1930. Time runs left to right on a log scale. The C-shaped curves mark when the steel starts and finishes changing.',
      set: {},
      ms: 11500,
      notes: [{ text: 'a race: reach the bottom before hitting this C-shaped “nose”', at: [5.6, 0.4], to: [-3.9, 0.8], color: C.red }],
    },
    {
      say: 'Cool slowly in the furnace: the curve wanders right into the C-curves. Carbon has plenty of time to move, and the steel turns into soft, layered pearlite.',
      set: {},
      ms: 11000,
    },
    {
      say: 'Still air is faster, but it still crosses the C-curves: pearlite again, a bit finer and harder.',
      set: { medium: 'air' },
      ms: 9500,
      notes: [{ text: 'slow cooling crosses the C-curves → soft pearlite', at: [5.6, 0.4], to: [-0.5, 1.3], color: C.red }],
    },
    {
      say: 'Oil cools faster still.',
      set: { medium: 'oil' },
      ms: 7000,
    },
    {
      say: 'Water quench: the curve dives past the nose before anything can happen. Carbon is trapped, and the iron snaps into martensite: very hard, but brittle.',
      set: { medium: 'water' },
      ms: 11000,
      notes: [{ text: 'water quench dodges the nose → hard martensite', at: [5.6, 0.4], to: [-5.1, 0.4], color: C.blue }],
    },
    {
      say: 'That is why a blacksmith quenches a blade, then gently reheats it, tempering, to trade a little hardness for toughness.',
      set: {},
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 24. The t-test: is the difference real?
// ---------------------------------------------------------------------------
export const t_test = {
  ...um_math2.t_test,
  ease: 1.6,
  beats: [
    {
      say: 'A new process is supposed to make stronger rods. Test 5 old rods and 5 new ones. The new average is higher. But is that real, or just luck?',
      set: { n: 5, diff: 10 },
      ms: 10500,
    },
    {
      say: 'The rods scatter a lot, as much as the 10 MPa gain. With so few, luck alone could easily make this gap.',
      set: {},
      ms: 10000,
      notes: [{ text: 'means 10 MPa apart, but the dots spread wider', at: [-4.0, -3.8], to: [-3.4, -0.7], color: C.green }],
    },
    {
      say: 't measures the gap in units of the scatter. p is the chance of seeing a gap this big if there were really no difference. Here p = 0.18: not convincing.',
      set: {},
      ms: 11500,
      notes: [{ text: 'p = 0.18: not convincing', at: [1.6, 2.6], to: [4.1, 3.2], color: C.pink }],
    },
    {
      say: 'William Gosset worked this out in 1908, testing barley at the Guinness brewery. His employer made him publish as “Student”, so it is still called Student’s t.',
      set: { n: 10 },
      ms: 11000,
    },
    {
      say: 'Thirty rods each. The same 10 MPa gain now clears the scatter: t lands far out in the tail, and p drops far below 0.05.',
      set: { n: 30 },
      ms: 10500,
      notes: [{ text: 't lands far out in the tail', at: [2.2, 3.0], to: [6.8, 1.0], color: C.pink }],
    },
    {
      say: 'Now no true difference at all. The averages still differ a little by luck, but p stays large. A good test rarely cries “real!” when nothing is there.',
      set: { diff: 0 },
      ms: 10500,
      notes: [{ text: 'no real difference, and p stays large', at: [-4.0, 3.9], color: C.pink }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 302. Griffith: why cracks matter
// ---------------------------------------------------------------------------
export const griffith_fracture_composite_lab = {
  ...materials.griffith_fracture_composite_lab,
  ease: 1.4,
  beats: [
    {
      say: 'Glass in theory should be thousands of times stronger than it is. In 1921 A. A. Griffith found why: tiny cracks.',
      set: { mat: 'al', a: 2, s: 150 },
      ms: 9500,
    },
    {
      say: 'Pull on a plate with a crack. The stress has to flow around it and piles up at the sharp tips.',
      set: {},
      ms: 9000,
      notes: [{ text: 'stress piles up at the crack tips', at: [4.6, 1.4], to: [4.1, 0.1], color: C.red }],
    },
    {
      say: 'The breaking stress falls as the crack grows: σ_f = K_IC ÷ √(πa). K_IC, the toughness, is how well the material resists a crack. This aluminium plate with a 2 mm crack holds 150 MPa easily.',
      set: {},
      ms: 12000,
      notes: [{ text: 'longer crack → lower breaking stress', at: [-2.6, 1.6], to: [-5.0, -0.2] }],
    },
    { say: 'Let the crack grow, as fatigue does in service…', set: { a: 8 }, ms: 7500 },
    {
      say: 'At 15 mm, the same 150 MPa is now above the curve. The plate fails suddenly, without warning. This is how the Comet airliners broke up in 1954.',
      set: { a: 15 },
      ms: 11000,
      notes: [{ text: '15 mm crack: 150 MPa is now above the curve → it breaks', at: [-2.6, 1.6], to: [-1.5, -1.8], color: C.red }],
    },
    {
      say: 'Tougher structural steel, K_IC ≈ 50, survives the same crack. Toughness, not just strength, keeps bridges and ships safe.',
      set: { mat: 'steel' },
      ms: 10000,
    },
    {
      say: 'Glass is the other extreme, K_IC ≈ 0.75. A 1 mm scratch drops its strength to about 13 MPa. That is why a glazier scores glass before snapping it.',
      set: { mat: 'glass', a: 1, s: 20 },
      ms: 11000,
      notes: [{ text: 'glass: a 1 mm scratch drops it to about 13 MPa', at: [-3.0, 1.0], to: [-6.9, -3.3], color: C.red }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 25. Slope fields and Euler's method
// ---------------------------------------------------------------------------
export const slope_field_cooling = {
  ...um_math2.slope_field_cooling,
  ease: 1.4,
  beats: [
    {
      say: 'A steel part at 850 °C is dropped into 50 °C oil. Newton’s law of cooling: the hotter it is compared to the oil, the faster it cools.',
      set: { q: 'oil', T0: 850, h: 0.5 },
      ms: 10000,
    },
    {
      say: 'So at every time and temperature we know the slope, the cooling rate. Draw it as a little dash everywhere: a slope field.',
      set: {},
      ms: 10000,
      notes: [{ text: 'each dash: the cooling rate at that time and temperature', at: [2.6, 2.6] }],
    },
    {
      say: 'The true temperature curve follows the dashes, like a leaf following a stream: T = 50 + 800e^(−0.05t).',
      set: {},
      ms: 10000,
      notes: [{ text: 'the true curve follows the dashes', at: [2.0, -0.4], to: [-2.6, 0.8], color: C.gold }],
    },
    {
      say: 'Without a formula, a computer walks. Euler’s method (1768): read the slope, walk straight for a step, read again. With tiny steps, the pink path sits right on the curve.',
      set: {},
      ms: 11500,
    },
    {
      say: 'With 10-second steps, each straight walk cuts the corner: it cools too fast.',
      set: { h: 10 },
      ms: 9500,
      notes: [{ text: 'straight 10 s steps cut the corner: it cools too fast', at: [2.0, 0.6], to: [-2.3, -0.6], color: C.pink }],
    },
    {
      say: 'In water the cooling is faster. With 10-second steps, each step overshoots below 50 °C, then back: nonsense. Simulations must choose their steps with care.',
      set: { q: 'water' },
      ms: 11000,
      notes: [{ text: 'water + big steps: it overshoots below 50 °C', at: [2.6, -0.8], to: [-4.4, -3.0], color: C.red }],
    },
    { say: 'Smaller steps fix it.', set: { h: 2 }, ms: 7000 },
  ],
};

// ---------------------------------------------------------------------------
// ENG 3. A tensile test in a spreadsheet
// ---------------------------------------------------------------------------
export const spreadsheet_fit = {
  ...um_mate2.spreadsheet_fit,
  ease: 2,
  beats: [
    {
      say: 'A tensile test machine pulls an aluminium bar and records two things: the load in newtons, and how far the bar stretched. Columns A and B.',
      set: { n: 12 },
      ms: 10000,
    },
    {
      say: 'Columns C and D are formulas. Stress = load ÷ 20 mm² of cross-section. Strain = stretch ÷ the 50 mm length. Each row becomes one dot on the chart.',
      set: {},
      ms: 11000,
      notes: [{ text: 'each row of the sheet becomes one dot', at: [5.4, 1.0], to: [4.5, 2.5] }],
    },
    {
      say: 'Stiffness, Young’s modulus E, is the slope of the straight part. Add a trendline through all 12 rows…',
      set: {},
      ms: 9000,
    },
    {
      say: '…and it is wrong. The last rows are past yielding, where the bar stretches permanently. They drag the slope down to about a third of the true value.',
      set: {},
      ms: 11000,
      notes: [{ text: 'fitting all 12 rows bends the line: the slope is a third too low', at: [5.4, 0.4], to: [3.6, 0.9], color: C.red }],
    },
    {
      say: 'Use only the first 7 rows, the straight elastic part. The slope gives E ≈ 70 GPa, the handbook value for aluminium, and R² ≈ 0.999.',
      set: { n: 7 },
      ms: 11000,
      notes: [{ text: 'only the straight first 7 rows: E ≈ 70 GPa', at: [5.4, 0.6], to: [2.45, 0.6], color: C.green }],
    },
    {
      say: 'R² close to 1 means the points sit almost exactly on the line. Choosing which data to fit is part of the engineering.',
      set: {},
      ms: 9000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 17. The Keeling curve
// ---------------------------------------------------------------------------
export const co2_keeling = {
  ...um_chem2.co2_keeling,
  ease: 2,
  beats: [
    {
      say: 'In 1958 Charles David Keeling began measuring carbon dioxide in the air on Mauna Loa, a volcano in Hawaii, far from cities and factories. First reading: about 315 parts per million.',
      set: { yr: 1958, zoom: 'all' },
      ms: 11500,
      notes: [{ text: '1958: about 315 ppm', at: [-4.0, -1.2], to: [-6.9, -2.3] }],
    },
    {
      say: 'Before industry, air bubbles trapped in old ice show it was about 280 ppm.',
      set: {},
      ms: 8500,
    },
    {
      say: 'Year after year it climbs. By 1990, about 354 ppm, and rising faster each decade.',
      set: { yr: 1990 },
      ms: 10000,
      notes: [{ text: '1990: rising faster every decade', at: [-2.0, 1.6], to: [-0.6, -0.6], color: C.red }],
    },
    {
      say: 'Zoom in on one year. CO₂ falls each northern summer as forests grow and draw it in, then rises again in winter when leaves fall and rot. The planet breathes.',
      set: { yr: 2020, zoom: 'one' },
      ms: 11500,
      notes: [{ text: 'summer: forests grow and draw CO₂ down', at: [4.6, 1.4], to: [3.0, -1.0], color: C.green }],
    },
    {
      say: 'Mostly from burning coal, oil and gas, it passed 400 ppm in the 2010s and today is over 420 ppm, about 50% above the pre-industrial level.',
      set: { yr: 2025, zoom: 'all' },
      ms: 11000,
      notes: [{ text: 'today: over 420 ppm, about 50% above pre-industrial', at: [-1.6, 2.6], to: [6.3, 2.9], color: C.red }],
    },
    {
      say: 'Making steel and cement each give off a large share of the world’s CO₂. Cutting that is one of the biggest jobs waiting for materials engineers.',
      set: {},
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 26. Damped oscillations
// ---------------------------------------------------------------------------
export const damped_oscillator = {
  ...um_math2.damped_oscillator,
  ease: 1.4,
  beats: [
    {
      say: 'A mass on a spring, with no friction, would bounce forever. Real systems have damping: something that drains energy, like a piston in oil.',
      set: { z: 0 },
      ms: 9500,
    },
    {
      say: 'Light damping, ζ = 0.1. The mass rings up and down, each swing a little smaller: underdamped, like a guitar string.',
      set: { z: 0.1 },
      ms: 10000,
      notes: [{ text: 'each swing a little smaller: underdamped', at: [5.0, -1.6], to: [4.2, 0.3], color: C.gold }],
    },
    {
      say: 'More damping, ζ = 0.4: one overshoot, then it settles. A car’s shock absorbers aim around here, so a bump fades quickly.',
      set: { z: 0.4 },
      ms: 10000,
    },
    {
      say: 'ζ = 1, critical damping: back to rest as fast as possible without ever passing it. Instrument needles aim near here.',
      set: { z: 1 },
      ms: 10000,
      notes: [{ text: 'back to rest as fast as possible, without passing it', at: [3.6, 1.6], to: [0.3, 0.0], color: C.gold }],
    },
    {
      say: 'ζ = 2.5, overdamped. Too much damping makes it creep back slowly, like a door closer set too stiff.',
      set: { z: 2.5 },
      ms: 10000,
      notes: [{ text: 'too much damping: it creeps back slowly', at: [4.2, 1.4], to: [2.0, 0.3], color: C.gold }],
    },
    {
      say: 'One equation covers all of these: m x″ + c x′ + k x = 0. The same maths describes circuits, bridges in wind, and buildings in earthquakes.',
      set: { z: 0.2 },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 27. Matrices move the whole plane
// ---------------------------------------------------------------------------
export const matrix_transform = extend(um_math2.matrix_transform, {
  ease: 1.6,
  beats: [
    {
      say: 'A matrix is a recipe for moving every point of the plane at once. Watch only two arrows: green (1, 0) and red (0, 1). Where they land decides everything.',
      set: { a: 1, b: 0, c: 0, d: 1 },
      ms: 10500,
    },
    {
      say: 'The first column of the matrix is where green lands. The second column is where red lands. The grid lines follow, staying straight and evenly spaced.',
      set: { a: 1.5, b: 0, c: 0.5, d: 1 },
      ms: 11000,
    },
    {
      say: 'A shear: green stays put, red leans over to (1, 1). The square becomes a slanted parallelogram, but its area stays 1. That area factor is the determinant.',
      set: { a: 1, b: 1, c: 0, d: 1 },
      ms: 11000,
      notes: [
        { text: '(0, 1) leans over to (1, 1)', at: [-1.8, 3.0], to: [0.8, 0.9], color: C.red },
        { text: 'same base, same height: the area stays 1', at: [4.0, -1.6], to: [1.2, 0.5], color: C.gold },
      ],
    },
    {
      say: 'Stretch 2 sideways and 1.5 upward: every area grows 3 times. The determinant is 2 × 1.5 = 3.',
      set: { a: 2, b: 0, c: 0, d: 1.5 },
      ms: 10000,
      notes: [{ text: 'stretched 2 × 1.5: every area grows 3 times', at: [4.2, -1.6], to: [1.2, 0.8], color: C.gold }],
    },
    {
      say: 'A quarter turn: green goes to (0, 1). Turning a crystal’s axes is a matrix like this, and areas do not change.',
      set: { a: 0, b: -1, c: 1, d: 0 },
      ms: 10000,
      notes: [{ text: 'a quarter turn: (1, 0) → (0, 1), and the area is unchanged', at: [4.2, -1.6], to: [0.0, 0.8], color: C.green }],
    },
    {
      say: 'Put both arrows on one line and the whole plane is squashed flat. The area is 0, and so is the determinant. Drag the arrow tips and try it.',
      set: { a: 1, b: 2, c: 0.5, d: 1 },
      ms: 11000,
    },
  ],
  more(kit) {
    const s = (v) => snap(v, 0.1, -2, 2);
    const hi = kit.handle([1, 0], { color: C.green, onDrag: ([x, y]) => ({ a: s(x), c: s(y) }) });
    const hj = kit.handle([0, 1], { color: C.red, onDrag: ([x, y]) => ({ b: s(x), d: s(y) }) });
    return (p) => {
      hi.set([p.a, p.c]);
      hj.set([p.b, p.d]);
    };
  },
});

// ---------------------------------------------------------------------------
// PHYS 201. Statics: balancing forces
// ---------------------------------------------------------------------------
export const force_balance = {
  ...um_year3a.force_balance,
  ease: 1.6,
  beats: [
    {
      say: 'A 500 N lamp hangs from two cables. It is not moving, so all the forces on it must cancel: that is statics, the base of every structure.',
      set: { t1: 45, t2: 45, W: 500 },
      ms: 10000,
    },
    {
      say: 'Draw the three forces as arrows and place them head to tail. If they close into a triangle, they cancel. Balance.',
      set: {},
      ms: 10000,
      notes: [{ text: 'head to tail, the arrows close a triangle → balance', at: [4.6, -2.6], to: [3.8, 0.4], color: C.gold }],
    },
    {
      say: 'At 45°, each cable pulls with 354 N, less than the lamp’s weight, because both share the job of holding it up.',
      set: {},
      ms: 9500,
      notes: [{ text: 'each cable pulls 354 N, less than the 500 N lamp', at: [-0.6, -2.4], to: [-4.2, 0.4] }],
    },
    {
      say: 'Flatten the cables to 15°. Only a small part of each pull points upward, so each cable must pull 966 N, almost twice the lamp.',
      set: { t1: 15, t2: 15 },
      ms: 10500,
      notes: [{ text: 'flat cables: each must pull 966 N, almost twice the lamp', at: [-0.6, 2.4], to: [-4.6, 0.1], color: C.red }],
    },
    {
      say: 'That is why a washing line pulled tight can snap under a light load, and why power lines are left to sag.',
      set: {},
      ms: 9000,
    },
    {
      say: 'Uneven angles: the steeper cable carries more, here about 455 N against 251 N. The triangle still closes.',
      set: { t1: 60, t2: 25 },
      ms: 10500,
      notes: [{ text: 'the steeper cable carries more', at: [-0.4, 2.8], to: [-4.0, 1.4], color: C.blue }],
    },
  ],
};
