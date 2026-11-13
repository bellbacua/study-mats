// Computer Science program: Architecture and Data Structures & Algorithms
// (cs-122, cs-123, cs-131 to cs-138). Story scenes: hidden params drive the
// reveals, and touching any control switches to the `free` values.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono' };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

// ---------------------------------------------------------------------------
// cs-122: fetch, decode, execute on a tiny Little-Man-style machine
// ---------------------------------------------------------------------------
// Codes as in the Little Man Computer: 5xx LOAD, 1xx ADD, 3xx STORE, 000 HALT.
const MEM0 = [506, 107, 305, 0, 0, 0, 5, 7];
const NAME = (v, i) => (i < 4 ? (v === 0 ? 'HALT' : `${{ 5: 'LOAD', 1: 'ADD', 3: 'STORE' }[Math.floor(v / 100)]} ${v % 100}`) : 'data');
function runCPU(steps) {
  const mem = MEM0.slice();
  let pc = 0;
  let acc = 0;
  let ir = null;
  let phase = 'ready';
  let touched = -1;
  for (let s = 0; s < steps; s++) {
    const p = s % 3;
    if (ir === 0 && p === 0) break;
    if (p === 0) {
      ir = mem[pc];
      touched = pc;
      phase = 'fetch';
    } else if (p === 1) {
      phase = 'decode';
      touched = -1;
      pc += 1;
    } else {
      phase = 'execute';
      const op = Math.floor(ir / 100);
      const a = ir % 100;
      touched = op ? a : -1;
      if (op === 5) acc = mem[a];
      if (op === 1) acc += mem[a];
      if (op === 3) mem[a] = acc;
      if (ir === 0) phase = 'halted';
    }
  }
  return { mem, pc, acc, ir, phase, touched };
}
export const fetch_execute = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Step to the end. Which memory cell now holds the answer, and what is it?',
  goal: (t) => R(t.s) >= 11,
  params: [{ key: 's', label: 'Steps', min: 0, max: 12, step: 1, value: 0 }],
  beats: [
    { say: 'Eight memory cells, numbered 0 to 7. Cells 0 to 3 hold a program, written as numbers; cells 6 and 7 hold data, 5 and 7. The same memory holds both: that is the stored-program idea.', set: { s: 0 }, ms: 12500 },
    { say: 'Fetch: the processor reads the cell the program counter points to, 0, into its instruction register. 506 means LOAD the number in cell 6.', set: { s: 1 }, ms: 11000, notes: [{ text: 'PC points at cell 0', at: [-1.4, 3.9], to: [-3.9, 2.7], color: C.gold }] },
    { say: 'Decode: work out what 506 means, and move the program counter on to 1. Execute: copy 5 into the accumulator.', set: { s: 3 }, ms: 11000 },
    { say: 'Next instruction, 107: ADD the number in cell 7. The accumulator becomes 12.', set: { s: 6 }, ms: 10000 },
    { say: '305: STORE the accumulator in cell 5. A result is written back into memory. Then 000: HALT.', set: { s: 12 }, ms: 11000, notes: [{ text: 'the answer, 12', at: [-0.2, -3.9], to: [-3.7, -1.7], color: C.green }] },
    { say: 'Every program on every phone runs this same loop, billions of times a second: fetch, decode, execute.', set: { s: 12 }, ms: 9000 },
  ],
  readout: (t) => {
    const r = runCPU(R(t.s));
    return [
      ['Phase', r.phase],
      ['PC', `${r.pc}`],
      ['ACC', `${r.acc}`],
    ];
  },
  setup(kit) {
    const H = 0.85;
    const y = (i) => 3.0 - i * H;
    const cells = MEM0.map((_, i) => {
      kit.label(`${i}`, [-7.4, y(i) - H / 2 + 0.02], { ...mono, size: 14, color: C.grey });
      const box = kit.rect(-7.0, y(i) - H + 0.06, 3.2, H - 0.1, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1.5 });
      const v = kit.label('', [-6.4, y(i) - H / 2 + 0.02], { ...mono, size: 17 });
      const n = kit.label('', [-4.8, y(i) - H / 2 + 0.02], { tex: false, size: 13, color: C.grey });
      return { box, v, n };
    });
    kit.label('memory', [-5.4, 3.5], { tex: false, size: 14, color: C.grey });
    const reg = (x, yy, name) => {
      kit.label(name, [x, yy + 0.8], { tex: false, size: 14, color: C.grey });
      kit.rect(x - 1.1, yy - 0.45, 2.2, 0.9, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 });
      return kit.label('', [x, yy], { ...mono, size: 20 });
    };
    const pc = reg(0.6, 2.2, 'program counter');
    const ir = reg(3.6, 2.2, 'instruction');
    const acc = reg(2.1, -0.6, 'accumulator');
    const ph = kit.label('', [2.1, -2.4], { tex: false, size: 22, color: C.gold });
    const bus = kit.arrow([0, 0], [1, 1], { color: C.gold });
    const pcArrow = kit.arrow([-3.4, 0], [-3.8, 0], { color: C.yellow });
    return (t) => {
      const r = runCPU(R(t.s));
      cells.forEach((c, i) => {
        c.v.set(`${String(r.mem[i]).padStart(3, '0')}`);
        c.n.set(NAME(r.mem[i], i));
        c.box.color(i === r.touched ? 0x4a3b16 : i === 5 && r.mem[5] ? 0x1f3d22 : 0x1a2433);
      });
      pc.set(`${r.pc}`);
      ir.set(r.ir === null ? '—' : String(r.ir).padStart(3, '0'));
      acc.set(`${r.acc}`);
      ph.set(r.phase === 'ready' ? 'ready' : r.phase.toUpperCase());
      pcArrow.set([-2.6, y(r.pc) - H / 2], [-3.7, y(r.pc) - H / 2]);
      bus.visible(r.touched >= 0);
      if (r.touched >= 0) {
        const from = [-3.7, y(r.touched) - H / 2];
        const to = r.phase === 'fetch' ? [2.4, 2.0] : [0.9, -0.6];
        if (r.phase === 'execute' && Math.floor((r.ir || 0) / 100) === 3) bus.set(to, from);
        else bus.set(from, to);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// cs-123: a 4-line cache in front of 32 memory cells
// ---------------------------------------------------------------------------
const PATTERNS = {
  seq: { label: 'in order', list: Array.from({ length: 32 }, (_, i) => i) },
  stride: { label: 'jumping by 4', list: Array.from({ length: 32 }, (_, i) => (i % 8) * 4 + Math.floor(i / 8)) },
  rand: { label: 'random', list: [17, 3, 28, 9, 22, 1, 14, 30, 6, 19, 25, 11, 0, 27, 8, 16, 21, 4, 31, 13, 2, 24, 10, 29, 7, 18, 15, 26, 5, 20, 12, 23] },
};
function runCache(pat, k) {
  const lines = [];
  let hits = 0;
  let last = null;
  for (let i = 0; i < k; i++) {
    const addr = PATTERNS[pat].list[i];
    const b = Math.floor(addr / 4);
    const at = lines.indexOf(b);
    if (at >= 0) {
      hits += 1;
      lines.splice(at, 1);
      lines.push(b);
      last = { addr, hit: true };
    } else {
      if (lines.length === 4) lines.shift();
      lines.push(b);
      last = { addr, hit: false };
    }
  }
  return { lines, hits, last };
}
export const cache_hits = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Which access pattern gives the worst hit rate after all 32 reads? Why?',
  goal: (t) => t.pat === 'stride' && R(t.k) >= 32,
  params: [
    { key: 'pat', label: 'Access pattern', type: 'choice', value: 'seq', options: Object.entries(PATTERNS).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'k', label: 'Reads so far', min: 0, max: 32, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Main memory: 32 cells, grouped in blocks of 4 (colours). Above it, a tiny cache that can hold copies of 4 blocks. Reading from the cache is fast; from main memory, slow.', set: { pat: 'seq', k: 0 }, ms: 12000 },
    { say: 'Read cell 0. It is not in the cache: a miss. The whole block, cells 0 to 3, is copied in.', set: { k: 1 }, ms: 10000, notes: [{ text: 'miss: block 0 loaded', at: [0.4, 0.6], to: [-6.1, 1.75], color: C.red }] },
    { say: 'Cells 1, 2 and 3 are now hits: they came in with the block. Reading in order, three of every four reads hit. That is spatial locality.', set: { k: 12 }, ms: 11500 },
    { say: 'All 32 in order: 8 misses, 24 hits, a 75% hit rate.', set: { k: 32 }, ms: 9000 },
    { say: 'Now read 0, 4, 8, 12, …, jumping a block each time. Every read needs a new block, and the cache is too small to keep the 8 blocks: 0% hits.', set: { pat: 'stride', k: 32 }, ms: 12500, notes: [{ text: 'every read misses', at: [4.6, -3.8], to: [3.4, -2.4], color: C.red }] },
    { say: 'Same data, same work, very different speed. Walking through memory in order is one of the simplest ways to make a program faster.', set: { pat: 'seq', k: 32 }, ms: 10000 },
  ],
  readout: (t) => {
    const k = R(t.k);
    const r = runCache(t.pat, k);
    return [
      ['Reads', `${k}`],
      ['Hits', `${r.hits} (${k ? R((100 * r.hits) / k) : 0}%)`],
      ['Last read', r.last ? `cell ${r.last.addr}: ${r.last.hit ? 'hit' : 'miss'}` : '—'],
    ];
  },
  setup(kit) {
    const BC = [C.blue, C.teal, C.green, C.gold, C.pink, C.purple, C.red, C.yellow];
    const W = 0.44;
    const x = (i) => -7.0 + i * W;
    const cells = Array.from({ length: 32 }, (_, i) => kit.rect(x(i), -2.6, W * 0.92, 0.8, { color: BC[Math.floor(i / 4)], opacity: 0.35, strokeColor: C.grid, width: 1 }));
    for (let b = 0; b < 8; b++) kit.label(`block ${b}`, [x(b * 4) + W * 2, -3.05], { tex: false, size: 11, color: C.grey });
    kit.label('main memory (slow)', [-7.0, -1.4], { tex: false, size: 14, color: C.grey, align: 'left' });
    kit.label('cache (fast): 4 blocks', [-7.0, 3.6], { tex: false, size: 14, color: C.grey, align: 'left' });
    const lines = Array.from({ length: 4 }, (_, j) => kit.rect(-7.0 + j * 2.0, 1.8, 1.8, 1.1, { color: C.grid, opacity: 0.5, strokeColor: C.grid, width: 1.5 }));
    const lineL = Array.from({ length: 4 }, (_, j) => kit.label('', [-6.1 + j * 2.0, 2.35], { tex: false, size: 14 }));
    const ptr = kit.arrow([0, 0], [1, 1], { color: C.yellow });
    const badge = kit.label('', [3.6, 0.4], { tex: false, size: 30 });
    const tally = kit.label('', [3.6, -0.6], { tex: false, size: 15, color: C.grey });
    return (t) => {
      const k = R(t.k);
      const r = runCache(t.pat, k);
      cells.forEach((c, i) => c.opacity(r.last && r.last.addr === i ? 0.95 : 0.35));
      lines.forEach((l, j) => {
        const b = r.lines[j];
        l.color(b === undefined ? C.grid : BC[b]).opacity(b === undefined ? 0.2 : 0.55);
        lineL[j].set(b === undefined ? 'empty' : `block ${b}`);
      });
      ptr.visible(!!r.last);
      if (r.last) ptr.set([x(r.last.addr) + W / 2, -1.6], [x(r.last.addr) + W / 2, -1.95]);
      badge.set(r.last ? (r.last.hit ? 'HIT' : 'MISS') : '').color(r.last?.hit ? C.green : C.red);
      tally.set(k ? `${r.hits} hits, ${k - r.hits} misses` : '');
    };
  },
};

// ---------------------------------------------------------------------------
// cs-131: Tower of Hanoi, the recursive solution
// ---------------------------------------------------------------------------
function hanoiMoves(n, a = 0, b = 2, c = 1, out = []) {
  if (n === 0) return out;
  hanoiMoves(n - 1, a, c, b, out);
  out.push([n, a, b]);
  hanoiMoves(n - 1, c, b, a, out);
  return out;
}
export const hanoi = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Solve 5 disks. How many moves did it take? Compare with 2⁵ − 1.',
  goal: (t) => R(t.n) === 5 && R(t.k) >= 31,
  params: [
    { key: 'n', label: 'Disks', min: 1, max: 6, step: 1, value: 3 },
    { key: 'k', label: 'Moves made', min: 0, max: 63, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Move the whole tower to the right peg. One disk at a time, and never a bigger disk on a smaller one.', set: { n: 3, k: 0 }, ms: 9500 },
    { say: 'The recursive idea: to move 3 disks, first move the top 2 out of the way, to the middle peg. That is a smaller copy of the same puzzle.', set: { k: 3 }, ms: 11500, notes: [{ text: 'top 2 moved aside', at: [-0.2, 3.6], to: [0, -1.4], color: C.gold }] },
    { say: 'Now the biggest disk is free: move it to the right peg, one move.', set: { k: 4 }, ms: 9000 },
    { say: 'Then move the 2 disks from the middle onto it: the smaller puzzle again. 3 + 1 + 3 = 7 moves.', set: { k: 7 }, ms: 10500 },
    { say: 'Each extra disk doubles the work and adds one: T(n) = 2T(n − 1) + 1 = 2ⁿ − 1. Six disks: 63 moves. Lucas’s 64 golden disks: about 585 billion years at one move a second.', set: { n: 6, k: 63 }, ms: 13000 },
  ],
  readout: (t) => {
    const n = R(t.n);
    const total = 2 ** n - 1;
    const k = Math.min(R(t.k), total);
    const mv = hanoiMoves(n)[k - 1];
    return [
      ['Moves', `${k} of ${total}`],
      ['Last move', mv ? `disk ${mv[0]}: peg ${mv[1] + 1} → peg ${mv[2] + 1}` : '—'],
    ];
  },
  setup(kit) {
    const PX = [-4.6, 0, 4.6];
    PX.forEach((x) => kit.line([[x, -2.6], [x, 2.0]], { color: C.grey, width: 5 }));
    kit.line([[-7.2, -2.6], [7.2, -2.6]], { color: C.axis, width: 4 });
    const COL = [C.red, C.gold, C.yellow, C.green, C.teal, C.blue];
    const disks = Array.from({ length: 6 }, (_, i) => kit.rect(0, 0, 1, 0.5, { color: COL[i], opacity: 0.85, strokeColor: COL[i], width: 1 }));
    return (t) => {
      const n = R(t.n);
      const moves = hanoiMoves(n);
      const k = Math.min(R(t.k), moves.length);
      const pegs = [Array.from({ length: n }, (_, i) => n - i), [], []];
      for (let i = 0; i < k; i++) {
        const [, a, b] = moves[i];
        pegs[b].push(pegs[a].pop());
      }
      disks.forEach((d) => d.visible(false));
      pegs.forEach((stack, p) =>
        stack.forEach((size, h) => {
          const w = 0.9 + size * 0.55;
          disks[size - 1].visible(true).set(PX[p] - w / 2, -2.55 + h * 0.55, w, 0.5);
        }),
      );
    };
  },
};

// ---------------------------------------------------------------------------
// cs-132: insertion sort against merge sort, comparisons counted
// ---------------------------------------------------------------------------
const DATA = [7, 3, 11, 1, 9, 5, 12, 2, 8, 4, 10, 6];
function traceInsertion() {
  const a = DATA.slice();
  const out = [{ a: a.slice(), cmp: null, n: 0 }];
  let n = 0;
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      n += 1;
      const swap = a[j - 1] > a[j];
      if (swap) [a[j - 1], a[j]] = [a[j], a[j - 1]];
      out.push({ a: a.slice(), cmp: [j - 1, j], n });
      if (!swap) break;
      j -= 1;
    }
  }
  return out;
}
function traceMerge() {
  const a = DATA.slice();
  const out = [{ a: a.slice(), cmp: null, n: 0 }];
  let n = 0;
  for (let w = 1; w < a.length; w *= 2) {
    for (let lo = 0; lo < a.length; lo += 2 * w) {
      const mid = Math.min(lo + w, a.length);
      const hi = Math.min(lo + 2 * w, a.length);
      const L = a.slice(lo, mid);
      const Rr = a.slice(mid, hi);
      let i = 0;
      let j = 0;
      let k = lo;
      while (i < L.length && j < Rr.length) {
        n += 1;
        a[k++] = L[i] <= Rr[j] ? L[i++] : Rr[j++];
        const snap = a.slice();
        // show the not-yet-written part of the run as it was
        let kk = k;
        for (let ii = i; ii < L.length; ii++) snap[kk++] = L[ii];
        for (let jj = j; jj < Rr.length; jj++) snap[kk++] = Rr[jj];
        out.push({ a: snap, cmp: [lo, hi - 1], n });
      }
      while (i < L.length) a[k++] = L[i++];
      while (j < Rr.length) a[k++] = Rr[j++];
      out.push({ a: a.slice(), cmp: [lo, hi - 1], n });
    }
  }
  return out;
}
const TRACE = { ins: traceInsertion(), merge: traceMerge() };
export const sort_race = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Run both sorts to the end. Which needed fewer comparisons for these 12 numbers?',
  goal: (t, seen) => !!seen.alg?.has('ins') && !!seen.alg?.has('merge') && t.p >= 0.99,
  params: [
    { key: 'alg', label: 'Method', type: 'choice', value: 'ins', options: [{ value: 'ins', label: 'Insertion sort' }, { value: 'merge', label: 'Merge sort' }] },
    { key: 'p', label: 'Progress', min: 0, max: 1, step: 0.01, value: 0 },
  ],
  beats: [
    { say: 'Twelve numbers to put in order, shown as bars. A computer can only compare two at a time. How many comparisons does it need?', set: { alg: 'ins', p: 0 }, ms: 10500 },
    { say: 'Insertion sort: take each bar in turn and slide it left, comparing with its neighbour, until it fits. Simple, like sorting cards in your hand.', set: { p: 0.35 }, ms: 11000, notes: [{ text: 'the two bars being compared', at: [-0.6, 3.9], to: [-2.0, 1.2], color: C.gold }] },
    { say: 'Finished. For n items it can need up to n(n − 1)/2 comparisons: 66 for 12, but 500 thousand for a thousand.', set: { p: 1 }, ms: 11000 },
    { say: 'Merge sort: first merge pairs, then pairs of pairs, and so on. Merging two sorted runs needs at most one comparison per item placed.', set: { alg: 'merge', p: 0.4 }, ms: 11500 },
    { say: 'Only about log₂ n rounds of merging, each about n comparisons: n log₂ n in all. For a million items that is 20 million instead of 500 billion.', set: { p: 1 }, ms: 12000 },
  ],
  readout: (t) => {
    const tr = TRACE[t.alg];
    const s = tr[R(t.p * (tr.length - 1))];
    return [
      ['Method', t.alg === 'ins' ? 'insertion sort' : 'merge sort'],
      ['Comparisons so far', `${s.n}`],
      ['Total to finish', `${tr[tr.length - 1].n}`],
    ];
  },
  setup(kit) {
    const x = (i) => -6.6 + i * 1.12;
    const bars = DATA.map(() => kit.rect(0, -3.2, 0.9, 1, { color: C.blue, opacity: 0.65, strokeColor: C.blue, width: 1 }));
    const nums = DATA.map(() => kit.label('', [0, -3.6], { ...mono, size: 14 }));
    const bracket = kit.line([[0, 0], [1, 0]], { color: C.gold, width: 3 });
    const cnt = kit.label('', [5.6, 3.6], { tex: false, size: 18, color: C.gold });
    return (t) => {
      const tr = TRACE[t.alg];
      const s = tr[R(clamp(t.p, 0, 1) * (tr.length - 1))];
      s.a.forEach((v, i) => {
        const on = s.cmp && i >= s.cmp[0] && i <= s.cmp[1] && (t.alg === 'merge' || i === s.cmp[0] || i === s.cmp[1]);
        bars[i].set(x(i), -3.2, 0.9, v * 0.48).color(on ? C.gold : C.blue);
        nums[i].set(`${v}`).pos([x(i) + 0.45, -3.6]);
      });
      bracket.visible(!!s.cmp);
      if (s.cmp) bracket.set([[x(s.cmp[0]), 3.0], [x(s.cmp[1]) + 0.9, 3.0]]);
      cnt.set(`${s.n} comparisons`);
    };
  },
};

