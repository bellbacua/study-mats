// Who's who: the people in the class stories. Dates and roles follow each
// person's Wikipedia article (linked, with its own sources). The classes each
// person appears in are found automatically by searching the class stories for
// `find` (their surname unless stated). Years: negative = BC; approx = "c.".

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;
const p = (name, born, died, field, what, wiki, find, approx = false) => ({
  name,
  born,
  died,
  field,
  what,
  wiki: W(wiki),
  find: find || name.split(' ').slice(-1)[0],
  approx,
});

export const FIELDS = [
  { id: 'math', label: 'Mathematics' },
  { id: 'phys', label: 'Physics' },
  { id: 'chem', label: 'Chemistry' },
  { id: 'mate', label: 'Materials & metals' },
  { id: 'eng', label: 'Engineering & inventing' },
  { id: 'bio', label: 'Biology' },
  { id: 'comp', label: 'Computing' },
  { id: 'phil', label: 'Philosophy' },
  { id: 'econ', label: 'Economics' },
];

export const PEOPLE = [
  // mathematics
  p('Pythagoras', -570, -495, 'math', 'Greek thinker whose school proved the right-triangle rule and taught that “all is number”.', 'Pythagoras', 'Pythagor', true),
  p('Euclid', -325, -265, 'math', 'Wrote the Elements, the geometry textbook used for over 2,000 years, built step by step from proofs.', 'Euclid', null, true),
  p('Archimedes', -287, -212, 'math', 'Mathematician and engineer of Syracuse: levers, buoyancy, the area of a circle, huge numbers.', 'Archimedes', null, true),
  p('Eratosthenes', -276, -194, 'math', 'Measured the size of the Earth with shadows and invented a sieve for finding primes.', 'Eratosthenes', null, true),
  p('Hipparchus', -190, -120, 'math', 'Greek astronomer who made the first table of chords, the start of trigonometry.', 'Hipparchus', null, true),
  p('Aryabhata', 476, 550, 'math', 'Indian astronomer who tabulated the half-chord, the function we call sine.', 'Aryabhata'),
  p('Brahmagupta', 598, 668, 'math', 'Indian mathematician who gave rules for zero and negative numbers.', 'Brahmagupta', null, true),
  p('Muhammad ibn Musa al-Khwarizmi', 780, 850, 'math', 'Baghdad scholar whose book al-Jabr gave algebra its name; “algorithm” comes from his name.', 'Muhammad_ibn_Musa_al-Khwarizmi', 'Khwarizmi', true),
  p('Fibonacci', 1170, 1250, 'math', 'Brought Hindu–Arabic numerals to Europe in his Liber Abaci (1202).', 'Fibonacci', null, true),
  p('René Descartes', 1596, 1650, 'phil', 'Joined algebra and geometry with coordinates, and asked what cannot be doubted (“I think, therefore I am”).', 'René_Descartes', 'Descartes'),
  p('Isaac Newton', 1643, 1727, 'phys', 'Laws of motion and gravity, calculus, and the theory of colour.', 'Isaac_Newton', 'Newton'),
  p('Gottfried Wilhelm Leibniz', 1646, 1716, 'math', 'Invented calculus independently of Newton, with the dx notation we still use, and studied binary numbers.', 'Gottfried_Wilhelm_Leibniz', 'Leibniz'),
  p('Leonhard Euler', 1707, 1783, 'math', 'The most productive mathematician in history: e, functions, graph theory, column buckling.', 'Leonhard_Euler', 'Euler'),
  p('Carl Friedrich Gauss', 1777, 1855, 'math', 'Least squares, the bell curve and much of number theory.', 'Carl_Friedrich_Gauss', 'Gauss'),
  p('Adrien-Marie Legendre', 1752, 1833, 'math', 'First to publish the method of least squares (1805).', 'Adrien-Marie_Legendre', 'Legendre'),
  p('Thomas Bayes', 1701, 1761, 'math', 'English minister whose rule for updating beliefs with evidence was published after his death.', 'Thomas_Bayes', 'Bayes'),
  p('Pierre-Simon Laplace', 1749, 1827, 'math', 'Developed probability theory and the rule of succession.', 'Pierre-Simon_Laplace', 'Laplace'),
  p('Ronald Fisher', 1890, 1962, 'math', 'Founded modern experimental design, analysis of variance and significance tests.', 'Ronald_Fisher', 'Fisher'),

  // physics
  p('Galileo Galilei', 1564, 1642, 'phys', 'Tested falling and rolling with experiments and turned the telescope on the sky.', 'Galileo_Galilei', 'Galileo'),
  p('Johannes Kepler', 1571, 1630, 'phys', 'Found that planets move in ellipses.', 'Johannes_Kepler', 'Kepler'),
  p('Robert Hooke', 1635, 1703, 'phys', 'Spring law (stretch is proportional to force) and the first drawings of “cells”.', 'Robert_Hooke', 'Hooke'),
  p('Christiaan Huygens', 1629, 1695, 'phys', 'Built the first accurate pendulum clock and a wave theory of light.', 'Christiaan_Huygens', 'Huygens'),
  p('James Prescott Joule', 1818, 1889, 'phys', 'Showed that work turns into heat in a fixed ratio.', 'James_Prescott_Joule', 'Joule'),
  p('Georg Ohm', 1789, 1854, 'phys', 'Found that current is proportional to voltage (1827).', 'Georg_Ohm', 'Ohm'),
  p('Michael Faraday', 1791, 1867, 'phys', 'Discovered electromagnetic induction and the laws of electrolysis.', 'Michael_Faraday', 'Faraday'),
  p('James Clerk Maxwell', 1831, 1879, 'phys', 'Unified electricity, magnetism and light in four equations.', 'James_Clerk_Maxwell', 'Maxwell'),
  p('Gustav Kirchhoff', 1824, 1887, 'phys', 'Circuit laws and the start of spectroscopy.', 'Gustav_Kirchhoff', 'Kirchhoff'),
  p('Nikola Tesla', 1856, 1943, 'eng', 'Inventor of the AC induction motor and polyphase power.', 'Nikola_Tesla', 'Tesla'),
  p('Wilhelm Röntgen', 1845, 1923, 'phys', 'Discovered X-rays in 1895 (first Nobel Prize in Physics, 1901).', 'Wilhelm_Röntgen', 'Röntgen'),
  p('Marie Curie', 1867, 1934, 'chem', 'Pioneer of radioactivity; the only person to win Nobel Prizes in two sciences.', 'Marie_Curie', 'Curie'),
  p('Ernest Rutherford', 1871, 1937, 'phys', 'Found the atomic nucleus by firing alpha particles at gold foil (1911).', 'Ernest_Rutherford', 'Rutherford'),
  p('Niels Bohr', 1885, 1962, 'phys', 'Model of the atom with electrons in fixed energy levels (1913).', 'Niels_Bohr', 'Bohr'),
  p('Albert Einstein', 1879, 1955, 'phys', 'Relativity, light as photons, and E = mc².', 'Albert_Einstein', 'Einstein'),
  p('Erwin Schrödinger', 1887, 1961, 'phys', 'Wave equation for electrons, the basis of orbitals.', 'Erwin_Schrödinger', 'Schrödinger'),
  p('Arthur Eddington', 1882, 1944, 'phys', 'Led the 1919 eclipse expedition that tested Einstein’s light bending.', 'Arthur_Eddington', 'Eddington'),

  // chemistry
  p('Antoine Lavoisier', 1743, 1794, 'chem', 'Weighed reactions carefully, named oxygen and showed mass is conserved.', 'Antoine_Lavoisier', 'Lavoisier'),
  p('John Dalton', 1766, 1844, 'chem', 'Modern atomic theory: each element has its own kind of atom with its own weight.', 'John_Dalton', 'Dalton'),
  p('Amedeo Avogadro', 1776, 1856, 'chem', 'Equal volumes of gas hold equal numbers of molecules.', 'Amedeo_Avogadro', 'Avogadro'),
  p('Robert Boyle', 1627, 1691, 'chem', 'Pressure times volume is constant for a gas at fixed temperature.', 'Robert_Boyle', 'Boyle'),
  p('Dmitri Mendeleev', 1834, 1907, 'chem', 'Arranged the elements into the periodic table (1869) and predicted missing ones.', 'Dmitri_Mendeleev', 'Mendeleev'),
  p('Svante Arrhenius', 1859, 1927, 'chem', 'Rate law with temperature, and the theory of ions in solution.', 'Svante_Arrhenius', 'Arrhenius'),
  p('Josiah Willard Gibbs', 1839, 1903, 'chem', 'Free energy and the phase rule: the foundations of chemical thermodynamics.', 'Josiah_Willard_Gibbs', 'Gibbs'),
  p('Ludwig Boltzmann', 1844, 1906, 'phys', 'Explained entropy by counting arrangements of atoms: S = k ln W.', 'Ludwig_Boltzmann', 'Boltzmann'),
  p('Linus Pauling', 1901, 1994, 'chem', 'The nature of the chemical bond and the protein α-helix. Two unshared Nobel Prizes.', 'Linus_Pauling', 'Pauling'),
  p('Wallace Carothers', 1896, 1937, 'chem', 'Invented nylon at DuPont (1935) and proved polymers are long chains.', 'Wallace_Carothers', 'Carothers'),
  p('Hermann Staudinger', 1881, 1965, 'chem', 'Argued that polymers are giant molecules held by ordinary bonds (Nobel Prize 1953).', 'Hermann_Staudinger', 'Staudinger'),
  p('Leo Baekeland', 1863, 1944, 'chem', 'Made Bakelite (1907), the first fully synthetic plastic.', 'Leo_Baekeland', 'Baekeland'),
  p('Stephanie Kwolek', 1923, 2014, 'chem', 'Discovered the fibre that became Kevlar (1965).', 'Stephanie_Kwolek', 'Kwolek'),

  // materials & metals
  p('Henry Clifton Sorby', 1826, 1908, 'mate', 'First to polish, etch and look at steel under a microscope (1863), founding metallography.', 'Henry_Clifton_Sorby', 'Sorby'),
  p('Henry Bessemer', 1813, 1898, 'mate', 'Blew air through molten iron to make cheap steel (1856).', 'Henry_Bessemer', 'Bessemer'),
  p('Robert Mushet', 1811, 1891, 'mate', 'Fixed Bessemer steel with manganese and made the first self-hardening tool steel.', 'Robert_Forester_Mushet', 'Mushet'),
  p('Robert Hadfield', 1858, 1940, 'mate', 'Invented manganese steel (1882) and silicon electrical steel.', 'Robert_Hadfield', 'Hadfield'),
  p('Harry Brearley', 1871, 1948, 'mate', 'Credited with the first commercial stainless steel, in Sheffield (1913).', 'Harry_Brearley', 'Brearley'),
  p('Alfred Wilm', 1869, 1937, 'mate', 'Discovered age hardening in aluminium after a weekend away from his tests (1906).', 'Alfred_Wilm', 'Wilm'),
  p('Charles Martin Hall', 1863, 1914, 'mate', 'Co-invented cheap aluminium by electrolysis (1886), in the same year as Paul Héroult.', 'Charles_Martin_Hall', 'Charles Martin Hall|Hall–Héroult|Hall and Héroult'),
  p('William Lawrence Bragg', 1890, 1971, 'mate', 'With his father, used X-rays to find where atoms sit in crystals (Nobel Prize 1915, aged 25).', 'Lawrence_Bragg', 'Bragg'),
  p('Max von Laue', 1879, 1960, 'phys', 'Showed in 1912 that crystals diffract X-rays.', 'Max_von_Laue', 'Laue'),
  p('William Hallowes Miller', 1801, 1880, 'mate', 'Mineralogist who gave crystal planes their (hkl) names in 1839.', 'William_Hallowes_Miller', 'W(illiam)?\\.? ?H(allowes)?\\.? Miller|Miller ind|Miller’s'),
  p('Alan Arnold Griffith', 1893, 1963, 'mate', 'Explained why glass breaks far below its ideal strength: cracks (1921).', 'Alan_Arnold_Griffith', 'Griffith'),
  p('Geoffrey Ingram Taylor', 1886, 1975, 'mate', 'One of three who proposed dislocations in 1934 (with Orowan and Polanyi).', 'G._I._Taylor', 'G\\. ?I\\. Taylor|Geoffrey (Ingram )?Taylor|Taylor, Orowan'),
  p('Egon Orowan', 1902, 1989, 'mate', 'Co-proposed dislocations and explained how particles block them.', 'Egon_Orowan', 'Orowan'),
  p('Constance Tipper', 1894, 1995, 'mate', 'Found why Liberty ships cracked: the ductile-to-brittle transition of steel.', 'Constance_Tipper', 'Tipper'),
  p('Jan Czochralski', 1885, 1953, 'mate', 'Invented the crystal-pulling method that grows silicon for chips (1916).', 'Jan_Czochralski', 'Czochralski'),
  p('William Gardner Pfann', 1917, 1982, 'mate', 'Invented zone refining at Bell Labs, making ultra-pure germanium and silicon possible.', 'William_Gardner_Pfann', 'Pfann'),
  p('Nikolai Chvorinov', 1903, 1988, 'mate', 'Czech foundry engineer behind the rule for how long castings take to freeze (1940).', 'Chvorinov%27s_rule', 'Chvorinov'),
  p('Walter Jominy', 1893, 1976, 'mate', 'Devised the end-quench test for hardenability (1938).', 'Jominy_end_quench_test', 'Jominy'),
  p('August Wöhler', 1819, 1914, 'mate', 'Railway engineer who first tested fatigue systematically and drew S–N curves.', 'August_Wöhler', 'Wöhler'),
  p('Michael Ashby', 1942, null, 'mate', 'Created the materials selection charts used by engineers worldwide.', 'Michael_F._Ashby', 'Ashby'),
  p('John Goodenough', 1922, 2023, 'mate', 'Found the lithium cobalt oxide cathode (1980); shared the 2019 Nobel Prize for lithium-ion batteries.', 'John_B._Goodenough', 'Goodenough'),
  p('Andre Geim', 1958, null, 'mate', 'Isolated graphene with sticky tape with Konstantin Novoselov (2004; Nobel Prize 2010).', 'Andre_Geim', 'Geim'),

  // engineering
  p('Otto Schott', 1851, 1935, 'eng', 'Glass chemist who made borosilicate glass and precise optical glass.', 'Otto_Schott', 'Schott'),
  p('John Charnley', 1911, 1982, 'eng', 'Surgeon who designed the modern hip replacement with a polyethylene cup.', 'John_Charnley', 'Charnley'),
  p('Gaspard Monge', 1746, 1818, 'eng', 'Invented descriptive geometry, the basis of technical drawing.', 'Gaspard_Monge', 'Monge'),
  p('Henry Ford', 1863, 1947, 'eng', 'Introduced the moving assembly line for cars (1913).', 'Henry_Ford', 'Henry Ford|Ford’s'),
  p('Walter Shewhart', 1891, 1967, 'eng', 'Invented the control chart at Bell Labs (1924).', 'Walter_A._Shewhart', 'Shewhart'),

  // biology
  p('Antonie van Leeuwenhoek', 1632, 1723, 'bio', 'Draper who made tiny lenses and first saw bacteria (from 1673).', 'Antonie_van_Leeuwenhoek', 'Leeuwenhoek'),
  p('Rudolf Virchow', 1821, 1902, 'bio', '“Every cell comes from a cell” (1855).', 'Rudolf_Virchow', 'Virchow'),
  p('Erwin Chargaff', 1905, 2002, 'bio', 'Found that DNA has as much A as T and as much G as C.', 'Erwin_Chargaff', 'Chargaff'),
  p('Rosalind Franklin', 1920, 1958, 'bio', 'Her X-ray image “Photo 51” showed DNA is a helix.', 'Rosalind_Franklin', 'Rosalind Franklin|Franklin’s'),
  p('Francis Crick', 1916, 2004, 'bio', 'With James Watson, built the double-helix model of DNA (1953).', 'Francis_Crick', 'Crick'),
  p('Alexander Fleming', 1881, 1955, 'bio', 'Noticed a mould killing bacteria on a dish: penicillin (1928).', 'Alexander_Fleming', 'Fleming'),
  p('Frances Arnold', 1956, null, 'bio', 'Directed evolution of enzymes (Nobel Prize in Chemistry 2018).', 'Frances_Arnold', 'Frances Arnold'),
  p('Kary Mullis', 1944, 2019, 'bio', 'Invented PCR for copying DNA (1983).', 'Kary_Mullis', 'Mullis'),

  // computing
  p('George Boole', 1815, 1864, 'comp', 'Turned logic into algebra with true and false as 1 and 0.', 'George_Boole', 'Boole'),
  p('Charles Babbage', 1791, 1871, 'comp', 'Designed the Difference and Analytical Engines, mechanical computers.', 'Charles_Babbage', 'Babbage'),
  p('Ada Lovelace', 1815, 1852, 'comp', 'Wrote the first published program, for the Analytical Engine (1843).', 'Ada_Lovelace', 'Lovelace'),
  p('Alan Turing', 1912, 1954, 'comp', 'Defined what can be computed, helped break Enigma, and proposed the Turing test.', 'Alan_Turing', 'Turing'),
  p('Claude Shannon', 1916, 2001, 'comp', 'Founded information theory and the idea of the bit (1948).', 'Claude_Shannon', 'Shannon'),
  p('John von Neumann', 1903, 1957, 'comp', 'Stored-program computers, game theory, and merge sort.', 'John_von_Neumann', 'von Neumann|Neumann'),
  p('Grace Hopper', 1906, 1992, 'comp', 'Built the first compiler (A-0, 1952) and pushed for English-like languages.', 'Grace_Hopper', 'Hopper'),
  p('Edsger Dijkstra', 1930, 2002, 'comp', 'Shortest-path method (1959) and structured programming.', 'Edsger_W._Dijkstra', 'Dijkstra'),
  p('Geoffrey Hinton', 1947, null, 'comp', 'Helped make backpropagation and deep learning work (Nobel Prize in Physics 2024).', 'Geoffrey_Hinton', 'Hinton'),

  // philosophy
  p('Socrates', -470, -399, 'phil', 'Asked “what do you mean by that?” until definitions held up.', 'Socrates', null, true),
  p('Aristotle', -384, -322, 'phil', 'First system of formal logic (syllogisms) and much early science.', 'Aristotle'),
  p('David Hume', 1711, 1776, 'phil', 'Asked why we expect the future to be like the past (the problem of induction).', 'David_Hume', 'Hume'),
  p('Immanuel Kant', 1724, 1804, 'phil', 'Duty-based ethics: treat people never merely as a means.', 'Immanuel_Kant', 'Kant'),
  p('John Stuart Mill', 1806, 1873, 'phil', 'Utilitarianism and methods for finding causes.', 'John_Stuart_Mill', 'Stuart Mill|Mill’s'),
  p('Karl Popper', 1902, 1994, 'phil', 'A scientific theory must be able to fail a test (falsifiability).', 'Karl_Popper', 'Popper'),
  p('Thomas Kuhn', 1922, 1996, 'phil', 'Science changes through paradigm shifts.', 'Thomas_Kuhn', 'Kuhn'),

  // economics
  p('Adam Smith', 1723, 1790, 'econ', 'The Wealth of Nations (1776) and the pin factory.', 'Adam_Smith', 'Adam Smith|Smith’s'),
  p('David Ricardo', 1772, 1823, 'econ', 'Comparative advantage: why trade helps both sides.', 'David_Ricardo', 'Ricardo'),
  p('Alfred Marshall', 1842, 1924, 'econ', 'Supply and demand as two blades of a pair of scissors.', 'Alfred_Marshall', 'Marshall'),
  p('John Maynard Keynes', 1883, 1946, 'econ', 'The General Theory (1936) and the spending multiplier.', 'John_Maynard_Keynes', 'Keynes'),
  p('John Nash', 1928, 2015, 'econ', 'The Nash equilibrium in game theory (Nobel memorial prize 1994).', 'John_Forbes_Nash_Jr.', 'Nash'),
  p('Daniel Kahneman', 1934, 2024, 'econ', 'Prospect theory with Amos Tversky: losses hurt more than gains please.', 'Daniel_Kahneman', 'Kahneman'),
];
