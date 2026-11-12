// Story versions, batch 7: weeks 19–22 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as calculus from './calculus';
import * as um_chem2 from './um_chem2';
import * as um_math1 from './um_math1';
import * as um_mate1 from './um_mate1';
import * as um_physics from './um_physics';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);

// ---------------------------------------------------------------------------
// MATH 14. Derivative rules, read off the slope graph
// ---------------------------------------------------------------------------
const FNS = {
  sq: (x) => x * x,
  cubic: (x) => x ** 3 - 3 * x,
  sin: Math.sin,
  exp: Math.exp,
  chain: (x) => Math.sin(2 * x),
};
export const slope_tracer = extend(um_math1.slope_tracer, {
  ease: 1.4,
  beats: [
    {
      say: 'Top: the curve x². Put a tangent line on it at x = −2. Its slope is −4: steeply downhill.',
      set: { fn: 'sq', x0: -2 },
      ms: 9000,
    },
    {
      say: 'Slide the tangent to the right, and plot each slope as a height on the lower graph.',
      set: { x0: 2 },
      ms: 10000,
      notes: [
        { text: 'slope of the tangent here…', at: [5.6, 3.4], to: [2.8, 4.0], color: C.gold },
        { text: '…plotted below: the slopes make the line 2x', at: [5.4, -1.2], to: [2.8, -1.0], color: C.green },
      ],
    },
    {
      say: 'The slopes trace a straight line: 2x. That is the power rule: the slope of x² is 2x. For x³ − 3x it would be 3x² − 3.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Now sin x. Where the wave is flat at the top, the slope is 0.',
      set: { fn: 'sin', x0: -3 },
      ms: 7500,
    },
    {
      say: 'Slide across, and the slopes of sin x draw another wave, shifted a quarter turn: cos x.',
      set: { x0: 1.57 },
      ms: 10000,
      notes: [
        { text: 'flat at the top → slope 0', at: [5.6, 3.2], to: [2.3, 2.6], color: C.gold },
        { text: 'the slopes of sin x make cos x', at: [5.4, -1.2], to: [1.0, -2.0], color: C.green },
      ],
    },
    {
      say: 'eˣ is its own slope: the lower curve is exactly the upper one.',
      set: { fn: 'exp', x0: -3 },
      ms: 7000,
    },
    {
      say: 'sin(2x) wiggles twice as fast, so every slope is twice as steep: 2 cos(2x). That extra factor of 2 is the chain rule.',
      set: { fn: 'chain', x0: 1 },
      ms: 10000,
      notes: [{ text: 'twice as fast → twice as steep: 2 cos 2x', at: [5.6, -0.8], to: [0.7, -1.7], color: C.green }],
    },
    { say: 'Drag the point on the upper curve to slide the tangent yourself.', set: { fn: 'cubic', x0: 0 }, ms: 6000 },
  ],
  more(kit) {
    const h = kit.handle([0, 0], { color: C.gold, onDrag: ([x]) => ({ x0: snap((x - 0.6) / 1.15, 0.05, -3, 3) }) });
    return (p, t) => h.set([0.6 + p.x0 * 1.15, 2.0 + clamp(FNS[t.fn](p.x0), -3, 4) * 0.52]);
  },
});

