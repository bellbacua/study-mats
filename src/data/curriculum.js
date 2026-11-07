import { EXTRA_TERMS, EXTRA_LESSONS } from './extraTermsCurriculum.js';

export const CURRICULUM_TERMS = [
  {
    id: 'term-1',
    title: 'Term 1: The Blank-Canvas Foundation',
    subtitle: 'Arithmetic Mechanics, Atomic Architecture, & Algebraic Restoration',
    description:
      'Self-paced sequential modules with zero calendar deadlines. Alternating Math and Chemistry sessions build your intuition from absolute scratch, culminating in a hands-on Materials Engineering Synthesis Lab.',
  },
  {
    id: 'term-2',
    title: 'Term 2: Spatial Geometry, Bonding & Stoichiometry',
    subtitle: 'Exponents, Linear Systems, Chemical Accounting, & 3D Crystal Lattices',
    description:
      'Bridging elementary manipulation into the exact calculations you will perform in 1st-Year BS Materials Engineering: scientific scales, unit-cell geometry, and chemical reactions.',
  },
  ...EXTRA_TERMS,
];

export const LESSONS = [
  // ==========================================
  // WEEK 1 - MONDAY: MATH 001
  // ==========================================
  {
    id: 'math-001',
    code: 'MATH 001',
    termId: 'term-1',
    week: 1,
    daySlot: 'Module 01',
    track: 'math',
    title: 'Signed Numbers, Zero & Why Negative × Negative = Positive',
    subtitle: 'Rebuilding number sense as directed arrows in space rather than rote rules',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 150,
    prereqIds: [],
    umCourseLink: 'Prep for CEE Calculus 1 & Statics of Rigid Bodies',
    overtimeDigest: [
      'Numbers are not just "counts of apples"—they are directed transformations (arrows) along a line.',
      'Multiplying by a negative number (−1) literally means "rotate the arrow 180° around zero." Do it twice (−1 × −1), and you rotate 360° back to positive (+1).',
      'Order of Operations (PEMDAS) is an agreed rule so everyone gets the same answer: Grouping () → Exponents ^ → Multiply/Divide (left-to-right) → Add/Subtract (left-to-right).',
    ],
    history: {
      era: '628 AD • Ujjain, India & Silk Road Trade',
      protagonist: 'Brahmagupta (Indian Mathematician & Astronomer)',
      hook: 'Why did humans argue for 1,000 years over whether negative numbers even existed?',
      narrative: [
        'For thousands of years, Greek and Roman mathematicians thought "negative numbers" were absurd. How can you hold −3 sheep in your hand? If an equation produced a negative answer, they literally threw the problem away and called it "impossible."',
        'The breakthrough didn’t come from geometry—it came from accounting, debt, and astronomy in India and China. In 628 AD, the Indian mathematician Brahmagupta wrote the Brāhmasphuṭasiddhānta. Instead of thinking about pebbles in a bag, he framed numbers as "Fortunes" (positives), "Debts" (negatives), and "Shunya" (Zero—the neutral balance point).',
        'More importantly, modern visual mathematics (popularized by Argand and Gauss in the 1800s and 3Blue1Brown today) revealed what numbers truly are: actions. "+3" means "slide 3 steps right" or "stretch by 3x." And "−" is not a weird ghostly quantity—it is an instruction to FLIP direction by 180 degrees.',
      ],
      takeaway:
        'Whenever your brain asks "Why does (−a) × (−b) = +ab?", remember: canceling a debt of $5 three times (−3 × −5) makes you $15 richer (+15). Visually, flipping 180° twice brings you right back to facing forward!',
    },
    csBridge: {
      concept: 'Signed Integers, Unary Negation & Operator Precedence',
      analogy:
        'In C/Java/JS, a number has both a magnitude and a sign bit. Think of addition `a + b` as translating a cursor on a 1D canvas, and multiplication `a * b` as scaling the canvas while flipping orientation whenever the sign is negative.',
      codeSnippet: `// Math expression: 12 - 2 * (-3 + 7)^2 / 4
// Your CS brain already knows AST (Abstract Syntax Tree) evaluation order!
const step1_parens = -3 + 7;           // 4   (Parentheses innermost)
const step2_exp    = step1_parens ** 2;// 16  (Exponents next)
const step3_mulDiv = (2 * step2_exp) / 4; // 32 / 4 = 8 (Left-to-right * and /)
const finalResult  = 12 - step3_mulDiv;   // 12 - 8 = 4`,
    },
    visualLab: {
      type: 'number_line_vectors',
      title: '3B1B Vector Transformation Line: Addition as Sliding, Multiplication as Scaling + 180° Rotation',
      instructions:
        'Drag the Base Vector (x) and Multiplier (k). Watch how a negative multiplier physically rotates the space 180° around zero!',
      missionPrompt:
        'Lab Mission: Set Base Vector x = -3 and Multiplier k = -2 so you can watch two 180° flips land on +6.',
      targetState: { x: -3, k: -2 },
    },
    guidedSteps: [
      {
        title: '1. Addition & Subtraction are just Vector Translations',
        formula: '-4 + 7 = +3 \\quad \\text{and} \\quad -4 - 3 = -4 + (-3) = -7',
        explanation:
          'Never think of subtraction as a separate rule. Subtraction is just adding the opposite arrow: a − b is identical to a + (−b). Start at −4 on the number line; adding +7 moves 7 units right (passing 0) to land on +3.',
      },
      {
        title: '2. Multiplication is Scaling + Orientation Flip',
        formula: '(+3) \\times (-4) = -12 \\quad \\text{vs.} \\quad (-3) \\times (-4) = +12',
        explanation:
          'Every minus sign in a product flips the arrow 180°. Count the minus signs: an ODD number of negatives leaves you facing left (negative); an EVEN number of negatives flips you back to facing right (positive).',
      },
      {
        title: '3. The Trap in PEMDAS: Multiplication/Division & Addition/Subtraction are TIES',
        formula: '24 \\div 4 \\times 2 = (24 \\div 4) \\times 2 = 6 \\times 2 = 12 \\quad (\\text{NOT } 24 \\div 8 = 3!)',
        explanation:
          'Many high schoolers think M comes strictly before D, and A strictly before S. False! Multiplication and Division have EQUAL priority (evaluate left-to-right). Addition and Subtraction also have EQUAL priority (left-to-right).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm001-d1',
          question: 'Evaluate step-by-step:  −15 − (−9) + (−4)',
          options: ['−10', '−28', '+20', '−2'],
          correctIndex: 0,
          hint1: 'Rewrite subtracting a negative −(−9) as adding a positive: + 9.',
          hint2: 'Now compute from left to right: (−15 + 9) is −6. Then add (−4).',
          explanation: '−15 − (−9) + (−4) = −15 + 9 − 4 = −6 − 4 = −10.',
        },
        {
          id: 'm001-d2',
          question: 'Beware the exponent sign trap! What is  −3² + (−3)² ?',
          options: ['0', '−18', '+18', '−6'],
          correctIndex: 0,
          hint1: 'In standard math notation, exponents are done before a leading minus sign! So −3² means −(3 × 3), whereas (−3)² means (−3) × (−3).',
          hint2: '−(3²) = −9, and (−3)² = +9. Now add them together.',
          explanation: 'Exponents happen before the minus sign unless parentheses group the minus sign: −3² = −(3×3) = −9, while (−3)² = (−3)(−3) = +9. Their sum is −9 + 9 = 0.',
        },
        {
          id: 'm001-d3',
          question: 'Evaluate using strict operator precedence:  36 ÷ 6 × (−2) − (4 − 10)',
          options: ['−6', '+3', '−18', '+9'],
          correctIndex: 0,
          hint1: 'First evaluate inside the parentheses: (4 − 10) = −6.',
          hint2: 'Next, Division and Multiplication go LEFT-TO-RIGHT: 36 ÷ 6 = 6, then 6 × (−2) = −12. Finally, −12 − (−6).',
          explanation: 'Parentheses: (4 − 10) = −6. Left-to-right ÷ and ×: (36 ÷ 6) × (−2) = 6 × (−2) = −12. Finally: −12 − (−6) = −12 + 6 = −6.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Cryogenic Quenching to Annealing Thermal Cycle',
        scenario:
          'In the UM Metallurgy Lab, an aluminum-lithium alloy sample starts in a liquid nitrogen bath at −196 °C. First, it warms up at a rate of +18 °C per minute for 8 minutes. Then, a furnace boost changes its temperature by −3 × (−40 °C). What is the final temperature of the alloy?',
        options: ['+68 °C', '−52 °C', '+28 °C', '−172 °C'],
        correctIndex: 0,
        hint: 'Write the full expression: Start + (Rate × Time) + FurnaceBoost = −196 + (18 × 8) + (−3 × −40).',
        explanation:
          '18 × 8 = +144 °C. And (−3) × (−40) = +120 °C (two negatives make a positive!). So Final Temp = −196 + 144 + 120 = −52 + 120 = +68 °C.',
      },
    },
  },

  // ==========================================
  // WEEK 1 - TUESDAY: CHEM 001
  // ==========================================
  {
    id: 'chem-001',
    code: 'CHEM 001',
    termId: 'term-1',
    week: 1,
    daySlot: 'Module 02',
    track: 'chem',
    title: 'What Actually IS Matter? Inside the Atom & Valence Shells',
    subtitle: 'Protons, neutrons, electrons, and why the outermost shell dictates if a material is metal, ceramic, or silicon',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 150,
    prereqIds: ['math-001'],
    umCourseLink: 'Prep for UM Chemistry for Engineers & MatE 101 (Atomic Structure)',
    overtimeDigest: [
      'Every material in the universe is built from atoms: a tiny, ultra-heavy nucleus (Protons [+1] + Neutrons [0]) surrounded by a vast cloud of Electrons [−1].',
      'The number of Protons (Atomic Number, Z) is the atom’s permanent ID number—6 protons is ALWAYS Carbon, 14 is ALWAYS Silicon, 29 is ALWAYS Copper.',
      'Chemical and material behavior comes almost entirely from VALENCE ELECTRONS (the electrons in the outermost shell). Atoms want a full outer shell (usually 8 electrons, the Octet Rule).',
    ],
    history: {
      era: '400 BC Greece → 1911 Manchester → 1913 Copenhagen',
      protagonist: 'Democritus, Ernest Rutherford & Niels Bohr',
      hook: 'How did we discover that solid steel is actually 99.9999999% empty space?',
      narrative: [
        'Around 400 BC, the Greek philosopher Democritus asked a simple question: if you cut a piece of copper in half, and then in half again forever, do you eventually hit an uncuttable piece? He called this hypothetical particle "atomos" (uncuttable). For 2,200 years, it remained pure philosophy.',
        'Then in 1909, Ernest Rutherford fired positively charged alpha particles at a sheet of gold foil only a few atoms thick. He expected them to pass straight through like bullets through tissue paper. Instead, 1 in 20,000 ricocheted straight backward! Rutherford said it was "as if you fired a 15-inch artillery shell at tissue paper and it came back and hit you."',
        'Rutherford realized that almost all of an atom’s mass is crushed into a microscopic positive center (the nucleus). If the nucleus were the size of a marble on the 50-yard line of a stadium, the electrons would be gnats buzzing around the top row of seats. Everything in between is empty space held open by electromagnetic force!',
      ],
      takeaway:
        'When you knock your knuckles on a wooden desk or a steel beam, nothing actually "touches"—the negative electron clouds in your hand repel the negative electron clouds of the table!',
    },
    csBridge: {
      concept: 'Primary Keys (Z), Memory Capacities (Shells) & Bitmasks (Valence)',
      analogy:
        'Think of an Element as a class where `protons` (Z) is the immutable primary ID. Electron shells are fixed-capacity buffers: Shell 1 holds max 2 electrons, Shell 2 holds max 8, Shell 3 holds 8 (before d-orbitals). If the outermost buffer isn’t full, the atom has "open ports" ready to bond!',
      codeSnippet: `function analyzeAtom(protons, neutrons, electrons) {
  const atomicNumberZ = protons;        // Defines what element it is (e.g., 14 = Silicon)
  const massNumberA   = protons + neutrons; // Total heavy particles in nucleus
  const netCharge     = protons - electrons; // 0 = neutral atom, != 0 = ion
  // Shell capacities for first 18 elements: [2, 8, 8]
  // Silicon (14 electrons) fills: Shell 1 (2), Shell 2 (8), leaving 4 valence electrons!
  return { atomicNumberZ, massNumberA, netCharge };
}`,
    },
    visualLab: {
      type: 'bohr_orbital_builder',
      title: 'Interactive Atomic Nucleus & Valence Shell Synthesizer',
      instructions:
        'Adjust Protons (Z), Neutrons (N), and Electrons (e⁻). Watch the electron shells populate (2 → 8 → 8) and inspect whether the element behaves as a Conductor, Semiconductor, Insulator, or Noble Gas.',
      missionPrompt:
        'Lab Mission: Build a neutral Silicon (Si) semiconductor atom by setting Protons = 14, Neutrons = 14, and Electrons = 14 (notice its 4 valence electrons!).',
      targetState: { protons: 14, electrons: 14 },
    },
    guidedSteps: [
      {
        title: '1. The Three Subatomic Particles & Charge Balance',
        formula: '\\text{Net Charge } (q) = (\\text{\\# of Protons}) - (\\text{\\# of Electrons})',
        explanation:
          'Protons live in the nucleus with charge +1 and mass ≈ 1 amu. Neutrons live in the nucleus with charge 0 and mass ≈ 1 amu. Electrons orbit outside with charge −1 and negligible mass (1/1836 of a proton). A neutral atom ALWAYS has equal protons and electrons.',
      },
      {
        title: '2. Atomic Number (Z) vs. Mass Number (A) & Isotopes',
        formula: '{}^{A}_{Z}\\text{X} \\implies {}^{56}_{26}\\text{Fe has } Z=26\\text{ protons and } N = 56 - 26 = 30\\text{ neutrons}',
        explanation:
          'If you change the number of protons, you change the element itself. If you change the number of neutrons, you get an ISOTOPE of the same element (same chemical behavior, just slightly heavier or lighter, like Carbon-12 vs. Carbon-14).',
      },
      {
        title: '3. Why Valence Electrons Rule Materials Engineering',
        formula: '\\text{Valence } e^-: \\quad 1\\text{–}3 \\to \\text{Metals (give } e^-) \\quad | \\quad 4 \\to \\text{Semiconductors} \\quad | \\quad 5\\text{–}7 \\to \\text{Nonmetals (take/share } e^-)',
        explanation:
          'Atoms strive for a stable outer shell of 8 electrons (or 2 for the very first shell). Metals like Aluminum (3 valence e⁻) happily donate their loose outer electrons, creating a "sea of electrons" that conducts electricity. Silicon (4 valence e⁻) shares electrons with 4 neighbors, making it the heart of every computer chip and solar cell!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'c001-d1',
          question: 'Titanium (used in aerospace & medical implants) has Atomic Number Z = 22 and a Mass Number A = 48. How many protons and neutrons are in its nucleus?',
          options: [
            '22 protons and 26 neutrons',
            '26 protons and 22 neutrons',
            '22 protons and 48 neutrons',
            '48 protons and 22 neutrons',
          ],
          correctIndex: 0,
          hint1: 'Atomic Number (Z) is always the exact number of protons.',
          hint2: 'Mass Number (A) = Protons + Neutrons. Subtract Z from A to find neutrons.',
          explanation: 'Z = 22 means 22 protons. Neutrons = A − Z = 48 − 22 = 26 neutrons.',
        },
        {
          id: 'c001-d2',
          question: 'An Aluminum atom (Z = 13) loses 3 electrons during anodizing to form an ion. What is the net electrical charge on this Aluminum ion?',
          options: ['+3 (Al³⁺)', '−3 (Al³⁻)', '0 (neutral)', '+10'],
          correctIndex: 0,
          hint1: 'Remember from Math 001: electrons have a NEGATIVE (−1) charge! Losing a negative is like subtracting a negative.',
          hint2: '13 protons (+13) and 10 remaining electrons (−10) gives +13 − 10.',
          explanation: 'A neutral Aluminum atom has 13 protons (+13) and 13 electrons (−13). Losing 3 negative electrons leaves 10 electrons: +13 + (−10) = +3 (written as Al³⁺).',
        },
        {
          id: 'c001-d3',
          question: 'Oxygen has 8 total electrons. Since the 1st shell holds a maximum of 2 electrons, how many valence electrons are in Oxygen’s outer (2nd) shell, and how many more does it need to reach a full octet (8)?',
          options: [
            '6 valence electrons; needs 2 more electrons',
            '8 valence electrons; needs 0 more electrons',
            '4 valence electrons; needs 4 more electrons',
            '2 valence electrons; needs 6 more electrons',
          ],
          correctIndex: 0,
          hint1: 'Subtract the 2 inner-shell electrons from Oxygen’s 8 total electrons.',
          hint2: 'With 6 electrons in Shell 2, how many empty slots remain out of 8?',
          explanation: '8 total electrons − 2 in Shell 1 = 6 valence electrons in Shell 2. To complete its octet of 8, Oxygen aggressively grabs or shares 2 electrons (which is why Oxygen forms O²⁻ in metal oxides/ceramics!).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Designing a Ceramic Oxide Insulator (Al₂O₃)',
        scenario:
          'Alumina (Al₂O₃) is one of the most important engineering ceramics (used in spark plugs, armor plating, and microchip substrates). Aluminum (Z = 13) has 3 valence electrons it wants to give away (forming Al³⁺). Oxygen (Z = 8) has 6 valence electrons and needs 2 more to fill its octet (forming O²⁻). Why is the chemical formula of Alumina specifically Al₂O₃?',
        options: [
          'Because 2 Aluminum ions (2 × +3 = +6) perfectly balance the 6 electrons needed by 3 Oxygen ions (3 × −2 = −6), making net charge 0.',
          'Because Aluminum has 2 shells and Oxygen has 3 shells.',
          'Because 2 + 3 = 5, which is half of 10.',
          'Because Oxygen is heavier than Aluminum by a 3:2 ratio.',
        ],
        correctIndex: 0,
        hint: 'Check total charge conservation using Math 001: 2 × (+3) + 3 × (−2) = ?',
        explanation:
          'Every stable ceramic compound must be electrically neutral overall! Two Al³⁺ ions donate a total of 2 × 3 = 6 electrons (+6 charge), and three O²⁻ ions accept a total of 3 × 2 = 6 electrons (−6 charge). +6 + (−6) = 0!',
      },
    },
  },

  // ==========================================
  // WEEK 1 - WEDNESDAY: MATH 002
  // ==========================================
  {
    id: 'math-002',
    code: 'MATH 002',
    termId: 'term-1',
    week: 1,
    daySlot: 'Module 03',
    track: 'math',
    title: 'Fractions, Ratios & Proportional Scaling Without Fear',
    subtitle: 'Why denominators must match to add, why dividing flips a fraction, and how ratios drive engineering',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 160,
    prereqIds: ['math-001', 'chem-001'],
    umCourseLink: 'Prep for Engineering Stoichiometry, Alloy Compositions & Calculus Algebra',
    overtimeDigest: [
      'A fraction a/b is TWO things at once: (1) a division operation awaiting execution (a ÷ b), and (2) a unit size (1/b) multiplied by a count (a).',
      'You cannot add 1/3 + 1/4 directly for the exact same reason you cannot add 1 meter + 1 foot without converting them to the same unit first! The Common Denominator is just a common grid size (1/12).',
      'Dividing by a fraction (a/b ÷ c/d) means "how many c/d-sized chunks fit inside a/b?" Flipping and multiplying (a/b × d/c) rescales the reference unit to 1.',
    ],
    history: {
      era: '1650 BC • Thebes, Ancient Egypt (The Rhind Mathematical Papyrus)',
      protagonist: 'Ahmes the Scribe & Nile Grain Surveyors',
      hook: 'Why did Egyptians invent fractions when dividing loaves of bread among temple workers?',
      narrative: [
        'Imagine you have 5 loaves of bread and 8 workers building a monument along the Nile. Whole numbers fail you immediately—everyone gets less than 1 loaf. In 1650 BC, an Egyptian scribe named Ahmes wrote the Rhind Mathematical Papyrus, opening with the promise: "Accurate reckoning for inquiring into things, and the knowledge of all things, mysteries...all secrets."',
        ' instead of cutting 5 loaves into 8 pieces each (40 crumbs!), the Egyptians realized you could give each worker half a loaf (taking 4 loaves), and then slice only the LAST loaf into eighths (1/2 + 1/8 = 5/8). That insight—that the same proportion can be sliced into different grid resolutions—is the soul of fractions.',
        'Later, Indian and Islamic mathematicians introduced the horizontal fraction bar (the vinculum) we use today, turning messy Egyptian unit fractions into a clean 2D ratio that powers every engineering formula from stress (σ = F/A) to density (ρ = m/V).',
      ],
      takeaway:
        'Never treat fraction rules like arbitrary magic spells. The denominator (bottom) tells you the SIZE of each slice; the numerator (top) tells you HOW MANY slices you have.',
    },
    csBridge: {
      concept: 'Data Type Resolution, Grid Subdivision & Normalization',
      analogy:
        'Adding `1/3` and `1/4` is like adding two CSS lengths with incompatible units (`1vw + 1rem`). Before the layout engine can sum them, it converts both into a shared base resolution (`12px` grid: `4/12 + 3/12 = 7/12`). Multiplication, however, just scales width × height!',
      codeSnippet: `// Adding fractions: Convert to common grid resolution (b * d)
function addFractions(a, b, c, d) {
  const commonDenominator = b * d;       // Shared grid resolution
  const scaledLeft  = a * d;             // Rescale first fraction
  const scaledRight = c * b;             // Rescale second fraction
  return { numerator: scaledLeft + scaledRight, denominator: commonDenominator };
}`,
    },
    visualLab: {
      type: 'fraction_area_grid',
      title: '3B1B 2D Area Grid: Visual Common Denominators & Multiplication Slicing',
      instructions:
        'Adjust Fraction A and Fraction B. Toggle between Addition (finding the shared 2D grid subdivision) and Multiplication (overlapping area of an A × B rectangle).',
      missionPrompt:
        'Lab Mission: Set Fraction A to 2/3 and Fraction B to 3/4 to see how a 3×4 grid (12 cells) makes both Addition (17/12) and Multiplication (6/12 = 1/2) visually obvious.',
      targetState: { numA: 2, denA: 3, numB: 3, denB: 4 },
    },
    guidedSteps: [
      {
        title: '1. Multiplying by 1 in Disguise (Equivalent Fractions)',
        formula: '\\frac{2}{3} = \\frac{2}{3} \\times 1 = \\frac{2}{3} \\times \\frac{4}{4} = \\frac{8}{12}',
        explanation:
          'Multiplying any quantity by 1 never changes its value. Since 4/4 = 1, multiplying top and bottom by 4 simply subdivides each third into 4 smaller pieces. You have 4× as many pieces (8), each 4× smaller (twelfths).',
      },
      {
        title: '2. Adding & Subtracting: Match the Slice Size First',
        formula: '\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\cdot d}{b \\cdot d} + \\frac{c \\cdot b}{b \\cdot d} = \\frac{ad + bc}{bd}',
        explanation:
          'Never add denominators! If you eat 1/8 of a pizza and then 2/8 of a pizza, you ate 3/8 of a pizza (NOT 3/16). Once denominators match, keep the denominator and add/subtract the numerators.',
      },
      {
        title: '3. Multiplication & Division (Keep-Change-Flip Explained)',
        formula: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd} \\quad \\text{and} \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
        explanation:
          'Why do we flip the second fraction when dividing? Because division is just a complex fraction: (a/b) / (c/d). Multiply the big top and big bottom by (d/c) so the bottom becomes (c/d)×(d/c) = 1! That leaves (a/b) × (d/c) on top.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm002-d1',
          question: 'Compute and simplify to lowest terms:  5/6 − 3/8',
          options: ['11/24', '2/2', '8/14', '19/24'],
          correctIndex: 0,
          hint1: 'What is the smallest number that both 6 and 8 divide into evenly? (Least Common Multiple of 6 and 8 is 24).',
          hint2: '5/6 = (5×4)/(6×4) = 20/24. And 3/8 = (3×3)/(8×3) = 9/24. Now subtract!',
          explanation: 'Using common denominator 24: 5/6 − 3/8 = 20/24 − 9/24 = 11/24.',
        },
        {
          id: 'm002-d2',
          question: 'Simplify the complex fraction (a classic engineering formula setup):  (3/4) ÷ (9/16)',
          options: ['4/3', '27/64', '3/4', '12/9'],
          correctIndex: 0,
          hint1: 'Dividing by 9/16 is identical to multiplying by its reciprocal, 16/9.',
          hint2: '(3/4) × (16/9): cancel 3 with 9 (leaving 1 and 3) and 16 with 4 (leaving 4 and 1).',
          explanation: '(3/4) ÷ (9/16) = (3/4) × (16/9) = 48/36. Divide top and bottom by 12 to get 4/3.',
        },
        {
          id: 'm002-d3',
          question: '18-8 Stainless Steel contains 18% Chromium and 8% Nickel by mass, with the rest being Iron. Express the Chromium-to-Nickel mass ratio as a simplified fraction.',
          options: ['9/4', '18/100', '4/9', '10/8'],
          correctIndex: 0,
          hint1: 'Write the ratio as 18 / 8.',
          hint2: 'Divide both numerator and denominator by their greatest common factor, 2.',
          explanation: '18 / 8 = (18 ÷ 2) / (8 ÷ 2) = 9/4 (or 2.25 parts Chromium for every 1 part Nickel).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Carbon Fiber Composite Rule of Mixtures',
        scenario:
          'You are fabricating a carbon-fiber epoxy composite wing spar. By volume, 3/5 of the composite is Carbon Fiber (stiffness E_f = 250 GPa) and the remaining 2/5 is Epoxy Matrix (stiffness E_m = 5 GPa). The composite stiffness is given by the Rule of Mixtures: E_c = (3/5) × E_f + (2/5) × E_m. What is the composite stiffness E_c?',
        options: ['152 GPa', '102 GPa', '255 GPa', '150 GPa'],
        correctIndex: 0,
        hint: 'Calculate (3/5) × 250 first, then add (2/5) × 5.',
        explanation:
          '(3/5) × 250 = 3 × (250 ÷ 5) = 3 × 50 = 150 GPa. And (2/5) × 5 = 2 GPa. Total stiffness E_c = 150 + 2 = 152 GPa!',
      },
    },
  },

  // ==========================================
  // WEEK 1 - THURSDAY: CHEM 002
  // ==========================================
  {
    id: 'chem-002',
    code: 'CHEM 002',
    termId: 'term-1',
    week: 1,
    daySlot: 'Module 04',
    track: 'chem',
    title: 'Dimensional Analysis: Treating Units Like Algebraic Fractions',
    subtitle: 'How one simple fraction-cancellation trick solves 50% of all Chemistry & Engineering problems',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 165,
    prereqIds: ['math-002'],
    umCourseLink: 'Core survival skill for UM Chemistry for Engineers, Physics 1 & Thermodynamics',
    overtimeDigest: [
      'Units (grams, meters, seconds, moles) obey the EXACT same cancellation laws as fractions in Math 002: (m / s) × s = m.',
      'To convert any unit, multiply by a "Conversion Factor"—a fraction equal to 1 where the unit you want to kill is on the opposite side (top vs. bottom).',
      'Watch out for 2D/3D units! Because 1 m = 100 cm, 1 m³ is NOT 100 cm³—it is (100 cm)³ = 1,000,000 cm³!',
    ],
    history: {
      era: '1799 French Revolution → 1999 NASA Mars Climate Orbiter Disaster',
      protagonist: 'Antoine Lavoisier & The Metric Commission',
      hook: 'How did forgetting to cancel one unit fraction destroy a $327 million NASA spacecraft?',
      narrative: [
        'Before the French Revolution in 1790, France alone had over 250,000 different local units of weight and length. A "foot" or "pound" changed from one village to the next, making science and fair trade a nightmare. The great chemist Antoine Lavoisier helped design a decimal system based on powers of 10 (kilo = 1000, milli = 1/1000)—the Metric (SI) System.',
        'In 1822, the French physicist Joseph Fourier realized something profound: physical equations aren’t just numbers—the UNITS on the left and right sides must match, and units multiply and divide just like algebraic symbols.',
        'Ignoring this rule is fatal in engineering. In 1999, NASA lost the $327.6 million Mars Climate Orbiter because one software team output thruster impulse in Pound-force seconds (Imperial) while the navigation software expected Newton-seconds (Metric). The spacecraft dove too low into the Martian atmosphere and disintegrated.',
      ],
      takeaway:
        'In Materials Engineering, never write a bare number without its unit! If you track your units as fractions and cancel them step-by-step, the units themselves will tell you whether you should multiply or divide.',
    },
    csBridge: {
      concept: 'Static Type Checking & Pipeline Adapters',
      analogy:
        'Dimensional analysis is literally a strongly-typed function pipeline: `Pipe<Grams, Moles> -> Pipe<Moles, Atoms>`. If the output type of Stage 1 doesn’t cancel the denominator input type of Stage 2, your equation throws a compile-time TypeError!',
      codeSnippet: `// Converting Titanium density: 4.5 g/cm³ -> kg/m³
// Goal: Kill 'g' (put g on bottom), Kill 'cm³' (put cm³ on top)
const density_g_cm3 = 4.5;
const g_to_kg   = 1 / 1000;          // (1 kg / 1000 g) -> cancels 'g'
const cm3_to_m3 = (100 ** 3) / 1;    // (100 cm / 1 m)³ = 1,000,000 cm³ / 1 m³ -> cancels 'cm³'
const density_kg_m3 = density_g_cm3 * g_to_kg * cm3_to_m3; // 4500 kg/m³`,
    },
    visualLab: {
      type: 'dimensional_pipeline',
      title: 'Interactive Unit-Cancellation Pipeline (Type-Safe Engineering Converter)',
      instructions:
        'Flip each conversion card (Top ⇄ Bottom) until every intermediate unit cancels out (turns green), leaving only the target engineering unit!',
      missionPrompt:
        'Lab Mission: Orient the two conversion cards properly to convert Iron’s density from 7.87 g/cm³ into 7,870 kg/m³.',
      targetState: { card1Flipped: false, card2Flipped: false, solved: true },
    },
    guidedSteps: [
      {
        title: '1. The Golden Rule of Unit Cancellation',
        formula: '\\text{Start Unit} \\times \\left(\\frac{\\text{Target Unit}}{\\text{Start Unit}}\\right) = \\text{Target Unit}',
        explanation:
          'Since 1 kg = 1,000 g, the fraction (1 kg / 1,000 g) equals 1. If you start with 2,500 g, put "1,000 g" on the BOTTOM so the "g" on top and "g" on bottom cancel out: 2,500 g × (1 kg / 1,000 g) = 2.5 kg.',
      },
      {
        title: '2. Essential Metric Prefixes Every Materials Engineer Must Know Cold',
        formula: '\\text{Giga (G)} = 10^9 \\; | \\; \\text{Mega (M)} = 10^6 \\; | \\; \\text{kilo (k)} = 10^3 \\; | \\; \\text{milli (m)} = 10^{-3} \\; | \\; \\text{micro (}\\mu\\text{)} = 10^{-6} \\; | \\; \\text{nano (n)} = 10^{-9}',
        explanation:
          'You will measure material strength in Megapascals (MPa) and Gigapascals (GPa), grain sizes in micrometers (μm), and crystal lattice spacings in nanometers (nm).',
      },
      {
        title: '3. The Cubic Volume Trap (Why 1 m³ = 1,000,000 cm³)',
        formula: '1\\text{ m} = 100\\text{ cm} \\implies (1\\text{ m})^3 = (100\\text{ cm})^3 = 100^3\\text{ cm}^3 = 1,000,000\\text{ cm}^3',
        explanation:
          'Imagine a 1m × 1m × 1m cube. It is 100 cm wide, 100 cm deep, and 100 cm tall. So it holds 100 × 100 × 100 = 1,000,000 little 1-cm³ cubes! Quick shortcut: multiplying g/cm³ by 1,000 always gives kg/m³.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'c002-d1',
          question: 'A carbon nanotube has a diameter of 1.5 nanometers (nm). Given that 1 m = 1,000,000,000 nm (10⁹ nm) and 1 m = 1,000 mm, how many millimeters (mm) wide is the nanotube?',
          options: [
            '0.0000015 mm (1.5 × 10⁻⁶ mm)',
            '1,500,000 mm',
            '0.0015 mm',
            '1.5 × 10⁻⁹ mm',
          ],
          correctIndex: 0,
          hint1: 'Chain the units: 1.5 nm × (1 m / 10⁹ nm) × (1,000 mm / 1 m).',
          hint2: '1,000 / 1,000,000,000 = 1 / 1,000,000 (move the decimal 6 places left).',
          explanation: '1.5 nm × (1 m / 10⁹ nm) × (10³ mm / 1 m) = 1.5 × 10⁻⁶ mm = 0.0000015 mm.',
        },
        {
          id: 'c002-d2',
          question: 'Silicon has a density of 2.33 g/cm³. What is the mass in kilograms (kg) of a Silicon wafer boules cylinder with a volume of 4,000 cm³?',
          options: ['9.32 kg', '9,320 kg', '0.5825 kg', '1.71 kg'],
          correctIndex: 0,
          hint1: 'Start with 4,000 cm³ and multiply by (2.33 g / 1 cm³) so cm³ cancels out.',
          hint2: 'That gives 9,320 g. Now multiply by (1 kg / 1,000 g) so g cancels out!',
          explanation: '4,000 cm³ × (2.33 g / 1 cm³) × (1 kg / 1,000 g) = 9,320 / 1,000 = 9.32 kg.',
        },
        {
          id: 'c002-d3',
          question: 'How many square millimeters (mm²) are in 1 square centimeter (cm²)? (Remember: 1 cm = 10 mm)',
          options: ['100 mm²', '10 mm²', '1,000 mm²', '0.1 mm²'],
          correctIndex: 0,
          hint1: 'Don’t forget to square the number when you square the unit!',
          hint2: '(1 cm)² = (10 mm)² = 10² mm².',
          explanation: 'A 1 cm × 1 cm square is 10 mm wide by 10 mm tall, so its area is 10 mm × 10 mm = 100 mm².',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Tensile Testing Stress Conversion (N/mm² to MPa)',
        scenario:
          'In the UM Universal Testing Machine (UTM) lab, you pull a steel rod with a cross-sectional area of 50 mm² until it yields at a force of 20,000 Newtons (N). Stress is Force ÷ Area (σ = F / A). Given that 1 Pascal (Pa) = 1 N/m² and 1 Megapascal (MPa) = 1,000,000 Pa, what is the yield stress in MPa?',
        options: ['400 MPa', '40 MPa', '4,000 MPa', '0.4 MPa'],
        correctIndex: 0,
        hint: 'First compute σ in N/mm²: 20,000 N ÷ 50 mm² = 400 N/mm². Now convert mm² to m²: since 1 m = 1,000 mm, 1 m² = (1,000)² mm² = 1,000,000 mm²!',
        explanation:
          '20,000 N / 50 mm² = 400 N/mm². Converting to N/m²: 400 N/mm² × (1,000,000 mm² / 1 m²) = 400,000,000 Pa = 400 MPa! (Pro Engineering Tip: 1 N/mm² is ALWAYS equal to 1 MPa because the 10⁶ from mm²→m² and the 10⁶ in Mega cancel each other out!).',
      },
    },
  },

  // ==========================================
  // WEEK 1 - FRIDAY: MATH 003
  // ==========================================
  {
    id: 'math-003',
    code: 'MATH 003',
    termId: 'term-1',
    week: 1,
    daySlot: 'Module 05',
    track: 'math',
    title: 'Why Was Algebra Invented? Al-Jabr & Linear Equations',
    subtitle: 'From Baghdad inheritance puzzles to isolating unknown engineering variables without memorizing tricks',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 175,
    prereqIds: ['chem-002'],
    umCourseLink: 'Direct foundation for all UM Engineering Math, Statics & Thermodynamics equations',
    overtimeDigest: [
      'Algebra was NOT invented to torture students with letters—it was invented so you can write one general method once instead of re-solving 1,000 arithmetic word problems by trial and error.',
      'The Arabic word "Al-Jabr" literally means "restoration" (moving a negative/broken debt to the other side of an equation to make it positive and whole).',
      'To isolate x, just run PEMDAS in reverse (SADMEP): undo Addition/Subtraction first, then undo Multiplication/Division.',
    ],
    history: {
      era: '820 AD • The House of Wisdom, Baghdad',
      protagonist: 'Muhammad ibn Musa al-Khwarizmi (Father of Both "Algorithm" and "Algebra")',
      hook: 'How did one book written in 9th-century Baghdad give us both the word "algebra" and the word "algorithm"?',
      narrative: [
        'Two everyday words come from one man in 9th-century Baghdad: Al-Khwarizmi. When his Latinized name ("Algoritmi") was attached to step-by-step calculation procedures, it became the English word "Algorithm."',
        'In 820 AD, Caliph al-Ma’mun asked Al-Khwarizmi to write a practical manual to help merchants, surveyors, and judges solve land-division and inheritance disputes. Before him, people solved problems by guessing numbers and adjusting them. Al-Khwarizmi wrote "Kitab al-Jabr wal-Muqabala" (The Compendious Book on Calculation by Completion/Restoration and Balancing).',
        'He named the unknown quantity "shay\'" (Arabic for "the thing"). When Spanish translators in Toledo translated "shay\'" into Old Spanish "xay", they abbreviated it to its first letter: "x"! And "Al-Jabr" (restoring a subtracted quantity by adding it to both sides of the scale) became the word "Algebra."',
      ],
      takeaway:
        'You already use algebra whenever you work backwards: “3 coffees and a 4-peso cookie cost 19 pesos, so each coffee was 5.” Solving for x just means undoing the steps to recover the unknown.',
    },
    csBridge: {
      concept: 'Referential Transparency & Inverse Function Unwrapping',
      analogy:
        'An equation `3x - 12 = 18` is an assertion `leftSide === rightSide`. As long as you apply the exact same pure function `f(side)` to BOTH sides of the equality, the assertion remains true! To isolate `x`, unwrap the operations in reverse stack order (LIFO).',
      codeSnippet: `// Forward stack applied to x:  x -> (* 3) -> (- 12) === 18
// To isolate x, pop the stack in reverse (LIFO) using inverse operators:
let rhs = 18;
rhs = rhs + 12; // Al-Jabr (Restoration): undo (- 12) -> rhs is now 30
rhs = rhs / 3;  // Al-Muqabala (Scaling): undo (* 3)  -> x === 10`,
    },
    visualLab: {
      type: 'algebra_balance_beam',
      title: 'Al-Khwarizmi’s Interactive Al-Jabr & Al-Muqabala Balance Scale',
      instructions:
        'Apply symmetric operations to both sides of the equation scale (+c, −c, ×c, ÷c) until the unknown x stands completely alone on the left pan!',
      missionPrompt:
        'Lab Mission: Isolate x in the interactive equation solver by applying Al-Jabr (adding constants) and scaling (dividing by the coefficient of x).',
      targetState: { isolated: true },
    },
    guidedSteps: [
      {
        title: '1. Al-Jabr (Restoration) & Al-Muqabala (Balancing)',
        formula: '4x - 15 = x + 6 \\xrightarrow{+15\\text{ both sides}} 4x = x + 21 \\xrightarrow{-x\\text{ both sides}} 3x = 21 \\xrightarrow{\\div 3} x = 7',
        explanation:
          'People often say "move −15 to the other side and flip its sign." That’s just a shortcut for Al-Jabr: adding +15 to BOTH sides so −15 + 15 = 0 on the left, and +15 appears on the right!',
      },
      {
        title: '2. Clearing Fractions Instantly (The LCD Multiplier Trick)',
        formula: '\\frac{x}{3} + \\frac{x}{4} = 7 \\xrightarrow{\\text{Multiply EVERY term by } 12} 12\\left(\\frac{x}{3}\\right) + 12\\left(\\frac{x}{4}\\right) = 12(7) \\implies 4x + 3x = 84',
        explanation:
          'Hate fractions in an equation? Kill them on Line 1! Multiply both sides of the entire equation by the Least Common Denominator (12). Since 12/3 = 4 and 12/4 = 3, the fractions vanish into clean integers: 7x = 84 → x = 12.',
      },
      {
        title: '3. Literal Equations (Rearranging Engineering Formulas Before Plugging In Numbers)',
        formula: '\\sigma = \\frac{F}{A} \\implies A \\cdot \\sigma = F \\implies A = \\frac{F}{\\sigma}',
        explanation:
          'In Materials Engineering, you might know the maximum safe stress (σ) and the load force (F), and need the required cross-sectional area (A). Rearrange the symbols FIRST using the exact same rules as numbers!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm003-d1',
          question: 'Solve for x:   5(2x − 3) = 4x + 9',
          options: ['x = 4', 'x = 2', 'x = −1', 'x = 6'],
          correctIndex: 0,
          hint1: 'First distribute the 5 on the left side: 5(2x) − 5(3) = 10x − 15.',
          hint2: 'Now solve 10x − 15 = 4x + 9: add 15 to both sides and subtract 4x from both sides to get 6x = 24.',
          explanation: '10x − 15 = 4x + 9 → 10x − 4x = 9 + 15 → 6x = 24 → x = 4.',
        },
        {
          id: 'm003-d2',
          question: 'Clear the fractions and solve for x:   (x / 2) − (x / 5) = 6',
          options: ['x = 20', 'x = 10', 'x = 30', 'x = 12'],
          correctIndex: 0,
          hint1: 'Multiply every term on both sides by the common denominator of 2 and 5, which is 10.',
          hint2: '10(x/2) − 10(x/5) = 10(6) gives 5x − 2x = 60.',
          explanation: 'Multiplying by 10: 5x − 2x = 60 → 3x = 60 → x = 20. Check: (20/2) − (20/5) = 10 − 4 = 6!',
        },
        {
          id: 'm003-d3',
          question: 'Thermal expansion of a bridge beam is given by  L_final = L_0 + α · ΔT.  Rearrange this formula to solve for the temperature change ΔT.',
          options: [
            'ΔT = (L_final − L_0) / α',
            'ΔT = L_final / α − L_0',
            'ΔT = α / (L_final − L_0)',
            'ΔT = (L_final + L_0) × α',
          ],
          correctIndex: 0,
          hint1: 'Treat ΔT as your target x! First undo the addition of L_0 by subtracting L_0 from both sides.',
          hint2: 'That gives L_final − L_0 = α · ΔT. Now undo the multiplication by α!',
          explanation: 'Subtract L_0 from both sides: L_final − L_0 = α · ΔT. Divide both sides by α: ΔT = (L_final − L_0) / α.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Lever Rule for Steel Phase Diagrams',
        scenario:
          'When cooling molten solder or steel, Materials Engineers use the "Lever Rule" to find the fraction of solid crystals (f_s). Suppose a bronze alloy satisfies the balance equation:  12 · f_s + 4 · (1 − f_s) = 10.  Solve for the solid fraction f_s!',
        options: ['f_s = 3/4 (or 0.75)', 'f_s = 1/2 (or 0.50)', 'f_s = 2/3', 'f_s = 1/4 (or 0.25)'],
        correctIndex: 0,
        hint: 'Distribute the 4: 12·f_s + 4 − 4·f_s = 10. Combine the f_s terms!',
        explanation:
          '12·f_s + 4 − 4·f_s = 10 → 8·f_s + 4 = 10 → subtract 4 from both sides: 8·f_s = 6 → f_s = 6/8 = 3/4 (75% of the alloy has crystallized into solid!).',
      },
    },
  },

  // ==========================================
  // WEEK 1 - SATURDAY: MATE 100 (SYNTHESIS LAB)
  // ==========================================
  {
    id: 'mate-100',
    code: 'MATE 100',
    termId: 'term-1',
    week: 1,
    daySlot: 'Module 06 • Lab',
    track: 'mate',
    title: 'Synthesis Lab: Why Do Atoms Bond & Why Do Materials Expand?',
    subtitle: 'Uniting Term 1 Math & Chem through the Lennard-Jones Interatomic Energy Curve',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 250,
    prereqIds: ['math-003'],
    umCourseLink: 'Direct Preview of UM BSMTE 1st-Year "Fundamentals of Materials Engineering"',
    overtimeDigest: [
      'Two atoms are simultaneously pulled together by opposite-charge attraction (+) and pushed apart by electron-cloud overlap repulsion (−).',
      'The sweet spot where Attraction + Repulsion = 0 net force is the Equilibrium Bond Length (r₀), which sits at the bottom of an Energy Well (depth E₀).',
      'Deep energy well (large E₀) = high melting point & stiff material (Ceramics, Tungsten). Shallow well = low melting point & soft material (Polymers, Lead).',
    ],
    history: {
      era: '1924 • Trinity College, Cambridge',
      protagonist: 'Sir John Lennard-Jones (Pioneer of Computational Chemistry & Molecular Physics)',
      hook: 'Why doesn’t gravity or electrostatic attraction crush all matter into a black hole—and why don’t atoms just fly apart?',
      narrative: [
        'In 1924, John Lennard-Jones wanted a single mathematical curve that could explain why gases condense into liquids and why solids have a fixed stiffness and melting point.',
        'He realized two atoms experience a tug-of-war: at medium distances, their valence electrons attract the other atom’s positive nucleus (pulling them together). But if you shove them too close, their inner negative electron shells overlap and fiercely repel each other (Pauli Exclusion + electrostatic repulsion).',
        'That single asymmetric curve—the Lennard-Jones Potential—is page 25 of Callister’s Materials Science textbook at UM. From the shape of that one curve, you can predict whether a material will melt at 100 °C or 3,000 °C, how stiff it is, and why bridges expand in the Davao sun!',
      ],
      takeaway:
        'Look at how everything you learned this week comes together here: signed forces (+ attraction vs. − repulsion from Math 001), valence electrons (Ionic/Covalent/Metallic from Chem 001),纳米/picometer units (Chem 002), and balancing forces to zero (Algebra from Math 003)!',
    },
    csBridge: {
      concept: 'Physics Engine Equilibrium & Gradient Descent to a Local Minimum',
      analogy:
        'Think of two atoms as particles in a game physics engine. Total potential energy `E(r) = E_repulsive(r) + E_attractive(r)` has a local minimum well at `r = r0`. The atom settles at the bottom of the energy valley just like gradient descent finding minimum loss!',
      codeSnippet: `// Lennard-Jones Potential Energy between two atoms at distance r:
// E(r) = A / r^12 (short-range repulsion) - B / r^6 (long-range attraction)
function netAtomicForce(r, r0) {
  if (r < r0) return "REPULSIVE (Pushed too close! Electron shells overlap)";
  if (r > r0) return "ATTRACTIVE (Pulled back together by chemical bond)";
  return "EQUILIBRIUM (Net Force = 0, sitting at bottom of Energy Well E0)";
}`,
    },
    visualLab: {
      type: 'bonding_energy_well',
      title: '3B1B Interatomic Energy Well Explorer (Metals vs. Ceramics vs. Polymers)',
      instructions:
        'Drag the interatomic distance slider (r) to push two atoms together or pull them apart, and switch between Ceramic (Al₂O₃), Metal (Fe), and Polymer (PE) to compare their energy well depth (E₀)!',
      missionPrompt:
        'Lab Mission: Drag the atomic separation r into the equilibrium sweet spot (r₀ ≈ 0.25 nm) and inspect all 3 material classes.',
      targetState: { exploredEquilibrium: true },
    },
    guidedSteps: [
      {
        title: '1. The Three Primary Bonds Compared',
        formula: 'E_0(\\text{Ceramic Ionic/Covalent}) > E_0(\\text{Metallic}) \\gg E_0(\\text{Polymer Secondary Bonds})',
        explanation:
          '1) IONIC (Ceramics like NaCl, Al₂O₃): Metal donates valence e⁻ to Nonmetal → huge electrostatic attraction, deep energy well, high melting point, brittle.\n2) COVALENT (Diamond, Silicon, Polymer backbones): Atoms share valence e⁻.\n3) METALLIC (Iron, Copper, Aluminum): Valence e⁻ form a delocalized "sea", letting atoms slide past each other without shattering (ductile!) and conduct electricity.',
      },
      {
        title: '2. Equilibrium Bond Length (r₀) and Bond Energy (E₀)',
        formula: 'F_{\\text{net}} = F_{\\text{attractive}} + F_{\\text{repulsive}} = 0 \\iff r = r_0',
        explanation:
          'At distance r₀, the attractive pull and repulsive push have equal magnitude and opposite signs (+F + (−F) = 0). The energy required to rip the two atoms completely apart from r₀ to infinity is the Bond Energy E₀.',
      },
      {
        title: '3. Why Materials Expand When Heated (Asymmetry of the Curve!)',
        formula: 'T \\uparrow \\implies \\text{Atoms vibrate wider in an asymmetric valley} \\implies r_{\\text{average}} > r_0',
        explanation:
          'Notice in the visual lab that the left wall of the energy valley (repulsion) is super steep, while the right wall (attraction) is gentle. When you heat a solid, atoms vibrate back and forth. Because it’s much easier to stretch right than compress left, their average distance shifts right—and the whole material expands!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate100-d1',
          question: 'Tungsten has a huge interatomic bond energy (E₀ = 849 kJ/mol, deep energy well), whereas Mercury has a tiny bond energy (E₀ = 68 kJ/mol, shallow energy well). What can you immediately predict at room temperature?',
          options: [
            'Tungsten has an extremely high melting point (3,422 °C) and high stiffness, while Mercury is already melted into a liquid.',
            'Mercury is stiffer and harder to melt than Tungsten.',
            'Both materials have the exact same melting temperature.',
            'Tungsten expands 100× more than Mercury when heated.',
          ],
          correctIndex: 0,
          hint1: 'Remember that melting requires adding enough thermal energy (heat) to break atoms out of their potential energy well E₀.',
          hint2: 'A deeper well (849 vs. 68 kJ/mol) requires much higher temperature to overcome!',
          explanation: 'Depth of the energy well (E₀) directly governs melting temperature and stiffness (Young’s Modulus). Tungsten’s deep well gives it the highest melting point of any pure metal!',
        },
        {
          id: 'mate100-d2',
          question: 'Why can you hammer a sheet of Copper (Metallic bond) into a thin wire without it shattering, whereas hitting a ceramic coffee mug (Ionic/Covalent bond) shatters it?',
          options: [
            'In metallic bonds, the non-directional "sea of valence electrons" acts like an electrical cushion when atoms slide; in ionic ceramics, sliding shifts like charges (+ next to +) into alignment, causing instant repulsion and fracture.',
            'Because Copper atoms have no protons in their nuclei.',
            'Because ceramics are made of liquid atoms.',
            'Because Copper has a zero bond energy.',
          ],
          correctIndex: 0,
          hint1: 'Think about what happens when a row of alternating (+)(−)(+)(−) ceramic ions shifts by one atomic spacing.',
          hint2: '(+) lines up with (+) and (−) lines up with (−)—from Math 001 & Chem 001, like charges violently repel!',
          explanation: 'Metallic bonds are non-directional (the electron sea adapts smoothly as atomic planes slip). Ionic bonds lock + and − ions into a strict checkerboard; shifting by half a lattice unit forces + against +, snapping the crystal apart.',
        },
        {
          id: 'mate100-d3',
          question: 'At the equilibrium bond spacing r₀, the attractive force pulling two Iron atoms together is +4.2 nanoNewtons (nN). What is the repulsive force at that exact distance, and what is the net force?',
          options: [
            'Repulsive force = −4.2 nN; Net Force = 0 nN',
            'Repulsive force = +4.2 nN; Net Force = +8.4 nN',
            'Repulsive force = 0 nN; Net Force = +4.2 nN',
            'Repulsive force = −8.4 nN; Net Force = −4.2 nN',
          ],
          correctIndex: 0,
          hint1: 'Equilibrium means the net force is zero.',
          hint2: '+4.2 nN + F_repulsive = 0 → F_repulsive = −4.2 nN.',
          explanation: 'At r = r₀, attraction and repulsion balance perfectly: (+4.2 nN) + (−4.2 nN) = 0 nN.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Hooke’s Law of Atomic Springs',
        scenario:
          'For small stretches near the bottom of the energy well, the bond between two atoms acts like a microscopic linear spring:  F = k · (r − r₀),  where r₀ = 0.25 nm is the equilibrium spacing and k = 200 N/m is the bond stiffness. If a tensile load pulls the atoms to a distance r = 0.265 nm, what is the restoring force F in nanoNewtons (nN)? (Note: 1 nm × 1 N/m = 1 nN).',
        options: ['3.0 nN', '30 nN', '0.3 nN', '53 nN'],
        correctIndex: 0,
        hint: 'First find the stretch Δr = r − r₀ = 0.265 nm − 0.250 nm = 0.015 nm. Then multiply by k = 200 N/m!',
        explanation:
          'Δr = 0.265 − 0.250 = 0.015 nm. Multiplying by k = 200 N/m gives F = 200 × 0.015 = 3.0 nN!',
      },
    },
  },

  // ==========================================
  // WEEK 2 - MONDAY: MATH 004
  // ==========================================
  {
    id: 'math-004',
    code: 'MATH 004',
    termId: 'term-2',
    week: 2,
    daySlot: 'Module 07',
    track: 'math',
    title: 'Exponents, Roots & Scientific Notation Across 18 Orders of Magnitude',
    subtitle: 'Why exponents add when multiplying, why x⁰ = 1, and how fractional powers are just roots',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 180,
    prereqIds: ['mate-100'],
    umCourseLink: 'Essential for Calculus Derivatives, Avogadro’s Number & Arrhenius Diffusion',
    overtimeDigest: [
      'Exponents count how many times you multiply by a base (starting from 1): x³ = 1 × x × x × x. That is why x⁰ = 1 (zero multiplications leaves the starting 1) and x⁻ⁿ = 1/xⁿ (dividing instead of multiplying!).',
      'Fractional exponents are roots in disguise: x^(1/2) = √x and x^(1/3) = ∛x. In Calculus, you will ALWAYS rewrite √x as x^(1/2).',
      'Scientific notation (a × 10ⁿ) lets you multiply giant and microscopic numbers in your head by adding their powers of 10: (2 × 10²³) × (3 × 10⁻⁹) = 6 × 10¹⁴.',
    ],
    history: {
      era: '220 BC Syracuse (Archimedes) → 1637 Leiden (René Descartes)',
      protagonist: 'Archimedes ("The Sand Reckoner") & René Descartes',
      hook: 'How did Archimedes prove to the King of Syracuse that you could write a number larger than all the grains of sand in the universe?',
      narrative: [
        'In Ancient Greece, people believed the number of grains of sand on Earth was literally infinite—too large for any notation to express. Around 220 BC, Archimedes wrote a brilliant treatise called "The Sand Reckoner" to King Gelon II. He invented a system of nested powers of 10,000×10,000 (10⁸), proving that even if you filled the entire cosmos with sand, it would take at most 10⁶³ grains!',
        'Nearly 1,800 years later, the French philosopher-mathematician René Descartes introduced the modern superscript notation (x², x³) in his 1637 book La Géométrie, while John Wallis and Isaac Newton showed that negative and fractional exponents (x⁻¹ = 1/x, x^(1/2) = √x) obey the exact same additive pattern.',
        'In Materials Engineering, you jump from atomic radii (10⁻¹⁰ m) to Avogadro’s number of atoms (6.022 × 10²³) in a single line of calculation. Without exponent laws, your calculator display would overflow immediately.',
      ],
      takeaway:
        'Exponents turn hard operations into easy ones: they turn Multiplication into Addition (xᵃ · xᵇ = xᵃ⁺ᵇ) and Division into Subtraction (xᵃ / xᵇ = xᵃ⁻ᵇ)!',
    },
    csBridge: {
      concept: 'Bit-Shifting (`2 << n`), Floating-Point Mantissa/Exponent & Loop Unrolling',
      analogy:
        'Scientific notation `6.022 × 10²³` is literally how IEEE 754 floating-point numbers (`float64`) are stored in CPU registers: a normalized significand/mantissa (`6.022`) and a base-exponent (`23`)!',
      codeSnippet: `// Why x^0 === 1 and x^(-n) === 1 / x^n:
// Start from identity element 1:
// x^3 = 1 * x * x * x
// x^2 = 1 * x * x       (divide by x)
// x^1 = 1 * x           (divide by x)
// x^0 = 1               (divide by x -> x/x = 1!)
// x^-1 = 1 / x          (divide by x again!)
// x^(a + b) === (x^a) * (x^b)`,
    },
    visualLab: {
      type: 'exponent_growth_scaler',
      title: '3B1B Powers-of-10 Scale Navigator & Fractional Exponent Morph',
      instructions:
        'Scrub across 33 orders of magnitude in Materials Engineering (from subatomic picometers to Avogadro’s mole scale) and test how multiplying powers of 10 simply slides the exponent!',
      missionPrompt:
        'Lab Mission: Slide the Exponent Explorer to compare the Atomic Scale (10⁻¹⁰ m) and Avogadro Scale (10²³) or test the Exponent Multiplier.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. The Three Core Laws of Exponents',
        formula: 'x^a \\cdot x^b = x^{a+b} \\quad | \\quad \\frac{x^a}{x^b} = x^{a-b} \\quad | \\quad (x^a)^b = x^{a \\cdot b}',
        explanation:
          'When bases match: multiplying adds the exponents (x² · x⁵ = x⁷); dividing subtracts the exponents (x⁵ / x² = x³); raising a power to a power multiplies the exponents ((x²)³ = x⁶).',
      },
      {
        title: '2. Zero & Negative Exponents (No Mystery!)',
        formula: 'x^0 = 1 \\; (x \\neq 0) \\quad \\text{and} \\quad x^{-n} = \\frac{1}{x^n}',
        explanation:
          'A negative exponent is NEVER a negative number! It just means "I belong on the other side of the fraction bar." So 10⁻³ = 1 / 10³ = 1/1000 = 0.001, and 1 / x⁻⁴ = x⁴.',
      },
      {
        title: '3. Fractional Exponents = Radicals (Power over Root)',
        formula: 'x^{m/n} = \\sqrt[n]{x^m} = \\left(\\sqrt[n]{x}\\right)^m \\implies 8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4',
        explanation:
          'Think of a tree: the ROOT is on the bottom (the denominator n), and the POWER is on top (the numerator m). Always take the root first to keep numbers small: for 8^(2/3), the cube root of 8 is 2 (since 2×2×2 = 8), and 2² = 4!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm004-d1',
          question: 'Simplify without a calculator:   27^(2/3)',
          options: ['9', '18', '3', '81'],
          correctIndex: 0,
          hint1: 'Remember: bottom of the fraction is the ROOT (cube root of 27), top is the POWER (squared).',
          hint2: 'What number multiplied by itself 3 times equals 27? (3 × 3 × 3 = 27). Now square that result!',
          explanation: '27^(2/3) = (∛27)² = 3² = 9.',
        },
        {
          id: 'm004-d2',
          question: 'Simplify using exponent laws:   (4 × 10²³) × (5 × 10⁻⁸) ÷ (2 × 10⁵)',
          options: ['1 × 10¹¹ (or 10¹¹)', '10 × 10²⁰', '1 × 10¹⁹', '1 × 10⁹'],
          correctIndex: 0,
          hint1: 'Handle the front numbers first: (4 × 5) ÷ 2 = 20 ÷ 2 = 10.',
          hint2: 'Now combine the powers of 10 by adding/subtracting exponents: 10^(23 + (−8) − 5) = 10¹⁰. Finally, 10 × 10¹⁰ = 1 × 10¹¹.',
          explanation: 'Front numbers: (4 × 5) / 2 = 10. Powers of 10: 10^(23 − 8 − 5) = 10¹⁰. Together: 10 × 10¹⁰ = 1.0 × 10¹¹.',
        },
        {
          id: 'm004-d3',
          question: 'In Calculus, to differentiate  1 / √x,  you must first rewrite it as a single power of x (xⁿ). What is 1 / √x written in exponent form?',
          options: ['x^(−1/2)', 'x^(1/2)', '−x²', 'x^(−2)'],
          correctIndex: 0,
          hint1: 'First rewrite √x as a fractional exponent: x^(1/2).',
          hint2: 'Since x^(1/2) is in the denominator (1 / x^(1/2)), move it to the numerator by making the exponent negative!',
          explanation: '√x = x^(1/2), and 1 / xⁿ = x⁻ⁿ, so 1 / √x = x^(−1/2).',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Hall-Petch Grain-Boundary Strengthening',
        scenario:
          'One of the most famous equations in Materials Engineering is the Hall-Petch relation: making metal crystal grains smaller makes the metal stronger! The formula is  σ_y = σ_0 + k · d^(−1/2),  where σ_0 = 70 MPa, k = 12 MPa·mm^(1/2), and the average grain diameter is d = 0.04 mm (which is 4/100 mm). What is the yield strength σ_y of this fine-grained steel?',
        options: ['130 MPa', '72.4 MPa', '370 MPa', '94 MPa'],
        correctIndex: 0,
        hint: 'Recall that d^(−1/2) means 1 / √d! Since d = 0.04, √0.04 = 0.2 (because 0.2 × 0.2 = 0.04). And 1 / 0.2 = 5!',
        explanation:
          'd^(−1/2) = 1 / √(0.04) = 1 / 0.2 = 5 mm^(−1/2). Plugging into Hall-Petch: σ_y = 70 + 12 × 5 = 70 + 60 = 130 MPa!',
      },
    },
  },

  // ==========================================
  // WEEK 2 - TUESDAY: CHEM 003
  // ==========================================
  {
    id: 'chem-003',
    code: 'CHEM 003',
    termId: 'term-2',
    week: 2,
    daySlot: 'Module 08',
    track: 'chem',
    title: 'The Mole, Avogadro’s Bridge & Balancing Reactions',
    subtitle: 'How chemists count 6.022 × 10²³ invisible atoms using an ordinary lab scale',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 185,
    prereqIds: ['math-004'],
    umCourseLink: 'Core of UM Chemistry for Engineers & Metallurgical Extraction Calculations',
    overtimeDigest: [
      'A "Mole" (mol) is just a counting word like "Dozen" (12) or "Ream" (500 sheets of paper)—specifically, 1 mole = 6.022 × 10²³ particles (Avogadro’s Number).',
      'Why that weird number? Because it was chosen so that the atomic mass on the Periodic Table in amu equals the exact mass of 1 mole in GRAMS! (1 Carbon atom = 12 amu → 1 mole of Carbon = 12 grams).',
      'Chemical equations must obey Conservation of Atoms: you balance equations by adjusting front coefficients (never subscripts!) so every element has equal counts on left and right.',
    ],
    history: {
      era: '1789 Paris (Lavoisier) & 1811 Turin (Amedeo Avogadro)',
      protagonist: 'Antoine & Marie-Anne Lavoisier and Amedeo Avogadro',
      hook: 'How can you count the exact number of Iron and Oxygen atoms in a rusty nail when a single atom is a hundred-millionth of a centimeter wide?',
      narrative: [
        'For centuries, alchemists thought burning metal created matter out of nothing because rusted iron weighs MORE than pure iron. In the 1770s, Antoine and Marie-Anne Lavoisier sealed iron in glass flasks, weighed everything before and after heating, and proved the Law of Conservation of Mass: the extra weight came from Oxygen gas in the air bonding onto the iron!',
        'In 1811, the Italian physicist Amedeo Avogadro realized you don’t need to see individual atoms to count them in equal ratios—just like a bank teller doesn’t count 10,000 coins one by one if they know 1 coin weighs 5 grams (they just weigh out 50,000 grams!).',
        'That bridge between the invisible world of atoms and the kitchen-scale world of grams is the Mole (6.022 × 10²³). It translates the microscopic atomic masses on the Periodic Table directly into grams you can weigh on a digital scale in the UM Chemistry Lab.',
      ],
      takeaway:
        'Whenever a recipe in Materials Engineering says "react 4 moles of Iron with 3 moles of O₂", you convert Moles → Grams using the Periodic Table’s Molar Mass (g/mol)!',
    },
    csBridge: {
      concept: 'Batch Instantiation, Memory Word Sizes & Conservation Invariants',
      analogy:
        'Nobody buys RAM by the single transistor—we group bits into Bytes and Megabytes. The `Mole` is Chemistry’s `Terabyte`: `1 mol = 6.022e23 instances`. And `Molar Mass (g/mol)` is the `sizeof(Atom)` lookup table!',
      codeSnippet: `// Periodic Table sizeof() in grams per mole (g/mol):
const MOLAR_MASS = { Fe: 55.85, O: 16.00, C: 12.01, Al: 26.98 };
// How many moles of Iron are in a 111.7-gram steel bolt?
const molesOfFe = 111.7 / MOLAR_MASS.Fe; // 2.00 moles of Fe
const numAtoms  = molesOfFe * 6.022e23;  // 1.2044e24 Iron atoms!`,
    },
    visualLab: {
      type: 'mole_stoichiometry_reactor',
      title: 'Interactive Stoichiometry & Corrosion Reactor (Fe + O₂ → Fe₂O₃)',
      instructions:
        'Adjust the stoichiometric coefficients to balance the Iron oxidation (rusting/hematite) reaction, then slide the input grams of Iron to watch Moles, Oxygen consumed, and Rust produced update in real time!',
      missionPrompt:
        'Lab Mission: Balance the reaction 4 Fe + 3 O₂ → 2 Fe₂O₃ so that both sides have exactly 4 Fe atoms and 6 O atoms!',
      targetState: { coeffFe: 4, coeffO2: 3, coeffFe2O3: 2 },
    },
    guidedSteps: [
      {
        title: '1. Computing Molar Mass (g/mol) from a Formula',
        formula: 'M(\\text{Fe}_2\\text{O}_3) = 2 \\times M(\\text{Fe}) + 3 \\times M(\\text{O}) = 2(55.85) + 3(16.00) = 159.7\\text{ g/mol}',
        explanation:
          'Subscripts tell you how many atoms of each element are inside ONE unit of the compound. Multiply each element’s atomic mass by its subscript and add them up to get the mass of 1 mole of that compound.',
      },
      {
        title: '2. Balancing Chemical Equations (Coefficients vs. Subscripts)',
        formula: '\\text{Unbalanced: } \\text{Fe} + \\text{O}_2 \\to \\text{Fe}_2\\text{O}_3 \\implies \\text{Balanced: } 4\\,\\text{Fe} + 3\\,\\text{O}_2 \\to 2\\,\\text{Fe}_2\\text{O}_3',
        explanation:
          'NEVER change subscripts (changing H₂O to H₂O₂ changes water into toxic hydrogen peroxide!). Only place whole-number multipliers (coefficients) in FRONT of formulas until left and right atom counts match: 4 Fe and 3×2 = 6 O on the left; 2×2 = 4 Fe and 2×3 = 6 O on the right.',
      },
      {
        title: '3. The 3-Step Stoichiometry Highway: Grams A → Moles A → Moles B → Grams B',
        formula: '\\text{g of A} \\xrightarrow{\\div M_A} \\text{mol of A} \\xrightarrow{\\times \\frac{\\text{coeff B}}{\\text{coeff A}}} \\text{mol of B} \\xrightarrow{\\times M_B} \\text{g of B}',
        explanation:
          'You cannot compare grams directly because Iron atoms are 3.5× heavier than Oxygen atoms! Always convert grams to moles first, use the balanced equation’s coefficient ratio, and convert back to grams.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'c003-d1',
          question: 'Titanium Dioxide (TiO₂) is used in solar cells and white coatings. Given atomic masses Ti = 48 g/mol and O = 16 g/mol, what is the molar mass of TiO₂, and how many moles are in 160 grams of TiO₂?',
          options: [
            'Molar mass = 80 g/mol;  2.0 moles',
            'Molar mass = 64 g/mol;  2.5 moles',
            'Molar mass = 112 g/mol; 1.4 moles',
            'Molar mass = 80 g/mol;  0.5 moles',
          ],
          correctIndex: 0,
          hint1: 'TiO₂ has 1 Titanium atom (48) and 2 Oxygen atoms (2 × 16 = 32). Add them together!',
          hint2: 'Moles = Mass / Molar Mass = 160 g ÷ (80 g/mol).',
          explanation: 'Molar mass of TiO₂ = 48 + 2(16) = 80 g/mol. Therefore, 160 g × (1 mol / 80 g) = 2.0 moles of TiO₂.',
        },
        {
          id: 'c003-d2',
          question: 'When Aluminum metal reacts with Oxygen gas to form protective Alumina ceramic:  __ Al + 3 O₂ → 2 Al₂O₃.  What coefficient must go in front of Al to balance the equation?',
          options: ['4', '2', '6', '3'],
          correctIndex: 0,
          hint1: 'Look at the right side: 2 Al₂O₃ contains 2 × 2 = 4 Aluminum atoms and 2 × 3 = 6 Oxygen atoms.',
          hint2: 'To match 4 Aluminum atoms on the right, what coefficient do you need in front of Al on the left?',
          explanation: '2 Al₂O₃ has 2 × 2 = 4 Al atoms, so we need 4 Al on the left: 4 Al + 3 O₂ → 2 Al₂O₃.',
        },
        {
          id: 'c003-d3',
          question: 'How many individual Silicon atoms are in 0.5 moles of pure Silicon? (Avogadro’s number N_A ≈ 6.0 × 10²³ atoms/mol)',
          options: [
            '3.0 × 10²³ atoms',
            '1.2 × 10²⁴ atoms',
            '6.0 × 10²³ atoms',
            '3.0 × 10¹¹ atoms',
          ],
          correctIndex: 0,
          hint1: 'Multiply the number of moles (0.5) by Avogadro’s number (6.0 × 10²³).',
          hint2: 'Half of 6.0 is 3.0!',
          explanation: '0.5 mol × (6.0 × 10²³ atoms / 1 mol) = 3.0 × 10²³ Silicon atoms.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Smelting Hematite Iron Ore in a Blast Furnace',
        scenario:
          'In steelmaking, pure Iron (Fe, 56 g/mol) is extracted from Hematite ore (Fe₂O₃, 160 g/mol) via the balanced reaction:  Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂.  Notice that 1 mole of Fe₂O₃ produces 2 moles of pure Fe. If you feed 800 grams of Fe₂O₃ into the furnace, what is the maximum mass of pure Iron (Fe) you can extract?',
        options: ['560 grams of Fe', '280 grams of Fe', '400 grams of Fe', '1,120 grams of Fe'],
        correctIndex: 0,
        hint: 'Follow the 3-step highway: (1) Moles of Fe₂O₃ = 800 g ÷ 160 g/mol = 5 mol. (2) Each mole of Fe₂O₃ yields 2 moles of Fe (5 × 2 = 10 mol Fe). (3) Multiply 10 mol Fe by 56 g/mol!',
        explanation:
          'Step 1: 800 g Fe₂O₃ ÷ 160 g/mol = 5 moles of Fe₂O₃. Step 2: 5 mol Fe₂O₃ × (2 mol Fe / 1 mol Fe₂O₃) = 10 moles of Fe. Step 3: 10 mol Fe × 56 g/mol = 560 grams of pure Iron!',
      },
    },
  },

  // ==========================================
  // WEEK 2 - WEDNESDAY: MATH 005
  // ==========================================
  {
    id: 'math-005',
    code: 'MATH 005',
    termId: 'term-2',
    week: 2,
    daySlot: 'Module 09',
    track: 'math',
    title: 'Cartesian Coordinates, Linear Functions (y = mx + b) & Vectors',
    subtitle: 'How a fly on Descartes’ bedroom ceiling unified Algebra and Geometry forever',
    standardMins: 45,
    overtimeMins: 15,
    xpReward: 190,
    prereqIds: ['chem-003'],
    umCourseLink: 'Direct prep for Stress-Strain Curves, Analytic Geometry, Physics 1 & Calculus Derivatives',
    overtimeDigest: [
      'Every equation in two variables (like σ = E·ε or y = mx + b) is simultaneously a formula AND a geometric curve on a 2D (x, y) grid.',
      'Slope (m = Δy / Δx = Rise / Run) is the RATE OF CHANGE: how much the output y changes for every +1 unit step in x. (In Calculus, derivatives are literally just the slope of a curved line!).',
      'Right-triangle trigonometry (SOH-CAH-TOA) and the Pythagorean theorem (a² + b² = c²) let you split any diagonal force F at angle θ into horizontal (F cos θ) and vertical (F sin θ) components.',
    ],
    history: {
      era: '1637 • France & The Netherlands',
      protagonist: 'René Descartes (Philosopher, Soldier & Mathematician)',
      hook: 'How did staying in bed until 11 AM watching a fly crawl on a tiled ceiling create modern computer graphics and engineering plots?',
      narrative: [
        'For 2,000 years, Euclid’s Geometry (shapes, circles, triangles) and Al-Khwarizmi’s Algebra (equations, symbols) lived in completely separate worlds. Geometric proofs had no coordinates, and algebraic equations had no pictures.',
        'René Descartes had frail health as a youth and was granted permission by his Jesuit schoolmasters to stay in bed until late morning—a habit he kept his whole life. According to historical accounts, while lying in bed watching a fly buzz around the corner of his room, he realized he could describe the fly’s exact position at any instant using just its perpendicular distances from the walls (x, y, z)!',
        'Suddenly, every algebraic equation became a visible curve, and every geometric shape became an equation. When you look at a Stress-Strain curve in Materials Engineering, the slope (m) of that straight line IS Young’s Modulus of Elasticity (E)!',
      ],
      takeaway:
        'Whenever you hear "Slope", "Derivative", or "Modulus", translate it in your head as: (Change in Vertical Output Δy) ÷ (Change in Horizontal Input Δx).',
    },
    csBridge: {
      concept: '2D Canvas Coordinates, Linear Interpolation & Vector Decomposition',
      analogy:
        'A linear function `f(x) = m*x + b` has two parameters: `b` is the initial state at `x = 0` (the y-intercept), and `m` is the step delta per tick (`dy/dx`). A 2D vector `(vx, vy)` with magnitude `r` and angle `θ` is just `vx = r * Math.cos(θ)` and `vy = r * Math.sin(θ)`!',
      codeSnippet: `// Stress-Strain Linear Elastic Region: Stress (y) = E * Strain (x) + 0
function computeSlope(x1, y1, x2, y2) {
  const deltaY = y2 - y1; // Rise (e.g., ΔStress in MPa)
  const deltaX = x2 - x1; // Run  (e.g., ΔStrain)
  return deltaY / deltaX; // Slope m (Young's Modulus E!)
}`,
    },
    visualLab: {
      type: 'cartesian_slope_wave',
      title: '3B1B Interactive Slope, Right-Triangle SOH-CAH-TOA & Force Vector Decomposer',
      instructions:
        'Adjust the Vector Magnitude (F) and Angle (θ) or toggle into Linear Slope Mode (y = mx + b). Watch how right-triangle legs (F·cos θ and F·sin θ) satisfy Pythagoras (F_x² + F_y² = F²)!',
      missionPrompt:
        'Lab Mission: Set the force angle θ = 60° or adjust the slope slider to see how vertical rise Δy and horizontal run Δx form a right triangle.',
      targetState: { interacted: true },
    },
    guidedSteps: [
      {
        title: '1. Slope as Rate of Change & The Line Equation (y = mx + b)',
        formula: 'm = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} \\quad \\text{and} \\quad y = mx + b',
        explanation:
          'In y = mx + b, b is where the line crosses the vertical y-axis (when x = 0). m is the slope: if m = 3, every +1 step right moves +3 steps up; if m = −2, every +1 step right moves 2 steps down.',
      },
      {
        title: '2. The Pythagorean Theorem (Distance in 2D & 3D)',
        formula: 'a^2 + b^2 = c^2 \\implies c = \\sqrt{a^2 + b^2} \\quad (\\text{In 3D: } d = \\sqrt{x^2 + y^2 + z^2})',
        explanation:
          'In any right-angled triangle, the square of the longest diagonal side (the hypotenuse c, opposite the 90° corner) equals the sum of the squares of the two shorter legs. Famous exact right triangles: (3, 4, 5) because 3² + 4² = 9 + 16 = 25 = 5², and (5, 12, 13).',
      },
      {
        title: '3. Right-Triangle Trig (SOH-CAH-TOA) for Force Vectors',
        formula: '\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} \\implies F_x = F\\cos\\theta \\quad | \\quad \\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} \\implies F_y = F\\sin\\theta',
        explanation:
          'Sine, Cosine, and Tangent are NOT mysterious functions—they are just ratios of side lengths in a right triangle! For a 30°-60°-90° triangle: sin(30°) = 0.5 and cos(60°) = 0.5.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'm005-d1',
          question: 'As a furnace heats a ceramic kiln, the temperature is 25 °C at t = 0 minutes and 145 °C at t = 6 minutes. Assuming a linear heating rate (T = m·t + b), what is the slope m (heating rate) and y-intercept b?',
          options: [
            'm = 20 °C/min,  b = 25 °C',
            'm = 24.1 °C/min, b = 0 °C',
            'm = 120 °C/min, b = 25 °C',
            'm = 20 °C/min,  b = 145 °C',
          ],
          correctIndex: 0,
          hint1: 'b is the starting value at t = 0 (25 °C).',
          hint2: 'm = (T₂ − T₁) / (t₂ − t₁) = (145 − 25) / (6 − 0).',
          explanation: 'm = (145 − 25) / (6 − 0) = 120 / 6 = 20 °C/min, and at t = 0, b = 25 °C.',
        },
        {
          id: 'm005-d2',
          question: 'A crane cable pulls on a steel support bracket with a horizontal force component F_x = 6 kN and a vertical force component F_y = 8 kN. Using the Pythagorean theorem, what is the total resultant tension F in the cable?',
          options: ['10 kN', '14 kN', '100 kN', '7 kN'],
          correctIndex: 0,
          hint1: 'F_x and F_y are perpendicular legs of a right triangle: F² = F_x² + F_y².',
          hint2: '6² + 8² = 36 + 64 = 100. Now take the square root of 100!',
          explanation: 'F = √(6² + 8²) = √(36 + 64) = √100 = 10 kN.',
        },
        {
          id: 'm005-d3',
          question: 'A tensile force of F = 200 N pulls on a composite fiber at an angle of θ = 60° above the horizontal. Given that cos(60°) = 0.5, what is the horizontal force component F_x = F · cos(60°)?',
          options: ['100 N', '200 N', '173.2 N', '50 N'],
          correctIndex: 0,
          hint1: 'Plug F = 200 N and cos(60°) = 0.5 into F_x = F · cos(60°).',
          hint2: '200 × 0.5 = ?',
          explanation: 'F_x = 200 N × cos(60°) = 200 N × 0.5 = 100 N.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Boss: Calculating Young’s Modulus from a Stress-Strain Graph',
        scenario:
          'In your 1st-year Materials Engineering lab at UM, you plot Stress σ (on the vertical y-axis) against Strain ε (on the horizontal x-axis) for a brass specimen. At ε₁ = 0, σ₁ = 0 MPa. At ε₂ = 0.002 (0.2% stretch), the stress is σ₂ = 210 MPa. Young’s Modulus of Elasticity (E) is defined as the slope of this linear line (E = Δσ / Δε). What is Young’s Modulus E for this brass in GPa? (Recall: 1,000 MPa = 1 GPa).',
        options: [
          '105 GPa (105,000 MPa)',
          '210 GPa',
          '42 GPa',
          '10.5 GPa',
        ],
        correctIndex: 0,
        hint: 'Compute the slope: E = (210 − 0 MPa) ÷ (0.002 − 0) = 210 ÷ (2 / 1000) = 210 × (1000 / 2) MPa.',
        explanation:
          'Slope E = Δσ / Δε = 210 MPa / 0.002 = 105,000 MPa. Converting to Gigapascals (÷ 1,000): E = 105 GPa!',
      },
    },
  },

  // ==========================================
  // WEEK 2 - SATURDAY CAPSTONE: MATE 102
  // ==========================================
  {
    id: 'mate-102',
    code: 'MATE 102',
    termId: 'term-2',
    week: 2,
    daySlot: 'Module 10 • Capstone',
    track: 'mate',
    title: 'Capstone Lab: 3D Crystal Unit Cells (BCC vs. FCC) & Theoretical Density',
    subtitle: 'Combining 3D Geometry, Fractions, Avogadro’s Mole & Atomic Radii to Predict Real Metal Properties',
    standardMins: 50,
    overtimeMins: 15,
    xpReward: 300,
    prereqIds: ['math-005'],
    umCourseLink: 'Signature Topic of UM BSMTE Crystallography & Physical Metallurgy',
    overtimeDigest: [
      'Metals crystallize by stacking atoms in repeating 3D boxes called Unit Cells: mainly Body-Centered Cubic (BCC, like room-temp α-Iron, Tungsten, Chromium) and Face-Centered Cubic (FCC, like Aluminum, Copper, Gold, γ-Iron).',
      'Corner atoms are shared among 8 adjacent unit-cell cubes (each corner contributes 1/8 of an atom); Face-centered atoms are shared between 2 cubes (contributing 1/2 an atom); a Body-centered atom sits 100% inside 1 cube.',
      'Therefore: BCC holds 8×(1/8) + 1 = 2 atoms per unit cell; FCC holds 8×(1/8) + 6×(1/2) = 4 atoms per unit cell!',
    ],
    history: {
      era: '1912–1913 • University of Leeds & Cambridge',
      protagonist: 'William Henry Bragg & William Lawrence Bragg (Father & 22-Year-Old Son)',
      hook: 'How did a 22-year-old student use X-rays and right-triangle trigonometry to photograph the exact 3D grid of atoms inside crystals?',
      narrative: [
        'Until 1912, nobody knew for sure how atoms arranged themselves inside solid metals or minerals. Were they stacked like cannonballs, or arranged in simple cubes?',
        'When Max von Laue discovered that crystals scatter X-rays into geometric dot patterns, a 22-year-old Cambridge student named Lawrence Bragg had a flash of insight while walking by the River Cam. He realized planes of atoms inside a crystal reflect X-rays cleanly only when the extra path length traveled between planes (2d·sin θ, right-triangle trig from Math 005!) equals a whole number of wavelengths (nλ).',
        'Bragg’s Law (nλ = 2d·sin θ) allowed him and his father to map the exact 3D unit cells of salt, diamond, copper, and iron—making Lawrence Bragg the youngest Science Nobel Prize laureate in history at age 25!',
      ],
      takeaway:
        'Look at how far you have come in 6 lessons: you started at (−3)×(−2) = +6, and now you can calculate the exact atomic packing and theoretical density of Iron and Aluminum from first principles!',
    },
    csBridge: {
      concept: '3D Voxel Grids, Shared Boundary Vertices & Spatial Packing Efficiency',
      analogy:
        'A Crystal Lattice is a 3D tiling of identical Voxel chunks (`UnitCell`). Just like shared vertices in a 3D mesh, a corner atom at `(0,0,0)` touches 8 adjacent voxel cubes (`1/8` weight per cube), while a face atom touches 2 cubes (`1/2` weight)!',
      codeSnippet: `// Counting effective atoms (n) inside a 3D cubic Unit Cell:
function countEffectiveAtoms(corners, faces, interior) {
  return corners * (1 / 8) + faces * (1 / 2) + interior * 1;
}
const n_SC  = countEffectiveAtoms(8, 0, 0); // 1 atom  (Simple Cubic, APF = 52%)
const n_BCC = countEffectiveAtoms(8, 0, 1); // 2 atoms (Body-Centered Cubic, APF = 68%)
const n_FCC = countEffectiveAtoms(8, 6, 0); // 4 atoms (Face-Centered Cubic, APF = 74%)`,
    },
    visualLab: {
      type: 'crystal_lattice_3d',
      title: 'Interactive 3D Crystal Lattice Rotator (Simple Cubic vs. BCC vs. FCC)',
      instructions:
        'Rotate the 3D unit cell with the azimuth/elevation sliders, toggle between Simple Cubic (SC), Body-Centered Cubic (BCC), and Face-Centered Cubic (FCC), and slice the corner atoms to see why 8 × (1/8) = 1 whole atom!',
      missionPrompt:
        'Lab Mission: Inspect both BCC (2 effective atoms, 68% packing) and FCC (4 effective atoms, 74% packing) in the 3D visualizer.',
      targetState: { inspectedStructures: true },
    },
    guidedSteps: [
      {
        title: '1. Counting Effective Atoms (n) Inside a Unit Cell (Using Math 002 Fractions!)',
        formula: 'n_{\\text{BCC}} = 8\\left(\\frac{1}{8}\\right) + 1 = 2\\text{ atoms} \\quad | \\quad n_{\\text{FCC}} = 8\\left(\\frac{1}{8}\\right) + 6\\left(\\frac{1}{2}\\right) = 1 + 3 = 4\\text{ atoms}',
        explanation:
          'Every cube has 8 corners and 6 faces. A corner atom is sliced equally among 8 meeting cubes (1/8 each). A face-centered atom is sliced in half between 2 touching cubes (1/2 each). An interior center atom belongs 100% (1) to that cube.',
      },
      {
        title: '2. Touching Diagonals (Using Math 005 Pythagoras!)',
        formula: '\\text{FCC Face Diagonal: } \\sqrt{a^2 + a^2} = \\sqrt{2}a = 4R \\quad | \\quad \\text{BCC Body Diagonal: } \\sqrt{a^2 + a^2 + a^2} = \\sqrt{3}a = 4R',
        explanation:
          'In FCC, atoms touch along the 2D FACE diagonal (length √2·a), which contains 1 radius + 1 diameter (2R) + 1 radius = 4R. In BCC, the center ball pushes the corners slightly apart, so atoms touch along the 3D BODY diagonal (length √3·a = 4R).',
      },
      {
        title: '3. Theoretical Density of a Metal From Pure Atomic First Principles',
        formula: '\\rho = \\frac{\\text{Mass inside Unit Cell}}{\\text{Volume of Unit Cell}} = \\frac{n \\cdot A}{V_C \\cdot N_A}',
        explanation:
          'Here n = atoms/cell (2 for BCC, 4 for FCC), A = Molar Mass (g/mol), V_C = a³ = cube volume (cm³), and N_A = Avogadro’s Number (6.022×10²³ atoms/mol). This one formula unites every math and chemistry lesson you just completed!',
      },
    ],
    gate: {
      drills: [
        {
          id: 'mate102-d1',
          question: 'Copper crystallizes in a Face-Centered Cubic (FCC) structure, which has 8 corner atoms and 6 face-centered atoms. How many total effective (whole) atoms are contained inside one FCC unit cell?',
          options: ['4 atoms', '14 atoms', '2 atoms', '6 atoms'],
          correctIndex: 0,
          hint1: 'Each of the 8 corner atoms contributes 1/8 of an atom inside the cube.',
          hint2: 'Each of the 6 face atoms contributes 1/2 of an atom inside the cube: 8(1/8) + 6(1/2).',
          explanation: '8 × (1/8) + 6 × (1/2) = 1 + 3 = 4 effective atoms per FCC unit cell.',
        },
        {
          id: 'mate102-d2',
          question: 'When pure Iron is heated past 912 °C, it transforms from BCC (Atomic Packing Factor = 68%) into FCC (Atomic Packing Factor = 74%). Because FCC packs spheres more tightly than BCC, what happens to the volume of the Iron bar right as it transforms from BCC to FCC?',
          options: [
            'It slightly contracts (shrinks in volume) because FCC packs atoms into 74% of space vs. 68% in BCC.',
            'It expands by 50%.',
            'Its atoms disappear.',
            'It turns into a gas.',
          ],
          correctIndex: 0,
          hint1: 'Compare the packing efficiency: 68% filled space (32% empty space) in BCC vs. 74% filled space (26% empty space) in FCC.',
          hint2: 'Packing the same atoms with less empty space between them means the total volume slightly decreases!',
          explanation: 'Because FCC is the most efficient way to pack spheres (74% APF vs. 68% APF for BCC), Iron slightly contracts when transforming from BCC α-ferrite to FCC γ-austenite at 912 °C!',
        },
        {
          id: 'mate102-d3',
          question: 'An FCC unit cell has cube edge length a = 0.40 nm. What is the volume V_C = a³ of this unit cell in cubic nanometers (nm³)?',
          options: ['0.064 nm³', '1.20 nm³', '0.16 nm³', '0.64 nm³'],
          correctIndex: 0,
          hint1: 'Compute 0.4 × 0.4 × 0.4.',
          hint2: '4 × 4 × 4 = 64, and with 3 decimal places, 0.064 nm³!',
          explanation: 'V_C = a³ = (0.40 nm)³ = 0.064 nm³.',
        },
      ],
      bossProblem: {
        title: 'UM Materials Lab Final Boss: Predicting Crystal Mass from Scratch',
        scenario:
          'You are examining an FCC Gold (Au) nanoparticle under a transmission electron microscope. Gold has Molar Mass A = 197 g/mol, and its FCC unit cell contains n = 4 effective Gold atoms. Using Avogadro’s number N_A ≈ 6.0 × 10²³ atoms/mol, what is the mass (in grams) of the 4 Gold atoms inside a single FCC unit cell? (Formula: Mass = (n × A) / N_A)',
        options: [
          '1.31 × 10⁻²¹ grams',
          '788 grams',
          '3.28 × 10⁻²² grams',
          '6.0 × 10⁻²³ grams',
        ],
        correctIndex: 0,
        hint: 'First multiply n × A = 4 × 197 = 788 g/mol. Then divide by 6.0 × 10²³: (788 ÷ 6.0) × 10⁻²³ ≈ 131.3 × 10⁻²³ = 1.31 × 10⁻²¹ g!',
        explanation:
          'Mass = (4 atoms × 197 g/mol) / (6.0 × 10²³ atoms/mol) = 788 / (6.0 × 10²³) ≈ 131.3 × 10⁻²³ g = 1.31 × 10⁻²¹ grams! Congratulations—you just used Arithmetic, Fractions, Exponents, Dimensional Analysis, Atomic Theory, and 3D Geometry to solve a real 1st-Year University of Mindanao Materials Engineering problem!',
      },
    },
  },
  ...EXTRA_LESSONS,
];

export const UM_SKILL_TREE_NODES = LESSONS.map((lesson, idx) => {
  const col = Math.floor(idx / 2); // 12 columns (0..11)
  const row = idx % 2; // 2 rows (0 or 1)
  const nextLesson = LESSONS[idx + 1];
  const nextSameTrack = LESSONS.slice(idx + 1).find((l) => l.track === lesson.track);
  const connects = [];
  if (nextLesson) connects.push(nextLesson.id);
  if (nextSameTrack && nextSameTrack.id !== nextLesson?.id) {
    connects.push(nextSameTrack.id);
  }
  return {
    id: lesson.id,
    code: lesson.code,
    name: lesson.title.split(':')[0].slice(0, 24),
    track: lesson.track,
    x: 4 + (col / 11) * 92,
    y: row === 0 ? 24 : 74,
    connectsTo: connects,
  };
});

