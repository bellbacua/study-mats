import { useMemo, useState } from 'react';
import { SUBJECTS } from '../data/path';
import { missList } from '../state/mistakes';
import { niceDate } from '../state/plan';
import { useReveal } from '../state/useReveal';
import Glossed from './Glossed';
import { Problem } from './LearnIt';
import { DEEP } from '../data/deep';

const FROM = { learn: 'Learn it', quiz: 'Class quiz', review: 'Review', exam: 'Quiz or exam' };
const textOf = (m) => (m.q.kind === 'problem' ? m.q.item.q : m.q.item.question);

// The mistakes notebook: every question you got wrong, with its explanation,
// and a way to redo only those.
export default function MistakesPage({ progress, actions, onOpenClass }) {
  const [show, setShow] = useState('open');
  const [run, setRun] = useState(null); // list of keys being redone
  useReveal([show, !!run]);
  const all = useMemo(() => missList(progress.items), [progress.items]);
  const open = all.filter((m) => !m.fixed);
  const fixed = all.filter((m) => m.fixed);

  if (run) return <RedoRunner keys={run} progress={progress} actions={actions} onDone={() => setRun(null)} />;

  const list = (show === 'open' ? open : fixed).sort((a, b) => (a.last < b.last ? 1 : -1));
  const groups = [];
  for (const m of list) {
    let g = groups.find((x) => x.lesson.id === m.lesson.id);
    if (!g) groups.push((g = { lesson: m.lesson, items: [] }));
    g.items.push(m);
  }

  return (
    <div className="mistakes">
      <header className="timeline-head" data-reveal>
        <span className="eyebrow">Mistakes notebook</span>
        <h1>{open.length ? `${open.length} question${open.length === 1 ? '' : 's'} to redo` : all.length ? 'Nothing left to redo' : 'No mistakes yet'}</h1>
        <p>
          Every question you get wrong in a class, a review or a quiz lands here with its worked answer. Redo them a day or two later: getting
          one right on the first try marks it fixed. Mistakes are the fastest way to find what you have not understood yet.
        </p>
        {open.length > 0 && (
          <div className="plan-head-actions">
            <button type="button" className="btn primary" onClick={() => setRun(open.map((m) => m.key))}>
              Redo all {open.length} →
            </button>
          </div>
        )}
      </header>

      {all.length === 0 ? (
        <div className="empty-card" data-reveal>
          <strong>Your notebook is empty</strong>
          <p>
            When you miss a practice problem, a class quiz question or a review question, it is saved here so you can come back to it. Being
            wrong while learning is normal; this page makes sure it pays off.
          </p>
        </div>
      ) : (
        <>
          <div className="seg" role="tablist" data-reveal>
            <button type="button" role="tab" aria-selected={show === 'open'} className={show === 'open' ? 'on' : ''} onClick={() => setShow('open')}>
              To redo <span>{open.length}</span>
            </button>
            <button type="button" role="tab" aria-selected={show === 'fixed'} className={show === 'fixed' ? 'on' : ''} onClick={() => setShow('fixed')}>
              Fixed <span>{fixed.length}</span>
            </button>
          </div>
          {groups.length === 0 && (
            <p className="notes-hint" data-reveal>
              {show === 'open' ? 'Every mistake is fixed. Nice work.' : 'Nothing fixed yet. Redo a mistake and get it right to see it here.'}
            </p>
          )}
          {groups.map((g) => (
            <section key={g.lesson.id} className={`miss-group subj-${g.lesson.track}`} data-reveal>
              <header>
                <span className={`track track-${g.lesson.track}`}>{g.lesson.code}</span>
                <h2>{g.lesson.title}</h2>
                <span className="miss-group-actions">
                  {show === 'open' && (
                    <button type="button" className="btn ghost sm" onClick={() => setRun(g.items.map((m) => m.key))}>
                      Redo {g.items.length}
                    </button>
                  )}
                  <button type="button" className="btn ghost sm" onClick={() => onOpenClass(g.lesson.id)}>
                    Open class
                  </button>
                </span>
              </header>
              <ul>
                {g.items.map((m) => (
                  <MissRow key={m.key} m={m} />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

function MissRow({ m }) {
  const [open, setOpen] = useState(false);
  const it = m.q.item;
  return (
    <li className={`miss ${open ? 'open' : ''}`}>
      <button type="button" className="miss-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="miss-q">
          <Glossed text={textOf(m)} />
        </span>
        <span className="miss-meta">
          {FROM[m.from] || m.from}
          {m.q.partTitle ? ` · ${m.q.partTitle}` : ''} · missed {m.times}× · {m.fixed ? `fixed ${niceDate(m.fixed, { day: 'numeric', month: 'short' })}` : niceDate(m.last, { day: 'numeric', month: 'short' })}
        </span>
        <span className="miss-caret" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="miss-body">
          {m.q.kind === 'choice' ? (
            <>
              <p>
                <strong>Answer:</strong> {it.options[it.correctIndex]}
              </p>
              <p>
                <Glossed text={it.explanation} />
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Answer:</strong> {it.options ? it.options[0] : String(it.a)}
              </p>
              <p>
                <Glossed text={it.solution} />
              </p>
            </>
          )}
        </div>
      )}
    </li>
  );
}

// Redo a list of mistakes one at a time. The first try decides: right marks
// it fixed, wrong counts one more miss.
function RedoRunner({ keys, progress, actions, onDone }) {
  const [list] = useState(() => missList(progress.items).filter((m) => keys.includes(m.key)));
  const [i, setI] = useState(0);
  const [tally, setTally] = useState({ right: 0, wrong: 0 });
  const [answered, setAnswered] = useState(false);
  const m = list[i];
  const answer = (right) => {
    if (answered) return;
    setAnswered(true);
    actions.noteAnswer({ key: m.key, lessonId: m.lessonId, from: m.from, right });
    setTally((t) => ({ right: t.right + (right ? 1 : 0), wrong: t.wrong + (right ? 0 : 1) }));
  };
  const next = () => {
    setAnswered(false);
    setI(i + 1);
    window.scrollTo({ top: 0 });
  };

  if (!m)
    return (
      <div className="report">
        <header className="timeline-head">
          <span className="eyebrow">Redo finished</span>
          <h1>
            {tally.right} fixed · {tally.wrong} still to work on
          </h1>
          <p>
            {tally.wrong
              ? 'The ones you missed stay in your notebook. Reread their class part, then try again tomorrow.'
              : 'Every one right on the first try. They move to “Fixed”.'}
          </p>
        </header>
        <div className="lesson-foot">
          <button type="button" className="btn primary" onClick={onDone}>
            Back to the notebook
          </button>
        </div>
      </div>
    );

  return (
    <div className="practice">
      <div className="practice-dots">
        <span className="eyebrow" style={{ margin: 0 }}>
          Redo · {i + 1} of {list.length} · {SUBJECTS[m.lesson.track] || m.lesson.track} · {m.lesson.code}: {m.lesson.title.split(':')[0]}
        </span>
        <span className="practice-score">
          {tally.right} fixed · {tally.wrong} missed
        </span>
      </div>
      <div className="exam-progress">
        <div style={{ width: `${((i + 1) / list.length) * 100}%` }} />
      </div>
      {m.q.kind === 'problem' ? (
        <div className="part redo-part">
          <Problem key={m.key} item={m.q.item} k={i} part={DEEP[m.q.lessonId]?.parts?.[m.q.part]} seed={m.key} onRight={() => {}} onAnswer={answer} />
        </div>
      ) : (
        <ChoiceRedo key={m.key} q={m.q.item} onAnswer={answer} />
      )}
      <div className="lesson-foot">
        <button type="button" className="btn ghost sm" onClick={onDone}>
          Stop for now
        </button>
        <button type="button" className="btn primary" disabled={!answered} onClick={next}>
          {i < list.length - 1 ? 'Next →' : 'Finish'}
        </button>
      </div>
    </div>
  );
}

function ChoiceRedo({ q, onAnswer }) {
  const [chosen, setChosen] = useState(null);
  const done = chosen !== null;
  const right = chosen === q.correctIndex;
  return (
    <article className="question">
      {q.heading && <h3>{q.heading}</h3>}
      <p className="question-text">
        <Glossed text={q.question} />
      </p>
      <div className="options">
        {q.options.map((opt, k) => (
          <button
            key={k}
            type="button"
            className={`option ${done && k === q.correctIndex ? 'right' : ''} ${done && k === chosen && !right ? 'wrong' : ''}`}
            disabled={done}
            onClick={() => (setChosen(k), onAnswer(k === q.correctIndex))}
          >
            <span className="letter">{String.fromCharCode(65 + k)}</span>
            {opt}
          </button>
        ))}
      </div>
      {done && (
        <div className={`verdict ${right ? 'ok' : 'no'}`}>
          <strong>{right ? '✓ Fixed.' : '✗ Not yet. It stays in your notebook.'}</strong>
          <p>
            <Glossed text={q.explanation} />
          </p>
        </div>
      )}
    </article>
  );
}
