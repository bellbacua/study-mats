// Prints each class's history (era, people, hook, story, takeaway) in timetable order.
// Run: node scripts/dump-history.mjs > /tmp/history.txt
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { LESSONS } = await server.ssrLoadModule('/src/data/path.js');
await server.close();

for (const l of LESSONS) {
  const h = l.history;
  console.log(`=== ${l.id} | ${l.title}`);
  console.log(`ERA: ${h.era}\nWHO: ${h.protagonist}\nHOOK: ${h.hook}`);
  h.narrative.forEach((p) => console.log(`- ${p}`));
  console.log(`TAKEAWAY: ${h.takeaway}\n`);
}
