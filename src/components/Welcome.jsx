import { useState } from 'react';
import { PROGRAMS, SIDES, trackLessons } from '../data/path';

// First open: choose a main program and, if you like, side topics.
export default function Welcome({ onDone }) {
  const [program, setProgram] = useState('mate');
  const [sides, setSides] = useState(() => new Set());
  const [startHere, setStartHere] = useState(true);
  const [place, setPlace] = useState(false);
  const flip = (id) =>
    setSides((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  return (
    <div className="welcome">
      <div className="welcome-card">
        <span className="brand-mark">∂</span>
        <h1>Welcome to Study Mats</h1>
        <p>Pick your main program. You can add side topics from other fields too; they sit in your timetable like GE classes.</p>

        <h2>Main program</h2>
        <div className="welcome-options">
          {PROGRAMS.map((p) => (
            <button key={p.id} type="button" className={`welcome-option ${program === p.id ? 'on' : ''}`} disabled={!p.ready} onClick={() => setProgram(p.id)}>
              <strong>{p.title}</strong>
              <span className="notes-hint">{p.ready ? p.blurb : 'Coming later'}</span>
            </button>
          ))}
        </div>

        <h2>Side topics (optional)</h2>
        <div className="welcome-options">
          {SIDES.filter((t) => !(program === 'cs' && t.id === 'comp')).map((t) => {
            const n = trackLessons(t.id).length;
            return (
              <button key={t.id} type="button" className={`welcome-option ${sides.has(t.id) ? 'on' : ''}`} disabled={!n} onClick={() => flip(t.id)}>
                <strong>
                  {t.icon} {t.title}
                </strong>
                <span className="notes-hint">{n ? `${n} classes. ${t.blurb}` : 'Being written'}</span>
              </button>
            );
          })}
        </div>

        <h2>New to studying?</h2>
        <label className="welcome-option welcome-start">
          <input type="checkbox" checked={startHere} onChange={(e) => setStartHere(e.target.checked)} />
          <span>
            <strong>🌱 Begin with Start here</strong>
            <span className="notes-hint">
              Seven short classes before week 1: how memory works, how to test yourself and take notes, what to do when stuck, how to read math symbols and check a claim, and an arithmetic refresher. Untick it if you have studied recently.
            </span>
          </span>
        </label>

        <h2>Already know some of it?</h2>
        <label className="welcome-option welcome-start welcome-place">
          <input type="checkbox" checked={place} onChange={(e) => setPlace(e.target.checked)} />
          <span>
            <strong>🧭 Take a short placement check</strong>
            <span className="notes-hint">
              About 5 minutes, one subject at a time. Say “no, it is new to me” to any subject, or “I have not learned this yet” to any question. The classes you already know stay open on your roadmap; you just do not start with them. Leave it unticked if you are new: everything starts from zero.
            </span>
          </span>
        </label>

        <button type="button" className="btn primary" onClick={() => onDone(program, [...sides], startHere, place)}>
          Start studying
        </button>
        <p className="notes-hint">You can change all of this later on the Program page.</p>
      </div>
    </div>
  );
}
