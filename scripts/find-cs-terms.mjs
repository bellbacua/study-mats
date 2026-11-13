// Lists programming / computer-science wording that a learner would actually
// see (everything except the hidden csBridge blocks).
// Run: node scripts/find-cs-terms.mjs
import { createServer } from 'vite';

const PATTERN =
  /\bCS\b|compiler|programmer|software|developer|debug|data structure|\barray|\bindex(ed)?\b|cache|github|terminal|syntax|runtime|\bstack\b|recursion|\bhash|coding|\bcode\b|python|javascript|\bCPU\b|primary key|bitmask|buffer|\bAPI\b|boolean|algorithm|nested loop|linked list|unary|\bbits?\b|\bbyte|\bRAM\b|IEEE|float64|lerp|barycentric|jupyter|logic gate|CS degree|CS grad/i;

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const { LESSONS, READINGS } = await server.ssrLoadModule('/src/data/path.js');
const { LABS } = await server.ssrLoadModule('/src/data/labs.js');
const { HELP } = await server.ssrLoadModule('/src/data/help/index.js');
await server.close();

const hits = [];
const walk = (where, v) => {
  if (typeof v === 'string') {
    if (PATTERN.test(v)) hits.push(`${where}: ${v.slice(0, 160)}`);
  } else if (Array.isArray(v)) v.forEach((x, i) => walk(`${where}[${i}]`, x));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k !== 'csBridge') walk(`${where}.${k}`, x);
};
LESSONS.forEach((l) => walk(l.id, l));
walk('readings', READINGS);
walk('labs', LABS);
// "I'm lost" help for Materials and Start here classes (CS classes may use CS words).
for (const [id, h] of Object.entries(HELP)) if (LESSONS.some((l) => l.id === id) || id.startsWith('start-')) walk(`help.${id}`, h);
console.log(hits.length ? hits.join('\n') : 'clean');
