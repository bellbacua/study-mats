// Number foundations: four parts for each class.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const NUMBERS = {
  'num-001': {
    predict: {
      q: 'You have 23 sheep and one notch for each. You redraw the notches in bundles of five. How many notches must disappear to make four complete bundles?',
      options: ['Three: the loose ones', 'None: only their arrangement changes', 'Four: one for each bundle', 'Twenty: only the loose ones remain'],
      answer: 1,
      reveal: 'None disappear. Twenty marks form four bundles and three stay loose; every sheep still has exactly one mark.'
    },
    parts: [
      {
        title: 'One thing, one mark',
        minutes: 20,
        explain: [
          'Counting starts by matching. Give each object one mark. An object must never get two marks, and no object may be missed.',
          'Two collections have the same count when every item in one has exactly one partner in the other, with nothing left over. Spreading the objects farther apart does not change that count.',
          'In a materials lab, one mark per sample lets you check that every sample has a label before testing begins.'
        ],
        formulas: [
          ['Matching', '\\text{one object} \\longleftrightarrow \\text{one mark}']
        ],
        examples: [
          ex('Six metal samples each get one label. How many labels are used?', [
            ['Pair each sample with a label.', '1+1+1+1+1+1=6'],
            ['Count the labels once each.', '\\text{labels}=6']
          ], '6 labels'),
          ex('There are eight stones in a row. You move them into a circle. How many stones are there now?', [
            ['No stone has been added or taken away.', ''],
            ['Match the same stones to the original eight marks.', '\\text{count}=8']
          ], '8 stones')
        ],
        practice: [
          pr('Four tiles each need one tally mark. How many marks are needed?', 4, 'Give each tile its own mark.', 'One mark per tile gives 4 marks.'),
          pr('Nine samples each have one label. How many samples are labelled?', 9, 'Match each label to its sample.', 'Nine labels match nine samples: 9 samples.'),
          pr('Seven pebbles are moved from a line to a circle. None are added or removed. How many remain?', 7, 'Does moving a pebble create another one?', 'The same seven pebbles are still present: 7.'),
          pr('Twelve samples are paired with twelve marks. You count the samples in reverse order. What count should you get?', 12, 'Each sample still gets counted once.', 'Changing the order leaves the count unchanged: 12.')
        ]
      },
      {
        title: 'Bundles of five',
        minutes: 20,
        explain: [
          'A long row of loose marks is easy to misread. Put the marks into groups of five. Four upright strokes and a stroke across them make one complete group.',
          'Count five for each complete group, then count the loose marks. The short way to write “three groups of five” is 3 × 5. Here × just means equal groups.',
          'A full bundle has five marks. As soon as five loose marks gather, they become another bundle. A finished tally therefore has fewer than five loose marks.'
        ],
        formulas: [
          ['Reading bundles', '\\text{total}=\\text{fives}+\\text{loose marks}']
        ],
        examples: [
          ex('Read three bundles of five and two loose marks.', [
            ['Count the full bundles.', '5+5+5=15'],
            ['Include the loose marks.', '15+2=17']
          ], '17 marks'),
          ex('Regroup 24 marks in fives.', [
            ['Set aside four full bundles.', '5+5+5+5=20'],
            ['Count what is left.', '20+4=24']
          ], '4 bundles and 4 loose marks')
        ],
        practice: [
          pr('Two bundles of five have how many marks?', 10, 'Count five twice.', '5 + 5 = 10 marks.'),
          pr('Three bundles of five and one loose mark: how many marks?', 16, 'Count the bundles before the loose mark.', '5 + 5 + 5 + 1 = 16 marks.'),
          pr('How many complete bundles of five can you make from 29 marks?', 5, 'Count fives without passing 29.', 'Five fives make 25, while six make 30. There are 5 complete bundles.'),
          pr('After bundling 28 marks in fives, how many loose marks remain?', 3, 'Find the largest count of full fives below 28.', 'Five bundles hold 25 marks; three are left: 3.')
        ]
      },
      {
        title: 'Comparing by pairing',
        minutes: 20,
        explain: [
          'To compare two collections, pair an item from one with an item from the other. If one collection has unpaired items, it has more.',
          'The unpaired items tell you how many more. This is a difference: the gap between two counts. You can find it by counting upwards from the smaller count.',
          'A sample register uses the same idea. Pair each returning sample with its original mark. Any unmatched marks show how many samples have not returned.'
        ],
        formulas: [
          ['Difference', '\\text{smaller count}+\\text{gap}=\\text{larger count}']
        ],
        examples: [
          ex('There are nine sample jars and six lids. How many jars have no lid?', [
            ['Pair six lids with six jars.', '\\text{paired jars}=6'],
            ['Count from six up to nine.', '6+3=9']
          ], '3 jars'),
          ex('A register has 18 marks. Fifteen samples return. How many marks are unmatched?', [
            ['Pair each returned sample with one mark.', '\\text{matched}=15'],
            ['Count the remaining marks.', '15+3=18']
          ], '3 marks')
        ],
        practice: [
          pr('Five jars and three lids are paired. How many jars lack a lid?', 2, 'Count upwards from three to five.', '3 + 2 = 5, so 2 jars lack lids.'),
          pr('There are eight copper pieces and eleven aluminium pieces. How many more aluminium pieces are there?', 3, 'Pair eight of each first.', '8 + 3 = 11, so there are 3 more aluminium pieces.'),
          pr('A register has 21 marks and 17 returned samples. How many marks have no partner?', 4, 'Count from 17 up to 21.', '17 + 4 = 21, leaving 4 unmatched marks.'),
          pr('Two trays have 24 and 19 tiles. How many tiles must be added to the smaller tray to match the larger?', 5, 'You are filling the gap, while leaving the larger tray alone.', '19 + 5 = 24, so add 5 tiles.')
        ]
      },
      {
        title: 'There is always a next count',
        minutes: 20,
        explain: [
          'The natural numbers are the counting numbers: 1, 2, 3, and so on. In these lessons, the natural numbers start at 1. Zero will get its own lesson.',
          'The next counting number is one more than the current one. However large a count you name, another object could raise it by one. There is no largest natural number.',
          'A position tells where something comes in an ordered row. A total tells how many things there are. The last position equals the total only when positions begin at one and nothing is skipped.'
        ],
        formulas: [
          ['Next count', '\\text{next}=\\text{current}+1'],
          ['Counting numbers', '\\mathbb{N}=\\{1,2,3,\\ldots\\}']
        ],
        examples: [
          ex('A tray holds 29 samples. One more arrives. What is the next count?', [
            ['Start with the current count.', '29'],
            ['Move one count forward.', '29+1=30']
          ], '30 samples'),
          ex('Samples are labelled consecutively from 1 through 16. How many samples are there?', [
            ['The first sample has position one.', ''],
            ['Each new label matches one more sample; the last label gives the total.', '\\text{total}=16']
          ], '16 samples')
        ],
        practice: [
          pr('What counting number comes immediately after 8?', 9, 'Move one place forward.', '8 + 1 = 9.'),
          pr('What counting number comes immediately before 20?', 19, 'Find the number whose next count is 20.', '19 + 1 = 20, so the answer is 19.'),
          pr('Labels run from 1 through 37 without gaps. How many samples are labelled?', 37, 'Pair each counting number with a sample.', 'There is one sample for every label from 1 to 37: 37 samples.'),
          pr('Someone claims 999 is the largest counting number. What single next number disproves the claim?', 1000, 'Give that count one more object.', '999 + 1 = 1,000, so the next number is 1000.')
        ]
      }
    ]
  },
  'num-002': {
    predict: {
      q: 'The scene shows 365 objects. You switch from bundles of ten to bundles of sixty. What should the two base-sixty columns show?',
      options: ['3 | 65', '36 | 5', '6 | 5', '5 | 6'],
      answer: 2,
      reveal: 'Six bundles of sixty hold 360 objects, leaving five ones. The quantity stays 365 even though the columns now read 6 | 5.'
    },
    parts: [
      {
        title: 'Symbols that add',
        minutes: 20,
        explain: [
          'A numeral is a written way to show a number. Different symbols can represent the same count, just as different words can name the same object.',
          'In an additive system, add the values of the symbols. For Egyptian numerals, one stroke means one, a heel-shaped symbol means ten, and a coil means a hundred.',
          'The symbol keeps its value wherever it sits. This differs from our usual digits, whose position changes their value.'
        ],
        formulas: [
          ['Additive writing', '\\text{value}=\\text{sum of symbol values}']
        ],
        examples: [
          ex('Two ten-symbols and three one-symbols are written. What count do they show?', [
            ['Read the tens.', '10+10=20'],
            ['Add the ones.', '20+1+1+1=23']
          ], '23'),
          ex('A record has three hundred-symbols, two ten-symbols and four one-symbols. Read it.', [
            ['Combine the hundreds and tens.', '100+100+100+10+10=320'],
            ['Include the four ones.', '320+4=324']
          ], '324')
        ],
        practice: [
          pr('One ten-symbol and four one-symbols show what value?', 14, 'Each symbol keeps its own value.', '10 + 4 = 14.'),
          pr('Three ten-symbols and two one-symbols show what value?', 32, 'Count the tens first.', '10 + 10 + 10 + 2 = 32.'),
          pr('Two hundred-symbols, four ten-symbols and six one-symbols show what value?', 246, 'Combine each kind of symbol.', '200 + 40 + 6 = 246.'),
          pr('To write 43 using only ten-symbols and one-symbols, using as many tens as possible, how many symbols are needed altogether?', 7, 'Count symbols, rather than the value they represent.', 'Four ten-symbols and three one-symbols use 4 + 3 = 7 symbols.')
        ]
      },
      {
        title: 'Reading Roman numerals',
        minutes: 20,
        explain: [
          'The Roman symbols I, V, X, L and C stand for one, five, ten, fifty and a hundred. Usually you add symbols written from larger to smaller.',
          'There are special subtractive pairs. IV means one before five, so four; IX means nine; XL means forty; XC means ninety. Read each such pair as one chunk.',
          'Use these standard pairs rather than subtracting any smaller symbol you happen to see. For example, forty-nine is XLIX.'
        ],
        formulas: [
          ['Common pairs', '\\mathrm{IV}=5-1,\\quad \\mathrm{IX}=10-1,\\quad \\mathrm{XL}=50-10,\\quad \\mathrm{XC}=100-10']
        ],
        examples: [
          ex('Read XXVIII.', [
            ['Read the larger symbols.', '10+10+5=25'],
            ['Add the three ones.', '25+1+1+1=28']
          ], '28'),
          ex('Read XLIX.', [
            ['Read each subtractive pair.', '\\mathrm{XL}=50-10=40,\\quad \\mathrm{IX}=10-1=9'],
            ['Add the chunks.', '40+9=49']
          ], '49')
        ],
        practice: [
          pr('What value does VII represent?', 7, 'Read V, then the two ones.', '5 + 1 + 1 = 7.'),
          pr('What value does XIV represent?', 14, 'Read IV as a pair.', '10 + 4 = 14.'),
          pr('What value does XXXIV represent?', 34, 'Group IV before adding.', '30 + 4 = 34.'),
          pr('What value does XCVI represent?', 96, 'XC is one subtractive chunk.', '90 + 5 + 1 = 96.')
        ]
      },
      {
        title: 'Changing the bundle size',
        minutes: 25,
        explain: [
          'The base tells you how many items make one bundle. Base ten bundles ten ones; base sixty bundles sixty ones. Each column to the left is one bundle of the column beside it.',
          'In base five the columns are ones, fives and twenty-fives. In base two they are ones, twos, fours and eights. You can build their values by repeated doubling, without knowing powers yet.',
          'A column must contain fewer items than the base. Five items in the ones column of base five must be traded for a bundle. A zero can hold an empty column; the next class explores that idea.'
        ],
        formulas: [
          ['Two columns', '\\text{value}=\\text{left digit}\\times\\text{base}+\\text{right digit}']
        ],
        examples: [
          ex('What is 23 in base five, expressed as an ordinary base-ten count?', [
            ['The left digit means two bundles of five.', '5+5=10'],
            ['The right digit means three ones.', '10+3=13']
          ], '13'),
          ex('Read 1101 in base two as a base-ten count.', [
            ['Label columns from right to left by doubling.', '1,2,4,8'],
            ['Use the columns with a one.', '8+4+0+1=13']
          ], '13')
        ],
        practice: [
          pr('Read 12 in base five as a base-ten count.', 7, 'The left digit counts fives.', 'One five and two ones give 5 + 2 = 7.'),
          pr('Read 101 in base two as a base-ten count.', 5, 'The columns are fours, twos and ones.', '4 + 0 + 1 = 5.'),
          pr('Read 34 in base five as a base-ten count.', 19, 'Count three fives and four ones.', '15 + 4 = 19.'),
          pr('Read 2 | 17 in base sixty as a base-ten count.', 137, 'The bar separates the two base-sixty digits.', 'Two sixties and seventeen ones give 120 + 17 = 137.')
        ]
      },
      {
        title: 'Time as bundles of sixty',
        minutes: 20,
        explain: [
          'Timekeeping still uses bundles of sixty. Sixty seconds make a minute, and sixty minutes make an hour. An hour therefore contains sixty bundles of sixty seconds.',
          'To unpack a time, count complete hours first. Then unpack what remains into minutes and seconds. To combine a time, turn every part into the same unit before adding.',
          'A furnace log may record seconds while an operator records hours and minutes. Both records can describe exactly the same run.'
        ],
        formulas: [
          ['Time units', '1\\,\\text{h}=60\\,\\text{min}=3600\\,\\text{s}']
        ],
        examples: [
          ex('A furnace runs for 125 seconds. Express this in minutes and seconds.', [
            ['Take out two full minutes.', '60+60=120\\,\\text{s}'],
            ['Find the seconds left.', '125-120=5\\,\\text{s}']
          ], '2 min 5 s'),
          ex('A furnace runs for 1 h 2 min 7 s. How many seconds is this?', [
            ['Turn the hour and minutes into seconds.', '3600+60+60=3720\\,\\text{s}'],
            ['Add the remaining seconds.', '3720+7=3727\\,\\text{s}']
          ], '3727 s')
        ],
        practice: [
          pr('How many seconds are in 3 minutes?', 180, 'Each minute is another sixty seconds.', '60 + 60 + 60 = 180 s.'),
          pr('A run lasts 185 seconds. After removing complete minutes, how many seconds remain?', 5, 'Three full minutes account for 180 seconds.', '185 − 180 = 5 s.'),
          pr('How many seconds are in 2 min 35 s?', 155, 'Convert minutes to seconds first.', '120 + 35 = 155 s.'),
          pr('A furnace log reads 2 h 3 min 5 s. Express the duration in seconds.', 7385, 'Use 3,600 seconds per hour.', '7200 + 180 + 5 = 7385 s.')
        ]
      }
    ]
  },
  'num-003': {
    predict: {
      q: 'The counting frame shows 3007. You slide one bead up on the empty hundreds rod, leaving every other rod alone. What number will it show?',
      options: ['3008', '3017', '4007', '3107'],
      answer: 3,
      reveal: 'It shows 3107. A bead on the hundreds rod adds a hundred, even though only one bead moved.'
    },
    parts: [
      {
        title: 'A digit gets its worth from its place',
        minutes: 20,
        explain: [
          'Our ten digits are 0 through 9. Read columns from right to left: ones, tens, hundreds and thousands. A digit counts how many of that column you have.',
          'The same digit can have different values. A two in the ones column means two; a two in the hundreds column means two hundred. Each place is ten times the place on its right.',
          'Expanded writing shows the contribution from every column. It is a useful check when copying a sample count or a mass into a lab notebook.'
        ],
        formulas: [
          ['Expanded form', '246=2\\times100+4\\times10+6\\times1']
        ],
        examples: [
          ex('What is the value of the digit 4 in 2,461?', [
            ['Locate the digit: it is in the hundreds column.', ''],
            ['Count four hundreds.', '4\\times100=400']
          ], '400'),
          ex('Build the number with 3 thousands, 2 hundreds, 6 tens and 8 ones.', [
            ['Combine thousands and hundreds.', '3000+200=3200'],
            ['Include tens and ones.', '3200+60+8=3268']
          ], '3268')
        ],
        practice: [
          pr('What is the value of the digit 7 in 72?', 70, 'Name its column first.', 'The seven counts tens: 7 × 10 = 70.'),
          pr('What is the value of the digit 5 in 5,213?', 5000, 'Read places from the right.', 'The five counts thousands: 5 × 1000 = 5000.'),
          pr('Build a number from 6 hundreds, 3 tens and 9 ones.', 639, 'Add the contribution from each place.', '600 + 30 + 9 = 639.'),
          pr('Build a number from 4 thousands, 8 hundreds, 2 tens and 1 one.', 4821, 'Start with the largest place.', '4000 + 800 + 20 + 1 = 4821.')
        ]
      },
      {
        title: 'Zero holds an empty place',
        minutes: 20,
        explain: [
          'An empty rod on the counting frame needs a written mark. Zero holds that place so the other digits stay in the right columns.',
          'In 205, the zero says there are no tens. Removing it gives 25 and moves the two into the tens column. An empty place can matter enormously even though it contributes nothing.',
          'Zeros before the first non-zero digit do not move the other digits relative to the ones column. Zeros at the right of a whole number do: they move its other digits into larger places.'
        ],
        formulas: [
          ['Empty tens', '205=200+0+5']
        ],
        examples: [
          ex('Write 3 thousands and 7 ones, with no hundreds or tens.', [
            ['Keep all four places.', '\\text{thousands, hundreds, tens, ones}:\\quad3,0,0,7'],
            ['Combine their values.', '3000+0+0+7=3007']
          ], '3007'),
          ex('What changes when 25 becomes 205?', [
            ['Expand the smaller count.', '25=20+5'],
            ['Expand the larger count and compare.', '205=200+5,\\quad205-25=180']
          ], 'It is larger by 180')
        ],
        practice: [
          pr('Write 4 hundreds and 6 ones, with no tens.', 406, 'Leave a zero between hundreds and ones.', '400 + 0 + 6 = 406.'),
          pr('Write 2 thousands and 9 tens, with no hundreds or ones.', 2090, 'Keep four columns, including the last empty one.', '2000 + 0 + 90 + 0 = 2090.'),
          pr('In 5,008, how many empty places lie between the first and last non-zero digits?', 2, 'Inspect the hundreds and tens places.', 'Both the hundreds and tens are empty: 2 places.'),
          pr('A sample count is written 0072. What is its ordinary numerical value?', 72, 'The first two zeros add nothing.', '0 + 0 + 70 + 2 = 72.')
        ]
      },
      {
        title: 'Zero in arithmetic',
        minutes: 20,
        explain: [
          'Zero also names a quantity: nothing in the collection. Adding nothing leaves a count alone. Taking every object away leaves zero.',
          'Any number of empty groups still contains nothing, so multiplying by zero gives zero. Zero divided into a positive number of equal shares gives zero in each share.',
          'Dividing by zero is different. Division must undo multiplication. No number times zero gives a non-zero total, while every number times zero gives zero. Neither case supplies a unique answer to division by zero.'
        ],
        formulas: [
          ['Nothing added or left', 'a+0=a,\\quad a-a=0'],
          ['Empty groups', 'a\\times0=0'],
          ['Empty shares', '0\\div b=0\\quad(b>0)']
        ],
        examples: [
          ex('A tray has 14 samples and no new samples arrive. How many does it hold?', [
            ['The starting count is fourteen.', '14'],
            ['Add the empty delivery.', '14+0=14']
          ], '14 samples'),
          ex('Why is 6 ÷ 0 undefined?', [
            ['Division would require a number that gives six when multiplied by zero.', '?\\times0=6'],
            ['Every possible choice instead gives zero.', 'a\\times0=0']
          ], 'No such number exists')
        ],
        practice: [
          pr('What is 18 + 0?', 18, 'No objects arrive.', 'Adding nothing leaves 18.'),
          pr('What is 23 − 23?', 0, 'Remove the entire collection.', 'Nothing remains: 23 − 23 = 0.', {
            tol: 0
          }),
          pr('Seven trays each hold zero samples. How many samples are there altogether?', 0, 'Every tray is empty.', 'Seven empty trays contain 7 × 0 = 0 samples.', {
            tol: 0
          }),
          pr('Zero grams of powder are shared equally among five jars. How many grams go into each jar?', 0, 'Sharing nothing leaves each jar empty.', '0 ÷ 5 = 0 g per jar.', {
            tol: 0
          })
        ]
      },
      {
        title: 'Read, compare and change a place',
        minutes: 20,
        explain: [
          'Compare whole numbers by lining up their ones columns. Look at the largest place where they differ. Its value outweighs all the smaller places together.',
          'Changing one digit changes the count by that digit change times the place value. Moving one bead on a thousands rod changes a count far more than moving one bead on the ones rod.',
          'For whole numbers, moving every digit one column left multiplies the value by ten. The new ones place needs a zero. This is why a misplaced zero can spoil a materials record.'
        ],
        formulas: [
          ['One place left', '246\\times10=2460']
        ],
        examples: [
          ex('Which is larger, 3,007 or 3,070?', [
            ['The thousands and hundreds agree.', ''],
            ['Compare the tens: seven tens outweigh zero tens.', '3070>3007']
          ], '3070'),
          ex('A counting frame shows 2,041. Add one bead on its hundreds rod. What does it show?', [
            ['One hundreds bead contributes one hundred.', '1\\times100=100'],
            ['Include that contribution.', '2041+100=2141']
          ], '2141')
        ],
        practice: [
          pr('Which is larger: 607 or 670? Enter the larger number.', 670, 'Compare the tens after the hundreds agree.', 'Seven tens exceed zero tens, so the larger number is 670.'),
          pr('The frame shows 4,002. Add one tens bead. What count results?', 4012, 'A tens bead contributes ten.', '4002 + 10 = 4012.'),
          pr('Multiply the whole number 305 by ten.', 3050, 'Move every digit one place left.', 'Three hundreds become three thousands and five ones become five tens: 3050.'),
          pr('A frame shows 6,080. Remove one thousands bead. What count results?', 5080, 'Leave the other rods alone.', '6080 − 1000 = 5080.')
        ]
      }
    ]
  },
  'num-004': {
    predict: {
      q: 'Lay out 38 + 46 as tens rods and ones squares. Before trading, there are seven rods and fourteen squares. After trading ten squares for a rod, what happens to the total?',
      options: ['It falls by ten', 'It rises by one', 'It stays 84', 'It becomes 714'],
      answer: 2,
      reveal: 'The total stays 84. Seven tens and fourteen ones become eight tens and four ones; trading changes the grouping, not the amount.'
    },
    parts: [
      {
        title: 'Joining and finding a gap',
        minutes: 20,
        explain: [
          'Addition joins collections. Subtraction can remove a collection, or find how far one count lies above another. The signs + and − tell you which action to take.',
          'The equals sign means that both sides have the same value. It lets you check a subtraction by adding back what you took away.',
          'Order does not affect an addition. For subtraction, keep the starting amount and the amount removed in their stated order. Here we use cases where the result is at least zero.'
        ],
        formulas: [
          ['Undo a subtraction', 'a-b=c\\quad\\Rightarrow\\quad c+b=a'],
          ['Swap an addition', 'a+b=b+a']
        ],
        examples: [
          ex('A tray holds 12 samples. Five arrive. How many are there?', [
            ['Identify the two collections.', '12+5'],
            ['Join them.', '12+5=17']
          ], '17 samples'),
          ex('There are 17 samples but only 12 test slots. How many samples have no slot?', [
            ['Find the gap.', '17-12=5'],
            ['Check by filling the gap.', '12+5=17']
          ], '5 samples')
        ],
        practice: [
          pr('What is 6 + 3?', 9, 'Join the two counts.', '6 + 3 = 9.'),
          pr('What is 14 − 4?', 10, 'Remove four from fourteen.', '14 − 4 = 10.'),
          pr('A tray holds 19 samples and a second holds 8. How many samples are there together?', 27, 'Joining means adding.', '19 + 8 = 27 samples.'),
          pr('A batch needs 31 labels and already has 18. How many more labels are needed?', 13, 'Find the gap to the required count.', '31 − 18 = 13 labels.')
        ]
      },
      {
        title: 'Carrying is a fair trade',
        minutes: 25,
        explain: [
          'Line up matching places before adding. Combine the ones first. If there are ten or more ones, trade ten ones for one ten.',
          'Write the leftover ones in the ones column. Carry the new ten into the tens column, then add it with the other tens. The same trade works from tens to hundreds.',
          'A carry is a bundle with a value. The little carried one means one ten or one hundred depending on its column.'
        ],
        formulas: [
          ['Regrouping', '10\\,\\text{ones}=1\\,\\text{ten}']
        ],
        examples: [
          ex('Add 38 + 46.', [
            ['Combine the ones and trade a ten.', '8+6=14=10+4'],
            ['Include that ten with the other tens.', '30+40+10+4=84']
          ], '84'),
          ex('Add 267 + 158.', [
            ['Combine ones, keeping five and carrying a ten.', '7+8=15'],
            ['Combine tens, including the carry, then trade a hundred.', '60+50+10=120'],
            ['Combine the hundreds with the leftovers.', '200+100+100+20+5=425']
          ], '425')
        ],
        practice: [
          pr('What is 27 + 15?', 42, 'The ones make more than a ten.', '7 + 5 = 12; 20 + 10 + 10 + 2 = 42.'),
          pr('What is 49 + 36?', 85, 'Trade ten of the fifteen ones.', '9 + 6 = 15; 40 + 30 + 10 + 5 = 85.'),
          pr('What is 178 + 246?', 424, 'Include each carried bundle in the next column.', '8 + 6 = 14; 70 + 40 + 10 = 120; 100 + 200 + 100 + 20 + 4 = 424.'),
          pr('What is 586 + 397?', 983, 'Both the ones and tens need a trade.', '6 + 7 = 13 and 80 + 90 + 10 = 180; 500 + 300 + 100 + 80 + 3 = 983.')
        ]
      },
      {
        title: 'Borrowing opens a bundle',
        minutes: 25,
        explain: [
          'If the ones available are fewer than the ones to remove, open a ten. One ten becomes ten ones. The amount you own stays the same.',
          'Now subtract the ones, then the tens. Remember that the tens column lost a ten when you opened it.',
          'If the tens column is empty, first open a hundred into ten tens. Then open one of those tens into ones. Work across the empty places patiently.'
        ],
        formulas: [
          ['Opening a bundle', '1\\,\\text{ten}=10\\,\\text{ones}']
        ],
        examples: [
          ex('Subtract 52 − 27.', [
            ['Open one ten.', '52=40+12'],
            ['Remove matching places.', '(40-20)+(12-7)=20+5=25']
          ], '25'),
          ex('Subtract 503 − 267.', [
            ['Open a hundred, then a ten.', '503=400+90+13'],
            ['Subtract place by place.', '(400-200)+(90-60)+(13-7)=236'],
            ['Check by adding back.', '236+267=503']
          ], '236')
        ],
        practice: [
          pr('What is 41 − 16?', 25, 'Open one of the four tens.', '41 = 30 + 11; 30 − 10 + 11 − 6 = 25.'),
          pr('What is 72 − 38?', 34, 'The ones need a ten.', '72 = 60 + 12; 60 − 30 + 12 − 8 = 34.'),
          pr('What is 600 − 248?', 352, 'Open a hundred, then open one ten.', '600 = 500 + 90 + 10; subtracting 200 + 40 + 8 leaves 352.'),
          pr('What is 1,002 − 587?', 415, 'Regroup across both empty columns.', '1002 = 900 + 90 + 12; subtract 500 + 80 + 7 to get 415.')
        ]
      },
      {
        title: 'Keep track of a changing amount',
        minutes: 20,
        explain: [
          'A word problem describes changes to an amount. First name the starting amount. Add deliveries and subtract removals in the order described.',
          'Keep the same units throughout a calculation. You can combine grams with grams, or sample counts with sample counts.',
          'Check the final amount by reversing the changes. Adding back a removal and taking away a delivery should return you to the starting amount.'
        ],
        formulas: [
          ['Record of changes', '\\text{final}=\\text{start}+\\text{added}-\\text{removed}']
        ],
        examples: [
          ex('A crucible holds 1,248 g of copper. Add 376 g of tin and remove 85 g of dross. Find the remaining mass in grams.', [
            ['Add the incoming tin.', '1248+376=1624\\,\\text{g}'],
            ['Remove the dross.', '1624-85=1539\\,\\text{g}']
          ], '1539 g'),
          ex('A lab starts with 86 samples, receives 27 and sends out 49. How many remain?', [
            ['Record the arrival.', '86+27=113'],
            ['Record the departure.', '113-49=64'],
            ['Reverse the changes to check.', '64+49-27=86']
          ], '64 samples')
        ],
        practice: [
          pr('A tray starts with 24 tiles. Six arrive and five leave. How many remain?', 25, 'Follow the arrivals and departures.', '24 + 6 − 5 = 25 tiles.'),
          pr('A crucible holds 350 g. Add 125 g and remove 40 g. What mass remains, in grams?', 435, 'Combine masses before the removal.', '350 + 125 − 40 = 435 g.'),
          pr('After receiving 38 samples and sending away 17, a lab has 75. How many did it start with?', 54, 'Undo the departure, then undo the arrival.', '75 + 17 − 38 = 54 samples.'),
          pr('A tray starts with 120 samples. It receives 46 and ends with 89. How many samples were sent away?', 77, 'Compare the amount before dispatch with the amount after.', '120 + 46 = 166; 166 − 89 = 77 samples.')
        ]
      }
    ]
  },
  'num-005': {
    predict: {
      q: 'Split the scene’s 14 by 13 rectangle at ten along each side. Three pieces have areas 100, 40 and 30. What area must the small corner have so every square is counted once?',
      options: ['7', '12', '42', 'There is no fourth piece'],
      answer: 1,
      reveal: 'The corner is four squares wide and three high, so it holds 12 squares. Leaving it out would give 170 instead of the full area, 182.'
    },
    parts: [
      {
        title: 'Equal groups and rectangles',
        minutes: 20,
        explain: [
          'Multiplication counts equal groups. Four groups of three contain 3 + 3 + 3 + 3 objects, written 4 × 3.',
          'Arrange the objects in rows and columns. Turning the rectangle exchanges rows with columns without changing how many objects it holds. That explains why you can swap the two factors.',
          'For area, a unit square has sides one unit long. A rectangle with whole-number side lengths contains width × height unit squares. State square units for area.'
        ],
        formulas: [
          ['Equal groups', '4\\times3=3+3+3+3'],
          ['Rectangle area', 'A=\\text{width}\\times\\text{height}']
        ],
        examples: [
          ex('Five trays each hold six metal samples. How many samples are there?', [
            ['Identify five equal groups of six.', '6+6+6+6+6'],
            ['Multiply to count them.', '5\\times6=30']
          ], '30 samples'),
          ex('A rectangular plate is 8 cm wide and 7 cm high. Find its area.', [
            ['Imagine squares with side one centimetre.', '\\text{one row holds }8\\text{ squares}'],
            ['Count all seven rows.', 'A=8\\times7=56\\,\\text{cm}^2']
          ], '56 cm²')
        ],
        practice: [
          pr('Three bags each contain four beads. How many beads are there?', 12, 'Each group has the same size.', '3 × 4 = 12 beads.'),
          pr('Seven trays each contain eight samples. How many samples are there?', 56, 'Multiply the number of trays by samples per tray.', '7 × 8 = 56 samples.'),
          pr('A plate is 9 cm by 6 cm. What is its area in cm²?', 54, 'Count square-centimetre tiles across and down.', '9 × 6 = 54 cm².'),
          pr('Six rows each contain nine tiles. After turning the rectangle, how many tiles are there altogether?', 54, 'Turning does not add or remove tiles.', 'The arrangement changes, while 6 × 9 remains 54 tiles.')
        ]
      },
      {
        title: 'Split the rectangle',
        minutes: 25,
        explain: [
          'A large rectangle can be cut into smaller rectangles whose areas are easy to find. Add all their areas to recover the whole.',
          'Splitting one side gives the distributive law: a × (b + c) = a × b + a × c. Splitting both sides usually gives four pieces. Every piece matters.',
          'Long multiplication records the same partial products in columns. A tens digit represents tens, so its row must have that larger place value.'
        ],
        formulas: [
          ['Distributive law', 'a(b+c)=ab+ac'],
          ['Two splits', '(a+b)(c+d)=ac+ad+bc+bd']
        ],
        examples: [
          ex('Find 14 × 13 by splitting both sides at ten.', [
            ['Find the large square and the two strips.', '10\\times10=100,\\quad4\\times10=40,\\quad10\\times3=30'],
            ['Find the corner and add all four pieces.', '4\\times3=12,\\quad100+40+30+12=182']
          ], '182'),
          ex('Multiply 23 × 14 using two partial products.', [
            ['Multiply by four ones.', '23\\times4=92'],
            ['Multiply by one ten.', '23\\times10=230'],
            ['Add the partial products.', '92+230=322']
          ], '322')
        ],
        practice: [
          pr('Find 12 × 6.', 72, 'Split twelve into ten and two.', '10 × 6 + 2 × 6 = 60 + 12 = 72.'),
          pr('Find 17 × 8.', 136, 'Use ten groups and seven groups.', '10 × 8 + 7 × 8 = 80 + 56 = 136.'),
          pr('Find 16 × 14.', 224, 'Split fourteen into ten and four.', '16 × 10 + 16 × 4 = 160 + 64 = 224.'),
          pr('A plate is 24 cm by 15 cm. Find its area in cm².', 360, 'Split fifteen into ten and five.', '24 × 10 + 24 × 5 = 240 + 120 = 360 cm².')
        ]
      },
      {
        title: 'Doubling to multiply',
        minutes: 20,
        explain: [
          'Doubling means adding an amount to itself. To make a doubling table, write the amount for one group, then two groups, four groups and eight groups.',
          'Build the required group count from those rows, using each row at most once. Add the matching amounts. Skip rows that would make too many groups.',
          'This method works because the chosen group counts add to your target. It gives the same product as splitting a rectangle, with a different choice of pieces.'
        ],
        formulas: [
          ['Double a group count', '2a=a+a']
        ],
        examples: [
          ex('Find 13 × 6 by doubling.', [
            ['Make the table for one, two, four and eight groups.', '1:6,\\quad2:12,\\quad4:24,\\quad8:48'],
            ['Choose group counts that make thirteen.', '13=8+4+1'],
            ['Add their amounts.', '48+24+6=78']
          ], '78'),
          ex('Find 11 × 7 by doubling.', [
            ['Double seven repeatedly.', '1:7,\\quad2:14,\\quad4:28,\\quad8:56'],
            ['Choose eight, two and one groups.', '11=8+2+1'],
            ['Combine those rows.', '56+14+7=77']
          ], '77')
        ],
        practice: [
          pr('A doubling table has 6 for one group. What amount belongs to two groups?', 12, 'Add six to itself.', '6 + 6 = 12.'),
          pr('A doubling table has 9 for one group. What amount belongs to four groups?', 36, 'Double twice.', '9 doubles to 18, then to 36.'),
          pr('Use doubling to find 9 × 12.', 108, 'Nine groups are eight groups plus one group.', 'Eight groups give 96 and one gives 12; 96 + 12 = 108.'),
          pr('Use doubling to find 15 × 7.', 105, 'Use eight, four, two and one groups.', '56 + 28 + 14 + 7 = 105.')
        ]
      },
      {
        title: 'Sharing, grouping and remainders',
        minutes: 25,
        explain: [
          'Division undoes multiplication. Sharing asks how many items belong in each equal group. Grouping asks how many groups of a stated size fit.',
          'Sometimes whole groups leave a remainder. It must be at least zero and smaller than the group size. Another full group would otherwise fit.',
          'Long division applies this idea from the largest place downwards. For cutting tiles, count complete pieces and keep the leftover separate. Always state whether cuts waste any material.'
        ],
        formulas: [
          ['Division check', '\\text{total}=\\text{group size}\\times\\text{groups}+\\text{remainder}']
        ],
        examples: [
          ex('Share 156 samples equally among 12 trays. How many per tray?', [
            ['Give each tray ten samples.', '12\\times10=120,\\quad156-120=36'],
            ['Share the remaining samples.', '36\\div12=3'],
            ['Combine the two shares.', '10+3=13']
          ], '13 samples per tray'),
          ex('Cut a 100 cm strip into 8 cm pieces, with no material lost in cutting. How many complete pieces and how much strip remain?', [
            ['Fit twelve complete lengths.', '12\\times8=96\\,\\text{cm}'],
            ['Find the unused length.', '100-96=4\\,\\text{cm}']
          ], '12 pieces; 4 cm remain')
        ],
        practice: [
          pr('Share 42 samples equally among six trays. How many per tray?', 7, 'What times six gives forty-two?', '6 × 7 = 42, so each tray gets 7 samples.'),
          pr('How many complete 9 cm pieces fit in a 70 cm strip, with no cutting loss?', 7, 'The next piece must fit completely.', '7 × 9 = 63, while 8 × 9 = 72 is too long: 7 pieces.'),
          pr('After cutting complete 9 cm pieces from a 70 cm strip with no loss, what length remains, in cm?', 7, 'Remove the total length of the complete pieces.', '70 − 7 × 9 = 7 cm.'),
          pr('A 24 cm by 15 cm plate is tiled by 3 cm by 5 cm rectangles, with sides aligned and no cutting loss. How many tiles fit?', 24, 'Count tiles along each side.', '24 ÷ 3 = 8 across and 15 ÷ 5 = 3 down; 8 × 3 = 24 tiles.')
        ]
      }
    ]
  },
  'num-006': {
    predict: {
      q: 'The sieve has crossed out multiples of 2, 3 and 5, keeping each prime itself. Which of these surviving numbers will disappear when you cross out multiples of 7?',
      options: ['7', '47', '49', '97'],
      answer: 2,
      reveal: '49 disappears because it is 7 × 7. Seven itself stays, while 47 and 97 have no smaller factors and remain prime.'
    },
    parts: [
      {
        title: 'Factors, primes and the special one',
        minutes: 20,
        explain: [
          'A factor divides a whole number exactly, with no remainder. Factors arrive in pairs: if three times four makes twelve, both three and four divide twelve.',
          'A prime is a whole number above one with exactly two positive factors: one and itself. A composite number has more than two. One has only one factor, so it belongs to neither group.',
          'To test divisibility by two, look for an even last digit. For five, look for zero or five. For three, add the digits and check whether that sum is divisible by three.'
        ],
        formulas: [
          ['Factor pair', 'a\\times b=n\\quad\\Rightarrow\\quad a,b\\text{ are factors of }n']
        ],
        examples: [
          ex('List the positive factors of 18.', [
            ['Find the multiplication pairs.', '1\\times18=18,\\quad2\\times9=18,\\quad3\\times6=18'],
            ['Collect each distinct factor once.', '\\{1,2,3,6,9,18\\}']
          ], '1, 2, 3, 6, 9, 18'),
          ex('Is 51 prime?', [
            ['Test divisibility by three using the digit sum.', '5+1=6'],
            ['Divide exactly to find a smaller factor.', '51=3\\times17']
          ], 'No; 51 is composite')
        ],
        practice: [
          pr('How many positive factors does a prime have?', 2, 'Include one and the number itself.', 'Those are its only positive factors: 2.'),
          pr('How many positive factors does 1 have?', 1, 'List the positive whole numbers that divide one.', 'Only 1 divides 1, so it has 1 positive factor.'),
          pr('How many distinct positive factors does 12 have?', 6, 'List the factor pairs and avoid counting a factor twice.', 'The factors are 1, 2, 3, 4, 6 and 12: 6 factors.'),
          pr('Find the smaller prime factor of 91.', 7, 'Test small primes after two, three and five fail.', '91 = 7 × 13, so the smaller prime factor is 7.')
        ]
      },
      {
        title: 'Sieve away the composites',
        minutes: 25,
        explain: [
          'A sieve starts with a list of whole numbers. Remove one because it is not prime. Keep two and cross out its larger multiples. Keep the next unremoved number and cross out its larger multiples too.',
          'For numbers up to a hundred, the passes for two, three, five and seven remove every composite. If both factors were larger than ten, their product would exceed a hundred.',
          'When testing one number, you can stop after checking possible factors whose squares do not exceed it. Any larger factor would need a smaller partner that you already checked.'
        ],
        formulas: [
          ['Stopping rule', 'p^2>n\\quad\\Rightarrow\\quad\\text{no new smaller factor pairs}']
        ],
        examples: [
          ex('Why does 49 survive passes for 2, 3 and 5 but fail the pass for 7?', [
            ['The earlier primes do not divide it exactly.', '49=2\\times24+1=3\\times16+1=5\\times9+4'],
            ['Seven does divide it.', '49=7\\times7']
          ], 'It is removed at seven'),
          ex('Test whether 29 is prime.', [
            ['Check two, three and five; none divides it.', '29=2\\times14+1=3\\times9+2=5\\times5+4'],
            ['The next prime already has a square above twenty-nine.', '7^2=49>29']
          ], '29 is prime')
        ],
        practice: [
          pr('What is the smallest multiple of 2 crossed out when 2 itself is kept?', 4, 'Start with the next multiple after two.', 'The next multiple is 2 × 2 = 4.'),
          pr('What is the smallest multiple of 3 not already removed by the pass for 2, excluding 3 itself?', 9, 'Six is already gone.', 'Six is even; the next multiple is 9.'),
          pr('How many primes are there from 1 through 10?', 4, 'List the survivors, remembering that one is excluded.', 'The survivors are 2, 3, 5 and 7: 4 primes.'),
          pr('When sieving through 100, what is the largest prime whose multiples need a pass?', 7, 'The next prime has a square above one hundred.', 'The needed primes are 2, 3, 5 and 7; 11 × 11 = 121, so the answer is 7.')
        ]
      },
      {
        title: 'Break a number into primes',
        minutes: 20,
        explain: [
          'Prime factorisation means writing a number as a product whose factors are all prime. Keep dividing by small primes until only primes remain.',
          'A factor tree does the same job by splitting a number into two factors, then splitting any composite branches. Different first splits lead to the same prime factors, apart from order.',
          'Repeated factors can be written with a small raised count. For example, 2² means 2 × 2. This is only a shorter way to write the repeated multiplication.'
        ],
        formulas: [
          ['Prime product', '84=2\\times2\\times3\\times7=2^2\\times3\\times7']
        ],
        examples: [
          ex('Find the prime factorisation of 84.', [
            ['Divide by two as long as it fits.', '84\\div2=42,\\quad42\\div2=21'],
            ['Split the remaining composite.', '21=3\\times7'],
            ['Check the product.', '2\\times2\\times3\\times7=84']
          ], '2² × 3 × 7'),
          ex('Start a factor tree for 60 with 6 × 10.', [
            ['Split each branch into primes.', '6=2\\times3,\\quad10=2\\times5'],
            ['Gather the prime factors.', '60=2\\times2\\times3\\times5']
          ], '2² × 3 × 5')
        ],
        practice: [
          pr('What is the largest prime factor of 18?', 3, 'Split eighteen until every factor is prime.', '18 = 2 × 3 × 3, so its largest prime factor is 3.'),
          pr('How many copies of 2 occur in the prime factorisation of 40?', 3, 'Keep dividing forty by two.', '40 = 2 × 2 × 2 × 5, so there are 3 copies.'),
          pr('What is the product 2² × 3 × 5?', 60, 'Replace the raised two with two copies of the factor.', '2 × 2 × 3 × 5 = 60.'),
          pr('A number has exactly the prime factors 2, 2, 3 and 7, with those repetitions. What is the number?', 84, 'Multiply all four factors.', '2 × 2 × 3 × 7 = 84.')
        ]
      },
      {
        title: 'Common factors and common multiples',
        minutes: 25,
        explain: [
          'The greatest common divisor, or GCD, is the largest positive whole number dividing both numbers. It gives the largest equal group size that fits both collections exactly.',
          'The least common multiple, or LCM, is the smallest positive number that both numbers divide. It tells when repeating schedules meet again.',
          'Use the shared prime factors, with the smaller number of copies, for the GCD. For the LCM, include enough copies of each prime to build either number.'
        ],
        formulas: [
          ['Shared factors', '\\gcd(12,18)=6'],
          ['Shared multiples', '\\operatorname{lcm}(12,18)=36']
        ],
        examples: [
          ex('You have strips 60 cm and 84 cm long. What is the longest equal piece length in whole cm that uses both without waste?', [
            ['Write their prime factors.', '60=2^2\\times3\\times5,\\quad84=2^2\\times3\\times7'],
            ['Keep only shared factors.', '\\gcd(60,84)=2^2\\times3=12']
          ], '12 cm'),
          ex('Two inspection cycles repeat every 6 and 8 minutes. They begin together. When do they next coincide?', [
            ['Write the prime factors.', '6=2\\times3,\\quad8=2^3'],
            ['Use enough copies for either cycle.', '\\operatorname{lcm}(6,8)=2^3\\times3=24']
          ], '24 min')
        ],
        practice: [
          pr('Find the greatest common divisor of 8 and 12.', 4, 'List factors shared by both.', 'Shared factors are 1, 2 and 4; the greatest is 4.'),
          pr('Find the least common multiple of 4 and 6.', 12, 'List multiples until the first match.', '4, 8, 12 and 6, 12 first meet at 12.'),
          pr('Strips of 45 cm and 60 cm are cut into equal whole-centimetre pieces with no loss. What is the longest possible piece length, in cm?', 15, 'Find the greatest common divisor.', '45 = 3 × 3 × 5 and 60 = 2 × 2 × 3 × 5; shared factors give 3 × 5 = 15 cm.'),
          pr('Marked teeth on meshing 12-tooth and 18-tooth gears touch initially. After how many tooth engagements do the same marks next meet?', 36, 'The count must be a multiple of both tooth counts.', '12 = 2² × 3 and 18 = 2 × 3²; the LCM is 2² × 3² = 36 engagements.')
        ]
      }
    ]
  },
  'num-007': {
    predict: {
      q: 'On the decimal zoom, 0.625 lies between 0.62 and 0.63. You split that gap into ten equal steps. Where does the point land?',
      options: ['At the second step after 0.62', 'At the fifth step after 0.62', 'At the sixth step after 0.62', 'Beyond 0.63 because it has more digits'],
      answer: 1,
      reveal: 'It lands halfway across, at the fifth step. The gap is one hundredth wide, so each of its ten steps is one thousandth: 0.620 + 0.005 = 0.625.'
    },
    parts: [
      {
        title: 'Places smaller than one',
        minutes: 20,
        explain: [
          'Place value continues to the right of the decimal point. The first place is tenths, the next hundredths, then thousandths. Each step right makes the place ten times smaller.',
          'The point separates whole units from parts of a unit. In 2.305, there are two whole units, three tenths, no hundredths and five thousandths.',
          'Adding zeros at the end of a decimal does not change its value. Half a unit is five tenths or fifty hundredths: 0.5 = 0.50.'
        ],
        formulas: [
          ['Decimal places', '0.375=\\frac3{10}+\\frac7{100}+\\frac5{1000}']
        ],
        examples: [
          ex('Write 0.625 as a sum of decimal fractions.', [
            ['Read the three digits by their places.', '\\frac6{10},\\quad\\frac2{100},\\quad\\frac5{1000}'],
            ['Combine the contributions.', '0.6+0.02+0.005=0.625']
          ], '6/10 + 2/100 + 5/1000'),
          ex('A gauge reads 2.305 mm. What value does its digit 5 contribute?', [
            ['Locate the digit: third place after the point.', '\\text{thousandths}'],
            ['Count five thousandths of a millimetre.', '5\\div1000=0.005\\,\\text{mm}']
          ], '0.005 mm')
        ],
        practice: [
          pr('Write seven tenths as a decimal.', 0.7, 'The first place after the point counts tenths.', '7 ÷ 10 = 0.7.'),
          pr('Write four hundredths as a decimal.', 0.04, 'Keep the tenths place empty.', '4 ÷ 100 = 0.04.'),
          pr('Write six tenths plus three thousandths as a decimal.', 0.603, 'The hundredths place is empty.', '0.6 + 0.003 = 0.603.'),
          pr('In a reading of 4.072 mm, what value does the digit 7 contribute, in mm?', 0.07, 'Name the place holding the seven.', 'Seven hundredths contribute 0.07 mm.')
        ]
      },
      {
        title: 'Compare and zoom',
        minutes: 20,
        explain: [
          'Compare decimals by lining up their points. Add trailing zeros until they have the same number of decimal places, then compare from left to right.',
          'More digits do not necessarily mean a larger number. A zero in the tenths place can make a three-place decimal smaller than a one-place decimal.',
          'Zooming changes the scale of the picture, not the number. Splitting a tenth into ten makes hundredths; splitting a hundredth into ten makes thousandths.'
        ],
        formulas: [
          ['Equal values', '0.5=0.50=0.500'],
          ['One zoom step', '0.01\\div10=0.001']
        ],
        examples: [
          ex('Which is larger: 0.5 or 0.45?', [
            ['Give both two decimal places.', '0.5=0.50'],
            ['Compare the tenths first.', '0.50>0.45']
          ], '0.5'),
          ex('A zoom shows 0.62 to 0.63 in ten equal steps. Locate 0.625.', [
            ['Find the width of one step.', '(0.63-0.62)\\div10=0.001'],
            ['Count steps from the left end.', '(0.625-0.62)\\div0.001=5']
          ], '5 steps after 0.62')
        ],
        practice: [
          pr('Which is larger, 0.8 or 0.75? Enter the larger number.', 0.8, 'Write both with two decimal places.', '0.80 > 0.75, so the answer is 0.8.'),
          pr('Which is smaller, 0.405 or 0.45? Enter the smaller number.', 0.405, 'Compare 0.405 with 0.450.', 'The tenths match, but zero hundredths is below five hundredths: 0.405.'),
          pr('Split the gap from 0.3 to 0.4 into ten equal steps. What is one step worth?', 0.01, 'Find the gap, then share it equally.', 'The gap is 0.1; 0.1 ÷ 10 = 0.01.'),
          pr('On a scale from 0.370 to 0.380 with steps of 0.001, how many steps after the left end is 0.378?', 8.00000000000001, 'Divide the distance from the left end by one step.', '0.378 − 0.370 = 0.008; 0.008 ÷ 0.001 = 8 steps.')
        ]
      },
      {
        title: 'Fractions that stop or repeat',
        minutes: 25,
        explain: [
          'A fraction becomes a decimal by dividing its top number by its bottom number. Long division keeps sharing any remainder into tenths, hundredths and smaller places.',
          'If the remainder becomes zero, the decimal stops. If a remainder returns, the same digits repeat forever. A bar over digits means that the marked group repeats.',
          'First simplify a fraction. Its decimal stops exactly when the remaining denominator has only prime factors two and five, or is one. Those factors can make a power of ten.'
        ],
        formulas: [
          ['Stopping decimal', '\\frac38=0.375'],
          ['Repeating decimal', '\\frac13=0.\\overline3']
        ],
        examples: [
          ex('Turn 5/8 into a decimal.', [
            ['Make a denominator of one thousand.', '\\frac58=\\frac{5\\times125}{8\\times125}=\\frac{625}{1000}'],
            ['Read the thousandths.', '\\frac{625}{1000}=0.625']
          ], '0.625'),
          ex('Why does 1/6 repeat?', [
            ['Divide one by six to get the first decimal digit.', '10=6\\times1+4'],
            ['The remainder four gives the same next remainder each time.', '40=6\\times6+4'],
            ['The six therefore repeats.', '\\frac16=0.1\\overline6']
          ], '0.1666…')
        ],
        practice: [
          pr('Write 3/4 as a decimal.', 0.75, 'Make the denominator one hundred.', '3/4 = 75/100 = 0.75.'),
          pr('Write 7/8 as a decimal.', 0.875, 'Use one eighth, then take seven copies.', '1/8 = 0.125, so 7/8 = 0.875.'),
          pr('What single digit repeats in the decimal for 2/3?', 6, 'Use the remainder after the first division step.', '20 = 3 × 6 + 2, returning the same remainder; the repeating digit is 6.'),
          pr('Among 1/4, 1/6, 3/20 and 2/7, how many have terminating decimals?', 2, 'Check prime factors in each simplified denominator.', 'Only 1/4 and 3/20 have denominators built from two and five: 2 fractions.')
        ]
      },
      {
        title: 'Calculate and round measurements',
        minutes: 25,
        explain: [
          'For adding or subtracting decimals, line up the points and work with matching places. For multiplying, count the decimal places in both factors together.',
          'For division, multiply both numbers by the same power of ten until the divisor is whole. This keeps the quotient unchanged.',
          'Rounding replaces a number with a nearby simpler value. Look at the first discarded digit: five or more rounds the last kept digit up. Keep extra digits during a calculation and round the final result as requested.'
        ],
        formulas: [
          ['Decimal multiplication', '1.2\\times0.3=\\frac{12\\times3}{100}'],
          ['Unchanged quotient', '\\frac{1.44}{0.12}=\\frac{144}{12}']
        ],
        examples: [
          ex('Two strips are 1.25 mm and 0.375 mm thick. Find their combined thickness, rounded to two decimal places.', [
            ['Line up decimal places and add.', '1.250+0.375=1.625\\,\\text{mm}'],
            ['The first discarded digit is five; round up.', '1.625\\approx1.63\\,\\text{mm}']
          ], '1.63 mm'),
          ex('A 1.44 g portion is divided into 0.12 g samples with no loss. How many samples result?', [
            ['Scale both masses equally.', '1.44\\div0.12=144\\div12'],
            ['Divide the whole numbers.', '144\\div12=12']
          ], '12 samples')
        ],
        practice: [
          pr('Add 0.25 mm and 0.6 mm. Give the total in mm.', 0.85, 'Write 0.6 as 0.60.', '0.25 + 0.60 = 0.85 mm.'),
          pr('Subtract 1.275 g from 2.5 g. Give the remainder in grams.', 1.225, 'Write 2.5 with three decimal places.', '2.500 − 1.275 = 1.225 g.'),
          pr('A plate is 1.2 cm by 0.35 cm. Find its area in cm².', 0.42, 'Multiply twelve by thirty-five, then restore three decimal places.', '12 × 35 = 420, giving 0.420 = 0.42 cm².'),
          pr('Round 0.6246 mm to three decimal places. Give the result in mm.', 0.625, 'Inspect the fourth decimal digit.', 'The fourth digit is six, so round the thousandths up: 0.625 mm.', {
            tol: 0.000001
          })
        ]
      }
    ]
  },
  'num-008': {
    predict: {
      q: 'Swing the unit square’s diagonal onto the number line. Now show fractions with denominators up to 40. What happens at the diagonal’s exact landing point?',
      options: ['A fraction finally lands exactly on it', 'The diagonal moves to the nearest fraction', 'Fractions lie nearby, but none lands exactly on it', 'The point disappears because it is not a fraction'],
      answer: 2,
      reveal: 'The point stays at √2. Fractions can approach it very closely, but no ratio of whole numbers equals it exactly, even if you allow larger denominators.'
    },
    parts: [
      {
        title: 'Roots name exact lengths',
        minutes: 20,
        explain: [
          'Squaring a number means multiplying it by itself. A square root reverses that question: which non-negative number, multiplied by itself, gives the stated value?',
          'Some roots are whole numbers. Others lie between them. You can locate a root by finding squares below and above its value, then trying decimals inside that interval.',
          'For the unit square in the scene, the diagonal has squared length two. We use that fact here; a later geometry class explains the right-triangle rule behind it. The exact length is called √2.'
        ],
        formulas: [
          ['Square root', '(\\sqrt a)^2=a\\quad(a\\ge0)'],
          ['Unit diagonal', 'd^2=2,\\quad d=\\sqrt2']
        ],
        examples: [
          ex('Find √36.', [
            ['Look for a non-negative number whose square is thirty-six.', '6\\times6=36'],
            ['Choose the non-negative root.', '\\sqrt{36}=6']
          ], '6'),
          ex('Locate √2 between two consecutive hundredths.', [
            ['Square the lower candidate.', '1.41\\times1.41=1.9881<2'],
            ['Square the upper candidate.', '1.42\\times1.42=2.0164>2']
          ], 'Between 1.41 and 1.42')
        ],
        practice: [
          pr('Find √49.', 7, 'Which non-negative number multiplied by itself gives forty-nine?', '7 × 7 = 49, so √49 = 7.'),
          pr('What is the greatest whole number below √10?', 3, 'Bracket ten between two whole-number squares.', '3² = 9 < 10 < 16 = 4², so the answer is 3.'),
          pr('What is the least whole number above √20?', 5, 'Compare the squares of four and five.', '4² = 16 < 20 < 25 = 5², so the answer is 5.'),
          pr('Give √2 rounded to two decimal places.', 1.41, 'First locate the root between 1.41 and 1.42.', '√2 ≈ 1.41421356, which rounds to 1.41.', {
            tol: 0.000001
          })
        ]
      },
      {
        title: 'Rational or irrational?',
        minutes: 20,
        explain: [
          'A rational number can be written as a fraction of integers with a non-zero denominator. Whole numbers qualify too: any integer can be written over one.',
          'A decimal that stops or repeats is rational. An irrational number cannot be such a fraction; its decimal never ends and never settles into a repeating block.',
          'For a non-negative whole number, its square root is rational exactly when that whole number is a perfect square. A rounded decimal for an irrational number is a rational approximation, rather than the exact number.'
        ],
        formulas: [
          ['Rational number', '\\frac pq,\\quad p,q\\in\\mathbb Z,\\quad q\\ne0'],
          ['Approximation', '\\sqrt2\\approx1.4142']
        ],
        examples: [
          ex('Classify √9, 0.25 and √5.', [
            ['Recognise a perfect square and a stopping decimal.', '\\sqrt9=3=\\frac31,\\quad0.25=\\frac14'],
            ['Five is not a whole-number square.', '2^2<5<3^2']
          ], '√9 and 0.25 are rational; √5 is irrational'),
          ex('Are π and 22/7 the same kind of number?', [
            ['A ratio of integers is rational.', '\\frac{22}{7}\\approx3.142857'],
            ['Pi is irrational; the two values only lie close together.', '\\pi\\approx3.141593']
          ], '22/7 is rational; π is irrational')
        ],
        practice: [
          pr('How many of these are rational: 3, 1/2, 0.125?', 3, 'Try writing each as a fraction.', '3 = 3/1, 1/2 is already a fraction and 0.125 = 1/8: 3 numbers.'),
          pr('How many of √2, √4 and √9 are irrational?', 1, 'Check for perfect squares.', '√4 = 2 and √9 = 3 are rational; only √2 is irrational: 1.'),
          pr('How many of 0.333… (threes forever), π, 22/7 and √16 are rational?', 3, 'A repeating decimal is rational.', '0.333… = 1/3, 22/7 is a fraction and √16 = 4; there are 3 rational numbers.'),
          pr('How many of √3, √8, √25 and √36 are irrational?', 2, 'Only roots of perfect squares give rational values here.', 'Three and eight are not perfect squares; twenty-five and thirty-six are. There are 2 irrational numbers.')
        ]
      },
      {
        title: 'Why no fraction equals √2',
        minutes: 25,
        explain: [
          'A proof explains why a claim must hold, beyond any finite list of decimal checks. To test whether √2 could be a fraction, suppose it is p/q in lowest terms.',
          'Squaring gives p² = 2q², so p² is even. An odd number has an odd square, so p must be even. Write p = 2k and substitute: q² = 2k². This forces q to be even too.',
          'Both being even means both share the factor two. That contradicts the starting claim that p/q was in lowest terms. The supposed fraction cannot exist.'
        ],
        formulas: [
          ['Suppose a fraction exists', '\\sqrt2=\\frac pq\\quad\\Rightarrow\\quad p^2=2q^2'],
          ['Both would be even', 'p=2k\\quad\\Rightarrow\\quad q^2=2k^2']
        ],
        examples: [
          ex('Show that an odd number of the form 2k + 1 has an odd square, using k = 3.', [
            ['Build the odd number.', '2\\times3+1=7'],
            ['Square it and separate pairs from the leftover one.', '7^2=49=2\\times24+1']
          ], '49 is odd'),
          ex('Why could an even-over-even fraction not be in lowest terms? Use 14/10.', [
            ['Find the shared factor.', '14=2\\times7,\\quad10=2\\times5'],
            ['Divide top and bottom by it.', '\\frac{14}{10}=\\frac75']
          ], 'The common factor 2 can be cancelled')
        ],
        practice: [
          pr('Square 5. What value do you obtain?', 25, 'Multiply the number by itself.', '5 × 5 = 25.'),
          pr('Write 9² as 2 × k + 1. What is k?', 40, 'Take away the unpaired one, then divide by two.', '9² = 81; (81 − 1) ÷ 2 = 40.'),
          pr('If p = 2k and k = 4, what is p²?', 64, 'Find p before squaring.', 'p = 8, so p² = 64.'),
          pr('In the √2 proof, what shared factor contradicts a fraction being in lowest terms when both numerator and denominator are even?', 2, 'Every even number has this factor.', 'Both can be divided by 2, so the shared factor is 2.')
        ]
      },
      {
        title: 'Exact numbers and usable approximations',
        minutes: 25,
        explain: [
          'Rational and irrational numbers together make the real numbers: all points on the number line. Every interval between distinct real numbers contains fractions, but that does not make every point a fraction.',
          'You can place a rational number between two others by taking their average. You can also approximate an irrational number more closely by keeping more decimal places.',
          'A square plate with a stated exact area may need an irrational side length. A cutter uses a rounded setting. State the precision and check whether the resulting size is inside the allowed range.'
        ],
        formulas: [
          ['Midpoint', 'm=\\frac{a+b}{2}'],
          ['Square side', 's=\\sqrt A']
        ],
        examples: [
          ex('Find a rational number between 1.41 and 1.42.', [
            ['Take their average.', '(1.41+1.42)\\div2=1.415'],
            ['Check the position.', '1.41<1.415<1.42']
          ], '1.415'),
          ex('A square aluminium plate must have area 50 cm². Give the side length to two decimal places.', [
            ['Take the square root of the area.', 's=\\sqrt{50}\\approx7.0710678\\,\\text{cm}'],
            ['Round the length for the cutter setting.', 's\\approx7.07\\,\\text{cm}']
          ], '7.07 cm')
        ],
        practice: [
          pr('Find the midpoint between 1.4 and 1.5.', 1.45, 'Add the endpoints and divide by two.', '(1.4 + 1.5) ÷ 2 = 1.45.'),
          pr('Find the midpoint between 1.41 and 1.42.', 1.415, 'The midpoint lies halfway across the gap.', '(1.41 + 1.42) ÷ 2 = 1.415.', {
            tol: 0.000001
          }),
          pr('A square plate has exact area 18 cm². Give its side length in cm to two decimal places.', 4.24, 'Take the square root, then round.', '√18 ≈ 4.2426407, so the side setting is 4.24 cm.', {
            tol: 0.000001
          }),
          pr('A cutter makes a square with side 7.07 cm. What area does it actually make, in cm²?', 49.9849, 'Square the rounded side rather than the exact root.', '7.07 × 7.07 = 49.9849 cm².')
        ]
      }
    ]
  },
  'num-009': {
    predict: {
      q: 'Start with the arrow z = 2 + i. Multiply it by i twice. Where will its tip finish?',
      options: ['Back at 2 + i', 'At −2 − i', 'At 4 + 2i', 'At 2 − i'],
      answer: 1,
      reveal: 'Each multiplication by i makes a quarter turn without changing length. Two quarter turns give −2 − i, the same result as multiplying by −1.'
    },
    parts: [
      {
        title: 'A second direction for numbers',
        minutes: 20,
        explain: [
          'No real number has a negative square. Introduce a new number i defined by i² = −1. A complex number has the form a + bi, with real numbers a and b.',
          'Draw a across a horizontal real axis and b up a vertical imaginary axis. The imaginary part is the real coefficient b, not the whole term bi. Negative b points down.',
          'The distance from the origin is the modulus, written |z|. Use the right-triangle rule on the two coordinates. Purely real numbers still belong to this plane: their imaginary coordinate is zero.'
        ],
        formulas: [
          ['Definition', 'i^2=-1,\\quad z=a+bi'],
          ['Modulus', '|z|=\\sqrt{a^2+b^2}']
        ],
        examples: [
          ex('Locate z = 3 − 4i and find its modulus.', [
            ['Read the coordinates.', 'a=3,\\quad b=-4'],
            ['Use the distance rule.', '|z|=\\sqrt{3^2+(-4)^2}=\\sqrt{25}=5']
          ], 'Point (3, −4); modulus 5'),
          ex('Solve x² + 9 = 0.', [
            ['Isolate the square.', 'x^2=-9'],
            ['Use the defining square of i and check both signs.', '(3i)^2=(-3i)^2=-9']
          ], 'x = 3i or −3i')
        ],
        practice: [
          pr('What is the imaginary part b of 2 + 5i?', 5, 'Read the coefficient of i.', 'In a + bi, b is 5.'),
          pr('What is the real part of −3 + 2i?', -3, 'Read the term without i.', 'The real term is −3.'),
          pr('Find the modulus of 3 + 4i.', 5, 'Square the coordinates, add and take the root.', '√(9 + 16) = √25 = 5.'),
          pr('For the root x = bi of x² + 16 = 0 with b > 0, what is b?', 4, 'Use i² = −1.', '(4i)² = −16, so the positive coefficient is 4.')
        ]
      },
      {
        title: 'Add, subtract and multiply',
        minutes: 25,
        explain: [
          'Add complex numbers by adding real parts together and imaginary parts together. Subtract them in the same way, taking care to subtract both parts of the second number.',
          'For multiplication, expand every term just as in algebra. Replace i² by −1, then collect the real and imaginary parts.',
          'A complex answer has two parts, so a practice question may ask for just one coefficient. Keep track of the full result before selecting the requested part.'
        ],
        formulas: [
          ['Addition', '(a+bi)+(c+di)=(a+c)+(b+d)i'],
          ['Multiplication', '(a+bi)(c+di)=(ac-bd)+(ad+bc)i']
        ],
        examples: [
          ex('Find (2 + 3i) + (1 − i).', [
            ['Combine real parts.', '2+1=3'],
            ['Combine imaginary coefficients.', '3+(-1)=2']
          ], '3 + 2i'),
          ex('Find (2 + i)(1 + i).', [
            ['Expand the four products.', '2+2i+i+i^2'],
            ['Replace i² and collect.', '2+3i-1=1+3i']
          ], '1 + 3i')
        ],
        practice: [
          pr('What is the real part of (3 + 2i) + (4 − 5i)?', 7, 'Add only the real terms.', 'The sum is 7 − 3i, whose real part is 7.'),
          pr('What is the imaginary part of (5 + 3i) − (2 + 7i)?', -4, 'Subtract the second imaginary coefficient.', 'The difference is 3 − 4i, whose imaginary part is −4.'),
          pr('What is the imaginary part of (1 + i)²?', 2, 'Expand, then replace i².', '1 + 2i + i² = 2i, so the imaginary part is 2.'),
          pr('What is the real part of (2 + 3i)(4 − i)?', 11, 'The product of the imaginary terms contributes to the real part.', '8 − 2i + 12i − 3i² = 11 + 10i, so the real part is 11.')
        ]
      },
      {
        title: 'Quarter turns and stretches',
        minutes: 25,
        explain: [
          'Multiplying a + bi by i gives −b + ai. On the plane this swaps the coordinates and reverses one sign: a quarter turn anticlockwise.',
          'Two quarter turns reverse an arrow, so i² = −1. Four return it to the start, so i⁴ = 1. The powers repeat in groups of four.',
          'Multiplying by 1 + i combines a turn of 45° with a stretch of √2. The same turn and stretch apply to every starting arrow. Such pictures help describe the phase and size of repeated motion.'
        ],
        formulas: [
          ['Quarter turn', '(a+bi)i=-b+ai'],
          ['Four-step cycle', 'i,\\quad-1,\\quad-i,\\quad1'],
          ['Turn and stretch', '|1+i|=\\sqrt2,\\quad\\arg(1+i)=45^\\circ']
        ],
        examples: [
          ex('Multiply z = 2 + i by i twice.', [
            ['Make the first quarter turn.', '(2+i)i=-1+2i'],
            ['Make the second quarter turn.', '(-1+2i)i=-2-i']
          ], '−2 − i'),
          ex('Start with z = 2 and multiply by 1 + i. Find the new modulus.', [
            ['Find the product.', '2(1+i)=2+2i'],
            ['Measure its length.', '|2+2i|=\\sqrt{4+4}=2\\sqrt2\\approx2.8284']
          ], '2√2 ≈ 2.8284')
        ],
        practice: [
          pr('How many degrees anticlockwise does multiplication by i turn a non-zero arrow?', 90, 'It makes one quarter of a full turn.', '360 ÷ 4 = 90°.'),
          pr('What is the real part after multiplying 2 + 3i by i?', -3, 'Use the coordinate rule (a, b) becomes (−b, a).', '(2 + 3i)i = −3 + 2i, so the real part is −3.'),
          pr('What is the real numerical value of i⁸?', 1, 'Group eight quarter turns into full turns.', 'i⁸ = (i⁴)² = 1² = 1.'),
          pr('Multiply an arrow of modulus 3 by 1 + i. What is the new modulus?', 4.24264068711929, 'Multiply its old length by the stretch factor.', 'The factor is √2, so the new modulus is 3√2 ≈ 4.24264.')
        ]
      },
      {
        title: 'Conjugates, division and vibration',
        minutes: 25,
        explain: [
          'The conjugate of a + bi is a − bi. It reflects the point across the real axis. Multiplying a number by its conjugate gives a² + b², a real number.',
          'To divide complex numbers, multiply the top and bottom by the conjugate of the denominator. The denominator becomes real and you can divide both parts by it.',
          'A simple undamped vibration model for a steel beam can lead to r² + ω² = 0. Its roots are ±ωi. Later lessons connect these imaginary roots to back-and-forth motion; here we only solve the equation.'
        ],
        formulas: [
          ['Conjugate product', '(a+bi)(a-bi)=a^2+b^2'],
          ['Division', '\\frac{a+bi}{c+di}=\\frac{(a+bi)(c-di)}{c^2+d^2}\\quad(c+di\\ne0)']
        ],
        examples: [
          ex('Find (3 + 4i)/(1 + i).', [
            ['Multiply by the conjugate above and below.', '\\frac{(3+4i)(1-i)}{(1+i)(1-i)}'],
            ['Expand and replace i².', '\\frac{7+i}{2}'],
            ['Divide both parts by two.', '3.5+0.5i']
          ], '3.5 + 0.5i'),
          ex('A beam model gives r² + 4 = 0. Find both roots.', [
            ['Move the constant to the other side.', 'r^2=-4'],
            ['Check the two imaginary roots.', '(2i)^2=(-2i)^2=-4']
          ], 'r = ±2i')
        ],
        practice: [
          pr('What is the imaginary part of the conjugate of 2 + 3i?', -3, 'Reverse the sign of the imaginary term.', 'The conjugate is 2 − 3i, so its imaginary part is −3.'),
          pr('Find the real value of (2 + 3i)(2 − 3i).', 13, 'A conjugate product is a sum of squares.', '2² + 3² = 4 + 9 = 13.'),
          pr('What is the real part of (4 + 2i)/(1 + i)?', 3, 'Multiply top and bottom by 1 − i.', '(4 + 2i)(1 − i)/2 = (6 − 2i)/2 = 3 − i; the real part is 3.'),
          pr('A model gives r² + 25 = 0. Write the root with positive imaginary part as bi. What is b?', 5, 'Find the positive square root of twenty-five.', 'r = 5i gives r² = −25, so b = 5.')
        ]
      }
    ]
  },
  'num-010': {
    predict: {
      q: 'The scene has five number-family boxes inside one another: ℕ inside ℤ inside ℚ inside ℝ inside ℂ. You choose 0.333… with threes repeating forever. How many boxes should light up?',
      options: ['One: it is only a fraction', 'Two: it is real and complex', 'Three: rational, real and complex', 'All five: its digits are whole numbers'],
      answer: 2,
      reveal: 'Three boxes light up. The repeating decimal equals 1/3, so it belongs to ℚ, ℝ and ℂ, while it is neither an integer nor a counting number.'
    },
    parts: [
      {
        title: 'Read the number-family boxes',
        minutes: 20,
        explain: [
          'A set is a collection. Curly brackets list its members, and ∈ means “is a member of”. The sign ∉ means “is not a member of”. A subset is a set whose members all belong to a larger set.',
          'Use ℕ for counting numbers starting at one, ℤ for integers including zero and negatives, ℚ for fractions, and ℝ for the real number line. Each family includes all the earlier ones.',
          'The scene also shows ℂ, the complex family. It contains all reals plus numbers with an imaginary part, such as 2 + i. You will calculate with those in the complex-number class. For now, use the family relationships.'
        ],
        formulas: [
          ['Membership', '3\\in\\mathbb N,\\quad-3\\notin\\mathbb N'],
          ['Family inclusion', '\\mathbb N\\subset\\mathbb Z\\subset\\mathbb Q\\subset\\mathbb R\\subset\\mathbb C']
        ],
        examples: [
          ex('Which of the five families contain −3?', [
            ['It is an integer, but not a counting number.', '-3\\in\\mathbb Z,\\quad-3\\notin\\mathbb N'],
            ['Include all the larger families.', '-3\\in\\mathbb Q,\\mathbb R,\\mathbb C']
          ], 'Four families: ℤ, ℚ, ℝ and ℂ'),
          ex('Which families contain √2?', [
            ['It is real but cannot be written as a fraction.', '\\sqrt2\\in\\mathbb R,\\quad\\sqrt2\\notin\\mathbb Q'],
            ['Every real number also belongs to the complex family.', '\\sqrt2\\in\\mathbb C']
          ], 'Two families: ℝ and ℂ')
        ],
        practice: [
          pr('How many of the five families ℕ, ℤ, ℚ, ℝ, ℂ contain 7?', 5, 'Membership in an inner box includes every outer box.', 'Seven is a counting number, so it belongs to all 5 families.'),
          pr('How many of those five families contain 0, using ℕ = {1, 2, 3, …}?', 4, 'Zero starts in the integers here.', 'Zero belongs to ℤ, ℚ, ℝ and ℂ: 4 families.'),
          pr('How many of those five families contain 3/4?', 3, 'A non-whole fraction starts in ℚ.', 'It belongs to ℚ, ℝ and ℂ: 3 families.'),
          pr('How many of those five families contain π?', 2, 'Pi is irrational and real.', 'Pi belongs to ℝ and ℂ: 2 families.')
        ]
      },
      {
        title: 'Sets you can combine',
        minutes: 20,
        explain: [
          'A set lists distinct members. Repeating the same member does not make the set larger. The empty set, written ∅, has no members.',
          'The union A ∪ B contains anything in either set. The intersection A ∩ B contains only things in both. A set difference A ∖ B keeps members of A that are absent from B.',
          'These ideas help sort samples. One set might contain the steel samples and another all samples already tested. Their intersection contains the tested steel samples.'
        ],
        formulas: [
          ['Union and intersection', 'A\\cup B:\\text{ either set},\\quad A\\cap B:\\text{ both sets}'],
          ['Number of members', '|A|=\\text{number of distinct members of }A']
        ],
        examples: [
          ex('A = {1, 2, 3} and B = {3, 4}. Find their union and its size.', [
            ['Gather members from either set, listing three only once.', 'A\\cup B=\\{1,2,3,4\\}'],
            ['Count distinct members.', '|A\\cup B|=4']
          ], 'Union {1, 2, 3, 4}; size 4'),
          ex('Steel samples are S = {1, 2, 4}; tested samples are T = {2, 3, 4}. How many tested steel samples are there?', [
            ['Keep labels appearing in both sets.', 'S\\cap T=\\{2,4\\}'],
            ['Count the shared members.', '|S\\cap T|=2']
          ], '2 samples')
        ],
        practice: [
          pr('How many distinct members are in {2, 2, 3, 5}?', 3, 'A repeated member is counted once.', 'The distinct members are 2, 3 and 5: 3 members.'),
          pr('How many members are in {1, 2} ∪ {2, 3}?', 3, 'Combine the sets without duplicating two.', 'The union is {1, 2, 3}, so it has 3 members.'),
          pr('How many members are in {1, 3, 5} ∩ {2, 4, 6}?', 0, 'Look for members appearing in both.', 'No member is shared, so the intersection has 0 members.', {
            tol: 0
          }),
          pr('S = {1, 2, 3, 4, 5} lists steel samples and T = {2, 4, 6} lists tested samples. How many steel samples remain untested?', 3, 'Keep members of S that are absent from T.', 'S ∖ T = {1, 3, 5}, so 3 steel samples remain untested.')
        ]
      },
      {
        title: 'Every, some and if',
        minutes: 25,
        explain: [
          'The symbol ∀ means “for every”. The symbol ∃ means “there exists at least one”. One exception disproves a claim about every member, while one successful member proves an existence claim.',
          'The arrow ⇒ means “implies”: whenever the first statement is true, the second must be true. The reverse direction needs its own check. The double arrow ⇔ says both directions hold.',
          'Read ≥ as “at least” and ≤ as “at most”; both allow equality. In a materials requirement, “every sample passes” is stronger than “at least one sample passes”.'
        ],
        formulas: [
          ['For every', '\\forall s\\in S,\\quad H(s)\\ge50'],
          ['There exists', '\\exists s\\in S:\\quad H(s)\\ge50'],
          ['Implication', 'x>3\\Rightarrow x>1']
        ],
        examples: [
          ex('Three samples have hardnesses 48, 52 and 55 HRC. Does every sample meet H ≥ 50 HRC?', [
            ['Check each against the inclusive threshold.', '48<50,\\quad52\\ge50,\\quad55\\ge50'],
            ['One failed sample disproves “every”.', '\\text{failures}=1']
          ], 'No; one sample fails'),
          ex('How many integers in {1, 2, 3, 4, 5} satisfy x > 3?', [
            ['Translate the strict inequality.', '\\text{larger than three, excluding three}'],
            ['List and count the matches.', '\\{4,5\\},\\quad\\text{count}=2']
          ], '2 integers')
        ],
        practice: [
          pr('How many members of {1, 2, 3, 4} satisfy x ≥ 3?', 2, 'Equality is included.', 'Both 3 and 4 qualify: 2 members.'),
          pr('Hardnesses are 50, 53 and 47 HRC. How many samples satisfy H ≥ 50 HRC?', 2, 'The threshold itself passes.', '50 and 53 pass; 47 fails. There are 2 passing samples.'),
          pr('For S = {−2, −1, 0, 1, 2}, how many members disprove the claim “∀ x ∈ S, x > 0”?', 3, 'Count every value that is not strictly positive.', '−2, −1 and 0 are exceptions: 3 members.'),
          pr('Over x ∈ {1, 2, 3, 4}, how many values disprove the reversed claim “x > 1 ⇒ x > 3”?', 2, 'Look for a true first statement and a false second statement.', 'At x = 2 and x = 3, x > 1 holds but x > 3 fails: 2 exceptions.')
        ]
      },
      {
        title: 'Read a rule, a sum and a change',
        minutes: 25,
        explain: [
          'The notation f(x) means the output of a rule f when its input is x. It does not mean f multiplied by x. Substitute the input everywhere x appears in the rule.',
          'A capital sigma, Σ, means add the stated terms. The lower and upper limits tell you the first and last whole-number inputs to use, including both. A factorial, such as 4!, multiplies the positive integers from one up to that number.',
          'The symbol Δ means a change: final minus initial. Absolute-value bars |x| give distance from zero, ignoring sign. The sign ≈ marks an approximation; it is different from exact equality.'
        ],
        formulas: [
          ['A rule', 'f(x)=2x+1\\quad\\Rightarrow\\quad f(3)=7'],
          ['A sum and a factorial', '\\sum_{k=1}^{4}k=1+2+3+4,\\quad4!=1\\times2\\times3\\times4'],
          ['Change and size', '\\Delta T=T_{\\mathrm{final}}-T_{\\mathrm{initial}},\\quad|-5|=5']
        ],
        examples: [
          ex('A sample mass rule is m(n) = 2n + 1 grams. Find m(4).', [
            ['Replace n with four.', 'm(4)=2\\times4+1'],
            ['Evaluate and keep the unit.', 'm(4)=9\\,\\text{g}']
          ], '9 g'),
          ex('Evaluate the sum of 2k from k = 1 through 4.', [
            ['Write a term for each input, including both ends.', '\\sum_{k=1}^{4}2k=2+4+6+8'],
            ['Add the terms.', '2+4+6+8=20']
          ], '20')
        ],
        practice: [
          pr('If f(x) = x² + 1, what is f(3)?', 10, 'Replace x with three before calculating.', 'f(3) = 3² + 1 = 10.'),
          pr('Find the absolute value |−7|.', 7, 'Measure distance from zero.', '−7 is seven units from zero, so |−7| = 7.'),
          pr('A sample cools from 80 °C to 35 °C. Find ΔT = final − initial, in °C.', -45, 'Keep the final temperature first.', 'ΔT = 35 − 80 = −45 °C.'),
          pr('Evaluate 3! + the sum of k from k = 1 through 3.', 12, 'Work out the product and the sum separately.', '3! = 6 and 1 + 2 + 3 = 6; together they give 12.')
        ]
      }
    ]
  }
};
