export const EXTRA_TERMS = [
  {
    id: 'term-3',
    title: 'Term 3: Quadratics, Linear Systems, Logarithms & Thermodynamics',
    subtitle: 'Completing the Pre-Calculus Bridge & 1st-Year UM Chemical Thermodynamics',
    description:
      'Mastering parabolas, multi-variable systems, natural logarithms (ln), and Gibbs Free Energy (ΔG = ΔH − TΔS) to predict whether a chemical or metallurgical reaction is spontaneous.',
  },
  {
    id: 'term-4',
    title: 'Term 4: Engineering Calculus, Mechanics of Materials & Diffusion',
    subtitle: 'Derivatives, Integrals, Stress-Strain Curves & Fick’s Laws of Atomic Diffusion',
    description:
      'Entering 2nd-Year UM Materials Engineering: using derivatives (dy/dx) for reaction/diffusion rates, integrals (∫σ dε) for fracture toughness, and Hooke’s Law for structural design.',
  },
  {
    id: 'term-5',
    title: 'Term 5: Phase Diagrams, Heat Treatment, Polymers & Ceramics',
    subtitle: 'The Iron-Carbon Steel Map, TTT Quenching Kinetics & Core Material Classes',
    description:
      'Core 3rd-Year UM BSMTE specialization: reading eutectic phase diagrams, quenching austenite into ultra-hard martensite, and engineering polymers, ceramics, and carbon-fiber composites.',
  },
  {
    id: 'term-6',
    title: 'Term 6: Semiconductors, Corrosion Engineering & Ashby Capstone',
    subtitle: 'Bandgap Physics, Electrochemistry & Full-Scale Engineering Materials Selection',
    description:
      '4th-Year UM BSMTE exit competencies: designing doped Silicon semiconductors, preventing marine/industrial corrosion via Faraday’s & Nernst equations, and optimizing Ashby performance indices.',
  },
];

