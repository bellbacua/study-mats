// Scenes for the Biomolecular Engineering side topic.
import { C } from '../theme';
import { range } from '../kit';

const r0 = (v) => `${Math.round(v)}`;
const r1 = (v) => `${Math.round(v * 10) / 10}`;
const r2 = (v) => `${Math.round(v * 100) / 100}`;
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const pow10 = (e) => `10${String(Math.floor(e)).replace(/./g, (c) => SUP[c] ?? c)}`;
// Large numbers as "3.2 × 10⁴⁵", small ones written out.
const big = (log10) => {
  if (log10 < 6) return Math.round(10 ** log10).toLocaleString('en-US');
  const e = Math.floor(log10);
  return `${r1(10 ** (log10 - e))} × ${pow10(e)}`;
};
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const circle = (cx, cy, R, n = 72) => range(0, 2 * Math.PI, n).map((a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)]);

// ---------------------------------------------------------------------------
// Why cells stay small: surface against volume
// ---------------------------------------------------------------------------
export const cell_surface = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the smallest cell radius at which each cubic micrometre of the cell gets only 0.3 µm² of surface or less.',
  goal: (t) => t.r === 10,
  params: [{ key: 'r', label: 'Cell radius (µm)', min: 1, max: 30, step: 1, value: 2 }],
  beats: [
    { say: 'A bacterium-sized cell, 1 µm across the radius: 3 µm² of surface for every µm³ inside. Food has an easy way in.', set: { r: 1 } },
    { say: 'A typical animal cell, 10 µm: the ratio has fallen to 0.3. Ten times less surface per part of inside.', set: { r: 10 } },
    { say: 'At 30 µm the ratio is 0.1. The middle of the cell would struggle to get enough oxygen and food.', set: { r: 30 } },
  ],
  readout: (p) => [
    ['Surface 4πr²', `${r0(4 * Math.PI * p.r ** 2)} µm²`],
    ['Volume (4/3)πr³', `${r0((4 / 3) * Math.PI * p.r ** 3)} µm³`],
    ['Surface ÷ volume = 3/r', `${r2(3 / p.r)} per µm`],
  ],
  setup(kit) {
    const cx = -4.3;
    const cy = 0;
    const body = kit.fill(circle(cx, cy, 1), { color: C.green, opacity: 0.25 });
    const wall = kit.line(circle(cx, cy, 1), { color: C.green, width: 3 });
    const nucleus = kit.fill(circle(cx, cy, 0.3), { color: C.purple, opacity: 0.5 });
    const arrows = range(0, 2 * Math.PI, 9)
      .slice(0, 8)
      .map(() => kit.arrow([0, 0], [0, 0], { color: C.yellow, width: 2, head: 0.2 }));
    kit.label('\\text{food and oxygen enter through the surface}', [cx, -4.0], { size: 12, color: C.yellow });
    const P = kit.plane({ x: [0, 30, 5], y: [0, 3.5, 0.5], sx: 7 / 30, sy: 2, origin: [0.4, -3.5], axisAt: [0, 0], xEvery: 5, yEvery: 0.5, xLabel: '\\text{radius (µm)}', yLabel: '\\text{surface ÷ volume}' });
    kit.line(range(1, 30, 200).map((r) => P.toW(r, 3 / r)), { color: C.blue, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    return (p) => {
      const R = 0.1 + 0.11 * p.r;
      body.set(circle(cx, cy, R));
      wall.set(circle(cx, cy, R));
      nucleus.set(circle(cx, cy, R * 0.3));
      const hue = Math.min(1, 3 / p.r);
      body.color(hue > 0.29 ? C.green : hue > 0.15 ? C.gold : C.red);
      wall.color(hue > 0.29 ? C.green : hue > 0.15 ? C.gold : C.red);
      arrows.forEach((a, i) => {
        const ang = (i / 8) * 2 * Math.PI + 0.3;
        const out = R + 0.6;
        a.set([cx + out * Math.cos(ang), cy + out * Math.sin(ang)], [cx + (R + 0.05) * Math.cos(ang), cy + (R + 0.05) * Math.sin(ang)]);
      });
      dot.set(P.toW(p.r, 3 / p.r));
    };
  },
};

// ---------------------------------------------------------------------------
// How many proteins are possible: 20^n
// ---------------------------------------------------------------------------
const AA_COLORS = [C.blue, C.teal, C.green, C.yellow, C.gold, C.red, C.maroon, C.purple, C.pink, 0x9fb4c7];
export const protein_chain = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the shortest chain for which there are more possible proteins than atoms in the observable universe (about 10⁸⁰).',
  goal: (t) => t.n === 62,
  params: [{ key: 'n', label: 'Chain length (amino acids)', min: 1, max: 100, step: 1, value: 3 }],
  beats: [
    { say: 'Three amino acids, 20 choices each: 20 × 20 × 20 = 8000 different chains.', set: { n: 3 } },
    { say: '62 amino acids: about 10⁸⁰ possibilities, as many as the atoms in the observable universe. A small protein.', set: { n: 62 } },
    { say: '100 amino acids, still a small protein: about 10¹³⁰ possibilities. Nature has tried only a tiny fraction.', set: { n: 100 } },
  ],
  readout: (p) => [
    ['Amino acids', `${p.n}`],
    ['Possible chains 20ⁿ', big(p.n * Math.log10(20))],
    ['Mass, about 110 per amino acid', `${(110 * p.n).toLocaleString('en-US')} daltons`],
  ],
  setup(kit) {
    const rand = rng(11);
    const pos = [];
    for (let i = 0; i < 100; i++) {
      const row = Math.floor(i / 10);
      const col = row % 2 ? 9 - (i % 10) : i % 10;
      pos.push([-7.4 + col * 0.5, 3.4 - row * 0.65]);
    }
    const bond = kit.line([], { color: C.grey, width: 2, create: false });
    const beads = pos.map((q) => kit.dot(q, { r: 0.17, color: AA_COLORS[Math.floor(rand() * AA_COLORS.length)], z: 4 }));
    kit.label('\\text{each bead: one of 20 amino acids}', [-5.15, -3.9], { size: 12 });
    const P = kit.plane({ x: [0, 100, 20], y: [0, 140, 20], sx: 0.088, sy: 0.05, origin: [-1.2, -3.5], axisAt: [0, 0], xEvery: 20, yEvery: 20, fmt: (v, a) => (a === 'y' ? (v ? pow10(v) : '1') : `${v}`), xLabel: '\\text{chain length}', yLabel: '\\text{possible chains}' });
    kit.line([P.toW(0, 0), P.toW(100, 130.1)], { color: C.blue, width: 3 });
    kit.line([P.toW(0, 80), P.toW(100, 80)], { color: C.red, width: 2, dashed: true });
    kit.label('\\text{atoms in the universe} \\approx 10^{80}', P.toW(22, 86), { size: 12, color: C.red });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    return (p) => {
      beads.forEach((b, i) => b.visible(i < p.n));
      bond.set(pos.slice(0, p.n));
      dot.set(P.toW(p.n, p.n * Math.log10(20)));
    };
  },
};

