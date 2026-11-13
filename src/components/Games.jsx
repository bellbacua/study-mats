import { useEffect, useMemo, useState } from 'react';
import { MICROGRAPHS } from '../data/library/micrographs';
import { ESTIMATES, EST_TOPICS } from '../data/library/estimates';
import { findPics } from './MicrographGallery';
import { ClassChips, Sources } from './LibBits';

// Two Library games, siblings of the design challenges and failure detective:
// "Spot the microstructure" (name a real microscope picture) and
// "Estimate it" (guess the size of a number on a powers-of-ten slider).

const norm = (s) => (s || '').toLowerCase();
const hit = (q, ...fields) => !q || fields.some((f) => norm(f).includes(q));
const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
// Not-yet-done items first, each group in a random order.
const freshFirst = (list, done) => [...shuffle(list.filter((x) => !done(x))), ...shuffle(list.filter(done))];

const Stars = ({ n, of = 3 }) => (
  <span className="ch-stars" aria-label={`${n} of ${of} stars`}>
    {'★'.repeat(n)}
    <span>{'★'.repeat(of - n)}</span>
  </span>
);

// ================================================================ spot the microstructure

const ROUND = 8;
const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/) || [t])[0].trim();
// Hide the words that would give the answer away (the same words the picture's
// own description must contain).
const redact = (m, text) => text.replace(new RegExp(`[\\wÀ-ž]*(?:${m.must.source})[\\wÀ-ž]*`, 'gi'), '▢▢▢');

function pickOptions(m) {
  const others = shuffle(MICROGRAPHS.filter((x) => x.id !== m.id));
  const same = others.filter((x) => x.kind === m.kind).slice(0, 2);
  const rest = others.filter((x) => !same.includes(x)).slice(0, 3 - same.length);
  return shuffle([m, ...same, ...rest]);
}

// Find a picture for m whose description names m and none of the wrong options,
// so the right answer is never in doubt. Gives null when offline.
async function loadItem(m) {
  const pics = await findPics(m);
  if (pics == null) return null;
  for (let tries = 0; tries < 3; tries++) {
    const options = pickOptions(m);
    const fair = pics.filter((p) => options.every((o) => o.id === m.id || !(o.must.test(p.desc) || o.must.test(p.title))));
    if (fair.length) return { m, options, pic: fair[Math.floor(Math.random() * fair.length)] };
  }
  return { m, skip: true };
}

function Credit({ p }) {
  return (
    <figcaption className="gm-credit">
      <q>{p.desc.length > 260 ? `${p.desc.slice(0, 260)}…` : p.desc}</q>{' '}
      <span>
        ({p.artist ? `${p.artist}, ` : ''}
        {p.licence || 'see licence'}, via Wikimedia Commons,{' '}
        <a href={p.page} target="_blank" rel="noreferrer">
          file page
        </a>
        )
      </span>
    </figcaption>
  );
}

