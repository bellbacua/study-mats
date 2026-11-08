// Electronic Materials specialization: each class split into parts.
// Practice answers are computed in place so the numbers cannot drift from the working.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

const Q = 1.602e-19;
const ME = 9.109e-31;
const EPS0 = 8.854e-12;
const MU0 = 4e-7 * Math.PI;
const KB = 8.617e-5; // eV/K
const VT = 0.02585; // V at 300 K
const half = 1.12 / (2 * KB); // Eg/2k for silicon, in K
const niRatio = (T) => (T / 300) ** 1.5 * Math.exp(half * (1 / 300 - 1 / T));

export const SPEC_ELECTRONIC = {
  'elec-001': {
    predict: {
      q: 'A copper wire warms from 20 °C to 200 °C. What happens to its resistivity?',
      options: ['It rises by about 70%', 'It falls, because hot metal is softer', 'It stays the same', 'It rises about ten times'],
      answer: 0,
      reveal: 'Hotter atoms vibrate more and scatter the drifting electrons more often. For copper the rise is about 0.4% per degree, so 180 degrees adds about 70%.',
    },
    parts: [
      {
        title: 'Resistance from resistivity',
        minutes: 20,
        explain: [
          'Resistance belongs to an object; resistivity belongs to a material. A long, thin wire has more resistance than a short, thick one of the same metal, and the formula R = ρL/A captures exactly that.',
          'Resistivity ρ is measured in ohm-metres. Copper is about 1.68×10⁻⁸ Ω·m, aluminium 2.65×10⁻⁸, iron 9.7×10⁻⁸. Insulators like glass reach 10¹⁰ Ω·m or more: a range of over 10¹⁸ between the best conductors and the best insulators.',
          'Watch the units: wire areas are quoted in mm², and 1 mm² = 10⁻⁶ m².',
        ],
        formulas: [
          ['Resistance', 'R = \\frac{\\rho\\,L}{A}'],
          ['Area of a round wire', 'A = \\frac{\\pi d^2}{4}'],
        ],
        examples: [
          ex('Find the resistance of 100 m of copper wire with a 2 mm² cross-section.', [['Area in m².', 'A = 2\\times10^{-6}\\ \\text{m}^2'], ['Substitute.', 'R = \\frac{1.68\\times10^{-8} \\times 100}{2\\times10^{-6}} = 0.84\\ \\Omega']], '0.84 Ω'),
          ex('An aluminium wire must have the same resistance as a 2 mm² copper wire of the same length. What area does it need?', [['Same R and L means A ∝ ρ.', 'A_{\\text{Al}} = A_{\\text{Cu}} \\times \\frac{\\rho_{\\text{Al}}}{\\rho_{\\text{Cu}}}'], ['Substitute.', '2 \\times \\frac{2.65}{1.68} = 3.15\\ \\text{mm}^2']], '3.15 mm²'),
        ],
        practice: [
          pr('Resistance in Ω of 50 m of copper wire with a 1.5 mm² cross-section?', (1.68e-8 * 50) / 1.5e-6, 'ρL/A with A in m².', '1.68×10⁻⁸ × 50 / 1.5×10⁻⁶ = 0.56 Ω.'),
          pr('Resistance in Ω of 1 km of aluminium cable with a 100 mm² cross-section?', (2.65e-8 * 1000) / 1e-4, '100 mm² = 10⁻⁴ m².', '2.65×10⁻⁸ × 1000 / 10⁻⁴ = 0.265 Ω.'),
          pr('Resistance in Ω of 10 m of copper wire 1 mm in diameter?', (1.68e-8 * 10) / ((Math.PI * 0.001 ** 2) / 4), 'Area = πd²/4 with d = 0.001 m.', 'A = 7.85×10⁻⁷ m², so R = 0.214 Ω.'),
          pr('How many metres of 0.5 mm² copper wire make 1 Ω?', (1 * 0.5e-6) / 1.68e-8, 'L = RA/ρ.', '0.5×10⁻⁶ / 1.68×10⁻⁸ = 29.8 m.'),
        ],
      },
      {
        title: 'Resistance and temperature',
        minutes: 20,
        explain: [
          'Over everyday temperatures a metal’s resistivity rises almost in a straight line: ρ(T) = ρ₂₀[1 + α(T − 20)]. For copper α ≈ 0.00393 per °C, for aluminium 0.00429.',
          'This is a nuisance in wiring, where hot cables waste more power, and a gift in measurement. Platinum resistance thermometers work this way, and engineers measure the resistance of a motor winding to find out how hot it runs inside.',
          'The same rule works for resistance R, as long as the wire’s size barely changes.',
        ],
        formulas: [['Linear temperature rule', '\\rho(T) = \\rho_{20}\\,[1 + \\alpha\\,(T - 20)]']],
        examples: [
          ex('Copper resistivity at 80 °C?', [['Temperature rise.', 'T - 20 = 60'], ['Substitute.', '1.68\\times10^{-8}\\,(1 + 0.00393 \\times 60) = 2.08\\times10^{-8}']], '2.08 × 10⁻⁸ Ω·m'),
          ex('A copper motor winding reads 2.00 Ω cold (20 °C) and 2.50 Ω after running. How hot is it?', [['Fractional rise.', '2.50/2.00 - 1 = 0.25'], ['Divide by α.', '0.25 / 0.00393 = 63.6'], ['Add to 20 °C.', '20 + 63.6 = 83.6']], 'About 84 °C'),
        ],
        practice: [
          pr('Copper resistivity at 100 °C, in units of 10⁻⁸ Ω·m?', 1.68 * (1 + 0.00393 * 80), 'Rise of 80 °C.', '1.68 × 1.3144 = 2.21.'),
          pr('Aluminium resistivity at −10 °C, in units of 10⁻⁸ Ω·m (α = 0.00429)?', 2.65 * (1 + 0.00429 * -30), 'The rise is negative here.', '2.65 × (1 − 0.1287) = 2.31.'),
          pr('A copper coil is 5.00 Ω at 20 °C. Its resistance in Ω at 60 °C?', 5 * (1 + 0.00393 * 40), 'Same rule for R.', '5 × 1.1572 = 5.79 Ω.'),
          pr('A copper winding goes from 4.00 Ω at 20 °C to 4.60 Ω. Its temperature in °C?', 20 + 0.15 / 0.00393, 'Fractional rise ÷ α, then add 20.', '0.15/0.00393 = 38.2, so 58.2 °C.'),
        ],
      },
      {
        title: 'Matthiessen’s rule and wire grades',
        minutes: 20,
        explain: [
          'Electrons scatter off two things: vibrating atoms (which depends on temperature) and impurity atoms or defects (which do not). Matthiessen’s rule says the two resistivities just add.',
          'So you can find the impurity part by measuring a wire at 20 °C and subtracting the pure metal’s value. That impurity part stays the same at other temperatures.',
          'Wire is graded by % IACS: the annealed copper standard of 1913 has ρ = 1.7241×10⁻⁸ Ω·m and counts as 100%. Modern pure copper beats it slightly, at about 102%.',
        ],
        formulas: [
          ['Matthiessen’s rule', '\\rho = \\rho_{\\text{thermal}}(T) + \\rho_{\\text{impurity}}'],
          ['Conductivity grade', '\\%\\,\\text{IACS} = \\frac{1.7241\\times10^{-8}}{\\rho} \\times 100'],
        ],
        examples: [
          ex('A copper wire measures 1.85×10⁻⁸ Ω·m at 20 °C. What is its % IACS?', [['Divide the standard by ρ.', '1.7241 / 1.85 = 0.932'], ['As a percentage.', '0.932 \\times 100 = 93.2']], '93.2% IACS'),
          ex('A wire measures 1.95×10⁻⁸ Ω·m at 20 °C (pure copper 1.68). Predict its resistivity at 100 °C.', [['Impurity part.', '1.95 - 1.68 = 0.27'], ['Pure copper at 100 °C.', '1.68(1 + 0.00393 \\times 80) = 2.208'], ['Add.', '2.208 + 0.27 = 2.48']], '2.48 × 10⁻⁸ Ω·m'),
        ],
        practice: [
          pr('% IACS of pure copper with ρ = 1.68×10⁻⁸ Ω·m?', (100 * 1.7241) / 1.68, 'Standard ÷ ρ × 100.', '1.7241/1.68 = 102.6%.'),
          pr('A copper wire reads 2.10×10⁻⁸ Ω·m at 20 °C. Its impurity resistivity, in units of 10⁻⁸ Ω·m?', 2.1 - 1.68, 'Subtract pure copper.', '2.10 − 1.68 = 0.42.'),
          pr('That wire’s resistivity at 80 °C, in units of 10⁻⁸ Ω·m?', 1.68 * (1 + 0.00393 * 60) + 0.42, 'Pure copper at 80 °C plus the impurity part.', '2.076 + 0.42 = 2.50.'),
          pr('Electrical-grade aluminium has ρ = 2.82×10⁻⁸ Ω·m. Its % IACS?', (100 * 1.7241) / 2.82, 'Standard ÷ ρ × 100.', '1.7241/2.82 = 61.1%.'),
        ],
      },
      {
        title: 'Drude’s picture: drift and collisions',
        minutes: 25,
        explain: [
          'Drude imagined each free electron speeding up in the field and then losing that extra speed at a collision, on average every τ seconds. That gives σ = ne²τ/m, where n is the number of free electrons per cubic metre (8.5×10²⁸ for copper).',
          'Turn it around and the measured resistivity tells you τ: in copper it is about 25 femtoseconds (2.5×10⁻¹⁴ s).',
          'The drift speed that carries the current is astonishingly slow: v = I/(neA), a fraction of a millimetre per second. The signal is fast because the field travels through the wire at nearly the speed of light, pushing all the electrons at once.',
        ],
        formulas: [
          ['Drude conductivity', '\\sigma = \\frac{1}{\\rho} = \\frac{n e^2 \\tau}{m}'],
          ['Drift speed', 'v_d = \\frac{I}{n\\,e\\,A}'],
        ],
        examples: [
          ex('Find τ for copper (n = 8.5×10²⁸ m⁻³, ρ = 1.68×10⁻⁸ Ω·m).', [['Rearrange.', '\\tau = \\frac{m}{n e^2 \\rho}'], ['Substitute.', '\\frac{9.109\\times10^{-31}}{8.5\\times10^{28}\\,(1.602\\times10^{-19})^2\\,(1.68\\times10^{-8})} = 2.49\\times10^{-14}\\ \\text{s}']], 'About 25 fs'),
          ex('Drift speed for 10 A in a 2 mm² copper wire?', [['Substitute.', 'v_d = \\frac{10}{8.5\\times10^{28} \\times 1.602\\times10^{-19} \\times 2\\times10^{-6}}'], ['Work it out.', '= 3.67\\times10^{-4}\\ \\text{m/s}']], 'About 0.37 mm/s'),
        ],
        practice: [
          pr('Drift speed in mm/s for 5 A in a 1.5 mm² copper wire?', (5 / (8.5e28 * Q * 1.5e-6)) * 1000, 'v = I/(neA), then × 1000 for mm/s.', '5 / 20 426 = 2.45×10⁻⁴ m/s = 0.245 mm/s.'),
          pr('Current density in A/mm² for 10 A in a 2.5 mm² wire?', 4, 'J = I/A.', '10/2.5 = 4 A/mm².'),
          pr('τ for aluminium (n = 1.81×10²⁹ m⁻³, ρ = 2.65×10⁻⁸ Ω·m), in femtoseconds (10⁻¹⁵ s)?', (ME / (1.81e29 * Q * Q * 2.65e-8)) / 1e-15, 'τ = m/(ne²ρ).', '9.109×10⁻³¹ / 1.231×10⁻¹⁶ = 7.4×10⁻¹⁵ s = 7.4 fs.'),
          pr('At 0.245 mm/s, how many hours does one electron take to drift 1 m?', 1 / 0.000245 / 3600, 'Time = distance ÷ speed.', '1/0.000245 = 4082 s = 1.13 h.'),
        ],
      },
    ],
  },

  'elec-002': {
    predict: {
      q: 'You add one phosphorus atom for every five million silicon atoms. How does the number of free electrons change?',
      options: ['It rises about a million times', 'It rises by a few percent', 'It stays the same', 'It falls'],
      answer: 0,
      reveal: 'Pure silicon has only about 10¹⁰ free electrons per cm³. That small dose of phosphorus gives 10¹⁶, one per donor, which is a million times more.',
    },
    parts: [
      {
        title: 'Intrinsic silicon: electrons and holes',
        minutes: 20,
        explain: [
          'In a silicon crystal every atom shares its four outer electrons in bonds with four neighbours. At absolute zero all of them are stuck in bonds and nothing conducts.',
          'At room temperature heat shakes a few loose. Each one leaves behind a hole, a missing bond electron, which neighbouring electrons can hop into, so the hole moves like a positive charge. In pure (intrinsic) silicon there are nᵢ ≈ 10¹⁰ electrons and as many holes per cm³, among 5×10²² atoms.',
          'Both carry current. Each has a mobility μ, the drift speed per unit field. In silicon electrons are faster: μₙ ≈ 1400 and μₚ ≈ 450 cm²/(V·s).',
        ],
        formulas: [
          ['Conductivity', '\\sigma = q\\,(n\\mu_n + p\\mu_p)'],
          ['Intrinsic silicon', 'n = p = n_i \\approx 10^{10}\\ \\text{cm}^{-3}'],
        ],
        examples: [
          ex('Find the resistivity of intrinsic silicon.', [['Conductivity.', '\\sigma = 1.602\\times10^{-19} \\times 10^{10} \\times (1400 + 450) = 2.96\\times10^{-6}\\ \\text{S/cm}'], ['Invert.', '\\rho = 1/\\sigma = 3.37\\times10^{5}\\ \\Omega\\,\\text{cm}']], 'About 340 000 Ω·cm'),
          ex('What fraction of silicon atoms have lost an electron to heat at room temperature?', [['Divide.', '10^{10} / (5\\times10^{22})'], ['Work it out.', '= 2\\times10^{-13}']], 'Two in ten million million'),
        ],
        practice: [
          pr('Germanium: nᵢ = 2×10¹³ cm⁻³, μₙ = 3900, μₚ = 1900. Intrinsic resistivity in Ω·cm?', 1 / (Q * 2e13 * 5800), 'σ = q nᵢ (μₙ + μₚ), then invert.', 'σ = 0.0186 S/cm, so ρ = 53.8 Ω·cm.'),
          pr('Silicon has density 2.33 g/cm³ and molar mass 28.09 g/mol. Atoms per cm³, in units of 10²²?', ((2.33 / 28.09) * 6.022e23) / 1e22, 'Moles per cm³ × Avogadro.', '0.08295 × 6.022×10²³ = 4.99×10²².'),
          pr('How many times more conductive is intrinsic germanium than intrinsic silicon?', (2e13 * 5800) / (1e10 * 1850), 'Ratio of σ = q nᵢ(μₙ + μₚ).', '(2×10¹³ × 5800)/(10¹⁰ × 1850) = 6270.'),
          pr('Intrinsic silicon resistivity in kΩ·cm (thousands of Ω·cm)?', 1 / (Q * 1e10 * 1850) / 1000, 'Invert σ.', '3.37×10⁵ Ω·cm = 337 kΩ·cm.'),
        ],
      },
      {
        title: 'Donors, acceptors and n·p = nᵢ²',
        minutes: 25,
        explain: [
          'A phosphorus atom has five outer electrons. Four go into bonds; the fifth is so loosely held that heat frees it at room temperature. Each donor adds one free electron: n ≈ N_D. Boron has three, so it leaves a hole: p ≈ N_A.',
          'Electrons and holes keep meeting and cancelling. In equilibrium their product is fixed: n·p = nᵢ². So adding electrons pushes holes down. In n-type silicon electrons are the majority carriers and holes the minority.',
          'If both kinds of dopant are present, they cancel: the net doping is the difference. Engineers use this compensation to make p regions inside n wafers.',
        ],
        formulas: [
          ['Majority carriers', 'n \\approx N_D - N_A \\quad (N_D > N_A)'],
          ['Mass-action law', 'n\\,p = n_i^2 = 10^{20}\\ \\text{cm}^{-6}'],
        ],
        examples: [
          ex('N_D = 10¹⁶ cm⁻³ phosphorus. How many holes?', [['Electrons.', 'n = 10^{16}'], ['Holes.', 'p = 10^{20}/10^{16} = 10^{4}']], '10⁴ holes per cm³'),
          ex('One phosphorus atom per million silicon atoms. Find n and p.', [['Donor density.', 'N_D = 5\\times10^{22} \\times 10^{-6} = 5\\times10^{16}'], ['Holes.', 'p = 10^{20}/(5\\times10^{16}) = 2000']], 'n = 5×10¹⁶, p = 2000 per cm³'),
        ],
        practice: [
          pr('Boron N_A = 10¹⁵ cm⁻³. How many free electrons per cm³?', 1e20 / 1e15, 'n = nᵢ²/p.', '10²⁰/10¹⁵ = 10⁵.', { tol: 1 }),
          pr('Phosphorus N_D = 2×10¹⁷ cm⁻³. How many holes per cm³?', 1e20 / 2e17, 'p = nᵢ²/n.', '10²⁰/(2×10¹⁷) = 500.'),
          pr('Silicon doped at 0.1 parts per million (by atoms). Dopant atoms per cm³, in units of 10¹⁵?', (5e22 * 1e-7) / 1e15, '5×10²² × 10⁻⁷.', '5×10¹⁵ = 5 × 10¹⁵.'),
          pr('A wafer has N_D = 3×10¹⁶ and N_A = 10¹⁶ cm⁻³. Free electrons per cm³, in units of 10¹⁶?', 2, 'They cancel; take the difference.', 'n = 3×10¹⁶ − 10¹⁶ = 2×10¹⁶.'),
        ],
      },
      {
        title: 'Resistivity of doped silicon',
        minutes: 20,
        explain: [
          'Once doped, the majority carriers so outnumber the minority that you can ignore the minority in σ. For n-type, σ ≈ qN_Dμₙ; for p-type, σ ≈ qN_Aμₚ.',
          'Wafers are ordered by resistivity, so engineers go back and forth between doping and resistivity all the time. Typical chip wafers are 1–20 Ω·cm.',
          'The mobilities used here (1400 and 450) are for light doping. Above about 10¹⁷ cm⁻³ the dopant ions themselves scatter carriers and mobility falls; real designs read it from a chart.',
        ],
        formulas: [
          ['n-type', '\\rho \\approx \\frac{1}{q\\,N_D\\,\\mu_n}'],
          ['p-type', '\\rho \\approx \\frac{1}{q\\,N_A\\,\\mu_p}'],
        ],
        examples: [
          ex('Resistivity of silicon with N_D = 10¹⁶ cm⁻³?', [['Substitute.', '\\rho = \\frac{1}{1.602\\times10^{-19} \\times 10^{16} \\times 1400}'], ['Work it out.', '= 0.446\\ \\Omega\\,\\text{cm}']], '0.45 Ω·cm'),
          ex('What boron level gives 10 Ω·cm p-type silicon?', [['Rearrange.', 'N_A = \\frac{1}{q\\,\\rho\\,\\mu_p}'], ['Substitute.', '\\frac{1}{1.602\\times10^{-19} \\times 10 \\times 450} = 1.39\\times10^{15}']], '1.4×10¹⁵ cm⁻³'),
        ],
        practice: [
          pr('Resistivity in Ω·cm with N_D = 10¹⁵ cm⁻³?', 1 / (Q * 1e15 * 1400), '1/(q N_D μₙ).', '1/(0.2243) = 4.46 Ω·cm.'),
          pr('Resistivity in Ω·cm with N_A = 10¹⁶ cm⁻³?', 1 / (Q * 1e16 * 450), '1/(q N_A μₚ).', '1/(0.721) = 1.39 Ω·cm.'),
          pr('What phosphorus level gives 1 Ω·cm? Answer in units of 10¹⁵ cm⁻³.', 1 / (Q * 1 * 1400) / 1e15, 'N_D = 1/(q ρ μₙ).', '4.46×10¹⁵ cm⁻³.'),
          pr('At the same doping level, how many times higher is the resistivity of p-type than n-type silicon?', 1400 / 450, 'Only the mobility differs.', '1400/450 = 3.11.'),
        ],
      },
      {
        title: 'Heat and the band gap',
        minutes: 25,
        explain: [
          'How many electrons heat frees depends on the band gap E_g, the energy needed to pull an electron out of a bond: 1.12 eV for silicon. The thermal energy available is about kT, only 0.026 eV at room temperature, so very few make it.',
          'The rule is nᵢ ∝ T^{3/2} e^{−E_g/2kT}. The exponential makes nᵢ climb steeply: about 28 times from 300 K to 350 K.',
          'This sets a limit for every chip. When nᵢ approaches the doping level, the doping stops controlling the device. Wide-gap materials like silicon carbide (3.26 eV) and gallium nitride (3.4 eV) work much hotter, which is why they are used in electric-car power electronics.',
        ],
        formulas: [
          ['Intrinsic carriers vs temperature', 'n_i \\propto T^{3/2}\\,e^{-E_g/2kT}'],
          ['Ratio between two temperatures', '\\frac{n_i(T_2)}{n_i(T_1)} = \\left(\\frac{T_2}{T_1}\\right)^{3/2} e^{\\frac{E_g}{2k}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)}'],
        ],
        examples: [
          ex('By what factor does nᵢ of silicon grow from 300 K to 350 K?', [['E_g/2k.', '1.12 / (2 \\times 8.617\\times10^{-5}) = 6499\\ \\text{K}'], ['Exponential part.', 'e^{6499(1/300 - 1/350)} = e^{3.095} = 22.1'], ['Power part.', '(350/300)^{1.5} = 1.26,\\; 1.26 \\times 22.1 = 27.8']], 'About 28 times'),
          ex('Ignoring the T^{3/2} part and other differences, how does nᵢ of SiC (3.26 eV) compare with Si (1.12 eV) at 300 K?', [['Gap difference.', '3.26 - 1.12 = 2.14\\ \\text{eV}'], ['Factor.', 'e^{-2.14/(2 \\times 0.02585)} = e^{-41.4} \\approx 10^{-18}']], 'About 10¹⁸ times fewer'),
        ],
        practice: [
          pr('By what factor does nᵢ of silicon grow from 300 K to 400 K?', niRatio(400), 'Use both the power and the exponential parts.', '(4/3)^1.5 = 1.54; e^{6499 × 0.000833} = e^{5.42} = 225; product 346.'),
          pr('kT at 300 K in eV (k = 8.617×10⁻⁵ eV/K)?', KB * 300, 'Multiply.', '0.0259 eV.', { tol: 0.0002 }),
          pr('E_g/2kT for silicon at 300 K?', 1.12 / (2 * KB * 300), 'Divide 1.12 by 2kT.', '1.12/0.0517 = 21.7.'),
          pr('Cooling silicon from 300 K to 250 K: by how many times does nᵢ fall?', 1 / niRatio(250), 'Find nᵢ(250)/nᵢ(300) and invert.', '(250/300)^1.5 × e^{−4.33} = 0.00999, so about 100 times fewer.'),
        ],
      },
    ],
  },

  'elec-003': {
    predict: {
      q: 'You raise the forward voltage on a silicon diode from 0.5 V to 0.7 V. What happens to the current?',
      options: ['It grows by thousands of times', 'It grows by about 40%', 'It roughly doubles', 'It stays the same'],
      answer: 0,
      reveal: 'Current grows as e^{V/V_T}, and V_T is only 26 mV. 0.2 V is almost eight V_T, so the current grows by about e^7.7, more than 2000 times.',
    },
    parts: [
      {
        title: 'The built-in voltage',
        minutes: 20,
        explain: [
          'Join p-type and n-type silicon and electrons rush from the n side into the p side, where they fill holes. They leave behind fixed positive donor ions on one side and negative acceptor ions on the other: the depletion region.',
          'Those fixed charges set up a field that pushes back, until it balances the rush. The voltage across the region is the built-in voltage V₀. It grows with the doping on both sides, but only logarithmically.',
          'For silicon at room temperature V₀ is usually 0.6–0.9 V. It is why a silicon diode needs about 0.6 V before it conducts much.',
        ],
        formulas: [
          ['Built-in voltage', 'V_0 = V_T \\ln\\frac{N_A N_D}{n_i^2}'],
          ['Thermal voltage', 'V_T = \\frac{kT}{q} = 25.85\\ \\text{mV at } 300\\ \\text{K}'],
        ],
        examples: [
          ex('N_A = 10¹⁷ and N_D = 10¹⁶ cm⁻³. Find V₀.', [['Ratio.', '\\frac{10^{17} \\times 10^{16}}{10^{20}} = 10^{13}'], ['Logarithm.', '\\ln 10^{13} = 29.93'], ['Multiply.', '0.02585 \\times 29.93 = 0.774\\ \\text{V}']], '0.77 V'),
          ex('Check V_T at 300 K.', [['kT/q.', '\\frac{1.381\\times10^{-23} \\times 300}{1.602\\times10^{-19}}'], ['Work it out.', '= 0.02586\\ \\text{V}']], '25.9 mV'),
        ],
        practice: [
          pr('N_A = N_D = 10¹⁶ cm⁻³. V₀ in volts?', VT * Math.log(1e12), 'ln(10³²/10²⁰) = ln 10¹².', '0.02585 × 27.63 = 0.714 V.'),
          pr('N_A = 10¹⁸, N_D = 10¹⁵ cm⁻³. V₀ in volts?', VT * Math.log(1e13), 'The product is 10³³.', '0.02585 × 29.93 = 0.774 V.'),
          pr('N_A = N_D = 10¹⁵ cm⁻³. V₀ in volts?', VT * Math.log(1e10), 'ln 10¹⁰ = 23.03.', '0.02585 × 23.03 = 0.595 V.'),
          pr('V_T at 350 K, in mV?', KB * 350 * 1000, 'kT/q = 8.617×10⁻⁵ × T volts.', '8.617×10⁻⁵ × 350 = 0.0302 V = 30.2 mV.'),
        ],
      },
      {
        title: 'Shockley’s diode equation',
        minutes: 25,
        explain: [
          'Forward bias lowers the barrier by V. The number of carriers able to climb it grows as e^{V/V_T}, so the current does too. Reverse bias raises the barrier and only a tiny saturation current I₀ leaks through.',
          'For a small silicon diode I₀ is about 10⁻¹² A (a picoamp). That is why nothing seems to happen until about 0.5–0.6 V: before then e^{V/V_T}·I₀ is still microamps.',
          'A handy rule: each 60 mV more forward voltage multiplies the current by ten.',
        ],
        formulas: [
          ['Diode equation', 'I = I_0\\left(e^{V/V_T} - 1\\right)'],
          ['Voltage for a current', 'V = V_T \\ln\\!\\left(\\frac{I}{I_0} + 1\\right)'],
        ],
        examples: [
          ex('I₀ = 10⁻¹² A. Current at 0.60 V?', [['Exponent.', '0.60 / 0.02585 = 23.21'], ['Current.', '10^{-12} \\times e^{23.21} = 0.0120\\ \\text{A}']], '12 mA'),
          ex('Same diode. What voltage gives 1 mA?', [['Ratio.', 'I/I_0 = 10^{9}'], ['Voltage.', '0.02585 \\times \\ln 10^{9} = 0.536\\ \\text{V}']], '0.54 V'),
        ],
        practice: [
          pr('I₀ = 10⁻¹² A. Current in mA at 0.65 V?', 1e-12 * (Math.exp(0.65 / VT) - 1) * 1000, 'e^{0.65/0.02585}.', 'e^{25.15} = 8.33×10¹⁰, so 83 mA.'),
          pr('I₀ = 10⁻¹² A. Voltage for 10 mA, in volts?', VT * Math.log(0.01 / 1e-12 + 1), 'V_T ln(I/I₀).', '0.02585 × ln 10¹⁰ = 0.595 V.'),
          pr('How many times bigger is the current at 0.70 V than at 0.64 V?', Math.exp(0.06 / VT), 'The I₀ cancels: e^{ΔV/V_T}.', 'e^{0.06/0.02585} = e^{2.32} = 10.2.'),
          pr('I₀ = 2 pA. Current in pA at −5 V?', 2 * (Math.exp(-5 / VT) - 1), 'e^{−5/V_T} is essentially zero.', 'I = −I₀ = −2 pA.', { tol: 0.01 }),
        ],
      },
      {
        title: 'Using LEDs: the series resistor',
        minutes: 20,
        explain: [
          'Because current grows so steeply with voltage, you never drive a diode or LED straight from a voltage source. A resistor in series takes up the extra voltage and sets the current.',
          'An LED drops roughly a fixed voltage when lit, close to its band gap in eV: about 2.0 V for red, 3.0–3.3 V for blue and white. The resistor takes the rest: R = (V_supply − V_LED)/I.',
          'The resistor also turns its share into heat, P = I²R, which must be within its rating.',
        ],
        formulas: [
          ['Series resistor', 'R = \\frac{V_{\\text{supply}} - V_{\\text{LED}}}{I}'],
          ['Heat in the resistor', 'P = I^2 R'],
        ],
        examples: [
          ex('5 V supply, red LED (2.0 V), 20 mA. Resistor?', [['Voltage left for R.', '5 - 2.0 = 3.0\\ \\text{V}'], ['Divide by the current.', '3.0/0.020 = 150\\ \\Omega']], '150 Ω'),
          ex('Power in that resistor?', [['I²R.', '0.020^2 \\times 150'], ['Work it out.', '= 0.06\\ \\text{W}']], '0.06 W: a small ⅛ W resistor is fine'),
        ],
        practice: [
          pr('12 V supply, white LED (3.2 V), 20 mA. Resistor in Ω?', (12 - 3.2) / 0.02, '(V_s − V_LED)/I.', '8.8/0.02 = 440 Ω.'),
          pr('3.3 V supply, red LED (2.0 V), 10 mA. Resistor in Ω?', (3.3 - 2) / 0.01, '(V_s − V_LED)/I.', '1.3/0.01 = 130 Ω.'),
          pr('5 V supply, 220 Ω resistor, red LED (2.0 V). Current in mA?', ((5 - 2) / 220) * 1000, 'I = (V_s − V_LED)/R.', '3/220 = 13.6 mA.'),
          pr('Power in W in the 440 Ω resistor at 20 mA?', 0.02 ** 2 * 440, 'I²R.', '0.0004 × 440 = 0.176 W.'),
        ],
      },
      {
        title: 'Band gap and colour',
        minutes: 20,
        explain: [
          'When an electron falls across the band gap and fills a hole, it can give off one photon carrying about the gap energy. Photon energy and wavelength are linked by E = hc/λ; in handy units, λ (nm) ≈ 1240 / E (eV).',
          'So the material sets the colour. Silicon (1.12 eV) and GaAs (1.42 eV) give infrared, which is why silicon cannot make visible LEDs. GaAsP gives red, InGaN gives green and blue, and GaN with aluminium reaches the ultraviolet.',
          'It works the other way in a solar cell or a camera sensor: a photon is absorbed only if its energy is at least the gap.',
        ],
        formulas: [['Wavelength and energy', '\\lambda\\,(\\text{nm}) \\approx \\frac{1240}{E\\,(\\text{eV})}']],
        examples: [
          ex('GaAs has E_g = 1.42 eV. What light does it emit?', [['Divide.', '1240 / 1.42 = 873\\ \\text{nm}'], ['Compare with the visible range (400–700 nm).', '873 > 700']], '873 nm: infrared, as in TV remotes'),
          ex('What band gap gives green light at 530 nm?', [['Rearrange.', 'E = 1240/\\lambda'], ['Divide.', '1240/530 = 2.34\\ \\text{eV}']], '2.34 eV'),
        ],
        practice: [
          pr('Wavelength in nm emitted across silicon’s 1.12 eV gap?', 1240 / 1.12, '1240/E.', '1240/1.12 = 1107 nm (infrared).'),
          pr('Wavelength in nm for GaN, 3.4 eV?', 1240 / 3.4, '1240/E.', '1240/3.4 = 365 nm (ultraviolet).'),
          pr('Band gap in eV for blue light at 450 nm?', 1240 / 450, '1240/λ.', '1240/450 = 2.76 eV.'),
          pr('Energy in eV of a 1000 nm photon?', 1240 / 1000, '1240/λ.', '1.24 eV: enough to be absorbed by silicon (1.12 eV).'),
        ],
      },
    ],
  },

  'elec-004': {
    predict: {
      q: 'As a phosphorus-doped silicon crystal is pulled from its melt, what happens to the phosphorus level in each new slice of crystal?',
      options: ['It rises steadily toward the end of the crystal', 'It falls toward the end', 'It stays exactly the same', 'It is zero, because freezing removes all of it'],
      answer: 0,
      reveal: 'The growing crystal takes in only about a third of the melt’s phosphorus (k = 0.35). The rest piles up in a shrinking melt, so each later slice freezes from richer liquid.',
    },
    parts: [
      {
        title: 'How pure is pure?',
        minutes: 15,
        explain: [
          'Metallurgical silicon from an arc furnace is about 98–99% pure, fine for aluminium alloys and silicone, useless for chips. Solar cells need about six nines (99.9999%); chips need nine to eleven nines.',
          'Engineers count impurity in parts per million (ppm, 10⁻⁶) or parts per billion (ppb, 10⁻⁹) of atoms. "n nines" means an impurity fraction of 10⁻ⁿ.',
          'Even one part per billion is a lot of atoms: silicon has 5×10²² atoms in every cubic centimetre.',
        ],
        formulas: [
          ['Purity as nines', '\\text{impurity fraction} = 10^{-n}\\ \\text{for } n \\text{ nines}'],
          ['Impurity atoms', 'N_{\\text{imp}} = 5\\times10^{22}\\ \\text{cm}^{-3} \\times \\text{fraction}'],
        ],
        examples: [
          ex('Nine-nines silicon: how many impurity atoms per cm³?', [['Fraction.', '10^{-9}'], ['Multiply.', '5\\times10^{22} \\times 10^{-9} = 5\\times10^{13}']], '5×10¹³ per cm³'),
          ex('Metallurgical silicon is 98.5% pure. Impurity in ppm?', [['Impurity fraction.', '1.5\\% = 0.015'], ['In ppm.', '0.015 \\times 10^{6} = 15\\,000']], '15 000 ppm'),
        ],
        practice: [
          pr('Six-nines silicon. Impurity in ppm?', 1, '10⁻⁶ is one part per million.', '1 ppm.'),
          pr('Impurity atoms per cm³ at 1 ppb, in units of 10¹³?', (5e22 * 1e-9) / 1e13, '5×10²² × 10⁻⁹.', '5×10¹³.'),
          pr('Silicon with 10 ppb of impurities has how many nines?', 8, '10 ppb = 10⁻⁸.', 'Fraction 10⁻⁸: 99.999999%, eight nines.'),
          pr('How many milligrams of impurity are in 100 kg of nine-nines silicon?', 100e6 * 1e-9, '100 kg = 10⁸ mg.', '10⁸ × 10⁻⁹ = 0.1 mg (by mass, roughly).'),
        ],
      },
      {
        title: 'The segregation coefficient',
        minutes: 20,
        explain: [
          'When a crystal freezes, impurity atoms that do not fit well into it are pushed back into the liquid. The ratio of impurity in the solid to that in the liquid right at the freezing front is the segregation coefficient k.',
          'For most impurities in silicon k is far below 1: iron about 8×10⁻⁶, aluminium 0.002, phosphorus 0.35. Boron, at about 0.8, is the closest to 1, so it spreads very evenly.',
          'The first solid to freeze holds k times the melt’s impurity, so freezing itself is a purifier. Its purification factor is 1/k.',
        ],
        formulas: [['First solid to freeze', 'C_s = k\\,C_0']],
        examples: [
          ex('A melt holds 1 ppm iron (k = 8×10⁻⁶). How much is in the first crystal?', [['Multiply.', 'C_s = 8\\times10^{-6} \\times 1\\ \\text{ppm}'], ['In parts per trillion.', '8\\times10^{-6}\\ \\text{ppm} = 8\\ \\text{ppt}']], '8 parts per trillion'),
          ex('By how many times does one freeze purify silicon of iron?', [['Purification factor.', '1/k'], ['Work it out.', '1/(8\\times10^{-6}) = 125\\,000']], '125 000 times'),
        ],
        practice: [
          pr('A melt holds 10 ppm phosphorus (k = 0.35). ppm in the first crystal?', 0.35 * 10, 'k × C₀.', '0.35 × 10 = 3.5 ppm.'),
          pr('A melt holds 50 ppm aluminium (k = 0.002). ppm in the first crystal?', 0.002 * 50, 'k × C₀.', '0.002 × 50 = 0.1 ppm.'),
          pr('A melt holds 2 ppm boron (k = 0.8). ppm in the first crystal?', 0.8 * 2, 'k × C₀.', '0.8 × 2 = 1.6 ppm.'),
          pr('Aluminium has k = 0.002. Its purification factor in one freeze?', 1 / 0.002, '1/k.', '1/0.002 = 500.'),
        ],
      },
      {
        title: 'Along the ingot: the Scheil equation',
        minutes: 25,
        explain: [
          'As more of the melt freezes, the rejected impurity has less and less liquid to go into, so the liquid gets richer and each new slice of crystal too. Assuming the liquid is well stirred and the solid does not mix, this gives the Scheil equation.',
          'f_s is the fraction already frozen. For k < 1 the impurity in the crystal rises slowly at first, then sharply near the end. For k close to 1 it barely changes.',
          'That is why wafers from the top and bottom of an ingot can differ, and why the last few percent of a melt is often thrown away.',
        ],
        formulas: [['Scheil equation', 'C_s = k\\,C_0\\,(1 - f_s)^{k-1}']],
        examples: [
          ex('Phosphorus (k = 0.35). C_s/C₀ half way along?', [['Exponent.', 'k - 1 = -0.65'], ['Substitute.', '0.35 \\times 0.5^{-0.65} = 0.35 \\times 1.569 = 0.549']], '0.55 C₀'),
          ex('And at 90% frozen?', [['Substitute.', '0.35 \\times 0.1^{-0.65}'], ['Work it out.', '0.35 \\times 4.467 = 1.56']], '1.56 C₀: about 4.5 times the start'),
        ],
        practice: [
          pr('Boron (k = 0.8). C_s/C₀ half way along?', 0.8 * 0.5 ** -0.2, 'k(1 − f_s)^{k−1} with f_s = 0.5.', '0.8 × 1.149 = 0.919.'),
          pr('Phosphorus (k = 0.35). C_s/C₀ at 75% frozen?', 0.35 * 0.25 ** -0.65, 'f_s = 0.75 so 1 − f_s = 0.25.', '0.35 × 2.462 = 0.862.'),
          pr('For boron, how many times higher is C_s at 90% frozen than at the start?', 0.1 ** -0.2, 'k and C₀ cancel: (1 − f_s)^{k−1}.', '0.1^{−0.2} = 1.58.'),
          pr('For phosphorus, at what fraction frozen is C_s twice its starting value?', 1 - 2 ** (-1 / 0.65), 'Solve (1 − f_s)^{−0.65} = 2.', '1 − f_s = 2^{−1/0.65} = 0.344, so f_s = 0.656.'),
        ],
      },
      {
        title: 'Zone refining',
        minutes: 20,
        explain: [
          'Pfann’s idea: melt only a short zone of length L in a long bar, and move it slowly along. At the front of the zone fresh solid melts; at the back the liquid freezes, leaving impurity behind. The zone sweeps impurity toward the far end.',
          'After one pass the impurity left at distance x from the start follows C_s = C₀[1 − (1 − k)e^{−kx/L}]. The start is purified by the factor k; further along the bar it is purified less.',
          'Many passes repeat this, each one pushing more impurity to the end, which is finally cut off. Floating-zone silicon, refined with no crucible at all, is the purest silicon made.',
        ],
        formulas: [['One zone pass', 'C_s(x) = C_0\\left[1 - (1-k)\\,e^{-kx/L}\\right]']],
        examples: [
          ex('k = 0.1. What is C_s/C₀ at x = 2L after one pass?', [['Exponent.', '-kx/L = -0.2'], ['Substitute.', '1 - 0.9\\,e^{-0.2} = 1 - 0.9 \\times 0.8187'], ['Work it out.', '= 0.263']], '0.26 C₀'),
          ex('Same bar, at x = 10L?', [['Exponent.', '-1'], ['Substitute.', '1 - 0.9\\,e^{-1} = 1 - 0.331 = 0.669']], '0.67 C₀: less purified further along'),
        ],
        practice: [
          pr('k = 0.3. C_s/C₀ at the very start (x = 0) after one pass?', 0.3, 'e⁰ = 1.', '1 − 0.7 = 0.3.'),
          pr('k = 0.3. C_s/C₀ at x = L?', 1 - 0.7 * Math.exp(-0.3), 'Exponent −kx/L = −0.3.', '1 − 0.7 × 0.741 = 0.481.'),
          pr('k = 0.01. C_s/C₀ at x = 5L?', 1 - 0.99 * Math.exp(-0.05), 'Exponent −0.05.', '1 − 0.99 × 0.951 = 0.058.'),
          pr('k = 0.5. C_s/C₀ at x = 4L?', 1 - 0.5 * Math.exp(-2), 'Exponent −2.', '1 − 0.5 × 0.135 = 0.932.'),
        ],
      },
    ],
  },

  'elec-005': {
    predict: {
      q: 'You fill the gap of an air capacitor with barium titanate. What happens to its capacitance?',
      options: ['It becomes about 2000 times bigger', 'It roughly doubles', 'It stays the same', 'It becomes smaller'],
      answer: 0,
      reveal: 'Capacitance scales with the relative permittivity εᵣ. Barium titanate’s ions shift so strongly in a field that εᵣ is in the thousands.',
    },
    parts: [
      {
        title: 'The parallel-plate capacitor',
        minutes: 20,
        explain: [
          'A capacitor is two conductors separated by an insulator. Put a voltage across it and charge +Q gathers on one plate and −Q on the other. Capacitance C = Q/V says how much charge per volt.',
          'For flat plates C = ε₀εᵣA/d: bigger plates and a thinner gap give more capacitance. ε₀ = 8.854×10⁻¹² F/m is a constant of nature; εᵣ is the material’s relative permittivity.',
          'One farad is huge. Real parts are measured in picofarads (10⁻¹²), nanofarads (10⁻⁹) and microfarads (10⁻⁶).',
        ],
        formulas: [['Parallel-plate capacitor', 'C = \\frac{\\varepsilon_0\\,\\varepsilon_r\\,A}{d}']],
        examples: [
          ex('Plates of 1 cm² with 0.1 mm of mica (εᵣ = 6). Find C.', [['SI units.', 'A = 10^{-4}\\ \\text{m}^2,\\; d = 10^{-4}\\ \\text{m}'], ['Substitute.', '8.854\\times10^{-12} \\times 6 \\times 10^{-4}/10^{-4} = 5.31\\times10^{-11}\\ \\text{F}']], '53 pF'),
          ex('1 mm² of barium titanate (εᵣ = 2000), 2 µm thick. Find C.', [['SI units.', 'A = 10^{-6},\\; d = 2\\times10^{-6}'], ['Substitute.', '8.854\\times10^{-12} \\times 2000 \\times 10^{-6}/(2\\times10^{-6}) = 8.85\\times10^{-9}\\ \\text{F}']], '8.85 nF from one tiny layer'),
        ],
        practice: [
          pr('Air plates of 10 cm², 1 mm apart. C in pF?', (EPS0 * 1e-3) / 1e-3 / 1e-12, '10 cm² = 10⁻³ m².', '8.854×10⁻¹² × 10⁻³/10⁻³ = 8.85 pF.'),
          pr('Alumina (εᵣ = 9.8), 1 cm², 0.5 mm thick. C in pF?', (EPS0 * 9.8 * 1e-4) / 5e-4 / 1e-12, 'Watch the units.', '8.854×10⁻¹² × 9.8 × 10⁻⁴/(5×10⁻⁴) = 17.4 pF.'),
          pr('What mica thickness in µm gives 1 nF on 1 cm² plates?', ((EPS0 * 6 * 1e-4) / 1e-9) * 1e6, 'd = ε₀εᵣA/C.', '5.31×10⁻¹⁵/10⁻⁹ = 5.31×10⁻⁶ m = 5.31 µm.'),
          pr('What εᵣ gives 100 pF with 1 cm² plates 0.1 mm apart?', (100e-12 * 1e-4) / (EPS0 * 1e-4), 'εᵣ = Cd/(ε₀A).', '10⁻¹⁴/(8.854×10⁻¹⁶) = 11.3.'),
        ],
      },
      {
        title: 'Stacking layers: the MLCC',
        minutes: 20,
        explain: [
          'One thin layer is not enough for microfarads. A multilayer ceramic capacitor stacks hundreds of ceramic layers with nickel electrodes between them, connected alternately to the two ends. The layers act in parallel, so their capacitances add: C = N·ε₀εᵣA/d.',
          'The ceramic is printed as a paste, stacked, pressed and fired together at about 1300 °C in a controlled gas so the nickel does not oxidise. Making layers thinner both raises each layer’s capacitance and lets more fit in the same height.',
          'A modern capacitor smaller than a grain of rice can hold 10–100 µF.',
        ],
        formulas: [['N layers in parallel', 'C = N\\,\\frac{\\varepsilon_0\\,\\varepsilon_r\\,A}{d}']],
        examples: [
          ex('100 layers, 1 mm² overlap, 3 µm barium titanate (εᵣ = 2000). Find C.', [['One layer.', '8.854\\times10^{-12} \\times 2000 \\times 10^{-6}/(3\\times10^{-6}) = 5.90\\times10^{-9}'], ['Times 100.', '5.90\\times10^{-7}\\ \\text{F}']], '0.59 µF'),
          ex('How many such layers for 1 µF?', [['Divide.', '10^{-6}/5.90\\times10^{-9} = 169.4'], ['Round up.', '170']], '170 layers'),
        ],
        practice: [
          pr('200 layers, 2 µm, εᵣ = 3000, 1 mm² overlap. C in µF?', ((200 * EPS0 * 3000 * 1e-6) / 2e-6) * 1e6, 'N ε₀εᵣA/d.', '200 × 1.328×10⁻⁸ = 2.66×10⁻⁶ F = 2.66 µF.'),
          pr('With 1 µm layers, εᵣ = 3000 and 1 mm² overlap, how many layers (rounded up) give 10 µF?', 377, 'One layer first: ε₀εᵣA/d.', 'One layer is 26.6 nF; 10 µF/26.6 nF = 376.5, so 377 layers.', { tol: 0.6 }),
          pr('Each of those 377 layers is 1 µm ceramic plus 1 µm nickel. Total height in µm?', 377 * 2, 'Add both per layer.', '377 × 2 = 754 µm.'),
          pr('In the same height, layers are made half as thick (so twice as many). By what factor does C change?', 4, 'Each layer’s C doubles, and there are twice as many.', '2 × 2 = 4.'),
        ],
      },
      {
        title: 'Field and breakdown',
        minutes: 20,
        explain: [
          'The field inside a capacitor is E = V/d. Every insulator has a breakdown field above which electrons are torn loose, a conducting path forms and the part fails, sometimes with a flash. Air breaks down at about 3 MV/m, alumina at about 15, mica at about 100.',
          'So a thinner layer gives more capacitance but a lower safe voltage. Designers keep the working field well below breakdown, often by a safety factor of 2 or more, because defects in real layers lower the breakdown field.',
          'This trade-off between thinness and voltage rating is the central design problem for every capacitor.',
        ],
        formulas: [
          ['Field', 'E = \\frac{V}{d}'],
          ['Minimum thickness', 'd_{\\min} = \\frac{V \\times \\text{safety factor}}{E_{\\text{breakdown}}}'],
        ],
        examples: [
          ex('50 V across a 4 µm layer. Field?', [['Thickness in metres.', 'd = 4\\times10^{-6}\\ \\text{m}'], ['Divide.', '50 / (4\\times10^{-6}) = 1.25\\times10^{7}\\ \\text{V/m}']], '12.5 MV/m'),
          ex('Breakdown 15 MV/m, 100 V working, safety factor 2. Thinnest layer?', [['Allowed field.', '15/2 = 7.5\\ \\text{MV/m}'], ['Thickness.', '100/(7.5\\times10^{6}) = 1.33\\times10^{-5}\\ \\text{m}']], '13.3 µm'),
        ],
        practice: [
          pr('25 V across a 2 µm layer. Field in MV/m?', 25 / 2e-6 / 1e6, 'V/d.', '25/(2×10⁻⁶) = 12.5 MV/m.'),
          pr('A 3 µm layer breaks down at 15 MV/m. Highest voltage it survives, in V?', 15e6 * 3e-6, 'V = E × d.', '15×10⁶ × 3×10⁻⁶ = 45 V.'),
          pr('Mica breaks down at 100 MV/m. Thinnest layer in µm for 400 V with a safety factor of 2?', ((400 * 2) / 100e6) * 1e6, 'd = V × 2 / E.', '800/10⁸ = 8×10⁻⁶ m = 8 µm.'),
          pr('About what voltage makes a spark jump a 1 mm air gap (3 MV/m)?', 3000, 'V = E × d.', '3×10⁶ × 10⁻³ = 3000 V.'),
        ],
      },
      {
        title: 'Stored energy',
        minutes: 20,
        explain: [
          'Charging a capacitor stores energy in the field between the plates: U = ½CV². It is released fast, which is why capacitors power camera flashes, defibrillators and smooth out ripples in power supplies.',
          'Per cubic metre of dielectric the energy is ½ε₀εᵣE². Both εᵣ and the breakdown field matter, and the E² term means a material that withstands a higher field stores much more.',
          'Compared with batteries capacitors store little energy, but they can give it up and take it back millions of times, in a fraction of a second.',
        ],
        formulas: [
          ['Stored energy', 'U = \\tfrac{1}{2}\\,C\\,V^2'],
          ['Energy per volume', 'u = \\tfrac{1}{2}\\,\\varepsilon_0\\,\\varepsilon_r\\,E^2'],
        ],
        examples: [
          ex('10 µF at 5 V. Energy?', [['Substitute.', '\\tfrac{1}{2} \\times 10^{-5} \\times 25'], ['Work it out.', '= 1.25\\times10^{-4}\\ \\text{J}']], '125 µJ'),
          ex('Energy per m³ in mica (εᵣ = 6) at 50 MV/m?', [['Substitute.', '\\tfrac{1}{2} \\times 8.854\\times10^{-12} \\times 6 \\times (5\\times10^{7})^2'], ['Work it out.', '= 6.64\\times10^{4}\\ \\text{J/m}^3']], '66 kJ/m³'),
        ],
        practice: [
          pr('1000 µF at 16 V. Energy in mJ?', 0.5 * 1e-3 * 256 * 1000, '½CV².', '0.5 × 10⁻³ × 256 = 0.128 J = 128 mJ.'),
          pr('100 µF at 400 V (a camera flash). Energy in J?', 0.5 * 1e-4 * 160000, '½CV².', '0.5 × 10⁻⁴ × 160 000 = 8 J.'),
          pr('Barium titanate (εᵣ = 2000) at 5 MV/m. Energy in kJ/m³?', (0.5 * EPS0 * 2000 * 25e12) / 1000, '½ε₀εᵣE².', '0.5 × 8.854×10⁻¹² × 2000 × 2.5×10¹³ = 221 kJ/m³.'),
          pr('What voltage stores 1 J in a 50 µF capacitor?', Math.sqrt(2 / 50e-6), 'V = √(2U/C).', '√(40 000) = 200 V.'),
        ],
      },
    ],
  },

  'elec-006': {
    predict: {
      q: 'A transformer core and a neodymium magnet are both swept through a full B–H loop. Which loop is fatter?',
      options: ['The neodymium magnet’s, by far', 'The transformer core’s', 'They are the same shape', 'Neither has a loop; both are straight lines'],
      answer: 0,
      reveal: 'A permanent magnet must resist being flipped, so its loop is very wide. A transformer core is flipped 60 times a second and must waste little energy, so its loop is thin.',
    },
    parts: [
      {
        title: 'Magnetic field and flux density',
        minutes: 20,
        explain: [
          'A coil carrying current makes a magnetising field H, set only by the current and the winding: H = NI/L for a long coil of N turns and length L, in amperes per metre.',
          'The material inside answers with a flux density B, in tesla. In air B = μ₀H, with μ₀ = 4π×10⁻⁷. In iron, domains line up and multiply B by the relative permeability μᵣ, often in the thousands.',
          'That only works until every domain is aligned. Then the iron saturates, at about 1.6–2 T for steels, and B hardly rises any more.',
        ],
        formulas: [
          ['Field of a long coil', 'H = \\frac{N I}{L}'],
          ['Flux density', 'B = \\mu_0\\,\\mu_r\\,H'],
        ],
        examples: [
          ex('500 turns on 0.25 m carry 2 A. Find H and B in air.', [['Field.', 'H = 500 \\times 2 / 0.25 = 4000\\ \\text{A/m}'], ['Air.', 'B = 4\\pi\\times10^{-7} \\times 4000 = 5.03\\times10^{-3}\\ \\text{T}']], 'H = 4000 A/m, B = 5.0 mT'),
          ex('Fill the coil with iron of μᵣ = 2000. What B does the formula give, and what really happens?', [['Formula.', 'B = 2000 \\times 5.03\\times10^{-3} = 10\\ \\text{T}'], ['Saturation.', 'B_{\\text{sat}} \\approx 1.6\\text{–}2\\ \\text{T}']], 'The iron saturates near 2 T, not 10 T'),
        ],
        practice: [
          pr('200 turns on 0.1 m carry 0.5 A. H in A/m?', (200 * 0.5) / 0.1, 'NI/L.', '100/0.1 = 1000 A/m.'),
          pr('B in mT in air for H = 1000 A/m?', MU0 * 1000 * 1000, 'μ₀H, then × 1000 for mT.', '4π×10⁻⁷ × 1000 = 1.26 mT.'),
          pr('B in T in iron with μᵣ = 1000 at H = 1000 A/m (below saturation)?', MU0 * 1000 * 1000, 'μ₀μᵣH.', '4π×10⁻⁴ × 1000 = 1.26 T.'),
          pr('What current in A gives H = 8000 A/m in a coil of 400 turns, 0.2 m long?', (8000 * 0.2) / 400, 'I = HL/N.', '1600/400 = 4 A.'),
        ],
      },
      {
        title: 'Hysteresis loss in soft magnets',
        minutes: 20,
        explain: [
          'Every time the field reverses, domain walls must jump past defects in the metal, and that wastes energy as heat. The energy lost in one full cycle, per cubic metre, equals the area inside the B–H loop.',
          'Multiply by the frequency and the core volume to get the power lost. In the Philippines mains power is 60 Hz, so a transformer core goes round its loop 60 times a second, all day, every day.',
          'That is why transformer steel is made "soft": very clean, with large grains, about 3% silicon, and grains lined up in one direction. Its loop is extremely thin.',
        ],
        formulas: [
          ['Hysteresis loss', 'P = f \\times W_{\\text{loop}} \\times V'],
          ['Rough loop area (rectangle)', 'W \\approx (2B_r)(2H_c)'],
        ],
        examples: [
          ex('A core loses 10 J/m³ per cycle at 60 Hz. Its volume is 0.001 m³. Power?', [['Multiply.', '60 \\times 10 \\times 0.001'], ['Work it out.', '= 0.6\\ \\text{W}']], '0.6 W'),
          ex('Estimate the loop area for B_r = 1.0 T, H_c = 80 A/m, treating the loop as a rectangle.', [['Width and height.', '2H_c = 160,\\; 2B_r = 2'], ['Area.', '160 \\times 2 = 320\\ \\text{J/m}^3']], 'About 320 J/m³ per cycle (an upper bound)'),
        ],
        practice: [
          pr('20 J/m³ per cycle, 60 Hz, 0.002 m³ of core. Loss in W?', 60 * 20 * 0.002, 'f × W × V.', '60 × 20 × 0.002 = 2.4 W.'),
          pr('The same core on 50 Hz power. Loss in W?', 50 * 20 * 0.002, 'Only f changes.', '50 × 20 × 0.002 = 2 W.'),
          pr('Rectangle estimate of loop area in J/m³ for B_r = 1.2 T, H_c = 40 A/m?', 2 * 1.2 * 2 * 40, '(2B_r)(2H_c).', '2.4 × 80 = 192 J/m³.'),
          pr('A 2.4 W loss runs all year. Energy lost in kWh?', (2.4 * 8760) / 1000, '8760 hours in a year.', '2.4 × 8760 = 21 024 Wh = 21.0 kWh.'),
        ],
      },
      {
        title: 'Permanent magnets and the energy product',
        minutes: 20,
        explain: [
          'A permanent magnet does useful work by driving flux across an air gap, as in a motor or a speaker. The most it can do per cubic metre is set by its maximum energy product (BH)max, read off the second quarter of its loop.',
          'For the same job, the magnet volume needed goes roughly as 1/(BH)max. Ferrite magnets have about 30 kJ/m³, samarium–cobalt about 240, NdFeB 300–450.',
          'That is why phones, earbuds and electric-car motors use NdFeB: far less magnet for the same pull. Ferrite is still used where size does not matter, because it is cheap and does not corrode.',
        ],
        formulas: [
          ['Magnetic energy in a magnet', 'E \\approx (BH)_{\\max} \\times V'],
          ['Volume for the same job', '\\frac{V_1}{V_2} \\approx \\frac{(BH)_{\\max,2}}{(BH)_{\\max,1}}'],
        ],
        examples: [
          ex('How many times smaller can an NdFeB magnet (350 kJ/m³) be than a ferrite one (30 kJ/m³)?', [['Volume goes as 1/(BH)max.', 'V_{\\text{fer}}/V_{\\text{Nd}} = 350/30'], ['Divide.', '= 11.7']], 'About 12 times smaller'),
          ex('Densities: NdFeB 7.5 g/cm³, ferrite 4.9 g/cm³. Compare the masses for the same job.', [['Volume ratio.', 'V_{\\text{Nd}}/V_{\\text{fer}} = 30/350 = 0.0857'], ['Mass ratio.', '0.0857 \\times 7.5/4.9 = 0.131']], 'The NdFeB magnet weighs about 13% as much'),
        ],
        practice: [
          pr('Ferrite (28 kJ/m³) vs NdFeB (400 kJ/m³): how many times bigger must the ferrite be?', 400 / 28, 'Inverse ratio of the energy products.', '400/28 = 14.3.'),
          pr('Energy in J in 10 cm³ of NdFeB with (BH)max = 350 kJ/m³?', 350000 * 1e-5, '10 cm³ = 10⁻⁵ m³.', '350 000 × 10⁻⁵ = 3.5 J.'),
          pr('Volume in cm³ of NdFeB (350 kJ/m³) for 10 J?', (10 / 350000) * 1e6, 'V = E/(BH)max, then m³ to cm³.', '2.86×10⁻⁵ m³ = 28.6 cm³.'),
          pr('SmCo (240 kJ/m³) vs NdFeB (350 kJ/m³): volume ratio SmCo/NdFeB?', 350 / 240, 'Inverse ratio.', '350/240 = 1.46.'),
        ],
      },
      {
        title: 'Heat and magnets',
        minutes: 20,
        explain: [
          'Heat jostles the atomic magnets out of line. Up to the Curie temperature the effect is gradual: both remanence and coercivity fall with temperature. Above it the material is no longer magnetic at all.',
          'NdFeB is strong but sensitive: B_r falls about 0.12% per kelvin and H_c about 0.6% per kelvin. A hot motor magnet with low coercivity can be partly flipped by the motor’s own windings, and that loss is permanent.',
          'Adding a few percent of dysprosium or terbium raises the coercivity and slows its fall, at a cost: these rare earths are scarce and mostly mined in China and Myanmar.',
        ],
        formulas: [
          ['Linear temperature rule', 'X(T) = X_{20}\\,[1 + \\beta\\,(T - 20)]'],
          ['NdFeB (typical)', '\\beta_{B_r} \\approx -0.12\\%/\\text{K},\\quad \\beta_{H_c} \\approx -0.6\\%/\\text{K}'],
        ],
        examples: [
          ex('NdFeB with H_c = 900 kA/m at 20 °C. H_c at 120 °C?', [['Fractional change.', '-0.006 \\times 100 = -0.6'], ['Apply.', '900 \\times (1 - 0.6) = 360']], '360 kA/m: less than half'),
          ex('B_r = 1.3 T at 20 °C. B_r at 100 °C?', [['Fractional change.', '-0.0012 \\times 80 = -0.096'], ['Apply.', '1.3 \\times 0.904 = 1.175']], '1.18 T'),
        ],
        practice: [
          pr('H_c = 900 kA/m at 20 °C, β = −0.6%/K. H_c at 80 °C in kA/m?', 900 * (1 - 0.006 * 60), 'Change of 60 K.', '900 × 0.64 = 576 kA/m.'),
          pr('B_r = 1.3 T at 20 °C, β = −0.12%/K. B_r at 60 °C in T?', 1.3 * (1 - 0.0012 * 40), 'Change of 40 K.', '1.3 × 0.952 = 1.24 T.'),
          pr('At what temperature in °C has H_c halved (β = −0.6%/K)?', 20 + 0.5 / 0.006, 'Solve 1 − 0.006ΔT = 0.5.', 'ΔT = 83.3 K, so 103 °C.'),
          pr('A dysprosium grade has H_c = 1600 kA/m at 20 °C and β = −0.45%/K. H_c at 150 °C in kA/m?', 1600 * (1 - 0.0045 * 130), 'Change of 130 K.', '1600 × 0.415 = 664 kA/m.'),
        ],
      },
    ],
  },
};
