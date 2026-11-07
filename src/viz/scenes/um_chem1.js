import { C } from '../theme';
import { clamp, range } from '../kit';

const r2 = (v) => `${Math.round(v * 100) / 100}`.replace('-', '−');
const r1 = (v) => `${Math.round(v * 10) / 10}`.replace('-', '−');
const rnd = (a, b) => a + Math.random() * (b - a);
const sci = (v) => {
  const e = Math.floor(Math.log10(v));
  const m = v / 10 ** e;
  return `${Math.round(m * 10) / 10} × 10^${e}`.replace('-', '−');
};

// A box of bouncing particles, reused by several scenes.
function swarm(kit, max, color, r = 0.09) {
  const ps = Array.from({ length: max }, () => ({ x: 0, y: 0, vx: 0, vy: 0, on: false, d: kit.dot([0, 0], { r, color }).visible(false) }));
  return {
    ps,
    count(n, box, speed) {
      ps.forEach((p, i) => {
        if (i < n && !p.on) {
          const a = rnd(0, 2 * Math.PI);
          Object.assign(p, { x: rnd(box[0], box[2]), y: rnd(box[1], box[3]), vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, on: true });
        }
        if (i >= n) p.on = false;
        p.d.visible(p.on);
      });
    },
    step(dt, box, speed, onWall) {
      for (const p of ps) {
        if (!p.on) continue;
        const v = Math.hypot(p.vx, p.vy) || 1;
        p.vx *= speed / v;
        p.vy *= speed / v;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < box[0]) { p.x = box[0]; p.vx = Math.abs(p.vx); onWall?.('l'); }
        if (p.x > box[2]) { p.x = box[2]; p.vx = -Math.abs(p.vx); onWall?.('r'); }
        if (p.y < box[1]) { p.y = box[1]; p.vy = Math.abs(p.vy); onWall?.('b'); }
        if (p.y > box[3]) { p.y = box[3]; p.vy = -Math.abs(p.vy); onWall?.('t'); }
        p.d.set([p.x, p.y]);
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Gas laws: molecules in a cylinder with a piston
// ---------------------------------------------------------------------------
const kPa = (t) => (8.314 * t.n * t.T) / t.V;

export const gas_piston = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'With 0.1 mol of gas, set the piston and temperature to get 200 kPa (twice normal air pressure).',
  goal: (t) => t.n === 0.1 && Math.abs(kPa(t) - 200) < 2,
  params: [
    { key: 'V', label: 'Volume V (L)', min: 1, max: 4, step: 0.25, value: 2.5 },
    { key: 'T', label: 'Temperature T (K)', min: 100, max: 600, step: 10, value: 300 },
    { key: 'n', label: 'Amount n (mol)', min: 0.05, max: 0.2, step: 0.05, value: 0.1 },
  ],
  beats: [
    { say: '0.1 mol of gas at 300 K in 2.5 L: about 100 kPa, normal air pressure. Each flash on a wall is a molecule hitting it.', set: { V: 2.5, T: 300, n: 0.1 } },
    { say: 'Push the piston in to half the volume. The same molecules hit the walls twice as often: twice the pressure. That is Boyle’s law.', set: { V: 1.25, T: 300, n: 0.1 } },
    { say: 'Now double the temperature in kelvin. The molecules move faster and hit harder and more often: pressure doubles again.', set: { V: 1.25, T: 600, n: 0.1 } },
  ],
  readout: (t) => [
    ['P = nRT / V', `${r1(kPa(t))} kPa`],
    ['Compared with air (101 kPa)', `${r2(kPa(t) / 101.3)} ×`],
    ['Temperature', `${t.T} K = ${t.T - 273} °C`],
    ['Typical molecule speed (nitrogen)', `${Math.round(Math.sqrt((3 * 8.314 * t.T) / 0.028))} m/s`],
  ],
  setup(kit) {
    const X0 = -7.4;
    const Y0 = -2.6;
    const Y1 = 2.6;
    const H = Y1 - Y0;
    const wallL = kit.line([[X0, Y0], [X0, Y1]], { color: C.axis, width: 3 });
    void wallL;
    const body = kit.line([], { color: C.axis, width: 3, create: false });
    const piston = kit.rect(0, 0, 0, 0, { color: C.grey, opacity: 0.6, strokeColor: C.white, width: 2 });
    const rod = kit.line([[0, 0], [0, 0]], { color: C.grey, width: 6, create: false });
    const hitsL = kit.line([[X0, Y0], [X0, Y1]], { color: C.yellow, width: 6, opacity: 0, create: false });
    const hitsP = kit.line([[0, 0], [0, 0]], { color: C.yellow, width: 6, opacity: 0, create: false });
    const gas = swarm(kit, 60, C.blue, 0.08);
    const P = kit.plane({ x: [0, 4.5, 1], y: [0, 1000, 200], sx: 1.2, sy: 0.0062, origin: [2.0, -3.2], xLabel: 'V\\,(\\text{L})', yLabel: 'P\\,(\\text{kPa})', yEvery: 200 });
    const iso = kit.curve(() => 0, [0.6, 4.5], { plane: P, color: C.blue, width: 2.5, opacity: 0.8, clipY: [0, 1000] });
    const dot = kit.dot([0, 0], { r: 0.12, color: C.yellow });
    const lab = kit.label('', [4.6, 3.6], { size: 16, color: C.blue });
    let fl = 0;
    let fp = 0;
    let last = '';
    return (p, t, _time, dt) => {
      const xp = X0 + p.V * 2.0;
      body.set([[xp + 0.6, Y1], [X0, Y1], [X0, Y0], [xp + 0.6, Y0]]);
      piston.set(xp, Y0 + 0.02, 0.35, H - 0.04);
      rod.set([[xp + 0.35, 0], [xp + 2.0, 0]]);
      const N = Math.round(t.n * 300);
      const speed = 3.2 * Math.sqrt(p.T / 300);
      const box = [X0 + 0.1, Y0 + 0.1, xp - 0.1, Y1 - 0.1];
      gas.count(N, box, speed);
      gas.step(dt, box, speed, (w) => {
        if (w === 'l') fl = 1;
        if (w === 'r') fp = 1;
      });
      fl *= Math.exp(-dt * 8);
      fp *= Math.exp(-dt * 8);
      hitsL.opacity(fl * 0.7);
      hitsP.set([[xp, Y0], [xp, Y1]]).opacity(fp * 0.7);
      const key = `${t.n}|${t.T}`;
      if (key !== last) {
        last = key;
        iso.set((v) => (8.314 * t.n * t.T) / v);
        lab.set(`PV = ${r1(8.314 * t.n * t.T)}\\;(T = ${t.T}\\,\\text{K})`);
      }
      dot.set(P.toW(p.V, clamp((8.314 * p.n * p.T) / p.V, 0, 1000)));
    };
  },
};

// ---------------------------------------------------------------------------
// Gravimetric analysis: dissolve, precipitate, filter, dry, weigh
// ---------------------------------------------------------------------------
const STEPS = ['dissolve', 'precipitate', 'filter', 'dry', 'weigh'];
const PURITY = 0.8; // the sample is 80% salt, 20% sand-free filler
const grav = (m) => {
  const cl = m * PURITY * (35.45 / 58.44);
  return { cl, agcl: cl / 0.2474 };
};

export const gravimetric_steps = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Take a 0.50 g sample all the way to the balance, then work out its percent chlorine.',
  goal: (t) => t.step === 'weigh' && t.m === 0.5,
  params: [
    { key: 'step', label: 'Step', type: 'choice', value: 'dissolve', options: STEPS.map((s) => ({ value: s, label: s })) },
    { key: 'm', label: 'Sample mass (g)', min: 0.2, max: 1, step: 0.1, value: 0.5 },
  ],
  beats: [
    { say: 'A salt sample is weighed and dissolved in water. The chloride ions are now spread invisibly through the solution.', set: { step: 'dissolve' } },
    { say: 'Add silver nitrate. Every Ag⁺ that meets a Cl⁻ locks into white silver chloride, which sinks.', set: { step: 'precipitate' } },
    { say: 'Filter, wash and dry the solid until its mass stops changing.', set: { step: 'dry' } },
    { say: 'Weigh it. Multiply by 0.2474 to get the chlorine, divide by the sample mass, and you have the percent.', set: { step: 'weigh' } },
  ],
  readout: (t) => {
    const g = grav(t.m);
    const at = STEPS.indexOf(t.step);
    return [
      ['Sample', `${r2(t.m)} g`],
      ['AgCl weighed', at >= 4 ? `${g.agcl.toFixed(3)} g` : '(not weighed yet)'],
      ['Cl = AgCl × 0.2474', at >= 4 ? `${g.cl.toFixed(3)} g` : '…'],
      ['Percent chlorine', at >= 4 ? `${r1((g.cl / t.m) * 100)}%` : '…'],
    ];
  },
  setup(kit) {
    const B = [-4.5, -3.2];
    const beaker = kit.group();
    kit.line([[B[0] - 1.5, B[1] + 3.2], [B[0] - 1.5, B[1]], [B[0] + 1.5, B[1]], [B[0] + 1.5, B[1] + 3.2]], { color: C.axis, width: 2.5, parent: beaker });
    kit.rect(B[0] - 1.48, B[1], 2.96, 2.4, { color: C.blue, opacity: 0.18, stroke: false, parent: beaker });
    const ions = Array.from({ length: 30 }, (_, i) => ({ d: kit.dot([0, 0], { r: 0.06, color: i % 2 ? C.green : C.purple, parent: beaker }), x: rnd(-1.3, 1.3), y: rnd(0.2, 2.2), ph: rnd(0, 6) }));
    const ppt = Array.from({ length: 40 }, () => ({ d: kit.dot([0, 0], { r: 0.07, color: C.white, parent: beaker }), x: rnd(-1.3, 1.3), y0: rnd(0.4, 2.2), sp: rnd(0.4, 1) }));
    const crystals = Array.from({ length: 8 }, (_, i) => kit.dot([B[0] - 0.6 + i * 0.17, B[1] + 3.9], { r: 0.08, color: C.white, parent: beaker }));
    const dropper = kit.line([[B[0] + 0.8, B[1] + 4.6], [B[0] + 0.8, B[1] + 3.4]], { color: C.grey, width: 6, parent: beaker });
    const drop = kit.dot([0, 0], { r: 0.07, color: C.blue, parent: beaker });
    const funnel = kit.group();
    const F = [0.8, 0.3];
    kit.line([[F[0] - 1.6, F[1] + 2], [F[0], F[1]], [F[0] + 1.6, F[1] + 2]], { color: C.axis, width: 2.5, parent: funnel });
    kit.line([[F[0], F[1]], [F[0], F[1] - 1.2]], { color: C.axis, width: 2.5, parent: funnel });
    kit.fill([[F[0] - 1.3, F[1] + 1.7], [F[0], F[1] + 0.15], [F[0] + 1.3, F[1] + 1.7]], { color: C.white, opacity: 0.12, parent: funnel });
    const cake = kit.fill([[F[0] - 0.5, F[1] + 0.75], [F[0], F[1] + 0.2], [F[0] + 0.5, F[1] + 0.75]], { color: C.white, opacity: 0.9, parent: funnel });
    void cake;
    const drip = kit.dot([F[0], F[1] - 1.2], { r: 0.06, color: C.blue, parent: funnel });
    const oven = kit.group();
    kit.rect(0.2, -3.2, 3.6, 2.6, { color: C.red, opacity: 0.08, strokeColor: C.red, width: 2, parent: oven });
    kit.fill([[1.3, -2.6], [2.7, -2.6], [2.4, -2.0], [1.6, -2.0]], { color: C.grey, opacity: 0.7, parent: oven });
    kit.fill([[1.65, -2.05], [2.35, -2.05], [2.25, -1.85], [1.75, -1.85]], { color: C.white, opacity: 0.9, parent: oven });
    const waves = [0, 1, 2].map(() => kit.line([], { color: C.gold, width: 2, opacity: 0.7, create: false, parent: oven }));
    const scale = kit.group();
    kit.rect(-1.6, -3.4, 3.3, 0.9, { color: C.grey, opacity: 0.4, strokeColor: C.axis, width: 2, parent: scale });
    kit.line([[-1.2, -2.5], [1.3, -2.5]], { color: C.axis, width: 4, parent: scale });
    kit.fill([[-0.4, -2.5], [0.5, -2.5], [0.3, -2.05], [-0.2, -2.05]], { color: C.white, opacity: 0.85, parent: scale });
    const reading = kit.label('', [0.05, -2.95], { size: 18, color: C.green, parent: scale });
    const title = kit.label('', [0, 3.9], { size: 20 });
    let since = 0;
    let last = '';
    return (p, t, time, dt) => {
      if (t.step !== last) {
        last = t.step;
        since = 0;
      }
      since += dt;
      const at = STEPS.indexOf(t.step);
      title.set(`\\text{${at + 1}. ${t.step}}`);
      beaker.visible = at <= 1;
      funnel.visible = at === 2;
      oven.visible = at === 3;
      scale.visible = at === 4;
      // 1: crystals fall in and dissolve
      crystals.forEach((c, i) => {
        const y = B[1] + 3.9 - Math.min(since * 2, 1.6 + (i % 3) * 0.1);
        c.set([B[0] - 0.6 + i * 0.17, y]).opacity(at === 0 ? clamp(1 - (since - 1) * 0.7, 0, 1) : 0);
      });
      ions.forEach((o) => {
        o.d.set([B[0] + o.x + 0.1 * Math.sin(time * 1.3 + o.ph), B[1] + o.y + 0.1 * Math.cos(time + o.ph)]);
        o.d.visible(at === 0 ? since > 0.8 : at === 1 ? since < 2.5 : false);
      });
      dropper.visible(at === 1);
      drop.visible(at === 1);
      drop.set([B[0] + 0.8, B[1] + 3.3 - ((time * 1.5) % 1) * 1.0]);
      ppt.forEach((q) => {
        const y = Math.max(0.08, q.y0 - Math.max(0, since - 0.5) * q.sp);
        q.d.set([B[0] + q.x * (y < 0.1 ? 0.7 : 1), B[1] + y]).visible(at === 1 && since > 0.3);
      });
      drip.set([F[0], F[1] - 1.2 - ((time * 1.2) % 1) * 1.2]).visible(at === 2);
      waves.forEach((w, i) => w.set(range(0, 1, 20).map((s) => [1.4 + i * 0.6 + 0.12 * Math.sin(s * 12 + time * 6), -1.3 + s * 0.9])));
      reading.set(`${grav(p.m).agcl.toFixed(3)}\\,\\text{g}`);
    };
  },
};

// ---------------------------------------------------------------------------
// Solubility: potassium nitrate in 100 g of water
// ---------------------------------------------------------------------------
const SOL = [[0, 13.3], [20, 31.6], [40, 63.9], [60, 110], [80, 169], [100, 246]];
const sol = (T) => {
  for (let i = 1; i < SOL.length; i++) {
    if (T <= SOL[i][0]) {
      const [a, sa] = SOL[i - 1];
      const [b, sb] = SOL[i];
      return sa + ((sb - sa) * (T - a)) / (b - a);
    }
  }
  return 246;
};

export const solubility_beaker = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Dissolve 100 g at a high temperature, then cool it until crystals appear.',
  goal: (t, seen) => t.g === 100 && sol(t.T) < t.g && [...(seen.T || [])].some((T) => sol(T) >= 100),
  params: [
    { key: 'g', label: 'Potassium nitrate added (g)', min: 0, max: 200, step: 10, value: 40 },
    { key: 'T', label: 'Temperature (°C)', min: 0, max: 100, step: 5, value: 20 },
  ],
  beats: [
    { say: 'At 20 °C, 100 g of water holds only about 32 g of potassium nitrate. The rest lies on the bottom: the solution is saturated.', set: { g: 40, T: 20 } },
    { say: 'Heat it to 60 °C and it can hold 110 g. Even 100 g vanishes.', set: { g: 100, T: 60 } },
    { say: 'Cool it back down and the extra comes out as crystals. Growing crystals this way is how chemists purify solids.', set: { g: 100, T: 30 } },
  ],
  readout: (t) => {
    const s = sol(t.T);
    return [
      ['Solubility at this temperature', `${r1(s)} g per 100 g water`],
      ['Dissolved', `${r1(Math.min(t.g, s))} g`],
      ['Undissolved crystals', `${r1(Math.max(0, t.g - s))} g`],
      ['State', t.g < s - 0.5 ? 'unsaturated' : 'saturated'],
    ];
  },
  setup(kit) {
    const B = [-4.6, -3.0];
    kit.line([[B[0] - 2, B[1] + 5], [B[0] - 2, B[1]], [B[0] + 2, B[1]], [B[0] + 2, B[1] + 5]], { color: C.axis, width: 2.5 });
    const water = kit.rect(B[0] - 1.98, B[1], 3.96, 3.8, { color: C.blue, opacity: 0.16, stroke: false });
    void water;
    const ions = Array.from({ length: 70 }, (_, i) => ({ d: kit.dot([0, 0], { r: 0.06, color: i % 2 ? C.gold : C.purple }), x: rnd(-1.8, 1.8), y: rnd(0.2, 3.6), ph: rnd(0, 6) }));
    const xtal = kit.fill([], { color: C.white, opacity: 0.85 });
    const therm = kit.rect(B[0] + 2.4, B[1], 0.25, 4, { color: C.grey, opacity: 0.2, strokeColor: C.axis, width: 1 });
    void therm;
    const merc = kit.rect(0, 0, 0, 0, { color: C.red, opacity: 0.85, stroke: false });
    const P = kit.plane({ x: [0, 100, 20], y: [0, 250, 50], sx: 0.068, sy: 0.026, origin: [0.6, -3.3], xLabel: 'T\\,(^\\circ\\text{C})', yLabel: '\\text{g / 100 g water}', yEvery: 50 });
    kit.curve(sol, [0, 100], { plane: P, color: C.blue, width: 3 });
    kit.label('\\text{saturated: crystals}', P.toW(25, 200), { size: 14, color: '#8b949e' });
    kit.label('\\text{all dissolves}', P.toW(80, 40), { size: 14, color: '#8b949e' });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow });
    return (p, _t, time) => {
      const s = sol(p.T);
      const dis = Math.min(p.g, s);
      const extra = Math.max(0, p.g - s);
      const nIon = Math.round((dis / 200) * 70);
      ions.forEach((o, i) => {
        o.d.visible(i < nIon);
        o.d.set([B[0] + o.x + 0.12 * Math.sin(time * 2 + o.ph), B[1] + o.y + 0.12 * Math.cos(time * 1.7 + o.ph)]);
      });
      const h = 0.1 + 0.02 * extra;
      xtal.set(extra > 0.5 ? [[B[0] - 1.5, B[1] + 0.02], [B[0] + 1.5, B[1] + 0.02], [B[0] + 1.1, B[1] + h], [B[0] + 0.2, B[1] + h * 1.3], [B[0] - 0.8, B[1] + h * 0.9]] : []);
      merc.set(B[0] + 2.45, B[1] + 0.05, 0.15, 0.2 + (p.T / 100) * 3.7);
      dot.set(P.toW(p.T, p.g));
      dot.color(p.g > s ? C.red : C.green);
    };
  },
};

