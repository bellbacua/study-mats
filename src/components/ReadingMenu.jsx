import { useEffect, useRef, useState } from 'react';
import { THEMES, TEXT_SIZES, usePrefs } from '../state/prefs';

// The "Aa" button in the top bar: theme, text size and focus mode.
export default function ReadingMenu() {
  const [prefs, set] = usePrefs();
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => !box.current?.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const sizeIdx = TEXT_SIZES.findIndex((t) => t.id === prefs.text);

  return (
    <div className="reading-menu" ref={box}>
      <button type="button" className="icon-btn" aria-haspopup="dialog" aria-expanded={open} title="Reading: theme, text size, focus" onClick={() => setOpen((o) => !o)}>
        <span className="aa">
          A<small>a</small>
        </span>
      </button>
      {open && (
        <div className="reading-pop" role="dialog" aria-label="Reading settings">
          <span className="eyebrow">Theme</span>
          <div className="theme-picks">
            {THEMES.map((t) => (
              <button key={t.id} type="button" className={`theme-pick ${prefs.theme === t.id ? 'on' : ''}`} aria-pressed={prefs.theme === t.id} onClick={() => set({ theme: t.id })}>
                <span className="theme-swatch" style={{ background: t.swatch[0], color: t.swatch[1] }}>
                  Aa
                </span>
                {t.label}
              </button>
            ))}
          </div>

          <span className="eyebrow">Text size</span>
          <div className="size-row">
            <button type="button" className="icon-btn" disabled={sizeIdx <= 0} onClick={() => set({ text: TEXT_SIZES[sizeIdx - 1].id })} aria-label="Smaller text">
              <small>A</small>
            </button>
            <div className="size-ticks" role="radiogroup" aria-label="Text size">
              {TEXT_SIZES.map((t, i) => (
                <button key={t.id} type="button" role="radio" aria-checked={i === sizeIdx} className={i <= sizeIdx ? 'on' : ''} title={t.label} onClick={() => set({ text: t.id })} />
              ))}
            </div>
            <button type="button" className="icon-btn" disabled={sizeIdx >= TEXT_SIZES.length - 1} onClick={() => set({ text: TEXT_SIZES[sizeIdx + 1].id })} aria-label="Larger text">
              <span style={{ fontSize: 18 }}>A</span>
            </button>
          </div>
          <p className="reading-note">{TEXT_SIZES[sizeIdx]?.label}: changes the lesson text, questions and captions.</p>

          <button
            type="button"
            className={`focus-toggle ${prefs.focus ? 'on' : ''}`}
            aria-pressed={prefs.focus}
            onClick={() => {
              set({ focus: !prefs.focus });
              setOpen(false);
            }}
          >
            <span>
              <strong>Focus mode</strong>
              <small>Hide everything except the page you are on. Esc to leave.</small>
            </span>
            <span className="switch" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
