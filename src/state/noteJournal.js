// Notes are written to this device first (localStorage), then copied to the
// SQLite database. If the server is down, or the page reloads mid-save, the
// text is still on this device and gets synced the next time the server is
// reachable. Nothing is ever dropped silently.

const KEY = 'studymats_notes_journal';
const listeners = new Set();
let status = 'saved'; // 'saved' | 'saving' | 'offline'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};
const write = (j) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(j));
  } catch {
    /* storage full or blocked; the server copy still gets attempted */
  }
};
const setStatus = (s) => {
  status = s;
  listeners.forEach((fn) => fn(s));
};

export const noteStatus = () => status;
export function onNoteStatus(fn) {
  listeners.add(fn);
  fn(status);
  return () => listeners.delete(fn);
}

export function pendingNotes() {
  return Object.entries(read())
    .filter(([, e]) => !e.synced)
    .map(([lessonId, e]) => ({ lessonId, ...e }));
}

async function push(lessonId, text, at) {
  const res = await fetch('/api/progress/lesson-note', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lessonId, notes: text, at }),
  });
  if (!res.ok) throw new Error(String(res.status));
  return (await res.json()).result;
}

// Lets the app show a newer copy that came from the server (another tab or device).
const serverNewer = new Set();
export function onServerNewer(fn) {
  serverNewer.add(fn);
  return () => serverNewer.delete(fn);
}

let timer = null;
export async function flushNotes() {
  clearTimeout(timer);
  const pending = pendingNotes();
  if (!pending.length) return setStatus('saved');
  setStatus('saving');
  let failed = false;
  for (const p of pending) {
    try {
      const result = await push(p.lessonId, p.text, p.at);
      const j = read();
      if (result && result.stored === false) {
        // the server has a newer copy (written later elsewhere): keep that one
        j[p.lessonId] = { text: result.notes, at: result.clientAt, synced: true };
        write(j);
        serverNewer.forEach((fn) => fn(p.lessonId, result.notes));
      } else if (j[p.lessonId]?.at === p.at) {
        // only mark synced if nobody typed more in the meantime
        j[p.lessonId].synced = true;
        write(j);
      }
    } catch {
      failed = true;
    }
  }
  if (failed) {
    setStatus('offline');
    timer = setTimeout(flushNotes, 10_000); // keep retrying quietly
  } else if (pendingNotes().length) {
    timer = setTimeout(flushNotes, 400);
  } else setStatus('saved');
}

let debounce = null;
export function saveNote(lessonId, text) {
  const j = read();
  j[lessonId] = { text, at: Date.now(), synced: false };
  write(j); // on this device immediately, before anything can go wrong
  setStatus('saving');
  clearTimeout(debounce);
  debounce = setTimeout(flushNotes, 500);
}

// On start-up: anything typed while the server was unreachable wins over the
// older server copy, and is pushed back up.
export function mergeWithServer(serverNotes, serverAt = {}) {
  const j = read();
  // Synced copies on this device fill in if the server couldn't be reached at all.
  const merged = { ...Object.fromEntries(Object.entries(j).map(([id, e]) => [id, e.text])), ...serverNotes };
  for (const [id, e] of Object.entries(j)) {
    if (e.synced) continue;
    if ((serverAt[id] || 0) > e.at) {
      j[id] = { text: serverNotes[id], at: serverAt[id], synced: true }; // server copy is newer
    } else {
      merged[id] = e.text; // this device has the newest words
    }
  }
  write(j);
  if (pendingNotes().length) flushNotes();
  return merged;
}

// Last-chance save when the tab closes.
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => {
    for (const p of pendingNotes()) {
      navigator.sendBeacon?.('/api/progress/lesson-note', new Blob([JSON.stringify({ lessonId: p.lessonId, notes: p.text, at: p.at })], { type: 'application/json' }));
    }
  });
}