// ---------------------------------------------------------------------------
// MATE 114. Hardness from the size of a dent
// ---------------------------------------------------------------------------
export const brinell_dent = {
  ...um_mate1.brinell_dent,
  ease: 2,
  beats: [
    {
      say: 'How hard is a metal? Johan Brinell’s test, 1900: press a hard 10 mm steel ball into it with a big, fixed load, then measure the dent.',
      set: { mat: 'mild', F: '3000' },
      ms: 9500,
    },
    {
      say: 'Mild steel under 3,000 kgf: the dent is about 5 mm across. Load ÷ dent area gives the Brinell hardness: about 130.',
      set: {},
      ms: 10000,
      notes: [{ text: 'wide dent (about 5 mm) = soft: HB ≈ 130', at: [1.4, 3.9], to: [3.4, 1.8], color: C.gold }],
    },
    {
      say: 'Hardened tool steel, same load: a much smaller dent. Hardness about 600.',
      set: { mat: 'tool' },
      ms: 8500,
      notes: [{ text: 'hardened steel: small dent, HB ≈ 600', at: [1.4, 3.9], to: [4.2, 1.6], color: C.gold }],
    },
    {
      say: 'Soft aluminium at 3,000 kgf: the ball sinks so deep the dent is too wide to read well.',
      set: { mat: 'al' },
      ms: 8500,
    },
    {
      say: 'Drop the load to 500 kgf and the dent comes back into the readable range. The rule: choose the load so the dent is between about a quarter and six tenths of the ball’s width.',
      set: { F: '500' },
      ms: 11000,
      notes: [{ text: 'soft aluminium needs a lighter load (500 kgf) to leave a readable dent', at: [1.2, 3.8], to: [4.2, 1.6], color: C.gold }],
    },
    {
      say: 'Hardness tracks strength closely. For steel, tensile strength in MPa is roughly 3.4 × HB, so a quick dent can stand in for a full tensile test.',
      set: { mat: 'mild', F: '3000' },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 10. Springs and simple harmonic motion
// ---------------------------------------------------------------------------
export const spring_mass = {
  ...um_physics.spring_mass,
  ease: 2,
  beats: [
    {
      say: 'A mass hangs on a spring. Pull it down and let go.',
      set: { m: 1, k: 20, A: 0.15 },
      ms: 7000,
    },
    {
      say: 'The further the spring is stretched, the harder it pulls back: force = −k × stretch. Hooke, again. The red arrow shows that pull.',
      set: {},
      ms: 10000,
      notes: [{ text: 'stretched further → pulled back harder', at: [-5.0, -2.6], to: [-4.1, 0.0], color: C.red }],
    },
    {
      say: 'Plot its height against time and you get a cosine wave. Motion like this is called simple harmonic motion.',
      set: {},
      ms: 9500,
      notes: [{ text: 'its height over time: a cosine wave', at: [2.0, 2.8], to: [5.6, 1.6], color: C.gold }],
    },
    {
      say: 'Pull it only a little. The swing is smaller, but each bounce takes exactly as long as before.',
      set: { A: 0.05 },
      ms: 9500,
      notes: [{ text: 'smaller swing, same rhythm: the period does not change', at: [2.0, 2.8], to: [5.4, 0.6], color: C.gold }],
    },
    {
      say: 'That steady rhythm is why springs and pendulums can keep time: a watch’s balance spring ticks evenly as it winds down.',
      set: {},
      ms: 9000,
    },
    {
      say: 'Four times the mass makes it twice as slow. The period is T = 2π √(m ÷ k).',
      set: { m: 4, A: 0.15 },
      ms: 9500,
      notes: [{ text: '4× the mass → twice as slow', at: [1.4, 2.8], to: [-3.8, 2.2], color: C.gold }],
    },
    {
      say: 'A stiffer spring speeds it up again. Atoms in a solid vibrate like tiny masses on springs, which is how heat is stored in materials.',
      set: { k: 80 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 12. Titration: finding the exact amount
// ---------------------------------------------------------------------------
export const titration_curve = {
  ...um_chem2.titration_curve,
  ease: 1.2,
  beats: [
    {
      say: 'How much acid is in a flask? Add a base of known strength, drop by drop, until it is exactly used up. The flask holds 25.0 mL of 0.100 M hydrochloric acid and a few drops of phenolphthalein indicator.',
      set: { v: 0, acid: 'strong' },
      ms: 12000,
    },
    {
      say: 'Run in sodium hydroxide. At first the pH hardly moves: each drop of base is used up at once by the plentiful acid.',
      set: { v: 20 },
      ms: 10000,
      notes: [{ text: 'adding base: at first the pH barely moves', at: [-0.4, 0.4], to: [1.5, -2.4] }],
    },
    {
      say: 'At 25.0 mL the moles of base match the moles of acid: the equivalence point.',
      set: { v: 25 },
      ms: 8500,
    },
    {
      say: 'One more drop and the pH leaps from about 4 to 10, and the flask turns pink. That sudden jump is what makes titration so precise.',
      set: { v: 25.5 },
      ms: 10000,
      notes: [{ text: 'moles match: one drop jumps the pH from 4 to 10, and the flask turns pink', at: [-0.6, 0.6], to: [2.5, 0.0] }],
    },
    {
      say: 'From the volume used: 0.0250 L × 0.100 mol/L = 0.00250 mol of base, so the flask held 0.00250 mol of acid.',
      set: { v: 40 },
      ms: 10000,
    },
    {
      say: 'Acetic acid, the acid in vinegar, is weak: it starts at a higher pH and rises gently. Its equivalence point sits at pH 8.7, right where phenolphthalein turns pink.',
      set: { acid: 'weak', v: 25 },
      ms: 12000,
      notes: [
        { text: 'weak acid: starts higher, rises gently', at: [-0.6, 1.6], to: [0.6, -1.0] },
        { text: 'equivalence at pH 8.7: right where the indicator turns pink', at: [5.2, -1.0], to: [2.7, 0.7], color: C.green },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 15. Optimisation: the biggest box
// ---------------------------------------------------------------------------
const boxV = (x) => x * (20 - 2 * x) ** 2;
export const box_optimizer = extend(um_math1.box_optimizer, {
  ease: 1.6,
  beats: [
    {
      say: 'A 20 × 20 cm steel sheet. Cut an x-by-x square from each corner and fold up the four sides to make an open box. How big should the cut be to hold the most?',
      set: { x: 1 },
      ms: 11000,
    },
    {
      say: 'A tiny cut makes a wide, flat tray: little volume.',
      set: {},
      ms: 7000,
      notes: [{ text: 'tiny cut: a flat tray, little volume', at: [-1.0, -2.4], to: [-3.6, -2.8] }],
    },
    {
      say: 'A deep cut makes a tall but narrow box: little volume again.',
      set: { x: 7 },
      ms: 8000,
      notes: [
        { text: 'deep cut: tall but narrow', at: [-1.6, -2.4], to: [-5.2, -2.6] },
        { text: 'past the peak, volume falls again', at: [6.0, 1.6], to: [5.5, -0.8], color: C.gold },
      ],
    },
    {
      say: 'The volume is V = x × (20 − 2x)². Its graph rises, peaks, then falls. At the peak the curve is momentarily flat: its slope is zero.',
      set: { x: 5 },
      ms: 11000,
    },
    {
      say: 'So set the derivative to zero and solve: the peak is at x = 10/3 ≈ 3.33 cm, giving about 593 cm³. That is optimisation: find where the slope is zero.',
      set: { x: 3.3 },
      ms: 12000,
      notes: [{ text: 'flat top: slope zero → the biggest box, ≈ 593 cm³', at: [5.8, 3.6], to: [3.5, 2.7], color: C.gold }],
    },
    { say: 'Drag the point along the volume curve and watch the box change.', set: { x: 2 }, ms: 6500 },
  ],
  more(kit) {
    const h = kit.handle([0, 0], { color: C.gold, onDrag: ([x]) => ({ x: snap((x - 1.2) / 0.62, 0.1, 0.5, 9.5) }) });
    return (p) => h.set([1.2 + p.x * 0.62, -3.6 + boxV(p.x) * 0.0105]);
  },
});

// ---------------------------------------------------------------------------
// PHYS 11. Standing waves on a string
// ---------------------------------------------------------------------------
export const standing_wave = {
  ...um_physics.standing_wave,
  ease: 2,
  beats: [
    {
      say: 'Pluck a string tied at both ends. A wave runs along it, bounces off the end, and comes back. Top: the wave running right. Bottom: its reflection running left.',
      set: { n: 1, view: 'parts' },
      ms: 11000,
    },
    {
      say: 'The string itself does both at once, so add their heights point by point. The middle curve is the sum.',
      set: {},
      ms: 9000,
      notes: [{ text: 'middle = top + bottom, added point by point', at: [-3.6, -1.6], to: [-3.6, -0.2], color: C.gold }],
    },
    {
      say: 'Something strange: the sum does not travel. It just swells and shrinks in place. A standing wave.',
      set: { view: 'sum' },
      ms: 9000,
    },
    {
      say: 'The second harmonic: two half-waves fit on the string. The middle point never moves: a node.',
      set: { n: 2, view: 'parts' },
      ms: 9500,
      notes: [{ text: 'a node: this point never moves', at: [1.8, -1.6], to: [0, -0.1], color: C.gold }],
    },
    {
      say: 'Because both ends are tied down, only a whole number of half-waves can fit: 1, 2, 3, 4… nothing in between.',
      set: { n: 4, view: 'sum' },
      ms: 10000,
      notes: [
        { text: 'only whole numbers of half-waves fit', at: [0, 2.8], color: C.gold },
        { text: 'fixed end', at: [-6.4, -2.2], to: [-7.0, -0.2] },
      ],
    },
    {
      say: 'That is why a guitar string plays definite notes, not any pitch at all. Pythagoras noticed it with strings; electrons in atoms obey the same rule, as the orbitals class shows.',
      set: { n: 3 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 115. Zooming into steel
// ---------------------------------------------------------------------------
export const microscope_zoom = {
  ...um_mate1.microscope_zoom,
  ease: 1,
  beats: [
    {
      say: 'A steel bar, in a field of view 1 metre wide. To the eye it looks perfectly uniform.',
      set: { z: 0 },
      ms: 8000,
      notes: [{ text: 'to the eye: perfectly uniform steel', at: [0, -1.8], to: [0, -0.1] }],
    },
    {
      say: 'Cut a piece, polish it to a mirror, etch it with a little acid, and zoom in. 1 centimetre across: still nothing to see.',
      set: { z: -2 },
      ms: 9500,
    },
    {
      say: '1 millimetre across: the steel is a patchwork of grains. Each grain is a separate crystal, about 50 micrometres across, with its atoms lined up a different way.',
      set: { z: -3 },
      ms: 11000,
      notes: [{ text: 'each patch is a separate crystal: a grain, about 50 μm across', at: [0, 0] }],
    },
    {
      say: 'Henry Sorby first saw this in 1863, and founded metallography: reading a metal’s history from its structure.',
      set: {},
      ms: 9000,
    },
    {
      say: 'At 10 micrometres some grains are striped: pearlite, thin layers of iron and iron carbide about 0.3 micrometres apart. A light microscope just manages this.',
      set: { z: -5 },
      ms: 11000,
      notes: [{ text: 'pearlite: thin layers of iron and iron carbide, 0.3 μm apart', at: [0, 0] }],
    },
    {
      say: 'Light can’t show anything smaller than about 0.2 micrometres: its waves are too long. Below that you need electrons, whose waves are far shorter.',
      set: { z: -6.5 },
      ms: 10000,
    },
    {
      say: 'At 3 nanometres you see the rows of iron atoms themselves, 0.29 nanometres apart. Only a transmission electron microscope can show this.',
      set: { z: -8.5 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 05. Orbitals: where electrons are likely to be
// ---------------------------------------------------------------------------
export const orbital_clouds = {
  ...um_chem2.orbital_clouds,
  ease: 2,
  beats: [
    {
      say: 'Electrons are not little planets on tracks. Quantum mechanics only tells us where an electron is likely to be found. Each dot here is one place it might turn up if you looked.',
      set: { orb: '1s', Z: 1 },
      ms: 11000,
    },
    {
      say: 'The 1s orbital: a fuzzy ball, densest at the centre. Hydrogen’s one electron lives here.',
      set: {},
      ms: 8000,
      notes: [{ text: 'the dots crowd around the nucleus: most likely there', at: [-3.6, 2.8, 0], to: [-0.15, 0.1, 0], color: C.blue }],
    },
    {
      say: '2s is bigger, with an empty shell inside it, a node, where the electron is never found. Like the still points on a vibrating string.',
      set: { orb: '2s', Z: 4 },
      ms: 10000,
      notes: [{ text: 'a slice through it: the dark ring is the node', at: [-3.8, 2.8, 0], to: [-0.5, 0.25, 0], color: C.white }],
    },
    {
      say: 'A 2p orbital has two lobes, coloured blue and red for the wave’s two signs, with an empty plane between them. There are three, one along each axis.',
      set: { orb: '2p', Z: 6 },
      ms: 10500,
      notes: [{ text: 'an empty plane between the two lobes', at: [4.2, 1.8, 0], to: [0.9, 0, 0.6], color: C.white }],
    },
    {
      say: 'Each orbital holds at most two electrons. Carbon’s six fill 1s and 2s, with two left over in 2p: those two make carbon’s bonds.',
      set: {},
      ms: 10000,
    },
    {
      say: 'A 3d orbital has four lobes. There are five 3d orbitals.',
      set: { orb: '3dxy', Z: 26 },
      ms: 8000,
      notes: [{ text: 'four lobes, alternating + (blue) and − (red)', at: [-3.6, 2.8, 0], color: C.white }],
    },
    {
      say: 'Iron has six electrons in 3d. Hund’s rule: they spread out one per orbital before pairing up, so four stay unpaired. Those unpaired electrons are what make iron magnetic.',
      set: { orb: '3dz2' },
      ms: 12000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATH 102. The integral as area: toughness
// ---------------------------------------------------------------------------
export const integral_area_toughness_lab = {
  ...calculus.integral_area_toughness_lab,
  ease: 1.6,
  beats: [
    {
      say: 'How much energy does a metal soak up before it breaks? It is the area under its stress–strain curve. But how do you find the area under a curve?',
      set: { n: 1, b: 3.5 },
      ms: 10000,
    },
    {
      say: 'Archimedes’ way: chop it into rectangles whose areas you can work out, and add them up. With 4, some stick out and some fall short.',
      set: { n: 4 },
      ms: 10000,
      notes: [{ text: '4 rectangles: some stick out, some fall short', at: [5.6, 2.6], to: [0.8, 1.8] }],
    },
    { say: 'Use 12 thinner rectangles: the errors shrink.', set: { n: 12 }, ms: 7000 },
    {
      say: '80 thin strips hug the curve almost perfectly. Let their number grow without limit and the sum becomes exact: the integral, written ∫ σ dε.',
      set: { n: 80 },
      ms: 11000,
      notes: [{ text: '80 thin strips hug the curve: that sum is the integral', at: [5.6, 2.6], to: [3.0, 0.5] }],
    },
    {
      say: 'For a material, that area is its toughness: energy absorbed per unit volume before breaking.',
      set: {},
      ms: 8500,
      notes: [{ text: 'area = toughness: energy absorbed before breaking', at: [2.0, -1.4], to: [-4.0, -1.0], color: C.blue }],
    },
    {
      say: 'Break early, at a strain of 1.2, and most of the area is lost. A strong but brittle material can be far less tough than a weaker one that stretches.',
      set: { b: 1.2 },
      ms: 11000,
      notes: [{ text: 'broke early: all the area to the right is lost', at: [3.0, -2.8], to: [-2.5, -2.0], color: C.red }],
    },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 12. Heating ice to steam: hidden heat
// ---------------------------------------------------------------------------
export const heating_curve = {
  ...um_physics.heating_curve,
  ease: 1,
  beats: [
    {
      say: '1 kg of ice at −20 °C. Feed in heat steadily and watch the thermometer.',
      set: { Q: 0 },
      ms: 7000,
    },
    {
      say: 'The ice warms quickly: 42 kJ takes it from −20 to 0 °C.',
      set: { Q: 42 },
      ms: 8000,
      notes: [{ text: '42 kJ: ice warms from −20 to 0 °C', at: [-0.6, -1.2], to: [-3.5, -3.0], color: C.red }],
    },
    {
      say: 'Now the ice melts. 334 kJ goes in and the temperature does not move at all. Joseph Black called this hidden heat “latent”, around 1761. It goes into pulling the crystal apart, not into speeding the molecules up.',
      set: { Q: 300 },
      ms: 13000,
      notes: [{ text: '334 kJ in, yet stuck at 0 °C: the heat is pulling the crystal apart', at: [0.6, -1.0], to: [-2.9, -2.5], color: C.red }],
    },
    {
      say: 'All melted: now the water warms, 418 kJ from 0 to 100 °C.',
      set: { Q: 794 },
      ms: 9000,
    },
    {
      say: 'Boiling is the longest flat part by far: 2,256 kJ, more than five times what it took to heat the water from 0 to 100.',
      set: { Q: 2400 },
      ms: 11000,
      notes: [{ text: 'boiling: 2,256 kJ, the longest flat part by far', at: [3.0, 0.6], to: [2.2, 2.3], color: C.red }],
    },
    {
      say: 'Only then does the steam heat up again. In materials engineering the same flat steps show up whenever a metal melts, freezes or changes its crystal structure.',
      set: { Q: 3090 },
      ms: 10000,
    },
  ],
};
