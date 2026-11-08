// Calculus 2, probability, statistics, differential equations and matrices.
const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const CALC2 = {
  'math-016': {
    predict: {
      q: "₱1 earns a stated 100% yearly rate, split into equal payments that each earn more interest. Once yearly gives ₱2. If payments become almost continuous, what happens to the year-end money?",
      options: ["It grows without a ceiling","It approaches about ₱2.72","It approaches ₱3 exactly","It returns towards ₱2"],
      answer: 1,
      reveal: "Smaller payments help, but each extra improvement shrinks. The amount approaches e pesos, about ₱2.72, even when the payments become endlessly frequent.",
    },
    parts: [
      {
        title: "Interest on interest",
        minutes: 25,
        explain: [
          "Interest is an extra amount paid as a fraction of the money already present. With repeated payments, the next payment also earns interest on earlier interest. Multiply by the same growth factor each time.",
          "A stated yearly rate r split into n equal payments gives a factor 1 + r/n per payment. The stated rate has not changed; only the timing has. Here P is the starting money and t is the time in years. This is a mathematical comparison, with no fees or withdrawals.",
        ],
        formulas: [
          ["Repeated payments","A=P(1+r/n)^{nt}"],
        ],
        examples: [
          ex("₱100 earns 100% in one payment over one year. Final amount in pesos?", [
            ["Multiply the starting money by one plus the rate.","100(1+1)"],
            ["Apply the yearly factor to the starting money.","= 200"],
          ], "200 pesos"),
          ex("₱100 earns a stated 100% yearly rate in two equal payments. Final amount after one year, in pesos?", [
            ["Each payment adds half the amount then present.","100(1+1/2)^2"],
            ["Multiply by the half-year factor twice.","= 225"],
          ], "225 pesos"),
        ],
        practice: [
          pr("₱200 earns 10% in one yearly payment. Final amount after one year, in pesos?", 220, "The factor is one plus the decimal rate.", "Multiply 200 by 1.10. Answer: 220 pesos."),
          pr("₱100 earns a stated 100% yearly rate in four equal payments. Final amount after one year, in pesos?", 244.140625, "The rate per payment is the yearly rate divided by four.", "Multiply 100 by 1.25⁴. Answer: ≈ 244.14 pesos."),
          pr("₱500 earns 10% each year, compounded yearly. Final amount after two years, in pesos?", 605, "Apply the yearly factor twice.", "Multiply 500 by 1.10². Answer: 605 pesos."),
          pr("₱1 earns a stated 100% yearly rate in twelve equal payments. Final amount after one year, in pesos?", 2.61303529022468, "Use the monthly rate, then twelve multiplications.", "Evaluate (1 + 1/12)¹². Answer: ≈ 2.613 pesos."),
        ],
      },
      {
        title: "The ceiling called e",
        minutes: 25,
        explain: [
          "More frequent compounding does not make the amount infinite. For a starting amount of one and a stated rate of one per year, the year-end amounts approach a fixed number called e. Its decimal expansion never ends.",
          "Continuous compounding means taking that limiting case. A constant continuous rate k gives the factor e^(kt). Keep the time unit consistent: a rate per year needs time in years.",
        ],
        formulas: [
          ["Compounding limit","e=\\lim_{n\\to\\infty}(1+1/n)^n"],
          ["Continuous growth","A=A_0e^{kt}"],
        ],
        examples: [
          ex("₱1 earns a stated 100% yearly rate, paid daily in 365 equal payments. Final amount after one year, in pesos?", [
            ["Use the daily fraction of the yearly rate.","(1+1/365)^{365}"],
            ["Raise the daily factor to the number of payments.","\\approx 2.7146"],
          ], "≈ 2.7146 pesos"),
          ex("₱100 grows continuously at k = 0.1 per year. Amount after two years, in pesos?", [
            ["Multiply rate by time in the exponent.","100e^{0.1(2)}"],
            ["Use the continuous growth factor.","\\approx 122.14"],
          ], "≈ 122.14 pesos"),
        ],
        practice: [
          pr("What is e raised to the power zero?", 1, "A zero exponent gives the starting factor.", "Evaluate e⁰. Answer: 1."),
          pr("₱1 is compounded hourly at a stated 100% yearly rate, with 8,760 equal payments. Final amount after one year, in pesos?", 2.71812669161791, "Divide the rate by the number of payments.", "Evaluate (1 + 1/8760)⁸⁷⁶⁰. Answer: ≈ 2.7181 pesos."),
          pr("A culture model is N = 50e^(0.2t), with t in hours. Predicted amount after five hours?", 135.914091422952, "Work out the exponent first.", "Evaluate 50e¹. Answer: ≈ 135.91."),
          pr("A model gives A = 20e^(0.3t), with t in hours. What is A(4)/A(1)?", 2.45960311115695, "The starting amount cancels when dividing.", "Subtract the exponents to get e^0.9. Answer: ≈ 2.4596."),
        ],
      },
      {
        title: "Decay measures what remains",
        minutes: 25,
        explain: [
          "For decay, write a positive decay constant k and a minus sign in the exponent. Equal time intervals remove the same fraction of what remains, rather than the same fixed amount.",
          "For cooling, the decaying quantity is the temperature above the surroundings. A casting can settle towards room temperature while that excess heads towards zero. The simple model assumes constant surroundings and a constant cooling rate factor.",
        ],
        formulas: [
          ["Decay","A=A_0e^{-kt},\\quad k>0"],
          ["Temperature excess","T=T_a+(T_0-T_a)e^{-kt}"],
        ],
        examples: [
          ex("A model sample has A = 100e^(−0.1t) grams, with t in hours. Mass after ten hours, in grams?", [
            ["Find rate times time, then use the negative exponent.","100e^{-0.1(10)}"],
            ["Multiply the starting mass by e⁻¹.","\\approx 36.788"],
          ], "≈ 36.788 g"),
          ex("A casting follows T = 25 + 175e^(−0.1t) °C, with t in minutes. Temperature after ten minutes, in °C?", [
            ["Decay the excess above the room, then add the room temperature.","25+175e^{-1}"],
            ["The room term stays fixed.","\\approx 89.379"],
          ], "≈ 89.379 °C"),
        ],
        practice: [
          pr("A model gives A = 80e^(−0.2t) grams. What is the starting mass, in grams?", 80, "Starting means t equals zero.", "Substitute t = 0 into 80e^(−0.2t). Answer: 80 g."),
          pr("A model gives A = 60e^(−0.5t) grams, with t in hours. Mass after two hours, in grams?", 22.0727664702865, "Use a negative exponent for decay.", "Evaluate 60e⁻¹. Answer: ≈ 22.073 g."),
          pr("T = 30 + 120e^(−0.05t) °C. What temperature does the model approach as time grows, in °C?", 30, "The exponential excess tends towards zero.", "Only the surroundings term remains. Answer: 30 °C."),
          pr("A decaying amount retains 0.8 of itself every hour. What fraction remains after three hours?", 0.512, "Multiply the retained fractions.", "Evaluate 0.8³. Answer: 0.512."),
        ],
      },
      {
        title: "Use logarithms to find the time",
        minutes: 25,
        explain: [
          "The natural logarithm ln undoes an exponential with base e. If e^u = v, then u = ln v. Divide by the starting amount before taking the logarithm.",
          "A half-life is the time for the amount to halve. It stays the same for every halving in this model. For cooling, halve the temperature excess, not the temperature reading itself.",
        ],
        formulas: [
          ["Growth time","t=\\ln(A/A_0)/k"],
          ["Half-life for decay","t_{1/2}=\\ln 2/k"],
        ],
        examples: [
          ex("A culture grows as N = 100e^(0.2t), with t in hours. Time to double, in hours?", [
            ["Divide by the starting amount and take ln.","\\ln 2/0.2"],
            ["Solve 0.2t = ln 2.","\\approx 3.4657"],
          ], "≈ 3.4657 h"),
          ex("A casting has excess temperature 800e^(−0.05t) °C, with t in minutes. Time for the excess to reach 100 °C, in minutes?", [
            ["The remaining fraction is the target excess divided by the starting excess.","\\ln(800/100)/0.05"],
            ["Solve e^(−0.05t) = 100/800.","\\approx 41.589"],
          ], "≈ 41.589 min"),
        ],
        practice: [
          pr("A decay constant is 0.1 per hour. Half-life in hours?", 6.93147180559945, "Use ln 2 divided by the decay constant.", "Evaluate ln 2 / 0.1. Answer: ≈ 6.9315 h."),
          pr("N = 10e^(0.5t), with t in hours. Time to reach 30, in hours?", 2.19722457733622, "First divide by the starting amount.", "Solve 0.5t = ln 3. Answer: ≈ 2.1972 h."),
          pr("A sample has half-life five hours. What positive decay constant k, in per hour, fits A = A₀e^(−kt)?", 0.138629436111989, "Rearrange the half-life rule.", "Divide ln 2 by five. Answer: ≈ 0.13863 per hour."),
          pr("A casting cools as T = 20 + 160e^(−0.1t) °C, with t in minutes. Time to reach 60 °C, in minutes?", 13.8629436111989, "Subtract the surroundings temperature first.", "The excess falls from 160 to 40, so t = ln 4 / 0.1. Answer: ≈ 13.863 min."),
        ],
      },
    ],
  },

  'math-102': {
    predict: {
      q: "Two test pieces have the same stress at fracture. One breaks at a much larger strain, with its curve above zero throughout the extra stretch. In the shaded-area view, must their toughness be the same?",
      options: ["Yes: the final stress decides it","Yes: both curves start at zero","No: the extra area can give the longer-stretching piece greater toughness","No: the shorter stretch always wins"],
      answer: 2,
      reveal: "Toughness counts the whole area under the stress–strain curve. Equal final heights do not fix that area; the extra positive stretch can add a large amount of absorbed energy.",
    },
    parts: [
      {
        title: "Totals from thin rectangles",
        minutes: 25,
        explain: [
          "A rate tells how quickly something accumulates. Multiply a roughly constant rate by a short interval to estimate the amount gained there. Add these little amounts to estimate the total. The symbol Σ means to add the listed contributions.",
          "On a graph, each little amount is a rectangle: height times width. Thinner rectangles usually fit a smooth curve better. The exact limiting total is a definite integral, with a lower and an upper limit.",
        ],
        formulas: [
          ["Rectangle sum","S=\\sum f(x_i)\\Delta x"],
          ["Equal widths","\\Delta x=(b-a)/n"],
        ],
        examples: [
          ex("A heater supplies 30 J/s for four seconds. Heat delivered, in J?", [
            ["Constant height times interval width gives the area.","30\\times4"],
            ["Multiply power by time.","= 120"],
          ], "120 J"),
          ex("Estimate ∫₀² x² dx with two midpoint rectangles. What is the estimate?", [
            ["The midpoints are halfway along each unit-wide interval.","(0.5^2+1.5^2)(1)"],
            ["Add midpoint height times width for both rectangles.","= 2.5"],
          ], "2.5"),
        ],
        practice: [
          pr("Divide the interval from zero to six into three equal rectangles. Width of each?", 2, "Divide total width by the rectangle count.", "Compute (6 − 0)/3. Answer: 2."),
          pr("A rate is 8 g/min for five minutes. Total added, in grams?", 40, "For a constant rate, one rectangle is exact.", "Multiply rate by duration. Answer: 40 g."),
          pr("Estimate ∫₀² x dx using two right-end rectangles of width one.", 3, "Use the heights at the right ends of the intervals.", "The heights are 1 and 2; add their areas. Answer: 3."),
          pr("Estimate ∫₀² x² dx using four midpoint rectangles.", 2.625, "Find the width, then the midpoint of each strip.", "Use width 0.5 and heights at 0.25, 0.75, 1.25 and 1.75. Answer: 2.625."),
        ],
      },
      {
        title: "Undoing a derivative",
        minutes: 25,
        explain: [
          "An antiderivative of f is a function F whose derivative is f. To undo a power, raise its exponent by one and divide by that new exponent. A constant term integrates to that constant times x.",
          "Any constant disappears when differentiated, so an indefinite integral needs + C. The power rule fails for x⁻¹; its antiderivative is ln|x| on an interval that does not cross zero.",
        ],
        formulas: [
          ["Reverse power rule","\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C\\quad(n\\ne-1)"],
          ["Special case","\\int x^{-1}\\,dx=\\ln|x|+C"],
        ],
        examples: [
          ex("F′(x) = 6x and F(0) = 2. Find F(2).", [
            ["Integrate the power, then use the starting value to find C.","3(2)^2+2"],
            ["F = 3x² + 2; substitute the requested x.","= 14"],
          ], "14"),
          ex("F′(x) = x² and F(0) = 0. Find F(3).", [
            ["Raise the exponent and divide by the new exponent.","3^3/3"],
            ["F = x³/3, since the starting value makes C zero.","= 9"],
          ], "9"),
        ],
        practice: [
          pr("F′(x) = 4 and F(0) = 0. Find F(3).", 12, "A constant integrates to a straight line.", "F = 4x; put x = 3. Answer: 12."),
          pr("F′(x) = 3x² and F(0) = 5. Find F(2).", 13, "The starting value gives the integration constant.", "F = x³ + 5; evaluate at two. Answer: 13."),
          pr("F′(x) = 2x + 3 and F(0) = −1. Find F(2).", 9, "Integrate each term separately.", "F = x² + 3x − 1; evaluate at two. Answer: 9."),
          pr("F′(x) = 1/x for x > 0 and F(1) = 0. Find F(e²).", 2, "Use ln x, then the given value to find C.", "F = ln x, so evaluate ln(e²). Answer: 2."),
        ],
      },
      {
        title: "The fundamental theorem",
        minutes: 25,
        explain: [
          "The fundamental theorem connects area with antiderivatives. For a continuous rate f on an interval, find F and subtract its value at the lower end from its value at the upper end.",
          "Area below the horizontal axis contributes negatively to a definite integral. This gives net change. To find total geometric area, split where the curve crosses zero and count each piece positively.",
        ],
        formulas: [
          ["Evaluate a total","\\int_a^b f(x)\\,dx=F(b)-F(a)"],
          ["Accumulation has a slope","\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)"],
        ],
        examples: [
          ex("Evaluate ∫₁³ 2x dx.", [
            ["Use x² as the antiderivative.","3^2-1^2"],
            ["Subtract the lower value from the upper value.","= 8"],
          ], "8"),
          ex("Evaluate ∫₋₁¹ x dx as a signed total.", [
            ["Use x²/2 at both ends.","1^2/2-(-1)^2/2"],
            ["The negative and positive areas cancel.","= 0"],
          ], "0"),
        ],
        practice: [
          pr("Evaluate ∫₀² 3x² dx.", 8, "Use x³ as the antiderivative.", "Subtract zero cubed from two cubed. Answer: 8."),
          pr("Evaluate ∫₁² (2x + 1) dx.", 4, "Integrate to x² + x.", "Compute (4 + 2) − (1 + 1). Answer: 4."),
          pr("Find the total geometric area between y = x and the axis from −1 to 1.", 1, "Split at zero and count both triangles positively.", "Each triangle has base one and height one. Answer: 1."),
          pr("A(x) = ∫₀ˣ (t² + 1) dt. What is A′(3)?", 10, "The slope of accumulated area is the current height.", "Evaluate the integrand at t = 3. Answer: 10."),
        ],
      },
      {
        title: "Energy inside a stress–strain curve",
        minutes: 25,
        explain: [
          "Stress is force per area. Strain is extension divided by original length, so it has no unit. Adding stress times a small strain change gives energy absorbed per volume. Up to fracture this total is tensile toughness.",
          "For an elastic straight line σ = Eε, the area is a triangle. Energy per volume in MJ/m³ has the same numerical value as the integral when stress is in MPa. Real fracture toughness is a different crack-resistance quantity; here we mean the area from a tensile test.",
        ],
        formulas: [
          ["Tensile energy per volume","U=\\int_0^{\\varepsilon_f}\\sigma(\\varepsilon)\\,d\\varepsilon"],
          ["Elastic triangle","U=\\tfrac12 E\\varepsilon^2"],
        ],
        examples: [
          ex("Use the stated steel model σ = 200,000ε MPa up to ε = 0.002. Stored elastic energy per volume, in MJ/m³?", [
            ["Integrate the straight stress line, or use its triangular area.","\\tfrac12(200000)(0.002)^2"],
            ["Multiply half the modulus by strain squared.","= 0.4"],
          ], "0.4 MJ/m³"),
          ex("An ideal plastic segment stays at 300 MPa from strain 0.01 to 0.05. Energy added per volume on this segment, in MJ/m³?", [
            ["The constant-stress segment makes a rectangle.","300(0.05-0.01)"],
            ["Multiply stress by the change in strain.","= 12"],
          ], "12 MJ/m³"),
        ],
        practice: [
          pr("A linear elastic curve ends at strain 0.001 and stress 100 MPa. Area under it, in MJ/m³?", 0.05, "Use a triangle with strain as base.", "Half base times height gives the energy per volume. Answer: 0.05 MJ/m³."),
          pr("A stated alloy model has E = 70,000 MPa. Elastic energy per volume at strain 0.002, in MJ/m³?", 0.14, "Use half the modulus times strain squared.", "Compute 0.5 × 70,000 × 0.002². Answer: 0.14 MJ/m³."),
          pr("A tensile curve rises linearly from zero to 200 MPa at strain 0.01, then stays at 200 MPa until fracture at 0.06. Total area, in MJ/m³?", 11, "Add the initial triangle and the later rectangle.", "Add 0.5 × 200 × 0.01 and 200 × (0.06 − 0.01). Answer: 11 MJ/m³."),
          pr("For a fully elastic line with the same E, what is the ratio U(0.004)/U(0.002)?", 4, "The shared modulus cancels.", "Energy scales with the square of strain. Answer: 4."),
        ],
      },
    ],
  },

  'math-017': {
    predict: {
      q: "In the area-changing scene, the signed area under 2x cos(x²) starts at zero and grows as the upper limit moves right. Can it return to zero while the upper limit is still positive?",
      options: ["No: adding more width always adds area","Only if the curve is flat everywhere","Yes: when the upper limit reaches √π","Yes: at every upper limit"],
      answer: 2,
      reveal: "Once the curve goes below the axis, new area counts negatively. The total is sin(a²), so the positive and negative pieces cancel when a = √π.",
    },
    parts: [
      {
        title: "Substitution reverses the chain rule",
        minutes: 25,
        explain: [
          "An integral may hide a familiar function inside another one. Look for an inside expression whose derivative also appears as a factor. Call the inside expression u, and replace its derivative times dx with du.",
          "After integrating in u, put the original expression back. Check the result by differentiating. A missing constant factor is easy to spot this way.",
        ],
        formulas: [
          ["Substitution","\\int f(g(x))g'(x)\\,dx=F(g(x))+C"],
        ],
        examples: [
          ex("Evaluate ∫₀¹ 2x cos(x²) dx, in radians.", [
            ["Let u = x², so du = 2x dx.","\\sin 1-\\sin 0"],
            ["Integrate cos u to sin u and use the transformed ends.","\\approx 0.84147"],
          ], "≈ 0.84147"),
          ex("Evaluate ∫₀¹ 6x(x² + 1)² dx.", [
            ["Let u = x² + 1; then 6x dx = 3 du.","2^3-1^3"],
            ["Integrating 3u² gives u³, evaluated from one to two.","= 7"],
          ], "7"),
        ],
        practice: [
          pr("Evaluate ∫₀¹ 2x(x² + 1) dx.", 1.5, "Use u = x² + 1.", "Integrate u from one to two to get (2² − 1²)/2. Answer: 1.5."),
          pr("Evaluate ∫₀¹ 3e^(3x) dx.", 19.0855369231877, "The exponent derivative is already present.", "Use e^(3x) at the two ends. Answer: ≈ 19.086."),
          pr("Evaluate ∫₀¹ 2x/(x² + 1) dx.", 0.693147180559945, "The bottom and its derivative form a logarithm.", "Use ln(x² + 1) at the ends. Answer: ≈ 0.69315."),
          pr("Evaluate ∫₀³ x√(x² + 16) dx.", 20.3333333333333, "With u = x² + 16, x dx is half of du.", "Integrate half of √u from sixteen to twenty-five. Answer: ≈ 20.333."),
        ],
      },
      {
        title: "Change the ends as well",
        minutes: 25,
        explain: [
          "A definite integral needs endpoints in the variable you are using. If u = x², an x endpoint becomes its square. Using old endpoints with a new variable would describe the wrong interval.",
          "Substitution preserves the signed total even though widths and heights change. Positive and negative pieces can cancel, as the paired area pictures show. Zero signed total does not mean there was no shaded region.",
        ],
        formulas: [
          ["New endpoints","\\int_a^b f(g(x))g'(x)\\,dx=\\int_{g(a)}^{g(b)}f(u)\\,du"],
        ],
        examples: [
          ex("For u = x², the x interval is from one to three. What is the new upper endpoint?", [
            ["Apply the substitution to the upper endpoint.","3^2"],
            ["Square the upper x value.","= 9"],
          ], "9"),
          ex("Evaluate ∫₀^(√π) 2x cos(x²) dx.", [
            ["The new u interval is from zero to π.","\\sin\\pi-\\sin0"],
            ["sin π and sin zero are both zero.","= 0"],
          ], "0"),
        ],
        practice: [
          pr("For u = 2x + 1 and x from zero to two, what is the new lower endpoint?", 1, "Put the lower x value into the substitution.", "Evaluate 2(0) + 1. Answer: 1."),
          pr("For u = x² + 4 and x from one to two, what is the new upper endpoint?", 8, "Transform the upper end.", "Evaluate 2² + 4. Answer: 8."),
          pr("Evaluate ∫₀^π cos x dx as a signed total.", 0, "Use sin x at the endpoints.", "The two endpoint values agree, so the signed total cancels. Answer: 0.", {"tol":1e-12}),
          pr("Evaluate ∫₀² 2x cos(x²) dx, in radians.", -0.756802495307928, "Transform both the differential and the upper limit.", "The result is sin 4 − sin 0. Answer: ≈ -0.7568."),
        ],
      },
      {
        title: "Parts reverses the product rule",
        minutes: 25,
        explain: [
          "A product can be hard to integrate even when both factors look familiar. Integration by parts trades it for another integral. Choose u so that differentiating it makes it simpler; choose dv so that it is easy to integrate.",
          "Write du and v before using the rule. The product uv comes first, then subtract the integral of v du. Logarithms are often a good choice for u because their derivative is simpler.",
        ],
        formulas: [
          ["Integration by parts","\\int u\\,dv=uv-\\int v\\,du"],
        ],
        examples: [
          ex("Evaluate ∫₀¹ xeˣ dx.", [
            ["Choose u = x and dv = eˣ dx.","(1-1)e^1-(0-1)e^0"],
            ["An antiderivative is (x − 1)eˣ; subtract its endpoint values.","= 1"],
          ], "1"),
          ex("Evaluate ∫₁² ln x dx.", [
            ["Choose u = ln x and dv = dx.","2\\ln2-2+1"],
            ["Use x ln x − x at the two ends.","\\approx 0.38629"],
          ], "≈ 0.38629"),
        ],
        practice: [
          pr("Evaluate ∫₁ᵉ ln x dx.", 1, "Use x ln x − x.", "At e the product and subtraction cancel; subtract the value at one. Answer: 1."),
          pr("Evaluate ∫₀¹ xe^(−x) dx.", 0.264241117657115, "Choose u = x and integrate e^(−x).", "Use −(x + 1)e^(−x) at zero and one. Answer: ≈ 0.26424."),
          pr("Evaluate ∫₀^(π/2) x cos x dx.", 0.570796326794897, "Choose u = x and dv = cos x dx.", "Use x sin x + cos x at the endpoints. Answer: ≈ 0.5708."),
          pr("Evaluate ∫₀¹ x²eˣ dx.", 0.718281828459045, "Use parts twice, lowering the power of x each time.", "An antiderivative is eˣ(x² − 2x + 2). Answer: ≈ 0.71828."),
        ],
      },
      {
        title: "Fractions and long-running totals",
        minutes: 25,
        explain: [
          "Some fractions become easier when split into simpler fractions. For distinct linear factors, choose constants so that putting the pieces back over a shared denominator recovers the original numerator. Integrate each piece as a logarithm.",
          "An integral over an endless time interval is an improper integral. First stop at a finite time b, find the total, then take its limit as b grows. A heat-release rate can stay positive forever while releasing only a finite total heat.",
        ],
        formulas: [
          ["Split a fraction","\\frac1{x(x+1)}=\\frac1x-\\frac1{x+1}"],
          ["Endless interval","\\int_0^\\infty f(t)\\,dt=\\lim_{b\\to\\infty}\\int_0^b f(t)\\,dt"],
        ],
        examples: [
          ex("Evaluate ∫₁² 1/[x(x + 1)] dx.", [
            ["Split the fraction into 1/x − 1/(x + 1).","\\ln2-\\ln3-\\ln1+\\ln2"],
            ["Use ln x − ln(x + 1) at the endpoints.","\\approx 0.28768"],
          ], "≈ 0.28768"),
          ex("A stated curing model releases q(t) = 50te^(−t) J/(g·h), with t in hours. Total heat from zero to infinite time, in J/g?", [
            ["Parts gives an antiderivative −50(t + 1)e^(−t).","50(0-(-1))"],
            ["Its limit at infinite time is zero; subtract its value at zero.","= 50"],
          ], "50 J/g"),
        ],
        practice: [
          pr("Evaluate ∫₁² [1/x − 1/(x + 2)] dx.", 0.405465108108164, "Integrate both simple fractions as logarithms.", "Use ln x − ln(x + 2) at the ends. Answer: ≈ 0.40547."),
          pr("A rate is q(t) = 12e^(−2t) J/s. Total heat over all t ≥ 0, in J?", 6, "The negative exponent makes the upper-end exponential vanish.", "The antiderivative is −6e^(−2t); subtract its starting value. Answer: 6 J."),
          pr("Evaluate ∫₀¹ 1/(x + 1)² dx.", 0.5, "Write the denominator as a negative power.", "Use −1/(x + 1) at one and zero. Answer: 0.5."),
          pr("A curing model releases q(t) = 20te^(−2t) J/(g·h), with t in hours. Total heat over all t ≥ 0, in J/g?", 5, "Use parts, keeping the factor from integrating e^(−2t).", "An antiderivative is −(10t + 5)e^(−2t); its upper limit is zero. Answer: 5 J/g."),
        ],
      },
    ],
  },

  'math-018': {
    predict: {
      q: "A cone in the disk scene fits exactly inside a cylinder with the same base and height. Guess how much of the cylinder it fills. Does the cone’s halfway radius make its volume one-half?",
      options: ["One-half","One-third","One-quarter","The same volume"],
      answer: 1,
      reveal: "It fills one-third. Disk area depends on radius squared, so averaging the radius does not give the average cross-sectional area.",
    },
    parts: [
      {
        title: "Build volume from slices",
        minutes: 25,
        explain: [
          "Cut a solid perpendicular to its length. A thin slice has volume equal to its cross-sectional area times its thickness. Add the slice volumes with an integral.",
          "If a curve of non-negative radius is turned around the horizontal axis, each slice is a disk. Square the radius before integrating. A radius that doubles makes a disk area four times as large.",
        ],
        formulas: [
          ["Slices","V=\\int_a^b A(x)\\,dx"],
          ["Disks","V=\\pi\\int_a^b r(x)^2\\,dx"],
        ],
        examples: [
          ex("A cylinder has radius two cm and length three cm. Volume in cm³?", [
            ["Its disk area is constant.","\\pi(2)^2(3)"],
            ["Multiply πr² by the length.","\\approx 37.699"],
          ], "≈ 37.699 cm³"),
          ex("Spin y = √x, from x = 0 to 2 cm, around the x-axis, taking y in cm. Volume in cm³?", [
            ["Square the radius before integrating.","\\pi[ x^2/2 ]_0^2"],
            ["Integrate πx from zero to two.","\\approx 6.2832"],
          ], "≈ 6.2832 cm³"),
        ],
        practice: [
          pr("A solid has constant cross-sectional area 12 cm² over five cm. Volume in cm³?", 60, "Area times thickness gives each slice volume.", "Multiply the constant area by the total length. Answer: 60 cm³."),
          pr("A cone has radius three cm and height four cm. Volume in cm³?", 37.6991118430775, "Use one-third of the matching cylinder volume.", "Compute πr²h/3. Answer: ≈ 37.699 cm³."),
          pr("Spin y = x from zero to two around the x-axis, with both lengths in cm. Volume in cm³?", 8.37758040957278, "Integrate πx².", "Evaluate πx³/3 at two and zero. Answer: ≈ 8.3776 cm³."),
          pr("A solid has A(x) = 2 + x cm² for x from zero to three cm. Volume in cm³?", 10.5, "Integrate the cross-sectional area.", "Evaluate 2x + x²/2 at the ends. Answer: 10.5 cm³."),
        ],
      },
      {
        title: "Holes and shells",
        minutes: 25,
        explain: [
          "A hollow slice is a washer. Subtract the inner disk area from the outer disk area. Subtract the squared radii, rather than squaring their difference.",
          "Another way is to add thin cylindrical shells. Each shell has circumference times height times thickness. Shells are useful when slices parallel to the turning axis give a simpler expression.",
        ],
        formulas: [
          ["Washers","V=\\pi\\int_a^b(R^2-r^2)\\,dx"],
          ["Shells about the vertical axis","V=2\\pi\\int_a^b xh(x)\\,dx"],
        ],
        examples: [
          ex("A tube has outer radius three cm, inner radius two cm and length five cm. Material volume in cm³?", [
            ["Subtract the hole area before multiplying by length.","\\pi(3^2-2^2)(5)"],
            ["The washer area is π times the difference of squared radii.","\\approx 78.54"],
          ], "≈ 78.54 cm³"),
          ex("Turn the region under y = 2, from x = 1 to 3, about the y-axis. All lengths are cm. Volume by shells, in cm³?", [
            ["A shell has radius x and height two.","2\\pi(3^2-1^2)"],
            ["Integrate 4πx from one to three.","\\approx 50.265"],
          ], "≈ 50.265 cm³"),
        ],
        practice: [
          pr("A washer has outer radius four cm and inner radius one cm. Area in cm²?", 47.1238898038469, "Subtract the two disk areas.", "Compute π(4² − 1²). Answer: ≈ 47.124 cm²."),
          pr("A tube has outer radius two cm, inner radius one cm and length ten cm. Material volume in cm³?", 94.2477796076938, "Use the washer area along the whole length.", "Multiply π(2² − 1²) by ten. Answer: ≈ 94.248 cm³."),
          pr("Turn the region under y = x, from x = 0 to 2, about the y-axis. All lengths are cm. Volume by shells, in cm³?", 16.7551608191456, "The shell radius and height are both x.", "Integrate 2πx² from zero to two. Answer: ≈ 16.755 cm³."),
          pr("A hollow solid has R(x) = 2x and r(x) = x for x from zero to one. All lengths are cm. Volume in cm³?", 3.14159265358979, "The washer area is π[(2x)² − x²].", "Integrate 3πx² from zero to one. Answer: ≈ 3.1416 cm³."),
        ],
      },
      {
        title: "Work from a changing force",
        minutes: 25,
        explain: [
          "Work is force acting along a distance. With a constant force it is force times displacement. When force changes along the path, add force times little displacement intervals with an integral.",
          "An ideal spring has force kx, where x is extension from its unstretched length. Stretching an already stretched spring needs its actual starting and ending extensions. The same method measures energy in a tensile testing machine.",
        ],
        formulas: [
          ["Work","W=\\int_a^b F(x)\\,dx"],
          ["Spring work","W=\\tfrac12k(b^2-a^2)"],
        ],
        examples: [
          ex("An ideal spring has k = 200 N/m. Work to extend it from 0.1 m to 0.3 m, in J?", [
            ["Use the actual extensions from the unstretched length.","\\tfrac12(200)(0.3^2-0.1^2)"],
            ["Subtract the starting spring energy from the ending energy.","= 8"],
          ], "8 J"),
          ex("A test force is F(x) = 100 + 20x N for displacement x in metres. Work from zero to two m, in J?", [
            ["Integrate the force over displacement.","[100x+10x^2]_0^2"],
            ["Use 100x + 10x² at the two ends.","= 240"],
          ], "240 J"),
        ],
        practice: [
          pr("A constant force of 40 N acts along a displacement of three m. Work in J?", 120, "Force and displacement point the same way.", "Multiply force by displacement. Answer: 120 J."),
          pr("A spring with k = 100 N/m is stretched from rest to 0.2 m. Work in J?", 2, "The force rises from zero, so use a triangular area.", "Use half k times extension squared. Answer: 2 J."),
          pr("A test force F(x) = 500x N acts from zero to 0.1 m. Work in J?", 2.5, "Integrate the linear force.", "Use 250x² at the two ends. Answer: 2.5 J."),
          pr("For the same ideal spring, what is the ratio of work from zero to 0.4 m to work from zero to 0.2 m?", 4, "Work from rest scales with extension squared.", "Square the extension ratio. Answer: 4."),
        ],
      },
      {
        title: "Mass, balance and average value",
        minutes: 25,
        explain: [
          "Density can vary along a rod. If λ is mass per length, a short piece has mass λ dx. Its moment about the origin is its mass times its position. Divide total moment by total mass to find the balance point.",
          "The average height of a curve is its area divided by interval width. The same idea gives an average temperature or an average cross-sectional area. It need not equal the average of the endpoint heights.",
        ],
        formulas: [
          ["Rod mass and centre","m=\\int_a^b\\lambda\\,dx,\\quad \\bar{x}=\\frac{\\int_a^b x\\lambda\\,dx}{m}"],
          ["Average value","f_{\\rm avg}=\\frac1{b-a}\\int_a^b f(x)\\,dx"],
        ],
        examples: [
          ex("A rod on 0 ≤ x ≤ 2 m has λ(x) = x + 1 kg/m. Mass in kg?", [
            ["Integrate mass per length over the rod.","[x^2/2+x]_0^2"],
            ["Use x²/2 + x at the ends.","= 4"],
          ], "4 kg"),
          ex("For that rod with λ(x) = x + 1 kg/m on 0 ≤ x ≤ 2 m, find its centre of mass in m from x = 0.", [
            ["Integrate xλ for the moment, then divide by the mass.","\\frac{2^3/3+2^2/2}{2^2/2+2}"],
            ["Use the moment of x² + x divided by the rod mass.","\\approx 1.1667"],
          ], "≈ 1.1667 m"),
        ],
        practice: [
          pr("A uniform rod is four m long, starting at x = 0. Centre of mass in m from that end?", 2, "A uniform rod balances halfway along.", "Divide its length by two. Answer: 2 m."),
          pr("T(x) = 20 + 10x °C along a rod from x = 0 to 2 cm. Average temperature in °C?", 30, "Divide the temperature integral by the rod length.", "Integrate to 20x + 5x², then divide by two. Answer: 30 °C."),
          pr("Find the average value of x² on the interval from zero to three.", 3, "Area divided by interval width.", "Integrate x² and divide by three. Answer: 3."),
          pr("A rod on 0 ≤ x ≤ 3 m has λ(x) = 2x kg/m. Centre of mass in m from x = 0?", 2, "Compute moment and mass separately.", "Divide ∫2x² dx by ∫2x dx over the rod. Answer: 2 m."),
        ],
      },
    ],
  },

  'math-019': {
    predict: {
      q: "The straight line y = x follows sin x near zero, but at x = π it misses by more than 3. In the curve-building scene, can just five non-zero terms bring that miss below 0.01?",
      options: ["No: it needs infinitely many terms to get even that close","Yes: the alternating corrections can shrink the miss that much","No: every added term pushes the curve farther away","Only if five terms make the polynomial exactly equal to sine everywhere"],
      answer: 1,
      reveal: "Yes. Five terms, ending with x⁹/9!, give about 0.00693 at π, where sine is zero. A short polynomial can fit a whole swing closely without matching sine everywhere.",
    },
    parts: [
      {
        title: "Sequences and sums that settle",
        minutes: 25,
        explain: [
          "A sequence is an ordered list of terms. A series adds those terms. Its partial sum is what you get after stopping at a finite number of terms. Convergence means those partial sums approach a finite limit.",
          "A geometric series multiplies each term by a fixed ratio r. If the size of r is less than one, the sum settles. Terms tending to zero are necessary for any convergent series, but that condition alone is not enough.",
        ],
        formulas: [
          ["Geometric partial sum","S_n=a(1-r^n)/(1-r)\\quad(r\\ne1)"],
          ["Geometric limit","S_\\infty=a/(1-r)\\quad(|r|<1)"],
        ],
        examples: [
          ex("Add the first four terms of 1 + 1/2 + 1/4 + … .", [
            ["Each term is half of the previous one.","1+1/2+1/4+1/8"],
            ["Add just the requested four terms.","= 1.875"],
          ], "1.875"),
          ex("Find the endless sum 3 + 1.5 + 0.75 + … .", [
            ["Identify the first term and the common ratio.","3/(1-0.5)"],
            ["The ratio has size below one, so use the geometric limit.","= 6"],
          ], "6"),
        ],
        practice: [
          pr("A sequence has aₙ = 1/n. What is a₄?", 0.25, "Replace n with the requested position.", "Evaluate 1/4. Answer: 0.25."),
          pr("Add the first three terms of 2 + 1 + 1/2 + … .", 3.5, "Stop after three terms.", "Add 2, 1 and 1/2. Answer: 3.5."),
          pr("Find the endless sum 1 − 1/2 + 1/4 − 1/8 + … .", 0.666666666666667, "The common ratio includes its minus sign.", "Use a/(1 − r) with a = 1 and r = −1/2. Answer: ≈ 0.66667."),
          pr("An ideal repeated process adds 10 mg, then 2 mg, then 0.4 mg, continuing with ratio 0.2. Limiting mass added, in mg?", 12.5, "This is a geometric total.", "Use first addition divided by one minus the ratio. Answer: 12.5 mg."),
        ],
      },
      {
        title: "Match values and slopes with polynomials",
        minutes: 25,
        explain: [
          "A Taylor polynomial copies a function near a chosen centre. Its constant matches the value, its linear term matches the slope, and later terms match higher derivatives. Centred at zero, it is called a Maclaurin polynomial.",
          "The coefficient of the nth power is the nth derivative at the centre divided by n factorial. Factorial means the product of the positive whole numbers up to n; by convention, zero factorial is one. A polynomial approximation is finite, even when its associated series is endless.",
        ],
        formulas: [
          ["Taylor polynomial","P_n(x)=\\sum_{k=0}^n\\frac{f^{(k)}(a)}{k!}(x-a)^k"],
          ["Exponential near zero","e^x\\approx1+x+x^2/2"],
        ],
        examples: [
          ex("Use P₂(x) = 1 + x + x²/2 to estimate e^0.2.", [
            ["Insert the small input into each term.","1+0.2+0.2^2/2"],
            ["Add the constant, linear and quadratic contributions.","= 1.22"],
          ], "1.22"),
          ex("A function has f(1) = 4 and f′(1) = 3. Use its linear Taylor polynomial at one to estimate f(1.2).", [
            ["Use the change from the centre, not the full input.","4+3(1.2-1)"],
            ["Add slope times the small displacement to the known value.","= 4.6"],
          ], "4.6"),
        ],
        practice: [
          pr("What is 4 factorial?", 24, "Multiply the positive whole numbers up to four.", "Evaluate 1 × 2 × 3 × 4. Answer: 24."),
          pr("If f″(0) = 6, what is the coefficient of x² in its Maclaurin polynomial?", 3, "Divide the second derivative by two factorial.", "The coefficient is 6/2!. Answer: 3."),
          pr("Use 1 + x + x²/2 to estimate e^(−0.1).", 0.905, "Keep the sign of the linear term; the square is positive.", "Evaluate the three terms at x = −0.1. Answer: 0.905."),
          pr("Use the quadratic Taylor polynomial of √x at x = 4 to estimate √4.4. Here f(4) = 2, f′(4) = 1/4 and f″(4) = −1/32.", 2.0975, "Use displacement 0.4 and divide the second derivative by two factorial.", "Evaluate 2 + 0.4/4 − 0.4²/64. Answer: 2.0975."),
        ],
      },
      {
        title: "Sine and logarithm expansions",
        minutes: 25,
        explain: [
          "Use radians in sine expansions. Its non-zero powers are odd and their signs alternate. Near zero, sin x is close to x. Adding the cubic and fifth-power terms extends the useful range.",
          "The logarithm expansion has alternating powers divided by their powers, without factorials. Its zero-centred series equals ln(1 + x) only for −1 < x ≤ 1. Always check the allowed range before trusting more terms.",
        ],
        formulas: [
          ["Sine series","\\sin x=x-x^3/3!+x^5/5!-\\cdots"],
          ["Logarithm series","\\ln(1+x)=x-x^2/2+x^3/3-\\cdots\\quad(-1<x\\le1)"],
        ],
        examples: [
          ex("Use x − x³/6 to estimate sin(0.3), in radians.", [
            ["Use the linear term and subtract the cubic correction.","0.3-0.3^3/6"],
            ["Evaluate the two-term polynomial.","= 0.2955"],
          ], "0.2955"),
          ex("Use x − x²/2 + x³/3 to estimate ln(1.2).", [
            ["Here 1 + x = 1.2, so use the excess above one.","0.2-0.2^2/2+0.2^3/3"],
            ["Evaluate the three terms at x = 0.2.","\\approx 0.18267"],
          ], "≈ 0.18267"),
        ],
        practice: [
          pr("Use sin θ ≈ θ to estimate sin(0.05), with θ in radians.", 0.05, "Keep only the first sine term.", "The first term is the angle itself. Answer: 0.05."),
          pr("Use 1 − x²/2 to estimate cos(0.2), in radians.", 0.98, "Cosine starts with a constant and an even power.", "Subtract half the angle squared from one. Answer: 0.98."),
          pr("Use x − x²/2 to estimate ln(0.9).", -0.105, "Find x from 1 + x = 0.9.", "Use x = −0.1 in both terms. Answer: -0.105."),
          pr("Use x − x³/6 + x⁵/120 at x = π. What value does this polynomial predict for sin π?", 0.524043913417169, "Use π in radians and keep all three terms.", "This is a finite approximation; the true sine value is zero. Answer: ≈ 0.52404."),
        ],
      },
      {
        title: "Convergence and a useful error bound",
        minutes: 25,
        explain: [
          "An approximation needs an accuracy check. In an alternating series whose term sizes decrease to zero, the error after stopping is no larger than the first omitted term. This is a bound, not necessarily the actual error.",
          "For a convergent power series, the ratio test often finds its radius of convergence; test the endpoints separately. For engineering estimates, use a small dimensionless input and check the omitted term before dropping it. For a rod with constant expansion coefficient, an exponential length model gives the familiar linear expansion as its first approximation.",
        ],
        formulas: [
          ["Alternating error bound","|R_n|\\le |\\text{first omitted term}|"],
          ["Ratio test","L=\\lim |a_{n+1}/a_n|:\\quad L<1\\Rightarrow\\text{converges}"],
        ],
        examples: [
          ex("For sin(0.2) ≈ 0.2, give the alternating-series error bound from the next term.", [
            ["The first omitted sine term is the cubic term.","0.2^3/6"],
            ["Use its absolute size as the bound.","\\approx 0.0013333"],
          ], "≈ 0.0013333"),
          ex("A stated constant-expansion model has α = 0.000012 per °C, ΔT = 100 °C and L₀ = 1000 mm. Linear estimate of length increase, in mm?", [
            ["The first change term is L₀αΔT.","1000(0.000012)(100)"],
            ["Multiply initial length by the small exponent.","= 1.2"],
          ], "1.2 mm"),
        ],
        practice: [
          pr("For ln(1.1) ≈ 0.1 − 0.1²/2, what next-term error bound applies?", 0.000333333333333333, "The next logarithm term is cubic divided by three.", "Use 0.1³/3 as the bound. Answer: ≈ 0.00033333.", {"tol":3.33333333333333e-7}),
          pr("For Σ(x/2)ⁿ from n = 0 onward, what is the radius of convergence about zero?", 2, "Require the absolute geometric ratio to be below one.", "|x/2| < 1 gives |x| < 2. Answer: 2."),
          pr("At x = 2, what is the size of the ratio of consecutive terms in 1 + x + x² + … ?", 2, "A geometric series repeats the same ratio.", "Here the ratio is |x|; it exceeds one, so this series diverges. Answer: 2."),
          pr("For L = L₀e^u with L₀ = 1000 mm and u = 0.0012, what is the first omitted length term after L₀(1 + u), in mm?", 0.00072, "Multiply the quadratic exponential term by L₀.", "Evaluate L₀u²/2; later terms are smaller here. Answer: 0.00072 mm.", {"tol":7.200000000000001e-7}),
        ],
      },
    ],
  },

  'math-020': {
    predict: {
      q: "You stand on the hot-plate surface at (x, y) = (1.5, 0), away from its hottest centre. Could the tangent be flat in one direction but downhill in another at that same point?",
      options: ["No: a point has only one slope","Yes: flat along y, downhill along +x","Yes: flat along x, downhill along +y","No: both directions must be flat away from the centre"],
      answer: 1,
      reveal: "Along y, the point lies at the top of that particular slice, so its slope is zero. Along +x, it lies on a descending slice; a surface can have different slopes in different directions.",
    },
    parts: [
      {
        title: "Freeze all but one variable",
        minutes: 25,
        explain: [
          "A surface assigns a height to each pair of horizontal positions. A partial derivative measures its slope while just one position changes. Hold the other position fixed, as though it were an ordinary number.",
          "The notation ∂ distinguishes this from changing every variable at once. State what stays fixed in a physical question: the response to heating at fixed volume differs from the response while a gas expands.",
        ],
        formulas: [
          ["Partials of a simple surface","f=x^2y:\\quad f_x=2xy,\\quad f_y=x^2"],
        ],
        examples: [
          ex("For f(x, y) = x²y, find ∂f/∂x at (2, 3).", [
            ["Treat y as constant and differentiate x².","2(2)(3)"],
            ["Evaluate 2xy at the point.","= 12"],
          ], "12"),
          ex("For f(x, y) = 3x + 5y², find ∂f/∂y at (2, 4).", [
            ["The term containing only x has zero y derivative.","10(4)"],
            ["Evaluate 10y at the point.","= 40"],
          ], "40"),
        ],
        practice: [
          pr("For f = 4x + 7y, find ∂f/∂x.", 4, "Only the x term changes.", "Differentiate 4x while holding y fixed. Answer: 4."),
          pr("For f = x² + y², find ∂f/∂y at (1, 3).", 6, "Differentiate only the y power.", "The partial is 2y; evaluate at y = 3. Answer: 6."),
          pr("For f = xy², find ∂f/∂x at (4, 2).", 4, "The multiplier y² stays fixed.", "The x derivative is y². Answer: 4."),
          pr("For f = e^(xy), find ∂f/∂y at (2, 0).", 2, "Use the chain rule with x fixed.", "The derivative is xe^(xy); substitute the point. Answer: 2."),
        ],
      },
      {
        title: "Read slopes on a hot surface",
        minutes: 25,
        explain: [
          "A temperature map has units of temperature for height and length for horizontal position. Its partial derivative therefore has units of temperature per length. A negative partial means cooling as you move in the positive direction.",
          "The hottest point of a smooth symmetric bump can have zero slope in every horizontal direction. Farther from the centre, a slope can be zero in one direction without being zero in the other. Zero slope does not mean zero temperature.",
        ],
        formulas: [
          ["Illustrative plate","T=100-2x^2-y^2,\\quad T_x=-4x,\\quad T_y=-2y"],
        ],
        examples: [
          ex("For T = 100 − 2x² − y² °C, with x and y in cm, find the +x slope at (2, 1), in °C/cm.", [
            ["Differentiate with y fixed.","-4(2)"],
            ["Evaluate −4x at x = 2.","= -8"],
          ], "-8 °C/cm"),
          ex("For the scene model T = 20 + 60e^(−(x² + y²)/8) °C, find the +y slope at (0, 2), in °C/cm.", [
            ["Use the chain rule on the exponential.","-15(2)e^{-4/8}"],
            ["Evaluate −15y times the exponential at the point.","\\approx -18.196"],
          ], "≈ -18.196 °C/cm"),
        ],
        practice: [
          pr("For T = 100 − 2x² − y² °C, find T at (2, 1), in °C.", 91, "Evaluate the temperature, rather than its slope.", "Substitute both coordinates into T. Answer: 91 °C."),
          pr("For T = 100 − 2x² − y² °C, find T_y at (2, 0), in °C/cm.", 0, "The y derivative only depends on y.", "Evaluate −2y at zero. Answer: 0 °C/cm.", {"tol":1e-12}),
          pr("For T = 100 − 2x² − y² °C, compare the magnitudes of T_x and T_y at (2, 1). What is |T_x|/|T_y|?", 4, "Compare slope sizes without their signs.", "Divide the x slope magnitude by the y slope magnitude. Answer: 4."),
          pr("For the scene model T = 20 + 60e^(−(x² + y²)/8) °C, what is its centre temperature at (0, 0), in °C?", 80, "At the centre the exponent is zero.", "Add the full excess to the surroundings temperature. Answer: 80 °C."),
        ],
      },
      {
        title: "Small changes and linked variables",
        minutes: 25,
        explain: [
          "If both inputs move a little, estimate the output change by adding each partial slope times its input change. This is the total differential. The approximation improves for smaller changes on a smooth surface.",
          "If both inputs depend on time, the multivariable chain rule adds their contributions to the time rate. Measurement errors can also be estimated this way. A worst-case bound adds the absolute contributions when the signs of the errors are unknown.",
        ],
        formulas: [
          ["Small change","\\Delta f\\approx f_x\\Delta x+f_y\\Delta y"],
          ["Time chain rule","\\frac{df}{dt}=f_x\\frac{dx}{dt}+f_y\\frac{dy}{dt}"],
        ],
        examples: [
          ex("For f = x²y at (2, 3), estimate Δf when Δx = 0.01 and Δy = 0.02.", [
            ["Find both partials at the starting point.","12(0.01)+4(0.02)"],
            ["Add each starting slope times its input change.","= 0.2"],
          ], "0.2"),
          ex("For f = x² + y², x = t and y = 2t, find df/dt at t = 1.", [
            ["Use each partial slope times its coordinate speed.","2(1)(1)+2(2)(2)"],
            ["At t = 1, the point is (1, 2) and the speeds are one and two.","= 10"],
          ], "10"),
        ],
        practice: [
          pr("A surface has f_x = 3 and f_y = 4 at a point. Estimate Δf for Δx = 0.1, Δy = 0.", 0.3, "Only the x input changes.", "Multiply the x slope by its small change. Answer: 0.3."),
          pr("A plate has T_x = −8 °C/cm and T_y = −2 °C/cm at a point. Estimate ΔT for Δx = 0.1 cm and Δy = 0.2 cm, in °C.", -1.2, "Add the two directional contributions.", "Compute −8(0.1) − 2(0.2). Answer: -1.2 °C."),
          pr("A rectangular sheet has area A = lw, with l = 10 cm and w = 5 cm. Estimate the largest absolute area error if each length error is at most 0.01 cm, in cm².", 0.15, "Use absolute contributions from the two partials.", "The linear worst-case estimate is w|Δl| + l|Δw|. Answer: 0.15 cm²."),
          pr("For f = xy, at (2, 3) the speeds are dx/dt = 4 and dy/dt = −1. Find df/dt.", 10, "The partial slopes are y and x.", "Compute y(dx/dt) + x(dy/dt). Answer: 10."),
        ],
      },
      {
        title: "Curvature, mixed partials and equilibrium",
        minutes: 25,
        explain: [
          "Differentiate a partial again to measure curvature. A second x partial describes bending along an x slice. A mixed partial asks how the x slope changes as y changes. For continuous second partials near a point, the two mixed orders agree.",
          "To find a possible equilibrium of a two-variable energy, set both first partials to zero. A positive second-derivative test identifies a local minimum. Engineers use this to find stable states; flat slopes alone do not guarantee stability.",
        ],
        formulas: [
          ["Mixed partials for a smooth surface","f_{xy}=f_{yx}"],
          ["Second-derivative test","D=f_{xx}f_{yy}-f_{xy}^2:\\quad D>0,\\ f_{xx}>0\\Rightarrow\\text{local minimum}"],
        ],
        examples: [
          ex("For f = x²y³, find f_xy at (2, 1), meaning differentiate in x and then in y.", [
            ["First get 2xy³, then differentiate in y.","6(2)(1)^2"],
            ["The mixed partial is 6xy².","= 12"],
          ], "12"),
          ex("For energy E(x, y) = (x − 2)² + 3(y + 1)², what is the x coordinate of the stable minimum?", [
            ["Set E_x and E_y to zero.","2(x-2)=0\\Rightarrow x=2"],
            ["The squared terms are both smallest when their brackets vanish.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("For f = 3x² + y², find f_xx.", 6, "Differentiate the x term twice.", "The first x partial is 6x; differentiate again. Answer: 6."),
          pr("For f = x²y, find f_yy.", 0, "The first y partial is x².", "That expression has no y dependence. Answer: 0.", {"tol":1e-12}),
          pr("For f = x² + 3y², calculate D = f_xx f_yy − f_xy².", 12, "Find the two pure second partials and the mixed one.", "Use f_xx = 2, f_yy = 6 and f_xy = 0. Answer: 12."),
          pr("For f = x² − y², calculate D = f_xx f_yy − f_xy² at the origin.", -4, "The y slice bends in the opposite direction from the x slice.", "A negative determinant here identifies a saddle. Answer: -4."),
        ],
      },
    ],
  },

  'math-021': {
    predict: {
      q: "Every bead has an equal chance of going left or right at each pin. On a board with twelve rows, should the far-left bin and the central bin fill equally often?",
      options: ["Yes: every turn is fair","No: the far-left bin has more routes","No: many routes lead to the centre, but only one leads all the way left","Yes: enough beads always flatten the pile"],
      answer: 2,
      reveal: "Fair turns do not make final bins equally likely. Many different left–right routes reach the centre; the far-left bin requires left at every row, so the middle piles up faster.",
    },
    parts: [
      {
        title: "Choose a useful centre",
        minutes: 25,
        explain: [
          "A population is the full group you want to describe; a sample is a smaller selection from it. A set of measurements has a centre and a spread. The mean adds all the measurements and divides by their count. It is a balance point: a very large reading can pull it strongly.",
          "The median is the middle value after sorting, or the mean of the middle pair for an even count. The mode is a most frequent value. Compare these descriptions before deciding that one average tells the whole story.",
        ],
        formulas: [
          ["Mean","\\bar{x}=\\frac{\\sum x_i}{n}"],
          ["Even-count median","\\text{median}=\\tfrac12(\\text{two middle values added})"],
        ],
        examples: [
          ex("Strength measurements are 48, 50 and 52 MPa. Mean strength in MPa?", [
            ["Add all measurements, then divide by their count.","(48+50+52)/3"],
            ["Compute the sum per measurement.","= 50"],
          ], "50 MPa"),
          ex("Measurements are 2, 3, 4 and 31 mm. What is their median in mm?", [
            ["The values are already sorted; use the middle pair.","(3+4)/2"],
            ["Average the two central readings.","= 3.5"],
          ], "3.5 mm"),
        ],
        practice: [
          pr("Find the mean of 2, 4, 6 and 8.", 5, "Add then divide by four.", "The total divided by the count gives the centre. Answer: 5."),
          pr("Find the median of 1, 9, 3, 5 and 7.", 5, "Sort before choosing the middle.", "The sorted values are 1, 3, 5, 7, 9; take the middle. Answer: 5."),
          pr("Find the mode of 4, 4, 5, 6, 6 and 6.", 6, "Count how often each value appears.", "Six appears most frequently. Answer: 6."),
          pr("A batch has two specimens at 100 MPa and three at 110 MPa. Mean strength in MPa?", 106, "Weight each strength by its specimen count.", "Divide total strength by total specimen count. Answer: 106 MPa."),
        ],
      },
      {
        title: "Measure scatter in the original units",
        minutes: 25,
        explain: [
          "Subtract the mean from each reading to find its deviation. The deviations sum to zero, so squaring them prevents positive and negative differences cancelling. Their average size gives a variance.",
          "Take the square root to return to the original units: this is standard deviation. Divide by n for a complete population, or n − 1 when estimating population spread from a sample. State which one you mean.",
        ],
        formulas: [
          ["Sample standard deviation","s=\\sqrt{\\frac{\\sum(x_i-\\bar{x})^2}{n-1}}"],
          ["Population standard deviation","\\sigma=\\sqrt{\\frac{\\sum(x_i-\\mu)^2}{n}}"],
        ],
        examples: [
          ex("Treat 49, 50 and 51 MPa as a sample. Find the sample standard deviation in MPa.", [
            ["First subtract their mean of fifty.","\\sqrt{(1+0+1)/(3-1)}"],
            ["Square the deviations, add, divide by n − 1 and take the square root.","= 1"],
          ], "1 MPa"),
          ex("Treat 2 and 6 mm as the whole population. Population standard deviation in mm?", [
            ["Their population mean is four.","\\sqrt{(4+4)/2}"],
            ["Divide the sum of squared deviations by the full population count.","= 2"],
          ], "2 mm"),
        ],
        practice: [
          pr("For the data 4, 7 and 10 mm, what is the range in mm?", 6, "Subtract the smallest from the largest.", "Compute 10 − 4. Answer: 6 mm."),
          pr("A sample has four readings and sum of squared deviations 27 MPa². Sample variance in MPa²?", 9, "Variance uses no square root yet.", "Divide by n − 1. Answer: 9 MPa²."),
          pr("A sample variance is 25 MPa². Sample standard deviation in MPa?", 5, "Take the square root to restore strength units.", "Compute √25. Answer: 5 MPa."),
          pr("Each measurement in a sample is doubled. What is new standard deviation divided by old standard deviation, assuming the old spread is non-zero?", 2, "Deviations double before they are squared.", "Variance grows by four, so standard deviation doubles. Answer: 2."),
        ],
      },
      {
        title: "The bell curve and standard scores",
        minutes: 25,
        explain: [
          "A normal distribution is a symmetric bell-shaped model. Its mean μ locates its centre, and its standard deviation σ sets its width. Not every measurement follows it; check the shape and the physical limits before using the model.",
          "A z score tells how many standard deviations a reading is above or below the mean. For normal data, the rough 68–95–99.7 rule describes intervals within one, two and three standard deviations. The two tails share the leftover probability equally.",
        ],
        formulas: [
          ["Standard score","z=(x-\\mu)/\\sigma"],
          ["Rough normal coverage","P(|X-\\mu|\\le2\\sigma)\\approx0.95"],
        ],
        examples: [
          ex("A stated normal strength model has mean 350 MPa and σ = 10 MPa. What is the z score of 330 MPa?", [
            ["Subtract the mean before dividing by spread.","(330-350)/10"],
            ["The reading is below the mean, so the score is negative.","= -2"],
          ], "-2"),
          ex("Using the rough 95% rule, what percentage lies below μ − 2σ in a normal model?", [
            ["Split the part outside the central interval between two equal tails.","(100-95)/2"],
            ["Subtract the central percentage, then halve the remainder.","= 2.5"],
          ], "2.5 %"),
        ],
        practice: [
          pr("A normal model has μ = 100 and σ = 5. What is the z score of 110?", 2, "Count standard deviations above the mean.", "Compute (110 − 100)/5. Answer: 2."),
          pr("A normal strength model has μ = 200 MPa and σ = 8 MPa. What is the upper endpoint of μ ± 2σ, in MPa?", 216, "Add two standard deviations.", "Evaluate 200 + 2(8). Answer: 216 MPa."),
          pr("Using the rough 68% rule, what percentage lies above μ + σ?", 16, "The upper and lower tails have equal shares.", "Split the percentage outside the central interval. Answer: 16 %."),
          pr("A normal model has μ = 50 and σ = 4. Which reading has z = −1.5?", 44, "Rearrange x = μ + zσ.", "Move one and a half standard deviations below the mean. Answer: 44."),
        ],
      },
      {
        title: "Samples and uncertainty in an average",
        minutes: 25,
        explain: [
          "A sample mean varies from sample to sample. For independent readings with the same finite variance, its standard deviation is σ/√n. This standard error measures uncertainty in the mean, rather than the spread of individual readings.",
          "With enough independent readings, means often have a nearly normal distribution even when individual readings do not. A rough interval using a known population σ is mean ± 2σ/√n. This does not repair biased sampling or a miscalibrated instrument.",
        ],
        formulas: [
          ["Standard error","\\mathrm{SE}=\\sigma/\\sqrt n"],
          ["Rough normal interval","\\bar{x}\\pm2\\mathrm{SE}"],
        ],
        examples: [
          ex("Independent strength readings have known population σ = 12 MPa. Standard error of a mean of nine readings, in MPa?", [
            ["Divide individual spread by the square root of sample size.","12/\\sqrt9"],
            ["Use the known population spread.","= 4"],
          ], "4 MPa"),
          ex("A sample mean is 100 MPa with known σ = 10 MPa and n = 100 independent readings. Upper endpoint of the rough mean ± 2 SE interval, in MPa?", [
            ["First find the standard error, then add twice it to the mean.","100+2(10/\\sqrt{100})"],
            ["Individual scatter is reduced by averaging.","= 102"],
          ], "102 MPa"),
        ],
        practice: [
          pr("Known σ = 8 mm and n = 16 independent readings. Standard error in mm?", 2, "Take the square root of the count.", "Divide eight by √16. Answer: 2 mm."),
          pr("If independent sample size grows from 25 to 100 at the same σ, what is new SE divided by old SE?", 0.5, "SE varies inversely with the square root of size.", "Take the square root of the old-to-new size ratio. Answer: 0.5."),
          pr("Known σ = 6 MPa. How many independent readings are needed for SE = 1 MPa?", 36, "Rearrange SE = σ/√n.", "Square σ divided by the target SE. Answer: 36."),
          pr("A mean is 50 mm, with known σ = 4 mm and n = 16 independent readings. Lower endpoint of the rough mean ± 2 SE interval, in mm?", 48, "Subtract twice the standard error.", "Use 50 − 2(4/√16). Answer: 48 mm."),
        ],
      },
    ],
  },

  'math-022': {
    predict: {
      q: "You roll two fair dice repeatedly. There are eleven possible sums, from 2 to 12. After many rolls, what should the sum bars look like?",
      options: ["Eleven equally tall bars","A taller bar at 7 than at 2","A taller bar at 2 than at 7","Exactly the same counts for 6 and 8 at every moment"],
      answer: 1,
      reveal: "The dice pairs are equally likely, but their sums are not. Six pairs make 7 and only one pair makes 2, so the long-run share of 7s is six times as large.",
    },
    parts: [
      {
        title: "Count equally likely outcomes",
        minutes: 25,
        explain: [
          "Probability is a number from zero to one. Zero means impossible and one means certain. When the basic outcomes are equally likely, divide the count of favourable outcomes by the total count.",
          "For two dice, distinguish the first die from the second. A first-die one and second-die six is a different outcome from first-die six and second-die one. Sums group several of these pairs together.",
        ],
        formulas: [
          ["Equally likely outcomes","P(A)=\\frac{\\text{favourable count}}{\\text{total count}}"],
          ["Complement","P(A^c)=1-P(A)"],
        ],
        examples: [
          ex("Two fair dice are rolled. Probability of a sum of seven?", [
            ["Count the ordered pairs that add to seven.","6/36"],
            ["Divide the six favourable pairs by all equally likely pairs.","\\approx 0.16667"],
          ], "≈ 0.16667"),
          ex("A batch has three defective pieces among twenty equally likely pieces. Chance a randomly selected piece is good?", [
            ["Use the complement of selecting a defect.","(20-3)/20"],
            ["Count the good pieces and divide by the total.","= 0.85"],
          ], "0.85"),
        ],
        practice: [
          pr("Probability of an even number on one fair six-sided die?", 0.5, "Count the even faces.", "The favourable faces are 2, 4 and 6. Answer: 0.5."),
          pr("Two fair dice are rolled. Probability of a sum of two?", 0.0277777777777778, "Both dice must show their lowest face.", "Only the ordered pair (1, 1) works. Answer: ≈ 0.027778."),
          pr("Two fair dice are rolled. Probability of a sum of six?", 0.138888888888889, "List pairs whose first entry runs from one to five.", "Five ordered pairs work out of thirty-six. Answer: ≈ 0.13889."),
          pr("A tray holds four red, three blue and three green beads. Chance a uniformly selected bead is not blue?", 0.7, "Count both colours allowed by the event.", "The favourable beads are red or green. Answer: 0.7."),
        ],
      },
      {
        title: "And, or and given",
        minutes: 25,
        explain: [
          "For independent events, knowing that one happened does not change the chance of the other. Multiply their probabilities for both to happen. Without independence, use the probability of the second event given the first.",
          "For either event, add their probabilities and subtract their overlap so it is not counted twice. Sampling without replacement changes the remaining mix. Bayes’ rule uses conditional probabilities to revise a chance after observing evidence.",
        ],
        formulas: [
          ["Conditional multiplication","P(A\\cap B)=P(A)P(B\\mid A)"],
          ["Either event","P(A\\cup B)=P(A)+P(B)-P(A\\cap B)"],
          ["Bayes’ rule","P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}"],
        ],
        examples: [
          ex("Two independent fair coin tosses are made. Chance both are heads?", [
            ["Independence lets you multiply the single-toss probabilities.","(1/2)(1/2)"],
            ["Both conditions must hold.","= 0.25"],
          ], "0.25"),
          ex("A tray has two defective and eight good pieces. Draw two uniformly without replacement. Probability both are defective?", [
            ["After a defect is removed, both the defect count and total count fall.","(2/10)(1/9)"],
            ["Multiply the first chance by the conditional second chance.","\\approx 0.022222"],
          ], "≈ 0.022222"),
        ],
        practice: [
          pr("A fair die is rolled. Probability of an even face or a six?", 0.5, "Six is already among the even faces.", "Subtract the overlap once. Answer: 0.5."),
          pr("Independent defect chances are 0.02 for each of two pieces. Chance both are good?", 0.9604, "Convert each defect chance to a good-piece chance.", "Multiply the two good-piece probabilities. Answer: 0.9604."),
          pr("Among ten pieces, four are red and two of those red pieces are cracked. Given that a randomly selected piece is red, probability it is cracked?", 0.5, "Restrict the possible pieces to the stated colour.", "Divide cracked red pieces by all red pieces. Answer: 0.5."),
          pr("A test flags 90% of defective parts and 10% of good parts. Defects are 10% of all parts. For a flagged part, probability it is defective?", 0.5, "Compare true defect flags with all flags.", "Use Bayes’ rule, including false flags from good parts. Answer: 0.5."),
        ],
      },
      {
        title: "Repeated trials and at least one",
        minutes: 25,
        explain: [
          "If independent trials all have the same success chance p, the probability of no successes in n trials is (1 − p)ⁿ. Subtract from one to get at least one success. Adding n copies of p can overcount overlapping events.",
          "To count exactly k successes, account for their possible positions as well as their individual chances. The binomial coefficient counts those positions. Use this model only when the trial count is fixed, trials are independent and the success chance stays the same. The notation n! means multiply all positive whole numbers up to n, with 0! = 1; the position count is n!/[k!(n − k)!].",
        ],
        formulas: [
          ["At least one","P(X\\ge1)=1-(1-p)^n"],
          ["Binomial count","P(X=k)=\\binom nk p^k(1-p)^{n-k}"],
        ],
        examples: [
          ex("Probability of at least one six in four independent rolls of a fair die?", [
            ["It is easier to count no sixes first.","1-(5/6)^4"],
            ["Subtract the chance all four rolls miss six from one.","\\approx 0.51775"],
          ], "≈ 0.51775"),
          ex("Defects occur independently with probability 0.02 per bolt. Probability all ten bolts in a box are good?", [
            ["Every bolt must avoid a defect.","0.98^{10}"],
            ["Multiply the good-bolt probability ten times.","\\approx 0.81707"],
          ], "≈ 0.81707"),
        ],
        practice: [
          pr("Probability of three heads in three independent fair tosses?", 0.125, "Multiply the head chances.", "All three tosses must be heads. Answer: 0.125."),
          pr("Each of five independent parts is defective with probability 0.1. Probability at least one is defective?", 0.40951, "Use one minus the chance of all good.", "Subtract 0.9⁵ from one. Answer: 0.40951."),
          pr("Probability of exactly two heads in three independent fair tosses?", 0.375, "Choose which toss is the single tail.", "Three positions each have probability (1/2)³. Answer: 0.375."),
          pr("Each of four independent pieces is defective with probability 0.05. Probability exactly one is defective?", 0.171475, "Choose the defect position, then multiply defect and good chances.", "There are four possible positions for the one defect. Answer: ≈ 0.17147."),
        ],
      },
      {
        title: "Expectations and long-run frequencies",
        minutes: 25,
        explain: [
          "Expected value is a probability-weighted average over many repetitions. An expected defect count can be fractional, even though one actual batch has a whole number of defects. For a binomial count the mean is np.",
          "The law of large numbers says a share usually gets more stable as independent trials accumulate. It does not force the next roll to compensate for earlier rolls. Random bars still fluctuate, and their counts need not hit their expected values exactly.",
        ],
        formulas: [
          ["Expectation","E[X]=\\sum xP(X=x)"],
          ["Binomial spread","E[X]=np,\\quad\\mathrm{Var}(X)=np(1-p)"],
        ],
        examples: [
          ex("A process makes 200 independent pieces with defect chance 0.03 each. Expected defect count?", [
            ["Multiply count by the per-piece chance.","200(0.03)"],
            ["The expected count averages across many batches.","= 6"],
          ], "6"),
          ex("A fair die pays its face value in pesos. Expected payment per roll, in pesos?", [
            ["Weight each face by its equal probability.","(1+2+3+4+5+6)/6"],
            ["Add the face values and divide by the number of faces.","= 3.5"],
          ], "3.5 pesos"),
        ],
        practice: [
          pr("In 600 rolls of two fair dice, what is the expected count of sums of seven?", 100, "Multiply trial count by the sum probability.", "Use six hundred times one-sixth. Answer: 100."),
          pr("A defect count is binomial with n = 100 and p = 0.1. What is its variance?", 9, "Use np(1 − p).", "Multiply count, defect chance and good chance. Answer: 9."),
          pr("A fair die has shown no six in its last ten independent rolls. Probability of a six on the next roll?", 0.166666666666667, "Independence leaves the next-roll chance unchanged.", "The next roll still has six equally likely faces. Answer: ≈ 0.16667."),
          pr("A game pays ₱10 with probability 0.2 and pays zero otherwise. Entry costs ₱3. Expected net gain in pesos per game?", -1, "Find expected payout before subtracting the certain cost.", "Use a probability-weighted payout minus the entry fee. Answer: -1 pesos."),
        ],
      },
    ],
  },

  'math-023': {
    predict: {
      q: "The fitting scene draws a square on every vertical miss. One candidate line has misses of 0 and 4 MPa; another has misses of 2 and 2 MPa. Their total absolute miss is the same. Which does least squares prefer?",
      options: ["The first: it hits one point exactly","The second: spreading the miss makes the squares smaller in total","They must tie","Whichever line is flatter"],
      answer: 1,
      reveal: "The squared totals are 16 and 8 MPa². Squaring penalises a single large miss more heavily, so least squares prefers the second line.",
    },
    parts: [
      {
        title: "A line predicts, a residual measures the miss",
        minutes: 25,
        explain: [
          "A straight-line model predicts y from x using a slope m and an intercept b. The slope gives the predicted change in y per unit change in x. The intercept is the prediction at x = 0, which may lie outside the measured range.",
          "A residual is observed y minus predicted y. Positive means the point is above the line. Draw its square and add all such areas to measure the total squared miss. Large residuals count strongly.",
        ],
        formulas: [
          ["Prediction and residual","\\hat{y}=mx+b,\\quad e=y-\\hat{y}"],
          ["Squared error total","S=\\sum e_i^2"],
        ],
        examples: [
          ex("A point is (3, 10) and the line is y = 2x + 5. Residual in y units?", [
            ["Predict first, then subtract prediction from observation.","10-(2(3)+5)"],
            ["Keep the sign of the vertical miss.","= -1"],
          ], "-1"),
          ex("Residuals are −2, 1 and 3 MPa. Sum of squared residuals in MPa²?", [
            ["Square each residual before adding.","(-2)^2+1^2+3^2"],
            ["The negative miss also contributes a positive area.","= 14"],
          ], "14 MPa²"),
        ],
        practice: [
          pr("The fitted line is y = 4x + 1. Prediction at x = 2?", 9, "Substitute x into the line.", "Evaluate 4(2) + 1. Answer: 9."),
          pr("Observed y = 8, predicted y = 6. What is the residual?", 2, "Observation minus prediction.", "Subtract six from eight. Answer: 2."),
          pr("A single residual is −5 MPa. Its squared contribution in MPa²?", 25, "A square removes the sign.", "Multiply the residual by itself. Answer: 25 MPa²."),
          pr("Compare squared totals for residuals (0, 4) and (2, 2). First total minus second total?", 8, "Calculate each sum of squares separately.", "The more uneven pair has the larger squared total. Answer: 8."),
        ],
      },
      {
        title: "Find the least-squares line",
        minutes: 25,
        explain: [
          "Least squares chooses the slope and intercept that minimise the sum of squared residuals. First find the mean x and mean y. Measure each point’s displacement from those means.",
          "Multiply each pair of displacements and add to get S_xy. Square the x displacements and add to get S_xx. Their ratio is the fitted slope. The intercept makes the line pass through the point of means. Different x values are needed for a unique slope.",
        ],
        formulas: [
          ["Slope and intercept","m=S_{xy}/S_{xx},\\quad b=\\bar{y}-m\\bar{x}"],
          ["Centred sums","S_{xy}=\\sum(x_i-\\bar{x})(y_i-\\bar{y}),\\quad S_{xx}=\\sum(x_i-\\bar{x})^2"],
        ],
        examples: [
          ex("For points (1, 2), (2, 3), (3, 7), find the least-squares slope.", [
            ["Their means are x̄ = 2 and ȳ = 4.","\\frac{(-1)(-2)+0(-1)+1(3)}{1+0+1}"],
            ["Divide the sum of cross-products by the sum of squared x displacements.","= 2.5"],
          ], "2.5"),
          ex("For means x̄ = 2 and ȳ = 4 with fitted slope m = 2.5, find the intercept.", [
            ["The fitted line must pass through the point of means.","4-2.5(2)"],
            ["Subtract m times mean x from mean y.","= -1"],
          ], "-1"),
        ],
        practice: [
          pr("A fit has S_xy = 12 and S_xx = 4. What is its slope?", 3, "Divide the cross-product sum by the x-square sum.", "Use m = S_xy/S_xx. Answer: 3."),
          pr("A fit has x̄ = 3, ȳ = 11 and m = 2. What is b?", 5, "Use b = ȳ − mx̄.", "Subtract the slope contribution at mean x. Answer: 5."),
          pr("For x values 1, 2, 3, what is S_xx?", 2, "Find mean x before squaring deviations.", "Subtract two from each x and add the squared results. Answer: 2."),
          pr("Points are (0, 1), (1, 2), (2, 5). What is the least-squares prediction at x = 1?", 2.66666666666667, "Here x = 1 is the mean x.", "The fitted line at mean x equals mean y. Answer: ≈ 2.6667."),
        ],
      },
      {
        title: "Correlation and the share explained",
        minutes: 25,
        explain: [
          "Correlation r compares the cross-product sum with the spreads in both directions. It lies between minus one and one. The sign gives the direction of a linear trend; its magnitude measures how closely the points follow a straight line.",
          "For ordinary least squares with an intercept, R² is the fraction of the observed y variation accounted for by the fitted line, and equals r². Neither correlation nor a large R² proves causation. Curved patterns can have small linear correlation.",
        ],
        formulas: [
          ["Correlation","r=\\frac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}"],
          ["Explained fraction","R^2=1-\\frac{\\sum e_i^2}{\\sum(y_i-\\bar{y})^2}=r^2"],
        ],
        examples: [
          ex("S_xy = 6, S_xx = 4 and S_yy = 9. Find r.", [
            ["Normalise the cross-product by both spreads.","6/\\sqrt{4(9)}"],
            ["Divide by the square root of the product of squared sums.","= 1"],
          ], "1"),
          ex("A linear fit with an intercept has r = −0.8. What percentage of observed variation does it explain?", [
            ["Square the correlation, then convert to percent.","100(-0.8)^2"],
            ["The falling direction does not make the explained fraction negative.","= 64"],
          ], "64 %"),
        ],
        practice: [
          pr("For r = 0.6, what is R² in a simple linear fit with an intercept?", 0.36, "Square the correlation.", "Compute 0.6 × 0.6. Answer: 0.36."),
          pr("Residual sum of squares is 20 and total y sum of squares is 100. Find R² for a least-squares fit with an intercept.", 0.8, "Subtract the unexplained share from one.", "Use 1 − residual sum / total sum. Answer: 0.8."),
          pr("S_xy = −8, S_xx = 4 and S_yy = 25. Find r.", -0.8, "Keep the sign of S_xy.", "Divide −8 by √(4 × 25). Answer: -0.8."),
          pr("For a fit with R² = 0.81, what percentage of observed y variation remains unexplained?", 19, "Use the complement of the explained fraction.", "Convert 1 − R² to percent. Answer: 19 %."),
        ],
      },
      {
        title: "Materials fits and responsible prediction",
        minutes: 25,
        explain: [
          "Sometimes a physical law becomes linear after transforming the horizontal variable. In a Hall–Petch model, use x = 1/√d, where d is grain size, and fit yield strength against x. Record the units used to define d.",
          "Predict within the measured range when possible. A line fitted over one range can fail outside it. Inspect residuals for curves, changing scatter and isolated unusual observations before trusting the fit. A fitted association still needs physical reasoning.",
        ],
        formulas: [
          ["Hall–Petch form","\\sigma_y=b+k d^{-1/2}"],
          ["Transform the horizontal variable","x=1/\\sqrt d"],
        ],
        examples: [
          ex("A stated fit is σ = 70 + 20/√d MPa with d measured in mm. Predicted strength for d = 0.01 mm, in MPa?", [
            ["Transform grain size before applying the slope.","70+20/\\sqrt{0.01}"],
            ["Evaluate the inverse square root of the stated grain size.","= 270"],
          ], "270 MPa"),
          ex("The same fit predicts σ = 70 + 20x MPa. What x gives σ = 170 MPa?", [
            ["Subtract the intercept, then divide by the slope.","(170-70)/20"],
            ["Solve the fitted line for its horizontal variable.","= 5"],
          ], "5"),
        ],
        practice: [
          pr("For grain size d = 0.04 mm, what is x = 1/√d, in mm^(−1/2)?", 5, "Take the square root before its reciprocal.", "Evaluate 1/√0.04. Answer: 5 mm^(−1/2)."),
          pr("A stated fit is σ = 80 + 15x MPa. Prediction at x = 6, in MPa?", 170, "Use the fit in its stated units.", "Add the intercept to slope times x. Answer: 170 MPa."),
          pr("A fit predicts 190 MPa and a specimen measures 182 MPa. Residual in MPa?", -8, "Observation minus fitted prediction.", "Subtract 190 from 182. Answer: -8 MPa."),
          pr("In the model σ = 70 + 20/√d MPa, d is measured in mm. What d gives a prediction of 270 MPa, in mm?", 0.01, "Isolate √d before squaring.", "Solve √d = 20/(270 − 70). Answer: 0.01 mm."),
        ],
      },
    ],
  },

  'math-024': {
    predict: {
      q: "The test scene compares two processes whose true mean strengths differ by 10 MPa. With only a few rods, their measured dots overlap. If more independent rods are tested, can evidence strengthen even though individual scatter stays the same?",
      options: ["No: overlapping dots rule out a mean difference","Yes: the mean difference can become clearer as its standard error shrinks","No: only a larger improvement can help","Yes: more rods guarantee every new reading exceeds every old reading"],
      answer: 1,
      reveal: "Averages become more precise as independent sample sizes grow. The same difference can stand out more clearly relative to its standard error, although the exact p-value can fluctuate when new measurements arrive.",
    },
    parts: [
      {
        title: "Start with a claim that can be tested",
        minutes: 25,
        explain: [
          "A null hypothesis H₀ states the comparison to test, such as equal population means. An alternative states the kind of difference sought. Choose a one-sided or two-sided question before seeing the results.",
          "A p-value is a probability of results at least as extreme as the observed ones, calculated under H₀ and the test assumptions. It is not the probability that H₀ is true. A significance level α is a chosen decision threshold.",
        ],
        formulas: [
          ["Two-sided comparison","H_0:\\mu_1=\\mu_2,\\quad H_1:\\mu_1\\ne\\mu_2"],
          ["Decision rule","p<\\alpha\\Rightarrow\\text{reject }H_0"],
        ],
        examples: [
          ex("A valid test gives p = 0.003. As a percentage, how often would results at least this extreme occur under H₀?", [
            ["Convert a probability to a percentage.","100(0.003)"],
            ["This percentage describes results under the null model.","= 0.3"],
          ], "0.3 %"),
          ex("At α = 0.05, tests have p-values 0.01, 0.07, 0.20 and 0.04. How many reject H₀ using p < α?", [
            ["Compare each p-value with the chosen threshold.","1+1"],
            ["Count only the values strictly below the threshold.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("Convert significance level α = 0.05 to a percentage.", 5, "Multiply a probability by one hundred.", "Convert 0.05 to percent. Answer: 5 %."),
          pr("One two-sided test has two tails of probability 0.02 each. What is its p-value?", 0.04, "A two-sided test counts both extremes.", "Add the two equal tail probabilities. Answer: 0.04."),
          pr("At α = 0.01, p-values are 0.002, 0.02 and 0.08. How many tests reject H₀?", 1, "Use the threshold stated here, not a remembered default.", "Count the probabilities below 0.01. Answer: 1."),
          pr("A valid test gives p = 0.2. Express this null-model tail probability as a percentage.", 20, "This is a probability about results under H₀.", "Multiply 0.2 by one hundred. Answer: 20 %."),
        ],
      },
      {
        title: "Compare means with a t statistic",
        minutes: 25,
        explain: [
          "A t statistic measures a mean difference in standard-error units. For two independent, equally sized samples, an equal-variance model uses the pooled sample standard deviation s_p and standard error s_p√(2/n).",
          "This pooled test assumes independent observations and equal population variances; normal populations justify the small-sample version. If variances differ, use Welch’s test instead. A paired design needs the spread of within-pair differences, rather than this formula.",
        ],
        formulas: [
          ["Equal-size pooled t","t=\\frac{\\bar{x}_{new}-\\bar{x}_{old}}{s_p\\sqrt{2/n}},\\quad \\nu=2n-2"],
          ["Equal-size pooling","s_p^2=(s_1^2+s_2^2)/2"],
        ],
        examples: [
          ex("Independent groups have means 425 and 412 MPa, pooled s = 10 MPa and n = 10 in each. Under the equal-variance model, find t for new minus old.", [
            ["Divide the mean difference by its standard error.","(425-412)/(10\\sqrt{2/10})"],
            ["Use the pooled equal-size formula.","\\approx 2.9069"],
          ], "≈ 2.9069"),
          ex("Two independent samples each have n = 8. What degrees of freedom does their pooled equal-variance t-test use?", [
            ["Add the two sample sizes, then subtract two.","2(8)-2"],
            ["Each estimated sample mean uses one degree of freedom.","= 14"],
          ], "14"),
        ],
        practice: [
          pr("In an equal-size pooled test, s_p = 10 MPa and n = 50 per group. Standard error of the difference, in MPa?", 2, "Use s_p√(2/n).", "Multiply ten by √(2/50). Answer: 2 MPa."),
          pr("The observed mean difference is 6 MPa and its standard error is 2 MPa. Find t.", 3, "The test statistic counts standard-error units.", "Divide the difference by its standard error. Answer: 3."),
          pr("Equal-sized groups have sample variances 16 and 36 MPa². Pooled standard deviation in MPa?", 5.09901951359278, "Average the variances before taking a square root.", "Use √[(16 + 36)/2]. Answer: ≈ 5.099 MPa."),
          pr("Independent equal-variance groups have old mean 100 MPa, new mean 96 MPa, s_p = 8 MPa and n = 32 each. Find signed t for new minus old.", -2, "Keep the sign of the mean difference.", "Divide the negative difference by its positive standard error. Answer: -2."),
        ],
      },
      {
        title: "Size, intervals and practical importance",
        minutes: 25,
        explain: [
          "A larger independent sample usually reduces uncertainty. If the observed difference and spread were held fixed, quadrupling each group size would halve the standard error and double the magnitude of t. Actual new observations can change the difference and spread too.",
          "Statistical significance says little about whether an improvement is useful. Report the mean difference and an uncertainty interval in physical units. For a two-sided t interval, multiply the standard error by the appropriate critical value, which depends on degrees of freedom and confidence level.",
        ],
        formulas: [
          ["Difference interval","(\\bar{x}_2-\\bar{x}_1)\\pm t_*\\mathrm{SE}"],
          ["Size effect at fixed spread","\\mathrm{SE}\\propto1/\\sqrt n"],
        ],
        examples: [
          ex("An observed gain is 13 MPa and SE = 4 MPa. Using a supplied critical multiplier of 2.1, find the lower confidence endpoint in MPa.", [
            ["Subtract critical multiplier times standard error.","13-2.1(4)"],
            ["Keep the interval in strength units.","= 4.6"],
          ], "4.6 MPa"),
          ex("At fixed observed difference and spread, n per group rises from 10 to 40. What is new |t| divided by old |t|?", [
            ["The statistic grows with the square root of sample size.","\\sqrt{40/10}"],
            ["Use the square root of the size ratio.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("A gain is 8 MPa with a supplied margin of error of 3 MPa. Upper interval endpoint in MPa?", 11, "Add the margin to the estimate.", "Use estimate plus margin. Answer: 11 MPa."),
          pr("A gain of 2 MPa on a baseline of 400 MPa is what percentage increase?", 0.5, "Divide the gain by the baseline.", "Convert the relative gain to percent. Answer: 0.5 %."),
          pr("At fixed population spread, what sample-size multiplier halves the standard error?", 4, "Sample size is inside a square root in the denominator.", "Square the desired reduction factor. Answer: 4."),
          pr("A difference interval extends from 4 to 16 MPa and is symmetric about the estimate. What is its margin of error in MPa?", 6, "The margin is half the full interval width.", "Subtract endpoints and divide by two. Answer: 6 MPa."),
        ],
      },
      {
        title: "Errors, power and sound experiments",
        minutes: 25,
        explain: [
          "A Type I error rejects a true null hypothesis. A Type II error misses a real difference. For a specified real effect, power is the probability of detecting it, equal to one minus the Type II error probability β.",
          "Random allocation and independent replicates make a comparison more trustworthy. Repeated readings on one rod do not replace independent rods. Choose the analysis before looking, and account for multiple tests: many opportunities to reject can produce false alarms even with no real effects.",
        ],
        formulas: [
          ["Power","\\mathrm{power}=1-\\beta"],
          ["Independent false-alarm chances","P(\\text{at least one})=1-(1-\\alpha)^m"],
        ],
        examples: [
          ex("For a specified effect, a test has β = 0.2. Power as a percentage?", [
            ["Power complements the missed-effect probability.","100(1-0.2)"],
            ["Subtract β from one, then convert to percent.","= 80"],
          ], "80 %"),
          ex("Twenty independent tests all have true nulls and exact false-alarm rate 0.05. Probability of at least one false alarm?", [
            ["Use the complement of no false alarms.","1-0.95^{20}"],
            ["Multiply the no-alarm chances, then subtract from one.","\\approx 0.64151"],
          ], "≈ 0.64151"),
        ],
        practice: [
          pr("One hundred valid tests each have a true null and exact α = 0.05. Expected false-alarm count?", 5, "Expected counts add across tests.", "Multiply the number of tests by their false-alarm probability. Answer: 5."),
          pr("A test has power 0.9 for a specified effect. What is β?", 0.1, "Power and β add to one.", "Subtract power from one. Answer: 0.1."),
          pr("Five rods each receive four repeated readings. How many independent rods were sampled?", 5, "Count specimens, rather than repeated readings.", "Only five separate rods provide independent specimen replication. Answer: 5."),
          pr("A Bonferroni plan divides family significance level 0.05 equally among five tests. What per-test α does it use?", 0.01, "Share the family error allowance across the tests.", "Divide 0.05 by the test count. Answer: 0.01."),
        ],
      },
    ],
  },

  'math-025': {
    predict: {
      q: "A model gear starts at 850 °C in a 50 °C bath, with dT/dt = −0.05(T − 50). One Euler step lasting 20 seconds predicts 50 °C. Does the exact cooling curve also reach the bath temperature then?",
      options: ["Yes: the straight step is exact","No: the exact curve is still about 344 °C","No: the exact curve is below the bath temperature","Yes: all cooling curves reach the bath in finite time"],
      answer: 1,
      reveal: "The exact temperature is 50 + 800e⁻¹, about 344 °C. Euler’s long straight step keeps the initial fast cooling rate for too long; the true rate slows as the temperature approaches the bath.",
    },
    parts: [
      {
        title: "A law for a whole curve",
        minutes: 25,
        explain: [
          "A differential equation relates an unknown function to its rate of change. A solution is a whole curve whose slope obeys that law at every point in its interval. An initial value selects a curve from a family of possible solutions.",
          "A slope field draws a short line at each time and state, showing the permitted slope there. A horizontal line marks a possible equilibrium when the rate stays zero. The order of an equation is the highest derivative that appears.",
        ],
        formulas: [
          ["Rate proportional to amount","y'=ky,\\quad y(0)=y_0\\Rightarrow y=y_0e^{kt}"],
          ["Equilibrium","f(y_*)=0\\quad\\text{for }y'=f(y)"],
        ],
        examples: [
          ex("For y′ = −2y and y(0) = 5, what is the starting slope y′(0)?", [
            ["Put the initial value into the rate law.","-2(5)"],
            ["The slope is minus twice the current height.","= -10"],
          ], "-10"),
          ex("For T′ = −0.05(T − 50), find the equilibrium temperature in °C.", [
            ["Set the rate to zero.","-0.05(T-50)=0\\Rightarrow T=50"],
            ["The temperature difference from the bath must vanish.","= 50"],
          ], "50 °C"),
        ],
        practice: [
          pr("For y′ = 3y and y = 4 at a point, what slope does the field show?", 12, "Use the current height in the rule.", "Multiply y by three. Answer: 12."),
          pr("For T′ = −0.1(T − 20), what is T′ when T = 80 °C, in °C/min if time is in minutes?", -6, "Use the excess above the surroundings.", "Multiply the temperature excess by −0.1. Answer: -6 °C/min."),
          pr("What is the order of x″ + 3x′ + 2x = 0? Give the derivative order as a number.", 2, "Find the highest derivative present.", "The second derivative is the highest. Answer: 2."),
          pr("The family y = Ce^(−t) must satisfy y(0) = 7. What value of C is required?", 7, "Evaluate the family at the initial time.", "At zero the exponential equals one, so C equals the starting value. Answer: 7."),
        ],
      },
      {
        title: "Separate the variables",
        minutes: 25,
        explain: [
          "Some rate laws can be rearranged so that the changing quantity is on one side and time on the other. Integrate both sides and use the initial value to determine the constant. Keep equilibrium solutions that might be lost when dividing by a quantity that can be zero.",
          "For cooling, separate the temperature excess from time. The resulting exponential approaches the surroundings without crossing them under this constant-bath model. It is an idealisation: a real quench can change its cooling behaviour as the surface changes.",
        ],
        formulas: [
          ["Separable form","y'=g(t)h(y)\\Rightarrow\\int\\frac{dy}{h(y)}=\\int g(t)\\,dt"],
          ["Constant-bath cooling","T=T_a+(T_0-T_a)e^{-kt}"],
        ],
        examples: [
          ex("A model gear cools with T = 50 + 800e^(−0.05t) °C, t in seconds. Temperature at t = 20 s, in °C?", [
            ["Insert time into the separated cooling solution.","50+800e^{-0.05(20)}"],
            ["Decay the excess and then add the bath temperature.","\\approx 344.3"],
          ], "≈ 344.3 °C"),
          ex("The same gear starts at 850 °C in a 50 °C bath with k = 0.05 per s. Time to 450 °C, in seconds?", [
            ["Form the ratio of initial excess to target excess.","\\ln(800/400)/0.05"],
            ["Take its natural logarithm and divide by k.","\\approx 13.863"],
          ], "≈ 13.863 s"),
        ],
        practice: [
          pr("For y′ = −y and y(0) = 10, find y(1).", 3.67879441171442, "Use the exponential family and the initial value.", "The solution is y = 10e^(−t). Answer: ≈ 3.6788."),
          pr("For y′ = 2t and y(0) = 3, find y(2).", 7, "Integrate the time-dependent rate directly.", "The solution is y = t² + 3. Answer: 7."),
          pr("For y′ = y² and y(0) = 1, find y(0.5), before its blow-up time.", 2, "Separate as dy/y² = dt.", "Integrating gives −1/y = t − 1, hence y = 1/(1 − t). Answer: 2."),
          pr("For T = 25 + 75e^(−0.1t) °C, t in minutes, how long until the temperature excess halves, in minutes?", 6.93147180559945, "Half the excess means half the exponential factor.", "Solve e^(−0.1t) = 1/2. Answer: ≈ 6.9315 min."),
        ],
      },
      {
        title: "Follow a slope with Euler steps",
        minutes: 25,
        explain: [
          "When a neat solution is unavailable, Euler’s method uses the current slope for one short straight step. Add step size times slope to the current value, then calculate the next slope at the new point.",
          "A large step may overshoot an equilibrium or even give an impossible physical value. Compare smaller steps at the same final time. For smooth problems and sufficiently small steps, halving the step size usually roughly halves the accumulated error over a fixed interval.",
        ],
        formulas: [
          ["Euler step","y_{new}=y+h f(t,y)"],
          ["Cooling excess step","T_{new}-T_a=(1-kh)(T-T_a)"],
        ],
        examples: [
          ex("For T′ = −0.05(T − 50), start at 850 °C. One Euler step with h = 10 s gives what temperature, in °C?", [
            ["Find the starting slope and hold it over the step.","850+10[-0.05(850-50)]"],
            ["Add step size times the starting cooling rate.","= 450"],
          ], "450 °C"),
          ex("Repeat Euler with h = 10 s for T′ = −0.05(T − 50), starting at 850 °C. Temperature after two steps, in °C?", [
            ["Each step multiplies the excess by the same factor.","50+800(1-0.05(10))^2"],
            ["Apply the cooling excess factor twice.","= 250"],
          ], "250 °C"),
        ],
        practice: [
          pr("For y′ = y, start at y = 2. One Euler step with h = 0.1 gives what y?", 2.2, "Use the current value as the slope.", "Add 0.1 times the starting value. Answer: 2.2."),
          pr("For y′ = −2y, start at y = 1. Two Euler steps of h = 0.1 give what y?", 0.64, "Recalculate the slope after the first step.", "Each step multiplies y by 0.8. Answer: 0.64."),
          pr("For T′ = −0.12(T − 50), start at 850 °C. One Euler step of 10 s gives what T, in °C?", -110, "A long step can overshoot the bath.", "Apply the step rule with the full initial excess. Answer: -110 °C."),
          pr("How many equal steps of h = 0.5 s reach t = 20 s from t = 0?", 40, "Divide elapsed time by step size.", "Use 20/0.5. Answer: 40."),
        ],
      },
      {
        title: "Driven responses and limited growth",
        minutes: 25,
        explain: [
          "A first-order linear equation y′ + ay = b with constant a has a steady value b/a when a is positive. Subtract that steady value and the remaining excess decays exponentially. An integrating factor e^(at) turns the left side into one product derivative.",
          "A different model limits growth by available capacity: y′ = ry(1 − y/K). Here K is a positive carrying capacity. For positive starting values below K, the amount rises towards K rather than growing forever; the rate is greatest halfway to K.",
        ],
        formulas: [
          ["Integrating factor","(e^{at}y)'=be^{at}"],
          ["Constant driven response","y=b/a+(y_0-b/a)e^{-at}"],
          ["Logistic growth","y'=ry(1-y/K)"],
        ],
        examples: [
          ex("For y′ + 2y = 6 and y(0) = 1, find y(1).", [
            ["Find the steady value, then decay the starting displacement from it.","3-2e^{-2}"],
            ["The solution is 3 − 2e^(−2t).","\\approx 2.7293"],
          ], "≈ 2.7293"),
          ex("A limited-growth model has r = 0.2 per h, K = 100 g and current amount y = 50 g. Growth rate in g/h?", [
            ["Put the current amount into the logistic rate.","0.2(50)(1-50/100)"],
            ["At half capacity, the remaining-capacity factor is one-half.","= 5"],
          ], "5 g/h"),
        ],
        practice: [
          pr("For y′ + 4y = 20, what is the steady value?", 5, "Set y′ to zero.", "Solve 4y = 20. Answer: 5."),
          pr("What is the integrating factor e^(2t) at t = 0?", 1, "Evaluate the factor at the initial time.", "A zero exponent gives one. Answer: 1."),
          pr("In a logistic model with r = 0.1 per h, K = 80 g and y = K, what is the growth rate in g/h?", 0, "The capacity factor vanishes at K.", "Use 1 − y/K = 0. Answer: 0 g/h.", {"tol":1e-12}),
          pr("A logistic model has capacity K = 200 g and positive r. At what amount is its growth rate largest, in grams?", 100, "Maximise the quadratic ry(1 − y/K).", "Its maximum lies halfway to capacity. Answer: 100 g."),
        ],
      },
    ],
  },

  'math-026': {
    predict: {
      q: "In the spring scene, the mass is pulled aside and released from rest. You want the quickest return without crossing its resting position. Should you turn the damping all the way up?",
      options: ["Yes: maximum damping is always quickest","No: no damping is quickest without crossing","No: aim for critical damping; too much makes the return creep","Every positive damping value gives the same motion"],
      answer: 2,
      reveal: "Critical damping is the boundary between ringing and creeping for this release. Light damping overshoots; increasing damping far beyond critical makes a slower return, even though it prevents oscillation.",
    },
    parts: [
      {
        title: "Mass and stiffness set the rhythm",
        minutes: 25,
        explain: [
          "Measure displacement from the equilibrium position of a mass on an ideal spring. The restoring force points back towards equilibrium and is proportional to displacement. With no damping or external drive, mass times acceleration balances this force.",
          "The natural angular frequency is √(k/m), measured in radians per second. Frequency in cycles per second divides by 2π; the period is the time for one full cycle. A stiffer spring speeds the motion, while a heavier mass slows it.",
        ],
        formulas: [
          ["Undamped spring","mx''+kx=0"],
          ["Rhythm","\\omega_n=\\sqrt{k/m},\\quad T=2\\pi/\\omega_n"],
        ],
        examples: [
          ex("An ideal rig has k = 400 N/m and m = 4 kg. Natural angular frequency in rad/s?", [
            ["Divide stiffness by mass before taking a square root.","\\sqrt{400/4}"],
            ["Use the natural angular frequency formula.","= 10"],
          ], "10 rad/s"),
          ex("An undamped oscillator has ω = π rad/s. Period in seconds?", [
            ["A full cycle spans 2π radians.","2\\pi/\\pi"],
            ["Divide a full turn by the angular frequency.","= 2"],
          ], "2 s"),
        ],
        practice: [
          pr("k = 100 N/m and m = 1 kg. Natural angular frequency in rad/s?", 10, "Use √(k/m).", "Take the square root after dividing. Answer: 10 rad/s."),
          pr("An oscillator has ω = 10 rad/s. Frequency in Hz?", 1.59154943091895, "Convert radians per second to cycles per second.", "Divide by 2π. Answer: ≈ 1.5915 Hz."),
          pr("With the same spring, mass is multiplied by four. New period divided by old period?", 2, "Period is proportional to √m at fixed stiffness.", "Take the square root of the mass multiplier. Answer: 2."),
          pr("x = 0.02 cos(5t) m for an undamped rig. What is its maximum speed in m/s?", 0.1, "Differentiate displacement; speed amplitude is Aω.", "Multiply displacement amplitude by angular frequency. Answer: 0.1 m/s."),
        ],
      },
      {
        title: "Damping removes motion",
        minutes: 25,
        explain: [
          "A viscous damper exerts a force opposite to velocity, proportional to that velocity. The equation becomes mx″ + cx′ + kx = 0. Here c has units N·s/m. Displacement is still measured from equilibrium.",
          "Compare c with the critical value 2√(mk). The damping ratio ζ is their ratio. Below one the released mass rings down; at one it returns critically; above one it creeps without oscillation. Zero damping gives no energy loss in this ideal model.",
        ],
        formulas: [
          ["Damped equation","mx''+cx'+kx=0"],
          ["Critical damping and ratio","c_c=2\\sqrt{mk},\\quad\\zeta=c/c_c"],
        ],
        examples: [
          ex("A rig has m = 4 kg and k = 100 N/m. Critical damping coefficient in N·s/m?", [
            ["Multiply mass and stiffness, take the square root, then double.","2\\sqrt{4(100)}"],
            ["This coefficient separates oscillating and non-oscillating releases.","= 40"],
          ], "40 N·s/m"),
          ex("For m = 4 kg, k = 100 N/m and c = 20 N·s/m, find ζ.", [
            ["Divide the actual coefficient by the critical coefficient.","20/(2\\sqrt{4(100)})"],
            ["Use the mass and stiffness of this rig.","= 0.5"],
          ], "0.5"),
        ],
        practice: [
          pr("A rig has c = 10 N·s/m and c_c = 20 N·s/m. Find ζ.", 0.5, "The ratio compares actual damping to critical damping.", "Divide ten by twenty. Answer: 0.5."),
          pr("A rig has c_c = 30 N·s/m. What c gives ζ = 1, in N·s/m?", 30, "Critical damping means actual equals critical.", "Multiply ζ by c_c. Answer: 30 N·s/m."),
          pr("A damper has c = 8 N·s/m and velocity x′ = 0.5 m/s. Damping force −cx′, in N?", -4, "The force opposes the signed velocity.", "Multiply velocity by minus the damping coefficient. Answer: -4 N."),
          pr("m = 1 kg, k = 16 N/m and c = 12 N·s/m. Find ζ.", 1.5, "Calculate the critical coefficient first.", "Divide twelve by twice √16. Answer: 1.5."),
        ],
      },
      {
        title: "Roots tell the motion",
        minutes: 25,
        explain: [
          "Try a solution x = e^(rt). Each derivative brings down a factor of r, turning the differential equation into the quadratic mr² + cr + k = 0. Its roots describe how the motion evolves.",
          "Two negative real roots give decaying exponentials. A repeated negative root needs a second solution te^(rt). A complex conjugate pair gives a decaying sine and cosine. Initial displacement and velocity determine the two constants.",
        ],
        formulas: [
          ["Characteristic roots","r=\\frac{-c\\pm\\sqrt{c^2-4mk}}{2m}"],
          ["Underdamped frequency","\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}"],
        ],
        examples: [
          ex("For x″ + 3x′ + 2x = 0, what is the larger characteristic root?", [
            ["Solve r² + 3r + 2 = 0.","(-3+\\sqrt{9-8})/2"],
            ["Choose the plus sign in the quadratic formula for the larger root.","= -1"],
          ], "-1"),
          ex("An underdamped rig has ω_n = 5 rad/s and ζ = 0.6. Find ω_d in rad/s.", [
            ["Damping reduces the oscillation frequency.","5\\sqrt{1-0.6^2}"],
            ["Multiply natural frequency by √(1 − ζ²).","= 4"],
          ], "4 rad/s"),
        ],
        practice: [
          pr("For x″ + 4x′ + 4x = 0, what is the repeated characteristic root?", -2, "The discriminant is zero.", "Use −c/(2m). Answer: -2."),
          pr("For x″ + 2x′ + 5x = 0, what is the real part of either characteristic root?", -1, "The real part is −c/(2m).", "The negative real part controls the exponential decay. Answer: -1."),
          pr("For a critically damped release x(t) = (1 + 2t)e^(−2t) m, find x(1) in m.", 0.406005849709838, "Evaluate the polynomial factor and exponential factor separately.", "Multiply the two factors at one second. Answer: ≈ 0.40601 m."),
          pr("An underdamped motion has amplitude envelope A(t) = 0.1e^(−0.5t) m. When does this envelope halve, in seconds?", 1.38629436111989, "Halve the envelope, rather than finding a zero crossing.", "Solve e^(−0.5t) = 1/2. Answer: ≈ 1.3863 s."),
        ],
      },
      {
        title: "Forcing, resonance and energy",
        minutes: 25,
        explain: [
          "A repeating external force drives a vibration. Its steady response depends on drive frequency as well as mass, stiffness and damping. Near the natural frequency, a lightly damped system can have a large response: resonance.",
          "The ideal undamped resonant response grows without a steady amplitude. Positive damping removes energy and limits the steady response. This matters when designing test rigs and supports for machines: reducing a large vibration can protect specimens and improve measurement quality.",
        ],
        formulas: [
          ["Driven equation","mx''+cx'+kx=F_0\\cos(\\omega t)"],
          ["Steady amplitude for c > 0","A=\\frac{F_0}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}"],
          ["Mechanical energy","E=\\tfrac12m(x')^2+\\tfrac12kx^2"],
        ],
        examples: [
          ex("A driven rig has m = 1 kg, k = 100 N/m, c = 2 N·s/m, F₀ = 10 N and drive ω = 10 rad/s. Steady amplitude in m?", [
            ["At this frequency, the stiffness and inertia terms cancel.","10/\\sqrt{(100-100)^2+20^2}"],
            ["Only the damping term remains in the denominator.","= 0.5"],
          ], "0.5 m"),
          ex("A spring has k = 200 N/m and is held at x = 0.1 m with zero speed. Mechanical energy in J?", [
            ["With no speed, only the spring term contributes.","\\tfrac12(200)(0.1)^2"],
            ["Use half k times displacement squared.","= 1"],
          ], "1 J"),
        ],
        practice: [
          pr("A mass of two kg moves at three m/s at zero spring displacement. Mechanical energy in J?", 9, "At zero displacement, only kinetic energy contributes.", "Use half mass times speed squared. Answer: 9 J."),
          pr("At drive ω = ω_n = 10 rad/s, F₀ = 10 N and c = 4 N·s/m, what is the steady amplitude in m?", 0.25, "At the undamped natural frequency, amplitude is F₀/(cω).", "Divide force amplitude by damping coefficient times frequency. Answer: 0.25 m."),
          pr("For a viscous damper with c = 5 N·s/m and instantaneous speed two m/s, what is the positive rate of energy dissipation in W?", 20, "Dissipated power is c times speed squared.", "Multiply the damping coefficient by the square of speed. Answer: 20 W."),
          pr("At drive ω = ω_n with fixed positive F₀ and ω_n, doubling c changes steady amplitude by what ratio new/old?", 0.5, "The damping coefficient is in the denominator.", "At this specified frequency, amplitude varies inversely with c. Answer: 0.5."),
        ],
      },
    ],
  },

  'math-027': {
    predict: {
      q: "In the moving-grid scene, choose the matrix whose rows are (1, 2) and (0.5, 1). All four entries are non-zero. Can it still squash every square flat?",
      options: ["No: only a matrix of zeros can do that","No: positive entries always preserve area","Yes: its two columns point along the same line","Yes: but only the square at the origin flattens"],
      answer: 2,
      reveal: "The second column is twice the first, so both basic directions land on one line. Its determinant is zero, and every region loses its area even though the matrix is not zero.",
    },
    parts: [
      {
        title: "Columns move the basic arrows",
        minutes: 25,
        explain: [
          "A matrix is a rectangle of numbers in rows and columns. A two-by-two matrix acts on a point by multiplying each row by its coordinates and adding. The result is another point in the plane.",
          "The first column tells where the unit horizontal arrow lands, and the second tells where the unit vertical arrow lands. Other points follow by the same combinations. This can stretch, shear, rotate or reflect a crystal’s coordinate directions.",
        ],
        formulas: [
          ["Move a point","\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}ax+by\\\\cx+dy\\end{pmatrix}"],
        ],
        examples: [
          ex("A matrix has rows (1, 2) and (3, 4). It acts on (1, 1). What is the first coordinate of the result?", [
            ["Multiply the first row by the point coordinates.","1(1)+2(1)"],
            ["Add the two first-row contributions.","= 3"],
          ], "3"),
          ex("A matrix has rows (0, −1) and (1, 0). It acts on (2, 3). What is the second coordinate?", [
            ["Use the second row to find the second coordinate.","1(2)+0(3)"],
            ["This quarter-turn sends the point to (−3, 2).","= 2"],
          ], "2"),
        ],
        practice: [
          pr("A matrix has rows (2, 0) and (0, 3). It acts on (1, 2). What is the first coordinate?", 2, "Use the first row.", "Compute 2(1) + 0(2). Answer: 2."),
          pr("A matrix has rows (1, 1) and (0, 1). It acts on (2, 3). What is the first coordinate?", 5, "A shear adds the vertical coordinate to the horizontal one.", "Compute 2 + 3. Answer: 5."),
          pr("A matrix has rows (2, 3) and (4, 5). What is the second coordinate of the image of (1, 0)?", 4, "The image of the unit horizontal arrow is the first column.", "Read the lower entry of that column. Answer: 4."),
          pr("A crystal direction has planar coordinates (3, −2). The matrix has rows (0, −1) and (1, 0). What is the first coordinate after this rotation?", 2, "Apply the first row, keeping the minus signs.", "The first coordinate becomes minus the old second coordinate. Answer: 2."),
        ],
      },
      {
        title: "Area, orientation and collapse",
        minutes: 25,
        explain: [
          "The determinant of a two-by-two matrix is ad − bc. Its absolute value tells the factor by which every area changes. A negative sign means orientation reverses, like a mirror flip.",
          "A zero determinant means the two column directions are dependent. The plane collapses onto a line, or onto a point if the whole matrix is zero. Information about the original position is lost, so the move cannot be uniquely undone.",
        ],
        formulas: [
          ["Determinant","\\det A=ad-bc"],
          ["Area scale","\\text{new area}=|\\det A|\\,\\text{old area}"],
        ],
        examples: [
          ex("A matrix has rows (2, 0) and (0, 3). What is its determinant?", [
            ["Multiply down the main diagonal and subtract the other product.","2(3)-0(0)"],
            ["This positive determinant gives the area multiplier.","= 6"],
          ], "6"),
          ex("A matrix has rows (1, 2) and (0.5, 1). What is its determinant?", [
            ["Compare the two diagonal products.","1(1)-2(0.5)"],
            ["Equal products mean the transformed square has no area.","= 0"],
          ], "0"),
        ],
        practice: [
          pr("A matrix has rows (1, 0) and (0, −1). What is its determinant?", -1, "A reflection reverses orientation.", "Compute the main product minus the other product. Answer: -1."),
          pr("An original region has area five cm². A matrix has determinant −3. New area in cm²?", 15, "Area uses the absolute determinant.", "Multiply the original area by three. Answer: 15 cm²."),
          pr("A matrix has rows (1, 2) and (3, 4). What is its determinant?", -2, "Order matters in ad − bc.", "Compute four minus six. Answer: -2."),
          pr("A matrix has rows (1, 2) and (2, d). What value of d collapses the plane onto a line?", 4, "Set the determinant to zero.", "Solve d − 4 = 0. Answer: 4."),
        ],
      },
      {
        title: "Solve simultaneous balances",
        minutes: 25,
        explain: [
          "A system of linear equations describes quantities that must satisfy several balances at once. Arrange their coefficients as a matrix. Subtracting a multiple of one equation from another can remove an unknown without changing the solutions.",
          "A non-zero determinant gives a unique solution for a square two-variable system. The inverse matrix gives the same solution by undoing the move. With determinant zero, check the equations: they may contradict one another or repeat the same constraint.",
        ],
        formulas: [
          ["System and inverse","A\\mathbf{x}=\\mathbf{b},\\quad\\mathbf{x}=A^{-1}\\mathbf{b}"],
          ["Two-by-two inverse","A^{-1}=\\frac1{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}\\quad(ad-bc\\ne0)"],
        ],
        examples: [
          ex("Blend scrap A with 10% zinc and scrap B with 30% zinc to make 100 kg containing 18 kg zinc. Required mass of A in kg?", [
            ["Use x + y = 100 to remove y from the zinc balance.","(30-18)/(0.3-0.1)"],
            ["Solve 0.1x + 0.3(100 − x) = 18.","= 60"],
          ], "60 kg"),
          ex("Solve x + y = 5 and 2x + y = 8. What is x?", [
            ["Subtract the first equation from the second.","8-5"],
            ["The y terms cancel.","= 3"],
          ], "3"),
        ],
        practice: [
          pr("Solve x + y = 7 and x − y = 1. What is x?", 4, "Add the equations to remove y.", "Divide the resulting 2x = 8 by two. Answer: 4."),
          pr("Solve 2x + y = 9 and x + y = 6. What is y?", 3, "Subtract to find x first.", "The difference gives x = 3; substitute into x + y = 6. Answer: 3."),
          pr("A diagonal matrix has rows (2, 0) and (0, 4). What is the bottom-right entry of its inverse?", 0.25, "Each non-zero diagonal stretch is undone by its reciprocal.", "Use the reciprocal of four. Answer: 0.25."),
          pr("A blend totals 50 kg using A at 20% zinc and B at 40% zinc. It must contain 14 kg zinc. Required B mass in kg?", 20, "Let A be the total minus B.", "Solve 0.2(50 − B) + 0.4B = 14. Answer: 20 kg."),
        ],
      },
      {
        title: "Compose moves and find special directions",
        minutes: 25,
        explain: [
          "Matrix multiplication combines moves. In AB, apply B first and then A. Order usually matters: stretching and then rotating can give a different point from rotating and then stretching.",
          "An eigenvector is a non-zero direction that remains on its own line after a move. Its eigenvalue is the signed stretch along that direction. To find possible eigenvalues λ, solve det(A − λI) = 0, where I leaves every point unchanged. Such directions help describe coupled motions and material responses.",
        ],
        formulas: [
          ["Composition","(AB)\\mathbf{x}=A(B\\mathbf{x})"],
          ["Special direction","A\\mathbf{v}=\\lambda\\mathbf{v},\\quad\\mathbf{v}\\ne0"],
          ["Eigenvalue condition","\\det(A-\\lambda I)=0"],
        ],
        examples: [
          ex("First stretch horizontally by two, then rotate by 90° anticlockwise. Starting at (1, 0), what is the final second coordinate?", [
            ["Track the point after each move.","2(1)"],
            ["The stretch gives (2, 0), then the rotation gives (0, 2).","= 2"],
          ], "2"),
          ex("A matrix has rows (2, 0) and (0, 3). What eigenvalue belongs to direction (0, 1)?", [
            ["Multiply the matrix by that non-zero direction.","A(0,1)=(0,3)=3(0,1)"],
            ["The result is three times the original direction.","= 3"],
          ], "3"),
        ],
        practice: [
          pr("First rotate (1, 0) by 90° anticlockwise, then stretch horizontally by two. Final second coordinate?", 1, "Apply the rotation before the stretch.", "The intermediate point is (0, 1), so the horizontal stretch leaves it there. Answer: 1."),
          pr("A matrix has rows (4, 0) and (0, 1). What eigenvalue belongs to direction (1, 0)?", 4, "Apply the matrix to the horizontal direction.", "The image is (4, 0). Answer: 4."),
          pr("A matrix has rows (2, 1) and (1, 2). What eigenvalue belongs to direction (1, 1)?", 3, "Check that both coordinates get the same multiplier.", "The image is (3, 3), which is three times the original direction. Answer: 3."),
          pr("For a matrix with rows (2, 1) and (1, 2), find the smaller eigenvalue.", 1, "Expand det(A − λI) to λ² − 4λ + 3.", "Solve the quadratic and choose its smaller root. Answer: 1."),
        ],
      },
    ],
  },

};
