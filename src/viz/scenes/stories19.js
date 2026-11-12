// Story versions, batch 19: side topic, Computing to today's AI.
import { retell } from './stories16';
import * as K from './side_comp';

export const binary_adder = retell(K.binary_adder, 'binary_adder', [
  { say: 'A computer stores every number as switches, on or off: 1 or 0. Leibniz wrote out this binary counting in 1703. Each place is worth double the one to its right: 8, 4, 2, 1.', set: { a: 5, b: 3 }, ms: 12000 },
  { say: 'Adding works like school addition, column by column. But 1 + 1 = 10 in binary: write 0, carry 1.', set: {}, ms: 10000 },
  { say: '5 + 3: 0101 + 0011. The two right-hand 1s make 0, carry 1. The carry ripples left until 1000 = 8.', set: {}, ms: 10500, n: 0 },
  { say: '11 + 4: no column has two 1s, so there are no carries at all: 1111 = 15.', set: { a: 11, b: 4 }, ms: 9500, n: 1 },
  { say: '9 + 7 = 16 needs a fifth place. A four-bit adder keeps only 0000: overflow. Old video games glitched exactly like this.', set: { a: 9, b: 7 }, ms: 10500, n: 2 },
  { say: 'In 1937 Claude Shannon showed that switch circuits can do this logic. Every processor is billions of tiny switches adding like this.', set: { a: 6, b: 7 }, ms: 10500 },
]);

export const difference_engine = retell(K.difference_engine, 'difference_engine', [
  { say: 'In the 1820s, tables of numbers for navigation were computed by hand, full of errors. Charles Babbage designed a machine to do it with gears: the Difference Engine.', set: { x: 0 }, ms: 11500 },
  { say: 'Its trick: for a polynomial like x² + x + 41, the second difference is always 2. So each new value needs only additions, no multiplying. Three columns, added right to left.', set: { x: 3 }, ms: 12000, n: 0 },
  { say: 'Euler noticed in 1772 that x² + x + 41 gives primes: 41, 43, 47, 53, 61, and on and on, all the way to x = 39.', set: { x: 20 }, ms: 11000, n: 1 },
  { say: 'x = 40 gives 1681 = 41 × 41. The machine computed it perfectly; the pattern broke. Many examples are not a proof.', set: { x: 40 }, ms: 10500, n: 2 },
  { say: 'Babbage never finished it. In 1991 London’s Science Museum built his Difference Engine No. 2 from his drawings, and it worked.', set: { x: 10 }, ms: 10000 },
]);

export const turing_machine = retell(K.turing_machine, 'turing_machine', [
  { say: 'In 1936 Alan Turing, aged 23, asked what “computing” means. His answer was an imaginary machine: a tape of symbols, a head that reads one square, and a short table of rules.', set: { input: '1011', step: 0 }, ms: 12000 },
  { say: 'This one adds 1 to a binary number. Eleven on the tape. The head reads 1: write 0, move left, keep carrying.', set: { step: 1 }, ms: 10500, n: 0 },
  { say: 'Another 1 becomes 0. Then a 0 becomes 1 and the machine halts: 1100 = twelve, in 3 steps.', set: { step: 3 }, ms: 10000, n: 1 },
  { say: 'Fifteen: four carries, then the blank becomes 1. 10000 = sixteen after 5 steps, the most of the three.', set: { input: '1111', step: 5 }, ms: 10500, n: 2 },
  { say: 'Turing showed that one such machine, given the right rules on its tape, can imitate any other. That “universal machine” is the idea behind every computer.', set: { input: '1010', step: 1 }, ms: 11000 },
]);

export const entropy_coin = retell(K.entropy_coin, 'entropy_coin', [
  { say: 'How much information is in a message? Claude Shannon’s answer (1948): it is the amount of surprise. A message you could have guessed tells you nothing.', set: { p: 0.5 }, ms: 10500 },
  { say: 'A fair coin: you cannot predict it at all. Each toss carries 1 full bit, the unit Shannon named.', set: {}, ms: 9500, n: 0 },
  { say: 'Heads only 11% of the time: mostly tails, so each toss tells you about half a bit. Predictable data can be squeezed: that is how ZIP files and photos are compressed.', set: { p: 0.11 }, ms: 11500, n: 1 },
  { say: 'A two-tailed coin: no surprise, no information. 0 bits.', set: { p: 0 }, ms: 8500, n: 2 },
  { say: 'The curve is symmetric: a coin that is almost always heads is just as predictable. The maximum is always at 50–50.', set: { p: 0.89 }, ms: 9500 },
]);

