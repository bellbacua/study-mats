import { HISTORY_QUIZ } from '../data/historyQuiz';

const hash = (str) => {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h;
};
const nextRand = (h) => Math.imul(h ^ (h >>> 13), 1103515245) >>> 0;

// Stable shuffle of a question's options so the right answer isn't always first.
export function shuffled(item) {
  let h = hash(item.id);
  const order = item.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    h = nextRand(h);
    const j = h % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { ...item, options: order.map((i) => item.options[i]), correctIndex: order.indexOf(item.correctIndex) };
}

// Every question a class owns: its drills, its history questions and its boss problem.
export function lessonQuestions(lesson) {
  const { drills, bossProblem: b } = lesson.gate;
  const base = { lessonId: lesson.id, subject: lesson.track };
  return [
    ...drills.map((d) => ({ ...d, ...base, kind: 'skill' })),
    ...(HISTORY_QUIZ[lesson.id] || []).map((h, i) => ({ ...h, ...base, id: `${lesson.id}-history-${i}`, kind: 'history' })),
    { ...b, ...base, id: `${lesson.id}-boss`, question: b.scenario, heading: b.title, kind: 'problem' },
  ];
}

// Pick n questions with a fixed seed, spread across the given classes.
export function pickQuestions(lessons, n, seed) {
  const pools = lessons.map((l) => {
    let h = hash(`${seed}-${l.id}`);
    const qs = lessonQuestions(l);
    for (let i = qs.length - 1; i > 0; i--) {
      h = nextRand(h);
      const j = h % (i + 1);
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    return qs;
  });
  const out = [];
  for (let round = 0; out.length < n && pools.some((p) => p.length > round); round++) {
    for (const p of pools) if (p[round] && out.length < n) out.push(p[round]);
  }
  return out.map(shuffled);
}
