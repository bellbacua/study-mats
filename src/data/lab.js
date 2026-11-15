// Circuit lab: examples, challenges, part notes and the short history, with sources.
import { truthTable } from '../lab/logicSim.js';

let n = 0;
const W = (a, b, c, d) => ({ id: `w${n++}`, type: 'wire', a: [a, b], b: [c, d] });
const P = (type, a, b, c, d, extra = {}) => ({ id: `${type[0]}${n++}`, type, a: [a, b], b: [c, d], ...extra });
const G = (type, x, y, extra = {}) => ({ id: `${type[0]}${n++}`, type, at: [x, y], ...extra });
const shift = (parts, dx, dy) =>
  parts.map((p) => ({ ...p, ...(p.a ? { a: [p.a[0] + dx, p.a[1] + dy], b: [p.b[0] + dx, p.b[1] + dy] } : {}), ...(p.at ? { at: [p.at[0] + dx, p.at[1] + dy] } : {}) }));

// ---- circuit examples (board 16 × 10; a battery's + end is its b end) ----
export const CIRCUIT_EXAMPLES = [
  {
    id: 'led',
    title: 'LED with a resistor',
    blurb: 'The first circuit everyone builds. The resistor keeps the LED’s current near 20 mA. Click the switch.',
    parts: shift([
      P('battery', 2, 6, 2, 3, { value: 9 }), W(2, 3, 2, 2), W(2, 2, 5, 2), P('resistor', 5, 2, 8, 2, { value: 330 }), W(8, 2, 11, 2),
      P('led', 11, 2, 11, 4, { color: 'red' }), W(11, 4, 11, 7), W(11, 7, 7, 7), P('switch', 7, 7, 5, 7, { on: true }), W(5, 7, 2, 7), W(2, 7, 2, 6),
    ], 1, 0),
  },
  {
    id: 'series',
    title: 'Bulbs in series and in parallel',
    blurb: 'Same battery, same bulbs. In a line (left) they share the voltage and glow dimly; side by side (right) each gets all of it.',
    parts: [
      P('battery', 1, 7, 1, 3, { value: 9 }), W(1, 3, 1, 2), W(1, 2, 2, 2), P('bulb', 2, 2, 4, 2, { value: 30 }), P('bulb', 4, 2, 6, 2, { value: 30 }), W(6, 2, 6, 7), W(6, 7, 1, 7),
      P('battery', 9, 7, 9, 3, { value: 9 }), W(9, 3, 9, 2), W(9, 2, 13, 2), P('bulb', 11, 2, 11, 4, { value: 30 }), W(11, 4, 11, 7), P('bulb', 13, 2, 13, 4, { value: 30 }), W(13, 4, 13, 7), W(13, 7, 9, 7),
    ],
  },
  {
    id: 'rc',
    title: 'Capacitor: charge, then afterglow',
    blurb: 'Close the switch and the capacitor fills. Open it and the stored charge keeps the LED lit for a few seconds as it drains.',
    parts: [
      P('battery', 1, 7, 1, 3, { value: 9 }), W(1, 3, 1, 2), P('switch', 1, 2, 3, 2, { on: true }), P('resistor', 3, 2, 6, 2, { value: 330 }),
      P('capacitor', 6, 2, 6, 5, { value: 4700 }), W(6, 5, 6, 7), W(6, 2, 9, 2), P('resistor', 9, 2, 12, 2, { value: 470 }),
      P('led', 12, 2, 12, 5, { color: 'green' }), W(12, 5, 12, 7), W(12, 7, 1, 7),
    ].map((p) => p),
  },
  {
    id: 'divider',
    title: 'Voltage divider',
    blurb: 'Two resistors in a line split the battery’s 9 V in proportion to their sizes: 1 kΩ gets about 2.8 V, 2.2 kΩ about 6.2 V.',
    parts: shift([
      P('battery', 2, 7, 2, 3, { value: 9 }), W(2, 3, 2, 2), W(2, 2, 10, 2), P('resistor', 10, 2, 10, 4, { value: 1000 }), P('resistor', 10, 4, 10, 7, { value: 2200 }), W(10, 7, 2, 7),
    ], 1, 0),
  },
];

