// Story scenes for the "Start here" level (src/data/tracks/start.js).
// Each plays as a short narrated story; `hidden` params drive the reveals and
// touching any control switches them to their `free` values.
import { C } from '../theme';
import { clamp, range, smooth } from '../kit';

const ease = (dt, rate = 3) => 1 - Math.exp(-dt * rate);
function show(o, a, base = 1) {
  if (!o) return;
  const v = clamp(a, 0, 1);
  if (o.fill || o.outline) {
    o.fill?.opacity(base * v);
    o.outline?.opacity(v);
  } else o.opacity?.(base * v);
  o.visible(v > 0.01);
}
const pct = (v) => `${Math.round(v)}%`;

// ---------------------------------------------------------------------------
// START 1. The forgetting curve and spaced reviews
// ---------------------------------------------------------------------------
// Ebbinghaus's savings (Murre & Dros 2015, table 1): time in days → percent.
const EB_T = [0, 20 / 1440, 1 / 24, 9 / 24, 1, 2, 6, 31];
const EB_V = [100, 58.2, 44.2, 35.8, 33.7, 27.8, 25.4, 21.1];
const lt = (d) => Math.log10(d * 1440 + 1); // minutes, on a log scale
function forget(d) {
  if (d <= 0) return 100;
  for (let i = 1; i < EB_T.length; i++) {
    if (d <= EB_T[i]) {
      const u = (lt(d) - lt(EB_T[i - 1])) / (lt(EB_T[i]) - lt(EB_T[i - 1]));
      return EB_V[i - 1] + (EB_V[i] - EB_V[i - 1]) * u;
    }
  }
  return EB_V[EB_V.length - 1];
}
const PLANS = {
  none: { label: 'No reviews', at: [] },
  one: { label: 'One review, on day 1', at: [1] },
  ladder: { label: 'Reviews on days 1, 4 and 14', at: [1, 4, 14] },
};
// After each review memory is back near the top and fades more slowly
// (an illustration of the spacing effect, not Ebbinghaus's own data).
function memory(day, plan) {
  const at = PLANS[plan].at.filter((r) => r <= day);
  const last = at.length ? at[at.length - 1] : 0;
  const k = at.length;
  return 100 - (100 - forget((day - last) / 3 ** k)) * 0.7 ** k;
}

