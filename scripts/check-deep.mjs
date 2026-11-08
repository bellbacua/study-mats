// Checks every class that has been split into parts (src/data/deep).
// Run: node scripts/check-deep.mjs            (all)
//      node scripts/check-deep.mjs mate-110   (some classes)
// Exit code 1 if anything is wrong.
import { createServer } from 'vite';
import katex from 'katex';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { LESSONS } = await server.ssrLoadModule('/src/data/path.js');
const { DEEP } = await server.ssrLoadModule('/src/data/deep/index.js');
const { isRight } = await server.ssrLoadModule('/src/components/LearnIt.jsx');
await server.close();

const CS =
  /\bCS\b|compiler|programmer|software|developer|debug|data structure|\barray|\bindex(ed)?\b|cache|github|terminal|syntax|runtime|\bstack\b|recursion|\bhash|coding|\bcode\b|python|javascript|\bCPU\b|primary key|bitmask|buffer|\bAPI\b|boolean|algorithm|nested loop|linked list|unary|\bbits?\b|\bbyte|\bRAM\b|IEEE|float64|lerp|jupyter|logic gate/i;

const only = process.argv.slice(2);
const ids = new Set(LESSONS.map((l) => l.id));
const errs = [];
const bad = (id, msg) => errs.push(`${id}: ${msg}`);
const tex = (id, where, t) => {
  if (!t) return;
  try {
    katex.renderToString(t, { throwOnError: true });
  } catch (e) {
    bad(id, `${where} formula does not render: ${e.message.slice(0, 80)}`);
  }
};
const words = (id, where, v) => {
  if (typeof v === 'string') {
    if (CS.test(v)) bad(id, `${where} uses programming wording: "${v.slice(0, 80)}"`);
    if (/claude/i.test(v)) bad(id, `${where} names the assistant`);
  } else if (Array.isArray(v)) v.forEach((x, i) => words(id, `${where}[${i}]`, x));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) words(id, `${where}.${k}`, x);
};

let parts = 0;
let problems = 0;
for (const [id, d] of Object.entries(DEEP)) {
  if (only.length && !only.includes(id)) continue;
  if (!ids.has(id)) bad(id, 'no class with this id');
  const p = d.predict;
  if (!p || !p.q || !Array.isArray(p.options) || p.options.length < 3 || !(p.answer >= 0 && p.answer < p.options.length) || !p.reveal)
    bad(id, 'predict needs q, 3-4 options, answer index and reveal');
  if (!Array.isArray(d.parts) || d.parts.length < 3 || d.parts.length > 5) bad(id, 'needs 3 to 5 parts');
  (d.parts || []).forEach((pt, n) => {
    parts++;
    const w = `part ${n + 1}`;
    if (!pt.title || !(pt.minutes > 0)) bad(id, `${w} needs title and minutes`);
    if (!Array.isArray(pt.explain) || pt.explain.length < 2) bad(id, `${w} needs at least 2 explain paragraphs`);
    if (!Array.isArray(pt.formulas) || pt.formulas.length < 1) bad(id, `${w} needs at least 1 formula`);
    (pt.formulas || []).forEach(([label, t], k) => (label ? tex(id, `${w} formula ${k + 1}`, t) : bad(id, `${w} formula ${k + 1} needs a label`)));
    if (!Array.isArray(pt.examples) || pt.examples.length < 2) bad(id, `${w} needs at least 2 worked examples`);
    (pt.examples || []).forEach((e, k) => {
      if (!e.problem || !Array.isArray(e.steps) || e.steps.length < 2 || !e.answer) bad(id, `${w} example ${k + 1} needs problem, 2+ steps, answer`);
      (e.steps || []).forEach(([text, t], j) => (text ? tex(id, `${w} example ${k + 1} step ${j + 1}`, t) : bad(id, `${w} example ${k + 1} step ${j + 1} has no text`)));
    });
    if (!Array.isArray(pt.practice) || pt.practice.length < 4) bad(id, `${w} needs at least 4 practice problems`);
    (pt.practice || []).forEach((q, k) => {
      problems++;
      if (!q.q || !q.hint || !q.solution) bad(id, `${w} problem ${k + 1} needs q, hint, solution`);
      if (!(typeof q.a === 'number' && Number.isFinite(q.a)) && !['inf', '-inf', 'dne'].includes(q.a)) bad(id, `${w} problem ${k + 1}: a must be a number or inf/-inf/dne`);
      else if (!isRight(q, typeof q.a === 'number' ? String(q.a) : q.a)) bad(id, `${w} problem ${k + 1}: its own answer is not accepted`);
    });
  });
  words(id, 'content', d);
}
console.log(`${Object.keys(DEEP).length} classes, ${parts} parts, ${problems} problems checked`);
if (errs.length) {
  console.log(errs.join('\n'));
  process.exit(1);
}
console.log('all good');
