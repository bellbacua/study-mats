// Math Plus (CEE 200): foundations for engineering mathematics.
const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const ALGEBRA = {
  'math-001': {
    predict: {
      q: 'An arrow ends at −3 on the number line. You multiply it by −2, then add nothing. Where will its tip land: farther left, at zero, or across on the right?',
      options: ['−6', '+6', '−1', '0'],
      answer: 1,
      reveal: 'It lands at +6. The 2 doubles its length, while the minus sign turns it round zero: a left-pointing arrow becomes a right-pointing one.',
    },
    parts: [
      {
        title: 'Positions and journeys on a number line', minutes: 20,
        explain: [
          'Zero is a reference point. Positive numbers lie to its right and negative numbers to its left. A temperature below zero is a position on this line, rather than a missing temperature.',
          'Adding a positive number means moving right. Adding a negative number means moving left. Keep the starting position separate from the journey: a positive journey can still finish at a negative position.',
          'The absolute value of a number is its distance from zero. Distance has no direction, so opposite positions have the same absolute value.',
        ],
        formulas: [['Addition as travel', '\\text{finish} = \\text{start} + \\text{change}'], ['Distance from zero', '|-a|=|a|']],
        examples: [
          ex('Start at −4 and move 7 units right. Where do you finish?', [['Write rightward travel as positive.', '-4+7'], ['Move past zero to the right.', '-4+7=3']], '3'),
          ex('A sample is at 8 °C and cools by 13 °C. Find its final temperature.', [['Cooling is a negative change.', '8+(-13)'], ['Move left past zero.', '8-13=-5']], '−5 °C'),
        ],
        practice: [
          pr('Start at −6 and add 2. Where do you finish?', -4, 'Move two places right.', '−6 + 2 = −4.'),
          pr('Find 3 + (−8).', -5, 'The second journey goes left.', '3 − 8 = −5.'),
          pr('A sample starts at −2 °C and cools by 5 °C. Final temperature in °C?', -7, 'Cooling means subtracting.', '−2 − 5 = −7 °C.'),
          pr('Find −9 + 14 + (−3).', 2, 'Follow the journeys in order.', '−9 + 14 = 5, then 5 − 3 = 2.'),
        ],
      },
      {
        title: 'Subtracting means adding the opposite', minutes: 20,
        explain: [
          'Subtraction undoes addition. To subtract a number, add its opposite. The opposite of a negative number is positive, so subtracting a negative moves you right.',
          'A change is final position minus initial position. This works even when both positions are below zero. Write brackets round a negative initial value so that both minus signs remain visible.',
        ],
        formulas: [['Subtract the opposite', 'a-b=a+(-b)'], ['Change', '\\Delta T=T_{\\text{final}}-T_{\\text{initial}}']],
        examples: [
          ex('Find the temperature rise from −7 °C to −4 °C.', [['Final minus initial.', '\\Delta T=-4-(-7)'], ['Replace subtracting a negative by adding.', '-4+7=3']], '3 °C'),
          ex('Evaluate −8 − 3.', [['Subtracting positive 3 means adding negative 3.', '-8+(-3)'], ['Travel farther left.', '-8-3=-11']], '−11'),
        ],
        practice: [
          pr('Find 5 − (−2).', 7, 'Add the opposite of −2.', '5 + 2 = 7.'),
          pr('Find −3 − (−8).', 5, 'Rewrite the double minus.', '−3 + 8 = 5.'),
          pr('A sample moves from −5 °C to −12 °C. Find final minus initial, in °C, including its sign.', -7, 'Subtract the starting temperature, keeping its negative sign in brackets.', '−12 − (−5) = −12 + 5 = −7 °C.'),
          pr('Evaluate −6 − (−4) − 7.', -9, 'First undo the negative subtraction.', '−6 + 4 − 7 = −2 − 7 = −9.'),
        ],
      },
      {
        title: 'Stretching, flipping and dividing', minutes: 20,
        explain: [
          'Multiplication changes an arrow by a scale factor. The size of the factor stretches or shrinks its length. A negative factor also reverses its direction.',
          'Two reversals bring the direction back. That is why two negative factors give a positive product. Division asks which factor would produce the starting number, so it follows the same sign rules. Division by zero has no defined answer.',
        ],
        formulas: [['Two reversals', '(-a)(-b)=ab'], ['One reversal', '(-a)b=-(ab)']],
        examples: [
          ex('Multiply −3 by −2.', [['Double the length of the arrow.', '3\\times2=6'], ['Reverse its leftward direction.', '(-3)(-2)=6']], '6'),
          ex('Evaluate 18 ÷ (−3).', [['Ignore the signs to find the size.', '18\\div3=6'], ['A negative times a negative must give positive 18.', '(-3)(-6)=18']], '−6'),
        ],
        practice: [
          pr('Find (−4) × 5.', -20, 'One negative factor gives one reversal.', '4 × 5 = 20, with a negative sign: −20.'),
          pr('Find (−6) × (−3).', 18, 'Count the reversals.', 'Two negatives give a positive: 6 × 3 = 18.'),
          pr('Find (−24) ÷ (−8).', 3, 'Which number multiplied by −8 gives −24?', '(−8) × 3 = −24, so the quotient is 3.'),
          pr('Find (−2)(−3)(−4).', -24, 'Multiply the first pair, then the last factor.', '(−2)(−3) = 6; 6(−4) = −24.'),
        ],
      },
      {
        title: 'One agreed order for a calculation', minutes: 25,
        explain: [
          'Brackets tell you which calculation belongs together. Do those first. Powers, such as a square meaning a number multiplied by itself, come next. Then do multiplication and division, and finally addition and subtraction.',
          'Multiplication and division have equal priority: work left to right. Addition and subtraction also tie. For a temperature schedule, calculate each rate times its duration before adding the temperature changes.',
        ],
        formulas: [['Order', '\\text{brackets}\\;\\to\\;\\text{powers}\\;\\to\\;\\times,\\div\\;\\to\\;+, -']],
        examples: [
          ex('Evaluate 24 ÷ 4 × 2.', [['Division and multiplication tie; start on the left.', '24\\div4=6'], ['Then multiply.', '6\\times2=12']], '12'),
          ex('Evaluate 36 ÷ 6 × (−2) − (4 − 10).', [['Do the bracket.', '4-10=-6'], ['Divide and multiply from left to right.', '(36\\div6)(-2)=-12'], ['Subtract the bracket result.', '-12-(-6)=-6']], '−6'),
        ],
        practice: [
          pr('A sample starts at −20 °C and warms by 6 °C per minute for 5 minutes. Final temperature in °C?', 10, 'Multiply the rate by the time first.', '−20 + 6 × 5 = −20 + 30 = 10 °C.'),
          pr('Evaluate 12 − 3 × 5.', -3, 'Multiplication comes before subtraction.', '12 − 15 = −3.'),
          pr('Evaluate (8 − 14) ÷ 2.', -3, 'Finish the bracket first.', '(8 − 14)/2 = −6/2 = −3.'),
          pr('Evaluate 18 ÷ 3 × 2 − 5.', 7, 'Work left to right through division and multiplication.', '18/3 = 6; 6 × 2 − 5 = 12 − 5 = 7.'),
        ],
      },
    ],
  },
  'math-002': {
    predict: {
      q: 'Shade 2/3 of a sheet vertically and 3/4 horizontally. If only the overlap counts, will it cover more than either shaded region, exactly half the sheet, or something else?',
      options: ['17/12 of the sheet', 'Exactly half', '2/7 of the sheet', 'All of the smaller region, 2/3'], answer: 1,
      reveal: 'Exactly half. A grid with 3 columns and 4 rows has 12 equal cells; the overlap covers 2 × 3 = 6 of them. Multiplying by a fraction below one makes an amount smaller.',
    },
    parts: [
      {
        title: 'Same amount, different slices', minutes: 20,
        explain: [
          'A fraction names equal pieces of a whole. The denominator, on the bottom, tells how many equal pieces make the whole. The numerator, on top, tells how many pieces you take. Always say what the whole is.',
          'Multiplying the top and bottom by the same positive number cuts every piece into smaller pieces without changing the amount. Simplifying reverses that process by dividing both by a common factor.',
        ],
        formulas: [['Equivalent fractions', '\\frac{a}{b}=\\frac{ka}{kb}\\quad(b\\ne0,\\;k\\ne0)']],
        examples: [
          ex('Simplify 6/8 to lowest terms.', [['Divide both numbers by 2.', '\\frac68=\\frac34'], ['Check that top and bottom share no whole-number factor greater than one.', '']], '3/4'),
          ex('How many of 20 equal cells represent 3/5 of a sheet?', [['Split each fifth into four smaller pieces.', '\\frac35=\\frac{3\\times4}{5\\times4}'], ['Count the shaded cells.', '\\frac{12}{20}']], '12 cells'),
        ],
        practice: [
          pr('Simplify 4/10 to lowest terms. What is the numerator?', 2, 'Divide top and bottom by their greatest common factor.', '4/10 = 2/5, so the numerator is 2.'),
          pr('Simplify 9/12 to lowest terms. What is the denominator?', 4, 'Simplify by a common factor first.', '9/12 = 3/4, so the denominator is 4.'),
          pr('How many of 24 equal cells represent 7/8 of a sheet?', 21, 'Find how many cells make one eighth.', '24/8 = 3 cells per eighth; 7 × 3 = 21.'),
          pr('Simplify 12/18 to lowest terms. What is the numerator?', 2, 'Divide top and bottom by their greatest common factor.', '12/18 = 2/3, so the numerator is 2.'),
        ],
      },
      {
        title: 'Adding and subtracting equal-sized pieces', minutes: 25,
        explain: [
          'You can count pieces together only when their sizes match. To add thirds and quarters, cut them into twelfths. This is a common denominator: a shared piece size.',
          'Once the denominators match, add or subtract only the numerators. A total larger than one is allowed. It simply contains more than one whole sheet, litre or batch.',
        ],
        formulas: [['Common pieces', '\\frac ab+\\frac cd=\\frac{ad+bc}{bd}'], ['Subtract', '\\frac ab-\\frac cd=\\frac{ad-bc}{bd}']],
        examples: [
          ex('Add 1/3 and 1/4.', [['Rewrite both in twelfths.', '\\frac13=\\frac4{12},\\quad\\frac14=\\frac3{12}'], ['Add the pieces.', '\\frac4{12}+\\frac3{12}=\\frac7{12}']], '7/12'),
          ex('Subtract 3/8 from 5/6.', [['Use twenty-fourths.', '\\frac56=\\frac{20}{24},\\quad\\frac38=\\frac9{24}'], ['Subtract the numerators.', '\\frac{20-9}{24}=\\frac{11}{24}']], '11/24'),
        ],
        practice: [
          pr('Add 1/2 + 1/4 and simplify. What is the numerator?', 3, 'Rewrite the half in quarters.', '2/4 + 1/4 = 3/4, so the numerator is 3.'),
          pr('Subtract 2/3 − 1/6 and simplify. What is the numerator?', 1, 'Use sixths, then reduce the fraction.', '4/6 − 1/6 = 3/6 = 1/2, so the numerator is 1.'),
          pr('Add 3/4 + 5/8 and give the numerator of the simplified fraction, leaving it as one fraction.', 11, 'The answer may be more than one whole.', '6/8 + 5/8 = 11/8, so the numerator is 11.'),
          pr('Subtract 7/10 − 1/4 and simplify. What is the numerator?', 9, 'Use twentieths.', '14/20 − 5/20 = 9/20, so the numerator is 9.'),
        ],
      },
      {
        title: 'Taking a fraction and sharing into portions', minutes: 25,
        explain: [
          'Multiplying fractions means taking a part of a part. On a sheet, one fraction shades columns and the other shades rows. The overlap is the product.',
          'Division asks how many portions fit. A portion smaller than one whole can fit several times, so division can make the answer bigger. Multiply by the reciprocal of the divisor: exchange its top and bottom. The divisor must not be zero.',
        ],
        formulas: [['Product', '\\frac ab\\times\\frac cd=\\frac{ac}{bd}'], ['Division', '\\frac ab\\div\\frac cd=\\frac ab\\times\\frac dc']],
        examples: [
          ex('Find 2/3 of 3/4 of a sheet.', [['Multiply the two shaded counts and the two total counts.', '\\frac23\\times\\frac34=\\frac6{12}'], ['Simplify.', '\\frac6{12}=\\frac12']], '1/2 of the sheet'),
          ex('How many 9/16-litre portions fit in 3/4 litre, allowing part of a portion?', [['Multiply by the reciprocal.', '\\frac34\\div\\frac9{16}=\\frac34\\times\\frac{16}9'], ['Simplify the result.', '\\frac{48}{36}=\\frac43']], '4/3 portions'),
        ],
        practice: [
          pr('Find 1/2 × 3/5 and simplify. What is the numerator?', 3, 'Multiply tops and bottoms.', 'The product is 3/10, so the numerator is 3.'),
          pr('How many 1/6-litre portions fit in 2/3 litre?', 4, 'Divide the total by one portion.', '(2/3) × 6 = 4.'),
          pr('Find 5/8 × 4/5 and simplify. What is the numerator?', 1, 'Cancel common factors before multiplying.', '20/40 = 1/2, so the numerator is 1.'),
          pr('How many 3/4-metre pieces can be cut from 3/2 metres with no cutting loss?', 2, 'Divide the length by the piece length.', '(3/2) ÷ (3/4) = (3/2)(4/3) = 2.'),
        ],
      },
      {
        title: 'Ratios, percentages and material blends', minutes: 25,
        explain: [
          'A ratio compares amounts. In a mixture with ratio 3 : 2, there are five equal parts altogether. The first ingredient occupies three fifths of the total, rather than three halves.',
          'A percentage is a fraction out of one hundred. Keep mass fractions with masses and volume fractions with volumes. An ideal blend property may be a weighted average, but only when the stated physical model allows it.',
        ],
        formulas: [['Share of a total', '\\text{share}=\\frac{\\text{parts wanted}}{\\text{total parts}}\\times\\text{total}'], ['Ideal weighted average', 'P=fP_1+(1-f)P_2']],
        examples: [
          ex('A 200 g powder batch has copper-to-tin mass ratio 3 : 2. Find the copper mass.', [['Count all the parts.', '3+2=5'], ['Take the copper share.', '\\frac35\\times200=120']], '120 g'),
          ex('An ideal parallel-fibre model uses 2/5 fibre at 250 GPa and 3/5 resin at 5 GPa. Find the model stiffness.', [['Weight each stiffness by its volume fraction.', 'E=\\frac25(250)+\\frac35(5)'], ['Add the contributions.', 'E=100+3=103']], '103 GPa'),
        ],
        practice: [
          pr('What is 2/5 of a 100 g sample, in g?', 40, 'Divide into five equal parts first.', '100/5 × 2 = 40 g.'),
          pr('A 350 g batch has ingredient ratio 3 : 4 by mass. Mass of the first ingredient in g?', 150, 'Count all seven parts.', '(3/7) × 350 = 150 g.'),
          pr('A sample contains 18 g chromium and 8 g nickel. Simplify chromium mass divided by nickel mass as one fraction. What is its numerator?', 9, 'Keep the comparison in the requested order, then reduce.', '18/8 = 9/4, so the numerator is 9.'),
          pr('A 270 g batch has ingredient ratio 4 : 5 by mass. First ingredient mass in g?', 120, 'The whole contains nine parts.', '(4/9) × 270 = 120 g.'),
        ],
      },
    ],
  },
  'math-003': {
    predict: {
      q: 'Three identical mystery boxes and four loose weights balance nineteen weights. You remove four weights from BOTH pans. Does each mystery box get lighter, or can you now discover what was inside all along?',
      options: ['Each box contains 5 weights', 'Each box contains 15 weights', 'Each box loses 4 weights', 'The balance must tip'], answer: 0,
      reveal: 'Each box contains 5 weights. Removing equal amounts preserves the balance, leaving three boxes equal to fifteen weights; dividing both sides into three groups reveals one box.',
    },
    parts: [
      {
        title: 'Letters stand for amounts', minutes: 20,
        explain: [
          'A variable is a letter standing for an amount. In 3x, the 3 is a coefficient: it means three copies of x. An expression describes a calculation; an equation says that two expressions have equal values.',
          'Like terms contain the same variable to the same power. Add their coefficients to combine them. A multiplier outside brackets multiplies every term inside, including a subtracted term.',
        ],
        formulas: [['Like terms', 'ax+bx=(a+b)x'], ['Distribute', 'a(b+c)=ab+ac']],
        examples: [
          ex('Simplify 3x + 2x and evaluate at x = 4.', [['Combine the copies of x.', '3x+2x=5x'], ['Replace x by 4.', '5(4)=20']], '20'),
          ex('Evaluate 5(2x − 1) at x = 3.', [['Multiply through the brackets.', '5(2x-1)=10x-5'], ['Substitute.', '10(3)-5=25']], '25'),
        ],
        practice: [
          pr('Evaluate 7x − 3x at x = 2.', 8, 'Combine the coefficients.', '(7 − 3) × 2 = 4 × 2 = 8.'),
          pr('Evaluate 4(x + 2) at x = 3.', 20, 'Replace the letter, then finish the bracket.', '4(3 + 2) = 4 × 5 = 20.'),
          pr('Evaluate 6x − 2x + 3 at x = 5.', 23, 'Keep the constant separate from the x terms.', '4x + 3 = 4 × 5 + 3 = 23.'),
          pr('Evaluate 2(3x − 5) at x = 4.', 14, 'Multiply both terms by two, or substitute first.', '2(12 − 5) = 2 × 7 = 14.'),
        ],
      },
      {
        title: 'Keep both pans balanced', minutes: 25,
        explain: [
          'To solve an equation, find the value that makes its two sides equal. Adding or subtracting the same amount on both sides preserves equality. Multiplying or dividing both sides by the same non-zero number also preserves it.',
          'Undo the operations around the unknown until it stands alone. If it appears on both sides, collect its terms on one side. Finally substitute your answer into the original equation to check the balance.',
        ],
        formulas: [['Undo addition and scaling', 'ax+b=c\\quad\\Rightarrow\\quad x=\\frac{c-b}{a}\\quad(a\\ne0)']],
        examples: [
          ex('Solve 3x + 4 = 19.', [['Subtract 4 from both sides.', '3x=15'], ['Divide both sides by 3.', 'x=5'], ['Check the original balance.', '3(5)+4=19']], 'x = 5'),
          ex('Solve 5(2x − 3) = 4x + 9.', [['Expand the left side.', '10x-15=4x+9'], ['Subtract 4x and add 15 on both sides.', '6x=24'], ['Divide by 6.', 'x=4']], 'x = 4'),
        ],
        practice: [
          pr('Solve 2x + 5 = 17. Give x.', 6, 'Subtract five first.', '2x = 12, so x = 6.'),
          pr('Solve 3x − 8 = 4. Give x.', 4, 'Add eight to both sides.', '3x = 12, so x = 4.'),
          pr('Solve 5x + 3 = 2x + 21. Give x.', 6, 'Collect the x terms on the left.', '3x = 18, so x = 6.'),
          pr('Solve 6x − 7 = x + 23. Give x.', 6, 'Subtract x, then add seven.', '5x = 30, so x = 6.'),
        ],
      },
      {
        title: 'Clearing fractions and handling inequalities', minutes: 25,
        explain: [
          'Fractions in an equation become easier when every term is multiplied by a common denominator. You must multiply the whole of both sides, including any term without a fraction.',
          'An inequality compares unequal amounts: < means less than, and ≤ includes equality. The same balancing moves work, except that multiplying or dividing by a negative reverses the comparison. Think of how a reversal swaps left and right on the number line.',
        ],
        formulas: [['Clear denominators', '\\frac{x}{a}+\\frac{x}{b}=c\\quad\\Rightarrow\\quad bx+ax=abc'], ['Reverse for a negative factor', 'u<v\\quad\\Rightarrow\\quad -u>-v']],
        examples: [
          ex('Solve x/3 + x/4 = 7.', [['Multiply every term by 12.', '4x+3x=84'], ['Combine and divide.', '7x=84\\quad\\Rightarrow\\quad x=12']], 'x = 12'),
          ex('Solve x/2 − x/5 = 6.', [['Multiply every term by 10.', '5x-2x=60'], ['Combine and divide.', '3x=60\\quad\\Rightarrow\\quad x=20']], 'x = 20'),
        ],
        practice: [
          pr('Solve x/2 = 8. Give x.', 16, 'Multiply both sides by two.', 'x = 2 × 8 = 16.'),
          pr('Solve x/4 = 3. Give x.', 12, 'Undo division by four.', 'x = 4 × 3 = 12.'),
          pr('Solve x/2 + x/3 = 5. Give x.', 6, 'Multiply every term by six.', '3x + 2x = 30, so x = 6.'),
          pr('For −x/3 ≤ −4, what is the smallest allowed x?', 12, 'Multiply by negative three and reverse the inequality.', 'Multiplying gives x ≥ 12, so the smallest value is 12.'),
        ],
      },
      {
        title: 'Rearranging an engineering formula', minutes: 25,
        explain: [
          'A formula is an equation connecting several quantities. Choose which quantity you want, then treat the others as known numbers. Rearrange with the same balance rules before inserting values.',
          'Stress is force divided by loaded area. With force in N and area in mm², stress is in N/mm², also called MPa. A mixture balance similarly keeps the amount of an ingredient equal before and after blending.',
        ],
        formulas: [['Stress and area', '\\sigma=\\frac FA\\quad\\Rightarrow\\quad A=\\frac F\\sigma'], ['Mixture balance', 'c_1f+c_2(1-f)=c\\quad\\Rightarrow\\quad f=\\frac{c-c_2}{c_1-c_2}']],
        examples: [
          ex('A bar carries 1,200 N at a stated stress of 60 MPa. Find its loaded area in mm².', [['Multiply by area and divide by stress.', 'A=F/\\sigma'], ['Insert matching units.', 'A=1200/60=20']], '20 mm²'),
          ex('A blend obeys 12f + 4(1 − f) = 10. Find the fraction f.', [['Expand and collect.', '12f+4-4f=10\\quad\\Rightarrow\\quad8f=6'], ['Divide by eight.', 'f=6/8=0.75']], '0.75'),
        ],
        practice: [
          pr('At 40 MPa, what area carries 800 N? Give mm².', 20, 'Rearrange stress = force/area.', 'A = 800/40 = 20 mm².'),
          pr('Density is mass/volume. A sample has mass 54 g and density 6 g/cm³. Volume in cm³?', 9, 'Isolate volume before substituting.', 'V = m/ρ = 54/6 = 9 cm³.'),
          pr('A heating rule is T = 5 + 3t, with T in °C and t in minutes. Time to reach 35 °C, in minutes?', 10, 'Undo the starting temperature, then the rate.', 't = (35 − 5)/3 = 10 minutes.'),
          pr('A blend obeys 30f + 6(1 − f) = 18. Give f.', 0.5, 'Expand and collect the terms containing f.', '24f + 6 = 18, so f = 12/24 = 0.5.'),
        ],
      },
    ],
  },
  'math-004': {
    predict: {
      q: 'The zoom moves from a hair-sized 10⁻⁴ m square to an atom-sized 10⁻¹⁰ m square. How many atom-sized lengths fit along ONE side of the larger square?',
      options: ['6', '60', '1,000,000', '10,000,000,000'], answer: 2,
      reveal: 'One million. There are six tenfold changes between the lengths, so their ratio is 10⁶. Counting the exponent steps tells you how many times to multiply by ten, rather than the final length ratio.',
    },
    parts: [
      {
        title: 'Powers count repeated multiplication', minutes: 20,
        explain: [
          'In a power, the large number is the base and the small raised number is the exponent. A positive whole-number exponent counts repeated factors of the base. Squaring means using two factors; cubing means using three.',
          'When powers have the same base, multiplying joins their factors, so add the exponents. Dividing cancels factors, so subtract the exponents. A power raised to another power repeats the whole group, so multiply the exponents.',
        ],
        formulas: [['Multiply and divide', 'a^ma^n=a^{m+n},\\quad a^m/a^n=a^{m-n}\\;(a\\ne0)'], ['Power of a power', '(a^m)^n=a^{mn}']],
        examples: [
          ex('Evaluate 2⁴.', [['Write four equal factors.', '2^4=2\\times2\\times2\\times2'], ['Multiply them.', '2^4=16']], '16'),
          ex('Evaluate 2³ × 2².', [['Join powers of the same base.', '2^3\\times2^2=2^{3+2}=2^5'], ['Evaluate.', '2^5=32']], '32'),
        ],
        practice: [
          pr('Find 3³.', 27, 'Use three factors of three.', '3 × 3 × 3 = 27.'),
          pr('Find 5².', 25, 'A square uses two equal factors.', '5 × 5 = 25.'),
          pr('Find 2⁶ ÷ 2².', 16, 'Cancel two factors of two.', '2^(6 − 2) = 2⁴ = 16.'),
          pr('Find (3²)².', 81, 'The outer square repeats the inner group twice.', '3^(2 × 2) = 3⁴ = 81.'),
        ],
      },
      {
        title: 'Zero and negative exponents', minutes: 20,
        explain: [
          'Step down through powers by dividing by the base each time. After the first power comes the zeroth power. For a non-zero base this gives one, because a number divided by itself is one.',
          'Keep dividing and the exponents become negative. A negative exponent means a reciprocal, rather than a negative amount. Brackets matter: a negative base and a negative exponent describe different things.',
        ],
        formulas: [['Zero power', 'a^0=1\\quad(a\\ne0)'], ['Reciprocal power', 'a^{-n}=\\frac1{a^n}\\quad(a\\ne0)']],
        examples: [
          ex('Write 10⁻³ as a decimal.', [['Use a reciprocal.', '10^{-3}=1/10^3'], ['Divide by one thousand.', '1/1000=0.001']], '0.001'),
          ex('Evaluate 2⁻³.', [['Find the positive power in the denominator.', '2^{-3}=1/2^3=1/8'], ['Divide.', '1/8=0.125']], '0.125'),
        ],
        practice: [
          pr('Find 7⁰.', 1, 'Think of 7¹ divided by seven.', '7/7 = 1.'),
          pr('Find 5⁻².', 0.04, 'Square five, then take the reciprocal.', '1/25 = 0.04.'),
          pr('Find 10⁴ × 10⁻⁶.', 0.01, 'Add the signed exponents.', '10^(4 − 6) = 10⁻² = 0.01.'),
          pr('Find 4⁻¹.', 0.25, 'A power of negative one takes the reciprocal.', '1/4 = 0.25.'),
        ],
      },
      {
        title: 'Roots undo powers', minutes: 25,
        explain: [
          'The square root asks for the non-negative number whose square gives the original amount. The cube root asks which number multiplied by itself three times gives the amount. Roots undo the corresponding powers.',
          'A fractional exponent combines rooting and raising to a power. For positive bases, the denominator of the exponent tells you the root, and the numerator tells you the power. A square root of a negative number is outside the real numbers used here.',
        ],
        formulas: [['Fractional powers', 'a^{1/n}=\\sqrt[n]{a},\\quad a^{m/n}=(\\sqrt[n]{a})^m\\quad(a>0)']],
        examples: [
          ex('Find √144.', [['Look for a non-negative number with square 144.', '12\\times12=144'], ['Choose the non-negative root.', '\\sqrt{144}=12']], '12'),
          ex('Evaluate 27^(2/3).', [['Take the cube root first.', '\\sqrt[3]{27}=3'], ['Square the result.', '27^{2/3}=3^2=9']], '9'),
        ],
        practice: [
          pr('Find √81.', 9, 'Which non-negative number squares to 81?', '9² = 81, so √81 = 9.'),
          pr('Find ∛64.', 4, 'Use three equal factors.', '4 × 4 × 4 = 64, so ∛64 = 4.'),
          pr('Find 16^(3/4).', 8, 'Take the fourth root, then cube it.', 'The fourth root of 16 is 2; 2³ = 8.'),
          pr('Find √(225/9).', 5, 'Finish the division inside the root first.', '225/9 = 25, and √25 = 5.'),
        ],
      },
      {
        title: 'Scientific notation and material scales', minutes: 25,
        explain: [
          'Scientific notation writes a positive number as a factor from one up to, but below, ten, times a power of ten. It makes microscopic lengths and very large counts readable without long strings of zeros.',
          'Multiply the front factors and combine the powers separately. For division, divide the front factors and subtract the exponents. Convert lengths to the same unit before comparing them; a negative exponent often describes a perfectly ordinary small positive length.',
        ],
        formulas: [['Scientific notation', 'N=a\\times10^n\\quad(1\\le a<10)'], ['Scale ratio', '\\text{ratio}=\\frac{\\text{larger length}}{\\text{smaller length}}']],
        examples: [
          ex('Evaluate (2 × 10⁻⁶) × (3 × 10³).', [['Multiply the front factors and add exponents.', '(2\\times3)10^{-6+3}=6\\times10^{-3}'], ['Write as a decimal.', '6\\times10^{-3}=0.006']], '0.006'),
          ex('Evaluate (6 × 10⁸)/(2 × 10³).', [['Divide the front factors and subtract exponents.', '(6/2)10^{8-3}=3\\times10^5'], ['Write as a whole number.', '3\\times10^5=300000']], '300,000'),
        ],
        practice: [
          pr('Evaluate (4 × 10⁻³)(2 × 10²).', 0.8, 'Separate front factors from powers.', '8 × 10⁻¹ = 0.8.'),
          pr('Evaluate (9 × 10⁻⁶)/(3 × 10⁻³).', 0.003, 'Subtract the negative exponent carefully.', '3 × 10^(−6 + 3) = 3 × 10⁻³ = 0.003.'),
          pr('Compare a 10⁻⁴ m grain with a 10⁻¹⁰ m atomic spacing. How many such spacings span the grain?', 1000000, 'Both lengths already use metres.', '10⁻⁴/10⁻¹⁰ = 10⁶ = 1,000,000.'),
          pr('A stated atomic spacing is 2.5 × 10⁻⁷ mm. Convert to nm, using 1 mm = 10⁶ nm.', 0.25, 'Multiply the length by the number of nanometres per millimetre.', '2.5 × 10⁻⁷ × 10⁶ = 2.5 × 10⁻¹ = 0.25 nm.'),
        ],
      },
    ],
  },
  'math-005': {
    predict: {
      q: 'On y = −0.5x + 2, slide the little rise-and-run triangle from the left of the graph to the right. For the same one-unit run, will its vertical drop become larger, smaller, or stay the same?',
      options: ['Larger on the right', 'Smaller on the right', 'The line starts climbing', 'The drop stays 0.5 everywhere'], answer: 3,
      reveal: 'It stays 0.5 everywhere. A straight line has the same slope at every position; the +2 lifts the whole line without changing its steepness.',
    },
    parts: [
      {
        title: 'Reading a point and a displacement', minutes: 20,
        explain: [
          'Coordinates give a point an address. In (x, y), x measures horizontal position and y measures vertical position from the origin, where the two axes cross. Negative coordinates mean left or down.',
          'A displacement is the change between positions: final coordinate minus initial coordinate. Its horizontal and vertical changes form a right triangle. Pythagoras gives the straight distance, which differs from adding the two journeys.',
        ],
        formulas: [['Coordinate changes', '\\Delta x=x_2-x_1,\\quad\\Delta y=y_2-y_1'], ['Distance', 'd=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}']],
        examples: [
          ex('A point moves horizontally from x = −2 to x = 3. Find its horizontal change.', [['Final minus initial.', '\\Delta x=3-(-2)'], ['Add the opposite.', '\\Delta x=5']], '5 units'),
          ex('A point moves vertically from y = −1 to y = 4. Find its vertical change.', [['Keep the same subtraction order.', '\\Delta y=4-(-1)'], ['Evaluate.', '\\Delta y=5']], '5 units'),
        ],
        practice: [
          pr('A point starts at x = −3 and moves 7 units right. Final x?', 4, 'Add the horizontal journey.', '−3 + 7 = 4.'),
          pr('A point starts at y = 2 and moves 6 units down. Final y?', -4, 'Down is a negative change.', '2 − 6 = −4.'),
          pr('Find the change in x from −2 to −5.', -3, 'Subtract the initial coordinate.', '−5 − (−2) = −3.'),
          pr('Two marks on a sheet differ by 6 mm horizontally and 8 mm vertically. Straight distance in mm?', 10, 'Use a right triangle.', '√(6² + 8²) = √100 = 10 mm.'),
        ],
      },
      {
        title: 'Slope is rise divided by run', minutes: 25,
        explain: [
          'The slope compares vertical change with horizontal change. Choose two different points on a line. Subtract their coordinates in the same order, then divide rise by run. A negative slope falls as you move right.',
          'Units give the slope a meaning. Temperature against time gives degrees per minute. Stress against strain gives an elastic modulus because strain is a ratio without units. A vertical line has zero run, so this division cannot give a finite slope.',
        ],
        formulas: [['Slope', 'm=\\frac{y_2-y_1}{x_2-x_1}\\quad(x_2\\ne x_1)']],
        examples: [
          ex('A furnace rises from 25 °C at 0 min to 145 °C at 6 min. Find the slope.', [['Find rise and run.', '\\Delta T=120,\\quad\\Delta t=6'], ['Divide.', 'm=120/6=20']], '20 °C/min'),
          ex('Find the slope through (1, 8) and (4, 2).', [['Subtract in the same order.', '\\Delta y=2-8=-6,\\quad\\Delta x=4-1=3'], ['Divide rise by run.', 'm=-6/3=-2']], '−2'),
        ],
        practice: [
          pr('Find the slope through (1, 3) and (5, 11).', 2, 'Use differences, rather than the coordinates themselves.', '(11 − 3)/(5 − 1) = 8/4 = 2.'),
          pr('Find the slope through (3, 10) and (6, 4).', -2, 'Keep the order the same in both differences.', '(4 − 10)/(6 − 3) = −6/3 = −2.'),
          pr('Find the slope through (2, 7) and (9, 7).', 0, 'A horizontal line has no rise.', '(7 − 7)/(9 − 2) = 0/7 = 0.', { tol: 0.001 }),
          pr('A brass test gives 210 MPa at strain 0.002 and zero stress at zero strain. Elastic slope in GPa, using 1 GPa = 1,000 MPa?', 105, 'Find MPa per unit strain, then convert.', '210/0.002 = 105,000 MPa = 105 GPa.'),
        ],
      },
      {
        title: 'Building a straight-line rule', minutes: 25,
        explain: [
          'The rule y = mx + b describes a straight line. The slope m tells the change in y for each extra unit of x. The intercept b is the value of y when x is zero.',
          'Use a known slope and a known point to find the intercept. You can then predict other points, or work backwards from an output. In a physical experiment, use the rule only over the interval where the straight-line model is stated to apply.',
        ],
        formulas: [['Straight line', 'y=mx+b'], ['Through a known point', 'y-y_1=m(x-x_1)']],
        examples: [
          ex('For y = 2x + 1, find y at x = 3.', [['Multiply the input by the slope.', '2(3)=6'], ['Add the starting value.', 'y=6+1=7']], '7'),
          ex('For y = −0.5x + 2, find where the line crosses the x-axis.', [['On the x-axis, y is zero.', '0=-0.5x+2'], ['Subtract 2 and divide by −0.5.', 'x=4']], 'x = 4'),
        ],
        practice: [
          pr('Find y for y = 3x − 4 at x = 2.', 2, 'Multiply first, then subtract.', '3(2) − 4 = 2.'),
          pr('Find y for y = −2x + 1 at x = −3.', 7, 'A negative times a negative is positive.', '−2(−3) + 1 = 6 + 1 = 7.'),
          pr('For y = 2x + 1, which x gives y = 13?', 6, 'Undo the added one before dividing.', 'x = (13 − 1)/2 = 6.'),
          pr('A furnace follows T = 25 + 20t °C for 0 ≤ t ≤ 10 min. Temperature at 8 min in °C?', 185, 'Use the time as the input.', '25 + 20(8) = 185 °C.'),
        ],
      },
      {
        title: 'Parallel lines, perpendicular lines and calibration', minutes: 25,
        explain: [
          'Parallel lines have equal slopes and, if distinct, different intercepts. Perpendicular lines meet at a right angle. With equally scaled axes and finite non-zero slopes, perpendicular slopes multiply to negative one.',
          'A calibration converts a measured reading into a physical quantity. Two reference measurements determine a straight-line calibration. Find the slope from their differences, then use either point to find the intercept.',
        ],
        formulas: [['Parallel and perpendicular', 'm_2=m_1\\;\\text{(parallel)},\\quad m_2=-1/m_1\\;\\text{(perpendicular)}'], ['Find the intercept', 'b=y_1-mx_1']],
        examples: [
          ex('A line has slope 2 and passes through (2, 7). Find its intercept.', [['Insert the point into y = mx + b.', '7=2(2)+b'], ['Subtract the known contribution.', 'b=7-4=3']], '3'),
          ex('With equally scaled axes, find the slope perpendicular to a line of slope 2.', [['The slopes must multiply to −1.', '2m=-1'], ['Divide by two.', 'm=-1/2=-0.5']], '−0.5'),
        ],
        practice: [
          pr('A line of slope 2 passes through (4, 6). Find b.', -2, 'Use b = y − mx.', 'b = 6 − 2(4) = −2.'),
          pr('For y = 3x + 5, what is its y-intercept?', 5, 'Set x to zero.', 'y = 3(0) + 5 = 5.'),
          pr('With equally scaled axes, find the slope perpendicular to slope −0.25.', 4, 'Take the negative reciprocal.', '−1/(−0.25) = 4.'),
          pr('A force sensor reads 100 N at reading 2 and 500 N at reading 10. Linear calibration slope in N per reading unit?', 50, 'Use the changes in force and reading.', '(500 − 100)/(10 − 2) = 400/8 = 50 N per reading unit.'),
        ],
      },
    ],
  },
  'math-006': {
    predict: {
      q: 'The curve y = x² − 5x + 6 crosses zero at x = 2 and x = 3. At the halfway point x = 2.5, would you bet it is above zero, exactly on zero, or below zero?',
      options: ['Above zero: halfway between roots means a hill', 'Exactly zero: average the two zeros', 'Below zero', 'There is no curve between the roots'], answer: 2,
      reveal: 'Below zero: its value is −0.25. Between the roots, (x − 2) is positive and (x − 3) is negative, so their product is negative. The upward-opening curve dips between its crossings.',
    },
    parts: [
      {
        title: 'Expanding and recognising polynomial shapes', minutes: 20,
        explain: [
          'A polynomial adds terms made from whole-number powers of a variable and their coefficients. Its degree is the highest power with a non-zero coefficient. A quadratic has degree two.',
          'To expand two brackets, multiply each term in the first bracket by every term in the second, then collect like terms. In a difference of squares, the middle terms cancel. Factoring will reverse this expansion.',
        ],
        formulas: [['Two brackets', '(x+a)(x+b)=x^2+(a+b)x+ab'], ['Difference of squares', '(x-a)(x+a)=x^2-a^2']],
        examples: [
          ex('Expand (x + 2)(x + 4), then evaluate at x = 3.', [['Multiply and collect.', 'x^2+4x+2x+8=x^2+6x+8'], ['Substitute.', '3^2+6(3)+8=35']], '35'),
          ex('Expand (x − 3)(x + 3), then evaluate at x = 5.', [['The middle terms cancel.', 'x^2+3x-3x-9=x^2-9'], ['Substitute.', '25-9=16']], '16'),
        ],
        practice: [
          pr('What is the coefficient of x in (x + 2)(x + 5)?', 7, 'Collect the two middle terms.', '2x + 5x = 7x, so the coefficient is 7.'),
          pr('What is the constant term in (x + 3)(x + 4)?', 12, 'Multiply the constant from each bracket.', '3 × 4 = 12.'),
          pr('Evaluate (2x + 1)(x − 2) at x = 3.', 7, 'Evaluate each bracket first.', '(6 + 1)(3 − 2) = 7 × 1 = 7.'),
          pr('Evaluate (2x − 3)(2x + 3) at x = 3.', 27, 'Use the difference of squares.', '4x² − 9 = 4(9) − 9 = 27.'),
        ],
      },
      {
        title: 'Factoring and zero products', minutes: 25,
        explain: [
          'A factor is something multiplied by something else to make an expression. First look for a common factor in all the terms. For a quadratic whose x² coefficient is one, seek two numbers whose sum is the x coefficient and whose product is the constant.',
          'A product is zero only if at least one factor is zero. Set each bracket equal to zero to find the roots. Cancelling a factor in a fraction is allowed only where that factor is non-zero; keep the original restriction.',
        ],
        formulas: [['Zero product', 'uv=0\\quad\\Rightarrow\\quad u=0\\;\\text{or}\\;v=0'], ['Keep the restriction', '\\frac{(x-a)(x+a)}{x+a}=x-a\\quad(x\\ne-a)']],
        examples: [
          ex('Solve x² − 8x + 15 = 0.', [['Find numbers with sum −8 and product 15.', '(-3)+(-5)=-8,\\quad(-3)(-5)=15'], ['Set each factor to zero.', '(x-3)(x-5)=0\\quad\\Rightarrow\\quad x=3,5']], 'x = 3 or 5'),
          ex('Simplify (x² − 25)/(x + 5), stating its restriction.', [['Factor the numerator.', '\\frac{(x-5)(x+5)}{x+5}'], ['Cancel only when x + 5 is non-zero.', 'x-5\\quad(x\\ne-5)']], 'x − 5, with x ≠ −5'),
        ],
        practice: [
          pr('Find the smaller root of x² − 5x + 6 = 0.', 2, 'Look for numbers with product six and sum negative five.', '(x − 2)(x − 3) = 0; the smaller root is 2.'),
          pr('Find the larger root of x² − 9x + 14 = 0.', 7, 'Try the factor pairs of fourteen.', '(x − 2)(x − 7) = 0; the larger root is 7.'),
          pr('A stated beam model has M(x) = x² − 6x + 8 kN·m, for 0 ≤ x ≤ 5 m. Find the larger x where M is zero, in m.', 4, 'Factor the quadratic; no beam design assumption is needed.', 'M = (x − 2)(x − 4), so the larger zero is 4 m.'),
          pr('Find the non-zero root of 2x² − 12x = 0.', 6, 'Take out the common factor 2x.', '2x(x − 6) = 0 gives 0 and 6; the requested root is 6.'),
        ],
      },
      {
        title: 'Completing the square and finding the vertex', minutes: 25,
        explain: [
          'Completing the square rewrites a quadratic as a squared bracket plus a constant. With x² + bx, half the x coefficient belongs inside the bracket. Adding its square completes the pattern, so subtract the same amount to preserve the expression.',
          'In y = a(x − h)² + k, the vertex is (h, k). For positive a, a square cannot be negative, so k is the smallest y. For negative a it is the largest. This finds a turning point without calculus.',
        ],
        formulas: [['Complete the square', 'x^2+bx+c=(x+b/2)^2+c-b^2/4'], ['Vertex form', 'y=a(x-h)^2+k']],
        examples: [
          ex('Find the vertex of y = x² + 6x + 4.', [['Half of six is three; add and subtract its square.', 'y=(x+3)^2-9+4'], ['Combine the constants and read the vertex.', 'y=(x+3)^2-5']], '(−3, −5)'),
          ex('Find the minimum of y = x² − 6x + 4.', [['Complete the square.', 'y=(x-3)^2-9+4=(x-3)^2-5'], ['The square is smallest at zero.', 'x=3,\\quad y=-5']], 'Minimum −5 at x = 3'),
        ],
        practice: [
          pr('For y = x² + 4x + 7, find the x coordinate of the vertex.', -2, 'Make the squared bracket x + half the x coefficient.', 'y = (x + 2)² + 3, so the vertex has x = −2.'),
          pr('Find the minimum value of y = x² + 8x + 9.', -7, 'Complete the square, then make it zero.', 'y = (x + 4)² + 9 − 16 = (x + 4)² − 7; the minimum is −7.'),
          pr('What number must be added to x² + 6x to make a perfect square?', 9, 'Square half of the x coefficient.', '(6/2)² = 9.'),
          pr('Solve x² + 10x = 39 for the positive x.', 3, 'Add the square of half of ten to both sides.', '(x + 5)² = 64, so the positive solution is x = 8 − 5 = 3.'),
        ],
      },
      {
        title: 'The quadratic formula and real roots', minutes: 25,
        explain: [
          'The quadratic formula comes from completing the square with general coefficients. It works when a is non-zero. Write the equation with zero on one side, then identify a, b and c with their signs.',
          'The discriminant is the quantity under the square root. Positive gives two real roots, zero gives one repeated real root, and negative gives no real roots. A physical problem may allow only positive roots or roots inside a stated interval.',
        ],
        formulas: [['Quadratic formula', 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\quad(a\\ne0)'], ['Discriminant', 'D=b^2-4ac']],
        examples: [
          ex('Solve 2x² − 4x − 6 = 0.', [['Identify the coefficients and calculate the discriminant.', 'a=2,\\;b=-4,\\;c=-6,\\quad D=16+48=64'], ['Use both signs.', 'x=\\frac{4\\pm8}{4}']], 'x = −1 or 3'),
          ex('Solve x² + 2x − 3 = 0.', [['Find the discriminant.', 'D=2^2-4(1)(-3)=16'], ['Use both signs.', 'x=\\frac{-2\\pm4}{2}']], 'x = −3 or 1'),
        ],
        practice: [
          pr('Find the discriminant of x² − 6x + 9 = 0.', 0, 'Include the sign of b before squaring.', '(−6)² − 4(1)(9) = 36 − 36 = 0.', { tol: 0.001 }),
          pr('Find the discriminant of x² + 2x + 3 = 0.', -8, 'Subtract four times a times c.', '2² − 4(1)(3) = 4 − 12 = −8.'),
          pr('Find the larger root of x² − 5x + 6 = 0 using the quadratic formula.', 3, 'Use the plus sign before the square root.', '(5 + √(25 − 24))/2 = (5 + 1)/2 = 3.'),
          pr('Find the positive root of x² + 2x − 4 = 0.', Math.sqrt(5) - 1, 'The discriminant need not be a perfect square.', '(−2 + √20)/2 = −1 + √5 ≈ 1.2361.'),
        ],
      },
    ],
  },
  'math-007': {
    predict: {
      q: 'One line says x + y = 10. Another says x − y = 4. Their crossing must obey both. Is x halfway to ten, or must it move away from the middle to make the four-unit gap?',
      options: ['x = 5, y = 5', 'x = 10, y = 4', 'x = 7, y = 3', 'The lines cannot meet'], answer: 2,
      reveal: 'The crossing is (7, 3). Starting with equal shares of five, move two from y to x: the total stays ten while the gap grows to four.',
    },
    parts: [
      {
        title: 'One pair that satisfies two rules', minutes: 25,
        explain: [
          'One equation with two unknowns often allows many pairs. A system asks for pairs satisfying every equation at once. On a graph, each line contains the pairs allowed by one equation; their crossing satisfies both.',
          'Substitution replaces a quantity by an equal expression. Isolate one unknown in an easy equation, put that expression into the other equation, and solve. Then find the other unknown and check both original rules.',
        ],
        formulas: [['Substitution', 'x+y=s\\quad\\Rightarrow\\quad y=s-x']],
        examples: [
          ex('Solve x + y = 10 and x − y = 4 by substitution.', [['Isolate y in the first rule.', 'y=10-x'], ['Replace y in the second.', 'x-(10-x)=4\\quad\\Rightarrow\\quad2x=14'], ['Recover y.', 'x=7,\\quad y=10-7=3']], '(7, 3)'),
          ex('Solve y = x + 1 and x + y = 11.', [['Replace y by x + 1.', 'x+(x+1)=11'], ['Solve and recover y.', '2x=10\\quad\\Rightarrow\\quad x=5,\\;y=6']], '(5, 6)'),
        ],
        practice: [
          pr('Solve x + y = 12 and x − y = 2. Give x.', 7, 'Write y = 12 − x.', 'x − (12 − x) = 2, so 2x = 14 and x = 7.'),
          pr('Solve y = x + 2 and x + y = 14. Give x.', 6, 'Put the expression for y into the total.', 'x + x + 2 = 14, so x = 6.'),
          pr('Solve y = 2x + 2 and x + y = 20. Give x.', 6, 'Replace y by the whole expression.', 'x + 2x + 2 = 20, so 3x = 18 and x = 6.'),
          pr('Solve y = 3x − 4 and x + y = 16. Give x.', 5, 'Keep the minus four when substituting.', 'x + 3x − 4 = 16, so 4x = 20 and x = 5.'),
        ],
      },
      {
        title: 'Elimination by adding balanced equations', minutes: 25,
        explain: [
          'You can add the left sides of two true equations and add their right sides. The result remains true. If one unknown has opposite coefficients, its terms cancel and leave an equation with one unknown.',
          'If the coefficients do not yet cancel, multiply every term of one equation by a suitable non-zero number. After elimination, return to an original equation to recover the other unknown. Keep both results together as one pair.',
        ],
        formulas: [['Opposite terms cancel', '(ax+by)+(cx-by)=(a+c)x']],
        examples: [
          ex('Solve 2x + y = 15 and x − y = 3.', [['Add the equations.', '3x=18\\quad\\Rightarrow\\quad x=6'], ['Use the second equation.', '6-y=3\\quad\\Rightarrow\\quad y=3']], '(6, 3)'),
          ex('Solve 3x + 2y = 19 and x − y = 3.', [['Double the second equation.', '2x-2y=6'], ['Add to the first equation.', '5x=25\\quad\\Rightarrow\\quad x=5'], ['Recover y.', '5-y=3\\quad\\Rightarrow\\quad y=2']], '(5, 2)'),
        ],
        practice: [
          pr('Solve x + y = 8 and x − y = 4. Give x.', 6, 'Add the equations directly.', '2x = 12, so x = 6.'),
          pr('Solve 3x + y = 17 and x − y = 3. Give x.', 5, 'The y terms already oppose.', '4x = 20, so x = 5.'),
          pr('Solve 4x + y = 30 and x + y = 6. Give x.', 8, 'Subtract the second equation from the first.', '3x = 24, so x = 8; y is allowed to be negative here.'),
          pr('Solve 2x + 3y = 31 and x − y = 3. Give x.', 8, 'Multiply the second equation by three.', '3x − 3y = 9; adding gives 5x = 40, so x = 8.'),
        ],
      },
      {
        title: 'One crossing, no crossing or the same line', minutes: 20,
        explain: [
          'Two different slopes give one crossing, even if it lies outside the visible window. Equal slopes with different intercepts give parallel lines and no solution. Equal slopes and equal intercepts describe the same line, with infinitely many solutions.',
          'Elimination reveals the same cases. A false statement such as zero equalling a non-zero amount means no solution. A statement that is always true means that equation adds no new restriction; the other equation still describes all the allowed pairs.',
        ],
        formulas: [['Intersection for different slopes', 'x=\\frac{b_2-b_1}{m_1-m_2}\\quad(m_1\\ne m_2)'], ['Parallel distinction', 'm_1=m_2,\\;b_1\\ne b_2\\quad\\Rightarrow\\quad\\text{no solution}']],
        examples: [
          ex('How many solutions do y = x + 1 and y = x − 2 have?', [['Their slopes are equal.', 'm_1=m_2=1'], ['Their intercepts differ, so they never meet.', '1\\ne-2']], '0 solutions'),
          ex('What remains after eliminating x and y from x + y = 10 and 2x + 2y = 20?', [['Double the first equation.', '2x+2y=20'], ['Subtract it from the second.', '0=0']], '0 = 0; infinitely many solutions'),
        ],
        practice: [
          pr('How many solutions do y = 2x + 1 and y = 2x + 3 have?', 0, 'Compare slopes and intercepts.', 'Equal slopes and different intercepts give parallel lines: 0 solutions.', { tol: 0.001 }),
          pr('Subtract twice x + y = 6 from 2x + 2y = 12. What number remains on the right?', 0, 'Multiply the entire first equation before subtracting.', '12 − 2(6) = 0, leaving 0 = 0.', { tol: 0.001 }),
          pr('How many solutions do y = x + 1 and y = −x + 3 have?', 1, 'Different slopes meet once.', 'The slopes differ, so there is exactly 1 solution.'),
          pr('How many pairs satisfy x + y = 10 and x − y = 4?', 1, 'Ask whether the second equation repeats the first restriction.', 'The lines have different slopes and meet at (7, 3): 1 pair.'),
        ],
      },
      {
        title: 'Mass balance in alloy blending', minutes: 30,
        explain: [
          'A blend must satisfy a total-mass balance and an ingredient balance. Let x and y be the masses of the two feeds. Each ingredient contribution is its mass fraction multiplied by the feed mass.',
          'For these exercises, assume complete mixing and no material loss. The ingredient percentages describe the feeds supplied, rather than a universal alloy recipe. A negative feed mass signals that the requested mixture is impossible using only those feeds.',
        ],
        formulas: [['Total mass', 'x+y=M'], ['Ingredient mass', 'c_xx+c_yy=c_tM']],
        examples: [
          ex('Make 100 kg containing 18 kg nickel from feeds with 30% and 10% nickel by mass. Find the 30% feed mass.', [['Write both balances and use y = 100 − x.', '0.30x+0.10(100-x)=18'], ['Collect and solve.', '0.20x=8\\quad\\Rightarrow\\quad x=40']], '40 kg'),
          ex('For that same blend, find the 10% feed mass and check the ingredient total.', [['Use the total-mass balance.', 'y=100-40=60'], ['Check the nickel balance.', '0.30(40)+0.10(60)=12+6=18']], '60 kg'),
        ],
        practice: [
          pr('Make 50 kg with 7 kg nickel from 20% and 10% feeds. Mass of the 20% feed in kg?', 20, 'Let the other mass be 50 − x.', '0.20x + 0.10(50 − x) = 7 gives 0.10x = 2, so x = 20 kg.'),
          pr('Make 80 kg with 16 kg copper from 30% and 10% feeds. Mass of the 30% feed in kg?', 40, 'Use both total mass and copper mass.', '0.30x + 0.10(80 − x) = 16 gives 0.20x = 8, so x = 40 kg.'),
          pr('Make 60 kg with 24 kg of an ingredient from 50% and 20% feeds. Mass of the 50% feed in kg?', 40, 'The lower-concentration feed provides a useful baseline.', '0.50x + 0.20(60 − x) = 24 gives 0.30x = 12, so x = 40 kg.'),
          pr('Make 100 kg with 12 kg of an ingredient from 25% and 5% feeds. Mass of the 25% feed in kg?', 35, 'Subtract the ingredient supplied by an all-5% batch.', '0.25x + 0.05(100 − x) = 12 gives 0.20x = 7, so x = 35 kg.'),
        ],
      },
    ],
  },
  'math-008': {
    predict: {
      q: 'A reaction speeds up as temperature rises. You switch the scene from rate against T to ln(rate) against 1/T. Which picture would you guess appears when the Arrhenius rule holds?',
      options: ['A straight line sloping down', 'A straight line sloping up', 'The same upward curve', 'A horizontal line because the logarithm removes temperature'], answer: 0,
      reveal: 'A straight line sloping down. Moving right now means a larger reciprocal temperature, so a colder sample and a smaller rate. The logarithm turns the exponential rule into a line.',
    },
    parts: [
      {
        title: 'A logarithm asks for a power', minutes: 20,
        explain: [
          'A logarithm reverses an exponent. Read log base b of x as: what power of b gives x? The base must be positive and different from one. In real-number work the quantity inside the logarithm must be positive.',
          'The common logarithm uses base ten. The natural logarithm, written ln, uses the positive number e, about 2.71828. A calculator has separate keys for log and ln; choose the one matching the base in your equation.',
        ],
        formulas: [['Reverse a power', 'b^y=x\\quad\\Longleftrightarrow\\quad\\log_bx=y'], ['Natural logarithm', '\\ln(e^x)=x']],
        examples: [
          ex('Find log₁₀(1000).', [['Ask which power of ten gives one thousand.', '10^3=1000'], ['Read the power.', '\\log_{10}(1000)=3']], '3'),
          ex('Find log₂(32).', [['Build the power of two.', '2^5=32'], ['Reverse the question.', '\\log_2(32)=5']], '5'),
        ],
        practice: [
          pr('Find log₁₀(100).', 2, 'Which power of ten gives one hundred?', '10² = 100, so log₁₀(100) = 2.'),
          pr('Find log₂(8).', 3, 'Use repeated factors of two.', '2³ = 8, so log₂(8) = 3.'),
          pr('Find log₁₀(0.01).', -2, 'Small positive inputs can have negative logarithms.', '10⁻² = 0.01, so log₁₀(0.01) = −2.'),
          pr('Find ln(1).', 0, 'Any positive base to the zeroth power gives one.', 'e⁰ = 1, so ln(1) = 0.', { tol: 0.001 }),
        ],
      },
      {
        title: 'Products, quotients and powers inside a logarithm', minutes: 25,
        explain: [
          'Multiplying powers of the same base adds their exponents. Reversing that statement means the logarithm of a product is the sum of the logarithms. Division becomes subtraction, and a power becomes a multiplier.',
          'All logarithms in one of these rules must use the same base. For the rules below, A and B must be positive. There is no corresponding rule that splits the logarithm of a sum into two logarithms.',
        ],
        formulas: [['Product and quotient', '\\ln(AB)=\\ln A+\\ln B,\\quad\\ln(A/B)=\\ln A-\\ln B'], ['Power', '\\ln(A^p)=p\\ln A']],
        examples: [
          ex('Find log₁₀(100 × 1000).', [['Split the product.', '\\log_{10}(100)+\\log_{10}(1000)'], ['Add the powers.', '2+3=5']], '5'),
          ex('Find log₁₀(10000/100).', [['Split the quotient.', '\\log_{10}(10000)-\\log_{10}(100)'], ['Subtract the powers.', '4-2=2']], '2'),
        ],
        practice: [
          pr('Find log₁₀(10⁴).', 4, 'A logarithm reverses the matching power.', 'log₁₀(10⁴) = 4.'),
          pr('Find log₁₀(100 × 100).', 4, 'Add the logarithms of the factors.', '2 + 2 = 4.'),
          pr('Find log₁₀(1000/10).', 2, 'Subtract the logarithms.', '3 − 1 = 2.'),
          pr('Find log₂(8²).', 6, 'Bring the square out as a multiplier.', '2 log₂(8) = 2 × 3 = 6.'),
        ],
      },
      {
        title: 'Finding time in growth and decay', minutes: 25,
        explain: [
          'When the unknown is in an exponent, ordinary division cannot bring it down. First isolate the exponential expression. Then take a logarithm of both sides and use the power rule.',
          'For a natural exponential, ln is the convenient choice. In a decay model, the amount falls by the same fraction over equal times. A half-life is the time required for the amount to fall to half its starting value.',
        ],
        formulas: [['Solve exponential growth', 'e^{kt}=r\\quad\\Rightarrow\\quad t=\\frac{\\ln r}{k}'], ['Half-life', 'N=N_0e^{-kt},\\quad t_{1/2}=\\frac{\\ln2}{k}\\quad(k>0)']],
        examples: [
          ex('Solve e^(0.5t) = 20 for t.', [['Take natural logarithms.', '0.5t=\\ln20'], ['Divide by the coefficient.', 't=\\ln20/0.5\\approx5.9915']], 't ≈ 5.9915'),
          ex('A stated decay model has k = 0.1 per minute. Find its half-life.', [['Set the remaining fraction to one half.', 'e^{-0.1t}=1/2\\quad\\Rightarrow\\quad-0.1t=-\\ln2'], ['Solve for time.', 't=\\ln2/0.1\\approx6.9315']], '6.9315 min'),
        ],
        practice: [
          pr('Solve 2ˣ = 16. Give x.', 4, 'Recognise a power of two.', '16 = 2⁴, so x = 4.'),
          pr('Solve 10^(2x) = 10000. Give x.', 2, 'Take the common logarithm.', '2x = 4, so x = 2.'),
          pr('A model gives e^(0.2t) = 3, with t in seconds. Find t in s.', Math.log(3) / 0.2, 'Take ln before dividing by 0.2.', 't = ln(3)/0.2 ≈ 5.4931 s.'),
          pr('A coating model is N(t) = 100e^(−0.05t) mg, with t in minutes. When does N reach 25 mg? Give minutes.', Math.log(4) / 0.05, 'Divide by the initial amount before taking ln.', 'e^(−0.05t) = 1/4, so t = ln(4)/0.05 ≈ 27.7259 minutes.'),
        ],
      },
      {
        title: 'Straightening an Arrhenius plot', minutes: 30,
        explain: [
          'Many thermally activated material processes follow an Arrhenius model: k = A e^(−Q/RT). Here k is the rate, A a positive prefactor, Q an activation energy, R the gas constant and T the absolute temperature in kelvin. For this lesson, take R = 8.314 J/(mol·K).',
          'Taking ln gives a straight line when the horizontal quantity is 1/T. Its slope is −Q/R. Use Q in J/mol with this R; convert kJ to J first. Logarithms of measured rates mean their numerical values in one fixed chosen unit, so keep that unit throughout.',
          'A larger positive Q gives a more negative slope. Comparing two temperatures cancels the prefactor A, allowing you to find a rate ratio without knowing its value.',
        ],
        formulas: [['Straight-line form', '\\ln k=\\ln A-\\frac QR\\frac1T'], ['Rate ratio', '\\ln\\frac{k_2}{k_1}=\\frac QR\\left(\\frac1{T_1}-\\frac1{T_2}\\right)']],
        examples: [
          ex('For Q = 120 kJ/mol, find the slope of ln k against 1/T, in K. Use R = 8.314 J/(mol·K).', [['Convert activation energy to joules.', 'Q=120000\\;\\text{J/mol}'], ['Divide and retain the negative sign.', 'm=-120000/8.314\\approx-14433.49\\;\\text{K}']], '−14,433.49 K'),
          ex('An Arrhenius line has slope −10,000 K. Find Q in kJ/mol using the same R.', [['Rearrange m = −Q/R.', 'Q=-mR'], ['Calculate in joules and convert.', 'Q=10000(8.314)/1000=83.14\\;\\text{kJ/mol}']], '83.14 kJ/mol'),
        ],
        practice: [
          pr('An Arrhenius line has slope −5,000 K. Find Q in kJ/mol, using R = 8.314 J/(mol·K).', 41.57, 'Use Q = −mR, then divide by one thousand.', 'Q = 5000 × 8.314/1000 = 41.57 kJ/mol.'),
          pr('For Q = 60 kJ/mol and R = 8.314 J/(mol·K), find the slope in K.', -60000 / 8.314, 'Convert Q to joules before dividing.', 'm = −60000/8.314 ≈ −7216.74 K.'),
          pr('What horizontal coordinate 1/T, in K⁻¹, corresponds to T = 500 K?', 0.002, 'Take the reciprocal of the absolute temperature.', '1/500 = 0.002 K⁻¹.', { tol: 0.000001 }),
          pr('An Arrhenius model has Q/R = 10,000 K. Find k(1000 K)/k(500 K).', Math.exp(10), 'Find the logarithm of the ratio, then use the exponential.', 'ln(ratio) = 10000(1/500 − 1/1000) = 10, so the ratio is e¹⁰ ≈ 22026.47.'),
        ],
      },
    ],
  },
  'geo-001': {
    predict: {
      q: 'In the squares-on-sides scene, choose right-triangle legs 5 and 12. Without adding the side lengths, guess the third side. Could it be a whole number again?',
      options: ['17', '13', '60', '√17'], answer: 1,
      reveal: 'It is 13. The smaller squares have areas 25 and 144; together they make 169, the area of a square with side 13. Lengths do not add here, but their squares do.',
    },
    parts: [
      {
        title: 'Areas and angles before diagonals', minutes: 20,
        explain: [
          'Length measures a side. Area measures how much flat space a shape covers, in square units. A rectangle contains base times height unit squares. A triangle takes half of a rectangle with the same base and perpendicular height.',
          'Perpendicular means meeting at a right angle. The height of a triangle must be measured perpendicular to its base, even when a sloping side looks easier to measure. In a flat triangle the interior angles add to a straight angle, 180°.',
        ],
        formulas: [['Flat areas', 'A_{\\text{rectangle}}=bh,\\quad A_{\\text{triangle}}=\\frac12bh'], ['Triangle angles', '\\alpha+\\beta+\\gamma=180^\\circ']],
        examples: [
          ex('A rectangular metal sheet is 6 cm by 4 cm. Find its area.', [['Use base times perpendicular height.', 'A=6\\times4'], ['Attach square units.', 'A=24\\;\\text{cm}^2']], '24 cm²'),
          ex('A triangular plate has base 8 cm and perpendicular height 3 cm. Find its area.', [['Start with the matching rectangle.', '8\\times3=24'], ['Take half.', 'A=24/2=12\\;\\text{cm}^2']], '12 cm²'),
        ],
        practice: [
          pr('Area of a 5 cm by 7 cm rectangle, in cm²?', 35, 'Count rows times columns of unit squares.', '5 × 7 = 35 cm².'),
          pr('A triangle has base 10 mm and perpendicular height 6 mm. Area in mm²?', 30, 'Use half the rectangle area.', '(1/2) × 10 × 6 = 30 mm².'),
          pr('A 12 cm by 8 cm sheet loses a 4 cm by 3 cm rectangular corner. Remaining area in cm²?', 84, 'Subtract the removed area from the original area.', '12 × 8 − 4 × 3 = 96 − 12 = 84 cm².'),
          pr('Two interior angles of a triangle are 50° and 60°. Third angle in degrees?', 70, 'Subtract both known angles from a straight angle.', '180 − 50 − 60 = 70°.'),
        ],
      },
      {
        title: 'Squares on the sides of a right triangle', minutes: 25,
        explain: [
          'The hypotenuse is the side opposite the right angle, and it is the longest side. In every right triangle, the square on that side has the same area as the squares on the two shorter legs combined.',
          'To find the hypotenuse, add the leg squares and take a square root. To find a missing leg, subtract the known leg square from the hypotenuse square before taking the root. This rule requires a right angle.',
        ],
        formulas: [['Pythagorean theorem', 'a^2+b^2=c^2'], ['Missing lengths', 'c=\\sqrt{a^2+b^2},\\quad b=\\sqrt{c^2-a^2}']],
        examples: [
          ex('A right triangle has legs 3 cm and 4 cm. Find its hypotenuse.', [['Add the square areas.', 'c^2=3^2+4^2=9+16=25'], ['Take the positive square root for a length.', 'c=\\sqrt{25}=5']], '5 cm'),
          ex('A right triangle has hypotenuse 13 cm and one leg 5 cm. Find the other leg.', [['Subtract the known square.', 'b^2=13^2-5^2=169-25=144'], ['Take the positive root.', 'b=\\sqrt{144}=12']], '12 cm'),
        ],
        practice: [
          pr('Right-triangle legs are 6 mm and 8 mm. Hypotenuse in mm?', 10, 'Add the squares, then take the root.', '√(36 + 64) = √100 = 10 mm.'),
          pr('Hypotenuse is 10 m and one leg is 6 m. Other leg in m?', 8, 'Subtract before taking the root.', '√(100 − 36) = √64 = 8 m.'),
          pr('Right-triangle legs are 5 cm and 12 cm. Hypotenuse in cm?', 13, 'The two smaller square areas add.', '√(25 + 144) = √169 = 13 cm.'),
          pr('A rectangular steel frame is 2 m wide and 1.5 m high. Corner-to-corner brace length in m?', 2.5, 'The brace is the hypotenuse across the rectangle.', '√(2² + 1.5²) = √6.25 = 2.5 m.'),
        ],
      },
      {
        title: 'Why it works and how to test a right angle', minutes: 25,
        explain: [
          'A proof explains every right triangle at once. Arrange four copies of a right triangle inside a square of side a + b. One arrangement leaves a central square of side c. Another leaves two squares of sides a and b. The same four triangles occupy the same total area, so the remaining areas must be equal.',
          'The converse works too: if the two shorter side squares add to the longest side square, the triangle is right-angled. A few successful examples illustrate a rule; the rearrangement explains why it always holds. Scaling all lengths by the same factor multiplies all areas by the square of that factor.',
        ],
        formulas: [['Area argument', '(a+b)^2-4\\left(\\frac{ab}{2}\\right)=a^2+b^2=c^2'], ['Right-angle check', 'a^2+b^2-c^2=0\\quad(c\\;\\text{longest})']],
        examples: [
          ex('Check whether sides 5, 12 and 13 form a right triangle.', [['Square and add the shorter sides.', '5^2+12^2=25+144=169'], ['Compare with the longest side square.', '13^2=169']], 'Yes: the square areas agree'),
          ex('Check whether sides 6, 7 and 10 form a right triangle.', [['Add the shorter side squares.', '6^2+7^2=36+49=85'], ['Compare with the longest side square.', '10^2=100\\ne85']], 'No: the square areas differ'),
        ],
        practice: [
          pr('For legs 8 and 15, what is the hypotenuse square c²?', 289, 'The question asks for the square, so do not take a root.', '8² + 15² = 64 + 225 = 289.'),
          pr('For legs 7 and 24, what is c²?', 625, 'Add the two smaller square areas.', '7² + 24² = 49 + 576 = 625.'),
          pr('For sides 9, 12 and 15, find 9² + 12² − 15².', 0, 'A zero result confirms the right-angle condition.', '81 + 144 − 225 = 0.', { tol: 0.001 }),
          pr('Every side of a right triangle doubles. By what factor does the area of its hypotenuse square grow?', 4, 'Area uses two length factors.', '(2c)²/c² = 2² = 4.'),
        ],
      },
      {
        title: 'Diagonals across sheets and solid blocks', minutes: 25,
        explain: [
          'The diagonal of a rectangle makes a right triangle with its width and height. A diagonal across a rectangular solid uses Pythagoras twice: first across a face, then from that face diagonal up through the depth.',
          'Use the same length unit for every edge. The face diagonal and the depth meet at a right angle. Squaring the face diagonal removes its square root, so the final rule simply adds the squares of all three perpendicular edges.',
        ],
        formulas: [['Rectangle diagonal', 'd=\\sqrt{w^2+h^2}'], ['Rectangular solid diagonal', 'D=\\sqrt{w^2+h^2+z^2}']],
        examples: [
          ex('A rectangular sheet is 3 mm wide and 4 mm high. Find its diagonal.', [['Find the diagonal square.', 'd^2=3^2+4^2=25'], ['Take the root.', 'd=5']], '5 mm'),
          ex('A rectangular block has perpendicular edges 2 cm, 3 cm and 6 cm. Find its body diagonal.', [['First square the face diagonal.', 'd^2=2^2+3^2=13'], ['Add the depth square and take the root.', 'D=\\sqrt{13+6^2}=\\sqrt{49}=7']], '7 cm'),
        ],
        practice: [
          pr('Find the diagonal of a 4 mm by 3 mm foil rectangle, in mm.', 5, 'Use the two perpendicular sides.', '√(16 + 9) = 5 mm.'),
          pr('Find the diagonal of a 6 cm by 8 cm plate, in cm.', 10, 'Add the squares of the edges.', '√(36 + 64) = 10 cm.'),
          pr('A rectangular block has edges 1 mm, 2 mm and 2 mm. Body diagonal in mm?', 3, 'Add three squares before taking the root.', '√(1 + 4 + 4) = 3 mm.'),
          pr('A rectangular block has edges 3 cm, 4 cm and 12 cm. Body diagonal in cm?', 13, 'Use the face diagonal as one leg of a second triangle.', '√(9 + 16 + 144) = √169 = 13 cm.'),
        ],
      },
    ],
  },
  'geo-002': {
    predict: {
      q: 'The point on the unit circle is half a unit above the centre at 30°. Keep turning towards 180°. At which different angle will it be exactly that high again?',
      options: ['60°', '90°', '150°', '210°'], answer: 2,
      reveal: 'At 150°. The two points are mirror images across the vertical axis: their sideways positions differ in sign, but their heights, and therefore their sines, agree.',
    },
    parts: [
      {
        title: 'Three ratios for a right triangle', minutes: 20,
        explain: [
          'Choose an acute angle in a right triangle. The opposite side lies across from it. The adjacent leg touches it, and the hypotenuse lies across from the right angle. These names depend on which acute angle you choose.',
          'Sine compares opposite with hypotenuse, cosine adjacent with hypotenuse, and tangent opposite with adjacent. Enlarging the triangle changes its lengths but preserves these ratios. That is how an angle tells you a shape without fixing its size.',
        ],
        formulas: [['Right-triangle ratios', '\\sin\\theta=\\frac{\\text{opposite}}{\\text{hypotenuse}},\\quad\\cos\\theta=\\frac{\\text{adjacent}}{\\text{hypotenuse}},\\quad\\tan\\theta=\\frac{\\text{opposite}}{\\text{adjacent}}']],
        examples: [
          ex('Relative to an acute angle, opposite = 3, adjacent = 4 and hypotenuse = 5. Find sine.', [['Choose opposite over hypotenuse.', '\\sin\\theta=3/5'], ['Divide.', '\\sin\\theta=0.6']], '0.6'),
          ex('For that same angle in the 3–4–5 triangle, find cosine.', [['Choose adjacent over hypotenuse.', '\\cos\\theta=4/5'], ['Divide.', '\\cos\\theta=0.8']], '0.8'),
        ],
        practice: [
          pr('A right triangle has opposite 5, adjacent 12 and hypotenuse 13 relative to θ. Find sin θ.', 5 / 13, 'Use the opposite side and hypotenuse.', 'sin θ = 5/13 ≈ 0.3846.'),
          pr('For opposite 5, adjacent 12 and hypotenuse 13, find cos θ.', 12 / 13, 'Use adjacent over hypotenuse.', 'cos θ = 12/13 ≈ 0.9231.'),
          pr('For opposite 3 and adjacent 4, find tan θ.', 0.75, 'Tangent uses the two legs.', 'tan θ = 3/4 = 0.75.'),
          pr('For opposite 8, adjacent 6 and hypotenuse 10, find sin θ.', 0.8, 'Choose the side across from θ.', 'sin θ = 8/10 = 0.8.'),
        ],
      },
      {
        title: 'Lengths from angles, angles from lengths', minutes: 25,
        explain: [
          'Choose the ratio containing your known length and the length you want. Multiply or divide to isolate the missing length. When the angle is in degrees, use degree mode on the calculator.',
          'An inverse trigonometric function finds an angle from a ratio. For an acute right-triangle angle, arctan(opposite/adjacent) returns the unique angle between zero and ninety degrees. The inverse sine key is different from taking the reciprocal of sine.',
        ],
        formulas: [['Height from slope length', 'h=L\\sin\\theta'], ['Acute angle', '\\theta=\\arctan\\left(\\frac{\\text{opposite}}{\\text{adjacent}}\\right)']],
        examples: [
          ex('A 10 m ramp makes 30° with level ground. Find its vertical rise.', [['The ramp is the hypotenuse.', 'h=10\\sin30^\\circ'], ['Use sin 30° = 1/2.', 'h=10(0.5)=5']], '5 m'),
          ex('A right triangle rises 3 m over a horizontal run of 4 m. Find the acute slope angle.', [['Form the tangent ratio.', '\\tan\\theta=3/4'], ['Use inverse tangent in degree mode.', '\\theta=\\arctan(0.75)\\approx36.8699^\\circ']], '36.8699°'),
        ],
        practice: [
          pr('A 6 m bar makes 60° with the horizontal. Horizontal span in m?', 3, 'The horizontal span is adjacent to the angle.', '6 cos 60° = 6 × 0.5 = 3 m.'),
          pr('An 8 m ramp makes 30° with the horizontal. Rise in m?', 4, 'Multiply the hypotenuse by sine.', '8 sin 30° = 8 × 0.5 = 4 m.'),
          pr('A slope has horizontal run 5 m and angle 45°. Rise in m?', 5, 'Tangent compares rise with run.', 'Rise = 5 tan 45° = 5 × 1 = 5 m.'),
          pr('A crystal reflection obeys λ = 2d sin θ. If λ = 0.154 nm and θ = 30°, find d in nm.', 0.154, 'Rearrange for d and use sin 30° = 1/2.', 'd = 0.154/(2 × 0.5) = 0.154 nm.'),
        ],
      },
      {
        title: 'The unit circle and repeated heights', minutes: 25,
        explain: [
          'A unit circle has radius one. Measure the angle anticlockwise from its rightmost point. The moving point has horizontal coordinate cos θ and vertical coordinate sin θ. This extends the ratios beyond acute angles.',
          'The left half has negative cosine and the lower half negative sine. Reflections explain why different angles can share a sine. Pythagoras still holds because the radius stays one, giving sin² θ + cos² θ = 1.',
        ],
        formulas: [['Point on the circle', '(x,y)=(\\cos\\theta,\\sin\\theta)'], ['Circle identity', '\\sin^2\\theta+\\cos^2\\theta=1']],
        examples: [
          ex('Find sin 150° using a reflection of 30°.', [['Reflect across the vertical axis.', '150^\\circ=180^\\circ-30^\\circ'], ['The height stays the same.', '\\sin150^\\circ=\\sin30^\\circ=0.5']], '0.5'),
          ex('Find cos 120° using the reference angle 60°.', [['The point is on the left half of the circle.', '120^\\circ=180^\\circ-60^\\circ'], ['Reverse the horizontal sign.', '\\cos120^\\circ=-\\cos60^\\circ=-0.5']], '−0.5'),
        ],
        practice: [
          pr('Find sin 90°.', 1, 'At the top of the unit circle, read the height.', 'The top has height 1, so sin 90° = 1.'),
          pr('Find sin 270°.', -1, 'At the bottom, the height is negative.', 'The bottom has height −1, so sin 270° = −1.'),
          pr('If sin θ = 0.6, find cos² θ.', 0.64, 'The question asks for the square, so no sign choice is needed.', 'cos² θ = 1 − 0.6² = 1 − 0.36 = 0.64.'),
          pr('Find cos 180°.', -1, 'Read the horizontal position at the far left.', 'The leftmost point has x = −1, so cos 180° = −1.'),
        ],
      },
      {
        title: 'Triangles without a right angle', minutes: 30,
        explain: [
          'Many real triangles have no right angle. Label each side with the lowercase letter matching its opposite angle: side a faces angle A. The cosine rule finds a third side from two sides and their included angle; at a right angle it reduces to Pythagoras.',
          'The sine rule connects opposite side-angle pairs. Use it when an opposite pair is known, while checking which angle is intended: two sides and a non-included angle can allow two different triangles. The area formula uses two sides and the angle between them.',
        ],
        formulas: [['Cosine rule', 'c^2=a^2+b^2-2ab\\cos C'], ['Sine rule', '\\frac a{\\sin A}=\\frac b{\\sin B}'], ['Area', 'A_{\\triangle}=\\frac12ab\\sin C']],
        examples: [
          ex('Two sides are 3 cm and 4 cm with included angle 60°. Find the third side.', [['Use the cosine rule.', 'c^2=3^2+4^2-2(3)(4)\\cos60^\\circ=13'], ['Take the root.', 'c=\\sqrt{13}\\approx3.6056']], '3.6056 cm'),
          ex('Two edges of a triangular metal plate are 6 cm and 8 cm with included angle 30°. Find its area.', [['Use the included angle between the known sides.', 'A=\\frac12(6)(8)\\sin30^\\circ'], ['Evaluate.', 'A=24(0.5)=12']], '12 cm²'),
        ],
        practice: [
          pr('A triangle has A = 30°, B = 90° and side b = 10 cm. Find side a in cm.', 5, 'Match each side to the angle opposite it.', 'a = 10 sin 30°/sin 90° = 5 cm.'),
          pr('Two sides are 5 cm each with included angle 60°. Third side in cm?', 5, 'Apply the cosine rule before taking a root.', 'c² = 25 + 25 − 50(0.5) = 25, so c = 5 cm.'),
          pr('A triangle has angles A = 40° and B = 65°. Find C in degrees.', 75, 'The angle sum still applies to a slanted triangle.', 'C = 180 − 40 − 65 = 75°.'),
          pr('Two sides of a triangle are 4 mm and 7 mm with included angle 90°. Area in mm²?', 14, 'Use the included-angle area rule.', '(1/2) × 4 × 7 × sin 90° = 14 mm².'),
        ],
      },
    ],
  },
  'math-009': {
    predict: {
      q: 'Choose the √x machine and feed it −2. Will it send out −√2, send out both signs of √2, or refuse? Think about which real number could square to −2.',
      options: ['It sends out −√2', 'It sends out both signs of √2', 'It sends out 2', 'It refuses this input in the real numbers'], answer: 3,
      reveal: 'It refuses. Squaring any real number gives a non-negative result, so no real square root of −2 exists. A function can exclude an input from its domain while still giving one output for every allowed input.',
    },
    parts: [
      {
        title: 'A rule with one output per allowed input', minutes: 20,
        explain: [
          'A function assigns exactly one output to each input it accepts. Write f(x) for the output at input x. The parentheses here name the input; they do not mean f multiplied by x.',
          'Different inputs may share an output. A squaring rule sends opposite inputs to the same positive square, but each input still has just one output. On a graph, any vertical line meets a function at most once.',
        ],
        formulas: [['Substitution', 'f(x)=2x+1\\quad\\Rightarrow\\quad f(a)=2a+1']],
        examples: [
          ex('For f(x) = 2x + 1, find f(3).', [['Replace x everywhere by the input.', 'f(3)=2(3)+1'], ['Calculate the output.', 'f(3)=7']], '7'),
          ex('For f(x) = x², find f(−2). Does the positive input 2 share this output?', [['Square the negative input with brackets.', 'f(-2)=(-2)^2=4'], ['Check the positive input.', 'f(2)=2^2=4']], 'Both inputs give 4'),
        ],
        practice: [
          pr('For f(x) = 3x − 4, find f(5).', 11, 'Replace the letter with five.', '3(5) − 4 = 11.'),
          pr('For f(x) = 4/x, find f(2).', 2, 'The input belongs in the denominator.', '4/2 = 2.'),
          pr('For f(x) = √x, find f(9).', 3, 'Choose the non-negative square root.', '√9 = 3.'),
          pr('For f(x) = 2x + 1, find f(−3).', -5, 'Keep the negative sign when substituting.', '2(−3) + 1 = −6 + 1 = −5.'),
        ],
      },
      {
        title: 'Domain, range and restrictions', minutes: 25,
        explain: [
          'The domain contains the allowed inputs. The range contains the outputs the function can actually give. A denominator cannot be zero, and a real square root needs a non-negative amount inside it.',
          'A physical domain may be smaller than the algebraic one: elapsed time and sample mass are usually non-negative. Always use the domain stated in the question. Restricting the inputs can also restrict the outputs.',
        ],
        formulas: [['Denominator restriction', 'f(x)=\\frac1{x-a}\\quad\\Rightarrow\\quad x\\ne a'], ['Square-root restriction', 'g(x)=\\sqrt{x-a}\\quad\\Rightarrow\\quad x\\ge a']],
        examples: [
          ex('Which input must be excluded from f(x) = 1/(x − 2)?', [['Find when the denominator would be zero.', 'x-2=0'], ['Solve for the forbidden input.', 'x=2']], 'Exclude 2'),
          ex('Find the lowest allowed input and lowest output of f(x) = √x over real numbers.', [['The amount under the root must be non-negative.', 'x\\ge0'], ['The square root is also non-negative, and zero is attained.', 'f(0)=0']], 'Both lower bounds are 0'),
        ],
        practice: [
          pr('What is the smallest real input allowed by f(x) = √(x − 3)?', 3, 'Require the amount under the root to be at least zero.', 'x − 3 ≥ 0 means x ≥ 3; the smallest input is 3.'),
          pr('Which input is excluded from f(x) = 1/(x − 4)?', 4, 'Set the denominator equal to zero.', 'x − 4 = 0 at x = 4.'),
          pr('What is the smallest output of f(x) = √x for x ≥ 0?', 0, 'A real square root is non-negative.', 'f(0) = 0 and no output is below it, so the minimum is 0.', { tol: 0.001 }),
          pr('For f(x) = x² restricted to −3 ≤ x ≤ 3, what is the largest output?', 9, 'Look for the input farthest from zero.', 'Both endpoints square to 9, and all intervening squares are at most 9.'),
        ],
      },
      {
        title: 'Combining rules and choosing their order', minutes: 25,
        explain: [
          'You can add, subtract, multiply or divide function outputs where both rules are defined; division also requires the divisor output to be non-zero. These operations act on outputs at the same input.',
          'Composition is different: one output becomes the next rule’s input. In f(g(x)), do g first because it is inside. The intermediate output must be allowed by f. Swapping the order usually changes the result.',
        ],
        formulas: [['Composition', '(f\\circ g)(x)=f(g(x))'], ['Difference of functions', '(f-g)(x)=f(x)-g(x)']],
        examples: [
          ex('Let f(x) = 2x + 1 and g(x) = x². Find f(g(3)).', [['Use the inner rule.', 'g(3)=3^2=9'], ['Feed its output into f.', 'f(9)=2(9)+1=19']], '19'),
          ex('With the same f(x) = 2x + 1 and g(x) = x², find g(f(3)).', [['Now f is inside.', 'f(3)=2(3)+1=7'], ['Square its output.', 'g(7)=7^2=49']], '49'),
        ],
        practice: [
          pr('For f(x) = 2x + 1 and g(x) = x², find f(g(2)).', 9, 'Square first.', 'g(2) = 4, then f(4) = 2(4) + 1 = 9.'),
          pr('For f(x) = 2x + 1 and g(x) = x², find g(f(2)).', 25, 'Double and add one first.', 'f(2) = 5, then g(5) = 5² = 25.'),
          pr('For f(x) = 3x and g(x) = x − 1, find f(g(4)).', 9, 'Use the inside rule before the outside rule.', 'g(4) = 3, then f(3) = 9.'),
          pr('For f(x) = 2x + 1 and g(x) = x², find (f − g)(5).', -14, 'Evaluate both rules at five, then subtract.', 'f(5) − g(5) = 11 − 25 = −14.'),
        ],
      },
      {
        title: 'Inverse rules undo a measurement', minutes: 25,
        explain: [
          'An inverse function takes an output back to the input that produced it. Undo the original operations in reverse order. The notation f⁻¹ names this undoing rule; it does not mean one divided by f.',
          'An inverse function requires each output to identify only one input. Squaring over all real numbers fails that test, since opposite inputs share an output. Restrict squaring to non-negative inputs, and its inverse is the non-negative square root.',
          'A furnace conversion is an inverse problem: the display uses one temperature scale while the treatment sheet uses another. The inverse tells you which display reading produces the required temperature.',
        ],
        formulas: [['Undo a linear rule', 'f(x)=ax+b\\quad\\Rightarrow\\quad f^{-1}(y)=\\frac{y-b}{a}\\quad(a\\ne0)'], ['Temperature conversion', 'C=\\frac59(F-32),\\quad F=\\frac95C+32']],
        examples: [
          ex('For f(x) = 2x + 1, find the input that gives output 7.', [['Undo the added one.', '2x=7-1=6'], ['Undo doubling.', 'x=6/2=3']], '3'),
          ex('A furnace must reach 850 °C. Find the corresponding display setting in °F.', [['Use the inverse conversion.', 'F=\\frac95C+32'], ['Insert the required Celsius temperature.', 'F=850(9/5)+32=1562']], '1562 °F'),
        ],
        practice: [
          pr('For f(x) = 3x + 1, which input gives output 19?', 6, 'Undo addition before multiplication.', 'x = (19 − 1)/3 = 6.'),
          pr('For f(x) = 2x − 5, which input gives output 4?', 4.5, 'Add five to both sides first.', 'x = (4 + 5)/2 = 4.5.'),
          pr('The rule f(x) = x² accepts only x ≥ 0. Which input gives output 49?', 7, 'The domain removes the negative choice.', 'x = √49 = 7.'),
          pr('Convert a furnace reading of 212 °F to °C using C = (F − 32) × 5/9.', 100, 'Subtract the offset before scaling.', '(212 − 32) × 5/9 = 180 × 5/9 = 100 °C.'),
        ],
      },
    ],
  },
  'math-010': {
    predict: {
      q: 'The spinning point draws a sine wave. You double its turning speed from 1 to 2 radians per second, leaving the circle size unchanged. What happens to the time between successive crests?',
      options: ['It doubles', 'It halves', 'It stays the same but the crests get taller', 'The wave stops repeating'], answer: 1,
      reveal: 'It halves, from 2π seconds to π seconds. The point needs the same full turn to repeat its height and direction, but now completes that turn twice as fast.',
    },
    parts: [
      {
        title: 'Measuring angles with arc lengths', minutes: 20,
        explain: [
          'Degrees divide a full turn into 360 equal parts. Radians measure the arc along a circle compared with its radius. An angle of one radian cuts an arc one radius long.',
          'A full circumference is 2π times the radius, so a full turn is 2π radians. Convert degrees by multiplying by π/180. In the arc formula, the angle must be in radians and the arc and radius must use the same length unit.',
        ],
        formulas: [['Radians', '\\theta=s/r,\\quad s=r\\theta'], ['Convert degrees', '\\theta_{\\text{rad}}=\\theta_{\\text{degrees}}\\frac{\\pi}{180}']],
        examples: [
          ex('Convert 90° to radians.', [['Use the degree-to-radian factor.', '90\\frac{\\pi}{180}=\\frac\\pi2'], ['Give a decimal if needed.', '\\frac\\pi2\\approx1.5708']], 'π/2 ≈ 1.5708 rad'),
          ex('A roller has radius 3 cm. What arc length corresponds to an angle of 2 rad?', [['Use radius times angle.', 's=r\\theta=3(2)'], ['Evaluate with length units.', 's=6\\;\\text{cm}']], '6 cm'),
        ],
        practice: [
          pr('Convert 1 radian to degrees.', 180 / Math.PI, 'Reverse the degree-to-radian factor.', '1 × 180/π ≈ 57.2958°.'),
          pr('Convert 180° to radians. Give a decimal.', Math.PI, 'A half-turn is half of 2π.', '180 × π/180 = π ≈ 3.1416 rad.'),
          pr('A circular rim has radius 2.5 cm. Arc length for 4 rad, in cm?', 10, 'Use the angle in radians directly.', 's = 2.5 × 4 = 10 cm.'),
          pr('An arc is 12 mm long on a circle of radius 3 mm. Angle in radians?', 4, 'Divide arc length by radius.', 'θ = 12/3 = 4 rad.'),
        ],
      },
      {
        title: 'Height, amplitude and the middle line', minutes: 20,
        explain: [
          'A point turning around a circle repeatedly rises and falls. Plot its height against time and you get a sine wave. The amplitude is the greatest distance from the middle line to a crest or trough.',
          'For y = A sin θ with positive A, the highest value is A and the lowest is −A. The full peak-to-trough span is twice the amplitude. Adding a constant raises the middle line without changing this distance.',
        ],
        formulas: [['Amplitude and middle line', 'y=c+A\\sin\\theta,\\quad A>0'], ['Extremes', 'y_{\\max}=c+A,\\quad y_{\\min}=c-A']],
        examples: [
          ex('A wave has amplitude 2 mm and middle line zero. Find its peak-to-trough span.', [['Find both extremes.', 'y_{\\max}=2,\\quad y_{\\min}=-2'], ['Subtract lowest from highest.', '2-(-2)=4']], '4 mm'),
          ex('Find y = 3 sin θ at θ = π/2 rad.', [['Read the unit-circle height at a quarter-turn.', '\\sin(\\pi/2)=1'], ['Scale the height.', 'y=3(1)=3']], '3'),
        ],
        practice: [
          pr('For y = 4 sin t mm, what is the amplitude in mm?', 4, 'Read the positive multiplier of sine.', 'The greatest distance from the middle line is 4 mm.'),
          pr('A vibration ranges from −1 mm to 5 mm. Peak-to-trough span in mm?', 6, 'Subtract the minimum from the maximum.', '5 − (−1) = 6 mm.'),
          pr('A vibration ranges from 2 mm to 8 mm. Amplitude in mm?', 3, 'Take half the full span.', '(8 − 2)/2 = 3 mm.'),
          pr('For y = 0.5 sin θ mm, find y at θ = 3π/2 rad, in mm.', -0.5, 'At three quarters of a turn, sine is negative one.', '0.5 × (−1) = −0.5 mm.'),
        ],
      },
      {
        title: 'Period, frequency and angular speed', minutes: 25,
        explain: [
          'The period is the time for one full cycle. Frequency counts cycles per second, measured in hertz. They are reciprocals: short cycles mean more cycles fit into each second.',
          'Angular speed ω counts radians per second. One cycle needs 2π radians, so divide 2π by ω to find the period. This connects a rotating point to vibration in a machine frame. Changing amplitude alone does not change the period of the stated sine rule.',
        ],
        formulas: [['Period and frequency', 'T=\\frac{2\\pi}{\\omega},\\quad f=\\frac1T=\\frac\\omega{2\\pi}']],
        examples: [
          ex('For y = sin(2t), with t in seconds, find the period.', [['Read the angular speed.', '\\omega=2\\;\\text{rad/s}'], ['Divide one full turn by the speed.', 'T=2\\pi/2=\\pi\\approx3.1416\\;\\text{s}']], 'π ≈ 3.1416 s'),
          ex('A steel-frame vibration is y = 0.5 sin(100πt) mm, with t in seconds. Find its frequency.', [['Read angular speed, keeping the π.', '\\omega=100\\pi\\;\\text{rad/s}'], ['Convert radians per second to cycles per second.', 'f=100\\pi/(2\\pi)=50']], '50 Hz'),
        ],
        practice: [
          pr('For y = sin(4t) with t in seconds, find the period in s.', Math.PI / 2, 'One cycle requires 2π radians.', 'T = 2π/4 = π/2 ≈ 1.5708 s.'),
          pr('A vibration period is 0.02 s. Frequency in Hz?', 50, 'Take the reciprocal of the period.', 'f = 1/0.02 = 50 Hz.'),
          pr('A vibration frequency is 25 Hz. Period in s?', 0.04, 'How long does one of the 25 cycles take?', 'T = 1/25 = 0.04 s.'),
          pr('A spinning point turns at π rad/s. Period in s?', 2, 'Divide the radians in a turn by radians per second.', 'T = 2π/π = 2 s.'),
        ],
      },
      {
        title: 'Starting phase and shifted waves', minutes: 25,
        explain: [
          'Phase says where in the cycle a wave begins. In y = A sin(ωt + φ), φ is the starting angle. At t = 0 the height is A sin φ. Adding a quarter-turn starts the point at the top, producing a cosine wave.',
          'A positive phase advances a wave and a negative phase delays it. To find a time for a chosen height, first find a suitable angle on the circle, then solve for time. Sine repeats, so specify which occurrence you want.',
        ],
        formulas: [['Wave with phase', 'y=c+A\\sin(\\omega t+\\varphi)'], ['Quarter-turn identity', '\\sin(\\theta+\\pi/2)=\\cos\\theta']],
        examples: [
          ex('For y = 2 sin(t + π/2) mm, find the starting height.', [['Set time to zero.', 'y(0)=2\\sin(\\pi/2)'], ['Read the top of the circle.', 'y(0)=2']], '2 mm'),
          ex('For y = 2 sin(t + π) mm, find the starting height.', [['Set time to zero.', 'y(0)=2\\sin\\pi'], ['At half a turn the height is zero.', 'y(0)=0']], '0 mm'),
        ],
        practice: [
          pr('For y = sin(2t − π/2), with t in seconds, when is the first zero at t ≥ 0? Give s.', Math.PI / 4, 'The starting angle is −π/2; the next zero is angle zero.', '2t − π/2 = 0, so t = π/4 ≈ 0.7854 s.'),
          pr('For y = 3 cos t mm, find y at t = 0.', 3, 'Cosine starts at the rightmost point of the circle.', 'cos 0 = 1, so y = 3 mm.'),
          pr('For y = −2 sin t mm, find y at t = π/2.', -2, 'The leading minus reverses the height.', '−2 sin(π/2) = −2 mm.'),
          pr('For y = 2 + 3 sin t mm, find the greatest height in mm.', 5, 'The sine term is largest when sine equals one.', 'The greatest height is 2 + 3 = 5 mm.'),
        ],
      },
    ],
  },
  'math-011': {
    predict: {
      q: 'Two force arrows each have size 5 N. You can turn them freely in the scene. What is the smallest possible size of their sum: can two non-zero pulls leave no combined pull at all?',
      options: ['10 N', '5 N', '0 N', 'About 7.07 N'], answer: 2,
      reveal: 'They can sum to 0 N. Point equal forces in opposite directions and their horizontal and vertical parts cancel. The sizes alone do not determine the combined force.',
    },
    parts: [
      {
        title: 'An arrow has components and magnitude', minutes: 25,
        explain: [
          'A scalar has a size, such as mass or temperature. A vector also has direction, such as a force or a displacement. Its horizontal and vertical components are signed amounts along perpendicular axes.',
          'Measure a vector angle anticlockwise from the positive horizontal axis. Cosine gives its horizontal part and sine its vertical part. Pythagoras recovers the magnitude from the parts, including in three dimensions. The magnitude is never negative.',
          'A unit vector has magnitude one and keeps only the direction. Divide every component by the original non-zero magnitude to make one.',
        ],
        formulas: [['Components from an angle', '(F_x,F_y)=(F\\cos\\theta,F\\sin\\theta)'], ['Magnitude in space', '|\\vec v|=\\sqrt{v_x^2+v_y^2+v_z^2}'], ['Unit direction', '\\hat v=\\vec v/|\\vec v|\\quad(|\\vec v|\\ne0)']],
        examples: [
          ex('A force has components (3, 4) N. Find its magnitude.', [['Use perpendicular components as triangle legs.', '|\\vec F|^2=3^2+4^2=25'], ['Take the positive root.', '|\\vec F|=5']], '5 N'),
          ex('A 10 N force points 60° above the positive horizontal axis. Find its horizontal component.', [['Use cosine for the horizontal part.', 'F_x=10\\cos60^\\circ'], ['Evaluate.', 'F_x=10(0.5)=5']], '5 N'),
        ],
        practice: [
          pr('Find the magnitude of (5, 12) N, in N.', 13, 'Use Pythagoras.', '√(25 + 144) = 13 N.'),
          pr('An 8 N force points 30° above the horizontal. Vertical component in N?', 4, 'Use sine for the vertical part.', '8 sin 30° = 8 × 0.5 = 4 N.'),
          pr('A 6 N force points at 180° from the positive horizontal axis. Horizontal component in N?', -6, 'At half a turn the direction is left.', '6 cos 180° = 6(−1) = −6 N.'),
          pr('Find the magnitude of the three-dimensional displacement (2, 3, 6) mm, in mm.', 7, 'Add the squares of all three components.', '√(4 + 9 + 36) = √49 = 7 mm.'),
        ],
      },
      {
        title: 'Adding and subtracting arrows', minutes: 25,
        explain: [
          'Place the tail of the second arrow at the tip of the first. The arrow from the starting tail to the final tip is the sum, or resultant. Sliding an arrow without turning or stretching it preserves the vector.',
          'In components, add horizontal to horizontal and vertical to vertical. Subtraction adds the reversed second arrow. Only when arrows point in the same direction can you simply add their magnitudes to get the resultant magnitude.',
        ],
        formulas: [['Vector sum', '\\vec a+\\vec b=(a_x+b_x,\\;a_y+b_y)'], ['Vector difference', '\\vec a-\\vec b=(a_x-b_x,\\;a_y-b_y)']],
        examples: [
          ex('Add (2, −1) N and (4, 5) N.', [['Add horizontal parts.', 'R_x=2+4=6'], ['Add vertical parts.', 'R_y=-1+5=4']], '(6, 4) N'),
          ex('A journey goes 3 m east and then 4 m north. Find the displacement magnitude.', [['Use the combined components.', '\\vec d=(3,4)\\;\\text{m}'], ['Find the straight distance from start to finish.', '|\\vec d|=\\sqrt{3^2+4^2}=5']], '5 m'),
        ],
        practice: [
          pr('Find the horizontal component of (3, 2) + (−3, 5), in N if both are forces in N.', 0, 'Add only the horizontal parts.', '3 + (−3) = 0 N.', { tol: 0.001 }),
          pr('Find the vertical component of (2, 4) − (1, 7) N, in N.', -3, 'Subtract the second vertical component.', '4 − 7 = −3 N.'),
          pr('Add forces (3, 0) N and (0, 4) N. Resultant magnitude in N?', 5, 'Add components first, then find magnitude.', 'The sum is (3, 4) N, with magnitude √25 = 5 N.'),
          pr('Two 5 N forces act at right angles. Resultant magnitude in N?', Math.sqrt(50), 'The force magnitudes are the legs of a right triangle.', '√(5² + 5²) = √50 ≈ 7.0711 N.'),
        ],
      },
      {
        title: 'Cancellation and balanced forces', minutes: 25,
        explain: [
          'Equal opposite vectors cancel. In a balanced force system, all the horizontal components add to zero and all the vertical components add to zero. The balancing force is the negative of the resultant of the other forces.',
          'Forces need not vanish individually for the resultant to vanish. Symmetric supports often cancel their sideways pulls while their upward parts add. A zero resultant means zero acceleration; an object may still move at constant velocity.',
        ],
        formulas: [['Force balance', '\\sum F_x=0,\\quad\\sum F_y=0'], ['Balancing force', '\\vec F_{\\text{balance}}=-(\\vec F_1+\\vec F_2)']],
        examples: [
          ex('Two 5 N forces point along the same line in opposite directions. Find the resultant magnitude.', [['Choose one direction as positive.', 'R_x=5+(-5)=0'], ['There is no perpendicular component either.', '|\\vec R|=0']], '0 N'),
          ex('Two cables pull on a steel beam with 800 N each at 30° and 150° from the positive horizontal. Find the combined upward force.', [['Each cable supplies the same upward part.', 'F_y=800\\sin30^\\circ=400\\;\\text{N}'], ['Add upward parts; sideways parts cancel by symmetry.', 'R_y=400+400=800']], '800 N upward'),
        ],
        practice: [
          pr('Forces of 6 N right and 2 N left act on a point. Resultant horizontal component in N, right positive?', 4, 'Give the leftward force a negative sign.', '6 − 2 = 4 N.'),
          pr('Two forces are (3, 2) N and (4, −1) N. What horizontal component must a third force have to balance them, in N?', -7, 'Reverse their combined horizontal component.', 'The known horizontal sum is 3 + 4 = 7 N, so the balancing component is −7 N.'),
          pr('Two forces have vertical components 2 N and −5 N. Balancing vertical component in N?', 3, 'Find the existing vertical sum and reverse it.', 'The sum is −3 N, so the balancing component is +3 N.'),
          pr('Two 5 N forces point at 60° above and below the positive horizontal axis. Resultant horizontal component in N?', 5, 'Their vertical parts cancel; add the horizontal parts.', '2 × 5 cos 60° = 2 × 5 × 0.5 = 5 N.'),
        ],
      },
      {
        title: 'Dot products, work and projection', minutes: 30,
        explain: [
          'The dot product measures how much two vectors point along each other. Multiply matching components and add. The result is a scalar, rather than an arrow. It is positive for acute angles, zero at right angles and negative for obtuse angles.',
          'Work is force dotted with displacement. A force perpendicular to the motion does no work along that motion. For a constant force in N and displacement in m, the work is in joules.',
          'To find a signed component along a chosen non-zero direction vector, dot with its unit vector. This projection can be negative: the vector then points partly against the chosen direction.',
        ],
        formulas: [['Dot product', '\\vec a\\cdot\\vec b=a_xb_x+a_yb_y=|\\vec a||\\vec b|\\cos\\theta'], ['Work', 'W=\\vec F\\cdot\\vec d'], ['Signed projection', '\\operatorname{comp}_{\\vec b}\\vec a=\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}']],
        examples: [
          ex('Find (2, 3) · (4, −1).', [['Multiply matching parts.', '2(4)=8,\\quad3(-1)=-3'], ['Add.', '8-3=5']], '5'),
          ex('A constant 10 N force makes 60° with a 3 m displacement. Find the work.', [['Use the angle form of the dot product.', 'W=10(3)\\cos60^\\circ'], ['Evaluate in joules.', 'W=30(0.5)=15']], '15 J'),
        ],
        practice: [
          pr('Find (3, 4) · (4, −3).', 0, 'Multiply matching components before adding.', '3(4) + 4(−3) = 12 − 12 = 0.', { tol: 0.001 }),
          pr('Find (2, −1) · (5, 2).', 8, 'Keep the sign in the second product.', '2(5) + (−1)(2) = 10 − 2 = 8.'),
          pr('A constant force (6, 8) N moves through displacement (2, 1) m. Work in J?', 20, 'Dot force with displacement.', 'W = 6(2) + 8(1) = 12 + 8 = 20 J.'),
          pr('Find the signed projection of a = (6, 8) along b = (3, 4).', 10, 'Divide a · b by the magnitude of b.', '(6 × 3 + 8 × 4)/√(3² + 4²) = 50/5 = 10.'),
        ],
      },
    ],
  },
};
