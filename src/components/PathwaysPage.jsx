import { useMemo, useState } from 'react';
import { ROAD, PATHS, SOURCES } from '../data/pathways';
import { TRACKS } from '../data/tracks/meta';
import { ALL_LESSONS } from '../data/path';
import { useReveal } from '../state/useReveal';

// [n] marks become small links to the source list at the bottom.
function Cite({ text }) {
  const parts = text.split(/(\[\d+\])/);
  return parts.map((p, i) => {
    const m = p.match(/^\[(\d+)\]$/);
    return m ? (
      <sup key={i}>
        <a href={`#pw-src-${m[1]}`}>{m[1]}</a>
      </sup>
    ) : (
      <span key={i}>{p}</span>
    );
  });
}

export default function PathwaysPage({ progress, onOpen }) {
  const picked = TRACKS.find((t) => progress.readings[`spec:${t.id}`])?.id;
  const [pathId, setPathId] = useState(picked || 'core');
  const path = PATHS.find((p) => p.id === pathId) || PATHS[0];
  const byId = useMemo(() => Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l])), []);
  useReveal([pathId]);

  return (
    <div className="timeline pathways">
      <header className="timeline-head" data-reveal>
        <h1>Where materials engineering can take you</h1>
        <p>The road from today to working life. Pick a path to see the jobs along it, and the classes that lead there.</p>
      </header>

      <section className="tl-era">
        <h2 className="tl-era-name" data-reveal>
          The road you are on
        </h2>
        <ol className="tl-line">
          {ROAD.map((r, i) => (
            <li key={r.title} className={`tl-item subj-mate ${i % 2 ? 'right' : 'left'}`} data-reveal>
              <span className="tl-dot" />
              <div className="tl-card">
                <span className="tl-year">{r.when}</span>
                <strong>{r.title}</strong>
                <span className="tl-detail">
                  <Cite text={r.detail} />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tl-era">
        <h2 className="tl-era-name" data-reveal>
          Then the paths split
        </h2>
        <div className="chips pw-chips" data-reveal>
          {PATHS.map((p) => (
            <button key={p.id} type="button" className={`chip subj-mate ${p.id === pathId ? 'on' : ''}`} onClick={() => setPathId(p.id)}>
              {p.icon} {p.title}
              {p.id === picked ? ' · your track' : ''}
            </button>
          ))}
        </div>
        <p className="pw-blurb" data-reveal>
          <Cite text={path.blurb} />
        </p>
        <ol className="tl-line" key={path.id}>
          {path.stages.map((s, i) => (
            <li key={s.stage} className={`tl-item subj-phys ${i % 2 ? 'right' : 'left'}`} data-reveal>
              <span className="tl-dot" />
              <div className="tl-card pw-stage">
                <span className="tl-year">{s.stage}</span>
                {s.roles.map((r) => (
                  <div key={r.title} className="pw-role">
                    <strong>{r.title}</strong>
                    <span className="tl-detail">
                      <Cite text={r.what} />
                    </span>
                    <span className="pw-where">
                      📍 <Cite text={r.where} />
                    </span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="pw-classes" data-reveal>
          <span className="eyebrow">Classes that lead here</span>
          <div className="chips">
            {path.classes
              .map((id) => byId[id])
              .filter(Boolean)
              .map((l) => (
                <button key={l.id} type="button" className="chip pw-class" onClick={() => onOpen(l.id)}>
                  {progress.passed[l.id] ? '✓ ' : ''}
                  {l.code} · {l.title}
                </button>
              ))}
          </div>
        </div>
      </section>

      <footer className="pw-sources" data-reveal>
        <span className="eyebrow">Sources</span>
        <ol>
          {SOURCES.map((s) => (
            <li key={s.n} id={`pw-src-${s.n}`}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
        <p className="pw-note">Job titles and places are examples of where graduates work, not promises; industries change, so check current openings when you get closer.</p>
      </footer>
    </div>
  );
}
