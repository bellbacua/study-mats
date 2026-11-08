// The study path as a timetable: three classes a week, subjects taking turns.
// Each subject keeps its own historical order, and no class uses an idea
// before another class has introduced it. From week 10 on, classes prepare
// for specific University of Mindanao BS MatE courses (the `um` codes).
import { LESSONS as CORE_LESSONS } from './curriculum';
import { ORIGIN_LESSONS, ORIGIN_READINGS } from './originsLessons';
import { PHYSICS_LESSONS, PHYSICS_READINGS } from './physicsLessons';
import { LESSON_READINGS } from './openSourceReadings';
import { LANGUAGE_LESSON, LANGUAGE_READINGS } from './languageLesson';
import { UM_LESSONS, UM_READINGS, UM_COURSES } from './um';
import { applyCitations } from './citations';
import { TRACKS, YEAR_ENDS, SIDES, SIDES_LATER, PROGRAMS } from './tracks';

const DAYS = { 1: ['Mon'], 2: ['Mon', 'Thu'], 3: ['Mon', 'Wed', 'Fri'], 4: ['Mon', 'Tue', 'Thu', 'Fri'] };

const WEEKS = [
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
  ['math-007', 'phys-007', 'math-008'], // 15 systems · projectiles · logarithms
  ['chem-008', 'math-016', 'mate-111'], // 16 reaction rates · e · Miller indices
  ['chem-009', 'phys-008', 'math-012'], // 17 equilibrium · momentum · limits
  ['chem-010', 'math-101', 'phys-009'], // 18 acids & pH · derivatives · rotation
  ['chem-011', 'math-014', 'mate-114'], // 19 redox · derivative rules · hardness testing
  ['phys-010', 'chem-012', 'math-015'], // 20 springs · titration · optimisation
  ['phys-011', 'mate-115', 'chem-005'], // 21 waves · microscopes · orbitals
  ['math-102', 'phys-012', 'mate-112'], // 22 integrals · heat · X-ray diffraction
  ['phys-013', 'math-017', 'chem-015'], // 23 light & lenses · integration methods · organic chemistry
  ['mate-116', 'mate-113', 'chem-014'], // 24 entropy · defects · spectroscopy
  ['chem-101', 'math-018', 'chem-016'], // 25 Gibbs energy · using integrals · functional groups
  ['mate-201', 'math-020', 'mate-301'], // 26 diffusion · partial derivatives · polymers
  ['mate-117', 'math-022', 'mate-118'], // 27 phase rule · probability · band theory
  ['mate-202', 'math-021', 'mate-401'], // 28 phase diagrams · statistics · semiconductors
  ['mate-119', 'math-019', 'math-023'], // 29 nucleation · series · regression
  ['mate-203', 'math-024', 'mate-302'], // 30 heat treatment · hypothesis tests · ceramics
  ['math-025', 'eng-003', 'chem-017'], // 31 differential equations · data tools · environment
  ['math-026', 'math-027'], // 32 vibrations · matrices
  ['phys-201', 'math-028', 'eng-004'], // 33 forces in balance · analysis of variance · interest and time
  ['mate-120', 'phys-202', 'mate-121'], // 34 thermal analysis · friction · welding
  ['eng-005', 'math-029', 'phys-203'], // 35 comparing alternatives · factorial experiments · centroids
  ['mate-122', 'mate-123', 'phys-204'], // 36 hardenability · polymer processing · trusses
  ['mate-124', 'phys-205', 'phys-207'], // 37 corrosion and Pourbaix · rigid-body rotation · circuit laws
  ['eng-006', 'mate-125', 'phys-208'], // 38 research methods · fatigue · transformers
  ['mate-127', 'phys-206', 'eng-007'], // 39 steels · mechanisms · project management
  ['mate-126', 'phys-209', 'mate-128'], // 40 creep · AC power · glass
  ['eng-008', 'phys-211'], // 41 ethics and disasters · beam bending
  ['mate-130', 'phys-215', 'mate-133'], // 42 casting · pressure and viscosity · brittle fracture
  ['phys-212', 'mate-135', 'mate-131'], // 43 buckling · the nanoscale · metal forming
  ['phys-216', 'phys-213', 'mate-134'], // 44 flow · torsion · failure analysis
  ['mate-132', 'phys-214', 'mate-136'], // 45 powder and sintering · Mohr’s circle · carbon nanomaterials
  ['eng-009', 'mate-137', 'eng-010'], // 46 quality control · biomaterials · plant design
  ['mate-138', 'eng-011', 'mate-139'], // 47 3D printing · technopreneurship · batteries
  ['eng-012', 'mate-402'], // 48 the thesis · capstone: choosing materials
];

