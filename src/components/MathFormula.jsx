import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathFormula({ tex, display = true, className = '' }) {
  if (!tex) return null;

  let html = '';
  try {
    html = katex.renderToString(tex, {
      throwOnError: false,
      displayMode: display,
      strict: false,
      trust: true,
    });
  } catch {
    html = `<code>${tex}</code>`;
  }

  return (
    <div
      className={`katex-formula-wrap ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
