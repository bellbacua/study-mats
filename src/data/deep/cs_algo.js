// Computer Science program, architecture and algorithms (cs-122, cs-123,
// cs-131 to cs-138): each class split into three parts. Every number was
// worked out and checked by script.

const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const CS_ALGO = {
  'cs-122': {
    predict: {
      q: 'Before 1948, to change what a big electronic computer did, what did people do?',
      options: ['Rewire it by hand with cables and switches', 'Type a new program on a keyboard', 'Download new software', 'Nothing: each machine did one job forever'],
      answer: 0,
      reveal: 'ENIAC was programmed with plugboards and switches; a new problem could take days of rewiring. The stored-program idea put the program in memory as numbers, so changing it became as easy as changing data.',
    },
    parts: [
      {
        title: 'Programs are numbers in memory',
        minutes: 20,
        explain: [
          'Memory is a long row of numbered cells. The number of a cell is its address; what is inside is its contents. The stored-program idea, written up by von Neumann in 1945 and first run on the Manchester Baby in 1948, keeps instructions in those same cells as data.',
          'Because instructions are just numbers, one program can write or load another. That is what an operating system, a compiler or an app store does.',
          'The Little Man Computer, a teaching model from 1965, has 100 cells (addresses 00 to 99), each holding a three-digit number, and one working register, the accumulator.',
        ],
        formulas: [['Cells you can address with d digits (base b)', 'b^{d}'], ['Bytes reachable by a 32-bit address', '2^{32} \\approx 4.29 \\times 10^{9}']],
        examples: [
          ex('How many cells can a two-digit decimal address reach?', [['Addresses run 00 to 99.', '10^2'], ['Count them.', '100']], '100'),
          ex('How many bytes can a 16-bit address reach?', [['Each bit doubles the count.', '2^{16}'], ['Work it out.', '65\\,536']], '65,536 bytes (64 KiB)'),
        ],
        practice: [
          pr('How many addresses does a 3-digit decimal address give?', 1000, '10³.', '1,000.'),
          pr('How many bytes can a 20-bit address reach?', 1048576, '2²⁰.', '1,048,576 (1 MiB).'),
          pr('A 32-bit address reaches 2³² bytes. How many GiB is that? (1 GiB = 2³⁰ bytes)', 4, '2³² ÷ 2³⁰.', '2² = 4 GiB. This is why 32-bit PCs topped out at 4 GB of RAM.'),
          ch('Why was storing the program in memory a big step?', ['A new program could be loaded like data, with no rewiring', 'It made the machine use less electricity', 'It removed the need for memory', 'It made arithmetic exact'], 'Think of ENIAC’s cables.', 'Programs became data, so changing them was quick, and programs could make programs.'),
        ],
      },
      {
        title: 'Fetch, decode, execute',
        minutes: 25,
        explain: [
          'The processor repeats one loop forever. Fetch: read the cell the program counter (PC) points to. Decode: work out what the number means. Execute: do it. Then the PC moves on to the next cell, unless the instruction was a jump.',
          'In the Little Man Computer the first digit is the operation and the last two are an address: 1xx ADD, 2xx SUBTRACT, 3xx STORE, 5xx LOAD, 6xx BRANCH (jump), 7xx BRANCH IF ZERO, 8xx BRANCH IF POSITIVE, 901 INPUT, 902 OUTPUT, 000 HALT.',
          'Real processors work the same way, only with binary codes and many registers. An x86 or ARM chip in your laptop still has a program counter.',
        ],
        formulas: [['Little Man Computer instruction', '\\text{instruction} = 100 \\times \\text{op} + \\text{address}']],
        code: [['The fetch-execute loop in Python', 'mem = [506, 107, 305, 0, 0, 0, 5, 7]\npc, acc = 0, 0\nwhile True:\n    ins = mem[pc]; pc += 1          # fetch\n    op, addr = ins // 100, ins % 100  # decode\n    if op == 5: acc = mem[addr]       # LOAD\n    elif op == 1: acc += mem[addr]    # ADD\n    elif op == 2: acc -= mem[addr]    # SUBTRACT\n    elif op == 3: mem[addr] = acc     # STORE\n    elif ins == 0: break              # HALT\nprint(mem[5])   # 12']],
        examples: [
          ex('Run 506, 107, 305, 000 with cell 6 = 5 and cell 7 = 7. What ends up in cell 5?', [['506 loads cell 6.', 'acc = 5'], ['107 adds cell 7.', 'acc = 12'], ['305 stores it in cell 5, then halt.', 'mem[5] = 12']], '12'),
          ex('Decode the instruction 742.', [['First digit 7: branch if zero.', 'op = 7'], ['Last two digits: the target.', 'addr = 42']], 'If the accumulator is 0, jump to cell 42'),
        ],
        practice: [
          pr('Same program but the second instruction is 207 (SUBTRACT cell 7). Cell 6 = 9, cell 7 = 4. What is in cell 5 at the end?', 5, 'Load 9, subtract 4.', '9 − 4 = 5.'),
          pr('What is the address part of the instruction 318?', 18, 'The last two digits.', '18: store into cell 18.'),
          pr('The program 506, 107, 305, 000 runs to the end. How many instructions are fetched?', 4, 'One fetch per instruction, including HALT.', '4.'),
          ch('After fetching the instruction at cell 3 (not a jump), where does the PC point?', ['Cell 4', 'Cell 3', 'Cell 0', 'The address inside the instruction'], 'It moves on by one.', 'Without a jump the PC just steps to the next cell.'),
        ],
      },
      {
        title: 'Clock speed and how much a processor does',
        minutes: 20,
        explain: [
          'A clock ticks the processor along. A 3 GHz clock ticks 3 billion times a second, so one tick lasts 1/3 of a nanosecond, about the time light takes to cross 10 cm.',
          'Modern processors overlap the fetch, decode and execute of several instructions (pipelining), and have several cores, so they finish more than one instruction per tick on average.',
          'Clock speeds stopped rising around 2005 at roughly 3 to 5 GHz because faster switching made too much heat. Since then, extra speed has come from more cores and smarter design.',
        ],
        formulas: [['Tick length', 't = \\dfrac{1}{f}'], ['Instructions per second', '\\text{IPS} = f \\times \\text{IPC} \\times \\text{cores}']],
        examples: [
          ex('How long is one tick of a 2 GHz clock?', [['Invert the frequency.', 't = 1 / (2\\times10^9)\\,\\text{s}'], ['In nanoseconds.', '0.5\\,\\text{ns}']], '0.5 ns'),
          ex('A 3 GHz chip averages 2 instructions per tick on each of 4 cores. Instructions per second?', [['Multiply.', '3\\times10^9 \\times 2 \\times 4'], ['Result.', '2.4\\times10^{10}']], '24 billion per second'),
        ],
        practice: [
          pr('How long is one tick of a 4 GHz clock, in nanoseconds?', 0.25, '1 ÷ 4 GHz.', '0.25 ns.'),
          pr('A 3 GHz core runs 1 instruction per tick. How many instructions in 1 millisecond?', 3000000, '3 × 10⁹ × 10⁻³.', '3 million.'),
          pr('The Manchester Baby (1948) ran about 1,100 instructions a second. How many times faster is a chip doing 1.1 × 10¹⁰ per second?', 10000000, 'Divide.', '1.1 × 10¹⁰ ÷ 1,100 = 10⁷: ten million times.'),
          pr('Light moves 3 × 10⁸ m/s. How far, in cm, does it go in one tick of a 3 GHz clock?', 10, 'Distance = speed × time, time = 1/3 ns.', '3 × 10⁸ × (1/3) × 10⁻⁹ = 0.1 m = 10 cm.'),
        ],
      },
    ],
  },

  'cs-123': {
    predict: {
      q: 'Reading a number from main memory (RAM) takes about 100 ns. Roughly how many simple additions could the processor do in that time?',
      options: ['A few hundred', 'One', 'Ten', 'None: they take the same time'],
      answer: 0,
      reveal: 'At 3 GHz with several instructions per tick, 100 ns is hundreds of instructions. That is why processors keep small, fast caches of recently used data right next to them.',
    },
    parts: [
      {
        title: 'The memory hierarchy',
        minutes: 20,
        explain: [
          'Fast memory is small and expensive; big memory is slow and cheap. So computers stack layers: registers (under 1 ns), L1 cache (about 1 ns), L2 and L3 caches (a few to tens of ns), RAM (about 100 ns), solid-state drive (about 100 µs), spinning hard disk (about 10 ms).',
          'Each step down is roughly 10 to 1000 times slower and larger. A hard-disk read is about 10 million times slower than a register.',
          'A cache keeps copies of data the processor used recently. When the data is there, it is a hit; when it is not, it is a miss and the data must be fetched from the slower layer below.',
        ],
        formulas: [['Slowdown between layers', '\\text{ratio} = \\dfrac{t_{\\text{slow}}}{t_{\\text{fast}}}']],
        examples: [
          ex('RAM takes 100 ns, L1 takes 1 ns. How many times slower is RAM?', [['Divide.', '100 / 1'], ['Result.', '100']], '100 times'),
          ex('If an L1 read took 1 second, how long would a 10 ms disk read take, scaled the same way?', [['Ratio.', '10^{-2} / 10^{-9} = 10^{7}'], ['Scaled.', '10^7\\,\\text{s} \\approx 116\\ \\text{days}']], 'About 116 days'),
        ],
        practice: [
          pr('An SSD read takes 100 µs and RAM 100 ns. How many times slower is the SSD?', 1000, 'Convert both to ns.', '100,000 ns ÷ 100 ns = 1,000.'),
          pr('If L1 (1 ns) were 1 second, how many seconds would a RAM read (100 ns) take?', 100, 'Same ratio.', '100 s.'),
          ch('Which is the fastest?', ['A register', 'L3 cache', 'RAM', 'SSD'], 'Closest to the arithmetic.', 'Registers sit inside the processor core.'),
          pr('A hard-disk read is 10 ms and a register read 1 ns. How many times slower is the disk?', 10000000, '10⁻² ÷ 10⁻⁹.', '10⁷: ten million.'),
        ],
      },
      {
        title: 'Hit rate and average access time',
        minutes: 25,
        explain: [
          'If most reads hit the cache, the average read is almost as fast as the cache. The average memory access time (AMAT) is the hit time plus the miss rate times the extra time a miss costs.',
          'Small changes in miss rate matter a lot because the miss penalty is so large. Going from 98% to 95% hits more than doubles the average time in the example below.',
        ],
        formulas: [['Average access time', '\\text{AMAT} = t_{\\text{hit}} + (1-h)\\,t_{\\text{miss}}']],
        examples: [
          ex('Hit time 1 ns, 95% hits, miss penalty 100 ns. AMAT?', [['Miss rate.', '1 - 0.95 = 0.05'], ['Add.', '1 + 0.05 \\times 100 = 6\\,\\text{ns}']], '6 ns'),
          ex('Same, but 98% hits.', [['Miss rate.', '0.02'], ['Add.', '1 + 0.02 \\times 100 = 3\\,\\text{ns}']], '3 ns'),
        ],
        practice: [
          pr('Hit time 1 ns, 90% hits, penalty 100 ns. AMAT in ns?', 11, '1 + 0.1 × 100.', '11 ns.'),
          pr('Hit time 2 ns, 99% hits, penalty 200 ns. AMAT in ns?', 4, '2 + 0.01 × 200.', '4 ns.'),
          pr('Hit time 1 ns, penalty 100 ns. What hit rate (as a %) gives an AMAT of 2 ns?', 99, '1 + (1 − h) × 100 = 2.', '(1 − h) = 0.01, so h = 99%.'),
          pr('With no cache at all, every read costs 100 ns. How many times faster is an AMAT of 4 ns?', 25, 'Divide.', '100 ÷ 4 = 25.'),
        ],
      },
      {
        title: 'Locality: why caches work',
        minutes: 20,
        explain: [
          'Programs tend to reuse data they just used (temporal locality) and to use data next to it (spatial locality). So caches copy whole blocks, often 64 bytes, not single bytes.',
          'Reading an array in order uses every number in each block: one miss loads a block, and the next reads all hit. Jumping around by a block or more each time misses almost every time.',
          'This is why the order of loops matters. Walking a big table row by row can be many times faster than column by column, though both do the same arithmetic.',
        ],
        formulas: [['Hit rate for an in-order scan', 'h = 1 - \\dfrac{1}{\\text{items per block}}']],
        code: [['Same sum, different speeds', '# row by row: neighbours in memory, cache friendly\nfor i in range(n):\n    for j in range(n):\n        s += a[i][j]\n# column by column: jumps a whole row each step\nfor j in range(n):\n    for i in range(n):\n        s += a[i][j]']],
        examples: [
          ex('Blocks hold 4 numbers. You read 32 numbers in order, starting with an empty cache. Hit rate?', [['One miss per block.', '32 / 4 = 8\\ \\text{misses}'], ['Hits.', '24 / 32 = 75\\%']], '75%'),
          ex('Same, but you read every 4th number (0, 4, 8, …) eight times round, and the cache holds only 2 blocks.', [['Each read lands in a new block.', ''], ['The cache cannot keep all 8 blocks.', '0\\%\\ \\text{hits}']], '0%'),
        ],
        practice: [
          pr('Blocks hold 8 numbers. An in-order scan: hit rate as a %?', 87.5, '1 miss in 8.', '7/8 = 87.5%.'),
          pr('64-byte blocks, 8-byte numbers. How many numbers per block?', 8, 'Divide.', '64 ÷ 8 = 8.'),
          pr('Blocks of 16 numbers, in-order scan of 1,600 numbers from an empty cache. How many misses?', 100, 'One per block.', '1,600 ÷ 16 = 100.'),
          ch('Which loop order is usually faster for a table stored row by row?', ['Row by row', 'Column by column', 'They are always equal', 'Random order'], 'Neighbours in memory share a block.', 'Row by row uses each loaded block fully.'),
        ],
      },
    ],
  },

  'cs-131': {
    predict: {
      q: 'A legend says monks move 64 golden disks, one per second, by the Tower of Hanoi rules. Roughly how long will they take?',
      options: ['About 585 billion years', 'About a week', 'About 64 hours', 'About 200 years'],
      answer: 0,
      reveal: 'n disks need 2ⁿ − 1 moves. For 64 that is about 1.8 × 10¹⁹ seconds, around 585 billion years, roughly 40 times the age of the universe.',
    },
    parts: [
      {
        title: 'Base case and recursive case',
        minutes: 20,
        explain: [
          'A recursive function solves a problem by calling itself on a smaller version. It needs a base case, a version so small the answer is known, or it would call itself forever.',
          'Factorial: n! = n × (n − 1)!, and 0! = 1. Sum of a list: the first item plus the sum of the rest, and the empty list sums to 0.',
          'This is induction from cs-113 run as a program. If the base case is right and each step is right assuming the smaller call is right, the whole function is right.',
        ],
        formulas: [['Factorial', 'n! = n \\cdot (n-1)!,\\quad 0! = 1']],
        code: [['Recursive factorial', 'def fact(n):\n    if n == 0:          # base case\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(5))   # 120']],
        examples: [
          ex('fact(4)?', [['Unfold.', '4 \\cdot 3 \\cdot 2 \\cdot 1 \\cdot fact(0)'], ['Multiply.', '24']], '24'),
          ex('How many calls does fact(5) make in total, counting the first?', [['fact(5), fact(4), …, fact(0).', ''], ['Count.', '6']], '6'),
        ],
        practice: [
          pr('fact(6)?', 720, '6 × 120.', '720.'),
          pr('How many calls does fact(10) make in total?', 11, 'From 10 down to 0.', '11.'),
          pr('def s(n): return 0 if n == 0 else n + s(n − 1). What is s(10)?', 55, '10 + 9 + … + 1.', '55.', { code: 'def s(n):\n    return 0 if n == 0 else n + s(n - 1)\nprint(s(10))' }),
          ch('What happens if the base case is missing?', ['The calls never stop until the stack runs out', 'It returns 0', 'It runs once', 'Python adds one for you'], 'Nothing ends the chain.', 'Python raises RecursionError after about 1,000 nested calls.'),
        ],
      },
      {
        title: 'The call stack and repeated work',
        minutes: 20,
        explain: [
          'Each call waits for the one it made. The computer keeps the waiting calls on a stack, newest on top. Too deep a chain overflows it.',
          'Naive Fibonacci, fib(n) = fib(n − 1) + fib(n − 2), makes two calls each time, and both branches redo the same work. The number of calls grows like the Fibonacci numbers themselves, roughly 1.6ⁿ.',
          'Remembering answers already found (memoization) cuts it to one call per value. That is the doorway to dynamic programming in cs-137.',
        ],
        formulas: [['Calls of naive fib', 'c(n) = c(n-1) + c(n-2) + 1,\\quad c(0)=c(1)=1']],
        code: [['Naive Fibonacci', 'def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)']],
        examples: [
          ex('How many calls does fib(4) make?', [['c(2) = 1 + 1 + 1 = 3, c(3) = 3 + 1 + 1 = 5.', ''], ['c(4) = 5 + 3 + 1.', '9']], '9'),
          ex('fib(5)?', [['0, 1, 1, 2, 3, 5.', ''], ['The 6th, counting from fib(0).', '5']], '5'),
        ],
        practice: [
          pr('How many calls does fib(5) make?', 15, 'c(5) = c(4) + c(3) + 1.', '9 + 5 + 1 = 15.'),
          pr('How many calls does fib(6) make?', 25, 'c(6) = c(5) + c(4) + 1.', '15 + 9 + 1 = 25.'),
          pr('fib(10)?', 55, '…, 21, 34, 55.', '55.'),
          pr('With memoization, how many different values fib(0) … fib(30) are computed?', 31, 'Each once.', '31.'),
        ],
      },
      {
        title: 'Tower of Hanoi',
        minutes: 20,
        explain: [
          'Lucas published the puzzle in 1883: move a stack of disks from one peg to another, one disk at a time, never putting a bigger disk on a smaller one.',
          'Recursive plan: move the top n − 1 disks to the spare peg, move the biggest disk, then move the n − 1 disks back on top of it. So T(n) = 2T(n − 1) + 1 and T(1) = 1, which gives T(n) = 2ⁿ − 1.',
          'No plan can do better: the biggest disk must move at least once, and before it does, the other n − 1 must all be out of the way.',
        ],
        formulas: [['Moves', 'T(n) = 2T(n-1) + 1 = 2^n - 1']],
        code: [['Hanoi', 'def hanoi(n, a, b, c):\n    if n == 0:\n        return\n    hanoi(n - 1, a, c, b)\n    print(a, "->", c)\n    hanoi(n - 1, b, a, c)']],
        examples: [
          ex('Moves for 3 disks?', [['2³ − 1.', '8 - 1'], ['Result.', '7']], '7'),
          ex('Moves for 64 disks at one per second, in years?', [['2⁶⁴ − 1 ≈ 1.845 × 10¹⁹ s.', ''], ['Divide by 3.156 × 10⁷ s per year.', '\\approx 5.85 \\times 10^{11}']], 'About 585 billion years'),
        ],
        practice: [
          pr('Moves for 10 disks?', 1023, '2¹⁰ − 1.', '1,023.'),
          pr('Moves for 20 disks?', 1048575, '2²⁰ − 1.', '1,048,575.'),
          pr('A solver needs T(n) = 2T(n − 1) + 1. If T(5) = 31, what is T(6)?', 63, 'Double and add 1.', '63.'),
          pr('How many times does the biggest disk move in the best solution?', 1, 'It moves only once.', '1.'),
        ],
      },
    ],
  },

  'cs-132': {
    predict: {
      q: 'Sorting 1 million names: a simple method takes about n² steps, a clever one about n log₂ n. How many times faster is the clever one?',
      options: ['About 50,000 times', 'About 2 times', 'About 20 times', 'About a million times'],
      answer: 0,
      reveal: 'n² is 10¹²; n log₂ n is about 2 × 10⁷. The ratio is about 50,000: at a billion steps a second, 17 minutes against 0.02 seconds.',
    },
    parts: [
      {
        title: 'Insertion sort: simple and slow',
        minutes: 20,
        explain: [
          'Insertion sort takes each item in turn and slides it left past larger items until it fits, the way people sort a hand of cards.',
          'In the worst case (the list is backwards) item k is compared with all k items before it, so the total is 1 + 2 + … + (n − 1) = n(n − 1)/2 comparisons, about n²/2.',
          'On a nearly sorted list it is fast, almost n steps. Real libraries use it for short pieces inside faster sorts.',
        ],
        formulas: [['Worst-case comparisons', '\\dfrac{n(n-1)}{2}']],
        code: [['Insertion sort', 'def insertion_sort(a):\n    for i in range(1, len(a)):\n        x, j = a[i], i - 1\n        while j >= 0 and a[j] > x:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = x\n    return a']],
        examples: [
          ex('Worst-case comparisons for 10 items?', [['n(n − 1)/2.', '10 \\cdot 9 / 2'], ['Result.', '45']], '45'),
          ex('Sort [3, 1, 2] by insertion.', [['Insert 1: it goes before 3.', '[1, 3, 2]'], ['Insert 2: it goes between 1 and 3.', '[1, 2, 3]']], '[1, 2, 3]'),
        ],
        practice: [
          pr('Worst-case comparisons for 100 items?', 4950, '100 × 99 / 2.', '4,950.'),
          pr('Worst-case comparisons for 1,000 items?', 499500, '1000 × 999 / 2.', '499,500.'),
          pr('If 1,000 items take 1 second worst case, about how many seconds for 10,000?', 100, 'n² grows 100× when n grows 10×.', '100 s.'),
          ch('When is insertion sort fast?', ['When the list is already nearly sorted', 'When the list is reversed', 'Never', 'Only for numbers'], 'Few items need to slide.', 'Each item moves only a little, so it is close to n steps.'),
        ],
      },
      {
        title: 'Merge sort: divide and conquer',
        minutes: 25,
        explain: [
          'Von Neumann described merge sort in 1945. Split the list in half, sort each half (recursively), then merge the two sorted halves by repeatedly taking the smaller front item.',
          'Halving n items down to single items takes log₂ n levels. Each level does about n work merging. Total: about n log₂ n.',
          'Merge sort is stable (equal items keep their order) and its worst case is as good as its average. It needs extra space for the merging.',
        ],
        formulas: [['Levels', '\\log_2 n'], ['Work', 'n \\log_2 n']],
        code: [['Merging two sorted lists', 'def merge(a, b):\n    out, i, j = [], 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]']],
        examples: [
          ex('How many levels of halving for 1,024 items?', [['2¹⁰ = 1,024.', ''], ['So log₂ 1024.', '10']], '10'),
          ex('About how many steps for 1,024 items?', [['n log₂ n.', '1024 \\times 10'], ['Result.', '10\\,240']], 'About 10,240'),
        ],
        practice: [
          pr('Levels of halving for 65,536 items?', 16, '2¹⁶ = 65,536.', '16.'),
          pr('About n log₂ n for n = 65,536?', 1048576, '65,536 × 16.', '1,048,576.'),
          pr('Merge [1, 4, 9] and [2, 3, 10]. What is the 4th item of the result?', 4, 'Take the smaller front each time.', '1, 2, 3, 4, 9, 10: the 4th is 4.'),
          pr('For n = 10⁶, how many times more steps is n² than n log₂ n? (log₂ 10⁶ ≈ 19.93)', 50172, 'n² ÷ (n log₂ n) = n ÷ log₂ n.', '10⁶ ÷ 19.93 ≈ 50,172.'),
        ],
      },
      {
        title: 'Quicksort and the limit',
        minutes: 20,
        explain: [
          'Tony Hoare invented quicksort in 1959 while working on machine translation in Moscow. Pick a pivot, put smaller items left and larger ones right, then sort each side.',
          'With good pivots each side is about half, giving n log₂ n on average. With bad pivots (always the smallest) it falls to n². Random pivots make that very unlikely.',
          'No sort that only compares items can beat about log₂(n!) ≈ n log₂ n comparisons in the worst case: there are n! orders, and each comparison at best halves the possibilities.',
        ],
        formulas: [['Lower bound for comparison sorts', '\\log_2 (n!) \\approx n \\log_2 n']],
        code: [['Quicksort (short version)', 'def quicksort(a):\n    if len(a) <= 1:\n        return a\n    p = a[0]\n    return (quicksort([x for x in a[1:] if x < p])\n            + [p]\n            + quicksort([x for x in a[1:] if x >= p]))']],
        examples: [
          ex('Partition [5, 8, 1, 9, 3] around the pivot 5.', [['Smaller: 1, 3. Larger: 8, 9.', ''], ['Arrange.', '[1, 3]\\ 5\\ [8, 9]']], '[1, 3] 5 [8, 9]'),
          ex('Minimum comparisons in the worst case to sort 3 items?', [['3! = 6 orders.', ''], ['Each comparison at most halves: 2² = 4 < 6 ≤ 8 = 2³.', '3']], '3'),
        ],
        practice: [
          pr('How many possible orders do 5 items have?', 120, '5!.', '120.'),
          pr('2⁶ = 64 and 2⁷ = 128. At least how many comparisons does sorting 5 items need in the worst case?', 7, '2^k must reach 120.', '2⁷ = 128 ≥ 120: 7.'),
          pr('At 10⁹ comparisons per second, how many seconds does n² take for n = 10⁶?', 1000, '10¹² ÷ 10⁹.', '1,000 s, about 17 minutes.'),
          ch('Quicksort with the first item as pivot is slowest on which list?', ['An already sorted list', 'A random list', 'A list of distinct numbers', 'A short list'], 'Each pivot is then the smallest.', 'Every split is 0 and n − 1, giving about n²/2 comparisons.'),
        ],
      },
    ],
  },

  'cs-133': {
    predict: {
      q: 'You type A, B, C, then press Undo twice. Which letters are undone, in order?',
      options: ['C then B', 'A then B', 'B then C', 'A then C'],
      answer: 0,
      reveal: 'Undo keeps a stack: the last thing done is the first undone. That is “last in, first out”.',
    },
    parts: [
      {
        title: 'Stacks: last in, first out',
        minutes: 20,
        explain: [
          'A stack allows two operations: push (add on top) and pop (take from the top). Like a pile of plates, the last one added is the first one removed.',
          'Alan Turing used a stack for subroutine returns in 1946, and Friedrich Bauer and Klaus Samelson patented a stack method for evaluating formulas in 1957. Every program today runs on a call stack (cs-131).',
          'In Python a list works as a stack: append pushes and pop() pops. Both take constant time.',
        ],
        formulas: [['Stack order', '\\text{LIFO: last in, first out}']],
        code: [['A stack in Python', 's = []\ns.append("A"); s.append("B"); s.append("C")\nprint(s.pop())   # C\nprint(s.pop())   # B']],
        examples: [
          ex('Push 1, push 2, pop, push 3, pop, pop. What comes out, in order?', [['After push 1, 2: [1, 2]. Pop gives 2.', ''], ['Push 3: [1, 3]. Pop 3, pop 1.', '2, 3, 1']], '2, 3, 1'),
          ex('Do the brackets ( [ ) ] match?', [['Push (, push [.', ''], [') arrives but the top is [.', '\\text{mismatch}']], 'No'),
        ],
        practice: [
          pr('Push 5, 7, 9, then pop twice. What number is left on the stack?', 5, 'Pops take 9 and 7.', '5.'),
          pr('What is the largest number of items on the stack while checking “((()))”?', 3, 'Push on (, pop on ).', '3.'),
          pr('Push A, push B, pop, push C, pop, pop. Which letter comes out last? (1 = A, 2 = B, 3 = C)', 1, 'B out, then C, then A.', 'A: 1.'),
          ch('Which uses a stack?', ['The browser Back button', 'A printer queue', 'A ticket line', 'A round-robin scheduler'], 'Most recent page first.', 'Back returns to the page you visited last.'),
        ],
      },
      {
        title: 'Queues: first in, first out',
        minutes: 20,
        explain: [
          'A queue adds at the back (enqueue) and removes from the front (dequeue), like a line at a jeepney stop. The first to arrive is the first served.',
          'Queues buffer work: print jobs, keystrokes, network packets, tasks waiting for a processor. Erlang’s 1909 study of telephone exchanges began queueing theory.',
          'A fixed-size queue is often stored as a ring (circular buffer): the back index wraps around with mod (cs-116).',
        ],
        formulas: [['Ring buffer next slot', '\\text{next} = (\\text{tail} + 1) \\bmod \\text{size}']],
        code: [['A queue in Python', 'from collections import deque\nq = deque()\nq.append("A"); q.append("B")\nprint(q.popleft())   # A']],
        examples: [
          ex('Enqueue A, B; dequeue; enqueue C; dequeue; dequeue. Order out?', [['A out first.', ''], ['Then B, then C.', 'A, B, C']], 'A, B, C'),
          ex('Ring of size 8, tail at 6. Add 3 items. Where is the tail?', [['6 + 3 = 9.', ''], ['Wrap.', '9 \\bmod 8 = 1']], '1'),
        ],
        practice: [
          pr('Ring of size 10, tail at 7. After adding 5 items, where is the tail?', 2, '(7 + 5) mod 10.', '2.'),
          pr('Enqueue 4, 8, 15, 16, then dequeue twice. What is at the front?', 15, '4 and 8 leave.', '15.'),
          pr('Customers arrive in order 1 to 6. A queue serves them; which number is served 4th?', 4, 'First in, first out.', '4.'),
          ch('Why is list.pop(0) a poor queue in Python for long lists?', ['It shifts every other item, taking time proportional to n', 'It removes the wrong item', 'It crashes', 'It sorts the list'], 'Think about what happens to the rest.', 'deque.popleft() takes constant time instead.'),
        ],
      },
      {
        title: 'Using a stack: reverse Polish notation',
        minutes: 20,
        explain: [
          'Jan Łukasiewicz wrote formulas with the operator first (1924); the reversed form puts it last: “3 4 +” means 3 + 4. No brackets are needed.',
          'To evaluate, read left to right. Push numbers. On an operator, pop two numbers, apply it, push the result. HP calculators from 1972 worked this way, and so do many processors and the Java virtual machine.',
        ],
        formulas: [['Example', '(3+4)\\times 2 \\;\\to\\; 3\\;4\\;+\\;2\\;\\times']],
        code: [['RPN evaluator', 'def rpn(tokens):\n    s = []\n    for t in tokens.split():\n        if t in "+-*/":\n            b, a = s.pop(), s.pop()\n            s.append({"+": a + b, "-": a - b, "*": a * b, "/": a / b}[t])\n        else:\n            s.append(float(t))\n    return s.pop()\n\nprint(rpn("3 4 + 2 *"))   # 14.0']],
        examples: [
          ex('Evaluate 3 4 + 2 ×.', [['3 + 4 = 7.', ''], ['7 × 2.', '14']], '14'),
          ex('Evaluate 5 1 2 + 4 × + 3 −.', [['1 + 2 = 3, 3 × 4 = 12.', ''], ['5 + 12 = 17, 17 − 3.', '14']], '14'),
        ],
        practice: [
          pr('Evaluate 2 3 4 × +.', 14, '3 × 4 first.', '2 + 12 = 14.'),
          pr('Evaluate 10 2 − 3 ×.', 24, '10 − 2 = 8.', '8 × 3 = 24.'),
          pr('Evaluate 6 2 / 1 +.', 4, '6 ÷ 2 = 3.', '3 + 1 = 4.'),
          pr('How many numbers are on the stack just before the first operator in 5 1 2 + 4 × +?', 3, 'Push 5, 1, 2.', '3.'),
        ],
      },
    ],
  },

  'cs-134': {
    predict: {
      q: 'In a room of 23 people, what is the chance that two share a birthday?',
      options: ['About 50%', 'About 6%', 'About 1%', 'About 23%'],
      answer: 0,
      reveal: 'About 50.7%. With 23 people there are 253 pairs, and each pair has a 1-in-365 chance. Hash tables face the same maths: collisions come much sooner than intuition says.',
    },
    parts: [
      {
        title: 'Hash functions and buckets',
        minutes: 20,
        explain: [
          'A hash table stores keys in m buckets. A hash function turns each key into a bucket number. To find a key, compute its hash and look only in that bucket.',
          'A simple hash for whole numbers is h(k) = k mod m. Hans Peter Luhn at IBM described hashing in a 1953 memo.',
          'For text, combine the character codes. Just adding them is weak: anagrams like CAT and ACT collide. Multiplying by a number at each step mixes in the position.',
        ],
        formulas: [['Division hash', 'h(k) = k \\bmod m'], ['Text hash', 'h \\leftarrow 31h + \\text{code}(c)']],
        code: [['Hashing text', 'def h(s, m):\n    x = 0\n    for c in s:\n        x = 31 * x + ord(c)\n    return x % m']],
        examples: [
          ex('Which of 11 buckets does 25 go to?', [['25 mod 11.', '25 - 22'], ['Remainder.', '3']], 'Bucket 3'),
          ex('Add the codes of CAT (67, 65, 84) and take mod 11.', [['Sum.', '216'], ['216 = 19 × 11 + 7.', '7']], 'Bucket 7, the same as ACT'),
        ],
        practice: [
          pr('Bucket for 100 with m = 11?', 1, '100 − 99.', '1.'),
          pr('Bucket for 58 with m = 11?', 3, '58 − 55.', '3.'),
          pr('With h ← 31h + code, starting at 0, what is the hash of “AB” before mod? (A = 65, B = 66)', 2081, '31 × 65 + 66.', '2,015 + 66 = 2,081.'),
          pr('Keys 10, 20, …, 100 with m = 10: how many different buckets are used?', 1, 'All end in 0.', 'All go to bucket 0: just 1.'),
        ],
      },
      {
        title: 'Collisions and load factor',
        minutes: 20,
        explain: [
          'Two keys with the same hash collide. Chaining keeps a short list in each bucket; open addressing tries the next free bucket.',
          'The load factor α = n/m is the average number of keys per bucket. With a good hash, a look-up checks about 1 + α/2 keys on average for keys that are present.',
          'When α gets too large, the table grows (often doubles) and every key is rehashed. Python’s dict resizes when it is about two-thirds full.',
          'Choosing m prime helps when keys share a pattern: tens with m = 10 all collide, but with m = 11 they spread out.',
        ],
        formulas: [['Load factor', '\\alpha = \\dfrac{n}{m}']],
        examples: [
          ex('1,000 keys in 400 buckets. Load factor?', [['Divide.', '1000 / 400'], ['Result.', '2.5']], '2.5'),
          ex('Keys 10, 20, …, 100 with m = 11: which buckets?', [['10 → 10, 20 → 9, 30 → 8, …', ''], ['100 → 1.', '\\text{10 different buckets}']], 'Ten different buckets, no collisions'),
        ],
        practice: [
          pr('3,000 keys, 1,000 buckets. Load factor?', 3, 'n / m.', '3.'),
          pr('A table of 64 buckets doubles when α passes 0.75. How many keys trigger the first doubling? (the first n with n/64 > 0.75)', 49, '0.75 × 64 = 48.', 'The 49th key.'),
          pr('With α = 2, about how many keys does a successful look-up check on average? (1 + α/2)', 2, '1 + 1.', '2.'),
          ch('Why choose a prime number of buckets with the division hash?', ['Patterns in the keys are less likely to line up with m', 'Primes are faster to divide by', 'It makes the table smaller', 'It removes all collisions'], 'Think of the tens with m = 10.', 'Keys sharing a factor with m bunch up; a prime shares no factors.'),
        ],
      },
      {
        title: 'The birthday problem',
        minutes: 20,
        explain: [
          'The chance that n keys in m buckets all land in different buckets is (m/m)·((m−1)/m)·…·((m−n+1)/m). It falls fast.',
          'With 365 buckets, 23 keys already give a better-than-even chance of a collision. In general, collisions become likely after about √m keys.',
          'This matters for cryptographic hashes too (cs-156): a hash with 2¹²⁸ outputs can be broken by collision after about 2⁶⁴ tries, so secure hashes use 256 bits.',
        ],
        formulas: [['No collision', 'P = \\prod_{i=0}^{n-1} \\dfrac{m-i}{m}'], ['Rough threshold', 'n \\approx 1.18\\sqrt{m}']],
        code: [['Birthday chance', 'p = 1.0\nfor i in range(23):\n    p *= (365 - i) / 365\nprint(1 - p)   # 0.507']],
        examples: [
          ex('Chance that 2 keys in 10 buckets collide?', [['Second key avoids the first: 9/10.', ''], ['Collide.', '1 - 0.9 = 0.1']], '0.1'),
          ex('Chance that 3 keys in 10 buckets have no collision?', [['Multiply.', '1 \\times 0.9 \\times 0.8'], ['Result.', '0.72']], '0.72'),
        ],
        practice: [
          pr('Chance that 4 keys in 10 buckets have no collision?', 0.504, '1 × 0.9 × 0.8 × 0.7.', '0.504.'),
          pr('Chance that 23 people have at least one shared birthday (365 days)? Give a decimal.', 0.507, '1 − product.', '0.507.'),
          pr('How many pairs are there among 23 people?', 253, '23 × 22 / 2.', '253.'),
          pr('About how many keys make a collision likely in 1,000,000 buckets? (1.18 √m)', 1180, '√10⁶ = 1,000.', 'About 1,180.'),
        ],
      },
    ],
  },

  'cs-135': {
    predict: {
      q: 'A well-balanced search tree holds 1 million names. About how many comparisons to find one?',
      options: ['About 20', 'About 1,000', 'About 500,000', 'About 1 million'],
      answer: 0,
      reveal: 'Each comparison halves what is left. 2²⁰ is about a million, so about 20 comparisons reach any name.',
    },
    parts: [
      {
        title: 'The binary search tree rule',
        minutes: 20,
        explain: [
          'A binary tree is made of nodes; each has at most a left child and a right child. The top node is the root; nodes with no children are leaves.',
          'A binary search tree (BST) keeps one rule at every node: smaller keys go in the left subtree, larger in the right. Searching starts at the root and goes left or right at each step.',
          'BSTs were described independently by several people around 1960, including Windley, Booth and Colin, and Hibbard.',
        ],
        formulas: [['BST rule', '\\text{left} < \\text{node} < \\text{right}']],
        code: [['Insert into a BST', 'def insert(node, k):\n    if node is None:\n        return {"k": k, "L": None, "R": None}\n    side = "L" if k < node["k"] else "R"\n    node[side] = insert(node[side], k)\n    return node']],
        examples: [
          ex('Insert 4, 2, 6, 1, 3, 5, 7. Path to find 5?', [['5 > 4: go right to 6.', ''], ['5 < 6: go left. Found.', '4 \\to 6 \\to 5']], '4 → 6 → 5, 3 nodes visited'),
          ex('In that tree, where does 8 go?', [['8 > 4, 8 > 6, 8 > 7.', ''], ['Right child of 7.', '']], 'Right child of 7'),
        ],
        practice: [
          pr('In the tree from 4, 2, 6, 1, 3, 5, 7, how many nodes are visited to find 3?', 3, '4, then 2, then 3.', '3.'),
          pr('Insert 50, 30, 70, 20, 40 in order. What is the left child of 30?', 20, '20 < 50, 20 < 30.', '20.'),
          pr('Same tree. What is the right child of 30?', 40, '40 < 50, 40 > 30.', '40.'),
          ch('In a BST, where is the smallest key?', ['Follow left children from the root to the end', 'At the root', 'At the rightmost leaf', 'Anywhere'], 'Smaller is always left.', 'The leftmost node has nothing smaller.'),
        ],
      },
      {
        title: 'Height: balanced versus a chain',
        minutes: 20,
        explain: [
          'A full tree with h levels holds 2ʰ − 1 keys. So n keys need at least ⌈log₂(n + 1)⌉ levels, and a search takes that many comparisons at most.',
          'Inserting keys in sorted order makes each new key the right child of the last: a chain of n levels, no better than a list.',
          'Self-balancing trees fix this. AVL trees (Adelson-Velsky and Landis, 1962) and red-black trees (Bayer 1972, Guibas and Sedgewick 1978) rotate nodes to keep the height near log₂ n.',
        ],
        formulas: [['Keys in h full levels', '2^h - 1'], ['Minimum height', '\\lceil \\log_2 (n+1) \\rceil']],
        examples: [
          ex('Minimum levels for 1,000 keys?', [['2⁹ − 1 = 511 is too few.', ''], ['2¹⁰ − 1 = 1,023 is enough.', '10']], '10'),
          ex('Levels if 1,000 keys are inserted in sorted order?', [['Each key is one level deeper.', ''], ['A chain.', '1000']], '1,000'),
        ],
        practice: [
          pr('How many keys fit in a full tree of 4 levels?', 15, '2⁴ − 1.', '15.'),
          pr('Minimum levels for 1,000,000 keys?', 20, '2²⁰ − 1 = 1,048,575.', '20.'),
          pr('How many keys fit in a full tree of 20 levels?', 1048575, '2²⁰ − 1.', '1,048,575.'),
          pr('7 keys inserted in sorted order: how many levels?', 7, 'A chain.', '7.'),
        ],
      },
      {
        title: 'Walking a tree',
        minutes: 20,
        explain: [
          'An in-order walk visits the left subtree, then the node, then the right subtree. In a BST that lists the keys in sorted order, which gives another sorting method: insert everything, then walk.',
          'A pre-order walk (node first) copies a tree; a post-order walk (node last) is used to delete one or to evaluate an expression tree.',
          'Databases and file systems use B-trees (Bayer and McCreight, 1970): each node holds hundreds of keys, so the tree is very shallow and needs few slow disk reads (cs-123).',
        ],
        formulas: [['B-tree height with b keys per node', '\\approx \\log_{b} n']],
        code: [['In-order walk', 'def walk(node):\n    if node is None:\n        return []\n    return walk(node["L"]) + [node["k"]] + walk(node["R"])']],
        examples: [
          ex('Pre-order walk of the tree from 4, 2, 6, 1, 3, 5, 7?', [['Node, then left, then right.', ''], ['Result.', '4, 2, 1, 3, 6, 5, 7']], '4, 2, 1, 3, 6, 5, 7'),
          ex('A B-tree with 100 keys per node holds 1,000,000 keys. About how many levels?', [['log₁₀₀ 10⁶.', '6 / 2'], ['Result.', '3']], 'About 3'),
        ],
        practice: [
          pr('In-order walk of a BST built from 8, 3, 10, 1, 6. What is the 3rd key visited?', 6, 'In-order is sorted: 1, 3, 6, 8, 10.', '6.'),
          pr('Post-order walk of the tree from 4, 2, 6, 1, 3, 5, 7. What is the last key?', 4, 'The root comes last.', '4.'),
          pr('A B-tree with 1,000 keys per node: about how many levels for 10⁹ keys?', 3, 'log₁₀₀₀ 10⁹.', '3.'),
          ch('Which walk lists a BST in sorted order?', ['In-order', 'Pre-order', 'Post-order', 'Level by level'], 'Left, node, right.', 'All smaller keys come before the node, all larger after.'),
        ],
      },
    ],
  },

  'cs-136': {
    predict: {
      q: 'To find the shortest road from A to F, must you list every possible route?',
      options: ['No: settling the closest place first is enough', 'Yes, there is no other way', 'Only if roads have different lengths', 'Only for maps with cycles'],
      answer: 0,
      reveal: 'Dijkstra’s idea: the closest unsettled place can never be reached more cheaply later, so settle it and move on. Each place is settled once.',
    },
    parts: [
      {
        title: 'Graphs with lengths',
        minutes: 20,
        explain: [
          'A graph (cs-115) with a number on each edge is a weighted graph: lengths, travel times, costs. A path’s length is the sum of its edge weights.',
          'If all edges have length 1, a breadth-first search (using a queue, cs-133) finds shortest paths: it visits places in rings of 1 step, 2 steps, and so on.',
          'A graph with n places can have up to n(n − 1)/2 roads. Road maps have far fewer: each junction meets only a handful.',
        ],
        formulas: [['Path length', 'L = \\sum w(e)'], ['Most edges', '\\dfrac{n(n-1)}{2}']],
        examples: [
          ex('Length of A → C → B → D in the scene graph (A–C 2, C–B 3, B–D 4)?', [['Add.', '2 + 3 + 4'], ['Result.', '9']], '9'),
          ex('Most roads between 10 places?', [['n(n − 1)/2.', '10 \\cdot 9 / 2'], ['Result.', '45']], '45'),
        ],
        practice: [
          pr('Length of A → B → E (A–B 7, B–E 6)?', 13, 'Add.', '13.'),
          pr('Length of A → C → E → F (2, 8, 3)?', 13, 'Add.', '13.'),
          pr('Most roads between 20 places?', 190, '20 × 19 / 2.', '190.'),
          ch('Which finds shortest paths when every edge has length 1?', ['Breadth-first search with a queue', 'Depth-first search with a stack', 'Sorting the edges', 'Random walking'], 'Rings of 1 step, 2 steps, …', 'BFS reaches places in order of their number of steps.'),
        ],
      },
      {
        title: 'Dijkstra’s algorithm step by step',
        minutes: 25,
        explain: [
          'Edsger Dijkstra designed it in 1956 in about twenty minutes at a café in Amsterdam, without pencil and paper, and published it in 1959.',
          'Give the start distance 0 and every other place ∞. Repeat: settle the unsettled place with the smallest distance; for each neighbour, if going through it is shorter, lower the neighbour’s distance.',
          'It works because lengths are never negative. Any other route to the closest unsettled place would pass through a place at least as far, so it cannot be shorter.',
        ],
        formulas: [['Update (relax)', 'd(v) \\leftarrow \\min\\big(d(v),\\; d(u) + w(u,v)\\big)']],
        code: [['Dijkstra with a heap', 'import heapq\ndef dijkstra(g, s):\n    d = {s: 0}\n    pq = [(0, s)]\n    done = set()\n    while pq:\n        du, u = heapq.heappop(pq)\n        if u in done:\n            continue\n        done.add(u)\n        for v, w in g[u]:\n            if du + w < d.get(v, float("inf")):\n                d[v] = du + w\n                heapq.heappush(pq, (d[v], v))\n    return d']],
        examples: [
          ex('Scene graph: after settling A (0) and C (2), what is B’s distance?', [['From A: 7. Through C: 2 + 3 = 5.', ''], ['Take the smaller.', '5']], '5'),
          ex('What is the final distance to E?', [['Through C: 2 + 8 = 10. Through B: 5 + 6 = 11. Through D: 9 + 1 = 10.', ''], ['Smallest.', '10']], '10'),
        ],
        practice: [
          pr('Scene graph: final distance to D?', 9, 'Through B: 5 + 4.', '9.'),
          pr('Scene graph: final distance to F?', 13, 'D + 5 = 14, E + 3 = 13.', '13.'),
          pr('Graph S–A 4, S–B 1, B–A 2, A–T 1, B–T 5. Shortest distance S to T?', 4, 'Try S → B → A → T.', '1 + 2 + 1 = 4.'),
          pr('Same graph. Shortest distance S to A?', 3, 'Through B.', '1 + 2 = 3.'),
        ],
      },
      {
        title: 'Limits and faster searches',
        minutes: 20,
        explain: [
          'With a negative edge, settling the closest place early can be wrong: a later detour through the negative edge might be cheaper. The Bellman-Ford algorithm (1950s) handles negative edges but is slower.',
          'With a heap, Dijkstra takes about (n + e) log n steps for n places and e roads, fast enough for a city.',
          'A* search (Hart, Nilsson and Raphael, 1968) adds a guess of the remaining distance, such as the straight-line distance, so it explores toward the goal first. Map apps and game characters use ideas like this.',
        ],
        formulas: [['A* priority', 'f(v) = d(v) + h(v)']],
        examples: [
          ex('Edges S–A 2, S–B 5, B–A −4 (one-way B to A). True shortest S to A?', [['Direct: 2. Via B: 5 − 4.', '1'], ['Dijkstra settles A at 2 before seeing B.', '\\text{wrong}']], '1, but Dijkstra answers 2'),
          ex('Rough steps for n = 10,000 places, e = 30,000 roads, log₂ n ≈ 13.3?', [['(n + e) log n.', '40\\,000 \\times 13.3'], ['Result.', '\\approx 532\\,000']], 'About 532,000'),
        ],
        practice: [
          pr('Using (n + e) log₂ n, with n = 1,024 and e = 3,072, how many steps?', 40960, 'log₂ 1024 = 10.', '4,096 × 10 = 40,960.'),
          pr('A* at a place with d = 6 and straight-line guess h = 4. Priority f?', 10, 'd + h.', '10.'),
          ch('Which can Dijkstra’s algorithm get wrong?', ['Graphs with negative edge lengths', 'Graphs with cycles', 'Graphs with many edges', 'Graphs with lengths of 1'], 'The argument used “never negative”.', 'A negative edge can make a later route cheaper.'),
          pr('How many times is each place settled in Dijkstra’s algorithm?', 1, 'Once settled, never revisited.', '1.'),
        ],
      },
    ],
  },

  'cs-137': {
    predict: {
      q: 'Coins of 1, 4 and 6. To pay 8, a cashier takes the biggest coin that fits each time. How many coins?',
      options: ['3 (6 + 1 + 1), though 2 (4 + 4) is possible', '2, the best', '4', '8'],
      answer: 0,
      reveal: 'Greedy takes 6, then 1, then 1. The best is 4 + 4. Dynamic programming finds it by solving every smaller amount once and reusing the answers.',
    },
    parts: [
      {
        title: 'Remember answers: memoization',
        minutes: 20,
        explain: [
          'Naive recursive Fibonacci (cs-131) recomputes the same values again and again: fib(30) makes 2,692,537 calls to get 832,040.',
          'Storing each answer the first time and looking it up afterwards (memoization, named by Donald Michie in 1968) brings it down to one computation per value.',
          'Richard Bellman named the general method dynamic programming in the 1950s, partly, he said, because the name sounded impressive to funders.',
        ],
        formulas: [['Naive calls', 'c(n) = 2F(n+1) - 1']],
        code: [['Memoized Fibonacci', 'from functools import cache\n@cache\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\nprint(fib(30))   # 832040']],
        examples: [
          ex('Naive calls for fib(10)? (F(11) = 89)', [['2F(11) − 1.', '2 \\times 89 - 1'], ['Result.', '177']], '177'),
          ex('Memoized: how many values computed for fib(10)?', [['fib(0) to fib(10), once each.', ''], ['Count.', '11']], '11'),
        ],
        practice: [
          pr('fib(20)?', 6765, 'Count up: …, 2584, 4181, 6765.', '6,765.'),
          pr('Naive calls for fib(20)? (F(21) = 10,946)', 21891, '2 × 10,946 − 1.', '21,891.'),
          pr('Naive calls for fib(30) divided by memoized values (31). Round to the nearest whole number.', 86856, '2,692,537 ÷ 31.', 'About 86,856 times the work.'),
          ch('When does memoization help?', ['When the same subproblems come up many times', 'When every subproblem is different', 'Only for sorting', 'Never in Python'], 'Look for repeats.', 'It saves the cost of repeating work.'),
        ],
      },
      {
        title: 'Filling a table: coin change',
        minutes: 25,
        explain: [
          'Let F(a) be the fewest coins that make amount a. The last coin used is some coin c, and the rest must be the best way to make a − c. So F(a) = 1 + the smallest F(a − c) over all coins c that fit, with F(0) = 0.',
          'Fill the table from 0 upward. Each entry uses only entries already filled. For amounts up to A and k coin types, that is about A × k steps.',
          'Greedy works for Philippine and most real coin sets but fails for sets like 1, 4, 6. The table never fails.',
        ],
        formulas: [['Coin change', 'F(a) = 1 + \\min_{c \\le a} F(a - c),\\quad F(0) = 0']],
        code: [['Coin change table', 'def coins(a, cs=(1, 4, 6)):\n    F = [0] + [float("inf")] * a\n    for x in range(1, a + 1):\n        F[x] = 1 + min(F[x - c] for c in cs if c <= x)\n    return F[a]\nprint(coins(8))   # 2']],
        examples: [
          ex('Coins 1, 4, 6: F(8)?', [['Last coin 1: 1 + F(7) = 1 + 2. Last 4: 1 + F(4) = 2. Last 6: 1 + F(2) = 3.', ''], ['Smallest.', '2']], '2'),
          ex('Coins 1, 4, 6: F(9)?', [['1 + F(8) = 3, 1 + F(5) = 3, 1 + F(3) = 4.', ''], ['Smallest.', '3']], '3 (4 + 4 + 1)'),
        ],
        practice: [
          pr('Coins 1, 4, 6: F(10)?', 2, '6 + 4.', '2.'),
          pr('Coins 1, 4, 6: F(12)?', 2, '6 + 6.', '2.'),
          pr('Coins 1, 4, 6: how many coins does greedy use for 9?', 4, '6, then 1, 1, 1.', '4, while the table finds 3.'),
          pr('Coins 1, 5, 10, 25: F(30)?', 2, '25 + 5.', '2.'),
        ],
      },
      {
        title: 'Classic tables: paths, common subsequences, edits',
        minutes: 25,
        explain: [
          'Grid paths: the number of ways to reach a cell moving only right or down is the sum for the cell above and the cell to the left, the Pascal pattern from cs-114.',
          'Longest common subsequence (LCS): the longest list of letters appearing in both strings in the same order. Tables like this compare DNA sequences and power the diff tool behind version control (cs-159).',
          'Edit distance (Levenshtein, 1965): the fewest insertions, deletions and substitutions to turn one word into another. Spell checkers use it.',
        ],
        formulas: [['Grid paths', 'P(i,j) = P(i-1,j) + P(i,j-1)'], ['Edit distance', 'D(i,j) = \\min\\{D(i-1,j)+1,\\ D(i,j-1)+1,\\ D(i-1,j-1)+[a_i \\ne b_j]\\}']],
        examples: [
          ex('Paths from corner to corner of a 3 × 3 block (3 rights, 3 downs)?', [['Choose where the 3 rights go among 6 moves.', '\\binom{6}{3}'], ['Result.', '20']], '20'),
          ex('Edit distance from kitten to sitting?', [['k → s, e → i.', '2'], ['Insert g.', '3']], '3'),
        ],
        practice: [
          pr('Paths through a 2 × 2 block (2 rights, 2 downs)?', 6, 'C(4, 2).', '6.'),
          pr('Paths through a 4 × 4 block?', 70, 'C(8, 4).', '70.'),
          pr('Length of the LCS of ABCBDAB and BDCABA?', 4, 'One answer is BCBA.', '4.'),
          pr('Edit distance from cat to cut?', 1, 'One substitution.', '1.'),
        ],
      },
    ],
  },

  'cs-138': {
    predict: {
      q: 'Checking a filled-in Sudoku takes seconds. Is solving a giant Sudoku also always quick?',
      options: ['No one knows: that is the P versus NP question', 'Yes, always', 'No, and this has been proved', 'Only for 9 × 9 grids'],
      answer: 0,
      reveal: 'Generalized Sudoku is NP-complete. Whether every quickly checkable problem is also quickly solvable is unproved, with a one-million-dollar Clay prize on it.',
    },
    parts: [
      {
        title: 'Polynomial versus exponential',
        minutes: 20,
        explain: [
          'An algorithm is called efficient if its steps grow like a power of n (n, n², n³): polynomial time. Jack Edmonds argued for this line in 1965.',
          'Exponential growth (2ⁿ) and factorial growth (n!) explode. Adding one item doubles 2ⁿ. At a billion steps a second, 2⁶⁰ steps take about 36 years.',
          'Faster computers barely help. A computer 1,000 times faster lets a 2ⁿ algorithm handle only about 10 more items in the same time.',
        ],
        formulas: [['Extra items from a k-times-faster computer (2ⁿ)', '\\Delta n = \\log_2 k']],
        examples: [
          ex('n = 20: n², 2ⁿ, n!?', [['n² = 400, 2²⁰ = 1,048,576.', ''], ['20! ≈ 2.43 × 10¹⁸.', '']], '400; about a million; about 2.4 × 10¹⁸'),
          ex('Days for 2⁵⁰ steps at 10⁹ per second?', [['2⁵⁰ ≈ 1.126 × 10¹⁵, so 1.126 × 10⁶ s.', ''], ['÷ 86,400.', '\\approx 13']], 'About 13 days'),
        ],
        practice: [
          pr('2³⁰?', 1073741824, '2¹⁰ = 1,024, cubed.', '1,073,741,824.'),
          pr('A computer 1,024 times faster: how many more items for a 2ⁿ algorithm in the same time?', 10, 'log₂ 1024.', '10.'),
          pr('Years for 2⁶⁰ steps at 10⁹ per second? (3.156 × 10⁷ s per year)', 36.5, '2⁶⁰ ≈ 1.153 × 10¹⁸.', '1.153 × 10⁹ s ÷ 3.156 × 10⁷ ≈ 36.5 years.'),
          pr('n = 10: n!?', 3628800, '10 × 9 × … × 1.', '3,628,800.'),
        ],
      },
      {
        title: 'Easy to check, hard to find',
        minutes: 20,
        explain: [
          'NP is the class of yes/no problems where a proposed answer (a certificate) can be checked quickly. P is the class that can be solved quickly. Every problem in P is in NP.',
          'Subset sum: is there a group of these numbers adding to a target? Checking a proposed group is one addition; finding one may mean trying all 2ⁿ groups.',
          'The travelling salesperson problem asks for the shortest round trip through n cities. There are (n − 1)!/2 different round trips.',
        ],
        formulas: [['Subsets of n items', '2^n'], ['Round trips through n cities', '\\dfrac{(n-1)!}{2}']],
        examples: [
          ex('Numbers 3, 34, 4, 12, 5, 2. Is there a group adding to 9?', [['Try 4 + 5.', '9'], ['Checking it took one addition.', '\\text{yes}']], 'Yes: 4 + 5'),
          ex('Round trips through 5 cities?', [['(5 − 1)!/2.', '24 / 2'], ['Result.', '12']], '12'),
        ],
        practice: [
          pr('Round trips through 10 cities?', 181440, '9!/2.', '362,880 ÷ 2 = 181,440.'),
          pr('How many groups (subsets) of 20 numbers are there?', 1048576, '2²⁰.', '1,048,576.'),
          pr('Numbers 7, 11, 15, 20. What is the smallest number of them that add to 33?', 3, 'Check every pair first.', 'Pairs give 18, 22, 27, 26, 31 and 35: none is 33. Three work: 7 + 11 + 15 = 33. So 3.'),
          ch('A problem is in NP when …', ['a proposed answer can be checked quickly', 'it can never be solved', 'it needs exponential time', 'it is about numbers'], 'N for “nondeterministic”, but think “checkable”.', 'NP means a yes answer has a quickly checkable certificate.'),
        ],
      },
      {
        title: 'NP-complete: the hardest of the checkable',
        minutes: 25,
        explain: [
          'In 1971 Stephen Cook (and independently Leonid Levin) showed that Boolean satisfiability (SAT, cs-111) is NP-complete: every NP problem can be translated into it quickly. In 1972 Richard Karp showed 21 more problems are just as hard.',
          'So if any one NP-complete problem had a polynomial algorithm, all NP problems would, and P = NP. Most researchers believe P ≠ NP, but no proof exists.',
          'In practice people use approximations, heuristics and SAT solvers that handle millions of variables on real-world cases. Much of modern cryptography (cs-156) assumes some problems stay hard.',
        ],
        formulas: [['Reduction', 'A \\le_p B:\\ \\text{a fast way to solve } B \\text{ gives a fast way to solve } A']],
        examples: [
          ex('A formula has 40 true/false variables. How many assignments must brute force try?', [['Each doubles.', '2^{40}'], ['About.', '1.1 \\times 10^{12}']], 'About 1.1 trillion'),
          ex('Is (p ∨ q) ∧ (¬p ∨ q) ∧ (¬q ∨ r) satisfiable?', [['Try q = T, r = T.', ''], ['Every bracket has a true part.', '\\text{yes}']], 'Yes'),
        ],
        practice: [
          pr('How many assignments for 25 variables?', 33554432, '2²⁵.', '33,554,432.'),
          pr('How many problems did Karp’s 1972 paper show NP-complete?', 21, 'A famous list.', '21.'),
          pr('The Clay Institute prize for settling P versus NP, in US dollars?', 1000000, 'One of the seven Millennium Problems.', '$1,000,000.'),
          ch('If someone found a fast algorithm for one NP-complete problem, then …', ['every NP problem would have a fast algorithm', 'only that problem would be fast', 'P ≠ NP would be proved', 'computers would need to be faster'], 'All NP problems reduce to it.', 'That would prove P = NP.'),
        ],
      },
    ],
  },
};
