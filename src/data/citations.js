// Numbered sources for the 159 core and track classes.
//
// Each entry is a Wikipedia article title. Written as "Title|key1,key2" the
// keys are the words that tie a story paragraph to that source; without keys
// the last word of the title is used (so "Isaac Newton" marks every paragraph
// that says "Newton"). A key of * means "use this for any paragraph that names
// none of the other sources" (usually the article on the topic itself).
// Paragraphs are marked [n] automatically in applyCitations() below.
//
// These are encyclopedia articles about the people and events named in each
// story, so you can check every claim. They were checked to exist; the
// sentences in each story were not all checked word by word against them.

export const CITES = {
  'num-001': ['Lebombo bone|Lebombo', 'Ishango bone|Ishango', 'Tally marks|*'],
  'chem-000': ['Empedocles', 'Classical element|*', 'Alchemy|alchem', 'Robert Boyle', 'The Sceptical Chymist|Sceptical', 'Antoine Lavoisier', 'Marie-Anne Paulze Lavoisier|Marie-Anne'],
  'num-002': ['Cuneiform|Uruk,Sumer,cuneiform', 'Egyptian numerals|Egypt', 'Babylonian cuneiform numerals|Babylon', 'Roman numerals|Roman,Rome'],
  'num-003': ['0|*', 'Brahmagupta', 'Muhammad ibn Musa al-Khwarizmi|Khwarizmi', 'Fibonacci|Fibonacci,Pisa', 'Liber Abaci'],
  'num-004': ['Salamis Tablet|Salamis', 'Abacus|abacus,counting board,counting-board', 'Johannes Widmann|Widmann', 'Robert Recorde|Recorde', 'Plus and minus signs|*'],
  'phys-001': ['History of timekeeping devices|*', 'Water clock|water clock,clepsydra', 'Galileo Galilei|Galileo', 'Pendulum clock|pendulum', 'Christiaan Huygens|Huygens'],
  'num-005': ['Rhind Mathematical Papyrus|Ahmes,Rhind,Egypt', 'Chinese mathematics|China,Chinese', 'William Oughtred|Oughtred', 'Fraction|*'],
  'mate-001': ['Bronze Age|bronze', 'Iron Age|iron smelting', 'Morris E. Fine|Morris Fine', 'Henry Bessemer|Bessemer', 'Materials science|*'],
  'phys-002': ['Archimedes', "Archimedes' principle|*", 'Eureka (word)|Eureka', 'Syracuse, Sicily|Syracuse'],
  'num-006': ['Prime number|*', "Euclid's theorem|Euclid", 'Sieve of Eratosthenes|Eratosthenes', 'Carl Friedrich Gauss|Gauss', 'RSA (cryptosystem)|RSA'],
  'phys-003': ['Aristotle', 'Galileo Galilei|Galileo', 'Two New Sciences|*', 'Apollo 15|Moon,Apollo,feather,Scott'],
  'math-002': ['Rhind Mathematical Papyrus|*', 'Ancient Egyptian mathematics|Egypt,Nile'],
  'math-001': ['Brahmagupta', 'Brāhmasphuṭasiddhānta|*', 'Negative number|negative,debt'],
  'chem-002': ['Antoine Lavoisier|Lavoisier', 'History of the metric system|*', 'Mars Climate Orbiter|Mars,NASA,Orbiter'],
  'num-007': ['Liu Hui', 'Jamshīd al-Kāshī|Kashi,Kāshī', 'Simon Stevin|Stevin', 'John Napier|Napier', 'Decimal|*'],
  'num-008': ['Hippasus', 'Square root of 2|*', "Euclid's Elements|Euclid", 'Johann Heinrich Lambert|Lambert', 'Richard Dedekind|Dedekind'],
  'eng-001': ['Leonardo da Vinci|Leonardo', 'Gaspard Monge|Monge', 'Descriptive geometry|*', 'Technical drawing|standard'],
  'math-004': ['Archimedes', 'The Sand Reckoner|*', 'René Descartes|Descartes', 'Exponentiation|exponent,power'],
  'num-010': ['Robert Recorde|Recorde', 'Equals sign|*', 'François Viète|Viète,Viete', 'Leonhard Euler|Euler', 'Giuseppe Peano|Peano', 'History of mathematical notation|notation'],
  'chem-003': ['Antoine Lavoisier|Lavoisier', 'Marie-Anne Paulze Lavoisier|Marie-Anne', 'Amedeo Avogadro|Avogadro', 'Mole (unit)|*'],
  'geo-001': ['Plimpton 322|Plimpton,Babylon', 'Pythagoras', 'Pythagorean theorem|*', 'Euclid', "Euclid's Elements|Elements,Lincoln"],
  'chem-004': ['Johann Wolfgang Döbereiner|Döbereiner', 'John Newlands (chemist)|Newlands', 'Dmitri Mendeleev|Mendeleev', "Mendeleev's predicted elements|eka-,predict", 'Henry Moseley|Moseley', 'William Ramsay|Ramsay,noble gas', 'History of the periodic table|*'],
  'math-003': ['Muhammad ibn Musa al-Khwarizmi|Khwarizmi', 'The Compendious Book on Calculation by Completion and Balancing|Kitab,Jabr', 'House of Wisdom|Ma’mun,Baghdad', 'History of algebra|*'],
  'phys-004': ['Isaac Newton|Newton', 'Woolsthorpe Manor|Woolsthorpe', 'Edmond Halley|Halley', 'Philosophiæ Naturalis Principia Mathematica|Principia,Royal Society', "Newton's laws of motion|*"],
  'chem-001': ['Democritus|Democritus,atomos', 'Atomism|*', 'Geiger–Marsden experiments|gold foil,alpha', 'Ernest Rutherford|Rutherford', 'Atomic nucleus|nucleus'],
  'math-005': ['René Descartes|Descartes', 'Cartesian coordinate system|*', 'Young\'s modulus|Young', 'La Géométrie|Géométrie'],
  'phys-005': ['Caloric theory|caloric', 'Benjamin Thompson|Rumford', 'James Prescott Joule|Joule', 'Hermann von Helmholtz|Helmholtz', 'Conservation of energy|*'],
  'chem-006': ['Robert Boyle|Boyle', "Boyle's law|Hooke,mercury", 'Jacques Charles|Charles', 'Joseph Louis Gay-Lussac|Gay-Lussac', 'Absolute zero|Kelvin,−273', 'Amedeo Avogadro|Avogadro', 'Benoît Paul Émile Clapeyron|Clapeyron', 'Kinetic theory of gases|Maxwell', 'Ideal gas law|*'],
  'math-009': ['Nicole Oresme|Oresme', 'Gottfried Wilhelm Leibniz|Leibniz', 'Leonhard Euler|Euler', 'Joseph Fourier|Fourier', 'Peter Gustav Lejeune Dirichlet|Dirichlet', 'History of the function concept|*'],
  'mate-100': ['John Lennard-Jones|Lennard-Jones', 'Lennard-Jones potential|*', 'Pauli exclusion principle|Pauli', 'Thermal expansion|expand'],
  'geo-002': ['Hipparchus', 'Ptolemy|Ptolemy,Almagest', 'Aryabhata', 'Sine and cosine|jyā,sinus,sine', 'Al-Battani|Battānī,Battani', 'Leonhard Euler|Euler', 'History of trigonometry|*'],
  'chem-013': ['Martin Heinrich Klaproth|Klaproth', 'Jöns Jacob Berzelius|Berzelius', 'Theodore William Richards|Richards', 'Gravimetric analysis|*', 'Isotope|isotope'],
  'mate-102': ['Max von Laue|Laue', 'Lawrence Bragg|Bragg', 'William Henry Bragg|father', "Bragg's law|*"],
  'math-006': ['Babylonian mathematics|*,Babylon,BM 13901', 'Muhammad ibn Musa al-Khwarizmi|Khwarizmi', 'Completing the square|Completing', 'Quadratic formula|Quadratic'],
  'mate-110': ['Xianrendong Cave|Xianrendong,pottery', 'Copper|Copper', 'Leo Baekeland|Baekeland', 'Bakelite', 'Fiberglass|fibreglass,glass fibre', 'Carbon fibers|carbon fibre', 'Composite material|*'],
  'eng-002': ['Ivan Sutherland|Sutherland', 'Sketchpad', 'Pierre Bézier|Bézier', 'AutoCAD', 'PTC Creo|Geisberg,Pro/ENGINEER', 'FreeCAD', 'Computer-aided design|*'],
  'math-010': ['Aryabhata', 'Sine and cosine|jya,sinus,sine', 'Roger Cotes|Cotes', 'Radian|*', 'James Thomson (engineer)|Thomson', 'Joseph Fourier|Fourier'],
  'phys-101': ['Robert Hooke|Hooke', "Hooke's law|*", 'Thomas Young (scientist)|Young', 'Augustin-Louis Cauchy|Cauchy', 'Cauchy stress tensor|Stress Tensor'],
  'num-009': ['Gerolamo Cardano|Cardano', 'Ars Magna (Cardano book)|Ars Magna', 'Rafael Bombelli|Bombelli', 'Complex number|*', 'Caspar Wessel|Wessel', 'Carl Friedrich Gauss|Gauss', 'Charles Proteus Steinmetz|Steinmetz'],
  'math-011': ['Simon Stevin|Stevin', 'Parallelogram of force|parallelogram', 'William Rowan Hamilton|Hamilton', 'Quaternion|quaternion,Broom Bridge', 'Hermann Grassmann|Grassmann', 'Josiah Willard Gibbs|Gibbs', 'Oliver Heaviside|Heaviside', 'Euclidean vector|*'],
  'chem-007': ['William Henry (chemist)|Henry', "Henry's law|*", 'François-Marie Raoult|Raoult', "Jacobus Henricus van 't Hoff|van ’t Hoff,Nobel Prize in Chemistry", 'Svante Arrhenius|Arrhenius'],
  'phys-006': ['Luigi Galvani|Galvani', 'Alessandro Volta|Volta', 'Voltaic pile|pile', 'Georg Ohm|Ohm', "Ohm's law|*", 'J. J. Thomson|Thomson', 'Electric current|Franklin,conventional'],
  'math-007': ['The Nine Chapters on the Mathematical Art|Nine Chapters,Fangcheng', 'Gaussian elimination|Gaussian', 'Carl Friedrich Gauss|Gauss,Ceres', 'System of linear equations|*'],
  'phys-007': ['Niccolò Fontana Tartaglia|Tartaglia', 'Galileo Galilei|Galileo', 'Two New Sciences|Two New Sciences', 'Projectile motion|*'],
  'math-008': ['John Napier|Napier', 'Logarithm|*', 'E (mathematical constant)|e ≈', 'Leonhard Euler|Euler', 'Arrhenius equation|Arrhenius'],
  'chem-008': ['Catalysis|catalysis', 'Ludwig Wilhelmy|Wilhelmy', 'Augustus George Vernon Harcourt|Harcourt,Esson', 'Arrhenius equation|Arrhenius', 'Reaction rate|*'],
  'math-016': ['Jacob Bernoulli|Bernoulli', 'E (mathematical constant)|*', 'Leonhard Euler|Euler', 'Introductio in analysin infinitorum|Introductio'],
  'mate-111': ['René Just Haüy|Haüy', 'William Whewell|Whewell', 'William Hallowes Miller|Miller', 'Miller index|*', 'Auguste Bravais|Bravais', 'Bravais lattice|lattice'],
  'chem-009': ['Claude Louis Berthollet|Berthollet', 'Cato Maximilian Guldberg|Guldberg', 'Peter Waage|Waage', 'Law of mass action|mass action', 'Henry Louis Le Chatelier|Le Chatelier', 'Chemical equilibrium|*'],
  'phys-008': ['René Descartes|Descartes', 'Christiaan Huygens|Huygens', 'Christopher Wren|Wren', 'Momentum|*', 'Elastic collision|elastic'],
  'math-012': ['Zeno of Elea|Zeno', "Zeno's paradoxes|*", 'George Berkeley|Berkeley', 'Augustin-Louis Cauchy|Cauchy', 'Karl Weierstrass|Weierstrass', '(ε, δ)-definition of limit|epsilon,ε'],
  'chem-010': ['Robert Boyle|Boyle', 'Svante Arrhenius|Arrhenius', 'S. P. L. Sørensen|Sørensen', 'PH|*', 'Johannes Nicolaus Brønsted|Brønsted', 'Thomas Martin Lowry|Lowry'],
  'math-101': ['Isaac Newton|Newton', 'Gottfried Wilhelm Leibniz|Leibniz', 'Leibniz–Newton calculus controversy|*', 'Derivative|derivative,slope'],
  'phys-009': ['Archimedes', 'Christiaan Huygens|Huygens', 'Leonhard Euler|Euler', 'Rotation around a fixed axis|*', 'Moment of inertia|inertia'],
  'chem-011': ['Alessandro Volta|Volta', 'Michael Faraday|Faraday', "Faraday's laws of electrolysis|electrolysis", 'John Frederic Daniell|Daniell', 'Walther Nernst|Nernst', 'Electrochemistry|*'],
  'math-014': ['Isaac Newton|Newton', 'Gottfried Wilhelm Leibniz|Leibniz', 'Johann Bernoulli|Bernoulli', "Guillaume de l'Hôpital|Hôpital", "L'Hôpital's rule|*"],
  'mate-114': ['Friedrich Mohs|Mohs', 'Mohs scale|scratch', 'Johan August Brinell|Brinell', 'Rockwell scale|Rockwell', 'Vickers hardness test|Vickers,Smith,Sandland', 'Hardness|*'],
  'phys-010': ['Robert Hooke|Hooke', 'Christiaan Huygens|Huygens', 'Balance spring|balance', 'Simple harmonic motion|*'],
  'chem-012': ['François-Antoine-Henri Descroizilles|Descroizilles', 'Joseph Louis Gay-Lussac|Gay-Lussac', 'Karl Friedrich Mohr|Mohr', 'S. P. L. Sørensen|Sørensen', 'Titration|*'],
  'math-015': ['Johannes Kepler|Kepler', 'Pierre de Fermat|Fermat', 'Maximum and minimum|*', "Fermat's principle|light"],
  'phys-011': ['Pythagoras', 'Pythagorean tuning|string', 'Marin Mersenne|Mersenne', 'Pierre-Simon Laplace|Laplace', 'Speed of sound|*', 'Floyd Firestone|Firestone', 'Ultrasonic testing|ultrasound,ultrasonic'],
  'mate-115': ['Henry Clifton Sorby|Sorby', 'Metallography|*', 'Max Knoll|Knoll', 'Ernst Ruska|Ruska', 'Manfred von Ardenne|Ardenne', 'Electron microscope|electron microscope'],
  'chem-005': ['Niels Bohr|Bohr', 'Louis de Broglie|Broglie', 'Wolfgang Pauli|Pauli', 'Erwin Schrödinger|Schrödinger', 'Max Born|Born', 'Atomic orbital|*'],
  'math-102': ['Archimedes', 'Isaac Barrow|Barrow', 'Isaac Newton|Newton', 'Gottfried Wilhelm Leibniz|Leibniz', 'Fundamental theorem of calculus|*', 'Integral|integral'],
  'phys-012': ['Daniel Gabriel Fahrenheit|Fahrenheit', 'Anders Celsius|Celsius', 'Joseph Black|Black', 'Latent heat|latent', 'James Prescott Joule|Joule', 'Specific heat capacity|*'],
  'mate-112': ['Wilhelm Röntgen|Röntgen', 'Max von Laue|Laue', 'William Henry Bragg|Bragg', 'Lawrence Bragg|Lawrence', 'X-ray crystallography|*'],
  'phys-013': ['Ibn al-Haytham|Haytham', 'Book of Optics|Optics', 'Willebrord Snellius|Snell', "Snell's law|*", 'Robert Hooke|Hooke', 'Micrographia', 'Antonie van Leeuwenhoek|Leeuwenhoek', 'Ernst Abbe|Abbe'],
  'math-017': ['Gottfried Wilhelm Leibniz|Leibniz', 'Johann Bernoulli|Bernoulli', 'Brook Taylor|Taylor', 'Leonhard Euler|Euler', 'Chain rule|*'],
  'chem-015': ['Friedrich Wöhler|Wöhler', 'Wöhler synthesis|urea', 'August Kekulé|Kekulé', 'Archibald Scott Couper|Couper', "Jacobus Henricus van 't Hoff|van ’t Hoff,tetrahed", 'Linus Pauling|Pauling', 'Chemical bond|*'],
  'mate-116': ['Nicolas Léonard Sadi Carnot|Carnot', 'Rudolf Clausius|Clausius', 'Ludwig Boltzmann|Boltzmann', 'Entropy|*', 'Second law of thermodynamics|second law'],
  'mate-113': ['Yakov Frenkel|Frenkel', 'Walter H. Schottky|Schottky', 'William Hume-Rothery|Hume-Rothery', 'Grain boundary strengthening|Hall,Petch', 'Crystallographic defect|*'],
  'chem-014': ['Joseph von Fraunhofer|Fraunhofer', 'Beer–Lambert law|Beer', 'Robert Bunsen|Bunsen', 'Gustav Kirchhoff|Kirchhoff', 'Alan Walsh (physicist)|Walsh', 'Atomic absorption spectroscopy|atomic absorption', 'Spectroscopy|*'],
  'chem-101': ['Josiah Willard Gibbs|Gibbs', 'Gibbs free energy|*', 'Ludwig Boltzmann|Boltzmann', 'Entropy|entropy'],
  'math-018': ['Archimedes', 'Johannes Kepler|Kepler', 'Bonaventura Cavalieri|Cavalieri', "Cavalieri's principle|*"],
  'chem-016': ['Justus von Liebig|Liebig', 'William Henry Perkin|Perkin', 'Mauveine|mauve', 'Hermann Staudinger|Staudinger', 'Wallace Carothers|Carothers', 'Nylon', 'Karl Ziegler|Ziegler', 'Polymer|*'],
  'mate-201': ['Adolf Eugen Fick|Fick', "Fick's laws of diffusion|Fick’s,diffusion", 'G. I. Taylor|Taylor', 'Egon Orowan|Orowan', 'Michael Polanyi|Polanyi', 'Dislocation|*,Dislocation,dislocation'],
  'math-020': ['Leonhard Euler|Euler', 'Adrien-Marie Legendre|Legendre', 'Joseph Fourier|Fourier', 'Carl Gustav Jacob Jacobi|Jacobi', 'Partial derivative|*', 'Multiple integral|integral'],
  'mate-301': ['Hermann Staudinger|Staudinger', 'Richard Feynman|Feynman', "There's Plenty of Room at the Bottom|Plenty", 'Polymer|*'],
  'mate-117': ['Josiah Willard Gibbs|Gibbs', 'Phase rule|*', 'Hendrik Willem Bakhuis Roozeboom|Roozeboom', 'Phase diagram|diagram'],
  'math-022': ['Gerolamo Cardano|Cardano', 'Blaise Pascal|Pascal', 'Pierre de Fermat|Fermat', 'Problem of points|points,gambl', 'Christiaan Huygens|Huygens', 'Jacob Bernoulli|Bernoulli', 'Law of large numbers|large numbers', 'Probability theory|*'],
  'mate-118': ['Paul Drude|Drude', 'Drude model|*', 'Felix Bloch|Bloch', 'Alan Herries Wilson|Wilson', 'Electronic band structure|band'],
  'mate-202': ['William Chandler Roberts-Austen|Roberts-Austen', 'Hendrik Willem Bakhuis Roozeboom|Roozeboom', 'Austenite|*'],
  'math-021': ['Abraham de Moivre|Moivre', 'Carl Friedrich Gauss|Gauss', 'Adolphe Quetelet|Quetelet', 'Francis Galton|Galton', 'Karl Pearson|Pearson', 'Normal distribution|*'],
  'mate-401': ['John Bardeen|Bardeen', 'Walter Houser Brattain|Brattain', 'Transistor|transistor', 'Shuji Nakamura|Nakamura', 'Light-emitting diode|*'],
  'mate-119': ['Daniel Gabriel Fahrenheit|Fahrenheit', 'Supercooling|supercool', 'Max Volmer|Volmer', 'Richard Becker (physicist)|Becker', 'Nucleation|*'],
  'math-019': ['Madhava of Sangamagrama|Madhava', 'James Gregory (mathematician)|Gregory', 'Brook Taylor|Taylor', 'Colin Maclaurin|Maclaurin', 'Taylor series|*'],
  'math-023': ['Adrien-Marie Legendre|Legendre', 'Carl Friedrich Gauss|Gauss', 'Least squares|*', 'Francis Galton|Galton', 'Regression toward the mean|regression', 'Karl Pearson|Pearson'],
  'mate-203': ['Edgar Bain|Bain', 'Bainite', 'Adolf Martens|Martens', 'Martensite', 'Isothermal transformation diagram|*'],
  'math-024': ['John Arbuthnot|Arbuthnot', 'William Sealy Gosset|Gosset,Guinness', "Student's t-test|t-test,Student", 'Ronald Fisher|Fisher', 'Jerzy Neyman|Neyman', 'Egon Pearson|Pearson', 'Statistical hypothesis test|*'],
  'mate-302': ['Alan Arnold Griffith|Griffith', 'George Rankine Irwin|Irwin', 'Fracture mechanics|*', 'Fracture toughness|toughness'],
  'math-025': ['Isaac Newton|Newton', 'Jacob Bernoulli|Jacob', 'Johann Bernoulli|Johann', 'Leonhard Euler|Euler', 'Differential equation|*'],
  'eng-003': ['Dan Bricklin|Bricklin', 'Bob Frankston|Frankston', 'VisiCalc', 'Spreadsheet|*'],
  'chem-017': ['Charles David Keeling|Keeling', 'Keeling Curve|Mauna Loa', 'Rachel Carson|Carson', 'Silent Spring', 'Mario Molina|Molina', 'F. Sherwood Rowland|Rowland', 'Montreal Protocol|Montreal', 'Green chemistry|*'],
  'math-026': ['Robert Hooke|Hooke', 'Leonhard Euler|Euler', 'Euler–Bernoulli beam theory|*', 'Catenary|catenary,arch'],
  'math-027': ['The Nine Chapters on the Mathematical Art|Nine Chapters', 'Seki Takakazu|Seki', 'Determinant|determinant', 'James Joseph Sylvester|Sylvester', 'Arthur Cayley|Cayley', 'Matrix (mathematics)|*'],
  'phys-201': ['Simon Stevin|Stevin', 'Pierre Varignon|Varignon', "Varignon's theorem (mechanics)|*", 'Mechanical equilibrium|equilibrium'],
  'math-028': ['Ronald Fisher|Fisher', 'George W. Snedecor|Snedecor', 'Analysis of variance|*', 'Rothamsted Research|Rothamsted'],
  'eng-004': ['Fibonacci|Fibonacci,Leonardo', 'Liber Abaci', 'Interest|*', 'Present value|present value'],
  'mate-120': ['Henry Louis Le Chatelier|Le Chatelier', 'William Chandler Roberts-Austen|Roberts-Austen', 'Differential scanning calorimetry|Watson,O’Neill,DSC', 'Thermal analysis|*'],
  'phys-202': ['Leonardo da Vinci|Leonardo', 'Guillaume Amontons|Amontons', 'Charles-Augustin de Coulomb|Coulomb', 'Friction|*'],
  'mate-121': ['Nikolay Benardos|Benardos', 'Elihu Thomson|Thomson', 'Oscar Kjellberg|Kjellberg', 'Welding|*', 'Shielded metal arc welding|electrode'],
  'eng-005': ['Arthur M. Wellington|Wellington', 'Engineering economics|*'],
  'math-029': ['Ronald Fisher|Fisher', 'Frank Yates|Yates', 'George E. P. Box|Box', 'Design of experiments|*', 'Response surface methodology|response surface'],
  'phys-203': ['Archimedes', 'Pappus of Alexandria|Pappus', 'Claude-Louis Navier|Navier', 'Second moment of area|*', 'Centroid|centroid,centre'],
  'mate-122': ['Jominy end quench test|*', 'Hardenability|hardenab'],
  'mate-123': ['Gutta-percha|gutta', 'John Wesley Hyatt|Hyatt', 'Celluloid', 'Injection moulding|*', 'Extrusion|extru'],
  'phys-204': ['Squire Whipple|Whipple', 'August Ritter|Ritter', 'Karl Culmann|Culmann', 'Truss|*', 'Method of sections|section'],
  'mate-124': ['Christian Friedrich Schönbein|Schönbein', 'Passivation (chemistry)|passiv', 'Michael Faraday|Faraday', 'Marcel Pourbaix|Pourbaix', 'Pourbaix diagram|diagram', 'Corrosion|*'],
  'phys-205': ['Leonhard Euler|Euler', 'Léon Foucault|Foucault', 'Gyroscope|*', 'Hermann Anschütz-Kaempfe|Anschütz', 'Gyrocompass|compass'],
  'phys-207': ['Georg Ohm|Ohm', 'Charles Wheatstone|Wheatstone', 'Wheatstone bridge|bridge', 'Gustav Kirchhoff|Kirchhoff', "Kirchhoff's circuit laws|*"],
  'eng-006': ['Francis Bacon|Bacon', 'Henry Oldenburg|Oldenburg', 'Philosophical Transactions of the Royal Society|Philosophical Transactions', 'Karl Popper|Popper', 'Falsifiability|falsif', 'Scientific method|*'],
  'mate-125': ['Wilhelm August Julius Albert|Albert', 'August Wöhler|Wöhler', 'Fatigue (material)|*', "Paris' law|Paris"],
  'phys-208': ['Michael Faraday|Faraday', 'Transformer|*', 'Ottó Bláthy|ZBD,Bláthy', 'William Stanley Jr.|Stanley'],
  'mate-127': ['Henry Bessemer|Bessemer', 'Robert Forester Mushet|Mushet', 'Robert Hadfield|Hadfield', 'Harry Brearley|Brearley', 'Stainless steel|stainless', 'Alloy steel|*'],
  'phys-206': ['James Watt|Watt', "Watt's linkage|linkage", 'Pafnuty Chebyshev|Chebyshev', 'Franz Reuleaux|Reuleaux', 'Franz Grashof|Grashof', 'Four-bar linkage|*'],
  'eng-007': ['Karol Adamiecki|Adamiecki', 'Henry Gantt|Gantt', 'Gantt chart|chart', 'Critical path method|*'],
  'mate-126': ['Edward Andrade|Andrade', 'Creep (deformation)|*', 'Larson–Miller parameter|Larson,Miller'],
  'phys-209': ['Nikola Tesla|Tesla', 'Charles Proteus Steinmetz|Steinmetz', 'George Westinghouse|Westinghouse', 'War of the currents|*', 'Alternating current|alternating'],
  'mate-128': ['Otto Schott|Schott', 'Borosilicate glass|borosilicate', 'Alastair Pilkington|Pilkington', 'Float glass|float', 'Corning Inc.|Corning', 'Glass|*'],
  'eng-008': ['Theodore Cooper|Cooper', 'Quebec Bridge|Quebec', 'Ritual of the Calling of an Engineer|ring', 'Roger Boisjoly|Boisjoly', 'Space Shuttle Challenger disaster|Challenger', 'Engineering ethics|*'],
  'phys-211': ['Galileo Galilei|Galileo', 'Charles-Augustin de Coulomb|Coulomb', 'Claude-Louis Navier|Navier', 'Bending|*', 'Euler–Bernoulli beam theory|beam'],
  'mate-130': ['Casting (metalworking)|*', 'Abraham Darby I|Darby', 'Chvorinov\'s rule|Chvorinov'],
  'phys-215': ['Blaise Pascal|Pascal', 'Isaac Newton|Newton', 'Viscosity|*', 'Jean Léonard Marie Poiseuille|Poiseuille', 'Sir George Stokes, 1st Baronet|Stokes'],
  'mate-133': ['Georges Charpy|Charpy', 'Charpy impact test|*', 'Constance Tipper|Tipper', 'Liberty ship|Liberty', 'Ductile–brittle transition temperature|transition'],
  'phys-212': ['Leonhard Euler|Euler', 'Buckling|*', 'Ludwig von Tetmajer|Tetmajer'],
  'mate-135': ['Michael Faraday|Faraday', 'Colloidal gold|gold', 'Richard Feynman|Feynman', "There's Plenty of Room at the Bottom|Plenty", 'Norio Taniguchi|Taniguchi', 'Gerd Binnig|Binnig', 'Heinrich Rohrer|Rohrer', 'Scanning tunneling microscope|tunnel', 'Nanotechnology|*'],
  'mate-131': ['Henry Cort|Cort', 'Joseph Bramah|Bramah', 'Mannesmann|Mannesmann', 'Rolling (metalworking)|roll', 'Forming (metalworking)|*'],
  'phys-216': ['Daniel Bernoulli|Bernoulli', "Bernoulli's principle|*", 'Giovanni Battista Venturi|Venturi', 'Osborne Reynolds|Reynolds', 'Reynolds number|Reynolds number'],
  'phys-213': ['Charles-Augustin de Coulomb|Coulomb', 'Adhémar Jean Claude Barré de Saint-Venant|Saint-Venant', 'Torsion (mechanics)|*'],
  'mate-134': ['de Havilland Comet|Comet', 'Royal Aircraft Establishment|Farnborough', 'Failure analysis|*', 'Fractography|fracture surface,fractograph'],
  'mate-132': ['William Hyde Wollaston|Wollaston', 'William D. Coolidge|Coolidge', 'Powder metallurgy|*', 'Sintering|sinter,Kuczynski'],
  'phys-214': ['Augustin-Louis Cauchy|Cauchy', 'Karl Culmann|Culmann', 'Christian Otto Mohr|Mohr', "Mohr's circle|*"],
  'mate-136': ['Harry Kroto|Kroto', 'Richard Smalley|Smalley', 'Robert Curl|Curl', 'Buckminsterfullerene|bucky,fullerene,C60', 'Sumio Iijima|Iijima', 'Carbon nanotube|nanotube', 'Andre Geim|Geim', 'Konstantin Novoselov|Novoselov', 'Graphene|*'],
  'eng-009': ['Walter A. Shewhart|Shewhart', 'Control chart|chart', 'W. Edwards Deming|Deming', 'Kaoru Ishikawa|Ishikawa', 'Ishikawa diagram|fishbone', 'Statistical process control|*'],
  'mate-137': ['Per-Ingvar Brånemark|Brånemark', 'Osseointegration|osseo,titanium', 'John Charnley|Charnley', 'Hip replacement|hip', 'Larry Hench|Hench', 'Bioglass 45S5|Bioglass', 'Biomaterial|*'],
  'eng-010': ['George E. Davis|Davis', 'Arthur Dehon Little|Little', 'Unit operation|unit operation', 'Chemical engineering|*'],
  'mate-138': ['Chuck Hull|Hull', 'Stereolithography|stereolith', 'Carl Deckard|Deckard', 'Selective laser sintering|laser sintering', 'S. Scott Crump|Crump', 'Fused filament fabrication|filament', '3D printing|*'],
  'eng-011': ['Thomas Edison|Edison', 'Georges Doriot|Doriot', 'Venture capital|venture', 'Traitorous eight|Fairchild,eight', 'Entrepreneurship|*'],
  'mate-139': ['Alessandro Volta|Volta', 'John B. Goodenough|Goodenough', 'Akira Yoshino|Yoshino', 'M. Stanley Whittingham|Whittingham', 'Lithium-ion battery|*'],
  'eng-012': ['Wilhelm von Humboldt|Humboldt', 'William Sealy Gosset|Gosset', 'Ronald Fisher|Fisher', 'Research|*'],
  'mate-402': ['Humphry Davy|Davy', 'Michael Faraday|Faraday', 'Michael F. Ashby|Ashby', 'Material selection|*'],
  'met-001': ['Abraham Darby I|Darby', 'Henry Bessemer|Bessemer', 'Bessemer process|converter', 'Basic oxygen steelmaking|Linz,oxygen', 'Steelmaking|*'],
  'met-002': ['Ellingham diagram|*', 'Harold Ellingham|Ellingham', 'Ludwig Mond|Mond', 'Mond process|carbonyl', 'Mining in the Philippines|Philippine'],
  'met-003': ['William Hume-Rothery|Hume-Rothery', 'Hume-Rothery rules|*', 'Robert Crooks Stanley|Stanley', 'Monel'],
  'met-004': ['Alfred Wilm|Wilm', 'Duralumin|Duralumin', 'André Guinier|Guinier', 'Guinier–Preston zone|*', 'Precipitation hardening|precipitat'],
  'met-005': ['Grain boundary strengthening|*', 'Grain boundary|grain boundar'],
  'met-006': ['Harry Brearley|Brearley', 'Stainless steel|stainless', 'Superalloy|*', 'Jet engine|jet'],
  'elec-001': ['Augustus Matthiessen|Matthiessen', "Matthiessen's rule|*", 'Paul Drude|Drude', 'Drude model|model'],
  'elec-002': ['Russell Ohl|Ohl', 'William Shockley|Shockley', 'Gordon Kidd Teal|Teal', 'Semiconductor|*', 'Doping (semiconductor)|dop'],
  'elec-003': ['Russell Ohl|Ohl', 'p–n junction|*', 'William Shockley|Shockley', 'Nick Holonyak|Holonyak', 'Shuji Nakamura|Nakamura', 'Light-emitting diode|LED'],
  'elec-004': ['Jan Czochralski|Czochralski', 'Czochralski method|*', 'William Gardner Pfann|Pfann', 'Zone melting|zone'],
  'elec-005': ['Ewald Georg von Kleist|Kleist', 'Pieter van Musschenbroek|Musschenbroek', 'Leyden jar|Leyden', 'Michael Faraday|Faraday', 'Dielectric|*', 'Capacitor|capacitor'],
  'elec-006': ['William Gilbert (physicist)|Gilbert', 'De Magnete', 'Pierre-Ernest Weiss|Weiss', 'Magnetic domain|domain', 'Masato Sagawa|Sagawa', 'Neodymium magnet|neodymium', 'Ferromagnetism|*'],
  'enrg-001': ['James Prescott Joule|Joule', 'Joule heating|heat', 'Gaston Planté|Planté', 'Lead–acid battery|*'],
  'enrg-002': ['Michael Faraday|Faraday', 'John B. Goodenough|Goodenough', 'Akira Yoshino|Yoshino', 'M. Stanley Whittingham|Whittingham', 'Lithium-ion battery|*'],
  'enrg-003': ['Edmond Becquerel|Becquerel', 'Photovoltaic effect|*', 'Daryl Chapin|Chapin', 'Calvin Souther Fuller|Fuller', 'Gerald Pearson|Pearson', 'William Shockley|Shockley', 'Shockley–Queisser limit|Queisser'],
  'enrg-004': ['William Robert Grove|Grove', 'Francis Thomas Bacon|Bacon', 'Fuel cell|*'],
  'enrg-005': ['Thomas Johann Seebeck|Seebeck', 'Jean Charles Athanase Peltier|Peltier', 'Abram Ioffe|Ioffe', 'Thermoelectric effect|*'],
  'enrg-006': ['Piero Ginori Conti|Ginori,Larderello', 'Geothermal power|*', 'Geothermal power in the Philippines|Philippine'],
};

