import { C } from '../theme';
import { clamp, range } from '../kit';

const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');

// ---------------------------------------------------------------------------
// Redox: a two-metal cell
// ---------------------------------------------------------------------------
const METALS = {
  Mg: { E: -2.37, color: 0xc9d1d9, ion: 'Mg^{2+}' },
  Zn: { E: -0.76, color: 0x9fb3c8, ion: 'Zn^{2+}' },
  Fe: { E: -0.44, color: 0x8a8f98, ion: 'Fe^{2+}' },
  Cu: { E: 0.34, color: 0xd9895b, ion: 'Cu^{2+}' },
  Ag: { E: 0.8, color: 0xe6e6e6, ion: 'Ag^{+}' },
};
const PAIRS = { 'Zn-Cu': ['Zn', 'Cu'], 'Mg-Cu': ['Mg', 'Cu'], 'Zn-Fe': ['Zn', 'Fe'], 'Fe-Cu': ['Fe', 'Cu'], 'Cu-Ag': ['Cu', 'Ag'] };
const cell = (pair) => {
  const [a, b] = PAIRS[pair];
  const [an, ca] = METALS[a].E < METALS[b].E ? [a, b] : [b, a];
  return { an, ca, V: METALS[ca].E - METALS[an].E };
};

export const galvanic_cell = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the pair that gives the biggest voltage.',
  goal: (t) => t.pair === 'Mg-Cu',
  params: [
    { key: 'pair', label: 'Metals', type: 'choice', value: 'Zn-Cu', options: Object.keys(PAIRS).map((k) => ({ value: k, label: k.replace('-', ' and ') })) },
  ],
  beats: [
    { say: 'Daniell’s cell: zinc on the left, copper on the right. Zinc gives up electrons more easily, so they flow through the wire to the copper: 1.10 V.', set: { pair: 'Zn-Cu' } },
    { say: 'Zinc and iron: zinc is still the anode. This is the cell on every scratched galvanised roof, with the zinc sacrificing itself.', set: { pair: 'Zn-Fe' } },
    { say: 'Magnesium is far more eager than zinc: 2.71 V. Magnesium blocks are bolted to ship hulls to be eaten instead of the steel.', set: { pair: 'Mg-Cu' } },
  ],
  readout: (t) => {
    const c = cell(t.pair);
    return [
      ['Anode (oxidised, wears away)', `${c.an} (E° = ${r2(METALS[c.an].E)} V)`],
      ['Cathode (reduced, gets plated)', `${c.ca} (E° = ${r2(METALS[c.ca].E)} V)`],
      ['Cell voltage', `${r2(c.V)} V`],
    ];
  },
  setup(kit) {
    const beaker = (x) => {
      kit.line([[x - 1.8, 0.4], [x - 1.8, -3.6], [x + 1.8, -3.6], [x + 1.8, 0.4]], { color: C.axis, width: 2.5 });
      return kit.rect(x - 1.78, -3.58, 3.56, 3.2, { color: C.blue, opacity: 0.15, stroke: false });
    };
    const solL = beaker(-4);
    const solR = beaker(4);
    void solL;
    void solR;
    // salt bridge
    kit.line([[-3, -0.6], [-3, 1.0], [3, 1.0], [3, -0.6]], { color: C.white, width: 10, opacity: 0.18 });
    kit.label('\\text{salt bridge}', [0, 1.4], { size: 13, color: '#8b949e' });
    const elL = kit.rect(0, 0, 0, 0, { color: C.grey, opacity: 0.9, strokeColor: C.white, width: 1 });
    const elR = kit.rect(0, 0, 0, 0, { color: C.grey, opacity: 0.9, strokeColor: C.white, width: 1 });
    kit.line([[-4, 1.5], [-4, 3.2], [-1, 3.2]], { color: C.axis, width: 2 });
    kit.line([[1, 3.2], [4, 3.2], [4, 1.5]], { color: C.axis, width: 2 });
    kit.rect(-1, 2.6, 2, 1.2, { color: C.bg, opacity: 1, strokeColor: C.axis, width: 2 });
    const volts = kit.label('', [0, 3.2], { size: 20, color: C.green });
    const e = Array.from({ length: 10 }, () => kit.dot([0, 0], { r: 0.1, color: C.yellow }));
    const ions = Array.from({ length: 8 }, () => kit.dot([0, 0], { r: 0.09, color: C.teal }));
    const nameL = kit.label('', [-4, -4.05], { size: 16 });
    const nameR = kit.label('', [4, -4.05], { size: 16 });
    const roleL = kit.label('', [-6.6, 2.0], { size: 15, color: C.red });
    const roleR = kit.label('', [6.6, 2.0], { size: 15, color: C.green });
    const path = [[-4, 1.5], [-4, 3.2], [4, 3.2], [4, 1.5]];
    const along = (s) => {
      const L = [1.7, 8, 1.7];
      let d = s * 11.4;
      for (let i = 0; i < 3; i++) {
        if (d <= L[i]) {
          const a = path[i];
          const b = path[i + 1];
          return [a[0] + ((b[0] - a[0]) * d) / L[i], a[1] + ((b[1] - a[1]) * d) / L[i]];
        }
        d -= L[i];
      }
      return path[3];
    };
    let last = '';
    let wear = 0;
    return (_p, t, time, dt) => {
      const c = cell(t.pair);
      const [a, b] = PAIRS[t.pair];
      const leftIsAnode = a === c.an;
      if (t.pair !== last) {
        last = t.pair;
        wear = 0;
      }
      wear = Math.min(1, wear + dt * 0.05);
      const wa = 0.9 * (1 - 0.45 * wear);
      const wc = 0.9 * (1 + 0.3 * wear);
      const [wl, wr] = leftIsAnode ? [wa, wc] : [wc, wa];
      elL.set(-4 - wl / 2, -3.0, wl, 4.5).color(METALS[a].color);
      elR.set(4 - wr / 2, -3.0, wr, 4.5).color(METALS[b].color);
      nameL.set(`\\mathrm{${a}} \\;|\\; \\mathrm{${METALS[a].ion}}`);
      nameR.set(`\\mathrm{${b}} \\;|\\; \\mathrm{${METALS[b].ion}}`);
      roleL.set(leftIsAnode ? '\\text{anode: } e^- \\text{ out}' : '\\text{cathode: } e^- \\text{ in}').color(leftIsAnode ? C.red : C.green);
      roleR.set(leftIsAnode ? '\\text{cathode: } e^- \\text{ in}' : '\\text{anode: } e^- \\text{ out}').color(leftIsAnode ? C.green : C.red);
      volts.set(`${c.V.toFixed(2)}\\,\\text{V}`);
      const sp = 0.12 + 0.05 * c.V;
      e.forEach((d, i) => {
        let s = (time * sp + i / e.length) % 1;
        if (!leftIsAnode) s = 1 - s;
        const q = along(s);
        d.set(q).visible(!(Math.abs(q[0]) < 1.1 && q[1] > 2.5));
      });
      // metal ions leave the anode surface
      const ax = leftIsAnode ? -4 : 4;
      ions.forEach((d, i) => {
        const s = (time * 0.25 + i / ions.length) % 1;
        const side = i % 2 ? 1 : -1;
        d.set([ax + side * (0.5 + s * 1.1), -2.6 + (i % 4) * 0.55]).opacity(1 - s);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Titration: 25.0 mL of 0.100 M acid with 0.100 M NaOH
// ---------------------------------------------------------------------------
const VA = 25;
const MA = 0.1;
const MB = 0.1;
const KA = 1.8e-5;
function titrationPH(vb, weak) {
  const na = (MA * VA) / 1000;
  const nb = (MB * vb) / 1000;
  const V = (VA + vb) / 1000;
  if (!weak) {
    if (Math.abs(na - nb) < 1e-9) return 7;
    if (nb < na) return -Math.log10((na - nb) / V);
    return 14 + Math.log10((nb - na) / V);
  }
  if (vb === 0) return -Math.log10(Math.sqrt(KA * MA));
  if (nb < na - 1e-9) return -Math.log10(KA) + Math.log10(nb / (na - nb));
  if (Math.abs(na - nb) < 1e-9) return 14 + Math.log10(Math.sqrt((1e-14 / KA) * (na / V)));
  return 14 + Math.log10((nb - na) / V);
}
const pink = (pH) => clamp((pH - 8.2) / 1.8, 0, 1);

export const titration_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Stop right at the equivalence point of the weak acid, where the first lasting pink appears.',
  goal: (t) => t.acid === 'weak' && t.v === 25,
  params: [
    { key: 'v', label: 'NaOH added (mL)', min: 0, max: 50, step: 0.5, value: 0 },
    { key: 'acid', label: 'Acid in the flask', type: 'choice', value: 'strong', options: [{ value: 'strong', label: 'hydrochloric (strong)' }, { value: 'weak', label: 'acetic (weak, vinegar)' }] },
  ],
  beats: [
    { say: '25.0 mL of 0.100 M hydrochloric acid, with a few drops of phenolphthalein. Add the base slowly: the pH hardly moves at first.', set: { v: 20, acid: 'strong' } },
    { say: 'At 25.0 mL the moles match. One more drop and the pH leaps from about 4 to 10, and the flask turns pink.', set: { v: 25.5, acid: 'strong' } },
    { say: 'Acetic acid starts higher, rises gently, and its equivalence point sits at pH 8.7, right where phenolphthalein turns.', set: { v: 25, acid: 'weak' } },
  ],
  readout: (t) => {
    const pH = titrationPH(t.v, t.acid === 'weak');
    return [
      ['Base added', `${r1(t.v)} mL`],
      ['pH', r2(pH)],
      ['Moles acid at start', '0.00250 mol'],
      ['Moles base added', `${((MB * t.v) / 1000).toFixed(5)} mol`],
      ['Flask', pink(pH) > 0.1 ? 'pink: past the end point' : 'colourless'],
    ];
  },
  setup(kit) {
    // burette
    const bx = -5.6;
    kit.rect(bx - 0.18, -0.2, 0.36, 4.4, { color: C.white, opacity: 0.05, strokeColor: C.axis, width: 1.5 });
    for (let i = 0; i <= 10; i++) kit.line([[bx - 0.18, 4.2 - i * 0.44], [bx, 4.2 - i * 0.44]], { color: C.axis, width: 1 });
    const liquid = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.35, stroke: false });
    kit.line([[bx, -0.2], [bx, -0.7]], { color: C.axis, width: 3 });
    const drop = kit.dot([bx, -0.8], { r: 0.07, color: C.blue });
    // flask
    kit.line([[bx - 0.35, -1.2], [bx - 0.35, -2.0], [bx - 1.6, -4.0], [bx + 1.6, -4.0], [bx + 0.35, -2.0], [bx + 0.35, -1.2]], { color: C.axis, width: 2.5 });
    const fluid = kit.fill([[bx - 0.8, -3.1], [bx + 0.8, -3.1], [bx + 1.55, -3.97], [bx - 1.55, -3.97]], { color: C.white, opacity: 0.15 });
    const P = kit.plane({ x: [0, 50, 5], y: [0, 14, 2], sx: 0.21, sy: 0.5, origin: [-2.6, -3.6], xLabel: 'V_{\\text{NaOH}}\\,(\\text{mL})', yLabel: '\\text{pH}', xEvery: 10, yEvery: 2 });
    const ghost = kit.line([], { color: C.grey, width: 2, opacity: 0.35, create: false });
    const done = kit.line([], { color: C.pink, width: 3.5, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    kit.line([P.toW(25, 0), P.toW(25, 14)], { color: C.green, width: 1.5, dashed: true, opacity: 0.6 });
    kit.label('\\text{equivalence}', P.toW(25, 14.4), { size: 13, color: C.green });
    let last = '';
    return (p, t, time) => {
      const weak = t.acid === 'weak';
      if (t.acid !== last) {
        last = t.acid;
        ghost.set(range(0, 50, 401).map((v) => P.toW(v, titrationPH(v, weak))));
      }
      const v = p.v;
      done.set(range(0, v, Math.max(2, Math.round(v * 8))).map((x) => P.toW(x, titrationPH(x, weak))));
      const pH = titrationPH(Math.round(v * 2) / 2, weak);
      dot.set(P.toW(v, titrationPH(v, weak)));
      const h = 4.4 * (1 - v / 50);
      liquid.set(bx - 0.16, -0.2 + 4.4 - h, 0.32, Math.max(0.001, h));
      drop.set([bx, -0.8 - ((time * 2) % 1) * 1.8]).visible(Math.abs(t.v - v) > 0.05);
      const k = pink(pH);
      fluid.color(k > 0 ? C.pink : C.white).opacity(0.15 + 0.55 * k);
    };
  },
};

// ---------------------------------------------------------------------------
// Orbitals: probability clouds sampled from hydrogen-like wave functions
// ---------------------------------------------------------------------------
const ORB = {
  '1s': { R: 5, psi: (x, y, z, r) => Math.exp(-r) },
  '2s': { R: 12, psi: (x, y, z, r) => (2 - r) * Math.exp(-r / 2) },
  '2p': { R: 14, psi: (x, y, z, r) => z * Math.exp(-r / 2) },
  '3dz2': { R: 24, psi: (x, y, z, r) => (3 * z * z - r * r) * Math.exp(-r / 3) },
  '3dxy': { R: 24, psi: (x, y, z, r) => x * y * Math.exp(-r / 3) },
};
const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p'];
const CAP = { s: 2, p: 6, d: 10 };
const SYMS = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function config(Z) {
  // Chromium and copper borrow a 4s electron to fill/half-fill 3d.
  const out = [];
  let left = Z;
  for (const o of ORDER) {
    if (left <= 0) break;
    const k = Math.min(CAP[o[1]], left);
    out.push([o, k]);
    left -= k;
  }
  if (Z === 24 || Z === 29) {
    const s = out.find((q) => q[0] === '4s');
    const d = out.find((q) => q[0] === '3d');
    s[1] -= 1;
    d[1] += 1;
  }
  return out;
}
const sup = (n) => `${n}`.split('').map((c) => SUP[c]).join('');

export const orbital_clouds = {
  camera: { kind: '3d', position: [7, 5, 9] },
  mission: 'Pick iron (26) and count its unpaired 3d electrons using Hund’s rule.',
  goal: (t) => t.Z === 26,
  params: [
    { key: 'orb', label: 'Orbital', type: 'choice', value: '1s', options: [
      { value: '1s', label: '1s' }, { value: '2s', label: '2s' }, { value: '2p', label: '2p' }, { value: '3dz2', label: '3d (z²)' }, { value: '3dxy', label: '3d (xy)' },
    ] },
    { key: 'Z', label: 'Element (number of electrons)', min: 1, max: 30, step: 1, value: 6 },
  ],
  beats: [
    { say: 'The 1s orbital: a fuzzy ball, densest at the centre. Each dot is one place the electron might be found if you looked.', set: { orb: '1s', Z: 1 } },
    { say: '2s is bigger, with an empty shell inside it (a node) where the electron is never found.', set: { orb: '2s', Z: 4 } },
    { say: 'A 2p orbital has two lobes, blue and red for the wave’s two signs, with an empty plane between. Carbon has two electrons in 2p.', set: { orb: '2p', Z: 6 } },
    { say: 'A 3d orbital, with four lobes. Iron has six electrons spread over five 3d orbitals: four of them unpaired, which makes iron magnetic.', set: { orb: '3dxy', Z: 26 } },
  ],
  readout: (t) => {
    const c = config(t.Z);
    const d = c.find((q) => q[0] === '3d')?.[1] ?? 0;
    const p = c.filter((q) => q[0].endsWith('p')).at(-1)?.[1] ?? 0;
    const unpaired = (n, slots) => (n <= slots ? n : 2 * slots - n);
    const last = c.at(-1)[0];
    const un = last === '3d' || (d > 0 && d < 10) ? unpaired(d, 5) : last.endsWith('p') ? unpaired(p, 3) : c.at(-1)[1] % 2;
    return [
      ['Element', `${SYMS[t.Z]} (${t.Z} electrons)`],
      ['Configuration', c.map(([o, k]) => `${o}${sup(k)}`).join(' ')],
      ['Unpaired electrons in the outer subshell', `${un}`],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const g = kit.group();
    const N = 4000;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false });
    g.add(new THREE.Points(geo, mat));
    kit.sphere([0, 0, 0], 0.12, C.red, { glow: 0.8, parent: g });
    const axes = [[3.4, 0, 0], [0, 3.4, 0], [0, 0, 3.4]];
    axes.forEach((a) => kit.cylinder(a.map((v) => -v), a, 0.008, C.grey, { parent: g, opacity: 0.5 }));
    kit.label('x', [3.7, 0, 0], { size: 14, color: '#8b949e', parent: g });
    kit.label('z', [0, 3.7, 0], { size: 14, color: '#8b949e', parent: g });
    const blue = new THREE.Color(C.blue);
    const red = new THREE.Color(C.red);
    function build(name) {
      const o = ORB[name];
      // estimate the peak of psi² for rejection sampling
      let mx = 0;
      for (let i = 0; i < 6000; i++) {
        const x = (Math.random() * 2 - 1) * o.R;
        const y = (Math.random() * 2 - 1) * o.R;
        const z = (Math.random() * 2 - 1) * o.R;
        const v = o.psi(x, y, z, Math.hypot(x, y, z)) ** 2;
        if (v > mx) mx = v;
      }
      let n = 0;
      let guard = 0;
      while (n < N && guard++ < 3e6) {
        const x = (Math.random() * 2 - 1) * o.R;
        const y = (Math.random() * 2 - 1) * o.R;
        const z = (Math.random() * 2 - 1) * o.R;
        // 2s: show a thin slice through the middle so the hidden node shows as a dark ring
        if (name === '2s' && Math.abs(y) > 0.8) continue;
        const s = o.psi(x, y, z, Math.hypot(x, y, z));
        if (Math.random() * mx * 1.05 > s * s) continue;
        const k = 3.2 / o.R;
        // world y is "up": map the orbital's z axis to world y
        pos.set([x * k, z * k, y * k], n * 3);
        const c = s >= 0 ? blue : red;
        col.set([c.r, c.g, c.b], n * 3);
        n++;
      }
      geo.setDrawRange(0, n);
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      geo.computeBoundingSphere();
    }
    let built = '';
    return (_p, t, time) => {
      if (t.orb !== built) {
        built = t.orb;
        build(t.orb);
      }
      // the 2s slice stays facing the camera
      g.rotation.y = t.orb === '2s' ? 0 : time * 0.15;
    };
  },
};

// ---------------------------------------------------------------------------
// Molecules in 3D (shared by the organic chemistry scenes)
// ---------------------------------------------------------------------------
const V = {
  add: (a, b) => a.map((v, i) => v + b[i]),
  sub: (a, b) => a.map((v, i) => v - b[i]),
  mul: (a, s) => a.map((v) => v * s),
  len: (a) => Math.hypot(...a),
  norm: (a) => V.mul(a, 1 / (V.len(a) || 1)),
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
};
const rotZ = (a, deg) => {
  const q = (deg * Math.PI) / 180;
  return [a[0] * Math.cos(q) - a[1] * Math.sin(q), a[0] * Math.sin(q) + a[1] * Math.cos(q), a[2]];
};
const ELEM = { C: { c: 0x8a8f98, r: 0.36 }, H: { c: 0xf0f0f0, r: 0.24 }, O: { c: C.red, r: 0.34 }, N: { c: 0x5b7cfa, r: 0.34 } };

// atoms: [element, [x, y, z], hydrogens to add, geometry 'tet' | 'tri' | 'lin' | 'bent' | 'pyr']
// bonds: [i, j, order]
function fillH(atoms, bonds) {
  const all = atoms.map(([e, p]) => ({ e, p }));
  const bl = bonds.slice();
  atoms.forEach(([e, p, nH, geo], i) => {
    if (!nH) return;
    const nb = bonds.filter((b) => b[0] === i || b[1] === i).map((b) => V.norm(V.sub(atoms[b[0] === i ? b[1] : b[0]][1], p)));
    const len = e === 'C' ? 1.09 : 0.98;
    let dirs = [];
    if (nb.length === 0) dirs = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(V.norm);
    else if (geo === 'tet' || geo === 'pyr') {
      if (nb.length === 1) {
        const a = nb[0];
        const ref = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
        const u = V.norm(V.cross(a, ref));
        const w = V.cross(a, u);
        dirs = [0, 120, 240].map((d) => {
          const q = ((d + 90) * Math.PI) / 180;
          return V.norm(V.add(V.mul(a, -1 / 3), V.mul(V.add(V.mul(u, Math.cos(q)), V.mul(w, Math.sin(q))), 0.943)));
        });
      } else if (nb.length === 2) {
        const bis = V.norm(V.mul(V.add(nb[0], nb[1]), -1));
        const n = V.norm(V.cross(nb[0], nb[1]));
        dirs = [1, -1].map((s) => V.norm(V.add(V.mul(bis, 0.577), V.mul(n, s * 0.816))));
      } else dirs = [V.norm(V.mul(nb.reduce(V.add), -1))];
    } else if (geo === 'tri') {
      if (nb.length === 1) dirs = [rotZ(nb[0], 120), rotZ(nb[0], -120)];
      else dirs = [V.norm(V.mul(V.add(nb[0], nb[1]), -1))];
    } else if (geo === 'lin') dirs = [V.mul(nb[0], -1)];
    else if (geo === 'bent') dirs = [rotZ(nb[0], 105)];
    dirs.slice(0, nH).forEach((d) => {
      all.push({ e: 'H', p: V.add(p, V.mul(d, len)) });
      bl.push([i, all.length - 1, 1]);
    });
  });
  return { atoms: all, bonds: bl };
}

// a zigzag of n points in the xy plane, centred
const zig = (n, step = 1.26, h = 0.44) => range(0, n - 1, n).map((i) => [(i - (n - 1) / 2) * step, i % 2 ? h : -h, 0]);

const MOLS = {
  methane: { name: 'methane CH₄', atoms: [['C', [0, 0, 0], 4, 'tet']], bonds: [] },
  ethane: { name: 'ethane C₂H₆', atoms: zig(2).map((p) => ['C', p, 3, 'tet']), bonds: [[0, 1, 1]] },
  propane: { name: 'propane C₃H₈', atoms: zig(3).map((p, i) => ['C', p, i === 1 ? 2 : 3, 'tet']), bonds: [[0, 1, 1], [1, 2, 1]] },
  butane: { name: 'butane C₄H₁₀', atoms: zig(4).map((p, i) => ['C', p, i === 0 || i === 3 ? 3 : 2, 'tet']), bonds: [[0, 1, 1], [1, 2, 1], [2, 3, 1]] },
  ethene: { name: 'ethene C₂H₄', atoms: [['C', [-0.67, 0, 0], 2, 'tri'], ['C', [0.67, 0, 0], 2, 'tri']], bonds: [[0, 1, 2]] },
  ethyne: { name: 'ethyne (acetylene) C₂H₂', atoms: [['C', [-0.6, 0, 0], 1, 'lin'], ['C', [0.6, 0, 0], 1, 'lin']], bonds: [[0, 1, 3]] },
  benzene: {
    name: 'benzene C₆H₆',
    atoms: range(0, 5, 6).map((i) => ['C', [1.39 * Math.cos((i * Math.PI) / 3), 1.39 * Math.sin((i * Math.PI) / 3), 0], 1, 'tri']),
    bonds: range(0, 5, 6).map((i) => [i, (i + 1) % 6, i % 2 ? 1 : 2]),
  },
  ethanol: { name: 'ethanol (alcohol)', atoms: zig(3).map((p, i) => [i === 2 ? 'O' : 'C', p, i === 0 ? 3 : i === 1 ? 2 : 1, i === 2 ? 'bent' : 'tet']), bonds: [[0, 1, 1], [1, 2, 1]], group: [2] },
  acetic: { name: 'acetic acid (carboxylic acid)', atoms: [['C', [-1.3, -0.3, 0], 3, 'tet'], ['C', [0, 0.4, 0], 0, 'tri'], ['O', [0.05, 1.62, 0], 0], ['O', [1.15, -0.32, 0], 1, 'bent']], bonds: [[0, 1, 1], [1, 2, 2], [1, 3, 1]], group: [1, 2, 3] },
  acetone: { name: 'acetone (ketone)', atoms: [['C', [-1.28, -0.4, 0], 3, 'tet'], ['C', [0, 0.35, 0], 0, 'tri'], ['C', [1.28, -0.4, 0], 3, 'tet'], ['O', [0, 1.57, 0], 0]], bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 2]], group: [1, 3] },
  ester: {
    name: 'methyl acetate (ester)',
    atoms: [['C', [-1.9, -0.3, 0], 3, 'tet'], ['C', [-0.6, 0.4, 0], 0, 'tri'], ['O', [-0.55, 1.62, 0], 0], ['O', [0.55, -0.32, 0], 0], ['C', [1.8, 0.35, 0], 3, 'tet']],
    bonds: [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1]],
    group: [1, 2, 3],
  },
  amine: { name: 'methylamine (amine)', atoms: [['C', [-0.7, 0, 0], 3, 'tet'], ['N', [0.75, 0, 0], 2, 'pyr']], bonds: [[0, 1, 1]], group: [1] },
};

