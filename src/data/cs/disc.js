// Computer Science program: Discrete Structures (cs-111 to cs-116).
// Logic, sets, induction, counting, graphs and modular arithmetic, each told
// from its own history. Story claims are cited as [n], pointing at `sources`.
import { mk, home, online } from '../um/make';

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;
const MCS = (ch, why, summary) => ['link', 'MIT OpenCourseWare (free book)', `Mathematics for Computer Science (Lehman, Leighton, Meyer): ${ch}`, 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/', why, summary];
const TUTOR = (task) => online('Python Tutor (free, runs in the browser, shows every step)', 'https://pythontutor.com/python-compiler.html#mode=edit', task);

export default [
  mk({
    id: 'cs-111',
    code: 'CS DS1',
    track: 'disc',
    um: [],
    after: ['cs-102'],
    title: 'Logic and Truth Tables',
    subtitle: 'Aristotle, the Stoics, Boole’s algebra of thought, and checking every case',
    digest: [
      'A proposition is a sentence that is either true or false. AND, OR and NOT build bigger ones from smaller ones.',
      'A truth table lists every combination of true and false for the parts, and the result for each: with n parts there are 2ⁿ rows.',
      '“If p then q” is false only when p is true and q is false. That one row surprises almost everyone.',
    ],
    era: '350 BC Aristotle → 1854 Boole → 1921 truth tables',
    who: 'Aristotle, Chrysippus, George Boole, Ludwig Wittgenstein & Emil Post',
    hook: 'Can reasoning itself be done by calculation, like arithmetic?',
    story: [
      'Around 350 BC Aristotle studied which arguments are valid by their form alone, such as “all men are mortal; Socrates is a man; so Socrates is mortal”: the syllogism [1]. A century later the Stoic Chrysippus worked out rules for whole sentences joined by “and”, “or” and “if … then”, close to what this class teaches [2].',
      'In 1854 the English schoolteacher George Boole published The Laws of Thought, writing true as 1 and false as 0 and doing logic as algebra [3]. In 1921 Ludwig Wittgenstein and Emil Post, independently, set out the truth table: a grid that lists every combination of true and false and the result of each [4].',
      'Truth tables turn logic into bookkeeping. Every if statement you wrote in cs-102 is a small piece of this logic, and every chip in a computer is built from it [3][4].',
    ],
    takeaway: 'Logic can be checked mechanically: list every case in a truth table. With n simple parts there are 2ⁿ cases.',
    viz: 'logic_table',
    vizTitle: 'Build a Truth Table',
    vizHow: 'Pick an operator. Flip p and q with the switches; the lit row of the table is the case you are in.',
    steps: [
      ['AND, OR, NOT', 'p \\land q,\\quad p \\lor q,\\quad \\lnot p', 'AND is true only when both are true; OR when at least one is; NOT flips true and false.'],
      ['Count the rows', '2^n \\text{ rows for } n \\text{ propositions}', 'Each proposition doubles the number of cases.'],
      ['If … then', 'p \\to q \\equiv \\lnot p \\lor q', 'A promise “if it rains, I bring an umbrella” is broken only when it rains and there is no umbrella.'],
    ],
    drills: [
      ['p is true and q is false. What is p AND q?', ['False', 'True', 'It depends', 'Both'], 'AND needs both.', 'q is false.', 'False.'],
      ['How many rows does a truth table with 3 propositions have?', ['8', '6', '3', '9'], 'Each one doubles the cases.', '2 × 2 × 2.', '8.'],
      ['When is “if p then q” false?', ['Only when p is true and q is false', 'Whenever p is false', 'Whenever q is true', 'Never'], 'Think of a broken promise.', 'Rain, but no umbrella.', 'Only when p is true and q is false.'],
    ],
    boss: [
      'De Morgan’s law',
      'Which sentence means the same as “NOT (p AND q)”?',
      ['(NOT p) OR (NOT q)', '(NOT p) AND (NOT q)', 'p OR q', 'NOT p'],
      'Check the row where p is true and q is false.',
      'NOT (p AND q) is true unless both are true, exactly when at least one of p, q is false: (NOT p) OR (NOT q). Augustus De Morgan stated it in the 1840s.',
    ],
    read: [
      ['wiki', 'Truth table', 'The table of every case, with examples for each operator.', 'A truth table lists every combination of true and false values for the input propositions, and the value of the whole expression for each. It is used to check whether an expression is always true, and whether two expressions mean the same.'],
      MCS('Chapter 3, Logical Formulas', 'The standard free textbook for this course.', 'Propositions, the connectives AND, OR, NOT and IMPLIES, truth tables, and equivalences such as De Morgan’s laws, with many exercises.'),
    ],
    sources: [
      ['Wikipedia: Syllogism', W('Syllogism'), 'Aristotle’s Prior Analytics'],
      ['Wikipedia: Stoic logic', W('Stoic_logic'), 'Chrysippus and propositional connectives'],
      ['Wikipedia: The Laws of Thought', W('The_Laws_of_Thought'), 'Boole, 1854'],
      ['Wikipedia: Truth table', W('Truth_table'), 'Wittgenstein and Post, 1921'],
    ],
    labs: [
      TUTOR('Type: for p in [True, False]: then, indented, for q in [True, False]: print(p, q, p and q). Run it: Python prints the AND truth table.'),
      home('Write down three promises from everyday life as “if p then q”. For each, describe the one situation that breaks it.'),
    ],
    quiz: [
      ['Who wrote The Laws of Thought (1854), doing logic as algebra?', ['George Boole', 'Aristotle', 'Alan Turing', 'Gottlob Frege'], 'True = 1, false = 0.'],
      ['Which Stoic philosopher developed the logic of “and”, “or”, “if”?', ['Chrysippus', 'Plato', 'Euclid', 'Zeno of Elea'], 'Third century BC.'],
    ],
    gloss: [
      ['Proposition', 'A sentence that is either true or false.', ['propositions']],
      ['Truth table', 'A table listing every combination of true and false for the parts of a statement, with the result of each.', ['truth tables']],
      ['Implication', 'A statement “if p then q”; false only when p is true and q is false.', []],
    ],
    events: [
      [-350, 'Aristotle’s syllogisms', 'Valid by form alone.', true],
      [1854, 'Boole’s Laws of Thought', 'Logic as algebra.', false],
      [1921, 'Truth tables', 'Wittgenstein and Post.', false],
    ],
  }),

  mk({
    id: 'cs-112',
    code: 'CS DS1',
    track: 'disc',
    um: [],
    after: ['cs-111'],
    title: 'Sets, Relations and Functions',
    subtitle: 'Cantor’s collections, Venn’s circles, and Russell’s paradox',
    digest: [
      'A set is a collection of distinct things. Order and repeats do not matter: {1, 2} = {2, 1, 1}.',
      'Union (∪) puts two sets together; intersection (∩) keeps what they share; difference (A − B) removes B’s members from A.',
      'A function sends each member of one set to exactly one member of another. Every Python dictionary is a small function.',
    ],
    era: '1874 Cantor → 1880 Venn → 1901 Russell',
    who: 'Georg Cantor, John Venn & Bertrand Russell',
    hook: 'Is there a single idea from which all of mathematics can be built?',
    story: [
      'In 1874 Georg Cantor published a paper on collections of numbers, which grew into set theory: the idea that collections, and what they contain, can be studied as objects in their own right [1]. He showed that some infinite sets are bigger than others [1].',
      'In 1880 the English logician John Venn drew overlapping circles to show how sets relate, the Venn diagram still taught in every school [2]. In 1901 Bertrand Russell found a paradox: the set of all sets that do not contain themselves both must and must not contain itself. Mathematicians rebuilt the foundations with careful rules to avoid it [3].',
      'Today sets are the shared language of mathematics and of computing: a database query, a search filter or a Python set all use union, intersection and difference [1][2].',
    ],
    takeaway: 'Sets are collections; union, intersection and difference combine them. A function pairs each input with exactly one output.',
    viz: 'venn_sets',
    vizTitle: 'Venn Diagrams',
    vizHow: 'Two sets of numbers are drawn as circles. Pick an operation and the members of the answer light up.',
    steps: [
      ['Union and intersection', 'A \\cup B,\\quad A \\cap B', 'Union: in A or B (or both). Intersection: in both.'],
      ['Counting a union', '|A \\cup B| = |A| + |B| - |A \\cap B|', 'Members in both were counted twice, so subtract them once.'],
      ['Function', 'f: A \\to B', 'Every member of A goes to exactly one member of B.'],
    ],
    drills: [
      ['A = {1, 2, 3}, B = {2, 3, 4}. What is A ∩ B?', ['{2, 3}', '{1, 2, 3, 4}', '{1}', '{4}'], 'In both.', '2 and 3 are in both.', '{2, 3}.'],
      ['How many members does {a, b, a, c} have?', ['3', '4', '2', '1'], 'Repeats do not count.', 'a, b, c.', '3.'],
      ['|A| = 10, |B| = 8, |A ∩ B| = 3. What is |A ∪ B|?', ['15', '18', '13', '21'], 'Do not count the shared ones twice.', '10 + 8 − 3.', '15.'],
    ],
    boss: [
      'Is it a function?',
      'Students are paired with their birthdays. Which direction is always a function?',
      ['Student → birthday', 'Birthday → student', 'Both directions', 'Neither'],
      'A function gives exactly one output for each input.',
      'Each student has exactly one birthday, but one date can belong to many students (or none). So student → birthday is a function; the reverse is not.',
    ],
    read: [
      ['wiki', 'Set (mathematics)', 'Sets, their notation and operations.', 'A set is a collection of different things, called its elements or members. Sets can be combined by union, intersection and difference, and compared by inclusion.'],
      MCS('Chapter 4, Mathematical Data Types', 'Sets, sequences, functions and relations, with exercises.', 'Sets and their operations, sequences, functions (total and partial), and relations, as used throughout computer science.'),
    ],
    sources: [
      ['Wikipedia: Georg Cantor', W('Georg_Cantor'), 'set theory from 1874; sizes of infinity'],
      ['Wikipedia: Venn diagram', W('Venn_diagram'), 'John Venn, 1880'],
      ['Wikipedia: Russell’s paradox', W('Russell%27s_paradox'), '1901 and its effect on foundations'],
    ],
    labs: [
      TUTOR('Type A = {1, 2, 3} and B = {2, 3, 4}, then print(A | B), print(A & B), print(A - B). Match each to union, intersection and difference.'),
      home('Ask ten people whether they drink coffee and whether they drink tea. Draw a Venn diagram and check that coffee + tea − both = at least one.'),
    ],
    quiz: [
      ['Who started set theory in 1874?', ['Georg Cantor', 'John Venn', 'Bertrand Russell', 'Leonhard Euler'], 'He also compared sizes of infinity.'],
      ['Whose paradox (1901) about “the set of all sets that do not contain themselves” shook the foundations of mathematics?', ['Bertrand Russell', 'Kurt Gödel', 'David Hilbert', 'George Boole'], 'A barber who shaves everyone who does not shave himself.'],
    ],
    gloss: [
      ['Set', 'A collection of distinct things, called its members or elements.', ['sets']],
      ['Union', 'The set of things in A or B or both, written A ∪ B.', []],
      ['Intersection', 'The set of things in both A and B, written A ∩ B.', []],
      ['Function', 'A rule that gives each input exactly one output.', ['functions']],
    ],
    events: [
      [1874, 'Cantor’s first set-theory paper', 'Collections as objects.', false],
      [1880, 'Venn diagrams', 'Overlapping circles.', false],
      [1901, 'Russell’s paradox', 'Foundations rebuilt.', false],
    ],
  }),

  mk({
    id: 'cs-113',
    code: 'CS DS1',
    track: 'disc',
    um: [],
    after: ['cs-112', 'cs-103'],
    title: 'Proof by Induction: Falling Dominoes',
    subtitle: 'Maurolico, Pascal, and proving infinitely many cases in two steps',
    digest: [
      'Induction proves a statement for every whole number n in two steps: show it for the first n, and show that if it holds for n it also holds for n + 1.',
      'Like dominoes: the first one falls, and each one knocks over the next, so all of them fall.',
      'Classic result: 1 + 2 + … + n = n(n + 1)/2. Programmers use the same idea to show a loop is correct.',
    ],
    era: '1575 Maurolico → 1654 Pascal → 1838 De Morgan names it',
    who: 'Francesco Maurolico, Blaise Pascal & Augustus De Morgan',
    hook: 'How can you prove something about infinitely many numbers without checking them all?',
    story: [
      'In 1575 the Sicilian priest Francesco Maurolico proved that the sum of the first n odd numbers is n², by showing that adding the next odd number keeps the pattern going [1]. This is often called the first clear proof by induction [1].',
      'Blaise Pascal used the same reasoning in 1654 for the properties of his arithmetical triangle, stating both steps explicitly [1][2]. In 1838 Augustus De Morgan gave the method the name “mathematical induction” [1].',
      'The legend that the young Carl Friedrich Gauss summed 1 to 100 in seconds by pairing numbers (1 + 100, 2 + 99, …) is told in many versions and its details are uncertain [3]. Either way, pairing gives the formula, and induction proves it for every n [3].',
    ],
    takeaway: 'To prove a statement for all n: prove it for the first case, then prove that each case implies the next.',
    viz: 'domino_induction',
    vizTitle: 'Dominoes and Staircases',
    vizHow: 'Choose n. Watch the dominoes fall, then see two staircases of 1 + 2 + … + n fit into an n by n + 1 rectangle.',
    steps: [
      ['Base case', 'P(1)', 'Check the statement for the first number.'],
      ['Inductive step', 'P(n) \\Rightarrow P(n+1)', 'Assume it holds for n, and show it then holds for n + 1.'],
      ['The sum formula', '1 + 2 + \\cdots + n = \\tfrac{n(n+1)}{2}', 'Two copies of the staircase make an n × (n + 1) rectangle.'],
    ],
    drills: [
      ['What is 1 + 2 + … + 10?', ['55', '50', '100', '45'], 'n(n + 1)/2 with n = 10.', '10 × 11 / 2.', '55.'],
      ['What is the first step of an induction proof?', ['Prove the statement for the first case', 'Assume it for all n', 'Check ten cases', 'Prove it for n + 1 only'], 'The first domino.', 'The base case.', 'Prove it for the first case.'],
      ['The sum of the first 5 odd numbers (1 + 3 + 5 + 7 + 9) is?', ['25', '15', '20', '30'], 'Maurolico: n².', '5².', '25.'],
    ],
    boss: [
      'The missing step',
      'Someone “proves” all horses are the same colour by induction: one horse is one colour, and any n + 1 horses overlap two groups of n. Where does it break?',
      ['The step from 1 horse to 2 horses: the two groups of 1 do not overlap', 'The base case is false', 'Induction never works for horses', 'It is actually correct'],
      'Try n = 1 in the inductive step.',
      'With 2 horses, the groups {horse 1} and {horse 2} share no horse, so nothing links their colours. The step P(n) ⇒ P(n + 1) must work for every n, including n = 1.',
    ],
    read: [
      ['wiki', 'Mathematical induction', 'The method, its history and many examples.', 'Mathematical induction proves that a statement holds for every natural number: a base case shows it for 0 or 1, and an inductive step shows that if it holds for one number it holds for the next.'],
      MCS('Chapter 5, Induction', 'Ordinary and strong induction, with worked proofs.', 'The induction principle, worked proofs such as sums and tilings, strong induction, and common mistakes such as the horse-colour argument.'),
    ],
    sources: [
      ['Wikipedia: Mathematical induction', W('Mathematical_induction'), 'Maurolico 1575, Pascal, De Morgan 1838'],
      ['Wikipedia: Pascal’s triangle', W('Pascal%27s_triangle'), 'Traité du triangle arithmétique, 1654'],
      ['Wikipedia: Carl Friedrich Gauss', W('Carl_Friedrich_Gauss'), 'the school-sum anecdote and its uncertain details'],
    ],
    labs: [
      TUTOR('Write a loop that adds 1 to n for n = 100 and print the result. Compare it with n * (n + 1) // 2.'),
      home('Stand ten dominoes (or books) in a row. Knock over the first. Then remove one in the middle and try again: which step of induction failed?'),
    ],
    quiz: [
      ['Who gave an early proof by induction in 1575 (sum of odd numbers = n²)?', ['Francesco Maurolico', 'Blaise Pascal', 'Euclid', 'Isaac Newton'], 'A Sicilian priest and mathematician.'],
      ['Who named the method “mathematical induction” in 1838?', ['Augustus De Morgan', 'George Boole', 'Carl Gauss', 'Pierre de Fermat'], 'Also of De Morgan’s laws.'],
    ],
    gloss: [
      ['Induction', 'A proof method: prove the first case, then prove that each case implies the next.', ['mathematical induction']],
      ['Base case', 'The first case checked directly in an induction proof.', []],
      ['Inductive step', 'The part of an induction proof showing case n implies case n + 1.', []],
    ],
    events: [
      [1575, 'Maurolico’s induction', 'Sum of odd numbers is n².', false],
      [1654, 'Pascal’s triangle treatise', 'Both steps stated.', false],
      [1838, 'De Morgan names it', '“Mathematical induction”.', false],
    ],
  }),

  mk({
    id: 'cs-114',
    code: 'CS DS1',
    track: 'disc',
    um: [],
    after: ['cs-113'],
    title: 'Counting: Arrangements and Choices',
    subtitle: 'Pingala’s rhythms, Pascal’s triangle, and why passwords need length',
    digest: [
      'Multiplication rule: if one choice has a options and the next has b, together there are a × b ways.',
      'Arranging n different things in order: n! = n × (n − 1) × … × 1 ways.',
      'Choosing k things from n when order does not matter: C(n, k) = n! / (k!(n − k)!). These numbers fill Pascal’s triangle.',
    ],
    era: '200 BC Pingala → 1261 Yang Hui → 1654 Pascal',
    who: 'Pingala, Yang Hui & Blaise Pascal',
    hook: 'How many different passwords, poems or poker hands are there, without listing them all?',
    story: [
      'The Indian scholar Pingala, around the 2nd century BC, counted the possible rhythms of poems made of short and long syllables, and his method contains the numbers we now call binomial coefficients [1][2].',
      'The triangle of these numbers, each the sum of the two above it, was described by Jia Xian in the 11th century and printed by Yang Hui in 1261; in Persia al-Karaji and Omar Khayyam knew it too [2]. Blaise Pascal’s 1654 treatise gave it its European name [2].',
      'Counting is how we know a 12-character password is far safer than an 8-character one, and how many cases an algorithm may have to check [3].',
    ],
    takeaway: 'Multiply the number of options at each step. Order matters: n!. Order does not matter: C(n, k), the entries of Pascal’s triangle.',
    viz: 'pascal_paths',
    vizTitle: 'Pascal’s Triangle as Paths',
    vizHow: 'Pick a row n and a position k. Each entry counts the paths from the top that take k right-steps out of n.',
    steps: [
      ['Multiplication rule', 'a \\times b', 'Two choices in a row multiply.'],
      ['Arrangements', 'n! = n(n-1)\\cdots 1', 'n choices for the first place, n − 1 for the next, and so on.'],
      ['Choices', '\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}', 'Divide by the k! orders of the chosen items and the (n − k)! orders of the rest.'],
    ],
    drills: [
      ['How many ways to arrange 4 different books on a shelf?', ['24', '16', '4', '12'], '4!', '4 × 3 × 2 × 1.', '24.'],
      ['How many ways to choose 2 of 5 friends (order does not matter)?', ['10', '20', '25', '5'], 'C(5, 2).', '5 × 4 / 2.', '10.'],
      ['A PIN has 4 digits, each 0–9. How many PINs?', ['10,000', '40', '5,040', '1,000'], '10 options, four times.', '10⁴.', '10,000.'],
    ],
    boss: [
      'Longer beats richer',
      'Which gives more possible passwords?',
      ['12 lowercase letters (26 options each)', '8 characters from 70 options each', 'They are equal', 'It depends on the person'],
      'Compare 26¹² and 70⁸.',
      '26¹² ≈ 9.5 × 10¹⁶ and 70⁸ ≈ 5.8 × 10¹⁴. Length grows the count much faster than a bigger alphabet.',
    ],
    read: [
      ['wiki', 'Binomial coefficient', 'The numbers C(n, k), their formula and Pascal’s triangle.', 'The binomial coefficient C(n, k) counts the ways to choose k items from n when order does not matter. These numbers form Pascal’s triangle and appear in the expansion of (x + y)ⁿ.'],
      MCS('Chapter 15, Cardinality Rules', 'Sum and product rules, permutations and combinations.', 'Counting rules for sequences and subsets, the division rule, binomial coefficients, and counting by bijection.'),
    ],
    sources: [
      ['Wikipedia: Pingala', W('Pingala'), 'syllable patterns, c. 2nd century BC'],
      ['Wikipedia: Pascal’s triangle', W('Pascal%27s_triangle'), 'Jia Xian, Yang Hui 1261, Khayyam, Pascal 1654'],
      ['Wikipedia: Password strength', W('Password_strength'), 'length and number of possibilities'],
    ],
    labs: [
      TUTOR('Type: import math, then print(math.comb(5, 2), math.factorial(4)). Then print(26**12 > 70**8).'),
      home('Write out all the ways to choose 2 letters from A, B, C, D. Check you get C(4, 2) = 6.'),
    ],
    quiz: [
      ['Who printed the triangle of binomial coefficients in China in 1261?', ['Yang Hui', 'Zu Chongzhi', 'Liu Hui', 'Qin Jiushao'], 'From Jia Xian’s earlier work.'],
      ['Pingala counted patterns of what?', ['Short and long syllables in poems', 'Stars', 'Coins', 'Chess moves'], 'Sanskrit metre.'],
    ],
    gloss: [
      ['Factorial', 'n! = n × (n − 1) × … × 1, the number of ways to order n things.', ['factorials']],
      ['Combination', 'A choice of k items from n where order does not matter; there are C(n, k).', ['combinations']],
      ['Permutation', 'An ordering of items; n things have n! permutations.', ['permutations']],
    ],
    events: [
      [-200, 'Pingala’s metres', 'Counting syllable patterns.', true],
      [1261, 'Yang Hui’s triangle', 'Printed in China.', false],
      [1654, 'Pascal’s treatise', 'The arithmetical triangle.', false],
    ],
  }),

  mk({
    id: 'cs-115',
    code: 'CS DS2',
    track: 'disc',
    um: [],
    after: ['cs-114', 'math-005'],
    title: 'Graphs: Euler’s Seven Bridges',
    subtitle: 'Königsberg, degrees, and the maths of networks',
    digest: [
      'A graph is a set of dots (vertices) joined by lines (edges). Roads, friendships, web links and molecules are all graphs.',
      'The degree of a vertex is how many edges touch it. The degrees always add up to twice the number of edges.',
      'Euler’s rule: you can walk every edge exactly once only if 0 or 2 vertices have odd degree.',
    ],
    era: '1736 Euler → 1857 Hamilton → 1976 four colours',
    who: 'Leonhard Euler, William Rowan Hamilton, Kenneth Appel & Wolfgang Haken',
    hook: 'Can you cross each of the seven bridges of Königsberg exactly once?',
    story: [
      'The Prussian city of Königsberg had seven bridges linking two islands and two river banks. Townspeople wondered whether a walk could cross each bridge exactly once [1]. In 1736 Leonhard Euler proved it cannot: only the number of bridges at each land mass matters, and too many have an odd number [1].',
      'By throwing away distances and shapes and keeping only what connects to what, Euler started graph theory [1][2]. In 1857 William Rowan Hamilton sold a puzzle, the Icosian game, asking for a route that visits every corner of a dodecahedron exactly once: a question about vertices instead of edges, and still hard to answer in general [3].',
      'In 1976 Kenneth Appel and Wolfgang Haken proved that four colours suffice for any map, using a computer to check almost 2,000 cases, the first major proof that needed one [4].',
    ],
    takeaway: 'Graphs keep only what connects to what. Euler’s rule: an all-edges walk needs 0 or 2 odd-degree vertices.',
    viz: 'konigsberg',
    vizTitle: 'The Bridges of Königsberg',
    vizHow: 'The four land masses become vertices and the bridges edges. Add or remove a bridge and watch the odd-degree count.',
    steps: [
      ['Vertices and edges', 'G = (V, E)', 'A graph is a set of vertices and a set of edges between them.'],
      ['Handshake lemma', '\\sum_v \\deg(v) = 2|E|', 'Every edge has two ends, so it adds 2 to the total degree.'],
      ['Euler’s rule', '\\#\\{\\text{odd vertices}\\} \\in \\{0, 2\\}', 'Zero: you can end where you start. Two: start at one odd vertex and end at the other.'],
    ],
    drills: [
      ['In Königsberg, how many land masses had an odd number of bridges?', ['4', '2', '0', '1'], 'Degrees were 5, 3, 3, 3.', 'All four are odd.', '4.'],
      ['A graph has 6 edges. What do the degrees add up to?', ['12', '6', '3', '36'], 'Each edge has two ends.', '2 × 6.', '12.'],
      ['Can a graph have exactly 1 odd-degree vertex?', ['No', 'Yes', 'Only if it is large', 'Only with loops'], 'The total degree is even.', 'Odd vertices come in pairs.', 'No.'],
    ],
    boss: [
      'Fix the city',
      'Königsberg’s degrees were 5, 3, 3, 3. What is the fewest bridges you must add so that a walk over every bridge once becomes possible?',
      ['1', '2', '0', '4'],
      'Each new bridge changes the degree of two land masses by one.',
      'One bridge between two of the odd land masses makes them even, leaving exactly 2 odd vertices, which Euler’s rule allows.',
    ],
    read: [
      ['wiki', 'Seven Bridges of Königsberg', 'The puzzle and Euler’s solution.', 'The problem asked for a walk through Königsberg crossing each of its seven bridges exactly once. Euler showed in 1736 that no such walk exists, because each of the four land masses touched an odd number of bridges, and so began graph theory.'],
      MCS('Chapter 12, Simple Graphs', 'Degrees, the handshake lemma, walks and paths.', 'Definitions of graphs, degree and the handshake lemma, isomorphism, connectivity, trees, and colouring.'),
    ],
    sources: [
      ['Wikipedia: Seven Bridges of Königsberg', W('Seven_Bridges_of_K%C3%B6nigsberg'), 'Euler 1736'],
      ['Wikipedia: Graph theory', W('Graph_theory'), 'history and basic terms'],
      ['Wikipedia: Icosian game', W('Icosian_game'), 'Hamilton, 1857'],
      ['Wikipedia: Four color theorem', W('Four_color_theorem'), 'Appel and Haken, 1976, computer-checked cases'],
    ],
    labs: [
      online('Graph Online (free graph editor in the browser)', 'https://graphonline.top/en/', 'Draw Königsberg as 4 vertices and 7 edges. Use the menu to look for an Eulerian path, then add one edge and try again.'),
      home('Draw your barangay’s streets as a graph. Count the odd-degree corners. Could a street sweeper cover every street once?'),
    ],
    quiz: [
      ['Who solved the Königsberg bridge problem in 1736?', ['Leonhard Euler', 'Isaac Newton', 'Carl Gauss', 'Blaise Pascal'], 'He started graph theory.'],
      ['The four-colour theorem (1976) was the first major proof to rely on what?', ['A computer checking many cases', 'A single diagram', 'Induction alone', 'A lucky guess'], 'Appel and Haken.'],
    ],
    gloss: [
      ['Graph', 'A set of vertices (dots) joined by edges (lines).', ['graphs']],
      ['Vertex', 'A dot in a graph; plural vertices.', ['vertices']],
      ['Degree', 'The number of edges touching a vertex.', []],
      ['Eulerian path', 'A walk that uses every edge of a graph exactly once.', []],
    ],
    events: [
      [1736, 'Euler and Königsberg', 'Graph theory begins.', false],
      [1857, 'Hamilton’s Icosian game', 'Visit every vertex once.', false],
      [1976, 'Four colour theorem', 'Proved with a computer.', false],
    ],
  }),

  mk({
    id: 'cs-116',
    code: 'CS DS2',
    track: 'disc',
    um: [],
    after: ['cs-115', 'num-006'],
    title: 'Clock Arithmetic and the RSA Lock',
    subtitle: 'Gauss’s congruences, Fermat’s little theorem, and public keys',
    digest: [
      'Modular arithmetic is clock arithmetic: 9 + 5 on a 12-hour clock is 2. We write 14 ≡ 2 (mod 12).',
      'Fermat’s little theorem: if p is prime and a is not a multiple of p, then a^(p−1) ≡ 1 (mod p).',
      'RSA (1977) uses these facts: anyone can lock a message with a public number, but unlocking needs the prime factors, which are hard to find.',
    ],
    era: '1640 Fermat → 1801 Gauss → 1977 RSA',
    who: 'Pierre de Fermat, Carl Friedrich Gauss, Rivest, Shamir & Adleman',
    hook: 'How can two strangers agree on a secret while everyone listens?',
    story: [
      'In 1640 Pierre de Fermat stated, in a letter, that for a prime p, a raised to the power p − 1 leaves remainder 1 when divided by p [1]. In 1801 the 24-year-old Carl Friedrich Gauss published Disquisitiones Arithmeticae, introducing the ≡ notation and making “arithmetic of remainders” a subject of its own [2].',
      'For centuries this was pure mathematics. Then in 1977 Ron Rivest, Adi Shamir and Leonard Adleman at MIT built a public-key system, RSA, on it: multiply two large primes to make a public number; the key to decrypt follows from the primes, but finding them from the product is extremely slow [3].',
      'Clifford Cocks at Britain’s GCHQ had found an equivalent method in 1973, kept secret until 1997 [3]. Every padlock icon in a web browser rests on ideas like these [3].',
    ],
    takeaway: 'Arithmetic “mod n” wraps around like a clock. Multiplying primes is easy; un-multiplying is hard. Public-key cryptography lives in that gap.',
    viz: 'clock_mod',
    vizTitle: 'Clock Arithmetic',
    vizHow: 'Choose the clock size n and a number a. The pointer jumps by a each step; watch which hours it visits.',
    steps: [
      ['Congruence', 'a \\equiv b \\pmod n', 'a and b leave the same remainder when divided by n.'],
      ['Fermat’s little theorem', 'a^{p-1} \\equiv 1 \\pmod p', 'For a prime p and a not divisible by p.'],
      ['RSA in one line', 'c = m^e \\bmod N,\\quad m = c^d \\bmod N', 'N = pq is public; d can only be worked out by someone who knows p and q.'],
    ],
    drills: [
      ['What is 17 mod 5?', ['2', '3', '5', '12'], 'Remainder after dividing by 5.', '17 = 3 × 5 + 2.', '2.'],
      ['On a 12-hour clock, 10 o’clock plus 5 hours is?', ['3 o’clock', '15 o’clock', '5 o’clock', '1 o’clock'], '15 mod 12.', '15 − 12.', '3.'],
      ['By Fermat, what is 3⁴ mod 5?', ['1', '3', '81', '4'], 'p = 5, so a^(p − 1) = a⁴.', '81 = 16 × 5 + 1.', '1.'],
    ],
    boss: [
      'Why factoring matters',
      'In RSA, which piece of information lets an attacker read every message?',
      ['The two primes p and q', 'The public number N', 'The public exponent e', 'One encrypted message'],
      'N and e are published on purpose.',
      'From p and q one can compute (p − 1)(q − 1) and then the private exponent d. Keeping RSA safe means making N so large that nobody can factor it.',
    ],
    read: [
      ['wiki', 'Modular arithmetic', 'Congruences, clock arithmetic and their uses.', 'In modular arithmetic numbers wrap around after reaching a fixed value, the modulus, as hours do on a clock. Gauss developed it in his Disquisitiones Arithmeticae of 1801.'],
      ['wiki', 'RSA (cryptosystem)', 'How RSA works, with a small worked example.', 'RSA is a public-key system published in 1977 by Rivest, Shamir and Adleman. Its security rests on the difficulty of factoring the product of two large primes.'],
    ],
    sources: [
      ['Wikipedia: Fermat’s little theorem', W('Fermat%27s_little_theorem'), '1640 letter'],
      ['Wikipedia: Disquisitiones Arithmeticae', W('Disquisitiones_Arithmeticae'), 'Gauss, 1801, congruence notation'],
      ['Wikipedia: RSA (cryptosystem)', W('RSA_(cryptosystem)'), 'Rivest, Shamir, Adleman 1977; Cocks 1973, declassified 1997'],
    ],
    labs: [
      TUTOR('Type print(pow(3, 4, 5)) and print(pow(7, 10, 11)). Both should be 1 by Fermat. Try a non-prime modulus such as pow(2, 5, 6).'),
      home('Make a 7-hour clock on paper. Starting at 0, keep adding 3. Do you visit every hour? Now try adding 3 on a 6-hour clock.'),
    ],
    quiz: [
      ['Who introduced the ≡ notation for congruence in 1801?', ['Carl Friedrich Gauss', 'Pierre de Fermat', 'Leonhard Euler', 'Évariste Galois'], 'Disquisitiones Arithmeticae.'],
      ['Which three people published RSA in 1977?', ['Rivest, Shamir and Adleman', 'Diffie, Hellman and Merkle', 'Turing, Welchman and Knox', 'Cocks, Ellis and Williamson'], 'The initials give the name.'],
    ],
    gloss: [
      ['Modulus', 'The number at which counting wraps around in modular arithmetic.', ['mod']],
      ['Congruent', 'a ≡ b (mod n): a and b leave the same remainder when divided by n.', ['congruence']],
      ['Public-key cryptography', 'Encryption where the key to lock is public and only the key to unlock is secret.', []],
    ],
    events: [
      [1640, 'Fermat’s little theorem', 'Stated in a letter.', false],
      [1801, 'Disquisitiones Arithmeticae', 'Gauss’s congruences.', false],
      [1977, 'RSA published', 'Public keys from primes.', false],
    ],
  }),
];
