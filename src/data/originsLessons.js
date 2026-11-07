// New lessons that fill in the story of number, shape and matter so the path
// runs in order from the very first tally marks. Same shape as curriculum.js.

const base = (id, code, track, extra) => ({
  id,
  code,
  track,
  standardMins: 40,
  overtimeMins: 15,
  xpReward: 100,
  prereqIds: [],
  umCourseLink: '',
  ...extra,
});

export const ORIGIN_LESSONS = [
  // ------------------------------------------------------------------ 1
  base('num-001', 'NUM 01', 'math', {
    title: 'Counting Before Numbers: Tally Marks & the Natural Numbers',
    subtitle: 'How people kept track of things long before anyone wrote a digit',
    overtimeDigest: [
      'Counting started as matching: one notch, one pebble or one finger for each thing.',
      'Bundling marks into groups (usually 5 or 10) made big counts readable at a glance.',
      'The natural numbers 1, 2, 3, … are what you get by always being able to add one more. They never end.',
    ],
    history: {
      era: 'c. 43,000 BC → 20,000 BC • Southern & Central Africa',
      protagonist: 'The makers of the Lebombo and Ishango bones',
      hook: 'How do you count your sheep if your language has no word for "seven"?',
      narrative: [
        'In a cave in the Lebombo Mountains, between today’s South Africa and Eswatini, archaeologists found a baboon fibula with 29 deliberate notches. It is around 43,000 years old. Nobody knows for sure what was being counted (days of a moon cycle is one guess), but someone was matching marks to things.',
        'The Ishango bone from the Congo, about 20,000 years old, goes further: its notches are arranged in groups, some of them doubling and some clustering around 10 and 20. Grouping is the crucial step. A pile of 27 loose strokes is unreadable; five bundles of five plus two is obvious.',
        'This idea lasted astonishingly long. England’s treasury recorded debts on notched wooden "tally sticks" until 1826. When the stockpile of old sticks was burned in 1834, the fire got out of control and burned down the Houses of Parliament. In the 1880s, Giuseppe Peano finally pinned down what all of this means: start at 1, and every number has a "next one". Those are the natural numbers.',
      ],
      takeaway:
        'Counting is matching. Before you can do anything else in maths, you need the idea that two collections are the same size when you can pair them up one-to-one.',
    },
    csBridge: {
      concept: 'Unary Encoding & the Successor Function',
      analogy:
        'A tally is a unary number system: the value is the length of the list. Peano’s natural numbers are exactly a linked list where each node points to its successor.',
      codeSnippet: `// Peano-style natural numbers: zero-free, built from "next"
const one = { prev: null };
const next = (n) => ({ prev: n });
const three = next(next(one));

function toInt(n) {
  let count = 1;
  while (n.prev) { n = n.prev; count++; }  // walk back, one notch at a time
  return count;
}
toInt(three); // 3`,
    },
    visualLab: {
      type: 'tally_counting',
      title: 'One Notch per Sheep',
      instructions: 'Add sheep and watch each one get its own notch. Then bundle the notches in fives.',
      missionPrompt: 'Count 23 sheep and bundle the notches in fives.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Match one-to-one',
        formula: '\\{\\text{sheep}_1, \\text{sheep}_2, \\text{sheep}_3\\} \\;\\longleftrightarrow\\; \\{\\,|\\,,\\,|\\,,\\,|\\,\\} \\;\\Rightarrow\\; 3',
        explanation:
          'Two collections have the same size if every item in one can be paired with exactly one item in the other. You do not need number words for this, which is why it came first.',
      },
      {
        title: '2. Bundle to read faster',
        formula: '17 = 5 + 5 + 5 + 2 = 3 \\times 5 + 2',
        explanation:
          'Group the marks in fives (one hand) or tens (two hands). Now you only need to count bundles and leftovers. Every number system in the next lesson grows out of this trick.',
      },
      {
        title: '3. There is always a next one',
        formula: '\\mathbb{N} = \\{1, 2, 3, 4, \\dots\\} \\qquad n \\mapsto n + 1',
        explanation:
          'The natural numbers are everything you reach by starting at 1 and adding one more, again and again. There is no largest one: whatever number you name, n + 1 is bigger.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n001-d1',
          question: 'A tally shows 4 full bundles of five and 3 loose marks. How many things were counted?',
          options: ['23', '43', '20', '17'],
          correctIndex: 0,
          hint1: 'Each bundle is 5.',
          hint2: '4 × 5 = 20, then add the 3 loose marks.',
          explanation: '4 bundles × 5 = 20, plus 3 loose marks = 23.',
        },
        {
          id: 'n001-d2',
          question: 'Which of these is NOT a natural number?',
          options: ['½', '7', '1', '1,000,000'],
          correctIndex: 0,
          hint1: 'Natural numbers are the counting numbers 1, 2, 3, …',
          hint2: 'Can you count "half a sheep" with a single notch?',
          explanation: 'Natural numbers are whole counting numbers. ½ is a fraction, which comes later in the story.',
        },
        {
          id: 'n001-d3',
          question: 'A shepherd cut one notch for each of 18 sheep in the morning. In the evening only 15 sheep match a notch. How many are missing?',
          options: ['3', '15', '33', '2'],
          correctIndex: 0,
          hint1: 'Pair each returning sheep with a notch.',
          hint2: 'How many notches are left without a sheep?',
          explanation: '18 notches − 15 matched = 3 notches left over, so 3 sheep are missing.',
        },
      ],
      bossProblem: {
        title: 'Materials Lab: Logging Test Samples',
        scenario:
          'A metallurgy lab marks a tally on the whiteboard for every steel sample that arrives. By Friday the board shows 7 bundles of five and 4 loose marks. 12 samples have already been sent away for testing. How many samples are still in the lab?',
        options: ['27', '39', '23', '31'],
        correctIndex: 0,
        hint: 'First count the board (bundles × 5 + loose), then take away the ones sent out.',
        explanation: '7 × 5 + 4 = 39 samples arrived. 39 − 12 = 27 are still in the lab.',
      },
    },
  }),

  // ------------------------------------------------------------------ 2
  base('num-002', 'NUM 02', 'math', {
    title: 'Writing Numbers Down: Egyptian, Babylonian & Roman Systems',
    subtitle: 'Different civilisations, different symbols, and why bundle size (the base) matters',
    overtimeDigest: [
      'Egypt and Rome used additive systems: repeat a symbol to add its value (∩∩||| = 23, XXIII = 23).',
      'Babylon used base 60 with place value. That is why we still have 60 minutes and 360 degrees.',
      'Any whole number can be written in any base b as a sum of digits × powers of b. Computers use base 2.',
    ],
    history: {
      era: 'c. 3300 BC Uruk → c. 3000 BC Egypt → c. 2000 BC Babylon → Rome',
      protagonist: 'Sumerian scribes, Egyptian priests & Roman merchants',
      hook: 'Why does an hour have 60 minutes when we count in tens?',
      narrative: [
        'In Sumer (today’s Iraq) people tracked grain and sheep with small clay tokens. Around 3300 BC in the city of Uruk they began pressing the tokens into clay envelopes, then simply drawing their shapes. Many historians, following Denise Schmandt-Besserat, think this is how writing itself began: as bookkeeping.',
        'Egypt, around 3000 BC, wrote numbers with picture symbols: a stroke for 1, a heel-bone for 10, a coil of rope for 100, a lotus flower for 1,000. To write 23 you drew two heel-bones and three strokes. Rome later did the same with letters (I, V, X, L, C, D, M). These systems are easy to read but terrible to calculate with, so Romans did their sums on a counting board.',
        'Babylonian scribes (from about 2000 BC) did something cleverer. With just two wedge shapes they wrote digits from 1 to 59, and the position of each digit multiplied it by a power of 60. Sixty divides evenly by 2, 3, 4, 5, 6, 10, 12, 15, 20 and 30, which made fractions easy. Greek astronomers adopted it for angles and time, and we have never let go.',
      ],
      takeaway:
        'How you write a number decides how easy it is to calculate with. Place value, where a digit’s position sets its size, was the breakthrough.',
    },
    csBridge: {
      concept: 'Number Bases & Radix Conversion',
      analogy:
        'You already know base 2, 10 and 16. Babylonian base 60 is the same algorithm with radix 60: repeatedly divide by the base and collect remainders.',
      codeSnippet: `function toBase(n, b) {
  const digits = [];
  do { digits.unshift(n % b); n = Math.floor(n / b); } while (n > 0);
  return digits;
}
toBase(75, 60);  // [1, 15]   → one sixty and fifteen ones
toBase(23, 2);   // [1,0,1,1,1]`,
    },
    visualLab: {
      type: 'numeral_systems',
      title: 'One Number, Many Alphabets',
      instructions: 'Pick a number and a bundle size. Watch the place-value columns rebuild and compare the ancient notations.',
      missionPrompt: 'Write 365 in base 60 like a Babylonian, then in base 2.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Additive systems: repeat the symbol',
        formula: '\\text{XXIII} = 10 + 10 + 1 + 1 + 1 = 23 \\qquad \\text{IV} = 5 - 1 = 4',
        explanation:
          'Egyptian and Roman numerals add up the symbols you see. Rome added a shortcut: a smaller symbol before a bigger one is subtracted (IV, IX, XL, CM).',
      },
      {
        title: '2. Place value: position multiplies',
        formula: '75_{10} = 1 \\times 60^1 + 15 \\times 60^0 \\quad\\Rightarrow\\quad (1,\\,15)_{60}',
        explanation:
          'In a place-value system every column is worth the base times the column to its right. Babylon used 60; India (next lesson) used 10.',
      },
      {
        title: '3. Any base works',
        formula: 'N = d_k b^k + \\dots + d_1 b^1 + d_0 b^0, \\qquad 0 \\le d_i < b',
        explanation:
          'Base 10 is an accident of having ten fingers. Base 2 (only 0 and 1) is natural for switches that are on or off, which is why computers use it.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n002-d1',
          question: 'What year is MCMXCIV?',
          options: ['1994', '2096', '1196', '1904'],
          correctIndex: 0,
          hint1: 'Split it: M | CM | XC | IV.',
          hint2: '1000 + 900 + 90 + 4.',
          explanation: 'M = 1000, CM = 900, XC = 90, IV = 4. Total 1994.',
        },
        {
          id: 'n002-d2',
          question: 'A Babylonian writes the digits (2, 5) in base 60. What number is that in base 10?',
          options: ['125', '25', '70', '205'],
          correctIndex: 0,
          hint1: 'The left digit counts sixties.',
          hint2: '2 × 60 + 5.',
          explanation: '(2, 5) in base 60 = 2 × 60 + 5 = 125.',
        },
        {
          id: 'n002-d3',
          question: 'What is 13 written in base 2?',
          options: ['1101', '1011', '1110', '111'],
          correctIndex: 0,
          hint1: 'Powers of two: 8, 4, 2, 1.',
          hint2: '13 = 8 + 4 + 1.',
          explanation: '13 = 1×8 + 1×4 + 0×2 + 1×1, so 1101.',
        },
      ],
      bossProblem: {
        title: 'Reading a Furnace Log in Base 60',
        scenario:
          'A heat-treatment furnace logged a run of 7,385 seconds. Hours, minutes and seconds are a Babylonian base-60 system. How long was the run?',
        options: ['2 h 3 min 5 s', '7 h 38 min 5 s', '2 h 30 min 5 s', '1 h 23 min 5 s'],
        correctIndex: 0,
        hint: 'Divide by 3,600 for hours, then divide the remainder by 60 for minutes.',
        explanation: '7,385 ÷ 3,600 = 2 hours, remainder 185 s. 185 ÷ 60 = 3 minutes, remainder 5 s. So (2, 3, 5) in base 60: 2 h 3 min 5 s.',
      },
    },
  }),

  // ------------------------------------------------------------------ 3
  base('num-003', 'NUM 03', 'math', {
    title: 'Zero & Place Value: The Most Important Nothing',
    subtitle: 'How an empty column became a number, and travelled from India to the world',
    overtimeDigest: [
      'In a place-value system you need a way to say "this column is empty", otherwise 205 and 25 look the same.',
      'Babylon and the Maya used a placeholder mark; India (Brahmagupta, 628 AD) treated zero as a number with its own rules.',
      'Through al-Khwarizmi and Fibonacci (1202) the Hindu-Arabic digits 0–9 spread to Europe and replaced Roman numerals.',
    ],
    history: {
      era: 'c. 300 BC Babylon → 628 AD India → 825 Baghdad → 1202 Pisa',
      protagonist: 'Brahmagupta, al-Khwarizmi & Leonardo of Pisa (Fibonacci)',
      hook: 'Why did the city of Florence once ban the digit 0?',
      narrative: [
        'Babylonian scribes wrote numbers in base 60 for 1,500 years with no symbol for an empty place. You had to guess from context whether a number meant 1 × 60 + 2 or 1 × 3,600 + 2. Late in their history (around 300 BC) they started writing two small slanted wedges as a placeholder. The Maya of Central America independently invented a zero glyph, a shell, for their calendars.',
        'The leap came in India. In his Brāhmasphuṭasiddhānta of 628 AD, the astronomer Brahmagupta gave rules for zero as a number: a number plus zero is itself, a number times zero is zero. Combined with the nine Indian digits and place value, this gave a system where any number could be written and calculated with on paper. Around 825 AD, al-Khwarizmi in Baghdad wrote the book that carried these "Hindu numerals" into the Islamic world.',
        'In 1202, Leonardo of Pisa, known as Fibonacci, published Liber Abaci after learning the system from North African merchants. European bookkeepers resisted: in 1299 Florence banned the new digits in official accounts because a 0 could easily be changed into a 6 or 9. But calculation on paper was so much faster than the counting board that, within a few centuries, Roman numerals were finished.',
      ],
      takeaway:
        'Zero is two things at once: a placeholder that makes place value work, and a number with its own arithmetic. Without it there are no decimals, no algebra and no computers.',
    },
    csBridge: {
      concept: 'Positional Encoding & Null Values',
      analogy:
        'Zero as a placeholder is like padding a fixed-width field: "0205" keeps the 2 in the hundreds column. Division by zero is the original undefined behaviour.',
      codeSnippet: `const digits = String(205).padStart(4, '0');  // "0205"
const value = [...digits].reduce((acc, d) => acc * 10 + Number(d), 0);  // 205

5 + 0;   // 5   (adding nothing changes nothing)
5 * 0;   // 0   (zero copies of anything is nothing)
5 / 0;   // Infinity in JS: maths says "undefined"`,
    },
    visualLab: {
      type: 'abacus_place_value',
      title: '3D Counting Frame',
      instructions: 'Slide the number and watch the beads. Look out for rods with no beads: that is where the zero lives.',
      missionPrompt: 'Set the frame to 3007 and notice which rods need a zero.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Each column is ten times the next',
        formula: '205 = 2 \\times 100 + 0 \\times 10 + 5 \\times 1',
        explanation:
          'Read a number right to left: ones, tens, hundreds, thousands. The 0 does not add anything, but it holds the 2 in the hundreds column.',
      },
      {
        title: '2. Zero as a number',
        formula: 'a + 0 = a \\qquad a - a = 0 \\qquad a \\times 0 = 0',
        explanation:
          'Brahmagupta’s rules: zero is the balance point between having and owing, the result of taking something away from itself.',
      },
      {
        title: '3. You cannot divide by zero',
        formula: '\\frac{6}{2} = 3 \\text{ because } 3 \\times 2 = 6, \\qquad \\frac{6}{0} = ? \\text{ because } ? \\times 0 = 6 \\text{ has no answer}',
        explanation:
          'Division asks "what times this gives that?". Nothing times 0 gives 6, so 6 ÷ 0 is undefined. Even Brahmagupta got 0 ÷ 0 wrong (he said it was 0).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n003-d1',
          question: 'In the number 3,047, what does the 0 tell you?',
          options: ['There are no hundreds', 'There are no tens', 'The number is small', 'Nothing at all'],
          correctIndex: 0,
          hint1: 'Count columns from the right: ones, tens, hundreds, thousands.',
          hint2: 'The 0 is in the third column from the right.',
          explanation: '3,047 = 3 thousands, 0 hundreds, 4 tens, 7 ones. The 0 says the hundreds column is empty.',
        },
        {
          id: 'n003-d2',
          question: 'Which number is 4 × 1000 + 6 × 10 + 2?',
          options: ['4,062', '462', '4,602', '40,602'],
          correctIndex: 0,
          hint1: 'There are no hundreds.',
          hint2: 'Thousands 4, hundreds 0, tens 6, ones 2.',
          explanation: '4 thousands, 0 hundreds, 6 tens, 2 ones = 4,062.',
        },
        {
          id: 'n003-d3',
          question: 'Why is 8 ÷ 0 undefined?',
          options: [
            'No number times 0 gives 8',
            'Because the answer is 0',
            'Because the answer is 8',
            'Because zero was invented late',
          ],
          correctIndex: 0,
          hint1: 'Division is the reverse of multiplication.',
          hint2: 'What number × 0 = 8?',
          explanation: '8 ÷ 0 would need a number that gives 8 when multiplied by 0. Anything × 0 = 0, so there is no such number.',
        },
      ],
      bossProblem: {
        title: 'Lab Notebook Mix-up',
        scenario:
          'A steel bar weighs 2.05 kg. A technician writes the mass in grams but forgets the zero, recording "2 5 g". Which value should have been written?',
        options: ['2,050 g', '205 g', '250 g', '25 g'],
        correctIndex: 0,
        hint: '1 kg = 1,000 g. Multiply 2.05 by 1,000.',
        explanation: '2.05 kg × 1,000 = 2,050 g. Without the zeros the record is useless: placeholders matter.',
      },
    },
  }),

  // ------------------------------------------------------------------ 4
  base('num-004', 'NUM 04', 'math', {
    title: 'Addition & Subtraction: Counting Boards, Carrying & Borrowing',
    subtitle: 'Why "carry the 1" is just trading ten ones for one ten',
    overtimeDigest: [
      'Adding is combining two collections; subtracting is taking some away (or finding the difference).',
      'When a column reaches ten, trade ten ones for one ten: that is carrying. Borrowing is the same trade in reverse.',
      'The + and − signs first appeared in print in 1489; the = sign in 1557.',
    ],
    history: {
      era: 'c. 300 BC Salamis → Roman counting boards → 1489 Leipzig → 1557 Wales',
      protagonist: 'Counting-board users, Johannes Widmann & Robert Recorde',
      hook: 'Where do the words "calculate" and "carry" come from?',
      narrative: [
        'For most of history, people added on a counting board: a table ruled into columns with pebbles moved between them. The Salamis tablet, a marble board from around 300 BC, survives in Athens. The Latin word for pebble is calculus, which is where "calculate" comes from. When a column filled up with ten pebbles you cleared them and carried one pebble to the next column, a physical carry.',
        'China used counting rods and, later, the bead abacus (suanpan); Japan the soroban. Skilled abacus users are still faster than people with calculators for addition. On paper, Hindu-Arabic numerals let you do the same trades with pen and ink, which is the column method you learned in school.',
        'The symbols came surprisingly late. Johannes Widmann used + and − in a 1489 arithmetic book, originally to mark surplus and shortfall in warehouse stock. In 1557 the Welsh mathematician Robert Recorde introduced =, explaining that he chose two parallel lines because "no two things can be more equal".',
      ],
      takeaway:
        'Every written method for addition and subtraction is a record of trading between place-value columns: ten of these for one of those.',
    },
    csBridge: {
      concept: 'Ripple-Carry Adders',
      analogy:
        'A CPU adds numbers column by column exactly like you do on paper, just in base 2. Each bit position outputs a sum bit and a carry into the next position.',
      codeSnippet: `function addDigits(a, b) {           // a, b: arrays of digits, ones first
  const out = []; let carry = 0;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const s = (a[i] ?? 0) + (b[i] ?? 0) + carry;
    out.push(s % 10);                // keep the ones
    carry = Math.floor(s / 10);      // trade ten for one in the next column
  }
  if (carry) out.push(carry);
  return out;
}
addDigits([7, 2], [5, 1]);  // [2, 4] → 42`,
    },
    visualLab: {
      type: 'base_ten_addition',
      title: 'Base-Ten Blocks: Carrying & Borrowing',
      instructions: 'Lay out two numbers as rods (tens) and squares (ones), combine them, then trade ten ones for a ten.',
      missionPrompt: 'Work out 38 + 46 all the way to the carry.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Add column by column',
        formula: '27 + 15 = (20 + 10) + (7 + 5) = 30 + 12',
        explanation:
          'Add the tens together and the ones together. Order does not matter: a + b = b + a, and (a + b) + c = a + (b + c).',
      },
      {
        title: '2. Carry: trade ten ones for one ten',
        formula: '30 + 12 = 30 + 10 + 2 = 42',
        explanation:
          'A column can only hold 0–9. Twelve ones become one ten (carried left) and two ones.',
      },
      {
        title: '3. Borrow: trade one ten for ten ones',
        formula: '52 - 27 = (40 + 12) - (20 + 7) = 20 + 5 = 25',
        explanation:
          'You cannot take 7 ones from 2 ones, so break one of the tens into ten ones first. That is all "borrowing" means.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n004-d1',
          question: 'What is 47 + 38?',
          options: ['85', '75', '715', '95'],
          correctIndex: 0,
          hint1: 'Ones: 7 + 8 = 15. That needs a carry.',
          hint2: 'Tens: 4 + 3 + 1 (carried) = 8.',
          explanation: '7 + 8 = 15 → write 5, carry 1. 4 + 3 + 1 = 8. Answer 85.',
        },
        {
          id: 'n004-d2',
          question: 'What is 503 − 267?',
          options: ['236', '346', '246', '336'],
          correctIndex: 0,
          hint1: 'You need to borrow, and the tens column is empty.',
          hint2: 'Rewrite 503 as 4 hundreds, 9 tens, 13 ones.',
          explanation: '503 = 400 + 90 + 13. Subtract 200 + 60 + 7: 200 + 30 + 6 = 236.',
        },
        {
          id: 'n004-d3',
          question: 'Which statement is always true for any numbers a and b?',
          options: ['a + b = b + a', 'a − b = b − a', 'a − b is never 0', 'a + b > a'],
          correctIndex: 0,
          hint1: 'Try swapping the numbers in each.',
          hint2: '5 − 3 is not 3 − 5.',
          explanation: 'Addition is commutative: order never matters. Subtraction is not commutative.',
        },
      ],
      bossProblem: {
        title: 'Casting Bronze',
        scenario:
          'A crucible holds 1,248 g of copper. You add 376 g of tin to make bronze, then skim off 85 g of dross (oxidised scum). What is the mass of bronze left?',
        options: ['1,539 g', '1,624 g', '1,709 g', '1,449 g'],
        correctIndex: 0,
        hint: 'Add the metals, then subtract the dross.',
        explanation: '1,248 + 376 = 1,624 g. 1,624 − 85 = 1,539 g.',
      },
    },
  }),

  // ------------------------------------------------------------------ 5
  base('num-005', 'NUM 05', 'math', {
    title: 'Multiplication & Division: Doubling, Areas & Sharing',
    subtitle: 'From the Egyptian doubling trick to long division',
    overtimeDigest: [
      'Multiplication is repeated addition, and a × b is the area of an a-by-b rectangle.',
      'Splitting a rectangle into tens and ones (the distributive law) is how every paper method works.',
      'Division undoes multiplication: 156 ÷ 12 asks "12 times what is 156?".',
    ],
    history: {
      era: 'c. 1550 BC Egypt → c. 305 BC China → 1491 Florence → 1631 England',
      protagonist: 'Ahmes the scribe, Warring-States scholars & William Oughtred',
      hook: 'How did Egyptians multiply when they only knew how to double?',
      narrative: [
        'The Rhind papyrus, copied by the scribe Ahmes around 1550 BC, shows how Egyptians multiplied. To find 13 × 6 they doubled 6 repeatedly (6, 12, 24, 48), noticed that 13 = 8 + 4 + 1, and added the matching rows: 48 + 24 + 6 = 78. They were, without knowing it, writing 13 in binary.',
        'The oldest known decimal multiplication table is on bamboo strips from China’s Warring States period, around 305 BC (the Tsinghua bamboo slips). Medieval Islamic and Indian mathematicians developed the grid (lattice) method, which Fibonacci brought to Europe. Long division as we know it appears in Filippo Calandri’s 1491 arithmetic textbook from Florence.',
        'The symbols are newer still. William Oughtred used × in 1631, and the ÷ sign (the obelus) was popularised by Johann Rahn in 1659. Before that, people wrote the operations out in words.',
      ],
      takeaway:
        'Multiplying is finding the area of a rectangle. Every method, Egyptian, grid or long multiplication, just splits that rectangle into easier pieces.',
    },
    csBridge: {
      concept: 'Shift-and-Add Multiplication',
      analogy:
        'Egyptian doubling is exactly how simple CPUs multiply: double (shift left) and add the rows where the multiplier has a 1 bit.',
      codeSnippet: `function egyptianMultiply(a, b) {
  let total = 0;
  while (a > 0) {
    if (a & 1) total += b;   // this row is part of a's binary form
    a >>= 1;                 // halve a
    b <<= 1;                 // double b
  }
  return total;
}
egyptianMultiply(13, 6); // 78`,
    },
    visualLab: {
      type: 'area_multiplication',
      title: 'Multiplication as Area',
      instructions: 'Set the width and height. Then split the rectangle into tens and ones to see why the paper methods work.',
      missionPrompt: 'Split 14 × 13 into four pieces and add them up.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. A rectangle of unit squares',
        formula: '4 \\times 3 = 3 + 3 + 3 + 3 = 12 = 3 \\times 4',
        explanation:
          'Four columns of three is the same rectangle as three rows of four, so a × b = b × a.',
      },
      {
        title: '2. Split to make it easy (distributive law)',
        formula: '13 \\times 12 = (10 + 3)(10 + 2) = 100 + 20 + 30 + 6 = 156',
        explanation:
          'Break each side into tens and ones. The four smaller rectangles are easy, and together they cover the whole.',
      },
      {
        title: '3. Division undoes multiplication',
        formula: '156 \\div 12 = 13 \\iff 13 \\times 12 = 156 \\qquad 17 \\div 5 = 3 \\text{ remainder } 2',
        explanation:
          'Division asks how many equal groups fit. If they do not fit exactly, the leftover is the remainder (later you will write it as a fraction or decimal).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n005-d1',
          question: 'What is 23 × 14?',
          options: ['322', '312', '292', '332'],
          correctIndex: 0,
          hint1: 'Split: (20 + 3) × (10 + 4).',
          hint2: '200 + 80 + 30 + 12.',
          explanation: '20×10 + 20×4 + 3×10 + 3×4 = 200 + 80 + 30 + 12 = 322.',
        },
        {
          id: 'n005-d2',
          question: 'Use Egyptian doubling for 11 × 7. Which rows do you add?',
          options: ['7 + 14 + 56', '7 + 28 + 56', '14 + 28 + 56', '7 + 14 + 28'],
          correctIndex: 0,
          hint1: 'Doubling 7 gives 7, 14, 28, 56 (for 1, 2, 4, 8).',
          hint2: '11 = 8 + 2 + 1.',
          explanation: '11 = 8 + 2 + 1, so add the rows for 1, 2 and 8: 7 + 14 + 56 = 77.',
        },
        {
          id: 'n005-d3',
          question: 'What is 100 ÷ 8?',
          options: ['12 remainder 4', '12 remainder 2', '13 remainder 4', '11 remainder 12'],
          correctIndex: 0,
          hint1: '8 × 12 = 96.',
          hint2: '100 − 96 = ?',
          explanation: '8 × 12 = 96, and 100 − 96 = 4 left over.',
        },
      ],
      bossProblem: {
        title: 'Cutting Steel Tiles',
        scenario:
          'A steel plate measures 24 cm by 15 cm. A laser cutter splits it into identical tiles 3 cm by 5 cm with no waste. How many tiles do you get?',
        options: ['24', '20', '30', '18'],
        correctIndex: 0,
        hint: 'Compare areas, or count how many tiles fit along each side.',
        explanation: 'Plate area 24 × 15 = 360 cm²; tile area 3 × 5 = 15 cm². 360 ÷ 15 = 24 (8 tiles along one side × 3 along the other).',
      },
    },
  }),

  // ------------------------------------------------------------------ 6
  base('num-006', 'NUM 06', 'math', {
    title: 'Primes & Factors: The Atoms of Arithmetic',
    subtitle: 'Euclid, Eratosthenes, and why every number has a unique prime fingerprint',
    overtimeDigest: [
      'A prime has exactly two factors: 1 and itself. 2, 3, 5, 7, 11, 13, …',
      'Every whole number above 1 is a product of primes in exactly one way (60 = 2 × 2 × 3 × 5).',
      'Common factors and multiples (GCD and LCM) are what you need to simplify and add fractions.',
    ],
    history: {
      era: 'c. 300 BC Alexandria → c. 240 BC Eratosthenes → 1801 Gauss → 1977 RSA',
      protagonist: 'Euclid, Eratosthenes & Carl Friedrich Gauss',
      hook: 'Why does your bank depend on numbers a Greek proved infinite 2,300 years ago?',
      narrative: [
        'In Book IX of the Elements (around 300 BC), Euclid proved there is no largest prime. Suppose you had a complete list; multiply them all and add 1. The new number leaves remainder 1 when divided by every prime on your list, so either it is prime itself or it has a prime factor you missed. Either way, the list was not complete.',
        'Eratosthenes of Cyrene, librarian at Alexandria (and the man who measured the Earth’s circumference), gave a mechanical way to find primes: list the numbers, cross out every multiple of 2, then of 3, then of 5, and so on. Whatever survives is prime. It is still taught, and still used, today.',
        'Euclid also knew that numbers break into primes; Gauss stated the full "fundamental theorem of arithmetic" in 1801: the prime factorisation is unique. In 1977 Rivest, Shamir and Adleman built RSA encryption on a simple fact: multiplying two huge primes is easy, but recovering them from the product is extraordinarily hard.',
      ],
      takeaway:
        'Primes are to numbers what elements are to chemistry: everything is built from them, in exactly one way.',
    },
    csBridge: {
      concept: 'Sieves, GCD & Public-Key Cryptography',
      analogy:
        'The sieve of Eratosthenes is a classic boolean-array algorithm. Euclid’s GCD algorithm is one of the oldest algorithms still in daily use.',
      codeSnippet: `function sieve(n) {
  const isPrime = Array(n + 1).fill(true); isPrime[0] = isPrime[1] = false;
  for (let p = 2; p * p <= n; p++)
    if (isPrime[p]) for (let m = p * p; m <= n; m += p) isPrime[m] = false;
  return isPrime.flatMap((ok, i) => (ok ? [i] : []));
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);   // Euclid, c. 300 BC
const lcm = (a, b) => (a / gcd(a, b)) * b;
lcm(6, 8); // 24`,
    },
    visualLab: {
      type: 'prime_sieve',
      title: 'The Sieve of Eratosthenes',
      instructions: 'Cross out multiples one prime at a time and watch the primes survive. Pick any number to see its prime factors.',
      missionPrompt: 'Finish the sieve, then factor 84.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. What makes a prime',
        formula: '7: \\text{ factors } \\{1, 7\\} \\;(\\text{prime}) \\qquad 12: \\text{ factors } \\{1,2,3,4,6,12\\} \\;(\\text{composite})',
        explanation: 'A prime cannot be split into a product of smaller whole numbers. 1 is not prime: it has only one factor.',
      },
      {
        title: '2. Every number’s unique fingerprint',
        formula: '60 = 2^2 \\times 3 \\times 5 \\qquad 84 = 2^2 \\times 3 \\times 7',
        explanation: 'Keep dividing by the smallest prime that fits. You always end up with the same primes, whatever order you try.',
      },
      {
        title: '3. Greatest common factor & least common multiple',
        formula: '\\gcd(60, 84) = 2^2 \\times 3 = 12 \\qquad \\text{lcm}(6, 8) = 2^3 \\times 3 = 24',
        explanation:
          'Shared primes give the GCD (used to simplify fractions). Taking each prime’s highest power gives the LCM (the common denominator for adding fractions, next lesson).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n006-d1',
          question: 'Which of these is prime?',
          options: ['59', '51', '57', '91'],
          correctIndex: 0,
          hint1: 'Test divisibility by 3 (digit sum) and by 7.',
          hint2: '51 = 3 × 17, 57 = 3 × 19, 91 = 7 × 13.',
          explanation: '59 has no factors other than 1 and 59. The others are 3 × 17, 3 × 19 and 7 × 13.',
        },
        {
          id: 'n006-d2',
          question: 'What is the prime factorisation of 84?',
          options: ['2² × 3 × 7', '2 × 42', '4 × 21', '2 × 3 × 14'],
          correctIndex: 0,
          hint1: 'Every factor in the answer must be prime.',
          hint2: '84 → 42 → 21 → 7, dividing by 2, 2, 3.',
          explanation: '84 = 2 × 2 × 3 × 7 = 2² × 3 × 7. The other options contain non-primes (42, 4, 21, 14).',
        },
        {
          id: 'n006-d3',
          question: 'What is the least common multiple of 6 and 8?',
          options: ['24', '48', '14', '2'],
          correctIndex: 0,
          hint1: '6 = 2 × 3 and 8 = 2³.',
          hint2: 'Take the highest power of each prime: 2³ × 3.',
          explanation: 'lcm(6, 8) = 2³ × 3 = 24. (48 is a common multiple, but not the least.)',
        },
      ],
      bossProblem: {
        title: 'Rolling-Mill Gears',
        scenario:
          'Two meshing gears in a rolling mill have 12 and 18 teeth. You mark the pair of teeth that are touching. How many teeth must pass before those same two teeth meet again?',
        options: ['36', '216', '6', '72'],
        correctIndex: 0,
        hint: 'You need a number of teeth that is a multiple of both 12 and 18.',
        explanation: 'The marks line up again after lcm(12, 18) teeth. 12 = 2² × 3, 18 = 2 × 3², so lcm = 2² × 3² = 36. Engineers often choose gear tooth counts with no common factor so wear spreads evenly.',
      },
    },
  }),

  // ------------------------------------------------------------------ 9
  base('num-007', 'NUM 07', 'math', {
    title: 'Decimals: Place Value Below One',
    subtitle: 'Simon Stevin’s little pamphlet that changed money, measurement and science',
    overtimeDigest: [
      'Decimals extend place value to the right of the point: tenths, hundredths, thousandths…',
      'Every fraction becomes a decimal by division. Some stop (3/8 = 0.375), some repeat forever (1/3 = 0.333…).',
      'Decimals made calculation with measurements easy, and led directly to the metric system.',
    ],
    history: {
      era: '3rd c. China → 1427 Samarkand → 1585 Flanders → 1617 Scotland',
      protagonist: 'Liu Hui, Jamshīd al-Kāshī & Simon Stevin',
      hook: 'Why does a petrol price have three digits after the point?',
      narrative: [
        'Chinese mathematicians such as Liu Hui (3rd century) already wrote lengths in decimal subdivisions, and in 1427 the astronomer al-Kāshī in Samarkand used decimal fractions to compute π correct to 16 digits, a record that stood for almost two centuries.',
        'Europe still worked with awkward fractions like 17/64 until 1585, when the Flemish engineer Simon Stevin published a 36-page booklet called De Thiende ("The Tenth"). He showed that by dividing everything into tenths, hundredths and thousandths, merchants, surveyors and gunners could calculate with fractions as easily as with whole numbers. He even urged governments to decimalise coins and measures.',
        'Stevin’s notation was clumsy (he circled the place number above each digit). John Napier popularised the decimal point itself in 1617. Two centuries later the French revolutionaries took Stevin’s advice and built the metric system on powers of ten.',
      ],
      takeaway:
        'A decimal is just a fraction whose denominator is a power of ten. Writing it with a point lets you add, compare and multiply measurements without ever finding a common denominator.',
    },
    csBridge: {
      concept: 'Fixed-Point vs Floating-Point',
      analogy:
        'Computers store most decimals in binary, where 0.1 repeats forever. That is why 0.1 + 0.2 !== 0.3 in JavaScript, and why money is stored in whole cents.',
      codeSnippet: `0.1 + 0.2;                 // 0.30000000000000004 (binary can't store 1/10 exactly)
(10 + 20) / 100;           // 0.3  (work in hundredths, then divide)
(3 / 8).toString();        // "0.375"  (terminates: 8 = 2³)
(1 / 3).toFixed(6);        // "0.333333" (repeats forever)`,
    },
    visualLab: {
      type: 'decimal_zoom',
      title: 'Zooming into the Number Line',
      instructions: 'Pick a number between 0 and 1, then zoom: each level splits the highlighted piece into ten.',
      missionPrompt: 'Zoom three levels deep on 0.625.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Columns keep going to the right',
        formula: '0.375 = \\frac{3}{10} + \\frac{7}{100} + \\frac{5}{1000}',
        explanation: 'Each place to the right of the point is worth one tenth of the place before it.',
      },
      {
        title: '2. Fraction to decimal: just divide',
        formula: '\\frac{3}{8} = 3 \\div 8 = 0.375 \\qquad \\frac{1}{3} = 0.333\\ldots = 0.\\overline{3}',
        explanation:
          'If the denominator only has the primes 2 and 5 (the factors of 10), the decimal stops. Otherwise it repeats forever.',
      },
      {
        title: '3. Compare by lining up the point',
        formula: '0.5 = 0.500 \\; > \\; 0.450 \\; > \\; 0.405 \\; > \\; 0.054',
        explanation: 'Pad with zeros so every number has the same number of decimal places, then compare digit by digit from the left.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n007-d1',
          question: 'What is 0.07 as a fraction?',
          options: ['7/100', '7/10', '7/1000', '70/100'],
          correctIndex: 0,
          hint1: 'Which column is the 7 in?',
          hint2: 'Tenths, hundredths, …',
          explanation: 'The 7 is in the hundredths place, so 0.07 = 7/100.',
        },
        {
          id: 'n007-d2',
          question: 'Write 5/8 as a decimal.',
          options: ['0.625', '0.58', '0.875', '1.6'],
          correctIndex: 0,
          hint1: 'Divide 5 by 8.',
          hint2: '1/8 = 0.125. Multiply by 5.',
          explanation: '5 ÷ 8 = 0.625.',
        },
        {
          id: 'n007-d3',
          question: 'Which is the largest?',
          options: ['0.5', '0.45', '0.405', '0.054'],
          correctIndex: 0,
          hint1: 'Pad them all to three decimal places.',
          hint2: '0.500, 0.450, 0.405, 0.054.',
          explanation: '0.500 is the biggest. More digits does not mean bigger.',
        },
      ],
      bossProblem: {
        title: 'Carbon Content Spec',
        scenario:
          'A steel specification calls for a carbon content between 0.25% and 0.30%. Three samples measure 0.31%, 0.275% and 0.205%. Which one passes?',
        options: ['0.275%', '0.31%', '0.205%', 'None of them'],
        correctIndex: 0,
        hint: 'Pad to three decimal places: the window is 0.250 to 0.300.',
        explanation: '0.310 is above 0.300, 0.205 is below 0.250, and 0.275 sits inside. Tiny decimal differences in carbon change steel’s hardness a lot.',
      },
    },
  }),

  // ------------------------------------------------------------------ 10
  base('num-008', 'NUM 08', 'math', {
    title: 'Irrational & Real Numbers: The Gaps Between Fractions',
    subtitle: 'The diagonal of a square that no fraction can measure',
    overtimeDigest: [
      'Some lengths, like √2 (the diagonal of a unit square), cannot be written as any fraction p/q.',
      'Their decimals never end and never repeat. π and e are irrational too.',
      'Rational + irrational numbers together fill the number line with no gaps: the real numbers.',
    ],
    history: {
      era: 'c. 500 BC Croton → c. 300 BC Euclid → 1761 Lambert → 1872 Dedekind',
      protagonist: 'Hippasus of Metapontum, Euclid & Richard Dedekind',
      hook: 'Was a man really thrown into the sea for proving a number exists?',
      narrative: [
        'The Pythagoreans of southern Italy believed "all is number": every length, every musical harmony, could be expressed as a ratio of whole numbers. Then one of them, traditionally Hippasus, showed that the diagonal of a square is incommensurable with its side. No fraction, however fine, measures both. A later legend says he was drowned for revealing it; that story is probably invented, but it captures how shocking the idea was.',
        'Euclid’s Elements contains the classic proof, a gem of reasoning by contradiction (step 2 below). Eudoxus built a careful theory of ratios that worked even for such lengths, and Greek geometry carried on with it for 2,000 years. In 1761 Johann Lambert proved π is irrational too.',
        'What exactly is a real number, though? In 1872 Richard Dedekind gave the modern answer: a real number is a "cut" that splits all fractions into those below it and those above it. √2 is the cut between fractions whose square is less than 2 and those whose square is more. With this, the number line finally has no holes, and calculus could be made rigorous.',
      ],
      takeaway:
        'Fractions are dense (there is always another one between any two) yet they still leave holes. The real numbers fill every hole.',
    },
    csBridge: {
      concept: 'Rational Arithmetic vs Floating-Point Approximation',
      analogy:
        'A float can only ever store a fraction with a power-of-two denominator, so Math.SQRT2 is a very good rational approximation, never √2 itself.',
      codeSnippet: `Math.SQRT2;                    // 1.4142135623730951  (a fraction in disguise)
Math.SQRT2 ** 2;               // 2.0000000000000004  (not exactly 2!)

// Best fractions for √2 come from the recurrence p/q → (p + 2q)/(p + q)
let [p, q] = [1, 1];
for (let i = 0; i < 5; i++) [p, q] = [p + 2 * q, p + q];
p / q;                         // 1.4142135... (239/169)`,
    },
    visualLab: {
      type: 'irrational_sqrt2',
      title: 'Swinging √2 onto the Number Line',
      instructions: 'Draw the diagonal, swing it onto the line, then crowd the line with fractions.',
      missionPrompt: 'Swing the diagonal onto the line and crowd it with fractions up to 40.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. The diagonal of a unit square',
        formula: 'd^2 = 1^2 + 1^2 = 2 \\quad\\Rightarrow\\quad d = \\sqrt{2} \\approx 1.41421356\\ldots',
        explanation: 'Pythagoras gives the length exactly: the number whose square is 2.',
      },
      {
        title: '2. Why √2 is not a fraction',
        formula: '\\sqrt{2} = \\tfrac{p}{q} \\Rightarrow p^2 = 2q^2 \\Rightarrow p \\text{ even} \\Rightarrow q \\text{ even} \\;\\;\\text{(contradiction)}',
        explanation:
          'Assume √2 = p/q in lowest terms. Then p² is even, so p is even; write p = 2k and you get q² = 2k², so q is even too. But lowest terms means p and q can’t both be even. The assumption must be false.',
      },
      {
        title: '3. The real number line',
        formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\qquad \\mathbb{R} = \\mathbb{Q} \\cup \\{\\text{irrationals}\\}',
        explanation:
          'Naturals, then integers (with negatives), then rationals (fractions), then reals (everything on the line). Rational decimals stop or repeat; irrational ones never do.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n008-d1',
          question: 'Which number is irrational?',
          options: ['√5', '√9', '0.25', '22/7'],
          correctIndex: 0,
          hint1: '√9 is a whole number.',
          hint2: '22/7 is a fraction, so it is rational (it only approximates π).',
          explanation: '√5 is not a perfect square, so its square root is irrational. √9 = 3, 0.25 = 1/4 and 22/7 are all rational.',
        },
        {
          id: 'n008-d2',
          question: 'Between which two decimals does √2 lie?',
          options: ['1.41 and 1.42', '1.4 and 1.41', '1.42 and 1.43', '1.5 and 1.6'],
          correctIndex: 0,
          hint1: 'Square the candidates.',
          hint2: '1.41² = 1.9881 and 1.42² = 2.0164.',
          explanation: '1.41² < 2 < 1.42², so 1.41 < √2 < 1.42.',
        },
        {
          id: 'n008-d3',
          question: 'Which describes the decimal of a rational number?',
          options: ['It stops or repeats', 'It never stops and never repeats', 'It always stops', 'It always repeats'],
          correctIndex: 0,
          hint1: 'Think of 3/8 and 1/3.',
          hint2: '0.375 stops; 0.333… repeats.',
          explanation: 'Rationals give terminating or repeating decimals. Irrationals give decimals that never end or repeat.',
        },
      ],
      bossProblem: {
        title: 'Cutting a Square Plate',
        scenario:
          'You need a square aluminium plate with an area of exactly 50 cm². What side length should you set on the cutter, to 2 decimal places?',
        options: ['7.07 cm', '25.00 cm', '7.50 cm', '12.50 cm'],
        correctIndex: 0,
        hint: 'Area of a square = side². So side = √area.',
        explanation: '√50 = 5√2 ≈ 7.07 cm. The exact side is irrational, so any real cut is an approximation: that is why engineers specify tolerances.',
      },
    },
  }),

  // ------------------------------------------------------------------ 12
  base('geo-001', 'GEO 01', 'math', {
    title: 'Euclid & Pythagoras: Proving Things About Shapes',
    subtitle: 'Right triangles, areas, and the idea of proof itself',
    overtimeDigest: [
      'In a right triangle, the squares on the two shorter sides add up to the square on the longest: a² + b² = c².',
      'Babylonians knew number triples like (3, 4, 5) 1,200 years before Pythagoras; the Greeks proved why it always works.',
      'Euclid’s Elements built all of geometry from five simple assumptions. It was used as a textbook for over 2,000 years.',
    ],
    history: {
      era: 'c. 1800 BC Babylon → c. 530 BC Croton → c. 300 BC Alexandria',
      protagonist: 'Babylonian scribes, Pythagoras & Euclid',
      hook: 'Why is a 2,300-year-old geometry book the second most-printed book in history?',
      narrative: [
        'A Babylonian clay tablet known as Plimpton 322 (around 1800 BC) lists 15 rows of numbers that turn out to be the sides of right triangles, such as 119, 120 and 169. Whoever wrote it knew that the squares on the legs add up to the square on the long side, at least for these special cases.',
        'Pythagoras of Samos (around 570–495 BC) founded a school in southern Italy. His followers are credited with proving the rule holds for every right triangle, not just ones that happen to work. That shift, from "it works for these" to "it must always work, and here is why", is the birth of mathematical proof.',
        'Around 300 BC in Alexandria, Euclid collected Greek geometry into the thirteen books of the Elements. He started from five postulates (for example: a straight line can be drawn between any two points) and deduced hundreds of theorems step by step. Proposition 47 of Book I is the Pythagorean theorem. The Elements was printed in more editions than any book except the Bible, and Abraham Lincoln studied it to learn how to argue.',
      ],
      takeaway:
        'a² + b² = c² links lengths to areas. You will use it for diagonals, distances, forces, vectors and crystal geometry for the rest of this course.',
    },
    csBridge: {
      concept: 'Euclidean Distance',
      analogy:
        'Every distance function you have written, from collision detection to k-nearest-neighbours, is the Pythagorean theorem.',
      codeSnippet: `const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
dist(0, 0, 3, 4);      // 5

// in 3D, apply it twice: √(dx² + dy² + dz²)
Math.hypot(1, 1, 1);   // 1.732… = √3, the body diagonal of a unit cube`,
    },
    visualLab: {
      type: 'pythagoras_squares',
      title: 'Squares on the Sides',
      instructions: 'Change the two legs and count the unit squares. The two smaller squares always fill the big one.',
      missionPrompt: 'Find another whole-number triple besides 3, 4, 5.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Area of rectangles and triangles',
        formula: 'A_{\\text{rect}} = b \\times h \\qquad A_{\\triangle} = \\tfrac{1}{2}\\, b \\times h',
        explanation: 'A triangle is half of a rectangle with the same base and height. Areas are measured in square units.',
      },
      {
        title: '2. The Pythagorean theorem',
        formula: 'a^2 + b^2 = c^2 \\qquad 3^2 + 4^2 = 9 + 16 = 25 = 5^2',
        explanation: 'Only for right triangles, and c is always the side opposite the right angle (the hypotenuse).',
      },
      {
        title: '3. Angles in a triangle',
        formula: '\\alpha + \\beta + \\gamma = 180^\\circ',
        explanation: 'Euclid proved this from his parallel postulate. In a right triangle, the other two angles therefore add to 90°.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'g001-d1',
          question: 'A right triangle has legs 6 and 8. How long is the hypotenuse?',
          options: ['10', '14', '48', '√14'],
          correctIndex: 0,
          hint1: 'c² = 6² + 8².',
          hint2: '36 + 64 = 100.',
          explanation: 'c² = 36 + 64 = 100, so c = 10. (It is the 3-4-5 triangle doubled.)',
        },
        {
          id: 'g001-d2',
          question: 'A right triangle has hypotenuse 13 and one leg 5. What is the other leg?',
          options: ['12', '8', '18', '√194'],
          correctIndex: 0,
          hint1: 'b² = c² − a².',
          hint2: '169 − 25 = 144.',
          explanation: 'b² = 13² − 5² = 169 − 25 = 144, so b = 12.',
        },
        {
          id: 'g001-d3',
          question: 'Two angles of a triangle are 50° and 60°. What is the third?',
          options: ['70°', '90°', '110°', '80°'],
          correctIndex: 0,
          hint1: 'All three add to 180°.',
          hint2: '180 − 50 − 60.',
          explanation: '180° − 50° − 60° = 70°.',
        },
      ],
      bossProblem: {
        title: 'Bracing a Steel Frame',
        scenario:
          'A rectangular steel frame is 2.0 m wide and 1.5 m tall. To stop it racking, you weld a straight brace from one corner to the opposite corner. How long must the brace be?',
        options: ['2.5 m', '3.5 m', '1.75 m', '3.0 m'],
        correctIndex: 0,
        hint: 'The brace is the hypotenuse of a right triangle with legs 2.0 and 1.5.',
        explanation: '√(2.0² + 1.5²) = √(4 + 2.25) = √6.25 = 2.5 m. Triangulated frames are rigid; rectangles are not.',
      },
    },
  }),

  // ------------------------------------------------------------------ 15
  base('geo-002', 'GEO 02', 'math', {
    title: 'Trigonometry: Measuring the Sky with Triangles',
    subtitle: 'From star charts to the sine wave, and how a mistranslation named it',
    overtimeDigest: [
      'In a right triangle, sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.',
      'On a circle of radius 1, (cos θ, sin θ) is the point at angle θ. Unrolled, sin θ traces a wave.',
      'Angles can be measured in degrees (360 per turn) or radians (2π per turn).',
    ],
    history: {
      era: 'c. 140 BC Rhodes → 499 AD India → 9th c. Baghdad → 1748 Euler',
      protagonist: 'Hipparchus, Aryabhata & Leonhard Euler',
      hook: 'Why is it called "sine", a word that means "bay" or "fold"?',
      narrative: [
        'Hipparchus of Rhodes (around 140 BC), often called the father of trigonometry, built the first known table of chords: for each angle in a circle, the length of the straight line joining its ends. With it he could turn angle measurements of the Sun and Moon into distances and predict eclipses. Ptolemy’s Almagest (about 150 AD) extended his tables and was the astronomy textbook for 1,400 years.',
        'Indian astronomers made the key simplification. Aryabhata (499 AD) tabulated the half-chord, which is exactly our sine. He called it jyā-ardha ("half bowstring"), shortened to jyā. Arabic scholars wrote it as jiba; written Arabic omits vowels, and later Latin translators misread it as jaib, "bay" or "fold", and translated that into Latin: sinus. Hence "sine".',
        'Islamic mathematicians such as al-Battānī developed all six functions, and in 1748 Leonhard Euler gave the modern view: sine and cosine are the coordinates of a point moving round a circle of radius 1. That turned trigonometry from triangle-solving into the mathematics of anything that repeats: sound, light, alternating current and atomic vibrations.',
      ],
      takeaway:
        'Trigonometry turns angles into lengths. You will need it for forces on slopes, X-ray diffraction in crystals (Bragg’s law) and every wave.',
    },
    csBridge: {
      concept: 'Rotation & Animation',
      analogy:
        'Every time you rotate a sprite or move something in a circle, you are using (cos θ, sin θ). Note that Math.sin expects radians, not degrees.',
      codeSnippet: `const toRad = (deg) => (deg * Math.PI) / 180;
Math.sin(toRad(30));               // 0.5 (well, 0.49999999999999994)

// point on a circle of radius r at angle θ
const orbit = (r, deg) => [r * Math.cos(toRad(deg)), r * Math.sin(toRad(deg))];
orbit(1, 90);                      // [0, 1] (approximately)`,
    },
    visualLab: {
      type: 'trig_unit_circle',
      title: 'The Unit Circle Unrolls into a Wave',
      instructions: 'Turn the angle and watch the height (sin) and sideways distance (cos). The wave on the right records the height.',
      missionPrompt: 'Find the angle between 0° and 180° where sin θ = ½ again (not 30°).',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. SOH-CAH-TOA',
        formula: '\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}} \\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}} \\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}',
        explanation: 'For a right triangle, these ratios depend only on the angle, not on how big the triangle is.',
      },
      {
        title: '2. The unit circle',
        formula: 'P(\\theta) = (\\cos\\theta,\\, \\sin\\theta) \\qquad \\sin^2\\theta + \\cos^2\\theta = 1',
        explanation: 'Put the hypotenuse on a circle of radius 1. Pythagoras immediately gives sin² + cos² = 1 for every angle.',
      },
      {
        title: '3. Radians',
        formula: '360^\\circ = 2\\pi \\text{ rad} \\qquad 180^\\circ = \\pi \\text{ rad} \\qquad 1 \\text{ rad} \\approx 57.3^\\circ',
        explanation: 'A radian is the angle whose arc on the unit circle has length 1. Calculus formulas only work cleanly in radians.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'g002-d1',
          question: 'What is sin 30°?',
          options: ['1/2', '√3/2', '1', '0'],
          correctIndex: 0,
          hint1: 'Half of an equilateral triangle has angles 30°, 60°, 90°.',
          hint2: 'The side opposite 30° is half the hypotenuse.',
          explanation: 'In a 30-60-90 triangle the side opposite 30° is half the hypotenuse, so sin 30° = 1/2.',
        },
        {
          id: 'g002-d2',
          question: 'A ramp 10 m long rises at 30° to the ground. How high is the top?',
          options: ['5 m', '8.66 m', '10 m', '20 m'],
          correctIndex: 0,
          hint1: 'Height is opposite the angle; the ramp is the hypotenuse.',
          hint2: 'height = 10 × sin 30°.',
          explanation: 'height = 10 × sin 30° = 10 × 0.5 = 5 m.',
        },
        {
          id: 'g002-d3',
          question: 'What is 90° in radians?',
          options: ['π/2', 'π', '2π', 'π/4'],
          correctIndex: 0,
          hint1: '180° = π.',
          hint2: '90° is half of that.',
          explanation: '90° = 180°/2 = π/2 rad.',
        },
      ],
      bossProblem: {
        title: 'Preview: X-Ray Diffraction (Bragg’s Law)',
        scenario:
          'X-rays of wavelength λ = 0.154 nm reflect strongly off a crystal when nλ = 2d sin θ. You see the first reflection (n = 1) at θ = 30°. What is the spacing d between atomic planes?',
        options: ['0.154 nm', '0.077 nm', '0.308 nm', '0.267 nm'],
        correctIndex: 0,
        hint: 'Rearrange: d = nλ / (2 sin θ). And sin 30° = 0.5.',
        explanation: 'd = 1 × 0.154 / (2 × 0.5) = 0.154 nm. This is how the Braggs measured atomic spacings in 1913; you will meet it again in the crystals lesson.',
      },
    },
  }),

  // ------------------------------------------------------------------ 17
  base('num-009', 'NUM 09', 'math', {
    title: 'Complex Numbers: When √−1 Turned Out to Be Useful',
    subtitle: 'The "impossible" number that solves equations and runs electrical engineering',
    overtimeDigest: [
      'i is defined by i² = −1. A complex number is a + bi: a real part plus an imaginary part.',
      'Picture a + bi as a point (or arrow) on a plane. Multiplying by i rotates it 90°.',
      'Complex numbers were first accepted because they were needed to find real solutions of cubic equations.',
    ],
    history: {
      era: '1545 Milan → 1572 Bologna → 1637 Descartes → 1799–1831 Wessel, Argand & Gauss',
      protagonist: 'Gerolamo Cardano, Rafael Bombelli & Carl Friedrich Gauss',
      hook: 'Why would anyone use the square root of a negative number to find an answer that is perfectly normal?',
      narrative: [
        'In 1545 Gerolamo Cardano published Ars Magna, including a formula for solving cubic equations (found earlier by del Ferro and Tartaglia, who were furious it was published). The formula sometimes asked for square roots of negative numbers. Cardano called such quantities "as subtle as they are useless".',
        'In 1572 Rafael Bombelli looked at x³ = 15x + 4. The answer is plainly x = 4 (64 = 60 + 4), yet Cardano’s formula produced √−121 along the way. Bombelli boldly wrote down rules for calculating with these strange quantities and found that the imaginary parts cancelled, leaving exactly 4. Imaginary numbers were a working tool before anyone understood them. Descartes named them "imaginary" in 1637 as an insult.',
        'The picture came 250 years later. Caspar Wessel (1799), Jean-Robert Argand (1806) and Gauss (1831) independently drew complex numbers as points on a plane: real part across, imaginary part up. Multiplying by i is just a quarter turn, the "halfway" version of multiplying by −1. In the 1890s Charles Steinmetz used complex numbers to tame alternating-current circuits, and every electrical engineer since has done the same.',
      ],
      takeaway:
        'Each extension of number (negatives, fractions, reals, complex) was first rejected as absurd, then accepted because it solved real problems. Complex numbers are rotations and stretches, which is why they describe waves.',
    },
    csBridge: {
      concept: '2D Rotation without Matrices',
      analogy:
        'A complex number is a (re, im) pair with a multiply rule. Multiplying by cos θ + i sin θ rotates a point by θ, which is how many graphics engines and signal processors work.',
      codeSnippet: `const mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const i = [0, 1];
mul([2, 0], i);          // [0, 2]   → quarter turn
mul(i, i);               // [-1, 0]  → i² = −1
mul([2, 1], [1, 1]);     // [1, 3]   → (2 + i)(1 + i) = 1 + 3i`,
    },
    visualLab: {
      type: 'complex_plane',
      title: 'Multiplying Is Rotating',
      instructions: 'Set a complex number z = a + bi, then multiply it by −1, i or 1 + i and watch the arrow turn.',
      missionPrompt: 'Start from z = 1 and multiply by i. Then set z = i and multiply by i again.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Define i',
        formula: 'i^2 = -1 \\qquad i^3 = -i \\qquad i^4 = 1',
        explanation: 'Powers of i cycle every four steps: 1, i, −1, −i, 1, … just like four quarter turns make a full circle.',
      },
      {
        title: '2. Add and multiply',
        formula: '(2 + 3i) + (1 - i) = 3 + 2i \\qquad (1 + i)(1 - i) = 1 - i^2 = 2',
        explanation: 'Treat i like a variable, then replace every i² with −1.',
      },
      {
        title: '3. Every quadratic now has roots',
        formula: 'x^2 + 4 = 0 \\Rightarrow x = \\pm\\sqrt{-4} = \\pm 2i',
        explanation:
          'When the discriminant b² − 4ac is negative, the roots are complex. Gauss later proved every polynomial equation has roots in the complex numbers (the fundamental theorem of algebra).',
      },
    ],
    gate: {
      drills: [
        {
          id: 'n009-d1',
          question: 'What is i³?',
          options: ['−i', 'i', '−1', '1'],
          correctIndex: 0,
          hint1: 'i³ = i² × i.',
          hint2: 'i² = −1.',
          explanation: 'i³ = i² · i = (−1) · i = −i.',
        },
        {
          id: 'n009-d2',
          question: 'What is (2 + 3i) + (1 − i)?',
          options: ['3 + 2i', '3 + 4i', '1 + 4i', '2 − 3i'],
          correctIndex: 0,
          hint1: 'Add real parts and imaginary parts separately.',
          hint2: '2 + 1 and 3i − i.',
          explanation: '(2 + 1) + (3 − 1)i = 3 + 2i.',
        },
        {
          id: 'n009-d3',
          question: 'What is (1 + i)²?',
          options: ['2i', '2', '1 + i²', '0'],
          correctIndex: 0,
          hint1: 'Expand: (1 + i)(1 + i) = 1 + 2i + i².',
          hint2: 'i² = −1.',
          explanation: '1 + 2i + i² = 1 + 2i − 1 = 2i.',
        },
      ],
      bossProblem: {
        title: 'A Resonance Equation',
        scenario:
          'When modelling a vibrating steel beam with no damping you meet the equation r² + 4 = 0. What are its roots?',
        options: ['r = ±2i', 'r = ±2', 'r = −4', 'No roots exist'],
        correctIndex: 0,
        hint: 'r² = −4. What squares to −4?',
        explanation: 'r = ±√−4 = ±2i. Imaginary roots mean the beam oscillates (like sin 2t and cos 2t) instead of decaying: complex numbers are the language of vibration.',
      },
    },
  }),

  // ------------------------------------------------------------------ 20
  base('chem-000', 'CHEM 00', 'chem', {
    title: 'What Are Things Made Of? From Four Elements to Lavoisier',
    subtitle: 'How chemistry stopped being philosophy and started being measurement',
    overtimeDigest: [
      'For 2,000 years people believed everything was made of earth, water, air and fire.',
      'Lavoisier showed by careful weighing that mass is conserved and that water and air are not elements.',
      'An element is a substance that cannot be broken into simpler substances by chemical means.',
    ],
    history: {
      era: 'c. 450 BC Sicily → 8th c. alchemy → 1661 Boyle → 1789 Paris',
      protagonist: 'Empedocles, Robert Boyle, Antoine & Marie-Anne Lavoisier',
      hook: 'How did weighing things very carefully overturn 2,000 years of science?',
      narrative: [
        'Around 450 BC, Empedocles proposed that everything is a mixture of four "roots": earth, water, air and fire. Aristotle adopted the idea, and it ruled thinking about matter through the Middle Ages. Alchemists, from Jābir ibn Ḥayyān in 8th-century Iraq to medieval Europe, tried to transmute metals into gold. They failed, but they invented distillation, crystallisation and much of the lab glassware chemists still use.',
        'In 1661 Robert Boyle’s The Sceptical Chymist attacked the four elements and argued that an element should be defined by experiment: something that cannot be broken down further. But the real revolution was measurement. Antoine Lavoisier weighed everything before and after reactions, in sealed vessels, with balances accurate to fractions of a gram. His wife, Marie-Anne Paulze Lavoisier, translated papers, drew the apparatus and recorded the experiments.',
        'Lavoisier showed that burning is combining with a gas from the air, which he named oxygen, and that water is made of hydrogen and oxygen. His 1789 Traité élémentaire de chimie stated that in a reaction mass is neither created nor destroyed, and listed 33 elements (a couple, like "light" and "caloric", turned out to be wrong). In 1794, during the French Revolution, he was guillotined for his role as a tax collector. The mathematician Lagrange remarked that it took an instant to cut off that head, and a century might not produce another like it.',
      ],
      takeaway:
        'Chemistry became a science the moment people started measuring. Conservation of mass is the first law you use in every reaction calculation.',
    },
    csBridge: {
      concept: 'Invariants & Conservation',
      analogy:
        'Conservation of mass is a system invariant, like "the sum of all balances stays the same" in a ledger: a transaction moves value around but never creates or destroys it.',
      codeSnippet: `// A reaction is a transaction on atoms: totals must be preserved
const before = { H: 4, O: 2 };            // 2 H₂O
const after  = { H: 4, O: 2 };            // 2 H₂ + O₂
const conserved = Object.keys(before).every((k) => before[k] === after[k]);
console.assert(conserved, 'atoms appeared or vanished!');`,
    },
    visualLab: {
      type: 'electrolysis_water',
      title: 'Splitting Water',
      instructions: 'Run an electric current through water and collect the gas at each wire.',
      missionPrompt: 'Run the cell for 10 minutes and check the 2 : 1 ratio.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Element vs compound',
        formula: '\\text{Fe, O, H: elements} \\qquad \\text{H}_2\\text{O, NaCl: compounds}',
        explanation:
          'An element contains only one kind of atom and cannot be broken down chemically. A compound is two or more elements bonded in a fixed ratio.',
      },
      {
        title: '2. Conservation of mass',
        formula: 'm_{\\text{reactants}} = m_{\\text{products}} \\qquad 4\\text{ g H}_2 + 32\\text{ g O}_2 \\rightarrow 36\\text{ g H}_2\\text{O}',
        explanation:
          'In a closed system the total mass never changes. If something seems to gain weight when it burns, it took mass from the air.',
      },
      {
        title: '3. Water is not an element',
        formula: '2\\,\\text{H}_2\\text{O} \\rightarrow 2\\,\\text{H}_2 + \\text{O}_2 \\qquad V_{\\text{H}_2} : V_{\\text{O}_2} = 2 : 1',
        explanation:
          'Electrolysis splits water into twice as much hydrogen as oxygen by volume, which later helped Avogadro and others work out the formula H₂O.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'c000-d1',
          question: 'Which of these is an element?',
          options: ['Iron', 'Water', 'Table salt', 'Air'],
          correctIndex: 0,
          hint1: 'An element cannot be broken down chemically.',
          hint2: 'Water splits into H and O; salt into Na and Cl; air is a mixture.',
          explanation: 'Iron (Fe) is an element. Water and salt are compounds, and air is a mixture of gases.',
        },
        {
          id: 'c000-d2',
          question: '10 g of hydrogen reacts completely with 80 g of oxygen. What mass of water forms?',
          options: ['90 g', '70 g', '80 g', '800 g'],
          correctIndex: 0,
          hint1: 'Mass is conserved.',
          hint2: 'Add the masses of the reactants.',
          explanation: '10 g + 80 g = 90 g of water. Nothing is created or destroyed.',
        },
        {
          id: 'c000-d3',
          question: 'What did Lavoisier show that burning really is?',
          options: ['Combining with oxygen', 'Releasing phlogiston', 'Turning into fire', 'Losing mass'],
          correctIndex: 0,
          hint1: 'Metals get heavier when they burn.',
          hint2: 'They take something from the air.',
          explanation: 'Burning (combustion) is reaction with oxygen. The old "phlogiston" theory said something was released, but careful weighing showed mass is gained from the air.',
        },
      ],
      bossProblem: {
        title: 'Lavoisier’s Sealed Flask',
        scenario:
          'You seal 100 g of tin inside a glass flask full of air. The whole flask weighs 250 g. You heat it until the tin turns into white tin oxide weighing 127 g. What does the sealed flask weigh now?',
        options: ['250 g', '277 g', '223 g', '127 g'],
        correctIndex: 0,
        hint: 'Nothing got in or out of the sealed flask.',
        explanation: 'Still 250 g. The tin gained 27 g, but that oxygen came from the air already inside the flask, which lost exactly 27 g. This is precisely the experiment Lavoisier used.',
      },
    },
  }),

  // ------------------------------------------------------------------ 23
  base('chem-004', 'CHEM 04', 'chem', {
    title: 'The Periodic Table: Mendeleev’s Map of the Elements',
    subtitle: 'Sorting the elements, predicting missing ones, and what the rows and columns mean',
    overtimeDigest: [
      'Arrange elements by atomic number and their properties repeat in a regular pattern (periodicity).',
      'Mendeleev left gaps for undiscovered elements and predicted their properties. Gallium, scandium and germanium proved him right.',
      'Columns (groups) share outer-electron arrangements, so they behave alike. Atoms shrink across a row and grow down a column.',
    ],
    history: {
      era: '1829 Döbereiner → 1865 Newlands → 1869 St Petersburg → 1913 Moseley',
      protagonist: 'Dmitri Mendeleev & Henry Moseley',
      hook: 'How do you predict the properties of an element nobody has ever seen?',
      narrative: [
        'By the 1860s chemists knew about 60 elements and suspected hidden patterns. Johann Döbereiner noticed "triads" like lithium, sodium, potassium. John Newlands saw properties repeat every eighth element and called it the law of octaves; the Chemical Society laughed and asked whether he had tried arranging them alphabetically.',
        'In 1869 Dmitri Mendeleev, writing a chemistry textbook in St Petersburg, arranged the elements by atomic weight in rows so that similar elements fell into columns. His boldest move was to leave gaps and in 1871 he predicted the properties of the missing elements, which he called eka-aluminium, eka-boron and eka-silicon. Gallium (1875), scandium (1879) and germanium (1886) were discovered with properties remarkably close to his predictions.',
        'One puzzle remained: a few elements were out of order by weight. In 1913 the young physicist Henry Moseley measured X-rays from each element and found that the true ordering number is the charge of the nucleus, the atomic number Z. Moseley was killed at Gallipoli in 1915, aged 27. Meanwhile William Ramsay had discovered an entire new column, the noble gases, that nobody had predicted.',
      ],
      takeaway:
        'The periodic table is a map of electron shells. Where an element sits tells you how big its atoms are, how strongly they hold electrons, and therefore whether it makes a metal, a ceramic or a semiconductor.',
    },
    csBridge: {
      concept: 'Indexing by Key & Spotting Gaps',
      analogy:
        'Mendeleev’s table is a sorted 2D array indexed by atomic number. His predictions are like noticing missing primary keys in a table and inferring the missing rows from their neighbours.',
      codeSnippet: `// Predict a missing value from the elements above and below it
const above = { name: 'Si', density: 2.33 };
const below = { name: 'Sn', density: 7.31 };
const ekaSilicon = (above.density + below.density) / 2;  // ≈ 4.8
// Mendeleev predicted 5.5 g/cm³ for eka-silicon;
// germanium (1886) measured 5.35 g/cm³.`,
    },
    visualLab: {
      type: 'periodic_table_3d',
      title: '3D Periodic Landscape',
      instructions: 'Change what the bar heights show and compare the table of 1871 with today’s.',
      missionPrompt: 'Switch to 1871 and find the three gaps Mendeleev predicted.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Periods and groups',
        formula: '\\text{Period} = \\text{row} = \\text{number of electron shells} \\qquad \\text{Group} = \\text{column}',
        explanation: 'Na, K and Li are in group 1: each has one electron in its outer shell, so they react in the same way.',
      },
      {
        title: '2. Atom size trends',
        formula: 'r: \\;\\text{Na}\\,(180\\text{ pm}) > \\text{Mg} > \\text{Al} > \\text{Si} > \\dots > \\text{Cl}\\,(100\\text{ pm})',
        explanation:
          'Across a row the nucleus gains protons and pulls the same shell in tighter, so atoms shrink. Down a column each new shell makes atoms bigger.',
      },
      {
        title: '3. Electronegativity',
        formula: '\\chi: \\;\\text{F}\\,(3.98) \\gg \\text{Cl} > \\text{O} > \\dots > \\text{Na}\\,(0.93) > \\text{K}',
        explanation:
          'How strongly an atom pulls shared electrons. A large difference between two atoms gives ionic bonds (ceramics, salts); similar values give covalent or metallic bonds.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'c004-d1',
          question: 'Which atom is larger, sodium (Na) or chlorine (Cl)? Both are in period 3.',
          options: ['Na', 'Cl', 'They are the same', 'It depends on temperature'],
          correctIndex: 0,
          hint1: 'Across a row, atoms shrink.',
          hint2: 'Na is on the left, Cl on the right.',
          explanation: 'Na (about 180 pm) is larger. Chlorine’s extra protons pull the same shell in tighter.',
        },
        {
          id: 'c004-d2',
          question: 'Why do elements in the same group behave similarly?',
          options: ['Same number of outer electrons', 'Same atomic mass', 'Same number of neutrons', 'Discovered at the same time'],
          correctIndex: 0,
          hint1: 'Chemistry happens at the outside of the atom.',
          hint2: 'Think valence electrons.',
          explanation: 'Elements in a group have the same outer-shell electron arrangement, which controls bonding.',
        },
        {
          id: 'c004-d3',
          question: 'What was Mendeleev’s "eka-silicon" when it was finally discovered?',
          options: ['Germanium', 'Gallium', 'Scandium', 'Tin'],
          correctIndex: 0,
          hint1: 'It sits directly below silicon.',
          hint2: 'Discovered by Clemens Winkler in 1886.',
          explanation: 'Germanium (Ge), found in 1886, matched Mendeleev’s predicted atomic weight and density closely.',
        },
      ],
      bossProblem: {
        title: 'Choosing a Dopant',
        scenario:
          'Silicon (group 14) has 4 outer electrons. To make n-type silicon for a solar cell you add a small amount of an element with ONE MORE outer electron, sitting next to silicon in the table. Which do you choose?',
        options: ['Phosphorus (group 15)', 'Boron (group 13)', 'Germanium (group 14)', 'Aluminium (group 13)'],
        correctIndex: 0,
        hint: 'One more outer electron than group 14 means group 15.',
        explanation: 'Phosphorus has 5 outer electrons; four bond with silicon and the fifth is free to carry current. Boron and aluminium (group 13) give p-type; germanium changes nothing.',
      },
    },
  }),
];

