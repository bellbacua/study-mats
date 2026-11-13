import { useEffect, useMemo, useState } from 'react';
import { CURRICULUM_TERMS, LESSONS, SUBJECTS } from '../data/path';
import { pickQuestions } from '../state/quiz';
import { useReveal } from '../state/useReveal';
import Glossed from './Glossed';

const weekLessons = (n) => LESSONS.filter((l) => l.termId === `week-${n}`);
const upToWeek = (n) => LESSONS.filter((l) => Number(l.termId.replace('week-', '')) <= n);

export const EXAMS = [
  ...CURRICULUM_TERMS.map((t, i) => ({
    id: `quiz-week-${i + 1}`,
    title: `Week ${i + 1} quiz`,
    kind: 'quiz',
    blurb: t.subtitle,
    lessons: weekLessons(i + 1),
    count: 8,
    after: i + 1,
  })),
  { id: 'midterm', title: 'Midterm exam', kind: 'exam', blurb: 'Weeks 1–8, everything so far', lessons: upToWeek(8), count: 24, after: 8 },
  { id: 'final', title: 'Final exam', kind: 'exam', blurb: 'The whole course', lessons: LESSONS, count: 40, after: CURRICULUM_TERMS.length },
];

const pct = (s, t) => (t ? Math.round((s / t) * 100) : 0);

