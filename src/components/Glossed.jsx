import { GLOSS_LOOKUP, GLOSS_RE } from '../data/glossary';
import { openGloss } from '../state/gloss';

// Underlines glossary terms in a piece of text; tap, click or press Enter on
// one to open its meaning in a small card (GlossCard). Only the first mention
// of each term in a block is marked, to keep it calm.
export default function Glossed({ text }) {
  if (typeof text !== 'string' || !text) return text ?? null;
  const out = [];
  const seen = new Set();
  let last = 0;
  for (const m of text.matchAll(GLOSS_RE)) {
    const g = GLOSS_LOOKUP.get(m[0].toLowerCase());
    if (!g || seen.has(g.term)) continue;
    seen.add(g.term);
    if (m.index > last) out.push(text.slice(last, m.index));
    const open = (e) => {
      // Words can sit inside answer buttons: open the card, not the answer.
      e.preventDefault();
      e.stopPropagation();
      openGloss(g, e.currentTarget);
    };
    out.push(
      <span
        key={m.index}
        className="gl"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={open}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open(e)}
      >
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
