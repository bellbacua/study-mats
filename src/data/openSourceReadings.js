export const LESSON_READINGS = {
  'math-001': [
    {
      id: 'read-m001-1',
      type: 'Intuition Blog',
      source: 'BetterExplained (Kalid Azad)',
      title: 'Why Does Negative Times Negative Equal Positive? A Visual & Geometric Guide',
      readTime: '6 min read',
      url: 'https://betterexplained.com/articles/adept-guide-positive-and-negative-numbers/',
      whyRead:
        'Destroys the "just memorize the rule" frustration by showing how negative numbers are 180° rotations on the complex/real plane.',
      inAppExcerpt: `Why did mathematicians eventually accept negative numbers after fighting them for centuries? Because once you stop treating numbers as "nouns" (3 sheep) and start treating them as "verbs" (transformations of space), everything clicks:
• Multiplying by +2 means: "Stretch the number line by 2× and keep facing the same direction."
• Multiplying by −1 means: "Rotate the entire number line by 180° around zero."
• Therefore, multiplying (−3) × (−2) means: start with a vector of length 3 rotated 180° (pointing to −3), then stretch it by 2× (length 6) AND rotate it another 180°! Since 180° + 180° = 360°, you are facing positive again (+6).
This exact geometric rotation insight is also how Imaginary and Complex Numbers (i = √−1 = a 90° rotation!) work in Electrical and Materials Engineering.`,
    },
    {
      id: 'read-m001-2',
      type: 'Open-Source Textbook',
      source: 'OpenStax Prealgebra 2e • Chapter 3 (Integers)',
      title: 'OpenStax: Add, Subtract, Multiply & Divide Integers with Order of Operations',
      readTime: '12 min read',
      url: 'https://openstax.org/books/prealgebra-2e/pages/3-introduction',
      whyRead:
        'Hundreds of free, peer-reviewed practice problems with odd-numbered step-by-step solutions if you want extra drill muscle memory.',
      inAppExcerpt: `Key OpenStax Checkpoints for Engineering Students:
1. Absolute Value |x| is simply the distance of x from 0 on the number line (always ≥ 0).
2. When adding two numbers with DIFFERENT signs, such as (−18) + (+11): ask which arrow is longer. Since |−18| > |+11|, the negative arrow wins by 18 − 11 = 7, so the result is −7.
3. Watch the Unary Minus vs. Grouping Parentheses:
   • −2⁴ = −(2 × 2 × 2 × 2) = −16
   • (−2)⁴ = (−2)(−2)(−2)(−2) = +16
In engineering formulas (like thermal radiation T⁴ or bending moment −wL²/8), misreading −x² as (−x)² is the #1 sign error on exams!`,
    },
    {
      id: 'read-m001-3',
      type: 'Math History Blog',
      source: 'MacTutor History of Mathematics (University of St Andrews)',
      title: 'Brahmagupta and the Invention of Zero & Negative Debt Rules (628 AD)',
      readTime: '5 min read',
      url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta/',
      whyRead:
        'Explore the exact 18 verses from 7th-century India where zero and negative arithmetic were codified for the first time in human history.',
      inAppExcerpt: `In Chapter 18 of the Brāhmasphuṭasiddhānta (628 AD), Brahmagupta wrote the earliest known rules of signed arithmetic using financial metaphors:
• "A debt minus zero is a debt. A fortune minus zero is a fortune."
• "A debt subtracted from zero is a fortune [0 − (−x) = +x]."
• "The product or quotient of two fortunes is one fortune. The product or quotient of two debts is one fortune [(−x)(−y) = +xy]."
Notice how practical this was: ancient merchants needed a way to adjust ledgers when a loan was forgiven (subtracting a debt = adding wealth!).`,
    },
  ],

  'chem-001': [
    {
      id: 'read-c001-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Chemistry: Atoms First 2e • Chapters 2 & 3',
      title: 'Evolution of Atomic Theory, Electronic Structure & Periodic Properties',
      readTime: '15 min read',
      url: 'https://openstax.org/books/chemistry-atoms-first-2e/pages/2-introduction',
      whyRead:
        'Unlike traditional high-school books, OpenStax "Atoms First" starts right inside the atom—the exact way Materials Engineering teaches it.',
      inAppExcerpt: `From Bohr Shells to Quantum Orbitals (s, p, d, f):
In Chem 001 we used Bohr shells (capacities 2, 8, 8) to build intuition. As you advance in UM Chemistry for Engineers, you’ll see that each shell is divided into subshells (orbitals):
• s-subshell: spherical, holds max 2 electrons
• p-subshell: dumbbell-shaped along x, y, z axes, holds max 6 electrons (Notice: 2 + 6 = 8, which is why the Octet Rule is 8!)
• d-subshell: holds max 10 electrons (this is where Transition Metals like Iron, Titanium, Copper, and Gold live!)
Why are Transition Metals so strong and conductive? Because their outermost s- and d-electrons are very close in energy and delocalize into a dense metallic electron sea.`,
    },
    {
      id: 'read-c001-2',
      type: 'MIT OpenCourseWare',
      source: 'MIT OCW 3.091 • Intro to Solid-State Chemistry (Prof. Jeffrey Grossman)',
      title: 'Why Materials Science Starts with the Periodic Table & Valence Electrons',
      readTime: '10 min read',
      url: 'https://ocw.mit.edu/courses/3-091-introduction-to-solid-state-chemistry-fall-2018/',
      whyRead:
        'MIT’s flagship freshman chemistry course is actually taught by their Materials Science & Engineering department!',
      inAppExcerpt: `In MIT 3.091, the Periodic Table is treated as a Materials Engineer’s toolbox:
• Left & Center (Metals, 1–3 valence e⁻): Low ionization energy (they give up valence electrons easily). Result: Ductile, reflective, electrically & thermally conductive solids.
• Diagonal Staircase (Metalloids: B, Si, Ge, As, Sb, Te): 4 valence e⁻ in Silicon and Germanium. They form directional covalent networks that conduct electricity ONLY when thermally excited or "doped" with impurities (Phosphorus or Boron)—the basis of every transistor in your computer!
• Upper Right (Nonmetals: C, N, O, F, Cl): High electronegativity (they pull electrons strongly). When combined with metals, they form Ceramic Oxides, Nitrides, and Carbides (Al₂O₃, TiN, SiC) that can survive 2,000 °C jet engines.`,
    },
  ],

  'math-002': [
    {
      id: 'read-m002-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Prealgebra 2e • Chapter 4 (Fractions)',
      title: 'Visualizing Equivalent Fractions, Complex Fractions & Common Denominators',
      readTime: '12 min read',
      url: 'https://openstax.org/books/prealgebra-2e/pages/4-introduction',
      whyRead:
        'Walks through every edge case of fractions—including mixed numbers, reciprocals, and simplifying multi-story fractions.',
      inAppExcerpt: `The 3 Golden Fraction Habits for Calculus & Engineering:
1. DITCH MIXED NUMBERS FOREVER: In high school, people write "2 ½". In college engineering and calculus, NEVER write mixed numbers because "2 ½" looks like 2 multiplied by ½! Always write improper fractions: 2 + 1/2 = 5/2.
2. CANCEL FACTORS BEFORE MULTIPLYING: When computing (15 / 28) × (14 / 45), do NOT multiply 15 × 14 and 28 × 45! Divide 15 and 45 by 15 (leaving 1 and 3), and divide 14 and 28 by 14 (leaving 1 and 2). You immediately get (1/2) × (1/3) = 1/6 in 3 seconds!
3. YOU CAN ONLY CANCEL ACROSS MULTIPLICATION, NEVER ADDITION:
   • (4x) / 4 = x  (Valid! 4 is a multiplied factor)
   • (4 + x) / 4 ≠ 1 + x  (Trap! You must divide BOTH terms by 4: 4/4 + x/4 = 1 + x/4).`,
    },
    {
      id: 'read-m002-2',
      type: 'Intuition Blog',
      source: 'BetterExplained (Kalid Azad)',
      title: 'Comprehending Fractions: Why Division is Multiplying by the Reciprocal',
      readTime: '5 min read',
      url: 'https://betterexplained.com/articles/comprehending-fractions/',
      whyRead:
        'Explains the scaling intuition behind reciprocals so you never forget how to simplify stacked fractions in Physics.',
      inAppExcerpt: `Imagine a recipe calls for 3/4 cup of epoxy resin, and your measuring scoop only holds 1/8 cup. How many scoops do you need?
Mathematically, that is (3/4) ÷ (1/8).
Why do we flip 1/8 to 8/1? Because 8 scoops of size (1/8) make 1 full cup! So for every 1 full cup, you need 8 scoops. Since you want 3/4 of a cup, you need (3/4) × 8 = 6 scoops.
Flipping the denominator fraction simply asks: "How many of these pieces fit inside 1 whole unit?" and then scales by your numerator!`,
    },
  ],

  'chem-002': [
    {
      id: 'read-c002-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Chemistry: Atoms First 2e • Section 1.6',
      title: 'Mathematical Treatment of Measurement Results (Factor-Label / Dimensional Analysis)',
      readTime: '10 min read',
      url: 'https://openstax.org/books/chemistry-atoms-first-2e/pages/1-6-mathematical-treatment-of-measurement-results',
      whyRead:
        'Shows how to chain 4 or 5 unit conversions in a single horizontal line without losing track of powers of 10.',
      inAppExcerpt: `Why Professors Love the Factor-Label Method:
Even if you forget a physics or chemistry formula on an exam, looking at the units of the given quantities often hands you the formula for free!
For example, suppose a problem gives you:
• Thermal conductivity k in Watts per meter-Kelvin:  W / (m · K)
• Cross-sectional Area A in square meters:  m²
• Temperature difference ΔT in Kelvin:  K
• Wall thickness L in meters:  m
And asks for Heat Transfer Rate Q in Watts (W). How do you combine them so only "W" survives?
Look at the units:  [W / (m · K)] × [m²] × [K] ÷ [m] = W!
You just derived Fourier’s Law of Heat Conduction (Q = k · A · ΔT / L) purely by canceling unit fractions!`,
    },
    {
      id: 'read-c002-2',
      type: 'Open-Source Engineering Wiki',
      source: 'LibreTexts Chemistry • Dimensional Analysis in Engineering',
      title: 'Converting Derived Units: Pressure (Pa, MPa, psi), Density & Energy (Joules vs. eV)',
      readTime: '8 min read',
      url: 'https://chem.libretexts.org/Bookshelves/General_Chemistry/Book%3A_ChemPRIME_(Moore_et_al.)/01%3A_Introduction_-_The_Ambit_of_Chemistry/1.08%3A_Dimensional_Analysis',
      whyRead:
        'Covers the exact unit conversions used in Callister’s Materials Science textbook (eV to Joules, Ångströms to nm, MPa to ksi).',
      inAppExcerpt: `Cheat Sheet of UM Materials Engineering Unit Identities:
• Length: 1 m = 10² cm = 10³ mm = 10⁶ μm (micrometers) = 10⁹ nm (nanometers) = 10¹⁰ Å (Ångströms).
• Force: 1 Newton (N) = 1 kg · m / s².
• Stress & Pressure: 1 Pascal (Pa) = 1 N / m².
• The Golden Shortcut: 1 MPa = 10⁶ N / m² = 1 N / mm²! (Whenever Area is in mm² and Force is in N, Force ÷ Area is AUTOMATICALLY in Megapascals!).`,
    },
  ],

  'math-003': [
    {
      id: 'read-m003-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Elementary Algebra 2e • Chapter 2 (Solving Linear Equations)',
      title: 'Solving Equations with Variables and Constants on Both Sides & Formula Rearrangement',
      readTime: '14 min read',
      url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-introduction',
      whyRead:
        'Specifically includes Section 2.6: "Solve a Formula for a Specific Variable"—the bread and butter of engineering problem solving.',
      inAppExcerpt: `How to Isolate a Variable Caught in a Denominator (The #1 Algebra Mistake):
Suppose you have the electrical resistivity formula for a semiconductor wire:
  R = (ρ · L) / A
And you want to solve for Cross-Sectional Area (A).
NEVER try to divide by (ρ · L) while A is in the bottom! Instead:
• Step 1: Multiply both sides by A to bring A up to the numerator:
  A · R = ρ · L
• Step 2: Divide both sides by R:
  A = (ρ · L) / R
Rule of Thumb: If the variable you want is trapped in a denominator, multiply both sides by that denominator on Step 1!`,
    },
    {
      id: 'read-m003-2',
      type: 'Open-Source Lecture Notes',
      source: 'Paul’s Online Math Notes (Lamar University • Prof. Paul Dawkins)',
      title: 'Algebra & Preliminaries for Calculus Students: Linear & Fractional Equations',
      readTime: '10 min read',
      url: 'https://tutorial.math.lamar.edu/Classes/Alg/SolveLinearEqns.aspx',
      whyRead:
        'Written by an engineering math professor specifically for college students preparing for Calculus 1–3 and Differential Equations.',
      inAppExcerpt: `Why Paul’s Online Math Notes is Legendary in Engineering Schools:
Prof. Dawkins highlights the exact algebra pitfalls that trip up students later in Calculus:
• Distributing a minus sign across parentheses:  10 − 3(x − 4) = 10 − 3x + 12 (NOT − 12!).
• Splitting a numerator vs. splitting a denominator:
  (a + b) / c = a/c + b/c   [ALWAYS TRUE]
  a / (b + c) ≠ a/b + a/c   [NEVER TRUE! You cannot split a sum in a denominator!]`,
    },
  ],

  'mate-100': [
    {
      id: 'read-mate100-1',
      type: 'Open-Source Materials Textbook',
      source: 'LibreTexts Materials Science • Atomic Structure & Interatomic Bonding',
      title: 'Primary vs. Secondary Bonds and the Potential Energy Curve in Solids',
      readTime: '12 min read',
      url: 'https://eng.libretexts.org/Bookshelves/Materials_Science/Supplemental_Modules_(Materials_Science)/Atomic_Structure',
      whyRead:
        'Open-source companion to Chapter 2 of Callister’s "Materials Science and Engineering: An Introduction."',
      inAppExcerpt: `How the Interatomic Energy Curve Explains 3 Macroscopic Properties at Once:
1. BOND LENGTH (r₀): Where the potential energy curve hits its minimum (dE/dr = 0). Determines atomic packing density.
2. MELTING TEMPERATURE (T_m): Proportional to the depth of the energy trough (E₀). Deeper trough = stronger bond = more thermal energy required to break the solid apart.
3. STIFFNESS / YOUNG’S MODULUS (E): Proportional to the CURVATURE (steepness of the walls) at the bottom of the energy well! A narrow, sharp energy valley means even a tiny stretch Δr creates a huge restoring force (high stiffness, like Diamond or Tungsten Carbide).
4. THERMAL EXPANSION (α): Driven by the ASYMMETRY of the energy well. Deeper, more symmetric wells (like Quartz or Alumina ceramics) expand very little when heated; shallow, asymmetric wells (like Polymers) expand dramatically!`,
    },
    {
      id: 'read-mate100-2',
      type: 'MIT OpenCourseWare',
      source: 'MIT OCW 3.091 • Chemical Bonding in Solids',
      title: 'Ionic, Covalent, Metallic & Van der Waals Bonding Compared',
      readTime: '9 min read',
      url: 'https://ocw.mit.edu/courses/3-091-introduction-to-solid-state-chemistry-fall-2018/',
      whyRead:
        'Connects electronegativity differences (ΔEN) directly to whether two elements form an alloy, a ceramic, or a polymer.',
      inAppExcerpt: `How to Predict Bond Type Just by Looking at the Periodic Table:
• Metal + Nonmetal (Large Electronegativity Difference, ΔEN > 1.7): IONIC BOND (e.g., NaCl, MgO, ZrO₂). Electrons transfer completely from metal to nonmetal.
• Nonmetal + Nonmetal (Small ΔEN): COVALENT BOND (e.g., C–C in Diamond or Polyethylene, Si–O in Silica Glass). Electrons are locked in directional shared orbitals.
• Metal + Metal (Both have low EN): METALLIC BOND (e.g., Fe, Cu, Al, Brass Cu-Zn). Valence electrons delocalize into a shared conductive cloud.`,
    },
  ],

  'math-004': [
    {
      id: 'read-m004-1',
      type: 'Intuition Blog',
      source: 'BetterExplained (Kalid Azad)',
      title: 'An Intuitive Guide to Exponential Functions & Why Fractional Exponents Work',
      readTime: '7 min read',
      url: 'https://betterexplained.com/articles/an-intuitive-guide-to-exponential-functions-e/',
      whyRead:
        'Transforms exponents and logarithms from "symbol pushing" into a continuous growth timeline.',
      inAppExcerpt: `What does 2^(1.5) actually mean?
If you think of exponents as "repeated multiplication," multiplying a number by itself 1.5 times sounds like nonsense!
Instead, think of exponents as a CONTINUOUS GROWTH TIMELINE starting from 1:
• Growing for 1 hour doubles your size: × 2¹ = 2
• Growing for 2 hours quadruples your size: × 2² = 4
• What happens if you stop the clock halfway through the first hour (at t = 0.5 hours = 1/2)?
If you apply the 0.5-hour growth factor TWICE (0.5 hr + 0.5 hr = 1 full hour), the combined effect must equal × 2!
What number multiplied by itself equals 2? The square root of 2 (√2 ≈ 1.414)!
Therefore, 2^(1/2) = √2, and 2^(1.5) = 2^(1 + 0.5) = 2¹ × 2^(0.5) = 2 × √2 ≈ 2.828!`,
    },
    {
      id: 'read-m004-2',
      type: 'Open-Source Lecture Notes',
      source: 'Paul’s Online Math Notes • Integer & Rational Exponents',
      title: 'Mastering Radical-to-Exponent Conversions for Calculus Readiness',
      readTime: '11 min read',
      url: 'https://tutorial.math.lamar.edu/Classes/Alg/Radicals.aspx',
      whyRead:
        'Essential practice for rewriting complex roots into power form before taking derivatives and integrals.',
      inAppExcerpt: `Why Calculus 1 Uses Fractional Exponents Every Single Day:
In Calculus 1 at UM, you will learn the "Power Rule" for derivatives:
  The rate of change of xⁿ is simply n · x^(n − 1).
Notice how effortless that formula is—IF your expression is written as xⁿ!
• If a problem gives you  y = ∛(x⁵),  you rewrite it as  y = x^(5/3),  and the derivative is immediately (5/3)x^(2/3).
• If a problem gives you  y = 1 / x⁴,  you rewrite it as  y = x^(−4),  and the derivative is immediately −4x^(−5).
Mastering Lesson Math 004 today means you have already conquered 70% of the algebra inside Calculus 1!`,
    },
  ],

  'chem-003': [
    {
      id: 'read-c003-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Chemistry: Atoms First 2e • Chapter 7 (Stoichiometry)',
      title: 'Formula Mass, the Mole Concept, & Reaction Stoichiometry',
      readTime: '14 min read',
      url: 'https://openstax.org/books/chemistry-atoms-first-2e/pages/7-introduction',
      whyRead:
        'Walks step-by-step through balancing chemical equations, limiting reactants, and percent yield in industrial processes.',
      inAppExcerpt: `Understanding "Limiting Reactants" Using a Computer Assembly Analogy:
Suppose each gaming PC requires 1 Motherboard and 2 sticks of RAM:
  1 MB + 2 RAM → 1 PC
If your warehouse has 50 Motherboards and 60 sticks of RAM, how many PCs can you build?
• 50 Motherboards could build 50 PCs.
• 60 RAM sticks (at 2 per PC) can only build 60 ÷ 2 = 30 PCs!
You run out of RAM at 30 PCs! In Chemistry, the RAM is called the LIMITING REACTANT, and the 20 leftover Motherboards are the EXCESS REACTANT. In Materials synthesis (like reacting Titanium with Carbon to make TiC ceramic armor), calculating the limiting reactant ensures no unreacted brittle impurities remain in your material!`,
    },
  ],

  'math-005': [
    {
      id: 'read-m005-1',
      type: 'Visual Intuition Archive',
      source: '3Blue1Brown (Grant Sanderson)',
      title: 'Essence of Linear Algebra & Calculus: Vectors, Slopes, and Trigonometry',
      readTime: '10 min read',
      url: 'https://www.3blue1brown.com/topics/linear-algebra',
      whyRead:
        'Grant Sanderson’s written interactive lessons on vectors, coordinates, and why slopes/derivatives are local linear approximations.',
      inAppExcerpt: `How 3Blue1Brown Connects Vectors, Slopes, and Calculus:
1. A 2D vector [x, y] is both an arrow from the origin AND a combination of two basis steps: x steps along the horizontal î-hat axis + y steps along the vertical ĵ-hat axis.
2. A straight line y = mx + b has a constant rate of change (slope m = Δy / Δx).
3. What if a curve is NOT straight (like the plastic necking region of a steel stress-strain curve)? If you zoom in 1,000× on any smooth curve, it looks locally like a straight line! The slope of that zoomed-in tangent line is the DERIVATIVE (dy/dx) in Calculus.`,
    },
    {
      id: 'read-m005-2',
      type: 'Open-Source Textbook',
      source: 'OpenStax Precalculus 2e • Chapter 5 (Trigonometric Functions)',
      title: 'Right Triangle Trigonometry, Unit Circle & Vector Components for Engineers',
      readTime: '12 min read',
      url: 'https://openstax.org/books/precalculus-2e/pages/5-4-right-triangle-trigonometry',
      whyRead:
        'Direct preparation for UM’s "Physics for Engineers" and "Statics of Rigid Bodies" force-equilibrium problems.',
      inAppExcerpt: `Why Every Statics Problem Boils Down to Two Equations:
When a bridge truss or crane cable is in static equilibrium (not accelerating), Newton’s First Law says all forces cancel to zero along both perpendicular axes:
• Sum of Horizontal Forces:  ∑F_x = 0   (using F · cos θ for each angled force)
• Sum of Vertical Forces:    ∑F_y = 0   (using F · sin θ for each angled force)
By splitting every diagonal force into F·cos θ and F·sin θ using right triangles, a complex 2D engineering structure turns into two simple linear algebra equations from Math 003!`,
    },
  ],

  'mate-102': [
    {
      id: 'read-mate102-1',
      type: 'Open-Source Materials Textbook',
      source: 'LibreTexts Materials Science • Crystal Structures of Metals',
      title: 'Unit Cells, Metallic Crystal Structures (FCC, BCC, HCP) & Theoretical Density Calculations',
      readTime: '15 min read',
      url: 'https://eng.libretexts.org/Bookshelves/Materials_Science/Supplemental_Modules_(Materials_Science)/Crystal_Structures',
      whyRead:
        'Covers the exact derivations of a = 2R√2 (FCC), a = 4R/√3 (BCC), Atomic Packing Factor (APF), and X-ray Diffraction (Bragg’s Law).',
      inAppExcerpt: `Step-by-Step Derivation of Why FCC Edge Length is a = 2R√2:
Look at one square face of a Face-Centered Cubic (FCC) unit cell (like Aluminum or Copper):
• The corner spheres touch the center face sphere along the diagonal of the square face.
• Starting from the bottom-left corner center to the top-right corner center, the diagonal passes through:
  1 radius (corner) + 2 radii (full diameter of face atom) + 1 radius (corner) = 4R!
• Meanwhile, by the Pythagorean Theorem (Math 005) on a square of side length a:
  a² + a² = (Diagonal)²  →  2a² = (4R)² = 16R²
• Divide by 2:  a² = 8R²  →  Take the square root:  a = √8 · R = 2√2 · R!
You just derived a core Materials Engineering crystallography formula using nothing but basic geometry and algebra!`,
    },
    {
      id: 'read-mate102-2',
      type: 'Interactive Crystallography Guide',
      source: 'DoITPoMS (University of Cambridge Department of Materials Science)',
      title: 'Cambridge University Open Materials Library: Crystal Structures & Packing',
      readTime: '10 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/crystallography3/index.php',
      whyRead:
        'Created by Cambridge University’s Materials Science department—widely considered the best free interactive Materials Engineering library on the web!',
      inAppExcerpt: `Bookmark DoITPoMS for Your Entire 4 Years at University of Mindanao!
Maintained by the University of Cambridge Department of Materials Science and Metallurgy, the DoITPoMS TLP (Teaching and Learning Packages) Library offers 70+ open-source visual modules covering every subject you will take in UM BSMTE:
• Crystallography, Slip Planes & Dislocations
• Phase Diagrams & The Lever Rule
• Stress-Strain Tensile Testing & Fracture Mechanics
• Corrosion, Batteries & Electrochemistry
• Semiconductors, Polymers & Ceramic Processing.`,
    },
  ],

  'math-006': [
    {
      id: 'read-m006-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Elementary Algebra 2e • Chapters 6 & 9 (Factoring & Quadratics)',
      title: 'Factoring Trinomials, Completing the Square & The Quadratic Formula',
      readTime: '12 min read',
      url: 'https://openstax.org/books/elementary-algebra-2e/pages/9-3-solve-quadratic-equations-using-the-quadratic-formula',
      whyRead:
        'Step-by-step visual derivations and worked examples of every quadratic factoring pattern.',
      inAppExcerpt: `Quick Reference for Factoring Quadratics in Engineering:
1. Difference of Two Squares:  a² − b² = (a − b)(a + b).  Example: x² − 49 = (x − 7)(x + 7).
2. Perfect Square Trinomials:  a² + 2ab + b² = (a + b)².  Example: x² + 6x + 9 = (x + 3)².
3. When in doubt, plug directly into x = [−b ± √(b² − 4ac)] / (2a)—it never fails!`,
    },
  ],

  'math-007': [
    {
      id: 'read-m007-1',
      type: 'Visual Intuition Archive',
      source: '3Blue1Brown • Essence of Linear Algebra',
      title: 'Systems of Linear Equations as intersecting Lines & Matrix Transformations',
      readTime: '10 min read',
      url: 'https://www.3blue1brown.com/lessons/linear-systems',
      whyRead:
        'Shows how solving 2 or 3 simultaneous equations is the gateway to Linear Algebra and Finite Element Analysis (FEA).',
      inAppExcerpt: `Why Systems of Linear Equations Power Modern Engineering Software:
When civil and materials engineers simulate stress inside a bridge or aircraft wing using Finite Element Analysis (ANSYS / SolidWorks), the software breaks the part into 100,000 tiny triangles and solves a massive system of linear equations [K]{u} = {F} using Gaussian Elimination!`,
    },
  ],

  'math-008': [
    {
      id: 'read-m008-1',
      type: 'Intuition Blog',
      source: 'BetterExplained (Kalid Azad)',
      title: 'Using Logarithms in the Real World & Demystifying the Natural Log (ln)',
      readTime: '8 min read',
      url: 'https://betterexplained.com/articles/demystifying-the-natural-logarithm-ln/',
      whyRead:
        'Explains why e ≈ 2.718 and ln(x) appear naturally in every continuous rate process from diffusion to cooling.',
      inAppExcerpt: `Think of e^x and ln(x) as Inverse Time-Travel Buttons:
• e^(r·t) tells you: given continuous growth rate r and time t, what is my final multiplier?
• ln(Multiplier) tells you: given my final multiplier, how much growth time (r·t) did it take?
Because ln(e^u) = u, applying ln() to both sides of an Arrhenius equation (Rate = A·e^(−Q/RT)) immediately unwraps the exponent so you can solve for Activation Energy Q or Temperature T!`,
    },
  ],

  'chem-101': [
    {
      id: 'read-c101-1',
      type: 'Open-Source Textbook',
      source: 'OpenStax Chemistry: Atoms First 2e • Chapter 12 (Thermodynamics)',
      title: 'Spontaneity, Entropy (ΔS), and Gibbs Free Energy (ΔG = ΔH − TΔS)',
      readTime: '14 min read',
      url: 'https://openstax.org/books/chemistry-atoms-first-2e/pages/12-introduction',
      whyRead:
        'Covers the exact Four Cases of ΔG = ΔH − TΔS that determine when metallurgical reactions occur.',
      inAppExcerpt: `The 4 Quadrants of Gibbs Free Energy (ΔG = ΔH − TΔS):
1. ΔH < 0 (Exothermic) and ΔS > 0 (More disorder): ΔG is ALWAYS negative → Spontaneous at ALL temperatures!
2. ΔH > 0 (Endothermic) and ΔS < 0 (Less disorder): ΔG is ALWAYS positive → Non-spontaneous at ALL temperatures.
3. ΔH < 0 and ΔS < 0 (e.g. Liquid freezing into Solid crystal): Spontaneous only at LOW temperatures (T < ΔH/ΔS).
4. ΔH > 0 and ΔS > 0 (e.g. Solid melting or smelting ore): Spontaneous only at HIGH temperatures (T > ΔH/ΔS)!`,
    },
  ],

  'math-101': [
    {
      id: 'read-m101-1',
      type: 'Visual Intuition Archive',
      source: '3Blue1Brown • Essence of Calculus (Chapter 1–3)',
      title: 'The Paradox of the Derivative & Derivative Formulas Through Geometry',
      readTime: '12 min read',
      url: 'https://www.3blue1brown.com/topics/calculus',
      whyRead:
        'Visually proves why the derivative of x² is 2x (by expanding a square of side x by dx) and why d/dx(x³) = 3x² (expanding a cube of side x)!',
      inAppExcerpt: `3Blue1Brown’s Geometric Proof of Why d/dx(x²) = 2x:
Imagine a square of side length x (Area = x²). If you nudge the width and height by a tiny amount dx, you add two thin strips of area (x · dx) + (x · dx) = 2x · dx, plus a microscopic corner (dx)² that vanishes when divided by dx! Thus, the rate of area growth d(x²)/dx is literally 2x!`,
    },
  ],

  'math-102': [
    {
      id: 'read-m102-1',
      type: 'Open-Source Lecture Notes',
      source: 'Paul’s Online Math Notes • Calculus I (Integrals)',
      title: 'Indefinite Integrals, Definite Integrals & The Fundamental Theorem of Calculus',
      readTime: '12 min read',
      url: 'https://tutorial.math.lamar.edu/Classes/CalcI/IntegralsIntro.aspx',
      whyRead:
        'Clear worked examples of antiderivatives and area-under-the-curve integration.',
      inAppExcerpt: `Engineering Applications of the Integral ∫ y dx:
• Area under Velocity v(t) vs Time t  =  Total Distance Traveled
• Area under Force F(x) vs Displacement x  =  Mechanical Work Done (Joules)
• Area under Stress σ(ε) vs Strain ε  =  Modulus of Toughness (Energy absorbed per m³ before fracture)!`,
    },
  ],

  'phys-101': [
    {
      id: 'read-p101-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • Stress, Strain & Tensile Testing',
      title: 'Elasticity, Yielding, Work Hardening, Necking & True vs. Engineering Stress',
      readTime: '11 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/mechanical_testing/index.php',
      whyRead:
        'Interactive walk-through of Universal Testing Machine (UTM) tensile curves for steels, aluminum, polymers, and ceramics.',
      inAppExcerpt: `Why Does the Engineering Stress-Strain Curve Drop Downward After UTS?
At the Ultimate Tensile Strength (UTS), the specimen starts "necking" (narrowing locally at one spot). Because Engineering Stress divides Force by the ORIGINAL area A₀ (σ = F/A₀), and the thinner neck needs less force to keep stretching, σ_eng drops! If you divide by the actual shrinking neck area A_actual (True Stress σ_true = F/A_actual), the metal is actually getting stronger all the way until fracture!`,
    },
  ],

  'mate-201': [
    {
      id: 'read-mate201-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • Dislocations & Diffusion in Solids',
      title: 'Edge & Screw Dislocations, Slip Systems & Fick’s Laws of Atomic Diffusion',
      readTime: '14 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/dislocations/index.php',
      whyRead:
        'Animations of how dislocations glide on close-packed FCC {111} planes and how interstitial carbon diffuses in steel.',
      inAppExcerpt: `Why FCC Metals (Al, Cu, Au, γ-Fe) Never Become Brittle at Cryogenic Temperatures:
FCC crystals have close-packed {111} planes with 12 active slip systems, allowing dislocations to glide smoothly even at liquid nitrogen (−196 °C) temperatures! BCC metals (like ordinary carbon steel) lack truly close-packed planes and undergo a Ductile-to-Brittle Transition at freezing temperatures (which is why the Titanic’s hull steel fractured brittlely in −2 °C iceberg water!).`,
    },
  ],

  'mate-202': [
    {
      id: 'read-mate202-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • Phase Diagrams & The Iron-Carbon System',
      title: 'Binary Eutectic Phase Diagrams, The Lever Rule & Fe–Fe₃C Steel Microstructures',
      readTime: '15 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/phase-diagrams/index.php',
      whyRead:
        'Step-by-step interactive tie-line and Lever Rule exercises with real optical micrographs of Ferrite, Pearlite, and Cementite.',
      inAppExcerpt: `Summary of the Three Invariant Reactions on Phase Diagrams:
1. EUTECTIC (Liquid → Solid α + Solid β): Lowest melting point composition (used in solder and cast iron).
2. EUTECTOID (Solid γ → Solid α + Solid β): All-solid transformation! In steel at 727 °C and 0.76 wt% C: Austenite (γ) → Ferrite (α) + Cementite (Fe₃C) = Pearlite.
3. PERITECTIC (Liquid + Solid α → Solid β): Common in specialty superalloys and brasses.`,
    },
  ],

  'mate-203': [
    {
      id: 'read-mate203-1',
      type: 'Open-Source Materials Textbook',
      source: 'LibreTexts Materials Science • Phase Transformations & TTT Diagrams',
      title: 'Isothermal Transformation (TTT) Diagrams, Bainite, Martensite & Tempering',
      readTime: '13 min read',
      url: 'https://eng.libretexts.org/Bookshelves/Materials_Science',
      whyRead:
        'Explains how heat treatment tunes a single steel composition from 150 HV soft annealed state to 700 HV martensitic cutting edge.',
      inAppExcerpt: `Strength Ranking of Steel Microstructures (From Softest/Ductile to Hardest/Strongest):
Spheroidite < Coarse Pearlite (Annealed) < Fine Pearlite (Normalized) < Bainite < Tempered Martensite < As-Quenched Martensite!`,
    },
  ],

  'mate-301': [
    {
      id: 'read-mate301-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • The Glass Transition in Polymers',
      title: 'Thermoplastics, Thermosets, Elastomers & The Glass Transition Temperature (T_g)',
      readTime: '11 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/glass-transition/index.php',
      whyRead:
        'Includes video demonstrations of rubber shattering like glass in liquid nitrogen below T_g.',
      inAppExcerpt: `The Big 6 Commodity Recyclable Thermoplastics (Resin Codes #1–#6):
#1 PET (Beverage bottles, polyester fibers) | #2 HDPE (Milk jugs, chemical pipes) | #3 PVC (Plumbing pipes, cable insulation) | #4 LDPE (Plastic film/bags) | #5 PP (Polypropylene living hinges, auto bumpers) | #6 PS (Polystyrene foam & rigid cups).`,
    },
  ],

  'mate-302': [
    {
      id: 'read-mate302-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • Mechanics of Composite Materials',
      title: 'Griffith Brittle Fracture Mechanics & Continuous Fiber Composite Design',
      readTime: '12 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/bones/index.php',
      whyRead:
        'Derives Longitudinal (Iso-Strain: E_c = V_f·E_f + V_m·E_m) vs. Transverse (Iso-Stress) stiffness of fiber composites.',
      inAppExcerpt: `Anisotropy in Fiber Composites:
Continuous carbon-fiber composites are strongly ANISOTROPIC (direction-dependent): pulled parallel to the fibers, stiffness is huge (E_L = V_f·E_f + V_m·E_m ≈ 150 GPa). Pulled perpendicular (90°) to the fibers, stiffness drops to ~10 GPa! To get strength in all directions in an aircraft skin, engineers stack plies at [0° / +45° / −45° / 90°] ("Quasi-Isotropic Laminate")!`,
    },
  ],

  'mate-401': [
    {
      id: 'read-mate401-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • Semiconductors & Band Theory',
      title: 'Fermi Level, Intrinsic vs. Extrinsic Doping (n-type / p-type) & p-n Junctions',
      readTime: '14 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/semiconductors/index.php',
      whyRead:
        'Bridges solid-state physics directly to diodes, solar photovoltaics, LEDs, and CMOS transistors.',
      inAppExcerpt: `How Your CS Logic Gates Are Built Inside a Silicon Wafer:
Starting from ultra-pure "Electronic Grade Silicon" (99.9999999% pure — "Nine Nines", only 1 impurity atom per billion!), photolithography masks selectively implant Boron (p-well) and Phosphorus/Arsenic (n+ source/drain) ions, separated by a 1–2 nm gate oxide insulator (SiO₂ / HfO₂) to form billions of complementary NMOS + PMOS (CMOS) transistors!`,
    },
  ],

  'mate-402': [
    {
      id: 'read-mate402-1',
      type: 'Interactive Materials Module',
      source: 'DoITPoMS (University of Cambridge) • Aqueous Corrosion & Materials Selection',
      title: 'Electrochemical Corrosion, Pourbaix Diagrams, Cathodic Protection & Ashby Charts',
      readTime: '15 min read',
      url: 'https://www.doitpoms.ac.uk/tlplib/aqueous_corrosion/index.php',
      whyRead:
        'Covers real-world failure analysis and Prof. Michael Ashby’s systematic Materials Selection methodology.',
      inAppExcerpt: `How Stainless Steel Protects Itself ("Passivation"):
Why doesn’t Stainless Steel (Fe with ≥11 wt% Chromium) rust? Because Chromium is actually MORE reactive with oxygen than Iron! The moment Chromium is exposed to air, it reacts to form an invisible, self-healing, 2-nanometer-thick ceramic skin of Chromium Oxide (Cr₂O₃) that seals the steel underneath from further oxygen and water!`,
    },
  ],
};

