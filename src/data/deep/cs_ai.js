// Computer Science program, Artificial Intelligence track (ai-001 to ai-014):
// each class split into three parts. Every number below was worked out by hand
// and checked with a short script; toy numbers are labelled as toy numbers.

// One-move examples get a closing step that states the result in words.
const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const CS_AI = {
  'ai-001': {
    predict: {
      q: 'A single neuron draws one straight line to split its inputs into “yes” and “no”. It can learn AND and OR. Can it learn XOR (yes when exactly one input is 1)?',
      options: ['No, never, however long it trains', 'Yes, it just needs more examples', 'Yes, with a smaller learning rate', 'Only if the inputs are shuffled'],
      answer: 0,
      reveal: 'The two “yes” points of XOR sit on opposite corners of the square. No single straight line puts both on one side and both “no” points on the other, so training goes round in circles for ever.',
    },
    parts: [
      {
        title: 'A neuron as a weighted vote',
        minutes: 20,
        explain: [
          'An artificial neuron takes some numbers in, multiplies each by a weight, adds them up with a bias, and fires (outputs 1) if the total is above 0. Otherwise it outputs 0.',
          'The weights say how much each input matters, and in which direction. A big positive weight means “this input pushes me to say yes”; a negative weight pushes towards no. The bias is the neuron’s mood before it sees anything.',
          'McCulloch and Pitts described such a unit in 1943 as a simplified brain cell. Rosenblatt’s perceptron (1958) added the important part: a rule for learning the weights from examples.',
        ],
        formulas: [['The neuron', 'z = w_1x_1 + w_2x_2 + b,\\qquad y = \\begin{cases}1 & z > 0\\\\ 0 & z \\le 0\\end{cases}']],
        examples: [
          ex('Weights w₁ = 2, w₂ = −1, bias b = −1. Input (1, 0). What does the neuron output?', [['Weighted sum.', 'z = 2(1) + (-1)(0) - 1 = 1'], ['Is it above 0?', '1 > 0 \\Rightarrow y = 1']], 'It fires: output 1'),
          ex('Same neuron, input (1, 1). Output?', [['Weighted sum.', 'z = 2 - 1 - 1 = 0'], ['0 is not above 0.', 'y = 0']], 'Output 0'),
        ],
        practice: [
          pr('w₁ = 3, w₂ = 2, b = −4. What is z for the input (1, 1)?', 1, 'Multiply, add, then add the bias.', '3 + 2 − 4 = 1.'),
          pr('Same neuron, input (0, 1). Output (0 or 1)?', 0, 'z = 2 − 4.', 'z = −2, not above 0, so the output is 0.'),
          pr('Weights w₁ = w₂ = 1. What is the largest whole-number bias b that makes this neuron compute AND (fires only for (1, 1))?', -1, '(1, 1) must give z > 0, while (1, 0) must give z ≤ 0.', '(1, 0) gives 1 + b ≤ 0, so b ≤ −1; (1, 1) gives 2 + b > 0, so b > −2. The largest whole number is −1.'),
          pr('With w₁ = w₂ = 1 and b = −0.5, for how many of the four inputs (0,0), (0,1), (1,0), (1,1) does the neuron fire?', 3, 'Work out z for each.', 'z = −0.5, 0.5, 0.5, 1.5: three are above 0. This neuron computes OR.'),
        ],
      },
      {
        title: 'The perceptron learning rule',
        minutes: 20,
        explain: [
          'Rosenblatt’s rule learns from mistakes only. Show one example. If the output y equals the target t, change nothing. If it is wrong, move every weight by η (t − y) times its input.',
          'If the neuron said 0 but should have said 1, (t − y) = 1 and the weights of the inputs that were on grow, so next time the sum is bigger. If it said 1 but should have said 0, they shrink. The bias moves the same way, as if it had an input that is always 1.',
          'Rosenblatt proved that if a straight line can separate the examples, the rule finds one in a limited number of mistakes.',
        ],
        formulas: [['The update', 'w_i \\leftarrow w_i + \\eta\\,(t - y)\\,x_i,\\qquad b \\leftarrow b + \\eta\\,(t - y)']],
        examples: [
          ex('w = (0, 0), b = 0, η = 0.5. Example (1, 1) with target 1. The neuron outputs 0. New weights?', [['Error.', 't - y = 1 - 0 = 1'], ['Each weight gains 0.5 × 1 × 1.', 'w = (0.5, 0.5)'], ['Bias gains 0.5.', 'b = 0.5']], 'w = (0.5, 0.5), b = 0.5'),
          ex('Now w = (0.5, 0.5), b = 0.5. Example (0, 0) with target 0. What happens?', [['Sum.', 'z = 0.5 > 0 \\Rightarrow y = 1'], ['Error.', 't - y = -1'], ['Inputs are 0, so only the bias moves.', 'b = 0.5 - 0.5 = 0']], 'Weights stay (0.5, 0.5); bias becomes 0'),
        ],
        practice: [
          pr('w = (1, 1), b = 0, η = 0.5. Example (1, 0) with target 0. What is w₁ after the update?', 0.5, 'First check what the neuron outputs: z = 1.', 'y = 1, t − y = −1, w₁ = 1 − 0.5 × 1 = 0.5.'),
          pr('In the same update, what is w₂ afterwards?', 1, 'The second input was 0.', 'w₂ changes by 0.5 × (−1) × 0 = 0, so it stays 1.'),
          pr('A neuron gives the right answer. By how much does each weight change?', 0, 't − y is 0.', 'No mistake, no change: 0.'),
          pr('η = 0.2, input (1, 1, 1) including the bias input, the neuron said 0 but the target was 1. By how much does the sum z grow for this same input after the update?', 0.6, 'Each of the three weights grows by 0.2.', 'Each of the three terms grows by 0.2 × 1, so z grows by 0.6.'),
        ],
      },
      {
        title: 'Lines, XOR and the case for layers',
        minutes: 20,
        explain: [
          'With two inputs, the place where z = 0 is a straight line. Everything on one side fires, everything on the other does not. A single neuron can only ever learn rules where a line separates the yes-cases from the no-cases.',
          'XOR fails this test. Minsky and Papert set out such limits carefully in their 1969 book “Perceptrons”, and funding for neural networks fell for over a decade.',
          'The cure is to stack neurons. XOR = (x₁ OR x₂) AND NOT (x₁ AND x₂): two neurons in a hidden layer compute OR and AND, and a third combines them. The problem then was how to train the hidden layer, which waited for backpropagation (ai-003).',
        ],
        formulas: [['The dividing line', 'w_1x_1 + w_2x_2 + b = 0 \\;\\Rightarrow\\; x_2 = -\\tfrac{w_1}{w_2}x_1 - \\tfrac{b}{w_2}']],
        examples: [
          ex('w = (1, 1), b = −1.5. Where does the dividing line cross the x₂ axis (x₁ = 0)?', [['Set x₁ = 0 in the line.', 'x_2 + 0 - 1.5 = 0'], ['Solve.', 'x_2 = 1.5']], 'At x₂ = 1.5'),
          ex('Build XOR from h₁ = OR(x) and h₂ = AND(x). Output neuron: weights (1, −2), bias −0.5. Check the input (1, 1).', [['Hidden layer.', 'h_1 = 1,\\; h_2 = 1'], ['Output sum.', 'z = 1 - 2 - 0.5 = -1.5'], ['Not above 0.', 'y = 0']], 'Output 0, correct for XOR'),
        ],
        practice: [
          pr('w = (2, 4), b = −4. What is the slope of the dividing line?', -0.5, 'Slope = −w₁ / w₂.', '−2 / 4 = −0.5.'),
          pr('Same neuron. Where does the line cross the x₂ axis?', 1, 'Set x₁ = 0: 4x₂ − 4 = 0.', 'x₂ = 1.'),
          pr('In the XOR network above, what is the output neuron’s sum z for input (1, 0)?', 0.5, 'h₁ = 1, h₂ = 0.', 'z = 1 − 0 − 0.5 = 0.5, so it fires: correct.'),
          pr('How many of the 16 possible two-input yes/no rules can a single neuron NOT learn?', 2, 'Only XOR and its opposite (XNOR) need a curved or double boundary.', 'XOR and XNOR: 2 rules.'),
        ],
      },
    ],
  },

  'ai-002': {
    predict: {
      q: 'You walk downhill on a curve, each step equal to the learning rate times the slope. What happens if the learning rate is too big?',
      options: ['You jump past the bottom, further each time, and run away', 'You arrive faster, with no downside', 'You stop moving', 'You always land exactly on the bottom'],
      answer: 0,
      reveal: 'Each step overshoots. Above a certain size the overshoot grows every step and the loss explodes. Too small and you crawl. Choosing it well is one of the first jobs in training.',
    },
    parts: [
      {
        title: 'Loss: a number for how wrong a model is',
        minutes: 20,
        explain: [
          'To train a model we need one number that says how badly it is doing: the loss. A common choice is the mean squared error, the average of (prediction − truth)² over the examples.',
          'Squaring makes every error count as positive and punishes big errors more than small ones. A model with loss 0 gets every example exactly right.',
          'Training means changing the weights to make the loss smaller. Every learning method in this track, from the perceptron to today’s largest models, is some version of this.',
        ],
        formulas: [['Mean squared error', '\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n}(\\hat y_i - y_i)^2']],
        examples: [
          ex('A model predicts 3, 5, 4 where the truths are 2, 5, 7. MSE?', [['Errors.', '1,\\; 0,\\; -3'], ['Squares.', '1,\\; 0,\\; 9'], ['Average.', '10 / 3 \\approx 3.33']], 'MSE ≈ 3.33'),
          ex('Model ŷ = w·x with one example x = 2, y = 6. Loss as a function of w?', [['Prediction.', '\\hat y = 2w'], ['Squared error.', 'L(w) = (2w - 6)^2']], 'L(w) = (2w − 6)², smallest (0) at w = 3'),
        ],
        practice: [
          pr('Predictions 10, 12; truths 11, 15. What is the MSE?', 5, 'Errors −1 and −3.', '(1 + 9) / 2 = 5.'),
          pr('Errors of 2 and of 4: how many times more does the 4 add to the squared-error total?', 4, 'Compare 4² with 2².', '16 / 4 = 4.'),
          pr('Model ŷ = w·x, one example x = 3, y = 12. At what w is the loss 0?', 4, '3w = 12.', 'w = 4.'),
          pr('Same example. What is the loss at w = 2?', 36, '(3 × 2 − 12)².', '(6 − 12)² = 36.'),
        ],
      },
      {
        title: 'Following the slope downhill',
        minutes: 25,
        explain: [
          'The slope (derivative) of the loss tells you which way is uphill. Gradient descent steps the other way: new w = old w − η × slope. The step size η is the learning rate.',
          'Cauchy described this method in 1847 for solving equations from astronomy. With many weights the “slope” becomes the gradient, a list of slopes, one per weight, and each weight steps by its own slope.',
          'Near the bottom the slope gets small, so the steps shrink by themselves. For the curve L = (w − 3)² + 1 the slope is 2(w − 3), and every step multiplies the gap to 3 by (1 − 2η).',
        ],
        formulas: [['Gradient descent', 'w \\leftarrow w - \\eta\\,\\frac{dL}{dw}'], ['For L = (w-3)^2 + 1', '\\frac{dL}{dw} = 2(w - 3),\\quad \\text{gap} \\times (1 - 2\\eta)']],
        examples: [
          ex('L = (w − 3)² + 1, start w = −0.5, η = 0.1. Where is w after one step?', [['Slope.', '2(-0.5 - 3) = -7'], ['Step.', 'w = -0.5 - 0.1(-7) = 0.2']], 'w = 0.2'),
          ex('Same curve, start w = −0.5, η = 0.25. After one step?', [['Gap multiplier.', '1 - 2(0.25) = 0.5'], ['Gap was 3.5, now 1.75.', 'w = 3 - 1.75 = 1.25']], 'w = 1.25'),
        ],
        practice: [
          pr('L = (w − 3)² + 1. What is the slope at w = 5?', 4, '2(w − 3).', '2 × 2 = 4.'),
          pr('From w = 5 with η = 0.25, where is w after one step?', 4, 'w − η × slope.', '5 − 0.25 × 4 = 4.'),
          pr('Which learning rate lands on w = 3 in exactly one step, from anywhere?', 0.5, 'Make the gap multiplier 1 − 2η equal 0.', 'η = 0.5.'),
          pr('From w = 1 with η = 0.1, what is w after two steps?', 1.72, 'The gap 2 is multiplied by 0.8 each step.', 'Gap 2 → 1.6 → 1.28, so w = 3 − 1.28 = 1.72.'),
        ],
      },
      {
        title: 'Step size, divergence and noisy steps',
        minutes: 20,
        explain: [
          'If 1 − 2η is between −1 and 1, the gap shrinks and training settles. Between 0 and 1 it shrinks smoothly; between −1 and 0 it zigzags across the bottom. If η is above 1 here, |1 − 2η| > 1 and the gap grows every step.',
          'Real models have millions of examples. Computing the exact slope over all of them for every step is too slow, so stochastic gradient descent (Robbins and Monro, 1951) uses a small random batch. The step is noisy but cheap, and on average points downhill.',
          'Modern methods such as Adam (2014) also adjust the step for each weight separately, but the core is the same downhill step.',
        ],
        formulas: [['When it settles', '|1 - 2\\eta| < 1 \\iff 0 < \\eta < 1 \\quad (\\text{for this curve})']],
        examples: [
          ex('η = 0.9 on L = (w − 3)² + 1, start gap 3.5. Gap after one step?', [['Multiplier.', '1 - 1.8 = -0.8'], ['New gap.', '3.5 \\times (-0.8) = -2.8']], 'Gap −2.8: it jumped to the other side, but closer'),
          ex('η = 1.1, start gap 3.5. Gap after two steps?', [['Multiplier.', '1 - 2.2 = -1.2'], ['Two steps.', '3.5 \\times 1.44 = 5.04']], 'Gap 5.04: growing, so training diverges'),
        ],
        practice: [
          pr('η = 0.4 on the same curve. By what number is the gap multiplied each step?', 0.2, '1 − 2η.', '1 − 0.8 = 0.2.'),
          pr('η = 1.5. By what number is the gap multiplied each step?', -2, '1 − 2η.', '1 − 3 = −2: it doubles in size each step and flips side.'),
          pr('A data set has 1,000,000 examples and batches of 100. How many steps make one full pass (an “epoch”)?', 10000, 'Divide.', '1,000,000 / 100 = 10,000 steps.'),
          pr('With η = 0.25 and starting gap 8, after how many steps is the gap first below 1?', 4, 'The gap halves each step.', '8 → 4 → 2 → 1 → 0.5: below 1 after 4 steps.'),
        ],
      },
    ],
  },

  'ai-003': {
    predict: {
      q: 'A network has a million weights. To know how each one affects the loss, roughly how many passes through the network do you need?',
      options: ['About two: one forward, one backward', 'A million, one per weight', 'A thousand', 'You cannot know'],
      answer: 0,
      reveal: 'Backpropagation runs forward once to get the values, then backward once to get every slope, reusing shared pieces with the chain rule. The cost is about twice a forward pass, whatever the number of weights.',
    },
    parts: [
      {
        title: 'Networks as chains of simple steps',
        minutes: 20,
        explain: [
          'A network is a long chain of simple operations: multiply by a weight, add, apply a squashing function, and so on. Running it from input to loss is the forward pass.',
          'To train it we need the slope of the loss for every weight. Nudging each weight in turn and re-running the network would work, but with a million weights it would take a million runs.',
          'Write down each intermediate value on the forward pass. They are exactly what the backward pass needs.',
        ],
        formulas: [['A tiny network', 'z = wx + b,\\qquad L = (z - t)^2']],
        examples: [
          ex('x = 2, w = 3, b = 1, target t = 5. Forward pass: z and L?', [['Weighted input.', 'wx = 6'], ['Add the bias.', 'z = 7'], ['Loss.', 'L = (7 - 5)^2 = 4']], 'z = 7, L = 4'),
          ex('Same, but w = 2.5. Forward pass?', [['z.', 'z = 5 + 1 = 6'], ['Loss.', 'L = (6-5)^2 = 1']], 'z = 6, L = 1'),
        ],
        practice: [
          pr('x = 3, w = 2, b = −1, t = 4. What is z?', 5, 'wx + b.', '6 − 1 = 5.'),
          pr('Same. What is the loss L = (z − t)²?', 1, 'z − t = 1.', '1² = 1.'),
          pr('x = 1, w = 0.5, b = 0.5, t = 3. What is L?', 4, 'z = 1.', '(1 − 3)² = 4.'),
          pr('A network has 3 layers of 100 × 100 weights. How many weights is that?', 30000, 'Each layer: 100 × 100.', '3 × 10,000 = 30,000.'),
        ],
      },
      {
        title: 'The chain rule, backwards',
        minutes: 25,
        explain: [
          'Start at the loss and walk back. ∂L/∂z says how much L changes when z changes a little. For L = (z − t)² it is 2(z − t).',
          'z = wx + b changes by x when w changes by 1, and by 1 when b changes by 1. The chain rule multiplies along the path: ∂L/∂w = ∂L/∂z × x, and ∂L/∂b = ∂L/∂z × 1.',
          'The piece ∂L/∂z is computed once and reused for every weight that feeds into z. In a deep network this reuse, layer after layer, is what makes the backward pass cheap. Linnainmaa described it in 1970; Rumelhart, Hinton and Williams showed in 1986 that it trains hidden layers.',
        ],
        formulas: [['Chain rule', '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial z}\\cdot\\frac{\\partial z}{\\partial w} = 2(z - t)\\cdot x']],
        examples: [
          ex('x = 2, w = 3, b = 1, t = 5 (so z = 7). Find ∂L/∂w and ∂L/∂b.', [['Start at the loss.', '\\partial L/\\partial z = 2(7 - 5) = 4'], ['Times x for w.', '\\partial L/\\partial w = 4 \\times 2 = 8'], ['Times 1 for b.', '\\partial L/\\partial b = 4']], '∂L/∂w = 8, ∂L/∂b = 4'),
          ex('One gradient step with η = 0.0625 on w. New w and new loss?', [['Step.', 'w = 3 - 0.0625 \\times 8 = 2.5'], ['New z.', 'z = 6'], ['New loss.', 'L = 1']], 'w = 2.5, loss falls from 4 to 1'),
        ],
        practice: [
          pr('x = 3, w = 2, b = −1, t = 4 (z = 5). What is ∂L/∂z?', 2, '2(z − t).', '2 × 1 = 2.'),
          pr('Same. What is ∂L/∂w?', 6, 'Multiply by x.', '2 × 3 = 6.'),
          pr('Same. What is ∂L/∂b?', 2, 'Multiply by 1.', '2.'),
          pr('With η = 0.1, what is w after one step?', 1.4, 'w − η × 6.', '2 − 0.6 = 1.4.'),
          pr('If z = t exactly, what is ∂L/∂w?', 0, '2(z − t) = 0.', 'Zero: a perfect answer gives no push.'),
        ],
      },
      {
        title: 'Deeper chains and vanishing slopes',
        minutes: 20,
        explain: [
          'With hidden layers the chain gets longer: the slope for an early weight is a product of many factors, one per layer it passes through.',
          'If those factors are small (the old sigmoid squashing function has a slope of at most 0.25), the product shrinks towards 0 and early layers barely learn: the vanishing gradient problem. If they are large, the slopes explode.',
          'Fixes that made deep networks trainable include the ReLU function (slope exactly 1 for positive inputs), careful starting weights, and shortcuts that skip layers (residual networks, 2015).',
        ],
        formulas: [['A long chain', '\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial a_n}\\cdot\\frac{\\partial a_n}{\\partial a_{n-1}}\\cdots\\frac{\\partial a_2}{\\partial w_1}']],
        examples: [
          ex('A slope passes back through 10 layers, each multiplying it by 0.25. What fraction is left?', [['Multiply ten times.', '0.25^{10}'], ['Work it out.', '\\approx 9.5 \\times 10^{-7}']], 'Less than one millionth: it vanishes'),
          ex('Same with ReLU layers on positive inputs (factor 1).', [['Multiply.', '1^{10} = 1']], 'All of it survives'),
        ],
        practice: [
          pr('A slope passes back through 3 layers that multiply it by 0.5 each. What fraction is left?', 0.125, '0.5³.', '0.125.'),
          pr('Through 4 layers that multiply it by 2 each, by what factor has it grown?', 16, '2⁴.', '16: exploding.'),
          pr('What is the slope of ReLU(z) = max(0, z) at z = 3?', 1, 'For positive z, ReLU(z) = z.', 'Slope 1.'),
          pr('What is the slope of ReLU at z = −2?', 0, 'For negative z, ReLU is flat at 0.', 'Slope 0.'),
        ],
      },
    ],
  },

  'ai-004': {
    predict: {
      q: 'A curve with 10 adjustable numbers passes exactly through all 10 measurements. Will it predict the NEXT measurement well?',
      options: ['Probably not: it has fitted the noise too', 'Yes, zero error means a perfect model', 'Yes, more numbers are always better', 'It depends only on the computer'],
      answer: 0,
      reveal: 'Hitting every training point exactly usually means the curve has bent itself around the random errors. Between and beyond the points it swings wildly, so new measurements are predicted badly.',
    },
    parts: [
      {
        title: 'Training error and test error',
        minutes: 20,
        explain: [
          'The training error is how wrong the model is on the examples it learned from. The test error is how wrong it is on examples it has never seen. Only the test error tells you how useful the model will be.',
          'So before training, put some data aside: a test set. Never use it to choose anything. Often a third set, the validation set, is used to choose settings such as the polynomial degree.',
          'A model that is too simple has high error on both (underfitting). A model that is too flexible has low training error and high test error (overfitting).',
        ],
        formulas: [['The gap', '\\text{generalisation gap} = \\text{test error} - \\text{training error}']],
        examples: [
          ex('1,000 labelled photos; keep 20% for testing. How many are used for training?', [['Test set.', '0.2 \\times 1000 = 200'], ['The rest.', '1000 - 200 = 800']], '800 for training, 200 for testing'),
          ex('Model A: train 0.10, test 0.12. Model B: train 0.01, test 0.30. Which to use?', [['Gap of A.', '0.02'], ['Gap of B.', '0.29'], ['Judge on test error.', '0.12 < 0.30']], 'Model A'),
        ],
        practice: [
          pr('5,000 examples, 10% for testing. How many training examples?', 4500, '10% of 5,000 is 500.', '4,500.'),
          pr('Train error 0.05, test error 0.20. What is the generalisation gap?', 0.15, 'Test minus train.', '0.15.'),
          ch('Which model would you deploy?', ['Train 0.20, test 0.22', 'Train 0.00, test 0.40', 'Train 0.30, test 0.45', 'Train 0.10, test 0.50'], 'Look only at the test column.', 'The lowest test error, 0.22, wins.'),
          pr('A polynomial of degree d has d + 1 numbers to fit. How many does degree 9 have?', 10, 'd + 1.', '10: enough to pass through 10 points.'),
        ],
      },
      {
        title: 'Too simple, too flexible',
        minutes: 20,
        explain: [
          'Von Neumann joked: “with four parameters I can fit an elephant, and with five I can make him wiggle his trunk.” Enough adjustable numbers can match any data, including its noise.',
          'As flexibility grows, training error only falls. Test error falls at first (the model captures the real pattern) and then rises (it starts memorising noise). The best model sits near the bottom of the test-error curve.',
          'More data helps: noise in 10 points is easy to memorise, noise in 10,000 points is not.',
        ],
        formulas: [['Error split', '\\text{expected test error} = \\text{bias}^2 + \\text{variance} + \\text{noise}']],
        examples: [
          ex('Degrees 1, 3 and 9 have test errors 0.32, 0.06, 0.95. Which degree is best?', [['Compare test errors.', '0.06 < 0.32 < 0.95']], 'Degree 3'),
          ex('Measurement noise has a standard deviation of 0.3. What is the lowest test MSE any model can expect?', [['Noise cannot be predicted.', '\\text{noise} = 0.3^2'], ['Work it out.', '0.09']], 'About 0.09'),
        ],
        practice: [
          pr('Noise standard deviation 0.5. What is the smallest test MSE any model can expect?', 0.25, 'Square it.', '0.5² = 0.25.'),
          pr('Test errors for degrees 0 to 4 are 0.9, 0.4, 0.2, 0.15, 0.3. Which degree is best?', 3, 'Lowest test error.', 'Degree 3 (0.15).'),
          pr('Through how many points can a straight line (degree 1) always pass exactly?', 2, 'It has 2 numbers.', '2 points.'),
          ch('Training error rises when you add a feature. Most likely?', ['A bug, since more flexibility should not raise training error', 'Overfitting', 'Underfitting', 'Too much test data'], 'More freedom can always copy the old fit.', 'With an extra adjustable number, the old fit is still available, so training error should not rise: look for a mistake.'),
        ],
      },
      {
        title: 'Fighting overfitting',
        minutes: 20,
        explain: [
          'Regularisation adds a penalty for large weights to the loss, so the model prefers smooth answers unless the data insists. Weight decay adds λ times the sum of squared weights.',
          'Dropout (2014) randomly switches off neurons during training, so the network cannot rely on any one of them. Early stopping simply stops training when the validation error starts to rise.',
          'Surprise from 2019: very large networks often get better again after the worst overfitting point, “double descent”. Theory is still catching up, which is why modern practice always checks held-out data.',
        ],
        formulas: [['Weight decay', 'L_{\\text{total}} = \\text{MSE} + \\lambda\\sum_i w_i^2']],
        examples: [
          ex('MSE 0.10, weights (3, −1), λ = 0.01. Total loss?', [['Sum of squares.', '9 + 1 = 10'], ['Penalty.', '0.01 \\times 10 = 0.1'], ['Total.', '0.10 + 0.10 = 0.20']], '0.20'),
          ex('Dropout keeps each of 100 neurons with probability 0.8. How many work on a typical step?', [['Expected count.', '0.8 \\times 100']], 'About 80'),
        ],
        practice: [
          pr('MSE 0.5, weights (2, 2), λ = 0.1. Total loss?', 1.3, 'Penalty 0.1 × 8.', '0.5 + 0.8 = 1.3.'),
          pr('Dropout rate 0.5 on 200 neurons. About how many are switched off on a step?', 100, 'Half.', '100.'),
          pr('Validation errors per epoch: 0.5, 0.3, 0.25, 0.27, 0.31. With early stopping, after which epoch do you keep the weights?', 3, 'Lowest validation error.', 'Epoch 3 (0.25).'),
          pr('Weight decay λ = 0, what is the penalty for any weights?', 0, 'λ multiplies the penalty.', '0.'),
        ],
      },
    ],
  },

  'ai-005': {
    predict: {
      q: 'A 3 × 3 filter slides over every position of an 8 × 8 picture. How many numbers does it need to learn in total?',
      options: ['9, the same nine reused everywhere', '64, one per pixel', '576, nine per position', '36, one per output'],
      answer: 0,
      reveal: 'The same nine weights are used at every position. That sharing is why convolutional networks need far fewer numbers than a network that connects every pixel to every neuron.',
    },
    parts: [
      {
        title: 'Pictures as grids of numbers',
        minutes: 15,
        explain: [
          'A greyscale picture is a grid of brightness values, often 0 (black) to 255 (white). A colour picture has three such grids: red, green and blue.',
          'Feeding every pixel into every neuron of the next layer gets enormous fast, and it ignores that nearby pixels belong together.',
          'Hubel and Wiesel (1959) found that cells in a cat’s visual cortex respond to edges at particular angles in small patches of view. Fukushima’s Neocognitron (1980) and LeCun’s LeNet (1989) copied that idea.',
        ],
        formulas: [['Size of a colour picture', '\\text{numbers} = \\text{height} \\times \\text{width} \\times 3']],
        examples: [
          ex('How many numbers describe a 224 × 224 colour photo?', [['Pixels.', '224 \\times 224 = 50\\,176'], ['Three colours.', '50\\,176 \\times 3 = 150\\,528']], '150,528'),
          ex('Connecting every number of a 100 × 100 greyscale picture to each of 1,000 neurons. How many weights?', [['Inputs.', '10\\,000'], ['Times neurons.', '10^4 \\times 10^3 = 10^7']], '10 million weights'),
        ],
        practice: [
          pr('How many pixels in a 28 × 28 picture (the size of LeNet’s handwritten digits)?', 784, '28 × 28.', '784.'),
          pr('How many numbers in a 32 × 32 colour picture?', 3072, '32 × 32 × 3.', '3,072.'),
          pr('A 1920 × 1080 greyscale frame: how many million pixels (to 2 decimal places)?', 2.07, 'Multiply and divide by a million.', '2,073,600 ≈ 2.07 million.'),
          pr('Brightness from 0 to 255: how many different levels?', 256, 'Count both ends.', '256.'),
        ],
      },
      {
        title: 'Convolution: one small filter, slid everywhere',
        minutes: 25,
        explain: [
          'A filter (kernel) is a small grid of weights, say 3 × 3. Lay it over a patch of the picture, multiply each pair of numbers and add: that is one output number. Slide it one pixel and repeat.',
          'A filter with −1 on the left and +1 on the right gives a large output where brightness jumps from dark to light: it detects vertical edges. All +1s gives a blur.',
          'With no padding, an n × n picture and a k × k filter give an (n − k + 1) × (n − k + 1) map.',
        ],
        formulas: [['Output size', 'n - k + 1'], ['One output', '\\text{out}_{ij} = \\sum_{a,b} K_{ab}\\, I_{i+a,\\,j+b}']],
        examples: [
          ex('Patch (rows) [0 0 1], [0 0 1], [0 0 1]; filter rows [−1 0 1]. Output?', [['Each row gives −0 + 0 + 1.', '1 \\text{ per row}'], ['Three rows.', '3']], '3, a strong vertical edge'),
          ex('Output size for an 8 × 8 picture and a 3 × 3 filter?', [['n − k + 1.', '8 - 3 + 1 = 6']], '6 × 6'),
        ],
        practice: [
          pr('Output width for a 28 × 28 picture and a 5 × 5 filter?', 24, 'n − k + 1.', '28 − 5 + 1 = 24.'),
          pr('A blur filter of nine 1s over a patch with four 1s and five 0s. Output?', 4, 'Add up the patch.', '4.'),
          pr('Filter rows [−1 0 1] on a patch that is all 1s. Output?', 0, 'Each row: −1 + 0 + 1.', '0: no edge in a flat patch.'),
          pr('How many weights does one 5 × 5 filter on a greyscale picture have (ignore the bias)?', 25, '5 × 5.', '25.'),
          pr('A layer has 64 filters of 3 × 3 on a colour (3-channel) input, plus one bias each. How many numbers to learn?', 1792, 'Each filter is 3 × 3 × 3 = 27 weights plus 1.', '64 × 28 = 1,792.'),
        ],
      },
      {
        title: 'Deep networks and ImageNet',
        minutes: 20,
        explain: [
          'Layers stack: the first finds edges, the next combines edges into corners and textures, later ones into parts and whole objects. Pooling layers shrink the maps, so later filters see wider areas.',
          'ImageNet, led by Fei-Fei Li, gathered over a million labelled photos in 1,000 categories. In 2012 AlexNet, trained on two gaming graphics cards, cut the top-5 error from about 26% to 15.3%.',
          'That win started the deep-learning boom. The same idea finds cracks and grain boundaries in micrographs of metals.',
        ],
        formulas: [['2 × 2 pooling', '\\text{size} \\to \\text{size}/2']],
        examples: [
          ex('A 224 × 224 map goes through three 2 × 2 poolings. Final size?', [['Halve three times.', '224 \\to 112 \\to 56 \\to 28']], '28 × 28'),
          ex('Top-5 error dropped from 26% to 15.3%. By how many percentage points?', [['Subtract.', '26 - 15.3 = 10.7']], '10.7 points'),
        ],
        practice: [
          pr('A 64 × 64 map after two 2 × 2 poolings: what width?', 16, 'Halve twice.', '16.'),
          pr('ImageNet’s challenge had 1,000 classes. If a model guesses at random, what is the chance (in %) that the right class is in its top 5?', 0.5, '5 out of 1,000.', '0.5%.'),
          pr('An error rate of 15.3% on 50,000 test photos: about how many mistakes?', 7650, '0.153 × 50,000.', '7,650.'),
          pr('A crack-finding network looks at 512 × 512 micrograph tiles cut from a 4096 × 4096 image. How many tiles?', 64, '8 × 8 tiles.', '64.'),
        ],
      },
    ],
  },

  'ai-006': {
    predict: {
      q: 'Each word becomes a list of numbers learned only from which words appear near it. What do you get from king − man + woman?',
      options: ['A point very near queen', 'Nonsense: words cannot be subtracted', 'king again', 'A point near man'],
      answer: 0,
      reveal: 'Mikolov’s word2vec (2013) found that such relationships become directions. The step from man to woman, added to king, lands close to queen.',
    },
    parts: [
      {
        title: 'Meaning from the company a word keeps',
        minutes: 20,
        explain: [
          'The linguist Firth wrote in 1957: “You shall know a word by the company it keeps.” Words that appear in similar sentences tend to mean similar things: “coffee” and “tea” both follow “a cup of”.',
          'A word vector (embedding) is a list of a few hundred numbers for each word, adjusted during training so that words seen in similar places get similar lists.',
          'Bengio and colleagues (2003) learned such vectors inside a neural network that predicts the next word. Word2vec (2013) made it fast enough to run on billions of words.',
        ],
        formulas: [['A word as a point', '\\text{coffee} \\mapsto (v_1, v_2, \\dots, v_{300})']],
        examples: [
          ex('A vocabulary of 50,000 words with 300 numbers each. How many numbers in the table?', [['Multiply.', '50\\,000 \\times 300 = 15\\,000\\,000']], '15 million'),
          ex('Toy 2-D vectors: man (1, 1), woman (1, 3). The step from man to woman?', [['Subtract.', '(1-1,\\; 3-1) = (0, 2)']], '(0, 2)'),
        ],
        practice: [
          pr('A vocabulary of 10,000 words with 100 numbers each. How many numbers?', 1000000, 'Multiply.', '1,000,000.'),
          pr('Toy vectors king (5, 1.5), man (1, 1), woman (1, 3). What is the second number of king − man + woman?', 3.5, '1.5 − 1 + 3.', '3.5.'),
          pr('And the first number?', 5, '5 − 1 + 1.', '5. The result (5, 3.5) is where the toy queen sits.'),
          pr('With a window of 2 words on each side, how many neighbours does a word in the middle of a sentence have?', 4, 'Two before, two after.', '4.'),
        ],
      },
      {
        title: 'Measuring similarity',
        minutes: 20,
        explain: [
          'How close are two word vectors? The usual measure is the cosine of the angle between them: 1 means pointing the same way, 0 means unrelated (at right angles), −1 opposite.',
          'Cosine = dot product divided by the two lengths. The dot product multiplies matching entries and adds them.',
          'Cosine ignores length, which mostly reflects how common a word is, and keeps direction, which carries meaning.',
        ],
        formulas: [['Cosine similarity', '\\cos\\theta = \\frac{\\mathbf a\\cdot\\mathbf b}{|\\mathbf a|\\,|\\mathbf b|}']],
        examples: [
          ex('a = (3, 4), b = (4, 3). Cosine similarity?', [['Dot product.', '12 + 12 = 24'], ['Lengths.', '|a| = |b| = 5'], ['Divide.', '24 / 25 = 0.96']], '0.96: very similar'),
          ex('a = (1, 0), b = (0, 2). Cosine?', [['Dot product.', '0'], ['Divide.', '0 / 2 = 0']], '0: unrelated'),
        ],
        practice: [
          pr('Dot product of (1, 2, 3) and (4, 0, 1)?', 7, '4 + 0 + 3.', '7.'),
          pr('Length of (6, 8)?', 10, '√(36 + 64).', '10.'),
          pr('Cosine similarity of (1, 2, 2) and (2, 1, 2)?', 0.889, 'Dot 8; both lengths 3.', '8 / 9 ≈ 0.889.'),
          pr('Cosine similarity of (2, 0) and (−5, 0)?', -1, 'Opposite directions.', '−10 / 10 = −1.'),
        ],
      },
      {
        title: 'Analogies, limits and bias',
        minutes: 20,
        explain: [
          'To solve “a is to b as c is to ?”, compute c + (b − a) and find the nearest word, leaving out a, b and c themselves.',
          'It works for many relations (country → capital, verb → past tense) but far from all. One vector per word also cannot separate meanings: “bank” of a river and “bank” for money share a vector. Later models (ai-007) give each word a vector that depends on its sentence.',
          'Vectors learn whatever is in the text, including prejudice: studies in 2016 found analogies like “man is to programmer as woman is to homemaker”. Checking for such bias is part of building these systems.',
        ],
        formulas: [['Analogy', '\\text{answer} \\approx \\arg\\max_{w} \\cos(\\mathbf w,\\; \\mathbf c + \\mathbf b - \\mathbf a)']],
        examples: [
          ex('Toy: Japan (−6.4, 2.7), Tokyo (−3.9, 1.6), Philippines (−6.6, 0.9). Where does Tokyo − Japan + Philippines land?', [['Step from Japan to Tokyo.', '(2.5, -1.1)'], ['Add to Philippines.', '(-4.1, -0.2)']], '(−4.1, −0.2), where the toy Manila sits'),
          ex('An analogy test has 200 questions and a model gets 150 right. Accuracy?', [['Divide.', '150/200 = 0.75']], '75%'),
        ],
        practice: [
          pr('Toy vectors: walk (2, 1), walked (2, 3), swim (5, 1). What is the second number of the predicted “swam”?', 3, 'swim + (walked − walk).', '1 + 2 = 3.'),
          pr('And the first number?', 5, '5 + 0.', '5.'),
          pr('A model gets 1,450 of 2,000 analogy questions right. Accuracy in %?', 72.5, 'Divide and multiply by 100.', '72.5%.'),
          pr('How many vectors does a word2vec-style table give the word “bank”?', 1, 'One row per word.', '1, whatever the meaning.'),
        ],
      },
    ],
  },

  'ai-007': {
    predict: {
      q: '“The animal didn’t cross the street because it was too tired.” Change “tired” to “wide”. What should the word “it” now pay most attention to?',
      options: ['street', 'animal', 'cross', 'because'],
      answer: 0,
      reveal: 'Animals get tired; streets are wide. A transformer lets every word score every other word, so changing one word at the end can move where “it” looks.',
    },
    parts: [
      {
        title: 'Softmax: scores into weights',
        minutes: 20,
        explain: [
          'Attention turns a list of scores into weights that are all positive and add to 1. The tool is softmax: raise e to each score, then divide by the total.',
          'Bigger scores get bigger weights, and because of the e, a lead of a few points becomes a big share. Adding the same number to all scores changes nothing.',
          'A temperature T divides the scores first. Low T sharpens the weights towards the top score; high T spreads them evenly.',
        ],
        formulas: [['Softmax', '\\text{softmax}(s)_i = \\frac{e^{s_i/T}}{\\sum_j e^{s_j/T}}']],
        examples: [
          ex('Scores (2, 1, 0), T = 1. Softmax weights?', [['Powers of e.', '7.389,\\; 2.718,\\; 1'], ['Total.', '11.107'], ['Divide.', '0.665,\\; 0.245,\\; 0.090']], '(0.665, 0.245, 0.090)'),
          ex('Scores (5, 5). Weights?', [['Equal scores.', 'e^5 / (2e^5) = 0.5']], '(0.5, 0.5)'),
        ],
        practice: [
          pr('Scores (3, 1). Weight on the first, to 3 decimals?', 0.881, 'e³ / (e³ + e¹), or 1 / (1 + e⁻²).', '≈ 0.881.'),
          pr('Scores (ln 3, 0). Weight on the first?', 0.75, 'e^(ln 3) = 3.', '3 / (3 + 1) = 0.75.'),
          pr('Four equal scores. Weight on each?', 0.25, 'Split evenly.', '0.25.'),
          pr('Scores (12, 11, 10). Weight on the first, to 3 decimals?', 0.665, 'Subtract 10 from all: it changes nothing.', 'Same as (2, 1, 0): 0.665.'),
        ],
      },
      {
        title: 'Queries, keys and values',
        minutes: 25,
        explain: [
          'Each word makes three vectors from its embedding: a query (what am I looking for?), a key (what do I offer?) and a value (what I pass on if chosen).',
          'The score of word i for word j is the dot product of i’s query with j’s key, divided by √d, where d is the vector length (keeps scores from growing too big). Softmax turns the scores into weights.',
          'Word i’s new vector is the weighted average of all the values. Bahdanau and colleagues (2014) introduced attention for translation; “Attention Is All You Need” (2017) built the whole model from it: the transformer.',
        ],
        formulas: [['Attention', '\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt d}\\right)V']],
        examples: [
          ex('Query (1, 2), keys k₁ = (2, 0), k₂ = (0, 1), d = 2 but ignore the √d here. Scores?', [['Dot with k₁.', '2'], ['Dot with k₂.', '2']], 'Both 2: equal attention'),
          ex('Weights (0.75, 0.25) over values v₁ = (4, 0), v₂ = (0, 8). Output?', [['Weighted sum.', '0.75(4,0) + 0.25(0,8)'], ['Add.', '(3, 2)']], '(3, 2)'),
        ],
        practice: [
          pr('Query (1, 0, 1), key (2, 5, 3). Raw score?', 5, 'Dot product.', '2 + 0 + 3 = 5.'),
          pr('Vectors of length d = 64. What is √d, the number scores are divided by?', 8, '√64.', '8.'),
          pr('Weights (0.5, 0.5) over values 10 and 30. Output?', 20, 'Average.', '20.'),
          pr('Weights (0.9, 0.1) over values 10 and 30. Output?', 12, '0.9 × 10 + 0.1 × 30.', '9 + 3 = 12.'),
        ],
      },
      {
        title: 'The transformer and its cost',
        minutes: 20,
        explain: [
          'A transformer layer runs attention (each word looks at the others), then a small network on each word separately, with shortcuts around both. Real models stack dozens of layers and run many attention “heads” side by side.',
          'Every word scores every other word, so a text of n words needs n × n scores per head per layer. Doubling the text quadruples that work, which is why long texts are expensive.',
          'Unlike older one-word-at-a-time networks, all words are processed together, which suits graphics cards. That made training on huge amounts of text practical, and led to GPT, BERT and today’s chat models.',
        ],
        formulas: [['Attention work', '\\text{scores} = n^2 \\;\\text{per head per layer}']],
        examples: [
          ex('A text of 1,000 tokens. How many scores per head per layer?', [['n².', '1000^2 = 10^6']], 'One million'),
          ex('Going from 1,000 to 4,000 tokens multiplies that work by?', [['Ratio squared.', '4^2 = 16']], '16 times'),
        ],
        practice: [
          pr('512 tokens: how many attention scores per head per layer?', 262144, '512².', '262,144.'),
          pr('Doubling the text length multiplies the attention work by?', 4, '2².', '4.'),
          pr('12 layers with 12 heads each. How many attention heads in total?', 144, 'Multiply.', '144.'),
          pr('A model splits a 768-number vector equally among 12 heads. How many numbers per head?', 64, 'Divide.', '64.'),
        ],
      },
    ],
  },

  'ai-008': {
    predict: {
      q: 'Plot model loss against training compute on ordinary axes, and then on log–log axes (after removing the floor). What shape is it on the log–log axes?',
      options: ['A straight line', 'A circle', 'A step', 'Random scatter'],
      answer: 0,
      reveal: 'Kaplan and colleagues (2020) found the loss falls as a power law of compute, data and size. A power law is a straight line on log–log axes, so it can be extended to predict bigger runs.',
    },
    parts: [
      {
        title: 'Power laws',
        minutes: 20,
        explain: [
          'A power law is y = a·x^(−k). Each time x is multiplied by 10, y is multiplied by 10^(−k), the same factor every time.',
          'Taking logarithms gives log y = log a − k·log x: a straight line with slope −k. That is why scientists plot such data on log–log axes.',
          'For language models the measured exponents are small, around 0.05 to 0.1: each tenfold increase of compute cuts the reducible loss by only about 10–20%, but it does so reliably.',
        ],
        formulas: [['Power law', 'y = a\\,x^{-k} \\iff \\log y = \\log a - k\\log x']],
        examples: [
          ex('y = 8·x^(−0.1). By what factor does y change when x grows 100-fold?', [['Factor.', '100^{-0.1} = 10^{-0.2}'], ['Work it out.', '\\approx 0.631']], '× 0.631, a 37% drop'),
          ex('On log–log axes, the line goes through (log x, log y) = (0, 2) and (4, 1.6). Exponent k?', [['Slope.', '(1.6 - 2)/4 = -0.1'], ['k is minus the slope.', 'k = 0.1']], 'k = 0.1'),
        ],
        practice: [
          pr('y = x^(−1). What is y at x = 4?', 0.25, '1/4.', '0.25.'),
          pr('y = 8x^(−0.1). By what factor does y change when x grows 10-fold (3 decimals)?', 0.794, '10^(−0.1).', '≈ 0.794.'),
          pr('y = x^(−0.5). By what factor does y fall when x grows 100-fold? (Give the factor, e.g. 0.1.)', 0.1, '100^(−0.5) = 1/10.', '0.1.'),
          pr('A log–log line has slope −0.05. What is the exponent k?', 0.05, 'k is minus the slope.', '0.05.'),
        ],
      },
      {
        title: 'Compute: C ≈ 6ND',
        minutes: 20,
        explain: [
          'Training cost is measured in arithmetic operations. For a transformer with N weights trained on D tokens of text, the total is about 6 × N × D: two operations per weight per token forward, four backward.',
          'GPT-3 (2020) had 175 billion weights and saw about 300 billion tokens, so roughly 3 × 10²³ operations.',
          'This simple rule lets researchers budget a run before they start.',
        ],
        formulas: [['Training compute', 'C \\approx 6ND']],
        examples: [
          ex('GPT-3: N = 175 × 10⁹, D = 300 × 10⁹. Compute?', [['Multiply.', '6 \\times 1.75\\times10^{11} \\times 3\\times10^{11}'], ['Result.', '3.15 \\times 10^{23}']], 'About 3.2 × 10²³ operations'),
          ex('A 1-billion-weight model on 20 billion tokens. Compute?', [['Multiply.', '6 \\times 10^9 \\times 2\\times10^{10} = 1.2\\times10^{20}']], '1.2 × 10²⁰ operations'),
        ],
        practice: [
          pr('N = 10⁸ weights, D = 10¹⁰ tokens. Compute, in units of 10¹⁸ operations?', 6, '6 × 10¹⁸.', '6.'),
          pr('Doubling both N and D multiplies compute by?', 4, '2 × 2.', '4.'),
          pr('A computer does 10¹⁵ operations per second. How many seconds for a 6 × 10¹⁸ run?', 6000, 'Divide.', '6,000 s (under 2 hours).'),
          pr('Budget C = 1.2 × 10²¹, model N = 10¹⁰. How many tokens D, in billions?', 20, 'D = C / 6N.', '1.2 × 10²¹ / 6 × 10¹⁰ = 2 × 10¹⁰ = 20 billion.'),
        ],
      },
      {
        title: 'Chinchilla: balancing size and data',
        minutes: 20,
        explain: [
          'For a fixed budget, should you train a huge model on little data or a smaller model on more? DeepMind’s Chinchilla study (2022) found that model size and data should grow together: about 20 tokens per weight.',
          'With D = 20N, C = 6ND = 120N², so N = √(C/120). Chinchilla used 70 billion weights and 1.4 trillion tokens and beat Gopher, a model four times bigger trained on less data.',
          'Today many models are trained on far more than 20 tokens per weight, because a smaller model is cheaper to run for millions of users afterwards.',
        ],
        formulas: [['Compute-optimal size', 'D \\approx 20N \\;\\Rightarrow\\; C \\approx 120N^2,\\quad N \\approx \\sqrt{C/120}']],
        examples: [
          ex('Chinchilla: N = 7 × 10¹⁰, D = 1.4 × 10¹². Compute?', [['6ND.', '6 \\times 7\\times10^{10} \\times 1.4\\times10^{12}'], ['Result.', '5.88\\times10^{23}']], 'About 5.9 × 10²³'),
          ex('Budget 1.2 × 10²² operations. Compute-optimal N?', [['Divide by 120.', '10^{20}'], ['Square root.', 'N = 10^{10}']], '10 billion weights, on 200 billion tokens'),
        ],
        practice: [
          pr('A model has 2 billion weights. How many tokens (in billions) does the 20-per-weight rule suggest?', 40, '20 × N.', '40 billion.'),
          pr('Budget C = 1.2 × 10²⁰. Compute-optimal N, in millions?', 1000, 'N = √(C/120) = √(10¹⁸).', '10⁹ = 1,000 million.'),
          pr('If the budget grows 100-fold, by what factor should N grow?', 10, 'N grows as √C.', '√100 = 10.'),
          pr('GPT-3 saw 300 billion tokens with 175 billion weights. Tokens per weight, to 2 decimals?', 1.71, 'Divide.', '300 / 175 ≈ 1.71, far below 20.'),
        ],
      },
    ],
  },

  'ai-009': {
    predict: {
      q: 'A robot learns only from rewards at the end of a game. On a small grid, which squares learn their value first?',
      options: ['The squares right next to the goal', 'The starting square', 'All squares at once', 'The squares farthest away'],
      answer: 0,
      reveal: 'Value spreads backwards from the reward. Squares one move away learn first, then squares two moves away, and so on, one ring per sweep.',
    },
    parts: [
      {
        title: 'Rewards and discounting',
        minutes: 20,
        explain: [
          'In reinforcement learning an agent acts, the world responds, and sometimes a reward arrives. Nobody shows it the right action; it must find out which actions lead to reward.',
          'Rewards later count for less, by a discount γ between 0 and 1 per step. The return is r₀ + γr₁ + γ²r₂ + … A γ near 1 makes a patient agent; a small γ makes it short-sighted.',
          'Discounting also keeps the sum finite: a reward of 1 every step forever adds up to 1/(1 − γ).',
        ],
        formulas: [['Return', 'G = r_0 + \\gamma r_1 + \\gamma^2 r_2 + \\cdots'], ['Forever', '\\sum_{k=0}^{\\infty}\\gamma^k = \\frac{1}{1-\\gamma}']],
        examples: [
          ex('γ = 0.9. A reward of 1 arrives after 3 steps (r₃ = 1, others 0). Return?', [['Discount three times.', '0.9^3 = 0.729']], '0.729'),
          ex('γ = 0.9, reward 1 every step forever. Return?', [['Geometric sum.', '1/(1 - 0.9) = 10']], '10'),
        ],
        practice: [
          pr('γ = 0.5, reward 1 after 3 steps. Return?', 0.125, '0.5³.', '0.125.'),
          pr('γ = 0.99, reward 1 every step forever. Return?', 100, '1 / (1 − γ).', '1 / 0.01 = 100.'),
          pr('γ = 0.9, rewards 2, 0, 10 at steps 0, 1, 2. Return?', 10.1, '2 + 0 + 0.81 × 10.', '2 + 8.1 = 10.1.'),
          pr('γ = 0. Rewards 5 then 100. Return?', 5, 'Future rewards are multiplied by 0.', '5.'),
        ],
      },
      {
        title: 'Bellman’s equation and value iteration',
        minutes: 25,
        explain: [
          'The value of a state is the return you can expect from it if you act well. Bellman (1957) noticed it can be written in terms of the next state: value now = best over actions of (reward + γ × value of where you land).',
          'Value iteration starts with all values 0 and applies that rule to every state, again and again. Each sweep pushes knowledge one step further from the rewards, until nothing changes.',
          'Once the values are known, acting well is easy: always move to the neighbour with the highest value.',
        ],
        formulas: [['Bellman optimality', 'V(s) = \\max_a \\big[\\, r(s,a) + \\gamma\\, V(s\') \\,\\big]']],
        examples: [
          ex('Each move costs −0.04, γ = 0.9. A square next to the goal (value 1). Its value after one sweep?', [['Best move: into the goal.', '-0.04 + 0.9 \\times 1'], ['Work it out.', '0.86']], '0.86'),
          ex('The square behind it, after the next sweep?', [['Move to the 0.86 square.', '-0.04 + 0.9 \\times 0.86'], ['Work it out.', '0.734']], 'About 0.73'),
        ],
        practice: [
          pr('Move cost 0, γ = 0.5, goal worth 1. Value of a square 1 step away?', 0.5, 'γ × 1.', '0.5.'),
          pr('Same, 3 steps away?', 0.125, 'γ³.', '0.125.'),
          pr('Move cost −1, γ = 1, goal worth 10. Value of a square 2 steps away?', 8, 'Two moves at −1, then 10.', '−1 − 1 + 10 = 8.'),
          pr('A square has neighbours worth 0.4, 0.7 and −1, move cost 0, γ = 1. Its value?', 0.7, 'Pick the best.', '0.7.'),
        ],
      },
      {
        title: 'Learning without a map: Q-learning to AlphaGo',
        minutes: 20,
        explain: [
          'Value iteration needs a map of the world. Q-learning (Watkins, 1989) learns from experience instead: after each move, nudge the estimate Q(s, a) towards reward + γ × best Q at the next state.',
          'Samuel’s checkers program (1959) already learned from playing itself. In 2015 DeepMind’s DQN learned dozens of Atari games from the screen pixels, using a network to estimate Q.',
          'AlphaGo (2016) combined networks trained on expert games and self-play with a look-ahead search, and beat Lee Sedol 4–1. Its move 37 in game 2 was one human experts first thought was a mistake.',
        ],
        formulas: [['Q-learning update', 'Q(s,a) \\leftarrow Q(s,a) + \\alpha\\big[r + \\gamma\\max_{a\'}Q(s\',a\') - Q(s,a)\\big]']],
        examples: [
          ex('Q(s,a) = 2, α = 0.5, r = 1, γ = 0.9, best next Q = 4. New Q?', [['Target.', '1 + 0.9 \\times 4 = 4.6'], ['Gap.', '4.6 - 2 = 2.6'], ['Move halfway.', '2 + 1.3 = 3.3']], '3.3'),
          ex('Go has about 250 legal moves per turn and games of about 150 moves. Rough number of move sequences, as a power of 10?', [['Count.', '250^{150}'], ['Log.', '150 \\times \\log_{10}250 \\approx 150 \\times 2.4 = 360']], 'About 10³⁶⁰: far too many to search'),
        ],
        practice: [
          pr('Q = 0, α = 0.1, r = 10, best next Q = 0. New Q?', 1, 'Target 10, move 10%.', '0 + 0.1 × 10 = 1.'),
          pr('Q = 5, α = 1, r = 0, γ = 0.9, best next Q = 10. New Q?', 9, 'α = 1 jumps to the target.', '0 + 9 = 9.'),
          pr('If Q already equals the target, how much does it change?', 0, 'Gap is 0.', '0.'),
          pr('AlphaGo beat Lee Sedol 4–1. What fraction of the games did it win?', 0.8, '4 of 5.', '0.8.'),
        ],
      },
    ],
  },

  'ai-010': {
    predict: {
      q: 'People compare two answers and pick the better one. A reward model gives answer A a score 2 points higher than B. How often should people pick A?',
      options: ['About 88% of the time', 'Always', 'Exactly 2 times as often', 'Half the time'],
      answer: 0,
      reveal: 'Under the Bradley–Terry model the chance is the sigmoid of the score gap: σ(2) ≈ 0.88. Preferences are noisy, so even a clearly better answer is not chosen every time.',
    },
    parts: [
      {
        title: 'From comparisons to scores',
        minutes: 20,
        explain: [
          'Asking people to give an answer a score out of 10 gives inconsistent numbers. Asking “which of these two is better?” is easier and more reliable.',
          'The Bradley–Terry model (1952), also behind chess Elo ratings, gives each item a score r and says the chance A beats B is σ(r_A − r_B), where σ is the sigmoid 1/(1 + e^(−x)).',
          'A reward model is a network trained so that its scores explain thousands of human comparisons as well as possible.',
        ],
        formulas: [['Bradley–Terry', 'P(A \\succ B) = \\sigma(r_A - r_B) = \\frac{1}{1 + e^{-(r_A - r_B)}}']],
        examples: [
          ex('Score gap 1. Chance A is preferred?', [['Sigmoid.', '1/(1 + e^{-1})'], ['Work it out.', '0.731']], '73%'),
          ex('Equal scores. Chance?', [['Gap 0.', '\\sigma(0) = 1/2']], '50%'),
        ],
        practice: [
          pr('Score gap 2. Chance A is preferred, to 3 decimals?', 0.881, '1/(1 + e⁻²).', '≈ 0.881.'),
          pr('Score gap −1. Chance A is preferred, to 3 decimals?', 0.269, '1 − σ(1).', '≈ 0.269.'),
          pr('What score gap gives exactly a 50% chance?', 0, 'σ(0) = 0.5.', '0.'),
          pr('What score gap gives a 90% chance, to 2 decimals? (σ(x) = 0.9 means e^(−x) = 1/9.)', 2.2, 'x = ln 9.', 'ln 9 ≈ 2.20.'),
        ],
      },
      {
        title: 'Training the reward model',
        minutes: 20,
        explain: [
          'For each comparison where people chose A over B, the loss is −ln σ(r_A − r_B). It is small when the model already scores A well above B and large when it gets the order wrong.',
          'Gradient descent on this loss (ai-002) pushes the chosen answer’s score up and the rejected one down.',
          'People disagree with each other quite often, so a reward model that agrees with about 70% of held-out human choices is typical.',
        ],
        formulas: [['Preference loss', 'L = -\\ln\\sigma(r_{\\text{chosen}} - r_{\\text{rejected}})']],
        examples: [
          ex('Chosen scores 1 more than rejected. Loss?', [['σ(1).', '0.731'], ['Minus log.', '-\\ln 0.731 = 0.313']], '0.313'),
          ex('Chosen scores 1 LESS than rejected. Loss?', [['σ(−1).', '0.269'], ['Minus log.', '1.313']], '1.313: four times bigger'),
        ],
        practice: [
          pr('Equal scores. Loss, to 3 decimals?', 0.693, '−ln 0.5.', 'ln 2 ≈ 0.693.'),
          pr('A reward model agrees with 1,400 of 2,000 held-out human choices. Agreement in %?', 70, 'Divide.', '70%.'),
          pr('Loss for a gap of 2, to 3 decimals?', 0.127, '−ln σ(2) = −ln 0.881.', '≈ 0.127.'),
          ch('Which gap gives the biggest loss (A was chosen)?', ['−3', '−1', '0', '2'], 'Wrong order costs most.', 'A gap of −3 means the model strongly prefers the rejected answer: biggest loss.'),
        ],
      },
      {
        title: 'RLHF, constitutions and DPO',
        minutes: 20,
        explain: [
          'In RLHF the language model writes answers, the reward model scores them, and reinforcement learning makes high-scoring answers more likely. A penalty keeps the model close to where it started, so it cannot drift into odd text that merely fools the scorer.',
          'InstructGPT (2022) showed that a 1.3-billion-weight model trained this way was preferred by people over the 175-billion-weight GPT-3. Constitutional AI (2022) replaced many human labels with AI feedback guided by a written list of principles.',
          'DPO (2023) skips the separate reward model and the reinforcement learning step, training the language model directly on the preference pairs with a loss of the same −ln σ shape.',
        ],
        formulas: [['RLHF objective', '\\max\\; \\mathbb E[r(x, y)] - \\beta\\, \\mathrm{KL}(\\pi \\,\\|\\, \\pi_{\\text{start}})']],
        examples: [
          ex('InstructGPT 1.3 B versus GPT-3 175 B. How many times smaller?', [['Divide.', '175/1.3 \\approx 135']], 'About 135 times smaller'),
          ex('Reward 5, penalty weight β = 0.1, drift 20. Objective?', [['Penalty.', '0.1 \\times 20 = 2'], ['Subtract.', '5 - 2 = 3']], '3'),
        ],
        practice: [
          pr('Reward 4, β = 0.2, drift 10. Objective?', 2, '4 − 2.', '2.'),
          pr('Reward 4, β = 0, drift 10. Objective?', 4, 'No penalty.', '4.'),
          pr('A labelling project collects 30,000 comparisons at 2 per minute. How many hours of human time?', 250, '15,000 minutes.', '250 hours.'),
          pr('How many separately trained reward models does DPO need?', 0, 'It skips that step.', '0.'),
        ],
      },
    ],
  },

  'ai-011': {
    predict: {
      q: 'A model is trained only to guess the noise that was added to a picture. How can that make brand-new pictures?',
      options: ['Start from pure noise and remove predicted noise step by step', 'It copies a training picture', 'It cannot: it only removes noise', 'It averages all training pictures'],
      answer: 0,
      reveal: 'Run the noising film backwards: begin with random noise and repeatedly subtract a little of the noise the model predicts. Structure appears, and a different start gives a different picture.',
    },
    parts: [
      {
        title: 'Destroying a picture with noise',
        minutes: 20,
        explain: [
          'Take a picture and, step by step, shrink it slightly towards grey and add a little random noise. After enough steps nothing of the picture is left: only random static.',
          'At noise level t the result is √ᾱ × picture + √(1 − ᾱ) × noise, where ᾱ goes from 1 (clean) down to 0 (pure noise). The square roots keep the overall spread the same.',
          'Sohl-Dickstein and colleagues (2015) took this idea from the physics of diffusion: easy to destroy structure, hard to rebuild it.',
        ],
        formulas: [['Forward process', 'x_t = \\sqrt{\\bar\\alpha_t}\\,x_0 + \\sqrt{1-\\bar\\alpha_t}\\,\\varepsilon']],
        examples: [
          ex('ᾱ = 0.64. Signal and noise multipliers?', [['Signal.', '\\sqrt{0.64} = 0.8'], ['Noise.', '\\sqrt{0.36} = 0.6']], '0.8 and 0.6'),
          ex('Pixel x₀ = 1, noise ε = −0.5, ᾱ = 0.64. Noisy pixel?', [['Mix.', '0.8(1) + 0.6(-0.5)'], ['Work it out.', '0.5']], '0.5'),
        ],
        practice: [
          pr('ᾱ = 0.25. Signal multiplier √ᾱ?', 0.5, '√0.25.', '0.5.'),
          pr('ᾱ = 0.36, x₀ = 2, ε = 1. Noisy value?', 2, '0.6 × 2 + 0.8 × 1.', '1.2 + 0.8 = 2.'),
          pr('ᾱ = 0. What is the signal multiplier?', 0, '√0.', '0: pure noise.'),
          pr('Each step keeps 99% of ᾱ. After 100 steps, what is ᾱ, to 3 decimals?', 0.366, '0.99¹⁰⁰.', '≈ 0.366.'),
        ],
      },
      {
        title: 'Learning to predict the noise',
        minutes: 20,
        explain: [
          'Ho, Jain and Abbeel’s DDPM (2020) trains a network on one simple job: given a noisy picture and its noise level, guess the noise ε that was added. The loss is the squared error between the guess and the real ε.',
          'If you know the noise, you can solve for the clean picture: x₀ = (x_t − √(1 − ᾱ) ε) / √ᾱ.',
          'Training is cheap and stable: pick a picture, a random noise level and random noise, compute x_t, and ask for ε back.',
        ],
        formulas: [['Training loss', 'L = \\|\\varepsilon - \\hat\\varepsilon(x_t, t)\\|^2'], ['Undo the noise', 'x_0 = \\frac{x_t - \\sqrt{1-\\bar\\alpha}\\,\\varepsilon}{\\sqrt{\\bar\\alpha}}']],
        examples: [
          ex('x_t = 0.5, ᾱ = 0.64, predicted ε = −0.5. Estimate of x₀?', [['Remove the noise part.', '0.5 - 0.6(-0.5) = 0.8'], ['Divide by 0.8.', '1']], 'x₀ = 1'),
          ex('True ε = (1, 0), guess (0.5, 0.5). Loss?', [['Differences.', '(0.5, -0.5)'], ['Squares added.', '0.25 + 0.25 = 0.5']], '0.5'),
        ],
        practice: [
          pr('x_t = 2, ᾱ = 0.36, predicted ε = 1. Estimate of x₀?', 2, '(2 − 0.8 × 1) / 0.6.', '1.2 / 0.6 = 2.'),
          pr('True ε = 0.3, guess 0.3. Loss?', 0, 'No error.', '0.'),
          pr('True ε = (1, 2), guess (1, 0). Loss?', 4, 'Differences (0, 2).', '4.'),
          pr('A 64 × 64 colour picture: how many noise numbers must be predicted at each step?', 12288, '64 × 64 × 3.', '12,288.'),
        ],
      },
      {
        title: 'Generating, and guiding with text',
        minutes: 20,
        explain: [
          'To generate, start from pure noise and run many small steps, each removing a little of the predicted noise and, in DDPM, adding back a smaller dose of fresh noise. Early on, DDPM used 1,000 steps; later methods need 50 or fewer.',
          'Stable Diffusion (2022) does this in a compressed “latent” space, about 48 times smaller than the pixels, which makes it fast. A text prompt steers the noise prediction towards pictures that match the words.',
          'The same idea now generates audio, video, and even new crystal structures and molecules.',
        ],
        formulas: [['Latent size', '512\\times512\\times3 \\;\\to\\; 64\\times64\\times4']],
        examples: [
          ex('512 × 512 × 3 pixels compressed to 64 × 64 × 4. How many times smaller?', [['Pixels.', '786\\,432'], ['Latent.', '16\\,384'], ['Ratio.', '48']], '48 times'),
          ex('Each step takes 0.05 s. Time for 1,000 steps versus 50?', [['1,000 steps.', '50\\text{ s}'], ['50 steps.', '2.5\\text{ s}']], '50 s versus 2.5 s'),
        ],
        practice: [
          pr('Each step takes 0.1 s. How many seconds for 1,000 steps?', 100, 'Multiply.', '100 s.'),
          pr('How many seconds for 25 steps?', 2.5, 'Multiply.', '2.5 s.'),
          pr('How many numbers in a 64 × 64 × 4 latent?', 16384, 'Multiply.', '16,384.'),
          pr('Going from 1,000 steps to 20 makes generation how many times faster?', 50, 'Divide.', '50.'),
        ],
      },
    ],
  },

  'ai-012': {
    predict: {
      q: 'A model gets a hard question right 60% of the time. You ask it 25 times and take the most common answer. Roughly how often is the vote right?',
      options: ['About 85% of the time', 'Still 60%', '100%', 'Less than 60%'],
      answer: 0,
      reveal: 'If the answers are independent and each is right more than half the time, the majority is right more often than any single answer. With p = 0.6 and 25 votes it is about 85%. Below 50% the vote makes things worse.',
    },
    parts: [
      {
        title: 'Thinking step by step',
        minutes: 20,
        explain: [
          'Language models write one token at a time. Asked for an answer straight away, they must get it in one go. Asked to write the working first, “chain of thought” (Wei and colleagues, 2022), they can use the text as scratch paper.',
          'On grade-school maths problems this simple change lifted a large model from about 18% to 57% correct. It mostly helps big models; small ones write plausible-looking but wrong steps.',
          'More written steps means more computation spent per answer: thinking time becomes something you can buy.',
        ],
        formulas: [['Cost grows with length', '\\text{cost} \\propto \\text{tokens written}']],
        examples: [
          ex('Accuracy rose from 18% to 57%. By how many percentage points?', [['Subtract.', '57 - 18 = 39']], '39 points'),
          ex('An answer of 20 tokens versus a chain of 400 tokens. How many times more text is generated?', [['Divide.', '400/20 = 20']], '20 times'),
        ],
        practice: [
          pr('Accuracy rises from 30% to 75%. Gain in percentage points?', 45, 'Subtract.', '45.'),
          pr('A model writes 50 tokens per second. How many seconds for a 1,500-token chain of thought?', 30, 'Divide.', '30 s.'),
          pr('Price $10 per million tokens. Cost in dollars of 200,000 tokens?', 2, '0.2 million × $10.', '$2.'),
          pr('On 1,319 test questions, 57% right is about how many questions (nearest whole number)?', 752, '0.57 × 1,319.', '≈ 752.'),
        ],
      },
      {
        title: 'Sampling many answers and voting',
        minutes: 25,
        explain: [
          'Self-consistency (Wang and colleagues, 2022): sample several chains of thought and take the most common final answer.',
          'If each answer is right with chance p, independently, then for 3 samples the vote is right when at least 2 are right: 3p²(1 − p) + p³.',
          'Above p = 0.5 the vote climbs towards 100% as samples are added; below, it falls towards 0. And real mistakes are not independent: if the model has a common misconception, all samples share it.',
        ],
        formulas: [['Majority of 3', 'P = 3p^2(1-p) + p^3'], ['At least one right in k', '1 - (1-p)^k']],
        examples: [
          ex('p = 0.6, 3 samples. Chance the majority is right?', [['Exactly two right.', '3(0.36)(0.4) = 0.432'], ['All three.', '0.216'], ['Add.', '0.648']], '0.648'),
          ex('p = 0.3. Chance at least one of 3 samples is right?', [['None right.', '0.7^3 = 0.343'], ['Complement.', '0.657']], '0.657'),
        ],
        practice: [
          pr('p = 0.8, majority of 3. Chance right, to 3 decimals?', 0.896, '3(0.64)(0.2) + 0.512.', '0.384 + 0.512 = 0.896.'),
          pr('p = 0.4, majority of 3. Chance right, to 3 decimals?', 0.352, '3(0.16)(0.6) + 0.064.', '0.288 + 0.064 = 0.352: worse than 0.4.'),
          pr('p = 0.5, majority of 3. Chance right?', 0.5, 'Symmetric.', '0.375 + 0.125 = 0.5.'),
          pr('p = 0.2. Chance at least one of 5 samples is right, to 3 decimals?', 0.672, '1 − 0.8⁵.', '1 − 0.328 = 0.672.'),
        ],
      },
      {
        title: 'Reasoning models and verifiable rewards',
        minutes: 20,
        explain: [
          'Since 2024, “reasoning models” are trained with reinforcement learning (ai-009) on problems whose answers can be checked automatically, such as maths with a known result or code with tests. Correct final answers are rewarded.',
          'They learn to write long chains that try an approach, check it, and back up when it fails. Accuracy rises with both training compute and the thinking time allowed at answer time.',
          'A checker beats a vote when one exists: if one of k samples passes the tests, you can pick it. Where answers cannot be checked, such as essays or open research questions, this is much harder.',
        ],
        formulas: [['Best-of-k with a checker', 'P(\\text{solved}) = 1 - (1-p)^k']],
        examples: [
          ex('p = 0.1 per sample, with a perfect checker, 10 samples. Chance solved?', [['None correct.', '0.9^{10} \\approx 0.349'], ['Complement.', '0.651']], 'About 65%'),
          ex('With a majority vote instead (p = 0.1), will 10 samples help?', [['p is below 0.5.', ''], ['The vote favours a wrong answer.', '']], 'No: voting cannot rescue p = 0.1'),
        ],
        practice: [
          pr('p = 0.5, perfect checker, 4 samples. Chance solved, to 4 decimals?', 0.9375, '1 − 0.5⁴.', '1 − 0.0625 = 0.9375.'),
          pr('p = 0.25, perfect checker, 2 samples. Chance solved, to 4 decimals?', 0.4375, '1 − 0.75².', '1 − 0.5625 = 0.4375.'),
          pr('A test suite of 40 problems; the model passes 34. Score in %?', 85, 'Divide.', '85%.'),
          pr('p = 0.9, perfect checker, 2 samples. Chance solved?', 0.99, '1 − 0.1².', '1 − 0.01 = 0.99.'),
        ],
      },
    ],
  },

  'ai-013': {
    predict: {
      q: 'A network layer has 2 numbers per position but must represent 5 different features. Can it?',
      options: ['Yes, by spreading them at angles, with a little overlap', 'No, never more features than numbers', 'Only 2 of the 5', 'Only if the features are always on together'],
      answer: 0,
      reveal: 'Features can share space at angles like a pentagon. Turning one on leaks a little into its neighbours. That leak matters little when features are rarely on at the same time. This is superposition.',
    },
    parts: [
      {
        title: 'Features as directions',
        minutes: 20,
        explain: [
          'Inside a network, each position has a vector of activations. Interpretability research looks for directions in that space that mean something: “this text is French”, “this is a negative review”.',
          'If features sit at right angles, turning one on does not affect the reading of the others. With d numbers you can fit d such features exactly.',
          'The amount one feature leaks into another’s reading is the cosine of the angle between their directions.',
        ],
        formulas: [['Leak between features', '\\text{leak} = \\cos\\theta = \\mathbf u_i\\cdot\\mathbf u_j \\;\\; (\\text{unit vectors})']],
        examples: [
          ex('Two features at 90°. Leak?', [['Cosine.', '\\cos 90^\\circ = 0']], '0'),
          ex('Five features evenly round a circle. Angle between neighbours and leak?', [['Angle.', '360^\\circ / 5 = 72^\\circ'], ['Cosine.', '\\cos 72^\\circ \\approx 0.309']], '72°, leak ≈ 0.31'),
        ],
        practice: [
          pr('Six features evenly round a circle. Angle between neighbours in degrees?', 60, '360 / 6.', '60°.'),
          pr('Their leak (cos 60°)?', 0.5, 'Standard value.', '0.5.'),
          pr('How many features can sit at exact right angles in a 3-number space?', 3, 'One per direction.', '3.'),
          pr('Unit vectors (1, 0) and (0.6, 0.8). Leak?', 0.6, 'Dot product.', '0.6.'),
        ],
      },
      {
        title: 'Superposition and sparsity',
        minutes: 20,
        explain: [
          'Networks need far more concepts than they have numbers per layer. Elhage and colleagues (2022) showed in small models that they pack extra features in at angles: superposition.',
          'It works because most features are sparse: absent almost all the time. If a feature is on only 1% of the time, two given features are rarely on together, so their leaks rarely collide.',
          'A side effect: single neurons often respond to several unrelated things (“polysemantic” neurons), which is why reading one neuron at a time is misleading.',
        ],
        formulas: [['Both on at once', 'P(\\text{both}) = p_1\\,p_2 \\;\\; (\\text{if independent})']],
        examples: [
          ex('Two features each on 1% of the time, independently. Chance both are on?', [['Multiply.', '0.01 \\times 0.01 = 0.0001']], '0.01% (1 in 10,000)'),
          ex('Feature A on with strength 1 leaks 0.31 into B. A reader sees B = 0.31 while B is really off. Is that a false alarm if the cut-off is 0.5?', [['Compare.', '0.31 < 0.5']], 'No false alarm'),
        ],
        practice: [
          pr('Features each on 10% of the time. Chance two given ones are on together?', 0.01, '0.1 × 0.1.', '0.01.'),
          pr('With cut-off 0.5, does a leak of 0.71 (cos 45°) cause a false alarm? (1 = yes, 0 = no)', 1, 'Compare with 0.5.', '0.71 > 0.5: yes, 1.'),
          pr('A neuron responds to 4 unrelated concepts. How many concepts would a perfectly “monosemantic” neuron respond to?', 1, 'Mono = one.', '1.'),
          pr('Features at 120° (three round a circle). Leak, if negative readings are cut to 0?', 0, 'cos 120° = −0.5, then cut.', '0.'),
        ],
      },
      {
        title: 'Sparse autoencoders: unpacking the features',
        minutes: 20,
        explain: [
          'A sparse autoencoder takes a layer’s activations, expands them into many more numbers (say 16 times as many), and rebuilds the original, with a penalty that keeps most of the expanded numbers at 0.',
          'Because only a few are on at once, each one tends to match a single human-readable concept. In 2024 researchers extracted millions of such features from a production language model, including ones for the Golden Gate Bridge, code bugs and deception.',
          'Turning a feature up or down changes the model’s behaviour, evidence that the features are real handles, not just labels. Much of the network still is not explained.',
        ],
        formulas: [['SAE loss', 'L = \\|x - \\hat x\\|^2 + \\lambda\\sum_i |f_i|']],
        examples: [
          ex('Activations of 512 numbers expanded 16 times. How many features?', [['Multiply.', '512 \\times 16 = 8192']], '8,192'),
          ex('Reconstruction error 0.2, λ = 0.01, feature sizes add to 30. Loss?', [['Penalty.', '0.3'], ['Total.', '0.5']], '0.5'),
        ],
        practice: [
          pr('4,096 activations expanded 8 times. How many features?', 32768, 'Multiply.', '32,768.'),
          pr('Of 32,768 features, 64 are on. What percent is that, to 3 decimals?', 0.195, '64 / 32,768 × 100.', '≈ 0.195%.'),
          pr('Error 1, λ = 0.1, feature sizes add to 5. Loss?', 1.5, '1 + 0.5.', '1.5.'),
          pr('Features (0, 3, 0, −2). Sum of absolute sizes?', 5, '3 + 2.', '5.'),
        ],
      },
    ],
  },

  'ai-014': {
    predict: {
      q: 'An AI proposed 2.2 million new crystals and a robot lab tried to make 58 of them. How many do you think it made?',
      options: ['41', 'All 58', '2', 'None'],
      answer: 0,
      reveal: 'The A-Lab made 41 of 58 targets in 17 days, about 71%. Impressive, but not all: prediction narrows the search, and experiment still decides.',
    },
    parts: [
      {
        title: 'AI for materials discovery',
        minutes: 20,
        explain: [
          'GNoME (DeepMind, 2023) used graph neural networks, which treat a crystal as atoms joined by bonds, to propose about 2.2 million new structures, of which about 380,000 were predicted stable by follow-up physics calculations.',
          'The same year the A-Lab at Berkeley planned recipes, mixed and heated powders with robots and read X-ray patterns, making 41 of 58 targets in 17 days.',
          'Read such claims as a funnel: how many were proposed, how many checked by computation, how many actually made, and how many were truly new. Later analyses argued some of the A-Lab’s products were not new compounds, which is how science is supposed to work: claims get checked.',
        ],
        formulas: [['Success rate', '\\text{rate} = \\frac{\\text{made}}{\\text{attempted}}']],
        examples: [
          ex('41 of 58 targets made. Success rate?', [['Divide.', '41/58 \\approx 0.707']], 'About 71%'),
          ex('380,000 stable out of 2.2 million proposed. Fraction?', [['Divide.', '380\\,000 / 2\\,200\\,000 \\approx 0.173']], 'About 17%'),
        ],
        practice: [
          pr('41 made over 17 days. About how many per day, to 1 decimal?', 2.4, 'Divide.', '41 / 17 ≈ 2.4.'),
          pr('If 30 of 50 attempts succeed, what is the success rate in %?', 60, 'Divide.', '60%.'),
          pr('58 targets out of 2.2 million proposals: how many targets per million proposals, to 1 decimal?', 26.4, '58 / 2.2.', '≈ 26.4 per million.'),
          pr('How many powers of 10 separate 2.2 million and 22? (Answer the number of factors of 10.)', 5, '2.2 × 10⁶ / 22 = 10⁵.', '5.'),
        ],
      },
      {
        title: 'Agents and AI in the research loop',
        minutes: 20,
        explain: [
          'Recent work links models into loops that propose an idea, run a calculation or experiment, read the result and decide what to try next. The model acts as an agent with tools, not only a chatbot.',
          'Benchmarks measure how long and how hard a task such agents can finish on their own; that length has been roughly doubling every several months, but with wide error bars and much argument over what the tests capture.',
          'For a materials engineer the practical questions are the same as for any instrument: what is the error rate, how was it checked, and what does it cost per useful result?',
        ],
        formulas: [['Doubling', 'T(n) = T_0 \\cdot 2^{\\,n}']],
        examples: [
          ex('A task length doubles every 7 months from 1 hour. Length after 28 months?', [['Doublings.', '28/7 = 4'], ['Grow.', '1 \\times 2^4 = 16']], '16 hours'),
          ex('An agent tries 200 candidate recipes and 15 work. Cost per working recipe at ₱3,000 per attempt?', [['Total cost.', '200 \\times 3000 = 600\\,000'], ['Per success.', '600\\,000 / 15 = 40\\,000']], '₱40,000'),
        ],
        practice: [
          pr('Doubling every 6 months, starting at 2 hours. Length after 18 months?', 16, 'Three doublings.', '2 × 8 = 16 hours.'),
          pr('How many doublings take 1 hour to 32 hours?', 5, '2⁵ = 32.', '5.'),
          pr('100 attempts at ₱2,000 each give 8 successes. Cost per success in pesos?', 25000, '200,000 / 8.', '₱25,000.'),
          pr('A model’s proposals succeed 10% of the time; a human expert’s 40%. How many model proposals equal one expert proposal in expected successes?', 4, '0.4 / 0.1.', '4.'),
        ],
      },
      {
        title: 'Reading the frontier',
        minutes: 20,
        explain: [
          'New AI papers appear daily, many on arXiv before any peer review. To read one, find: the claim, the baseline it beats, the size of the improvement, how it was tested, and whether the code or data are shared.',
          'Be careful with improvements that are small compared with run-to-run variation. If repeated runs vary by ±2 points, a 1-point gain may be luck.',
          'The open problems (reliable reasoning, honesty, understanding what models do inside, and science that is actually confirmed in a lab) are where this track ends and your own work can begin.',
        ],
        formulas: [['Relative improvement', '\\frac{\\text{new} - \\text{old}}{\\text{old}}']],
        examples: [
          ex('Error falls from 20% to 15%. Relative improvement?', [['Change.', '5'], ['Divide by old.', '5/20 = 0.25']], '25% fewer errors'),
          ex('A method scores 71 against a baseline of 70; runs vary by ±2. Convincing?', [['Gain.', '1'], ['Compare with spread.', '1 < 2']], 'Not on its own: within the noise'),
        ],
        practice: [
          pr('Accuracy rises from 80% to 90%. By what fraction does the ERROR fall?', 0.5, 'Error 20% → 10%.', 'Half: 0.5.'),
          pr('Error falls from 10% to 8%. Relative improvement in %?', 20, '2 / 10.', '20%.'),
          pr('Runs vary by ±3 points. Smallest whole-number gain that exceeds that spread?', 4, 'Must be more than 3.', '4.'),
          pr('A paper reports 5 runs scoring 70, 72, 68, 71, 69. Mean?', 70, 'Add and divide by 5.', '350 / 5 = 70.'),
        ],
      },
    ],
  },
};
