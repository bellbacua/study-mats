// Story versions, batch 20: side topic, Economics.
import { retell } from './stories16';
import * as X from './side_econ';

export const pin_factory = retell(X.pin_factory, 'pin_factory', [
  { say: 'Adam Smith opened The Wealth of Nations (1776) with a pin factory. Making a pin took about 18 separate steps: drawing the wire, straightening, cutting, pointing, grinding the head…', set: { n: 1 }, ms: 11500 },
  { say: 'One worker doing all 18 steps: about 20 pins a day, Smith said, and maybe not even one if untrained.', set: {}, ms: 10000, n: 0 },
  { say: 'Split the job. Three workers, six steps each: each gets far quicker at fewer steps, and nobody wastes time switching tools.', set: { n: 3 }, ms: 10500, n: 1 },
  { say: 'Ten workers, two steps each: about 48,000 pins a day, Smith’s figure. Working alone, the same ten would make 200.', set: { n: 10 }, ms: 10500, n: 2 },
  { say: 'This division of labour is why factories, and whole economies, are so productive. Henry Ford’s 1913 assembly line pushed it further still.', set: { n: 6 }, ms: 10500 },
]);

export const supply_demand = retell(X.supply_demand, 'supply_demand', [
  { say: 'What sets a price, say of nickel ore, which the Philippines mines more of than almost any country? Two curves, as Alfred Marshall drew them in 1890.', set: { S: 0, D: 0 }, ms: 11000 },
  { say: 'Demand slopes down: the cheaper it is, the more buyers want. Supply slopes up: the higher the price, the more mines find it worth digging.', set: {}, ms: 10500 },
  { say: 'They cross at a price of 60 and 40 units. At that price, what sellers offer is exactly what buyers want.', set: {}, ms: 9500, n: 0 },
  { say: 'Some mines close: supply shifts up by 20. The price rises to 70 and less is sold.', set: { S: 20 }, ms: 9500, n: 1 },
  { say: 'Battery makers want more nickel too: demand shifts right. The price climbs to 80. Marshall compared the two curves to the blades of a pair of scissors: neither cuts alone.', set: { D: 20 }, ms: 11500, n: 2 },
]);

export const comparative_advantage = retell(X.comparative_advantage, 'comparative_advantage', [
  { say: 'David Ricardo, 1817: England and Portugal both make cloth and wine. Portugal is better at both. Can trade still help both countries?', set: { eng: 0.45, por: 0.45 }, ms: 10500 },
  { say: 'No trade: each country makes one unit of each, so the world has 2 cloth and 2 wine.', set: {}, ms: 9000, n: 0 },
  { say: 'Ricardo’s point: what matters is what each country gives up. Portugal gives up less cloth for each extra wine, so wine is its comparative advantage, even though it is better at both.', set: {}, ms: 12000 },
  { say: 'England puts everyone on cloth: plenty of cloth, but the world’s wine falls short.', set: { eng: 1 }, ms: 9500, n: 1 },
  { say: 'Portugal puts everyone on wine: plenty of wine, but now cloth falls short.', set: { eng: 0.45, por: 1 }, ms: 9500, n: 2 },
  { say: 'Your turn: find shares where both bars clear the line at once. Then both countries can have more of everything by trading.', set: { eng: 0.45, por: 0.45 }, ms: 9500 },
]);

export const marginal_product = retell(X.marginal_product, 'marginal_product', [
  { say: 'A small workshop. How many workers should it hire? Not “as many as possible”: each extra worker adds a little less than the one before, sharing the same tools and space.', set: { w: '200', L: 1 }, ms: 11000 },
  { say: 'Each bar is what one more worker adds, in pesos. The first adds ₱580; each later one adds ₱40 less. This is diminishing returns.', set: { L: 4 }, ms: 10500, n: 0 },
  { say: 'Keep hiring while the next bar is above the wage line. At ₱200 a day, that is 10 workers.', set: { L: 10 }, ms: 9500, n: 1 },
  { say: 'An 11th worker adds only ₱180 but costs ₱200: profit falls.', set: { L: 11 }, ms: 9000, n: 2 },
  { say: 'Raise the wage to ₱280 and the line moves up: now only 8 workers pay their way. Cheaper labour, more hiring.', set: { w: '280', L: 8 }, ms: 10500 },
]);

export const inflation_erosion = retell(X.inflation_erosion, 'inflation_erosion', [
  { say: 'Prices creep up every year. Inflation means each peso buys a little less. Here is what ₱1,000 will buy in the future, in today’s money.', set: { r: 3, t: 0 }, ms: 10500 },
  { say: 'At 3% a year, after 10 years ₱1,000 buys what ₱744 buys today. It is compound interest running backwards.', set: { t: 10 }, ms: 10000, n: 0 },
  { say: 'At 10%, it halves in about 7 years. The rule of 70: divide 70 by the rate to get the halving time.', set: { r: 10, t: 7 }, ms: 10500, n: 1 },
  { say: 'At 20%, after 30 years ₱1,000 is worth about ₱4. Savings kept as cash melt away.', set: { r: 20, t: 30 }, ms: 10000, n: 2 },
  { say: 'This is why engineers compare projects in today’s money, and why central banks, like the Bangko Sentral ng Pilipinas, aim for low, steady inflation, around 2 to 4%.', set: { r: 3, t: 20 }, ms: 11500 },
]);