// ---------------------------------------------------------------------------
// Reaction rates: A + B → C by collisions
// ---------------------------------------------------------------------------
const success = (T) => Math.min(1, 0.12 * Math.exp(6445 * (1 / 300 - 1 / T)));

export const reaction_collisions = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Raise the temperature from 300 K to 320 K: each collision becomes about 4 times as likely to react.',
  goal: (t) => t.T >= 320,
  params: [
    { key: 'T', label: 'Temperature (K)', min: 280, max: 360, step: 10, value: 300 },
    { key: 'n', label: 'Starting particles of each (A and B)', min: 10, max: 40, step: 5, value: 25 },
  ],
  beats: [
    { say: 'Blue A and red B wander and bump into each other. Only a few collisions are hard enough to react and make gold C.', set: { T: 300, n: 25 } },
    { say: 'Crowd in more particles: collisions happen more often, so the reaction runs faster at the start.', set: { T: 300, n: 40 } },
    { say: 'Heat it by 30 K. Particles move faster, and far more of their collisions clear the activation energy.', set: { T: 330, n: 25 } },
  ],
  readout: (t) => [
    ['Collisions that react', `${r1(success(t.T) * 100)}%`],
    ['Compared with 300 K', `${r1(success(t.T) / success(300))} ×`],
    ['Activation energy', '≈ 54 kJ/mol (doubles every 10 K near room temperature)'],
  ],
  setup(kit) {
    const box = [-7.5, -3.6, -0.5, 3.6];
    kit.rect(box[0] - 0.15, box[1] - 0.15, box[2] - box[0] + 0.3, box[3] - box[1] + 0.3, { color: C.grey, opacity: 0.05, strokeColor: C.axis, width: 2 });
    const A = swarm(kit, 40, C.blue, 0.11);
    const Bs = swarm(kit, 40, C.red, 0.11);
    const Cs = Array.from({ length: 40 }, () => kit.dot([0, 0], { r: 0.13, color: C.gold }).visible(false));
    const flashes = Array.from({ length: 6 }, () => ({ d: kit.dot([0, 0], { r: 0.3, color: C.yellow, opacity: 0 }), a: 0 }));
    const P = kit.plane({ x: [0, 20, 5], y: [0, 40, 10], sx: 0.33, sy: 0.16, origin: [0.6, -3.2], xLabel: 't\\,(\\text{s})', yLabel: '\\text{A left}', yEvery: 10 });
    const trace = kit.line([], { color: C.blue, width: 3, create: false });
    let clock = 0;
    let last = '';
    let hist = [];
    let made = [];
    let fi = 0;
    return (p, t, _time, dt) => {
      const key = `${t.T}|${t.n}`;
      if (key !== last || clock > 20) {
        last = key;
        clock = 0;
        hist = [];
        made = [];
        A.ps.forEach((q) => (q.on = false));
        Bs.ps.forEach((q) => (q.on = false));
        A.count(t.n, box, 1);
        Bs.count(t.n, box, 1);
      }
      clock += dt;
      const speed = 2.4 * Math.sqrt(t.T / 300);
      A.step(dt, box, speed);
      Bs.step(dt, box, speed);
      for (const a of A.ps) {
        if (!a.on) continue;
        for (const b of Bs.ps) {
          if (!b.on || Math.hypot(a.x - b.x, a.y - b.y) > 0.22) continue;
          if (Math.random() < success(t.T)) {
            a.on = false;
            b.on = false;
            a.d.visible(false);
            b.d.visible(false);
            made.push([(a.x + b.x) / 2, (a.y + b.y) / 2, rnd(-0.3, 0.3), rnd(-0.3, 0.3)]);
            const f = flashes[fi++ % flashes.length];
            f.a = 1;
            f.d.set([a.x, a.y]);
          } else {
            // bounce apart
            const nx = (a.x - b.x) || 0.01;
            const ny = (a.y - b.y) || 0.01;
            a.vx = nx; a.vy = ny; b.vx = -nx; b.vy = -ny;
          }
          break;
        }
      }
      made.forEach((m, i) => {
        m[0] = clamp(m[0] + m[2] * dt, box[0], box[2]);
        m[1] = clamp(m[1] + m[3] * dt, box[1], box[3]);
        Cs[i].visible(true).set([m[0], m[1]]);
      });
      for (let i = made.length; i < Cs.length; i++) Cs[i].visible(false);
      flashes.forEach((f) => {
        f.a *= Math.exp(-dt * 5);
        f.d.opacity(f.a * 0.6);
      });
      hist.push([clock, A.ps.filter((q) => q.on).length]);
      trace.set(hist.map(([s, v]) => P.toW(Math.min(s, 20), v)));
    };
  },
};

