import { TRACKS, trackLessons, trackClassState, yearProgress, openSlots, UM_COURSES } from '../data/path';
import { useReveal } from '../state/useReveal';

// Elective tracks. Locked until Year 1 is finished; then pick one. Finishing
// Year 2 and Year 3 opens room for a second and a third.
export default function SpecializationsPage({ progress, onOpen, onToggle, embedded = false }) {
  const years = yearProgress(progress.passed);
  const slots = openSlots(progress.passed);
  const picked = TRACKS.filter((t) => progress.readings[`spec:${t.id}`]).map((t) => t.id);
  const freeSlots = Math.max(0, slots - picked.length);
  const nextYear = years.find((y) => !y.complete);
  useReveal([slots, picked.length]);

  return (
    <div className="spec-page">
      <header className={embedded ? 'prog-section-head' : 'timeline-head'} data-reveal>
        {embedded ? <h2>Specialization tracks</h2> : <h1>Specializations</h1>}
        <p>
          Materials engineering splits into branches, like any big field. A track adds a short run of deeper classes on top of your timetable, and fills
          the elective slots of your UM program ({['MATE 303', 'MATE 308', 'MATE 405'].map((c) => `${c} ${UM_COURSES[c]}`).join(', ')}).
        </p>
      </header>

      <section className="spec-unlock" data-reveal>
        {slots === 0 ? (
          <>
            <span className="eyebrow">🔒 Locked</span>
            <strong>Finish every Year 1 class to choose your first track.</strong>
          </>
        ) : (
          <>
            <span className="eyebrow">
              {slots} track{slots === 1 ? '' : 's'} open · {picked.length} chosen
            </span>
            <strong>{freeSlots > 0 ? `Choose ${freeSlots === 1 ? 'a track' : `${freeSlots} tracks`} below.` : 'Your tracks are set. You can swap one any time.'}</strong>
          </>
        )}
        <div className="spec-years">
          {years.map((y) => (
            <div key={y.year} className={`spec-year ${y.complete ? 'done' : ''}`}>
              <span>
                Year {y.year}: {y.done} of {y.total} classes {y.complete ? '✓' : ''}
              </span>
              <div className="spec-bar">
                <div style={{ width: `${(100 * y.done) / Math.max(1, y.total)}%` }} />
              </div>
              <span className="notes-hint">{y.slots === 1 ? 'Opens your first track' : `Opens track ${y.slots}`}</span>
            </div>
          ))}
        </div>
        {nextYear && slots > 0 && <p className="notes-hint">Finish Year {nextYear.year} to open one more track.</p>}
      </section>

      <div className="spec-grid">
        {TRACKS.map((t) => {
          const on = picked.includes(t.id);
          const list = trackLessons(t.id);
          const passed = list.filter((l) => progress.passed[l.id]).length;
          const canPick = !on && freeSlots > 0;
          return (
            <article key={t.id} className={`spec-card ${on ? 'on' : ''} ${slots === 0 ? 'locked' : ''}`} data-reveal>
              <header>
                <span className="spec-icon">{slots === 0 ? '🔒' : t.icon}</span>
                <div>
                  <h2>{t.title}</h2>
                  <span className="eyebrow">
                    {list.length ? `${list.length} classes` : 'Being written'}
                    {on && list.length ? ` · ${passed} passed` : ''}
                  </span>
                </div>
              </header>
              <p>{t.blurb}</p>
              <p className="notes-hint">Where it leads: {t.jobs}</p>

              {on && (
                <ol className="spec-classes">
                  {list.map((l) => {
                    const st = trackClassState(l, progress.passed);
                    return (
                      <li key={l.id}>
                        <button type="button" className={`spec-class ${st.done ? 'done' : ''}`} disabled={!st.open} onClick={() => onOpen(l.id)}>
                          <span className="part-num">{st.done ? '✓' : st.open ? l.specIndex + 1 : '🔒'}</span>
                          <span>
                            <strong>{l.title}</strong>
                            <span className="notes-hint">{st.open ? l.subtitle : st.why}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}

              <div className="spec-actions">
                {on ? (
                  <button type="button" className="btn ghost sm" onClick={() => onToggle(t.id)}>
                    Leave this track (your passes are kept)
                  </button>
                ) : (
                  <button type="button" className="btn primary sm" disabled={!canPick} onClick={() => onToggle(t.id)}>
                    {slots === 0 ? 'Unlocks after Year 1' : canPick ? 'Choose this track' : 'No free slot yet'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
