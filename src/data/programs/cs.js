// BS Computer Science: the second program.
// Built like the MatE one: subjects take turns, each in its own historical
// order, and no class uses an idea before an earlier class has introduced it.
// The math classes are shared with MatE (same ids), so passing one counts in
// both programs. Classes not written yet are listed in SOON and skipped on the
// timetable until they exist.
//
// Course names follow the usual Philippine BSCS course list (CHED CMO No. 25,
// s. 2015). Course codes differ from school to school, so the tags below use
// short generic codes.

export const COURSES = {
  'CC 101': 'Introduction to Computing',
  'CC 102': 'Fundamentals of Programming',
  'CC 103': 'Intermediate Programming',
  'CC 104': 'Data Structures and Algorithms',
  'CC 105': 'Information Management',
  'CS DS1': 'Discrete Structures 1',
  'CS DS2': 'Discrete Structures 2',
  'CS ALG': 'Algorithms and Complexity',
  'CS ARC': 'Architecture and Organization',
  'CS AUT': 'Automata Theory and Formal Languages',
  'CS PL': 'Programming Languages',
  'CS OS': 'Operating Systems',
  'CS NET': 'Networks and Communications',
  'CS SEC': 'Information Assurance and Security',
  'CS HCI': 'Human Computer Interaction',
  'CS SE': 'Software Engineering',
  'CS PDC': 'Parallel and Distributed Computing',
  'CS SP': 'Social Issues and Professional Practice',
  'CS THS': 'CS Thesis',
  'MATH CS': 'Mathematics for Computer Science',
  'CS IS': 'Intelligent Systems (elective)',
};

export const WEEKS = [
  ['num-001', 'num-002', 'num-003'], //  1 counting · writing numbers · zero
  ['num-004', 'comp-002', 'num-005'], //  2 + − · Babbage and Lovelace · × ÷
  ['num-006', 'cs-101', 'math-002'], //  3 primes · first programs · fractions
  ['math-001', 'cs-102', 'num-007'], //  4 negatives · decisions · decimals
  ['cs-111', 'cs-103', 'num-008'], //  5 logic and truth tables · loops · irrationals
  ['math-004', 'comp-001', 'cs-104'], //  6 exponents · binary and Boole · functions
  ['num-010', 'geo-001', 'cs-105'], //  7 maths symbols · Euclid · lists and text
  ['math-003', 'cs-106', 'cs-112'], //  8 algebra · bugs and testing · sets
  ['math-005', 'comp-003', 'cs-113'], //  9 graphs · Turing · induction
  ['math-009', 'comp-004', 'cs-114'], // 10 functions · Shannon · counting
  ['math-008', 'comp-005', 'cs-122'], // 11 logarithms · chips · the stored-program computer
  ['comp-006', 'cs-131', 'cs-115'], // 12 algorithms · recursion · graphs
  ['cs-132', 'math-006', 'cs-123'], // 13 sorting · quadratics · memory and caches
  ['comp-007', 'cs-133', 'cs-116'], // 14 languages · stacks and queues · modular arithmetic
  ['cs-134', 'math-011', 'cs-135'], // 15 hashing · vectors · trees
  ['cs-136', 'math-007', 'cs-141'], // 16 shortest paths · systems · finite automata
  ['math-012', 'cs-137', 'cs-142'], // 17 limits · dynamic programming · grammars
  ['math-101', 'cs-138', 'cs-151'], // 18 derivatives · P vs NP · operating systems
  ['math-014', 'comp-008', 'cs-154'], // 19 derivative rules · the internet · packets and TCP/IP
  ['math-015', 'cs-152', 'cs-155'], // 20 optimisation · concurrency · databases
  ['math-102', 'cs-153', 'cs-156'], // 21 integrals · virtual memory · cryptography
  ['math-022', 'cs-157', 'cs-158'], // 22 probability · human-computer interaction · software engineering
  ['math-021', 'cs-159', 'geo-002'], // 23 statistics · version control · trigonometry
  ['math-027', 'cs-160', 'math-020'], // 24 matrices · parallel computing · partial derivatives
  ['math-023', 'comp-009', 'cs-161'], // 25 regression · machines that learn · ethics and privacy
  ['comp-010', 'math-024', 'comp-011'], // 26 neural networks · hypothesis tests · transformers
  ['comp-012', 'cs-162'], // 27 the AI landscape · the CS thesis
];

// Titles of planned classes, shown as "being written" until they exist.
export const SOON = {};

export const STAGES = [
  { from: 1, title: 'Year 1, first semester', note: 'Numbers from scratch · Introduction to Computing · Fundamentals of Programming · Discrete Structures 1' },
  { from: 10, title: 'Year 1, second semester', note: 'Intermediate Programming · Architecture and Organization · Data Structures and Algorithms' },
  { from: 17, title: 'Year 2', note: 'Algorithms and Complexity · Automata · Operating Systems · Networks · Information Management · Security' },
  { from: 22, title: 'Year 3', note: 'Calculus, statistics and linear algebra for AI · HCI · Software Engineering · Parallel Computing' },
  { from: 25, title: 'Year 4', note: 'Machine learning to today’s AI · Social Issues and Professional Practice · CS Thesis' },
];

