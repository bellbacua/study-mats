// Electronics foundations (ee-100 to ee-107), split into parts.
// Practice answers are computed in place so the numbers cannot drift from the working.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const op = (q, options, hint, solution) => ({ q, options, hint, solution });

const K = 8.99e9;
const MU0 = 4e-7 * Math.PI;
const EPS0 = 8.854e-12;
const par = (a, b) => (a * b) / (a + b);

export const ECE_FOUND = {
  'ee-100': {
    predict: {
      q: 'A person touches 230 V with dry hands, then again with wet hands. How does the current through the body change?',
      options: ['It can rise about 100 times', 'It stays the same: the voltage is the same', 'It halves', 'It doubles'],
      answer: 0,
      reveal: 'Most of the body’s resistance is in the skin. Wet skin can drop from about 100 kΩ to about 1 kΩ, so by Ohm’s law the current rises about a hundredfold, from a tingle to deadly.',
    },
    parts: [
      {
        title: 'The body as a resistor',
        minutes: 15,
        explain: [
          'Your body is mostly salty water, which conducts well. The skin is the main resistance: thick, dry skin may be 100 kΩ or more; wet or broken skin perhaps 1 kΩ. Inside, hand to foot, is only about 500 Ω.',
          'So the current is set by Ohm’s law, I = V / R. The same outlet can give a tingle or a fatal shock depending on how wet you are and what you stand on.',
          'Work in milliamps: 1 mA = 0.001 A. A useful shortcut: volts ÷ kilohms = milliamps.',
        ],
        formulas: [['Ohm’s law for the body', 'I = \\frac{V}{R_{\\text{body}}}'], ['Handy units', '\\frac{\\text{V}}{\\text{k}\\Omega} = \\text{mA}']],
        examples: [
          ex('230 V across a body path of 2 kΩ. Current in mA?', [['Volts over kilohms gives milliamps.', 'I = \\frac{230}{2} = 115\\ \\text{mA}'], ['Compare with the danger level.', '115 > 50\\text{–}100\\ \\text{mA}']], '115 mA: dangerous'),
          ex('A 12 V car battery across dry hands of 50 kΩ. Current in mA?', [['Divide.', 'I = \\frac{12}{50} = 0.24\\ \\text{mA}'], ['Below the 1 mA you can feel.', '0.24 < 1']], '0.24 mA: not even felt'),
        ],
        practice: [
          pr('230 V across wet skin, total path 1.2 kΩ. Current in mA?', 230 / 1.2, 'V ÷ kΩ = mA.', '230 / 1.2 ≈ 192 mA.'),
          pr('230 V across dry skin, 80 kΩ. Current in mA?', 230 / 80, 'V ÷ kΩ.', '230 / 80 ≈ 2.9 mA: felt, not usually dangerous.'),
          pr('What body resistance in kΩ makes 230 V drive exactly 30 mA?', 230 / 30, 'R = V / I, with I in mA gives kΩ.', '230 / 30 ≈ 7.7 kΩ.'),
          pr('A 9 V battery on a wet tongue (about 3 kΩ). Current in mA?', 9 / 3, 'V ÷ kΩ.', '3 mA: that is the sharp tingle.'),
        ],
      },
      {
        title: 'What each current does',
        minutes: 15,
        explain: [
          'For 50–60 Hz mains current from hand to hand or hand to foot, rough thresholds are: about 1 mA felt; about 5 mA painful; about 10–20 mA the muscles lock and you cannot let go; about 50–100 mA for a second can throw the heart into fibrillation.',
          'Time matters. The longer the current flows, the lower the current that harms the heart, which is why safety switches must act in tens of milliseconds.',
          'Path matters too. Current through the chest is far more dangerous than through one finger. Electricians keep one hand away from the work for this reason.',
        ],
        formulas: [['Rough thresholds', '1\\ \\text{mA felt} \\quad 10\\text{–}20\\ \\text{mA let-go} \\quad 50\\text{–}100\\ \\text{mA heart}']],
        examples: [
          ex('Is 18 mA dangerous for a person gripping a wire?', [['Compare with the let-go range.', '10 \\le 18 \\le 20\\ \\text{mA}'], ['Their hand may clamp on, so the shock keeps going.', '\\text{dangerous}']], 'Yes: they may be unable to let go'),
          ex('What voltage across 1 kΩ reaches 50 mA?', [['Rearrange Ohm’s law.', 'V = IR'], ['Substitute.', '0.05 \\times 1000 = 50\\ \\text{V}']], '50 V'),
        ],
        practice: [
          pr('What voltage drives 10 mA through a 1.5 kΩ wet-hand path? (V)', 0.01 * 1500, 'V = IR.', '0.01 × 1500 = 15 V.'),
          pr('What voltage drives 100 mA through a 500 Ω internal path (skin broken)? (V)', 0.1 * 500, 'V = IR.', '50 V.'),
          op('Which current is most likely to stop the heart if it passes across the chest for a second?', ['80 mA', '0.5 mA', '3 mA', '8 mA'], 'The heart range is 50–100 mA.', '80 mA.'),
          op('Why must a safety switch act fast?', ['Lower currents become dangerous the longer they flow', 'Fast switches use less power', 'Slow switches spark', 'Current grows with time by itself'], 'Time matters.', 'Harm depends on both current and duration.'),
        ],
      },
      {
        title: 'Earthing, fuses and the RCD',
        minutes: 20,
        explain: [
          'An earth (ground) wire joins a metal case to the ground. If a live wire touches the case, a large current flows to earth and blows the fuse or trips the breaker, instead of waiting for a person to complete the path.',
          'Fuses and breakers protect wires from overheating. They trip at amps, not milliamps, so they do not protect people from a shock.',
          'A residual-current device (RCD, also called RCCB or GFCI) compares live and neutral. If they differ by about 30 mA, some current is leaking, perhaps through someone, and it switches off within about 30 ms. The Philippine Electrical Code requires this kind of protection in wet locations.',
        ],
        formulas: [['Leakage the RCD sees', 'I_{\\text{leak}} = I_{\\text{live}} - I_{\\text{neutral}} \\quad \\text{trip if } > 30\\ \\text{mA}']],
        examples: [
          ex('Live carries 5.032 A, neutral 5.000 A. Does a 30 mA RCD trip?', [['Find the difference.', '5.032 - 5.000 = 0.032\\ \\text{A}'], ['Compare.', '32\\ \\text{mA} > 30\\ \\text{mA}']], 'Yes'),
          ex('A live wire touches an earthed case: path to earth 0.5 Ω total. Fault current?', [['Ohm’s law.', 'I = \\frac{230}{0.5}'], ['Calculate.', 'I = 460\\ \\text{A}']], '460 A: the breaker trips at once'),
        ],
        practice: [
          pr('Live 2.415 A, neutral 2.400 A. Leakage in mA?', 15, 'Subtract and convert.', '0.015 A = 15 mA: below 30 mA, no trip.'),
          pr('A fault path to earth of 1.15 Ω on 230 V. Current in A?', 230 / 1.15, 'I = V / R.', '200 A.'),
          op('What does a 16 A breaker protect?', ['The wiring, from overheating', 'People, from shocks', 'The meter', 'The earth wire only'], 'It trips at amps.', 'Wiring.'),
          op('A person touches live and neutral at once, with no current to earth. Does the RCD trip?', ['No: live and neutral currents still balance', 'Yes, always', 'Only on wet floors', 'Only if the case is earthed'], 'What does the RCD compare?', 'The current goes out and comes back, so it balances. That is why you still must switch off before working.'),
        ],
      },
    ],
  },

  'ee-101': {
    predict: {
      q: 'Two charged balls are 10 cm apart. You move them to 20 cm apart. The push between them becomes…',
      options: ['A quarter', 'Half', 'The same', 'Double'],
      answer: 0,
      reveal: 'Coulomb’s torsion balance showed the force falls with the square of distance. Twice as far means 2² = 4 times weaker.',
    },
    parts: [
      {
        title: 'Two kinds of charge',
        minutes: 15,
        explain: [
          'Matter is made of atoms: positive protons in the nucleus, negative electrons around it. Normally they balance. Rubbing can move electrons from one material to another, leaving one side with extra electrons (negative) and the other short (positive).',
          'Like charges repel; unlike charges attract. A charged object can also attract a neutral one, by pulling its electrons slightly to one side.',
          'Charge is measured in coulombs (C). One electron carries −1.602 × 10⁻¹⁹ C, so one coulomb is about 6.24 × 10¹⁸ electrons.',
        ],
        formulas: [['Charge in lumps', 'q = n\\,e \\qquad e = 1.602\\times10^{-19}\\ \\text{C}']],
        examples: [
          ex('A balloon gains 5 × 10¹¹ extra electrons. Its charge in nC?', [['Multiply by e.', 'q = 5\\times10^{11} \\times 1.602\\times10^{-19} = 8.0\\times10^{-8}\\ \\text{C}'], ['Convert to nanocoulombs.', '80\\ \\text{nC}']], '−80 nC'),
          ex('How many electrons make −1 μC?', [['Divide by e.', 'n = \\frac{10^{-6}}{1.602\\times10^{-19}}'], ['Calculate.', 'n = 6.24\\times10^{12}']], '6.24 × 10¹² electrons'),
        ],
        practice: [
          pr('Charge in nC of 10¹² extra electrons? (give the size)', 1e12 * 1.602e-19 * 1e9, 'q = ne, then × 10⁹.', '1.602 × 10⁻⁷ C = 160 nC.'),
          pr('How many electrons, in units of 10¹², make 3 μC?', 3e-6 / 1.602e-19 / 1e12, 'n = q / e.', '3 × 10⁻⁶ / 1.602 × 10⁻¹⁹ ≈ 18.7 × 10¹².'),
          op('A glass rod rubbed with silk becomes positive. What happened?', ['Electrons moved from the glass to the silk', 'Protons moved into the glass', 'The silk lost protons', 'Electrons were destroyed'], 'Only electrons move easily.', 'Glass lost electrons.'),
          op('Charged objects A and B repel. B attracts C. A and C must…', ['Attract', 'Repel', 'Feel nothing', 'Depends on distance only'], 'A and B are alike; B and C are opposite.', 'So A and C are opposite: attract.'),
        ],
      },
      {
        title: 'Coulomb’s law',
        minutes: 20,
        explain: [
          'Coulomb’s law gives the size of the force: F = k q₁q₂ / r², with k = 8.99 × 10⁹ N·m²/C². It has the same shape as Newton’s gravity, but is vastly stronger.',
          'Put signs in: a positive answer means repulsion, a negative one attraction. Always use metres and coulombs.',
          'Because of the r², distance changes matter a lot: halve the distance and the force goes up four times.',
        ],
        formulas: [['Coulomb’s law', 'F = k\\,\\frac{q_1 q_2}{r^2}'], ['Constant', 'k = \\frac{1}{4\\pi\\varepsilon_0} = 8.99\\times10^{9}\\ \\text{N·m}^2/\\text{C}^2']],
        examples: [
          ex('Force between +2 μC and +3 μC, 0.3 m apart?', [['Substitute.', 'F = 8.99\\times10^{9}\\times\\frac{(2\\times10^{-6})(3\\times10^{-6})}{0.09}'], ['Calculate.', 'F \\approx 0.60\\ \\text{N (repulsive)}']], '0.60 N, pushing apart'),
          ex('The same charges are moved to 0.1 m. New force?', [['Distance ÷ 3, so force × 9.', '0.60 \\times 9'], ['Result.', '5.4\\ \\text{N}']], '5.4 N'),
        ],
        practice: [
          pr('Force in N between two 1 μC charges 0.1 m apart?', (K * 1e-6 * 1e-6) / 0.01, 'F = kq₁q₂/r².', '8.99 × 10⁹ × 10⁻¹² / 0.01 ≈ 0.90 N.'),
          pr('Force in N between +5 μC and −5 μC at 0.5 m? (give the size)', (K * 5e-6 * 5e-6) / 0.25, 'Same formula; the sign says attract.', '≈ 0.90 N, attractive.'),
          pr('A force of 2 N at 0.2 m. What is it at 0.4 m? (N)', 2 / 4, 'Double distance, quarter force.', '0.5 N.'),
          pr('Two equal charges 1 m apart push with 9 N. Each charge in μC?', Math.sqrt(9 / K) * 1e6, 'q = √(F r² / k).', '√(9/8.99 × 10⁹) ≈ 3.16 × 10⁻⁵ C = 31.6 μC.'),
        ],
      },
      {
        title: 'Electric versus gravity',
        minutes: 15,
        explain: [
          'Inside a hydrogen atom the electron and proton attract electrically about 10³⁹ times more strongly than by gravity. Gravity only wins for planets because big objects are almost exactly neutral.',
          'This is why electric forces hold atoms and materials together (MATE 100), and why a small static charge can lift a scrap of paper against the whole Earth’s pull.',
          'To compare, divide one force by the other: the distances cancel, since both laws have r².',
        ],
        formulas: [['Ratio for two particles', '\\frac{F_e}{F_g} = \\frac{k\\,q_1 q_2}{G\\,m_1 m_2}']],
        examples: [
          ex('Electric force between the proton and electron in hydrogen (r = 5.3 × 10⁻¹¹ m)?', [['Substitute.', 'F = \\frac{8.99\\times10^{9}\\,(1.602\\times10^{-19})^2}{(5.3\\times10^{-11})^2}'], ['Calculate.', 'F \\approx 8.2\\times10^{-8}\\ \\text{N}']], '8.2 × 10⁻⁸ N'),
          ex('A 0.1 g scrap of paper weighs how much?', [['Weight = mg.', '10^{-4}\\times 9.81'], ['Calculate.', '9.8\\times10^{-4}\\ \\text{N}']], 'about 1 mN, easily beaten by static'),
        ],
        practice: [
          pr('Electric force in units of 10⁻⁸ N between two electrons 10⁻¹⁰ m apart?', (K * 1.602e-19 ** 2) / 1e-20 / 1e-8, 'F = ke²/r².', '≈ 2.31 × 10⁻⁸ N, so 2.31.'),
          pr('A comb holding 10 nC is 2 cm from a scrap of paper that acts like an opposite 1 nC. Force in mN?', ((K * 1e-8 * 1e-9) / 0.0004) * 1e3, 'r = 0.02 m.', '8.99 × 10⁹ × 10⁻¹⁷ / 4 × 10⁻⁴ ≈ 0.22 mN.'),
          op('Why does gravity, not electricity, hold planets in orbit?', ['Planets are almost exactly neutral, so electric forces cancel', 'Electric forces only work in metals', 'Gravity is stronger per particle', 'Space blocks electric fields'], 'Charges come + and −.', 'Big objects balance their charges.'),
          op('Which law has the same 1/r² shape as Coulomb’s?', ['Newton’s law of gravity', 'Ohm’s law', 'Hooke’s law', 'Boyle’s law'], 'Both spread over a sphere.', 'Gravity.'),
        ],
      },
    ],
  },

  'ee-102': {
    predict: {
      q: 'A 12 V battery and a 1.5 V cell push the same 1 C of charge round a circuit. Which gives the charge more energy?',
      options: ['The 12 V battery: 12 J against 1.5 J', 'The same: 1 C is 1 C', 'The 1.5 V cell, because it is smaller', 'Neither gives energy'],
      answer: 0,
      reveal: 'Voltage is energy per coulomb. 12 V gives each coulomb 12 J; 1.5 V gives 1.5 J.',
    },
    parts: [
      {
        title: 'The electric field',
        minutes: 15,
        explain: [
          'Instead of asking how one charge pushes another, ask what a charge does to the space around it. The field E at a point is the force a +1 C test charge would feel there: E = F / q.',
          'For a single charge Q, E = kQ / r², pointing away from + and toward −. Faraday drew field lines: closer lines mean a stronger field.',
          'Once you know E, the force on any charge q placed there is F = qE. On an electron (negative), the force is opposite to E.',
        ],
        formulas: [['Field', 'E = \\frac{F}{q}'], ['Point charge', 'E = k\\,\\frac{Q}{r^2}']],
        examples: [
          ex('Field 0.3 m from a 4 μC charge?', [['Substitute.', 'E = 8.99\\times10^{9}\\times\\frac{4\\times10^{-6}}{0.09}'], ['Calculate.', 'E \\approx 4.0\\times10^{5}\\ \\text{N/C}']], '4.0 × 10⁵ N/C, pointing away'),
          ex('Force on an electron in a 1000 N/C field?', [['F = qE.', 'F = 1.602\\times10^{-19}\\times1000'], ['Calculate.', '1.6\\times10^{-16}\\ \\text{N, against the field}']], '1.6 × 10⁻¹⁶ N'),
        ],
        practice: [
          pr('Field in kN/C, 0.5 m from a 2 μC charge?', (K * 2e-6) / 0.25 / 1e3, 'E = kQ/r².', '≈ 71.9 kN/C.'),
          pr('A 3 μC charge feels 0.06 N. Field in kN/C?', 0.06 / 3e-6 / 1e3, 'E = F/q.', '20 kN/C.'),
          pr('Force in mN on a 5 μC charge in a 4000 N/C field?', 5e-6 * 4000 * 1e3, 'F = qE.', '0.02 N = 20 mN.'),
          op('Field lines near a negative charge point…', ['Toward it', 'Away from it', 'Around it in circles', 'Nowhere'], 'Lines show the push on a + test charge.', 'Toward.'),
        ],
      },
      {
        title: 'Voltage is energy per coulomb',
        minutes: 15,
        explain: [
          'Lifting a stone stores energy in height. Pushing a + charge "uphill" against a field stores energy too. Voltage, or potential difference, is that energy per coulomb: V = W / q.',
          'One volt means one joule per coulomb. A 12 V battery lifts every coulomb through 12 J of "electric height".',
          'An electronvolt (eV) is the energy one electron gains across 1 V: 1.602 × 10⁻¹⁹ J. Chemists and materials engineers use eV for bond and band-gap energies (MATE 118).',
        ],
        formulas: [['Voltage', 'V = \\frac{W}{q}'], ['Electronvolt', '1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}']],
        examples: [
          ex('How much energy does 0.5 C get from a 9 V battery?', [['W = qV.', 'W = 0.5\\times9'], ['Result.', '4.5\\ \\text{J}']], '4.5 J'),
          ex('An electron crosses 1.1 V (silicon’s band gap). Energy in J?', [['1.1 eV.', '1.1\\times1.602\\times10^{-19}'], ['Calculate.', '1.76\\times10^{-19}\\ \\text{J}']], '1.76 × 10⁻¹⁹ J'),
        ],
        practice: [
          pr('Energy in J given to 20 C by a 12 V battery?', 240, 'W = qV.', '240 J.'),
          pr('A phone battery moves 10,000 C at 3.7 V. Energy in kJ?', 37, 'W = qV, then ÷ 1000.', '37 kJ.'),
          pr('100 J moves 25 C. What voltage? (V)', 4, 'V = W/q.', '4 V.'),
          pr('Energy in eV of an electron through a 5000 V television tube?', 5000, '1 V gives 1 eV.', '5000 eV.'),
        ],
      },
      {
        title: 'Uniform fields and breakdown',
        minutes: 15,
        explain: [
          'Between two flat parallel plates the field is the same everywhere: E = V / d. This is the simplest field and the basis of capacitors.',
          'Fields are measured in V/m as well as N/C; they are the same unit. Air stops insulating and sparks at about 3 × 10⁶ V/m, its dielectric strength.',
          'Lightning, static sparks and the arc in a switch all happen when a field passes this limit. Insulators in cables and chips are chosen for high dielectric strength.',
        ],
        formulas: [['Uniform field', 'E = \\frac{V}{d}'], ['Air breaks down at', 'E \\approx 3\\times10^{6}\\ \\text{V/m}']],
        examples: [
          ex('Field between plates 5 mm apart at 200 V?', [['Use metres.', 'd = 0.005\\ \\text{m}'], ['Divide.', 'E = 200/0.005 = 4\\times10^{4}\\ \\text{V/m}']], '40,000 V/m'),
          ex('What voltage makes a 1 cm air gap spark?', [['V = Ed.', '3\\times10^{6}\\times0.01'], ['Result.', '30{,}000\\ \\text{V}']], '30 kV'),
        ],
        practice: [
          pr('Field in kV/m between plates 2 cm apart at 500 V?', 500 / 0.02 / 1000, 'E = V/d.', '25 kV/m.'),
          pr('Voltage in kV that sparks across a 3 mm air gap?', 3e6 * 0.003 / 1000, 'V = Ed.', '9 kV.'),
          pr('A walking spark from a doorknob jumps 5 mm. Roughly what voltage were you at, in kV?', 15, 'V = 3 × 10⁶ × 0.005.', '15 kV: static can be thousands of volts but very little charge.'),
          pr('Plates 1 mm apart, field 2 × 10⁵ V/m. Voltage? (V)', 200, 'V = Ed.', '200 V.'),
        ],
      },
    ],
  },

  'ee-103': {
    predict: {
      q: 'A capacitor charges through a resistor. After one time constant (RC) it is about how full?',
      options: ['63%', '50%', '100%', '37%'],
      answer: 0,
      reveal: 'Charging follows 1 − e^(−t/RC). At t = RC that is 1 − 1/e ≈ 0.63. It is never quite 100%, but after 5RC it is over 99%.',
    },
    parts: [
      {
        title: 'Charge, capacitance and energy',
        minutes: 15,
        explain: [
          'A capacitor stores equal and opposite charges on two conductors separated by an insulator. The charge is proportional to the voltage: Q = CV. C, the capacitance, is in farads.',
          'A farad is enormous. Real parts are μF (10⁻⁶), nF (10⁻⁹) and pF (10⁻¹²). Supercapacitors reach thousands of farads at low voltage.',
          'The energy stored is U = ½CV². Doubling the voltage stores four times the energy, which is why high-voltage capacitors are dangerous even when unplugged.',
        ],
        formulas: [['Charge', 'Q = CV'], ['Energy', 'U = \\tfrac12 CV^2']],
        examples: [
          ex('Charge on 47 μF at 10 V?', [['Q = CV.', '47\\times10^{-6}\\times10'], ['Result.', '4.7\\times10^{-4}\\ \\text{C} = 0.47\\ \\text{mC}']], '0.47 mC'),
          ex('Energy in 1000 μF at 50 V?', [['U = ½CV².', '\\tfrac12\\times10^{-3}\\times2500'], ['Result.', '1.25\\ \\text{J}']], '1.25 J'),
        ],
        practice: [
          pr('Charge in mC on 220 μF at 12 V?', 220e-6 * 12 * 1e3, 'Q = CV.', '2.64 mC.'),
          pr('Energy in J in 470 μF at 25 V?', 0.5 * 470e-6 * 625, '½CV².', '0.147 J.'),
          pr('Voltage across 10 μF holding 50 μC? (V)', 5, 'V = Q/C.', '5 V.'),
          pr('A 3000 F supercapacitor at 2.7 V. Energy in kJ?', (0.5 * 3000 * 2.7 ** 2) / 1000, '½CV².', '10.9 kJ.'),
        ],
      },
      {
        title: 'What sets the capacitance',
        minutes: 15,
        explain: [
          'For two flat plates, C = ε₀εᵣA / d. Bigger plates, a thinner gap and a better insulator all store more charge per volt.',
          'εᵣ (relative permittivity) is a material property: about 1 for air, 2–3 for plastics, 4–10 for glass, and thousands for barium titanate ceramics, which is why tiny ceramic chip capacitors can hold microfarads.',
          'Capacitors in parallel add, like plate areas adding: C = C₁ + C₂. In series they combine like resistors in parallel: 1/C = 1/C₁ + 1/C₂.',
        ],
        formulas: [['Parallel plates', 'C = \\frac{\\varepsilon_0\\,\\varepsilon_r\\,A}{d}'], ['Combining', 'C_{par} = C_1 + C_2 \\qquad \\frac{1}{C_{ser}} = \\frac{1}{C_1} + \\frac{1}{C_2}']],
        examples: [
          ex('Air plates 10 cm × 10 cm, 1 mm apart. C in pF?', [['A = 0.01 m², d = 0.001 m.', 'C = \\frac{8.854\\times10^{-12}\\times0.01}{0.001}'], ['Result.', '8.85\\times10^{-11}\\ \\text{F} = 88.5\\ \\text{pF}']], '88.5 pF'),
          ex('Fill the gap with glass, εᵣ = 6. New C?', [['Multiply by εᵣ.', '88.5\\times6'], ['Result.', '531\\ \\text{pF}']], '531 pF'),
        ],
        practice: [
          pr('C in pF of air plates 20 cm × 20 cm, 2 mm apart?', ((EPS0 * 0.04) / 0.002) * 1e12, 'C = ε₀A/d.', '177 pF.'),
          pr('A 100 pF air capacitor gets a plastic film with εᵣ = 2.2. New C in pF?', 220, 'Multiply by εᵣ.', '220 pF.'),
          pr('10 μF and 22 μF in parallel. Total in μF?', 32, 'Add.', '32 μF.'),
          pr('10 μF and 10 μF in series. Total in μF?', 5, '1/C = 1/10 + 1/10.', '5 μF.'),
        ],
      },
      {
        title: 'The RC curve',
        minutes: 20,
        explain: [
          'Connect a capacitor through a resistor to a battery. At first it is empty, so the full battery voltage drives current through R. As charge builds, the capacitor pushes back and the current dies away.',
          'The result is v_C = V(1 − e^(−t/τ)) with τ = RC (MATH 016 for e). Discharging: v_C = V e^(−t/τ).',
          'A rule of thumb: 63% after 1τ, 86% after 2τ, 95% after 3τ, 99% after 5τ. Ohms × farads give seconds.',
        ],
        formulas: [['Charging', 'v_C(t) = V\\left(1 - e^{-t/RC}\\right)'], ['Discharging', 'v_C(t) = V\\,e^{-t/RC}']],
        examples: [
          ex('47 kΩ and 10 μF. Time constant?', [['τ = RC.', '47\\,000\\times10\\times10^{-6}'], ['Result.', '0.47\\ \\text{s}']], '0.47 s'),
          ex('A 9 V supply charges through τ = 2 s. Voltage after 3 s?', [['Substitute.', '9\\left(1 - e^{-1.5}\\right)'], ['e^(−1.5) ≈ 0.223.', '9\\times0.777 = 6.99\\ \\text{V}']], '7.0 V'),
        ],
        practice: [
          pr('τ in ms for 1 kΩ and 220 μF?', 1000 * 220e-6 * 1000, 'τ = RC.', '220 ms.'),
          pr('5 V through τ = 1 s. Voltage after 2 s? (V)', 5 * (1 - Math.exp(-2)), 'V(1 − e^(−2)).', '5 × 0.865 = 4.32 V.'),
          pr('A capacitor at 12 V discharges with τ = 0.5 s. Voltage after 1 s? (V)', 12 * Math.exp(-2), 'V e^(−t/τ).', '12 × 0.135 = 1.62 V.'),
          pr('How many seconds for a capacitor with τ = 3 s to reach 99% (use 5τ)?', 15, '5 × τ.', '15 s.'),
        ],
      },
    ],
  },

  'ee-104': {
    predict: {
      q: 'You hold a compass just above a wire and switch on a strong current running north. Which way does the needle swing?',
      options: ['Across the wire, toward east or west', 'Along the wire, north', 'It does not move', 'Straight down'],
      answer: 0,
      reveal: 'Ørsted’s surprise: the field circles the wire, so just above it the field is across the wire. The needle swings sideways (for current going north, above the wire it points west).',
    },
    parts: [
      {
        title: 'The field around a wire',
        minutes: 15,
        explain: [
          'A current makes a magnetic field that circles the wire. Grip the wire with your right hand, thumb along the current: your fingers curl the way the field goes.',
          'Its strength falls off with distance: B = μ₀I / (2πr), with μ₀ = 4π × 10⁻⁷ T·m/A. Fields are measured in teslas (T); Earth’s is about 50 μT, a fridge magnet about 5 mT.',
          'So a house wire carrying 10 A makes a field comparable to Earth’s a few centimetres away, enough to swing a compass.',
        ],
        formulas: [['Long straight wire', 'B = \\frac{\\mu_0 I}{2\\pi r}'], ['Handy form', 'B = 2\\times10^{-7}\\,\\frac{I}{r}']],
        examples: [
          ex('Field 2 cm from a wire carrying 5 A, in μT?', [['Handy form.', 'B = 2\\times10^{-7}\\times\\frac{5}{0.02}'], ['Result.', '5\\times10^{-5}\\ \\text{T} = 50\\ \\mu\\text{T}']], '50 μT'),
          ex('Field 10 m from a power line carrying 400 A, in μT?', [['Substitute.', '2\\times10^{-7}\\times\\frac{400}{10}'], ['Result.', '8\\ \\mu\\text{T}']], '8 μT, less than Earth’s'),
        ],
        practice: [
          pr('Field in μT 1 cm from a wire carrying 2 A?', ((MU0 * 2) / (2 * Math.PI * 0.01)) * 1e6, 'B = 2 × 10⁻⁷ I/r.', '40 μT.'),
          pr('Field in μT 5 cm from a 20 A cable?', ((MU0 * 20) / (2 * Math.PI * 0.05)) * 1e6, 'Same formula.', '80 μT.'),
          pr('What current in A makes 100 μT at 3 cm?', (100e-6 * 2 * Math.PI * 0.03) / MU0, 'I = B·2πr/μ₀.', '15 A.'),
          op('Move twice as far from a wire. The field becomes…', ['Half', 'A quarter', 'The same', 'Double'], 'B ∝ 1/r, not 1/r².', 'Half.'),
        ],
      },
      {
        title: 'Coils and electromagnets',
        minutes: 15,
        explain: [
          'Wind the wire into a long coil (a solenoid) and the fields of all the turns add inside it. B = μ₀nI, where n is turns per metre. Outside, the field looks like a bar magnet’s.',
          'Put an iron core inside and the iron’s own tiny magnets line up, multiplying the field hundreds or thousands of times, up to about 2 T, where iron saturates.',
          'Electromagnets can be switched on and off: relays, door locks, MRI machines, loudspeakers and scrapyard cranes all use them.',
        ],
        formulas: [['Solenoid', 'B = \\mu_0\\,n\\,I \\qquad n = \\frac{N}{\\ell}']],
        examples: [
          ex('200 turns on 5 cm, 1 A, air core. B in mT?', [['n = 200/0.05 = 4000 /m.', 'B = 4\\pi\\times10^{-7}\\times4000\\times1'], ['Result.', '5.03\\times10^{-3}\\ \\text{T} = 5.0\\ \\text{mT}']], '5.0 mT'),
          ex('Same coil with iron that multiplies it 300 times?', [['Multiply.', '5.03\\times300 = 1508\\ \\text{mT}'], ['Below 2 T, so possible.', '\\approx 1.5\\ \\text{T}']], '1.5 T'),
        ],
        practice: [
          pr('B in mT inside a 1000-turn, 20 cm coil carrying 0.5 A (air)?', MU0 * (1000 / 0.2) * 0.5 * 1e3, 'n = N/ℓ.', '3.14 mT.'),
          pr('Turns per metre for 500 turns on 25 cm?', 2000, 'N/ℓ.', '2000.'),
          pr('Current in A needed for 10 mT in a coil with n = 4000 /m?', 10e-3 / (MU0 * 4000), 'I = B/(μ₀n).', '1.99 A.'),
          op('What stops an iron-core electromagnet from getting stronger forever as you raise the current?', ['The iron saturates near 2 T', 'The coil melts at once', 'Earth’s field cancels it', 'Nothing stops it'], 'All the iron’s atomic magnets are already lined up.', 'Saturation.'),
        ],
      },
      {
        title: 'Force on a current: the motor',
        minutes: 20,
        explain: [
          'A wire carrying current across a magnetic field is pushed sideways: F = BIL sin θ, largest when the wire is at right angles to the field.',
          'Fleming’s left-hand rule (for motors): first finger along the Field, second finger along the Current, thumb gives the Motion.',
          'Bend the wire into a loop on an axle: one side is pushed up, the other down, and the loop turns. Add a switch that reverses the current every half turn (a commutator) and it keeps turning: a DC motor.',
        ],
        formulas: [['Force on a wire', 'F = B\\,I\\,L\\,\\sin\\theta'], ['Parallel wires (per metre)', '\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}']],
        examples: [
          ex('0.1 m of wire with 3 A in a 0.2 T field at 90°. Force?', [['F = BIL.', '0.2\\times3\\times0.1'], ['Result.', '0.06\\ \\text{N}']], '0.06 N'),
          ex('Two wires 1 cm apart each carry 10 A. Force per metre?', [['Substitute.', '\\frac{4\\pi\\times10^{-7}\\times100}{2\\pi\\times0.01}'], ['Result.', '2\\times10^{-3}\\ \\text{N/m}']], '2 mN per metre'),
        ],
        practice: [
          pr('Force in N on 0.5 m of wire with 4 A at 90° in 0.3 T?', 0.3 * 4 * 0.5, 'F = BIL.', '0.6 N.'),
          pr('Same wire at 30° to the field. Force in N?', 0.3 * 4 * 0.5 * 0.5, 'Multiply by sin 30° = 0.5.', '0.3 N.'),
          pr('Force per metre in mN between wires 2 cm apart each with 20 A?', ((MU0 * 400) / (2 * Math.PI * 0.02)) * 1e3, 'μ₀I₁I₂/(2πd).', '4 mN/m.'),
          op('Two parallel wires carry currents in opposite directions. They…', ['Repel', 'Attract', 'Twist', 'Feel no force'], 'Same direction attracts.', 'Opposite repels.'),
        ],
      },
    ],
  },

  'ee-105': {
    predict: {
      q: 'A coil is connected to a battery through a switch. When you close the switch, the current…',
      options: ['Rises gradually to its final value', 'Jumps instantly to its final value', 'Starts high and falls to zero', 'Never flows'],
      answer: 0,
      reveal: 'A coil opposes changes in current, so the current climbs along the curve (V/R)(1 − e^(−t/τ)) with τ = L/R. It is the mirror image of the capacitor.',
    },
    parts: [
      {
        title: 'A coil fights change',
        minutes: 15,
        explain: [
          'When the current in a coil changes, its own changing magnetic field induces a voltage across it (PHYS 208). Lenz’s law says this voltage opposes the change: v = L di/dt.',
          'L, the inductance, is in henrys. 1 H gives 1 V when the current changes by 1 A each second. Steady current: no voltage; the coil is just wire.',
          'A long coil has L = μ₀N²A / ℓ: double the turns and you get four times the inductance, because each turn both makes and feels the field.',
        ],
        formulas: [['Inductor law', 'v_L = L\\,\\frac{di}{dt}'], ['Long coil', 'L = \\frac{\\mu_0 N^2 A}{\\ell}']],
        examples: [
          ex('50 mH coil; current rises 0.2 A in 10 ms. Voltage?', [['di/dt = 0.2 / 0.01 = 20 A/s.', 'v = 0.05\\times20'], ['Result.', '1\\ \\text{V}']], '1 V'),
          ex('Coil: 500 turns, area 1 cm², length 5 cm. L in mH?', [['Substitute.', 'L = \\frac{4\\pi\\times10^{-7}\\times500^2\\times10^{-4}}{0.05}'], ['Result.', '6.3\\times10^{-4}\\ \\text{H} = 0.63\\ \\text{mH}']], '0.63 mH'),
        ],
        practice: [
          pr('Voltage across 0.3 H when the current changes at 50 A/s? (V)', 15, 'v = L di/dt.', '15 V.'),
          pr('A 10 mH coil sees 6 V. Rate of change of current in A/s?', 600, 'di/dt = v/L.', '600 A/s.'),
          pr('L in mH of 1000 turns, area 2 cm², length 10 cm?', ((MU0 * 1e6 * 2e-4) / 0.1) * 1e3, 'μ₀N²A/ℓ.', '2.51 mH.'),
          op('Double the turns of a coil (same size). Its inductance becomes…', ['Four times', 'Twice', 'Half', 'The same'], 'L ∝ N².', 'Four times.'),
        ],
      },
      {
        title: 'The RL curve',
        minutes: 20,
        explain: [
          'With a resistor and a coil on a battery, the current cannot jump. It rises along i = (V/R)(1 − e^(−t/τ)), where τ = L/R.',
          'After five time constants the current is essentially V/R and the coil acts as a plain wire.',
          'Note the swap with the capacitor: in RC it is voltage that rises gradually and τ = RC; in RL it is current, and τ = L/R.',
        ],
        formulas: [['Rising current', 'i(t) = \\frac{V}{R}\\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = \\frac{L}{R}']],
        examples: [
          ex('L = 2 H, R = 100 Ω, V = 10 V. τ and final current?', [['τ = L/R.', '2/100 = 0.02\\ \\text{s}'], ['Final current V/R.', '10/100 = 0.1\\ \\text{A}']], 'τ = 20 ms, 100 mA'),
          ex('Same circuit: current after 20 ms?', [['t = τ.', 'i = 0.1\\,(1 - e^{-1})'], ['Calculate.', '0.1\\times0.632 = 63\\ \\text{mA}']], '63 mA'),
        ],
        practice: [
          pr('τ in ms for 0.5 H and 25 Ω?', 20, 'L/R.', '20 ms.'),
          pr('Final current in mA for 12 V across 240 Ω (with a coil)?', 50, 'V/R once steady.', '50 mA.'),
          pr('V = 5 V, R = 50 Ω, τ = 10 ms. Current in mA after 20 ms?', 100 * (1 - Math.exp(-2)), '(V/R)(1 − e^(−2)).', '100 × 0.865 = 86.5 mA.'),
          pr('What L in H gives τ = 0.1 s with 30 Ω?', 3, 'L = τR.', '3 H.'),
        ],
      },
      {
        title: 'Energy and the switching spike',
        minutes: 15,
        explain: [
          'An inductor stores energy in its magnetic field: U = ½LI². When the current is cut, that energy has to go somewhere.',
          'If a switch opens in a microsecond, di/dt is huge and so is v = L di/dt. Thousands of volts can arc across the contacts or destroy a transistor.',
          'The cure is a diode across the coil (a flyback diode) that lets the current keep circulating and die away. Car ignition coils use the spike on purpose to fire spark plugs.',
        ],
        formulas: [['Stored energy', 'U = \\tfrac12 L I^2'], ['Spike estimate', 'v \\approx L\\,\\frac{\\Delta i}{\\Delta t}']],
        examples: [
          ex('Energy in a 0.5 H coil carrying 2 A?', [['½LI².', '\\tfrac12\\times0.5\\times4'], ['Result.', '1\\ \\text{J}']], '1 J'),
          ex('That 2 A is cut in 100 μs. Spike voltage?', [['Δi/Δt.', '2/10^{-4} = 2\\times10^{4}\\ \\text{A/s}'], ['× L.', '0.5\\times2\\times10^{4} = 10{,}000\\ \\text{V}']], '10 kV'),
        ],
        practice: [
          pr('Energy in mJ in a 20 mH coil carrying 3 A?', 0.5 * 0.02 * 9 * 1e3, '½LI².', '90 mJ.'),
          pr('A 1 H coil with 0.1 A is cut in 10 μs. Spike in kV?', (1 * 0.1) / 1e-5 / 1000, 'L Δi/Δt.', '10 kV.'),
          pr('What current in A stores 2 J in a 0.25 H coil?', 4, 'I = √(2U/L).', '√16 = 4 A.'),
          op('Where does a flyback diode go?', ['Across the coil, pointing so it is off in normal use', 'In series with the battery', 'Across the switch only', 'In series with the coil'], 'It must give the coil’s current a loop to circulate in.', 'Across the coil, reverse-biased normally.'),
        ],
      },
    ],
  },

  'ee-106': {
    predict: {
      q: 'You want to draw the most power from a battery that has 2 Ω of internal resistance. What load resistance should you connect?',
      options: ['2 Ω', 'As small as possible', 'As large as possible', '4 Ω'],
      answer: 0,
      reveal: 'Too small and the current is high but the voltage collapses; too large and the current is tiny. The best is a load equal to the internal resistance: Jacobi’s maximum power rule.',
    },
    parts: [
      {
        title: 'Node voltages',
        minutes: 20,
        explain: [
          'Pick one node as 0 V (ground). Name the voltage at each other node: V₁, V₂, … At each such node, write Kirchhoff’s current law: the currents leaving through each resistor add to zero.',
          'Each current is (V_here − V_there) / R. This gives one equation per unknown node, which you solve like the systems of MATH 007.',
          'For a single unknown node it is quick: (V − V_a)/R_a + (V − V_b)/R_b + … = 0.',
        ],
        formulas: [['Current law at a node', '\\sum \\frac{V - V_k}{R_k} = 0']],
        examples: [
          ex('A 10 V source through 2 Ω feeds node V, which has 3 Ω to ground and 6 Ω to ground. V?', [['Currents out of V.', '\\frac{V-10}{2} + \\frac{V}{3} + \\frac{V}{6} = 0'], ['Multiply by 6.', '3V - 30 + 2V + V = 0 \\Rightarrow V = 5\\ \\text{V}']], '5 V'),
          ex('Two sources: 12 V through 4 Ω and 6 V through 2 Ω meet at node V with 4 Ω to ground. V?', [['Current law.', '\\frac{V-12}{4} + \\frac{V-6}{2} + \\frac{V}{4} = 0'], ['Multiply by 4.', 'V - 12 + 2V - 12 + V = 0 \\Rightarrow V = 6\\ \\text{V}']], '6 V'),
        ],
        practice: [
          pr('20 V through 10 Ω to node V; V has 10 Ω to ground. V in volts?', 10, 'A simple divider, or (V−20)/10 + V/10 = 0.', '10 V.'),
          pr('12 V through 3 Ω to node V; V has 6 Ω and 6 Ω to ground. V in volts?', 12 * (3 / 6), '6 ∥ 6 = 3 Ω, then divide.', '6 V.'),
          pr('9 V through 1 Ω and 3 V through 1 Ω both into node V, which has 1 Ω to ground. V in volts?', 4, '(V−9) + (V−3) + V = 0.', '3V = 12, V = 4 V.'),
          pr('In the last circuit, the current in A from the 9 V source?', 5, '(9 − V)/1.', '5 A.'),
        ],
      },
      {
        title: 'Superposition and Thévenin',
        minutes: 20,
        explain: [
          'Superposition: in a circuit of sources and resistors, find the effect of each source alone (replace other voltage sources by wires and current sources by gaps), then add.',
          'Thévenin: from any two terminals, the whole circuit acts like V_th in series with R_th. V_th is the open-circuit voltage; R_th is the resistance looking in with sources switched off.',
          'Norton’s twin: I_N = V_th / R_th in parallel with R_th. You can swap between them freely.',
        ],
        formulas: [['Thévenin values', 'V_{th} = V_{oc} \\qquad R_{th} = R_{\\text{looking in, sources off}}'], ['Norton', 'I_N = \\frac{V_{th}}{R_{th}}']],
        examples: [
          ex('24 V with 8 Ω on top and 8 Ω below; terminals across the lower one. Thévenin?', [['Open-circuit voltage.', 'V_{th} = 24\\times\\frac{8}{16} = 12\\ \\text{V}'], ['Sources off: 8 ∥ 8.', 'R_{th} = 4\\ \\Omega']], '12 V with 4 Ω'),
          ex('Connect a 2 Ω load to that equivalent. Load current?', [['Series circuit.', 'I = \\frac{12}{4+2}'], ['Result.', '2\\ \\text{A}']], '2 A'),
        ],
        practice: [
          pr('30 V, 10 Ω on top, 20 Ω below, terminals across the 20 Ω. V_th in volts?', 20, '30 × 20/30.', '20 V.'),
          pr('Same circuit: R_th in Ω?', par(10, 20), '10 ∥ 20.', '6.67 Ω.'),
          pr('V_th = 9 V, R_th = 3 Ω. Norton current in A?', 3, 'V_th / R_th.', '3 A.'),
          pr('V_th = 10 V, R_th = 5 Ω, load 15 Ω. Load voltage in V?', 7.5, 'Divider: 10 × 15/20.', '7.5 V.'),
        ],
      },
      {
        title: 'Maximum power transfer',
        minutes: 15,
        explain: [
          'A load R_L on a Thévenin source gets P = V_th² R_L / (R_th + R_L)². This is zero for R_L = 0 and for R_L very large, and greatest at R_L = R_th.',
          'At that point P_max = V_th² / (4R_th), and exactly half the power is wasted inside the source: 50% efficiency.',
          'Radio and audio designers match loads for maximum power. Power stations do the opposite, keeping the load far larger than the source resistance for high efficiency.',
        ],
        formulas: [['Load power', 'P_L = \\frac{V_{th}^2\\,R_L}{(R_{th} + R_L)^2}'], ['Maximum', 'P_{max} = \\frac{V_{th}^2}{4R_{th}} \\text{ at } R_L = R_{th}']],
        examples: [
          ex('V_th = 20 V, R_th = 5 Ω. Best load and its power?', [['Match.', 'R_L = 5\\ \\Omega'], ['P = V²/(4R).', '\\frac{400}{20} = 20\\ \\text{W}']], '5 Ω, 20 W'),
          ex('Same source with a 15 Ω load. Power?', [['Current.', 'I = 20/20 = 1\\ \\text{A}'], ['P = I²R.', '1\\times15 = 15\\ \\text{W}']], '15 W'),
        ],
        practice: [
          pr('V_th = 12 V, R_th = 4 Ω. Maximum load power in W?', 144 / 16, 'V²/(4R).', '9 W.'),
          pr('V_th = 12 V, R_th = 4 Ω, load 2 Ω. Load power in W?', (144 * 2) / 36, 'V²R_L/(R_th + R_L)².', '8 W.'),
          pr('An amplifier has an 8 Ω output resistance and gives 16 V open-circuit. Power in W into an 8 Ω speaker?', 256 / 32, 'Matched: V²/(4R).', '8 W.'),
          op('At maximum power transfer, the efficiency is…', ['50%', '100%', '25%', '75%'], 'The same current flows through R_th and R_L, and they are equal.', 'Half the power is lost inside.'),
        ],
      },
    ],
  },

  'ee-107': {
    predict: {
      q: 'You connect an ammeter in parallel with a lamp instead of in series. What happens?',
      options: ['A huge current flows through the meter, which may blow its fuse', 'It reads the lamp current correctly', 'It reads zero and nothing else changes', 'The lamp gets brighter'],
      answer: 0,
      reveal: 'An ammeter has almost no resistance. In parallel it short-circuits the lamp, so nearly the whole supply drives current through the meter. Ammeters go in series; voltmeters go in parallel.',
    },
    parts: [
      {
        title: 'The ammeter shunt',
        minutes: 15,
        explain: [
          'A moving-coil meter turns fully with a small current I_m (say 1 mA) and has a coil resistance R_m (say 100 Ω).',
          'To measure a bigger current I, put a small "shunt" resistor in parallel. The meter and shunt share the same voltage, so I_m R_m = (I − I_m) R_sh.',
          'Ammeters go in series and should have very low resistance, so they do not change the current they measure.',
        ],
        formulas: [['Shunt', 'R_{sh} = \\frac{I_m R_m}{I - I_m}']],
        examples: [
          ex('Turn a 1 mA, 50 Ω meter into a 100 mA ammeter.', [['Substitute.', 'R_{sh} = \\frac{0.001\\times50}{0.099}'], ['Calculate.', 'R_{sh} \\approx 0.505\\ \\Omega']], '0.505 Ω'),
          ex('A 100 μA, 1 kΩ meter for 10 A?', [['Substitute.', '\\frac{10^{-4}\\times1000}{10 - 10^{-4}}'], ['Calculate.', '\\approx 0.01\\ \\Omega']], '0.01 Ω'),
        ],
        practice: [
          pr('Shunt in Ω for a 1 mA, 100 Ω meter to read 10 mA?', (0.001 * 100) / 0.009, 'I_m R_m / (I − I_m).', '11.1 Ω.'),
          pr('Shunt in Ω for a 5 mA, 20 Ω meter to read 1 A?', (0.005 * 20) / 0.995, 'Same formula.', '0.1005 Ω.'),
          pr('A meter with I_m = 2 mA, R_m = 40 Ω and shunt 0.08 Ω. Full-scale current in A?', 0.002 + (0.002 * 40) / 0.08, 'Shunt current = I_m R_m / R_sh, then add I_m.', '0.08 V / 0.08 Ω = 1 A, plus 2 mA = 1.002 A.'),
          op('Why should an ammeter have very low resistance?', ['So it does not reduce the current it is measuring', 'So it reads volts too', 'To save batteries', 'So it can go in parallel'], 'It sits in series in the circuit.', 'Any resistance it adds lowers the current.'),
        ],
      },
      {
        title: 'The voltmeter multiplier',
        minutes: 15,
        explain: [
          'To measure voltage, put a large resistor R_s in series with the meter so full-scale current flows at the voltage V you want to read: R_s = V / I_m − R_m.',
          'Voltmeters go in parallel with the part. They should have very high resistance so they draw little current. Analogue meters are rated in ohms per volt (1 / I_m): a 50 μA meter is 20 kΩ/V.',
          'Digital multimeters have about 10 MΩ input resistance on every voltage range.',
        ],
        formulas: [['Series multiplier', 'R_s = \\frac{V}{I_m} - R_m'], ['Sensitivity', '\\Omega/\\text{V} = \\frac{1}{I_m}']],
        examples: [
          ex('A 50 μA, 2 kΩ meter to read 10 V. R_s?', [['Total resistance needed.', '\\frac{10}{50\\times10^{-6}} = 200\\ \\text{k}\\Omega'], ['Subtract the coil.', '200 - 2 = 198\\ \\text{k}\\Omega']], '198 kΩ'),
          ex('Its ohms-per-volt rating?', [['1 / I_m.', '\\frac{1}{50\\times10^{-6}}'], ['Result.', '20\\ \\text{k}\\Omega/\\text{V}']], '20 kΩ/V'),
        ],
        practice: [
          pr('Series resistor in kΩ for a 1 mA, 100 Ω meter to read 50 V?', 50 / 0.001 / 1000 - 0.1, 'V/I_m − R_m.', '49.9 kΩ.'),
          pr('Series resistor in kΩ for a 100 μA, 500 Ω meter to read 5 V?', 5 / 1e-4 / 1000 - 0.5, 'V/I_m − R_m.', '49.5 kΩ.'),
          pr('Ohms per volt, in kΩ/V, of a 25 μA meter?', 40, '1/I_m.', '40 kΩ/V.'),
          pr('A 20 kΩ/V meter on its 10 V range. Total resistance in kΩ?', 200, 'Rating × range.', '200 kΩ.'),
        ],
      },
      {
        title: 'Loading',
        minutes: 15,
        explain: [
          'A voltmeter in parallel with a resistor forms a parallel pair, lowering the resistance there and so the voltage. The reading is a little low.',
          'The fix is a meter whose resistance is much larger than the circuit’s. Think Thévenin (ELEC 106): the meter is a load R_meter on V_th with R_th, and reads V_th × R_meter / (R_th + R_meter).',
          'Error is small when R_meter is at least 100 times R_th.',
        ],
        formulas: [['Reading', 'V_{read} = V_{th}\\,\\frac{R_{meter}}{R_{th} + R_{meter}}']],
        examples: [
          ex('A divider of two 1 MΩ resistors on 10 V. A 10 MΩ digital meter reads the middle. Reading?', [['Thévenin: 5 V behind 0.5 MΩ.', 'V = 5\\times\\frac{10}{10.5}'], ['Result.', '4.76\\ \\text{V}']], '4.76 V (5% low)'),
          ex('Same circuit with two 10 kΩ resistors?', [['5 V behind 5 kΩ.', '5\\times\\frac{10\\,000}{10\\,005}'], ['Result.', '4.998\\ \\text{V}']], '5.00 V: no visible error'),
        ],
        practice: [
          pr('V_th = 6 V, R_th = 10 kΩ, meter 90 kΩ. Reading in V?', 6 * 0.9, 'V_th × R_m/(R_th + R_m).', '5.4 V.'),
          pr('V_th = 3 V, R_th = 100 kΩ, meter 10 MΩ. Reading in V?', (3 * 10e6) / (10.1e6), 'Same.', '2.97 V.'),
          pr('Percentage reading low when R_meter = 100 × R_th?', 100 - 10000 / 101, 'Reading fraction = 100/101.', 'About 0.99% low.'),
          op('Which meter disturbs a high-resistance circuit least?', ['A 10 MΩ digital multimeter', 'A 1 kΩ/V analogue meter', 'An ammeter', 'A 20 kΩ/V meter on its 1 V range'], 'Biggest meter resistance wins.', 'The digital meter.'),
        ],
      },
    ],
  },
};