function moleculeView(kit) {
  const g = kit.group();
  const glowMat = [];
  return {
    g,
    build(key) {
      g.clear();
      glowMat.length = 0;
      const M = MOLS[key];
      const { atoms, bonds } = fillH(M.atoms, M.bonds);
      const ctr = V.mul(atoms.reduce((s, a) => V.add(s, a.p), [0, 0, 0]), 1 / atoms.length);
      const P = atoms.map((a) => V.sub(a.p, ctr));
      atoms.forEach((a, i) => {
        const hot = M.group?.includes(i) || (M.group && a.e === 'H' && bonds.some((b) => b[1] === i && M.group.includes(b[0]) && atoms[b[0]].e !== 'C'));
        const m = kit.sphere(P[i], ELEM[a.e].r, ELEM[a.e].c, { parent: g, glow: hot ? 0.45 : 0 });
        if (hot) {
          glowMat.push(m.material);
          kit.sphere(P[i], ELEM[a.e].r * 1.9, C.yellow, { parent: g, opacity: 0.12 });
        }
      });
      bonds.forEach(([i, j, order]) => {
        const d = V.norm(V.sub(P[j], P[i]));
        const off = V.norm(V.cross(d, Math.abs(d[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0]));
        const shifts = order === 1 ? [0] : order === 2 ? [-0.11, 0.11] : [-0.15, 0, 0.15];
        shifts.forEach((s) => kit.cylinder(V.add(P[i], V.mul(off, s)), V.add(P[j], V.mul(off, s)), 0.07, 0xb8c2cc, { parent: g }));
      });
      return { atoms, bonds };
    },
    pulse(time) {
      glowMat.forEach((m) => (m.emissiveIntensity = 0.3 + 0.25 * Math.sin(time * 3)));
    },
  };
}

const angleAt = (atoms, bonds, i) => {
  const nb = bonds.filter((b) => b[0] === i || b[1] === i).map((b) => (b[0] === i ? b[1] : b[0]));
  if (nb.length < 2) return '—';
  const a = V.norm(V.sub(atoms[nb[0]].p, atoms[i].p));
  const b = V.norm(V.sub(atoms[nb[1]].p, atoms[i].p));
  return `${Math.round((Math.acos(clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1)) * 180) / Math.PI)}°`;
};

export const carbon_chains = {
  camera: { kind: '3d', position: [0, 3, 10] },
  mission: 'Compare the bond angle around carbon in ethane, ethene and ethyne.',
  goal: (_t, seen) => ['ethane', 'ethene', 'ethyne'].every((m) => seen.mol?.has(m)),
  params: [
    { key: 'mol', label: 'Molecule', type: 'choice', value: 'methane', options: ['methane', 'ethane', 'propane', 'butane', 'ethene', 'ethyne', 'benzene'].map((k) => ({ value: k, label: k })) },
  ],
  beats: [
    { say: 'Methane: four hydrogens as far apart as they can get, at the corners of a tetrahedron. Every angle is 109.5°.', set: { mol: 'methane' } },
    { say: 'Butane, from LPG: a zigzag chain. Each carbon is still a tetrahedron, so the chain is never straight.', set: { mol: 'butane' } },
    { say: 'Ethene: the double bond makes each carbon flat, with 120° angles, and the bond cannot twist.', set: { mol: 'ethene' } },
    { say: 'Benzene: Kekulé’s ring of six carbons, perfectly flat, with the extra bonding shared all the way around.', set: { mol: 'benzene' } },
  ],
  readout: (t) => {
    const M = MOLS[t.mol];
    const { atoms, bonds } = fillH(M.atoms, M.bonds);
    const nC = atoms.filter((a) => a.e === 'C').length;
    const nH = atoms.filter((a) => a.e === 'H').length;
    return [
      ['Molecule', M.name],
      ['Carbon / hydrogen', `${nC} C, ${nH} H`],
      ['Angle at the first carbon', angleAt(atoms, bonds, 0)],
      ['Bond between carbons', t.mol === 'methane' ? 'none' : t.mol === 'ethene' ? 'double' : t.mol === 'ethyne' ? 'triple' : t.mol === 'benzene' ? 'shared around the ring' : 'single'],
    ];
  },
  setup(kit) {
    const view = moleculeView(kit);
    let built = '';
    return (_p, t, time) => {
      if (t.mol !== built) {
        built = t.mol;
        view.build(t.mol);
      }
      view.g.rotation.y = time * 0.3;
      view.g.rotation.x = 0.25 * Math.sin(time * 0.2);
    };
  },
};

export const functional_groups = {
  camera: { kind: '3d', position: [0, 3, 10] },
  mission: 'Find the two molecules whose groups both contain C=O and an extra oxygen.',
  goal: (_t, seen) => seen.mol?.has('acetic') && seen.mol?.has('ester'),
  params: [
    { key: 'mol', label: 'Molecule', type: 'choice', value: 'ethanol', options: [
      { value: 'ethanol', label: 'ethanol (alcohol)' }, { value: 'acetic', label: 'acetic acid' }, { value: 'acetone', label: 'acetone (ketone)' }, { value: 'ester', label: 'methyl acetate (ester)' }, { value: 'amine', label: 'methylamine (amine)' },
    ] },
  ],
  beats: [
    { say: 'Ethanol: a two-carbon chain with an –OH group (glowing). The –OH is what makes it an alcohol and lets it mix with water.', set: { mol: 'ethanol' } },
    { say: 'Acetic acid, from vinegar: the –COOH group. Its H can be handed away, which is what makes it an acid.', set: { mol: 'acetic' } },
    { say: 'An ester: acid and alcohol joined, with water given off. Chains of ester links make polyester and PET bottles.', set: { mol: 'ester' } },
  ],
  readout: (t) => {
    const info = {
      ethanol: ['alcohol', '–OH', 'drinks, fuel, solvents'],
      acetic: ['carboxylic acid', '–COOH', 'vinegar; half of polyester'],
      acetone: ['ketone', 'C=O between two carbons', 'nail-polish remover, solvent for resins'],
      ester: ['ester', '–COO–', 'fruit smells; polyester links'],
      amine: ['amine', '–NH₂', 'fishy smells; half of nylon'],
    }[t.mol];
    return [
      ['Family', info[0]],
      ['Functional group', info[1]],
      ['Where you meet it', info[2]],
    ];
  },
  setup(kit) {
    const view = moleculeView(kit);
    let built = '';
    return (_p, t, time) => {
      if (t.mol !== built) {
        built = t.mol;
        view.build(t.mol);
      }
      view.pulse(time);
      view.g.rotation.y = time * 0.3;
    };
  },
};

// ---------------------------------------------------------------------------
// Spectroscopy: the Beer–Lambert law
// ---------------------------------------------------------------------------
const EPS = 12; // copper sulfate near 810 nm, L/(mol·cm)

export const beer_lambert = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a concentration that lets exactly 10% of the light through (absorbance 1).',
  goal: (t) => Math.abs(EPS * Number(t.l) * t.c - 1) < 0.03,
  params: [
    { key: 'c', label: 'Copper sulfate concentration (mol/L)', min: 0, max: 0.15, step: 0.005, value: 0.04 },
    { key: 'l', label: 'Path length (cm)', type: 'choice', value: '1', options: [{ value: '1', label: '1 cm' }, { value: '2', label: '2 cm' }] },
  ],
  beats: [
    { say: 'A beam of near-infrared light passes through blue copper sulfate solution. At 0.04 M about a third of it is absorbed.', set: { c: 0.04, l: '1' } },
    { say: 'Double the concentration: absorbance doubles (a straight line), but the light getting through drops from 33% to 11%.', set: { c: 0.08, l: '1' } },
    { say: 'Keep 0.04 M but use a 2 cm cuvette: the light crosses twice as many copper ions, the same as doubling the concentration.', set: { c: 0.04, l: '2' } },
  ],
  readout: (t) => {
    const A = EPS * Number(t.l) * t.c;
    return [
      ['Absorbance A = εlc', r2(A)],
      ['Light getting through T = 10⁻ᴬ', `${r1(100 * 10 ** -A)}%`],
      ['ε (copper sulfate, 810 nm)', '12 L/(mol·cm)'],
    ];
  },
  setup(kit) {
    const y = 1.6;
    kit.rect(-7.6, y - 0.6, 1.2, 1.2, { color: C.grey, opacity: 0.5, strokeColor: C.axis, width: 2 });
    kit.label('\\text{lamp}', [-7.0, y - 1.0], { size: 13, color: '#8b949e' });
    const beamIn = kit.rect(-6.4, y - 0.18, 3.4, 0.36, { color: C.red, opacity: 0.85, stroke: false });
    void beamIn;
    const sol = kit.fill([], { color: C.blue, opacity: 0.3 });
    const cuv = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0, strokeColor: C.white, width: 2 });
    const inside = kit.fill([], { color: C.red, opacity: 0.5 });
    const beamOut = kit.rect(0, 0, 0, 0, { color: C.red, opacity: 0.85, stroke: false });
    kit.rect(5.8, y - 0.6, 1.2, 1.2, { color: C.grey, opacity: 0.5, strokeColor: C.axis, width: 2 });
    kit.label('\\text{detector}', [6.4, y - 1.0], { size: 13, color: '#8b949e' });
    const meter = kit.label('', [6.4, y + 1.0], { size: 18, color: C.green });
    const P = kit.plane({ x: [0, 0.15, 0.05], y: [0, 3.6, 0.5], sx: 42, sy: 0.85, origin: [-3.2, -4.0], xLabel: 'c\\,(\\text{M})', yLabel: 'A', yEvery: 1, xEvery: 0.05 });
    const line = kit.line([], { color: C.blue, width: 2.5, create: false });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    return (p, t) => {
      const L = Number(t.l);
      const w = 0.8 * L;
      const x0 = -3;
      cuv.set(x0, y - 0.9, w, 1.8);
      sol.set([[x0, y - 0.9], [x0 + w, y - 0.9], [x0 + w, y + 0.6], [x0, y + 0.6]]).opacity(0.08 + p.c * 4);
      const A = EPS * L * p.c;
      const Tr = 10 ** -A;
      inside.set([[x0, y - 0.18], [x0 + w, y - 0.18 * Tr], [x0 + w, y + 0.18 * Tr], [x0, y + 0.18]]);
      beamOut.set(x0 + w, y - 0.18 * Tr, 5.8 - x0 - w, 0.36 * Tr);
      meter.set(`${r1(100 * Tr)}\\%`);
      line.set([P.toW(0, 0), P.toW(0.15, Math.min(3.6, EPS * L * 0.15))].map((q, i) => (i === 1 && EPS * L * 0.15 > 3.6 ? P.toW(3.6 / (EPS * L), 3.6) : q)));
      dot.set(P.toW(p.c, Math.min(3.6, A)));
    };
  },
};