export const GLOBAL_OPEN_SOURCE_SHELF = [
  {
    title: 'OpenStax: Chemistry: Atoms First 2e',
    category: 'Free Peer-Reviewed Textbook (Rice University)',
    url: 'https://openstax.org/details/books/chemistry-atoms-first-2e',
    description:
      'Complete zero-cost general chemistry textbook structured from the atom up—ideal for future Materials Engineers.',
  },
  {
    title: 'OpenStax: Prealgebra 2e → Elementary Algebra 2e → Precalculus 2e',
    category: 'Free Peer-Reviewed Math Series',
    url: 'https://openstax.org/subjects/math',
    description:
      'Step-by-step explanations and thousands of practice exercises from basic arithmetic to trigonometry and vectors.',
  },
  {
    title: 'DoITPoMS (University of Cambridge Materials Science Library)',
    category: 'Open-Source Materials Engineering Interactive Modules',
    url: 'https://www.doitpoms.ac.uk/tlplib/index.php',
    description:
      'World-renowned open-access visual tutorials on crystallography, phase diagrams, mechanical testing, and polymers.',
  },
  {
    title: '3Blue1Brown Written Lesson Archive',
    category: 'Visual Mathematical Intuition (Grant Sanderson)',
    url: 'https://www.3blue1brown.com/',
    description:
      'Interactive written versions of 3Blue1Brown’s famous visual guides on Algebra, Linear Algebra, Calculus, and Differential Equations.',
  },
  {
    title: 'BetterExplained (Kalid Azad)',
    category: 'Math Without Rote Memorization Blog',
    url: 'https://betterexplained.com/cheatsheet/',
    description:
      'Focuses purely on the "aha!" intuition and historical why behind fractions, exponents, logarithms, trig, and calculus.',
  },
  {
    title: 'Paul’s Online Math Notes (Lamar University)',
    category: 'Engineering Math Reference & Worked Problems',
    url: 'https://tutorial.math.lamar.edu/',
    description:
      'No-nonsense college notes and step-by-step worked solutions for Algebra, Trig, Calculus I–III, and Differential Equations.',
  },
];
