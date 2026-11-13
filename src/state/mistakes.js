import { lessonById } from '../data/path';
import { DEEP } from '../data/deep';
import { lessonQuestions, shuffled } from './quiz';
import { todayStr } from './review';

// The mistakes notebook. Every question you get wrong is kept as the learner
// item miss/<key>, where the key names the question:
//   "p:<class>:<part>:<n>"  a "Learn it" practice problem
//   "q:<question id>"        a class quiz, review or exam question
// { lessonId, from: 'learn' | 'quiz' | 'review' | 'exam', times, first, last, fixed }
// Getting it right later (in a redo, a review or the quiz) marks it fixed;
// it stays in the notebook under "Fixed" so you can see how far you came.

export const partKey = (lessonId, part, n) => `p:${lessonId}:${part}:${n}`;
export const questionKey = (id) => `q:${id}`;

export function noteAnswer(items, setItem, { key, lessonId, from, right }) {
  const cur = items.miss?.[key];
  const day = todayStr();
  if (!right) {
    setItem('miss', key, { lessonId, from: cur?.from || from, times: (cur?.times || 0) + 1, first: cur?.first || day, last: day, fixed: null });
  } else if (cur && !cur.fixed) {
    setItem('miss', key, { ...cur, fixed: day });
  }
}

// What the key points at: a practice problem or a multiple-choice question.
export function resolveMiss(key, lessonId) {
  const p = /^p:(.+):(\d+):(\d+)$/.exec(key);
  if (p) {
    const part = DEEP[p[1]]?.parts?.[Number(p[2])];
    const item = part?.practice?.[Number(p[3])];
    return item ? { kind: 'problem', lessonId: p[1], item, partTitle: part.title, part: Number(p[2]) } : null;
  }
  const q = /^q:(.+)$/.exec(key);
  if (q) {
    // The saved class first; history and boss ids also start with their class id.
    for (const l of [lessonById(lessonId), ...candidates(q[1])].filter(Boolean)) {
      const found = lessonQuestions(l).find((x) => x.id === q[1]);
      if (found) return { kind: 'choice', lessonId: l.id, item: shuffled(found) };
    }
  }
  return null;
}
function candidates(qid) {
  const out = [];
  const bits = qid.split('-');
  for (let n = bits.length - 1; n > 0; n--) {
    const l = lessonById(bits.slice(0, n).join('-'));
    if (l) out.push(l);
  }
  return out;
}

export function missList(items) {
  return Object.entries(items.miss || {})
    .map(([key, m]) => ({ key, ...m, q: resolveMiss(key, m.lessonId), lesson: lessonById(m.lessonId) }))
    .filter((m) => m.q && m.lesson);
}
export const openMisses = (items) => missList(items).filter((m) => !m.fixed);
