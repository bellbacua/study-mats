import { useEffect, useMemo, useRef, useState } from 'react';
import katex from 'katex';
import { renderNote } from '../notes/renderNote';
import LiveEditor from '../notes/LiveEditor';
import { NOTE_TIPS, noteScaffold } from '../notes/noteHelp';
import { checkNotes } from '../notes/noteCheck';
import { onNoteStatus } from '../state/noteJournal';
import { LATEX_GUIDE } from '../notes/latexGuide';

const pref = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};
const savePref = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
};

const inlineTex = (src) => {
  // render the $…$ parts of a guide example for its preview
  const m = src.match(/\$\$?([\s\S]+?)\$\$?/);
  if (!m) return null;
  return katex.renderToString(m[1], { throwOnError: false, strict: false });
};

const PANES = { editor: 'Notes', feedback: 'Feedback', tips: 'How to take notes', guide: 'LaTeX guide', versions: 'Earlier versions', archive: 'Old scratchpad', none: 'Empty' };
// Three tiles: two side by side on top, one across the bottom (tiling-WM style).
const DEFAULT_LAYOUT = { tl: 'editor', tr: 'tips', b: 'guide' };
const PRESETS = [
  { name: 'Notes | tips, guide below', layout: { tl: 'editor', tr: 'tips', b: 'guide' } },
  { name: 'Notes | feedback', layout: { tl: 'editor', tr: 'feedback', b: 'none' } },
  { name: 'Notes | guide', layout: { tl: 'editor', tr: 'guide', b: 'none' } },
  { name: 'Notes over guide', layout: { tl: 'editor', tr: 'none', b: 'guide' } },
  { name: 'Notes only', layout: { tl: 'editor', tr: 'none', b: 'none' } },
];

function loadLayout() {
  try {
    const l = JSON.parse(pref('notes_layout', 'null'));
    if (l && ['tl', 'tr', 'b'].every((k) => l[k] in PANES)) return l;
  } catch {
    /* fall through */
  }
  return DEFAULT_LAYOUT;
}