const wiki = (slug, title, why, excerpt, minutes = 6) => ({
  type: 'Encyclopedia',
  source: 'Wikipedia',
  title,
  readTime: `${minutes} min read`,
  url: `https://en.wikipedia.org/wiki/${slug}`,
  whyRead: why,
  inAppExcerpt: excerpt,
});

export const ORIGIN_READINGS = {
  'num-001': [
    { id: 'read-n001-1', ...wiki('Ishango_bone', 'The Ishango Bone', 'See the actual notch groupings and the debate about what they count.', 'The Ishango bone is a baboon fibula with three columns of grouped notches, found in 1960 near the source of the Nile in the Congo. Some groups seem to show doubling; others are primes between 10 and 20. Whether that is deliberate maths or coincidence is still argued, but the grouping itself shows people organising counts long before writing.') },
    { id: 'read-n001-2', ...wiki('Tally_marks', 'Tally Marks', 'Different cultures bundle tallies differently: compare the 5-bar gate with the Chinese 正 character.', 'Tally marks are the simplest possible number system: one mark per thing. English-speaking countries group them in fives with a diagonal stroke; China, Japan and Korea write the five-stroke character 正. Medieval Europe used split tally sticks as receipts: each party kept half, and the notches had to match.') },
  ],
  'num-002': [
    { id: 'read-n002-1', ...wiki('Babylonian_cuneiform_numerals', 'Babylonian Cuneiform Numerals', 'How two wedge shapes could write any number in base 60.', 'Babylonian digits 1–59 were built from a vertical wedge (1) and a corner wedge (10). Position multiplied each digit by a power of 60. Without a zero, scribes relied on spacing and context, which often made numbers ambiguous.') },
    { id: 'read-n002-2', ...wiki('Egyptian_numerals', 'Egyptian Numerals', 'The full set of hieroglyphs up to one million (a man raising his arms in astonishment).', 'Egyptian hieroglyphic numerals were additive and decimal: separate symbols for 1, 10, 100, 1,000, 10,000, 100,000 and 1,000,000, each repeated up to nine times.') },
  ],
  'num-003': [
    { id: 'read-n003-1', ...wiki('0', 'Zero: History of the Number 0', 'Follow zero from Babylonian placeholder to Indian number to European banking.', 'Zero developed in two stages: as a placeholder in positional notation, and as a number in its own right. The Indian mathematician Brahmagupta gave arithmetic rules for zero in 628 AD, and the symbol travelled west through the Islamic world.', 8) },
    { id: 'read-n003-2', ...wiki('Liber_Abaci', 'Liber Abaci (Fibonacci, 1202)', 'The book that sold Hindu-Arabic numerals to European merchants, and the source of the Fibonacci rabbits.', 'Liber Abaci opens by introducing the nine Indian figures and the sign 0, then shows merchants how to use them for currency conversion, interest and profit sharing. The famous rabbit-breeding puzzle that produces the Fibonacci sequence is a small exercise in chapter 12.') },
  ],
  'num-004': [
    { id: 'read-n004-1', ...wiki('Abacus', 'The Abacus', 'From Greek counting tables to the Japanese soroban.', 'Before written arithmetic, people calculated by moving counters on ruled boards or beads on rods. The Salamis tablet (c. 300 BC) is the oldest surviving counting board.') },
    { id: 'read-n004-2', ...wiki('Plus_and_minus_signs', 'Plus and Minus Signs', 'Why + probably comes from the Latin "et" (and).', 'The + sign is likely a simplification of "et", Latin for "and". Both + and − appear in Johannes Widmann’s 1489 Mercantile Arithmetic, marking surpluses and deficits.') },
  ],
  'num-005': [
    { id: 'read-n005-1', ...wiki('Ancient_Egyptian_multiplication', 'Ancient Egyptian Multiplication', 'Practise the doubling method on your own numbers.', 'Egyptian multiplication decomposes one factor into a sum of powers of two, doubles the other factor repeatedly, and adds the selected rows. The same idea survives as "Russian peasant multiplication" and as binary shift-and-add in hardware.') },
    { id: 'read-n005-2', ...wiki('Rhind_Mathematical_Papyrus', 'The Rhind Mathematical Papyrus', 'A 3,500-year-old maths workbook with 84 problems.', 'Copied by the scribe Ahmes around 1550 BC, the papyrus covers multiplication, division, unit fractions, areas and volumes, and even a recipe-style problem about loaves of bread shared between men.') },
  ],
  'num-006': [
    { id: 'read-n006-1', ...wiki('Euclid%27s_theorem', 'Euclid’s Theorem: Infinitely Many Primes', 'Read the original proof and several modern variations.', 'Euclid showed that for any finite list of primes, multiplying them and adding one gives a number not divisible by any of them, so the list must be missing a prime.') },
    { id: 'read-n006-2', ...wiki('Sieve_of_Eratosthenes', 'The Sieve of Eratosthenes', 'See the animation and why you can start crossing out at p².', 'The sieve marks multiples of each prime starting from its square, since smaller multiples were already removed by smaller primes. It finds all primes up to n in roughly n log log n steps.') },
  ],
  'num-007': [
    { id: 'read-n007-1', ...wiki('Simon_Stevin', 'Simon Stevin', 'Engineer, inventor of a sailing chariot, and champion of decimals.', 'Simon Stevin (1548–1620) was a Flemish engineer who wrote De Thiende (1585), introducing decimal fractions to European readers and arguing for decimal coinage and measures.') },
    { id: 'read-n007-2', ...wiki('Decimal', 'Decimal System', 'Why some fractions terminate and others repeat.', 'A fraction in lowest terms has a terminating decimal exactly when its denominator has no prime factors other than 2 and 5. Otherwise the decimal repeats with a period that divides the denominator minus one (for prime denominators).') },
  ],
  'num-008': [
    { id: 'read-n008-1', ...wiki('Square_root_of_2', 'The Square Root of 2', 'Several proofs of irrationality, including a beautiful geometric one.', '√2 was probably the first number shown to be irrational. Besides Euclid’s parity proof there is a geometric proof by infinite descent: a smaller isosceles right triangle with whole-number sides could always be cut from a bigger one, which is impossible.') },
    { id: 'read-n008-2', ...wiki('Dedekind_cut', 'Dedekind Cuts', 'How the real numbers were finally defined in 1872.', 'A Dedekind cut splits the rational numbers into a lower and an upper set. Each real number corresponds to exactly one cut; √2 is the cut where the lower set holds all rationals whose square is below 2.') },
  ],
  'geo-001': [
    { id: 'read-n009-1', ...wiki('Plimpton_322', 'Plimpton 322', 'The Babylonian tablet of Pythagorean triples, 1,200 years before Pythagoras.', 'Plimpton 322 is a clay tablet from about 1800 BC listing pairs of numbers that form the sides of right triangles. Historians still debate whether it was a teacher’s aid, a trigonometric table or a list of exercises.') },
    { id: 'read-n009-2', ...wiki('Euclid%27s_Elements', 'Euclid’s Elements', 'The book that taught the world how to prove things.', 'The Elements consists of 13 books covering plane geometry, number theory and solid geometry, all deduced from definitions, five postulates and common notions. It has appeared in over a thousand editions since printing began.', 8) },
  ],
  'geo-002': [
    { id: 'read-g002-1', ...wiki('History_of_trigonometry', 'History of Trigonometry', 'From Babylonian astronomy to Euler.', 'Trigonometry began with tables of chords for astronomy (Hipparchus, Ptolemy), shifted to half-chords (sines) in India, was developed into six functions in the Islamic world, and was recast as functions on the unit circle by Euler.', 8) },
    { id: 'read-g002-2', ...wiki('Unit_circle', 'The Unit Circle', 'All the special angles in one diagram.', 'On a circle of radius 1 centred at the origin, the point at angle θ has coordinates (cos θ, sin θ). Special angles such as 30°, 45° and 60° have exact values involving √2 and √3.') },
  ],
  'num-009': [
    { id: 'read-n010-1', ...wiki('Complex_number#History', 'Complex Numbers: History', 'From Cardano’s cubic to the complex plane.', 'Complex numbers first appeared as intermediate steps in solving cubic equations in the 16th century. They gained acceptance after Wessel, Argand and Gauss gave them a geometric interpretation as points in a plane.', 8) },
    { id: 'read-n010-2', ...wiki('Rafael_Bombelli', 'Rafael Bombelli', 'The engineer who first made rules for imaginary numbers.', 'Bombelli was a hydraulic engineer draining marshes in Italy. In his 1572 Algebra he gave rules for multiplying "plus of minus" (i) and "minus of minus" (−i) and used them to show that Cardano’s formula gives the real root 4 of x³ = 15x + 4.') },
  ],
  'chem-000': [
    { id: 'read-c000-1', ...wiki('Antoine_Lavoisier', 'Antoine Lavoisier', 'The father of modern chemistry and his 33 elements.', 'Lavoisier established conservation of mass, named oxygen and hydrogen, helped create chemical nomenclature, and co-wrote the first modern list of elements. He was executed in 1794 during the Reign of Terror.', 8) },
    { id: 'read-c000-2', ...wiki('Classical_element', 'Classical Elements', 'Earth, water, air and fire across Greece, India, China and Japan.', 'Many ancient cultures described matter with a small set of elements: four in Greece, five (including space) in India, five phases (wood, fire, earth, metal, water) in China.') },
  ],
  'chem-004': [
    { id: 'read-c004-1', ...wiki('Mendeleev%27s_predicted_elements', 'Mendeleev’s Predicted Elements', 'His predictions side by side with the real measurements.', 'Mendeleev predicted eka-aluminium (gallium), eka-boron (scandium) and eka-silicon (germanium), including their atomic weights, densities and oxide formulas. The close matches made the periodic table widely accepted.') },
    { id: 'read-c004-2', ...wiki('Henry_Moseley', 'Henry Moseley', 'The 27-year-old who discovered what atomic number really means.', 'Moseley measured the X-ray frequencies of elements in 1913 and showed they increase step by step with nuclear charge, fixing the order of the periodic table by atomic number and predicting missing elements.') },
  ],
};
