import { useEffect, useMemo } from 'react';
import { CURRICULUM_TERMS, LESSONS, SUBJECTS } from '../data/path';
import { GLOSSARY } from '../data/glossary';
import { renderNote } from '../notes/renderNote';
import MathFormula from './MathFormula';

// A clean, printable summary of one week. "Save as PDF" in the print dialog.
export default function StudyGuide({ week, notes, onClose }) {
  const term = CURRICULUM_TERMS[week - 1];
  const lessons = LESSONS.filter((l) => l.termId === `week-${week}`);
  const terms = useMemo(() => GLOSSARY.filter((g) => lessons.some((l) => l.id === g.lesson)), [lessons]);

  useEffect(() => {
    document.documentElement.classList.add('printing');
    const t = setTimeout(() => window.print(), 600);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove('printing');
    };
  }, [week]);

  return (
    <div className="guide">
      <div className="guide-bar no-print">
        <button type="button" className="btn ghost sm" onClick={onClose}>
          ← Back
        </button>
        <button type="button" className="btn primary sm" onClick={() => window.print()}>
          Print / save as PDF
        </button>
      </div>
      <header>
        <p className="guide-kicker">Study Mats · study guide</p>
        <h1>{term.title}</h1>
        <p>{term.subtitle}</p>
      </header>
      {lessons.map((l) => (
        <section key={l.id} className="guide-lesson">
          <p className="guide-kicker">
            {l.day} · {SUBJECTS[l.track]} · {l.code}
          </p>
          <h2>{l.title}</h2>
          <p className="guide-era">
            {l.history.era} — {l.history.protagonist}
          </p>
          <h3>The short version</h3>
          <ul>
            {l.overtimeDigest.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <h3>Key formulas</h3>
          {l.guidedSteps.map((s, i) => (
            <div key={i} className="guide-formula">
              <strong>{s.title.replace(/^\d+\.\s*/, '')}</strong>
              <MathFormula tex={s.formula} />
            </div>
          ))}
          <h3>Why it matters</h3>
          <p>{l.history.takeaway}</p>
          {notes[l.id]?.trim() && (
            <>
              <h3>My notes</h3>
              <div className="guide-notes" dangerouslySetInnerHTML={{ __html: renderNote(notes[l.id]) }} />
            </>
          )}
        </section>
      ))}
      {terms.length > 0 && (
        <section className="guide-lesson">
          <h2>Words to know</h2>
          <dl className="guide-terms">
            {terms.map((g) => (
              <div key={g.term}>
                <dt>{g.term}</dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
