import { C } from '../theme';
import { clamp, range } from '../kit';

const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const G = 9.81;
const rad = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------------------
// Projectiles: steady sideways, accelerating downward → a parabola
// ---------------------------------------------------------------------------
export const projectile_launcher = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'At 20 m/s, find the angle that throws the ball furthest.',
  goal: (t) => t.v === 20 && t.a === 45,
  params: [
    { key: 'a', label: 'Launch angle θ (°)', min: 10, max: 80, step: 5, value: 30 },
    { key: 'v', label: 'Launch speed v (m/s)', min: 5, max: 25, step: 1, value: 18 },
  ],
  beats: [
    { say: 'Launch at 30°. The blue arrow (sideways speed) never changes. The red arrow (up-down speed) shrinks, flips, and grows downward.', set: { a: 30, v: 18 } },
    { say: 'Now 60° at the same speed. It flies higher but lands in exactly the same spot: 30° and 60° add up to 90°.', set: { a: 60, v: 18 } },
    { say: 'At 45° the range is the biggest it can be for this speed: R = v²/g.', set: { a: 45, v: 18 } },
  ],
  readout: (t) => {
    const th = rad(t.a);
    return [
      ['Sideways speed v cos θ', `${r2(t.v * Math.cos(th))} m/s`],
      ['Starting up speed v sin θ', `${r2(t.v * Math.sin(th))} m/s`],
      ['Time in the air', `${r2((2 * t.v * Math.sin(th)) / G)} s`],
      ['Highest point', `${r1((t.v * Math.sin(th)) ** 2 / (2 * G))} m`],
      ['Range R', `${r1((t.v * t.v * Math.sin(2 * th)) / G)} m`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 70, 10], y: [0, 35, 10], sx: 0.21, sy: 0.21, origin: [-7.3, -3.6], xLabel: 'x\\,(\\text{m})', yLabel: 'y\\,(\\text{m})' });
    const twin = kit.line([], { color: C.grey, width: 2, dashed: true, opacity: 0.5, create: false });
    const path = kit.line([], { color: C.yellow, width: 3, create: false });
    const ball = kit.dot([0, 0], { r: 0.16, color: C.white, glow: true });
    const vx = kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3, head: 0.22 });
    const vy = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3, head: 0.22 });
    const land = kit.dot([0, 0], { r: 0.1, color: C.green });
    const rl = kit.label('', [0, 0], { size: 16, color: C.green });
    const traj = (v, th, n = 80) => {
      const T = (2 * v * Math.sin(th)) / G;
      return range(0, T, n).map((s) => P.toW(v * Math.cos(th) * s, v * Math.sin(th) * s - 0.5 * G * s * s));
    };
    let clock = 0;
    return (p, _t, _time, dt) => {
      const th = rad(p.a);
      const T = (2 * p.v * Math.sin(th)) / G;
      const R = (p.v * p.v * Math.sin(2 * th)) / G;
      path.set(traj(p.v, th));
      twin.set(Math.abs(p.a - 45) > 1 ? traj(p.v, rad(90 - p.a)) : []);
      clock = (clock + dt) % (T + 1);
      const s = Math.min(clock, T);
      const x = p.v * Math.cos(th) * s;
      const y = Math.max(0, p.v * Math.sin(th) * s - 0.5 * G * s * s);
      const b = P.toW(x, y);
      ball.set(b);
      const k = 0.09;
      vx.set(b, [b[0] + p.v * Math.cos(th) * k, b[1]]);
      vy.set(b, [b[0], b[1] + (p.v * Math.sin(th) - G * s) * k]);
      land.set(P.toW(R, 0));
      rl.set(`R = ${r1(R)}\\text{ m}`).pos([P.toW(R, 0)[0], -3.1]);
    };
  },
};

// ---------------------------------------------------------------------------
// Momentum: two carts collide; momentum always survives, energy only sometimes
// ---------------------------------------------------------------------------
const afterSpeeds = (m1, v1, m2, v2, sticky) => {
  if (sticky) {
    const v = (m1 * v1 + m2 * v2) / (m1 + m2);
    return [v, v];
  }
  return [((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2), ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)];
};

