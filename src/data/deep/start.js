// "Start here" level: each class split into parts. Practice mixes
// pick-an-answer questions (first option correct, shown shuffled) with typed
// numbers. Step formulas are real TeX or left out.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution) => ({ q, options, hint, solution });

export const START = {
  // ---------------------------------------------------------------------------
  'start-001': {
    predict: {
      q: 'You learn 20 new words today and never look at them again. Roughly when will you lose the most of them?',
      options: ['In the first day', 'Evenly, a few each week', 'Only after about a month', 'Never, if you understood them'],
      answer: 0,
      reveal: 'Ebbinghaus found a steep drop in the first hours and day, then a long slow tail. That is why the first review should come soon.',
    },
    parts: [
      {
        title: 'The forgetting curve',
        minutes: 12,
        explain: [
          'Ebbinghaus learned lists until he could recite them, waited, and timed how long relearning took. The time he saved is a measure of what was still in memory.',
          'His savings fell from about 58% after 20 minutes to 44% after an hour, 34% after a day and about 21% after a month. Notice the shape: half of the month’s loss happens in the first hour.',
          'This is normal for everyone. Forgetting a class by the next day does not mean you did not understand it; it means it has not been reviewed yet.',
        ],
        formulas: [['Savings', '\\text{saved} = \\dfrac{T_{\\text{first}} - T_{\\text{relearn}}}{T_{\\text{first}}} \\times 100\\%']],
        examples: [
          ex('First learning took 20 minutes. Relearning a day later took 13 minutes. What were the savings?', [['Time saved.', '20 - 13 = 7 \\text{ min}'], ['Divide by the first time.', '\\dfrac{7}{20} = 0.35 = 35\\%']], '35%'),
          ex('Savings fell from 58% at 20 minutes to 34% at one day, and to 21% at a month. How much was lost in the first day compared with the rest of the month?', [['First day (from 20 minutes).', '58 - 34 = 24 \\text{ points}'], ['Rest of the month.', '34 - 21 = 13 \\text{ points}']], 'Almost twice as much in the first day as in the next 30 days'),
        ],
        practice: [
          pr('A list took 30 minutes to learn and 18 minutes to relearn. What percent was saved?', 40, 'Time saved ÷ first time.', '(30 − 18) ÷ 30 = 12 ÷ 30 = 0.4 = 40%.'),
          pr('A list took 10 minutes to learn. Savings after a week were 25%. How many minutes did relearning take?', 7.5, '25% of 10 minutes is saved.', '10 × 0.25 = 2.5 min saved, so 10 − 2.5 = 7.5 min.'),
          ch('What did Ebbinghaus measure memory by?', ['How much faster he could learn a list again', 'How many syllables he could guess', 'How tired he felt', 'Asking friends'], 'He timed something.', 'Relearning time: the savings method.'),
          ch('You forgot most of yesterday’s class. What does the forgetting curve suggest?', ['This is normal: review it today and it will fade more slowly', 'You are bad at the subject', 'You should start the subject again', 'Reviewing never helps'], 'Everyone’s curve drops fast.', 'Forgetting is normal; a review flattens the next drop.'),
        ],
      },
      {
        title: 'Spacing: reviews that flatten the curve',
        minutes: 12,
        explain: [
          'Each time you bring something back to mind, the next drop is gentler. So reviews can come further and further apart.',
          'Ebbinghaus found repetitions spread over several days worked better than the same number in one sitting. Hundreds of later studies agree: this is the spacing effect.',
          'This app’s Review tab uses a ladder: a question returns after 1 day, then 3, 10, 30 and 90 days. Answer it wrong and it drops back to the start.',
        ],
        formulas: [['The review ladder', '1 \\to 3 \\to 10 \\to 30 \\to 90 \\text{ days}']],
        examples: [
          ex('You pass a class on 1 March. Using the ladder 1, 3, 10 days, on which dates do the first three reviews fall?', [['First gap: 1 day.', '\\text{2 March}'], ['Then 3 days, then 10 days.', '\\text{5 March},\\ \\text{15 March}']], '2, 5 and 15 March'),
          ex('Plan A: 2 hours on Sunday. Plan B: 40 minutes on Sunday, Tuesday and Thursday. Same total? Which is better?', [['Total of plan B.', '3 \\times 40 = 120 \\text{ min} = 2 \\text{ h}'], ['Same time, but B is spaced.', null]], 'Plan B: same time, spaced over days'),
        ],
        practice: [
          pr('Using the ladder 1, 3, 10, 30 days, how many days after you first pass a class is the fourth review? (Add the gaps.)', 44, 'Each gap starts from the last review.', '1 + 3 + 10 + 30 = 44 days.'),
          ch('Which plan uses the spacing effect best?', ['Four 15-minute reviews on four different days', 'One 60-minute session tonight', 'Rereading the class four times now', 'Waiting three months, then one long session'], 'Spread or crammed?', 'Same hour, spread over days.'),
          ch('Why can each review wait longer than the one before?', ['Each review makes the next drop gentler', 'You forget faster each time', 'Memory is full', 'The ladder is random'], 'Look at the curve after each review.', 'Each recall slows the next forgetting.'),
          pr('A Review question comes back after 1, 3, 10, 30 and 90 days. How many reviews is that in all?', 5, 'Count the steps.', '1, 3, 10, 30, 90: five reviews.'),
        ],
      },
      {
        title: 'Making it a habit',
        minutes: 10,
        explain: [
          'A plan you actually follow beats a perfect plan you don’t. Short daily sessions are easier to keep than long weekly ones, and they space your study automatically.',
          'A good daily order in this app: do the reviews that are due first (a few minutes), then your next class. Reviews are short because the ladder keeps them few.',
        ],
        formulas: [['A study day', '\\text{reviews due} \\;\\to\\; \\text{next class} \\;\\to\\; \\text{notes}']],
        examples: [
          ex('You can study 5 days a week for 45 minutes. Reviews take about 10 minutes. How much time is left each day for new classes?', [['Subtract the reviews.', '45 - 10 = 35 \\text{ min}'], ['Over a week.', '5 \\times 35 = 175 \\text{ min}']], '35 minutes a day, about 3 hours a week'),
          ex('A class takes about 40 minutes. With 35 minutes a day for new work, how many days per class?', [['Compare.', '40 > 35'], ['So each class spans two short days, or one longer one.', null]], 'About one class every one to two days'),
        ],
        practice: [
          pr('You study 30 minutes a day, 6 days a week. How many hours a week is that?', 3, '30 × 6 minutes, then ÷ 60.', '180 minutes = 3 hours.'),
          ch('What should come first in a study session in this app?', ['The reviews that are due', 'A brand-new class', 'Reading the Library', 'Changing the theme'], 'They are short and time-sensitive.', 'Due reviews first, then new work.'),
          ch('Which is easier to keep up for months?', ['20 minutes every day', '5 hours once a month', 'Only before exams', 'Whenever you feel like it'], 'Habits like small and regular.', 'Small daily sessions also space your study.'),
          pr('Reviews take 8 minutes and a class 40. How many minutes is one full study day?', 48, 'Add them.', '8 + 40 = 48 minutes.'),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'start-002': {
    predict: {
      q: 'Which is bigger: 0.5 or 0.45?',
      options: ['0.5', '0.45', 'They are equal', 'You can’t compare them'],
      answer: 0,
      reveal: '0.5 is 5 tenths = 50 hundredths, and 0.45 is 45 hundredths. More digits does not mean bigger: compare place by place.',
    },
    parts: [
      {
        title: 'Place value and the four operations',
        minutes: 15,
        explain: [
          'In our digits, each place is worth ten times the place to its right: ones, tens, hundreds, thousands. So 4,073 is 4 thousands, 0 hundreds, 7 tens and 3 ones. The 0 holds an empty place.',
          'Adding and subtracting line up the places. Multiplying is repeated adding: 4 × 3 is 3 + 3 + 3 + 3. Dividing is sharing equally, or asking “how many groups?”: 12 ÷ 3 = 4.',
          'If any of this feels new, that is fine: weeks 1–3 of your program teach counting, writing numbers, zero and the four operations from the start.',
        ],
        formulas: [
          ['Place value', '4073 = 4 \\times 1000 + 0 \\times 100 + 7 \\times 10 + 3'],
          ['Times and divide undo each other', '4 \\times 3 = 12 \\iff 12 \\div 3 = 4'],
        ],
        examples: [
          ex('Add 368 + 257.', [['Ones: 8 + 7 = 15. Write 5, carry 1 ten.', '8 + 7 = 15'], ['Tens: 6 + 5 + 1 = 12. Write 2, carry 1 hundred. Hundreds: 3 + 2 + 1 = 6.', '368 + 257 = 625']], '625'),
          ex('A box holds 24 tiles. How many boxes for 168 tiles?', [['How many 24s make 168?', '168 \\div 24'], ['Try 7: 7 × 24 = 168.', '168 \\div 24 = 7']], '7 boxes'),
        ],
        practice: [
          pr('What is 1,000 − 1?', 999, 'Borrow across the zeros.', '999.'),
          pr('Work out 35 × 4.', 140, '30 × 4 plus 5 × 4.', '120 + 20 = 140.'),
          pr('Share 96 sacks equally among 8 trucks. How many per truck?', 12, '8 × ? = 96.', '8 × 12 = 96, so 12.'),
          ch('In 5,208, what is the 2 worth?', ['200', '20', '2', '2,000'], 'Third place from the right.', 'Hundreds place: 200.'),
        ],
      },
      {
        title: 'Fractions',
        minutes: 15,
        explain: [
          'A fraction like 3/4 cuts a whole into 4 equal pieces (the bottom, or denominator) and takes 3 of them (the top, or numerator). It is also 3 ÷ 4.',
          'The same amount has many names: 1/2 = 2/4 = 3/6. Multiply or divide the top and bottom by the same number and the amount does not change.',
          'To add or subtract, the pieces must be the same size, so first give both fractions the same bottom. To multiply, multiply tops and bottoms. Week 4 tells the story of fractions from Egypt onwards.',
        ],
        formulas: [
          ['Same amount, new name', '\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k}'],
          ['Adding', '\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}'],
          ['Multiplying', '\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{6}{12} = \\dfrac{1}{2}'],
        ],
        examples: [
          ex('Work out 3/4 − 1/8.', [['Same bottoms: 3/4 = 6/8.', '\\dfrac{3}{4} = \\dfrac{6}{8}'], ['Subtract the tops.', '\\dfrac{6}{8} - \\dfrac{1}{8} = \\dfrac{5}{8}']], '5/8'),
          ex('A recipe needs 2/3 cup of sand per batch. How much for half a batch?', [['Half of means times one half.', '\\dfrac{1}{2} \\times \\dfrac{2}{3}'], ['Multiply tops and bottoms.', '\\dfrac{2}{6} = \\dfrac{1}{3}']], '1/3 cup'),
        ],
        practice: [
          pr('Work out 1/4 + 1/2. (You can type a fraction like 3/4.)', 0.75, 'Change 1/2 to quarters.', '1/4 + 2/4 = 3/4.'),
          pr('Work out 2/5 × 10.', 4, 'Two fifths of ten.', '10 ÷ 5 × 2 = 4.'),
          pr('What is 5/6 − 1/3?', 0.5, 'Change 1/3 to sixths.', '5/6 − 2/6 = 3/6 = 1/2.'),
          ch('Which fraction is the same as 6/8?', ['3/4', '2/3', '6/10', '4/6'], 'Divide top and bottom by 2.', '6 ÷ 2 = 3 and 8 ÷ 2 = 4.'),
        ],
      },
      {
        title: 'Decimals and percent',
        minutes: 15,
        explain: [
          'A decimal carries place value past the ones: 0.75 is 7 tenths and 5 hundredths. To turn a fraction into a decimal, divide: 3 ÷ 4 = 0.75.',
          'Percent means “out of a hundred”, so 75% is 75/100 = 0.75. To find a percent of something, change it to a decimal and multiply: 20% of 150 is 0.2 × 150 = 30.',
          'Compare decimals place by place, not by how many digits they have: 0.5 is bigger than 0.45. Week 5 tells how decimals were invented.',
        ],
        formulas: [
          ['Three names', '\\dfrac{3}{4} = 0.75 = 75\\%'],
          ['A percent of something', 'p\\% \\text{ of } N = \\dfrac{p}{100} \\times N'],
        ],
        examples: [
          ex('Write 3/5 as a decimal and a percent.', [['Divide.', '3 \\div 5 = 0.6'], ['Times 100 for percent.', '0.6 = 60\\%']], '0.6 and 60%'),
          ex('A steel rod is 12% chromium by mass. How much chromium is in 50 kg?', [['12% as a decimal.', '0.12'], ['Multiply.', '0.12 \\times 50 = 6 \\text{ kg}']], '6 kg'),
        ],
        practice: [
          pr('What is 15% of 200?', 30, '0.15 × 200.', '30.'),
          pr('Write 1/8 as a decimal.', 0.125, 'Divide 1 by 8.', '1 ÷ 8 = 0.125.'),
          pr('A price of ₱400 goes up by 10%. What is the new price, in pesos?', 440, '10% of 400 is 40.', '400 + 40 = 440.'),
          ch('Which is largest?', ['0.6', '0.59', '0.509', '0.06'], 'Compare tenths first.', '0.6 has 6 tenths; the others have 5 or 0.'),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'start-003': {
    predict: {
      q: 'Group A reads a passage four times. Group B reads it once and then tries three times to write down what they remember. Who remembers more a week later?',
      options: ['Group B, who practised recalling', 'Group A, who read it more', 'Both the same', 'Neither remembers anything'],
      answer: 0,
      reveal: 'In Roediger and Karpicke’s 2006 study the recall group kept 61% a week later; the rereaders kept 40%, even though they felt more confident.',
    },
    parts: [
      {
        title: 'Recall beats rereading',
        minutes: 12,
        explain: [
          'When you reread, the words are in front of you and nothing is asked of memory. When you try to recall, your brain has to find the idea again, and that search is what strengthens it.',
          'Gates found this in 1917 with school children; Roediger and Karpicke found it again in 2006 with college students. Five minutes later, rereading looked slightly better (83% against 71%). A week later, recall won clearly (61% against 40%).',
        ],
        formulas: [['A week later (2006)', '\\text{reread } 40\\% \\quad \\text{recall practice } 61\\%']],
        examples: [
          ex('By how many percentage points did the recall group beat the rereaders after a week?', [['Subtract.', '61 - 40 = 21'], ['That is percentage points, not percent.', null]], '21 points'),
          ex('How much did each group lose between 5 minutes and a week?', [['Rereaders.', '83 - 40 = 43 \\text{ points}'], ['Recall group.', '71 - 61 = 10 \\text{ points}']], 'Rereaders lost 43 points; the recall group only 10'),
        ],
        practice: [
          pr('Five minutes after study, rereaders scored 83% and the recall group 71%. By how many points did rereading lead then?', 12, 'Subtract.', '83 − 71 = 12 points.'),
          pr('Out of a 50-fact passage, the recall group remembered 61% after a week. About how many facts is that?', 30.5, '0.61 × 50.', '0.61 × 50 = 30.5, about 30 facts.', { tol: 0.6 }),
          ch('Why does recalling strengthen memory?', ['Searching for the idea and finding it makes it easier to find next time', 'It takes less effort than reading', 'It adds new facts', 'It doesn’t; it only feels hard'], 'Think about the search.', 'Each successful search strengthens the path to it.'),
          ch('In 1917 Gates studied…', ['Children reciting versus reading biographies', 'Students using laptops', 'Rats in mazes', 'Ebbinghaus’s syllables'], 'Columbia, New York.', 'He compared reading with reciting.'),
        ],
      },
      {
        title: 'The illusion of knowing',
        minutes: 10,
        explain: [
          'In the 2006 study the rereaders predicted they would remember more than the recall group did. Reading something again feels smooth, and smooth feels like knowing.',
          'A self-test breaks the illusion: you find out exactly what you can and cannot produce. A wrong answer is useful, because it shows where to look.',
        ],
        formulas: [['A quick check', '\\text{can I say it with the book closed?}']],
        examples: [
          ex('You read the class summary and think “I know this.” How do you check?', [['Close the class.', null], ['Write the three main ideas from memory, then compare.', null]], 'Recall it with the class closed, then check'),
          ex('You got 3 of 5 drill questions right. What now?', [['Find the two you missed and read only those explanations.', null], ['Try them again tomorrow, from memory.', null]], 'Study the misses, then test again later'),
        ],
        practice: [
          ch('Which feeling is a poor guide to whether you know something?', ['“This looks familiar”', '“I just explained it without looking”', '“I got the question right with no hints”', '“I can do a new example”'], 'Familiar is not recalled.', 'Familiarity comes from rereading; the others come from recall.'),
          ch('You got a quiz question wrong. What is the most useful reaction?', ['Read the explanation and try a similar question later', 'Skip it', 'Retry until you remember which option was right', 'Decide you are bad at it'], 'Errors point to the gap.', 'Fix the gap, then test again with spacing.'),
          ch('Which is a self-test?', ['Covering your notes and saying the main idea', 'Highlighting the text', 'Reading the summary twice', 'Copying the formula'], 'Something must come out of your head.', 'Only the first asks memory to produce.'),
          pr('You can recall 4 of the 10 key ideas from a class. What percent is that?', 40, '4 ÷ 10.', '40%.'),
        ],
      },
      {
        title: 'Ways to test yourself',
        minutes: 10,
        explain: [
          'You don’t need a teacher to test yourself. A blank page (“write all you remember”), flashcards with a question on one side, and explaining the idea aloud to an imaginary friend all count.',
          'Mix in spacing: test yourself the next day and a few days later, not just right after. Every class here ends in drills and a quiz, and the Review tab brings questions back on a schedule.',
        ],
        formulas: [['The combination', '\\text{recall} + \\text{spacing} = \\text{lasting memory}']],
        examples: [
          ex('Turn the note “Ebbinghaus measured forgetting with relearning time” into a self-test card.', [['Front: a question.', null], ['Back: the answer.', null]], 'Front: “How did Ebbinghaus measure forgetting?” Back: “By how much faster he relearned a list.”'),
          ex('You have 20 minutes. Plan a recall session.', [['5 minutes: blank page, write all you remember.', null], ['10 minutes: check and fix; 5 minutes: redo the missed questions.', null]], 'Blank page, check, redo'),
        ],
        practice: [
          ch('Which flashcard tests recall best?', ['Front: “What does the spacing effect say?” Back: the answer', 'Front and back both show the full answer', 'A card with the whole page copied', 'A card with only a picture of the book'], 'A question on the front.', 'It makes you produce the answer.'),
          ch('When should you test yourself on today’s class again?', ['Tomorrow, and again a few days later', 'Only right now', 'Never', 'Only the night before the final'], 'Combine with spacing.', 'Spaced recall.'),
          ch('Explaining an idea aloud without notes is…', ['A form of retrieval practice', 'Rereading', 'A waste of time', 'Only for teachers'], 'Does it come from memory?', 'Yes: you produce it from memory.'),
          pr('A blank-page session: you wrote 12 ideas; the class had 16. How many did you miss?', 4, 'Subtract.', '16 − 12 = 4.'),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'start-004': {
    predict: {
      q: 'What is 2 + 3 × 4?',
      options: ['14', '20', '24', '9'],
      answer: 0,
      reveal: 'The agreed order says multiply before adding: 3 × 4 = 12, then 2 + 12 = 14. If you wanted 20 you would write (2 + 3) × 4.',
    },
    parts: [
      {
        title: 'Symbols are shorthand for words',
        minutes: 12,
        explain: [
          'Every symbol replaces words: + “plus”, − “minus”, × “times”, ÷ “divided by”, = “is equal to”, < “is less than”, > “is greater than”. The open side of < or > faces the bigger number.',
          'A long line of math is just a sentence. Reading it aloud in words is the best way to understand it, and it is how mathematicians wrote before 1557.',
          'A fraction bar also means divide: 12/4 or a stacked fraction both read “12 divided by 4”.',
        ],
        formulas: [
          ['The everyday set', '+\\ \\text{plus} \\quad -\\ \\text{minus} \\quad \\times\\ \\text{times} \\quad \\div\\ \\text{divided by}'],
          ['Comparing', '3 < 5 \\quad \\text{“three is less than five”}'],
        ],
        examples: [
          ex('Read aloud: 7 × 8 = 56.', [['Symbol by symbol.', '7 \\times 8 = 56'], ['In words.', '\\text{“seven times eight is equal to fifty-six”}']], 'Seven times eight equals fifty-six'),
          ex('Write in symbols: “ten divided by two is greater than four”.', [['Divided by is ÷; greater than is >.', null], ['Put it together.', '10 \\div 2 > 4']], '10 ÷ 2 > 4'),
        ],
        practice: [
          ch('How do you read “9 > 2”?', ['Nine is greater than two', 'Nine is less than two', 'Nine minus two', 'Nine goes into two'], 'The open side faces the bigger number.', '9 is on the open side.'),
          pr('Work out 18 ÷ 3.', 6, 'How many 3s in 18?', '6.'),
          pr('What number makes “? − 4 = 9” true?', 13, 'What minus 4 gives 9?', '13 − 4 = 9.'),
          ch('Which symbol did Recorde invent in 1557?', ['=', '+', '÷', 'x'], 'Two parallel lines.', 'The equals sign.'),
        ],
      },
      {
        title: 'Letters for numbers',
        minutes: 12,
        explain: [
          'A letter stands for a number. It may be one we don’t know yet (an unknown) or one that changes (a variable). Descartes made x the usual unknown in 1637.',
          'Two things written side by side are multiplied: 3x means 3 × x, and bh means b × h. A small raised number is a power: x² means x × x.',
          'To find the value of an expression, replace each letter with its number and work it out.',
        ],
        formulas: [
          ['Side by side means times', '3x = 3 \\times x'],
          ['Powers', 'x^2 = x \\times x \\qquad x^3 = x \\times x \\times x'],
        ],
        examples: [
          ex('Find 4x + 1 when x = 5.', [['Replace x with 5.', '4 \\times 5 + 1'], ['Times first, then add.', '20 + 1 = 21']], '21'),
          ex('Find a² when a = 7.', [['Square means times itself.', '7 \\times 7'], ['Multiply.', '49']], '49'),
        ],
        practice: [
          pr('Find 2y − 3 when y = 10.', 17, 'Replace y, times first.', '2 × 10 − 3 = 17.'),
          pr('Find x² when x = 6.', 36, 'x × x.', '6 × 6 = 36.'),
          pr('Find b × h ÷ 2 when b = 8 and h = 3.', 12, 'Multiply, then halve.', '8 × 3 = 24, then 24 ÷ 2 = 12.'),
          ch('What does 5n mean?', ['5 times n', '5 plus n', 'A five-digit number', '5 to the power n'], 'Side by side.', 'Side by side means multiply.'),
        ],
      },
      {
        title: 'The order of operations',
        minutes: 14,
        explain: [
          'So that a line has only one meaning, everyone works it out in the same order: brackets first, then powers, then × and ÷ from left to right, then + and − from left to right.',
          'Brackets let you change the order on purpose: 2 + 3 × 4 = 14, but (2 + 3) × 4 = 20.',
          'Calculators follow the same rules. Predict the answer before pressing the equals key, so a slip is easy to spot.',
        ],
        formulas: [
          ['The order', '(\\,) \\;\\to\\; x^2 \\;\\to\\; \\times\\,\\div \\;\\to\\; +\\,-'],
          ['Example', '3 + 2 \\times 5^2 = 3 + 2 \\times 25 = 3 + 50 = 53'],
        ],
        examples: [
          ex('Work out 20 − 3 × (4 + 1).', [['Brackets first.', '4 + 1 = 5'], ['Then times, then minus.', '20 - 3 \\times 5 = 20 - 15 = 5']], '5'),
          ex('Work out 8 ÷ 2 × 4.', [['× and ÷ go left to right.', '8 \\div 2 = 4'], ['Then.', '4 \\times 4 = 16']], '16'),
        ],
        practice: [
          pr('Work out 6 + 4 × 2.', 14, 'Times first.', '4 × 2 = 8, then 6 + 8 = 14.'),
          pr('Work out (6 + 4) × 2.', 20, 'Brackets first.', '10 × 2 = 20.'),
          pr('Work out 2 × 3².', 18, 'Power before times.', '3² = 9, then 2 × 9 = 18.'),
          pr('Work out 12 − 6 ÷ 3 + 1.', 11, 'Divide first, then left to right.', '6 ÷ 3 = 2; 12 − 2 + 1 = 11.'),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'start-005': {
    predict: {
      q: 'How many handshakes happen when 4 people each shake hands with everyone else once?',
      options: ['6', '16', '12', '4'],
      answer: 0,
      reveal: 'Each of 4 people shakes 3 hands, which counts 12, but every handshake involves two people, so it was counted twice: 12 ÷ 2 = 6. Drawing 4 dots and joining every pair shows the 6 lines.',
    },
    parts: [
      {
        title: 'Understand the problem',
        minutes: 10,
        explain: [
          'Pólya’s first step sounds obvious but is where most mistakes start. Ask: what is unknown? What is given? What exactly is being counted or asked for?',
          'Restate the problem in your own words, and draw a picture if you can. If you can’t restate it, you are not ready to solve it yet.',
        ],
        formulas: [['Three questions', '\\text{unknown?} \\quad \\text{given?} \\quad \\text{conditions?}']],
        examples: [
          ex('“A rope 12 m long is cut into pieces 1.5 m long. How many pieces?” Understand it.', [['Unknown: the number of pieces. Given: 12 m and 1.5 m.', null], ['Restate: how many 1.5s fit in 12?', '12 \\div 1.5 = 8']], '8 pieces'),
          ex('“Six friends each shake hands with everyone else once. How many handshakes?” What is counted?', [['A handshake is one pair of people.', null], ['So we count pairs, each pair once.', null]], 'Pairs of people'),
        ],
        practice: [
          ch('What should you do first with a word problem?', ['Work out what is asked and what is given', 'Start calculating with the numbers you see', 'Guess an answer', 'Look up the formula'], 'Pólya’s step 1.', 'Understand before planning.'),
          ch('“A tank holds 200 L and fills at 25 L per minute. How long to fill?” What is unknown?', ['The time to fill', 'The size of the tank', 'The flow rate', 'The tank’s shape'], 'What is asked?', 'How long, the time.'),
          pr('Solve it: 200 L at 25 L per minute. How many minutes?', 8, 'How many 25s in 200?', '200 ÷ 25 = 8 minutes.'),
          ch('Why restate a problem in your own words?', ['If you can, you understand it; if not, you are not ready to solve it', 'It makes the problem longer', 'Teachers like it', 'It changes the answer'], 'A test of understanding.', 'Restating shows you know what is asked.'),
        ],
      },
      {
        title: 'Make a plan: heuristics',
        minutes: 14,
        explain: [
          'When no method comes to mind, Pólya suggests questions: Have you seen a related problem? Can you draw a figure? Can you solve a simpler version? Can you work backwards?',
          'Small cases often show a pattern. Handshakes: 2 people make 1, 3 make 3, 4 make 6, 5 make 10. Each new person shakes hands with everyone already there.',
        ],
        formulas: [['Handshakes', 'H = \\dfrac{n(n-1)}{2}']],
        examples: [
          ex('How many handshakes for 6 people? Plan: use the pattern.', [['Each new person adds handshakes with everyone already there.', '1 + 2 + 3 + 4 + 5'], ['Add.', '15']], '15'),
          ex('Work backwards: “I doubled a number and added 3 to get 17. What was it?”', [['Undo the +3.', '17 - 3 = 14'], ['Undo the doubling.', '14 \\div 2 = 7']], '7'),
        ],
        practice: [
          pr('How many handshakes for 10 people?', 45, 'n(n − 1) ÷ 2.', '10 × 9 ÷ 2 = 45.'),
          pr('Work backwards: a number times 3, minus 5, gives 16. What was the number?', 7, 'Undo −5, then undo ×3.', '16 + 5 = 21; 21 ÷ 3 = 7.'),
          ch('You can’t solve a problem about 100 people. A good heuristic is…', ['Try 2, 3 and 4 people and look for a pattern', 'Give up', 'Make the problem bigger', 'Use only the first number'], 'Shrink it.', 'Small cases first.'),
          ch('Which is NOT one of Pólya’s planning questions?', ['How fast can I write?', 'Have I seen a related problem?', 'Can I draw a figure?', 'Can I solve a simpler version?'], 'Speed is not a plan.', 'The other three are from How to Solve It.'),
        ],
      },
      {
        title: 'Carry out, then look back',
        minutes: 12,
        explain: [
          'Carry out the plan step by step and check each step as you go. If the plan fails, that is information: go back to step 2 with what you learned.',
          'Looking back means checking the answer a second way and asking whether it is sensible. Fence posts: 20 m with a post every 4 m is 5 gaps but 6 posts; drawing it catches the classic off-by-one slip.',
        ],
        formulas: [['Posts on a straight fence', '\\text{posts} = \\dfrac{\\text{length}}{\\text{gap}} + 1']],
        examples: [
          ex('A 30 m path has a lamp every 5 m, at both ends too. How many lamps?', [['Gaps.', '30 \\div 5 = 6'], ['Posts are one more than gaps.', '6 + 1 = 7']], '7 lamps'),
          ex('Check 15 handshakes for 6 people another way.', [['Each of 6 shakes 5 hands.', '6 \\times 5 = 30'], ['Each handshake counted twice.', '30 \\div 2 = 15']], 'Both ways give 15'),
        ],
        practice: [
          pr('A 12 m fence has a post every 3 m, including both ends. How many posts?', 5, 'Gaps, then add one.', '12 ÷ 3 = 4 gaps, so 5 posts.'),
          pr('You cut a log into 5 pieces. How many cuts?', 4, 'Draw it.', '4 cuts make 5 pieces.'),
          ch('Your answer says a classroom has 2,000 chairs. What should look back tell you?', ['It is not sensible, so check the steps', 'It must be right because you calculated it', 'Round it to 2,100', 'Nothing'], 'Is it reasonable?', 'Look back catches answers that cannot be true.'),
          ch('Your plan didn’t work. What next?', ['Go back to planning with what you learned', 'Decide the problem is impossible', 'Copy the answer from somewhere', 'Try the same thing again unchanged'], 'Pólya’s steps can loop.', 'A failed plan tells you what to try next.'),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'start-006': {
    predict: {
      q: 'Old church window panes are often thicker at the bottom. What is the best explanation?',
      options: ['They were made uneven and often fitted thick edge down', 'Glass is a slow liquid that sagged', 'Rain wore the top away', 'Builders melted the bottoms'],
      answer: 0,
      reveal: 'The “glass flows” story is a popular myth. A 1998 calculation showed room-temperature glass would take far longer than the age of the universe to flow visibly. Old panes were simply uneven from how they were made.',
    },
    parts: [
      {
        title: 'Says who? Based on what?',
        minutes: 12,
        explain: [
          'The Royal Society’s motto, “take nobody’s word for it”, is still the best rule. A confident voice, a famous name or a popular post is not evidence. A measurement, an experiment or a record is.',
          'Two questions do most of the work: who is making this claim, and what evidence do they point to? If there is no evidence to point to, treat the claim as unproven, however good it sounds.',
        ],
        formulas: [['The two questions', '\\text{says who?} \\;+\\; \\text{based on what?}']],
        examples: [
          ex('“Experts say this paint lasts 50 years.” Ask the two questions.', [['Says who? Which experts? The maker?', null], ['Based on what? A 50-year test, or a faster lab test that is meant to stand for it?', null]], 'Find who said it and what test backs it'),
          ex('A friend says copper is stronger than steel. How do you check?', [['Find a source with measured numbers, such as a table of strengths.', null], ['Compare: typical copper about 200 MPa, structural steel about 400 MPa or more.', '200 < 400']], 'Not true for usual grades: steel is stronger'),
        ],
        practice: [
          ch('Which is evidence for “this rope holds 500 kg”?', ['A test report where it held 500 kg', 'The seller says it is strong', 'It looks thick', 'Many people bought it'], 'Something measured.', 'Only the test is a measurement.'),
          ch('What did Nullius in verba ask scientists to rely on?', ['Experiment and evidence', 'The oldest books', 'The king', 'Famous names'], 'Take nobody’s word.', 'Evidence over authority.'),
          ch('A claim has no source at all. How should you treat it?', ['As unproven until you find evidence', 'As true', 'As false for certain', 'As true if it sounds scientific'], 'Unknown, not false.', 'No evidence means unproven, not disproven.'),
          pr('A post’s claim passed through 4 people before reaching you, starting from 1 original study. Counting the study and the 4 people, how many links are in the chain?', 5, 'Count them all.', '1 study + 4 people = 5 links.'),
        ],
      },
      {
        title: 'Following a claim back',
        minutes: 12,
        explain: [
          'Claims change as they are passed along: “slowed rust in a salt test” can become “never rusts”. So follow the trail back to the first source and see what it actually says.',
          'Primary sources are the original evidence: the paper, the measurement, the record. Secondary sources describe them: textbooks, news, encyclopedias. Secondary sources are useful, as long as they point to the primary ones.',
        ],
        formulas: [['The trail', '\\text{post} \\to \\text{news} \\to \\text{paper} \\to \\text{data}']],
        examples: [
          ex('A headline says “New alloy unbreakable!” Follow it back.', [['The news article links to a university press release.', null], ['The paper says: 30% tougher than a standard alloy in one test.', null]], 'Tougher, not unbreakable'),
          ex('Is an encyclopedia article a primary or secondary source?', [['It describes other work.', null], ['Its numbered references lead to the primary sources.', null]], 'Secondary, with links to primary sources'),
        ],
        practice: [
          ch('Which is a primary source for a steel’s strength?', ['The lab test report with the measured values', 'A blog post about it', 'A news story', 'A textbook summary'], 'The original measurement.', 'The test report is the original.'),
          ch('Why follow a claim back to the original?', ['Claims often grow or change as they are passed along', 'Originals are always shorter', 'To find someone to blame', 'It is never useful'], 'Think about the “never rusts” example.', 'Each retelling can stretch it.'),
          ch('In this app, what does a mark like [2] in a story mean?', ['See source 2 in the list under the story', 'Two minutes to read', 'Second paragraph', 'Important'], 'Numbered sources.', 'It points to the numbered source list.'),
          pr('A study found a coating made rust 10 times slower. Uncoated steel lost 2 mm in a test. How many mm did the coated steel lose?', 0.2, '10 times slower: divide by 10.', '2 ÷ 10 = 0.2 mm. Slower, not zero.'),
        ],
      },
      {
        title: 'Weighing evidence',
        minutes: 12,
        explain: [
          'Some evidence is stronger than other evidence. One person’s story is weak. A measured test is stronger. Several careful studies that agree, checked by other experts (peer review), are stronger still.',
          'Strong evidence can still be overturned, and good scientists change their minds when it is. The glass myth lasted decades until someone checked the physics.',
        ],
        formulas: [['Stronger and weaker', '\\text{one story} < \\text{one test} < \\text{many checked studies}']],
        examples: [
          ex('Rank: (a) “my uncle’s roof never leaked”, (b) one lab test, (c) a review of 20 tests.', [['Anecdote is weakest.', null], ['Many agreeing tests are strongest.', 'a < b < c']], 'a, then b, then c'),
          ex('Zanotto calculated glass flow times far longer than the age of the universe. What does that do to the flowing-glass claim?', [['The claim predicts visible sagging in centuries.', null], ['The physics says no such flow.', null]], 'It rules flow out as the cause'),
        ],
        practice: [
          ch('Which is the strongest evidence?', ['Several independent, peer-reviewed studies that agree', 'One famous person’s opinion', 'A single anecdote', 'A popular video'], 'Many, checked, agreeing.', 'Agreement among checked studies is strongest.'),
          ch('What is peer review?', ['Other experts checking a study before it is published', 'Readers liking a paper', 'The author reading it twice', 'A newspaper review'], 'Peers = other experts.', 'Experts judge it before publishing.'),
          ch('New, strong evidence contradicts what a textbook says. A good scientist…', ['Looks hard at the new evidence and changes their mind if it holds up', 'Ignores it', 'Trusts the older book because it is older', 'Picks whichever is more popular'], 'Evidence decides.', 'Views follow evidence.'),
          pr('When did the Royal Society start having a committee judge papers for Philosophical Transactions?', 1752, 'Almost a century after 1665.', 'From 1752 the Committee of Papers chose what to print.', { tol: 0 }),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'start-007': {
    predict: {
      q: 'Which page of notes will help you most a week later?',
      options: ['Short notes in your own words with a question beside each idea', 'Every word the teacher said', 'The whole page highlighted', 'A photo of the board'],
      answer: 0,
      reveal: 'Own-words notes show you understood, and the questions let you test yourself. That is the idea behind Walter Pauk’s Cornell page.',
    },
    parts: [
      {
        title: 'The Cornell page',
        minutes: 10,
        explain: [
          'Rule a page into three parts. The right column, about twice as wide as the left, is for notes during class. The narrow left column is for questions or key words. A strip of five to seven lines at the bottom, about 5 cm, is for the summary.',
          'On A4 paper (21 cm wide) that is roughly a 7 cm left column and a 14 cm right column. In this app’s notes panel you can do the same with headings: Notes, Questions, Summary.',
        ],
        formulas: [['The layout', '\\text{left} : \\text{right} \\approx 1 : 2 \\qquad \\text{summary} \\approx 5 \\text{ cm}']],
        examples: [
          ex('A page is 21 cm wide. Split it 1 : 2. How wide is each column?', [['Three equal shares.', '21 \\div 3 = 7 \\text{ cm}'], ['Left gets one share, right gets two.', '7 \\text{ cm},\\ 14 \\text{ cm}']], '7 cm and 14 cm'),
          ex('Where does the summary go, and when do you write it?', [['At the bottom of the page.', null], ['After class, in your own words, two or three lines.', null]], 'Bottom strip, after class'),
        ],
        practice: [
          pr('A page is 18 cm wide, split 1 : 2. How many cm wide is the left column?', 6, '18 ÷ 3.', '6 cm.'),
          ch('Which column holds the notes taken during class?', ['The wide right column', 'The narrow left column', 'The bottom strip', 'The back of the page'], 'The big one.', 'The right column, about two-thirds of the width.'),
          ch('How long should the summary be?', ['A few lines', 'A full page', 'One word', 'As long as the notes'], 'Five to seven lines.', 'Short, in your own words.'),
          ch('Who designed the page?', ['Walter Pauk at Cornell', 'Arthur Gates at Columbia', 'George Pólya at Stanford', 'Fibonacci in Pisa'], 'Cornell University.', 'Walter Pauk, 1950s.'),
        ],
      },
      {
        title: 'Notes in your own words',
        minutes: 12,
        explain: [
          'Don’t copy every word. Listen for the idea, then write it short, in your words: phrases, arrows, small sketches. If you can’t put it in your own words, mark it with a ? and ask or look it up later.',
          'A 2014 study found laptop note-takers copied more word for word and did worse on understanding questions. Later repeats found the gap was smaller than first thought, so the dependable lesson is about own words, not pen or keyboard.',
        ],
        formulas: [['Shorter, not lesser', '\\text{idea} \\to \\text{your words} \\to \\text{a phrase}']],
        examples: [
          ex('The teacher says: “Iron rusts because oxygen and water react with it to form iron oxide, which flakes off and exposes fresh metal.” Make a note.', [['Find the idea.', null], ['Write it short.', '\\text{Fe} + \\text{O}_2 + \\text{water} \\to \\text{rust (flakes)} \\to \\text{fresh Fe exposed}']], 'Iron + oxygen + water → flaky rust → fresh iron exposed → rusts more'),
          ex('You missed part of a sentence. What do you write?', [['Write what you got.', null], ['Add a ? to check later.', null]], 'The fragment with a “?”'),
        ],
        practice: [
          ch('Which note is best for the sentence “Diamond is hard because each carbon atom is bonded strongly to four others in every direction”?', ['Diamond hard ← each C bonded to 4, all directions', 'Diamond is hard because each carbon atom is bonded strongly to four others in every direction', 'Diamond', 'Hard'], 'Short and complete.', 'It keeps the idea in a few words.'),
          ch('What does the 2014 laptop study suggest is the main problem?', ['Copying word for word instead of putting ideas in your own words', 'Using a pen', 'Taking notes at all', 'Short notes'], 'Verbatim copying.', 'Verbatim notes went with weaker understanding.'),
          ch('You don’t understand something in class. What should your notes show?', ['A ? next to it, to check later', 'Nothing', 'A guess written as fact', 'A copy of the whole board'], 'Mark the gap.', 'The ? is a reminder to fix the gap.'),
          pr('A teacher speaks about 130 words a minute and you write about 25 words a minute. About how many times faster is the teacher? (Round to one decimal.)', 5.2, '130 ÷ 25.', '5.2 times, which is why copying everything is impossible.', { tol: 0.06 }),
        ],
      },
      {
        title: 'Questions and review',
        minutes: 12,
        explain: [
          'Soon after class, turn each idea in the right column into a question in the left column: “Why does rust flake?” Then write the summary at the bottom.',
          'To review, cover the right column and answer each question aloud. That is retrieval practice. Do it the next day and a few days later, and you have spacing too. All three earlier study classes on one page.',
        ],
        formulas: [['One page, three findings', '\\text{own words} + \\text{recall} + \\text{spacing}']],
        examples: [
          ex('Turn the note “distance = speed × time” into a cue question.', [['Ask for what the note says.', null], ['Cue: “How do you get distance from speed and time?”', null]], 'A question whose answer is the note'),
          ex('Plan the reviews for notes made on Monday.', [['First review: Tuesday.', null], ['Then Thursday, then the next week.', null]], 'Tuesday, Thursday, next week'),
        ],
        practice: [
          ch('When should you write the questions in the left column?', ['Soon after class', 'Before the class starts', 'The night before the final', 'Never'], 'While it is fresh.', 'Soon after, while you still remember the class.'),
          ch('How do you test yourself with a Cornell page?', ['Cover the right column and answer the left-column questions', 'Read the right column twice', 'Read the summary only', 'Rewrite the page'], 'Cover and recall.', 'Recall from the cue questions.'),
          ch('Which earlier finding does reviewing the page on several days use?', ['The spacing effect', 'The order of operations', 'Place value', 'The handshake pattern'], 'Ebbinghaus.', 'Spreading reviews out is spacing.'),
          pr('Your page has 9 notes and you answered 6 cue questions correctly. What percent is that? (Round to the nearest whole number.)', 67, '6 ÷ 9 × 100.', '66.7%, about 67%.', { tol: 0.6 }),
        ],
      },
    ],
  },
};
