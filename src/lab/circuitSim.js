// Circuit playground solver. Our own small nodal-analysis engine (no outside code).
//
// The board is a grid of points. Every part joins two points, a and b.
// For each part we write its current from a to b as
//     i = g * (Va - Vb) - J
// (a conductance g plus a fixed source J). Kirchhoff's current law at every
// point then gives one linear equation per point, G·V = I, which we solve by
// Gaussian elimination. This is the "nodal analysis" taught in Circuits 1.
//
//   wire / closed switch   tiny resistor (so we still know the current in it)
//   resistor, bulb         g = 1/R
//   battery (+ at b)       ideal cell E with a small internal resistance r
//   capacitor              backward-Euler step: g = C/dt, J = g·v(last step)
//   LED (anode a)          off: almost open; on: Vf in series with a small R
//
// LEDs are not linear, so we guess on/off, solve, and re-guess until the
// guess agrees with the answer (piecewise-linear diode model).

import { splitWires } from './grid.js';

export const WIRE_R = 0.01; // ohms
export const CELL_R = 0.2; // internal resistance of a battery, ohms
export const LED_R = 12; // on-resistance of an LED, ohms
export const LED_MAX = 0.04; // amps: above this for a moment, the LED burns out
const G_OPEN = 1e-9;
const G_MIN = 1e-12;

export const LED_COLORS = {
  red: { vf: 1.8, hex: 0xff3b2f, label: 'Red' },
  yellow: { vf: 2.0, hex: 0xffc531, label: 'Yellow' },
  green: { vf: 2.2, hex: 0x46e06a, label: 'Green' },
  blue: { vf: 3.0, hex: 0x3f8cff, label: 'Blue' },
};

export const PART_INFO = {
  wire: { label: 'Wire', unit: '' },
  battery: { label: 'Battery', unit: 'V', def: 9, choices: [1.5, 3, 4.5, 6, 9, 12] },
  resistor: { label: 'Resistor', unit: 'Ω', def: 330, choices: [10, 47, 100, 220, 330, 470, 1000, 2200, 4700, 10000, 47000, 100000] },
  bulb: { label: 'Bulb', unit: 'Ω', def: 30, choices: [10, 30, 60] },
  capacitor: { label: 'Capacitor', unit: 'µF', def: 1000, choices: [10, 100, 470, 1000, 2200, 4700] },
  led: { label: 'LED', unit: '', def: 'red' },
  switch: { label: 'Switch', unit: '' },
};

const key = (p) => `${p[0]},${p[1]}`;

// Solve G·x = b in place (dense, partial pivoting). Small boards only.
function solve(G, b) {
  const n = b.length;
  for (let c = 0; c < n; c++) {
    let piv = c;
    let best = Math.abs(G[c][c]);
    for (let r = c + 1; r < n; r++) {
      const v = Math.abs(G[r][c]);
      if (v > best) {
        best = v;
        piv = r;
      }
    }
    if (best < 1e-30) continue;
    if (piv !== c) {
      [G[c], G[piv]] = [G[piv], G[c]];
      [b[c], b[piv]] = [b[piv], b[c]];
    }
    const row = G[c];
    const inv = 1 / row[c];
    for (let r = c + 1; r < n; r++) {
      const f = G[r][c] * inv;
      if (f === 0) continue;
      const rr = G[r];
      for (let k = c; k < n; k++) rr[k] -= f * row[k];
      b[r] -= f * b[c];
    }
  }
  const x = Array.from({ length: n }, () => 0);
  for (let r = n - 1; r >= 0; r--) {
    let s = b[r];
    const row = G[r];
    for (let k = r + 1; k < n; k++) s -= row[k] * x[k];
    x[r] = Math.abs(row[r]) < 1e-30 ? 0 : s / row[r];
  }
  return x;
}

// Cut wires at junctions so each piece has its own current (for the moving dots).
export function prepare(circuit) {
  const others = circuit.parts.filter((p) => p.type !== 'wire');
  const wires = circuit.parts.filter((p) => p.type === 'wire');
  const pins = others.flatMap((p) => [p.a, p.b]);
  return { parts: [...others, ...splitWires(wires, pins).map((w) => ({ ...w, type: 'wire' }))] };
}

// A circuit is { parts: [{ id, type, a:[x,y], b:[x,y], value, on, color, broken }] }.
// `state` carries what must survive between steps: capacitor voltages, LED
// guesses and how long an LED has been over its limit.
export function createState() {
  return { cap: {}, led: {}, over: {}, time: 0 };
}

