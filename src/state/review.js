import { ALL_LESSONS as LESSONS } from '../data/path';
import { lessonQuestions, shuffled } from './quiz';

// Spaced review. Every question of a class you have passed comes back after
// 1 day, then 3, 10, 30 and 90 days each time you get it right. A miss sends
// it back to tomorrow. Questions from different subjects are mixed together.
export const LADDER = [1, 3, 10, 30, 90];
export const SESSION_MAX = 20;

const DAY = 86400000;
const toDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const addDays = (day, n) => {
  const [y, m, d] = day.split('-').map(Number);
  return toDay(new Date(new Date(y, m - 1, d).getTime() + n * DAY + DAY / 2));
};
export const todayStr = () => toDay(new Date());

// A question's first review is the day after its class was passed.
function firstDue(passedAt) {
  const d = passedAt ? new Date(passedAt) : new Date();
  return addDays(toDay(Number.isNaN(d.getTime()) ? new Date() : d), 1);
}

// All review cards for passed classes, with their current box and due day.
export function allCards(passed, cards) {
  const out = [];
  for (const l of LESSONS) {
    const p = passed[l.id];
    if (!p) continue;
    for (const q of lessonQuestions(l)) {
      const c = cards[q.id];
      out.push({ q, box: c ? c.box : 0, due: c ? c.due : firstDue(p.passedAt), lapses: c ? c.lapses : 0, seen: c ? c.seen : 0 });
    }
  }
  return out;
}

export function dueCards(passed, cards, day = todayStr()) {
  return allCards(passed, cards).filter((c) => c.due <= day);
}

// Today's session: most overdue first, then mixed by subject so that two
// questions from the same subject rarely sit side by side.
export function buildSession(passed, cards, day = todayStr(), max = SESSION_MAX) {
  const due = dueCards(passed, cards, day).sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.box - b.box));
  const picked = due.slice(0, max);
  const bySubject = {};
  for (const c of picked) (bySubject[c.q.subject] ||= []).push(c);
  const lanes = Object.values(bySubject).sort((a, b) => b.length - a.length);
  const out = [];
  for (let r = 0; out.length < picked.length; r++) for (const lane of lanes) if (lane[r]) out.push(lane[r]);
  return out.map((c) => ({ ...c, q: shuffled(c.q) }));
}

// The new place of a card after an answer.
export function grade(card, right, day = todayStr()) {
  const box = right ? Math.min(LADDER.length - 1, card.box + 1) : 0;
  return { box, due: addDays(day, LADDER[box]), lapses: card.lapses + (right ? 0 : 1) };
}

// Counts for the next 7 days, for the forecast strip.
export function forecast(passed, cards, days = 7) {
  const all = allCards(passed, cards);
  const day0 = todayStr();
  return Array.from({ length: days }, (_, i) => {
    const d = addDays(day0, i);
    return { day: d, n: all.filter((c) => (i === 0 ? c.due <= d : c.due === d)).length };
  });
}

// How firmly each question is held: new, learning (1-3 days), known (10-30), long-term (90).
export function strength(passed, cards) {
  const s = { new: 0, learning: 0, known: 0, longterm: 0 };
  for (const c of allCards(passed, cards)) {
    if (!c.seen) s.new += 1;
    else if (c.box <= 1) s.learning += 1;
    else if (c.box <= 3) s.known += 1;
    else s.longterm += 1;
  }
  return s;
}
