import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stage } from '../viz/Stage';
import { SCENES, initialParams } from '../viz/scenes';
import 'katex/dist/katex.min.css';

const beatDuration = (say, b) => b?.ms ?? 2600 + say.length * 42;

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
function speak(text, onEnd) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/×/g, ' times ').replace(/−/g, ' minus ').replace(/≈/g, ' about '));
  const v = voice();
  if (v) u.voice = v;
  u.rate = 0.98;
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
        if (chain) timer.current = setTimeout(() => ((shown = true), go()), Math.min(beatDuration(b.say, b), 5000));
      } else if (chain) {
        timer.current = setTimeout(next, beatDuration(b.say, b));
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

  const readout = useMemo(() => (def?.readout ? def.readout(target) : []), [def, target]);

  if (!def) {
    return <div className="scene-missing">No animation for this lesson yet.</div>;
  }

  const nBeats = def.beats?.length || 0;

  const fullscreen = () => {
    const el = box.current?.parentElement;
    if (document.fullscreenElement) document.exitFullscreen();
    else el?.requestFullscreen?.();
  };

  return (
    <div className="scene">
      <div className="scene-stage">
        <div className="scene-view">
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
          <div className={`scene-caption ${caption ? '' : 'empty'}`} key={caption}>
            {caption && cur >= 0 && <strong className="scene-step-tag">Step {cur + 1} of {nBeats} · </strong>}
            {caption || 'Use the step buttons, press “Auto-play”, or move the sliders below.'}
            {playing >= 0 && <span className="scene-timer" style={{ animationDuration: `${beatDuration(caption, def.beats?.[playing])}ms` }} />}
          </div>
          <div className="scene-tools">
            {nBeats > 0 && (
              <>
                <button type="button" disabled={cur <= 0} onClick={() => playFrom(cur - 1, false)} title="Previous step">
                  ◀
                </button>
                <span className="scene-steps" aria-label="Steps">
                  {def.beats.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`scene-step ${i === cur ? 'on' : ''} ${i < cur ? 'past' : ''}`}
                      onClick={() => playFrom(i, false)}
                      title={`Step ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </span>
                <button type="button" disabled={cur >= nBeats - 1} onClick={() => playFrom(cur + 1, false)} title="Next step">
                  ▶
                </button>
              </>
            )}
            {playing >= 0 ? (
              <button type="button" className="play" onClick={stop}>
                ❚❚ Pause
              </button>
            ) : (
              <button type="button" className="play" disabled={!nBeats} onClick={() => playFrom(cur >= 0 && cur < nBeats - 1 ? cur : 0, true)}>
                ▶ Auto-play
              </button>
            )}
            {canSpeak && (
              <button
                type="button"
                className={voiceOn ? 'on' : ''}
                title={voiceOn ? 'Narration on: each step is read aloud' : 'Read each step aloud'}
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
                {voiceOn ? '🔊' : '🔈'}
              </button>
            )}
            <button type="button" onClick={() => stage.current?.replayIntro()} title="Redraw">
              ↻
            </button>
            <button type="button" onClick={fullscreen} title="Full screen">
              ⛶
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