// ---------------------------------------------------------------------------
// Environment: the Keeling curve (smoothed fit to the Mauna Loa record)
// ---------------------------------------------------------------------------
const co2 = (yr) => 280 + 35 * Math.exp((yr - 1958) / 47.3) + 3 * Math.cos(2 * Math.PI * (yr - Math.floor(yr) - 0.37));
// smooth fit to the Mauna Loa yearly means: 315 ppm (1958), 354 (1990), 425 (2024)
const co2s = (yr) => 315.2 + 0.818 * (yr - 1958) + 0.01272 * (yr - 1958) ** 2;

export const co2_keeling = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the year carbon dioxide first passed 400 ppm.',
  goal: (t) => t.yr >= 2013 && t.yr <= 2016,
  params: [
    { key: 'yr', label: 'Year', min: 1958, max: 2025, step: 1, value: 1958 },
    { key: 'zoom', label: 'View', type: 'choice', value: 'all', options: [{ value: 'all', label: 'all years' }, { value: 'one', label: 'zoom on one year' }] },
  ],
  beats: [
    { say: '1958: Keeling’s first readings on Mauna Loa, about 315 ppm. Before industry it was about 280.', set: { yr: 1958, zoom: 'all' } },
    { say: 'By 1990 it reached about 354 ppm, rising faster every decade.', set: { yr: 1990, zoom: 'all' } },
    { say: 'Zoom in on one year: CO₂ falls each northern summer as forests grow, and rises again in winter.', set: { yr: 2020, zoom: 'one' } },
    { say: 'Today it is over 420 ppm, about 50% above the pre-industrial level.', set: { yr: 2025, zoom: 'all' } },
  ],
  readout: (t) => [
    ['Year', `${t.yr}`],
    ['CO₂ (yearly average)', `${Math.round(co2s(t.yr))} ppm`],
    ['Rise per year', `${r1(co2s(t.yr + 0.5) - co2s(t.yr - 0.5))} ppm`],
    ['Source', 'smoothed fit to the Mauna Loa record'],
    ['Above pre-industrial (280 ppm)', `${Math.round(((co2s(t.yr) - 280) / 280) * 100)}%`],
  ],
  setup(kit) {
    const all = kit.group();
    const P = kit.plane({ x: [1958, 2025, 10], y: [300, 440, 20], sx: 0.2, sy: 0.05, origin: [-7.0 - 1958 * 0.2, -3.4 - 300 * 0.05], xEvery: 10, yEvery: 20, yLabel: '\\text{CO}_2\\,(\\text{ppm})', fmt: (v) => `${Math.round(v)}`, axisAt: [1958, 300], parent: all });
    const full = kit.line(range(1958, 2025, 800).map((y) => P.toW(y, co2(y))), { color: C.grey, width: 1.5, opacity: 0.3, create: false, parent: all });
    void full;
    const done = kit.line([], { color: C.red, width: 2.5, create: false, parent: all });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow, parent: all });
    kit.line([P.toW(1958, 400), P.toW(2025, 400)], { color: C.gold, width: 1.5, dashed: true, opacity: 0.6, parent: all });
    kit.label('400\\,\\text{ppm}', P.toW(1963, 404), { size: 13, color: C.gold, parent: all });
    const one = kit.group();
    const Q = kit.plane({ x: [0, 12, 1], y: [-4, 4, 1], sx: 1.1, sy: 0.75, origin: [-6.6, 0], yLabel: '\\text{ppm above average}', xEvery: 100, yEvery: 2, parent: one });
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    months.forEach((m, i) => kit.label(`\\text{${m}}`, Q.toW(i + 0.5, -4.4), { size: 13, color: '#8b949e', parent: one }));
    kit.line(range(0, 12, 120).map((m) => Q.toW(m, 3 * Math.cos(2 * Math.PI * (m / 12 - 0.37)))), { color: C.green, width: 3, parent: one });
    kit.label('\\text{May: highest}', Q.toW(4.4, 3.6), { size: 13, color: C.green, parent: one });
    kit.label('\\text{autumn: lowest (after a summer of northern forest growth)}', Q.toW(8.5, -3.5), { size: 13, color: C.green, parent: one });
    const big = kit.label('', [4.6, 3.6], { size: 22 });
    return (p, t) => {
      all.visible = t.zoom === 'all';
      one.visible = t.zoom === 'one';
      done.set(range(1958, p.yr, Math.max(2, Math.round((p.yr - 1958) * 12))).map((y) => P.toW(y, co2(y))));
      dot.set(P.toW(p.yr, co2s(p.yr)));
      big.set(`${t.yr}: \\; ${Math.round(co2s(t.yr))}\\,\\text{ppm}`);
    };
  },
};
