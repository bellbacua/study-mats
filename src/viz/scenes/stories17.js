// Story versions, batch 17: side topic, Philosophy & Logic.
import { retell } from './stories16';
import * as P from './side_philo';

export const socrates_definition = retell(P.socrates_definition, 'socrates_definition', [
  { say: 'Athens, about 400 BC. In Plato’s dialogue Laches, Socrates asks two generals a simple question: what is courage? Each answer is tested against real cases.', set: { d: 'post' }, ms: 11000 },
  { say: 'Laches’ first try: staying at your post and never running. It fits the soldier, but four real acts of courage, like a planned retreat, fall outside it: too narrow.', set: {}, ms: 11500, n: 0 },
  { say: 'His second try, “endurance of the soul”, swallows almost everything, including the stubborn gambler and the fool: too broad.', set: { d: 'endure' }, ms: 10500, n: 1 },
  { say: 'Socrates’ fix, wise endurance, cuts out the fool. But then the diver who knows how to dive seems braver than one who does not, which feels wrong.', set: { d: 'wise' }, ms: 11000 },
  { say: 'Nicias says courage is knowing what to fear and what to dare. It fits best, but the doctor who knows what to fear in illness gets in too.', set: { d: 'know' }, ms: 11000, n: 2 },
  { say: 'The dialogue ends unsolved. Socrates’ lasting gift is the method: propose a definition, hunt for a counterexample, refine. Engineers do the same with specifications.', set: {}, ms: 11000 },
]);

export const syllogism_venn = retell(P.syllogism_venn, 'syllogism_venn', [
  { say: 'Aristotle, about 350 BC, catalogued arguments with two premises and a conclusion: syllogisms. Here S, M and P are three groups, drawn as circles in John Venn’s 1880 diagrams.', set: { form: 'barbara' }, ms: 12000 },
  { say: 'Barbara: all M are P, all S are M, so all S are P. Each premise darkens a region that must be empty. All of S outside P ends up dark: valid.', set: {}, ms: 12000, n: 0 },
  { say: 'Celarent: no M are P, all S are M, so no S are P. The overlap of S and P is wiped out: valid.', set: { form: 'celarent' }, ms: 10500 },
  { say: 'Darii: some S are M. The X, meaning something exists here, can only sit where S and M overlap inside P. So some S are P: valid.', set: { form: 'darii' }, ms: 11500, n: 1 },
  { say: 'Now a trap, the undistributed middle: all P are M, all S are M, so all S are P? S outside P is still open. The conclusion is not guaranteed.', set: { form: 'undist' }, ms: 12000, n: 2 },
  { say: 'The test is mechanical: draw the premises, then look. If the conclusion is already drawn, the argument is valid, whatever the words are about.', set: { form: 'illicit' }, ms: 10500 },
]);

export const truth_table = retell(P.truth_table, 'truth_table', [
  { say: 'Two statements, P and Q, can each be true or false: four possible worlds, the four rows. An argument is valid if no row makes the premises true and the conclusion false.', set: { form: 'mp' }, ms: 12000 },
  { say: 'Modus ponens: if P then Q; P; so Q. Only the first row has both premises true, and Q is true there. No counterexample: valid.', set: {}, ms: 11000, n: 0 },
  { say: 'Affirming the consequent: if P then Q; Q; so P. Row 3, P false and Q true, makes both premises true, yet P is false. A counterexample: invalid.', set: { form: 'ac' }, ms: 12000, n: 1 },
  { say: 'In words: “if it rained, the street is wet; the street is wet; so it rained.” A burst pipe could wet it too.', set: {}, ms: 9500 },
  { say: 'Modus tollens: if P then Q; not Q; so not P. Only row 4 has both premises true, and not-P holds there: valid.', set: { form: 'mt' }, ms: 11000, n: 2 },
  { say: 'Truth tables were set out by Wittgenstein and Emil Post in 1921. Every computer chip checks logic exactly this way, with true and false as 1 and 0.', set: { form: 'ds' }, ms: 11000 },
]);