export const start_forgetting = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.4,
  mission: 'Pick the review plan that keeps the most by day 30.',
  goal: (t) => t.plan === 'ladder',
  params: [
    { key: 'plan', label: 'Reviews', type: 'choice', value: 'none', options: Object.entries(PLANS).map(([value, p]) => ({ value, label: p.label })) },
    { key: 'draw', hidden: true, value: 0 },
    { key: 'dots', hidden: true, value: 0 },
  ],
  free: { draw: 30, dots: 1 },
  beats: [
    {
      say: 'Berlin, the early 1880s. Hermann Ebbinghaus learns a list of made-up syllables, WID, ZOF, KEP, until he can recite it perfectly. That is 100% on the left.',
      set: { plan: 'none', draw: 0, dots: 0 },
      ms: 11000,
      notes: [{ text: 'just learned: 100%', at: [-3.2, 3.9], to: [-6.3, 3.25] }],
    },
    {
      say: 'Then he waits, and times how long relearning takes. After 20 minutes only 58% is saved. After an hour, 44%. After one day, 34%.',
      set: { draw: 1, dots: 1 },
      ms: 12000,
      notes: [{ text: 'the steep first day', at: [-2.6, 1.6], to: [-6.15, 0.0], color: C.red }],
    },
    {
      say: 'After that the fall is slow: 25% at six days, about 21% after a month. Steep first, then a long tail. That is the forgetting curve, and it is the same for everyone.',
      set: { draw: 30 },
      ms: 12500,
      notes: [{ text: 'the long, slow tail', at: [2.6, 0.6], to: [4.6, -1.25] }],
    },
    {
      say: 'Now add one review on day 1, just as the memory fades. It jumps back up, and the next drop is gentler.',
      set: { plan: 'one' },
      ms: 11000,
      notes: [{ text: 'review: back to the top', at: [-1.8, 3.9], to: [-5.9, 3.2], color: C.green }],
    },
    {
      say: 'Reviews on days 1, 4 and 14, each gap longer than the last. By day 30 far more is still there, for less total time than one long cram.',
      set: { plan: 'ladder' },
      ms: 12000,
      notes: [{ text: 'each gap can be longer', at: [3.2, 2.2], to: [-0.2, 3.0], color: C.green }],
    },
    {
      say: 'That is the spacing effect. The Review tab uses the same idea: a question comes back after 1, 3, 10, 30 and 90 days.',
      set: {},
      ms: 10000,
    },
  ],
  readout: (t) => [
    ['Plan', PLANS[t.plan].label],
    ['Memory on day 30', pct(memory(30, t.plan))],
    ['Without reviews', pct(memory(30, 'none'))],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 30, 5], y: [0, 100, 20], sx: 0.44, sy: 0.058, origin: [-6.4, -2.55], fmt: (v, a) => (a === 'y' ? `${v}%` : `${v}`), xLabel: '\\text{days}', yLabel: '\\text{still remembered}' });
    const curve = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 4, create: false, z: 4 });
    const dots = EB_T.map(() => kit.dot([0, 0], { r: 0.1, color: C.white, z: 6 }));
    const marks = [1, 4, 14].map((d) => ({
      d,
      ln: kit.line([P.toW(d, 0), P.toW(d, 100)], { color: C.green, width: 1.5, dashed: true, create: false, z: 2 }),
      lb: kit.label('review', [...P.toW(d, 104)], { tex: false, size: 11, color: C.green }),
    }));
    const illus = kit.label('after reviews: an illustration of the spacing effect', [3.4, 4.05], { tex: false, size: 11, color: C.grey });
    const end = kit.label('', [0, 0], { tex: false, size: 14, color: C.yellow });
    let draw = 0;
    return (p, t, time, dt) => {
      draw += (p.draw - draw) * ease(dt, 2.2);
      const upto = clamp(draw, 0.0005, 30);
      // Sample more finely just after the start and each review.
      const starts = [0, ...PLANS[t.plan].at].filter((r) => r < upto);
      const xs = new Set();
      starts.forEach((s, i) => {
        const stop = Math.min(upto, starts[i + 1] ?? 30);
        for (let k = 0; k <= 60; k++) xs.add(s + (stop - s) * (k / 60) ** 3);
      });
      const pts = [...xs].filter((x) => x <= upto).sort((a, b) => a - b).map((x) => P.toW(x, memory(x, t.plan)));
      curve.set(pts);
      EB_T.forEach((d, i) => {
        dots[i].set(P.toW(Math.min(d, 30), EB_V[i]));
        dots[i].visible(p.dots > 0.5 && t.plan === 'none' && d <= upto + 1e-6);
      });
      marks.forEach((m) => {
        const on = PLANS[t.plan].at.includes(m.d) && m.d <= upto;
        m.ln.visible(on);
        m.lb.visible(on);
      });
      illus.visible(t.plan !== 'none');
      const v = memory(upto, t.plan);
      end.set(upto > 0.01 ? pct(v) : '').pos([P.toW(upto, v)[0] + 0.45, P.toW(upto, v)[1] + 0.3]);
    };
  },
};