// ---------------------------------------------------------------------------
// Equilibrium: A ⇌ B flipping both ways until the rates balance
// ---------------------------------------------------------------------------
export const equilibrium_flow = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Set K = 4, let it settle, then dump in extra A and watch more B form.',
  goal: (t) => t.K === '4' && t.add === 'yes',
  params: [
    { key: 'K', label: 'Equilibrium constant K', type: 'choice', value: '1', options: [{ value: '0.25', label: '0.25' }, { value: '1', label: '1' }, { value: '4', label: '4' }] },
    { key: 'add', label: 'Extra A added', type: 'choice', value: 'no', options: [{ value: 'no', label: 'no' }, { value: 'yes', label: 'add 30 A' }] },
  ],
  beats: [
    { say: 'Start with 60 particles of A. Each can turn into B, and each B can turn back. With K = 1 they settle at about half and half.', set: { K: '1', add: 'no' } },
    { say: 'With K = 4, the forward change is four times as likely: they settle at about 80% B. Particles still switch; the totals just stop changing.', set: { K: '4', add: 'no' } },
    { say: 'Add 30 more A. The balance is upset, so extra B forms until B : A is back to 4 : 1. That is Le Chatelier’s principle.', set: { K: '4', add: 'yes' } },
  ],
  readout: (t) => {
    const K = Number(t.K);
    const N = t.add === 'yes' ? 90 : 60;
    return [
      ['K = [B] / [A] at balance', t.K],
      ['Expected at balance', `${Math.round(N / (1 + K))} A : ${Math.round((N * K) / (1 + K))} B`],
      ['Share that ends as B', `${Math.round((K / (1 + K)) * 100)}%`],
    ];
  },
  setup(kit) {
    const box = [-7.5, -3.6, -0.6, 3.6];
    kit.rect(box[0] - 0.15, box[1] - 0.15, box[2] - box[0] + 0.3, box[3] - box[1] + 0.3, { color: C.grey, opacity: 0.05, strokeColor: C.axis, width: 2 });
    const parts = Array.from({ length: 90 }, () => ({ x: rnd(box[0], box[2]), y: rnd(box[1], box[3]), vx: rnd(-1, 1), vy: rnd(-1, 1), b: false, on: false, d: kit.dot([0, 0], { r: 0.1, color: C.blue }).visible(false) }));
    const P = kit.plane({ x: [0, 20, 5], y: [0, 90, 15], sx: 0.33, sy: 0.07, origin: [0.6, -3.3], xLabel: 't\\,(\\text{s})', yEvery: 30 });
    const tA = kit.line([], { color: C.blue, width: 3, create: false });
    const tB = kit.line([], { color: C.gold, width: 3, create: false });
    kit.label('A', [7.6, 2.8], { size: 18, color: C.blue });
    kit.label('B', [7.6, 2.2], { size: 18, color: C.gold });
    let clock = 0;
    let lastK = '';
    let lastAdd = 'no';
    let hA = [];
    let hB = [];
    return (_p, t, _time, dt) => {
      if (t.K !== lastK || clock > 20) {
        lastK = t.K;
        clock = 0;
        hA = [];
        hB = [];
        parts.forEach((q, i) => {
          q.on = i < (t.add === 'yes' ? 90 : 60);
          q.b = false;
        });
        lastAdd = t.add;
      }
      if (t.add !== lastAdd) {
        lastAdd = t.add;
        parts.forEach((q, i) => {
          if (i >= 60) {
            q.on = t.add === 'yes';
            q.b = false;
          }
        });
      }
      clock += dt;
      const K = Number(t.K);
      const kb = 0.5 / (1 + K);
      const kf = K * kb;
      let na = 0;
      let nb = 0;
      for (const q of parts) {
        q.d.visible(q.on);
        if (!q.on) continue;
        if (Math.random() < (q.b ? kb : kf) * dt) {
          q.b = !q.b;
        }
        q.d.color(q.b ? C.gold : C.blue);
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        if (q.x < box[0] || q.x > box[2]) q.vx *= -1;
        if (q.y < box[1] || q.y > box[3]) q.vy *= -1;
        q.x = clamp(q.x, box[0], box[2]);
        q.y = clamp(q.y, box[1], box[3]);
        q.d.set([q.x, q.y]);
        if (q.b) nb++;
        else na++;
      }
      hA.push(P.toW(clock, na));
      hB.push(P.toW(clock, nb));
      tA.set(hA);
      tB.set(hB);
    };
  },
};

