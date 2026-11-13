// Computer Science track: Systems and Security (sec-001 to sec-008). Story
// scenes: hidden params drive the reveals, and touching any control switches
// to the `free` values.
import { C } from '../theme';

const R = Math.round;
const mono = { tex: false, cls: 'mono' };

// ---------------------------------------------------------------------------
// sec-001: a 4-bit ripple-carry adder
// ---------------------------------------------------------------------------
export function ripple(a, b, k) {
  const sum = [];
  const carry = [0];
  for (let i = 0; i < 4; i++) {
    const x = (a >> i) & 1;
    const y = (b >> i) & 1;
    const c = carry[i];
    sum.push(i < k ? x ^ y ^ c : null);
    carry.push(i < k ? (x & y) | (c & (x ^ y)) : null);
  }
  return { sum, carry };
}
const bits4 = (v) => v.toString(2).padStart(4, '0');
export const adder_ripple = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Pick two numbers whose sum does not fit in 4 bits, and run all four stages. What happens to the extra bit?',
  goal: (t) => R(t.a) + R(t.b) > 15 && R(t.k) >= 4,
  params: [
    { key: 'a', label: 'a', min: 0, max: 15, step: 1, value: 6 },
    { key: 'b', label: 'b', min: 0, max: 15, step: 1, value: 7 },
    { key: 'k', label: 'Stages done', min: 0, max: 4, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Four full adders, one per bit, the lowest bit on the right. We add a = 6 (0110) and b = 7 (0111).', set: { a: 6, b: 7, k: 0 }, ms: 11000 },
    { say: 'Stage 0: 0 + 1 with no carry in. The sum bit is 1, the carry is 0.', set: { k: 1 }, ms: 9500 },
    { say: 'Stage 1: 1 + 1 = 10 in binary. Sum bit 0, and a carry of 1 ripples left to the next stage.', set: { k: 2 }, ms: 10500, notes: [{ text: 'carry ripples left', at: [3.0, 3.8], to: [0.0, 0.3], color: C.gold }] },
    { say: 'All four stages: 1101, which is 13. Each stage waits for the carry from its right, which is why bigger adders use faster carry tricks.', set: { k: 4 }, ms: 11500 },
    { say: '9 + 8 = 17 needs five bits. The fifth falls out as the carry from the last stage: overflow. The 4-bit answer reads 0001.', set: { a: 9, b: 8, k: 4 }, ms: 12000, notes: [{ text: 'overflow', at: [-5.4, 3.6], to: [-6.6, 0.3], color: C.red }] },
  ],
  readout: (t) => {
    const a = R(t.a);
    const b = R(t.b);
    return [
      ['a + b', `${bits4(a)} + ${bits4(b)} (${a} + ${b})`],
      ['Result', R(t.k) >= 4 ? `${a + b > 15 ? '1 ' : ''}${bits4((a + b) & 15)} = ${(a + b) & 15}${a + b > 15 ? ' + overflow' : ''}` : '…'],
    ];
  },
  setup(kit) {
    const X = (i) => 4.5 - i * 3;
    const boxes = [0, 1, 2, 3].map((i) => {
      kit.rect(X(i) - 1.0, -0.8, 2.0, 1.6, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 });
      kit.label(`FA ${i}`, [X(i), 0.35], { tex: false, size: 13, color: C.grey });
      return {
        a: kit.label('', [X(i) - 0.45, 2.1], { ...mono, size: 22 }),
        b: kit.label('', [X(i) + 0.45, 2.1], { ...mono, size: 22 }),
        s: kit.label('', [X(i), -2.0], { ...mono, size: 26 }),
        c: kit.label('', [X(i) - 1.5, 0.45], { ...mono, size: 16, color: C.gold }),
        cArrow: kit.arrow([X(i) - 1.0, 0], [X(i) - 2.0, 0], { color: C.gold }),
      };
    });
    [0, 1, 2, 3].forEach((i) => {
      kit.line([[X(i) - 0.45, 1.8], [X(i) - 0.45, 0.8]], { color: C.grey, width: 1.5 });
      kit.line([[X(i) + 0.45, 1.8], [X(i) + 0.45, 0.8]], { color: C.grey, width: 1.5 });
      kit.line([[X(i), -0.8], [X(i), -1.6]], { color: C.grey, width: 1.5 });
      kit.label(`bit ${i}`, [X(i), 2.8], { tex: false, size: 12, color: C.grey });
    });
    kit.label('a  b', [X(0), 3.3], { ...mono, size: 12, color: C.grey });
    kit.label('sum', [7.3, -2.0], { tex: false, size: 13, color: C.grey });
    const over = kit.label('', [-7.0, -2.0], { ...mono, size: 26, color: C.red });
    const total = kit.label('', [0, -3.5], { tex: false, size: 20 });
    return (t) => {
      const a = R(t.a);
      const b = R(t.b);
      const k = R(t.k);
      const r = ripple(a, b, k);
      boxes.forEach((bx, i) => {
        bx.a.set(`${(a >> i) & 1}`);
        bx.b.set(`${(b >> i) & 1}`);
        bx.s.set(r.sum[i] === null ? '·' : `${r.sum[i]}`).color(r.sum[i] === null ? C.grey : C.green);
        const c = r.carry[i + 1];
        bx.c.set(c === null ? '' : `${c}`);
        bx.cArrow.visible(c !== null && i < 3);
        bx.cArrow.color(c === 1 ? C.gold : C.grey);
      });
      const cOut = r.carry[4];
      over.set(cOut === 1 ? '1' : '');
      total.set(k >= 4 ? `${a} + ${b} = ${a + b}${a + b > 15 ? ' → 4 bits keep only ' + ((a + b) & 15) : ''}` : '').color(a + b > 15 ? C.red : C.text);
    };
  },
};

