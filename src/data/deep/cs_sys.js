// Computer Science program, automata, operating systems, networks, databases
// and security (cs-141, cs-142, cs-151 to cs-156): each class split into three
// parts. Every number was worked out and checked by script.

const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const CS_SYS = {
  'cs-141': {
    predict: {
      q: 'A machine reads a binary number one bit at a time and may remember only one of three “states”. Can it tell whether any number, however long, is divisible by 3?',
      options: ['Yes: the state just tracks the remainder', 'No: it would need to store the whole number', 'Only for numbers under 1,000', 'Only if it can go back'],
      answer: 0,
      reveal: 'Appending a bit doubles the number and adds the bit, so the new remainder depends only on the old remainder and the bit. Three states, one per remainder, are enough for numbers of any length.',
    },
    parts: [
      {
        title: 'Machines with a few states',
        minutes: 20,
        explain: [
          'A deterministic finite automaton (DFA) has a fixed set of states, a start state, some accepting states, and a rule saying which state to move to for each state and symbol. It reads the input once, left to right, and accepts if it ends in an accepting state.',
          'It has no other memory. Everything it needs to know about the input so far must be squeezed into which state it is in.',
          'Vending machines, traffic lights, lift controllers and the text-matching inside search tools are finite automata.',
        ],
        formulas: [['Divisible-by-3 machine', 'q \\leftarrow (2q + b) \\bmod 3']],
        code: [['A DFA in Python', 'def div3(bits):\n    q = 0\n    for b in bits:\n        q = (2 * q + int(b)) % 3\n    return q == 0\n\nprint(div3("110"))   # True: 6\nprint(div3("111"))   # False: 7']],
        examples: [
          ex('Where does the divisible-by-3 machine end on 1011 (eleven)?', [['1 → 1, 0 → 2.', ''], ['1 → (4 + 1) mod 3 = 2, 1 → 2.', 'q = 2']], 'State 2: remainder 2'),
          ex('How many states does a machine need to check “an even number of 1s”?', [['It only needs to know even or odd so far.', ''], ['Two states.', '2']], '2'),
        ],
        practice: [
          pr('Final state of the divisible-by-3 machine on 10010 (eighteen)?', 0, 'Or just compute 18 mod 3.', '18 mod 3 = 0.'),
          pr('Final state on 1101 (thirteen)?', 1, '13 mod 3.', '1.'),
          pr('How many states would a machine need to test divisibility by 5 in the same way?', 5, 'One per remainder.', '5.'),
          pr('How many different binary strings of length 4 are there?', 16, '2⁴.', '16.'),
        ],
      },
      {
        title: 'Regular expressions',
        minutes: 25,
        explain: [
          'A regular expression is a pattern. Letters match themselves; | means “or”; * means “zero or more”; + means “one or more”; ? means “optional”; [0-9] means any one digit; {3} means exactly three times.',
          'Kleene’s theorem: any pattern written this way can be recognised by a finite automaton, and any finite automaton’s language can be written as such a pattern.',
          'Every major language has a regex library. In Python it is re.',
        ],
        formulas: [['Choices for a pattern of k independent digits', '10^{k}']],
        code: [['Regex in Python', 'import re\nphone = re.compile(r"09\\d{2} ?\\d{3} ?\\d{4}")\nprint(bool(phone.fullmatch("0917 123 4567")))   # True\nprint(bool(phone.fullmatch("917 123 4567")))    # False']],
        examples: [
          ex('How many strings does (a|b)(a|b) match?', [['Two choices, then two choices.', '2 \\times 2'], ['List: aa, ab, ba, bb.', '4']], '4'),
          ex('How many strings does [0-9]{3} match?', [['Three digits, ten choices each.', '10^3'], ['Result.', '1000']], '1,000'),
        ],
        practice: [
          pr('How many strings does (a|b|c)(a|b) match?', 6, '3 × 2.', '6.'),
          pr('How many strings does a?b match?', 2, 'With or without the a.', 'b and ab: 2.'),
          pr('How many different numbers does 09[0-9]{9} allow?', 1000000000, 'Nine free digits.', '10⁹ = 1,000,000,000.'),
          ch('Which matches “colour” and “color”?', ['colou?r', 'colo+r', 'col.r', 'colour|r'], '? makes one letter optional.', 'u? means zero or one u.'),
        ],
      },
      {
        title: 'Nondeterminism, speed and limits',
        minutes: 20,
        explain: [
          'A nondeterministic automaton (NFA) may have several possible moves, and accepts if any path works. Rabin and Scott showed any NFA with n states can be turned into a DFA with at most 2ⁿ states.',
          'Thompson’s 1968 method simulates the NFA directly, tracking the set of possible states, so a pattern of length m on a text of length n takes about m × n steps. Many modern libraries instead try one path and back up when it fails, which can be exponentially slow: a single such pattern took down Cloudflare’s network for about half an hour in July 2019.',
          'Finite automata cannot count without limit. No DFA checks balanced brackets or “n a’s then n b’s”, since that needs unbounded memory.',
        ],
        formulas: [['NFA to DFA', '\\le 2^n \\text{ states}'], ['Thompson simulation', '\\approx m \\times n \\text{ steps}']],
        examples: [
          ex('An NFA has 4 states. At most how many states does the equivalent DFA need?', [['Every subset of states may be a DFA state.', '2^4'], ['Result.', '16']], '16'),
          ex('Pattern of length 10, text of 1,000,000 characters, Thompson’s method: about how many steps?', [['m × n.', '10 \\times 10^6'], ['Result.', '10^7']], 'About 10 million'),
        ],
        practice: [
          pr('An NFA has 6 states. At most how many DFA states?', 64, '2⁶.', '64.'),
          pr('A backtracking matcher tries 2ⁿ paths on a bad input of length n = 30. How many paths, roughly? (give 2³⁰)', 1073741824, '2¹⁰ cubed.', '1,073,741,824.'),
          pr('Pattern length 20, text length 50,000, Thompson’s method: about how many steps?', 1000000, '20 × 50,000.', '1,000,000.'),
          ch('Which language can a finite automaton recognise?', ['Strings with an even number of a’s', 'Balanced brackets of any depth', 'aⁿbⁿ for every n', 'Palindromes of any length'], 'Which one needs only bounded memory?', 'Even/odd needs only 2 states; the others need unbounded counting.'),
        ],
      },
    ],
  },

  'cs-142': {
    predict: {
      q: 'Python prints 2 ** 3 ** 2. Is the answer 64 or 512?',
      options: ['512: powers group from the right', '64: everything goes left to right', 'An error', '36'],
      answer: 0,
      reveal: 'Python’s grammar makes ** right-associative: 2 ** (3 ** 2) = 2 ** 9 = 512. The grammar, not the order you read it in, decides the tree.',
    },
    parts: [
      {
        title: 'Grammars and derivations',
        minutes: 20,
        explain: [
          'A context-free grammar has rules like S ::= ( S ) S | ε, where ε means “nothing”. Starting from S and replacing names by right-hand sides, you derive every string of the language: here, all balanced bracket strings.',
          'The rule can put a name inside itself, so grammars describe nesting of any depth, which finite automata cannot (cs-141).',
          'The number of balanced strings with n pairs of brackets is the Catalan number Cₙ = (2n)! / ((n + 1)! n!): 1, 1, 2, 5, 14, 42, …',
        ],
        formulas: [['Catalan numbers', 'C_n = \\dfrac{1}{n+1}\\binom{2n}{n}']],
        examples: [
          ex('List the balanced strings with 2 pairs.', [['(()) and ()().', ''], ['Count.', 'C_2 = 2']], '2'),
          ex('How many balanced strings with 3 pairs?', [['C₃ = (1/4) × C(6, 3).', '20 / 4'], ['Result.', '5']], '5'),
        ],
        practice: [
          pr('How many balanced strings with 4 pairs?', 14, '(1/5) × C(8, 4) = 70/5.', '14.'),
          pr('How many balanced strings with 5 pairs?', 42, '(1/6) × C(10, 5) = 252/6.', '42.'),
          ch('Which string can S ::= ( S ) S | ε derive?', ['(()())', '())(', ')(', '((('], 'Every ( needs a matching ) after it.', 'Only (()()) is balanced.'),
          pr('How many characters long is every balanced string with 6 pairs?', 12, 'Two per pair.', '12.'),
        ],
      },
      {
        title: 'Precedence and associativity',
        minutes: 20,
        explain: [
          'Precedence decides which operator is grouped first: × before +. Grammars encode it by layers: an expression is terms joined by +, a term is factors joined by ×.',
          'Associativity decides how equal operators group. Subtraction is left-associative: 8 − 3 − 2 = (8 − 3) − 2 = 3. Powers are right-associative: 2³² means 2^(3²).',
          'A left-recursive rule (E ::= E − T) groups to the left; a right-recursive rule (P ::= F ^ P) groups to the right.',
        ],
        formulas: [['Layered grammar', 'E ::= E + T \\mid T,\\quad T ::= T \\times F \\mid F']],
        examples: [
          ex('Value of 8 − 3 − 2, left-associative?', [['(8 − 3) − 2.', '5 - 2'], ['Result.', '3']], '3'),
          ex('Value of 2 ** 3 ** 2 in Python?', [['Right first: 3 ** 2 = 9.', ''], ['2 ** 9.', '512']], '512'),
        ],
        practice: [
          pr('Value of 8 − 3 − 2 if − were right-associative?', 7, '8 − (3 − 2).', '7.'),
          pr('Value of 2 + 3 × 4 − 1 with normal precedence?', 13, '3 × 4 first.', '2 + 12 − 1 = 13.'),
          pr('Value of 100 / 10 / 5 (left-associative)?', 2, '(100 / 10) / 5.', '2.'),
          pr('Value of (2 + 3) × (4 − 1)?', 15, 'Brackets first.', '5 × 3 = 15.'),
        ],
      },
      {
        title: 'Parsers and the Chomsky hierarchy',
        minutes: 25,
        explain: [
          'A recursive-descent parser writes one function per grammar rule; each function calls the others. Many compilers read code this way, and Python’s parser since version 3.9 works on the same principle (a generated PEG parser).',
          'Chomsky’s hierarchy ranks grammars: regular (finite automata), context-free (one stack), context-sensitive, and unrestricted (Turing machines). Each level can describe more.',
          'An ambiguous grammar allows two trees for one string. For n operators with no precedence rules, there are Cₙ possible trees, so ambiguity grows fast.',
        ],
        formulas: [['Trees for n binary operators', 'C_n']],
        code: [['Recursive descent for + and ×', 'def expr(t):\n    v = term(t)\n    while t and t[0] == "+":\n        t.pop(0); v += term(t)\n    return v\n\ndef term(t):\n    v = int(t.pop(0))\n    while t and t[0] == "*":\n        t.pop(0); v *= int(t.pop(0))\n    return v\n\nprint(expr("2 + 3 * 4".split()))   # 14']],
        examples: [
          ex('How many trees does 1 − 2 − 3 − 4 have if the grammar is ambiguous?', [['Three operators.', 'C_3'], ['Result.', '5']], '5'),
          ex('Which machine matches context-free grammars?', [['They need nesting.', ''], ['A finite automaton plus one stack.', '\\text{pushdown automaton}']], 'A pushdown automaton'),
        ],
        practice: [
          pr('How many trees for 4 binary operators in an ambiguous grammar?', 14, 'C₄.', '14.'),
          pr('The recursive-descent code above: value of "1 + 2 * 3 * 4 + 5"?', 30, 'term handles the ×.', '1 + 24 + 5 = 30.'),
          ch('Which level of the hierarchy do Turing machines match?', ['Unrestricted', 'Regular', 'Context-free', 'Context-sensitive'], 'The top.', 'Unrestricted grammars generate exactly what Turing machines accept.'),
          pr('How many levels does the Chomsky hierarchy have?', 4, 'Types 0 to 3.', '4.'),
        ],
      },
    ],
  },

  'cs-151': {
    predict: {
      q: 'A laptop with 4 cores is running 300 processes. How many are actually running at any instant?',
      options: ['At most 4 (one per core)', 'All 300', 'About 150', 'Only 1'],
      answer: 0,
      reveal: 'Each core runs one process at a time. The scheduler switches them many times a second, so they all seem to run together.',
    },
    parts: [
      {
        title: 'Processes and switching',
        minutes: 20,
        explain: [
          'A process is a running program: its code, its memory, the values in the processor’s registers, and which files it has open. The OS keeps all this in a process table.',
          'A timer interrupts the processor every few milliseconds. The OS saves the running process’s registers, picks another process, restores its registers and lets it run: a context switch.',
          'A switch costs a few microseconds. Switching too often wastes time; too rarely, and the computer feels sluggish.',
        ],
        formulas: [['Overhead fraction', '\\text{overhead} = \\text{switches per second} \\times \\text{cost per switch}']],
        examples: [
          ex('A switch every 10 ms: how many per second?', [['1 s ÷ 10 ms.', '1000 / 10'], ['Result.', '100']], '100'),
          ex('1,000 switches a second at 5 µs each: what fraction of time is overhead?', [['5 ms per second.', '1000 \\times 5\\,\\mu s = 5\\,ms'], ['As a fraction.', '0.5\\%']], '0.5%'),
        ],
        practice: [
          pr('A switch every 4 ms: how many per second?', 250, '1000 ÷ 4.', '250.'),
          pr('2,000 switches a second at 5 µs each: overhead as a %?', 1, '10 ms per second.', '1%.'),
          pr('4 cores, 300 processes: at most how many run at the same instant?', 4, 'One per core.', '4.'),
          ch('What does a context switch save?', ['The registers and state of the running process', 'The whole hard disk', 'Nothing', 'The screen'], 'So it can resume later.', 'Registers, program counter and other state.'),
        ],
      },
      {
        title: 'Scheduling rules and waiting time',
        minutes: 25,
        explain: [
          'Waiting time is how long a job is ready but not running. Turnaround time is from arrival to finish. For jobs arriving together, wait = finish − length.',
          'First come, first served is simple but lets a long job hold up short ones (the convoy effect). Shortest job first gives the smallest average wait, but needs to know lengths in advance.',
          'Round robin gives each job a short slice in turn. It keeps response quick for every job at the cost of a larger average wait.',
        ],
        formulas: [['Average wait', '\\bar w = \\dfrac{1}{n} \\sum (\\text{finish}_i - \\text{length}_i)']],
        examples: [
          ex('Jobs A 8, B 2, C 3 ms, first come first served. Average wait?', [['Finishes 8, 10, 13; waits 0, 8, 10.', ''], ['Average.', '18 / 3 = 6']], '6 ms'),
          ex('Same jobs, shortest job first. Average wait?', [['Order B, C, A; finishes 2, 5, 13; waits 0, 2, 5.', ''], ['Average.', '7 / 3 \\approx 2.33']], 'About 2.33 ms'),
        ],
        practice: [
          pr('Same jobs, round robin with 2 ms turns: average wait in ms? (finishes A 13, B 4, C 9)', 4.33, 'Waits 5, 2, 6.', '13 / 3 ≈ 4.33.'),
          pr('Jobs 5, 1, 3 ms in that order, first come first served. Average wait?', 3.67, 'Waits 0, 5, 6.', '11 / 3 ≈ 3.67.'),
          pr('Jobs 5, 1, 3 ms, shortest job first. Average wait?', 1.67, 'Order 1, 3, 5: waits 0, 1, 4.', '5 / 3 ≈ 1.67.'),
          pr('Jobs A 8, B 2, C 3, first come first served. Average turnaround (finish time)?', 10.33, 'Finishes 8, 10, 13.', '31 / 3 ≈ 10.33.'),
        ],
      },
      {
        title: 'Unix processes: fork and exec',
        minutes: 20,
        explain: [
          'In Unix a process makes a new one by calling fork(): the OS copies the process, and both copies carry on from the same line. exec() then replaces a copy with a different program.',
          'Every program you start from a terminal is created this way, by the shell. All processes form a family tree back to the first one (process 1).',
          'If fork() is called in a loop, the copies fork too, so the number of processes doubles each time.',
        ],
        formulas: [['Processes after k forks in sequence', '2^k']],
        code: [['fork in Python (Linux or macOS)', 'import os\npid = os.fork()\nif pid == 0:\n    print("child")\nelse:\n    print("parent of", pid)']],
        examples: [
          ex('A program calls fork() three times in a row. How many processes run the last line?', [['Each fork doubles.', '2^3'], ['Result.', '8']], '8'),
          ex('Same, but count only new processes created.', [['8 in total, minus the original.', '8 - 1'], ['Result.', '7']], '7'),
        ],
        practice: [
          pr('fork() called 4 times in a row: total processes?', 16, '2⁴.', '16.'),
          pr('fork() called 5 times in a row: new processes created?', 31, '2⁵ − 1.', '31.'),
          ch('What does fork() return in the child?', ['0', 'The child’s id', '−1 always', 'The parent’s name'], 'The code above tests for it.', 'The child sees 0; the parent sees the child’s id.'),
          ch('What does exec() do?', ['Replaces the process’s program with another', 'Copies the process', 'Ends the computer', 'Deletes a file'], 'fork copies, exec …', 'It loads a new program into the existing process.'),
        ],
      },
    ],
  },

  'cs-152': {
    predict: {
      q: 'Two programs each add 1 to a shared counter, starting at 0. Can the final value be 1?',
      options: ['Yes, if both read 0 before either writes', 'No, it is always 2', 'Only on old computers', 'No, it can only be 0 or 2'],
      answer: 0,
      reveal: 'counter = counter + 1 is really three steps: read, add, write. If the two programs interleave badly, one update overwrites the other: a race condition.',
    },
    parts: [
      {
        title: 'Race conditions',
        minutes: 20,
        explain: [
          'Two threads share memory. Each step of one can fall between steps of the other, in any order. The number of possible interleavings grows very fast.',
          'If the result depends on which interleaving happens, there is a race condition. It may pass a thousand tests and fail on the thousand-and-first.',
          'The section of code that touches the shared data is the critical section. Only one thread at a time should be inside it.',
        ],
        formulas: [['Interleavings of two threads with a and b steps', '\\binom{a+b}{a}']],
        code: [['A race in Python', 'import threading\ncount = 0\ndef work():\n    global count\n    for _ in range(100000):\n        count += 1      # read, add, write: not one step\nts = [threading.Thread(target=work) for _ in range(2)]\nfor t in ts: t.start()\nfor t in ts: t.join()\nprint(count)   # may be less than 200000']],
        examples: [
          ex('Two threads, 3 steps each. How many interleavings?', [['Choose where thread 1’s steps go among 6.', '\\binom{6}{3}'], ['Result.', '20']], '20'),
          ex('Both read 0, both add 1, both write. Final counter?', [['Each writes 1.', ''], ['One update is lost.', '1']], '1'),
        ],
        practice: [
          pr('Two threads with 4 steps each: how many interleavings?', 70, 'C(8, 4).', '70.'),
          pr('Two threads with 2 steps each: how many interleavings?', 6, 'C(4, 2).', '6.'),
          pr('With a lock around count += 1, two threads each adding 1,000 times: final value?', 2000, 'No updates are lost.', '2,000.'),
          ch('What is a critical section?', ['Code that touches shared data and must not run in two threads at once', 'The fastest part of a program', 'The part that handles errors', 'The main function'], 'Shared data.', 'Only one thread should be in it at a time.'),
        ],
      },
      {
        title: 'Locks and semaphores',
        minutes: 20,
        explain: [
          'A lock (mutex) has two operations: acquire (wait until free, then take it) and release. Wrapping a critical section in a lock removes the race.',
          'Dijkstra’s semaphore is a counter. wait (P) decreases it and blocks if it would go below zero; signal (V) increases it and wakes a waiting process. A semaphore starting at 1 acts as a lock; one starting at 3 lets three processes in at once, like three parking spaces.',
          'Locks have costs: threads waiting for a lock do no work, so programs keep critical sections short.',
        ],
        formulas: [['Semaphore', 'P: s \\leftarrow s - 1 \\ (\\text{wait if } s < 0),\\quad V: s \\leftarrow s + 1']],
        code: [['A lock in Python', 'lock = threading.Lock()\ndef work():\n    global count\n    for _ in range(100000):\n        with lock:\n            count += 1']],
        examples: [
          ex('A semaphore starts at 3. Five processes call wait. How many get in?', [['Three find s ≥ 0 after decreasing.', ''], ['Two must wait.', '3']], '3 in, 2 waiting'),
          ex('Then one process inside calls signal. How many are inside now?', [['It leaves and wakes one waiter.', ''], ['Still at the limit.', '3']], '3'),
        ],
        practice: [
          pr('A semaphore starts at 2. Six processes call wait. How many must wait?', 4, '2 get in.', '4.'),
          pr('A semaphore starts at 1. What is the most processes inside at once?', 1, 'It acts as a lock.', '1.'),
          pr('A parking lot semaphore starts at 50. 47 cars are inside. How many more can enter without waiting?', 3, '50 − 47.', '3.'),
          ch('Which operation releases a semaphore?', ['signal (V)', 'wait (P)', 'fork', 'exec'], 'Dijkstra’s V.', 'signal increases the count.'),
        ],
      },
      {
        title: 'Deadlock and how to prevent it',
        minutes: 25,
        explain: [
          'Deadlock needs all four Coffman conditions: mutual exclusion, hold and wait, no pre-emption, and circular wait. Preventing any one prevents deadlock.',
          'The easiest to break is circular wait: number every lock and always take them in increasing order. A cycle would need someone to take a lower number after a higher one.',
          'Dijkstra’s banker’s algorithm avoids deadlock another way: it only grants a request if everyone could still finish afterwards.',
        ],
        formulas: [['Most diners eating at once (n philosophers, n forks)', '\\lfloor n/2 \\rfloor']],
        examples: [
          ex('Five philosophers, five forks. At most how many can eat at once?', [['Each eater needs 2 forks.', '\\lfloor 5/2 \\rfloor'], ['Result.', '2']], '2'),
          ex('P1 holds lock A, wants B. P2 holds B, wants A. Which condition do you break by ordering locks A before B?', [['P2 must take A first, so it cannot hold B while waiting for A.', ''], ['The cycle cannot form.', '\\text{circular wait}']], 'Circular wait'),
        ],
        practice: [
          pr('Seven philosophers, seven forks. At most how many eat at once?', 3, '⌊7/2⌋.', '3.'),
          pr('In the animation, how many meals are eaten in 12 steps with lower-numbered fork first?', 9, 'Run it to the end.', '9.'),
          pr('How many Coffman conditions must hold for a deadlock?', 4, 'All of them.', '4.'),
          ch('Which rule prevents deadlock among the philosophers?', ['Everyone takes the lower-numbered fork first', 'Everyone takes the left fork first', 'Everyone eats faster', 'Add a sixth philosopher'], 'Break the cycle.', 'A fixed order makes circular wait impossible.'),
        ],
      },
    ],
  },

  'cs-153': {
    predict: {
      q: 'Two programs both use memory address 1000. Do they overwrite each other?',
      options: ['No: each has its own virtual address 1000, mapped to different real memory', 'Yes, always', 'Only if they are the same program', 'The second one crashes'],
      answer: 0,
      reveal: 'With virtual memory, every process has its own private addresses. The OS and hardware map them to different places in real memory.',
    },
    parts: [
      {
        title: 'Pages and address translation',
        minutes: 20,
        explain: [
          'Virtual memory splits each process’s addresses into pages, often 4 KiB = 4,096 bytes. Real memory is split into frames of the same size.',
          'An address is split into a page number and an offset within the page. A page table maps page numbers to frame numbers; the offset stays the same.',
          'Since 4,096 = 2¹², the offset is the last 12 bits and the page number is the rest. A small cache of recent translations, the TLB, makes this fast.',
        ],
        formulas: [['Split', '\\text{page} = \\lfloor a / 4096 \\rfloor,\\quad \\text{offset} = a \\bmod 4096'], ['Pages in a 32-bit space', '2^{32} / 2^{12} = 2^{20}']],
        examples: [
          ex('Address 20,000 with 4 KiB pages: page and offset?', [['20,000 ÷ 4,096 = 4 remainder.', '4 \\times 4096 = 16\\,384'], ['Offset.', '20\\,000 - 16\\,384 = 3616']], 'Page 4, offset 3,616'),
          ex('Page 4 is in frame 9. Real address?', [['Frame start.', '9 \\times 4096 = 36\\,864'], ['Add the offset.', '36\\,864 + 3616 = 40\\,480']], '40,480'),
        ],
        practice: [
          pr('Address 10,000, 4 KiB pages: page number?', 2, '10,000 ÷ 4,096.', '2 (8,192 ≤ 10,000 < 12,288).'),
          pr('Same address: offset?', 1808, '10,000 − 8,192.', '1,808.'),
          pr('How many 4 KiB pages in a 32-bit address space?', 1048576, '2²⁰.', '1,048,576.'),
          pr('How many bits is the offset for 4 KiB pages?', 12, '4,096 = 2¹².', '12.'),
        ],
      },
      {
        title: 'Choosing a page to evict',
        minutes: 25,
        explain: [
          'When memory is full and a missing page is needed, the OS must evict one. FIFO evicts the page loaded longest ago. LRU evicts the page unused for the longest time. Bélády’s optimal rule evicts the page needed furthest in the future, which is best but needs to see the future.',
          'For the reference string 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1 with 3 frames: FIFO gives 15 faults, LRU 12, optimal 9.',
          'With FIFO, more frames can sometimes mean more faults (Bélády’s anomaly). LRU never has this problem.',
        ],
        formulas: [['Fault rate', 'p = \\dfrac{\\text{faults}}{\\text{requests}}']],
        examples: [
          ex('Requests 1 2 3 1 4 with 3 frames and FIFO. Faults?', [['1, 2, 3 fault; 1 hits.', '3'], ['4 faults, evicting 1.', '4']], '4'),
          ex('FIFO fault rate for the 20-request string?', [['15 faults.', '15 / 20'], ['Result.', '0.75']], '75%'),
        ],
        practice: [
          pr('LRU fault rate for the 20-request string, as a %?', 60, '12 of 20.', '60%.'),
          pr('Requests 1 2 3 4 1 2 5 1 2 3 4 5 with FIFO and 3 frames: faults?', 9, 'Bélády’s example.', '9.'),
          pr('Same requests with FIFO and 4 frames: faults?', 10, 'More frames, more faults!', '10.'),
          pr('Requests 1 2 1 3 1 4 with 2 frames and LRU: faults?', 4, '1, 2 fault; 1 hits; 3 evicts 2; 1 hits; 4 evicts 3.', '4.'),
        ],
      },
      {
        title: 'What a page fault costs',
        minutes: 20,
        explain: [
          'A memory read takes about 100 ns. Servicing a page fault from disk can take milliseconds, tens of thousands of times longer.',
          'The effective access time mixes the two: EAT = (1 − p) × memory time + p × fault time. Even one fault in a thousand accesses makes memory about 80 times slower.',
          'When the working sets of all running programs do not fit, faults pile up and the machine thrashes. The fix is more memory or fewer programs.',
        ],
        formulas: [['Effective access time', '\\text{EAT} = (1-p)\\,t_m + p\\,t_f']],
        examples: [
          ex('t_m = 100 ns, t_f = 8 ms, p = 1/1000. EAT?', [['8 ms = 8,000,000 ns.', '0.999 \\times 100 + 0.001 \\times 8\\times10^6'], ['Add.', '99.9 + 8000 \\approx 8100\\,\\text{ns}']], 'About 8,100 ns'),
          ex('Same, but p = 0. EAT?', [['No faults.', ''], ['Just memory.', '100\\,\\text{ns}']], '100 ns'),
        ],
        practice: [
          pr('t_m = 100 ns, t_f = 8 ms, p = 1/1000: how many times slower than 100 ns? (EAT ≈ 8,099.9)', 81, 'Divide.', '≈ 81.'),
          pr('t_m = 100 ns, t_f = 1 ms (SSD), p = 1/1000: EAT in ns?', 1099.9, '0.999 × 100 + 0.001 × 1,000,000.', '99.9 + 1,000 = 1,099.9 ns.'),
          pr('A program makes 10⁹ memory accesses with p = 10⁻⁶. How many page faults?', 1000, '10⁹ × 10⁻⁶.', '1,000.'),
          ch('What is thrashing?', ['So many page faults that the machine does little useful work', 'Fast sorting', 'Running out of disk', 'A kind of virus'], 'Denning, 1968.', 'Memory cannot hold the working sets.'),
        ],
      },
    ],
  },

  'cs-154': {
    predict: {
      q: 'IPv4 addresses are 32 bits. Are there enough for every person on Earth to have one?',
      options: ['No: about 4.3 billion addresses for over 8 billion people', 'Yes, easily', 'Exactly enough', 'There is no limit'],
      answer: 0,
      reveal: '2³² ≈ 4.3 billion. The central pool ran out in 2011. Home routers share one address among many devices, and IPv6, with 2¹²⁸ addresses, is the long-term fix.',
    },
    parts: [
      {
        title: 'IP addresses and networks',
        minutes: 20,
        explain: [
          'An IPv4 address is 32 bits, written as four numbers 0–255: 192.168.1.10. Each number is one byte.',
          'A network is named by a prefix: 192.168.1.0/24 means the first 24 bits are fixed, leaving 8 bits, 256 addresses, for devices. Routers look only at prefixes to decide where to send a packet next.',
          'IPv6 uses 128 bits, about 3.4 × 10³⁸ addresses, written in hexadecimal groups like 2001:db8::1.',
        ],
        formulas: [['Addresses in a /n network (IPv4)', '2^{32 - n}']],
        examples: [
          ex('How many addresses in a /24 network?', [['32 − 24 = 8 free bits.', '2^8'], ['Result.', '256']], '256'),
          ex('Write the byte 11000000 as a decimal number.', [['128 + 64.', ''], ['Result.', '192']], '192'),
        ],
        practice: [
          pr('Addresses in a /16 network?', 65536, '2¹⁶.', '65,536.'),
          pr('Addresses in a /28 network?', 16, '2⁴.', '16.'),
          pr('Total IPv4 addresses?', 4294967296, '2³².', '4,294,967,296.'),
          pr('Decimal value of the byte 10101000?', 168, '128 + 32 + 8.', '168.'),
        ],
      },
      {
        title: 'How TCP makes delivery reliable',
        minutes: 25,
        explain: [
          'TCP opens a connection with a three-way handshake: SYN, SYN-ACK, ACK. Then it numbers the bytes it sends, and the receiver acknowledges what it has received.',
          'Missing acknowledgements trigger a resend after a timeout. The window, the amount of unacknowledged data allowed in flight, limits speed: at most one window per round-trip time.',
          'So throughput ≤ window ÷ round-trip time. Long-distance links need big windows to be fast.',
        ],
        formulas: [['Throughput limit', '\\text{throughput} \\le \\dfrac{\\text{window}}{\\text{RTT}}']],
        examples: [
          ex('Window 64 KiB (65,536 bytes), RTT 100 ms. Maximum throughput in bytes per second?', [['Divide.', '65\\,536 / 0.1'], ['Result.', '655\\,360\\ \\text{B/s}']], '655,360 B/s, about 5.2 Mbit/s'),
          ex('In the animation, rounds to deliver 8 packets with window 4 and packet 3 lost once?', [['Round 1 delivers 1, 2. Round 2 delivers 3–6.', ''], ['Round 3 delivers 7, 8.', '3']], '3'),
        ],
        practice: [
          pr('How many messages in TCP’s handshake?', 3, 'SYN, SYN-ACK, ACK.', '3.'),
          pr('Window 65,536 bytes, RTT 100 ms: maximum throughput in bits per second?', 5242880, '655,360 × 8.', '5,242,880 bit/s.'),
          pr('Window 1,000,000 bytes, RTT 50 ms: maximum bytes per second?', 20000000, '10⁶ ÷ 0.05.', '20,000,000 B/s.'),
          pr('No loss, window 4: how many rounds to deliver 8 packets?', 2, '4 per round.', '2.'),
        ],
      },
      {
        title: 'Congestion control',
        minutes: 20,
        explain: [
          'Routers queue packets; when a queue is full, packets are dropped. Before 1988, TCP resent lost packets at full speed, making queues worse. In October 1986 throughput on one link fell from 32 kbit/s to 40 bit/s.',
          'Jacobson’s fix: slow start doubles the window every round trip until loss; then additive increase, multiplicative decrease (AIMD): add 1 segment per round trip, halve on loss.',
          'Every TCP connection backing off a little lets everyone share the network fairly.',
        ],
        formulas: [['Slow start', 'w \\leftarrow 2w \\text{ per RTT}'], ['AIMD', 'w \\leftarrow w + 1;\\quad \\text{on loss } w \\leftarrow w/2']],
        examples: [
          ex('Slow start from 1 segment: round trips to reach 64?', [['1, 2, 4, 8, 16, 32, 64.', ''], ['Six doublings.', '6']], '6'),
          ex('AIMD at 40 segments; a loss. Round trips to get back to 40?', [['Halve to 20.', ''], ['Add 1 per RTT.', '20']], '20'),
        ],
        practice: [
          pr('Slow start from 1: round trips to reach 1,024 segments?', 10, '2¹⁰.', '10.'),
          pr('AIMD at 60 segments; a loss. Window right after?', 30, 'Halve.', '30.'),
          pr('By what factor did throughput fall in 1986 (32 kbit/s to 40 bit/s)?', 800, '32,000 ÷ 40.', '800.'),
          ch('Why does TCP halve its window when a packet is lost?', ['Loss usually means queues are full, so it backs off', 'To save power', 'Because the packet was too big', 'To switch to IPv6'], 'Jacobson’s insight.', 'Lost packets signal congestion.'),
        ],
      },
    ],
  },

  'cs-155': {
    predict: {
      q: 'Asking a database “which students scored 80 or more?”, do you tell it how to search?',
      options: ['No: you say what you want, and it plans the search', 'Yes, step by step', 'Only for big tables', 'You must sort the table first'],
      answer: 0,
      reveal: 'SQL is declarative. A query planner chooses indexes and join orders. That was Codd’s idea: separate what you ask from how the data is stored.',
    },
    parts: [
      {
        title: 'Tables, rows and keys',
        minutes: 20,
        explain: [
          'A relation (table) has columns with names and types, and rows of values. Codd’s rule: every row is distinct, and no meaning hides in the row order.',
          'A primary key identifies each row (a student id). A foreign key in another table refers to it (finished.student refers to students.id). Keys link tables without copying data.',
          'Keeping each fact in one place avoids contradictions: a name changed in students is changed everywhere.',
        ],
        formulas: [['Rows in a cross product', '|A \\times B| = |A| \\cdot |B|']],
        code: [['Making tables in SQLite', 'import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT)")\ndb.execute("CREATE TABLE finished (student INTEGER REFERENCES students(id), class TEXT, score INTEGER)")']],
        examples: [
          ex('students has 4 rows, finished has 6. How many rows in the cross product (every pairing)?', [['Multiply.', '4 \\times 6'], ['Result.', '24']], '24'),
          ex('How many of those 24 pairings have matching ids?', [['Each finished row matches exactly one student.', ''], ['So one per finished row.', '6']], '6'),
        ],
        practice: [
          pr('A table of 100 students and one of 50 classes: rows in the cross product?', 5000, '100 × 50.', '5,000.'),
          pr('finished has 6 rows, each with a valid student id. Rows in students JOIN finished?', 6, 'One match each.', '6.'),
          ch('What is a primary key?', ['A column whose value identifies each row', 'The first column', 'A password', 'The biggest number'], 'Unique.', 'No two rows share it.'),
          ch('finished.student refers to students.id. What is finished.student?', ['A foreign key', 'A primary key', 'An index', 'A transaction'], 'It points elsewhere.', 'A foreign key.'),
        ],
      },
      {
        title: 'Asking questions in SQL',
        minutes: 25,
        explain: [
          'SELECT chooses columns, FROM names tables, WHERE filters rows, JOIN … ON pairs rows, GROUP BY collects rows sharing a value, and ORDER BY sorts.',
          'Aggregate functions summarise: COUNT, SUM, AVG, MIN, MAX.',
          'The data used below: scores 92, 75, 68, 88, 95, 81 for students 1, 1, 2, 3, 3, 4.',
        ],
        formulas: [['Average', '\\texttt{AVG(score)} = \\dfrac{\\sum \\text{score}}{n}']],
        code: [['A query from Python', 'rows = db.execute("""\n  SELECT name, COUNT(*) FROM students\n  JOIN finished ON id = student\n  WHERE score >= 80\n  GROUP BY name ORDER BY COUNT(*) DESC""").fetchall()']],
        examples: [
          ex('SELECT COUNT(*) FROM finished WHERE score >= 80?', [['92, 88, 95, 81 pass.', ''], ['Count.', '4']], '4'),
          ex('SELECT AVG(score) FROM finished?', [['Sum.', '92+75+68+88+95+81 = 499'], ['Divide by 6.', '\\approx 83.17']], 'About 83.17'),
        ],
        practice: [
          pr('SELECT MAX(score) FROM finished?', 95, 'The biggest.', '95.'),
          pr('SELECT SUM(score) FROM finished WHERE student = 1?', 167, '92 + 75.', '167.'),
          pr('SELECT COUNT(*) FROM finished WHERE score < 80?', 2, '75 and 68.', '2.'),
          pr('SELECT AVG(score) FROM finished WHERE student = 3?', 91.5, '(88 + 95) ÷ 2.', '91.5.'),
        ],
      },
      {
        title: 'Indexes and transactions',
        minutes: 20,
        explain: [
          'Without an index, finding rows means scanning the whole table. An index, usually a B-tree (cs-135), finds a key in a few steps even among millions of rows.',
          'A transaction groups changes. The ACID properties: atomic (all or nothing), consistent (rules hold), isolated (concurrent transactions do not see each other’s half-done work), durable (once committed, it survives a crash).',
          'Databases log each change before making it, so after a crash they can redo committed work and undo the rest.',
        ],
        formulas: [['B-tree levels', '\\approx \\log_b n']],
        code: [['A transaction', 'with db:   # commits at the end, or rolls back on error\n    db.execute("UPDATE acct SET bal = bal - 1000 WHERE id = 1")\n    db.execute("UPDATE acct SET bal = bal + 1000 WHERE id = 2")']],
        examples: [
          ex('1,000,000 rows, a B-tree with 100 keys per node: levels?', [['log₁₀₀ 10⁶.', '6 / 2'], ['Result.', '3']], 'About 3'),
          ex('A scan reads all 1,000,000 rows; the index reads 3 nodes. How many times fewer reads?', [['Divide.', '10^6 / 3'], ['Result.', '\\approx 333\\,333']], 'About 333,000 times fewer'),
        ],
        practice: [
          pr('10⁸ rows, B-tree with 100 keys per node: levels?', 4, 'log₁₀₀ 10⁸.', '4.'),
          pr('Accounts A = ₱5,000 and B = ₱2,000. A transfer of ₱1,000 fails halfway and rolls back. What is A?', 5000, 'All or nothing.', '₱5,000: unchanged.'),
          pr('How many letters in ACID?', 4, 'Atomic, consistent, isolated, durable.', '4.'),
          ch('Which ACID property means a committed change survives a power cut?', ['Durable', 'Atomic', 'Isolated', 'Consistent'], 'It lasts.', 'Durability.'),
        ],
      },
    ],
  },

  'cs-156': {
    predict: {
      q: 'A message is encrypted by replacing every letter with another letter (any mixed-up alphabet, 26! ≈ 4 × 10²⁶ keys). Is it safe?',
      options: ['No: letter frequencies still give it away', 'Yes: too many keys to try', 'Only if the message is short', 'Only in English'],
      answer: 0,
      reveal: 'A huge number of keys is not enough. Each letter is always replaced the same way, so E’s frequency shows through. Al-Kindi broke such ciphers by hand in the 9th century.',
    },
    parts: [
      {
        title: 'Caesar and substitution ciphers',
        minutes: 20,
        explain: [
          'Caesar’s cipher shifts each letter k places: c = (p + k) mod 26, with A = 0. Decrypting shifts back. There are only 25 useful keys, so trying them all is quick.',
          'A general substitution cipher uses any mixed-up alphabet: 26! keys. Brute force is hopeless, but frequency analysis breaks it: match the most common cipher letters to E, T, A, O, then fill in words.',
          'The lesson, written down by Auguste Kerckhoffs in 1883: a cipher must stay safe even if the enemy knows the method; only the key is secret.',
        ],
        formulas: [['Caesar', 'c = (p + k) \\bmod 26']],
        code: [['Caesar in Python', 'def caesar(s, k):\n    return "".join(chr((ord(c) - 65 + k) % 26 + 65) if c.isalpha() else c for c in s.upper())\nprint(caesar("HELLO", 3))    # KHOOR\nprint(caesar("KHOOR", -3))   # HELLO']],
        examples: [
          ex('Encrypt HELLO with shift 3.', [['H → K, E → H, L → O.', ''], ['O → R.', '\\text{KHOOR}']], 'KHOOR'),
          ex('The most common letter in a long Caesar message is L. Likely key?', [['L should be E.', '11 - 4'], ['Shift.', '7']], '7'),
        ],
        practice: [
          pr('Shift 3: what number (A = 0) does Y become?', 1, '(24 + 3) mod 26.', '27 mod 26 = 1: B.'),
          pr('The most common cipher letter is H. Likely Caesar key? (A = 0)', 3, 'H is 7, E is 4.', '7 − 4 = 3.'),
          pr('How many useful Caesar keys are there?', 25, 'Shift 0 changes nothing.', '25.'),
          pr('In the animation, what shift reveals the message?', 7, 'Line up L with E.', '7.'),
        ],
      },
      {
        title: 'Vigenère, Enigma and the one-time pad',
        minutes: 25,
        explain: [
          'The Vigenère cipher (described by Bellaso in 1553) uses a keyword: each letter is shifted by the matching key letter, repeating. It hid frequencies for 300 years until Babbage and Kasiski broke it in the 19th century by finding the key length.',
          'Enigma used rotors that stepped with each key press, so the substitution changed every letter. Its key space was enormous, but procedure mistakes and Polish and British mathematics broke it.',
          'The one-time pad uses a truly random key as long as the message, never reused. Shannon proved in 1949 that the ciphertext then reveals nothing about the message.',
        ],
        formulas: [['Vigenère', 'c_i = (p_i + k_{i \\bmod m}) \\bmod 26']],
        examples: [
          ex('Vigenère with key LEMON: encrypt the first letter of ATTACK.', [['A = 0, L = 11.', '0 + 11'], ['Letter 11.', 'L']], 'L'),
          ex('Second letter: T (19) with key E (4)?', [['19 + 4 = 23.', ''], ['Letter 23.', 'X']], 'X'),
        ],
        practice: [
          pr('Third letter: T (19) with key M (12). Number of the cipher letter?', 5, '31 mod 26.', '5: F.'),
          pr('Enigma (army): 3 rotors chosen in order from 5. How many rotor orders?', 60, '5 × 4 × 3.', '60.'),
          pr('Starting positions of 3 rotors with 26 positions each?', 17576, '26³.', '17,576.'),
          pr('A one-time pad for a 500-letter message needs a key of how many letters?', 500, 'As long as the message.', '500.'),
        ],
      },
      {
        title: 'Public keys and secure hashes',
        minutes: 25,
        explain: [
          'Diffie–Hellman: everyone knows a prime p and a base g. Alice picks a secret a and sends A = gᵃ mod p; Bob picks b and sends B = gᵇ mod p. Alice computes Bᵃ mod p and Bob computes Aᵇ mod p: both equal gᵃᵇ mod p, the shared secret.',
          'An eavesdropper sees p, g, A and B, but getting a from A (the discrete logarithm) is believed to be very hard for large p (2048 bits or more).',
          'A cryptographic hash such as SHA-256 turns any data into 256 bits. Changing one letter changes the hash completely, and nobody knows how to find two inputs with the same hash. Passwords, downloads and Git (cs-159) all rely on hashes.',
        ],
        formulas: [['Shared secret', 's = B^a \\bmod p = A^b \\bmod p = g^{ab} \\bmod p']],
        code: [['Diffie–Hellman with small numbers', 'p, g = 23, 5\na, b = 4, 3            # secrets\nA, B = pow(g, a, p), pow(g, b, p)   # 4, 10: sent in public\nprint(pow(B, a, p), pow(A, b, p))   # 18 18']],
        examples: [
          ex('p = 23, g = 5, a = 4. What does Alice send?', [['5⁴ = 625.', '625 \\bmod 23'], ['625 − 27 × 23 = 4.', '4']], 'A = 4'),
          ex('Bob sends B = 10. Alice’s shared secret?', [['10⁴ = 10,000.', '10\\,000 \\bmod 23'], ['10,000 − 434 × 23 = 18.', '18']], '18'),
        ],
        practice: [
          pr('p = 23, g = 5, Alice’s secret a = 6. What does she send?', 8, '5⁶ mod 23.', '15,625 mod 23 = 8.'),
          pr('Bob’s secret b = 15, so he sends 19. Alice’s shared secret (19⁶ mod 23)?', 2, 'Use pow(19, 6, 23).', '2. Bob gets 8¹⁵ mod 23 = 2 too.'),
          pr('How many hexadecimal characters does a 256-bit SHA-256 hash take?', 64, '4 bits per hex digit.', '256 ÷ 4 = 64.'),
          pr('How many bits are AES’s largest keys?', 256, 'AES-128, 192 or 256.', '256.'),
        ],
      },
    ],
  },
};
