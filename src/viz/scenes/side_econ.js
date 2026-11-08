// Scenes for the Economics side topic.
import { C } from '../theme';
import { range } from '../kit';

const peso = (v) => `₱${Math.round(v).toLocaleString('en-US')}`;
const r2 = (v) => `${Math.round(v * 100) / 100}`;
const near = (a, b) => Math.abs(a - b) < 1e-6;

// ---------------------------------------------------------------------------
// Smith's pin factory: 18 operations shared among n workers
// ---------------------------------------------------------------------------
// Pins per worker per day when each does k of the 18 operations. Fitted to
// Smith's two figures: 20 a day alone (k = 18) and 4800 a day with 10 workers (k = 2).
const pinsEach = (k) => 20 * (18 / k) ** 2.5;
const pinTeam = (n) => n * pinsEach(Math.ceil(18 / n));
export const pin_factory = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the smallest team that makes at least 40,000 pins a day when the 18 steps are shared out.',
  goal: (t) => Math.round(t.n) === 9,
  params: [{ key: 'n', label: 'Workers', min: 1, max: 10, step: 1, value: 1 }],
  beats: [
    { say: 'One worker doing all 18 steps: about 20 pins a day, as Smith said.', set: { n: 1 } },
    { say: 'Three workers, six steps each: each is far quicker at fewer steps.', set: { n: 3 } },
    { say: 'Ten workers, two steps each: about 48,000 pins a day, Smith’s figure. Working alone the same ten would make 200.', set: { n: 10 } },
  ],
  readout: (p) => {
    const n = Math.round(p.n);
    return [
      ['Steps per worker', `${Math.ceil(18 / n)} of 18`],
      ['Shared out', `${Math.round(pinTeam(n)).toLocaleString('en-US')} pins a day`],
      ['Each alone', `${20 * n} pins a day`],
      ['Gain', `${Math.round(pinTeam(n) / (20 * n))}×`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 2, 1], y: [1, 5, 1], sx: 2.4, sy: 1.5, origin: [0.6, -4.6], axisAt: [0, 1], xEvery: 9, yEvery: 1, fmt: (v, ax) => (ax === 'y' ? `${10 ** v}`.replace(/(\d)(?=(\d{3})+$)/g, '$1,') : ''), yLabel: '\\text{pins a day (log)}' });
    const alone = kit.rect(0, 0, 1.4, 0, { color: C.grey, strokeColor: C.grey });
    const split = kit.rect(0, 0, 1.4, 0, { color: C.gold, strokeColor: C.gold });
    kit.label('\\text{alone}', [...P.toW(0.5, 1)].map((v, i) => (i ? v - 0.35 : v + 0.7)), { size: 13 });
    kit.label('\\text{shared}', [...P.toW(1.5, 1)].map((v, i) => (i ? v - 0.35 : v + 0.7)), { size: 13 });
    kit.line([P.toW(0, Math.log10(40000)), P.toW(2.2, Math.log10(40000))], { color: C.green, width: 1.5, dashed: true });
    kit.label('\\text{40,000}', [...P.toW(2.2, Math.log10(40000))].map((v, i) => (i ? v + 0.25 : v + 0.4)), { size: 12, color: C.green });
    const people = range(0, 9, 10).map((i) => kit.dot([-7 + (i % 5) * 1.1, 1.8 - Math.floor(i / 5) * 1.3], { r: 0.28, color: C.blue }));
    const tags = range(0, 9, 10).map((i) => kit.label('', [-7 + (i % 5) * 1.1, 1.25 - Math.floor(i / 5) * 1.3], { size: 11, tex: false }));
    kit.label('\\text{the workshop: each dot is a worker}', [-4.8, 3.3], { size: 13 });
    return (p) => {
      const n = Math.round(p.n);
      const k = Math.ceil(18 / n);
      people.forEach((d, i) => d.visible(i < n));
      tags.forEach((t, i) => t.set(i < n ? `${Math.min(18, i * k + 1)}–${Math.min(18, (i + 1) * k)}` : ''));
      const base = P.toW(0, 1);
      const a = P.toW(0.2, Math.log10(20 * n));
      const s = P.toW(1.2, Math.log10(pinTeam(n)));
      alone.set(a[0], base[1], 1.4, a[1] - base[1]);
      split.set(s[0], base[1], 1.4, s[1] - base[1]).color(pinTeam(n) >= 40000 ? C.green : C.gold);
    };
  },
};

