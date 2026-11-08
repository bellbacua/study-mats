// Economics side topic: each class split into parts.
// Practice mixes pick-an-answer questions (first option correct, shown shuffled)
// with typed numbers that are computed in place.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution) => ({ q, options, hint, solution });
const v88 = (x) => (x >= 0 ? x ** 0.88 : -2.25 * (-x) ** 0.88);

export const SIDE_ECON = {
  'econ-001': {
    predict: {
      q: 'Ten pin makers each make whole pins: about 20 a day each. If they split the 18 steps between them, roughly how many pins a day did Smith report?',
      options: ['About 48,000', 'About 400', 'About 2,000', 'About 200'],
      answer: 0,
      reveal: 'Smith reported about 48,000 a day, or 4,800 per worker: some 240 times more than each could make alone.',
    },
    parts: [
      {
        title: 'Output and productivity',
        minutes: 15,
        explain: [
          'Productivity is output per worker (or per hour). Splitting work raises it when each person gets faster at a narrow task.',
          'To compare two set-ups, divide total output by the number of workers in each, then take the ratio.',
          'Smith’s three reasons: skill from repetition, no time lost switching tasks, and simple steps that machines can take over.',
        ],
        formulas: [['Productivity', '\\text{productivity} = \\frac{\\text{output}}{\\text{workers}}'], ['Gain', '\\text{gain} = \\frac{\\text{productivity}_{\\text{new}}}{\\text{productivity}_{\\text{old}}}']],
        examples: [
          ex('Ten workers make 48,000 pins a day. Productivity?', [['Divide.', '48\\,000 / 10'], ['Result.', '4800 \\text{ pins per worker per day}']], '4,800 pins per worker per day'),
          ex('Gain over 20 pins a day working alone?', [['Ratio.', '4800 / 20'], ['Result.', '240']], '240 times'),
        ],
        practice: [
          pr('A team of 6 makes 900 chairs a month. Chairs per worker per month?', 150, 'Divide.', '900 / 6 = 150.'),
          pr('Alone, each of those 6 made 50 chairs a month. What is the gain from splitting the work?', 3, '150 / 50.', '3 times.'),
          ch('Which is one of Smith’s three reasons?', ['No time lost switching between tasks', 'Workers are paid less', 'Fewer workers are needed', 'Prices are fixed'], 'Skill, time, machines.', 'Switching time.'),
          pr('If 10 workers make 48,000 pins, how many would 25 workers make at the same productivity?', 120000, '4800 × 25.', '120,000.'),
        ],
      },
      {
        title: 'Limits to splitting',
        minutes: 15,
        explain: [
          'Splitting only helps while there are separate steps to split and enough output to keep everyone busy. Smith noted that the division of labour is limited by the extent of the market.',
          'If a step takes much longer than the others, it becomes a bottleneck: the whole line can go no faster than its slowest step.',
          'The line rate is set by the slowest station: rate = 1 / (longest step time).',
        ],
        formulas: [['Line rate', '\\text{rate} = \\frac{1}{t_{\\max}}']],
        examples: [
          ex('Four stations take 2, 3, 6 and 2 minutes per part. Parts per hour?', [['Slowest station.', 't_{\\max} = 6 \\text{ min}'], ['Rate.', '60 / 6 = 10 \\text{ per hour}']], '10 parts per hour'),
          ex('A second worker is added to the 6-minute station, halving it. New rate?', [['New slowest.', 't_{\\max} = 3 \\text{ min}'], ['Rate.', '60 / 3 = 20 \\text{ per hour}']], '20 parts per hour'),
        ],
        practice: [
          pr('Stations take 4, 5, 3 and 8 minutes. Parts per hour?', 7.5, '60 / 8.', '7.5.'),
          pr('If the 8-minute station is split between two people (4 each), parts per hour?', 12, 'New slowest is 5 minutes.', '60 / 5 = 12.'),
          ch('Smith said the division of labour is limited by…', ['The extent of the market', 'The weather', 'The king', 'The price of pins'], 'Book I, Chapter 3.', 'You need buyers for all the output.'),
          ch('The slowest step in a line is called…', ['The bottleneck', 'The margin', 'The equilibrium', 'The multiplier'], 'Like the neck of a bottle.', 'Bottleneck.'),
        ],
      },
      {
        title: 'Ford’s assembly line',
        minutes: 15,
        explain: [
          'In 1913 Ford moved the chassis past fixed workers. Chassis assembly fell from about 12.5 hours to about 1.5 hours.',
          'Cheaper production let Ford cut prices, which grew the market, which made even finer division of labour worth it.',
          'Percentage saving = (old − new) / old × 100.',
        ],
        formulas: [['Percent saved', '\\frac{t_{\\text{old}} - t_{\\text{new}}}{t_{\\text{old}}} \\times 100\\%']],
        examples: [
          ex('Assembly time falls from 12.5 h to 1.5 h. Percent saved?', [['Difference.', '12.5 - 1.5 = 11'], ['Percent.', '11 / 12.5 = 88\\%']], '88%'),
          ex('How many chassis can one line finish in a 9-hour day at 1.5 h each (one at a time)?', [['Divide.', '9 / 1.5'], ['Result.', '6']], '6'),
        ],
        practice: [
          pr('Time per part falls from 40 to 10 minutes. Percent saved?', 75, '(40 − 10)/40.', '75%.'),
          pr('Parts per 8-hour shift at 10 minutes each?', 48, '480 / 10.', '48.'),
          pr('How many times faster is 1.5 h than 12.5 h (to 0.01)?', 12.5 / 1.5, '12.5 / 1.5.', 'About 8.33.', { tol: 0.01 }),
          ch('On a moving assembly line, what moves?', ['The product being built', 'The workers', 'The factory', 'The customers'], 'The car came to the worker.', 'The product.'),
        ],
      },
    ],
  },

  'econ-002': {
    predict: {
      q: 'A typhoon closes some nickel mines but buyers want just as much nickel as before. What happens to the price?',
      options: ['It rises', 'It falls', 'It stays the same', 'It cannot be said'],
      answer: 0,
      reveal: 'Supply shifts up (less is offered at each price), so the crossing point moves to a higher price and a smaller quantity.',
    },
    parts: [
      {
        title: 'Finding the equilibrium',
        minutes: 15,
        explain: [
          'Write demand and supply as prices in terms of quantity. At equilibrium the two prices are equal.',
          'Solve for Q, then put it back into either line to get P.',
          'For linear lines P = a − bQ and P = c + dQ: Q* = (a − c)/(b + d).',
        ],
        formulas: [['Equilibrium quantity', 'Q^* = \\frac{a - c}{b + d}'], ['Equilibrium price', 'P^* = a - bQ^*']],
        examples: [
          ex('Demand P = 100 − Q, supply P = 20 + Q.', [['Set equal.', '100 - Q = 20 + Q'], ['Solve.', 'Q^* = 40,\\ P^* = 60']], 'Q = 40, P = 60'),
          ex('Demand P = 120 − 2Q, supply P = 30 + Q.', [['Set equal.', '120 - 2Q = 30 + Q \\Rightarrow Q = 30'], ['Price.', 'P = 30 + 30 = 60']], 'Q = 30, P = 60'),
        ],
        practice: [
          pr('Demand P = 90 − Q, supply P = 10 + Q. Equilibrium quantity?', 40, '90 − Q = 10 + Q.', '80 = 2Q, Q = 40.'),
          pr('Same lines. Equilibrium price?', 50, '10 + 40.', '50.'),
          pr('Demand P = 200 − 4Q, supply P = 20 + 2Q. Equilibrium quantity?', 30, '180 = 6Q.', '30.'),
          pr('Same lines. Equilibrium price?', 80, '20 + 60.', '80.'),
        ],
      },
      {
        title: 'Shifts',
        minutes: 15,
        explain: [
          'A change in cost of supplying (a typhoon, a new tax, cheaper energy) moves the whole supply line up or down.',
          'A change in what buyers want (new uses, more income, fashion) moves the whole demand line.',
          'In this class’s model P* = (120 + D + S)/2 and Q* = (80 + D − S)/2. Supply up raises price and lowers quantity; demand up raises both.',
        ],
        formulas: [['Price', 'P^* = \\frac{120 + D + S}{2}'], ['Quantity', 'Q^* = \\frac{80 + D - S}{2}']],
        examples: [
          ex('Supply shift S = 20, D = 0.', [['Price.', '(120 + 20)/2 = 70'], ['Quantity.', '(80 - 20)/2 = 30']], 'P = 70, Q = 30'),
          ex('D = 20, S = 0.', [['Price.', '(120 + 20)/2 = 70'], ['Quantity.', '(80 + 20)/2 = 50']], 'P = 70, Q = 50'),
        ],
        practice: [
          pr('S = 30, D = 0. New price?', 75, '(120 + 30)/2.', '75.'),
          pr('S = 30, D = 0. New quantity?', 25, '(80 − 30)/2.', '25.'),
          pr('S = 10, D = −10. Price?', 60, '(120 − 10 + 10)/2.', '60.'),
          ch('Electric-car makers suddenly want more nickel. Which line moves?', ['Demand, to the right', 'Supply, up', 'Supply, down', 'Neither'], 'Who changed?', 'Buyers want more at every price.'),
        ],
      },
      {
        title: 'History of the picture',
        minutes: 10,
        explain: [
          'Cournot drew a demand curve in 1838; Fleeming Jenkin drew demand and supply crossing in 1870; Marshall made it standard in 1890.',
          'Marshall put price on the vertical axis. The habit stuck, so economists read these diagrams "sideways" compared with mathematicians.',
          'Elasticity (how strongly quantity reacts to price) = percent change in quantity / percent change in price.',
        ],
        formulas: [['Price elasticity', 'e = \\frac{\\%\\Delta Q}{\\%\\Delta P}']],
        examples: [
          ex('Price rises 10%, quantity bought falls 5%. Elasticity?', [['Divide.', '-5 / 10'], ['Result.', 'e = -0.5']], '−0.5 (inelastic)'),
          ex('Price rises 10%, quantity falls 20%. Elasticity?', [['Divide.', '-20 / 10'], ['Result.', 'e = -2']], '−2 (elastic)'),
        ],
        practice: [
          pr('Price up 20%, quantity down 4%. Elasticity?', -0.2, '−4 / 20.', '−0.2.'),
          ch('Who first drew supply and demand crossing, in 1870?', ['Fleeming Jenkin', 'Alfred Marshall', 'Adam Smith', 'Cournot'], 'An engineer.', 'Jenkin.'),
          ch('Marshall’s scissors stand for…', ['Supply and demand together set price', 'Cutting costs', 'Taxes', 'Trade barriers'], 'Both blades cut.', 'Both sides matter.'),
          pr('Price down 5%, quantity up 15%. Elasticity?', -3, '15 / −5.', '−3.'),
        ],
      },
    ],
  },

  'econ-003': {
    predict: {
      q: 'Portugal can make both wine and cloth with fewer workers than England. Can both countries gain from trading?',
      options: ['Yes, if each makes what it gives up least to make', 'No, Portugal gains and England loses', 'No, neither gains', 'Only if prices are fixed'],
      answer: 0,
      reveal: 'Ricardo showed that what matters is opportunity cost. England gives up less to make cloth, Portugal less to make wine, so both gain by specialising and trading.',
    },
    parts: [
      {
        title: 'Opportunity cost',
        minutes: 15,
        explain: [
          'The opportunity cost of one unit of a good is how much of the other good the same labour could have made.',
          'With labour needs a (cloth) and b (wine), one wine costs b/a cloth, and one cloth costs a/b wine.',
          'The country with the lower opportunity cost of a good has the comparative advantage in it.',
        ],
        formulas: [['Cost of wine in cloth', '\\frac{L_{\\text{wine}}}{L_{\\text{cloth}}}']],
        examples: [
          ex('England: cloth 100, wine 120. Cost of one wine in cloth?', [['Divide.', '120 / 100'], ['Result.', '1.2 \\text{ cloth}']], '1.2 cloth'),
          ex('Portugal: cloth 90, wine 80. Cost of one wine in cloth?', [['Divide.', '80 / 90'], ['Result.', '\\approx 0.89 \\text{ cloth}']], 'About 0.89 cloth'),
        ],
        practice: [
          pr('England’s cost of one cloth, in wine (to 0.01)?', 100 / 120, '100 / 120.', 'About 0.83.', { tol: 0.01 }),
          pr('Portugal’s cost of one cloth, in wine (to 0.01)?', 90 / 80, '90 / 80.', '1.125.', { tol: 0.01 }),
          ch('Who has the comparative advantage in cloth?', ['England', 'Portugal', 'Both', 'Neither'], 'Lower cost in wine.', '0.83 < 1.125.'),
          ch('Who has the absolute advantage in both goods?', ['Portugal', 'England', 'Neither', 'Both'], 'Fewer workers for each.', '90 < 100 and 80 < 120.'),
        ],
      },
      {
        title: 'Gains from specialising',
        minutes: 15,
        explain: [
          'Without trade, each country makes one unit of each: England uses 220 workers, Portugal 170. The world has 2 cloth and 2 wine.',
          'If England puts all 220 into cloth it makes 2.2 cloth. If Portugal puts all 170 into wine it makes 2.125 wine.',
          'The world now has more of both, and trade can share the extra so that both countries are better off.',
        ],
        formulas: [['Output from labour', '\\text{units} = \\frac{\\text{workers}}{\\text{workers per unit}}']],
        examples: [
          ex('England, 220 workers, all on cloth (100 per unit).', [['Divide.', '220 / 100'], ['Result.', '2.2 \\text{ cloth}']], '2.2 cloth'),
          ex('Portugal, 170 workers, all on wine (80 per unit).', [['Divide.', '170 / 80'], ['Result.', '2.125 \\text{ wine}']], '2.125 wine'),
        ],
        practice: [
          pr('Extra cloth in the world after specialising (vs 2)?', 0.2, '2.2 − 2.', '0.2.'),
          pr('Extra wine (vs 2)?', 0.125, '2.125 − 2.', '0.125.'),
          pr('If Portugal had 240 workers, all on wine, how many units of wine?', 3, '240 / 80.', '3.'),
          ch('The extra output is shared through…', ['Trade', 'Taxes', 'War', 'Inflation'], 'Exchange.', 'Trade.'),
        ],
      },
      {
        title: 'Terms of trade',
        minutes: 15,
        explain: [
          'For both sides to gain, the trading rate must lie between the two opportunity costs.',
          'England gives up 1.2 cloth to make one wine itself; Portugal gives up 0.89 cloth. Any rate between 0.89 and 1.2 cloth per wine helps both.',
          'At a rate of 1 cloth per wine, England gets wine for 1 cloth instead of 1.2, and Portugal gets 1 cloth for a wine that cost it 0.89.',
        ],
        formulas: [['Mutual gain', 'c_{\\text{Portugal}} < \\text{rate} < c_{\\text{England}}']],
        examples: [
          ex('Rate 1 cloth per wine. England’s saving per wine?', [['Own cost minus rate.', '1.2 - 1'], ['Result.', '0.2 \\text{ cloth}']], '0.2 cloth per wine'),
          ex('Portugal’s gain per wine sold at that rate?', [['Rate minus own cost.', '1 - 0.89'], ['Result.', '\\approx 0.11 \\text{ cloth}']], 'About 0.11 cloth per wine'),
        ],
        practice: [
          ch('Which rate (cloth per wine) helps both countries?', ['1.1', '1.5', '0.5', '2'], 'Between 0.89 and 1.2.', '1.1.'),
          pr('At 1.1 cloth per wine, England’s saving per wine?', 0.1, '1.2 − 1.1.', '0.1.', { tol: 0.001 }),
          ch('Who asked Samuelson for a true but non-obvious idea?', ['Stanislaw Ulam', 'Ricardo', 'Keynes', 'Nash'], 'A mathematician.', 'Ulam.'),
          pr('Lower end of the mutual-gain range (Portugal’s cost, to 0.01)?', 80 / 90, '80/90.', '0.89.', { tol: 0.01 }),
        ],
      },
    ],
  },

  'econ-004': {
    predict: {
      q: 'Q = 60L − 2L² castings, each sells for ₱10, wage ₱200 a day. How many workers maximise profit?',
      options: ['10', '15', '5', '20'],
      answer: 0,
      reveal: 'The 10th worker adds 10 × (62 − 40) = ₱220, more than the wage; the 11th adds ₱180, less. So stop at 10.',
    },
    parts: [
      {
        title: 'Marginal product',
        minutes: 15,
        explain: [
          'Marginal product = extra output from one more worker: MP(L) = Q(L) − Q(L − 1).',
          'For Q = 60L − 2L², MP(L) = 62 − 4L. It falls by 4 with every worker: diminishing returns.',
          'Average product (Q/L) hides this: it falls more slowly than the marginal.',
        ],
        formulas: [['Marginal product', 'MP(L) = Q(L) - Q(L-1)'], ['Here', 'MP = 62 - 4L']],
        examples: [
          ex('Q at L = 5?', [['Substitute.', '60(5) - 2(25)'], ['Result.', '300 - 50 = 250']], '250'),
          ex('MP of the 5th worker?', [['Formula.', '62 - 4(5)'], ['Result.', '42']], '42'),
        ],
        practice: [
          pr('Q at L = 10?', 400, '600 − 200.', '400.'),
          pr('MP of the 10th worker?', 22, '62 − 40.', '22.'),
          pr('Average product at L = 10?', 40, '400 / 10.', '40.'),
          pr('At what L does MP first become negative?', 16, '62 − 4L < 0.', 'L > 15.5, so the 16th.'),
        ],
      },
      {
        title: 'Hire to the margin',
        minutes: 15,
        explain: [
          'Each worker brings in price × MP and costs the wage w. Hire while price × MP ≥ w.',
          'With price ₱10: 10(62 − 4L) ≥ w → L ≤ (620 − w)/40.',
          'Profit = price × Q − w × L.',
        ],
        formulas: [['Hiring rule', 'p \\cdot MP \\ge w'], ['Profit', '\\pi = pQ - wL']],
        examples: [
          ex('w = ₱200. Best L?', [['Rule.', '620 - 40L \\ge 200 \\Rightarrow L \\le 10.5'], ['Whole workers.', 'L = 10']], '10 workers'),
          ex('Profit at L = 10, w = 200?', [['Revenue.', '10 \\times 400 = 4000'], ['Minus wages.', '4000 - 2000 = 2000']], '₱2000'),
        ],
        practice: [
          pr('w = ₱280. Best L?', 8, '(620 − 280)/40 = 8.5.', '8.'),
          pr('Profit at L = 8, w = 280?', 1280, '10(480 − 128) − 2240.', '3520 − 2240 = 1280.'),
          pr('w = ₱360. Best L?', 6, '(620 − 360)/40 = 6.5.', '6.'),
          ch('If wages rise, a firm following this rule hires…', ['Fewer workers', 'More workers', 'The same', 'Nobody'], 'Higher bar to clear.', 'Fewer.'),
        ],
      },
      {
        title: 'Marginal utility and value',
        minutes: 10,
        explain: [
          'Marginal utility: the extra satisfaction from one more unit. It usually falls as you have more.',
          'Price reflects marginal, not total, usefulness: water is vital in total but the next litre adds little when water is plentiful.',
          'A buyer keeps buying while marginal utility (in pesos) ≥ price.',
        ],
        formulas: [['Buying rule', 'MU \\ge p']],
        examples: [
          ex('Marginal utilities of mangoes: ₱50, 35, 25, 15, 8. Price ₱20. How many?', [['Count those ≥ 20.', '50, 35, 25'], ['Result.', '3']], '3 mangoes'),
          ex('Price falls to ₱10. How many?', [['Count those ≥ 10.', '50, 35, 25, 15'], ['Result.', '4']], '4 mangoes'),
        ],
        practice: [
          pr('Same mangoes, price ₱30. How many?', 2, '50 and 35.', '2.'),
          pr('Total utility of the first 3 mangoes (₱)?', 110, '50 + 35 + 25.', '110.'),
          ch('In which year did Jevons and Menger publish?', ['1871', '1874', '1776', '1890'], 'Walras followed in 1874.', '1871.'),
          ch('The water and diamonds puzzle is called…', ['The paradox of value', 'The prisoner’s dilemma', 'The cobweb', 'The multiplier'], 'Smith noticed it.', 'Paradox of value.'),
        ],
      },
    ],
  },

  'econ-005': {
    predict: {
      q: 'Prices rise 7% a year. Roughly how long until ₱1000 buys only half as much?',
      options: ['About 10 years', 'About 7 years', 'About 14 years', 'About 50 years'],
      answer: 0,
      reveal: 'Rule of 70: 70 / 7 = 10 years. Check: 1.07¹⁰ ≈ 1.97, so ₱1000 buys about ₱508 of today’s goods.',
    },
    parts: [
      {
        title: 'Compounding prices',
        minutes: 15,
        explain: [
          'If prices rise r per year, after t years they are (1 + r)^t times higher.',
          'Buying power of money falls by the same factor: ₱1000 then buys 1000/(1 + r)^t of today’s goods.',
          'The rule of 70: time to double prices (or halve buying power) ≈ 70 / (rate in %).',
        ],
        formulas: [['Price level', 'P_t = P_0 (1 + r)^t'], ['Rule of 70', 't_{1/2} \\approx \\frac{70}{100r}']],
        examples: [
          ex('₱1000 at 3% for 10 years. Buying power?', [['Factor.', '1.03^{10} \\approx 1.344'], ['Divide.', '1000 / 1.344 \\approx 744']], 'About ₱744'),
          ex('Halving time at 5%?', [['Rule of 70.', '70 / 5'], ['Result.', '14 \\text{ years}']], 'About 14 years'),
        ],
        practice: [
          pr('Halving time at 2% (rule of 70)?', 35, '70 / 2.', '35 years.'),
          pr('Price factor after 10 years at 4% (to 0.01)?', 1.04 ** 10, '1.04¹⁰.', 'About 1.48.', { tol: 0.01 }),
          pr('Buying power of ₱1000 after 5 years at 10% (₱, to the nearest peso)?', 1000 / 1.1 ** 5, '1000 / 1.1⁵.', 'About ₱621.', { tol: 1 }),
          pr('A ₱50 snack rises 6% a year. Price in 3 years (₱, to 0.01)?', 50 * 1.06 ** 3, '50 × 1.06³.', 'About ₱59.55.', { tol: 0.01 }),
        ],
      },
      {
        title: 'The quantity equation',
        minutes: 15,
        explain: [
          'Fisher’s equation MV = PT: money stock × how often it is spent = price level × amount of trade.',
          'If V and T are steady, P grows at the same rate as M.',
          'In growth rates: inflation ≈ money growth + velocity growth − real growth.',
        ],
        formulas: [['Quantity equation', 'MV = PT'], ['Growth form', '\\pi \\approx g_M + g_V - g_T']],
        examples: [
          ex('M = 1000, V = 5, T = 2500. P?', [['Solve for P.', 'P = MV/T'], ['Substitute.', '5000 / 2500 = 2']], 'P = 2'),
          ex('Money grows 10%, trade 3%, V steady. Inflation?', [['Growth form.', '10 + 0 - 3'], ['Result.', '7\\%']], 'About 7%'),
        ],
        practice: [
          pr('M = 2000, V = 4, T = 4000. P?', 2, '8000 / 4000.', '2.'),
          pr('If M doubles to 4000 with V and T unchanged, P?', 4, '16000 / 4000.', '4.'),
          pr('Money grows 15%, real trade 5%, V steady. Inflation (%)?', 10, '15 − 5.', '10%.'),
          ch('Who blamed American silver for rising prices in 1568?', ['Jean Bodin', 'Irving Fisher', 'Adam Smith', 'Keynes'], 'A French thinker.', 'Bodin.'),
        ],
      },
      {
        title: 'Hyperinflation and targets',
        minutes: 10,
        explain: [
          'Hyperinflation: prices rising more than about 50% a month. Germany in 1923 reached about 4.2 trillion marks per US dollar.',
          'Monthly rates compound fast: 50% a month is 1.5¹² ≈ 130 times a year.',
          'Central banks such as the Bangko Sentral ng Pilipinas aim for low, steady inflation so that planning is easy.',
        ],
        formulas: [['Yearly from monthly', '(1 + m)^{12} - 1']],
        examples: [
          ex('50% a month for a year. Price factor?', [['Compound.', '1.5^{12}'], ['Result.', '\\approx 130']], 'About 130 times'),
          ex('Prices double every month. Factor after a year?', [['Compound.', '2^{12}'], ['Result.', '4096']], '4096 times'),
        ],
        practice: [
          pr('Prices rise 10% a month. Yearly factor (to 0.01)?', 1.1 ** 12, '1.1¹².', 'About 3.14.', { tol: 0.01 }),
          pr('Prices rise 3% a month. Yearly factor (to 0.01)?', 1.03 ** 12, '1.03¹².', 'About 1.43, so about 43% a year.', { tol: 0.01 }),
          ch('The Japanese-issued wartime money in the Philippines was nicknamed…', ['Mickey Mouse money', 'Silver pesos', 'Greenbacks', 'Marks'], '1942–45.', 'Mickey Mouse money.'),
          pr('Prices triple every month. Factor after 4 months?', 81, '3⁴.', '81.'),
        ],
      },
    ],
  },

  'econ-006': {
    predict: {
      q: 'The government spends ₱100. Everyone who receives money spends 80% of it again. Roughly how much total spending results?',
      options: ['₱500', '₱180', '₱100', '₱800'],
      answer: 0,
      reveal: '100 + 80 + 64 + … = 100 / (1 − 0.8) = ₱500. The multiplier is 5.',
    },
    parts: [
      {
        title: 'The geometric series',
        minutes: 15,
        explain: [
          'Round 1 is ₱100, round 2 is 100c, round 3 is 100c², and so on.',
          'The sum of n rounds is 100(1 − cⁿ)/(1 − c); as n grows it approaches 100/(1 − c).',
          'The multiplier k = 1/(1 − c).',
        ],
        formulas: [['Sum of n rounds', 'S_n = 100\\,\\frac{1 - c^n}{1 - c}'], ['Multiplier', 'k = \\frac{1}{1 - c}']],
        examples: [
          ex('c = 0.5, 3 rounds.', [['Rounds.', '100 + 50 + 25'], ['Sum.', '175']], '₱175'),
          ex('c = 0.75. Multiplier?', [['Formula.', '1 / 0.25'], ['Result.', '4']], '4'),
        ],
        practice: [
          pr('c = 0.9. Multiplier?', 10, '1 / 0.1.', '10.', { tol: 0.001 }),
          pr('c = 0.6. Multiplier?', 2.5, '1 / 0.4.', '2.5.', { tol: 0.001 }),
          pr('c = 0.5, 4 rounds starting at ₱100. Total?', 187.5, '100 + 50 + 25 + 12.5.', '187.5.'),
          pr('What c gives a multiplier of 5?', 0.8, '1/(1 − c) = 5.', '0.8.', { tol: 0.001 }),
        ],
      },
      {
        title: 'Leaks: saving, taxes, imports',
        minutes: 15,
        explain: [
          'Every peso not spent at home in the next round is a leak: saved, taxed or spent on imports.',
          'If s, t and m are the shares that leak, then c = 1 − (s + t + m) and k = 1/(s + t + m).',
          'The Philippines imports much of what it buys, so its real multiplier is smaller than the simple formula suggests.',
        ],
        formulas: [['With leaks', 'k = \\frac{1}{s + t + m}']],
        examples: [
          ex('Leaks: save 0.1, tax 0.15, imports 0.25. Multiplier?', [['Total leak.', '0.1 + 0.15 + 0.25 = 0.5'], ['k.', '1 / 0.5 = 2']], '2'),
          ex('₱1 billion spent with k = 2. Total income?', [['Multiply.', '1 \\times 2'], ['Result.', '2 \\text{ billion pesos}']], '₱2 billion'),
        ],
        practice: [
          pr('Leaks 0.1 + 0.1 + 0.2. Multiplier?', 2.5, '1 / 0.4.', '2.5.', { tol: 0.001 }),
          pr('₱500 million with k = 2.5. Total (in millions)?', 1250, '500 × 2.5.', '1250.'),
          pr('If imports rise so leaks total 0.8, multiplier?', 1.25, '1 / 0.8.', '1.25.', { tol: 0.001 }),
          ch('Which raises the multiplier?', ['Spending a larger share at home', 'Saving more', 'Buying more imports', 'Higher taxes'], 'Fewer leaks.', 'Spend at home.'),
        ],
      },
      {
        title: 'The Depression and Keynes',
        minutes: 10,
        explain: [
          'After 1929, spending collapsed. US unemployment peaked near 25% in 1933.',
          'Kahn (1931) and Keynes (1936) argued that public spending in a slump is multiplied as it is re-spent.',
          'Economists still argue over the size of real multipliers; estimates often fall between about 0.5 and 2.',
        ],
        formulas: [['Change in income', '\\Delta Y = k \\, \\Delta G']],
        examples: [
          ex('ΔG = ₱10 billion, k = 1.5. ΔY?', [['Multiply.', '10 \\times 1.5'], ['Result.', '15 \\text{ billion pesos}']], '₱15 billion'),
          ex('ΔY = ₱8 billion from ΔG = ₱5 billion. k?', [['Divide.', '8 / 5'], ['Result.', '1.6']], '1.6'),
        ],
        practice: [
          pr('ΔG = ₱20 billion, k = 0.8. ΔY (billions)?', 16, '20 × 0.8.', '16.'),
          pr('ΔY = 30 from ΔG = 12. k?', 2.5, '30 / 12.', '2.5.', { tol: 0.001 }),
          ch('Who first worked out the multiplier?', ['Richard Kahn', 'Adam Smith', 'Irving Fisher', 'John Nash'], '1931.', 'Kahn.'),
          ch('Keynes’s main book appeared in…', ['1936', '1929', '1944', '1890'], 'The General Theory.', '1936.'),
        ],
      },
    ],
  },

  'econ-007': {
    predict: {
      q: 'In one round of the prisoner’s dilemma (CC 3/3, DD 1/1, lone defector 5, cooperator 0), what is each player’s best move whatever the other does?',
      options: ['Defect', 'Cooperate', 'It depends on the other', 'Toss a coin'],
      answer: 0,
      reveal: 'If they cooperate, defecting gives 5 > 3; if they defect, defecting gives 1 > 0. So both defect and get 1 each, though both cooperating would give 3.',
    },
    parts: [
      {
        title: 'Payoff tables and best replies',
        minutes: 15,
        explain: [
          'A payoff table lists what each player gets for each pair of choices.',
          'A best reply is the choice that gives you the most, given the other player’s choice.',
          'A Nash equilibrium is a pair of choices that are best replies to each other.',
        ],
        formulas: [['Dilemma ordering', 'T > R > P > S \\quad (5 > 3 > 1 > 0)']],
        examples: [
          ex('They cooperate. Your best reply?', [['Compare.', 'D: 5,\\ C: 3'], ['Choose.', 'D']], 'Defect'),
          ex('They defect. Your best reply?', [['Compare.', 'D: 1,\\ C: 0'], ['Choose.', 'D']], 'Defect'),
        ],
        practice: [
          ch('The Nash equilibrium of the one-round dilemma is…', ['Both defect', 'Both cooperate', 'One of each', 'None'], 'Best replies to each other.', 'DD.'),
          pr('Total points for the pair if both cooperate?', 6, '3 + 3.', '6.'),
          pr('Total for the pair if both defect?', 2, '1 + 1.', '2.'),
          pr('Total if one defects and one cooperates?', 5, '5 + 0.', '5.'),
        ],
      },
      {
        title: 'Repeated play',
        minutes: 15,
        explain: [
          'When the game repeats, today’s choice affects tomorrow’s: defecting can be punished.',
          'Tit for tat cooperates first, then copies the other player’s last move. It is nice, retaliates, forgives, and is easy to read.',
          'Against always-defect over n rounds, tit for tat scores 0 + (n − 1).',
        ],
        formulas: [['TFT vs always defect', 'S = 0 + (n - 1) \\times 1'], ['TFT vs TFT', 'S = 3n']],
        examples: [
          ex('Tit for tat vs tit for tat, 10 rounds.', [['Every round CC.', '3 \\times 10'], ['Result.', '30']], '30 each'),
          ex('Always defect vs tit for tat, 10 rounds. Defector’s score?', [['Round 1.', '5'], ['Then DD.', '5 + 9 \\times 1 = 14']], '14'),
        ],
        practice: [
          pr('Tit for tat vs always defect, 10 rounds. TFT’s score?', 9, '0 + 9.', '9.'),
          pr('Always cooperate vs always defect, 10 rounds. Cooperator’s score?', 0, 'Always the sucker.', '0.'),
          pr('Always defect vs always cooperate, 10 rounds. Defector’s score?', 50, '5 × 10.', '50.'),
          pr('Tit for tat vs always cooperate, 6 rounds. TFT’s score?', 18, '3 × 6.', '18.'),
        ],
      },
      {
        title: 'History and uses',
        minutes: 10,
        explain: [
          'Von Neumann and Morgenstern (1944) founded game theory; Nash (1950) proved equilibria exist; Flood and Dresher devised the dilemma and Tucker named it.',
          'Axelrod’s tournaments (around 1980) showed tit for tat thriving in repeated play.',
          'Uses: price wars, arms races, climate deals, and suppliers deciding output.',
        ],
        formulas: [['Cooperation pays when', '\\text{future rounds matter enough}']],
        examples: [
          ex('Two suppliers cooperate (3 each) for 20 years instead of both defecting (1 each). Extra per supplier?', [['Difference per year.', '3 - 1 = 2'], ['Over 20 years.', '40']], '40 points'),
          ex('Nash’s age when he proved his theorem in 1950, if born in 1928?', [['Subtract.', '1950 - 1928'], ['Result.', '\\approx 21\\text{–}22']], 'About 21'),
        ],
        practice: [
          ch('Who named the prisoner’s dilemma?', ['Albert Tucker', 'John Nash', 'Merrill Flood', 'Robert Axelrod'], 'A Princeton mathematician.', 'Tucker.'),
          ch('Who wrote Theory of Games and Economic Behavior (1944)?', ['Von Neumann and Morgenstern', 'Nash and Tucker', 'Kahneman and Tversky', 'Smith and Ricardo'], 'A mathematician and an economist.', 'Von Neumann and Morgenstern.'),
          ch('Whose strategy won Axelrod’s tournaments?', ['Anatol Rapoport’s tit for tat', 'Nash’s', 'Always defect', 'Random play'], 'The simplest entry.', 'Rapoport.'),
          pr('In which year did Nash share the Nobel memorial prize?', 1994, 'With Harsanyi and Selten.', '1994.'),
        ],
      },
    ],
  },

  'econ-008': {
    predict: {
      q: 'A coin toss: heads win ₱1500, tails lose ₱1000. On average it pays ₱250. Do most people accept?',
      options: ['No, most refuse', 'Yes, almost everyone accepts', 'Exactly half accept', 'Only if they are rich'],
      answer: 0,
      reveal: 'Most refuse: a loss feels about twice as big as an equal gain, so the possible ₱1000 loss outweighs the ₱1500 win.',
    },
    parts: [
      {
        title: 'The value curve',
        minutes: 15,
        explain: [
          'Prospect theory measures outcomes as gains or losses from where you are now.',
          'For gains v(x) = x^0.88: each extra peso pleases a little less. For losses v(x) = −2.25(−x)^0.88: steeper.',
          'A bet feels worth taking only if the chance-weighted sum of v is above zero.',
        ],
        formulas: [['Gains', 'v(x) = x^{0.88}'], ['Losses', 'v(x) = -2.25\\,(-x)^{0.88}']],
        examples: [
          ex('Value of a ₱1000 gain?', [['Power.', '1000^{0.88}'], ['Result.', '\\approx 437']], 'About 437'),
          ex('Value of a ₱1000 loss?', [['Formula.', '-2.25 \\times 437'], ['Result.', '\\approx -982']], 'About −982'),
        ],
        practice: [
          pr('v(500) (to the nearest whole number)?', v88(500), '500^0.88.', 'About 236.', { tol: 1 }),
          pr('v(−500) (to the nearest whole number)?', v88(-500), '−2.25 × 500^0.88.', 'About −531.', { tol: 1.5 }),
          pr('Feeling of a 50:50 bet: win ₱2000 or lose ₱1000 (to the nearest whole number)?', 0.5 * v88(2000) + 0.5 * v88(-1000), '0.5 v(2000) + 0.5 v(−1000).', '0.5 × 803.6 + 0.5 × (−982.2) ≈ −89: still feels slightly bad, even though the bet gains ₱500 on average.', { tol: 1.5 }),
          ch('A loss compared with an equal gain feels…', ['About 2.25 times as strong', 'The same', 'Half as strong', 'Ten times as strong'], 'Loss aversion.', '2.25.'),
        ],
      },
      {
        title: 'Framing',
        minutes: 15,
        explain: [
          'The same choice can feel different when described as a gain or as a loss: the framing effect.',
          'Kahneman and Tversky found people take safe options when choices are framed as gains, and gamble when they are framed as losses.',
          'A ₱100 surcharge feels worse than missing a ₱100 discount, though the money is the same.',
        ],
        formulas: [['Same money, different frame', '\\text{price} + 100 \\ \\equiv \\ (\\text{price} + 100) - 0']],
        examples: [
          ex('Card price ₱1050, cash ₱1000. Framed as a "cash discount", is paying by card a loss?', [['Reference.', '1050'], ['Card pays the reference.', '\\text{no loss felt}']], 'No: it feels like missing a gain'),
          ex('Same prices framed as a "card surcharge"?', [['Reference.', '1000'], ['Card pays 50 more.', '\\text{a loss of 50 pesos}']], 'Yes: it feels like a loss'),
        ],
        practice: [
          ch('Which frame makes card payment feel worse?', ['A ₱50 card surcharge', 'A ₱50 cash discount', 'Both the same', 'Neither'], 'Loss from the reference.', 'The surcharge.'),
          ch('People framed with losses tend to…', ['Take more risks', 'Take fewer risks', 'Decide at random', 'Not decide'], 'To avoid a sure loss.', 'Gamble more.'),
          pr('In what year was the prospect theory paper published?', 1979, 'In Econometrica.', '1979.'),
          pr('What loss (₱, to the nearest 10) feels as bad as a ₱1000 gain feels good?', 1000 / 2.25 ** (1 / 0.88), '1000 / 2.25^(1/0.88).', 'About ₱398.', { tol: 10 }),
        ],
      },
      {
        title: 'Bounded rationality and nudges',
        minutes: 10,
        explain: [
          'Herbert Simon: people satisfice, stopping at the first option that is good enough.',
          'Thaler’s nudges change the default without forcing anyone, such as enrolling workers in savings automatically with a choice to leave.',
          'Defaults matter because doing nothing is easy: participation is often far higher when joining is automatic.',
        ],
        formulas: [['Satisficing', '\\text{choose the first option with value} \\ge \\text{aspiration}']],
        examples: [
          ex('Options score 6, 8, 9, 7 in the order you see them; aspiration 7. Satisficer picks?', [['First ≥ 7.', '8'], ['Result.', '\\text{the second option}']], 'The second (score 8)'),
          ex('A maximiser with the same options picks?', [['Highest.', '9'], ['Result.', '\\text{the third option}']], 'The third (score 9)'),
        ],
        practice: [
          pr('Scores 4, 7, 5, 9, aspiration 6. Score of the satisficer’s pick?', 7, 'First ≥ 6.', '7.'),
          pr('Same list. Score of the maximiser’s pick?', 9, 'Highest.', '9.'),
          ch('Who received the 2002 Nobel memorial prize for this work?', ['Daniel Kahneman', 'Amos Tversky', 'Richard Thaler', 'Herbert Simon'], 'Tversky had died in 1996.', 'Kahneman.'),
          ch('Automatic enrolment in savings is an example of…', ['A nudge', 'A tax', 'A ban', 'Inflation'], 'Changes the default.', 'Nudge.'),
        ],
      },
    ],
  },

  'econ-009': {
    predict: {
      q: 'Demand P = 100 − Q. Producers set next year’s output to last year’s price minus 20. Output starts at 20 (below the equilibrium of 40). What happens over the years?',
      options: ['It swings 20 above and below 40 forever', 'It settles at 40 next year', 'It grows without limit', 'It stays at 20'],
      answer: 0,
      reveal: 'With k = 1: Q₁ = 80 − 20 = 60, then P = 40, Q₂ = 20, and so on. The gap flips sign each year without shrinking.',
    },
    parts: [
      {
        title: 'Stepping the cobweb',
        minutes: 15,
        explain: [
          'Each year: buyers set the price from this year’s output, P = 100 − Q. Producers then set next year’s output from that price, Q = k(P − 20).',
          'Equilibrium: Q* = k(80 − Q*) → Q* = 80k/(1 + k).',
          'The gap from equilibrium is multiplied by −k each year.',
        ],
        formulas: [['Price', 'P_t = 100 - Q_t'], ['Next output', 'Q_{t+1} = k\\,(P_t - 20)'], ['Gap', 'g_{t+1} = -k\\,g_t']],
        examples: [
          ex('k = 0.5, Q₀ = 20. Q₁?', [['Price.', 'P_0 = 80'], ['Next output.', '0.5 \\times 60 = 30']], '30'),
          ex('Equilibrium output for k = 0.5?', [['Formula.', '80(0.5)/1.5'], ['Result.', '\\approx 26.7']], 'About 26.7'),
        ],
        practice: [
          pr('k = 0.5, Q₁ = 30. P₁?', 70, '100 − 30.', '70.'),
          pr('Then Q₂?', 25, '0.5 × (70 − 20).', '25.'),
          pr('Equilibrium output for k = 1?', 40, '80/2.', '40.'),
          pr('Equilibrium output for k = 0.6?', 30, '48 / 1.6.', '30.'),
        ],
      },
      {
        title: 'Damped or explosive',
        minutes: 15,
        explain: [
          'If k < 1 the swings shrink (damped); if k > 1 they grow (explosive); k = 1 swings forever.',
          'k compares how strongly producers react to how strongly buyers react: here buyers’ slope is 1.',
          'After n years the gap is g₀(−k)ⁿ.',
        ],
        formulas: [['Gap after n years', 'g_n = g_0(-k)^n']],
        examples: [
          ex('g₀ = −20, k = 0.5. g₃?', [['Power.', '(-0.5)^3 = -0.125'], ['Multiply.', '-20 \\times -0.125 = 2.5']], '+2.5'),
          ex('g₀ = −20, k = 1.2. g₂?', [['Power.', '1.44'], ['Multiply.', '-28.8']], '−28.8'),
        ],
        practice: [
          pr('g₀ = 10, k = 0.8. g₂ (to 0.01)?', 10 * 0.64, '10 × 0.64.', '6.4.', { tol: 0.01 }),
          pr('g₀ = −20, k = 0.8. g₃ (to 0.01)?', -20 * (-0.8) ** 3, '−20 × (−0.512).', '10.24.', { tol: 0.01 }),
          ch('k = 1.3. The swings…', ['Grow', 'Shrink', 'Stay the same', 'Stop'], 'Compare with 1.', 'Explosive.'),
          pr('With k = 0.5, after how many years is the gap first below 1/10 of its start?', 4, '0.5ⁿ < 0.1.', '0.5⁴ = 0.0625: 4 years.'),
        ],
      },
      {
        title: 'Nickel in the real world',
        minutes: 10,
        explain: [
          'New mines and processing plants take years, so metal supply reacts to past prices like the cobweb.',
          'Indonesia, the largest nickel producer, banned raw ore exports from 2020; the Philippines is among the largest ore exporters.',
          'In March 2022 nickel briefly topped US$100,000 a tonne and the London Metal Exchange suspended trading.',
        ],
        formulas: [['Percent change', '\\frac{P_{\\text{new}} - P_{\\text{old}}}{P_{\\text{old}}} \\times 100\\%']],
        examples: [
          ex('Price goes from $30,000 to $100,000 a tonne. Percent rise?', [['Change.', '70\\,000 / 30\\,000'], ['Percent.', '\\approx 233\\%']], 'About 233%'),
          ex('A plant buys 500 t at a $10,000/t higher price. Extra cost?', [['Multiply.', '500 \\times 10\\,000'], ['Result.', '\\$5 \\text{ million}']], '$5 million'),
        ],
        practice: [
          pr('Price from $20,000 to $25,000. Percent rise?', 25, '5000/20000.', '25%.'),
          pr('Extra cost of 200 t at $5,000/t more (in $ thousands)?', 1000, '200 × 5.', '1000 thousand = $1 million.'),
          ch('Which country banned raw nickel ore exports in 2020?', ['Indonesia', 'The Philippines', 'Canada', 'Russia'], 'The largest producer.', 'Indonesia.'),
          ch('Who set out the cobweb theorem in 1938?', ['Mordecai Ezekiel', 'Alfred Marshall', 'Irving Fisher', 'John Nash'], 'Agricultural economist.', 'Ezekiel.'),
        ],
      },
    ],
  },
};
