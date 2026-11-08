import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { C } from './theme';
import { createKit } from './kit';

// Owns the renderer, camera and frame loop for one scene.
// A scene definition looks like:
//   { camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] } | { kind: '3d', position, target },
//     params: [...], setup(kit, ctx) => update(p, target, t, dt) }
// `p` holds parameter values eased toward `target`, which is what makes every
// change glide instead of jump.
export class Stage {
  constructor(container, def, initialTarget) {
    this.container = container;
    this.def = def;
    this.target = { ...initialTarget };
    this.current = { ...initialTarget };
    this.intro = 0;
    this.time = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(C.bg, 0); // the stage's CSS vignette shows through
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const labels = new CSS2DRenderer();
    Object.assign(labels.domElement.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    });
    container.appendChild(labels.domElement);
    this.labelRenderer = labels;

    this.scene = new THREE.Scene();
    this.lineMaterials = new Set();

    const cam = def.camera || { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] };
    this.is3d = cam.kind === '3d';
    if (this.is3d) {
      this.camera = new THREE.PerspectiveCamera(cam.fov || 40, 1, 0.1, 500);
      this.camera.position.set(...(cam.position || [8, 6, 10]));
      this.controls = new OrbitControls(this.camera, renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.target.set(...(cam.target || [0, 0, 0]));
      this.controls.autoRotate = !!cam.autoRotate;
      this.controls.autoRotateSpeed = 0.6;
      // soft studio reflections make metal and plastic read as real materials
      const pmrem = new THREE.PMREMGenerator(renderer);
      this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
      this.scene.environmentIntensity = 0.35; // reflections, not a wash of light
      this.introCam = this.camera.position.clone();
      this.camera.position.multiplyScalar(1.35);
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(6, 10, 8);
      this.scene.add(key);
      const rim = new THREE.DirectionalLight(0x88bbff, 0.6);
      rim.position.set(-8, -2, -6);
      this.scene.add(rim);
    } else {
      this.view = { x: cam.x, y: cam.y };
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
      this.camera.position.z = 10;
    }

    this.kit = createKit(this);
    this.update = def.setup(this.kit, { stage: this, target: this.target }) || (() => {});

    this.resize = this.resize.bind(this);
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(container);
    this.resize();

    this.clock = new THREE.Clock();
    renderer.setAnimationLoop(() => this.frame());
  }

  setTarget(next) {
    Object.assign(this.target, next);
    // Non-numeric params (choices) switch immediately.
    for (const [k, v] of Object.entries(next)) {
      if (typeof v !== 'number') this.current[k] = v;
    }
  }

  // Snap the eased values to the target (used when a scene first mounts).
  snap() {
    Object.assign(this.current, this.target);
  }

  // Callouts for the step being narrated: a short note placed in the picture,
  // with an arrow that grows toward the thing to look at. Each note is
  // { text, at: [x, y], to?: [x, y], color? }. Old notes fade out, new ones
  // fade in, so the eye is pulled to what this step is about.
  setNotes(notes) {
    this.notePool ||= [];
    for (const n of this.notePool) n.want = 0;
    (notes || []).forEach((n, i) => {
      let slot = this.notePool[i];
      if (!slot) {
        slot = {
          label: this.kit.label('', [0, 0], { cls: 'viz-note', tex: false }),
          arrow: this.kit.arrow([0, 0], [0.01, 0], { color: C.yellow, width: 3, head: 0.28 }),
          a: 0,
        };
        this.notePool.push(slot);
      }
      if (slot.text !== n.text || String(slot.at) !== String(n.at) || String(slot.to) !== String(n.to)) {
        slot.a = 0; // a new note grows in again
      }
      Object.assign(slot, { text: n.text, at: n.at, to: n.to, color: n.color ?? C.yellow, want: 1 });
      slot.label.set(n.text).pos(n.at).color(slot.color);
      slot.arrow.color(slot.color);
    });
  }

  tickNotes(dt) {
    for (const n of this.notePool || []) {
      n.a += ((n.want ?? 0) - n.a) * (1 - Math.exp(-dt * (n.want ? 4 : 8)));
      const vis = n.a > 0.02;
      n.label.visible(vis).opacity(Math.min(1, n.a * 1.2));
      if (vis && n.to) {
        // the arrow starts at the edge of the note and grows to its target
        const from = n.at;
        const d = [n.to[0] - from[0], n.to[1] - from[1], (n.to[2] ?? 0) - (from[2] ?? 0)];
        const len = Math.hypot(...d) || 1;
        const off = Math.min(0.55, len * 0.3);
        const s = [from[0] + (d[0] / len) * off, from[1] + (d[1] / len) * off, (from[2] ?? 0) + (d[2] / len) * off];
        const g = 0.15 + 0.85 * n.a;
        n.arrow.visible(true).set(s, [s[0] + (n.to[0] - s[0]) * g, s[1] + (n.to[1] - s[1]) * g, s[2] + ((n.to[2] ?? 0) - s[2]) * g]);
      } else n.arrow.visible(false);
    }
  }

  replayIntro() {
    this.intro = 0;
  }

  resize() {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.labelRenderer.setSize(w, h);
    for (const m of this.lineMaterials) m.resolution.set(w, h);

    if (this.is3d) {
      this.camera.aspect = w / h;
    } else {
      const [x0, x1] = this.view.x;
      const [y0, y1] = this.view.y;
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2;
      let hw = (x1 - x0) / 2;
      let hh = (y1 - y0) / 2;
      if (w / h > hw / hh) hw = hh * (w / h);
      else hh = hw / (w / h);
      Object.assign(this.camera, { left: cx - hw, right: cx + hw, top: cy + hh, bottom: cy - hh });
      this.pxPerUnit = h / (2 * hh);
    }
    this.camera.updateProjectionMatrix();
  }

  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.25);
    this.time += dt;
    this.intro = Math.min(1, this.intro + dt / 1.4);

    const k = 1 - Math.exp(-dt * 5.5);
    for (const [key, v] of Object.entries(this.target)) {
      if (typeof v === 'number') {
        const cur = this.current[key];
        this.current[key] = Math.abs(v - cur) < 1e-4 ? v : cur + (v - cur) * k;
      }
    }

    if (this.intro < 1 || !this.introDone) {
      this.kit.tick(this.intro);
      this.introDone = this.intro >= 1;
    }
    this.update(this.current, this.target, this.time, dt);
    this.tickNotes(dt);
    // 3D scenes open with a gentle camera dolly-in
    if (this.introCam && this.intro < 1) this.camera.position.lerp(this.introCam, 1 - Math.exp(-dt * 2.5));
    this.controls?.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    this.observer.disconnect();
    this.controls?.dispose();
    this.scene.traverse((o) => {
      o.geometry?.dispose();
      if (o.material) [].concat(o.material).forEach((m) => m.dispose());
    });
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labelRenderer.domElement.remove();
  }
}
