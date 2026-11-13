import { useEffect, useRef, useState } from 'react';
import { MICROGRAPHS } from '../data/library/micrographs';
import { Sources } from './LibBits';

const cache = new Map();
const strip = (h) => {
  if (!h) return '';
  const d = document.createElement('div');
  d.innerHTML = h;
  return (d.textContent || '').replace(/\s+/g, ' ').trim();
};

// Search Commons for files and keep only those whose own description
// (or title) matches what we claim the picture shows.
export async function findPics(m) {
  if (cache.has(m.id)) return cache.get(m.id);
  const q = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrnamespace: '6',
    gsrlimit: '12',
    gsrsearch: `${m.search} filetype:bitmap`,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    iiurlwidth: '640',
  });
  const p = fetch(`https://commons.wikimedia.org/w/api.php?${q}`)
    .then((r) => r.json())
    .then((j) =>
      Object.values(j.query?.pages || {})
        .sort((a, b) => (a.index || 0) - (b.index || 0))
        .map((pg) => {
          const ii = pg.imageinfo?.[0];
          const md = ii?.extmetadata || {};
          return {
            title: pg.title.replace(/^File:/, ''),
            thumb: ii?.thumburl,
            page: ii?.descriptionurl,
            desc: strip(md.ImageDescription?.value),
            licence: strip(md.LicenseShortName?.value),
            artist: strip(md.Artist?.value),
          };
        })
        .filter((x) => x.thumb && x.desc && m.must.test(x.desc)),
    )
    .catch(() => null);
  cache.set(m.id, p);
  return p;
}

function Card({ m }) {
  const ref = useRef(null);
  const [pics, setPics] = useState(undefined);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let live = true;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          findPics(m).then((r) => live && setPics(r && r.slice(0, 2)));
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => {
      live = false;
      io.disconnect();
    };
  }, [m]);
  return (
    <article ref={ref} className="lib-detail mg-card">
      <span className="eyebrow">{m.kind}</span>
      <h3>{m.name}</h3>
      <div className="mg-pics">
        {pics === undefined && <div className="mg-wait">Looking for a picture…</div>}
        {pics === null && <div className="mg-wait">Pictures could not be loaded (offline?).</div>}
        {pics && !pics.length && <div className="mg-wait">No picture whose own description confirms this was found right now.</div>}
        {pics?.map((p) => (
          <figure key={p.page} className="mg-pic">
            <a href={p.page} target="_blank" rel="noreferrer">
              <img src={p.thumb} alt={p.desc.slice(0, 120)} loading="lazy" />
            </a>
            <figcaption>
              <q>{p.desc.length > 220 ? `${p.desc.slice(0, 220)}…` : p.desc}</q>
              <span>
                {' '}
                ({p.artist ? `${p.artist}, ` : ''}
                {p.licence || 'see licence'},{' '}
                <a href={p.page} target="_blank" rel="noreferrer">
                  file page
                </a>
                )
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p>
        <strong>What to notice: </strong>
        {m.look}
      </p>
      <p className="mg-why">
        <strong>Why it matters: </strong>
        {m.why}
      </p>
      <Sources list={m.sources} />
    </article>
  );
}

export default function MicrographGallery({ q }) {
  const kinds = [...new Set(MICROGRAPHS.map((m) => m.kind))];
  const [k, setK] = useState('all');
  const list = MICROGRAPHS.filter((m) => (k === 'all' || m.kind === k) && (!q || [m.name, m.look, m.why].some((f) => f.toLowerCase().includes(q))));
  return (
    <>
      <div className="chips lib-fams">
        <button type="button" className={`chip ${k === 'all' ? 'on' : ''}`} onClick={() => setK('all')}>
          Everything ({MICROGRAPHS.length})
        </button>
        {kinds.map((x) => (
          <button key={x} type="button" className={`chip ${k === x ? 'on' : ''}`} onClick={() => setK(x)}>
            {x}
          </button>
        ))}
      </div>
      <p className="pw-note">
        Each picture is a real image from Wikimedia Commons, found live. A picture is shown only if the description written by its own uploader names what this card is about; that description is quoted under it. Tap a picture to see its full page, scale and licence.
      </p>
      <div className="mg-grid">
        {list.map((m) => (
          <Card key={m.id} m={m} />
        ))}
        {!list.length && <p className="lib-hint">Nothing matches.</p>}
      </div>
    </>
  );
}
