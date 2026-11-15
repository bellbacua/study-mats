import { useMemo, useState } from 'react';
import { GLOSSARY } from '../data/glossary';
import { ALL_LESSONS as LESSONS, SUBJECTS, whereLabel } from '../data/path';
import { useReveal } from '../state/useReveal';

export default function GlossaryPage({ onOpen }) {
  const [q, setQ] = useState('');
  const byId = useMemo(() => Object.fromEntries(LESSONS.map((l) => [l.id, l])), []);
  // Some words are taught in more than one class (a "function" in maths and
  // in code). They share one card, with each class's meaning listed.
  const groups = useMemo(() => {
    const m = new Map();
    for (const g of GLOSSARY) {
      const k = g.term.toLowerCase();
      if (!m.has(k)) m.set(k, { term: g.term, senses: [] });
      m.get(k).senses.push(g);
    }
    return [...m.values()];
  }, []);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return groups
      .filter((x) => !s || x.term.toLowerCase().includes(s) || x.senses.some((g) => g.def.toLowerCase().includes(s) || g.match.some((m) => m.toLowerCase().includes(s))))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [q, groups]);
  useReveal([list.length]);

  const letters = [...new Set(list.map((g) => g.term[0].toUpperCase()))];

  return (
    <div className="glossary">
      <header className="timeline-head" data-reveal>
        <h1>Glossary</h1>
        <p>{groups.length} terms in plain English. In lessons, dotted-underlined words show these definitions when you hover or tap them.</p>
        <input className="search" type="search" placeholder="Search terms…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
      </header>
      {letters.map((L) => (
        <section key={L} className="gl-letter">
          <h2 data-reveal>{L}</h2>
          <div className="gl-grid">
            {list
              .filter((g) => g.term[0].toUpperCase() === L)
              .map((x) => {
                const link = (g) => {
                  const lesson = byId[g.lesson];
                  return (
                    lesson && (
                      <button type="button" className="tl-link-btn" onClick={() => onOpen(lesson.id)}>
                        {SUBJECTS[lesson.track]} · {whereLabel(lesson)} · {lesson.title.split(':')[0]} →
                      </button>
                    )
                  );
                };
                const [first, ...more] = x.senses;
                return (
                  <article key={x.term} className={`gl-card subj-${byId[first.lesson]?.track}`} data-reveal>
                    <h3>{x.term}</h3>
                    <p>{first.def}</p>
                    {link(first)}
                    {more.map((g, i) => (
                      <div key={i} className="gl-sense">
                        <p>{g.def}</p>
                        {link(g)}
                      </div>
                    ))}
                  </article>
                );
              })}
          </div>
        </section>
      ))}
      {!list.length && <p className="notes-hint">No terms match “{q}”.</p>}
    </div>
  );
}