export const collision_carts = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make a sticky crash where both carts stop dead.',
  goal: (t) => t.kind === 'sticky' && Math.abs(t.m1 * t.v1 + t.m2 * t.v2) < 0.01,
  params: [
    { key: 'm1', label: 'Mass of cart 1 (kg)', min: 1, max: 4, step: 0.5, value: 2 },
    { key: 'v1', label: 'Speed of cart 1 (m/s, rightward)', min: 0.5, max: 3, step: 0.5, value: 2 },
    { key: 'm2', label: 'Mass of cart 2 (kg)', min: 1, max: 4, step: 0.5, value: 2 },
    { key: 'v2', label: 'Speed of cart 2 (m/s, − is leftward)', min: -3, max: 0, step: 0.5, value: 0 },
    { key: 'kind', label: 'Collision', type: 'choice', value: 'bouncy', options: [{ value: 'bouncy', label: 'bouncy' }, { value: 'sticky', label: 'sticky' }] },
  ],
  beats: [
    { say: 'Equal carts, bouncy. Cart 1 stops dead and cart 2 leaves with all of its speed, like a snooker ball.', set: { m1: 2, v1: 2, m2: 2, v2: 0, kind: 'bouncy' } },
    { say: 'Make them sticky. They roll off together at half the speed. Momentum is the same, but half the movement energy became heat and bent metal.', set: { m1: 2, v1: 2, m2: 2, v2: 0, kind: 'sticky' } },
    { say: 'A heavy cart hits a light one: the light cart shoots off faster than the heavy one ever went.', set: { m1: 4, v1: 2, m2: 1, v2: 0, kind: 'bouncy' } },
  ],
  readout: (t) => {
    const [a, b] = afterSpeeds(t.m1, t.v1, t.m2, t.v2, t.kind === 'sticky');
    const ke0 = 0.5 * t.m1 * t.v1 ** 2 + 0.5 * t.m2 * t.v2 ** 2;
    const ke1 = 0.5 * t.m1 * a ** 2 + 0.5 * t.m2 * b ** 2;
    return [
      ['Momentum before', `${r2(t.m1 * t.v1 + t.m2 * t.v2)} kg·m/s`],
      ['Momentum after', `${r2(t.m1 * a + t.m2 * b)} kg·m/s`],
      ['Speeds after', `${r2(a)} and ${r2(b)} m/s`],
      ['Movement energy before', `${r2(ke0)} J`],
      ['Movement energy after', `${r2(ke1)} J`],
      ['Turned into heat and dents', `${r2(ke0 - ke1)} J`],
    ];
  },
  setup(kit) {
    kit.line([[-8, -1.3], [8, -1.3]], { color: C.axis, width: 2 });
    const c1 = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.5, strokeColor: C.blue, width: 2 });
    const c2 = kit.rect(0, 0, 0, 0, { color: C.gold, opacity: 0.5, strokeColor: C.gold, width: 2 });
    const a1 = kit.arrow([0, 0], [0, 0], { color: C.blue, width: 3, head: 0.25 });
    const a2 = kit.arrow([0, 0], [0, 0], { color: C.gold, width: 3, head: 0.25 });
    const l1 = kit.label('', [0, 0], { size: 16, color: C.blue });
    const l2 = kit.label('', [0, 0], { size: 16, color: C.gold });
    const flash = kit.dot([0, -0.3], { r: 0.35, color: C.yellow, opacity: 0 });
    const pb = kit.label('', [-4, 3.6], { size: 18 });
    const pa = kit.label('', [4, 3.6], { size: 18 });
    const S = 0.8; // world units per metre
    const TC = 2.5;
    let clock = 0;
    return (p, t, _time, dt) => {
      clock = (clock + dt) % 6;
      const sticky = t.kind === 'sticky';
      const [u1, u2] = afterSpeeds(p.m1, p.v1, p.m2, p.v2, sticky);
      const w1 = 0.7 + 0.25 * p.m1;
      const w2 = 0.7 + 0.25 * p.m2;
      const h1 = 0.5 + 0.12 * p.m1;
      const h2 = 0.5 + 0.12 * p.m2;
      const dtc = clock - TC;
      const s1 = dtc < 0 ? p.v1 : u1;
      const s2 = dtc < 0 ? p.v2 : u2;
      const x1 = -w1 / 2 + s1 * dtc * S;
      const x2 = w2 / 2 + s2 * dtc * S;
      c1.set(x1 - w1 / 2, -1.3, w1, h1);
      c2.set(x2 - w2 / 2, -1.3, w2, h2);
      a1.set([x1, -0.3 + h1], [x1 + s1 * 0.6, -0.3 + h1]);
      a2.set([x2, -0.1 + h2], [x2 + s2 * 0.6, -0.1 + h2]);
      l1.set(`${r1(s1)}\\,\\text{m/s}`).pos([x1, -1.75]);
      l2.set(`${r1(s2)}\\,\\text{m/s}`).pos([x2, -1.75]);
      flash.opacity(clamp(1 - Math.abs(dtc) * 4, 0, 1) * 0.8);
      pb.set(`p_{\\text{before}} = ${r2(p.m1 * p.v1 + p.m2 * p.v2)}`).opacity(dtc < 0 ? 1 : 0.45);
      pa.set(`p_{\\text{after}} = ${r2(p.m1 * u1 + p.m2 * u2)}`).opacity(dtc < 0 ? 0.45 : 1);
    };
  },
};

