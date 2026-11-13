import { ALL_LESSONS as LESSONS } from '../data/path';
import { DEEP } from '../data/deep';
import { levelsFor } from './practiceHelp';
export { LEVEL_NAME } from './practiceHelp';
import { partKey } from './mistakes';

// How the learner is doing lately, from their first try on practice problems.
// Saved as the learner item form/learn: { recent: [{ ok, help, lv, d }] }, the
// newest last, at most 30. "help" is the highest hint rung opened before
// answering (0 none, 1 nudge, 2 solved example, 3 first steps, 4 full answer).
export const FORM_KEEP = 30;

export function recentOf(items) {
  return items?.form?.learn?.recent || [];
}

export function noteForm(items, setItem, entry) {
  const recent = [...recentOf(items), { ok: !!entry.ok, help: entry.help || 0, lv: entry.lv || 2, d: Date.now() }].slice(-FORM_KEEP);
  setItem('form', 'learn', { recent });
}

// A first try counts as clean when it was right with no more than a nudge.
const clean = (r) => r.ok && r.help <= 1;

// 'struggling' | 'steady' | 'cruising', with a short reason to show.
export function formOf(items) {
  const r = recentOf(items);
  const last = (n) => r.slice(-n);
  if (r.length >= 3) {
    const l4 = last(4);
    const misses = l4.filter((x) => !clean(x)).length;
    if (misses >= 2 && !clean(r[r.length - 1])) return { mode: 'struggling', why: `${misses} of your last ${l4.length} problems needed more help` };
  }
  if (r.length >= 5 && last(5).every((x) => x.ok && x.help === 0)) return { mode: 'cruising', why: 'your last 5 problems were right first time with no hints' };
  return { mode: 'steady', why: r.length ? 'mixed results lately' : 'no answers yet' };
}

// ---- the adaptive practice set ----------------------------------------------
// A short set built from the "Learn it" problems of parts you have finished.
// It starts at a level that fits how you have been doing and moves up one level
// after a clean answer and down one after a miss or heavy help.
export const SET_SIZE = 10;

export function practicePool(progress) {
  const pool = [];
  for (const l of LESSONS) {
    const deep = DEEP[l.id];
    if (!deep) continue;
    const passed = !!progress.passed?.[l.id];
    const lv = levelsFor(l.id, deep);
    deep.parts.forEach((p, pi) => {
      if (!passed && !progress.readings?.[`part:${l.id}:${pi}`]) return;
      p.practice.forEach((item, k) => pool.push({ lessonId: l.id, subject: l.subject, title: l.title, pi, k, item, part: p, level: lv[`${pi}:${k}`] || 2, key: partKey(l.id, pi, k) }));
    });
  }
  return pool;
}

export function startLevel(items) {
  const f = formOf(items).mode;
  return f === 'struggling' ? 1 : f === 'cruising' ? 3 : 2;
}

export const nextLevel = (lv, ok, help) => (ok && help <= 1 ? Math.min(3, lv + 1) : !ok || help >= 3 ? Math.max(1, lv - 1) : lv);

// The next problem at this level: not used yet in this set, open misses first,
// then problems not answered lately, and a different class from the last one
// when there is a choice. Falls back to the nearest level.
export function pickNext(pool, level, used, lastLesson, items) {
  const miss = items?.miss || {};
  const fresh = pool.filter((p) => !used.has(p.key));
  if (!fresh.length) return null;
  for (const lv of [level, level - 1, level + 1, level - 2, level + 2]) {
    let c = fresh.filter((p) => p.level === lv);
    if (!c.length) continue;
    const other = c.filter((p) => p.lessonId !== lastLesson);
    if (other.length) c = other;
    const score = (p) => (miss[p.key] && !miss[p.key].fixed ? 0 : 1) + hash(p.key + used.size) / 4294967296;
    return c.sort((a, b) => score(a) - score(b))[0];
  }
  return null;
}

function hash(s) {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h;
}
