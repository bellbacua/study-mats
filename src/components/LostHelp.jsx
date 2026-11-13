import { useState } from 'react';
import Cited from './Cited';
import { buildsOn, gapsIn, newWordsIn } from '../data/help/gaps';

// The "I'm lost" panel for one story card or one animation step: a plainer
// version, an everyday comparison, the words it leans on, and the earlier
// class to go back to if a piece is missing. `entry` is [plainer, like] from
// src/data/help (or null when this part has no plainer version yet).
export function LostPanel({ lesson, text, cites, entry, onDetour, onClose }) {
  const [plain, like] = entry || [];
  const gaps = gapsIn(lesson, text).slice(0, 3);
  const fresh = newWordsIn(lesson, text).slice(0, 3);
  const gapIds = new Set(gaps.map((g) => g.lesson));
  const back = buildsOn(lesson).filter((l) => !gapIds.has(l.id)).slice(0, Math.max(0, 3 - gapIds.size));
  const mark = cites ? ` ${cites}` : '';
  return (
    <div className="lost" role="region" aria-label="Help with this part">
      <div className="lost-head">
        <span className="eyebrow">Let’s slow down</span>
        {onClose && (
          <button type="button" className="lost-x" aria-label="Close help" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      {plain ? (
        <>
          <p className="lost-plain">
            <Cited text={plain + mark} />
          </p>
          {like && (
            <p className="lost-like">
              <span className="lost-tag">Think of it like this</span>
              <Cited text={like + mark} />
            </p>
          )}
        </>
      ) : (
        <p className="lost-plain">Read it once more, slowly, one sentence at a time. Then try the words and classes below.</p>
      )}
      {fresh.length > 0 && (
        <div className="lost-block">
          <span className="lost-tag">New words here</span>
          <ul className="lost-words">
            {fresh.map((g) => (
              <li key={g.term}>
                <strong>{g.term}</strong> {g.def}
              </li>
            ))}
          </ul>
        </div>
      )}
      {(gaps.length > 0 || back.length > 0) && (
        <div className="lost-block">
          <span className="lost-tag">The missing piece might be here</span>
          <ul className="lost-back">
            {gaps.map((g) => (
              <li key={g.term}>
                <span>
                  <strong>{g.term}</strong> {g.def}
                </span>
                {g.from && (
                  <button type="button" className="btn ghost sm" onClick={() => onDetour(g.from.id)}>
                    Go back to “{g.from.title}”
                  </button>
                )}
              </li>
            ))}
            {back.map((l) => (
              <li key={l.id}>
                <span>
                  This class builds on <strong>{l.title}</strong>.
                </span>
                <button type="button" className="btn ghost sm" onClick={() => onDetour(l.id)}>
                  Go back to it
                </button>
              </li>
            ))}
          </ul>
          <p className="lost-note">You’ll get a button to come straight back here.</p>
        </div>
      )}
    </div>
  );
}

// The button plus its panel, for places that show one part at a time.
export default function LostHelp({ lesson, text, cites, entry, onDetour, label = 'I’m lost' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lost-wrap">
      {!open && (
        <button type="button" className="lost-btn" onClick={() => setOpen(true)} aria-expanded={open}>
          <span aria-hidden="true">🧭</span> {label}
        </button>
      )}
      {open && <LostPanel lesson={lesson} text={text} cites={cites} entry={entry} onDetour={onDetour} onClose={() => setOpen(false)} />}
    </div>
  );
}
