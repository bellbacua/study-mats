import { C } from '../theme';
import { clamp, range } from '../kit';

const n2 = (v) => Math.round(v * 100) / 100;
const ease = (dt, rate = 5) => 1 - Math.exp(-dt * rate);

// ---------------------------------------------------------------------------
// P1. Same length, different rulers
// ---------------------------------------------------------------------------
const UNITS = {
  m: { size: 1, name: 'metre' },
  cubit: { size: 0.524, name: 'royal cubit' },
  ft: { size: 0.3048, name: 'foot' },
  hand: { size: 0.1016, name: 'hand' },
};
const OBJECTS = {
  beam: { len: 2.1, name: 'steel beam' },
  door: { len: 0.9, name: 'doorway width' },
  rod: { len: 1.05, name: 'cubit rod ×2' },
};

export const units_ruler = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.6, 3.6] },
  params: [
    {
      key: 'obj',
      label: 'Measure',
      type: 'choice',
      value: 'beam',
      options: Object.entries(OBJECTS).map(([value, o]) => ({ value, label: o.name })),
    },
    {
      key: 'unit',
      label: 'Using',
      type: 'choice',
      value: 'cubit',
      options: Object.entries(UNITS).map(([value, u]) => ({ value, label: u.name })),
    },
  ],
  beats: [
    { say: 'Lay royal cubits (52.4 cm, elbow to fingertip) end to end along the beam: just over 4 of them.', set: { obj: 'beam', unit: 'cubit' } },
    { say: 'A shorter unit gives a bigger number for the same beam: about 21 hands. The length never changed, only the ruler.', set: { obj: 'beam', unit: 'hand' } },
    { say: 'The metre (1799) was meant to be a unit for all people for all time: 2.1 metres. Engineers today work almost entirely in metric.', set: { obj: 'beam', unit: 'm' } },
  ],
  readout: (t) => {
    const L = OBJECTS[t.obj].len;
    return Object.entries(UNITS).map(([k, u]) => [`In ${u.name}s`, `${n2(L / u.size)}${k === t.unit ? '  ◀' : ''}`]);
  },
  setup(kit) {
    const S = 6; // world units per metre
    const x0 = -6.6;
    const bar = kit.rect(x0, 0.6, 1, 0.9, { color: 0x9aa4ad, opacity: 0.85, strokeColor: 0xd0d6dc, width: 2 });
    const barL = kit.label('', [0, 2.0], { tex: false, size: 16 });
    const ticks = Array.from({ length: 30 }, () => kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 2, create: false }));
    const segs = Array.from({ length: 30 }, (_, i) => kit.rect(0, 0, 0, 0.5, { color: i % 2 ? C.gold : C.yellow, opacity: 0.35, stroke: false }));
    const nums = Array.from({ length: 30 }, () => kit.label('', [0, 0], { tex: false, cls: 'tick' }));
    const count = kit.label('', [0, -2.6], { size: 26 });
    let len = 0;
    let unit = 1;
    return (_p, t, _time, dt) => {
      len += (OBJECTS[t.obj].len - len) * ease(dt, 4);
      unit += (UNITS[t.unit].size - unit) * ease(dt, 4);
      bar.set(x0, 0.6, len * S, 0.9);
      barL.set(OBJECTS[t.obj].name).pos([x0 + (len * S) / 2, 2.0]);
      const n = Math.ceil(len / unit);
      segs.forEach((s, i) => {
        const on = i < n && i < 30;
        s.visible(on);
        if (!on) return;
        const w = Math.min(unit, len - i * unit) * S;
        s.set(x0 + i * unit * S, -0.3, w, 0.5);
      });
      ticks.forEach((tk, i) => {
        const on = i <= n && i < 30;
        tk.visible(on);
        if (on) tk.set([[x0 + i * unit * S, -0.45], [x0 + i * unit * S, 0.35]]);
      });
      nums.forEach((nm, i) => {
        const on = i > 0 && i <= n && i < 30 && (unit * S > 0.5 || i % 5 === 0);
        nm.visible(on);
        if (on) nm.set(`${i}`).pos([x0 + i * unit * S, -0.75]);
      });
      count.set(`${n2(OBJECTS[t.obj].len)}\\,\\text{m} = ${n2(OBJECTS[t.obj].len / UNITS[t.unit].size)}\\ \\text{${UNITS[t.unit].name}s}`);
    };
  },
};

