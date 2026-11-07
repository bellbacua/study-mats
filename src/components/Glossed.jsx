import { GLOSS_LOOKUP, GLOSS_RE } from '../data/glossary';

// Underlines glossary terms in a piece of text; hover or tap to see the meaning.
// Only the first mention of each term in a block is marked, to keep it calm.
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
    out.push(
      <span key={m.index} className="gl" tabIndex={0}>
        {m[0]}
        <span className="gl-pop" role="tooltip">
          <strong>{g.term}</strong>
          {g.def}
        </span>
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
