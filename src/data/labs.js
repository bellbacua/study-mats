import { UM_LABS } from './um';
// "Try it for real": free online labs, open-source software and safe at-home
// experiments for each class. kind: 'online' | 'software' | 'home'.

const phet = (slug, name) => ({ tool: `PhET: ${name}`, kind: 'online', url: `https://phet.colorado.edu/en/simulations/${slug}` });
const T = {
  geogebra: { tool: 'GeoGebra', kind: 'online', url: 'https://www.geogebra.org/calculator' },
  desmos: { tool: 'Desmos graphing calculator', kind: 'online', url: 'https://www.desmos.com/calculator' },
  chemcollective: { tool: 'ChemCollective virtual lab', kind: 'online', url: 'https://chemcollective.org/vlabs' },
  doitpoms: { tool: 'DoITPoMS teaching library (Cambridge)', kind: 'online', url: 'https://www.doitpoms.ac.uk/tlplib/index.php' },
  miclib: { tool: 'DoITPoMS micrograph library', kind: 'online', url: 'https://www.doitpoms.ac.uk/miclib/index.php' },
  fiji: { tool: 'Fiji / ImageJ', kind: 'software', url: 'https://imagej.net/software/fiji/' },
  myscope: { tool: 'MyScope electron-microscope simulator', kind: 'online', url: 'https://myscope.training/' },
  vesta: { tool: 'VESTA crystal visualiser', kind: 'software', url: 'https://jp-minerals.org/vesta/en/' },
  mp: { tool: 'Materials Project database', kind: 'online', url: 'https://materialsproject.org/' },
  pycalphad: { tool: 'pycalphad (open-source phase diagrams)', kind: 'software', url: 'https://pycalphad.org/' },
  lammps: { tool: 'LAMMPS molecular dynamics', kind: 'software', url: 'https://www.lammps.org/' },
  ovito: { tool: 'OVITO (view atom simulations)', kind: 'software', url: 'https://www.ovito.org/' },
  nanohub: { tool: 'nanoHUB simulation tools', kind: 'online', url: 'https://nanohub.org/' },
  freecad: { tool: 'FreeCAD FEM workbench', kind: 'software', url: 'https://www.freecad.org/' },
  falstad: { tool: 'Falstad circuit simulator', kind: 'online', url: 'https://www.falstad.com/circuit/' },
  phyphox: { tool: 'phyphox (your phone as a sensor lab)', kind: 'software', url: 'https://phyphox.org/' },
  tracker: { tool: 'Tracker video analysis', kind: 'software', url: 'https://physlets.org/tracker/' },
  matweb: { tool: 'MatWeb property database', kind: 'online', url: 'https://www.matweb.com/' },
  ptable: { tool: 'Ptable interactive periodic table', kind: 'online', url: 'https://ptable.com/' },
  avogadro: { tool: 'Avogadro molecule editor', kind: 'software', url: 'https://avogadro.cc/' },
  foldscope: { tool: 'Foldscope paper microscope (≈ US$1–2)', kind: 'home', url: 'https://foldscope.com/' },
  wolfram: { tool: 'Wolfram|Alpha', kind: 'online', url: 'https://www.wolframalpha.com/' },
};
const home = (task) => ({ tool: 'At home', kind: 'home', url: null, task });
const w = (tool, task) => ({ ...tool, task });

import { LANGUAGE_LABS } from './languageLesson';

