import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
const P = await server.ssrLoadModule('/src/data/path.js');
await server.close();
console.log(P.PROGRAM_ID, P.LESSONS.length, P.ALL_LESSONS.length, P.CURRICULUM_TERMS.length, Object.fromEntries(Object.entries(P.PROGRAM_LESSONS).map(([k,v])=>[k,v.length])));
console.log(P.foundationsFor('comp-011', {}).map(l=>l.id).join(' '));
console.log(P.foundationsFor('mate-402', {}).length);
