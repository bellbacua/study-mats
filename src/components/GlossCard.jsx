import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { onGloss } from '../state/gloss';
import { lessonById } from '../data/path';
import { isEarlier } from '../data/help/gaps';

// The small card a tapped glossary word opens: the meaning, and the class
// where the word is taught, with a way to go there and come back. One card
// for the whole app (Glossed only announces which word was tapped).
export default function GlossCard({ currentId, onDetour, onGlossary }) {
  const [open, setOpen] = useState(null); // { g, rect, el }
  const [pos, setPos] = useState(null);
  const ref = useRef(null);

  useEffect(() => onGloss((o) => setOpen((cur) => (cur && cur.g.term === o.g.term && cur.el === o.el ? null : o))), []);

  // Close on Escape, on a tap elsewhere and when the page scrolls away.
  useEffect(() => {
    if (!open) return undefined;
    const y0 = window.scrollY;
    const key = (e) => {
      if (e.key === 'Escape') {
        setOpen(null);
        open.el?.focus?.();
      }
    };
    const down = (e) => {
      if (ref.current?.contains(e.target) || open.el?.contains(e.target)) return;
      setOpen(null);
    };
    const scroll = () => Math.abs(window.scrollY - y0) > 80 && setOpen(null);
    window.addEventListener('keydown', key);
    window.addEventListener('pointerdown', down, true);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', key);
      window.removeEventListener('pointerdown', down, true);
      window.removeEventListener('scroll', scroll);
    };
  }, [open]);

  // Sit just above the word (or below it if there is no room), inside the
  // window. On a phone the card is a sheet along the bottom instead (CSS).
  useLayoutEffect(() => {
    if (!open || !ref.current) return;
    const r = open.el?.isConnected ? open.el.getBoundingClientRect() : open.rect;
    const card = ref.current.getBoundingClientRect();
    const w = window.innerWidth;
    const left = Math.min(Math.max(12, r.left + r.width / 2 - card.width / 2), w - card.width - 12);
    const above = r.top - card.height - 10;
    const top = above > 12 ? above : r.bottom + 10;
    setPos({ left, top });
  }, [open]);

  if (!open) return null;
  const { g } = open;
  const from = g.lesson ? lessonById(g.lesson) : null;
  const here = from?.id === currentId;
  const earlier = from && currentId && isEarlier(from.id, currentId);
  return (
    <div
      ref={ref}
      className="gloss-card"
      role="dialog"
      aria-label={`Meaning of ${g.term}`}
      style={pos ? { left: pos.left, top: pos.top } : { visibility: 'hidden', left: 0, top: 0 }}
    >
      <div className="gloss-card-head">
        <strong>{g.term}</strong>
        <button type="button" className="lost-x" aria-label="Close" onClick={() => setOpen(null)}>
          ×
        </button>
      </div>
      <p>{g.def}</p>
      {from && (
        <p className="gloss-card-from">
          {here ? 'Taught in this class.' : earlier ? 'Taught earlier, in ' : 'Taught in '}
          {!here && <strong>{from.title}</strong>}
          {!here && '.'}
        </p>
      )}
      <div className="gloss-card-acts">
        {from && !here && (
          <button
            type="button"
            className="btn ghost sm"
            onClick={() => {
              setOpen(null);
              onDetour(from.id);
            }}
          >
            {earlier ? 'Go back to that class' : 'Open that class'}
          </button>
        )}
        <button
          type="button"
          className="btn ghost sm"
          onClick={() => {
            setOpen(null);
            onGlossary(g.term);
          }}
        >
          All words
        </button>
      </div>
    </div>
  );
}
