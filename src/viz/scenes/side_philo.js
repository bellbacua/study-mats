// Scenes for the Philosophy and Logic side topic.
import { C } from '../theme';
import { clamp, range } from '../kit';

const r0 = (v) => `${Math.round(v)}`;
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------------------------------------------------------------------------
// Socrates: a definition against the real thing (two circles)
// ---------------------------------------------------------------------------
const CASES = [
  { name: 'soldier holding the line', real: true },
  { name: 'cavalry retreating to regroup', real: true },
  { name: 'sailor calm in a storm', real: true },
  { name: 'sick person bearing pain', real: true },
  { name: 'speaking the truth in court', real: true },
  { name: 'stubborn gambler', real: false },
  { name: 'doctor refusing a patient food', real: false },
  { name: 'fool diving into a well', real: false },
];
const DEFS = {
  post: { label: 'Laches 1: staying at your post, never running', covers: [0] },
  endure: { label: 'Laches 2: endurance of the soul', covers: [0, 2, 3, 4, 5, 6, 7] },
  wise: { label: 'Socrates’ fix: wise endurance', covers: [0, 2, 3, 4, 6] },
  know: { label: 'Nicias: knowing what is to be feared and dared', covers: [0, 1, 2, 3, 4, 6] },
};
const verdict = (d) => {
  const cov = new Set(DEFS[d].covers);
  const broad = CASES.filter((c, i) => cov.has(i) && !c.real).length;
  const narrow = CASES.filter((c, i) => !cov.has(i) && c.real).length;
  return { broad, narrow };
};

export const socrates_definition = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the definition with the fewest counterexamples. (Even the best one in the dialogue still has one.)',
  goal: (t) => t.d === 'know',
  params: [{ key: 'd', label: 'Definition of courage', type: 'choice', value: 'post', options: Object.entries(DEFS).map(([k, v]) => ({ value: k, label: v.label })) }],
  beats: [
    { say: 'Laches’ first try. It fits the soldier, but four real acts of courage fall outside it: too narrow.', set: { d: 'post' } },
    { say: '"Endurance of the soul" swallows almost everything, including the stubborn gambler and the fool: too broad.', set: { d: 'endure' } },
    { say: 'Nicias’ answer fits best, but the doctor who knows what to fear in illness gets in too. The dialogue ends unsolved.', set: { d: 'know' } },
  ],
  readout: (p) => {
    const v = verdict(p.d);
    return [
      ['Too broad (covered, not courage)', `${v.broad}`],
      ['Too narrow (courage, not covered)', `${v.narrow}`],
      ['Counterexamples in all', `${v.broad + v.narrow}`],
    ];
  },
  setup(kit) {
    const L = [-1.6, -0.3];
    const R = [1.6, -0.3];
    const rad = 3.2;
    const ring = (c) => range(0, Math.PI * 2, 120).map((a) => [c[0] + rad * Math.cos(a), c[1] + rad * Math.sin(a)]);
    kit.fill(ring(L), { color: C.blue, opacity: 0.12 });
    kit.fill(ring(R), { color: C.gold, opacity: 0.12 });
    kit.line(ring(L), { color: C.blue, width: 2 });
    kit.line(ring(R), { color: C.gold, width: 2 });
    kit.label('\\text{what the definition covers}', [L[0] - 1.3, 3.35], { size: 12, color: C.blue });
    kit.label('\\text{what really is courage}', [R[0] + 1.3, 3.35], { size: 12, color: C.gold });
    kit.label('\\text{neither}', [-6.6, 3.35], { size: 11, color: C.grey });
    kit.label('\\text{red = counterexample}', [0, -4.1], { size: 11, color: C.red });
    const dots = CASES.map((c) => ({ c, d: kit.dot([0, 0], { r: 0.13, color: C.white, z: 5 }), t: kit.label(`\\text{${c.name}}`, [0, 0], { size: 10 }) }));
    return (p) => {
      const cov = new Set(DEFS[p.d].covers);
      const slots = { both: [], onlyL: [], onlyR: [], none: [] };
      dots.forEach((o, i) => {
        const k = cov.has(i) && o.c.real ? 'both' : cov.has(i) ? 'onlyL' : o.c.real ? 'onlyR' : 'none';
        slots[k].push(o);
      });
      const place = (list, x, y0, color) =>
        list.forEach((o, j) => {
          const y = y0 - j * 0.62;
          o.d.set([x, y]).color(color);
          o.t.pos([x, y - 0.27]);
        });
      place(slots.both, 0, 1.9, C.green);
      place(slots.onlyL, -3.6, 1.4, C.red);
      place(slots.onlyR, 3.6, 1.4, C.red);
      place(slots.none, -6.6, 2.6, C.grey);
    };
  },
};