// ---------------------------------------------------------------------------
// DNA pairing and melting
// ---------------------------------------------------------------------------
const BASE_COLOR = { A: C.red, T: C.gold, G: C.blue, C: C.green };
const PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
const dnaStrand = (g) => {
  const rand = rng(7);
  const order = range(0, 19, 20).map((i) => ({ i: Math.round(i), k: rand() }));
  order.sort((a, b) => a.k - b.k);
  const gc = new Set(order.slice(0, g).map((o) => o.i));
  const pick = rng(3);
  return range(0, 19, 20).map((i) => {
    const j = Math.round(i);
    const flip = pick() < 0.5;
    if (gc.has(j)) return flip ? 'G' : 'C';
    return flip ? 'A' : 'T';
  });
};
export const dna_pairs = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Design a 20-base strand that melts at 60 °C by the quick rule Tm ≈ 2(A+T) + 4(G+C).',
  goal: (t) => t.g === 10,
  params: [{ key: 'g', label: 'G or C bases (out of 20)', min: 0, max: 20, step: 1, value: 4 }],
  beats: [
    { say: 'Mostly A and T: only two hydrogen bonds per rung. Tm ≈ 48 °C, easy to pull apart.', set: { g: 4 } },
    { say: 'Half G and C: Tm ≈ 60 °C, a common target for PCR primers.', set: { g: 10 } },
    { say: 'All G and C: three bonds on every rung, Tm ≈ 80 °C. Notice the partner strand always follows the pairing rule.', set: { g: 20 } },
  ],
  readout: (p) => [
    ['G + C', `${p.g} of 20 (${p.g * 5}%)`],
    ['%A = %T, %G = %C', `${(20 - p.g) * 2.5}% each, ${p.g * 2.5}% each`],
    ['Tm ≈ 2(A+T) + 4(G+C)', `${2 * (20 - p.g) + 4 * p.g} °C`],
  ],
  setup(kit) {
    const xs = range(-7.1, 7.1, 20);
    const yTop = 2.2;
    const yBot = -0.6;
    kit.line([[-7.4, yTop + 0.15], [7.4, yTop + 0.15]], { color: C.axis, width: 4 });
    kit.line([[-7.4, yBot - 0.15], [7.4, yBot - 0.15]], { color: C.axis, width: 4 });
    kit.label('\\text{strand 1}', [-7.0, yTop + 0.75], { size: 12 });
    kit.label('\\text{partner strand}', [-6.6, yBot - 0.75], { size: 12 });
    const mid = (yTop + yBot) / 2;
    const rungs = xs.map((x) => ({
      top: kit.line([[x, yTop], [x, mid]], { color: C.red, width: 6 }),
      bot: kit.line([[x, mid], [x, yBot]], { color: C.gold, width: 6 }),
      tl: kit.label('A', [x, yTop + 0.45], { size: 13, tex: false }),
      bl: kit.label('T', [x, yBot - 0.45], { size: 13, tex: false }),
      h: [0, 1, 2].map((k) => kit.dot([x + 0.16, mid + (k - 1) * 0.32], { r: 0.06, color: C.white, z: 6 })),
    }));
    kit.label('\\text{white dots: hydrogen bonds (A–T: 2, G–C: 3)}', [0, -1.75], { size: 12 });
    // melting meter
    const x0 = -4.2;
    const scale = 11 / 90;
    kit.rect(x0, -3.4, 11, 0.5, { color: 0x1f2630, strokeColor: C.grey, width: 1, opacity: 1 });
    const bar = kit.rect(x0, -3.4, 1, 0.5, { color: C.red, stroke: false, opacity: 0.8, z: 2 });
    kit.line([[x0 + 60 * scale, -3.6], [x0 + 60 * scale, -2.7]], { color: C.white, width: 2, dashed: true });
    kit.label('60\\,^\\circ\\text{C}', [x0 + 60 * scale, -2.45], { size: 12 });
    kit.label('\\text{melting temperature}', [x0 - 0.1, -3.15], { size: 12, align: 'right' });
    return (p) => {
      const seq = dnaStrand(p.g);
      seq.forEach((b, i) => {
        const r = rungs[i];
        const pb = PAIR[b];
        r.top.color(BASE_COLOR[b]);
        r.bot.color(BASE_COLOR[pb]);
        r.tl.set(b).color(BASE_COLOR[b]);
        r.bl.set(pb).color(BASE_COLOR[pb]);
        const three = b === 'G' || b === 'C';
        r.h.forEach((d, k) => d.visible(three || k < 2).set([xs[i] + 0.16, mid + (three ? k - 1 : k - 0.5) * 0.32]));
      });
      const tm = 2 * (20 - p.g) + 4 * p.g;
      bar.set(x0, -3.4, tm * scale, 0.5).color(tm >= 60 ? C.red : C.gold);
    };
  },
};

