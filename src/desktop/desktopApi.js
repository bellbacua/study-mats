// Desktop app (Tauri) storage: the same /api the Node server offers, answered
// inside the app. The progress database is the same SQLite file format as
// data/study_mats.db; it is run in memory by sql.js (SQLite compiled to
// WebAssembly) and written back to disk through the app after every change.

import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { configureDb } from '../../server/dbCore.js';
import { route } from '../../server/api.js';

// node:sqlite-style wrapper so the shared queries run unchanged.
function wrap(db) {
  const clean = (ps) => ps.map((v) => (v === undefined ? null : typeof v === 'boolean' ? Number(v) : v));
  return {
    exec: (sql) => db.exec(sql),
    prepare(sql) {
      const rows = (ps) => {
        const st = db.prepare(sql);
        try {
          st.bind(clean(ps));
          const out = [];
          while (st.step()) out.push(st.getAsObject());
          return out;
        } finally {
          st.free();
        }
      };
      return {
        all: (...ps) => rows(ps),
        get: (...ps) => rows(ps)[0],
        run: (...ps) => {
          db.run(sql, clean(ps));
          return { changes: db.getRowsModified() };
        },
      };
    },
  };
}

const isApi = (u) => {
  try {
    const url = new URL(u, location.href);
    return url.origin === location.origin && url.pathname.startsWith('/api/');
  } catch {
    return false;
  }
};

/**
 * store.load() → Uint8Array | null   (the saved database file, if any)
 * store.save(bytes)                   (write the database file)
 * store.where() → { dbPath, ... }     (shown in the health/stats reply)
 */
export async function installDesktopApi(store) {
  const SQL = await initSqlJs({ locateFile: () => wasmUrl });
  const bytes = await store.load().catch(() => null);
  const raw = bytes && bytes.length ? new SQL.Database(bytes) : new SQL.Database();
  let size = bytes?.length || 0;
  let path = '';
  store
    .where?.()
    .then((w) => (path = w || ''))
    .catch(() => {});
  configureDb({ open: () => wrap(raw), info: () => ({ dbPath: path, fileSizeBytes: size }) });

  // Save soon after each change; flush when the window hides or closes.
  let timer = null;
  let saving = Promise.resolve();
  const flush = () => {
    clearTimeout(timer);
    timer = null;
    const data = raw.export();
    size = data.length;
    saving = saving.then(() => store.save(data)).catch((e) => console.error('Could not save progress', e));
    return saving;
  };
  const later = () => {
    clearTimeout(timer);
    timer = setTimeout(flush, 250);
  };
  const pending = () => timer !== null && flush();
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && pending());
  window.addEventListener('pagehide', pending);

  const answer = (method, url, body) => {
    const u = new URL(url, location.href);
    let result;
    try {
      result = route(method, u.pathname, u.searchParams, body);
    } catch (e) {
      result = { status: 500, data: { error: e.message || 'Internal error' } };
    }
    if (method !== 'GET' && result.status < 400) later();
    return result;
  };

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (!isApi(url)) return realFetch(input, init);
    const method = (init.method || (typeof input === 'object' && input.method) || 'GET').toUpperCase();
    let body = {};
    const text = init.body != null ? (typeof init.body === 'string' ? init.body : await new Response(init.body).text()) : '';
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON format' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }
    const { status, data } = answer(method, url, body);
    return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
  };

  const realBeacon = navigator.sendBeacon?.bind(navigator);
  navigator.sendBeacon = (url, data) => {
    if (!isApi(url)) return realBeacon ? realBeacon(url, data) : false;
    new Response(data)
      .text()
      .then((t) => {
        answer('POST', url, t ? JSON.parse(t) : {});
        flush();
      })
      .catch(() => {});
    return true;
  };

  // The app calls this before a reload (switching program) so nothing is lost.
  window.__studyFlush = flush;
  return { flush };
}

// The Tauri side: three small commands in src-tauri/src/main.rs.
export function tauriStore() {
  const invoke = (cmd, args, opts) => window.__TAURI_INTERNALS__.invoke(cmd, args, opts);
  return {
    async load() {
      const buf = await invoke('load_db');
      return buf && buf.byteLength ? new Uint8Array(buf) : null;
    },
    save: (bytes) => invoke('save_db', bytes),
    where: () => invoke('db_path'),
  };
}

export const isDesktop = () => typeof window !== 'undefined' && !!window.__TAURI_INTERNALS__;
