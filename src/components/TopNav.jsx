import { useLayoutEffect, useRef, useState } from 'react';

// Top navigation. A few main tabs sit in the bar; the rest live in small
// grouped menus ("Explore", "You") so the bar stays short. An entry is either
// a tab { id, label } or a group { group, label, children: [{ id, label, hint }] }.
// If the bar gets narrow (for example when the notes panel is widened), entries
// that do not fit move, from the end, into a "More" menu.
export default function TopNav({ items, view, onPick }) {
  const navRef = useRef(null);
  const measureRef = useRef(null);
  const [fit, setFit] = useState(items.length);
  const [open, setOpen] = useState(null); // key of the open menu

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

  useLayoutEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (!navRef.current?.contains(e.target)) setOpen(null);
    };
    const esc = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const pick = (id) => {
    setOpen(null);
    onPick(id);
  };
  const keyOf = (it) => it.id || it.group;
  const holds = (it) => (it.children ? it.children.some((c) => c.id === view) : it.id === view);

  const shown = items.slice(0, fit);
  const hidden = items.slice(fit);

  const menuItem = (c) => (
    <button key={c.id} type="button" role="menuitem" className={view === c.id ? 'on' : ''} onClick={() => pick(c.id)}>
      <span className="tm-label">{c.label}</span>
      {c.hint && <span className="tm-hint">{c.hint}</span>}
    </button>
  );

  const dropdown = (key, label, active, body, end) => (
    <div className={`topnav-more${end ? ' end' : ''}`} key={key}>
      <button type="button" className={active ? 'on' : ''} aria-haspopup="menu" aria-expanded={open === key} onClick={() => setOpen((o) => (o === key ? null : key))}>
        {label} <span className="topnav-caret">▾</span>
      </button>
      {open === key && (
        <div className="topnav-menu" role="menu">
          {body}
        </div>
      )}
    </div>
  );

  return (
    <nav className="topnav" ref={navRef}>
      {shown.map((it) =>
        it.children ? (
          dropdown(it.group, it.label, holds(it), it.children.map(menuItem), it === items[items.length - 1])
        ) : (
          <button key={it.id} type="button" className={view === it.id ? 'on' : ''} onClick={() => pick(it.id)}>
            {it.label}
          </button>
        ),
      )}
      {hidden.length > 0 &&
        dropdown(
          '__more',
          'More',
          hidden.some(holds),
          hidden.map((it) =>
            it.children ? (
              <div className="topnav-menu-group" key={it.group}>
                <div className="topnav-menu-head">{it.label}</div>
                {it.children.map(menuItem)}
              </div>
            ) : (
              menuItem(it)
            ),
          ),
          true,
        )}
      <div className="topnav-measure" ref={measureRef} aria-hidden="true">
        {items.map((it) => (
          <button key={keyOf(it)} type="button" tabIndex={-1}>
            {it.label}
            {it.children && <span className="topnav-caret"> ▾</span>}
          </button>
        ))}
        <button type="button" tabIndex={-1}>
          More <span className="topnav-caret">▾</span>
        </button>
      </div>
    </nav>
  );
}
