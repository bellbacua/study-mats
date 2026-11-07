import { C } from '../theme';
import { clamp } from '../kit';

const ease = (dt, rate = 5) => 1 - Math.exp(-dt * rate);

// ---------------------------------------------------------------------------
// 20. Water is not an element: electrolysis gives 2 volumes H₂ : 1 volume O₂
// ---------------------------------------------------------------------------
export const electrolysis_water = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.4] },
  params: [
    { key: 'minutes', label: 'Time running (minutes)', min: 0, max: 10, step: 0.5, value: 0 },
    { key: 'amps', label: 'Current (amps)', min: 0, max: 3, step: 0.1, value: 1 },
  ],
  beats: [
    { say: 'For 2,000 years, water was one of the four "elements" with earth, air and fire. Pass electricity through it and see.', set: { minutes: 0, amps: 1.5 } },
    { say: 'Gas bubbles up at both wires. Cavendish and Lavoisier (1780s) had shown water is made of hydrogen and oxygen; in 1800 Nicholson and Carlisle split it with electricity, exactly like this.', set: { minutes: 5, amps: 1.5 } },
    { say: 'Always twice as much hydrogen as oxygen. Water is a compound, H₂O, and its mass is conserved: nothing is created or lost, only rearranged.', set: { minutes: 10, amps: 1.5 } },
  ],
  readout: (t) => {
    // Faraday: mol e⁻ = I·t/F; H₂ needs 2 e⁻, O₂ needs 4 e⁻; 24.5 L/mol at room temperature
    const mol = (t.amps * t.minutes * 60) / 96485;
    const h2 = (mol / 2) * 24.5 * 1000;
    const o2 = (mol / 4) * 24.5 * 1000;
    return [
      ['Hydrogen collected', `${h2.toFixed(1)} mL`],
      ['Oxygen collected', `${o2.toFixed(1)} mL`],
      ['Ratio', t.minutes > 0 ? '2 : 1' : '—'],
      ['Reaction', '2 H₂O → 2 H₂ + O₂'],
    ];
  },
  setup(kit) {
    kit.rect(-5.5, -4, 8, 4.6, { color: C.blue, opacity: 0.12, strokeColor: C.axis, width: 2 });
    const tubes = [-3.6, 0.6].map((x, i) => ({
      x,
      glass: kit.rect(x - 0.6, -2.6, 1.2, 6.4, { fill: false, color: 0x9aa4ad, width: 2 }),
      gas: kit.rect(x - 0.58, 3.78, 1.16, 0, { color: i === 0 ? C.yellow : C.red, opacity: 0.35, stroke: false }),
      label: kit.label(i === 0 ? '\\text{H}_2' : '\\text{O}_2', [x, 4.15], { size: 20, color: i === 0 ? C.yellow : C.red }),
      wire: kit.line([[x, -2.4], [x, -3.9]], { color: C.gold, width: 3, create: false }),
      bubbles: Array.from({ length: i === 0 ? 24 : 12 }, (_, k) => ({ ph: (k * 0.618) % 1, dx: ((k * 0.37) % 1) - 0.5, d: kit.dot([x, 0], { r: 0.06, color: C.white, opacity: 0.7, z: 6 }) })),
      vol: 0,
    }));
    kit.label('−', [-3.6, -4.2], { tex: false, size: 18 });
    kit.label('+', [0.6, -4.2], { tex: false, size: 18 });
    kit.label('2\\,\\text{H}_2\\text{O} \\rightarrow 2\\,\\text{H}_2 + \\text{O}_2', [5.3, 3.4], { size: 20 });
    return (p, _t, time, dt) => {
      const run = p.minutes / 10;
      tubes.forEach((tb, i) => {
        const target = run * (i === 0 ? 4 : 2);
        tb.vol += (target - tb.vol) * ease(dt, 3);
        tb.gas.set(tb.x - 0.58, 3.78 - tb.vol, 1.16, tb.vol);
        const active = p.amps > 0.05 && p.minutes > 0;
        tb.bubbles.forEach((b, k) => {
          const on = active && k < Math.round(tb.bubbles.length * clamp(p.amps / 3, 0, 1));
          const u = (time * (0.25 + p.amps * 0.15) + b.ph) % 1;
          const top = 3.78 - tb.vol;
          const y = -2.3 + u * (top + 2.3);
          b.d.set([tb.x + b.dx * 0.8, y]).visible(on && y < top);
        });
      });
    };
  },
};

