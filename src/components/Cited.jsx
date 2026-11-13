import Glossed from './Glossed';

// Text with [n] citation marks turned into small links to the class's Sources
// list. "[1]", "[1, 2]" and "[1][2]" all become one superscript group.
export default function Cited({ text, gloss = true }) {
  const bits = String(text).split(/((?:\s?\[\d+(?:,\s*\d+)*\])+)/);
  return bits.map((b, i) => {
    if (i % 2 === 0) return gloss ? <Glossed key={i} text={b} /> : b;
    const nums = [...b.matchAll(/\d+/g)].map((m) => m[0]);
    return (
      <sup key={i} className="cite">
        {nums.map((n, j) => (
          <a key={n + j} href={`#src-${n}`}>
            {j ? ',' : ''}
            {n}
          </a>
        ))}
      </sup>
    );
  });
}

// Every source a paragraph cites, as one mark, e.g. "[1, 3]". A plainer
// version of the paragraph restates all of it, so it carries all of them.
export function citesOf(text) {
  const nums = [...String(text).matchAll(/\[(\d+(?:,\s*\d+)*)\]/g)].flatMap((m) => m[1].split(/,\s*/).map(Number));
  const uniq = [...new Set(nums)].sort((a, b) => a - b);
  return uniq.length ? `[${uniq.join(', ')}]` : '';
}
