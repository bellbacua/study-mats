// Computer Science program, HCI, software engineering, parallel computing,
// ethics and the thesis (cs-157 to cs-162): each class split into three parts.
// Every number was worked out and checked by script.

const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const CS_PRACTICE = {
  'cs-157': {
    predict: {
      q: 'You make a button twice as wide. Does the time to tap it halve?',
      options: ['No: it falls a little, because time grows with a logarithm', 'Yes, exactly half', 'It doesn’t change at all', 'It doubles'],
      answer: 0,
      reveal: 'Fitts’s law: time = a + b log₂(D/W + 1). Doubling W lowers the log by at most 1 bit, so time drops by about b, not by half.',
    },
    parts: [
      {
        title: 'Fitts’s law',
        minutes: 20,
        explain: [
          'Pointing has two parts: a fast jump toward the target and small corrections at the end. Fitts found that the total time depends on the ratio of distance D to width W.',
          'The index of difficulty is ID = log₂(D/W + 1) bits. Time is T = a + b·ID, where a and b are measured for each device; for a mouse, a ≈ 100 ms and b ≈ 150 ms per bit are typical values.',
          'Design rules follow: make common targets big and close, put menus at screen edges (which you cannot overshoot), and keep dangerous buttons away from common ones.',
        ],
        formulas: [['Index of difficulty', 'ID = \\log_2\\!\\left(\\dfrac{D}{W} + 1\\right)'], ['Time', 'T = a + b \\cdot ID']],
        examples: [
          ex('D = 700 px, W = 100 px. ID?', [['D/W + 1 = 8.', ''], ['log₂ 8.', '3\\ \\text{bits}']], '3 bits'),
          ex('With a = 100 ms and b = 150 ms/bit, the time for ID = 3?', [['100 + 150 × 3.', ''], ['Add.', '550\\,\\text{ms}']], '550 ms'),
        ],
        practice: [
          pr('D = 300, W = 100. ID in bits?', 2, 'log₂ 4.', '2.'),
          pr('D = 1,550, W = 50. ID in bits?', 5, 'log₂ 32.', '5.'),
          pr('a = 100 ms, b = 150 ms/bit, ID = 5. Time in ms?', 850, '100 + 750.', '850 ms.'),
          pr('D = 750: W goes from 50 to 100. New ID? (old was 4)', 3.09, 'log₂(7.5 + 1).', 'log₂ 8.5 ≈ 3.09: doubling W saved under 1 bit.'),
        ],
      },
      {
        title: 'Choosing from menus: Hick’s law',
        minutes: 20,
        explain: [
          'William Hick (1952) and Ray Hyman (1953) found that the time to choose among n equally likely options grows with log₂(n + 1). Each doubling of options adds a roughly fixed amount of time.',
          'Logarithmic growth means a well-organised long list is fine, but only if people can scan it in order (alphabetical, grouped) and halve the options as they go.',
          'Too many unorganised choices, or choices people must remember instead of recognise, slow everyone down. Nielsen’s heuristic “recognition rather than recall” says the same thing.',
        ],
        formulas: [['Hick’s law', 'T = b \\log_2(n + 1)']],
        examples: [
          ex('A menu with 7 items: log₂(n + 1)?', [['7 + 1 = 8.', ''], ['log₂ 8.', '3']], '3 bits'),
          ex('With b = 200 ms, how long for 15 items?', [['log₂ 16 = 4.', ''], ['200 × 4.', '800\\,\\text{ms}']], '800 ms'),
        ],
        practice: [
          pr('log₂(n + 1) for a menu of 31 items?', 5, '32 = 2⁵.', '5.'),
          pr('b = 200 ms: choice time for 31 items, in ms?', 1000, '200 × 5.', '1,000 ms.'),
          pr('b = 200 ms: extra time going from 7 to 15 items, in ms?', 200, '4 bits − 3 bits.', '200 ms.'),
          ch('Which follows “recognition rather than recall”?', ['A list of recent files to click', 'Typing a file’s exact path from memory', 'A blank command line', 'Hiding the menu'], 'Seeing beats remembering.', 'Showing options lets people recognise them.'),
        ],
      },
      {
        title: 'Testing with real people',
        minutes: 20,
        explain: [
          'Watching five users try real tasks while thinking aloud reveals most big problems. Nielsen and Landauer (1993) modelled it: if each user finds a share L of the problems, n users find 1 − (1 − L)ⁿ. With L ≈ 0.31, five users find about 84%.',
          'So test small and often: five users, fix what you saw, test again, rather than one big test with many users.',
          'Never blame the user in a test. When someone struggles, the design is what you are testing.',
        ],
        formulas: [['Share of problems found', '1 - (1 - L)^n']],
        examples: [
          ex('L = 0.31, n = 5. Share found?', [['0.69⁵ ≈ 0.156.', ''], ['1 − 0.156.', '\\approx 0.84']], 'About 84%'),
          ex('Same, with n = 1?', [['1 − 0.69.', ''], ['Result.', '0.31']], '31%'),
        ],
        practice: [
          pr('L = 0.31, n = 3. Share of problems found (as a decimal)?', 0.671, '1 − 0.69³.', '1 − 0.329 ≈ 0.671.'),
          pr('L = 0.31, n = 15. Share found (decimal, 3 places)?', 0.996, '1 − 0.69¹⁵.', '≈ 0.996.'),
          pr('Budget for 15 users: three rounds of 5 or one round of 15? Write 3 or 1 for the number of rounds Nielsen recommends.', 3, 'Fix between rounds.', 'Three rounds of five: each round tests the fixed design.'),
          ch('A user taps the wrong button three times. What do you write down?', ['A design problem with that button', 'User error', 'Nothing', 'The user needs training'], 'Norman.', 'Repeated mistakes point to the design.'),
        ],
      },
    ],
  },

  'cs-158': {
    predict: {
      q: 'A team of 5 grows to 10. How many more pairs of people might need to talk?',
      options: ['35 more (10 → 45)', '5 more', 'Twice as many', 'The same'],
      answer: 0,
      reveal: 'Pairs grow like n(n − 1)/2: 10 pairs for 5 people, 45 for 10. Doubling the team more than quadruples the talking.',
    },
    parts: [
      {
        title: 'Brooks’s law and team size',
        minutes: 20,
        explain: [
          'Each pair of people on a project is a possible line of communication: n(n − 1)/2 of them. New people also need training from those already busy.',
          'Brooks’s law (1975): adding people to a late project makes it later. Work that cannot be split (like one person’s design) does not speed up at all.',
          'The fix is structure: small teams with clear boundaries and few links between teams.',
        ],
        formulas: [['Communication paths', '\\dfrac{n(n-1)}{2}']],
        examples: [
          ex('Paths in a team of 6?', [['6 × 5 / 2.', ''], ['Result.', '15']], '15'),
          ex('Two teams of 5, plus one link between their leads. Paths?', [['10 inside each team.', '10 + 10'], ['Plus 1.', '21']], '21, against 45 for one team of 10'),
        ],
        practice: [
          pr('Paths in a team of 20?', 190, '20 × 19 / 2.', '190.'),
          pr('Paths in a team of 8?', 28, '8 × 7 / 2.', '28.'),
          pr('Four teams of 5, with the 4 leads all linked to each other. Total paths?', 46, '4 × 10 inside, plus 6 among leads.', '40 + 6 = 46, against 190 for one team of 20.'),
          ch('Why can adding people slow a late project?', ['Training and communication take time from the people already working', 'New people type slower', 'Computers run slower', 'It never does'], 'Brooks.', 'Ramp-up and coordination costs.'),
        ],
      },
      {
        title: 'Planning and estimating',
        minutes: 20,
        explain: [
          'Brooks’s rule of thumb for a schedule: 1/3 planning, 1/6 coding, 1/4 testing parts, 1/4 testing the whole system. Coding is the smallest share.',
          'Agile teams estimate work in “story points” and measure their velocity, the points finished per cycle (sprint). Remaining work ÷ velocity gives a forecast.',
          'Forecasts are ranges, not promises. Measure, then update.',
        ],
        formulas: [['Forecast', '\\text{sprints} = \\dfrac{\\text{remaining points}}{\\text{velocity}}']],
        examples: [
          ex('A 12-month project by Brooks’s rule: months of coding?', [['1/6 of 12.', ''], ['Result.', '2']], '2 months'),
          ex('Backlog 140 points, velocity 20 per two-week sprint. Weeks left?', [['140 / 20 = 7 sprints.', ''], ['× 2 weeks.', '14']], '14 weeks'),
        ],
        practice: [
          pr('A 12-month project by Brooks’s rule: months of testing (parts plus system)?', 6, '1/4 + 1/4 of 12.', '6.'),
          pr('A 12-month project: months of planning?', 4, '1/3 of 12.', '4.'),
          pr('Backlog 90 points, velocity 15 per sprint. Sprints left?', 6, '90 ÷ 15.', '6.'),
          pr('Velocity drops from 20 to 16. Backlog 80. Sprints left?', 5, '80 ÷ 16.', '5.'),
        ],
      },
      {
        title: 'Flow: Little’s law',
        minutes: 20,
        explain: [
          'John Little proved in 1961 that for any steady system, the average number of items inside equals the arrival rate times the average time each spends inside: L = λW.',
          'For a software team: tasks in progress = tasks finished per week × weeks each task takes. Starting more tasks at once does not finish them faster; it makes each one take longer.',
          'Kanban boards limit work in progress for this reason: finish before starting.',
        ],
        formulas: [['Little’s law', 'L = \\lambda W \\quad\\Rightarrow\\quad W = \\dfrac{L}{\\lambda}']],
        examples: [
          ex('12 tasks in progress, 4 finished per week. Average time per task?', [['W = L / λ.', '12 / 4'], ['Result.', '3\\ \\text{weeks}']], '3 weeks'),
          ex('Cut work in progress to 6, same throughput. Time per task?', [['6 / 4.', ''], ['Result.', '1.5\\ \\text{weeks}']], '1.5 weeks'),
        ],
        practice: [
          pr('20 tasks in progress, 5 finished per week. Weeks per task?', 4, '20 ÷ 5.', '4.'),
          pr('Tasks take 2 weeks on average and 6 finish per week. Tasks in progress?', 12, 'L = λW.', '12.'),
          pr('A jeepney terminal sends off 30 passengers an hour and each waits 0.5 h on average. Passengers waiting?', 15, 'L = λW.', '15.'),
          ch('What does limiting work in progress do, by Little’s law?', ['Shortens the time each task takes, if throughput stays the same', 'Makes the team bigger', 'Removes all bugs', 'Nothing'], 'W = L / λ.', 'Smaller L, same λ, smaller W.'),
        ],
      },
    ],
  },

  'cs-159': {
    predict: {
      q: 'A bug appeared somewhere in the last 1,000 commits. About how many commits must you test to find which one?',
      options: ['About 10', 'About 500', 'All 1,000', 'About 100'],
      answer: 0,
      reveal: 'Bisecting halves the suspects each time: 1,000 → 500 → 250 → … → 1 in about log₂ 1000 ≈ 10 tests.',
    },
    parts: [
      {
        title: 'Commits, branches and hashes',
        minutes: 20,
        explain: [
          'A commit is a snapshot of the project with a message, an author and a pointer to its parent commit. The chain of parents is the history.',
          'Git names each commit by a SHA-1 hash of its contents and its parent’s hash: 160 bits, written as 40 hexadecimal characters. Changing anything in history changes every later hash, so tampering shows.',
          'A branch is a movable label on a commit. Teams work on branches in parallel and merge them; a merge commit has two parents.',
        ],
        formulas: [['Hex characters for b bits', 'b / 4']],
        code: [['Everyday Git', 'git add lesson.js\ngit commit -m "Fix wrong answer in cs-131"\ngit switch -c new-scene      # new branch\ngit merge new-scene          # bring it back\ngit log --oneline']],
        examples: [
          ex('How many hex characters in a SHA-1 hash?', [['160 bits, 4 bits per hex digit.', '160 / 4'], ['Result.', '40']], '40'),
          ex('How many different 7-character short hashes are there?', [['16 choices each.', '16^7'], ['Result.', '268\\,435\\,456']], 'About 268 million'),
        ],
        practice: [
          pr('Hex characters in a 256-bit SHA-256 hash?', 64, '256 ÷ 4.', '64.'),
          pr('How many parents does a merge of two branches have?', 2, 'Both histories.', '2.'),
          pr('How many different 4-character hex strings are there?', 65536, '16⁴.', '65,536.'),
          ch('Why does changing an old commit change all later hashes?', ['Each commit’s hash includes its parent’s hash', 'Git renumbers everything', 'Hashes are random', 'It doesn’t'], 'A chain.', 'The change ripples down the chain.'),
        ],
      },
      {
        title: 'Bisecting history',
        minutes: 20,
        explain: [
          'git bisect is binary search over commits. Mark one good and one bad commit; Git checks out the middle; you test and mark it; repeat.',
          'Each test halves the suspects, so n commits need about ⌈log₂ n⌉ tests. A script can do the testing automatically: git bisect run.',
          'Small commits make this powerful: the guilty commit then shows a small, readable change.',
        ],
        formulas: [['Tests needed', '\\lceil \\log_2 n \\rceil']],
        examples: [
          ex('Tests for 64 commits?', [['2⁶ = 64.', ''], ['Result.', '6']], '6'),
          ex('Tests for 100 commits?', [['2⁶ = 64 < 100 ≤ 128 = 2⁷.', ''], ['Result.', '7']], '7'),
        ],
        practice: [
          pr('Tests for 1,000 commits?', 10, '2¹⁰ = 1,024.', '10.'),
          pr('Tests for 1,000,000 commits?', 20, '2²⁰ ≈ 1.05 million.', '20.'),
          pr('In the animation (bug at commit 41), which commit is tested first?', 31, 'The middle of 0 and 63.', '⌊63/2⌋ = 31.'),
          pr('Each test takes 3 minutes. Minutes to bisect 500 commits?', 27, '⌈log₂ 500⌉ = 9.', '9 × 3 = 27.'),
        ],
      },
      {
        title: 'Automated tests',
        minutes: 25,
        explain: [
          'A unit test calls a function with chosen inputs and checks the output. Run on every change, tests catch regressions: things that used to work and broke.',
          'You cannot test every input. Good testers pick boundaries (just inside and just outside each limit), special cases (empty, zero, negative) and typical values.',
          'Dijkstra’s warning stands: passing tests show the bugs you looked for are absent, not that all bugs are. Tests and careful reasoning (cs-113) work together.',
        ],
        formulas: [['Input combinations of k yes/no options', '2^k']],
        code: [['A pytest test', 'def grade(score):\n    return "pass" if score >= 75 else "fail"\n\ndef test_grade():\n    assert grade(75) == "pass"   # boundary\n    assert grade(74) == "fail"   # just below\n    assert grade(100) == "pass"\n    assert grade(0) == "fail"']],
        examples: [
          ex('A function takes 10 yes/no settings. How many combinations?', [['Each doubles.', '2^{10}'], ['Result.', '1024']], '1,024'),
          ex('Ages 18 to 60 are allowed. Which boundary values to test?', [['Just outside and just inside each end.', ''], ['17, 18, 60, 61.', '4']], '17, 18, 60, 61'),
        ],
        practice: [
          pr('A form has 3 yes/no options. Combinations?', 8, '2³.', '8.'),
          pr('Scores 0 to 100 are valid, passing from 75. How many boundary tests: −1, 0, 74, 75, 100, 101?', 6, 'Count them.', '6.'),
          pr('Two independent test suites each catch a given bug with probability 0.9. Probability at least one catches it?', 0.99, '1 − 0.1 × 0.1.', '0.99.'),
          ch('All 200 tests pass. What do you know?', ['The tested behaviours work; other bugs may remain', 'The program has no bugs', 'The tests are wrong', 'Nothing at all'], 'Dijkstra.', 'Tests show presence, not absence.'),
        ],
      },
    ],
  },

  'cs-160': {
    predict: {
      q: 'A program is 90% parallel. With 10 cores, how much faster is it?',
      options: ['About 5.3×', '10×', '9×', '90×'],
      answer: 0,
      reveal: 'Amdahl: 1 / (0.1 + 0.9/10) = 1 / 0.19 ≈ 5.3. The 10% that cannot be split already takes half the remaining time.',
    },
    parts: [
      {
        title: 'Amdahl’s law',
        minutes: 20,
        explain: [
          'Split a job into a serial fraction 1 − p, which must run on one core, and a parallel fraction p, which can be divided among N cores. The time becomes (1 − p) + p/N of the original.',
          'Speed-up S = 1 / ((1 − p) + p/N). As N grows, S approaches 1 / (1 − p): a ceiling set entirely by the serial part.',
          'Efficiency S/N says how well the cores are used. It falls as you add cores.',
        ],
        formulas: [['Amdahl', 'S = \\dfrac{1}{(1-p) + p/N}'], ['Ceiling', 'S_{\\max} = \\dfrac{1}{1-p}']],
        examples: [
          ex('p = 0.9, N = 10. Speed-up?', [['0.1 + 0.09 = 0.19.', ''], ['1 / 0.19.', '\\approx 5.26']], 'About 5.26×'),
          ex('p = 0.95, N = 64. Speed-up?', [['0.05 + 0.95/64 ≈ 0.0648.', ''], ['Invert.', '\\approx 15.4']], 'About 15.4×'),
        ],
        practice: [
          pr('Ceiling for p = 0.99?', 100, '1 / 0.01.', '100×.'),
          pr('p = 0.75, N = 4. Speed-up?', 2.29, '1 / (0.25 + 0.1875).', '≈ 2.29×.'),
          pr('p = 0.9, N = 10. Efficiency S/N as a %?', 52.6, '5.26 ÷ 10.', '≈ 52.6%.'),
          pr('Ceiling for p = 0.8?', 5, '1 / 0.2.', '5×.'),
        ],
      },
      {
        title: 'Gustafson’s law and real scaling',
        minutes: 20,
        explain: [
          'Amdahl fixes the problem size. Gustafson (1988) fixed the time instead: with more cores, people run bigger problems, and the parallel part grows.',
          'If on N cores a fraction 1 − p of the time is serial, the same work would take (1 − p) + pN on one core, so the scaled speed-up is S = (1 − p) + pN.',
          'Both are right for their question. Rendering one frame faster hits Amdahl’s ceiling; rendering films at higher resolution follows Gustafson.',
        ],
        formulas: [['Gustafson', 'S = (1-p) + pN']],
        examples: [
          ex('p = 0.95, N = 100, Gustafson speed-up?', [['0.05 + 95.', ''], ['Result.', '95.05']], '95.05×'),
          ex('Same p and N under Amdahl?', [['0.05 + 0.0095 = 0.0595.', ''], ['Invert.', '\\approx 16.8']], 'About 16.8×'),
        ],
        practice: [
          pr('p = 0.9, N = 10, Gustafson speed-up?', 9.1, '0.1 + 9.', '9.1×.'),
          pr('p = 0.99, N = 1,000, Gustafson speed-up?', 990.01, '0.01 + 990.', '990.01×.'),
          pr('p = 0.5, N = 2, Amdahl speed-up?', 1.33, '1 / (0.5 + 0.25).', '≈ 1.33×.'),
          ch('A weather service buys 10× more cores and runs a finer grid in the same time. Which law fits?', ['Gustafson’s', 'Amdahl’s', 'Moore’s', 'Brooks’s'], 'The problem grew.', 'Fixed time, bigger problem: Gustafson.'),
        ],
      },
      {
        title: 'GPUs and data parallelism',
        minutes: 25,
        explain: [
          'A CPU has a few powerful cores good at varied, branching work. A GPU has thousands of simpler cores that run the same instructions on different data at once (SIMD).',
          'Pixels, matrix multiplication and neural network layers are perfect for this: millions of independent multiply-adds.',
          'The catch is moving data: copying it between main memory and the GPU takes time, so GPUs pay off for big batches of work.',
        ],
        formulas: [['Matrix multiply work (n × n)', 'n^3 \\text{ multiply-adds} \\approx 2n^3 \\text{ operations}']],
        code: [['Same sum on CPU and GPU (PyTorch)', 'import torch\na = torch.rand(4000, 4000)\nc = a @ a                       # CPU\nif torch.cuda.is_available():\n    g = a.cuda()\n    c = g @ g                   # GPU, thousands of cores']],
        examples: [
          ex('A 1920 × 1080 screen: pixels to colour?', [['Multiply.', '1920 \\times 1080'], ['Result.', '2\\,073\\,600']], '2,073,600'),
          ex('A GPU with 2,048 cores does one pixel per core per round. Rounds?', [['2,073,600 / 2,048 = 1,012.5.', ''], ['Round up.', '1013']], '1,013'),
        ],
        practice: [
          pr('Multiply-adds in a 1000 × 1000 matrix product?', 1000000000, 'n³.', '10⁹.'),
          pr('Operations (2n³) for n = 4,000, at 10¹⁴ per second: milliseconds?', 1.28, '2 × 6.4 × 10¹⁰ = 1.28 × 10¹¹.', '1.28 × 10¹¹ ÷ 10¹⁴ = 1.28 ms.'),
          pr('A 4K screen is 3840 × 2160. How many pixels?', 8294400, 'Multiply.', '8,294,400.'),
          ch('Which task suits a GPU best?', ['Brightening every pixel of a photo', 'Reading a file line by line', 'A long chain of if-else decisions', 'Waiting for a key press'], 'Same operation, many data.', 'Every pixel gets the same independent operation.'),
        ],
      },
    ],
  },

  'cs-161': {
    predict: {
      q: 'A dataset has names removed but keeps birth date, sex and postal code. Is it anonymous?',
      options: ['Usually not: those three facts identify most people', 'Yes, names are what identify people', 'Only if it is small', 'Yes, if it is encrypted on disk'],
      answer: 0,
      reveal: 'Sweeney estimated that about 87% of Americans are unique on birth date, sex and ZIP code. Joining with a public list, like voter rolls, puts names back.',
    },
    parts: [
      {
        title: 'Re-identification',
        minutes: 20,
        explain: [
          'Quasi-identifiers are ordinary facts that are harmless alone but identifying together. Each one divides the crowd: sex by about 2, birth year by about 70, birthday by 365.',
          'Expected matches = population × the product of the fractions. When it falls below 1, the person is probably unique.',
          'Linking two datasets on shared quasi-identifiers (a voter list and medical records) attaches names to “anonymous” rows. This is how Sweeney found Governor Weld’s record.',
        ],
        formulas: [['Expected matches', 'N \\times f_1 \\times f_2 \\times \\cdots']],
        examples: [
          ex('Town of 10,000: sex, birth year, birthday. Expected matches?', [['10,000 × 1/2 × 1/70 × 1/365.', ''], ['Result.', '\\approx 0.2']], 'About 0.2: likely unique'),
          ex('A city of 1,000,000 with the same three facts?', [['1,000,000 / 51,100.', ''], ['Result.', '\\approx 19.6']], 'About 20'),
        ],
        practice: [
          pr('An area of 5,000 people; full birth date (1 in 25,550) and sex (1 in 2). Expected matches (3 decimals)?', 0.098, '5,000 ÷ 51,100.', '≈ 0.098.'),
          pr('Town of 10,000: sex and birth year only. Expected matches (nearest whole)?', 71, '10,000 ÷ 140.', '≈ 71.'),
          pr('How many people do you need before a fact with frequency 1 in 365 expects one match?', 365, 'N × 1/365 = 1.', '365.'),
          ch('Which is a quasi-identifier?', ['Postal code', 'A random record number', 'The colour of the table header', 'The dataset’s name'], 'Ordinary but identifying when combined.', 'Postal code narrows where someone lives.'),
        ],
      },
      {
        title: 'k-anonymity and blurring',
        minutes: 20,
        explain: [
          'Sweeney’s k-anonymity: release data so that every combination of quasi-identifiers is shared by at least k people. Then no row points to fewer than k people.',
          'Tools: generalise (birth decade instead of year, month instead of date, region instead of barangay) and suppress rare rows.',
          'k-anonymity is not the end of the story: if all k people share the same diagnosis, the diagnosis still leaks. Later methods such as differential privacy add carefully measured noise instead.',
        ],
        formulas: [['After blurring', 'N \\times \\tfrac12 \\times \\tfrac17 \\times \\tfrac1{12}']],
        examples: [
          ex('Town of 10,000: sex, birth decade, birth month. Expected group size?', [['10,000 / (2 × 7 × 12).', '10\\,000 / 168'], ['Result.', '\\approx 59.5']], 'About 60'),
          ex('Ages 0 to 69 in 5-year bands. How many bands?', [['70 / 5.', ''], ['Result.', '14']], '14'),
        ],
        practice: [
          pr('Ages 0 to 79 in 10-year bands: how many bands?', 8, '80 ÷ 10.', '8.'),
          pr('Town of 10,000: sex and birth decade (1 in 7). Expected group size (nearest whole)?', 714, '10,000 ÷ 14.', '≈ 714.'),
          pr('A table must be 5-anonymous. A group has 3 rows. At least how many more matching rows would make it acceptable, if it cannot be merged?', 2, '5 − 3.', '2 (otherwise suppress or generalise).'),
          ch('Every one of the k people in a group has the same illness. What leaks?', ['The illness of anyone known to be in the group', 'Nothing', 'Their names', 'Their passwords'], 'Same value for all.', 'This is the weakness that l-diversity and differential privacy address.'),
        ],
      },
      {
        title: 'Law and professional duty',
        minutes: 20,
        explain: [
          'The Philippine Data Privacy Act (RA 10173, 2012) rests on transparency, legitimate purpose and proportionality. People have rights to be informed, to access, to correct and to have data erased. The National Privacy Commission requires serious breaches to be reported within 72 hours.',
          'The EU’s GDPR (2018) applies similar ideas, with fines of up to €20 million or 4% of global annual turnover, whichever is higher.',
          'The ACM Code of Ethics (2018) asks computing professionals to contribute to society, avoid harm, be honest, respect privacy and honour confidentiality. In practice: ask who could be hurt by what you build, and say so when you see it.',
        ],
        formulas: [['GDPR maximum fine (euros)', '\\max(20\\text{ million},\\ 0.04 \\times \\text{turnover})']],
        examples: [
          ex('A company with €1 billion turnover: maximum GDPR fine?', [['4% of 1 billion = 40 million.', ''], ['Higher than 20 million.', '40\\text{ million euros}']], '€40 million'),
          ex('A breach is found Monday 9:00. NPC notification deadline?', [['72 hours.', ''], ['Thursday 9:00.', '']], 'Thursday 9:00'),
        ],
        practice: [
          pr('A company with €100 million turnover: maximum GDPR fine, in millions of euros?', 20, '4% is only 4 million.', 'The higher figure: €20 million.'),
          pr('In what year was the Philippine Data Privacy Act passed?', 2012, 'RA 10173.', '2012.'),
          pr('About how many million voters’ records leaked from Comelec in 2016?', 55, 'March 2016.', 'About 55 million.'),
          ch('A manager asks you to collect contacts “in case they’re useful later”. Which principle does this break?', ['Legitimate, stated purpose and proportionality', 'Durability', 'Encryption', 'None'], 'Why is it collected?', 'Data must be collected for a declared purpose and only as much as needed.'),
        ],
      },
    ],
  },

  'cs-162': {
    predict: {
      q: 'You test 20 different ideas, each at the usual 5% “significance” level, and none of them really works. What is the chance at least one looks like a discovery?',
      options: ['About 64%', 'About 5%', 'About 1%', 'Zero'],
      answer: 0,
      reveal: '1 − 0.95²⁰ ≈ 0.64. Run enough tests and luck will hand you a “result”. Good research decides its question and test in advance and reports everything it tried.',
    },
    parts: [
      {
        title: 'A question and a fair test',
        minutes: 20,
        explain: [
          'A thesis starts with a question small enough to answer: “Does caching quiz answers make this app load faster on a ₱3,000 phone?” is better than “Make apps faster”.',
          'The usual chapters: introduction (the question and why it matters), related work (what others found), method (exactly what you did), results (what happened, with uncertainty), discussion and conclusion (what it means and its limits).',
          'A fair test changes one thing at a time, uses the same inputs and machine for both methods, and repeats each run, because computers are noisy: background tasks, caches and heat all change timings.',
        ],
        formulas: [['Mean', '\\bar x = \\dfrac{1}{n}\\sum x_i'], ['Sample spread', 's = \\sqrt{\\dfrac{\\sum (x_i - \\bar x)^2}{n-1}}']],
        code: [['Timing fairly in Python', 'import statistics, time\ndef run(f, n=25):\n    ts = []\n    for _ in range(n):\n        t0 = time.perf_counter(); f(); ts.append(time.perf_counter() - t0)\n    return statistics.mean(ts), statistics.stdev(ts)']],
        examples: [
          ex('Runs of 9.4, 9.8 and 9.6 s. Mean?', [['Sum 28.8.', ''], ['÷ 3.', '9.6']], '9.6 s'),
          ex('Their sample spread s?', [['Deviations −0.2, 0.2, 0: squares sum to 0.08.', ''], ['√(0.08 / 2).', '0.2']], '0.2 s'),
        ],
        practice: [
          pr('Runs of 10.1, 9.9, 10.3, 9.7 s. Mean?', 10, 'Sum is 40.', '10.0 s.'),
          pr('Same runs: sample spread s (2 decimals)?', 0.26, 'Squares sum to 0.2; ÷ 3; square root.', '√0.0667 ≈ 0.26 s.'),
          ch('Which is a well-scoped thesis question?', ['Does method X cut load time on low-end phones by 20%?', 'Make all software better', 'What is computing?', 'Build the best app'], 'Answerable with evidence.', 'It names a method, a measure and a setting.'),
          ch('You change both the algorithm and the computer between runs. What is wrong?', ['You cannot tell which change caused the difference', 'Nothing', 'The runs are too fast', 'You need fewer runs'], 'One thing at a time.', 'The two changes are confounded.'),
        ],
      },
      {
        title: 'Uncertainty and intervals',
        minutes: 25,
        explain: [
          'The mean of n runs is uncertain too. Its standard error is SE = s/√n: four times the runs, half the uncertainty.',
          'A 95% confidence interval is roughly mean ± 1.96 SE for many runs (for a handful, a slightly larger t-value is used). If A’s and B’s intervals do not overlap, the difference is very unlikely to be luck.',
          'Report the interval, not just the mean: “9.62 ± 0.12 s (95% CI, 25 runs)”.',
        ],
        formulas: [['Standard error', '\\text{SE} = \\dfrac{s}{\\sqrt{n}}'], ['95% interval', '\\bar x \\pm 1.96\\,\\text{SE}']],
        examples: [
          ex('s = 0.5 s, n = 25. SE?', [['√25 = 5.', '0.5 / 5'], ['Result.', '0.1\\,\\text{s}']], '0.1 s'),
          ex('Half-width of the 95% interval?', [['1.96 × 0.1.', ''], ['Result.', '0.196\\,\\text{s}']], 'About 0.2 s'),
        ],
        practice: [
          pr('s = 0.5 s. How many runs for SE = 0.05 s?', 100, '√n = 10.', '100.'),
          pr('s = 2 ms, n = 16. SE in ms?', 0.5, '2 ÷ 4.', '0.5 ms.'),
          pr('In the animation, the fewest runs at which the intervals stop overlapping?', 19, 'Step through.', '19 runs.'),
          pr('A: 9.6 ± 0.15 s. B: 10.0 ± 0.15 s. Gap between A’s upper end and B’s lower end, in s?', 0.1, '9.75 to 9.85.', '0.1 s: no overlap.'),
        ],
      },
      {
        title: 'Honest results and reproducibility',
        minutes: 20,
        explain: [
          'Trying many variations and reporting only the one that “worked” (p-hacking) produces false discoveries: with 20 tries at 5%, one false hit is expected.',
          'Fixes: write down the question and test before running them, report all variants tried, and confirm surprising results on fresh data.',
          'Share the code, data and exact settings so others can rerun everything. A result others can reproduce is worth far more than a bigger number nobody can check.',
        ],
        formulas: [['At least one false hit in m tests', '1 - (1 - \\alpha)^m']],
        examples: [
          ex('20 tests at α = 0.05: chance of at least one false hit?', [['0.95²⁰ ≈ 0.358.', ''], ['1 − 0.358.', '\\approx 0.64']], 'About 64%'),
          ex('Expected number of false hits in 20 tests?', [['20 × 0.05.', ''], ['Result.', '1']], '1'),
        ],
        practice: [
          pr('Expected false hits in 100 tests at α = 0.05?', 5, '100 × 0.05.', '5.'),
          pr('Chance of at least one false hit in 10 tests at α = 0.05 (2 decimals)?', 0.4, '1 − 0.95¹⁰.', '≈ 0.40.'),
          pr('Bonferroni: to keep the overall chance near 5% across 20 tests, what α should each test use?', 0.0025, '0.05 ÷ 20.', '0.0025.'),
          ch('What most helps others trust your thesis results?', ['Sharing code, data and settings so they can rerun it', 'Reporting only the best run', 'Using a bigger font', 'Leaving out the method'], 'Reproducibility.', 'Others can check it themselves.'),
        ],
      },
    ],
  },
};
