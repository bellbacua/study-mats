// Computing and AI side topic: each class split into parts.
// Practice mixes pick-an-answer questions (first option correct, shown shuffled)
// with typed numbers that are computed in place.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution) => ({ q, options, hint, solution });
const H = (p) => -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
const soft2 = (z1, z2, T = 1) => Math.exp(z1 / T) / (Math.exp(z1 / T) + Math.exp(z2 / T));

export const SIDE_COMP = {
  'comp-001': {
    predict: {
      q: 'In binary, what comes right after 0111?',
      options: ['1000', '0112', '1111', '0110'],
      answer: 0,
      reveal: 'Like 0999 + 1 = 1000 in ordinary numbers: every 1 turns to 0 with a carry, until a 0 becomes 1. 7 + 1 = 8.',
    },
    parts: [
      {
        title: 'Binary numbers',
        minutes: 15,
        explain: [
          'In base ten each place is worth 10 times the one to its right. In binary (base two) each place is worth 2 times: 1, 2, 4, 8, 16, 32…',
          'To convert binary to decimal, add the place values where there is a 1. To convert decimal to binary, take away the largest power of two that fits, again and again.',
          'n bits can hold 2ⁿ different values, from 0 to 2ⁿ − 1. A byte is 8 bits: 0 to 255.',
        ],
        formulas: [['Value of a binary number', 'b_{n-1}\\dots b_1 b_0 = \\sum_k b_k\\,2^k']],
        examples: [
          ex('Convert 101101 to decimal.', [['Place values with a 1.', '32 + 8 + 4 + 1'], ['Add.', '45']], '45'),
          ex('Convert 37 to binary.', [['Largest powers of two.', '37 = 32 + 4 + 1'], ['Mark those places.', '100101']], '100101'),
        ],
        practice: [
          pr('Convert 11010 to decimal.', 26, '16 + 8 + 2.', '26.'),
          pr('Convert 1111111 (seven 1s) to decimal.', 127, '2⁷ − 1.', '127.'),
          pr('How many different values can 10 bits hold?', 1024, '2¹⁰.', '1024.'),
          ch('Binary for 12?', ['1100', '1010', '1110', '0110'], '8 + 4.', '1100.'),
        ],
      },
      {
        title: 'Boole’s algebra',
        minutes: 15,
        explain: [
          'AND (written ab or a·b) is 1 only if both are 1. OR (a + b) is 1 if at least one is 1. NOT (ā) flips 0 and 1.',
          'XOR, "exclusive or", is 1 when exactly one input is 1. It is the sum bit of binary addition.',
          'De Morgan’s laws, which you met in the logic classes, hold here too: NOT (a AND b) = (NOT a) OR (NOT b).',
        ],
        formulas: [
          ['XOR from AND, OR, NOT', 'a \\oplus b = a\\bar b + \\bar a b'],
          ['De Morgan', '\\overline{ab} = \\bar a + \\bar b'],
        ],
        examples: [
          ex('a = 1, b = 0. Find a AND b, a OR b, a XOR b.', [['AND needs both.', '1 \\cdot 0 = 0'], ['OR and XOR.', '1 + 0 = 1,\\ 1 \\oplus 0 = 1']], '0, 1, 1'),
          ex('How many rows in the table for a 3-input gate?', [['Each input 0 or 1.', '2^3'], ['Count.', '8']], '8'),
        ],
        practice: [
          ch('1 XOR 1 = ?', ['0', '1', '2', '11'], 'Exactly one must be 1.', '0.'),
          ch('NOT (1 AND 0) = ?', ['1', '0', '10', 'Undefined'], '1 AND 0 = 0.', 'NOT 0 = 1.'),
          pr('In how many of the 4 input rows is a XOR b equal to 1?', 2, '01 and 10.', '2.'),
          ch('Switches in parallel (current flows if either is closed) act as…', ['OR', 'AND', 'NOT', 'XOR'], 'Either path works.', 'OR.'),
        ],
      },
      {
        title: 'Building an adder',
        minutes: 15,
        explain: [
          'A half adder adds two bits: sum = a XOR b, carry = a AND b.',
          'A full adder also takes a carry in: sum = a ⊕ b ⊕ c, carry out = 1 when at least two of the three are 1.',
          'Chaining n full adders adds n-bit numbers. If the top column carries out, the result does not fit: overflow.',
        ],
        formulas: [['Full adder', 's = a \\oplus b \\oplus c,\\quad c_{\\text{out}} = ab + c(a \\oplus b)']],
        examples: [
          ex('Full adder with a = 1, b = 1, c = 1.', [['Sum: three 1s, odd.', 's = 1'], ['Carry: at least two.', 'c_{\\text{out}} = 1']], 'Sum 1, carry 1 (1 + 1 + 1 = 11 in binary)'),
          ex('Add 0110 + 0011.', [['Column by column from the right.', '0+1=1,\\ 1+1=0\\ c1,\\ 1+0+1=0\\ c1,\\ 0+0+1=1'], ['Result.', '1001 = 9']], '1001'),
        ],
        practice: [
          pr('0101 + 0101 in decimal?', 10, '5 + 5.', '10 = 1010.'),
          pr('Largest sum two 4-bit numbers can make?', 30, '15 + 15.', '30, which needs 5 bits.'),
          ch('A half adder’s carry is which gate?', ['AND', 'OR', 'XOR', 'NOT'], 'Carry only if both are 1.', 'AND.'),
          ch('In an 8-bit adder, 200 + 100 gives…', ['Overflow: 300 does not fit in 0–255', '300', '255', '100'], '8 bits hold 0 to 255.', 'Overflow (it would show 44).'),
        ],
      },
    ],
  },

  'comp-002': {
    predict: {
      q: 'Values of x² for x = 0, 1, 2, 3, 4 are 0, 1, 4, 9, 16. What are the differences between neighbours?',
      options: ['1, 3, 5, 7: going up by 2 each time', '1, 2, 3, 4', 'All 4', '0, 1, 4, 9'],
      answer: 0,
      reveal: 'The first differences are the odd numbers, and their differences are all 2. A machine can make the whole table just by adding 2, then adding the result.',
    },
    parts: [
      {
        title: 'The method of differences',
        minutes: 20,
        explain: [
          'For a polynomial of degree n, the n-th differences are constant. So after setting up the first few values, every further value comes from additions only.',
          'Babbage’s Difference Engine had one column of gear wheels per order of difference; each turn added each column into the next.',
          'For f(x) = x² + x + 41: Δf = 2x + 2 and Δ²f = 2.',
        ],
        formulas: [['Next value', 'f(x+1) = f(x) + \\Delta f(x),\\quad \\Delta f(x+1) = \\Delta f(x) + \\Delta^2 f']],
        examples: [
          ex('f = x² + x + 41. From f(5) = 71 and Δf(5) = 12, find f(6) and f(7).', [['Add.', 'f(6) = 71 + 12 = 83'], ['Update Δf by 2 and add.', 'f(7) = 83 + 14 = 97']], '83 and 97'),
          ex('For f(x) = x³, what is constant?', [['Degree 3.', '\\Delta^3 f'], ['Value.', '6']], 'Third differences, all 6'),
        ],
        practice: [
          pr('f = x² + x + 41: f(10)?', 151, '100 + 10 + 41.', '151.'),
          pr('Using Δf(x) = 2x + 2: Δf(10)?', 22, '2(10) + 2.', '22, so f(11) = 173.'),
          pr('Second differences of f(x) = 3x² are all…', 6, '2 × 3.', '6.'),
          ch('For a degree-4 polynomial, which differences are constant?', ['The fourth', 'The first', 'The second', 'None'], 'Degree n → n-th.', 'Fourth.'),
        ],
      },
      {
        title: 'The Analytical Engine',
        minutes: 15,
        explain: [
          'Babbage’s design had a store (memory for 1000 numbers of 40 decimal digits), a mill (the arithmetic unit), input by punched cards, and output to a printer.',
          'It could choose between instructions depending on a result (branching) and repeat sequences (loops). Those two features make a machine general-purpose.',
          'It was never built: it needed thousands of precisely made parts, more than the workshops of the time could deliver economically.',
        ],
        formulas: [['Store size (design)', '1000 \\times 40\\ \\text{decimal digits}']],
        examples: [
          ex('How many decimal digits could the store hold in total?', [['Multiply.', '1000 \\times 40'], ['Result.', '40\\,000']], '40 000 digits'),
          ex('Which two features make a machine general-purpose?', [['Choosing the next step by a result.', 'Branching.'], ['Repeating steps.', 'Loops.']], 'Branching and loops'),
        ],
        practice: [
          pr('How many 40-digit numbers could the store hold?', 1000, 'Design figure.', '1000.'),
          ch('The "mill" corresponds in a modern computer to…', ['The processor', 'The memory', 'The screen', 'The keyboard'], 'Where arithmetic happens.', 'Processor.'),
          ch('Where did Babbage get the idea of punched cards?', ['The Jacquard loom', 'Railway tickets', 'Playing cards', 'Telegraphs'], 'Weaving.', 'Jacquard loom.'),
          ch('Why was the Analytical Engine never built?', ['Cost and the precision of thousands of parts', 'It was illegal', 'Lovelace stopped it', 'It was electronic'], 'Victorian workshops.', 'Cost and manufacturing.'),
        ],
      },
      {
        title: 'Lovelace’s insight',
        minutes: 15,
        explain: [
          'Lovelace’s Note G laid out, step by step, how the engine would compute the Bernoulli numbers, including which values to store and when to repeat.',
          'More important, she wrote that the engine might act on anything whose relations can be expressed in symbols, like musical notes, not only numbers.',
          'She also argued the engine could not "originate" anything, only do what it was told. Turing called this "Lady Lovelace’s objection" in 1950, a debate that continues about AI today.',
        ],
        formulas: [['First Bernoulli numbers', 'B_0 = 1,\\ B_1 = \\pm\\tfrac{1}{2},\\ B_2 = \\tfrac{1}{6},\\ B_4 = -\\tfrac{1}{30}']],
        examples: [
          ex('Sum of 1 + 2 + … + 100 (a formula Bernoulli numbers generalise)?', [['Use n(n + 1)/2.', '100 \\times 101 / 2'], ['Result.', '5050']], '5050'),
          ex('Sum of squares 1² + … + 10²?', [['Use n(n + 1)(2n + 1)/6.', '10 \\times 11 \\times 21 / 6'], ['Result.', '385']], '385'),
        ],
        practice: [
          pr('1 + 2 + … + 50?', 1275, 'n(n + 1)/2.', '1275.'),
          pr('1² + 2² + … + 20²?', 2870, 'n(n + 1)(2n + 1)/6.', '20 × 21 × 41 / 6 = 2870.'),
          pr('B₂ as a decimal?', 1 / 6, '1/6.', '0.1667.', { tol: 0.001 }),
          ch('What did Turing call Lovelace’s claim that machines cannot originate anything?', ['Lady Lovelace’s objection', 'The halting problem', 'The imitation game', 'Note G'], '1950 paper.', 'Lady Lovelace’s objection.'),
        ],
      },
    ],
  },

  'comp-003': {
    predict: {
      q: 'Could a simple machine that only reads, writes and moves along a tape do everything your phone can compute (given enough time and tape)?',
      options: ['Yes: that is Turing’s claim', 'No, it lacks a screen', 'No, it is too slow to count', 'Only for adding'],
      answer: 0,
      reveal: 'Speed and convenience differ enormously, but what can be computed at all is the same. This is the Church–Turing thesis.',
    },
    parts: [
      {
        title: 'The Turing machine',
        minutes: 15,
        explain: [
          'A Turing machine has: an infinite tape of cells, a head that reads and writes one cell, a current state, and a rule table: (state, symbol read) → (symbol to write, move left or right, next state).',
          'Despite its simplicity, it can carry out any algorithm. A universal Turing machine can read another machine’s rule table from the tape and imitate it: the idea of a stored-program computer.',
          'Counting steps on such machines is how computer scientists define how long a computation takes.',
        ],
        formulas: [['A rule', '\\delta(q, s) = (s\', d, q\')']],
        examples: [
          ex('Add-one machine on 1001. Steps and result?', [['Rightmost 1 becomes 0, move left.', '1000, \\text{ step 1}'], ['A 0 becomes 1, halt.', '1010,\\ \\text{2 steps}']], '1010 after 2 steps'),
          ex('Add-one machine on 1000. Steps?', [['Read 0 at the right.', '\\text{write 1, halt}'], ['Count.', '1']], '1 step, giving 1001'),
        ],
        practice: [
          pr('Steps for the add-one machine on 0111?', 4, 'Three carries then a 0 becomes 1.', '4.'),
          pr('Steps for the add-one machine on 11111111 (eight 1s)?', 9, 'Eight carries, then the blank.', '9.'),
          ch('What does a universal Turing machine do?', ['Imitates any other Turing machine from its description on the tape', 'Runs faster', 'Has no tape', 'Only adds'], 'Stored program.', 'It reads the rules as data.'),
          ch('Who proposed an equivalent model (lambda calculus) in 1936?', ['Alonzo Church', 'John von Neumann', 'Claude Shannon', 'Kurt Gödel'], 'Princeton.', 'Church.'),
        ],
      },
      {
        title: 'Uncomputable problems',
        minutes: 20,
        explain: [
          'The halting problem: given any program and input, decide whether it eventually stops. Turing proved no program can do this correctly for all cases.',
          'The proof idea: suppose such a decider existed. Build a program that asks the decider about itself and then does the opposite. It halts if and only if it does not halt: a contradiction.',
          'This is the same "self-reference" trick as Gödel’s 1931 incompleteness theorem.',
        ],
        formulas: [['The contradiction', '\\text{halts}(D) \\iff \\lnot\\,\\text{halts}(D)']],
        examples: [
          ex('Does "repeat forever: do nothing" halt?', [['Look at it.', 'It never stops.'], ['So for this case.', 'Easy to decide: no.']], 'No; individual cases can be easy'),
          ex('Then what exactly is impossible?', [['A single method…', '\\text{for every program and input}'], ['…that always answers correctly.', 'Cannot exist.']], 'One method that works for all programs'),
        ],
        practice: [
          ch('The halting problem shows that…', ['No single program can decide halting for all programs', 'All programs halt', 'No program halts', 'Computers are unreliable'], 'For all cases.', 'Undecidable in general.'),
          ch('The proof uses…', ['A program that does the opposite of what the decider predicts about itself', 'Measurements', 'Statistics', 'Faster hardware'], 'Self-reference.', 'Diagonal argument.'),
          ch('Which 1931 result uses a similar trick?', ['Gödel’s incompleteness theorem', 'Shannon’s entropy', 'Moore’s law', 'Ohm’s law'], 'Logic and arithmetic.', 'Gödel.'),
          pr('In what year did Turing publish "On Computable Numbers"?', 1936, 'Same year as Church.', '1936.'),
        ],
      },
      {
        title: 'Codebreaking and the Turing test',
        minutes: 15,
        explain: [
          'Enigma scrambled letters through rotors whose settings changed daily. Polish mathematicians led by Marian Rejewski broke early versions in the 1930s; at Bletchley Park Turing designed the Bombe to search settings fast.',
          'Enigma had an enormous number of settings, about 1.6 × 10²⁰ for the army version with its plugboard, so the Bombe used likely words ("cribs") to cut the search.',
          'In 1950 Turing proposed judging machine intelligence by conversation: if a judge cannot tell machine from human, does it think? Modern chat assistants have revived the question.',
        ],
        formulas: [['Rotor orders (3 of 5)', '5 \\times 4 \\times 3 = 60']],
        examples: [
          ex('Rotor starting positions with 3 rotors of 26 letters?', [['Multiply.', '26^3'], ['Result.', '17\\,576']], '17 576'),
          ex('Rotor orders choosing 3 of 5 rotors (order matters)?', [['Multiply.', '5 \\times 4 \\times 3'], ['Result.', '60']], '60'),
        ],
        practice: [
          pr('60 rotor orders × 17 576 positions = ?', 60 * 17576, 'Multiply.', '1 054 560.'),
          pr('Orders choosing 3 of 8 rotors (navy)?', 336, '8 × 7 × 6.', '336.'),
          ch('Who first broke Enigma in the 1930s?', ['Polish mathematicians led by Marian Rejewski', 'Alan Turing alone', 'The US Navy', 'Charles Babbage'], 'Before the war.', 'Rejewski and colleagues.'),
          ch('The Turing test judges a machine by…', ['Whether its conversation can pass as human', 'Its speed', 'Its size', 'Its power use'], 'The imitation game.', 'Conversation.'),
        ],
      },
    ],
  },

  'comp-004': {
    predict: {
      q: 'You must guess a number from 1 to 64 using yes/no questions. What is the fewest questions that always works?',
      options: ['6', '64', '32', '8'],
      answer: 0,
      reveal: 'Each well-chosen question halves the possibilities: 64 → 32 → 16 → 8 → 4 → 2 → 1. That is log₂ 64 = 6 bits.',
    },
    parts: [
      {
        title: 'Counting information in bits',
        minutes: 15,
        explain: [
          'One bit is the information in the answer to a fair yes/no question. Picking one of N equally likely options carries log₂ N bits.',
          'If N is not a power of two, log₂ N is not a whole number: one of 10 digits is log₂ 10 ≈ 3.32 bits.',
          'Information adds: two independent choices of 8 and 4 options carry 3 + 2 = 5 bits, the same as one choice of 32.',
        ],
        formulas: [['Equally likely options', 'I = \\log_2 N']],
        examples: [
          ex('Information in one letter, if all 26 were equally likely?', [['log₂ 26.', '\\ln 26 / \\ln 2'], ['Result.', '4.70\\ \\text{bits}']], 'About 4.7 bits'),
          ex('A 4-digit PIN?', [['10⁴ options.', '\\log_2 10^4 = 4 \\log_2 10'], ['Result.', '13.3\\ \\text{bits}']], 'About 13.3 bits'),
        ],
        practice: [
          pr('Bits to choose one of 256 options?', 8, '2⁸ = 256.', '8.'),
          pr('Bits in one roll of a fair six-sided die?', Math.log2(6), 'log₂ 6.', '2.585.', { tol: 0.005 }),
          pr('Bits in an 8-character password from 64 symbols?', 48, '8 × log₂ 64.', '48.'),
          ch('Two fair coins tossed together carry…', ['2 bits', '1 bit', '4 bits', '0.5 bits'], 'Information adds.', '1 + 1.'),
        ],
      },
      {
        title: 'Entropy',
        minutes: 20,
        explain: [
          'When options are not equally likely, the surprise of an outcome with probability p is −log₂ p bits. Rare outcomes are more surprising.',
          'Entropy is the average surprise: H = −Σ pᵢ log₂ pᵢ. It is largest when all options are equally likely.',
          'English text has an entropy of only about 1 bit per letter once you account for patterns (Shannon estimated 0.6–1.3 in 1951), far below 4.7.',
        ],
        formulas: [
          ['Surprise', 's = -\\log_2 p'],
          ['Entropy', 'H = -\\sum_i p_i\\log_2 p_i'],
        ],
        examples: [
          ex('Entropy of a coin with p = 0.25 heads?', [['Terms.', '-0.25\\log_2 0.25 - 0.75\\log_2 0.75'], ['Values.', '0.5 + 0.311 = 0.811']], '0.811 bits'),
          ex('Three outcomes with probabilities ½, ¼, ¼?', [['Terms.', '\\tfrac12(1) + \\tfrac14(2) + \\tfrac14(2)'], ['Sum.', '1.5']], '1.5 bits'),
        ],
        practice: [
          pr('Surprise of an outcome with probability 1/8, in bits?', 3, '−log₂(1/8).', '3.'),
          pr('Entropy of a coin with p = 0.1 heads?', H(0.1), 'Two terms.', '0.469 bits.', { tol: 0.003 }),
          pr('Entropy of four equally likely outcomes?', 2, 'log₂ 4.', '2 bits.'),
          ch('When is entropy largest?', ['When all outcomes are equally likely', 'When one outcome is certain', 'When there are two outcomes', 'Never'], 'Most uncertainty.', 'Uniform probabilities.'),
        ],
      },
      {
        title: 'Compression and noise',
        minutes: 15,
        explain: [
          'Shannon’s source coding theorem: on average you cannot store a source in fewer bits per symbol than its entropy, and you can get as close as you like.',
          'Morse code already used the idea: E, the commonest English letter, is a single dot. Huffman coding (1952) gives an optimal set of variable-length codes.',
          'Channel capacity: a channel of bandwidth B with signal-to-noise ratio S/N carries at most C = B log₂(1 + S/N) bits per second (the Shannon–Hartley law).',
        ],
        formulas: [['Shannon–Hartley', 'C = B\\log_2\\!\\left(1 + \\frac{S}{N}\\right)']],
        examples: [
          ex('B = 3000 Hz, S/N = 1000 (an old phone line). Capacity?', [['log₂ 1001 ≈ 9.97.', 'C = 3000 \\times 9.97'], ['Result.', '\\approx 29\\,900\\ \\text{bit/s}']], 'About 30 kbit/s'),
          ex('1000 coin tosses with p = 0.11. Smallest average compressed size?', [['Entropy per toss.', 'H(0.11) \\approx 0.5'], ['Total.', '\\approx 500\\ \\text{bits}']], 'About 500 bits'),
        ],
        practice: [
          pr('B = 1 MHz, S/N = 15. Capacity in Mbit/s?', 4, 'log₂ 16 = 4.', '4 Mbit/s.'),
          pr('B = 20 MHz, S/N = 255. Capacity in Mbit/s?', 160, 'log₂ 256 = 8.', '160 Mbit/s.'),
          pr('Least bits on average for 10 000 symbols of entropy 2.5 bits?', 25000, 'Multiply.', '25 000.'),
          ch('Why can’t an already compressed file be compressed much more?', ['Its bits are already nearly unpredictable (near maximum entropy)', 'Files have a size limit', 'Compression only works once by law', 'It can, always by half'], 'Entropy limit.', 'No predictability left to remove.'),
        ],
      },
    ],
  },

  'comp-005': {
    predict: {
      q: 'Moore’s law says transistors per chip double about every two years. Starting from 2300 in 1971, roughly how many by 2021?',
      options: ['Tens of billions', 'About 50 000', 'About 4600', 'About a million'],
      answer: 0,
      reveal: '50 years = 25 doublings: 2300 × 2²⁵ ≈ 7.7 × 10¹⁰. Real 2021 chips had roughly 10¹⁰ to 10¹¹ transistors.',
    },
    parts: [
      {
        title: 'Doubling arithmetic',
        minutes: 15,
        explain: [
          'If something doubles every T years, after t years it is multiplied by 2^(t/T). Ten doublings ≈ a thousand (2¹⁰ = 1024).',
          'Taking logarithms turns doubling into a straight line: log N grows by log 2 every T years. That is why the plot uses a log scale.',
          'To find T from data: T = (t₂ − t₁) / log₂(N₂/N₁).',
        ],
        formulas: [['Doubling time from two points', 'T = \\frac{t_2 - t_1}{\\log_2(N_2/N_1)}']],
        examples: [
          ex('8086 (1978, 29 000) to Pentium 4 (2000, 42 million). Doubling time?', [['Ratio.', '4.2\\times10^7 / 2.9\\times10^4 \\approx 1448'], ['log₂ 1448 ≈ 10.5.', 'T = 22/10.5 = 2.1\\ \\text{years}']], 'About 2.1 years'),
          ex('Growth factor in 30 years at T = 2?', [['Doublings.', '15'], ['Factor.', '2^{15} = 32\\,768']], 'About 33 000×'),
        ],
        practice: [
          pr('Growth factor in 20 years at T = 2 years?', 1024, '2¹⁰.', '1024.'),
          pr('Doubling time if a count grows 1000× in 15 years (to 0.1 year)?', 15 / Math.log2(1000), '15 / log₂ 1000.', '1.5 years.', { tol: 0.05 }),
          pr('4004 (1971, 2300) to Core 2 Duo (2006, 291 million). Doubling time in years?', 35 / Math.log2(2.91e8 / 2300), '35 / log₂(126 522).', 'About 2.1 years.', { tol: 0.05 }),
          ch('On a log scale, steady doubling looks like…', ['A straight line', 'A curve bending up', 'A flat line', 'A circle'], 'Equal steps in log.', 'Straight line.'),
        ],
      },
      {
        title: 'Switches made of materials',
        minutes: 15,
        explain: [
          'A vacuum tube switches current with electrons flying through a vacuum from a hot filament: it uses power just to stay warm and burns out.',
          'A transistor switches with a small voltage that changes how well a piece of doped silicon conducts. No heat-up, no moving parts, and it can be made microscopic.',
          'Making chips needs silicon purer than 99.9999999% ("nine nines"), grown as single crystals by the Czochralski method, then doped and patterned by lithography.',
        ],
        formulas: [['Impurity in nine-nines silicon', '1 - 0.999999999 = 10^{-9}']],
        examples: [
          ex('ENIAC’s roughly 17 500 tubes had one failure about every two days. How many tube-hours of running per failure?', [['Hours between failures.', '2 \\times 24 = 48'], ['Multiply by the number of tubes.', '17\\,500 \\times 48 = 840\\,000']], 'About 840 000 tube-hours: each tube was reliable, but there were so many'),
          ex('How many impurity atoms per billion silicon atoms in nine-nines silicon?', [['Fraction.', '10^{-9}'], ['Per billion.', '1']], 'About 1'),
        ],
        practice: [
          ch('Which material was the first transistor made from?', ['Germanium', 'Silicon', 'Copper', 'Glass'], 'Bell Labs 1947.', 'Germanium (silicon came later).'),
          ch('How are large single crystals of silicon grown?', ['The Czochralski method', 'Casting in sand moulds', 'Electroplating', 'Forging'], 'Pulling a seed from a melt.', 'Czochralski.'),
          pr('Impurity atoms per 10¹² silicon atoms at nine-nines purity?', 1000, '10⁻⁹ × 10¹².', '1000.'),
          ch('Why did transistors replace vacuum tubes?', ['Smaller, cooler, more reliable and cheaper to make in huge numbers', 'They were louder', 'They needed more power', 'Tubes were banned'], 'Compare.', 'All of the advantages.'),
        ],
      },
      {
        title: 'Lithography and the limits',
        minutes: 15,
        explain: [
          'Chip patterns are printed with light through masks. The smallest printable feature is roughly k₁λ/NA (Rayleigh): shorter wavelength λ and larger numerical aperture NA print finer.',
          'Deep ultraviolet at 193 nm was the workhorse for decades; extreme ultraviolet (EUV) at 13.5 nm entered mass production around 2019.',
          'Features of tens of nanometres are only about a hundred silicon atoms (0.2 nm apiece) across: quantum tunnelling and heat set hard limits.',
        ],
        formulas: [['Rayleigh resolution', 'R = k_1 \\frac{\\lambda}{NA}']],
        examples: [
          ex('λ = 193 nm, NA = 1.35, k₁ = 0.3. R?', [['Substitute.', '0.3 \\times 193 / 1.35'], ['Result.', '\\approx 43\\ \\text{nm}']], 'About 43 nm'),
          ex('λ = 13.5 nm, NA = 0.33, k₁ = 0.4. R?', [['Substitute.', '0.4 \\times 13.5 / 0.33'], ['Result.', '\\approx 16\\ \\text{nm}']], 'About 16 nm'),
        ],
        practice: [
          pr('λ = 13.5 nm, NA = 0.55, k₁ = 0.3. R in nm?', (0.3 * 13.5) / 0.55, 'Substitute.', '7.4 nm.', { tol: 0.05 }),
          pr('How many 0.2 nm silicon atoms span a 20 nm feature?', 100, 'Divide.', '100.'),
          pr('Ratio of DUV (193 nm) to EUV (13.5 nm) wavelength?', 193 / 13.5, 'Divide.', 'About 14.3.', { tol: 0.05 }),
          ch('Which company is the sole maker of EUV machines?', ['ASML', 'Intel', 'TSMC', 'Samsung'], 'Netherlands.', 'ASML.'),
        ],
      },
    ],
  },

  'comp-006': {
    predict: {
      q: 'Doubling the size of a list makes "check every pair of items" take how much longer?',
      options: ['About 4 times', 'About 2 times', 'The same', 'About 8 times'],
      answer: 0,
      reveal: 'Pairs grow like n². Double n and n² quadruples. That is why algorithms are compared by how they grow, not by a single timing.',
    },
    parts: [
      {
        title: 'Counting steps',
        minutes: 15,
        explain: [
          'Instead of timing on one machine, count basic steps as a function of input size n. Constant factors and small terms are dropped: 3n² + 5n is O(n²).',
          'Common growth rates, slowest to fastest: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).',
          'An O(2ⁿ) method doubles its work each time n grows by 1: hopeless beyond about n = 60 even on the fastest machines.',
        ],
        formulas: [['Pairs among n items', '\\binom{n}{2} = \\frac{n(n-1)}{2}']],
        examples: [
          ex('Pairs among 1000 items?', [['Formula.', '1000 \\times 999 / 2'], ['Result.', '499\\,500']], '499 500'),
          ex('n = 10⁶. Compare n log₂ n with n².', [['n log₂ n.', '10^6 \\times 20 = 2\\times10^7'], ['n².', '10^{12}']], '50 000 times fewer steps'),
        ],
        practice: [
          pr('Pairs among 100 items?', 4950, 'n(n − 1)/2.', '4950.'),
          pr('If an O(n²) method takes 1 s for n = 1000, how many seconds for n = 10 000?', 100, '(10)².', '100 s.'),
          pr('If an O(2ⁿ) method takes 1 s at n = 30, how many seconds at n = 40?', 1024, '2¹⁰.', '1024 s, about 17 minutes.'),
          ch('3n² + 100n + 7 is…', ['O(n²)', 'O(n)', 'O(n³)', 'O(1)'], 'Keep the fastest-growing term.', 'O(n²).'),
        ],
      },
      {
        title: 'Searching',
        minutes: 15,
        explain: [
          'Checking each item in turn takes up to n looks. On a sorted list, binary search compares with the middle item and throws away half, so it needs at most ⌈log₂(n + 1)⌉ looks.',
          'The same idea is bisection in numerical methods: to find where a function crosses zero, halve the interval each time.',
          'Each halving step gives one bit of information about where the item is, connecting this class to Shannon’s.',
        ],
        formulas: [['Worst-case looks', '\\lceil \\log_2(n+1) \\rceil']],
        examples: [
          ex('Binary search on 100 items, worst case?', [['log₂ 101 ≈ 6.66.', '\\lceil 6.66 \\rceil'], ['Result.', '7']], '7 looks'),
          ex('Bisection on an interval of length 1 to accuracy 0.001. Steps?', [['Need 2⁻ᵏ ≤ 0.001.', 'k \\ge \\log_2 1000 = 9.97'], ['Result.', '10']], '10 steps'),
        ],
        practice: [
          pr('Worst-case looks for binary search on 1 000 000 items?', 20, '⌈log₂(1 000 001)⌉.', '20.'),
          pr('Worst-case looks on 7 items?', 3, 'log₂ 8.', '3.'),
          pr('Bisection steps to shrink an interval of 1 to below 10⁻⁶?', 20, '2²⁰ ≈ 10⁶.', '20.'),
          ch('Binary search requires the list to be…', ['Sorted', 'Short', 'Numbers only', 'Random'], 'Phone book.', 'Sorted.'),
        ],
      },
      {
        title: 'Sorting',
        minutes: 15,
        explain: [
          'Simple sorts like bubble or insertion sort compare neighbours and take about n²/2 comparisons in the worst case.',
          'Merge sort (von Neumann, 1945) splits the list in half, sorts each half, and merges: about n log₂ n comparisons. Quicksort (Hoare, 1959) is usually as fast in practice.',
          'No method that only compares pairs can beat about n log₂ n in the worst case: there are n! possible orders, and each comparison gives at most 1 bit, so it needs log₂ n! ≈ n log₂ n comparisons.',
        ],
        formulas: [['Lower bound', '\\log_2 n! \\approx n\\log_2 n - 1.44\\,n']],
        examples: [
          ex('Comparisons for n = 1024: n²/2 vs n log₂ n?', [['n²/2.', '524\\,288'], ['n log₂ n.', '1024 \\times 10 = 10\\,240']], 'About 51 times fewer'),
          ex('Minimum comparisons to sort 3 items?', [['3! = 6 orders.', '\\log_2 6 = 2.58'], ['Round up.', '3']], '3'),
        ],
        practice: [
          pr('n log₂ n for n = 4096?', 4096 * 12, '2¹² = 4096.', '49 152.'),
          pr('n²/2 for n = 4096?', 4096 * 4096 / 2, 'Multiply.', '8 388 608.'),
          pr('Minimum comparisons in the worst case to sort 4 items?', 5, '⌈log₂ 24⌉.', '5.'),
          ch('Who described merge sort in 1945?', ['John von Neumann', 'Tony Hoare', 'Alan Turing', 'Grace Hopper'], 'EDVAC era.', 'von Neumann.'),
        ],
      },
    ],
  },

  'comp-007': {
    predict: {
      q: 'A program says: x = 5, then x = x + 3, then x = x × 2. What is x at the end?',
      options: ['16', '13', '10', '8'],
      answer: 0,
      reveal: 'Instructions run in order and each line changes x: 5, then 8, then 16. The "=" here means "store", not "equals".',
    },
    parts: [
      {
        title: 'Variables, decisions and loops',
        minutes: 15,
        explain: [
          'A variable is a named box holding a value. Assignment (x = x + 1) computes the right side, then stores it in the left.',
          'A decision runs some lines only if a condition is true (if temperature > 900: print("too hot")). A loop repeats lines while a condition holds or for each item in a list.',
          'With just these three ideas, plus arithmetic, you can write any algorithm (Böhm and Jacopini showed this in 1966).',
        ],
        formulas: [['Sum with a loop', 's = 0;\\ \\text{for } i = 1..n:\\ s = s + i \\Rightarrow s = \\tfrac{n(n+1)}{2}']],
        examples: [
          ex('Trace: s = 0; for i = 1 to 4: s = s + i × i.', [['Add squares.', '1 + 4 + 9 + 16'], ['Result.', 's = 30']], '30'),
          ex('Trace: x = 1; repeat while x < 100: x = x × 3. Final x?', [['Values.', '1, 3, 9, 27, 81, 243'], ['Stops when x ≥ 100.', '243']], '243'),
        ],
        practice: [
          pr('Trace: s = 0; for i = 1 to 10: s = s + i. Final s?', 55, 'n(n + 1)/2.', '55.'),
          pr('Trace: x = 2; repeat 5 times: x = x × 2. Final x?', 64, '2 × 2⁵.', '64.'),
          pr('Trace: n = 0; x = 1000; while x > 1: x = x / 2; n = n + 1. Final n?', 10, 'Halvings until ≤ 1.', '10 (1000/1024 < 1).'),
          ch('In x = x + 1, the "=" means…', ['Store the right-hand value in x', 'x equals x + 1 (a contradiction)', 'Compare', 'Delete x'], 'Assignment.', 'Store.'),
        ],
      },
      {
        title: 'Euclid’s loop',
        minutes: 15,
        explain: [
          'gcd(a, b) = gcd(b, a mod b), and gcd(a, 0) = a. Repeating the first rule must end because the remainder keeps shrinking.',
          'Lamé (1844) proved the number of steps is at most about 5 times the number of decimal digits of the smaller number; the worst cases are neighbouring Fibonacci numbers.',
          'The same loop is used today inside the cryptography that secures web connections.',
        ],
        formulas: [['Euclid', '\\gcd(a, b) = \\gcd(b,\\ a \\bmod b)']],
        examples: [
          ex('gcd(1071, 462).', [['1071 = 2 × 462 + 147; 462 = 3 × 147 + 21.', '(462, 147) \\to (147, 21)'], ['147 = 7 × 21 + 0.', '\\gcd = 21']], '21 in 3 steps'),
          ex('gcd(34, 21), counting steps.', [['Remainders.', '13, 8, 5, 3, 2, 1, 0'], ['Count.', '7']], '1, in 7 steps'),
        ],
        practice: [
          pr('gcd(252, 105)?', 21, '252 mod 105 = 42; 105 mod 42 = 21; 42 mod 21 = 0.', '21.'),
          pr('gcd(144, 89)?', 1, 'Consecutive Fibonacci numbers.', '1.'),
          pr('Number of division steps for gcd(13, 8)?', 5, 'Remainders 5, 3, 2, 1, 0.', '5.'),
          ch('Which pairs make Euclid’s method slowest?', ['Neighbouring Fibonacci numbers', 'Equal numbers', 'Powers of 10', 'Primes far apart'], 'Lamé.', 'Fibonacci neighbours.'),
        ],
      },
      {
        title: 'Languages and their history',
        minutes: 15,
        explain: [
          'Machine code is numbers; assembly gives them short names. High-level languages (FORTRAN 1957, COBOL 1959, C 1972, Python 1991) are translated by compilers or interpreters.',
          'Grace Hopper’s A-0 (1952) was among the first compilers. Her team’s 1947 logbook entry with a moth taped in is a famous early "bug".',
          'For engineers, Python with libraries such as NumPy is now a common tool for lab data, curve fitting and simulation.',
        ],
        formulas: [['Years between FORTRAN and Python', '1991 - 1957 = 34']],
        examples: [
          ex('Order these: C, FORTRAN, Python, COBOL.', [['Dates.', '1957, 1959, 1972, 1991'], ['Order.', 'FORTRAN, COBOL, C, Python']], 'FORTRAN, COBOL, C, Python'),
          ex('What does a compiler output?', [['It translates…', '\\text{source} \\to \\text{machine instructions}'], ['…before running.', 'An executable program.']], 'Machine instructions'),
        ],
        practice: [
          ch('Which language came first?', ['FORTRAN', 'C', 'Python', 'COBOL'], '1957.', 'FORTRAN.'),
          ch('Who created C?', ['Dennis Ritchie', 'Guido van Rossum', 'John Backus', 'Grace Hopper'], 'Bell Labs, 1972.', 'Ritchie.'),
          ch('Which language is most used today for data analysis and machine learning?', ['Python', 'COBOL', 'Assembly', 'FORTRAN II'], 'Easy to read.', 'Python.'),
          pr('How many years after A-0 (1952) did Python appear?', 39, '1991 − 1952.', '39.'),
        ],
      },
    ],
  },

  'comp-008': {
    predict: {
      q: 'You send a 1 MB photo. It is split into packets of about 1500 bytes. Roughly how many packets?',
      options: ['About 700', 'About 7', 'About 1500', 'One'],
      answer: 0,
      reveal: '1 000 000 / 1500 ≈ 667 packets (a few more counting headers). Each can take its own route and is reassembled at the end.',
    },
    parts: [
      {
        title: 'Packets and delays',
        minutes: 15,
        explain: [
          'A message is cut into packets, each with a header holding the source and destination addresses. Ethernet carries up to 1500 bytes of data per packet.',
          'Delay has parts: propagation (distance ÷ signal speed), transmission (packet size ÷ link rate), and queueing in busy routers.',
          'Bandwidth is how much per second; latency is how long the first bit takes. A cargo ship has huge bandwidth and terrible latency.',
        ],
        formulas: [
          ['Propagation', 't_p = \\frac{d}{v}'],
          ['Transmission', 't_t = \\frac{L}{R}'],
        ],
        examples: [
          ex('Transmission time of a 1500-byte packet at 100 Mbit/s?', [['Bits.', '1500 \\times 8 = 12\\,000'], ['Divide.', '12\\,000 / 10^8 = 120\\ \\mu\\text{s}']], '0.12 ms'),
          ex('Propagation over 3000 km of fibre (2 × 10⁸ m/s)?', [['Divide.', '3\\times10^6 / 2\\times10^8'], ['Result.', '15\\ \\text{ms}']], '15 ms'),
        ],
        practice: [
          pr('Packets for 3 MB at 1500 bytes each?', 2000, 'Divide.', '2000.'),
          pr('Propagation delay in ms over 6000 km of fibre (2 × 10⁸ m/s)?', 30, 'd/v.', '30 ms.'),
          pr('Seconds to send 100 MB over 50 Mbit/s?', 16, '800 Mbit / 50.', '16 s.'),
          ch('Which delay can no upgrade remove?', ['Propagation (speed of light in the medium)', 'Queueing', 'Transmission', 'Processing'], 'Physics.', 'Propagation.'),
        ],
      },
      {
        title: 'Shortest paths',
        minutes: 20,
        explain: [
          'Routers choose routes to keep delay low. Dijkstra’s method (1959) finds the shortest path from one node to all others.',
          'It keeps a tentative distance for every node, repeatedly picks the closest unfinished node, and updates its neighbours if going through it is shorter.',
          'Real internet routing between big networks (BGP) also weighs business agreements, not just distance.',
        ],
        formulas: [['Relaxation', 'd(v) \\leftarrow \\min\\big(d(v),\\ d(u) + w(u,v)\\big)']],
        examples: [
          ex('In the scene network, delay of A → C → E → F → G?', [['Add.', '15 + 10 + 15 + 10'], ['Result.', '50\\ \\text{ms}']], '50 ms'),
          ex('Delay of A → B → E → H → G?', [['Add.', '10 + 20 + 12 + 15'], ['Result.', '57\\ \\text{ms}']], '57 ms'),
        ],
        practice: [
          pr('Scene network: delay of A → B → D → F → G (ms)?', 42, '10 + 12 + 10 + 10.', '42.'),
          pr('Scene network: delay of A → C → H → G (ms)?', 60, '15 + 30 + 15.', '60.'),
          pr('Scene network with F–G broken: best delay (ms)?', 52, 'A → C → E → H → G.', '52.'),
          ch('Who published the shortest-path method in 1959?', ['Edsger Dijkstra', 'Vint Cerf', 'Paul Baran', 'Tim Berners-Lee'], 'Dutch computer scientist.', 'Dijkstra.'),
        ],
      },
      {
        title: 'Layers of the internet',
        minutes: 15,
        explain: [
          'IP moves packets between addresses, best effort. TCP on top numbers the packets, resends lost ones and puts them in order. The web (HTTP) runs on top of TCP.',
          'IPv4 addresses have 32 bits: about 4.3 billion addresses, which ran out; IPv6 uses 128 bits.',
          'Most intercontinental traffic travels through undersea fibre-optic cables of ultra-pure silica glass, not satellites.',
        ],
        formulas: [['Address counts', '2^{32} \\approx 4.3\\times10^9,\\quad 2^{128} \\approx 3.4\\times10^{38}']],
        examples: [
          ex('How many IPv4 addresses per person for 8 billion people?', [['Divide.', '4.3\\times10^9 / 8\\times10^9'], ['Result.', '\\approx 0.54']], 'About half an address each: not enough'),
          ex('Which layer resends a lost packet?', [['IP does not.', '\\text{best effort}'], ['TCP does.', '\\text{reliable delivery}']], 'TCP'),
        ],
        practice: [
          pr('IPv4 addresses (2³²) in billions, to one decimal?', 2 ** 32 / 1e9, 'Divide by 10⁹.', '4.3.', { tol: 0.05 }),
          ch('Which protocol puts packets back in order and resends lost ones?', ['TCP', 'IP', 'HTTP', 'Ethernet'], 'Transmission Control.', 'TCP.'),
          ch('Most traffic between continents travels by…', ['Undersea fibre-optic cables', 'Satellites', 'Radio towers', 'Copper telephone wires'], 'Glass.', 'Fibre.'),
          ch('When did the World Wide Web go public?', ['1991', '1969', '1983', '2001'], 'CERN.', '1991.'),
        ],
      },
    ],
  },

  'comp-009': {
    predict: {
      q: 'You fit a straight line to 10 noisy points. What does "least squares" choose?',
      options: ['The line making the sum of squared vertical misses smallest', 'The line through the first and last point', 'The line through the most points exactly', 'A random line'],
      answer: 0,
      reveal: 'Each miss is squared (so negatives do not cancel and big misses count more), then summed. The best line minimises that total.',
    },
    parts: [
      {
        title: 'Least squares',
        minutes: 20,
        explain: [
          'For a line through the origin, y = wx, the loss is L(w) = Σ (yᵢ − w xᵢ)². Setting dL/dw = 0 gives w = Σxᵢyᵢ / Σxᵢ².',
          'For y = mx + c, the best slope is m = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)², and the line passes through the mean point (x̄, ȳ).',
          'This is the same fit you do for lab data, such as stress against strain to find Young’s modulus.',
        ],
        formulas: [['Line through origin', 'w = \\frac{\\sum x_i y_i}{\\sum x_i^2}']],
        examples: [
          ex('Points (1, 2), (2, 3), (3, 7). Best w for y = wx?', [['Sums.', '\\sum xy = 2 + 6 + 21 = 29,\\ \\sum x^2 = 14'], ['Divide.', 'w = 29/14 = 2.07']], 'w ≈ 2.07'),
          ex('Points (0, 1), (2, 5). Best line y = mx + c?', [['Two points: fits exactly.', 'm = 4/2 = 2'], ['Through the mean (1, 3).', 'c = 1']], 'y = 2x + 1'),
        ],
        practice: [
          pr('Points (1, 3), (2, 5), (3, 8). Best w for y = wx (to 3 decimals)?', (3 + 10 + 24) / 14, 'Σxy / Σx².', '37/14 = 2.643.', { tol: 0.002 }),
          pr('Points (1, 2), (2, 4), (3, 6). Best w?', 2, 'They lie on y = 2x.', '2.'),
          pr('Loss for w = 2 on points (1, 3), (2, 5)?', 2, '(3 − 2)² + (5 − 4)².', '2.'),
          ch('Who published least squares in 1805?', ['Legendre', 'Gauss', 'Newton', 'Cauchy'], 'Gauss claimed earlier use.', 'Legendre.'),
        ],
      },
      {
        title: 'Gradient descent',
        minutes: 20,
        explain: [
          'When there is no neat formula (as with big neural networks), start somewhere and step downhill: w ← w − η L′(w), with learning rate η.',
          'For L = (w − w*)², each step multiplies the distance to w* by (1 − 2η). It converges if 0 < η < 1, fastest at η = 0.5.',
          'With many parameters the slope becomes the gradient, a vector pointing uphill in all directions at once.',
        ],
        formulas: [['Update', 'w_{k+1} = w_k - \\eta\\,\\nabla L(w_k)']],
        examples: [
          ex('L = (w − 3)², w = −1, η = 0.25. Two steps?', [['Slope −8: step +2.', 'w = 1'], ['Slope −4: step +1.', 'w = 2']], 'w = 2'),
          ex('Same, η = 1.2. One step from w = −1?', [['Step = −1.2 × (−8) = 9.6.', 'w = 8.6'], ['Distance grew from 4 to 5.6.', '\\text{diverging}']], 'w = 8.6: it overshoots'),
        ],
        practice: [
          pr('L = (w − 3)², w = 0, η = 0.1. Next w?', 0.6, 'Slope −6.', '0 + 0.6 = 0.6.'),
          pr('Same loss, distance factor per step for η = 0.3?', 0.4, '1 − 2η.', '0.4.'),
          pr('Distance to the minimum starts at 4. After 3 steps with factor 0.5?', 0.5, '4 × 0.5³.', '0.5.'),
          ch('Above which learning rate does L = (w − 3)² diverge?', ['1', '0.5', '0.1', '2'], '|1 − 2η| > 1.', 'η > 1.'),
        ],
      },
      {
        title: 'The perceptron rule',
        minutes: 15,
        explain: [
          'Rosenblatt’s perceptron outputs 1 if w·x + b > 0. After each mistake it nudges the weights: w ← w + η(target − output)x, b ← b + η(target − output).',
          'If the data can be split by a straight line, this rule is guaranteed to find such a line in a finite number of steps (Novikoff, 1962).',
          'Training, validation and test sets: fit on one part of the data and check on data the model has never seen, the same honest testing as in the Kuhn class.',
        ],
        formulas: [['Perceptron update', 'w \\leftarrow w + \\eta\\,(t - y)\\,x']],
        examples: [
          ex('w = (0, 0), b = 0, η = 1. Input (1, 1) with target 1; output is 0. Update?', [['t − y = 1.', 'w = (1, 1),\\ b = 1'], ['New output for (1, 1).', '1 + 1 + 1 > 0 \\Rightarrow 1']], 'w = (1, 1), b = 1'),
          ex('Then input (0, 0) with target 0; output is 1 (since b = 1). Update?', [['t − y = −1.', 'w = (1, 1) - 0 = (1, 1)'], ['Bias.', 'b = 1 - 1 = 0']], 'w = (1, 1), b = 0'),
        ],
        practice: [
          pr('w = (1, 1), b = −1.5. Output for (1, 0)? (1 if positive, else 0)', 0, '1 − 1.5 < 0.', '0.'),
          pr('w = (1, 1), b = −0.5. Output for (0, 1)?', 1, '1 − 0.5 > 0.', '1.'),
          ch('The perceptron rule is guaranteed to finish when…', ['The data can be split by a straight line', 'Always', 'Never', 'Only for XOR'], 'Linearly separable.', 'Novikoff’s theorem.'),
          ch('Why keep a test set the model never trains on?', ['To check it works on new data, not just memorised data', 'To save memory', 'To make training faster', 'It is not needed'], 'Honest testing.', 'Generalisation.'),
        ],
      },
    ],
  },

  'comp-010': {
    predict: {
      q: 'One artificial neuron draws one straight line. How could a network classify points inside a triangle?',
      options: ['Use three neurons for three lines, and a fourth that fires only if all three agree', 'It cannot', 'Use one bigger neuron', 'Use a curved neuron'],
      answer: 0,
      reveal: 'A hidden layer of neurons each draws a line; the next layer combines them (an AND of three half-planes). Layers build complicated shapes from simple pieces.',
    },
    parts: [
      {
        title: 'Neurons and layers',
        minutes: 15,
        explain: [
          'Each neuron computes z = Σ wᵢxᵢ + b and passes it through an activation: a step, the smooth sigmoid 1/(1 + e⁻ᶻ), or ReLU max(0, z), the common modern choice.',
          'A layer is many neurons reading the same inputs. Stacking layers lets later neurons combine earlier ones’ features.',
          'A network with one hidden layer of enough neurons can approximate any continuous function (the universal approximation theorem, 1989).',
        ],
        formulas: [
          ['Sigmoid', '\\sigma(z) = \\frac{1}{1 + e^{-z}}'],
          ['ReLU', '\\text{ReLU}(z) = \\max(0, z)'],
        ],
        examples: [
          ex('σ(0)?', [['e⁰ = 1.', '1/(1 + 1)'], ['Result.', '0.5']], '0.5'),
          ex('Parameters in a layer of 4 neurons each reading 3 inputs?', [['Weights.', '4 \\times 3 = 12'], ['Plus one bias each.', '12 + 4 = 16']], '16'),
        ],
        practice: [
          pr('σ(2) to 3 decimals?', 1 / (1 + Math.exp(-2)), '1/(1 + e⁻²).', '0.881.', { tol: 0.002 }),
          pr('ReLU(−3)?', 0, 'max(0, z).', '0.'),
          pr('Parameters in a layer of 10 neurons reading 784 inputs (a 28 × 28 image)?', 7850, '10 × 784 + 10.', '7850.'),
          ch('Which activation is the common modern default?', ['ReLU', 'Step', 'Square', 'Cosine'], 'max(0, z).', 'ReLU.'),
        ],
      },
      {
        title: 'Solving XOR with a hidden layer',
        minutes: 20,
        explain: [
          'XOR is 1 for (0, 1) and (1, 0) only. No single line separates those from (0, 0) and (1, 1).',
          'Two hidden neurons fix it: h₁ = OR(x, y) and h₂ = AND(x, y). Then the output is h₁ AND NOT h₂.',
          'Minsky and Papert knew multi-layer networks could do this; the open problem in 1969 was how to train them. Backpropagation answered it.',
        ],
        formulas: [['XOR from two layers', '\\text{XOR}(x, y) = \\text{OR}(x, y) \\land \\lnot\\,\\text{AND}(x, y)']],
        examples: [
          ex('Check (1, 1).', [['h₁ = OR = 1, h₂ = AND = 1.', ''], ['Output = 1 AND NOT 1.', '0']], '0, correct'),
          ex('Check (0, 1).', [['h₁ = 1, h₂ = 0.', ''], ['Output = 1 AND NOT 0.', '1']], '1, correct'),
        ],
        practice: [
          pr('With h₁ = OR, h₂ = AND, what is the output for (0, 0)?', 0, 'h₁ = 0.', '0.'),
          pr('How many of the 4 XOR corners can a single straight line get right at best?', 3, 'Try it in the scene.', '3.'),
          ch('What did Perceptrons (1969) show?', ['A single layer cannot compute XOR', 'Neural networks are impossible', 'Backpropagation works', 'Computers can think'], 'Single layer.', 'Limits of one layer.'),
          ch('What problem did backpropagation solve?', ['How to train networks with hidden layers', 'How to store data', 'How to build transistors', 'How to send packets'], '1986.', 'Training many layers.'),
        ],
      },
      {
        title: 'Backpropagation and the 2012 breakthrough',
        minutes: 15,
        explain: [
          'Backpropagation uses the chain rule from calculus to compute how the loss changes with every weight, layer by layer from the output backwards. Then gradient descent updates them all.',
          'Deep networks need lots of labelled data and arithmetic. ImageNet (2009) supplied over a million labelled images; graphics chips (GPUs) supplied fast parallel arithmetic.',
          'AlexNet (2012) had about 60 million parameters and cut the ImageNet top-5 error from 26.2% to 15.3%.',
        ],
        formulas: [['Chain rule', '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y}\\cdot\\frac{\\partial y}{\\partial z}\\cdot\\frac{\\partial z}{\\partial w}']],
        examples: [
          ex('y = 3w, L = y². dL/dw at w = 1?', [['dL/dy = 2y = 6; dy/dw = 3.', ''], ['Multiply.', '18']], '18'),
          ex('Relative error cut by AlexNet?', [['Difference.', '26.2 - 15.3 = 10.9'], ['Relative.', '10.9 / 26.2 = 0.42']], '42%'),
        ],
        practice: [
          pr('y = 2w + 1, L = y². dL/dw at w = 1?', 12, 'dL/dy = 2y = 6; dy/dw = 2.', '12.'),
          pr('z = 4w, y = z², L = 3y. dL/dw at w = 0.5?', 48, 'dL/dy = 3, dy/dz = 2z = 4, dz/dw = 4.', '48.'),
          pr('AlexNet’s top-5 error (in %)?', 15.3, '2012.', '15.3.'),
          ch('Which hardware made deep learning practical around 2012?', ['Graphics chips (GPUs)', 'Vacuum tubes', 'Punched cards', 'Relays'], 'Built for games.', 'GPUs.'),
        ],
      },
    ],
  },

  'comp-011': {
    predict: {
      q: 'A model is trained only to predict the next word of internet text. Which ability would you NOT expect it to have reliably?',
      options: ['Always telling the truth', 'Writing grammatical sentences', 'Continuing a story', 'Translating common phrases'],
      answer: 0,
      reveal: 'Text on the internet contains errors and the training goal rewards plausible text, not true text. Extra training and checking against sources reduce errors but do not remove them.',
    },
    parts: [
      {
        title: 'Next-word probabilities',
        minutes: 20,
        explain: [
          'Text is split into tokens (words or pieces of words). A language model assigns a score (logit) to every token in its vocabulary, and softmax turns scores into probabilities.',
          'Training adjusts the parameters to raise the probability of the token that actually came next. The loss is −log p(correct token), called cross-entropy, a close cousin of Shannon’s entropy.',
          'Generating text: sample a token, add it to the text, repeat. Temperature T divides the scores before softmax: low T is cautious, high T is adventurous.',
        ],
        formulas: [
          ['Softmax with temperature', 'p_i = \\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}'],
          ['Cross-entropy loss', 'L = -\\log p_{\\text{correct}}'],
        ],
        examples: [
          ex('Scores 1 and 0 at T = 1. Probabilities?', [['e¹ = 2.718, e⁰ = 1.', '2.718 / 3.718'], ['Result.', '0.73,\\ 0.27']], '0.73 and 0.27'),
          ex('Same scores at T = 0.5?', [['Scores become 2 and 0.', 'e^2/(e^2 + 1)'], ['Result.', '0.88']], '0.88: lower T sharpens'),
        ],
        practice: [
          pr('Scores 3 and 1 at T = 1. Probability of the first?', soft2(3, 1), 'e³/(e³ + e¹).', '0.881.', { tol: 0.002 }),
          pr('Scores 3 and 1 at T = 2. Probability of the first?', soft2(3, 1, 2), 'Divide scores by 2.', '0.731.', { tol: 0.002 }),
          pr('Cross-entropy loss (natural log) when the correct token had p = 0.5?', Math.log(2), '−ln 0.5.', '0.693.', { tol: 0.002 }),
          ch('As T → 0, sampling becomes…', ['Always the top-scoring token', 'Uniform random', 'Impossible', 'Alphabetical'], 'Sharpening.', 'Greedy choice.'),
        ],
      },
      {
        title: 'Attention',
        minutes: 15,
        explain: [
          'In "The bar cooled slowly, so it was soft", the word "it" should look back at "bar". Attention lets every token build a weighted mix of the others’ information.',
          'Each token makes a query q; every token offers a key k and a value v. Weights are softmax(q·k / √d), and the output is the weighted sum of values.',
          'Transformers stack many attention layers and process all tokens in parallel, which suits GPUs much better than earlier word-by-word networks.',
        ],
        formulas: [['Attention', '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d}}\\right)V']],
        examples: [
          ex('q = (1, 0), keys (2, 0) and (0, 2), d = 4. Weights?', [['Dot products / √4.', '2/2 = 1,\\ 0/2 = 0'], ['Softmax.', '0.73,\\ 0.27']], '0.73 and 0.27'),
          ex('Values 10 and 0 with those weights. Output?', [['Weighted sum.', '0.73 \\times 10 + 0.27 \\times 0'], ['Result.', '7.3']], '7.3'),
        ],
        practice: [
          pr('q·k = 6 and d = 9. Scaled score?', 2, '6 / √9.', '2.'),
          pr('Two equal scores. Weight on each?', 0.5, 'Softmax of equal numbers.', '0.5.'),
          pr('Weights 0.8 and 0.2 on values 5 and 10. Output?', 6, '0.8 × 5 + 0.2 × 10.', '6.'),
          ch('Why do transformers suit GPUs?', ['They process all tokens in parallel', 'They use fewer numbers', 'They need no training', 'They run on punched cards'], 'Parallel.', 'Parallel attention.'),
        ],
      },
      {
        title: 'Scale and its limits',
        minutes: 15,
        explain: [
          'Scaling laws (Kaplan et al., 2020): test loss falls as a smooth power law as parameters, data and compute grow. This made it worth building ever larger models.',
          'GPT-3 had 175 billion parameters. Stored at 2 bytes each, that is 350 GB just for the weights.',
          'Limits: models can hallucinate, reflect biases in their training text, and have a knowledge cutoff date. Good practice is to ask for sources and check them, the reason this app cites everything.',
        ],
        formulas: [['Power-law scaling', 'L(N) \\approx \\left(\\frac{N_c}{N}\\right)^{\\alpha},\\quad \\alpha \\approx 0.076']],
        examples: [
          ex('Memory for 7 billion parameters at 2 bytes each?', [['Multiply.', '7\\times10^9 \\times 2'], ['Result.', '14\\ \\text{GB}']], '14 GB'),
          ex('With α = 0.076, how much does loss fall if N grows 10×?', [['Factor.', '10^{-0.076}'], ['Result.', '0.84']], 'About 16% lower'),
        ],
        practice: [
          pr('Memory in GB for 175 billion parameters at 2 bytes each?', 350, 'Multiply.', '350 GB.'),
          pr('Loss factor when N grows 100× with α = 0.076 (3 decimals)?', 100 ** -0.076, '100^(−0.076).', '0.705.', { tol: 0.002 }),
          ch('A language model gives a reference you cannot find anywhere. Most likely…', ['It was invented (hallucinated)', 'The library deleted it', 'It is secret', 'You must trust it'], 'Plausible text.', 'Check sources.'),
          ch('In what year was the transformer introduced?', ['2017', '2012', '2020', '1986'], '"Attention Is All You Need".', '2017.'),
        ],
      },
    ],
  },

  'comp-012': {
    predict: {
      q: 'Training compute for top AI models doubled about every 6 months for a decade. How much growth is that?',
      options: ['About a million times', 'About 20 times', 'About 1000 times', 'About a billion times'],
      answer: 0,
      reveal: '10 years = 20 doublings = 2²⁰ ≈ 10⁶. Moore’s law over the same decade gave only about 30 times.',
    },
    parts: [
      {
        title: 'Compute, chips and money',
        minutes: 15,
        explain: [
          'Training compute is counted in arithmetic operations (FLOP). A rough rule for language models is C ≈ 6 N D, with N parameters and D training tokens.',
          'GPT-3: N = 1.75 × 10¹¹, D ≈ 3 × 10¹¹ tokens gives about 3 × 10²³ operations, matching the published 3.14 × 10²³.',
          'A chip doing 10¹⁵ useful operations per second would need about 3 × 10⁸ seconds (10 years) for that alone; training uses thousands of chips at once.',
        ],
        formulas: [['Training compute', 'C \\approx 6ND']],
        examples: [
          ex('N = 10⁹, D = 2 × 10¹⁰. C?', [['Multiply.', '6 \\times 10^9 \\times 2\\times10^{10}'], ['Result.', '1.2\\times10^{20}']], '1.2 × 10²⁰ operations'),
          ex('Time on 1000 chips at 10¹⁴ operations per second each, for C = 3 × 10²³?', [['Total rate.', '10^{17}\\ \\text{per second}'], ['Divide.', '3\\times10^6\\ \\text{s} \\approx 35\\ \\text{days}']], 'About 35 days'),
        ],
        practice: [
          pr('C ≈ 6ND for N = 7 × 10⁹ and D = 10¹² tokens. Exponent of 10 (to one decimal)?', Math.log10(6 * 7e9 * 1e12), 'log₁₀(4.2 × 10²²).', '22.6.', { tol: 0.05 }),
          pr('Growth factor per year when doubling every 6 months?', 4, '2².', '4.'),
          pr('Days for 10²⁴ operations on 10 000 chips at 10¹⁵ per second each (one decimal)?', 1e24 / 1e19 / 86400, '10²⁴ / 10¹⁹ s.', '1.2 days.', { tol: 0.05 }),
          ch('What does FLOP count?', ['Arithmetic operations', 'Chips', 'Watts', 'Words'], 'Floating-point operations.', 'Operations.'),
        ],
      },
      {
        title: 'Energy and materials',
        minutes: 15,
        explain: [
          'Energy = power × time. A training run of thousands of chips for months uses gigawatt-hours; answering billions of questions afterwards (inference) can use even more over time.',
          'The International Energy Agency estimated data centres used about 240–340 TWh in 2022, roughly 1–1.3% of world electricity.',
          'AI hardware depends on materials: ultra-pure silicon, EUV mirrors made of molybdenum–silicon multilayers, copper and cobalt wiring, and cooling. Materials engineers are part of the AI story.',
        ],
        formulas: [['Energy', 'E = P\\,t']],
        examples: [
          ex('5000 chips at 700 W for 60 days. Energy?', [['Power.', '5000 \\times 700 = 3.5\\ \\text{MW}'], ['Time 1440 h.', '3.5 \\times 1440 = 5040\\ \\text{MWh}']], 'About 5 GWh'),
          ex('Households (1200 kWh per year) powered for a year by 5 GWh?', [['Divide.', '5\\times10^6\\ \\text{kWh} / 1200'], ['Result.', '\\approx 4200']], 'About 4200'),
        ],
        practice: [
          pr('Energy in MWh: 1000 chips at 500 W for 30 days?', 360, '0.5 MW × 720 h.', '360 MWh.'),
          pr('Share of world electricity (%) if data centres use 300 TWh of 25 000 TWh?', 1.2, 'Divide × 100.', '1.2%.'),
          ch('EUV mirrors are made of multilayers of…', ['Molybdenum and silicon', 'Gold and lead', 'Glass and water', 'Iron and carbon'], 'Mo/Si.', 'Molybdenum–silicon.'),
          ch('Which uses more energy over a popular model’s life, often?', ['Inference (answering questions) across many users', 'Only the first training run', 'Neither uses energy', 'Writing the paper'], 'Billions of queries.', 'Inference can dominate.'),
        ],
      },
      {
        title: 'Using AI wisely',
        minutes: 15,
        explain: [
          'AI helps science: protein structure prediction (2024 Nobel Prize), screening millions of candidate materials, and analysing microscope images.',
          'Risks discussed by researchers and governments include errors stated confidently, bias, misuse, privacy and job changes. The EU AI Act (2024) sorts uses by risk level.',
          'A practical rule for a student: use AI to explain and to suggest, then verify with a textbook, a calculation or a primary source. Treat an AI citation like any other claim: check it exists and says what is claimed.',
        ],
        formulas: [['Error compounding', 'P(\\text{all right}) = p^n']],
        examples: [
          ex('An assistant is 95% right per fact. Chance all 10 facts in an answer are right?', [['Power.', '0.95^{10}'], ['Result.', '0.60']], 'About 60%'),
          ex('At 99% per fact?', [['Power.', '0.99^{10}'], ['Result.', '0.90']], 'About 90%'),
        ],
        practice: [
          pr('95% right per fact. Chance all 20 facts are right (2 decimals)?', 0.95 ** 20, '0.95²⁰.', '0.36.', { tol: 0.005 }),
          pr('90% right per step. Chance a 5-step calculation is all right (2 decimals)?', 0.9 ** 5, '0.9⁵.', '0.59.', { tol: 0.005 }),
          ch('Best way to use an AI answer about a melting point?', ['Check it against a reliable table or textbook', 'Trust it if it sounds confident', 'Ignore all AI', 'Ask it to promise'], 'Verify.', 'Check a source.'),
          ch('The EU AI Act (2024) mainly…', ['Sorts AI uses by risk and sets rules for each level', 'Bans all AI', 'Funds chip factories', 'Sets internet speeds'], 'Risk-based.', 'Risk categories.'),
        ],
      },
    ],
  },
};
