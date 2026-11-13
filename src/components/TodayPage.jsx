import { useMemo } from 'react';
import { LESSONS, SUBJECTS, PROGRAM, CURRICULUM_TERMS, weekNumber } from '../data/path';
import { DEEP } from '../data/deep';
import { today } from '../state/useProgress';
import { streaks } from './ProgressPage';
import { useReveal } from '../state/useReveal';
import { useWikiPic } from './Pictures';
import { COLLECTABLES, KINDS, collectionStats, isCollected } from '../state/collection';

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

export default function TodayPage({ progress, active, nextUp, dueNow, spec, onOpen, onGo, onLibrary }) {
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
  const hero = started(active) ? active : nextUp;
  const heroResume = hero && hero === active && started(active);
  const term = hero && CURRICULUM_TERMS.find((t) => t.id === hero.termId);

  const upNext = useMemo(() => LESSONS.filter((l) => !progress.passed[l.id] && l.id !== hero?.id).slice(0, 3), [progress.passed, hero]);

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
          {done === 0
            ? `Welcome to ${PROGRAM.short || PROGRAM.title}. Everything starts from zero, so your first class is the easiest one.`
            : `${done} of ${LESSONS.length} classes done${weekNo ? `. You are in week ${weekNo} of ${CURRICULUM_TERMS.length}` : ''}.`}
        </p>
      </header>

      <div className="today-grid">
        {hero ? (
          <section className={`today-hero subj-${hero.track}`} data-reveal>
            <div className="today-hero-top">
              <span className="eyebrow">{heroResume ? 'Pick up where you left off' : done ? 'Your next class' : 'Start here'}</span>
              <span className={`subject track-${hero.track}`}>{SUBJECTS[hero.track] || hero.track}</span>
            </div>
            <h2>{hero.title}</h2>
            <p className="today-hero-sub">{hero.subtitle}</p>
            <p className="today-hero-meta">
              {term ? `${term.title} · ${hero.day} · ` : ''}
              {hero.history?.era?.split('•')[0].trim()} · {shortName(hero.history?.protagonist)}
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
              {heroResume && nextUp && nextUp.id !== hero.id && (
                <button type="button" className="btn ghost" onClick={() => onOpen(nextUp.id)}>
                  Or your next timetable class
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
                    <span className="class-num">Week {weekNumber(l)}</span>
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