// ---------------------------------------------------------------------------
// P2. The law of the lever
// ---------------------------------------------------------------------------
export const lever_balance = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.8, 4.2] },
  params: [
    { key: 'm1', label: 'Left mass (kg)', min: 1, max: 10, step: 1, value: 6 },
    { key: 'd1', label: 'Left distance (m)', min: 0.5, max: 6, step: 0.5, value: 2 },
    { key: 'm2', label: 'Right mass (kg)', min: 1, max: 10, step: 1, value: 3 },
    { key: 'd2', label: 'Right distance (m)', min: 0.5, max: 6, step: 0.5, value: 2 },
  ],
  beats: [
    { say: '6 kg at 2 m against 3 kg at 2 m: the heavy side wins and the beam tips left.', set: { m1: 6, d1: 2, m2: 3, d2: 2 } },
    { say: 'Slide the 3 kg out to 4 m. Now 6 × 2 = 3 × 4: perfectly balanced. Distance makes up for weight.', set: { m1: 6, d1: 2, m2: 3, d2: 4 } },
    { say: 'With a long enough arm, 1 kg holds 6 kg. "Give me a place to stand and I will move the Earth."', set: { m1: 6, d1: 1, m2: 1, d2: 6 } },
  ],
  goal: (t) => t.m1 === 6 && t.d1 === 2 && t.m2 === 3 && t.d2 === 4,
  readout: (t) => {
    const L = t.m1 * t.d1;
    const R = t.m2 * t.d2;
    return [
      ['Left turning effect m₁d₁', `${n2(L)} kg·m`],
      ['Right turning effect m₂d₂', `${n2(R)} kg·m`],
      ['Beam', L === R ? 'balanced ✓' : L > R ? 'tips left' : 'tips right'],
    ];
  },
  setup(kit) {
    const S = 1.15;
    kit.fill([[0, -0.1], [-0.6, -1.6], [0.6, -1.6]], { color: C.grey, opacity: 0.7 });
    kit.line([[-7.5, -1.6], [7.5, -1.6]], { color: C.axis, width: 2 });
    const beam = kit.line([[-7, 0], [7, 0]], { color: 0xc8a165, width: 7, create: false });
    const ticks = range(-6, 6, 13).map(() => kit.line([[0, 0], [0, 0]], { color: C.white, width: 1, opacity: 0.4, create: false }));
    const boxes = [C.blue, C.yellow].map((c) => ({
      r: kit.rect(0, 0, 0, 0, { color: c, opacity: 0.85, strokeColor: c }),
      l: kit.label('', [0, 0], { tex: false, size: 15, color: '#101418' }),
      str: kit.line([[0, 0], [0, 0]], { color: C.white, width: 1.5, create: false }),
    }));
    const eq = kit.label('', [0, 3.6], { size: 24 });
    let ang = 0;
    return (p, t, _time, dt) => {
      const diff = p.m1 * p.d1 - p.m2 * p.d2;
      ang += (clamp(-diff * 0.03, -0.32, 0.32) - ang) * ease(dt, 3); // heavier side goes down
      const at = (x) => [x * S * Math.cos(ang), -x * S * Math.sin(ang)];
      beam.set([at(-6.3), at(6.3)]);
      ticks.forEach((tk, i) => {
        const x = -6 + i;
        const [cx, cy] = at(x);
        tk.set([[cx, cy - 0.12], [cx, cy + 0.12]]);
      });
      [[p.m1, -p.d1, t.m1], [p.m2, p.d2, t.m2]].forEach(([m, x, mt], i) => {
        const size = 0.45 + Math.sqrt(m) * 0.22;
        const [hx, hy] = at(x);
        const top = hy - 0.6;
        boxes[i].str.set([[hx, hy], [hx, top]]);
        boxes[i].r.set(hx - size / 2, top - size, size, size);
        boxes[i].l.set(`${mt} kg`).pos([hx, top - size / 2]);
      });
      const L = t.m1 * t.d1;
      const R = t.m2 * t.d2;
      eq.set(`${t.m1} \\times ${t.d1} = ${n2(L)} \\quad ${L === R ? '=' : L > R ? '>' : '<'} \\quad ${n2(R)} = ${t.m2} \\times ${t.d2}`);
    };
  },
};