// ---------------------------------------------------------------------------
// Supply and demand
// ---------------------------------------------------------------------------
const eqm = (D, S) => ({ Q: (80 + D - S) / 2, P: (120 + D + S) / 2 });
export const supply_demand = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'A typhoon makes nickel harder to supply. With demand unchanged, shift supply until the price reaches 75.',
  goal: (t) => near(t.D, 0) && near(t.S, 30),
  params: [
    { key: 'S', label: 'Supply shift up (costlier to supply)', min: 0, max: 40, step: 5, value: 0 },
    { key: 'D', label: 'Demand shift (more buyers)', min: -20, max: 20, step: 5, value: 0 },
  ],
  beats: [
    { say: 'Demand slopes down, supply slopes up. They cross at a price of 60 and 40 units.', set: { S: 0, D: 0 } },
    { say: 'Mines close: supply shifts up by 20. The price rises to 70 and less is sold.', set: { S: 20, D: 0 } },
    { say: 'Battery makers want more nickel too: demand shifts right. The price climbs to 80.', set: { S: 20, D: 20 } },
  ],
  readout: (p) => {
    const e = eqm(p.D, p.S);
    return [
      ['Price', r2(e.P)],
      ['Quantity', r2(e.Q)],
      ['Demand', `P = ${100 + Math.round(p.D)} − Q`],
      ['Supply', `P = ${20 + Math.round(p.S)} + Q`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 100, 10], y: [0, 140, 20], sx: 0.12, sy: 0.055, origin: [-6, -3.8], axisAt: [0, 0], xEvery: 20, yEvery: 20, xLabel: '\\text{quantity}', yLabel: '\\text{price}' });
    const dem = kit.curve((q) => 100 - q, [0, 100], { plane: P, color: C.blue, width: 3 });
    const sup = kit.curve((q) => 20 + q, [0, 100], { plane: P, color: C.gold, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.15, color: C.white, z: 6 });
    const hx = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    const vx = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    kit.label('\\text{demand}', [4.6, -2.0], { size: 13, color: C.blue });
    kit.label('\\text{supply}', [5.2, 3.0], { size: 13, color: C.gold });
    return (p) => {
      dem.set((q) => Math.max(0, 100 + p.D - q));
      sup.set((q) => Math.min(140, 20 + p.S + q));
      const e = eqm(p.D, p.S);
      dot.set(P.toW(e.Q, e.P));
      hx.set([P.toW(0, e.P), P.toW(e.Q, e.P)]);
      vx.set([P.toW(e.Q, 0), P.toW(e.Q, e.P)]);
    };
  },
};