// ---- logic examples (board 22 × 14) -------------------------------------
const halfAdder = shift([
  G('input', 1, 2, { label: 'A' }), G('input', 1, 4, { label: 'B' }), G('xor', 5, 3), G('and', 5, 7), G('lamp', 7, 3, { label: 'S' }), G('lamp', 7, 7, { label: 'C' }),
  W(1, 2, 3, 2), W(1, 4, 3, 4), W(2, 2, 2, 6), W(2, 6, 3, 6), W(1, 4, 1, 8), W(1, 8, 3, 8), W(5, 3, 7, 3), W(5, 7, 7, 7),
], 5, 2);
const fullAdder = shift([
  G('input', 1, 1, { label: 'A' }), G('input', 1, 3, { label: 'B' }), G('input', 1, 9, { label: 'CIN' }),
  G('xor', 5, 2), G('xor', 10, 3), G('and', 5, 6), G('and', 10, 8), G('or', 15, 7),
  G('lamp', 12, 3, { label: 'S' }), G('lamp', 17, 7, { label: 'COUT' }),
  W(1, 1, 3, 1), W(1, 3, 3, 3), W(5, 2, 8, 2), W(1, 9, 7, 9), W(7, 9, 7, 4), W(7, 4, 8, 4), W(10, 3, 12, 3),
  W(2, 1, 2, 5), W(2, 5, 3, 5), W(1, 3, 1, 7), W(1, 7, 3, 7), W(6, 2, 6, 7), W(6, 7, 8, 7), W(7, 9, 8, 9),
  W(5, 6, 13, 6), W(10, 8, 13, 8), W(15, 7, 17, 7),
], 1, 1);
const latch = shift([
  G('input', 2, 2, { label: 'R' }), G('input', 2, 10, { label: 'S' }), G('nor', 8, 3), G('nor', 8, 9), G('lamp', 11, 3, { label: 'Q' }), G('lamp', 11, 9, { label: 'NQ' }),
  W(2, 2, 6, 2), W(2, 10, 6, 10), W(8, 3, 11, 3), W(8, 9, 11, 9), W(9, 3, 9, 6), W(9, 6, 5, 6), W(5, 6, 5, 8), W(5, 8, 6, 8), W(10, 9, 10, 5), W(10, 5, 4, 5), W(4, 5, 4, 4), W(4, 4, 6, 4),
], 3, 1);
const blinker = shift([
  G('clock', 3, 4), G('lamp', 7, 4, { label: 'Y' }), G('not', 7, 8), G('lamp', 9, 8, { label: 'Z' }), W(3, 4, 7, 4), W(4, 4, 4, 8), W(4, 8, 5, 8), W(7, 8, 9, 8),
], 4, 1);
const counter = shift([
  G('input', 1, 1, { label: 'A' }), G('input', 1, 3, { label: 'B' }), G('input', 1, 6, { label: 'C' }), G('input', 1, 8, { label: 'D' }),
  G('display', 6, 2), W(1, 1, 4, 1), W(4, 1, 4, 2), W(4, 2, 6, 2), W(1, 3, 6, 3), W(1, 6, 4, 6), W(4, 6, 4, 4), W(4, 4, 6, 4), W(1, 8, 5, 8), W(5, 8, 5, 5), W(5, 5, 6, 5),
], 5, 2);

export const LOGIC_EXAMPLES = [
  { id: 'half', title: 'Half adder', blurb: 'Adds two one-digit binary numbers. S is the sum digit, C the carry: 1 + 1 = 10 in binary.', parts: halfAdder },
  { id: 'full', title: 'Full adder', blurb: 'Two half adders and an OR: adds A, B and a carry coming in. Chain these to add numbers of any length.', parts: fullAdder },
  { id: 'latch', title: 'Memory: the SR latch', blurb: 'Two NOR gates feeding each other. Flick S on and off: Q stays on. It remembers until R resets it.', parts: latch },
  { id: 'blink', title: 'Clock and NOT', blurb: 'A clock ticks on and off by itself. The NOT gate always shows the opposite.', parts: blinker },
  { id: 'binary', title: 'Binary to a number', blurb: 'Four switches worth 1, 2, 4 and 8. Flip them to count from 0 to 15.', parts: counter },
];

