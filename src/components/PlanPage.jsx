import { useMemo, useState } from 'react';
import { SUBJECTS } from '../data/path';
import { addDays, todayStr } from '../state/review';
import { WEEKDAYS, dayBudget, daysBetween, fmtHours, fmtMinutes, niceDate, planSummary, weekdayOf } from '../state/plan';
import { useReveal } from '../state/useReveal';

const PRESETS = [
  ['3 months', 91],
  ['6 months', 182],
  ['1 year', 365],
  ['2 years', 730],
];
const DEFAULT = { hours: 6, days: [1, 2, 3, 4, 5] };

// The study plan page: set a goal date and your weekly hours, then see what
// each day and month holds. Today shows the current day's part.
export default function PlanPage({ progress, plan, onSave, onOpenUnit }) {
  const [editing, setEditing] = useState(!plan);
  useReveal([editing, !!plan]);
  if (!plan || editing)
    return (
      <div className="plan-page">
        <header className="timeline-head" data-reveal>
          <span className="eyebrow">Study plan</span>
          <h1>{plan ? 'Change your plan' : 'Plan your way to a goal date'}</h1>
          <p>
            Pick the day you want to be done with your timetable and how much time you can give it. The app spreads every class that is left
            over your study days, and Today shows exactly what to do. If you fall behind or race ahead, the days ahead simply move.
          </p>
        </header>
        <PlanForm progress={progress} plan={plan} onCancel={plan ? () => setEditing(false) : null} onSave={(p) => (onSave(p), setEditing(false))} />
      </div>
    );
  return <PlanView progress={progress} plan={plan} onEdit={() => setEditing(true)} onSave={onSave} onOpenUnit={onOpenUnit} />;
}

function PlanForm({ progress, plan, onSave, onCancel }) {
  const today = todayStr();
  const [goal, setGoal] = useState(plan?.goal || addDays(today, 365));
  const [hours, setHours] = useState(plan?.hours || DEFAULT.hours);
  const [days, setDays] = useState(plan?.days || DEFAULT.days);
  const draft = { goal, hours, days, at: 0 };
  const valid = goal > today && days.length > 0;
  const sum = useMemo(() => (valid ? planSummary(draft, progress) : null), [goal, hours, days.join(','), progress]); // eslint-disable-line react-hooks/exhaustive-deps
  const toggleDay = (d) => setDays((list) => (list.includes(d) ? list.filter((x) => x !== d) : [...list, d].sort()));

  return (
    <section className="plan-form" data-reveal>
      <div className="plan-field">
        <span className="eyebrow">1 · Finish by</span>
        <div className="plan-chips">
          {PRESETS.map(([label, n]) => (
            <button key={label} type="button" className={`chip ${goal === addDays(today, n) ? 'on' : ''}`} onClick={() => setGoal(addDays(today, n))}>
              {label}
            </button>
          ))}
          <label className="plan-date">
            <span>or a date</span>
            <input type="date" value={goal} min={addDays(today, 7)} onChange={(e) => e.target.value && setGoal(e.target.value)} />
          </label>
        </div>
        <p className="notes-hint">
          {goal > today ? `${niceDate(goal, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${Math.round(daysBetween(today, goal) / 7)} weeks from today.` : 'Pick a day in the future.'}{' '}
          A school start date or an exam is a good goal.
        </p>
      </div>

      <div className="plan-field">
        <span className="eyebrow">2 · Hours a week</span>
        <div className="plan-hours">
          <input type="range" min="1" max="30" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} aria-label="Hours a week" />
          <strong>{hours} h</strong>
        </div>
        <p className="notes-hint">
          {hours <= 3 ? 'A gentle pace. Good when life is busy.' : hours <= 8 ? 'A steady pace, about one evening class a day.' : hours <= 15 ? 'A strong pace, like a part-time course.' : 'Close to a full-time course load.'}
        </p>
      </div>

      <div className="plan-field">
        <span className="eyebrow">3 · Study days</span>
        <div className="plan-chips">
          {[1, 2, 3, 4, 5, 6, 0].map((d) => (
            <button key={d} type="button" className={`chip ${days.includes(d) ? 'on' : ''}`} onClick={() => toggleDay(d)} aria-pressed={days.includes(d)}>
              {WEEKDAYS[d]}
            </button>
          ))}
        </div>
        <p className="notes-hint">{days.length ? `About ${fmtMinutes(Math.round((hours * 60) / days.length))} on each study day.` : 'Pick at least one day.'}</p>
      </div>

      {sum && (
        <div className={`plan-verdict ${sum.onTrack ? 'ok' : 'no'}`}>
          {sum.left.length === 0 ? (
            <strong>Every class on your timetable is already done.</strong>
          ) : sum.onTrack ? (
            <>
              <strong>You would finish on {niceDate(sum.finish)}</strong>
              <span>
                That is {Math.max(0, daysBetween(sum.finish, goal))} days before your goal, with {sum.classesLeft} classes ({fmtMinutes(sum.minutesLeft)}) to go.
              </span>
            </>
          ) : (
            <>
              <strong>At {hours} h a week you would finish on {niceDate(sum.finish)}, after your goal.</strong>
              <span>
                To finish by {niceDate(goal)} you need about {fmtHours(sum.needHours)} a week.{' '}
                {sum.needHours <= 30 && (
                  <button type="button" className="tl-link-btn" onClick={() => setHours(Math.min(30, Math.ceil(sum.needHours)))}>
                    Use {Math.min(30, Math.ceil(sum.needHours))} h
                  </button>
                )}
              </span>
            </>
          )}
        </div>
      )}

      <div className="plan-actions">
        {onCancel && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="button" className="btn primary" disabled={!valid} onClick={() => onSave({ goal, hours, days, start: plan?.start || today })}>
          {plan ? 'Save changes' : 'Make my plan'}
        </button>
      </div>
    </section>
  );
}