function SpotRound({ progress, onMark, onShelf, onExit }) {
  const [queue] = useState(() => freshFirst(MICROGRAPHS, (m) => progress.readings[`spot:${m.id}`]));
  const [pos, setPos] = useState(0);
  const [item, setItem] = useState(undefined); // undefined loading, null offline
  const [tried, setTried] = useState([]);
  const [clue, setClue] = useState(false);
  const [solved, setSolved] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);
  const over = finished || (pos >= queue.length && item === undefined);

  useEffect(() => {
    if (pos >= queue.length) return undefined;
    let live = true;
    setItem(undefined);
    loadItem(queue[pos]).then((it) => {
      if (!live) return;
      if (it?.skip) setPos((p) => p + 1);
      else setItem(it);
    });
    return () => {
      live = false;
    };
  }, [pos, queue]);

  const stars = Math.max(1, 3 - tried.length - (clue ? 1 : 0));
  const guess = (o) => {
    if (o.id === item.m.id) {
      setSolved(true);
      setResults((r) => [...r, { m: item.m, stars, first: !tried.length }]);
      if (!tried.length) onMark(`spot:${item.m.id}`);
    } else if (!tried.includes(o.id)) setTried([...tried, o.id]);
  };
  const next = () => {
    if (results.length >= ROUND) {
      setFinished(true);
      return;
    }
    setTried([]);
    setClue(false);
    setSolved(false);
    setItem(undefined);
    setPos((p) => p + 1);
  };

  if (over) {
    const total = results.reduce((s, r) => s + r.stars, 0);
    return (
      <article className="lib-detail ch-open gm-sum" style={{ '--subj': 'var(--purple)' }}>
        <span className="eyebrow">Round finished</span>
        <h2>
          <Stars n={Math.round((3 * total) / Math.max(1, 3 * results.length))} /> {total} of {3 * results.length} stars
        </h2>
        <p className="ch-lead">
          {results.filter((r) => r.first).length} of {results.length} named on the first try.{' '}
          {total >= 2.5 * results.length ? 'A sharp eye: a metallographer would be pleased.' : 'The ones you missed are worth a look on the Microscope pictures shelf, then try again.'}
        </p>
        <ul className="gm-list">
          {results.map((r, i) => (
            <li key={`${r.m.id}${i}`} className={r.first ? 'ok' : ''}>
              <Stars n={r.stars} /> {r.m.name}
            </li>
          ))}
        </ul>
        <div className="ch-actions">
          <button type="button" className="btn primary sm" onClick={onExit(true)}>
            Play another round
          </button>
          <button type="button" className="btn ghost sm" onClick={() => onShelf('micro')}>
            Study the pictures
          </button>
          <button type="button" className="btn ghost sm" onClick={onExit(false)}>
            Done
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="lib-detail ch-open gm-spot" style={{ '--subj': 'var(--purple)' }}>
      <div className="gm-top">
        <button type="button" className="btn ghost sm" onClick={onExit(false)}>
          ← Leave the round
        </button>
        <span className="gm-count">
          Picture {results.length + (solved ? 0 : 1)} of {ROUND}
          <i style={{ '--p': `${(100 * results.length) / ROUND}%` }} />
        </span>
      </div>
      {item === null ? (
        <div className="mg-wait">
          The pictures come live from Wikimedia Commons, so this game needs the internet. Check your connection and try again.
          <div className="ch-actions gm-center">
            <button type="button" className="btn ghost sm" onClick={onExit(true)}>
              Try again
            </button>
          </div>
        </div>
      ) : !item ? (
        <div className="mg-wait gm-frame">Finding a real microscope picture…</div>
      ) : (
        <>
          <figure className="gm-pic">
            <div className="gm-frame">
              <img src={item.pic.thumb} alt={solved ? item.pic.desc.slice(0, 140) : 'A microscope picture to name'} />
            </div>
            {solved && <Credit p={item.pic} />}
          </figure>
          <h4>{solved ? 'Named!' : 'What does this picture show?'}</h4>
          <div className="gm-opts">
            {item.options.map((o) => {
              const wrong = tried.includes(o.id);
              const right = solved && o.id === item.m.id;
              return (
                <div key={o.id}>
                  <button type="button" className={`ch-opt ${wrong ? 'wrong' : ''} ${right ? 'right' : ''}`} onClick={() => guess(o)} disabled={solved || wrong}>
                    <span className="eyebrow">{o.kind}</span>
                    {o.name}
                  </button>
                  {wrong && <p className="ch-no">Not this. {o.name.split(' (')[0]} would show: {firstSentence(o.look).toLowerCase()}</p>}
                </div>
              );
            })}
          </div>
          {!solved && (
            <div className="ch-actions">
              {clue ? (
                <p className="gm-clue">
                  <strong>Clue: </strong>
                  {redact(item.m, item.m.look)}
                </p>
              ) : (
                <button type="button" className="btn ghost sm" onClick={() => setClue(true)}>
                  Give me a clue (costs a star)
                </button>
              )}
            </div>
          )}
          {solved && (
            <div className="ch-result">
              <div className="ch-verdict v-best">
                <Stars n={stars} />
                <strong>{item.m.name}</strong>
                <p>
                  {tried.length ? `Found after ${tried.length} wrong ${tried.length === 1 ? 'guess' : 'guesses'}` : 'Right first time'}
                  {clue ? ', with a clue.' : '.'} The picture’s own description (quoted above, written by whoever took or uploaded it) confirms what it shows.
                </p>
              </div>
              <h4>What to notice</h4>
              <p className="ch-lead">{item.m.look}</p>
              <h4>Why it matters</h4>
              <p className="ch-lead">{item.m.why}</p>
              <div className="ch-actions">
                <button type="button" className="btn primary sm" onClick={next} autoFocus>
                  {results.length >= ROUND ? 'See my score' : 'Next picture'}
                </button>
              </div>
              <Sources list={item.m.sources} />
            </div>
          )}
        </>
      )}
    </article>
  );
}

