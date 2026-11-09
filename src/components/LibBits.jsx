// Small pieces shared by the Library shelves.

export function ClassChips({ ids, byId, progress, onOpen }) {
  const ls = [...new Set(ids)].map((id) => byId[id]).filter(Boolean);
  if (!ls.length) return null;
  return (
    <div className="lib-classes">
      <span className="eyebrow">In your classes</span>
      <div className="chips">
        {ls.map((l) => (
          <button key={l.id} type="button" className="chip pw-class" onClick={() => onOpen(l.id)}>
            {progress.passed[l.id] ? '✓ ' : ''}
            {l.code} · {l.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Sources({ list }) {
  return (
    <ul className="lib-src">
      {list.map((s) => (
        <li key={s.url + s.title}>
          <a href={s.url} target="_blank" rel="noreferrer">
            {s.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