// ---------------------------------------------------------------------------
// Ricardo: England and Portugal, cloth and wine
// ---------------------------------------------------------------------------
const world = (eng, por) => ({
  cloth: (220 * eng) / 100 + (170 * (1 - por)) / 90,
  wine: (220 * (1 - eng)) / 120 + (170 * por) / 80,
});
export const comparative_advantage = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Split each country’s workers so that the world makes MORE than 2 units of cloth AND more than 2 of wine.',
  goal: (t) => {
    const w = world(t.eng, t.por);
    return w.cloth > 2.005 && w.wine > 2.005;
  },
  params: [
    { key: 'eng', label: 'England: share of workers on cloth', min: 0, max: 1, step: 0.05, value: 0.45 },
    { key: 'por', label: 'Portugal: share of workers on wine', min: 0, max: 1, step: 0.05, value: 0.45 },
  ],
  beats: [
    { say: 'No trade: each country makes one unit of each, so the world has 2 cloth and 2 wine.', set: { eng: 0.45, por: 0.45 } },
    { say: 'England puts everyone on cloth: plenty of cloth, but the world’s wine falls short.', set: { eng: 1, por: 0.45 } },
    { say: 'Portugal puts everyone on wine: plenty of wine, but now cloth falls short. Can both bars clear the line at once?', set: { eng: 0.45, por: 1 } },
  ],
  readout: (p) => {
    const w = world(p.eng, p.por);
    return [
      ['World cloth', r2(w.cloth)],
      ['World wine', r2(w.wine)],
      ['England (220 workers)', `${Math.round(220 * p.eng)} on cloth, ${Math.round(220 * (1 - p.eng))} on wine`],
      ['Portugal (170 workers)', `${Math.round(170 * (1 - p.por))} on cloth, ${Math.round(170 * p.por)} on wine`],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 4, 1], y: [0, 3, 0.5], sx: 2.6, sy: 2.2, origin: [-5.5, -3.4], axisAt: [0, 0], xEvery: 9, yEvery: 0.5, yLabel: '\\text{units}' });
    const mk = (x, c) => kit.rect(...P.toW(x, 0), 1.6, 0, { color: c, strokeColor: c });
    const ec = mk(0.3, C.blue);
    const pc = mk(0.3, C.green);
    const ew = mk(2.3, C.blue);
    const pw = mk(2.3, C.green);
    kit.line([P.toW(0, 2), P.toW(4, 2)], { color: C.yellow, width: 1.5, dashed: true });
    kit.label('\\text{no-trade total}', [...P.toW(4, 2)].map((v, i) => (i ? v + 0.25 : v + 0.2)), { size: 12, color: C.yellow });
    kit.label('\\text{cloth}', [...P.toW(0.6, 0)].map((v, i) => (i ? v - 0.35 : v)), { size: 14 });
    kit.label('\\text{wine}', [...P.toW(2.6, 0)].map((v, i) => (i ? v - 0.35 : v)), { size: 14 });
    kit.label('\\text{blue: England}', [5.6, 2.6], { size: 13, color: C.blue });
    kit.label('\\text{green: Portugal}', [5.6, 2.0], { size: 13, color: C.green });
    return (p) => {
      const eC = (220 * p.eng) / 100;
      const pC = (170 * (1 - p.por)) / 90;
      const eW = (220 * (1 - p.eng)) / 120;
      const pW = (170 * p.por) / 80;
      const b = P.toW(0, 0)[1];
      const h = (v) => P.toW(0, v)[1] - b;
      ec.set(P.toW(0.3, 0)[0], b, 1.6, h(eC));
      pc.set(P.toW(0.3, 0)[0], b + h(eC), 1.6, h(pC));
      ew.set(P.toW(2.3, 0)[0], b, 1.6, h(eW));
      pw.set(P.toW(2.3, 0)[0], b + h(eW), 1.6, h(pW));
    };
  },
};