// ---------------------------------------------------------------------------
// Syllogisms on a three-circle Venn diagram
// ---------------------------------------------------------------------------
// Regions are named by membership "SMP" bits, e.g. '101' = in S, not in M, in P.
const FORMS = {
  barbara: { label: 'Barbara: All M are P; all S are M ⊢ all S are P', prem: [['all', 'M', 'P'], ['all', 'S', 'M']], concl: ['all', 'S', 'P'] },
  celarent: { label: 'Celarent: No M are P; all S are M ⊢ no S are P', prem: [['no', 'M', 'P'], ['all', 'S', 'M']], concl: ['no', 'S', 'P'] },
  darii: { label: 'Darii: All M are P; some S are M ⊢ some S are P', prem: [['all', 'M', 'P'], ['some', 'S', 'M']], concl: ['some', 'S', 'P'] },
  ferio: { label: 'Ferio: No M are P; some S are M ⊢ some S are not P', prem: [['no', 'M', 'P'], ['some', 'S', 'M']], concl: ['somenot', 'S', 'P'] },
  undist: { label: 'Undistributed middle: All P are M; all S are M ⊢ all S are P', prem: [['all', 'P', 'M'], ['all', 'S', 'M']], concl: ['all', 'S', 'P'] },
  illicit: { label: 'Illicit: All M are P; no S are M ⊢ no S are P', prem: [['all', 'M', 'P'], ['no', 'S', 'M']], concl: ['no', 'S', 'P'] },
};
const IDX = { S: 0, M: 1, P: 2 };
const REGIONS = ['100', '010', '001', '110', '101', '011', '111'];
const inT = (r, t) => r[IDX[t]] === '1';
function analyse(form) {
  const empty = new Set();
  const somes = [];
  for (const [q, a, b] of FORMS[form].prem) {
    if (q === 'all') REGIONS.filter((r) => inT(r, a) && !inT(r, b)).forEach((r) => empty.add(r));
    if (q === 'no') REGIONS.filter((r) => inT(r, a) && inT(r, b)).forEach((r) => empty.add(r));
    if (q === 'some') somes.push([a, b]);
  }
  const xs = somes.map(([a, b]) => REGIONS.filter((r) => inT(r, a) && inT(r, b) && !empty.has(r)));
  const [q, a, b] = FORMS[form].concl;
  let valid;
  if (q === 'all') valid = REGIONS.filter((r) => inT(r, a) && !inT(r, b)).every((r) => empty.has(r));
  else if (q === 'no') valid = REGIONS.filter((r) => inT(r, a) && inT(r, b)).every((r) => empty.has(r));
  else if (q === 'some') valid = xs.some((opts) => opts.length && opts.every((r) => inT(r, a) && inT(r, b)));
  else valid = xs.some((opts) => opts.length && opts.every((r) => inT(r, a) && !inT(r, b)));
  return { empty, xs, valid };
}

