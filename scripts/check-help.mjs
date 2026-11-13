// Checks the "I'm lost" help (src/data/help): every class exists, there is
// one entry per story paragraph and per animation step, each entry has a
// plainer version and a comparison, and each quick check has a question,
// the right answer and two wrong ones. Prints how far coverage has got in
// learner order. Run: node scripts/check-help.mjs
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { START_LESSONS, PROGRAM_LESSONS, ALL_LESSONS, lessonById } = await server.ssrLoadModule('/src/data/path.js');
const { HELP } = await server.ssrLoadModule('/src/data/help/index.js');
await server.close();

const bad = [];
const str = (x) => typeof x === 'string' && x.trim().length > 10;
for (const [id, h] of Object.entries(HELP)) {
  const l = lessonById(id);
  if (!l) {
    bad.push(`${id}: no such class`);
    continue;
  }
  const n = l.history.narrative.length;
  const m = l.guidedSteps.length;
  if ((h.p || []).length !== n) bad.push(`${id}: ${(h.p || []).length} story entries for ${n} paragraphs`);
  if ((h.s || []).length !== m) bad.push(`${id}: ${(h.s || []).length} step entries for ${m} steps`);
  (h.p || []).forEach((e, i) => {
    if (e === null) return;
    if (!str(e[0]) || !str(e[1])) bad.push(`${id} P${i}: needs a plainer version and a comparison`);
    const c = e[2];
    if (c && (c.length !== 4 || !c.every((x) => typeof x === 'string' && x.trim()) || new Set(c.slice(1)).size !== 3)) bad.push(`${id} P${i}: quick check needs [question, right, wrong, wrong]`);
  });
  (h.s || []).forEach((e, i) => {
    if (e !== null && (!str(e[0]) || !str(e[1]))) bad.push(`${id} S${i}: needs a plainer version and a comparison`);
  });
  if (/\[\d+\]/.test(JSON.stringify(h))) bad.push(`${id}: don't write [n] marks; the paragraph's own are added`);
}

const order = [...new Map([...START_LESSONS, ...PROGRAM_LESSONS.mate, ...PROGRAM_LESSONS.cs, ...ALL_LESSONS].map((l) => [l.id, l])).values()];
const firstGap = order.findIndex((l) => !HELP[l.id]);
const mate = PROGRAM_LESSONS.mate.filter((l) => HELP[l.id]).length;
console.log(bad.length ? bad.join('\n') : 'ok');
console.log(`${Object.keys(HELP).length} of ${order.length} classes have plainer versions (Start here ${START_LESSONS.filter((l) => HELP[l.id]).length}/${START_LESSONS.length}, Materials ${mate}/${PROGRAM_LESSONS.mate.length}). First class without: ${order[firstGap]?.id || 'none'}`);
process.exitCode = bad.length ? 1 : 0;
