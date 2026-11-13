// Computer Science track: Graphics (gfx-001 to gfx-008). Story scenes: beats
// set the params, hidden params drive handles, and touching any control frees
// the scene.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono' };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rgb = (r, g, b) => (clamp(R(r), 0, 255) << 16) | (clamp(R(g), 0, 255) << 8) | clamp(R(b), 0, 255);
const hex2 = (v) => clamp(R(v), 0, 255).toString(16).toUpperCase().padStart(2, '0');
const circlePts = (cx, cy, r, n = 64) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos((i / n) * 2 * Math.PI), cy + r * Math.sin((i / n) * 2 * Math.PI)]);

// ---------------------------------------------------------------------------
// gfx-001: additive RGB mixing
// ---------------------------------------------------------------------------
export function colourName(r, g, b) {
  const hi = (v) => v > 170;
  const lo = (v) => v < 70;
  if (hi(r) && hi(g) && hi(b)) return 'white';
  if (lo(r) && lo(g) && lo(b)) return 'black';
  if (Math.abs(r - g) < 30 && Math.abs(g - b) < 30) return 'grey';
  if (hi(r) && hi(g) && lo(b)) return 'yellow';
  if (hi(r) && g > 90 && g <= 170 && lo(b)) return 'orange';
  if (hi(r) && lo(g) && hi(b)) return 'magenta';
  if (lo(r) && hi(g) && hi(b)) return 'cyan';
  if (r >= g && r >= b) return 'reddish';
  if (g >= r && g >= b) return 'greenish';
  return 'bluish';
}
export const rgb_mix = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Mix the golden yellow of the Philippine flag’s sun, about (252, 209, 22).',
  goal: (t) => Math.abs(R(t.r) - 252) <= 20 && Math.abs(R(t.g) - 209) <= 20 && R(t.b) <= 60,
  params: [
    { key: 'r', label: 'Red', min: 0, max: 255, step: 1, value: 255 },
    { key: 'g', label: 'Green', min: 0, max: 255, step: 1, value: 0 },
    { key: 'b', label: 'Blue', min: 0, max: 255, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Look closely at a screen and each pixel is three tiny lights: red, green and blue. Here only the red one is on, at full brightness, 255.', set: { r: 255, g: 0, b: 0 }, ms: 11000, notes: [{ text: 'three sub-pixels', at: [-5.3, 3.5], to: [-5.3, 2.7], color: C.gold }] },
    { say: 'Turn green on too. There is no yellow light anywhere, yet you see yellow: your red and green receptors both fire, and the brain reads that as yellow.', set: { g: 255 }, ms: 12500, notes: [{ text: 'no yellow light here!', at: [2.0, 3.4], to: [2.0, 2.3], color: C.gold }] },
    { say: 'All three at full: white. Adding light makes things brighter, unlike paint, which absorbs.', set: { b: 255 }, ms: 9500 },
    { say: 'Three numbers, each 0 to 255, give 256 × 256 × 256 = 16,777,216 colours. A ripe mango is about (255, 190, 40).', set: { r: 255, g: 190, b: 40 }, ms: 12000 },
    { say: 'Equal amounts of all three give grey. Kirsch’s first digital photo in 1957 had no colour at all: just one brightness number per pixel.', set: { r: 128, g: 128, b: 128 }, ms: 11500 },
  ],
  readout: (t) => [
    ['Pixel', `(${R(t.r)}, ${R(t.g)}, ${R(t.b)})`],
    ['Hex', `#${hex2(t.r)}${hex2(t.g)}${hex2(t.b)}`],
  ],
  setup(kit) {
    const subs = [C.red, C.green, C.blue].map((c, i) => {
      const x = -6.4 + i * 1.1;
      kit.rect(x, -2.5, 0.85, 5, { color: 0x0b0f16, opacity: 1, strokeColor: C.grid, width: 1.5 });
      const glow = kit.rect(x, -2.5, 0.85, 5, { color: c, opacity: 0, stroke: false, z: 2 });
      const val = kit.label('', [x + 0.42, -3.0], { ...mono, size: 15, color: c });
      return { glow, val };
    });
    kit.label('up close', [-5.3, -3.7], { tex: false, size: 13, color: C.grey });
    kit.arrow([-2.5, 0], [-0.7, 0], { color: C.grey });
    kit.rect(0, -2.2, 4.4, 4.4, { color: 0x000000, opacity: 1, strokeColor: C.grid, width: 1.5 });
    const mix = kit.rect(0, -2.2, 4.4, 4.4, { color: 0, opacity: 1, stroke: false, z: 2 });
    kit.label('from a distance', [2.2, -2.8], { tex: false, size: 13, color: C.grey });
    const name = kit.label('', [6.4, -1.3], { tex: false, size: 20 });
    const hexL = kit.label('', [6.4, 0.4], { ...mono, size: 22 });
    kit.label('hex code', [6.4, -0.3], { tex: false, size: 12, color: C.grey });
    return (t) => {
      const v = [t.r, t.g, t.b];
      subs.forEach((s, i) => {
        s.glow.opacity(clamp(v[i] / 255, 0, 1));
        s.val.set(`${R(v[i])}`);
      });
      mix.color(rgb(t.r, t.g, t.b));
      name.set(colourName(R(t.r), R(t.g), R(t.b)));
      hexL.set(`#${hex2(t.r)}${hex2(t.g)}${hex2(t.b)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-002: Bresenham's line
// ---------------------------------------------------------------------------
export function bresenham(x1, y1) {
  const steep = y1 > x1;
  const dx = steep ? y1 : x1;
  const dy = steep ? x1 : y1;
  let D = 2 * dy - dx;
  let y = 0;
  const px = [];
  for (let x = 0; x <= dx; x++) {
    px.push({ p: steep ? [y, x] : [x, y], D });
    if (D > 0) {
      y += 1;
      D -= 2 * dx;
    }
    D += 2 * dy;
  }
  return { px, steep };
}
const BC = 0.8;
const bW = (i, j) => [-5.6 + BC * i, -3.2 + BC * j];
export const bresenham_line = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Draw a steep line, taller than it is wide, all the way. Which axis gets one pixel per step now?',
  goal: (t) => R(t.y1) > R(t.x1) && R(t.k) >= Math.max(R(t.x1), R(t.y1)) + 1,
  params: [
    { key: 'x1', label: 'End x', min: 1, max: 14, step: 1, value: 10 },
    { key: 'y1', label: 'End y', min: 0, max: 8, step: 1, value: 4 },
    { key: 'k', label: 'Pixels drawn', min: 0, max: 15, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A screen is a grid. We want a line from (0, 0) to (10, 4). The true line, in blue, passes between pixel centres, but we can only light whole squares.', set: { x1: 10, y1: 4, k: 0 }, ms: 12000 },
    { say: 'The line is shallow, so we light exactly one pixel in each column. Start at (0, 0).', set: { k: 1 }, ms: 8500 },
    { say: 'Each step right, the true line rises 4/10 of a pixel. Bresenham keeps a running error in whole numbers. When it passes zero, the line has drifted closer to the next row: step up.', set: { k: 4 }, ms: 14000, notes: [{ text: 'error > 0: step up one row', at: [-1.6, 2.4], to: [-3.4, -2.2], color: C.gold }] },
    { say: 'Eleven columns, eleven pixels, and not a single fraction or multiplication: only adding and comparing. That is why it ran fast on a 1962 plotter, and still runs in graphics chips.', set: { k: 11 }, ms: 13000 },
    { say: 'A steep line would leave gaps if we kept stepping along x. So the roles swap: one pixel per row, stepping across when the error says so.', set: { x1: 4, y1: 8, k: 9 }, ms: 12000 },
  ],
  readout: (t) => {
    const { px, steep } = bresenham(R(t.x1), R(t.y1));
    const k = Math.min(R(t.k), px.length);
    const last = px[k - 1];
    return [
      ['Line', `(0, 0) → (${R(t.x1)}, ${R(t.y1)}), ${steep ? 'steep: one pixel per row' : 'shallow: one pixel per column'}`],
      ['Pixels', `${k} of ${px.length}${last ? `, last (${last.p[0]}, ${last.p[1]}), error ${last.D}` : ''}`],
    ];
  },
  setup(kit) {
    const cells = [];
    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < 15; i++) {
        const [x, y] = bW(i, j);
        cells.push(kit.rect(x - BC / 2, y - BC / 2, BC, BC, { color: C.gold, opacity: 0, strokeColor: C.grid, width: 1 }));
      }
    }
    for (let j = 0; j < 10; j++) for (let i = 0; i < 15; i++) kit.dot(bW(i, j), { r: 0.03, color: C.grid });
    kit.label('0', [bW(0, 0)[0], -3.9], { ...mono, size: 12, color: C.grey });
    kit.label('14', [bW(14, 0)[0], -3.9], { ...mono, size: 12, color: C.grey });
    kit.label('8', [-6.3, bW(0, 8)[1]], { ...mono, size: 12, color: C.grey });
    const trueLine = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 3, z: 6 });
    const cur = kit.dot([0, 0], { r: 0.12, color: C.red, z: 7 });
    return (t) => {
      const x1 = R(t.x1);
      const y1 = R(t.y1);
      const { px } = bresenham(x1, y1);
      const k = Math.min(R(t.k), px.length);
      const on = new Set(px.slice(0, k).map((q) => q.p[1] * 15 + q.p[0]));
      cells.forEach((c, n) => c.opacity(on.has(n) ? 0.8 : 0));
      trueLine.set([bW(0, 0), bW(x1, y1)]);
      cur.visible(k > 0);
      if (k > 0) cur.set(bW(...px[k - 1].p));
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-003: rotate, scale, move with one matrix
// ---------------------------------------------------------------------------
const HOUSE = [[-1, -1], [1, -1], [1, 0.5], [0, 1.5], [-1, 0.5]];
const OX = -2.5;
const OY = -0.3;
export function transformPts(pts, ang, s, tx, ty, order = 'TRS') {
  const a = (ang * Math.PI) / 180;
  const c = Math.cos(a);
  const sn = Math.sin(a);
  return pts.map(([x, y]) => {
    if (order === 'TRS') {
      const X = s * x;
      const Y = s * y;
      return [c * X - sn * Y + tx, sn * X + c * Y + ty];
    }
    // rotate after moving: R T S
    const X = s * x + tx;
    const Y = s * y + ty;
    return [c * X - sn * Y, sn * X + c * Y];
  });
}
const f2 = (v) => {
  const r = Math.round(v * 100) / 100;
  return (Object.is(r, -0) ? 0 : r).toFixed(2).padStart(5, ' ');
};
export const transform2d = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Turn the house upside down (180°) and move it 2 to the right, keeping its size.',
  goal: (t) => Math.abs(Math.abs(R(t.ang)) - 180) < 1 && Math.abs(t.tx - 2) < 0.01 && Math.abs(t.s - 1) < 0.01 && t.order === 'TRS',
  params: [
    { key: 'ang', label: 'Angle θ (°)', min: -180, max: 180, step: 5, value: 0 },
    { key: 's', label: 'Scale', min: 0.5, max: 2, step: 0.1, value: 1 },
    { key: 'tx', label: 'Move x', min: -3, max: 3, step: 0.5, value: 0 },
    { key: 'ty', label: 'Move y', min: -2, max: 2, step: 0.5, value: 0 },
    { key: 'order', label: 'Order', type: 'choice', value: 'TRS', options: [{ value: 'TRS', label: 'Scale, rotate, then move' }, { value: 'RTS', label: 'Move, then rotate' }] },
  ],
  beats: [
    { say: 'A shape is just a list of corner points. The grey dashed house is the original; the blue one is what we draw after transforming every corner.', set: { ang: 0, s: 1, tx: 0, ty: 0, order: 'TRS' }, ms: 11000 },
    { say: 'Rotate by 45°. Every corner (x, y) becomes (x cos θ − y sin θ, x sin θ + y cos θ): a 2 × 2 matrix times the point.', set: { ang: 45 }, ms: 12000, notes: [{ text: 'cos and sin fill the matrix', at: [5.4, 3.3], to: [5.4, 2.2], color: C.gold }] },
    { say: 'Scale by 1.5: multiply the matrix by 1.5. Still one matrix.', set: { s: 1.5 }, ms: 8500 },
    { say: 'Moving is adding, not multiplying. The trick from Möbius: give each point a third coordinate, always 1. Then the move goes in the third column, and everything is one 3 × 3 matrix.', set: { tx: 3, ty: 0.5 }, ms: 14000, notes: [{ text: 'the move lives here', at: [7.4, 2.6], to: [7.1, 1.4], color: C.gold }] },
    { say: 'Order matters. Move first and then rotate, and the house swings in a wide arc around the origin. Matrix products are not commutative.', set: { order: 'RTS' }, ms: 12000, notes: [{ text: 'rotates about the origin', at: [-5.5, -3.2], to: [-2.6, -0.4], color: C.red }] },
  ],
  readout: (t) => {
    const [p] = transformPts([[1, -1]], t.ang, t.s, t.tx, t.ty, t.order);
    return [
      ['Corner (1, −1)', `→ (${p[0].toFixed(2)}, ${p[1].toFixed(2)})`],
      ['Matrix', t.order === 'TRS' ? 'M = T · R · S' : 'M = R · T · S'],
    ];
  },
  setup(kit) {
    kit.line([[OX - 5, OY], [OX + 6.5, OY]], { color: C.axis, width: 1.5 });
    kit.line([[OX, -4.4], [OX, 4.4]], { color: C.axis, width: 1.5 });
    kit.dot([OX, OY], { r: 0.08, color: C.white });
    kit.label('origin', [OX - 0.55, OY - 0.35], { tex: false, size: 12, color: C.grey });
    const W = (pts) => pts.map(([x, y]) => [x + OX, y + OY]);
    kit.line(W([...HOUSE, HOUSE[0]]), { color: C.grey, width: 2, dashed: true });
    const body = kit.fill(W(HOUSE), { color: C.blue, opacity: 0.35 });
    const edge = kit.line(W([...HOUSE, HOUSE[0]]), { color: C.blue, width: 3 });
    const corner = kit.dot([0, 0], { r: 0.11, color: C.gold });
    kit.rect(3.7, -0.5, 4.1, 2.9, { color: 0x111827, opacity: 0.9, strokeColor: C.grid, width: 1.5 });
    const rows = [0, 1, 2].map((r) => kit.label('', [5.75, 1.95 - r * 0.8], { ...mono, size: 16 }));
    kit.label('M =', [3.2, 1.15], { ...mono, size: 16, color: C.grey });
    return (t) => {
      const pts = transformPts(HOUSE, t.ang, t.s, t.tx, t.ty, t.order);
      body.set(W(pts));
      edge.set(W([...pts, pts[0]]));
      corner.set(W([pts[1]])[0]);
      const a = (t.ang * Math.PI) / 180;
      const c = Math.cos(a) * t.s;
      const sn = Math.sin(a) * t.s;
      let tx = t.tx;
      let ty = t.ty;
      if (t.order === 'RTS') {
        tx = Math.cos(a) * t.tx - Math.sin(a) * t.ty;
        ty = Math.sin(a) * t.tx + Math.cos(a) * t.ty;
      }
      rows[0].set(`${f2(c)} ${f2(-sn)} ${f2(tx)}`);
      rows[1].set(`${f2(sn)} ${f2(c)} ${f2(ty)}`);
      rows[2].set(` 0.00  0.00  1.00`);
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-004: perspective projection of a cube on rails
// ---------------------------------------------------------------------------
const PK = 3;
export const project = (x, y, z, f) => [(PK * f * x) / z, (PK * f * y) / z];
const CUBE = { x0: 0.5, x1: 2.5, y0: -1, y1: 1 };
export const frontHeight = (d, f) => (PK * f * 2) / d;
export const perspective_cube = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Move the cube to 8 m or more, then zoom (focal length) until its front face is as tall as at the start, 2.25.',
  goal: (t) => t.d >= 8 && Math.abs(frontHeight(t.d, t.f) - 2.25) < 0.12,
  params: [
    { key: 'd', label: 'Distance to front face', min: 3, max: 16, step: 0.5, value: 4 },
    { key: 'f', label: 'Focal length f', min: 0.5, max: 4, step: 0.25, value: 1.5 },
  ],
  beats: [
    { say: 'A cube sits on two straight rails. The picture is made like Dürer’s string: each corner is drawn where its line to the eye crosses the image, at x′ = f·x / z.', set: { d: 4, f: 1.5 }, ms: 13000 },
    { say: 'The back face is 2 m farther away, so it is divided by a bigger z and drawn smaller. That alone makes it look solid.', set: {}, ms: 10500, notes: [{ text: 'back face: bigger z, smaller', at: [4.6, 3.3], to: [2.0, 1.0], color: C.gold }] },
    { say: 'Push the cube to 8 m: twice as far, exactly half as tall on screen.', set: { d: 8 }, ms: 9500 },
    { say: 'Farther still, and it slides toward one point. The parallel rails meet there too: the vanishing point Alberti described in 1435.', set: { d: 16 }, ms: 12000, notes: [{ text: 'vanishing point', at: [-3.2, 2.0], to: [-0.1, 0.1], color: C.gold }] },
    { say: 'Zoom: a bigger f scales the whole picture up equally. Far and near parts keep the same proportion, unlike walking closer.', set: { d: 16, f: 4 }, ms: 12000 },
  ],
  readout: (t) => [
    ['Front face', `${frontHeight(t.d, t.f).toFixed(2)} tall at z = ${t.d.toFixed(1)}`],
    ['Back face', `${frontHeight(t.d + 2, t.f).toFixed(2)} tall at z = ${(t.d + 2).toFixed(1)}`],
  ],
  setup(kit) {
    kit.line([[-8, 0], [8, 0]], { color: C.grey, width: 1, dashed: true, opacity: 0.5 });
    kit.label('horizon', [-7.2, 0.3], { tex: false, size: 12, color: C.grey });
    const rails = [CUBE.x0, CUBE.x1].map(() => kit.line([[0, 0], [1, 1]], { color: C.grey, width: 2 }));
    const sleepers = Array.from({ length: 14 }, () => kit.line([[0, 0], [1, 1]], { color: C.grid, width: 2 }));
    const back = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 2, opacity: 0.55 });
    const sides = [0, 1, 2, 3].map(() => kit.line([[0, 0], [1, 1]], { color: C.blue, width: 2, opacity: 0.75 }));
    const frontFill = kit.fill([[0, 0], [1, 0], [1, 1]], { color: C.blue, opacity: 0.25 });
    const front = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 3.5 });
    kit.dot([0, 0], { r: 0.08, color: C.gold });
    const hL = kit.label('', [0, 0], { ...mono, size: 14, color: C.gold });
    return (t) => {
      const { d, f } = t;
      const face = (z) => {
        const q = [[CUBE.x0, CUBE.y0], [CUBE.x1, CUBE.y0], [CUBE.x1, CUBE.y1], [CUBE.x0, CUBE.y1]].map(([x, y]) => project(x, y, z, f));
        return q;
      };
      const F = face(d);
      const B = face(d + 2);
      front.set([...F, F[0]]);
      frontFill.set(F);
      back.set([...B, B[0]]);
      sides.forEach((s, i) => s.set([F[i], B[i]]));
      rails.forEach((r, i) => {
        const x = i ? CUBE.x1 : CUBE.x0;
        r.set([1.2, 2, 4, 8, 20, 80, 400].map((z) => project(x, CUBE.y0, z, f)));
      });
      sleepers.forEach((s, i) => {
        const z = 1.5 + i * 2;
        s.set([project(CUBE.x0 - 0.3, CUBE.y0, z, f), project(CUBE.x1 + 0.3, CUBE.y0, z, f)]);
      });
      hL.set(`${frontHeight(d, f).toFixed(2)}`).pos([F[1][0] + 0.45, (F[1][1] + F[2][1]) / 2]);
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-005: the z-buffer with two interpenetrating triangles
// ---------------------------------------------------------------------------
const ZC = 0.6;
const ZW = 20;
const ZH = 11;
const zWorld = (i, j) => [-6 + ZC * (i + 0.5), -3.6 + ZC * (j + 0.5)];
const TRI = {
  red: { v: [[1, 1], [13, 2.5], [5, 10.5]], depth: (i) => 1 + 0.4 * i, col: C.red },
  blue: { v: [[6.5, 0.5], [19.5, 4], [10, 10.5]], depth: () => 5.5, col: C.blue },
};
const inside = (p, [a, b, c]) => {
  const s = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
  const d1 = s(a, b, p);
  const d2 = s(b, c, p);
  const d3 = s(c, a, p);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};
export function zRender(order, zb, k) {
  const names = order === 'red' ? ['red', 'blue'] : ['blue', 'red'];
  const col = Array.from({ length: ZW * ZH }, () => null);
  const z = Array.from({ length: ZW * ZH }, () => Infinity);
  let overwrites = 0;
  for (const nm of names.slice(0, k)) {
    const T = TRI[nm];
    for (let j = 0; j < ZH; j++) {
      for (let i = 0; i < ZW; i++) {
        if (!inside([i + 0.5, j + 0.5], T.v)) continue;
        const n = j * ZW + i;
        const dz = T.depth(i + 0.5);
        if (zb && dz >= z[n]) continue;
        if (col[n]) overwrites++;
        col[n] = nm;
        z[n] = dz;
      }
    }
  }
  return { col, z, overwrites };
}
export const zbuffer = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 2,
  mission: 'With the z-buffer on, draw both triangles in each order. Does the picture change?',
  goal: (t) => t.zb === 'on' && R(t.k) >= 2 && t.order === 'red',
  params: [
    { key: 'order', label: 'Draw first', type: 'choice', value: 'blue', options: [{ value: 'blue', label: 'Blue first' }, { value: 'red', label: 'Red first' }] },
    { key: 'zb', label: 'Z-buffer', type: 'choice', value: 'off', options: [{ value: 'off', label: 'Off' }, { value: 'on', label: 'On' }] },
    { key: 'view', label: 'Show', type: 'choice', value: 'colour', options: [{ value: 'colour', label: 'Colours' }, { value: 'depth', label: 'Depth buffer' }] },
    { key: 'k', label: 'Triangles drawn', min: 0, max: 2, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Two triangles cut through each other. The blue one stands upright at depth 5.5. The red one tilts: near (small z) on the left, far on the right.', set: { order: 'blue', zb: 'off', view: 'colour', k: 0 }, ms: 12500 },
    { say: 'No z-buffer: draw blue, then red. Whatever comes later simply paints over. Red now hides blue everywhere, even on the right, where red is really behind.', set: { k: 2 }, ms: 12500, notes: [{ text: 'wrong: red is behind here', at: [5.6, 3.6], to: [3.0, 0.6], color: C.red }] },
    { say: 'Swap the order and it is wrong the other way. With crossing shapes, no order is right.', set: { order: 'red' }, ms: 10000 },
    { say: 'Catmull’s z-buffer: each pixel remembers the nearest depth drawn so far, and a new pixel is drawn only if it is nearer. Now the triangles cross correctly, in any order.', set: { zb: 'on' }, ms: 13500, notes: [{ text: 'the crossing line', at: [5.6, 3.6], to: [0, 0.3], color: C.gold }] },
    { say: 'This is the buffer itself: one depth per pixel, bright for near, dark for far. Graphics cards keep one exactly like it for every frame.', set: { view: 'depth' }, ms: 11000 },
  ],
  readout: (t) => {
    const { overwrites } = zRender(t.order, t.zb === 'on', R(t.k));
    return [
      ['Drawn', R(t.k) === 0 ? 'nothing yet' : `${t.order === 'red' ? 'red, blue' : 'blue, red'}`.split(', ').slice(0, R(t.k)).join(' then ')],
      ['Pixels painted over', `${overwrites}`],
    ];
  },
  setup(kit) {
    const cells = [];
    for (let j = 0; j < ZH; j++) {
      for (let i = 0; i < ZW; i++) {
        const [x, y] = zWorld(i, j);
        cells.push(kit.rect(x - ZC / 2, y - ZC / 2, ZC, ZC, { color: C.grid, opacity: 0, strokeColor: C.grid, width: 0.8 }));
      }
    }
    kit.label('near', [-6.6, 3.9], { tex: false, size: 12, color: C.red });
    kit.label('far', [5.5, 3.9], { tex: false, size: 12, color: C.grey });
    kit.arrow([-5.9, 3.9], [4.9, 3.9], { color: C.grey });
    kit.label('red’s depth', [-0.5, 4.25], { tex: false, size: 12, color: C.grey });
    return (t) => {
      const { col, z } = zRender(t.order, t.zb === 'on', R(t.k));
      const depthView = t.view === 'depth';
      cells.forEach((c, n) => {
        if (!col[n]) {
          c.opacity(depthView ? 0.9 : 0).color(0x05070b);
          return;
        }
        if (depthView) {
          const g = 255 * clamp(1 - (z[n] - 1) / 8, 0.1, 1);
          c.color(rgb(g, g, g)).opacity(1);
        } else c.color(TRI[col[n]].col).opacity(0.85);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-006: Lambert and Phong shading on a ball
// ---------------------------------------------------------------------------
const BALL = { cx: -1.8, cy: 0, r: 3.4 };
const LS = 0.34;
export function lightDir(a, h) {
  const A = (a * Math.PI) / 180;
  const H = (h * Math.PI) / 180;
  return [Math.cos(H) * Math.cos(A), Math.cos(H) * Math.sin(A), Math.sin(H)];
}
export function shade(n, l, mode) {
  if (mode === 'flat') return { d: 1, s: 0 };
  const d = Math.max(0, n[0] * l[0] + n[1] * l[1] + n[2] * l[2]);
  if (mode !== 'phong') return { d, s: 0 };
  const hv = [l[0], l[1], l[2] + 1];
  const m = Math.hypot(...hv) || 1;
  const nh = Math.max(0, (n[0] * hv[0] + n[1] * hv[1] + n[2] * hv[2]) / m);
  return { d, s: d > 0 ? nh ** 40 : 0 };
}
const SAMPLE = [0.55, 0.45];
export const lambert_shading = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Light the ball from the lower right, with a shiny highlight.',
  goal: (t) => t.mode === 'phong' && t.a < 0 && t.a > -90,
  params: [
    { key: 'a', label: 'Light direction (°)', min: -180, max: 180, step: 5, value: 135 },
    { key: 'h', label: 'Light height toward you (°)', min: 0, max: 80, step: 5, value: 35 },
    { key: 'mode', label: 'Shading', type: 'choice', value: 'flat', options: [{ value: 'flat', label: 'Flat colour' }, { value: 'lambert', label: 'Lambert' }, { value: 'phong', label: 'Lambert + Phong highlight' }] },
  ],
  beats: [
    { say: 'One flat colour: it is just a disc. Nothing says “ball”.', set: { mode: 'flat', a: 135, h: 35 }, ms: 8000 },
    { say: 'Lambert’s law from 1760: each patch is as bright as the cosine of the angle between its normal, the arrow pointing out of the surface, and the light. In vectors, max(0, n · l).', set: { mode: 'lambert' }, ms: 14000, notes: [{ text: 'normal n and light l', at: [5.0, 3.4], to: [0.6, 1.9], color: C.gold }] },
    { say: 'Move the light to the right. Patches facing it turn bright; patches facing away get n · l below zero, clipped to 0: the dark side.', set: { a: 0, h: 10 }, ms: 12500 },
    { say: 'Phong, 1975: add a highlight where light reflects toward your eye. A sharp spot reads as shiny plastic or metal.', set: { mode: 'phong', a: 120, h: 40 }, ms: 12000, notes: [{ text: 'specular highlight', at: [-6.6, 3.8], to: [-3.0, 1.4], color: C.white }] },
    { say: 'Drag the sun, or try a low light from below. One dot product per pixel turns a circle into a ball.', set: { a: -60, h: 20 }, ms: 9000 },
  ],
  readout: (t) => {
    const n = [SAMPLE[0], SAMPLE[1], Math.sqrt(1 - SAMPLE[0] ** 2 - SAMPLE[1] ** 2)];
    const l = lightDir(t.a, t.h);
    const dot = n[0] * l[0] + n[1] * l[1] + n[2] * l[2];
    return [
      ['Marked patch: n · l', dot.toFixed(2)],
      ['Brightness', t.mode === 'flat' ? '100% everywhere' : `${R(100 * Math.max(0, dot))}%`],
    ];
  },
  setup(kit) {
    const patches = [];
    const N = Math.ceil(BALL.r / LS);
    for (let j = -N; j < N; j++) {
      for (let i = -N; i < N; i++) {
        const x = (i + 0.5) * LS;
        const y = (j + 0.5) * LS;
        const rr = (x * x + y * y) / (BALL.r * BALL.r);
        if (rr > 1) continue;
        const n = [x / BALL.r, y / BALL.r, Math.sqrt(1 - rr)];
        patches.push({ n, r: kit.rect(BALL.cx + x - LS / 2, BALL.cy + y - LS / 2, LS * 1.02, LS * 1.02, { color: C.gold, opacity: 1, stroke: false }) });
      }
    }
    kit.line(circlePts(BALL.cx, BALL.cy, BALL.r), { color: C.grid, width: 1.5 });
    const sp = [BALL.cx + SAMPLE[0] * BALL.r, BALL.cy + SAMPLE[1] * BALL.r];
    const nArrow = kit.arrow(sp, [sp[0] + SAMPLE[0] * 1.6, sp[1] + SAMPLE[1] * 1.6], { color: C.white });
    const lArrow = kit.arrow(sp, sp, { color: C.gold });
    kit.label('n', [sp[0] + SAMPLE[0] * 1.6 + 0.25, sp[1] + SAMPLE[1] * 1.6 + 0.2], { tex: false, size: 16, color: C.white });
    const lLab = kit.label('l', [0, 0], { tex: false, size: 16, color: C.gold });
    const sun = kit.dot([0, 0], { r: 0.3, color: C.yellow });
    const h = kit.handle([0, 0], {
      color: C.yellow,
      onDrag: ([x, y]) => ({ a: R((Math.atan2(y - BALL.cy, x - BALL.cx) * 180) / Math.PI / 5) * 5 }),
    });
    const base = [255, 196, 64];
    return (t) => {
      const l = lightDir(t.a, t.h);
      patches.forEach(({ n, r }) => {
        const { d, s } = shade(n, l, t.mode);
        const I = t.mode === 'flat' ? 0.8 : 0.06 + 0.94 * d;
        r.color(rgb(base[0] * I + 255 * s, base[1] * I + 255 * s, base[2] * I + 255 * s));
      });
      const A = (t.a * Math.PI) / 180;
      const sx = BALL.cx + 4.3 * Math.cos(A);
      const sy = BALL.cy + clamp(4.3 * Math.sin(A), -4.1, 4.1);
      sun.set([sx, sy]);
      h.set([sx, sy]);
      const on = t.mode !== 'flat';
      nArrow.visible(on);
      lArrow.visible(on);
      lLab.visible(on);
      const lEnd = [sp[0] + l[0] * 1.6, sp[1] + l[1] * 1.6];
      lArrow.set(sp, Math.hypot(l[0], l[1]) < 0.05 ? [sp[0] + 0.01, sp[1]] : lEnd);
      lLab.pos([lEnd[0] + 0.25, lEnd[1] + 0.2]);
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-007: ray tracing in a side view, with shadow rays
// ---------------------------------------------------------------------------
const EYE = [-7.5, 1.0];
const SCR_X = -4.5;
const NPIX = 12;
const PIX_Y = (i) => 1.3 - i * 0.27;
const BALL2 = { c: [1.2, -1.85], r: 1.15 };
const FLOOR = -3.0;
export function hitCircle(o, d, c, r) {
  const ox = o[0] - c[0];
  const oy = o[1] - c[1];
  const b = ox * d[0] + oy * d[1];
  const cc = ox * ox + oy * oy - r * r;
  const disc = b * b - cc;
  if (disc < 0) return null;
  const t = -b - Math.sqrt(disc);
  return t > 1e-6 ? t : null;
}
export function trace(i, lx) {
  const L = [lx, 3.6];
  const p = [SCR_X, PIX_Y(i)];
  let d = [p[0] - EYE[0], p[1] - EYE[1]];
  const m = Math.hypot(...d);
  d = [d[0] / m, d[1] / m];
  const tb = hitCircle(EYE, d, BALL2.c, BALL2.r);
  const tf = d[1] < 0 ? (FLOOR - EYE[1]) / d[1] : null;
  const far = Math.min(...[tb, tf, 30].filter((v) => v != null));
  const hp = [EYE[0] + far * d[0], EYE[1] + far * d[1]];
  if (tb != null && far === tb) {
    const n = [(hp[0] - BALL2.c[0]) / BALL2.r, (hp[1] - BALL2.c[1]) / BALL2.r];
    const lv = [L[0] - hp[0], L[1] - hp[1]];
    const lm = Math.hypot(...lv);
    return { kind: 'ball', hp, L, lit: Math.max(0, (n[0] * lv[0] + n[1] * lv[1]) / lm) };
  }
  if (tf != null && far === tf && hp[0] < 8) {
    const lv = [L[0] - hp[0], L[1] - hp[1]];
    const lm = Math.hypot(...lv);
    const ts = hitCircle(hp, [lv[0] / lm, lv[1] / lm], BALL2.c, BALL2.r);
    return { kind: 'floor', hp, L, shadow: ts != null && ts < lm };
  }
  return { kind: 'sky', hp };
}
const rayColour = (r) => {
  if (r.kind === 'ball') return rgb(60 + 195 * r.lit, 40 + 150 * r.lit, 20 + 40 * r.lit);
  if (r.kind === 'floor') return r.shadow ? 0x2a2f3a : 0x8aa0b8;
  return 0x0c1830;
};
export const ray_trace = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Move the light so that no pixel of the floor is in shadow.',
  goal: (t) => R(t.n) >= NPIX && t.shadows === 'on' && Array.from({ length: NPIX }, (_, i) => trace(i, t.lx)).every((r) => r.kind !== 'floor' || !r.shadow),
  params: [
    { key: 'n', label: 'Rays traced', min: 0, max: NPIX, step: 1, value: 0 },
    { key: 'lx', label: 'Light position', min: -4, max: 7, step: 0.5, value: 0 },
    { key: 'shadows', label: 'Shadow rays', type: 'choice', value: 'off', options: [{ value: 'off', label: 'Off' }, { value: 'on', label: 'On' }] },
  ],
  beats: [
    { say: 'A side view. The eye is on the left, the screen is a column of 12 pixels, and the scene has a ball, a floor and a light.', set: { n: 0, lx: 0, shadows: 'off' }, ms: 11000, notes: [{ text: 'the screen', at: [-3.0, 3.0], to: [-4.5, 1.5], color: C.gold }] },
    { say: 'Appel’s idea, 1968: work backwards. For each pixel, send a ray from the eye through it and find the first thing it hits. The top rays miss everything: sky.', set: { n: 4 }, ms: 12000 },
    { say: 'All 12 pixels. A ray that hits the ball takes its colour from how directly that spot faces the light, Lambert’s law again; floor hits are grey.', set: { n: NPIX }, ms: 12000 },
    { say: 'Now shadows. Move the light to the right, and from each floor hit send a second ray toward it. Where the ball is in the way, that spot is in shadow and its pixel goes dark.', set: { shadows: 'on', lx: 6 }, ms: 14000, notes: [{ text: 'blocked: shadow', at: [-4.0, -4.0], to: [-1.0, -3.1], color: C.red }] },
    { say: 'Move the light to the left and the shadow falls behind the ball, out of sight: computed, not painted. Whitted added mirror and glass rays the same way in 1980.', set: { lx: -2 }, ms: 12000 },
  ],
  readout: (t) => {
    const rs = Array.from({ length: R(t.n) }, (_, i) => trace(i, t.lx));
    const c = (k) => rs.filter((r) => r.kind === k).length;
    return [
      ['Rays', `${rs.length}: ${c('ball')} ball, ${c('floor')} floor, ${c('sky')} sky`],
      ['Floor in shadow', t.shadows === 'on' ? `${rs.filter((r) => r.kind === 'floor' && r.shadow).length} pixels` : '(shadow rays off)'],
    ];
  },
  setup(kit) {
    kit.line([[-8, FLOOR], [8, FLOOR]], { color: C.grey, width: 2 });
    kit.fill(circlePts(...BALL2.c, BALL2.r), { color: C.gold, opacity: 0.25 });
    kit.line(circlePts(...BALL2.c, BALL2.r), { color: C.gold, width: 2 });
    kit.dot(EYE, { r: 0.16, color: C.white });
    kit.label('eye', [EYE[0], EYE[1] + 0.45], { tex: false, size: 13, color: C.grey });
    const pix = Array.from({ length: NPIX }, (_, i) => kit.rect(SCR_X - 0.2, PIX_Y(i) - 0.135, 0.4, 0.27, { color: 0x05070b, opacity: 1, strokeColor: C.grid, width: 1 }));
    const rays = Array.from({ length: NPIX }, () => kit.line([[0, 0], [1, 1]], { color: C.white, width: 1.5, opacity: 0.7 }));
    const hits = Array.from({ length: NPIX }, () => kit.dot([0, 0], { r: 0.07, color: C.white }));
    const shadowRays = Array.from({ length: NPIX }, () => kit.line([[0, 0], [1, 1]], { color: C.gold, width: 1.5, opacity: 0.8, dashed: true }));
    const sun = kit.dot([0, 0], { r: 0.28, color: C.yellow, z: 6 });
    const h = kit.handle([0, 0], { color: C.yellow, onDrag: ([x]) => ({ lx: clamp(R(x * 2) / 2, -4, 7) }) });
    return (t) => {
      const n = R(t.n);
      const L = [t.lx, 3.6];
      sun.set(L);
      h.set(L);
      for (let i = 0; i < NPIX; i++) {
        const r = trace(i, t.lx);
        const on = i < n;
        rays[i].visible(on);
        hits[i].visible(on && r.kind !== 'sky');
        pix[i].color(on ? rayColour(t.shadows === 'on' ? r : { ...r, shadow: false }) : 0x05070b);
        if (on) {
          rays[i].set([EYE, r.hp]);
          hits[i].set(r.hp);
        }
        const sOn = on && t.shadows === 'on' && r.kind === 'floor';
        shadowRays[i].visible(sOn);
        if (sOn) shadowRays[i].set([r.hp, L]).color(r.shadow ? C.red : C.gold);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// gfx-008: de Casteljau's construction of a cubic Bezier curve
// ---------------------------------------------------------------------------
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
export function casteljau(P, t) {
  const levels = [P];
  while (levels[levels.length - 1].length > 1) {
    const L = levels[levels.length - 1];
    levels.push(L.slice(1).map((q, i) => lerp(L[i], q, t)));
  }
  return levels;
}
const bezPts = (t) => [[-6, -2.8], [t.p1x, t.p1y], [t.p2x, t.p2y], [6, -2.8]];
export const bezier_casteljau = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Drag the two middle handles to make an S-shaped curve, then trace it all the way.',
  goal: (t) => (t.p1y - -2.8) * (t.p2y - -2.8) < 0 && t.t >= 0.99,
  params: [
    { key: 't', label: 't', min: 0, max: 1, step: 0.01, value: 0 },
    { key: 'p1x', hidden: true, value: -3.5 },
    { key: 'p1y', hidden: true, value: 3 },
    { key: 'p2x', hidden: true, value: 3.5 },
    { key: 'p2y', hidden: true, value: 3 },
  ],
  beats: [
    { say: 'Four control points. The curve starts at P₀ and ends at P₃; the middle two are handles that pull it, like de Casteljau’s car-body curves at Citroën in 1959.', set: { t: 0, p1x: -3.5, p1y: 3, p2x: 3.5, p2y: 3 }, ms: 12500 },
    { say: 'Pick t = 0.3. On each of the three grey sides, mark the point 30% of the way along: linear interpolation, lerp.', set: { t: 0.3 }, ms: 11500, notes: [{ text: '30% along each side', at: [-6.4, 2.4], to: [-5.2, 0.1], color: C.green }] },
    { say: 'Join those three points and do it again: two points. Once more: one point. That last point is on the curve.', set: { t: 0.3 }, ms: 11000, notes: [{ text: 'this point is on the curve', at: [-1.6, -1.2], to: [-2.4, 0.9], color: C.gold }] },
    { say: 'Sweep t from 0 to 1, and the point traces the whole curve. Only lerps: easy to compute, and numerically very stable.', set: { t: 1 }, ms: 11500 },
    { say: 'Pull one handle down and the curve becomes an S. Every letter on this page is outlined by curves like this: cubic in PostScript and OpenType fonts, quadratic in TrueType.', set: { p2y: -4.0, t: 1 }, ms: 13000 },
  ],
  readout: (t) => {
    const L = casteljau(bezPts(t), t.t);
    const p = L[3][0];
    return [
      ['t', t.t.toFixed(2)],
      ['B(t)', `(${p[0].toFixed(2)}, ${p[1].toFixed(2)})`],
    ];
  },
  setup(kit) {
    const hull = kit.line([[0, 0], [1, 1]], { color: C.grey, width: 2 });
    const lv1 = kit.line([[0, 0], [1, 1]], { color: C.green, width: 2 });
    const lv2 = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 2 });
    const d1 = [0, 1, 2].map(() => kit.dot([0, 0], { r: 0.1, color: C.green }));
    const d2 = [0, 1].map(() => kit.dot([0, 0], { r: 0.1, color: C.blue }));
    const ghost = kit.line([[0, 0], [1, 1]], { color: C.grey, width: 1.5, dashed: true, opacity: 0.45 });
    const curve = kit.line([[0, 0], [1, 1]], { color: C.gold, width: 4, z: 5 });
    const tip = kit.dot([0, 0], { r: 0.16, color: C.gold, z: 7 });
    const cps = [0, 1, 2, 3].map(() => kit.dot([0, 0], { r: 0.13, color: C.white }));
    const names = [0, 1, 2, 3].map((i) => kit.label(`P${'₀₁₂₃'[i]}`, [0, 0], { tex: false, size: 16, color: C.grey }));
    const h1 = kit.handle([0, 0], { color: C.white, onDrag: ([x, y]) => ({ p1x: clamp(x, -7.5, 7.5), p1y: clamp(y, -4.2, 4.2) }) });
    const h2 = kit.handle([0, 0], { color: C.white, onDrag: ([x, y]) => ({ p2x: clamp(x, -7.5, 7.5), p2y: clamp(y, -4.2, 4.2) }) });
    return (t) => {
      const P = bezPts(t);
      const L = casteljau(P, t.t);
      hull.set(P);
      lv1.set(L[1]);
      lv2.set(L[2]);
      L[1].forEach((q, i) => d1[i].set(q));
      L[2].forEach((q, i) => d2[i].set(q));
      const show = t.t > 0.001 && t.t < 0.999;
      [lv1, lv2, ...d1, ...d2].forEach((o) => o.visible(show));
      const full = Array.from({ length: 61 }, (_, i) => casteljau(P, i / 60)[3][0]);
      ghost.set(full);
      const n = Math.max(2, Math.round(t.t * 60) + 1);
      curve.set(full.slice(0, n));
      curve.visible(t.t > 0.005);
      tip.set(L[3][0]);
      P.forEach((q, i) => {
        cps[i].set(q);
        names[i].pos([q[0] + (i === 0 ? -0.5 : i === 3 ? 0.5 : 0), q[1] + (i === 0 || i === 3 ? -0.45 : 0.45)]);
      });
      h1.set(P[1]);
      h2.set(P[2]);
    };
  },
};
