// Materials + Electronics: the combined ("Frankenstein") program.
// Everything the first two years of UM's BS Materials Engineering need (the
// Materials timetable, weeks 1-32) woven together with the first two years of
// UM's BS Electronics Engineering (circuits, electromagnetics, devices and
// communications), plus a head start on ECE year 3 (logic circuits, signals,
// modulation). Each subject keeps its own historical order, and no class uses
// an idea before an earlier class has introduced it.
//
// Course codes come from the UM ECE prospectus (2026) and the UM MatE one.
// Electrical Engineering shares nearly all of ECE's first two years
// (Electrical Circuits 1 and 2, Electromagnetics, Electronic Devices), so this
// also prepares you for BS Electrical Engineering.
import { UM_TAGS as MATE_TAGS } from './mate';

export const COURSES = {
  'CEE 111': 'Materials Science and Engineering',
  'CEE 116': 'Physics 2 for Engineers',
  'EDP 101': 'Computer Fundamentals and Programming',
  'BEE 211': 'Electrical Circuits 1',
  'BECE 211': 'Electronics Devices and Circuits 1',
  'BEE 223': 'Electrical Circuits 2',
  'BECE 222': 'Electronic Circuits Analysis and Design',
  'BECE 223': 'Principles of Communication Systems',
  'BECE 224': 'Electromagnetics',
  'BECE 221': 'Advanced Engineering Mathematics for ECE',
  'BECE 311': 'Logic Circuits and Switching Theory',
  'BECE 313': 'Signals, Spectra, Signal Processing',
  'BECE 314': 'Modulation and Coding Techniques',
  'BECE 212': 'ECE Laws, Contracts, Ethics, Standards and Safety',
};

export const WEEKS = [
  ['num-001', 'chem-000', 'num-002'], //  1 counting · Lavoisier · writing numbers
  ['num-003', 'num-004', 'phys-001'], //  2 zero · + − · measuring the world
  ['num-005', 'mate-001', 'phys-002'], //  3 × ÷ · what a materials engineer does · Archimedes
  ['num-006', 'phys-003', 'math-002'], //  4 primes · Galileo · fractions
  ['math-001', 'chem-002', 'num-007'], //  5 negatives · units · decimals
  ['num-008', 'eng-001', 'math-004'], //  6 irrationals · technical drawing · exponents
  ['num-010', 'chem-003', 'geo-001'], //  7 maths symbols · the mole · Pythagoras
  ['chem-004', 'math-003', 'phys-004'], //  8 periodic table · algebra · Newton
  ['chem-001', 'math-005', 'phys-005'], //  9 the atom · graphs · energy
  ['chem-006', 'math-009', 'mate-100'], // 10 gas laws · functions · bonding
  ['geo-002', 'chem-013', 'mate-102'], // 11 trigonometry · gravimetric analysis · crystals
  ['math-006', 'mate-110', 'eng-002'], // 12 quadratics · families of materials · CAD
  ['math-010', 'phys-101', 'num-009'], // 13 radians & waves · stress & strain · complex numbers
  ['math-011', 'chem-007', 'phys-006'], // 14 vectors · solutions · electricity
  ['ee-100', 'math-007', 'ee-101'], // 15 electric shock · systems · Coulomb
  ['phys-007', 'math-008', 'ee-102'], // 16 projectiles · logarithms · fields and voltage
  ['chem-008', 'math-016', 'mate-111'], // 17 reaction rates · e · Miller indices
  ['phys-207', 'ee-104', 'chem-009'], // 18 Kirchhoff · magnetism from current · equilibrium
  ['phys-008', 'math-012', 'ee-106'], // 19 momentum · limits · circuit analysis
  ['chem-010', 'math-101', 'ee-103'], // 20 acids & pH · derivatives · capacitors
  ['phys-009', 'ee-107', 'chem-011'], // 21 rotation · meters · redox
  ['math-014', 'mate-114', 'phys-208'], // 22 derivative rules · hardness · induction
  ['phys-010', 'ee-105', 'chem-012'], // 23 springs · inductors · titration
  ['math-015', 'phys-011', 'mate-115'], // 24 optimisation · waves · microscopes
  ['chem-005', 'phys-209', 'comp-001'], // 25 orbitals · AC power · Boole's 1s and 0s
  ['math-102', 'phys-012', 'mate-112'], // 26 integrals · heat · X-ray diffraction
  ['phys-013', 'math-017', 'chem-015'], // 27 light & lenses · integration methods · organic chemistry
  ['mate-116', 'mate-113', 'chem-014'], // 28 entropy · defects · spectroscopy
  ['chem-101', 'math-018', 'chem-016'], // 29 Gibbs energy · using integrals · functional groups
  ['mate-201', 'math-020', 'mate-301'], // 30 diffusion · partial derivatives · polymers
  ['mate-117', 'math-022', 'mate-118'], // 31 phase rule · probability · band theory
  ['mate-202', 'math-021', 'mate-401'], // 32 phase diagrams · statistics · semiconductors
  ['mate-119', 'math-019', 'ee-115'], // 33 nucleation · series · diodes
  ['math-023', 'ee-116', 'mate-203'], // 34 regression · the transistor · heat treatment
  ['math-024', 'mate-302', 'math-025'], // 35 hypothesis tests · ceramics · differential equations
  ['math-026', 'ee-117', 'eng-003'], // 36 vibrations · op-amps · data tools
  ['ee-108', 'chem-017', 'math-027'], // 37 RLC ringing · environment · matrices
  ['ee-109', 'ee-111', 'phys-201'], // 38 phasors · Maxwell · forces in balance
  ['ee-110', 'ece-201', 'eng-004'], // 39 filters · digital logic · interest and time
  ['ee-113', 'ee-112', 'phys-205'], // 40 Laplace · antennas · rigid-body rotation
  ['ee-114', 'ece-202', 'eng-005'], // 41 Fourier · flip-flops · comparing alternatives
  ['ece-204', 'ece-203'], // 42 modulation · sampling
];

