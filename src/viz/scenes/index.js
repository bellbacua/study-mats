import * as foundations from './foundations';
import * as chemistry from './chemistry';
import * as calculus from './calculus';
import * as materials from './materials';
import * as origins from './origins';
import * as matter from './matter';
import * as physics from './physics';
import * as language from './language';
import * as um_math1 from './um_math1';
import * as um_physics from './um_physics';
import * as um_chem1 from './um_chem1';
import * as um_chem2 from './um_chem2';
import * as um_mate1 from './um_mate1';
import * as um_mate2 from './um_mate2';
import * as um_math2 from './um_math2';
import * as um_year3a from './um_year3a';
import * as um_year3b from './um_year3b';
import * as um_year4a from './um_year4a';
import * as um_year4b from './um_year4b';
import * as spec_metals from './spec_metals';
import * as spec_electronic from './spec_electronic';
import * as spec_energy from './spec_energy';
import * as side_philo from './side_philo';
import * as side_bio from './side_bio';
import * as side_comp from './side_comp';
import * as side_econ from './side_econ';
import * as stories1 from './stories1';
import * as stories2 from './stories2';
import * as stories3 from './stories3';
import * as stories4 from './stories4';
import * as stories5 from './stories5';
import * as stories6 from './stories6';
import { NOTES } from './notes';

// The "try this" challenge for each scene, and how we know it's done.
const MISSIONS = {
  number_sets: { mission: 'Find a number that is in ℝ but not in ℚ.' },
  units_ruler: { mission: 'Measure the steel beam in cubits, then in metres.', goal: (t, seen) => t.obj === 'beam' && !!seen.unit?.has('cubit') && t.unit === 'm' },
  lever_balance: { mission: 'Balance a 6 kg weight at 2 m using a 3 kg weight.' },
  galileo_ramp: { mission: 'Roll the ball for 4 seconds on a 10° ramp and check the 1 : 3 : 5 : 7 pattern.' },
  newton_forces: { mission: 'Find the push that gives a 50 kg crate zero acceleration with μ = 0.2.' },
  pendulum_energy: { mission: 'Add friction and watch the energy turn into heat.' },
  ohm_circuit: { mission: 'At 12 V, choose the resistance that gives exactly 3 A.' },
  tally_counting: { mission: 'Count 23 sheep and bundle the notches in fives.', goal: (t) => t.n === 23 && t.group === 'fives' },
  numeral_systems: { mission: 'Write 365 in base 60 like a Babylonian, then in base 2.', goal: (t, seen) => t.N === 365 && !!seen.base?.has(60) && !!seen.base?.has(2) },
  abacus_place_value: { mission: 'Set the frame to 3007 and notice which rods need a zero.', goal: (t) => t.N === 3007 },
  base_ten_addition: { mission: 'Work out 38 + 46 all the way to the carry.', goal: (t) => t.a === 38 && t.b === 46 && t.op === 'add' && t.step === 2 },
  area_multiplication: { mission: 'Split 14 × 13 into four pieces and add them up.', goal: (t) => t.a === 14 && t.b === 13 && t.split === 1 },
  prime_sieve: { mission: 'Finish the sieve, then factor 84.', goal: (t) => t.stage === 4 && t.n === 84 },
  decimal_zoom: { mission: 'Zoom three levels deep on 0.625.', goal: (t) => Math.abs(t.x - 0.625) < 1e-9 && t.depth === 3 },
  irrational_sqrt2: { mission: 'Swing the diagonal onto the line and crowd it with fractions up to 40.', goal: (t) => t.step === 2 && t.Q >= 40 },
  pythagoras_squares: { mission: 'Find another whole-number triple besides 3, 4, 5.', goal: (t) => Number.isInteger(Math.sqrt(t.a * t.a + t.b * t.b)) && !((t.a === 3 && t.b === 4) || (t.a === 4 && t.b === 3)) },
  trig_unit_circle: { mission: 'Find the angle between 0° and 180° where sin θ = ½ again (not 30°).', goal: (t) => t.theta === 150 },
  complex_plane: { mission: 'Start from z = 1 and multiply by i. Then set z = i and multiply by i again: where do you land?', goal: (t, seen) => t.a === 0 && t.b === 1 && t.m === 'i' && !!seen.m?.has('i') },
  electrolysis_water: { mission: 'Run the cell for 10 minutes and check the 2 : 1 ratio.', goal: (t) => t.minutes === 10 && t.amps > 0 },
  periodic_table_3d: { mission: 'Switch to 1871 and find the three gaps Mendeleev predicted.', goal: (t, seen) => t.era === '1871' && ['21', '31', '32'].every((z) => seen.Z?.has(Number(z))) },
  number_line_vectors: { mission: 'Set x = −3 and k = −2 and watch two 180° flips land on +6.' },
  bohr_orbital_builder: { mission: 'Build neutral silicon: 14 protons, 14 neutrons, 14 electrons. Count its valence electrons.' },
  fraction_area_grid: { mission: 'Set A = 2/3 and B = 3/4, then compare A + B with A × B.' },
  dimensional_pipeline: {
    mission: 'Run the iron density conversion to the end: 7.87 g/cm³ → 7,870 kg/m³.',
    goal: (t) => t.example === 'density' && t.stage === 3,
  },
  algebra_balance_beam: { mission: 'Use the two moves until x stands alone.' },
  bonding_energy_well: { mission: 'Slide r to the bottom of the well (≈ 1.12 σ), where the force is zero.' },
  exponent_growth_scaler: { mission: 'Zoom all the way down to 10⁻¹⁰ m, the size of an atom.', goal: (t) => t.n === -10 },
  mole_stoichiometry_reactor: { mission: 'Balance it: 4 Fe + 3 O₂ → 2 Fe₂O₃.' },
  cartesian_slope_wave: { mission: 'Make the line y = 2x − 1.', goal: (t) => t.m === 2 && t.b === -1 },
  crystal_lattice_3d: { mission: 'Look at all three structures and compare their packing.' },
  quadratic_parabola_lab: {
    mission: 'Make y = x² − 5x + 6 and check that it crosses at x = 2 and x = 3.',
    goal: (t) => t.a === 1 && t.b === -5 && t.c === 6,
  },
  linear_system_intersection: {
    mission: 'Make the two lines cross at (1, 2).',
    goal: (t) => {
      if (t.m1 === t.m2) return false;
      const x = (t.b2 - t.b1) / (t.m1 - t.m2);
      return Math.abs(x - 1) < 1e-6 && Math.abs(t.m1 * x + t.b1 - 2) < 1e-6;
    },
  },
  arrhenius_log_linearizer: { mission: 'Switch to the ln k vs 1/T view and watch the curve straighten.', goal: (t) => t.morph === 1 },
  gibbs_free_energy_lab: { mission: 'Slide T past the crossover T* = ΔH/ΔS so ΔG turns negative.' },
  derivative_tangent_lab: {
    mission: 'Shrink h almost to 0, then find an x where the tangent goes flat (slope 0).',
    goal: (t) => t.h <= 0.05 && Math.abs(t.fn === 'wave' ? 2 * Math.cos(t.x0) : t.fn === 'bowl' ? 0.5 * t.x0 : 0.24 * t.x0 ** 2 - 0.9) < 0.1,
  },
  integral_area_toughness_lab: { mission: 'Use 40 or more rectangles and watch the error shrink.' },
  stress_strain_curve_lab: { mission: 'Pull the steel bar all the way to fracture.', goal: (t) => t.mat === 'steel' && t.pull >= 0.97 },
  diffusion_dislocation_lab: {
    mission: 'Get a case depth (2√Dt) deeper than 1 mm.',
    goal: (t) => 2 * Math.sqrt(2.3e-5 * Math.exp(-148000 / (8.314 * (t.T + 273))) * t.hours * 3600) * 1000 > 1,
  },
  phase_diagram_lever_lab: { mission: 'Put the alloy inside the lens so the tie line appears, then read off both fractions.' },
  ttt_cooling_curve_lab: { mission: 'Pick a quench fast enough to make martensite.', goal: (t) => t.medium === 'water' },
  polymer_tg_chain_lab: { mission: 'Cool rubber below its Tg (−70 °C) and watch the chains freeze.', goal: (t) => t.poly === 'rubber' && t.T < -70 },
  griffith_fracture_composite_lab: {
    mission: 'Grow the crack until the plate breaks.',
    goal: (t) => t.s >= { glass: 0.75, alumina: 4, al: 29, steel: 50 }[t.mat] / Math.sqrt(Math.PI * t.a * 1e-3),
  },
  semiconductor_bandgap_lab: { mission: 'Compare pure silicon with n-type silicon.', goal: (_t, seen) => !!seen.dope?.has('n') },
  ashby_corrosion_capstone_lab: {
    mission: 'For a beam, slide the line up until only woods, composites and ceramics stay above it.',
    goal: (t) => t.shape === 2 && t.shift > 0.52 && t.shift < 0.61,
  },
};

