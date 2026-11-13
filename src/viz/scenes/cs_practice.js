// Computer Science program: HCI, Software Engineering, Parallel Computing,
// Ethics and the Thesis (cs-157 to cs-162). Story scenes: hidden params drive
// the reveals, and touching any control switches to the `free` values.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono' };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

// ---------------------------------------------------------------------------
// cs-157: Fitts's law
// ---------------------------------------------------------------------------
const fittsID = (D, W) => Math.log2(D / W + 1);
export const fitts_targets = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Set the distance and width so the index of difficulty is exactly 3 bits.',
  goal: (t) => Math.abs(fittsID(t.D, t.W) - 3) < 0.02,
  params: [
    { key: 'D', label: 'Distance (px)', min: 100, max: 1100, step: 50, value: 400 },
    { key: 'W', label: 'Target width (px)', min: 20, max: 300, step: 10, value: 200 },
  ],
  beats: [
    { say: 'Your finger or pointer starts at the dot and must land on the green target. Fitts measured this in 1954: the time depends on distance D and width W.', set: { D: 400, W: 200 }, ms: 11500 },
    { say: 'Twice as far: the index of difficulty, log₂(D/W + 1), grows from 1.6 to 2.3 bits. Time grows with it, but only by a bit.', set: { D: 800 }, ms: 11000 },
    { say: 'Now shrink the target to 30 pixels. D/W jumps to about 27 and the difficulty to 4.8 bits: much slower, and easier to miss.', set: { W: 30 }, ms: 11500, notes: [{ text: 'small and far: slow', at: [4.6, 3.8], to: [2.0, 2.6], color: C.red }] },
    { say: 'Big and close is fast: 1 bit. That is why the buttons you use most are large and near your thumb.', set: { D: 200, W: 200 }, ms: 11000 },
  ],
  readout: (t) => {
    const id = fittsID(t.D, t.W);
    return [
      ['Index of difficulty', `${id.toFixed(2)} bits`],
      ['Predicted time', `${R(100 + 150 * id)} ms`],
    ];
  },
  setup(kit) {
    const S = 0.01;
    const X0 = -6.8;
    const Y = 1.0;
    kit.dot([X0, Y], { r: 0.2, color: C.gold });
    const tgt = kit.rect(0, Y - 1.5, 1, 3, { color: C.green, opacity: 0.55, strokeColor: C.green, width: 2 });
    const arr = kit.arrow([X0, Y], [0, Y], { color: C.gold });
    const dL = kit.label('', [0, Y - 1.95], { ...mono, size: 14, color: C.gold });
    const wL = kit.label('', [0, Y + 1.85], { ...mono, size: 14, color: C.green });
    // T vs ID chart
    const cx = (id) => -6.8 + id * 1.0;
    const cy = (ms) => -4.0 + (ms - 100) * (2.2 / 1000);
    kit.line([[cx(0), cy(100)], [cx(6.5), cy(100)]], { color: C.axis, width: 1.5 });
    kit.line([[cx(0), cy(100)], [cx(0), cy(1100)]], { color: C.axis, width: 1.5 });
    kit.line([[cx(0), cy(100)], [cx(6.5), cy(100 + 150 * 6.5)]], { color: C.grey, width: 1.5, dashed: true });
    kit.label('ID (bits) →', [cx(6.5), cy(100) - 0.3], { tex: false, size: 12, color: C.grey });
    kit.label('time', [cx(0) - 0.2, cy(1100) + 0.25], { tex: false, size: 12, color: C.grey });
    const pt = kit.dot([0, 0], { r: 0.12, color: C.gold });
    const tL = kit.label('', [2.6, -3.0], { tex: false, size: 20 });
    return (t) => {
      const D = t.D * S;
      const W = t.W * S;
      const xc = clamp(X0 + D, -6, 7.4);
      tgt.set(xc - W / 2, Y - 1.5, W, 3);
      arr.set([X0 + 0.25, Y], [xc - W / 2 - 0.05 > X0 + 0.4 ? xc - W / 2 - 0.05 : xc, Y]);
      dL.set(`D = ${R(t.D)}`).pos([(X0 + xc) / 2, Y - 0.35]);
      wL.set(`W = ${R(t.W)}`).pos([xc, Y + 1.85]);
      const id = fittsID(t.D, t.W);
      pt.set([cx(id), cy(100 + 150 * id)]);
      tL.set(`T ≈ 100 + 150 × ${id.toFixed(2)} = ${R(100 + 150 * id)} ms`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-158: communication paths in a team
// ---------------------------------------------------------------------------
export const team_paths = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find the smallest team with more than 100 communication paths.',
  goal: (t) => R(t.n) === 15,
  params: [{ key: 'n', label: 'People', min: 2, max: 15, step: 1, value: 3 }],
  beats: [
    { say: 'Three people on a project: three pairs who may need to talk. Easy.', set: { n: 3 }, ms: 9000 },
    { say: 'Five people: ten pairs. Every decision now has more people to tell.', set: { n: 5 }, ms: 9500 },
    { say: 'Ten people: forty-five paths. Twice the people, four and a half times the talking. The count is n(n − 1)/2, the handshake count from counting class.', set: { n: 10 }, ms: 12000, notes: [{ text: '45 lines', at: [4.6, 3.6], to: [-0.4, 1.4], color: C.gold }] },
    { say: 'This is part of Brooks’s law: new people must be trained and kept in the loop, so adding them to a late project slows it further. Real teams split into small groups with clear boundaries.', set: { n: 15 }, ms: 13000 },
  ],
  readout: (t) => {
    const n = R(t.n);
    return [
      ['People', `${n}`],
      ['Paths', `${(n * (n - 1)) / 2}`],
    ];
  },
  setup(kit) {
    const O = [-2.0, 0];
    const RAD = 3.4;
    const pos = (i, n) => [O[0] + RAD * Math.cos(Math.PI / 2 + (2 * Math.PI * i) / n), O[1] + RAD * Math.sin(Math.PI / 2 + (2 * Math.PI * i) / n)];
    const lines = [];
    for (let i = 0; i < 15; i++) for (let j = i + 1; j < 15; j++) lines.push({ i, j, ln: kit.line([[0, 0], [1, 1]], { color: C.gold, width: 1, opacity: 0.5 }) });
    const dots = Array.from({ length: 15 }, () => kit.dot([0, 0], { r: 0.28, color: C.blue }));
    const big = kit.label('', [4.8, 0.5], { tex: false, size: 30, color: C.gold });
    const sub = kit.label('', [4.8, -0.5], { tex: false, size: 15, color: C.grey });
    return (t) => {
      const n = R(t.n);
      dots.forEach((d, i) => {
        d.visible(i < n);
        if (i < n) d.set(pos(i, n));
      });
      lines.forEach(({ i, j, ln }) => {
        const on = j < n;
        ln.visible(on);
        if (on) ln.set([pos(i, n), pos(j, n)]);
      });
      big.set(`${(n * (n - 1)) / 2} paths`);
      sub.set(`${n} people: ${n} × ${n - 1} ÷ 2`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-159: git bisect over 64 commits
// ---------------------------------------------------------------------------
export function bisect(bad, k) {
  let lo = 0;
  let hi = 63;
  const tested = [];
  for (let s = 0; s < k && hi - lo > 1; s++) {
    const mid = Math.floor((lo + hi) / 2);
    tested.push(mid);
    if (mid >= bad) hi = mid;
    else lo = mid;
  }
  return { lo, hi, tested, done: hi - lo === 1 };
}
export const bisect_hunt = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Move the bug to any commit you like and bisect to the end. Does it ever need more than 6 tests?',
  goal: (t) => bisect(R(t.bad), R(t.k)).done,
  params: [
    { key: 'bad', label: 'Bug introduced at commit', min: 1, max: 63, step: 1, value: 41 },
    { key: 'k', label: 'Tests run', min: 0, max: 6, step: 1, value: 0 },
  ],
  beats: [
    { say: '64 commits, oldest at the top left. Commit 0 worked; commit 63, today’s, is broken. Somewhere a change broke it. Testing all 64 would be slow.', set: { bad: 41, k: 0 }, ms: 12000 },
    { say: 'git bisect checks out the middle commit, 31, and you test it. It works, so the bug came later. Half the commits are cleared with one test.', set: { k: 1 }, ms: 12000, notes: [{ text: 'tested: good', at: [-4.4, 3.4], to: [6.6, 1.9], color: C.green }] },
    { say: 'Next the middle of what is left, 47: broken. The bug is between 32 and 47.', set: { k: 2 }, ms: 10000 },
    { say: 'Six tests in all, and one commit is left: 41 is the first bad commit. Its message and changes show exactly what broke.', set: { k: 6 }, ms: 12000 },
    { say: 'This is binary search (cs-135) on history: 1,024 commits need only 10 tests; a million need 20.', set: { k: 6 }, ms: 9000 },
  ],
  readout: (t) => {
    const r = bisect(R(t.bad), R(t.k));
    return [
      ['Tests', `${r.tested.length}`],
      ['Suspects left', `${r.hi - r.lo}`],
      ['First bad', r.done ? `${r.hi}` : '—'],
    ];
  },
  setup(kit) {
    const X = (i) => -7.2 + (i % 32) * 0.45;
    const Y = (i) => (i < 32 ? 1.6 : -0.6);
    const cells = Array.from({ length: 64 }, (_, i) => kit.rect(X(i), Y(i), 0.38, 0.8, { color: C.grey, opacity: 0.5, strokeColor: C.grid, width: 1 }));
    for (let i = 0; i < 64; i += 8) kit.label(`${i}`, [X(i) + 0.19, Y(i) + 1.1], { ...mono, size: 11, color: C.grey });
    const mark = kit.arrow([0, 0], [0, 1], { color: C.gold });
    const msg = kit.label('', [0, -2.6], { tex: false, size: 20 });
    kit.label('■ good   ■ broken   ■ not yet known', [0, -3.7], { tex: false, size: 13, color: C.grey });
    return (t) => {
      const bad = R(t.bad);
      const r = bisect(bad, R(t.k));
      cells.forEach((c, i) => {
        const col = i <= r.lo ? C.green : i >= r.hi ? C.red : C.grey;
        c.color(col);
        c.opacity(i <= r.lo || i >= r.hi ? 0.75 : 0.35);
      });
      const last = r.tested[r.tested.length - 1];
      mark.visible(last !== undefined);
      if (last !== undefined) mark.set([X(last) + 0.19, Y(last) + 2.0], [X(last) + 0.19, Y(last) + 0.9]);
      msg.set(r.done ? `first bad commit: ${r.hi}, found in ${r.tested.length} tests` : `${r.hi - r.lo - 1} commits still unknown`).color(r.done ? C.gold : C.text);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-160: Amdahl's law
// ---------------------------------------------------------------------------
const amdahl = (p, N) => 1 / (1 - p + p / N);
export const amdahl_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'With a 95% parallel program, how many cores do you need for at least a 15× speed-up?',
  goal: (t) => Math.abs(t.p - 0.95) < 0.006 && amdahl(t.p, 2 ** R(t.c)) >= 15,
  params: [
    { key: 'p', label: 'Parallel fraction p', min: 0.5, max: 0.99, step: 0.01, value: 0.5 },
    { key: 'c', label: 'Cores (log₂)', min: 0, max: 10, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A job takes 1 hour on one core. Half of it can be split among cores; half must run in order. Add cores: 2, 4, 8, …', set: { p: 0.5, c: 0 }, ms: 11000 },
    { say: 'Even with 1,024 cores, the speed-up creeps toward 2× and stops. The serial half still takes 30 minutes.', set: { c: 10 }, ms: 11500, notes: [{ text: 'ceiling: 1 / (1 − p)', at: [4.8, 2.0], to: [4.0, -2.0], color: C.red }] },
    { say: 'Make the job 90% parallel: the ceiling rises to 10×. 95% parallel: 20×.', set: { p: 0.95 }, ms: 11000 },
    { say: 'At 99% parallel, 1,024 cores give about 91×. Graphics and neural networks are like this, almost all the same sum on different numbers, which is why GPUs with thousands of cores shine.', set: { p: 0.99 }, ms: 13500 },
  ],
  readout: (t) => {
    const N = 2 ** R(t.c);
    return [
      ['Cores', `${N}`],
      ['Speed-up', `${amdahl(t.p, N).toFixed(1)}×`],
      ['Ceiling', `${(1 / (1 - t.p)).toFixed(0)}×`],
    ];
  },
  setup(kit) {
    const YMAX = 25;
    const X = (k) => -6 + k * 1.2;
    const Yv = (s) => -3.5 + (Math.min(s, YMAX) / YMAX) * 6.8;
    kit.line([[X(0), Yv(0)], [X(10), Yv(0)]], { color: C.axis, width: 1.5 });
    kit.line([[X(0), Yv(0)], [X(0), Yv(YMAX)]], { color: C.axis, width: 1.5 });
    [0, 2, 4, 6, 8, 10].forEach((k) => kit.label(`${2 ** k}`, [X(k), Yv(0) - 0.35], { ...mono, size: 12, color: C.grey }));
    [5, 10, 15, 20, 25].forEach((s) => {
      kit.label(`${s}×`, [X(0) - 0.55, Yv(s)], { ...mono, size: 12, color: C.grey });
      kit.line([[X(0), Yv(s)], [X(10), Yv(s)]], { color: C.grid, width: 1, opacity: 0.6 });
    });
    kit.label('cores →', [X(10) + 0.9, Yv(0) - 0.35], { tex: false, size: 12, color: C.grey });
    const curve = kit.line([[0, 0], [1, 1]], { color: C.blue, width: 3 });
    const ceil = kit.line([[0, 0], [1, 1]], { color: C.red, width: 2, dashed: true });
    const ceilL = kit.label('', [0, 0], { tex: false, size: 13, color: C.red, align: 'left' });
    const dot = kit.dot([0, 0], { r: 0.16, color: C.gold });
    const val = kit.label('', [0, 0], { ...mono, size: 16, color: C.gold });
    return (t) => {
      const pts = [];
      for (let k = 0; k <= 10.001; k += 0.1) {
        const sp = amdahl(t.p, 2 ** k);
        pts.push([X(k), Yv(sp)]);
        if (sp > YMAX) break;
      }
      curve.set(pts);
      const cap = 1 / (1 - t.p);
      ceil.visible(cap <= YMAX);
      if (cap <= YMAX) ceil.set([[X(0), Yv(cap)], [X(10), Yv(cap)]]);
      ceilL.set(cap <= YMAX ? `ceiling ${cap.toFixed(0)}×` : `ceiling ${cap.toFixed(0)}× (off the chart)`).pos([X(0) + 0.2, cap <= YMAX ? Yv(cap) + 0.3 : Yv(YMAX) + 0.3]);
      const k = R(t.c);
      const s = amdahl(t.p, 2 ** k);
      dot.set([X(k), Yv(s)]);
      val.set(`${s.toFixed(1)}×${s > YMAX ? ' ↑' : ''}`).pos([X(k) + (k > 8 ? -0.8 : 0.8), Math.min(Yv(s) + 0.35, 3.6)]);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-161: how a few facts pick one person out of a town
// ---------------------------------------------------------------------------
const FACTS = {
  exact: [['sex', 1 / 2], ['birth year', 1 / 70], ['birthday (day and month)', 1 / 365]],
  blur: [['sex', 1 / 2], ['birth decade', 1 / 7], ['birth month only', 1 / 12]],
};
const ORDER = (() => {
  const a = Array.from({ length: 400 }, (_, i) => i);
  let s = 7;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
})();
export const crowdLeft = (mode, k) => FACTS[mode].slice(0, k).reduce((n, [, f]) => n * f, 10000);
export const reid_crowd = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Switch to blurred facts and add all three. About how many people now match?',
  goal: (t) => t.mode === 'blur' && R(t.k) >= 3,
  params: [
    { key: 'mode', label: 'Facts released', type: 'choice', value: 'exact', options: [{ value: 'exact', label: 'Exact (year, day)' }, { value: 'blur', label: 'Blurred (decade, month)' }] },
    { key: 'k', label: 'Facts known', min: 0, max: 3, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A town of 10,000 people; each dot stands for 25. A hospital shares records with names removed. You know a few ordinary facts about one neighbour.', set: { mode: 'exact', k: 0 }, ms: 12000 },
    { say: 'Sex: about half the town still matches, 5,000 people. Safe so far.', set: { k: 1 }, ms: 9000 },
    { say: 'Birth year: about 1 in 70. Now roughly 71 people match.', set: { k: 2 }, ms: 9500 },
    { say: 'Birthday: 1 in 365. Expected matches: 0.2. Almost certainly only your neighbour fits, and their “anonymous” record is found. Sweeney did exactly this to a governor in 1997.', set: { k: 3 }, ms: 13000, notes: [{ text: 'one person left', at: [3.0, -3.4], to: [-0.6, 0.8], color: C.red }] },
    { say: 'Blurring helps: release only the birth decade and month. All three facts still leave about 60 people in every group, so no record points to one person. This idea is k-anonymity.', set: { mode: 'blur', k: 3 }, ms: 13500 },
  ],
  readout: (t) => {
    const n = crowdLeft(t.mode, R(t.k));
    return [
      ['Matching people', n >= 10 ? `${R(n)}` : n.toFixed(1)],
      ['Identified?', n < 1 ? 'yes, almost certainly' : n < 5 ? 'nearly' : 'no'],
    ];
  },
  setup(kit) {
    const dots = Array.from({ length: 400 }, (_, i) => kit.dot([-7.2 + (i % 20) * 0.34, 3.4 - Math.floor(i / 20) * 0.34], { r: 0.11, color: C.blue }));
    const factL = [0, 1, 2].map((i) => kit.label('', [0.6, 2.4 - i * 0.7], { tex: false, size: 16, align: 'left' }));
    kit.label('Known about one person:', [0.6, 3.3], { tex: false, size: 15, color: C.grey, align: 'left' });
    const big = kit.label('', [3.6, -1.0], { tex: false, size: 30 });
    const sub = kit.label('people match', [3.6, -1.9], { tex: false, size: 15, color: C.grey });
    return (t) => {
      const k = R(t.k);
      const n = crowdLeft(t.mode, k);
      const lit = n >= 25 ? R(n / 25) : 1;
      dots.forEach((d, i) => {
        const on = ORDER.indexOf(i) < lit;
        d.color(on ? (n < 1 ? C.red : C.gold) : C.blue);
        d.opacity(on ? 1 : 0.25);
      });
      FACTS[t.mode].forEach(([name, f], i) => factL[i].set(`${i < k ? '✓' : '·'} ${name} (1 in ${R(1 / f)})`).color(i < k ? C.text : C.grey));
      big.set(n >= 10 ? `${R(n).toLocaleString('en-US')}` : n.toFixed(1)).color(n < 1 ? C.red : n < 20 ? C.gold : C.green);
      sub.set(n < 1 ? 'people match: likely unique' : 'people match');
    };
  },
};

// ---------------------------------------------------------------------------
// cs-162: are two methods really different? Runs and 95% intervals
// ---------------------------------------------------------------------------
function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function samples(mean, seed) {
  const r = rng(seed);
  return Array.from({ length: 50 }, () => mean + 0.5 * Math.sqrt(-2 * Math.log(r() + 1e-12)) * Math.cos(2 * Math.PI * r()));
}
const RUNS = { A: samples(9.6, 3), B: samples(10.0, 5) };
// 95% two-sided t values: honest intervals for a handful of runs
const T95 = [0, 12.71, 4.3, 3.18, 2.78, 2.57, 2.45, 2.36, 2.31, 2.26, 2.23, 2.2, 2.18, 2.16, 2.14, 2.13, 2.12, 2.11, 2.1, 2.09, 2.09];
const tcrit = (df) => (df < T95.length ? T95[df] : df < 30 ? 2.06 : df < 60 ? 2.01 : 1.96);
export function stats(xs) {
  const n = xs.length;
  const m = xs.reduce((a, b) => a + b, 0) / n;
  const s = n > 1 ? Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1)) : 0;
  return { n, m, half: n > 1 ? (tcrit(n - 1) * s) / Math.sqrt(n) : null };
}
export const separated = (n) => {
  const a = stats(RUNS.A.slice(0, n));
  const b = stats(RUNS.B.slice(0, n));
  return a.half !== null && a.m + a.half < b.m - b.half;
};
export const trials_ci = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Add runs until the two 95% intervals stop overlapping. Then you can say A is faster.',
  goal: (t) => separated(R(t.n)),
  params: [{ key: 'n', label: 'Runs of each', min: 1, max: 50, step: 1, value: 1 }],
  beats: [
    { say: 'One run each: A took about 9.6 seconds, B about 10. Is A faster? Every run varies by about half a second, so one run proves nothing.', set: { n: 1 }, ms: 12000 },
    { say: 'Three runs each. The bars show 95% intervals: where the true average probably lies. They overlap a lot: no conclusion yet.', set: { n: 3 }, ms: 11500, notes: [{ text: 'overlap: can’t tell', at: [4.6, 3.6], to: [0.4, 0.4], color: C.red }] },
    { say: 'Ten runs: the intervals shrink. The uncertainty falls like 1/√n: four times the runs, half the width.', set: { n: 10 }, ms: 11000 },
    { say: 'Fifty runs: the intervals are well apart. Now the claim “A is faster, by about 0.4 s” is supported. A thesis reports the runs, the spread and the code, so others can check.', set: { n: 50 }, ms: 13000 },
  ],
  readout: (t) => {
    const n = R(t.n);
    const a = stats(RUNS.A.slice(0, n));
    const b = stats(RUNS.B.slice(0, n));
    const f = (s) => (s.half === null ? `${s.m.toFixed(2)} s` : `${s.m.toFixed(2)} ± ${s.half.toFixed(2)} s`);
    return [
      ['A', f(a)],
      ['B', f(b)],
      ['Verdict', separated(n) ? 'A is faster' : 'not clear yet'],
    ];
  },
  setup(kit) {
    const X = (s) => -6 + ((s - 8.4) / 3.0) * 12;
    kit.line([[X(8.4), -3.0], [X(11.4), -3.0]], { color: C.axis, width: 1.5 });
    [8.5, 9, 9.5, 10, 10.5, 11].forEach((s) => kit.label(`${s}`, [X(s), -3.35], { ...mono, size: 12, color: C.grey }));
    kit.label('seconds', [X(11.4) + 0.6, -3.35], { tex: false, size: 12, color: C.grey });
    const rows = [['A', 1.4, C.blue], ['B', -1.2, C.gold]].map(([k, y, col]) => {
      kit.label(`method ${k}`, [-7.2, y + 0.8], { tex: false, size: 15, color: col, align: 'left' });
      return {
        k,
        y,
        dots: RUNS[k].map(() => kit.dot([0, 0], { r: 0.08, color: col, opacity: 0.45 })),
        bar: kit.line([[0, 0], [1, 1]], { color: col, width: 6 }),
        mean: kit.line([[0, 0], [1, 1]], { color: C.white, width: 3 }),
      };
    });
    const verdict = kit.label('', [0, 3.6], { tex: false, size: 20 });
    return (t) => {
      const n = R(t.n);
      rows.forEach((r) => {
        const xs = RUNS[r.k];
        r.dots.forEach((d, i) => {
          d.visible(i < n);
          if (i < n) d.set([X(clamp(xs[i], 8.4, 11.4)), r.y - 0.45 + ((i * 37) % 10) * 0.09]);
        });
        const s = stats(xs.slice(0, n));
        r.mean.set([[X(s.m), r.y + 0.3], [X(s.m), r.y + 1.0]]);
        r.bar.visible(s.half !== null);
        if (s.half !== null) r.bar.set([[X(s.m - s.half), r.y + 0.65], [X(s.m + s.half), r.y + 0.65]]);
      });
      const ok = separated(n);
      verdict.set(ok ? 'intervals apart: A is faster' : 'intervals overlap: not clear yet').color(ok ? C.green : C.red);
    };
  },
};
