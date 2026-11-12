// Story versions, batch 15: end of year 4, capstone, metals track.
import { C } from '../theme';
import * as materials from './materials';
import * as um_year4b from './um_year4b';
import * as spec_metals from './spec_metals';

const W = um_year4b;
const M = spec_metals;

// ---------------------------------------------------------------------------
// 3D printing: layer height
// ---------------------------------------------------------------------------
export const print_layers = {
  ...W.print_layers,
  ease: 1.6,
  beats: [
    {
      say: 'A 3D printer builds a part one thin slice at a time, each layer melted onto the one below. Here, a dome.',
      set: { h: 0.6 },
      ms: 9000,
    },
    {
      say: 'Thick 0.6 mm layers: only 34 layers, about 21 minutes. But the dome looks like a stack of rings. On the 45° slope each step sticks out about 0.42 mm.',
      set: {},
      ms: 11500,
      notes: [{ text: 'each thick layer leaves a big step', at: [0.4, 2.9], to: [4.0, 1.65], color: C.teal }],
    },
    {
      say: 'The step comes from geometry. On a slope, each flat layer overhangs the true surface. Flat tops and vertical walls have no steps at all.',
      set: { h: 0.4 },
      ms: 10500,
    },
    {
      say: 'At 0.2 mm, 100 layers take about an hour, and the steps shrink to 0.14 mm: smooth to the eye, but still too rough for this part.',
      set: { h: 0.2 },
      ms: 10500,
      notes: [{ text: 'thinner layers: smaller steps, 3× the time', at: [0.4, 2.9], to: [3.75, 2.0], color: C.teal }],
    },
    {
      say: 'At 0.05 mm the steps are only 0.035 mm, but the print takes about 4 hours. Thinner is smoother, and slower in proportion: the main trade-off of every printer.',
      set: { h: 0.05 },
      ms: 11500,
      notes: [{ text: 'almost smooth, but 4 hours', at: [0.4, 2.9], to: [3.6, 2.25], color: C.teal }],
    },
  ],
};

