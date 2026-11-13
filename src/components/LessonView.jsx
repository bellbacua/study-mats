import { lazy, Suspense, useEffect, useState } from 'react';
import MathFormula from './MathFormula';
import Glossed from './Glossed';
import Cited, { citesOf } from './Cited';
import StoryCards from './StoryCards';
import LostHelp from './LostHelp';
import { HELP } from '../data/help';
import { usePrefs } from '../state/prefs';
import { setPlace } from '../state/detour';
import { classMinutes, storyMinutes, fmtMinutes } from '../state/plan';
import Pictures from './Pictures';
import { useReveal } from '../state/useReveal';
import Practice from './Practice';
import { READINGS as LESSON_READINGS, UM_COURSES, PROGRAM, whereLabel } from '../data/path';
import { LABS } from '../data/labs';
import { LEGENDS } from '../data/legends';
import { DEEP } from '../data/deep';
import LearnIt, { Predict } from './LearnIt';
import ExplainBack from './ExplainBack';
import { partKey, questionKey } from '../state/mistakes';

const SceneView = lazy(() => import('./SceneView'));

// Every class lists where its story and numbers come from. Written sources
// come first (cited in the text as [1], [2] ...), then the class readings.
export function lessonSources(lesson) {
  const own = lesson.sources || [];
  const reads = (LESSON_READINGS[lesson.id] || []).filter((r) => r.url && !own.some((o) => o.url === r.url));
  return [...own, ...reads.map((r) => ({ label: `${r.source}: ${r.title}`, url: r.url, note: r.whyRead || '' }))];
}

