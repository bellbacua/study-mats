import { C } from '../theme';
import { clamp } from '../kit';

const n2 = (v) => Math.round(v * 100) / 100;

// Deterministic pseudo-random so scenes look the same every visit.
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Bonding: Lennard-Jones energy well + thermal expansion
// ---------------------------------------------------------------------------
const lj = (r, eps) => 4 * eps * ((1 / r) ** 12 - (1 / r) ** 6);

export const bonding_energy_well = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.6] },
  params: [
    { key: 'r', label: 'Distance between atoms (σ)', min: 0.95, max: 3, step: 0.01, value: 2.2 },
    { key: 'eps', label: 'Bond strength ε', min: 0.5, max: 2, step: 0.1, value: 1 },
    { key: 'heat', label: 'Heat (vibration energy)', min: 0, max: 0.9, step: 0.05, value: 0 },
  ],
  beats: [
    { say: 'Far apart, the atoms barely notice each other: energy ≈ 0, almost no force.', set: { r: 2.6, heat: 0 } },
    { say: 'Squeeze them and the electron clouds repel hard: the wall on the left shoots up.', set: { r: 0.98, heat: 0 } },
    { say: 'The bottom of the well is the bond length. Add heat: the atoms rattle, and because the well is lopsided their average spacing grows. That is thermal expansion.', set: { r: 1.122, heat: 0.6 } },
  ],
  goal: (t) => Math.abs(t.r - 1.12) < 0.04,
  readout: (t) => {
    const E = lj(t.r, t.eps);
    return [
      ['Energy E(r)', `${n2(E)} ε`],
      ['Bond length (well bottom)', '2^{1/6} σ ≈ 1.12 σ'],
      ['Force', t.r < 1.12 ? 'push apart' : t.r > 1.13 ? 'pull together' : 'balanced'],
      ['Melting happens when', 'vibration energy reaches the rim (E → 0)'],
    ];
  },
  setup(kit) {
    const sx = 10 / 2.3;
    const sy = 5 / 3.4;
    const P = kit.plane({
      x: [0.9, 3.2, 0.2],
      y: [-2.2, 1.2, 0.5],
      sx,
      sy,
      origin: [-6.4 - 0.9 * sx, -3.8 + 2.2 * sy],
      xEvery: 0.4,
      yEvery: 1,
      xLabel: 'r',
      yLabel: 'E',
    });
    const well = kit.curve((r) => lj(r, 1), [0.95, 3.2], { plane: P, color: C.blue, width: 4, clipY: [-2.3, 1.2] });
    const level = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 2, dashed: true, create: false });
    const mean = kit.line([[0, 0], [0, 0]], { color: C.green, width: 2, dashed: true, create: false });
    const meanL = kit.label('average spacing', [0, 0], { tex: false, cls: 'tick', color: C.green });
    const ball = kit.dot([0, 0], { r: 0.16, color: C.yellow, z: 6 });
    const force = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3, head: 0.25 });
    const atomA = kit.dot([0, 0], { r: 0.42, color: C.blue });
    const atomB = kit.dot([0, 0], { r: 0.42, color: C.teal });
    const bond = kit.line([[0, 0], [0, 0]], { color: C.white, width: 2, opacity: 0.5, create: false });
    const sep = kit.label('', [0, 0], { size: 16 });

    const turning = (E, eps) => {
      const solve = (lo, hi) => {
        for (let i = 0; i < 50; i++) {
          const mid = (lo + hi) / 2;
          const f = lj(mid, eps) - E;
          if ((lj(lo, eps) - E) * f <= 0) hi = mid;
          else lo = mid;
        }
        return (lo + hi) / 2;
      };
      const r0 = 2 ** (1 / 6);
      return [solve(0.9, r0), solve(r0, 6)];
    };

    return (p, t, time) => {
      well.set((r) => lj(r, p.eps));
      let r = p.r;
      if (p.heat > 0.01) {
        const E = -p.eps * (1 - p.heat);
        const [r1, r2] = turning(E, p.eps);
        r = r1 + (r2 - r1) * (0.5 - 0.5 * Math.cos(time * 5));
        level.set([P.toW(r1, E), P.toW(Math.min(r2, 3.2), E)]).visible(true);
        const rm = Math.min((r1 + r2) / 2, 3.2);
        mean.set([P.toW(rm, -2.2), P.toW(rm, 1.1)]).visible(true);
        meanL.pos(P.toW(rm, 1.25)).visible(true);
      } else {
        level.visible(false);
        mean.visible(false);
        meanL.visible(false);
      }
      const E = lj(r, p.eps);
      ball.set(P.toW(r, clamp(E, -2.3, 1.2)));
      const dEdr = 4 * p.eps * (-12 / r ** 13 + 6 / r ** 7);
      const F = clamp(-dEdr * 0.4, -2.5, 2.5);
      const [bx, by] = P.toW(r, clamp(E, -2.3, 1.2));
      force.set([bx, by], [bx + F, by]).visible(Math.abs(F) > 0.05 && p.heat < 0.01);
      const cx = 2.5;
      const half = r * 0.9;
      atomA.set([cx - half, 3.3]);
      atomB.set([cx + half, 3.3]);
      bond.set([[cx - half, 3.3], [cx + half, 3.3]]);
      sep.set(`r = ${n2(r)}\\,\\sigma`).pos([cx, 2.55]);
      void t;
    };
  },
};