// ---------------------------------------------------------------------------
// cs-133: the same four items through a stack and through a queue
// ---------------------------------------------------------------------------
const ITEMS = ['A', 'B', 'C', 'D'];
function sq(mode, k) {
  const box = [];
  const out = [];
  for (let s = 0; s < k; s++) {
    if (s < 4) box.push(ITEMS[s]);
    else out.push(mode === 'stack' ? box.pop() : box.shift());
  }
  return { box, out };
}
export const stack_queue = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Put A, B, C, D in and take all four out with a stack. In what order do they leave?',
  goal: (t) => t.mode === 'stack' && R(t.k) >= 8,
  params: [
    { key: 'mode', label: 'Structure', type: 'choice', value: 'stack', options: [{ value: 'stack', label: 'Stack (last in, first out)' }, { value: 'queue', label: 'Queue (first in, first out)' }] },
    { key: 'k', label: 'Steps', min: 0, max: 8, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A stack is a pile, like plates. Push A, B, C, D: each goes on top.', set: { mode: 'stack', k: 4 }, ms: 9500 },
    { say: 'Pop takes the top one. D comes out first, then C, B, A: last in, first out. Reversed.', set: { k: 8 }, ms: 10500, notes: [{ text: 'out in reverse order', at: [4.6, 3.6], to: [3.4, 0.4], color: C.gold }] },
    { say: 'This is how a computer remembers function calls: each call is pushed, and the latest one returns first. And how “undo” knows what you did last.', set: { k: 6 }, ms: 11500 },
    { say: 'A queue is a line, like the jeepney terminal. Items join at the back and leave from the front.', set: { mode: 'queue', k: 4 }, ms: 10000 },
    { say: 'Out come A, B, C, D: first in, first out, the same order as they arrived. Printers, web servers and phone networks share their work this way.', set: { k: 8 }, ms: 11500 },
  ],
  readout: (t) => {
    const r = sq(t.mode, R(t.k));
    return [
      ['Inside', r.box.join(' ') || 'empty'],
      ['Out so far', r.out.join(', ') || '—'],
    ];
  },
  setup(kit) {
    const boxes = ITEMS.map(() => kit.rect(0, 0, 1.4, 0.9, { color: C.blue, opacity: 0.6, strokeColor: C.blue, width: 2 }));
    const labs = ITEMS.map((s) => kit.label(s, [0, 0], { ...mono, size: 22 }));
    const outL = kit.label('', [3.8, -2.4], { ...mono, size: 22, color: C.gold });
    kit.label('out:', [3.8, -1.6], { tex: false, size: 14, color: C.grey });
    const wall = kit.line([[0, 0], [1, 1]], { color: C.grey, width: 3 });
    const tag = kit.label('', [-3.6, 3.6], { tex: false, size: 15, color: C.grey });
    return (t) => {
      const r = sq(t.mode, R(t.k));
      const stack = t.mode === 'stack';
      if (stack) wall.set([[-4.6, 2.6], [-4.6, -2.6], [-2.6, -2.6], [-2.6, 2.6]]);
      else wall.set([[-6.8, 0.7], [0.2, 0.7], [0.2, 0.7], [0.2, -0.7], [-6.8, -0.7]]);
      tag.set(stack ? 'top ↑ (push and pop here)' : 'back ← in        front → out').pos(stack ? [-3.6, 3.2] : [-3.3, 1.4]);
      ITEMS.forEach((s, i) => {
        const at = r.box.indexOf(s);
        const on = at >= 0;
        boxes[i].visible(on);
        labs[i].visible(on);
        if (!on) return;
        const p = stack ? [-4.3, -2.5 + at * 1.0] : [-1.4 - (r.box.length - 1 - at) * 1.6, -0.45];
        boxes[i].set(p[0], p[1], 1.4, 0.9);
        labs[i].pos([p[0] + 0.7, p[1] + 0.45]);
      });
      outL.set(r.out.join(' '));
    };
  },
};

