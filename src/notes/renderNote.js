import { marked } from 'marked';
import katex from 'katex';

// Markdown with $inline$ and $$display$$ maths, rendered like Obsidian.
// Maths is pulled out before Markdown runs so underscores and asterisks
// inside formulas aren't mistaken for italics.
export function renderNote(src) {
  const math = [];
  const stash = (tex, display) => {
    math.push(
      katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false })
    );
    return `@@MATH${math.length - 1}@@`;
  };
  let text = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => `\n\n${stash(tex.trim(), true)}\n\n`);
  text = text.replace(/(^|[^\\$])\$([^$\n]+?)\$/g, (_, pre, tex) => `${pre}${stash(tex, false)}`);
  const html = marked.parse(text, { async: false, breaks: true, gfm: true });
  return html.replace(/@@MATH(\d+)@@/g, (_, i) => math[Number(i)]);
}
