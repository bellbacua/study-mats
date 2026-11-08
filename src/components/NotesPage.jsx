import { useMemo, useState } from 'react';
import { CURRICULUM_TERMS, ALL_LESSONS as LESSONS, SUBJECTS, TRACKS } from '../data/path';
import { renderNote } from '../notes/renderNote';
import { useReveal } from '../state/useReveal';

// Every class note in one place: search, read rendered, jump back to the class.
export default function NotesPage({ notes, onOpen }) {
  const [q, setQ] = useState('');
  const withNotes = useMemo(() => LESSONS.filter((l) => notes[l.id]?.trim()), [notes]);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return withNotes;
    return withNotes.filter((l) => notes[l.id].toLowerCase().includes(s) || l.title.toLowerCase().includes(s));
  }, [q, withNotes, notes]);
  useReveal([shown.length]);

  const words = withNotes.reduce((n, l) => n + notes[l.id].split(/\s+/).filter(Boolean).length, 0);

  return (
    <div className="notes-page">
      <header className="timeline-head" data-reveal>
        <h1>My notes</h1>
        <p>
          {withNotes.length} class{withNotes.length === 1 ? '' : 'es'} with notes · {words.toLocaleString()} words. Open a class and press Ctrl + . to
          write.
        </p>
        {withNotes.length > 0 && <input className="search" type="search" placeholder="Search your notes…" value={q} onChange={(e) => setQ(e.target.value)} />}
      </header>

      {!withNotes.length && (
        <div className="empty-state" data-reveal>
          <p>No notes yet. Open any class, click the “‹ Notes” tab on the edge of the screen, and start typing.</p>
        </div>
      )}

      {[...CURRICULUM_TERMS, ...TRACKS.map((t) => ({ id: `spec:${t.id}`, title: `${t.title} track` }))].map((term) => {
        const items = shown.filter((l) => (l.spec ? `spec:${l.spec}` : l.termId) === term.id);
        if (!items.length) return null;
        return (
          <section key={term.id} className="tl-era">
            <h2 className="section-title" data-reveal>
              {term.title}
            </h2>
            <div className="note-cards">
              {items.map((l) => (
                <article key={l.id} className={`note-card subj-${l.track}`} data-reveal>
                  <header>
                    <span className="eyebrow">
                      {l.spec ? 'Track' : l.day} · {SUBJECTS[l.track]} · {l.code}
                    </span>
                    <button type="button" className="tl-link-btn" onClick={() => onOpen(l.id)}>
                      Open class →
                    </button>
                  </header>
                  <h3>{l.title}</h3>
                  <div className="note-body np-preview" dangerouslySetInnerHTML={{ __html: renderNote(notes[l.id]) }} />
                </article>
              ))}
            </div>
          </section>
        );
      })}
      {withNotes.length > 0 && !shown.length && <p className="notes-hint">Nothing matches “{q}”.</p>}
    </div>
  );
}
