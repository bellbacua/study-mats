import { C } from '../theme';
import { clamp, range } from '../kit';

const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');

// ---------------------------------------------------------------------------
// MATE 101: processing → structure → properties → performance
// ---------------------------------------------------------------------------
const EXAMPLES = {
  bolo: {
    name: 'a bolo knife',
    processing: 'forged hot, then the edge is quenched in water',
    structure: 'hard martensite at the edge, softer pearlite in the spine',
    properties: 'hard, sharp edge; tough back that does not snap',
    performance: 'cuts for years without chipping or breaking',
  },
  chip: {
    name: 'a silicon chip',
    processing: 'grown as one huge crystal, sliced, doped with tiny amounts of boron or phosphorus',
    structure: 'a perfect single crystal with controlled impurity atoms',
    properties: 'conducts electricity in a precisely controllable way',
    performance: 'billions of switches working reliably in a phone',
  },
  concrete: {
    name: 'a concrete bridge deck',
    processing: 'cement, sand, gravel and water mixed, poured around steel bars, kept wet while curing',
    structure: 'crystals of hardened cement binding stones, with steel bars inside',
    properties: 'strong when squeezed; the steel carries the pulling',
    performance: 'carries trucks for 50+ years in tropical rain',
  },
  bottle: {
    name: 'a PET water bottle',
    processing: 'a small tube of hot plastic is blown and stretched in a mould',
    structure: 'long chains lined up by the stretching, partly crystalline',
    properties: 'clear, light, strong for its thickness, keeps gas in',
    performance: 'holds water safely, and can be recycled',
  },
};
const CORNERS = ['processing', 'structure', 'properties', 'performance'];

export const materials_tetrahedron = {
  camera: { kind: '3d', position: [0, 1.2, 13] },
  mission: 'Look at all four products and trace each one from processing to performance.',
  goal: (_t, seen) => Object.keys(EXAMPLES).every((k) => seen.ex?.has(k)),
  params: [{ key: 'ex', label: 'Product', type: 'choice', value: 'bolo', options: Object.entries(EXAMPLES).map(([k, v]) => ({ value: k, label: v.name })) }],
  beats: [
    { say: 'A bolo knife. The smith’s processing (forging, then quenching only the edge) gives a hard edge and a tough spine, so it cuts without snapping.', set: { ex: 'bolo' } },
    { say: 'A silicon chip. Growing a perfect crystal and adding a few impurity atoms lets engineers control exactly how it conducts.', set: { ex: 'chip' } },
    { say: 'A PET bottle. Stretching the hot plastic lines up its chains, making the thin wall strong. Change any corner and the others change too.', set: { ex: 'bottle' } },
  ],
  readout: (t) => {
    const e = EXAMPLES[t.ex];
    return CORNERS.map((c) => [c[0].toUpperCase() + c.slice(1), e[c]]);
  },
  setup(kit) {
    const g = kit.group();
    const s = 2.6;
    const V = [
      [0, s * 1.1, 0],
      [-s, -s * 0.5, s * 0.6],
      [s, -s * 0.5, s * 0.6],
      [0, -s * 0.5, -s * 1.1],
    ];
    const order = [3, 0, 1, 2]; // processing at the back, performance on the right
    const cols = [C.gold, C.blue, C.green, C.pink];
    order.forEach((vi, i) => kit.sphere(V[vi], 0.28, cols[i], { parent: g, glow: 0.3 }));
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) kit.cylinder(V[i], V[j], 0.03, 0x5a6470, { parent: g, opacity: 0.8 });
    const labels = order.map((vi, i) => kit.label(`\\text{${CORNERS[i]}}`, V[vi].map((v) => v * 1.28), { size: 18, color: cols[i], parent: g }));
    void labels;
    const runner = kit.sphere([0, 0, 0], 0.16, C.yellow, { parent: g, glow: 0.9 });
    const title = kit.label('', [0, 4.1, 0], { size: 22 });
    return (_p, t, time) => {
      title.set(`\\text{${EXAMPLES[t.ex].name}}`);
      // a spark runs processing → structure → properties → performance
      const u = (time * 0.35) % 3;
      const k = Math.floor(u);
      const f = u - k;
      const a = V[order[k]];
      const b = V[order[k + 1]];
      runner.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
      g.rotation.y = 0.35 * Math.sin(time * 0.25);
    };
  },
};