// Headings on the roadmap: which part of the journey each week belongs to.
const STAGES = [
  { from: 1, title: 'Foundations', note: 'Numbers, matter and motion from the very beginning' },
  { from: 10, title: 'UM Year 1, first semester prep', note: 'CEE 200 Math Plus · BCHE 111 Chemistry · DRAW 102 · MATE 101' },
  { from: 19, title: 'UM Year 1, second semester prep', note: 'CEE 101 Calculus 1 · MATE 102 Analytical Chem · MATE 103 Structure and properties' },
  { from: 25, title: 'UM Year 2 prep', note: 'Calculus 2 · Statistics · Differential equations · Physics · Thermodynamics · Kinetics · Solid state' },
  { from: 33, title: 'UM Year 3, first semester prep', note: 'CEE 117 Statics · MATE 304 Experiments · CEE 109 Economics · MATE 302 Lab · MATE 303 Elective' },
  { from: 37, title: 'UM Year 3, second semester prep', note: 'MATE 307 Degradation · CEE 118 Dynamics · BEE 319 Electrical · MATE 310 Research · CEE 108 Management · MATE 402 Ethics' },
  { from: 41, title: 'UM Year 4, first semester prep', note: 'BCE 222 Deformable bodies · MATE 305 Processing · MATE 309 Fluids · MATE 401 Forensics · MATE 312 Nano' },
  { from: 46, title: 'UM Year 4, second semester prep', note: 'MATE 406 Quality · MATE 405 Special topics · MATE 306 Plant design · CEE 115 Technopreneurship · Thesis' },
];

// UM courses each of the original classes prepares for.
const UM_TAGS = {
  'chem-000': ['BCHE 111'],
  'phys-001': ['CEE 102'],
  'phys-002': ['CEE 117'],
  'phys-003': ['CEE 102'],
  'math-002': ['CEE 200'],
  'math-001': ['CEE 200'],
  'num-007': ['CEE 200'],
  'chem-002': ['BCHE 111'],
  'num-008': ['CEE 200'],
  'num-010': ['CEE 200'],
  'math-004': ['CEE 200'],
  'chem-003': ['BCHE 111'],
  'geo-001': ['CEE 200'],
  'chem-004': ['BCHE 111'],
  'math-003': ['CEE 200'],
  'phys-004': ['CEE 102'],
  'chem-001': ['BCHE 111'],
  'math-005': ['CEE 200'],
  'phys-005': ['CEE 102'],
  'mate-100': ['BCHE 111', 'MATE 103'],
  'geo-002': ['CEE 200'],
  'mate-102': ['MATE 103'],
  'math-006': ['CEE 200'],
  'phys-101': ['MATE 201'],
  'num-009': ['CEE 200'],
  'phys-006': ['BEE 319'],
  'math-007': ['CEE 200'],
  'math-008': ['CEE 200'],
  'chem-101': ['MATE 202'],
  'math-101': ['CEE 101'],
  'mate-201': ['MATE 206'],
  'math-102': ['CEE 101', 'CEE 103'],
  'mate-202': ['MATE 202'],
  'mate-203': ['MATE 206', 'MATE 305'],
  'mate-301': ['MATE 208', 'MATE 201'],
  'mate-302': ['MATE 201'],
  'mate-401': ['MATE 204'],
  'mate-402': ['MATE 306', 'MATE 307'],
};

export const SUBJECTS = {
  math: 'Math',
  chem: 'Chemistry',
  phys: 'Physics',
  mate: 'Materials',
  eng: 'Engineering',
  philo: 'Philosophy',
  bio: 'Biomolecular',
  comp: 'Computing',
  econ: 'Economics',
};

export { UM_COURSES };

const byId = Object.fromEntries(
  [...CORE_LESSONS, ...ORIGIN_LESSONS, ...PHYSICS_LESSONS, LANGUAGE_LESSON, ...UM_LESSONS].map((l) => [l.id, l])
);

// Classes still being written are skipped rather than breaking the app.
const PLANNED = WEEKS.map((ids) => ids.filter((id) => byId[id])).filter((ids) => ids.length);

export const LESSONS = PLANNED.flatMap((ids, w) =>
  ids.map((id, d) => {
    // Programming analogies (csBridge) were written for a CS graduate; the
    // course now assumes no background, so they are dropped here.
    const { csBridge: _cs, ...lesson } = byId[id];
    return { ...lesson, um: lesson.um || UM_TAGS[id] || [], termId: `week-${w + 1}`, day: DAYS[ids.length][d] };
  })
);

