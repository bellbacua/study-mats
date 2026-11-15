import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildCircuitPart, buildLogicPart, logicColor } from './parts3d.js';
import { prepare, step, createState, PART_INFO } from './circuitSim.js';
import { compile, tick, createLogicState, netValues, readOutputs, pinsOf, cellsOf, GATES } from './logicSim.js';
import { pkey, straighten, newId, splitWires, junctionDots, pointsOn } from './grid.js';

// The 3D workbench shared by the circuit playground and the logic sandbox.
// It owns the scene, the parts on the board, the pointer tools and the
// simulation loop. The React page talks to it through a few methods and
// hears back through callbacks.
//
// Model: { parts: [...] }. Circuit parts and wires have ends a, b. Logic parts
// have an anchor `at`; logic wires are { type: 'wire', a, b }.

const SIZES = { circuit: [16, 10], logic: [22, 14] };
const TWO_END = new Set(['wire', 'battery', 'resistor', 'bulb', 'capacitor', 'led', 'switch']);

export class Board3D {
  constructor(container, mode, cb = {}) {
    this.el = container;
    this.mode = mode;
    this.cb = cb;
    [this.W, this.H] = SIZES[mode];
    this.ox = (this.W - 1) / 2;
    this.oy = (this.H - 1) / 2;
    this.model = { parts: [] };
    this.tool = 'select';
    this.opts = { voltage: true, electrons: false, labels: true, speed: 1, slow: false, clock: 1 };
    this.built = new Map(); // id → { sig, obj }
    this.history = [];
    this.future = [];
    this.selected = null;
    this.sim = mode === 'circuit' ? createState() : createLogicState();
    this.dirty = true;
    this.lastEmit = 0;
    this.clockAcc = 0;
    this.slowAcc = 0;
    this.time = 0;
    this.initScene();
    this.initInput();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
    if (import.meta.env?.DEV) window.__labBoard = this;
  }