// ---------------------------------------------------------------------------
// Technical drawing: a part in a glass box and its three views
// ---------------------------------------------------------------------------
// Each part: solid boxes (x, y, z ranges; x width, y height, z depth), plus its
// three views as lists of [points, style] in the view's own 2D coordinates.
const PARTS = {
  L: {
    name: 'L-bracket',
    boxes: [[0, 3, 0, 1, 0, 2], [0, 1, 1, 3, 0, 2]],
    front: [[[[0, 0], [3, 0], [3, 1], [1, 1], [1, 3], [0, 3], [0, 0]], 'v']],
    top: [[[[0, 0], [3, 0], [3, 2], [0, 2], [0, 0]], 'v'], [[[1, 0], [1, 2]], 'v']],
    side: [[[[0, 0], [2, 0], [2, 3], [0, 3], [0, 0]], 'v'], [[[0, 1], [2, 1]], 'v']],
  },
  step: {
    name: 'stepped block',
    boxes: [[0, 3, 0, 1, 0, 2], [0, 2, 1, 2, 0, 2], [0, 1, 2, 3, 0, 2]],
    front: [[[[0, 0], [3, 0], [3, 1], [2, 1], [2, 2], [1, 2], [1, 3], [0, 3], [0, 0]], 'v']],
    top: [[[[0, 0], [3, 0], [3, 2], [0, 2], [0, 0]], 'v'], [[[1, 0], [1, 2]], 'v'], [[[2, 0], [2, 2]], 'v']],
    side: [[[[0, 0], [2, 0], [2, 3], [0, 3], [0, 0]], 'v'], [[[0, 1], [2, 1]], 'v'], [[[0, 2], [2, 2]], 'v']],
  },
  hole: {
    name: 'block with a hole',
    boxes: [[0, 3, 0, 1.5, 0, 2]],
    hole: [1.5, 1, 0.5],
    front: [[[[0, 0], [3, 0], [3, 1.5], [0, 1.5], [0, 0]], 'v'], [[[1, 0], [1, 1.5]], 'h'], [[[2, 0], [2, 1.5]], 'h'], [[[1.5, -0.3], [1.5, 1.8]], 'c']],
    top: [[[[0, 0], [3, 0], [3, 2], [0, 2], [0, 0]], 'v'], [range(0, 2 * Math.PI, 40).map((q) => [1.5 + 0.5 * Math.cos(q), 1 + 0.5 * Math.sin(q)]), 'v'], [[[1.5, 0.3], [1.5, 1.7]], 'c'], [[[0.8, 1], [2.2, 1]], 'c']],
    side: [[[[0, 0], [2, 0], [2, 1.5], [0, 1.5], [0, 0]], 'v'], [[[0.5, 0], [0.5, 1.5]], 'h'], [[[1.5, 0], [1.5, 1.5]], 'h'], [[[1, -0.3], [1, 1.8]], 'c']],
  },
};
const OFF = [-1.5, -1.5, -1];
const W = 2.9; // glass box half-size

export const ortho_views = {
  camera: { kind: '3d', position: [7, 5, 9] },
  mission: 'Pick the block with a hole and find the view where the hole shows as dashed hidden lines.',
  goal: (t) => t.part === 'hole' && (t.view === 'front' || t.view === 'side'),
  params: [
    { key: 'part', label: 'Part', type: 'choice', value: 'L', options: Object.entries(PARTS).map(([k, v]) => ({ value: k, label: v.name })) },
    { key: 'view', label: 'Highlight view', type: 'choice', value: 'all', options: ['all', 'front', 'top', 'side'].map((v) => ({ value: v, label: v })) },
  ],
  beats: [
    { say: 'The part sits in a glass box. Look straight at the front and trace its outline onto the back wall: that is the front view, showing width and height.', set: { part: 'L', view: 'front' } },
    { say: 'Look straight down and trace onto the floor: the top view, width and depth. The line across it is where the upright meets the base.', set: { part: 'L', view: 'top' } },
    { say: 'A hole you cannot see from the front is still drawn, as dashed hidden lines, with a dash-dot centre line through it.', set: { part: 'hole', view: 'front' } },
  ],
  readout: (t) => [
    ['Front view shows', 'width × height'],
    ['Top view shows', 'width × depth'],
    ['Side view shows', 'depth × height'],
    ['Part', PARTS[t.part].name],
  ],
  setup(kit) {
    const { THREE } = kit;
    const root = kit.group();
    const solid = kit.group(root);
    // glass walls: back (front view), floor (top view), right (side view)
    const wallMat = (c) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(2 * W, 2 * W), wallMat(C.blue));
    back.position.set(0, 0, -W);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(2 * W, 2 * W), wallMat(C.green));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -W, 0);
    const right = new THREE.Mesh(new THREE.PlaneGeometry(2 * W, 2 * W), wallMat(C.gold));
    right.rotation.y = -Math.PI / 2;
    right.position.set(W, 0, 0);
    root.add(back, floor, right);
    kit.label('\\text{front view}', [0, W + 0.35, -W], { size: 14, color: C.blue, parent: root });
    kit.label('\\text{top view}', [-W - 0.3, -W, W], { size: 14, color: C.green, parent: root });
    kit.label('\\text{side view}', [W, W + 0.35, 0], { size: 14, color: C.gold, parent: root });
    const drawn = { front: [], top: [], side: [] };
    const proj = {
      front: ([x, y]) => [x + OFF[0], y + OFF[1], -W + 0.01],
      top: ([x, z]) => [x + OFF[0], -W + 0.01, z + OFF[2]],
      side: ([z, y]) => [W - 0.01, y + OFF[1], z + OFF[2]],
    };
    const colors = { front: C.blue, top: C.green, side: C.gold };
    const sightLines = [];
    let built = '';
    function build(key) {
      built = key;
      solid.clear();
      Object.values(drawn).flat().forEach((l) => l.visible(false));
      Object.keys(drawn).forEach((k) => (drawn[k] = []));
      const P = PARTS[key];
      const mat = new THREE.MeshStandardMaterial({ color: 0x9fb3c8, roughness: 0.5, metalness: 0.3 });
      for (const [x0, x1, y0, y1, z0, z1] of P.boxes) {
        let geo;
        if (P.hole) {
          const sh = new THREE.Shape([new THREE.Vector2(x0, z0), new THREE.Vector2(x1, z0), new THREE.Vector2(x1, z1), new THREE.Vector2(x0, z1)]);
          const hp = new THREE.Path();
          hp.absarc(P.hole[0], P.hole[1], P.hole[2], 0, Math.PI * 2, true);
          sh.holes.push(hp);
          geo = new THREE.ExtrudeGeometry(sh, { depth: y1 - y0, bevelEnabled: false });
          geo.rotateX(Math.PI / 2);
          geo.translate(OFF[0], y1 + OFF[1], OFF[2]);
        } else {
          geo = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
          geo.translate((x0 + x1) / 2 + OFF[0], (y0 + y1) / 2 + OFF[1], (z0 + z1) / 2 + OFF[2]);
        }
        const m = new THREE.Mesh(geo, mat);
        solid.add(m);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: 0x0d1117 }));
        solid.add(edges);
      }
      for (const view of ['front', 'top', 'side']) {
        for (const [pts, style] of P[view]) {
          drawn[view].push(
            kit.line(pts.map(proj[view]), {
              color: colors[view],
              width: style === 'v' ? 3 : 1.5,
              dashed: style !== 'v',
              dashSize: style === 'c' ? 0.3 : 0.12,
              gapSize: style === 'c' ? 0.08 : 0.08,
              create: false,
              parent: root,
            })
          );
        }
      }
      // sight lines from the part's corners to each wall
      sightLines.forEach((l) => l.visible(false));
      sightLines.length = 0;
      const corners = [];
      for (const [x0, x1, y0, y1, z0, z1] of P.boxes) for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) corners.push([x + OFF[0], y + OFF[1], z + OFF[2]]);
      for (const c of corners) {
        sightLines.push(Object.assign(kit.line([c, [c[0], c[1], -W]], { color: C.blue, width: 1, dashed: true, opacity: 0.35, create: false, parent: root }), { view: 'front' }));
        sightLines.push(Object.assign(kit.line([c, [c[0], -W, c[2]]], { color: C.green, width: 1, dashed: true, opacity: 0.35, create: false, parent: root }), { view: 'top' }));
        sightLines.push(Object.assign(kit.line([c, [W, c[1], c[2]]], { color: C.gold, width: 1, dashed: true, opacity: 0.35, create: false, parent: root }), { view: 'side' }));
      }
    }
    return (_p, t, time) => {
      if (t.part !== built) build(t.part);
      for (const v of ['front', 'top', 'side']) {
        const on = t.view === 'all' || t.view === v;
        drawn[v].forEach((l) => l.opacity(on ? 1 : 0.2));
      }
      back.material.opacity = t.view === 'front' ? 0.14 : 0.05;
      floor.material.opacity = t.view === 'top' ? 0.14 : 0.05;
      right.material.opacity = t.view === 'side' ? 0.14 : 0.05;
      sightLines.forEach((l) => l.visible(t.view === l.view));
      root.rotation.y = 0.15 * Math.sin(time * 0.3);
    };
  },
};

