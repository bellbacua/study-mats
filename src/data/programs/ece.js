// BS Electronics Engineering (University of Mindanao), years 1-2 plus a head
// start on year 3. It is the Materials + Electronics timetable with the
// Materials-only classes taken out (UM ECE still has Chemistry for Engineers
// and CEE 111 Materials Science, so the basics of both stay), packed three to
// a week in the same order, so every class still comes after what it needs.
import { WEEKS as MECE_WEEKS, STAGE_MARKS, stagesFor, ECE_TAGS } from './mece';

// Classes only the Materials program needs.
const MATE_ONLY = new Set([
  'mate-001', 'mate-111', 'mate-114', 'mate-115', 'mate-112', 'mate-116', 'mate-201', 'mate-301', 'mate-117',
  'mate-202', 'mate-119', 'mate-203', 'mate-302', 'chem-013', 'chem-012', 'chem-014', 'chem-015', 'chem-016',
  'chem-101', 'phys-101', 'phys-201', 'phys-205', 'eng-003',
]);

const order = MECE_WEEKS.flat().filter((id) => !MATE_ONLY.has(id));
export const WEEKS = Array.from({ length: Math.ceil(order.length / 3) }, (_, i) => order.slice(i * 3, i * 3 + 3));

export const STAGES = stagesFor(
  WEEKS,
  STAGE_MARKS.map((s) => ({ ...s, note: s.note.replace(/ · MATE[^·]*/g, '').replace(/ · MatE Year 2/, '') }))
);

const T = (codes, ids) => Object.fromEntries(ids.map((id) => [id, codes]));
export const TAGS = {
  ...T(['CEE 200'], order.filter((id) => /^(num|math|geo)-/.test(id) && !/^math-(1|01[2-9]|02)/.test(id))),
  ...T(['CEE 200'], ['math-016']),
  ...T(['CEE 101'], ['math-012', 'math-101', 'math-014', 'math-015']),
  ...T(['CEE 103'], ['math-102', 'math-017', 'math-018', 'math-019', 'math-020']),
  ...T(['CEE 105'], ['math-021', 'math-022', 'math-023', 'math-024']),
  ...T(['CEE 104'], ['math-025', 'math-026']),
  ...T(['BECE 221'], ['math-027']),
  ...T(['BCHE 111'], order.filter((id) => id.startsWith('chem-'))),
  ...T(['CEE 102'], order.filter((id) => /^phys-0(0[1-5]|0[7-9]|10|12)$/.test(id))),
  ...T(['DRAW 102'], ['eng-001', 'eng-002']),
  ...ECE_TAGS,
};

export const YEAR_ENDS = [
  { year: 1, lastWeek: WEEKS.findIndex((w) => w.includes('ee-105')) + 1, slots: 1 },
  { year: 2, lastWeek: WEEKS.findIndex((w) => w.includes('ee-111')) + 1, slots: 2 },
];
