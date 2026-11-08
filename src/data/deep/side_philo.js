// Philosophy and Logic side topic: each class split into parts.
// Practice mixes pick-an-answer questions (first option correct, shown shuffled)
// with typed numbers that are computed in place.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution) => ({ q, options, hint, solution });

const laplace = (n) => (n + 1) / (n + 2);
const post = (base, sens, fpr) => (base * sens) / (base * sens + (1 - base) * fpr);

export const SIDE_PHILO = {
  'phil-001': {
    predict: {
      q: 'Someone defines a chair as "something with four legs that you sit on". What is the quickest way to test it?',
      options: ['Look for a counterexample: a chair without four legs, or a four-legged seat that is not a chair', 'Ask how many people agree', 'Look it up and stop there', 'Count chairs in the room'],
      answer: 0,
      reveal: 'One counterexample is enough to show a definition is wrong: a three-legged stool-chair, or a horse you can sit on. Socrates tested every definition this way.',
    },
    parts: [
      {
        title: 'Too broad and too narrow',
        minutes: 15,
        explain: [
          'A definition draws a boundary. It can fail in two directions: letting in things that are not the thing (too broad), or leaving out things that are (too narrow).',
          'A single clear case is enough to show either failure. That case is a counterexample. Notice the asymmetry: a thousand examples that fit do not prove a definition right, but one that does not fit proves it wrong.',
        ],
        formulas: [['A good definition', '\\text{covered}(x) \\iff \\text{really an instance}(x)']],
        examples: [
          ex('Test "A fruit is something sweet that grows on a plant."', [['Look for something it lets in wrongly.', 'Sugar cane is sweet and grows, but is not a fruit: too broad.'], ['Look for something it leaves out.', 'A lemon is a fruit but is not sweet: too narrow.']], 'Both too broad and too narrow'),
          ex('Test "A triangle is a closed shape with three straight sides."', [['Anything with three straight sides closed up is a triangle.', 'No case gets in wrongly.'], ['Every triangle has three straight sides.', 'No case is left out.']], 'It fits exactly'),
        ],
        practice: [
          ch('"A bird is an animal with wings." Which counterexample shows it is too broad?', ['A bat', 'A penguin', 'A sparrow', 'An eagle'], 'Which non-bird has wings?', 'Bats have wings but are mammals, so the definition lets them in wrongly.'),
          ch('"A vehicle is something with an engine." Which counterexample shows it is too narrow?', ['A bicycle', 'A truck', 'A lawnmower', 'A car'], 'Which real vehicle has no engine?', 'A bicycle is a vehicle with no engine, so the definition leaves it out.'),
          ch('How many counterexamples are needed to show a definition is wrong?', ['One clear one', 'At least ten', 'Half of all cases', 'None, definitions cannot be wrong'], 'Think about the asymmetry.', 'A single clear case breaks a general claim.'),
          ch('"A metal is a shiny solid." Graphite is shiny and solid but not a metal. This shows the definition is…', ['Too broad', 'Too narrow', 'Exactly right', 'Circular'], 'Graphite is let in wrongly.', 'It covers a non-metal, so it is too broad.'),
        ],
      },
      {
        title: 'Circular and vague definitions',
        minutes: 15,
        explain: [
          'A circular definition uses the word being defined, or a close synonym: "courage is being courageous". It tells you nothing new.',
          'A vague definition uses words with no clear boundary: "a big building is one that is large". Socrates kept asking for the one feature that all cases share.',
          'Good definitions often give a wider family plus what sets this thing apart: "a square is a rectangle (family) with all sides equal (difference)". This pattern goes back to Aristotle.',
        ],
        formulas: [['Family plus difference', '\\text{term} = \\text{genus} + \\text{difference}']],
        examples: [
          ex('Improve "An alloy is a mixture that is alloyed".', [['Spot the problem.', 'It uses the word itself: circular.'], ['Give a family and a difference.', 'An alloy is a metal (family) made by mixing a metal with other elements (difference).']], 'A metal made by mixing a metal with other elements'),
          ex('Improve "A strong material is one that is very strong".', [['Circular and vague.', '"Strong" is used to define itself.'], ['Make it measurable.', 'A material with a high stress at which it breaks or yields, e.g. above 500 MPa.']], 'A material with a high breaking or yield stress'),
        ],
        practice: [
          ch('"Justice is acting justly." What is wrong with it?', ['It is circular', 'It is too narrow', 'It is too broad', 'Nothing'], 'Look for the defined word.', 'It uses "just" to define "justice".'),
          ch('Which is a family-plus-difference definition?', ['A square is a rectangle whose sides are all equal', 'A square is a square shape', 'A square is nice', 'A square is not a circle'], 'Family, then what sets it apart.', 'Rectangle is the family; equal sides is the difference.'),
          ch('What did Socrates usually ask for after hearing a list of examples?', ['The one feature all the examples share', 'More examples', 'A vote', 'A drawing'], 'He wanted the "form".', 'A list is not a definition; he wanted what they have in common.'),
          ch('"A heavy object is one with a lot of weight." This definition is mainly…', ['Vague and nearly circular', 'Too narrow', 'Perfect', 'Too broad only'], 'How much is "a lot"?', 'No boundary is given, and weight is used for heavy.'),
        ],
      },
      {
        title: 'Using the method well',
        minutes: 15,
        explain: [
          'Socratic questioning works best when it is honest: you test ideas, not people. In Plato’s dialogues Socrates claims to know nothing himself, which invites the other person to think instead of defend.',
          'In engineering, definitions matter in specifications and contracts. "Corrosion resistant" or "food safe" must be defined by a test, or two parties will mean different things.',
        ],
        formulas: [['Operational definition', '\\text{term} := \\text{result of a stated test}']],
        examples: [
          ex('Turn "rust-proof steel" into a testable definition.', [['Pick a standard test.', 'Salt spray test for a set time.'], ['State the pass mark.', 'No red rust after 500 hours of salt spray.']], 'No red rust after 500 h salt spray'),
          ex('A client wants a "lightweight" bracket. Ask a Socratic question.', [['Ask for the boundary.', 'Lighter than what, by how much?'], ['Turn it into a number.', 'Under 200 g while carrying 50 kg.']], 'Under 200 g at the required load'),
        ],
        practice: [
          ch('Why define "corrosion resistant" by a test in a contract?', ['So both sides mean the same thing and it can be checked', 'To sound technical', 'To make it vague', 'Tests are cheaper than words'], 'What causes disputes?', 'Different meanings. A stated test removes them.'),
          ch('What attitude did Socrates claim in the dialogues?', ['That he knew nothing himself', 'That he knew everything', 'That only generals know courage', 'That definitions are useless'], 'His famous irony.', 'He claimed ignorance, which kept the focus on the ideas.'),
          ch('Which is an operational definition of "hot enough" for a forging?', ['The surface reads at least 1100 °C on a calibrated pyrometer', 'It looks orange', 'It feels hot', 'The worker says so'], 'A stated measurement.', 'A measured threshold anyone can check.'),
          pr('Plato’s Laches tries how many definitions of courage in the version taught here (Laches twice, then Nicias)?', 3, 'Count them.', 'Staying at your post; endurance of the soul; knowing what to fear and dare: 3.'),
        ],
      },
    ],
  },

  'phil-002': {
    predict: {
      q: '"All squares are rectangles. All rectangles have four sides. So all squares have four sides." Is this argument valid?',
      options: ['Yes: if the premises are true, the conclusion must be', 'No: you would need to measure squares', 'Only if squares exist', 'Valid arguments must have false premises'],
      answer: 0,
      reveal: 'This is the form Barbara: all S are M, all M are P, so all S are P. Any argument of this shape is valid, whatever the words mean.',
    },
    parts: [
      {
        title: 'Validity is about form',
        minutes: 15,
        explain: [
          'An argument is valid when it is impossible for all the premises to be true and the conclusion false. Validity does not ask whether the premises are actually true.',
          'A sound argument is valid and also has true premises. Only soundness guarantees a true conclusion.',
          'Because validity is about form, you can swap the words for letters: if one argument of a form is invalid, every argument of that form is invalid.',
        ],
        formulas: [['Sound', '\\text{sound} = \\text{valid} + \\text{true premises}']],
        examples: [
          ex('"All fish fly. All flying things are blue. So all fish are blue." Valid? Sound?', [['Form: all S are M, all M are P, so all S are P.', 'Valid form.'], ['Are the premises true?', 'No, fish do not fly.']], 'Valid but not sound'),
          ex('"All copper conducts. This wire conducts. So it is copper." Valid?', [['Form: all C are D, x is D, so x is C.', 'Things that conduct need not be copper.'], ['Counterexample.', 'An aluminium wire also conducts.']], 'Invalid'),
        ],
        practice: [
          ch('An argument has true premises and a false conclusion. It must be…', ['Invalid', 'Valid', 'Sound', 'Circular'], 'Valid means this cannot happen.', 'A valid form never takes true premises to a false conclusion.'),
          ch('"All whales are fish. All fish breathe water. So all whales breathe water." This is…', ['Valid but unsound', 'Sound', 'Invalid', 'Neither'], 'Check the form, then the facts.', 'Barbara form, but whales are not fish.'),
          ch('Which guarantees a true conclusion?', ['A sound argument', 'A valid argument', 'A persuasive argument', 'A long argument'], 'Valid plus true premises.', 'Soundness.'),
          ch('If one argument of a form is invalid, then…', ['Every argument of that form is invalid', 'Only that one is', 'Some are sound', 'The form is valid'], 'Validity depends on form.', 'Same form, same verdict.'),
        ],
      },
      {
        title: 'The four kinds of statement',
        minutes: 15,
        explain: [
          'Aristotle’s statements come in four kinds: "All S are P" (A), "No S are P" (E), "Some S are P" (I) and "Some S are not P" (O).',
          'On a Venn diagram, "all S are P" empties the part of S outside P; "no S are P" empties the overlap; "some S are P" puts an X in the overlap; "some S are not P" puts an X in S outside P.',
          'With three circles there are 7 regions inside the circles (plus the outside), so you can test any syllogism in one picture.',
        ],
        formulas: [['Regions of n circles', '2^n \\text{ regions (including the outside)}']],
        examples: [
          ex('How do you draw "No metals are insulators" on two circles?', [['Which region does it say is empty?', 'The overlap of metals and insulators.'], ['Shade it.', 'The overlap is shaded.']], 'Shade the overlap'),
          ex('How many regions does a three-circle Venn diagram have, counting the outside?', [['Each circle: in or out.', '2 \\times 2 \\times 2'], ['Count.', '8']], '8'),
        ],
        practice: [
          pr('How many regions inside the circles of a three-circle Venn diagram (not counting the outside)?', 7, '2³ minus the outside.', '8 − 1 = 7.'),
          pr('How many regions (counting the outside) for four sets drawn properly?', 16, '2⁴.', '16.'),
          ch('"Some alloys are not magnetic" puts an X…', ['In alloys, outside magnetic', 'In the overlap', 'Outside both', 'Nowhere'], 'Some S are not P.', 'Inside S but outside P.'),
          ch('"All steels contain iron" shades…', ['The part of steels outside iron-containing things', 'The overlap', 'Everything outside steels', 'Nothing'], 'All S are P empties S without P.', 'Steels that lack iron: none, so that region is shaded.'),
        ],
      },
      {
        title: 'Spotting common invalid forms',
        minutes: 15,
        explain: [
          'The undistributed middle: "All P are M, all S are M, so all S are P". Two groups sharing a property need not overlap. All cats are mammals and all dogs are mammals, but no cats are dogs.',
          'Illicit process: concluding about "all" of a term that the premises only spoke about in part, e.g. "All M are P, no S are M, so no S are P".',
          'A quick test is substitution: replace the letters with everyday words that make the premises obviously true and the conclusion obviously false.',
        ],
        formulas: [['Undistributed middle', '\\text{All } P \\text{ are } M,\\ \\text{All } S \\text{ are } M \\ \\nvdash\\ \\text{All } S \\text{ are } P']],
        examples: [
          ex('Show "All M are P; no S are M; so no S are P" is invalid by substitution.', [['Choose words.', 'M = dogs, P = mammals, S = cats.'], ['Check.', 'All dogs are mammals (true), no cats are dogs (true), so no cats are mammals (false).']], 'Invalid'),
          ex('"All good steels are tough. This alloy is tough. So it is a good steel." Which fallacy?', [['Form.', 'All S are P; x is P; so x is S.'], ['Name.', 'Same mistake as the undistributed middle.']], 'Undistributed middle'),
        ],
        practice: [
          ch('"All engineers use maths. All physicists use maths. So all engineers are physicists." Which fallacy?', ['Undistributed middle', 'Ad hominem', 'Affirming the consequent', 'None, it is valid'], 'The shared term is "use maths".', 'Two groups both inside "use maths" need not overlap.'),
          ch('Which substitution shows "All P are M, all S are M, so all S are P" is invalid?', ['P = cats, M = mammals, S = dogs', 'P = squares, M = rectangles, S = squares', 'All letters the same', 'None exists'], 'True premises, false conclusion.', 'All cats and all dogs are mammals, but dogs are not cats.'),
          ch('Is "All M are P; all S are M; so all S are P" valid?', ['Yes (Barbara)', 'No', 'Only for metals', 'Only if S is empty'], 'The classic form.', 'Barbara is valid.'),
          ch('"No ceramics are ductile. Some ceramics are oxides. So some oxides are not ductile." Valid?', ['Yes', 'No', 'Only if oxides are metals', 'It has no conclusion'], 'Put the X in ceramics-and-oxides; the ductile overlap is empty.', 'The X sits in oxides outside ductile: valid (Ferio-type).'),
        ],
      },
    ],
  },

  'phil-003': {
    predict: {
      q: '"If the part was overheated, it is discoloured. It is discoloured." What can you conclude for certain?',
      options: ['Nothing certain about overheating: something else could discolour it', 'It was overheated', 'It was not overheated', 'The rule is false'],
      answer: 0,
      reveal: 'Concluding the "if" part from the "then" part is affirming the consequent, an invalid form. Chemicals or paint could also discolour it.',
    },
    parts: [
      {
        title: 'The conditional and its truth table',
        minutes: 15,
        explain: [
          '"If P then Q", written P → Q, makes a promise. It is broken only when P happens and Q does not. When P is false, the promise is not broken, so the conditional counts as true.',
          'A truth table lists all combinations. With two letters there are 4 rows; with n letters, 2ⁿ rows.',
          'P → Q is equivalent to its contrapositive, ¬Q → ¬P, but not to its converse Q → P.',
        ],
        formulas: [
          ['Rows in a truth table', '2^n'],
          ['Contrapositive', '(P \\to Q) \\equiv (\\lnot Q \\to \\lnot P)'],
        ],
        examples: [
          ex('Is "If it is a square, it has four sides" true for a triangle?', [['P (square) is false.', 'P = \\text{F}'], ['A conditional with a false "if" part is true.', 'P \\to Q = \\text{T}']], 'True (not broken)'),
          ex('How many rows for a statement with P, Q and R?', [['Each letter T or F.', '2^3'], ['Count.', '8']], '8 rows'),
        ],
        practice: [
          pr('How many rows in a truth table with 4 letters?', 16, '2ⁿ.', '2⁴ = 16.'),
          pr('In the 4-row table for P → Q, in how many rows is it true?', 3, 'Only one row breaks it.', 'Only P = T, Q = F is false, so 3 rows are true.'),
          ch('What is the contrapositive of "If it is steel, it contains iron"?', ['If it does not contain iron, it is not steel', 'If it contains iron, it is steel', 'If it is not steel, it has no iron', 'Steel is iron'], 'Swap and negate both.', '¬Q → ¬P.'),
          ch('Which is NOT equivalent to "If P then Q"?', ['If Q then P', 'If not Q then not P', 'Not P, or Q', 'It is not the case that P and not Q'], 'The converse is the odd one out.', 'Q → P is the converse and can differ.'),
        ],
      },
      {
        title: 'Four classic forms',
        minutes: 15,
        explain: [
          'Valid: modus ponens (P → Q, P, so Q) and modus tollens (P → Q, ¬Q, so ¬P).',
          'Invalid: affirming the consequent (P → Q, Q, so P) and denying the antecedent (P → Q, ¬P, so ¬Q). Both treat "if" as if it meant "if and only if".',
          'To check any form, find rows where all premises are true. If the conclusion is false in any of them, that row is a counterexample.',
        ],
        formulas: [
          ['Modus ponens', 'P \\to Q,\\ P \\ \\vdash\\ Q'],
          ['Modus tollens', 'P \\to Q,\\ \\lnot Q \\ \\vdash\\ \\lnot P'],
        ],
        examples: [
          ex('Check affirming the consequent with the table.', [['Rows where P → Q and Q are both true.', 'Rows 1 (T,T) and 3 (F,T).'], ['Is P true in both?', 'In row 3, P is false: counterexample.']], 'Invalid'),
          ex('"If the sample is pure, it melts at 660 °C. It did not melt at 660 °C." Conclusion?', [['Form: P → Q, ¬Q.', 'Modus tollens.'], ['Conclude ¬P.', 'The sample is not pure.']], 'It is not pure'),
        ],
        practice: [
          ch('"If the circuit is closed, the lamp lights. The lamp is off. So the circuit is open." Form?', ['Modus tollens (valid)', 'Modus ponens', 'Affirming the consequent', 'Denying the antecedent'], 'Not Q, so not P.', 'Valid modus tollens.'),
          ch('"If it is copper, it conducts. It is not copper. So it does not conduct." Form?', ['Denying the antecedent (invalid)', 'Modus tollens', 'Modus ponens', 'Valid'], 'Not P, so not Q.', 'Aluminium conducts too: invalid.'),
          pr('In the truth table for affirming the consequent, how many counterexample rows are there?', 1, 'Rows with P → Q true, Q true, P false.', 'Only row 3: one.'),
          ch('Which form is valid?', ['P → Q, P, so Q', 'P → Q, Q, so P', 'P → Q, not P, so not Q', 'P → Q, so Q → P'], 'The first Stoic indemonstrable.', 'Modus ponens.'),
        ],
      },
      {
        title: 'And, or, not',
        minutes: 15,
        explain: [
          '"P and Q" (P ∧ Q) is true only when both are. "P or Q" (P ∨ Q) in logic is inclusive: true if at least one is.',
          'De Morgan’s laws: "not (P and Q)" = "not P or not Q"; "not (P or Q)" = "not P and not Q".',
          'The disjunctive syllogism is valid: "P or Q; not P; so Q". The Stoics included it among their basic forms.',
        ],
        formulas: [
          ['De Morgan', '\\lnot (P \\land Q) \\equiv \\lnot P \\lor \\lnot Q'],
          ['Disjunctive syllogism', 'P \\lor Q,\\ \\lnot P \\ \\vdash\\ Q'],
        ],
        examples: [
          ex('Negate "the beam is long and thin".', [['Use De Morgan.', '\\lnot(L \\land T) \\equiv \\lnot L \\lor \\lnot T'], ['In words.', 'The beam is not long, or not thin (or both).']], 'Not long or not thin'),
          ex('"The fault is in the wiring or the motor. It is not the wiring." Conclusion?', [['Form.', 'P \\lor Q,\\ \\lnot P'], ['Conclude.', 'Q: it is the motor.']], 'The motor'),
        ],
        practice: [
          pr('In the 4-row table, in how many rows is "P or Q" true?', 3, 'Only F, F makes it false.', '3 rows.'),
          pr('In how many rows is "P and Q" true?', 1, 'Both must be true.', '1 row.'),
          ch('"Not (hot or wet)" means…', ['Not hot and not wet', 'Not hot or not wet', 'Hot and wet', 'Hot or wet'], 'De Morgan for "or".', 'Both are false.'),
          ch('"It is iron or nickel. It is not nickel." So…', ['It is iron', 'It is nickel', 'Nothing follows', 'It is neither'], 'Disjunctive syllogism.', 'Eliminate one option, the other remains.'),
        ],
      },
    ],
  },

  'phil-004': {
    predict: {
      q: 'Towns with more fire trucks have more fire damage. What is the most likely reason?',
      options: ['Bigger towns have both more trucks and more fires', 'Fire trucks cause damage', 'Damage attracts trucks permanently', 'It is a coincidence every time'],
      answer: 0,
      reveal: 'Town size is a hidden common cause. Compare towns of the same size and the link changes completely.',
    },
    parts: [
      {
        title: 'Correlation',
        minutes: 15,
        explain: [
          'The correlation coefficient r measures how closely two quantities follow a straight-line relationship: r = 1 perfect rise together, r = −1 perfect opposite, r = 0 no straight-line link.',
          'r² is the share of the spread in one quantity that a straight line on the other accounts for. r = 0.8 gives r² = 0.64, so 64%.',
          'r says nothing about which causes which, or whether a third factor causes both.',
        ],
        formulas: [['Share explained', 'r^2']],
        examples: [
          ex('r = 0.9 between hardness and strength. What share of the spread in strength does a line on hardness account for?', [['Square r.', '0.9^2 = 0.81'], ['As a percentage.', '81\\%']], '81%'),
          ex('r = −0.6 between temperature and viscosity. Describe it.', [['Sign.', 'Negative: one rises as the other falls.'], ['Size.', 'Moderate: r² = 0.36.']], 'Moderate negative link'),
        ],
        practice: [
          pr('r = 0.7. What is r² as a percentage?', 49, 'Square, then ×100.', '0.49 → 49%.'),
          pr('r² = 0.25 and the link is negative. What is r?', -0.5, 'Square root, keep the sign.', '−0.5.'),
          ch('r = 0 means…', ['No straight-line relationship (there could still be a curved one)', 'No relationship of any kind', 'A perfect relationship', 'One causes the other'], 'r measures straight lines only.', 'A U-shaped link can give r ≈ 0.'),
          ch('A strong correlation between X and Y proves…', ['Nothing about cause by itself', 'X causes Y', 'Y causes X', 'A third factor exists'], 'Correlation is not causation.', 'It shows association only.'),
        ],
      },
      {
        title: 'Hidden factors and Simpson’s paradox',
        minutes: 20,
        explain: [
          'A confounder Z affects both X and Y, making them move together even if X does nothing to Y.',
          'Simpson’s paradox: a trend inside every group can reverse when groups of different sizes are combined. A famous 1986 study of kidney stone treatments found treatment A did better for both small and large stones, yet B looked better overall, because A was used more on the harder large stones.',
          'The cure is to compare like with like, or to randomise.',
        ],
        formulas: [['Success rate', '\\text{rate} = \\frac{\\text{successes}}{\\text{cases}}']],
        examples: [
          ex('Treatment A: small stones 81/87, large 192/263. Treatment B: small 234/270, large 55/80. Which is better within each size?', [['Small stones.', 'A: 81/87 = 93\\%,\\ B: 234/270 = 87\\%'], ['Large stones.', 'A: 192/263 = 73\\%,\\ B: 55/80 = 69\\%']], 'A is better in both'),
          ex('Now combine the groups. Which looks better overall?', [['A total.', '(81+192)/(87+263) = 273/350 = 78\\%'], ['B total.', '(234+55)/(270+80) = 289/350 = 83\\%']], 'B looks better overall: Simpson’s paradox'),
        ],
        practice: [
          pr('Treatment A overall success in the kidney stone data, in % (273 of 350)?', (273 / 350) * 100, 'Divide and ×100.', '78%.', { tol: 0.2 }),
          pr('Treatment B overall success in %, (289 of 350)?', (289 / 350) * 100, 'Divide and ×100.', '82.6%.', { tol: 0.2 }),
          ch('Why does B look better overall although A wins in each group?', ['A was used mostly on the harder large stones', 'B is truly better', 'The numbers are wrong', 'Small stones do not count'], 'Look at where each treatment was used.', 'Group sizes differ: a hidden factor (stone size).'),
          ch('Ice cream sales and drownings are correlated. The confounder is…', ['Hot weather', 'Ice cream', 'Lifeguards', 'Swimming pools only'], 'What drives both?', 'Heat increases both.'),
        ],
      },
      {
        title: 'Fair comparisons',
        minutes: 15,
        explain: [
          'Mill’s method of difference: if two cases are alike in everything except one factor, and the outcome differs, that factor is likely the cause.',
          'Randomisation makes this practical: if chance decides who gets the treatment, hidden factors end up roughly equal in both groups.',
          'Hill’s criteria for judging cause from observational data include strength of the link, consistency across studies, a dose-response gradient and a plausible mechanism.',
        ],
        formulas: [['Effect estimate', '\\Delta = \\bar y_{\\text{treated}} - \\bar y_{\\text{control}}']],
        examples: [
          ex('Coated panels lose 0.12 mm/yr, uncoated side-by-side panels lose 0.30 mm/yr. Effect of the coating?', [['Difference.', '0.12 - 0.30 = -0.18\\ \\text{mm/yr}'], ['Relative.', '0.18/0.30 = 60\\%\\ \\text{less}']], '0.18 mm/yr less, a 60% cut'),
          ex('Why put coated and uncoated panels side by side on the same bridge?', [['List what else affects corrosion.', 'Age, salt, humidity, sunlight.'], ['Same location equalises them.', 'Only the coating differs.']], 'To remove confounders'),
        ],
        practice: [
          pr('Treated parts last 14 months on average, controls 10. Difference in months?', 4, 'Subtract.', '14 − 10 = 4 months.'),
          pr('Same data: percentage improvement over control?', 40, 'Difference ÷ control.', '4/10 = 40%.'),
          ch('Which design best removes hidden factors?', ['Randomly assign which samples get the treatment', 'Let workers choose', 'Treat the newest samples', 'Treat whatever is convenient'], 'Who decides?', 'Chance does, so confounders balance.'),
          ch('A link gets stronger with more exposure (more smoking, more cancer). Which Hill criterion is this?', ['Dose-response (biological gradient)', 'Consistency', 'Specificity', 'Analogy'], 'More dose, more effect.', 'A biological gradient.'),
        ],
      },
    ],
  },

  'phil-005': {
    predict: {
      q: 'Which of these could you still be sure of, even if you were dreaming right now?',
      options: ['That you are thinking something', 'That you are holding a phone', 'That it is daytime', 'That other people exist'],
      answer: 0,
      reveal: 'A dream can fake a phone, a time of day and people. It cannot fake the fact that some thinking is going on. That is Descartes’ starting point.',
    },
    parts: [
      {
        title: 'Three waves of doubt',
        minutes: 15,
        explain: [
          'Descartes did not think his beliefs were false. He wanted to find which could not possibly be false, so he doubted in stages.',
          'First the senses: they sometimes mislead (a straight stick looks bent in water). Then dreams: there is no sure sign that tells waking from dreaming. Finally a powerful deceiver: perhaps even 2 + 3 = 5 is a trick.',
          'Each stage is a thought experiment: not "this is happening" but "this could be happening, so I cannot be certain".',
        ],
        formulas: [['Descartes’ test', '\\text{possible that } \\lnot p \\ \\Rightarrow\\ p \\text{ is not certain}']],
        examples: [
          ex('Which stage of doubt removes "the tower in the distance is round"?', [['Is it about the senses?', 'Yes, far-off shapes can look wrong.'], ['So the first stage.', 'The senses sometimes deceive.']], 'The senses'),
          ex('Which stage removes "a triangle has three sides"?', [['Survives senses and dreams?', 'Yes: even in a dream a triangle has three sides.'], ['Only the deceiver could fake it.', 'Third stage.']], 'The evil deceiver'),
        ],
        practice: [
          ch('Which stage doubts "I have hands"?', ['Dreaming', 'The senses', 'The deceiver only', 'None'], 'In dreams you can have different bodies.', 'The dream argument.'),
          ch('Why did Descartes doubt everything?', ['To find what could not be doubted and build on it', 'Because he believed nothing', 'To win arguments', 'To avoid science'], 'He wanted a foundation.', 'Doubt was a method.'),
          ch('Which survives all three stages?', ['That I think', 'That 2 + 3 = 5', 'That the sun exists', 'That I have a body'], 'What does doubting require?', 'A thinker.'),
          ch('"It is possible I am wrong about X" means, in Descartes’ sense, that X is…', ['Not certain', 'False', 'True', 'Meaningless'], 'Possible doubt removes certainty, not truth.', 'Not certain.'),
        ],
      },
      {
        title: 'I think, therefore I am',
        minutes: 15,
        explain: [
          'Whatever the deceiver does, it must deceive someone. Doubting is a kind of thinking, so the act of doubting proves a thinker exists.',
          'Descartes concluded he was certainly "a thing that thinks". Whether he also had a body was, at that point, still in doubt.',
          'Critics, such as the philosopher Pierre Gassendi in Descartes’ own time, asked whether "I" is too much: perhaps all that is certain is "thinking is happening".',
        ],
        formulas: [['The cogito', '\\text{I doubt} \\Rightarrow \\text{I think} \\Rightarrow \\text{I exist}']],
        examples: [
          ex('Why can’t the deceiver make Descartes believe he exists when he does not?', [['To be fooled, there must be someone fooled.', 'Being deceived requires existing.'], ['So that belief cannot be false.', 'It is self-confirming.']], 'Being deceived requires existing'),
          ex('What does the cogito NOT prove?', [['It proves a thinker exists now.', 'Only while thinking.'], ['It does not prove a body or a world.', 'Those remain in doubt.']], 'That he has a body or that the world exists'),
        ],
        practice: [
          ch('In what language did "cogito, ergo sum" first appear in that famous form?', ['Latin', 'Greek', 'English', 'German'], 'Cogito.', 'Latin (in a later Latin edition; the 1637 Discourse had the French "je pense, donc je suis").'),
          ch('Descartes concluded he was certainly…', ['A thing that thinks', 'A body', 'A dream', 'A machine'], 'Res cogitans.', 'A thinking thing.'),
          ch('A common objection to the cogito is that it proves only…', ['That thinking is happening, not who is doing it', 'Nothing', 'That God exists', 'That bodies exist'], 'Is "I" smuggled in?', 'Gassendi and later critics raised this.'),
          ch('The cogito is certain because…', ['Doubting it confirms it', 'Everyone agrees', 'It is in a book', 'The senses show it'], 'Self-confirming.', 'The act of doubting is itself thinking.'),
        ],
      },
      {
        title: 'Reason versus experience',
        minutes: 15,
        explain: [
          'Rationalists (Descartes, Spinoza, Leibniz) held that reason alone can reach important truths, like mathematics. Empiricists (Locke, Berkeley, Hume) held that all ideas come from experience.',
          'Modern science combines both: mathematics and logic from reason, measurements and tests from experience.',
          'A practical lesson from Descartes: rank your beliefs by how they could fail. Calibrate instruments, repeat measurements, and cross-check with an independent method.',
        ],
        formulas: [['Independent cross-check', '|x_1 - x_2| \\le \\text{combined uncertainty}']],
        examples: [
          ex('A thermocouple reads 905 °C (±10), a pyrometer 890 °C (±15). Do they agree?', [['Difference.', '905 - 890 = 15'], ['Compare with combined uncertainty.', '15 \\le 10 + 15 = 25']], 'Yes, they agree within uncertainty'),
          ex('Two scales give 102.4 g (±0.1) and 101.8 g (±0.1). Agree?', [['Difference.', '0.6\\ \\text{g}'], ['Combined uncertainty.', '0.2 \\text{ g, so } 0.6 > 0.2']], 'No: one scale is off'),
        ],
        practice: [
          pr('Readings 450 ± 5 and 462 ± 5. Difference?', 12, 'Subtract.', '12.'),
          ch('Do 450 ± 5 and 462 ± 5 agree (simple sum of uncertainties)?', ['No: 12 is more than 10', 'Yes', 'Cannot tell', 'Only if averaged'], 'Compare 12 with 5 + 5.', '12 > 10, so they disagree.'),
          ch('Which philosopher was an empiricist?', ['John Locke', 'René Descartes', 'Gottfried Leibniz', 'Baruch Spinoza'], 'Ideas come from experience.', 'Locke.'),
          ch('Which source of knowledge did rationalists stress?', ['Reason', 'The senses', 'Tradition', 'Authority'], 'Ratio.', 'Reason.'),
        ],
      },
    ],
  },

  'phil-006': {
    predict: {
      q: 'Every swan you have ever seen is white: 10 000 of them. Does that prove all swans are white?',
      options: ['No: one black swan would overturn it', 'Yes, 10 000 is enough', 'Yes, if they were in different countries', 'It proves most swans are white everywhere'],
      answer: 0,
      reveal: 'Europeans believed exactly this until black swans were recorded in Australia in 1697. Many confirmations raise confidence but never prove a general rule.',
    },
    parts: [
      {
        title: 'Deduction and induction',
        minutes: 15,
        explain: [
          'Deduction goes from general to particular with certainty, if the premises are true: all metals conduct; copper is a metal; copper conducts.',
          'Induction goes from observed cases to a general rule or a prediction: every sample tested so far conducts, so the next will. It can be strong or weak, but never certain.',
          'Science relies on induction all the time; the question Hume raised is what justifies it.',
        ],
        formulas: [['Induction', 'F(a_1), \\dots, F(a_n) \\ \\leadsto\\ F(a_{n+1})']],
        examples: [
          ex('"Every steel bar from this batch passed the bend test, so this next bar will too." Deduction or induction?', [['Does it go from observed cases to a new one?', 'Yes.'], ['Is the conclusion certain?', 'No.']], 'Induction'),
          ex('"All bars in this batch are 1020 steel; this bar is from the batch; so it is 1020 steel." Deduction or induction?', [['General rule to a case.', 'Yes.'], ['Certain if the premises are true.', 'Yes.']], 'Deduction'),
        ],
        practice: [
          ch('"The sun has risen every day, so it will rise tomorrow." This is…', ['Induction', 'Deduction', 'A definition', 'A fallacy of form'], 'Past cases to a new one.', 'Induction.'),
          ch('Which is certain if its premises are true?', ['A valid deduction', 'A strong induction', 'A prediction from data', 'A survey result'], 'Certainty comes from form.', 'Deduction.'),
          ch('Black swans were recorded by Europeans in Australia in…', ['1697', '1497', '1897', '1997'], 'Late 17th century, Dutch explorers.', '1697, Willem de Vlamingh’s expedition.'),
          ch('Can induction ever give certainty?', ['No, only degrees of confidence', 'Yes, with enough cases', 'Yes, if done by scientists', 'Only for numbers'], 'Hume’s point.', 'Never certainty.'),
        ],
      },
      {
        title: 'Laplace’s rule of succession',
        minutes: 15,
        explain: [
          'If something has happened in all n trials so far, and you knew nothing beforehand, Laplace’s rule estimates the chance it happens next time as (n + 1)/(n + 2).',
          'With 0 trials it gives 1/2: complete uncertainty. It rises towards 1 but never reaches it.',
          'With s successes in n trials in general, the estimate is (s + 1)/(n + 2).',
        ],
        formulas: [['Rule of succession', 'P = \\frac{s+1}{n+2}']],
        examples: [
          ex('A new alloy passed 8 of 8 corrosion tests. Laplace’s estimate it passes the next?', [['s = 8, n = 8.', '\\frac{8+1}{8+2}'], ['Calculate.', '0.9']], '90%'),
          ex('A machine worked 3 times out of 5. Estimate for the next run?', [['s = 3, n = 5.', '\\frac{3+1}{5+2}'], ['Calculate.', '4/7 = 0.571']], 'About 57%'),
        ],
        practice: [
          pr('Laplace’s estimate after 18 successes in 18 trials?', laplace(18), '(n + 1)/(n + 2).', '19/20 = 0.95.'),
          pr('After 1 success in 1 trial?', laplace(1), '2/3.', '0.667.', { tol: 0.002 }),
          pr('After 6 successes in 10 trials?', 7 / 12, '(s + 1)/(n + 2).', '7/12 = 0.583.', { tol: 0.002 }),
          pr('How many straight successes until the estimate first reaches 0.99?', 98, 'Solve (n + 1)/(n + 2) ≥ 0.99.', 'n + 1 ≥ 0.99(n + 2) → 0.01n ≥ 0.98 → n = 98.'),
        ],
      },
      {
        title: 'Living with the problem',
        minutes: 15,
        explain: [
          'Hume himself said we cannot stop using induction; we just cannot justify it by pure logic. Later philosophers tried different answers: Popper (next classes) said science tests rather than proves.',
          'In engineering the practical answer is margins and testing at the real conditions. Past success under different conditions is weak evidence.',
          'A "safety factor" divides the expected failure load by the design load, to leave room for what experience has not yet shown.',
        ],
        formulas: [['Safety factor', 'SF = \\frac{\\text{failure load}}{\\text{design load}}']],
        examples: [
          ex('A bolt fails at 30 kN and carries 12 kN in service. Safety factor?', [['Divide.', '30/12'], ['Result.', '2.5']], '2.5'),
          ex('With a required SF of 3, what failure load is needed for 12 kN?', [['Multiply.', '3 \\times 12'], ['Result.', '36\\ \\text{kN}']], '36 kN'),
        ],
        practice: [
          pr('Failure load 48 kN, design load 16 kN. Safety factor?', 3, 'Divide.', '3.'),
          pr('Design load 8 kN, SF 2.5. Required failure load in kN?', 20, 'Multiply.', '20 kN.'),
          ch('A supplier says "never failed in 20 years" but your load is double. What is the inductive problem?', ['Past cases were at different conditions', 'There is none', '20 years is too short', 'Bolts cannot fail'], 'Is the new case like the old ones?', 'New conditions break the pattern.'),
          ch('According to Hume, why do we expect the future to be like the past?', ['Habit or custom', 'A logical proof', 'Mathematics', 'Authority'], 'Not reason.', 'Custom.'),
        ],
      },
    ],
  },

  'phil-007': {
    predict: {
      q: 'A test catches 99% of a rare disease that 1 in 1000 people have, and wrongly flags 1% of healthy people. You test positive. Roughly what is the chance you have it?',
      options: ['About 9%', 'About 99%', 'About 50%', 'About 1%'],
      answer: 0,
      reveal: 'In 100 000 people, 100 are sick and 99 test positive; 99 900 are healthy and about 999 test positive. So 99 out of about 1098 positives are sick: about 9%.',
    },
    parts: [
      {
        title: 'Counting with natural frequencies',
        minutes: 20,
        explain: [
          'The easiest way to do Bayes is to imagine a population, say 1000 or 100 000 people, and count.',
          'Split by the condition first (the base rate), then split each group by test result (sensitivity for the sick, false-positive rate for the healthy).',
          'The chance a positive person is sick is true positives divided by all positives.',
        ],
        formulas: [['Positive predictive value', 'PPV = \\frac{TP}{TP + FP}']],
        examples: [
          ex('Base rate 2%, sensitivity 90%, false positives 5%. Use 1000 people.', [['Sick: 20, true positives.', '20 \\times 0.9 = 18'], ['Healthy: 980, false positives.', '980 \\times 0.05 = 49'], ['PPV.', '18/(18+49) = 0.269']], 'About 27%'),
          ex('Same test, base rate 30%.', [['True positives.', '300 \\times 0.9 = 270'], ['False positives.', '700 \\times 0.05 = 35'], ['PPV.', '270/305 = 0.885']], 'About 89%'),
        ],
        practice: [
          pr('Base rate 1%, sensitivity 90%, false positives 9%. Chance a positive person is sick (as a decimal)?', post(0.01, 0.9, 0.09), 'Count 1000 people.', '9/(9 + 89.1) = 0.092.', { tol: 0.003 }),
          pr('Base rate 10%, sensitivity 80%, false positives 10%. PPV?', post(0.1, 0.8, 0.1), 'Count 1000.', '80/(80 + 90) = 0.471.', { tol: 0.003 }),
          pr('Base rate 0.1%, sensitivity 99%, false positives 1%. PPV?', post(0.001, 0.99, 0.01), 'Use 100 000 people.', '99/(99 + 999) = 0.090.', { tol: 0.003 }),
          pr('In 1000 people with base rate 5% and sensitivity 80%, how many true positives?', 40, '50 sick × 0.8.', '40.'),
        ],
      },
      {
        title: 'The formula and the odds form',
        minutes: 20,
        explain: [
          'Bayes’ theorem: P(H | E) = P(E | H) P(H) / P(E), with P(E) = P(E | H) P(H) + P(E | not H) P(not H).',
          'The odds form is often quicker: posterior odds = prior odds × likelihood ratio, where the likelihood ratio is P(E | H) / P(E | not H).',
          'Odds of p are p/(1 − p); to go back, p = odds/(1 + odds).',
        ],
        formulas: [
          ['Bayes', 'P(H\\mid E) = \\frac{P(E\\mid H)P(H)}{P(E\\mid H)P(H) + P(E\\mid\\lnot H)P(\\lnot H)}'],
          ['Odds form', 'O(H\\mid E) = O(H) \\times \\frac{P(E\\mid H)}{P(E\\mid\\lnot H)}'],
        ],
        examples: [
          ex('Prior 1%, sensitivity 90%, false positives 9%. Use odds.', [['Prior odds.', '0.01/0.99 = 0.0101'], ['Likelihood ratio.', '0.9/0.09 = 10'], ['Posterior odds and probability.', '0.101 \\Rightarrow 0.101/1.101 = 0.092']], '9.2%'),
          ex('A second, independent positive test with the same LR.', [['Multiply odds again.', '0.101 \\times 10 = 1.01'], ['Probability.', '1.01/2.01 = 0.50']], 'About 50%'),
        ],
        practice: [
          pr('Convert a probability of 0.2 to odds.', 0.25, 'p/(1 − p).', '0.2/0.8 = 0.25.'),
          pr('Convert odds of 3 to a probability.', 0.75, 'odds/(1 + odds).', '3/4 = 0.75.'),
          pr('Likelihood ratio of a test with 95% sensitivity and 5% false positives?', 19, 'Sensitivity ÷ false-positive rate.', '0.95/0.05 = 19.'),
          pr('Prior odds 0.02, LR 19. Posterior probability?', (0.02 * 19) / (1 + 0.02 * 19), 'Multiply, then convert.', 'Odds 0.38 → 0.38/1.38 = 0.275.', { tol: 0.003 }),
        ],
      },
      {
        title: 'Where people go wrong',
        minutes: 15,
        explain: [
          'Base-rate neglect: treating the test’s accuracy as the answer. Kahneman and Tversky’s "taxi cab" problem showed most people do this.',
          'The prosecutor’s fallacy: confusing "the chance of this evidence if innocent" with "the chance of innocence given this evidence".',
          'In inspection and quality control, a flagged part from a process with very few defects is often fine. Re-testing before scrapping is the Bayesian thing to do.',
        ],
        formulas: [['Not the same', 'P(E\\mid H) \\neq P(H\\mid E)']],
        examples: [
          ex('Taxi problem: 85% of cabs are Green, 15% Blue. A witness who is right 80% of the time says "Blue". Chance it was Blue?', [['Blue and called Blue.', '0.15 \\times 0.8 = 0.12'], ['Green but called Blue.', '0.85 \\times 0.2 = 0.17'], ['Divide.', '0.12/0.29 = 0.41']], 'About 41%'),
          ex('DNA match chance in an innocent person is 1 in 1 million; the city has 5 million people. Roughly how many innocent matches?', [['Multiply.', '5\\,000\\,000 \\times 10^{-6}'], ['Result.', '\\approx 5']], 'About 5, so one match alone is weak'),
        ],
        practice: [
          pr('Taxi problem: chance the cab was Blue (decimal)?', 0.12 / 0.29, '0.12/(0.12 + 0.17).', '0.414.', { tol: 0.003 }),
          pr('2 in 1000 castings cracked; test catches 95%, flags 5% of good ones. PPV?', post(0.002, 0.95, 0.05), 'Count 1000.', '1.9/(1.9 + 49.9) = 0.037.', { tol: 0.002 }),
          ch('"The test is 99% accurate, so a positive means 99% chance." The mistake?', ['Ignoring the base rate', 'Correct reasoning', 'Post hoc', 'Straw man'], 'How rare is the condition?', 'Base-rate neglect.'),
          ch('The prosecutor’s fallacy confuses…', ['P(evidence | innocent) with P(innocent | evidence)', 'Two suspects', 'Guilt and punishment', 'Odds and probability'], 'Which way round?', 'The conditional is reversed.'),
        ],
      },
    ],
  },

  'phil-008': {
    predict: {
      q: 'Which claim would Popper call more scientific?',
      options: ['"This steel will yield between 340 and 360 MPa"', '"This steel will behave as steel behaves"', '"This steel has hidden strengths no test can show"', '"This steel is good"'],
      answer: 0,
      reveal: 'The first could clearly fail: a test at 300 MPa would refute it. The others forbid nothing, so no test could ever count against them.',
    },
    parts: [
      {
        title: 'Falsifiability',
        minutes: 15,
        explain: [
          'Popper argued that no number of confirmations can prove a universal law, but one solid counterexample can refute it (the same asymmetry as Socrates’ counterexamples).',
          'So the mark of a scientific claim is that it forbids something: it says which observations would show it false.',
          'The more a theory forbids, the more it says, and the more impressive it is when it survives.',
        ],
        formulas: [['Asymmetry', '\\text{many confirmations} \\nRightarrow \\text{proof};\\quad \\text{one refutation} \\Rightarrow \\text{false}']],
        examples: [
          ex('"All copper conducts." What observation would falsify it?', [['Look for a forbidden case.', 'A pure copper sample that does not conduct.'], ['Is that observable?', 'Yes, with a meter.']], 'A non-conducting copper sample'),
          ex('"The market moves according to hidden energies." Falsifiable?', [['What would count against it?', 'Any move can be "explained" after the fact.'], ['Forbids nothing.', 'Not falsifiable as stated.']], 'No'),
        ],
        practice: [
          ch('Which is falsifiable?', ['"Water boils at 100 °C at sea-level pressure"', '"Everything happens for a reason"', '"Some day, someone will be lucky"', '"The universe is as it must be"'], 'Can a measurement refute it?', 'A thermometer could show it false.'),
          ch('Popper’s key asymmetry is that…', ['One counterexample can refute a universal law, but confirmations cannot prove it', 'Confirmations prove laws', 'Refutations are impossible', 'All theories are equal'], 'Like the black swan.', 'Refutation is decisive in logic; confirmation is not.'),
          ch('A theory that "explains" every possible outcome is, for Popper…', ['Not scientific', 'Very strong', 'Proven', 'Mathematical'], 'It forbids nothing.', 'Not testable.'),
          ch('Popper was born and studied in…', ['Vienna', 'Cambridge', 'Paris', 'New York'], 'Austria.', 'Vienna.'),
        ],
      },
      {
        title: 'The 1919 test of light bending',
        minutes: 20,
        explain: [
          'General relativity predicts that light grazing the Sun bends by δ = 4GM/(c²R) = 1.75 arcseconds. A Newtonian-style argument gives half: 0.87″.',
          'The eclipse of 29 May 1919 let astronomers compare star positions near the Sun with their normal positions. Sobral measured 1.98 ± 0.12″ and Príncipe 1.61 ± 0.30″.',
          'A measurement is "consistent" with a prediction if it lies within about 2 error bars of it. Both results were far from 0.87.',
        ],
        formulas: [
          ['Light bending', '\\delta = \\frac{4GM}{c^2R}'],
          ['Distance in error bars', 'z = \\frac{|x - \\mu|}{\\sigma}'],
        ],
        examples: [
          ex('How many error bars is Sobral (1.98 ± 0.12) from 0.87?', [['Difference.', '1.98 - 0.87 = 1.11'], ['Divide.', '1.11/0.12 = 9.25']], 'About 9'),
          ex('How many error bars is Sobral from 1.75?', [['Difference.', '0.23'], ['Divide.', '0.23/0.12 = 1.9']], 'About 2: consistent'),
        ],
        practice: [
          pr('How many error bars is Príncipe (1.61 ± 0.30) from Einstein’s 1.75?', 0.14 / 0.3, '|1.61 − 1.75| / 0.30.', '0.47.', { tol: 0.01 }),
          pr('How many error bars is Príncipe from 0.87?', 0.74 / 0.3, '|1.61 − 0.87| / 0.30.', '2.47.', { tol: 0.02 }),
          pr('Ratio of Einstein’s prediction to the Newtonian-style one?', 1.75 / 0.87, 'Divide.', 'About 2.', { tol: 0.03 }),
          pr('An arcsecond is what fraction of a degree? Give 1 ÷ answer (i.e. arcseconds per degree).', 3600, '60 minutes × 60 seconds.', '3600.'),
        ],
      },
      {
        title: 'Using it in practice',
        minutes: 15,
        explain: [
          'Ad hoc rescue: when a prediction fails, adding a special excuse that saves the theory and predicts nothing new. Popper saw this as a warning sign.',
          'Good practice: state in advance what result would count against your hypothesis, then run the test.',
          'Popper’s view has critics too: real tests involve extra assumptions (instruments, conditions), so a failed prediction may point at an assumption rather than the theory. That is the Duhem–Quine problem.',
        ],
        formulas: [['A test needs assumptions', 'T \\land A_1 \\land A_2 \\Rightarrow O']],
        examples: [
          ex('Hypothesis: "Adding 0.5% Cr doubles corrosion life." Write a falsifying result.', [['State the prediction.', 'Life with Cr ≥ 2 × life without.'], ['Falsifier.', 'Side-by-side tests show less than about 1.5×, beyond the scatter.']], 'Life ratio well below 2'),
          ex('A failed test of a strength model turns out to have used a miscalibrated machine. Which is wrong: model or assumption?', [['The prediction used assumption A (calibration).', 'A was false.'], ['So the test did not refute the model.', 'Redo with a calibrated machine.']], 'The assumption'),
        ],
        practice: [
          ch('After a failed prediction, a researcher says "the effect only appears when no one is watching". This is…', ['An ad hoc rescue', 'A risky prediction', 'Falsification', 'A definition'], 'Does it predict anything new?', 'It only protects the theory.'),
          ch('The Duhem–Quine problem says…', ['A failed test may refute an auxiliary assumption rather than the theory', 'Theories can never be tested', 'Confirmations prove theories', 'Only physics is science'], 'T and A together imply O.', 'Blame can fall on A.'),
          ch('Good practice before a test is to…', ['State in advance what result would count against the hypothesis', 'Run it and decide afterwards', 'Only report successes', 'Avoid tests'], 'Pre-registration idea.', 'Decide the falsifier first.'),
          pr('A prediction is 500 MPa and a test gives 470 ± 10 MPa. How many error bars away?', 3, '|470 − 500| / 10.', '3: a real problem for the prediction.'),
        ],
      },
    ],
  },

  'phil-009': {
    predict: {
      q: 'Copernicus’ Sun-centred system of 1543 still used circles. Was it more accurate than Ptolemy’s at predicting planet positions?',
      options: ['Not really: about as accurate; it won on simplicity and explanation', 'Yes, perfectly accurate', 'Much worse in every way', 'It made no predictions'],
      answer: 0,
      reveal: 'With circles, Copernicus still needed small extra circles and was not clearly more accurate. Its attraction was explaining retrograde loops naturally. Kepler’s ellipses (1609) made it accurate.',
    },
    parts: [
      {
        title: 'Retrograde motion and epicycles',
        minutes: 20,
        explain: [
          'Mars usually drifts eastward against the stars, but for about two months around opposition it seems to go backwards (retrograde), then forwards again.',
          'Ptolemy explained this with a circle on a circle: the epicycle’s motion sometimes points backwards against the main motion.',
          'In the Sun-centred picture, the backward motion appears because Earth, moving faster on its inner orbit, overtakes Mars. Mathematically both give the same direction to Mars.',
        ],
        formulas: [['Synodic period', '\\frac{1}{S} = \\frac{1}{T_E} - \\frac{1}{T_M}']],
        examples: [
          ex('Mars’ orbit takes 1.881 years. How often does Earth overtake it (the synodic period)?', [['Substitute.', '1/S = 1/1 - 1/1.881 = 0.468'], ['Invert.', 'S = 2.14\\ \\text{years}']], 'About 2.14 years'),
          ex('Jupiter takes 11.86 years. Its synodic period?', [['Substitute.', '1/S = 1 - 1/11.86 = 0.916'], ['Invert.', 'S = 1.09\\ \\text{years}']], 'About 1.09 years'),
        ],
        practice: [
          pr('Synodic period of Saturn (orbit 29.46 years), in years?', 1 / (1 - 1 / 29.46), '1/S = 1 − 1/T.', '1.035 years.', { tol: 0.003 }),
          pr('Synodic period of Mars in days (S = 2.135 years, 365.25 days per year)?', 2.135 * 365.25, 'Multiply.', 'About 780 days.', { tol: 2 }),
          ch('Why does Mars seem to go backwards in the Sun-centred picture?', ['Earth overtakes it', 'Mars reverses its orbit', 'The Sun pushes it', 'Light is delayed'], 'Faster inner orbit.', 'Like passing a slower car.'),
          ch('In Ptolemy’s model, retrograde loops come from…', ['The epicycle', 'The Sun', 'The stars moving', 'Earth spinning'], 'Circle on a circle.', 'The epicycle.'),
        ],
      },
      {
        title: 'Kuhn’s picture of science',
        minutes: 15,
        explain: [
          'Normal science: researchers share a paradigm (theories, methods, standard examples) and solve puzzles within it.',
          'Anomalies are results the paradigm cannot handle. A few are tolerated; when they pile up there is a crisis, and a new paradigm can replace the old one: a scientific revolution.',
          'Kuhn argued that rival paradigms can be hard to compare directly ("incommensurable"), because they disagree on what problems matter and what words mean.',
        ],
        formulas: [['Kuhn’s cycle', '\\text{normal} \\to \\text{anomaly} \\to \\text{crisis} \\to \\text{revolution} \\to \\text{normal}']],
        examples: [
          ex('Place "Mercury’s orbit shifts 43 arcseconds per century more than Newton predicts" in Kuhn’s cycle (before 1915).', [['Newton’s paradigm could not explain it.', 'An anomaly.'], ['General relativity explained it.', 'Part of a revolution.']], 'An anomaly'),
          ex('Place "measuring the boiling points of 50 new compounds with standard methods" in the cycle.', [['Work inside the accepted framework.', 'Puzzle-solving.'], ['No challenge to the theory.', 'Normal science.']], 'Normal science'),
        ],
        practice: [
          ch('Adding ever more correction factors to keep an old model working is like…', ['Adding epicycles', 'A paradigm shift', 'Falsification', 'Normal measurement'], 'Ptolemy’s fix.', 'Patching instead of rethinking.'),
          ch('Which came first in time?', ['Ptolemy’s Almagest', 'Copernicus’ On the Revolutions', 'Kepler’s laws', 'Newton’s Principia'], 'About AD 150.', 'The Almagest.'),
          ch('Kuhn called the shared framework of a science a…', ['Paradigm', 'Hypothesis', 'Syllogism', 'Base rate'], 'Paradigm shift.', 'Paradigm.'),
          pr('How many years passed between the Almagest (c. 150) and Copernicus’ book (1543)?', 1393, 'Subtract.', '1543 − 150 = 1393 years.', { tol: 1 }),
        ],
      },
      {
        title: 'Choosing between theories',
        minutes: 15,
        explain: [
          'When two theories fit the data, scientists also weigh simplicity (fewer free parts), scope (explains more), fruitfulness (leads to new discoveries) and consistency with other knowledge. Kuhn listed values like these himself.',
          'A model with more adjustable numbers can always fit data better; that is not a reason to believe it. Fitting new data it was not tuned on is.',
          'This is why engineers test models on data that was held back from fitting.',
        ],
        formulas: [['Free parameters', 'k_{\\text{fewer}} \\text{ preferred at equal fit}']],
        examples: [
          ex('Model A fits 20 points with 2 constants; model B fits slightly better with 12 constants. Which to prefer, other things equal?', [['Count constants per data point.', '2/20 \\text{ vs } 12/20'], ['B can bend to fit noise.', 'Prefer A unless B predicts new data better.']], 'A'),
          ex('How do you test whether B is really better?', [['Hold back some data.', 'Fit on 15 points, test on 5.'], ['Compare errors on the 5.', 'Lower test error wins.']], 'Compare on held-back data'),
        ],
        practice: [
          ch('Which value favours a theory that explains many different kinds of phenomena?', ['Scope', 'Complexity', 'Age', 'Popularity'], 'Breadth.', 'Scope.'),
          ch('A model with many adjustable constants fits old data perfectly. This shows…', ['Little by itself: test it on new data', 'It must be true', 'It is simple', 'It is falsified'], 'Flexibility is not evidence.', 'Check predictions on held-back data.'),
          pr('Fit uses 15 of 20 points. What percentage is held back for testing?', 25, '5 of 20.', '25%.'),
          ch('Kepler improved Copernicus’ system by using…', ['Ellipses', 'More epicycles', 'Squares', 'Earth at the centre'], '1609.', 'Elliptical orbits.'),
        ],
      },
    ],
  },

  'phil-010': {
    predict: {
      q: 'A cheaper connection saves the client a lot of money and probably will not fail. Your check is not finished. Which reasoning fits most engineering codes of ethics?',
      options: ['Public safety comes first: finish the check and disclose the risk', 'Approve it, since it probably will not fail', 'Let the client decide alone', 'Approve it if the saving is big enough'],
      answer: 0,
      reveal: 'Ethics rules such as those of the NSPE put public safety first. Weighing costs is fine, but hiding or ignoring a known safety question is not.',
    },
    parts: [
      {
        title: 'Weighing consequences',
        minutes: 15,
        explain: [
          'Utilitarians judge actions by their consequences for everyone affected. In practice that means estimating benefits and harms, including their probabilities.',
          'Expected harm = probability × size of harm. A tiny chance of a huge harm can outweigh a certain small benefit.',
          'Critics point out that summing can justify sacrificing a few for many, and that probabilities are often guesses.',
        ],
        formulas: [['Expected value', 'E = \\sum_i p_i \\, v_i']],
        examples: [
          ex('A change saves $200 000. It adds a 1 in 1000 chance of a failure costing $500 million. Expected cost of the risk?', [['Multiply.', '0.001 \\times 500\\,000\\,000'], ['Result.', '\\$500\\,000']], '$500 000, more than the saving'),
          ex('Same, with a 1 in 100 000 chance.', [['Multiply.', '10^{-5} \\times 5\\times10^8'], ['Result.', '\\$5\\,000']], '$5 000: the numbers now favour the change'),
        ],
        practice: [
          pr('A 1 in 10 000 chance of a $50 million loss. Expected loss in dollars?', 5000, 'p × v.', '0.0001 × 50 000 000 = 5000.'),
          pr('A 2% chance of a $1 million repair. Expected cost in dollars?', 20000, 'Multiply.', '20 000.'),
          ch('Which is a standard criticism of pure utilitarianism?', ['It can justify sacrificing a few people for the many', 'It ignores outcomes', 'It forbids all risk', 'It only counts the engineer'], 'Think of rights.', 'Summing can override individuals.'),
          ch('Who wrote Utilitarianism (1863)?', ['John Stuart Mill', 'Immanuel Kant', 'Aristotle', 'David Hume'], 'Also wrote on logic and liberty.', 'Mill.'),
        ],
      },
      {
        title: 'Duties and rules',
        minutes: 15,
        explain: [
          'Kant’s categorical imperative in two versions: act only on a rule you could will everyone to follow; and treat people always as ends, never merely as means.',
          'Applied to engineering: "conceal risks when it saves money" cannot be a universal rule, because then no one could trust any design.',
          'Duties such as honesty and informed consent act as side constraints: options that break them are ruled out before weighing outcomes.',
        ],
        formulas: [['Side constraint', '\\text{choose } \\arg\\max_{a\\,\\in\\,\\text{permitted}} U(a)']],
        examples: [
          ex('Test the rule "Skip a safety check when behind schedule" with Kant’s first formulation.', [['Imagine everyone follows it.', 'Every late project skips checks.'], ['Result.', 'Safety checks lose all meaning; the rule defeats itself.']], 'It fails the test'),
          ex('Is testing a new bridge material on the public without telling them consistent with Kant’s second formulation?', [['Are people used merely as a means?', 'Yes, without consent.'], ['Verdict.', 'Not permitted.']], 'No'),
        ],
        practice: [
          ch('Kant’s ethics is an example of…', ['Deontology (duty ethics)', 'Utilitarianism', 'Relativism', 'Stoic logic'], 'Duties and rules.', 'Deontology.'),
          ch('"Treat people never merely as a means" forbids…', ['Exposing people to hidden risks without consent', 'Hiring workers', 'Selling products', 'Charging fees'], 'Means vs merely as means.', 'Using people without their consent.'),
          ch('When was Kant’s Groundwork of the Metaphysics of Morals published?', ['1785', '1863', '1641', '1934'], 'Eighteenth century.', '1785.'),
          ch('A side constraint works by…', ['Ruling out some options before outcomes are compared', 'Adding weight to cost', 'Choosing randomly', 'Ignoring outcomes entirely'], 'Filter, then weigh.', 'Forbidden options are removed first.'),
        ],
      },
      {
        title: 'Case study: the Hyatt Regency walkways',
        minutes: 20,
        explain: [
          'The original design hung both walkways from continuous rods. During construction the fabricator proposed two shorter rods: one from the ceiling to the upper walkway, a second from the upper walkway to the lower one.',
          'With the change, the upper walkway’s connection had to carry both walkways, double the load. The connection was already weak; it failed on 17 July 1981 with crowds on the walkways, killing 114.',
          'Investigations found the change was approved without proper calculation. The engineers of record lost their licences. The case is now taught in engineering ethics courses worldwide.',
        ],
        formulas: [['Load on the upper connection', 'F_{\\text{new}} = F_{\\text{upper}} + F_{\\text{lower}} \\approx 2F']],
        examples: [
          ex('Each walkway puts 90 kN on a connection in the original design. What did the upper connection carry after the change?', [['It carries both walkways.', '90 + 90'], ['Result.', '180\\ \\text{kN}']], '180 kN'),
          ex('If the connection could hold 150 kN, what was its safety factor before and after?', [['Before.', '150/90 = 1.67'], ['After.', '150/180 = 0.83 \\text{ (below 1)}']], '1.67 before, 0.83 after'),
        ],
        practice: [
          pr('Load per walkway 70 kN. Load on the upper connection after the change, in kN?', 140, 'Both walkways.', '140 kN.'),
          pr('Connection capacity 120 kN, load 140 kN. Safety factor?', 120 / 140, 'Capacity ÷ load.', '0.86: failure expected.', { tol: 0.005 }),
          ch('What was the key ethical failure?', ['A safety-critical change was approved without proper checking', 'The hotel was too big', 'Steel was used', 'A dance was held'], 'Process, not material.', 'No proper review of a load-path change.'),
          ch('Which canon of the NSPE ethics rules was most directly at stake?', ['Hold paramount the safety, health and welfare of the public', 'Advertise honestly', 'Avoid conflicts of interest', 'Keep client information confidential'], 'Canon 1.', 'Public safety.'),
        ],
      },
    ],
  },
};
