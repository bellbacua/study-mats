// Computer Science program, Discrete Structures (cs-111 to cs-116): each class
// split into three parts. Every number was worked out and checked by script.

const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const CS_DISC = {
  'cs-111': {
    predict: {
      q: '“If it rains, I bring an umbrella.” It does NOT rain, and I bring no umbrella. Did I break my promise?',
      options: ['No: the promise only covers rainy days', 'Yes: I brought no umbrella', 'It is neither kept nor broken', 'Only if it rains later'],
      answer: 0,
      reveal: 'An “if … then” sentence is false only in one case: the “if” part is true and the “then” part is false. On a dry day the promise is not tested, so in logic it counts as true.',
    },
    parts: [
      {
        title: 'Propositions and the three basic connectives',
        minutes: 20,
        explain: [
          'A proposition is a sentence that is either true or false: “7 is prime” (true), “Davao is in Luzon” (false). Questions and commands are not propositions.',
          'AND (∧) is true only when both parts are true. OR (∨) is true when at least one is true; in logic “or” includes the case where both are true. NOT (¬) flips true and false.',
          'Python writes these as and, or, not. Every if test you wrote in cs-102 is a proposition built this way.',
        ],
        formulas: [['Connectives', 'p \\land q,\\quad p \\lor q,\\quad \\lnot p']],
        code: [['Logic in Python', 'p = True\nq = False\nprint(p and q)   # False\nprint(p or q)    # True\nprint(not p)     # False']],
        examples: [
          ex('p: “4 is even” (true). q: “4 > 9” (false). Is p ∧ q true?', [['AND needs both.', 'p = T,\\; q = F'], ['One is false.', 'p \\land q = F']], 'False'),
          ex('Same p and q. Is ¬q ∨ q true?', [['¬q is true.', '\\lnot q = T'], ['OR needs one true.', 'T \\lor F = T']], 'True (in fact it is always true)'),
        ],
        practice: [
          ch('Which of these is a proposition?', ['Manila is the capital of the Philippines.', 'Close the door.', 'Is it raining?', 'Wow!'], 'Can it be true or false?', 'Only a statement can be true or false.'),
          pr('p true, q true, r false. Is (p ∧ q) ∨ r true? (1 = true, 0 = false)', 1, 'Work out the brackets first.', 'p ∧ q = T, and T ∨ F = T: 1.'),
          pr('Same values. Is p ∧ (q ∧ r) true? (1 or 0)', 0, 'r is false.', 'q ∧ r = F, so the whole thing is F: 0.'),
          pr('What does Python print for not (3 > 5)? (1 = True, 0 = False)', 1, '3 > 5 is false.', 'not False = True: 1.', { code: 'print(not (3 > 5))' }),
        ],
      },
      {
        title: 'Truth tables',
        minutes: 20,
        explain: [
          'A truth table lists every combination of true and false for the simple parts, one combination per row, and works out the whole expression in each row.',
          'With n simple parts there are 2ⁿ rows, because each part doubles the cases. Two parts: 4 rows. Three: 8. Ten: 1,024.',
          'Two expressions are equivalent if their columns match in every row. De Morgan’s laws are the famous example: ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.',
        ],
        formulas: [['Rows', '2^n'], ['De Morgan', '\\lnot(p\\land q) \\equiv \\lnot p \\lor \\lnot q']],
        examples: [
          ex('How many rows does a truth table for p, q, r, s need?', [['Four parts.', 'n = 4'], ['Each doubles.', '2^4 = 16']], '16'),
          ex('In how many of the 4 rows is p ∨ q true?', [['List: TT, TF, FT, FF.', ''], ['Only FF fails.', '4 - 1 = 3']], '3'),
        ],
        practice: [
          pr('How many rows for 5 propositions?', 32, '2⁵.', '32.'),
          pr('In how many of the 4 rows is p ∧ q true?', 1, 'Both must be true.', 'Only TT: 1.'),
          pr('In how many of the 8 rows (p, q, r) is p ∧ q ∧ r false?', 7, 'It is true in just one row.', '8 − 1 = 7.'),
          pr('In how many of the 4 rows is p XOR q (exactly one true) true?', 2, 'TF and FT.', '2.'),
        ],
      },
      {
        title: 'If … then, and valid arguments',
        minutes: 25,
        explain: [
          'p → q (“if p then q”) is false only when p is true and q is false. It is equivalent to ¬p ∨ q. The converse q → p is a different statement: “if the street is wet, it rained” can fail even when “if it rained, the street is wet” holds.',
          'An argument is valid if no row of the truth table makes all the premises true and the conclusion false. Modus ponens (p → q, p, so q) is valid. “Affirming the consequent” (p → q, q, so p) is not.',
          'A statement true in every row is a tautology; one false in every row is a contradiction. Computer programs that check chip designs and software do this on a massive scale.',
        ],
        formulas: [['Implication', 'p \\to q \\equiv \\lnot p \\lor q']],
        examples: [
          ex('p false, q false. Is p → q true?', [['It is ¬p ∨ q.', '\\lnot p = T'], ['OR with a true part.', 'T']], 'True'),
          ex('Is p ∨ ¬p a tautology?', [['p = T: T ∨ F = T.', ''], ['p = F: F ∨ T = T.', '']], 'Yes: true in both rows'),
        ],
        practice: [
          pr('In how many of the 4 rows is p → q true?', 3, 'It fails only for p = T, q = F.', '3.'),
          pr('p true, q false. Value of q → p? (1 or 0)', 1, 'Now q is the “if” part.', 'q is false, so q → p is true: 1.'),
          ch('Which argument is valid?', ['If p then q; p; so q', 'If p then q; q; so p', 'If p then q; not p; so not q', 'p or q; p; so not q'], 'Look for a row where the premises are true and the conclusion false.', 'Modus ponens has no such row. The others each have a counterexample.'),
          pr('How many rows of p ∧ ¬p are true?', 0, 'p cannot be both.', '0: a contradiction.'),
        ],
      },
    ],
  },

  'cs-112': {
    predict: {
      q: '20 students: 12 play basketball, 10 play volleyball, 5 play both. How many play at least one?',
      options: ['17', '22', '20', '27'],
      answer: 0,
      reveal: '12 + 10 counts the 5 who play both twice. Subtract them once: 12 + 10 − 5 = 17. The Venn diagram shows why.',
    },
    parts: [
      {
        title: 'Sets and their notation',
        minutes: 20,
        explain: [
          'A set is a collection of distinct things, its elements. We write them in braces: {2, 3, 5, 7}. x ∈ A means x is in A. Order and repeats do not matter.',
          'The empty set ∅ has no elements. A ⊆ B (A is a subset of B) means every element of A is also in B. |A| is the number of elements.',
          'A set with n elements has 2ⁿ subsets: for each element, choose in or out. That links sets to the truth-table count of cs-111.',
        ],
        formulas: [['Number of subsets', '|\\mathcal P(A)| = 2^{|A|}']],
        code: [['Sets in Python', 'A = {2, 3, 5, 7}\nprint(3 in A)      # True\nprint(len(A))      # 4\nprint({1, 1, 2})   # {1, 2}']],
        examples: [
          ex('List all subsets of {a, b}.', [['Choose in or out for each.', ''], ['Four choices.', '\\emptyset, \\{a\\}, \\{b\\}, \\{a,b\\}']], '4 subsets'),
          ex('|{x : x is a whole number, 1 ≤ x ≤ 20, x divisible by 3}| = ?', [['List them.', '3, 6, 9, 12, 15, 18'], ['Count.', '6']], '6'),
        ],
        practice: [
          pr('How many elements does {3, 1, 3, 2, 1} have?', 3, 'Repeats count once.', '{1, 2, 3}: 3.'),
          pr('How many subsets does a 5-element set have?', 32, '2⁵.', '32.'),
          pr('How many subsets of {1, 2, 3, 4} contain the element 1?', 8, 'Fix 1 in; choose freely for the other 3.', '2³ = 8.'),
          pr('How many whole numbers from 1 to 50 are multiples of 7?', 7, '7, 14, …', '7, 14, 21, 28, 35, 42, 49: 7.'),
        ],
      },
      {
        title: 'Union, intersection, difference, complement',
        minutes: 20,
        explain: [
          'A ∪ B: everything in A or B. A ∩ B: everything in both. A − B: in A but not in B. The complement of A, within a universe U, is everything in U that is not in A.',
          'Inclusion–exclusion counts a union without double-counting: |A ∪ B| = |A| + |B| − |A ∩ B|.',
          'These are the same as OR, AND and NOT from logic, applied to membership. A search for “steel AND corrosion” is an intersection.',
        ],
        formulas: [['Inclusion–exclusion', '|A \\cup B| = |A| + |B| - |A \\cap B|']],
        code: [['Python', 'A = {1, 2, 3, 5, 8}\nB = {2, 3, 4, 6, 8, 9}\nprint(A | B)  # union\nprint(A & B)  # intersection\nprint(A - B)  # {1, 5}']],
        examples: [
          ex('A = {1, 2, 3, 5, 8}, B = {2, 3, 4, 6, 8, 9}. |A ∪ B|?', [['|A| + |B| = 11.', ''], ['Shared: 2, 3, 8.', '11 - 3 = 8']], '8'),
          ex('In a class of 40, 25 take chemistry, 18 take physics, 10 take both. How many take neither?', [['At least one.', '25 + 18 - 10 = 33'], ['Neither.', '40 - 33 = 7']], '7'),
        ],
        practice: [
          pr('|A| = 15, |B| = 9, |A ∩ B| = 4. |A ∪ B|?', 20, '15 + 9 − 4.', '20.'),
          pr('|A ∪ B| = 30, |A| = 18, |B| = 20. |A ∩ B|?', 8, 'Rearrange the rule.', '18 + 20 − 30 = 8.'),
          pr('U = {1, …, 10}, A = the even numbers. How many elements in the complement of A?', 5, 'The odd numbers.', '5.'),
          pr('A = {1, 2, 3, 4}, B = {3, 4, 5}. |A − B|?', 2, 'Remove 3 and 4.', '{1, 2}: 2.'),
        ],
      },
      {
        title: 'Relations and functions',
        minutes: 20,
        explain: [
          'A relation pairs elements of one set with elements of another: “student s takes course c”. A function is a relation where every input has exactly one output.',
          'A function is one-to-one if different inputs always give different outputs, and onto if every possible output is used. If both, it pairs the two sets perfectly, so they have the same size.',
          'A Python dictionary is a function from its keys to its values. A table of materials and their melting points is a function; materials to “contains iron?” is too.',
        ],
        formulas: [['Number of functions', '|A| = m,\\; |B| = n \\;\\Rightarrow\\; n^m \\text{ functions } A \\to B']],
        examples: [
          ex('How many functions from {a, b, c} to {0, 1}?', [['Each input picks one of 2 outputs.', '2 \\times 2 \\times 2'], ['Total.', '8']], '8'),
          ex('f(x) = x² on {−2, −1, 0, 1, 2}. Is it one-to-one?', [['f(−2) = f(2) = 4.', ''], ['Two inputs share an output.', '']], 'No'),
        ],
        practice: [
          pr('How many functions from a 2-element set to a 3-element set?', 9, '3 choices for each of 2 inputs.', '3² = 9.'),
          pr('How many one-to-one functions from {a, b} to {1, 2, 3}?', 6, 'a has 3 choices, then b has 2.', '3 × 2 = 6.'),
          pr('f(x) = 2x + 1 on {0, 1, 2, 3}. What is the largest output?', 7, 'f(3).', '7.'),
          ch('Which is a function from people to numbers?', ['Each person → their age in years', 'Each person → the ages of their friends', 'Each age → a person of that age', 'Each person → any number they like'], 'Exactly one output per person.', 'Age gives exactly one number per person.'),
        ],
      },
    ],
  },

  'cs-113': {
    predict: {
      q: 'Without adding them one by one, what is 1 + 2 + 3 + … + 100?',
      options: ['5,050', '5,000', '10,100', '4,950'],
      answer: 0,
      reveal: 'Pair the ends: 1 + 100, 2 + 99, … gives 50 pairs of 101, so 5,050. Two staircases make a 100 × 101 rectangle, and halving it gives the same.',
    },
    parts: [
      {
        title: 'The two steps of induction',
        minutes: 20,
        explain: [
          'To prove a statement P(n) for every whole number n ≥ 1: (1) base case, show P(1); (2) inductive step, assume P(n) for some n and use it to show P(n + 1).',
          'The assumption in step 2 is called the inductive hypothesis. It is not circular: we only assume it for one n, to show the next follows.',
          'Like dominoes: the first falls, and each one knocks the next, so all fall.',
        ],
        formulas: [['The principle', 'P(1) \\;\\land\\; \\big(P(n) \\Rightarrow P(n+1)\\big) \\;\\Rightarrow\\; P(n) \\text{ for all } n \\ge 1']],
        examples: [
          ex('Prove 1 + 3 + … + (2n − 1) = n². Base case?', [['n = 1.', '1 = 1^2']], 'True'),
          ex('Inductive step for the same statement.', [['Assume the sum to n is n².', ''], ['Add the next odd number, 2n + 1.', 'n^2 + 2n + 1 = (n+1)^2']], 'So it holds for n + 1'),
        ],
        practice: [
          pr('Sum of the first 12 odd numbers?', 144, 'n².', '144.'),
          pr('In the step above, which number do we add to go from n² to (n + 1)² when n = 7?', 15, '2n + 1.', '15.'),
          ch('In an induction proof, which do you assume?', ['P(n) for one n, to prove P(n + 1)', 'P(n) for every n', 'P(n + 1)', 'Nothing at all'], 'The inductive hypothesis.', 'Assume the case n, then prove the next.'),
          pr('If P(1) is false but the inductive step holds, for how many n ≥ 1 is P(n) proved?', 0, 'The first domino never falls.', '0: no base case, no proof.'),
        ],
      },
      {
        title: 'Sum formulas',
        minutes: 20,
        explain: [
          'The triangular numbers 1, 3, 6, 10, … are 1 + 2 + … + n = n(n + 1)/2. Pairing the ends, or fitting two staircases into a rectangle, shows why; induction proves it for every n.',
          'Inductive step: if 1 + … + n = n(n + 1)/2, then adding n + 1 gives n(n + 1)/2 + (n + 1) = (n + 1)(n + 2)/2.',
          'The same method proves 1 + 2 + 4 + … + 2ⁿ⁻¹ = 2ⁿ − 1, the reason an n-bit counter (cs-122) can hold 0 to 2ⁿ − 1.',
        ],
        formulas: [['Triangular numbers', '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}'], ['Powers of two', '\\sum_{i=0}^{n-1} 2^i = 2^n - 1']],
        examples: [
          ex('1 + 2 + … + 50?', [['Formula.', '50 \\times 51 / 2'], ['Work it out.', '1275']], '1,275'),
          ex('1 + 2 + 4 + … + 128?', [['That is 2⁰ to 2⁷: n = 8.', '2^8 - 1'], ['Work it out.', '255']], '255'),
        ],
        practice: [
          pr('1 + 2 + … + 30?', 465, '30 × 31 / 2.', '465.'),
          pr('11 + 12 + … + 20?', 155, 'Sum to 20 minus sum to 10.', '210 − 55 = 155.'),
          pr('1 + 2 + 4 + … + 512?', 1023, '2⁰ to 2⁹.', '2¹⁰ − 1 = 1,023.'),
          pr('A loop runs i = 1 to n and does i steps each time. How many steps for n = 20?', 210, 'Triangular number.', '20 × 21 / 2 = 210.', { code: 'steps = 0\nfor i in range(1, 21):\n    steps = steps + i\nprint(steps)' }),
        ],
      },
      {
        title: 'Induction for programs and inequalities',
        minutes: 20,
        explain: [
          'A loop invariant is a statement that is true before the loop and stays true after each pass: the same two steps as induction. When the loop ends, the invariant tells you what the loop computed.',
          'Induction also proves inequalities, such as 2ⁿ > n for all n ≥ 1, and facts about recursion (cs-131).',
          'Strong induction lets you assume all earlier cases, not just the one before. It proves, for example, that every whole number above 1 is a product of primes.',
        ],
        code: [['A loop invariant', 'total = 0\nfor i in range(1, n + 1):\n    total = total + i\n    # invariant: total == i * (i + 1) // 2']],
        examples: [
          ex('Show 2ⁿ > n for n ≥ 1. Base and step?', [['Base: 2¹ = 2 > 1.', ''], ['Step: 2ⁿ⁺¹ = 2·2ⁿ > 2n ≥ n + 1.', '']], 'Holds for all n ≥ 1'),
          ex('In the loop above, what is total after the pass with i = 6?', [['Invariant.', '6 \\times 7 / 2'], ['Work it out.', '21']], '21'),
        ],
        practice: [
          pr('Invariant total == i(i + 1)/2. Value after i = 9?', 45, '9 × 10 / 2.', '45.'),
          pr('Smallest n ≥ 1 for which 2ⁿ > n² fails? (Check n = 1, 2, 3, …)', 2, '2² = 4 vs 2² = 4.', 'n = 2: 4 > 4 is false.'),
          pr('From n = 5 on, 2ⁿ > n². What is 2⁵ − 5²?', 7, '32 − 25.', '7.'),
          pr('60 as a product of primes: what is the largest prime factor?', 5, '60 = 2 × 2 × 3 × 5.', '5.'),
        ],
      },
    ],
  },

  'cs-114': {
    predict: {
      q: 'Which gives more possible passwords: 12 lowercase letters, or 8 characters from 70 options?',
      options: ['12 lowercase letters', '8 characters from 70', 'They are about equal', 'Impossible to compare'],
      answer: 0,
      reveal: '26¹² ≈ 9.5 × 10¹⁶, while 70⁸ ≈ 5.8 × 10¹⁴, over 150 times fewer. Length multiplies the count much faster than a bigger alphabet.',
    },
    parts: [
      {
        title: 'The multiplication rule',
        minutes: 20,
        explain: [
          'If a task is done in steps, with a ways for the first and b for the second whatever the first was, there are a × b ways in total.',
          'Choices that are repeated multiply: a PIN of 4 digits has 10⁴ = 10,000 possibilities; an 8-bit byte has 2⁸ = 256 values.',
          'If the choices are alternatives (do one OR the other), add instead: the sum rule.',
        ],
        formulas: [['Product rule', 'a \\times b'], ['Sequences of length k from n symbols', 'n^k']],
        examples: [
          ex('3 shirts and 4 pairs of trousers. How many outfits?', [['Multiply.', '3 \\times 4']], '12'),
          ex('A plate has 3 letters then 4 digits. How many plates?', [['Letters.', '26^3 = 17\\,576'], ['Digits.', '10^4'], ['Multiply.', '175\\,760\\,000']], '175,760,000'),
        ],
        practice: [
          pr('How many 3-digit codes (000 to 999)?', 1000, '10³.', '1,000.'),
          pr('How many values can 16 bits hold?', 65536, '2¹⁶.', '65,536.'),
          pr('A menu has 4 soups, 6 mains and 3 desserts. How many meals of one of each?', 72, 'Multiply.', '72.'),
          pr('You can take a jeep (5 routes) OR a bus (3 routes). How many ways?', 8, 'Alternatives add.', '8.'),
        ],
      },
      {
        title: 'Arrangements: factorials',
        minutes: 20,
        explain: [
          'To put n different things in order: n choices for first place, n − 1 for second, and so on. That is n! (“n factorial”).',
          'To put only k of the n in order: n × (n − 1) × … × (n − k + 1) = n!/(n − k)!.',
          'Factorials grow very fast: 10! = 3,628,800 and 20! is about 2.4 × 10¹⁸. Trying every order of 20 cities is hopeless (cs-138).',
        ],
        formulas: [['Arrangements', 'n!'], ['k of n in order', 'P(n,k) = \\frac{n!}{(n-k)!}']],
        examples: [
          ex('Ways to arrange the letters of MATH?', [['4 different letters.', '4! = 24']], '24'),
          ex('Gold, silver, bronze among 8 runners?', [['8 × 7 × 6.', '336']], '336'),
        ],
        practice: [
          pr('5! = ?', 120, '5 × 4 × 3 × 2 × 1.', '120.'),
          pr('How many ways to seat 6 people in a row?', 720, '6!', '720.'),
          pr('President and secretary from 10 members (different people)?', 90, '10 × 9.', '90.'),
          pr('10! / 8! = ?', 90, 'Most factors cancel.', '10 × 9 = 90.'),
        ],
      },
      {
        title: 'Choices: binomial coefficients',
        minutes: 25,
        explain: [
          'When order does not matter, divide by the k! orders of the chosen items: C(n, k) = n!/(k!(n − k)!). Read it “n choose k”.',
          'C(n, k) = C(n, n − k): choosing what to take is the same as choosing what to leave. And C(n, k) = C(n − 1, k − 1) + C(n − 1, k), the rule that builds Pascal’s triangle.',
          'The entries of row n add up to 2ⁿ, the number of all subsets.',
        ],
        formulas: [['Binomial coefficient', '\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}'], ['Pascal’s rule', '\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}']],
        examples: [
          ex('A committee of 3 from 7 people?', [['7 × 6 × 5 in order = 210.', ''], ['Divide by 3! = 6.', '35']], '35'),
          ex('How many 5-card hands from 52 cards?', [['C(52, 5).', '\\frac{52\\cdot51\\cdot50\\cdot49\\cdot48}{120}'], ['Work it out.', '2\\,598\\,960']], '2,598,960'),
        ],
        practice: [
          pr('C(6, 2) = ?', 15, '6 × 5 / 2.', '15.'),
          pr('C(10, 3) = ?', 120, '10 × 9 × 8 / 6.', '120.'),
          pr('C(9, 7) = ?', 36, 'Same as C(9, 2).', '36.'),
          pr('Lotto 6/42: how many tickets (choices of 6 numbers from 42)?', 5245786, 'C(42, 6).', '5,245,786.'),
          pr('Sum of row 7 of Pascal’s triangle?', 128, '2⁷.', '128.'),
        ],
      },
    ],
  },

  'cs-115': {
    predict: {
      q: 'Königsberg had 7 bridges joining 4 land masses. Can a walk cross each bridge exactly once?',
      options: ['No', 'Yes, starting on the island', 'Yes, starting on a bank', 'Only on certain days'],
      answer: 0,
      reveal: 'Every land mass had an odd number of bridges. A walk can have only two odd places, its start and its end, so no such walk exists. Euler proved it in 1736.',
    },
    parts: [
      {
        title: 'Vertices, edges and degrees',
        minutes: 20,
        explain: [
          'A graph has vertices (dots) and edges (lines between pairs of vertices). The degree of a vertex is the number of edges that touch it.',
          'Handshake lemma: adding up all the degrees counts each edge twice, once from each end. So the total degree is 2 × (number of edges), always even.',
          'It follows that the number of odd-degree vertices is always even. Road maps, power grids, social networks and the atoms and bonds of a molecule are all graphs.',
        ],
        formulas: [['Handshake lemma', '\\sum_{v} \\deg(v) = 2|E|']],
        examples: [
          ex('A triangle: 3 vertices, 3 edges. Degrees?', [['Each vertex touches 2 edges.', '2, 2, 2'], ['Check.', '6 = 2 \\times 3']], 'All 2'),
          ex('5 people each shake hands with every other once. How many handshakes?', [['Each has degree 4.', '5 \\times 4 = 20'], ['Halve.', '10']], '10'),
        ],
        practice: [
          pr('Degrees 3, 3, 2, 2, 2. How many edges?', 6, 'Sum and halve.', '12 / 2 = 6.'),
          pr('10 people all shake hands once with each other. How many handshakes?', 45, 'C(10, 2).', '45.'),
          pr('A graph has 7 edges. Sum of degrees?', 14, '2 × 7.', '14.'),
          pr('Could a graph have degrees 3, 3, 3? (1 = yes, 0 = no)', 0, 'Is the total even?', '9 is odd: 0.'),
        ],
      },
      {
        title: 'Euler paths and circuits',
        minutes: 20,
        explain: [
          'An Euler path uses every edge exactly once. An Euler circuit does so and ends where it started. (The graph must be connected.)',
          'Every time a walk passes through a vertex it uses two edges, one in and one out. So all in-between vertices need even degree.',
          'Euler’s rule: a circuit exists exactly when every vertex has even degree; a path (not a circuit) exactly when exactly two vertices are odd, and it must start at one and end at the other.',
        ],
        formulas: [['Euler’s rule', '\\#\\text{odd} = 0 \\Rightarrow \\text{circuit};\\quad \\#\\text{odd} = 2 \\Rightarrow \\text{path}']],
        examples: [
          ex('Königsberg degrees 5, 3, 3, 3. Euler path?', [['Odd vertices.', '4'], ['More than 2.', '']], 'No'),
          ex('A square with one diagonal. Degrees 3, 2, 3, 2. Euler path?', [['Two odd vertices.', ''], ['Start at one corner of the diagonal.', '']], 'Yes, from one odd corner to the other'),
        ],
        practice: [
          pr('Degrees 2, 2, 4, 4, 2. How many odd vertices?', 0, 'All even.', '0: an Euler circuit exists.'),
          pr('Degrees 1, 3, 2, 2, 4. How many odd vertices?', 2, '1 and 3.', '2: an Euler path exists.'),
          pr('Fewest edges to add to Königsberg (5, 3, 3, 3) to allow an Euler circuit?', 2, 'Each edge fixes two odd vertices.', '4 odd vertices need 2 new edges.'),
          ch('A garbage truck must drive every street once and return to the depot. Which question is that?', ['Euler circuit', 'Hamilton circuit', 'Shortest path', 'Graph colouring'], 'Every street = every edge.', 'Every edge once and back: an Euler circuit.'),
        ],
      },
      {
        title: 'Hamilton’s puzzle and colouring',
        minutes: 20,
        explain: [
          'A Hamilton circuit visits every vertex exactly once and returns. Unlike Euler’s question, nobody knows a fast general way to decide whether one exists (cs-138).',
          'Colouring: give each vertex a colour so that joined vertices differ. The fewest colours needed is the chromatic number. Exam timetables, radio frequencies and register use in compilers are colouring problems.',
          'The four colour theorem (1976) says any map drawn on a plane needs at most four colours.',
        ],
        formulas: [['Complete graph', 'K_n:\\; \\binom{n}{2} \\text{ edges},\\;\\; \\chi(K_n) = n']],
        examples: [
          ex('How many colours does a triangle need?', [['Every pair is joined.', ''], ['So all differ.', '3']], '3'),
          ex('Four exams; A clashes with B and C; D clashes with nothing. Fewest time slots?', [['A needs a slot apart from B and C.', ''], ['B and C can share; D anywhere.', '2']], '2'),
        ],
        practice: [
          pr('How many colours does a square (4-cycle) need?', 2, 'Alternate.', '2.'),
          pr('How many colours does a 5-cycle need?', 3, 'Alternating fails on an odd cycle.', '3.'),
          pr('How many edges in the complete graph on 6 vertices?', 15, 'C(6, 2).', '15.'),
          pr('Most colours ever needed for a map on a plane?', 4, 'Appel and Haken, 1976.', '4.'),
        ],
      },
    ],
  },

  'cs-116': {
    predict: {
      q: 'On a 12-hour clock you start at 0 and keep jumping forward 4 hours. How many different hours will you ever land on?',
      options: ['3', '12', '4', '6'],
      answer: 0,
      reveal: '0, 4, 8, then back to 0. Because 4 and 12 share the factor 4, only 12 ÷ 4 = 3 hours are reachable. A step of 5 would reach all 12.',
    },
    parts: [
      {
        title: 'Remainders and congruence',
        minutes: 20,
        explain: [
          'a mod n is the remainder when a is divided by n: 17 mod 5 = 2. Python writes it a % n.',
          'Two numbers are congruent mod n, a ≡ b (mod n), if they leave the same remainder, or equivalently if n divides a − b. 17 ≡ 2 ≡ 32 (mod 5).',
          'Addition and multiplication respect remainders: you may reduce mod n at any point. That keeps numbers small, which is why computers can work with huge powers mod n.',
        ],
        formulas: [['Congruence', 'a \\equiv b \\pmod n \\iff n \\mid (a-b)']],
        code: [['Python', 'print(17 % 5)         # 2\nprint((14 * 23) % 5)  # 2, the same as (4 * 3) % 5']],
        examples: [
          ex('What day of the week is 100 days after a Monday?', [['100 mod 7.', '100 = 14 \\times 7 + 2'], ['Two days after Monday.', '']], 'Wednesday'),
          ex('Last digit of 7 × 13 × 19?', [['Work mod 10 with last digits.', '7 \\times 3 = 21 \\to 1'], ['Then times 9.', '1 \\times 9 = 9']], '9'),
        ],
        practice: [
          pr('29 mod 6 = ?', 5, '29 = 4 × 6 + 5.', '5.'),
          pr('On a 24-hour clock, 20:00 plus 9 hours is what hour?', 5, '29 mod 24.', '5 (05:00).'),
          pr('Last digit of 123 × 456?', 8, '3 × 6 = 18.', '8.'),
          pr('(1000 + 7) mod 9 = ?', 8, '1000 mod 9 = 1.', '1 + 7 = 8.'),
        ],
      },
      {
        title: 'Powers mod n and Fermat’s little theorem',
        minutes: 25,
        explain: [
          'To compute a large power mod n, square and reduce repeatedly. 3¹⁶ mod 7: 3² = 9 ≡ 2, 3⁴ ≡ 4, 3⁸ ≡ 16 ≡ 2, 3¹⁶ ≡ 4.',
          'Fermat’s little theorem: if p is prime and p does not divide a, then a^(p − 1) ≡ 1 (mod p). So powers of a repeat every p − 1 steps.',
          'Two numbers whose product is ≡ 1 mod n are inverses mod n. a has an inverse mod n exactly when gcd(a, n) = 1, the same condition that lets a step of a visit every hour on an n-hour clock.',
        ],
        formulas: [['Fermat', 'a^{p-1} \\equiv 1 \\pmod p'], ['Inverse', 'a\\,a^{-1} \\equiv 1 \\pmod n']],
        code: [['Python’s three-argument pow', 'print(pow(3, 16, 7))   # 4\nprint(pow(2, 10, 11))  # 1, by Fermat\nprint(pow(3, -1, 7))   # 5, since 3 * 5 = 15 ≡ 1']],
        examples: [
          ex('2¹⁰ mod 11?', [['11 is prime, 2 is not a multiple.', ''], ['Fermat with p − 1 = 10.', '1']], '1'),
          ex('Inverse of 3 mod 7?', [['Try 3 × k for k = 1, 2, …', '3 \\times 5 = 15 = 2 \\times 7 + 1'], ['So k = 5.', '']], '5'),
        ],
        practice: [
          pr('5⁶ mod 7 = ?', 1, 'Fermat with p = 7.', '1.'),
          pr('2⁵ mod 13 = ?', 6, '32 = 2 × 13 + 6.', '6.'),
          pr('Inverse of 2 mod 9?', 5, '2 × 5 = 10 ≡ 1.', '5.'),
          pr('3¹⁰⁰ mod 5? (Hint: 3⁴ ≡ 1.)', 1, '100 is a multiple of 4.', '(3⁴)²⁵ ≡ 1.'),
        ],
      },
      {
        title: 'RSA with small numbers',
        minutes: 25,
        explain: [
          'Choose primes p and q, and set N = pq and φ = (p − 1)(q − 1). Pick e with gcd(e, φ) = 1, and d the inverse of e mod φ. Publish (N, e); keep d secret.',
          'To send m, compute c = m^e mod N. To read it, compute c^d mod N, which gives back m. Knowing p and q gives φ and then d; without them, nobody knows a fast way.',
          'Real RSA uses N with over 600 decimal digits. The small numbers here are only to see the steps.',
        ],
        formulas: [['RSA', 'c = m^e \\bmod N,\\qquad m = c^d \\bmod N,\\qquad ed \\equiv 1 \\pmod{\\varphi}']],
        examples: [
          ex('p = 5, q = 11. N and φ?', [['N = pq.', '55'], ['φ = 4 × 10.', '40']], 'N = 55, φ = 40'),
          ex('With e = 3, find d (inverse of 3 mod 40). Encrypt m = 2.', [['3 × 27 = 81 = 2 × 40 + 1.', 'd = 27'], ['c = 2³ mod 55.', '8']], 'd = 27, c = 8'),
        ],
        practice: [
          pr('p = 3, q = 11. What is N?', 33, '3 × 11.', '33.'),
          pr('Same. What is φ?', 20, '2 × 10.', '20.'),
          pr('With e = 3 and φ = 20, what is d?', 7, '3d ≡ 1 mod 20.', '3 × 7 = 21: d = 7.'),
          pr('Encrypt m = 4 with N = 33, e = 3.', 31, '64 mod 33.', '64 − 33 = 31.'),
          pr('Decrypt c = 31 with d = 7, N = 33.', 4, 'Python: pow(31, 7, 33).', 'It gives back 4.'),
        ],
      },
    ],
  },
};
