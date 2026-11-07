import { useRef, useState } from 'react';
import { CURRICULUM_TERMS, LESSONS } from '../data/path';

const download = (name, text, type = 'text/markdown') => {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const stamp = () => new Date().toISOString().slice(0, 10);

export function notesMarkdown(notes) {
  const parts = [`# Study Mats notes\n\n_Exported ${stamp()}_\n`];
  for (const term of CURRICULUM_TERMS) {
    const lessons = LESSONS.filter((l) => l.termId === term.id && notes[l.id]?.trim());
    if (!lessons.length) continue;
    parts.push(`\n## ${term.title}\n`);
    for (const l of lessons) parts.push(`\n### ${l.code} · ${l.title}\n\n${notes[l.id].trim()}\n`);
  }
  return parts.join('');
}

const post = (url, body) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

export default function ExportPanel({ progress, onPrintWeek }) {
  const [week, setWeek] = useState(1);
  const [msg, setMsg] = useState('');
  const file = useRef(null);
  const noteCount = Object.values(progress.notes).filter((n) => n?.trim()).length;

  const backup = async () => {
    const data = await fetch('/api/progress').then((r) => r.json());
    download(`study-mats-backup-${stamp()}.json`, JSON.stringify({ app: 'study-mats', version: 1, exportedAt: new Date().toISOString(), data }, null, 2), 'application/json');
  };

  // Restore merges into the database: nothing already there is deleted.
  const restore = async (f) => {
    try {
      const { data } = JSON.parse(await f.text());
      if (!data || typeof data !== 'object') throw new Error('Not a Study Mats backup file');
      await post('/api/progress', {
        passedLessons: data.passedLessons,
        completedLabs: data.completedLabs,
        completedReadings: data.completedReadings,
        activeLessonId: data.activeLessonId,
      });
      for (const [id, text] of Object.entries(data.lessonNotes || {})) await post('/api/progress/lesson-note', { lessonId: id, notes: text });
      for (const [id, list] of Object.entries(data.examResults || {}))
        for (const r of list) await post('/api/progress/exam', { examId: id, score: r.score, total: r.total, detail: r.detail });
      for (const [day, v] of Object.entries(data.studyDays || {})) await post('/api/progress/activity', { day, actions: v.actions, minutes: v.minutes });
      setMsg('Restored. Reloading…');
      setTimeout(() => location.reload(), 800);
    } catch (e) {
      setMsg(`Couldn’t restore: ${e.message}`);
    }
  };

  return (
    <section className="export" data-reveal>
      <h2 className="section-title">Export & backup</h2>
      <div className="exam-grid">
        <article className="exam-card">
          <span className="eyebrow">Notes</span>
          <h3>Markdown file</h3>
          <p>All {noteCount} class notes in one .md file, grouped by week. Opens cleanly in Obsidian.</p>
          <div className="exam-actions">
            <button type="button" className="btn primary sm" disabled={!noteCount} onClick={() => download(`study-mats-notes-${stamp()}.md`, notesMarkdown(progress.notes))}>
              Download notes
            </button>
          </div>
        </article>
        <article className="exam-card">
          <span className="eyebrow">Study guide</span>
          <h3>Printable week guide</h3>
          <p>Each class’s short version, formulas, history and your notes on clean pages. Save it as a PDF from the print dialog.</p>
          <div className="exam-actions">
            <select className="search" style={{ maxWidth: 120 }} value={week} onChange={(e) => setWeek(Number(e.target.value))}>
              {CURRICULUM_TERMS.map((t, i) => (
                <option key={t.id} value={i + 1}>
                  Week {i + 1}
                </option>
              ))}
            </select>
            <button type="button" className="btn primary sm" onClick={() => onPrintWeek(week)}>
              Open guide
            </button>
          </div>
        </article>
        <article className="exam-card">
          <span className="eyebrow">Everything</span>
          <h3>Backup & restore</h3>
          <p>One file with your progress, notes, exam results and calendar. Restoring adds to what’s here; it never deletes.</p>
          <div className="exam-actions">
            <button type="button" className="btn primary sm" onClick={backup}>
              Download backup
            </button>
            <button type="button" className="btn ghost sm" onClick={() => file.current?.click()}>
              Restore…
            </button>
            <input ref={file} type="file" accept="application/json" hidden onChange={(e) => e.target.files[0] && restore(e.target.files[0])} />
          </div>
          {msg && <p className="notes-hint">{msg}</p>}
        </article>
      </div>
    </section>
  );
}
