import { LESSONS, CURRICULUM_TERMS, sideByWeek } from '../data/path';
import { DEEP } from '../data/deep';
import { addDays, todayStr } from './review';

// A study plan: a goal date, hours a week and the weekdays you study. The
// rest is worked out fresh each day from what is left, so falling behind or
// racing ahead simply moves the dates. Saved as the learner item plan/main:
// { goal: 'YYYY-MM-DD', hours: 6, days: [1, 3, 5], start: 'YYYY-MM-DD' }.

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const STORY_MIN = 20; // reading the story and playing the animation
export const QUIZ_MIN = 10;
export const REVIEW_SHARE = 0.1; // kept free each day for spaced review

const dateOf = (day) => {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const weekdayOf = (day) => dateOf(day).getDay();
export const daysBetween = (a, b) => Math.round((dateOf(b) - dateOf(a)) / 86_400_000);
export const niceDate = (day, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => dateOf(day).toLocaleDateString(undefined, opts);

// The classes the plan covers, in timetable order: your core weeks plus the
// side topics and borrowed classes you have put into those weeks.
export function planClasses(readings) {
  const extra = sideByWeek(readings);
  return CURRICULUM_TERMS.flatMap((t) => [...LESSONS.filter((l) => l.termId === t.id), ...(extra[t.id] || [])]);
}

// A class in the pieces the app can tick off, each with its minutes.
export function unitsOf(l, progress) {
  const passed = !!progress.passed[l.id];
  const deep = DEEP[l.id];
  const out = [{ id: `${l.id}:story`, lesson: l, kind: 'story', label: 'Story and animation', minutes: STORY_MIN, done: passed || !!progress.labs[l.id] }];
  (deep?.parts || []).forEach((p, k) =>
    out.push({ id: `${l.id}:part:${k}`, lesson: l, kind: 'part', part: k, label: `Learn it ${k + 1}: ${p.title}`, minutes: p.minutes || 20, done: passed || !!progress.readings[`part:${l.id}:${k}`] }),
  );
  out.push({ id: `${l.id}:quiz`, lesson: l, kind: 'quiz', label: 'Class quiz', minutes: deep ? QUIZ_MIN : QUIZ_MIN + 5, done: passed });
  return out;
}

export const allUnits = (progress) => planClasses(progress.readings).flatMap((l) => unitsOf(l, progress));

// Minutes you can give to new material on a study day.
export const dayBudget = (plan) => Math.max(10, Math.round(((plan.hours * 60) / Math.max(1, plan.days.length)) * (1 - REVIEW_SHARE)));

// Lay the units that are left over the study days from `from`, filling each
// day up to its budget (a day always gets at least one unit). Returns
// [{ day, units }] up to `limitDays` study days, or until everything fits.
export function schedule(plan, units, from = todayStr(), limitDays = 2000) {
  const budget = dayBudget(plan);
  const left = units.filter((u) => !u.done);
  const out = [];
  let i = 0;
  for (let d = from, n = 0; i < left.length && n < limitDays * 7; d = addDays(d, 1), n++) {
    if (!plan.days.includes(weekdayOf(d))) continue;
    const day = { day: d, units: [] };
    let used = 0;
    while (i < left.length && (day.units.length === 0 || used + left[i].minutes <= budget * 1.15)) {
      used += left[i].minutes;
      day.units.push(left[i++]);
    }
    day.minutes = used;
    out.push(day);
    if (out.length >= limitDays) break;
  }
  return out;
}

// Study days between two dates (inclusive of `from`, not of `to`).
export function studyDaysUntil(plan, from, to) {
  let n = 0;
  for (let d = from; d < to; d = addDays(d, 1)) if (plan.days.includes(weekdayOf(d))) n++;
  return n;
}

// The big picture: minutes left, when you would finish, and the hours a week
// you would need to finish by the goal.
export function planSummary(plan, progress, from = todayStr()) {
  const units = allUnits(progress);
  const left = units.filter((u) => !u.done);
  const minutesLeft = left.reduce((s, u) => s + u.minutes, 0);
  const classesLeft = new Set(left.map((u) => u.lesson.id)).size;
  const days = schedule(plan, units, from);
  const finish = days.length ? days[days.length - 1].day : from;
  const weeksToGoal = Math.max(1 / 7, daysBetween(from, plan.goal) / 7);
  const needHours = minutesLeft / (1 - REVIEW_SHARE) / 60 / weeksToGoal;
  const onTrack = !left.length || finish < plan.goal;
  return { units, left, minutesLeft, classesLeft, days, finish, needHours, onTrack, total: units.length, doneUnits: units.length - left.length };
}

// ---- today's list ------------------------------------------------------------
// Today's units are fixed the first time you look on a day (kept in this
// browser), so they stay ticked off as you finish them instead of being
// replaced by the next ones.
const TODAY_KEY = 'study_mats_plan_today';
export function todaysUnits(plan, progress, day = todayStr()) {
  const units = allUnits(progress);
  const byId = Object.fromEntries(units.map((u) => [u.id, u]));
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(TODAY_KEY) || 'null');
  } catch {
    saved = null;
  }
  if (saved && saved.day === day && saved.planAt === plan.at && saved.ids.every((id) => byId[id])) return saved.ids.map((id) => byId[id]);
  if (!plan.days.includes(weekdayOf(day))) return [];
  const first = schedule(plan, units, day, 1)[0];
  const ids = first ? first.units.map((u) => u.id) : [];
  try {
    localStorage.setItem(TODAY_KEY, JSON.stringify({ day, planAt: plan.at, ids }));
  } catch {
    // fine: today's list is simply worked out again
  }
  return ids.map((id) => byId[id]);
}

// The next study day after today, and what it holds.
export function nextStudyDay(plan, progress, from = todayStr()) {
  const units = allUnits(progress);
  const sched = schedule(plan, units, addDays(from, 1), 1);
  return sched[0] || null;
}

export const fmtMinutes = (m) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ''}`);
export const fmtHours = (h) => (h < 1 ? `${Math.max(1, Math.round(h * 60))} min` : `${Math.round(h * 10) / 10} h`);