// ---- challenges --------------------------------------------------------
const lit = (res, model) => model.parts.filter((p) => p.type === 'led' && res.parts[p.id]?.lit);
export const CIRCUIT_CHALLENGES = [
  {
    id: 'first-light',
    title: 'First light',
    goal: 'Light an LED with a current between 5 and 25 mA (a safe glow).',
    hint: 'Battery → resistor → LED (arrow pointing away from +) → back to the battery. Try 330 Ω with 9 V.',
    check: (res, model) => lit(res, model).some((p) => res.parts[p.id].i >= 0.005 && res.parts[p.id].i <= 0.025),
  },
  {
    id: 'pop',
    title: 'Learn by breaking',
    goal: 'Burn out an LED on purpose (it costs nothing here).',
    hint: 'Wire an LED straight across a battery with no resistor.',
    event: 'burn',
  },
  {
    id: 'parallel',
    title: 'Both at full brightness',
    goal: 'Run two bulbs from one battery so each gets at least 90% of the battery’s voltage.',
    hint: 'Side by side (parallel), not one after the other.',
    check: (res, model) => {
      const vb = Math.max(0, ...model.parts.filter((p) => p.type === 'battery').map((p) => p.value));
      return model.parts.filter((p) => p.type === 'bulb' && Math.abs(res.parts[p.id]?.v || 0) >= 0.9 * vb).length >= 2;
    },
  },
  {
    id: 'three-volts',
    title: 'Make 3 volts',
    goal: 'Use a 9 V battery and resistors to get 3.0 V (±0.15) across one resistor.',
    hint: 'A divider: the voltage splits in proportion to resistance. Which pair gives one third?',
    check: (res, model) =>
      model.parts.some((p) => p.type === 'battery' && p.value === 9) &&
      model.parts.some((p) => p.type === 'resistor' && Math.abs(Math.abs(res.parts[p.id]?.v || 0) - 3) <= 0.15),
  },
  {
    id: 'switch',
    title: 'A light switch',
    goal: 'Build a circuit where a switch turns an LED on and off. Try both ways.',
    hint: 'Put the switch anywhere in the same loop as the LED.',
    track: (res, model, mem) => {
      const on = lit(res, model).length > 0;
      for (const s of model.parts.filter((p) => p.type === 'switch')) {
        const m = (mem[s.id] ||= {});
        if (s.on && on) m.onLit = true;
        if (!s.on && !on) m.offDark = true;
      }
      return Object.values(mem).some((m) => m.onLit && m.offDark);
    },
  },
  {
    id: 'afterglow',
    title: 'Afterglow',
    goal: 'Keep an LED lit for 2 seconds with no current from any battery.',
    hint: 'Charge a big capacitor, then cut the battery off with a switch. Load the “Capacitor” example if stuck.',
    track: (res, model, mem, dt) => {
      const glowing = lit(res, model).length > 0 && (res.batteryAmps || 0) < 1e-4;
      mem.t = glowing ? (mem.t || 0) + dt : 0;
      return mem.t >= 2;
    },
  },
];