export default function NotesPanel({ lesson, notes, onNote, scratch }) {
  const [open, setOpen] = useState(() => pref('notes_open', '0') === '1');
  const [side, setSide] = useState(() => pref('notes_side', 'right'));
  // Share of the screen the panel takes; the lesson reflows into the rest.
  const [frac, setFrac] = useState(() => Number(pref('notes_frac', String(2 / 3))) || 2 / 3);
  const [layout, setLayout] = useState(loadLayout);
  const [splitX, setSplitX] = useState(() => Number(pref('notes_split_x', '0.5')) || 0.5);
  const [splitY, setSplitY] = useState(() => Number(pref('notes_split_y', '0.55')) || 0.55);
  const [dragging, setDragging] = useState(false);
  const editor = useRef(null);
  const [saveState, setSaveState] = useState('saved');
  useEffect(() => onNoteStatus(setSaveState), []);
  const tiles = useRef(null);

  useEffect(() => savePref('notes_open', open ? '1' : '0'), [open]);
  useEffect(() => savePref('notes_side', side), [side]);
  useEffect(() => savePref('notes_frac', String(frac)), [frac]);
  useEffect(() => savePref('notes_layout', JSON.stringify(layout)), [layout]);
  useEffect(() => savePref('notes_split_x', String(splitX)), [splitX]);
  useEffect(() => savePref('notes_split_y', String(splitY)), [splitY]);

  // Tell the page layout how much room the panel occupies.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.notes = open ? side : 'closed';
    root.style.setProperty('--notes-f', String(frac));
    return () => {
      delete root.dataset.notes;
    };
  }, [open, side, frac]);

  // Ctrl/Cmd + . toggles the panel
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '.') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const drag = (onMove) => (e) => {
    e.preventDefault();
    setDragging(true);
    const move = (ev) => onMove(ev);
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  const dragPanel = drag((ev) => {
    const x = ev.clientX / window.innerWidth;
    const f = side === 'right' ? 1 - x : x;
    setFrac(Math.min(1, Math.max(0.25, f > 0.95 ? 1 : f)));
  });
  const dragX = drag((ev) => {
    const r = tiles.current.getBoundingClientRect();
    setSplitX(Math.min(0.85, Math.max(0.15, (ev.clientX - r.left) / r.width)));
  });
  const dragY = drag((ev) => {
    const r = tiles.current.getBoundingClientRect();
    setSplitY(Math.min(0.85, Math.max(0.15, (ev.clientY - r.top) / r.height)));
  });

  const text = (lesson && notes[lesson.id]) || '';
  const setText = (v) => lesson && onNote(lesson.id, v);
  const archiveHtml = useMemo(() => renderNote(scratch || ''), [scratch]);
  const shown = Object.values(layout);

  const insert = (snippet) => {
    if (!lesson) return;
    if (editor.current) editor.current.insert(snippet);
    else onNote(lesson.id, `${text}${text && !text.endsWith('\n') ? '\n' : ''}${snippet}`);
  };

  // Lessons can drop a prompt into your notes (📌 buttons): open the panel and add it.
  const insertRef = useRef(insert);
  insertRef.current = insert;
  useEffect(() => {
    const onAdd = (e) => {
      setOpen(true);
      setTimeout(() => insertRef.current(e.detail), 50);
    };
    window.addEventListener('notes:add', onAdd);
    return () => window.removeEventListener('notes:add', onAdd);
  }, []);

  // Each pane type appears at most once: picking one that is already shown swaps them.
  const choose = (slot, pane) =>
    setLayout((l) => {
      const next = { ...l };
      const other = Object.keys(l).find((k) => k !== slot && l[k] === pane && pane !== 'none');
      if (other) next[other] = l[slot];
      next[slot] = pane;
      return next;
    });

  const renderPane = (pane) => {
    if (pane === 'editor')
      return (
        <LiveEditor
          key={lesson?.id || 'none'}
          ref={editor}
          value={text}
          onChange={setText}
          placeholder={'Start typing. Maths like $x^2$ or $$\\frac{a}{b}$$ renders as soon as your cursor leaves it; click it to edit.'}
        />
      );
    if (pane === 'guide')
      return (
        <div className="np-guide">
          <p className="np-guide-intro">
            Click an example to drop it into your notes at the cursor{shown.includes('editor') ? '' : ' (open a Notes pane to see it)'}.
          </p>
          {LATEX_GUIDE.map((sec) => (
            <section key={sec.title}>
              <h3>{sec.title}</h3>
              {sec.tip && <p className="np-tip">{sec.tip}</p>}
              <div className="np-examples">
                {sec.items.map((it) => {
                  const preview = inlineTex(it.insert);
                  return (
                    <button key={it.label} type="button" className="np-example" onClick={() => insert(it.insert)}>
                      <span className="np-ex-label">{it.label}</span>
                      <code>{it.insert}</code>
                      {preview && <span className="np-ex-out" dangerouslySetInnerHTML={{ __html: preview }} />}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      );
    if (pane === 'feedback') {
      if (!lesson) return <div className="np-guide np-tip">Open a class to get feedback on its notes.</div>;
      const items = checkNotes(text, lesson);
      return (
        <div className="np-guide">
          <p className="np-guide-intro">Updates as you type. It compares your note with this class: no AI, nothing leaves your computer.</p>
          <ul className="np-feedback">
            {items.map((it) => (
              <li key={it.title} className={`fb-${it.level}`}>
                <strong>
                  {it.level === 'ok' ? '✓' : it.level === 'warn' ? '!' : '→'} {it.title}
                </strong>
                <span>{it.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    if (pane === 'tips')
      return (
        <div className="np-guide">
          {lesson && !text.trim() && (
            <div className="np-start">
              <p>Not sure where to start? Get an outline for this class with questions to fill in.</p>
              <button type="button" className="btn primary sm" onClick={() => insert(noteScaffold(lesson))}>
                Start my notes
              </button>
            </div>
          )}
          {NOTE_TIPS.map((t, i) => (
            <section key={t.title}>
              <h3>
                {i + 1}. {t.title}
              </h3>
              <p className="np-tip">{t.body}</p>
            </section>
          ))}
        </div>
      );
    if (pane === 'versions') return <Versions lesson={lesson} current={text} onRestore={(t) => lesson && onNote(lesson.id, t)} />;
    if (pane === 'archive')
      return (
        <div className="np-preview">
          <p className="np-tip">Your old scratchpad (the "brain dump"), kept read-only. Copy anything you want into a class note.</p>
          <div dangerouslySetInnerHTML={{ __html: archiveHtml || '<p class="np-empty">Empty.</p>' }} />
        </div>
      );
    return null;
  };

  const tile = (slot) => (
    <section className={`np-tile tile-${slot}`} key={slot}>
      <div className="np-tile-bar">
        <select value={layout[slot]} onChange={(e) => choose(slot, e.target.value)} aria-label="Pane content">
          {Object.entries(PANES).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>
        {layout[slot] === 'editor' && lesson && !text.trim() && (
          <button type="button" className="np-start-btn" onClick={() => insert(noteScaffold(lesson))} title="Insert an outline for this class">
            ✨ Start my notes
          </button>
        )}
        <button type="button" title="Close this pane" onClick={() => choose(slot, 'none')}>
          ×
        </button>
      </div>
      <div className="np-tile-body">{renderPane(layout[slot])}</div>
    </section>
  );

  const hasTL = layout.tl !== 'none';
  const hasTR = layout.tr !== 'none';
  const hasTop = hasTL || hasTR;
  const hasB = layout.b !== 'none';

  return (
    <>
      <button
        type="button"
        className={`notes-handle side-${side} ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(!open)}
        title="Notes (Ctrl + .)"
        aria-label={open ? 'Close notes' : 'Open notes'}
      >
        {(side === 'right') === open ? '›' : '‹'}
        <span>Notes</span>
      </button>

      <aside className={`notes-panel side-${side} ${open ? 'open' : ''} ${dragging ? 'dragging' : ''}`} aria-hidden={!open}>
        <div className="np-resize" onPointerDown={dragPanel} title="Drag to resize" />
        <header className="np-head">
          <div className="np-title">
            <strong>Notes</strong>
            <span>{lesson ? lesson.title : 'Open a class to take notes'}</span>
          </div>
          <div className="np-tools">
            <select
              className="np-preset"
              value=""
              onChange={(e) => e.target.value !== '' && setLayout(PRESETS[Number(e.target.value)].layout)}
              aria-label="Layout"
            >
              <option value="">Layout…</option>
              {PRESETS.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setSide(side === 'right' ? 'left' : 'right')} title="Move panel to the other side">
              ⇄
            </button>
            <button type="button" onClick={() => setOpen(false)} title="Close (Ctrl + .)">
              ✕
            </button>
          </div>
        </header>

        <div
          className="np-tiles"
          ref={tiles}
          style={{ gridTemplateRows: hasTop && hasB ? `${splitY}fr 6px ${1 - splitY}fr` : '1fr' }}
        >
          {hasTop && (
            <div className="np-row" style={{ gridTemplateColumns: hasTL && hasTR ? `${splitX}fr 6px ${1 - splitX}fr` : '1fr' }}>
              {hasTL && tile('tl')}
              {hasTL && hasTR && <div className="np-gutter-x" onPointerDown={dragX} />}
              {hasTR && tile('tr')}
            </div>
          )}
          {hasTop && hasB && <div className="np-gutter-y" onPointerDown={dragY} />}
          {hasB && <div className="np-row">{tile('b')}</div>}
          {!hasTop && !hasB && (
            <div className="np-all-closed">
              <p>All panes are closed.</p>
              <button type="button" className="btn ghost sm" onClick={() => setLayout(DEFAULT_LAYOUT)}>
                Restore default layout
              </button>
            </div>
          )}
        </div>
        <div className={`np-foot save-${saveState}`}>
          {saveState === 'offline'
            ? '⚠ Database not reachable: your notes are kept safely on this device and will sync automatically when the server is back.'
            : saveState === 'saving'
            ? 'Saving…'
            : '✓ Saved to your database'}
        </div>
      </aside>
    </>
  );
}

// Saved snapshots of this class's note (taken every few minutes and before
// any big deletion). Restoring keeps the current text as a snapshot too.
function Versions({ lesson, current, onRestore }) {
  const [list, setList] = useState(null);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (!lesson) return;
    setList(null);
    fetch(`/api/progress/note-versions?lessonId=${encodeURIComponent(lesson.id)}`)
      .then((r) => r.json())
      .then((d) => setList(d.versions || []))
      .catch(() => setList([]));
  }, [lesson, current === '']); // eslint-disable-line react-hooks/exhaustive-deps
  if (!lesson) return <div className="np-guide np-tip">Open a class to see its earlier versions.</div>;
  if (!list) return <div className="np-guide np-tip">Loading…</div>;
  return (
    <div className="np-guide">
      <p className="np-guide-intro">Snapshots are kept every few minutes and whenever a lot of text disappears at once.</p>
      {!list.length && <p className="np-tip">No earlier versions yet.</p>}
      {list.map((v) => (
        <article key={v.id} className="np-version">
          <header>
            <strong>{new Date(`${v.saved_at.replace(' ', 'T')}Z`).toLocaleString()}</strong>
            <span>{v.notes.length} characters</span>
          </header>
          <div className="exam-actions">
            <button type="button" className="btn ghost sm" onClick={() => setOpen(open === v.id ? null : v.id)}>
              {open === v.id ? 'Hide' : 'Preview'}
            </button>
            <button type="button" className="btn primary sm" onClick={() => onRestore(v.notes)}>
              Restore this
            </button>
          </div>
          {open === v.id && <div className="np-preview" dangerouslySetInnerHTML={{ __html: renderNote(v.notes) }} />}
        </article>
      ))}
    </div>
  );
}
