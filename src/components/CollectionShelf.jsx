import { useEffect, useMemo, useRef, useState } from 'react';
import { LESSONS, ALL_LESSONS, weekNumber } from '../data/path';
import { COLLECTABLES, KINDS, isCollected, firstClassFor } from '../state/collection';
import { FAMILIES } from '../data/library/materials';
import { useWikiPic } from './Pictures';

// The Library album: people, discoveries and materials unlock as you meet them
// in your classes. Locked cards show where you will meet them.

const ORDER = [...LESSONS, ...ALL_LESSONS.filter((l) => !LESSONS.includes(l))];
const yearLabel = (y) => (y == null ? '' : y < 0 ? `${-y} BC` : String(y));

function CardPic({ url, alt, enabled }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current || !enabled) return undefined;
    if (typeof IntersectionObserver === 'undefined') return setSeen(true);
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setSeen(true), { rootMargin: '200px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, enabled]);
  const pic = useWikiPic(url, seen && enabled);
  return (
    <div ref={ref} className="album-pic">
      {pic ? <img src={pic.thumb} alt={alt} loading="lazy" /> : <span aria-hidden="true">{alt?.[0] || '·'}</span>}
    </div>
  );
}

export default function CollectionShelf({ q, progress, onOpen, onShow }) {
  const [kind, setKind] = useState('people');
  const [show, setShow] = useState('all');
  const passed = progress.passed;
  const famLabel = useMemo(() => Object.fromEntries(FAMILIES.map((f) => [f.id, f.label])), []);

  const items = useMemo(() => {
    const list = COLLECTABLES.filter((x) => x.kind === kind).map((x) => ({ ...x, have: isCollected(x, passed), first: firstClassFor(x, ORDER) }));
    if (kind === 'materials') list.sort((a, b) => FAMILIES.findIndex((f) => f.id === a.fam) - FAMILIES.findIndex((f) => f.id === b.fam));
    else list.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    return list;
  }, [kind, passed]);

  const have = items.filter((x) => x.have).length;
  const visible = items.filter((x) => (show === 'all' || (show === 'have' ? x.have : !x.have)) && (!q || (x.have && x.name.toLowerCase().includes(q))));
  const all = COLLECTABLES.filter((x) => isCollected(x, passed)).length;
  const k = KINDS.find((x) => x.id === kind);

  return (
    <div className="album">
      <div className="album-head">
        <div>
          <strong className="album-count">
            {all} <span>of {COLLECTABLES.length} cards</span>
          </strong>
          <div className="meter album-meter">
            <div style={{ width: `${(all / COLLECTABLES.length) * 100}%` }} />
          </div>
        </div>
        <p>Finish a class and everyone and everything in its story joins your album. Locked cards tell you which class to take to find them.</p>
      </div>

      <div className="album-tabs" role="tablist">
        {KINDS.map((x) => {
          const n = COLLECTABLES.filter((c) => c.kind === x.id);
          const h = n.filter((c) => isCollected(c, passed)).length;
          return (
            <button key={x.id} type="button" role="tab" aria-selected={kind === x.id} className={`album-tab ${kind === x.id ? 'on' : ''}`} onClick={() => setKind(x.id)}>
              <span aria-hidden="true">{x.icon}</span>
              {x.label}
              <em>
                {h}/{n.length}
              </em>
            </button>
          );
        })}
        <span className="album-filter">
          {[
            ['all', 'All'],
            ['have', 'Collected'],
            ['locked', 'Still to find'],
          ].map(([id, label]) => (
            <button key={id} type="button" className={`chip ${show === id ? 'on' : ''}`} onClick={() => setShow(id)}>
              {label}
            </button>
          ))}
        </span>
      </div>

      {have === 0 && show !== 'locked' && (
        <p className="album-empty">
          No {k.label.toLowerCase()} yet. {k.id === 'people' ? 'The people in your first class story will be your first cards.' : 'They arrive as your classes reach them.'}
        </p>
      )}

      <ol className="album-grid">
        {visible.map((x) =>
          x.have ? (
            <li key={x.key}>
              <button type="button" className={`album-card have kind-${x.kind}`} onClick={() => onShow(k.shelf, x.name)} title={`Open in ${k.label}`}>
                <CardPic url={x.wiki} alt={x.name} enabled />
                <span className="album-meta">{x.kind === 'materials' ? famLabel[x.fam] : `${yearLabel(x.year)}${x.luck ? ' · 🍀' : ''}`}</span>
                <strong>{x.name}</strong>
                <span className="album-sub">{x.sub}</span>
              </button>
            </li>
          ) : (
            <li key={x.key}>
              <button type="button" className="album-card locked" disabled={!x.first} onClick={() => x.first && onOpen(x.first.id)} title={x.first ? 'Open the class where you meet this' : ''}>
                <div className="album-pic">
                  <span aria-hidden="true">?</span>
                </div>
                <span className="album-meta">{x.kind === 'materials' ? famLabel[x.fam] : yearLabel(x.year)}</span>
                <strong>Not met yet</strong>
                {x.first && (
                  <span className="album-sub">
                    {x.first.termId
                      ? `Meet in week ${weekNumber(x.first)}: ${x.first.title.split(':')[0]}`
                      : `Meet in ${x.first.spec ? 'a track class' : x.first.side ? 'a GE class' : 'a borrowed class'}: ${x.first.title.split(':')[0]}`}
                  </span>
                )}
              </button>
            </li>
          ),
        )}
      </ol>
    </div>
  );
}
