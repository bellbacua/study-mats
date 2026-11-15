// Electronics devices and the ECE head start (ee-115 to ee-117, ece-201 to
// ece-204), split into parts. Practice answers are computed in place.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const op = (q, options, hint, solution) => ({ q, options, hint, solution });

export const ECE_DEVICES = {
  'ee-115': {
    predict: {
      q: 'You put a single diode between a 60 Hz AC supply and a lamp. What does the lamp get?',
      options: ['Only the positive halves of each cycle', 'Smooth DC', 'Nothing at all', 'The same AC as before'],
      answer: 0,
      reveal: 'A diode conducts one way only, so it passes the positive half-cycles and blocks the negative ones: half-wave rectification. Smoothing needs a capacitor.',
    },
    parts: [
      {
        title: 'The diode',
        minutes: 15,
        explain: [
          'A silicon diode is a p–n junction (MATE 401). Forward-biased (p side more positive), it conducts once the voltage reaches about 0.6–0.7 V. Reverse-biased, only a tiny leakage flows, until breakdown.',
          'The Shockley equation I = I_S(e^(V/V_T) − 1) describes it, with V_T ≈ 26 mV at room temperature. Each extra 60 mV of forward voltage multiplies the current about ten times.',
          'For most circuit work the simple model is enough: on with a 0.7 V drop, or off.',
        ],
        formulas: [['Shockley equation', 'I = I_S\\left(e^{V/V_T} - 1\\right)'], ['Simple model', 'V_D \\approx 0.7\\ \\text{V (on)}']],
        examples: [
          ex('A 5 V supply, a silicon diode and a 430 Ω resistor in series. Current?', [['Subtract the diode drop.', '5 - 0.7 = 4.3\\ \\text{V}'], ['Ohm’s law.', '4.3/430 = 10\\ \\text{mA}']], '10 mA'),
          ex('How much does the current grow if V rises by 60 mV?', [['Ratio.', 'e^{0.06/0.026}'], ['Calculate.', '\\approx 10']], 'About 10 times'),
        ],
        practice: [
          pr('Current in mA: 9 V, diode, 1 kΩ?', 8.3, '(9 − 0.7)/1000.', '8.3 mA.'),
          pr('Resistor in Ω to give 20 mA from 12 V through a diode?', (12 - 0.7) / 0.02, 'R = (V − 0.7)/I.', '565 Ω.'),
          pr('Current ratio when the diode voltage rises by 26 mV?', Math.E, 'e^(26/26).', 'e ≈ 2.72.'),
          op('A diode is connected backwards to 5 V through a resistor. The current is…', ['Almost zero', '5 mA', 'Very large', 'Exactly 0.7 A'], 'Reverse bias.', 'Only tiny leakage flows.'),
        ],
      },
      {
        title: 'Rectifiers',
        minutes: 15,
        explain: [
          'Half-wave: one diode passes the positive half-cycles. The average output is V_peak/π.',
          'Full-wave bridge: four diodes route both halves the same way through the load. Two diodes conduct at a time, so the peak drops by about 1.4 V, and the average is 2V_peak/π.',
          'Mains is quoted as an rms value: 230 V rms has a peak of 230√2 ≈ 325 V. A transformer usually steps it down first (PHYS 208).',
        ],
        formulas: [['Peak from rms', 'V_{peak} = \\sqrt2\\,V_{rms}'], ['Averages', 'V_{avg,half} = \\frac{V_p}{\\pi} \\qquad V_{avg,full} = \\frac{2V_p}{\\pi}']],
        examples: [
          ex('A 12 V rms transformer into a bridge. Peak DC?', [['Peak in.', '12\\sqrt2 = 16.97\\ \\text{V}'], ['Minus two diodes.', '16.97 - 1.4 = 15.6\\ \\text{V}']], '15.6 V'),
          ex('Average of a full-wave output with 15.6 V peak (no capacitor)?', [['2V_p/π.', '2\\times15.6/\\pi'], ['Result.', '9.9\\ \\text{V}']], '9.9 V'),
        ],
        practice: [
          pr('Peak in V of 230 V rms mains?', 230 * Math.SQRT2, '√2 × rms.', '325 V.'),
          pr('Peak out in V of a bridge fed 9 V rms?', 9 * Math.SQRT2 - 1.4, '9√2 − 1.4.', '11.3 V.'),
          pr('Average out in V of a half-wave rectifier with 20 V peak?', 20 / Math.PI, 'V_p/π.', '6.37 V.'),
          pr('Pulses per second from a full-wave bridge on 60 Hz?', 120, 'Two per cycle.', '120.'),
        ],
      },
      {
        title: 'Smoothing and ripple',
        minutes: 20,
        explain: [
          'A capacitor across the output charges to the peak and then feeds the load between peaks, sagging a little: the ripple V_r.',
          'The capacitor loses charge I × Δt between peaks, so V_r ≈ I/(fC) for half-wave and I/(2fC) for full-wave, where f is the mains frequency.',
          'Less ripple needs more capacitance, more current needs more capacitance, and full-wave halves the ripple. A voltage regulator chip after the capacitor removes most of what is left.',
        ],
        formulas: [['Ripple', 'V_r \\approx \\frac{I}{f\\,C}\\ (\\text{half}) \\qquad V_r \\approx \\frac{I}{2f\\,C}\\ (\\text{full})']],
        examples: [
          ex('Full-wave, 60 Hz, 200 mA, 1000 μF. Ripple?', [['Substitute.', '\\frac{0.2}{2\\times60\\times10^{-3}}'], ['Result.', '1.67\\ \\text{V}']], '1.67 V'),
          ex('Capacitor for 0.5 V ripple at the same current?', [['C = I/(2fV_r).', '\\frac{0.2}{120\\times0.5}'], ['Result.', '3333\\ \\mu\\text{F}']], 'About 3300 μF'),
        ],
        practice: [
          pr('Ripple in V: half-wave, 60 Hz, 100 mA, 470 μF?', 0.1 / (60 * 470e-6), 'I/(fC).', '3.55 V.'),
          pr('Ripple in V: full-wave, 60 Hz, 1 A, 4700 μF?', 1 / (120 * 4700e-6), 'I/(2fC).', '1.77 V.'),
          pr('Capacitor in μF for 1 V ripple, full-wave, 60 Hz, 300 mA?', (0.3 / (120 * 1)) * 1e6, 'C = I/(2fV_r).', '2500 μF.'),
          op('Switch from half-wave to full-wave with the same capacitor and load. The ripple…', ['Halves', 'Doubles', 'Stays the same', 'Disappears'], 'Peaks come twice as often.', 'Halves.'),
        ],
      },
    ],
  },

  'ee-116': {
    predict: {
      q: 'A tiny 1 mA current goes into a transistor’s base. With current gain β = 100, what can flow through its collector?',
      options: ['Up to 100 mA', '1 mA', '0.01 mA', '101 A'],
      answer: 0,
      reveal: 'That is what a transistor does: I_C = βI_B. A small current controls one β times larger, as long as the supply and load allow it.',
    },
    parts: [
      {
        title: 'Current gain',
        minutes: 15,
        explain: [
          'A bipolar junction transistor (BJT) has three legs: base, collector and emitter. A small base current lets a much larger current flow from collector to emitter: I_C = βI_B, with β typically 50–300.',
          'The emitter carries both: I_E = I_B + I_C. The base–emitter junction is a diode, so V_BE ≈ 0.7 V when the transistor is on.',
          'Find the base current from the base resistor: I_B = (V_in − 0.7) / R_B.',
        ],
        formulas: [['Gain', 'I_C = \\beta I_B \\qquad I_E = I_B + I_C'], ['Base current', 'I_B = \\frac{V_{in} - 0.7}{R_B}']],
        examples: [
          ex('V_in = 5 V, R_B = 43 kΩ, β = 150. I_C?', [['I_B.', '\\frac{4.3}{43\\,000} = 100\\ \\mu\\text{A}'], ['× β.', '150\\times100\\ \\mu\\text{A} = 15\\ \\text{mA}']], '15 mA'),
          ex('Its emitter current?', [['Add.', '15 + 0.1'], ['Result.', '15.1\\ \\text{mA}']], '15.1 mA'),
        ],
        practice: [
          pr('I_C in mA with I_B = 50 μA and β = 200?', 10, 'βI_B.', '10 mA.'),
          pr('I_B in μA with V_in = 3.3 V, R_B = 10 kΩ?', 260, '(3.3 − 0.7)/10 kΩ.', '260 μA.'),
          pr('β if I_C = 24 mA and I_B = 0.16 mA?', 150, 'I_C/I_B.', '150.'),
          pr('I_E in mA for I_B = 0.2 mA, β = 99?', 0.2 * 100, 'I_B(1 + β).', '20 mA.'),
        ],
      },
      {
        title: 'The transistor as a switch',
        minutes: 20,
        explain: [
          'The collector current cannot exceed what the supply and load allow: I_C(max) ≈ V_CC / R_load. If βI_B is more than that, the transistor is saturated: fully on, with only about 0.2 V across it.',
          'To switch reliably, designers give 2–5 times the minimum base current, because β varies a lot from one transistor to the next.',
          'With no base current the transistor is off (cut-off). So a microchip pin giving a few milliamps can switch a motor, relay or lamp drawing far more.',
        ],
        formulas: [['Load limit', 'I_{C,\\max} \\approx \\frac{V_{CC} - 0.2}{R_{load}}'], ['Minimum base current', 'I_{B,\\min} = \\frac{I_{C,\\max}}{\\beta}']],
        examples: [
          ex('A 12 V relay coil of 240 Ω, β = 100. Minimum base current?', [['Load current.', '\\frac{11.8}{240} = 49\\ \\text{mA}'], ['÷ β.', '0.49\\ \\text{mA}']], 'About 0.5 mA (use 1–2 mA)'),
          ex('Base resistor for 1.5 mA from a 5 V pin?', [['R = (V − 0.7)/I.', '\\frac{4.3}{0.0015}'], ['Result.', '2.9\\ \\text{k}\\Omega']], 'About 2.7 kΩ (a standard value)'),
        ],
        practice: [
          pr('Maximum collector current in mA: 9 V supply, 470 Ω load (V_CE(sat) = 0.2 V)?', (8.8 / 470) * 1000, '(V_CC − 0.2)/R.', '18.7 mA.'),
          pr('Minimum base current in mA to saturate 200 mA with β = 80?', 2.5, 'I_C/β.', '2.5 mA.'),
          pr('Base resistor in kΩ for 3 mA from a 3.3 V pin?', ((3.3 - 0.7) / 0.003) / 1000, '(3.3 − 0.7)/0.003.', '0.867 kΩ.'),
          op('A saturated transistor acts like…', ['A closed switch', 'An open switch', 'A capacitor', 'A battery'], 'Fully on.', 'About 0.2 V across it: closed.'),
        ],
      },
      {
        title: 'The MOSFET',
        minutes: 15,
        explain: [
          'A MOSFET has gate, drain and source. The gate sits on a thin insulating layer (silicon dioxide), so no steady gate current flows: it is controlled by voltage, not current.',
          'Below a threshold voltage V_th no channel forms and it is off. Above it, a channel of carriers forms; in saturation I_D ≈ ½k(V_GS − V_th)².',
          'When fully on, a power MOSFET behaves like a small resistance R_DS(on), maybe 0.01 Ω, so it wastes little power: P = I²R_DS(on). Chips use billions of tiny ones as switches.',
        ],
        formulas: [['Saturation current', 'I_D \\approx \\tfrac12 k\\,(V_{GS} - V_{th})^2'], ['On-state loss', 'P = I^2 R_{DS(on)}']],
        examples: [
          ex('k = 2 mA/V², V_th = 1 V, V_GS = 3 V. I_D?', [['Overdrive.', '3 - 1 = 2\\ \\text{V}'], ['Substitute.', '\\tfrac12\\times2\\times4 = 4\\ \\text{mA}']], '4 mA'),
          ex('A motor draws 10 A through a MOSFET with R_DS(on) = 20 mΩ. Heat?', [['I²R.', '100\\times0.02'], ['Result.', '2\\ \\text{W}']], '2 W'),
        ],
        practice: [
          pr('I_D in mA: k = 4 mA/V², V_th = 2 V, V_GS = 5 V?', 0.5 * 4 * 9, '½k(V_GS − V_th)².', '18 mA.'),
          pr('I_D in mA when V_GS = 1.5 V and V_th = 2 V?', 0, 'Below threshold.', '0: off.'),
          pr('Power in W lost in R_DS(on) = 5 mΩ at 20 A?', 2, 'I²R.', '400 × 0.005 = 2 W.'),
          op('Why can a microchip drive a MOSFET gate with almost no current?', ['The gate is insulated from the channel', 'MOSFETs need no power at all', 'The gate is a diode', 'The chip makes huge currents'], 'Silicon dioxide insulator.', 'Only the gate’s small capacitance must be charged.'),
        ],
      },
    ],
  },

  'ee-117': {
    predict: {
      q: 'An op-amp has a raw gain of 100,000. You add feedback resistors to make an amplifier of gain 10. If the raw gain halves with heat, the amplifier’s gain becomes about…',
      options: ['Still about 10', '5', '50,000', '0'],
      answer: 0,
      reveal: 'With negative feedback the gain is A/(1 + Aβ) ≈ 1/β. Halving A from 100,000 to 50,000 changes the result from 9.9990 to 9.9980. That steadiness is Harold Black’s whole idea.',
    },
    parts: [
      {
        title: 'Negative feedback',
        minutes: 15,
        explain: [
          'Feed a fraction β of the output back and subtract it from the input. The amplifier then sees only the small difference, and the overall gain becomes A_f = A/(1 + Aβ).',
          'When Aβ is large (it usually is: A may be 100,000), A_f ≈ 1/β, which depends only on resistor values. Distortion and drift inside the amplifier are cut by the factor 1 + Aβ.',
          'The price is raw gain: you throw most of it away to buy accuracy.',
        ],
        formulas: [['Closed-loop gain', 'A_f = \\frac{A}{1 + A\\beta} \\approx \\frac{1}{\\beta}']],
        examples: [
          ex('A = 200,000, β = 0.01. A_f?', [['Aβ = 2000.', 'A_f = \\frac{200\\,000}{2001}'], ['Result.', '99.95']], '99.95 (close to 100)'),
          ex('A drops to 100,000. New A_f?', [['Aβ = 1000.', '\\frac{100\\,000}{1001}'], ['Result.', '99.90']], '99.90: barely changed'),
        ],
        practice: [
          pr('A_f for A = 1000 and β = 0.1?', 1000 / 101, 'A/(1 + Aβ).', '9.90.'),
          pr('A_f for A = 10⁶ and β = 0.02?', 1e6 / (1 + 2e4), 'Same.', '50.0.'),
          pr('β needed for a closed-loop gain of about 25?', 0.04, 'β ≈ 1/A_f.', '0.04.'),
          op('What do you give up with negative feedback?', ['Raw gain', 'Accuracy', 'Stability', 'Input resistance always'], 'A_f is much less than A.', 'Gain.'),
        ],
      },
      {
        title: 'The two golden rules',
        minutes: 15,
        explain: [
          'An ideal op-amp with negative feedback obeys two rules. 1: the output does whatever it takes to make V₊ = V₋. 2: no current flows into either input.',
          'With these rules, solve any op-amp circuit by writing Kirchhoff’s current law at the − input.',
          'A voltage follower (output tied straight to −, signal into +) has gain 1 but a very high input resistance, so it copies a weak signal without loading it (ELEC 107).',
        ],
        formulas: [['Rule 1', 'V_+ = V_-'], ['Rule 2', 'I_+ = I_- = 0']],
        examples: [
          ex('Inverting amp: R_in = 2 kΩ, R_f = 10 kΩ, V_in = 0.3 V. V_out?', [['V₋ = 0, so I = 0.3/2000 = 0.15 mA through both.', 'V_{out} = 0 - 0.15\\,\\text{mA}\\times10\\,\\text{k}\\Omega'], ['Result.', '-1.5\\ \\text{V}']], '−1.5 V'),
          ex('Voltage follower with 2 V in. Output?', [['V₊ = V₋ = V_out.', 'V_{out} = V_{in}'], ['Result.', '2\\ \\text{V}']], '2 V'),
        ],
        practice: [
          pr('Inverting amp R_in = 1 kΩ, R_f = 4.7 kΩ, V_in = 0.5 V. V_out in V?', -2.35, '−R_f/R_in × V_in.', '−2.35 V.'),
          pr('Current in mA through R_in = 5 kΩ with 2 V in (inverting)?', 0.4, 'V_in/R_in (the − input is at 0 V).', '0.4 mA.'),
          pr('Follower gain?', 1, 'Output copies input.', '1.'),
          op('With feedback working, the voltage between the two op-amp inputs is…', ['Almost zero', 'Equal to the output', 'Equal to the supply', 'Huge'], 'Rule 1.', 'Almost zero.'),
        ],
      },
      {
        title: 'Inverting, non-inverting and summing',
        minutes: 20,
        explain: [
          'Inverting: G = −R_f/R_in. The input resistance is just R_in. Non-inverting: G = 1 + R_f/R_g, with a very high input resistance.',
          'Summing amplifier: several inputs, each through its own resistor, into the − input. V_out = −R_f(V₁/R₁ + V₂/R₂ + …). This is how audio mixers add channels.',
          'Real op-amps cannot swing past their supply rails. With ±12 V supplies, an output asked for −15 V just sticks near −11 V (clipping).',
        ],
        formulas: [['Non-inverting', 'G = 1 + \\frac{R_f}{R_g}'], ['Summing', 'V_{out} = -R_f\\left(\\frac{V_1}{R_1} + \\frac{V_2}{R_2}\\right)']],
        examples: [
          ex('Non-inverting with R_g = 2.2 kΩ, R_f = 22 kΩ, 0.1 V in. V_out?', [['Gain.', '1 + 10 = 11'], ['Output.', '11\\times0.1 = 1.1\\ \\text{V}']], '1.1 V'),
          ex('Summing: R_f = 10 kΩ, V₁ = 1 V on 10 kΩ, V₂ = 0.5 V on 5 kΩ. V_out?', [['Add the currents.', '\\frac{1}{10k} + \\frac{0.5}{5k} = 0.2\\ \\text{mA}'], ['× R_f, inverted.', '-2\\ \\text{V}']], '−2 V'),
        ],
        practice: [
          pr('Non-inverting gain with R_g = 1 kΩ, R_f = 47 kΩ?', 48, '1 + 47.', '48.'),
          pr('R_f in kΩ for a non-inverting gain of 21 with R_g = 1 kΩ?', 20, 'R_f = (G − 1)R_g.', '20 kΩ.'),
          pr('Summing amp R_f = 20 kΩ; inputs 1 V and 2 V each on 10 kΩ. V_out in V?', -6, '−20k × (0.1 + 0.2) mA.', '−6 V.'),
          op('An inverting amp of gain −10 gets 2 V in with ±12 V supplies. Output?', ['Clips near −11 V', '−20 V', '+20 V', '−10 V'], 'It cannot pass the supply.', 'It saturates near the negative rail.'),
        ],
      },
    ],
  },

  'ece-201': {
    predict: {
      q: 'You have a box of NAND gates and nothing else. Which of these can you build?',
      options: ['Every logic circuit there is', 'Only NOT', 'Only AND and NOT', 'Nothing useful'],
      answer: 0,
      reveal: 'NAND is universal: tie its inputs for NOT, add a NOT for AND, and use De Morgan’s law for OR. Every digital circuit can be built from NANDs alone.',
    },
    parts: [
      {
        title: 'Gates and truth tables',
        minutes: 15,
        explain: [
          'A logic gate takes inputs that are 0 (low voltage) or 1 (high voltage) and gives an output by a fixed rule. AND is 1 only if all inputs are 1. OR is 1 if any input is 1. NOT flips. NAND and NOR are AND and OR followed by NOT. XOR is 1 when the inputs differ.',
          'A truth table lists every input combination: n inputs give 2ⁿ rows.',
          'Boole’s notation: AND is written like multiplication (A·B), OR like addition (A + B), NOT with a bar (Ā).',
        ],
        formulas: [['Rows', '\\text{rows} = 2^n'], ['Notation', 'A\\cdot B \\quad A + B \\quad \\overline{A} \\quad A \\oplus B']],
        examples: [
          ex('A = 1, B = 0. AND, OR, XOR, NAND?', [['AND and OR.', 'A\\cdot B = 0 \\qquad A + B = 1'], ['XOR and NAND.', 'A\\oplus B = 1 \\qquad \\overline{A\\cdot B} = 1']], '0, 1, 1, 1'),
          ex('How many input rows for a 4-input gate?', [['2ⁿ.', '2^4'], ['Result.', '16']], '16'),
        ],
        practice: [
          pr('Output of NOR with A = 0, B = 0?', 1, 'NOT(OR).', 'OR = 0, so NOR = 1.'),
          pr('Output of XOR with A = 1, B = 1?', 0, 'Differ?', 'Same, so 0.'),
          pr('Number of rows for 5 inputs?', 32, '2⁵.', '32.'),
          pr('How many of the 4 rows of a 2-input AND give 1?', 1, 'Only 1·1.', '1.'),
        ],
      },
      {
        title: 'De Morgan and NAND',
        minutes: 15,
        explain: [
          'De Morgan’s laws: NOT(A AND B) = (NOT A) OR (NOT B), and NOT(A OR B) = (NOT A) AND (NOT B). "Break the bar, change the sign."',
          'With them, NAND builds everything: NOT A = A NAND A. A AND B = NOT(A NAND B). A OR B = (NOT A) NAND (NOT B).',
          'In CMOS, NAND and NOR are the cheapest gates (four transistors each), which is why chips are full of them.',
        ],
        formulas: [['De Morgan', '\\overline{A\\cdot B} = \\overline{A} + \\overline{B} \\qquad \\overline{A + B} = \\overline{A}\\cdot\\overline{B}']],
        examples: [
          ex('How many NAND gates make an OR?', [['NOT each input: 2 NANDs.', '\\overline{A},\\ \\overline{B}'], ['Then NAND them.', '\\overline{\\overline{A}\\cdot\\overline{B}} = A + B']], '3 NANDs'),
          ex('How many NAND gates make an AND?', [['NAND first.', '\\overline{A\\cdot B}'], ['Then NOT it.', '2\\ \\text{NANDs}']], '2 NANDs'),
        ],
        practice: [
          pr('NAND gates needed for a NOT?', 1, 'Tie both inputs.', '1.'),
          pr('NAND gates needed for a NOR (OR then NOT)?', 4, 'OR takes 3, then a NOT.', '4.'),
          op('NOT(A + B) equals…', ['Ā · B̄', 'Ā + B̄', 'A · B', 'A ⊕ B'], 'Break the bar, change the sign.', 'Ā · B̄.'),
          op('A CMOS inverter is made of…', ['Two transistors: one pulls up, one pulls down', 'One diode', 'Four resistors', 'A relay'], 'Complementary MOS.', 'One p-type and one n-type MOSFET.'),
        ],
      },
      {
        title: 'Simplifying with Karnaugh maps',
        minutes: 20,
        explain: [
          'Algebra rules shrink expressions: A + Ā = 1, A·Ā = 0, A + AB = A, and AB + AB̄ = A.',
          'A Karnaugh map lays out the truth table so neighbouring cells differ in exactly one input. Circle rectangular groups of 1s of size 1, 2, 4 or 8; each group becomes one AND term, and the circled groups are ORed.',
          'Bigger groups mean simpler terms: a group of 2 removes one input, a group of 4 removes two.',
        ],
        formulas: [['Merging', 'AB + A\\overline{B} = A'], ['Absorption', 'A + AB = A']],
        examples: [
          ex('Simplify A·B + A·B̄ + Ā·B.', [['Merge the first two.', 'A + \\overline{A}B'], ['A + ĀB = A + B.', 'A + B']], 'A + B'),
          ex('In a 3-input map, a group of 4 cells removes how many inputs?', [['Group of 2ᵏ removes k.', '4 = 2^2'], ['Result.', '2 \\text{ inputs removed}']], '2, leaving one input'),
        ],
        practice: [
          pr('How many inputs does a group of 8 remove in a 4-input map?', 3, '8 = 2³.', '3.'),
          op('Simplify A + A·B.', ['A', 'B', 'A·B', 'A + B'], 'Absorption.', 'A.'),
          op('Simplify (A + B)(A + B̄).', ['A', 'B', '1', 'A·B'], 'Expand, or use the dual of merging.', 'A.'),
          pr('How many rows of a 3-input majority function are 1?', 4, 'Rows with two or more 1s.', '011, 101, 110, 111: 4.'),
        ],
      },
    ],
  },

  'ece-202': {
    predict: {
      q: 'You chain 3 flip-flops, each toggling when the one before it falls. A 1 kHz clock goes in. What comes out of the last one?',
      options: ['125 Hz', '333 Hz', '3 kHz', '1 kHz'],
      answer: 0,
      reveal: 'Each toggle stage halves the frequency: 1000 → 500 → 250 → 125 Hz. Three stages divide by 2³ = 8.',
    },
    parts: [
      {
        title: 'Latches: memory from feedback',
        minutes: 15,
        explain: [
          'Cross-couple two NAND gates (each output into the other’s input) and the pair has two stable states. That is a latch: one stored 0 or 1.',
          'In the NAND SR latch, the inputs are active-low: pulling S̄ to 0 sets Q = 1; pulling R̄ to 0 resets Q = 0; leaving both at 1 holds the stored value. Both at 0 is forbidden.',
          'Eccles and Jordan built the first such circuit in 1918 with two vacuum tubes.',
        ],
        formulas: [['NAND SR latch', 'Q = \\overline{\\overline{S}\\cdot\\overline{Q}} \\qquad \\overline{Q} = \\overline{\\overline{R}\\cdot Q}']],
        examples: [
          ex('Q = 0. S̄ is pulsed to 0 and back to 1. Q now?', [['Setting.', 'Q \\to 1'], ['Inputs back to 1: hold.', 'Q = 1']], '1'),
          ex('Then R̄ is pulsed to 0. Q?', [['Reset.', 'Q \\to 0'], ['Holds after.', 'Q = 0']], '0'),
        ],
        practice: [
          pr('Stable states of a latch?', 2, 'Q = 0 or Q = 1.', '2.'),
          pr('How many latches store a 4-digit binary number?', 4, 'One per digit.', '4.'),
          op('Both inputs of a NAND SR latch are left at 1. The latch…', ['Holds its value', 'Sets to 1', 'Resets to 0', 'Oscillates'], 'Active-low inputs.', 'Holds.'),
          op('What makes a latch remember?', ['Its outputs feed back into its inputs', 'A battery inside', 'A capacitor', 'Magnetism'], 'Cross-coupling.', 'Feedback.'),
        ],
      },
      {
        title: 'Clocks and D flip-flops',
        minutes: 15,
        explain: [
          'A D flip-flop copies its D input to Q at each rising edge of the clock, and ignores D the rest of the time.',
          'Every flip-flop in a system shares one clock, so all change at the same instant. Between edges, the gates have time to settle. The clock period must exceed the slowest gate path.',
          'A chip at 3 GHz has a clock period of only 0.33 ns; light travels 10 cm in that time.',
        ],
        formulas: [['Clock period', 'T = \\frac{1}{f_{clock}}'], ['D flip-flop', 'Q_{next} = D \\text{ at each rising edge}']],
        examples: [
          ex('Clock period of a 16 MHz microcontroller?', [['1/f.', '\\frac{1}{16\\times10^{6}}'], ['Result.', '62.5\\ \\text{ns}']], '62.5 ns'),
          ex('The slowest gate path takes 8 ns. Maximum clock?', [['f = 1/T.', '\\frac{1}{8\\times10^{-9}}'], ['Result.', '125\\ \\text{MHz}']], '125 MHz'),
        ],
        practice: [
          pr('Clock period in ns at 50 MHz?', 20, '1/f.', '20 ns.'),
          pr('Maximum clock in MHz if the slowest path is 4 ns?', 250, '1/T.', '250 MHz.'),
          pr('Distance in cm light travels in one period of a 1 GHz clock?', 30, 'c × T.', '3 × 10⁸ × 10⁻⁹ = 0.3 m.'),
          op('D changes between clock edges. Q…', ['Stays the same until the next edge', 'Follows D at once', 'Becomes 0', 'Becomes random'], 'Edge-triggered.', 'Holds.'),
        ],
      },
      {
        title: 'Counters and dividers',
        minutes: 15,
        explain: [
          'A toggle flip-flop changes state at every clock edge, so its output is a square wave at half the clock frequency.',
          'Chain n of them, each clocked by the one before, and the outputs read as a binary count from 0 to 2ⁿ − 1, while the last one runs at f/2ⁿ.',
          'Watch crystals vibrate at 32,768 Hz = 2¹⁵, so 15 stages give exactly 1 Hz. Counters that reset early (at 10, say) count in tens for digital displays.',
        ],
        formulas: [['Divider', 'f_{out} = \\frac{f_{in}}{2^n}'], ['Count range', '0 \\ldots 2^n - 1']],
        examples: [
          ex('32,768 Hz through 10 stages?', [['2¹⁰ = 1024.', '32\\,768/1024'], ['Result.', '32\\ \\text{Hz}']], '32 Hz'),
          ex('Largest count of an 8-stage counter?', [['2⁸ − 1.', '256 - 1'], ['Result.', '255']], '255'),
        ],
        practice: [
          pr('Output in Hz of 1 MHz through 10 stages?', 1e6 / 1024, 'Divide by 2¹⁰.', '976.6 Hz.'),
          pr('Stages needed to divide by 64?', 6, '2⁶ = 64.', '6.'),
          pr('Largest count of a 12-stage counter?', 4095, '2¹² − 1.', '4095.'),
          pr('Frequency in Hz after 14 stages from 32,768 Hz?', 2, '32,768 / 16,384.', '2 Hz.'),
        ],
      },
    ],
  },

  'ece-203': {
    predict: {
      q: 'A camera films a spinning wheel at 24 frames per second. The wheel turns 23 times a second. What do you see?',
      options: ['The wheel seems to turn slowly backwards', 'It looks perfectly normal', 'It looks frozen', 'It seems to spin twice as fast'],
      answer: 0,
      reveal: 'Each frame catches the wheel just short of a full turn, so it seems to creep backwards once a second. That is aliasing: sampling too slowly makes a fast motion look like a slow false one.',
    },
    parts: [
      {
        title: 'The sampling rate',
        minutes: 15,
        explain: [
          'To turn a signal into numbers, measure it at regular instants: f_s samples per second.',
          'The Nyquist–Shannon theorem: if the signal has no frequencies above f_max, sampling faster than 2f_max captures it completely; it can be rebuilt exactly.',
          'Half the sampling rate, f_s/2, is the Nyquist frequency. Telephone voice (up to about 3.4 kHz) is sampled at 8 kHz; CD audio (to 20 kHz) at 44.1 kHz.',
        ],
        formulas: [['Nyquist rate', 'f_s > 2 f_{max}'], ['Nyquist frequency', 'f_N = \\frac{f_s}{2}']],
        examples: [
          ex('Minimum sampling rate for an ultrasound signal up to 40 kHz?', [['Twice f_max.', '2\\times40'], ['Result.', '80\\ \\text{kHz (use more in practice)}']], 'Above 80 kHz'),
          ex('Highest frequency a 48 kHz recorder can capture?', [['f_s / 2.', '48/2'], ['Result.', '24\\ \\text{kHz}']], '24 kHz'),
        ],
        practice: [
          pr('Minimum rate in kHz for signals up to 15 kHz?', 30, '2 × 15.', '30 kHz.'),
          pr('Nyquist frequency in kHz of a 96 kHz recorder?', 48, 'f_s/2.', '48 kHz.'),
          pr('Samples in one minute at 44.1 kHz (in millions)?', (44100 * 60) / 1e6, '44,100 × 60.', '2.646 million.'),
          op('What must come before the sampler?', ['A low-pass filter that removes frequencies above f_s/2', 'A high-pass filter', 'An amplifier of gain 0', 'Nothing'], 'Stop aliasing at the source.', 'An anti-aliasing low-pass filter.'),
        ],
      },
      {
        title: 'Aliasing',
        minutes: 15,
        explain: [
          'A frequency above the Nyquist frequency does not vanish: it folds down and appears as a false lower frequency, f_alias = |f − k f_s| for the nearest whole k.',
          'Once it has happened, the alias cannot be told apart from a real signal at that frequency. So it must be prevented with a filter before sampling.',
          'Wagon wheels in films, flickering LED lights on video and strange patterns on striped shirts are all aliasing.',
        ],
        formulas: [['Alias frequency', 'f_{alias} = |f - k f_s|']],
        examples: [
          ex('A 30 kHz tone sampled at 44.1 kHz. Alias?', [['k = 1.', '|30 - 44.1|'], ['Result.', '14.1\\ \\text{kHz}']], '14.1 kHz'),
          ex('A 61 Hz signal sampled at 60 Hz. Alias?', [['k = 1.', '|61 - 60|'], ['Result.', '1\\ \\text{Hz}']], '1 Hz'),
        ],
        practice: [
          pr('Alias in kHz of 7 kHz sampled at 8 kHz?', 1, '|7 − 8|.', '1 kHz.'),
          pr('Alias in kHz of 25 kHz sampled at 20 kHz?', 5, '|25 − 20|.', '5 kHz.'),
          pr('Alias in Hz of 1010 Hz sampled at 1000 Hz?', 10, '|1010 − 1000|.', '10 Hz.'),
          pr('A fan blade passes 25 times a second, filmed at 24 frames per second. Apparent rate in passes per second?', 1, '|25 − 24|.', '1.'),
        ],
      },
      {
        title: 'Quantization and bits',
        minutes: 15,
        explain: [
          'An n-bit converter rounds each sample to one of 2ⁿ levels. The step size is Δ = V_range / 2ⁿ.',
          'The rounding error behaves like faint noise. The best possible signal-to-noise ratio for a full-scale sine is about 6.02n + 1.76 dB: each extra bit adds about 6 dB.',
          'The data rate is samples per second × bits per sample × channels. CD audio: 44,100 × 16 × 2 = 1.41 million bits per second.',
        ],
        formulas: [['Levels and step', '2^n \\qquad \\Delta = \\frac{V_{range}}{2^n}'], ['Noise limit', '\\text{SNR} \\approx 6.02n + 1.76\\ \\text{dB}']],
        examples: [
          ex('Step size of a 12-bit converter over 0–3.3 V?', [['2¹² = 4096.', '3.3/4096'], ['Result.', '0.81\\ \\text{mV}']], '0.81 mV'),
          ex('Best SNR of a 16-bit converter?', [['Substitute.', '6.02\\times16 + 1.76'], ['Result.', '98.1\\ \\text{dB}']], '98 dB'),
        ],
        practice: [
          pr('Step size in mV of an 8-bit converter over 0–5 V?', (5 / 256) * 1000, '5/2⁸.', '19.5 mV.'),
          pr('Best SNR in dB of a 10-bit converter?', 6.02 * 10 + 1.76, '6.02n + 1.76.', '62 dB.'),
          pr('Bits per second (in thousands) for one 8 kHz, 8-bit phone channel?', 64, '8000 × 8.', '64 thousand: the standard 64 kbit/s channel.'),
          pr('Minimum bits for at least 85 dB SNR?', 14, 'n ≥ (85 − 1.76)/6.02 ≈ 13.8, round up.', '14 bits (about 86 dB).', { tol: 0 }),
        ],
      },
    ],
  },

  'ece-204': {
    predict: {
      q: 'An AM station broadcasts music with sounds up to 5 kHz. How wide a slice of the radio dial does it use?',
      options: ['10 kHz', '5 kHz', '2.5 kHz', 'Just one exact frequency'],
      answer: 0,
      reveal: 'AM puts copies of the audio on both sides of the carrier (sidebands at f_c ± f_m), so it occupies 2 × 5 = 10 kHz.',
    },
    parts: [
      {
        title: 'Why modulate',
        minutes: 15,
        explain: [
          'Sound frequencies (20 Hz–20 kHz) would need antennas kilometres long (ELEC 112), and every station would sit on the same frequencies.',
          'So the message rides on a carrier: a high-frequency sine wave that suits antennas and gives each station its own slot. Modulation means varying the carrier’s size (AM), frequency (FM) or phase in step with the message.',
          'At the receiver, a tuned circuit (ELEC 108) picks one carrier and a demodulator recovers the message.',
        ],
        formulas: [['Carrier', 'c(t) = A_c\\cos(2\\pi f_c t)'], ['Antenna size check', '\\lambda = \\frac{c}{f}']],
        examples: [
          ex('Wavelength of a 3 kHz tone as a radio wave?', [['c/f.', '\\frac{3\\times10^{8}}{3000}'], ['Result.', '100\\ \\text{km}']], '100 km: impossible antenna'),
          ex('Wavelength of a 100 MHz FM carrier?', [['c/f.', '\\frac{3\\times10^{8}}{10^{8}}'], ['Result.', '3\\ \\text{m}']], '3 m: a practical antenna'),
        ],
        practice: [
          pr('Wavelength in km of a 1 kHz tone?', 300, 'c/f.', '300 km.'),
          pr('Quarter-wave antenna length in m for a 1 MHz AM carrier?', 75, 'λ/4 = 300/4.', '75 m: AM towers are tall.'),
          op('Why does each station need its own carrier frequency?', ['So receivers can tune to one and reject the rest', 'To make the music louder', 'Because antennas need DC', 'To save power'], 'Think of a tuner.', 'Separate slots on the dial.'),
          op('What does a demodulator do?', ['Recovers the message from the carrier', 'Makes the carrier', 'Amplifies the antenna', 'Converts AC to DC power'], 'The reverse of modulation.', 'Gets the audio back.'),
        ],
      },
      {
        title: 'AM',
        minutes: 15,
        explain: [
          'In AM the carrier’s amplitude follows the message: s(t) = A_c[1 + m cos 2πf_m t] cos 2πf_c t. The depth m runs from 0 to 1; above 1 the envelope distorts (over-modulation).',
          'Multiplying out gives three waves: the carrier at f_c and two sidebands at f_c ± f_m, each of size mA_c/2. So the bandwidth is 2f_m.',
          'The carrier carries no information but most of the power: at m = 1, only a third of the total power is in the sidebands.',
        ],
        formulas: [['Sidebands', 'f_c \\pm f_m'], ['Bandwidth', 'B_{AM} = 2f_m'], ['Sideband power share', '\\frac{m^2/2}{1 + m^2/2}']],
        examples: [
          ex('A 702 kHz station sends a 3 kHz tone. Sideband frequencies?', [['f_c ± f_m.', '702 \\pm 3'], ['Result.', '699\\ \\text{and}\\ 705\\ \\text{kHz}']], '699 kHz and 705 kHz'),
          ex('Sideband power share at m = 0.5?', [['Substitute.', '\\frac{0.125}{1.125}'], ['Result.', '11\\%']], '11%'),
        ],
        practice: [
          pr('AM bandwidth in kHz for audio up to 4.5 kHz?', 9, '2f_m.', '9 kHz.'),
          pr('Upper sideband in kHz: carrier 1 MHz, tone 2 kHz?', 1002, 'f_c + f_m.', '1002 kHz.'),
          pr('Sideband power share in % at m = 1?', 100 / 3, '0.5/1.5.', '33.3%.'),
          op('Modulation depth m = 1.4 causes…', ['Distortion: the envelope folds over', 'More bandwidth but no harm', 'A louder clean signal', 'No signal'], 'm must stay at or below 1.', 'Over-modulation.'),
        ],
      },
      {
        title: 'FM and Carson’s rule',
        minutes: 15,
        explain: [
          'In FM the carrier’s size stays fixed and its frequency swings: f(t) = f_c + Δf cos 2πf_m t. Δf is the peak deviation; β = Δf/f_m is the modulation ratio.',
          'FM makes many sidebands. Carson’s rule estimates the bandwidth that holds 98% of the power: B ≈ 2(Δf + f_m).',
          'FM broadcast uses Δf = 75 kHz and audio to 15 kHz, about 180 kHz per station, so it needs the roomy 88–108 MHz band. In return, noise (which changes size, not frequency) is largely removed.',
        ],
        formulas: [['Modulation ratio', '\\beta = \\frac{\\Delta f}{f_m}'], ['Carson’s rule', 'B_{FM} \\approx 2(\\Delta f + f_m)']],
        examples: [
          ex('Two-way radio: Δf = 5 kHz, f_m = 3 kHz. Bandwidth?', [['Carson.', '2(5 + 3)'], ['Result.', '16\\ \\text{kHz}']], '16 kHz'),
          ex('β for FM broadcast at f_m = 15 kHz?', [['Δf / f_m.', '75/15'], ['Result.', '5']], '5'),
        ],
        practice: [
          pr('Carson bandwidth in kHz: Δf = 50 kHz, f_m = 10 kHz?', 120, '2(50 + 10).', '120 kHz.'),
          pr('β for Δf = 12 kHz, f_m = 4 kHz?', 3, 'Δf/f_m.', '3.'),
          pr('How many 200 kHz FM channels fit in 88–108 MHz?', 100, '20 MHz / 0.2 MHz.', '100.'),
          op('FM resists static better than AM because…', ['Static mostly changes amplitude, and FM carries the message in frequency', 'FM uses lower frequencies', 'FM has no sidebands', 'FM uses less bandwidth'], 'What does a lightning crackle add?', 'Amplitude spikes, which the FM receiver clips off.'),
        ],
      },
    ],
  },
};
