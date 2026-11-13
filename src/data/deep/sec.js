// Computer Science track, Systems and Security (sec-001 to sec-008): each class
// split into three parts. Every number was worked out and checked by script.

const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const SEC = {
  'sec-001': {
    predict: {
      q: 'A chip adds two 4-bit numbers, 9 and 8. What 4-bit answer does it show?',
      options: ['1', '17', '15', '0'],
      answer: 0,
      reveal: '17 is 10001 in binary: five bits. Only the last four, 0001, fit; the fifth comes out as a carry. That is overflow.',
    },
    parts: [
      {
        title: 'Gates from switches',
        minutes: 20,
        explain: [
          'A transistor is a switch controlled by a voltage. Two in series make AND (current flows only if both are on); two in parallel make OR. An inverter makes NOT.',
          'XOR (exclusive or) is 1 when exactly one input is 1. It is the “add without carry” of binary: 0+0 = 0, 0+1 = 1, 1+1 = 0 (carry 1).',
          'Every gate can be built from NAND gates alone, which is why the Nand2Tetris course starts there.',
        ],
        formulas: [['XOR', 'a \\oplus b = (a \\lor b) \\land \\lnot(a \\land b)']],
        code: [['Gates in Python', 'AND = lambda a, b: a & b\nOR  = lambda a, b: a | b\nXOR = lambda a, b: a ^ b\nfor a in (0, 1):\n    for b in (0, 1):\n        print(a, b, AND(a, b), OR(a, b), XOR(a, b))']],
        examples: [
          ex('1 XOR 1 XOR 1?', [['1 ⊕ 1 = 0.', ''], ['0 ⊕ 1.', '1']], '1'),
          ex('How many rows in the truth table of a gate with 3 inputs?', [['Each input doubles.', '2^3'], ['Result.', '8']], '8'),
        ],
        practice: [
          pr('0 XOR 1 XOR 1?', 0, 'Count the 1s.', 'Two 1s: 0.'),
          pr('In how many of the 8 rows (a, b, c) is a ⊕ b ⊕ c equal to 1?', 4, 'An odd number of 1s.', '001, 010, 100, 111: 4.'),
          pr('In how many of the 8 rows is the carry (at least two 1s) equal to 1?', 4, '011, 101, 110, 111.', '4.'),
          pr('The Intel 4004 had 2,300 transistors. A chip with 23 billion has how many times more?', 10000000, '2.3 × 10¹⁰ ÷ 2.3 × 10³.', '10⁷: ten million times.'),
        ],
      },
      {
        title: 'The full adder and the ripple',
        minutes: 25,
        explain: [
          'A full adder takes bits a, b and a carry c. Sum = a ⊕ b ⊕ c. Carry out = 1 when at least two of the three are 1.',
          'Line up n full adders and pass each carry to the left: a ripple-carry adder for n-bit numbers. It is built from about 5 gates per bit.',
          'The carry may have to travel through every stage, so the delay grows with n. Carry-lookahead adders compute carries in parallel to save time.',
        ],
        formulas: [['Sum and carry', 's = a \\oplus b \\oplus c,\\quad c_{out} = ab + c(a \\oplus b)']],
        examples: [
          ex('0110 + 0111 in binary?', [['Bit by bit from the right with carries: 1, 0 (carry), 1 (carry), 1.', ''], ['Result.', '1101 = 13']], '1101 (13)'),
          ex('Gates for a 32-bit ripple adder at 5 per bit?', [['Multiply.', '32 \\times 5'], ['Result.', '160']], '160'),
        ],
        practice: [
          pr('0011 + 0101 = ? (give the decimal value)', 8, '3 + 5.', '1000 = 8.'),
          pr('If each stage adds 2 gate delays, how many for a 64-bit ripple adder?', 128, '64 × 2.', '128.'),
          pr('1011 + 0110 in a 4-bit adder: what decimal value do the 4 bits show?', 1, '11 + 6 = 17 = 10001.', '0001 = 1, with overflow.'),
          pr('Largest number an 8-bit adder’s result can hold?', 255, '2⁸ − 1.', '255.'),
        ],
      },
      {
        title: 'Negative numbers and overflow',
        minutes: 20,
        explain: [
          'Computers store negatives in two’s complement: in n bits, −x is written as 2ⁿ − x. In 4 bits, −1 is 1111 and −3 is 1101. The range is −8 to 7.',
          'The beauty: the same adder handles negatives. 5 + (−3) = 0101 + 1101 = 1 0010; drop the carry and get 0010 = 2.',
          'Overflow happens when the true answer is outside the range. Real bugs come from it: in 1996 the Ariane 5 rocket was lost after a 64-bit value was converted into a 16-bit integer that could not hold it.',
        ],
        formulas: [['Two’s complement', '-x \\equiv 2^n - x \\pmod{2^n}']],
        examples: [
          ex('Write −3 in 4-bit two’s complement.', [['16 − 3 = 13.', ''], ['13 in binary.', '1101']], '1101'),
          ex('5 + (−3) with 4 bits?', [['0101 + 1101 = 10010.', ''], ['Drop the fifth bit.', '0010 = 2']], '2'),
        ],
        practice: [
          pr('In 4-bit two’s complement, what unsigned number stores −1?', 15, '16 − 1.', '1111 = 15.'),
          pr('Smallest value in 8-bit two’s complement?', -128, '−2⁷.', '−128.'),
          pr('Largest value in 16-bit two’s complement?', 32767, '2¹⁵ − 1.', '32,767.'),
          pr('In 8-bit two’s complement, 127 + 1 wraps around to what?', -128, 'Past the top.', '−128: overflow.'),
        ],
      },
    ],
  },

  'sec-002': {
    predict: {
      q: 'Three numbers and their XOR are stored on four disks. One disk dies. Can you get its number back?',
      options: ['Yes: XOR the other three', 'No, it is gone', 'Only if it was the parity disk', 'Only half of it'],
      answer: 0,
      reveal: 'XOR undoes itself: a ⊕ b ⊕ c ⊕ (a ⊕ b ⊕ c) = 0, so any one of the four equals the XOR of the other three.',
    },
    parts: [
      {
        title: 'Parity with XOR',
        minutes: 20,
        explain: [
          'XOR on whole numbers works bit by bit. Two key facts: x ⊕ x = 0 and x ⊕ 0 = x.',
          'So if P = a ⊕ b ⊕ c, then a ⊕ c ⊕ P = b. Whatever is missing, XOR the rest.',
          'A single parity bit can detect one flipped bit but not say which one. That needs more check bits (Hamming codes).',
        ],
        formulas: [['Rebuild', 'b = a \\oplus c \\oplus P']],
        code: [['Parity in Python', 'a, b, c = 0b1011, 0b0110, 0b1100\np = a ^ b ^ c        # 0b0001\nprint(bin(a ^ c ^ p))   # 0b110: b is back']],
        examples: [
          ex('a = 1011, b = 0110, c = 1100. Parity P?', [['1011 ⊕ 0110 = 1101.', ''], ['1101 ⊕ 1100.', '0001']], '0001'),
          ex('Lose b. Rebuild it.', [['a ⊕ c = 0111.', ''], ['⊕ P = 0111 ⊕ 0001.', '0110']], '0110'),
        ],
        practice: [
          pr('5 XOR 3 (in decimal)?', 6, '101 ⊕ 011.', '110 = 6.'),
          pr('a = 9, b = 4, c = 7. P = a ⊕ b ⊕ c (decimal)?', 10, '1001 ⊕ 0100 = 1101; ⊕ 0111.', '1010 = 10.'),
          pr('Same values: lose c. a ⊕ b ⊕ P = ?', 7, '9 ⊕ 4 ⊕ 10.', '7.'),
          pr('x ⊕ x for any x?', 0, 'Every bit cancels.', '0.'),
        ],
      },
      {
        title: 'RAID levels and capacity',
        minutes: 20,
        explain: [
          'RAID 1 mirrors: two disks hold the same data. RAID 5 spreads data and one parity block over n disks: usable space is n − 1 disks, survives one failure. RAID 6 uses two parity blocks: n − 2 usable, survives two.',
          'More disks also means more chances that one fails. If each fails with probability p per year, the chance that at least one of n fails is 1 − (1 − p)ⁿ.',
          'During a rebuild the array is exposed: a second failure in RAID 5 loses data. Big arrays therefore prefer RAID 6.',
        ],
        formulas: [['RAID 5 usable', '(n-1) \\times \\text{disk size}'], ['At least one failure', '1 - (1-p)^n']],
        examples: [
          ex('Four 2 TB disks in RAID 5. Usable space?', [['n − 1 = 3.', '3 \\times 2'], ['Result.', '6\\ \\text{TB}']], '6 TB'),
          ex('Each disk fails with 2% a year. Chance one of 4 fails?', [['0.98⁴ ≈ 0.922.', ''], ['1 − 0.922.', '\\approx 0.078']], 'About 7.8%'),
        ],
        practice: [
          pr('Six 4 TB disks in RAID 6. Usable TB?', 16, '(6 − 2) × 4.', '16 TB.'),
          pr('Two 2 TB disks mirrored (RAID 1). Usable TB?', 2, 'Both hold the same.', '2 TB.'),
          pr('Five 1 TB disks in RAID 5: what share of the raw space holds parity (%)?', 20, '1 of 5.', '20%.'),
          pr('Each of 10 disks fails with 2% a year. Chance at least one fails (decimal, 3 places)?', 0.183, '1 − 0.98¹⁰.', '≈ 0.183.'),
        ],
      },
      {
        title: 'Hamming codes and ECC memory',
        minutes: 20,
        explain: [
          'Hamming put parity bits at positions 1, 2, 4, 8, …; each checks the positions whose binary number includes that bit. If one bit flips, the failing checks add up to its position.',
          'With r parity bits you can protect m data bits when 2ʳ ≥ m + r + 1. Hamming(7,4) uses 3 check bits for 4 data bits.',
          'Server ECC memory protects 64 data bits with 8 check bits (7 Hamming bits plus one overall parity), fixing any single flipped bit and detecting double flips.',
        ],
        formulas: [['Check bits needed', '2^r \\ge m + r + 1']],
        examples: [
          ex('Check bits for 4 data bits?', [['r = 3: 8 ≥ 4 + 3 + 1.', ''], ['r = 2 fails: 4 < 7.', '3']], '3'),
          ex('Checks 1 and 4 fail, check 2 passes. Which position flipped?', [['Add the failing check positions.', '1 + 4'], ['Result.', '5']], 'Position 5'),
        ],
        practice: [
          pr('Check bits r for 8 data bits?', 4, '2⁴ = 16 ≥ 13.', '4.'),
          pr('Check bits r for 64 data bits?', 7, '2⁷ = 128 ≥ 72.', '7 (8 with the extra parity bit in ECC memory).'),
          pr('Checks 2 and 4 fail. Flipped position?', 6, 'Add them.', '6.'),
          pr('Hamming(7,4): what share of the 7 bits are check bits (%, 1 decimal)?', 42.9, '3 ÷ 7.', '≈ 42.9%.'),
        ],
      },
    ],
  },

  'sec-003': {
    predict: {
      q: 'Five servers store a value. At least how many must agree on a write so that any later read of the same number is sure to see it?',
      options: ['3', '2', '5', '1'],
      answer: 0,
      reveal: 'Two groups of 3 out of 5 always share a server (3 + 3 > 5). Groups of 2 can miss each other entirely.',
    },
    parts: [
      {
        title: 'Majorities and fault tolerance',
        minutes: 20,
        explain: [
          'A majority quorum in n machines is ⌊n/2⌋ + 1. Any two majorities overlap, because together they have more than n members.',
          'If up to f machines may crash, the rest must still form a majority: n − f ≥ ⌊n/2⌋ + 1. The smallest n that works is 2f + 1.',
          'That is why clusters have odd sizes: 4 machines tolerate one crash, the same as 3.',
        ],
        formulas: [['Quorum', 'q = \\lfloor n/2 \\rfloor + 1'], ['Crash tolerance', 'n = 2f + 1']],
        examples: [
          ex('Quorum for 7 machines?', [['⌊7/2⌋ + 1.', '3 + 1'], ['Result.', '4']], '4'),
          ex('How many crashes can 7 machines survive?', [['7 = 2f + 1.', ''], ['f = 3.', '3']], '3'),
        ],
        practice: [
          pr('Quorum for 9 machines?', 5, '⌊9/2⌋ + 1.', '5.'),
          pr('Machines needed to survive 2 crashes?', 5, '2 × 2 + 1.', '5.'),
          pr('How many crashes can 4 machines survive with majority quorums?', 1, 'Quorum 3, so at most 1 down.', '1.'),
          pr('Each machine is up 99% of the time, independently. Chance a 3-machine cluster has a majority up (6 decimals)?', 0.999702, 'All 3 up, or exactly 2.', '0.99³ + 3 × 0.99² × 0.01 = 0.999702.'),
        ],
      },
      {
        title: 'Ordering events: Lamport clocks',
        minutes: 20,
        explain: [
          'Machines’ clocks drift, so timestamps from different machines cannot be trusted to order events. Lamport’s idea: a counter on each machine.',
          'Rule: before each event, add 1. When sending, attach the counter. When receiving, set the counter to max(own, received) + 1.',
          'If event A could have caused event B, A’s number is smaller. That is enough to agree on a consistent order.',
        ],
        formulas: [['On receive', 'L \\leftarrow \\max(L, L_{msg}) + 1']],
        examples: [
          ex('Clock at 5 receives a message stamped 9. New clock?', [['max(5, 9) + 1.', ''], ['Result.', '10']], '10'),
          ex('Clock at 12 receives a message stamped 4. New clock?', [['max(12, 4) + 1.', ''], ['Result.', '13']], '13'),
        ],
        practice: [
          pr('Clock at 3 receives a message stamped 3. New clock?', 4, 'max + 1.', '4.'),
          pr('Clock at 7 does two local events, then sends. What stamp does the message carry?', 10, '8, 9, then the send is 10.', '10.'),
          pr('Clock at 20 receives a message stamped 15. New clock?', 21, 'max(20, 15) + 1.', '21.'),
          ch('Why not just use each machine’s wall clock?', ['Clocks drift and disagree, so order could be wrong', 'Wall clocks are too slow', 'They show the wrong time zone only', 'They are fine'], 'Even milliseconds matter.', 'Logical clocks give a consistent order without perfect time.'),
        ],
      },
      {
        title: 'When machines lie: Byzantine faults',
        minutes: 20,
        explain: [
          'A crashed machine stays silent. A Byzantine machine may send different answers to different machines, by bug or by attack.',
          'Lamport, Shostak and Pease proved that tolerating f Byzantine machines needs at least 3f + 1 in total.',
          'Blockchains and some aircraft control systems are built to tolerate Byzantine faults; ordinary data centres mostly assume crashes only, which is cheaper.',
        ],
        formulas: [['Byzantine tolerance', 'n \\ge 3f + 1']],
        examples: [
          ex('Machines needed to tolerate 2 liars?', [['3 × 2 + 1.', ''], ['Result.', '7']], '7'),
          ex('Machines needed to tolerate 2 crashes?', [['2 × 2 + 1.', ''], ['Result.', '5']], '5'),
        ],
        practice: [
          pr('Machines needed to tolerate 1 Byzantine fault?', 4, '3 + 1.', '4.'),
          pr('With 10 machines, the most Byzantine faults tolerated?', 3, '3f + 1 ≤ 10.', '3.'),
          pr('With 10 machines, the most crash faults tolerated?', 4, '2f + 1 ≤ 10.', '4.'),
          ch('Which is a Byzantine fault?', ['A server reports different balances to different clients', 'A server loses power', 'A cable is cut', 'A disk fills up'], 'Inconsistent, not silent.', 'It actively misleads.'),
        ],
      },
    ],
  },

  'sec-004': {
    predict: {
      q: 'An 8-byte buffer is followed by 4 bytes of saved data and a 4-byte return address. How many input bytes reach the return address completely?',
      options: ['16', '8', '12', '4'],
      answer: 0,
      reveal: '8 fill the buffer, 4 more cover the saved frame pointer, and bytes 13 to 16 replace the return address.',
    },
    parts: [
      {
        title: 'The stack frame',
        minutes: 20,
        explain: [
          'Each function call pushes a frame on the stack (cs-133): its local variables, a saved pointer to the caller’s frame, and the return address.',
          'In C, a local array like char name[8] sits in the frame next to these. Copying input with no length check (gets, strcpy) can run past the end.',
          'On 64-bit machines addresses are 8 bytes, so the offsets change, but the idea is the same.',
        ],
        formulas: [['Offset to return address', '\\text{buffer} + \\text{saved pointer}']],
        code: [['The classic mistake (C)', '#include <string.h>\nvoid greet(const char *s) {\n    char name[8];\n    strcpy(name, s);   /* no size check! */\n}']],
        examples: [
          ex('32-bit: buffer 8, saved pointer 4. At which byte offset does the return address start?', [['8 + 4.', ''], ['Result.', '12']], '12'),
          ex('64-bit: buffer 16, saved pointer 8, address 8. Bytes to overwrite the address fully?', [['16 + 8 + 8.', ''], ['Result.', '32']], '32'),
        ],
        practice: [
          pr('32-bit: buffer 20, saved pointer 4. Offset of the return address?', 24, '20 + 4.', '24.'),
          pr('Same: bytes needed to overwrite all 4 bytes of the return address?', 28, '24 + 4.', '28.'),
          pr('In the animation, what is the largest input length that leaves the return address intact?', 12, 'Bytes 13 to 16 are the address.', '12.'),
          ch('Which C function has no way to limit input length?', ['gets', 'fgets', 'strncpy', 'snprintf'], 'Removed from C11.', 'gets reads until newline, however long.'),
        ],
      },
      {
        title: 'Defences: canaries, randomisation, no-execute',
        minutes: 20,
        explain: [
          'Stack canaries: a random value before the return address, checked before returning. Guessing a 64-bit canary has a 1 in 2⁶⁴ chance.',
          'Address space layout randomisation (ASLR) loads code at random addresses, so an attacker does not know where to jump. With k random bits there are 2ᵏ possibilities.',
          'Non-executable stacks stop injected bytes from running as code. Attackers responded by reusing existing code; defenders then added more checks. It is an arms race.',
        ],
        formulas: [['Guessing k random bits', '\\Pr = 2^{-k},\\quad \\text{average tries} \\approx 2^{k-1}']],
        examples: [
          ex('ASLR with 16 random bits: possible positions?', [['2¹⁶.', ''], ['Result.', '65\\,536']], '65,536'),
          ex('Average tries to guess it?', [['Half of them.', '2^{15}'], ['Result.', '32\\,768']], '32,768'),
        ],
        practice: [
          pr('ASLR with 28 random bits: possible positions?', 268435456, '2²⁸.', '268,435,456.'),
          pr('Average tries to guess an 8-bit random value?', 128, 'Half of 256.', '128.'),
          pr('How many bits in a typical 64-bit canary?', 64, 'Same as a register.', '64.'),
          ch('What does a non-executable stack stop?', ['Running bytes the attacker wrote on the stack', 'All bugs', 'Reading memory', 'Function calls'], 'NX bit.', 'Injected code cannot run there.'),
        ],
      },
      {
        title: 'Over-reads and memory-safe languages',
        minutes: 20,
        explain: [
          'Bugs that read too much are dangerous too. Heartbleed (2014) answered a “heartbeat” with as many bytes as the request claimed, up to 64 KB, leaking whatever memory sat next to it: keys, passwords, cookies.',
          'Memory-safe languages check every array index and manage memory automatically, so these bugs cannot happen in ordinary code. Python raises IndexError instead of reading past the end.',
          'In 2023–24 security agencies, including the US CISA, urged new code to be written in memory-safe languages such as Rust, Go, Java, C# or Python.',
        ],
        formulas: [['Leak per request', '\\le 64\\ \\text{KB} = 65\\,536\\ \\text{bytes}']],
        code: [['Python checks for you', 'name = [0] * 8\ntry:\n    name[12] = 1\nexcept IndexError as e:\n    print("stopped:", e)']],
        examples: [
          ex('1,000 Heartbleed requests at 64 KB each: bytes leaked at most?', [['1,000 × 65,536.', ''], ['Result.', '65\\,536\\,000']], 'About 65.5 MB'),
          ex('A request claims 500 bytes but sends 1. How many bytes of other memory come back?', [['500 − 1.', ''], ['Result.', '499']], '499'),
        ],
        practice: [
          pr('A request claims 64 bytes but sends 4. Bytes of other memory leaked?', 60, '64 − 4.', '60.'),
          pr('How many bytes is 64 KB?', 65536, '64 × 1,024.', '65,536.'),
          ch('What does Python do for name[12] when name has 8 items?', ['Raises IndexError', 'Reads whatever is there', 'Returns 0', 'Crashes the computer'], 'It checks.', 'Memory-safe: out of range is an error.'),
          pr('About what % of Microsoft’s fixed security bugs were memory-safety bugs (2019)?', 70, 'Seven in ten.', '70%.'),
        ],
      },
    ],
  },

  'sec-005': {
    predict: {
      q: 'A login query is built as "... WHERE name = \'" + input + "\'". You type  \' OR \'1\'=\'1 . How many users match?',
      options: ['All of them', 'None', 'Only you', 'An error, always'],
      answer: 0,
      reveal: 'The query becomes WHERE name = \'\' OR \'1\'=\'1\'. The second part is true for every row.',
    },
    parts: [
      {
        title: 'How injection works',
        minutes: 20,
        explain: [
          'The program means the input to be data, but the database receives one string of text and reads it as code. A quote in the input ends the data early; whatever follows is SQL.',
          'Classic payloads: \' OR \'1\'=\'1 (make the condition always true), admin\' -- (comment out the password check), \'; DROP TABLE users; -- (add a second command).',
          'Injection is one family: the same mistake with HTML gives cross-site scripting, with shell commands gives command injection.',
        ],
        formulas: [['The rule', '\\text{never build code by concatenating untrusted text}']],
        code: [['Vulnerable (do not do this)', 'q = "SELECT * FROM users WHERE name = \'" + name + "\'"\ndb.execute(q)']],
        examples: [
          ex('Users: admin, maria, o’brien. Input \' OR \'1\'=\'1. Rows returned?', [['Condition is always true.', ''], ['All rows.', '3']], '3'),
          ex('Query “WHERE name = \'X\' AND pass = \'Y\'” with name admin\' -- . What is checked?', [['-- starts a comment.', ''], ['The password test is ignored.', '\\text{only name = admin}']], 'Only the name: logged in as admin'),
        ],
        practice: [
          pr('Users table has 250 rows. With the always-true payload, how many rows match?', 250, 'Every row.', '250.'),
          pr('Same table, input maria (a real user). Rows?', 1, 'Normal.', '1.'),
          ch('What does -- do in SQL?', ['Starts a comment to the end of the line', 'Subtracts', 'Ends the query with an error', 'Deletes a row'], 'It hides the rest.', 'Everything after it is ignored.'),
          ch('Which is another member of the injection family?', ['Cross-site scripting', 'A buffer overflow', 'A worm', 'Phishing'], 'Untrusted text treated as code in a web page.', 'XSS injects script into HTML.'),
        ],
      },
      {
        title: 'Parameterised queries',
        minutes: 20,
        explain: [
          'A parameterised (prepared) query sends the SQL with placeholders first, then the values separately. The database has already parsed the query, so a value can only ever be a value.',
          'In Python’s sqlite3 the placeholder is ?. Every major language and database supports this.',
          'Extra layers help: give the app’s database account only the permissions it needs (no DROP), and validate input shapes such as numbers and dates.',
        ],
        formulas: [['Safe query', '\\texttt{WHERE name = ?} + (\\text{name},)']],
        code: [['Safe', 'db.execute("SELECT * FROM users WHERE name = ?", (name,))']],
        examples: [
          ex('Parameterised, input \' OR \'1\'=\'1. Rows returned (no user has that name)?', [['The whole string is looked for as a name.', ''], ['None match.', '0']], '0'),
          ex('Parameterised, input o’brien. Rows?', [['The apostrophe is just a character.', ''], ['One user.', '1']], '1'),
        ],
        practice: [
          pr('Parameterised, input x\'; DROP TABLE users; --. How many tables are dropped?', 0, 'It is just a strange name.', '0.'),
          pr('A query has 3 placeholders. How many values must be sent with it?', 3, 'One per ?.', '3.'),
          ch('Why does filtering out quotes not fully fix injection?', ['Numbers need no quotes, and there are other tricks; it also breaks real names', 'Quotes are never dangerous', 'It is a full fix', 'It makes queries slower'], 'Blocklists leak.', 'Parameterise instead.'),
          ch('Least privilege for the app’s database account means …', ['only the permissions it truly needs', 'full admin rights', 'no password', 'a shared account for everyone'], 'Limit the damage.', 'Even a successful injection then cannot drop tables.'),
        ],
      },
      {
        title: 'Escaping output: XSS',
        minutes: 20,
        explain: [
          'Cross-site scripting (XSS): a site shows user text inside HTML without escaping it. A comment containing <script>…</script> then runs in every visitor’s browser.',
          'The fix is the same idea: treat data as data. Escape < as &lt;, > as &gt;, & as &amp; and quotes when inserting text into HTML. Modern frameworks such as React do this by default.',
          'OWASP’s Top 10 list ranks injection, including XSS, among the most common serious web risks.',
        ],
        formulas: [['Escaping', '\\texttt{<} \\to \\texttt{\\&lt;},\\quad \\texttt{>} \\to \\texttt{\\&gt;}']],
        code: [['Escaping in Python', 'import html\nprint(html.escape("<b>hi</b>"))   # &lt;b&gt;hi&lt;/b&gt;']],
        examples: [
          ex('Escape “<b>”. How many characters long is the result?', [['&lt; b &gt;.', '4 + 1 + 4'], ['Result.', '9']], '9 (&lt;b&gt;)'),
          ex('How many characters does “&lt;” use for one “<”?', [['&, l, t, ;.', ''], ['Result.', '4']], '4'),
        ],
        practice: [
          pr('Escape “<i>”: length of the result?', 9, '&lt;i&gt;.', '9.'),
          pr('Escape “a<b”: length of the result?', 6, 'a + &lt; + b.', '6.'),
          pr('In what year did OWASP publish its first Top 10?', 2003, 'Two years after its founding.', '2003.'),
          ch('What does React do with text placed inside JSX by default?', ['Escapes it, so it shows as text', 'Runs it as script', 'Deletes it', 'Encrypts it'], 'Safe by default.', 'Escaped.'),
        ],
      },
    ],
  },

  'sec-006': {
    predict: {
      q: 'Which takes longer to guess by brute force: 8 random lowercase letters, or 4 random common words?',
      options: ['4 random words', '8 lowercase letters', 'They are the same', 'Neither can be guessed'],
      answer: 0,
      reveal: '26⁸ ≈ 2 × 10¹¹, but 7,776⁴ ≈ 3.7 × 10¹⁵: about 17,000 times more, and easier to remember.',
    },
    parts: [
      {
        title: 'Search space and entropy',
        minutes: 20,
        explain: [
          'A random password of length L from an alphabet of A symbols has Aᴸ possibilities. Its entropy is L log₂ A bits; each bit doubles the attacker’s work.',
          'This only holds if the password is truly random. Human-chosen passwords (names, years, “P@ssw0rd”) are guessed early because attackers try likely ones first.',
          'Diceware picks words with dice from a list of 6⁵ = 7,776, about 12.9 bits per word.',
        ],
        formulas: [['Entropy', 'H = L \\log_2 A'], ['Time', 't = A^L / \\text{rate}']],
        examples: [
          ex('Entropy of 8 random lowercase letters?', [['8 × log₂ 26 ≈ 8 × 4.70.', ''], ['Result.', '\\approx 37.6\\ \\text{bits}']], 'About 37.6 bits'),
          ex('At 10¹⁰ guesses a second, seconds to try all 26⁸?', [['26⁸ ≈ 2.09 × 10¹¹.', ''], ['÷ 10¹⁰.', '\\approx 20.9']], 'About 21 s'),
        ],
        practice: [
          pr('Entropy of 4 Diceware words, in bits (1 decimal)?', 51.7, '4 × log₂ 7776.', '≈ 51.7.'),
          pr('Entropy of 12 random keyboard characters (95 symbols), in bits (1 decimal)?', 78.8, '12 × log₂ 95.', '≈ 78.8.'),
          pr('Possibilities for a 4-digit PIN?', 10000, '10⁴.', '10,000.'),
          pr('Words in a Diceware list (five dice)?', 7776, '6⁵.', '7,776.'),
        ],
      },
      {
        title: 'Storing passwords: salted, slow hashes',
        minutes: 25,
        explain: [
          'A site should store hash(salt + password), never the password. At login it recomputes and compares.',
          'A salt is random and different per user, so equal passwords get different hashes and an attacker cannot use one precomputed table for everyone.',
          'Fast hashes (like SHA-256) allow billions of guesses a second on GPUs. Deliberately slow ones (bcrypt 1999, scrypt, Argon2 2015) take, say, 0.1 s each, cutting the attacker’s rate a billionfold.',
        ],
        formulas: [['Stored', 'h = \\text{slowhash}(\\text{salt} \\,\\Vert\\, \\text{password})']],
        code: [['Hashing with a salt (Python)', 'import hashlib, os\nsalt = os.urandom(16)\nh = hashlib.scrypt(b"jeepney mango rooftop guitar", salt=salt, n=2**14, r=8, p=1)\n# store salt and h, never the password']],
        examples: [
          ex('A 1-million-word guess list at 10¹⁰ fast hashes per second: time?', [['10⁶ / 10¹⁰.', ''], ['Result.', '10^{-4}\\ \\text{s}']], '0.0001 s'),
          ex('Same list, slow hash at 10 guesses per second: hours?', [['10⁶ / 10 = 10⁵ s.', ''], ['÷ 3,600.', '\\approx 27.8']], 'About 28 hours, for one user'),
        ],
        practice: [
          pr('A slow hash takes 0.1 s. Guesses per second per core?', 10, '1 ÷ 0.1.', '10.'),
          pr('Rate drops from 10¹⁰ to 10 per second. By what factor?', 1000000000, 'Divide.', '10⁹.'),
          pr('1,000 users, each with a different salt: how many separate cracking jobs does the attacker face?', 1000, 'No shared table.', '1,000.'),
          ch('Why is a unique salt per user important?', ['Equal passwords get different hashes and precomputed tables fail', 'It makes passwords shorter', 'It hides the username', 'It replaces the hash'], 'Morris and Thompson.', 'Each user must be attacked separately.'),
        ],
      },
      {
        title: 'Beyond passwords',
        minutes: 20,
        explain: [
          'Two-factor authentication adds something you have, such as a phone app generating a 6-digit code every 30 seconds. A stolen password alone is then not enough.',
          'With a million possible codes and only a few tries allowed, guessing is hopeless: 3 tries give a 3-in-a-million chance.',
          'Passkeys (from 2022 onwards) replace passwords with a public/private key pair on your device (cs-156): the site stores only a public key, so there is nothing secret to steal from it.',
        ],
        formulas: [['Guessing a 6-digit code in k tries', 'k / 10^6']],
        examples: [
          ex('Chance to guess a 6-digit code in 3 tries?', [['3 / 10⁶.', ''], ['Result.', '0.000003']], '3 in a million'),
          ex('An 8-digit code with 5 tries?', [['5 / 10⁸.', ''], ['Result.', '5 \\times 10^{-8}']], '1 in 20 million'),
        ],
        practice: [
          pr('Possible 6-digit codes?', 1000000, '10⁶.', '1,000,000.'),
          pr('A code changes every 30 s. How many codes per hour?', 120, '3,600 ÷ 30.', '120.'),
          ch('What does a site store for a passkey?', ['Only your public key', 'Your password', 'Your fingerprint image', 'Your private key'], 'Public/private pair.', 'The private key never leaves your device.'),
          ch('Which is “something you have”?', ['A phone with an authenticator app', 'Your password', 'Your mother’s maiden name', 'Your birthday'], 'Factors: know, have, are.', 'The phone.'),
        ],
      },
    ],
  },

  'sec-007': {
    predict: {
      q: 'A phishing site shows a valid padlock. Does that mean it is your bank?',
      options: ['No: it proves only that the site owns its own domain name', 'Yes, the padlock checks that', 'Only if it is green', 'Padlocks cannot be valid on fakes'],
      answer: 0,
      reveal: 'A certificate binds a domain name to a key. A scammer can get one for “bank-secure-login.example”. Always read the address.',
    },
    parts: [
      {
        title: 'Certificates and signatures',
        minutes: 20,
        explain: [
          'A certificate says “this public key belongs to www.bank.com.ph”, plus validity dates, signed with the issuing authority’s private key.',
          'Anyone can check the signature with the issuer’s public key. Forging it without the private key is believed infeasible, just like breaking the key exchange in cs-156.',
          'Browsers and operating systems ship with a list of about a hundred trusted root authorities.',
        ],
        formulas: [['Valid if', '\\text{verify}(\\text{issuer public key}, \\text{signature}, \\text{certificate}) = \\text{true}']],
        examples: [
          ex('A chain has the site, one intermediate and a root. How many signatures are checked?', [['Site by intermediate; intermediate by root.', ''], ['The root is trusted directly.', '2']], '2'),
          ex('Same, with two intermediates?', [['One more link.', ''], ['Result.', '3']], '3'),
        ],
        practice: [
          pr('How many certificates in a chain of site + 2 intermediates + root?', 4, 'Count them.', '4.'),
          pr('In the animation, at which check number does the forged certificate fail?', 1, 'The site’s signature.', '1.'),
          pr('And the certificate from an unknown root?', 3, 'The trust-store check.', '3.'),
          ch('What does a certificate authority sign?', ['A domain name together with its public key', 'Your password', 'The website’s content', 'Your IP address'], 'Binding.', 'Name ↔ key.'),
        ],
      },
      {
        title: 'The TLS handshake',
        minutes: 20,
        explain: [
          'TLS 1.3 (2018): the browser sends a hello with its Diffie–Hellman share; the server answers with its share, its certificate and a signature proving it holds the matching private key. Both now have a shared secret and the browser knows who it is talking to.',
          'This takes one round trip; TLS 1.2 needed two. On a slow mobile link with 200 ms round trips, that saves a fifth of a second on every new connection.',
          'After the handshake, data is encrypted with a fast symmetric cipher such as AES (cs-156).',
        ],
        formulas: [['Handshake time', 't \\approx k \\times \\text{RTT}']],
        examples: [
          ex('RTT 100 ms. Handshake time in TLS 1.3 (1 RTT) versus TLS 1.2 (2 RTT)?', [['100 ms vs 200 ms.', ''], ['Saved.', '100\\,\\text{ms}']], '100 ms saved'),
          ex('A page opens 6 new connections, each saving 100 ms, one after another. Total saved?', [['6 × 100.', ''], ['Result.', '600\\,\\text{ms}']], '0.6 s'),
        ],
        practice: [
          pr('RTT 200 ms: ms saved per new connection by TLS 1.3?', 200, 'One fewer round trip.', '200 ms.'),
          pr('How many round trips does a TLS 1.3 full handshake take?', 1, 'One.', '1.'),
          ch('After the handshake, what encrypts the data?', ['A fast symmetric cipher such as AES', 'RSA for every byte', 'Nothing', 'The certificate'], 'Public-key is slow.', 'Symmetric encryption with the agreed key.'),
          pr('In what year was TLS 1.3 published?', 2018, 'RFC 8446.', '2018.'),
        ],
      },
      {
        title: 'When trust breaks, and free certificates',
        minutes: 20,
        explain: [
          'A hacked or careless authority can issue certificates for any domain. After DigiNotar (2011), browsers added Certificate Transparency: every certificate is logged publicly, so fakes are spotted.',
          'Let’s Encrypt issues free certificates valid for 90 days and encourages renewing every 60, done automatically.',
          'Short lifetimes limit the damage of a stolen key: it stops working soon anyway.',
        ],
        formulas: [['Renewals per year', '365 / 60 \\approx 6']],
        examples: [
          ex('Renewing every 60 days: renewals per year?', [['365 / 60 ≈ 6.08.', ''], ['Whole renewals.', '6']], '6'),
          ex('A stolen key on a 90-day certificate stolen on day 30: days it stays valid?', [['90 − 30.', ''], ['Result.', '60']], '60 days at most'),
        ],
        practice: [
          pr('How many days is a Let’s Encrypt certificate valid?', 90, 'Short-lived.', '90.'),
          pr('A key is stolen on day 75 of a 90-day certificate. Days left?', 15, '90 − 75.', '15.'),
          pr('In what year was DigiNotar hacked?', 2011, 'Fake google.com certificates.', '2011.'),
          ch('What does Certificate Transparency add?', ['Public logs of every certificate issued', 'Free certificates', 'Faster encryption', 'Green padlocks'], 'Fakes become visible.', 'Anyone can audit what was issued.'),
        ],
      },
    ],
  },

  'sec-008': {
    predict: {
      q: 'A worm doubles every 8.5 seconds starting from one machine. About how long until 75,000 are infected (ignoring the slowdown at the end)?',
      options: ['About 2½ minutes', 'About a day', 'About 10 seconds', 'About an hour'],
      answer: 0,
      reveal: 'log₂ 75,000 ≈ 16.2 doublings × 8.5 s ≈ 138 s. Exponential growth is that fast.',
    },
    parts: [
      {
        title: 'Exponential growth',
        minutes: 20,
        explain: [
          'Early on, each infected machine infects others at a steady rate, so the count doubles every T_d seconds: I(t) = I₀ · 2^(t/T_d).',
          'The number of doublings to reach N is log₂(N/I₀). Even huge numbers need only a few dozen doublings.',
          'This is why human response is too slow for fast worms: defences must be in place before the outbreak, as patches.',
        ],
        formulas: [['Growth', 'I(t) = I_0 \\cdot 2^{t/T_d}'], ['Time to N', 't = T_d \\log_2(N/I_0)']],
        examples: [
          ex('From 1 machine, doubling every 8.5 s: infected after 60 s?', [['60 / 8.5 ≈ 7.06 doublings.', ''], ['2^7.06.', '\\approx 133']], 'About 133'),
          ex('Seconds to reach 75,000?', [['log₂ 75,000 ≈ 16.2.', ''], ['× 8.5.', '\\approx 138']], 'About 138 s'),
        ],
        practice: [
          pr('Doublings to go from 1 to 1,024?', 10, 'log₂ 1024.', '10.'),
          pr('Doubling every 8.5 s: seconds to go from 1 to 1,024?', 85, '10 × 8.5.', '85.'),
          pr('Rounds of doubling from 1 grain until you pass 75,000?', 17, '2¹⁶ = 65,536 < 75,000 < 131,072.', '17.'),
          pr('Code Red infected 359,000 hosts. About how many doublings from 1 (1 decimal)?', 18.5, 'log₂ 359,000.', '≈ 18.5.'),
        ],
      },
      {
        title: 'Saturation: the logistic curve',
        minutes: 20,
        explain: [
          'Growth slows when most vulnerable machines are already infected: the worm keeps probing machines that are taken. The logistic model captures this: dI/dt = r I (1 − I/K).',
          'Its solution is an S-curve: I(t) = K / (1 + (K − 1)e^(−rt)). Half of K is reached at t = ln(K − 1)/r.',
          'The fastest growth is at the halfway point, which is when networks are most jammed.',
        ],
        formulas: [['Logistic', 'I(t) = \\dfrac{K}{1 + (K-1)e^{-rt}}'], ['Halfway', 't_{1/2} = \\dfrac{\\ln(K-1)}{r}']],
        examples: [
          ex('K = 75,000, r = ln 2 / 8.5 ≈ 0.0815 per s. When is half infected?', [['ln 74,999 ≈ 11.23.', ''], ['÷ 0.0815.', '\\approx 138\\,\\text{s}']], 'About 138 s'),
          ex('Same model: infected at 180 s?', [['e^(−14.7) × 74,999 ≈ 0.032.', ''], ['75,000 / 1.032.', '\\approx 72\\,700']], 'About 72,700'),
        ],
        practice: [
          pr('Logistic with K = 1,000 at its halfway time: infected?', 500, 'Half of K.', '500.'),
          pr('r = 0.1 per s, K = 1,001. Halfway time in s (1 decimal)?', 69.1, 'ln 1000 ÷ 0.1.', '≈ 69.1 s.'),
          ch('Where is the logistic curve steepest?', ['At the halfway point', 'At the start', 'At the end', 'Everywhere equally'], 'r I (1 − I/K) is largest at I = K/2.', 'Halfway.'),
          ch('Why does a worm slow down near the end?', ['Most probes hit machines already infected or not vulnerable', 'It gets tired', 'Networks get faster', 'It runs out of code'], 'Targets run out.', 'Saturation.'),
        ],
      },
      {
        title: 'Patching as herd immunity',
        minutes: 20,
        explain: [
          'Patching a share q of machines does two things: fewer machines can be infected (K shrinks by 1 − q), and each probe finds a victim less often (r shrinks by 1 − q too).',
          'In the animation’s model, 80% patched still leaves about 8,000 infected after ten minutes, but 90% patched leaves about 130.',
          'Most big outbreaks, from Code Red to WannaCry, used flaws that already had patches. Automatic updates and backups kept offline are the cheapest defences.',
        ],
        formulas: [['After patching', 'K = (1-q)N,\\quad r = (1-q)r_0']],
        examples: [
          ex('N = 75,000, q = 0.8. How many can ever be infected?', [['0.2 × 75,000.', ''], ['Result.', '15\\,000']], '15,000'),
          ex('Doubling time 8.5 s with no patches. With 80% patched?', [['r falls to 0.2 r₀, so T_d grows 5×.', '8.5 \\times 5'], ['Result.', '42.5\\,\\text{s}']], '42.5 s'),
        ],
        practice: [
          pr('N = 75,000, q = 0.9. How many can ever be infected?', 7500, '0.1 × 75,000.', '7,500.'),
          pr('Doubling time 8.5 s; with 90% patched, new doubling time in s?', 85, '× 10.', '85 s.'),
          pr('In the animation, what share patched (as a %) is the smallest that keeps infections under 1,000 after 10 minutes?', 90, '85% leaves about 1,350.', '90%.'),
          pr('WannaCry hit more than how many thousand computers?', 200, 'May 2017.', 'More than 200,000.'),
        ],
      },
    ],
  },
};
