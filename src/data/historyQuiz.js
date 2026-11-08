import { UM_QUIZ } from './um';
// History questions mixed into each class's Practice round. Every question
// is answerable from that class's Story tab. The first option is the right
// one here; Practice shuffles the order on screen.

const q = (question, options, explanation) => ({ question, options, correctIndex: 0, explanation });

export const HISTORY_QUIZ = {
  ...UM_QUIZ,
  'num-001': [
    q('Roughly how old is the Lebombo bone, one of the oldest known counting tools?', ['About 43,000 years', 'About 4,300 years', 'About 430 years', 'About 430,000 years'], 'The notched baboon fibula from the Lebombo Mountains is around 43,000 years old.'),
    q('What surprising disaster did England’s old tally sticks cause in 1834?', ['Burning them set fire to the Houses of Parliament', 'They were used to forge the national debt', 'A shipment of them sank in the Thames', 'They started the Great Fire of London'], 'The Exchequer used tally sticks until 1826. Burning the stockpile in 1834 got out of control and burned down Parliament.'),
  ],
  'chem-000': [
    q('Who proposed that everything is made of earth, water, air and fire?', ['Empedocles', 'Democritus', 'Lavoisier', 'Robert Boyle'], 'Empedocles (c. 450 BC) proposed the four “roots”; Aristotle adopted the idea.'),
    q('What did Lavoisier’s careful weighing prove?', ['Mass is neither created nor destroyed in a reaction', 'Heat is a fluid called caloric', 'Metals can be turned into gold', 'Water is an element'], 'Weighing everything in sealed vessels showed conservation of mass. He also showed water is a compound, not an element.'),
  ],
  'num-002': [
    q('According to a leading theory, writing itself began in Sumer as…', ['Bookkeeping with clay tokens for goods', 'Love poetry', 'Religious hymns', 'Maps of the stars'], 'Clay tokens for grain and sheep were pressed into clay and then simply drawn: accounting came before literature.'),
    q('Why do we still have 60 minutes in an hour?', ['Babylonian astronomers counted in base 60', 'There are 60 days in two months', 'Romans had 60 fingers on their counting boards', 'Egyptian sundials had 60 marks'], 'Babylonian base-60 counting was adopted by Greek astronomers for time and angles, and it stuck.'),
  ],
  'num-003': [
    q('Who, in 628 AD, first gave rules for zero as a number in its own right?', ['Brahmagupta', 'Fibonacci', 'Euclid', 'Pythagoras'], 'Brahmagupta’s Brāhmasphuṭasiddhānta gave arithmetic rules for zero.'),
    q('Why did Florence ban the new Hindu-Arabic digits in official accounts in 1299?', ['A 0 could easily be altered into a 6 or 9', 'They were considered pagan', 'Merchants could not read them', 'They were too slow for calculation'], 'Bookkeepers feared fraud: an ink 0 is easy to change. Paper calculation was so much faster that the digits won anyway.'),
  ],
  'num-004': [
    q('The word “calculate” comes from the Latin word for…', ['Pebble', 'Ledger', 'Finger', 'Coin'], 'Calculus means pebble: people added by moving pebbles on counting boards.'),
    q('Robert Recorde invented the = sign in 1557. Why two parallel lines?', ['“No two things can be more equal”', 'They look like a balance scale', 'They were the easiest to print', 'They stood for two hands'], 'Recorde said he chose a pair of parallel lines because no two things can be more equal.'),
  ],
  'phys-001': [
    q('What was the Egyptian royal cubit based on?', ['The length from elbow to fingertip', 'The width of a palm', 'One step of the Pharaoh', 'A tenth of a pyramid side'], 'A cubit is the forearm length, standardised at about 52.4 cm with a master cubit of stone.'),
    q('Who turned the swinging pendulum into an accurate clock in 1656?', ['Christiaan Huygens', 'Galileo Galilei', 'Isaac Newton', 'Archimedes'], 'Galileo noticed swings take equal time; Huygens built the pendulum clock, cutting errors from minutes to seconds a day.'),
  ],
  'num-005': [
    q('How did Egyptian scribes like Ahmes multiply 13 × 6?', ['By doubling 6 repeatedly and adding the right rows', 'With a multiplication table up to 20', 'On an abacus with beads', 'By using logarithms'], 'They doubled (6, 12, 24, 48) and added the rows for 1, 4 and 8, because 13 = 8 + 4 + 1.'),
    q('Where is the oldest known decimal multiplication table from?', ['China, on bamboo strips (c. 305 BC)', 'Babylon, on clay (c. 1800 BC)', 'Rome, on marble (c. 100 AD)', 'England, on paper (1631)'], 'The Tsinghua bamboo slips from the Warring States period hold the oldest decimal multiplication table.'),
  ],
  'phys-002': [
    q('How did Archimedes test whether King Hiero’s crown was pure gold?', ['By measuring the water it displaced to find its density', 'By melting a small piece of it', 'By scratching it on a touchstone', 'By weighing it on a lever against a coin'], 'A silver-mixed crown of the same mass is bigger, so it pushes aside more water.'),
    q('Archimedes is quoted as saying “Give me a place to stand and I will move the Earth.” Which law was he talking about?', ['The law of the lever', 'Buoyancy', 'Conservation of energy', 'Gravity'], 'With a long enough lever, a small force can balance an enormous weight.'),
  ],
  'num-006': [
    q('What did Euclid prove about prime numbers around 300 BC?', ['There are infinitely many of them', 'They are all odd', 'There are exactly 25 below 100 and no more', 'They can be listed with a formula'], 'Multiply any finite list of primes and add 1: the result reveals a prime missing from the list.'),
    q('Besides his prime sieve, what is Eratosthenes famous for?', ['Measuring the circumference of the Earth', 'Inventing the abacus', 'Discovering zero', 'Writing the Elements'], 'The librarian of Alexandria estimated Earth’s circumference using shadows.'),
  ],
  'math-002': [
    q('Which ancient document shows Egyptians sharing loaves of bread with fractions?', ['The Rhind Mathematical Papyrus', 'The Rosetta Stone', 'Plimpton 322', 'The Nine Chapters'], 'The scribe Ahmes copied the Rhind papyrus around 1650 BC.'),
    q('How would an Egyptian share 5 loaves among 8 workers?', ['Half a loaf each, then an eighth of the last loaf each', '5 eighths cut from every loaf', 'Give 5 workers a loaf and 3 nothing', 'Grind it into flour and weigh it'], '1/2 + 1/8 = 5/8 each, with far fewer cuts.'),
  ],
  'phys-003': [
    q('How did Galileo slow gravity down enough to measure it?', ['He rolled balls down a long, gentle ramp', 'He dropped feathers in a vacuum', 'He used a pendulum clock to time free fall', 'He dropped balls from a tower and filmed them'], 'Around 1604 he timed bronze balls on a ramp with a water clock and found the 1 : 3 : 5 : 7 pattern.'),
    q('What did Apollo 15 astronaut David Scott drop together on the Moon in 1971?', ['A hammer and a feather', 'Two steel balls of different sizes', 'A rock and a flag', 'An apple and a feather'], 'With no air, they landed at the same moment, exactly as Galileo predicted.'),
  ],
  'math-001': [
    q('How did Brahmagupta describe positive and negative numbers in 628 AD?', ['As fortunes and debts', 'As light and darkness', 'As left and right', 'As gods and demons'], 'Fortunes (positive), debts (negative) and shunya (zero) gave negatives a practical meaning.'),
    q('What did Greek and Roman mathematicians usually do when an equation gave a negative answer?', ['Called it impossible and threw it away', 'Wrote it in red ink', 'Rounded it to zero', 'Turned it into a fraction'], 'For them, a quantity less than nothing made no sense.'),
  ],
  'num-007': [
    q('Who published “De Thiende” (The Tenth) in 1585, popularising decimals in Europe?', ['Simon Stevin', 'John Napier', 'Fibonacci', 'Descartes'], 'The Flemish engineer Simon Stevin even urged governments to decimalise coins and measures.'),
    q('In 1427 the astronomer al-Kāshī used decimal fractions to…', ['Compute π correct to 16 digits', 'Measure the speed of light', 'Invent the decimal point', 'Map the stars of Samarkand'], 'His value of π stood as a record for almost two centuries.'),
  ],
  'chem-002': [
    q('Why did NASA lose the Mars Climate Orbiter in 1999?', ['One team used pound-force seconds, the other newton-seconds', 'A solar flare destroyed it', 'It ran out of fuel', 'It collided with a moon of Mars'], 'Mismatched units sent it too low into the Martian atmosphere.'),
    q('Which chemist helped design the decimal metric system during the French Revolution?', ['Antoine Lavoisier', 'Amedeo Avogadro', 'Dmitri Mendeleev', 'Robert Boyle'], 'Lavoisier worked on the commission that created the metric system.'),
  ],
  'num-008': [
    q('Which group believed “all is number”, that every length is a ratio of whole numbers?', ['The Pythagoreans', 'The Babylonians', 'The Egyptians', 'The Romans'], 'The diagonal of a square broke that belief.'),
    q('Who gave the modern definition of the real numbers in 1872?', ['Richard Dedekind', 'Euclid', 'Isaac Newton', 'Hippasus'], 'Dedekind defined each real number as a “cut” splitting the fractions in two.'),
  ],
  'num-010': [
    q('Who introduced the = sign?', ['Robert Recorde', 'Leonhard Euler', 'Giuseppe Peano', 'René Descartes'], 'Recorde introduced = in 1557.'),
    q('The symbol ∈ (“is an element of”) comes from…', ['A Greek epsilon, for the Latin “est” (is)', 'An Egyptian hieroglyph for “inside”', 'A letter E for Euler', 'A rotated U for “union”'], 'Peano introduced it in 1889.'),
  ],
  'math-004': [
    q('In “The Sand Reckoner”, Archimedes estimated how many grains of sand would fill…', ['The whole universe', 'The beaches of Sicily', 'The harbour of Syracuse', 'One cubic metre'], 'He showed it was a finite number, at most about 10⁶³, and invented notation to write it.'),
    q('Who introduced the modern raised notation for powers like x² and x³ in 1637?', ['René Descartes', 'Archimedes', 'Isaac Newton', 'Al-Khwarizmi'], 'Descartes used superscripts in La Géométrie.'),
  ],
  'chem-003': [
    q('What did the Lavoisiers prove by weighing sealed flasks before and after heating metal?', ['Conservation of mass', 'That atoms exist', 'That oxygen is heavier than iron', 'The value of Avogadro’s number'], 'Rusted metal is heavier because it took oxygen from the air, not because matter was created.'),
    q('Avogadro’s idea is like a bank teller who…', ['Weighs coins instead of counting them one by one', 'Counts every coin twice', 'Only accepts paper money', 'Stacks coins by colour'], 'If you know the mass of one particle, weighing tells you how many there are.'),
  ],
  'geo-001': [
    q('What does the Babylonian tablet Plimpton 322 (c. 1800 BC) contain?', ['Lists of numbers that form right triangles', 'A map of Babylon', 'A recipe for bronze', 'The first calendar'], 'It lists Pythagorean triples about 1,200 years before Pythagoras.'),
    q('What did the Pythagoreans add that the Babylonians did not have?', ['A proof that the rule works for every right triangle', 'The number zero', 'Right angles', 'Measuring rods'], 'Going from “it works here” to “it must always work” is the birth of proof.'),
  ],
  'chem-004': [
    q('Which missing elements did Mendeleev predict before they were discovered?', ['Gallium, scandium and germanium', 'Gold, silver and copper', 'Helium, neon and argon', 'Hydrogen, carbon and oxygen'], 'He called them eka-aluminium, eka-boron and eka-silicon.'),
    q('Who showed in 1913 that elements should be ordered by atomic number, not weight?', ['Henry Moseley', 'Dmitri Mendeleev', 'John Newlands', 'William Ramsay'], 'Moseley used X-rays. He was killed at Gallipoli in 1915, aged 27.'),
  ],
  'math-003': [
    q('Al-Khwarizmi’s book Kitab al-Jabr gave us which word?', ['Algebra', 'Arithmetic', 'Geometry', 'Calculus'], '“Al-jabr” (restoring) became algebra, and his name gave us “algorithm”.'),
    q('Who asked al-Khwarizmi to write a practical maths manual around 820 AD?', ['Caliph al-Ma’mun', 'Alexander the Great', 'The Pope', 'The King of Syracuse'], 'It was for merchants, surveyors and judges dealing with inheritance and land.'),
  ],
  'phys-004': [
    q('Who paid for the printing of Newton’s Principia in 1687?', ['Edmond Halley', 'The King of England', 'Isaac Newton himself', 'Gottfried Leibniz'], 'The Royal Society had spent its budget on a book about fish, so Halley paid.'),
    q('Where did Newton work out many of his big ideas in 1665–66?', ['At his family farm while plague closed Cambridge', 'In a Paris café', 'Aboard a navy ship', 'In a monastery in Italy'], 'His “miracle year” was spent at Woolsthorpe.'),
  ],
  'chem-001': [
    q('What did Democritus call the smallest uncuttable piece of matter?', ['Atomos', 'Elementos', 'Quanta', 'Molecula'], '“Atomos” means uncuttable.'),
    q('What surprised Rutherford in his gold-foil experiment?', ['A few alpha particles bounced straight back', 'All the particles were absorbed', 'The foil melted', 'The particles turned into gold'], 'Like “a 15-inch shell bouncing off tissue paper”: it revealed the tiny, dense nucleus.'),
  ],
  'math-005': [
    q('What did Descartes’ coordinates join together?', ['Geometry and algebra', 'Chemistry and physics', 'Music and maths', 'Astronomy and medicine'], 'Every equation became a curve and every curve an equation.'),
    q('On a stress–strain graph, the slope of the straight part is…', ['Young’s modulus', 'The melting point', 'Density', 'The yield point'], 'Slope = rise over run: stress over strain.'),
  ],
  'phys-005': [
    q('What did Count Rumford notice while boring cannons in 1798?', ['Blunt drills could boil water indefinitely', 'Cannons got lighter when hot', 'Brass conducts heat better than iron', 'Water boils faster at night'], 'Endless heat from rubbing suggested heat is motion, not a fluid.'),
    q('How did Joule measure the link between work and heat?', ['Falling weights turned a paddle wheel in water', 'He timed ice melting in the sun', 'He weighed hot and cold metal', 'He burned coal in a sealed box'], 'A given amount of work always produced the same temperature rise.'),
  ],
  'mate-100': [
    q('In which year did John Lennard-Jones propose his famous energy curve for two atoms?', ['1924', '1824', '1687', '1969'], 'He worked at Cambridge in the 1920s.'),
    q('According to the Lennard-Jones picture, what happens when two atoms are pushed too close?', ['Their electron shells repel strongly', 'They fuse into one atom', 'They attract even more', 'They turn into ions'], 'That steep repulsive wall is why solids resist being squeezed.'),
  ],
  'geo-002': [
    q('Why is it called “sine”?', ['A mistranslation of the Arabic for the Indian word “jyā” into Latin “sinus” (fold)', 'It is short for “sign”', 'It was named after Mount Sinai', 'Hipparchus named it after his teacher'], 'Arabic “jiba” was misread as “jaib” (fold, bay), which became Latin “sinus”.'),
    q('What did Hipparchus build around 140 BC to predict eclipses?', ['A table of chords', 'A mechanical calculator', 'A telescope', 'A pendulum clock'], 'He is often called the father of trigonometry.'),
  ],
  'mate-102': [
    q('How old was Lawrence Bragg when he won the Nobel Prize, still the youngest science laureate?', ['25', '42', '18', '60'], 'He and his father mapped crystal structures with X-rays.'),
    q('What did the Braggs use to see how atoms are arranged inside crystals?', ['X-rays', 'Optical microscopes', 'Sound waves', 'Magnets'], 'Crystal planes reflect X-rays only at certain angles: nλ = 2d sin θ.'),
  ],
  'math-006': [
    q('How did Babylonian and later Islamic mathematicians “complete the square”?', ['By literally drawing and filling in a missing square', 'With a calculator', 'With logarithm tables', 'By guessing and checking'], 'Adding the missing 5 × 5 corner turned x² + 10x into a perfect square.'),
    q('The puzzle “a square plus ten of its sides makes 39” appears on…', ['A Babylonian clay tablet (c. 1800 BC)', 'An Egyptian papyrus', 'A Greek vase', 'A Roman coin'], 'In modern symbols: x² + 10x = 39, so x = 3.'),
  ],
  'phys-101': [
    q('How did Robert Hooke first publish his law of springs?', ['As a scrambled Latin anagram', 'In a letter to Newton', 'Carved on a clock', 'In a song'], '“ceiiinosssttuv” unscrambles to “Ut tensio, sic vis”: as the extension, so the force.'),
    q('Who turned Hooke’s spring constant into a true material property (the modulus)?', ['Thomas Young', 'Isaac Newton', 'Galileo', 'Robert Boyle'], 'Young’s modulus E describes the material, not the shape of the part.'),
  ],
  'num-009': [
    q('Which equation did Bombelli use in 1572 to show imaginary numbers give real answers?', ['x³ = 15x + 4', 'x² + 1 = 0', 'x² = 2', 'x + 3 = 0'], 'Cardano’s formula passes through √−121 but the answer is a plain 4.'),
    q('Who called these numbers “imaginary”, as an insult?', ['René Descartes', 'Euler', 'Gauss', 'Bombelli'], 'Descartes named them in 1637. Wessel, Argand and Gauss later drew them on a plane.'),
  ],
  'phys-006': [
    q('What did Volta build in 1800 to prove electricity came from two different metals?', ['A stack of zinc and copper discs: the first battery', 'A lightning rod', 'A light bulb', 'An electric motor'], 'The voltaic pile gave the first steady current; the volt is named after him.'),
    q('What happened to Georg Ohm after he published his law in 1827?', ['Critics mocked it and he lost his job, but he later won the Copley Medal', 'He became king of Bavaria', 'He was ignored forever', 'He was immediately made a professor'], 'Within twenty years Ohm’s law was standard.'),
  ],
  'math-007': [
    q('Which ancient text already used row-elimination on grids of counting rods?', ['The Nine Chapters on the Mathematical Art (China)', 'Euclid’s Elements', 'The Rhind papyrus', 'The Principia'], 'Around 200 BC: the method now called Gaussian elimination.'),
    q('What did Gauss use systematic elimination to calculate in 1809?', ['The orbit of the asteroid Ceres', 'The speed of sound', 'The age of the Earth', 'The value of π'], 'From a handful of telescope observations.'),
  ],
  'math-008': [
    q('Who published the first table of logarithms in 1614?', ['John Napier', 'Leonhard Euler', 'Isaac Newton', 'Svante Arrhenius'], 'Kepler said logarithms doubled the life of an astronomer.'),
    q('Why were logarithms such a time-saver?', ['They turn multiplication into addition', 'They make every number an integer', 'They remove fractions', 'They work only for small numbers'], 'log(A × B) = log A + log B.'),
  ],
  'chem-101': [
    q('What formula did Boltzmann have engraved on his tombstone?', ['S = k log W', 'E = mc²', 'ΔG = ΔH − TΔS', 'F = ma'], 'Entropy counts the number of ways atoms can be arranged.'),
    q('Who combined enthalpy and entropy into ΔG = ΔH − TΔS in 1876?', ['J. Willard Gibbs', 'Ludwig Boltzmann', 'James Joule', 'Michael Faraday'], 'Gibbs worked at Yale.'),
  ],
  'math-101': [
    q('Which old paradox asks how an arrow can move if at each instant it is frozen?', ['Zeno’s arrow paradox', 'Russell’s paradox', 'The liar paradox', 'The twin paradox'], 'Calculus answers it with limits.'),
    q('Who, independently of Newton, invented calculus and gave us the notation dy/dx?', ['Gottfried Wilhelm Leibniz', 'René Descartes', 'Pierre de Fermat', 'Blaise Pascal'], 'Leibniz’s notation is the one we still use.'),
  ],
  'mate-201': [
    q('Which three scientists explained dislocations in 1934?', ['Taylor, Orowan and Polanyi', 'Newton, Hooke and Young', 'Bragg, Bragg and Laue', 'Fick, Gibbs and Boltzmann'], 'They solved why real metals are about 100 times weaker than theory predicted.'),
    q('What everyday object explains how a dislocation moves?', ['A rug moved by pushing a ripple across it', 'A rolling ball', 'A stretched spring', 'A stack of coins'], 'Moving a ruck across a rug shifts it with far less force than dragging it.'),
  ],
  'math-102': [
    q('Why did Leibniz choose the long “S” (∫) for integrals?', ['It stands for “summa”: a sum of thin slices', 'It looks like a snake', 'It was the initial of his teacher', 'It means “slope”'], 'An integral adds up infinitely many thin rectangles.'),
    q('Which ancient mathematician found areas under curves by summing thin slices?', ['Archimedes', 'Pythagoras', 'Euclid', 'Thales'], 'He found the area under a parabola by exhaustion.'),
  ],
  'mate-202': [
    q('Which steel phase is named after Sir William Roberts-Austen?', ['Austenite', 'Martensite', 'Pearlite', 'Cementite'], 'Austenite is the high-temperature FCC form of iron.'),
    q('Who applied Gibbs’ phase rule to draw the modern iron–carbon diagram?', ['H. W. Bakhuis Roozeboom', 'Edgar Bain', 'Dmitri Mendeleev', 'Adolf Fick'], 'Around 1900, together with Roberts-Austen’s measurements.'),
  ],
  'mate-203': [
    q('Martensite, the hardest steel structure, is named after…', ['Adolf Martens', 'Mars, the god of war', 'Edgar Bain', 'Martin Luther'], 'Martens was a German metallurgist.'),
    q('Who mapped the time–temperature–transformation (TTT) curves of steel around 1930?', ['Edgar Bain (with Davenport)', 'Isaac Newton', 'J. W. Gibbs', 'A. A. Griffith'], 'At US Steel’s research lab.'),
  ],
  'mate-301': [
    q('How did Richard Feynman demonstrate the cause of the Challenger disaster?', ['He dunked an O-ring sample in ice water', 'He crashed a model rocket', 'He burned a piece of rubber', 'He x-rayed the booster'], 'Below its glass transition the rubber stayed stiff and could not seal.'),
    q('Who proved that plastics and rubber are giant chain molecules (and won a Nobel Prize for it)?', ['Hermann Staudinger', 'Wallace Carothers', 'Richard Feynman', 'Linus Pauling'], 'His “macromolecules” were rejected at first; he won the 1953 Nobel Prize.'),
  ],
  'mate-302': [
    q('What puzzled A. A. Griffith about glass in 1920?', ['Thin glass fibres were far stronger than thick glass', 'Glass was heavier than steel', 'Glass conducted electricity', 'Glass melted at room temperature'], 'Tiny surface flaws, not the bonds themselves, control the strength of brittle materials.'),
    q('According to Griffith, why do brittle materials break at low stress?', ['Microscopic cracks concentrate stress at their tips', 'Their atoms are too far apart', 'They contain too much water', 'They are too dense'], 'This became fracture mechanics.'),
  ],
  'mate-401': [
    q('Who invented the transistor at Bell Labs in 1947?', ['John Bardeen and Walter Brattain', 'Thomas Edison', 'Shuji Nakamura', 'Alessandro Volta'], 'Using gold contacts on a germanium crystal.'),
    q('Why was Shuji Nakamura’s blue LED such a big deal?', ['It made white LED lighting and modern screens possible', 'It was the first LED of any colour', 'It ran without electricity', 'It was made of silicon'], 'Red and green LEDs already existed; blue needed high-quality gallium nitride crystals.'),
  ],
  'mate-402': [
    q('How did Humphry Davy stop seawater corroding copper on Royal Navy ships in 1824?', ['He attached blocks of zinc or iron to sacrifice themselves', 'He painted the copper with tar', 'He replaced copper with gold', 'He kept the ships in fresh water'], 'Cathodic protection: the more reactive metal corrodes instead.'),
    q('What do Michael Ashby’s charts help engineers do?', ['Choose the best material by comparing properties', 'Predict earthquakes', 'Measure atomic radii', 'Draw phase diagrams'], 'For example, plotting stiffness against density to find light, stiff materials.'),
  ],
};
