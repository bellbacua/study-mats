import { useState } from 'react';
import { PROGRAM_DATA, PROGRAM_ID, PROGRAM_LESSONS, SUBJECTS, LESSONS, borrowed, borrowKeys, foundationsFor, lessonById, trackLessons } from '../data/path';

const short = (t) => t.split(':')[0];
const MINE = new Map(LESSONS.map((l) => [l.id, l]));

// Classes from other programs that you can add to your own timetable. Adding
// an advanced class first lists what it builds on, and offers to add those too.
export default function BorrowPanel({ progress, onToggleKey, onOpen, startWeek }) {
  const others = Object.values(PROGRAM_DATA).filter((p) => p.id !== PROGRAM_ID);
  const [progId, setProgId] = useState(others[0]?.id);
  const [asking, setAsking] = useState(null);
  const mine = borrowed(progress.readings);
  const taken = new Map(mine.map((b) => [b.id, b]));
  const prog = PROGRAM_DATA[progId];
  if (!prog) return null;

  // Group the other program's timetable by stage, then its tracks.
  const list = PROGRAM_LESSONS[prog.id].map((l) => lessonById(l.id) || l);
  const weekNo = (l) => Number(String(PROGRAM_LESSONS[prog.id].find((x) => x.id === l.id)?.termId || '').replace('week-', ''));
  const groups = prog.stages.map((s, i) => {
    const to = prog.stages[i + 1]?.from ?? 1e9;
    return { title: s.title, note: s.note, lessons: list.filter((l) => weekNo(l) >= s.from && weekNo(l) < to) };
  });
  for (const t of prog.tracks) {
    const ls = trackLessons(t.id);
    if (ls.length) groups.push({ title: `${t.icon} ${t.title} track`, note: t.blurb, lessons: ls, open: true });
  }

  const add = (ids) => {
    for (const k of borrowKeys(ids, startWeek)) onToggleKey(k);
    setAsking(null);
  };
  const tryAdd = (l) => {
    const need = foundationsFor(l.id, progress.passed);
    if (!need.length) return add([l.id]);
    setAsking({ l, need });
  };

  return (
    <section data-reveal id="borrow" className="borrow-section">
      <div className="prog-section-head">
        <h2>Add subjects from other programs</h2>
        <p>
          Any class from another program can sit in your timetable as an extra, from week {startWeek} on. Classes that both programs share (most of the math)
          count once, in both. If a class builds on things you have not passed yet, you will see them first, with the option to add them too.
        </p>
      </div>

      {others.length > 1 && (
        <div className="borrow-tabs">
          {others.map((p) => (
            <button key={p.id} type="button" className={`btn sm ${p.id === progId ? 'primary' : 'ghost'}`} onClick={() => setProgId(p.id)}>
              {p.title}
            </button>
          ))}
        </div>
      )}

      {mine.length > 0 && (
        <div className="borrow-mine">
          <span className="eyebrow">Your extras · {mine.filter((b) => progress.passed[b.id]).length} of {mine.length} passed</span>
          <ul>
            {mine.map((b) => (
              <li key={b.key}>
                <button type="button" className="linkish" onClick={() => onOpen(b.id)}>
                  {progress.passed[b.id] ? '✓ ' : ''}
                  {short(b.lesson.title)}
                </button>
                <span className="notes-hint"> · week {b.week}</span>
                <button type="button" className="btn ghost xs" onClick={() => onToggleKey(b.key)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {asking && (
        <div className="borrow-ask" role="dialog" aria-label="Foundations first">
          <span className="eyebrow">Foundations first</span>
          <strong>
            “{short(asking.l.title)}” builds on {asking.need.length} class{asking.need.length === 1 ? '' : 'es'} you have not passed yet.
          </strong>
          <p className="notes-hint">We recommend taking these first, in this order. It will make the new class much easier to follow.</p>
          <ol className="borrow-need">
            {asking.need.length > 12 && <li className="notes-hint">…{asking.need.length - 12} earlier classes, then:</li>}
            {asking.need.slice(-12).map((n) => (
              <li key={n.id}>
                {short(n.title)} <span className="notes-hint">{MINE.has(n.id) ? `· already on your timetable, week ${MINE.get(n.id).termId.replace('week-', '')}` : taken.has(n.id) ? '· already added' : ''}</span>
              </li>
            ))}
          </ol>
          {(() => {
            const extra = asking.need.filter((n) => !MINE.has(n.id) && !taken.has(n.id)).map((n) => n.id);
            return (
              <div className="spec-actions">
                {extra.length > 0 && (
                  <button type="button" className="btn primary sm" onClick={() => add([...extra, asking.l.id])}>
                    Add it with its foundations ({extra.length + 1} classes)
                  </button>
                )}
                <button type="button" className={`btn sm ${extra.length ? 'ghost' : 'primary'}`} onClick={() => add([asking.l.id])}>
                  {extra.length ? 'Add just this class' : 'Add it (its foundations are on your timetable)'}
                </button>
                <button type="button" className="btn ghost sm" onClick={() => setAsking(null)}>
                  Cancel
                </button>
              </div>
            );
          })()}
        </div>
      )}

      <div className="borrow-groups">
        {groups
          .filter((g) => g.lessons.length)
          .map((g) => (
            <details key={g.title} className="borrow-group" open={g.open}>
              <summary>
                <strong>{g.title}</strong>
                <span className="notes-hint">
                  {' '}
                  · {g.lessons.length} classes
                </span>
              </summary>
              <p className="notes-hint">{g.note}</p>
              <ul>
                {g.lessons.map((l) => {
                  const here = MINE.get(l.id);
                  const b = taken.get(l.id);
                  return (
                    <li key={l.id} className="borrow-row">
                      <span className={`subject track-${l.track}`}>{SUBJECTS[l.track] || l.track}</span>
                      <span className="borrow-title">
                        {progress.passed[l.id] ? '✓ ' : ''}
                        {l.title}
                      </span>
                      {here ? (
                        <span className="notes-hint">On your timetable, week {here.termId.replace('week-', '')}</span>
                      ) : b ? (
                        <button type="button" className="btn ghost xs" onClick={() => onToggleKey(b.key)}>
                          Added · remove
                        </button>
                      ) : (
                        <button type="button" className="btn primary xs" onClick={() => tryAdd(l)}>
                          Add
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
      </div>
    </section>
  );
}