// Where each stage starts, named by its first class, so the headings stay right
// if weeks move (the ECE program reuses them on a shorter timetable).
export const STAGE_MARKS = [
  { at: 'num-001', title: 'Foundations', note: 'Numbers, matter, motion and electricity from the very beginning' },
  { at: 'chem-006', title: 'Year 1, first semester prep', note: 'CEE 200 Math Plus · BCHE 111 Chemistry · MATE 101 · CEE 111 Materials Science starts' },
  { at: 'ee-100', title: 'Year 1, second semester prep', note: 'CEE 101 Calculus 1 · DRAW 102 · MATE 102 / 103 · first circuits (BEE 211)' },
  { at: 'chem-005', title: 'Year 1 term 9 and Year 2, first semester prep', note: 'CEE 102 / 116 Physics · BEE 211 Circuits 1 · BECE 211 Devices · CEE 103 Calculus 2 · CEE 105 Data · MatE Year 2' },
  { at: 'math-024', title: 'Year 2, second semester prep', note: 'CEE 104 Differential equations · BEE 223 Circuits 2 · BECE 222 · BECE 223 Communications · BECE 224 Electromagnetics' },
  { at: 'ee-113', title: 'Head start on ECE Year 3', note: 'BECE 221 Advanced math · BECE 311 Logic circuits · BECE 313 Signals · BECE 314 Modulation' },
];

export function stagesFor(weeks, marks) {
  const weekOf = (id) => weeks.findIndex((w) => w.includes(id)) + 1;
  return marks.map((m) => ({ from: weekOf(m.at), title: m.title, note: m.note })).filter((s) => s.from > 0);
}
export const STAGES = stagesFor(WEEKS, STAGE_MARKS);

const T = (codes, ids) => Object.fromEntries(ids.map((id) => [id, codes]));
// Electronics course tags. They are added to each class's Materials tags.
export const ECE_TAGS = {
  ...T(['CEE 116'], ['phys-006', 'phys-011', 'phys-013', 'ee-101', 'ee-102', 'ee-104']),
  ...T(['BEE 211', 'BECE 212'], ['ee-100']),
  ...T(['BEE 211'], ['phys-207', 'ee-103', 'ee-105', 'ee-106', 'ee-107']),
  ...T(['BEE 223'], ['phys-208', 'phys-209', 'ee-108', 'ee-109', 'ee-110']),
  ...T(['BECE 224'], ['ee-111']),
  ...T(['BECE 224', 'BECE 223'], ['ee-112']),
  ...T(['BECE 221'], ['ee-113']),
  ...T(['BECE 221', 'BECE 313'], ['ee-114']),
  ...T(['BECE 211'], ['ee-115', 'ee-116', 'mate-401']),
  ...T(['BECE 222'], ['ee-117']),
  ...T(['BECE 311'], ['comp-001', 'ece-201', 'ece-202']),
  ...T(['BECE 313'], ['ece-203']),
  ...T(['BECE 223', 'BECE 314'], ['ece-204']),
  ...T(['CEE 111'], ['mate-100', 'mate-102', 'mate-110', 'mate-113', 'mate-118']),
  ...T(['CEE 109'], ['eng-004', 'eng-005']),
};

// Materials tags come from the classes themselves (their `um` field) or the
// Materials program's list; path.js merges them when it builds the timetable.
export const TAGS = Object.fromEntries(
  [...new Set([...Object.keys(MATE_TAGS), ...Object.keys(ECE_TAGS)])].map((id) => [id, [...new Set([...(MATE_TAGS[id] || []), ...(ECE_TAGS[id] || [])])]])
);

export const YEAR_ENDS = [
  { year: 1, lastWeek: 24, slots: 1 },
  { year: 2, lastWeek: 38, slots: 2 },
];
