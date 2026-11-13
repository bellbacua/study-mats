import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_LESSONS, SUBJECTS, PROGRAM_DATA, weekNumber } from '../data/path';
import { GLOSSARY } from '../data/glossary';
import { PEOPLE } from '../data/library/people';
import { MATERIALS } from '../data/library/materials';
import { DISCOVERIES } from '../data/library/discoveries';
import { ESTIMATES } from '../data/library/estimates';

// One search box over everything: classes, glossary words, people, materials,
// discoveries and the app's pages. Opens with Ctrl+K (⌘K on a Mac) or "/".

const fold = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
const yearLabel = (y) => (y == null ? '' : y < 0 ? `${-y} BC` : String(y));

const GROUPS = [
  { id: 'page', label: 'Go to' },
  { id: 'class', label: 'Classes' },
  { id: 'word', label: 'Glossary' },
  { id: 'person', label: 'People' },
  { id: 'material', label: 'Materials' },
  { id: 'discovery', label: 'Discoveries' },
  { id: 'game', label: 'Library games' },
];

function buildIndex(pages) {
  const byId = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));
  const out = [];
  for (const p of pages) out.push({ group: 'page', id: `page:${p.id}`, title: p.label, sub: p.hint, icon: p.icon || '→', act: { go: p.id }, extra: p.words || '' });
  for (const l of ALL_LESSONS) {
    const where = l.from ? `From ${PROGRAM_DATA[l.from]?.short || l.from}` : l.spec ? 'Track class' : l.side ? 'GE class' : `Week ${weekNumber(l)} · ${l.day}`;
    out.push({
      group: 'class',
      id: `class:${l.id}`,
      title: l.title,
      sub: `${l.code} · ${SUBJECTS[l.track] || l.track} · ${where}`,
      icon: '◆',
      track: l.track,
      lesson: l.id,
      act: { open: l.id },
      extra: [l.subtitle, l.history?.protagonist, l.history?.hook].join(' '),
    });
  }
  for (const g of GLOSSARY) {
    const l = byId[g.lesson];
    out.push({
      group: 'word',
      id: `word:${g.term}`,
      title: g.term,
      sub: g.def,
      icon: 'Aa',
      note: l ? `Introduced in ${l.code} · ${l.title}` : '',
      act: l ? { open: l.id } : { go: 'glossary' },
      extra: g.match.join(' '),
    });
  }
  for (const p of PEOPLE)
    out.push({ group: 'person', id: `person:${p.name}`, title: p.name, sub: `${yearLabel(p.born)}–${p.died == null ? 'living' : yearLabel(p.died)} · ${p.what}`, icon: '👤', act: { shelf: 'people', q: p.name }, extra: '' });
  for (const m of MATERIALS) out.push({ group: 'material', id: `material:${m.id}`, title: m.name, sub: m.note, icon: '🧱', act: { shelf: 'materials', q: m.name }, extra: '' });
  for (const d of DISCOVERIES)
    out.push({ group: 'discovery', id: `disc:${d.title}`, title: d.title, sub: `${yearLabel(d.year)} · ${d.who}`, icon: '💡', act: { shelf: 'discoveries', q: d.title }, extra: d.how });
  const GAMES = [
    { shelf: 'spot', title: 'Spot the microstructure', sub: 'Picture game: name real microscope photos', icon: '🧩', extra: 'game quiz micrograph microscope microstructure pearlite martensite grains' },
    { shelf: 'estimate', title: 'Estimate it', sub: 'Guess how big, how heavy, how many', icon: '📏', extra: 'game quiz estimate guess fermi order of magnitude powers of ten' },
    { shelf: 'briefs', title: 'Design challenges', sub: 'Pick the right material for a real job', icon: '🎯', extra: 'game quiz material selection' },
    { shelf: 'detective', title: 'Failure detective', sub: 'Name the cause of a real accident from clues', icon: '🕵️', extra: 'game quiz failure accident' },
  ];
  for (const g of GAMES) out.push({ group: 'game', id: `game:${g.shelf}`, title: g.title, sub: g.sub, icon: g.icon, act: { shelf: g.shelf }, extra: g.extra });
  for (const x of ESTIMATES) out.push({ group: 'game', id: `est:${x.id}`, title: x.q, sub: `Estimate it · answer in ${x.unit}`, icon: '📏', act: { shelf: 'estimate', q: x.q }, extra: x.fact });
  for (const e of out) {
    e.ft = fold(e.title);
    e.fx = fold(`${e.sub} ${e.extra}`);
  }
  return out;
}