function Sources({ lesson }) {
  const list = lessonSources(lesson);
  if (!list.length) return null;
  return (
    <section className="sources" data-reveal>
      <span className="eyebrow">Sources</span>
      <ol>
        {list.map((s, i) => (
          <li key={i} id={`src-${i + 1}`}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
            {s.note && <span className="notes-hint"> · {s.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}

// Sends a prompt into this class's notes (NotesPanel listens for it).
const addToNotes = (text) => window.dispatchEvent(new CustomEvent('notes:add', { detail: text }));
const Pin = ({ text, label = 'Add to my notes' }) => (
  <button type="button" className="pin" title={label} aria-label={label} onClick={() => addToNotes(text)}>
    📌
  </button>
);

const BASE_TABS = [
  { id: 'story', label: 'Story', hint: 'Who figured this out, and why' },
  { id: 'explore', label: 'See it', hint: 'Animated, step by step' },
  { id: 'practice', label: 'Practice', hint: 'Check you have it' },
  { id: 'deeper', label: 'Go deeper', hint: 'Readings & your notes' },
];

const LEARN_TAB = { id: 'learn', label: 'Learn it', hint: 'Parts, examples, your turn' };

export default function LessonView({ lesson, index, total, progress, actions, prevLesson, nextLesson, opening, detour }) {
  const deep = DEEP[lesson.id];
  const TABS = deep ? [BASE_TABS[0], BASE_TABS[1], LEARN_TAB, { ...BASE_TABS[2], label: 'Class quiz', hint: 'Pass to finish the class' }, BASE_TABS[3]] : BASE_TABS;
  const [tab, setTab] = useState('story');
  const [step, setStep] = useState(0);
  const [card, setCard] = useState(0);
  const [prefs, setPrefs] = usePrefs();
  const help = HELP[lesson.id];
  const cards = prefs.story !== 'page';

  // Opened from the study plan or the mistakes notebook: start on that tab.
  const startTab = opening?.id === lesson.id && TABS.some((t) => t.id === opening.tab) ? opening.tab : 'story';
  useEffect(() => {
    setTab(startTab);
    setStep(opening?.id === lesson.id && opening.step != null ? opening.step : 0);
    setCard(opening?.id === lesson.id && opening.card != null ? opening.card : 0);
    if (opening?.id === lesson.id && opening.scroll) setTimeout(() => document.getElementById(opening.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  }, [lesson.id, opening?.n]); // eslint-disable-line react-hooks/exhaustive-deps

  useReveal([lesson.id, tab, step, card, cards]);
  // Remembered so a side trip to an earlier class can come back to this spot.
  useEffect(() => setPlace({ id: lesson.id, tab, card, step }), [lesson.id, tab, card, step]);
  const toCard = (k) => {
    setCard(k);
    document.querySelector('.sc')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const go = (t) => {
    setTab(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const tabIdx = TABS.findIndex((t) => t.id === tab);
  const h = lesson.history;
  const steps = lesson.guidedSteps;
  const s = steps[step];

  const ending = (
    <>
          <aside className="takeaway">
            <span className="eyebrow">Why it matters</span>
            <Pin text={`\n> ${h.takeaway}\n- Why this matters, in my own words: `} />
            <p>
              <Glossed text={h.takeaway} />
            </p>
          </aside>
          <div className="short-version">
            <span className="eyebrow">The short version</span>
            <span className="importance must">⭐ Must know · this is what the quizzes test</span>
            <ul>
              {lesson.overtimeDigest.map((b, i) => (
                <li key={i}>
                  <Glossed text={b} /> <Pin text={`\n> ${b}\n- In my own words: `} />
                </li>
              ))}
            </ul>
          </div>
    </>
  );

  return (
    <div className="lesson">
      {detour && detour.id !== lesson.id && (
        <div className="detour" role="status">
          <span>
            You stepped back to fill a gap. Take what you need, then carry on with <strong>{detour.title}</strong>.
          </span>
          <button type="button" className="btn primary sm" onClick={actions.back}>
            ← Back to where I was
          </button>
        </div>
      )}
      <header className="lesson-head">
        <div className="lesson-crumbs">
          <span className={`track track-${lesson.track}`}>{lesson.code}</span>
          <span>
            {lesson.spec || lesson.from ? `${whereLabel(lesson)} · class ${index + 1} of ${total}` : `Week ${lesson.termId?.replace('week-', '')} · ${lesson.day} · class ${index + 1} of ${total}`}
          </span>
          <span className="pill time" title={`Story and animation about ${fmtMinutes(storyMinutes(lesson))}; the whole class, with practice, about ${fmtMinutes(classMinutes(lesson))}`}>
            ⏱ about {fmtMinutes(classMinutes(lesson))}
          </span>
          {progress.passed[lesson.id] && <span className="pill ok">✓ done</span>}
        </div>
        <h1>{lesson.title}</h1>
        <p className="lesson-sub">{lesson.subtitle}</p>
        {lesson.um?.length > 0 && (
          <p className="um-tags">
            <span>{lesson.from ? 'Part of' : PROGRAM.tagLabel}</span>
            {lesson.um.map((c) => (
              <span key={c} className="um-tag" title={UM_COURSES[c] || ''}>
                <strong>{c}</strong> {UM_COURSES[c]}
              </span>
            ))}
          </p>
        )}
      </header>

      <nav className="tabs" aria-label="Lesson sections">
        {TABS.map((t, i) => (
          <button key={t.id} type="button" className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => go(t.id)}>
            <span className="tab-num">{i + 1}</span>
            <span>
              <span className="tab-label">{t.label}</span>
              <span className="tab-hint">{t.hint}</span>
            </span>
          </button>
        ))}
      </nav>

      {tab === 'story' && (
        <section className="story">
          <div className="era">
            <span>{h.era}</span>
            <strong>{h.protagonist}</strong>
          </div>
          <h2 className="hook">{h.hook}</h2>
          <span className="importance good">📖 Good to know · the story behind it. Note who, when and why in one line.</span>
          {(!cards || card === 0) && <Pictures sources={lessonSources(lesson)} />}
          {cards ? (
            <StoryCards
              lesson={lesson}
              help={help}
              card={card}
              setCard={toCard}
              legends={LEGENDS[lesson.id]}
              onDetour={actions.detour}
              onWhole={() => setPrefs({ story: 'page' })}
              ending={
                <>
                  {ending}
                  <div className="sc-done">
                    <button type="button" className="btn primary" onClick={() => go('explore')}>
                      Now see it move →
                    </button>
                  </div>
                </>
              }
            />
          ) : (
            <>
              <button type="button" className="sc-whole page" onClick={() => setPrefs({ story: 'cards' })}>
                Show one card at a time, with quick checks
              </button>
              <div className="narrative">
                {h.narrative.map((p, i) => (
                  <div key={i} data-reveal>
                    <p>
                      <Cited text={p} />
                    </p>
                    {LEGENDS[lesson.id]?.[i] && (
                      <details className="legend-tag">
                        <summary title="This story may not have happened as told">Legend? What we actually know</summary>
                        <span>{LEGENDS[lesson.id][i]}</span>
                      </details>
                    )}
                    <LostHelp key={`${lesson.id}:${i}`} lesson={lesson} text={p} cites={citesOf(p)} entry={help?.p?.[i]} onDetour={actions.detour} />
                  </div>
                ))}
              </div>
              {ending}
            </>
          )}
          <Sources lesson={lesson} />
        </section>
      )}

      {tab === 'explore' && (
        <section className="explore">
          <Predict key={lesson.id} predict={deep?.predict}>
          <Suspense fallback={<div className="scene-loading">Loading animation…</div>}>
            <SceneView
              type={lesson.visualLab.type}
              mission={lesson.visualLab.missionPrompt}
              beat={step}
              goalDone={!!progress.labs[lesson.id]}
              onGoal={() => actions.markLab(lesson.id)}
            />
          </Suspense>
          </Predict>

          <div className="steps">
            <div className="steps-bar">
              {steps.map((st, i) => (
                <button key={i} type="button" className={`step-chip ${i === step ? 'on' : ''}`} onClick={() => setStep(i)}>
                  {i + 1}
                </button>
              ))}
              <span className="steps-title">Step {step + 1} of {steps.length}</span>
            </div>
            <article className="step">
              <span className="importance must">⭐ Must know</span>
              <h3>
                {s.title.replace(/^\d+\.\s*/, '')}{' '}
                <Pin
                  label="Add this formula to my notes"
                  text={`\n- **${s.title.replace(/^\d+\.\s*/, '')}**: $${s.formula}$\n  - What each symbol means: `}
                />
              </h3>
              <div className="formula">
                <MathFormula tex={s.formula} />
              </div>
              <p>
                <Glossed text={s.explanation} />
              </p>
              <LostHelp
                key={`${lesson.id}:step:${step}`}
                lesson={lesson}
                text={`${s.title} ${s.explanation}`}
                cites={citesOf(h.narrative[h.narrative.length - 1] || '')}
                entry={help?.s?.[step]}
                onDetour={actions.detour}
                label="I’m lost on this step"
              />
              <div className="step-nav">
                <button type="button" className="btn ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
                  ← Previous step
                </button>
                {step < steps.length - 1 ? (
                  <button type="button" className="btn primary" onClick={() => setStep(step + 1)}>
                    Next step →
                  </button>
                ) : (
                  <button type="button" className="btn primary" onClick={() => go(deep ? 'learn' : 'practice')}>
                    {deep ? 'Learn it, part by part →' : 'Try the practice →'}
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>
      )}

      {tab === 'learn' && deep && (
        <LearnIt
          lessonId={lesson.id}
          deep={deep}
          done={(n) => !!progress.readings[`part:${lesson.id}:${n}`]}
          onPartDone={(n) => actions.markPart(lesson.id, n)}
          onFinish={() => go('practice')}
          onAnswer={(part, k, right) => actions.noteAnswer({ key: partKey(lesson.id, part, k), lessonId: lesson.id, from: 'learn', right })}
          startPart={opening?.id === lesson.id && opening.part != null ? opening.part : 0}
        />
      )}

      {tab === 'practice' && (
        <>
          <Practice
            lesson={lesson}
            passed={!!progress.passed[lesson.id]}
            onPass={(score) => actions.pass(lesson.id, score)}
            onAttempt={(id, right) => actions.noteAnswer({ key: questionKey(id), lessonId: lesson.id, from: 'quiz', right })}
            nextLesson={nextLesson}
            onNext={() => nextLesson && actions.open(nextLesson.id)}
          />
          <div id="explain-back">
            <ExplainBack
              key={lesson.id}
              lesson={lesson}
              saved={progress.items?.explain?.[lesson.id]}
              sources={lessonSources(lesson)}
              onSave={(data) => actions.setItem('explain', lesson.id, data)}
              onStory={() => go('story')}
            />
          </div>
        </>
      )}

      {tab === 'deeper' && (
        <section className="deeper">
          {LABS[lesson.id] && (
            <>
              <h2>Try it for real</h2>
              <div className="labs">
                {LABS[lesson.id].map((lab, i) => (
                  <article key={i} className={`lab lab-${lab.kind}`} data-reveal>
                    <span className="lab-kind">
                      {lab.kind === 'online' ? 'Free online lab' : lab.kind === 'software' ? 'Free / open-source software' : 'At home'}
                    </span>
                    <h3>
                      {lab.url ? (
                        <a href={lab.url} target="_blank" rel="noopener noreferrer">
                          {lab.tool} ↗
                        </a>
                      ) : (
                        lab.tool
                      )}
                    </h3>
                    <p>{lab.task}</p>
                  </article>
                ))}
              </div>
            </>
          )}
          <h2>Readings</h2>
          <div className="readings">
            {(LESSON_READINGS[lesson.id] || []).map((r) => (
              <Reading key={r.id} r={r} done={!!progress.readings[r.id]} onToggle={() => actions.toggleReading(r.id)} />
            ))}
          </div>
          <p className="notes-hint">Your notes for this class live in the Notes panel on the edge of the screen (Ctrl + .).</p>
        </section>
      )}

      <footer className="lesson-foot">
        {tabIdx > 0 ? (
          <button type="button" className="btn ghost" onClick={() => go(TABS[tabIdx - 1].id)}>
            ← {TABS[tabIdx - 1].label}
          </button>
        ) : prevLesson ? (
          <button type="button" className="btn ghost" onClick={() => actions.open(prevLesson.id)}>
            ← Previous lesson
          </button>
        ) : (
          <span />
        )}
        {tabIdx < TABS.length - 1 ? (
          <button type="button" className="btn primary" onClick={() => go(TABS[tabIdx + 1].id)}>
            {TABS[tabIdx + 1].label} →
          </button>
        ) : nextLesson ? (
          <button type="button" className="btn primary" onClick={() => actions.open(nextLesson.id)}>
            Next lesson →
          </button>
        ) : (
          <span />
        )}
      </footer>
    </div>
  );
}

function Reading({ r, done, onToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`reading ${done ? 'done' : ''}`}>
      <div className="reading-top">
        <span className="reading-src">
          {r.type} · {r.source} · {r.readTime}
        </span>
        <label className="check">
          <input type="checkbox" checked={done} onChange={onToggle} /> read
        </label>
      </div>
      <h3>{r.title}</h3>
      <p>{r.whyRead}</p>
      <div className="reading-actions">
        <button type="button" className="btn ghost sm" onClick={() => setOpen(!open)}>
          {open ? 'Hide summary' : 'Read the summary here'}
        </button>
        <a href={r.url} target="_blank" rel="noopener noreferrer" className="btn ghost sm">
          Open source ↗
        </a>
      </div>
      {open && <div className="excerpt">{r.inAppExcerpt}</div>}
    </article>
  );
}
