// Finding the earlier class that explains a missing piece.
import { GLOSS_LOOKUP, GLOSS_RE } from '../glossary';
import { IDEA_LINKS } from '../ideaLinks';
import { LESSONS, PROGRAM_LESSONS, lessonById, needsOf } from '../path';

const CORE_POS = new Map(LESSONS.map((l, i) => [l.id, i]));

// Does class `a` come before class `b` for this learner? Start here comes
// before everything; on the timetable it is week order; inside a track or a
// side topic it is track order (and the whole core counts as before it).
export function isEarlier(a, b) {
  if (a === b) return false;
  const A = lessonById(a);
  const B = lessonById(b);
  if (!A || !B) return false;
  if (B.start) return Boolean(A.start) && A.specIndex < B.specIndex;
  if (A.start) return true;
  if (CORE_POS.has(a) && CORE_POS.has(b)) return CORE_POS.get(a) < CORE_POS.get(b);
  if (B.spec) return A.spec === B.spec ? A.specIndex < B.specIndex : CORE_POS.has(a);
  if (B.from) {
    const list = PROGRAM_LESSONS[B.from] || [];
    const i = list.findIndex((l) => l.id === a);
    return i >= 0 && i < list.findIndex((l) => l.id === b);
  }
  return false;
}

// Glossary words in a piece of text that were taught in an earlier class.
export function gapsIn(lesson, text) {
  const out = [];
  const seen = new Set();
  for (const m of String(text).matchAll(GLOSS_RE)) {
    const g = GLOSS_LOOKUP.get(m[0].toLowerCase());
    if (!g || seen.has(g.term)) continue;
    seen.add(g.term);
    if (g.lesson && isEarlier(g.lesson, lesson.id)) out.push({ ...g, from: lessonById(g.lesson) });
  }
  return out;
}

// Glossary words in a piece of text that this class itself introduces.
export function newWordsIn(lesson, text) {
  const out = [];
  const seen = new Set();
  for (const m of String(text).matchAll(GLOSS_RE)) {
    const g = GLOSS_LOOKUP.get(m[0].toLowerCase());
    if (!g || seen.has(g.term)) continue;
    seen.add(g.term);
    if (g.lesson === lesson.id) out.push(g);
  }
  return out;
}

// The earlier classes this one builds on (same subject and across subjects).
export function buildsOn(lesson) {
  const ids = [...new Set([...needsOf(lesson.id), ...(IDEA_LINKS[lesson.id] || [])])];
  return ids.map(lessonById).filter((l) => l && isEarlier(l.id, lesson.id));
}
