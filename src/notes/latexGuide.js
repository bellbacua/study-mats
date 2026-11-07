// Cheat sheet shown in the notes panel. Clicking an example inserts `insert`
// at the cursor.
export const LATEX_GUIDE = [
  {
    title: 'The basics',
    tip: 'Wrap maths in $ … $ to keep it in a sentence, or $$ … $$ to give it its own centred line. Everything else is normal text; # makes a heading, - makes a bullet, **bold** makes bold.',
    items: [
      { label: 'Inline maths', insert: 'The area is $A = \\pi r^2$.' },
      { label: 'Display maths', insert: '$$F = m a$$' },
      { label: 'Heading', insert: '## Key idea' },
      { label: 'Bullet list', insert: '- first point\n- second point' },
    ],
  },
  {
    title: 'Powers, fractions, roots',
    items: [
      { label: 'Power', insert: '$x^2$' },
      { label: 'Power with several characters', insert: '$10^{23}$' },
      { label: 'Subscript', insert: '$x_1$' },
      { label: 'Fraction', insert: '$\\frac{a}{b}$' },
      { label: 'Square root', insert: '$\\sqrt{2}$' },
      { label: 'Other root', insert: '$\\sqrt[3]{8}$' },
    ],
  },
  {
    title: 'Operators & comparisons',
    items: [
      { label: 'Times / dot', insert: '$a \\times b = a \\cdot b$' },
      { label: 'Divide', insert: '$a \\div b$' },
      { label: 'Plus or minus', insert: '$\\pm$' },
      { label: 'Not equal, approx', insert: '$a \\ne b, \\quad \\pi \\approx 3.14$' },
      { label: 'Less / greater or equal', insert: '$a \\le b, \\quad c \\ge d$' },
      { label: 'Proportional', insert: '$d \\propto t^2$' },
    ],
  },
  {
    title: 'Greek letters',
    tip: 'Type the name with a backslash. Capitals: \\Delta, \\Sigma, \\Omega.',
    items: [
      { label: 'α β γ δ', insert: '$\\alpha, \\beta, \\gamma, \\delta$' },
      { label: 'ε θ λ μ', insert: '$\\varepsilon, \\theta, \\lambda, \\mu$' },
      { label: 'π ρ σ τ', insert: '$\\pi, \\rho, \\sigma, \\tau$' },
      { label: 'Δ Σ Ω', insert: '$\\Delta G, \\Sigma, \\Omega$' },
    ],
  },
  {
    title: 'Sets & logic',
    items: [
      { label: 'Number sets', insert: '$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$' },
      { label: 'Element of / not', insert: '$3 \\in \\mathbb{N}, \\quad -3 \\notin \\mathbb{N}$' },
      { label: 'For all / exists', insert: '$\\forall x \\; \\exists y$' },
      { label: 'Implies / iff', insert: '$A \\Rightarrow B, \\quad A \\iff B$' },
      { label: 'Therefore', insert: '$\\therefore$' },
      { label: 'Infinity', insert: '$\\infty$' },
    ],
  },
  {
    title: 'Calculus',
    items: [
      { label: 'Sum', insert: '$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$' },
      { label: 'Limit', insert: '$\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$' },
      { label: 'Derivative', insert: '$\\frac{dy}{dx}$' },
      { label: 'Integral', insert: '$$\\int_0^{\\varepsilon_f} \\sigma \\, d\\varepsilon$$' },
      { label: 'Partial', insert: '$\\frac{\\partial C}{\\partial t} = D \\frac{\\partial^2 C}{\\partial x^2}$' },
    ],
  },
  {
    title: 'Science & units',
    tip: 'Use \\text{…} for words inside maths and \\, for a small space before units.',
    items: [
      { label: 'Chemical formula', insert: '$\\text{H}_2\\text{O}, \\; \\text{Fe}_2\\text{O}_3$' },
      { label: 'Reaction arrow', insert: '$2\\,\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O}$' },
      { label: 'Units', insert: '$v = 5\\,\\text{m/s}$' },
      { label: 'Degrees', insert: '$727\\,^\\circ\\text{C}$' },
      { label: 'Scientific notation', insert: '$6.022 \\times 10^{23}\\,\\text{mol}^{-1}$' },
    ],
  },
  {
    title: 'Brackets & layout',
    items: [
      { label: 'Big brackets', insert: '$\\left( \\frac{a}{b} \\right)^2$' },
      { label: 'Matrix', insert: '$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$$' },
      { label: 'Line up equations', insert: '$$\\begin{aligned} 3x + 4 &= 19 \\\\ 3x &= 15 \\\\ x &= 5 \\end{aligned}$$' },
      { label: 'Cases', insert: '$$|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}$$' },
    ],
  },
];
