import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stage } from '../viz/Stage';
import { SCENES, initialParams } from '../viz/scenes';
import 'katex/dist/katex.min.css';

const beatDuration = (say, b) => b?.ms ?? 2600 + say.length * 42;

// Playback speed, remembered on this device like the narration switch.
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const SPEED_KEY = 'scene-speed';
const loadSpeed = () => {
  try {
    const v = Number(localStorage.getItem(SPEED_KEY));
    return SPEEDS.includes(v) ? v : 1;
  } catch {
    return 1;
  }
};
const speedLabel = (v) => `${v}×`;

// The camera framing a step asks for: the latest `cam` at or before it.
const camAt = (beats, i) => {
  for (let j = i; j >= 0; j--) if (beats[j] && 'cam' in beats[j]) return beats[j].cam;
  return null;
};

// Read-aloud narration, like the voice over a 3Blue1Brown video.
const VOICE_KEY = 'scene-voice';
const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
let pickedVoice = null;
function voice() {
  if (pickedVoice || !canSpeak) return pickedVoice;
  const all = window.speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
  const rank = (v) => (/natural|neural|online/i.test(v.name) ? 0 : 2) + (/en-(US|GB)/i.test(v.lang) ? 0 : 1);
  pickedVoice = all.sort((a, b) => rank(a) - rank(b))[0] || null;
  return pickedVoice;
}
let speechRate = 0.98;
function speak(text, onEnd) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/×/g, ' times ').replace(/−/g, ' minus ').replace(/≈/g, ' about '));
  const v = voice();
  if (v) u.voice = v;
  u.rate = speechRate;
  u.onend = onEnd;
  u.onerror = onEnd;
  window.speechSynthesis.speak(u);
}
const hush = () => canSpeak && window.speechSynthesis.cancel();

