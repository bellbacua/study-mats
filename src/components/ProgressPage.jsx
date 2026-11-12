import { useMemo, useState } from 'react';
import { LESSONS, SUBJECTS } from '../data/path';
import { today } from '../state/useProgress';
import { useReveal } from '../state/useReveal';
import ExportPanel from './ExportPanel';

const DAY = 86_400_000;
const keyOf = (d) => today(d);
const studied = (days, k) => (days[k]?.actions || 0) + (days[k]?.minutes || 0) > 0;

export function streaks(days) {
  let current = 0;
  const d = new Date();
  // today not studied yet still keeps yesterday's streak alive
  if (!studied(days, keyOf(d))) d.setTime(d.getTime() - DAY);
  while (studied(days, keyOf(d))) {
    current += 1;
    d.setTime(d.getTime() - DAY);
  }
  const sorted = Object.keys(days).filter((k) => studied(days, k)).sort();
  let longest = 0;
  let run = 0;
  let prev = null;
  for (const k of sorted) {
    const t = new Date(`${k}T12:00:00`).getTime();
    run = prev != null && Math.round((t - prev) / DAY) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = t;
  }
  return { current, longest };
}

export default function ProgressPage({ progress, nextUp, onOpen, onPrintWeek }) {
  const [offset, setOffset] = useState(0); // months back from now
  useReveal([offset]);
  const { current, longest } = useMemo(() => streaks(progress.days), [progress.days]);
  const totalMin = Object.values(progress.days).reduce((a, d) => a + (d.minutes || 0), 0);
  const done = LESSONS.filter((l) => progress.passed[l.id]).length;

  const month = new Date();
  month.setDate(1);
  month.setMonth(month.getMonth() - offset);
  const first = new Date(month);
  const startPad = (first.getDay() + 6) % 7; // Monday first
  const dim = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(startPad).fill(null), ...Array.from({ length: dim }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const level = (d) => {
    const v = progress.days[keyOf(d)];
    if (!v) return 0;
    const m = v.minutes + v.actions * 5;
    return m >= 60 ? 4 : m >= 30 ? 3 : m >= 10 ? 2 : 1;
  };

  const bySubject = Object.keys(SUBJECTS).map((k) => {
    const all = LESSONS.filter((l) => l.track === k);
    return { k, done: all.filter((l) => progress.passed[l.id]).length, total: all.length };
  }).filter((r) => r.total > 0);

  return (
    <div className="progress-page">
      <header className="timeline-head" data-reveal>
        <h1>Your progress</h1>
        <p>Days you study light up. A streak is just a nudge: missing a day is fine.</p>
      </header>

      <div className="stat-row" data-reveal>
        <div className="stat">
          <span>Current streak</span>
          <strong>
            {current} day{current === 1 ? '' : 's'} {current > 0 ? '🔥' : ''}
          </strong>
        </div>
        <div className="stat">
          <span>Longest streak</span>
          <strong>
            {longest} day{longest === 1 ? '' : 's'}
          </strong>
        </div>
        <div className="stat">
          <span>Active study time</span>
          <strong>{totalMin >= 60 ? `${Math.floor(totalMin / 60)} h ${totalMin % 60} min` : `${totalMin} min`}</strong>
        </div>
        <div className="stat">
          <span>Classes finished</span>
          <strong>
            {done} / {LESSONS.length}
          </strong>
        </div>
      </div>

      {nextUp && (
        <button type="button" className="continue" onClick={() => onOpen(nextUp.id)} data-reveal>
          <span className="eyebrow">Today&apos;s class · {nextUp.termId.replace('week-', 'Week ')}, {nextUp.day}</span>
          <strong>{nextUp.title}</strong>
        </button>
      )}

      <div className="progress-split">
      <section className="calendar" data-reveal>
        <div className="cal-head">
          <button type="button" className="btn ghost sm" onClick={() => setOffset(offset + 1)}>
            ‹
          </button>
          <h2>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
          <button type="button" className="btn ghost sm" disabled={offset === 0} onClick={() => setOffset(offset - 1)}>
            ›
          </button>
        </div>
        <div className="cal-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <span key={d} className="cal-dow">
              {d}
            </span>
          ))}
          {cells.map((d, i) =>
            d ? (
              <span
                key={i}
                className={`cal-day lvl-${level(d)} ${keyOf(d) === today() ? 'is-today' : ''}`}
                title={progress.days[keyOf(d)] ? `${progress.days[keyOf(d)].minutes} min active` : 'No study'}
              >
                {d.getDate()}
              </span>
            ) : (
              <span key={i} />
            )
          )}
        </div>
      </section>

      <section className="progress-subjects" data-reveal>
        <h2 className="section-title">By subject</h2>
        <div className="report-subjects">
          {bySubject.map(({ k, done: dn, total }) => (
            <div key={k} className={`report-bar subj-${k}`}>
              <span>{SUBJECTS[k]}</span>
              <div className="meter">
                <div style={{ width: `${(dn / total) * 100}%`, background: 'var(--subj)' }} />
              </div>
              <strong>
                {dn}/{total}
              </strong>
            </div>
          ))}
        </div>
      </section>
      </div>

      <ExportPanel progress={progress} onPrintWeek={onPrintWeek} />
    </div>
  );
}