export const hidden_factor = retell(P.hidden_factor, 'hidden_factor', [
  { say: 'A newspaper finds that on days when more ice cream is sold, more people drown. Does ice cream cause drowning?', set: { w: 'all', k: 0 }, ms: 9500 },
  { say: 'Every day of a summer. More ice cream, more drownings: a strong correlation. The colour shows the temperature.', set: {}, ms: 10000, n: 0 },
  { say: 'Hot days drive both: people buy ice cream and people go swimming. Temperature is a hidden common cause, a confounder.', set: {}, ms: 10500 },
  { say: 'Now compare days as if they were equally hot. Ice cream sales tell you almost nothing about drownings.', set: { w: 'fixed' }, ms: 10000, n: 1 },
  { say: 'If ice cream really did cause drownings, the link would survive even among days of the same temperature.', set: { k: 1 }, ms: 10000, n: 2 },
  { say: 'In the lab it is the same: a stronger batch may just have been made on a cooler day. Control the hidden factors before claiming a cause.', set: { k: 0, w: 'all' }, ms: 10500 },
]);

export const descartes_doubt = retell(P.descartes_doubt, 'descartes_doubt', [
  { say: 'In 1641 René Descartes set out to find one belief that could not possibly be false. His method: doubt everything that can be doubted, and see what is left.', set: { lvl: '0' }, ms: 11000 },
  { say: 'Everyday beliefs, from far-off towers to arithmetic, all standing.', set: {}, ms: 8000 },
  { say: 'The senses sometimes deceive: a square tower looks round from far away; a stick in water looks bent. Beliefs from the senses go.', set: { lvl: '1' }, ms: 10500, n: 1 },
  { say: 'Dreams feel real, so even “I am sitting by the fire” could be false. But a square has four sides even in a dream.', set: { lvl: '2' }, ms: 10500, n: 2 },
  { say: 'Imagine an all-powerful deceiver, faking even arithmetic. Only one belief survives: to be deceived at all, I must exist. “I think, therefore I am.”', set: { lvl: '3' }, ms: 12000, n: 3 },
  { say: 'From that one firm point Descartes tried to rebuild knowledge. The habit of asking “how do I know this?” is the root of the scientific method.', set: {}, ms: 10000 },
]);

export const induction_turkey = retell(P.induction_turkey, 'induction_turkey', [
  { say: 'David Hume asked in 1739: why do we expect the future to be like the past? No logic proves the sun will rise tomorrow. Bertrand Russell told it with a chicken; here, a turkey.', set: { n: 0 }, ms: 12000 },
  { say: 'Day 3. Fed three mornings in a row. Laplace’s rule of succession (1814) gives (3 + 1) ÷ (3 + 2) = 80% for tomorrow.', set: { n: 3 }, ms: 10500, n: 0 },
  { say: 'Day 98. Now 99%. Every morning seems to confirm the rule.', set: { n: 98 }, ms: 9000, n: 1 },
  { say: 'Day 1000. 99.9% sure. Tomorrow is Thanksgiving. No number of good mornings made it certain.', set: { n: 1000 }, ms: 10500, n: 2 },
  { say: 'Science still learns from repeated cases, but it holds every rule as provisional. Engineers add safety factors for exactly the case nobody has seen yet.', set: {}, ms: 10500 },
]);

export const bayes_grid = retell(P.bayes_grid, 'bayes_grid', [
  { say: 'A test for a rare condition is “90% accurate”. You test positive. How likely is it that you have it? Most people guess about 90%.', set: { base: 1, sens: 90, fpr: 9 }, ms: 10500 },
  { say: 'Picture 1,000 people. 10 are sick. The test catches 9 of them, but it also flags about 89 of the 990 healthy people.', set: {}, ms: 10500, n: 0 },
  { say: 'So of 98 positives, only 9 are truly sick: about 9%. The rare condition is swamped by false alarms. Thomas Bayes’ rule, published in 1763, does this sum.', set: {}, ms: 12000 },
  { say: 'If the condition were common, 20%, the same test would be right about 71% of the time when positive.', set: { base: 20 }, ms: 10000, n: 1 },
  { say: 'Back to 1%, but with a much cleaner test, 1% false alarms: now a positive means about 48%.', set: { base: 1, fpr: 1 }, ms: 10000, n: 2 },
  { say: 'The same logic applies to crack detectors in a factory: if real flaws are rare, most alarms will be false. Always ask how common the thing is to begin with.', set: {}, ms: 11000 },
]);