// ---------------------------------------------------------------------------
// Marginal product and the wage
// ---------------------------------------------------------------------------
const mp = (L) => 62 - 4 * L;
const profit = (L, w) => 10 * (60 * L - 2 * L * L) - w * L;
export const marginal_product = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Set the wage to ₱280 a day and find the number of workers that makes the most profit.',
  goal: (t) => t.w === '280' && Math.round(t.L) === 8,
  params: [
    { key: 'w', label: 'Daily wage', type: 'choice', value: '200', options: [{ value: '120', label: '₱120' }, { value: '200', label: '₱200' }, { value: '280', label: '₱280' }, { value: '360', label: '₱360' }] },
    { key: 'L', label: 'Workers hired', min: 0, max: 15, step: 1, value: 4 },
  ],
  beats: [
    { say: 'Each bar is what one more worker adds, in pesos. The first adds ₱580; each later one adds ₱40 less.', set: { w: '200', L: 4 } },
    { say: 'Keep hiring while the next bar is above the wage line. At ₱200 that is 10 workers.', set: { w: '200', L: 10 } },
    { say: 'An 11th worker adds only ₱180 but costs ₱200: profit falls.', set: { w: '200', L: 11 } },
  ],
  readout: (p) => {
    const L = Math.round(p.L);
    const w = Number(p.w);
    return [
      ['Output', `${60 * L - 2 * L * L} castings`],
      ['Last worker adds', L ? peso(10 * mp(L)) : '—'],
      ['Wage', peso(w)],
      ['Profit per day', peso(profit(L, w))],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 15.5, 1], y: [0, 600, 100], sx: 0.8, sy: 0.011, origin: [-6.2, -3.6], axisAt: [0, 0], xEvery: 5, yEvery: 100, xLabel: '\\text{worker number}', yLabel: '\\text{pesos added}' });
    const bars = range(1, 15, 15).map((i) => {
      const [x, y] = P.toW(i - 0.4, 0);
      return kit.rect(x, y, 0.64, P.toW(0, 10 * mp(i))[1] - y, { color: C.grey, strokeColor: C.grey });
    });
    const wl = kit.line([], { color: C.red, width: 2.5, create: false });
    const wlab = kit.label('', [0, 0], { size: 13, tex: false, color: C.red });
    return (p) => {
      const L = Math.round(p.L);
      const w = Number(p.w);
      bars.forEach((b, i) => {
        const n = i + 1;
        const c = n > L ? 0x2a3440 : 10 * mp(n) >= w ? C.green : C.red;
        b.color(c);
      });
      wl.set([P.toW(0, w), P.toW(15.5, w)]);
      wlab.set(`wage ₱${w}`).pos([...P.toW(13, w)].map((v, i) => (i ? v + 0.3 : v)));
    };
  },
};

// ---------------------------------------------------------------------------
// Inflation eats ₱1000
// ---------------------------------------------------------------------------
const worth = (r, t) => 1000 / (1 + r / 100) ** t;
export const inflation_erosion = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the yearly inflation rate at which ₱1000 buys only half as much after 10 years.',
  goal: (t) => Math.round(t.t) === 10 && Math.abs(worth(t.r, 10) - 500) < 15,
  params: [
    { key: 'r', label: 'Inflation per year (%)', min: 0, max: 20, step: 1, value: 3 },
    { key: 't', label: 'Years from now', min: 0, max: 30, step: 1, value: 10 },
  ],
  beats: [
    { say: 'At 3% a year, after 10 years ₱1000 buys what ₱744 buys today.', set: { r: 3, t: 10 } },
    { say: 'At 10%, it halves in about 7 years: the rule of 70.', set: { r: 10, t: 7 } },
    { say: 'At 20%, after 30 years ₱1000 is worth about ₱4 in today’s money.', set: { r: 20, t: 30 } },
  ],
  readout: (p) => [
    ['Buys what today costs', peso(worth(p.r, Math.round(p.t)))],
    ['Prices multiplied by', `${r2((1 + p.r / 100) ** Math.round(p.t))}×`],
    ['Years to halve (rule of 70)', p.r > 0 ? `about ${r2(70 / p.r)}` : 'never'],
  ],
  setup(kit) {
    const P = kit.plane({ x: [0, 30, 5], y: [0, 1000, 250], sx: 0.42, sy: 0.0068, origin: [-6.3, -3.5], axisAt: [0, 0], xEvery: 5, yEvery: 250, xLabel: '\\text{years}', yLabel: '\\text{pesos, today’s prices}' });
    kit.line([P.toW(0, 500), P.toW(30, 500)], { color: C.grey, width: 1, dashed: true });
    const c = kit.curve((x) => worth(3, x), [0, 30], { plane: P, color: C.gold, width: 3 });
    const dot = kit.dot([0, 0], { r: 0.14, color: C.white, z: 6 });
    const drop = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    return (p) => {
      const t = Math.round(p.t);
      c.set((x) => worth(p.r, x));
      dot.set(P.toW(t, worth(p.r, t)));
      drop.set([P.toW(t, 0), P.toW(t, worth(p.r, t))]);
    };
  },
};

