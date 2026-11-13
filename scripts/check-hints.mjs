// Checks the hint ladder of every "Learn it" practice problem.
// Run: node scripts/check-hints.mjs          (check; exit 1 on a problem)
//      node scripts/check-hints.mjs --todo   (also list problems whose ladder
//                                             has no "first steps" rung yet)
// - "First steps" (written `steps`, or worked out from the solution) must not
//   state the answer: no "= answer", "≈ answer" or "is answer".
// - A written `steps` must hide the result with "?" or stop before it.
// - Every faded example that can be typed must have a value its last step shows.
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { ALL_LESSONS } = await server.ssrLoadModule('/src/data/path.js');
const { DEEP } = await server.ssrLoadModule('/src/data/deep/index.js');
const { parseAnswer } = await server.ssrLoadModule('/src/components/LearnIt.jsx');
const H = await server.ssrLoadModule('/src/state/practiceHelp.js');
const { HINT_STEPS } = await server.ssrLoadModule('/src/data/deep/hintSteps.js');
await server.close();

const todo = process.argv.includes('--todo');
const errs = [];
const missing = [];
let typed = 0;
let withSteps = 0;
let written = 0;
let choice = 0;

const order = [...new Set([...ALL_LESSONS.map((l) => l.id), ...Object.keys(DEEP)])].filter((id) => DEEP[id]);
const near = (v, a, tol) => Math.abs(v - a) <= Math.max(tol ?? 0, 0.012 * Math.abs(a), 0.0051);

for (const id of order) {
  DEEP[id].parts.forEach((p, pi) =>
    p.practice.forEach((it, k) => {
      const where = `${id} part ${pi + 1} problem ${k + 1}`;
      if (it.options) {
        choice += 1;
        if (it.steps) errs.push(`${where}: options problems cross out wrong options; "steps" is not used`);
        return;
      }
      typed += 1;
      if (it.steps) written += 1;
      const f = H.firstSteps(it);
      if (!f) {
        missing.push(`${where}: ${it.q}  [a = ${it.a}]  hint: ${it.hint}  solution: ${it.solution}`);
        return;
      }
      withSteps += 1;
      if (typeof it.a === 'number') {
        const re = /(=|≈|\bis|\bgives)\s*([-−]?\d[\d,]*(?:\.\d+)?)/g;
        let m;
        while ((m = re.exec(f))) {
          // a base with a power (= 5²) is working, not the answer
          // and so is a number that is part of a term (2π, 6x, −2x⁻³)
          if (/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻a-zA-Zπ√]/.test(f[m.index + m[0].length] || '')) continue;
          const v = Number(m[2].replace('−', '-').replace(/,/g, ''));
          if (near(v, it.a, it.tol)) errs.push(`${where}: first steps give the answer away: "${f}"`);
        }
      }
      if (it.steps && it.steps.trim() === String(it.hint).trim()) errs.push(`${where}: written steps repeat the nudge`);
    })
  );
}

// Every written first step must point at a real problem, hide its result with
// "?", and its check sum must land on the answer.
for (const [key, [steps, check]] of Object.entries(HINT_STEPS)) {
  const [id, part, k] = key.split(':');
  const it = DEEP[id]?.parts?.[Number(part)]?.practice?.[Number(k)];
  if (!it) {
    errs.push(`hintSteps ${key}: no such problem`);
    continue;
  }
  if (!steps.includes('?')) errs.push(`hintSteps ${key}: no "?" where the result goes`);
  const v = Function(`"use strict"; return (${check});`)();
  const tol = Math.max(it.tol ?? 0, 0.005 * Math.abs(it.a), 1e-9);
  if (!(Math.abs(v - it.a) <= tol)) errs.push(`hintSteps ${key}: check gives ${v}, answer is ${it.a}`);
}

let faded = 0;
for (const id of order)
  DEEP[id].parts.forEach((p, pi) =>
    p.examples.slice(1).forEach((e) => {
      const v = H.exampleValue(e, parseAnswer);
      if (v === null) return;
      faded += 1;
      if (!Number.isFinite(v)) errs.push(`${id} part ${pi + 1}: faded example value is not a number (${e.answer})`);
    })
  );

console.log(`${typed} typed problems: ${withSteps} have a "first steps" rung (${written} written by hand), ${missing.length} go nudge → solved example → answer.`);
console.log(`${choice} options problems cross out wrong options. ${faded} faded examples take a typed last step.`);
if (todo) for (const m of missing) console.log(`TODO ${m}`);
if (errs.length) {
  for (const e of errs) console.log(`✗ ${e}`);
  process.exit(1);
}
console.log('✓ hint ladder checks pass');
