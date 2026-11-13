// Prints story paragraphs and animation steps of classes in learner order
// (Start here, then the Materials timetable, then the rest), for writing the
// "I'm lost" help in src/data/help. Classes that already have help are skipped.
// Run: node scripts/dump-help-input.mjs [from] [count]
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { START_LESSONS, PROGRAM_LESSONS, ALL_LESSONS } = await server.ssrLoadModule('/src/data/path.js');
const { HELP } = await server.ssrLoadModule('/src/data/help/index.js');
await server.close();

const order = [...new Map([...START_LESSONS, ...PROGRAM_LESSONS.mate, ...PROGRAM_LESSONS.cs, ...ALL_LESSONS].map((l) => [l.id, l])).values()];
const [from = 0, count = 5] = process.argv.slice(2).map(Number);
for (const l of order.filter((x) => !HELP[x.id]).slice(from, from + count)) {
  console.log(`=== ${l.id} | ${l.title}`);
  l.history.narrative.forEach((p, i) => console.log(`P${i}: ${p}`));
  l.guidedSteps.forEach((s, i) => console.log(`S${i}: ${s.title} :: ${s.formula} :: ${s.explanation}`));
  console.log();
}