// ---------------------------------------------------------------------------
// The spending multiplier
// ---------------------------------------------------------------------------
export const multiplier_rounds = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the spending share c that makes the multiplier exactly 4, and play at least 15 rounds.',
  goal: (t) => near(t.c, 0.75) && Math.round(t.n) >= 15,
  params: [
    { key: 'c', label: 'Share of each peso spent again (c)', min: 0.1, max: 0.9, step: 0.05, value: 0.5 },
    { key: 'n', label: 'Rounds', min: 1, max: 20, step: 1, value: 5 },
  ],
  beats: [
    { say: 'c = 0.5: ₱100, then ₱50, ₱25… The total heads for ₱200: a multiplier of 2.', set: { c: 0.5, n: 10 } },
    { say: 'c = 0.8: the rounds shrink slowly, and the total heads for ₱500.', set: { c: 0.8, n: 20 } },
  ],
  readout: (p) => {
    const n = Math.round(p.n);
    const tot = (100 * (1 - p.c ** n)) / (1 - p.c);
    return [
      ['Total so far', peso(tot)],
      ['Limit 100 / (1 − c)', peso(100 / (1 - p.c))],
      ['Multiplier', r2(1 / (1 - p.c))],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 20.5, 1], y: [0, 100, 25], sx: 0.64, sy: 0.06, origin: [-6.6, -3.4], axisAt: [0, 0], xEvery: 5, yEvery: 25, xLabel: '\\text{round}', yLabel: '\\text{pesos spent}' });
    const bars = range(1, 20, 20).map((i) => kit.rect(P.toW(i - 0.4, 0)[0], P.toW(0, 0)[1], 0.5, 0, { color: C.teal, strokeColor: C.teal }));
    const totBar = kit.rect(6.6, -3.4, 0.8, 0, { color: C.gold, strokeColor: C.gold });
    kit.label('\\text{total ÷ 5}', [7, -3.75], { size: 12 });
    return (p) => {
      const n = Math.round(p.n);
      const b0 = P.toW(0, 0)[1];
      bars.forEach((b, i) => {
        const v = i < n ? 100 * p.c ** i : 0;
        b.set(P.toW(i + 1 - 0.4, 0)[0], b0, 0.5, P.toW(0, v)[1] - b0).visible(i < n);
      });
      const tot = (100 * (1 - p.c ** n)) / (1 - p.c);
      totBar.set(6.6, -3.4, 0.8, (tot / 5) * 0.06);
    };
  },
};