// ---------------------------------------------------------------------------
// START 2. One amount, three names: fraction, decimal, percent
// ---------------------------------------------------------------------------
export const start_fdp = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.6,
  mission: 'Make a bar that shows 40%.',
  goal: (t) => Math.abs(Math.min(t.k, t.n) / t.n - 0.4) < 1e-9,
  params: [
    { key: 'n', label: 'Equal pieces (bottom number)', min: 1, max: 10, step: 1, value: 4 },
    { key: 'k', label: 'Pieces shaded (top number)', min: 0, max: 10, step: 1, value: 3 },
    { key: 'names', hidden: true, value: 3 },
    { key: 'hund', hidden: true, value: 1 },
  ],
  free: { names: 3, hund: 1 },
  beats: [
    { say: 'One bar, one whole. Cut it into 4 equal pieces. The bottom number of a fraction says how many pieces.', set: { n: 4, k: 0, names: 0, hund: 0 }, ms: 10000 },
    {
      say: 'Shade 3 of them: three quarters, written 3 over 4. The top number says how many pieces you take.',
      set: { k: 3, names: 1 },
      ms: 10000,
      notes: [{ text: '3 pieces of 4', at: [-4.6, 3.4], to: [-1.5, 2.2] }],
    },
    {
      say: 'Divide 3 by 4 and you get 0.75: seven tenths and five hundredths. The same amount as a decimal.',
      set: { names: 2 },
      ms: 9500,
    },
    {
      say: 'Now cut the same bar into a hundred thin slices. The shaded part covers 75 of them: 75 percent, “for each hundred”.',
      set: { names: 3, hund: 1 },
      ms: 11000,
      notes: [{ text: '75 of 100 slices', at: [4.4, -3.9], to: [2.6, -1.0], color: C.gold }],
    },
    {
      say: 'Different cuts can show the same amount. 2 of 4 pieces covers exactly the same length as 1 of 2: one half, 0.5, 50%.',
      set: { n: 4, k: 2 },
      ms: 10000,
    },
    { say: 'Cut it in two and shade one. Nothing moved: 2/4 and 1/2 are two names for one amount.', set: { n: 2, k: 1 }, ms: 9000 },
    { say: 'Try 2 of 5: two fifths is 0.4, or 40%. Fibonacci’s merchants did this kind of sum every day, in 1202.', set: { n: 5, k: 2 }, ms: 10000 },
  ],
  readout: (t) => {
    const k = Math.min(t.k, t.n);
    const v = k / t.n;
    return [
      ['Fraction', `${k}/${t.n}`],
      ['Decimal', `${Math.round(v * 1000) / 1000}`],
      ['Percent', `${Math.round(v * 1000) / 10}%`],
    ];
  },
  setup(kit) {
    const X0 = -6;
    const W = 12;
    const Y = 1.1;
    const H = 1.1;
    kit.rect(X0, Y, W, H, { color: C.grey, opacity: 0.08, strokeColor: C.white, width: 2 });
    const shade = kit.rect(X0, Y, 0.01, H, { color: C.blue, opacity: 0.55, stroke: false });
    const cuts = range(0, 1, 11).map(() => kit.line([[0, 0], [0, 1]], { color: C.white, width: 2, create: false, z: 3 }));
    // the hundred strip
    const HY = -1.6;
    const strip = kit.rect(X0, HY, W, 0.8, { color: C.grey, opacity: 0.06, strokeColor: C.grey, width: 1.5 });
    const stripFill = kit.rect(X0, HY, 0.01, 0.8, { color: C.gold, opacity: 0.55, stroke: false });
    const slices = Array.from({ length: 99 }, (_, i) =>
      kit.line([[X0 + (W * (i + 1)) / 100, HY], [X0 + (W * (i + 1)) / 100, HY + ((i + 1) % 10 ? 0.35 : 0.8)]], { color: C.grey, width: 1, create: false, z: 3 })
    );
    const hundL = kit.label('', [X0 + W / 2, HY - 0.55], { tex: false, size: 14, color: C.gold });
    const frac = kit.label('', [-4.5, 3.2], { size: 30, color: C.blue });
    const dec = kit.label('', [0, 3.2], { size: 30, color: C.teal });
    const per = kit.label('', [4.5, 3.2], { size: 30, color: C.gold });
    const eqs = [kit.label('=', [-2.25, 3.2], { size: 26 }), kit.label('=', [2.25, 3.2], { size: 26 })];
    let n = 4;
    let f = 0;
    return (p, t, time, dt) => {
      const k = Math.min(t.k, t.n);
      n += (t.n - n) * ease(dt, 4);
      f += (k / t.n - f) * ease(dt, 3);
      shade.set(X0, Y, Math.max(0.001, W * f), H);
      const shown = Math.round(n);
      cuts.forEach((c, i) => {
        const on = i > 0 && i < t.n;
        c.set([[X0 + (W * i) / t.n, Y], [X0 + (W * i) / t.n, Y + H]]);
        c.visible(on && shown >= 1);
      });
      frac.set(`\\dfrac{${k}}{${t.n}}`);
      dec.set(`${Math.round((k / t.n) * 1000) / 1000}`);
      per.set(`${Math.round((k / t.n) * 1000) / 10}\\%`);
      show(frac, p.names);
      show(dec, p.names - 1);
      show(eqs[0], p.names - 1);
      show(per, p.names - 2);
      show(eqs[1], p.names - 2);
      const h = smooth(clamp(p.hund, 0, 1));
      show(strip, h, 0.06);
      stripFill.set(X0, HY, Math.max(0.001, W * f), 0.8);
      show(stripFill, h, 0.55);
      slices.forEach((s) => s.visible(h > 0.05));
      hundL.set(`${Math.round(f * 1000) / 10} out of every 100 slices`);
      show(hundL, h);
    };
  },
};