export const LABS = {
  ...UM_LABS,
  ...LANGUAGE_LABS,
  'num-001': [
    w(phet('number-play', 'Number Play'), 'Count objects, then group them in tens and see the number form.'),
    home('For one day, keep a tally of how many times you check your phone, bundling in fives. Count the bundles at night.'),
  ],
  'num-002': [
    w(T.wolfram, 'Type "your birth year in base 2" and "365 in base 60". Compare with the columns in the animation.'),
    home('Write today’s date in Roman numerals and in Babylonian base 60. Which was easier to add?'),
  ],
  'num-003': [
    w(phet('arithmetic', 'Arithmetic'), 'Play the multiplication-table game and notice how place value makes ×10 trivial.'),
    home('Make a 4-rod counting board with coins on paper. Represent 2,005, then add 98 by moving coins.'),
  ],
  'num-004': [
    w(phet('number-line-operations', 'Number Line: Operations'), 'Model addition and subtraction as moves on a line.'),
    home('Use real coins as ones and banknotes as tens to do 47 + 38 and 503 − 267 by trading.'),
  ],
  'num-005': [
    w(phet('area-model-multiplication', 'Area Model Multiplication'), 'Split 23 × 14 into partial products and match them to the area.'),
    home('Multiply 37 × 21 with Egyptian doubling on paper, then check with a calculator.'),
  ],
  'num-006': [
    home('Write 1–100 in a 10×10 grid on paper and run the sieve yourself with four coloured pens (2, 3, 5, 7). You should end with 25 primes.'),
    home('Factor your phone number’s last 4 digits into primes.'),
  ],
  'math-002': [
    w(phet('fractions-intro', 'Fractions: Intro'), 'Build equivalent fractions with pies and bars.'),
    home('Fold a strip of paper into thirds, then into quarters on the other side: find 1/3 + 1/4 on the grid.'),
  ],
  'math-001': [
    w(phet('number-line-integers', 'Number Line: Integers'), 'Explore negatives as positions and as temperatures and money.'),
    w(T.desmos, 'Plot y = −x and y = −1·(−x). Watch multiplying by −1 flip the line.'),
  ],
  'num-007': [
    w(T.wolfram, 'Type "1/7 as decimal" and "3/8 as decimal". Which repeats and why?'),
    home('Measure a pencil with a ruler in cm, then in mm. Write it as a decimal of a metre.'),
  ],
  'num-008': [
    w(T.geogebra, 'Draw a unit square, its diagonal, and a circle to swing it onto the x-axis. Read off √2.'),
    w(T.wolfram, 'Type "rational approximations of sqrt(2)": see 3/2, 7/5, 17/12, 41/29… creep closer but never land on it.'),
  ],
  'math-005': [
    w(phet('isotopes-and-atomic-mass', 'Isotopes and Atomic Mass'), 'See tiny masses written in scientific notation.'),
    home('Estimate how many grains of rice are in 1 kg (weigh 100 grains). Write it in scientific notation.'),
  ],
  'geo-001': [
    w(T.geogebra, 'Build a right triangle with squares on the sides and drag the corners. Watch the areas.'),
    home('Check a door frame is square: measure 3 units along one side, 4 along the other; the diagonal should be 5.'),
  ],
  'math-003': [
    w(phet('equality-explorer', 'Equality Explorer'), 'Solve equations on a balance scale exactly like al-Khwarizmi.'),
    w(T.wolfram, 'Type "solve 3x + 4 = 19" and compare the steps with yours.'),
  ],
  'math-004': [
    w(phet('graphing-lines', 'Graphing Lines'), 'Change slope and intercept and watch the line respond.'),
    w(T.desmos, 'Plot the thermal expansion of steel: L = 1 + 0.000012·T. Zoom out to see why it looks flat.'),
  ],
  'geo-002': [
    w(phet('trig-tour', 'Trig Tour'), 'Drag a point round the unit circle and watch sin, cos and tan graphs grow.'),
    w(T.phyphox, 'Use the inclination sensor in phyphox to measure the angle of a ramp, then compute its height with sin θ.'),
  ],
  'math-006': [
    w(phet('graphing-quadratics', 'Graphing Quadratics'), 'Find roots and vertices by moving a, b and c.'),
    w(phet('projectile-motion', 'Projectile Motion'), 'Every flight path is a parabola: fire at different angles.'),
  ],
  'num-009': [
    w(T.desmos, 'Plot points z, iz, i²z, i³z for z = 2 + i (treat as (2,1), (−1,2), …) and see the quarter turns.'),
    w(T.wolfram, 'Type "(2+i)(1+i)" and "plot 2+i, (2+i)(1+i)". Compare with the rotation in the animation.'),
  ],
  'math-007': [
    w(T.desmos, 'Graph x + y = 10 and x − y = 4 and click the intersection.'),
    w(T.wolfram, 'Type "solve x+y+z=6, x-y+z=2, 2x+y-z=1" to see a 3-unknown system solved step by step.'),
  ],
  'math-008': [
    w(T.desmos, 'Plot y = e^x and y = ln x together. Reflect one in the line y = x.'),
    w(T.desmos, 'Enter a small table of 1/T and ln k values and add a straight-line fit (type y₁ ~ m x₁ + b). The slope gives −Ea/R.'),
  ],
  'chem-000': [
    w(T.chemcollective, 'Run a reaction in the virtual lab and check the mass before and after.'),
    home('Split water yourself: a 9 V battery, two pencil leads as electrodes, and water with a spoon of baking soda (not salt, which makes chlorine). Twice as many bubbles collect on the − lead.'),
  ],
  'chem-002': [
    w(T.wolfram, 'Type "7.87 g/cm^3 to kg/m^3" and "72 km/h to m/s" to check your unit pipelines.'),
    home('Weigh a glass of water and measure its volume with a measuring cup: compute water’s density in kg/m³.'),
  ],
  'chem-003': [
    w(phet('balancing-chemical-equations', 'Balancing Chemical Equations'), 'Balance reactions with molecule pictures until the scales level.'),
    w(phet('reactants-products-and-leftovers', 'Reactants, Products and Leftovers'), 'Find the limiting reactant, the way furnaces are charged.'),
  ],
  'chem-004': [
    w(T.ptable, 'Switch between properties (radius, electronegativity, melting point) and spot the periodic trends.'),
    w(T.mp, 'Look up Si and Ge: compare their crystal structures and band gaps, as Mendeleev predicted.'),
  ],
  'chem-001': [
    w(phet('build-an-atom', 'Build an Atom'), 'Build silicon and an ion of aluminium; check charge and mass number.'),
    w(phet('rutherford-scattering', 'Rutherford Scattering'), 'Fire alpha particles at gold and find the nucleus.'),
  ],
  'mate-100': [
    w(phet('atomic-interactions', 'Atomic Interactions'), 'See the Lennard-Jones well and watch atoms vibrate around the bond length.'),
    w(phet('molecule-shapes', 'Molecule Shapes'), 'Build molecules and see bond angles in 3D.'),
  ],
  'phys-001': [
    w(T.phyphox, 'Use the phone stopwatch/acoustic timer to time 10 swings of a pendulum and compute one period.'),
    home('Measure your own cubit (elbow to fingertip) and a hand-span. Measure a table with both, then in metres.'),
  ],
  'phys-002': [
    w(phet('balancing-act', 'Balancing Act'), 'Balance bricks on a plank using m₁d₁ = m₂d₂.'),
    w(phet('density', 'Density'), 'Identify mystery blocks by measuring mass and volume (Archimedes’ method).'),
  ],
  'phys-003': [
    w(T.tracker, 'Film a ball rolling down a book-ramp with your phone and plot distance vs time in Tracker.'),
    w(phet('projectile-motion', 'Projectile Motion'), 'Check that mass doesn’t change the flight when air resistance is off.'),
  ],
  'phys-004': [
    w(phet('forces-and-motion-basics', 'Forces and Motion: Basics'), 'Push crates with and without friction: Newton’s laws live.'),
    w(T.phyphox, 'Use the phone accelerometer in a lift: watch your apparent weight change as it accelerates.'),
  ],
  'mate-102': [
    w(T.vesta, 'Open copper (FCC) and iron (BCC) and simulate their X-ray powder patterns.'),
    w(T.mp, 'Find the lattice constant of aluminium and compute its density by hand. Compare.'),
  ],
  'phys-005': [
    w(phet('energy-skate-park-basics', 'Energy Skate Park: Basics'), 'Watch KE and PE trade places, then add friction.'),
    home('Measure the temperature of water in an insulated bottle, shake it hard for 5 minutes, measure again (Joule’s experiment, tiny version).'),
  ],
  'phys-101': [
    w(phet('hookes-law', 'Hooke’s Law'), 'Stretch springs and measure the spring constant.'),
    w(T.doitpoms, 'Work through the "Stress analysis and Mohr’s circle" or "Elasticity" teaching packages.'),
  ],
  'phys-006': [
    w(phet('ohms-law', 'Ohm’s Law'), 'Change V and R and watch I respond.'),
    w(T.falstad, 'Build a series and a parallel circuit and compare the currents.'),
  ],
  'math-101': [
    w(T.desmos, 'Plot f(x) and the secant slope (f(a+h) − f(a))/h with an h slider. Drag h to 0.'),
    w(T.desmos, 'Type f(x) = x^3 and then f\'(x). Drag a point along f and compare the tangent slope with f\'(x).'),
  ],
  'chem-101': [
    w(T.nanohub, 'Search nanoHUB for a thermodynamics or phase-equilibrium tool and run a ΔG vs T calculation.'),
    w(T.desmos, 'Plot ΔG = 100 − 0.2T with sliders for ΔH and ΔS. Find where the line crosses zero.'),
  ],
  'math-102': [
    w(T.desmos, 'Shade the area under a curve with Riemann rectangles and increase n.'),
    w(T.geogebra, 'Use the RectangleSum command under a curve and increase the number of rectangles until it matches Integral().'),
  ],
  'mate-201': [
    w(T.doitpoms, 'Work through the DoITPoMS "Diffusion" teaching package (random walks and Fick’s laws).'),
    home('Drop food colouring into cold and hot water side by side and watch which spreads faster: diffusion speeds up with temperature.'),
  ],
  'mate-202': [
    home('Put a cup of fresh water and a cup of salty water in the freezer. The salty one freezes later and turns slushy: a two-component phase diagram in your kitchen.'),
    w(T.doitpoms, 'Phase diagrams and solidification teaching package, with interactive lever rule.'),
  ],
  'mate-203': [
    w(T.miclib, 'Search the micrograph library for "pearlite" and "martensite" and compare the microstructures.'),
    home('Heat a steel nail red-hot on a gas stove with pliers, quench in water, try to bend it (brittle); reheat gently and cool slowly (tougher). Eye protection, outdoors, adult supervision.'),
  ],
  'mate-301': [
    w(T.avogadro, 'Build a short polyethylene chain and a polystyrene chain; compare side groups.'),
    home('Freeze a rubber band or a balloon in the freezer, then stretch it straight away: it is stiffer below its Tg.'),
  ],
  'mate-302': [
    w(T.fiji, 'Download a ceramic micrograph from DoITPoMS and measure grain size with the line-intercept method.'),
    home('Score a glass microscope slide (or old tile) with a glass cutter and snap it: a deliberate Griffith crack.'),
  ],
  'mate-401': [
    w(T.nanohub, 'Run a band-structure or p-n junction simulation on nanoHUB.'),
    w(T.mp, 'Compare the band gaps of Si, GaAs and GaN and predict the LED colour.'),
  ],
  'mate-402': [
    w(T.matweb, 'Pull E, density and cost for 5 candidate materials and rank them by E^½/ρ.'),
    w(T.myscope, 'Practise driving a virtual scanning electron microscope, the tool you’d use for failure analysis.'),
  ],
};