// ---------------------------------------------------------------------------
// cs-134: a hash table with chaining
// ---------------------------------------------------------------------------
const KEYSETS = { mixed: [25, 14, 3, 47, 36, 9, 58, 20, 31, 42], tens: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] };
export const hash_table = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'With the keys 10, 20, …, 100, which table size spreads them out: 10 buckets or 11?',
  goal: (t) => t.keys === 'tens' && t.m === '11' && R(t.k) >= 10,
  params: [
    { key: 'keys', label: 'Keys', type: 'choice', value: 'mixed', options: [{ value: 'mixed', label: '25, 14, 3, 47, …' }, { value: 'tens', label: '10, 20, 30, …' }] },
    { key: 'm', label: 'Buckets', type: 'choice', value: '11', options: [{ value: '10', label: '10' }, { value: '11', label: '11 (a prime)' }] },
    { key: 'k', label: 'Keys inserted', min: 0, max: 10, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A hash table: 11 numbered buckets. The hash of a key is its remainder mod 11. To store a key, compute the hash and drop it in that bucket.', set: { keys: 'mixed', m: '11', k: 1 }, ms: 11500, notes: [{ text: '25 mod 11 = 3', at: [-3.6, 3.6], to: [-2.6, -1.6], color: C.gold }] },
    { say: '14 mod 11 is also 3: a collision. Chaining simply keeps both in the bucket’s list.', set: { k: 2 }, ms: 10000 },
    { say: 'All ten keys in. Most buckets hold zero, one or two keys. To find a key, compute its hash and look in one short list: about one step, whether the table holds ten keys or ten million.', set: { k: 10 }, ms: 12500 },
    { say: 'A bad match: keys 10, 20, …, 100 with 10 buckets. Every key leaves remainder 0, so all land in bucket 0: one long list, and look-ups become slow searches.', set: { keys: 'tens', m: '10', k: 10 }, ms: 12500, notes: [{ text: 'everything in one bucket', at: [2.0, 3.6], to: [-6.4, 0.2], color: C.red }] },
    { say: 'Same keys, 11 buckets: they spread out again. Prime table sizes and well-mixed hash functions avoid such patterns.', set: { m: '11' }, ms: 10500 },
  ],
  readout: (t) => {
    const m = Number(t.m);
    const ks = KEYSETS[t.keys].slice(0, R(t.k));
    const counts = Array.from({ length: m }, () => 0);
    ks.forEach((x) => (counts[x % m] += 1));
    return [
      ['Load factor', `${ks.length} / ${m} = ${(ks.length / m).toFixed(2)}`],
      ['Longest chain', `${Math.max(0, ...counts)}`],
      ['Last key', ks.length ? `${ks[ks.length - 1]} mod ${m} = ${ks[ks.length - 1] % m}` : '—'],
    ];
  },
  setup(kit) {
    const x = (i) => -7.0 + i * 1.3;
    const heads = Array.from({ length: 11 }, (_, i) => kit.rect(x(i), -3.0, 1.1, 0.7, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 }));
    const headL = Array.from({ length: 11 }, (_, i) => kit.label(`${i}`, [x(i) + 0.55, -2.65], { ...mono, size: 15, color: C.grey }));
    const chips = Array.from({ length: 10 }, () => kit.rect(0, 0, 1.0, 0.55, { color: C.gold, opacity: 0.6, strokeColor: C.gold, width: 1 }));
    const chipL = Array.from({ length: 10 }, () => kit.label('', [0, 0], { ...mono, size: 14 }));
    return (t) => {
      const m = Number(t.m);
      const ks = KEYSETS[t.keys].slice(0, R(t.k));
      heads.forEach((h, i) => h.visible(i < m));
      headL.forEach((h, i) => h.visible(i < m));
      const level = Array.from({ length: m }, () => 0);
      chips.forEach((c, j) => {
        const on = j < ks.length;
        c.visible(on);
        chipL[j].visible(on);
        if (!on) return;
        const b = ks[j] % m;
        const y = -2.2 + level[b] * 0.65;
        level[b] += 1;
        c.set(x(b) + 0.05, y, 1.0, 0.55).color(j === ks.length - 1 ? C.yellow : C.gold);
        chipL[j].set(`${ks[j]}`).pos([x(b) + 0.55, y + 0.28]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// cs-135: binary search trees from different insertion orders
// ---------------------------------------------------------------------------
const ORDERS = { good: [4, 2, 6, 1, 3, 5, 7], sorted: [1, 2, 3, 4, 5, 6, 7], mixed: [3, 1, 6, 2, 7, 5, 4] };
function bst(order, k) {
  const nodes = [];
  for (const v of order.slice(0, k)) {
    if (!nodes.length) {
      nodes.push({ v, d: 0, parent: null });
      continue;
    }
    let cur = nodes[0];
    let d = 0;
    for (;;) {
      d += 1;
      const side = v < cur.v ? 'l' : 'r';
      const next = nodes.find((n) => n.parent === cur && n.side === side);
      if (!next) {
        nodes.push({ v, d, parent: cur, side });
        break;
      }
      cur = next;
    }
  }
  return nodes;
}
export const bst_insert = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'Find the insertion order that gives the shallowest tree. How many levels does it have?',
  goal: (t) => t.order === 'good' && R(t.k) >= 7,
  params: [
    { key: 'order', label: 'Insertion order', type: 'choice', value: 'good', options: [{ value: 'good', label: '4 2 6 1 3 5 7' }, { value: 'mixed', label: '3 1 6 2 7 5 4' }, { value: 'sorted', label: '1 2 3 4 5 6 7' }] },
    { key: 'k', label: 'Keys inserted', min: 0, max: 7, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A binary search tree. The first key, 4, becomes the root. Rule: smaller keys go left, larger go right, at every node.', set: { order: 'good', k: 1 }, ms: 10500 },
    { say: '2 is smaller than 4: left. 6 is larger: right. 1: left of 4, then left of 2.', set: { k: 4 }, ms: 10500 },
    { say: 'All seven keys, in just 3 levels. To find 5: right at 4, left at 6, found. Each step throws away half of what is left.', set: { k: 7 }, ms: 11500, notes: [{ text: '3 levels for 7 keys', at: [-5.4, -3.6], to: [-5.3, -1.6], color: C.green }] },
    { say: 'The same keys inserted in sorted order: every key goes right of the last. The “tree” is a chain 7 levels deep, no better than a list.', set: { order: 'sorted', k: 7 }, ms: 12000, notes: [{ text: 'a chain: 7 levels', at: [-4.6, -3.8], to: [3.6, -2.4], color: C.red }] },
    { say: 'Balanced trees, such as AVL trees (1962), rearrange themselves after insertions so the depth stays about log₂ n: 20 levels for a million keys.', set: { order: 'mixed', k: 7 }, ms: 12000 },
  ],
  readout: (t) => {
    const ns = bst(ORDERS[t.order], R(t.k));
    return [
      ['Keys', `${ns.length}`],
      ['Levels', `${ns.length ? Math.max(...ns.map((n) => n.d)) + 1 : 0}`],
    ];
  },
  setup(kit) {
    const P = (n) => [-6.4 + (n.v - 1) * 2.1, 3.2 - n.d * 1.15];
    const edges = Array.from({ length: 7 }, () => kit.line([[0, 0], [1, 1]], { color: C.grey, width: 2.5 }));
    const dots = Array.from({ length: 7 }, () => kit.dot([0, 0], { r: 0.38, color: C.blue }));
    const labs = Array.from({ length: 7 }, () => kit.label('', [0, 0], { ...mono, size: 18 }));
    return (t) => {
      const ns = bst(ORDERS[t.order], R(t.k));
      for (let i = 0; i < 7; i++) {
        const n = ns[i];
        dots[i].visible(!!n);
        labs[i].visible(!!n);
        edges[i].visible(!!n && !!n.parent);
        if (!n) continue;
        dots[i].set(P(n)).color(i === ns.length - 1 ? C.gold : n.d === 0 ? C.green : C.blue);
        labs[i].set(`${n.v}`).pos(P(n));
        if (n.parent) edges[i].set([P(n.parent), P(n)]);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// cs-136: Dijkstra's algorithm on six places
// ---------------------------------------------------------------------------
const DV = { A: [-6.2, 0], B: [-2.4, 2.5], C: [-2.4, -2.5], D: [1.8, 2.5], E: [1.8, -2.5], F: [5.8, 0] };
const DE = [['A', 'B', 7], ['A', 'C', 2], ['C', 'B', 3], ['B', 'D', 4], ['C', 'E', 8], ['B', 'E', 6], ['D', 'E', 1], ['D', 'F', 5], ['E', 'F', 3]];
function dijkstra(rounds) {
  const d = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity };
  const prev = {};
  const done = [];
  let last = null;
  for (let r = 0; r < rounds; r++) {
    const u = Object.keys(d).filter((v) => !done.includes(v)).sort((a, b) => d[a] - d[b])[0];
    if (!u) break;
    done.push(u);
    last = u;
    for (const [a, b, w] of DE) {
      const v = a === u ? b : b === u ? a : null;
      if (v && !done.includes(v) && d[u] + w < d[v]) {
        d[v] = d[u] + w;
        prev[v] = u;
      }
    }
  }
  return { d, prev, done, last };
}
export const dijkstra_grid = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Run to the end. What is the shortest distance from A to F, and which way does it go?',
  goal: (t) => R(t.k) >= 6,
  params: [{ key: 'k', label: 'Places settled', min: 0, max: 6, step: 1, value: 0 }],
  beats: [
    { say: 'Six places and the roads between them, with lengths in kilometres. Find the shortest route from A to every other place. At first only A’s distance is known: 0.', set: { k: 0 }, ms: 11500 },
    { say: 'Settle A. Look along its roads: B is 7 away, C is 2. These are tentative: maybe a better route turns up.', set: { k: 1 }, ms: 11000 },
    { say: 'The closest unsettled place is C, at 2. Settle it: nothing can beat 2. Through C, B is only 2 + 3 = 5, better than 7. Update it.', set: { k: 2 }, ms: 12500, notes: [{ text: 'B improved: 7 → 5', at: [-5.6, 3.8], to: [-2.6, 2.9], color: C.gold }] },
    { say: 'Repeat: settle the closest, update its neighbours. B at 5, then D at 9, then E at 10.', set: { k: 5 }, ms: 11000 },
    { say: 'Finally F: 13 km, along A → C → E → F. The green roads form the tree of shortest routes from A to everywhere.', set: { k: 6 }, ms: 11500, notes: [{ text: '13 km', at: [5.6, 3.6], to: [5.8, 0.5], color: C.green }] },
  ],
  readout: (t) => {
    const r = dijkstra(R(t.k));
    return [
      ['Settled', r.done.join(' → ') || '—'],
      ['Distances', Object.entries(r.d).map(([v, x]) => `${v}:${x === Infinity ? '∞' : x}`).join('  ')],
    ];
  },
  setup(kit) {
    const roads = DE.map(([a, b, w]) => {
      const l = kit.line([DV[a], DV[b]], { color: C.grey, width: 3 });
      const m = [(DV[a][0] + DV[b][0]) / 2, (DV[a][1] + DV[b][1]) / 2];
      kit.label(`${w}`, [m[0] + 0.25, m[1] + 0.3], { ...mono, size: 15, color: C.grey });
      return [a, b, l];
    });
    const dots = Object.entries(DV).map(([v, p]) => [v, kit.dot(p, { r: 0.42, color: C.grid })]);
    Object.entries(DV).forEach(([v, p]) => kit.label(v, p, { tex: false, size: 18 }));
    const dl = Object.entries(DV).map(([v, p]) => [v, kit.label('', [p[0], p[1] + (p[1] >= 0 ? 0.8 : -0.8)], { ...mono, size: 16, color: C.gold })]);
    return (t) => {
      const r = dijkstra(R(t.k));
      dots.forEach(([v, d]) => d.color(r.done.includes(v) ? (v === r.last ? C.yellow : C.green) : r.d[v] < Infinity ? C.blue : C.grid));
      dl.forEach(([v, l]) => l.set(r.d[v] === Infinity ? '∞' : `${r.d[v]}`).color(r.done.includes(v) ? C.green : C.gold));
      roads.forEach(([a, b, l]) => {
        const tree = (r.prev[b] === a && r.done.includes(b)) || (r.prev[a] === b && r.done.includes(a));
        const tent = r.prev[b] === a || r.prev[a] === b;
        l.color(tree ? C.green : tent ? C.gold : C.grey);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// cs-137: the coin-change table, filled from small amounts upward
// ---------------------------------------------------------------------------
const COINS = { ph: [1, 5, 10, 20], odd: [1, 4, 6] };
function coinTable(coins, N) {
  const F = [0];
  const last = [0];
  for (let a = 1; a <= N; a++) {
    let best = Infinity;
    let bc = 0;
    for (const c of coins)
      if (c <= a && F[a - c] + 1 < best) {
        best = F[a - c] + 1;
        bc = c;
      }
    F.push(best);
    last.push(bc);
  }
  return { F, last };
}
const greedy = (coins, a) => {
  let n = 0;
  for (const c of [...coins].sort((x, y) => y - x))
    while (a >= c) {
      a -= c;
      n += 1;
    }
  return n;
};
export const dp_table = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'With coins 1, 4 and 6, find an amount where taking the biggest coin first (greedy) uses more coins than the table’s answer.',
  goal: (t) => t.coins === 'odd' && R(t.k) >= 8,
  params: [
    { key: 'coins', label: 'Coins', type: 'choice', value: 'ph', options: [{ value: 'ph', label: '1, 5, 10, 20 (pesos)' }, { value: 'odd', label: '1, 4, 6' }] },
    { key: 'k', label: 'Amounts filled', min: 0, max: 27, step: 1, value: 0 },
  ],
  beats: [
    { say: 'What is the fewest coins that make each amount? The table has one cell per amount, 0 to 27. Amount 0 needs 0 coins.', set: { coins: 'ph', k: 0 }, ms: 10500 },
    { say: 'Fill from small to large. For each amount, try every coin as the LAST coin: 1 + the best for what is left, which is already in the table.', set: { k: 9 }, ms: 11500, notes: [{ text: 'F(9) = 1 + F(4) = 5', at: [2.6, 3.6], to: [-0.4, 1.6], color: C.gold }] },
    { say: 'Every amount up to 27 is solved by looking back, never by starting over. Each small problem is solved once: that is dynamic programming.', set: { k: 27 }, ms: 11000 },
    { say: 'With odd coins 1, 4 and 6, a shortcut, always take the biggest coin, makes 8 as 6 + 1 + 1: three coins.', set: { coins: 'odd', k: 7 }, ms: 11000 },
    { say: 'The table finds F(8) = 2: 4 + 4. Greedy never reconsiders; the table checks every last coin.', set: { k: 8 }, ms: 10500, notes: [{ text: '8 = 4 + 4: 2 coins', at: [3.6, -0.4], to: [-0.4, 1.5], color: C.green }] },
  ],
  readout: (t) => {
    const k = R(t.k);
    const { F, last } = coinTable(COINS[t.coins], 27);
    return [
      ['Coins', COINS[t.coins].join(', ')],
      [`F(${k})`, `${F[k]}${k ? ` (last coin ${last[k]})` : ''}`],
      ['Greedy for that amount', `${greedy(COINS[t.coins], k)}`],
    ];
  },
  setup(kit) {
    const P = (a) => [-7.2 + (a % 14) * 1.05, a < 14 ? 1.2 : -1.6];
    const cells = Array.from({ length: 28 }, (_, a) => {
      const [x, y] = P(a);
      kit.label(`${a}`, [x + 0.47, y + 1.05], { ...mono, size: 12, color: C.grey });
      return [kit.rect(x, y, 0.95, 0.85, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1.5 }), kit.label('', [x + 0.47, y + 0.43], { ...mono, size: 18 })];
    });
    const arrow = kit.arrow([0, 0], [1, 1], { color: C.gold });
    kit.label('amount', [-7.6, 2.8], { tex: false, size: 12, color: C.grey, align: 'left' });
    return (t) => {
      const k = R(t.k);
      const { F, last } = coinTable(COINS[t.coins], 27);
      cells.forEach(([box, lab], a) => {
        const on = a <= k;
        lab.set(on ? `${F[a]}` : '');
        box.color(a === k ? 0x4a3b16 : on ? 0x1f3d22 : 0x1a2433);
      });
      arrow.visible(k > 0);
      if (k > 0) {
        const from = P(k - last[k]);
        const to = P(k);
        arrow.set([from[0] + 0.47, from[1] - 0.15], [to[0] + 0.47, to[1] - 0.15]);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// cs-138: how n², 2ⁿ and n! grow (log scale)
// ---------------------------------------------------------------------------
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const GROW = [
  { name: 'n²', f: (n) => n * n, color: C.green },
  { name: '2ⁿ', f: (n) => 2 ** n, color: C.gold },
  { name: 'n!', f: (n) => fact(n), color: C.red },
];
const human = (s) => (s < 1 ? 'under a second' : s < 3600 ? `${R(s)} seconds` : s < 86400 * 365 ? `${R(s / 86400)} days` : `${(s / (86400 * 365)).toExponential(1)} years`);
export const growth_race = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'At a billion steps per second, find the smallest n for which n! takes more than a year.',
  goal: (t) => R(t.n) === 19,
  params: [{ key: 'n', label: 'Items n', min: 1, max: 25, step: 1, value: 5 }],
  beats: [
    { say: 'Three ways a job can grow with its size n. Bars use a log scale: each grid line is ten times more steps.', set: { n: 5 }, ms: 10000 },
    { say: 'n² is polynomial: double n and the work grows four times. Sorting a million items is easy.', set: { n: 10 }, ms: 10000 },
    { say: '2ⁿ: each extra item doubles the work. Trying every subset of 25 things is already 33 million steps.', set: { n: 25 }, ms: 11000, notes: [{ text: '2²⁵ ≈ 3.4 × 10⁷', at: [2.4, 3.6], to: [0.6, 0.6], color: C.gold }] },
    { say: 'n!: trying every order, like every route for a travelling salesman. 20 cities: about 2.4 × 10¹⁸ orders, 77 years at a billion per second.', set: { n: 20 }, ms: 12000 },
    { say: 'Is there always a clever shortcut, as sorting has? For thousands of problems like the salesman’s, nobody knows. That is the P versus NP question.', set: { n: 25 }, ms: 11500 },
  ],
  readout: (t) => {
    const n = R(t.n);
    return GROW.map((g) => [g.name, `${g.f(n).toExponential(2)} steps · ${human(g.f(n) / 1e9)}`]);
  },
  setup(kit) {
    const Y = (v) => -3.2 + Math.log10(Math.max(1, v)) * 0.27;
    for (let e = 0; e <= 25; e += 5) {
      kit.line([[-6.6, Y(10 ** e)], [6.6, Y(10 ** e)]], { color: C.grid, width: 1 });
      kit.label(`10^{${e}}`, [-7.2, Y(10 ** e)], { size: 11, color: C.grey });
    }
    const bars = GROW.map((g, i) => kit.rect(-4.5 + i * 3.6, Y(1), 1.8, 0.02, { color: g.color, opacity: 0.6, strokeColor: g.color, width: 1.5 }));
    GROW.forEach((g, i) => kit.label(g.name, [-3.6 + i * 3.6, -3.6], { tex: false, size: 18, color: g.color }));
    const vals = GROW.map((g, i) => kit.label('', [-3.6 + i * 3.6, 0], { tex: false, size: 13 }));
    kit.line([[-6.6, Y(3.15e16)], [6.6, Y(3.15e16)]], { color: C.red, width: 1.5, dashed: true });
    kit.label('one year at 10⁹ steps/s', [-4.4, Y(3.15e16) + 0.3], { tex: false, size: 12, color: C.red });
    return (t) => {
      const n = R(t.n);
      GROW.forEach((g, i) => {
        const v = g.f(n);
        bars[i].set(-4.5 + i * 3.6, Y(1), 1.8, Math.max(0.02, Y(v) - Y(1)));
        vals[i].set(v < 1e6 ? `${v}` : v.toExponential(1)).pos([-3.6 + i * 3.6, Math.min(Y(v) + 0.3, 3.9)]);
      });
    };
  },
};