// ---------------------------------------------------------------------------
// 23. The periodic table as a 3D landscape of properties
// ---------------------------------------------------------------------------
// [symbol, group, period, electronegativity (Pauling, null for He/Ne/Ar), radius pm]
const PT = [
  ['H', 1, 1, 2.2, 25], ['He', 18, 1, null, 31],
  ['Li', 1, 2, 0.98, 145], ['Be', 2, 2, 1.57, 105], ['B', 13, 2, 2.04, 85], ['C', 14, 2, 2.55, 70],
  ['N', 15, 2, 3.04, 65], ['O', 16, 2, 3.44, 60], ['F', 17, 2, 3.98, 50], ['Ne', 18, 2, null, 38],
  ['Na', 1, 3, 0.93, 180], ['Mg', 2, 3, 1.31, 150], ['Al', 13, 3, 1.61, 125], ['Si', 14, 3, 1.9, 110],
  ['P', 15, 3, 2.19, 100], ['S', 16, 3, 2.58, 100], ['Cl', 17, 3, 3.16, 100], ['Ar', 18, 3, null, 71],
  ['K', 1, 4, 0.82, 220], ['Ca', 2, 4, 1.0, 180], ['Sc', 3, 4, 1.36, 160], ['Ti', 4, 4, 1.54, 140],
  ['V', 5, 4, 1.63, 135], ['Cr', 6, 4, 1.66, 140], ['Mn', 7, 4, 1.55, 140], ['Fe', 8, 4, 1.83, 140],
  ['Co', 9, 4, 1.88, 135], ['Ni', 10, 4, 1.91, 135], ['Cu', 11, 4, 1.9, 135], ['Zn', 12, 4, 1.65, 135],
  ['Ga', 13, 4, 1.81, 130], ['Ge', 14, 4, 2.01, 125], ['As', 15, 4, 2.18, 115], ['Se', 16, 4, 2.55, 115],
  ['Br', 17, 4, 2.96, 115], ['Kr', 18, 4, 3.0, 88],
];
const MISSING_1871 = new Set(['Sc', 'Ga', 'Ge', 'He', 'Ne', 'Ar', 'Kr']);
const family = (sym, g) => {
  if (['He', 'Ne', 'Ar', 'Kr'].includes(sym)) return C.purple;
  if (g === 17) return C.green;
  if (sym === 'H') return 0xdddddd;
  if (g === 1) return C.red;
  if (g === 2) return C.gold;
  if (g >= 3 && g <= 12) return C.blue;
  if (['B', 'Si', 'Ge', 'As'].includes(sym)) return C.teal;
  if (['Al', 'Ga'].includes(sym)) return 0x7fa7c9;
  return C.yellow;
};

export const periodic_table_3d = {
  camera: { kind: '3d', position: [0, 12, 13], target: [0, 0.5, 0.3], fov: 50 },
  params: [
    {
      key: 'prop',
      label: 'Bar height shows',
      type: 'choice',
      value: 'radius',
      options: [
        { value: 'radius', label: 'Atom size' },
        { value: 'en', label: 'Electron greed (electronegativity)' },
        { value: 'z', label: 'Atomic number' },
      ],
    },
    {
      key: 'era',
      label: 'Table as known in',
      type: 'choice',
      value: 'today',
      options: [
        { value: '1871', label: '1871 (Mendeleev)' },
        { value: 'today', label: 'Today' },
      ],
    },
    { key: 'Z', label: 'Highlight element Z', min: 1, max: 36, step: 1, value: 14 },
  ],
  beats: [
    { say: 'Mendeleev (1869) sorted the 63 known elements by weight and noticed properties repeat. In 1871 he left gaps and predicted the missing elements’ properties.', set: { era: '1871', prop: 'z', Z: 31 } },
    { say: 'Gallium (1875), scandium (1879) and germanium (1886) were then discovered with almost exactly the predicted properties. That convinced the world.', set: { era: 'today', prop: 'z', Z: 32 } },
    { say: 'Plot atom size as height: atoms shrink across each row and grow down each column. The table is a map of the outer electrons.', set: { era: 'today', prop: 'radius', Z: 14 } },
  ],
  readout: (t) => {
    const [sym, g, per, en, r] = PT[t.Z - 1];
    return [
      ['Element', `${sym} (Z = ${t.Z})`],
      ['Group / period', `${g} / ${per}`],
      ['Atomic radius', `${r} pm`],
      ['Electronegativity', en ?? '— (noble gas)'],
      ['Known in 1871?', MISSING_1871.has(sym) ? 'No: a gap, or not yet imagined' : 'Yes'],
    ];
  },
  setup(kit) {
    const { THREE } = kit;
    const geo = new THREE.BoxGeometry(0.9, 1, 0.9);
    const cells = PT.map(([sym, g, per], i) => {
      const mat = new THREE.MeshStandardMaterial({ color: family(sym, g), roughness: 0.45, transparent: true, opacity: 1 });
      const m = new THREE.Mesh(geo, mat);
      const x = (g - 9.5) * 1.0;
      const z = (per - 2.5) * 1.2;
      m.position.set(x, 0, z);
      kit.group().add(m);
      const lbl = kit.label(sym, [x, 0.6, z], { tex: false, size: 13 });
      return { sym, i, m, x, z, h: 0.2, lbl };
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 8, 40), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    ring.rotation.x = Math.PI / 2;
    kit.group().add(ring);
    return (_p, t, time, dt) => {
      cells.forEach((c) => {
        const [, , , en, r] = PT[c.i];
        const val = t.prop === 'radius' ? r / 60 : t.prop === 'en' ? (en ?? 0) : (c.i + 1) / 10;
        const missing = t.era === '1871' && MISSING_1871.has(c.sym);
        const target = missing ? 0.05 : Math.max(0.1, val);
        c.h += (target - c.h) * ease(dt, 4);
        c.m.scale.y = c.h;
        c.m.position.y = c.h / 2;
        c.m.material.opacity = missing ? 0.15 : 1;
        c.lbl.pos([c.x, c.h + 0.35, c.z]).set(missing ? '?' : c.sym);
      });
      const sel = cells[t.Z - 1];
      ring.position.set(sel.x, 0.03 + Math.sin(time * 3) * 0.02, sel.z);
    };
  },
};