// ---------------------------------------------------------------------------
// sec-002: RAID parity, rebuilding a lost disk
// ---------------------------------------------------------------------------
const DISKS = [0b10110100, 0b01101001, 0b11100011];
const PAR = DISKS[0] ^ DISKS[1] ^ DISKS[2];
const ROWS = [...DISKS, PAR];
const bit = (v, j) => (v >> (7 - j)) & 1;
export const raid_parity = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Fail disk 2 and rebuild all 8 of its bits from the other three disks.',
  goal: (t) => t.fail === '2' && R(t.k) >= 8,
  params: [
    { key: 'fail', label: 'Failed disk', type: 'choice', value: 'none', options: [{ value: 'none', label: 'None' }, { value: '1', label: 'Disk 1' }, { value: '2', label: 'Disk 2' }, { value: '3', label: 'Disk 3' }, { value: 'P', label: 'Parity disk' }] },
    { key: 'k', label: 'Bits rebuilt', min: 0, max: 8, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Three disks each hold one byte of data. A fourth holds parity: in every column, the parity bit makes the number of 1s even. That is the XOR of the column.', set: { fail: 'none', k: 0 }, ms: 12500 },
    { say: 'Disk 2 dies. Its byte is gone… or is it?', set: { fail: '2', k: 0 }, ms: 8500, notes: [{ text: 'lost', at: [5.2, 3.4], to: [3.6, 1.0], color: C.red }] },
    { say: 'Column 1: disk 1 has 1, disk 3 has 1, parity has 0. To keep the count even, disk 2 must have had 0. XOR the survivors: 1 ⊕ 1 ⊕ 0 = 0.', set: { k: 1 }, ms: 13000 },
    { say: 'Column by column, the whole byte comes back. A new disk is filled this way while the array keeps serving files.', set: { k: 8 }, ms: 11000 },
    { say: 'It works for any one disk, even the parity disk: just recompute it. Two failures at once, though, lose data; RAID 6 adds a second parity for that.', set: { fail: 'P', k: 8 }, ms: 12000 },
  ],
  readout: (t) => [
    ['Failed', t.fail === 'none' ? 'none' : t.fail === 'P' ? 'parity' : `disk ${t.fail}`],
    ['Rebuilt', t.fail === 'none' ? '—' : `${R(t.k)} of 8 bits`],
  ],
  setup(kit) {
    const names = ['Disk 1', 'Disk 2', 'Disk 3', 'Parity'];
    const Y = (r) => 2.6 - r * 1.3;
    const X = (j) => -3.2 + j * 0.95;
    const cells = ROWS.map((v, r) => {
      kit.label(names[r], [-5.6, Y(r) + 0.4], { tex: false, size: 15, color: r === 3 ? C.gold : C.grey });
      return Array.from({ length: 8 }, (_, j) => ({
        box: kit.rect(X(j), Y(r), 0.8, 0.8, { color: 0x1a2433, opacity: 1, strokeColor: r === 3 ? C.gold : C.blue, width: 1.5 }),
        lab: kit.label('', [X(j) + 0.4, Y(r) + 0.4], { ...mono, size: 20 }),
      }));
    });
    kit.line([[X(0) - 0.2, Y(3) + 1.05], [X(7) + 1.0, Y(3) + 1.05]], { color: C.grey, width: 1, dashed: true });
    const colHi = kit.rect(0, Y(3) - 0.1, 1.0, 4.9, { fill: false, strokeColor: C.gold, width: 2.5 });
    const xorL = kit.label('', [0, -3.4], { ...mono, size: 18, color: C.gold });
    return (t) => {
      const k = R(t.k);
      const f = t.fail === 'none' ? -1 : t.fail === 'P' ? 3 : Number(t.fail) - 1;
      ROWS.forEach((v, r) => {
        cells[r].forEach((c, j) => {
          const lost = r === f;
          const back = lost && j < k;
          c.lab.set(lost && !back ? '?' : `${bit(v, j)}`).color(back ? C.green : lost ? C.red : C.text);
          c.box.color(lost ? (back ? 0x1f3d22 : 0x3a1f1f) : 0x1a2433);
        });
      });
      const j = k - 1;
      const show = f >= 0 && k >= 1 && k <= 8;
      colHi.visible(show);
      xorL.visible(show);
      if (show) {
        colHi.set(X(j) - 0.1, Y(3) - 0.1, 1.0, 4.9);
        const others = [0, 1, 2, 3].filter((r) => r !== f).map((r) => bit(ROWS[r], j));
        xorL.set(`column ${j + 1}: ${others.join(' ⊕ ')} = ${others[0] ^ others[1] ^ others[2]}`);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// sec-003: majority quorums always overlap
// ---------------------------------------------------------------------------
export function quorum(rule, down, k) {
  const q = rule === 'maj' ? 3 : 2;
  const alive = [0, 1, 2, 3, 4].filter((i) => i >= down);
  const W = [0, 1, 2, 3, 4].slice(0, q);
  const can = alive.length >= q;
  const Rd = can ? alive.slice(alive.length - q) : [];
  const overlap = Rd.filter((i) => W.includes(i));
  return { q, alive, W: k >= 1 ? W : [], Rd: k >= 2 ? Rd : [], can, overlap: k >= 2 ? overlap : [] };
}
export const quorum_vote = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'With majority quorums, crash as many replicas as you can while a read still finds the write.',
  goal: (t) => t.rule === 'maj' && R(t.down) === 2 && R(t.k) >= 2,
  params: [
    { key: 'rule', label: 'Quorum', type: 'choice', value: 'maj', options: [{ value: 'maj', label: 'Majority (3 of 5)' }, { value: 'two', label: 'Any 2 of 5' }] },
    { key: 'down', label: 'Replicas crashed', min: 0, max: 3, step: 1, value: 0 },
    { key: 'k', label: 'Steps (write, then read)', min: 0, max: 2, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Five replicas keep copies of a bank balance. A write counts as done once a majority, 3 of 5, has stored it.', set: { rule: 'maj', down: 0, k: 0 }, ms: 11000 },
    { say: 'The new balance is written to replicas 0, 1 and 2.', set: { k: 1 }, ms: 8500 },
    { say: 'Later, a read asks any 3 replicas, say 2, 3 and 4. Two groups of 3 out of 5 must share someone: replica 2 has the new balance.', set: { k: 2 }, ms: 12000, notes: [{ text: 'the overlap remembers', at: [4.6, 3.6], to: [-0.6, 2.4], color: C.green }] },
    { say: 'Crash two replicas, 0 and 1. The three survivors are still a majority, and one of them holds the write. Five machines survive two failures.', set: { down: 2, k: 2 }, ms: 12000 },
    { say: 'With “any 2 of 5”, a write to 0 and 1 and a read from 3 and 4 share nobody: the read returns the old balance. That is why systems insist on a majority.', set: { rule: 'two', down: 0, k: 2 }, ms: 13000 },
  ],
  readout: (t) => {
    const r = quorum(t.rule, R(t.down), R(t.k));
    return [
      ['Quorum size', `${r.q}`],
      ['Read sees write?', R(t.k) < 2 ? '—' : !r.can ? 'no quorum: refuse' : r.overlap.length ? 'yes' : 'NO: stale'],
    ];
  },
  setup(kit) {
    const O = [-2.0, 0.2];
    const P = (i) => [O[0] + 3.0 * Math.cos(Math.PI / 2 - (2 * Math.PI * i) / 5), O[1] + 3.0 * Math.sin(Math.PI / 2 - (2 * Math.PI * i) / 5)];
    const ring = [0, 1, 2, 3, 4].map((i) => kit.dot(P(i), { r: 0.75, color: 0x2a3a52 }));
    const dots = [0, 1, 2, 3, 4].map((i) => kit.dot(P(i), { r: 0.55, color: C.blue }));
    const labs = [0, 1, 2, 3, 4].map((i) => kit.label(`${i}`, P(i), { ...mono, size: 20, color: '#0b1220' }));
    const vals = [0, 1, 2, 3, 4].map((i) => kit.label('', [P(i)[0], P(i)[1] - 1.05], { ...mono, size: 13 }));
    const status = kit.label('', [4.8, 0.4], { tex: false, size: 19 });
    kit.label('■ wrote   ■ read   ■ both', [4.8, -1.0], { tex: false, size: 13, color: C.grey });
    return (t) => {
      const r = quorum(t.rule, R(t.down), R(t.k));
      [0, 1, 2, 3, 4].forEach((i) => {
        const dead = !r.alive.includes(i);
        const w = r.W.includes(i);
        const rd = r.Rd.includes(i);
        dots[i].color(dead ? C.grey : w && rd ? C.green : w ? C.gold : rd ? C.blue : 0x5a6b85);
        ring[i].color(rd ? C.blue : 0x2a3a52);
        ring[i].opacity(rd ? 0.5 : 1);
        labs[i].set(dead ? '✗' : `${i}`);
        vals[i].set(dead ? 'crashed' : w ? '₱5,000 (new)' : '₱2,000 (old)').color(dead ? C.red : w ? C.gold : C.grey);
      });
      const k = R(t.k);
      status.set(k < 2 ? (k === 1 ? `write stored on ${r.q}` : 'ready') : !r.can ? 'too few alive: refuse' : r.overlap.length ? 'read finds ₱5,000' : 'read gets ₱2,000: stale!').color(k < 2 ? C.text : !r.can ? C.gold : r.overlap.length ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// sec-004: a stack buffer overflow
// ---------------------------------------------------------------------------
const PAYLOAD = 'AAAAAAAAAAAAEVIL';
export function smash(len, safe) {
  const written = safe ? Math.min(len, 7) : len;
  const mem = Array.from({ length: 16 }, (_, i) => {
    if (i < written) return PAYLOAD[i];
    if (i === written && (safe || i < 8)) return '\\0';
    if (i >= 8 && i < 12) return 'f';
    if (i >= 12) return 'r';
    return '';
  });
  const ret = written >= 16 ? 'attacker' : written > 12 ? 'garbage' : 'ok';
  return { mem, written, ret };
}
export const stack_smash = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Switch to the bounded copy. Can any input length now reach the return address?',
  goal: (t) => t.safe === 'yes' && R(t.len) >= 16,
  params: [
    { key: 'safe', label: 'Copy', type: 'choice', value: 'no', options: [{ value: 'no', label: 'strcpy (no size check)' }, { value: 'yes', label: 'Bounded copy (max 7 + end)' }] },
    { key: 'len', label: 'Input length', min: 0, max: 16, step: 1, value: 0 },
  ],
  beats: [
    { say: 'A function keeps an 8-byte buffer for your name on the stack. Right after it: a saved frame pointer, then the return address, where the program goes when the function ends.', set: { safe: 'no', len: 0 }, ms: 12500 },
    { say: 'A 6-letter name fits, with its end marker. Everything is fine.', set: { len: 6 }, ms: 8500 },
    { say: 'Twelve letters, and the copy does not check size. The extra bytes overwrite the saved frame pointer.', set: { len: 12 }, ms: 10500, notes: [{ text: 'spilled over', at: [2.4, 3.6], to: [1.2, 0.9], color: C.red }] },
    { say: 'Sixteen bytes, carefully chosen: the last four replace the return address. When the function returns, it jumps wherever the attacker said. This is how the 1988 Morris worm got in.', set: { len: 16 }, ms: 13000 },
    { say: 'A bounded copy stops at the buffer’s size. However long the input, the return address is safe. Memory-safe languages do this check every time.', set: { safe: 'yes', len: 16 }, ms: 12000 },
  ],
  readout: (t) => {
    const r = smash(R(t.len), t.safe === 'yes');
    return [
      ['Bytes copied', `${r.written}`],
      ['Return goes to', r.ret === 'ok' ? 'main() (correct)' : r.ret === 'garbage' ? 'garbage: crash' : 'attacker’s code'],
    ];
  },
  setup(kit) {
    const X = (i) => -7.0 + i * 0.88;
    const zones = [['buffer (8 bytes)', 0, 8, C.blue], ['saved frame', 8, 4, C.purple], ['return address', 12, 4, C.gold]];
    zones.forEach(([name, s, n, col]) => {
      kit.rect(X(s) - 0.02, -0.65, n * 0.88 - 0.06, 1.3, { fill: false, strokeColor: col, width: 2.5 });
      kit.label(name, [X(s) + (n * 0.88) / 2 - 0.05, -1.15], { tex: false, size: 13, color: col });
    });
    const cells = Array.from({ length: 16 }, (_, i) => ({
      box: kit.rect(X(i) + 0.04, -0.55, 0.78, 1.1, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1 }),
      lab: kit.label('', [X(i) + 0.43, 0], { ...mono, size: 18 }),
    }));
    const input = kit.label('', [-7.0, 2.6], { ...mono, size: 18, align: 'left' });
    kit.label('input:', [-7.0, 3.4], { tex: false, size: 13, color: C.grey, align: 'left' });
    const jump = kit.label('', [0, -3.0], { tex: false, size: 20 });
    return (t) => {
      const len = R(t.len);
      const r = smash(len, t.safe === 'yes');
      input.set(`"${PAYLOAD.slice(0, len)}"`);
      cells.forEach((c, i) => {
        const v = r.mem[i];
        const ours = i < r.written;
        c.lab.set(v === 'f' ? '··' : v === 'r' ? '→' : v).color(ours ? (i >= 8 ? C.red : C.text) : v === '\\0' ? C.grey : C.grey);
        c.box.color(ours ? (i >= 12 ? 0x4a1f1f : i >= 8 ? 0x3a2440 : 0x1d3550) : 0x1a2433);
      });
      jump.set(r.ret === 'ok' ? 'return → main()   ✓' : r.ret === 'garbage' ? 'return → ??? (crash)' : 'return → “EVIL”: attacker’s code runs').color(r.ret === 'ok' ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// sec-005: SQL injection on a login query
// ---------------------------------------------------------------------------
const USERS = ['admin', 'maria', "o'brien"];
const INPUTS2 = {
  maria: { label: 'maria', text: 'maria' },
  quote: { label: "o'brien", text: "o'brien" },
  attack: { label: "' OR '1'='1", text: "' OR '1'='1" },
  drop: { label: "x'; DROP TABLE users; --", text: "x'; DROP TABLE users; --" },
};
export function login(input, mode) {
  const s = INPUTS2[input].text;
  if (mode === 'param') return { rows: USERS.filter((u) => u === s), msg: 'value sent separately' };
  if (input === 'maria') return { rows: ['maria'], msg: 'normal' };
  if (input === 'quote') return { rows: [], msg: 'syntax error', error: true };
  if (input === 'attack') return { rows: USERS.slice(), msg: "'1'='1' is always true" };
  return { rows: [], msg: 'users table deleted!', dropped: true };
}
export const sql_injection = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Switch to the parameterised query and try the attack inputs. Does either still work?',
  goal: (t) => t.mode === 'param' && t.input === 'attack',
  params: [
    { key: 'input', label: 'Typed username', type: 'choice', value: 'maria', options: Object.entries(INPUTS2).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'mode', label: 'Query', type: 'choice', value: 'glue', options: [{ value: 'glue', label: 'Glued string' }, { value: 'param', label: 'Parameterised (?)' }] },
  ],
  beats: [
    { say: 'A login page pastes whatever you type into a SQL query, between quotes. Typing maria finds Maria’s row.', set: { input: 'maria', mode: 'glue' }, ms: 11000 },
    { say: 'A real name with an apostrophe, O’Brien, ends the quote early. The query breaks: a hint that input is being read as code.', set: { input: 'quote' }, ms: 11000 },
    { say: 'An attacker types a quote, then OR ’1’=’1’. The condition is always true, every row matches, and the attacker is logged in as the first user: admin.', set: { input: 'attack' }, ms: 13000, notes: [{ text: 'input became code', at: [4.0, 1.6], to: [2.0, 2.9], color: C.red }] },
    { say: 'Worse: a second command can ride along and delete the whole table.', set: { input: 'drop' }, ms: 9500 },
    { say: 'A parameterised query sends the question with a placeholder and the value separately. Whatever is typed is only ever a name to look for, so the attack finds nobody, and O’Brien can log in.', set: { input: 'attack', mode: 'param' }, ms: 13500 },
  ],
  readout: (t) => {
    const r = login(t.input, t.mode);
    return [
      ['Rows matched', r.dropped ? '—' : `${r.rows.length}`],
      ['Logged in as', r.rows[0] || 'nobody'],
    ];
  },
  setup(kit) {
    const q1 = kit.label('', [-7.4, 3.5], { ...mono, size: 15, align: 'left' });
    const q2 = kit.label('', [-7.4, 2.8], { ...mono, size: 15, align: 'left', color: C.red });
    const q3 = kit.label('', [-7.4, 2.1], { ...mono, size: 13, align: 'left', color: C.grey });
    kit.label('users', [-6.4, 0.9], { tex: false, size: 14, color: C.grey, align: 'left' });
    const rows = USERS.map((u, i) => ({
      box: kit.rect(-6.4, 0.1 - i * 0.75, 3.6, 0.65, { color: 0x1a2433, opacity: 1, strokeColor: C.grid, width: 1 }),
      lab: kit.label(u, [-6.2, 0.42 - i * 0.75], { ...mono, size: 15, align: 'left' }),
    }));
    const msg = kit.label('', [2.4, -0.6], { tex: false, size: 20 });
    const who = kit.label('', [2.4, -1.6], { tex: false, size: 16, color: C.grey });
    return (t) => {
      const s = INPUTS2[t.input].text;
      const r = login(t.input, t.mode);
      if (t.mode === 'param') {
        q1.set("SELECT * FROM users WHERE name = ?");
        q2.set(`?  ←  "${s}"   (a value, never code)`).color(C.green);
        q3.set('');
      } else {
        q1.set("SELECT * FROM users WHERE name = '" + s + "'");
        q2.set(t.input === 'maria' ? '' : t.input === 'quote' ? "                                   ↑ quote closes early" : '                                   ↑ typed text changed the query').color(C.red);
        q3.set('');
      }
      rows.forEach((row, i) => {
        const hit = r.rows.includes(USERS[i]);
        row.box.color(r.dropped ? 0x3a1f1f : hit ? 0x1f3d22 : 0x1a2433);
        row.lab.opacity(r.dropped ? 0.3 : 1);
      });
      msg.set(r.error ? 'Error: broken query' : r.dropped ? 'Table deleted!' : r.rows.length ? `Welcome, ${r.rows[0]}!` : 'No such user').color(r.error || r.dropped || (t.input !== 'maria' && t.input !== 'quote' && r.rows.length) ? C.red : r.rows.length ? C.green : C.text);
      who.set(r.msg);
    };
  },
};

// ---------------------------------------------------------------------------
// sec-006: password search space
// ---------------------------------------------------------------------------
const ALPHA = {
  digits: { label: 'Digits only (10)', A: 10 },
  lower: { label: 'Lowercase (26)', A: 26 },
  mixed: { label: 'Upper + lower (52)', A: 52 },
  all: { label: 'Any keyboard symbol (95)', A: 95 },
  words: { label: 'Random words (7,776 each)', A: 7776 },
};
const RATE = 1e10;
export const crackSeconds = (kind, L) => ALPHA[kind].A ** L / RATE;
export function human(s) {
  const Y = 3.156e7;
  if (s < 1) return `${s < 1e-3 ? s.toExponential(0) : s.toFixed(3)} s`;
  if (s < 60) return `${s.toFixed(0)} seconds`;
  if (s < 3600) return `${(s / 60).toFixed(0)} minutes`;
  if (s < 86400) return `${(s / 3600).toFixed(1)} hours`;
  if (s < Y) return `${(s / 86400).toFixed(1)} days`;
  if (s < 1e6 * Y) return `${R(s / Y).toLocaleString('en-US')} years`;
  return `${(s / Y).toExponential(1)} years`;
}
export const password_space = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Using random words, find the fewest words that take more than 1,000 years to try them all.',
  goal: (t) => t.kind === 'words' && R(t.L) === 6,
  params: [
    { key: 'kind', label: 'Built from', type: 'choice', value: 'digits', options: Object.entries(ALPHA).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'L', label: 'Length (characters or words)', min: 1, max: 16, step: 1, value: 6 },
  ],
  beats: [
    { say: 'An attacker with a stolen, fast-hashed password list can try about 10 billion guesses a second. A 6-digit PIN has a million possibilities: gone in a ten-thousandth of a second.', set: { kind: 'digits', L: 6 }, ms: 13000 },
    { say: 'Eight lowercase letters: 26⁸, about 200 billion. Twenty seconds.', set: { kind: 'lower', L: 8 }, ms: 9500 },
    { say: 'Eight characters from the whole keyboard: about a week. Better, but a determined attacker waits a week.', set: { kind: 'all', L: 8 }, ms: 10500 },
    { say: 'Twelve characters from the keyboard: over a million years. Every extra character multiplies the work by 95.', set: { L: 12 }, ms: 10500, notes: [{ text: 'length wins', at: [4.4, 3.4], to: [3.2, 0.5], color: C.green }] },
    { say: 'Random words, picked by dice from a list of 7,776: four words take days, six take hundreds of thousands of years, and you can remember them.', set: { kind: 'words', L: 6 }, ms: 12500 },
  ],
  readout: (t) => {
    const L = R(t.L);
    const A = ALPHA[t.kind].A;
    return [
      ['Possibilities', `${(A ** L).toExponential(2)}`],
      ['Entropy', `${(L * Math.log2(A)).toFixed(0)} bits`],
      ['Time to try all', human(crackSeconds(t.kind, L))],
    ];
  },
  setup(kit) {
    const Y = 3.156e7;
    const marks = [[1, '1 s'], [3600, '1 hour'], [86400, '1 day'], [Y, '1 year'], [1000 * Y, '1,000 yr'], [1.38e10 * Y, 'age of the universe']];
    const X = (s) => -6.5 + ((Math.log10(Math.max(s, 1e-6)) + 6) / 30) * 13;
    kit.line([[X(1e-6), -0.6], [X(1e24), -0.6]], { color: C.axis, width: 1.5 });
    marks.forEach(([s, name], i) => {
      kit.line([[X(s), -0.8], [X(s), 1.2]], { color: C.grid, width: 1 });
      kit.label(name, [X(s), i % 2 ? -1.5 : -1.1], { tex: false, size: 11, color: C.grey });
    });
    const bar = kit.rect(X(1e-6), -0.4, 1, 1.4, { color: C.blue, opacity: 0.8, strokeColor: C.blue, width: 1 });
    const t1 = kit.label('', [0, 3.4], { tex: false, size: 20 });
    const t2 = kit.label('', [0, 2.5], { ...mono, size: 15, color: C.grey });
    const ex = kit.label('', [0, -3.2], { ...mono, size: 16, color: C.gold });
    const EX = { digits: '493027', lower: 'qmzbtrea', mixed: 'QmZbTrEa', all: 'q#Z9!r~a', words: 'jeepney mango rooftop guitar' };
    return (t) => {
      const L = R(t.L);
      const s = crackSeconds(t.kind, L);
      const w = Math.min(X(s), X(1e24)) - X(1e-6);
      bar.set(X(1e-6), -0.4, Math.max(0.05, w), 1.4);
      bar.color(s < 86400 ? C.red : s < 1000 * Y ? C.gold : C.green);
      t1.set(`time to try every possibility: ${human(s)}`);
      t2.set(`${ALPHA[t.kind].A}^${L} = ${(ALPHA[t.kind].A ** L).toExponential(2)} at 10¹⁰ guesses/s`);
      const e = EX[t.kind];
      ex.set(t.kind === 'words' ? `e.g. ${['jeepney', 'mango', 'rooftop', 'guitar', 'carabao', 'lantern', 'typhoon', 'pancit', 'kalesa', 'bamboo', 'sampaguita', 'harbor', 'tilapia', 'saber', 'otter', 'monsoon'].slice(0, L).join(' ')}` : `e.g. ${e.repeat(3).slice(0, L)}`);
    };
  },
};

// ---------------------------------------------------------------------------
// sec-007: checking a certificate chain
// ---------------------------------------------------------------------------
const CERTS = {
  good: { label: 'Real bank certificate', site: 'www.bank.com.ph', issuer: 'Intermediate CA', sigOK: true, root: 'Trusted Root CA', rootOK: true },
  forged: { label: 'Forged by an attacker', site: 'www.bank.com.ph', issuer: 'Intermediate CA', sigOK: false, root: 'Trusted Root CA', rootOK: true },
  unknown: { label: 'Signed by an unknown root', site: 'www.bank.com.ph', issuer: 'Sketchy CA', sigOK: true, root: 'Sketchy Root', rootOK: false },
};
export function chainCheck(cert, k) {
  const c = CERTS[cert];
  const checks = [c.sigOK, true, c.rootOK];
  let fail = -1;
  for (let i = 0; i < Math.min(k, 3); i++) if (!checks[i]) { fail = i; break; }
  return { c, checks, fail, done: k >= 3 || fail >= 0, ok: k >= 3 && fail < 0 };
}
export const chain_of_trust = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Try the forged certificate. At which check does the browser reject it?',
  goal: (t) => t.cert === 'forged' && R(t.k) >= 1,
  params: [
    { key: 'cert', label: 'Certificate', type: 'choice', value: 'good', options: Object.entries(CERTS).map(([value, o]) => ({ value, label: o.label })) },
    { key: 'k', label: 'Checks done', min: 0, max: 3, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Your browser receives three certificates: the bank’s, an intermediate authority’s, and a root authority’s.', set: { cert: 'good', k: 0 }, ms: 10000 },
    { say: 'Check 1: the bank’s certificate carries a signature. The browser verifies it with the intermediate’s public key. It matches.', set: { k: 1 }, ms: 11000 },
    { say: 'Check 2: the intermediate’s certificate is verified with the root’s key. Check 3: is that root in the list built into your phone or computer? Yes. Padlock.', set: { k: 3 }, ms: 12500, notes: [{ text: 'built into your device', at: [4.4, 3.8], to: [1.6, 3.0], color: C.green }] },
    { say: 'An attacker makes a certificate saying “I am the bank” but cannot produce the intermediate’s signature without its private key. Check 1 fails.', set: { cert: 'forged', k: 3 }, ms: 12000 },
    { say: 'A certificate chain that ends at a root your device does not trust fails at check 3. This is why a hacked authority, like DigiNotar in 2011, gets removed from the list.', set: { cert: 'unknown', k: 3 }, ms: 12500 },
  ],
  readout: (t) => {
    const r = chainCheck(t.cert, R(t.k));
    return [
      ['Status', r.fail >= 0 ? `rejected at check ${r.fail + 1}` : r.ok ? 'trusted 🔒' : 'checking…'],
    ];
  },
  setup(kit) {
    const Ys = [2.4, 0.0, -2.4];
    const boxes = Ys.map((y) => ({
      box: kit.rect(-5.4, y - 0.8, 7.0, 1.6, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 }),
      name: kit.label('', [-5.1, y + 0.3], { tex: false, size: 16, align: 'left' }),
      sub: kit.label('', [-5.1, y - 0.35], { tex: false, size: 12, color: C.grey, align: 'left' }),
    }));
    const arrows = [0, 1].map((i) => kit.arrow([-1.9, Ys[i + 1] + 0.85], [-1.9, Ys[i] - 0.85], { color: C.grey }));
    const marks = [0, 1, 2].map(() => kit.label('', [0, 0], { tex: false, size: 26 }));
    const store = kit.label('trust store', [4.6, 2.4], { tex: false, size: 14, color: C.grey });
    const verdict = kit.label('', [4.6, -2.4], { tex: false, size: 22 });
    return (t) => {
      const r = chainCheck(t.cert, R(t.k));
      const c = r.c;
      const k = R(t.k);
      boxes[0].name.set(c.root);
      boxes[0].sub.set(c.rootOK ? 'root: signs itself, ships with your OS' : 'root: NOT in your device’s list');
      boxes[1].name.set(c.issuer);
      boxes[1].sub.set(`signed by ${c.root}`);
      boxes[2].name.set(c.site);
      boxes[2].sub.set(t.cert === 'forged' ? `claims: signed by ${c.issuer}` : `signed by ${c.issuer}`);
      // check i: 0 = site sig, 1 = intermediate sig, 2 = root in store
      const pos = [[2.2, Ys[2]], [2.2, Ys[1]], [2.2, Ys[0]]];
      marks.forEach((m, i) => {
        const done = i < k && (r.fail < 0 || i <= r.fail);
        m.visible(done);
        if (done) m.set(r.checks[i] ? '✓' : '✗').pos(pos[i]).color(r.checks[i] ? C.green : C.red);
      });
      arrows.forEach((a, i) => a.color(i < k && (r.fail < 0 || i <= r.fail) ? (r.checks[i] ? C.green : C.red) : C.grey));
      store.set(c.rootOK ? 'in trust store ✓' : 'not in trust store').color(k >= 3 && r.fail !== 0 ? (c.rootOK ? C.green : C.red) : C.grey);
      verdict.set(r.ok ? '🔒 secure connection' : r.fail >= 0 ? '⚠ not secure' : '').color(r.ok ? C.green : C.red);
    };
  },
};

// ---------------------------------------------------------------------------
// sec-008: a worm spreads like an epidemic (logistic model, Slammer numbers)
// ---------------------------------------------------------------------------
const NV = 75000;
const R0 = Math.LN2 / 8.5;
export const infected = (q, t) => {
  const K = NV * (1 - q);
  const r = R0 * (1 - q);
  return K / (1 + (K - 1) * Math.exp(-r * t));
};
export const worm_spread = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 5,
  mission: 'What share of machines must be patched so that after 10 minutes fewer than 1,000 are infected?',
  goal: (t) => infected(t.q, 600) < 1000,
  params: [
    { key: 'q', label: 'Share patched', min: 0, max: 0.95, step: 0.05, value: 0 },
    { key: 't', label: 'Seconds since release', min: 0, max: 600, step: 10, value: 0 },
  ],
  beats: [
    { say: 'January 2003. One infected server starts sending copies of SQL Slammer to random addresses. About 75,000 servers are vulnerable.', set: { q: 0, t: 0 }, ms: 11000 },
    { say: 'Every 8.5 seconds the count roughly doubles. After one minute: about a hundred. Nobody has noticed yet.', set: { t: 60 }, ms: 11000 },
    { say: 'After three minutes the curve shoots up: tens of thousands of servers, and networks jam with its traffic.', set: { t: 180 }, ms: 10500, notes: [{ text: 'doubling every 8.5 s', at: [-0.6, 1.6], to: [-4.3, -0.8], color: C.red }] },
    { say: 'By ten minutes nearly every vulnerable server is infected: the curve flattens only because targets ran out. A patch had been available for six months.', set: { t: 600 }, ms: 12500 },
    { say: 'If 80% had been patched, the worm finds victims less often and fewer exist: after ten minutes about 8,000 would be infected instead of 75,000. Patching is herd immunity for computers.', set: { q: 0.8, t: 600 }, ms: 13000 },
  ],
  readout: (t) => [
    ['Infected', `${R(infected(t.q, t.t)).toLocaleString('en-US')}`],
    ['Vulnerable', `${R(NV * (1 - t.q)).toLocaleString('en-US')}`],
  ],
  setup(kit) {
    const X = (s) => -6.5 + (s / 600) * 13;
    const Yv = (n) => -3.2 + (n / NV) * 6.4;
    kit.line([[X(0), Yv(0)], [X(600), Yv(0)]], { color: C.axis, width: 1.5 });
    kit.line([[X(0), Yv(0)], [X(0), Yv(NV)]], { color: C.axis, width: 1.5 });
    [0, 120, 240, 360, 480, 600].forEach((s) => kit.label(`${s / 60} min`, [X(s), Yv(0) - 0.35], { tex: false, size: 12, color: C.grey }));
    [25000, 50000, 75000].forEach((n) => {
      kit.label(`${n / 1000}k`, [X(0) - 0.5, Yv(n)], { ...mono, size: 12, color: C.grey });
      kit.line([[X(0), Yv(n)], [X(600), Yv(n)]], { color: C.grid, width: 1, opacity: 0.6 });
    });
    const cap = kit.line([[0, 0], [1, 1]], { color: C.gold, width: 1.5, dashed: true });
    const capL = kit.label('', [0, 0], { tex: false, size: 12, color: C.gold, align: 'left' });
    const ghost = kit.line([[0, 0], [1, 1]], { color: C.red, width: 2, opacity: 0.35 });
    const curve = kit.line([[0, 0], [1, 1]], { color: C.red, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.15, color: C.white });
    const val = kit.label('', [0, 0], { ...mono, size: 15 });
    return (t) => {
      const full = [];
      const now = [];
      for (let s = 0; s <= 600; s += 5) {
        const p = [X(s), Yv(infected(t.q, s))];
        full.push(p);
        if (s <= t.t) now.push(p);
      }
      ghost.set(full);
      curve.set(now.length > 1 ? now : [full[0], full[0]]);
      const K = NV * (1 - t.q);
      cap.set([[X(0), Yv(K)], [X(600), Yv(K)]]);
      capL.set(`vulnerable: ${R(K).toLocaleString('en-US')}`).pos([X(0) + 0.2, Yv(K) + 0.3]);
      const n = infected(t.q, t.t);
      dot.set([X(t.t), Yv(n)]);
      val.set(R(n).toLocaleString('en-US')).pos([X(t.t) + (t.t > 480 ? -1.0 : 0.9), Yv(n) + 0.35]);
    };
  },
};
