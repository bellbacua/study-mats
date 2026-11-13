import { useMemo, useState } from 'react';
import { PROGRAM, weekNumber } from '../data/path';
import { PLACE_SUBJECTS, checkpoints, drillCount, placementOf, questionFor } from '../state/placement';

const short = (t) => t.split(':')[0].trim();

// The placement check. One subject at a time: "have you studied any of it?",
// then a few questions from classes further and further along, until one is
// new to you. Nothing is marked right or wrong while you go, and "I have not
// learned this yet" is always an answer.
export default function PlacementPage({ progress, onSave, onClear, onDone }) {
  const saved = placementOf(progress.items);
  const [phase, setPhase] = useState(saved ? 'saved' : 'intro'); // saved | intro | ask | q | result
  const [si, setSi] = useState(0); // subject
  const [ci, setCi] = useState(0); // checkpoint within the subject
  const [slip, setSlip] = useState(0); // a second question from the same class after a miss
  const [reach, setReach] = useState({}); // subject id -> index of the last class you showed you know
  const [asked, setAsked] = useState({}); // subject id -> questions asked
  const [said, setSaid] = useState({}); // subject id -> 'new' when you said it is new to you
  const [keep, setKeep] = useState(() => new Set()); // classes you chose to study anyway

  const subj = PLACE_SUBJECTS[si];
  const cps = useMemo(() => (subj ? checkpoints(subj.classes.length) : []), [subj]);
  const lesson = subj && subj.classes[cps[ci]];
  const q = useMemo(() => (lesson ? questionFor(lesson, slip) : null), [lesson, slip]);
  const totalAsked = Object.values(asked).reduce((s, n) => s + n, 0);

  const begin = () => {
    setSi(0);
    setCi(0);
    setSlip(0);
    setReach({});
    setAsked({});
    setSaid({});
    setKeep(new Set());
    setPhase('ask');
  };
  const nextSubject = (i) => {
    setCi(0);
    setSlip(0);
    if (i >= PLACE_SUBJECTS.length) setPhase('result');
    else {
      setSi(i);
      setPhase('ask');
    }
  };
  const answerAsk = (yes) => {
    if (yes) {
      setCi(0);
      setSlip(0);
      setPhase('q');
    } else {
      setSaid((s) => ({ ...s, [subj.id]: 'new' }));
      nextSubject(si + 1);
    }
  };
  // pick: an option index, or null for "not learned yet".
  const answer = (pick) => {
    setAsked((a) => ({ ...a, [subj.id]: (a[subj.id] || 0) + 1 }));
    const right = pick !== null && pick === q.correctIndex;
    if (right) {
      setReach((r) => ({ ...r, [subj.id]: cps[ci] }));
      if (ci + 1 < cps.length) {
        setCi(ci + 1);
        setSlip(0);
      } else nextSubject(si + 1);
      return;
    }
    // One slip is allowed: a miss gets a second question from the same class.
    if (pick !== null && slip === 0 && drillCount(lesson) > 1) {
      setSlip(1);
      return;
    }
    nextSubject(si + 1);
  };

  // What the answers add up to, subject by subject.
  const result = PLACE_SUBJECTS.map((s) => {
    const upto = reach[s.id] ?? -1;
    const known = s.classes.slice(0, upto + 1);
    const skip = known.filter((l) => !keep.has(l.id) && !progress.passed[l.id]);
    const start = s.classes.find((l) => !progress.passed[l.id] && !skip.includes(l)) || null;
    return { ...s, known, skip, start, asked: asked[s.id] || 0, said: said[s.id] };
  });
  const skipCount = result.reduce((n, r) => n + r.skip.length, 0);
  const flipKeep = (id) =>
    setKeep((k) => {
      const n = new Set(k);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const save = () => {
    onSave({
      known: result.flatMap((r) => r.skip.map((l) => l.id)),
      subjects: Object.fromEntries(result.map((r) => [r.id, { known: r.skip.length, asked: r.asked }])),
    });
    onDone();
  };

  return (
    <div className="placement">
      {phase === 'saved' && saved && (
        <section className="place-card">
          <span className="eyebrow">Placement check</span>
          <h1>You took the check</h1>
          <p className="place-lead">
            {saved.known?.length
              ? `${saved.known.length} classes you already knew are marked “Knew it” on your roadmap. They stay open, and the study plan leaves them out.`
              : 'Everything was new, so you start from the very first class.'}
          </p>
          <ul className="place-sum">
            {PLACE_SUBJECTS.map((s) => (
              <li key={s.id}>
                <span className={`subject track-${s.id}`}>{s.title}</span>
                <span>{saved.subjects?.[s.id]?.known ? `${saved.subjects[s.id].known} of ${s.classes.length} classes known` : 'from the start'}</span>
              </li>
            ))}
          </ul>
          <div className="place-actions">
            <button type="button" className="btn primary" onClick={begin}>
              Take it again
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                onClear();
                setPhase('intro');
              }}
            >
              Undo it: start every subject from the beginning
            </button>
          </div>
        </section>
      )}

      {phase === 'intro' && (
        <section className="place-card">
          <span className="eyebrow">Placement check · about 5 minutes</span>
          <h1>Skip what you already know</h1>
          <p className="place-lead">
            {PROGRAM.short || PROGRAM.title} starts from zero. If you have studied some of it before, a few questions find where each subject starts to be new to you, so you can begin there.
          </p>
          <ul className="place-points">
            <li>This is not a test. Nothing is graded and nothing is marked wrong.</li>
            <li>
              <strong>“I have not learned this yet”</strong> is always an answer, and the most useful one when a question looks new.
            </li>
            <li>Classes you skip stay open on your roadmap. You can take this again or undo it at any time.</li>
          </ul>
          <div className="place-actions">
            <button type="button" className="btn primary lg" onClick={begin}>
              Begin
            </button>
            <button type="button" className="btn ghost" onClick={onDone}>
              Not now: start from the first class
            </button>
          </div>
        </section>
      )}

      {(phase === 'ask' || phase === 'q') && subj && (
        <>
          <ol className="place-steps" aria-label="Subjects">
            {PLACE_SUBJECTS.map((s, i) => (
              <li key={s.id} className={i < si ? 'done' : i === si ? 'now' : ''}>
                <span className={`place-dot subj-${s.id}`} aria-hidden="true">
                  {i < si ? '✓' : ''}
                </span>
                {s.title}
              </li>
            ))}
          </ol>

          {phase === 'ask' ? (
            <section className="place-card" key={`ask-${subj.id}`}>
              <span className={`subject track-${subj.id}`}>{subj.title}</span>
              <h2>Have you studied any {subj.title.toLowerCase()} before?</h2>
              <p className="place-lead">In this course it covers {subj.about || `${subj.classes.length} classes`}.</p>
              <div className="place-choices">
                <button type="button" className="place-choice" onClick={() => answerAsk(true)}>
                  <strong>Yes, some</strong>
                  <span>Ask me a few questions</span>
                </button>
                <button type="button" className="place-choice" onClick={() => answerAsk(false)}>
                  <strong>No, it is new to me</strong>
                  <span>Start it from the first class</span>
                </button>
              </div>
            </section>
          ) : (
            q && (
              <section className="place-card" key={q.id}>
                <div className="place-q-top">
                  <span className={`subject track-${subj.id}`}>{subj.title}</span>
                  <span className="place-from">
                    From week {weekNumber(lesson)} · {short(lesson.title)}
                  </span>
                </div>
                <h2 className="place-q">{q.question}</h2>
                <div className="options place-options">
                  {q.options.map((o, k) => (
                    <button key={k} type="button" className="option" onClick={() => answer(k)}>
                      <span className="letter">{'ABCDEF'[k]}</span>
                      <span>{o}</span>
                    </button>
                  ))}
                </div>
                <button type="button" className="place-notyet" onClick={() => answer(null)}>
                  I have not learned this yet
                </button>
                <p className="place-foot">
                  {slip ? 'One more from this class. ' : ''}
                  <button type="button" className="tl-link-btn inline" onClick={() => setPhase('result')}>
                    Finish here
                  </button>{' '}
                  and use what you have answered so far.
                </p>
              </section>
            )
          )}
        </>
      )}

      {phase === 'result' && (
        <section className="place-card">
          <span className="eyebrow">Placement check · done{totalAsked ? ` · ${totalAsked} question${totalAsked === 1 ? '' : 's'}` : ''}</span>
          <h1>{skipCount ? `You can skip ${skipCount} class${skipCount === 1 ? '' : 'es'}` : 'You begin at the very start'}</h1>
          <p className="place-lead">
            {skipCount
              ? 'Here is where each subject starts for you. Open a subject to see the classes you are skipping, and untick any you would like to study anyway.'
              : 'That is exactly who this course was written for: every class starts from zero and builds on the one before.'}
          </p>
          <ul className="place-result">
            {result.map((r) => (
              <li key={r.id} className={`place-row subj-${r.id}`}>
                <div className="place-row-head">
                  <span className={`subject track-${r.id}`}>{r.title}</span>
                  <span className="place-row-start">
                    {r.start ? (
                      <>
                        Start at week {weekNumber(r.start)}: <strong>{short(r.start.title)}</strong>
                      </>
                    ) : (
                      'Nothing left to study here'
                    )}
                  </span>
                  <span className="place-row-n">{r.skip.length ? `skip ${r.skip.length}` : 'from the start'}</span>
                </div>
                {r.known.length > 0 && (
                  <details className="place-known">
                    <summary>Classes you showed you know ({r.known.length})</summary>
                    <ul>
                      {r.known.map((l) => (
                        <li key={l.id}>
                          <label>
                            <input type="checkbox" checked={!keep.has(l.id) || !!progress.passed[l.id]} disabled={!!progress.passed[l.id]} onChange={() => flipKeep(l.id)} />
                            <span>
                              Week {weekNumber(l)} · {short(l.title)}
                              {progress.passed[l.id] && <em> (already passed)</em>}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>
          <p className="notes-hint">Skipped classes stay on your roadmap, marked “Knew it”. Open one whenever you like; passing its quiz counts as usual.</p>
          <div className="place-actions">
            <button type="button" className="btn primary lg" onClick={save}>
              {skipCount ? 'Use this' : 'Start studying'}
            </button>
            {skipCount > 0 && (
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  if (saved) onClear();
                  onDone();
                }}
              >
                Start from the beginning instead
              </button>
            )}
            <button type="button" className="btn ghost" onClick={begin}>
              Answer again
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
