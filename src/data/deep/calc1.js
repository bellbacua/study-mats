// Calculus 1 (CEE 101) pilot: each class split into four parts.
// A part = a short explanation, key formulas, worked examples shown one step
// at a time, and practice problems where you type the answer.
//
// Practice answers: a number (checked to about 1%), or 'inf', '-inf' or 'dne'
// (does not exist). `tol` overrides the tolerance (absolute).

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const CALC1 = {
  'math-012': {
    predict: {
      q: 'f(x) = (x² − 1)/(x − 1) has no value at x = 1 (it would be 0/0). As x gets very close to 1, what do you expect f(x) to get close to?',
      options: ['2', '0', '1', 'Nothing: it blows up'],
      answer: 0,
      reveal: 'It heads to 2. Away from x = 1, (x² − 1)/(x − 1) is just x + 1, so near 1 it is near 2. The graph is a straight line with one missing point.',
    },
    parts: [
      {
        title: 'Getting close: tables and holes',
        minutes: 20,
        explain: [
          'A limit asks: what value does f(x) head towards as x gets closer and closer to a, without caring what happens exactly at a? We write lim x→a f(x) = L.',
          'The simplest way to find one is a table. Pick x values just below and just above a (1.9, 1.99, 1.999 and 2.1, 2.01, 2.001) and watch the outputs. If both sides settle on the same number, that number is the limit.',
          'This matters because many useful formulas break at exactly the point you care about. f(x) = (x² − 4)/(x − 2) is 0/0 at x = 2, yet near 2 it behaves perfectly well. The graph has a hole, and the limit tells you where the hole is.',
        ],
        formulas: [['Limit', '\\lim_{x \\to a} f(x) = L']],
        examples: [
          ex('Use a table to find lim x→2 of (x² − 4)/(x − 2).', [
            ['Try x just below 2.', 'x = 1.9 \\Rightarrow 3.9, \\quad x = 1.99 \\Rightarrow 3.99'],
            ['Try x just above 2.', 'x = 2.1 \\Rightarrow 4.1, \\quad x = 2.01 \\Rightarrow 4.01'],
            ['Both sides close in on the same value.', '\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = 4'],
          ], '4'),
          ex('Find lim x→0 of sin(x)/x, with x in radians.', [
            ['At x = 0 it is 0/0, so use a table.', 'x = 0.1 \\Rightarrow 0.99833'],
            ['Go closer.', 'x = 0.01 \\Rightarrow 0.999983'],
            ['From the negative side the values are the same, since sin(−x)/(−x) = sin(x)/x.', '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1'],
          ], '1'),
        ],
        practice: [
          pr('Use a table (or think) to find lim x→3 of (x² − 9)/(x − 3).', 6, 'Try x = 2.99 and 3.01.', 'x = 2.99 gives 5.99 and x = 3.01 gives 6.01. The limit is 6.'),
          pr('Find lim x→0 of (eˣ − 1)/x using x = ±0.01.', 1, 'Compute (e^0.01 − 1)/0.01.', 'x = 0.01 gives 1.005 and x = −0.01 gives 0.995. The limit is 1.'),
          pr('Find lim x→1 of (x³ − 1)/(x − 1).', 3, 'Try x = 1.01: (1.030301 − 1)/0.01.', 'x = 1.01 gives 3.03 and x = 0.99 gives 2.97. The limit is 3.'),
          pr('Find lim x→0 of (1 − cos x)/x² (radians).', 0.5, 'Try x = 0.1: (1 − 0.995004)/0.01.', 'x = 0.1 gives 0.4996, x = 0.01 gives 0.49999. The limit is 0.5.'),
        ],
      },
      {
        title: 'Calculating limits: substitute, then simplify',
        minutes: 25,
        explain: [
          'Tables are slow. For most formulas there is a faster way: just put x = a in. If the formula is a polynomial, or a fraction whose bottom is not zero at a, the answer you get is the limit.',
          'If substituting gives 0/0, that is not an answer. It means "simplify first". Factor the top and bottom and cancel the common factor, or, when there is a square root, multiply top and bottom by the conjugate (√x + 2 for √x − 2).',
          'If substituting gives a non-zero number over 0, the function shoots off towards infinity there: no finite limit.',
        ],
        formulas: [
          ['Limit laws', '\\lim (f \\pm g) = \\lim f \\pm \\lim g, \\quad \\lim (fg) = \\lim f \\cdot \\lim g'],
          ['Warning sign', '\\tfrac{0}{0} \\text{ means simplify, not "no answer"}'],
        ],
        examples: [
          ex('Find lim x→−1 of (x² + 3x + 2)/(x + 1).', [
            ['Substitute: the top is 1 − 3 + 2 = 0 and the bottom is 0.', '\\tfrac{0}{0}'],
            ['Factor the top.', '\\frac{(x+1)(x+2)}{x+1} = x + 2 \\quad (x \\ne -1)'],
            ['Now substitute.', '\\lim_{x \\to -1} (x + 2) = 1'],
          ], '1'),
          ex('Find lim x→4 of (√x − 2)/(x − 4).', [
            ['Substituting gives 0/0.', '\\tfrac{0}{0}'],
            ['Multiply top and bottom by the conjugate √x + 2. The top becomes x − 4.', '\\frac{x-4}{(x-4)(\\sqrt{x}+2)} = \\frac{1}{\\sqrt{x}+2}'],
            ['Substitute x = 4.', '\\frac{1}{2+2} = \\frac{1}{4}'],
          ], '0.25'),
        ],
        practice: [
          pr('lim x→2 of (3x² − x + 5)', 15, 'A polynomial: just substitute.', '3(4) − 2 + 5 = 15.'),
          pr('lim x→5 of (x² − 25)/(x − 5)', 10, 'x² − 25 = (x − 5)(x + 5).', 'Cancel to get x + 5, which is 10 at x = 5.'),
          pr('lim x→3 of (x² − 5x + 6)/(x − 3)', 1, 'Factor x² − 5x + 6.', '(x − 2)(x − 3)/(x − 3) = x − 2, which is 1 at x = 3.'),
          pr('lim x→9 of (√x − 3)/(x − 9)', 1 / 6, 'Multiply by √x + 3 on top and bottom.', 'It becomes 1/(√x + 3) = 1/6 ≈ 0.167.'),
          pr('lim h→0 of ((2 + h)² − 4)/h', 4, 'Expand (2 + h)² = 4 + 4h + h².', '(4h + h²)/h = 4 + h, which goes to 4.'),
        ],
      },
      {
        title: 'One-sided limits, jumps and continuity',
        minutes: 25,
        explain: [
          'Sometimes the two sides disagree. The left-hand limit (x → a⁻) uses only x below a; the right-hand limit (x → a⁺) only x above. The ordinary limit exists only when both exist and are equal.',
          'A function is continuous at a when you can draw through a without lifting your pen: f(a) exists, the limit exists, and they are equal. Breaks come in three kinds: a hole (removable), a jump, and an infinite break (a vertical asymptote).',
          'Materials have real jumps. Pure iron changes from BCC to FCC at 912 °C, and its density jumps at that temperature. A graph of density against temperature has a jump discontinuity there.',
        ],
        formulas: [
          ['Limit exists', '\\lim_{x \\to a^-} f = \\lim_{x \\to a^+} f = L'],
          ['Continuous at a', '\\lim_{x \\to a} f(x) = f(a)'],
        ],
        examples: [
          ex('f(x) = x + 1 for x < 2 and 5 − x for x ≥ 2. Is f continuous at 2?', [
            ['Left side uses x + 1.', '\\lim_{x \\to 2^-} f = 3'],
            ['Right side uses 5 − x.', '\\lim_{x \\to 2^+} f = 3'],
            ['They agree, and f(2) = 5 − 2 = 3.', '\\text{continuous at } x = 2'],
          ], 'yes'),
          ex('What happens to 1/x near x = 0?', [
            ['From the right, x = 0.01 gives 100, x = 0.001 gives 1,000.', '\\lim_{x \\to 0^+} \\tfrac{1}{x} = +\\infty'],
            ['From the left, x = −0.01 gives −100.', '\\lim_{x \\to 0^-} \\tfrac{1}{x} = -\\infty'],
            ['The sides disagree, so the two-sided limit does not exist. x = 0 is a vertical asymptote.', '\\lim_{x \\to 0} \\tfrac{1}{x} \\text{ does not exist}'],
          ], 'does not exist'),
        ],
        practice: [
          pr('f(x) = 2x for x < 1 and x² + 3 for x ≥ 1. Find lim x→1⁻ f(x).', 2, 'Left of 1, use 2x.', '2 × 1 = 2.'),
          pr('Same f. Find lim x→1⁺ f(x).', 4, 'Right of 1, use x² + 3.', '1 + 3 = 4.'),
          pr('Same f. What is lim x→1 f(x)? (Type a number, or "dne" if it does not exist.)', 'dne', 'Compare the two one-sided limits.', 'The left limit is 2 and the right is 4, so the limit does not exist: a jump.'),
          pr('g(x) = kx + 1 for x < 2 and x² for x ≥ 2. Which k makes g continuous at 2?', 1.5, 'Make both sides equal at x = 2.', '2k + 1 = 4, so k = 1.5.'),
          pr('lim x→3⁺ of 1/(x − 3). (Type "inf" for infinity.)', 'inf', 'Just above 3, x − 3 is a tiny positive number.', '1 divided by a tiny positive number is huge and positive: +∞.'),
        ],
      },
      {
        title: 'Limits at infinity and steady states',
        minutes: 20,
        explain: [
          'We can also ask where a function heads as x grows without end. For a fraction of polynomials, only the highest powers matter when x is huge. Same top and bottom degree: the limit is the ratio of the leading numbers. Bottom degree higher: 0. Top higher: it grows without bound.',
          'Exponential decay e^(−kt) goes to 0 as t → ∞. That is why a hot part cooling in air, T(t) = 25 + 175e^(−0.1t), settles at 25 °C: the room temperature is a horizontal asymptote.',
          'Engineers call such limits steady states: the final temperature, the final strain under a constant load, the final concentration after diffusion.',
        ],
        formulas: [
          ['Leading terms win', '\\lim_{x \\to \\infty} \\frac{a x^n + \\cdots}{b x^n + \\cdots} = \\frac{a}{b}'],
          ['Decay', '\\lim_{t \\to \\infty} e^{-kt} = 0 \\quad (k > 0)'],
        ],
        examples: [
          ex('Find lim x→∞ of (3x² + 2)/(5x² − x).', [
            ['Divide top and bottom by x².', '\\frac{3 + 2/x^2}{5 - 1/x}'],
            ['As x → ∞, 2/x² and 1/x go to 0.', '\\to \\frac{3}{5}'],
          ], '0.6'),
          ex('A part cools as T(t) = 25 + 175e^(−0.1t) °C (t in minutes). What is its final temperature, and how hot is it after 30 min?', [
            ['As t → ∞, the exponential term vanishes.', '\\lim_{t \\to \\infty} T = 25\\,°\\text{C}'],
            ['At t = 30, e^(−3) ≈ 0.0498.', 'T(30) = 25 + 175(0.0498) \\approx 33.7\\,°\\text{C}'],
          ], '25 °C; 33.7 °C'),
        ],
        practice: [
          pr('lim x→∞ of (4x³ − x)/(2x³ + 7)', 2, 'Same degree: compare leading numbers.', '4/2 = 2.'),
          pr('lim x→∞ of (x + 1)/(x² + 1)', 0, 'The bottom has the higher power.', 'Bottom grows faster: the limit is 0.'),
          pr('A sensor reading follows R(t) = 100(1 − e^(−t/5)). What does it settle at?', 100, 'What does e^(−t/5) do for large t?', 'e^(−t/5) → 0, so R → 100.'),
          pr('Concentration C(t) = 8t/(t + 2). What is its steady-state value?', 8, 'Divide top and bottom by t.', '8/(1 + 2/t) → 8.'),
          pr('f(x) = 3/(x − 4) has a vertical asymptote at x = ?', 4, 'Where is the bottom zero?', 'x − 4 = 0 at x = 4.'),
        ],
      },
    ],
  },

  'math-101': {
    predict: {
      q: 'On the curve y = x² − 4x + 5, where do you expect the tangent line to be perfectly flat?',
      options: ['At x = 2', 'At x = 0', 'At x = 5', 'Nowhere'],
      answer: 0,
      reveal: 'At x = 2, the bottom of the valley. There the slope dy/dx = 2x − 4 is zero.',
    },
    parts: [
      {
        title: 'Average rate of change',
        minutes: 20,
        explain: [
          'Before slopes of curves, start with something you already know: the slope of a straight line through two points, rise over run. For any function, the slope of the line joining (a, f(a)) and (b, f(b)) is its average rate of change between a and b.',
          'The units tell you what it means. If T is temperature in °C and t is time in minutes, (T₂ − T₁)/(t₂ − t₁) is in °C per minute: an average cooling rate.',
          'The catch: an average hides what happens in between. A steel bar quenched in water cools fastest at the start. To know the rate at one instant we need the next idea, the derivative.',
        ],
        formulas: [['Average rate (secant slope)', '\\frac{\\Delta f}{\\Delta x} = \\frac{f(b) - f(a)}{b - a}']],
        examples: [
          ex('A steel bar is at 850 °C at t = 0 and 450 °C at t = 4 min. Its average cooling rate?', [
            ['Change in temperature.', '\\Delta T = 450 - 850 = -400\\,°\\text{C}'],
            ['Divide by the time taken.', '\\frac{-400}{4} = -100\\,°\\text{C/min}'],
            ['The minus sign means it is cooling.', ''],
          ], '−100 °C/min'),
          ex('f(x) = x². Average rate of change from x = 1 to x = 3?', [
            ['Values at the ends.', 'f(1) = 1, \\quad f(3) = 9'],
            ['Rise over run.', '\\frac{9 - 1}{3 - 1} = 4'],
          ], '4'),
        ],
        practice: [
          pr('f(x) = x³. Average rate of change from x = 1 to x = 2?', 7, '(f(2) − f(1))/(2 − 1).', '(8 − 1)/1 = 7.'),
          pr('f(x) = x². Average rate from x = 2 to x = 2.1?', 4.1, 'f(2.1) = 4.41.', '(4.41 − 4)/0.1 = 4.1. Notice it is close to 4: the slope at x = 2.'),
          pr('A fatigue crack is 2.0 mm long after 10,000 cycles and 3.5 mm after 25,000 cycles. Average growth in mm per 1,000 cycles?', 0.1, 'Change in length ÷ change in thousands of cycles.', '1.5 mm ÷ 15 thousand cycles = 0.1 mm per 1,000 cycles.'),
          pr('f(x) = 1/x. Average rate from x = 1 to x = 4?', -0.25, 'f(4) = 0.25.', '(0.25 − 1)/3 = −0.25.'),
        ],
      },
      {
        title: 'The derivative as a limit',
        minutes: 25,
        explain: [
          'To get the slope at a single point a, take the average rate from a to a + h and let h shrink to zero. The secant line turns into the tangent line, and its slope is the derivative f′(a).',
          'This is where limits pay off: at h = 0 the formula is 0/0, but the limit exists. Doing this by hand is called working "from first principles". You will rarely do it later, but it shows what a derivative is.',
          'Notation: f′(x), dy/dx and df/dx all mean the same thing, the slope of f at x.',
        ],
        formulas: [['Definition', "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}"]],
        examples: [
          ex('Find f′(3) for f(x) = x² from first principles.', [
            ['Write the difference quotient.', '\\frac{(3+h)^2 - 9}{h} = \\frac{9 + 6h + h^2 - 9}{h}'],
            ['Simplify (h ≠ 0).', '= 6 + h'],
            ['Let h → 0.', "f'(3) = 6"],
          ], '6'),
          ex('Find f′(2) for f(x) = 1/x.', [
            ['Difference quotient.', '\\frac{\\frac{1}{2+h} - \\frac{1}{2}}{h} = \\frac{2 - (2+h)}{2(2+h)h}'],
            ['Simplify.', '= \\frac{-1}{2(2+h)}'],
            ['Let h → 0.', "f'(2) = -\\tfrac{1}{4}"],
          ], '−0.25'),
        ],
        practice: [
          pr('f(x) = x². Find f′(5) from first principles.', 10, '((5 + h)² − 25)/h = 10 + h.', 'Let h → 0: f′(5) = 10.'),
          pr('f(x) = 3x + 7. Find f′(x).', 3, 'The difference quotient is (3(x + h) + 7 − 3x − 7)/h.', 'It simplifies to 3h/h = 3. A straight line has the same slope everywhere.'),
          pr('f(x) = x³. Find f′(2). (Hint: (2 + h)³ = 8 + 12h + 6h² + h³.)', 12, 'Subtract 8 and divide by h.', '(12h + 6h² + h³)/h = 12 + 6h + h² → 12.'),
          pr('f(x) = x². Compute the difference quotient at a = 3 with h = 0.01 (not the limit).', 6.01, '((3.01)² − 9)/0.01.', '(9.0601 − 9)/0.01 = 6.01, very close to the true slope 6.', { tol: 0.001 }),
        ],
      },
      {
        title: 'The power rule and tangent lines',
        minutes: 25,
        explain: [
          'Doing limits every time would be painful. Luckily a pattern appears: the slope of xⁿ is n·xⁿ⁻¹. It works for any power, including negative ones (1/x² = x⁻²) and fractions (√x = x^(1/2)). Constants have slope 0, and a polynomial is differentiated one term at a time.',
          'Once you know the slope at a, you can write the tangent line: y = f(a) + f′(a)(x − a). Near a, the tangent line is an excellent approximation of the curve. Engineers use it constantly to estimate small changes.',
        ],
        formulas: [
          ['Power rule', '\\frac{d}{dx} x^n = n x^{n-1}'],
          ['Tangent line at a', "y = f(a) + f'(a)(x - a)"],
        ],
        examples: [
          ex('Differentiate y = 4x³ − 5x² + 6x − 9 and find the slope at x = 1.', [
            ['Term by term.', "y' = 12x^2 - 10x + 6"],
            ['Substitute x = 1.', "y'(1) = 12 - 10 + 6 = 8"],
          ], '8'),
          ex('Use the tangent line to y = √x at x = 4 to estimate √4.2.', [
            ['Value and slope at 4.', "f(4) = 2, \\quad f'(x) = \\tfrac{1}{2\\sqrt{x}} \\Rightarrow f'(4) = \\tfrac14"],
            ['Tangent line.', 'y = 2 + \\tfrac14 (x - 4)'],
            ['At x = 4.2.', 'y = 2 + 0.05 = 2.05 \\quad (\\text{true: } 2.0494)'],
          ], '2.05'),
        ],
        practice: [
          pr('y = 5x⁴. Find y′ at x = 1.', 20, 'Bring the 4 down: 20x³.', '20 × 1 = 20.'),
          pr('y = x³ − 6x. Find y′ at x = 2.', 6, "y' = 3x² − 6.", '12 − 6 = 6.'),
          pr('y = 1/x². Find y′ at x = 1.', -2, 'Write it as x⁻².', "y' = −2x⁻³, which is −2 at x = 1."),
          pr('y = √x. Find y′ at x = 9.', 1 / 6, 'y = x^(1/2), so y′ = 1/(2√x).', '1/(2 × 3) = 1/6 ≈ 0.167.'),
          pr('The tangent to y = x² at x = 3 crosses the y-axis at y = ?', -9, 'Tangent: y = 9 + 6(x − 3).', 'At x = 0: y = 9 − 18 = −9.'),
        ],
      },
      {
        title: 'Rates of change in the real world',
        minutes: 20,
        explain: [
          'A derivative always has units: the units of the output per unit of the input. The derivative of position (m) with time (s) is velocity (m/s); of velocity, acceleration (m/s²).',
          'In materials, the slope of a stress-strain line is the elastic modulus; the slope of heat absorbed against temperature is the heat capacity; the slope of length against temperature gives thermal expansion.',
          'So when you read "rate", "per", or "how fast", think derivative.',
        ],
        formulas: [
          ['Motion', "v = \\frac{ds}{dt}, \\quad a = \\frac{dv}{dt}"],
          ['Modulus', 'E = \\frac{d\\sigma}{d\\varepsilon}'],
        ],
        examples: [
          ex('A dropped ball falls s(t) = 4.9t² metres. How fast is it going at t = 2 s?', [
            ['Differentiate.', 'v = \\frac{ds}{dt} = 9.8t'],
            ['Substitute.', 'v(2) = 19.6\\,\\text{m/s}'],
          ], '19.6 m/s'),
          ex('A 1,000 mm steel rail has length L(T) = 1000[1 + 12×10⁻⁶(T − 20)] mm. How much longer does it get per °C?', [
            ['Only the T term changes.', '\\frac{dL}{dT} = 1000 \\times 12\\times10^{-6}'],
            ['Evaluate.', '= 0.012\\,\\text{mm/°C}'],
          ], '0.012 mm/°C'),
        ],
        practice: [
          pr('s(t) = 3t² + 2t metres. Velocity at t = 4 s (m/s)?', 26, "v = s′ = 6t + 2.", '6 × 4 + 2 = 26 m/s.'),
          pr('Same s(t). Acceleration (m/s²)?', 6, 'Differentiate v = 6t + 2.', 'a = 6 m/s², the same at every time.'),
          pr('Heat to warm a sample: Q(T) = 0.45T + 0.0005T² kJ. Heat capacity dQ/dT at T = 100 °C (kJ/°C)?', 0.55, 'dQ/dT = 0.45 + 0.001T.', '0.45 + 0.1 = 0.55 kJ/°C.'),
          pr('A steel obeys σ = 200,000ε (σ in MPa). What is dσ/dε, in GPa?', 200, '200,000 MPa = ? GPa.', '200,000 MPa = 200 GPa: the modulus of steel.'),
        ],
      },
    ],
  },

  'math-014': {
    predict: {
      q: 'Picture the wave y = sin x. Where do you think it climbs most steeply?',
      options: ['Where it crosses zero going up (x = 0)', 'At the top (x = π/2)', 'At x = π', 'The slope is the same everywhere'],
      answer: 0,
      reveal: 'It is steepest where it crosses zero going up. The slope of sin x is cos x, which is largest (1) at x = 0, and zero at the top.',
    },
    parts: [
      {
        title: 'Sums, constants and the slopes to know',
        minutes: 20,
        explain: [
          'Differentiation respects addition and constant multiples: the slope of 3f + 2g is 3f′ + 2g′. So you can split any sum into pieces.',
          'Beyond powers, a handful of slopes are worth knowing by heart. sin x has slope cos x; cos x has slope −sin x (x in radians). eˣ is its own slope, which is what makes e special. ln x has slope 1/x. And aˣ has slope aˣ·ln a.',
        ],
        formulas: [
          ['Linearity', "(af + bg)' = af' + bg'"],
          ['Slopes to memorise', "(\\sin x)' = \\cos x,\\; (\\cos x)' = -\\sin x,\\; (e^x)' = e^x,\\; (\\ln x)' = \\tfrac{1}{x}"],
        ],
        examples: [
          ex('f(x) = 3 sin x + 2eˣ. Find f′(0).', [
            ['Term by term.', "f'(x) = 3\\cos x + 2e^x"],
            ['At x = 0, cos 0 = 1 and e⁰ = 1.', "f'(0) = 3 + 2 = 5"],
          ], '5'),
          ex('g(x) = 5 ln x − 4 cos x. Find g′(π).', [
            ['Term by term.', "g'(x) = \\tfrac{5}{x} + 4\\sin x"],
            ['sin π = 0.', "g'(\\pi) = \\tfrac{5}{\\pi} \\approx 1.59"],
          ], '1.59'),
        ],
        practice: [
          pr('f(x) = 4x³ + 2 sin x. Find f′(0).', 2, "f′ = 12x² + 2cos x.", '0 + 2 × 1 = 2.'),
          pr('f(x) = eˣ − 3 ln x. Find f′(1).', Math.E - 3, "f′ = eˣ − 3/x.", 'e − 3 ≈ −0.282.'),
          pr('f(x) = 7 cos x. Find f′(π/2).', -7, "f′ = −7 sin x.", 'sin(π/2) = 1, so −7.'),
          pr('f(x) = 2ˣ. Find f′(0).', Math.LN2, "(aˣ)′ = aˣ ln a.", '2⁰ × ln 2 = ln 2 ≈ 0.693.'),
        ],
      },
      {
        title: 'The product rule',
        minutes: 20,
        explain: [
          'The slope of a product is not the product of the slopes. If y = f·g, then y′ = f′g + fg′: "derivative of the first times the second, plus the first times the derivative of the second".',
          'A picture helps: think of f·g as the area of a rectangle with sides f and g. When x changes a little, the area grows by a strip along each side, f′g and fg′.',
        ],
        formulas: [['Product rule', "(fg)' = f'g + fg'"]],
        examples: [
          ex('y = x² sin x. Find y′(π).', [
            ['f = x², g = sin x.', "y' = 2x\\sin x + x^2\\cos x"],
            ['At π: sin π = 0, cos π = −1.', "y'(\\pi) = 0 - \\pi^2 \\approx -9.87"],
          ], '−9.87'),
          ex('y = x·eˣ. Find y′(0).', [
            ['Product rule.', "y' = e^x + xe^x = e^x(1 + x)"],
            ['At 0.', "y'(0) = 1"],
          ], '1'),
        ],
        practice: [
          pr('y = x³eˣ. Find y′(1).', 4 * Math.E, "y′ = 3x²eˣ + x³eˣ.", '3e + e = 4e ≈ 10.87.'),
          pr('y = (2x + 1)(x² − 3). Find y′(1).', 2, "y′ = 2(x² − 3) + (2x + 1)(2x).", '2(−2) + 3(2) = 2.'),
          pr('y = x ln x. Find y′(e).', 2, "y′ = ln x + 1.", 'ln e + 1 = 2.'),
          pr('y = sin x cos x. Find y′(0).', 1, "y′ = cos²x − sin²x.", '1 − 0 = 1.'),
        ],
      },
      {
        title: 'The quotient rule',
        minutes: 20,
        explain: [
          'For a fraction y = f/g, the slope is (f′g − fg′)/g². A common memory aid: "low d-high minus high d-low, over low squared". Order matters because of the minus sign.',
          'You can always avoid it by writing f/g as f·g⁻¹ and using the product and chain rules, but the quotient rule is quicker for fractions.',
        ],
        formulas: [['Quotient rule', "\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}"]],
        examples: [
          ex('y = x/(x + 1). Find y′(1).', [
            ['f = x, g = x + 1.', "y' = \\frac{(1)(x+1) - x(1)}{(x+1)^2} = \\frac{1}{(x+1)^2}"],
            ['At x = 1.', "y'(1) = \\tfrac14"],
          ], '0.25'),
          ex('Show that the slope of tan x = sin x/cos x is 1/cos² x, and evaluate it at 0.', [
            ['Quotient rule.', "\\frac{\\cos x\\cos x - \\sin x(-\\sin x)}{\\cos^2 x}"],
            ['cos² + sin² = 1.', '= \\frac{1}{\\cos^2 x}'],
            ['At 0.', '1'],
          ], '1'),
        ],
        practice: [
          pr('y = (x² + 1)/x. Find y′(1).', 0, "y′ = (2x·x − (x² + 1))/x².", '(2 − 2)/1 = 0.'),
          pr('y = 1/(1 + x²). Find y′(1).', -0.5, "f = 1, f′ = 0.", "y′ = −2x/(1 + x²)² = −2/4 = −0.5."),
          pr('y = eˣ/x. Find y′(2).', Math.exp(2) / 4, "y′ = eˣ(x − 1)/x².", 'e²/4 ≈ 1.847.'),
          pr('y = (3x − 2)/(x + 4). Find y′(0).', 0.875, "y′ = (3(x + 4) − (3x − 2))/(x + 4)².", '14/16 = 0.875.'),
        ],
      },
      {
        title: 'The chain rule',
        minutes: 25,
        explain: [
          'Many formulas are a function inside a function: sin(4x), (x² + 1)³, e^(−0.1t). The chain rule says: differentiate the outside (leaving the inside alone), then multiply by the derivative of the inside.',
          'It is the most-used rule in engineering, because physical laws are full of e^(−kt) and sin(ωt). A part cooling as T = 25 + 175e^(−0.1t) is cooling at a rate dT/dt = −17.5e^(−0.1t) °C per minute.',
        ],
        formulas: [['Chain rule', "\\frac{d}{dx} f(g(x)) = f'(g(x))\\,g'(x)"]],
        examples: [
          ex('y = (3x + 1)⁵. Find y′(0).', [
            ['Outside: u⁵ → 5u⁴. Inside: 3x + 1 → 3.', "y' = 5(3x+1)^4 \\cdot 3 = 15(3x+1)^4"],
            ['At 0.', "y'(0) = 15"],
          ], '15'),
          ex('T(t) = 25 + 175e^(−0.1t) °C. How fast is it cooling at t = 0 and at t = 10 min?', [
            ['Chain rule on the exponential.', "T'(t) = 175 \\cdot (-0.1) e^{-0.1t} = -17.5e^{-0.1t}"],
            ['At t = 0.', "T'(0) = -17.5\\,°\\text{C/min}"],
            ['At t = 10, e^(−1) ≈ 0.368.', "T'(10) \\approx -6.4\\,°\\text{C/min}"],
          ], '−17.5 and −6.4 °C/min'),
        ],
        practice: [
          pr('y = sin(4x). Find y′(0).', 4, 'Outside sin → cos; inside 4x → 4.', '4cos 0 = 4.'),
          pr('y = (x² + 1)³. Find y′(1).', 24, "y′ = 3(x² + 1)²·2x.", '3 × 4 × 2 = 24.'),
          pr('y = e^(−2x). Find y′(0).', -2, 'Inside −2x has slope −2.', '−2e⁰ = −2.'),
          pr('y = √(9 + x²). Find y′(4).', 0.8, "y′ = x/√(9 + x²).", '4/5 = 0.8.'),
          pr('y = ln(x² + 1). Find y′(1).', 1, "y′ = 2x/(x² + 1).", '2/2 = 1.'),
        ],
      },
    ],
  },

  'math-015': {
    predict: {
      q: 'You cut equal squares from the corners of a 20 cm × 20 cm sheet and fold up an open box. Which cut do you think holds the most?',
      options: ['About 3 cm', 'A tiny 1 cm cut', 'Half the sheet, 10 cm', 'The bigger the cut, the bigger the box'],
      answer: 0,
      reveal: 'About 3.3 cm. A tiny cut gives a wide but flat box; a big cut gives a tall but narrow one. The best is in between, where the slope of the volume is zero.',
    },
    parts: [
      {
        title: 'Rising, falling and critical points',
        minutes: 25,
        explain: [
          'Where f′(x) > 0 the graph rises; where f′(x) < 0 it falls. A peak or valley can only happen where the slope is zero (or undefined). Such x values are critical points.',
          'Not every critical point is a peak or valley. The first-derivative test checks the sign of f′ on each side: + then − is a local maximum, − then + a local minimum, and no change means neither (a flat step, like x³ at 0).',
        ],
        formulas: [['Critical point', "f'(c) = 0 \\;\\text{or undefined}"]],
        examples: [
          ex('Find and classify the critical points of f(x) = x³ − 3x.', [
            ['Set the slope to zero.', "f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1"],
            ['Signs of f′: + for x < −1, − between, + for x > 1.', ''],
            ['So x = −1 is a local max and x = 1 a local min.', 'f(-1) = 2, \\quad f(1) = -2'],
          ], 'max 2 at x = −1, min −2 at x = 1'),
          ex('f(x) = x⁴ − 4x³. Classify its critical points.', [
            ['Slope.', "f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)"],
            ['Critical points at 0 and 3. Near 0, f′ is negative on both sides: no max or min.', ''],
            ['f′ changes from − to + at 3: a minimum.', 'f(3) = 81 - 108 = -27'],
          ], 'min −27 at x = 3'),
        ],
        practice: [
          pr('f(x) = x² − 6x + 1. Critical point x = ?', 3, "f′ = 2x − 6.", '2x − 6 = 0 at x = 3.'),
          pr('f(x) = 2x³ − 6x. What is the local minimum value?', -4, "f′ = 6x² − 6 = 0 at x = ±1.", 'The minimum is at x = 1: 2 − 6 = −4.'),
          pr('f(x) = x³ − 12x. What is the local maximum value?', 16, 'Critical points x = ±2; the max is at −2.', 'f(−2) = −8 + 24 = 16.'),
          pr('f(x) = x·e^(−x). Where is its maximum (x = ?)', 1, "f′ = e^(−x)(1 − x).", 'f′ = 0 at x = 1, + before, − after: a maximum.'),
        ],
      },
      {
        title: 'Bending: the second derivative',
        minutes: 20,
        explain: [
          'The second derivative f″ is the slope of the slope. If f″ > 0 the graph bends upward like a cup; if f″ < 0 it bends down like a cap. Where f″ changes sign, the bend flips: an inflection point.',
          'This gives a quick test at a critical point: f″ > 0 means a minimum (bottom of a cup), f″ < 0 a maximum. If f″ = 0 the test says nothing, and you go back to the first-derivative test.',
        ],
        formulas: [['Second-derivative test', "f'(c)=0:\\; f''(c) > 0 \\Rightarrow \\min,\\; f''(c) < 0 \\Rightarrow \\max"]],
        examples: [
          ex('Use f″ to classify the critical points of f(x) = x³ − 3x.', [
            ['Second derivative.', "f''(x) = 6x"],
            ['At x = 1: 6 > 0, a minimum. At x = −1: −6 < 0, a maximum.', ''],
            ['f″ changes sign at x = 0: an inflection point.', ''],
          ], 'min at 1, max at −1, inflection at 0'),
          ex('f(x) = x⁴. What does the second-derivative test say at x = 0?', [
            ['f′ = 4x³ = 0 at x = 0; f″ = 12x² = 0 there.', ''],
            ['The test fails. f′ goes from − to +, so it is a minimum anyway.', ''],
          ], 'minimum (by the first test)'),
        ],
        practice: [
          pr('f(x) = x³ − 6x² + 4. Inflection point at x = ?', 2, "f″ = 6x − 12.", '6x − 12 = 0 at x = 2.'),
          pr('f(x) = −2x² + 8x. What is f″(x)?', -4, 'Differentiate twice.', 'f′ = −4x + 8, f″ = −4: always a cap, so x = 2 is a maximum.'),
          pr('f(x) = x³ − 3x² − 9x. Its local minimum value?', -27, 'Critical points 3 and −1; f″(3) = 12 > 0.', 'f(3) = 27 − 27 − 27 = −27.'),
          pr('f(x) = eˣ − 2x. Where is its minimum (x = ?)', Math.LN2, "f′ = eˣ − 2 = 0.", 'x = ln 2 ≈ 0.693; f″ = eˣ > 0, so a minimum.'),
        ],
      },
      {
        title: 'Highest and lowest on an interval',
        minutes: 20,
        explain: [
          'In real problems x is limited: a cut cannot be negative, a temperature has a range. On a closed interval [a, b], the highest and lowest values happen either at a critical point inside or at an end.',
          'So the method is short: find the critical points inside the interval, evaluate f there and at both ends, and pick the biggest and smallest.',
        ],
        formulas: [['Closed-interval method', '\\max/\\min \\text{ of } f(a),\\, f(b),\\, f(c_i)']],
        examples: [
          ex('Find the largest and smallest values of f(x) = x³ − 3x on [0, 3].', [
            ['Critical point inside: x = 1 (x = −1 is outside).', 'f(1) = -2'],
            ['Ends.', 'f(0) = 0, \\quad f(3) = 18'],
            ['Compare.', '\\max = 18,\\; \\min = -2'],
          ], 'max 18, min −2'),
          ex('f(x) = x² on [−1, 2].', [
            ['Critical point 0.', 'f(0) = 0'],
            ['Ends.', 'f(-1) = 1,\\; f(2) = 4'],
            ['Compare.', '\\max = 4,\\; \\min = 0'],
          ], 'max 4, min 0'),
        ],
        practice: [
          pr('f(x) = x² − 4x + 7 on [0, 5]. Largest value?', 12, 'Check x = 2 (critical) and the ends 0 and 5.', 'f(0) = 7, f(2) = 3, f(5) = 12. Max 12.'),
          pr('Same f on [0, 5]. Smallest value?', 3, 'The critical point.', 'f(2) = 3.'),
          pr('f(x) = 12x − x³ on [0, 3]. Largest value?', 16, 'Critical point x = 2.', 'f(0) = 0, f(2) = 16, f(3) = 9. Max 16.'),
          pr('f(x) = sin x + cos x on [0, π/2]. Largest value?', Math.SQRT2, "f′ = cos x − sin x = 0 at x = π/4.", 'f(π/4) = √2 ≈ 1.414; the ends give 1.'),
        ],
      },
      {
        title: 'Designing the best shape',
        minutes: 30,
        explain: [
          'Optimisation in engineering follows the same five steps. Sketch it and name the variables. Write the quantity to make best (volume, cost, energy). Use the constraint to leave only one variable. Set the derivative to zero and solve. Check it is a max or min and that it makes physical sense.',
          'The same mathematics finds the equilibrium spacing of two atoms: the bond energy E(r) is lowest where dE/dr = 0, which is why crystals have a definite lattice spacing.',
        ],
        formulas: [['Recipe', "\\text{objective}(x) \\to \\text{objective}'(x) = 0 \\to \\text{check}"]],
        examples: [
          ex('An open box is folded from a 20 × 20 cm sheet by cutting squares of side x from the corners. Which x gives the largest volume?', [
            ['Volume in terms of x.', 'V = x(20 - 2x)^2, \\quad 0 < x < 10'],
            ['Differentiate (product and chain rules) and factor.', "V' = (20 - 2x)(20 - 6x)"],
            ['V′ = 0 at x = 10 (no box) or x = 10/3.', 'x = 3.33\\,\\text{cm},\\; V = 592.6\\,\\text{cm}^3'],
          ], 'x ≈ 3.33 cm'),
          ex('A closed tin can must hold 500 cm³. Which radius uses the least metal?', [
            ['Area with h removed using V = πr²h.', 'A = 2\\pi r^2 + \\frac{2V}{r}'],
            ['Differentiate and set to zero.', "A' = 4\\pi r - \\frac{2V}{r^2} = 0 \\Rightarrow r^3 = \\frac{V}{2\\pi}"],
            ['Solve.', 'r = (500/2\\pi)^{1/3} \\approx 4.30\\,\\text{cm},\\; h = 2r'],
          ], 'r ≈ 4.30 cm'),
        ],
        practice: [
          pr('A rectangle has a perimeter of 100 m. What is the largest possible area (m²)?', 625, 'Sides x and 50 − x; maximise x(50 − x).', 'x = 25, a square: 625 m².'),
          pr('Two positive numbers add to 20. Largest possible product?', 100, 'Maximise x(20 − x).', 'x = 10: 10 × 10 = 100.'),
          pr('An open box from a 30 × 30 cm sheet (cut x from each corner). Largest volume (cm³)?', 2000, "V = x(30 − 2x)², V′ = (30 − 2x)(30 − 6x).", 'x = 5 cm, V = 5 × 20² = 2,000 cm³.'),
          pr('A simple bond-energy model: E(r) = 4/r² − 4/r (r in tenths of a nanometre). At what r is the energy lowest?', 2, "E′ = −8/r³ + 4/r² = 0.", 'Multiply by r³: −8 + 4r = 0, so r = 2. E(2) = 1 − 2 = −1, the bottom of the well.'),
          pr('A closed can must hold 1,000 cm³. Radius for the least metal (cm)?', Math.cbrt(1000 / (2 * Math.PI)), 'r³ = V/(2π).', 'r = (1000/2π)^(1/3) ≈ 5.42 cm.'),
        ],
      },
    ],
  },
};
