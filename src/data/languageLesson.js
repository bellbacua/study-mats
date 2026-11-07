// "The Language of Math": how to read the symbols used in every later class.

export const LANGUAGE_LESSON = {
  id: 'num-010',
  code: 'NUM 10',
  track: 'math',
  standardMins: 40,
  overtimeMins: 15,
  xpReward: 100,
  prereqIds: [],
  umCourseLink: '',
  title: 'The Language of Math: Reading Symbols Like ∈, ⊂, ∀, ⇒ and Σ',
  subtitle: 'Sets, logic and shorthand: the vocabulary every textbook assumes you already know',
  overtimeDigest: [
    'Maths symbols are just abbreviations for words. ∈ reads "is an element of", ⊂ "is inside", ∀ "for every", ∃ "there exists", ⇒ "implies".',
    'The number families nest like boxes: ℕ (counting) ⊂ ℤ (integers) ⊂ ℚ (fractions) ⊂ ℝ (real line) ⊂ ℂ (complex).',
    'Σ means "add them all up", f(x) means "the output of f when you put in x". Read any formula aloud and it becomes a sentence.',
  ],
  history: {
    era: '1557 Recorde → 1591 Viète → 1637 Descartes → 1734 Euler → 1889 Peano',
    protagonist: 'Robert Recorde, François Viète, Leonhard Euler & Giuseppe Peano',
    hook: 'Why did maths take 3,000 years to get its symbols, and why do they look like a secret code?',
    narrative: [
      'For most of history, maths was written in words. Al-Khwarizmi’s algebra (820 AD) has no symbols at all: "a square and ten roots equal thirty-nine". Symbols arrived slowly, one at a time: + and − in 1489, = from Robert Recorde in 1557 (two parallel lines, "because no two things can be more equal"), and in 1591 François Viète’s idea of using letters for unknown and known quantities. Descartes (1637) gave us x, y, z for unknowns and a, b, c for known values, the convention you still use.',
      'Leonhard Euler, the most prolific mathematician in history, standardised much of the rest: f(x) for a function (1734), Σ for a sum (1755), e for the natural base and i for √−1, and he made π (first used by William Jones in 1706) universal. Good notation let one line replace a paragraph.',
      'In the 1870s Georg Cantor invented set theory, the idea that maths can be built from collections of things. In 1889 Giuseppe Peano introduced ∈ (a Greek epsilon, for the Latin est, "is") to say an object belongs to a set, along with many logic symbols. The "blackboard bold" letters ℕ, ℤ, ℚ, ℝ, ℂ came later still, from lecturers trying to write bold letters in chalk.',
    ],
    takeaway:
      'Every symbol is shorthand for a few words. When a formula looks scary, read it aloud symbol by symbol: it is always just a sentence.',
  },
  visualLab: {
    type: 'number_sets',
    title: 'Where Does This Number Live?',
    instructions: 'Pick a number and see which number families it belongs to (∈) and which it does not (∉).',
    missionPrompt: 'Find a number that is in ℝ but not in ℚ.',
    targetState: {},
  },
  guidedSteps: [
    {
      title: '1. Sets and membership',
      formula: '3 \\in \\mathbb{N} \\qquad -3 \\notin \\mathbb{N} \\qquad \\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}',
      explanation:
        'A set is a collection. "x ∈ A" reads "x is an element of A"; "∉" means "is not". "A ⊂ B" reads "A is a subset of B": everything in A is also in B. Curly brackets list members: {1, 2, 3}.',
    },
    {
      title: '2. Logic words',
      formula: '\\forall x \\in \\mathbb{R},\\; x^2 \\ge 0 \\qquad \\exists x \\in \\mathbb{R}: x^2 = 2 \\qquad x > 3 \\Rightarrow x > 1',
      explanation:
        '∀ = "for every", ∃ = "there exists", ":" or "s.t." = "such that", ⇒ = "implies" (if… then…), ⇔ = "if and only if", ∴ = "therefore". The first statement reads: "for every real number x, x squared is at least zero".',
    },
    {
      title: '3. Shorthand you will meet constantly',
      formula: '\\sum_{i=1}^{4} i = 1 + 2 + 3 + 4 = 10 \\qquad f(x) = x^2 \\Rightarrow f(3) = 9 \\qquad |{-5}| = 5 \\qquad 4! = 24',
      explanation:
        'Σ adds up a pattern (i runs from the bottom number to the top). f(x) is the output of a rule f for input x. |x| is the size of x ignoring its sign. n! (factorial) multiplies 1 × 2 × … × n. Δ means "change in", ≈ "approximately".',
    },
  ],
  gate: {
    drills: [
      {
        id: 'n010-d1',
        question: 'Which statement is TRUE?',
        options: ['−3 ∈ ℤ', '−3 ∈ ℕ', '½ ∈ ℤ', '√2 ∈ ℚ'],
        correctIndex: 0,
        hint1: 'ℤ is the integers: whole numbers with negatives.',
        hint2: 'ℕ has no negatives; ½ is not whole; √2 is irrational.',
        explanation: '−3 is a whole number, so it is an integer: −3 ∈ ℤ. It is not a natural number, ½ is not an integer, and √2 is not a fraction.',
      },
      {
        id: 'n010-d2',
        question: 'How do you read "∀ x ∈ ℝ, x² ≥ 0"?',
        options: [
          'For every real number x, x squared is at least 0',
          'There is a real number whose square is 0',
          'x is a real number bigger than 0',
          'Every number is real',
        ],
        correctIndex: 0,
        hint1: '∀ means "for every".',
        hint2: '∈ ℝ means "in the real numbers".',
        explanation: '∀ = for every, x ∈ ℝ = x is a real number, x² ≥ 0 = x squared is greater than or equal to 0.',
      },
      {
        id: 'n010-d3',
        question: 'What is Σ from i = 1 to 5 of 2i?',
        options: ['30', '10', '15', '25'],
        correctIndex: 0,
        hint1: 'Write out the terms: 2·1 + 2·2 + …',
        hint2: '2 + 4 + 6 + 8 + 10.',
        explanation: '2 + 4 + 6 + 8 + 10 = 30.',
      },
    ],
    bossProblem: {
      title: 'Reading a Steel Specification',
      scenario:
        'A purchasing spec says: "∀ s ∈ S, H(s) ≥ 50 HRC, where S is the set of samples tested and H(s) is the hardness of sample s." What does it require?',
      options: [
        'Every tested sample must have a hardness of at least 50 HRC',
        'At least one sample must reach 50 HRC',
        'The average hardness must be 50 HRC',
        'No sample may exceed 50 HRC',
      ],
      correctIndex: 0,
      hint: '∀ means "for every"; ≥ means "greater than or equal to".',
      explanation: '"For every sample s in S, the hardness of s is at least 50 HRC": a single soft sample fails the batch. If it said ∃ instead of ∀, one hard sample would be enough.',
    },
  },
};

