import { GLOSSARY } from '../data/glossary';

// Rule-based feedback on a class's notes. Runs in the browser, no AI: it
// compares your note with the lesson to spot copying, gaps and loose ends.

const words = (t) =>
  t
    .toLowerCase()
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);

const shingles = (ws, n = 5) => {
  const out = new Set();
  for (let i = 0; i + n <= ws.length; i++) out.add(ws.slice(i, i + n).join(' '));
  return out;
};

export function checkNotes(note, lesson) {
  const text = note || '';
  const out = [];
  const ok = (title, detail) => out.push({ level: 'ok', title, detail });
  const tip = (title, detail) => out.push({ level: 'tip', title, detail });
  const warn = (title, detail) => out.push({ level: 'warn', title, detail });

  const nw = words(text);
  if (nw.length < 15) {
    warn('Just getting started', 'Your note is very short. Try “Start my notes” in the How to take notes pane for an outline to fill in.');
    return out;
  }

  // 1. Own words vs copied: share of 5-word runs that appear in the lesson
  const h = lesson.history;
  const source = [h.hook, ...h.narrative, h.takeaway, ...lesson.overtimeDigest, ...lesson.guidedSteps.map((s) => s.explanation)].join(' ');
  const src = shingles(words(source));
  const mine = [...shingles(nw)];
  const copied = mine.length ? mine.filter((s) => src.has(s)).length / mine.length : 0;
  if (copied > 0.45)
    warn(
      `About ${Math.round(copied * 100)}% is copied word-for-word`,
      'Copying feels productive but barely helps memory. Read a paragraph, look away, then write the idea in your own words, shorter.'
    );
  else if (copied > 0.2) tip(`About ${Math.round(copied * 100)}% matches the lesson text`, 'Good mix. Try rephrasing the longest copied sentences in fewer words.');
  else ok('Written in your own words', 'Rephrasing is exactly what makes notes stick.');

  // 2. Balance between story and concepts
  const storyWords = shingles(words(h.narrative.join(' ')));
  const conceptWords = shingles(words([...lesson.overtimeDigest, ...lesson.guidedSteps.map((s) => s.explanation)].join(' ')));
  const story = mine.filter((s) => storyWords.has(s)).length;
  const concept = mine.filter((s) => conceptWords.has(s)).length;
  if (story > 3 * Math.max(1, concept) && !/\$[^$]+\$/.test(text))
    tip('Mostly history', 'The story is the “good to know” part. Make sure the ⭐ Must know points (short version and formulas) are in here too: they’re what quizzes test.');

  // 3. Key terms covered
  const lower = text.toLowerCase();
  const terms = GLOSSARY.filter((g) => g.lesson === lesson.id);
  const missing = terms.filter((g) => ![g.term, ...g.match].some((w) => lower.includes(w.toLowerCase())));
  if (terms.length && missing.length === 0) ok('All key terms covered', terms.map((g) => g.term).join(', '));
  else if (missing.length) tip(`Key terms not mentioned yet: ${missing.slice(0, 5).map((g) => g.term).join(', ')}`, 'Define each one in a few words. Hover the dotted words in the lesson for a reminder.');

  // 4. Formulas
  const hasMath = /\$[^$]+\$/.test(text);
  const needsMath = lesson.guidedSteps.some((s) => /[=<>^\\]/.test(s.formula));
  if (needsMath && !hasMath) tip('No formulas yet', 'Add the key formula with $ … $ and write what each symbol means. 📌 next to each step does this for you.');
  else if (hasMath) ok('Formulas included', 'Make sure each symbol is explained, not just the formula.');

  // 5. Questions & summary
  if (!/\?/.test(text)) tip('No questions', 'Turn one fact into a question (e.g. “Why does … ?”). Covering the answer later is the best way to revise.');
  if (!/(big idea|in my own words|summary|explain|tl;dr|in short)/i.test(text))
    tip('No summary', 'End with 2–3 sentences explaining the whole class to a friend, without looking.');

  // 6. Loose ends
  const dangling = (text.match(/\$/g) || []).length % 2 === 1 || /\$\s*\$/.test(text);
  const emptyBullets = (text.match(/^\s*[-*]\s*$/gm) || []).length;
  if (dangling) warn('Unfinished maths', 'There is a $ without a matching $ (or an empty $ $). Finish or delete it.');
  if (emptyBullets) tip(`${emptyBullets} empty bullet${emptyBullets > 1 ? 's' : ''}`, 'Fill them in or delete them.');

  // 7. Structure
  if (!/^#{1,3}\s/m.test(text) && nw.length > 120) tip('Add headings', 'Long notes are easier to review with a few # headings (Big idea, Terms, Formulas, Story).');

  return out;
}