// ---------------------------------------------------------------------------
// Stoichiometry: balance 4 Fe + 3 O₂ → 2 Fe₂O₃ by counting atoms
// ---------------------------------------------------------------------------
export const mole_stoichiometry_reactor = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  params: [
    { key: 'cFe', label: 'Fe (iron atoms)', min: 1, max: 6, step: 1, value: 1 },
    { key: 'cO2', label: 'O₂ (oxygen molecules)', min: 1, max: 6, step: 1, value: 1 },
    { key: 'cOx', label: 'Fe₂O₃ (rust units)', min: 1, max: 6, step: 1, value: 1 },
  ],
  beats: [
    { say: 'Lavoisier: atoms are never created or destroyed. Count each kind on both sides.', set: { cFe: 1, cO2: 1, cOx: 1 } },
    { say: 'Rust needs O in threes, oxygen gas comes in twos. The smallest shared multiple is 6: 3 O₂ → 2 Fe₂O₃.', set: { cFe: 1, cO2: 3, cOx: 2 } },
    { say: 'Two Fe₂O₃ hold 4 iron atoms, so start with 4 Fe. Balanced: 4 Fe + 3 O₂ → 2 Fe₂O₃.', set: { cFe: 4, cO2: 3, cOx: 2 } },
  ],
  goal: (t) => t.cFe === 4 && t.cO2 === 3 && t.cOx === 2,
  readout: (t) => [
    ['Fe atoms (left → right)', `${t.cFe} → ${2 * t.cOx}`],
    ['O atoms (left → right)', `${2 * t.cO2} → ${3 * t.cOx}`],
    ['Balanced?', t.cFe === 2 * t.cOx && 2 * t.cO2 === 3 * t.cOx ? 'yes ✓' : 'not yet'],
    ['In moles', '1 mol = 6.022 × 10²³ of these units'],
  ],
  setup(kit) {
    const FE = 0xb8743d;
    const fe = Array.from({ length: 6 }, () => kit.dot([0, 0], { r: 0.28, color: FE }));
    const o2 = Array.from({ length: 6 }, () => [kit.dot([0, 0], { r: 0.2, color: C.red }), kit.dot([0, 0], { r: 0.2, color: C.red })]);
    const ox = Array.from({ length: 6 }, () => ({
      fe: [kit.dot([0, 0], { r: 0.24, color: FE }), kit.dot([0, 0], { r: 0.24, color: FE })],
      o: [0, 1, 2].map(() => kit.dot([0, 0], { r: 0.17, color: C.red })),
    }));
    kit.arrow([-0.6, 1.2], [0.8, 1.2], { color: C.white, width: 3 });
    const eq = kit.label('', [0, 3.7], { size: 26 });
    const bars = ['Fe', 'O'].map((name, i) => ({
      name: kit.label(name, [-7.3, -2.2 - i * 1], { tex: false, size: 18 }),
      left: kit.rect(0, 0, 0, 0.5, { color: i ? C.red : FE, opacity: 0.8, stroke: false }),
      right: kit.rect(0, 0, 0, 0.5, { color: i ? C.red : FE, opacity: 0.8, stroke: false }),
      ll: kit.label('', [0, 0], { tex: false, cls: 'tick', align: 'left' }),
      rl: kit.label('', [0, 0], { tex: false, cls: 'tick', align: 'left' }),
      ok: kit.label('', [6.6, -1.95 - i * 1], { tex: false, size: 18 }),
    }));
    kit.line([[-0.1, -1.6], [-0.1, -3.6]], { color: C.grey, width: 1.5 });

    return (p, t, time) => {
      const wob = (i) => Math.sin(time * 1.5 + i) * 0.04;
      fe.forEach((d, i) => {
        d.visible(i < t.cFe);
        d.set([-7 + (i % 3) * 0.75, 2 - Math.floor(i / 3) * 0.8 + wob(i)]);
      });
      o2.forEach((pair, i) => {
        const x = -4.4 + (i % 3) * 1.1;
        const y = 2 - Math.floor(i / 3) * 0.8 + wob(i + 3);
        pair[0].set([x - 0.2, y]).visible(i < t.cO2);
        pair[1].set([x + 0.2, y]).visible(i < t.cO2);
      });
      ox.forEach((u, i) => {
        const x = 2 + (i % 3) * 1.9;
        const y = 1.9 - Math.floor(i / 3) * 1.4 + wob(i + 6);
        const on = i < t.cOx;
        u.fe[0].set([x - 0.25, y]).visible(on);
        u.fe[1].set([x + 0.25, y]).visible(on);
        u.o[0].set([x, y + 0.38]).visible(on);
        u.o[1].set([x - 0.5, y - 0.32]).visible(on);
        u.o[2].set([x + 0.5, y - 0.32]).visible(on);
      });
      const c = (k) => (k === 1 ? '' : k);
      eq.set(`${c(t.cFe)}\\,\\text{Fe} + ${c(t.cO2)}\\,\\text{O}_2 \\rightarrow ${c(t.cOx)}\\,\\text{Fe}_2\\text{O}_3`);
      const counts = [
        [p.cFe, 2 * p.cOx, t.cFe, 2 * t.cOx],
        [2 * p.cO2, 3 * p.cOx, 2 * t.cO2, 3 * t.cOx],
      ];
      bars.forEach((b, i) => {
        const [l, r, lt, rt] = counts[i];
        const y = -2.45 - i * 1;
        b.left.set(-0.3 - l * 0.35, y, l * 0.35, 0.5);
        b.right.set(0.1, y, r * 0.35, 0.5);
        b.ll.set(`${lt}`).pos([-0.3 - l * 0.35 - 0.45, y + 0.25]);
        b.rl.set(`${rt}`).pos([0.2 + r * 0.35, y + 0.25]);
        const ok = lt === rt;
        b.ok.set(ok ? '✓' : '≠').color(ok ? C.green : C.red);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Crystal structures in 3D
// ---------------------------------------------------------------------------
const STRUCT = {
  sc: { basis: [[0, 0, 0]], r: 0.5, n: 1, cn: 6, apf: 0.52, ex: 'Polonium (rare, inefficient)' },
  bcc: { basis: [[0, 0, 0], [0.5, 0.5, 0.5]], r: Math.sqrt(3) / 4, n: 2, cn: 8, apf: 0.68, ex: 'α-iron (room-temp steel), Cr, W' },
  fcc: {
    basis: [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]],
    r: Math.sqrt(2) / 4,
    n: 4,
    cn: 12,
    apf: 0.74,
    ex: 'Al, Cu, Ni, Au, γ-iron (austenite)',
  },
};

export const crystal_lattice_3d = {
  camera: { kind: '3d', position: [8.5, 6.5, 11], autoRotate: true },
  params: [
    {
      key: 'structure',
      label: 'Structure',
      type: 'choice',
      value: 'sc',
      options: [
        { value: 'sc', label: 'Simple cubic' },
        { value: 'bcc', label: 'Body-centred (BCC)' },
        { value: 'fcc', label: 'Face-centred (FCC)' },
      ],
    },
    { key: 'cells', label: 'Unit cells per side', min: 1, max: 3, step: 1, value: 1 },
    { key: 'size', label: 'Atom size (1 = touching)', min: 0.25, max: 1, step: 0.05, value: 0.35 },
  ],
  beats: [
    { say: 'Simple cubic: one atom per corner. Grow them until they touch: only 52% of space is filled.', set: { structure: 'sc', cells: 1, size: 1 } },
    { say: 'BCC adds an atom in the centre. 8 neighbours, 68% filled. This is room-temperature iron.', set: { structure: 'bcc', cells: 1, size: 1 } },
    { say: 'FCC puts atoms on every face: 12 neighbours, 74%, the densest possible packing. Copper and aluminium are FCC, which is why they bend so easily.', set: { structure: 'fcc', cells: 2, size: 0.45 } },
  ],
  goal: (_t, seen) => (seen.structure?.size || 0) >= 3,
  readout: (t) => {
    const s = STRUCT[t.structure];
    return [
      ['Atoms per unit cell', s.n],
      ['Nearest neighbours', s.cn],
      ['Packing factor (APF)', `${Math.round(s.apf * 100)}%`],
      ['Touching radius', `r = ${t.structure === 'sc' ? 'a/2' : t.structure === 'bcc' ? '√3·a/4' : '√2·a/4'}`],
      ['Found in', s.ex],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const world = kit.group();
    const a = 2;
    let key = '';
    let atoms = [];
    const geo = new THREE.SphereGeometry(1, 28, 18);
    const mats = {
      corner: new THREE.MeshStandardMaterial({ color: C.blue, roughness: 0.3, metalness: 0.2 }),
      body: new THREE.MeshStandardMaterial({ color: C.yellow, roughness: 0.3, metalness: 0.2 }),
      face: new THREE.MeshStandardMaterial({ color: C.green, roughness: 0.3, metalness: 0.2 }),
    };
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });

    function build(structure, n) {
      world.clear();
      atoms = [];
      const s = STRUCT[structure];
      const off = (n * a) / 2;
      const seen = new Set();
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
          for (let k = 0; k < n; k++) {
            for (const b of s.basis) {
              const cands = b.every((v) => v === 0)
                ? [0, 1].flatMap((dx) => [0, 1].flatMap((dy) => [0, 1].map((dz) => [dx, dy, dz])))
                : [[0, 0, 0]];
              for (const c of cands) {
                const pos = [i + b[0] + c[0], j + b[1] + c[1], k + b[2] + c[2]];
                // Face atoms also appear on the far faces of the block.
                const extra = [];
                if (structure === 'fcc' && !b.every((v) => v === 0)) {
                  b.forEach((v, axis) => {
                    if (v === 0) {
                      const q = [...pos];
                      q[axis] += 1;
                      extra.push(q);
                    }
                  });
                }
                for (const q of [pos, ...extra]) {
                  if (q.some((v) => v > n + 1e-9)) continue;
                  const id = q.map((v) => v.toFixed(2)).join(',');
                  if (seen.has(id)) continue;
                  seen.add(id);
                  const kind = b.every((v) => v === 0) ? 'corner' : structure === 'bcc' ? 'body' : 'face';
                  const m = new THREE.Mesh(geo, mats[kind]);
                  m.position.set(q[0] * a - off, q[1] * a - off, q[2] * a - off);
                  world.add(m);
                  atoms.push(m);
                }
              }
            }
          }
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
          for (let k = 0; k < n; k++) {
            const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(a, a, a)), edgeMat);
            box.position.set((i + 0.5) * a - off, (j + 0.5) * a - off, (k + 0.5) * a - off);
            world.add(box);
          }
    }

    return (p, t) => {
      const k = `${t.structure}-${t.cells}`;
      if (k !== key) {
        key = k;
        build(t.structure, t.cells);
      }
      const r = STRUCT[t.structure].r * a * p.size;
      atoms.forEach((m) => m.scale.setScalar(r));
      world.scale.setScalar(1.6 / Math.max(1, p.cells * 0.75));
    };
  },
};