const nand = ['nand'];
export const LOGIC_CHALLENGES = [
  {
    id: 'not-nand',
    title: 'NOT from NAND',
    goal: 'Make lamp Y the opposite of switch A, using only NAND gates.',
    hint: 'Feed A into both inputs of one NAND.',
    allow: nand,
    steps: truthTable(['A'], ({ A }) => ({ Y: 1 - A })),
  },
  {
    id: 'and-nand',
    title: 'AND from NAND',
    goal: 'Lamp Y on only when A and B are both on. NAND gates only.',
    hint: 'NAND is AND then NOT. Undo the NOT with a second NAND.',
    allow: nand,
    steps: truthTable(['A', 'B'], ({ A, B }) => ({ Y: A & B })),
  },
  {
    id: 'xor',
    title: 'Build XOR yourself',
    goal: 'Lamp Y on when A and B differ. No XOR gate allowed.',
    hint: '(A OR B) AND NOT (A AND B).',
    allow: ['and', 'or', 'not', 'nand', 'nor'],
    steps: truthTable(['A', 'B'], ({ A, B }) => ({ Y: A ^ B })),
  },
  {
    id: 'half',
    title: 'Half adder',
    goal: 'Switches A, B. Lamps S (sum) and C (carry).',
    hint: 'The sum is XOR, the carry is AND.',
    steps: truthTable(['A', 'B'], ({ A, B }) => ({ S: A ^ B, C: A & B })),
  },
  {
    id: 'majority',
    title: 'Majority vote',
    goal: 'Three switches A, B, C. Lamp Y on when at least two are on.',
    hint: '(A AND B) OR (A AND C) OR (B AND C).',
    steps: truthTable(['A', 'B', 'C'], ({ A, B, C }) => ({ Y: A + B + C >= 2 ? 1 : 0 })),
  },
  {
    id: 'full',
    title: 'Full adder',
    goal: 'Switches A, B, CIN. Lamps S and COUT. Adds three one-digit binary numbers.',
    hint: 'Two half adders; OR their carries.',
    steps: truthTable(['A', 'B', 'CIN'], ({ A, B, CIN }) => ({ S: A ^ B ^ CIN, COUT: A + B + CIN >= 2 ? 1 : 0 })),
  },
  {
    id: 'memory',
    title: 'A circuit that remembers',
    goal: 'Switches S and R, lamp Q. S turns Q on and it stays on after S goes off; R turns it off and it stays off.',
    hint: 'Two NOR gates, each output feeding the other’s input.',
    steps: [
      { inputs: { S: 0, R: 1 }, expect: { Q: 0 } },
      { inputs: { S: 0, R: 0 }, expect: { Q: 0 } },
      { inputs: { S: 1, R: 0 }, expect: { Q: 1 } },
      { inputs: { S: 0, R: 0 }, expect: { Q: 1 } },
      { inputs: { S: 0, R: 1 }, expect: { Q: 0 } },
      { inputs: { S: 0, R: 0 }, expect: { Q: 0 } },
    ],
  },
];

// ---- what each part does (shown when you pick it) ------------------------
export const PART_NOTES = {
  battery: 'Pushes charge round a closed loop. Its voltage is how hard it pushes. Alessandro Volta stacked zinc and copper discs into the first battery in 1800 [1].',
  resistor: 'Holds back current. Ohm found that current = voltage ÷ resistance (I = V/R) [2]. The coloured bands spell its value in a standard code [9]. Too much power makes it glow hot.',
  bulb: 'A thin wire that gets hot enough to glow. Brightness follows power, voltage × current.',
  capacitor: 'Two plates that store charge. It fills up through a resistor and can push it back out later. The first was the Leyden jar of 1745 [4].',
  led: 'A diode that gives light. Current only goes one way (the little arrow on the board), and it needs about 2 V before it lights. Too much current burns it out, so always pair it with a resistor [5, 10].',
  switch: 'Click it to open or close. Open means no path, so no current, anywhere in that loop.',
  wire: 'Almost no resistance, so everything joined by wire sits at the same voltage. Two wires join where one ends on the other; wires that only cross are not joined.',
};

export const LOGIC_NOTES = {
  wire: 'Carries a 1 (glowing) or a 0 (dark). Wires join where one ends on another; plain crossings do not join. Red means two outputs are fighting over one wire.',
  input: 'Click to switch between 0 and 1. Its letter is the name challenges look for.',
  clock: 'Flips between 0 and 1 on its own. Every computer has one setting the pace.',
  lamp: 'Lights when its input is 1. Rename it for challenges.',
  display: 'Reads four wires as one binary number: the inputs are worth 1, 2, 4 and 8 [6].',
};

