import { useLayoutEffect, useRef, useState } from 'react';

// Top navigation that fits whatever width it gets (for example when the notes panel is
// widened): tabs that do not fit move, from the end, into a "More" menu.
export default function TopNav({ items, view, onPick }) {
  const navRef = useRef(null);
  const measureRef = useRef(null);
  const [fit, setFit] = useState(items.length);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const measure = measureRef.current;
    if (!nav || !measure) return undefined;
    const compute = () => {
      const widths = [...measure.children].map((el) => el.getBoundingClientRect().width);
      const moreW = widths.pop();
      const gap = 4;
      const avail = nav.clientWidth;
      const total = widths.reduce((s, w) => s + w + gap, 0);
      if (total <= avail) return setFit(items.length);
      let used = moreW;
      let n = 0;
      while (n < widths.length && used + widths[n] + gap <= avail) used += widths[n++] + gap;
      setFit(n);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [items]);

  const shown = items.slice(0, fit);
  const hidden = items.slice(fit);
  const hiddenActive = hidden.find((it) => it.id === view);

  useLayoutEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (!navRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <nav className="topnav" ref={navRef}>
      {shown.map((it) => (
        <button key={it.id} type="button" className={view === it.id ? 'on' : ''} onClick={() => onPick(it.id)}>
          {it.label}
        </button>
      ))}
      {hidden.length > 0 && (
        <div className="topnav-more">
          <button type="button" className={hiddenActive ? 'on' : ''} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {hiddenActive ? hiddenActive.label : 'More'} ▾
          </button>
          {open && (
            <div className="topnav-menu" role="menu">
              {hidden.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  role="menuitem"
                  className={view === it.id ? 'on' : ''}
                  onClick={() => {
                    setOpen(false);
                    onPick(it.id);
                  }}
                >
                  {it.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="topnav-measure" ref={measureRef} aria-hidden="true">
        {items.map((it) => (
          <button key={it.id} type="button" tabIndex={-1}>
            {it.label}
          </button>
        ))}
        <button type="button" tabIndex={-1}>
          Glossary ▾
        </button>
      </div>
    </nav>
  );
}
