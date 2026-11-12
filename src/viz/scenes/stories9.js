// Story versions, batch 9: weeks 25–28 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as chemistry from './chemistry';
import * as materials from './materials';
import * as um_math2 from './um_math2';
import * as um_mate2 from './um_mate2';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);

// ---------------------------------------------------------------------------
// MATH 19. Partial derivatives: slicing a hot plate
// ---------------------------------------------------------------------------
export const partial_slice = {
  ...um_math2.partial_slice,
  ease: 1.6,
  beats: [
    {
      say: 'A metal plate, hot in some places and cooler in others. The height of this surface is the temperature at each point (x, y).',
      set: { x: 1.5, y: 0, dir: 'x' },
      ms: 9500,
    },
    {
      say: 'A surface has no single slope: it depends which way you walk. So cut it. Hold y fixed at 0, and the cut is an ordinary curve, the gold line.',
      set: {},
      ms: 10500,
      notes: [{ text: 'gold: the plate cut along x, at y = 0', at: [3.6, 3.7, 0], to: [3.0, 1.0, 0], color: C.yellow }],
    },
    {
      say: 'The slope of that curve is the partial derivative ∂T/∂x: about −17 °C per cm here. The curly ∂ just means “only x is changing”.',
      set: {},
      ms: 10500,
    },
    {
      say: 'Same point, other direction. Hold x fixed and walk along y: here the plate is flat, so ∂T/∂y = 0.',
      set: { dir: 'y' },
      ms: 9500,
      notes: [{ text: 'along y the top is flat here: slope 0', at: [3.6, 3.7, 0], to: [1.6, 2.3, 0], color: C.red }],
    },
    {
      say: 'Move to y = 2 and slice along y: about −18 °C per cm, the steepest drop on the plate. Heat flows fastest where the slope is steepest.',
      set: { x: 0, y: 2 },
      ms: 10500,
      notes: [{ text: 'the steepest drop on the plate', at: [3.6, 3.7, 0], to: [0.1, 1.7, -2.0], color: C.red }],
      cam: { position: [9, 5, 4], target: [0, 1, 0] },
    },
    {
      say: 'Two slopes, one in each direction, describe the whole tilt at a point. Fourier used exactly these in 1822 to write the law of heat flow.',
      set: { x: -1, y: 1, dir: 'x' },
      ms: 10000,
      cam: null,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 117. Polymers: the glass transition
// ---------------------------------------------------------------------------
export const polymer_tg_chain_lab = {
  ...chemistry.polymer_tg_chain_lab,
  ease: 2,
  beats: [
    {
      say: 'A polymer is a tangle of very long chains, like cooked spaghetti. Each colour is one chain, thousands of atoms long.',
      set: { poly: 'rubber', T: 25 },
      ms: 9000,
      notes: [{ text: 'one colour = one long chain', at: [-6.0, 1.0, 0], to: [-3.8, 2.3, 0], color: C.purple }],
    },
    {
      say: 'Rubber at room temperature is far above its glass transition, Tg = −70 °C. The chains wriggle and slide past each other, so it stretches.',
      set: {},
      ms: 10500,
      notes: [{ text: '25 °C, far above Tg: the chains wriggle and slide', at: [0, -3.6, 0], color: C.yellow }],
    },
    { say: 'Cool it down…', set: { T: -40 }, ms: 6000 },
    {
      say: 'Below Tg the wriggling stops. The chains freeze in place, and rubber turns glassy and brittle, like a hose left in a freezer.',
      set: { T: -100 },
      ms: 10500,
      notes: [{ text: '−100 °C, below Tg: the chains are frozen still', at: [0, -3.6, 0], color: C.blue }],
    },
    {
      say: 'In 1986 the Challenger shuttle broke apart after a cold launch. Feynman showed that the rubber O-ring seals lost their springiness in ice water.',
      set: {},
      ms: 11000,
    },
    {
      say: 'Polystyrene has Tg = 100 °C, so at room temperature it is already glassy. That is why a CD case snaps instead of bending.',
      set: { poly: 'ps', T: 25 },
      ms: 10000,
      notes: [{ text: 'polystyrene: Tg is 100 °C, so it is frozen at room temperature', at: [0, -3.6, 0], color: C.blue }],
    },
    {
      say: 'Heat it past 100 °C and it softens: that is how polystyrene is moulded into shapes. Every plastic has its own Tg, and designers choose by it.',
      set: { T: 150 },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 118. The phase rule, with water
// ---------------------------------------------------------------------------
export const phase_rule_water = {
  ...um_mate2.phase_rule_water,
  ease: 1.6,
  beats: [
    {
      say: 'A sealed box of pure water. On the right, its map: for every temperature and pressure, which form is stable. Ice, liquid water, or vapour.',
      set: { T: 25, P: 101.3 },
      ms: 10000,
    },
    {
      say: 'At 25 °C and normal air pressure: liquid. Nudge the temperature or the pressure a little and it stays liquid. Two things you can change freely.',
      set: {},
      ms: 10000,
      notes: [{ text: 'one phase: nudge T or P and it stays liquid → F = 2', at: [-0.8, -0.8], to: [2.5, 1.3] }],
    },
    { say: 'Heat it…', set: { T: 70 }, ms: 6000 },
    {
      say: 'At 100 °C the dot lands on the boiling line: water and vapour together. Now if you change the pressure, the temperature must follow to stay on the line. One free choice.',
      set: { T: 100 },
      ms: 11000,
      notes: [{ text: 'on the line: at this pressure it boils at only one temperature → F = 1', at: [-1.2, -0.8], to: [4.5, 1.3], color: C.gold }],
    },
    {
      say: 'Gibbs counted this in the 1870s: F = C − P + 2. C components (here 1, water), P phases present. One phase, F = 2. Two phases, F = 1.',
      set: {},
      ms: 11000,
    },
    {
      say: 'At 0.611 kPa and 0.01 °C, the triple point: ice, water and vapour at once. F = 1 − 3 + 2 = 0. Nothing can change without losing a phase.',
      set: { T: 0, P: 0.611 },
      ms: 11000,
      notes: [{ text: 'triple point: ice, water and vapour together → F = 0', at: [-0.8, -0.8], to: [1.9, -1.7], color: C.gold }],
    },
    {
      say: 'At that low pressure, warm it and the ice skips the liquid entirely and turns straight to vapour. That is how freeze-dried coffee is made.',
      set: { T: 20, P: 0.1 },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 20. Probability: the law of large numbers
// ---------------------------------------------------------------------------
export const dice_frequencies = {
  ...um_math2.dice_frequencies,
  ease: 1,
  beats: [
    {
      say: 'Roll two dice and add them. Sums from 2 to 12. The bars show what share of rolls landed on each sum so far.',
      set: { dice: 2, speed: 5 },
      ms: 8500,
    },
    {
      say: 'After a few rolls the bars jump around wildly. Ten rolls tell you almost nothing.',
      set: {},
      ms: 9000,
      notes: [{ text: 'after 10 rolls the bars jump around', at: [-3.0, 3.6] }],
    },
    {
      say: 'Count the ways instead. A 2 needs 1 + 1: one way out of 36. A 7 can be 1 + 6, 2 + 5, 3 + 4, 4 + 3, 5 + 2, 6 + 1: six ways out of 36. The gold outlines are those exact chances.',
      set: {},
      ms: 12000,
    },
    {
      say: 'Speed up to hundreds of rolls a second. As the rolls pile into the thousands, every bar settles onto its gold outline.',
      set: { speed: 400 },
      ms: 10000,
      notes: [{ text: '7: 6 ways out of 36', at: [-1.0, 2.4], to: [-3.7, 0.6], color: C.gold }],
    },
    {
      say: 'The pink line tracks the share of 7s. It swings at first, then settles on 1/6. Jacob Bernoulli proved in 1713 that it must: the law of large numbers.',
      set: {},
      ms: 11000,
      notes: [{ text: 'the share of 7s settles on 1/6', at: [3.6, 1.8], to: [5.4, -1.2], color: C.pink }],
    },
    {
      say: 'One die: every face equally likely, so the bars settle onto a flat line at 1/6. Casinos and insurance companies both live off this law.',
      set: { dice: 1, speed: 400 },
      ms: 10500,
      notes: [{ text: 'one die: flat at 1/6', at: [-4.2, 3.6], to: [-4.2, 1.0], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 119. From atoms to bands
// ---------------------------------------------------------------------------
export const band_formation = {
  ...um_mate2.band_formation,
  ease: 1.6,
  beats: [
    {
      say: 'One silicon atom has sharp energy levels: a filled one, yellow, and an empty one above it, grey, far apart.',
      set: { N: 1, mat: 'si', T: 300 },
      ms: 9000,
      notes: [{ text: 'one atom: sharp levels with a big gap between', at: [1.0, 2.8], to: [3.0, -1.0], color: C.red }],
    },
    {
      say: 'Bring a second atom close. Their electrons feel each other, and each level splits in two.',
      set: { N: 2 },
      ms: 8500,
    },
    { say: 'Five atoms: five levels each.', set: { N: 5 }, ms: 6500 },
    {
      say: 'Forty atoms: the levels crowd into bands. A real crystal has about 10²³ atoms, so each band is a smooth smear of levels. Between the bands, a gap: 1.12 eV for silicon.',
      set: { N: 40 },
      ms: 11500,
      notes: [{ text: 'the gap shrinks to about 1.1 eV', at: [5.6, 1.8], to: [3.2, -0.6], color: C.red }],
    },
    {
      say: 'To carry current, an electron must reach the empty band. At room temperature, heat kicks only a few across. Silicon is a semiconductor.',
      set: { T: 300 },
      ms: 10000,
    },
    {
      say: 'Heat it to 900 K and far more electrons make the jump: unlike a metal, a semiconductor conducts better when hot.',
      set: { T: 900 },
      ms: 10000,
    },
    {
      say: 'Diamond: the gap is 5.5 eV. Almost no electron can cross it, so diamond is an insulator.',
      set: { mat: 'diamond', T: 300 },
      ms: 9500,
    },
    {
      say: 'In a metal the band is only half full. There are empty levels just above the electrons, so they move at the slightest push, and the metal conducts.',
      set: { mat: 'metal' },
      ms: 10500,
      notes: [{ text: 'half full: empty levels just above the electrons → it conducts', at: [-4.2, -1.6], to: [-1.0, -0.4], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 120. Phase diagrams and the lever rule (copper–nickel)
// ---------------------------------------------------------------------------
export const phase_diagram_lever_lab = extend(materials.phase_diagram_lever_lab, {
  ease: 1.8,
  beats: [
    {
      say: 'Copper and nickel mix in any proportion. A phase diagram is their map: pick a composition and a temperature, and it tells you what exists.',
      set: { c0: 35, T: 1450 },
      ms: 10000,
    },
    {
      say: 'Up here, 35% nickel at 1450 °C: all liquid.',
      set: {},
      ms: 7000,
      notes: [{ text: 'pick a composition and a temperature: here, all liquid', at: [-0.6, 3.6], to: [-3.3, 2.8] }],
    },
    {
      say: 'Cool it. Unlike pure metals, an alloy does not freeze at one temperature. Inside the lens, liquid and solid crystals live side by side.',
      set: { T: 1230 },
      ms: 10500,
      notes: [{ text: 'inside the lens: liquid and solid α together', at: [1.6, -0.4], to: [-3.3, 0.2] }],
    },
    {
      say: 'Draw a flat tie line across the lens. Its left end gives the liquid’s composition; its right end, the solid’s. The solid is richer in nickel.',
      set: {},
      ms: 11000,
      notes: [{ text: 'tie line: its ends give each phase’s composition', at: [1.6, -0.6], to: [-2.6, -0.1], color: C.gold }],
    },
    {
      say: 'How much of each? The lever rule: think of the tie line as a seesaw balanced on your alloy. Each phase’s share is the OPPOSITE arm over the whole line.',
      set: {},
      ms: 11500,
      notes: [{ text: 'each share = the OPPOSITE arm ÷ the whole line', at: [5.6, 0.9], to: [5.6, 2.8] }],
    },
    {
      say: 'Cool further. The tie line shifts, the solid share grows, and at about 1190 °C, the bottom line, the last liquid is gone.',
      set: { T: 1200 },
      ms: 10500,
    },
    { say: 'Below the lens: all solid. Drag the point anywhere on the map.', set: { T: 1100 }, ms: 7000 },
  ],
  more(kit) {
    const sx = 10 / 100;
    const sy = 7.6 / 500;
    const h = kit.handle([0, 0], { color: C.gold, onDrag: ([x, y]) => ({ c0: snap((x + 7) / sx, 1, 0, 100), T: snap(1000 + (y + 3.8) / sy, 5, 1000, 1500) }) });
    return (p) => h.set([-7 + p.c0 * sx, -3.8 + (p.T - 1000) * sy]);
  },
});

// ---------------------------------------------------------------------------
// MATH 21. Galton's board and the bell curve
// ---------------------------------------------------------------------------
export const galton_board = {
  ...um_math2.galton_board,
  ease: 1,
  beats: [
    {
      say: 'Francis Galton built this board in 1873. Each bead hits a pin and bounces left or right, at random, like a coin toss.',
      set: { rows: 2 },
      ms: 9000,
    },
    {
      say: 'With 2 rows there are 3 bins. To reach the middle you can go left-right or right-left: two paths. Each edge has only one path. So the middle fills twice as fast.',
      set: {},
      ms: 11500,
      notes: [{ text: 'at each pin: left or right, at random', at: [-4.2, 2.6], to: [-0.6, 2.2] }],
    },
    {
      say: 'Six rows, seven bins. The middle bins are reached by the most paths, so they fill fastest.',
      set: { rows: 6 },
      ms: 10000,
      notes: [{ text: 'the middle is reached by the most paths', at: [4.6, -1.2], to: [0.6, -2.0], color: C.gold }],
    },
    {
      say: 'Twelve rows. The pile takes the smooth bell shape that de Moivre found for coin tosses in 1733, and Gauss later found in measurement errors.',
      set: { rows: 12 },
      ms: 11000,
      notes: [{ text: '12 rows: the pile becomes a bell curve', at: [4.6, -1.2], to: [1.4, -1.6], color: C.gold }],
    },
    {
      say: 'About 68% of beads land within one standard deviation of the middle. Very few reach the edges.',
      set: {},
      ms: 10000,
      notes: [{ text: '68% land within one standard deviation of the middle', at: [4.8, -1.2], to: [0.9, -2.6], color: C.gold }],
    },
    {
      say: 'Each landing spot is the sum of many small random pushes. That is why so many measurements, from a bar’s strength to a person’s height, come out bell-shaped.',
      set: {},
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 401. Semiconductors: band gaps, doping and light
// ---------------------------------------------------------------------------
export const semiconductor_bandgap_lab = {
  ...chemistry.semiconductor_bandgap_lab,
  ease: 1.6,
  beats: [
    {
      say: 'Electrons fill the lower band, the valence band. To carry current, one must jump the gap to the empty conduction band above.',
      set: { Eg: 1.1, T: 0, dope: 'none' },
      ms: 9500,
      notes: [{ text: 'to conduct, an electron must jump the gap', at: [-1.0, 3.0], to: [3.5, -0.9] }],
    },
    {
      say: 'At absolute zero nobody jumps: pure silicon is an insulator.',
      set: {},
      ms: 7000,
    },
    {
      say: 'At room temperature, heat kicks a few electrons across silicon’s 1.1 eV gap. Each one leaves a hole behind. Only a few: pure silicon conducts poorly.',
      set: { T: 300 },
      ms: 10500,
      notes: [{ text: 'at room temperature only a few make it', at: [-4.6, 1.8], to: [-2.6, 0.2] }],
    },
    {
      say: 'Add a pinch of phosphorus, about one atom in a million. Each brings a spare electron sitting just below the conduction band. Plenty of carriers now: n-type silicon.',
      set: { dope: 'n' },
      ms: 11000,
      notes: [{ text: 'phosphorus: spare electrons sitting just below the conduction band', at: [-1.0, 2.6], to: [-1.6, -1.0], color: C.green }],
    },
    {
      say: 'Boron instead has one electron too few. It grabs electrons from the valence band, leaving holes that move like positive charges: p-type.',
      set: { dope: 'p' },
      ms: 10500,
    },
    {
      say: 'When an electron falls back across the gap, it can give off light, with wavelength 1240 ÷ Eg nanometres. Silicon’s gap gives invisible infrared.',
      set: { dope: 'none', Eg: 1.1 },
      ms: 10500,
    },
    {
      say: 'Widen the gap to 2.75 eV, as in gallium nitride: blue light. Akasaki, Amano and Nakamura won the 2014 Nobel Prize for the blue LED, which made white LED lamps possible.',
      set: { Eg: 2.75 },
      ms: 11500,
      notes: [{ text: 'falling back across the gap gives light: 2.75 eV → blue', at: [5.2, -3.2], to: [5.8, 0.3], color: C.blue }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 119. Nucleation: how a grain is born
// ---------------------------------------------------------------------------
export const nucleation_barrier = {
  ...um_mate2.nucleation_barrier,
  ease: 1.4,
  beats: [
    {
      say: 'Liquid copper, just 40 K below its melting point. Atoms bump together into tiny solid clusters all the time.',
      set: { dT: 40 },
      ms: 9000,
      notes: [{ text: 'clusters keep forming, then melt away again', at: [-4.5, 0.6] }],
    },
    {
      say: 'But a tiny cluster has a lot of surface for its size, and surface costs energy. So the energy first climbs as a cluster grows: a hill to get over.',
      set: {},
      ms: 11000,
    },
    {
      say: 'The top of the hill is the critical radius, r*. Here it is 6.4 nm, far too big: every cluster melts away before reaching it.',
      set: {},
      ms: 10500,
      notes: [{ text: '40 K under: the hill keeps rising, its top far off the chart at r* = 6.4 nm', at: [5.2, -1.0], to: [2.3, 2.6], color: C.red }],
    },
    {
      say: 'Cool further. The deeper below the melting point, the more the solid wants to form, and the hill shrinks.',
      set: { dT: 100 },
      ms: 9000,
    },
    {
      say: 'At 150 K under, r* is 1.7 nm. Now and then a cluster grows past the top and keeps growing into a grain.',
      set: { dT: 150 },
      ms: 10500,
      notes: [
        { text: 'past the top of the barrier, a cluster keeps growing…', at: [5.0, 2.0], to: [2.8, 0.9], color: C.gold },
        { text: '…into a grain', at: [-2.4, -0.8], to: [-4.2, -2.4], color: C.gold },
      ],
    },
    {
      say: 'At 300 K under, r* is below 1 nm and grains start everywhere. Many small grains make a finer, stronger metal. Turnbull’s experiments of 1950 cooled clean copper droplets about 236 K below melting before they froze.',
      set: { dT: 300 },
      ms: 12500,
      notes: [{ text: 'tiny barrier: grains start everywhere → many small grains', at: [5.0, 2.0], to: [2.0, 0.3], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 19. Taylor series: building a curve from powers
// ---------------------------------------------------------------------------
export const taylor_build = {
  ...um_math2.taylor_build,
  ease: 1.2,
  beats: [
    {
      say: 'Can a curve like sin x be built from just x, x², x³ and so on? Start with one term: sin x ≈ x.',
      set: { fn: 'sin', n: 1 },
      ms: 9000,
    },
    {
      say: 'Near 0 it is excellent: that is the small-angle rule engineers use for pendulums. But further out it shoots off.',
      set: {},
      ms: 9500,
      notes: [
        { text: 'near 0, x matches sin x well…', at: [3.6, -2.6], to: [0.4, 0.4], color: C.gold },
        { text: '…but shoots off as x grows', at: [-4.4, 3.0], to: [3.0, 3.0], color: C.gold },
      ],
    },
    { say: 'Add a term, −x³/3!. It bends the line back down.', set: { n: 2 }, ms: 7500 },
    { say: 'Another, +x⁵/5!: the match reaches further.', set: { n: 3 }, ms: 7000 },
    {
      say: 'Five terms, up to x⁹/9!, and the polynomial hugs the wave from −π to π. Madhava in Kerala found this around 1400; Taylor gave the general recipe in 1715.',
      set: { n: 5 },
      ms: 11500,
      notes: [{ text: '5 terms: hugs the wave from −π to π', at: [-3.0, 3.2], to: [-2.0, -0.9], color: C.gold }],
    },
    {
      say: 'eˣ works too. Ten terms match it from about −4 onward, and every extra term pushes the match further out, as far as you like. Calculators use series like these: just multiply and add.',
      set: { fn: 'exp', n: 10 },
      ms: 10500,
    },
    {
      say: 'ln(1 + x) is different. However many terms you add, the polynomial matches only between −1 and 1. Outside, the series falls apart.',
      set: { fn: 'ln', n: 8 },
      ms: 11000,
      notes: [
        { text: 'matches only between −1 and 1', at: [-4.6, 2.6], to: [0.5, 0.4], color: C.gold },
        { text: 'outside, the series falls apart', at: [4.4, -2.4], to: [1.7, -1.6], color: C.red },
      ],
    },
  ],
};
