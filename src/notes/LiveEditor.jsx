import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { EditorState, StateField, RangeSetBuilder } from '@codemirror/state';
import { EditorView, Decoration, WidgetType, keymap, placeholder as cmPlaceholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { syntaxHighlighting, HighlightStyle, syntaxTree } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import katex from 'katex';

// One editor that renders as you type, like Obsidian's live preview:
// maths and markdown marks are shown rendered everywhere except where the
// cursor is, so you can still click into anything to edit the raw text.

class MathWidget extends WidgetType {
  constructor(tex, display, from) {
    super();
    this.tex = tex;
    this.display = display;
    this.from = from;
  }
  eq(other) {
    return other.tex === this.tex && other.display === this.display;
  }
  toDOM(view) {
    const el = document.createElement(this.display ? 'div' : 'span');
    el.className = this.display ? 'cm-math cm-math-block' : 'cm-math';
    el.innerHTML = katex.renderToString(this.tex, { displayMode: this.display, throwOnError: false, strict: false });
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      // jump into the source of this formula
      view.dispatch({ selection: { anchor: this.from + (this.display ? 2 : 1) } });
      view.focus();
    });
    return el;
  }
  ignoreEvent() {
    return false;
  }
}

const touches = (sel, from, to) => sel.ranges.some((r) => r.from <= to && r.to >= from);

function buildDecorations(state) {
  const text = state.doc.toString();
  const sel = state.selection;
  const found = [];

  // $$ … $$ (may span lines) first, then inline $ … $
  const taken = [];
  for (const m of text.matchAll(/\$\$([\s\S]+?)\$\$/g)) {
    const from = m.index;
    const to = from + m[0].length;
    taken.push([from, to]);
    if (touches(sel, from, to)) continue;
    const multiLine = m[0].includes('\n');
    const lineStart = state.doc.lineAt(from).from === from;
    const lineEnd = state.doc.lineAt(to).to === to;
    found.push({
      from,
      to,
      deco: Decoration.replace({ widget: new MathWidget(m[1].trim(), true, from), block: multiLine && lineStart && lineEnd }),
    });
  }
  for (const m of text.matchAll(/(^|[^\\$])\$([^$\n]+?)\$/g)) {
    const from = m.index + m[1].length;
    const to = m.index + m[0].length;
    if (taken.some(([a, b]) => from < b && to > a)) continue;
    if (touches(sel, from, to)) continue;
    found.push({ from, to, deco: Decoration.replace({ widget: new MathWidget(m[2], false, from) }) });
  }

  // Hide markdown marks (#, **, _, `) on lines the cursor is not on.
  const cursorLines = new Set(sel.ranges.map((r) => state.doc.lineAt(r.head).number));
  syntaxTree(state).iterate({
    enter: (node) => {
      if (!['HeaderMark', 'EmphasisMark', 'CodeMark'].includes(node.name)) return;
      const line = state.doc.lineAt(node.from).number;
      if (cursorLines.has(line)) return;
      if (found.some((f) => node.from < f.to && node.to > f.from)) return;
      let to = node.to;
      if (node.name === 'HeaderMark' && text[to] === ' ') to += 1;
      found.push({ from: node.from, to, deco: Decoration.replace({}) });
    },
  });

  found.sort((a, b) => a.from - b.from || a.to - b.to);
  const builder = new RangeSetBuilder();
  let last = -1;
  for (const f of found) {
    if (f.from < last) continue; // never overlap
    builder.add(f.from, f.to, f.deco);
    last = f.to;
  }
  return builder.finish();
}

const livePreview = StateField.define({
  create: (state) => buildDecorations(state),
  update: (deco, tr) => (tr.docChanged || tr.selection ? buildDecorations(tr.state) : deco),
  provide: (f) => EditorView.decorations.from(f),
});

const look = HighlightStyle.define([
  { tag: tags.heading1, fontSize: '1.6em', fontWeight: '700', fontFamily: 'var(--sans)' },
  { tag: tags.heading2, fontSize: '1.3em', fontWeight: '700', fontFamily: 'var(--sans)' },
  { tag: tags.heading3, fontSize: '1.12em', fontWeight: '700', fontFamily: 'var(--sans)' },
  { tag: tags.strong, fontWeight: '700' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.monospace, fontFamily: 'var(--mono)', color: 'var(--yellow)' },
  { tag: tags.list, color: 'var(--blue)' },
  { tag: tags.link, color: 'var(--blue)', textDecoration: 'underline' },
]);

const theme = EditorView.theme(
  {
    '&': { height: '100%', fontSize: '15px', color: 'var(--text)', backgroundColor: 'transparent' },
    '.cm-scroller': { fontFamily: 'var(--sans)', lineHeight: '1.65', overflow: 'auto' },
    '.cm-content': { padding: '14px 16px', caretColor: 'var(--blue)' },
    '&.cm-focused': { outline: 'none' },
    '.cm-cursor': { borderLeftColor: 'var(--blue)' },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { backgroundColor: 'rgba(88,196,221,0.25) !important' },
    '.cm-placeholder': { color: 'var(--faint)' },
    '.cm-math': { cursor: 'text', padding: '0 1px' },
    '.cm-math-block': { display: 'block', textAlign: 'center', padding: '6px 0' },
  },
  { dark: true }
);

const LiveEditor = forwardRef(function LiveEditor({ value, onChange, placeholder }, ref) {
  const host = useRef(null);
  const view = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    view.current = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          markdown(),
          syntaxHighlighting(look),
          livePreview,
          EditorView.lineWrapping,
          cmPlaceholder(placeholder || ''),
          theme,
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current?.(u.state.doc.toString());
          }),
        ],
      }),
    });
    return () => view.current?.destroy();
    // the editor is created once; outside changes are synced below
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep in sync when the note changes from outside (switching class).
  useEffect(() => {
    const v = view.current;
    if (v && v.state.doc.toString() !== value) {
      v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: value } });
    }
  }, [value]);

  useImperativeHandle(ref, () => ({
    insert(snippet) {
      const v = view.current;
      if (!v) return;
      const { from, to } = v.state.selection.main;
      const before = v.state.doc.sliceString(Math.max(0, from - 1), from);
      const text = (from > 0 && before !== '\n' && snippet.startsWith('$$') ? '\n' : '') + snippet;
      v.dispatch({ changes: { from, to, insert: text }, selection: { anchor: from + text.length } });
      v.focus();
    },
  }));

  return <div className="live-editor" ref={host} />;
});

export default LiveEditor;
