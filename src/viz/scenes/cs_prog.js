// Computer Science program: Fundamentals of Programming (cs-101 to cs-106).
// Written as stories from the start: hidden params drive the reveals, and
// touching any control switches to the `free` values.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono', align: 'left' };

// ---------------------------------------------------------------------------
// cs-101: step through a short program, watching the variable boxes
// ---------------------------------------------------------------------------
const PROGS = {
  basic: {
    lines: ['a = 5', 'b = a + 2', 'a = a * 3', 'print(a, b)'],
    vars: ['a', 'b'],
    states: [{}, { a: 5 }, { a: 5, b: 7 }, { a: 15, b: 7 }, { a: 15, b: 7, out: '15 7' }],
  },
  swap: {
    lines: ['x = 4', 'y = 9', 't = x', 'x = y', 'y = t'],
    vars: ['x', 'y', 't'],
    states: [{}, { x: 4 }, { x: 4, y: 9 }, { x: 4, y: 9, t: 4 }, { x: 9, y: 9, t: 4 }, { x: 9, y: 4, t: 4 }],
  },
  count: {
    lines: ['n = 0', 'n = n + 1', 'n = n + 1', 'n = n * 10', 'print(n)'],
    vars: ['n'],
    states: [{}, { n: 0 }, { n: 1 }, { n: 2 }, { n: 20 }, { n: 20, out: '20' }],
  },
};
export const prog_trace = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Run the swap program to the end and check that x and y really traded places.',
  goal: (t) => t.prog === 'swap' && R(t.step) >= 5,
  params: [
    { key: 'prog', label: 'Program', type: 'choice', value: 'basic', options: [{ value: 'basic', label: 'a and b' }, { value: 'swap', label: 'Swap x and y' }, { value: 'count', label: 'Counting up' }] },
    { key: 'step', label: 'Lines run', min: 0, max: 5, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A program is a list of instructions. The computer runs them one at a time, from the top. Nothing has run yet, so there are no boxes.', set: { prog: 'basic', step: 0 }, ms: 9000, notes: [{ text: 'runs from the top, one line at a time', at: [-4.2, -3.8] }] },
    { say: 'Line 1, a = 5. Python makes a box called a and puts 5 in it. Read = as “put into”, not “is equal to”.', set: { step: 1 }, ms: 9500, notes: [{ text: 'a new box, holding 5', at: [5.8, 2.7], to: [3.25, 0.5] }] },
    { say: 'Line 2, b = a + 2. First the right side: look inside a, find 5, add 2. Then 7 goes into a new box, b.', set: { step: 2 }, ms: 10000, notes: [{ text: 'right side first: 5 + 2', at: [5.4, -2.6], to: [4.4, -0.65], color: C.gold }] },
    { say: 'Line 3, a = a * 3. The old a is 5, so the new a is 15. In algebra “a = 3a” would be nonsense; here it means “replace”.', set: { step: 3 }, ms: 10500, notes: [{ text: '5 is replaced by 15', at: [1.6, -2.6], to: [2.3, -0.65] }] },
    { say: 'Notice that b is still 7. It got a copy of the value back then. Changing a later does not reach it.', set: { step: 3 }, ms: 9000, notes: [{ text: 'still 7', at: [6.0, -2.6], to: [4.4, -0.65], color: C.gold }] },
    { say: 'print shows the values on the screen: 15 7.', set: { step: 4 }, ms: 7500 },
    { say: 'A classic puzzle: swap x and y. If you wrote x = y first, the 4 would be lost forever. A third box t keeps a copy.', set: { prog: 'swap', step: 3 }, ms: 11000, notes: [{ text: 't saves the 4', at: [6.5, -2.6], to: [6.5, -0.65] }] },
    { say: 'x = y, then y = t. Now x holds 9 and y holds 4. Step back and forward yourself, or try the other programs.', set: { step: 5 }, ms: 10000 },
  ],
  readout: (p) => {
    const P = PROGS[p.prog];
    const s = Math.min(R(p.step), P.lines.length);
    const st = P.states[s];
    return [
      ['Line just run', s ? `${s}: ${P.lines[s - 1]}` : 'none yet'],
      ['Boxes', P.vars.filter((v) => v in st).map((v) => `${v} = ${st[v]}`).join(', ') || 'none'],
      ['Screen', st.out || ''],
    ];
  },
  setup(kit) {
    kit.rect(-7.7, -3.0, 7.0, 6.1, { color: 0x0b1220, opacity: 0.9, strokeColor: C.grid, width: 2 });
    kit.label('\\text{program}', [-4.2, 3.55], { size: 13, color: C.grey });
    kit.label('\\text{boxes (variables)}', [4.2, 3.55], { size: 13, color: C.grey });
    const nums = [];
    const code = [];
    for (let i = 0; i < 5; i++) {
      nums.push(kit.label(`${i + 1}`, [-7.3, 2.3 - i * 1.05], { ...mono, size: 14, color: C.grey }));
      code.push(kit.label('', [-6.6, 2.3 - i * 1.05], { ...mono, size: 21 }));
    }
    const ran = kit.arrow([-8.6, 0], [-7.6, 0], { color: C.green });
    const boxes = [0, 1, 2].map((i) => {
      const x = 1.4 + i * 2.1;
      return {
        r: kit.rect(x, -0.6, 1.8, 1.5, { color: C.blue, opacity: 0.12, strokeColor: C.blue, width: 2 }),
        name: kit.label('', [x + 0.9, 1.3], { tex: false, cls: 'mono', size: 18, color: C.blue }),
        val: kit.label('', [x + 0.9, 0.15], { tex: false, cls: 'mono', size: 30 }),
      };
    });
    const out = kit.label('', [1.4, -2.3], { ...mono, size: 20, color: C.green });
    return (q) => {
      const P = PROGS[q.prog] || PROGS.basic;
      const s = Math.max(0, Math.min(R(q.step), P.lines.length));
      const st = P.states[s];
      const before = P.states[Math.max(0, s - 1)];
      code.forEach((c, i) => {
        c.set(P.lines[i] || '').color(i === s - 1 ? C.green : i < s ? '#9aa4ae' : C.text);
        nums[i].visible(i < P.lines.length);
      });
      ran.visible(s > 0);
      if (s > 0) ran.set([-8.4, 2.3 - (s - 1) * 1.05], [-7.65, 2.3 - (s - 1) * 1.05]);
      boxes.forEach((b, i) => {
        const v = P.vars[i];
        const on = v != null && v in st;
        b.r.visible(on);
        b.name.visible(on).set(v || '');
        b.val.visible(on).set(on ? `${st[v]}` : '');
        b.val.color(on && before[v] !== st[v] && s > 0 ? C.gold : C.white);
      });
      out.set(st.out ? `screen:  ${st.out}` : '');
    };
  },
};

