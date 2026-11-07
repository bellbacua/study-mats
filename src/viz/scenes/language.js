import { C } from '../theme';

const ease = (dt, rate = 4) => 1 - Math.exp(-dt * rate);

const SETS = [
  { key: 'C', tex: '\\mathbb{C}', name: 'complex', color: C.purple, box: [-7.6, -3.9, 15.2, 7.6] },
  { key: 'R', tex: '\\mathbb{R}', name: 'real', color: C.blue, box: [-6.4, -3.3, 10.6, 6.4] },
  { key: 'Q', tex: '\\mathbb{Q}', name: 'rational (fractions)', color: C.teal, box: [-5.4, -2.7, 7.2, 5.2] },
  { key: 'Z', tex: '\\mathbb{Z}', name: 'integers', color: C.green, box: [-4.5, -2.1, 4.3, 4.0] },
  { key: 'N', tex: '\\mathbb{N}', name: 'natural (counting)', color: C.yellow, box: [-3.7, -1.5, 2.2, 2.8] },
];

const NUMBERS = {
  seven: { tex: '7', home: 'N', at: [-2.6, -0.2] },
  zero: { tex: '0', home: 'Z', at: [-0.9, 0.9] },
  neg: { tex: '-3', home: 'Z', at: [-0.9, -0.9] },
  frac: { tex: '\\tfrac{3}{4}', home: 'Q', at: [0.8, 1.2] },
  third: { tex: '0.333\\ldots', home: 'Q', at: [0.8, -1.1] },
  root2: { tex: '\\sqrt{2}', home: 'R', at: [3.0, 1.2] },
  pi: { tex: '\\pi', home: 'R', at: [3.0, -1.1] },
  complex: { tex: '2 + i', home: 'C', at: [5.6, 0.2] },
};
const ORDER = ['N', 'Z', 'Q', 'R', 'C'];
const inSet = (n, s) => ORDER.indexOf(NUMBERS[n].home) <= ORDER.indexOf(s);

export const number_sets = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.4, 4.6] },
  params: [
    {
      key: 'n',
      label: 'Pick a number',
      type: 'choice',
      value: 'seven',
      options: [
        { value: 'seven', label: '7' },
        { value: 'zero', label: '0' },
        { value: 'neg', label: '−3' },
        { value: 'frac', label: '3/4' },
        { value: 'third', label: '0.333…' },
        { value: 'root2', label: '√2' },
        { value: 'pi', label: 'π' },
        { value: 'complex', label: '2 + i' },
      ],
    },
  ],
  beats: [
    { say: 'The number families nest like boxes inside boxes. 7 is a counting number, so it sits in ℕ, and therefore also in every bigger box: 7 ∈ ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ.', set: { n: 'seven' } },
    { say: '−3 is not a counting number (−3 ∉ ℕ), but it is an integer: −3 ∈ ℤ. Moving outward only ever adds numbers, never removes them.', set: { n: 'neg' } },
    { say: '√2 is real but not a fraction: √2 ∈ ℝ, √2 ∉ ℚ. That gap between ℚ and ℝ is exactly what Hippasus found.', set: { n: 'root2' } },
  ],
  goal: (t) => ['root2', 'pi'].includes(t.n),
  readout: (t) => [
    ...ORDER.map((s) => [`${SETS.find((x) => x.key === s).name}`, inSet(t.n, s) ? '∈  yes' : '∉  no']),
    ['How to read ∈', '"is an element of"'],
  ],
  setup(kit) {
    const boxes = SETS.map((s) => ({
      s,
      r: kit.rect(...s.box, { color: s.color, opacity: 0.06, strokeColor: s.color, width: 2 }),
      l: kit.label(`${s.tex}`, [s.box[0] + 0.35, s.box[1] + s.box[3] - 0.35], { size: 22, color: s.color }),
      glow: 0,
    }));
    const others = Object.entries(NUMBERS).map(([k, v]) => ({ k, l: kit.label(v.tex, v.at, { size: 18 }) }));
    const dot = kit.dot([0, 0], { r: 0.5, color: C.white, opacity: 0.12, z: 3 });
    const statement = kit.label('', [0, 4.25], { size: 22 });
    let pos = [...NUMBERS.seven.at];
    return (_p, t, _time, dt) => {
      const N = NUMBERS[t.n];
      const k = ease(dt);
      pos = [pos[0] + (N.at[0] - pos[0]) * k, pos[1] + (N.at[1] - pos[1]) * k];
      dot.set(pos);
      boxes.forEach((b) => {
        const on = inSet(t.n, b.s.key);
        b.glow += ((on ? 1 : 0) - b.glow) * k;
        b.r.opacity(0.04 + 0.16 * b.glow);
      });
      others.forEach((o) => o.l.opacity(o.k === t.n ? 1 : 0.35).color(o.k === t.n ? C.yellow : ''));
      const home = SETS.find((s) => s.key === N.home);
      const inner = ORDER.slice(0, ORDER.indexOf(N.home)).reverse()[0];
      const notIn = inner ? SETS.find((s) => s.key === inner) : null;
      statement.set(`${N.tex} \\in ${home.tex}${notIn ? ` \\quad\\text{but}\\quad ${N.tex} \\notin ${notIn.tex}` : ''}`);
    };
  },
};