export const LANGUAGE_READINGS = {
  'num-010': [
    {
      id: 'read-n010-l1',
      type: 'Encyclopedia',
      source: 'Wikipedia',
      title: 'Glossary of Mathematical Symbols',
      readTime: 'reference',
      url: 'https://en.wikipedia.org/wiki/Glossary_of_mathematical_symbols',
      whyRead: 'A complete dictionary of symbols with how to read each one aloud. Bookmark it.',
      inAppExcerpt:
        'The glossary groups symbols by use: arithmetic (+ − × ÷), equality and order (= ≠ ≈ < ≤), sets (∈ ∉ ⊂ ∪ ∩ ∅), logic (∀ ∃ ¬ ∧ ∨ ⇒ ⇔), calculus (d/dx ∂ ∫ Σ lim) and more, each with its name and meaning.',
    },
    {
      id: 'read-n010-l2',
      type: 'Encyclopedia',
      source: 'Wikipedia',
      title: 'History of Mathematical Notation',
      readTime: '10 min read',
      url: 'https://en.wikipedia.org/wiki/History_of_mathematical_notation',
      whyRead: 'How maths went from all words, to abbreviations, to the symbols we use now.',
      inAppExcerpt:
        'Historians describe three stages: rhetorical (everything in words), syncopated (abbreviations, as in Diophantus) and symbolic (from the 16th century, with Viète, Descartes, Leibniz and Euler).',
    },
  ],
};

export const LANGUAGE_LABS = {
  'num-010': [
    {
      tool: 'Detexify (draw a symbol, get its name)',
      kind: 'online',
      url: 'https://detexify.kirelabs.org/classify.html',
      task: 'Draw a symbol you saw in a textbook (like ∀ or ∂) and find out what it is called and how to type it in your notes.',
    },
    {
      tool: 'At home',
      kind: 'home',
      url: null,
      task: 'Take any formula from a later class (e.g. ΔG = ΔH − TΔS) and write it out as a full English sentence in your notes.',
    },
  ],
};