export const CURRICULUM_TERMS = PLANNED.map((ids, w) => {
  const stage = [...STAGES].reverse().find((s) => w + 1 >= s.from);
  return {
    id: `week-${w + 1}`,
    title: `Week ${w + 1}`,
    subtitle: ids.map((id) => SUBJECTS[byId[id].track]).join(' · '),
    stage: stage.title,
    stageNote: stage.note,
  };
});

export const READINGS = { ...LESSON_READINGS, ...ORIGIN_READINGS, ...PHYSICS_READINGS, ...LANGUAGE_READINGS, ...UM_READINGS };

// ---- specializations ---------------------------------------------------------
export { TRACKS, YEAR_ENDS, SIDES, SIDES_LATER, PROGRAMS };

const weekOf = (l) => Number(String(l.termId || '').replace('week-', '')) || 0;

// Track classes that have been written, in track order, with where they sit.
// Side topics use the same shape, marked with side: true and no UM codes.
export const TRACK_LESSONS = [...TRACKS, ...SIDES.map((t) => ({ ...t, side: true }))].flatMap((t) => {
  const written = t.classes.filter((c) => byId[c.id]);
  return written.map((c, i) => ({
    ...byId[c.id],
    um: t.side ? [] : byId[c.id].um || t.um,
    spec: t.id,
    side: Boolean(t.side),
    specIndex: i,
    specCount: written.length,
    after: c.after,
  }));
});
export const ALL_LESSONS = [...LESSONS, ...TRACK_LESSONS];
applyCitations(ALL_LESSONS, READINGS);
const TRACK_BY_ID = Object.fromEntries([...TRACKS, ...SIDES].map((t) => [t.id, t]));
export const trackOf = (l) => (l?.spec ? TRACK_BY_ID[l.spec] : null);
export const trackLessons = (trackId) => TRACK_LESSONS.filter((l) => l.spec === trackId);

// "Week 12" for a core class, "Metals track" for a specialization class.
export const whereLabel = (l) => (l.side ? TRACK_BY_ID[l.spec].title : l.spec ? `${TRACK_BY_ID[l.spec].title} track` : `Week ${weekOf(l)}`);

// How far the core timetable is done, year by year, and how many tracks are open.
export function yearProgress(passed) {
  return YEAR_ENDS.map((y) => {
    const prev = YEAR_ENDS.find((p) => p.year === y.year - 1);
    const from = prev ? prev.lastWeek + 1 : 1;
    const list = LESSONS.filter((l) => weekOf(l) >= from && weekOf(l) <= y.lastWeek);
    const done = list.filter((l) => passed[l.id]).length;
    return { ...y, total: list.length, done, complete: done === list.length };
  });
}
export function openSlots(passed) {
  let slots = 0;
  for (const y of yearProgress(passed)) {
    if (!y.complete) break;
    slots = y.slots;
  }
  return slots;
}

// A track class can be opened once the one before it in the track and its
// core prerequisite are both passed.
export function trackClassState(l, passed) {
  if (passed[l.id]) return { open: true, done: true };
  const list = trackLessons(l.spec);
  const prev = list[l.specIndex - 1];
  if (prev && !passed[prev.id]) return { open: false, why: `Pass “${prev.title.split(':')[0]}” first` };
  if (l.after && byId[l.after] && !passed[l.after]) {
    const core = LESSONS.find((c) => c.id === l.after);
    return { open: false, why: `Needs ${core ? `Week ${weekOf(core)}: ${core.title.split(':')[0]}` : l.after}` };
  }
  return { open: true, done: false };
}

// ---- side topics on the roadmap -------------------------------------------------
// A side topic is saved as the reading id "side:<id>@<week>": the week it was added.
// Its classes then sit in the timetable like GE classes, one a week from that week
// (two a week if there are not enough weeks left).
const LAST_WEEK = CURRICULUM_TERMS.length;
export function pickedSides(readings) {
  return Object.keys(readings || {})
    .map((k) => /^side:([a-z]+)@(\d+)$/.exec(k))
    .filter((m) => m && readings[m[0]] && TRACK_BY_ID[m[1]])
    .map((m) => ({ id: m[1], start: Number(m[2]), key: m[0], topic: TRACK_BY_ID[m[1]] }));
}
export function sideByWeek(readings) {
  const out = {};
  for (const p of pickedSides(readings)) {
    const list = trackLessons(p.id);
    const start = Math.min(Math.max(1, p.start), LAST_WEEK);
    const per = Math.ceil(list.length / Math.max(1, LAST_WEEK - start + 1));
    list.forEach((l, i) => {
      const w = `week-${Math.min(LAST_WEEK, start + Math.floor(i / per))}`;
      (out[w] ||= []).push(l);
    });
  }
  return out;
}
export const weekNumber = weekOf;
