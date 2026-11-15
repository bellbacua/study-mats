// Logic sandbox simulator. Our own code.
//
// Wires join grid points into "nets". Each gate reads the nets at its input
// pins and, one tick later, drives its output net. That one-tick delay is
// what lets feedback circuits (latches, flip-flops) remember, and what lets
// you watch a carry ripple through an adder in slow motion.
//
// Footprints (x grows to the right, y grows down the board):
//   2-input gate at (x, y): inputs (x-2, y-1) and (x-2, y+1), output (x, y)
//   NOT at (x, y): input (x-2, y), output (x, y)
//   switch / clock at (x, y): output (x, y)
//   lamp at (x, y): input (x, y)
//   number display at (x, y): inputs (x, y) … (x, y+3), worth 1, 2, 4, 8

export const GATES = {
  and: { label: 'AND', ins: 2, f: (a, b) => a & b, rule: 'On only if both inputs are on.' },
  or: { label: 'OR', ins: 2, f: (a, b) => a | b, rule: 'On if either input is on.' },
  not: { label: 'NOT', ins: 1, f: (a) => 1 - a, rule: 'Flips its input.' },
  nand: { label: 'NAND', ins: 2, f: (a, b) => 1 - (a & b), rule: 'AND, then flipped. Every other gate can be built from it.' },
  nor: { label: 'NOR', ins: 2, f: (a, b) => 1 - (a | b), rule: 'OR, then flipped.' },
  xor: { label: 'XOR', ins: 2, f: (a, b) => a ^ b, rule: 'On if the inputs differ.' },
};

export const LOGIC_INFO = {
  input: { label: 'Switch', hint: 'An input you flip by clicking.' },
  clock: { label: 'Clock', hint: 'Turns on and off by itself, like a heartbeat.' },
  lamp: { label: 'Lamp', hint: 'Lights when its input is on.' },
  display: { label: 'Number', hint: 'Shows four inputs as a number from 0 to 15.' },
  ...Object.fromEntries(Object.entries(GATES).map(([k, g]) => [k, { label: g.label, hint: g.rule }])),
};

import { splitWires } from './grid.js';

const key = (x, y) => `${x},${y}`;

export function pinsOf(p) {
  const [x, y] = p.at;
  if (GATES[p.type]) {
    if (GATES[p.type].ins === 1) return { ins: [[x - 2, y]], outs: [[x, y]] };
    return { ins: [[x - 2, y - 1], [x - 2, y + 1]], outs: [[x, y]] };
  }
  if (p.type === 'input' || p.type === 'clock') return { ins: [], outs: [[x, y]] };
  if (p.type === 'lamp') return { ins: [[x, y]], outs: [] };
  if (p.type === 'display') return { ins: [0, 1, 2, 3].map((k) => [x, y + k]), outs: [] };
  return { ins: [], outs: [] };
}

// Grid cells a part's body covers (used to stop parts overlapping).
export function cellsOf(p) {
  const [x, y] = p.at;
  const out = [];
  if (GATES[p.type]) {
    const h = GATES[p.type].ins === 1 ? 0 : 1;
    for (let i = x - 2; i <= x; i++) for (let j = y - h; j <= y + h; j++) out.push([i, j]);
  } else if (p.type === 'display') {
    for (let j = y; j <= y + 3; j++) out.push([x, j], [x + 1, j], [x + 2, j]);
  } else if (p.type === 'input' || p.type === 'clock') out.push([x, y], [x - 1, y]);
  else out.push([x, y], [x + 1, y]);
  return out;
}

// Build nets once per edit. Returns a compiled circuit for fast ticks.
export function compile(circuit) {
  const parent = new Map();
  const find = (k) => {
    if (!parent.has(k)) parent.set(k, k);
    let r = k;
    while (parent.get(r) !== r) r = parent.get(r);
    parent.set(k, r);
    return r;
  };
  const pins = circuit.parts.map((p) => pinsOf(p));
  const pieces = splitWires(circuit.wires, pins.flatMap((q) => [...q.ins, ...q.outs]));
  for (const w of pieces) parent.set(find(key(...w.a)), find(key(...w.b)));
  const netOf = (pt) => find(key(...pt));
  const gates = circuit.parts.map((p, i) => ({ p, ins: pins[i].ins.map(netOf), outs: pins[i].outs.map(netOf) }));
  const drivers = {};
  for (const g of gates) for (const n of g.outs) (drivers[n] ||= []).push(g.p.id);
  return { gates, netOf, drivers, pieces: pieces.map((w) => ({ w, net: netOf(w.a) })) };
}