// ---------------------------------------------------------------------------
// START 3. Reread or recall? (Roediger & Karpicke 2006, experiment 2)
// ---------------------------------------------------------------------------
const RK = { '5min': { reread: 83, recall: 71, label: 'Five minutes later' }, week: { reread: 40, recall: 61, label: 'One week later' } };
export const start_testing = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.5,
  mission: 'Switch to the test a week later and see which group wins.',
  goal: (t) => t.when === 'week',
  params: [
    { key: 'when', label: 'Test given', type: 'choice', value: '5min', options: Object.entries(RK).map(([value, r]) => ({ value, label: r.label })) },
    { key: 'bars', hidden: true, value: 2 },
    { key: 'ghost', hidden: true, value: 0 },
  ],
  free: { bars: 2, ghost: 1 },
  beats: [
    {
      say: 'St Louis, 2006. Students read a short science passage. Group one reads it four times. Group two reads it once, then three times writes down all they can remember.',
      set: { when: '5min', bars: 0, ghost: 0 },
      ms: 12500,
    },
    {
      say: 'Tested five minutes later, the rereaders do better: 83% against 71%. Rereading looks like the winner.',
      set: { bars: 2 },
      ms: 10500,
      notes: [{ text: 'rereading wins… for now', at: [-5.8, 3.9], to: [-2.6, 2.6] }],
    },
    { say: 'The rereaders also feel surer they will remember. Text you have just read feels easy, and easy feels like knowing.', set: {}, ms: 10000 },
    {
      say: 'Now test other students a week later. The rereaders have kept 40%. The recall group has kept 61%.',
      set: { when: 'week', ghost: 1 },
      ms: 11500,
      notes: [{ text: 'recall wins where it counts', at: [5.4, 3.4], to: [2.6, 1.5], color: C.gold }],
    },
    {
      say: 'Look at the losses: the rereaders dropped 43 points, the recall group only 10. Arthur Gates saw the same with school children in 1917.',
      set: {},
      ms: 11500,
      notes: [{ text: 'lost 43 points', at: [-5.6, 0.6], to: [-2.95, 1.0], color: C.red }],
    },
    { say: 'So close the book and try to recall. It feels harder, and that effort is what makes it last.', set: {}, ms: 9000 },
  ],
  readout: (t) => [
    ['When', RK[t.when].label],
    ['Read four times', `${RK[t.when].reread}%`],
    ['Read once + three recall tests', `${RK[t.when].recall}%`],
  ],
  setup(kit) {
    const Y0 = -2.3;
    const S = 0.058; // world units per percent
    const xs = [-2, 2];
    const colors = [C.blue, C.gold];
    kit.line([[-6, Y0], [6, Y0]], { color: C.axis, width: 2, create: false });
    [25, 50, 75, 100].forEach((v) => {
      kit.line([[-6, Y0 + v * S], [6, Y0 + v * S]], { color: C.gridFaint, width: 1, create: false, z: 0 });
      kit.label(`${v}%`, [-6.5, Y0 + v * S], { tex: false, cls: 'tick', align: 'right' });
    });
    const bars = xs.map((x, i) => kit.rect(x - 0.9, Y0, 1.8, 0.01, { color: colors[i], opacity: 0.7, strokeColor: colors[i], width: 2 }));
    const ghosts = xs.map((x, i) => kit.rect(x - 0.9, Y0, 1.8, 0.01, { color: colors[i], opacity: 0, strokeColor: colors[i], width: 1, z: 0 }));
    const vals = xs.map((x) => kit.label('', [x, 0], { tex: false, size: 20 }));
    const names = [kit.label('read it 4 times', [xs[0], Y0 - 0.45], { tex: false, size: 13 }), kit.label('read once + 3 recall tests', [xs[1], Y0 - 0.45], { tex: false, size: 13 })];
    const sure = kit.label('“I’ll remember this”', [xs[0], 0], { tex: false, size: 12, color: C.grey });
    const h = [0, 0];
    return (p, t, time, dt) => {
      const r = RK[t.when];
      const want = [r.reread, r.recall];
      want.forEach((v, i) => {
        h[i] += (v * smooth(clamp(p.bars - i, 0, 1)) - h[i]) * ease(dt, 2.4);
        bars[i].set(xs[i] - 0.9, Y0, 1.8, Math.max(0.001, h[i] * S));
        vals[i].set(h[i] > 1 ? `${Math.round(h[i])}%` : '').pos([xs[i], Y0 + h[i] * S + 0.35]);
        names[i].visible(p.bars > i + 0.2);
        const g = RK['5min'][i ? 'recall' : 'reread'];
        ghosts[i].set(xs[i] - 0.9, Y0, 1.8, g * S);
        show(ghosts[i].outline, p.ghost * (t.when === 'week' ? 1 : 0));
        ghosts[i].fill?.visible(false);
      });
      sure.pos([xs[0] - 2.2, Y0 + h[0] * S]);
      show(sure, p.bars > 1.5 ? 1 : 0);
    };
  },
};