// ---------------------------------------------------------------------------
// pH: a power-of-ten scale for hydrogen ions
// ---------------------------------------------------------------------------
const UI = [0xd7263d, 0xe8452c, 0xf26b1d, 0xf79a1f, 0xf8c630, 0xe9de3a, 0xb6d43c, 0x59b947, 0x2aa776, 0x1f8f9a, 0x2b6cb0, 0x3949ab, 0x5b3ea8, 0x6d2f9a, 0x7b2287];
const uiColor = (pH) => UI[clamp(Math.round(pH), 0, 14)];
const THINGS = [
  [0.5, 'battery acid'], [1.5, 'stomach acid'], [2.2, 'calamansi'], [2.9, 'vinegar'], [4.5, 'tomato'], [5.6, 'rain'],
  [7, 'pure water'], [7.4, 'blood'], [8.1, 'seawater'], [9, 'baking soda'], [10, 'soap'], [11.5, 'ammonia'], [12.5, 'wet concrete'], [13.8, 'drain cleaner'],
];

export const ph_scale = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the pH with exactly 1,000 times more H⁺ than pure water.',
  goal: (t) => t.pH === 4,
  params: [{ key: 'pH', label: 'pH', min: 0, max: 14, step: 0.5, value: 7 }],
  beats: [
    { say: 'Pure water, pH 7: hydrogen ions and hydroxide ions are equal, 10⁻⁷ mol/L each.', set: { pH: 7 } },
    { say: 'Calamansi juice, about pH 2: 100,000 times more H⁺ than water. Five steps, five factors of ten.', set: { pH: 2 } },
    { say: 'Wet concrete, about pH 12.5: almost no H⁺ and lots of OH⁻. This alkaline coat is what stops the steel bars inside from rusting.', set: { pH: 12.5 } },
  ],
  readout: (t) => {
    const h = 10 ** -t.pH;
    const oh = 10 ** -(14 - t.pH);
    return [
      ['[H⁺]', `${sci(h)} mol/L`],
      ['[OH⁻]', `${sci(oh)} mol/L`],
      ['H⁺ compared with pure water', h >= 1e-7 ? `${Math.round(h / 1e-7).toLocaleString()} ×` : `1/${Math.round(1e-7 / h).toLocaleString()}`],
      ['Type', t.pH < 7 ? 'acidic' : t.pH > 7 ? 'basic (alkaline)' : 'neutral'],
    ];
  },
  setup(kit) {
    const x0 = -7;
    const w = 14 / 15;
    UI.forEach((c, i) => kit.rect(x0 + i * w, -0.4, w, 0.8, { color: c, opacity: 0.9, stroke: false }));
    for (let i = 0; i <= 14; i++) kit.label(`${i}`, [x0 + (i + 0.5) * w, -0.75], { size: 13, color: '#8b949e' });
    THINGS.forEach(([v, name], i) => {
      const x = x0 + (v + 0.5) * w;
      const up = i % 2 === 0;
      kit.line([[x, up ? 0.45 : -1.0], [x, up ? 0.9 + (i % 4 === 0 ? 0.6 : 0) : -1.45 - (i % 4 === 1 ? 0.6 : 0)]], { color: C.grey, width: 1, opacity: 0.5 });
      kit.label(`\\text{${name}}`, [x, up ? 1.15 + (i % 4 === 0 ? 0.6 : 0) : -1.7 - (i % 4 === 1 ? 0.6 : 0)], { size: 12, color: '#c9d1d9' });
    });
    const marker = kit.fill([], { color: C.white, opacity: 1 });
    const flask = kit.fill([], { color: C.blue, opacity: 0.75 });
    kit.line([[-6.2, -4.2], [-5.4, -2.9], [-5.4, -2.4], [-4.6, -2.4], [-4.6, -2.9], [-3.8, -4.2], [-6.2, -4.2]], { color: C.axis, width: 2 });
    const hBar = kit.rect(0, 0, 0, 0, { color: C.red, opacity: 0.8, stroke: false });
    const ohBar = kit.rect(0, 0, 0, 0, { color: C.blue, opacity: 0.8, stroke: false });
    kit.label('[\\text{H}^+]', [-1.2, -3.0], { size: 15, color: C.red, align: 'right' });
    kit.label('[\\text{OH}^-]', [-1.2, -3.8], { size: 15, color: C.blue, align: 'right' });
    kit.label('\\text{bar length = power of ten (each step is 10}\\times\\text{)}', [3.8, -2.45], { size: 12, color: '#8b949e' });
    const big = kit.label('', [0, 3.6], { size: 26 });
    return (p) => {
      const x = x0 + (p.pH + 0.5) * w;
      marker.set([[x - 0.2, 0.85], [x + 0.2, 0.85], [x, 0.45]]);
      flask.set([[-6.1, -4.15], [-5.35, -2.95], [-4.65, -2.95], [-3.9, -4.15]]);
      flask.color(uiColor(p.pH));
      // bar length ∝ log10 of concentration (from 10⁻¹⁴ up to 1)
      hBar.set(-1, -3.15, (14 - p.pH) * 0.55, 0.32);
      ohBar.set(-1, -3.95, p.pH * 0.55, 0.32);
      big.set(`\\text{pH} = ${r1(p.pH)}`);
    };
  },
};
