// Story scenes for the Electronics classes (ee-100 to ee-117, ece-201 to
// ece-204). Each plays as a short narrated story: beats set the controls, and
// `hidden` params drive reveals. Touching a control switches to `free` values.
import { C } from '../theme';
import { clamp, range } from '../kit';

const ease = (dt, rate = 3) => 1 - Math.exp(-dt * rate);
const R = Math.round;
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const sig = (v, d = 3) => (v === 0 ? '0' : `${Number(v.toPrecision(d))}`.replace('-', '−'));
const T = { tex: false };
const choice = (key, label, value, opts) => ({ key, label, type: 'choice', value, options: opts.map(([v, l]) => ({ value: v, label: l })) });
function show(o, a) {
  const v = clamp(a, 0, 1);
  o.opacity?.(v);
  o.visible(v > 0.01);
}
// A plain circle outline (for rings, lamps and dials).
const ring = (cx, cy, r, n = 64) => range(0, 2 * Math.PI, n).map((a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]);

// ---------------------------------------------------------------------------
// ee-100: current through a body
// ---------------------------------------------------------------------------
const SKIN = { dry: 100, damp: 10, wet: 1 }; // kΩ
const bodyMA = (t) => t.V / SKIN[t.skin];
export const body_current = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Find a case where 230 V is only felt, not dangerous. Then make it deadly, and switch on the RCD.',
  goal: (t, seen) => !!seen.skin?.has('dry') && t.V === 230 && t.skin === 'wet' && t.rcd === 1,
  params: [
    { key: 'V', label: 'Voltage (V)', type: 'choice', value: 12, options: [12, 50, 120, 230].map((v) => ({ value: v, label: `${v} V` })) },
    choice('skin', 'Skin', 'dry', [['dry', 'Dry (100 kΩ)'], ['damp', 'Damp (10 kΩ)'], ['wet', 'Wet (1 kΩ)']]),
    choice('rcd', 'Safety switch (RCD)', 0, [[0, 'Off'], [1, 'On']]),
  ],
  beats: [
    { say: 'A person grips a wire at 12 volts with dry hands. Dry skin is about 100 kilohms, so the current is a tiny 0.12 milliamps. Not even felt.', set: { V: 12, skin: 'dry', rcd: 0 }, ms: 11000 },
    { say: 'Now 230 volts from a wall outlet, still with dry skin: 2.3 milliamps. A clear tingle, but usually not dangerous.', set: { V: 230 }, ms: 10000 },
    { say: 'Wet the skin and its resistance falls to about 1 kilohm. The same 230 volts now pushes 230 milliamps: far past the let-go level, deep into the zone that stops hearts.', set: { skin: 'wet' }, ms: 12000, notes: [{ text: 'heart danger', at: [5.4, 3.7], to: [4.6, 2.4], color: C.red }] },
    { say: 'Switch on a residual-current device. It sees 230 milliamps leaving on the live wire that never comes back on the neutral, and cuts the power in about 30 milliseconds.', set: { rcd: 1 }, ms: 12500 },
    { say: 'Remember: it is the current that hurts, and resistance decides the current. Water and bare feet make any voltage more dangerous.', set: { V: 120, skin: 'damp', rcd: 0 }, ms: 10000 },
  ],
  readout: (t) => {
    const mA = bodyMA(t);
    const tripped = t.rcd === 1 && mA > 30;
    return [
      ['Current', `${sig(mA)} mA`],
      ['Effect', tripped ? 'RCD trips in ~30 ms' : mA < 1 ? 'not felt' : mA < 10 ? 'felt, painful' : mA < 50 ? 'cannot let go' : 'heart danger'],
    ];
  },
  setup(kit) {
    // a stick figure holding a wire
    kit.line(ring(-4.5, 2.2, 0.55), { color: C.white, width: 2.5, create: false });
    kit.line([[-4.5, 1.65], [-4.5, -1.0]], { color: C.white, width: 2.5 });
    kit.line([[-4.5, 0.9], [-3.0, 1.4]], { color: C.white, width: 2.5 });
    kit.line([[-4.5, 0.9], [-5.6, 0.0]], { color: C.white, width: 2.5 });
    kit.line([[-4.5, -1.0], [-3.8, -3.0]], { color: C.white, width: 2.5 });
    kit.line([[-4.5, -1.0], [-5.2, -3.0]], { color: C.white, width: 2.5 });
    kit.line([[-7.5, -3.05], [-1.5, -3.05]], { color: C.grey, width: 2 });
    kit.label('ground', [-2.2, -3.4], { ...T, size: 12, color: C.grey });
    kit.line([[-3.0, 1.4], [-1.0, 1.4], [-1.0, 3.4]], { color: C.gold, width: 4 });
    const vLab = kit.label('', [-0.2, 3.8], { ...T, size: 16, color: C.gold });
    const skinLab = kit.label('', [-4.5, -3.9], { ...T, size: 14, color: C.teal });
    const dots = Array.from({ length: 10 }, () => kit.dot([0, 0], { r: 0.09, color: C.yellow }));
    const path = [[-3.0, 1.4], [-4.5, 0.9], [-4.5, -1.0], [-3.8, -3.0]];
    const seg = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]));
    const total = seg.reduce((a, b) => a + b, 0);
    const at = (u) => {
      let d = u * total;
      for (let i = 0; i < seg.length; i++) {
        if (d <= seg[i]) return [path[i][0] + ((path[i + 1][0] - path[i][0]) * d) / seg[i], path[i][1] + ((path[i + 1][1] - path[i][1]) * d) / seg[i]];
        d -= seg[i];
      }
      return path[path.length - 1];
    };
    // log scale of current, 0.1 mA to 1000 mA
    const X = 4.6;
    const Y = (mA) => -3.2 + ((Math.log10(clamp(mA, 0.1, 1000)) + 1) / 4) * 6.4;
    const bands = [
      [0.1, 1, C.green, 'not felt'],
      [1, 10, C.yellow, 'felt, painful'],
      [10, 50, C.gold, 'cannot let go'],
      [50, 1000, C.red, 'heart danger'],
    ];
    for (const [a, b, col, name] of bands) {
      kit.rect(X - 0.4, Y(a), 0.8, Y(b) - Y(a), { color: col, opacity: 0.35, stroke: false });
      kit.label(name, [X + 0.6, (Y(a) + Y(b)) / 2], { ...T, size: 13, color: col, align: 'left' });
    }
    for (const v of [0.1, 1, 10, 100, 1000]) kit.label(`${v} mA`, [X - 0.6, Y(v)], { ...T, size: 11, color: C.grey, align: 'right' });
    kit.label('current through the body', [X, 3.9], { ...T, size: 13, color: C.grey });
    const mark = kit.arrow([X - 2.0, 0], [X - 0.45, 0], { color: C.white });
    const trip = kit.label('RCD tripped', [-1.0, -1.2], { ...T, size: 20, color: C.green });
    let shownMA = 0.1;
    return (p, t, time, dt) => {
      const mA = bodyMA(t);
      const tripped = t.rcd === 1 && mA > 30;
      const target = tripped ? 0.1 : mA;
      shownMA *= Math.pow(target / shownMA, ease(dt, 3));
      mark.set([X - 2.0, Y(shownMA)], [X - 0.45, Y(shownMA)]);
      vLab.set(`${t.V} V`);
      skinLab.set(`${t.skin} skin: ${SKIN[t.skin]} kΩ`);
      show(trip, tripped ? 1 : 0);
      const speed = tripped ? 0 : 0.05 + 0.25 * clamp(Math.log10(mA + 1) / 2.5, 0, 1);
      dots.forEach((d, i) => {
        d.set(at(((time * speed + i / dots.length) % 1 + 1) % 1));
        d.visible(!tripped && mA > 0.5);
        d.opacity(clamp(Math.log10(mA + 1) / 2.4, 0.25, 1));
      });
    };
  },
};