export const multiplier_rounds = retell(X.multiplier_rounds, 'multiplier_rounds', [
  { say: 'The government pays ₱100 to build a road. The workers spend part of it at a store, the store owner spends part of that, and so on. How much spending does ₱100 make in total?', set: { c: 0.5, n: 1 }, ms: 11500 },
  { say: 'Say each person spends half of what they get, c = 0.5: ₱100, then ₱50, then ₱25… Each round is half the last.', set: { n: 5 }, ms: 10500 },
  { say: 'The total heads for ₱200: a multiplier of 2. The formula is 1 ÷ (1 − c). Richard Kahn worked it out in 1931 and Keynes made it famous.', set: { n: 10 }, ms: 11500, n: 0 },
  { say: 'If people spend more of each peso, c = 0.8, the rounds shrink slowly, and the total heads for ₱500.', set: { c: 0.8, n: 20 }, ms: 10500, n: 1 },
  { say: 'Money that leaves the country, for imports, or is saved, ends its chain early. Real multipliers are usually much smaller than these.', set: { c: 0.3, n: 10 }, ms: 10500 },
]);

export const repeated_game = retell(X.repeated_game, 'repeated_game', [
  { say: 'Two players each choose: cooperate or defect. Both cooperate, 3 points each. Both defect, 1 each. Defect on a cooperator and you get 5, they get 0. This is the prisoner’s dilemma (1950).', set: { me: 'alld', opp: 'allc', n: 1 }, ms: 12500 },
  { say: 'One round against a cooperator: defecting earns 5 instead of 3. Tempting, and whatever the other does, defecting scores more in a single round.', set: {}, ms: 11000, n: 0 },
  { say: 'But most relationships repeat. Against tit for tat, which copies your last move, defecting wins once and then both get 1 a round: 14 points in 10 rounds, not 30.', set: { opp: 'tft', n: 10 }, ms: 12000, n: 1 },
  { say: 'Tit for tat against always-defect: it is cheated once, then defends itself, 9 points.', set: { me: 'tft', opp: 'alld' }, ms: 10000, n: 2 },
  { say: 'In Robert Axelrod’s 1980 tournaments, tit for tat, the simplest entry, won: be nice, hit back, forgive. Trust between suppliers and buyers works the same way.', set: { opp: 'tft' }, ms: 11500 },
]);

export const prospect_value = retell(X.prospect_value, 'prospect_value', [
  { say: 'Economics long assumed people weigh gains and losses evenly. In 1979 Daniel Kahneman and Amos Tversky measured how people actually feel. Kahneman won the 2002 Nobel Prize for it.', set: { x: 0 }, ms: 11500 },
  { say: 'A ₱1,000 gain feels worth about 437 “units of pleasure”. Gains feel smaller the bigger they get: the curve bends over.', set: { x: 1000 }, ms: 10500, n: 0 },
  { say: 'A ₱1,000 loss feels like −982: more than twice as bad. Losses loom larger than gains.', set: { x: -1000 }, ms: 10000, n: 1 },
  { say: 'Even a ₱200 loss feels about half as bad as the ₱1,000 gain feels good.', set: { x: -200 }, ms: 9500, n: 2 },
  { say: 'That is why people keep a failing project going to avoid “losing” what they spent, and why a ₱100 discount feels better than avoiding a ₱100 fee.', set: { x: 500 }, ms: 11000 },
]);

export const cobweb = retell(X.cobweb, 'cobweb', [
  { say: 'Farmers decide this year what to plant based on last year’s price. Pig farmers did this so regularly that economists spoke of a “hog cycle”. Nicholas Kaldor named the cobweb model in 1934.', set: { k: 0.6, t: 0 }, ms: 12000 },
  { say: 'Year 0: a shock leaves output low, 20, so the price is high, 80.', set: {}, ms: 9000, n: 0 },
  { say: 'The high price tempts farmers to plant more. Next year there is plenty, so the price falls. So they cut back…', set: { t: 2 }, ms: 10500 },
  { say: 'With a gentle reaction, the swings shrink towards the balance point. The path spirals in like a cobweb.', set: { t: 8 }, ms: 10000, n: 1 },
  { say: 'React too strongly and every swing is bigger than the last: boom and bust that grows. Commodity prices, including metals, often swing like this.', set: { k: 1.3, t: 6 }, ms: 11000 },
]);
