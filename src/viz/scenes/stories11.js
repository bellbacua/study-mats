// Story versions, batch 11: year 3, first half.
import { C } from '../theme';
import * as um_year3a from './um_year3a';

const Y = um_year3a;

// ---------------------------------------------------------------------------
// ANOVA: comparing three groups at once
// ---------------------------------------------------------------------------
export const anova_groups = {
  ...Y.anova_groups,
  ease: 1.6,
  beats: [
    {
      say: 'Steel tempered at three temperatures, several samples each. Do the temperatures really change the hardness, or is it just scatter?',
      set: { sep: 0, s: 3 },
      ms: 9500,
    },
    {
      say: 'Here the true hardness is the same for all three. The group averages still differ a little, by chance alone.',
      set: {},
      ms: 9500,
      notes: [{ text: 'same true hardness: the groups differ only by chance', at: [-3.8, 2.6] }],
    },
    {
      say: 'ANOVA compares two kinds of spread: between the group averages, and within each group. Their ratio is F. Here F is about 0, so p is about 1: no evidence of a difference.',
      set: {},
      ms: 12000,
      notes: [{ text: 'no spread between groups → F ≈ 0', at: [4.4, 1.2], to: [2.8, -2.9] }],
    },
    {
      say: 'Now the true averages are 3 HRC apart. The spread between groups is large next to the scatter inside them: F = 10, p below 0.001. A real difference.',
      set: { sep: 3 },
      ms: 11000,
      notes: [{ text: 'between ≫ within → F = 10: a real difference', at: [5.9, 0.4], to: [3.0, 1.6], color: C.gold }],
    },
    {
      say: 'A smaller 1.5 HRC gap, hidden in scatter of 4 HRC: F = 1.4, p = 0.26. The groups overlap too much to be sure.',
      set: { sep: 1.5, s: 4 },
      ms: 11000,
      notes: [{ text: 'a small gap lost in big scatter → F = 1.4: not convincing', at: [-3.6, 2.8] }],
    },
    {
      say: 'Ronald Fisher built this method in the 1920s for crop trials at Rothamsted farm. Cut the scatter, with better process control, and the same small gap becomes clear.',
      set: { s: 1 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Compound interest and present worth
// ---------------------------------------------------------------------------
export const compound_growth = {
  ...Y.compound_growth,
  ease: 1.6,
  beats: [
    {
      say: 'Put ₱100,000 in the bank at 8% a year. Simple interest pays the same ₱8,000 each year.',
      set: { mode: 'grow', i: 8, N: 1 },
      ms: 9000,
    },
    {
      say: 'Compound interest pays 8% of whatever is there now, including last year’s interest. Year one is the same, but then it pulls ahead.',
      set: { N: 5 },
      ms: 10000,
    },
    {
      say: 'After 10 years: ₱180,000 simple, ₱215,892 compound.',
      set: { N: 10 },
      ms: 9000,
      notes: [
        { text: 'compound: interest earns interest', at: [-2.0, 2.4], to: [1.4, 0.6], color: C.gold },
        { text: 'simple: the same ₱8,000 every year', at: [3.8, -1.6], to: [2.4, 0.1], color: C.blue },
      ],
    },
    {
      say: 'After 20 years: ₱260,000 against ₱466,096. A quick rule: at 8%, money doubles about every 72 ÷ 8 = 9 years.',
      set: { N: 20 },
      ms: 10500,
      notes: [{ text: 'after 20 years the gap is huge', at: [2.0, -1.6], to: [6.9, 1.6], color: C.gold }],
    },
    {
      say: 'Now run time backwards. Someone offers ₱110,000 in 2 years instead of ₱100,000 today. Which is worth more?',
      set: { mode: 'disc', N: 2 },
      ms: 9500,
    },
    {
      say: 'Divide by 1.08 for each year: 110,000 ÷ 1.08² = ₱94,307 today. Less than ₱100,000, so take the money now. Engineers compare every project this way.',
      set: {},
      ms: 11500,
      notes: [{ text: '₱110,000 in 2 years is worth only ₱94,307 today', at: [0.8, -1.4], to: [-5.3, 2.0], color: C.blue }],
    },
  ],
};

// ---------------------------------------------------------------------------
// DSC: watching a plastic absorb and release heat
// ---------------------------------------------------------------------------
export const dsc_curve = {
  ...Y.dsc_curve,
  ease: 1.4,
  beats: [
    {
      say: 'A DSC, a differential scanning calorimeter (invented in 1962), heats a few milligrams of plastic at a steady 10 °C per minute and measures how much heat it takes.',
      set: { T: 40, m: 'PET' },
      ms: 10500,
    },
    {
      say: 'Quenched PET, the plastic of drink bottles, cooled so fast its chains are a frozen tangle. Near 75 °C the trace steps down: the glass transition. The stiff plastic turns rubbery.',
      set: { T: 80 },
      ms: 11500,
      notes: [{ text: 'glass transition: a step down, it now needs more heat to warm', at: [2.4, 3.2], to: [0.2, -0.8], color: C.gold }],
    },
    {
      say: 'At 130 °C the chains can move enough to line up into crystals. Crystallising gives heat out: a peak pointing up.',
      set: { T: 130 },
      ms: 10500,
      notes: [{ text: 'chains line up and crystallise: heat comes OUT (peak up)', at: [4.4, 3.2], to: [1.8, 0.6], color: C.gold }],
    },
    {
      say: 'Near 250 °C the crystals melt. Melting soaks heat in: a deep dip.',
      set: { T: 250 },
      ms: 9500,
    },
    {
      say: 'Annealed PET was already crystalline, so there is no crystallising peak, just the step and the melting dip. One trace tells you the plastic’s history.',
      set: { m: 'ANN' },
      ms: 11000,
      notes: [
        { text: 'already crystalline: no crystallisation peak', at: [2.6, 3.2], to: [1.8, -0.6] },
        { text: 'melting: heat goes IN (deep dip)', at: [2.6, -2.8], to: [5.6, -2.6], color: C.red },
      ],
    },
    {
      say: 'Polypropylene’s glass transition is below room temperature, so it is already rubbery: that is why a PP hinge can flex thousands of times. It melts near 165 °C.',
      set: { m: 'PP', T: 165 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Friction on a ramp
// ---------------------------------------------------------------------------
export const friction_ramp = {
  ...Y.friction_ramp,
  ease: 1.6,
  beats: [
    {
      say: 'A wooden block on a wooden ramp at 15°. Gravity pulls it down the slope, with force mg sin θ.',
      set: { a: 15, pair: 'wood' },
      ms: 9000,
    },
    {
      say: 'Friction pushes back. It can give at most μₛ times the push into the surface, μₛ mg cos θ. Here the pull is smaller, so friction simply matches it and the block stays.',
      set: {},
      ms: 11500,
      notes: [
        { text: 'friction matches the pull: the block stays', at: [-3.6, 2.6], to: [-3.0, -1.3] },
        { text: 'the pull down the slope is less than the most friction can give', at: [4.6, 2.8], to: [3.6, -2.0], color: C.gold },
      ],
    },
    { say: 'Tilt it further…', set: { a: 24 }, ms: 7000 },
    {
      say: 'The two balance where tan θ = μₛ. For wood on wood, μₛ = 0.5, so at 26.6°. The mass cancels: a heavy block and a light one slip at the same angle.',
      set: { a: 26.5 },
      ms: 11500,
    },
    {
      say: 'Past that, the pull wins. The block slides, and friction drops to the smaller sliding value μₖN, so it speeds up.',
      set: { a: 30 },
      ms: 10000,
      notes: [{ text: 'past 26.6° the pull wins, and it slides', at: [4.6, 2.8], to: [5.4, -0.9], color: C.red }],
    },
    {
      say: 'Oily steel has μₛ = 0.1, so it slides from just 5.7°. Amontons wrote these friction laws down in 1699, and they still guide every brake and conveyor.',
      set: { a: 10, pair: 'oily' },
      ms: 11000,
      notes: [{ text: 'oily steel (μₛ = 0.1) slides from just 5.7°', at: [-2.6, 2.0], to: [-4.0, -1.6], color: C.red }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Welding: the heat-affected zone
// ---------------------------------------------------------------------------
export const weld_haz = {
  ...Y.weld_haz,
  ease: 1.6,
  beats: [
    {
      say: 'An arc weld melts a narrow strip of steel as the torch travels along. Here the plate is seen from above, with the heat spreading out from the weld.',
      set: { I: 150, v: 4 },
      ms: 9500,
    },
    {
      say: 'Heat input is energy per millimetre of weld: more current adds heat, faster travel spreads it thinner. Here, 750 J per mm.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Within about 5 mm of the centre the steel melted: the fusion zone. Beyond it, a band got hotter than 727 °C without melting. Its structure changed: the heat-affected zone.',
      set: {},
      ms: 11500,
      notes: [
        { text: 'melted: the fusion zone', at: [-3.0, 3.0], to: [-6.0, 0.4], color: C.red },
        { text: 'heated past 727 °C: the heat-affected zone', at: [-2.6, -2.2], to: [-5.0, -1.1], color: C.gold },
      ],
    },
    {
      say: 'Weld fast with low current: only 200 J/mm. The zones are thin, but the cold plate around them pulls the heat out in about a second. That quench makes brittle martensite.',
      set: { I: 100, v: 10 },
      ms: 11500,
      notes: [{ text: 'low heat: thin zones, but the cold plate quenches it in about 1 s → brittle', at: [-2.6, -2.2], to: [-4.6, -0.4], color: C.red }],
    },
    {
      say: 'High current, slow travel: 2,500 J/mm. Wide zones and coarse grains, but slow cooling, about 13 s from 800 to 500 °C.',
      set: { I: 250, v: 2 },
      ms: 10500,
      notes: [{ text: 'high heat: wide zones and slow cooling (about 13 s)', at: [-0.8, -2.6], to: [-2.6, -1.6], color: C.gold }],
    },
    {
      say: 'Welders aim between the two. Many weld cracks in bridges and ships began in a heat-affected zone that cooled too fast.',
      set: { I: 180, v: 3.5 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Engineering economics: which furnace?
// ---------------------------------------------------------------------------
export const cashflow_compare = {
  ...Y.cashflow_compare,
  ease: 1.6,
  beats: [
    {
      say: 'Two furnaces. A is cheaper to buy but burns more fuel. B costs more up front but saves fuel every year. Over 10 years, which is cheaper?',
      set: { i: 10 },
      ms: 10000,
    },
    {
      say: 'Money later is worth less than money now, so each year’s fuel bill is shrunk back to today’s value, its present worth. Each bar is one year.',
      set: {},
      ms: 10500,
    },
    {
      say: 'Add them up. A starts cheaper, but its fuel bills pile up faster. At 10% interest, by year 10 B is about ₱340,000 cheaper.',
      set: {},
      ms: 10500,
      notes: [
        { text: 'A starts cheaper, but its fuel bills add up faster', at: [-3.6, 2.6], to: [-2.8, 1.0], color: C.red },
        { text: 'by year 10, B is about ₱340,000 cheaper', at: [-3.4, -0.6], to: [-0.9, 1.3], color: C.blue },
      ],
    },
    {
      say: 'At 25%, money now is precious and future savings are worth little today. Now cheap furnace A wins.',
      set: { i: 25 },
      ms: 10000,
      notes: [{ text: 'at 25%, future savings are worth little today: cheap A wins', at: [-3.6, -0.8], to: [-0.9, 0.0], color: C.red }],
    },
    {
      say: 'At about 16% the two totals end level: the break-even rate. Below it, buy the efficient furnace. Above it, the cheap one.',
      set: { i: 16.1 },
      ms: 10500,
      notes: [{ text: 'about 16%: the totals end level (break-even)', at: [-3.6, -0.8], to: [-0.95, 0.7], color: C.gold }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Design of experiments: the 2³ factorial cube
// ---------------------------------------------------------------------------
export const factorial_cube = {
  ...Y.factorial_cube,
  ease: 1.6,
  beats: [
    {
      say: 'Three things might change a steel’s hardness: tempering temperature (A), tempering time (B) and cooling rate (C). Each at a low and a high setting.',
      set: { eff: 'B', spin: 0.45 },
      ms: 10000,
    },
    {
      say: 'Every combination is one corner of a cube: 2 × 2 × 2 = 8 runs. The number at each corner is the hardness measured.',
      set: { spin: 0.1 },
      ms: 10000,
    },
    {
      say: 'Effect of time: average the top face (long time) and subtract the bottom face (short time). All 8 runs help answer this one question. Result: −4.6 HRC.',
      set: { spin: 0.45 },
      ms: 11500,
      notes: [
        { text: 'top face (long time) against bottom face (short time)', at: [-3.4, 3.6], to: [-3.8, 2.0] },
        { text: 'effect of time: −4.6 HRC', at: [5.0, -2.2], to: [4.4, -0.6], color: C.gold },
      ],
    },
    {
      say: 'Temperature: right face against left. About −8 HRC, the biggest effect.',
      set: { eff: 'A', spin: 0.3 },
      ms: 9500,
      notes: [{ text: 'temperature: right face against left → −8 HRC, the biggest', at: [5.6, -2.6], to: [3.4, -2.0], color: C.red }],
    },
    {
      say: 'The interaction AB asks: does time matter more when the temperature is high? It compares diagonal corners. About −3 HRC: testing one thing at a time would never reveal it.',
      set: { eff: 'AB', spin: -0.3 },
      ms: 12000,
      notes: [{ text: 'interaction AB: invisible if you change one thing at a time', at: [5.0, -2.4], to: [6.6, -0.6], color: C.gold }],
    },
    { say: 'Fisher designed these experiments in the 1920s. Turn the cube and compare the other effects.', set: { eff: 'C', spin: 0.6 }, ms: 8000 },
  ],
};

// ---------------------------------------------------------------------------
// Beams: the second moment of area
// ---------------------------------------------------------------------------
export const section_inertia = {
  ...Y.section_inertia,
  ease: 1.6,
  beats: [
    {
      say: 'Every beam here uses the same 400 mm² of aluminium. Only the shape of the cross-section changes. Watch how much each one sags under the same load.',
      set: { shape: 'flat', load: 1 },
      ms: 10000,
    },
    {
      say: 'A bar laid flat: all its metal sits within 5 mm of the centre line. Its stiffness number, the second moment of area, is I = 3,333 mm⁴. It sags a lot.',
      set: {},
      ms: 11000,
      notes: [
        { text: 'flat: all the metal within 5 mm of the centre', at: [-4.4, -1.6], to: [-4.4, -0.3] },
        { text: 'so it sags a lot', at: [6.4, 1.4], to: [4.6, 1.3], color: C.red },
      ],
    },
    {
      say: 'When a beam bends, its top is squashed and its bottom stretched. Metal far from the centre does the most work, and its share grows with distance squared.',
      set: { shape: 'square' },
      ms: 11000,
    },
    {
      say: 'The same bar on its edge: the metal now reaches 20 mm from the centre. I is 16 times larger.',
      set: { shape: 'edge' },
      ms: 9500,
      notes: [{ text: 'on edge: metal reaches 20 mm out → 16× stiffer (distance counts squared)', at: [-1.8, -2.4], to: [-4.6, 1.8], color: C.gold }],
    },
    {
      say: 'An I-section puts most of its metal in flanges far from the centre: I = 91,733 mm⁴, 28 times the flat bar, with exactly the same area.',
      set: { shape: 'I' },
      ms: 11000,
      notes: [{ text: 'I-beam: metal in flanges far from the centre → 28× the flat bar', at: [-1.6, -2.6], to: [-4.6, 2.0], color: C.gold }],
    },
    { say: 'That is why steel buildings, bridges and even bicycle frames use I-beams and tubes. Try the tube and the T.', set: { shape: 'tube' }, ms: 9000 },
  ],
};

// ---------------------------------------------------------------------------
// The Jominy end-quench test
// ---------------------------------------------------------------------------
export const jominy_bar = {
  ...Y.jominy_bar,
  ease: 1.6,
  beats: [
    {
      say: 'How deep does a steel harden? In 1938 Jominy and Boegehold invented a simple test: heat a bar red hot, then spray water on one end only.',
      set: { d: 1.5, steel: '1045' },
      ms: 10500,
    },
    {
      say: 'The sprayed end cools fastest, about 150 °C per second, and turns to hard martensite: about 56 HRC for plain 1045 steel.',
      set: {},
      ms: 10000,
      notes: [{ text: 'quenched end: cooled at ~150 °C/s → hard martensite', at: [-2.2, -2.6], to: [-5.4, -2.2], color: C.gold }],
    },
    {
      say: 'Each step along the bar cools a bit more slowly. Afterwards, measure the hardness every few millimetres.',
      set: { d: 6 },
      ms: 9000,
    },
    {
      say: 'Just 15 mm along, 1045 cooled at only about 9 °C per second, slow enough to form soft pearlite: 21 HRC. Plain carbon steel hardens only skin-deep.',
      set: { d: 15 },
      ms: 11000,
      notes: [{ text: '15 mm in: only ~9 °C/s → soft pearlite, 21 HRC', at: [-2.0, 1.0], to: [3.6, -2.0], color: C.red }],
    },
    {
      say: '4340, with nickel, chromium and molybdenum, is still 55 HRC at 15 mm. Its alloying slows pearlite down, so even slow cooling makes martensite. Its “hardenability” is high.',
      set: { steel: '4340' },
      ms: 11500,
      notes: [{ text: '4340: alloying delays pearlite → still 55 HRC at 15 mm', at: [-2.0, 1.0], to: [3.6, 2.0], color: C.gold }],
    },
    {
      say: '4140 sits in between. Thick axles and gears need deep hardening, so they are made from alloy steels like these.',
      set: { steel: '4140', d: 20 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Injection moulding: why walls are thin
// ---------------------------------------------------------------------------
export const injection_cycle = {
  ...Y.injection_cycle,
  ease: 1.6,
  beats: [
    {
      say: 'Injection moulding makes most plastic parts: bottle caps, phone cases, chairs. Molten plastic is forced into a cold steel mould.',
      set: { s: 2 },
      ms: 9500,
    },
    {
      say: 'Every part goes through the same cycle: fill, pack (squeeze in a little more as it shrinks), cool, then open and eject. A 2 mm wall: one part every 10.6 s.',
      set: {},
      ms: 11500,
      notes: [{ text: 'fill, pack, cool, eject: one part every 10.6 s', at: [-0.6, -2.8], to: [-4.6, -2.8] }],
    },
    {
      say: 'Cooling is the slow part. Heat must travel out through the plastic, and the time grows with the thickness squared.',
      set: { s: 3 },
      ms: 10000,
    },
    {
      say: 'Double the wall to 4 mm and cooling takes four times as long, about 18 s. The cooling bar now dominates.',
      set: { s: 4 },
      ms: 10000,
      notes: [{ text: 'a 4 mm wall: cooling takes 4× as long', at: [2.6, -3.6], to: [-2.0, -2.8], color: C.blue }],
    },
    {
      say: 'A 6 mm wall needs about 41 s. Thick sections are slow and costly, and they shrink unevenly. So designers keep walls thin and even, and add ribs for strength.',
      set: { s: 6 },
      ms: 11500,
      notes: [{ text: '6 mm: about 41 s of cooling, so designers keep walls thin', at: [0.6, -1.4], to: [1.0, -2.7], color: C.blue }],
    },
  ],
};
