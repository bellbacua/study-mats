// Checks the idea map's links between subjects (src/data/ideaLinks.js): every
// class exists, and each link points to a class that comes earlier on every
// program timetable that has both.
// Run: node scripts/check-idea-links.mjs
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { PROGRAM_LESSONS, lessonById } = await server.ssrLoadModule('/src/data/path.js');
const { IDEA_LINKS } = await server.ssrLoadModule('/src/data/ideaLinks.js');
await server.close();

const bad = [];
for (const [id, needs] of Object.entries(IDEA_LINKS)) {
  if (!lessonById(id)) bad.push(`${id}: no such class`);
  for (const n of needs) {
    if (!lessonById(n)) bad.push(`${id} → ${n}: no such class`);
    for (const [p, list] of Object.entries(PROGRAM_LESSONS)) {
      const a = list.findIndex((l) => l.id === id);
      const b = list.findIndex((l) => l.id === n);
      if (a >= 0 && b >= 0 && b >= a) bad.push(`${id} → ${n}: not earlier on the ${p} timetable`);
    }
  }
}
console.log(bad.length ? bad.join('\n') : `ok (${Object.values(IDEA_LINKS).flat().length} links)`);
process.exitCode = bad.length ? 1 : 0;
