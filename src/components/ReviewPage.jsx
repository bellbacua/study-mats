import { useMemo, useState } from 'react';
import { LESSONS, SUBJECTS } from '../data/path';
import { LADDER, buildSession, dueCards, forecast, grade, strength, todayStr } from '../state/review';
import { useReveal } from '../state/useReveal';
import Glossed from './Glossed';

const byId = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
const weekday = (day) => new Date(`${day}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' });

export default function ReviewPage({ progress, actions }) {
  const [session, setSession] = useState(null);
  useReveal([session]);

  if (session) return <ReviewRunner key={session} progress={progress} actions={actions} onDone={() => setSession(null)} />;

  const passedCount = Object.keys(progress.passed).length;
  const due = dueCards(progress.passed, progress.review).length;
  const fc = forecast(progress.passed, progress.review);
  const st = strength(progress.passed, progress.review);
  const total = st.new + st.learning + st.known + st.longterm;
  const max = Math.max(1, ...fc.map((f) => f.n));

  return (
    <div className="exams review-home">
      <header className="timeline-head" data-reveal>
        <h1>Review</h1>
        <p>
          Every class you pass sends its questions here. Each one comes back the next day, then after {LADDER.slice(1).join(', ')} days
          each time you get it right. A miss sends it back to tomorrow. Questions from all your subjects are mixed together, so you have to
          recall which idea fits instead of riding on the class you just read. A few minutes a day is the point.
        </p>
      </header>

      {passedCount === 0 ? (
        <div className="empty-card" data-reveal>
          <strong>Nothing to review yet</strong>
          <p>Pass your first class and its questions will show up here tomorrow. Each right answer pushes a question further out:</p>
          <ol className="ladder" aria-label="Days until a question comes back">
            {[1, 3, 10, 30, 90].map((d) => (
              <li key={d}>
                <span>{d}</span>
                {d === 1 ? 'day' : 'days'}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <>
          <section className="review-today" data-reveal>
            <div>
              <span className="eyebrow">Due today</span>
              <strong className="review-big">{due}</strong>
              <span className="notes-hint">{due > 0 ? `a session takes up to ${Math.min(due, 20)} questions, about ${Math.ceil(Math.min(due, 20) * 0.5)} minutes` : 'all caught up. Come back tomorrow.'}</span>
            </div>
            <button type="button" className="btn primary" disabled={due === 0} onClick={() => setSession(Date.now())}>
              Start review
            </button>
          </section>

          <h2 className="section-title" data-reveal>
            The next 7 days
          </h2>
          <div className="review-forecast" data-reveal>
            {fc.map((f, i) => (
              <div key={f.day} className="fc-day">
                <div className="fc-bar">
                  <div style={{ height: `${(f.n / max) * 100}%` }} />
                </div>
                <strong>{f.n}</strong>
                <span>{i === 0 ? 'today' : weekday(f.day)}</span>
              </div>
            ))}
          </div>

          <h2 className="section-title" data-reveal>
            How firmly you hold {total} questions
          </h2>
          <div className="review-strength" data-reveal>
            {[
              ['new', 'Not reviewed yet', st.new],
              ['learning', 'Learning (back in 1–3 days)', st.learning],
              ['known', 'Known (back in 10–30 days)', st.known],
              ['longterm', 'Long-term (back in 90 days)', st.longterm],
            ].map(([k, label, n]) => (
              <div key={k} className={`report-bar st-${k}`}>
                <span>{label}</span>
                <div className="meter">
                  <div style={{ width: `${total ? (n / total) * 100 : 0}%` }} />
                </div>
                <strong>{n}</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ReviewRunner({ progress, actions, onDone }) {
  // Freeze today's list when the session starts.
  const first = useMemo(() => buildSession(progress.passed, progress.review), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [queue, setQueue] = useState(first);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [tally, setTally] = useState({ right: 0, wrong: 0, missed: [] });

  if (!queue.length || i >= queue.length) {
    const n = tally.right + tally.wrong;
    return (
      <div className="report">
        <header className="timeline-head">
          <span className="eyebrow">Review done · {todayStr()}</span>
          <h1>
            {tally.right} / {n} <span className={`grade ${tally.right >= n * 0.8 ? 'ok' : 'no'}`}>{n ? Math.round((tally.right / n) * 100) : 0}%</span>
          </h1>
          <p>
            Right answers moved further out on the ladder. Misses come back tomorrow, and you saw each one again at the end of this session.
          </p>
        </header>
        {tally.missed.length > 0 && (
          <>
            <h2 className="section-title">Worth rereading</h2>
            <ul className="weak-list">
              {[...new Set(tally.missed)].map((id) => (
                <li key={id}>
                  <button type="button" className="tl-link-btn" onClick={() => actions.open(id)}>
                    {byId[id]?.title}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="lesson-foot">
          <button type="button" className="btn primary" onClick={onDone}>
            Done
          </button>
        </div>
      </div>
    );
  }

  const card = queue[i];
  const { q } = card;
  const answered = chosen !== null;
  const right = chosen === q.correctIndex;
  const lesson = byId[q.lessonId];

  const choose = (k) => {
    if (answered) return;
    setChosen(k);
    const ok = k === q.correctIndex;
    if (!card.retry) {
      actions.reviewAnswer(q.id, q.lessonId, grade(card, ok));
      actions.noteAnswer?.({ key: `q:${q.id}`, lessonId: q.lessonId, from: 'review', right: ok });
      setTally((t) => ({ right: t.right + (ok ? 1 : 0), wrong: t.wrong + (ok ? 0 : 1), missed: ok ? t.missed : [...t.missed, q.lessonId] }));
      // see a missed question once more before the session ends
      if (!ok) setQueue((qs) => [...qs, { ...card, retry: true }]);
    }
  };
  const next = () => {
    setChosen(null);
    setI(i + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="practice">
      <div className="practice-dots">
        <span className="eyebrow" style={{ margin: 0 }}>
          Review · {i + 1} of {queue.length}
          {card.retry ? ' · second look' : ''}
        </span>
        <span className="practice-score">
          {tally.right} right · {tally.wrong} to redo
        </span>
      </div>
      <div className="exam-progress">
        <div style={{ width: `${((i + 1) / queue.length) * 100}%` }} />
      </div>
      <article className="question">
        <span className={`eyebrow ${q.kind === 'history' ? 'eyebrow-history' : ''}`}>
          {SUBJECTS[q.subject]} · {q.kind === 'history' ? '📜 History' : q.kind === 'problem' ? 'Real engineering problem' : 'Skill'}
          {answered && lesson ? ` · from ${lesson.code}: ${lesson.title}` : ''}
        </span>
        {q.heading && <h3>{q.heading}</h3>}
        <p className="question-text">
          <Glossed text={q.question} />
        </p>
        {!answered && <p className="notes-hint">Try to recall the answer before you look at the choices.</p>}
        <div className="options">
          {q.options.map((opt, k) => {
            const cls = `option ${answered && k === q.correctIndex ? 'right' : ''} ${answered && k === chosen && !right ? 'wrong' : ''}`;
            return (
              <button key={k} type="button" className={cls} disabled={answered} onClick={() => choose(k)}>
                <span className="letter">{String.fromCharCode(65 + k)}</span>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`verdict ${right ? 'ok' : 'no'}`}>
            <strong>
              {right ? '✓ Right.' : '✗ Not quite.'}{' '}
              {card.retry ? '' : right ? `Next review in ${LADDER[grade(card, true).box]} days.` : 'It comes back tomorrow, and once more at the end of today.'}
            </strong>
            <p>
              <Glossed text={q.explanation} />
            </p>
          </div>
        )}
        <div className="question-actions">
          <span className="spacer" />
          {answered && (
            <button type="button" className="btn primary" onClick={next}>
              {i < queue.length - 1 ? 'Next →' : 'Finish'}
            </button>
          )}
        </div>
      </article>
      <div className="lesson-foot">
        <button type="button" className="btn ghost sm" onClick={onDone}>
          Stop for now (answers so far are saved)
        </button>
      </div>
    </div>
  );
}