export default function ExamsPage({ progress, actions }) {
  const [running, setRunning] = useState(null);
  useReveal([running]);

  if (running) return <ExamRunner exam={running.exam} timed={running.timed} onDone={() => setRunning(null)} actions={actions} />;

  const ready = (exam) => exam.lessons.every((l) => progress.passed[l.id]);
  const best = (exam) => {
    const r = progress.exams[exam.id];
    return r?.length ? Math.max(...r.map((x) => pct(x.score, x.total))) : null;
  };
  const card = (exam) => {
    const b = best(exam);
    return (
      <article key={exam.id} className={`exam-card ${exam.kind}`} data-reveal>
        <div className="exam-top">
          <span className="eyebrow">{exam.kind === 'exam' ? 'Exam' : 'Weekly quiz'}</span>
          {b != null && <span className={`pill ${b >= 75 ? 'ok' : ''}`}>best {b}%</span>}
        </div>
        <h3>{exam.title}</h3>
        <p>{exam.blurb}</p>
        <p className="exam-meta">
          {Math.min(exam.count, exam.lessons.length * 6)} questions · {ready(exam) ? 'all classes done ✓' : `best after finishing week ${exam.after}`}
        </p>
        <div className="exam-actions">
          <button type="button" className="btn primary sm" onClick={() => setRunning({ exam, timed: false })}>
            Start
          </button>
          <button type="button" className="btn ghost sm" onClick={() => setRunning({ exam, timed: true })} title="About 1½ minutes per question">
            Timed
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="exams">
      <header className="timeline-head" data-reveal>
        <h1>Quizzes & exams</h1>
        <p>
          Each weekly quiz mixes skills, history and a real problem from that week&apos;s classes. The midterm covers weeks 1–8 and the final
          covers everything. Every attempt is saved; your report card shows where to review.
        </p>
      </header>
      <h2 className="section-title" data-reveal>
        Exams
      </h2>
      <div className="exam-grid">{EXAMS.filter((e) => e.kind === 'exam').map(card)}</div>
      <h2 className="section-title" data-reveal>
        Weekly quizzes
      </h2>
      <div className="exam-grid">{EXAMS.filter((e) => e.kind === 'quiz').map(card)}</div>
    </div>
  );
}

function ExamRunner({ exam, timed, onDone, actions }) {
  const seed = useMemo(() => `${exam.id}-${Date.now()}`, [exam.id]);
  const questions = useMemo(() => pickQuestions(exam.lessons, exam.count, seed), [exam, seed]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [left, setLeft] = useState(timed ? questions.length * 90 : null);

  useEffect(() => {
    if (!timed || finished) return undefined;
    const id = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [timed, finished]);
  useEffect(() => {
    if (timed && left === 0 && !finished) finish();
  }, [left]); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = () => {
    const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    const bySubject = {};
    const weak = {};
    for (const q of questions) {
      const s = (bySubject[q.subject] ||= { right: 0, total: 0 });
      s.total += 1;
      if (answers[q.id] === q.correctIndex) s.right += 1;
      else weak[q.lessonId] = (weak[q.lessonId] || 0) + 1;
    }
    actions.saveExam(exam.id, score, questions.length, { bySubject, weak, timed });
    // Answered questions feed the mistakes notebook.
    for (const q of questions)
      if (answers[q.id] != null) actions.noteAnswer?.({ key: `q:${q.id}`, lessonId: q.lessonId, from: 'exam', right: answers[q.id] === q.correctIndex });
    setFinished(true);
    window.scrollTo({ top: 0 });
  };

  if (finished) {
    const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    const p = pct(score, questions.length);
    const bySubject = {};
    const weak = {};
    for (const q of questions) {
      const s = (bySubject[q.subject] ||= { right: 0, total: 0 });
      s.total += 1;
      if (answers[q.id] === q.correctIndex) s.right += 1;
      else weak[q.lessonId] = (weak[q.lessonId] || 0) + 1;
    }
    const byId = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
    return (
      <div className="report">
        <header className="timeline-head">
          <span className="eyebrow">Report card · {exam.title}</span>
          <h1>
            {score} / {questions.length} <span className={`grade ${p >= 75 ? 'ok' : 'no'}`}>{p}%</span>
          </h1>
        </header>
        <div className="report-subjects">
          {Object.entries(bySubject).map(([k, v]) => (
            <div key={k} className={`report-bar subj-${k}`}>
              <span>{SUBJECTS[k]}</span>
              <div className="meter">
                <div style={{ width: `${pct(v.right, v.total)}%`, background: 'var(--subj)' }} />
              </div>
              <strong>
                {v.right}/{v.total}
              </strong>
            </div>
          ))}
        </div>
        {Object.keys(weak).length > 0 && (
          <>
            <h2 className="section-title">Review these classes</h2>
            <ul className="weak-list">
              {Object.entries(weak)
                .sort((a, b) => b[1] - a[1])
                .map(([id, n]) => (
                  <li key={id}>
                    <button type="button" className="tl-link-btn" onClick={() => actions.open(id)}>
                      {byId[id]?.title} → <span className="notes-hint">{n} missed</span>
                    </button>
                  </li>
                ))}
            </ul>
          </>
        )}
        <h2 className="section-title">Answers</h2>
        <div className="review">
          {questions.map((q, n) => {
            const ok = answers[q.id] === q.correctIndex;
            return (
              <article key={q.id} className={`verdict ${ok ? 'ok' : 'no'}`}>
                <strong>
                  {n + 1}. {ok ? '✓' : '✗'} {q.kind === 'history' ? '📜 ' : ''}
                  {q.question}
                </strong>
                {!ok && (
                  <p>
                    Your answer: {q.options[answers[q.id]] ?? '(none)'} · Correct: <b>{q.options[q.correctIndex]}</b>
                  </p>
                )}
                <p>
                  <Glossed text={q.explanation} />
                </p>
              </article>
            );
          })}
        </div>
        <div className="lesson-foot">
          <button type="button" className="btn ghost" onClick={onDone}>
            ← All quizzes & exams
          </button>
        </div>
      </div>
    );
  }

  const q = questions[i];
  const chosen = answers[q.id];
  const mmss = left != null ? `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}` : null;
  return (
    <div className="practice">
      <div className="practice-dots">
        <span className="eyebrow" style={{ margin: 0 }}>
          {exam.title} · question {i + 1} of {questions.length}
        </span>
        {mmss && <span className={`pill ${left < 60 ? '' : 'ok'}`}>⏱ {mmss}</span>}
        <span className="practice-score">{Object.keys(answers).length} answered</span>
      </div>
      <div className="exam-progress">
        <div style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
      </div>
      <article className="question">
        <span className={`eyebrow ${q.kind === 'history' ? 'eyebrow-history' : ''}`}>
          {q.kind === 'history' ? '📜 History' : q.kind === 'problem' ? 'Real engineering problem' : 'Skill'} ·{' '}
          {LESSONS.find((l) => l.id === q.lessonId)?.code}
        </span>
        {q.heading && <h3>{q.heading}</h3>}
        <p className="question-text">
          <Glossed text={q.question} />
        </p>
        <div className="options">
          {q.options.map((opt, k) => (
            <button key={k} type="button" className={`option ${chosen === k ? 'chosen' : ''}`} onClick={() => setAnswers((a) => ({ ...a, [q.id]: k }))}>
              <span className="letter">{String.fromCharCode(65 + k)}</span>
              {opt}
            </button>
          ))}
        </div>
        <div className="question-actions">
          <button type="button" className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>
            ← Back
          </button>
          <span className="spacer" />
          {i < questions.length - 1 ? (
            <button type="button" className="btn primary" onClick={() => setI(i + 1)}>
              Next →
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={finish}>
              Hand in
            </button>
          )}
        </div>
      </article>
      <div className="lesson-foot">
        <button type="button" className="btn ghost sm" onClick={onDone}>
          Leave without saving
        </button>
      </div>
    </div>
  );
}