export function createLogicState() {
  return { out: {}, ticks: 0, clockT: 0 };
}

// Net values from what every output is driving right now.
export function netValues(comp, state) {
  const vals = {};
  const clash = new Set();
  for (const g of comp.gates) {
    g.outs.forEach((n) => {
      const v = state.out[g.p.id] ?? 0;
      if (n in vals && vals[n] !== v) clash.add(n);
      vals[n] = n in vals ? vals[n] | v : v;
    });
  }
  return { vals, clash };
}

// One tick: every gate, in turn, looks at its inputs and sets its output.
// Gates update one after another (not all at once), like real gates that are
// never exactly the same speed; this lets a latch settle instead of flickering.
export function tick(comp, state) {
  const { vals } = netValues(comp, state);
  let changed = false;
  for (const g of comp.gates) {
    const t = g.p.type;
    let v;
    if (t === 'input') v = g.p.on ? 1 : 0;
    else if (GATES[t]) v = GATES[t].f(...g.ins.map((n) => vals[n] ?? 0));
    else continue;
    if ((state.out[g.p.id] ?? 0) !== v) {
      state.out[g.p.id] = v;
      changed = true;
      for (const n of g.outs) vals[n] = comp.drivers[n].some((id) => state.out[id]) ? 1 : 0;
    }
  }
  state.ticks++;
  return changed;
}

// Run until nothing changes (or give up: it may oscillate).
export function settle(comp, state, max = 200) {
  for (let i = 0; i < max; i++) if (!tick(comp, state)) return true;
  return false;
}

// What each lamp / display shows.
export function readOutputs(comp, state) {
  const { vals } = netValues(comp, state);
  const res = {};
  for (const g of comp.gates) {
    if (g.p.type === 'lamp') res[g.p.id] = vals[g.ins[0]] ?? 0;
    if (g.p.type === 'display') res[g.p.id] = g.ins.reduce((s, n, k) => s + ((vals[n] ?? 0) << k), 0);
  }
  return res;
}

// Check a challenge: steps of { inputs: {A:1,B:0}, expect: {S:1} }, applied in
// order (so latches can be tested), settling after each.
export function runTest(circuit, steps) {
  const byLabel = (type) => {
    const m = {};
    for (const p of circuit.parts) if (p.type === type && p.label) m[p.label.trim().toUpperCase()] = p;
    return m;
  };
  const ins = byLabel('input');
  const outs = byLabel('lamp');
  const need = new Set();
  for (const s of steps) {
    Object.keys(s.inputs).forEach((k) => !ins[k] && need.add(`a switch labelled ${k}`));
    Object.keys(s.expect).forEach((k) => !outs[k] && need.add(`a lamp labelled ${k}`));
  }
  if (need.size) return { ok: false, missing: [...need] };
  const parts = circuit.parts.map((p) => ({ ...p }));
  const comp = compile({ ...circuit, parts });
  const state = createLogicState();
  const rows = [];
  for (const s of steps) {
    for (const [k, v] of Object.entries(s.inputs)) parts.find((p) => p.id === ins[k].id).on = !!v;
    const calm = settle(comp, state);
    const shown = readOutputs(comp, state);
    const got = Object.fromEntries(Object.keys(s.expect).map((k) => [k, shown[outs[k].id] ?? 0]));
    rows.push({ inputs: s.inputs, expect: s.expect, got, calm, ok: calm && Object.entries(s.expect).every(([k, v]) => got[k] === v) });
  }
  return { ok: rows.every((r) => r.ok), rows };
}

// Every combination of the named inputs, with outputs from a rule.
export function truthTable(names, rule) {
  const rows = [];
  for (let m = 0; m < 1 << names.length; m++) {
    const inputs = Object.fromEntries(names.map((n, i) => [n, (m >> (names.length - 1 - i)) & 1]));
    rows.push({ inputs, expect: rule(inputs) });
  }
  return rows;
}
