// "Start here": a short level before any program, for people with no
// background at all. Two kinds of class take turns, each in its own
// historical order: how to study (Ebbinghaus 1885 → Gates 1917 → Pólya 1945 →
// Pauk 1950s) and the basic tools (Fibonacci 1202 → the symbols, 1489–1659 →
// the Royal Society, 1660). Written with mk() like the other classes; story
// claims are cited as [n], pointing at each class's `sources`.
import { mk, home, online } from '../um/make';

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;

export default [
  // ---------------------------------------------------------------------------
  mk({
    id: 'start-001',
    code: 'START 1',
    track: 'start',
    um: [],
    title: 'Ebbinghaus: Why You Forget, and How to Stop It',
    subtitle: 'The forgetting curve, and why short reviews spread over days beat one long session',
    digest: [
      'Memory fades fast at first and then slowly: most of what you forget, you forget in the first day.',
      'Each time you bring something back to mind just as it is fading, it fades more slowly the next time.',
      'So study in short sessions spread over days, and review on a growing ladder of gaps: 1 day, 3 days, 10 days, 30 days.',
    ],
    era: '1880–1885, Berlin',
    who: 'Hermann Ebbinghaus',
    hook: 'You understood the class yesterday. Today you can’t explain it. Is something wrong with you?',
    story: [
      'In the early 1880s the German psychologist Hermann Ebbinghaus did something nobody had tried: he measured his own forgetting. To keep old knowledge out of the way, he learned lists of made-up syllables such as “WID” and “ZOF”, then tested himself after different delays [1][2]. He published the results in 1885 as Über das Gedächtnis (“On Memory”) [1].',
      'His measure was clever. Instead of asking “what do I still remember?”, he timed how long it took to learn a list again. If relearning took half the original time, half the work was still “saved”. After 20 minutes about 58% was saved; after an hour, 44%; after a day, 34%; after a month, about 21% [3].',
      'The shape of those numbers is the forgetting curve: a steep drop in the first hours, then a long slow tail. In 2015 two researchers in Amsterdam, Jaap Murre and Joeri Dros, repeated the whole experiment on one volunteer over 70 hours of learning and got nearly the same curve [3][2].',
      'Ebbinghaus also noticed that repetitions spread over several days held up far better than the same number crammed into one sitting [1]. This spacing effect is one of the most repeated findings in the science of learning: a review of hundreds of studies in 2006 found it again and again [4]. The Review tab in this app uses it: each question comes back after 1, 3, 10, 30 and then 90 days.',
    ],
    takeaway: 'Forgetting is normal, not a sign you are bad at this. Short reviews spread over days beat one long cram, so come back to each class a little later.',
    viz: 'start_forgetting',
    vizTitle: 'The Forgetting Curve and Spaced Reviews',
    vizHow: 'The curve shows how much of a class you still hold over 30 days. Add reviews and watch each one lift memory back up and make the next drop gentler.',
    steps: [
      ['Fast, then slow', '\\text{day } 0 \\to 1:\\ \\text{big drop} \\qquad \\text{day } 1 \\to 30:\\ \\text{small drop}', 'Most forgetting happens in the first day.'],
      ['Savings', '\\text{saved} = \\dfrac{\\text{first time} - \\text{relearn time}}{\\text{first time}}', 'Ebbinghaus measured memory by how much faster relearning was.'],
      ['A growing ladder', '1 \\to 3 \\to 10 \\to 30 \\to 90 \\ \\text{days}', 'Each review can wait longer than the one before.'],
    ],
    drills: [
      ['When do you forget the most, according to Ebbinghaus?', ['In the first hours and the first day', 'After about a month', 'Evenly every day', 'Only after a year'], 'Look at the steep part of the curve.', 'The curve drops fastest at the start.', 'The first day.'],
      ['Ebbinghaus learned a list in 10 minutes. A day later he relearned it in 6.6 minutes. How much was saved?', ['34%', '66%', '6.6%', '10%'], 'Saved = time saved ÷ first time.', '(10 − 6.6) ÷ 10 = 0.34.', '34%.'],
      ['You have 3 hours to study a class this week. Which plan follows the spacing effect?', ['Three 1-hour sessions on different days', 'One 3-hour session the night before', 'Read it three times in a row', 'Skip it and cram later'], 'Spread or crammed?', 'Spread over days.', 'Three sessions on different days.'],
    ],
    boss: [
      'Planning Your Week',
      'You finish a class on Monday. Which review plan will keep it best by next month, for the same total time?',
      ['A short review on Tuesday, another on Thursday, then one in two weeks', 'Reread it five times on Monday night', 'Review it once, a month later', 'Never review; understanding it once is enough'],
      'Reviews should come as it starts to fade, with growing gaps.',
      'Reviewing just as memory fades, with growing gaps, is what the spacing effect recommends. Five rereads on the same night feel productive but are mostly forgotten by the next week.',
    ],
    read: [
      ['wiki', 'Forgetting curve', 'The curve, and the 2015 replication.', 'The forgetting curve hypothesizes the decline of memory retention in time.'],
      ['wiki', 'Spacing effect', 'Why spreading study out works.', 'The spacing effect demonstrates that learning is more effective when study sessions are spaced out.'],
    ],
    sources: [
      ['Wikipedia: Hermann Ebbinghaus', W('Hermann_Ebbinghaus'), 'his self-experiments and Über das Gedächtnis (1885)'],
      ['Wikipedia: Forgetting curve', W('Forgetting_curve'), 'nonsense syllables, the curve and the 2015 replication'],
      ['Murre & Dros (2015), “Replication and Analysis of Ebbinghaus’ Forgetting Curve”, PLoS ONE 10(7)', 'https://doi.org/10.1371/journal.pone.0120644', 'Ebbinghaus’s savings numbers and the new ones'],
      ['Cepeda et al. (2006), “Distributed practice in verbal recall tasks”, Psychological Bulletin 132(3)', 'https://doi.org/10.1037/0033-2909.132.3.354', 'a review of hundreds of spacing studies'],
    ],
    labs: [
      home('Learn ten made-up words like Ebbinghaus (for example ZOF, WID, KEP …) until you can say them all in order. Time yourself. Relearn them tomorrow and time it again. Work out your own savings.'),
      online('Ebbinghaus’s book, free in English (York University Classics)', 'https://psychclassics.yorku.ca/Ebbinghaus/index.htm', 'Read chapter 7, on how retention changes with time, and find the table with the 58% and 44%.'),
    ],
    quiz: [
      ['What did Ebbinghaus memorise to keep old knowledge out of his test?', ['Made-up syllables like WID and ZOF', 'Poems', 'Phone numbers', 'Chess games'], 'Nonsense on purpose.'],
      ['In which year was “On Memory” published?', ['1885', '1785', '1985', '1905'], 'Berlin, late 1800s.'],
    ],
    gloss: [
      ['Forgetting curve', 'How memory of something falls over time: fast at first, then slowly.', []],
      ['Spacing effect', 'Study spread over several sessions is remembered better than the same study crammed into one.', ['spaced practice', 'spaced review']],
      ['Savings', 'Ebbinghaus’s measure of memory: how much less time it takes to learn something again.', []],
    ],
    events: [[1885, 'Ebbinghaus publishes “On Memory”', 'The first measured forgetting curve.']],
  }),

  // ---------------------------------------------------------------------------
  mk({
    id: 'start-002',
    code: 'START 2',
    track: 'start',
    um: [],
    title: 'Fibonacci’s Book of Calculation: The Arithmetic You Need',
    subtitle: 'A refresher on place value, the four operations, fractions, decimals and percent',
    digest: [
      'Our digits 0–9 work by place: in 352 the 3 means three hundreds, the 5 five tens, the 2 two ones.',
      'A fraction, a decimal and a percent are three ways to write the same amount: ¾ = 0.75 = 75%.',
      'To add fractions, first make the bottoms the same; to multiply them, multiply tops and bottoms.',
    ],
    era: '1202, Pisa',
    who: 'Leonardo of Pisa (Fibonacci)',
    hook: 'A merchant in 1200 must split 100 coins three ways using Roman numerals. Try C ÷ III.',
    story: [
      'Around 1200, a young man from Pisa called Leonardo, later nicknamed Fibonacci, travelled with his father, a customs official in the North African port of Bugia. There he was taught “the art of the nine Indian figures”: the digits 1–9 and the sign 0 that had come from India through the Arab world [1].',
      'In 1202 he wrote Liber Abaci, the “Book of Calculation”, to bring this way of counting to Europe. It is famous for introducing place-value numbers to Europe, and most of it is practical: prices, weights, exchanging money, sharing profits [1]. A revised edition followed in 1228 [1].',
      'The book also used fractions written with a bar between the top and bottom numbers, a notation first found a little earlier in the work of the Moroccan mathematician al-Ḥaṣṣār [2]. In the centuries after, Italian “abacus schools” taught merchants’ children this arithmetic [3], and the word “percent” comes from the Italian per cento, “for each hundred” [4].',
      'This class is a refresher, not a race. If any part feels new, that is fine: the program’s first weeks teach each idea from the beginning, starting with counting.',
    ],
    takeaway: 'Place value, the four operations, and fractions–decimals–percent are the toolkit for everything later. Check yourself here, and go back to the matching early class for anything shaky.',
    viz: 'start_fdp',
    vizTitle: 'One Amount, Three Names',
    vizHow: 'A bar is cut into equal pieces and some are shaded. Read the same amount as a fraction, a decimal and a percent.',
    steps: [
      ['Place value', '352 = 3 \\times 100 + 5 \\times 10 + 2', 'Each place is worth ten of the place to its right.'],
      ['Fractions', '\\dfrac{3}{4} = 3 \\div 4', 'The bottom says how many equal pieces; the top says how many you take.'],
      ['Three names', '\\dfrac{3}{4} = 0.75 = 75\\%', 'Percent means “out of a hundred”.'],
    ],
    drills: [
      ['In 4,073, what does the 7 stand for?', ['7 tens', '7 hundreds', '7 ones', '7 thousands'], 'Count places from the right: ones, tens, hundreds.', 'It is in the second place from the right.', '70.'],
      ['Which is the same amount as 1/4?', ['0.25 and 25%', '0.4 and 40%', '1.4 and 14%', '0.14 and 4%'], 'Divide 1 by 4.', '1 ÷ 4 = 0.25.', '25%.'],
      ['What is 1/2 + 1/3?', ['5/6', '2/5', '1/5', '2/6'], 'Make the bottoms the same first.', '1/2 = 3/6 and 1/3 = 2/6.', '5/6.'],
    ],
    boss: [
      'The Discount',
      'A bag of cement costs ₱280. The shop gives 25% off. What do you pay?',
      ['₱210', '₱255', '₱70', '₱225'],
      '25% is a quarter.',
      'A quarter of ₱280 is ₱70, so you pay ₱280 − ₱70 = ₱210. Or: you pay 75%, and 0.75 × 280 = 210.',
    ],
    read: [
      ['wiki', 'Liber Abaci', 'Fibonacci’s book.', 'Liber Abaci is a 1202 Latin work on arithmetic by Leonardo of Pisa, posthumously known as Fibonacci.'],
      ['book', 'precalc', 'Chapter 1: Prerequisites', 'Free practice on numbers and fractions.', 'This chapter reviews the real numbers and how to work with them.'],
    ],
    sources: [
      ['Wikipedia: Liber Abaci', W('Liber_Abaci'), 'Bugia, the nine Indian figures, 1202 and 1228, its contents'],
      ['Wikipedia: Fraction (history)', W('Fraction'), 'al-Ḥaṣṣār’s fraction bar and Fibonacci'],
      ['Wikipedia: Abacus school', W('Abacus_school'), 'the Italian schools that taught merchant arithmetic'],
      ['Wikipedia: Percent sign', W('Percent_sign'), 'per cento and the % sign'],
    ],
    labs: [
      home('Take a shop receipt. Check one line by hand, then work out what a 10% and a 25% discount would have been.'),
      online('Khan Academy: Arithmetic (free)', 'https://www.khanacademy.org/math/arithmetic', 'Do the “fractions intro” and “decimals intro” checks. Anything below 80%? Do that unit before week 4.'),
    ],
    quiz: [
      ['Where did Fibonacci learn the Indian–Arabic digits?', ['In Bugia, North Africa, where his father worked', 'In Rome', 'In Paris', 'In China'], 'A customs house.'],
      ['What does “percent” mean?', ['For each hundred', 'For each ten', 'Part of a thousand', 'A kind of coin'], 'Italian per cento.'],
    ],
    gloss: [
      ['Place value', 'The value of a digit depends on its place: ones, tens, hundreds…', []],
      ['Percent', 'Out of a hundred: 25% means 25 out of every 100.', ['per cent']],
      ['Denominator', 'The bottom number of a fraction: how many equal pieces the whole is cut into.', ['denominators']],
      ['Numerator', 'The top number of a fraction: how many of the pieces you take.', ['numerators']],
    ],
    events: [[1202, 'Fibonacci’s Liber Abaci', 'Place-value digits reach Europe.']],
  }),

  // ---------------------------------------------------------------------------
  mk({
    id: 'start-003',
    code: 'START 3',
    track: 'start',
    um: [],
    title: 'Gates: Testing Yourself Beats Rereading',
    subtitle: 'Retrieval practice: why pulling an idea out of your head teaches more than putting it in again',
    digest: [
      'Trying to recall something, even when you get it wrong, strengthens memory more than reading it again.',
      'Rereading feels easy and familiar, which fools you into thinking you know it. A self-test shows what you really know.',
      'So close the book and ask yourself questions: the drills, quizzes and Review in this app are built for that.',
    ],
    era: '1917, New York → 2006, St Louis',
    who: 'Arthur Gates, then Roediger and Karpicke',
    hook: 'You have an hour before a test. Read your notes three more times, or close them and quiz yourself?',
    story: [
      'In 1917 Arthur Gates, a young psychologist at Columbia University in New York, gave school children short biographies to learn. Some spent all their time reading. Others read for part of the time and spent the rest “reciting”: looking away and trying to say what they had read [1][2].',
      'The children who spent more than half their time reciting remembered the most, and for some material the best share was as high as four-fifths. They did better, both straight away and days later [1]. Pulling the facts back out did more than putting them in again.',
      'Almost ninety years later, Henry Roediger and Jeffrey Karpicke at Washington University in St Louis tested college students on short science passages. One group read a passage four times. Another read it once and then took three recall tests. Five minutes later the rereaders did slightly better: 83% against 71%. But a week later the testing group remembered 61% and the rereaders only 40% [3].',
      'The rereaders also felt more confident. Reading something again feels easy, and easy feels like knowing. Psychologists call this the testing effect, or retrieval practice [2][3]. It is why every class here ends in drills and a quiz, and why the Review tab asks you questions instead of showing you notes.',
    ],
    takeaway: 'Close the book and try to recall. A self-test that feels hard is doing its job; rereading that feels easy mostly isn’t.',
    viz: 'start_testing',
    vizTitle: 'Reread or Recall? Roediger and Karpicke’s Results',
    vizHow: 'Two groups, the same total time. Move the test day and compare how much each group remembers.',
    steps: [
      ['Five minutes later', '\\text{reread } 83\\% \\ \\text{vs} \\ \\text{tested } 71\\%', 'Rereading wins at first.'],
      ['One week later', '\\text{reread } 40\\% \\ \\text{vs} \\ \\text{tested } 61\\%', 'Recall practice wins where it counts.'],
      ['The illusion', '\\text{easy to read} \\neq \\text{known}', 'Familiar is not the same as remembered.'],
    ],
    drills: [
      ['What did Gates’s best-remembering children do?', ['Spent most of their time trying to recite from memory', 'Read the text as many times as possible', 'Copied the text out', 'Listened to a teacher read it'], 'Reading or reciting?', 'More than half the time reciting.', 'Reciting.'],
      ['A week after studying, which group remembered more in Roediger and Karpicke’s study?', ['Those who took recall tests', 'Those who reread four times', 'Both the same', 'Neither remembered anything'], 'Look at the one-week result.', '61% against 40%.', 'The tested group.'],
      ['Why does rereading fool people?', ['It feels easy, and easy feels like knowing', 'It is always slower', 'It is against the rules', 'It makes you tired'], 'Think about confidence.', 'Familiar text feels known.', 'The fluency illusion.'],
    ],
    boss: [
      'Before the Exam',
      'You have 40 minutes before a chemistry quiz on gas laws. Which plan gives the best score a week later and on the day?',
      ['Read the summary once, then spend most of the time answering practice questions from memory and checking', 'Read the chapter three times', 'Highlight the important lines', 'Copy your notes out neatly'],
      'Retrieval beats re-exposure.',
      'Reading once gets the ideas in; recalling them, checking and fixing mistakes is what makes them stick. Highlighting and copying feel busy but are mostly rereading.',
    ],
    read: [
      ['wiki', 'Testing effect', 'The research on retrieval practice.', 'The testing effect suggests long-term memory is increased when part of the learning period is devoted to retrieving information from memory.'],
      ['link', 'Retrieval Practice (free guide)', 'A one-page guide for students', 'https://www.retrievalpractice.org/', 'Simple ways to quiz yourself.', 'Retrieval practice is a learning strategy where we focus on getting information out.'],
    ],
    sources: [
      ['Gates, A. I. (1917), “Recitation as a factor in memorizing”, Archives of Psychology 6(40)', 'https://archive.org/search?query=%22Recitation+as+a+factor+in+memorizing%22', 'the reading-versus-reciting experiment'],
      ['Wikipedia: Testing effect', W('Testing_effect'), 'the testing effect and its research'],
      ['Roediger & Karpicke (2006), “Test-Enhanced Learning”, Psychological Science 17(3)', 'https://doi.org/10.1111/j.1467-9280.2006.01693.x', 'the reread-versus-test results and confidence ratings'],
    ],
    labs: [
      home('After your next class, close the app and write down everything you remember on a blank page for five minutes. Then open the class and mark what you missed. That blank page is retrieval practice.'),
      online('Retrievalpractice.org guides (free)', 'https://www.retrievalpractice.org/', 'Read the one-page “Retrieval practice guide” and pick two ways to use it this week.'),
    ],
    quiz: [
      ['In which year did Gates publish his recitation study?', ['1917', '1817', '1957', '2006'], 'During the First World War.'],
      ['What do psychologists call learning by recalling?', ['Retrieval practice, or the testing effect', 'Rereading', 'Highlighting', 'Cramming'], 'Pulling it back out.'],
    ],
    gloss: [
      ['Retrieval practice', 'Learning by trying to recall something from memory, for example with a self-test.', ['testing effect', 'self-test']],
      ['Fluency illusion', 'The feeling that something is known because it is easy to read or familiar.', []],
    ],
    events: [
      [1917, 'Gates: recitation beats rereading', 'Columbia University, New York.'],
      [2006, 'Roediger and Karpicke: test-enhanced learning', 'Testing beats rereading a week later.'],
    ],
  }),

  // ---------------------------------------------------------------------------
  mk({
    id: 'start-004',
    code: 'START 4',
    track: 'start',
    um: [],
    title: 'Reading Math Out Loud: + − × ÷ = and x',
    subtitle: 'The everyday symbols, where they came from, and the order to work a line out',
    digest: [
      'Each math symbol is shorthand for words: “=” says “is the same as”, “3x” says “three times a number”.',
      'A letter stands for a number you do not know yet, or one that can change.',
      'Work out a line in order: brackets first, then powers, then × and ÷, then + and −.',
    ],
    era: '1489 Widmann → 1557 Recorde → 1637 Descartes → 1659 Rahn',
    who: 'Robert Recorde, René Descartes and others',
    hook: 'Before 1557 nobody wrote “=”. They wrote “is equal to” in full, every single time.',
    story: [
      'For most of history, math was written in words. The symbols you know came one by one, in printed books. In 1489 Johannes Widmann’s arithmetic book in Leipzig used + and −, at first to mark surplus and shortage in goods; by 1518 Henricus Grammateus used them for adding and subtracting [1].',
      'In 1557 the Welsh doctor Robert Recorde, tired of writing “is equal to”, drew two parallel lines “because no two things can be more equal” [2]. The cross × for times appears in 1618 and in William Oughtred’s algebra of 1631 [3], and the ÷ sign was first used for division by Johann Rahn in 1659 [4].',
      'Letters for numbers came from France. François Viète used letters for unknown and known numbers in the 1590s, and in 1637 René Descartes settled on x, y and z for unknowns and a, b, c for known values, and wrote powers as small raised numbers like x³ [5][6].',
      'The rule that you multiply before you add grew up as algebra spread, so that a line like 2 + 3 × 4 has one meaning: 14, not 20 [7]. Later, in week 7, you meet the fancier symbols like ∈ and ∀; today is the everyday set.',
    ],
    takeaway: 'Read every symbol as the words it replaces, and work a line out in the agreed order: brackets, powers, × and ÷, then + and −.',
    viz: 'start_symbols',
    vizTitle: 'Reading a Line, Symbol by Symbol',
    vizHow: 'Pick a line of math. Each symbol lights up with the words it stands for, then the line is worked out in the agreed order.',
    steps: [
      ['Say it in words', '3x + 2 = 14 \\quad \\text{“three times a number, plus two, is fourteen”}', 'Symbols are shorthand.'],
      ['Order of operations', '2 + 3 \\times 4 = 2 + 12 = 14', 'Times before plus.'],
      ['Brackets change it', '(2 + 3) \\times 4 = 5 \\times 4 = 20', 'Brackets come first.'],
    ],
    drills: [
      ['How do you read “5 < 8”?', ['Five is less than eight', 'Five is more than eight', 'Five times eight', 'Five goes into eight'], 'The small end points at the smaller number.', 'The open side faces the bigger number.', 'Less than.'],
      ['Work out 10 − 2 × 3.', ['4', '24', '6', '10'], 'Times before minus.', '2 × 3 = 6, then 10 − 6.', '4.'],
      ['If x = 4, what is 3x?', ['12', '34', '7', '43'], '3x means 3 times x.', '3 × 4.', '12.'],
    ],
    boss: [
      'Reading a Formula',
      'The area of a triangle is A = ½ b h, where b is the base and h the height. A triangle has b = 6 cm and h = 5 cm. What is A, and how do you say the formula?',
      ['15 cm²; “the area is half the base times the height”', '11 cm²; “A equals b plus h”', '30 cm²; “the area is base times height”', '65 cm²; “A equals 6 and 5”'],
      'Letters side by side are multiplied.',
      '½ × 6 × 5 = 15. Letters written next to each other mean multiply, so ½ b h is half times base times height.',
    ],
    read: [
      ['wiki', 'Equals sign', 'Recorde’s two lines.', 'The equals sign is the mathematical symbol =, used to indicate equality in some well-defined sense.'],
      ['wiki', 'Order of operations', 'Why 2 + 3 × 4 is 14.', 'The order of operations is a collection of conventions about which arithmetic operations to perform first.'],
    ],
    sources: [
      ['Wikipedia: Plus and minus signs', W('Plus_and_minus_signs'), 'Widmann 1489 (surplus and deficit), Grammateus 1518'],
      ['Wikipedia: Equals sign', W('Equals_sign'), 'Recorde, The Whetstone of Witte, 1557'],
      ['Wikipedia: Multiplication sign', W('Multiplication_sign'), 'the 1618 appendix and Oughtred’s Clavis Mathematicae, 1631'],
      ['Wikipedia: Obelus', W('Obelus'), 'Rahn’s Teutsche Algebra, 1659'],
      ['Wikipedia: François Viète', W('Fran%C3%A7ois_Vi%C3%A8te'), 'letters for known and unknown numbers'],
      ['Wikipedia: La Géométrie', W('La_G%C3%A9om%C3%A9trie'), 'Descartes’ x, y, z and raised powers, 1637'],
      ['Wikipedia: Order of operations', W('Order_of_operations'), 'the convention and its history'],
    ],
    labs: [
      home('Find three formulas on packaging, a recipe or a bill (for example a price per kilo). Write each one in symbols, then read it aloud in words.'),
      online('Desmos scientific calculator (free)', 'https://www.desmos.com/scientific', 'Type 2+3×4, then (2+3)×4. Then 10−2×3 and (10−2)×3. Predict each answer before pressing enter.'),
    ],
    quiz: [
      ['Who drew the first equals sign, in 1557?', ['Robert Recorde', 'Isaac Newton', 'Fibonacci', 'Euclid'], 'A Welsh doctor.'],
      ['Who settled on x for an unknown number?', ['René Descartes', 'Johann Rahn', 'Arthur Gates', 'Archimedes'], 'La Géométrie, 1637.'],
    ],
    gloss: [
      ['Variable', 'A letter that stands for a number you do not know yet, or one that can change.', ['variables', 'unknown']],
      ['Order of operations', 'The agreed order to work out a line: brackets, powers, × and ÷, then + and −.', []],
      ['Expression', 'A piece of math with numbers, letters and operations but no equals sign, like 3x + 2.', ['expressions']],
    ],
    events: [
      [1557, 'Recorde draws the equals sign', 'The Whetstone of Witte.'],
      [1637, 'Descartes uses x for the unknown', 'La Géométrie.'],
    ],
  }),

  // ---------------------------------------------------------------------------
  mk({
    id: 'start-005',
    code: 'START 5',
    track: 'start',
    um: [],
    title: 'Pólya: What to Do When You Are Stuck',
    subtitle: 'Four steps for any problem: understand it, make a plan, carry it out, look back',
    digest: [
      'Being stuck is a normal part of solving problems, not a sign you can’t do it.',
      'Pólya’s four steps: understand the problem, make a plan, carry out the plan, look back.',
      'When there is no plan yet, try a smaller version, draw a picture, or look for a pattern.',
    ],
    era: '1945, Stanford',
    who: 'George Pólya',
    hook: 'Six friends meet and everyone shakes hands with everyone else once. How many handshakes? Where do you even begin?',
    story: [
      'George Pólya was a Hungarian mathematician who taught at the ETH in Zürich and later at Stanford University in California [1]. He noticed that students were shown finished solutions but never how anyone found them.',
      'In 1945 he published How to Solve It, a small book about the process itself. It sets out four steps: first, understand the problem; then make a plan; carry out the plan; and look back on your work [2]. The book has sold over a million copies [2].',
      'For the plan, Pólya listed questions to ask yourself: Have you seen a related problem? Can you draw a figure? Can you solve a simpler version first? Can you work backwards from what you want? [2] He called these heuristics, rules of thumb for discovery [2].',
      'Look back is the step most people skip. Check the answer another way, and ask what you learned that would help with the next problem. In this app the hints on every drill follow the same idea: a nudge towards a plan, not the answer.',
    ],
    takeaway: 'When stuck, don’t stare: understand, plan, do, look back. If no plan comes, shrink the problem, draw it, and look for a pattern.',
    viz: 'start_polya',
    vizTitle: 'The Handshake Problem in Four Steps',
    vizHow: 'Change the number of people. Each line is one handshake. Watch the pattern 1, 3, 6, 10… appear.',
    steps: [
      ['Understand', '\\text{each pair shakes once}', 'What is being counted? Pairs of people.'],
      ['Plan: try smaller', '2 \\to 1,\\ 3 \\to 3,\\ 4 \\to 6', 'Count small cases and look for a pattern.'],
      ['Carry out and look back', '\\dfrac{6 \\times 5}{2} = 15', 'Each of 6 people shakes 5 hands; each handshake was counted twice.'],
    ],
    drills: [
      ['What is Pólya’s first step?', ['Understand the problem', 'Write the answer', 'Guess', 'Ask someone else'], 'Before any plan.', 'What is given, what is wanted?', 'Understand it.'],
      ['You can’t see how to start a hard problem. Which is a Pólya heuristic?', ['Solve a smaller, simpler version first', 'Give up and look at the answer', 'Read the problem faster', 'Write a long formula'], 'Shrink it.', 'Small cases show the pattern.', 'Try a simpler case.'],
      ['How many handshakes do 5 people make if each pair shakes once?', ['10', '25', '20', '5'], 'Each shakes 4 hands; halve it.', '5 × 4 ÷ 2.', '10.'],
    ],
    boss: [
      'Fence Posts',
      'You are building a straight fence 20 m long with a post every 4 m, including both ends. How many posts? Use Pólya: draw a smaller case first.',
      ['6', '5', '4', '20'],
      'Try a 4 m fence, then an 8 m fence.',
      'A 4 m fence needs 2 posts, 8 m needs 3: always one more than the number of gaps. 20 ÷ 4 = 5 gaps, so 6 posts. Looking back: draw it and count.',
    ],
    read: [
      ['wiki', 'How to Solve It', 'The four steps and the heuristics.', 'How to Solve It (1945) is a small volume by mathematician George Pólya, describing methods of problem solving.'],
      ['wiki', 'George Pólya', 'His life.', 'George Pólya was a Hungarian-American mathematician.'],
    ],
    sources: [
      ['Wikipedia: George Pólya', W('George_P%C3%B3lya'), 'his life, ETH Zürich and Stanford'],
      ['Wikipedia: How to Solve It', W('How_to_Solve_It'), 'the four steps, heuristics and sales'],
    ],
    labs: [
      home('Draw 7 dots in a circle and connect every pair with a line. Count the lines. Does your answer match 7 × 6 ÷ 2? Then look back: why do we halve?'),
      online('NRICH problems (University of Cambridge, free)', 'https://nrich.maths.org/', 'Pick any “Primary” or “Secondary” starter problem. Write the four steps as headings and fill them in as you go.'),
    ],
    quiz: [
      ['When was How to Solve It published?', ['1945', '1845', '1995', '1645'], 'Just after the Second World War.'],
      ['What is Pólya’s last step?', ['Look back', 'Make a plan', 'Understand', 'Guess'], 'The one most people skip.'],
    ],
    gloss: [
      ['Heuristic', 'A rule of thumb that helps you find a way into a problem, like “try a smaller case”.', ['heuristics']],
      ['Pattern', 'A rule that repeats, which lets you predict the next case.', ['patterns']],
    ],
    events: [[1945, 'Pólya’s How to Solve It', 'Four steps for solving problems.']],
  }),

  // ---------------------------------------------------------------------------
  mk({
    id: 'start-006',
    code: 'START 6',
    track: 'start',
    um: [],
    title: 'Take Nobody’s Word for It: How to Check a Claim',
    subtitle: 'The Royal Society, the first science journal, and following a claim back to its source',
    digest: [
      'A claim is only as good as the evidence behind it, not as good as how sure the person sounds.',
      'Follow a claim back: who said it, where did they get it, and what does the original source actually show?',
      'Every lesson in this app numbers its sources, like [1], so you can check them yourself.',
    ],
    era: '1660 Royal Society → 1665 first journal → 1998 the glass question',
    who: 'The Royal Society and Edgar Zanotto',
    hook: 'You have probably heard that old church windows are thicker at the bottom because glass slowly flows. Is it true? How would you find out?',
    story: [
      'In 1660 a group of natural philosophers in London formed what became the Royal Society. Their motto was Nullius in verba, “take nobody’s word for it”: a claim had to be backed by experiment and evidence, not by the fame of whoever made it [1].',
      'In March 1665 the Society’s secretary, Henry Oldenburg, began publishing Philosophical Transactions, one of the first science journals, so that results could be read, repeated and argued over [2]. From 1752 a committee of the Society judged which papers to print, an early form of what we now call peer review [2][3].',
      'Try the method on the window story. A popular claim says glass is a very slow liquid, so old panes have sagged. Followed back to the evidence, it falls apart. In 1998 the Brazilian materials scientist Edgar Zanotto calculated that window glass at room temperature would take far longer than the age of the universe to flow noticeably [4].',
      'The real reason is how old glass was made: spinning or blowing it gave panes of uneven thickness, and builders often fitted the thick edge at the bottom, though not always [4][5]. A good habit: ask “says who, based on what?” and look at the original. That is why every class here lists numbered sources.',
    ],
    takeaway: 'Ask “says who, based on what?” Follow a claim to its original source before you repeat it, and trust evidence more than confidence.',
    viz: 'start_sources',
    vizTitle: 'Following a Claim Back to Its Source',
    vizHow: 'Start from the post and step back along the trail. Each step shows what that source really says, until you reach the evidence.',
    steps: [
      ['Says who?', '\\text{claim} \\to \\text{who said it}', 'Find where the claim came from.'],
      ['Based on what?', '\\text{source} \\to \\text{evidence}', 'Find the measurement or experiment behind it.'],
      ['Does it match?', '\\text{claim} \\overset{?}{=} \\text{what the evidence shows}', 'Claims often grow or change as they are passed along.'],
    ],
    drills: [
      ['What does Nullius in verba mean?', ['Take nobody’s word for it', 'Knowledge is power', 'Always trust experts', 'Nothing is certain'], 'The Royal Society motto.', 'Evidence over authority.', 'Take nobody’s word for it.'],
      ['Which is the best source for “a new steel is 30% stronger”?', ['The test report or paper with the measurements', 'A social media post', 'An advert from the seller', 'A friend who heard it'], 'Closest to the evidence.', 'Who measured it, and how?', 'The original measurements.'],
      ['Why are old window panes often thicker at the bottom?', ['They were made uneven and often fitted thick edge down', 'Glass flowed down over centuries', 'Rain wore the top thin', 'Builders added glass later'], 'Think about how glass was made.', 'Zanotto’s calculation rules out flow.', 'Uneven manufacture.'],
    ],
    boss: [
      'The Viral Claim',
      'A post says “scientists proved this metal never corrodes”, with no link. What is the best first move?',
      ['Look for the original study: who tested it, in what conditions, and what they actually measured', 'Share it, since scientists said so', 'Believe it if many people liked it', 'Ignore all science claims'],
      'Says who, based on what?',
      'Find the original. Usually a study shows something narrower, like “corroded ten times slower in a salt-spray test for 1,000 hours”. Popularity is not evidence.',
    ],
    read: [
      ['wiki', 'Royal Society', 'The Society and its motto.', 'The Royal Society is a learned society and the United Kingdom’s national academy of sciences.'],
      ['wiki', 'Philosophical Transactions of the Royal Society', 'The first science journal.', 'Philosophical Transactions of the Royal Society is a scientific journal published by the Royal Society.'],
    ],
    sources: [
      ['Wikipedia: Royal Society', W('Royal_Society'), 'founding in 1660 and the motto Nullius in verba'],
      ['Wikipedia: Philosophical Transactions of the Royal Society', W('Philosophical_Transactions_of_the_Royal_Society'), 'Oldenburg, 6 March 1665, and the Committee of Papers from 1752'],
      ['Wikipedia: Scholarly peer review', W('Scholarly_peer_review'), 'what peer review is and how it grew'],
      ['Zanotto (1998), “Do cathedral glasses flow?”, American Journal of Physics 66(5)', 'https://doi.org/10.1119/1.18874', 'the flow-time calculation'],
      ['Wikipedia: Glass (the “glass flows” myth)', W('Glass'), 'uneven panes from old glass making'],
    ],
    labs: [
      home('Pick one surprising claim you saw online this week. Write down: who said it, where they got it, and whether you can find the original. Score it from 1 (no source) to 5 (original data you can see).'),
      online('Philosophical Transactions, first issue (Royal Society, free)', 'https://royalsocietypublishing.org/toc/rstl/1/1', 'Open the 1665 first issue and read the contents. What kinds of claims did they print?'),
    ],
    quiz: [
      ['When was the Royal Society founded?', ['1660', '1760', '1560', '1860'], 'Restoration London.'],
      ['Who started Philosophical Transactions in 1665?', ['Henry Oldenburg', 'Isaac Newton', 'Robert Recorde', 'Fibonacci'], 'The Society’s first secretary.'],
    ],
    gloss: [
      ['Primary source', 'The original record of evidence: the experiment, the measurement or the first report of it.', ['original source']],
      ['Peer review', 'Checking of a study by other experts before it is published.', []],
      ['Citation', 'A note saying where a piece of information came from, like [1].', ['citations', 'cite']],
    ],
    events: [
      [1660, 'The Royal Society is founded', 'Nullius in verba.'],
      [1665, 'Philosophical Transactions begins', 'One of the first science journals.'],
    ],
  }),

  // ---------------------------------------------------------------------------
  mk({
    id: 'start-007',
    code: 'START 7',
    track: 'start',
    um: [],
    title: 'Pauk: Notes That Work, the Cornell Way',
    subtitle: 'A page with three parts: notes, questions, summary, built for testing yourself later',
    digest: [
      'Split the page: a wide notes column, a narrow question column on the left, and a summary strip at the bottom.',
      'Write notes in your own words, not word for word. Afterwards, turn each idea into a question in the left column.',
      'To review, cover the notes and answer the questions: retrieval practice and spacing, on one page.',
    ],
    era: '1950s Cornell University → 1962 How to Study in College',
    who: 'Walter Pauk',
    hook: 'You wrote four pages of notes. A week later they look like someone else’s handwriting. What went wrong?',
    story: [
      'In the 1950s Walter Pauk, a professor of education at Cornell University in New York State, designed a way of laying out a page of notes. He made it popular in his best-selling book How to Study in College, first published in 1962 [1][2].',
      'The page has three parts. The right-hand column, about twice as wide as the left, is for notes during the class. The narrow left column is for questions or key words added afterwards. A strip of five to seven lines at the bottom is for a short summary in your own words [1].',
      'The design builds in the two findings from earlier classes. Writing questions makes a ready-made self-test: cover the right side and answer from the left [1]. Coming back to the page over the following days spaces the reviews.',
      'Copying a lecture word for word is not the goal. In a 2014 study, students who typed notes on laptops copied more of the lecture word for word and did worse on questions that needed understanding [3]; later repeats found smaller differences [4], so the safer lesson is not pen versus laptop but to write ideas in your own words.',
    ],
    takeaway: 'Notes are for testing yourself later. Write ideas in your own words, add a question for each, summarise at the bottom, then cover and recall. You are ready for week 1.',
    viz: 'start_cornell',
    vizTitle: 'Building a Cornell Page',
    vizHow: 'Watch a page fill in: notes during class, questions afterwards, a summary at the end. Then cover the notes and answer from the questions.',
    steps: [
      ['During class', '\\text{right column: ideas in your own words}', 'Short phrases, not every word.'],
      ['Right after', '\\text{left column: a question for each idea}', 'Turn notes into a self-test.'],
      ['To review', '\\text{cover the right} \\to \\text{answer the left}', 'Retrieval practice on paper.'],
    ],
    drills: [
      ['What goes in the narrow left column of a Cornell page?', ['Questions or key words, added after class', 'The date only', 'Doodles', 'A copy of the notes'], 'It is used for self-testing.', 'Added afterwards.', 'Questions.'],
      ['How do you review with a Cornell page?', ['Cover the notes and answer the questions from memory', 'Reread the notes column three times', 'Highlight the summary', 'Rewrite it neatly'], 'Recall, not reread.', 'Cover the right side.', 'Self-test.'],
      ['What did the 2014 laptop study find about copying word for word?', ['It went with weaker understanding; writing in your own words helps', 'It made students learn more', 'It had no effect at all', 'It doubled memory'], 'Verbatim vs own words.', 'Later studies found smaller gaps.', 'Own words matter.'],
    ],
    boss: [
      'Notes From a Lecture',
      'Your teacher explains in ten minutes why steel rusts and paint stops it. Which page is most useful for next week?',
      ['Short notes in your own words, a question beside each (“why does paint stop rust?”), and a two-line summary', 'Every sentence copied exactly', 'Only a photo of the board', 'One word: “rust”'],
      'Notes, questions, summary.',
      'Own-words notes show you understood; the questions let you test yourself; the summary forces you to pick the main idea. A copy or a photo needs rereading, which works least well.',
    ],
    read: [
      ['wiki', 'Cornell Notes', 'The layout and how to use it.', 'The Cornell Notes system is a note-taking system devised in the 1950s by Walter Pauk, an education professor at Cornell University.'],
      ['link', 'Cornell University Learning Strategies Center', 'The Cornell Note Taking System', 'https://lsc.cornell.edu/how-to-study/taking-notes/cornell-note-taking-system/', 'The university’s own guide.', 'Divide your paper into three sections.'],
    ],
    sources: [
      ['Wikipedia: Cornell Notes', W('Cornell_Notes'), 'Pauk, the 1950s, the column widths and the summary strip'],
      ['Pauk, W. (1962), How to Study in College, Houghton Mifflin', 'https://openlibrary.org/search?q=How+to+Study+in+College+Pauk', 'the book that made the method popular'],
      ['Mueller & Oppenheimer (2014), “The Pen Is Mightier Than the Keyboard”, Psychological Science 25(6)', 'https://doi.org/10.1177/0956797614524581', 'laptop notes, word-for-word copying and understanding'],
      ['Morehead, Dunlosky & Rawson (2019), “How Much Mightier Is the Pen than the Keyboard?”, Educational Psychology Review 31', 'https://doi.org/10.1007/s10648-019-09468-2', 'the repeat study with smaller differences'],
    ],
    labs: [
      home('Rule a page into three parts: a 6 cm left column, the rest on the right, and a 5 cm strip at the bottom. Make Cornell notes on your first program class, then test yourself from the left column two days later.'),
      online('Cornell Learning Strategies Center guide (free)', 'https://lsc.cornell.edu/how-to-study/taking-notes/cornell-note-taking-system/', 'Read the guide and print or copy its page layout.'),
    ],
    quiz: [
      ['Who designed the Cornell note-taking page?', ['Walter Pauk', 'Hermann Ebbinghaus', 'George Pólya', 'Henry Oldenburg'], 'An education professor at Cornell.'],
      ['What goes in the strip at the bottom?', ['A short summary in your own words', 'The teacher’s name', 'The answers to the quiz', 'Nothing'], 'Five to seven lines.'],
    ],
    gloss: [
      ['Cornell notes', 'A page split into notes, questions and a summary, designed for testing yourself later.', ['Cornell method', 'Cornell note']],
      ['Verbatim', 'Word for word, exactly as said.', []],
    ],
    events: [[1962, 'Pauk’s How to Study in College', 'The Cornell note page becomes widely known.']],
  }),
];