// ---------------------------------------------------------------------------
// Families of materials: one property at a time
// ---------------------------------------------------------------------------
const FAM = { metal: C.blue, ceramic: C.gold, polymer: C.green, composite: C.pink };
const MATS = [
  ['steel', 'metal', 7.85, 200, 1450, 50],
  ['aluminium', 'metal', 2.7, 70, 660, 200],
  ['copper', 'metal', 8.96, 120, 1085, 400],
  ['alumina', 'ceramic', 3.95, 380, 2050, 30],
  ['silicon carbide', 'ceramic', 3.2, 410, 2700, 120],
  ['window glass', 'ceramic', 2.5, 70, 600, 1],
  ['polyethylene', 'polymer', 0.95, 1, 130, 0.4],
  ['nylon', 'polymer', 1.14, 3, 220, 0.25],
  ['carbon-fibre composite', 'composite', 1.6, 120, 150, 5],
  ['wood (along grain)', 'composite', 0.5, 10, 200, 0.12],
];
const PROPS = {
  rho: { i: 2, label: 'Density (g/cm³)', log: false, max: 10 },
  E: { i: 3, label: 'Stiffness, Young’s modulus (GPa)', log: true, max: 1000, min: 0.1 },
  Tm: { i: 4, label: 'Melting or softening point (°C)', log: false, max: 3000 },
  k: { i: 5, label: 'Heat conduction (W/m·K)', log: true, max: 1000, min: 0.05 },
};