export const moores_law = retell(K.moores_law, 'moores_law', [
  { say: 'In 1965 Gordon Moore, later a founder of Intel, noticed that the number of transistors on a chip was doubling at a steady pace. Each dot is a real chip.', set: { T: 1 }, ms: 11000 },
  { say: 'His first guess: doubling every year. By 2020 that line overshoots real chips about a hundred million times.', set: {}, ms: 10000, n: 0 },
  { say: 'His 1975 revision, every two years, runs right through the points for half a century. The vertical scale is logarithmic: each step up is ten times more.', set: { T: 2 }, ms: 11500, n: 1 },
  { say: 'Every three years would have badly undershot: Apple’s M1 chip of 2020 has 16 billion transistors, far above this line.', set: { T: 3 }, ms: 10500, n: 2 },
  { say: 'This was not a law of nature but of engineering: materials science kept shrinking transistors toward a few nanometres. Now the shrinking is slowing.', set: { T: 2 }, ms: 10500 },
]);

export const search_race = retell(K.search_race, 'search_race', [
  { say: 'Find one name in a sorted list. Method one: check every name in turn. Method two: open at the middle, see which half it is in, and throw the other half away.', set: { k: 3 }, ms: 11000 },
  { say: 'A thousand names: checking each could take 1,000 looks. Halving takes at most 10, because 2¹⁰ ≈ 1,000.', set: {}, ms: 10000, n: 0 },
  { say: 'A million names: a million looks against 20.', set: { k: 6 }, ms: 8500, n: 1 },
  { say: 'A billion: halving needs only 30 looks. Each extra look doubles the size of list you can handle.', set: { k: 9 }, ms: 10000, n: 2 },
  { say: 'A good method beats a fast computer. That is why databases keep data sorted, and why the study of algorithms matters.', set: { k: 12 }, ms: 10000 },
]);

export const euclid_trace = retell(K.euclid_trace, 'euclid_trace', [
  { say: 'Euclid’s Elements, about 300 BC, holds one of the oldest algorithms still in use: finding the greatest common divisor of two numbers.', set: { a: 48, b: 18 }, ms: 10500 },
  { say: 'The rule: divide the bigger by the smaller and keep the remainder. Repeat with the smaller number and the remainder, until the remainder is 0.', set: {}, ms: 10500 },
  { say: '48 and 18: 48 = 2 × 18 + 12, then 18 = 1 × 12 + 6, then 12 = 2 × 6 + 0. The GCD is 6, in 3 passes. As rectangles: cut off the biggest squares you can.', set: {}, ms: 12000, n: 0 },
  { say: '100 and 99: one pass leaves 1, the next finishes. Big numbers can be quick.', set: { a: 100, b: 99 }, ms: 9000, n: 1 },
  { say: '89 and 55, neighbours in the Fibonacci sequence: every quotient is 1, so it takes 9 passes, the most possible under 100. Lamé proved this worst case in 1844.', set: { a: 89, b: 55 }, ms: 11500, n: 2 },
]);

export const packet_route = retell(K.packet_route, 'packet_route', [
  { say: 'The internet sends your message chopped into small packets, each finding its own way across a mesh of links. Paul Baran proposed this in the early 1960s so a network could survive damage.', set: { cut: 'none' }, ms: 12000 },
  { say: 'Each link has a delay. Routers keep finding the fastest path, using methods like Dijkstra’s (1959). With all links up: A → B → D → F → G, 42 ms.', set: {}, ms: 11500, n: 0 },
  { say: 'Cut B–D, and the packets simply go A → C → E → F → G: 50 ms. Nobody had to be told.', set: { cut: 'BD' }, ms: 10000, n: 1 },
  { say: 'Cut F–G, the last hop: they must swing south through H. 52 ms, the worst single failure here.', set: { cut: 'FG' }, ms: 10000, n: 2 },
  { say: 'There is no centre to destroy. Undersea cables that link the Philippines to the world are routed exactly this way.', set: { cut: 'EF' }, ms: 9500 },
]);

