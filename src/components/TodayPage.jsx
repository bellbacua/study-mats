import { useMemo } from 'react';
import { LESSONS, SUBJECTS, PROGRAM, CURRICULUM_TERMS, START_LESSONS, START_LEVEL, weekNumber } from '../data/path';
import { DEEP } from '../data/deep';
import { today } from '../state/useProgress';
import { streaks } from './ProgressPage';
import { useReveal } from '../state/useReveal';
import { useWikiPic } from './Pictures';
import { COLLECTABLES, KINDS, collectionStats, isCollected } from '../state/collection';
import { classMinutes, fmtMinutes, niceDate, nextStudyDay, planSummary, todaysUnits } from '../state/plan';

const DAY = 86_400_000;
const MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];
const shortName = (p) => (p || '').split('(')[0].trim();
const studied = (d) => d && (d.actions || 0) + (d.minutes || 0) > 0;

function greeting(d = new Date()) {
  const h = d.getHours();
  return h < 5 ? 'Up late' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

// How far into a class you are: the parts the app keeps track of.
function classSteps(l, progress) {
  const deep = DEEP[l.id];
  const parts = deep?.parts?.length || 0;
  const partsDone = parts ? deep.parts.filter((_, k) => progress.readings[`part:${l.id}:${k}`]).length : 0;
  return [
    { label: 'See it', done: !!progress.labs[l.id] },
    ...(parts ? [{ label: `Learn it ${partsDone}/${parts}`, done: partsDone === parts, some: partsDone > 0 }] : []),
    { label: 'Class quiz', done: !!progress.passed[l.id] },
  ];
}

function Pic({ url, alt }) {
  const pic = useWikiPic(url, true);
  return <div className="today-pic">{pic ? <img src={pic.thumb} alt={alt} loading="lazy" /> : <span aria-hidden="true">✦</span>}</div>;
}

export default function TodayPage({ progress, active, nextUp, dueNow, spec, plan, missCount = 0, onOpenUnit, start, onSkipStart, onOpen, onGo, onLibrary }) {
  useReveal([]);
  const now = new Date();
  const { current, longest } = useMemo(() => streaks(progress.days), [progress.days]);
  const todayKey = today(now);
  const studiedToday = studied(progress.days[todayKey]);
  const minutesToday = progress.days[todayKey]?.minutes || 0;
  const done = LESSONS.filter((l) => progress.passed[l.id]).length;

  // The class to carry on with: the one you have open, if you started it and
  // have not finished it yet; otherwise the next one on your timetable.
  const started = (l) => l && !progress.passed[l.id] && (progress.labs[l.id] || Object.keys(progress.readings).some((k) => k.startsWith(`part:${l.id}:`)));
  // A newcomer is led through Start here first (until it is done or skipped).
  const lead = start?.leads ? start.next : nextUp;
  const hero = started(active) ? active : lead;
  const heroResume = hero && hero === active && started(active);
  const term = hero && CURRICULUM_TERMS.find((t) => t.id === hero.termId);

  const upNext = useMemo(
    () => [...(start?.leads ? START_LESSONS : []), ...LESSONS].filter((l) => !progress.passed[l.id] && l.id !== hero?.id).slice(0, 3),
    [progress.passed, hero, start?.leads]
  );

  // The last seven days, oldest first, for the streak strip.
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getTime() - (6 - i) * DAY);
    return { key: today(d), label: d.toLocaleDateString(undefined, { weekday: 'narrow' }), on: studied(progress.days[today(d)]), isToday: i === 6 };
  });
  const nextMilestone = MILESTONES.find((m) => m > current);

  const stats = collectionStats(progress.passed);
  // One collected person or discovery to look at today (the same one all day).
  const owned = COLLECTABLES.filter((x) => x.kind !== 'materials' && isCollected(x, progress.passed));
  const seed = Number(todayKey.replace(/-/g, '')) % 9973;
  const featured = owned.length ? owned[seed % owned.length] : null;

  const weekNo = hero ? weekNumber(hero) : null;

  return (
    <div className="today">
      <header className="today-head" data-reveal>
        <span className="eyebrow">{now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        <h1>{greeting(now)}.</h1>
        <p>
          {done === 0 && start?.leads
            ? start.done
              ? `Start here: ${start.done} of ${start.total} done. A few more short classes, then week 1 of ${PROGRAM.short || PROGRAM.title}.`
              : `Welcome. Before week 1 there are ${start.total} short classes on how to study and the math basics. No background needed.`
            : done === 0
            ? `Welcome to ${PROGRAM.short || PROGRAM.title}. Everything starts from zero, so your first class is the easiest one.`
            : `${done} of ${LESSONS.length} classes done${weekNo ? `. You are in week ${weekNo} of ${CURRICULUM_TERMS.length}` : ''}.`}
        </p>
      </header>

      <TodayPlan plan={plan} progress={progress} dueNow={dueNow} missCount={missCount} onOpenUnit={onOpenUnit} onGo={onGo} />

      <div className="today-grid">
        {hero ? (
          <section className={`today-hero subj-${hero.track}`} data-reveal>
            <div className="today-hero-top">
              <span className="eyebrow">
                {heroResume ? 'Pick up where you left off' : hero.start ? `Start here · class ${START_LESSONS.indexOf(hero) + 1} of ${START_LESSONS.length}` : done ? 'Your next class' : 'Start here'}
              </span>
              <span className={`subject track-${hero.track}`}>{SUBJECTS[hero.track] || hero.track}</span>
            </div>
            <h2>{hero.title}</h2>
            <p className="today-hero-sub">{hero.subtitle}</p>
            <p className="today-hero-meta">
              {term ? `${term.title} · ${hero.day} · ` : hero.start ? 'Before week 1 · ' : ''}
              {hero.history?.era?.split('•')[0].trim()} · {shortName(hero.history?.protagonist)} · about {fmtMinutes(classMinutes(hero))}
            </p>
            <ol className="today-steps" aria-label="Your progress in this class">
              {classSteps(hero, progress).map((s) => (
                <li key={s.label} className={s.done ? 'done' : s.some ? 'some' : ''}>
                  <span className="today-step-dot" aria-hidden="true">{s.done ? '✓' : ''}</span>
                  {s.label}
                </li>
              ))}
            </ol>
            <div className="today-hero-actions">
              <button type="button" className="btn primary lg" onClick={() => onOpen(hero.id)}>
                {heroResume ? 'Continue class' : 'Start class'} →
              </button>
              {heroResume && nextUp && nextUp.id !== hero.id && !hero.start && (
                <button type="button" className="btn ghost" onClick={() => onOpen(nextUp.id)}>
                  Or your next timetable class
                </button>
              )}
              {hero.start && !start?.skipped && (
                <button type="button" className="btn ghost" onClick={onSkipStart} title="You can come back to Start here from the Roadmap at any time">
                  I have studied before: skip to week 1
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="today-hero" data-reveal>
            <span className="eyebrow">Timetable finished</span>
            <h2>Every class on your timetable is done.</h2>
            <p className="today-hero-sub">Keep your memory fresh with reviews, add a track, or borrow subjects from another program.</p>
            <div className="today-hero-actions">
              <button type="button" className="btn primary lg" onClick={() => onGo('spec')}>
                See your program →
              </button>
            </div>
          </section>
        )}

        <div className="today-side">
          <button type="button" className={`today-card today-review ${dueNow ? 'due' : ''}`} onClick={() => onGo('review')} data-reveal>
            <span className="eyebrow">Review</span>
            <strong className="today-big">{dueNow || '✓'}</strong>
            <span className="today-card-text">
              {dueNow ? `question${dueNow === 1 ? '' : 's'} due from earlier classes. A few minutes keeps them fresh.` : 'All caught up. New questions appear as you finish classes.'}
            </span>
            {dueNow > 0 && <span className="today-card-go">Start review →</span>}
          </button>

          <button type="button" className="today-card today-streak" onClick={() => onGo('progress')} data-reveal>
            <span className="eyebrow">Streak</span>
            <strong className="today-big">
              {current} <span>day{current === 1 ? '' : 's'}</span> {current > 0 && <span className="flame">🔥</span>}
            </strong>
            <span className="today-week" aria-label="The last seven days">
              {week.map((d) => (
                <span key={d.key} className={`${d.on ? 'on' : ''} ${d.isToday ? 'now' : ''}`} title={d.key}>
                  <i />
                  {d.label}
                </span>
              ))}
            </span>
            <span className="today-card-text">
              {studiedToday
                ? `${minutesToday ? `${minutesToday} min today. ` : ''}${nextMilestone ? `${nextMilestone - current} more day${nextMilestone - current === 1 ? '' : 's'} to a ${nextMilestone}-day streak.` : 'An amazing run.'}`
                : current > 0
                  ? 'Study a little today to keep it going.'
                  : 'Any study today starts a new streak.'}
              {longest > current && ` Best so far: ${longest}.`}
            </span>
          </button>
        </div>
      </div>

      {spec && (
        <button type="button" className="continue spec-due today-spec" onClick={spec.go} data-reveal>
          <span className="eyebrow">{spec.eyebrow}</span>
          <strong>{spec.title}</strong>
          <span className="continue-meta">{spec.meta}</span>
        </button>
      )}

      {start && !start.leads && !start.finished && !start.skipped && (
        <button type="button" className="continue start-due today-spec" onClick={() => onOpen(start.next.id)} data-reveal>
          <span className="eyebrow">
            {START_LEVEL.icon} Start here · optional · {start.done} of {start.total} done
          </span>
          <strong>{start.next.title}</strong>
          <span className="continue-meta">Short classes on how memory works, testing yourself, notes and the math basics. Worth it even if you are well along.</span>
        </button>
      )}

      {upNext.length > 0 && (
        <section className="today-section" data-reveal>
          <div className="today-section-head">
            <h2>Coming up</h2>
            <button type="button" className="btn ghost sm" onClick={() => onGo('roadmap')}>
              Full roadmap
            </button>
          </div>
          <ol className="today-next">
            {upNext.map((l) => (
              <li key={l.id}>
                <button type="button" className={`class-card subj-${l.track}`} onClick={() => onOpen(l.id)}>
                  <span className="class-top">
                    <span className="class-day">{l.day}</span>
                    <span className={`subject track-${l.track}`}>{SUBJECTS[l.track] || l.track}</span>
                    <span className="class-num">{l.start ? `${START_LESSONS.indexOf(l) + 1} of ${START_LESSONS.length}` : `Week ${weekNumber(l)}`}</span>
                  </span>
                  <span className="path-title">{l.title}</span>
                  <span className="path-meta">
                    {l.history.era.split('•')[0].split('→')[0].trim()} · {shortName(l.history.protagonist)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="today-section today-bottom" data-reveal>
        <button type="button" className="today-card today-collection" onClick={onLibrary}>
          <span className="eyebrow">Your collection</span>
          <strong className="today-big">
            {stats.have} <span>of {stats.total}</span>
          </strong>
          <span className="today-card-text">People, discoveries and materials join your Library album as you meet them in class.</span>
          <span className="today-bars">
            {KINDS.map((k) => (
              <span key={k.id}>
                <span className="today-bar-label">
                  {k.icon} {k.label}
                  <em>
                    {stats[k.id].have}/{stats[k.id].total}
                  </em>
                </span>
                <span className="meter">
                  <span style={{ width: `${(stats[k.id].have / Math.max(1, stats[k.id].total)) * 100}%` }} />
                </span>
              </span>
            ))}
          </span>
        </button>
        {featured ? (
          <div className="today-card today-featured">
            <Pic url={featured.wiki} alt={featured.name} />
            <div>
              <span className="eyebrow">{featured.kind === 'people' ? 'Someone you have met' : 'A discovery you have met'}</span>
              <strong>{featured.name}</strong>
              <p>{featured.sub}</p>
              <a href={featured.wiki} target="_blank" rel="noreferrer" className="today-card-go">
                Read more on Wikipedia ↗
              </a>
            </div>
          </div>
        ) : (
          <div className="today-card today-featured empty">
            <div>
              <span className="eyebrow">First card</span>
              <strong>Your album is empty, for now.</strong>
              <p>Finish your first class and the people in its story become your first cards.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// Today's slice of the study plan, or an invitation to make one.
function TodayPlan({ plan, progress, dueNow, missCount, onOpenUnit, onGo }) {
  const units = useMemo(() => (plan ? todaysUnits(plan, progress) : []), [plan, progress]);
  const sum = useMemo(() => (plan ? planSummary(plan, progress) : null), [plan, progress]);
  const next = useMemo(() => (plan && units.length === 0 ? nextStudyDay(plan, progress) : null), [plan, progress, units.length]);
  if (!plan)
    return (
      <button type="button" className="today-plan-cta" onClick={() => onGo('plan')} data-reveal>
        <span className="today-plan-cta-icon" aria-hidden="true">
          📅
        </span>
        <span>
          <strong>Make a study plan</strong>
          <span>Pick a goal date and the hours you have. This page then shows exactly what to do each day.</span>
        </span>
        <span className="today-card-go">Set it up →</span>
      </button>
    );
  const doneN = units.filter((u) => u.done).length;
  const allDone = units.length > 0 && doneN === units.length;
  const minutes = units.reduce((s, u) => s + u.minutes, 0);
  const reviewMin = Math.ceil(Math.min(dueNow, 20) * 0.5);
  return (
    <section className={`today-plan ${allDone ? 'all-done' : ''}`} data-reveal>
      <div className="today-plan-head">
        <div>
          <span className="eyebrow">Today’s plan</span>
          <h2>
            {units.length === 0
              ? 'A rest day'
              : allDone
                ? 'Done for today. Well done.'
                : `${doneN} of ${units.length} done · about ${fmtMinutes(minutes)}`}
          </h2>
        </div>
        <button type="button" className={`pill ${sum.onTrack ? 'ok' : 'warn'} today-plan-pace`} onClick={() => onGo('plan')} title="Open your study plan">
          {sum.left.length === 0 ? 'Timetable done' : sum.onTrack ? `On track for ${niceDate(plan.goal, { month: 'short', year: 'numeric' })}` : 'Behind your goal'}
        </button>
      </div>
      {units.length > 0 ? (
        <ol className="today-plan-list">
          {units.map((u) => (
            <li key={u.id} className={u.done ? 'done' : ''}>
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
          ))}
        </ol>
      ) : (
        <p className="today-plan-note">
          No new classes today. {next ? `Next study day: ${niceDate(next.day, { weekday: 'long', day: 'numeric', month: 'short' })}, ${next.units[0]?.lesson.title.split(':')[0]}.` : ''}
        </p>
      )}
      {(dueNow > 0 || missCount > 0) && (
        <div className="today-plan-extra">
          {dueNow > 0 && (
            <button type="button" className="btn ghost sm" onClick={() => onGo('review')}>
              ↻ Review {dueNow} question{dueNow === 1 ? '' : 's'} · about {reviewMin} min
            </button>
          )}
          {missCount > 0 && (
            <button type="button" className="btn ghost sm" onClick={() => onGo('mistakes')}>
              ✗ Redo {missCount} mistake{missCount === 1 ? '' : 's'}
            </button>
          )}
        </div>
      )}
      {allDone && sum.left.length > 0 && (
        <p className="today-plan-note">
          Want more? The next piece is{' '}
          <button type="button" className="tl-link-btn" onClick={() => onOpenUnit(sum.left[0])}>
            {sum.left[0].lesson.title.split(':')[0]}: {sum.left[0].label}
          </button>
          . Anything extra moves your finish date earlier.
        </p>
      )}
    </section>
  );
}
