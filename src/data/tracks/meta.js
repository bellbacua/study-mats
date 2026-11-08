// Specializations: elective tracks that sit on top of the core timetable.
// The first one unlocks when every Year 1 class is passed, a second after
// Year 2 and a third after Year 3. Inside a track the classes go in order,
// and each also waits for the core class (`after`) whose ideas it builds on.

export const TRACKS = [
  {
    id: 'metals',
    title: 'Metals and Metallurgy',
    icon: '⚒',
    blurb: 'How metal is won from ore, made into steel and alloys, and made stronger. Very close to the Philippine nickel, copper and steel industry.',
    jobs: 'Mining and smelting plants, steel mills, foundries, heat-treatment shops, failure analysis.',
    um: ['MATE 303', 'MATE 308'],
    classes: [
      { id: 'met-001', after: 'chem-011' }, // iron and steel making
      { id: 'met-002', after: 'chem-101' }, // extracting nickel: Ellingham, laterite, HPAL
      { id: 'met-003', after: 'mate-202' }, // solid solutions and alloy design
      { id: 'met-004', after: 'mate-203' }, // precipitation hardening
      { id: 'met-005', after: 'mate-203' }, // grain size, cold work, recrystallisation
      { id: 'met-006', after: 'mate-124' }, // stainless steels and superalloys
    ],
  },
  {
    id: 'electronic',
    title: 'Electronic Materials',
    icon: '⚡',
    blurb: 'Why some materials conduct and others do not, how doping and junctions make chips work, and how pure silicon is grown.',
    jobs: 'Semiconductor plants (Cebu, Laguna, Batangas), electronics assembly and testing, magnet and sensor makers.',
    um: ['MATE 303', 'MATE 405'],
    classes: [
      { id: 'elec-001', after: 'phys-006' }, // conductors and resistivity
      { id: 'elec-002', after: 'mate-401' }, // carriers and doping
      { id: 'elec-003', after: 'mate-401' }, // the p–n junction
      { id: 'elec-004', after: 'mate-202' }, // growing pure silicon
      { id: 'elec-005', after: 'mate-401' }, // dielectrics and capacitors
      { id: 'elec-006', after: 'phys-208' }, // magnetic materials
    ],
  },
  {
    id: 'energy',
    title: 'Energy Materials',
    icon: '☀',
    blurb: 'The materials inside solar panels, batteries, fuel cells and geothermal plants, and the numbers that decide which one wins.',
    jobs: 'Solar and battery makers, power plants (including geothermal in Leyte and Negros), electric-vehicle and grid-storage firms.',
    um: ['MATE 308', 'MATE 405'],
    classes: [
      { id: 'enrg-001', after: 'phys-012' }, // energy in a kilogram
      { id: 'enrg-002', after: 'chem-011' }, // battery electrodes and capacity
      { id: 'enrg-003', after: 'mate-401' }, // solar cells
      { id: 'enrg-004', after: 'chem-101' }, // fuel cells and hydrogen
      { id: 'enrg-005', after: 'mate-401' }, // thermoelectrics
      { id: 'enrg-006', after: 'mate-124' }, // geothermal plant materials
    ],
  },
];

// Weeks that make up each year of the core timetable, and how many tracks
// can be open once that year is finished.
export const YEAR_ENDS = [
  { year: 1, lastWeek: 24, slots: 1 },
  { year: 2, lastWeek: 32, slots: 2 },
  { year: 3, lastWeek: 40, slots: 3 },
];

// Side topics: short courses outside your field, like a university minor. They
// are open from day one (no year to finish) and go in order inside the topic.
export const SIDES = [
  {
    id: 'philo',
    title: 'Philosophy and Logic',
    icon: '🦉',
    blurb: 'How to tell a good argument from a bad one, how science knows things, and how to decide what is right. From Socrates to Popper, Kuhn and engineering ethics.',
    why: 'Sharper reasoning in every subject: spotting a weak argument, a misleading statistic or a test that proves nothing.',
    classes: [
      { id: 'phil-001' }, // Socrates: definitions and counterexamples
      { id: 'phil-002' }, // Aristotle: syllogisms and validity
      { id: 'phil-003' }, // the Stoics: if-then reasoning
      { id: 'phil-004' }, // fallacies of cause: correlation and hidden factors
      { id: 'phil-005' }, // Descartes: doubt and certainty
      { id: 'phil-006' }, // Hume: the problem of induction
      { id: 'phil-007' }, // Bayes: changing your mind by the right amount
      { id: 'phil-008' }, // Popper: falsification and the 1919 eclipse
      { id: 'phil-009' }, // Kuhn: paradigms and revolutions
      { id: 'phil-010' }, // ethics for engineers: consequences and duties
    ],
  },
];