// ---------------------------------------------------------------------------
// A materials start-up: cash runway
// ---------------------------------------------------------------------------
export const startup_runway = {
  ...W.startup_runway,
  ease: 1.6,
  beats: [
    {
      say: 'A new materials company spends money every month on staff, rent and machines. Its sales start small and grow. The question: does it break even before the money runs out?',
      set: { F: 5, g: 8 },
      ms: 11500,
    },
    {
      say: 'With ₱5 M of funding and sales growing 8% a month, sales would only cover costs in month 29.',
      set: {},
      ms: 9500,
      notes: [{ text: 'sales would cover costs only here: too late', at: [-2.4, 2.2], to: [1.3, 0.15], color: C.yellow }],
    },
    {
      say: 'But the cash runs out in month 17. The company closes first. The months of cash left are its runway.',
      set: {},
      ms: 10000,
      notes: [{ text: 'the cash runs out in month 17', at: [1.8, -0.9], to: [-1.75, -1.6], color: C.red }],
    },
    {
      say: 'Same funding, faster growth, 15% a month. Costs are covered in month 16, and the balance turns up with about ₱1.4 M still left.',
      set: { g: 15 },
      ms: 11000,
      notes: [{ text: 'lowest point: ₱1.4 M still left', at: [-2.0, -2.6], to: [-2.1, -1.0], color: C.green }],
    },
    {
      say: 'Or raise ₱10 M and keep 8% growth: the longer runway carries the company to break-even in month 29, with cash to spare.',
      set: { F: 10, g: 8 },
      ms: 11000,
      notes: [{ text: 'twice the money lasts until break-even', at: [-0.4, -2.6], to: [1.3, -0.25], color: C.green }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lithium-ion batteries
// ---------------------------------------------------------------------------
export const battery_cycle = {
  ...W.battery_cycle,
  ease: 1.6,
  beats: [
    {
      say: 'Inside a phone battery: graphite on one side, a metal oxide on the other, a liquid electrolyte between. Lithium shuttles back and forth. Goodenough, Whittingham and Yoshino won the 2019 Nobel Prize for it.',
      set: { s: 80, c: 0 },
      ms: 12000,
    },
    {
      say: 'Charged, most of the lithium sits between the graphite layers.',
      set: {},
      ms: 8000,
      notes: [{ text: 'most lithium (yellow) is in the graphite', at: [-4.2, -3.5], to: [-5.9, -0.6], color: C.yellow }],
    },
    {
      say: 'Use the phone. Lithium ions drift through the electrolyte to the oxide, while their electrons take the outside path, through the phone, doing work.',
      set: { c: 0.5 },
      ms: 11000,
      notes: [{ text: 'electrons run the outside circuit', at: [0.4, 3.5], to: [-3.5, 3.8], color: C.blue }],
    },
    {
      say: 'At 20% charge most lithium has moved to the oxide. Resting, the cell still reads about 3.65 V, close to its 3.7 V nominal.',
      set: { s: 20, c: 0 },
      ms: 10500,
      notes: [{ text: 'now most lithium sits in the oxide', at: [-2.4, -3.5], to: [-1.4, -0.6], color: C.yellow }],
    },
    {
      say: 'Now a heavy game draws 2C, 6 A. The cell’s internal resistance steals 0.3 V, and it falls below the phone’s 3.4 V cut-off. The phone shuts down, though charge is left.',
      set: { c: 2 },
      ms: 11500,
      notes: [{ text: 'heavy draw: below the cut-off, phone off', at: [5.0, -2.6], to: [3.45, -1.1], color: C.red }],
    },
    {
      say: 'That is why an old battery dies suddenly on cold days: its resistance has grown. Better electrode materials are an active research field.',
      set: { c: 1 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Thesis statistics: how many bricks?
// ---------------------------------------------------------------------------
export const thesis_ttest = {
  ...W.thesis_ttest,
  ease: 1.6,
  beats: [
    {
      say: 'A thesis idea: add coconut coir fibre to clay bricks. Does it make them stronger? Test plain bricks and fibre bricks, and compare.',
      set: { n: 5, eff: 0.5 },
      ms: 10500,
    },
    {
      say: 'Five bricks each, with a true gain of 0.5 MPa. The averages differ, but the error bars overlap widely and p is far above 0.05. The test cannot tell yet.',
      set: {},
      ms: 11500,
      notes: [{ text: 'the error bars overlap: can’t tell yet', at: [-4.0, 3.0], to: [-3.6, 0.85], color: C.white }],
    },
    {
      say: 'That is not proof the fibre does nothing. It means five bricks are too few to see a small effect.',
      set: {},
      ms: 9000,
    },
    {
      say: 'Test 20 bricks each. The error bars shrink to half, and the same 0.5 MPa gain stands out: p about 0.01.',
      set: { n: 20 },
      ms: 10500,
      notes: [{ text: 'more bricks: shorter bars, a clear gap', at: [-4.0, 3.0], to: [-1.05, 0.9], color: C.yellow }],
    },
    {
      say: 'A big gain of 1.2 MPa shows clearly even with 5 bricks. Small effects need big samples; big effects need only a few. Plan the sample size before you make the bricks.',
      set: { n: 5, eff: 1.2 },
      ms: 11500,
      notes: [{ text: 'a big gain shows even with 5 bricks', at: [-4.6, 3.0], to: [-2.0, 1.75], color: C.yellow }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Capstone: choosing a material with an Ashby chart
// ---------------------------------------------------------------------------
export const ashby_corrosion_capstone_lab = {
  ...materials.ashby_corrosion_capstone_lab,
  ease: 1.6,
  beats: [
    {
      say: 'Mike Ashby’s idea (1980s): plot every material on one map, stiffness against density, both on log scales. Each family forms a bubble.',
      set: { shape: 1, shift: -1 },
      ms: 10500,
    },
    {
      say: 'Up and to the left is light and stiff: what you want for anything that moves or flies.',
      set: {},
      ms: 9000,
      notes: [{ text: 'up and to the left = light and stiff', at: [-4.0, 3.2], color: C.white }],
    },
    {
      say: 'What counts as “best” depends on the shape. For a tie rod being pulled, maximise E ÷ ρ. That is a straight line of slope 1 on this map.',
      set: { shape: 1, shift: 0.3 },
      ms: 11000,
    },
    {
      say: 'For a beam being bent, maximise E^½ ÷ ρ: a line of slope 2. Slide it up.',
      set: { shape: 2, shift: 0.4 },
      ms: 9500,
      notes: [{ text: 'the slope-2 line: slide it up', at: [4.4, -1.2], to: [1.3, 1.3], color: C.white }],
    },
    {
      say: 'Everything above the line beats everything below it. For beams: woods, composites and ceramics. Ceramics are too brittle to bend, so composites and woods win. That is why aircraft and bicycles use carbon fibre.',
      set: { shift: 0.56 },
      ms: 12500,
      notes: [{ text: 'the bright bubbles are above the line: the winners', at: [-4.2, 3.2], to: [-0.5, 1.1], color: C.gold }],
    },
    {
      say: 'For a flat panel, E^⅓ ÷ ρ: slope 3. The best choices shift again. Your capstone: pick the shape, slide the line, then check cost and corrosion.',
      set: { shape: 3, shift: 0.3 },
      ms: 11000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Metals track: the basic oxygen furnace
// ---------------------------------------------------------------------------
export const bof_blow = {
  ...M.bof_blow,
  ease: 1.6,
  beats: [
    {
      say: 'Iron from a blast furnace holds about 4.4% carbon: hard and brittle. Steel needs well under 1%. The basic oxygen furnace burns the extra away in about 20 minutes.',
      set: { flow: 3, t: 0 },
      ms: 11500,
      notes: [{ text: 'start: 4.4% carbon', at: [3.4, 2.6], to: [-0.4, 3.2], color: C.yellow }],
    },
    {
      say: 'A water-cooled lance blows pure oxygen onto the molten metal at supersonic speed. Carbon burns to carbon monoxide gas, which bubbles out and boils the bath.',
      set: { t: 4 },
      ms: 11000,
    },
    {
      say: 'While there is plenty of carbon, it burns at a steady rate, about 0.33% per minute at this flow. The line is straight.',
      set: { t: 8 },
      ms: 10500,
      notes: [{ text: 'a straight line: carbon burns at a steady rate', at: [4.4, 1.2], to: [1.0, 0.4], color: C.yellow }],
    },
    {
      say: 'Below about 0.3% carbon, the oxygen has trouble finding carbon atoms, and burning slows. The last tenth of a percent takes several minutes.',
      set: { t: 17.5 },
      ms: 11000,
      notes: [{ text: 'the tail: carbon runs short, burning slows', at: [4.4, -1.2], to: [3.0, -3.0], color: C.yellow }],
    },
    {
      say: 'More oxygen shortens the straight part, but not the slow tail. The process, from Linz and Donawitz in Austria in 1952, now makes about 70% of the world’s steel.',
      set: { flow: 4, t: 13.5 },
      ms: 11500,
      notes: [{ text: 'more oxygen: steeper start, same slow tail', at: [4.4, 1.4], to: [0.7, 0.3], color: C.yellow }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Metals track: the Ellingham diagram
// ---------------------------------------------------------------------------
export const ellingham = {
  ...M.ellingham,
  ease: 1.6,
  beats: [
    {
      say: 'Most metals are found as oxides: rust-like rocks. To get the metal, something must pull the oxygen off. Harold Ellingham’s 1944 chart shows what can.',
      set: { T: 600 },
      ms: 10500,
    },
    {
      say: 'Each line is how strongly a metal holds oxygen, ΔG°. Lower means a tighter grip. Metal lines rise with temperature, because forming the oxide uses up oxygen gas.',
      set: {},
      ms: 11500,
    },
    {
      say: 'Carbon’s line (dashed) falls instead, because 2C + O₂ makes two moles of CO gas. Below a metal’s line, carbon wins the oxygen. At 600 K, it is still above nickel’s.',
      set: {},
      ms: 11500,
      notes: [{ text: 'carbon’s line is above nickel’s: it can’t take the oxygen yet', at: [-4.2, 3.0], to: [-3.15, 1.4], color: C.white }],
    },
    {
      say: 'At 800 K carbon has dropped below nickel: carbon can now pull oxygen off NiO.',
      set: { T: 800 },
      ms: 9500,
      notes: [{ text: 'carbon dips below nickel: NiO can be reduced', at: [-4.4, 3.0], to: [-2.2, 1.35], color: C.green }],
    },
    {
      say: 'Above about 1,000 K carbon beats FeO too. That is why a blast furnace, full of hot coke, makes iron.',
      set: { T: 1100 },
      ms: 10000,
      notes: [{ text: 'below FeO too: iron smelting works', at: [-4.6, 3.0], to: [-0.7, 0.7], color: C.red }],
    },
    {
      say: 'Silica needs nearly 2,000 K, which is why silicon is made in electric arc furnaces. Aluminium (not shown) grips its oxygen even harder, so it is made by electrolysis instead.',
      set: { T: 2000 },
      ms: 11500,
      notes: [{ text: 'about 2,000 K: even silica gives up its oxygen', at: [0.0, -2.4], to: [3.7, -0.7], color: C.purple }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Metals track: solid-solution strengthening
// ---------------------------------------------------------------------------
export const solid_solution = {
  ...M.solid_solution,
  ease: 1.6,
  beats: [
    {
      say: 'Pure copper is soft. Mix in other atoms, sitting on copper’s own crystal sites, and it gets stronger. This is a solid solution.',
      set: { s: 'ni', c: 0 },
      ms: 10000,
    },
    {
      say: 'Nickel atoms are only 2% smaller than copper atoms. They fit almost perfectly, so copper and nickel mix in any amount: cupronickel, the metal of many coins.',
      set: { c: 30 },
      ms: 11000,
      notes: [{ text: 'nickel fits: almost the same size', at: [0.0, 3.6], to: [-1.5, 2.45], color: C.green }],
    },
    {
      say: 'Each odd-sized atom bends the rows around it. A slipping dislocation has to push through those bumps, so the metal resists bending.',
      set: {},
      ms: 10500,
    },
    {
      say: 'Zinc atoms are 4% bigger. Up to about 35% dissolves: that is brass.',
      set: { s: 'zn' },
      ms: 9000,
      notes: [{ text: 'brass: up to 35% zinc dissolves', at: [4.6, 2.4], to: [5.5, -0.6], color: C.teal }],
    },
    {
      say: 'Tin is 18% bigger, past Hume-Rothery’s 15% size rule (1934). Only about 9% dissolves, but each tin atom strengthens a lot. That is bronze, which gave its name to an age.',
      set: { s: 'sn', c: 9 },
      ms: 11500,
      notes: [{ text: 'tin: few atoms, big strengthening', at: [4.8, 2.6], to: [2.4, 0.7], color: C.purple }],
    },
    {
      say: 'Push tin past its limit and the extra cannot fit. It forms a separate, brittle phase instead.',
      set: { c: 20 },
      ms: 10000,
      notes: [{ text: 'extra tin forms a brittle second phase (grey)', at: [-1.0, 3.95], to: [-2.2, 1.6], color: C.grey }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Metals track: age hardening
// ---------------------------------------------------------------------------
export const ageing_curve = {
  ...M.ageing_curve,
  ease: 1.6,
  beats: [
    {
      say: 'In 1906 Alfred Wilm quenched an aluminium–copper alloy and found it grew harder by itself over the next few days. He did not know why. It became duralumin, the metal of Zeppelins.',
      set: { T: 160, lt: -1 },
      ms: 12000,
    },
    {
      say: 'Quenching traps the copper atoms spread evenly through the aluminium. Just after, the alloy is soft, about 70 HV.',
      set: {},
      ms: 10000,
    },
    {
      say: 'Hold it at 160 °C. After 1 hour the copper atoms have begun to cluster into tiny particles.',
      set: { lt: 0 },
      ms: 9500,
      notes: [{ text: 'soft at first: atoms only starting to cluster', at: [0.8, -2.6], to: [-2.9, -1.9], color: C.yellow }],
    },
    {
      say: 'At 10 hours the particles are as fine and as many as they will get. Dislocations get stuck between them: peak hardness.',
      set: { lt: 1 },
      ms: 10500,
      notes: [{ text: 'peak: the finest, most numerous particles', at: [-3.4, 3.4], to: [-0.1, 2.1], color: C.yellow }],
    },
    {
      say: 'Keep going to 1,000 hours and the big particles grow by eating the small ones. Fewer, coarser obstacles: the alloy is overaged and softer.',
      set: { lt: 3 },
      ms: 11000,
      notes: [{ text: 'overaged: particles coarsen, it softens', at: [3.4, -0.6], to: [5.9, -2.7], color: C.yellow }],
    },
    {
      say: 'At 200 °C the peak comes in under an hour, but it is lower, because hotter ageing grows bigger particles. Aircraft aluminium is aged on exactly such a schedule.',
      set: { T: 200, lt: -0.35 },
      ms: 11500,
      notes: [{ text: 'hotter: the peak comes sooner, but lower', at: [-0.4, 3.3], to: [-4.0, 1.25], color: C.red }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Metals track: grain size and strength
// ---------------------------------------------------------------------------
export const hall_petch = {
  ...M.hall_petch,
  ease: 1.6,
  beats: [
    {
      say: 'A metal is a patchwork of grains, each a crystal tilted its own way. Slip has to stop at every grain wall, because the rows do not line up.',
      set: { d: 50 },
      ms: 10500,
      notes: [{ text: 'each grain wall blocks slip', at: [-1.4, 3.4], to: [-3.6, 1.0], color: C.gold }],
    },
    {
      say: 'Grains of 50 µm, about the width of a fine hair. Yield strength: about 175 MPa.',
      set: {},
      ms: 8500,
    },
    {
      say: 'Coarse 200 µm grains, as near a slowly cooled weld: fewer walls, only about 122 MPa.',
      set: { d: 200 },
      ms: 10000,
      notes: [{ text: 'few walls: weaker', at: [5.0, -2.2], to: [1.5, -2.25], color: C.yellow }],
    },
    {
      say: 'Fine 5 µm grains from controlled rolling: about 400 MPa.',
      set: { d: 5 },
      ms: 9000,
    },
    {
      say: 'Hall (1951) and Petch (1953) found that strength grows with 1 ÷ √d. Plotted that way, every point falls on one straight line.',
      set: {},
      ms: 10500,
      notes: [{ text: 'fine grains: 400 MPa, on the same line', at: [-0.3, 1.3], to: [4.4, 0.5], color: C.yellow }],
    },
    {
      say: 'Finer grains are the one trick that makes steel both stronger and tougher at once, which is why modern ship and pipeline steels are rolled so carefully.',
      set: { d: 10 },
      ms: 10500,
    },
  ],
};