// ---------------------------------------------------------------------------
// START 4. Reading a line of math, symbol by symbol
// ---------------------------------------------------------------------------
const LINES = {
  a: { label: '2 + 3 × 4', toks: [['2', 'two'], ['+', 'plus'], ['3', 'three'], ['\\times', 'times'], ['4', 'four']], work: [['first ×: 3 × 4 = 12', '2 + 12'], ['then +', '14']] },
  b: { label: '(2 + 3) × 4', toks: [['(2+3)', 'two plus three, first'], ['\\times', 'times'], ['4', 'four']], work: [['brackets first: 2 + 3 = 5', '5 \\times 4'], ['then ×', '20']] },
  c: { label: '3x + 2, when x = 4', toks: [['3x', 'three times x'], ['+', 'plus'], ['2', 'two']], work: [['put 4 for x', '3 \\times 4 + 2'], ['× first, then +', '12 + 2 = 14']] },
  d: { label: '20 − 3 × (4 + 1)', toks: [['20', 'twenty'], ['-', 'minus'], ['3', 'three'], ['\\times', 'times'], ['(4+1)', 'four plus one, first']], work: [['brackets: 4 + 1 = 5', '20 - 3 \\times 5'], ['then ×: 3 × 5 = 15', '20 - 15'], ['then −', '5']] },
  e: { label: '½ b h, when b = 6 and h = 5', toks: [['\\tfrac12', 'half'], ['b', 'times the base'], ['h', 'times the height']], work: [['put in the numbers', '\\tfrac12 \\times 6 \\times 5'], ['multiply', '15']] },
};
export const start_symbols = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.5,
  mission: 'Find the line whose answer is 20.',
  goal: (t) => t.line === 'b',
  params: [
    { key: 'line', label: 'Line of math', type: 'choice', value: 'a', options: Object.entries(LINES).map(([value, l]) => ({ value, label: l.label })) },
    { key: 'words', hidden: true, value: 1 },
    { key: 'work', hidden: true, value: 9 },
  ],
  free: { words: 1, work: 9 },
  beats: [
    { say: 'Before 1557 nobody wrote “=”. Math was written in words, and every symbol here is still shorthand for words. Take this line.', set: { line: 'a', words: 0, work: 0 }, ms: 10500 },
    {
      say: 'Read it aloud: two, plus, three, times, four. Plus and minus were in print by 1489; the times cross by 1618.',
      set: { words: 1 },
      ms: 11000,
      notes: [{ text: 'say each symbol', at: [-5.2, -0.2], to: [-1.0, 1.4] }],
    },
    {
      say: 'Everyone agrees to multiply before adding. So 3 × 4 = 12 first, then 2 + 12 = 14. One line, one meaning.',
      set: { work: 3 },
      ms: 11500,
    },
    { say: 'To add first, use brackets: (2 + 3) × 4. Brackets come first, so it is 5 × 4 = 20.', set: { line: 'b', work: 3 }, ms: 10500 },
    {
      say: 'Letters stand for numbers, an idea Descartes made standard in 1637. “3x” means three times x. When x is 4, put 4 in its place: 12 + 2 = 14.',
      set: { line: 'c', work: 3 },
      ms: 12000,
      notes: [{ text: 'side by side means times', at: [-5.4, 3.6], to: [-1.9, 2.2], color: C.gold }],
    },
    { say: 'A longer one: brackets, then times, then minus. 20 − 3 × 5 = 20 − 15 = 5.', set: { line: 'd', work: 4 }, ms: 11000 },
    { say: 'And a formula you will use: the area of a triangle, half the base times the height. With base 6 and height 5, it is 15.', set: { line: 'e', work: 3 }, ms: 11000 },
  ],
  readout: (t) => [
    ['Line', LINES[t.line].label],
    ['Answer', LINES[t.line].work[LINES[t.line].work.length - 1][1].split('=').pop().trim()],
  ],
  setup(kit) {
    const toks = Array.from({ length: 5 }, () => kit.label('', [0, 0], { size: 40 }));
    const words = Array.from({ length: 5 }, () => kit.label('', [0, 0], { tex: false, size: 13, color: C.blue }));
    const rows = Array.from({ length: 3 }, (_, i) => ({
      why: kit.label('', [-1.2, -0.6 - i * 1.15], { tex: false, size: 14, color: C.grey, align: 'right' }),
      eq: kit.label('', [-0.6, -0.6 - i * 1.15], { size: 26, color: i === 2 ? C.yellow : C.text, align: 'left' }),
    }));
    let last = null;
    return (p, t) => {
      const L = LINES[t.line];
      if (last !== t.line) {
        last = t.line;
        const gap = 13 / Math.max(L.toks.length, 3);
        L.toks.forEach(([tok, w], i) => {
          const x = (i - (L.toks.length - 1) / 2) * gap;
          toks[i].set(tok).pos([x, 2.1]);
          words[i].set(w).pos([x, 1.0]);
        });
        L.work.forEach(([why, eq], i) => {
          rows[i].why.set(why);
          rows[i].eq.set(`= ${eq}`);
        });
      }
      toks.forEach((o, i) => o.visible(i < L.toks.length));
      words.forEach((o, i) => show(o, i < L.toks.length ? p.words * 1.6 - i * 0.15 : 0));
      rows.forEach((r, i) => {
        const a = i < L.work.length ? p.work - i : 0;
        show(r.why, a);
        show(r.eq, a);
        r.eq.color(i === L.work.length - 1 ? C.yellow : C.text);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// START 5. Pólya's four steps on the handshake problem
// ---------------------------------------------------------------------------
const STEPS4 = ['1  Understand the problem', '2  Make a plan', '3  Carry out the plan', '4  Look back'];
export const start_polya = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.5,
  mission: 'Find how many handshakes 8 people make.',
  goal: (t) => t.n === 8,
  params: [
    { key: 'n', label: 'People', min: 2, max: 8, step: 1, value: 6 },
    { key: 'lines', hidden: true, value: 1 },
    { key: 'stage', hidden: true, value: 4 },
    { key: 'table', hidden: true, value: 1 },
  ],
  free: { lines: 1, stage: 4, table: 1 },
  beats: [
    {
      say: 'Six friends meet, and every pair shakes hands once. How many handshakes? Pólya’s first step: understand it. Each line will be one pair.',
      set: { n: 6, lines: 0, stage: 1, table: 0 },
      ms: 11500,
    },
    {
      say: 'No plan comes to mind, so make the problem smaller. Two people: one handshake.',
      set: { n: 2, lines: 1, stage: 2, table: 1 },
      ms: 9500,
      notes: [{ text: 'try a smaller case', at: [3.6, -3.6], to: [3.4, 0.6], color: C.gold }],
    },
    { say: 'Three people: three. Four people: six. Each newcomer shakes hands with everyone already there.', set: { n: 4 }, ms: 10000 },
    { say: 'Five people: 1 + 2 + 3 + 4 = 10. The pattern is clear. Now carry out the plan for six.', set: { n: 5 }, ms: 10000 },
    {
      say: 'Six people: 1 + 2 + 3 + 4 + 5 = 15 handshakes. Every line is drawn.',
      set: { n: 6, stage: 3 },
      ms: 9500,
      notes: [{ text: '15 lines', at: [-6.6, -3.8], to: [-3.6, -1.6] }],
    },
    {
      say: 'Look back: check another way. Each of 6 people shakes 5 hands, 30, but that counts every handshake twice. 30 ÷ 2 = 15. It matches.',
      set: { stage: 4 },
      ms: 12500,
    },
  ],
  readout: (t) => [
    ['People', `${t.n}`],
    ['Handshakes', `${(t.n * (t.n - 1)) / 2}`],
    ['Check', `${t.n} × ${t.n - 1} ÷ 2 = ${(t.n * (t.n - 1)) / 2}`],
  ],
  setup(kit) {
    const CX = -3.6;
    const R = 2.5;
    const spot = (i, n) => [CX + R * Math.cos(Math.PI / 2 + (2 * Math.PI * i) / n), 0.2 + R * Math.sin(Math.PI / 2 + (2 * Math.PI * i) / n)];
    const pairs = [];
    for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) pairs.push([a, b]);
    const lines = pairs.map(() => kit.line([[0, 0], [0.01, 0]], { color: C.blue, width: 2, create: false, z: 2 }));
    const people = Array.from({ length: 8 }, () => kit.dot([0, 0], { r: 0.2, color: C.yellow, z: 5 }));
    const count = kit.label('', [CX, -2.9], { tex: false, size: 18, color: C.blue });
    const steps = STEPS4.map((s, i) => kit.label(s, [1.3, 3.2 - i * 0.6], { tex: false, size: 15, align: 'left' }));
    const rows = Array.from({ length: 7 }, (_, i) => kit.label(`${i + 2} people → ${((i + 2) * (i + 1)) / 2}`, [1.6, 0.5 - i * 0.48], { tex: false, size: 13, align: 'left' }));
    const pos = Array.from({ length: 8 }, () => [CX, 0.2]);
    return (p, t, time, dt) => {
      const n = t.n;
      for (let i = 0; i < 8; i++) {
        const want = i < n ? spot(i, n) : [CX, 0.2];
        pos[i][0] += (want[0] - pos[i][0]) * ease(dt, 4);
        pos[i][1] += (want[1] - pos[i][1]) * ease(dt, 4);
        people[i].set(pos[i]).visible(i < n);
      }
      const total = (n * (n - 1)) / 2;
      const drawn = Math.round(clamp(p.lines, 0, 1) * total);
      let k = 0;
      pairs.forEach(([a, b], j) => {
        const on = a < n && b < n;
        if (on) k++;
        lines[j].set([pos[a], pos[b]]).visible(on && k <= drawn);
      });
      count.set(p.lines > 0.05 ? `${drawn} handshake${drawn === 1 ? '' : 's'}` : '?');
      steps.forEach((s, i) => {
        const cur = Math.round(p.stage) === i + 1;
        s.color(cur ? C.yellow : i + 1 < p.stage ? C.green : C.grey);
        s.opacity(i < p.stage + 0.5 ? 1 : 0.45);
      });
      rows.forEach((r, i) => {
        show(r, p.table > 0.5 && i + 2 <= n ? 1 : 0);
        r.color(i + 2 === n ? C.yellow : C.text);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// START 6. Following a claim back to its source: do old windows sag?
// ---------------------------------------------------------------------------
const TRAIL = [
  { head: 'A post', says: '“Glass is a liquid: old windows have sagged, look!”', verdict: 'no source given', color: C.red },
  { head: 'A tour guide, a popular book', says: 'repeats it, still with no measurement', verdict: 'passed along', color: C.gold },
  { head: 'An encyclopedia', says: 'calls it a myth and cites a 1998 paper', verdict: 'points to evidence', color: C.blue },
  { head: 'The paper: Zanotto, 1998', says: 'flow would take longer than the age of the universe', verdict: 'evidence', color: C.green },
];
export const start_sources = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.4,
  mission: 'Trace the claim all the way back to the evidence.',
  goal: (t) => t.back >= 3,
  params: [
    { key: 'back', label: 'Steps traced back', min: 0, max: 3, step: 1, value: 0 },
    { key: 'real', hidden: true, value: 1 },
  ],
  free: { real: 1 },
  beats: [
    {
      say: 'A post says old church windows are thicker at the bottom because glass is a very slow liquid that has sagged over the centuries. Says who? Based on what?',
      set: { back: 0, real: 0 },
      ms: 12000,
      notes: [{ text: 'no source', at: [-5.6, -2.4], to: [-5.6, -0.7], color: C.red }],
    },
    { say: 'Step back. Where did it come from? A tour guide, a popular book. They repeat it, but nobody measured anything.', set: { back: 1 }, ms: 10500 },
    {
      say: 'Step back again. An encyclopedia calls it a myth, and cites a 1998 paper. Now there is something to check.',
      set: { back: 2 },
      ms: 10500,
    },
    {
      say: 'The paper: Edgar Zanotto calculated how fast cold window glass could flow. It would take far longer than the age of the universe to sag visibly.',
      set: { back: 3 },
      ms: 12000,
      notes: [{ text: 'the evidence', at: [5.6, -2.4], to: [5.6, -0.7], color: C.green }],
    },
    {
      say: 'The real reason: old panes were spun or blown by hand, so they came out uneven, and builders often set the thick edge at the bottom.',
      set: { real: 1 },
      ms: 11500,
    },
    { say: 'The Royal Society’s motto from 1660: take nobody’s word for it. Follow a claim back, and trust the evidence over the confidence.', set: {}, ms: 10500 },
  ],
  readout: (t) => [
    ['Traced back', `${t.back} of 3 steps`],
    ['Now looking at', TRAIL[t.back].head],
    ['Verdict', t.back === 3 ? 'The claim is a myth' : 'Not checked yet'],
  ],
  setup(kit) {
    const xs = [-5.6, -1.9, 1.9, 5.6];
    const boxes = TRAIL.map((s, i) => ({
      box: kit.rect(xs[i] - 1.55, -0.6, 3.1, 3.1, { color: s.color, opacity: 0.1, strokeColor: s.color, width: 2 }),
      head: kit.label(s.head, [xs[i], 2.1], { tex: false, size: 14, color: s.color }),
      says: kit.label(s.says, [xs[i], 1.0], { tex: false, size: 12, cls: 'wrap' }),
      verdict: kit.label(s.verdict, [xs[i], -0.2], { tex: false, size: 12, color: s.color }),
    }));
    for (const b of boxes) Object.assign(b.says.el.style, { width: '8em', whiteSpace: 'normal', textAlign: 'center' });
    const arrows = [0, 1, 2].map((i) => kit.arrow([xs[i + 1] - 1.6, 0.9], [xs[i] + 1.6, 0.9], { color: C.grey, width: 2, head: 0.22 }));
    // a window pane, thicker at the bottom
    const pane = kit.fill([[-2.6, -2.7], [-1.0, -2.7], [-1.15, -1.3], [-2.45, -1.3]], { color: C.blue, opacity: 0.25 });
    const paneL = kit.label('', [-0.6, -2.0], { tex: false, size: 13, color: C.grey, align: 'left' });
    const vis = [0, 0, 0, 0];
    return (p, t, time, dt) => {
      boxes.forEach((b, i) => {
        vis[i] += ((i <= p.back + 0.001 ? 1 : 0) - vis[i]) * ease(dt, 3);
        show(b.box, vis[i], 0.1);
        show(b.head, vis[i]);
        show(b.says, vis[i]);
        show(b.verdict, vis[i]);
        if (i < 3) arrows[i].visible(vis[i + 1] > 0.3);
      });
      show(pane, 1, 0.25);
      paneL.set(p.real > 0.5 ? 'uneven from the start, fitted thick edge down' : 'an old pane: thicker at the bottom');
      paneL.color(p.real > 0.5 ? C.green : C.grey);
    };
  },
};

// ---------------------------------------------------------------------------
// START 7. Building a Cornell page
// ---------------------------------------------------------------------------
const NOTES_R = ['iron + oxygen + water → rust', 'rust is flaky → falls off', 'fresh iron underneath → rusts again', 'paint keeps water and air out'];
const CUES = ['What makes rust?', 'Why does rust keep spreading?', 'How does paint help?'];
const SUMMARY = 'Rust needs oxygen and water. It flakes off, so it keeps spreading. Paint blocks both.';
export const start_cornell = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 1.4,
  mission: 'Cover the notes and answer the questions from memory.',
  goal: (t) => t.cover === 'on',
  params: [
    { key: 'cover', label: 'Notes column', type: 'choice', value: 'off', options: [{ value: 'off', label: 'Showing' }, { value: 'on', label: 'Covered (test yourself)' }] },
    { key: 'fill', hidden: true, value: 3 },
  ],
  free: { fill: 3 },
  beats: [
    {
      say: 'Cornell University, the 1950s. Walter Pauk rules a page into three parts: a wide column on the right, a narrow one on the left, and a strip along the bottom.',
      set: { cover: 'off', fill: 0 },
      ms: 11500,
      notes: [{ text: 'about 1 : 2', at: [-6.9, 4.1], to: [-4.2, 3.3] }],
    },
    {
      say: 'During class, the right column gets notes: short, in your own words, not every word that is said.',
      set: { fill: 1 },
      ms: 10500,
      notes: [{ text: 'notes, in your own words', at: [5.6, -3.0], to: [3.0, 1.0] }],
    },
    {
      say: 'Soon after class, turn each idea into a question in the left column. Now the page can test you.',
      set: { fill: 2 },
      ms: 10500,
      notes: [{ text: 'a question for each idea', at: [-6.8, -3.0], to: [-4.6, 1.3], color: C.gold }],
    },
    { say: 'At the bottom, two or three lines summing up the whole page.', set: { fill: 3 }, ms: 9000 },
    {
      say: 'To review, cover the notes and answer each question aloud. That is retrieval practice, on paper.',
      set: { cover: 'on' },
      ms: 10500,
    },
    { say: 'Do it tomorrow, then in a few days, then next week: spacing too. Your notes become your own Review tab. You are ready for week 1.', set: {}, ms: 11000 },
  ],
  readout: (t) => [
    ['Page parts', 'notes · questions · summary'],
    ['Notes column', t.cover === 'on' ? 'covered: recall from the questions' : 'showing'],
  ],
  setup(kit) {
    const L = -6.2;
    const M = -2.4;
    const R = 6.2;
    const T = 3.4;
    const B = -2.2;
    const BOT = -3.9;
    kit.rect(L, BOT, R - L, T - BOT, { color: 0xf3efe4, opacity: 0.08, strokeColor: C.white, width: 2 });
    kit.line([[M, B], [M, T]], { color: C.red, width: 2, create: true });
    kit.line([[L, B], [R, B]], { color: C.red, width: 2, create: true });
    const heads = [kit.label('questions', [(L + M) / 2, T - 0.35], { tex: false, size: 12, color: C.gold }), kit.label('notes', [(M + R) / 2, T - 0.35], { tex: false, size: 12, color: C.blue }), kit.label('summary', [L + 0.9, B - 0.35], { tex: false, size: 12, color: C.green })];
    const notes = NOTES_R.map((s, i) => kit.label(s, [M + 0.4, 2.4 - i * 1.05], { tex: false, size: 14, align: 'left' }));
    const cues = CUES.map((s, i) => kit.label(s, [L + 0.3, 2.4 - [0, 1.05, 3.15][i]], { tex: false, size: 12, align: 'left', color: C.gold }));
    const sum = kit.label(SUMMARY, [L + 0.3, -3.05], { tex: false, size: 12, align: 'left', color: C.green });
    const cover = kit.rect(M + 0.08, B + 0.08, R - M - 0.16, T - B - 0.16, { color: 0x3a4250, opacity: 0.95, strokeColor: C.grey, width: 1.5, z: 6 });
    const coverL = kit.label('covered: answer from the questions', [(M + R) / 2, 0.6], { tex: false, size: 14, color: C.white });
    let c = 0;
    return (p, t, time, dt) => {
      c += ((t.cover === 'on' ? 1 : 0) - c) * ease(dt, 4);
      heads.forEach((h, i) => show(h, i === 0 ? p.fill - 1 : i === 1 ? p.fill : p.fill - 2));
      // labels sit above the canvas, so the cover hides the notes by fading them
      notes.forEach((n, i) => show(n, Math.min(p.fill * 4 - i, 1 - c)));
      cues.forEach((q, i) => show(q, (p.fill - 1) * 3 - i));
      show(sum, p.fill - 2);
      show(cover, c, 0.95);
      show(coverL, c);
    };
  },
};