// ---------------------------------------------------------------------------
// P3. Galileo's ramp: equal times, distances 1 : 3 : 5 : 7
// ---------------------------------------------------------------------------
export const galileo_ramp = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.2] },
  params: [
    { key: 'angle', label: 'Ramp angle (°)', min: 2, max: 20, step: 1, value: 10 },
    { key: 'T', label: 'Time rolling (s)', min: 0, max: 4, step: 0.1, value: 4 },
  ],
  beats: [
    { say: 'A gentle ramp slows gravity down enough to time. Mark where the ball is at the end of every second.', set: { angle: 10, T: 1 } },
    { say: 'The gaps between marks grow: 1, 3, 5, 7 units. Galileo found exactly this pattern in 1604.', set: { angle: 10, T: 4 } },
    { say: 'Make the ramp steeper and everything scales up, but the pattern stays. Total distance always grows as t².', set: { angle: 18, T: 4 } },
  ],
  goal: (t) => t.angle === 10 && t.T >= 4,
  readout: (t) => {
    const a = 9.8 * Math.sin((t.angle * Math.PI) / 180);
    const d = (s) => 0.5 * a * s * s;
    return [
      ['Acceleration down the ramp', `${n2(a)} m/s²`],
      ['Distance each second', [1, 2, 3, 4].map((s) => n2(d(s) - d(s - 1))).join(' : ') + ' m'],
      ['Ratio', '1 : 3 : 5 : 7'],
      ['Distance after T', `${n2(d(t.T))} m`],
    ];
  },
  setup(kit) {
    const L = 13; // ramp length in world units
    const top = [-6.8, 0];
    const ramp = kit.line([[0, 0], [1, 1]], { color: 0xc8a165, width: 6, create: false });
    const ground = kit.line([[-7.5, -4], [7.5, -4]], { color: C.axis, width: 2, create: false });
    void ground;
    const ball = kit.dot([0, 0], { r: 0.28, color: C.blue, z: 6 });
    const marks = [1, 2, 3, 4].map((s) => ({
      s,
      tick: kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 3, create: false }),
      l: kit.label(`${s}\\,\\text{s}`, [0, 0], { size: 14, color: C.yellow }),
      gap: kit.label('', [0, 0], { size: 15, color: C.green }),
    }));
    return (p) => {
      const th = (p.angle * Math.PI) / 180;
      const vis = Math.max(th, (4 * Math.PI) / 180) * 1.2;
      const dir = [Math.cos(vis), -Math.sin(vis)];
      const along = (u) => [top[0] + dir[0] * u, top[1] + 1.5 + dir[1] * u];
      ramp.set([along(0), along(L)]);
      const a = 9.8 * Math.sin(th);
      const maxD = 0.5 * 9.8 * Math.sin((20 * Math.PI) / 180) * 16;
      const scale = L / maxD;
      const d = (s) => 0.5 * a * s * s * scale;
      const [bx, by] = along(Math.min(d(p.T), L));
      ball.set([bx - dir[1] * 0.3, by + dir[0] * 0.3]);
      marks.forEach((m) => {
        const on = p.T >= m.s - 0.02;
        const u = d(m.s);
        const [x, y] = along(u);
        const n = [-dir[1], dir[0]];
        m.tick.set([[x - n[0] * 0.35, y - n[1] * 0.35], [x + n[0] * 0.35, y + n[1] * 0.35]]).visible(on);
        m.l.pos([x - n[0] * 0.8, y - n[1] * 0.8]).visible(on);
        const [gx, gy] = along((d(m.s) + d(m.s - 1)) / 2);
        m.gap.set(`${2 * m.s - 1}`).pos([gx + n[0] * 0.75, gy + n[1] * 0.75]).visible(on);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// P4. Push a crate: F_net = ma
// ---------------------------------------------------------------------------
export const newton_forces = {
  camera: { kind: '2d', x: [-8, 8], y: [-3.6, 4.4] },
  params: [
    { key: 'F', label: 'Your push (N)', min: 0, max: 400, step: 10, value: 200 },
    { key: 'm', label: 'Crate mass (kg)', min: 10, max: 100, step: 5, value: 50 },
    { key: 'mu', label: 'Friction coefficient μ', min: 0, max: 0.6, step: 0.05, value: 0.2 },
  ],
  beats: [
    { say: 'Push 200 N on a 50 kg crate. Friction pushes back μmg = 0.2 × 50 × 9.8 = 98 N. The net 102 N accelerates it at about 2 m/s².', set: { F: 200, m: 50, mu: 0.2 } },
    { say: 'Push exactly 98 N: forces balance, net force zero, so no acceleration. It keeps whatever speed it has (Newton’s first law).', set: { F: 98, m: 50, mu: 0.2 } },
    { say: 'Double the mass with the same push and the acceleration drops. Heavier things are harder to speed up: a = F/m.', set: { F: 200, m: 100, mu: 0.1 } },
  ],
  goal: (t) => t.m === 50 && Math.abs(t.mu - 0.2) < 1e-9 && Math.abs(t.F - 98) <= 5,
  readout: (t) => {
    const fr = t.mu * t.m * 9.8;
    const net = t.F > fr ? t.F - fr : 0;
    return [
      ['Friction μmg', `${n2(fr)} N`],
      ['Net force', `${n2(net)} N`],
      ['Acceleration a = F/m', `${n2(net / t.m)} m/s²`],
    ];
  },
  setup(kit) {
    kit.line([[-8, -1.5], [8, -1.5]], { color: C.axis, width: 3 });
    const hatch = Array.from({ length: 20 }, (_, i) => kit.line([[-8 + i * 0.85, -1.5], [-8.4 + i * 0.85, -2]], { color: C.grey, width: 1, opacity: 0.5 }));
    void hatch;
    const crate = kit.rect(0, -1.5, 2, 2, { color: 0xb07d3e, opacity: 0.9, strokeColor: 0xe0b070, width: 2 });
    const mL = kit.label('', [0, 0], { tex: false, size: 15, color: '#1a1206' });
    const push = kit.arrow([0, 0], [1, 0], { color: C.yellow, width: 4 });
    const fric = kit.arrow([0, 0], [1, 0], { color: C.red, width: 4 });
    const net = kit.arrow([0, 0], [1, 0], { color: C.green, width: 4 });
    const pushL = kit.label('', [0, 0], { size: 15, color: C.yellow });
    const fricL = kit.label('', [0, 0], { size: 15, color: C.red });
    const netL = kit.label('', [0, 0], { size: 15, color: C.green });
    const vL = kit.label('', [0, 3.8], { size: 20 });
    let x = -5;
    let v = 0;
    return (p, t, _time, dt) => {
      const fr = p.mu * p.m * 9.8;
      const fnet = p.F > fr ? p.F - fr : v > 0 ? p.F - fr : 0;
      const a = fnet / p.m;
      v = Math.max(0, v + a * dt);
      if (Math.abs(fnet) < 1 && v === 0) v = 0;
      x += v * dt * 0.6;
      if (x > 6) x = -6;
      const size = 1.2 + p.m / 100;
      crate.set(x - size / 2, -1.5, size, size);
      mL.set(`${t.m} kg`).pos([x, -1.5 + size / 2]);
      const y = -1.5 + size / 2;
      const k = 0.008;
      push.set([x - size / 2 - p.F * k - 0.1, y], [x - size / 2 - 0.1, y]).visible(p.F > 1);
      const frNow = v > 0 ? fr : Math.min(fr, p.F); // static friction only pushes back as hard as you push
      fric.set([x, -1.25], [x - frNow * k, -1.25]).visible(frNow > 1);
      net.set([x, -1.5 + size + 0.5], [x + fnet * k, -1.5 + size + 0.5]).visible(Math.abs(fnet) > 1);
      pushL.set(`F = ${t.F}\\,\\text{N}`).pos([x - size / 2 - p.F * k / 2 - 0.1, y + 0.4]);
      fricL.set(`f = ${Math.round(t.mu * t.m * 9.8)}\\,\\text{N}`).pos([x - (v > 0 ? fr : Math.min(fr, p.F)) * k / 2, -2.4]).visible(fr > 1);
      netL.set(`F_{\\text{net}} = ${Math.round(Math.max(0, t.F - t.mu * t.m * 9.8))}\\,\\text{N}`).pos([x + 0.3, -1.5 + size + 0.95]).visible(Math.abs(fnet) > 1);
      vL.set(`a = ${n2(Math.max(0, t.F - t.mu * t.m * 9.8) / t.m)}\\,\\text{m/s}^2 \\qquad v = ${n2(v)}\\,\\text{m/s}`);
    };
  },
};

// ---------------------------------------------------------------------------
// P5. Pendulum energy: PE ⇄ KE, friction → heat
// ---------------------------------------------------------------------------
export const pendulum_energy = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.4] },
  params: [
    { key: 'amp', label: 'Release angle (°)', min: 10, max: 70, step: 5, value: 45 },
    { key: 'friction', label: 'Friction', min: 0, max: 1, step: 0.05, value: 0 },
  ],
  beats: [
    { say: 'At the top of the swing all the energy is height (blue). At the bottom it is all speed (yellow). The total bar never changes.', set: { amp: 45, friction: 0 } },
    { say: 'Add friction. Each swing gets a little lower, but the lost energy shows up as heat (red). Nothing disappears.', set: { amp: 45, friction: 0.4 } },
    { say: 'Joule measured this exchange rate: 4.18 joules of work makes the heat that warms 1 g of water by 1 °C.', set: { amp: 60, friction: 0.8 } },
  ],
  goal: (t) => t.friction >= 0.3,
  readout: (t) => {
    const m = 1;
    const Lm = 1;
    const E = m * 9.8 * Lm * (1 - Math.cos((t.amp * Math.PI) / 180));
    return [
      ['Bob mass / string length', '1 kg / 1 m'],
      ['Total energy at release', `${n2(E)} J`],
      ['Highest speed (no friction)', `${n2(Math.sqrt(2 * E / m))} m/s`],
    ];
  },
  setup(kit) {
    const P = [-2.5, 3.6];
    const R = 5.2;
    kit.line([[P[0] - 1, P[1]], [P[0] + 1, P[1]]], { color: C.axis, width: 4 });
    const str = kit.line([P, P], { color: C.white, width: 2, create: false });
    const bob = kit.dot(P, { r: 0.35, color: C.gold, z: 6 });
    const trail = kit.line([P, P], { color: C.gold, width: 1, dashed: true, opacity: 0.4, create: false });
    const bars = ['PE', 'KE', 'heat'].map((name, i) => ({
      r: kit.rect(4 + i * 1.2, -3, 0.8, 0, { color: [C.blue, C.yellow, C.red][i], opacity: 0.85, stroke: false }),
      l: kit.label(name, [4.4 + i * 1.2, -3.4], { tex: false, cls: 'tick' }),
    }));
    kit.rect(3.8, -3, 3.6, 5.8, { fill: false, color: C.grid, width: 1 });
    kit.label('energy', [5.6, 3.1], { tex: false, cls: 'tick' });
    let th = 0.7;
    let w = 0;
    let E0 = 1;
    let heat = 0;
    let lastAmp = -1;
    return (p, t, _time, dt) => {
      const amp = (t.amp * Math.PI) / 180;
      if (t.amp !== lastAmp) {
        th = amp;
        w = 0;
        heat = 0;
        E0 = 1 - Math.cos(amp);
        lastAmp = t.amp;
      }
      const steps = 8;
      for (let i = 0; i < steps; i++) {
        const h = (dt * 2.2) / steps;
        const acc = -Math.sin(th) * 9.8 - p.friction * 0.6 * w;
        w += acc * h;
        th += w * h;
      }
      const pe = 1 - Math.cos(th);
      const ke = (w * w) / (2 * 9.8);
      heat = Math.max(0, E0 - pe - ke);
      const pos = [P[0] + R * Math.sin(th), P[1] - R * Math.cos(th)];
      str.set([P, pos]);
      bob.set(pos);
      trail.set(range(-amp, amp, 40).map((a) => [P[0] + R * Math.sin(a), P[1] - R * Math.cos(a)]));
      const H = 5.6;
      const total = Math.max(E0, 1e-6);
      [pe, ke, heat].forEach((e, i) => bars[i].r.set(4 + i * 1.2, -3, 0.8, (clamp(e, 0, total) / total) * H));
    };
  },
};