// ---------------------------------------------------------------------------
// Rotation: hoop, disc and ball race down identical ramps
// ---------------------------------------------------------------------------
const SHAPES = [
  { name: 'hoop', k: 1, color: C.red },
  { name: 'disc', k: 0.5, color: C.gold },
  { name: 'ball', k: 0.4, color: C.green },
];

export const rolling_race = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Tilt the ramp until the ball finishes in under 1 second.',
  goal: (t) => Math.sqrt((2 * 2 * 1.4) / (G * Math.sin(rad(t.slope)))) < 1,
  params: [{ key: 'slope', label: 'Ramp angle (°)', min: 5, max: 40, step: 1, value: 12 }],
  beats: [
    { say: 'Three shapes with the same mass and radius roll down 2 m ramps. The ball wins, the disc is second, the hoop is last.', set: { slope: 12 } },
    { say: 'Make the slope steeper. Everyone is faster, but the order never changes: only the shape (where the mass sits) decides.', set: { slope: 30 } },
  ],
  readout: (t) => {
    const s = Math.sin(rad(t.slope));
    return SHAPES.map((S) => [`${S.name} (I = ${S.k === 1 ? '' : S.k === 0.5 ? '½' : '⅖'}mR²)`, `${r2(Math.sqrt((2 * 2 * (1 + S.k)) / (G * s)))} s`]);
  },
  setup(kit) {
    const L = 2; // metres
    const R = 0.28; // world radius
    const lanes = SHAPES.map((S, i) => {
      const x0 = -7.6 + i * 5.2;
      const ramp = kit.line([], { color: C.axis, width: 2, create: false });
      const floor = kit.line([], { color: C.axis, width: 1, opacity: 0.4, create: false });
      const rim = kit.line([], { color: S.color, width: 3, create: false });
      const spoke = kit.line([[0, 0], [0, 0]], { color: S.color, width: 2, create: false });
      const fill = kit.fill([], { color: S.color, opacity: S.k === 1 ? 0.05 : S.k === 0.5 ? 0.25 : 0.45 });
      const name = kit.label(`\\text{${S.name}}`, [x0 + 2.2, 3.0], { size: 16, color: S.color });
      const time = kit.label('', [x0 + 2.2, -3.2], { size: 18 });
      return { S, x0, ramp, floor, rim, spoke, fill, name, time };
    });
    let clock = 0;
    let last = null;
    return (p, t, _time, dt) => {
      const th = rad(p.slope);
      if (t.slope !== last) {
        last = t.slope;
        clock = 0;
      }
      clock += dt;
      const span = 4.5; // world length of each ramp
      const sc = span / L;
      const tMax = Math.sqrt((2 * L * 2) / (G * Math.sin(th)));
      if (clock > tMax + 1.2) clock = 0;
      for (const ln of lanes) {
        const top = [ln.x0, 1.8];
        const dir = [Math.cos(th), -Math.sin(th)];
        const bot = [top[0] + dir[0] * span, top[1] + dir[1] * span];
        ln.ramp.set([top, bot]);
        ln.floor.set([[ln.x0, bot[1]], [ln.x0 + span * 1.02, bot[1]]]);
        const a = (G * Math.sin(th)) / (1 + ln.S.k);
        const s = Math.min(0.5 * a * clock * clock, L);
        const nrm = [Math.sin(th), Math.cos(th)];
        const c = [top[0] + dir[0] * s * sc + nrm[0] * R, top[1] + dir[1] * s * sc + nrm[1] * R];
        const circle = range(0, 2 * Math.PI, 40).map((q) => [c[0] + R * Math.cos(q), c[1] + R * Math.sin(q)]);
        ln.rim.set(circle);
        ln.fill.set(circle);
        const turn = -(s * sc) / R;
        ln.spoke.set([c, [c[0] + R * Math.cos(turn), c[1] + R * Math.sin(turn)]]);
        const done = s >= L;
        ln.time.set(done ? `${r2(Math.sqrt((2 * L) / a))}\\,\\text{s}` : `${r2(clock)}\\,\\text{s}`).color(done ? ln.S.color : C.text);
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Springs: Hooke's law and simple harmonic motion
// ---------------------------------------------------------------------------
export const spring_mass = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Choose a mass and stiffness that make one full bounce take 1 second.',
  goal: (t) => Math.abs(2 * Math.PI * Math.sqrt(t.m / t.k) - 1) < 0.03,
  params: [
    { key: 'm', label: 'Mass m (kg)', min: 0.5, max: 4, step: 0.5, value: 1 },
    { key: 'k', label: 'Stiffness k (N/m)', min: 10, max: 100, step: 5, value: 20 },
    { key: 'A', label: 'Pull-down A (m)', min: 0.05, max: 0.25, step: 0.05, value: 0.15 },
  ],
  beats: [
    { say: 'Pull the mass down and let go. The spring pulls back harder the further it is stretched (F = −kx), and the mass swings in a cosine wave.', set: { m: 1, k: 20, A: 0.15 } },
    { say: 'Make the swing smaller. The period does not change at all. This is why a pendulum or spring can keep time.', set: { m: 1, k: 20, A: 0.05 } },
    { say: 'Four times the mass makes it twice as slow: T = 2π√(m/k).', set: { m: 4, k: 20, A: 0.15 } },
  ],
  readout: (t) => {
    const T = 2 * Math.PI * Math.sqrt(t.m / t.k);
    return [
      ['Period T = 2π√(m/k)', `${r2(T)} s`],
      ['Bounces per second', `${r2(1 / T)} Hz`],
      ['Biggest pull-back force kA', `${r2(t.k * t.A)} N`],
    ];
  },
  setup(kit) {
    const X = -5.0;
    kit.line([[X - 1.2, 3.8], [X + 1.2, 3.8]], { color: C.axis, width: 4 });
    kit.line([[X - 2.2, 0], [X + 2.2, 0]], { color: C.grey, width: 1, dashed: true, opacity: 0.5 });
    kit.label('\\text{rest}', [X - 2.1, 0.3], { size: 13, color: '#8b949e' });
    const coil = kit.line([], { color: C.blue, width: 2.5, create: false });
    const block = kit.rect(0, 0, 0, 0, { color: C.gold, opacity: 0.6, strokeColor: C.gold, width: 2 });
    const force = kit.arrow([0, 0], [0, 0], { color: C.red, width: 3, head: 0.25 });
    const P = kit.plane({ x: [0, 6, 1], y: [-0.25, 0.25, 0.05], sx: 1.6, sy: 12, origin: [-2.2, 0], xLabel: 't\\,(\\text{s})', yLabel: '\\text{height (m)}', yEvery: 0.1 });
    const trace = kit.line([], { color: C.gold, width: 3, create: false });
    const hist = [];
    let ph = 0;
    let time = 0;
    return (p, _t, _now, dt) => {
      const w = Math.sqrt(p.k / p.m);
      ph += w * dt;
      time += dt;
      const x = p.A * Math.cos(ph); // + is downward stretch
      const y = -x * 12; // world
      const side = 0.45 + 0.12 * p.m;
      const topY = y + side;
      const n = 16;
      coil.set(range(0, 1, n * 2 + 1).map((s, i) => [X + (i === 0 || i === n * 2 ? 0 : i % 2 ? 0.35 : -0.35), 3.8 + (topY - 3.8) * s]));
      block.set(X - side, y - side, side * 2, side * 2);
      force.set([X + side + 0.35, y], [X + side + 0.35, y + x * p.k * 0.6]);
      hist.push([time, x]);
      while (hist.length && hist[0][0] < time - 6) hist.shift();
      trace.set(hist.map(([s, v]) => P.toW(s - (time - 6), -v)));
    };
  },
};

// ---------------------------------------------------------------------------
// Waves: two travelling waves add up to a standing wave
// ---------------------------------------------------------------------------
export const standing_wave = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the harmonic with 4 nodes (still points), counting both ends.',
  goal: (t) => t.n === 3,
  params: [
    { key: 'n', label: 'Harmonic n', min: 1, max: 5, step: 1, value: 1 },
    { key: 'view', label: 'Show', type: 'choice', value: 'parts', options: [{ value: 'parts', label: 'both travelling waves' }, { value: 'sum', label: 'only the sum' }] },
  ],
  beats: [
    { say: 'Top: a wave running right. Bottom: the same wave running left. Middle: their heights added together. The sum does not travel; it just swells in place.', set: { n: 1, view: 'parts' } },
    { say: 'Second harmonic: two half-waves fit on the string, with a still point (a node) in the middle.', set: { n: 2, view: 'parts' } },
    { say: 'Only whole numbers of half-waves fit between the fixed ends. That is why a string plays notes, not any pitch at all.', set: { n: 4, view: 'sum' } },
  ],
  readout: (t) => {
    const L = 0.65;
    return [
      ['Half-waves on the string', `${t.n}`],
      ['Nodes (still points)', `${t.n + 1}`],
      ['Wavelength λ = 2L/n (guitar, L = 0.65 m)', `${r2((2 * L) / t.n)} m`],
      ['Frequency fₙ = n × 110 Hz', `${t.n * 110} Hz`],
    ];
  },
  setup(kit) {
    const X0 = -7;
    const X1 = 7;
    const Lw = X1 - X0;
    const a = 0.7;
    kit.dot([X0, 0], { r: 0.14, color: C.white });
    kit.dot([X1, 0], { r: 0.14, color: C.white });
    const up = kit.line([], { color: C.blue, width: 2, create: false });
    const dn = kit.line([], { color: C.red, width: 2, create: false });
    const ghost1 = kit.line([], { color: C.blue, width: 1.5, opacity: 0.35, create: false });
    const ghost2 = kit.line([], { color: C.red, width: 1.5, opacity: 0.35, create: false });
    const sum = kit.line([], { color: C.yellow, width: 4, create: false });
    const env = kit.line([], { color: C.yellow, width: 1, dashed: true, opacity: 0.35, create: false });
    const env2 = kit.line([], { color: C.yellow, width: 1, dashed: true, opacity: 0.35, create: false });
    const nodes = Array.from({ length: 6 }, () => kit.dot([0, 0], { r: 0.1, color: C.green }));
    const lu = kit.label('\\text{travelling right} \\to', [0, 3.9], { size: 15, color: C.blue });
    const ld = kit.label('\\leftarrow \\text{travelling left}', [0, -3.9], { size: 15, color: C.red });
    let wt = 0;
    return (p, t, _time, dt) => {
      wt += dt * 2.4;
      const n = t.n;
      const k = (n * Math.PI) / Lw;
      const xs = range(X0, X1, 240);
      const parts = t.view === 'parts';
      const y1 = (x) => a * Math.sin(k * (x - X0) - wt);
      const y2 = (x) => a * Math.sin(k * (x - X0) + wt);
      up.set(parts ? xs.map((x) => [x, 2.6 + y1(x)]) : []);
      dn.set(parts ? xs.map((x) => [x, -2.6 + y2(x)]) : []);
      ghost1.set(parts ? xs.map((x) => [x, y1(x)]) : []);
      ghost2.set(parts ? xs.map((x) => [x, y2(x)]) : []);
      lu.visible(parts);
      ld.visible(parts);
      sum.set(xs.map((x) => [x, y1(x) + y2(x)]));
      env.set(xs.map((x) => [x, 2 * a * Math.sin(k * (x - X0))]));
      env2.set(xs.map((x) => [x, -2 * a * Math.sin(k * (x - X0))]));
      nodes.forEach((d, i) => {
        d.visible(i <= n);
        d.set([X0 + (i * Lw) / n, 0]);
      });
    };
  },
};

// ---------------------------------------------------------------------------
// Heat: 1 kg of ice at −20 °C fed energy until it is steam
// ---------------------------------------------------------------------------
const STAGES = [
  // [energy at end (kJ), label, T at start, T at end]
  [42, 'ice warming', -20, 0],
  [376, 'melting', 0, 0],
  [794.6, 'water warming', 0, 100],
  [3050.6, 'boiling', 100, 100],
  [3090.8, 'steam warming', 100, 120],
];
const heat = (Q) => {
  let q0 = 0;
  for (const [q1, name, T0, T1] of STAGES) {
    if (Q <= q1) return { name, T: T0 + ((T1 - T0) * (Q - q0)) / (q1 - q0), frac: (Q - q0) / (q1 - q0) };
    q0 = q1;
  }
  return { name: 'steam warming', T: 120, frac: 1 };
};

export const heating_curve = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Stop exactly halfway through melting: half ice, half water, still 0 °C.',
  goal: (t) => Math.abs(t.Q - 209) <= 15,
  params: [{ key: 'Q', label: 'Energy fed in (kJ)', min: 0, max: 3090, step: 10, value: 0 }],
  beats: [
    { say: '1 kg of ice at −20 °C. Only 42 kJ warms it to 0 °C.', set: { Q: 40 } },
    { say: 'Now 334 kJ goes in and the thermometer does not move at all. That hidden, "latent" heat is pulling the crystal apart.', set: { Q: 300 } },
    { say: 'Boiling is the longest flat part by far: 2,256 kJ, more than five times what it took to heat the water from 0 to 100 °C.', set: { Q: 2000 } },
  ],
  readout: (t) => {
    const h = heat(t.Q);
    return [
      ['What is happening', h.name],
      ['Temperature', `${r1(h.T)} °C`],
      [h.name === 'melting' ? 'Melted so far' : h.name === 'boiling' ? 'Boiled away so far' : 'Phase', h.name === 'melting' || h.name === 'boiling' ? `${Math.round(h.frac * 100)}%` : h.name.split(' ')[0]],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 3100, 500], y: [-20, 120, 20], sx: 0.0031, sy: 0.05, origin: [-3.6, -2.6], xLabel: 'Q\\,(\\text{kJ})', yLabel: 'T\\,(^\\circ\\text{C})', xEvery: 1000, yEvery: 20 });
    const ghost = kit.line(range(0, 3090, 400).map((q) => P.toW(q, heat(q).T)), { color: C.grey, width: 2, opacity: 0.3, create: false });
    void ghost;
    const done = kit.line([], { color: C.red, width: 3.5, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    // the sample
    const bx = -6.2;
    const beaker = kit.line([[bx - 1.1, 1.4], [bx - 1.1, -1.6], [bx + 1.1, -1.6], [bx + 1.1, 1.4]], { color: C.axis, width: 2 });
    void beaker;
    const ice = kit.rect(0, 0, 0, 0, { color: 0xbfe6ff, opacity: 0.8, strokeColor: C.white, width: 1 });
    const water = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.45, stroke: false });
    const bubbles = Array.from({ length: 10 }, () => kit.dot([0, 0], { r: 0.07, color: C.white, opacity: 0.7 }));
    const steam = Array.from({ length: 8 }, () => kit.dot([0, 0], { r: 0.16, color: C.grey, opacity: 0.4 }));
    const flame = kit.fill([], { color: C.gold, opacity: 0.8 });
    const name = kit.label('', [bx, 2.4], { size: 18 });
    const temp = kit.label('', [bx, -2.4], { size: 18, color: C.red });
    return (p, _t, time) => {
      const h = heat(p.Q);
      done.set(range(0, p.Q, 300).map((q) => P.toW(q, heat(q).T)));
      dot.set(P.toW(p.Q, h.T));
      const melted = h.name === 'ice warming' ? 0 : h.name === 'melting' ? h.frac : 1;
      const left = h.name === 'boiling' ? 1 - h.frac : h.name === 'steam warming' ? 0 : 1;
      const s = 1.4 * Math.sqrt(1 - melted);
      ice.set(bx - s / 2, -1.6 + (melted > 0 ? 0.2 : 0), s, s).visible(melted < 1);
      water.set(bx - 1.08, -1.6, 2.16, Math.max(0.001, 1.0 * melted * left)).visible(melted > 0 && left > 0.01);
      const boiling = h.name === 'boiling';
      bubbles.forEach((b, i) => {
        b.visible(boiling && left > 0.05);
        const ph = (time * 0.8 + i / 10) % 1;
        b.set([bx - 0.9 + (i * 0.2) % 1.8, -1.55 + ph * Math.max(0.1, left)]);
      });
      steam.forEach((d, i) => {
        const on = boiling || h.name === 'steam warming';
        d.visible(on);
        const ph = (time * 0.4 + i / 8) % 1;
        d.set([bx - 0.8 + ((i * 0.37) % 1.6) + Math.sin(time + i) * 0.15, -0.4 + ph * 2.6]).opacity(0.45 * (1 - ph));
      });
      const fl = 0.25 + 0.05 * Math.sin(time * 9);
      flame.set([[bx - 0.5, -2.0], [bx, -2.0 + fl * 2.2], [bx + 0.5, -2.0]]);
      name.set(`\\text{${h.name}}`);
      temp.set(`${r1(h.T)}\\,^\\circ\\text{C}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Lenses: ray diagram for a converging lens
// ---------------------------------------------------------------------------
export const lens_rays = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Make an image exactly twice as big and upside down (magnification −2).',
  goal: (t) => Math.abs(t.d - t.f) > 0.2 && Math.abs(-(t.d * t.f) / (t.d - t.f) / t.d + 2) < 0.05,
  params: [
    { key: 'd', label: 'Object distance dₒ (cm)', min: 4, max: 30, step: 0.5, value: 25 },
    { key: 'f', label: 'Focal length f (cm)', min: 5, max: 15, step: 0.5, value: 10 },
  ],
  beats: [
    { say: 'Far away (beyond 2f), the image is small and upside down. A camera works like this.', set: { d: 25, f: 10 } },
    { say: 'Between f and 2f the image is bigger and still upside down. This is the first lens of a microscope.', set: { d: 15, f: 10 } },
    { say: 'Closer than f, the rays spread out after the lens. Your eye traces them back to a large upright image: a magnifying glass.', set: { d: 6, f: 10 } },
  ],
  readout: (t) => {
    if (Math.abs(t.d - t.f) < 0.2) return [['Image', 'at infinity: the rays come out parallel']];
    const di = (t.d * t.f) / (t.d - t.f);
    const m = -di / t.d;
    return [
      ['Image distance dᵢ', `${r1(di)} cm${di < 0 ? ' (same side: virtual)' : ''}`],
      ['Magnification m = −dᵢ/dₒ', r2(m)],
      ['Image is', `${Math.abs(m) > 1 ? 'bigger' : 'smaller'}, ${m < 0 ? 'upside down' : 'upright'}, ${di > 0 ? 'real (can be caught on a screen)' : 'virtual (only seen through the lens)'}`],
    ];
  },
  setup(kit) {
    const sx = 0.18;
    const sy = 0.42;
    const ox = -0.8;
    const W = (x, y) => [ox + x * sx, y * sy];
    const XMIN = -40;
    const XMAX = 48;
    const YM = 9.5;
    kit.line([W(XMIN, 0), W(XMAX, 0)], { color: C.axis, width: 1.5 });
    kit.line([[ox, -3.9], [ox, 3.9]], { color: C.blue, width: 3 });
    const lensFill = kit.fill(range(0, 2 * Math.PI, 40).map((q) => [ox + 0.22 * Math.cos(q), 3.9 * Math.sin(q)]), { color: C.blue, opacity: 0.25 });
    void lensFill;
    const F1 = kit.dot([0, 0], { r: 0.09, color: C.white });
    const F2 = kit.dot([0, 0], { r: 0.09, color: C.white });
    const lf1 = kit.label('F', [0, 0], { size: 14, color: '#8b949e' });
    const lf2 = kit.label('F', [0, 0], { size: 14, color: '#8b949e' });
    const obj = kit.arrow([0, 0], [0, 0], { color: C.green, width: 4, head: 0.28 });
    const img = kit.arrow([0, 0], [0, 0], { color: C.gold, width: 4, head: 0.28 });
    const rays = [C.yellow, C.pink, C.teal].map((color) => ({
      a: kit.line([], { color, width: 2, create: false }),
      b: kit.line([], { color, width: 2, create: false }),
      back: kit.line([], { color, width: 1.5, dashed: true, opacity: 0.6, create: false }),
    }));
    // a ray from (x0, y0) with slope m, cut off at the frame edge
    const cut = (x0, y0, m, x1) => {
      let x = x1;
      const y = y0 + m * (x1 - x0);
      if (Math.abs(y) > YM) x = x0 + ((Math.sign(y) * YM - y0) / m);
      return [W(x0, y0), W(x, y0 + m * (x - x0))];
    };
    const ho = 3;
    return (p) => {
      const { d, f } = p;
      F1.set(W(-f, 0));
      F2.set(W(f, 0));
      lf1.pos(W(-f, -1.1));
      lf2.pos(W(f, -1.1));
      obj.set(W(-d, 0), W(-d, ho));
      const inf = Math.abs(d - f) < 0.2;
      const di = inf ? Infinity : (d * f) / (d - f);
      const hi = inf ? 0 : (-di / d) * ho;
      // ray 1: parallel, then through the far focus
      const m1 = -ho / f;
      // ray 2: straight through the centre
      const m2 = -ho / d;
      // ray 3: through the near focus, then parallel
      const y3 = inf ? 0 : (ho * f) / (f - d);
      const segs = [
        [[W(-d, ho), W(0, ho)], cut(0, ho, m1, XMAX), m1, ho],
        [[W(-d, ho), W(0, 0)], cut(0, 0, m2, XMAX), m2, 0],
        inf || Math.abs(y3) > YM ? null : [[W(-d, ho), W(0, y3)], [W(0, y3), W(XMAX, y3)], 0, y3],
      ];
      segs.forEach((sg, i) => {
        const R = rays[i];
        R.a.visible(!!sg);
        R.b.visible(!!sg);
        if (!sg) return R.back.visible(false);
        R.a.set(sg[0]);
        R.b.set(sg[1]);
        const virtual = !inf && di < 0;
        R.back.visible(virtual);
        if (virtual) R.back.set([W(0, sg[3]), W(di, sg[3] + sg[2] * di)]);
      });
      const show = !inf && di > XMIN && di < XMAX && Math.abs(hi) < YM;
      img.visible(show);
      if (show) img.set(W(di, 0), W(di, hi));
    };
  },
};