export const EXTRA_LESSONS = [
  // ==========================================
  // MODULE 11: MATH 006 (QUADRATICS & POLYNOMIALS)
  // ==========================================
  {
    id: 'math-006',
    code: 'MATH 006',
    termId: 'term-3',
    week: 3,
    daySlot: 'Module 11',
    track: 'math',
    title: 'Polynomials, Factoring & The Quadratic Formula (ax² + bx + c = 0)',
    subtitle: 'Why squared terms appear everywhere in area, projectile motion, and bending beams',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 200,
    prereqIds: ['mate-102'],
    umCourseLink: 'Prep for UM Calculus 1, Physics Projectile Motion & Beam Deflection',
    overtimeDigest: [
      'A quadratic equation has an x² term because it models 2D area (length × width) or acceleration over time (s = ½at²).',
      'Expanding (x + a)(x + b) gives x² + (a+b)x + ab. Factoring is simply running that expansion in reverse: find two numbers that MULTIPLY to c and ADD to b!',
      'When a quadratic doesn’t factor into clean integers, the Quadratic Formula x = [−b ± √(b² − 4ac)] / (2a) solves EVERY quadratic in the universe.',
    ],
    history: {
      era: '1800 BC Babylon → 1591 France (François Viète)',
      protagonist: 'Babylonian Scribes & Al-Khwarizmi ("Completing the Square")',
      hook: 'Why was "Completing the Square" literally drawing a physical 2D square in the sand?',
      narrative: [
        'On clay tablet BM 13901 (c. 1800 BC), Babylonian scribes posed a puzzle: "I added the area of a square and 10 times its side, and got 39. What is the side length x?" In modern symbols: x² + 10x = 39.',
        'You cannot isolate x using Math 003 linear rules because x appears both squared (x²) and unsquared (10x). Al-Khwarizmi solved this geometrically by drawing an x × x square, splitting the 10x rectangle into two 5×x strips glued to two sides of the square, and noticing a 5 × 5 = 25 corner was missing!',
        'By adding +25 to both sides ("Completing the Square"), x² + 10x + 25 became a complete (x + 5) × (x + 5) square equal to 39 + 25 = 64. Taking the square root gave x + 5 = 8, so x = 3! Applying that exact geometric trick to ax² + bx + c = 0 derives the famous Quadratic Formula.',
      ],
      takeaway:
        'The discriminant Δ = b² − 4ac inside the square root tells you the physics of the system: Δ > 0 gives 2 real roots; Δ = 0 gives 1 repeated tangent root; Δ < 0 gives complex oscillation roots!',
    },
    csBridge: {
      concept: 'O(n²) Nested Loops, Root Finding & Discriminant Branching',
      analogy:
        'Expanding `(x + a)(x + b)` is a 2×2 nested loop multiplying every term in Group 1 by every term in Group 2 (`x*x + x*b + a*x + a*b`). And the Quadratic Formula is a deterministic root-finding algorithm with three branches based on `discriminant = b*b - 4*a*c`.',
      codeSnippet: `function solveQuadratic(a, b, c) {
  const disc = b * b - 4 * a * c; // Discriminant Δ = b² - 4ac
  if (disc < 0) return "Complex conjugate roots (Oscillatory system)";
  const root1 = (-b + Math.sqrt(disc)) / (2 * a);
  const root2 = (-b - Math.sqrt(disc)) / (2 * a);
  return [root1, root2];
}`,
    },
    visualLab: {
      type: 'quadratic_parabola_lab',
      title: '3B1B Interactive Parabola & Completing-the-Square Root Finder',
      instructions:
        'Adjust coefficients a, b, and c in y = ax² + bx + c. Watch the parabola shift, inspect the Discriminant (Δ = b² − 4ac), and see where the curve crosses zero!',
      missionPrompt:
        'Lab Mission: Explore the roots of y = x² − 5x + 6 = (x − 2)(x − 3) at x = 2 and x = 3.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Expanding Binomials (FOIL) & The Difference of Squares',
        formula: '(x + a)(x + b) = x^2 + (a+b)x + ab \\quad | \\quad (x - a)(x + a) = x^2 - a^2',
        explanation:
          'Notice the pattern in (x − a)(x + a): the middle terms −ax and +ax cancel to zero! So x² − 9 immediately factors into (x − 3)(x + 3).',
      },
      {
        title: '2. Factoring Monic Quadratics (x² + bx + c = 0) in 5 Seconds',
        formula: 'x^2 - 7x + 12 = 0 \\implies (-3)\\times(-4) = +12 \\text{ and } (-3)+(-4) = -7 \\implies (x - 3)(x - 4) = 0',
        explanation:
          'Since a product equals zero only when at least one factor is zero (Zero Product Property), (x − 3)(x − 4) = 0 immediately gives x = 3 or x = 4!',
      },
      {
        title: '3. The Universal Quadratic Formula',
        formula: 'ax^2 + bx + c = 0 \\implies x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        explanation:
          'Works on every quadratic equation without exception. Just substitute a, b, and c (including their signs!) and simplify the square root first.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm006-d1',
          question: 'Factor and solve for the roots of:   x² − 8x + 15 = 0',
          options: ['x = 3 and x = 5', 'x = −3 and x = −5', 'x = 1 and x = 15', 'x = −3 and x = 5'],
          correctIndex: 0,
          hint1: 'Find two numbers that multiply to +15 and add up to −8.',
          hint2: '(−3) × (−5) = +15 and (−3) + (−5) = −8, so (x − 3)(x − 5) = 0.',
          explanation: 'x² − 8x + 15 = (x − 3)(x − 5) = 0 → setting each factor to 0 gives x = 3 and x = 5.',
        },
        {
          id: 'm006-d2',
          question: 'Use the Difference of Squares identity (a² − b² = (a − b)(a + b)) to simplify:   (x² − 25) / (x + 5)',
          options: ['x − 5', 'x + 5', 'x − 25', 'x / 5'],
          correctIndex: 0,
          hint1: 'Rewrite x² − 25 as x² − 5² = (x − 5)(x + 5).',
          hint2: 'Now cancel the common factor (x + 5) from numerator and denominator!',
          explanation: '(x² − 25) / (x + 5) = [(x − 5)(x + 5)] / (x + 5) = x − 5. (You will use this exact trick to evaluate limits in Calculus 1!).',
        },
        {
          id: 'm006-d3',
          question: 'For the quadratic equation  2x² − 4x − 6 = 0,  what is the value of the discriminant Δ = b² − 4ac?',
          options: ['64', '−32', '16', '48'],
          correctIndex: 0,
          hint1: 'Identify a = 2, b = −4, and c = −6.',
          hint2: 'Δ = (−4)² − 4(2)(−6) = 16 − (−48).',
          explanation: 'Δ = (−4)² − 4(2)(−6) = 16 + 48 = 64 (and since √64 = 8, the roots are clean rational numbers!).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Bending Moment Zero-Stress Point on a Steel Beam',
        scenario:
          'In Mechanics of Deformable Bodies at UM, the internal bending moment M(x) (in kN·m) along a loaded overhang steel beam at distance x meters from the left support is given by the quadratic:  M(x) = x² − 6x + 8.  Points where M(x) = 0 are called "inflection/contraflexure points" (zero bending stress, ideal for placing welded joints!). At what two distances x along the beam does M(x) = 0?',
        options: [
          'x = 2 m and x = 4 m',
          'x = 1 m and x = 8 m',
          'x = −2 m and x = −4 m',
          'x = 3 m and x = 6 m',
        ],
        correctIndex: 0,
        hint: 'Solve x² − 6x + 8 = 0 by finding two numbers that multiply to +8 and add to −6!',
        explanation:
          '(−2) × (−4) = +8 and (−2) + (−4) = −6, so M(x) = (x − 2)(x − 4) = 0. The zero-bending-moment points occur at x = 2 meters and x = 4 meters!',
      },
    },
  },

  // ==========================================
  // MODULE 12: MATH 007 (SYSTEMS OF LINEAR EQUATIONS)
  // ==========================================
  {
    id: 'math-007',
    code: 'MATH 007',
    termId: 'term-3',
    week: 3,
    daySlot: 'Module 12',
    track: 'math',
    title: 'Systems of Linear Equations & Matrix Balance (2 Unknowns, 2 Equations)',
    subtitle: 'How elimination and substitution solve multi-component alloy blends and static trusses',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 205,
    prereqIds: ['math-006'],
    umCourseLink: 'Direct requirement for UM Statics of Rigid Bodies & Metallurgical Mass Balance',
    overtimeDigest: [
      'One equation with two unknowns (x + y = 10) has infinitely many solutions (a line). Adding a second independent equation (x − y = 4) locks in the unique intersection point (x = 7, y = 3) where both lines cross!',
      'Method 1 (Substitution): Isolate one variable in Equation 1 (x = 10 − y) and plug it into Equation 2.',
      'Method 2 (Elimination / Gaussian Row Reduction): Add or subtract the two equations directly so one variable cancels out to 0 immediately (e.g., (x + y) + (x − y) = 10 + 4 → 2x = 14 → x = 7)!',
    ],
    history: {
      era: '200 BC Han Dynasty China ("The Nine Chapters") → 1809 Carl Friedrich Gauss',
      protagonist: 'Han Dynasty Engineers & Carl Friedrich Gauss',
      hook: 'Did you know Chinese engineers used Matrix Row-Elimination 2,000 years before European mathematicians?',
      narrative: [
        'In Chapter 8 ("Fangcheng" / Rectangular Arrays) of the ancient Chinese text "The Nine Chapters on the Mathematical Art" (c. 200 BC), engineers arranged coefficients of 3-unknown grain problems into a grid of counting rods on a table and subtracted rows to eliminate unknowns—the exact method we now call Gaussian Elimination!',
        'In 1809, Carl Friedrich Gauss used this same systematic elimination to calculate the orbit of the asteroid Ceres from a handful of telescope observations.',
        'In Materials Engineering, whenever you blend two scrap alloys in an electric arc furnace to hit both a target total weight AND a target Nickel percentage, you are solving a 2×2 system of linear equations!',
      ],
      takeaway:
        'Look for opposites before doing hard work: if Equation 1 has +2y and Equation 2 has −2y, adding the two equations together kills y on Step 1!',
    },
    csBridge: {
      concept: 'Constraint Satisfaction & Gaussian Matrix Row Reduction',
      analogy:
        'Each linear equation is a hyperplane constraint reducing degrees of freedom by 1. With N independent constraints for N unknowns, the solution space collapses to a single point `[x, y]`.',
      codeSnippet: `// System:  (1) x + y = 100 kg (Total alloy mass)
//          (2) 0.20*x + 0.05*y = 14 kg (Target Chromium mass)
// Multiply Eq(1) by 0.05:  0.05*x + 0.05*y = 5
// Subtract from Eq(2):     0.15*x = 9  -->  x = 60 kg, y = 40 kg!`,
    },
    visualLab: {
      type: 'linear_system_intersection',
      title: '3B1B 2D Line Intersection & Elimination Visualizer',
      instructions:
        'Explore how two linear constraints intersect at a single (x, y) equilibrium point, and step through Elimination vs. Substitution.',
      missionPrompt:
        'Lab Mission: Inspect the intersection of x + y = 10 and x − y = 4 at (x = 7, y = 3).',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Elimination by Addition (The Fastest Engineering Method)',
        formula: '\\begin{cases} x + y = 10 \\\\ x - y = 4 \\end{cases} \\xrightarrow{\\text{Add Equations}} 2x = 14 \\implies x = 7, \\; y = 3',
        explanation:
          'When you add (+y) and (−y), they cancel to 0! You immediately get 2x = 14 → x = 7. Plugging x = 7 back into 7 + y = 10 gives y = 3.',
      },
      {
        title: '2. Scaling One Equation Before Eliminating',
        formula: '\\begin{cases} 3x + 2y = 19 \\\\ x - y = 3 \\end{cases} \\xrightarrow{\\text{Multiply Eq 2 by } 2} \\begin{cases} 3x + 2y = 19 \\\\ 2x - 2y = 6 \\end{cases} \\implies 5x = 25 \\implies x = 5',
        explanation:
          'If the coefficients don’t cancel right away, multiply one equation by a constant so the y-coefficients become opposites (+2y and −2y), then add!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm007-d1',
          question: 'Solve the system by adding the two equations directly:   2x + y = 15   and   x − y = 3',
          options: ['x = 6,  y = 3', 'x = 5,  y = 5', 'x = 9,  y = 6', 'x = 4,  y = 7'],
          correctIndex: 0,
          hint1: 'Add the left sides: (2x + y) + (x − y) = 3x. Add the right sides: 15 + 3 = 18.',
          hint2: '3x = 18 → x = 6. Now plug x = 6 into 6 − y = 3!',
          explanation: 'Adding kills y: 3x = 18 → x = 6. Since 6 − y = 3, y = 3.',
        },
        {
          id: 'm007-d2',
          question: 'At static equilibrium, two cables support a load such that:   F₁ + F₂ = 50 N   and   2F₁ − F₂ = 40 N.   Find F₁ and F₂.',
          options: ['F₁ = 30 N,  F₂ = 20 N', 'F₁ = 25 N,  F₂ = 25 N', 'F₁ = 40 N,  F₂ = 10 N', 'F₁ = 20 N,  F₂ = 30 N'],
          correctIndex: 0,
          hint1: 'Add the two equations so +F₂ and −F₂ cancel out!',
          hint2: '3F₁ = 90 N → F₁ = 30 N. Then 30 + F₂ = 50 → F₂ = 20 N.',
          explanation: 'Adding gives 3F₁ = 90 → F₁ = 30 N, and F₂ = 50 − 30 = 20 N.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Charge Calculation for a Stainless Steel Melt',
        scenario:
          'You are melting two scrap feeds (Feed X and Feed Y) in an induction furnace to make 100 kg of alloy:  x + y = 100.  Feed X contains 30% Nickel and Feed Y contains 10% Nickel, and the final 100 kg batch must contain 18 kg of Nickel:  0.30x + 0.10y = 18  (or multiplying by 10:  3x + y = 180). How many kg of Feed X (x) and Feed Y (y) should you load?',
        options: [
          'x = 40 kg of Feed X,  y = 60 kg of Feed Y',
          'x = 50 kg of Feed X,  y = 50 kg of Feed Y',
          'x = 60 kg of Feed X,  y = 40 kg of Feed Y',
          'x = 30 kg of Feed X,  y = 70 kg of Feed Y',
        ],
        correctIndex: 0,
        hint: 'Subtract (x + y = 100) from (3x + y = 180) so y cancels right out!',
        explanation:
          '(3x + y) − (x + y) = 180 − 100 → 2x = 80 → x = 40 kg! And y = 100 − 40 = 60 kg.',
      },
    },
  },

  // ==========================================
  // MODULE 13: MATH 008 (EXPONENTIALS, LOGARITHMS & ARRHENIUS)
  // ==========================================
  {
    id: 'math-008',
    code: 'MATH 008',
    termId: 'term-3',
    week: 3,
    daySlot: 'Module 13',
    track: 'math',
    title: 'Euler’s Number (e), Logarithms (ln x) & The Arrhenius Rate Law',
    subtitle: 'Why logarithms are just "asking for the exponent" and how they linearize thermal activation',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 210,
    prereqIds: ['math-007'],
    umCourseLink: 'Direct prep for UM Kinetics of Materials, pH Chemistry & Calculus',
    overtimeDigest: [
      'A Logarithm is NOT a scary new creature—it is simply the inverse question of an exponent! Since 10³ = 1,000, log₁₀(1,000) = 3 ("What power of 10 gives 1,000? Answer: 3").',
      'Euler’s number e ≈ 2.71828 is the universal base of continuous 100% growth, and ln(x) = logₑ(x) is the Natural Logarithm: ln(eˣ) = x!',
      'Logarithms turn Multiplication into Addition: ln(A · B) = ln(A) + ln(B), and bring exponents down to the ground: ln(xᵏ) = k · ln(x).',
    ],
    history: {
      era: '1614 Scotland (John Napier) & 1889 Stockholm (Svante Arrhenius)',
      protagonist: 'John Napier, Leonhard Euler & Svante Arrhenius',
      hook: 'Why did Johannes Kepler say John Napier’s invention of Logarithms "doubled the lifespan of astronomers"?',
      narrative: [
        'Before calculators, multiplying two 8-digit numbers by hand took minutes and was plagued by errors. In 1614, Scottish scholar John Napier spent 20 years constructing the first Logarithm tables. Because log(A × B) = log(A) + log(B), astronomers could look up two logs, ADD them in 5 seconds, and look up the result!',
        'In the 1700s, Leonhard Euler discovered the natural base e ≈ 2.718, where the rate of growth of eˣ at any point is literally equal to eˣ itself.',
        'Then in 1889, Svante Arrhenius showed that almost every thermally activated process in Materials Science—diffusion of carbon into steel, creep of jet turbine blades, polymer curing, and semiconductor conductivity—obeys the exponential law Rate = A · e^(−Q / RT). Taking the natural log (ln) turns that curve into a straight line!',
      ],
      takeaway:
        'Whenever an unknown variable is trapped up in an exponent (like e^(kt) = 5), apply ln() to both sides to bring the exponent down to earth: kt = ln(5)!',
    },
    csBridge: {
      concept: '`Math.log()` (Natural Log), Binary Search `O(log n)` & Bit Length',
      analogy:
        'In CS, `log₂(N)` asks "How many times can I halve N before hitting 1?" (`log₂(1024) = 10`). In Chemistry and Materials Engineering, `log₁₀` compresses 14 orders of acid concentration into the pH scale (`pH = -log₁₀[H⁺]`), and `ln(x)` unwraps exponential `e^x` laws!',
      codeSnippet: `// Unwrapping an Arrhenius exponential:  D = D0 * e^(-Q / (R * T))
// Take Math.log (natural log ln) of both sides:
// ln(D) = ln(D0) - (Q / R) * (1 / T)
// Notice that plotting y = ln(D) vs x = (1/T) gives a straight line y = b + m*x!`,
    },
    visualLab: {
      type: 'arrhenius_log_linearizer',
      title: '3B1B Exponential vs. Logarithmic Linearizer (Arrhenius Plot)',
      instructions:
        'Compare the curved exponential rate eˣ with its linearized natural-log plot ln(y) = x.',
      missionPrompt:
        'Lab Mission: Inspect how taking the logarithm turns exponential growth into a straight line.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Translating Between Exponential and Logarithmic Form',
        formula: 'b^y = x \\iff \\log_b(x) = y \\quad \\text{Examples: } 10^4 = 10,000 \\iff \\log_{10}(10,000) = 4',
        explanation:
          'Read log_b(x) out loud as: "What power do I raise base b to in order to get x?" Special cases: log_b(1) = 0 (since b⁰ = 1) and log_b(b) = 1 (since b¹ = b).',
      },
      {
        title: '2. The Three Log Laws That Simplify Complex Equations',
        formula: '\\ln(A \\cdot B) = \\ln A + \\ln B \\quad | \\quad \\ln\\left(\\frac{A}{B}\\right) = \\ln A - \\ln B \\quad | \\quad \\ln(A^k) = k\\,\\ln A',
        explanation:
          'The third rule—ln(Aᵏ) = k·ln(A)—is your superpower for solving for variables trapped in exponents! Since ln(e) = 1, ln(eˣ) = x · ln(e) = x.',
      },
      {
        title: '3. Linearizing the Arrhenius Equation in Materials Engineering',
        formula: 'D = D_0 e^{-Q / RT} \\xrightarrow{\\ln\\text{ both sides}} \\ln D = \\ln D_0 - \\left(\\frac{Q}{R}\\right)\\frac{1}{T}',
        explanation:
          'Compare that with y = b + m·x from Math 005! If you plot y = ln(D) against x = 1/T, you get a straight line whose slope is m = −Q/R (giving you the Activation Energy Q!).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm008-d1',
          question: 'Evaluate without a calculator:   log₁₀(1,000) + log₂(8) − ln(e⁴)',
          options: ['2', '6', '10', '0'],
          correctIndex: 0,
          hint1: '10³ = 1,000 so log₁₀(1,000) = 3. And 2³ = 8 so log₂(8) = 3.',
          hint2: 'ln(e⁴) = 4. Now compute 3 + 3 − 4!',
          explanation: 'log₁₀(10³) = 3, log₂(2³) = 3, and ln(e⁴) = 4. Total: 3 + 3 − 4 = 2.',
        },
        {
          id: 'm008-d2',
          question: 'Solve for t in the radioactive/thermal decay equation:   e^(0.5t) = 20',
          options: ['t = 2 · ln(20)', 't = 20 / 0.5', 't = ln(10)', 't = e¹⁰'],
          correctIndex: 0,
          hint1: 'Take the natural log (ln) of both sides to cancel the base e: ln(e^(0.5t)) = ln(20).',
          hint2: 'That gives 0.5t = ln(20). Now divide by 0.5 (which is multiplying by 2)!',
          explanation: 'ln(e^(0.5t)) = ln(20) → 0.5t = ln(20) → t = ln(20) / 0.5 = 2 · ln(20).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Acid Etching pH & Hydrogen Ion Concentration',
        scenario:
          'In the UM Metallography Lab, you use an acid etchant to reveal steel grain boundaries under a microscope. The pH of an acid is defined as  pH = −log₁₀([H⁺]),  where [H⁺] is the Hydrogen ion concentration in moles/liter (M). If solution A has pH = 2 (so [H⁺] = 10⁻² M) and solution B has pH = 5 (so [H⁺] = 10⁻⁵ M), how many times more concentrated in H⁺ ions is Solution A compared to Solution B?',
        options: [
          '1,000 times more concentrated (10³×)',
          '3 times more concentrated',
          '30 times more concentrated',
          '0.001 times as concentrated',
        ],
        correctIndex: 0,
        hint: 'Divide the concentrations using Math 004 exponent rules: 10⁻² ÷ 10⁻⁵ = 10^(−2 − (−5)) = 10³!',
        explanation:
          'Because pH is a base-10 logarithmic scale, every 1-unit drop in pH means a 10× increase in H⁺ acidity! A 3-unit difference (pH 2 vs pH 5) is 10^(5−2) = 10³ = 1,000 times more acidic!',
      },
    },
  },

  // ==========================================
  // MODULE 14: CHEM 101 (THERMODYNAMICS: ENTHALPY, ENTROPY & GIBBS FREE ENERGY)
  // ==========================================
  {
    id: 'chem-101',
    code: 'CHEM 101',
    termId: 'term-3',
    week: 4,
    daySlot: 'Module 14',
    track: 'chem',
    title: 'Thermodynamics of Materials: Enthalpy (ΔH), Entropy (ΔS) & Gibbs Free Energy (ΔG)',
    subtitle: 'Why metals rust spontaneously, how blast furnaces reverse rusting at high temperature, and the 2nd Law',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 220,
    prereqIds: ['math-008'],
    umCourseLink: 'Core of UM 2nd-Year "Thermodynamics & Kinetics of Materials"',
    overtimeDigest: [
      'Enthalpy change (ΔH) measures heat flow: ΔH < 0 is Exothermic (releases heat, forms stronger bonds); ΔH > 0 is Endothermic (absorbs heat).',
      'Entropy change (ΔS) measures disorder / number of microstates (Boltzmann’s S = k·ln W): gases have much higher entropy than liquids, which have higher entropy than crystals.',
      'Gibbs Free Energy (ΔG = ΔH − T·ΔS) is the ultimate judge of whether a process happens on its own: if ΔG < 0, the reaction is SPONTANEOUS!',
    ],
    history: {
      era: '1876 Yale University (J. Willard Gibbs) & 1877 Vienna (Ludwig Boltzmann)',
      protagonist: 'Josiah Willard Gibbs & Ludwig Boltzmann',
      hook: 'Why did Albert Einstein call Josiah Willard Gibbs "the greatest mind in American history"?',
      narrative: [
        'In the 1800s, chemists thought only exothermic reactions (those that release heat, ΔH < 0) could happen on their own. Yet ice melts spontaneously above 0 °C even though melting ABSORBS heat (ΔH > 0)! Why?',
        'Ludwig Boltzmann discovered that nature also loves probability: there are trillions more ways to arrange roaming liquid or gas molecules than locked crystal atoms. He engraved his formula S = k · ln(W) on his tombstone in Vienna.',
        'In 1876, Yale professor J. Willard Gibbs united Energy (ΔH) and Entropy (ΔS) at absolute temperature T (in Kelvin!) into one master equation: ΔG = ΔH − TΔS. That equation is the entire foundation of Metallurgical Thermodynamics and Ellingham Diagrams at UM!',
      ],
      takeaway:
        'Look at ΔG = ΔH − TΔS: at low temperature T, ΔH dominates (atoms lock into low-energy crystals). At high temperature T, the −TΔS term dominates (crystals melt or vaporize into high-entropy disorder)!',
    },
    csBridge: {
      concept: 'Objective Cost Function `Loss = Energy - T * ShannonEntropy` (Simulated Annealing!)',
      analogy:
        'As a CS grad, you know **Simulated Annealing**! That algorithm was literally copied from Metallurgy! Nature minimizes Free Energy `G = H - T*S`. At high temperature `T`, random high-entropy states (`S`) are explored; as you slowly cool `T -> 0` (annealing), the system settles into the global minimum energy crystal (`H`)!',
      codeSnippet: `function isReactionSpontaneous(deltaH_J, deltaS_J_per_K, tempKelvin) {
  const deltaG = deltaH_J - tempKelvin * deltaS_J_per_K;
  if (deltaG < 0) return { deltaG, status: "SPONTANEOUS (Proceeds forward on its own)" };
  if (deltaG > 0) return { deltaG, status: "NON-SPONTANEOUS (Requires external work/heat)" };
  return { deltaG: 0, status: "PHASE EQUILIBRIUM (e.g. Melting point T_m = ΔH / ΔS!)" };
}`,
    },
    visualLab: {
      type: 'gibbs_free_energy_lab',
      title: '3B1B Gibbs Free Energy & Phase Transition Simulator (ΔG = ΔH − TΔS)',
      instructions:
        'Adjust Temperature T (in Kelvin) to see when −TΔS overcomes ΔH and flips ΔG from positive to negative!',
      missionPrompt:
        'Lab Mission: Slide Temperature T across the melting point T_m = ΔH / ΔS where ΔG crosses zero.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Always Convert Celsius to Absolute Kelvin (K) in Thermodynamics!',
        formula: 'T(\\text{K}) = T(^\\circ\\text{C}) + 273.15 \\quad (\\text{e.g., } 27\\,^\\circ\\text{C} + 273 = 300\\text{ K})',
        explanation:
          'Why Kelvin? Because Celsius has arbitrary negative numbers and zero at water’s freezing point, which would corrupt T·ΔS! 0 K (−273.15 °C) is Absolute Zero, where thermal motion ceases.',
      },
      {
        title: '2. The Gibbs Free Energy Master Equation',
        formula: '\\Delta G = \\Delta H - T\\Delta S \\quad \\begin{cases} \\Delta G < 0 & \\text{Spontaneous} \\\\ \\Delta G = 0 & \\text{Equilibrium} \\\\ \\Delta G > 0 & \\text{Non-spontaneous} \\end{cases}',
        explanation:
          'Watch your units (from Chem 002!): ΔH is usually given in kJ/mol, while ΔS is given in J/(mol·K). Divide ΔS by 1,000 to convert J to kJ before subtracting!',
      },
      {
        title: '3. Calculating Exact Melting Temperature from ΔG = 0',
        formula: '\\text{At melting equilibrium: } \\Delta G = \\Delta H_{\\text{fus}} - T_m \\Delta S_{\\text{fus}} = 0 \\implies T_m = \\frac{\\Delta H_{\\text{fus}}}{\\Delta S_{\\text{fus}}}',
        explanation:
          'At the exact melting temperature T_m, solid and liquid coexist in equilibrium (ΔG = 0). Adding heat increases entropy just enough to balance enthalpy!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'c101-d1',
          question: 'For a chemical reaction at T = 300 K, the enthalpy change is ΔH = −120 kJ/mol (exothermic) and the entropy term T·ΔS = +30 kJ/mol. What is ΔG = ΔH − TΔS, and is the reaction spontaneous?',
          options: [
            'ΔG = −150 kJ/mol;  Spontaneous (since ΔG < 0)',
            'ΔG = −90 kJ/mol;   Non-spontaneous',
            'ΔG = +150 kJ/mol;  Non-spontaneous',
            'ΔG = 0 kJ/mol;     At equilibrium',
          ],
          correctIndex: 0,
          hint1: 'Plug into ΔG = ΔH − (TΔS) = −120 − 30.',
          hint2: '−120 − 30 = −150 kJ/mol. Negative ΔG is always spontaneous!',
          explanation: 'ΔG = −120 − 30 = −150 kJ/mol. Because ΔG < 0, the reaction is strongly spontaneous at all temperatures.',
        },
        {
          id: 'c101-d2',
          question: 'Pure Aluminum has an enthalpy of fusion (melting) ΔH_fus = 10,700 J/mol and an entropy of fusion ΔS_fus = 11.47 J/(mol·K). At what absolute temperature T_m (in Kelvin) does Aluminum melt (where ΔG = 0)?',
          options: ['933 K (660 °C)', '1,227 K', '500 K', '273 K'],
          correctIndex: 0,
          hint1: 'Set ΔG = ΔH_fus − T_m · ΔS_fus = 0 and solve for T_m!',
          hint2: 'T_m = ΔH_fus / ΔS_fus = 10,700 ÷ 11.47.',
          explanation: 'At melting equilibrium ΔG = 0 → T_m = 10,700 / 11.47 ≈ 933 K (which is 933 − 273 = 660 °C, Aluminum’s exact melting point!).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Smelting Ore Above the Crossover Temperature',
        scenario:
          'Extracting a metal from its oxide ore is endothermic: ΔH = +180 kJ/mol, with a positive entropy gain ΔS = +0.15 kJ/(mol·K) because gas is generated. At room temperature (300 K), ΔG > 0 so the reaction won’t happen. Above what minimum furnace temperature T (in Kelvin) does ΔG = ΔH − T·ΔS become negative (spontaneous)?',
        options: [
          'Above T = 1,200 K (927 °C)',
          'Above T = 600 K',
          'Above T = 270 K',
          'Above T = 1,800 K',
        ],
        correctIndex: 0,
        hint: 'Find the crossover temperature where ΔG = 0:  180 − T × 0.15 = 0  →  T = 180 ÷ 0.15!',
        explanation:
          'Setting ΔG = 180 − 0.15·T = 0 gives T = 180 / 0.15 = 1,200 K! Above 1,200 K, the −TΔS term is more negative than −180 kJ/mol, making ΔG < 0 so the ore reduces spontaneously!',
      },
    },
  },

  // ==========================================
  // MODULE 15: MATH 101 (DIFFERENTIAL CALCULUS)
  // ==========================================
  {
    id: 'math-101',
    code: 'MATH 101',
    termId: 'term-4',
    week: 4,
    daySlot: 'Module 15',
    track: 'math',
    title: 'Differential Calculus: Limits & Derivatives (dy/dx) From Scratch',
    subtitle: 'Why Calculus is just zooming in on a curve until it looks like a straight line from Math 005',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 230,
    prereqIds: ['chem-101'],
    umCourseLink: 'Core of UM CEE "Calculus 1 (Differential Calculus)"',
    overtimeDigest: [
      'In Math 005, slope was Rise / Run = (y₂ − y₁) / (x₂ − x₁) between two points. What if the graph is curved? Zoom in until the two points are an infinitesimal distance dx apart—that instantaneous slope is the DERIVATIVE (dy/dx)!',
      'The Power Rule is 80% of Calculus 1: the derivative of xⁿ is simply n · x^(n − 1) (bring the exponent down in front, and subtract 1 from the exponent!).',
      'Where a smooth curve hits a peak (maximum) or valley (minimum—like the bottom of the atomic energy well in MATE 100!), its tangent slope is flat: dy/dx = 0!',
    ],
    history: {
      era: '1666 Woolsthorpe (Isaac Newton) & 1675 Paris (Gottfried Wilhelm Leibniz)',
      protagonist: 'Isaac Newton & Gottfried Wilhelm Leibniz',
      hook: 'How did Newton and Leibniz solve the 2,000-year-old paradox of "instantaneous speed" at a single frozen instant of time?',
      narrative: [
        'For millennia, Zeno’s Arrow Paradox baffled philosophers: if you take a photograph of a flying arrow at a single instant (Δt = 0), the arrow moves zero distance (Δx = 0). How can speed = 0 / 0 have a real value?',
        'During the 1665–1666 plague lockdown, 23-year-old Isaac Newton—and independently Gottfried Leibniz in Paris—realized you don’t divide 0 by 0. Instead, you compute the average slope Δy / Δx over a tiny interval h, simplify the algebra first (canceling h!), and only THEN let h approach 0 (the Limit)!',
        'Leibniz gave us the brilliant notation dy/dx, reminding us that a derivative is literally a fraction of tiny changes: (tiny change in y) ÷ (tiny change in x).',
      ],
      takeaway:
        'Because you already mastered negative & fractional exponents in Math 004 and slopes in Math 005, the Power Rule d/dx(xⁿ) = n·xⁿ⁻¹ will feel effortless!',
    },
    csBridge: {
      concept: 'Finite Differences `(f(x + h) - f(x)) / h` & Gradient Optimization (`df/dx === 0`)',
      analogy:
        'In numerical computing and neural network backpropagation, the derivative `df/dx` is the local sensitivity multiplier: if you nudge input `x` by `dx`, output `y` changes by `df/dx * dx`. And finding a maximum/minimum by solving `df/dx = 0` is exact analytical optimization!',
      codeSnippet: `// Analytical Power Rule vs. Numerical Derivative:
// Function: f(x) = 3*x^2 - 12*x + 5
// Analytical Derivative via Power Rule: f'(x) = 2*3*x^(2-1) - 12*1*x^0 + 0 = 6x - 12
// Where is the minimum of the parabola? Set f'(x) = 6x - 12 = 0  -->  x = 2!`,
    },
    visualLab: {
      type: 'derivative_tangent_lab',
      title: '3B1B Secant-to-Tangent Zoom & Power Rule Explorer',
      instructions:
        'Slide x along the curve y = f(x) to watch the tangent line slope dy/dx change from negative (downhill) to zero (bottom of the valley!) to positive (uphill).',
      missionPrompt:
        'Lab Mission: Locate the exact minimum point where the tangent line becomes horizontal (dy/dx = 0).',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. The Power Rule (Your Main Calculus Workhorse)',
        formula: '\\frac{d}{dx}\\left(x^n\\right) = n \\cdot x^{n-1} \\quad \\text{and} \\quad \\frac{d}{dx}(\\text{Constant}) = 0',
        explanation:
          'Why is the derivative of a constant (like +7) equal to 0? Because a constant never changes—its graph is a flat horizontal line with slope 0! For x³, bring the 3 down in front and reduce the power by 1: 3x².',
      },
      {
        title: '2. Differentiating Polynomials Term-by-Term',
        formula: 'y = 4x^3 - 5x^2 + 6x - 9 \\implies \\frac{dy}{dx} = 4(3x^2) - 5(2x^1) + 6(1) - 0 = 12x^2 - 10x + 6',
        explanation:
          'Constant multipliers stay out front while you apply the Power Rule to each term independently.',
      },
      {
        title: '3. Finding Maxima & Minima (Setting dy/dx = 0)',
        formula: '\\text{At a peak or valley of } y(x), \\text{ the tangent line is flat: } \\frac{dy}{dx} = 0',
        explanation:
          'In Materials Engineering, the equilibrium bond spacing r₀ in MATE 100 is found by taking the derivative of potential energy E(r) and setting Force F = −dE/dr = 0!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm101-d1',
          question: 'Use the Power Rule to find the derivative dy/dx of:   y = 5x⁴ − 3x² + 11x − 8',
          options: [
            'dy/dx = 20x³ − 6x + 11',
            'dy/dx = 5x³ − 3x + 11',
            'dy/dx = 20x⁴ − 6x² + 11x',
            'dy/dx = x⁵ − x³ + 11',
          ],
          correctIndex: 0,
          hint1: 'Multiply each coefficient by its exponent, then subtract 1 from the exponent: 5(4)x^(4−1) − 3(2)x^(2−1) + 11(1)x⁰ − 0.',
          hint2: 'Remember the derivative of the constant −8 is 0!',
          explanation: 'd/dx(5x⁴) = 20x³, d/dx(−3x²) = −6x, d/dx(11x) = 11, and d/dx(−8) = 0 → 20x³ − 6x + 11.',
        },
        {
          id: 'm101-d2',
          question: 'Combine Math 004 (Fractional Exponents) with the Power Rule! What is the derivative of  y = 6√x  (which is 6 · x^(1/2))?',
          options: [
            '3 · x^(−1/2)   (or  3 / √x)',
            '6 · x^(3/2)',
            '3 · x^(1/2)',
            '12 / √x',
          ],
          correctIndex: 0,
          hint1: 'Bring the exponent 1/2 down in front: 6 × (1/2) = 3.',
          hint2: 'Subtract 1 from the exponent: (1/2) − 1 = −1/2. So 3·x^(−1/2) = 3/√x!',
          explanation: 'd/dx(6x^(1/2)) = 6 · (1/2) · x^(1/2 − 1) = 3x^(−1/2) = 3 / √x.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Instantaneous Cooling Rate During Steel Quenching',
        scenario:
          'During a Jominy end-quench hardenability test in the UM Metallurgy Lab, the temperature T (in °C) of a steel bar over the first 10 seconds is modeled by  T(t) = 800 − 15t²  (where t is time in seconds). The instantaneous cooling rate is the derivative dT/dt. What is the instantaneous cooling rate dT/dt at exactly t = 4 seconds?',
        options: [
          '−120 °C/s (cooling at 120 °C per second)',
          '−30 °C/s',
          '560 °C/s',
          '−60 °C/s',
        ],
        correctIndex: 0,
        hint: 'First differentiate T(t) = 800 − 15t² with respect to t: dT/dt = 0 − 15(2t) = −30t. Then plug in t = 4!',
        explanation:
          'Derivative: dT/dt = d/dt(800) − d/dt(15t²) = 0 − 30t = −30t. Evaluating at t = 4 s gives dT/dt = −30(4) = −120 °C/s!',
      },
    },
  },

  // ==========================================
  // MODULE 16: MATH 102 (INTEGRAL CALCULUS)
  // ==========================================
  {
    id: 'math-102',
    code: 'MATH 102',
    termId: 'term-4',
    week: 4,
    daySlot: 'Module 16',
    track: 'math',
    title: 'Integral Calculus: Accumulation & Area Under the Curve (∫ f(x) dx)',
    subtitle: 'Why Integration is just the Power Rule in reverse—and how it measures Material Toughness',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 240,
    prereqIds: ['math-101'],
    umCourseLink: 'Core of UM CEE "Calculus 2 (Integral Calculus)" & Fracture Toughness',
    overtimeDigest: [
      'Integration is the exact inverse of Differentiation (the Fundamental Theorem of Calculus): if the derivative is the rate of change, the integral is the TOTAL ACCUMULATED CHANGE (the area under the rate curve)!',
      'Reverse Power Rule (Antiderivative): to integrate xⁿ, ADD 1 to the exponent and DIVIDE by the new exponent: ∫ xⁿ dx = x^(n+1) / (n + 1) + C.',
      'In Materials Engineering, the total energy a material absorbs per unit volume before fracturing (its TOUGHNESS) is literally the integral (area under the curve) of the Stress-Strain diagram: U_T = ∫ σ dε!',
    ],
    history: {
      era: '1687 Cambridge & Hanover (Newton & Leibniz — The Fundamental Theorem)',
      protagonist: 'Archimedes, Isaac Barrow, Newton & Leibniz',
      hook: 'Why did Leibniz choose an elongated "S" (∫) for the integral symbol?',
      narrative: [
        'Archimedes knew how to find the area under a parabola by slicing it into infinitely many thin rectangles and summing them up—an exhausting geometric tour de force that took pages of work for every single shape.',
        'Leibniz wrote an elongated letter "S" (∫, standing for "Summa" = Sum) and wrote ∫ y dx to mean: "Sum up infinitely many ultra-thin rectangles of height y and width dx."',
        'Then came the miracle—the Fundamental Theorem of Calculus: finding the area under a curve f(x) from x = a to x = b is the exact same thing as running the derivative in reverse (finding the antiderivative F(x)) and computing F(b) − F(a)! What took Archimedes a month now takes you 10 seconds.',
      ],
      takeaway:
        'Differentiation = Divide & Subtract 1 from exponent (n·xⁿ⁻¹). Integration = Add 1 to exponent & Divide by new exponent (xⁿ⁺¹ / (n+1))!',
    },
    csBridge: {
      concept: 'Array `.reduce()` Accumulator Loop & Prefix Sums',
      analogy:
        'A definite integral `∫_a^b f(x) dx` is a continuous `for` loop accumulating `sum += f(x) * dx` as step size `dx -> 0`. The Fundamental Theorem of Calculus says if `f(x)` is the delta array `F[i] - F[i-1]`, then the sum of all deltas from `a` to `b` telescopes to `F(b) - F(a)`!',
      codeSnippet: `// Definite Integral via Fundamental Theorem of Calculus:
// Compute ∫ from x=0 to x=3 of (3*x^2) dx
// Step 1: Antiderivative of 3*x^2 is 3 * (x^3 / 3) = x^3
// Step 2: Evaluate F(3) - F(0) = 3^3 - 0^3 = 27!`,
    },
    visualLab: {
      type: 'integral_area_toughness_lab',
      title: '3B1B Riemann Sum & Stress-Strain Toughness Area Integrator',
      instructions:
        'Adjust the upper strain limit ε_f to watch the accumulated area under the curve ∫ σ dε (Material Toughness / Modulus of Resilience) fill in!',
      missionPrompt:
        'Lab Mission: Integrate the area under the curve to compute stored elastic strain energy.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. The Reverse Power Rule (Indefinite Integral)',
        formula: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1) \\quad \\text{and} \\quad \\int \\frac{1}{x}\\,dx = \\ln|x| + C',
        explanation:
          'Always check your integral by taking its derivative! The derivative of x³ / 3 is 3x² / 3 = x².',
      },
      {
        title: '2. Definite Integrals (Evaluating Area from x = a to x = b)',
        formula: '\\int_{a}^{b} f(x)\\,dx = \\Big[ F(x) \\Big]_{a}^{b} = F(b) - F(a)',
        explanation:
          'Find the antiderivative F(x), plug in the top limit b, plug in the bottom limit a, and subtract: Top minus Bottom!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm102-d1',
          question: 'Use the Reverse Power Rule to evaluate the definite integral:   ∫₀² (3x² + 4x) dx',
          options: ['16', '12', '8', '24'],
          correctIndex: 0,
          hint1: 'Antiderivative of 3x² is 3(x³/3) = x³. Antiderivative of 4x is 4(x²/2) = 2x².',
          hint2: 'Now evaluate F(x) = x³ + 2x² at x = 2 minus x = 0: (2³ + 2(2²)) − 0.',
          explanation: '[x³ + 2x²]₀² = (8 + 8) − (0 + 0) = 16.',
        },
        {
          id: 'm102-d2',
          question: 'What is the indefinite integral  ∫ (6x + 5) dx ?',
          options: ['3x² + 5x + C', '6 + C', '6x² + 5x + C', '3x² + C'],
          correctIndex: 0,
          hint1: 'For 6x¹, add 1 to exponent (x²) and divide by 2: 6x²/2 = 3x².',
          hint2: 'For a constant 5 (= 5x⁰), its integral is 5x!',
          explanation: '∫(6x + 5)dx = 3x² + 5x + C (check: derivative of 3x² + 5x + C is 6x + 5!).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Modulus of Resilience (Elastic Strain Energy)',
        scenario:
          'When a structural steel bolt is stretched in its linear elastic region from strain ε = 0 to yield strain ε_y = 0.002, the stress follows Hooke’s Law:  σ(ε) = E · ε,  with Young’s Modulus E = 200,000 MPa. The elastic energy stored per unit volume (Modulus of Resilience U_r) is the integral:  U_r = ∫₀^(0.002) (200,000 · ε) dε.  Evaluate this integral!',
        options: [
          '0.4 MPa (or 0.4 MJ/m³)',
          '400 MPa',
          '0.8 MPa',
          '200 MPa',
        ],
        correctIndex: 0,
        hint: 'The antiderivative of 200,000·ε is 200,000 · (ε² / 2) = 100,000 · ε²! Now plug in ε = 0.002 (note: 0.002² = 0.000004).',
        explanation:
          '∫₀^(0.002) 200,000ε dε = [100,000 · ε²]₀^(0.002) = 100,000 × (0.000004) = 0.4 MPa (0.4 MJ/m³)! Notice visually this is also the area of a right triangle: ½ × base (0.002) × height (400 MPa) = 0.4!',
      },
    },
  },

  // ==========================================
  // MODULE 17: PHYS 101 (STRESS, STRAIN & MECHANICS OF MATERIALS)
  // ==========================================
  {
    id: 'phys-101',
    code: 'PHYS 101',
    termId: 'term-4',
    week: 5,
    daySlot: 'Module 17',
    track: 'mate',
    title: 'Mechanics of Deformable Bodies: Stress (σ), Strain (ε) & Tensile Curves',
    subtitle: 'Why engineers normalize Force by Area and Elongation by Length—and how to read a full Tensile Test',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 250,
    prereqIds: ['math-102'],
    umCourseLink: 'Direct UM BSMTE Course: "Mechanics of Deformable Bodies" & Mechanical Testing Lab',
    overtimeDigest: [
      'Force (F) alone cannot tell you if a cable will snap—a 10-mm steel cable holds 100× more force than a 1-mm wire of the exact same steel! Dividing Force by Area gives Engineering Stress (σ = F / A₀), an intrinsic material property.',
      'Similarly, dividing stretch ΔL by original length L₀ gives Engineering Strain (ε = ΔL / L₀, unitless or %).',
      'Every tensile curve has 4 landmarks: (1) Elastic Slope E (σ = Eε), (2) Yield Strength σ_y (onset of permanent plastic slip), (3) Ultimate Tensile Strength σ_UTS (peak load before necking), and (4) Fracture Strain ε_f (% Ductility)!',
    ],
    history: {
      era: '1678 London (Robert Hooke) → 1807 (Thomas Young) → 1822 Paris (Augustin-Louis Cauchy)',
      protagonist: 'Robert Hooke, Thomas Young & Augustin-Louis Cauchy',
      hook: 'Why did Robert Hooke publish his famous law of elasticity as a secret Latin anagram "ceiiinosssttuv"?',
      narrative: [
        'In 1676, Robert Hooke discovered how springs and watch balances deform under load, but to establish priority without giving away his patent secret to rival Christiaan Huygens, he published the anagram "ceiiinosssttuv." Two years later he revealed the solution: "Ut tensio, sic vis" ("As the extension, so is the force": F = kx).',
        'In 1807, Thomas Young realized the spring constant k mixed geometry with material identity, so he normalized it into Young’s Modulus E. Then in 1822, the great French engineer-mathematician Augustin-Louis Cauchy defined the Stress Tensor (σ = F/A), giving modern civil, mechanical, and materials engineers the universal language of structural safety.',
      ],
      takeaway:
        'Elastic deformation is temporary (atoms stretch inside their energy well from MATE 100 and snap right back when unloaded). Plastic deformation is permanent (planes of atoms slip past each other and stay permanently shifted)!',
    },
    csBridge: {
      concept: 'Normalized Metrics (Throughput per Core vs. Raw Requests) & State Machine Transitions',
      analogy:
        'Stress `σ = F / A₀` and Strain `ε = ΔL / L₀` normalize out hardware dimensions so you can benchmark pure material performance. A tensile test transitions through states: `ELASTIC (reversible) -> YIELD -> STRAIN_HARDENING -> NECKING (UTS peak) -> FRACTURE`.',
      codeSnippet: `function analyzeTensileTest(forceN, areaMm2, deltaLMm, origLMm, yieldMPa) {
  const stressMPa = forceN / areaMm2; // Remember Chem 002: 1 N/mm² === 1 MPa!
  const strain    = deltaLMm / origLMm;
  const regime    = stressMPa < yieldMPa ? "ELASTIC (Reversible)" : "PLASTIC (Permanent deformation)";
  return { stressMPa, strainPercent: strain * 100, regime };
}`,
    },
    visualLab: {
      type: 'stress_strain_curve_lab',
      title: '3B1B Interactive Universal Testing Machine (UTM) Stress-Strain Explorer',
      instructions:
        'Scrub strain ε from 0% to fracture to watch the tensile specimen stretch, yield, strain-harden, neck at Ultimate Tensile Strength (UTS), and fracture!',
      missionPrompt:
        'Lab Mission: Scrub across the Elastic Region, Yield Point, Ultimate Tensile Strength (UTS), and Fracture.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Engineering Stress (σ) and Engineering Strain (ε)',
        formula: '\\sigma = \\frac{F}{A_0} \\; (\\text{MPa}) \\quad | \\quad \\varepsilon = \\frac{L - L_0}{L_0} = \\frac{\\Delta L}{L_0} \\; (\\text{unitless or \\%})',
        explanation:
          'Notice why strain has no units: dividing millimeters by millimeters (mm / mm) cancels the units completely! Multiplying ε by 100 gives Percent Elongation.',
      },
      {
        title: '2. Hooke’s Law in the Linear Elastic Region & Poisson’s Ratio (ν)',
        formula: '\\sigma = E \\cdot \\varepsilon \\quad \\text{and} \\quad \\nu = -\\frac{\\varepsilon_{\\text{lateral}}}{\\varepsilon_{\\text{axial}}} \\approx 0.30 \\text{ for most metals}',
        explanation:
          'When you stretch a metal bar axially (+ε_axial), it gets slightly thinner sideways (−ε_lateral). Poisson’s ratio ν measures that neck-down ratio before yielding!',
      },
      {
        title: '3. Design Safety Factor (Allowable Working Stress)',
        formula: '\\sigma_{\\text{working}} = \\frac{\\sigma_y}{\\text{Factor of Safety (FS)}}',
        explanation:
          'Engineers NEVER design a bridge or aircraft part up to its Ultimate Tensile Strength (σ_UTS) because once a metal passes Yield Stress (σ_y), it permanently bends! Always divide Yield Strength σ_y by a Factor of Safety (typically FS = 1.5 to 3.0).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p101-d1',
          question: 'A 200-mm long Titanium rod stretches to 200.5 mm under an elastic load. What is the engineering strain ε, and if Titanium’s Young’s Modulus is E = 110,000 MPa (110 GPa), what is the applied stress σ = E·ε?',
          options: [
            'ε = 0.0025;   σ = 275 MPa',
            'ε = 0.5;      σ = 55,000 MPa',
            'ε = 0.025;    σ = 2,750 MPa',
            'ε = 0.0025;   σ = 110 MPa',
          ],
          correctIndex: 0,
          hint1: 'ΔL = 200.5 − 200 = 0.5 mm. So ε = 0.5 mm ÷ 200 mm = 0.0025.',
          hint2: 'Now multiply σ = E × ε = 110,000 MPa × 0.0025!',
          explanation: 'ε = 0.5 / 200 = 0.0025 (0.25% strain). By Hooke’s Law, σ = 110,000 × 0.0025 = 275 MPa.',
        },
        {
          id: 'p101-d2',
          question: 'Structural steel has a Yield Strength σ_y = 360 MPa and an Ultimate Tensile Strength σ_UTS = 500 MPa. Using a Factor of Safety FS = 2.0 against permanent yielding, what is the maximum safe working stress σ_working?',
          options: ['180 MPa', '250 MPa', '360 MPa', '720 MPa'],
          correctIndex: 0,
          hint1: 'Base the safety factor on Yield Strength σ_y (not UTS!) to prevent permanent plastic deformation.',
          hint2: 'σ_working = 360 MPa ÷ 2.0.',
          explanation: 'σ_working = σ_y / FS = 360 MPa / 2.0 = 180 MPa.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Sizing a Suspension Bolt Against Yielding',
        scenario:
          'You are designing a cylindrical steel suspension pin that must safely carry a tensile load of F = 90,000 N without exceeding an allowable working stress of σ_allow = 150 MPa (recall 1 MPa = 1 N/mm²). Using σ = F / A, what is the minimum required cross-sectional area A of the steel pin in mm²?',
        options: ['600 mm²', '1,500 mm²', '60 mm²', '13,500 mm²'],
        correctIndex: 0,
        hint: 'Rearrange σ = F / A (from Math 003!) to get A = F / σ = 90,000 N ÷ 150 N/mm².',
        explanation:
          'A = F / σ_allow = 90,000 N / (150 N/mm²) = 600 mm²!',
      },
    },
  },

  // ==========================================
  // MODULE 18: MATE 201 (DISLOCATIONS & SOLID-STATE DIFFUSION)
  // ==========================================
  {
    id: 'mate-201',
    code: 'MATE 201',
    termId: 'term-4',
    week: 5,
    daySlot: 'Module 18',
    track: 'mate',
    title: 'Crystal Defects, Dislocations & Solid-State Diffusion (Fick’s Laws)',
    subtitle: 'Why real metals are 100× softer than perfect crystals—and how Carbon atoms hop through solid Iron',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 255,
    prereqIds: ['phys-101'],
    umCourseLink: 'Core of UM BSMTE "Fundamentals of Materials Engineering 2" & "Kinetics of Materials"',
    overtimeDigest: [
      'No real crystal is 100% perfect: Point Defects (Vacancies & Interstitials) allow atoms to hop and diffuse through solid metal; Line Defects (Dislocations) allow planes of atoms to slip one row at a time like a caterpillar (instead of breaking all bonds at once!).',
      'To make a metal STRONGER, you must BLOCK dislocation motion (via Work Hardening, Solid-Solution Alloying, Precipitates, or smaller Grain Boundaries).',
      'Fick’s First Law of Diffusion: Flux J = −D · (dC/dx). Atoms diffuse from high concentration to low concentration at a rate proportional to the concentration gradient (slope dC/dx from Math 101!).',
    ],
    history: {
      era: '1855 Zurich (Adolf Fick) & 1934 Cambridge/Budapest (Taylor, Orowan & Polanyi)',
      protagonist: 'Adolf Fick & Sir Geoffrey Ingram Taylor',
      hook: 'How do you move a giant, heavy Persian rug across a floor using only two fingers?',
      narrative: [
        'In the 1920s, physicists calculated the theoretical shear stress needed to slide one plane of copper atoms over another all at once. Real copper yielded at a stress 100 times LOWER than theory! Why?',
        'In 1934, G.I. Taylor, Egon Orowan, and Michael Polanyi simultaneously solved the mystery. Trying to drag an entire heavy rug across a floor at once takes massive force—but if you make a small ripple (ruck) at one end and push the ripple across the rug, the whole rug shifts by one inch effortlessly!',
        'That atomic ripple is an Edge Dislocation. Every time you bend a paperclip, trillions of dislocations glide across FCC slip planes, tangle into traffic jams, and make the paperclip stiffer (Work Hardening)!',
      ],
      takeaway:
        'Look at the minus sign in Fick’s First Law J = −D(dC/dx): when concentration C decreases with depth x, the slope dC/dx is negative, so (−D)×(negative) = positive flux J moving forward into the metal (Math 001 + Math 101 in action)!',
    },
    csBridge: {
      concept: 'Insertion Sort Shifting vs. Array Copy & Gradient Flow (`J = -D * grad(C)`)',
      analogy:
        'Sliding an entire crystal plane at once is an `O(N)` parallel bond break; moving a single Dislocation step-by-step is a local pointer swap (`O(1)` force at each tick)! And Fick’s Law `J = -D * dC/dx` is literally gradient descent down a concentration slope.',
      codeSnippet: `// Fick's First Law of Steady-State Atomic Diffusion:
function diffusionFlux(D_m2_s, C1, C2, thickness_dx) {
  const dC_dx = (C2 - C1) / thickness_dx; // Concentration slope (Derivative!)
  return -D_m2_s * dC_dx;                 // Flux J in atoms/(m²·s) or kg/(m²·s)
}`,
    },
    visualLab: {
      type: 'diffusion_dislocation_lab',
      title: '3B1B Dislocation Ripple & Fick’s Law Concentration Gradient Visualizer',
      instructions:
        'Adjust the surface Carbon concentration C₁ and furnace temperature (which scales diffusivity D) to watch the concentration gradient slope dC/dx drive Carbon flux J into a steel gear!',
      missionPrompt:
        'Lab Mission: Increase the concentration gradient to boost Carburizing Diffusion Flux J.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. The Four Strengthening Mechanisms in Metallurgy (Blocking Dislocations)',
        formula: '\\tau_{\\text{yield}} \\uparrow \\iff \\text{Dislocation Motion Blocked by: } \\text{1) Solutes, 2) Dislocations, 3) Grain Boundaries, 4) Precipitates}',
        explanation:
          'Unlike ceramics (where cracks control strength), in metals plastic deformation happens by dislocation slip. Anything that acts as a roadblock to dislocations increases Yield Strength σ_y!',
      },
      {
        title: '2. Fick’s First Law of Steady-State Diffusion',
        formula: 'J = -D \\frac{dC}{dx} \\approx -D \\left(\\frac{C_2 - C_1}{x_2 - x_1}\\right)',
        explanation:
          'J is the diffusion flux (mass or atoms diffusing through 1 m² per second), D is the diffusion coefficient (m²/s), and dC/dx is the concentration slope.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate201-d1',
          question: 'When you repeatedly bend a copper wire back and forth at room temperature ("Cold Working" / Strain Hardening), it becomes harder and harder to bend at the same spot. Why?',
          options: [
            'Bending multiplies dislocations, which tangle into a dense traffic jam and block further dislocation slip (increasing Yield Strength while reducing Ductility).',
            'Cold working melts the copper into a ceramic.',
            'Bending removes all protons from the copper nuclei.',
            'Cold working makes the crystal completely defect-free.',
          ],
          correctIndex: 0,
          hint1: 'Remember what happens when trillions of dislocations try to move on intersecting slip planes.',
          hint2: 'They pile up and tangle, requiring higher stress to push more dislocations through!',
          explanation: 'Cold working increases dislocation density by orders of magnitude; their strain fields repel and tangle, raising Yield Strength (σ_y) at the expense of ductility.',
        },
        {
          id: 'mate201-d2',
          question: 'Hydrogen gas diffuses through a 2-mm thick (0.002 m) palladium purifying membrane. The concentration on the high-pressure side is C₁ = 2.4 kg/m³ and on the low-pressure side is C₂ = 0.4 kg/m³. If D = 1.0 × 10⁻⁸ m²/s, what is the steady-state diffusion flux J = −D · (C₂ − C₁) / Δx?',
          options: [
            '1.0 × 10⁻⁵ kg/(m²·s)',
            '2.0 × 10⁻⁸ kg/(m²·s)',
            '−1.0 × 10⁻¹¹ kg/(m²·s)',
            '4.0 × 10⁻³ kg/(m²·s)',
          ],
          correctIndex: 0,
          hint1: 'First compute the gradient (C₂ − C₁) / Δx = (0.4 − 2.4) / 0.002 = −2.0 / 0.002 = −1,000 kg/m⁴.',
          hint2: 'Now multiply by −D:  −(1.0 × 10⁻⁸) × (−1,000) = +1.0 × 10⁻⁵!',
          explanation: 'J = −(1.0 × 10⁻⁸) × [(0.4 − 2.4) / 0.002] = −(1.0 × 10⁻⁸) × (−10³) = 1.0 × 10⁻⁵ kg/(m²·s).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Carburizing a Steel Transmission Gear (Fick’s Second Law)',
        scenario:
          'To give a tough low-carbon steel gear a wear-resistant high-carbon outer skin ("case hardening"), you heat it in a carbon-rich furnace. According to Fick’s Second Law, the penetration depth x of Carbon increases with the square root of time:  x ≈ √(D · t).  If it takes t₁ = 2 hours to achieve a case depth of x₁ = 0.5 mm at 927 °C, how many hours (t₂) will it take at the same temperature to DOUBLE the case depth to x₂ = 1.0 mm?',
        options: [
          '8 hours (Doubling depth requires 2² = 4× the time!)',
          '4 hours',
          '2 hours',
          '16 hours',
        ],
        correctIndex: 0,
        hint: 'Since x is proportional to √t, squaring both sides shows that time t is proportional to x²! If x multiplies by 2, t multiplies by 2² = 4.',
        explanation:
          'Because diffusion is a random-walk process (x ∝ √t → t ∝ x²), doubling the penetration depth (2×) requires 2² = 4 times as long: 4 × 2 hours = 8 hours!',
      },
    },
  },

  // ==========================================
  // MODULE 19: MATE 202 (PHASE DIAGRAMS & IRON-CARBON STEEL MAP)
  // ==========================================
  {
    id: 'mate-202',
    code: 'MATE 202',
    termId: 'term-5',
    week: 5,
    daySlot: 'Module 19',
    track: 'mate',
    title: 'Binary Phase Diagrams, Eutectics & The Iron-Carbon (Fe–Fe₃C) Steel Map',
    subtitle: 'Reading the single most important map in Metallurgy: Austenite, Ferrite, Cementite & Pearlite',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 260,
    prereqIds: ['mate-201'],
    umCourseLink: 'Signature UM BSMTE 3rd-Year Physical Metallurgy & Phase Equilibria Course',
    overtimeDigest: [
      'A Phase Diagram is a Temperature (y-axis) vs. Composition (x-axis, wt% B) map showing which phases (Liquid, Solid α, Solid β) are thermodynamically stable (lowest Gibbs Free Energy from CHEM 101!).',
      'Inside a two-phase region (like Liquid + Solid), a horizontal Tie Line at temperature T gives the compositions of the two phases at its endpoints, and the Lever Rule (Math 003!) gives the exact mass fraction of each phase.',
      'On the Iron-Carbon (Fe–Fe₃C) diagram: at 727 °C and 0.76 wt% Carbon (the Eutectoid point), FCC Austenite (γ) transforms into alternating microscopic layers of ductile BCC Ferrite (α) + ultra-hard Ceramic Cementite (Fe₃C)—a natural composite microstructure called PEARLITE!',
    ],
    history: {
      era: '1897–1900 London & Paris (Roberts-Austen & Roozeboom)',
      protagonist: 'Sir William Chandler Roberts-Austen & H.W. Bakhuis Roozeboom',
      hook: 'How did blacksmiths forge samurai swords and Damascus steel for 3,000 years before anyone knew what was happening inside the iron?',
      narrative: [
        'For millennia, swordsmiths knew that heating iron with charcoal and cooling it at different rates magically changed soft iron into razor-sharp steel—or brittle cast iron. Why?',
        'In 1897, Sir William Chandler Roberts-Austen (after whom the high-temperature FCC phase "Austenite" is named!) used platinum thermocouples to record cooling arrests in Iron-Carbon alloys, and Bakhuis Roozeboom applied Gibbs’ Phase Rule to draw the modern Iron-Carbon Phase Diagram.',
        'They discovered that pure Iron changes its crystal lattice from BCC (α-Ferrite) to FCC (γ-Austenite) above 912 °C. Because FCC has larger interstitial pockets at its center, hot Austenite dissolves up to 2.14 wt% Carbon, whereas room-temperature BCC Ferrite can barely hold 0.022 wt% Carbon! When cooled past 727 °C, the excess carbon precipitates out as hard Fe₃C (Cementite) plates, forming Pearlite.',
      ],
      takeaway:
        'Remember the Lever Rule mnemonic: to find the fraction of Phase α (on the left end of the tie line), take the length of the OPPOSITE lever arm (from your alloy C₀ to the right end C_β) divided by the total tie-line length (C_β − C_α)!',
    },
    csBridge: {
      concept: '2D State-Space Lookup Map & Barycentric Linear Interpolation (Lever Rule)',
      analogy:
        'A Binary Phase Diagram is a 2D state partition over `(compositionX, temperatureY)`. And the **Lever Rule** is literally 1D barycentric interpolation (`lerp` inverse): if `C0 = w_alpha * C_alpha + w_beta * C_beta` with `w_alpha + w_beta = 1`, then `w_alpha = (C_beta - C0) / (C_beta - C_alpha)`!',
      codeSnippet: `// The Lever Rule (Inverse Linear Interpolation):
function leverRule(C0, C_alpha, C_beta) {
  const totalTieLine = C_beta - C_alpha;
  const fractionAlpha = (C_beta - C0) / totalTieLine; // Opposite arm / Total
  const fractionBeta  = (C0 - C_alpha) / totalTieLine;
  return { fractionAlpha, fractionBeta };
}`,
    },
    visualLab: {
      type: 'phase_diagram_lever_lab',
      title: '3B1B Interactive Binary Phase Diagram & Tie-Line Lever Rule Calculator',
      instructions:
        'Drag the alloy composition C₀ across the two-phase region to watch the left and right lever arms automatically compute the exact mass fractions W_α and W_β!',
      missionPrompt:
        'Lab Mission: Set the alloy composition C₀ to the midpoint or eutectoid point and verify the Lever Rule fractions.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. The Tie-Line & Opposite-Arm Lever Rule',
        formula: 'W_{\\alpha} = \\frac{C_{\\beta} - C_0}{C_{\\beta} - C_{\\alpha}} \\quad \\text{and} \\quad W_{\\beta} = \\frac{C_0 - C_{\\alpha}}{C_{\\beta} - C_{\\alpha}} = 1 - W_{\\alpha}',
        explanation:
          'Just like two kids on a seesaw: the heavier phase sits CLOSER to the fulcrum C₀! So the weight fraction of the left phase (α) uses the right-hand distance (C_β − C₀) divided by the total tie-line length.',
      },
      {
        title: '2. Key Landmarks of the Fe–Fe₃C Steel Phase Diagram',
        formula: '\\text{Eutectoid Reaction (727 }^\\circ\\text{C, 0.76 wt\\% C): } \\gamma\\text{ (FCC Austenite)} \\xrightarrow{\\text{Cool}} \\alpha\\text{ (BCC Ferrite)} + \\text{Fe}_3\\text{C (Cementite)} = \\text{Pearlite}',
        explanation:
          'Steels with < 0.76 wt% C are Hypoeutectoid (soft, ductile structural steels); 0.76 wt% C is Eutectoid (100% Pearlite, used in railway tracks & high-strength cables); 0.76–2.14 wt% C are Hypereutectoid (high-carbon cutting tools & knives); > 2.14 wt% C are Cast Irons!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate202-d1',
          question: 'In a Copper-Nickel alloy at 1,250 °C, a tie line spans from Liquid at C_L = 30 wt% Ni to Solid α at C_α = 50 wt% Ni. If your overall alloy composition is C₀ = 35 wt% Ni, what is the mass fraction of Solid α (W_α)?',
          options: [
            'W_α = 0.25 (25% Solid α, 75% Liquid)',
            'W_α = 0.75 (75% Solid α, 25% Liquid)',
            'W_α = 0.50 (50% Solid α)',
            'W_α = 0.35 (35% Solid α)',
          ],
          correctIndex: 0,
          hint1: 'Total tie-line length = C_α − C_L = 50 − 30 = 20.',
          hint2: 'To find Solid α (on the right at 50%), take the OPPOSITE lever arm (from 30% to 35%): W_α = (35 − 30) / (50 − 30) = 5 / 20!',
          explanation: 'W_α = (C₀ − C_L) / (C_α − C_L) = (35 − 30) / (50 − 30) = 5 / 20 = 0.25 (25% Solid, 75% Liquid).',
        },
        {
          id: 'mate202-d2',
          question: 'What are the two constituent phases that stack in alternating lamellae (layers) to form the Pearlite microstructure when Austenite cools slowly past 727 °C?',
          options: [
            'Ductile BCC α-Ferrite + Hard Ceramic Fe₃C Cementite',
            'Liquid Iron + Oxygen Gas',
            'Pure Diamond + Liquid Copper',
            'Polymers + Glass',
          ],
          correctIndex: 0,
          hint1: 'Look at the products of the Eutectoid reaction γ → α + Fe₃C.',
          hint2: 'α is soft, tough BCC Ferrite, and Fe₃C is hard, wear-resistant iron carbide (Cementite)!',
          explanation: 'Pearlite is a natural microscopic composite of tough BCC α-Ferrite layers reinforcing hard Fe₃C Cementite plates!',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Designing Eutectic Lead-Free Solder for Electronics',
        scenario:
          'When soldering microchips onto a motherboard, engineers love the "Eutectic Composition" on a binary phase diagram (Liquid → α + β directly at a single sharp lowest melting temperature T_E, with zero mushy two-phase zone). In a binary A–B solder system, just below the eutectic temperature, Phase α holds 10 wt% B and Phase β holds 90 wt% B. If the eutectic solder has overall composition C₀ = 66 wt% B, what mass percentage of the solidified solder is Phase β?',
        options: ['70% Phase β (and 30% Phase α)', '30% Phase β', '66% Phase β', '50% Phase β'],
        correctIndex: 0,
        hint: 'Use the Lever Rule with C_α = 10, C_β = 90, and C₀ = 66:  W_β = (C₀ − C_α) / (C_β − C_α) = (66 − 10) / (90 − 10)!',
        explanation:
          'W_β = (66 − 10) / (90 − 10) = 56 / 80 = 7/10 = 0.70 (70% Phase β and 30% Phase α)!',
      },
    },
  },

  // ==========================================
  // MODULE 20: MATE 203 (TTT DIAGRAMS, HEAT TREATMENT & MARTENSITE)
  // ==========================================
  {
    id: 'mate-203',
    code: 'MATE 203',
    termId: 'term-5',
    week: 6,
    daySlot: 'Module 20',
    track: 'mate',
    title: 'Phase Transformations, TTT Diagrams & Heat Treatment (Martensitic Quenching)',
    subtitle: 'Why Thermodynamics tells you what SHOULD happen, but Kinetics (Time-Temperature-Transformation) rules reality',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 265,
    prereqIds: ['mate-202'],
    umCourseLink: 'Core of UM BSMTE "Heat Treatment & Physical Metallurgy Lab"',
    overtimeDigest: [
      'Phase Diagrams (MATE 202) assume infinitely slow Equilibrium Cooling. What if you plunge red-hot FCC Austenite (800 °C) into cold water in 1 second?',
      'Carbon atoms don’t have time to diffuse out to form Pearlite! Instead, the FCC iron lattice shears instantaneously without diffusion into a trapped, super-strained Body-Centered Tetragonal (BCT) needle structure called MARTENSITE—the hardest, strongest (and most brittle) form of steel!',
      'Reheating Martensite to 200–500 °C ("Tempering") lets a tiny controlled amount of carbon precipitate out, trading a bit of hardness for a massive gain in fracture toughness (Tempered Martensite)!',
    ],
    history: {
      era: '1930 US Steel Research Lab (Edgar Bain & Edmund Davenport)',
      protagonist: 'Edgar C. Bain & Adolf Martens',
      hook: 'Why does a TTT (Time-Temperature-Transformation) curve look like a letter "C" with a nose at 550 °C?',
      narrative: [
        'In 1930, metallurgist Edgar Bain discovered a fascinating tug-of-war between Thermodynamics (CHEM 101) and Diffusion Kinetics (MATE 201).',
        'Just below 727 °C (say 700 °C), diffusion is fast, automatic thermal motion is high, so coarse Pearlite forms slowly because the thermodynamic driving force ΔG is tiny. Way down at 250 °C, the thermodynamic driving force ΔG is huge, but temperature is so low that Carbon diffusion is frozen!',
        'Right in the middle—around 550 °C—both driving force AND diffusion speed are high, forming the "Nose of the C-Curve" where transformation happens in 1 second! If you quench steel fast enough to dodge left of that C-curve nose, you bypass diffusion completely and create Martensite (named after German metallurgist Adolf Martens)!',
      ],
      takeaway:
        'Slow Furnace Cool = Annealed Coarse Pearlite (Soft, Easy to Machine). Air Cool = Normalized Fine Pearlite. Water/Oil Quench + Reheat = Tempered Martensite (Strong AND Tough)!',
    },
    csBridge: {
      concept: 'Race Conditions, Timeout Cutoffs & Non-Equilibrium State Freezing',
      analogy:
        'Forming Pearlite requires an asynchronous background job (`CarbonDiffusion`) that takes `~2 seconds` at the 550 °C nose. Quenching drops temperature past the Martensite Start (`M_s`) threshold in `0.2 seconds`—triggering an instant O(1) diffusionless shear interrupt before diffusion can even start!',
      codeSnippet: `function predictSteelMicrostructure(coolingTimeTo550C_sec, noseTime_sec, tempered) {
  if (coolingTimeTo550C_sec < noseTime_sec) {
    return tempered
      ? "TEMPERED MARTENSITE (Ultra-strong AND tough — swords, gears, axles!)"
      : "AS-QUENCHED MARTENSITE (BCT lattice — razor-hard but brittle like glass!)";
  }
  return coolingTimeTo550C_sec > 100
    ? "COARSE PEARLITE (Soft, ductile — easy to drill and machine)"
    : "FINE PEARLITE / BAINITE (Medium-high strength)";
}`,
    },
    visualLab: {
      type: 'ttt_cooling_curve_lab',
      title: '3B1B Interactive TTT C-Curve & Quench Path Simulator',
      instructions:
        'Adjust the cooling rate (Quench vs. Air Cool vs. Furnace Anneal) and watch whether the cooling trajectory beats the Nose of the TTT C-curve to form Martensite!',
      missionPrompt:
        'Lab Mission: Test a rapid quench that dodges left of the C-curve nose to form Martensite.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Why the TTT Diagram is Shaped Like a "C" (Driving Force × Mobility)',
        formula: '\\text{Transformation Rate} \\propto \\underbrace{|\\Delta G(T)|}_{\\text{Increases as } T \\downarrow} \\times \\underbrace{D_0 e^{-Q/RT}}_{\\text{Decreases as } T \\downarrow}',
        explanation:
          'At the top (near 727 °C), ΔG ≈ 0 so rate is slow. At the bottom (low T), e^(−Q/RT) ≈ 0 so diffusion freezes. The product peaks at intermediate temperatures (~550 °C), creating the "nose" of the C-curve!',
      },
      {
        title: '2. Why As-Quenched Martensite Must Always Be Tempered',
        formula: '\\text{Austenite (}\\gamma\\text{)} \\xrightarrow{\\text{Rapid Quench}} \\text{Martensite (Brittle BCT)} \\xrightarrow{\\text{Temper at } 300\\text{–}500\\,^\\circ\\text{C}} \\text{Tempered Martensite (Tough!)}',
        explanation:
          'Never put an un-tempered quenched steel bolt into service—it can shatter like glass under impact! Tempering relieves internal lattice strain and precipitates nanoscale carbide particles.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate203-d1',
          question: 'On a TTT diagram for Eutectoid steel, the "Nose" of the Pearlite transformation C-curve sits at 550 °C and t = 1.5 seconds. If you quench a red-hot blade from 800 °C down to 100 °C in 0.4 seconds (passing completely to the left of the nose), what microstructure forms?',
          options: [
            '100% Martensite (diffusionless BCT phase)',
            '100% Coarse Pearlite',
            'Liquid Iron',
            'Pure Graphite',
          ],
          correctIndex: 0,
          hint1: 'Passing to the left of the 1.5-second nose means you cooled faster than the critical cooling rate.',
          hint2: 'Without time for carbon diffusion, Austenite shears directly into Martensite!',
          explanation: 'Cooling from 800 °C past 550 °C in 0.4 s (< 1.5 s nose) misses the diffusive Pearlite/Bainite regions completely, forming 100% Martensite.',
        },
        {
          id: 'mate203-d2',
          question: 'Why does a machinist "Full Anneal" (slowly cool inside the furnace) a steel block BEFORE cutting gear teeth into it, and only Quench & Temper it AFTER the teeth are cut?',
          options: [
            'Because Full Annealing produces soft, ductile Coarse Pearlite that is easy to cut without breaking drill bits; Quenching + Tempering afterward locks in high wear hardness and toughness.',
            'Because Martensite is softer than Pearlite.',
            'Because Annealing melts the gear.',
            'Because Tempering turns steel into plastic.',
          ],
          correctIndex: 0,
          hint1: 'Trying to machine ultra-hard Martensite destroys cutting tools.',
          hint2: 'Shape the metal while it is soft (Annealed Coarse Pearlite), then heat-treat to final strength (Tempered Martensite)!',
          explanation: 'This is a classic Materials Engineering processing-structure-property sequence: Anneal for machinability → Machine to shape → Quench & Temper for service strength and toughness!',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Alloying Elements & Hardenability of Thick Steel Shafts',
        scenario:
          'When you quench a thick 100-mm diameter plain-carbon steel shaft, the surface cools fast (forming Martensite), but the center cools slowly (hitting the 1.5-second C-curve nose and forming soft Pearlite). Adding small amounts of Chromium and Molybdenum (making 4140 Chromoly Steel) slows down carbon diffusion and shifts the TTT C-curve nose from 1.5 seconds to 30 seconds! If the center of the thick shaft takes 12 seconds to cool past 550 °C, what happens at the center of the 4140 Chromoly shaft vs. the plain-carbon shaft?',
        options: [
          'The 4140 Chromoly shaft center beats its 30-second nose (12 s < 30 s) and hardens all the way through to Martensite, whereas the plain-carbon center (12 s > 1.5 s) turns into soft Pearlite.',
          'Both shafts form 100% Pearlite.',
          'The plain-carbon shaft hardens deeper than Chromoly.',
          'Both shafts evaporate.',
        ],
        correctIndex: 0,
        hint: 'Compare the 12-second cooling time at the center against 1.5 s (plain carbon) vs. 30 s (4140 Chromoly).',
        explanation:
          'That ability to harden deep into thick cross-sections is called HARDENABILITY! Alloying elements (Cr, Mo, Ni, Mn) delay the TTT nose to longer times (30 s), allowing even the slow-cooling core (12 s) to form Martensite!',
      },
    },
  },

  // ==========================================
  // MODULE 21: MATE 301 (POLYMERS & GLASS TRANSITION)
  // ==========================================
  {
    id: 'mate-301',
    code: 'MATE 301',
    termId: 'term-5',
    week: 6,
    daySlot: 'Module 21',
    track: 'mate',
    title: 'Polymer Science: Chain Architecture, Degree of Polymerization & Glass Transition (T_g)',
    subtitle: 'Why Polyethylene bags melt and get recycled, why Epoxy never melts, and why O-rings shatter in the cold',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 270,
    prereqIds: ['mate-203'],
    umCourseLink: 'Direct UM BSMTE 3rd-Year Course: "Polymeric Materials"',
    overtimeDigest: [
      'Polymers ("many mers") are giant macromolecules built by linking thousands of covalent Carbon-backbone repeat units (monomers) end-to-end. Degree of Polymerization: DP = (Total Polymer Molecular Weight M_n) ÷ (Monomer Repeat Unit Weight m).',
      'Thermoplastics (PE, PP, PVC, PET) have separate linear/branched chains held together by weak Van der Waals bonds—so they soften and melt when heated (recyclable!). Thermosets (Epoxy, Bakelite, Vulcanized Rubber) have permanent covalent CROSS-LINKS tying all chains into one giant 3D net—they NEVER melt when heated!',
      'Below the Glass Transition Temperature (T_g), amorphous polymer chains are frozen into a hard, brittle glass; above T_g, chains wiggle and slide like flexible rubber/leather!',
    ],
    history: {
      era: '1920 Zurich (Hermann Staudinger) & 1986 Space Shuttle Challenger Investigation (Richard Feynman)',
      protagonist: 'Hermann Staudinger & Richard Feynman',
      hook: 'How did dropping a rubber O-ring into a cup of ice water on live TV solve the Space Shuttle Challenger disaster?',
      narrative: [
        'Until 1920, chemists refused to believe a single molecule could have a molecular weight of 500,000 g/mol. Hermann Staudinger proved that rubber and plastics are true covalently bonded giant chains ("Macromolecules"), winning the 1953 Nobel Prize.',
        'On a freezing morning (28 °F / −2 °C) in January 1986, the Space Shuttle Challenger tragically broke apart 73 seconds after launch. On live television, physicist Richard Feynman dunked a piece of the booster’s Viton elastomer O-ring into a cup of 0 °C ice water with a C-clamp. When he released the clamp, the rubber didn’t spring back—it stayed flat and rigid!',
        'Why? Because the launch temperature had dropped below the polymer’s Glass Transition Temperature (T_g)! Below T_g, a flexible rubbery elastomer loses its secondary-bond mobility and turns into a stiff, unresponsive glass that cannot seal high-pressure rocket gas.',
      ],
      takeaway:
        'Never select a polymer or elastomer for an engineering environment without checking its Glass Transition Temperature (T_g) and Melting Temperature (T_m)!',
    },
    csBridge: {
      concept: 'Singly Linked Lists (Linear Thermoplastics) vs. Strongly Connected Graphs (Cross-Linked Thermosets)',
      analogy:
        'A **Thermoplastic** is a collection of independent `LinkedList<Monomer>` instances: heat shakes them apart so they flow past each other. A **Thermoset** adds covalent cross-link pointers between lists, turning the entire bucket of plastic into one single connected graph (`Graph<Monomer>`) that cannot melt without burning!',
      codeSnippet: `// Degree of Polymerization (DP = number of linked monomer nodes):
// Example: Polyethylene repeat unit (-CH2-CH2-) has mass m = 2*12 + 4*1 = 28 g/mol
function degreeOfPolymerization(numberAvgMolWeight_Mn, repeatUnitMass_m) {
  return numberAvgMolWeight_Mn / repeatUnitMass_m;
}`,
    },
    visualLab: {
      type: 'polymer_tg_chain_lab',
      title: '3B1B Polymer Chain Architecture & Glass Transition (T_g) Modulus Drop Visualizer',
      instructions:
        'Compare Linear Thermoplastic vs. Cross-Linked Thermoset stiffness as Temperature crosses the Glass Transition (T_g) and Melting Point (T_m)!',
      missionPrompt:
        'Lab Mission: Scrub temperature across T_g to see stiffness drop by 1,000× as chains unfreeze from Glassy to Rubbery.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Degree of Polymerization (DP) & Repeat Unit Molar Mass (Using Chem 003!)',
        formula: '\\text{DP} = \\frac{M_n}{m} \\quad \\text{where } m(\\text{Polyethylene } \\text{–C}_2\\text{H}_4\\text{–}) = 2(12) + 4(1) = 28\\text{ g/mol}',
        explanation:
          'If a Polyethylene chain has a total number-average molecular weight M_n = 56,000 g/mol, dividing by the 28 g/mol repeat unit tells you the chain is made of DP = 56,000 / 28 = 2,000 linked ethylene units!',
      },
      {
        title: '2. Why High-Density Polyethylene (HDPE) is Stiffer than Low-Density (LDPE)',
        formula: '\\text{Unbranched Linear Chains (HDPE)} \\implies \\text{Pack into 90\\% Crystalline Lamellae} \\implies \\text{Higher Density & Stiffness}',
        explanation:
          'LDPE (grocery bags) has bulky side branches that prevent chains from packing neatly (only ~50% crystalline, soft). HDPE (milk jugs, hard hats, water pipes) has straight unbranched chains that fold tightly together with strong Van der Waals attraction!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate301-d1',
          question: 'Polyvinyl Chloride (PVC, used in plumbing pipes) has the repeat unit formula –(CH₂–CHCl)–. Given atomic masses C = 12, H = 1, and Cl = 35.5 g/mol, what is the repeat unit molar mass m, and what is the Degree of Polymerization (DP) of a PVC chain with total molecular weight M_n = 62,500 g/mol?',
          options: [
            'm = 62.5 g/mol;   DP = 1,000 repeat units',
            'm = 28.0 g/mol;   DP = 2,232 repeat units',
            'm = 62.5 g/mol;   DP = 100 repeat units',
            'm = 100 g/mol;    DP = 625 repeat units',
          ],
          correctIndex: 0,
          hint1: 'Sum the atoms in C₂H₃Cl: 2(12) + 3(1) + 35.5 = 24 + 3 + 35.5 = 62.5 g/mol.',
          hint2: 'Now divide M_n by m: 62,500 ÷ 62.5 = 1,000!',
          explanation: 'Repeat unit mass m = 2(12) + 3(1) + 35.5 = 62.5 g/mol. DP = 62,500 / 62.5 = 1,000 monomers per chain.',
        },
        {
          id: 'mate301-d2',
          question: 'Why does Polystyrene (T_g = +100 °C) behave as a hard, rigid, brittle plastic cup at room temperature (25 °C), whereas Natural Polyisoprene Rubber (T_g = −73 °C) is flexible and stretchy at room temperature (25 °C)?',
          options: [
            'At 25 °C, Polystyrene is BELOW its T_g (100 °C) so its chains are frozen in the glassy state; Rubber is well ABOVE its T_g (−73 °C) so its chains can uncoil and stretch freely.',
            'Because Polystyrene is a metal.',
            'Because Rubber is below −73 °C at room temperature.',
            'Because Polystyrene has no carbon atoms.',
          ],
          correctIndex: 0,
          hint1: 'Compare room temperature (25 °C) to each polymer’s T_g.',
          hint2: '25 °C < 100 °C (Glassy/Frozen) vs. 25 °C > −73 °C (Rubbery/Flexible)!',
          explanation: 'Room temperature (25 °C) sits below Polystyrene’s T_g (+100 °C, keeping it glassy and rigid) but 98 °C above Rubber’s T_g (−73 °C, keeping it in the elastomeric rubbery state)!',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Recycling Thermoplastics vs. Cross-Linked Thermoset Tires',
        scenario:
          'A Davao manufacturing plant wants to melt down scrap PET plastic bottles and scrap Vulcanized Rubber car tires to injection-mold new parts. The PET bottles melt cleanly at 250 °C and mold into new parts, but the vulcanized rubber tires refuse to melt and instead char and smoke above 300 °C. Explain the atomic/molecular reason!',
        options: [
          'PET is a linear Thermoplastic held together between chains by reversible secondary Van der Waals forces, whereas Vulcanized Rubber is a cross-linked network (Thermoset elastomer) with permanent covalent Sulfur bridges locking all chains into one giant molecule.',
          'PET has a higher melting point than tungsten.',
          'Vulcanized rubber is made of pure ionic crystals.',
          'PET bottles have no covalent bonds.',
        ],
        correctIndex: 0,
        hint: 'What did Charles Goodyear’s "Vulcanization" (heating rubber with Sulfur) add between the polymer chains?',
        explanation:
          'Vulcanization creates permanent covalent disulfide (–S–S–) cross-links between polyisoprene chains. Heating cannot break those cross-links without burning the carbon backbone itself!',
      },
    },
  },

  // ==========================================
  // MODULE 22: MATE 302 (CERAMICS, FRACTURE TOUGHNESS & COMPOSITES)
  // ==========================================
  {
    id: 'mate-302',
    code: 'MATE 302',
    termId: 'term-5',
    week: 6,
    daySlot: 'Module 22',
    track: 'mate',
    title: 'Ceramics, Griffith Crack Fracture (K_Ic) & Fiber-Reinforced Composites',
    subtitle: 'Why glass is 10× stronger in compression than tension—and how uniting brittle fibers with a ductile matrix beats both!',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 275,
    prereqIds: ['mate-301'],
    umCourseLink: 'Direct UM BSMTE 3rd-Year Courses: "Ceramic Materials" & "Composite Materials"',
    overtimeDigest: [
      'Ceramics & Glasses (SiO₂, Al₂O₃, SiC, Concrete) are super hard and strong in COMPRESSION, but fail suddenly in TENSION because microscopic surface flaws (length a) concentrate stress at the crack tip!',
      'Griffith & Irwin Fracture Mechanics: a brittle material fractures when Stress Intensity K = Y · σ · √(πa) reaches the material’s Fracture Toughness (K_Ic). Rearranging gives Fracture Stress: σ_f = K_Ic / [Y · √(πa)]!',
      'Notice the √a in the denominator: making a surface scratch 4× deeper cuts the ceramic’s tensile strength in HALF (1/√4 = 1/2)! That is why we embed thin, flaw-free glass or carbon fibers inside a tough polymer matrix to create a COMPOSITE.',
    ],
    history: {
      era: '1920 Royal Aircraft Establishment (A.A. Griffith) & WWII Liberty Ships',
      protagonist: 'Alan Arnold Griffith & George R. Irwin',
      hook: 'Why can a freshly drawn hair-thin glass fiber hold 4,000 MPa of tension, while a thick glass windowpane snaps at 50 MPa?',
      narrative: [
        'In 1920, aerospace engineer A.A. Griffith was puzzled: the Si–O covalent bond in glass should theoretically support 10,000 MPa, yet ordinary glass rods snap at barely 70 MPa. Even weirder, when he drew molten glass into ultra-thin fibers, their strength jumped toward 4,000 MPa!',
        'Griffith realized that every bulk brittle material is covered in microscopic surface scratches (Griffith flaws of length a). Because ceramics cannot blunt a crack tip by plastic dislocation slip (unlike ductile metals in MATE 201), the stress at a sharp crack tip amplifies like a lever!',
        'A thin glass fiber has almost no room for a deep flaw, AND wrapping millions of thin fibers in an epoxy resin (Fiberglass / Carbon-Fiber Composite) protects the fibers from scratching while stopping any single broken fiber from cracking the whole wing!',
      ],
      takeaway:
        'Look at σ_f = K_Ic / (Y√(πa)): this formula uses your fractional exponents from Math 004 (a^(−1/2)) and algebra from Math 003!',
    },
    csBridge: {
      concept: 'Single Point of Failure (Monolithic Ceramic) vs. Fault-Tolerant Distributed Cluster (Fiber Composite)',
      analogy:
        'A monolithic ceramic plate is a single-threaded monolith: one unhandled exception (a microcrack of length `a`) crashes the entire process (`O(1)` catastrophic propagation). A Carbon-Fiber Composite is a fault-tolerant cluster of 10,000,000 parallel fiber workers isolated by a ductile epoxy message bus—if one fiber snaps, the matrix redistributes the load to neighboring fibers!',
      codeSnippet: `// Griffith-Irwin Brittle Fracture Stress:  sigma_f = K_Ic / (Y * sqrt(pi * a))
function fractureStressMPa(K_Ic, Y, crackLengthMeters) {
  return K_Ic / (Y * Math.sqrt(Math.PI * crackLengthMeters));
}
// Notice: if crackLengthMeters increases by 9x, fractureStressMPa drops by sqrt(9) = 3x!`,
    },
    visualLab: {
      type: 'griffith_fracture_composite_lab',
      title: '3B1B Crack-Tip Stress Concentrator & Composite Load-Sharing Visualizer',
      instructions:
        'Adjust surface flaw size (a) to see how brittle fracture strength σ_f drops as 1/√a, and compare against a Tough Metal and a Carbon-Fiber Composite!',
      missionPrompt:
        'Lab Mission: Observe how quadrupling flaw size (4×) halves the fracture strength (÷2) of a brittle ceramic.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Fracture Toughness (K_Ic) & Critical Flaw Size Formula',
        formula: 'K_{Ic} = Y \\sigma_f \\sqrt{\\pi a} \\implies \\sigma_f = \\frac{K_{Ic}}{Y \\sqrt{\\pi a}} \\quad \\text{and} \\quad a_c = \\frac{1}{\\pi}\\left(\\frac{K_{Ic}}{Y \\sigma}\\right)^2',
        explanation:
          'Units of K_Ic are MPa·√m! Typical values: Window Glass K_Ic ≈ 0.8 MPa·√m; Silicon Nitride Ceramic ≈ 5 MPa·√m; Aluminum Alloy ≈ 35 MPa·√m; Tough Structural Steel ≈ 100+ MPa·√m!',
      },
      {
        title: '2. Why Prestressed / Reinforced Concrete Uses Steel Rebar on the Tension Side',
        formula: '\\sigma_{\\text{compressive}}(\\text{Concrete}) \\approx 40\\text{ MPa} \\gg \\sigma_{\\text{tensile}}(\\text{Concrete}) \\approx 4\\text{ MPa}',
        explanation:
          'Compressive loads squeeze microcracks SHUT (so ceramics/concrete carry huge compression). Tensile loads pull microcracks OPEN! Embedding ductile steel rebar on the bottom (tension) side of a concrete beam creates a composite that handles both compression and tension.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate302-d1',
          question: 'According to the fracture mechanics equation  σ_f = K_Ic / [Y · √(πa)],  if polishing a ceramic turbine blade reduces its largest surface scratch length (a) by a factor of 9 (so a_new = a_old / 9), how does its tensile fracture strength σ_f change?',
          options: [
            'Its fracture strength triples (3× stronger, since 1 / √(1/9) = 3)!',
            'Its fracture strength increases by 9×.',
            'Its fracture strength decreases by 3×.',
            'Its fracture strength stays the same.',
          ],
          correctIndex: 0,
          hint1: 'Look at √a in the denominator: √(1/9) = 1/3.',
          hint2: 'Dividing by 1/3 (Math 002!) multiplies the strength by 3!',
          explanation: 'Because σ_f ∝ 1/√a, reducing flaw length a to 1/9 of its original size multiplies fracture stress by √9 = 3×! That is why high-performance ceramics are diamond-polished or glazed.',
        },
        {
          id: 'mate302-d2',
          question: 'In a unidirectional Carbon-Fiber Reinforced Polymer (CFRP) composite loaded parallel to the fibers, what is the distinct role of the Carbon Fibers vs. the Epoxy Polymer Matrix?',
          options: [
            'The stiff, high-strength Carbon Fibers carry >95% of the axial tensile load, while the ductile Epoxy Matrix binds the fibers, protects their surfaces from scratches, and transfers shear load around any broken fiber.',
            'The Epoxy carries 100% of the load and the Carbon Fibers are only for color.',
            'Both have the exact same stiffness and strength.',
            'The Carbon Fibers melt at 60 °C.',
          ],
          correctIndex: 0,
          hint1: 'Recall from MATH 002 Boss Problem: Carbon Fiber has E_f = 250 GPa while Epoxy has E_m = 5 GPa.',
          hint2: 'Yet without the Epoxy matrix, loose dry fibers can’t share loads or resist surface abrasion!',
          explanation: 'Composites achieve synergy: fibers provide high stiffness and tensile strength, while the matrix provides toughness, environmental protection, and shear load transfer.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Non-Destructive Ultrasonic Inspection of an Aircraft Wing Spar',
        scenario:
          'An aerospace alloy has Fracture Toughness K_Ic = 44 MPa·√m and geometry factor Y = 1.0. Under peak flight turbulence, the wing spar experiences a tensile stress of σ = 220 MPa. Using K_Ic = Y · σ · √(π · a_c) (and taking π ≈ 3.14), what is the critical crack length a_c that will cause sudden fracture? (Hint: first find √(π · a_c) = K_Ic / σ = 44 / 220 = 0.20 √m, then square both sides!).',
        options: [
          'a_c ≈ 0.0127 m (12.7 mm)',
          'a_c ≈ 0.20 m (200 mm)',
          'a_c ≈ 0.04 m (40 mm)',
          'a_c ≈ 0.001 m (1 mm)',
        ],
        correctIndex: 0,
        hint: 'Since √(π · a_c) = 44 / 220 = 0.20, square both sides: π · a_c = (0.20)² = 0.04 m. Now divide 0.04 by π ≈ 3.14!',
        explanation:
          '√(π · a_c) = 44 / 220 = 0.20 → π · a_c = 0.04 m → a_c = 0.04 / 3.1416 ≈ 0.0127 m = 12.7 mm! As long as ultrasonic inspection detects any crack before it reaches 12.7 mm, the aircraft is safe.',
      },
    },
  },

  // ==========================================
  // MODULE 23: MATE 401 (SEMICONDUCTOR PHYSICS & BAND THEORY)
  // ==========================================
  {
    id: 'mate-401',
    code: 'MATE 401',
    termId: 'term-6',
    week: 7,
    daySlot: 'Module 23',
    track: 'mate',
    title: 'Electronic Materials: Band Theory, Bandgap (E_g) & Semiconductor Doping',
    subtitle: 'How a pinch of Phosphorus or Boron turns Silicon into computer chips, LEDs, and solar cells',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 290,
    prereqIds: ['mate-302'],
    umCourseLink: 'Direct UM BSMTE 4th-Year Course: "Electronic, Magnetic & Optical Materials"',
    overtimeDigest: [
      'When trillions of atoms pack into a crystal, their individual valence orbitals merge into continuous Energy Bands: the Valence Band (filled with bonding electrons) and the Conduction Band (empty highway where electrons move freely).',
      '1) METALS: Valence & Conduction bands overlap (E_g = 0 eV) → always conductive.\n2) INSULATORS (Ceramics/Diamond): Huge forbidden Bandgap (E_g > 4 eV) → electrons cannot jump across.\n3) SEMICONDUCTORS (Si: E_g = 1.11 eV, GaAs: 1.42 eV): Small bandgap! Heat or light (photons with E > E_g) kicks electrons across, or we DOPE the crystal!',
      'Doping Silicon (Group 14, 4 valence e⁻) with Phosphorus (Group 15, 5 valence e⁻) adds extra negative electrons (n-type!). Doping with Boron (Group 13, 3 valence e⁻) creates positive "holes" (p-type!). Joining p-type and n-type creates a p-n Junction Diode & Transistor!',
    ],
    history: {
      era: '1947 Bell Labs (Bardeen, Brattain & Shockley) → 2014 Blue LED Nobel Prize (Akasaki, Amano & Nakamura)',
      protagonist: 'John Bardeen, Walter Brattain & Shuji Nakamura',
      hook: 'How did replacing 1 out of every 1,000,000 Silicon atoms with Boron or Phosphorus create the entire Digital Age?',
      narrative: [
        'In 1947 at Bell Labs, physicists John Bardeen and Walter Brattain were trying to replace fragile, power-hungry glass vacuum tubes with a solid crystal amplifier. By placing gold contacts on a doped Germanium crystal, they invented the Transistor—the tiny switch inside every computer chip, phone and calculator!',
        'Better yet, the Bandgap E_g of a semiconductor directly determines the color of light it emits (in an LED) or absorbs (in a solar cell): Photon Energy E = h·f = (1,240 eV·nm) / λ. Red & Green LEDs existed since the 1960s, but nobody could grow defect-free Gallium Nitride (GaN, E_g = 3.4 eV) for a Blue LED until Materials Engineer Shuji Nakamura solved the crystal growth in the 1990s—enabling white LED lighting and smartphone screens!',
      ],
      takeaway:
        'Every phone, laptop, LED and solar panel is built on what you just learned: valence electrons (CHEM 001), the diamond crystal lattice of silicon (MATE 102), and a tiny, deliberate dose of impurity atoms.',
    },
    csBridge: {
      concept: 'Hardware-to-Software Stack: From Silicon Valence Bandgap (`1.11 eV`) to CMOS Logic Gates',
      analogy:
        'A MOSFET transistor is a voltage-controlled bridge across an `n-p-n` semiconductor sandwich. Applying gate voltage pulls conduction-band electrons into a channel, flipping conductivity by `10^8x` (`Boolean false -> true`)!',
      codeSnippet: `// Electrical Conductivity of a Semiconductor:  sigma = q * (n * mu_e + p * mu_h)
// Photon Wavelength vs Bandgap Energy (Planck's Relation):
function maxAbsorbedWavelengthNm(bandgap_eV) {
  return 1240 / bandgap_eV; // e.g. Silicon (1.11 eV) absorbs light up to 1117 nm (Infrared + Visible)!
}`,
    },
    visualLab: {
      type: 'semiconductor_bandgap_lab',
      title: '3B1B Electronic Band Structure (Metal vs. Semiconductor vs. Insulator) & Doping Simulator',
      instructions:
        'Switch between Copper (Metal), Silicon (Intrinsic vs. n-Type Phosphorus Doped vs. p-Type Boron Doped), and Alumina (Insulator) to watch electrons jump the Bandgap E_g!',
      missionPrompt:
        'Lab Mission: Compare Intrinsic Silicon (E_g = 1.11 eV) with n-Type Phosphorus-doped Silicon.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Extrinsic Doping: n-Type (Group 15 Donor) vs. p-Type (Group 13 Acceptor)',
        formula: '\\text{Si (4 } e^-\\text{)} + \\text{P, As, Sb (5 } e^-\\text{)} \\to n\\text{-type (extra } e^-\\text{)} \\quad | \\quad \\text{Si (4 } e^-\\text{)} + \\text{B, Al, Ga (3 } e^-\\text{)} \\to p\\text{-type (positive hole } h^+\\text{)}',
        explanation:
          'Remember Chem 001! Silicon has 4 valence electrons to share with 4 neighbors. Phosphorus brings 5 valence electrons—4 form covalent bonds, leaving the 5th electron loosely bound just 0.045 eV below the Conduction Band so it conducts immediately at room temperature!',
      },
      {
        title: '2. Optical Absorption & LED Emission (E_g = 1240 eV·nm / λ)',
        formula: 'E_{\\text{photon}} = \\frac{hc}{\\lambda} \\approx \\frac{1240\\text{ eV}\\cdot\\text{nm}}{\\lambda(\\text{nm})}',
        explanation:
          'Why is Window Glass (E_g ≈ 8 eV) transparent to visible light (1.8 to 3.1 eV)? Because visible light photons don’t have enough energy to kick glass electrons across an 8 eV gap—so the light passes straight through! Silicon (E_g = 1.11 eV) absorbs all visible photons (> 1.11 eV), which is why Silicon wafers look opaque metallic gray and make great solar cells!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate401-d1',
          question: 'You dope a pure Silicon crystal (Group 14, 4 valence electrons) with a trace amount of Boron (Group 13, 3 valence electrons). What type of semiconductor is created, and what is the majority charge carrier?',
          options: [
            'p-type semiconductor; majority carriers are positively charged "holes" (missing valence electrons).',
            'n-type semiconductor; majority carriers are negative electrons.',
            'Metallic superconductor.',
            'Ceramic insulator.',
          ],
          correctIndex: 0,
          hint1: 'Boron only has 3 valence electrons, which is 1 fewer than Silicon’s 4.',
          hint2: 'That missing bond creates a mobile positive "hole" (p-type = positive)!',
          explanation: 'Group 13 dopants (Boron, Aluminum, Gallium) accept a valence electron, creating mobile positive holes → p-type semiconductor!',
        },
        {
          id: 'mate401-d2',
          question: 'As you heat a pure (intrinsic) Silicon wafer from 25 °C to 150 °C, what happens to its electrical conductivity, and how does that contrast with heating a Copper wire?',
          options: [
            'Silicon’s conductivity INCREASES exponentially (more electrons are thermally kicked across the bandgap E_g), whereas Copper’s conductivity DECREASES slightly (vibrating atoms scatter electrons).',
            'Both decrease in conductivity.',
            'Silicon becomes an insulator when heated.',
            'Copper has a 5 eV bandgap.',
          ],
          correctIndex: 0,
          hint1: 'In a semiconductor, carrier concentration n ∝ e^(−E_g / 2kT) grows exponentially with temperature T!',
          hint2: 'In a metal, all carriers are already free, so heat only adds lattice vibration (phonon) scattering.',
          explanation: 'This opposite temperature coefficient of resistance is a hallmark test distinguishing Semiconductors from Metals!',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Designing a Gallium Nitride (GaN) Blue-Violet LED',
        scenario:
          'In an LED (Light-Emitting Diode), when a conduction-band electron drops across the bandgap E_g to recombine with a valence-band hole, it emits a photon of wavelength  λ (in nm) = 1240 / E_g (in eV).  If you fabricate an Indium Gallium Nitride (InGaN) LED with a bandgap of E_g = 3.10 eV, what wavelength λ of light does it emit?',
        options: [
          '400 nm (Blue-Violet light)',
          '800 nm (Infrared)',
          '620 nm (Red light)',
          '1,240 nm',
        ],
        correctIndex: 0,
        hint: 'Divide 1240 by 3.10! (Notice 124 ÷ 3.1 = 40, so 1240 ÷ 3.10 = 400).',
        explanation:
          'λ = 1240 eV·nm / 3.10 eV = 400 nm! By tuning the Indium-to-Gallium alloy ratio (Math 002!), Materials Engineers tune E_g to produce every color on your monitor.',
      },
    },
  },

  // ==========================================
  // MODULE 24: MATE 402 (CORROSION ENGINEERING & ASHBY CAPSTONE)
  // ==========================================
  {
    id: 'mate-402',
    code: 'MATE 402',
    termId: 'term-6',
    week: 7,
    daySlot: 'Module 24 • Final Capstone',
    track: 'mate',
    title: 'Final Capstone: Electrochemistry, Corrosion Protection & Ashby Materials Selection',
    subtitle: 'Graduating the Curriculum: Galvanic Cells, Sacrificial Anodes, Faraday’s Law & Selecting the Optimal Material',
    standardMins: 55,
    overtimeMins: 15,
    xpReward: 400,
    prereqIds: ['mate-401'],
    umCourseLink: 'UM BSMTE 3rd/4th-Year Exit Competencies: "Degradation of Materials" & "Materials Selection"',
    overtimeDigest: [
      'Corrosion is electrochemical metallurgy in reverse (ΔG < 0 returning refined metal back to oxide ore!): Oxidation (Anode = loses electrons & dissolves: M → Mⁿ⁺ + ne⁻) + Reduction (Cathode = gains electrons).',
      'Mnemonic: AN OX (Anode = Oxidation = Corrodes) and RED CAT (Reduction = Cathode = Protected). Attaching a more reactive metal like Zinc or Magnesium to a steel ship hull makes Zinc the Sacrificial Anode so the Steel hull becomes the protected Cathode!',
      'Ashby Materials Selection Method: to design a minimum-weight engineering component, combine mechanical equations with density ρ to maximize the Material Performance Index M (e.g., Specific Stiffness M = E / ρ for a tie rod, or M = E^(1/2) / ρ for a light stiff beam)!',
    ],
    history: {
      era: '1824 Royal Navy (Sir Humphry Davy) → 1992 Cambridge (Prof. Michael F. Ashby)',
      protagonist: 'Sir Humphry Davy, Michael Faraday & Prof. Michael Ashby',
      hook: 'How did strapping blocks of Zinc to warship hulls stop the ocean from eating them alive?',
      narrative: [
        'In 1824, the British Royal Navy asked chemist Sir Humphry Davy why the copper sheeting on their wooden warships was rapidly corroding in seawater. Davy realized corrosion was an electrical circuit! By bolting small blocks of Iron or Zinc ("protector blocks") onto the Copper, the Zinc preferentially gave up electrons and dissolved while the Copper remained completely untouched—the birth of Cathodic Protection!',
        'Davy’s assistant, Michael Faraday, then discovered Faraday’s Law of Electrolysis: the exact mass of metal corroded (or electroplated) is directly proportional to the electrical charge Q = I · t divided by the Faraday constant F = 96,485 Coulombs/mol of electrons.',
        'Finally, in the 1990s at Cambridge, Prof. Michael Ashby created the famous Ashby Property Charts (plotting Young’s Modulus E vs. Density ρ on log-log axes from Math 008!), giving Materials Engineers a rigorous, step-by-step method to pick the best material out of 160,000+ options.',
      ],
      takeaway:
        'Look back at your journey from Module 01: you started with (−3)×(−2) = +6 and "What is a proton?", and you are now solving 4th-Year Electrochemistry and Ashby Optimization problems!',
    },
    csBridge: {
      concept: 'Multi-Objective Pareto Optimization (Ashby Charts) & Sacrificial Failover Nodes',
      analogy:
        'Cathodic protection is a sacrificial failover node: Zinc volunteers to take the oxidation load (`Zn -> Zn²⁺ + 2e⁻`) so the primary Steel structure stays at cathodic state. And **Ashby Selection Charts** are log-log Pareto frontiers where slope lines `log(E) = k * log(ρ) + C` rank candidate materials by performance index `M`!',
      codeSnippet: `// Ashby Performance Index for a Light, Stiff Tie-Rod (Maximize M1 = E / rho)
// vs. a Light, Stiff Bending Beam (Maximize M2 = sqrt(E) / rho):
function rankMaterialsForBeam(candidates) {
  return candidates
    .map(m => ({ ...m, beamIndex: Math.sqrt(m.E_GPa) / m.density_g_cm3 }))
    .sort((a, b) => b.beamIndex - a.beamIndex);
}`,
    },
    visualLab: {
      type: 'ashby_corrosion_capstone_lab',
      title: '3B1B Galvanic Corrosion Cell & Ashby Specific-Stiffness Optimizer',
      instructions:
        'Compare Galvanic Anode/Cathode pairings in seawater and rank Steel, Titanium, Aluminum, Alumina Ceramic, and Carbon-Fiber Composite on the Ashby Performance Chart!',
      missionPrompt:
        'Lab Mission: Compare the Ashby Beam Performance Index M = √E / ρ across all 5 engineering materials.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Galvanic Coupling & Cathodic Protection (AN OX / RED CAT)',
        formula: '\\text{Anode (More Active, e.g. Zn): } \\text{Zn} \\to \\text{Zn}^{2+} + 2e^- \\; (\\text{Corrodes}) \\quad | \\quad \\text{Cathode (Steel): Protected!}',
        explanation:
          'When two different metals are electrically connected in an electrolyte (seawater), the more reactive metal (lower standard reduction potential E°: Mg < Zn < Al < Fe < Cu < Ti < Au) becomes the ANODE and corrodes, while supplying electrons that protect the more noble CATHODE! That is why galvanized steel roof sheets in Mindanao are coated in Zinc!',
      },
      {
        title: '2. Faraday’s Law of Corrosion & Electroplating Mass Loss',
        formula: 'm = \\frac{I \\cdot t \\cdot M}{n \\cdot F} \\quad \\text{where } F = 96,485\\text{ C/mol } e^-, \\; Q = I \\cdot t\\text{ (Coulombs)}',
        explanation:
          'Notice how Faraday’s Law is pure Dimensional Analysis (Chem 002) and Stoichiometry (Chem 003): Current × Time gives Coulombs (Q); dividing by F (96,485 C/mol e⁻) gives moles of electrons; dividing by valence n gives moles of metal; multiplying by Molar Mass M gives grams of metal!',
      },
      {
        title: '3. Ashby Materials Selection Performance Indices',
        formula: 'M_{\\text{tie-rod}} = \\frac{E}{\\rho} \\quad | \\quad M_{\\text{beam}} = \\frac{E^{1/2}}{\\rho} \\quad | \\quad M_{\\text{panel}} = \\frac{E^{1/3}}{\\rho}',
        explanation:
          'Notice those fractional exponents from Math 004! For a light, stiff bicycle frame or aircraft wing beam, maximizing E^(1/2) / ρ reveals why Carbon-Fiber Composites, Aluminum, Titanium, and even Wood/Bamboo beat solid Steel on stiffness-per-weight!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate402-d1',
          question: 'In the marine galvanic series, Zinc (−0.76 V) is more active/anodic than Iron/Steel (−0.44 V), while Copper (+0.34 V) is more noble/cathodic than Steel. Why do engineers bolt blocks of Zinc (and NEVER Copper!) onto submerged steel ship hulls and offshore pipelines?',
          options: [
            'Zinc acts as a Sacrificial Anode (oxidizing and supplying electrons to make the steel hull the protected Cathode), whereas bolting Copper to steel would make the STEEL the anode and accelerate steel rusting!',
            'Because Zinc is heavier than Gold.',
            'Because Copper dissolves in air.',
            'Because Zinc is an insulator.',
          ],
          correctIndex: 0,
          hint1: 'Remember AN OX: the metal with the more negative potential becomes the Anode and corrodes.',
          hint2: 'Between Zinc (−0.76 V) and Steel (−0.44 V), Zinc is more negative so Zinc sacrifices itself for Steel!',
          explanation: 'Galvanic protection works by pairing Steel with a more negative metal (Zn or Mg). Pairing Steel with a more positive metal (Cu) reverses the cell and rapidly corrodes the steel around the copper bolts!',
        },
        {
          id: 'mate402-d2',
          question: 'In Chromium electroplating, a charge of Q = I·t = 193,000 Coulombs is passed through a solution of Cr³⁺ ions (so n = 3 electrons per Cr atom, Molar Mass M = 52 g/mol). Taking Faraday’s constant F ≈ 96,500 C/mol e⁻, how many grams of Chromium metal are plated onto the part?  (Formula: m = (Q · M) / (n · F))',
          options: [
            '34.7 grams (since 193,000 / 96,500 = 2 moles of e⁻ → 2/3 mol Cr × 52 g/mol)',
            '104 grams',
            '52 grams',
            '156 grams',
          ],
          correctIndex: 0,
          hint1: 'First find moles of electrons: Q / F = 193,000 ÷ 96,500 = 2.0 moles of electrons.',
          hint2: 'Since each Cr³⁺ ion requires n = 3 electrons, you plate 2/3 mole of Cr: (2/3) × 52 g/mol = 104 / 3 ≈ 34.7 g!',
          explanation: 'Moles of e⁻ = 193,000 / 96,500 = 2.0 mol e⁻. Moles of Cr = 2.0 / 3 = 0.667 mol Cr. Mass = (2/3) × 52 = 34.67 g.',
        },
      ],
      bossProblem: {
        title: 'UM BSMTE Graduation Capstone Boss: Ashby Beam Selection (Steel vs. Carbon-Fiber Composite)',
        scenario:
          'You are selecting the material for an ultra-lightweight drone boom (a bending beam) for a research project at the University of Mindanao. For a light, stiff beam in bending, Ashby’s Performance Index to maximize is  M = √E / ρ,  where E is Young’s Modulus in GPa and ρ is density in g/cm³.\n• Candidate 1 (Structural Steel):  E = 196 GPa,  ρ = 7.84 g/cm³\n• Candidate 2 (Carbon-Fiber Composite):  E = 144 GPa,  ρ = 1.60 g/cm³\nCalculate M = √E / ρ for both candidates and determine which material wins and by what factor!',
        options: [
          'Steel: M = 14 / 7.84 = 1.79  |  Carbon-Fiber Composite: M = 12 / 1.60 = 7.50  →  Carbon-Fiber Composite wins by >4×!',
          'Steel: M = 25.0  |  Carbon-Fiber Composite: M = 7.50  →  Steel wins!',
          'Both have the exact same beam index M = 5.0.',
          'Steel: M = 1.79  |  Carbon-Fiber Composite: M = 0.75  →  Steel wins!',
        ],
        correctIndex: 0,
        hint: 'Take the square roots first (Math 004!): √196 = 14 (since 14×14 = 196), and √144 = 12! Then divide by each density: 14 ÷ 7.84 vs. 12 ÷ 1.60!',
        explanation:
          'For Steel: √196 / 7.84 = 14 / 7.84 = 1.79. For Carbon-Fiber Composite: √144 / 1.60 = 12 / 1.60 = 7.50! Even though Steel has a slightly higher raw stiffness (196 vs 144 GPa), Carbon-Fiber Composite is nearly 5× lighter, giving a Beam Performance Index of 7.50 vs 1.79! Congratulations—you have completed the entire 24-Module UM Materials Engineering Zero-to-One Curriculum!',
      },
    },
  },
];
