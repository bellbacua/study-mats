import { useEffect, useState } from 'react';

// Real photos for a class: the lead image of each Wikipedia article in its
// Sources list (a portrait, a sample of the material, the bridge, the machine).
// Fetched in the browser from Wikipedia's page summaries and kept in a small
// local cache so a class opens instantly the second time.

const CACHE_KEY = 'pics:v1';
const MAX = 6;

const readCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
};
const writeCache = (c) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    /* storage full or blocked: pictures still show, just not cached */
  }
};

// "https://en.wikipedia.org/wiki/Henry_Moseley" → "Henry_Moseley"
export const wikiTitle = (url) => {
  const m = /^https?:\/\/en\.wikipedia\.org\/wiki\/([^#?]+)/.exec(url || '');
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
};

// The page on Wikimedia Commons (or English Wikipedia) that holds the file,
// with its author and licence.
const filePage = (src) => {
  const m = /upload\.wikimedia\.org\/wikipedia\/(commons|en)\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+)/.exec(src || '');
  if (!m) return null;
  return m[1] === 'commons' ? `https://commons.wikimedia.org/wiki/File:${m[2]}` : `https://en.wikipedia.org/wiki/File:${m[2]}`;
};

// Backup route through the classic MediaWiki interface, used if the summary
// service is unavailable.
async function pageImage(title) {
  const q = new URLSearchParams({ action: 'query', format: 'json', origin: '*', redirects: '1', prop: 'pageimages|description', piprop: 'thumbnail|original', pithumbsize: '400', titles: title.replace(/_/g, ' ') });
  const res = await fetch(`https://en.wikipedia.org/w/api.php?${q}`);
  if (!res.ok) return null;
  const page = Object.values((await res.json()).query?.pages || {})[0];
  if (!page || page.missing !== undefined) return null;
  if (!page.thumbnail?.source) return { none: true };
  return {
    title: page.title,
    desc: page.description || '',
    thumb: page.thumbnail.source,
    w: page.thumbnail.width,
    h: page.thumbnail.height,
    full: page.original?.source || page.thumbnail.source,
    page: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
  };
}

async function summary(title) {
  try {
    const r = await restSummary(title);
    if (r) return r;
  } catch {
    /* fall through to the backup route */
  }
  return pageImage(title);
}

async function restSummary(title) {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const j = await res.json();
  if (j.type === 'disambiguation' || !j.thumbnail?.source) return { none: true };
  return {
    title: j.title,
    desc: j.description || '',
    thumb: j.thumbnail.source,
    w: j.thumbnail.width,
    h: j.thumbnail.height,
    full: j.originalimage?.source || j.thumbnail.source,
    page: j.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`,
  };
}

export default function Pictures({ sources }) {
  const titles = [...new Set((sources || []).map((s) => wikiTitle(s.url)).filter(Boolean))];
  const key = titles.join('|');
  const [pics, setPics] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let alive = true;
    const cache = readCache();
    const have = titles.map((t) => cache[t]).filter((p) => p && !p.none);
    setPics(have.slice(0, MAX));
    const missing = titles.filter((t) => !(t in cache));
    if (!missing.length || (typeof navigator !== 'undefined' && navigator.onLine === false)) return undefined;
    Promise.all(missing.map((t) => summary(t).catch(() => null))).then((got) => {
      if (!alive) return;
      const c = readCache();
      missing.forEach((t, i) => {
        if (got[i]) c[t] = got[i];
      });
      writeCache(c);
      setPics(titles.map((t) => c[t]).filter((p) => p && !p.none).slice(0, MAX));
    });
    return () => {
      alive = false;
    };
    // titles is derived from key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  if (!pics.length) return null;
  return (
    <section className="pictures">
      <span className="eyebrow">Pictures</span>
      <div className="pic-strip">
        {pics.map((p) => (
          <figure key={p.title} className="pic">
            <button type="button" className="pic-btn" onClick={() => setOpen(p)} aria-label={`Enlarge picture: ${p.title}`}>
              <img src={p.thumb} alt={p.title} loading="lazy" width={p.w} height={p.h} />
            </button>
            <figcaption>
              <strong>{p.title}</strong>
              {p.desc && <span>{p.desc}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
      {open && (
        <div className="pic-overlay" role="dialog" aria-label={open.title} onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={open.full} alt={open.title} />
            <figcaption>
              <strong>{open.title}</strong>
              {open.desc && <span> · {open.desc}</span>}
              <span className="pic-credit">
                {' '}
                ·{' '}
                <a href={open.page} target="_blank" rel="noreferrer">
                  article
                </a>
                {filePage(open.full) && (
                  <>
                    {' · '}
                    <a href={filePage(open.full)} target="_blank" rel="noreferrer">
                      photo credit and licence
                    </a>
                  </>
                )}
              </span>
            </figcaption>
            <button type="button" className="pic-close" onClick={() => setOpen(null)} aria-label="Close">
              ×
            </button>
          </figure>
        </div>
      )}
    </section>
  );
}

// One lead picture for one Wikipedia link, shared with the cache above.
// Used by the Library cards; `enabled` lets a card wait until it is on screen.
export function useWikiPic(url, enabled = true) {
  const title = wikiTitle(url);
  const [pic, setPic] = useState(() => {
    const c = title ? readCache()[title] : null;
    return c && !c.none ? c : null;
  });
  useEffect(() => {
    if (!title || !enabled) return undefined;
    const cache = readCache();
    if (title in cache) {
      setPic(cache[title] && !cache[title].none ? cache[title] : null);
      return undefined;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return undefined;
    let alive = true;
    summary(title)
      .catch(() => null)
      .then((got) => {
        if (!got) return;
        const c = readCache();
        c[title] = got;
        writeCache(c);
        if (alive) setPic(got.none ? null : got);
      });
    return () => {
      alive = false;
    };
  }, [title, enabled]);
  return pic;
}

export { filePage };
