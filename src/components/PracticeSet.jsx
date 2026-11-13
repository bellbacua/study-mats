import { useMemo, useState } from 'react';
import { SUBJECTS } from '../data/path';
import { LEVEL_NAME, SET_SIZE, formOf, nextLevel, pickNext, practicePool, startLevel } from '../state/adaptive';
import { Problem } from './LearnIt';

// The card on the Review page that starts an adaptive practice set.
export function PracticeSetCard({ progress, onStart }) {
  const pool = useMemo(() => practicePool(progress), [progress]);
  const form = formOf(progress.items);
  const lv = startLevel(progress.items);
  const classes = new Set(pool.map((p) => p.lessonId)).size;
  return (
    <section className="review-today pset-card" data-reveal>
      <div>
        <span className="eyebrow">Practice that adjusts</span>
        {pool.length ? (
          <>
            <strong className="pset-title">
              {SET_SIZE} problems from {classes} {classes === 1 ? 'class' : 'classes'} you have worked through
            </strong>
            <span className="notes-hint">
              Starts at <b>{LEVEL_NAME[lv].toLowerCase()}</b> ({form.why}). A clean answer moves you up a level, a miss or a lot of help moves you
              down, so it stays hard enough to teach you without drowning you.
            </span>
          </>
        ) : (
          <>
            <strong className="pset-title">Unlocks after your first “Learn it” part</strong>
            <span className="notes-hint">Finish a part of any class and its problems join a practice set that gets harder or easier as you go.</span>
          </>
        )}
      </div>
      <button type="button" className="btn primary" disabled={!pool.length} onClick={onStart}>
        Start a practice set
      </button>
    </section>
  );
}

export function PracticeSetRunner({ progress, actions, onDone }) {
  const pool = useMemo(() => practicePool(progress), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [level, setLevel] = useState(() => startLevel(progress.items));
  const [used] = useState(() => new Set());
  const [cur, setCur] = useState(() => {
    const p = pickNext(pool, startLevel(progress.items), used, null, progress.items);
    if (p) used.add(p.key);
    return p;
  });
  const [n, setN] = useState(1);
  const [result, setResult] = useState(null); // { ok, help }
  const [log, setLog] = useState([]); // { lv, ok, help, lessonId }

  const total = Math.min(SET_SIZE, pool.length);
  const finished = !cur || n > total;

  if (finished) {
    const clean = log.filter((x) => x.ok && x.help <= 1).length;
    const missed = [...new Set(log.filter((x) => !x.ok || x.help >= 3).map((x) => x.lessonId))];
    const done = log.filter((x) => !x.skip);
    return (
      <div className="report">
        <header className="timeline-head">
          <span className="eyebrow">Practice set done</span>
          <h1>
            {clean} of {done.length} clean
          </h1>
          <p>
            {log.length && log[log.length - 1].lv === 3
              ? 'You finished on the harder problems. Next time it starts there.'
              : 'Each set starts from how your recent answers went, so the next one picks up where this left off.'}
          </p>
        </header>
        <LevelTrail log={log} />
        {missed.length > 0 && (
          <>
            <h2 className="section-title">Worth another look</h2>
            <p className="notes-hint">Problems you missed or needed the first steps for are in your Mistakes notebook to redo.</p>
            <ul className="weak-list">
              {missed.map((id) => {
                const p = pool.find((x) => x.lessonId === id);
                return (
                  <li key={id}>
                    <button type="button" className="tl-link-btn" onClick={() => actions.open(id)}>
                      {p?.title}
                    </button>
                  </li>
                );
              })}
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

  const answer = (right, info) => {
    const ok = info?.gotIt ?? right;
    const help = info?.help || 0;
    actions.noteAnswer({ key: cur.key, lessonId: cur.lessonId, from: 'learn', right });
    actions.noteForm({ ok, help, lv: cur.level });
    setResult({ ok, help });
    setLog((l) => [...l, { lv: cur.level, ok, help, lessonId: cur.lessonId }]);
  };
  const next = () => {
    const r = result || { ok: false, help: 4 };
    // A skip is not saved as a mistake, but the set eases off a level.
    if (!result) setLog((l) => [...l, { lv: cur.level, ok: false, help: 4, lessonId: cur.lessonId, skip: true }]);
    const lv = nextLevel(level, r.ok, r.help);
    setLevel(lv);
    const p = pickNext(pool, lv, used, cur.lessonId, progress.items);
    if (p) used.add(p.key);
    setCur(p);
    setResult(null);
    setN(n + 1);
    window.scrollTo({ top: 0 });
  };
  const moved = result ? nextLevel(level, result.ok, result.help) - level : 0;

  return (
    <div className="practice">
      <div className="practice-dots">
        <span className="eyebrow" style={{ margin: 0 }}>
          Practice set · {n} of {total} · {SUBJECTS[cur.subject] || cur.subject}
        </span>
        <LevelMeter level={cur.level} />
      </div>
      <div className="exam-progress">
        <div style={{ width: `${(n / total) * 100}%` }} />
      </div>
      <p className="notes-hint pset-from">
        From <b>{cur.title}</b> · {cur.part.title}
      </p>
      <div className="part redo-part">
        <Problem key={cur.key} item={cur.item} k={n - 1} part={cur.part} seed={cur.key} onRight={() => {}} onAnswer={answer} />
      </div>
      {result && (
        <p className={`form-note ${moved > 0 ? 'cruising' : ''}`}>
          {moved > 0
            ? 'Clean answer. The next one is a level harder.'
            : moved < 0
              ? 'That one took some help. The next one is a level easier, to rebuild the step.'
              : result.ok && result.help <= 1
                ? 'Clean answer. You are already at the top level.'
                : result.ok
                  ? 'Right, with a solved example to lean on. The next one stays at this level.'
                  : 'The next one is at the easiest level.'}
        </p>
      )}
      <div className="lesson-foot">
        <button type="button" className="btn ghost sm" onClick={onDone}>
          Stop for now (answers so far are saved)
        </button>
        <button type="button" className={`btn ${result ? 'primary' : 'ghost'}`} onClick={next}>
          {n < total ? (result ? 'Next problem →' : 'Skip this one') : 'Finish'}
        </button>
      </div>
    </div>
  );
}

function LevelMeter({ level }) {
  return (
    <span className="level-meter" aria-label={`Level: ${LEVEL_NAME[level]}`}>
      {[1, 2, 3].map((l) => (
        <span key={l} className={`lm-bar ${l <= level ? 'on' : ''} lv${level}`} />
      ))}
      <span className="lm-name">{LEVEL_NAME[level]}</span>
    </span>
  );
}

// The level of each problem in the set, as a small step chart.
function LevelTrail({ log }) {
  if (!log.length) return null;
  return (
    <div className="pset-trail" aria-label="Level of each problem">
      {log.map((x, i) => (
        <div key={i} className="pst-col" title={`Problem ${i + 1}: ${LEVEL_NAME[x.lv]}, ${x.ok && x.help <= 1 ? 'clean' : x.ok ? 'right with help' : 'missed'}`}>
          <div className="pst-track">
            <div className={`pst-bar lv${x.lv} ${x.ok && x.help <= 1 ? 'clean' : x.ok ? 'help' : 'miss'}`} style={{ height: `${(x.lv / 3) * 100}%` }} />
          </div>
          <span>{x.ok && x.help <= 1 ? '✓' : x.ok ? '½' : '✗'}</span>
        </div>
      ))}
      <div className="pst-legend">
        <span>✓ clean</span>
        <span>½ right with help</span>
        <span>✗ missed</span>
      </div>
    </div>
  );
}
