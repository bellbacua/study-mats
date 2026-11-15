// Electronics foundations (ee-108 to ee-114), split into parts.
// Practice answers are computed in place so the numbers cannot drift from the working.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const op = (q, options, hint, solution) => ({ q, options, hint, solution });

const TAU = 2 * Math.PI;
const f0 = (L, C) => 1 / (TAU * Math.sqrt(L * C));
const db = (g) => 20 * Math.log10(g);

export const ECE_AC = {
  'ee-108': {
    predict: {
      q: 'A charged capacitor is connected across a coil, with almost no resistance. What happens to the capacitor’s voltage?',
      options: ['It swings positive and negative, back and forth', 'It drops to zero and stays there', 'It stays charged', 'It doubles'],
      answer: 0,
      reveal: 'The energy sloshes between the capacitor’s field and the coil’s field, like a mass on a spring. The voltage oscillates at f₀ = 1/(2π√LC), and resistance slowly damps it.',
    },
    parts: [
      {
        title: 'The LC pendulum',
        minutes: 15,
        explain: [
          'Start with a charged capacitor. It pushes current through the coil; the coil resists the change, so the current builds slowly. When the capacitor is empty, the coil keeps the current going and charges the capacitor the other way. Then it all runs back.',
          'Energy swaps between ½Cv² in the capacitor and ½Li² in the coil. With no resistance, the total stays constant forever.',
          'The equation L q″ + q/C = 0 is the spring equation m x″ + k x = 0 (MATH 026), with L in the role of mass and 1/C of stiffness. So ω₀ = 1/√(LC).',
        ],
        formulas: [['Natural frequency', '\\omega_0 = \\frac{1}{\\sqrt{LC}} \\qquad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}'], ['Energy', '\\tfrac12 C V_{max}^2 = \\tfrac12 L I_{max}^2']],
        examples: [
          ex('L = 1 mH, C = 10 μF. Natural frequency?', [['√(LC).', '\\sqrt{10^{-3}\\times10^{-5}} = 10^{-4}'], ['f₀.', '\\frac{1}{2\\pi\\times10^{-4}} \\approx 1592\\ \\text{Hz}']], '1.59 kHz'),
          ex('That capacitor starts at 10 V. Peak current?', [['Equal energies.', 'I_{max} = V\\sqrt{C/L}'], ['Substitute.', '10\\sqrt{10^{-5}/10^{-3}} = 1\\ \\text{A}']], '1 A'),
        ],
        practice: [
          pr('f₀ in kHz for L = 100 μH, C = 100 nF?', f0(1e-4, 1e-7) / 1000, '1/(2π√LC).', '√(10⁻¹¹) = 3.16 × 10⁻⁶, f₀ ≈ 50.3 kHz.'),
          pr('f₀ in Hz for L = 0.5 H, C = 20 μF?', f0(0.5, 20e-6), 'Same.', '√(10⁻⁵) = 3.16 × 10⁻³, f₀ ≈ 50.3 Hz.'),
          pr('Peak current in A: C = 100 μF at 20 V into L = 25 mH?', 20 * Math.sqrt(100e-6 / 25e-3), 'V√(C/L).', '20 × 0.0632 = 1.26 A.'),
          op('Make the capacitor four times bigger. The ringing frequency…', ['Halves', 'Doubles', 'Quarters', 'Stays the same'], 'f₀ ∝ 1/√C.', 'Halves.'),
        ],
      },
      {
        title: 'Damping',
        minutes: 15,
        explain: [
          'Add resistance and each swing loses some energy as heat. For a series RLC the swings die as e^(−αt), with α = R / (2L).',
          'If R is small the circuit rings for many cycles (underdamped). At R = 2√(L/C) it just fails to ring (critically damped). Larger R creeps back slowly (overdamped).',
          'Engineers choose damping on purpose: a meter needle should settle fast without overshooting, close to critical damping.',
        ],
        formulas: [['Decay rate', '\\alpha = \\frac{R}{2L}'], ['Critical damping', 'R_c = 2\\sqrt{\\frac{L}{C}}']],
        examples: [
          ex('L = 10 mH, C = 1 μF. Critical resistance?', [['√(L/C).', '\\sqrt{10^{-2}/10^{-6}} = 100'], ['Double.', 'R_c = 200\\ \\Omega']], '200 Ω'),
          ex('With R = 20 Ω, how long until the swing falls to 1/e?', [['α = R/(2L).', '20/0.02 = 1000\\ \\text{/s}'], ['Time = 1/α.', '1\\ \\text{ms}']], '1 ms'),
        ],
        practice: [
          pr('Critical resistance in Ω for L = 1 H, C = 1 μF?', 2 * Math.sqrt(1 / 1e-6), '2√(L/C).', '2000 Ω.'),
          pr('Decay rate α in /s for R = 50 Ω, L = 0.1 H?', 250, 'R/(2L).', '250 /s.'),
          op('L = 10 mH, C = 1 μF, R = 500 Ω. The circuit is…', ['Overdamped: it does not ring', 'Underdamped: it rings', 'Critically damped', 'Undamped'], 'Compare with R_c = 200 Ω.', '500 > 200: overdamped.'),
          pr('Time in ms for the swing to fall to 1/e with R = 4 Ω, L = 2 mH?', 1000 / (4 / (2 * 2e-3)), '1/α.', 'α = 1000 /s, so 1 ms.'),
        ],
      },
      {
        title: 'Resonance and Q',
        minutes: 20,
        explain: [
          'Drive a series RLC with a sine wave. At most frequencies the coil or the capacitor blocks the current. At f₀ their effects cancel exactly and only R is left: the current peaks at V/R.',
          'The quality factor Q = (1/R)√(L/C) says how sharp the peak is. The bandwidth, between the half-power points, is f₀ / Q.',
          'A radio tuner wants high Q to pick one station; a loudspeaker crossover wants low Q to pass a broad band smoothly.',
        ],
        formulas: [['Quality factor', 'Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{\\omega_0 L}{R}'], ['Bandwidth', 'BW = \\frac{f_0}{Q}']],
        examples: [
          ex('L = 10 mH, C = 1 μF, R = 10 Ω. Q and bandwidth?', [['Q.', '\\frac{1}{10}\\sqrt{10^{4}} = 10'], ['f₀ = 1592 Hz, so BW.', '1592/10 \\approx 159\\ \\text{Hz}']], 'Q = 10, about 159 Hz wide'),
          ex('Peak current with a 5 V source?', [['At resonance only R.', 'I = 5/10'], ['Result.', '0.5\\ \\text{A}']], '0.5 A'),
        ],
        practice: [
          pr('Q for L = 1 mH, C = 1 nF, R = 10 Ω?', (1 / 10) * Math.sqrt(1e-3 / 1e-9), '(1/R)√(L/C).', '√10⁶ = 1000, Q = 100.'),
          pr('A 1 MHz tuner with Q = 50. Bandwidth in kHz?', 20, 'f₀/Q.', '20 kHz.'),
          pr('Peak current in mA: 2 V source, R = 40 Ω at resonance?', 50, 'V/R.', '50 mA.'),
          pr('Capacitance in pF to resonate 100 μH at 2 MHz?', (1 / ((TAU * 2e6) ** 2 * 1e-4)) * 1e12, 'C = 1/((2πf)²L).', '≈ 63.3 pF.'),
        ],
      },
    ],
  },

  'ee-109': {
    predict: {
      q: 'A sine-wave voltage is put across a coil. When is the current largest?',
      options: ['A quarter cycle after the voltage peaks', 'Exactly when the voltage peaks', 'A quarter cycle before the voltage peaks', 'Never: coils block AC completely'],
      answer: 0,
      reveal: 'A coil resists change, so its current lags the voltage by 90°. In a capacitor it is the other way round: current leads by 90°.',
    },
    parts: [
      {
        title: 'Sine waves as arrows',
        minutes: 15,
        explain: [
          'Every voltage and current in an AC circuit swings at the same frequency. What differs is the size and the timing (phase). So we can describe each one by an arrow: length = peak value, angle = phase.',
          'Picture the arrow spinning at ω = 2πf. Its shadow on the horizontal axis traces V_m cos(ωt + φ). Since all arrows spin together, we freeze them and work with the arrows themselves.',
          'These arrows are complex numbers (NUM 009): V_m∠φ = V_m cos φ + j V_m sin φ. Engineers use j for √−1, because i is current.',
        ],
        formulas: [['Phasor', 'V_m\\cos(\\omega t + \\phi) \\longleftrightarrow V_m\\angle\\phi = V_m(\\cos\\phi + j\\sin\\phi)']],
        examples: [
          ex('Write 10∠30° in rectangular form.', [['Real part.', '10\\cos30^\\circ = 8.66'], ['Imaginary part.', '10\\sin30^\\circ = 5 \\Rightarrow 8.66 + j5']], '8.66 + j5'),
          ex('Write 3 + j4 in polar form.', [['Size.', '\\sqrt{9 + 16} = 5'], ['Angle.', '\\tan^{-1}(4/3) = 53.1^\\circ']], '5∠53.1°'),
        ],
        practice: [
          pr('Real part of 20∠60°?', 10, '20 cos 60°.', '10.'),
          pr('Size of 6 + j8?', 10, '√(36 + 64).', '10.'),
          pr('Angle in degrees of 1 + j1?', 45, 'tan⁻¹(1).', '45°.'),
          pr('ω in rad/s for the Philippine 60 Hz supply?', TAU * 60, '2πf.', '377 rad/s.'),
        ],
      },
      {
        title: 'Impedance of R, L and C',
        minutes: 20,
        explain: [
          'Impedance is the AC version of resistance, a complex number: Z = V / I. For a resistor Z = R, in phase.',
          'A coil: Z_L = jωL. The j means current lags voltage by 90°, and the size ωL grows with frequency. A capacitor: Z_C = 1/(jωC) = −j/(ωC). Current leads by 90°, and the size falls with frequency.',
          'The imaginary part is called reactance X (in ohms): X_L = ωL, X_C = 1/(ωC).',
        ],
        formulas: [['Impedances', 'Z_R = R \\qquad Z_L = j\\omega L \\qquad Z_C = \\frac{-j}{\\omega C}']],
        examples: [
          ex('Reactance of 50 mH at 60 Hz?', [['ω = 377.', 'X_L = 377\\times0.05'], ['Result.', '18.8\\ \\Omega']], 'j18.8 Ω'),
          ex('Reactance of 10 μF at 60 Hz?', [['X_C = 1/(ωC).', '\\frac{1}{377\\times10^{-5}}'], ['Result.', '265\\ \\Omega']], '−j265 Ω'),
        ],
        practice: [
          pr('X_L in Ω of 0.1 H at 60 Hz?', TAU * 60 * 0.1, 'ωL.', '37.7 Ω.'),
          pr('X_C in Ω of 1 μF at 1 kHz?', 1 / (TAU * 1000 * 1e-6), '1/(ωC).', '159 Ω.'),
          pr('X_L in Ω of 10 μH at 100 MHz?', TAU * 1e8 * 1e-5, 'ωL.', '6283 Ω.'),
          op('As frequency rises, a capacitor’s reactance…', ['Falls', 'Rises', 'Stays the same', 'Becomes negative infinity'], 'X_C = 1/(ωC).', 'Falls: capacitors pass high frequencies.'),
        ],
      },
      {
        title: 'Solving AC circuits',
        minutes: 20,
        explain: [
          'With impedances, AC circuits are solved exactly like DC: series impedances add, parallel ones combine as Z₁Z₂/(Z₁ + Z₂), and V = IZ.',
          'For a series R and X: |Z| = √(R² + X²), angle θ = tan⁻¹(X/R). The current is V/|Z|, and it lags by θ if X is inductive (positive) or leads if capacitive (negative).',
          'The power factor is cos θ (PHYS 209): the fraction of the volt-amps that is real power.',
        ],
        formulas: [['Series R and X', '|Z| = \\sqrt{R^2 + X^2} \\qquad \\theta = \\tan^{-1}\\frac{X}{R}'], ['Current', '|I| = \\frac{|V|}{|Z|}']],
        examples: [
          ex('120 Ω in series with X_C = −90 Ω on 230 V. Current?', [['|Z|.', '\\sqrt{120^2 + 90^2} = 150\\ \\Omega'], ['Current.', '230/150 = 1.53\\ \\text{A, leading by } 36.9^\\circ']], '1.53 A, leading'),
          ex('Power factor of that circuit?', [['cos θ.', '\\cos36.9^\\circ'], ['Result.', '0.8\\ \\text{leading}']], '0.8'),
        ],
        practice: [
          pr('|Z| in Ω of 30 Ω with X_L = 40 Ω in series?', 50, '√(R² + X²).', '50 Ω.'),
          pr('Current in A from 230 V through that impedance?', 4.6, 'V/|Z|.', '4.6 A.'),
          pr('Phase angle in degrees of R = 10 Ω, X_L = 10 Ω?', 45, 'tan⁻¹(1).', '45°, current lagging.'),
          pr('Power factor of R = 8 Ω, X = 6 Ω?', 0.8, 'cos θ = R/|Z|.', '8/10 = 0.8.'),
        ],
      },
    ],
  },

  'ee-110': {
    predict: {
      q: 'A low-pass filter has its cutoff at 1 kHz. A 1 kHz signal goes in. How much comes out?',
      options: ['About 71%', 'About 50%', '100%', 'Nothing'],
      answer: 0,
      reveal: 'The cutoff is defined as the point where the output falls to 1/√2 ≈ 0.707 of the input: −3 dB, half the power.',
    },
    parts: [
      {
        title: 'The RC low-pass filter',
        minutes: 15,
        explain: [
          'An RC low-pass is a voltage divider made of a resistor and a capacitor, with the output taken across the capacitor. Its gain is 1 / (1 + jωRC).',
          'At low frequency the capacitor barely conducts, so the output equals the input. At high frequency the capacitor shorts the output to ground.',
          'Size of the gain: 1/√(1 + (f/f_c)²), with f_c = 1/(2πRC). Swap R and C and you have a high-pass filter.',
        ],
        formulas: [['Gain', '|G| = \\frac{1}{\\sqrt{1 + (f/f_c)^2}}'], ['Cutoff', 'f_c = \\frac{1}{2\\pi RC}']],
        examples: [
          ex('R = 10 kΩ, C = 10 nF. Cutoff?', [['RC.', '10^{4}\\times10^{-8} = 10^{-4}\\ \\text{s}'], ['f_c.', '\\frac{1}{2\\pi\\times10^{-4}} \\approx 1592\\ \\text{Hz}']], '1.59 kHz'),
          ex('Gain at 5 kHz for f_c = 1 kHz?', [['Ratio f/f_c = 5.', '\\frac{1}{\\sqrt{1 + 25}}'], ['Result.', '0.196']], 'About 0.2'),
        ],
        practice: [
          pr('Cutoff in Hz of R = 1 kΩ, C = 1 μF?', 1 / (TAU * 1e-3), '1/(2πRC).', '159 Hz.'),
          pr('Gain at f = f_c?', 1 / Math.SQRT2, '1/√2.', '0.707.'),
          pr('Gain at 3 kHz for f_c = 1 kHz?', 1 / Math.sqrt(10), '1/√(1 + 9).', '0.316.'),
          pr('Capacitor in nF for f_c = 10 kHz with R = 1.6 kΩ?', (1 / (TAU * 1e4 * 1600)) * 1e9, 'C = 1/(2πf_c R).', '≈ 9.95 nF.'),
        ],
      },
      {
        title: 'Decibels',
        minutes: 15,
        explain: [
          'Gains span huge ranges, so engineers use a logarithmic unit (MATH 008). For voltage ratios, gain in dB = 20 log₁₀(V_out/V_in). For power ratios, 10 log₁₀(P_out/P_in).',
          'Useful values: ×2 is +6 dB, ×10 is +20 dB, ×100 is +40 dB, ×1/√2 is −3 dB, ×1/10 is −20 dB.',
          'The big advantage: gains in a chain multiply, but their decibels simply add.',
        ],
        formulas: [['Voltage gain', '\\text{dB} = 20\\log_{10}\\frac{V_{out}}{V_{in}}'], ['Back to a ratio', '\\frac{V_{out}}{V_{in}} = 10^{\\text{dB}/20}']],
        examples: [
          ex('A gain of 50 in dB?', [['20 log 50.', '20\\times1.699'], ['Result.', '34\\ \\text{dB}']], '34 dB'),
          ex('Amplifier +30 dB, then cable −6 dB, then filter −3 dB. Total?', [['Add.', '30 - 6 - 3'], ['Result.', '21\\ \\text{dB}']], '+21 dB (×11.2)'),
        ],
        practice: [
          pr('A voltage gain of 1000 in dB?', 60, '20 log 1000.', '60 dB.'),
          pr('A gain of 0.5 in dB?', db(0.5), '20 log 0.5.', '−6.02 dB.'),
          pr('What voltage ratio is +14 dB?', 10 ** (14 / 20), '10^(dB/20).', '5.01.'),
          pr('Stages of +20 dB, +20 dB and −10 dB. Total in dB?', 30, 'Add.', '30 dB.'),
        ],
      },
      {
        title: 'Bode plots',
        minutes: 15,
        explain: [
          'A Bode plot draws gain in dB against frequency on a log axis. For an RC low-pass it is nearly flat at 0 dB below f_c and a straight line falling 20 dB per decade above it.',
          'The real curve is 3 dB below the corner of those two lines at f_c. One decade below f_c it is almost exactly 0 dB; one decade above, −20 dB.',
          'Two RC sections in a row fall at 40 dB per decade. This is how engineers design filters that block hum or noise far from the wanted signal.',
        ],
        formulas: [['Above cutoff', '\\text{gain} \\approx -20\\log_{10}\\frac{f}{f_c}\\ \\text{dB}']],
        examples: [
          ex('f_c = 100 Hz. Approximate gain at 10 kHz?', [['Two decades above.', '-20\\times\\log_{10}100'], ['Result.', '-40\\ \\text{dB}']], '−40 dB (×0.01)'),
          ex('Exact gain at 1 kHz for f_c = 100 Hz?', [['Ratio 10.', '20\\log_{10}\\frac{1}{\\sqrt{101}}'], ['Result.', '-20.04\\ \\text{dB}']], '−20.04 dB'),
        ],
        practice: [
          pr('Approximate gain in dB at 50 kHz for f_c = 500 Hz (one RC)?', -40, '2 decades.', '−40 dB.'),
          pr('Exact gain in dB at f_c?', db(1 / Math.SQRT2), '20 log(1/√2).', '−3.01 dB.'),
          pr('Approximate gain in dB one decade above f_c with two RC sections?', -40, '40 dB per decade.', '−40 dB.'),
          op('Below the cutoff, an RC low-pass Bode plot is…', ['Nearly flat at 0 dB', 'Rising at 20 dB per decade', 'Falling at 20 dB per decade', 'At −3 dB everywhere'], 'Low frequencies pass.', 'Flat.'),
        ],
      },
    ],
  },

  'ee-111': {
    predict: {
      q: 'Maxwell calculated the speed of his electromagnetic waves from two numbers measured with coils and capacitors. The answer was close to…',
      options: ['The speed of light', 'The speed of sound', 'The speed of an electron in a wire', 'Infinity'],
      answer: 0,
      reveal: 'c = 1/√(μ₀ε₀) ≈ 3.00 × 10⁸ m/s, the measured speed of light. That is how he realised light is an electromagnetic wave.',
    },
    parts: [
      {
        title: 'The four equations in words',
        minutes: 20,
        explain: [
          '1. Gauss’s law: electric field lines begin on positive charges and end on negative ones. The total "flow" of E out of a closed surface is the charge inside divided by ε₀.',
          '2. No magnetic charges: magnetic field lines always close on themselves. 3. Faraday’s law: a changing magnetic flux makes a circulating electric field (PHYS 208).',
          '4. Ampère–Maxwell: a current, or a changing electric flux, makes a circulating magnetic field. Maxwell’s added term, the changing electric flux, is what lets light exist.',
        ],
        formulas: [['Gauss', '\\oint \\mathbf{E}\\cdot d\\mathbf{A} = \\frac{Q_{in}}{\\varepsilon_0}'], ['Ampère–Maxwell', '\\oint \\mathbf{B}\\cdot d\\boldsymbol{\\ell} = \\mu_0 I + \\mu_0\\varepsilon_0\\frac{d\\Phi_E}{dt}']],
        examples: [
          ex('A sphere encloses +1 nC. Total electric flux out?', [['Gauss.', '\\Phi = Q/\\varepsilon_0'], ['Calculate.', '\\frac{10^{-9}}{8.854\\times10^{-12}} = 113\\ \\text{V·m}']], '113 V·m'),
          ex('Field at 1 m from that charge by Gauss’s law?', [['E × sphere area = flux.', 'E = \\frac{113}{4\\pi\\times1^2}'], ['Result.', '9.0\\ \\text{V/m}']], '9.0 V/m (same as Coulomb’s law)'),
        ],
        practice: [
          pr('Electric flux in V·m out of a box holding +2 nC?', 2e-9 / 8.854e-12, 'Q/ε₀.', '226 V·m.'),
          pr('Flux out of a box holding +3 nC and −3 nC?', 0, 'Add the charges.', '0.'),
          op('Which equation says magnetic field lines never end?', ['Gauss’s law for magnetism', 'Faraday’s law', 'Ampère–Maxwell law', 'Coulomb’s law'], 'There are no magnetic "charges".', 'Gauss for B.'),
          op('Which law explains a transformer?', ['Faraday’s law', 'Gauss’s law', 'Gauss’s law for magnetism', 'Coulomb’s law'], 'Changing magnetic flux.', 'Faraday.'),
        ],
      },
      {
        title: 'The speed of light',
        minutes: 15,
        explain: [
          'Combine Faraday’s and Ampère–Maxwell’s laws in empty space: a changing E makes B and a changing B makes E. The fields satisfy a wave equation with speed 1/√(μ₀ε₀).',
          'μ₀ = 4π × 10⁻⁷ T·m/A and ε₀ = 8.854 × 10⁻¹² F/m give c ≈ 2.998 × 10⁸ m/s.',
          'In a material the wave slows: v = c/√(εᵣ μᵣ). In a coaxial cable with plastic of εᵣ ≈ 2.3, signals travel at about two thirds of c.',
        ],
        formulas: [['Speed in vacuum', 'c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}'], ['Speed in a material', 'v = \\frac{c}{\\sqrt{\\varepsilon_r\\mu_r}}']],
        examples: [
          ex('Compute c from the constants.', [['μ₀ε₀.', '4\\pi\\times10^{-7}\\times8.854\\times10^{-12} = 1.113\\times10^{-17}'], ['1/√ of it.', 'c = 2.998\\times10^{8}\\ \\text{m/s}']], '3.00 × 10⁸ m/s'),
          ex('Signal speed in a cable with εᵣ = 2.25?', [['√2.25 = 1.5.', 'v = c/1.5'], ['Result.', '2\\times10^{8}\\ \\text{m/s}']], '2 × 10⁸ m/s'),
        ],
        practice: [
          pr('Speed in units of 10⁸ m/s in glass with εᵣ = 4 (μᵣ = 1)?', 3 / 2, 'c/√4.', '1.5.'),
          pr('Time in ns for a signal to travel 1 m of cable at 2 × 10⁸ m/s?', 5, 't = d/v.', '5 ns.'),
          pr('Time in ms for light from a satellite 36,000 km up?', 120, 'd/c.', '3.6 × 10⁷ / 3 × 10⁸ = 0.12 s = 120 ms.'),
          op('Inside a material, light and radio waves usually…', ['Travel slower than c', 'Travel faster than c', 'Travel at exactly c', 'Stop'], 'v = c/√(εᵣμᵣ) with εᵣ > 1.', 'Slower.'),
        ],
      },
      {
        title: 'Wavelength and the spectrum',
        minutes: 15,
        explain: [
          'All electromagnetic waves obey λ = c / f. Low frequencies have long waves: AM radio’s are hundreds of metres. High frequencies have short ones: visible light is about 400–700 nm.',
          'In the wave, E and B are at right angles to each other and to the direction of travel, and E = cB.',
          'Antennas, microwave ovens, fibre optics and X-ray machines are all the same physics at different frequencies.',
        ],
        formulas: [['Wavelength', '\\lambda = \\frac{c}{f}'], ['Field ratio', 'E = c\\,B']],
        examples: [
          ex('Wavelength of 2.4 GHz Wi-Fi?', [['c/f.', '\\frac{3\\times10^{8}}{2.4\\times10^{9}}'], ['Result.', '0.125\\ \\text{m}']], '12.5 cm'),
          ex('Frequency of green light at 550 nm?', [['f = c/λ.', '\\frac{3\\times10^{8}}{5.5\\times10^{-7}}'], ['Result.', '5.45\\times10^{14}\\ \\text{Hz}']], '545 THz'),
        ],
        practice: [
          pr('Wavelength in m of a 1 MHz AM station?', 300, 'c/f.', '300 m.'),
          pr('Wavelength in cm of a 5 GHz signal?', 6, 'c/f.', '0.06 m = 6 cm.'),
          pr('Frequency in MHz of a 2 m wave?', 150, 'c/λ.', '150 MHz.'),
          pr('B in μT for a wave with E = 300 V/m?', 1, 'B = E/c.', '10⁻⁶ T = 1 μT.'),
        ],
      },
    ],
  },

  'ee-112': {
    predict: {
      q: 'You walk from 1 km to 3 km away from a radio transmitter. The power reaching each square metre falls to…',
      options: ['One ninth', 'One third', 'Half', 'It stays the same'],
      answer: 0,
      reveal: 'The power spreads over a sphere whose area grows with r². Three times as far means 3² = 9 times less per square metre.',
    },
    parts: [
      {
        title: 'Antenna length',
        minutes: 15,
        explain: [
          'A half-wave dipole is two rods fed in the middle, each a quarter wavelength long. At that length the current on it resonates, so it radiates efficiently.',
          'Real dipoles are cut about 5% shorter than λ/2 because the wave travels a little slower along a rod than in free space.',
          'A quarter-wave "monopole" over a ground plane, like a car antenna, behaves like half a dipole.',
        ],
        formulas: [['Half-wave dipole', 'L \\approx \\frac{\\lambda}{2} = \\frac{c}{2f}'], ['Practical', 'L \\approx 0.95\\,\\frac{c}{2f}']],
        examples: [
          ex('Dipole length for 145 MHz?', [['λ.', '3\\times10^{8}/1.45\\times10^{8} = 2.07\\ \\text{m}'], ['× 0.95 / 2.', '0.98\\ \\text{m}']], 'About 98 cm'),
          ex('Quarter-wave monopole for 900 MHz?', [['λ = 0.333 m.', '\\lambda/4 = 0.083\\ \\text{m}'], ['Result.', '8.3\\ \\text{cm}']], 'About 8 cm'),
        ],
        practice: [
          pr('Ideal half-wave dipole length in m for 50 MHz?', 3, 'c/(2f).', '3 m.'),
          pr('Quarter-wave length in cm for 2.4 GHz?', 3.125, 'c/(4f).', '3.125 cm.'),
          pr('Practical (×0.95) half-wave length in m for 100 MHz?', 1.425, '0.95 × 1.5.', '1.425 m.'),
          op('Why are phone antennas so small?', ['Phone frequencies are high, so wavelengths are short', 'Small antennas are always better', 'Phones use light, not radio', 'Antennas are not needed'], 'λ = c/f.', 'At 1–5 GHz, λ is 6–30 cm.'),
        ],
      },
      {
        title: 'Spreading and gain',
        minutes: 15,
        explain: [
          'An antenna sending P watts equally in all directions spreads it over a sphere of area 4πr². The power density is S = P / (4πr²) in W/m².',
          'Directional antennas (dishes, Yagis) focus power into a beam. Their gain G multiplies the power density in that direction: S = GP / (4πr²).',
          'Gain is usually quoted in dBi: decibels above an ideal antenna that radiates equally in all directions.',
        ],
        formulas: [['Power density', 'S = \\frac{G\\,P}{4\\pi r^2}']],
        examples: [
          ex('A 10 kW station, no gain, at 10 km. S?', [['4πr².', '4\\pi\\times10^{8} = 1.26\\times10^{9}\\ \\text{m}^2'], ['Divide.', 'S = 7.96\\times10^{-6}\\ \\text{W/m}^2']], 'About 8 μW/m²'),
          ex('A dish with gain 1000 (30 dBi). Same power and distance?', [['× 1000.', '7.96\\times10^{-3}'], ['Result.', '\\approx 8\\ \\text{mW/m}^2']], 'About 8 mW/m²'),
        ],
        practice: [
          pr('Power density in μW/m² from 1 kW at 5 km (no gain)?', (1000 / (4 * Math.PI * 25e6)) * 1e6, 'P/(4πr²).', '3.18 μW/m².'),
          pr('Distance doubled: factor by which S shrinks?', 4, 'r².', '4.'),
          pr('Gain as a plain ratio of a 20 dBi antenna?', 100, '10^(dB/10) for power.', '100.'),
          pr('Power density in mW/m² at 1 km from 100 W with gain 10?', ((10 * 100) / (4 * Math.PI * 1e6)) * 1e3, 'GP/(4πr²).', '0.0796 mW/m².'),
        ],
      },
      {
        title: 'Matching and reflection',
        minutes: 15,
        explain: [
          'A cable has a characteristic impedance Z₀, set by its size and insulation: 50 Ω for most radio, 75 Ω for TV and satellite.',
          'If the load (antenna) has a different impedance Z_L, part of the wave reflects back. The reflection coefficient Γ = (Z_L − Z₀)/(Z_L + Z₀); the reflected power fraction is Γ².',
          'Engineers also quote the VSWR, (1 + |Γ|)/(1 − |Γ|). A VSWR under 2 (about 11% reflected) is usually fine.',
        ],
        formulas: [['Reflection', '\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0}'], ['Standing wave ratio', 'VSWR = \\frac{1 + |\\Gamma|}{1 - |\\Gamma|}']],
        examples: [
          ex('A 100 Ω antenna on 50 Ω cable. Γ and reflected power?', [['Γ.', '\\frac{100 - 50}{150} = 0.333'], ['Γ².', '0.111 = 11\\%']], 'Γ = 0.33, 11% reflected'),
          ex('Its VSWR?', [['Substitute.', '\\frac{1.333}{0.667}'], ['Result.', '2.0']], '2.0'),
        ],
        practice: [
          pr('Γ for a 25 Ω load on 50 Ω cable?', -1 / 3, '(25 − 50)/(75).', '−0.333.'),
          pr('Reflected power percentage for Γ = 0.1?', 1, 'Γ² × 100.', '1%.'),
          pr('VSWR for Γ = 0.5?', 3, '(1.5)/(0.5).', '3.'),
          op('An open-ended cable (Z_L infinite) reflects…', ['All the power (Γ = 1)', 'None of it', 'Half', 'A quarter'], '(∞ − Z₀)/(∞ + Z₀).', 'Γ → 1.'),
        ],
      },
    ],
  },

  'ee-113': {
    predict: {
      q: 'A circuit’s transfer function has a pole at s = −5. After a sudden change, its response…',
      options: ['Dies away like e^(−5t)', 'Grows like e^(5t)', 'Oscillates forever', 'Jumps instantly and stays'],
      answer: 0,
      reveal: 'A pole at s = −a means a term e^(−at) in the response. Negative real poles decay; poles on the right half of the plane grow, which means instability.',
    },
    parts: [
      {
        title: 'The transform and its table',
        minutes: 20,
        explain: [
          'The Laplace transform F(s) = ∫₀^∞ f(t)e^(−st) dt turns a function of time into a function of s. You rarely integrate it yourself: a short table covers most circuits.',
          'Key pairs: a step 1 → 1/s; e^(−at) → 1/(s + a); t → 1/s²; sin ωt → ω/(s² + ω²); cos ωt → s/(s² + ω²).',
          'It is linear: constants and sums pass straight through, so ℒ{3 + 2e^(−t)} = 3/s + 2/(s + 1).',
        ],
        formulas: [['Definition', 'F(s) = \\int_0^{\\infty} f(t)\\,e^{-st}\\,dt'], ['Common pairs', '1 \\to \\frac1s \\quad e^{-at} \\to \\frac{1}{s+a} \\quad \\sin\\omega t \\to \\frac{\\omega}{s^2+\\omega^2}']],
        examples: [
          ex('Transform 5e^(−2t).', [['Constant passes through.', '5\\times\\frac{1}{s+2}'], ['Result.', '\\frac{5}{s+2}']], '5/(s + 2)'),
          ex('Inverse of 4/(s² + 16).', [['Match ω/(s² + ω²) with ω = 4.', '\\sin 4t'], ['Result.', 'f(t) = \\sin 4t']], 'sin 4t'),
        ],
        practice: [
          pr('ℒ{e^(−4t)} evaluated at s = 1?', 1 / 5, '1/(s + 4).', '1/5 = 0.2.'),
          pr('ℒ{3} evaluated at s = 6?', 0.5, '3/s.', '0.5.'),
          pr('The inverse of 1/(s + 2) at t = 0.5 (give f(0.5))?', Math.exp(-1), 'e^(−2t).', 'e^(−1) = 0.368.'),
          op('Which time function has transform s/(s² + 9)?', ['cos 3t', 'sin 3t', 'e^(−3t)', 'cos 9t'], 's/(s² + ω²) is cosine.', 'ω = 3.'),
        ],
      },
      {
        title: 'Circuits in the s-domain',
        minutes: 20,
        explain: [
          'Because ℒ{df/dt} = sF(s) − f(0), every derivative becomes a multiplication by s. With zero starting energy, a coil becomes an impedance sL and a capacitor 1/(sC).',
          'Then you solve the circuit with ordinary algebra: series add, dividers, nodes. Finally turn the answer back into time with the table (often after splitting into partial fractions).',
          'For an RC low-pass: H(s) = (1/sC)/(R + 1/sC) = 1/(1 + sRC).',
        ],
        formulas: [['s-domain impedances', 'Z_R = R \\qquad Z_L = sL \\qquad Z_C = \\frac{1}{sC}'], ['Derivative rule', '\\mathcal{L}\\{f\\,\'\\} = sF(s) - f(0)']],
        examples: [
          ex('Step of 1 V into an RC low-pass, RC = 1 s. Output?', [['V_out = H(s)/s.', '\\frac{1}{s(1+s)} = \\frac1s - \\frac{1}{s+1}'], ['Back to time.', 'v(t) = 1 - e^{-t}']], '1 − e^(−t): the charging curve'),
          ex('Transfer function of an RL high-pass (output across L)?', [['Divider.', 'H(s) = \\frac{sL}{R + sL}'], ['Pole at s = −R/L.', '\\tau = L/R']], 'sL/(R + sL)'),
        ],
        practice: [
          pr('s-domain impedance of a 0.2 H coil at s = 10?', 2, 'sL.', '2 Ω.'),
          pr('s-domain impedance of 0.5 F at s = 4?', 0.5, '1/(sC).', '1/2 = 0.5 Ω.'),
          pr('H(s) = 1/(1 + 0.1s) at s = 0 (the DC gain)?', 1, 'Put s = 0.', '1.'),
          pr('Step response v(t) = 1 − e^(−10t) at t = 0.1 s?', 1 - Math.exp(-1), 'Substitute.', '0.632.'),
        ],
      },
      {
        title: 'Poles and stability',
        minutes: 15,
        explain: [
          'A pole is a value of s where the bottom of H(s) is zero. Each pole p gives a term e^(pt) in the response.',
          'Real negative poles: smooth decay. Complex poles −α ± jω: decaying oscillation at ω rad/s. Poles on the imaginary axis: oscillation forever. Poles with positive real part: growth, an unstable circuit.',
          'For a second-order bottom s² + bs + c, find the poles with the quadratic formula (MATH 006).',
        ],
        formulas: [['Quadratic poles', 's = \\frac{-b \\pm \\sqrt{b^2 - 4c}}{2}'], ['Response term', 'p = -\\alpha \\pm j\\omega \\Rightarrow e^{-\\alpha t}\\cos\\omega t']],
        examples: [
          ex('Poles of 1/(s² + 6s + 8)?', [['Factor.', '(s + 2)(s + 4)'], ['Poles.', 's = -2,\\ -4']], '−2 and −4: no ringing'),
          ex('Poles of 1/(s² + 4s + 13)?', [['Quadratic.', '\\frac{-4 \\pm \\sqrt{16 - 52}}{2}'], ['Result.', '-2 \\pm 3j']], 'Rings at 3 rad/s, decays as e^(−2t)'),
        ],
        practice: [
          pr('The pole of 1/(s + 7)?', -7, 'Set s + 7 = 0.', '−7.'),
          pr('Ringing frequency in rad/s for poles at −1 ± 5j?', 5, 'The imaginary part.', '5 rad/s.'),
          pr('Decay rate α for poles of s² + 10s + 100?', 5, 'Real part = −b/2.', '−5, so α = 5.'),
          op('A pole at s = +2 means the circuit is…', ['Unstable: its output grows', 'Stable and smooth', 'Stable and ringing', 'Impossible'], 'e^(2t) grows.', 'Unstable.'),
        ],
      },
    ],
  },

  'ee-114': {
    predict: {
      q: 'Which frequencies does a 1 kHz square wave contain?',
      options: ['1, 3, 5, 7 kHz and so on', 'Only 1 kHz', '1, 2, 3, 4 kHz and so on', 'Only 0 Hz (it is flat on top)'],
      answer: 0,
      reveal: 'A square wave is the sum of odd harmonics: sin ωt + sin 3ωt/3 + sin 5ωt/5 + …. The sharper the corners, the more high harmonics.',
    },
    parts: [
      {
        title: 'Harmonics',
        minutes: 15,
        explain: [
          'A repeating signal with period T has a fundamental frequency f₁ = 1/T. Fourier showed it can be built from sine and cosine waves at f₁, 2f₁, 3f₁, … (the harmonics), plus a constant (the average, a₀).',
          'Smooth signals need only a few harmonics. Sharp corners and jumps need many, reaching to high frequencies.',
          'Mains electricity at 60 Hz with harmonics at 180 Hz, 300 Hz… is a sign of distorting loads such as chargers and LED drivers, a big topic for power engineers.',
        ],
        formulas: [['Fourier series', 'f(t) = a_0 + \\sum_{n=1}^{\\infty}\\left(a_n\\cos n\\omega_1 t + b_n\\sin n\\omega_1 t\\right)'], ['Harmonic frequencies', 'f_n = n\\,f_1']],
        examples: [
          ex('A signal repeats every 2 ms. Fundamental and 5th harmonic?', [['f₁ = 1/T.', '1/0.002 = 500\\ \\text{Hz}'], ['f₅.', '5\\times500 = 2500\\ \\text{Hz}']], '500 Hz and 2.5 kHz'),
          ex('Average (a₀) of a square wave between 0 V and 5 V?', [['Half the time at each.', '\\frac{0 + 5}{2}'], ['Result.', '2.5\\ \\text{V}']], '2.5 V'),
        ],
        practice: [
          pr('Fundamental in Hz of a wave with period 20 ms?', 50, '1/T.', '50 Hz.'),
          pr('7th harmonic in Hz of 60 Hz mains?', 420, '7 × 60.', '420 Hz.'),
          pr('Average in V of a square wave between −3 V and +3 V?', 0, 'Equal time each side.', '0 V.'),
          pr('Average in V of a wave that is 10 V for 25% of the time and 0 V otherwise?', 2.5, 'Weighted by time.', '0.25 × 10 = 2.5 V.'),
        ],
      },
      {
        title: 'The square wave series',
        minutes: 20,
        explain: [
          'A square wave swinging between −1 and +1 is (4/π)[sin ωt + (1/3)sin 3ωt + (1/5)sin 5ωt + …]. Only odd harmonics, each of size 4/(nπ).',
          'With three terms it already looks square-ish; with 50 the edges are sharp. But right next to each jump the sum always overshoots by about 9% of the jump: the Gibbs phenomenon.',
          'Other shapes have their own recipes: a sawtooth uses all harmonics with sizes 2/(nπ); a triangle uses odd ones falling as 1/n², so it is much smoother.',
        ],
        formulas: [['Square wave (±1)', 'f(t) = \\frac{4}{\\pi}\\sum_{n\\ \\text{odd}} \\frac{\\sin n\\omega t}{n}'], ['Harmonic size', 'b_n = \\frac{4}{n\\pi}']],
        examples: [
          ex('Size of the 3rd harmonic of a ±5 V square wave?', [['Scale by 5.', '5\\times\\frac{4}{3\\pi}'], ['Result.', '2.12\\ \\text{V}']], '2.12 V'),
          ex('Sum of the first two terms at ωt = 90°?', [['sin 90° = 1, sin 270° = −1.', '\\frac{4}{\\pi}\\left(1 - \\tfrac13\\right)'], ['Result.', '0.849']], '0.85 (heading to 1)'),
        ],
        practice: [
          pr('Size of the fundamental of a ±1 square wave?', 4 / Math.PI, '4/π.', '1.273.'),
          pr('Size of the 5th harmonic of a ±10 V square wave, in V?', (10 * 4) / (5 * Math.PI), '10 × 4/(5π).', '2.55 V.'),
          pr('Sum of the first three terms at ωt = 90° (±1 wave)?', (4 / Math.PI) * (1 - 1 / 3 + 1 / 5), '(4/π)(1 − 1/3 + 1/5).', '1.104: it overshoots.'),
          op('Which wave has harmonics that fall fastest (1/n²)?', ['Triangle', 'Square', 'Sawtooth', 'All the same'], 'Smoother shapes need less high-frequency content.', 'Triangle.'),
        ],
      },
      {
        title: 'Spectra and filters',
        minutes: 15,
        explain: [
          'The spectrum is the list of harmonic sizes plotted against frequency: a "barcode" of the signal. Spectrum analysers and the FFT in every phone compute it.',
          'A linear circuit treats each harmonic separately: multiply each by the circuit’s gain at that frequency (ELEC 110), then add them up again.',
          'This is why a low-pass filter rounds the corners of a square wave: it trims the high harmonics that made the corners sharp.',
        ],
        formulas: [['Harmonic through a filter', 'b_n^{out} = b_n \\times |G(n f_1)|']],
        examples: [
          ex('A ±1 square wave at 1 kHz through a low-pass with f_c = 1 kHz. Output fundamental?', [['Gain at 1 kHz.', '1/\\sqrt2 = 0.707'], ['× 4/π.', '1.273\\times0.707 = 0.90']], '0.90'),
          ex('Its 3rd harmonic out?', [['Gain at 3 kHz.', '1/\\sqrt{10} = 0.316'], ['× 4/(3π) = 0.424.', '0.134']], '0.13'),
        ],
        practice: [
          pr('Gain of an RC low-pass (f_c = 2 kHz) at 6 kHz?', 1 / Math.sqrt(10), '1/√(1 + 9).', '0.316.'),
          pr('5th harmonic size out (±1 square wave, gain 0.2 at that frequency)?', ((4 / (5 * Math.PI)) * 0.2), '4/(5π) × 0.2.', '0.051.'),
          pr('Frequency in kHz of the 11th harmonic of a 2 kHz square wave?', 22, '11 × 2.', '22 kHz.'),
          op('Fast square-wave clocks on a circuit board can disturb radios far above their own frequency because…', ['They contain strong high harmonics', 'Square waves are illegal', 'They have no harmonics', 'Clocks emit light'], 'Sharp edges need high harmonics.', 'The odd harmonics reach high frequencies.'),
        ],
      },
    ],
  },
};