function UnitRow({ u, onOpenUnit }) {
  return (
    <li className={`plan-unit ${u.done ? 'done' : ''}`}>
      <button type="button" onClick={() => onOpenUnit(u)}>
        <span className="plan-tick" aria-hidden="true">
          {u.done ? '✓' : ''}
        </span>
        <span className="plan-unit-text">
          <span className={`plan-unit-class track-${u.lesson.track}`}>{u.lesson.code}</span> {u.lesson.title.split(':')[0]}
          <em>{u.label}</em>
        </span>
        <span className="plan-unit-min">{fmtMinutes(u.minutes)}</span>
      </button>
    </li>
  );
}

function PlanView({ progress, plan, onEdit, onSave, onOpenUnit }) {
  const today = todayStr();
  const sum = useMemo(() => planSummary(plan, progress), [plan, progress]);
  const daysLeft = daysBetween(today, plan.goal);
  const pct = sum.total ? Math.round((sum.doneUnits / sum.total) * 100) : 100;

  // The next seven calendar days, study days with their work.
  const week = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(today, i);
    return { day, study: plan.days.includes(weekdayOf(day)), sched: sum.days.find((d) => d.day === day) };
  });

  // Month by month: the classes whose quiz falls in each month.
  const months = [];
  for (const d of sum.days)
    for (const u of d.units) {
      if (u.kind !== 'quiz') continue;
      const key = d.day.slice(0, 7);
      let m = months[months.length - 1];
      if (!m || m.key !== key) months.push((m = { key, classes: [] }));
      m.classes.push(u.lesson);
    }
  const goalMonth = plan.goal.slice(0, 7);

  return (
    <div className="plan-page">
      <header className="timeline-head" data-reveal>
        <span className="eyebrow">Study plan</span>
        <h1>
          {daysLeft > 0 ? `${daysLeft} days to ${niceDate(plan.goal, { day: 'numeric', month: 'long', year: 'numeric' })}` : `Your goal date, ${niceDate(plan.goal)}, has passed`}
        </h1>
        <p>
          {plan.hours} hours a week on {plan.days.map((d) => WEEKDAYS[d]).join(', ')} · about {fmtMinutes(dayBudget(plan))} of new material each study day, plus a few minutes of review.
        </p>
        <div className="plan-head-actions">
          <button type="button" className="btn ghost sm" onClick={onEdit}>
            Change plan
          </button>
        </div>
      </header>

      <section className={`plan-status ${sum.onTrack ? 'ok' : 'no'}`} data-reveal>
        <div className="plan-status-main">
          <span className={`pill ${sum.onTrack ? 'ok' : 'warn'}`}>{sum.left.length === 0 ? 'All done' : sum.onTrack ? 'On track' : 'Behind your goal'}</span>
          <strong>
            {sum.left.length === 0 ? 'Every class on your timetable is done.' : `At this pace you finish on ${niceDate(sum.finish, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}.`}
          </strong>
          {!sum.onTrack && daysLeft > 0 && (
            <span className="plan-fix">
              To make {niceDate(plan.goal)}, study about {fmtHours(sum.needHours)} a week.
              {sum.needHours <= 30 && (
                <button type="button" className="btn primary sm" onClick={() => onSave({ ...plan, hours: Math.ceil(sum.needHours) })}>
                  Change to {Math.ceil(sum.needHours)} h a week
                </button>
              )}
              <button type="button" className="btn ghost sm" onClick={() => onSave({ ...plan, goal: addDays(sum.finish, 7) })}>
                Move the goal to {niceDate(addDays(sum.finish, 7))}
              </button>
            </span>
          )}
        </div>
        <div className="plan-stats">
          <div>
            <strong>{pct}%</strong>
            <span>of the work done</span>
          </div>
          <div>
            <strong>{sum.classesLeft}</strong>
            <span>classes left</span>
          </div>
          <div>
            <strong>{fmtHours(sum.minutesLeft / 60)}</strong>
            <span>of study left</span>
          </div>
        </div>
        <div className="meter plan-meter">
          <span style={{ width: `${pct}%` }} />
        </div>
      </section>

      <h2 className="section-title" data-reveal>
        The next 7 days
      </h2>
      <div className="plan-week" data-reveal>
        {week.map((w, i) => (
          <article key={w.day} className={`plan-day ${w.study ? '' : 'rest'} ${i === 0 ? 'now' : ''}`}>
            <header>
              <strong>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : niceDate(w.day, { weekday: 'long' })}</strong>
              <span>{niceDate(w.day, { day: 'numeric', month: 'short' })}</span>
              {w.sched && <em>{fmtMinutes(w.sched.minutes)}</em>}
            </header>
            {w.sched ? (
              <ul>
                {w.sched.units.map((u) => (
                  <UnitRow key={u.id} u={u} onOpenUnit={onOpenUnit} />
                ))}
              </ul>
            ) : (
              <p className="notes-hint">{w.study ? 'Nothing left to plan.' : 'Rest day. Review still works if you feel like it.'}</p>
            )}
          </article>
        ))}
      </div>

      {months.length > 0 && (
        <>
          <h2 className="section-title" data-reveal>
            Month by month
          </h2>
          <ol className="plan-months" data-reveal>
            {months.map((m) => (
              <li key={m.key} className={m.key > goalMonth ? 'late' : m.key === goalMonth ? 'goal' : ''}>
                <span className="plan-month-name">
                  {niceDate(`${m.key}-01`, { month: 'long', year: 'numeric' })}
                  {m.key === goalMonth && <em>goal month</em>}
                  {m.key > goalMonth && <em>after your goal</em>}
                </span>
                <span className="plan-month-count">{m.classes.length} classes</span>
                <span className="plan-month-subjects">
                  {Object.entries(m.classes.reduce((a, l) => ((a[l.track] = (a[l.track] || 0) + 1), a), {})).map(([t, n]) => (
                    <span key={t} className={`track track-${t}`}>
                      {SUBJECTS[t] || t} {n}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </>
      )}
      <p className="notes-hint plan-foot" data-reveal>
        Times are estimates: about 20 minutes for a class’s story and animation, the minutes written on each “Learn it” part, and about 10
        minutes for the quiz. Track classes are not in the plan, since they open as you finish each year.{' '}
        <RemovePlan onRemove={() => onSave(null)} />
      </p>
    </div>
  );
}

// Two taps to remove, so it never happens by accident. Your progress stays.
function RemovePlan({ onRemove }) {
  const [sure, setSure] = useState(false);
  return sure ? (
    <span className="plan-remove">
      Remove the plan? Your progress is not touched.{' '}
      <button type="button" className="tl-link-btn" onClick={onRemove}>
        Yes, remove
      </button>{' '}
      <button type="button" className="tl-link-btn" onClick={() => setSure(false)}>
        Keep it
      </button>
    </span>
  ) : (
    <button type="button" className="tl-link-btn" onClick={() => setSure(true)}>
      Remove plan
    </button>
  );
}