const BIAS = { page: 6, class: 5, person: 4, game: 3, discovery: 2, word: 0, material: 0 };

function score(e, q, words) {
  if (!words.every((w) => e.ft.includes(w) || e.fx.includes(w))) return 0;
  let s = 0;
  if (e.ft === q) s = 120;
  else if (e.ft.startsWith(q)) s = 100;
  else if (new RegExp(`(^|[^a-z0-9])${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(e.ft)) s = 80;
  else if (e.ft.includes(q)) s = 60;
  else if (words.every((w) => e.ft.includes(w))) s = 45;
  else s = 12;
  // On a tie, classes and people come before glossary words and materials.
  return s + (BIAS[e.group] || 0) - e.ft.length / 400;
}

// Highlight the part of a title that matches.
function Mark({ text, q }) {
  const i = q ? fold(text).indexOf(q) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function SearchPalette({ open, onClose, pages, passed, onAct, suggestions = [] }) {
  const index = useMemo(() => buildIndex(pages), [pages]);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef(null);
  const list = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSel(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  const q = fold(query.trim());
  const results = useMemo(() => {
    if (!q) return suggestions.map((s) => ({ ...s, ft: '', fx: '' }));
    const words = q.split(/\s+/).filter(Boolean);
    const scored = index.map((e) => [score(e, q, words), e]).filter(([s]) => s > 0);
    scored.sort((a, b) => b[0] - a[0]);
    // Matches in a name come first, grouped and ordered by their best match.
    // Matches only in the text underneath follow in one short list.
    const per = {};
    const kept = [];
    const weak = [];
    for (const [s, e] of scored) {
      if (s < 40) {
        if (weak.length < 6) weak.push({ ...e, head: 'Also mentioned in', group: `more:${e.group}`, more: true });
        continue;
      }
      per[e.group] = (per[e.group] || 0) + 1;
      if (per[e.group] <= (e.group === 'class' ? 7 : 5)) kept.push([s, e]);
    }
    const best = {};
    for (const [s, e] of kept) best[e.group] = Math.max(best[e.group] ?? -1, s);
    const order = GROUPS.map((g) => g.id).filter((g) => g in best).sort((a, b) => best[b] - best[a]);
    return [...order.flatMap((g) => kept.filter(([, e]) => e.group === g).map(([, e]) => e)), ...weak];
  }, [q, index, suggestions]);

  useEffect(() => setSel(0), [q]);
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  if (!open) return null;

  const pick = (e) => {
    if (!e) return;
    onClose();
    onAct(e.act);
  };
  const onKey = (ev) => {
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      setSel((s) => Math.min(results.length - 1, s + 1));
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      pick(results[sel]);
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      onClose();
    }
  };

  let lastGroup = null;
  return (
    <div className="palette-backdrop" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search everything">
        <div className="palette-input">
          <svg className="palette-glass" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search classes, words, people, materials…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[sel] ? `pal-${sel}` : undefined}
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="palette-list" id="palette-list" role="listbox" ref={list}>
          {results.length === 0 && (
            <div className="palette-empty">
              <strong>Nothing found for “{query.trim()}”.</strong>
              <span>Try a shorter word, a person’s surname, or a material like “steel”.</span>
            </div>
          )}
          {results.map((e, i) => {
            const gk = e.more ? 'more' : e.group;
            const head = gk !== lastGroup ? (q && !e.more ? GROUPS.find((g) => g.id === e.group)?.label : e.head) : null;
            lastGroup = gk;
            return (
              <div key={e.id}>
                {head && <div className="palette-group">{head}</div>}
                <button
                  type="button"
                  id={`pal-${i}`}
                  role="option"
                  aria-selected={i === sel}
                  className={`palette-item ${e.track ? `subj-${e.track}` : ''}`}
                  onMouseMove={() => sel !== i && setSel(i)}
                  onClick={() => pick(e)}
                >
                  <span className={`palette-icon kind-${e.group}`} aria-hidden="true">
                    {e.icon}
                  </span>
                  <span className="palette-text">
                    <strong>
                      <Mark text={e.title} q={q} />
                      {e.lesson && passed[e.lesson] && <span className="palette-done"> ✓</span>}
                    </strong>
                    <span className="palette-sub">{e.sub}</span>
                    {e.note && <span className="palette-note">{e.note}</span>}
                  </span>
                  <span className="palette-enter" aria-hidden="true">
                    ↵
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <div className="palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span className="palette-count">{q ? `${results.length} result${results.length === 1 ? '' : 's'}` : `${index.length.toLocaleString()} things to search`}</span>
        </div>
      </div>
    </div>
  );
}
