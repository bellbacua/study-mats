import { useState } from 'react';
import { PROGRAMS, PROGRAM_ID, SIDES, SIDES_LATER, trackLessons, trackClassState, pickedSides, sideByWeek } from '../data/path';
import BorrowPanel from './BorrowPanel';
import { useReveal } from '../state/useReveal';
import SpecializationsPage from './SpecializationsPage';

// Your program: the main degree, its specialization tracks, and side topics
// (short courses outside the field that sit in your timetable like GE classes).
export default function ProgramPage({ progress, onOpen, onToggle, onToggleKey, onSwitch, startWeek }) {
  const [switching, setSwitching] = useState(null);
  const sides = pickedSides(progress.readings);
  const program = PROGRAMS.find((p) => p.id === PROGRAM_ID);
  const plan = sideByWeek(progress.readings);
  const weekOfClass = Object.fromEntries(Object.entries(plan).flatMap(([w, ls]) => ls.map((l) => [l.id, w.replace('week-', '')])));
  useReveal([sides.length]);

  return (
    <div className="spec-page program-page">
      <header className="timeline-head" data-reveal>
        <h1>Your program</h1>
        <p>Your main degree, the branch you specialise in, and side topics from other fields that sit in your timetable like GE classes.</p>
      </header>

      <section data-reveal>
        <div className="prog-section-head">
          <h2>Main program</h2>
        </div>
        <div className="prog-programs">
          {PROGRAMS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`prog-program ${p.id === program.id ? 'on' : ''} ${p.ready ? '' : 'later'}`}
              disabled={!p.ready || p.id === program.id}
              onClick={() => setSwitching(p)}
            >
              <strong>{p.title}</strong>
              {p.school && <span className="eyebrow">{p.school}</span>}
              <span className="notes-hint">{p.blurb}</span>
              <span className="prog-tag">{p.id === program.id ? 'Your program' : p.ready ? 'Switch to this' : 'Coming later'}</span>
            </button>
          ))}
        </div>
        {switching && (
          <div className="borrow-ask">
            <strong>Make {switching.title} your main program?</strong>
            <p className="notes-hint">
              Nothing is lost: every class you passed stays passed, and classes both programs share (most of the math) count in both. You can switch back
              any time. The app reloads to rebuild your timetable.
            </p>
            <div className="spec-actions">
              <button type="button" className="btn primary sm" onClick={() => onSwitch(switching.id)}>
                Switch to {switching.title}
              </button>
              <button type="button" className="btn ghost sm" onClick={() => setSwitching(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <SpecializationsPage progress={progress} onOpen={onOpen} onToggle={onToggle} embedded />

      <BorrowPanel progress={progress} onToggleKey={onToggleKey} onOpen={onOpen} startWeek={startWeek} />

      <section data-reveal>
        <div className="prog-section-head">
          <h2>Side topics</h2>
          <p>
            Like a minor: about ten lighter classes from another field. Adding one puts its classes into your timetable, one a week from week {startWeek} on,
            marked GE. Leave it any time; your passes are kept.
          </p>
        </div>
        <div className="spec-grid">
          {SIDES.map((t) => {
            const mine = sides.find((s) => s.id === t.id);
            const list = trackLessons(t.id);
            const passed = list.filter((l) => progress.passed[l.id]).length;
            return (
              <article key={t.id} className={`spec-card side-card ${mine ? 'on' : ''}`} data-reveal>
                <header>
                  <span className="spec-icon">{t.icon}</span>
                  <div>
                    <h2>{t.title}</h2>
                    <span className="eyebrow">
                      {list.length ? `${list.length} classes` : 'Being written'}
                      {mine && list.length ? ` · ${passed} passed · from week ${mine.start}` : ''}
                    </span>
                  </div>
                </header>
                <p>{t.blurb}</p>
                <p className="notes-hint">Why it helps: {t.why}</p>
                {mine && (
                  <ol className="spec-classes">
                    {list.map((l) => {
                      const st = trackClassState(l, progress.passed);
                      return (
                        <li key={l.id}>
                          <button type="button" className={`spec-class ${st.done ? 'done' : ''}`} disabled={!st.open} onClick={() => onOpen(l.id)}>
                            <span className="part-num">{st.done ? '✓' : st.open ? l.specIndex + 1 : '🔒'}</span>
                            <span>
                              <strong>{l.title}</strong>
                              <span className="notes-hint">
                                Week {weekOfClass[l.id]} · {st.open ? l.subtitle : st.why}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                )}
                <div className="spec-actions">
                  {mine ? (
                    <button type="button" className="btn ghost sm" onClick={() => onToggleKey(mine.key)}>
                      Remove from my timetable (passes are kept)
                    </button>
                  ) : (
                    <button type="button" className="btn primary sm" disabled={!list.length} onClick={() => onToggleKey(`side:${t.id}@${startWeek}`)}>
                      Add to my timetable
                    </button>
                  )}
                </div>
              </article>
            );
          })}
          {SIDES_LATER.map((t) => (
            <article key={t.title} className="spec-card side-card later" data-reveal>
              <header>
                <span className="spec-icon">{t.icon}</span>
                <div>
                  <h2>{t.title}</h2>
                  <span className="eyebrow">Coming next</span>
                </div>
              </header>
              <p>{t.blurb}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