export const family_bars = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Look at all four properties. Which family wins most often, and which loses?',
  goal: (_t, seen) => Object.keys(PROPS).every((k) => seen.prop?.has(k)),
  params: [{ key: 'prop', label: 'Property', type: 'choice', value: 'rho', options: Object.entries(PROPS).map(([k, v]) => ({ value: k, label: v.label })) }],
  beats: [
    { say: 'Density: metals are heavy, ceramics middling, polymers and wood light. Carbon fibre is a fifth of the weight of steel.', set: { prop: 'rho' } },
    { say: 'Stiffness (on a power-of-ten scale): ceramics are stiffest, polymers are hundreds of times floppier. Composites borrow stiffness from their fibres.', set: { prop: 'E' } },
    { say: 'Melting point: ceramics survive furnace temperatures, polymers soften not far above boiling water.', set: { prop: 'Tm' } },
  ],
  readout: (t) => {
    const P = PROPS[t.prop];
    const s = [...MATS].sort((a, b) => b[P.i] - a[P.i]);
    return [
      ['Highest', `${s[0][0]} (${s[0][1]}): ${s[0][P.i]}`],
      ['Lowest', `${s.at(-1)[0]} (${s.at(-1)[1]}): ${s.at(-1)[P.i]}`],
      ['Scale', P.log ? 'powers of ten: each grid step is 10×' : 'ordinary'],
    ];
  },
  setup(kit) {
    const x0 = -2.2;
    const x1 = 7.4;
    const rows = MATS.map((m, i) => ({
      m,
      bar: kit.rect(0, 0, 0, 0, { color: FAM[m[1]], opacity: 0.8, stroke: false }),
      name: kit.label(`\\text{${m[0]}}`, [x0 - 0.2, 0], { size: 14, align: 'right' }),
      val: kit.label('', [0, 0], { size: 13, color: '#c9d1d9', align: 'left' }),
      y: 3.1 - i * 0.68,
      cy: 3.1 - i * 0.68,
    }));
    const ticks = Array.from({ length: 6 }, () => ({ l: kit.line([[0, 0], [0, 0]], { color: C.grid, width: 1, create: false }), t: kit.label('', [0, -4.1], { size: 12, color: '#8b949e' }) }));
    Object.entries(FAM).forEach(([f, c], i) => kit.label(`\\text{${f}}`, [-7.2 + i * 1.6, 4.0], { size: 14, color: c }));
    const title = kit.label('', [2.6, 4.0], { size: 16 });
    let w = 0;
    let last = '';
    return (_p, t, _time, dt) => {
      const P = PROPS[t.prop];
      if (t.prop !== last) {
        last = t.prop;
        w = 0;
        title.set(`\\text{${P.label}}`);
        const order = [...MATS].sort((a, b) => b[P.i] - a[P.i]);
        rows.forEach((r) => (r.y = 3.1 - order.indexOf(r.m) * 0.68));
        const vals = P.log ? range(Math.log10(P.min), Math.log10(P.max), Math.round(Math.log10(P.max / P.min)) + 1) : range(0, P.max, 6);
        ticks.forEach((tk, i) => {
          const v = vals[i];
          const on = v !== undefined;
          tk.l.visible(on);
          tk.t.visible(on);
          if (!on) return;
          const x = x0 + ((P.log ? v - Math.log10(P.min) : v) / (P.log ? Math.log10(P.max / P.min) : P.max)) * (x1 - x0);
          tk.l.set([[x, -3.8], [x, 3.5]]);
          tk.t.set(P.log ? `${10 ** v >= 1 ? Math.round(10 ** v) : 10 ** v}` : `${Math.round(v)}`).pos([x, -4.1]);
        });
      }
      w = Math.min(1, w + dt * 1.5);
      for (const r of rows) {
        r.cy += (r.y - r.cy) * (1 - Math.exp(-dt * 6));
        const v = r.m[P.i];
        const frac = P.log ? clamp(Math.log10(v / P.min) / Math.log10(P.max / P.min), 0, 1) : v / P.max;
        const len = (x1 - x0) * frac * w;
        r.bar.set(x0, r.cy - 0.22, Math.max(0.02, len), 0.44);
        r.name.pos([x0 - 0.2, r.cy]);
        r.val.set(`${v}`).pos([x0 + len + 0.15, r.cy]);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// CAD: a sketch extruded or revolved into a solid
// ---------------------------------------------------------------------------
const LPROF = [[0, 0], [6, 0], [6, 1], [1, 1], [1, 4], [0, 4]]; // cm, area 9 cm²
const RPROF = [[1, 0], [3, 0], [3, 0.8], [1.6, 0.8], [1.6, 3], [1, 3]]; // (radius, height) cm
const polyAreaCentroid = (pts) => {
  let A = 0;
  let cx = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const c = x0 * y1 - x1 * y0;
    A += c;
    cx += (x0 + x1) * c;
  }
  A /= 2;
  return { A: Math.abs(A), cx: cx / (6 * A) };
};

export const cad_extrude = {
  camera: { kind: '3d', position: [7, 6, 9] },
  mission: 'Extrude the L-bracket sketch to make exactly 36 cm³.',
  goal: (t) => t.op === 'extrude' && t.d === 4,
  params: [
    { key: 'op', label: 'Feature', type: 'choice', value: 'extrude', options: [{ value: 'extrude', label: 'extrude (L-bracket)' }, { value: 'revolve', label: 'revolve (flanged bushing)' }] },
    { key: 'd', label: 'Extrude depth (cm)', min: 0.5, max: 6, step: 0.5, value: 2 },
    { key: 'ang', label: 'Revolve angle (°)', min: 30, max: 360, step: 30, value: 360 },
  ],
  beats: [
    { say: 'A fully constrained L-shaped sketch, 9 cm² in area, lies flat on the sketch plane.', set: { op: 'extrude', d: 0.5 } },
    { say: 'Extrude it 4 cm: every point of the sketch is pushed straight out. Volume = 9 × 4 = 36 cm³.', set: { op: 'extrude', d: 4 } },
    { say: 'Revolve a different sketch around an axis, a quarter turn at a time, and a round flanged bushing appears.', set: { op: 'revolve', ang: 270 } },
  ],
  readout: (t) => {
    if (t.op === 'extrude') {
      const V = 9 * t.d;
      return [['Sketch area', '9 cm²'], ['Volume = area × depth', `${r1(V)} cm³`], ['Mass in steel (7.85 g/cm³)', `${Math.round(V * 7.85)} g`]];
    }
    const { A, cx } = polyAreaCentroid(RPROF);
    const V = A * cx * ((t.ang * Math.PI) / 180);
    return [['Sketch area', `${r2(A)} cm²`], ['Volume (area × distance travelled by its centre)', `${r1(V)} cm³`], ['Mass in steel', `${Math.round(V * 7.85)} g`]];
  },
  setup(kit) {
    const { THREE } = kit;
    const S = 0.6; // world units per cm
    const g = kit.group();
    const grid = new THREE.GridHelper(10, 20, 0x2a3b4d, 0x15263a);
    grid.position.y = -0.01;
    g.add(grid);
    const sketchL = kit.line([...LPROF, LPROF[0]].map(([x, y]) => [x * S - 1.8, y * S, 0]), { color: C.yellow, width: 3, create: false, parent: g });
    const sketchR = kit.line([...RPROF, RPROF[0]].map(([r, y]) => [r * S, y * S, 0]), { color: C.yellow, width: 3, create: false, parent: g });
    const axis = kit.line([[0, -0.5, 0], [0, 3, 0]], { color: C.red, width: 1.5, dashed: true, create: false, parent: g });
    const mat = new THREE.MeshStandardMaterial({ color: 0x9fb3c8, roughness: 0.45, metalness: 0.4, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
    g.add(mesh);
    const edges = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0x0d1117 }));
    g.add(edges);
    let key = '';
    return (p, t, time) => {
      const k = `${t.op}|${Math.round(p.d * 20)}|${Math.round(p.ang)}`;
      if (k !== key) {
        key = k;
        mesh.geometry.dispose();
        edges.geometry.dispose();
        if (t.op === 'extrude') {
          const sh = new THREE.Shape(LPROF.map(([x, y]) => new THREE.Vector2(x * S - 1.8, y * S)));
          mesh.geometry = new THREE.ExtrudeGeometry(sh, { depth: p.d * S, bevelEnabled: false });
        } else {
          const pts = [...RPROF, RPROF[0]].map(([r, y]) => new THREE.Vector2(r * S, y * S));
          mesh.geometry = new THREE.LatheGeometry(pts, 48, 0, (p.ang * Math.PI) / 180);
        }
        edges.geometry = new THREE.EdgesGeometry(mesh.geometry, 25);
      }
      sketchL.visible(t.op === 'extrude');
      sketchR.visible(t.op === 'revolve');
      axis.visible(t.op === 'revolve');
      g.rotation.y = -0.6 + 0.2 * Math.sin(time * 0.3);
    };
  },
};

// ---------------------------------------------------------------------------
// Miller indices: a plane (hkl) in a cubic unit cell
// ---------------------------------------------------------------------------
const CELL = 3;
const toW = ([x, y, z]) => [(x - 0.5) * CELL, (z - 0.5) * CELL, -(y - 0.5) * CELL];
function planePoly(h, k, l, rhs) {
  const f = (p) => h * p[0] + k * p[1] + l * p[2] - rhs;
  const corners = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) corners.push([x, y, z]);
  // corners that lie exactly on the plane (all 8 are checked, including the last)
  const pts = corners.filter((a) => Math.abs(f(a)) < 1e-9);
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      const a = corners[i];
      const b = corners[j];
      if (a.filter((v, q) => v !== b[q]).length !== 1) continue;
      const fa = f(a);
      const fb = f(b);
      if (fa * fb < 0) {
        const s = fa / (fa - fb);
        pts.push(a.map((v, q) => v + (b[q] - v) * s));
      }
    }
  }
  const uniq = pts.filter((p, i) => pts.findIndex((q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 1e-6) === i);
  if (uniq.length < 3) return [];
  const c = uniq.reduce((s, p) => s.map((v, q) => v + p[q] / uniq.length), [0, 0, 0]);
  const n = [h, k, l];
  const ref = Math.abs(h) < 0.9 * Math.hypot(h, k, l) ? [1, 0, 0] : [0, 1, 0];
  const u = [n[1] * ref[2] - n[2] * ref[1], n[2] * ref[0] - n[0] * ref[2], n[0] * ref[1] - n[1] * ref[0]];
  const w = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
  const ang = (p) => {
    const d = p.map((v, q) => v - c[q]);
    return Math.atan2(d[0] * w[0] + d[1] * w[1] + d[2] * w[2], d[0] * u[0] + d[1] * u[1] + d[2] * u[2]);
  };
  return uniq.sort((a, b) => ang(a) - ang(b));
}
const icpt = (v) => (v === 0 ? '∞' : `${Math.round((1 / v) * 100) / 100}`);