// Scenes rebuilt as narrated stories (they carry their own notes per step).
const STORY = new Set([...Object.keys(stories1), ...Object.keys(stories2), ...Object.keys(stories3), ...Object.keys(stories4), ...Object.keys(stories5), ...Object.keys(stories6)]);

// visualLab.type in the curriculum → scene definition
export const SCENES = {};
for (const [type, def] of Object.entries({ ...foundations, ...chemistry, ...calculus, ...materials, ...origins, ...matter, ...physics, ...language, ...um_math1, ...um_physics, ...um_chem1, ...um_chem2, ...um_mate1, ...um_mate2, ...um_math2, ...um_year3a, ...um_year3b, ...um_year4a, ...um_year4b, ...spec_metals, ...spec_electronic, ...spec_energy, ...side_philo, ...side_bio, ...side_comp, ...side_econ, ...stories1, ...stories2, ...stories3, ...stories4, ...stories5, ...stories6 })) {
  if (typeof def !== 'object' || !def.setup) continue;
  SCENES[type] = { ...def, ...MISSIONS[type] };
  // On-picture callouts for each narrated step (see notes.js).
  // Story scenes carry their own notes on each step.
  const notes = STORY.has(type) ? null : NOTES[type];
  if (notes && def.beats) SCENES[type].beats = def.beats.map((b, i) => (notes[i] && !b.notes ? { ...b, notes: notes[i] } : b));
}

export const initialParams = (def) => Object.fromEntries(def.params.map((p) => [p.key, p.value]));