export function SpotShelf({ q, progress, onMark, onShelf }) {
  const [round, setRound] = useState(0); // 0 = not playing; a new number starts a fresh round
  const exit = (again) => () => setRound(again ? round + 1 : 0);
  if (round) return <SpotRound key={round} progress={progress} onMark={onMark} onShelf={onShelf} onExit={exit} />;
  const spotted = MICROGRAPHS.filter((m) => progress.readings[`spot:${m.id}`]).length;
  const list = MICROGRAPHS.filter((m) => hit(q, m.name, m.kind, m.look));
  return (
    <>
      <div className="lib-detail gm-hero" style={{ '--subj': 'var(--purple)' }}>
        <span className="gm-hero-icon" aria-hidden="true">
          🧩
        </span>
        <div>
          <strong>Eight real microscope pictures. Name each one.</strong>
          <p>
            Each picture is a real photo from Wikimedia Commons, picked live. It is used only if its own description names the right answer and none of the wrong ones, so there is never a trick. A wrong pick tells you what that structure would look like instead. You have spotted {spotted} of {MICROGRAPHS.length} on the first try.
          </p>
          <div className="ch-actions">
            <button type="button" className="btn primary sm" onClick={() => setRound(1)}>
              Start a round
            </button>
            <button type="button" className="btn ghost sm" onClick={() => onShelf('micro')}>
              Learn them first
            </button>
          </div>
        </div>
      </div>
      <h4 className="gm-h">Your spotter’s card</h4>
      <div className="gm-card-grid">
        {list.map((m) => {
          const done = progress.readings[`spot:${m.id}`];
          return (
            <div key={m.id} className={`gm-tick ${done ? 'done' : ''}`}>
              <span aria-hidden="true">{done ? '✓' : '○'}</span>
              <span>
                <span className="eyebrow">{m.kind}</span>
                {m.name}
              </span>
            </div>
          );
        })}
        {!list.length && <p className="lib-hint">Nothing matches.</p>}
      </div>
    </>
  );
}

// ================================================================ estimate it

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => [...String(n)].map((c) => SUP[c]).join('');
const groupNum = (v, sig) => Number(v.toPrecision(sig)).toLocaleString('en', { maximumSignificantDigits: sig });
// A number as a person would say it: 7,800 · 1.9 billion · 4 × 10²²
function say(v, sig = 2) {
  const r = Number(v.toPrecision(sig));
  const e = Math.floor(Math.log10(r));
  if (e >= 15 || e < -3) {
    const mant = Number((r / 10 ** e).toPrecision(sig));
    return `${mant === 1 ? '' : `${mant} × `}10${sup(e)}`;
  }
  if (e >= 12) return `${groupNum(r / 1e12, sig)} trillion`;
  if (e >= 9) return `${groupNum(r / 1e9, sig)} billion`;
  if (e >= 6) return `${groupNum(r / 1e6, sig)} million`;
  return groupNum(r, sig);
}
const tick = (e) => (e >= 4 || e <= -3 ? `10${sup(e)}` : String(10 ** e));

function starsFor(off) {
  if (off <= 2) return 3;
  if (off <= 10) return 2;
  if (off <= 100) return 1;
  return 0;
}
const VERDICT = ['More than 100 times off. Look at how the estimate is built below.', 'Within ×100: the right neighbourhood.', 'Within ×10: you got the size right.', 'Within ×2: an excellent estimate.'];