// ---------------------------------------------------------------------------
// Reading codons
// ---------------------------------------------------------------------------
const AAS = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const ORDER = 'UCAG';
const AA3 = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'Stop', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
const aaOf = (c) => AAS[ORDER.indexOf(c[0]) * 16 + ORDER.indexOf(c[1]) * 4 + ORDER.indexOf(c[2])];
const MRNA = 'AUGGCUUUUAAAUGGGGCCAUGAAUAA';
const mutate = (m) => {
  const s = MRNA.split('');
  if (m === 'sub') s[9] = 'G';
  if (m === 'ins') s.splice(7, 0, 'G');
  if (m === 'del') s.splice(7, 1);
  return s;
};
const translate = (seq, frame) => {
  const out = [];
  for (let i = frame; i + 3 <= seq.length; i += 3) {
    const a = aaOf(seq.slice(i, i + 3).join(''));
    out.push({ at: i, aa: a });
    if (a === '*') break;
  }
  return out;
};
export const codon_reader = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Read from the start (frame 1) and find a one-letter change that scrambles every amino acid after it.',
  goal: (t) => t.frame === '0' && (t.mut === 'ins' || t.mut === 'del'),
  params: [
    { key: 'frame', label: 'Start reading at letter', type: 'choice', value: '0', options: [{ value: '0', label: '1 (the real start, AUG)' }, { value: '1', label: '2' }, { value: '2', label: '3' }] },
    { key: 'mut', label: 'Mutation', type: 'choice', value: 'none', options: [{ value: 'none', label: 'None' }, { value: 'sub', label: 'Swap one letter (A→G)' }, { value: 'ins', label: 'Insert one letter (G)' }, { value: 'del', label: 'Delete one letter' }] },
  ],
  beats: [
    { say: 'Read in threes from AUG: Met, Ala, Phe, Lys, Trp, Gly, His, Glu, then UAA means stop.', set: { frame: '0', mut: 'none' } },
    { say: 'Start one letter later and the same message reads as a different, wrong protein.', set: { frame: '1', mut: 'none' } },
    { say: 'Swap one letter: only one amino acid changes (Lys becomes Glu).', set: { frame: '0', mut: 'sub' } },
    { say: 'Insert one letter: every word after it is cut in a new place, and here a stop signal appears early. Frameshift.', set: { frame: '0', mut: 'ins' } },
  ],
  readout: (p) => {
    const ref = translate(MRNA.split(''), 0).map((c) => c.aa);
    const got = translate(mutate(p.mut), Number(p.frame)).map((c) => c.aa);
    const diff = got.filter((a, i) => a !== ref[i]).length + Math.max(0, ref.length - got.length);
    return [
      ['Protein', got.map((a) => AA3[a]).join('–')],
      ['Amino acids before stop', `${got.filter((a) => a !== '*').length}${got.at(-1) === '*' ? '' : ' (no stop reached)'}`],
      ['Positions different from normal', `${diff}`],
    ];
  },
  setup(kit) {
    const dx = 0.5;
    const x0 = -7.0;
    const yL = 1.7;
    const letters = range(0, 28, 29).map((i) => kit.label('A', [x0 + i * dx, yL], { size: 16, tex: false }));
    const boxes = range(0, 9, 10).map(() => kit.rect(0, 0, 1, 1, { color: C.blue, opacity: 0.12, strokeColor: C.blue, width: 1.5 }));
    const aas = range(0, 9, 10).map(() => kit.label('', [0, 0], { size: 14, tex: false }));
    kit.label('\\text{messenger RNA, read three letters at a time}', [0, 3.1], { size: 13 });
    kit.label('\\text{amino acids}', [0, -1.4], { size: 13 });
    const colorOf = { A: C.red, U: C.gold, G: C.blue, C: C.green };
    return (p) => {
      const seq = mutate(p.mut);
      const changed = p.mut === 'sub' ? 9 : p.mut === 'ins' ? 7 : -1;
      letters.forEach((l, i) => {
        const b = seq[i];
        l.visible(Boolean(b));
        if (b) l.set(b).color(i === changed ? C.white : colorOf[b]).pos([x0 + i * dx, yL]);
      });
      const cod = translate(seq, Number(p.frame));
      boxes.forEach((r, k) => {
        const c = cod[k];
        r.visible(Boolean(c));
        if (c) r.set(x0 + c.at * dx - 0.22, yL - 0.42, 3 * dx - 0.06, 0.84).color(c.aa === '*' ? C.red : C.blue);
      });
      aas.forEach((l, k) => {
        const c = cod[k];
        l.visible(Boolean(c));
        if (c) l.set(AA3[c.aa]).color(c.aa === '*' ? C.red : C.text).pos([x0 + (c.at + 1) * dx, 0.1 - (k % 2) * 0.55]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Levinthal: a blind search through shapes
// ---------------------------------------------------------------------------
const UNIVERSE = Math.log10(4.35e17);
const searchLog = (n) => n * Math.log10(3) - 13;
const human = (lg) => {
  if (lg < 0) return `${r2(10 ** lg * 1000)} ms`;
  if (lg < Math.log10(3600 * 24 * 365)) return `${big(lg)} seconds`;
  const yrs = lg - Math.log10(3.156e7);
  return `${big(yrs)} years`;
};
export const levinthal_search = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the shortest chain for which a blind search would take longer than the age of the universe.',
  goal: (t) => t.n === 65,
  params: [{ key: 'n', label: 'Chain length (amino acids)', min: 10, max: 150, step: 1, value: 20 }],
  beats: [
    { say: '20 amino acids, 3 shapes each: about 3.5 billion shapes. A blind search takes a third of a millisecond.', set: { n: 20 } },
    { say: '65 amino acids: the blind search would outlast the universe.', set: { n: 65 } },
    { say: '150 amino acids, an average protein: 10⁵⁸ seconds. Yet real proteins fold in milliseconds to seconds, so folding cannot be a blind search.', set: { n: 150 } },
  ],
  readout: (p) => [
    ['Possible shapes 3ⁿ', big(p.n * Math.log10(3))],
    ['Blind search at 10¹³ shapes per second', human(searchLog(p.n))],
    ['Compared with the age of the universe', searchLog(p.n) > UNIVERSE ? `${big(searchLog(p.n) - UNIVERSE)} times longer` : 'shorter'],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 150, 25], y: [-10, 60, 10], sx: 13.5 / 150, sy: 7.2 / 70, origin: [-6.5, -3.6 + 10 * (7.2 / 70)], axisAt: [0, -10], xEvery: 25, yEvery: 10, fmt: (v, a) => (a === 'y' ? `${pow10(v)} s` : `${v}`), xLabel: '\\text{chain length}', yLabel: '\\text{blind search time}' });
    kit.line([P.toW(10, searchLog(10)), P.toW(150, searchLog(150))], { color: C.blue, width: 3 });
    kit.line([P.toW(0, UNIVERSE), P.toW(150, UNIVERSE)], { color: C.red, width: 2, dashed: true });
    kit.label('\\text{age of the universe}', P.toW(18, UNIVERSE + 3.5), { size: 12, color: C.red });
    kit.line([P.toW(0, 0), P.toW(150, 0)], { color: C.green, width: 2, dashed: true });
    kit.label('\\text{1 second: real folding happens below here}', P.toW(105, -4.5), { size: 12, color: C.green });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    return (p) => {
      dot.set(P.toW(p.n, searchLog(p.n))).color(searchLog(p.n) > UNIVERSE ? C.red : C.white);
    };
  },
};

// ---------------------------------------------------------------------------
// Michaelis–Menten
// ---------------------------------------------------------------------------
const mm = (p) => (p.Vmax * p.S) / (p.Km + p.S);
export const michaelis_menten = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With Km = 5 mM and Vmax = 100, find the substrate level that gives exactly 90% of the top speed.',
  goal: (t) => t.Km === 5 && t.Vmax === 100 && t.S === 45,
  params: [
    { key: 'S', label: 'Substrate [S] (mM)', min: 0, max: 50, step: 0.5, value: 2 },
    { key: 'Km', label: 'Km (mM)', min: 0.5, max: 20, step: 0.5, value: 5 },
    { key: 'Vmax', label: 'Vmax (top speed)', min: 10, max: 100, step: 5, value: 100 },
  ],
  beats: [
    { say: 'At low substrate the speed rises almost in proportion: double [S], nearly double the speed.', set: { S: 2, Km: 5, Vmax: 100 } },
    { say: 'At [S] = Km = 5 mM the enzyme runs at exactly half its top speed. That is the meaning of Km.', set: { S: 5, Km: 5, Vmax: 100 } },
    { say: 'At [S] = 45 mM, nine times Km, it reaches 90%. Every enzyme is nearly always busy; more feed barely helps.', set: { S: 45, Km: 5, Vmax: 100 } },
  ],
  readout: (p) => [
    ['Speed v', `${r1(mm(p))}`],
    ['Share of top speed', `${r0((100 * mm(p)) / p.Vmax)}%`],
    ['[S] ÷ Km', `${r2(p.S / p.Km)}`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 50, 10], y: [0, 100, 20], sx: 13.5 / 50, sy: 7 / 100, origin: [-6.5, -3.5], axisAt: [0, 0], xEvery: 10, yEvery: 20, xLabel: '[S]\\ (\\text{mM})', yLabel: '\\text{speed } v' });
    const curve = kit.curve((s) => s, [0, 50], { plane: P, color: C.blue, width: 3 });
    const top = kit.line([], { color: C.red, width: 2, dashed: true, create: false });
    const topL = kit.label('V_{\\max}', [0, 0], { size: 14, color: C.red });
    const km = kit.line([], { color: C.gold, width: 2, dashed: true, create: false });
    const kmL = kit.label('K_m', [0, 0], { size: 14, color: C.gold });
    const half = kit.dot([0, 0], { r: 0.1, color: C.gold, z: 5 });
    const drop = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    return (p) => {
      curve.set((s) => (p.Vmax * s) / (p.Km + s));
      top.set([P.toW(0, p.Vmax), P.toW(50, p.Vmax)]);
      topL.pos(P.toW(47, p.Vmax + 6));
      km.set([P.toW(p.Km, 0), P.toW(p.Km, p.Vmax / 2)]);
      kmL.pos(P.toW(p.Km + 1.5, 6));
      half.set(P.toW(p.Km, p.Vmax / 2));
      drop.set([P.toW(p.S, 0), P.toW(p.S, mm(p))]);
      dot.set(P.toW(p.S, mm(p)));
    };
  },
};