SIDES.push({
  id: 'bio',
  title: 'Biomolecular Engineering',
  icon: '🧬',
  blurb: 'From scratch: what cells are made of, how DNA builds proteins, how enzymes work, and how engineers grow and purify biomolecules in tanks. It ends at biomaterials, where it meets materials engineering.',
  why: 'Medicine, food, vaccines and biodegradable materials all run on it, and it is where many new materials jobs are.',
  classes: [
    { id: 'bio-001' }, // the cell: Hooke, Leeuwenhoek, cell theory
    { id: 'bio-002' }, // molecules of life: water, sugars, fats, amino acids
    { id: 'bio-003' }, // DNA: Miescher to Franklin, Watson and Crick
    { id: 'bio-004' }, // from DNA to protein: the genetic message
    { id: 'bio-005' }, // protein folding and shape
    { id: 'bio-006' }, // enzymes and their speed: Michaelis and Menten
    { id: 'bio-007' }, // growing cells: Monod, fermentation, the bioreactor
    { id: 'bio-008' }, // recombinant DNA: making insulin in bacteria
    { id: 'bio-009' }, // separating and purifying: chromatography, centrifuges
    { id: 'bio-010' }, // biomaterials: implants, biodegradable plastics, tissue scaffolds
  ],
});

SIDES.push({
  id: 'comp',
  title: 'Computing and AI',
  icon: '💡',
  blurb: 'From Boole’s logic and Babbage’s engines to Turing, chips, the internet, machine learning and today’s language models. How computers work and how AI got here.',
  why: 'Computers run every lab instrument and simulation you will use, and AI is changing how engineers design materials. Knowing how it works helps you judge what it can and cannot do.',
  classes: [
    { id: 'comp-001' }, // Leibniz and Boole: binary and logic
    { id: 'comp-002' }, // Babbage and Lovelace: the engines
    { id: 'comp-003' }, // Turing: what can be computed
    { id: 'comp-004' }, // Shannon: information and bits
    { id: 'comp-005' }, // transistors and chips: Moore's law
    { id: 'comp-006' }, // algorithms: how fast can it be done
    { id: 'comp-007' }, // programs and languages
    { id: 'comp-008' }, // the internet
    { id: 'comp-009' }, // machines that learn
    { id: 'comp-010' }, // neural networks and deep learning
    { id: 'comp-011' }, // transformers and language models
    { id: 'comp-012' }, // the AI landscape today
  ],
});

// Shown on the program page as "coming next".
export const SIDES_LATER = [
  { title: 'Chemical Engineering Basics', icon: '⚗️', blurb: 'Mass and energy balances, reactors and separations: the plant side of materials.' },
  { title: 'Mechanical Design', icon: '⚙️', blurb: 'Gears, shafts and joints: how parts are sized so the material does not fail.' },
  { title: 'Geology and Mining', icon: '⛏', blurb: 'Where ores come from and how they are found and dug, with Philippine nickel and copper.' },
  { title: 'Computational Materials', icon: '🖥', blurb: 'Predicting a material before it is made: atoms on a computer and databases of compounds.' },
  { title: 'Biomedical Materials', icon: '🦴', blurb: 'Implants, stents and artificial joints: materials the body has to live with.' },
  { title: 'Economics', icon: '📈', blurb: 'Markets, costs and trade: why nickel prices swing and how engineers weigh money.' },
  { title: 'History of Technology', icon: '🏛', blurb: 'From bronze to silicon: how materials shaped empires and everyday life.' },
  { title: 'Design and Drawing', icon: '✏️', blurb: 'Sketching, perspective and how products are designed for people.' },
];

// The main program a learner follows. Only one is written so far.
export const PROGRAMS = [
  {
    id: 'mate',
    title: 'BS Materials Engineering',
    school: 'University of Mindanao',
    blurb: '48 weeks from counting to materials engineering, lined up with the UM program, with three specialization tracks.',
    ready: true,
  },
  { id: 'phys', title: 'BS Physics', blurb: 'Mechanics to quantum physics, built the same way.', ready: false },
  { id: 'cheme', title: 'BS Chemical Engineering', blurb: 'Reactions, processes and plants.', ready: false },
  { id: 'cs', title: 'BS Computer Science', blurb: 'How computing works, from logic to large systems.', ready: false },
];