export const syllogism_venn = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find an argument form that looks convincing but is invalid.',
  goal: (t) => !analyse(t.form).valid,
  params: [{ key: 'form', label: 'Argument', type: 'choice', value: 'barbara', options: Object.entries(FORMS).map(([k, v]) => ({ value: k, label: v.label })) }],
  beats: [
    { say: 'Barbara. "All M are P" empties the part of M outside P; "all S are M" empties S outside M. All of S outside P is now dark: valid.', set: { form: 'barbara' } },
    { say: 'Darii. The X (something exists) can only sit where S and M overlap inside P. So some S are P: valid.', set: { form: 'darii' } },
    { say: 'The undistributed middle. S and P are both inside M, but S outside P is still open: the conclusion is not guaranteed.', set: { form: 'undist' } },
  ],
  readout: (p) => {
    const a = analyse(p.form);
    return [
      ['Premises', FORMS[p.form].prem.map(([q, x, y]) => `${q === 'all' ? 'All' : q === 'no' ? 'No' : 'Some'} ${x} ${q === 'no' ? 'are' : 'are'} ${y}`).join('; ')],
      ['Verdict', a.valid ? 'Valid: the premises already draw the conclusion' : 'Invalid: a region the conclusion needs is still open'],
    ];
  },
  setup(kit) {
    const cx = 2.2;
    const centres = { S: [cx - 1.15, 0.8], P: [cx + 1.15, 0.8], M: [cx, -1.2] };
    const rad = 2.0;
    const inside = (q, t) => Math.hypot(q[0] - centres[t][0], q[1] - centres[t][1]) < rad;
    const pts = [];
    for (let x = cx - 3.3; x <= cx + 3.3; x += 0.2)
      for (let y = -3.3; y <= 2.9; y += 0.2) {
        const q = [x, y];
        const key = ['S', 'M', 'P'].map((t) => (inside(q, t) ? '1' : '0')).join('');
        if (key !== '000') pts.push({ key, d: kit.dot(q, { r: 0.055, color: C.grey, z: 2 }) });
      }
    const ring = (c) => range(0, Math.PI * 2, 100).map((a) => [c[0] + rad * Math.cos(a), c[1] + rad * Math.sin(a)]);
    const col = { S: C.blue, M: C.green, P: C.gold };
    for (const t of ['S', 'M', 'P']) kit.line(ring(centres[t]), { color: col[t], width: 2.5, z: 3 });
    kit.label('S', [centres.S[0] - 1.9, centres.S[1] + 1.6], { size: 16, color: col.S });
    kit.label('P', [centres.P[0] + 1.9, centres.P[1] + 1.6], { size: 16, color: col.P });
    kit.label('M', [centres.M[0] + 2.1, centres.M[1] - 1.5], { size: 16, color: col.M });
    const centroid = {};
    for (const r of REGIONS) {
      const mine = [];
      for (let x = cx - 3.3; x <= cx + 3.3; x += 0.1)
        for (let y = -3.3; y <= 2.9; y += 0.1) if (['S', 'M', 'P'].map((t) => (inside([x, y], t) ? '1' : '0')).join('') === r) mine.push([x, y]);
      centroid[r] = [mine.reduce((s, q) => s + q[0], 0) / mine.length, mine.reduce((s, q) => s + q[1], 0) / mine.length];
    }
    const xMarks = [0, 1].map(() => kit.label('', [0, 0], { size: 20, color: C.red }));
    const prem = kit.label('', [-7.6, 2.6], { size: 12, align: 'left', tex: false });
    const conc = kit.label('', [-7.6, 1.4], { size: 12, align: 'left', tex: false });
    const verdictL = kit.label('', [-7.6, 0.2], { size: 14, align: 'left', tex: false });
    kit.label('dark dots: the premises say nothing is there', [-7.6, -1.2], { size: 11, align: 'left', tex: false, color: C.axis });
    kit.label('X: something must be there (X? = one of two places)', [-7.6, -1.8], { size: 11, align: 'left', tex: false, color: C.axis });
    return (p) => {
      const a = analyse(p.form);
      for (const q of pts) q.d.color(a.empty.has(q.key) ? 0x2a2f38 : C.grey);
      xMarks.forEach((m, i) => {
        const opts = a.xs[i];
        if (!opts || !opts.length) return m.visible(false);
        const c = opts.map((r) => centroid[r]);
        m.visible(true).set(opts.length > 1 ? '\\text{X?}' : '\\text{X}').pos([c.reduce((s, q) => s + q[0], 0) / c.length, c.reduce((s, q) => s + q[1], 0) / c.length]);
      });
      const f = FORMS[p.form];
      const words = ([q, x, y]) => (q === 'all' ? `All ${x} are ${y}` : q === 'no' ? `No ${x} are ${y}` : q === 'some' ? `Some ${x} are ${y}` : `Some ${x} are not ${y}`);
      prem.set(`Premises: ${f.prem.map(words).join('. ')}.`);
      conc.set(`Conclusion: ${words(f.concl)}.`);
      verdictL.set(a.valid ? '✓ Valid' : '✗ Invalid').color(a.valid ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// Truth tables for "if … then" argument forms
// ---------------------------------------------------------------------------
const imp = (a, b) => !a || b;
const ARGS = {
  mp: { label: 'Modus ponens: P → Q, P ⊢ Q', prem: [['P \\to Q', (P, Q) => imp(P, Q)], ['P', (P) => P]], concl: ['Q', (P, Q) => Q] },
  mt: { label: 'Modus tollens: P → Q, ¬Q ⊢ ¬P', prem: [['P \\to Q', (P, Q) => imp(P, Q)], ['\\lnot Q', (P, Q) => !Q]], concl: ['\\lnot P', (P) => !P] },
  ac: { label: 'Affirming the consequent: P → Q, Q ⊢ P', prem: [['P \\to Q', (P, Q) => imp(P, Q)], ['Q', (P, Q) => Q]], concl: ['P', (P) => P] },
  da: { label: 'Denying the antecedent: P → Q, ¬P ⊢ ¬Q', prem: [['P \\to Q', (P, Q) => imp(P, Q)], ['\\lnot P', (P) => !P]], concl: ['\\lnot Q', (P, Q) => !Q] },
  ds: { label: 'Disjunctive syllogism: P ∨ Q, ¬P ⊢ Q', prem: [['P \\lor Q', (P, Q) => P || Q], ['\\lnot P', (P) => !P]], concl: ['Q', (P, Q) => Q] },
};
const ROWS = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
];
const badRows = (k) => ROWS.map((r, i) => [r, i]).filter(([[P, Q]]) => ARGS[k].prem.every(([, f]) => f(P, Q)) && !ARGS[k].concl[1](P, Q)).map(([, i]) => i);

export const truth_table = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find an invalid form in the list: one with a counterexample row.',
  goal: (t) => t.form === 'ac' || t.form === 'da',
  params: [{ key: 'form', label: 'Argument form', type: 'choice', value: 'mp', options: Object.entries(ARGS).map(([k, v]) => ({ value: k, label: v.label })) }],
  beats: [
    { say: 'Modus ponens. Only the first row has both premises true, and Q is true there. No counterexample: valid.', set: { form: 'mp' } },
    { say: 'Affirming the consequent. Row 3 (P false, Q true) makes both premises true, yet the conclusion P is false.', set: { form: 'ac' } },
    { say: 'Modus tollens. Only row 4 has both premises true, and ¬P is true there: valid.', set: { form: 'mt' } },
  ],
  readout: (p) => {
    const bad = badRows(p.form);
    return [
      ['Rows with all premises true', `${ROWS.filter(([P, Q]) => ARGS[p.form].prem.every(([, f]) => f(P, Q))).length} of 4`],
      ['Counterexample rows', bad.length ? bad.map((i) => i + 1).join(', ') : 'none'],
      ['Verdict', bad.length ? 'Invalid' : 'Valid'],
    ];
  },
  setup(kit) {
    const x0 = -6.4;
    const y0 = 2.6;
    const cw = 2.2;
    const rh = 1.05;
    const heads = range(0, 4, 5).map((i) => kit.label('', [x0 + i * cw, y0], { size: 15 }));
    kit.line([[x0 - 0.9, y0 - 0.5], [x0 + 4 * cw + 0.9, y0 - 0.5]], { color: C.axis, width: 2 });
    kit.line([[x0 + 1.5 * cw, y0 + 0.5], [x0 + 1.5 * cw, y0 - 0.5 - 4 * rh]], { color: C.axis, width: 1.5 });
    kit.line([[x0 + 3.5 * cw, y0 + 0.5], [x0 + 3.5 * cw, y0 - 0.5 - 4 * rh]], { color: C.axis, width: 1.5 });
    const rowBg = ROWS.map((_, i) => kit.rect(x0 - 0.9, y0 - 0.5 - (i + 1) * rh, 4 * cw + 1.8, rh, { color: C.blue, opacity: 0, stroke: false }));
    const cells = ROWS.map((_, i) => range(0, 4, 5).map((j) => kit.label('', [x0 + j * cw, y0 - 0.5 - (i + 0.5) * rh], { size: 15 })));
    const tags = ROWS.map((_, i) => kit.label('', [x0 + 4 * cw + 1.1, y0 - 0.5 - (i + 0.5) * rh], { size: 12, align: 'left', tex: false }));
    kit.label('\\text{premises}', [x0 + 2.5 * cw, y0 + 0.75], { size: 11, color: C.axis });
    kit.label('\\text{conclusion}', [x0 + 4 * cw, y0 + 0.75], { size: 11, color: C.axis });
    const T = (b) => (b ? '\\text{T}' : '\\text{F}');
    return (p) => {
      const a = ARGS[p.form];
      const names = ['P', 'Q', a.prem[0][0], a.prem[1][0], a.concl[0]];
      heads.forEach((h, j) => h.set(names[j]));
      ROWS.forEach(([P, Q], i) => {
        const vals = [P, Q, a.prem[0][1](P, Q), a.prem[1][1](P, Q), a.concl[1](P, Q)];
        vals.forEach((v, j) => cells[i][j].set(T(v)).color(v ? C.white : C.grey));
        const all = vals[2] && vals[3];
        const bad = all && !vals[4];
        rowBg[i].fill.color(bad ? C.red : C.green).opacity(all ? 0.22 : 0);
        tags[i].set(bad ? '← counterexample' : all ? '← premises true' : '').color(bad ? C.red : C.green);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// A hidden factor: ice cream, drownings and temperature
// ---------------------------------------------------------------------------
const DAYS = (() => {
  const r = rng(11);
  const n = () => (r() + r() + r() - 1.5) * 1.2;
  return range(0, 179, 180).map(() => {
    const T = 22 + 14 * r();
    return { T, ice: 40 + 9 * (T - 22) + 22 * n(), base: 1 + 0.5 * (T - 22) + 1.8 * n() };
  });
})();
const corr = (xs, ys) => {
  const n = xs.length;
  if (n < 3) return 0;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
};
// "Hold temperature fixed": remove the straight-line effect of temperature from
// both quantities and compare what is left, as a statistician would.
const resid = (vals) => {
  const n = DAYS.length;
  const mt = DAYS.reduce((a, d) => a + d.T, 0) / n;
  const mv = vals.reduce((a, v) => a + v, 0) / n;
  let stv = 0;
  let stt = 0;
  DAYS.forEach((d, i) => {
    stv += (d.T - mt) * (vals[i] - mv);
    stt += (d.T - mt) ** 2;
  });
  const b = stv / stt;
  return vals.map((v, i) => mv + (v - mv) - b * (DAYS[i].T - mt));
};
const view = (p) => {
  const xs = DAYS.map((d) => d.ice);
  const ys = DAYS.map((d) => d.base + p.k * (d.ice - 40) * 0.05);
  const X = p.w === 'fixed' ? resid(xs) : xs;
  const Y = p.w === 'fixed' ? resid(ys) : ys;
  return { X, Y, r: corr(X, Y) };
};

export const hidden_factor = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With no direct effect, find the comparison where the link between ice cream and drownings almost vanishes (|r| below 0.25).',
  goal: (t) => t.k === 0 && Math.abs(view(t).r) < 0.25,
  params: [
    { key: 'w', label: 'Compare', type: 'choice', value: 'all', options: [{ value: 'all', label: 'All days as they are' }, { value: 'fixed', label: 'Days compared at the same temperature' }] },
    { key: 'k', label: 'Real direct effect of ice cream (0 = none)', min: 0, max: 1, step: 0.1, value: 0 },
  ],
  beats: [
    { say: 'Every day of a summer. More ice cream, more drownings: a strong correlation. Colour shows temperature.', set: { w: 'all', k: 0 } },
    { say: 'Now take out the effect of temperature, comparing days as if they were equally hot. Ice cream sales tell you almost nothing about drownings.', set: { w: 'fixed', k: 0 } },
    { say: 'If ice cream really did cause drownings, the link would survive even on days of the same temperature.', set: { w: 'fixed', k: 1 } },
  ],
  readout: (p) => {
    const v = view(p);
    return [
      ['Days', `${DAYS.length}`],
      ['Correlation r', r2(v.r)],
      ['Reading', Math.abs(v.r) > 0.6 ? 'strong link' : Math.abs(v.r) > 0.3 ? 'weak link' : 'almost no link'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 200, 50], y: [0, 14, 2], sx: 11 / 200, sy: 7 / 14, origin: [-5.0, -3.6], xEvery: 50, yEvery: 2, fmt: (v) => `${v}`, xLabel: '\\text{ice creams sold}', yLabel: '\\text{drownings (per 10 000 swimmers)}' });
    const dots = DAYS.map(() => kit.dot([0, 0], { r: 0.07, color: C.grey, z: 4 }));
    const tcol = (T) => {
      const f = clamp((T - 22) / 14, 0, 1);
      const a = [0x58, 0xc4, 0xdd];
      const b = [0xfc, 0x62, 0x55];
      return (Math.round(a[0] + f * (b[0] - a[0])) << 16) | (Math.round(a[1] + f * (b[1] - a[1])) << 8) | Math.round(a[2] + f * (b[2] - a[2]));
    };
    kit.label('\\text{cool}', [-7.4, 2.8], { size: 11, color: C.blue });
    kit.label('\\text{hot}', [-7.4, 2.3], { size: 11, color: C.red });
    return (p) => {
      const v = view(p);
      DAYS.forEach((d, i) => {
        dots[i].set(P.toW(clamp(v.X[i], 0, 200), clamp(v.Y[i], 0, 14))).color(p.w === 'fixed' ? C.grey : tcol(d.T));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Descartes: layers of belief removed by stronger doubts
// ---------------------------------------------------------------------------
const BELIEFS = [
  { t: 'That tower far away is round', falls: 1 },
  { t: 'The stick in the water is bent', falls: 1 },
  { t: 'I am sitting by the fire in a gown', falls: 2 },
  { t: 'I have hands and a body', falls: 2 },
  { t: 'A square has four sides', falls: 3 },
  { t: '2 + 3 = 5', falls: 3 },
  { t: 'I think, so I exist', falls: 99 },
];
const LEVELS = ['No doubt yet', 'The senses sometimes deceive', 'I might be dreaming', 'An evil demon could deceive me in everything'];

export const descartes_doubt = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Raise the doubt as far as it goes and see what is left.',
  goal: (t) => Number(t.lvl) === 3,
  params: [{ key: 'lvl', label: 'Level of doubt', type: 'choice', value: '0', options: LEVELS.map((l, i) => ({ value: String(i), label: l })) }],
  beats: [
    { say: 'Everyday beliefs, from far-off towers to arithmetic, all standing.', set: { lvl: '0' } },
    { say: 'The senses sometimes deceive: things far away or under water look wrong. Those beliefs go.', set: { lvl: '1' } },
    { say: 'Dreams feel real, so even "I am sitting here" could be false. But a square has four sides even in a dream.', set: { lvl: '2' } },
    { say: 'An all-powerful deceiver could fake even arithmetic. Only one belief survives: to be deceived, I must exist.', set: { lvl: '3' } },
  ],
  readout: (p) => [
    ['Doubt', LEVELS[Number(p.lvl)]],
    ['Beliefs still standing', `${BELIEFS.filter((b) => b.falls > Number(p.lvl)).length} of ${BELIEFS.length}`],
  ],
  setup(kit) {
    const blocks = BELIEFS.map((b, i) => {
      const y = -3.6 + i * 1.08;
      const last = i === BELIEFS.length - 1;
      return {
        b,
        r: kit.rect(-4.5, y, 9, 0.85, { color: last ? C.gold : C.blue, opacity: 0.55 }),
        t: kit.label(`\\text{${b.t}}`, [0, y + 0.43], { size: 13 }),
        tag: kit.label('', [4.7, y + 0.43], { size: 11, align: 'left', tex: false }),
      };
    });
    return (p, _t, time) => {
      const lvl = Number(p.lvl);
      blocks.forEach((o) => {
        const gone = o.b.falls <= lvl;
        o.r.fill.opacity(gone ? 0.08 : 0.55);
        o.t.opacity(gone ? 0.3 : 1);
        o.tag.set(gone ? `doubted (${['', 'senses', 'dreams', 'demon'][o.b.falls]})` : o.b.falls === 99 && lvl === 3 ? 'certain' : '').color(gone ? C.grey : C.gold);
        if (o.b.falls === 99 && lvl === 3) o.r.fill.opacity(0.45 + 0.2 * Math.sin(time * 3));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Induction: Laplace's rule and the turkey
// ---------------------------------------------------------------------------
const laplace = (n) => (n + 1) / (n + 2);

export const induction_turkey = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the first day on which the turkey is at least 99% sure it will be fed tomorrow.',
  goal: (t) => laplace(t.n) >= 0.99 && laplace(t.n - 1) < 0.99,
  params: [{ key: 'n', label: 'Days fed so far', min: 0, max: 1000, step: 1, value: 3 }],
  beats: [
    { say: 'Day 3. Three meals in a row: Laplace gives 4/5 = 80% for tomorrow.', set: { n: 3 } },
    { say: 'Day 98. Now 99%. Every morning seems to confirm the rule.', set: { n: 98 } },
    { say: 'Day 1000. 99.9% sure. Tomorrow is Thanksgiving. No number of good mornings made it certain.', set: { n: 1000 } },
  ],
  readout: (p) => [
    ['Days fed', `${p.n}`],
    ['Laplace: chance of food tomorrow', `${r2(100 * laplace(p.n))}%`],
    ['Chance of a surprise', `1 in ${r0(p.n + 2)}`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 1000, 100], y: [0.5, 1, 0.1], sx: 12 / 1000, sy: 7 / 0.5, origin: [-6, -3.6 - 0.5 * 14], axisAt: [0, 0.5], xEvery: 200, yEvery: 0.1, fmt: (v, a) => (a === 'y' ? `${Math.round(v * 100)}%` : `${v}`), xLabel: '\\text{days fed}', yLabel: '\\text{confidence}' });
    kit.line(range(0, 1000, 400).map((n) => P.toW(n, laplace(n))), { color: C.yellow, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    const drop = kit.line([], { color: C.red, width: 3, dashed: true, create: false });
    const sign = kit.label('\\text{day 1001: no food}', [0, 0], { size: 12, color: C.red });
    return (p) => {
      dot.set(P.toW(p.n, laplace(p.n)));
      const end = p.n >= 1000;
      drop.set(end ? [P.toW(1000, laplace(1000)), P.toW(1000, 0.5)] : []);
      sign.visible(end).pos([P.toW(880, 0.6)[0], P.toW(0, 0.6)[1]]);
    };
  },
};

// ---------------------------------------------------------------------------
// Bayes: 1000 people and a test
// ---------------------------------------------------------------------------
const bayes = (p) => {
  const N = 1000;
  const sick = (N * p.base) / 100;
  const tp = sick * (p.sens / 100);
  const fp = (N - sick) * (p.fpr / 100);
  return { sick, tp, fp, post: tp / Math.max(1e-9, tp + fp) };
};

export const bayes_grid = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With 1% sick and a 90% detection rate, lower the false-alarm rate until a positive result means at least a 50% chance of being sick.',
  goal: (t) => t.base === 1 && t.sens === 90 && bayes(t).post >= 0.5,
  params: [
    { key: 'base', label: 'How common the condition is (%)', min: 0.5, max: 20, step: 0.5, value: 1 },
    { key: 'sens', label: 'Sick people the test catches (%)', min: 50, max: 100, step: 1, value: 90 },
    { key: 'fpr', label: 'Healthy people wrongly flagged (%)', min: 0.1, max: 20, step: 0.1, value: 9 },
  ],
  beats: [
    { say: '1000 people, 10 of them sick. The test catches 9, but flags about 89 healthy people too. A positive means only about a 9% chance.', set: { base: 1, sens: 90, fpr: 9 } },
    { say: 'If the condition were common (20%), the same test would be right about 71% of the time when positive.', set: { base: 20, sens: 90, fpr: 9 } },
    { say: 'Back to 1%, but with a far cleaner test (1% false alarms): now a positive means about 48%.', set: { base: 1, sens: 90, fpr: 1 } },
  ],
  readout: (p) => {
    const b = bayes(p);
    return [
      ['Sick and positive', r0(b.tp)],
      ['Healthy but positive', r0(b.fp)],
      ['Chance a positive person is sick', `${r0(100 * b.post)}%`],
    ];
  },
  setup(kit) {
    const cols = 40;
    const rows = 25;
    const s = 0.3;
    const x0 = -6.3;
    const y0 = 3.6;
    const dots = [];
    for (let i = 0; i < cols * rows; i++) dots.push(kit.dot([x0 + (i % cols) * s, y0 - Math.floor(i / cols) * s], { r: 0.1, color: C.grey, z: 3 }));
    const key = [
      ['sick, positive', C.red],
      ['healthy, positive', C.gold],
      ['sick, missed', C.purple],
      ['healthy, negative', 0x3a414c],
    ];
    key.forEach(([t, c], i) => {
      kit.dot([x0 + i * 3.3, -4.1], { r: 0.12, color: c });
      kit.label(`\\text{${t}}`, [x0 + i * 3.3 + 0.25, -4.1], { size: 11, align: 'left' });
    });
    return (p) => {
      const b = bayes(p);
      const sick = Math.round(b.sick);
      const tp = Math.round(b.tp);
      const fp = Math.round(b.fp);
      dots.forEach((d, i) => {
        // sick people first, then the healthy ones flagged, then the rest
        const c = i < tp ? C.red : i < sick ? C.purple : i < sick + fp ? C.gold : 0x3a414c;
        d.color(c);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Bending starlight: 1919 and later measurements
// ---------------------------------------------------------------------------
const DATA = {
  sobral: { label: 'Sobral 1919 (4-inch lens)', v: 1.98, e: 0.12 },
  principe: { label: 'Príncipe 1919 (Eddington)', v: 1.61, e: 0.3 },
  radio: { label: 'Radio telescopes, 1990s–2000s', v: 1.75, e: 0.01 },
};

export const eclipse_1919 = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the measurement that rules out the Newtonian-style value most decisively.',
  goal: (t) => t.d === 'radio',
  params: [{ key: 'd', label: 'Measurement', type: 'choice', value: 'principe', options: Object.entries(DATA).map(([k, v]) => ({ value: k, label: v.label })) }],
  beats: [
    { say: 'Eddington’s plates from Príncipe: 1.61 ± 0.30 arcseconds. Closer to Einstein, but the error bar is wide.', set: { d: 'principe' } },
    { say: 'Sobral’s better lens: 1.98 ± 0.12. The Newtonian-style 0.87 is about nine error bars away.', set: { d: 'sobral' } },
    { say: 'Modern radio measurements pin it at 1.75 with tiny errors. The risky prediction survived every test.', set: { d: 'radio' } },
  ],
  readout: (p) => {
    const d = DATA[p.d];
    return [
      ['Measured', `${d.v} ± ${d.e} arcsec`],
      ['Einstein (1.75) is', `${r2(Math.abs(d.v - 1.75) / d.e)} error bars away`],
      ['Newtonian-style (0.87) is', `${r0(Math.abs(d.v - 0.87) / d.e)} error bars away`],
    ];
  },
  setup(kit) {
    // sketch: Sun, true and apparent star positions
    kit.fill(range(0, Math.PI * 2, 60).map((a) => [-5.2 + 0.9 * Math.cos(a), 1.2 + 0.9 * Math.sin(a)]), { color: C.gold, opacity: 0.9 });
    kit.label('\\text{Sun}', [-5.2, -0.05], { size: 12, color: C.gold });
    kit.line([[-7.8, 2.6], [-5.2, 2.15], [-2.3, 2.5]], { color: C.white, width: 2 });
    kit.dot([-7.8, 2.6], { r: 0.1, color: C.white });
    kit.label('\\text{star}', [-7.6, 3.0], { size: 11 });
    kit.label('\\text{Earth}', [-2.3, 2.85], { size: 11 });
    kit.label('\\text{star appears shifted outward}', [-5.0, 3.6], { size: 11, color: C.axis });
    const P = kit.plane({ x: [0, 4, 1], y: [0, 2.5, 0.5], sx: 1, sy: 2.6, origin: [0.6, -3.6], axisAt: [0, 0], numbers: true, xEvery: 10, yEvery: 0.5, fmt: (v, a) => (a === 'y' ? `${v}` : ''), yLabel: '\\text{deflection (arcsec)}' });
    kit.line([P.toW(0, 1.75), P.toW(4, 1.75)], { color: C.green, width: 2, dashed: true });
    kit.label('\\text{Einstein 1.75}', [P.toW(4, 1.75)[0] + 0.1, P.toW(0, 1.75)[1]], { size: 11, color: C.green, align: 'left' });
    kit.line([P.toW(0, 0.87), P.toW(4, 0.87)], { color: C.red, width: 2, dashed: true });
    kit.label('\\text{Newton-style 0.87}', [P.toW(4, 0.87)[0] + 0.1, P.toW(0, 0.87)[1]], { size: 11, color: C.red, align: 'left' });
    const marks = Object.entries(DATA).map(([k, d], i) => {
      const x = 0.7 + i * 1.3;
      kit.label(`\\text{${k === 'radio' ? 'radio' : k === 'sobral' ? 'Sobral' : 'Príncipe'}}`, [P.toW(x, 0)[0], -3.95], { size: 10 });
      return { k, d, bar: kit.line([P.toW(x, d.v - d.e), P.toW(x, d.v + d.e)], { color: C.white, width: 3 }), dot: kit.dot(P.toW(x, d.v), { r: 0.13, color: C.white, z: 5 }) };
    });
    return (p) => {
      for (const m of marks) {
        const on = m.k === p.d;
        m.bar.color(on ? C.yellow : C.grey);
        m.dot.color(on ? C.yellow : C.grey);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Epicycles: Mars seen from Earth, two equivalent pictures
// ---------------------------------------------------------------------------
const AE = 1;
const AM = 1.524;
const TM = 1.881;
const earthAt = (t) => [AE * Math.cos(2 * Math.PI * t), AE * Math.sin(2 * Math.PI * t)];
const marsAt = (t) => [AM * Math.cos((2 * Math.PI * t) / TM + 0.6), AM * Math.sin((2 * Math.PI * t) / TM + 0.6)];
const lon = (t) => {
  const e = earthAt(t);
  const m = marsAt(t);
  return Math.atan2(m[1] - e[1], m[0] - e[0]);
};
const unwrap = (ts) => {
  let prev = lon(ts[0]);
  let off = 0;
  return ts.map((t) => {
    let v = lon(t) + off;
    while (v - prev > Math.PI) {
      off -= 2 * Math.PI;
      v -= 2 * Math.PI;
    }
    while (v - prev < -Math.PI) {
      off += 2 * Math.PI;
      v += 2 * Math.PI;
    }
    prev = v;
    return v;
  });
};

export const epicycles = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Run time until Mars is moving backwards against the stars (the strip below runs right to left).',
  goal: (t) => lon(t.t + 0.005) - lon(t.t) < 0 && Math.abs(lon(t.t + 0.005) - lon(t.t)) < 1,
  params: [
    { key: 'view', label: 'Picture', type: 'choice', value: 'sun', options: [{ value: 'sun', label: 'Sun-centred (Copernicus)' }, { value: 'earth', label: 'Earth-centred (Ptolemy)' }] },
    { key: 't', label: 'Time (years)', min: 0, max: 4, step: 0.01, value: 0.7 },
  ],
  beats: [
    { say: 'Sun-centred: Earth (blue) laps Mars (red) about every 2.1 years. The line shows where we see Mars among the stars.', set: { view: 'sun', t: 0.7 } },
    { say: 'As Earth overtakes Mars, the line of sight swings backwards: Mars seems to reverse for a few weeks.', set: { view: 'sun', t: 0.2 } },
    { say: 'Earth-centred: the same motion drawn as a small circle (epicycle) riding on a big one. The path loops exactly where Mars reverses.', set: { view: 'earth', t: 0.25 } },
  ],
  readout: (p) => {
    const d = lon(p.t + 0.005) - lon(p.t);
    return [
      ['Time', `${r2(p.t)} years`],
      ['Mars among the stars', Math.abs(d) > 1 ? 'moving forward' : d < 0 ? 'moving BACKWARDS (retrograde)' : 'moving forward'],
    ];
  },
  setup(kit) {
    const sc = 1.6;
    const c = [-3.2, 0.9];
    const W = (q) => [c[0] + q[0] * sc, c[1] + q[1] * sc];
    const orbitE = kit.line([], { color: C.blue, width: 1.5, opacity: 0.5, create: false });
    const orbitM = kit.line([], { color: C.red, width: 1.5, opacity: 0.5, create: false });
    const sun = kit.dot([0, 0], { r: 0.22, color: C.gold, z: 5 });
    const earth = kit.dot([0, 0], { r: 0.14, color: C.blue, z: 6 });
    const mars = kit.dot([0, 0], { r: 0.13, color: C.red, z: 6 });
    const sight = kit.line([], { color: C.white, width: 1.5, opacity: 0.6, create: false });
    const trail = kit.line([], { color: C.red, width: 2, create: false });
    const epi = kit.line([], { color: C.gold, width: 1.2, opacity: 0.6, create: false });
    // star strip
    const sx0 = 1.6;
    const sx1 = 7.6;
    const sy = -3.4;
    kit.rect(sx0, sy - 0.5, sx1 - sx0, 1.0, { color: 0x111722, opacity: 1 });
    kit.label('\\text{dips = backward loops}', [sx1, sy - 0.75], { size: 10, color: C.axis, align: 'right' });
    kit.label('\\text{Mars among the stars, steady drift removed (time →)}', [(sx0 + sx1) / 2, sy + 0.8], { size: 11, color: C.axis });
    const strip = kit.line([], { color: C.red, width: 2, create: false });
    const ts = range(0, 4, 400);
    const ghost = kit.line([], { color: C.red, width: 1, opacity: 0.25, create: false });
    const path = kit.line([], { color: C.red, width: 1, opacity: 0.25, create: false });
    const tags = ['Sun', 'Earth', 'Mars'].map((n) => kit.label(`\\text{${n}}`, [0, 0], { size: 11, align: 'left' }));
    const raw = unwrap(ts);
    const rate = (raw[raw.length - 1] - raw[0]) / 4;
    // remove the steady drift so the backward loops stand out
    const L = raw.map((v, i) => v - rate * ts[i]);
    const lmin = Math.min(...L);
    const lmax = Math.max(...L);
    const stripPt = (i) => [sx0 + ((sx1 - sx0) * i) / (ts.length - 1), sy - 0.45 + (0.9 * (L[i] - lmin)) / (lmax - lmin)];
    // a second view of the strip: longitude vs time on a small plot
    kit.label('\\text{longitude}', [sx0 - 0.1, sy + 0.45], { size: 10, color: C.axis, align: 'right' });
    return (p) => {
      const circ = (r, o) => range(0, Math.PI * 2, 120).map((a) => W([o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)]));
      const e = earthAt(p.t);
      const m = marsAt(p.t);
      if (p.view === 'sun') {
        sun.set(W([0, 0]));
        orbitE.set(circ(AE, [0, 0]));
        orbitM.set(circ(AM, [0, 0]));
        earth.set(W(e));
        mars.set(W(m));
        sight.set([W(e), W([e[0] + (m[0] - e[0]) * 2.2, e[1] + (m[1] - e[1]) * 2.2])]);
        trail.set([]);
        epi.set([]);
      } else {
        const rel = (t) => [marsAt(t)[0] - earthAt(t)[0], marsAt(t)[1] - earthAt(t)[1]];
        const r = rel(p.t);
        const sunRel = [-e[0], -e[1]];
        earth.set(W([0, 0]));
        sun.set(W(sunRel));
        orbitE.set(circ(AE, [0, 0]));
        orbitM.set(circ(AM, sunRel));
        mars.set(W(r));
        sight.set([W([0, 0]), W([r[0] * 1.4, r[1] * 1.4])]);
        epi.set([W([0, 0]), W(sunRel), W(r)]);
        trail.set(range(Math.max(0, p.t - 0.6), p.t, 120).map((t) => W(rel(t))));
      }
      const upto = Math.round((p.t / 4) * (ts.length - 1));
      strip.set(range(0, upto, upto + 1).map((i) => stripPt(Math.round(i))));
      ghost.set(ts.map((_, i) => stripPt(i)));
      const rel2 = (t) => [marsAt(t)[0] - earthAt(t)[0], marsAt(t)[1] - earthAt(t)[1]];
      path.set(p.view === 'earth' ? range(0, 4, 500).map((t) => W(rel2(t))) : []);
      const off = (d) => [d.obj.position.x + 0.25, d.obj.position.y + 0.25];
      [sun, earth, mars].forEach((d, i) => tags[i].pos(off(d)));
    };
  },
};

// ---------------------------------------------------------------------------
// Ethics: weighing a late design change
// ---------------------------------------------------------------------------
const OPTS = [
  { name: 'Approve the cheaper change quietly', saving: 9, harm: 8, hides: true },
  { name: 'Full re-check, then decide openly', saving: 4, harm: 1, hides: false },
  { name: 'Keep the original design', saving: 0, harm: 1, hides: false },
];
const score = (o, w) => o.saving * (1 - w) * 1 - o.harm * w * 3;

export const ethics_matrix = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find a safety weight at which hiding the risk would still "win" on numbers alone, then switch on the duty rule.',
  goal: (t) => t.duty === 'on' && t.w <= 0.15,
  params: [
    { key: 'w', label: 'Weight given to public safety (0 to 1)', min: 0, max: 1, step: 0.05, value: 0.5 },
    { key: 'duty', label: 'Duty rule: never hide a known risk', type: 'choice', value: 'off', options: [{ value: 'off', label: 'Off (pure weighing)' }, { value: 'on', label: 'On (Kant’s side constraint)' }] },
  ],
  beats: [
    { say: 'Give safety reasonable weight and the open re-check scores best: a small saving, little risk.', set: { w: 0.5, duty: 'off' } },
    { say: 'Care almost only about money and the quiet approval wins the sum. This is how disasters get rationalised.', set: { w: 0.1, duty: 'off' } },
    { say: 'Add the duty rule. Hiding a known risk is off the table whatever the numbers say.', set: { w: 0.1, duty: 'on' } },
  ],
  readout: (p) => {
    const allowed = OPTS.filter((o) => !(p.duty === 'on' && o.hides));
    const best = allowed.reduce((b, o) => (score(o, p.w) > score(b, p.w) ? o : b));
    return [
      ['Best choice', best.name],
      ['Scores', OPTS.map((o) => (p.duty === 'on' && o.hides ? 'ruled out' : r2(score(o, p.w)))).join(' / ')],
    ];
  },
  setup(kit) {
    const base = -0.5;
    const s = 0.42;
    kit.line([[-7, base], [7, base]], { color: C.axis, width: 2 });
    const bars = OPTS.map((o, i) => {
      const x = -5.6 + i * 4.4;
      kit.label(`\\text{${o.name}}`, [x + 1.3, -4.0], { size: 11 });
      return { o, r: kit.rect(x, base, 2.6, 0.01, { color: C.blue, opacity: 0.85, stroke: false }), v: kit.label('', [x + 1.3, base], { size: 12, tex: false }), x, x2: kit.label('', [x + 1.3, 1.5], { size: 14, color: C.red, tex: false }) };
    });
    kit.label('\\text{score: benefits minus weighted harms}', [0, 4.0], { size: 12, color: C.axis });
    return (p) => {
      const allowed = OPTS.filter((o) => !(p.duty === 'on' && o.hides));
      const best = allowed.reduce((b, o) => (score(o, p.w) > score(b, p.w) ? o : b));
      for (const b of bars) {
        const v = score(b.o, p.w);
        const out = p.duty === 'on' && b.o.hides;
        const h = v * s;
        b.r.set(b.x, h >= 0 ? base : base + h, 2.6, Math.max(0.01, Math.abs(h)));
        b.r.fill.color(out ? C.grey : b.o === best ? C.green : v >= 0 ? C.blue : C.red).opacity(out ? 0.2 : 0.85);
        b.v.set(out ? '' : r2(v)).pos([b.x + 1.3, h >= 0 ? base + h + 0.3 : base + h - 0.3]);
        b.x2.set(out ? '✗ ruled out by duty' : '');
      }
    };
  },
};
