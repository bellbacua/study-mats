import { useMemo, useState } from 'react';
import { GLOSSARY } from '../data/glossary';
import { ALL_LESSONS as LESSONS, SUBJECTS, whereLabel } from '../data/path';
import { useReveal } from '../state/useReveal';

export default function GlossaryPage({ onOpen }) {
  const [q, setQ] = useState('');
  const byId = useMemo(() => Object.fromEntries(LESSONS.map((l) => [l.id, l])), []);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return [...GLOSSARY]
      .filter((g) => !s || g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s) || g.match.some((m) => m.toLowerCase().includes(s)))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [q]);
  useReveal([list.length]);

  const letters = [...new Set(list.map((g) => g.term[0].toUpperCase()))];

  return (
    <div className="glossary">
      <header className="timeline-head" data-reveal>
        <h1>Glossary</h1>
        <p>{GLOSSARY.length} terms in plain English. In lessons, dotted-underlined words show these definitions when you hover or tap them.</p>
        <input className="search" type="search" placeholder="Search terms…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
      </header>
      {letters.map((L) => (
        <section key={L} className="gl-letter">
          <h2 data-reveal>{L}</h2>
          <div className="gl-grid">
            {list
              .filter((g) => g.term[0].toUpperCase() === L)
              .map((g) => {
                const lesson = byId[g.lesson];
                return (
                  <article key={g.term} className={`gl-card subj-${lesson?.track}`} data-reveal>
                    <h3>{g.term}</h3>
                    <p>{g.def}</p>
                    {lesson && (
                      <button type="button" className="tl-link-btn" onClick={() => onOpen(lesson.id)}>
                        {SUBJECTS[lesson.track]} · {whereLabel(lesson)} · {lesson.title.split(':')[0]} →
                      </button>
                    )}
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