// ---------------------------------------------------------------------------
// cs-102: the Gregorian leap-year rule as a flow of decisions
// ---------------------------------------------------------------------------
const leapOf = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
export const leap_flow = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 7,
  mission: 'Find a year after 1600 that is divisible by 4 but is NOT a leap year.',
  goal: (t) => R(t.y) % 4 === 0 && !leapOf(R(t.y)),
  params: [
    { key: 'y', label: 'Year', min: 1600, max: 2400, step: 1, value: 2024 },
    { key: 'go', hidden: true, value: 3 },
  ],
  free: { go: 3 },
  beats: [
    { say: 'Earth goes round the Sun in about 365.2422 days. A calendar of 365 days slips a quarter of a day every year, so we add leap days. But which years?', set: { y: 2024, go: 0 }, ms: 11000 },
    { say: 'First test: is the year divisible by 4? In Python: y % 4 == 0, “the remainder after dividing by 4 is 0”. 2024 passes.', set: { go: 1 }, ms: 10000, notes: [{ text: '2024 ÷ 4 = 506, remainder 0', at: [-0.6, 3.75], to: [-3.6, 2.0] }] },
    { say: 'Julius Caesar stopped there: every fourth year. That makes 365.25 days, a little too long. By 1582 the calendar had drifted ten days.', set: { y: 2023, go: 1 }, ms: 11000, notes: [{ text: '2023: remainder 3, no leap day', at: [-0.6, -3.9], to: [-3.4, -2.75], color: C.red }] },
    { say: 'The Gregorian fix adds a second test: is it a century year, divisible by 100? 1900 is. Then it is NOT a leap year…', set: { y: 1900, go: 2 }, ms: 11000 },
    { say: '…unless a third test passes: divisible by 400. 1900 fails it, so 1900 had no 29 February.', set: { go: 3 }, ms: 9500, notes: [{ text: '1900 ÷ 400 leaves 300', at: [2.6, 3.8], to: [4.2, 2.3], color: C.red }] },
    { say: '2000 passes all three tests, so it was a leap year. 97 leap days in every 400 years: 365.2425 days on average.', set: { y: 2000, go: 3 }, ms: 11000, notes: [{ text: '2000 is a leap year', at: [-1.6, -3.9], to: [1.2, -2.75], color: C.green }] },
    { say: 'Each diamond is an if. The order matters: a program that only checked “divisible by 4” would get 1900 wrong. Try your own years.', set: { y: 2100 }, ms: 10000 },
  ],
  readout: (p) => {
    const y = R(p.y);
    return [
      ['y % 4', `${y % 4}`],
      ['y % 100', `${y % 100}`],
      ['y % 400', `${y % 400}`],
      ['Leap year?', leapOf(y) ? 'yes: 366 days' : 'no: 365 days'],
    ];
  },
  setup(kit) {
    const diamond = (x, y, text) => {
      const w = 1.75;
      const h = 0.95;
      const l = kit.line([[x - w, y], [x, y + h], [x + w, y], [x, y - h], [x - w, y]], { color: C.blue, width: 2.5 });
      const t = kit.label(text, [x, y], { tex: false, cls: 'mono', size: 14 });
      return { l, t };
    };
    const box = (x, y, text) => {
      const r = kit.rect(x - 1.15, y - 0.45, 2.3, 0.9, { color: C.grey, opacity: 0.15, strokeColor: C.grey, width: 2 });
      const t = kit.label(text, [x, y], { tex: false, size: 15 });
      return { r, t };
    };
    const yearL = kit.label('', [-6.6, 3.6], { tex: false, cls: 'mono', size: 26, color: C.gold });
    const D = [diamond(-4.6, 1.3, 'y % 4 == 0 ?'), diamond(-0.4, 1.3, 'y % 100 == 0 ?'), diamond(3.8, 1.3, 'y % 400 == 0 ?')];
    const B = [box(-4.6, -2.4, 'not leap'), box(-0.4, -2.4, 'leap'), box(2.4, -2.4, 'leap'), box(5.6, -2.4, 'not leap')];
    const E = [
      kit.line([[-2.85, 1.3], [-2.15, 1.3]], { width: 3 }), // 4 yes → 100
      kit.line([[-4.6, 0.35], [-4.6, -1.95]], { width: 3 }), // 4 no → not leap
      kit.line([[-0.4, 0.35], [-0.4, -1.95]], { width: 3 }), // 100 no → leap
      kit.line([[1.35, 1.3], [2.05, 1.3]], { width: 3 }), // 100 yes → 400
      kit.line([[3.8, 0.35], [2.4, -1.95]], { width: 3 }), // 400 yes → leap
      kit.line([[3.8, 0.35], [5.6, -1.95]], { width: 3 }), // 400 no → not leap
    ];
    const tags = [
      kit.label('yes', [-2.5, 1.65], { tex: false, size: 12, color: C.green }),
      kit.label('no', [-4.95, -0.8], { tex: false, size: 12, color: C.red }),
      kit.label('no', [-0.75, -0.8], { tex: false, size: 12, color: C.red }),
      kit.label('yes', [1.7, 1.65], { tex: false, size: 12, color: C.green }),
      kit.label('yes', [2.75, -0.7], { tex: false, size: 12, color: C.green }),
      kit.label('no', [5.0, -0.7], { tex: false, size: 12, color: C.red }),
    ];
    const dot = kit.dot([-4.6, 2.55], { r: 0.16, color: C.gold, glow: true });
    void tags;
    const spots = [[-4.6, 2.55], [-0.4, 2.55], [3.8, 2.55]];
    const endSpots = [[-4.6, -3.15], [-0.4, -3.15], [2.4, -3.15], [5.6, -3.15]];
    return (q) => {
      const y = R(q.y);
      yearL.set(`${y}`);
      // The path as decisions: [edge taken, where it lands]. A landing spot
      // below 0 is a result box (−1 − its number).
      const steps = [];
      if (y % 4 !== 0) steps.push([1, -1]);
      else {
        steps.push([0, 1]);
        if (y % 100 !== 0) steps.push([2, -2]);
        else {
          steps.push([3, 2]);
          steps.push(y % 400 === 0 ? [4, -3] : [5, -4]);
        }
      }
      const k = Math.max(0, Math.min(steps.length, Math.floor(q.go + 0.02)));
      const taken = steps.slice(0, k).map((t) => t[0]);
      E.forEach((e, i) => e.color(taken.includes(i) ? C.gold : C.grid));
      const at = k ? steps[k - 1][1] : 0;
      const done = at < 0;
      B.forEach((bx, i) => {
        const hit = done && i === -1 - at;
        const good = i === 1 || i === 2;
        bx.r.color(hit ? (good ? C.green : C.red) : C.grey);
        bx.t.color(hit ? (good ? C.green : C.red) : '#9aa4ae');
      });
      D.forEach((d, i) => d.l.color(!done && at === i ? C.gold : C.blue));
      dot.set(done ? endSpots[-1 - at] : spots[at]);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-103: a running total, then Gauss's pairing
// ---------------------------------------------------------------------------
export const loop_sum = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 2.2,
  mission: 'Set n = 20 and run the loop to the end. Does it match n(n + 1)/2?',
  goal: (t) => R(t.n) === 20 && R(t.i) >= 20,
  params: [
    { key: 'n', label: 'Add up to n =', min: 2, max: 20, step: 1, value: 10 },
    { key: 'i', label: 'Loop has reached i =', min: 0, max: 20, step: 1, value: 0 },
    { key: 'pair', hidden: true, value: 0 },
  ],
  free: { pair: 0 },
  beats: [
    { say: 'Add 1 + 2 + … + 10. A loop does it the way you would on paper: keep a running total, start it at 0, and add each number in turn.', set: { n: 10, i: 0, pair: 0 }, ms: 10000, notes: [{ text: 'start with total = 0', at: [-1.5, 3.5] }] },
    { say: 'i = 1: total becomes 0 + 1 = 1. i = 2: total becomes 1 + 2 = 3. Each bar is one pass through the loop.', set: { i: 2 }, ms: 9500 },
    { say: 'Keep going. The loop body is one line, total = total + i, run again and again.', set: { i: 7 }, ms: 9000 },
    { say: 'After i = 10 the loop stops: total = 55. Ten passes, one short line of code.', set: { i: 10 }, ms: 9000, notes: [{ text: 'the area of the staircase = 55', at: [-3.2, 1.0], to: [-1.2, -1.6] }] },
    { say: 'The story goes that young Gauss saw a shortcut. Copy the staircase, turn it upside down, and lay it on top.', set: { pair: 1 }, ms: 10500 },
    { say: 'The two staircases fill a rectangle 10 wide and 11 tall: 110. One staircase is half: 55. In general n(n + 1)/2.', set: { pair: 1 }, ms: 11000, notes: [{ text: 'every column: n + 1 = 11', at: [-3.0, 2.6], to: [-5.4, 1.4], color: C.gold }] },
    { say: 'The loop needs n steps; the formula needs three operations whatever n is. Finding shortcuts like this is what the study of algorithms is about.', set: { n: 20, i: 20, pair: 1 }, ms: 11000 },
  ],
  readout: (p) => {
    const n = R(p.n);
    const i = Math.min(R(p.i), n);
    return [
      ['Loop', i ? `for i in range(1, ${n + 1})  → at i = ${i}` : 'not started'],
      ['total', `${(i * (i + 1)) / 2}`],
      ['n(n + 1)/2', `${(n * (n + 1)) / 2}`],
    ];
  },
  setup(kit) {
    const X0 = -6.6;
    const W = 12.6;
    const Y0 = -3.4;
    const H = 5.4;
    kit.line([[X0 - 0.1, Y0], [X0 + W + 0.1, Y0]], { color: C.axis, width: 2 });
    const bars = [];
    const tops = [];
    const nums = [];
    for (let k = 1; k <= 20; k++) {
      bars.push(kit.rect(0, 0, 1, 1, { color: C.blue, opacity: 0.55, strokeColor: C.blue, width: 1.5 }));
      tops.push(kit.rect(0, 0, 1, 1, { color: C.gold, opacity: 0.35, strokeColor: C.gold, width: 1.5 }));
      nums.push(kit.label(`${k}`, [0, Y0 - 0.35], { tex: false, size: 11, color: C.grey }));
    }
    const total = kit.label('', [-6.6, 3.5], { tex: false, cls: 'mono', size: 22, color: C.green, align: 'left' });
    const rectNote = kit.label('', [3.2, 3.5], { size: 16, color: C.gold });
    return (q) => {
      const n = R(q.n);
      const i = Math.min(R(q.i), n);
      const bw = W / n;
      const s = H / (n + 1);
      for (let k = 1; k <= 20; k++) {
        const on = k <= n;
        const x = X0 + (k - 1) * bw;
        bars[k - 1].visible(on).set(x + 0.04 * bw, Y0, bw * 0.92, k * s);
        bars[k - 1].color(k <= i ? C.blue : C.grid);
        tops[k - 1].visible(on && q.pair > 0.05).set(x + 0.04 * bw, Y0 + k * s + (1 - Math.min(1, q.pair)) * 2, bw * 0.92, (n + 1 - k) * s * Math.min(1, q.pair));
        nums[k - 1].visible(on && (n <= 12 || k % 2 === 0)).pos([x + bw / 2, Y0 - 0.35]);
      }
      total.set(`total = ${(i * (i + 1)) / 2}`);
      rectNote.set(q.pair > 0.5 ? `${n} \\times ${n + 1} = ${n * (n + 1)},\\ \\text{half} = ${(n * (n + 1)) / 2}` : '');
    };
  },
};

// ---------------------------------------------------------------------------
// cs-104: calling a function and getting the answer back
// ---------------------------------------------------------------------------
export const func_calls = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Choose inputs so that y = sq(a) + sq(b) comes out as 25 another way (or the 3, 4 way).',
  goal: (t) => R(t.a) ** 2 + R(t.b) ** 2 === 25 && t.phase >= 5,
  params: [
    { key: 'a', label: 'First input a', min: 0, max: 9, step: 1, value: 3 },
    { key: 'b', label: 'Second input b', min: 0, max: 9, step: 1, value: 4 },
    { key: 'phase', hidden: true, value: 5 },
  ],
  free: { phase: 5 },
  beats: [
    { say: 'def sq(x): return x * x. This only teaches Python a new word, sq. Nothing is worked out yet.', set: { a: 3, b: 4, phase: 0 }, ms: 9500, notes: [{ text: 'a definition: no work done yet', at: [-1.6, 0.2], to: [-3.4, 1.25] }] },
    { say: 'The main program reaches y = sq(3) + sq(4). The first call jumps into sq, with its own fresh box x holding 3.', set: { phase: 1 }, ms: 10500, notes: [{ text: 'a new box x, just for this call', at: [5.0, -1.5], to: [4.4, -0.25] }] },
    { say: 'sq works out 3 × 3 = 9 and returns it. Its box x is thrown away; the call sq(3) is replaced by 9.', set: { phase: 2 }, ms: 10000 },
    { say: 'Second call: the same lines run again, now with x = 4. That is the point of a function: write once, use many times.', set: { phase: 3 }, ms: 10000 },
    { say: '16 comes back. The main program adds 9 + 16 and stores 25 in y. David Wheeler’s 1949 trick for jumping into a routine and back is the ancestor of every call like this.', set: { phase: 5 }, ms: 12000, notes: [{ text: 'y = 9 + 16 = 25', at: [5.4, -0.6], to: [3.4, -2.25], color: C.green }] },
    { say: 'Change a and b and watch the calls run with new inputs.', set: { a: 5, b: 12 }, ms: 8000 },
  ],
  readout: (p) => {
    const a = R(p.a);
    const b = R(p.b);
    return [
      ['sq(a)', `sq(${a}) = ${a * a}`],
      ['sq(b)', `sq(${b}) = ${b * b}`],
      ['y', p.phase >= 4.5 ? `${a * a + b * b}` : '…'],
    ];
  },
  setup(kit) {
    kit.rect(-7.7, 1.3, 6.4, 2.0, { color: 0x0b1220, opacity: 0.9, strokeColor: C.purple, width: 2 });
    kit.label('def sq(x):', [-7.4, 2.75], { ...mono, size: 20, color: C.purple });
    kit.label('    return x * x', [-7.4, 1.85], { ...mono, size: 20 });
    kit.rect(-7.7, -3.6, 6.4, 1.6, { color: 0x0b1220, opacity: 0.9, strokeColor: C.blue, width: 2 });
    kit.label('\\text{main program}', [-4.5, -1.7], { size: 12, color: C.grey });
    const callL = kit.label('', [-7.4, -2.8], { ...mono, size: 20 });
    const frame = kit.rect(1.6, -0.2, 4.6, 2.6, { color: C.purple, opacity: 0.12, strokeColor: C.purple, width: 2 });
    const fTitle = kit.label('', [3.9, 2.05], { tex: false, cls: 'mono', size: 15, color: C.purple });
    const fBox = kit.label('', [3.9, 1.05], { tex: false, cls: 'mono', size: 26 });
    const fWork = kit.label('', [3.9, 0.2], { tex: false, cls: 'mono', size: 16, color: C.gold });
    const go = kit.arrow([-1.2, -2.5], [1.5, 0.6], { color: C.purple });
    const back = kit.arrow([1.5, 0.2], [-1.2, -2.9], { color: C.green });
    const yBox = kit.rect(1.6, -3.6, 2.6, 1.3, { color: C.green, opacity: 0.12, strokeColor: C.green, width: 2 });
    const yL = kit.label('', [2.9, -2.95], { tex: false, cls: 'mono', size: 22, color: C.green });
    return (q) => {
      const a = R(q.a);
      const b = R(q.b);
      const ph = q.phase;
      const A = ph >= 1.5 ? `${a * a}` : `sq(${a})`;
      const B = ph >= 3.5 ? `${b * b}` : `sq(${b})`;
      callL.set(`y = ${A} + ${B}`);
      const inCall = (ph >= 0.5 && ph < 2.5) || (ph >= 2.5 && ph < 4.5);
      const x = ph < 2.5 ? a : b;
      frame.visible(inCall);
      fTitle.visible(inCall).set(`call: sq(${x})`);
      fBox.visible(inCall).set(`x = ${x}`);
      fWork.visible(inCall).set(ph % 2 > 1.4 || (ph >= 1.5 && ph < 2.5) || ph >= 3.5 ? `return ${x * x}` : '');
      go.visible((ph >= 0.5 && ph < 1.5) || (ph >= 2.5 && ph < 3.5));
      back.visible((ph >= 1.5 && ph < 2.5) || (ph >= 3.5 && ph < 4.5));
      yBox.visible(ph >= 4.5);
      yL.visible(ph >= 4.5).set(`y = ${a * a + b * b}`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-105: a list in numbered boxes, and a scan for the largest
// ---------------------------------------------------------------------------
const LISTS = {
  marks: [78, 92, 65, 88, 95, 71],
  temps: [-3, -8, -1, -12, -5],
  ties: [40, 40, 40, 40],
};
const bestUpTo = (a, i) => a.slice(0, i + 1).reduce((m, x) => (x > m ? x : m), a[0]);
export const list_scan = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Pick the freezer temperatures and scan to the end: which value wins, and why must best start at a[0], not at 0?',
  goal: (t) => t.list === 'temps' && R(t.i) >= 4,
  params: [
    { key: 'list', label: 'List', type: 'choice', value: 'marks', options: [{ value: 'marks', label: 'Quiz marks' }, { value: 'temps', label: 'Freezer temperatures' }, { value: 'ties', label: 'All the same' }] },
    { key: 'i', label: 'Loop is at position', min: 0, max: 5, step: 1, value: 0 },
    { key: 'idx', hidden: true, value: 0 },
  ],
  free: { idx: 1 },
  beats: [
    { say: 'Six quiz marks. Instead of six variables, one list: marks = [78, 92, 65, 88, 95, 71]. One name, many boxes in a row.', set: { list: 'marks', i: 0, idx: 0 }, ms: 10500 },
    { say: 'Each box has a position number. Python, like C before it, counts from 0: marks[0] is 78, marks[5] is the last. Six items, positions 0 to 5.', set: { idx: 1 }, ms: 11000, notes: [{ text: 'positions start at 0', at: [-5.4, 3.5], to: [-5.6, 1.9] }] },
    { say: 'Find the top mark. Start with best = marks[0] = 78, then walk along the list.', set: { i: 0 }, ms: 9000, notes: [{ text: 'best so far', at: [4.6, -3.9], to: [1.6, -2.7], color: C.gold }] },
    { say: 'Position 1: 92 > 78, so best becomes 92. Position 2: 65 is smaller, best stays 92.', set: { i: 2 }, ms: 10000 },
    { say: 'Position 4: 95 beats 92. At the end, best = 95. One pass, one comparison per item.', set: { i: 5 }, ms: 9500 },
    { say: 'Why start best at marks[0] and not at 0? Freezer readings are all below zero. Starting at 0, no reading would ever beat it, and the answer would be a temperature that is not in the list.', set: { list: 'temps', i: 4 }, ms: 12500, notes: [{ text: 'the warmest is −1, not 0', at: [3.4, 3.3], to: [-0.8, 1.3], color: C.red }] },
  ],
  readout: (p) => {
    const a = LISTS[p.list];
    const i = Math.min(R(p.i), a.length - 1);
    return [
      ['len(list)', `${a.length}`],
      [`list[${i}]`, `${a[i]}`],
      ['best so far', `${bestUpTo(a, i)}`],
    ];
  },
  setup(kit) {
    const cells = [];
    for (let k = 0; k < 6; k++) {
      const x = -6.6 + k * 2.2;
      cells.push({
        r: kit.rect(x, -0.4, 2.0, 1.6, { color: C.blue, opacity: 0.1, strokeColor: C.blue, width: 2 }),
        v: kit.label('', [x + 1.0, 0.4], { tex: false, cls: 'mono', size: 26 }),
        k: kit.label(`${k}`, [x + 1.0, 1.75], { tex: false, cls: 'mono', size: 15, color: C.grey }),
        x,
      });
    }
    const nameL = kit.label('', [-6.6, 2.9], { ...mono, size: 18, color: C.blue });
    const hi = kit.rect(0, -0.5, 2.2, 1.8, { fill: false, strokeColor: C.gold, width: 4 });
    const ptr = kit.arrow([0, -1.7], [0, -0.55], { color: C.gold });
    kit.rect(-1.2, -3.4, 2.6, 1.3, { color: C.gold, opacity: 0.12, strokeColor: C.gold, width: 2 });
    const bestL = kit.label('', [0.1, -2.75], { tex: false, cls: 'mono', size: 22, color: C.gold });
    kit.label('best', [-1.9, -2.75], { tex: false, cls: 'mono', size: 16, color: C.gold });
    return (q) => {
      const a = LISTS[q.list] || LISTS.marks;
      const i = Math.min(R(q.i), a.length - 1);
      const best = bestUpTo(a, i);
      nameL.set(`${q.list === 'marks' ? 'marks' : q.list === 'temps' ? 'temps' : 'a'} = [${a.join(', ')}]`);
      cells.forEach((c, k) => {
        const on = k < a.length;
        c.r.visible(on);
        c.v.visible(on).set(on ? `${a[k]}` : '');
        c.k.visible(on && q.idx > 0.5);
        const isBest = on && k <= i && a[k] === best && a.indexOf(best) === k;
        c.r.color(isBest ? C.gold : k <= i ? C.blue : C.grid);
        c.v.color(k <= i ? C.white : '#9aa4ae');
      });
      const bi = a.indexOf(best);
      hi.set(cells[bi].x - 0.1, -0.5, 2.2, 1.8);
      const x = cells[i].x + 1.0;
      ptr.set([x, -1.75], [x, -0.5]);
      bestL.set(`${best}`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-106: fence posts and sections, and which range() counts them
// ---------------------------------------------------------------------------
export const fencepost = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3.5,
  mission: 'Make a 12-section fence and check which range(...) lists one number per post.',
  goal: (t) => R(t.L) === 12 && t.show >= 2,
  params: [
    { key: 'L', label: 'Fence length (m)', min: 1, max: 12, step: 1, value: 10 },
    { key: 'show', hidden: true, value: 2 },
  ],
  free: { show: 2 },
  beats: [
    { say: 'A fence 10 metres long, with a post every metre. How many posts? Most people say 10, quickly. It is a trap.', set: { L: 10, show: 0 }, ms: 9500 },
    { say: 'Count the sections between posts: 10, one per metre. Now count the posts: there is one more at the far end. 11.', set: { show: 1 }, ms: 10500, notes: [{ text: 'the extra post at the end', at: [4.4, 3.4], to: [6.0, 1.2], color: C.gold }] },
    { say: 'Programmers fall into the same trap. range(0, 10) gives 0, 1, …, 9: ten numbers, one per section. range(0, 11) gives eleven, one per post.', set: { show: 2 }, ms: 12000 },
    { say: 'The rule: range(a, b) has b − a numbers. Counting a to b inclusive gives b − a + 1. Being one off is called an off-by-one error, the most common bug there is.', set: {}, ms: 12000 },
    { say: 'Test the edges: a 1-metre fence has 1 section and 2 posts. Small cases you can check by hand catch most bugs.', set: { L: 1 }, ms: 9500 },
  ],
  readout: (p) => {
    const L = R(p.L);
    return [
      ['Sections', `${L}  → range(0, ${L})`],
      ['Posts', `${L + 1}  → range(0, ${L + 1})`],
    ];
  },
  setup(kit) {
    const posts = [];
    const rails = [];
    const pn = [];
    for (let k = 0; k <= 12; k++) {
      posts.push(kit.rect(0, -0.6, 0.22, 2.2, { color: C.gold, opacity: 0.8, strokeColor: C.gold, width: 1 }));
      pn.push(kit.label('', [0, -1.0], { tex: false, cls: 'mono', size: 12, color: C.gold }));
    }
    const sn = [];
    for (let k = 0; k < 12; k++) {
      rails.push(kit.rect(0, 0.6, 1, 0.16, { color: 0x8b6b4a, opacity: 0.9, strokeColor: 0x8b6b4a, width: 1 }));
      sn.push(kit.label('', [0, 1.05], { tex: false, cls: 'mono', size: 12, color: C.blue }));
    }
    kit.line([[-7.5, -0.6], [7.5, -0.6]], { color: C.axis, width: 2 });
    const r1 = kit.label('', [-7.2, -2.4], { ...mono, size: 18, color: C.blue });
    const r2 = kit.label('', [-7.2, -3.4], { ...mono, size: 18, color: C.gold });
    const count = kit.label('', [0, 3.1], { tex: false, size: 18 });
    return (q) => {
      const L = R(q.L);
      const span = 13;
      const dx = span / Math.max(L, 1);
      const x0 = -6.5;
      posts.forEach((p, k) => {
        const on = k <= L;
        p.visible(on).set(x0 + k * dx - 0.11, -0.6, 0.22, 2.2);
        pn[k].visible(on && q.show > 0.5).set(`${k}`).pos([x0 + k * dx, -1.0]);
      });
      rails.forEach((r, k) => {
        const on = k < L;
        r.visible(on).set(x0 + k * dx + 0.11, 0.6, dx - 0.22, 0.16);
        sn[k].visible(on && q.show > 0.5).set(`${k}`).pos([x0 + (k + 0.5) * dx, 1.05]);
      });
      count.set(q.show > 0.5 ? `${L} section${L === 1 ? '' : 's'}, ${L + 1} posts` : `${L} m of fence, a post every metre`);
      r1.visible(q.show > 1.5).set(`range(0, ${L}):  ${L} number${L === 1 ? '' : 's'}, one per section`);
      r2.visible(q.show > 1.5).set(`range(0, ${L + 1}):  ${L + 1} numbers, one per post`);
    };
  },
};