export const miller_planes = {
  camera: { kind: '3d', position: [6, 4.5, 8] },
  mission: 'Make the (111) plane: the most crowded plane in copper and aluminium, where they slip.',
  goal: (t) => t.h === 1 && t.k === 1 && t.l === 1,
  params: [
    { key: 'h', label: 'h', min: 0, max: 2, step: 1, value: 1 },
    { key: 'k', label: 'k', min: 0, max: 2, step: 1, value: 0 },
    { key: 'l', label: 'l', min: 0, max: 2, step: 1, value: 0 },
  ],
  beats: [
    { say: '(100): the plane cuts x at 1 and never meets y or z. It is one face of the cube.', set: { h: 1, k: 0, l: 0 } },
    { say: '(110): cuts x at 1 and y at 1, parallel to z. A diagonal wall through the cube.', set: { h: 1, k: 1, l: 0 } },
    { say: '(111): cuts all three axes at 1. In copper this triangle is packed tight with atoms, and it is the plane layers slide along when the metal bends.', set: { h: 1, k: 1, l: 1 } },
    { say: '(200): parallel to (100) but halfway in. The faint plane shows the next member of the same family.', set: { h: 2, k: 0, l: 0 } },
  ],
  readout: (t) => {
    if (!t.h && !t.k && !t.l) return [['Plane', '(000) is not a plane: at least one index must be non-zero']];
    return [
      ['Plane', `(${t.h}${t.k}${t.l})`],
      ['Intercepts x, y, z', `${icpt(t.h)}, ${icpt(t.k)}, ${icpt(t.l)}`],
      ['Spacing d = a/√(h²+k²+l²), copper a = 0.361 nm', `${(0.361 / Math.hypot(t.h, t.k, t.l)).toFixed(3)} nm`],
      ['Perpendicular direction', `[${t.h}${t.k}${t.l}]`],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const g = kit.group();
    const corners = [];
    for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) corners.push([x, y, z]);
    for (let i = 0; i < 8; i++)
      for (let j = i + 1; j < 8; j++)
        if (corners[i].filter((v, q) => v !== corners[j][q]).length === 1) kit.line([toW(corners[i]), toW(corners[j])], { color: C.axis, width: 1.5, opacity: 0.7, create: false, parent: g });
    corners.forEach((c) => kit.sphere(toW(c), 0.12, 0xd9895b, { parent: g }));
    // axes from the origin corner
    const O = toW([0, 0, 0]);
    [['x', [1.35, 0, 0], C.red], ['y', [0, 1.35, 0], C.green], ['z', [0, 0, 1.35], C.blue]].forEach(([n, e, col]) => {
      kit.arrow(O, toW(e), { color: col, width: 3, head: 0.25, parent: g });
      kit.label(n, toW(e.map((v) => v * 1.08)), { size: 16, color: col, parent: g });
    });
    const mk = (opacity, color) => {
      const m = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false }));
      g.add(m);
      return m;
    };
    const plane = mk(0.45, C.yellow);
    const next = mk(0.15, C.yellow);
    const rim = kit.line([], { color: C.yellow, width: 2.5, create: false, parent: g });
    const normal = kit.arrow(O, O, { color: C.pink, width: 3, head: 0.25, parent: g });
    const fan = (mesh, poly) => {
      mesh.geometry.dispose();
      const geo = new THREE.BufferGeometry();
      if (poly.length >= 3) {
        const P = poly.map(toW);
        const arr = [];
        for (let i = 1; i < P.length - 1; i++) arr.push(...P[0], ...P[i], ...P[i + 1]);
        geo.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
      }
      mesh.geometry = geo;
    };
    let key = '';
    return (_p, t, time) => {
      const k = `${t.h}${t.k}${t.l}`;
      if (k !== key) {
        key = k;
        const poly = t.h || t.k || t.l ? planePoly(t.h, t.k, t.l, 1) : [];
        fan(plane, poly);
        fan(next, t.h || t.k || t.l ? planePoly(t.h, t.k, t.l, 2) : []);
        rim.set(poly.length ? [...poly, poly[0]].map(toW) : []);
        const n = Math.hypot(t.h, t.k, t.l) || 1;
        normal.set(O, toW([(t.h / n) * 0.9, (t.k / n) * 0.9, (t.l / n) * 0.9]));
      }
      g.rotation.y = 0.3 * Math.sin(time * 0.25);
    };
  },
};