  // ---------------------------------------------------------------- scene
  initScene() {
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.05;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.domElement.className = 'lab-canvas';
    r.domElement.tabIndex = 0;
    this.el.appendChild(r.domElement);
    this.renderer = r;
    const labels = new CSS2DRenderer();
    Object.assign(labels.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none' });
    labels.domElement.className = 'lab-labels';
    this.el.appendChild(labels.domElement);
    this.labels = labels;

    const scene = new THREE.Scene();
    this.scene = scene;
    const pm = new THREE.PMREMGenerator(r);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    scene.environmentIntensity = 0.3;
    scene.add(new THREE.HemisphereLight(0xcfe6ff, 0x0b0f14, 0.45));
    const key = new THREE.DirectionalLight(0xfff6ea, 1.6);
    key.position.set(-6, 14, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    const s = Math.max(this.W, this.H) * 0.62;
    Object.assign(key.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 40 });
    key.shadow.bias = -0.0006;
    key.shadow.radius = 4;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x88bbff, 0.5);
    rim.position.set(8, 4, -10);
    scene.add(rim);

    // the board: a rounded slab with tin pads at every grid point
    const bw = this.W + 0.6;
    const bh = this.H + 0.6;
    const sh = new THREE.Shape();
    const rr = 0.4;
    sh.moveTo(-bw / 2 + rr, -bh / 2);
    sh.lineTo(bw / 2 - rr, -bh / 2);
    sh.quadraticCurveTo(bw / 2, -bh / 2, bw / 2, -bh / 2 + rr);
    sh.lineTo(bw / 2, bh / 2 - rr);
    sh.quadraticCurveTo(bw / 2, bh / 2, bw / 2 - rr, bh / 2);
    sh.lineTo(-bw / 2 + rr, bh / 2);
    sh.quadraticCurveTo(-bw / 2, bh / 2, -bw / 2, bh / 2 - rr);
    sh.lineTo(-bw / 2, -bh / 2 + rr);
    sh.quadraticCurveTo(-bw / 2, -bh / 2, -bw / 2 + rr, -bh / 2);
    const slabGeo = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 });
    slabGeo.rotateX(Math.PI / 2);
    const slab = new THREE.Mesh(slabGeo, new THREE.MeshStandardMaterial({ color: this.mode === 'circuit' ? 0x0c1a1f : 0x0d121b, roughness: 0.9, metalness: 0.05 }));
    slab.position.y = -0.04;
    slab.receiveShadow = true;
    scene.add(slab);
    this.boardTop = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const lines = [];
    for (let x = 0; x < this.W; x++) lines.push(x - this.ox, 0.002, -this.oy, x - this.ox, 0.002, this.oy);
    for (let y = 0; y < this.H; y++) lines.push(-this.ox, 0.002, y - this.oy, this.ox, 0.002, y - this.oy);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
    scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x1d3344, transparent: true, opacity: 0.35 })));

    const padGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.02, 16);
    const pads = new THREE.InstancedMesh(padGeo, new THREE.MeshStandardMaterial({ color: 0x7c8794, metalness: 0.85, roughness: 0.35 }), this.W * this.H);
    const m4 = new THREE.Matrix4();
    let k = 0;
    for (let x = 0; x < this.W; x++) for (let y = 0; y < this.H; y++) pads.setMatrixAt(k++, m4.makeTranslation(x - this.ox, 0.01, y - this.oy));
    pads.receiveShadow = true;
    scene.add(pads);

    // hover ring, ghost and junction dots
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.2, 32), new THREE.MeshBasicMaterial({ color: 0x58c4dd, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthTest: false }));
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.renderOrder = 5;
    this.ring.visible = false;
    scene.add(this.ring);
    this.ghost = new THREE.Group();
    scene.add(this.ghost);
    this.ghostMat = new THREE.MeshBasicMaterial({ color: 0x58c4dd, transparent: true, opacity: 0.35, depthWrite: false });
    this.ghostBad = new THREE.MeshBasicMaterial({ color: 0xfc6255, transparent: true, opacity: 0.35, depthWrite: false });
    this.dotGroup = new THREE.Group();
    scene.add(this.dotGroup);
    this.parts = new THREE.Group();
    scene.add(this.parts);
    this.sel = new THREE.BoxHelper(undefined, 0x58c4dd);
    this.sel.visible = false;
    scene.add(this.sel);

    // moving charge: one bead per ~⅓ unit of every part that carries current
    const MAXD = 3000;
    this.beads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.065, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff1b8, toneMapped: false }), MAXD);
    this.beads.count = 0;
    this.beads.frustumCulled = false;
    scene.add(this.beads);

    const cam = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    this.camera = cam;
    const c = new OrbitControls(cam, r.domElement);
    c.enableDamping = true;
    c.mouseButtons = { LEFT: -1, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    c.touches = { ONE: -1, TWO: THREE.TOUCH.DOLLY_ROTATE };
    c.maxPolarAngle = 1.25;
    c.minDistance = 5;
    c.maxDistance = 40;
    c.screenSpacePanning = false;
    this.controls = c;
    this.resetView();

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.el);
    this.resize();
  }

  // Put the camera where the whole board just fits, looking down at ~52°.
  fit() {
    const cam = this.camera;
    const elev = 0.9;
    const dir = new THREE.Vector3(0, Math.sin(elev), Math.cos(elev));
    // frame what is on the board (with room around it), or the whole board
    let [x0, x1, z0, z1] = [0, this.W - 1, 0, this.H - 1];
    const pts = this.model.parts.flatMap((p) => (p.at ? cellsOf(p) : [p.a, p.b]));
    if (pts.length) {
      const mx = Math.min(this.W - 1, 12);
      const mz = Math.min(this.H - 1, 8);
      x0 = Math.min(...pts.map((q) => q[0])) - 1.5;
      x1 = Math.max(...pts.map((q) => q[0])) + 1.5;
      z0 = Math.min(...pts.map((q) => q[1])) - 1.5;
      z1 = Math.max(...pts.map((q) => q[1])) + 1.5;
      if (x1 - x0 < mx) [x0, x1] = [(x0 + x1 - mx) / 2, (x0 + x1 + mx) / 2];
      if (z1 - z0 < mz) [z0, z1] = [(z0 + z1 - mz) / 2, (z0 + z1 + mz) / 2];
      x0 = Math.max(x0, -0.3);
      z0 = Math.max(z0, -0.3);
      x1 = Math.min(x1, this.W - 0.7);
      z1 = Math.min(z1, this.H - 0.7);
    } else {
      [x0, x1, z0, z1] = [-0.3, this.W - 0.7, -0.3, this.H - 0.7];
    }
    const centre = new THREE.Vector3((x0 + x1) / 2 - this.ox, 0, (z0 + z1) / 2 - this.oy);
    const corners = [[x0, z0], [x1, z0], [x0, z1], [x1, z1]].map(([x, z]) => new THREE.Vector3(x - this.ox, 0, z - this.oy));
    const fits = (d) => {
      cam.position.copy(dir).multiplyScalar(d).add(centre);
      cam.lookAt(centre);
      cam.updateMatrixWorld();
      return corners.every((c) => {
        const v = c.clone().project(cam);
        return Math.abs(v.x) <= 0.96 && Math.abs(v.y) <= 0.9;
      });
    };
    let lo = 3;
    let hi = 80;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) hi = mid;
      else lo = mid;
    }
    fits(hi);
    this.controls.target.copy(centre);
    this.controls.maxDistance = hi * 1.8;
    this.controls.update();
  }

  resetView() {
    this.userMoved = false;
    this.fit();
  }

  resize() {
    const w = this.el.clientWidth || 600;
    const h = this.el.clientHeight || 400;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = `${w}px`;
    this.renderer.domElement.style.height = `${h}px`;
    this.labels.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (!this.userMoved) this.fit();
  }

  W3(p, y = 0) {
    return new THREE.Vector3(p[0] - this.ox, y, p[1] - this.oy);
  }

  // ---------------------------------------------------------------- model
  setModel(model, keepHistory = false) {
    if (!keepHistory) {
      this.history = [];
      this.future = [];
    }
    this.model = JSON.parse(JSON.stringify(model || { parts: [] }));
    this.sim = this.mode === 'circuit' ? createState() : createLogicState();
    this.select(null);
    this.changed(false);
    if (!this.userMoved) this.fit();
  }
  commit(fn) {
    this.history.push(JSON.stringify(this.model));
    if (this.history.length > 80) this.history.shift();
    this.future = [];
    fn(this.model);
    this.changed(true);
  }
  undo() {
    if (!this.history.length) return;
    this.future.push(JSON.stringify(this.model));
    this.model = JSON.parse(this.history.pop());
    this.select(null);
    this.changed(true);
  }
  redo() {
    if (!this.future.length) return;
    this.history.push(JSON.stringify(this.model));
    this.model = JSON.parse(this.future.pop());
    this.changed(true);
  }
  changed(save) {
    this.dirty = true;
    this.rebuild();
    if (save) this.cb.onChange?.(this.model);
    this.emitSelection();
  }
  updatePart(id, patch) {
    this.commit((m) => {
      const p = m.parts.find((q) => q.id === id);
      if (p) Object.assign(p, patch);
    });
  }
  removePart(id) {
    this.commit((m) => {
      m.parts = m.parts.filter((q) => q.id !== id);
    });
    if (this.selected === id) this.select(null);
  }
  flipPart(id) {
    const p = this.model.parts.find((q) => q.id === id);
    if (p?.a) this.updatePart(id, { a: p.b, b: p.a });
  }
  clear() {
    this.commit((m) => {
      m.parts = [];
    });
    this.select(null);
  }
  select(id) {
    this.selected = id;
    this.emitSelection();
    this.placeSelBox();
  }
  emitSelection() {
    const p = this.model.parts.find((q) => q.id === this.selected) || null;
    if (!p && this.selected) this.selected = null;
    this.cb.onSelect?.(p ? { ...p } : null);
    this.placeSelBox();
  }
  placeSelBox() {
    const b = this.selected && this.built.get(this.selected);
    if (b) {
      this.sel.setFromObject(b.obj.group);
      this.sel.visible = true;
    } else this.sel.visible = false;
  }

  partSig(p) {
    return JSON.stringify(p);
  }
  rebuild() {
    const keep = new Set();
    for (const p of this.model.parts) {
      keep.add(p.id);
      const sig = this.partSig(p);
      const old = this.built.get(p.id);
      if (old && old.sig === sig) continue;
      if (old) this.dispose(old.obj.group);
      const obj = this.buildOne(p);
      obj.group.traverse((o) => (o.userData.pid = p.id));
      this.parts.add(obj.group);
      this.built.set(p.id, { sig, obj });
    }
    for (const [id, b] of this.built) {
      if (!keep.has(id)) {
        this.dispose(b.obj.group);
        this.built.delete(id);
      }
    }
    this.rebuildDots();
    this.placeSelBox();
  }
  buildOne(p) {
    if (this.mode === 'logic' && p.type !== 'wire') {
      const obj = buildLogicPart(p);
      obj.group.position.copy(this.W3(p.at));
      return obj;
    }
    const A = this.W3(p.a);
    const B = this.W3(p.b);
    const L = A.distanceTo(B);
    const obj = this.mode === 'logic' ? buildCircuitPart({ type: 'wire' }, L) : buildCircuitPart(p, L);
    obj.group.position.copy(A);
    obj.group.rotation.y = Math.atan2(-(B.z - A.z), B.x - A.x);
    return obj;
  }
  dispose(group) {
    this.parts.remove(group);
    group.traverse((o) => {
      if (o.isCSS2DObject) o.element.remove();
      if (o.geometry) o.geometry.dispose();
    });
  }
  rebuildDots() {
    this.dotGroup.clear();
    const wires = this.model.parts.filter((p) => p.type === 'wire');
    const pins = this.mode === 'logic' ? this.model.parts.filter((p) => p.type !== 'wire').flatMap((p) => {
      const q = pinsOf(p);
      return [...q.ins, ...q.outs];
    }) : this.model.parts.filter((p) => p.type !== 'wire').flatMap((p) => [p.a, p.b]);
    const pieces = splitWires(wires, pins);
    const geo = new THREE.CylinderGeometry(0.085, 0.085, 0.05, 18);
    const m = new THREE.MeshStandardMaterial({ color: 0xd6dae0, metalness: 0.9, roughness: 0.25 });
    for (const d of junctionDots(pieces, pins)) {
      const s = new THREE.Mesh(geo, m);
      s.position.copy(this.W3(d, 0.06));
      this.dotGroup.add(s);
    }
  }

  // ---------------------------------------------------------------- input
  initInput() {
    const dom = this.renderer.domElement;
    this.ray = new THREE.Raycaster();
    this.ndc = new THREE.Vector2();
    this.drag = null;
    dom.addEventListener('pointerdown', (e) => this.onDown(e));
    dom.addEventListener('pointermove', (e) => this.onMove(e));
    window.addEventListener('pointerup', (this._up = (e) => this.onUp(e)));
    dom.addEventListener('pointerleave', () => {
      this.ring.visible = false;
      if (!this.drag) this.clearGhost();
      this.cb.onHover?.(null);
    });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());
    this.controls.addEventListener('start', () => (this.userMoved = true));
    dom.addEventListener('keydown', (e) => this.onKey(e));
  }
  setTool(t) {
    this.tool = t;
    this.clearGhost();
    this.drag = null;
  }
  setOpts(o) {
    Object.assign(this.opts, o);
    this.el.classList.toggle('lab-nolabels', !this.opts.labels);
  }
  aim(e) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(this.ndc, this.camera);
  }
  pointAt() {
    const hit = new THREE.Vector3();
    if (!this.ray.ray.intersectPlane(this.boardTop, hit)) return null;
    const x = Math.round(hit.x + this.ox);
    const y = Math.round(hit.z + this.oy);
    if (x < 0 || y < 0 || x >= this.W || y >= this.H) return null;
    return [x, y];
  }
  partAt() {
    const hits = this.ray.intersectObjects(this.parts.children, true);
    // prefer real parts over wires when both are under the pointer
    let wire = null;
    for (const h of hits) {
      const id = h.object.userData.pid;
      if (!id) continue;
      const p = this.model.parts.find((q) => q.id === id);
      if (!p) continue;
      if (p.type !== 'wire') return p;
      wire ||= p;
    }
    return wire;
  }
  onKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) this.redo();
      else this.undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      this.redo();
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && this.selected) {
      e.preventDefault();
      this.removePart(this.selected);
    }
    if (e.key.toLowerCase() === 'r' && this.selected) this.flipPart(this.selected);
    if (e.key === 'Escape') this.cb.onTool?.('select');
  }
  onDown(e) {
    if (e.button !== 0) return;
    this.renderer.domElement.focus({ preventScroll: true });
    this.aim(e);
    const pt = this.pointAt();
    const t = this.tool;
    if (t === 'select' || t === 'erase') {
      const p = this.partAt();
      if (t === 'erase') {
        if (p) this.removePart(p.id);
        this.drag = { kind: 'erase' };
        return;
      }
      if (p) {
        this.select(p.id);
        this.drag = { kind: 'move', id: p.id, from: pt, moved: false };
      } else {
        this.select(null);
      }
      return;
    }
    if (!pt) return;
    if (t === 'wire') {
      this.drag = { kind: 'wire', path: [pt] };
      this.showWireGhost();
      return;
    }
    if (this.mode === 'circuit') {
      this.drag = { kind: 'place2', from: pt, to: pt };
      this.showGhost2(pt, pt);
    } else {
      this.placeLogic(t, pt);
    }
  }
  onMove(e) {
    this.aim(e);
    const pt = this.pointAt();
    if (pt) {
      this.ring.visible = true;
      this.ring.position.copy(this.W3(pt, 0.03));
    } else this.ring.visible = false;
    const d = this.drag;
    if (!d) {
      if (this.mode === 'logic' && (GATES[this.tool] || ['input', 'clock', 'lamp', 'display'].includes(this.tool))) {
        if (pt) this.showLogicGhost(this.tool, pt);
        else this.clearGhost();
      }
      const p = this.tool === 'select' || this.tool === 'erase' ? this.partAt() : null;
      this.renderer.domElement.style.cursor = p ? (this.tool === 'erase' ? 'not-allowed' : 'pointer') : 'crosshair';
      this.cb.onHover?.(p ? p.id : null);
      return;
    }
    if (d.kind === 'erase' && e.buttons & 1) {
      const p = this.partAt();
      if (p) this.removePart(p.id);
      return;
    }
    if (!pt) return;
    if (d.kind === 'wire') {
      const last = d.path[d.path.length - 1];
      if (pkey(last) === pkey(pt)) return;
      // go straight if we can, else an L: along x first, then along y
      if (last[0] !== pt[0] && last[1] !== pt[1]) d.path.push([pt[0], last[1]]);
      d.path.push(pt);
      this.showWireGhost();
    } else if (d.kind === 'place2') {
      d.to = straighten(d.from, pt);
      this.showGhost2(d.from, d.to);
    } else if (d.kind === 'move' && d.from) {
      const dx = pt[0] - d.from[0];
      const dy = pt[1] - d.from[1];
      if (dx || dy) d.moved = true;
      d.dx = dx;
      d.dy = dy;
      const b = this.built.get(d.id);
      if (b) {
        const p = this.model.parts.find((q) => q.id === d.id);
        const base = this.W3(p.at || p.a);
        b.obj.group.position.set(base.x + dx, base.y + 0.05, base.z + dy);
        this.placeSelBox();
      }
    }
  }
  onUp() {
    const d = this.drag;
    this.drag = null;
    if (!d) return;
    if (d.kind === 'wire') {
      this.clearGhost();
      const path = d.path.filter((p, i) => i === 0 || pkey(p) !== pkey(d.path[i - 1]));
      // merge straight runs, then add each run as one wire
      const runs = [];
      for (let i = 1; i < path.length; i++) {
        const a = path[i - 1];
        const b = path[i];
        const prev = runs[runs.length - 1];
        if (prev && (prev.a[0] === b[0] && prev.b[0] === b[0] || prev.a[1] === b[1] && prev.b[1] === b[1])) prev.b = b;
        else runs.push({ a, b });
      }
      if (!runs.length) return;
      const exists = (a, b) => this.model.parts.some((q) => q.type === 'wire' && (pkey(q.a) === pkey(a) && pkey(q.b) === pkey(b) || pkey(q.a) === pkey(b) && pkey(q.b) === pkey(a)));
      this.commit((m) => {
        for (const r of runs) if (!exists(r.a, r.b)) m.parts.push({ id: newId('w'), type: 'wire', a: r.a, b: r.b });
      });
      return;
    }
    if (d.kind === 'place2') {
      this.clearGhost();
      let { from, to } = d;
      if (pkey(from) === pkey(to)) {
        // a click without a drag: lay the part two steps to the right (or left)
        to = from[0] + 2 < this.W ? [from[0] + 2, from[1]] : [from[0] - 2, from[1]];
      }
      const t = this.tool;
      const clash = this.model.parts.some((q) => q.type !== 'wire' && q.a && new Set([pkey(q.a), pkey(q.b)]).has(pkey(from)) && new Set([pkey(q.a), pkey(q.b)]).has(pkey(to)));
      if (clash) {
        this.cb.onNote?.('Two parts cannot sit on the same two points. Try one row over.');
        return;
      }
      const info = PART_INFO[t];
      const part = { id: newId(t[0]), type: t, a: from, b: to };
      if (t === 'led') part.color = 'red';
      else if (t === 'switch') part.on = true;
      else if (info?.def != null) part.value = info.def;
      this.commit((m) => m.parts.push(part));
      this.select(part.id);
      return;
    }
    if (d.kind === 'move') {
      const p = this.model.parts.find((q) => q.id === d.id);
      if (!p) return;
      if (!d.moved) {
        // a click: flip switches
        if (p.type === 'switch' || p.type === 'input') this.updatePart(p.id, { on: !p.on });
        else this.rebuild();
        return;
      }
      const sh = (q) => [q[0] + d.dx, q[1] + d.dy];
      const inside = (q) => q[0] >= 0 && q[1] >= 0 && q[0] < this.W && q[1] < this.H;
      let ok;
      let patch;
      if (p.at) {
        patch = { at: sh(p.at) };
        ok = this.logicFits({ ...p, ...patch }, p.id);
      } else {
        patch = { a: sh(p.a), b: sh(p.b) };
        ok = inside(patch.a) && inside(patch.b);
      }
      if (ok) this.updatePart(p.id, patch);
      else {
        const b = this.built.get(p.id);
        if (b) this.dispose(b.obj.group);
        this.built.delete(p.id);
        this.rebuild();
        this.cb.onNote?.('That spot is taken or off the board.');
      }
    }
  }
  logicFits(part, ignore) {
    const cells = cellsOf(part);
    if (cells.some(([x, y]) => x < 0 || y < 0 || x >= this.W || y >= this.H)) return false;
    const pins = pinsOf(part);
    if ([...pins.ins, ...pins.outs].some(([x, y]) => x < 0 || y < 0 || x >= this.W || y >= this.H)) return false;
    const taken = new Set();
    for (const q of this.model.parts) if (q.type !== 'wire' && q.id !== ignore) cellsOf(q).forEach((c) => taken.add(pkey(c)));
    return !cells.some((c) => taken.has(pkey(c)));
  }
  placeLogic(type, pt) {
    // anchor = output pin for gates and switches, input pin for lamps and displays
    const part = { id: newId(type[0]), type, at: pt };
    if (type === 'input') {
      const used = new Set(this.model.parts.filter((q) => q.type === 'input').map((q) => q.label));
      part.label = 'ABCDEFGHIJ'.split('').find((c) => !used.has(c)) || 'X';
      part.on = false;
    }
    if (type === 'lamp') {
      const used = new Set(this.model.parts.filter((q) => q.type === 'lamp').map((q) => q.label));
      part.label = ['Y', 'Z', 'Q', 'S', 'C', 'P'].find((c) => !used.has(c)) || 'Y';
    }
    if (!this.logicFits(part)) {
      this.cb.onNote?.('Not enough room there. Gates take a 3 × 3 patch; their output is the point you click.');
      return;
    }
    this.commit((m) => m.parts.push(part));
    this.select(part.id);
  }

  clearGhost() {
    this.ghost.children.forEach((c) => c.geometry?.dispose());
    this.ghost.clear();
  }
  ghostRod(a, b, mat = this.ghostMat, r = 0.07) {
    const A = this.W3(a, 0.08);
    const B = this.W3(b, 0.08);
    const len = A.distanceTo(B);
    if (len < 1e-3) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8), mat);
      s.position.copy(A);
      this.ghost.add(s);
      return;
    }
    const g = new THREE.CylinderGeometry(r, r, len, 10);
    g.rotateZ(Math.PI / 2);
    const m = new THREE.Mesh(g, mat);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.rotation.y = Math.atan2(-(B.z - A.z), B.x - A.x);
    this.ghost.add(m);
  }
  showWireGhost() {
    this.clearGhost();
    const p = this.drag.path;
    if (p.length === 1) this.ghostRod(p[0], p[0]);
    for (let i = 1; i < p.length; i++) this.ghostRod(p[i - 1], p[i]);
  }
  showGhost2(a, b) {
    this.clearGhost();
    this.ghostRod(a, b, this.ghostMat, 0.16);
  }
  showLogicGhost(type, pt) {
    this.clearGhost();
    const part = { type, at: pt };
    const ok = this.logicFits(part);
    const m = ok ? this.ghostMat : this.ghostBad;
    for (const c of cellsOf(part)) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.9), m);
      b.position.copy(this.W3(c, 0.03));
      this.ghost.add(b);
    }
    const pins = pinsOf(part);
    for (const q of [...pins.ins, ...pins.outs]) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), m);
      s.position.copy(this.W3(q, 0.1));
      this.ghost.add(s);
    }
  }

  // ---------------------------------------------------------------- sim
  loop(now) {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, (now - (this.last || now)) / 1000);
    this.last = now;
    this.time += dt;
    if (this.mode === 'circuit') this.runCircuit(dt);
    else this.runLogic(dt);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labels.render(this.scene, this.camera);
  }

  runCircuit(dt) {
    if (this.dirty) {
      this.prepared = prepare(this.model);
      this.hasCap = this.model.parts.some((p) => p.type === 'capacitor');
      this.dirty = false;
    }
    const total = dt * this.opts.speed;
    const n = this.hasCap ? Math.max(1, Math.min(8, Math.ceil(total / 0.004))) : 1;
    let res = null;
    for (let k = 0; k < n; k++) res = step(this.prepared, this.sim, Math.max(total / n, 1e-4));
    this.res = res;
    // burn out over-driven LEDs
    for (const w of res.warnings) {
      if (w.kind === 'burn') {
        const p = this.model.parts.find((q) => q.id === w.id);
        if (p && !p.broken) {
          const amps = res.parts[w.id]?.i || 0;
          p.broken = true;
          this.dirty = true;
          this.rebuildPart(p);
          this.cb.onChange?.(this.model);
          this.emitSelection();
          this.cb.onEvent?.({ kind: 'burn', id: p.id, amps });
        }
      }
    }
    const vmax = Math.max(1, ...this.model.parts.filter((p) => p.type === 'battery').map((p) => p.value));
    const color = new THREE.Color();
    for (const p of this.model.parts) {
      const b = this.built.get(p.id);
      if (!b) continue;
      if (p.type === 'wire') {
        const va = res.volts[pkey(p.a)] ?? 0;
        const vb = res.volts[pkey(p.b)] ?? 0;
        if (this.opts.voltage) {
          const t = Math.min(1, Math.max(0, (va + vb) / 2 / vmax));
          color.setHSL(0.56 - 0.47 * t, 0.72, 0.42 + 0.12 * t);
        } else color.setHex(0xc7834f);
        b.obj.update({ color });
      } else b.obj.update({ r: res.parts[p.id], vmax, dt, broken: p.broken });
    }
    this.moveBeads(dt);
    this.emit(res);
  }
  rebuildPart(p) {
    const old = this.built.get(p.id);
    if (old) this.dispose(old.obj.group);
    this.built.delete(p.id);
    this.rebuild();
  }
  moveBeads(dt) {
    const res = this.res;
    if (!res) return;
    this.phase ||= {};
    const m4 = new THREE.Matrix4();
    let k = 0;
    const max = this.beads.instanceMatrix.count;
    const dir = this.opts.electrons ? -1 : 1;
    for (const p of this.prepared.parts) {
      const r = res.parts[p.id];
      if (!r || Math.abs(r.i) < 2e-6) continue;
      if (p.type === 'led' && !r.lit) continue;
      const A = this.W3(p.a, 0.08);
      const B = this.W3(p.b, 0.08);
      const L = A.distanceTo(B);
      const speed = Math.sign(r.i) * Math.min(3, 0.6 * Math.log10(1 + Math.abs(r.i) / 1e-4)) * dir;
      const ph = (this.phase[p.id] = ((this.phase[p.id] || 0) + (speed * dt) / 0.34) % 1);
      const count = Math.max(1, Math.round(L / 0.34));
      for (let j = 0; j < count && k < max; j++) {
        const f = (j + ((ph % 1) + 1) % 1) / count;
        const pos = A.clone().lerp(B, f);
        m4.makeTranslation(pos.x, pos.y, pos.z);
        this.beads.setMatrixAt(k++, m4);
      }
    }
    this.beads.count = k;
    this.beads.instanceMatrix.needsUpdate = true;
    this.beads.visible = this.opts.beads !== false;
  }

  runLogic(dt) {
    if (this.dirty) {
      const parts = this.model.parts.filter((p) => p.type !== 'wire');
      const wires = this.model.parts.filter((p) => p.type === 'wire');
      this.comp = compile({ parts, wires });
      this.dirty = false;
      this.settled = false;
    }
    const comp = this.comp;
    // clocks
    this.clockAcc += dt;
    const half = 0.5 / Math.max(0.1, this.opts.clock);
    if (this.clockAcc >= half) {
      this.clockAcc = 0;
      for (const g of comp.gates) if (g.p.type === 'clock') this.sim.out[g.p.id] = this.sim.out[g.p.id] ? 0 : 1;
    }
    if (this.opts.slow) {
      this.slowAcc += dt;
      if (this.slowAcc > 0.18) {
        this.slowAcc = 0;
        tick(comp, this.sim);
      }
    } else for (let i = 0; i < 60; i++) if (!tick(comp, this.sim)) break;
    const { vals, clash } = netValues(comp, this.sim);
    const outs = readOutputs(comp, this.sim);
    const driven = new Set(Object.keys(comp.drivers));
    const netColor = {};
    for (const { w, net } of comp.pieces) netColor[w.src] ||= { v: vals[net] ?? 0, clash: clash.has(net), floating: !driven.has(net) };
    for (const p of this.model.parts) {
      const b = this.built.get(p.id);
      if (!b) continue;
      if (p.type === 'wire') {
        const s = netColor[p.id] || { v: 0, floating: true };
        b.obj.update({ color: logicColor(s.v, s.clash, s.floating) });
      }
    }
    for (const g of comp.gates) {
      const b = this.built.get(g.p.id);
      if (!b) continue;
      b.obj.update({ out: g.p.type === 'lamp' ? outs[g.p.id] : this.sim.out[g.p.id] ?? 0, ins: g.ins.map((n) => vals[n] ?? 0), value: outs[g.p.id] ?? 0, dt });
    }
    this.beads.count = 0;
    if (performance.now() - this.lastEmit > 200) {
      this.lastEmit = performance.now();
      this.cb.onLogic?.({ clash: clash.size > 0, outs });
    }
  }

  emit(res) {
    if (performance.now() - this.lastEmit < 150) return;
    this.lastEmit = performance.now();
    this.cb.onFrame?.(res, this.model);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('pointerup', this._up);
    this.ro.disconnect();
    this.controls.dispose();
    for (const [, b] of this.built) this.dispose(b.obj.group);
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labels.domElement.remove();
  }
}

export { TWO_END, pointsOn };
