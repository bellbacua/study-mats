import { useEffect, useMemo, useState } from 'react';
import Cited, { citesOf } from './Cited';
import Glossed from './Glossed';
import { LostPanel } from './LostHelp';

// The story, one idea per screen: each paragraph is a card with a quick check
// under it, and the last card is "Why it matters" plus the short version.
// `card` and `setCard` live in LessonView so a side trip can come back here.

// A fixed shuffle per question, so the right answer isn't always first but
// doesn't jump around between visits either.
function shuffled(opts, seed) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const a = opts.map((o, i) => ({ o, i }));
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuickCheck({ check, seed, onLost }) {
  const [pick, setPick] = useState(null);
  if (!check) {
    return (
      <div className="qc">
        <span className="qc-eyebrow">Quick check</span>
        <p className="qc-q">Could you tell a friend what this card says, in one sentence?</p>
        <div className="qc-opts self">
          <button type="button" className={`qc-opt ${pick === 'yes' ? 'right' : ''}`} onClick={() => setPick('yes')}>
            Yes, I could
          </button>
          <button type="button" className="qc-opt" onClick={onLost}>
            Not really
          </button>
        </div>
        {pick === 'yes' && <p className="qc-msg ok">Good. Saying it out loud (or in your notes) is what makes it stick.</p>}
      </div>
    );
  }
  const [q, ...opts] = check;
  const order = shuffled(opts, seed);
  const right = pick === 0;
  return (
    <div className="qc">
      <span className="qc-eyebrow">Quick check</span>
      <p className="qc-q">
        <Glossed text={q} />
      </p>
      <div className="qc-opts">
        {order.map(({ o, i }) => (
          <button
            key={i}
            type="button"
            className={`qc-opt ${pick === i ? (i === 0 ? 'right' : 'wrong') : ''} ${pick === 0 && i !== 0 ? 'dim' : ''}`}
            onClick={() => setPick(i)}
            disabled={right}
          >
            {o}
          </button>
        ))}
      </div>
      {pick !== null && (right ? <p className="qc-msg ok">Yes, that’s it.</p> : <p className="qc-msg no">Not quite. Look at the card again, or tap “I’m lost”.</p>)}
    </div>
  );
}

export default function StoryCards({ lesson, help, card, setCard, legends, onDetour, onWhole, ending }) {
  const h = lesson.history;
  const n = h.narrative.length;
  const total = n + 1;
  const i = Math.min(card, total - 1);
  const [lost, setLost] = useState(false);
  useEffect(() => setLost(false), [i, lesson.id]);
  const p = h.narrative[i];
  const entry = help?.p?.[i] || null;

  // ← and → move between cards when nothing else wants the keys.
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.closest?.('.cm-editor, .scene-stage, .notes-panel'))) return;
      if (e.key === 'ArrowRight' && i < total - 1) setCard(i + 1);
      else if (e.key === 'ArrowLeft' && i > 0) setCard(i - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, total, setCard]);

  const dots = useMemo(() => Array.from({ length: total }, (_, k) => k), [total]);

  return (
    <div className="sc">
      <div className="sc-bar">
        <span className="sc-count">{i < n ? `Card ${i + 1} of ${total}` : `Last card · ${total} of ${total}`}</span>
        <span className="sc-dots" role="tablist" aria-label="Story cards">
          {dots.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={k < n ? `Card ${k + 1}` : 'Why it matters'}
              className={`sc-dot ${k === i ? 'on' : ''} ${k < i ? 'seen' : ''}`}
              onClick={() => setCard(k)}
            />
          ))}
        </span>
        <button type="button" className="sc-whole" onClick={onWhole}>
          Show it all on one page
        </button>
      </div>

      <article className="sc-card" key={`${lesson.id}:${i}`}>
        {i < n ? (
          <>
            <p className="sc-text">
              <Cited text={p} />
            </p>
            {legends?.[i] && (
              <details className="legend-tag">
                <summary title="This story may not have happened as told">Legend? What we actually know</summary>
                <span>{legends[i]}</span>
              </details>
            )}
            <QuickCheck key={`${lesson.id}:${i}`} check={entry?.[2]} seed={`${lesson.id}:${i}`} onLost={() => setLost(true)} />
            {lost ? (
              <LostPanel lesson={lesson} text={p} cites={citesOf(p)} entry={entry} onDetour={onDetour} onClose={() => setLost(false)} />
            ) : (
              <button type="button" className="lost-btn" onClick={() => setLost(true)}>
                <span aria-hidden="true">🧭</span> I’m lost
              </button>
            )}
          </>
        ) : (
          ending
        )}
      </article>

      <div className="sc-nav">
        <button type="button" className="btn ghost" disabled={i === 0} onClick={() => setCard(i - 1)}>
          ← Back
        </button>
        {i < total - 1 && (
          <button type="button" className="btn primary" onClick={() => setCard(i + 1)}>
            {i === n - 1 ? 'Why it matters →' : 'Next card →'}
          </button>
        )}
      </div>
    </div>
  );
}
