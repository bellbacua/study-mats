// The study path as a timetable: three classes a week, subjects taking turns.
// Each program (src/data/programs) lists its own weeks; this file turns the
// active program's list into lessons with weeks and days, and adds the tracks,
// side topics and classes borrowed from other programs.
import { LESSONS as CORE_LESSONS } from './curriculum';
import { ORIGIN_LESSONS, ORIGIN_READINGS } from './originsLessons';
import { PHYSICS_LESSONS, PHYSICS_READINGS } from './physicsLessons';
import { LESSON_READINGS } from './openSourceReadings';
import { LANGUAGE_LESSON, LANGUAGE_READINGS } from './languageLesson';
import { UM_LESSONS, UM_READINGS, UM_COURSES as UM_ONLY } from './um';
import { applyCitations } from './citations';
import { SIDES, SIDES_LATER } from './tracks';
import { PROGRAM_DATA, PROGRAMS, storedProgram, rememberProgram } from './programs';

const DAYS = { 1: ['Mon'], 2: ['Mon', 'Thu'], 3: ['Mon', 'Wed', 'Fri'], 4: ['Mon', 'Tue', 'Thu', 'Fri'] };

export const PROGRAM_ID = storedProgram();
export const PROGRAM = PROGRAM_DATA[PROGRAM_ID];
export { PROGRAMS, PROGRAM_DATA, rememberProgram };
const TRACKS = PROGRAM.tracks;
const YEAR_ENDS = PROGRAM.years;

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
  prog: 'Programming',
  disc: 'Discrete Math',
  algo: 'Algorithms',
  sys: 'Systems',
  ai: 'AI',
};

// Course names for every program, so a borrowed class still shows its tags.
export const UM_COURSES = { ...UM_ONLY, ...PROGRAM_DATA.cs.courses };

const byId = Object.fromEntries(
  [...CORE_LESSONS, ...ORIGIN_LESSONS, ...PHYSICS_LESSONS, LANGUAGE_LESSON, ...UM_LESSONS].map((l) => [l.id, l])
);

// Classes still being written are skipped rather than breaking the app; the
// roadmap names them as "being written" in their week.
const planOf = (prog) => prog.weeks.map((ids) => ({ ids: ids.filter((id) => byId[id]), soon: ids.filter((id) => !byId[id]) })).filter((w) => w.ids.length);
const lessonsOf = (prog) =>
  planOf(prog).flatMap(({ ids }, w) =>
    ids.map((id, d) => {
      // Programming analogies (csBridge) were written for a CS graduate; the
      // course now assumes no background, so they are dropped here.
      const { csBridge: _cs, ...lesson } = byId[id];
      const um = prog.id === 'mate' ? lesson.um || prog.tags[id] || [] : prog.tags[id] || [];
      return { ...lesson, um, termId: `week-${w + 1}`, day: DAYS[ids.length][d] };
    })
  );
const PLANNED = planOf(PROGRAM);

export const LESSONS = lessonsOf(PROGRAM);

export const CURRICULUM_TERMS = PLANNED.map(({ ids, soon }, w) => {
  const stage = [...PROGRAM.stages].reverse().find((s) => w + 1 >= s.from);
  return {
    id: `week-${w + 1}`,
    title: `Week ${w + 1}`,
    subtitle: ids.map((id) => SUBJECTS[byId[id].track]).join(' · '),
    stage: stage.title,
    stageNote: stage.note,
    soon: soon.map((id) => PROGRAM.soon[id]).filter(Boolean),
  };
});

export const READINGS = { ...LESSON_READINGS, ...ORIGIN_READINGS, ...PHYSICS_READINGS, ...LANGUAGE_READINGS, ...UM_READINGS };

// ---- specializations ---------------------------------------------------------
// A side topic whose classes are all on this program's timetable already
// (Computing, inside Computer Science) is left out.
const IN_CORE = new Set(LESSONS.map((l) => l.id));
const SIDES_HERE = SIDES.filter((t) => !t.classes.length || t.classes.some((c) => !IN_CORE.has(c.id)));
export { TRACKS, YEAR_ENDS, SIDES_HERE as SIDES, SIDES_LATER };
const ALL_TRACKS = Object.values(PROGRAM_DATA).flatMap((p) => p.tracks.map((t) => ({ ...t, program: p.id })));

const weekOf = (l) => Number(String(l.termId || '').replace('week-', '')) || 0;

// Track classes that have been written, in track order, with where they sit.
// Side topics use the same shape, marked with side: true and no UM codes.
// Every program's tracks are here, so a class borrowed from another
// program's track can still be opened.
export const TRACK_LESSONS = [...ALL_TRACKS, ...SIDES.map((t) => ({ ...t, side: true }))].flatMap((t) => {
  const written = t.classes.filter((c) => byId[c.id] && !IN_CORE.has(c.id));
  return written.map((c, i) => ({
    ...byId[c.id],
    um: t.side ? [] : byId[c.id].um || t.um,
    spec: t.id,
    side: Boolean(t.side),
    specIndex: i,
    specCount: written.length,
    after: c.after ?? byId[c.id].after,
    program: t.program,
  }));
});

