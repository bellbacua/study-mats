import { CURRICULUM_TERMS, LESSONS, SUBJECTS, trackClassState } from '../data/path';
import { useReveal } from '../state/useReveal';

const shortName = (p) => p.split('(')[0].trim();

export default function Roadmap({ progress, nextUp, onOpen, status, dueNow = 0, onReview, spec, sideWeeks = {} }) {
  const done = LESSONS.filter((l) => progress.passed[l.id]).length;
  useReveal([done]);
  return (
    <div className="roadmap">
      <header className="roadmap-head">
        <h1>From counting to materials engineering</h1>
        <p>
          {CURRICULUM_TERMS.length} weeks, three or four classes a week, covering what you need for the first two years of UM’s BS Materials
          Engineering. Math, Chemistry, Physics, Materials and Engineering take turns, and each follows its own history from
          the very beginning.
        </p>
        <div className="roadmap-meter">
          <div className="meter">
            <div style={{ width: `${(done / LESSONS.length) * 100}%` }} />
          </div>
          <span>
            {done} of {LESSONS.length} done
          </span>
          <span className={`save-state ${status}`}>
            {status === 'sqlite' ? (window.__TAURI_INTERNALS__ ? 'Saved on this computer' : 'Saved to data/study_mats.db') : status === 'offline' ? 'Database offline: saving in browser only' : 'Loading…'}
          </span>
        </div>
        {dueNow > 0 && (
          <button type="button" className="continue review-due" onClick={onReview}>
            <span className="eyebrow">Review first</span>
            <strong>
              {dueNow} question{dueNow === 1 ? '' : 's'} from earlier classes are due today
            </strong>
            <span className="continue-meta">A few minutes of recall keeps what you learned. Then carry on with your next class.</span>
          </button>
        )}
        {spec && (
          <button type="button" className="continue spec-due" onClick={spec.go}>
            <span className="eyebrow">{spec.eyebrow}</span>
            <strong>{spec.title}</strong>
            <span className="continue-meta">{spec.meta}</span>
          </button>
        )}
        {nextUp && (
          <button type="button" className="continue" onClick={() => onOpen(nextUp.id)}>
            <span className="eyebrow">
              {done ? 'Continue' : 'Start here'}: {CURRICULUM_TERMS.find((t) => t.id === nextUp.termId)?.title}, {nextUp.day} ·{' '}
              {SUBJECTS[nextUp.track]}
            </span>
            <strong>{nextUp.title}</strong>
            <span className="continue-meta">
              {nextUp.history.era.split('•')[0].trim()} · {shortName(nextUp.history.protagonist)}
            </span>
          </button>
        )}
      </header>

      {CURRICULUM_TERMS.map((term, ti) => {
        const lessons = LESSONS.filter((l) => l.termId === term.id);
        const termDone = lessons.filter((l) => progress.passed[l.id]).length;
        const newStage = ti === 0 || CURRICULUM_TERMS[ti - 1].stage !== term.stage;
        return (
          <section key={term.id} className="term">
            {newStage && (
              <div className="stage-head" data-reveal>
                <h2>{term.stage}</h2>
                <p>{term.stageNote}</p>
              </div>
            )}
            <div className="term-head" data-reveal>
              <h2>{term.title}</h2>
              <span>
                {termDone}/{lessons.length}
              </span>
            </div>
            <ol className="week">
              {lessons.map((l) => {
                const n = LESSONS.indexOf(l) + 1;
                const isDone = !!progress.passed[l.id];
                const isNext = nextUp?.id === l.id;
                return (
                  <li key={l.id} data-reveal>
                    <button
                      type="button"
                      className={`class-card subj-${l.track} ${isDone ? 'done' : ''} ${isNext ? 'next' : ''}`}
                      onClick={() => onOpen(l.id)}
                    >
                      <span className="class-top">
                        <span className="class-day">{l.day}</span>
                        <span className={`subject track-${l.track}`}>{SUBJECTS[l.track] || l.track}</span>
                        <span className="class-num">{isDone ? '✓' : isNext ? 'next' : `#${n}`}</span>
                      </span>
                      <span className="path-title">{l.title}</span>
                      <span className="path-meta">
                        {l.history.era.split('•')[0].split('→')[0].trim()} · {shortName(l.history.protagonist)}
                      </span>
                    </button>
                  </li>
                );
              })}
              {(sideWeeks[term.id] || []).map((l) => {
                const st = trackClassState(l, progress.passed);
                return (
                  <li key={l.id} data-reveal>
                    <button
                      type="button"
                      className={`class-card ge-card subj-${l.track} ${st.done ? 'done' : ''}`}
                      disabled={!st.open}
                      title={st.open ? '' : st.why}
                      onClick={() => onOpen(l.id)}
                    >
                      <span className="class-top">
                        <span className="class-day">GE</span>
                        <span className={`subject track-${l.track}`}>{SUBJECTS[l.track] || l.track}</span>
                        <span className="class-num">{st.done ? '✓' : st.open ? `${l.specIndex + 1}/${l.specCount}` : '🔒'}</span>
                      </span>
                      <span className="path-title">{l.title}</span>
                      <span className="path-meta">
                        {l.history.era.split('•')[0].split('→')[0].trim()} · {shortName(l.history.protagonist)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
