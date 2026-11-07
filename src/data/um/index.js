// All UM-aligned classes (Year 1 and Year 2 prep), split into the shapes the
// rest of the app expects.
import math1 from './math1';

const ALL = [...math1];

export const UM_LESSONS = ALL.map((c) => c.lesson);
export const UM_READINGS = Object.fromEntries(ALL.map((c) => [c.lesson.id, c.readings]));
export const UM_LABS = Object.fromEntries(ALL.map((c) => [c.lesson.id, c.labs]));
export const UM_QUIZ = Object.fromEntries(ALL.map((c) => [c.lesson.id, c.quiz]));
export const UM_GLOSS = ALL.flatMap((c) => c.gloss);
export const UM_EVENTS = ALL.flatMap((c) => c.events);
export { UM_COURSES } from './make';
