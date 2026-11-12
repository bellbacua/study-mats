// Story versions, batch 12: year 3, middle.
import { C } from '../theme';
import * as um_year3a from './um_year3a';
import * as um_year3b from './um_year3b';

const Y = um_year3b;

// ---------------------------------------------------------------------------
// Trusses: pushing and pulling members
// ---------------------------------------------------------------------------
export const truss_bridge = {
  ...um_year3a.truss_bridge,
  ease: 1.6,
  beats: [
    {
      say: 'A truss is a frame of straight bars joined in triangles. A triangle cannot change shape without a bar changing length, so the frame stays rigid.',
      set: { j: 2, type: 'pratt' },
      ms: 10000,
    },
    {
      say: 'Hang 100 kN in the middle. Every bar is now either squeezed or stretched, and the thicker the line, the bigger the force.',
      set: {},
      ms: 9500,
    },
    {
      say: 'The top chord is squeezed (red) and the bottom chord is stretched (blue), like the top and bottom of a bending beam.',
      set: {},
      ms: 10000,
      notes: [
        { text: 'top chord: squeezed (red)', at: [-3.4, 3.2], to: [-2.0, 2.4], color: C.red },
        { text: 'bottom chord: stretched (blue)', at: [-2.6, -1.8], to: [-2.4, -0.8], color: C.blue },
      ],
    },
    {
      say: 'This is a Pratt truss (1844): its diagonals are pulled. Thin steel rods are good at pulling, so Pratt suits steel bridges.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Flip the diagonals and you get a Howe truss (1840). Now the diagonals are pushed and the verticals pulled: thick timber struts, with iron rods as ties.',
      set: { type: 'howe' },
      ms: 11000,
      notes: [{ text: 'Howe: diagonals pushed (red), verticals pulled (blue)', at: [3.6, 3.2], to: [1.6, 0.9], color: C.red }],
    },
    {
      say: 'Move the load near the left support. The left support now carries 75 kN of the 100, and the bars near it work hardest.',
      set: { j: 1, type: 'pratt' },
      ms: 10500,
      notes: [{ text: 'load near the left: the left support takes 75 kN', at: [-0.6, -3.2], to: [-6.0, -2.0], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Pourbaix diagram: when does iron rust?
// ---------------------------------------------------------------------------
export const pourbaix_iron = {
  ...Y.pourbaix_iron,
  ease: 1.6,
  beats: [
    {
      say: 'Will steel rust? It depends on two things: how acidic the water is (pH, left to right) and the electrical potential of the metal (up and down). Marcel Pourbaix mapped them in the 1940s.',
      set: { pH: 7, E: -0.3 },
      ms: 12000,
    },
    {
      say: 'Steel in neutral water sits in the red region: corrosion. Iron atoms leave as Fe²⁺ ions, and rust follows.',
      set: {},
      ms: 10000,
      notes: [{ text: 'neutral water at −0.3 V: corrosion, iron dissolves', at: [-4.0, 2.6], to: [-2.8, -0.9], color: C.red }],
    },
    {
      say: 'Push the potential down, below about −0.62 V. Bolt on zinc blocks, or feed in a small current, and the point drops into immunity: bare iron is the stable form.',
      set: { E: -0.8 },
      ms: 11500,
      notes: [{ text: 'below −0.62 V: immunity, bare iron is stable', at: [-1.0, -1.6], to: [-2.8, -2.9], color: C.green }],
    },
    {
      say: 'That is cathodic protection. Ship hulls, buried pipelines and piers in Philippine harbours are protected this way.',
      set: { pH: 8 },
      ms: 10000,
    },
    {
      say: 'Inside concrete the pH is about 12.5, very alkaline. At ordinary potentials that is the blue passive region: a thin oxide film seals the steel. That is why reinforcing bars last.',
      set: { pH: 12.5, E: 0 },
      ms: 12000,
      notes: [{ text: 'concrete, pH 12.5: passive, an oxide film seals the steel', at: [-2.6, 2.6], to: [0.8, -0.3], color: C.blue }],
    },
    {
      say: 'But if seawater salt or carbon dioxide lowers the pH, the film breaks and the bars rust from inside, cracking the concrete.',
      set: { pH: 8.5 },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// The gyroscope: precession
// ---------------------------------------------------------------------------
export const gyroscope = {
  ...Y.gyroscope,
  ease: 1.6,
  beats: [
    {
      say: 'A wheel spinning at 1,000 rpm, its axle held only at one end. Without spin it would simply fall.',
      set: { rpm: 1000, r: 0.2 },
      ms: 9000,
    },
    {
      say: 'Instead, gravity pulls it down, and the axle swings sideways around the post: once every 3.8 s. This slow swing is called precession.',
      set: {},
      ms: 11000,
      notes: [
        { text: 'gravity pulls the wheel down…', at: [-5.4, -1.8], to: [-4.1, 0.1], color: C.green },
        { text: '…yet the axle swings sideways round the post', at: [1.8, 1.6], to: [-1.2, 0.9], color: C.gold },
      ],
    },
    {
      say: 'Why? The spinning wheel has angular momentum, an arrow along its axle. Gravity’s twist does not tip that arrow down; it pushes its tip sideways, a little every instant.',
      set: {},
      ms: 12000,
    },
    {
      say: 'Triple the spin to 3,000 rpm. The arrow is three times longer, so the same twist turns it three times more slowly: once every 11 s.',
      set: { rpm: 3000 },
      ms: 11000,
      notes: [{ text: '3× the spin → it swings round 3× more slowly', at: [1.8, 1.6], to: [-1.2, 0.9], color: C.gold }],
    },
    {
      say: 'Shorten the overhang to 0.1 m: half the twist, half the precession speed. Foucault named the gyroscope in 1852; today the same idea steadies ships, satellites and phone cameras.',
      set: { rpm: 1000, r: 0.1 },
      ms: 12000,
      notes: [{ text: 'shorter arm: half the torque, half the swing speed', at: [1.8, 1.6], to: [-2.6, 0.6], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Kirchhoff's laws
// ---------------------------------------------------------------------------
export const kirchhoff_circuit = {
  ...Y.kirchhoff_circuit,
  ease: 1.6,
  beats: [
    {
      say: 'Two batteries and three resistors, joined at a junction in the middle. Which way does current flow, and how much? Ohm’s law alone cannot say.',
      set: { V2: 12, R3: 2 },
      ms: 10500,
    },
    {
      say: 'Gustav Kirchhoff, 1845, as a student. Law one: at any junction, what flows in must flow out. Charge never piles up.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Here both batteries push current into the junction, and together they drive 1.6 A down through the middle resistor.',
      set: {},
      ms: 10000,
      notes: [{ text: 'both batteries push in: 1.6 A down the middle', at: [-4.2, -1.2], to: [-1.4, -0.6], color: C.green }],
    },
    {
      say: 'Law two: go around any closed loop and the voltage rises and drops add to zero, like walking a circuit of hills and ending at the same height.',
      set: {},
      ms: 10500,
    },
    {
      say: 'Lower the right battery to 6 V. The junction now sits at about 6.5 V, above it, so current is pushed backwards into it: it is being charged. A car’s alternator charges its battery the same way.',
      set: { V2: 6 },
      ms: 12000,
      notes: [{ text: 'junction above 6 V: current is pushed back into this battery (charging it)', at: [5.8, 0.0], to: [2.6, -0.6], color: C.pink }],
    },
    {
      say: 'Whatever the settings, the current law holds: I₁ + I₃ = I₂.',
      set: { V2: 9, R3: 6 },
      ms: 9000,
      notes: [{ text: 'what flows in flows out: I₁ + I₃ = I₂', at: [-4.2, -1.2], to: [-1.5, 2.3], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Confidence intervals
// ---------------------------------------------------------------------------
export const confidence_intervals = {
  ...Y.confidence_intervals,
  ease: 1.6,
  beats: [
    {
      say: 'An alloy’s true strength is 500 MPa, but nobody knows that. Twenty labs each test 5 specimens and report an average, with a range around it: a 95% confidence interval.',
      set: { n: 5, conf: '95' },
      ms: 11500,
      notes: [{ text: 'each line: one lab’s 95% interval from 5 specimens', at: [5.6, 1.4] }],
    },
    {
      say: 'With only 5 specimens, each range is wide, about ±40 MPa. And look: one of them misses the truth entirely.',
      set: {},
      ms: 10000,
      notes: [{ text: 'this one misses the true value', at: [5.4, -1.4], to: [4.0, -2.6], color: C.red }],
    },
    {
      say: '“95%” describes the method, not any one lab: if many labs do this, about 19 in 20 of their ranges will catch the true value. Neyman set this out in 1937.',
      set: {},
      ms: 11500,
    },
    {
      say: 'Test 30 specimens each and the ranges shrink to about ±11 MPa. Still about 1 in 20 misses.',
      set: { n: 30 },
      ms: 10000,
      notes: [{ text: 'still 1 in 20 misses: that is what 95% means', at: [3.4, -2.2], to: [-1.4, -2.9], color: C.red }],
    },
    {
      say: 'Ask for 99% and the ranges widen again. More certainty costs precision, unless you test more samples.',
      set: { conf: '99' },
      ms: 10000,
      notes: [{ text: '99%: more certainty costs wider intervals', at: [4.6, 1.0] }],
    },
    { say: '100 specimens at 95%: narrow and trustworthy. Precision is bought with tests.', set: { n: 100, conf: '95' }, ms: 8500 },
  ],
};

// ---------------------------------------------------------------------------
// Fatigue: the S–N curve
// ---------------------------------------------------------------------------
export const sn_curve = {
  ...Y.sn_curve,
  ease: 1.6,
  beats: [
    {
      say: 'Bend a paper clip back and forth and it snaps, though one bend never would. That is fatigue, and it causes most failures of machine parts.',
      set: { s: 500, mat: 'steel' },
      ms: 10000,
    },
    {
      say: 'In the 1850s and ’60s August Wöhler spun railway axles until they broke, and plotted stress against the number of cycles to failure: the S–N curve.',
      set: {},
      ms: 11000,
    },
    {
      say: 'Steel loaded to ±500 MPa breaks after about 15,000 cycles, though it could carry 500 MPa once without trouble.',
      set: {},
      ms: 10000,
      notes: [{ text: '±500 MPa: breaks after about 15,000 cycles', at: [4.8, 2.6], to: [3.2, 0.1], color: C.gold }],
    },
    { say: 'Lower the stress and it lasts longer…', set: { s: 400 }, ms: 7500 },
    {
      say: '…until, below 350 MPa, the steel curve goes flat. That is its endurance limit: below it, the steel survives forever.',
      set: { s: 300 },
      ms: 10500,
      notes: [{ text: 'below the endurance limit the steel curve goes flat → it lasts forever', at: [4.6, 2.6], to: [5.6, -0.4], color: C.blue }],
    },
    {
      say: 'Aluminium has no floor. Even at 150 MPa it fails eventually, after about 6 million cycles. So aircraft designers count cycles and retire parts in time.',
      set: { s: 150, mat: 'al' },
      ms: 11500,
      notes: [{ text: 'aluminium has no floor: it fails eventually, after ~6 million cycles', at: [4.6, 2.6], to: [5.3, -2.0], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Transformers
// ---------------------------------------------------------------------------
export const transformer = {
  ...Y.transformer,
  ease: 1.6,
  beats: [
    {
      say: 'Two coils on one iron ring. Alternating current in the left coil makes a magnetic field in the iron that keeps flipping back and forth.',
      set: { N1: 500, N2: 500 },
      ms: 10000,
    },
    {
      say: 'A changing field through a coil makes a voltage in it: Faraday found this in 1831. Every turn of wire picks up the same voltage. Same turns on both sides: 230 V in, 230 V out.',
      set: {},
      ms: 12000,
    },
    {
      say: 'Twice as many turns on the right: 230 V in, 460 V out. A step-up transformer.',
      set: { N2: 1000 },
      ms: 9500,
      notes: [{ text: 'twice the turns on this side → twice the voltage', at: [-0.6, -2.8], to: [-2.4, -1.0], color: C.green }],
    },
    {
      say: 'Now 1,000 turns in and 50 out: 230 V becomes 11.5 V. A step-down transformer, as in an old phone charger.',
      set: { N1: 1000, N2: 50 },
      ms: 10500,
      notes: [
        { text: '1,000 turns in, 50 out: 230 V becomes 11.5 V', at: [-0.6, -2.8], to: [-2.3, -1.0], color: C.green },
        { text: 'the output wave is tiny', at: [4.6, -1.6], to: [4.0, 0.3], color: C.green },
      ],
    },
    {
      say: 'Energy is not created. Power in is nearly power out: a 100 W lamp draws 8.7 A at 11.5 V, but the primary carries only 0.43 A at 230 V.',
      set: {},
      ms: 11000,
      notes: [{ text: 'power in ≈ power out: 0.43 A × 230 V ≈ 8.7 A × 11.5 V', at: [-4.4, -3.6] }],
    },
    {
      say: 'That is why power lines run at very high voltage: the same power with a tiny current, so little is lost as heat. The iron core is made of thin silicon-steel sheets to cut losses.',
      set: { N1: 100, N2: 2000 },
      ms: 11500,
    },
  ],
};

// ---------------------------------------------------------------------------
// Carbon in steel: ferrite, pearlite, cementite
// ---------------------------------------------------------------------------
export const steel_carbon = {
  ...Y.steel_carbon,
  ease: 1.4,
  beats: [
    {
      say: 'Pure iron, polished and etched, seen under a microscope: grains of soft ferrite.',
      set: { c: 0 },
      ms: 8500,
    },
    {
      say: 'Add a little carbon. 1020 steel, 0.20% carbon: mostly white ferrite with a few dark pearlite grains. Easy to bend and weld: car panels and beams.',
      set: { c: 0.2 },
      ms: 11000,
      notes: [{ text: '0.2% C: mostly soft ferrite, easy to bend and weld', at: [5.0, 0.4], to: [2.3, -0.6], color: C.gold }],
    },
    {
      say: 'Pearlite is fine layers of ferrite and hard iron carbide, cementite. More carbon means more pearlite.',
      set: { c: 0.35 },
      ms: 9500,
    },
    {
      say: '1045, 0.45% carbon, is about 58% pearlite: much stronger, less ductile. Shafts, gears and axles.',
      set: { c: 0.45 },
      ms: 10000,
      notes: [{ text: '0.45% C: about 58% pearlite → stronger, less ductile', at: [5.4, -0.6], to: [3.4, 0.0], color: C.gold }],
    },
    {
      say: 'At 0.76% carbon the steel is all pearlite: the eutectoid point. Rail steel sits near here.',
      set: { c: 0.76 },
      ms: 9500,
    },
    {
      say: 'Past 0.76%, extra brittle cementite coats the grain boundaries. Strength barely rises, but ductility keeps falling. Good for files and cutting tools, bad for beams.',
      set: { c: 1.2 },
      ms: 11000,
      notes: [
        { text: 'past 0.76% C: brittle cementite lines the grain boundaries', at: [4.4, -1.2], to: [-2.2, 0.0], color: C.red },
        { text: 'strength barely rises; ductility keeps falling', at: [4.6, 0.6], to: [6.5, 2.1] },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Four-bar linkages
// ---------------------------------------------------------------------------
export const four_bar = {
  ...Y.four_bar,
  ease: 1.6,
  beats: [
    {
      say: 'Four bars joined in a loop, one of them fixed to the ground. Turn one bar and the others must follow. Windscreen wipers, bicycle suspensions and excavator arms are four-bar linkages.',
      set: { a: 1, b: 4.5 },
      ms: 12000,
    },
    {
      say: 'Crank 1, coupler 4.5, rocker 3, ground 4. Shortest plus longest is 5.5, no more than the other two (7). Grashof’s rule (1883) says the short crank can turn all the way round.',
      set: {},
      ms: 12000,
      notes: [{ text: 'shortest + longest ≤ the other two: the short crank turns fully', at: [3.2, 0.0], to: [-5.8, -1.1], color: C.gold }],
    },
    {
      say: 'Crank 2.8, coupler 2.2: now 2.2 + 4 = 6.2 is more than 2.8 + 3 = 5.8. Rule broken: no bar can turn fully, and the crank only rocks back and forth.',
      set: { a: 2.8, b: 2.2 },
      ms: 12000,
      notes: [{ text: 'not Grashof: no link turns fully, the crank only rocks', at: [3.2, 0.0], color: C.gold }],
    },
    {
      say: 'A point on the coupler traces a curve, pink. Change the lengths and the curve changes: ovals, teardrops, even nearly straight stretches.',
      set: { a: 1.5, b: 3.5 },
      ms: 11000,
      notes: [{ text: 'a point on the coupler traces a curve', at: [3.2, 0.0], to: [-4.5, 0.4], color: C.pink }],
    },
    {
      say: 'James Watt was proudest of exactly this trick (1784): a linkage that guides a steam piston rod in a nearly straight line.',
      set: { a: 1.2, b: 5 },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// Project planning: the critical path
// ---------------------------------------------------------------------------
export const gantt_cpm = {
  ...Y.gantt_cpm,
  ease: 1.6,
  beats: [
    {
      say: 'Installing a new furnace. Each bar is a task; some must wait for others to finish. Henry Gantt drew charts like this in the 1910s.',
      set: { dC: 4 },
      ms: 10000,
    },
    {
      say: 'Ordering the furnace (B, 6 weeks) is the long pole. The chain A → B → D → F takes 12 weeks, and nothing can finish sooner: the critical path, in red.',
      set: {},
      ms: 11500,
      notes: [{ text: 'critical path A → B → D → F: 12 weeks', at: [-0.6, 2.8], to: [0.4, 1.0], color: C.red }],
    },
    {
      say: 'The foundation (C) runs alongside and has 2 weeks of slack, the faint extension of its bar. It can slip that much without delaying anything.',
      set: {},
      ms: 10500,
      notes: [{ text: 'slack: C can slip 2 weeks', at: [3.4, -3.2], to: [2.2, 0.1] }],
    },
    {
      say: 'If the foundation takes 6 weeks, it ties with the furnace order. Both paths are now critical: any delay to either moves the finish.',
      set: { dC: 6 },
      ms: 10500,
      notes: [{ text: 'a 6-week foundation ties: now both paths are critical', at: [4.0, -3.0], to: [2.0, 0.2], color: C.red }],
    },
    {
      say: 'At 9 weeks the foundation becomes the critical path and the project stretches to 15 weeks. Managers watch the critical path, not every task. DuPont formalised this in 1957.',
      set: { dC: 9 },
      ms: 11500,
      notes: [{ text: '9-week foundation: the new critical path, finish moves to week 15', at: [3.6, -3.0], to: [3.0, 0.2], color: C.red }],
    },
  ],
};
