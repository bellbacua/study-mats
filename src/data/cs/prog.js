// Computer Science program: Fundamentals of Programming (cs-101 to cs-106).
// Programs are written in Python, the usual first language today. Story
// claims are cited as [n], pointing at each class's `sources`.
import { mk, home, online } from '../um/make';

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;
const TUTOR = (task) => online('Python Tutor (free, runs in the browser, shows every step)', 'https://pythontutor.com/python-compiler.html#mode=edit', task);
const THINK = (ch, why, excerpt) => ['link', 'Green Tea Press (free book)', `Think Python, 2nd edition: ${ch}`, 'https://greenteapress.com/wp/think-python-2e/', why, excerpt];

export default [
  mk({
    id: 'cs-101',
    code: 'CC 102',
    track: 'prog',
    um: [],
    after: ['num-005'],
    title: 'First Programs: Instructions a Machine Can Follow',
    subtitle: 'Lovelace’s Note G, Fortran, Python, and what x = x + 1 really means',
    digest: [
      'A program is a list of instructions carried out one at a time, top to bottom.',
      'A variable is a named box holding a value. The = sign means "put the value on the right into the box on the left", not "is equal to".',
      'So x = x + 1 is not a broken equation: it reads the old x, adds 1, and stores the result back in x.',
    ],
    era: '1843 Lovelace → 1957 Fortran → 1991 Python',
    who: 'Ada Lovelace, John Backus & Guido van Rossum',
    hook: 'How do you tell a machine, which understands nothing, exactly what to do?',
    story: [
      'In 1843 Ada Lovelace translated an Italian article about Charles Babbage’s planned Analytical Engine and added notes three times longer than the article [1]. Her Note G set out, step by step, how the engine could compute the Bernoulli numbers, and it is often called the first published computer program [1][2].',
      'The first electronic computers of the 1940s were programmed in raw numbers or by rewiring. Writing a program for them was slow and full of mistakes [3]. In 1957 John Backus’s team at IBM released FORTRAN, which let scientists write formulas almost as in algebra and had a translator turn them into machine instructions [3].',
      'In late 1989 the Dutch programmer Guido van Rossum started writing a new language as a holiday project, naming it after the comedy group Monty Python; Python was first released in 1991 [4]. Its plain, readable style made it one of the most used languages in the world and the usual first language in schools [4].',
    ],
    takeaway: 'Programming is writing instructions so exact that a machine with no common sense can follow them. Variables are labelled boxes; = fills a box.',
    viz: 'prog_trace',
    vizTitle: 'Step Through a Program',
    vizHow: 'Pick a short program and step through it one line at a time. The arrow is the line running now; the boxes on the right are the variables.',
    steps: [
      ['Assignment', '\\texttt{a = 5}', 'Put 5 into the box named a. If there is no box called a yet, make one.'],
      ['Read, then write', '\\texttt{x = x + 1}', 'First the right side is worked out with the OLD x; then the answer replaces x.'],
      ['Order matters', '\\texttt{b = a + 2;\\ a = 10} \\Rightarrow b = 7', 'b got a copy of the value at that moment. Changing a later does not change b.'],
    ],
    drills: [
      ['After a = 3, then a = a * 4, what is in a?', ['12', '3', '7', '34'], 'Work out the right side with the old a.', '3 × 4.', '12.'],
      ['In Python, what does = do?', ['Stores the value on the right into the variable on the left', 'Checks whether two things are equal', 'Draws a line', 'Ends the program'], 'Think “box”.', 'Assignment.', 'It stores a value; == is the equality check.'],
      ['a = 5, b = a, a = 9. What is b?', ['5', '9', '14', 'It is an error'], 'b got a copy when that line ran.', 'Later changes to a do not reach b.', '5.'],
    ],
    boss: [
      'Swap two boxes',
      'x = 4 and y = 9. You want x = 9 and y = 4. Which lines do it?',
      ['t = x, then x = y, then y = t', 'x = y, then y = x', 'y = x, then x = y', 'x = x + y'],
      'Try “x = y, then y = x” by hand: what is lost?',
      'After x = y both boxes hold 9, and the 4 is gone. A third box t keeps a copy of x first. (Python can also write x, y = y, x.)',
    ],
    read: [
      ['wiki', 'Note G', 'Lovelace’s program for the Bernoulli numbers.', 'Note G is a computer algorithm written by Ada Lovelace that was designed to calculate Bernoulli numbers using the hypothetical analytical engine.'],
      THINK('Chapter 2, Variables, expressions and statements', 'A gentle, free first book on Python.', 'One of the most powerful features of a programming language is the ability to manipulate variables.'),
    ],
    sources: [
      ['Wikipedia: Ada Lovelace', W('Ada_Lovelace'), 'the 1843 translation and notes'],
      ['Wikipedia: Note G', W('Note_G'), 'the Bernoulli-number program'],
      ['Wikipedia: Fortran', W('Fortran'), 'Backus, IBM, 1957'],
      ['Wikipedia: Python (programming language)', W('Python_(programming_language)'), 'van Rossum, 1989–1991, the name'],
    ],
    labs: [
      TUTOR('Type a = 5, then b = a + 2, then a = a * 3 on three lines. Press “Visualize” and step forward: watch the boxes change.'),
      home('Write instructions for making a cup of coffee for someone who takes every word literally. Swap two lines and see what breaks.'),
    ],
    quiz: [
      ['Who wrote Note G, often called the first published program?', ['Ada Lovelace', 'Charles Babbage', 'Grace Hopper', 'Alan Turing'], '1843, for the Analytical Engine.'],
      ['Which language did John Backus’s team release in 1957?', ['FORTRAN', 'Python', 'COBOL', 'C'], 'FORmula TRANslation.'],
    ],
    gloss: [
      ['Program', 'A list of instructions for a computer, carried out one at a time.', ['programs']],
      ['Variable', 'A named box in a program that holds a value, which can change.', ['variables']],
      ['Assignment', 'Putting a value into a variable, written with = in Python.', []],
    ],
    events: [
      [1843, 'Lovelace’s Note G', 'A step-by-step method for a machine.', false],
      [1957, 'FORTRAN released', 'Programs that look like formulas.', false],
      [1991, 'Python 0.9 released', 'Van Rossum’s readable language.', false],
    ],
  }),

  mk({
    id: 'cs-102',
    code: 'CC 102',
    track: 'prog',
    um: [],
    after: ['cs-101'],
    title: 'Decisions: if, else and the Leap-Year Rule',
    subtitle: 'Comparisons, true and false, and a calendar rule from 1582',
    digest: [
      'A comparison like year % 4 == 0 is either True or False.',
      'if runs a block only when its test is True; else runs when it is False; elif tries another test.',
      'The Gregorian leap-year rule is a perfect first decision: divisible by 4, except centuries, except every 400 years.',
    ],
    era: '45 BC Julian calendar → 1582 Gregorian reform → 1947 flow diagrams',
    who: 'Pope Gregory XIII, Aloysius Lilius, Herman Goldstine & John von Neumann',
    hook: 'Why was 1900 not a leap year, but 2000 was? And how does a program choose?',
    story: [
      'Julius Caesar’s calendar of 45 BC added a leap day every four years, making the year 365.25 days on average [1]. The true year is about 365.2422 days, so by the 1500s the calendar had drifted about ten days from the seasons [1].',
      'In 1582 Pope Gregory XIII issued a reform worked out by Aloysius Lilius and Christopher Clavius: century years are leap years only if divisible by 400 [1][2]. That drops 3 leap days every 400 years and gives an average year of 365.2425 days [2].',
      'In 1947 Herman Goldstine and John von Neumann drew “flow diagrams” to plan programs, with boxes for steps and branching points where the machine chooses a path [3]. Every if in a modern program is one of those branching points [4].',
    ],
    takeaway: 'A program decides with if / elif / else. The order of the tests matters: check the most special case first.',
    viz: 'leap_flow',
    vizTitle: 'The Leap-Year Decision',
    vizHow: 'Choose a year and watch it travel through the tests. Each diamond asks a yes-or-no question; the path it takes is the answer.',
    steps: [
      ['A comparison', '\\texttt{2024 \\% 4 == 0} \\to \\texttt{True}', '% gives the remainder. == asks “equal?” and answers True or False.'],
      ['The rule in Python', '\\texttt{(y\\%4==0 and y\\%100!=0) or y\\%400==0}', 'Divisible by 4, but not by 100, unless also by 400.'],
      ['Average year', '365 + \\tfrac{97}{400} = 365.2425', '97 leap days every 400 years.'],
    ],
    drills: [
      ['Is 1900 a leap year in the Gregorian calendar?', ['No', 'Yes', 'Only in Europe', 'Only before 1582'], 'Century year.', '1900 is not divisible by 400.', 'No.'],
      ['What does 17 % 5 give in Python?', ['2', '3', '3.4', '12'], 'The remainder.', '17 = 3 × 5 + 2.', '2.'],
      ['x = 7. Which test is True?', ['x > 5 and x < 10', 'x == 5', 'x < 5 or x > 10', 'not x > 5'], 'Check each piece.', '7 is between 5 and 10.', 'x > 5 and x < 10.'],
    ],
    boss: [
      'Order of tests',
      'A program says: if y % 4 == 0: "leap" elif y % 400 == 0: "leap" elif y % 100 == 0: "not leap" else: "not leap". What does it say for 1900?',
      ['“leap”: the first test catches it before the century rule is ever checked', '“not leap”', 'It crashes', 'Nothing'],
      'Which test does 1900 pass first?',
      '1900 % 4 == 0 is True, so the first branch runs and the others are skipped. Special cases (the centuries) must be tested first.',
    ],
    read: [
      ['wiki', 'Gregorian calendar', 'The 1582 reform and its rule.', 'The Gregorian calendar is the calendar used in most parts of the world.'],
      THINK('Chapter 5, Conditionals and recursion', 'if, elif and else with examples.', 'Conditional statements give us the ability to check conditions and change the behavior of the program accordingly.'),
    ],
    sources: [
      ['Wikipedia: Julian calendar', W('Julian_calendar'), '365.25 days and the drift'],
      ['Wikipedia: Gregorian calendar', W('Gregorian_calendar'), 'the 1582 reform, Lilius, 365.2425'],
      ['Wikipedia: Flowchart (history)', W('Flowchart'), 'Goldstine and von Neumann’s flow diagrams, 1947'],
      ['Wikipedia: Conditional (computer programming)', W('Conditional_(computer_programming)'), 'if–then–else'],
    ],
    labs: [
      TUTOR('Write: y = 1900, then the leap-year test with if / else printing “leap” or “not leap”. Try 2000, 2023, 2024.'),
      home('Draw a flow diagram for crossing the street: one diamond for the light, one for cars. Follow it with a coin.'),
    ],
    quiz: [
      ['Which pope gave his name to the 1582 calendar reform?', ['Gregory XIII', 'Julius II', 'Leo X', 'Pius V'], 'The Gregorian calendar.'],
      ['Who drew flow diagrams for planning programs in 1947?', ['Goldstine and von Neumann', 'Lovelace and Babbage', 'Turing and Church', 'Backus and Naur'], 'For the early electronic computers.'],
    ],
    gloss: [
      ['Boolean', 'A value that is either True or False, named after George Boole.', ['booleans']],
      ['Condition', 'A test in an if that is either True or False.', ['conditions']],
      ['Modulo', 'The remainder after division, written % in Python: 17 % 5 = 2.', ['remainder operator']],
    ],
    events: [
      [1582, 'Gregorian calendar', 'The leap-year rule with centuries.', false],
      [1947, 'Flow diagrams', 'Goldstine and von Neumann plan programs.', false],
    ],
  }),

  mk({
    id: 'cs-103',
    code: 'CC 102',
    track: 'prog',
    um: [],
    after: ['cs-102'],
    title: 'Loops: Doing Something a Thousand Times',
    subtitle: 'for, while, a running total, and the boy who added 1 to 100',
    digest: [
      'A loop repeats a block of code. for repeats once for each item; while repeats as long as a test is True.',
      'range(1, n + 1) gives 1, 2, …, n. A running total starts at 0 and adds each number in turn.',
      'A while loop whose test never becomes False runs forever: always make sure something changes.',
    ],
    era: '1843 Lovelace’s cycles → 1957 FORTRAN DO loop',
    who: 'Ada Lovelace, John Backus & Carl Friedrich Gauss',
    hook: 'A computer is fast but has no shortcuts of its own. How do you make it add a million numbers without writing a million lines?',
    story: [
      'Lovelace’s Note G already used what she called a “cycle”: a group of operations repeated over and over, so the machine could reuse the same instructions instead of needing new cards for each round [1].',
      'FORTRAN (1957) made repetition easy with its DO statement, which ran a block of lines for each value of a counter [2]. Today’s for loop in Python comes from the same idea [3].',
      'A famous story says that the young Carl Friedrich Gauss, told to add the numbers from 1 to 100, answered in moments: pair 1 with 100, 2 with 99, and so on, 50 pairs of 101, total 5050 [4]. A loop does it the slow way, one number at a time, and gets the same answer.',
    ],
    takeaway: 'Loops let a few lines do a huge amount of work. A running total (start at 0, add each item) is the most common loop of all.',
    viz: 'loop_sum',
    vizTitle: 'A Running Total',
    vizHow: 'Set n and watch the loop add 1, 2, 3, … one step at a time. Then see Gauss’s pairing trick give the same answer at once.',
    steps: [
      ['A for loop', '\\texttt{for i in range(1, n+1): total = total + i}', 'i takes each value 1, 2, …, n in turn.'],
      ['Gauss’s shortcut', '1 + 2 + \\dots + n = \\frac{n(n+1)}{2}', 'n/2 pairs, each adding to n + 1.'],
      ['A while loop', '\\texttt{while x > 1: x = x // 2}', 'Repeats while the test is True; something must change each time.'],
    ],
    drills: [
      ['How many times does for i in range(3, 8) run?', ['5', '8', '6', '3'], 'range stops BEFORE the end.', '3, 4, 5, 6, 7.', '5 times.'],
      ['1 + 2 + … + 10 = ?', ['55', '50', '100', '45'], 'n(n + 1)/2.', '10 × 11 / 2.', '55.'],
      ['x = 1; while x < 100: x = x * 3. What is x at the end?', ['243', '81', '100', '27'], '1, 3, 9, 27, 81, …', '81 < 100 so one more round.', '243.'],
    ],
    boss: [
      'The loop that never ends',
      'n = 10; while n != 0: n = n − 3. What happens?',
      ['It never stops: n goes 10, 7, 4, 1, −2, … and skips 0', 'It stops at 0', 'It stops at 1', 'It runs 3 times'],
      'List the values of n.',
      'n jumps from 1 to −2 and never equals 0, so the test is always True: an infinite loop. Safer test: while n > 0.',
    ],
    read: [
      ['wiki', 'For loop', 'Where for loops came from.', 'In computer science, a for-loop or for loop is a control flow statement for specifying iteration.'],
      THINK('Chapter 7, Iteration', 'while loops and running totals.', 'Repeating identical or similar tasks without making errors is something that computers do well and people do poorly.'),
    ],
    sources: [
      ['Wikipedia: Note G', W('Note_G'), 'the repeated “cycles” of operations'],
      ['Wikipedia: Fortran', W('Fortran'), 'the DO statement'],
      ['Wikipedia: For loop', W('For_loop'), 'history of the for loop'],
      ['Wikipedia: Carl Friedrich Gauss (anecdote of the sum)', W('Carl_Friedrich_Gauss'), 'the school story'],
    ],
    labs: [
      TUTOR('total = 0, then for i in range(1, 11): total = total + i, then print(total). Step through and watch total grow to 55.'),
      home('Add 1 + 2 + … + 20 by pairing like Gauss. Check with n(n + 1)/2.'),
    ],
    quiz: [
      ['What did FORTRAN call its loop statement?', ['DO', 'FOR', 'LOOP', 'REPEAT'], 'DO 10 I = 1, 100.'],
      ['Gauss’s sum 1 + 2 + … + 100 =', ['5050', '5000', '10100', '4950'], '50 pairs of 101.'],
    ],
    gloss: [
      ['Loop', 'Code that repeats a block several times.', ['loops']],
      ['Iteration', 'One pass through a loop, or repeating in general.', ['iterations', 'iterate']],
      ['Infinite loop', 'A loop whose stopping test never becomes true, so it never ends.', ['infinite loops']],
    ],
    events: [[1957, 'FORTRAN DO loop', 'Repetition made easy.', false]],
  }),

  mk({
    id: 'cs-104',
    code: 'CC 102',
    track: 'prog',
    um: [],
    after: ['cs-103', 'math-009'],
    title: 'Functions: Giving a Piece of Work a Name',
    subtitle: 'The Wheeler jump, parameters, return values, and building big programs from small ones',
    digest: [
      'A function is a named block of code. def area(r): return 3.14159 * r * r defines it; area(2) calls it.',
      'Parameters are the inputs; return sends one value back to where the function was called.',
      'Functions let you write a piece of work once and use it many times, and test each piece on its own.',
    ],
    era: '1949 EDSAC and the Wheeler jump → 1951 the first CS PhD',
    who: 'David Wheeler, Maurice Wilkes & Kathleen Booth',
    hook: 'If ten parts of a program all need a square root, must you write the square-root steps ten times?',
    story: [
      'EDSAC, built at Cambridge under Maurice Wilkes, ran its first program in May 1949 [1]. Its team kept a library of tested routines on punched tape, so programmers could reuse them instead of writing everything from scratch [1].',
      'David Wheeler invented a way for a program to jump into such a routine and come back to the right place afterwards, now called the “Wheeler jump”; it is the ancestor of every function call [2]. In 1951 Wheeler was awarded what is often called the first PhD in computer science [2].',
      'Modern languages give these routines a name, inputs (parameters) and an output (a return value), exactly like the functions of mathematics [3].',
    ],
    takeaway: 'Write each piece of work once as a function, give it a good name, test it, and build bigger programs by calling it.',
    viz: 'func_calls',
    vizTitle: 'Calling and Returning',
    vizHow: 'Watch the main program call a function: the value goes in, the function works with its own boxes, and the answer comes back. Change the input.',
    steps: [
      ['Define', '\\texttt{def sq(x):\\ return x * x}', 'Nothing runs yet: this only teaches Python a new word.'],
      ['Call', '\\texttt{y = sq(3) + sq(4)}', 'Each call runs the body with x set to the argument, and is replaced by the returned value: 9 + 16 = 25.'],
      ['Compose', '\\texttt{sq(sq(2))} = 16', 'The inner call runs first, its answer feeds the outer one.'],
    ],
    drills: [
      ['def f(x): return 2 * x + 1. What is f(5)?', ['11', '10', '7', '25'], 'Put 5 in for x.', '2 × 5 + 1.', '11.'],
      ['def f(x): return x + 1. What is f(f(3))?', ['5', '4', '6', '3'], 'Inner first.', 'f(3) = 4, f(4) = 5.', '5.'],
      ['A function with no return statement gives back…', ['None (nothing)', '0', 'The last line', 'An error'], 'Python’s special “no value”.', 'It returns None.', 'None.'],
    ],
    boss: [
      'Print is not return',
      'def g(x): print(x * 2). Then y = g(5) + 1. What happens?',
      ['It prints 10, then fails: g returns None, and None + 1 is an error', 'y = 11', 'y = 10', 'It prints 11'],
      'What does g send back?',
      'print shows a value on the screen but returns nothing (None). A function that should give an answer must use return.',
    ],
    read: [
      ['wiki', 'EDSAC', 'The Cambridge machine and its routine library.', 'The Electronic Delay Storage Automatic Calculator (EDSAC) was an early British computer.'],
      THINK('Chapter 3, Functions', 'Defining and calling functions.', 'In the context of programming, a function is a named sequence of statements that performs a computation.'),
    ],
    sources: [
      ['Wikipedia: EDSAC', W('EDSAC'), 'Wilkes, May 1949, the routine library'],
      ['Wikipedia: David Wheeler (computer scientist)', W('David_Wheeler_(computer_scientist)'), 'the Wheeler jump, PhD 1951'],
      ['Wikipedia: Function (computer programming)', W('Function_(computer_programming)'), 'parameters and return values'],
    ],
    labs: [
      TUTOR('def sq(x): return x * x, then print(sq(3) + sq(4)). Step through: watch a new frame appear for each call and vanish on return.'),
      home('Write a recipe that says “make the sauce (see page 12)” instead of repeating the sauce steps. That page is a function.'),
    ],
    quiz: [
      ['Which computer ran its first program at Cambridge in May 1949?', ['EDSAC', 'ENIAC', 'Colossus', 'UNIVAC'], 'Maurice Wilkes’s machine.'],
      ['The Wheeler jump is the ancestor of…', ['the function call', 'the if statement', 'the loop', 'the variable'], 'Jump into a routine and come back.'],
    ],
    gloss: [
      ['Function', 'A named, reusable block of code that takes inputs and can return a value.', ['functions']],
      ['Parameter', 'A name in a function definition for an input value.', ['parameters', 'argument', 'arguments']],
      ['Return value', 'The value a function sends back to where it was called.', ['return', 'returns']],
    ],
    events: [
      [1949, 'EDSAC runs', 'A library of reusable routines.', false],
      [1951, 'Wheeler’s PhD', 'Often called the first in computer science.', false],
    ],
  }),

  mk({
    id: 'cs-105',
    code: 'CC 102',
    track: 'prog',
    um: [],
    after: ['cs-104'],
    title: 'Lists and Text: Many Values Under One Name',
    subtitle: 'Arrays, counting from zero, finding the largest, and letters as numbers',
    digest: [
      'A list holds many values in order: marks = [78, 92, 65]. marks[0] is the first item, because Python counts from 0.',
      'len(marks) is how many items there are; the last one is marks[len(marks) − 1].',
      'Text (a string) is a list of characters, and each character is stored as a number (A = 65 in ASCII).',
    ],
    era: '1957 FORTRAN arrays → 1963 ASCII → 1982 Dijkstra on counting from zero',
    who: 'John Backus, the ASCII committee & Edsger Dijkstra',
    hook: 'A class has 40 students. Do you need 40 variable names to store their marks?',
    story: [
      'FORTRAN in 1957 already had arrays: one name for a whole row of numbers, with a position number to pick one out [1]. Scientists could store a table of measurements and loop over it [1].',
      'Many languages, including C and Python, number the positions from 0 rather than 1 [2]. In a short note of 1982 Edsger Dijkstra argued that starting at 0 makes ranges cleaner: the items 0 to n − 1 are exactly n items [2].',
      'Text is stored as numbers too. The ASCII code, first published in 1963, gave each English letter, digit and sign a number from 0 to 127; capital A is 65 [3]. Today Unicode extends the idea to almost every writing system, including Baybayin [4].',
    ],
    takeaway: 'Lists keep many values under one name; positions start at 0. Looping over a list is how programs find totals, averages and the largest value.',
    viz: 'list_scan',
    vizTitle: 'Finding the Largest',
    vizHow: 'A list of numbers sits in numbered boxes, starting at 0. Watch a loop walk along it, keeping the best value so far. Change the list.',
    steps: [
      ['Positions', '\\texttt{a = [78, 92, 65]};\\ \\texttt{a[1]} = 92', 'Counting starts at 0, so a[1] is the second item.'],
      ['Length and last', '\\texttt{len(a)} = 3,\\ \\texttt{a[len(a)-1]} = 65', 'The last position is one less than the length.'],
      ['Best so far', '\\texttt{best = a[0];\\ for x in a: if x > best: best = x}', 'One pass along the list finds the largest.'],
    ],
    drills: [
      ['a = [4, 8, 15, 16, 23, 42]. What is a[3]?', ['16', '15', '23', '8'], 'Count from 0.', 'a[0] = 4, a[1] = 8, a[2] = 15, a[3] = 16.', '16.'],
      ['How many items in [0, 0, 0, 0, 0]?', ['5', '4', '0', '1'], 'len.', 'Five zeros.', '5.'],
      ['In ASCII, A is 65. What is C?', ['67', '66', '68', '99'], 'Letters go in order.', 'A 65, B 66, C 67.', '67.'],
    ],
    boss: [
      'Off the end',
      'a = [3, 1, 4]. A loop runs for i in range(1, len(a) + 1): print(a[i]). What happens?',
      ['It prints 1 and 4, then crashes at a[3]: there is no fourth item', 'It prints 3, 1, 4', 'It prints 1, 4', 'It prints nothing'],
      'Which positions exist?',
      'Positions are 0, 1, 2. Starting at 1 skips the first item and a[3] is outside the list (IndexError). Use range(len(a)), or simply for x in a.',
    ],
    read: [
      ['wiki', 'Zero-based numbering', 'Why counting from 0 won.', 'Zero-based numbering is a way of numbering in which the initial element of a sequence is assigned the index 0.'],
      THINK('Chapter 10, Lists', 'Lists, positions and looping.', 'Like a string, a list is a sequence of values.'),
    ],
    sources: [
      ['Wikipedia: Fortran (features)', W('Fortran'), 'arrays in the 1957 language'],
      ['Wikipedia: Zero-based numbering', W('Zero-based_numbering'), 'C, Python, Dijkstra’s 1982 note'],
      ['Wikipedia: ASCII', W('ASCII'), '1963, 128 codes, A = 65'],
      ['Wikipedia: Baybayin (Unicode)', W('Baybayin'), 'Baybayin is in Unicode'],
    ],
    labs: [
      TUTOR('marks = [78, 92, 65, 88], then a loop that keeps the largest in best. Step through and watch best change.'),
      home('Write your name in ASCII numbers (A = 65, a = 97). What is the difference between a capital and a small letter?'),
    ],
    quiz: [
      ['When was ASCII first published?', ['1963', '1945', '1981', '1991'], 'The American Standard Code for Information Interchange.'],
      ['Who wrote the 1982 note arguing for counting from zero?', ['Edsger Dijkstra', 'Grace Hopper', 'Dennis Ritchie', 'Alan Kay'], 'EWD831.'],
    ],
    gloss: [
      ['List', 'An ordered collection of values under one name, e.g. [3, 1, 4].', ['lists']],
      ['Array', 'A row of values stored side by side and picked out by position.', ['arrays']],
      ['String', 'A piece of text: a sequence of characters.', ['strings']],
    ],
    events: [
      [1963, 'ASCII published', 'A number for every letter.', false],
      [1982, 'Dijkstra: why numbering should start at zero', 'EWD831.', false],
    ],
  }),

  mk({
    id: 'cs-106',
    code: 'CC 102',
    track: 'prog',
    um: [],
    after: ['cs-105'],
    title: 'Bugs: Finding and Fixing Mistakes',
    subtitle: 'The moth in the relay, the Mariner 1 crash, off-by-one errors and testing',
    digest: [
      'A bug is a mistake in a program. Every programmer writes them; the skill is finding them.',
      'Off-by-one errors are the most common: 10 metres of fence with posts every metre needs 11 posts, not 10.',
      'Test with small cases you can check by hand, including the edges: empty lists, 0, 1, the largest value.',
    ],
    era: '1878 Edison’s “bugs” → 1947 the moth → 1962 Mariner 1',
    who: 'Thomas Edison, Grace Hopper’s Harvard team & NASA',
    hook: 'A rocket worth millions was blown up minutes after launch because of one missing symbol. How do mistakes like that slip through?',
    story: [
      'Engineers called faults “bugs” long before computers: Thomas Edison used the word in letters in 1878 [1]. On 9 September 1947 operators of the Harvard Mark II, the team Grace Hopper worked with, found a moth stuck in a relay and taped it in their logbook as the “first actual case of bug being found” [1][2].',
      'On 22 July 1962 the Mariner 1 probe to Venus veered off course and was destroyed by the range safety officer about five minutes after launch [3]. The inquiry blamed an error in the guidance equations, often told as a missing bar or hyphen in the handwritten formula; the exact detail is still argued [3].',
      'The most common slip of all is being off by one: counting the sections of a fence instead of the posts, or stopping a loop one step too early or too late [4].',
    ],
    takeaway: 'Expect bugs. Trace by hand, test small and edge cases, and when a test fails, find the first line where the boxes hold something you did not expect.',
    viz: 'fencepost',
    vizTitle: 'Posts and Sections',
    vizHow: 'Set the length of a fence. Count the sections and the posts. Then see which range(...) gives the right count, and which is off by one.',
    steps: [
      ['Fence posts', '\\text{posts} = \\text{sections} + 1', 'A 10 m fence with a post every metre has 10 sections but 11 posts.'],
      ['Counting a range', '\\texttt{range(a, b)}\\ \\text{has}\\ b - a\\ \\text{items}', 'range(0, 10) is 0 to 9: ten numbers.'],
      ['Inclusive count', 'a, a{+}1, \\dots, b\\ \\text{is}\\ b - a + 1\\ \\text{numbers}', 'Pages 5 to 9 are 5 pages, not 4.'],
    ],
    drills: [
      ['How many numbers from 3 to 10, counting both ends?', ['8', '7', '10', '13'], 'b − a + 1.', '10 − 3 + 1.', '8.'],
      ['A 20 m fence with a post every 2 m needs how many posts?', ['11', '10', '20', '9'], 'Sections first.', '10 sections, so 11 posts.', '11.'],
      ['Who taped the moth into the Mark II logbook in 1947?', ['Operators on Grace Hopper’s Harvard team', 'Thomas Edison', 'Alan Turing', 'NASA engineers'], 'Harvard.', 'The Mark II team.', 'The Harvard Mark II operators.'],
    ],
    boss: [
      'The average that crashes',
      'def avg(a): return sum(a) / len(a). Which test case finds a bug?',
      ['avg([]): an empty list divides by zero', 'avg([2, 4])', 'avg([5])', 'avg([1, 2, 3])'],
      'Think about the edges.',
      'With no items, len(a) = 0 and Python raises ZeroDivisionError. The fix is to decide what an empty list should give, and check for it first.',
    ],
    read: [
      ['wiki', 'Software bug', 'Where the word came from and famous bugs.', 'A software bug is a design defect (bug) in computer software.'],
      ['wiki', 'Off-by-one error', 'The most common bug of all.', 'An off-by-one error or off-by-one bug is a logic error that involves a number that differs from its intended value by 1.'],
    ],
    sources: [
      ['Wikipedia: Software bug (history)', W('Software_bug'), 'Edison 1878, the 1947 moth'],
      ['Wikipedia: Grace Hopper', W('Grace_Hopper'), 'the Mark II and the logbook'],
      ['Wikipedia: Mariner 1', W('Mariner_1'), '22 July 1962, destroyed after launch'],
      ['Wikipedia: Off-by-one error', W('Off-by-one_error'), 'fencepost errors'],
    ],
    labs: [
      TUTOR('Write avg(a) = sum(a) / len(a) and call it with [2, 4], [5] and []. Read the error message for the empty list.'),
      home('Count the steps between floors of a building and the number of floors. Which is the “posts” and which the “sections”?'),
    ],
    quiz: [
      ['In which year was the Mark II moth found?', ['1947', '1878', '1962', '1957'], '9 September 1947.'],
      ['Mariner 1 was headed for…', ['Venus', 'Mars', 'the Moon', 'Jupiter'], 'Launched 22 July 1962.'],
    ],
    gloss: [
      ['Bug', 'A mistake in a program that makes it behave wrongly.', ['bugs']],
      ['Debugging', 'Finding and fixing bugs.', ['debug']],
      ['Test case', 'An input whose correct output you know, used to check a program.', ['test cases', 'testing']],
      ['Off-by-one error', 'A count or loop that is one too many or one too few.', ['fencepost error']],
    ],
    events: [
      [1947, 'The moth in the Mark II', '“First actual case of bug being found.”', false],
      [1962, 'Mariner 1 lost', 'A guidance-equation error.', false],
    ],
  }),
];