export default function SceneView({ type, mission, beat, onGoal, goalDone }) {
  const def = SCENES[type];
  const box = useRef(null);
  const stage = useRef(null);
  const timer = useRef(null);
  const [target, setTarget] = useState(() => (def ? initialParams(def) : {}));
  const [caption, setCaption] = useState('');
  const [playing, setPlaying] = useState(-1);
  const [cur, setCur] = useState(-1); // the step shown (−1: none yet)
  const [ready, setReady] = useState(false);
  const seen = useRef({});
  const touched = useRef(false);
  const [voiceOn, setVoiceOn] = useState(() => {
    try {
      return localStorage.getItem(VOICE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const voiceRef = useRef(voiceOn);
  voiceRef.current = voiceOn;
  const [speed, setSpeedState] = useState(loadSpeed);
  const speedRef = useRef(speed);
  speedRef.current = speed;
  speechRate = Math.min(1.8, Math.max(0.6, 0.98 * Math.sqrt(speed)));
  const shell = useRef(null);
  const [isFull, setIsFull] = useState(false);
  const scrubbing = useRef(false);
  const dur = (say, b) => beatDuration(say, b) / speedRef.current;

  // (Re)build the three.js stage when the scene type changes.
  useEffect(() => {
    if (!def || !box.current) return undefined;
    const init = initialParams(def);
    seen.current = {};
    touched.current = false;
    setTarget(init);
    setCaption('');
    setCur(-1);
    setReady(false);
    stage.current = new Stage(box.current, def, init);
    let raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => setReady(true))));
    // Show step 1 straight away, so the learner sees what is going on.
    const first = def.beats?.[0];
    if (first) {
      stage.current.setTarget({ ...init, ...first.set });
      setTarget({ ...init, ...first.set });
      setCaption(first.say);
      setCur(0);
      stage.current.setNotes(first.notes);
      stage.current.setCam(camAt(def.beats, 0));
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer.current);
      hush();
      stage.current?.dispose();
      stage.current = null;
    };
  }, [def]);

  const apply = useCallback((nextIn, fromUser, keepCam) => {
    // Touching a control opens the whole picture: story-only settings
    // (hidden from the controls) jump to their "free play" values.
    const next = fromUser && def?.free ? { ...def.free, ...nextIn } : nextIn;
    for (const [k, v] of Object.entries(next)) {
      (seen.current[k] ||= new Set()).add(v);
    }
    if (fromUser) {
      touched.current = true;
      setCaption('');
      setCur(-1);
      hush();
      stage.current?.setNotes([]);
      if (!keepCam) stage.current?.setCam(null);
    }
    stage.current?.setTarget(next);
    setTarget((prev) => ({ ...prev, ...next }));
  }, [def]);

  const stop = useCallback(() => {
    clearTimeout(timer.current);
    setPlaying(-1);
  }, []);

  // Dragging a point in the picture is the same as moving its control.
  useEffect(() => {
    if (!stage.current) return;
    stage.current.onUser = (next) => {
      stop();
      apply(next, true, true);
    };
  }, [def, apply, stop]);

  const playFrom = useCallback(
    (i, chain) => {
      clearTimeout(timer.current);
      const b = def?.beats?.[i];
      if (!b) {
        setPlaying(-1);
        return;
      }
      // Rebuild the picture from the start up to this step, so going back
      // always shows exactly what that step showed.
      const upTo = def.beats.slice(0, i + 1).reduce((acc, x) => ({ ...acc, ...x.set }), initialParams(def));
      apply(upTo, false);
      stage.current?.setNotes(b.notes);
      stage.current?.setCam(camAt(def.beats, i));
      setCaption(b.say);
      setCur(i);
      setPlaying(chain ? i : -1);
      const next = () => {
        if (i + 1 < def.beats.length) playFrom(i + 1, true);
        else {
          setPlaying(-1);
          touched.current = true;
        }
      };
      if (voiceRef.current) {
        // wait for both the picture and the voice before moving on
        let spoke = !chain;
        let shown = !chain;
        const go = () => spoke && shown && next();
        speak(b.say, () => {
          spoke = true;
          if (chain) timer.current = setTimeout(go, 700);
        });
        if (chain) timer.current = setTimeout(() => ((shown = true), go()), Math.min(dur(b.say, b), 5000 / speedRef.current));
      } else if (chain) {
        timer.current = setTimeout(next, dur(b.say, b));
      }
    },
    [def, apply]
  );

  // Steps outside the canvas can drive it.
  useEffect(() => {
    if (beat == null || !def) return;
    playFrom(beat, false);
  }, [beat, def, playFrom]);

  useEffect(() => {
    if (!def || goalDone) return;
    const ok = def.goal ? def.goal(target, seen.current) : touched.current;
    // Only the learner's own moves count, not the narrated walkthrough.
    if (ok && touched.current) onGoal?.();
  }, [target, def, goalDone, onGoal]);

  useEffect(() => {
    const on = () => setIsFull(document.fullscreenElement === shell.current);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  const readout = useMemo(() => (def?.readout ? def.readout(target) : []), [def, target]);

  if (!def) {
    return <div className="scene-missing">No animation for this lesson yet.</div>;
  }

  const nBeats = def.beats?.length || 0;

  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else shell.current?.requestFullscreen?.();
  };

  const setSpeed = (v) => {
    setSpeedState(v);
    speedRef.current = v;
    try {
      localStorage.setItem(SPEED_KEY, String(v));
    } catch {
      // not remembered in a private window
    }
    // carry on at the new pace from the step being shown
    if (playing >= 0) playFrom(playing, true);
  };
  const cycleSpeed = () => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]);

  // Play this step's change again from the step before it.
  const replayStep = () => {
    const i = Math.max(0, cur);
    if (!nBeats) return stage.current?.replayIntro();
    const before = def.beats.slice(0, i).reduce((acc, x) => ({ ...acc, ...x.set }), initialParams(def));
    stage.current?.setTarget(before);
    stage.current?.snap();
    if (i === 0) stage.current?.replayIntro();
    requestAnimationFrame(() => playFrom(i, playing >= 0));
  };

  const togglePlay = () => (playing >= 0 ? stop() : nBeats && playFrom(cur >= 0 && cur < nBeats - 1 ? cur : 0, true));

  // Scrub bar: press or drag across it to jump between steps.
  const stepAt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return Math.max(0, Math.min(nBeats - 1, Math.floor(((e.clientX - r.left) / r.width) * nBeats)));
  };
  const scrubDown = (e) => {
    if (!nBeats) return;
    scrubbing.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    stop();
    playFrom(stepAt(e), false);
  };
  const scrubMove = (e) => {
    if (!scrubbing.current) return;
    const i = stepAt(e);
    if (i !== cur) playFrom(i, false);
  };
  const scrubUp = () => {
    scrubbing.current = false;
  };
  const scrubKey = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (cur > 0) playFrom(cur - 1, false);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (cur < nBeats - 1) playFrom(cur + 1, false);
    } else if (e.key === 'Home') {
      e.preventDefault();
      playFrom(0, false);
    } else if (e.key === 'End') {
      e.preventDefault();
      playFrom(nBeats - 1, false);
    }
  };

  // Keyboard, while the player has focus: space plays, arrows step,
  // R replays the step, F goes full screen.
  const onKey = (e) => {
    if (e.target.closest?.('input, textarea, select, [role="slider"]')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'k') {
      e.preventDefault();
      togglePlay();
    } else if (k === 'arrowright' && cur < nBeats - 1) {
      e.preventDefault();
      playFrom(cur + 1, false);
    } else if (k === 'arrowleft' && cur > 0) {
      e.preventDefault();
      playFrom(cur - 1, false);
    } else if (k === 'r') replayStep();
    else if (k === 'f') fullscreen();
  };

  return (
    <div className="scene">
      <div className={`scene-stage player ${isFull ? 'is-full' : ''}`} ref={shell} tabIndex={-1} onKeyDown={onKey}>
        <div className="scene-view" onPointerDown={() => shell.current?.focus({ preventScroll: true })}>
          <div className="scene-canvas" ref={box} />
          {!ready && <div className="scene-loading">Setting up the animation…</div>}
          {def.camera?.kind === '3d' && <div className="scene-hint">drag to rotate · scroll to zoom</div>}
          {cur === nBeats - 1 && nBeats > 1 && playing < 0 && (def.mission || mission) && (
            <div className="scene-yourturn">
              <strong>Your turn.</strong> {def.mission || mission.replace(/^Lab Mission:\s*/i, '')} <span>Use the controls below{stage.current?.handles?.length ? ', or drag the glowing points' : ''}.</span>
            </div>
          )}
        </div>
        <div className="scene-bar">
          {/* Every step's text sits invisibly in the same spot, so the bar is always as tall as the longest step and nothing below it jumps. */}
          <div className="scene-caption-wrap">
            {(def.beats || []).map((b, i) => (
              <div key={`g${i}`} className="scene-caption ghost" aria-hidden="true">
                <strong className="scene-step-tag">Step {i + 1} of {nBeats} · </strong>
                {b.say}
              </div>
            ))}
            <div className="scene-caption ghost empty" aria-hidden="true">
              Press play, drag along the bar below, or move the sliders.
            </div>
            <div className={`scene-caption ${caption ? '' : 'empty'}`} key={caption} aria-live="polite">
              {caption && cur >= 0 && <strong className="scene-step-tag">Step {cur + 1} of {nBeats} · </strong>}
              {caption || 'Press play, drag along the bar below, or move the sliders.'}
            </div>
          </div>
        </div>
        <div className="player-bar">
          <div className="player-left">
            <button type="button" className="pb" disabled={cur <= 0} onClick={() => playFrom(cur - 1, false)} title="Previous step (←)" aria-label="Previous step">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
            </button>
            <button type="button" className="pb play" disabled={!nBeats} onClick={togglePlay} title={playing >= 0 ? 'Pause (space)' : 'Play the steps (space)'} aria-label={playing >= 0 ? 'Pause' : 'Play'}>
              {playing >= 0 ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <button type="button" className="pb" disabled={cur >= nBeats - 1} onClick={() => playFrom(cur + 1, false)} title="Next step (→)" aria-label="Next step">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
            </button>
            <button type="button" className="pb" onClick={replayStep} title="Replay this step (R)" aria-label="Replay this step">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" /></svg>
            </button>
          </div>
          {nBeats > 0 && (
            <div
              className="scrub"
              role="slider"
              tabIndex={0}
              aria-label="Steps"
              aria-valuemin={1}
              aria-valuemax={nBeats}
              aria-valuenow={Math.max(1, cur + 1)}
              aria-valuetext={`Step ${Math.max(1, cur + 1)} of ${nBeats}`}
              onPointerDown={scrubDown}
              onPointerMove={scrubMove}
              onPointerUp={scrubUp}
              onPointerCancel={scrubUp}
              onKeyDown={scrubKey}
            >
              {def.beats.map((b, i) => (
                <span key={i} className={`scrub-seg ${i < cur ? 'past' : ''} ${i === cur ? 'now' : ''}`} title={`Step ${i + 1}`}>
                  <span
                    className={`scrub-fill ${i === playing ? 'run' : ''}`}
                    key={i === playing ? `run-${caption}-${speed}` : 'still'}
                    style={i === playing ? { animationDuration: `${dur(b.say, b)}ms` } : undefined}
                  />
                </span>
              ))}
            </div>
          )}
          <div className="player-right">
            <span className="player-count">
              {Math.max(0, cur + 1)}/{nBeats}
            </span>
            <button type="button" className="pb speed" onClick={cycleSpeed} title="Playback speed" aria-label={`Playback speed ${speedLabel(speed)}`}>
              {speedLabel(speed)}
            </button>
            {canSpeak && (
              <button
                type="button"
                className={`pb ${voiceOn ? 'on' : ''}`}
                title={voiceOn ? 'Narration on: each step is read aloud' : 'Read each step aloud'}
                aria-label="Read aloud"
                aria-pressed={voiceOn}
                onClick={() => {
                  const v = !voiceOn;
                  setVoiceOn(v);
                  try {
                    localStorage.setItem(VOICE_KEY, v ? '1' : '0');
                  } catch {
                    // private window: the choice just isn't remembered
                  }
                  if (v && caption) speak(caption);
                  else hush();
                }}
              >
                {voiceOn ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l5 6M22 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
              </button>
            )}
            <button type="button" className="pb" onClick={fullscreen} title={isFull ? 'Leave full screen (F)' : 'Full screen (F)'} aria-label="Full screen">
              {isFull ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {(def.mission || mission) && (
        <div className={`mission ${goalDone ? 'done' : ''}`}>
          <span className="mission-icon">{goalDone ? '✓' : '◎'}</span>
          <span>
            <strong>Try it: </strong>
            {def.mission || mission.replace(/^Lab Mission:\s*/i, '')}
          </span>
        </div>
      )}

      <div className="scene-panel">
        <div className="controls">
          {def.params.filter((p) => !p.hidden).map((p) =>
            p.type === 'choice' ? (
              <div key={p.key} className="control">
                <span className="control-label">{p.label}</span>
                <div className="segmented">
                  {p.options.map((o) => (
                    <button
                      key={String(o.value)}
                      type="button"
                      className={target[p.key] === o.value ? 'on' : ''}
                      onClick={() => {
                        stop();
                        apply({ [p.key]: o.value }, true);
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <label key={p.key} className="control">
                <span className="control-label">
                  {p.label}
                  <output>{target[p.key]}</output>
                </span>
                <input
                  type="range"
                  min={p.min}
                  max={p.max}
                  step={p.step}
                  value={target[p.key]}
                  onChange={(e) => {
                    stop();
                    apply({ [p.key]: Number(e.target.value) }, true);
                  }}
                />
              </label>
            )
          )}
        </div>
        {readout.length > 0 && (
          <dl className="readout">
            {readout.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{String(v)}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
