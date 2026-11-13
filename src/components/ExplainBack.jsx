import { useState } from 'react';
import Glossed from './Glossed';
import { niceDate } from '../state/plan';

// "Explain it back": write the idea of the class in your own words, then
// compare with a model explanation built from the class's own Story (its
// "Why it matters" and "The short version", which come from the sources
// listed at the end of the Story tab). Saved as the learner item explain/<class>:
// { text, got: [key ideas you covered], rating: 'well' | 'mostly' | 'missed', tries }.

const RATINGS = [
  ['well', 'I explained it well', 'Great. Teaching an idea is the strongest sign you own it.'],
  ['mostly', 'Mostly, with gaps', 'Good. Add the ideas you missed to your notes in your own words.'],
  ['missed', 'I missed a lot', 'That is useful to know now. Reread “The short version” in the Story tab, then try again tomorrow.'],
];
const words = (t) => t.trim().split(/\s+/).filter(Boolean).length;

export default function ExplainBack({ lesson, saved, sources, onSave, onStory }) {
  const [text, setText] = useState(saved?.text || '');
  const [stage, setStage] = useState(saved?.rating ? 'done' : 'write'); // write → compare → done
  const [got, setGot] = useState(saved?.got || []);
  const ideas = lesson.overtimeDigest || [];
  const takeaway = lesson.history?.takeaway;
  const n = words(text);

  const compare = () => {
    setStage('compare');
    onSave({ text, got, rating: saved?.rating || null, tries: saved?.tries || 0, lessonId: lesson.id });
  };
  const rate = (rating) => {
    setStage('done');
    onSave({ text, got, rating, tries: (saved?.tries || 0) + 1, lessonId: lesson.id });
  };
  const toNotes = () =>
    window.dispatchEvent(new CustomEvent('notes:add', { detail: `\n**In my own words:** ${text.trim()}\n` }));

  return (
    <section className="explain" data-reveal>
      <div className="explain-head">
        <span className="eyebrow">Explain it back</span>
        {saved?.rating && <span className={`pill ${saved.rating === 'well' ? 'ok' : saved.rating === 'missed' ? 'warn' : ''}`}>{RATINGS.find((r) => r[0] === saved.rating)?.[1]}</span>}
      </div>
      <h2>Teach this class to a friend who missed it</h2>
      <p className="notes-hint">
        Close the other tabs in your head and write, in plain words: what the idea is, why it matters, and one example. No copying. If you get
        stuck, that is exactly the part you have not understood yet.
      </p>

      <textarea
        className="explain-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={stage !== 'write'}
        rows={6}
        placeholder={`${lesson.title.split(':')[0]} is about …`}
        aria-label="Your explanation"
      />
      <div className="explain-row">
        <span className="notes-hint">
          {n} word{n === 1 ? '' : 's'}
          {stage === 'write' && n > 0 && n < 30 ? ' · try for 40 or more' : ''}
          {saved?.at && stage !== 'write' ? ` · saved ${niceDate(new Date(saved.at).toISOString().slice(0, 10), { day: 'numeric', month: 'short' })}` : ''}
        </span>
        {stage === 'write' ? (
          <button type="button" className="btn primary" disabled={n < 5} onClick={compare}>
            Compare with a model explanation →
          </button>
        ) : (
          <span className="explain-row-actions">
            <button type="button" className="btn ghost sm" onClick={toNotes}>
              📌 Add to my notes
            </button>
            <button type="button" className="btn ghost sm" onClick={() => (setStage('write'), setGot([]))}>
              Write it again
            </button>
          </span>
        )}
      </div>

      {stage !== 'write' && (
        <div className="explain-model">
          <span className="eyebrow">A model explanation</span>
          {takeaway && (
            <p className="explain-takeaway">
              <Glossed text={takeaway} />
            </p>
          )}
          <p className="notes-hint">Tick each key idea your explanation covered, even in different words.</p>
          <ul className="explain-ideas">
            {ideas.map((b, i) => (
              <li key={i}>
                <label>
                  <input
                    type="checkbox"
                    checked={got.includes(i)}
                    disabled={stage === 'done'}
                    onChange={() => setGot((g) => (g.includes(i) ? g.filter((x) => x !== i) : [...g, i]))}
                  />
                  <span>
                    <Glossed text={b} />
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="explain-src notes-hint">
            From this class’s Story (“Why it matters” and “The short version”), which draws on{' '}
            {sources.slice(0, 3).map((s, i) => (
              <span key={s.url}>
                {i ? (i === Math.min(3, sources.length) - 1 ? ' and ' : ', ') : ''}
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label.replace(/^Wikipedia: /, '')}
                </a>
              </span>
            ))}
            {sources.length > 3 ? ` and ${sources.length - 3} more in the Sources list` : ''}.{' '}
            <button type="button" className="tl-link-btn" onClick={onStory}>
              Open the Story
            </button>
          </p>

          {stage === 'compare' ? (
            <div className="explain-rate">
              <span className="eyebrow">How did you do? ({got.length} of {ideas.length} ideas)</span>
              <div className="plan-chips">
                {RATINGS.map(([id, label]) => (
                  <button key={id} type="button" className="chip" onClick={() => rate(id)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className={`explain-verdict ${saved?.rating || ''}`}>{RATINGS.find((r) => r[0] === saved?.rating)?.[2]}</p>
          )}
        </div>
      )}
    </section>
  );
}
