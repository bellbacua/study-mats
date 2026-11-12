// Story versions, batch 8: weeks 22–25 of the timetable.
import { C } from '../theme';
import { clamp } from '../kit';
import { extend } from './stories3';
import * as chemistry from './chemistry';
import * as um_chem2 from './um_chem2';
import * as um_math2 from './um_math2';
import * as um_mate2 from './um_mate2';
import * as um_physics from './um_physics';

const snap = (v, step, lo, hi) => clamp(Math.round(v / step) * step, lo, hi);

// ---------------------------------------------------------------------------
// MATE 112. X-ray diffraction: Bragg's law
// ---------------------------------------------------------------------------
export const bragg_planes = {
  ...um_mate2.bragg_planes,
  ease: 1.4,
  beats: [
    {
      say: 'Atoms are far too small to see with light. But X-rays have a wavelength about the size of the gaps between atom layers, 0.154 nm here, so a crystal can reflect them in a special way.',
      set: { tt: 30, hkl: '111' },
      ms: 11000,
    },
    {
      say: 'Each layer of atoms reflects a little of the beam. The wave from the second layer travels a bit further than the wave from the first.',
      set: {},
      ms: 9500,
    },
    {
      say: 'At this angle the extra distance is not a whole wavelength, so the waves arrive out of step. Over many layers the mismatches cancel: almost no reflection.',
      set: {},
      ms: 10500,
      notes: [
        { text: 'out of step with plane 1', at: [-4.6, 0.6], to: [-3.0, -1.3] },
        { text: 'over many planes the mismatches cancel → almost nothing', at: [4.4, 0.4], to: [1.7, -3.0] },
      ],
    },
    {
      say: 'Turn the detector slowly…',
      set: { tt: 40 },
      ms: 7000,
    },
    {
      say: '…until the extra path, 2d sin θ, is exactly one wavelength. Now every layer’s wave lines up with the next, and a bright peak appears at 2θ = 43.3°.',
      set: { tt: 43.3 },
      ms: 11000,
      notes: [
        { text: 'extra path = one whole wavelength: the waves line up', at: [-4.4, 0.5], to: [-3.0, -2.6], color: C.gold },
        { text: 'a bright peak', at: [4.6, 1.6], to: [2.7, 2.9] },
      ],
    },
    {
      say: 'That is Bragg’s law, nλ = 2d sin θ, found by William and Lawrence Bragg, father and son, in 1913. Measure the angle, and you know the spacing d.',
      set: {},
      ms: 10500,
    },
    {
      say: 'The (220) planes are closer together, so their peak sits at a larger angle, 74.1°. Every material has its own set of peaks: a fingerprint labs use to identify it.',
      set: { tt: 74.1, hkl: '220' },
      ms: 11000,
      notes: [{ text: 'closer planes → the peak moves to a larger angle', at: [2.8, 0.4], to: [4.6, 2.8], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// PHYS 13. Lenses: where the image forms
// ---------------------------------------------------------------------------
export const lens_rays = extend(um_physics.lens_rays, {
  ease: 1.8,
  beats: [
    {
      say: 'A convex lens bends light rays toward the middle. Rays coming in parallel all meet at one point: the focus, a focal length f from the lens.',
      set: { d: 25, f: 10 },
      ms: 10000,
    },
    {
      say: 'Put an object far away, beyond 2f. Follow two rays from its tip: one parallel then through the focus, one straight through the centre. Where they meet, an image forms.',
      set: {},
      ms: 11000,
      notes: [{ text: 'object far away (beyond 2f)', at: [-5.6, 2.8], to: [-5.3, 1.3] }],
    },
    {
      say: 'The image is small and upside down. A camera and your own eye work like this.',
      set: {},
      ms: 8000,
      notes: [{ text: 'image: small and upside down', at: [3.8, 1.4], to: [2.2, -0.5], color: C.gold }],
    },
    {
      say: 'Bring the object closer, between f and 2f. The image grows, and moves further away. Still upside down. This is the first lens of a microscope.',
      set: { d: 15 },
      ms: 10000,
      notes: [{ text: 'between f and 2f: bigger, still upside down', at: [4.4, 1.6], to: [4.4, -1.6], color: C.gold }],
    },
    {
      say: 'Closer than f, the rays spread apart after the lens and never meet. Your eye traces them back to a large upright image behind the object: a magnifying glass.',
      set: { d: 6 },
      ms: 11000,
      notes: [
        { text: 'object inside f', at: [-3.4, -1.8], to: [-1.9, 0.6] },
        { text: 'your eye traces the rays back: a big upright image', at: [4.6, 0.8], to: [-3.4, 2.6], color: C.gold },
      ],
    },
    {
      say: 'One rule covers every case: 1/f = 1/dₒ + 1/dᵢ. Drag the object along the axis, or the focus, and watch the image follow.',
      set: { d: 20 },
      ms: 9000,
    },
  ],
  more(kit) {
    const sx = 0.18;
    const ox = -0.8;
    const ho = kit.handle([0, 0], { color: C.white, onDrag: ([x]) => ({ d: snap((ox - x) / sx, 0.5, 4, 30) }) });
    const hf = kit.handle([0, 0], { color: C.gold, r: 0.12, onDrag: ([x]) => ({ f: snap((x - ox) / sx, 0.5, 5, 15) }) });
    return (p) => {
      ho.set([ox - p.d * sx, 0]);
      hf.set([ox + p.f * sx, 0]);
    };
  },
});

// ---------------------------------------------------------------------------
// MATH 17. Two tricks for integrals
// ---------------------------------------------------------------------------
export const integration_methods = {
  ...um_math2.integration_methods,
  ease: 1.6,
  beats: [
    {
      say: 'Some areas look awkward. Here: the area under 2x cos(x²), from 0 to 1.',
      set: { method: 'sub', a: 1 },
      ms: 8000,
      notes: [{ text: 'an awkward area…', at: [-5.2, -2.8], to: [-5.8, 0.4], color: C.green }],
    },
    {
      say: 'Substitution: rename x² as u. The 2x stretches each sliver so that, measured along u, the same area sits under plain cos u, from 0 to 1. That is sin 1 ≈ 0.84.',
      set: {},
      ms: 12000,
      notes: [{ text: '…is the same area under cos u: sin 1 ≈ 0.84', at: [4.6, 1.4], to: [2.2, 1.2], color: C.green }],
    },
    {
      say: 'Push the upper limit further. Both areas dip below the axis together and always match: sin(a²). Substitution only relabels the axis; it never changes the area.',
      set: { a: 2 },
      ms: 11000,
      notes: [{ text: 'both dip below the axis together and always match', at: [0, -3.4], color: C.red }],
    },
    {
      say: 'The second trick, integration by parts. We want the area under ln u, from 1 to b. Hard to do directly.',
      set: { method: 'parts', b: 4 },
      ms: 9500,
    },
    {
      say: 'Look at the whole rectangle, b wide and ln b tall. It splits into two pieces: the area under ln u, and the area beside it, which is the area under eᵛ, easy: b − 1.',
      set: {},
      ms: 12000,
      notes: [
        { text: 'hard: the area under ln u', at: [4.4, -1.6], to: [1.0, -1.6], color: C.blue },
        { text: 'easy: the area beside it, b − 1', at: [-3.6, 3.0], to: [-4.6, 0.6], color: C.green },
      ],
    },
    {
      say: 'So the hard piece is the rectangle minus the easy piece: b ln b − (b − 1). Integration by parts is always this picture: one area traded for another.',
      set: { b: 5 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 15. The shapes of carbon chains
// ---------------------------------------------------------------------------
export const carbon_chains = {
  ...um_chem2.carbon_chains,
  ease: 2,
  beats: [
    {
      say: 'Carbon makes four bonds. In methane, the four hydrogens push as far apart as they can, to the corners of a tetrahedron.',
      set: { mol: 'methane' },
      ms: 9000,
      notes: [{ text: 'carbon in the middle, a hydrogen at each corner', at: [-4.2, 2.8, 0], color: C.white }],
    },
    {
      say: 'Every H–C–H angle is 109.5°, not the 90° a flat cross would give. Turn it and see.',
      set: {},
      ms: 9000,
      notes: [{ text: 'every H–C–H angle: 109.5°', at: [4.2, -2.6, 0], color: C.yellow }],
    },
    { say: 'Carbon can bond to carbon. Ethane: two tetrahedra joined.', set: { mol: 'ethane' }, ms: 7000 },
    {
      say: 'Butane, the gas in LPG tanks: four carbons. Because every carbon is a tetrahedron, the chain zigzags; it is never straight.',
      set: { mol: 'butane' },
      ms: 9500,
      notes: [{ text: 'every carbon is a tetrahedron, so the chain zigzags', at: [0, -3.2, 0], color: C.yellow }],
    },
    {
      say: 'Ethene has a double bond. Each carbon goes flat, with 120° angles, and the double bond cannot twist. Ethene is the building block of polyethylene.',
      set: { mol: 'ethene' },
      ms: 10500,
      notes: [{ text: 'double bond: flat, and it cannot twist', at: [0, -2.8, 0], to: [0, -0.15, 0], color: C.yellow }],
    },
    {
      say: 'Ethyne, with a triple bond, is a straight line: 180°. It is acetylene, the fuel in a welding torch.',
      set: { mol: 'ethyne' },
      ms: 9000,
    },
    {
      say: 'Benzene: a ring of six carbons, perfectly flat. Kekulé proposed the ring in 1865; the extra bonding is shared evenly all the way round.',
      set: { mol: 'benzene' },
      ms: 10500,
      notes: [{ text: 'six carbons in one flat ring', at: [4.4, -2.8, 0], to: [0.3, -0.2, 0], color: C.yellow }],
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 116. Entropy: counting arrangements
// ---------------------------------------------------------------------------
export const entropy_mixing = {
  ...um_mate2.entropy_mixing,
  ease: 1.8,
  beats: [
    {
      say: 'A tiny crystal with 64 sites. Pure copper: every site holds copper. There is exactly one way to arrange it.',
      set: { n: 0 },
      ms: 8500,
      notes: [{ text: 'pure copper: one arrangement, W = 1, S = 0', at: [4.4, -1.2], to: [1.3, -3.4] }],
    },
    {
      say: 'Boltzmann’s idea: entropy counts arrangements. S = k ln W, where W is the number of ways. One way: ln 1 = 0, so zero entropy.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Swap in one nickel atom. It can sit on any of the 64 sites: 64 arrangements. Atoms jiggle and swap, and every arrangement is equally likely.',
      set: { n: 1 },
      ms: 10000,
      notes: [{ text: 'one nickel, any of 64 sites → 64 arrangements', at: [4.4, -1.2], color: C.teal }],
    },
    { say: 'Eight nickel atoms: over 4 billion arrangements.', set: { n: 8 }, ms: 7500 },
    {
      say: 'Half and half: about 1.8 × 10¹⁸ arrangements, the most possible.',
      set: { n: 32 },
      ms: 8500,
      notes: [{ text: 'half and half: the most arrangements of all', at: [4.4, -1.2], to: [4.0, 3.3], color: C.gold }],
    },
    {
      say: 'Almost all of those arrangements look “mixed”. Only a handful look sorted. That is why a mixture never un-mixes on its own: not a force, just overwhelming odds.',
      set: {},
      ms: 11000,
    },
    {
      say: 'Past half, the count falls again: 63 nickel atoms is as few arrangements as 1. Mixing entropy is one reason metals so readily dissolve into each other to form alloys.',
      set: { n: 63 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// MATE 113. Defects: what makes a real crystal
// ---------------------------------------------------------------------------
export const defect_lattice = {
  ...um_mate2.defect_lattice,
  ease: 2,
  beats: [
    {
      say: 'A perfect crystal: every atom in its place, row after row. Real crystals are never perfect, and the flaws decide most of their properties.',
      set: { type: 'perfect', T: 300 },
      ms: 9500,
    },
    {
      say: 'A vacancy: one site is empty, and its neighbours sag slightly inward. Atoms move through a solid by hopping into vacancies.',
      set: { type: 'vacancy' },
      ms: 9500,
      notes: [{ text: 'a vacancy: one empty site', at: [-3.6, -3.2], to: [-3.6, -0.35], color: C.red }],
    },
    {
      say: 'At room temperature, fewer than 1 site in 10¹⁴ is empty. Heat copper near its melting point and the atoms shake so hard that about 1 site in 10,000 is empty.',
      set: { T: 1350 },
      ms: 11000,
      notes: [{ text: 'near melting: about 1 site in 10,000 is empty', at: [4.4, -1.6], to: [6.8, 3.2] }],
    },
    {
      say: 'An interstitial: a small atom, like carbon in iron, squeezed between the rows. It pushes its neighbours apart. That strain is a big part of what makes steel hard.',
      set: { type: 'interstitial', T: 300 },
      ms: 11000,
      notes: [{ text: 'an extra small atom squeezed in, pushing its neighbours apart', at: [-3.6, -3.2], to: [-3.3, 0.0], color: C.teal }],
    },
    {
      say: 'A grain boundary: two crystals with different tilts meet, and the atoms along the seam fit badly. You saw grains under the microscope in week 21.',
      set: { type: 'boundary' },
      ms: 10500,
      notes: [{ text: 'grain boundary: two crystals at different tilts meet', at: [-3.6, -3.4], to: [-3.45, -1.6], color: C.red }],
    },
    {
      say: 'Smaller grains mean more boundaries to block slipping atoms, so a fine-grained metal is stronger. Engineers control defects on purpose: that is most of materials engineering.',
      set: {},
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 14. Measuring concentration with light
// ---------------------------------------------------------------------------
export const beer_lambert = {
  ...um_chem2.beer_lambert,
  ease: 1.8,
  beats: [
    {
      say: 'How much copper is dissolved in a blue solution? Shine light through it and measure how much gets out the other side.',
      set: { c: 0, l: '1' },
      ms: 8500,
    },
    {
      say: 'At 0.04 mol per litre, the copper ions absorb about two thirds of the light. Only a third gets through.',
      set: { c: 0.04 },
      ms: 8500,
      notes: [{ text: 'two thirds absorbed; a third gets through', at: [-0.6, 3.8], to: [-2.6, 2.7] }],
    },
    {
      say: 'Chemists use absorbance, A = −log₁₀ of the fraction that gets through. It rises in a straight line with concentration: Beer and Lambert’s law, A = ε × l × c.',
      set: {},
      ms: 11000,
      notes: [{ text: 'absorbance A rises in a straight line with concentration', at: [5.4, -1.8], to: [1.6, -2.6] }],
    },
    {
      say: 'Double the concentration and the absorbance doubles. But the light getting through drops from about 33% to 11%: each layer takes the same fraction of what is left.',
      set: { c: 0.08 },
      ms: 11000,
      notes: [
        { text: 'double the concentration: A doubles…', at: [5.4, -1.8], to: [0.2, -2.9], color: C.gold },
        { text: '…but only 11% gets through', at: [2.6, 3.6], to: [4.0, 2.1], color: C.red },
      ],
    },
    {
      say: 'Keep 0.04 M but use a 2 cm cell instead of 1 cm. The light now crosses twice as many ions: exactly the same as doubling the concentration.',
      set: { c: 0.04, l: '2' },
      ms: 10500,
      notes: [{ text: '2 cm cell: twice the path, like doubling the concentration', at: [1.6, 3.7], to: [-2.2, 2.6] }],
    },
    {
      say: 'Measure the absorbance of an unknown sample, read the concentration off the straight line, and you’re done. This is how labs check metal content in water and ores.',
      set: { l: '1', c: 0.06 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 101. Gibbs energy: will it happen by itself?
// ---------------------------------------------------------------------------
export const gibbs_free_energy_lab = extend(chemistry.gibbs_free_energy_lab, {
  ease: 1.6,
  beats: [
    {
      say: 'Will a reaction happen on its own? Gibbs (1876) combined two tendencies into one number, ΔG = ΔH − TΔS. If ΔG is below zero, yes.',
      set: { dH: 100, dS: 200, T: 300 },
      ms: 10500,
    },
    {
      say: 'Here the reaction absorbs heat, ΔH = +100 kJ: a push against it. At room temperature ΔG is above zero, so it will not go by itself.',
      set: {},
      ms: 10000,
      notes: [{ text: 'ΔG above zero: it will not go by itself', at: [-2.6, 2.2], to: [-4.5, 0.4], color: C.red }],
    },
    {
      say: 'But it also makes things more disordered, ΔS > 0, which pulls in favour. That pull, TΔS, grows with temperature, so the line slopes down.',
      set: { T: 450 },
      ms: 10500,
      notes: [{ text: '−TΔS grows with T, so the line falls', at: [2.4, 1.6], to: [0.5, -0.6] }],
    },
    {
      say: 'It crosses zero at T = ΔH ÷ ΔS = 100,000 ÷ 200 = 500 K.',
      set: { T: 500 },
      ms: 9000,
      notes: [{ text: 'crosses zero at T = ΔH/ΔS = 500 K', at: [-3.2, 2.4], to: [-3.25, 0.1], color: C.gold }],
    },
    {
      say: 'Above 500 K, ΔG is negative: the reaction runs by itself. This is how a furnace “unlocks” reactions, like reducing ore to metal.',
      set: { T: 1200 },
      ms: 10500,
      notes: [{ text: 'below zero: it runs by itself', at: [1.6, -2.6], to: [1.2, -0.9], color: C.green }],
    },
    {
      say: 'Flip the signs, heat released and order increasing, like water freezing, and it is the other way: it runs only below a crossover. Water freezes only below 273 K.',
      set: { dH: -100, dS: -200, T: 300 },
      ms: 11000,
    },
    { say: 'Drag the point along the line to change the temperature.', set: { dH: 100, dS: 200, T: 800 }, ms: 6000 },
  ],
  more(kit) {
    const sx = 13 / 2000;
    const sy = 7.4 / 1200;
    const h = kit.handle([0, 0], { color: C.gold, onDrag: ([x]) => ({ T: snap((x + 6.5) / sx, 10, 0, 2000) }) });
    return (p) => {
      const G = p.dH - (p.T * p.dS) / 1000;
      h.set([-6.5 + p.T * sx, clamp(G, -600, 600) * sy]);
    };
  },
});

// ---------------------------------------------------------------------------
// MATH 18. Volumes by slicing into disks
// ---------------------------------------------------------------------------
export const disk_volume = {
  ...um_math2.disk_volume,
  ease: 1.8,
  beats: [
    {
      say: 'Spin a straight slanted line around an axis and it sweeps out a cone. How much does the cone hold?',
      set: { shape: 'cone', N: 2 },
      ms: 8500,
      notes: [{ text: 'the straight line being spun', at: [4.4, 3.0, 0], to: [2.4, 1.75, 0], color: C.yellow }],
    },
    {
      say: 'Slice it like a loaf into disks. Each disk is a short cylinder: volume π r² × thickness. With 4 disks it is a stepped tower, a rough estimate.',
      set: { N: 4 },
      ms: 10500,
      notes: [{ text: 'only 4 disks: a stepped tower', at: [-4.4, 2.6, 0], to: [-1.2, 0.8, 0], color: C.blue }],
    },
    { say: 'Twelve thinner disks: the steps shrink.', set: { N: 12 }, ms: 7000 },
    {
      say: '40 thin disks and the total is within 0.1% of the exact answer, ⅓ π r² h. The integral is what the sum becomes as the disks get infinitely thin.',
      set: { N: 40 },
      ms: 11000,
      notes: [{ text: '40 thin disks: the steps almost vanish', at: [-3.6, 2.8, 0], to: [1.0, 1.2, 0], color: C.blue }],
    },
    {
      say: 'Kepler, 1615, wanted to know how much wine a barrel held. A curved side, but the same method: slice, add π r² × thickness, let the slices thin out.',
      set: { shape: 'barrel', N: 12 },
      ms: 11000,
      notes: [{ text: 'each slice adds π r² × its thickness', at: [-4.4, 2.9, 0], to: [-0.5, 0.6, 1.4], color: C.blue }],
    },
    { say: 'Engineers use exactly this to find the volume, and so the mass, of any turned part: shafts, nozzles, pressure vessels.', set: { N: 40 }, ms: 9000 },
  ],
};

// ---------------------------------------------------------------------------
// CHEM 16. Functional groups: the working parts of molecules
// ---------------------------------------------------------------------------
export const functional_groups = {
  ...um_chem2.functional_groups,
  ease: 2,
  beats: [
    {
      say: 'A carbon chain on its own does little. Attach a small group of other atoms and the molecule’s whole behaviour changes. These groups are called functional groups.',
      set: { mol: 'ethanol' },
      ms: 10000,
    },
    {
      say: 'Ethanol: a two-carbon chain with an –OH group, glowing. The –OH makes it an alcohol and lets it mix with water.',
      set: {},
      ms: 9000,
      notes: [{ text: 'the glowing –OH is what makes it an alcohol', at: [0, -3.2, 0], color: C.yellow }],
    },
    {
      say: 'Acetic acid, the acid in vinegar: the –COOH group. Its end hydrogen can be handed away as H⁺, which is what makes it an acid.',
      set: { mol: 'acetic' },
      ms: 10000,
      notes: [{ text: 'the glowing –COOH: its H can leave, so it is an acid', at: [0, -3.2, 0], color: C.yellow }],
    },
    {
      say: 'Acetone, nail-polish remover: a C=O in the middle of the chain. A ketone, a strong solvent.',
      set: { mol: 'acetone' },
      ms: 9000,
    },
    {
      say: 'An ester: an acid and an alcohol joined, with water given off. Long chains of ester links make polyester cloth and PET bottles.',
      set: { mol: 'ester' },
      ms: 10000,
      notes: [{ text: 'the glowing ester link –COO– joins acid and alcohol', at: [0, -3.2, 0], color: C.yellow }],
    },
    {
      say: 'An amine carries nitrogen, –NH₂. Amines join with acids to make the amide links in nylon and in every protein.',
      set: { mol: 'amine' },
      ms: 10000,
    },
  ],
};
