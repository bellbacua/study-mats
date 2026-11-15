import { useMemo, useState } from 'react';
import * as MATE from '../data/pathways';
import * as ECE from '../data/pathwaysEce';
import { TRACKS } from '../data/tracks/meta';
import { ALL_LESSONS, PROGRAM_ID } from '../data/path';

const FIELDS = [
  { id: 'mate', label: 'Materials Engineering', title: 'Where materials engineering can take you', data: MATE, subj: 'subj-mate' },
  { id: 'ece', label: 'Electronics Engineering (ECE)', title: 'Where electronics engineering can take you', data: ECE, subj: 'subj-ee' },
];
const FIELD_KEY = 'pathways:field';
const loadField = () => {
  try {
    const f = localStorage.getItem(FIELD_KEY);
    if (FIELDS.some((x) => x.id === f)) return f;
  } catch {
    /* not remembered: fall back to the program */
  }
  return PROGRAM_ID === 'ece' ? 'ece' : 'mate';
};
import { useReveal } from '../state/useReveal';

// [n] marks become small links to the source list at the bottom.
function Cite({ text, field }) {
  const parts = text.split(/(\[\d+\])/);
  return parts.map((p, i) => {
    const m = p.match(/^\[(\d+)\]$/);
    return m ? (
      <sup key={i}>
        <a href={`#pw-src-${field}-${m[1]}`}>{m[1]}</a>
      </sup>
    ) : (
      <span key={i}>{p}</span>
    );
  });
}

export default function PathwaysPage({ progress, onOpen }) {
  const [fieldId, setFieldIdState] = useState(loadField);
  const field = FIELDS.find((f) => f.id === fieldId) || FIELDS[0];
  const { ROAD, PATHS, SOURCES } = field.data;
  const picked = fieldId === 'mate' ? TRACKS.find((t) => progress.readings[`spec:${t.id}`])?.id : null;
  const [pathId, setPathId] = useState(picked || PATHS[0].id);
  const setField = (id) => {
    setFieldIdState(id);
    setPathId(FIELDS.find((f) => f.id === id).data.PATHS[0].id);
    try {
      localStorage.setItem(FIELD_KEY, id);
    } catch {
      /* fine: just not remembered */
    }
  };
  const path = PATHS.find((p) => p.id === pathId) || PATHS[0];
  const byId = useMemo(() => Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l])), []);
  useReveal([pathId, fieldId]);

  return (
    <div className="timeline pathways">
      <header className="timeline-head" data-reveal>
        <h1>{field.title}</h1>
        <p>The road from today to working life. Pick a path to see the jobs along it, and the classes that lead there.</p>
        <div className="pw-field" role="group" aria-label="Field">
          {FIELDS.map((f) => (
            <button key={f.id} type="button" className={`chip ${f.subj} ${f.id === fieldId ? 'on' : ''}`} onClick={() => setField(f.id)} aria-pressed={f.id === fieldId}>
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <section className="tl-era">
        <h2 className="tl-era-name" data-reveal>
          The road you are on
        </h2>
        <ol className="tl-line">
          {ROAD.map((r, i) => (
            <li key={r.title} className={`tl-item ${field.subj} ${i % 2 ? 'right' : 'left'}`} data-reveal>
              <span className="tl-dot" />
              <div className="tl-card">
                <span className="tl-year">{r.when}</span>
                <strong>{r.title}</strong>
                <span className="tl-detail">
                  <Cite text={r.detail} field={fieldId} />
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
            <button key={p.id} type="button" className={`chip ${field.subj} ${p.id === pathId ? 'on' : ''}`} onClick={() => setPathId(p.id)}>
              {p.icon} {p.title}
              {p.id === picked ? ' · your track' : ''}
            </button>
          ))}
        </div>
        <p className="pw-blurb" data-reveal>
          <Cite text={path.blurb} field={fieldId} />
        </p>
        <ol className="tl-line" key={`${fieldId}-${path.id}`}>
          {path.stages.map((s, i) => (
            <li key={s.stage} className={`tl-item subj-phys ${i % 2 ? 'right' : 'left'}`} data-reveal>
              <span className="tl-dot" />
              <div className="tl-card pw-stage">
                <span className="tl-year">{s.stage}</span>
                {s.roles.map((r) => (
                  <div key={r.title} className="pw-role">
                    <strong>{r.title}</strong>
                    <span className="tl-detail">
                      <Cite text={r.what} field={fieldId} />
                    </span>
                    <span className="pw-where">
                      📍 <Cite text={r.where} field={fieldId} />
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
            <li key={s.n} id={`pw-src-${fieldId}-${s.n}`}>
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
