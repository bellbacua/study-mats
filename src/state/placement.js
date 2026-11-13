import { LESSONS, PROGRAM_ID, SUBJECTS } from '../data/path';
import { shuffled } from './quiz';

// The placement check: a short walk through each subject of your program that
// finds where it starts to be new to you. Classes you show you already know
// are marked "known": they are not passed (no score, no review cards), they
// simply stop being "next" on Today, the Roadmap and the study plan. They stay
// on the roadmap and open like any other class.
//
// Saved as the learner item place/<program id>:
// { known: [class ids], subjects: { math: { known: n, asked: n } }, at }.
// Clearing it (null) puts everything back.

// What each subject covers, in plain words, for "have you studied any … before?"
const ABOUT = {
  math: 'numbers, fractions, algebra, graphs and later calculus',
  chem: 'atoms, elements and reactions',
  phys: 'forces, motion, energy and waves',
  mate: 'metals, ceramics, plastics and why they behave as they do',
  eng: 'technical drawing, spreadsheets and the money side of projects',
  comp: 'how calculating machines and computers came to be',
  prog: 'writing short programs: instructions, decisions and loops',
  disc: 'logic, sets and counting arrangements',
  sys: 'what happens inside a computer and between computers',
  algo: 'step-by-step methods for sorting, searching and planning',
  ai: 'machines that learn from examples',
};

// The subjects of this program, in the order they first appear on the timetable.
export const PLACE_SUBJECTS = [...new Set(LESSONS.map((l) => l.track))].map((id) => ({
  id,
  title: SUBJECTS[id] || id,
  about: ABOUT[id] || '',
  classes: LESSONS.filter((l) => l.track === id),
}));

// Which classes of a subject get a question: the 1st, 2nd, 4th, 7th, 11th, …
// The gaps grow, so someone who knows a lot gets there in a few questions,
// and someone new stops after the first.
export function checkpoints(n) {
  const out = [];
  for (let i = 0, step = 1; i < n; i += step, step++) out.push(i);
  return out;
}

// A skill question from a class's mastery drills (the checked problem bank),
// with its options in a fixed shuffled order. `k` picks a different drill.
export function questionFor(lesson, k = 0) {
  const drills = lesson.gate?.drills || [];
  if (!drills.length) return null;
  const d = drills[(hashStr(lesson.id) + k) % drills.length];
  return shuffled({ ...d, id: `place:${d.id}` });
}
const hashStr = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
export const drillCount = (lesson) => lesson.gate?.drills?.length || 0;

// Every class marked known, from any program's placement (shared classes such
// as the early math count in both programs).
export function knownSet(items) {
  const out = new Set();
  for (const p of Object.values(items?.place || {})) for (const id of p?.known || []) out.add(id);
  return out;
}
export const placementOf = (items) => items?.place?.[PROGRAM_ID] || null;

// A class is "placed out" when you showed you know it and have not passed it.
export const placedOut = (known, passed) => (l) => known.has(l.id) && !passed[l.id];

// The next class to study: the first one neither passed nor already known.
export const nextClass = (passed, known) => LESSONS.find((l) => !passed[l.id] && !known.has(l.id)) || null;
