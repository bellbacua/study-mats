// All UM-aligned classes (Year 1 and Year 2 prep), split into the shapes the
// rest of the app expects.
import math1 from './math1';
import physics from './physics';
import chem1 from './chem1';
import chem2 from './chem2';
import mate1 from './mate1';
import mate2 from './mate2';
import math2 from './math2';
import year3a from './year3a';
import year3b from './year3b';
import year4a from './year4a';

const ALL = [...math1, ...physics, ...chem1, ...chem2, ...mate1, ...mate2, ...math2, ...year3a, ...year3b, ...year4a];

export const UM_LESSONS = ALL.map((c) => c.lesson);
export const UM_READINGS = Object.fromEntries(ALL.map((c) => [c.lesson.id, c.readings]));
export const UM_LABS = Object.fromEntries(ALL.map((c) => [c.lesson.id, c.labs]));
export const UM_QUIZ = Object.fromEntries(ALL.map((c) => [c.lesson.id, c.quiz]));
export const UM_GLOSS = ALL.flatMap((c) => c.gloss);
export const UM_EVENTS = ALL.flatMap((c) => c.events);
export { UM_COURSES } from './make';