export const gradient_descent = retell(K.gradient_descent, 'gradient_descent', [
  { say: 'Most of machine learning is one idea: you have an error to make small. Stand on the error curve, feel which way is downhill, and take a step. Cauchy described this in 1847.', set: { lr: 0.1, n: 0 }, ms: 11500 },
  { say: 'The step size is the learning rate, η. η = 0.1: small, safe steps. Each one removes 20% of the distance to the bottom.', set: { n: 8 }, ms: 10500, n: 0 },
  { say: 'η = 0.5: one giant step lands exactly at w = 3. For this bowl that is the perfect rate.', set: { lr: 0.5, n: 3 }, ms: 10000, n: 1 },
  { say: 'η = 0.9: it overshoots back and forth but still closes in. At η = 1 it would bounce forever; above that it flies off.', set: { lr: 0.9, n: 10 }, ms: 11000, n: 2 },
  { say: 'A model like ChatGPT has billions of dials, but it is trained the same way: many small downhill steps on its error. Choosing η is still partly an art.', set: { lr: 0.3, n: 6 }, ms: 11000 },
]);

export const neuron_line = retell(K.neuron_line, 'neuron_line', [
  { say: 'Frank Rosenblatt’s perceptron (1958): an artificial neuron multiplies each input by a weight, adds a bias, and fires if the total is above zero. On this square, it draws a straight line.', set: { data: 'and', w1: 1, w2: 1, b: -1.5 }, ms: 12000 },
  { say: 'AND: only (1, 1) should fire. Weights 1 and 1, bias −1.5, puts the line just below that corner.', set: {}, ms: 10000, n: 0 },
  { say: 'OR: anything with a 1 fires. Raise the bias to −0.5 and the line slides down past three corners.', set: { data: 'or', b: -0.5 }, ms: 10000, n: 1 },
  { say: 'XOR: (0, 1) and (1, 0) fire, but (0, 0) and (1, 1) do not. No straight line can split them: 3 of 4 is the best. Minsky and Papert stressed this in 1969, and interest faded for years.', set: { data: 'xor' }, ms: 12500, n: 2 },
  { say: 'The fix: stack neurons in layers, so several lines combine. Training such networks became practical in 1986 with backpropagation. Today’s AI is this, scaled up enormously.', set: {}, ms: 11500 },
]);

export const next_word = retell(K.next_word, 'next_word', [
  { say: 'A language model writes one word at a time. For “The steel bar was heated until it glowed…”, it gives every possible next word a probability, then picks one.', set: { T: 1 }, ms: 10500 },
  { say: 'At temperature T = 1, it uses its own probabilities: “red” 48%, “orange” 32%, and a small chance of the odd “blue”.', set: {}, ms: 10500, n: 0 },
  { say: 'T = 0.2 sharpens them: nearly always “red”. Predictable and safe, but repetitive over a long text.', set: { T: 0.2 }, ms: 10000, n: 1 },
  { say: 'T = 3 flattens them: “blue”, a strange word for glowing steel, now has 8%. More creative, more wrong.', set: { T: 3 }, ms: 10000, n: 2 },
  { say: 'Shannon played this guessing game with English in 1951. Modern models, built on the 2017 Transformer design, are vastly better guessers, but they are still guessing. Check their facts.', set: { T: 0.8 }, ms: 12000 },
]);

export const compute_trend = retell(K.compute_trend, 'compute_trend', [
  { say: 'How much computing does it take to train an AI model? Each dot is a famous model, on a log scale where each step up is ten times more.', set: { d: 24 }, ms: 10500 },
  { say: 'At Moore’s-law pace, doubling every 24 months, the line falls far below the real models.', set: {}, ms: 9500, n: 0 },
  { say: 'Doubling every 6 months, the rate a 2022 study found across over 100 models, comes close. Companies have been buying ever more chips, not just faster ones.', set: { d: 6 }, ms: 11500, n: 1 },
  { say: 'For just these four, about 4.5 months fits best: training compute grew roughly 100 million-fold in a decade.', set: { d: 4.5 }, ms: 10500, n: 2 },
  { say: 'That growth runs on materials: chips, power plants and cooling. Electricity and chip supply are now real limits on AI.', set: { d: 6 }, ms: 10000 },
]);
