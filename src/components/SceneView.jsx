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
    stage.current = new Stage(box.current, def, init);
    return () => {
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
      apply(b.set, false);
      setCaption(b.say);
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
          {def.camera?.kind === '3d' && <div className="scene-hint">drag to rotate · scroll to zoom</div>}
        </div>
        <div className="scene-bar">
          <div className={`scene-caption ${caption ? '' : 'empty'}`} key={caption}>
            {caption || 'Press “Watch it explained”, or move the sliders below.'}
          </div>
          <div className="scene-tools">
            {playing >= 0 ? (
              <button type="button" onClick={stop}>
                ❚❚ Pause
              </button>
            ) : (
              <button type="button" onClick={() => playFrom(0, true)}>
                ▶ Watch it explained
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
