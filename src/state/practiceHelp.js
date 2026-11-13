// Help for practice problems, worked out from text that is already written and
// checked (the nudge, the worked solution, the worked examples), so nothing new
// can be wrong.
//
// The hint ladder for one problem:
//   1. Nudge             the problem's own hint
//   2. A solved one      the closest worked example from the same part
//   3. The first steps   typed answer: the worked solution with the result hidden
//                        options: half of the wrong options crossed out
//   4. The full answer   the worked solution
// A problem may carry its own written `steps` text (rung 3) to replace the
// automatic one.

// ---- numbers inside a sentence -------------------------------------------------
// "−110", "2,000", "8.3776", "53.5". A leading minus counts only after a
// space, "(", "=" or the start, so "29-18" is two numbers, 29 and 18.
const NUM = /[-−]?(?:\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?|\.\d+)/g;
const SUPERS = /[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/;

function numbersIn(text, withPowers = false) {
  const out = [];
  NUM.lastIndex = 0;
  let m;
  while ((m = NUM.exec(text))) {
    let start = m.index;
    let raw = m[0];
    const before = text[start - 1] || '';
    if (/[-−]/.test(raw[0]) && start > 0 && !/[\s(=≈:]/.test(before)) {
      raw = raw.slice(1);
      start += 1;
    }
    const end = start + raw.length;
    const prev = text[start - 1] || '';
    // A number written as a power (10¹⁵) or inside a word or symbol (H₂, 3d¹⁰, x2) is not a result.
    if ((!withPowers && SUPERS.test(text[end] || '')) || /[A-Za-z₀-₉_.]/.test(prev)) continue;
    out.push({ start, end, value: Number(raw.replace('−', '-').replace(/,/g, '')) });
  }
  return out;
}

const close = (v, a, tol) => Math.abs(v - a) <= Math.max(tol ?? 0, 0.012 * Math.abs(a), 0.0051);

// Rung 3 for a typed problem: the worked solution up to the result, with the
// result itself hidden. Null when the solution has no working to show.
export function firstSteps(item) {
  if (item.steps) return item.steps;
  if (typeof item.a !== 'number' || !item.solution) return null;
  const s = item.solution;
  const nums = numbersIn(s);
  const hits = nums.filter((n) => close(n.value, item.a, item.tol));
  if (!hits.length) return wordsBefore(item);
  const last = hits[hits.length - 1];
  // Keep the sentence that holds the result, drop anything after it.
  const rest = s.slice(last.end);
  const stop = rest.search(/[.;](\s|$)/);
  const tail = (stop < 0 ? rest : rest.slice(0, stop)).trimEnd();
  let head = s.slice(0, last.start);
  // Hide the result wherever else it is stated as a result before that point
  // ("= 6", "is 6"), but leave the same number alone where it is working.
  for (const h of hits.slice(0, -1).reverse()) if (/(=|≈|\bis|\bgives)\s*$/.test(s.slice(Math.max(0, h.start - 8), h.start))) head = head.slice(0, h.start) + '?' + head.slice(h.end);
  const shown = `${head}?${tail}`.replace(/\s+/g, ' ').trim();
  // There has to be some working before the gap: at least one other number.
  const working = numbersIn(head, true).length > 0;
  if (!working) return wordsBefore(item);
  // And it must not simply repeat the nudge.
  if (item.hint && shown.replace(/[^a-z0-9]/gi, '').startsWith(item.hint.replace(/[^a-z0-9]/gi, '')) && shown.length < item.hint.length + 6) return null;
  return /[.!?]$/.test(shown) ? shown : `${shown}.`;
}

// A solution written as reasons then a result ("Use the reciprocal of four.
// Answer: 0.25."): the reasons on their own.
function wordsBefore(item) {
  const parts = String(item.solution).split(/(?<=[.!?])\s+/);
  if (parts.length < 2) return null;
  const head = parts.slice(0, -1).join(' ');
  const flat = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (flat(head) === flat(item.hint)) return null;
  if (numbersIn(head).some((n) => close(n.value, item.a, item.tol))) return null;
  return head;
}

// Rung 3 for an options problem: which wrong options to cross out (indices in
// the shuffled list). Half of the wrong ones, at least one, the same every time.
export function crossedOut(mixed, seed) {
  const wrong = mixed.options.map((_, i) => i).filter((i) => i !== mixed.correctIndex);
  const n = Math.max(1, Math.floor(wrong.length / 2));
  let h = 0;
  for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return wrong.map((i) => [i, (h ^ (i * 2654435761)) >>> 0]).sort((a, b) => a[1] - b[1]).slice(0, n).map((x) => x[0]);
}

// Rung 2: the worked example in the same part that looks most like the problem.
const words = (t) =>
  new Set(
    String(t)
      .toLowerCase()
      .replace(/[^a-z\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );
export function nearestExample(part, item) {
  if (!part?.examples?.length) return null;
  const q = words(item.q);
  let best = 0;
  let score = -1;
  part.examples.forEach((e, i) => {
    const w = words(e.problem);
    let s = 0;
    for (const x of w) if (q.has(x)) s += 1;
    s /= Math.sqrt(w.size + 1);
    if (s > score) {
      best = i;
      score = s;
    }
  });
  return best;
}

// ---- how hard a problem is --------------------------------------------------
// An estimate from 1 (easier) to 3 (harder) inside its class: later parts and
// later problems in a part are harder, and so is longer working. A problem can
// set its own `level`.
const rawEffort = (item, partIndex, k) => {
  const ops = (String(item.solution).match(/[=×÷+−*/^√]|\bthen\b/g) || []).length;
  const sentences = String(item.solution).split(/(?<=[.!?])\s+/).length;
  return partIndex * 0.8 + k * 1.1 + Math.min(ops, 6) * 0.45 + (sentences - 1) * 0.6 + (item.options ? -0.3 : 0);
};
const levelCache = new Map();
export function levelsFor(lessonId, deep) {
  if (levelCache.has(lessonId)) return levelCache.get(lessonId);
  const all = [];
  deep.parts.forEach((p, pi) => p.practice.forEach((it, k) => all.push({ pi, k, e: rawEffort(it, pi, k), set: it.level })));
  const sorted = [...all].sort((a, b) => a.e - b.e);
  const out = {};
  sorted.forEach((x, rank) => {
    const lv = x.set || (rank < sorted.length / 3 ? 1 : rank < (2 * sorted.length) / 3 ? 2 : 3);
    out[`${x.pi}:${x.k}`] = lv;
  });
  levelCache.set(lessonId, out);
  return out;
}

// ---- worked examples that fade ---------------------------------------------------
// The number a worked example ends on, when its answer is one number with a
// unit or a short label ("−5 °C", "x = 6", "≈ 8.38 cm³"), so a learner can type
// the last step. Null when the answer is words or several numbers.
export function exampleValue(e, parse) {
  const ans = String(e.answer).trim();
  // Words for big numbers, pairs like (7, 3) and lists are not one typed number.
  if (/million|billion|thousand|trillion|\bto\b|\bor\b|\band\b|versus|[(,][^,]*,|,\s/i.test(ans) && !/^\d{1,3}(,\d{3})+$/.test(ans)) return null;
  const whole = parse(ans);
  if (typeof whole === 'number') return whole;
  const stripped = ans.replace(/^[A-Za-zα-ωΔ_′' ()]{1,12}\s*(=|≈)\s*/, '').replace(/^(about|≈|~)\s*/i, '');
  const nums = numbersIn(stripped);
  if (nums.length !== 1 || nums[0].start > 1) return null;
  const after = stripped.slice(nums[0].end).trim();
  // only a unit may follow: letters, °, %, ², ³, /, ·, spaces
  if (after && !/^[A-Za-zµΩ°%²³⁻¹/·.\s()]{1,24}$/.test(after)) return null;
  if (/^(x|and|or|to|times|per)\b/i.test(after)) return null;
  const v = parse(stripped.slice(0, nums[0].end));
  return typeof v === 'number' ? v : null;
}

export const LEVEL_NAME = { 1: 'Easier', 2: 'Middle', 3: 'Harder' };