function Scale({ lo, hi, guess, truth }) {
  const span = hi - lo;
  const at = (x) => `${(100 * (x - lo)) / span}%`;
  const step = span > 10 ? 2 : 1;
  const ticks = [];
  for (let k = Math.ceil(lo); k <= hi; k += 1) if ((k - Math.ceil(lo)) % step === 0) ticks.push(k);
  return (
    <div className="gm-scale">
      {truth != null && <span className="gm-band" style={{ left: at(Math.max(lo, truth - 1)), right: `${100 - (100 * (Math.min(hi, truth + 1) - lo)) / span}%` }} />}
      {ticks.map((k) => (
        <span key={k} className="gm-tickmark" style={{ left: at(k) }}>
          <em>{tick(k)}</em>
        </span>
      ))}
      {truth != null && <span className="gm-mark truth" style={{ left: at(truth) }} title="The real value" />}
      {guess != null && truth != null && <span className="gm-mark guess" style={{ left: at(guess) }} title="Your guess" />}
    </div>
  );
}

function Estimate({ x, n, of, byId, progress, onOpen, onMark, onScore, onNext, onBack, last }) {
  const [g, setG] = useState((x.lo + x.hi) / 2);
  const [locked, setLocked] = useState(false);
  const truth = Math.log10(x.value);
  const guess = 10 ** g;
  const off = Math.max(guess / x.value, x.value / guess);
  const stars = starsFor(off);
  const topic = EST_TOPICS.find((t) => t.id === x.topic);
  const lock = () => {
    setLocked(true);
    onScore(stars);
    if (stars >= 2) onMark(`est:${x.id}`);
  };
  const dir = guess > x.value ? 'too high' : 'too low';
  return (
    <article className="lib-detail ch-open gm-est" style={{ '--subj': 'var(--gold)' }}>
      <div className="gm-top">
        <button type="button" className="btn ghost sm" onClick={onBack}>
          ← All questions
        </button>
        {of > 1 && (
          <span className="gm-count">
            Question {n} of {of}
            <i style={{ '--p': `${(100 * (n - 1 + (locked ? 1 : 0))) / of}%` }} />
          </span>
        )}
      </div>
      <span className="eyebrow">
        {topic?.icon} {topic?.label}
      </span>
      <h2 className="gm-q">{x.q}</h2>
      <div className={`gm-guess ${locked ? 'locked' : ''}`}>
        <output aria-live="polite">
          <span className="gm-say">{say(guess)}</span> <span className="gm-unit">{x.unit}</span>
        </output>
        <input
          type="range"
          min={x.lo}
          max={x.hi}
          step="0.01"
          value={g}
          disabled={locked}
          onChange={(ev) => setG(Number(ev.target.value))}
          aria-label="Your guess, on a powers-of-ten scale"
          aria-valuetext={`${say(guess)} ${x.unit}`}
        />
        <Scale lo={x.lo} hi={x.hi} guess={locked ? g : null} truth={locked ? truth : null} />
        {!locked && (
          <p className="gm-help">
            Each mark is ten times the one before it. Slide to your guess. Being within ten times of the real value counts as getting the size right.
          </p>
        )}
      </div>
      {!locked ? (
        <div className="ch-actions">
          <button type="button" className="btn primary sm" onClick={lock}>
            Lock in my guess
          </button>
        </div>
      ) : (
        <div className="ch-result">
          <div className={`ch-verdict ${['v-fail', 'v-poor', 'v-good', 'v-best'][stars]}`}>
            <Stars n={stars} />
            <strong>
              The real value: {say(x.value, 3)} {x.unit}
            </strong>
            <p>
              You said {say(guess)} {x.unit}
              {off < 1.15 ? ': almost exactly right. ' : `, about ${say(off)} times ${dir}. `}
              {VERDICT[stars]}
            </p>
            <p className="gm-legend">
              <span className="gm-dot truth" /> real value <span className="gm-dot guess" /> your guess <span className="gm-dot band" /> within ×10
            </p>
          </div>
          <h4>One way to work it out</h4>
          <ol className="ch-clues">
            {x.think.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <h4>What the number tells you</h4>
          <p className="ch-lead">{x.fact}</p>
          <div className="ch-actions">
            <button type="button" className="btn primary sm" onClick={onNext} autoFocus>
              {last ? (of > 1 ? 'See my score' : 'Back to the questions') : 'Next question'}
            </button>
          </div>
          <ClassChips ids={x.classes || []} byId={byId} progress={progress} onOpen={onOpen} />
          <Sources list={x.sources} />
        </div>
      )}
    </article>
  );
}

function EstimateRound({ ids, byId, progress, onOpen, onMark, onExit }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState([]);
  const list = useMemo(() => ids.map((id) => ESTIMATES.find((x) => x.id === id)), [ids]);
  if (i >= list.length) {
    const total = score.reduce((s, v) => s + v, 0);
    return (
      <article className="lib-detail ch-open gm-sum" style={{ '--subj': 'var(--gold)' }}>
        <span className="eyebrow">Round finished</span>
        <h2>
          {total} of {3 * list.length} stars
        </h2>
        <p className="ch-lead">
          You got the size right (within ×10) on {score.filter((s) => s >= 2).length} of {list.length}. Physicist Enrico Fermi was famous for questions like these: break a big unknown into small guesses you can make, multiply, and you will usually land within ten times of the truth.
        </p>
        <div className="ch-actions">
          <button type="button" className="btn primary sm" onClick={onExit(true)}>
            Play another round
          </button>
          <button type="button" className="btn ghost sm" onClick={onExit(false)}>
            Done
          </button>
        </div>
        <Sources list={[{ title: 'Wikipedia: Fermi problem', url: 'https://en.wikipedia.org/wiki/Fermi_problem' }]} />
      </article>
    );
  }
  const x = list[i];
  return (
    <Estimate
      key={`${x.id}${i}`}
      x={x}
      n={i + 1}
      of={list.length}
      last={i === list.length - 1}
      byId={byId}
      progress={progress}
      onOpen={onOpen}
      onMark={onMark}
      onScore={(s) => setScore((v) => [...v, s])}
      onNext={list.length === 1 ? onExit(false) : () => setI(i + 1)}
      onBack={onExit(false)}
    />
  );
}

export function EstimateShelf({ q, byId, progress, onOpen, onMark }) {
  const [play, setPlay] = useState(null); // { ids, n }
  const start = (ids) => setPlay({ ids, n: (play?.n || 0) + 1 });
  const random = () => start(freshFirst(ESTIMATES, (x) => progress.readings[`est:${x.id}`]).slice(0, 5).map((x) => x.id));
  const exit = (again) => () => (again ? random() : setPlay(null));
  if (play) return <EstimateRound key={play.n} ids={play.ids} byId={byId} progress={progress} onOpen={onOpen} onMark={onMark} onExit={exit} />;
  const right = ESTIMATES.filter((x) => progress.readings[`est:${x.id}`]).length;
  return (
    <>
      <div className="lib-detail gm-hero" style={{ '--subj': 'var(--gold)' }}>
        <span className="gm-hero-icon" aria-hidden="true">
          📏
        </span>
        <div>
          <strong>How big, how heavy, how many? Guess the size of the number.</strong>
          <p>
            Engineers check every answer with a quick estimate first: is it about 10, or 1,000, or a million? Slide your guess on a powers-of-ten scale, then see the real value, one way to reason it out, and where the number comes from. You got the size right on {right} of {ESTIMATES.length}.
          </p>
          <div className="ch-actions">
            <button type="button" className="btn primary sm" onClick={random}>
              Play 5 questions
            </button>
          </div>
        </div>
      </div>
      {EST_TOPICS.map((t) => {
        const list = ESTIMATES.filter((x) => x.topic === t.id && hit(q, x.q, x.fact, t.label));
        if (!list.length) return null;
        return (
          <section key={t.id}>
            <h4 className="gm-h">
              <span aria-hidden="true">{t.icon}</span> {t.label}
            </h4>
            <div className="ch-grid">
              {list.map((x) => {
                const done = progress.readings[`est:${x.id}`];
                return (
                  <button key={x.id} type="button" className="lib-detail ch-card" style={{ '--subj': 'var(--gold)' }} onClick={() => start([x.id])}>
                    <strong className="gm-cardq">{x.q}</strong>
                    <span className={`ch-state ${done ? 'done' : ''}`}>{done ? '✓ Size right' : `Answer in ${x.unit}`}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
      {q && !ESTIMATES.some((x) => hit(q, x.q, x.fact)) && <p className="lib-hint">Nothing matches.</p>}
    </>
  );
}
