import { useEffect, useMemo, useRef } from 'react';
import { ALL_LESSONS, LESSONS, SUBJECTS, needsOf } from '../data/path';
import { lessonQuestions } from '../state/quiz';
import { KINDS, newFromLesson } from '../state/collection';

const shortName = (p) => (p || '').split('(')[0].trim();
const CLASS_MILESTONES = [1, 5, 10, 25, 50, 75, 100, 125, 150, 200];

// A short burst of paper bits. Pure CSS; skipped when reduced motion is on.
function Confetti({ n = 36 }) {
  const bits = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        x: (Math.random() * 2 - 1) * 260,
        y: -120 - Math.random() * 220,
        r: Math.random() * 720 - 360,
        d: Math.random() * 0.25,
        c: ['var(--blue)', 'var(--green)', 'var(--gold)', 'var(--purple)', 'var(--yellow)'][i % 5],
        w: 6 + Math.random() * 6,
      })),
    [n],
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i key={i} style={{ '--x': `${b.x}px`, '--y': `${b.y}px`, '--r': `${b.r}deg`, '--d': `${b.d}s`, '--c': b.c, '--w': `${b.w}px` }} />
      ))}
    </div>
  );
}

function useEscape(onClose) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
}

// Shown once, right after a class is passed.
export function FinishRecap({ lesson, score, passed, nextLesson, onNext, onClose, onLibrary, onExplain }) {
  useEscape(onClose);
  const first = useRef(null);
  useEffect(() => first.current?.focus(), []);

  const before = useMemo(() => {
    const p = { ...passed };
    delete p[lesson.id];
    return p;
  }, [passed, lesson.id]);
  const unlocked = useMemo(() => newFromLesson(lesson.id, before), [lesson.id, before]);
  const buildsOn = useMemo(() => ALL_LESSONS.filter((l) => l.id !== nextLesson?.id && !passed[l.id] && needsOf(l.id).includes(lesson.id)).slice(0, 3), [lesson.id, nextLesson, passed]);
  const reviewN = useMemo(() => lessonQuestions(lesson).length, [lesson]);
  const doneCount = LESSONS.filter((l) => passed[l.id]).length;
  const milestone = LESSONS.some((l) => l.id === lesson.id) && CLASS_MILESTONES.includes(doneCount) ? doneCount : null;
  const h = lesson.history || {};

  return (
    <div className="modal-backdrop" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`recap subj-${lesson.track}`} role="dialog" aria-modal="true" aria-labelledby="recap-title">
        <Confetti />
        <div className="recap-badge" aria-hidden="true">
          ✓
        </div>
        <span className="eyebrow">
          Class finished{score != null ? ` · ${score}%` : ''} · {SUBJECTS[lesson.track] || lesson.track}
        </span>
        <h2 id="recap-title">{lesson.title}</h2>
        {milestone && (
          <p className="recap-milestone">
            {milestone === 1 ? 'Your very first class. Every expert started exactly here.' : `That is ${milestone} classes finished. Look how far you have come.`}
          </p>
        )}

        <div className="recap-grid">
          <section>
            <span className="eyebrow">What you learned</span>
            <ul className="recap-learned">
              {(lesson.overtimeDigest || []).slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>
          <section>
            <span className="eyebrow">Who figured it out</span>
            <p className="recap-who">
              <strong>{shortName(h.protagonist)}</strong>
              <span>{h.era?.split('•')[0].trim()}</span>
            </p>
            {unlocked.length === 0 && (
              <button type="button" className="recap-album-link" onClick={onLibrary}>
                See your collection →
              </button>
            )}
            {unlocked.length > 0 && (
              <>
                <span className="eyebrow recap-new-head">New in your collection</span>
                <button type="button" className="recap-cards" onClick={onLibrary} title="Open your collection in the Library">
                  {unlocked.slice(0, 6).map((x) => (
                    <span key={x.key} className={`recap-card kind-${x.kind}`}>
                      <span aria-hidden="true">{KINDS.find((k) => k.id === x.kind)?.icon}</span>
                      {x.name}
                    </span>
                  ))}
                  {unlocked.length > 6 && <span className="recap-card more">+{unlocked.length - 6} more</span>}
                </button>
              </>
            )}
          </section>
        </div>

        <section className="recap-next">
          <span className="eyebrow">What it unlocks</span>
          {nextLesson ? (
            <p>
              Next up: <strong>{nextLesson.title}</strong>
            </p>
          ) : (
            <p>That was the last class in this run.</p>
          )}
          {buildsOn.length > 0 && <p className="recap-also">Also builds on this: {buildsOn.map((l) => l.title.split(':')[0]).join(' · ')}</p>}
          {reviewN > 0 && (
            <p className="recap-also">
              Its {reviewN} question{reviewN === 1 ? '' : 's'} will come back in Review tomorrow, so it sticks.
            </p>
          )}
        </section>

        <div className="recap-actions">
          <button type="button" className="btn ghost" onClick={onClose}>
            Stay here
          </button>
          {onExplain && (
            <button type="button" className="btn ghost" onClick={onExplain} title="Write the idea in your own words, then compare">
              ✍ Explain it back
            </button>
          )}
          {nextLesson && (
            <button ref={first} type="button" className="btn primary" onClick={onNext}>
              Start the next class →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// A small toast when a streak reaches a milestone.
export function StreakToast({ days, onClose }) {
  useEscape(onClose);
  useEffect(() => {
    const t = setTimeout(onClose, 7000);
    return () => clearTimeout(t);
  }, [onClose]);
  const line =
    days >= 100
      ? 'A hundred days and more. That is how real expertise is built.'
      : days >= 30
        ? 'A whole month of showing up. This is a habit now.'
        : days >= 14
          ? 'Two weeks in a row. Your future self is grateful.'
          : days >= 7
            ? 'A full week. Small daily steps add up fast.'
            : 'Three days running. Keep the chain going.';
  return (
    <div className="streak-toast" role="status">
      <Confetti n={22} />
      <span className="streak-toast-flame" aria-hidden="true">
        🔥
      </span>
      <div>
        <strong>{days}-day streak!</strong>
        <span>{line}</span>
      </div>
      <button type="button" className="streak-toast-x" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
