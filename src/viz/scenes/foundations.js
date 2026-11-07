import { C } from '../theme';
import { clamp, poly, smooth } from '../kit';

const n2 = (v) => Math.round(v * 100) / 100;

// ---------------------------------------------------------------------------
// MATH 001: numbers as arrows; multiplying by a negative = 180° turn
// ---------------------------------------------------------------------------
export const number_line_vectors = {
  camera: { kind: '2d', x: [-9, 9], y: [-2.6, 4.4] },
  params: [
    { key: 'x', label: 'Starting arrow x', min: -5, max: 5, step: 1, value: 3 },
    { key: 'k', label: 'Multiply by k', min: -3, max: 3, step: 0.5, value: 1 },
    { key: 'b', label: 'Then add b', min: -5, max: 5, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Adding is sliding. Start at −4, slide 7 to the right, land on +3.', set: { x: -4, k: 1, b: 7 } },
    { say: 'Multiplying by −2 stretches the arrow 2× and swings it 180° around zero.', set: { x: -3, k: -2, b: 0 } },
    { say: 'Precedence: do the multiply (2 × 3 = 6) first, then slide by −4. Result: 2.', set: { x: 2, k: 3, b: -4 } },
  ],
  goal: (t) => t.x === -3 && t.k === -2,
  readout: (t) => {
    const r = t.k * t.x + t.b;
    return [
      ['k · x', n2(t.k * t.x)],
      ['k · x + b', n2(r)],
      ['Minus signs in the product', (t.k < 0 ? 1 : 0) + (t.x < 0 ? 1 : 0)],
    ];
  },
  setup(kit) {
    const S = 0.5;
    const P = kit.plane({ x: [-17, 17, 1], y: [0, 0, 1], sx: S, grid: false, yAxis: false, xEvery: 2 });
    const zero = kit.dot([0, 0], { r: 0.08, color: C.white });
    void zero;
    const base = kit.arrow([0, 0.45], [1, 0.45], { color: C.blue, width: 4 });
    const baseLbl = kit.label('x', [0, 0.8], { color: C.blue });
    const arc = kit.line([[0, 0]], { color: C.yellow, width: 1.5, dashed: true, opacity: 0.6 });
    const prod = kit.arrow([0, 1.3], [1, 1.3], { color: C.yellow, width: 4 });
    const prodLbl = kit.label('', [0, 1.7], { color: C.yellow });
    const add = kit.arrow([0, 2.4], [1, 2.4], { color: C.green, width: 4 });
    const addLbl = kit.label('', [0, 2.8], { color: C.green });
    const res = kit.dot([0, 0], { r: 0.14, color: C.red, z: 6 });
    const resLbl = kit.label('', [0, -0.75], { color: C.red, size: 20 });
    const eq = kit.label('', [0, 3.9], { size: 24 });
    let flip = 0;

    return (p, t, _time, dt) => {
      flip += ((t.k < 0 ? 1 : 0) - flip) * (1 - Math.exp(-dt * 4));
      const [bx] = P.toW(p.x, 0);
      base.set([0, 0.45], [bx, 0.45]);
      baseLbl.set(`x = ${t.x}`).pos([bx / 2, 0.8]);

      const L = Math.abs(p.k * p.x) * S;
      const dir = Math.sign(p.x || 1);
      const ang = Math.PI * smooth(flip);
      const tip = [dir * L * Math.cos(ang), 1.3 + L * Math.sin(ang) * 0.6];
      prod.set([0, 1.3], tip);
      const arcPts = [];
      for (let i = 0; i <= 40; i++) {
        const a = (Math.PI * i) / 40;
        arcPts.push([dir * L * Math.cos(a), 1.3 + L * Math.sin(a) * 0.6]);
      }
      arc.set(arcPts).visible(t.k < 0 && L > 0.05);
      prodLbl.set(`k\\cdot x = ${n2(t.k * t.x)}`).pos([tip[0], tip[1] + 0.4]);

      const kx = p.k * p.x * S;
      const end = kx + p.b * S;
      add.set([kx, 2.4], [end, 2.4]).visible(Math.abs(t.b) > 0);
      addLbl.set(`+\\,(${t.b})`).pos([(kx + end) / 2, 2.8]).visible(Math.abs(t.b) > 0);
      res.set([end, 0]);
      const r = t.k * t.x + t.b;
      resLbl.set(`${n2(r)}`).pos([end, -0.75]);
      eq.set(`(${t.k}) \\times (${t.x}) + (${t.b}) = ${n2(r)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// CHEM 001: 3D Bohr atom
// ---------------------------------------------------------------------------
const ELEMENTS = [
  ['n', 'Nothing'], ['H', 'Hydrogen'], ['He', 'Helium'], ['Li', 'Lithium'], ['Be', 'Beryllium'],
  ['B', 'Boron'], ['C', 'Carbon'], ['N', 'Nitrogen'], ['O', 'Oxygen'], ['F', 'Fluorine'],
  ['Ne', 'Neon'], ['Na', 'Sodium'], ['Mg', 'Magnesium'], ['Al', 'Aluminium'], ['Si', 'Silicon'],
  ['P', 'Phosphorus'], ['S', 'Sulfur'], ['Cl', 'Chlorine'], ['Ar', 'Argon'], ['K', 'Potassium'],
  ['Ca', 'Calcium'],
];
const SHELL_CAP = [2, 8, 8, 2];
const fillShells = (e) => {
  const out = [];
  let left = e;
  for (const cap of SHELL_CAP) {
    out.push(Math.max(0, Math.min(cap, left)));
    left -= cap;
  }
  return out;
};
const classify = (z) => {
  const shells = fillShells(z).filter((c) => c > 0);
  const v = shells[shells.length - 1] || 0;
  const full = z === 2 || v === 8;
  if (full) return [v, 'Noble gas: full shell, refuses to bond'];
  if (z === 1) return [1, 'Nonmetal: shares its 1 electron'];
  if (v <= 3) return [v, 'Metal: gives electrons away, conducts'];
  if (v === 4) return [v, 'Semiconductor (or covalent network): shares 4'];
  return [v, 'Nonmetal: grabs or shares electrons, insulates'];
};

export const bohr_orbital_builder = {
  camera: { kind: '3d', position: [0, 4, 15] },
  params: [
    { key: 'protons', label: 'Protons (Z)', min: 1, max: 20, step: 1, value: 6 },
    { key: 'neutrons', label: 'Neutrons (N)', min: 0, max: 22, step: 1, value: 6 },
    { key: 'electrons', label: 'Electrons', min: 0, max: 20, step: 1, value: 6 },
  ],
  beats: [
    { say: 'Charge = protons − electrons. 6 of each makes neutral carbon.', set: { protons: 6, neutrons: 6, electrons: 6 } },
    { say: 'Change only the neutrons and the element stays the same: magnesium-26 is an isotope of magnesium-24.', set: { protons: 12, neutrons: 14, electrons: 12 } },
    { say: 'Silicon: shells fill 2 → 8 → 4. Those 4 valence electrons are why it is inside every computer chip and solar cell.', set: { protons: 14, neutrons: 14, electrons: 14 } },
  ],
  goal: (t) => t.protons === 14 && t.electrons === 14,
  readout: (t) => {
    const [sym, name] = ELEMENTS[t.protons];
    const q = t.protons - t.electrons;
    const [v, kind] = classify(t.protons);
    return [
      ['Element', `${name} (${sym})`],
      ['Mass number A = Z + N', t.protons + t.neutrons],
      ['Net charge', q === 0 ? '0 (neutral)' : q > 0 ? `+${q} (cation)` : `${q} (anion)`],
      ['Shells', fillShells(t.electrons).filter((c) => c).join(' → ') || '—'],
      ['Valence electrons', v],
      ['Behaves like', kind],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const nucleus = kit.group();
    const radii = [2.2, 3.3, 4.4, 5.5];
    const tilts = [
      [0.3, 0, 0],
      [-0.5, 0.4, 0],
      [0.9, -0.3, 0.2],
      [-1.1, 0.8, 0],
    ];
    const shells = radii.map((r, i) => {
      const g = kit.group();
      g.rotation.set(...tilts[i]);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.012, 8, 160),
        new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: 0.35 })
      );
      g.add(ring);
      const electrons = Array.from({ length: 8 }, () =>
        kit.sphere([r, 0, 0], 0.17, C.blue, { parent: g, glow: 0.8 })
      );
      return { g, ring, electrons, r };
    });
    const symbol = kit.label('', [-6.5, 4.2, 0], { size: 30, cls: 'big' });
    let builtKey = '';
    let pop = 0;

    function buildNucleus(p, n) {
      nucleus.clear();
      const N = p + n;
      const R = 0.34 * Math.cbrt(N);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (2 * (i + 0.5)) / N;
        const rr = Math.sqrt(1 - y * y);
        const th = golden * i;
        const d = R * Math.cbrt((i + 0.5) / N);
        const isProton = Math.floor(((i + 1) * p) / N) > Math.floor((i * p) / N);
        kit.sphere([Math.cos(th) * rr * d, y * d, Math.sin(th) * rr * d], 0.3, isProton ? C.red : 0x9aa4ad, {
          parent: nucleus,
          seg: 16,
        });
      }
      pop = 0;
    }

    return (_p, t, time, dt) => {
      const key = `${t.protons}-${t.neutrons}`;
      if (key !== builtKey) {
        builtKey = key;
        buildNucleus(t.protons, t.neutrons);
      }
      pop = Math.min(1, pop + dt * 2.5);
      nucleus.scale.setScalar(0.6 + 0.4 * smooth(pop));
      nucleus.rotation.y = time * 0.25;

      const counts = fillShells(t.electrons);
      const outer = counts.reduce((a, c, i) => (c > 0 ? i : a), -1);
      shells.forEach((s, i) => {
        const c = counts[i];
        s.ring.material.opacity = c > 0 ? 0.4 : 0.08;
        s.electrons.forEach((e, j) => {
          e.visible = j < c;
          if (j >= c) return;
          const a = time * (0.9 / (i + 1)) + (2 * Math.PI * j) / c;
          e.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, 0);
          const col = i === outer ? C.yellow : C.blue;
          e.material.color.set(col);
          e.material.emissive.set(col);
        });
      });
      const q = t.protons - t.electrons;
      const sup = q === 0 ? '' : `^{${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '-'}}`;
      symbol.set(`{}^{${t.protons + t.neutrons}}_{${t.protons}}\\text{${ELEMENTS[t.protons][0]}}${sup}`);
    };
  },
};

// ---------------------------------------------------------------------------
// MATH 002: fractions as areas
// ---------------------------------------------------------------------------
export const fraction_area_grid = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.6, 4.4] },
  params: [
    { key: 'numA', label: 'A: top number', min: 0, max: 12, step: 1, value: 1 },
    { key: 'denA', label: 'A: bottom number', min: 1, max: 12, step: 1, value: 2 },
    { key: 'numB', label: 'B: top number', min: 0, max: 12, step: 1, value: 1 },
    { key: 'denB', label: 'B: bottom number', min: 1, max: 12, step: 1, value: 3 },
    {
      key: 'mode',
      label: 'Operation',
      type: 'choice',
      value: 'add',
      options: [
        { value: 'add', label: 'A + B' },
        { value: 'mul', label: 'A × B' },
      ],
    },
  ],
  beats: [
    { say: 'Multiply by 1 in disguise: slicing ½ into thirds gives 3/6. Same area, smaller slices.', set: { numA: 1, denA: 2, numB: 1, denB: 3, mode: 'add' } },
    { say: 'To add, re-slice both into the same size (12ths): 8/12 + 9/12 = 17/12.', set: { numA: 2, denA: 3, numB: 3, denB: 4, mode: 'add' } },
    { say: 'Multiplying is "take ⅔ of ¾": the overlap is 6 of 12 cells, so ½.', set: { numA: 2, denA: 3, numB: 3, denB: 4, mode: 'mul' } },
  ],
  goal: (t) => t.numA === 2 && t.denA === 3 && t.numB === 3 && t.denB === 4,
  readout: (t) => {
    const g = (a, b) => (b ? g(b, a % b) : a);
    const red = (n, d) => {
      const k = g(n, d) || 1;
      return `${n / k}/${d / k}`;
    };
    const cd = t.denA * t.denB;
    return t.mode === 'add'
      ? [
          ['Common slice size', `1/${cd}`],
          ['A in common slices', `${t.numA * t.denB}/${cd}`],
          ['B in common slices', `${t.numB * t.denA}/${cd}`],
          ['A + B', `${t.numA * t.denB + t.numB * t.denA}/${cd} = ${red(t.numA * t.denB + t.numB * t.denA, cd)}`],
        ]
      : [
          ['Overlap cells', `${t.numA * t.numB} of ${cd}`],
          ['A × B', `${t.numA * t.numB}/${cd} = ${red(t.numA * t.numB, cd)}`],
        ];
  },
  setup(kit) {
    const S = 3.2;
    const sqA = [-7.2, -1.2];
    const sqB = [-3.2, -1.2];
    const MAX = 12;
    const mk = (n, color) =>
      Array.from({ length: n }, () => kit.rect(0, 0, 0, 0, { color, opacity: 0.55, stroke: false }));
    const fillA = mk(MAX, C.blue);
    const fillB = mk(MAX, C.yellow);
    const gridA = Array.from({ length: 2 * MAX }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1.5, create: false }));
    const gridB = Array.from({ length: 2 * MAX }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1.5, create: false }));
    kit.rect(sqA[0], sqA[1], S, S, { fill: false, color: C.white, width: 2.5 });
    kit.rect(sqB[0], sqB[1], S, S, { fill: false, color: C.white, width: 2.5 });
    const lblA = kit.label('', [sqA[0] + S / 2, sqA[1] - 0.6], { color: C.blue, size: 22 });
    const lblB = kit.label('', [sqB[0] + S / 2, sqB[1] - 0.6], { color: C.yellow, size: 22 });
    const plus = kit.label('', [(sqA[0] + S + sqB[0]) / 2, sqA[1] + S / 2], { size: 26 });

    // Right panel: overlap square for ×, a 0..2 bar for +.
    const R = [1.6, -1.2];
    const prodCells = kit.rect(0, 0, 0, 0, { color: C.green, opacity: 0.75, stroke: false });
    const prodColsA = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.25, stroke: false });
    const prodRowsB = kit.rect(0, 0, 0, 0, { color: C.yellow, opacity: 0.25, stroke: false });
    const prodFrame = kit.rect(R[0], R[1], S, S, { fill: false, color: C.white, width: 2.5 });
    const prodGrid = Array.from({ length: 2 * MAX }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.6, create: false }));
    const barX = 1.2;
    const barW = 3.2;
    const barY = 0.2;
    const barA = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.75, stroke: false });
    const barB = kit.rect(0, 0, 0, 0, { color: C.yellow, opacity: 0.75, stroke: false });
    const barFrame = [0, 1].map((i) => kit.rect(barX + i * barW, barY, barW, 0.9, { fill: false, color: C.white, width: 2 }));
    const barTicks = Array.from({ length: 49 }, () => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.5, create: false }));
    const barLbls = [0, 1, 2].map((i) => kit.label(`${i}`, [barX + i * barW, barY - 0.35], { tex: false, cls: 'tick' }));
    const result = kit.label('', [4.6, 3.2], { size: 26 });
    const eq = kit.label('', [-3.6, 3.2], { size: 24 });
    let common = 0;

    const setGrid = (lines, origin, cols, rows, alpha) => {
      lines.forEach((l, i) => {
        if (i < MAX) {
          const c = i + 1;
          const on = c < cols;
          const x = origin[0] + (S * c) / cols;
          l.set([[x, origin[1]], [x, origin[1] + S]]).visible(on);
        } else {
          const r = i - MAX + 1;
          const on = r < rows;
          const y = origin[1] + (S * r) / rows;
          l.set([[origin[0], y], [origin[0] + S, y]]).visible(on).opacity(alpha);
        }
      });
    };

    return (_p, t, _time, dt) => {
      const add = t.mode === 'add';
      common += ((add ? 1 : 0) - common) * (1 - Math.exp(-dt * 4));
      const nA = Math.min(t.numA, t.denA);
      const nB = Math.min(t.numB, t.denB);
      fillA.forEach((r, i) => {
        r.visible(i < nA);
        if (i < nA) r.set(sqA[0] + (S * i) / t.denA, sqA[1], S / t.denA, S);
      });
      fillB.forEach((r, i) => {
        r.visible(i < nB);
        if (i < nB) r.set(sqB[0], sqB[1] + S - (S * (i + 1)) / t.denB, S, S / t.denB);
      });
      // Each square shows its own cuts, plus the other's cuts faded in when adding.
      setGrid(gridA, sqA, t.denA, t.denB, common);
      gridB.forEach((l, i) => {
        if (i < MAX) {
          const c = i + 1;
          const x = sqB[0] + (S * c) / t.denA;
          l.set([[x, sqB[1]], [x, sqB[1] + S]]).visible(c < t.denA).opacity(common);
        } else {
          const r = i - MAX + 1;
          const y = sqB[1] + (S * r) / t.denB;
          l.set([[sqB[0], y], [sqB[0] + S, y]]).visible(r < t.denB);
        }
      });
      lblA.set(`A = \\tfrac{${t.numA}}{${t.denA}}`);
      lblB.set(`B = \\tfrac{${t.numB}}{${t.denB}}`);
      plus.set(add ? '+' : '\\times');

      const cd = t.denA * t.denB;
      [prodCells, prodColsA, prodRowsB, prodFrame].forEach((r) => r.visible(!add));
      prodGrid.forEach((l) => l.visible(false));
      [barA, barB, ...barFrame].forEach((r) => r.visible(add));
      barLbls.forEach((l) => l.visible(add));
      barTicks.forEach((l) => l.visible(false));
      if (add) {
        const wA = (barW * t.numA) / t.denA;
        const wB = (barW * t.numB) / t.denB;
        barA.set(barX, barY, Math.min(wA, 2 * barW), 0.9);
        barB.set(barX + wA, barY, Math.max(0, Math.min(wB, 2 * barW - wA)), 0.9);
        if (cd <= 24) {
          for (let i = 1; i < 2 * cd && i < barTicks.length; i++) {
            const x = barX + (barW * i) / cd;
            barTicks[i].set([[x, barY], [x, barY + 0.9]]).visible(true);
          }
        }
        const top = t.numA * t.denB + t.numB * t.denA;
        eq.set(`\\tfrac{${t.numA}}{${t.denA}} + \\tfrac{${t.numB}}{${t.denB}} = \\tfrac{${t.numA * t.denB}}{${cd}} + \\tfrac{${t.numB * t.denA}}{${cd}}`);
        result.set(`= \\tfrac{${top}}{${cd}}`);
      } else {
        prodColsA.set(R[0], R[1], (S * nA) / t.denA, S);
        prodRowsB.set(R[0], R[1] + S - (S * nB) / t.denB, S, (S * nB) / t.denB);
        prodCells.set(R[0], R[1] + S - (S * nB) / t.denB, (S * nA) / t.denA, (S * nB) / t.denB);
        prodFrame.visible(true);
        setGrid(prodGrid, R, t.denA, t.denB, 1);
        prodGrid.forEach((l, i) => l.visible(i < MAX ? i + 1 < t.denA : i - MAX + 1 < t.denB));
        eq.set(`\\tfrac{${t.numA}}{${t.denA}} \\times \\tfrac{${t.numB}}{${t.denB}} = \\tfrac{${t.numA}\\times${t.numB}}{${t.denA}\\times${t.denB}}`);
        result.set(`= \\tfrac{${t.numA * t.numB}}{${cd}}`);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// MATH 003: unit cancellation pipeline
// ---------------------------------------------------------------------------
const PIPELINES = {
  density: {
    start: () => ({ n: '7.87', nu: 'g', d: '1', du: 'cm³' }),
    cards: [
      { n: '1', nu: 'kg', d: '1000', du: 'g' },
      { n: '1,000,000', nu: 'cm³', d: '1', du: 'm³' },
    ],
    cancel: [['0n', '1d'], ['0d', '2n']],
    result: () => '7870\\ \\text{kg/m}^3',
  },
  speed: {
    start: (v) => ({ n: `${v}`, nu: 'km', d: '1', du: 'h' }),
    cards: [
      { n: '1000', nu: 'm', d: '1', du: 'km' },
      { n: '1', nu: 'h', d: '3600', du: 's' },
    ],
    cancel: [['0n', '1d'], ['0d', '2n']],
    result: (v) => `${n2((v * 1000) / 3600)}\\ \\text{m/s}`,
  },
  volume: {
    start: () => ({ n: '1', nu: 'm³', d: '', du: '' }),
    cards: [{ n: '(100)³', nu: 'cm³', d: '1', du: 'm³' }],
    cancel: [['0n', '1d']],
    result: () => '1{,}000{,}000\\ \\text{cm}^3',
  },
  stress: {
    start: (v) => ({ n: `${v}`, nu: 'kN', d: '25', du: 'mm²' }),
    cards: [
      { n: '1000', nu: 'N', d: '1', du: 'kN' },
      { n: '1', nu: 'MPa', d: '1', du: 'N/mm²' },
    ],
    cancel: [['0n', '1d'], ['0d', '1n'], ['1n', '2d']],
    result: (v) => `${n2((v * 1000) / 25)}\\ \\text{MPa}`,
  },
};

export const dimensional_pipeline = {
  camera: { kind: '2d', x: [-8, 8], y: [-3, 4] },
  params: [
    {
      key: 'example',
      label: 'Conversion',
      type: 'choice',
      value: 'density',
      options: [
        { value: 'density', label: 'Iron density g/cm³ → kg/m³' },
        { value: 'speed', label: 'km/h → m/s' },
        { value: 'volume', label: '1 m³ → cm³' },
        { value: 'stress', label: 'kN on 25 mm² → MPa' },
      ],
    },
    { key: 'v', label: 'Starting value', min: 10, max: 200, step: 2, value: 72 },
    { key: 'stage', label: 'Pipeline step', min: 0, max: 3, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Start with what you know, units included, written as a fraction: 7.87 g per 1 cm³.', set: { example: 'density', stage: 0 } },
    { say: 'Multiply by fractions equal to 1 (1 kg = 1000 g, 1 m³ = 1,000,000 cm³), placed so each unwanted unit sits opposite itself…', set: { example: 'density', stage: 2 } },
    { say: '…then cancel top against bottom like algebra. Only kg/m³ survives: 7,870 kg/m³.', set: { example: 'density', stage: 3 } },
  ],
  goal: (t) => t.stage === 3,
  readout: (t) => [
    ['Rule', 'Each factor equals 1, so the value never changes'],
    ['Units left after cancelling', t.stage === 3 ? 'only the target unit' : 'keep going →'],
  ],
  setup(kit) {
    const W = 2.6;
    const H = 2.4;
    const slots = Array.from({ length: 3 }, (_, i) => {
      const frame = kit.rect(0, 0, W, H, { color: C.blue, opacity: 0.08, strokeColor: C.blue, width: 2 });
      const bar = kit.line([[0, 0], [1, 0]], { color: C.white, width: 2, create: false });
      const nNum = kit.label('', [0, 0], { tex: false, cls: 'card-num', align: 'right' });
      const nU = kit.label('', [0, 0], { tex: false, cls: 'card-unit', align: 'left' });
      const dNum = kit.label('', [0, 0], { tex: false, cls: 'card-num', align: 'right' });
      const dU = kit.label('', [0, 0], { tex: false, cls: 'card-unit', align: 'left' });
      const times = kit.label('×', [0, 0], { tex: false, size: 26 });
      return { frame, bar, nNum, nU, dNum, dU, times, i };
    });
    const eqSign = kit.label('=', [0, 0.5], { tex: false, size: 30 });
    const result = kit.label('', [0, 0.5], { size: 30, color: C.green, align: 'left' });

    return (p, t) => {
      const pipe = PIPELINES[t.example];
      const cards = [pipe.start(t.v), ...pipe.cards];
      const n = cards.length;
      const total = n * W + (n - 1) * 0.8;
      const x0 = -total / 2 - 1.6;
      const cancelled = new Set();
      if (t.stage >= 3) pipe.cancel.flat().forEach((k) => cancelled.add(k));
      slots.forEach((s, i) => {
        const card = cards[i];
        const a = card ? clamp(p.stage - (i === 0 ? -1 : i - 1), 0, 1) : 0;
        const x = x0 + i * (W + 0.8) + (1 - smooth(a)) * 1.2;
        const y = -0.7;
        const vis = !!card && a > 0.01;
        [s.frame, s.bar, s.nNum, s.nU, s.dNum, s.dU].forEach((o) => o.visible(vis));
        s.times.visible(vis && i > 0);
        if (!vis) return;
        s.frame.set(x, y, W, H).opacity(0.08 * a);
        s.bar.set([[x + 0.3, y + H / 2], [x + W - 0.3, y + H / 2]]).visible(!!card.d);
        const cx = x + W / 2 + 0.1;
        s.nNum.set(card.n).pos([cx - 0.05, y + H * 0.75]).opacity(a);
        s.nU.set(card.nu).pos([cx + 0.05, y + H * 0.75]).opacity(a);
        s.dNum.set(card.d).pos([cx - 0.05, y + H * 0.25]).opacity(a).visible(!!card.d);
        s.dU.set(card.du).pos([cx + 0.05, y + H * 0.25]).opacity(a).visible(!!card.d);
        s.nU.el.classList.toggle('cancel', cancelled.has(`${i}n`));
        s.dU.el.classList.toggle('cancel', cancelled.has(`${i}d`));
        s.times.pos([x - 0.4, y + H / 2]);
      });
      const done = t.stage >= 3;
      const endX = x0 + n * (W + 0.8) - 0.4;
      eqSign.pos([endX, 0.5]).visible(done);
      result.set(pipe.result(t.v)).pos([endX + 0.45, 0.5]).visible(done);
    };
  },
};

// ---------------------------------------------------------------------------
// MATH 004: al-jabr balance scale
// ---------------------------------------------------------------------------
export const algebra_balance_beam = {
  camera: { kind: '2d', x: [-8, 8], y: [-4, 4.4] },
  params: [
    { key: 'a', label: 'a (how many x boxes)', min: 1, max: 4, step: 1, value: 3 },
    { key: 'b', label: 'b (loose weights with x)', min: 0, max: 8, step: 1, value: 4 },
    { key: 'c', label: 'c (weights on the right)', min: 1, max: 24, step: 1, value: 19 },
    { key: 'guess', label: 'Your guess for x', min: 0, max: 8, step: 0.5, value: 3 },
    {
      key: 'step',
      label: 'Move',
      type: 'choice',
      value: 0,
      options: [
        { value: 0, label: 'Start' },
        { value: 1, label: 'Remove b from both sides' },
        { value: 2, label: 'Split into a groups' },
      ],
    },
  ],
  beats: [
    { say: '3x + 4 = 19. Guess x = 3: the left pan is lighter (13 < 19), so the beam tips.', set: { a: 3, b: 4, c: 19, guess: 3, step: 0 } },
    { say: 'al-muqābala: take the same 4 weights off BOTH pans. The beam stays level.', set: { a: 3, b: 4, c: 19, guess: 5, step: 1 } },
    { say: 'Split both sides into 3 equal groups. One box balances 5 weights: x = 5.', set: { a: 3, b: 4, c: 19, guess: 5, step: 2 } },
  ],
  goal: (t) => t.step === 2,
  readout: (t) => {
    const x = (t.c - t.b) / t.a;
    const left = t.a * t.guess + t.b;
    return [
      ['Left pan with your guess', `${t.a}·${t.guess} + ${t.b} = ${n2(left)}`],
      ['Right pan', t.c],
      ['Scale says', Math.abs(left - t.c) < 1e-9 ? 'balanced ✓' : left > t.c ? 'guess too big' : 'guess too small'],
      ['True x', t.step === 2 ? n2(x) : 'finish the moves'],
    ];
  },
  setup(kit) {
    const L = 5;
    const beam = kit.line([[-L, 0], [L, 0]], { color: C.axis, width: 6, create: false });
    kit.fill([[0, 0], [-0.6, -1.6], [0.6, -1.6]], { color: C.grey, opacity: 0.6 });
    const pans = [-1, 1].map(() => kit.line([[0, 0], [0, 0]], { color: C.white, width: 3, create: false }));
    const strings = [-1, 1].map(() => [kit.line([[0, 0], [0, 0]], { color: C.grey, width: 1.5, create: false }), kit.line([[0, 0], [0, 0]], { color: C.grey, width: 1.5, create: false })]);
    const boxes = Array.from({ length: 4 }, () => ({
      r: kit.rect(0, 0, 0.7, 0.7, { color: C.yellow, opacity: 0.85, strokeColor: C.gold }),
      l: kit.label('x', [0, 0], { color: '#1a1a1a', size: 18 }),
    }));
    const unitsL = Array.from({ length: 8 }, () => kit.rect(0, 0, 0.36, 0.36, { color: C.blue, opacity: 0.85, stroke: false }));
    const unitsR = Array.from({ length: 24 }, () => kit.rect(0, 0, 0.36, 0.36, { color: C.blue, opacity: 0.85, stroke: false }));
    const groupBoxes = Array.from({ length: 4 }, () => kit.rect(0, 0, 0, 0, { fill: false, color: C.green, width: 2 }));
    const eq = kit.label('', [0, 3.6], { size: 28 });
    let tilt = 0;
    let lift = 0;
    let split = 0;

    return (_p, t, _time, dt) => {
      const e = 1 - Math.exp(-dt * 3);
      const left = t.a * (t.step >= 1 ? (t.c - t.b) / t.a : t.guess) + t.b;
      const target = clamp((left - t.c) * 0.03, -0.3, 0.3);
      tilt += (target - tilt) * e;
      lift += ((t.step >= 1 ? 1 : 0) - lift) * e;
      split += ((t.step >= 2 ? 1 : 0) - split) * e;
      const ca = Math.cos(tilt);
      const sa = Math.sin(tilt);
      const end = (s) => [s * L * ca, -s * L * sa];
      beam.set([end(-1), end(1)]);
      const panAt = (s) => {
        const [ex, ey] = end(s);
        return [ex, ey - 2];
      };
      [-1, 1].forEach((s, i) => {
        const [px, py] = panAt(s);
        const [ex, ey] = end(s);
        pans[i].set([[px - 1.8, py], [px + 1.8, py]]);
        strings[i][0].set([[ex, ey], [px - 1.8, py]]);
        strings[i][1].set([[ex, ey], [px + 1.8, py]]);
      });
      const [lx, ly] = panAt(-1);
      const [rx, ry] = panAt(1);
      const keepBox = (i) => (split > 0.5 ? i === 0 : true);
      boxes.forEach((bx, i) => {
        const on = i < t.a;
        bx.r.visible(on);
        bx.l.visible(on);
        if (!on) return;
        const x = lx - 1.6 + i * 0.8;
        const fade = keepBox(i) ? 1 : 1 - split;
        bx.r.set(x, ly + 0.02, 0.7, 0.7).opacity(0.85 * fade);
        bx.l.pos([x + 0.35, ly + 0.37]).opacity(fade);
      });
      unitsL.forEach((u, i) => {
        const on = i < t.b;
        u.visible(on);
        if (!on) return;
        u.set(lx + 0.2 + (i % 4) * 0.42, ly + 0.02 + Math.floor(i / 4) * 0.42 + lift * 3, 0.36, 0.36).opacity(0.85 * (1 - lift));
      });
      const rem = t.c - t.b;
      const per = Math.max(1, Math.floor(rem / t.a));
      unitsR.forEach((u, i) => {
        const on = i < t.c;
        u.visible(on);
        if (!on) return;
        const removed = i >= rem;
        const col = i % 6;
        const row = Math.floor(i / 6);
        const group = Math.floor(i / per);
        const fade = removed ? 1 - lift : group === 0 || split < 0.5 ? 1 : 1 - split * 0.75;
        u.set(rx - 1.5 + col * 0.42, ry + 0.02 + row * 0.42 + (removed ? lift * 3 : 0), 0.36, 0.36).opacity(0.85 * fade);
      });
      groupBoxes.forEach((g, i) => {
        const on = split > 0.05 && i < t.a && rem % t.a === 0 && rem / t.a <= 6;
        g.visible(on);
        if (!on) return;
        const first = i * per;
        const row = Math.floor(first / 6);
        g.set(rx - 1.55 + (first % 6) * 0.42, ry + row * 0.42, per * 0.42, 0.42);
      });
      const x = n2((t.c - t.b) / t.a);
      eq.set(
        t.step === 0
          ? `${t.a === 1 ? '' : t.a}x + ${t.b} = ${t.c}`
          : t.step === 1
          ? `${t.a === 1 ? '' : t.a}x = ${t.c} - ${t.b} = ${rem}`
          : `x = \\tfrac{${rem}}{${t.a}} = ${x}`
      );
    };
  },
};

// ---------------------------------------------------------------------------
// Exponents: powers-of-ten zoom
// ---------------------------------------------------------------------------
const SCALES = [
  [-10, 'Silicon atom'],
  [-9, 'Gold nanoparticle'],
  [-8, 'Transistor gate'],
  [-7, 'Virus'],
  [-6, 'Steel grain (fine)'],
  [-5, 'Red blood cell'],
  [-4, 'Human hair'],
  [-3, 'Grain of sand'],
  [-2, 'Coin'],
  [-1, 'Your hand'],
  [0, 'You (1 m)'],
  [1, 'A house'],
  [2, 'A football field'],
  [3, 'A steel bridge'],
];

export const exponent_growth_scaler = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  params: [{ key: 'n', label: 'Zoom to 10ⁿ metres', min: -10, max: 3, step: 1, value: 0 }],
  beats: [
    { say: 'Each square is 10× the one inside it. 10⁰ m = 1 m: about you.', set: { n: 0 } },
    { say: 'Dividing by 10 four times: 10⁻⁴ m, the width of a hair. Negative exponents mean "divide".', set: { n: -4 } },
    { say: 'Ten more divisions… 10⁻¹⁰ m. Atoms. Materials engineering lives across all of these scales.', set: { n: -10 } },
  ],
  goal: (t) => t.n <= -9,
  readout: (t) => [
    ['10ⁿ', `10^${t.n} m`],
    ['As a decimal', t.n >= 0 ? `${10 ** t.n} m` : `0.${'0'.repeat(-t.n - 1)}1 m`],
    ['Here you find', SCALES.find((s) => s[0] === t.n)?.[1] || '—'],
    ['Rule', 'aᵐ · aⁿ = aᵐ⁺ⁿ, so each 10× step adds 1'],
  ],
  setup(kit) {
    const items = SCALES.map(([k, name], i) => ({
      k,
      r: kit.rect(0, 0, 1, 1, { fill: false, color: [C.blue, C.teal, C.green, C.yellow][i % 4], width: 2.5 }),
      l: kit.label(`10^{${k}}\\,\\text{m}`, [0, 0], { align: 'left', size: 15 }),
      nm: kit.label(name, [0, 0], { tex: false, align: 'left', cls: 'tick' }),
    }));
    return (p) => {
      items.forEach(({ k, r, l, nm }) => {
        const side = 3 * 10 ** (k - p.n);
        const on = side > 0.08 && side < 60;
        r.visible(on);
        l.visible(on && side > 0.6 && side < 18);
        nm.visible(on && side > 0.6 && side < 18);
        if (!on) return;
        r.set(-side / 2, -side / 2, side, side);
        l.pos([-side / 2 + 0.08, side / 2 - 0.25]);
        nm.pos([-side / 2 + 0.08, side / 2 - 0.6]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Cartesian plane: slope as rise over run
// ---------------------------------------------------------------------------
export const cartesian_slope_wave = {
  camera: { kind: '2d', x: [-7.5, 7.5], y: [-4.5, 4.5] },
  params: [
    { key: 'm', label: 'Slope m', min: -3, max: 3, step: 0.25, value: 1 },
    { key: 'b', label: 'Intercept b', min: -3, max: 3, step: 0.5, value: 0 },
    { key: 'x0', label: 'Slide the triangle (x)', min: -4, max: 3, step: 0.5, value: 1 },
  ],
  beats: [
    { say: 'Descartes: every point is an address (x, y). y = x is the diagonal.', set: { m: 1, b: 0, x0: 1 } },
    { say: 'Slope m: walk 1 to the right, climb m. Here m = 2, so the climb is 2 everywhere.', set: { m: 2, b: 0, x0: -1 } },
    { say: 'b lifts the whole line. Negative m tilts it downhill.', set: { m: -0.5, b: 2, x0: 2 } },
  ],
  readout: (t) => [
    ['Line', `y = ${t.m}x + ${t.b}`],
    ['Rise for run of 1', t.m],
    ['Crosses y-axis at', `(0, ${t.b})`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [-7, 7, 1], y: [-4, 4, 1] });
    const ln = kit.curve((x) => x, [-7, 7], { plane: P, color: C.blue, width: 4, clipY: [-4.5, 4.5] });
    const run = kit.line([[0, 0], [1, 0]], { color: C.yellow, width: 3, create: false });
    const rise = kit.line([[0, 0], [0, 1]], { color: C.green, width: 3, create: false });
    const runL = kit.label('1', [0, 0], { color: C.yellow });
    const riseL = kit.label('m', [0, 0], { color: C.green, align: 'left' });
    const bDot = kit.dot([0, 0], { r: 0.12, color: C.red });
    const eq = kit.label('', [-4.6, 3.6], { size: 26 });
    return (p, t) => {
      const f = (x) => p.m * x + p.b;
      ln.set(f);
      const y0 = f(p.x0);
      run.set([[p.x0, y0], [p.x0 + 1, y0]]);
      rise.set([[p.x0 + 1, y0], [p.x0 + 1, f(p.x0 + 1)]]);
      runL.pos([p.x0 + 0.5, y0 - 0.3]);
      riseL.set(`${t.m}`).pos([p.x0 + 1.15, y0 + p.m / 2]);
      bDot.set([0, p.b]);
      eq.set(`y = ${poly([[t.m, 'x'], [t.b, '']])}`);
    };
  },
};
