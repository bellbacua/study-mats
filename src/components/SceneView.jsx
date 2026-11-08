import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stage } from '../viz/Stage';
import { SCENES, initialParams } from '../viz/scenes';

const beatDuration = (say) => 2600 + say.length * 42;

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
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer.current);
      stage.current?.dispose();
      stage.current = null;
    };
  }, [def]);

  const apply = useCallback((next, fromUser) => {
    for (const [k, v] of Object.entries(next)) {
      (seen.current[k] ||= new Set()).add(v);
    }
    if (fromUser) {
      touched.current = true;
      setCaption('');
      setCur(-1);
      stage.current?.setNotes([]);
    }
    stage.current?.setTarget(next);
    setTarget((prev) => ({ ...prev, ...next }));
  }, []);

  const stop = useCallback(() => {
    clearTimeout(timer.current);
    setPlaying(-1);
  }, []);

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
      setCaption(b.say);
      setCur(i);
      setPlaying(chain ? i : -1);
      if (chain) {
        timer.current = setTimeout(() => {
          if (i + 1 < def.beats.length) playFrom(i + 1, true);
          else {
            setPlaying(-1);
            touched.current = true;
          }
        }, beatDuration(b.say));
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
        </div>
        <div className="scene-bar">
          <div className={`scene-caption ${caption ? '' : 'empty'}`} key={caption}>
            {caption && cur >= 0 && <strong className="scene-step-tag">Step {cur + 1} of {nBeats} · </strong>}
            {caption || 'Use the step buttons, press “Auto-play”, or move the sliders below.'}
            {playing >= 0 && <span className="scene-timer" style={{ animationDuration: `${beatDuration(caption)}ms` }} />}
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
          {def.params.map((p) =>
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