// ---------------------------------------------------------------------------
// ee-101: Coulomb's law
// ---------------------------------------------------------------------------
const coul = (t) => (8.99e9 * t.q1 * 1e-6 * t.q2 * 1e-6) / (t.r * t.r);
export const coulomb_force = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Drag the right charge until the force is exactly a quarter of what it is at 1 m.',
  goal: (t) => Math.abs(t.r - 2) < 0.06 && t.q1 * t.q2 !== 0,
  params: [
    { key: 'q1', label: 'Left charge q₁ (μC)', min: -5, max: 5, step: 1, value: 2 },
    { key: 'q2', label: 'Right charge q₂ (μC)', min: -5, max: 5, step: 1, value: 2 },
    { key: 'r', label: 'Distance r (m)', min: 0.5, max: 5, step: 0.05, value: 1 },
  ],
  beats: [
    { say: 'Two positive charges of 2 microcoulombs, 1 metre apart. Like charges repel: each is pushed away from the other with 0.036 newtons.', set: { q1: 2, q2: 2, r: 1 }, ms: 11000 },
    { say: 'Double the distance to 2 metres. The force does not halve: it falls to a quarter, 0.009 newtons. That is Coulomb’s inverse square law.', set: { r: 2 }, ms: 11500, notes: [{ text: '¼ the force', at: [3.5, 3.4], to: [2.2, 0.8], color: C.gold }] },
    { say: 'Three times as far, 3 metres: one ninth of the original force.', set: { r: 3 }, ms: 9000 },
    { say: 'Make the right charge negative. Now the arrows flip: unlike charges attract.', set: { q2: -2, r: 1.5 }, ms: 10000 },
    { say: 'Double one charge and the force doubles. The force grows with the product q₁ × q₂.', set: { q1: 4, r: 1.5 }, ms: 10000 },
  ],
  readout: (t) => {
    const F = coul(t);
    return [
      ['Force', `${sig(Math.abs(F))} N`],
      ['Type', F > 0 ? 'repel' : F < 0 ? 'attract' : 'none'],
    ];
  },
  setup(kit) {
    const S = 2.2; // world units per metre
    kit.line([[-7.5, -2.6], [7.5, -2.6]], { color: C.grey, width: 1.5 });
    const ticks = range(0, 5, 6).map((m) => kit.label(`${m} m`, [0, -3.0], { ...T, size: 11, color: C.grey }));
    const a = kit.dot([0, 0], { r: 0.4 });
    const al = kit.label('', [0, 0], { ...T, size: 18, color: C.bg });
    const h = kit.handle([0, 0], { onDrag: ([x]) => ({ r: clamp((x - -5.5) / S, 0.5, 5) }), color: C.blue });
    const bl = kit.label('', [0, 0], { ...T, size: 18, color: C.bg });
    const fa = kit.arrow([0, 0], [1, 0], { color: C.yellow });
    const fb = kit.arrow([0, 0], [1, 0], { color: C.yellow });
    const rl = kit.label('', [0, -1.9], { ...T, size: 16 });
    const span = kit.line([[0, -1.4], [1, -1.4]], { color: C.grey, width: 1.5, create: false });
    return (p) => {
      const xa = -5.5;
      const xb = xa + p.r * S;
      a.set([xa, 0]).color(p.q1 >= 0 ? C.red : C.blue).scale(0.6 + Math.abs(p.q1) * 0.12);
      h.set([xb, 0]).color(p.q2 >= 0 ? C.red : C.blue);
      al.set(p.q1 > 0 ? '+' : p.q1 < 0 ? '−' : '0').pos([xa, 0]);
      bl.set(R(p.q2) > 0 ? '+' : R(p.q2) < 0 ? '−' : '0').pos([xb, 0.75]).color(C.text);
      const F = (8.99e9 * p.q1 * 1e-6 * p.q2 * 1e-6) / (p.r * p.r);
      const len = clamp(Math.sign(F) * Math.log10(1 + Math.abs(F) * 300) * 1.3, -3, 3);
      fa.set([xa - 0.45 * Math.sign(F || 1), 0], [xa - 0.45 * Math.sign(F || 1) - len, 0]).visible(Math.abs(F) > 1e-6);
      fb.set([xb + 0.45 * Math.sign(F || 1), 0], [xb + 0.45 * Math.sign(F || 1) + len, 0]).visible(Math.abs(F) > 1e-6);
      span.set([[xa, -1.4], [xb, -1.4]]);
      rl.set(`r = ${r2(p.r)} m`).pos([(xa + xb) / 2, -1.85]);
      ticks.forEach((l, i) => l.pos([xa + i * S, -3.0]));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-102: field lines and equipotentials
// ---------------------------------------------------------------------------
function fieldAt(x, y, charges) {
  let ex = 0;
  let ey = 0;
  let v = 0;
  for (const c of charges) {
    const dx = x - c.x;
    const dy = y - c.y;
    const r2_ = dx * dx + dy * dy + 0.02;
    const r = Math.sqrt(r2_);
    ex += (c.q * dx) / (r2_ * r);
    ey += (c.q * dy) / (r2_ * r);
    v += c.q / r;
  }
  return { ex, ey, v };
}
function traceLine(x, y, charges, dir, perp = false, steps = 260, h = 0.06) {
  const pts = [[x, y]];
  for (let i = 0; i < steps; i++) {
    const { ex, ey } = fieldAt(x, y, charges);
    const m = Math.hypot(ex, ey) || 1;
    const ux = perp ? -ey / m : ex / m;
    const uy = perp ? ex / m : ey / m;
    x += dir * h * ux;
    y += dir * h * uy;
    if (Math.abs(x) > 8.5 || Math.abs(y) > 5) break;
    if (!perp && charges.some((c) => Math.hypot(x - c.x, y - c.y) < 0.25)) break;
    pts.push([x, y]);
    if (perp && i > 20 && Math.hypot(x - pts[0][0], y - pts[0][1]) < h * 1.2) break;
  }
  return pts;
}
const SETS = {
  one: [{ x: 0, y: 0, q: 1 }],
  pair: [{ x: -2.2, y: 0, q: 1 }, { x: 2.2, y: 0, q: -1 }],
};
export const field_voltage = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'With the + and − pair, find a spot where the voltage is zero but the field is not.',
  goal: (t) => t.set === 'pair' && Math.abs(fieldAt(t.x, t.y, SETS.pair).v) < 0.03,
  params: [
    choice('set', 'Charges', 'one', [['one', 'One + charge'], ['pair', '+ and − pair']]),
    { key: 'x', label: 'Test charge x', min: -7, max: 7, step: 0.1, value: 3 },
    { key: 'y', label: 'Test charge y', min: -4, max: 4, step: 0.1, value: 1.5 },
    { key: 'eq', hidden: true, value: 1 },
  ],
  free: { eq: 1 },
  beats: [
    { say: 'One positive charge. Faraday imagined lines of force streaming out of it: they show which way a small + test charge would be pushed.', set: { set: 'one', x: 3, y: 1.5, eq: 0 }, ms: 11500 },
    { say: 'Where the lines crowd together the field is strong; far away they spread out and the push is weak. The field falls as 1 over r squared.', set: { x: 1.4, y: 0.6 }, ms: 10500 },
    { say: 'Now the dashed rings: equipotentials, lines of equal voltage. Moving a charge along one costs no energy, like walking around a hill on one contour line.', set: { eq: 1, x: 3, y: 1.5 }, ms: 12000, notes: [{ text: 'equal voltage', at: [5.6, 3.6], to: [3.4, 2.4], color: C.teal }] },
    { say: 'A plus and a minus charge. Lines leave the plus and end on the minus, and every equipotential crosses the field lines at right angles.', set: { set: 'pair', x: 0, y: 2.5 }, ms: 12500 },
    { say: 'Halfway between them the voltage is zero, yet the field is strong and points from + to −. Voltage and field are different things: height versus slope.', set: { x: 0, y: 0 }, ms: 12000 },
  ],
  readout: (t) => {
    const f = fieldAt(t.x, t.y, SETS[t.set]);
    return [
      ['Voltage (relative)', r2(f.v)],
      ['Field strength (relative)', r2(Math.hypot(f.ex, f.ey))],
    ];
  },
  setup(kit) {
    const lines = Array.from({ length: 16 }, () => kit.line([[0, 0], [0.1, 0]], { color: C.blue, width: 1.6, create: false }));
    const eqs = Array.from({ length: 8 }, () => kit.line([[0, 0], [0.1, 0]], { color: C.teal, width: 1.4, dashed: true, create: false }));
    const qs = [0, 1].map(() => ({ d: kit.dot([0, 0], { r: 0.28 }), l: kit.label('', [0, 0], { ...T, size: 18, color: C.bg }) }));
    const h = kit.handle([3, 1.5], { onDrag: ([x, y]) => ({ x: clamp(x, -7, 7), y: clamp(y, -4, 4) }), color: C.yellow });
    const ea = kit.arrow([0, 0], [1, 0], { color: C.yellow });
    let drawn = '';
    return (p, t) => {
      const ch = SETS[t.set];
      if (drawn !== t.set) {
        drawn = t.set;
        const src = ch[0];
        lines.forEach((l, i) => {
          const a = (2 * Math.PI * i) / lines.length + 0.1;
          l.set(traceLine(src.x + 0.3 * Math.cos(a), src.y + 0.3 * Math.sin(a), ch, 1));
        });
        const starts = t.set === 'one' ? [0.8, 1.4, 2.2, 3.2].map((r) => [r, 0]) : [-3.6, -2.9, -1.4, -0.7, 0.7, 1.4, 2.9, 3.6].map((x) => [x, 0]);
        eqs.forEach((l, i) => {
          const s = starts[i];
          if (!s) return l.visible(false);
          const up = traceLine(s[0], s[1], ch, 1, true, 400, 0.05);
          const down = traceLine(s[0], s[1], ch, -1, true, 400, 0.05);
          l.set([...down.reverse(), ...up]).visible(true);
        });
        qs.forEach((q, i) => {
          const c = ch[i];
          q.d.visible(!!c);
          q.l.visible(!!c);
          if (c) {
            q.d.set([c.x, c.y]).color(c.q > 0 ? C.red : C.blue);
            q.l.set(c.q > 0 ? '+' : '−').pos([c.x, c.y]);
          }
        });
      }
      eqs.forEach((l) => l.opacity(clamp(p.eq, 0, 1)));
      h.set([p.x, p.y]);
      const f = fieldAt(p.x, p.y, ch);
      const m = Math.hypot(f.ex, f.ey);
      const len = clamp(0.6 + Math.log10(1 + m * 8), 0.3, 2.2);
      ea.set([p.x, p.y], [p.x + (f.ex / (m || 1)) * len, p.y + (f.ey / (m || 1)) * len]).visible(m > 1e-4);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-103: charging a capacitor through a resistor
// ---------------------------------------------------------------------------
export const rc_charge = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Choose R and C so the capacitor reaches 63% at exactly 3 seconds.',
  goal: (t) => Math.abs(t.R * t.C - 3000) < 1,
  params: [
    { key: 'R', label: 'Resistance R (kΩ)', min: 1, max: 10, step: 1, value: 2 },
    { key: 'C', label: 'Capacitance C (μF)', min: 100, max: 1000, step: 50, value: 500 },
    { key: 'tau', hidden: true, value: 0 },
  ],
  free: { tau: 1 },
  beats: [
    { say: 'Close the switch: a 10 volt battery charges a capacitor through a resistor. At first the voltage shoots up, then it slows as the capacitor fills and pushes back.', set: { R: 2, C: 500, tau: 0 }, ms: 12000 },
    { say: 'The time constant is R times C. Here 2 kilohms times 500 microfarads is 1 second. After one time constant the capacitor is at 63%.', set: { tau: 1 }, ms: 11500, notes: [{ text: '63% at t = RC', at: [-1.0, 3.6], to: [-3.3, 1.5], color: C.gold }] },
    { say: 'Double the resistance. The curve keeps exactly the same shape, just stretched: now τ is 2 seconds.', set: { R: 4 }, ms: 10500 },
    { say: 'After five time constants it is over 99% full. In practice, that counts as charged.', set: { R: 2, C: 1000 }, ms: 10000 },
    { say: 'A camera flash, a blinking light or the reset of a chip: they all time themselves on this one curve.', set: { R: 1, C: 300 }, ms: 9000 },
  ],
  readout: (t) => [
    ['τ = RC', `${r2((t.R * t.C) / 1000)} s`],
    ['Full (5τ)', `${r2((5 * t.R * t.C) / 1000)} s`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 10, 1], y: [0, 10, 2], sx: 1.3, sy: 0.62, origin: [-6.5, -3.4], xLabel: 't\\ (\\text{s})', yLabel: 'v_C\\ (\\text{V})' });
    kit.line([P.toW(0, 10), P.toW(10, 10)], { color: C.grey, width: 1, dashed: true });
    const curve = kit.curve(() => 0, [0, 10], { plane: P, color: C.blue, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    const tauV = kit.line([[0, 0], [0, 1]], { color: C.gold, width: 1.5, dashed: true, create: false });
    const tauH = kit.line([[0, 0], [0, 1]], { color: C.gold, width: 1.5, dashed: true, create: false });
    const tauL = kit.label('', [0, 0], { ...T, size: 14, color: C.gold });
    return (p, t, time) => {
      const tau = (p.R * p.C) / 1000;
      curve.set((x) => 10 * (1 - Math.exp(-x / tau)));
      const tt = (time * 1.2) % 11;
      const tc = Math.min(tt, 10);
      dot.set(P.toW(tc, 10 * (1 - Math.exp(-tc / tau))));
      const a = clamp(p.tau, 0, 1);
      const show63 = tau <= 10;
      tauV.set([P.toW(Math.min(tau, 10), 0), P.toW(Math.min(tau, 10), 6.32)]).opacity(a).visible(a > 0.01 && show63);
      tauH.set([P.toW(0, 6.32), P.toW(Math.min(tau, 10), 6.32)]).opacity(a).visible(a > 0.01 && show63);
      tauL.set(`τ = ${r2(tau)} s, 6.3 V`).pos(P.toW(Math.min(tau, 10) + 0.2, 5.6)).opacity(a).visible(a > 0.01 && show63);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-104: compass needles around a wire, and the force on a wire
// ---------------------------------------------------------------------------
export const wire_field = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Reverse the current and make the needles circle the other way. Then switch to the motor view and push the wire down.',
  goal: (t, seen) => t.view === 'motor' && t.I < -2 && !!seen.view?.has('wire'),
  params: [
    { key: 'I', label: 'Current I (A), + is out of the screen', min: -10, max: 10, step: 0.5, value: 0 },
    choice('view', 'View', 'wire', [['wire', 'Compasses around a wire'], ['motor', 'Wire in a magnet']]),
  ],
  beats: [
    { say: 'A wire comes straight out of the screen, with compasses around it. With no current, every needle points north, along Earth’s field.', set: { I: 0, view: 'wire' }, ms: 10500 },
    { say: 'Switch on a current, coming out toward you. Just as Ørsted saw in 1820, the needles swing: they start to circle the wire.', set: { I: 4 }, ms: 10500 },
    { say: 'Stronger current: the circling wins, especially close to the wire, where the field μ₀I over 2πr is strongest.', set: { I: 10 }, ms: 10000, notes: [{ text: 'B = μ₀I / 2πr', at: [5.0, 3.6], to: [1.8, 1.4], color: C.gold }] },
    { say: 'Reverse the current and they circle the other way. The right-hand rule: thumb along the current, fingers curl with the field.', set: { I: -10 }, ms: 10500 },
    { say: 'Now put a wire across a magnet’s field, which points into the screen. A current pushes the wire sideways with force BIL. That push drives every motor.', set: { view: 'motor', I: 6 }, ms: 12000 },
    { say: 'Reverse the current and the push reverses. Faraday’s 1821 motor spun because of exactly this force.', set: { I: -6 }, ms: 9500 },
  ],
  readout: (t) => [
    ['Current', `${r1(t.I)} A`],
    [t.view === 'wire' ? 'Field 1 cm away' : 'Force on 10 cm in 0.5 T', t.view === 'wire' ? `${r1(Math.abs(t.I) * 20)} μT` : `${r2(Math.abs(0.5 * t.I * 0.1))} N`],
  ],
  setup(kit) {
    const wireG = kit.group();
    const motorG = kit.group();
    kit.line(ring(0, 0, 0.35), { color: C.gold, width: 2.5, create: false, parent: wireG });
    const sym = kit.label('', [0, 0], { ...T, size: 20, color: C.gold, parent: wireG });
    const needles = [];
    for (const r of [1.2, 2.3, 3.4]) {
      const n = Math.round(r * 4);
      for (let i = 0; i < n; i++) {
        const a = (2 * Math.PI * i) / n;
        const c = [r * Math.cos(a) * 1.25, r * Math.sin(a)];
        kit.line(ring(c[0], c[1], 0.34, 24), { color: C.grey, width: 1, create: false, parent: wireG });
        needles.push({ c, r, a, n: kit.arrow([c[0], c[1] - 0.25], [c[0], c[1] + 0.25], { color: C.red, head: 0.14, parent: wireG }) });
      }
    }
    // motor view: field into the screen (×), a wire across it
    for (let x = -6; x <= 6; x += 1.5) for (let y = -2.5; y <= 2.5; y += 1.25) kit.label('×', [x, y], { ...T, size: 14, color: C.blue, parent: motorG });
    kit.label('B into the screen', [-5.6, 3.6], { ...T, size: 13, color: C.blue, parent: motorG });
    const wire = kit.line([[-7, 0], [7, 0]], { color: C.gold, width: 5, create: false, parent: motorG });
    const cur = kit.arrow([-1, 0.5], [1, 0.5], { color: C.gold, parent: motorG });
    const force = kit.arrow([0, 0], [0, 1], { color: C.yellow, parent: motorG });
    const fl = kit.label('F = BIL', [0.6, 2.4], { ...T, size: 15, color: C.yellow, parent: motorG });
    let off = 0;
    return (p, t, time, dt) => {
      const wv = t.view === 'wire';
      wireG.visible = wv;
      motorG.visible = !wv;
      sym.set(p.I > 0.2 ? '•' : p.I < -0.2 ? '×' : '');
      for (const nd of needles) {
        // Earth's field north (+y) plus the wire's field, tangent (anticlockwise for + current)
        const bw = (p.I * 0.9) / nd.r;
        const bx = -Math.sin(nd.a) * bw;
        const by = 1 + Math.cos(nd.a) * bw;
        const m = Math.hypot(bx, by) || 1;
        const ux = (bx / m) * 0.27;
        const uy = (by / m) * 0.27;
        nd.n.set([nd.c[0] - ux, nd.c[1] - uy], [nd.c[0] + ux, nd.c[1] + uy]);
      }
      off += (p.I * 0.12 - off) * ease(dt, 2);
      const y = clamp(off, -2, 2) + Math.sin(time * 6) * 0.02 * Math.abs(p.I);
      wire.set([[-7, y], [7, y]]);
      cur.set([-1 * Math.sign(p.I || 1), y + 0.45], [1 * Math.sign(p.I || 1), y + 0.45]).visible(Math.abs(p.I) > 0.2);
      const fl_ = clamp(p.I * 0.3, -2.5, 2.5);
      force.set([3, y], [3, y + fl_]).visible(Math.abs(p.I) > 0.2);
      fl.pos([3.9, y + fl_ / 2]);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-105: current in a coil, and the switch-off spike
// ---------------------------------------------------------------------------
const rlI = (t, L, Rr, ton, diode) => {
  const tau = L / Rr;
  const I0 = 10 / Rr;
  if (t < ton) return I0 * (1 - Math.exp(-t / tau));
  const Ion = I0 * (1 - Math.exp(-ton / tau));
  const tauOff = diode ? tau : tau / 40;
  return Ion * Math.exp(-(t - ton) / tauOff);
};
export const rl_current = {
  camera: { kind: '2d', x: [-8.9, 8.9], y: [-5, 5] }, // a little extra room so edge labels are not cut off
  ease: 3,
  mission: 'Find settings where the current never quite reaches its final value before the switch opens.',
  goal: (t) => (t.L / t.R) * 1000 > 120,
  params: [
    { key: 'L', label: 'Inductance L (H)', min: 0.5, max: 5, step: 0.5, value: 2 },
    { key: 'R', label: 'Resistance R (Ω)', min: 10, max: 100, step: 5, value: 50 },
    choice('diode', 'Flyback diode', 0, [[0, 'None'], [1, 'Fitted']]),
  ],
  beats: [
    { say: 'A 10 volt battery, a 50 ohm resistor and a 2 henry coil. Close the switch: the current does not jump, it climbs. The coil fights the change.', set: { L: 2, R: 50, diode: 0 }, ms: 12000 },
    { say: 'The climb has the same shape as a charging capacitor, with time constant L over R: here 40 milliseconds.', set: {}, ms: 9500, notes: [{ text: 'τ = L / R', at: [-3.5, 3.6], to: [-4.6, 1.9], color: C.gold }] },
    { say: 'At 200 milliseconds the switch opens. The current collapses in an instant, and the coil’s voltage L times di over dt leaps to a huge spike. That is Joseph Henry’s spark.', set: {}, ms: 12500, notes: [{ text: 'spike!', at: [2.6, -0.6], to: [0.2, -2.6], color: C.red }] },
    { say: 'Fit a diode across the coil. Now the current has a loop to keep flowing in, and dies away gently. No spike, no burnt switch.', set: { diode: 1 }, ms: 11500 },
    { say: 'A bigger coil, a longer time constant: 100 milliseconds. Car ignition coils use the spike on purpose, to make the spark that fires the fuel.', set: { L: 5, diode: 0 }, ms: 11000 },
  ],
  readout: (t) => [
    ['τ = L/R', `${r1((t.L / t.R) * 1000)} ms`],
    ['Final current', `${r1(1000 * (10 / t.R))} mA`],
    ['Energy stored', `${r2(0.5 * t.L * (10 / t.R) ** 2 * 1000)} mJ`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 0.4, 0.1], y: [0, 1, 0.25], sx: 32, sy: 2.3, origin: [-6.4, 0.6], numbers: false, yLabel: 'i', xLabel: '' });
    const Q = kit.plane({ x: [0, 0.4, 0.1], y: [-1, 1, 0.5], sx: 32, sy: 1.5, origin: [-6.4, -2.8], numbers: false, yLabel: 'v_L' });
    for (const ms of [0, 100, 200, 300, 400]) kit.label(`${ms} ms`, [P.toW(ms / 1000, 0)[0], -4.4], { ...T, size: 11, color: C.grey });
    kit.line([P.toW(0.2, 0), P.toW(0.2, 1)], { color: C.grey, width: 1, dashed: true });
    kit.label('switch opens', [P.toW(0.2, 1)[0], 3.3], { ...T, size: 12, color: C.grey });
    const iC = kit.curve(() => 0, [0, 0.4], { plane: P, color: C.blue, width: 3, samples: 400 });
    const vC = kit.curve(() => 0, [0, 0.4], { plane: Q, color: C.red, width: 2.5, samples: 800 });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    const fin = kit.label('', [0, 0], { ...T, size: 13, color: C.blue, align: 'left' });
    return (p, t, time) => {
      const I0 = 10 / p.R;
      const imax = 0.2; // A, top of the plot
      iC.set((x) => rlI(x, p.L, p.R, 0.2, t.diode === 1) / imax);
      const tau = p.L / p.R;
      vC.set((x) => {
        if (x < 0.2) return Math.exp(-x / tau);
        const ion = I0 * (1 - Math.exp(-0.2 / tau));
        const tOff = t.diode === 1 ? tau : tau / 40;
        // after opening: v = −(R_loop) i; without the diode the loop resistance is huge
        return Math.max(-1, -((ion * (t.diode === 1 ? p.R : p.R * 40)) / 10) * Math.exp(-(x - 0.2) / tOff));
      });
      const tc = (time * 0.12) % 0.45;
      const tt = Math.min(tc, 0.4);
      dot.set(P.toW(tt, Math.min(1, rlI(tt, p.L, p.R, 0.2, t.diode === 1) / imax)));
      fin.set(`V/R = ${r1(I0 * 1000)} mA`).pos(P.toW(0.01, Math.min(1, I0 / imax) + 0.12));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-106: Thévenin equivalent and maximum power transfer
// ---------------------------------------------------------------------------
const VTH = 6;
const RTH = 3;
const PL = (rl) => (VTH * VTH * rl) / (RTH + rl) ** 2;
export const thevenin_equiv = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Find the load that takes the most power. Then find a different load that takes exactly 2 W.',
  goal: (t, seen) => !!seen.RL && Math.abs(PL(t.RL) - 2) < 0.06,
  params: [
    { key: 'RL', label: 'Load resistance R_L (Ω)', min: 0.5, max: 20, step: 0.5, value: 6 },
    { key: 'squash', hidden: true, value: 0 },
  ],
  free: { squash: 1 },
  beats: [
    { say: 'A 12 volt battery feeds two 6 ohm resistors. We want to know what any load connected across the lower one will get.', set: { squash: 0, RL: 6 }, ms: 11000 },
    { say: 'Thévenin’s trick. With nothing connected, the terminals sit at 6 volts. Switch the battery off and look in: the two 6 ohms are in parallel, 3 ohms. So the whole thing acts like 6 volts behind 3 ohms.', set: { squash: 1 }, ms: 14000, notes: [{ text: 'V_th = 6 V, R_th = 3 Ω', at: [-4.6, -3.9], to: [-4.6, -2.4], color: C.gold }] },
    { say: 'Now sweep the load. A tiny load draws lots of current but has almost no voltage across it: little power.', set: { RL: 0.5 }, ms: 10000 },
    { say: 'A huge load has the voltage but almost no current: again little power.', set: { RL: 20 }, ms: 9000 },
    { say: 'The peak is when the load equals R_th, 3 ohms: 3 watts, and half the power is lost inside the source. Jacobi found this rule around 1840.', set: { RL: 3 }, ms: 12000, notes: [{ text: 'peak at R_L = R_th', at: [4.8, 3.8], to: [0.9, 2.7], color: C.gold }] },
  ],
  readout: (t) => [
    ['Load current', `${r2(VTH / (RTH + t.RL))} A`],
    ['Load power', `${r2(PL(t.RL))} W`],
    ['Efficiency', `${R((100 * t.RL) / (RTH + t.RL))}%`],
  ],
  setup(kit) {
    // left: the circuit as two boxes
    const big = kit.label('12 V   6 Ω   6 Ω', [-4.6, 2.6], { ...T, size: 20, color: C.text });
    const small = kit.label('6 V behind 3 Ω', [-4.6, -1.4], { ...T, size: 22, color: C.gold });
    const box1 = kit.rect(-7.4, 1.6, 5.6, 2.0, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 });
    const box2 = kit.rect(-7.0, -2.3, 4.8, 1.8, { color: 0x1a2433, opacity: 1, strokeColor: C.gold, width: 2 });
    const arr = kit.arrow([-4.6, 1.4], [-4.6, -0.3], { color: C.gold });
    const P = kit.plane({ x: [0, 20, 5], y: [0, 3.5, 1], sx: 0.33, sy: 1.6, origin: [0.6, -3.0], xLabel: 'R_L\\ (\\Omega)', yLabel: 'P\\ (\\text{W})' });
    kit.curve(PL, [0, 20], { plane: P, color: C.blue, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.yellow });
    const h = kit.handle([0, 0], { onDrag: ([x]) => ({ RL: clamp(Math.round(((x - 0.6) / 0.33) * 2) / 2, 0.5, 20) }), color: C.yellow });
    return (p) => {
      const a = clamp(p.squash, 0, 1);
      show(small, a);
      show(arr, a);
      box2.opacity(a).visible(a > 0.01);
      big.opacity(1 - 0.5 * a);
      box1.opacity(1 - 0.5 * a);
      const w = P.toW(p.RL, PL(p.RL));
      dot.set(w);
      h.set(w);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-107: a galvanometer as an ammeter or voltmeter
// ---------------------------------------------------------------------------
const MODES = {
  raw: { fs: 1, unit: 'mA', add: 'the bare 1 mA, 100 Ω movement', colour: C.grey },
  amm: { fs: 1, unit: 'A', add: 'with a 0.1 Ω shunt in parallel', colour: C.teal },
  volt: { fs: 10, unit: 'V', add: 'with 9.9 kΩ in series', colour: C.gold },
};
export const meter_shunt = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Make the meter read 7.5 V.',
  goal: (t) => t.mode === 'volt' && Math.abs(t.x - 0.75) < 0.011,
  params: [
    choice('mode', 'Meter', 'raw', [['raw', 'Bare movement'], ['amm', 'Ammeter (shunt)'], ['volt', 'Voltmeter (multiplier)']]),
    { key: 'x', label: 'Fraction of full scale', min: 0, max: 1, step: 0.01, value: 0.5 },
  ],
  beats: [
    { say: 'A moving-coil meter: a light coil between magnet poles, held by a spring. 1 milliamp through it swings the needle all the way across.', set: { mode: 'raw', x: 1 }, ms: 11000 },
    { say: 'Half a milliamp, half way. The swing is proportional to the current, because the force on the coil is B I L.', set: { x: 0.5 }, ms: 9500 },
    { say: 'Add a tiny 0.1 ohm shunt in parallel. Now almost all the current bypasses the coil, and full scale means 1 amp: an ammeter, wired in series.', set: { mode: 'amm', x: 0.3 }, ms: 12000 },
    { say: 'Instead, add 9.9 kilohms in series. Full scale now takes 10 volts across the whole thing: a voltmeter, wired in parallel.', set: { mode: 'volt', x: 0.62 }, ms: 11500 },
    { say: 'One movement, three instruments. Macadie’s 1923 AVOmeter put them all in one box with a switch.', set: { x: 0.9 }, ms: 9000 },
  ],
  readout: (t) => [
    ['Reading', `${r2(t.x * MODES[t.mode].fs)} ${MODES[t.mode].unit}`],
    ['Current in the coil', `${r2(t.x)} mA`],
  ],
  setup(kit) {
    const cx = 0;
    const cy = -1.6;
    const Rd = 4.2;
    const A0 = Math.PI * 0.85;
    const A1 = Math.PI * 0.15;
    const ang = (f) => A0 + (A1 - A0) * f;
    kit.line(range(A1, A0, 60).map((a) => [cx + Rd * Math.cos(a), cy + Rd * Math.sin(a)]), { color: C.white, width: 2, create: false });
    const nums = range(0, 1, 6).map((f) => {
      const a = ang(f);
      kit.line([[cx + (Rd - 0.3) * Math.cos(a), cy + (Rd - 0.3) * Math.sin(a)], [cx + Rd * Math.cos(a), cy + Rd * Math.sin(a)]], { color: C.white, width: 2 });
      return kit.label('', [cx + (Rd + 0.45) * Math.cos(a), cy + (Rd + 0.45) * Math.sin(a)], { ...T, size: 13, color: C.grey });
    });
    const needle = kit.line([[cx, cy], [cx, cy + Rd]], { color: C.red, width: 3, create: false });
    kit.dot([cx, cy], { r: 0.18, color: C.white });
    const unit = kit.label('', [cx, cy + 1.4], { ...T, size: 24 });
    const add = kit.label('', [cx, -3.9], { ...T, size: 15 });
    return (p, t) => {
      const m = MODES[t.mode];
      nums.forEach((l, i) => l.set(`${r2((i / 5) * m.fs)}`));
      const a = ang(clamp(p.x, 0, 1));
      needle.set([[cx, cy], [cx + (Rd - 0.4) * Math.cos(a), cy + (Rd - 0.4) * Math.sin(a)]]);
      unit.set(m.unit).color(m.colour);
      add.set(m.add).color(m.colour);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-108: ringing and resonance in an RLC circuit
// ---------------------------------------------------------------------------
const Lr = 0.01;
const Cr = 1e-6;
const F0 = 1 / (2 * Math.PI * Math.sqrt(Lr * Cr));
const ringV = (t, Rr) => {
  const a = Rr / (2 * Lr);
  const w0 = 1 / Math.sqrt(Lr * Cr);
  if (a < w0) {
    const wd = Math.sqrt(w0 * w0 - a * a);
    return Math.exp(-a * t) * (Math.cos(wd * t) + (a / wd) * Math.sin(wd * t));
  }
  const s = Math.sqrt(a * a - w0 * w0);
  const r1_ = -a + s;
  const r2_ = -a - s;
  return (r2_ * Math.exp(r1_ * t) - r1_ * Math.exp(r2_ * t)) / (r2_ - r1_);
};
const respI = (f, Rr) => {
  const w = 2 * Math.PI * f;
  const X = w * Lr - 1 / (w * Cr);
  return 1 / Math.sqrt(Rr * Rr + X * X);
};
export const rlc_ring = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Find the resistance where the circuit just stops ringing (critical damping).',
  goal: (t) => t.mode === 'ring' && Math.abs(t.R - 200) <= 5,
  params: [
    choice('mode', 'View', 'ring', [['ring', 'Ringing after release'], ['drive', 'Driven: sweep frequency']]),
    { key: 'R', label: 'Resistance R (Ω)', min: 0, max: 400, step: 5, value: 10 },
  ],
  beats: [
    { say: 'A capacitor charged to 1 volt is connected to a 10 millihenry coil. Its voltage swings back and forth: the energy sloshes between capacitor and coil, about 1600 times a second.', set: { mode: 'ring', R: 0 }, ms: 13000 },
    { say: 'Add 10 ohms of resistance. Each swing loses a little energy as heat, and the ringing dies away, like a pendulum in air.', set: { R: 10 }, ms: 10500 },
    { say: 'At 200 ohms it just fails to swing at all: critical damping. Above that it creeps back slowly.', set: { R: 200 }, ms: 10500, notes: [{ text: 'no overshoot', at: [3.6, 3.4], to: [-3.6, 0.8], color: C.gold }] },
    { say: 'Now drive the circuit with a sine wave and sweep the frequency. At 1592 hertz the coil and capacitor cancel and the current peaks: resonance.', set: { mode: 'drive', R: 10 }, ms: 12000 },
    { say: 'Less resistance, a taller, narrower peak: a higher Q. That is how a radio picks one station out of many.', set: { R: 3 }, ms: 10000 },
  ],
  readout: (t) => [
    ['Natural frequency', `${R(F0)} Hz`],
    ['Q factor', t.R > 0 ? r1(Math.sqrt(Lr / Cr) / t.R) : '∞'],
  ],
  setup(kit) {
    const ringG = kit.group();
    const driveG = kit.group();
    const P = kit.plane({ x: [0, 5, 1], y: [-1, 1, 0.5], sx: 2.35, sy: 2.6, origin: [-6.6, 0.2], xLabel: 't\\ (\\text{ms})', yLabel: 'v_C', parent: ringG });
    const rc = kit.curve(() => 0, [0, 5], { plane: P, color: C.blue, width: 2.5, samples: 500, parent: ringG });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow, parent: ringG });
    const eC = kit.rect(5.8, -3.6, 0.7, 1, { color: C.blue, opacity: 0.8, stroke: false, parent: ringG });
    const eL = kit.rect(6.8, -3.6, 0.7, 1, { color: C.red, opacity: 0.8, stroke: false, parent: ringG });
    kit.label('C', [6.15, -3.95], { ...T, size: 12, color: C.blue, parent: ringG });
    kit.label('L', [7.15, -3.95], { ...T, size: 12, color: C.red, parent: ringG });
    kit.label('energy', [6.65, -1.3], { ...T, size: 12, color: C.grey, parent: ringG });
    const Q = kit.plane({ x: [0, 4, 1], y: [0, 1.05, 0.25], sx: 3.2, sy: 6.6, origin: [-6.4, -3.4], numbers: false, xLabel: 'f\\ (\\text{kHz})', yLabel: '|I|', parent: driveG });
    for (const k of [0, 1, 2, 3, 4]) kit.label(`${k}`, [Q.toW(k, 0)[0], -3.75], { ...T, size: 11, color: C.grey, parent: driveG });
    const dc = kit.curve(() => 0, [0.05, 4], { plane: Q, color: C.blue, width: 2.5, samples: 600, parent: driveG });
    kit.line([Q.toW(F0 / 1000, 0), Q.toW(F0 / 1000, 1.02)], { color: C.gold, width: 1, dashed: true, parent: driveG });
    kit.label('f₀', [Q.toW(F0 / 1000, 1.02)[0] + 0.3, 3.6], { ...T, size: 14, color: C.gold, parent: driveG });
    return (p, t, time) => {
      ringG.visible = t.mode === 'ring';
      driveG.visible = t.mode === 'drive';
      rc.set((ms) => ringV(ms / 1000, p.R));
      const ms = (time * 0.6) % 5;
      const v = ringV(ms / 1000, p.R);
      dot.set(P.toW(ms, v));
      // energies: capacitor ½Cv², coil the rest of what is left
      const env = ringV(0, p.R);
      const tot = Math.max(v * v, Math.exp((-p.R / Lr) * (ms / 1000)) * env * env);
      eC.set(5.8, -3.6, 0.7, 2.2 * v * v);
      eL.set(6.8, -3.6, 0.7, 2.2 * Math.max(0, tot - v * v));
      dc.set((k) => Math.min(1.05, respI(k * 1000, Math.max(p.R, 1)) * 3));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-109: phasors
// ---------------------------------------------------------------------------
const LOADS = { R: [0, 'resistor: in step'], L: [-90, 'coil: current lags 90°'], C: [90, 'capacitor: current leads 90°'], RL: [-53, 'motor (R + L): lags 53°'] };
export const phasor_spin = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Find the load where the current peaks a quarter cycle before the voltage.',
  goal: (t) => t.load === 'C',
  params: [choice('load', 'Load', 'R', Object.entries(LOADS).map(([k, v]) => [k, v[1].split(':')[0]])), { key: 'trace', hidden: true, value: 1 }],
  free: { trace: 1 },
  beats: [
    { say: 'A spinning arrow. Its height traces a sine wave as it turns, once per cycle, 60 times a second on Philippine mains. That arrow is a phasor.', set: { load: 'R', trace: 1 }, ms: 12000 },
    { say: 'Across a resistor, the current arrow points the same way as the voltage arrow: they rise and fall together.', set: { load: 'R' }, ms: 10000 },
    { say: 'Across a coil, the current arrow trails a quarter turn behind. The coil resists change, so the current peaks a quarter cycle late.', set: { load: 'L' }, ms: 11500, notes: [{ text: 'lags 90°', at: [-5.8, 3.8], to: [-4.3, 1.2], color: C.red }] },
    { say: 'Across a capacitor it runs a quarter turn ahead. Steinmetz’s idea: treat these arrows as complex numbers, and AC becomes arithmetic.', set: { load: 'C' }, ms: 12000 },
    { say: 'A real motor is resistance plus inductance: the current lags by an angle in between, here 53 degrees. The cosine of that angle is the power factor.', set: { load: 'RL' }, ms: 12000 },
  ],
  readout: (t) => [
    ['Current vs voltage', `${LOADS[t.load][0] > 0 ? '+' : ''}${LOADS[t.load][0]}°`],
    ['Power factor', r2(Math.cos((LOADS[t.load][0] * Math.PI) / 180))],
  ],
  setup(kit) {
    const cx = -4.6;
    const cy = 0;
    kit.line(ring(cx, cy, 2.4), { color: C.grid, width: 1.5, create: false });
    kit.line([[cx - 2.8, cy], [cx + 2.8, cy]], { color: C.axis, width: 1.2 });
    kit.line([[cx, cy - 2.8], [cx, cy + 2.8]], { color: C.axis, width: 1.2 });
    const vA = kit.arrow([cx, cy], [cx + 2.4, cy], { color: C.yellow });
    const iA = kit.arrow([cx, cy], [cx + 1.6, cy], { color: C.blue });
    const P = kit.plane({ x: [0, 4 * Math.PI, Math.PI], y: [-1.2, 1.2, 1], sx: 0.62, sy: 2.0, origin: [-1.0, 0], numbers: false });
    const vW = kit.curve(() => 0, [0, 4 * Math.PI], { plane: P, color: C.yellow, width: 2.5 });
    const iW = kit.curve(() => 0, [0, 4 * Math.PI], { plane: P, color: C.blue, width: 2.5 });
    const vDot = kit.dot([0, 0], { r: 0.1, color: C.yellow });
    const iDot = kit.dot([0, 0], { r: 0.1, color: C.blue });
    const vLink = kit.line([[0, 0], [1, 0]], { color: C.yellow, width: 1, dashed: true, create: false });
    kit.label('voltage', [7.0, 3.3], { ...T, size: 14, color: C.yellow });
    kit.label('current', [7.0, 2.8], { ...T, size: 14, color: C.blue });
    const what = kit.label('', [cx, -3.4], { ...T, size: 15 });
    let ph = 0;
    return (p, t, time, dt) => {
      const target = (LOADS[t.load][0] * Math.PI) / 180;
      ph += (target - ph) * ease(dt, 3);
      const th = time * 1.2;
      vA.set([cx, cy], [cx + 2.4 * Math.cos(th), cy + 2.4 * Math.sin(th)]);
      iA.set([cx, cy], [cx + 1.6 * Math.cos(th + ph), cy + 1.6 * Math.sin(th + ph)]);
      // waves: newest point at the left, older to the right
      vW.set((x) => Math.sin(th - x));
      iW.set((x) => 0.67 * Math.sin(th + ph - x));
      vDot.set(P.toW(0, Math.sin(th)));
      iDot.set(P.toW(0, 0.67 * Math.sin(th + ph)));
      vLink.set([[cx + 2.4 * Math.cos(th), cy + 2.4 * Math.sin(th)], P.toW(0, Math.sin(th))]);
      what.set(LOADS[t.load][1]);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-110: an RC low-pass filter and its Bode plot
// ---------------------------------------------------------------------------
const FC = 1000;
const lpG = (f) => 1 / Math.sqrt(1 + (f / FC) ** 2);
export const lowpass_bode = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Find the frequency where the output is down to one tenth (−20 dB).',
  goal: (t) => Math.abs(20 * Math.log10(lpG(10 ** t.lf)) + 20) < 0.6,
  params: [{ key: 'lf', label: 'Frequency (10^x Hz)', min: 1, max: 5, step: 0.05, value: 2 }],
  beats: [
    { say: 'A sine wave goes into an RC low-pass filter with its cutoff at 1 kilohertz. At 100 hertz, almost all of it comes out: the capacitor barely conducts.', set: { lf: 2 }, ms: 11500 },
    { say: 'At the cutoff, 1 kilohertz, the output is 70.7% of the input and lags by 45 degrees. On the Bode plot that is minus 3 decibels.', set: { lf: 3 }, ms: 11500, notes: [{ text: '−3 dB', at: [3.0, -0.9], to: [0.9, -1.45], color: C.gold }] },
    { say: 'At 10 kilohertz, ten times the cutoff, the output is down to a tenth: minus 20 decibels.', set: { lf: 4 }, ms: 10500 },
    { say: 'Every further decade costs another 20 decibels. The Bode plot becomes a straight sloping line, as Hendrik Bode noticed.', set: { lf: 5 }, ms: 10500 },
  ],
  readout: (t) => {
    const f = 10 ** t.lf;
    return [
      ['Frequency', f >= 1000 ? `${sig(f / 1000)} kHz` : `${sig(f)} Hz`],
      ['Output / input', r2(lpG(f))],
      ['Gain', `${r1(20 * Math.log10(lpG(f)))} dB`],
    ];
  },
  setup(kit) {
    const W = kit.plane({ x: [0, 4 * Math.PI, Math.PI], y: [-1.2, 1.2, 1], sx: 1.05, sy: 1.25, origin: [-6.6, 2.4], numbers: false });
    const inW = kit.curve(() => 0, [0, 4 * Math.PI], { plane: W, color: C.grey, width: 1.5, dashed: true });
    const outW = kit.curve(() => 0, [0, 4 * Math.PI], { plane: W, color: C.blue, width: 3 });
    kit.label('in', [7.2, 3.6], { ...T, size: 13, color: C.grey });
    kit.label('out', [7.2, 3.1], { ...T, size: 13, color: C.blue });
    const B = kit.plane({ x: [1, 5, 1], y: [-40, 5, 10], sx: 3.2, sy: 0.07, origin: [-9.6, -1.2], numbers: false, axisAt: [1, 0] });
    for (const k of [1, 2, 3, 4, 5]) kit.label(['10 Hz', '100 Hz', '1 kHz', '10 kHz', '100 kHz'][k - 1], [B.toW(k, -40)[0], -4.25], { ...T, size: 11, color: C.grey });
    for (const d of [0, -20, -40]) kit.label(`${d} dB`, [B.toW(1, d)[0] - 0.2, B.toW(1, d)[1]], { ...T, size: 11, color: C.grey, align: 'right' });
    kit.curve((x) => 20 * Math.log10(lpG(10 ** x)), [1, 5], { plane: B, color: C.teal, width: 2.5 });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    return (p, t, time) => {
      const f = 10 ** p.lf;
      const g = lpG(f);
      const ph = -Math.atan(f / FC);
      const th = time * 2;
      inW.set((x) => Math.sin(x - th));
      outW.set((x) => g * Math.sin(x - th + ph));
      dot.set(B.toW(p.lf, 20 * Math.log10(g)));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-111: an electromagnetic wave
// ---------------------------------------------------------------------------
export const em_wave = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Make the wavelength exactly half of what it is at the start.',
  goal: (t) => Math.abs(t.f - 2) < 0.03,
  params: [{ key: 'f', label: 'Frequency (relative)', min: 0.5, max: 4, step: 0.1, value: 1 }, { key: 'b', hidden: true, value: 1 }],
  free: { b: 1 },
  beats: [
    { say: 'An electric field, swinging up and down, travelling to the right. On its own it would not last.', set: { f: 1, b: 0 }, ms: 9500 },
    { say: 'But a changing electric field makes a magnetic field, Maxwell’s new term. And a changing magnetic field makes an electric field, Faraday’s law. Each keeps the other going.', set: { b: 1 }, ms: 13000, notes: [{ text: 'E and B at right angles', at: [4.2, 3.7], to: [1.4, 1.8], color: C.blue }] },
    { say: 'The pair travels at 1 over the square root of mu-zero epsilon-zero: 300 million metres per second. The speed of light.', set: {}, ms: 11000 },
    { say: 'Double the frequency and the wavelength halves, since lambda equals c over f. Radio, Wi-Fi, light and X-rays are all this same wave.', set: { f: 2 }, ms: 11500 },
  ],
  readout: (t) => [
    ['Wavelength', `${r2(4 / t.f)} units`],
    ['Speed', 'c = 3.00 × 10⁸ m/s'],
  ],
  setup(kit) {
    kit.line([[-7.5, 0], [7.5, 0]], { color: C.axis, width: 1.5 });
    const eW = kit.line([[0, 0], [1, 0]], { color: C.yellow, width: 3, create: false });
    const bW = kit.line([[0, 0], [1, 0]], { color: C.blue, width: 3, create: false });
    const eStems = Array.from({ length: 30 }, () => kit.line([[0, 0], [0, 1]], { color: C.yellow, width: 1, create: false }));
    const bStems = Array.from({ length: 30 }, () => kit.line([[0, 0], [0, 1]], { color: C.blue, width: 1, create: false }));
    kit.label('E', [-7.4, 2.9], { ...T, size: 18, color: C.yellow });
    const bl = kit.label('B', [-6.3, -1.6], { ...T, size: 18, color: C.blue });
    const lam = kit.line([[0, 0], [1, 0]], { color: C.gold, width: 1.5, create: false });
    const laml = kit.label('λ', [0, 0], { ...T, size: 18, color: C.gold });
    return (p, t, time) => {
      const k = (2 * Math.PI * p.f) / 4;
      const ph = time * 2.2 * p.f;
      const xs = range(-7.5, 7.5, 240);
      eW.set(xs.map((x) => [x, 2.4 * Math.sin(k * x - ph)]));
      // B drawn "flat", sloping into the screen: an oblique axis
      bW.set(xs.map((x) => { const s = Math.sin(k * x - ph); return [x + 0.9 * s, -0.9 * s]; }));
      eStems.forEach((l, i) => { const x = -7.5 + (i * 15) / 29; l.set([[x, 0], [x, 2.4 * Math.sin(k * x - ph)]]); });
      bStems.forEach((l, i) => { const x = -7.5 + (i * 15) / 29; const s = Math.sin(k * x - ph); l.set([[x, 0], [x + 0.9 * s, -0.9 * s]]); });
      const b = clamp(p.b, 0, 1);
      [bW, ...bStems].forEach((l) => l.opacity(b).visible(b > 0.01));
      show(bl, b);
      const L = 4 / p.f;
      lam.set([[-6, 3.4], [-6 + L, 3.4]]);
      laml.pos([-6 + L / 2, 3.8]);
    };
  },
};

// ---------------------------------------------------------------------------
// ee-112: a dipole antenna and the inverse-square law
// ---------------------------------------------------------------------------
export const dipole_antenna = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Move the receiver until it gets one ninth of the power it gets at 1 km.',
  goal: (t) => Math.abs(t.r - 3) < 0.06,
  params: [{ key: 'r', label: 'Receiver distance (km)', min: 1, max: 6, step: 0.1, value: 1 }],
  beats: [
    { say: 'Current sloshes up and down a half-wave dipole antenna, and rings of field spread out from it at the speed of light.', set: { r: 1 }, ms: 11000 },
    { say: 'A receiver 1 kilometre away catches some of the power. Call it 100%.', set: { r: 1 }, ms: 8000 },
    { say: 'At 2 kilometres the same power is spread over a sphere with four times the area: only 25% per square metre.', set: { r: 2 }, ms: 10500, notes: [{ text: '¼ at twice the distance', at: [3.8, 3.8], to: [1.6, 2.2], color: C.gold }] },
    { say: 'At 3 kilometres, one ninth. That inverse square law is why stations need power and receivers need sensitive amplifiers. Marconi still got a signal across the Atlantic in 1901.', set: { r: 3 }, ms: 13000 },
  ],
  readout: (t) => [
    ['Distance', `${r1(t.r)} km`],
    ['Power per m² (vs 1 km)', `${r1(100 / (t.r * t.r))}%`],
  ],
  setup(kit) {
    const ax = -6.5;
    kit.line([[ax, 0.15], [ax, 2.2]], { color: C.gold, width: 4 });
    kit.line([[ax, -0.15], [ax, -2.2]], { color: C.gold, width: 4 });
    const cur = [kit.arrow([ax + 0.3, 0], [ax + 0.3, 1], { color: C.yellow, head: 0.18 }), kit.arrow([ax + 0.3, 0], [ax + 0.3, -1], { color: C.yellow, head: 0.18 })];
    const waves = Array.from({ length: 7 }, () => kit.line([[0, 0], [1, 0]], { color: C.blue, width: 2, create: false }));
    const rx = kit.handle([0, 0], { onDrag: ([x]) => ({ r: clamp((x - ax) / 2.2, 1, 6) }), color: C.green });
    const bar = kit.rect(6.6, -3.6, 0.8, 1, { color: C.green, opacity: 0.8, stroke: false });
    kit.rect(6.6, -3.6, 0.8, 6.2, { fill: false, strokeColor: C.grey, width: 1.5 });
    kit.label('received', [7.0, 3.0], { ...T, size: 12, color: C.grey });
    const dl = kit.label('', [0, -1.0], { ...T, size: 14, color: C.green });
    return (p, t, time) => {
      const s = Math.sin(time * 3);
      cur[0].set([ax + 0.35, -0.9 * s], [ax + 0.35, 0.9 * s]);
      cur[1].visible(false);
      waves.forEach((w, i) => {
        const rad = ((time * 1.3 + i * 2.1) % 14.7) + 0.3;
        // a dipole radiates most sideways and nothing along its own axis
        const pts = range(-Math.PI / 2, Math.PI / 2, 60).map((a) => [ax + rad * Math.cos(a) * 1.0, rad * Math.sin(a) * 0.62]);
        w.set(pts).opacity(clamp(1 - rad / 14, 0, 1) * 0.8);
      });
      const x = ax + p.r * 2.2;
      rx.set([x, 0]);
      dl.set(`${r1(p.r)} km`).pos([x, -0.7]);
      bar.set(6.6, -3.6, 0.8, (6.2 * 1) / (p.r * p.r));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-113: poles on the s-plane and the response in time
// ---------------------------------------------------------------------------
export const s_plane = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Drag the pole to make a response that rings at 2 rad/s and dies away. Then make it unstable.',
  goal: (t, seen) => !!seen.sg && t.sg > 0.05,
  params: [
    { key: 'sg', label: 'Real part σ', min: -2, max: 0.6, step: 0.05, value: -1 },
    { key: 'om', label: 'Imaginary part ω', min: 0, max: 4, step: 0.1, value: 0 },
  ],
  beats: [
    { say: 'Each pole of a transfer function is a point on the s-plane. A pole at s equals minus 1 means the response contains e to the minus t: a smooth decay, like RC charging.', set: { sg: -1, om: 0 }, ms: 12500 },
    { say: 'Move the pole further left, to minus 2: the response dies faster. Distance to the left is the decay rate.', set: { sg: -2 }, ms: 10000 },
    { say: 'Move the pair up and down, off the axis, to minus 0.3 plus and minus 2j. Now the response rings at 2 radians per second as it decays: an RLC circuit.', set: { sg: -0.3, om: 2 }, ms: 12500 },
    { say: 'On the imaginary axis, it rings forever: an oscillator.', set: { sg: 0 }, ms: 9000 },
    { say: 'Cross into the right half and the response grows without limit. A pole there means an unstable circuit, the howl of a microphone too close to its speaker.', set: { sg: 0.3 }, ms: 12000, notes: [{ text: 'unstable side', at: [-1.4, 3.8], to: [-2.6, 2.6], color: C.red }] },
  ],
  readout: (t) => [
    ['Poles', t.om > 0.05 ? `${r2(t.sg)} ± ${r2(t.om)}j` : `${r2(t.sg)}`],
    ['Behaviour', t.sg > 0.02 ? 'grows: unstable' : t.sg > -0.02 ? 'rings forever' : t.om > 0.05 ? 'rings and dies away' : 'dies away smoothly'],
  ],
  setup(kit) {
    const S = kit.plane({ x: [-2, 0.6, 1], y: [-4, 4, 1], sx: 1.9, sy: 0.85, origin: [-3.6, 0], xLabel: '\\sigma', yLabel: 'j\\omega' });
    kit.rect(S.toW(0, -4)[0], -3.4, 0.6 * 1.9, 6.8, { color: C.red, opacity: 0.12, stroke: false });
    const p1 = kit.handle([0, 0], { onDrag: ([x, y]) => ({ sg: clamp(Math.round(((x + 3.6) / 1.9) * 20) / 20, -2, 0.6), om: clamp(Math.round((Math.abs(y) / 0.85) * 10) / 10, 0, 4) }), color: C.yellow });
    const p2 = kit.label('×', [0, 0], { ...T, size: 26, color: C.yellow });
    const Rp = kit.plane({ x: [0, 6, 1], y: [-2, 2, 1], sx: 1.05, sy: 1.3, origin: [1.2, 0], xLabel: 't', yLabel: '' });
    const resp = kit.curve(() => 0, [0, 6], { plane: Rp, color: C.blue, width: 2.5, samples: 400, clipY: [-2.2, 2.2] });
    return (p) => {
      p1.set(S.toW(p.sg, p.om));
      p2.pos(S.toW(p.sg, -p.om)).visible(p.om > 0.05);
      resp.set((x) => Math.exp(p.sg * x) * Math.cos(p.om * x));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-114: building a square wave from sines
// ---------------------------------------------------------------------------
const sq = (x, n) => {
  let s = 0;
  for (let k = 0; k < n; k++) s += Math.sin((2 * k + 1) * x) / (2 * k + 1);
  return (4 / Math.PI) * s;
};
export const fourier_square = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 2.5,
  mission: 'Use enough harmonics that the corners look sharp, then count the overshoot at the jump.',
  goal: (t) => R(t.n) >= 15,
  params: [{ key: 'n', label: 'Odd harmonics added', min: 1, max: 30, step: 1, value: 1 }],
  beats: [
    { say: 'One smooth sine wave. Fourier claimed in 1807 that even a jagged square wave is just a sum of waves like this.', set: { n: 1 }, ms: 10500 },
    { say: 'Add the third harmonic, three times the frequency and a third the size. The top starts to flatten.', set: { n: 2 }, ms: 10000, notes: [{ text: '+ sin 3x / 3', at: [4.5, 3.7], to: [3.0, 2.0], color: C.gold }] },
    { say: 'Add the fifth, a fifth the size. Then the seventh. Only odd harmonics are needed.', set: { n: 4 }, ms: 10000 },
    { say: 'With 25 terms the corners are sharp. But look at each jump: the sum overshoots by about 9% however many terms you add. That is the Gibbs phenomenon.', set: { n: 25 }, ms: 12500 },
    { say: 'The bars below are the spectrum: how much of each frequency the square wave contains, falling as 1 over n.', set: { n: 12 }, ms: 10500 },
  ],
  readout: (t) => [
    ['Terms', `${R(t.n)} (up to harmonic ${2 * R(t.n) - 1})`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 4 * Math.PI, Math.PI], y: [-1.3, 1.3, 1], sx: 1.15, sy: 1.6, origin: [-7.2, 1.3], numbers: false });
    kit.line([P.toW(0, 1), P.toW(Math.PI, 1), P.toW(Math.PI, -1), P.toW(2 * Math.PI, -1), P.toW(2 * Math.PI, 1), P.toW(3 * Math.PI, 1), P.toW(3 * Math.PI, -1), P.toW(4 * Math.PI, -1)], { color: C.grey, width: 1.2, dashed: true });
    const sum = kit.curve(() => 0, [0, 4 * Math.PI], { plane: P, color: C.blue, width: 3, samples: 900 });
    const last = kit.curve(() => 0, [0, 4 * Math.PI], { plane: P, color: C.gold, width: 1.5, samples: 600 });
    const bars = Array.from({ length: 30 }, (_, k) => kit.rect(-7 + k * 0.46, -4, 0.3, 1, { color: C.teal, opacity: 0.85, stroke: false }));
    kit.label('spectrum: harmonics 1, 3, 5, …', [2.6, -1.6], { ...T, size: 13, color: C.grey });
    return (p) => {
      const n = R(p.n);
      sum.set((x) => sq(x, n));
      const k = 2 * n - 1;
      last.set((x) => ((4 / Math.PI) * Math.sin(k * x)) / k);
      bars.forEach((b, i) => {
        b.set(-7 + i * 0.46, -4, 0.3, Math.max(0.001, (1.8 * 4) / (Math.PI * (2 * i + 1))));
        b.visible(i < n);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// ee-115: rectifying and smoothing
// ---------------------------------------------------------------------------
function rectWave(mode, C_uF, I) {
  const pts = [];
  const Vp = 10;
  let v = 0;
  const dt = 0.00005;
  for (let t = 0; t <= 0.05; t += dt) {
    const s = Vp * Math.sin(2 * Math.PI * 60 * t);
    let r = mode === 'ac' ? s : mode === 'half' ? Math.max(0, s - 0.7) : Math.max(0, Math.abs(s) - 1.4);
    if (mode === 'smooth') {
      v = Math.max(r, v - ((I / (C_uF * 1e-6)) * dt));
      r = v;
    }
    pts.push([t, r]);
  }
  return pts;
}
export const rectifier_ripple = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Keep the ripple under 1 V while the load draws 1 A.',
  goal: (t) => t.mode === 'smooth' && t.I >= 0.99 && t.I / (120 * t.C * 1e-6) < 1,
  params: [
    choice('mode', 'Circuit', 'ac', [['ac', 'AC in'], ['half', 'One diode'], ['full', 'Bridge (4 diodes)'], ['smooth', 'Bridge + capacitor']]),
    { key: 'C', label: 'Capacitor (μF)', min: 1000, max: 20000, step: 500, value: 4700 },
    { key: 'I', label: 'Load current (A)', min: 0.1, max: 2, step: 0.1, value: 0.5 },
  ],
  beats: [
    { say: 'The wall gives AC: 60 times a second the voltage swings positive, then negative. Electronics needs one steady direction.', set: { mode: 'ac', C: 4700, I: 0.5 }, ms: 11000 },
    { say: 'One diode passes only the positive halves, minus its 0.7 volt drop. Half the time, nothing.', set: { mode: 'half' }, ms: 10000 },
    { say: 'A bridge of four diodes flips the negative halves up too: 120 pulses a second, all one way.', set: { mode: 'full' }, ms: 10500 },
    { say: 'Add a big capacitor. It fills at each peak and feeds the load in between, sagging a little: the ripple, about I over 2 f C.', set: { mode: 'smooth' }, ms: 12000, notes: [{ text: 'ripple', at: [4.8, 3.7], to: [3.6, 2.6], color: C.gold }] },
    { say: 'Draw more current and the sag grows. A bigger capacitor shrinks it again.', set: { I: 1.5, C: 4700 }, ms: 10000 },
    { say: 'With 15,000 microfarads, even 1.5 amps leaves less than a volt of ripple.', set: { C: 15000 }, ms: 9500 },
  ],
  readout: (t) => [
    ['Peak out', t.mode === 'ac' ? '10 V (both ways)' : t.mode === 'half' ? '9.3 V' : '8.6 V'],
    ['Ripple', t.mode === 'smooth' ? `${r2(t.I / (120 * t.C * 1e-6))} V` : '—'],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 0.05, 0.01], y: [-10, 10, 5], sx: 280, sy: 0.32, origin: [-7, -0.3], numbers: false, xLabel: 't', yLabel: 'V' });
    for (const v of [-10, -5, 5, 10]) kit.label(`${v} V`, [P.toW(0, v)[0] - 0.15, P.toW(0, v)[1]], { ...T, size: 11, color: C.grey, align: 'right' });
    for (const ms of [0, 10, 20, 30, 40, 50]) kit.label(`${ms} ms`, [P.toW(ms / 1000, 0)[0], -3.9], { ...T, size: 11, color: C.grey });
    kit.curve((x) => 10 * Math.sin(2 * Math.PI * 60 * x), [0, 0.05], { plane: P, color: C.grey, width: 1.2, dashed: true, samples: 400 });
    const out = kit.line([[0, 0], [1, 0]], { color: C.blue, width: 3, create: false });
    let key = '';
    return (p, t) => {
      const k = `${t.mode}|${R(p.C)}|${r2(p.I)}`;
      if (k === key) return;
      key = k;
      out.set(rectWave(t.mode, p.C, p.I).filter((_, i) => i % 4 === 0).map(([x, y]) => P.toW(x, y)));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-116: a transistor as amplifier and switch
// ---------------------------------------------------------------------------
const BETA = 100;
const ICMAX = 50; // mA
const icOf = (ib) => Math.min(BETA * ib, ICMAX);
export const transistor_switch = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Find the smallest base current that turns the lamp fully on.',
  goal: (t) => Math.abs(t.ib - 0.5) < 0.006,
  params: [{ key: 'ib', label: 'Base current I_B (mA)', min: 0, max: 1, step: 0.01, value: 0 }],
  beats: [
    { say: 'A transistor with a current gain of 100 controls a lamp. With no base current, it is off: no collector current, no light.', set: { ib: 0 }, ms: 10500 },
    { say: 'Feed in 0.1 milliamps at the base. A hundred times more, 10 milliamps, flows through the lamp. A small current controls a big one: amplification.', set: { ib: 0.1 }, ms: 12000, notes: [{ text: 'I_C = β I_B', at: [-1.2, 3.7], to: [-2.8, 1.8], color: C.gold }] },
    { say: '0.3 milliamps in, 30 out. The graph is a straight line with slope beta.', set: { ib: 0.3 }, ms: 9500 },
    { say: 'At 0.5 milliamps the lamp gets all the current the supply allows, 50 milliamps. Past this the transistor is saturated: fully on, a closed switch.', set: { ib: 0.5 }, ms: 12000 },
    { say: 'More base current changes nothing. Designers give two to five times the minimum, so the switch is surely on. Billions of such switches make every chip.', set: { ib: 1 }, ms: 11500 },
  ],
  readout: (t) => [
    ['Base current', `${r2(t.ib)} mA`],
    ['Collector current', `${r1(icOf(t.ib))} mA`],
    ['State', t.ib <= 0 ? 'off' : BETA * t.ib >= ICMAX ? 'saturated (switch on)' : 'active (amplifying)'],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 1, 0.25], y: [0, 60, 10], sx: 6.2, sy: 0.1, origin: [0.6, -3.4], xLabel: 'I_B\\ (\\text{mA})', yLabel: 'I_C\\ (\\text{mA})' });
    kit.curve(icOf, [0, 1], { plane: P, color: C.blue, width: 3, samples: 300 });
    kit.line([P.toW(0, ICMAX), P.toW(1, ICMAX)], { color: C.grey, width: 1, dashed: true });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.yellow });
    const h = kit.handle([0, 0], { onDrag: ([x]) => ({ ib: clamp(Math.round(((x - 0.6) / 6.2) * 100) / 100, 0, 1) }), color: C.yellow });
    // the lamp and transistor on the left
    const glow = kit.dot([-4.4, 2.2], { r: 1.1, color: C.yellow, opacity: 0 });
    kit.line(ring(-4.4, 2.2, 0.7), { color: C.white, width: 2, create: false });
    kit.line([[-4.4, 1.5], [-4.4, 0.4]], { color: C.white, width: 2 });
    kit.line(ring(-4.4, -0.4, 0.8), { color: C.grey, width: 2, create: false });
    kit.line([[-4.8, -0.9], [-4.8, 0.1]], { color: C.white, width: 3 });
    kit.line([[-6.6, -0.4], [-4.8, -0.4]], { color: C.white, width: 2 });
    kit.line([[-4.8, -0.15], [-4.4, 0.4]], { color: C.white, width: 2 });
    kit.line([[-4.8, -0.65], [-4.4, -1.2], [-4.4, -2.6]], { color: C.white, width: 2 });
    kit.label('base', [-6.6, -0.0], { ...T, size: 12, color: C.grey });
    const ibA = kit.arrow([-6.6, -0.4], [-5.0, -0.4], { color: C.teal, head: 0.18 });
    const icA = kit.arrow([-3.6, 1.4], [-3.6, -1.6], { color: C.gold });
    return (p) => {
      const ic = icOf(p.ib);
      const w = P.toW(p.ib, ic);
      dot.set(w);
      h.set(w);
      glow.opacity(0.85 * (ic / ICMAX)).scale(0.5 + 0.5 * (ic / ICMAX));
      ibA.visible(p.ib > 0.005);
      icA.visible(ic > 0.5).opacity(0.3 + 0.7 * (ic / ICMAX));
    };
  },
};

// ---------------------------------------------------------------------------
// ee-117: negative feedback tames a huge gain
// ---------------------------------------------------------------------------
export const opamp_gain = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Set R_f / R_in = 47, then find how much raw gain you need for the result to be within 1% of 47.',
  goal: (t) => R(t.ratio) === 47 && 10 ** t.la / (1 + 10 ** t.la / 47) >= 0.99 * 47,
  params: [
    { key: 'la', label: 'Op-amp raw gain A (10^x)', min: 1, max: 6, step: 0.05, value: 1 },
    { key: 'ratio', label: 'R_f / R_in', min: 1, max: 100, step: 1, value: 10 },
  ],
  beats: [
    { say: 'An amplifier with feedback resistors set for a gain of 10. If its raw gain A is only 10, the result is a poor 5.', set: { la: 1, ratio: 10 }, ms: 11000 },
    { say: 'Raise the raw gain to 1000: the result climbs to 9.9.', set: { la: 3 }, ms: 9500 },
    { say: 'A real op-amp has a raw gain of about 100,000. Now the result is 9.999: set by the two resistors alone.', set: { la: 5 }, ms: 11000, notes: [{ text: '→ R_f / R_in', at: [4.8, 3.8], to: [4.8, 1.3], color: C.gold }] },
    { say: 'Even if heat halves or doubles the raw gain, the result barely moves. Harold Black’s 1927 trade: throw away gain, buy accuracy.', set: { la: 5.3 }, ms: 11500 },
    { say: 'Choose resistors for a gain of 50, and the same thing happens: the curve flattens onto 50.', set: { ratio: 50, la: 5 }, ms: 10500 },
  ],
  readout: (t) => {
    const A = 10 ** t.la;
    const g = A / (1 + A / t.ratio);
    return [
      ['Raw gain A', sig(A, 2)],
      ['Gain with feedback', sig(g, 4)],
      ['Ideal 1/β', `${R(t.ratio)}`],
    ];
  },
  setup(kit) {
    // op-amp triangle
    kit.line([[-7.2, 2.6], [-7.2, -0.2], [-5.0, 1.2], [-7.2, 2.6]], { color: C.white, width: 2.5, create: false });
    kit.label('−', [-6.9, 2.0], { ...T, size: 18 });
    kit.label('+', [-6.9, 0.4], { ...T, size: 18 });
    kit.label('A', [-6.4, 1.2], { ...T, size: 16, color: C.blue });
    kit.line([[-5.0, 1.2], [-4.2, 1.2], [-4.2, 3.4], [-7.6, 3.4], [-7.6, 2.0], [-7.2, 2.0]], { color: C.gold, width: 2 });
    kit.label('feedback β', [-5.9, 3.8], { ...T, size: 12, color: C.gold });
    const P = kit.plane({ x: [1, 6, 1], y: [0, 1.1, 0.25], sx: 1.9, sy: 6.4, origin: [-4.0, -3.6], numbers: false, axisAt: [1, 0], xLabel: 'A', yLabel: '' });
    for (const f of [0.5, 1]) kit.label(`${f * 100}%`, [P.toW(1, f)[0] - 0.2, P.toW(1, f)[1]], { ...T, size: 11, color: C.grey, align: 'right' });
    const al = kit.label('', [0, 0], { ...T, size: 13, color: C.gold, align: 'left' });
    for (const k of [1, 2, 3, 4, 5, 6]) kit.label(`10${'⁰¹²³⁴⁵⁶'[k]}`, [P.toW(k, 0)[0], -4.0], { ...T, size: 11, color: C.grey });
    const asym = kit.line([[0, 0], [1, 0]], { color: C.gold, width: 1.2, dashed: true, create: false });
    const curve = kit.curve(() => 0, [1, 6], { plane: P, color: C.blue, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.yellow });
    const gl = kit.label('', [0, 0], { ...T, size: 14, color: C.yellow, align: 'left' });
    return (p) => {
      const g = (la) => 10 ** la / (1 + 10 ** la / p.ratio);
      curve.set((la) => g(la) / p.ratio);
      asym.set([P.toW(1, 1), P.toW(6, 1)]);
      al.set(`target R_f / R_in = ${R(p.ratio)}`).pos([P.toW(1, 1)[0] + 0.2, P.toW(1, 1)[1] + 0.35]);
      const w = P.toW(p.la, g(p.la) / p.ratio);
      dot.set(w);
      gl.set(sig(g(p.la), 4)).pos([w[0] + 0.25, w[1] + 0.35]);
    };
  },
};

// ---------------------------------------------------------------------------
// ece-201: logic gates
// ---------------------------------------------------------------------------
const GATES = [
  ['AND', (a, b) => a & b],
  ['OR', (a, b) => a | b],
  ['XOR', (a, b) => a ^ b],
  ['NAND', (a, b) => 1 - (a & b)],
];
export const gate_truth = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 4,
  mission: 'Find the one input pair that makes NAND output 0.',
  goal: (t) => t.a === 1 && t.b === 1,
  params: [choice('a', 'Input A', 0, [[0, '0'], [1, '1']]), choice('b', 'Input B', 0, [[0, '0'], [1, '1']])],
  beats: [
    { say: 'Two inputs, A and B, each 0 or 1: low or high voltage. Four gates combine them by Boole’s rules. Both inputs 0: only NAND says 1.', set: { a: 0, b: 0 }, ms: 11500 },
    { say: 'A is 1, B is 0. OR and XOR switch on: at least one input is 1, and they differ.', set: { a: 1 }, ms: 10000 },
    { say: 'Both 1. AND lights up, XOR goes dark because the inputs are the same, and NAND, "not and", finally gives 0.', set: { b: 1 }, ms: 11000, notes: [{ text: 'NAND = NOT AND', at: [4.6, -3.9], to: [3.5, -2.4], color: C.gold }] },
    { say: 'The table on the right lists all four input rows. A 21-year-old Claude Shannon showed in 1937 that relay switches follow exactly this algebra.', set: { a: 0, b: 1 }, ms: 12000 },
  ],
  readout: (t) => GATES.map(([n, f]) => [n, `${f(t.a, t.b)}`]),
  setup(kit) {
    const gates = GATES.map(([name], i) => {
      const y = 2.6 - i * 1.8;
      kit.rect(-3.6, y - 0.6, 2.4, 1.2, { color: 0x1a2433, opacity: 1, strokeColor: C.blue, width: 2 });
      kit.label(name, [-2.4, y], { ...T, size: 16 });
      kit.line([[-5.6, y + 0.3], [-3.6, y + 0.3]], { color: C.grey, width: 1.5 });
      kit.line([[-5.6, y - 0.3], [-3.6, y - 0.3]], { color: C.grey, width: 1.5 });
      kit.line([[-1.2, y], [0.0, y]], { color: C.grey, width: 1.5 });
      return { lamp: kit.dot([0.4, y], { r: 0.32, color: C.grey }), v: kit.label('', [1.1, y], { ...T, size: 18, cls: 'mono' }) };
    });
    const aL = kit.label('', [-6.6, 3.8], { ...T, size: 18, cls: 'mono', color: C.teal });
    const bL = kit.label('', [-6.6, 3.3], { ...T, size: 18, cls: 'mono', color: C.teal });
    // truth table
    const head = ['A', 'B', ...GATES.map((g) => g[0])];
    head.forEach((h, j) => kit.label(h, [2.6 + j * 0.95, 3.4], { ...T, size: 12, color: C.grey }));
    const hi = kit.rect(2.1, 0, 6.0, 0.6, { color: C.gold, opacity: 0.18, stroke: false });
    [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([a, b], r) => {
      const y = 2.6 - r * 0.8;
      [a, b, ...GATES.map((g) => g[1](a, b))].forEach((v, j) => kit.label(`${v}`, [2.6 + j * 0.95, y], { ...T, size: 15, cls: 'mono' }));
    });
    return (p, t) => {
      aL.set(`A = ${t.a}`);
      bL.set(`B = ${t.b}`);
      GATES.forEach(([, f], i) => {
        const v = f(t.a, t.b);
        gates[i].lamp.color(v ? C.yellow : C.grey);
        gates[i].v.set(`${v}`);
      });
      const row = t.a * 2 + t.b;
      hi.set(2.1, 2.3 - row * 0.8, 6.0, 0.6);
    };
  },
};

// ---------------------------------------------------------------------------
// ece-202: a ripple counter divides frequency
// ---------------------------------------------------------------------------
export const counter_divide = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 6,
  mission: 'Step the clock until the counter reads 1010 (ten).',
  goal: (t) => R(t.k) % 16 === 10,
  params: [{ key: 'k', label: 'Clock pulses', min: 0, max: 16, step: 1, value: 0 }],
  beats: [
    { say: 'A clock: a steady square wave. Below it, four flip-flops in a chain. Each one flips when the one above it falls from 1 to 0.', set: { k: 0 }, ms: 11000 },
    { say: 'Pulse by pulse, the outputs count in binary: 1, 10, 11, 100…', set: { k: 3 }, ms: 9500 },
    { say: 'Look at the waves: each row is a square wave at half the frequency of the row above. Four stages divide by 16.', set: { k: 8 }, ms: 11000, notes: [{ text: 'each row: half the frequency', at: [3.4, -4.0], to: [3.4, -2.5], color: C.gold }] },
    { say: 'After 15 pulses all four read 1. The sixteenth rolls them all back to 0. A quartz watch uses fifteen of these stages to turn 32,768 hertz into one tick per second.', set: { k: 16 }, ms: 13000 },
  ],
  readout: (t) => {
    const n = R(t.k) % 16;
    return [
      ['Count (binary)', n.toString(2).padStart(4, '0')],
      ['Count', `${n}`],
    ];
  },
  setup(kit) {
    const X0 = -5.5;
    const dx = 0.72;
    const rows = ['clock', 'Q0', 'Q1', 'Q2', 'Q3'];
    const Ys = rows.map((_, i) => 2.8 - i * 1.5);
    rows.forEach((r, i) => kit.label(r, [X0 - 0.9, Ys[i] + 0.3], { ...T, size: 14, color: i ? C.teal : C.gold }));
    const wave = (lvl, y) => {
      const pts = [];
      lvl.forEach((v, j) => {
        pts.push([X0 + j * dx, y + v * 0.6], [X0 + (j + 1) * dx, y + v * 0.6]);
      });
      return pts;
    };
    // clock: high for the first half of each period
    const half = [];
    for (let j = 0; j < 16; j++) half.push(1, 0);
    kit.line(wave(half, Ys[0]).map(([x, y]) => [X0 + (x - X0) / 2, y]), { color: C.gold, width: 2 });
    for (let b = 0; b < 4; b++) {
      const lvl = [];
      for (let j = 0; j < 16; j++) lvl.push((j >> b) & 1);
      kit.line(wave(lvl, Ys[b + 1]), { color: C.teal, width: 2 });
    }
    const cursor = kit.line([[0, -4], [0, 3.8]], { color: C.yellow, width: 2, create: false });
    const vals = [1, 2, 3, 4].map((b) => kit.label('', [7.2, Ys[b] + 0.3], { ...T, size: 20, cls: 'mono' }));
    return (p) => {
      const k = clamp(p.k, 0, 16);
      cursor.set([[X0 + k * dx, -3.6], [X0 + k * dx, 3.7]]);
      const n = R(p.k) % 16;
      vals.forEach((l, b) => l.set(`${(n >> b) & 1}`).color((n >> b) & 1 ? C.yellow : C.grey));
    };
  },
};

// ---------------------------------------------------------------------------
// ece-203: sampling and aliasing
// ---------------------------------------------------------------------------
const aliasOf = (f, fs) => {
  const k = Math.round(f / fs);
  return Math.abs(f - k * fs);
};
export const sample_alias = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Pick a sampling rate that makes a 9 Hz signal look like 1 Hz.',
  goal: (t) => Math.abs(t.f - 9) < 0.05 && (Math.abs(t.fs - 8) < 0.05 || Math.abs(t.fs - 10) < 0.05),
  params: [
    { key: 'f', label: 'Signal frequency (Hz)', min: 1, max: 12, step: 0.5, value: 2 },
    { key: 'fs', label: 'Samples per second', min: 4, max: 40, step: 1, value: 30 },
  ],
  beats: [
    { say: 'A 2 hertz wave, sampled 30 times a second. The dots follow it closely: plenty of samples per cycle.', set: { f: 2, fs: 30 }, ms: 10500 },
    { say: 'Raise the signal to 9 hertz. 30 samples a second is still more than twice 9, so the dots still pin down the wave.', set: { f: 9 }, ms: 10500 },
    { say: 'Now sample only 10 times a second, less than twice 9. The dots trace a slow false wave at just 1 hertz: an alias.', set: { fs: 10 }, ms: 12000, notes: [{ text: 'alias: 1 Hz', at: [4.6, 3.8], to: [2.4, 2.2], color: C.red }] },
    { say: 'Once sampled, nothing can tell these dots from a real 1 hertz wave. So engineers filter out everything above half the sampling rate first. Nyquist and Shannon’s rule: sample faster than twice the highest frequency.', set: { fs: 19 }, ms: 14000 },
  ],
  readout: (t) => [
    ['Nyquist limit (f_s / 2)', `${r1(t.fs / 2)} Hz`],
    ['What the samples show', t.f < t.fs / 2 ? `${r1(t.f)} Hz (true)` : `${r1(aliasOf(t.f, t.fs))} Hz (alias!)`],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 1, 0.25], y: [-1.2, 1.2, 1], sx: 13.5, sy: 2.6, origin: [-6.8, 0], numbers: false, xLabel: 't\\ (1\\ \\text{s})' });
    const sig_ = kit.curve(() => 0, [0, 1], { plane: P, color: C.blue, width: 2, samples: 600 });
    const al = kit.curve(() => 0, [0, 1], { plane: P, color: C.red, width: 2.5, dashed: true, samples: 300 });
    const dots = Array.from({ length: 41 }, () => kit.dot([0, 0], { r: 0.11, color: C.yellow }));
    return (p, t) => {
      const f = p.f;
      const fs = R(p.fs);
      sig_.set((x) => Math.sin(2 * Math.PI * f * x));
      dots.forEach((d, i) => {
        const x = i / fs;
        d.visible(x <= 1.0001 && i <= fs);
        if (x <= 1) d.set(P.toW(x, Math.sin(2 * Math.PI * f * x)));
      });
      const bad = t.f >= t.fs / 2;
      const fa = aliasOf(f, fs);
      const sign = Math.sign(f - Math.round(f / fs) * fs) || 1;
      al.set((x) => sign * Math.sin(2 * Math.PI * fa * x)).visible(bad);
    };
  },
};

// ---------------------------------------------------------------------------
// ece-204: AM and FM
// ---------------------------------------------------------------------------
const NOISE = (() => {
  let s = 7;
  return Array.from({ length: 1400 }, () => {
    s = (s * 16807) % 2147483647;
    const u = s / 2147483647;
    return u > 0.985 ? (u - 0.985) * 120 : 0;
  });
})();
export const am_fm = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  ease: 3,
  mission: 'Over-modulate the AM signal (depth above 1) and watch its outline fold over.',
  goal: (t) => t.mode === 'am' && t.m > 1.02,
  params: [
    choice('mode', 'Modulation', 'am', [['am', 'AM (amplitude)'], ['fm', 'FM (frequency)']]),
    { key: 'm', label: 'Depth / deviation', min: 0, max: 1.4, step: 0.05, value: 0.5 },
    choice('noise', 'Static', 0, [[0, 'Off'], [1, 'On']]),
  ],
  beats: [
    { say: 'At the top, the message: a slow wave, like a voice. Below, a fast carrier wave that an antenna can send.', set: { mode: 'am', m: 0, noise: 0 }, ms: 10500 },
    { say: 'Amplitude modulation: let the message set the carrier’s size. Its outline now traces the voice. Fessenden did this in 1906.', set: { m: 0.6 }, ms: 11000, notes: [{ text: 'outline = message', at: [4.4, -0.6], to: [2.6, -1.4], color: C.gold }] },
    { say: 'Add static from lightning or a motor. The spikes add to the size, which is exactly where AM keeps its message: you hear the crackle.', set: { noise: 1 }, ms: 11500 },
    { say: 'Frequency modulation instead: the size stays fixed, and the message squeezes and stretches the waves. Armstrong patented this in 1933.', set: { mode: 'fm', noise: 0 }, ms: 11500 },
    { say: 'Static still adds spikes, but an FM receiver clips the size flat and reads only the spacing. The message comes through clean, at the price of more bandwidth.', set: { noise: 1 }, ms: 12500 },
  ],
  readout: (t) => [
    ['Carrying the message in', t.mode === 'am' ? 'amplitude (size)' : 'frequency (spacing)'],
    ['Bandwidth for 5 kHz audio', t.mode === 'am' ? '10 kHz' : `${R(2 * (75 * clamp(t.m, 0, 1) + 15))} kHz (broadcast FM)`],
  ],
  setup(kit) {
    const M = kit.plane({ x: [0, 1, 0.25], y: [-1, 1, 1], sx: 14, sy: 0.9, origin: [-7, 2.9], numbers: false, grid: false });
    const msg = kit.curve(() => 0, [0, 1], { plane: M, color: C.teal, width: 2.5 });
    kit.label('message', [-6.4, 4.1], { ...T, size: 13, color: C.teal });
    const S = kit.plane({ x: [0, 1, 0.25], y: [-2.6, 2.6, 1], sx: 14, sy: 1.15, origin: [-7, -1.4], numbers: false, grid: false });
    const wave = kit.line([[0, 0], [1, 0]], { color: C.blue, width: 1.6, create: false });
    const env = kit.curve(() => 0, [0, 1], { plane: S, color: C.gold, width: 1.5, dashed: true });
    kit.label('signal sent', [-6.2, 1.9], { ...T, size: 13, color: C.blue });
    return (p, t, time) => {
      const ph = time * 0.4;
      const fm = 2;
      const mes = (x) => Math.cos(2 * Math.PI * fm * (x + ph));
      msg.set(mes);
      const n = 1400;
      const pts = [];
      let phase = 0;
      for (let i = 0; i <= n; i++) {
        const x = i / n;
        let y;
        if (t.mode === 'am') y = (1 + p.m * mes(x)) * Math.sin(2 * Math.PI * 40 * x);
        else {
          phase += (2 * Math.PI * (40 + 22 * clamp(p.m, 0, 1.4) * mes(x))) / n;
          y = 1.4 * Math.sin(phase);
        }
        if (t.noise === 1) y += NOISE[(i + Math.floor(time * 60)) % NOISE.length] * (i % 2 ? 1 : -1);
        pts.push(S.toW(x, clamp(y, -2.6, 2.6)));
      }
      wave.set(pts);
      env.set((x) => 1 + p.m * mes(x)).visible(t.mode === 'am');
    };
  },
};