// ---------------------------------------------------------------------------
// Brinell hardness: a 10 mm ball pressed into a block
// ---------------------------------------------------------------------------
const HB = { al: ['aluminium alloy', 95], brass: ['brass', 110], mild: ['mild steel', 130], qt: ['quenched and tempered steel', 300], tool: ['hardened tool steel', 600] };
const dent = (F, hb, D = 10) => {
  const h = F / (Math.PI * D * hb);
  return { h, d: 2 * Math.sqrt(h * (D - h)) };
};

export const brinell_dent = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a load that gives a readable dent (2.4–6 mm) in the aluminium alloy.',
  goal: (t) => {
    const { d } = dent(Number(t.F), HB[t.mat][1]);
    return t.mat === 'al' && d >= 2.4 && d <= 6;
  },
  params: [
    { key: 'mat', label: 'Material', type: 'choice', value: 'mild', options: Object.entries(HB).map(([k, v]) => ({ value: k, label: v[0] })) },
    { key: 'F', label: 'Load (kgf)', type: 'choice', value: '3000', options: ['500', '1500', '3000'].map((v) => ({ value: v, label: v })) },
  ],
  beats: [
    { say: 'Mild steel, 3,000 kgf on a 10 mm ball: the dent is about 5 mm across. That gives HB ≈ 130.', set: { mat: 'mild', F: '3000' } },
    { say: 'Hardened tool steel at the same load: a much smaller dent, HB ≈ 600.', set: { mat: 'tool', F: '3000' } },
    { say: 'Aluminium at 3,000 kgf: the ball sinks too far and the dent is too wide to read well. Drop the load to 500 kgf.', set: { mat: 'al', F: '500' } },
  ],
  readout: (t) => {
    const hb = HB[t.mat][1];
    const { h, d } = dent(Number(t.F), hb);
    const ok = d >= 2.4 && d <= 6;
    return [
      ['Dent diameter d', `${r2(d)} mm ${ok ? '(readable)' : '(outside 2.4–6 mm: change the load)'}`],
      ['Dent depth h', `${r2(h)} mm`],
      ['Brinell hardness HB', `${hb}`],
      ['Estimated tensile strength', t.mat === 'al' || t.mat === 'brass' ? 'the 3.45 × HB rule is for steels' : `≈ ${Math.round(3.45 * hb)} MPa`],
    ];
  },
  setup(kit) {
    const S = 0.42; // world units per mm
    const cx = -3.2;
    const top = -0.6;
    const blockPts = (d, h) => {
      const R = 5 * S;
      const half = (d / 2) * S;
      const arc = range(-half, half, 40).map((x) => [cx + x, top - (Math.sqrt(Math.max(0, R * R - x * x)) - (R - h * S))]);
      return [[cx - 4.2, -4.0], [cx - 4.2, top], ...(half > 0.001 ? arc : []), [cx + 4.2, top], [cx + 4.2, -4.0]];
    };
    const block = kit.fill([], { color: C.grey, opacity: 0.45 });
    const outline = kit.line([], { color: C.axis, width: 2, create: false });
    const ball = kit.fill([], { color: C.white, opacity: 0.9 });
    const rod = kit.rect(0, 0, 0, 0, { color: C.grey, opacity: 0.6, strokeColor: C.axis, width: 1.5 });
    const force = kit.arrow([cx, 4.2], [cx, 3.2], { color: C.red, width: 4, head: 0.3 });
    const fl = kit.label('', [cx + 1.3, 3.9], { size: 16, color: C.red });
    // top view of the dent with a ruler
    const tx = 4.8;
    kit.label('\\text{top view}', [tx, 3.9], { size: 14, color: '#8b949e' });
    kit.rect(tx - 2.7, -1.7, 5.4, 5.0, { color: C.grey, opacity: 0.25, strokeColor: C.axis, width: 1.5 });
    const ring = kit.line([], { color: C.white, width: 2.5, create: false });
    const ruler = kit.line([], { color: C.yellow, width: 2, create: false });
    const dl = kit.label('', [tx, -2.3], { size: 16, color: C.yellow });
    for (let i = 0; i <= 8; i++) kit.line([[tx - 2.5 + i * 0.63, -1.7], [tx - 2.5 + i * 0.63, -1.45 - (i % 2 ? 0 : 0.12)]], { color: C.axis, width: 1 });
    let key = '';
    let clock = 0;
    return (_p, t, _time, dt) => {
      const F = Number(t.F);
      const { h, d } = dent(F, HB[t.mat][1]);
      const k = `${t.mat}|${t.F}`;
      if (k !== key) {
        key = k;
        clock = 0;
      }
      clock += dt;
      // press (0–1.5 s), hold, lift (2.5–3.5 s)
      const press = clamp(clock / 1.5, 0, 1);
      const lift = clamp((clock - 2.5) / 1, 0, 1);
      const depth = h * press;
      const R = 5 * S;
      const by = top - depth * S + R + lift * 2.0;
      ball.set(range(0, 2 * Math.PI, 48).map((q) => [cx + R * Math.cos(q), by + R * Math.sin(q)]));
      rod.set(cx - 0.35, by + R - 0.1, 0.7, 4.6 - (by + R));
      const shown = 2 * Math.sqrt(Math.max(0, depth * (10 - depth)));
      const pts = blockPts(shown, depth);
      block.set(pts);
      outline.set(pts.slice(1, -1));
      force.set([cx, 4.4], [cx, 4.4 - 0.4 - (F / 3000) * 0.6]).visible(lift < 0.5);
      fl.set(`F = ${F}\\,\\text{kgf}`);
      const rr = (d / 2) * 0.63 * (clock > 2.5 ? 1 : press);
      ring.set(range(0, 2 * Math.PI, 60).map((q) => [tx + rr * Math.cos(q), 1.0 + rr * Math.sin(q)]));
      ruler.set([[tx - rr, -1.1], [tx + rr, -1.1]]);
      dl.set(`d = ${r2(d)}\\,\\text{mm}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Microscopes: zooming from a steel bar to its atoms
// ---------------------------------------------------------------------------
const INSTR = [
  ['eye', 1e-4],
  ['light microscope', 2e-7],
  ['SEM', 1e-9],
  ['TEM', 5e-11],
];
const fmtLen = (m) => {
  if (m >= 1) return `${r1(m)} m`;
  if (m >= 1e-3) return `${r1(m * 1e3)} mm`;
  if (m >= 1e-6) return `${r1(m * 1e6)} μm`;
  return `${r1(m * 1e9)} nm`;
};

export const microscope_zoom = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Zoom in until the light microscope can no longer show the detail, and only electron microscopes can.',
  goal: (t) => 10 ** t.z / 50 < 2e-7,
  params: [{ key: 'z', label: 'Zoom: field of view = 10ᶻ metres', min: -9, max: 0, step: 0.25, value: 0 }],
  beats: [
    { say: 'A field of view 1 metre wide: a steel bar. To the eye it looks perfectly uniform.', set: { z: 0 } },
    { say: 'Zoom to 1 mm (polished and etched): the steel is a patchwork of grains, each a separate crystal about 50 μm across.', set: { z: -3 } },
    { say: 'At 10 μm, some grains are striped: pearlite, thin layers of iron and iron carbide about 0.3 μm apart. A light microscope just manages this.', set: { z: -5 } },
    { say: 'At 3 nanometres you see the rows of iron atoms themselves, 0.29 nm apart. Only a transmission electron microscope can show this.', set: { z: -8.5 } },
  ],
  readout: (t) => {
    const W = 10 ** t.z;
    const detail = W / 50;
    return [
      ['Field of view', fmtLen(W)],
      ['Smallest detail in this view', fmtLen(detail)],
      ['Can show it', INSTR.filter(([, r]) => r <= detail).map(([n]) => n).join(', ') || 'none'],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const layer = (W0, zMin, zMax) => {
      const g = kit.group();
      return { g, W0, zMin, zMax, items: [] };
    };
    // the bar: drawn for a 1 m field (16 world units)
    const L1 = layer(1, -2.8, 1);
    L1.items.push(kit.rect(-6.4, -0.4, 12.8, 0.8, { color: 0x9fb3c8, opacity: 0.9, strokeColor: C.white, width: 2, parent: L1.g }));
    // grains: drawn for a 1 mm field, 50 μm grains → 0.8 world units
    const L2 = layer(1e-3, -4.6, -2.2);
    const r = 0.46; // hexagon radius, so grains are about 0.8 world units across
    const jit = (x, y) => {
      const h = Math.sin(Math.round(x * 100) * 12.9898 + Math.round(y * 100) * 78.233) * 43758.5453;
      return (h - Math.floor(h) - 0.5) * 0.35;
    };
    const V = (x, y) => [x + jit(x, y), y + jit(y + 3.1, x)];
    const segs = [];
    for (let i = -34; i < 34; i++) for (let j = -30; j < 30; j++) {
      const cx = i * Math.sqrt(3) * r + (Math.abs(j) % 2 ? (Math.sqrt(3) / 2) * r : 0);
      const cy = j * 1.5 * r;
      const vs = range(0, 5, 6).map((k) => {
        const q = ((30 + 60 * k) * Math.PI) / 180;
        return V(Math.round((cx + r * Math.cos(q)) * 1000) / 1000, Math.round((cy + r * Math.sin(q)) * 1000) / 1000);
      });
      vs.forEach((v, k) => segs.push([v, vs[(k + 1) % 6]]));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(segs.flatMap(([a, b]) => [a[0], a[1], 0, b[0], b[1], 0]), 3));
    const grainMat = new THREE.LineBasicMaterial({ color: 0xc9d1d9, transparent: true, opacity: 1 });
    L2.g.add(new THREE.LineSegments(geo, grainMat));
    // pearlite: drawn for a 10 μm field, 0.3 μm spacing → 0.48 world units
    const L3 = layer(1e-5, -6.8, -4.3);
    const stripes = [];
    for (let i = -60; i < 60; i++) {
      const x = i * 0.48;
      stripes.push(kit.fill([[x - 6, -30], [x - 6 + 0.16, -30], [x + 6 + 0.16, 30], [x + 6, 30]], { color: 0xc9d1d9, opacity: 0.8, parent: L3.g }));
    }
    // atoms: drawn for a 3 nm field, 0.287 nm spacing → 1.53 world units
    const L4 = layer(3e-9, -9.5, -7.3);
    const a = 1.53;
    for (let i = -12; i <= 12; i++) for (let j = -8; j <= 8; j++) {
      L4.items.push(kit.dot([i * a, j * a], { r: 0.42, color: 0x9fb3c8, parent: L4.g }));
      if (i < 12 && j < 8) L4.items.push(kit.dot([i * a + a / 2, j * a + a / 2], { r: 0.42, color: 0x8a95a5, parent: L4.g }));
    }
    const layers = [L1, L2, L3, L4];
    const chips = INSTR.map(([n], i) => {
      kit.rect(-7.6 + i * 3.9, -4.35, 3.6, 0.6, { color: C.bg, opacity: 0.92, strokeColor: C.axis, width: 1, z: 8 });
      return { n, l: kit.label(`\\text{${n}}`, [-5.8 + i * 3.9, -4.05], { size: 14 }) };
    });
    kit.rect(4.4, 3.3, 3.5, 1.05, { color: C.bg, opacity: 0.85, stroke: false, z: 8 });
    kit.line([[4.6, 3.5], [7.8, 3.5]], { color: C.white, width: 3, z: 9 });
    const barL = kit.label('', [6.2, 3.95], { size: 14 });
    const fade = (z, L) => clamp(Math.min((z - L.zMin) / 0.6, (L.zMax - z) / 0.6), 0, 1);
    return (p) => {
      const W = 10 ** p.z;
      for (const L of layers) {
        const o = fade(p.z, L);
        L.g.visible = o > 0.01;
        L.g.scale.setScalar(L.W0 / W);
        L.items.forEach((it) => it.opacity?.(o * 0.9));
        if (L === L2) grainMat.opacity = o;
        if (L === L3) stripes.forEach((s) => s.opacity(o * 0.8));
      }
      const detail = W / 50;
      chips.forEach((c, i) => {
        const ok = INSTR[i][1] <= detail;
        c.l.set(`\\text{${c.n}${ok ? ' ✓' : ' ✗'}}`).color(ok ? C.green : '#6e7681');
      });
      barL.set(`\\text{${fmtLen(W * 0.2)}}`);
    };
  },
};