// Advance the circuit by dt seconds. Returns per-part and per-point results.
export function step(circuit, state, dt = 0.01) {
  const parts = circuit.parts.filter((p) => !(p.type === 'switch' && !p.on));
  // points used by any part
  const idx = new Map();
  for (const p of parts) {
    for (const end of [p.a, p.b]) if (!idx.has(key(end))) idx.set(key(end), idx.size);
  }
  const n = idx.size;
  const res = { parts: {}, volts: {}, warnings: [], time: state.time };
  if (!n) return res;

  // connected groups, each with its own 0 V reference (a battery's − end if it has one)
  const parent = [...Array(n).keys()];
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (const p of parts) parent[find(idx.get(key(p.a)))] = find(idx.get(key(p.b)));
  const ref = new Map();
  for (const p of parts) if (p.type === 'battery') {
    const r = find(idx.get(key(p.a)));
    if (!ref.has(r)) ref.set(r, idx.get(key(p.a)));
  }
  for (let i = 0; i < n; i++) if (!ref.has(find(i))) ref.set(find(i), i);
  const isRef = new Set(ref.values());

  const ledOn = (p) => !p.broken && (state.led[p.id] ?? false);
  const law = (p) => {
    // returns [g, J] for i(a→b) = g(Va − Vb) − J
    switch (p.type) {
      case 'wire':
      case 'switch':
        return [1 / WIRE_R, 0];
      case 'resistor':
      case 'bulb':
        return [1 / Math.max(p.value, 1e-3), 0];
      case 'battery': {
        // + at b: i(a→b) inside the cell = g(Va − Vb) + gE
        const g = 1 / CELL_R;
        return [g, -g * p.value];
      }
      case 'capacitor': {
        const g = (p.value * 1e-6) / dt;
        return [g, g * (state.cap[p.id] || 0)];
      }
      case 'led': {
        if (!ledOn(p)) return [G_OPEN, 0];
        const g = 1 / LED_R;
        return [g, g * (LED_COLORS[p.color]?.vf ?? 2)];
      }
      default:
        return [G_OPEN, 0];
    }
  };

  let V = Array.from({ length: n }, () => 0);
  const leds = parts.filter((p) => p.type === 'led' && !p.broken);
  for (let iter = 0; iter < 40; iter++) {
    const G = Array.from({ length: n }, () => new Float64Array(n));
    const I = new Float64Array(n);
    for (let i = 0; i < n; i++) G[i][i] += G_MIN;
    for (const p of parts) {
      const a = idx.get(key(p.a));
      const b = idx.get(key(p.b));
      if (a === b) continue;
      const [g, J] = law(p);
      G[a][a] += g;
      G[b][b] += g;
      G[a][b] -= g;
      G[b][a] -= g;
      I[a] += J;
      I[b] -= J;
    }
    // pin reference points to 0 V
    for (const r of isRef) {
      G[r].fill(0);
      G[r][r] = 1;
      I[r] = 0;
    }
    V = solve(G, Array.from(I));
    // re-guess LEDs
    let changed = false;
    for (const p of leds) {
      const v = V[idx.get(key(p.a))] - V[idx.get(key(p.b))];
      const vf = LED_COLORS[p.color]?.vf ?? 2;
      const on = ledOn(p);
      const want = on ? v > vf - 1e-6 : v > vf + 1e-6;
      if (want !== on) {
        state.led[p.id] = want;
        changed = true;
      }
    }
    if (!changed) break;
  }

  for (const [k, i] of idx) res.volts[k] = V[i];
  let batteryAmps = 0;
  for (const p of parts) {
    const va = V[idx.get(key(p.a))];
    const vb = V[idx.get(key(p.b))];
    const [g, J] = law(p);
    const v = va - vb;
    const i = g * v - J;
    res.parts[p.id] = { v, i, power: Math.abs(v * i) };
    if (p.type === 'capacitor') state.cap[p.id] = v;
    if (p.type === 'battery') {
      res.parts[p.id].v = vb - va; // show the battery's own terminal voltage
      batteryAmps = Math.max(batteryAmps, Math.abs(i));
      if (Math.abs(i) > 5) res.warnings.push({ kind: 'short', id: p.id });
    }
    if (p.type === 'led') {
      res.parts[p.id].lit = ledOn(p) && i > 0.0005;
      if (i > LED_MAX) {
        state.over[p.id] = (state.over[p.id] || 0) + dt;
        if (state.over[p.id] > 0.15) res.warnings.push({ kind: 'burn', id: p.id });
      } else state.over[p.id] = 0;
    }
  }
  for (const p of circuit.parts) if (p.type === 'switch' && !p.on) res.parts[p.id] = { v: 0, i: 0, power: 0 };
  state.time += dt;
  res.time = state.time;
  res.batteryAmps = batteryAmps;
  return res;
}

// Pretty numbers with SI prefixes: 0.0123 A → "12.3 mA".
export function si(x, unit, digits = 3) {
  const a = Math.abs(x);
  if (a < 1e-9) return `0 ${unit}`;
  const pre = [
    [1e6, 'M'],
    [1e3, 'k'],
    [1, ''],
    [1e-3, 'm'],
    [1e-6, 'µ'],
    [1e-9, 'n'],
  ];
  for (const [f, s] of pre) {
    if (a >= f * 0.9995) return `${Number((x / f).toPrecision(digits))} ${s}${unit}`;
  }
  return `${Number((x / 1e-9).toPrecision(digits))} n${unit}`;
}

// The four-band colour code printed on real resistors (IEC 60062).
export const BAND_HEX = [0x1a1a1a, 0x7a4a24, 0xd8342a, 0xf08a1c, 0xf2d22e, 0x3aa84b, 0x2f6fd6, 0x8a4fc6, 0x8a8a8a, 0xf4f4f4];
export const BAND_NAMES = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export function resistorBands(ohms) {
  const exp = Math.floor(Math.log10(ohms)) - 1;
  const two = Math.round(ohms / 10 ** exp);
  const d1 = Math.floor(two / 10) % 10;
  const d2 = two % 10;
  return [d1, d2, Math.max(0, Math.min(9, exp))];
}