// Classes on other programs' timetables, which you can borrow. They have no
// week of their own; `from` names the program they come from.
const inHere = new Set([...LESSONS, ...TRACK_LESSONS].map((l) => l.id));
export const PROGRAM_LESSONS = Object.fromEntries(Object.values(PROGRAM_DATA).map((p) => [p.id, p.id === PROGRAM_ID ? LESSONS : lessonsOf(p)]));
const OTHER_LESSONS = Object.values(PROGRAM_DATA)
  .filter((p) => p.id !== PROGRAM_ID)
  .flatMap((p) => PROGRAM_LESSONS[p.id].filter((l) => !inHere.has(l.id) && inHere.add(l.id)).map(({ termId: _t, day: _d, ...l }) => ({ ...l, from: p.id })));

export const ALL_LESSONS = [...LESSONS, ...TRACK_LESSONS, ...OTHER_LESSONS];
applyCitations(ALL_LESSONS, READINGS);
const TRACK_BY_ID = Object.fromEntries([...ALL_TRACKS, ...SIDES].map((t) => [t.id, t]));
const LESSON_BY_ID = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));
export const lessonById = (id) => LESSON_BY_ID[id];
export const trackOf = (l) => (l?.spec ? TRACK_BY_ID[l.spec] : null);
export const trackLessons = (trackId) => TRACK_LESSONS.filter((l) => l.spec === trackId);

// "Week 12" for a core class, "Metals track" for a specialization class.
export const whereLabel = (l) =>
  l.side
    ? TRACK_BY_ID[l.spec].title
    : l.spec
      ? `${TRACK_BY_ID[l.spec].title} track${l.program && l.program !== PROGRAM_ID ? ` (${PROGRAM_DATA[l.program].short})` : ''}`
      : l.from
        ? `From ${PROGRAM_DATA[l.from].short}`
        : `Week ${weekOf(l)}`;

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
  for (const a of [l.after].flat()) {
    if (!a || !byId[a] || passed[a]) continue;
    const core = LESSONS.find((c) => c.id === a);
    const any = LESSON_BY_ID[a];
    return { open: false, why: `Needs ${core ? `Week ${weekOf(core)}: ${core.title.split(':')[0]}` : any ? any.title.split(':')[0] : a}` };
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
  for (const b of borrowed(readings)) (out[`week-${b.week}`] ||= []).push({ ...b.lesson, borrowed: true });
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

// ---- foundations first ---------------------------------------------------------
// What a class builds on: its listed prerequisites (`after`), the class before
// it in its track, and the class before it in the same subject on its home
// program's timetable (the first program that has it).
const HOME_SEQ = {};
for (const p of Object.values(PROGRAM_DATA))
  for (const l of PROGRAM_LESSONS[p.id]) {
    if (HOME_SEQ[l.id]) continue;
    const prev = PROGRAM_LESSONS[p.id].slice(0, PROGRAM_LESSONS[p.id].indexOf(l)).filter((x) => x.track === l.track).pop();
    HOME_SEQ[l.id] = { program: p.id, order: PROGRAM_LESSONS[p.id].indexOf(l), prev: prev?.id };
  }
export function needsOf(id) {
  const l = LESSON_BY_ID[id];
  if (!l) return [];
  const out = new Set([l.after].flat().filter((a) => a && LESSON_BY_ID[a]));
  if (l.spec) {
    const list = trackLessons(l.spec);
    if (list[l.specIndex - 1]) out.add(list[l.specIndex - 1].id);
  } else if (HOME_SEQ[id]?.prev) out.add(HOME_SEQ[id].prev);
  return [...out];
}

// Every class not yet passed that `id` builds on, directly or through others,
// in a sensible study order (foundations first).
export function foundationsFor(id, passed) {
  const seen = new Set();
  const out = [];
  const visit = (x) => {
    for (const n of needsOf(x)) {
      if (seen.has(n) || passed[n]) continue;
      seen.add(n);
      visit(n);
      out.push(n);
    }
  };
  visit(id);
  return out.map((x) => LESSON_BY_ID[x]);
}

// ---- borrowed classes ----------------------------------------------------------
// A class borrowed from another program is saved as "borrow:<id>@<week>" and
// sits in that week of your timetable, like a GE class.
export function borrowed(readings) {
  return Object.keys(readings || {})
    .map((k) => /^borrow:([a-z0-9-]+)@(\d+)$/.exec(k))
    .filter((m) => m && readings[m[0]] && LESSON_BY_ID[m[1]] && !IN_CORE.has(m[1]))
    .map((m) => ({ id: m[1], week: Math.min(Math.max(1, Number(m[2])), LAST_WEEK), key: m[0], lesson: LESSON_BY_ID[m[1]] }));
}
// Keys for borrowing a list of classes: one a week from `start`, or two a week
// when the list is long, so they fit before the end of the timetable.
export function borrowKeys(ids, start) {
  const s = Math.min(Math.max(1, start), LAST_WEEK);
  const per = Math.max(1, Math.ceil(ids.length / Math.max(1, LAST_WEEK - s + 1)));
  return ids.map((id, i) => `borrow:${id}@${Math.min(LAST_WEEK, s + Math.floor(i / per))}`);
}
// The sequence a lesson belongs to, for Previous / Next buttons.
export function seqOf(l) {
  if (l.spec) return trackLessons(l.spec);
  if (l.from) return PROGRAM_LESSONS[l.from].map((x) => LESSON_BY_ID[x.id] || x);
  return LESSONS;
}
