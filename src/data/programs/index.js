// Main programs. Each one has its own timetable (WEEKS), stage headings,
// course tags, year ends and specialization tracks. Classes are shared by id,
// so a class that sits in two programs counts once, in both.
import * as mate from './mate';
import * as cs from './cs';
import { TRACKS as MATE_TRACKS, YEAR_ENDS as MATE_YEARS } from '../tracks/meta';
import { UM_COURSES } from '../um/make';

export const PROGRAM_DATA = {
  mate: {
    id: 'mate',
    title: 'BS Materials Engineering',
    short: 'Materials Engineering',
    school: 'University of Mindanao',
    blurb: '48 weeks from counting to materials engineering, lined up with the UM program, with three specialization tracks.',
    ready: true,
    heading: 'From counting to materials engineering',
    intro: (weeks) =>
      `${weeks} weeks, three or four classes a week, covering what you need for UM’s BS Materials Engineering. Math, Chemistry, Physics, Materials and Engineering take turns, and each follows its own history from the very beginning.`,
    tagLabel: 'Prepares you for',
    weeks: mate.WEEKS,
    stages: mate.STAGES,
    tags: mate.UM_TAGS,
    courses: UM_COURSES,
    tracks: MATE_TRACKS,
    years: MATE_YEARS,
    soon: {},
  },
  cs: {
    id: 'cs',
    title: 'BS Computer Science',
    short: 'Computer Science',
    school: 'Following the Philippine BSCS course list',
    blurb: 'From counting and Babbage’s engines to programming, algorithms, systems and today’s AI, with an AI track that reaches current research papers.',
    ready: true,
    heading: 'From counting to computer science',
    intro: (weeks) =>
      `${weeks} weeks, about three classes a week, covering the core of a BS Computer Science degree. Math, Computing and Programming take turns, each in its own historical order, starting from nothing.`,
    tagLabel: 'Part of',
    weeks: cs.WEEKS,
    stages: cs.STAGES,
    tags: cs.TAGS,
    courses: cs.COURSES,
    tracks: cs.TRACKS,
    years: cs.YEAR_ENDS,
    soon: cs.SOON,
  },
};

// Shown on the Welcome and Program pages, written ones first.
export const PROGRAMS = [
  PROGRAM_DATA.mate,
  PROGRAM_DATA.cs,
  { id: 'phys', title: 'BS Physics', blurb: 'Mechanics to quantum physics, built the same way.', ready: false },
  { id: 'cheme', title: 'BS Chemical Engineering', blurb: 'Reactions, processes and plants.', ready: false },
];

// The program this copy of the app is showing. It is saved with your progress
// (as the reading "program:<id>") and mirrored here so the timetable can be
// built before the database has loaded. Switching programs reloads the page.
const KEY = 'study-program';
export function storedProgram() {
  try {
    const id = globalThis.localStorage?.getItem(KEY);
    return PROGRAM_DATA[id] ? id : 'mate';
  } catch {
    return 'mate';
  }
}
export function rememberProgram(id) {
  try {
    globalThis.localStorage?.setItem(KEY, id);
  } catch {
    /* private window: the program falls back to MatE until the next load */
  }
}
