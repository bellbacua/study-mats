// Story versions, batch 13: year 3, second half, into year 4.
import { C } from '../theme';
import * as um_year3b from './um_year3b';
import * as um_year4a from './um_year4a';

const Y = um_year3b;
const Z = um_year4a;

// ---------------------------------------------------------------------------
// Creep: slow stretching at high temperature
// ---------------------------------------------------------------------------
export const creep_curve = {
  ...Y.creep_curve,
  ease: 1.6,
  beats: [
    {
      say: 'Hang a weight on a hot steel bar and it slowly stretches, even below the stress that would bend it at room temperature. Atoms hop and slide when hot. This is creep.',
      set: { s: 200, T: 600 },
      ms: 11000,
    },
    {
      say: 'At 200 MPa and 600 °C: a quick stretch at first, then a long, steady creep, then it speeds up as the bar necks and breaks, after about 400 hours.',
      set: {},
      ms: 11000,
      notes: [
        { text: 'steady creep: a slow, constant stretch', at: [-5.4, 1.2], to: [-4.2, 0.35], color: C.gold },
        { text: 'then it speeds up and breaks', at: [-4.8, 3.2], to: [-2.0, 1.0], color: C.pink },
      ],
    },
    {
      say: 'Halve the stress to 100 MPa and the life jumps to millions of hours, about 3,800 times longer. Creep life is extremely sensitive to stress.',
      set: { s: 100 },
      ms: 11000,
      notes: [{ text: 'half the stress: life about 3,800× longer', at: [2.4, -0.9], to: [5.45, 0.25], color: C.yellow }],
    },
    {
      say: 'Keep 100 MPa but run 100 °C hotter, at 700 °C, and the life falls about 500 times, to around 3,000 hours.',
      set: { T: 700 },
      ms: 10500,
      notes: [{ text: '100 °C hotter: life falls ~500×', at: [-4.0, -1.4], to: [0.0, -2.6], color: C.red }],
    },
    {
      say: 'Larson and Miller (1952) found one number that combines temperature and time for each stress: hotter trades for shorter. Short hot tests can then predict decades of service.',
      set: {},
      ms: 11500,
      notes: [{ text: 'same point on the line: hotter trades for shorter', at: [2.4, -0.9], to: [5.45, 0.25], color: C.yellow }],
    },
    {
      say: 'Power-plant pipes and jet-engine turbine blades are designed this way, often for 100,000 hours or more of glowing-hot service.',
      set: { s: 120, T: 600 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// AC power and the power factor
// ---------------------------------------------------------------------------
export const ac_power = {
  ...Y.ac_power,
  ease: 1.6,
  beats: [
    {
      say: 'Wall electricity alternates: voltage and current swing back and forth 60 times a second in the Philippines. Power at each instant is voltage times current.',
      set: { phi: 0, I: 10 },
      ms: 10500,
    },
    {
      say: 'A heater: the current swings in step with the voltage. Their product never dips below zero, and averages 230 × 10 = 2,300 W.',
      set: {},
      ms: 10500,
      notes: [{ text: 'power never dips below zero: all of it does work', at: [4.4, 0.9], to: [-1.0, 0.15], color: C.pink }],
    },
    {
      say: 'A motor’s coils make the current lag behind, here by 37°. For part of each cycle the power goes negative: energy flows back to the grid.',
      set: { phi: 37 },
      ms: 10500,
    },
    {
      say: 'The average falls to 1,840 W for the same 10 A. The ratio, cos 37° = 0.8, is the power factor. The cables still carry the full current and heat up, for less useful work.',
      set: {},
      ms: 11500,
      notes: [{ text: 'S (what the cables carry) is bigger than P (the useful part)', at: [4.4, 1.3], to: [4.1, -1.4], color: C.white }],
    },
    {
      say: 'A pure coil: φ = 90°. The power swings equally up and down and averages zero. 10 A flows, and no work is done at all.',
      set: { phi: 90 },
      ms: 10500,
      notes: [{ text: 'all reactive: 2,300 VA carried, 0 W of work', at: [4.4, 1.6], to: [2.55, 0.4], color: C.teal }],
    },
    {
      say: 'So factories add capacitors to pull the lag back. Utilities ask for a power factor of about 0.95: a lag of just 18°.',
      set: { phi: 18 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Glass: viscosity and temperature
// ---------------------------------------------------------------------------
export const glass_viscosity = {
  ...Y.glass_viscosity,
  ease: 1.6,
  beats: [
    {
      say: 'Glass has no melting point. Heat it and it just gets runnier and runnier. Glassmakers work by its viscosity, how thick it flows, measured in Pa·s. Water is 0.001.',
      set: { T: 1400 },
      ms: 11000,
    },
    {
      say: 'At about 1,060 °C window glass is 10³ Pa·s, like very thick honey: the working range, where it is blown, pressed or drawn.',
      set: { T: 1060 },
      ms: 10500,
      notes: [{ text: 'working range: shape it now', at: [4.3, 0.7], to: [4.25, -2.0], color: C.gold }],
    },
    {
      say: 'The scale is logarithmic: each step up is ten times thicker. At about 750 °C it reaches the softening point, 10^6.6 Pa·s, where a glass fibre sags under its own weight.',
      set: { T: 750 },
      ms: 11500,
      notes: [{ text: '310 °C cooler: about 4,000× thicker', at: [5.0, 1.6], to: [2.5, -0.4], color: C.yellow }],
    },
    {
      say: 'Near 570 °C, 10¹² Pa·s: the annealing point. Internal stresses relax in minutes, so new glass is held here, then cooled slowly so it does not shatter later.',
      set: { T: 568 },
      ms: 11500,
      notes: [{ text: 'annealing point: hold here, then cool slowly', at: [4.6, 0.3], to: [1.45, 1.85], color: C.teal }],
    },
    {
      say: 'Below about 500 °C it is effectively solid. And no, old cathedral windows are not thicker at the bottom because glass flows: at room temperature that would take far longer than the age of the universe.',
      set: { T: 480 },
      ms: 12000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Factor of safety and reliability
// ---------------------------------------------------------------------------
export const safety_factor = {
  ...Y.safety_factor,
  ease: 1.6,
  beats: [
    {
      say: 'Loads vary, and so does strength: no two steel bars are exactly alike. Each is a hump of possible values. A part fails when a weak one meets a big load.',
      set: { n: 2, cv: 10, case: 'ok' },
      ms: 11000,
    },
    {
      say: 'Design the average strength to be twice the average load: a factor of safety of 2. With 10% scatter, the humps’ tails barely touch: about 1 failure in 250,000.',
      set: {},
      ms: 11500,
      notes: [{ text: 'the tails barely touch', at: [-0.8, -1.3], to: [-2.55, -3.1], color: C.green }],
    },
    {
      say: 'Same factor of 2, but 20% scatter, from poor quality control. The overlap grows and failure becomes about 1 in 80. The factor alone does not guarantee safety.',
      set: { cv: 20 },
      ms: 11500,
      notes: [{ text: 'overlap: a weak part meets a big load', at: [0.4, -0.6], to: [-3.0, -3.0], color: C.red }],
    },
    {
      say: 'Back to 10% scatter, but the real loads are 20% higher than the design assumed. The risk is nearly 80 times greater, and nobody sees it on paper.',
      set: { cv: 10, case: 'under' },
      ms: 11000,
      notes: [{ text: 'real loads 20% above the assumed ones', at: [-0.6, 2.6], to: [-3.3, 1.6], color: C.blue }],
    },
    {
      say: 'That is what happened at the Quebec Bridge in 1907: its own weight had been underestimated, and it collapsed during construction, killing 75 workers.',
      set: {},
      ms: 11000,
    },
    {
      say: 'Good control of both loads and materials lets a modest factor of safety be very safe. Try to get below 1 in a million.',
      set: { case: 'ok', n: 2.4 },
      ms: 9500,
    },
  ],
};

// ---------------------------------------------------------------------------
// Bending stress in a beam
// ---------------------------------------------------------------------------
export const beam_bending = {
  ...Y.beam_bending,
  ease: 1.6,
  beats: [
    {
      say: 'A 3 m shelf beam on two supports, with 5 kN in the middle. Each support pushes up with 2.5 kN.',
      set: { a: 1.5, P: 5 },
      ms: 9500,
    },
    {
      say: 'The bending moment, how hard the load tries to bend the beam at each point, is zero at the ends and peaks right under the load: PL ÷ 4 = 3.75 kN·m.',
      set: {},
      ms: 11000,
      notes: [{ text: 'the bending moment peaks right under the load', at: [1.2, -2.7], to: [-2.2, -2.95], color: C.pink }],
    },
    {
      say: 'Look inside. The top is squeezed, the bottom stretched, and the middle, the neutral axis, feels nothing. Here the outer layers carry 45 MPa.',
      set: {},
      ms: 11000,
      notes: [
        { text: 'neutral axis: no stress at all', at: [1.6, 1.2], to: [4.4, 0.05], color: C.yellow },
        { text: 'bottom is stretched: cracks start here', at: [1.6, -3.1], to: [5.2, -1.6], color: C.teal },
      ],
    },
    {
      say: 'Most materials are weaker when stretched, so a shelf or a concrete beam cracks on its underside. That is why concrete beams have steel bars near the bottom.',
      set: {},
      ms: 11000,
    },
    {
      say: 'Move the load near a support. Most of it goes straight into that support. The moment falls to 2.1 kN·m and the stress to 25 MPa.',
      set: { a: 0.5 },
      ms: 10500,
      notes: [{ text: 'the near support carries most of the load', at: [-1.6, 1.3], to: [-6.2, 1.1], color: C.blue }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Casting: feeding a casting with a riser
// ---------------------------------------------------------------------------
export const casting_riser = {
  ...Z.casting_riser,
  ease: 1.6,
  beats: [
    {
      say: 'Molten steel shrinks as it freezes. A casting needs a reservoir of liquid, a riser, that stays molten longest and keeps feeding it.',
      set: { D: 6 },
      ms: 10000,
    },
    {
      say: 'Which freezes first? Chvorinov’s rule (1940): freezing time grows with the square of volume ÷ cooling surface, the modulus. Thick, chunky shapes freeze last.',
      set: {},
      ms: 11500,
    },
    {
      say: 'A 6 cm riser has a modulus of only 1 cm, less than the plate’s 1.43 cm. It freezes first, so the plate’s last liquid has nothing to feed it: a shrinkage hole.',
      set: {},
      ms: 11500,
      notes: [
        { text: 'shrinkage hole: nothing left to feed it', at: [0.4, -3.0], to: [-2.4, -1.9], color: C.red },
        { text: 'riser (pink) freezes before the plate', at: [5.4, 0.6], to: [3.55, 1.65], color: C.pink },
      ],
    },
    { say: 'Make the riser bigger…', set: { D: 8.5 }, ms: 7500 },
    {
      say: 'At 10.3 cm its modulus is 1.2 times the plate’s. It stays liquid longest and feeds the plate. The hole ends up in the riser, which is cut off and remelted.',
      set: { D: 10.3 },
      ms: 11500,
      notes: [{ text: 'the last liquid is now in the riser', at: [0.6, -0.9], to: [-2.95, 0.15], color: C.gold }],
    },
    {
      say: 'Bigger is safe but wasteful: a 16 cm riser holds more steel than the plate itself.',
      set: { D: 16 },
      ms: 9500,
      notes: [{ text: 'riser holds more steel than the plate: waste', at: [0.6, -0.9], to: [-2.0, 1.5], color: C.red }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Stokes' law: a falling-ball viscometer
// ---------------------------------------------------------------------------
export const stokes_fall = {
  ...Z.stokes_fall,
  ease: 1.6,
  beats: [
    {
      say: 'Drop a small steel ball into glycerol. It speeds up for an instant, then falls at a steady speed, where the liquid’s drag exactly balances its weight.',
      set: { r: 1.4, f: 'glycerol' },
      ms: 10500,
    },
    {
      say: 'Stokes worked out that drag in 1851: it grows with the viscosity, the ball’s size and its speed. A 1.4 mm ball settles at about 2 cm/s: 10 s between the marks.',
      set: {},
      ms: 11500,
    },
    {
      say: 'Time the fall and you have measured the viscosity. That is a falling-ball viscometer.',
      set: {},
      ms: 8500,
    },
    {
      say: 'A bigger ball falls faster: its weight grows with r³ but its drag only with r, so the speed grows with r².',
      set: { r: 2.4 },
      ms: 10500,
      notes: [{ text: 'bigger ball, faster: speed grows with r²', at: [-0.6, 1.6], to: [4.0, 0.0], color: C.white }],
    },
    {
      say: 'Honey is about 7 times thicker. Even a 2 mm ball creeps down at under 6 mm/s.',
      set: { r: 2, f: 'honey' },
      ms: 10000,
      notes: [{ text: 'honey is thicker: the ball crawls', at: [0.6, -1.9], to: [5.0, -1.0], color: C.yellow }],
    },
    {
      say: 'Engine oil is thinner: a 1 mm ball falls at 6 cm/s. The same law explains how fast powder settles in a slurry and how dust settles in still air.',
      set: { r: 1, f: 'oil' },
      ms: 11000,
      notes: [{ text: 'engine oil is thinner: faster', at: [0.2, 2.1], to: [3.3, 0.75], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Charpy impact test: ductile-to-brittle transition
// ---------------------------------------------------------------------------
export const charpy_dbtt = {
  ...Z.charpy_dbtt,
  ease: 1.6,
  beats: [
    {
      say: 'During the Second World War, some welded Liberty ships cracked in two, a few while sitting in harbour. The steel was strong enough. What went wrong?',
      set: { T: 20, k: 'ship' },
      ms: 11000,
    },
    {
      say: 'The Charpy test (1901): a heavy pendulum smashes a notched bar. The energy it loses is how much the bar absorbed. At 20 °C the ship steel takes about 93 J.',
      set: {},
      ms: 11500,
    },
    {
      say: 'The broken bar is bent and dull grey: a ductile, tearing break.',
      set: {},
      ms: 8500,
      notes: [
        { text: 'upper shelf: tough, absorbs a lot', at: [1.4, 0.9], to: [5.85, -0.4], color: C.red },
        { text: 'dull grey, torn break', at: [-4.6, -2.6], to: [-7.0, -2.6], color: C.grey },
      ],
    },
    { say: 'Now cool the steel down…', set: { T: 0 }, ms: 7500 },
    {
      say: 'At −20 °C the same steel absorbs under 7 J. The pendulum hardly notices, and the break is flat and shiny: brittle. That was the steel in icy North Atlantic seas.',
      set: { T: -20 },
      ms: 11500,
      notes: [
        { text: 'lower shelf: brittle, almost nothing absorbed', at: [0.6, -1.4], to: [4.2, -3.0], color: C.red },
        { text: 'flat, shiny break', at: [-4.6, -2.6], to: [-7.0, -2.6], color: C.white },
      ],
    },
    {
      say: 'A modern fine-grained steel is still tough at −20 °C, about 190 J. Its transition is pushed down near −45 °C.',
      set: { k: 'modern' },
      ms: 10500,
      notes: [{ text: 'fine-grained steel: still tough at −20 °C', at: [-0.6, 0.9], to: [4.25, 2.4], color: C.blue }],
    },
    {
      say: 'Austenitic stainless steel has an FCC crystal and no transition at all: it stays tough even in liquid nitrogen. That is why it is used for LNG tanks.',
      set: { k: 'ss', T: -70 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Euler buckling of columns
// ---------------------------------------------------------------------------
export const column_buckling = {
  ...Z.column_buckling,
  ease: 1.6,
  beats: [
    {
      say: 'Push down on the end of a long, thin rod. It does not crush. At a certain load it suddenly bows out sideways: buckling.',
      set: { L: 1, P: 20, e: 'pp' },
      ms: 10000,
    },
    {
      say: 'Euler found that load in 1757: P = π²EI ÷ (KL)². This 1 m rod with pinned ends can carry 38 kN. At 20 kN it stays straight.',
      set: {},
      ms: 11000,
      notes: [{ text: 'load below the curve: safe', at: [-1.0, -0.8], to: [2.5, -2.4], color: C.green }],
    },
    {
      say: 'Length counts squared. Make it 2 m and the critical load drops to a quarter, 9.5 kN. The 20 kN load now bows it, though the steel is nowhere near crushing.',
      set: { L: 2 },
      ms: 11500,
      notes: [{ text: 'now above the curve: it bows sideways', at: [5.0, 0.0], to: [4.7, -2.3], color: C.red }],
    },
    {
      say: 'Fix both ends so they cannot rotate. The rod now bends in a tighter S-shape: K = 0.5, and the critical load is four times higher, 38 kN. It holds again.',
      set: { e: 'ff' },
      ms: 11500,
      notes: [{ text: 'fixed ends lift the curve 4×: safe again', at: [5.6, 0.9], to: [4.7, -2.35], color: C.green }],
    },
    {
      say: 'A flagpole, fixed at the base and free at the top, is the weakest case: K = 2. Scaffolding, truss struts and car jacks are all checked against buckling.',
      set: { e: 'fr', L: 1 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Nanomaterials: when surface atoms take over
// ---------------------------------------------------------------------------
export const nano_surface = {
  ...Z.nano_surface,
  ease: 1.6,
  beats: [
    {
      say: 'Gold is gold-coloured and melts at 1,064 °C. But make it small enough and its colour, melting point and chemistry all change. Why?',
      set: { D: 40 },
      ms: 10000,
    },
    {
      say: 'Atoms on the surface have fewer neighbours holding them. In a big piece, almost none are on the surface. At 20 nm, about 70 atoms across, it is still only 8%.',
      set: { D: 20 },
      ms: 11000,
      notes: [{ text: 'yellow rim = surface atoms: only 8% at 20 nm', at: [-0.2, -3.5], to: [-2.2, -1.6], color: C.yellow }],
    },
    {
      say: 'Yet even 20 nm gold in water looks ruby red, not gold. Faraday made such red gold in 1857; Roman glassmakers had used it, without knowing why, in the Lycurgus Cup.',
      set: {},
      ms: 11500,
    },
    {
      say: 'At 5 nm, a third of the atoms are on the surface. The melting point has dropped by about 250 °C.',
      set: { D: 5 },
      ms: 10000,
      notes: [
        { text: 'a third of the atoms are on the surface', at: [0.0, 1.0], to: [2.75, 1.7], color: C.yellow },
        { text: 'melts about 250 °C lower', at: [0.0, -1.7], to: [2.75, -1.47], color: C.red },
      ],
    },
    {
      say: 'At 2 nm, nearly two thirds are surface atoms. Such clusters melt far lower and, though bulk gold is famously unreactive, become powerful catalysts.',
      set: { D: 2 },
      ms: 11000,
      notes: [
        { text: 'two thirds on the surface', at: [0.0, 3.0], to: [2.55, 2.6], color: C.yellow },
        { text: 'melts far below gold’s 1,064 °C', at: [0.0, -2.9], to: [2.55, -2.4], color: C.red },
      ],
    },
  ],
};