const wikiUrl = (title) => `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_')).replace(/%2C/g, ',')}`;
const norm = (url) => {
  try {
    return decodeURIComponent(url).replace(/_/g, ' ').replace(/[’]/g, "'").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
};

// Adds the sources above to each class and marks every story paragraph with
// the numbers of the sources it names. Numbers match the Sources list, which
// shows the class's own sources first and then its readings.
export function applyCitations(lessons, readings) {
  for (const l of lessons) {
    const list = CITES[l.id];
    const h = l.history;
    if (!list || !h?.narrative || l.citesApplied) continue;
    l.citesApplied = true;
    const reads = readings[l.id] || [];
    const entries = list.map((s) => {
      const [title, keyStr] = s.split('|');
      const plain = title.replace(/\s*\(.*\)$/, '');
      const keys = keyStr ? keyStr.split(',').map((k) => k.trim()) : [plain.split(' ').pop()];
      return { title, keys, url: wikiUrl(title) };
    });
    // Which entries back each paragraph: the ones it names, plus the topic
    // article for a paragraph that names no one and for the last paragraph.
    const last = h.narrative.length - 1;
    const picks = h.narrative.map((p, i) => {
      if (/\[\d+\]/.test(p)) return null;
      let hit = entries.filter((e) => e.keys.some((k) => k !== '*' && p.includes(k)));
      if (!hit.length || i === last) hit = [...hit, ...entries.filter((e) => e.keys.includes('*'))];
      return hit;
    });
    // Only sources that back some paragraph are listed. Pages that are already
    // class readings are not repeated.
    const used = new Set(picks.flat().filter(Boolean));
    const isRead = (e) => reads.some((r) => r.url && norm(r.url) === norm(e.url));
    const own = entries.filter((e) => used.has(e) && !isRead(e));
    l.sources = [...(l.sources || []), ...own.map((e) => ({ label: `Wikipedia: ${e.title}`, url: e.url, note: '' }))];
    const base = l.sources.length;
    const readNums = reads.filter((r) => r.url && !l.sources.some((o) => o.url === r.url)).map((r, i) => ({ url: r.url, n: base + i + 1 }));
    const numOf = (e) => {
      const i = l.sources.findIndex((o) => o.url === e.url);
      if (i >= 0) return i + 1;
      return readNums.find((r) => norm(r.url) === norm(e.url))?.n;
    };
    h.narrative = h.narrative.map((p, i) => {
      if (!picks[i]) return p;
      let nums = picks[i].map(numOf).filter(Boolean);
      if (!nums.length) nums = readNums.length ? [readNums[0].n] : l.sources.length ? [1] : [];
      nums = [...new Set(nums)].sort((a, b) => a - b).slice(0, 5);
      return nums.length ? `${p} [${nums.join(', ')}]` : p;
    });
  }
}