export const eclipse_1919 = retell(P.eclipse_1919, 'eclipse_1919', [
  { say: 'Einstein’s theory of gravity made a risky prediction: starlight grazing the Sun bends by 1.75 arcseconds, twice the 0.87 a Newtonian calculation gives. If wrong, the theory was dead.', set: { d: 'principe' }, ms: 12000 },
  { say: 'Only a total eclipse lets you see those stars. On 29 May 1919 two British teams photographed one, from Príncipe off Africa and Sobral in Brazil.', set: {}, ms: 11000 },
  { say: 'Eddington’s plates from Príncipe: 1.61 ± 0.30 arcseconds. Closer to Einstein, but the error bar is wide.', set: {}, ms: 10000, n: 0 },
  { say: 'Sobral’s better lens: 1.98 ± 0.12. The Newtonian 0.87 is about nine error bars away.', set: { d: 'sobral' }, ms: 10000, n: 1 },
  { say: 'Modern radio measurements pin it at 1.75 with tiny errors. Karl Popper took this as his model of science: a theory earns trust by surviving tests that could have killed it.', set: { d: 'radio' }, ms: 12000, n: 2 },
]);

export const epicycles = retell(P.epicycles, 'epicycles', [
  { say: 'Watch Mars against the stars for a year and something strange happens: it slows, moves backwards for a few weeks, then forwards again. Why?', set: { view: 'sun', t: 0.7 }, ms: 10500 },
  { say: 'Sun-centred view: Earth (blue) laps Mars (red) about every 2.1 years. The line shows where we see Mars among the stars.', set: {}, ms: 10500, n: 0 },
  { say: 'As Earth overtakes Mars, the line of sight swings backwards, like a slower car seeming to drift back as you pass it.', set: { t: 0.2 }, ms: 10500, n: 1 },
  { say: 'Ptolemy, about AD 150, kept Earth at the centre. He drew the same motion as a small circle, an epicycle, riding on a big one. The path loops exactly where Mars reverses.', set: { view: 'earth', t: 0.25 }, ms: 12000, n: 2 },
  { say: 'Both pictures predicted the sky well. Copernicus (1543) won not by better data at first, but by being simpler: one idea explained every planet’s loops at once.', set: { t: 1.2 }, ms: 11500 },
]);

export const ethics_matrix = retell(P.ethics_matrix, 'ethics_matrix', [
  { say: 'An engineer suspects a flaw in a part already shipped. Three choices: approve it quietly, re-check it openly, or recall everything. Each has costs and risks.', set: { w: 0.5, duty: 'off' }, ms: 11000 },
  { say: 'One way to choose, from Bentham and Mill: weigh every outcome and pick the best total. Give safety reasonable weight and the open re-check scores best.', set: {}, ms: 11500, n: 0 },
  { say: 'But the answer depends on the weights. Care almost only about money and the quiet approval wins the sum. This is how disasters get rationalised.', set: { w: 0.1 }, ms: 11000, n: 1 },
  { say: 'Kant (1785) said some acts are wrong whatever the sums: you may not treat people merely as means. Add that duty, and hiding a known risk is off the table.', set: { duty: 'on' }, ms: 11500, n: 2 },
  { say: 'Engineering codes of ethics, including the Philippine ones, put public safety first. They work like Kant’s rule: a limit no saving can buy.', set: { w: 0.5 }, ms: 10500 },
]);