// ---------------------------------------------------------------------------
// Gibbs free energy: ΔG = ΔH − TΔS
// ---------------------------------------------------------------------------
export const gibbs_free_energy_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  params: [
    { key: 'dH', label: 'ΔH (kJ/mol)', min: -300, max: 300, step: 10, value: 100 },
    { key: 'dS', label: 'ΔS (J/mol·K)', min: -400, max: 400, step: 10, value: 200 },
    { key: 'T', label: 'Temperature T (K)', min: 0, max: 2000, step: 10, value: 300 },
  ],
  beats: [
    { say: 'ΔG < 0 means "will happen on its own". Here heat is absorbed (ΔH > 0), so at room temperature: no.', set: { dH: 100, dS: 200, T: 300 } },
    { say: 'But disorder increases (ΔS > 0), so −TΔS grows with temperature. The line falls…', set: { dH: 100, dS: 200, T: 500 } },
    { say: '…and crosses zero at T = ΔH/ΔS = 500 K. Above that, the reaction runs by itself. This is how furnaces "unlock" reactions.', set: { dH: 100, dS: 200, T: 1200 } },
  ],
  goal: (t) => t.dS !== 0 && t.dH / (t.dS / 1000) > 0 && t.T > t.dH / (t.dS / 1000),
  readout: (t) => {
    const G = t.dH - (t.T * t.dS) / 1000;
    const Tx = t.dS !== 0 ? (t.dH * 1000) / t.dS : null;
    return [
      ['ΔG at this T', `${n2(G)} kJ/mol`],
      ['Verdict', G < 0 ? 'spontaneous ✓' : G > 0 ? 'not spontaneous' : 'equilibrium'],
      ['Crossover T = ΔH/ΔS', Tx && Tx > 0 ? `${Math.round(Tx)} K` : 'none (never switches)'],
    ];
  },
  setup(kit) {
    const sx = 13 / 2000;
    const sy = 7.4 / 1200;
    const P = kit.plane({
      x: [0, 2000, 250],
      y: [-600, 600, 200],
      sx,
      sy,
      origin: [-6.5, 0],
      xEvery: 500,
      yEvery: 200,
      xLabel: 'T\\,(K)',
      yLabel: '\\Delta G',
    });
    kit.fill([P.toW(0, 0), P.toW(2000, 0), P.toW(2000, -600), P.toW(0, -600)], { color: C.green, opacity: 0.07 });
    kit.label('spontaneous (ΔG < 0)', P.toW(1500, -520), { tex: false, cls: 'tick', color: C.green });
    kit.label('needs a push (ΔG > 0)', P.toW(1500, 520), { tex: false, cls: 'tick', color: C.red });
    const lineNeg = kit.curve(() => 0, [0, 2000], { plane: P, color: C.green, width: 4 });
    const linePos = kit.curve(() => 0, [0, 2000], { plane: P, color: C.red, width: 4 });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow, z: 6 });
    const drop = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 1.5, dashed: true, create: false });
    const cross = kit.dot([0, 0], { r: 0.1, color: C.white });
    const crossL = kit.label('', [0, 0], { size: 15, align: 'above' });
    const eq = kit.label('', [-2.6, 4], { size: 24 });
    return (p, t) => {
      const G = (T) => p.dH - (T * p.dS) / 1000;
      const clip = (v) => (v >= -600 && v <= 600 ? v : NaN);
      lineNeg.set((T) => (G(T) <= 0 ? clip(G(T)) : NaN));
      linePos.set((T) => (G(T) >= 0 ? clip(G(T)) : NaN));
      const g = clamp(G(p.T), -600, 600);
      dot.set(P.toW(p.T, g));
      drop.set([P.toW(p.T, 0), P.toW(p.T, g)]);
      const Tx = p.dS !== 0 ? (p.dH * 1000) / p.dS : -1;
      const showX = Tx > 0 && Tx < 2000;
      cross.set(P.toW(Tx, 0)).visible(showX);
      crossL.set(`T^* = ${Math.round(Tx)}\\,K`).pos([...P.toW(Tx, 0)].map((v, i) => (i ? v + 0.25 : v))).visible(showX);
      eq.set(`\\Delta G = ${t.dH} - T\\,(${t.dS / 1000})`);
    };
  },
};