// ---------------------------------------------------------------------------
// A repeated prisoner's dilemma
// ---------------------------------------------------------------------------
const PAY = { CC: [3, 3], CD: [0, 5], DC: [5, 0], DD: [1, 1] };
const move = (s, theirLast) => (s === 'allc' ? 'C' : s === 'alld' ? 'D' : theirLast || 'C');
const play = (me, opp, n) => {
  const rows = [];
  let a = null;
  let b = null;
  let sa = 0;
  let sb = 0;
  for (let i = 0; i < n; i++) {
    const ma = move(me, b);
    const mb = move(opp, a);
    const [pa, pb] = PAY[ma + mb];
    sa += pa;
    sb += pb;
    rows.push([ma, mb]);
    a = ma;
    b = mb;
  }
  return { rows, sa, sb };
};
const STRATS = [
  { value: 'tft', label: 'Tit for tat' },
  { value: 'allc', label: 'Always cooperate' },
  { value: 'alld', label: 'Always defect' },
];
export const repeated_game = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Your opponent plays tit for tat. Over 10 rounds, find a strategy that earns the full 30 points.',
  goal: (t) => t.opp === 'tft' && Math.round(t.n) === 10 && play(t.me, t.opp, 10).sa === 30,
  params: [
    { key: 'me', label: 'Your strategy', type: 'choice', value: 'alld', options: STRATS },
    { key: 'opp', label: 'Opponent', type: 'choice', value: 'allc', options: STRATS },
    { key: 'n', label: 'Rounds', min: 1, max: 10, step: 1, value: 1 },
  ],
  beats: [
    { say: 'One round against a cooperator: defecting earns 5 instead of 3. Tempting.', set: { me: 'alld', opp: 'allc', n: 1 } },
    { say: 'But against tit for tat, defecting wins once and then both get 1 a round: 14 points in 10 rounds.', set: { me: 'alld', opp: 'tft', n: 10 } },
    { say: 'Tit for tat against always-defect: it is cheated once, then defends itself, 9 points.', set: { me: 'tft', opp: 'alld', n: 10 } },
  ],
  readout: (p) => {
    const g = play(p.me, p.opp, Math.round(p.n));
    return [
      ['Your score', `${g.sa}`],
      ['Opponent’s score', `${g.sb}`],
      ['Both cooperating every round would give', `${3 * Math.round(p.n)} each`],
    ];
  },
  setup(kit) {
    kit.label('\\text{you}', [-7.2, 1.2], { size: 15 });
    kit.label('\\text{them}', [-7.2, -0.4], { size: 15 });
    const you = range(0, 9, 10).map((i) => kit.dot([-5.6 + i * 1.3, 1.2], { r: 0.38, color: C.green }));
    const them = range(0, 9, 10).map((i) => kit.dot([-5.6 + i * 1.3, -0.4], { r: 0.38, color: C.green }));
    const ylab = range(0, 9, 10).map((i) => kit.label('', [-5.6 + i * 1.3, 1.2], { size: 14, tex: false }));
    const tlab = range(0, 9, 10).map((i) => kit.label('', [-5.6 + i * 1.3, -0.4], { size: 14, tex: false }));
    kit.label('\\text{C = cooperate (green),  D = defect (red)}', [0, 3.2], { size: 13 });
    kit.label('\\text{both C: 3 each;\\ both D: 1 each;\\ lone D: 5, the other 0}', [0, -2.6], { size: 13, color: C.grey });
    return (p) => {
      const g = play(p.me, p.opp, Math.round(p.n));
      for (let i = 0; i < 10; i++) {
        const r = g.rows[i];
        you[i].visible(!!r);
        them[i].visible(!!r);
        ylab[i].set(r ? r[0] : '');
        tlab[i].set(r ? r[1] : '');
        if (r) {
          you[i].color(r[0] === 'C' ? C.green : C.red);
          them[i].color(r[1] === 'C' ? C.green : C.red);
        }
      }
    };
  },
};

// ---------------------------------------------------------------------------
// Prospect theory value curve
// ---------------------------------------------------------------------------
const val = (x) => (x >= 0 ? x ** 0.88 : -2.25 * (-x) ** 0.88);
export const prospect_value = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the loss that feels as bad as a ₱1000 gain feels good.',
  goal: (t) => Math.round(t.x) === -400,
  params: [{ key: 'x', label: 'Gain or loss (₱)', min: -1500, max: 1500, step: 50, value: 1000 }],
  beats: [
    { say: 'A ₱1000 gain feels worth about 437 "units of pleasure".', set: { x: 1000 } },
    { say: 'A ₱1000 loss feels like −982: more than twice as bad.', set: { x: -1000 } },
    { say: 'Even a ₱200 loss feels about half as bad as the ₱1000 gain feels good.', set: { x: -200 } },
  ],
  readout: (p) => [
    ['Change', `${p.x < 0 ? '−' : '+'}₱${Math.abs(Math.round(p.x)).toLocaleString('en-US')}`],
    ['Feels like', r2(val(Math.round(p.x)))],
    ['A ₱1000 gain feels like', r2(val(1000))],
  ],
  setup(kit) {
    const P = kit.plane({ x: [-1500, 1500, 500], y: [-1500, 750, 250], sx: 0.0045, sy: 0.0034, origin: [0, 1.0], axisAt: [0, 0], xEvery: 500, yEvery: 500, xLabel: '\\text{pesos}', yLabel: '\\text{feeling}' });
    kit.curve(val, [-1500, 1500], { plane: P, color: C.blue, width: 3, samples: 300 });
    kit.line([P.toW(-1500, -val(1000)), P.toW(1500, -val(1000))], { color: C.grey, width: 1, dashed: true });
    kit.dot(P.toW(1000, val(1000)), { r: 0.1, color: C.green });
    const dot = kit.dot([0, 0], { r: 0.15, color: C.white, z: 6 });
    const drop = kit.line([], { color: C.white, width: 1.5, dashed: true, create: false });
    return (p) => {
      const x = Math.round(p.x);
      dot.set(P.toW(x, val(x))).color(x < 0 ? C.red : C.green);
      drop.set([P.toW(x, 0), P.toW(x, val(x))]);
    };
  },
};