// ---------------------------------------------------------------------------
// Batch growth in a bioreactor
// ---------------------------------------------------------------------------
const K = 10;
const X0 = 0.005;
const growth = (mu, t) => K / (1 + (K / X0 - 1) * Math.exp(-mu * t));
export const batch_growth = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With a growth rate of 0.5 per hour, find the time when the culture reaches half its final amount (5 g/L).',
  goal: (t) => Math.abs(t.mu - 0.5) < 1e-6 && Math.abs(growth(t.mu, t.t) - K / 2) < 0.4,
  params: [
    { key: 'mu', label: 'Growth rate μ (per hour)', min: 0.1, max: 1, step: 0.05, value: 0.5 },
    { key: 't', label: 'Time (hours)', min: 0, max: 30, step: 0.5, value: 4 },
  ],
  beats: [
    { say: 'Early on the cells are too few to see: 0.005 g/L doubling every 1.4 hours.', set: { mu: 0.5, t: 4 } },
    { say: 'Exponential growth catches up fast: by about 15 hours the tank is half full of cells.', set: { mu: 0.5, t: 15 } },
    { say: 'Then the food runs out and growth stops at 10 g/L. A faster-growing strain gets there sooner, but not higher.', set: { mu: 0.8, t: 25 } },
  ],
  readout: (p) => {
    const x = growth(p.mu, p.t);
    return [
      ['Cells', `${r2(x)} g/L`],
      ['Doubling time ln 2 / μ', `${r2(Math.LN2 / p.mu)} h`],
      ['Sugar left (2 g of sugar per g of cells)', `${r1(Math.max(0, 20 - 2 * x))} g/L`],
    ];
  },
  setup(kit) {
    // a stirred tank whose colour thickens with the cells
    const tx = -7.3;
    kit.rect(tx, -2.6, 1.9, 4.6, { fill: false, color: C.axis, width: 2 });
    const broth = kit.rect(tx + 0.05, -2.55, 1.8, 3.9, { color: C.gold, stroke: false, opacity: 0.1 });
    kit.line([[tx + 0.95, 2.6], [tx + 0.95, -1.8]], { color: C.axis, width: 2 });
    kit.line([[tx + 0.45, -1.6], [tx + 1.45, -1.4]], { color: C.axis, width: 3 });
    kit.label('\\text{bioreactor}', [tx + 0.95, -3.1], { size: 12 });
    const bubbles = range(0, 7, 8).map((i) => kit.dot([tx + 0.3 + (i % 4) * 0.4, -2.2 + i * 0.45], { r: 0.06, color: C.white, opacity: 0.6 }));
    const P = kit.plane({ x: [0, 30, 5], y: [0, 10, 2], sx: 11.5 / 30, sy: 7 / 10, origin: [-4, -3.5], axisAt: [0, 0], xEvery: 5, yEvery: 2, xLabel: '\\text{hours}', yLabel: '\\text{cells (g/L)}' });
    const curve = kit.curve((t) => growth(0.5, t), [0, 30], { plane: P, color: C.gold, width: 3 });
    kit.line([P.toW(0, 5), P.toW(30, 5)], { color: C.grey, width: 1.5, dashed: true });
    kit.label('\\text{half full}', P.toW(28, 5.5), { size: 12 });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    return (p, t, time) => {
      curve.set((s) => growth(p.mu, s));
      const x = growth(p.mu, p.t);
      dot.set(P.toW(p.t, x));
      broth.opacity(0.1 + 0.7 * (x / K));
      bubbles.forEach((b, i) => {
        const y = -2.3 + (((time ?? 0) * 0.8 + i * 0.5) % 3.6);
        b.set([tx + 0.3 + (i % 4) * 0.4, y]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// PCR: copies pile up
// ---------------------------------------------------------------------------
const pcrLog = (n, E) => n * Math.log10(1 + E);
export const pcr_cycles = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'At 90% efficiency, find the first cycle at which one starting copy has become at least a billion (10⁹).',
  goal: (t) => Math.abs(t.E - 0.9) < 0.01 && t.n === 33,
  params: [
    { key: 'n', label: 'Cycles', min: 0, max: 40, step: 1, value: 5 },
    { key: 'E', label: 'Efficiency (1 = perfect doubling)', min: 0.5, max: 1, step: 0.05, value: 1 },
  ],
  beats: [
    { say: 'Five perfect cycles: 1 → 2 → 4 → 8 → 16 → 32 copies.', set: { n: 5, E: 1 } },
    { say: 'Thirty perfect cycles: over a billion copies, in about an hour or two of heating and cooling.', set: { n: 30, E: 1 } },
    { say: 'Real reactions are less than perfect. At 90% efficiency it takes 33 cycles to pass a billion.', set: { n: 33, E: 0.9 } },
  ],
  readout: (p) => [
    ['Copies (1 + E)ⁿ', big(pcrLog(p.n, p.E))],
    ['Growth per cycle', `× ${r2(1 + p.E)}`],
    ['Detectable (≥ 10⁹)?', pcrLog(p.n, p.E) >= 9 ? 'yes' : 'not yet'],
  ],
  setup(kit) {
    // one cycle's temperature profile
    const bx = -6.6;
    const by = 2.4;
    const T = (c) => by + ((c - 50) / 50) * 1.8;
    kit.line([[bx, T(95)], [bx + 1.2, T(95)], [bx + 1.5, T(55)], [bx + 2.7, T(55)], [bx + 3.0, T(72)], [bx + 4.2, T(72)]], { color: C.red, width: 3 });
    kit.label('95\\,^\\circ\\text{C separate}', [bx + 0.6, T(95) + 0.35], { size: 11 });
    kit.label('55\\,^\\circ\\text{C primers}', [bx + 2.1, T(55) - 0.35], { size: 11 });
    kit.label('72\\,^\\circ\\text{C copy}', [bx + 3.6, T(72) + 0.35], { size: 11 });
    kit.label('\\text{one cycle}', [bx + 2.1, T(100) + 0.75], { size: 12, color: C.gold });
    const P = kit.plane({ x: [0, 40, 5], y: [0, 12, 3], sx: 7.5 / 40, sy: 6 / 12, origin: [0, -3.6], axisAt: [0, 0], xEvery: 5, yEvery: 3, fmt: (v, a) => (a === 'y' ? (v ? pow10(v) : '1') : `${v}`), xLabel: '\\text{cycles}', yLabel: '\\text{copies}' });
    kit.line([P.toW(0, 9), P.toW(40, 9)], { color: C.green, width: 2, dashed: true });
    kit.label('\\text{a billion: detectable}', P.toW(10, 9.6), { size: 12, color: C.green });
    const ideal = kit.line([P.toW(0, 0), P.toW(40, 40 * Math.log10(2))], { color: C.grey, width: 1.5, dashed: true });
    ideal.set([P.toW(0, 0), P.toW(12 / Math.log10(2), 12)]);
    const curve = kit.line([], { color: C.blue, width: 3, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.white, z: 6 });
    // strands doubling on the left
    const strands = range(0, 31, 32).map((i) => kit.line([[-7.3 + (i % 8) * 0.8, -0.2 - Math.floor(i / 8) * 0.8], [-6.8 + (i % 8) * 0.8, -0.2 - Math.floor(i / 8) * 0.8]], { color: C.blue, width: 3 }));
    const more = kit.label('', [-4.4, -3.6], { size: 12, tex: false });
    return (p) => {
      const top = Math.min(40, 12 / Math.log10(1 + p.E));
      curve.set([P.toW(0, 0), P.toW(top, pcrLog(top, p.E))]);
      dot.set(P.toW(p.n, Math.min(12, pcrLog(p.n, p.E))));
      const count = 10 ** pcrLog(p.n, p.E);
      strands.forEach((s, i) => s.visible(i < Math.min(32, Math.round(count))));
      more.set(count > 32 ? `showing 32 of ${big(pcrLog(p.n, p.E))}` : `${Math.round(count)} copies`);
    };
  },
};

// ---------------------------------------------------------------------------
// Chromatography: two peaks and resolution
// ---------------------------------------------------------------------------
const W10 = 0.8;
const peaks = (L) => {
  const t1 = 0.4 * L;
  const t2 = 0.5 * L;
  const w = W10 * Math.sqrt(L / 10);
  return { t1, t2, w, rs: (2 * (t2 - t1)) / (2 * w) };
};
const gauss = (t, mu, w) => 0.7 * (W10 / w) * Math.exp(-0.5 * ((t - mu) / (w / 4)) ** 2);
export const column_peaks = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the shortest column that fully separates the two proteins (resolution at least 1.5).',
  goal: (t) => peaks(t.L).rs >= 1.5 && peaks(t.L - 1).rs < 1.5,
  params: [{ key: 'L', label: 'Column length (cm)', min: 5, max: 30, step: 1, value: 6 }],
  beats: [
    { say: 'A short 6 cm column: the two peaks overlap. You cannot collect one without the other.', set: { L: 6 } },
    { say: 'At 15 cm the gap grows faster than the peaks spread: resolution passes 1.5, baseline separation.', set: { L: 15 } },
    { say: '30 cm separates them even better, but the run takes twice as long and needs more pressure.', set: { L: 30 } },
  ],
  readout: (p) => {
    const k = peaks(p.L);
    return [
      ['Protein 1 / protein 2 come out at', `${r1(k.t1)} / ${r1(k.t2)} min`],
      ['Peak width', `${r2(k.w)} min`],
      ['Resolution Rs', `${r2(k.rs)} ${k.rs >= 1.5 ? '(fully separated)' : '(overlapping)'}`],
    ];
  },
  setup(kit) {
    const col = kit.rect(-7, 2.7, 4, 0.55, { color: 0x6b7a8c, opacity: 0.35, strokeColor: C.axis, width: 1.5 });
    kit.label('\\text{column, packed with beads}', [-7, 3.65], { size: 12, align: 'left' });
    const b1 = kit.rect(-7, 2.75, 0.2, 0.45, { color: C.blue, stroke: false, opacity: 0.9, z: 3 });
    const b2 = kit.rect(-7, 2.75, 0.2, 0.45, { color: C.gold, stroke: false, opacity: 0.9, z: 3 });
    const P = kit.plane({ x: [0, 16, 2], y: [0, 1.2, 0.2], sx: 14 / 16, sy: 4.6 / 1.2, origin: [-6.8, -3.6], axisAt: [0, 0], xEvery: 2, yEvery: 0.4, xLabel: '\\text{minutes}', yLabel: '\\text{signal}' });
    const c1 = kit.curve((t) => t, [0, 16], { plane: P, color: C.blue, width: 2, samples: 300 });
    const c2 = kit.curve((t) => t, [0, 16], { plane: P, color: C.gold, width: 2, samples: 300 });
    const sum = kit.curve((t) => t, [0, 16], { plane: P, color: C.white, width: 3, samples: 300 });
    return (p, t, time) => {
      const k = peaks(p.L);
      c1.set((s) => gauss(s, k.t1, k.w));
      c2.set((s) => gauss(s, k.t2, k.w));
      sum.set((s) => gauss(s, k.t1, k.w) + gauss(s, k.t2, k.w));
      const len = 0.45 * p.L;
      col.set(-7, 2.7, len, 0.55);
      // bands travel down the column, the slower one behind
      const f = ((time ?? 0) * 0.15) % 1;
      b1.set(-7 + Math.min(len - 0.2, len * f * 1.25), 2.75, 0.2, 0.45);
      b2.set(-7 + Math.min(len - 0.2, len * f), 2.75, 0.2, 0.45);
    };
  },
};

// ---------------------------------------------------------------------------
// A dissolving scaffold and growing tissue
// ---------------------------------------------------------------------------
const HEAL = 12;
const left = (k, t) => 100 * Math.exp(-k * t);
const tissue = (t) => 100 * (1 - Math.exp((-Math.LN2 * t) / HEAL));
export const scaffold_decay = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Bone here heals halfway in 12 weeks. Choose a breakdown rate k so half the scaffold is left at 12 weeks.',
  goal: (t) => Math.abs(Math.LN2 / t.k - HEAL) < 0.5,
  params: [
    { key: 'k', label: 'Breakdown rate k (per week)', min: 0.01, max: 0.2, step: 0.002, value: 0.15 },
    { key: 't', label: 'Week', min: 0, max: 52, step: 1, value: 12 },
  ],
  beats: [
    { say: 'k = 0.15: the scaffold is mostly gone by week 12, while the new tissue is only half grown. The repair would be weak.', set: { k: 0.15, t: 12 } },
    { say: 'k = 0.058: half-life 12 weeks. The scaffold steps aside as fast as the tissue takes over.', set: { k: 0.058, t: 12 } },
    { say: 'k = 0.02: a year later a third of it is still there, in the way of the new bone.', set: { k: 0.02, t: 52 } },
  ],
  readout: (p) => [
    ['Scaffold left', `${r0(left(p.k, p.t))}%`],
    ['New tissue grown', `${r0(tissue(p.t))}%`],
    ['Scaffold half-life ln 2 / k', `${r1(Math.LN2 / p.k)} weeks`],
  ],
  setup(kit) {
    const n = 64;
    const cells = range(0, n - 1, n).map((i) => kit.rect(-7.4 + (i % 8) * 0.4, 2.8 - Math.floor(i / 8) * 0.4, 0.34, 0.34, { color: C.grey, stroke: false, opacity: 0.8 }));
    kit.label('\\text{grey: scaffold}', [-7.4, -0.3], { size: 12, align: 'left', color: C.grey });
    kit.label('\\text{pink: new tissue}', [-7.4, -0.8], { size: 12, align: 'left', color: C.pink });
    const order = range(0, n - 1, n).map((i) => Math.round(i));
    const rand = rng(5);
    order.sort(() => rand() - 0.5);
    const P = kit.plane({ x: [0, 52, 4], y: [0, 100, 20], sx: 10.5 / 52, sy: 7 / 100, origin: [-3.2, -3.5], axisAt: [0, 0], xEvery: 8, yEvery: 20, fmt: (v, a) => (a === 'y' ? `${v}%` : `${v}`), xLabel: '\\text{weeks}', yLabel: '' });
    const sc = kit.curve((t) => t, [0, 52], { plane: P, color: C.axis, width: 3 });
    kit.curve(tissue, [0, 52], { plane: P, color: C.pink, width: 3 });
    kit.line([P.toW(HEAL, 0), P.toW(HEAL, 100)], { color: C.grey, width: 1.5, dashed: true });
    kit.label('\\text{week 12}', P.toW(HEAL, 106), { size: 12 });
    const now = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    const d1 = kit.dot([0, 0], { r: 0.12, color: C.white, z: 6 });
    const d2 = kit.dot([0, 0], { r: 0.12, color: C.pink, z: 6 });
    return (p) => {
      sc.set((t) => left(p.k, t));
      const m = left(p.k, p.t);
      const g = tissue(p.t);
      now.set([P.toW(p.t, 0), P.toW(p.t, 100)]);
      d1.set(P.toW(p.t, m));
      d2.set(P.toW(p.t, g));
      const nS = Math.round((n * m) / 100);
      const nT = Math.round((n * g) / 100);
      order.forEach((idx, j) => {
        const c = cells[idx];
        if (j < nS) c.visible(true).color(C.grey);
        else if (j < nS + nT) c.visible(true).color(C.pink);
        else c.visible(false);
      });
    };
  },
};