// ---------------------------------------------------------------------------
// P6. A simple circuit: V = IR
// ---------------------------------------------------------------------------
export const ohm_circuit = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.2, 4.4] },
  params: [
    { key: 'V', label: 'Battery voltage (V)', min: 0, max: 24, step: 1, value: 12 },
    { key: 'R', label: 'Resistance (Ω)', min: 1, max: 24, step: 1, value: 6 },
  ],
  beats: [
    { say: '12 V across 6 Ω: I = V/R = 2 A. Electrons (blue dots) drift round the loop from − to +.', set: { V: 12, R: 6 } },
    { say: 'Halve the resistance and the current doubles to 4 A. The electrons move faster and the bulb glows brighter: P = VI = 48 W.', set: { V: 12, R: 3 } },
    { say: 'Raise resistance and the current falls. A semiconductor is a material whose resistance you can tune enormously, the subject of a later class.', set: { V: 12, R: 24 } },
  ],
  goal: (t) => t.V === 12 && t.R === 4,
  readout: (t) => {
    const I = t.V / t.R;
    return [
      ['Current I = V/R', `${n2(I)} A`],
      ['Power P = VI', `${n2(t.V * I)} W`],
      ['Electrons per second', `${(I * 6.24e18).toExponential(2)}`],
    ];
  },
  setup(kit) {
    const box = [[-5, -2.5], [5, -2.5], [5, 2.5], [-5, 2.5]];
    kit.line([...box, box[0]], { color: C.gold, width: 4 });
    kit.rect(-5.5, -0.9, 1, 1.8, { color: C.bg, opacity: 1, stroke: false, z: 3 });
    kit.line([[-5.6, 0.4], [-4.4, 0.4]], { color: C.white, width: 5, create: false, z: 4 });
    kit.line([[-5.3, -0.4], [-4.7, -0.4]], { color: C.white, width: 5, create: false, z: 4 });
    kit.label('+', [-6.0, 0.6], { tex: false, size: 18 });
    kit.label('−', [-6.0, -0.6], { tex: false, size: 18 });
    const vL = kit.label('', [-6.9, 0], { size: 18, align: 'right' });
    const zig = [[-1.6, 2.5]];
    for (let i = 0; i < 8; i++) zig.push([-1.4 + i * 0.4, 2.5 + (i % 2 ? -0.35 : 0.35)]);
    zig.push([1.6, 2.5]);
    kit.rect(-1.7, 2.0, 3.4, 1, { color: C.bg, opacity: 1, stroke: false, z: 3 });
    kit.line(zig, { color: C.red, width: 3, create: false, z: 4 });
    const rL = kit.label('', [0, 3.4], { size: 18 });
    const glow = kit.dot([5, 0], { r: 1.3, color: C.yellow, opacity: 0.2, z: 3 });
    const bulb = kit.dot([5, 0], { r: 0.55, color: 0x444444, z: 4 });
    const iL = kit.label('', [0, -3.4], { size: 22, color: C.blue });
    // perimeter path for electrons
    const per = 2 * (10 + 5);
    const at = (s) => {
      s = ((s % per) + per) % per;
      if (s < 10) return [-5 + s, -2.5];
      if (s < 15) return [5, -2.5 + (s - 10)];
      if (s < 25) return [5 - (s - 15), 2.5];
      return [-5, 2.5 - (s - 25)];
    };
    const els = Array.from({ length: 40 }, (_, i) => ({ s: (i * per) / 40, d: kit.dot([0, 0], { r: 0.08, color: C.blue, z: 5 }) }));
    return (p, t, _time, dt) => {
      const I = p.V / p.R;
      els.forEach((e) => {
        e.s -= I * dt * 0.8; // electrons drift from − round to +
        e.d.set(at(e.s));
      });
      const P = p.V * I;
      const b = clamp(P / 60, 0, 1);
      glow.opacity(0.08 + 0.45 * b).scale(0.7 + b * 0.8);
      bulb.color(b > 0.02 ? C.yellow : 0x444444).opacity(0.4 + 0.6 * b);
      vL.set(`${t.V}\\,\\text{V}`);
      rL.set(`R = ${t.R}\\,\\Omega`);
      iL.set(`I = \\frac{V}{R} = \\frac{${t.V}}{${t.R}} = ${n2(t.V / t.R)}\\,\\text{A}`);
    };
  },
};