// ---- history, with sources ------------------------------------------------
export const CIRCUIT_HISTORY = [
  'In 1800 Volta announced his “pile”, the first source of steady current [1]. Within thirty years Georg Ohm had measured that current through a wire is proportional to the voltage across it [2].',
  'In 1845 Gustav Kirchhoff, still a student, wrote down two rules: current into a junction equals current out, and voltages round any loop add up to zero [3]. Every circuit simulator still rests on them.',
  'This lab solves your board the way professional simulators such as SPICE do: one Kirchhoff equation for every junction, solved together many times a second [7, 8]. The solver here is written from scratch for this app.',
  'The first visible LED, a red one, was made by Nick Holonyak at General Electric in 1962 [5]. Bright blue LEDs took until the 1990s and won the 2014 Nobel Prize in Physics [6].',
];
export const LOGIC_HISTORY = [
  'In 1854 George Boole showed that logic could be done as algebra with only two values, true and false [1].',
  'In 1938 Claude Shannon, a 22-year-old student, proved that Boole’s algebra describes circuits of switches, so any logical rule can be built from relays [2].',
  'Henry Sheffer showed in 1913 that one operation, “not both” (today’s NAND), is enough to build all the others [3]. Chips are still mostly built from NAND-like gates.',
  'In 1918 William Eccles and Frank Jordan joined two valves so each held the other in place: the first flip-flop, a circuit that remembers one bit [4]. In 1937 George Stibitz built a binary adder from relays on his kitchen table [5].',
];
export const CIRCUIT_SOURCES = [
  { t: 'Volta, “On the electricity excited by the mere contact of conducting substances of different kinds”, Phil. Trans. R. Soc. 90 (1800)', u: 'https://doi.org/10.1098/rstl.1800.0018' },
  { t: 'Ohm’s law (history and statement), Wikipedia', u: 'https://en.wikipedia.org/wiki/Ohm%27s_law' },
  { t: 'Kirchhoff’s circuit laws, Wikipedia', u: 'https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws' },
  { t: 'Leyden jar, Wikipedia', u: 'https://en.wikipedia.org/wiki/Leyden_jar' },
  { t: 'Holonyak & Bevacqua, “Coherent (visible) light emission from Ga(As1−xPx) junctions”, Appl. Phys. Lett. 1, 82 (1962)', u: 'https://doi.org/10.1063/1.1753706' },
  { t: 'The Nobel Prize in Physics 2014 (Akasaki, Amano, Nakamura)', u: 'https://www.nobelprize.org/prizes/physics/2014/summary/' },
  { t: 'SPICE circuit simulator (Nagel & Pederson, Berkeley, 1973), Wikipedia', u: 'https://en.wikipedia.org/wiki/SPICE' },
  { t: 'Ho, Ruehli & Brennan, “The modified nodal approach to network analysis”, IEEE Trans. Circuits Syst. 22 (1975)', u: 'https://doi.org/10.1109/TCS.1975.1084079' },
  { t: 'Electronic colour code (IEC 60062), Wikipedia', u: 'https://en.wikipedia.org/wiki/Electronic_color_code' },
  { t: 'Light-emitting diode: forward voltage and current, Wikipedia', u: 'https://en.wikipedia.org/wiki/Light-emitting_diode' },
];
export const LOGIC_SOURCES = [
  { t: 'Boole, An Investigation of the Laws of Thought (1854), Project Gutenberg', u: 'https://www.gutenberg.org/ebooks/15114' },
  { t: 'Shannon, “A symbolic analysis of relay and switching circuits”, Trans. AIEE 57 (1938)', u: 'https://doi.org/10.1109/T-AIEE.1938.5057767' },
  { t: 'Sheffer, “A set of five independent postulates for Boolean algebras”, Trans. AMS 14 (1913)', u: 'https://doi.org/10.1090/S0002-9947-1913-1500960-1' },
  { t: 'Flip-flop (electronics): Eccles–Jordan trigger circuit, Wikipedia', u: 'https://en.wikipedia.org/wiki/Flip-flop_(electronics)' },
  { t: 'George Stibitz and the Model K adder, Wikipedia', u: 'https://en.wikipedia.org/wiki/George_Stibitz' },
  { t: 'Binary number, Wikipedia', u: 'https://en.wikipedia.org/wiki/Binary_number' },
];

// classes these labs go with (only those in the current program are shown)
export const CIRCUIT_CLASSES = ['phys-006', 'phys-207', 'ee-103', 'ee-106', 'ee-107', 'ee-115'];
export const LOGIC_CLASSES = ['ece-201', 'ece-202', 'comp-001'];
export const LAB_FOR = Object.fromEntries([...CIRCUIT_CLASSES.map((id) => [id, 'circuit']), ...LOGIC_CLASSES.map((id) => [id, 'logic'])]);