// Course tags for every class on this timetable (shared math included).
const T = (codes, ids) => Object.fromEntries(ids.map((id) => [id, codes]));
export const TAGS = {
  ...T(['MATH CS'], ['num-001', 'num-002', 'num-003', 'num-004', 'num-005', 'num-006', 'math-002', 'math-001', 'num-007', 'num-008', 'math-004', 'num-010', 'geo-001', 'math-003', 'math-005', 'math-009', 'math-008', 'math-006', 'math-011', 'math-007', 'math-012', 'math-101', 'math-014', 'math-015', 'math-102', 'math-022', 'math-021', 'geo-002', 'math-027', 'math-020', 'math-023', 'math-024']),
  ...T(['CC 101'], ['comp-001', 'comp-002', 'comp-003', 'comp-004', 'comp-005']),
  ...T(['CC 102'], ['cs-101', 'cs-102', 'cs-103', 'cs-104', 'cs-105', 'cs-106']),
  ...T(['CS DS1'], ['cs-111', 'cs-112', 'cs-113', 'cs-114']),
  ...T(['CS DS2'], ['cs-115', 'cs-116']),
  ...T(['CS ARC'], ['cs-122', 'cs-123']),
  ...T(['CC 103', 'CC 104'], ['cs-131']),
  ...T(['CC 104'], ['comp-006', 'cs-132', 'cs-133', 'cs-134', 'cs-135', 'cs-136']),
  ...T(['CS PL'], ['comp-007']),
  ...T(['CS ALG'], ['cs-137', 'cs-138']),
  ...T(['CS AUT'], ['cs-141', 'cs-142']),
  ...T(['CS OS'], ['cs-151', 'cs-152', 'cs-153']),
  ...T(['CS NET'], ['comp-008', 'cs-154']),
  ...T(['CC 105'], ['cs-155']),
  ...T(['CS SEC'], ['cs-156']),
  ...T(['CS HCI'], ['cs-157']),
  ...T(['CS SE'], ['cs-158', 'cs-159']),
  ...T(['CS PDC'], ['cs-160']),
  ...T(['CS IS'], ['comp-009', 'comp-010', 'comp-011', 'comp-012']),
  ...T(['CS SP'], ['cs-161']),
  ...T(['CS THS'], ['cs-162']),
};

export const YEAR_ENDS = [
  { year: 1, lastWeek: 16, slots: 1 },
  { year: 2, lastWeek: 21, slots: 2 },
  { year: 3, lastWeek: 24, slots: 3 },
];

// Specialization tracks. `after` lists the classes each one builds on.
export const TRACKS = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: '🧠',
    blurb: 'From the first artificial neuron in 1943 to the research papers of 2025 and 2026: how machines learn, see, talk, reason and help do science.',
    jobs: 'Machine-learning engineering, AI research labs, data science, AI for science and medicine, AI safety and policy.',
    um: ['CS IS'],
    classes: [
      { id: 'ai-001', after: ['cs-103', 'math-005'] }, // McCulloch–Pitts and the perceptron
      { id: 'ai-002', after: ['math-101'] }, // gradient descent
      { id: 'ai-003', after: ['ai-002', 'math-014'] }, // backpropagation
      { id: 'ai-004', after: ['math-022'] }, // overfitting, data and generalisation
      { id: 'ai-005', after: ['math-027'] }, // convolutional networks and ImageNet
      { id: 'ai-006', after: ['math-011'] }, // words as vectors
      { id: 'ai-007', after: ['ai-006', 'math-027'] }, // attention and the transformer
      { id: 'ai-008', after: ['math-008'] }, // scaling laws and pretraining
      { id: 'ai-009', after: ['math-022'] }, // reinforcement learning: AlphaGo
      { id: 'ai-010', after: ['ai-009'] }, // RLHF and alignment
      { id: 'ai-011', after: ['math-021'] }, // diffusion: making images from noise
      { id: 'ai-012', after: ['ai-007'] }, // reasoning models and test-time compute
      { id: 'ai-013', after: ['ai-007'] }, // looking inside: interpretability
      { id: 'ai-014', after: ['ai-012'] }, // AI for science and the research frontier
    ],
  },
  {
    id: 'systems',
    title: 'Systems and Security',
    icon: '🛡',
    blurb: 'What really happens inside a computer and across a network, and how attackers and defenders fight over it.',
    jobs: 'Systems and cloud engineering, network engineering, cybersecurity (SOC analyst, penetration tester), embedded systems.',
    um: ['CS OS', 'CS SEC'],
    classes: [
      { id: 'sec-001', after: ['cs-122', 'cs-111'] }, // from switches to an adder
      { id: 'sec-002', after: ['sec-001', 'cs-153'] }, // storage that survives failure
      { id: 'sec-003', after: ['cs-154', 'cs-152'] }, // agreeing across machines
      { id: 'sec-004', after: ['cs-151', 'cs-133'] }, // smashing the stack
      { id: 'sec-005', after: ['cs-155'] }, // injection attacks on the web
      { id: 'sec-006', after: ['cs-156', 'cs-114'] }, // passwords and cracking
      { id: 'sec-007', after: ['cs-156', 'cs-154'] }, // TLS and certificates
      { id: 'sec-008', after: ['sec-004', 'cs-154'] }, // worms, ransomware and patching
    ],
  },
  {
    id: 'graphics',
    title: 'Graphics and Visual Computing',
    icon: '🎨',
    blurb: 'How a computer draws: pixels, 3D geometry, light and shadow, animation and games.',
    jobs: 'Game studios, animation and visual effects, simulation, AR and VR, user-interface engineering.',
    um: ['CS HCI'],
    classes: [
      { id: 'gfx-001', after: ['cs-105', 'comp-001'] },
      { id: 'gfx-002', after: ['cs-103'] },
      { id: 'gfx-003', after: ['math-027'] },
      { id: 'gfx-004', after: ['gfx-003'] },
      { id: 'gfx-005', after: ['gfx-004'] },
      { id: 'gfx-006', after: ['gfx-005', 'math-011'] },
      { id: 'gfx-007', after: ['gfx-006'] },
      { id: 'gfx-008', after: ['gfx-003'] },
    ],
  },
];
