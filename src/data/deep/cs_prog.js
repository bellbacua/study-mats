// Computer Science program, Fundamentals of Programming: each class split into
// parts. Short programs are shown in code boxes (`code`); the learner traces
// them by hand and types the value a variable ends with, or picks an option
// (first option correct, shown shuffled).

const ex = (problem, steps, answer, code) => ({ problem, steps, answer, ...(code ? { code } : {}) });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const CS_PROG = {
  'cs-101': {
    predict: {
      q: 'a = 5, then b = a + 2, then a = 10. What is in b now?',
      options: ['7', '12', '10', 'It is an error'],
      answer: 0,
      reveal: 'b got the value 7 when its line ran. Changing a afterwards does not reach back into b: boxes hold values, not formulas.',
    },
    parts: [
      {
        title: 'A program is a list of instructions',
        minutes: 15,
        explain: [
          'A computer has no common sense. It does exactly what each instruction says, one instruction at a time, from the top of the program to the bottom.',
          'A Python program is plain text. Each line is one instruction (a “statement”). print(...) shows a value on the screen.',
          'To understand a program, trace it: go line by line with a pencil, and write down what each line changes. This is the most important skill in programming, and you will use it in every class.',
        ],
        code: [['A first program', 'print("Hello")\nprint(2 + 3)\nprint("2 + 3")']],
        examples: [
          ex('What does this program show?', [['Line 1 shows the text between quotes.', ''], ['Line 2 works out 2 + 3 first.', '5'], ['Line 3 is text in quotes, so it is shown exactly as written.', '']], 'Hello, then 5, then 2 + 3', 'print("Hello")\nprint(2 + 3)\nprint("2 + 3")'),
          ex('How many lines appear on the screen?', [['Each print shows one line.', ''], ['Count the prints.', '3']], '3', 'print(1)\nprint(1 + 1)\nprint(1 + 1 + 1)'),
        ],
        practice: [
          pr('What number does print(4 * 5 - 2) show?', 18, 'Multiply before subtracting.', '20 − 2 = 18.'),
          pr('How many lines does this show?', 4, 'One per print.', 'Four prints, four lines.', { code: 'print("a")\nprint("b")\nprint("c")\nprint("d")' }),
          ch('What does print("7 * 2") show?', ['7 * 2', '14', '72', 'Nothing'], 'Look at the quotes.', 'Text in quotes is shown as it is: 7 * 2.'),
          pr('What does print(100 - 1 - 1) show?', 98, 'Left to right.', '99 − 1 = 98.'),
        ],
      },
      {
        title: 'Variables and assignment',
        minutes: 20,
        explain: [
          'A variable is a named box. The line a = 5 makes a box called a (if it does not exist yet) and puts 5 into it.',
          'The = sign is an instruction, “put the value on the right into the box on the left”. It is not a statement that two things are equal. So x = x + 1 makes sense: work out the right side with the old x, then store the answer back in x.',
          'A box holds one value at a time. Storing a new value throws the old one away. Another variable that was copied from it earlier keeps its own copy.',
        ],
        code: [['Replace, don’t compare', 'x = 4\nx = x + 1   # x is now 5\nx = x * 2   # x is now 10']],
        formulas: [['Read = as “becomes”', '\\texttt{x = x + 1}:\\quad x_{\\text{new}} = x_{\\text{old}} + 1']],
        examples: [
          ex('Trace the program. What is n at the end?', [['n = 2.', 'n = 2'], ['n = n * 5 uses the old n.', 'n = 10'], ['n = n - 3.', 'n = 7']], '7', 'n = 2\nn = n * 5\nn = n - 3'),
          ex('What are p and q at the end?', [['p = 3, q = p.', 'q = 3'], ['p = p + 10 changes only p.', 'p = 13'], ['q kept its copy.', 'q = 3']], 'p = 13, q = 3', 'p = 3\nq = p\np = p + 10'),
        ],
        practice: [
          pr('What is k at the end?', 9, 'One line at a time.', 'k = 1, then 3, then 9.', { code: 'k = 1\nk = k * 3\nk = k * 3' }),
          pr('What is total at the end?', 60, 'Each line adds to the old total.', '0 + 10 + 20 + 30 = 60.', { code: 'total = 0\ntotal = total + 10\ntotal = total + 20\ntotal = total + 30' }),
          pr('What is b at the end?', 8, 'b copied a’s value when its line ran.', 'b = 8; changing a later does not change b.', { code: 'a = 8\nb = a\na = 1' }),
          pr('What is x at the end?', 6, 'Trace carefully: y is used after it changes.', 'x = 2, y = 3, y = 3 + 2 = 5, x = 5 + 1 = 6.', { code: 'x = 2\ny = 3\ny = y + x\nx = y + 1' }),
          ch('Which line swaps the values of a and b correctly?', ['a, b = b, a', 'a = b', 'b = a', 'a = a + b'], 'Python can assign two boxes at once.', 'a, b = b, a works out the right side first (b, a), then stores both.'),
        ],
      },
      {
        title: 'Arithmetic in Python',
        minutes: 20,
        explain: [
          'Python uses + − * for add, subtract, multiply, and / for division, which always gives a decimal: 7 / 2 = 3.5.',
          '// is whole-number (floor) division: 7 // 2 = 3. % is the remainder: 7 % 2 = 1. Together they split a number: 7 = 2 × 3 + 1.',
          '** is a power: 2 ** 10 = 1024. As in algebra, powers come first, then * / // %, then + and −; brackets override.',
          'Careful with negatives: // rounds DOWN, toward minus infinity, so −7 // 2 = −4, and then −7 % 2 = 1 so that −7 = 2 × (−4) + 1 still holds.',
        ],
        formulas: [
          ['Division with remainder', 'a = b \\times (a\\ \\texttt{//}\\ b) + (a\\ \\%\\ b)'],
          ['Order', '\\texttt{**}\\ \\text{then}\\ \\texttt{* / // \\%}\\ \\text{then}\\ \\texttt{+ -}'],
        ],
        examples: [
          ex('Split 100 seconds into minutes and seconds.', [['Whole minutes.', '100\\ \\texttt{//}\\ 60 = 1'], ['Seconds left over.', '100\\ \\%\\ 60 = 40']], '1 minute 40 seconds'),
          ex('Work out 2 + 3 * 2 ** 2.', [['Power first.', '2^2 = 4'], ['Then multiply.', '3 \\times 4 = 12'], ['Then add.', '2 + 12 = 14']], '14'),
        ],
        practice: [
          pr('17 // 5 = ?', 3, 'How many whole 5s fit in 17?', '5 × 3 = 15 ≤ 17, so 3.'),
          pr('17 % 5 = ?', 2, 'What is left after taking out the 5s?', '17 − 15 = 2.'),
          pr('2 ** 8 = ?', 256, 'Double eight times.', '256.'),
          pr('What is (2 + 3) * 4 - 6 / 3 in Python?', 18, 'Brackets, then * and /, then −. / gives a decimal.', '20 − 2.0 = 18.0.'),
          pr('-7 // 2 = ?', -4, 'Floor division rounds down, toward minus infinity.', '−3.5 rounded down is −4.'),
        ],
      },
      {
        title: 'Kinds of values: numbers and text',
        minutes: 20,
        explain: [
          'Every value has a type. 7 is an int (whole number), 3.5 is a float (decimal), "hello" is a str (string: text). type(x) tells you which.',
          'The same symbol can do different things to different types. 3 + 4 is 7, but "3" + "4" is "34": + joins strings end to end. "ab" * 3 is "ababab".',
          'int("12") turns text into a number, str(12) turns a number into text. input() always gives text, so a program that reads a number must convert it.',
        ],
        code: [['Text that looks like a number is still text', 'age = input("Age? ")    # the user types 17\nprint(age + "1")         # shows 171\nprint(int(age) + 1)      # shows 18']],
        examples: [
          ex('What does print("5" * 3) show?', [['* with a string repeats it.', ''], ['Three copies of “5”.', '']], '555'),
          ex('What does print(int("20") // 3) show?', [['Convert the text first.', '20'], ['Whole-number division.', '20\\ \\texttt{//}\\ 3 = 6']], '6'),
        ],
        practice: [
          pr('What number does print(int("12") * 2) show?', 24, 'Convert, then multiply.', '12 × 2 = 24.'),
          ch('What does print("12" * 2) show?', ['1212', '24', '122', 'An error'], 'Repeating text.', 'The string is repeated: 1212.'),
          pr('len("Mindanao") counts letters. What is it?', 8, 'Count every character.', 'M-i-n-d-a-n-a-o: 8.'),
          ch('A program does age = input() and the user types 17. What does age + 1 do?', ['Error: you cannot add a number to text', '18', '171', '17'], 'input() gives text.', 'Python refuses to add str and int; write int(age) + 1.'),
        ],
      },
    ],
  },

  'cs-102': {
    predict: {
      q: 'Which of these years was NOT a leap year?',
      options: ['1900', '2000', '2024', '1996'],
      answer: 0,
      reveal: '1900 is divisible by 4, but it is a century year not divisible by 400, so the 1582 rule skips it. 2000 is divisible by 400 and kept its 29 February.',
    },
    parts: [
      {
        title: 'True or false: comparisons',
        minutes: 15,
        explain: [
          'A comparison asks a question whose answer is True or False (a Boolean, after George Boole).',
          'Python writes them == (equal), != (not equal), <, >, <= (at most), >= (at least). Note the double ==: a single = means “store”.',
          'Combine tests with and (both must be True), or (at least one True) and not (flips it).',
        ],
        formulas: [['Divisible by k', '\\texttt{n \\% k == 0}']],
        code: [['Comparisons', 'x = 7\nprint(x > 5)               # True\nprint(x == 5)              # False\nprint(x > 5 and x < 10)    # True']],
        examples: [
          ex('Is 91 divisible by 7?', [['Remainder.', '91\\ \\%\\ 7 = 0'], ['So the test is True.', '91 = 7 \\times 13']], 'Yes: 91 % 7 == 0 is True'),
          ex('x = 12. Is x % 2 == 0 and x % 3 == 0 True?', [['12 % 2 = 0: True.', ''], ['12 % 3 = 0: True.', ''], ['and: both True.', '']], 'True (12 is divisible by 6)'),
        ],
        practice: [
          ch('x = 4. What is x != 4?', ['False', 'True', '4', '0'], '!= means “not equal”.', 'x is equal to 4, so False.'),
          ch('a = 3, b = 8. What is a > 5 or b > 5?', ['True', 'False', '8', 'An error'], 'or needs at least one.', 'b > 5 is True.'),
          pr('How many of the numbers 1 to 20 make n % 3 == 0 True?', 6, '3, 6, 9, …', '3, 6, 9, 12, 15, 18: six.'),
          ch('What is not (5 > 3)?', ['False', 'True', '5', '3'], 'Work out the inside first.', '5 > 3 is True; not flips it.'),
        ],
      },
      {
        title: 'if, elif and else',
        minutes: 20,
        explain: [
          'if test: runs the indented lines under it only when the test is True. else: runs its lines when it is False.',
          'elif (else if) tries another test. Python checks the tests from the top and runs only the FIRST branch whose test is True; the rest are skipped.',
          'Indentation (the spaces at the start of a line) shows which lines belong to the if. Python is strict about it.',
        ],
        code: [['Grading', 'mark = 83\nif mark >= 90:\n    grade = "A"\nelif mark >= 80:\n    grade = "B"\nelif mark >= 70:\n    grade = "C"\nelse:\n    grade = "F"']],
        examples: [
          ex('With the grading program, what grade does 83 get?', [['83 >= 90? False.', ''], ['83 >= 80? True: grade = "B" and stop.', '']], 'B'),
          ex('What is y at the end?', [['x = 5: is x > 10? No.', ''], ['So the else runs.', 'y = 5 \\times 2 = 10']], '10', 'x = 5\nif x > 10:\n    y = x - 10\nelse:\n    y = x * 2'),
        ],
        practice: [
          pr('What is y at the end?', 3, 'Check the first test.', '−3 < 0 is True, so y = 0 − (−3) = 3.', { code: 'x = -3\nif x < 0:\n    y = 0 - x\nelse:\n    y = x' }),
          ch('With the grading program, which grade does exactly 70 get?', ['C', 'B', 'F', 'A'], '>= includes the edge.', '70 >= 90 no, 70 >= 80 no, 70 >= 70 yes: C.'),
          pr('What is fee at the end?', 50, 'Only the first True branch runs.', 'age = 12: 12 < 5 is False, 12 < 18 is True, so fee = 50.', { code: 'age = 12\nif age < 5:\n    fee = 0\nelif age < 18:\n    fee = 50\nelse:\n    fee = 100' }),
          ch('If the grading program checked mark >= 70 FIRST, what would 95 get?', ['C', 'A', 'B', 'F'], 'The first True branch wins.', '95 >= 70 is True first, so C. Put the strictest test first.'),
        ],
      },
      {
        title: 'The leap-year rule',
        minutes: 20,
        explain: [
          'The Julian rule (45 BC): a leap year every 4 years, average 365.25 days. The real year is about 365.2422 days, so the calendar ran 11 minutes a year slow and drifted.',
          'The Gregorian rule (1582): divisible by 4 → leap, EXCEPT century years (divisible by 100) → not leap, EXCEPT those divisible by 400 → leap after all.',
          'In 400 years that gives 100 − 3 = 97 leap days, so the average year is 365 + 97/400 = 365.2425 days.',
        ],
        formulas: [
          ['Leap year test', '(y\\ \\%\\ 4 = 0\\ \\text{and}\\ y\\ \\%\\ 100 \\ne 0)\\ \\text{or}\\ y\\ \\%\\ 400 = 0'],
          ['Average Gregorian year', '365 + \\tfrac{97}{400} = 365.2425\\ \\text{days}'],
        ],
        code: [['As a program', 'y = 2100\nif y % 400 == 0:\n    leap = True\nelif y % 100 == 0:\n    leap = False\nelif y % 4 == 0:\n    leap = True\nelse:\n    leap = False']],
        examples: [
          ex('Is 2100 a leap year?', [['2100 % 400 = 100, not 0.', ''], ['2100 % 100 = 0: a century year.', ''], ['So not leap.', '']], 'No'),
          ex('How many leap years from 1901 to 2000, inclusive?', [['Every 4th year: 1904 to 2000.', '\\frac{2000 - 1904}{4} + 1 = 25'], ['2000 is divisible by 400, so it stays.', '25']], '25'),
        ],
        practice: [
          pr('How many days does the year 2000 have?', 366, 'Divisible by 400.', '2000 is a leap year: 366 days.'),
          pr('How many leap years are there from 1801 to 2000, inclusive?', 49, 'Count multiples of 4, then remove the century years that are not divisible by 400.', '50 multiples of 4 (1804 … 2000); 1900 is not leap; 2000 is. 49.'),
          pr('How many leap days in 400 Gregorian years?', 97, '100 multiples of 4, minus 3 century years.', '100 − 3 = 97.'),
          ch('Is 1700 a leap year in the Gregorian calendar?', ['No', 'Yes'], 'Century year: check 400.', '1700 % 400 = 100, so no.'),
        ],
      },
      {
        title: 'Planning decisions: flow diagrams',
        minutes: 15,
        explain: [
          'Before writing a program, draw it. Goldstine and von Neumann’s 1947 flow diagrams used boxes for steps and branch points for decisions; today a diamond is the usual shape for a yes/no test.',
          'Every path from start to end should be one you meant. Test one input for each path: for the leap-year rule that is a plain year (2023), a 4-year (2024), a century (1900) and a 400-year (2000).',
          'Nested ifs (an if inside another) and elif chains can express the same logic; choose the one that is easier to read.',
        ],
        formulas: [['Paths to test', '\\text{one input per branch: }2023,\\ 2024,\\ 1900,\\ 2000']],
        examples: [
          ex('How many different outcomes does the leap-year flow diagram have (counting each end box)?', [['Not divisible by 4 → not leap.', ''], ['Divisible by 4 but not 100 → leap; by 100 but not 400 → not leap; by 400 → leap.', '4']], '4 paths'),
          ex('A shop: free delivery if the order is at least ₱1,500 OR the customer is a member. Which test?', [['Either is enough.', ''], ['Use or.', '']], 'order >= 1500 or member'),
        ],
        practice: [
          pr('A flow diagram has 3 yes/no diamonds in a row, each leading to the next on “yes” and to an end box on “no”, and the last “yes” to an end box too. How many end boxes?', 4, 'Each diamond’s “no” plus the final “yes”.', '3 + 1 = 4.'),
          ch('To test a two-way if/else fully, you need at least…', ['2 inputs, one for each branch', '1 input', '4 inputs', '100 inputs'], 'One per path.', 'Each branch must run once.'),
          ch('A ride needs height >= 120 and age >= 10. A 9-year-old who is 130 cm tall. Allowed?', ['No', 'Yes'], 'and needs both.', 'age >= 10 is False.'),
          pr('A test: x % 2 == 0 or x % 5 == 0. How many of 1 to 10 make it True?', 6, 'Even numbers, plus 5.', '2, 4, 5, 6, 8, 10: six.'),
        ],
      },
    ],
  },

  'cs-103': {
    predict: {
      q: 'A loop adds 1 + 2 + 3 + … + 100. Which total does it reach?',
      options: ['5050', '5000', '10100', '4950'],
      answer: 0,
      reveal: 'Fifty pairs (1 + 100, 2 + 99, …) each adding to 101: 50 × 101 = 5050, the answer the young Gauss is said to have found at once.',
    },
    parts: [
      {
        title: 'for loops and range',
        minutes: 20,
        explain: [
          'for i in range(5): runs its indented body 5 times, with i = 0, 1, 2, 3, 4. range stops BEFORE its end number.',
          'range(a, b) gives a, a + 1, …, b − 1: that is b − a numbers. range(a, b, step) jumps by step.',
          'for x in some_list: runs once for each item of the list, with x set to that item.',
        ],
        formulas: [['Items in range(a, b)', 'b - a'], ['Items in range(a, b, s), s > 0', '\\left\\lceil \\tfrac{b-a}{s} \\right\\rceil']],
        examples: [
          ex('What does this show?', [['i takes 1, 2, 3.', ''], ['Each time print i * 10.', '10,\\ 20,\\ 30']], '10, 20, 30', 'for i in range(1, 4):\n    print(i * 10)'),
          ex('How many numbers does range(2, 20, 5) give?', [['2, 7, 12, 17 (22 is past 20).', ''], ['Count.', '4']], '4'),
        ],
        practice: [
          pr('How many times does the body of for i in range(10) run?', 10, '0 to 9.', '10.'),
          pr('How many numbers are in range(5, 15)?', 10, 'b − a.', '15 − 5 = 10.'),
          pr('How many numbers are in range(0, 30, 4)?', 8, '0, 4, 8, …', '0, 4, 8, 12, 16, 20, 24, 28: eight.'),
          pr('What is the last number in range(3, 20, 4)?', 19, '3, 7, 11, 15, …', '3, 7, 11, 15, 19.'),
        ],
      },
      {
        title: 'Running totals and counters',
        minutes: 20,
        explain: [
          'The most common loop of all keeps a running total: start total = 0 before the loop, and inside it do total = total + x.',
          'A counter is the same with + 1: count = count + 1 each time something you are looking for turns up. Put an if inside the loop to count only some items.',
          'Always set the total or counter BEFORE the loop. If you set it inside, it starts again from 0 every time round.',
        ],
        code: [['Total and count', 'marks = [78, 92, 65, 88]\ntotal = 0\npassed = 0\nfor m in marks:\n    total = total + m\n    if m >= 75:\n        passed = passed + 1']],
        formulas: [['Average', '\\text{average} = \\frac{\\text{total}}{\\text{count}}']],
        examples: [
          ex('With marks = [78, 92, 65, 88], what are total and passed?', [['Add them.', '78 + 92 + 65 + 88 = 323'], ['Marks of 75 or more: 78, 92, 88.', '\\text{passed} = 3']], 'total = 323, passed = 3'),
          ex('What is s at the end?', [['i = 1, 3, 5, 7, 9.', ''], ['Add them.', '1 + 3 + 5 + 7 + 9 = 25']], '25', 's = 0\nfor i in range(1, 10, 2):\n    s = s + i'),
        ],
        practice: [
          pr('What is s at the end?', 30, 'i = 2, 4, 6, 8, 10.', '2 + 4 + 6 + 8 + 10 = 30.', { code: 's = 0\nfor i in range(2, 11, 2):\n    s = s + i' }),
          pr('What is p at the end?', 120, 'Multiply instead of add.', '1 × 2 × 3 × 4 × 5 = 120.', { code: 'p = 1\nfor i in range(1, 6):\n    p = p * i' }),
          pr('What is c at the end?', 3, 'Count the items above 10.', '12, 30 and 11 are above 10.', { code: 'c = 0\nfor x in [5, 12, 30, 7, 11]:\n    if x > 10:\n        c = c + 1' }),
          pr('What is the average of 78, 92, 65 and 88?', 80.75, 'total / count.', '323 / 4 = 80.75.'),
          pr('Why does p in the product loop start at 1 and not 0? Type the value p would end with if it started at 0.', 0, 'Anything times 0…', 'p stays 0 forever: start a product at 1.'),
        ],
      },
      {
        title: 'Gauss’s shortcut and counting steps',
        minutes: 20,
        explain: [
          'The loop adds the numbers one at a time: n additions. Gauss’s pairing gives the same total with one formula: 1 + 2 + … + n = n(n + 1)/2.',
          'The same pairing works for any evenly spaced list: (first + last) × (how many) / 2.',
          'Counting how many steps a program takes, as n grows, is how we compare methods. A loop up to n takes about n steps; a loop inside a loop takes about n × n.',
        ],
        formulas: [
          ['Sum 1 to n', '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}'],
          ['Evenly spaced list', '\\text{sum} = \\frac{(\\text{first} + \\text{last}) \\times \\text{count}}{2}'],
        ],
        examples: [
          ex('1 + 2 + … + 1000.', [['Formula.', '\\frac{1000 \\times 1001}{2}'], ['Work it out.', '500\\,500']], '500,500'),
          ex('How many times does print run?', [['The inner loop runs 4 times for each of the 3 outer rounds.', '3 \\times 4'], ['Count.', '12']], '12', 'for i in range(3):\n    for j in range(4):\n        print(i, j)'),
        ],
        practice: [
          pr('1 + 2 + … + 50 = ?', 1275, 'n(n + 1)/2.', '50 × 51 / 2 = 1275.'),
          pr('5 + 10 + 15 + … + 100 = ?', 1050, '(first + last) × count / 2. There are 20 terms.', '(5 + 100) × 20 / 2 = 1050.'),
          pr('How many times does the inner line run?', 30, 'outer × inner.', '5 × 6 = 30.', { code: 'for a in range(5):\n    for b in range(6):\n        x = a * b' }),
          pr('A loop adds 1 to n one step at a time. For n = 1,000,000, how many additions?', 1000000, 'One per number.', 'n additions: 1,000,000. The formula needs 3 operations.'),
        ],
      },
      {
        title: 'while loops',
        minutes: 20,
        explain: [
          'while test: repeats its body as long as the test is True. Use it when you do not know in advance how many rounds are needed.',
          'Something inside the loop must change so that the test eventually becomes False. If not, the loop runs forever: an infinite loop.',
          'Example: halve a number until it reaches 1. Starting from 1000, it takes 9 halvings with // to reach 1 (1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1).',
        ],
        code: [['Counting halvings', 'x = 1000\nsteps = 0\nwhile x > 1:\n    x = x // 2\n    steps = steps + 1']],
        formulas: [['Halvings to reach 1', '\\approx \\log_2 n']],
        examples: [
          ex('Money doubles every year from ₱1,000. How many years until it reaches at least ₱10,000?', [['1000, 2000, 4000, 8000, 16000.', ''], ['Four doublings.', '4']], '4 years', 'money = 1000\nyears = 0\nwhile money < 10000:\n    money = money * 2\n    years = years + 1'),
          ex('Does this loop stop?', [['n: 10, 7, 4, 1, −2, …', ''], ['It never equals 0.', '']], 'No: it runs forever', 'n = 10\nwhile n != 0:\n    n = n - 3'),
        ],
        practice: [
          pr('What is steps at the end?', 6, 'Halve 64 until it reaches 1.', '64 → 32 → 16 → 8 → 4 → 2 → 1: 6 steps.', { code: 'x = 64\nsteps = 0\nwhile x > 1:\n    x = x // 2\n    steps = steps + 1' }),
          pr('What is x at the end?', 243, 'Multiply by 3 while x < 100.', '1, 3, 9, 27, 81, 243.', { code: 'x = 1\nwhile x < 100:\n    x = x * 3' }),
          pr('What is n at the end?', 4, 'Subtract 6 while n is at least 6.', '40 − 6 × 6 = 4. That is 40 % 6!', { code: 'n = 40\nwhile n >= 6:\n    n = n - 6' }),
          ch('Which test makes the loop n = 10; while …: n = n − 3 stop?', ['n > 0', 'n != 0', 'n == 10', 'n < 100'], 'n never equals exactly 0.', 'n > 0 becomes False at −2.'),
        ],
      },
    ],
  },

  'cs-104': {
    predict: {
      q: 'def sq(x): return x * x. What is sq(3) + sq(4)?',
      options: ['25', '49', '12', '7'],
      answer: 0,
      reveal: 'Each call runs the same two lines with its own x and is replaced by its answer: 9 + 16 = 25.',
    },
    parts: [
      {
        title: 'Defining and calling',
        minutes: 20,
        explain: [
          'def name(parameters): followed by indented lines defines a function. Nothing runs at that moment; Python only learns a new word.',
          'Writing name(arguments) calls it: the arguments are put into the parameters, the body runs, and return sends one value back. The call is then replaced by that value.',
          'A good function does one job and has a name that says what: area_of_circle(r), not f(r).',
        ],
        code: [['A function with two parameters', 'def rect_area(w, h):\n    return w * h\n\nprint(rect_area(3, 5))    # 15']],
        formulas: [['Like maths', 'f(x) = x^2 \\quad\\leftrightarrow\\quad \\texttt{def f(x): return x ** 2}']],
        examples: [
          ex('What is shown?', [['Call with w = 4, h = 2.5.', '4 \\times 2.5'], ['Returned value.', '10.0']], '10.0', 'def rect_area(w, h):\n    return w * h\n\nprint(rect_area(4, 2.5))'),
          ex('def f(x): return 3 * x - 1. What is f(f(2))?', [['Inner call first.', 'f(2) = 5'], ['Then the outer.', 'f(5) = 14']], '14'),
        ],
        practice: [
          pr('def f(x): return x * x + 1. What is f(4)?', 17, 'Put 4 in for x.', '16 + 1 = 17.'),
          pr('def g(a, b): return a - b. What is g(10, 3)?', 7, 'Order of arguments matters.', 'a = 10, b = 3: 7.'),
          pr('def g(a, b): return a - b. What is g(3, 10)?', -7, 'Swap them.', '3 − 10 = −7.'),
          pr('def h(x): return 2 * x. What is h(h(h(1)))?', 8, 'Inside out.', '1 → 2 → 4 → 8.'),
        ],
      },
      {
        title: 'return versus print',
        minutes: 15,
        explain: [
          'return hands a value back to the code that called the function, which can store it, add to it or pass it on.',
          'print only shows a value on the screen. A function that prints but does not return gives back None, Python’s “nothing”, and trying to do arithmetic with None is an error.',
          'return also ENDS the function at once. Lines after a return in the same branch never run.',
        ],
        code: [['Return ends the function', 'def sign(x):\n    if x < 0:\n        return -1\n    if x == 0:\n        return 0\n    return 1']],
        formulas: [['A call becomes its return value', '\\texttt{y = f(3) + 1} \\to \\texttt{y = 10 + 1}\\ \\text{if}\\ f(3) = 10']],
        examples: [
          ex('What is sign(-5) + sign(0) + sign(9)?', [['−5 < 0: returns −1 right away.', ''], ['0: returns 0. 9: returns 1.', '-1 + 0 + 1 = 0']], '0'),
          ex('def g(x): print(x * 2). What is g(5)?', [['It shows 10 on the screen.', ''], ['But there is no return, so the value is None.', '']], 'None (after printing 10)'),
        ],
        practice: [
          pr('With sign above, what is sign(-3) * 10?', -10, 'sign(−3) = −1.', '−1 × 10 = −10.'),
          pr('What does this function return for f(7)?', 7, 'The first return that runs ends the function.', '7 > 5, so return 7; the next line never runs.', { code: 'def f(x):\n    if x > 5:\n        return x\n    return 0' }),
          ch('def g(x): print(x). What is g(4)?', ['None', '4', '0', 'An error'], 'No return line.', 'It prints 4 and returns None.'),
          pr('How many times is "hi" printed?', 1, 'return ends the function.', 'The second print is after return and never runs.', { code: 'def f():\n    print("hi")\n    return 1\n    print("hi")\n\nf()' }),
        ],
      },
      {
        title: 'Each call has its own boxes',
        minutes: 20,
        explain: [
          'When a function is called, it gets fresh boxes for its parameters and any variables made inside it (local variables). When it returns, those boxes are thrown away.',
          'So a variable x inside a function is a different box from an x outside it. Changing one does not change the other.',
          'This is what lets a big program be split into pieces written by different people: each function only sees what is passed into it.',
        ],
        code: [['Two different x boxes', 'x = 100\ndef bump(x):\n    x = x + 1\n    return x\n\ny = bump(5)\nprint(x, y)    # 100 6']],
        formulas: [['Scope', '\\text{inside a function: its own boxes; outside: untouched}']],
        examples: [
          ex('In the bump program, why is x still 100?', [['bump’s x is its own box, set to 5.', ''], ['It becomes 6 and is returned; the outer x is never touched.', '']], 'The inner x is a separate box'),
          ex('What is total at the end?', [['add3 returns 7 + 3.', '10'], ['total = 10 + 10.', '20']], '20', 'def add3(n):\n    n = n + 3\n    return n\n\ntotal = add3(7) + 10'),
        ],
        practice: [
          pr('What is printed for a?', 5, 'The function only changes its own a.', 'The outer a is still 5.', { code: 'a = 5\ndef f(a):\n    a = a * 10\n    return a\n\nb = f(a)\nprint(a)' }),
          pr('…and what is b in the same program?', 50, 'Returned value.', '5 × 10 = 50.'),
          pr('How many separate boxes called x exist while g(2) + g(3) is being worked out, at most, at the same moment? (g has one parameter x.)', 1, 'One call runs at a time here.', 'The first call returns (and its box goes) before the second starts.'),
          ch('Why are local variables useful?', ['Functions cannot accidentally change each other’s values', 'They make programs faster', 'They save typing', 'They are required by law'], 'Think about big programs.', 'Each function is sealed off, so pieces can be written and tested separately.'),
        ],
      },
      {
        title: 'Building with functions',
        minutes: 20,
        explain: [
          'Big programs are built from small functions that call each other. Write and test each small one first, then use it with confidence.',
          'A function can call another, and the answer of one can be the argument of the next. The innermost call is worked out first.',
          'Default values make parameters optional: def greet(name, polite=True): …  Python also comes with many ready functions, such as len, max, min, abs and round.',
        ],
        code: [['Small pieces', 'def sq(x):\n    return x * x\n\ndef dist(x1, y1, x2, y2):\n    return (sq(x2 - x1) + sq(y2 - y1)) ** 0.5\n\nprint(dist(0, 0, 3, 4))    # 5.0']],
        formulas: [['Distance between two points', 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}']],
        examples: [
          ex('dist(1, 1, 4, 5)?', [['Differences: 3 and 4.', ''], ['sq(3) + sq(4) = 25, square root.', '5.0']], '5.0'),
          ex('max(3, 9, 4) − min(3, 9, 4)?', [['max is 9, min is 3.', '9 - 3'], ['Subtract.', '6']], '6'),
        ],
        practice: [
          pr('With dist above, what is dist(0, 0, 6, 8)?', 10, '6, 8, 10 is a Pythagorean triple.', '√(36 + 64) = 10.'),
          pr('abs(-7) + abs(3) = ?', 10, 'abs drops the sign.', '7 + 3 = 10.'),
          pr('round(2.567, 1) gives 2.6. What is round(3.14159, 2)?', 3.14, 'Keep two decimals.', '3.14.'),
          pr('def cube(x): return x * x * x. What is cube(2) + cube(3)?', 35, '8 + 27.', '35.'),
        ],
      },
    ],
  },

  'cs-105': {
    predict: {
      q: 'Freezer readings: [−3, −8, −1, −12]. A program starts best = 0 and replaces it whenever it finds a bigger reading. What does it report as the warmest?',
      options: ['0', '−1', '−12', '−3'],
      answer: 0,
      reveal: 'No reading is bigger than 0, so best never changes and the program reports 0, a temperature that is not even in the list. Start best at the first item instead.',
    },
    parts: [
      {
        title: 'Lists and positions',
        minutes: 20,
        explain: [
          'A list holds many values in order, inside square brackets: a = [4, 8, 15, 16]. a[0] is the first item: positions (indexes) start at 0.',
          'len(a) is the number of items; the last position is len(a) − 1. Python also lets you count from the end: a[-1] is the last item, a[-2] the one before.',
          'You can change one item (a[1] = 9) and add one at the end (a.append(23)).',
        ],
        code: [['Positions', 'a = [4, 8, 15, 16]\nprint(a[0], a[3], a[-1])   # 4 16 16\na[1] = 9\na.append(23)\nprint(a, len(a))           # [4, 9, 15, 16, 23] 5']],
        formulas: [['Last position', '\\text{last} = \\texttt{len(a)} - 1']],
        examples: [
          ex('a = [10, 20, 30, 40, 50]. What is a[2] + a[-1]?', [['a[2] is the third item.', '30'], ['a[−1] is the last.', '30 + 50 = 80']], '80'),
          ex('a = [1, 2, 3]; a.append(4); a[0] = 7. What is a?', [['Append adds at the end.', '[1, 2, 3, 4]'], ['Replace position 0.', '[7, 2, 3, 4]']], '[7, 2, 3, 4]'),
        ],
        practice: [
          pr('a = [5, 9, 2, 7]. What is a[1]?', 9, 'Count from 0.', 'a[0] = 5, a[1] = 9.'),
          pr('a = [5, 9, 2, 7]. What is a[-2]?', 2, 'Count back from the end.', 'a[−1] = 7, a[−2] = 2.'),
          pr('a list has 12 items. What is the position of the last one?', 11, 'len − 1.', '12 − 1 = 11.'),
          pr('a = [3, 1]; a.append(4); a.append(1). What is len(a)?', 4, 'Each append adds one.', '2 + 2 = 4.'),
        ],
      },
      {
        title: 'Looping over a list',
        minutes: 20,
        explain: [
          'for x in a: visits each item in order. This is the safest way to loop: you can never go past the end.',
          'If you also need the position, use for i in range(len(a)): and read a[i].',
          'To find the largest, start best = a[0] (not 0!) and replace it whenever an item is bigger. Starting at 0 breaks for lists of negative numbers.',
        ],
        code: [['Largest and its position', 'a = [78, 92, 65, 95, 71]\nbest = a[0]\nwhere = 0\nfor i in range(len(a)):\n    if a[i] > best:\n        best = a[i]\n        where = i']],
        formulas: [['Comparisons to find the max of n items', 'n - 1']],
        examples: [
          ex('In the program above, what are best and where at the end?', [['78, then 92 at 1, then 95 at 3.', ''], ['71 is smaller.', 'best = 95,\\ where = 3']], 'best = 95, where = 3'),
          ex('How many items of [3, 8, 8, 1, 8] equal 8?', [['Loop and count.', ''], ['Positions 1, 2, 4.', '3']], '3'),
        ],
        practice: [
          pr('What is best at the end?', -1, 'Start from a[0].', '−3, −1 wins, −8 and −12 lose: −1.', { code: 'a = [-3, -1, -8, -12]\nbest = a[0]\nfor x in a:\n    if x > best:\n        best = x' }),
          pr('In [40, 55, 55, 30], what is the position of the FIRST largest value when the test is a[i] > best?', 1, '> does not replace on a tie.', '55 first appears at position 1; the second 55 is not bigger.'),
          pr('How many comparisons does it take to find the largest of 1,000 items, starting best at the first?', 999, 'Compare each of the others once.', 'n − 1 = 999.'),
          pr('What is s at the end?', 20, 'Add only the even items.', '4 + 8 + 6 + 2 = 20.', { code: 'a = [4, 7, 8, 6, 3, 2, 1]\ns = 0\nfor x in a:\n    if x % 2 == 0:\n        s = s + x' }),
        ],
      },
      {
        title: 'Slices and building new lists',
        minutes: 20,
        explain: [
          'a[i:j] is a slice: a new list of the items from position i up to but NOT including j, so it has j − i items (the same rule as range).',
          'a[:3] is the first three items, a[3:] everything from position 3 on.',
          'To build a new list, start with [] and append inside a loop. Python also has a short form: [x * 2 for x in a].',
        ],
        code: [['Slices and a new list', 'a = [10, 20, 30, 40, 50]\nprint(a[1:4])     # [20, 30, 40]\ndoubled = []\nfor x in a:\n    doubled.append(x * 2)\n# or: doubled = [x * 2 for x in a]']],
        formulas: [['Items in a slice a[i:j]', 'j - i']],
        examples: [
          ex('a = [10, 20, 30, 40, 50]. What is a[:2] + a[3:]?', [['First two.', '[10, 20]'], ['From position 3.', '[40, 50]'], ['+ joins lists.', '[10, 20, 40, 50]']], '[10, 20, 40, 50]'),
          ex('What is sum([x * x for x in [1, 2, 3]])?', [['The new list.', '[1, 4, 9]'], ['Add.', '14']], '14'),
        ],
        practice: [
          pr('How many items are in a[2:9] of a list with 20 items?', 7, 'j − i.', '9 − 2 = 7.'),
          pr('a = [5, 6, 7, 8, 9]. What is sum(a[1:3])?', 13, 'Positions 1 and 2.', '6 + 7 = 13.'),
          pr('What is len([x for x in range(10) if x % 3 == 0])?', 4, 'Which of 0 to 9 are divisible by 3?', '0, 3, 6, 9: four.'),
          pr('a = [1, 2, 3, 4]. What is sum([x * 10 for x in a])?', 100, 'Each item times 10.', '10 + 20 + 30 + 40 = 100.'),
        ],
      },
      {
        title: 'Text is a list of characters',
        minutes: 15,
        explain: [
          'A string works much like a list: s = "Davao"; s[0] is "D", len(s) is 5, s[1:3] is "av". Unlike a list, you cannot change one letter in place.',
          'Each character is stored as a number. ASCII (1963) used 0 to 127: "A" is 65, "a" is 97, "0" is 48. Python’s ord("A") gives 65 and chr(66) gives "B".',
          'Unicode extends this to over a hundred thousand characters, from Baybayin to emoji, so text in any language can be stored.',
        ],
        code: [['Letters as numbers', 's = "Davao"\nprint(len(s), s[0], s[-1])   # 5 D o\nprint(ord("A"), chr(97))     # 65 a']],
        formulas: [['Small from capital (ASCII)', '\\texttt{ord("a") - ord("A")} = 97 - 65 = 32']],
        examples: [
          ex('What is ord("E")?', [['A = 65 and letters go in order.', 'A,\\ B,\\ C,\\ D,\\ E'], ['Count on four.', '65 + 4 = 69']], '69'),
          ex('How many "a" letters are in "banana"?', [['Loop over the letters and count.', 'b\\,a\\,n\\,a\\,n\\,a'], ['Count.', '3']], '3'),
        ],
        practice: [
          pr('What is len("Cagayan de Oro")? (Spaces count.)', 14, 'Count every character, spaces too.', '7 + 1 + 2 + 1 + 3 = 14.'),
          pr('What is ord("Z")?', 90, 'A = 65; Z is the 26th letter.', '65 + 25 = 90.'),
          pr('What is ord("c") − ord("a")?', 2, 'Letters are in order.', 'c is two after a.'),
          ch('s = "hello". What is s[1:4]?', ['ell', 'hel', 'ello', 'llo'], 'Positions 1, 2, 3.', 'e, l, l.'),
        ],
      },
    ],
  },

  'cs-106': {
    predict: {
      q: 'A straight fence 10 m long has a post every metre, including both ends. How many posts?',
      options: ['11', '10', '9', '20'],
      answer: 0,
      reveal: 'There are 10 one-metre sections, and one more post than sections. Mixing up the two counts is the classic off-by-one error.',
    },
    parts: [
      {
        title: 'Off by one',
        minutes: 15,
        explain: [
          'An off-by-one error is a count that is one too many or one too few. The fence is the classic picture: n sections need n + 1 posts.',
          'Counting a to b with both ends included gives b − a + 1 numbers; range(a, b) gives b − a because it leaves out b.',
          'Whenever you write a loop, check the first and last time it runs. Most loop bugs live at the two ends.',
        ],
        formulas: [
          ['Inclusive count', 'a, a{+}1, \\dots, b:\\ b - a + 1\\ \\text{numbers}'],
          ['Posts and sections', '\\text{posts} = \\text{sections} + 1'],
        ],
        examples: [
          ex('You read pages 45 to 60 of a book. How many pages?', [['Both ends count.', '60 - 45 + 1'], ['Work it out.', '16']], '16'),
          ex('Which range gives the numbers 1 to 10?', [['range stops before its end.', ''], ['So the end must be 11.', '\\texttt{range(1, 11)}']], 'range(1, 11)'),
        ],
        practice: [
          pr('How many whole numbers from 15 to 40 inclusive?', 26, 'b − a + 1.', '40 − 15 + 1 = 26.'),
          pr('A 30 m fence with a post every 3 m, posts at both ends. How many posts?', 11, 'Sections first.', '10 sections, 11 posts.'),
          pr('A loop for i in range(1, n) is meant to run n times. For n = 8, how many times does it really run?', 7, 'range(1, 8) is 1 to 7.', '7: it is off by one.'),
          pr('A building has floors 1 to 9. Stairs connect each floor to the next. How many flights of stairs?', 8, 'Floors are posts; flights are sections.', '9 − 1 = 8.'),
        ],
      },
      {
        title: 'Reading error messages',
        minutes: 15,
        explain: [
          'When Python cannot go on it stops with an error message. Read the LAST line first: it names the kind of error and gives a short reason.',
          'Common kinds: SyntaxError (the program is not valid Python, often a missing bracket or colon), NameError (a variable name that does not exist, often a typo), TypeError (wrong kind of value, like "3" + 4), IndexError (a position past the end of a list), ZeroDivisionError.',
          'The line number in the message is where Python noticed the problem; the real mistake is often on that line or just above.',
        ],
        code: [['A typical message', 'Traceback (most recent call last):\n  File "marks.py", line 4, in <module>\n    print(marks[5])\nIndexError: list index out of range']],
        formulas: [['Valid positions in a list of n items', '0, 1, \\dots, n - 1']],
        examples: [
          ex('marks has 5 items. Why does marks[5] fail?', [['Positions are 0 to 4.', ''], ['5 is past the end.', '']], 'IndexError: the last position is 4'),
          ex('print(totl) after total = 10. What error?', [['totl was never made.', ''], ['A misspelt name.', '']], 'NameError'),
        ],
        practice: [
          ch('Which error does "3" + 4 give?', ['TypeError', 'NameError', 'IndexError', 'SyntaxError'], 'Text and a number.', 'Python cannot add str and int: TypeError.'),
          ch('if x > 3 print(x)  (no colon). Which error?', ['SyntaxError', 'TypeError', 'IndexError', 'ZeroDivisionError'], 'The program is not valid Python.', 'A missing colon is a SyntaxError.'),
          pr('A list has 7 items. What is the largest position you can use without an IndexError (counting from the front)?', 6, 'n − 1.', '6.'),
          ch('Which line raises ZeroDivisionError?', ['avg = total / count  when count is 0', 'x = 0 / 5', 'y = 5 - 5', 'z = 0 * 3'], 'Dividing BY zero.', '0 / 5 is fine; dividing by 0 is not.'),
        ],
      },
      {
        title: 'Testing',
        minutes: 20,
        explain: [
          'A test case is an input whose right answer you already know. Run the program on it and compare.',
          'Choose tests that cover every path (each branch of each if) and the edges: 0, 1, an empty list, the largest and smallest allowed values, negative numbers.',
          'assert stops the program with an error if something is not True: assert avg([2, 4]) == 3. A file full of asserts can be re-run after every change, so old bugs cannot sneak back.',
        ],
        code: [['Tests with assert', 'def avg(a):\n    if len(a) == 0:\n        return 0\n    return sum(a) / len(a)\n\nassert avg([2, 4]) == 3\nassert avg([5]) == 5\nassert avg([]) == 0']],
        formulas: [['Inputs needed to try every combination of k yes/no tests', '2^k']],
        examples: [
          ex('Which test cases cover both branches of: if n % 2 == 0: … else: …?', [['One even number.', '4'], ['One odd number.', '7']], 'For example 4 and 7'),
          ex('A function has 3 independent yes/no tests. How many inputs to try every combination?', [['Each test doubles the cases.', '2^3'], ['Count.', '8']], '8'),
        ],
        practice: [
          pr('A function has 4 independent yes/no tests. How many combinations are there to try?', 16, '2 to the power of the number of tests.', '2⁴ = 16.'),
          ch('Which is the most useful extra test for a function that finds the largest item of a list?', ['A list of negative numbers', 'Another list of positive numbers', 'The same list again', 'A list of 1,000 positive numbers'], 'Think about the best = 0 bug.', 'Negative numbers catch the best = 0 starting-value bug.'),
          pr('With the fixed avg above, what is avg([3, 4, 8])?', 5, 'sum / len.', '15 / 3 = 5.'),
          ch('What does assert 2 + 2 == 5 do?', ['Stops the program with an AssertionError', 'Prints False', 'Changes 2 + 2 to 5', 'Nothing'], 'assert checks a claim.', 'The claim is False, so it stops with AssertionError.'),
        ],
      },
      {
        title: 'Finding the bug: tracing',
        minutes: 20,
        explain: [
          'When a test fails, trace the program by hand (or in Python Tutor) on that input, writing the value of every variable after every line.',
          'Find the FIRST line after which a box holds something you did not expect. The bug is on that line, or it is the reason that line ran at all.',
          'Then fix it, run all your tests again, and add the failing input as a new test.',
        ],
        code: [['A buggy count', 'def count_pass(marks):\n    c = 0\n    for m in marks:\n        if m > 75:        # should be >= 75\n            c = c + 1\n    return c\n\nassert count_pass([75, 80, 60]) == 2   # fails: gives 1']],
        formulas: [['Passing mark rule', 'm \\ge 75 \\ \\leftrightarrow\\ \\texttt{m >= 75}']],
        examples: [
          ex('Trace count_pass([75, 80, 60]). Where does it go wrong?', [['m = 75: 75 > 75 is False, c stays 0.', 'c = 0'], ['Expected c = 1 here: the test should include 75.', '']], 'The > should be >='),
          ex('This loop should add 1 to 5. What does it give?', [['range(1, 5) is 1 to 4.', ''], ['1 + 2 + 3 + 4.', '10']], '10, not 15: range(1, 6) is right', 's = 0\nfor i in range(1, 5):\n    s = s + i'),
        ],
        practice: [
          pr('What does the buggy count_pass([75, 75, 90]) return?', 1, 'Only marks above 75 count.', 'Only 90 counts: 1 (it should be 3).'),
          pr('This should give 2 × 3 × 4 = 24. What does it give instead?', 0, 'What is p at the start?', 'p starts at 0, and 0 times anything is 0.', { code: 'p = 0\nfor i in range(2, 5):\n    p = p * i' }),
          pr('This should count down 5, 4, 3, 2, 1. How many numbers does it actually print?', 4, 'range(5, 1, -1) stops before 1.', '5, 4, 3, 2: four.', { code: 'for i in range(5, 1, -1):\n    print(i)' }),
          ch('After fixing a bug, what should you do next?', ['Run all the tests again and add one for this bug', 'Delete the tests', 'Nothing', 'Rewrite the whole program'], 'Make sure it stays fixed.', 'Re-run everything and keep the failing case as a test.'),
        ],
      },
    ],
  },
};
