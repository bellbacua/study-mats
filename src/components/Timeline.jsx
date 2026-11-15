import { useMemo, useState } from 'react';
import { TIMELINE, ERAS, formatYear } from '../data/timeline';
import { ALL_LESSONS as LESSONS, LESSONS as CORE, SUBJECTS, whereLabel } from '../data/path';
import { useReveal } from '../state/useReveal';

// One chip for every subject that has events (Electronics, AI and the CS
// subjects too, which a fixed list used to leave out of the timeline).
const SUBJECT_KEYS = ['start', ...Object.keys(SUBJECTS).filter((k) => k !== 'start')].filter((k) => TIMELINE.some((ev) => ev.subject === k));

// The same moment can be told in several classes (Volta's pile turns up in
// chemistry, physics, materials and electronics). Show it once, linked to the
// class on your own timetable when there is one.
const CORE_IDS = new Set(CORE.map((l) => l.id));
const UNIQUE = [
  ...TIMELINE.reduce((m, ev) => {
    const k = `${ev.year}-${ev.title}`;
    const had = m.get(k);
    if (!had || (!CORE_IDS.has(had.lesson) && CORE_IDS.has(ev.lesson))) m.set(k, ev);
    return m;
  }, new Map()).values(),
];

export default function Timeline({ progress, onOpen }) {
  const [on, setOn] = useState(() => new Set(SUBJECT_KEYS));
  const byId = useMemo(() => Object.fromEntries(LESSONS.map((l) => [l.id, l])), []);
  const events = useMemo(
    () => [...UNIQUE].sort((a, b) => a.year - b.year).filter((ev) => on.has(ev.subject)),
    [on]
  );
  useReveal([events.length]);

  const toggle = (k) =>
    setOn((s) => {
      const n = new Set(s);
      if (n.has(k) && n.size > 1) n.delete(k);
      else n.add(k);
      return n;
    });

  const grouped = ERAS.map((era) => ({ era, items: events.filter((ev) => ev.year >= era.from && ev.year < era.to) })).filter((g) => g.items.length);

  return (
    <div className="timeline">
      <header className="timeline-head" data-reveal>
        <span className="eyebrow">Timeline</span>
        <h1>45,000 years of figuring things out</h1>
        <p>Every story from every class, in order. Tap an event to open the class that tells it.</p>
        <div className="chips">
          {SUBJECT_KEYS.map((k) => (
            <button key={k} type="button" className={`chip subj-${k} ${on.has(k) ? 'on' : ''}`} onClick={() => toggle(k)}>
              {SUBJECTS[k]}
            </button>
          ))}
        </div>
      </header>

      {grouped.map(({ era, items }) => (
        <section key={era.name} className="tl-era">
          <h2 className="tl-era-name" data-reveal>
            {era.name}
          </h2>
          <ol className="tl-line">
            {items.map((ev, i) => {
              const lesson = ev.lesson && byId[ev.lesson];
              const done = lesson && progress.passed[lesson.id];
              return (
                <li key={`${ev.year}-${ev.title}`} className={`tl-item subj-${ev.subject} ${i % 2 ? 'right' : 'left'}`} data-reveal>
                  <span className="tl-dot" />
                  <button type="button" className="tl-card" disabled={!lesson} onClick={() => lesson && onOpen(lesson.id)}>
                    <span className="tl-year">{formatYear(ev.year, ev.approx)}</span>
                    <strong>{ev.title}</strong>
                    <span className="tl-detail">{ev.detail}</span>
                    {lesson && (
                      <span className="tl-link">
                        {done ? '✓ ' : ''}
                        {whereLabel(lesson)} · {lesson.code}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