// ---------------------------------------------------------------------------
// Polymers: chains frozen below Tg, wriggling above it
// ---------------------------------------------------------------------------
const POLYMERS = {
  ps: { name: 'Polystyrene (CD cases)', tg: 100, tm: 240 },
  pe: { name: 'Polyethylene (bags)', tg: -110, tm: 130 },
  rubber: { name: 'Natural rubber', tg: -70, tm: 180 },
  pmma: { name: 'Acrylic / PMMA', tg: 105, tm: 160 },
};

export const polymer_tg_chain_lab = {
  camera: { kind: '3d', position: [0, 3, 13] },
  params: [
    {
      key: 'poly',
      label: 'Polymer',
      type: 'choice',
      value: 'rubber',
      options: Object.entries(POLYMERS).map(([value, v]) => ({ value, label: v.name })),
    },
    { key: 'T', label: 'Temperature (°C)', min: -150, max: 250, step: 5, value: 25 },
  ],
  beats: [
    { say: 'A polymer is a tangle of long chains. Rubber at room temperature: far above its Tg, the chains wriggle freely, so it stretches.', set: { poly: 'rubber', T: 25 } },
    { say: 'Cool rubber below Tg (−70 °C) and the wriggling stops. It becomes glassy and brittle. This is what doomed the Challenger O-rings on a freezing morning.', set: { poly: 'rubber', T: -100 } },
    { say: 'Polystyrene has Tg = 100 °C, so at room temperature it is already glassy. That is why a CD case snaps instead of bending.', set: { poly: 'ps', T: 25 } },
  ],
  readout: (t) => {
    const m = POLYMERS[t.poly];
    const state = t.T < m.tg ? 'Glassy: rigid, brittle' : t.T < m.tm ? 'Rubbery: flexible, stretchy' : 'Melt: flows like syrup';
    return [
      ['Glass transition Tg', `${m.tg} °C`],
      ['Melting / flow', `${m.tm} °C`],
      ['State now', state],
      ['Stiffness drop across Tg', '≈ 1000× softer'],
    ];
  },
  setup(kit) {
    const rand = rng(7);
    const chains = Array.from({ length: 5 }, (_, c) => {
      const pts = [];
      let x = -5 + rand() * 2;
      let y = -2 + c;
      let z = -1 + rand() * 2;
      for (let i = 0; i < 46; i++) {
        pts.push([x, y, z]);
        const th = rand() * Math.PI * 2;
        const ph = Math.acos(2 * rand() - 1);
        x += 0.45 * Math.sin(ph) * Math.cos(th) + 0.2;
        y += 0.45 * Math.cos(ph) * 0.6;
        z += 0.45 * Math.sin(ph) * Math.sin(th) * 0.7;
      }
      const color = [C.blue, C.teal, C.green, C.yellow, C.purple][c];
      return {
        base: pts,
        phase: pts.map(() => [rand() * 6.28, rand() * 6.28, rand() * 6.28]),
        line: kit.line(pts, { color, width: 3 }),
        beads: pts.map((q) => kit.sphere(q, 0.12, color, { seg: 10 })),
      };
    });
    const center = chains.flatMap((ch) => ch.base).reduce((a, q) => [a[0] + q[0], a[1] + q[1], a[2] + q[2]], [0, 0, 0]);
    const n = chains.length * 46;
    const ctr = center.map((v) => v / n);
    let amp = 0;
    return (p, t, time, dt) => {
      const m = POLYMERS[t.poly];
      const target = p.T < m.tg ? 0.025 : p.T < m.tm ? 0.12 + ((p.T - m.tg) / (m.tm - m.tg)) * 0.15 : 0.45;
      amp += (target - amp) * (1 - Math.exp(-dt * 3));
      chains.forEach((ch) => {
        const pts = ch.base.map((q, i) => {
          const ph = ch.phase[i];
          const w = 3 + amp * 10;
          return [
            q[0] - ctr[0] + amp * Math.sin(time * w + ph[0]) * 1.8,
            q[1] - ctr[1] + amp * Math.sin(time * w * 1.1 + ph[1]) * 1.8,
            q[2] - ctr[2] + amp * Math.sin(time * w * 0.9 + ph[2]) * 1.8,
          ];
        });
        ch.line.set(pts);
        ch.beads.forEach((b, i) => b.position.set(...pts[i]));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Semiconductors: band gap, temperature, doping, LED colour
// ---------------------------------------------------------------------------
function wavelengthToHex(nm) {
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm >= 380 && nm < 440) [r, g, b] = [(440 - nm) / 60, 0, 1];
  else if (nm < 490) [r, g, b] = [0, (nm - 440) / 50, 1];
  else if (nm < 510) [r, g, b] = [0, 1, (510 - nm) / 20];
  else if (nm < 580) [r, g, b] = [(nm - 510) / 70, 1, 0];
  else if (nm < 645) [r, g, b] = [1, (645 - nm) / 65, 0];
  else if (nm <= 750) [r, g, b] = [1, 0, 0];
  else return null;
  const to = (v) => Math.round(clamp(v, 0, 1) * 255);
  return (to(r) << 16) | (to(g) << 8) | to(b);
}

export const semiconductor_bandgap_lab = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    { key: 'Eg', label: 'Band gap Eg (eV)', min: 0.1, max: 6, step: 0.05, value: 1.1 },
    { key: 'T', label: 'Temperature (K)', min: 0, max: 900, step: 10, value: 300 },
    {
      key: 'dope',
      label: 'Doping',
      type: 'choice',
      value: 'none',
      options: [
        { value: 'none', label: 'Pure (intrinsic)' },
        { value: 'n', label: 'n-type (add phosphorus)' },
        { value: 'p', label: 'p-type (add boron)' },
      ],
    },
  ],
  beats: [
    { say: 'Electrons fill the valence band. To conduct, they must jump the gap. Silicon’s gap is 1.1 eV, so at room temperature only a few make it.', set: { Eg: 1.1, T: 300, dope: 'none' } },
    { say: 'Add phosphorus: each brings a spare electron sitting just below the conduction band. Now plenty of carriers. This is n-type silicon.', set: { Eg: 1.1, T: 300, dope: 'n' } },
    { say: 'When an electron falls back across the gap, it emits light with λ = 1240/Eg nm. GaN’s 2.7–3.4 eV gives the blue LED (Nobel Prize 2014).', set: { Eg: 2.75, T: 300, dope: 'none' } },
  ],
  readout: (t) => {
    const nm = 1240 / t.Eg;
    const kind = t.Eg < 0.2 ? 'Metal-like (no real gap)' : t.Eg < 3.5 ? 'Semiconductor' : 'Insulator';
    return [
      ['Material type', kind],
      ['Light if it falls back', `λ = 1240/Eg = ${Math.round(nm)} nm`],
      ['Colour', nm < 380 ? 'ultraviolet' : nm > 750 ? 'infrared (invisible)' : 'visible'],
      ['Examples', 'Si 1.1 · GaAs 1.4 · GaN 3.4 · diamond 5.5 eV'],
    ];
  },
  setup(kit) {
    const vbTop = -1.6;
    const scale = 0.75;
    kit.rect(-6.5, -4, 9.5, 2.4, { color: C.blue, opacity: 0.22, strokeColor: C.blue });
    const cb = kit.rect(-6.5, 0, 9.5, 1.6, { color: C.yellow, opacity: 0.12, strokeColor: C.yellow });
    kit.label('valence band (full)', [-6.3, -3.75], { tex: false, cls: 'tick', align: 'left' });
    const cbL = kit.label('conduction band (empty)', [0, 0], { tex: false, cls: 'tick', align: 'left' });
    const gapArrow = kit.arrow([3.6, vbTop], [3.6, 0], { color: C.white, width: 2, head: 0.2 });
    const gapArrow2 = kit.arrow([3.6, 0], [3.6, vbTop], { color: C.white, width: 2, head: 0.2 });
    const gapL = kit.label('', [0, 0], { align: 'left', size: 20 });
    const level = kit.line([[0, 0], [0, 0]], { color: C.green, width: 2, dashed: true, create: false });
    const N = 36;
    const rand = rng(3);
    const seeds = Array.from({ length: N }, () => [rand(), rand(), rand()]);
    const electrons = seeds.map(() => kit.dot([0, 0], { r: 0.13, color: C.blue, z: 6 }));
    const holes = seeds.map(() => kit.dot([0, 0], { r: 0.13, color: C.bg, z: 7 }));
    const holeRings = seeds.map(() => kit.dot([0, 0], { r: 0.17, color: C.white, z: 6 }));
    const donors = Array.from({ length: 6 }, () => kit.dot([0, 0], { r: 0.13, color: C.green, z: 6 }));
    const led = kit.dot([5.8, 0.6], { r: 1, color: 0x222222, z: 3 });
    const glow = kit.dot([5.8, 0.6], { r: 1.6, color: 0x222222, z: 2, opacity: 0.25 });
    const ledL = kit.label('', [5.8, -0.9], { tex: false, cls: 'tick' });

    return (p, t, time) => {
      const gap = p.Eg * scale;
      const cbBot = vbTop + gap;
      cb.set(-6.5, cbBot, 9.5, 1.6);
      cbL.pos([-6.3, cbBot + 1.35]);
      gapArrow.set([3.6, (vbTop + cbBot) / 2], [3.6, cbBot]);
      gapArrow2.set([3.6, (vbTop + cbBot) / 2], [3.6, vbTop]);
      gapL.set(`E_g = ${n2(t.Eg)}\\,\\text{eV}`).pos([3.85, (vbTop + cbBot) / 2]);

      // Exaggerated Boltzmann factor so a handful of jumps are visible.
      const kT = 8.617e-5 * Math.max(p.T, 1) * 7;
      const frac = Math.exp(-p.Eg / (2 * kT));
      const excited = Math.min(N, Math.round(N * frac * 0.6));
      const dope = t.dope;
      const levelY = dope === 'n' ? cbBot - 0.25 : dope === 'p' ? vbTop + 0.25 : null;
      level.visible(levelY !== null);
      if (levelY !== null) level.set([[-6.5, levelY], [3, levelY]]);
      const dopeCarriers = dope === 'none' ? 0 : Math.round(6 * clamp(p.T / 120, 0, 1));
      donors.forEach((d, i) => {
        const on = dope !== 'none' && i < 6;
        d.visible(on);
        if (!on) return;
        const x = -6 + i * 1.5;
        if (dope === 'n') {
          const up = i < dopeCarriers;
          const y = up ? cbBot + 0.3 + 0.2 * Math.sin(time * 2 + i) : levelY;
          d.set([((x + 6 + time * 0.8 * (up ? 1 : 0)) % 9) - 6, y]).color(C.green);
        } else {
          d.set([x, levelY]).color(i < dopeCarriers ? C.green : 0x335533);
        }
      });
      seeds.forEach((s, i) => {
        const vx = -6.3 + s[0] * 9;
        const vy = -3.6 + s[1] * 1.8;
        const up = i < excited;
        const pHole = dope === 'p' && i < dopeCarriers;
        const cx = -6.3 + ((s[0] * 9 + time * 0.7 * (0.5 + s[2])) % 9);
        electrons[i].set(up ? [cx, cbBot + 0.3 + s[1] * 1] : [vx, vy]).visible(!pHole);
        holes[i].set([vx, vy]).visible(up || pHole);
        holeRings[i].set([vx, vy]).visible(up || pHole);
      });
      const nm = 1240 / p.Eg;
      const col = wavelengthToHex(nm);
      led.color(col ?? 0x333333);
      glow.color(col ?? 0x333333).opacity(col ? 0.3 : 0.1);
      ledL.set(col ? `${Math.round(nm)} nm light` : nm < 380 ? 'UV (invisible)' : 'infrared (invisible)');
    };
  },
};
