import { ALL_LESSONS } from '../data/path';
import { PEOPLE } from '../data/library/people';
import { DISCOVERIES } from '../data/library/discoveries';
import { MATERIALS } from '../data/library/materials';

// The Library "collection": people, discoveries and materials unlock when you
// finish a class they belong to. Nothing new is saved: it is worked out from
// the classes you have passed, so it is the same on every device.

const lessonText = Object.fromEntries(
  ALL_LESSONS.map((l) => [l.id, [l.title, l.subtitle, l.history?.protagonist, l.history?.era, ...(l.history?.narrative || [])].join(' ')]),
);

// Same matching rule as the Who's who shelf: the person's `find` word in a class story.
const personClasses = (p) => {
  const re = new RegExp(`(^|[^\\p{L}])(${p.find})`, 'u');
  return Object.keys(lessonText).filter((id) => re.test(lessonText[id]));
};

export const KINDS = [
  { id: 'people', label: 'People', one: 'person', icon: '👤', shelf: 'people' },
  { id: 'discoveries', label: 'Discoveries', one: 'discovery', icon: '💡', shelf: 'discoveries' },
  { id: 'materials', label: 'Materials', one: 'material', icon: '🧱', shelf: 'materials' },
];

// Every collectable item, with the classes that unlock it. Items that no class
// mentions yet are left out of the album.
export const COLLECTABLES = [
  ...PEOPLE.map((p) => ({ kind: 'people', key: `p:${p.name}`, name: p.name, sub: p.what, year: p.born, wiki: p.wiki, classes: personClasses(p) })),
  ...DISCOVERIES.map((d) => ({ kind: 'discoveries', key: `d:${d.title}`, name: d.title, sub: d.who, year: d.year, wiki: d.wiki, luck: d.luck, classes: d.classes })),
  ...MATERIALS.map((m) => ({ kind: 'materials', key: `m:${m.id}`, name: m.name, sub: m.note, wiki: m.wiki, fam: m.fam, classes: m.classes || [] })),
].filter((x) => x.classes.length > 0);

const BY_LESSON = {};
for (const x of COLLECTABLES) for (const id of new Set(x.classes)) (BY_LESSON[id] ||= []).push(x);

export const isCollected = (x, passed) => x.classes.some((id) => passed[id]);

// The items a class unlocks that you did not already have from an earlier class.
export function newFromLesson(lessonId, passed) {
  return (BY_LESSON[lessonId] || []).filter((x) => !x.classes.some((id) => id !== lessonId && passed[id]));
}

export function collectionStats(passed) {
  const out = {};
  for (const k of KINDS) {
    const all = COLLECTABLES.filter((x) => x.kind === k.id);
    out[k.id] = { have: all.filter((x) => isCollected(x, passed)).length, total: all.length };
  }
  const have = Object.values(out).reduce((a, s) => a + s.have, 0);
  return { ...out, have, total: COLLECTABLES.length };
}

// The first class (in the order given) that would unlock an item.
export function firstClassFor(x, order) {
  return order.find((l) => x.classes.includes(l.id)) || null;
}