// ---------------------------------------------------------------------------
// The cobweb model
// ---------------------------------------------------------------------------
const cob = (k, n) => {
  const pts = [];
  let Q = 20;
  for (let i = 0; i <= n; i++) {
    const P = Math.max(0, Math.min(100, 100 - Q));
    pts.push([Q, P]);
    const Qn = Math.max(0, Math.min(100, k * (P - 20)));
    pts.push([Qn, P]);
    Q = Qn;
  }
  return pts;
};
export const cobweb = {
  camera: { kind: '2d', x: [-8, 8], y: [-4.5, 4.5] },
  mission: 'Find the reaction strength k that makes the swings go on forever without growing, and watch at least 8 years.',
  goal: (t) => near(t.k, 1) && Math.round(t.t) >= 8,
  params: [
    { key: 'k', label: 'How strongly producers react (k)', min: 0.5, max: 1.5, step: 0.1, value: 0.6 },
    { key: 't', label: 'Years', min: 0, max: 12, step: 1, value: 0 },
  ],
  beats: [
    { say: 'Year 0: a shock leaves output low (20), so the price is high (80).', set: { k: 0.6, t: 0 } },
    { say: 'Producers expand, prices fall, they cut back… with a gentle reaction the swings shrink towards equilibrium.', set: { k: 0.6, t: 8 } },
    { say: 'React too strongly and every swing is bigger than the last: boom and bust that grows.', set: { k: 1.3, t: 6 } },
  ],
  readout: (p) => {
    const t = Math.round(p.t);
    const pts = cob(p.k, t);
    const [Q, P] = pts[2 * t];
    const Qs = (80 * p.k) / (1 + p.k);
    return [
      [`Year ${t} output`, r2(Q)],
      [`Year ${t} price`, r2(P)],
      ['Equilibrium output', r2(Qs)],
      ['Swings', p.k < 0.999 ? 'shrink' : p.k > 1.001 ? 'grow' : 'stay the same'],
    ];
  },
  setup(kit) {
    const P = kit.plane({ x: [0, 100, 10], y: [0, 100, 10], sx: 0.1, sy: 0.075, origin: [-5, -3.7], axisAt: [0, 0], xEvery: 20, yEvery: 20, xLabel: '\\text{output}', yLabel: '\\text{price}' });
    kit.curve((q) => 100 - q, [0, 100], { plane: P, color: C.blue, width: 3 });
    const sup = kit.curve((q) => 20 + q / 0.6, [0, 100], { plane: P, color: C.gold, width: 3 });
    const web = kit.line([], { color: C.white, width: 2, create: false });
    const dot = kit.dot([0, 0], { r: 0.13, color: C.yellow, z: 6 });
    kit.label('\\text{demand}', [3.0, -0.9], { size: 13, color: C.blue });
    kit.label('\\text{supply}', [5.8, 3.4], { size: 13, color: C.gold });
    return (p) => {
      const t = Math.round(p.t);
      sup.set((q) => Math.min(100, 20 + q / p.k));
      const pts = cob(p.k, t).slice(0, 2 * t + 1);
      web.set(pts.map(([q, pr]) => P.toW(q, pr)));
      dot.set(P.toW(...pts[pts.length - 1]));
    };
  },
};
