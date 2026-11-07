// The physics strand: woven between the maths and chemistry classes so each
// week mixes subjects. Same lesson shape as curriculum.js.

const base = (id, code, extra) => ({
  id,
  code,
  track: 'phys',
  standardMins: 40,
  overtimeMins: 15,
  xpReward: 100,
  prereqIds: [],
  umCourseLink: '',
  ...extra,
});

export const PHYSICS_LESSONS = [
  // ------------------------------------------------------------------ P1
  base('phys-001', 'PHYS 01', {
    title: 'Measuring the World: Cubits, Sundials & Pendulum Clocks',
    subtitle: 'Physics starts when people agree on units for length and time',
    overtimeDigest: [
      'A measurement is a number times a unit: 3 cubits, 2 hours. Without an agreed unit the number means nothing.',
      'Early units came from the body (cubit = elbow to fingertip) and the sky (day, hour). Our 60 minutes come from Babylon.',
      'Better clocks made better physics: Huygens’s pendulum clock (1656) cut timing errors from minutes a day to seconds.',
    ],
    history: {
      era: 'c. 3000 BC Egypt → c. 1500 BC water clocks → 1583 Pisa → 1656 The Hague',
      protagonist: 'Egyptian surveyors, Galileo Galilei & Christiaan Huygens',
      hook: 'How did the pyramid builders keep their sides square to within a few centimetres?',
      narrative: [
        'Egyptian builders measured in royal cubits, about 52.4 cm, the length from elbow to fingertip of an idealised arm. A master cubit of stone was kept as the standard and wooden copies were checked against it. With knotted ropes and cubit rods, the sides of the Great Pyramid (230 m long) were laid out to within a few centimetres of each other.',
        'Time was measured from the sky. Egyptians split daylight into 12 hours with sundials and the night into 12 with water clocks (a bowl that drains at a steady rate). Babylonian astronomers’ base-60 counting gave us 60 minutes in an hour and 60 seconds in a minute. But sundials stop at night and water clocks drift, so timing anything fast was nearly impossible.',
        'In 1583 a young Galileo, legend says, timed a swinging chandelier in Pisa Cathedral against his pulse and noticed each swing took the same time, whether wide or narrow. In 1656 Christiaan Huygens turned that into the pendulum clock, accurate to about 15 seconds a day instead of 15 minutes. Precise time is what made the physics of motion (Galileo, Newton) possible.',
      ],
      takeaway:
        'Every equation in physics and engineering has units. The first habit to build: always write the unit, and always check you are comparing like with like.',
    },
    csBridge: {
      concept: 'Typed Quantities & Unit Conversion',
      analogy:
        'A bare number in physics is like an untyped variable: 5 what? Libraries in many languages attach units to numbers so that adding metres to seconds is a compile-time error.',
      codeSnippet: `const CUBIT_M = 0.524;              // royal cubit in metres
const toMetres = (cubits) => cubits * CUBIT_M;
toMetres(440);                      // 230.56 m ≈ the Great Pyramid's side

const hms = (s) => [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60];
hms(8100);                          // [2, 15, 0] → base 60, thanks to Babylon`,
    },
    visualLab: {
      type: 'units_ruler',
      title: 'Same Length, Different Rulers',
      instructions: 'Choose an object and a unit. Count how many units fit, then compare body units with the metre.',
      missionPrompt: 'Measure the 2.1 m steel beam in cubits, then in metres.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. A quantity is a number times a unit',
        formula: '\\text{length} = 4 \\times \\text{cubit} \\approx 4 \\times 0.524\\,\\text{m} = 2.1\\,\\text{m}',
        explanation:
          'Change the unit and the number changes, but the length does not. That is why you always carry the unit along.',
      },
      {
        title: '2. Converting means multiplying by the size of the unit',
        formula: '1\\,\\text{cubit} \\approx 0.524\\,\\text{m} \\qquad 1\\,\\text{ft} = 0.3048\\,\\text{m} \\qquad 1\\,\\text{km} = 1000\\,\\text{m}',
        explanation: 'To go from cubits to metres, multiply by 0.524. To go back, divide.',
      },
      {
        title: '3. Time in base 60',
        formula: '1\\,\\text{h} = 60\\,\\text{min} = 60 \\times 60\\,\\text{s} = 3600\\,\\text{s}',
        explanation: 'Hours, minutes and seconds still use Babylonian sixties. Engineering calculations almost always need time in seconds.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p001-d1',
          question: 'How many seconds are there in 2 hours?',
          options: ['7,200', '120', '3,600', '720'],
          correctIndex: 0,
          hint1: '1 hour = 3,600 seconds.',
          hint2: '2 × 3,600.',
          explanation: '2 h × 3,600 s/h = 7,200 s.',
        },
        {
          id: 'p001-d2',
          question: 'A royal cubit is about 0.524 m. Roughly how long is a 4-cubit rod?',
          options: ['2.1 m', '0.13 m', '4.5 m', '1.0 m'],
          correctIndex: 0,
          hint1: 'Multiply the number of cubits by the size of one cubit.',
          hint2: '4 × 0.524.',
          explanation: '4 × 0.524 m = 2.096 m ≈ 2.1 m.',
        },
        {
          id: 'p001-d3',
          question: 'Why did merchants and builders push for standard units?',
          options: [
            'The same number meant different lengths in different towns',
            'Numbers were too large',
            'Body parts were too short',
            'Sundials were inaccurate',
          ],
          correctIndex: 0,
          hint1: 'Whose foot is "a foot"?',
          hint2: 'Trade needs everyone to mean the same amount.',
          explanation: 'Units based on local customs or body parts varied from place to place, so the same number meant different amounts. Trade and construction need one agreed standard.',
        },
      ],
      bossProblem: {
        title: 'Furnace Cycle Timer',
        scenario:
          'A heat-treatment furnace program holds steel at temperature for 2 h 15 min. The controller only accepts the time in seconds. What do you type in?',
        options: ['8,100 s', '135 s', '7,215 s', '2,150 s'],
        correctIndex: 0,
        hint: 'Convert everything to minutes first, then to seconds.',
        explanation: '2 h 15 min = 135 min. 135 × 60 = 8,100 s.',
      },
    },
  }),

  // ------------------------------------------------------------------ P2
  base('phys-002', 'PHYS 02', {
    title: 'Archimedes: Levers, Density & the King’s Crown',
    subtitle: 'The first laws of physics written as exact mathematics',
    overtimeDigest: [
      'A lever balances when weight × distance is equal on both sides: m₁d₁ = m₂d₂.',
      'Density is mass per volume, ρ = m/V. Every material has its own density.',
      'An object in water is pushed up by the weight of the water it displaces (buoyancy).',
    ],
    history: {
      era: 'c. 287–212 BC • Syracuse, Sicily',
      protagonist: 'Archimedes of Syracuse',
      hook: 'How do you prove a gold crown is fake without scratching it?',
      narrative: [
        'Archimedes lived in the Greek city of Syracuse and is often called the greatest scientist of the ancient world. In On the Equilibrium of Planes he proved the law of the lever: weights balance at distances inversely proportional to their size. He reportedly boasted, "Give me a place to stand and I will move the Earth."',
        'The Roman writer Vitruvius tells the famous story. King Hiero had given a goldsmith pure gold for a crown and suspected some was swapped for cheaper silver. Archimedes, stepping into a bath, saw the water rise and realised the crown’s volume could be measured by the water it pushed aside. Silver is less dense than gold, so a mixed crown of the same mass would take up more room. He supposedly ran home shouting "Eureka!" ("I have found it!").',
        'In On Floating Bodies he stated the principle of buoyancy. During the Roman siege of Syracuse his war machines (cranes that lifted ships out of the water) held the Romans off for two years. When the city fell in 212 BC, he was killed by a Roman soldier, reportedly while drawing circles in the sand.',
      ],
      takeaway:
        'Archimedes showed physical laws can be exact equations. Density, in particular, is the first property you check when identifying or choosing a material.',
    },
    csBridge: {
      concept: 'Balancing Constraints',
      analogy:
        'The lever law is a conservation check like balancing a ledger: sum of (weight × arm) on the left must equal the right. Density lookups are how you identify a material from measurements.',
      codeSnippet: `const torque = (massKg, armM) => massKg * armM;
torque(6, 2) === torque(3, 4);      // true → balanced

const DENSITY = { gold: 19.3, silver: 10.5, steel: 7.85, aluminium: 2.7 }; // g/cm³
const density = (grams, cm3) => grams / cm3;
density(1000, 60);                  // 16.7 → too light to be pure gold`,
    },
    visualLab: {
      type: 'lever_balance',
      title: 'The Law of the Lever',
      instructions: 'Change the two weights and their distances from the pivot. The beam tilts toward the bigger turning effect.',
      missionPrompt: 'Balance a 6 kg weight at 2 m using a 3 kg weight.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. The law of the lever',
        formula: 'm_1 d_1 = m_2 d_2 \\qquad 6\\,\\text{kg} \\times 2\\,\\text{m} = 3\\,\\text{kg} \\times 4\\,\\text{m}',
        explanation: 'A small weight far from the pivot balances a big weight close to it. Every crowbar, see-saw and crane relies on this.',
      },
      {
        title: '2. Density',
        formula: '\\rho = \\frac{m}{V} \\qquad \\rho_{\\text{steel}} \\approx 7.85\\,\\text{g/cm}^3 \\quad \\rho_{\\text{gold}} = 19.3\\,\\text{g/cm}^3',
        explanation: 'Density tells you how tightly mass is packed. It does not depend on the size of the sample, so it identifies the material.',
      },
      {
        title: '3. Buoyancy',
        formula: 'F_{\\text{up}} = \\text{weight of water displaced} \\qquad \\text{floats if } \\rho_{\\text{object}} < \\rho_{\\text{water}} = 1\\,\\text{g/cm}^3',
        explanation: 'An object sinks until it has pushed aside its own weight of water. If it can’t (it is denser than water), it sinks to the bottom.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p002-d1',
          question: 'A 6 kg mass sits 2 m from the pivot. Where must a 3 kg mass go on the other side to balance it?',
          options: ['4 m', '1 m', '3 m', '6 m'],
          correctIndex: 0,
          hint1: 'm₁d₁ = m₂d₂.',
          hint2: '6 × 2 = 3 × d.',
          explanation: '6 × 2 = 12 = 3 × d, so d = 4 m.',
        },
        {
          id: 'p002-d2',
          question: 'A 200 g metal block has a volume of 25 cm³. What is its density?',
          options: ['8 g/cm³', '5,000 g/cm³', '0.125 g/cm³', '225 g/cm³'],
          correctIndex: 0,
          hint1: 'ρ = m / V.',
          hint2: '200 ÷ 25.',
          explanation: '200 g ÷ 25 cm³ = 8 g/cm³, close to steel.',
        },
        {
          id: 'p002-d3',
          question: 'Which of these floats in fresh water (density 1.0 g/cm³)?',
          options: ['Ice (0.92 g/cm³)', 'Aluminium (2.7 g/cm³)', 'Glass (2.5 g/cm³)', 'Steel (7.85 g/cm³)'],
          correctIndex: 0,
          hint1: 'Floats if less dense than water.',
          hint2: 'Only one is below 1.0.',
          explanation: 'Ice at 0.92 g/cm³ is less dense than water, so it floats (with about 92% submerged).',
        },
      ],
      bossProblem: {
        title: 'The King’s Crown',
        scenario:
          'A crown weighs 1,000 g and pushes aside 60 cm³ of water. Pure gold has a density of 19.3 g/cm³. Is it pure gold?',
        options: [
          'No: its density is about 16.7 g/cm³',
          'Yes: its density is 19.3 g/cm³',
          'No: its density is 60 g/cm³',
          'Can’t tell without melting it',
        ],
        correctIndex: 0,
        hint: 'Volume = water displaced. Then ρ = m/V.',
        explanation: '1,000 g ÷ 60 cm³ ≈ 16.7 g/cm³, well below gold’s 19.3. Pure gold of the same mass would displace only 1,000 ÷ 19.3 ≈ 51.8 cm³. The goldsmith mixed in a lighter metal.',
      },
    },
  }),

  // ------------------------------------------------------------------ P3
  base('phys-003', 'PHYS 03', {
    title: 'Galileo: Falling, Rolling & the Birth of Experiment',
    subtitle: 'Why heavy things don’t fall faster, and how distance grows with time squared',
    overtimeDigest: [
      'Aristotle taught that heavy objects fall faster. Galileo tested it and found all objects speed up at the same rate (ignoring air).',
      'Rolling balls down a ramp, he found distances in equal time steps go 1 : 3 : 5 : 7, so total distance grows like t².',
      'Speed = distance ÷ time; acceleration = change in speed ÷ time. On Earth, falling objects gain about 9.8 m/s every second.',
    ],
    history: {
      era: '4th c. BC Aristotle → 1604 Padua → 1638 Leiden → 1971 the Moon',
      protagonist: 'Galileo Galilei',
      hook: 'Did Galileo really drop balls from the Leaning Tower of Pisa?',
      narrative: [
        'For almost 2,000 years people accepted Aristotle’s claim that heavier things fall faster, because it sounds obvious: a stone beats a feather. Nobody measured carefully, partly because falling is too fast to time with a water clock.',
        'Galileo’s trick was to slow gravity down. Around 1604 he rolled bronze balls down a long, smooth wooden ramp and timed them with a water clock, weighing the water that flowed out. He found that in equal time intervals the ball covered distances in the ratio 1 : 3 : 5 : 7, so the total distance goes 1, 4, 9, 16: it grows with the square of time. He published this in Two New Sciences (1638), written while under house arrest after his trial by the Inquisition.',
        'The famous Leaning Tower drop probably never happened; it appears only in a biography by his student. Galileo also gave an argument with no experiment at all: tie a heavy and a light stone together. If light things fall slower, the light one should hold the heavy one back, yet together they are heavier and should fall faster. Contradiction. In 1971 Apollo 15 astronaut David Scott dropped a hammer and a feather on the airless Moon: they landed together.',
      ],
      takeaway:
        'Galileo’s real legacy is the method: turn a question into a measurement, design an experiment to make it measurable, and trust the data over authority.',
    },
    csBridge: {
      concept: 'Simulation Loops (Euler Integration)',
      analogy:
        'Every physics engine updates velocity from acceleration and position from velocity in small time steps. Do it for a falling ball and you rediscover Galileo’s t² law.',
      codeSnippet: `let v = 0, d = 0;
const g = 9.8, dt = 0.001;
for (let t = 0; t < 2; t += dt) {
  v += g * dt;        // speed grows steadily
  d += v * dt;        // distance grows faster and faster
}
d;                    // ≈ 19.6 m = ½·g·t² with t = 2 s`,
    },
    visualLab: {
      type: 'galileo_ramp',
      title: 'Galileo’s Ramp',
      instructions: 'Roll the ball and watch the marks it leaves every second. Change the slope; the pattern 1 : 3 : 5 : 7 stays.',
      missionPrompt: 'Run the ball for 4 seconds on a 10° ramp and check the 1 : 3 : 5 : 7 pattern.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Speed',
        formula: 'v = \\frac{\\Delta d}{\\Delta t} \\qquad 100\\,\\text{m in } 20\\,\\text{s} \\Rightarrow 5\\,\\text{m/s}',
        explanation: 'Speed is how much distance you cover per unit of time.',
      },
      {
        title: '2. Acceleration',
        formula: 'a = \\frac{\\Delta v}{\\Delta t} \\qquad g \\approx 9.8\\,\\text{m/s}^2',
        explanation: 'Acceleration is how fast speed changes. A falling object gains about 9.8 m/s of speed every second, whatever its weight.',
      },
      {
        title: '3. Distance grows with time squared',
        formula: 'd = \\tfrac{1}{2} a t^2 \\qquad 1 : 3 : 5 : 7 \\;\\Rightarrow\\; 1 : 4 : 9 : 16',
        explanation: 'The distance in each second goes up by the odd numbers. Adding odd numbers gives square numbers: 1, 1+3 = 4, 4+5 = 9, …',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p003-d1',
          question: 'A runner covers 100 m in 20 s. What is their average speed?',
          options: ['5 m/s', '2,000 m/s', '0.2 m/s', '80 m/s'],
          correctIndex: 0,
          hint1: 'Speed = distance ÷ time.',
          hint2: '100 ÷ 20.',
          explanation: '100 m ÷ 20 s = 5 m/s.',
        },
        {
          id: 'p003-d2',
          question: 'A ball on Galileo’s ramp travels 1, 3 and 5 units in the first three seconds. How far does it go in the 4th second?',
          options: ['7 units', '6 units', '9 units', '16 units'],
          correctIndex: 0,
          hint1: 'The step sizes are the odd numbers.',
          hint2: 'Next after 5.',
          explanation: 'The pattern is 1, 3, 5, 7: the 4th second covers 7 units (total 16 = 4²).',
        },
        {
          id: 'p003-d3',
          question: 'Ignoring air, a 10 kg ball and a 1 kg ball are dropped together. Which lands first?',
          options: ['They land together', 'The 10 kg ball', 'The 1 kg ball', 'It depends on height'],
          correctIndex: 0,
          hint1: 'Galileo’s two-stones argument.',
          hint2: 'Acceleration due to gravity is the same for all masses.',
          explanation: 'All objects fall with the same acceleration g when air resistance is negligible, so they land together.',
        },
      ],
      bossProblem: {
        title: 'Dropped Casting',
        scenario:
          'In a foundry, a small casting slips off a crane and falls freely for 2.0 s before hitting the floor. Using g = 9.8 m/s², how high was it?',
        options: ['19.6 m', '9.8 m', '39.2 m', '4.9 m'],
        correctIndex: 0,
        hint: 'd = ½ g t².',
        explanation: 'd = ½ × 9.8 × 2² = ½ × 9.8 × 4 = 19.6 m.',
      },
    },
  }),

  // ------------------------------------------------------------------ P4
  base('phys-004', 'PHYS 04', {
    title: 'Newton: Forces, Mass & F = ma',
    subtitle: 'Three laws that explain motion from falling apples to cranes and rockets',
    overtimeDigest: [
      '1st law: an object keeps doing what it is doing (resting or moving steadily) unless a net force acts on it.',
      '2nd law: net force = mass × acceleration, F = ma. Force is measured in newtons (1 N = 1 kg·m/s²).',
      '3rd law: forces come in pairs. Push on something and it pushes back equally.',
    ],
    history: {
      era: '1665–1666 Woolsthorpe → 1684 Halley’s visit → 1687 London',
      protagonist: 'Isaac Newton & Edmond Halley',
      hook: 'Why does a book that changed the world owe its existence to a comet hunter paying the printing bill?',
      narrative: [
        'When plague closed Cambridge in 1665, the young Isaac Newton went home to his family farm at Woolsthorpe. In about 18 months there he developed calculus, experimented with light and began thinking about gravity (the apple story comes from his own old-age recollection). He then sat on most of it for twenty years.',
        'In 1684 the astronomer Edmond Halley visited Newton to ask what path a planet would follow under a force that weakens with the square of distance. Newton said at once: an ellipse, he had calculated it. Halley urged him to write it up and, when the Royal Society ran out of money (it had spent its budget on a book about fish), paid for the printing himself.',
        'The result, Philosophiæ Naturalis Principia Mathematica (1687), set out three laws of motion and the law of universal gravitation. With them, the same mathematics explained falling objects, tides, the Moon’s orbit and later the return of Halley’s comet in 1758. Every structural, mechanical and materials calculation you will do rests on Newton’s second law.',
      ],
      takeaway:
        'Force causes acceleration, not motion. If the forces balance, nothing speeds up or slows down. This is the starting point for stresses in every beam and bolt.',
    },
    csBridge: {
      concept: 'Game Physics Update Step',
      analogy:
        'Every physics engine applies F = ma each frame: sum the forces, divide by mass to get acceleration, then update velocity and position.',
      codeSnippet: `function step(body, forces, dt) {
  const net = forces.reduce((s, f) => s + f, 0);   // N
  const a = net / body.mass;                       // F = ma → a = F/m
  body.v += a * dt;
  body.x += body.v * dt;
}
const crate = { mass: 50, v: 0, x: 0 };
step(crate, [200, -98], 0.1);  // push 200 N, friction 98 N → a = 2.04 m/s²`,
    },
    visualLab: {
      type: 'newton_forces',
      title: 'Push a Crate',
      instructions: 'Push a crate across the floor. Change the push, the mass and the friction, and watch the net force decide the acceleration.',
      missionPrompt: 'Find the push that keeps a 50 kg crate moving at steady speed (zero acceleration) with friction μ = 0.2.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Inertia (1st law)',
        formula: '\\sum F = 0 \\;\\Rightarrow\\; v = \\text{constant}',
        explanation: 'No net force means no change in motion. A moving puck on ice keeps going; it’s friction that usually stops things.',
      },
      {
        title: '2. F = ma (2nd law)',
        formula: 'F_{\\text{net}} = m a \\qquad 20\\,\\text{N} = 10\\,\\text{kg} \\times 2\\,\\text{m/s}^2',
        explanation: 'Add up all the forces with their directions to get the net force, then divide by mass for the acceleration. Weight is the force of gravity: W = mg.',
      },
      {
        title: '3. Action and reaction (3rd law)',
        formula: 'F_{A \\to B} = -F_{B \\to A}',
        explanation: 'When a crane lifts a beam, the beam pulls down on the crane just as hard. Rockets push gas backwards; gas pushes the rocket forwards.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p004-d1',
          question: 'What net force accelerates a 10 kg cart at 2 m/s²?',
          options: ['20 N', '5 N', '12 N', '0.2 N'],
          correctIndex: 0,
          hint1: 'F = ma.',
          hint2: '10 × 2.',
          explanation: 'F = 10 kg × 2 m/s² = 20 N.',
        },
        {
          id: 'p004-d2',
          question: 'A net force of 50 N acts on a 25 kg crate. What is its acceleration?',
          options: ['2 m/s²', '1,250 m/s²', '0.5 m/s²', '75 m/s²'],
          correctIndex: 0,
          hint1: 'a = F / m.',
          hint2: '50 ÷ 25.',
          explanation: 'a = 50 N ÷ 25 kg = 2 m/s².',
        },
        {
          id: 'p004-d3',
          question: 'What is the weight of a 5 kg steel block on Earth (g = 9.8 m/s²)?',
          options: ['49 N', '5 N', '0.51 N', '14.8 N'],
          correctIndex: 0,
          hint1: 'Weight is a force: W = mg.',
          hint2: '5 × 9.8.',
          explanation: 'W = 5 × 9.8 = 49 N. Mass (kg) stays the same everywhere; weight (N) depends on gravity.',
        },
      ],
      bossProblem: {
        title: 'Crane Cable Tension',
        scenario:
          'A crane lifts a 1,000 kg steel beam, speeding it up at 0.5 m/s² upwards. Using g = 9.8 m/s², what tension must the cable carry?',
        options: ['10,300 N', '9,800 N', '500 N', '9,300 N'],
        correctIndex: 0,
        hint: 'Net force upward = T − mg = ma, so T = m(g + a).',
        explanation: 'T = 1,000 × (9.8 + 0.5) = 10,300 N. The cable must hold the weight AND provide the extra force to accelerate, which is why lifting gear has safety factors.',
      },
    },
  }),

  // ------------------------------------------------------------------ P5
  base('phys-005', 'PHYS 05', {
    title: 'Energy & Heat: From Caloric to Joule',
    subtitle: 'Motion, height and heat are all the same thing: energy',
    overtimeDigest: [
      'Kinetic energy (motion) = ½mv²; potential energy (height) = mgh. They trade back and forth, like a swinging pendulum.',
      'Friction doesn’t destroy energy, it turns it into heat. Joule measured the exchange rate: 4.18 J heats 1 g of water by 1 °C.',
      'Energy is always conserved. It is measured in joules (J).',
    ],
    history: {
      era: '1780s caloric → 1798 Munich → 1845 Manchester → 1847 Helmholtz',
      protagonist: 'Count Rumford, James Prescott Joule & Hermann von Helmholtz',
      hook: 'Why did a brewer spend his honeymoon measuring the temperature of waterfalls?',
      narrative: [
        'In the 1700s most scientists, Lavoisier included, thought heat was an invisible fluid called caloric that flowed from hot things to cold. In 1798 Benjamin Thompson, Count Rumford, supervising cannon boring in Munich, noticed that blunt drills could boil water indefinitely. A fluid would eventually run out; endless heat from endless rubbing suggested heat was a kind of motion.',
        'James Prescott Joule, son of a Manchester brewer and trained in precise temperature measurement, settled it. In 1845 he let falling weights turn a paddle wheel inside an insulated tank of water and measured the tiny temperature rise. A given amount of mechanical work always produced the same amount of heat. (He reportedly tried to measure the warmer water at the bottom of a waterfall on his honeymoon.) The unit of energy, the joule, is named after him.',
        'In 1847 Hermann von Helmholtz stated the general law: energy is never created or destroyed, only converted between forms. Combined with Lavoisier’s conservation of mass, it gave engineers a complete accounting system for machines, engines and furnaces.',
      ],
      takeaway:
        'Energy bookkeeping is the backbone of materials processing: how much heat to melt a metal, how much energy a part absorbs before breaking, how a quench removes heat.',
    },
    csBridge: {
      concept: 'Conserved Quantities as Invariants',
      analogy:
        'Total energy is a system invariant. Physics engines that drift and slowly gain energy are buggy; the fix is usually a better integrator.',
      codeSnippet: `const KE = (m, v) => 0.5 * m * v * v;   // joules
const PE = (m, h, g = 9.8) => m * g * h;
PE(2, 5);                 // 98 J at the top...
KE(2, Math.sqrt(2 * 9.8 * 5)); // ...98 J at the bottom (no friction)

const heatWater = (grams, dT) => grams * 4.18 * dT;  // J
heatWater(1000, 10);      // 41,800 J`,
    },
    visualLab: {
      type: 'pendulum_energy',
      title: 'The Energy Pendulum',
      instructions: 'Release the pendulum and watch energy move between height (PE) and speed (KE). Add friction to see it become heat.',
      missionPrompt: 'Add friction and let the pendulum run until most of the energy has turned into heat.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Kinetic and potential energy',
        formula: 'KE = \\tfrac{1}{2} m v^2 \\qquad PE = m g h',
        explanation: 'Energy of motion and energy of height. A 2 kg mass 5 m up stores 2 × 9.8 × 5 = 98 J.',
      },
      {
        title: '2. Conservation',
        formula: 'KE + PE + \\text{heat} = \\text{constant}',
        explanation: 'At the top of a swing it is all PE; at the bottom all KE. With friction, a little more becomes heat on every swing, but the total never changes.',
      },
      {
        title: '3. Heat and temperature',
        formula: 'Q = m c \\Delta T \\qquad c_{\\text{water}} = 4.18\\,\\text{J/(g·°C)} \\quad c_{\\text{steel}} \\approx 0.49\\,\\text{J/(g·°C)}',
        explanation: 'Specific heat c is how much energy it takes to warm 1 g by 1 °C. Steel heats up about 8.5× more easily than water.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p005-d1',
          question: 'What potential energy does a 2 kg mass have 5 m above the floor (g = 9.8)?',
          options: ['98 J', '10 J', '49 J', '19.6 J'],
          correctIndex: 0,
          hint1: 'PE = mgh.',
          hint2: '2 × 9.8 × 5.',
          explanation: 'PE = 2 × 9.8 × 5 = 98 J.',
        },
        {
          id: 'p005-d2',
          question: 'What is the kinetic energy of a 4 kg ball moving at 3 m/s?',
          options: ['18 J', '12 J', '36 J', '6 J'],
          correctIndex: 0,
          hint1: 'KE = ½mv².',
          hint2: '½ × 4 × 9.',
          explanation: 'KE = ½ × 4 × 3² = ½ × 4 × 9 = 18 J.',
        },
        {
          id: 'p005-d3',
          question: 'How much heat warms 1,000 g of water by 10 °C (c = 4.18 J/g·°C)?',
          options: ['41,800 J', '418 J', '4,180 J', '10,000 J'],
          correctIndex: 0,
          hint1: 'Q = mcΔT.',
          hint2: '1,000 × 4.18 × 10.',
          explanation: 'Q = 1,000 × 4.18 × 10 = 41,800 J.',
        },
      ],
      bossProblem: {
        title: 'Drop Forging',
        scenario:
          'A drop forge lifts a 50 kg ram 2.0 m and lets it fall onto a hot steel billet. How much energy does each blow deliver to shaping (and heating) the metal? (g = 9.8 m/s²)',
        options: ['980 J', '100 J', '490 J', '1,960 J'],
        correctIndex: 0,
        hint: 'All the potential energy becomes kinetic energy at impact.',
        explanation: 'PE = mgh = 50 × 9.8 × 2.0 = 980 J per blow, converted into deforming the billet and into heat.',
      },
    },
  }),

  // ------------------------------------------------------------------ P6
  base('phys-006', 'PHYS 06', {
    title: 'Electricity: From Frog Legs to Ohm’s Law',
    subtitle: 'Charge, current, voltage and resistance, the language of every electronic material',
    overtimeDigest: [
      'Current I is charge flowing per second (amps). Voltage V is the push. Resistance R is how hard the material resists.',
      'Ohm’s law: V = IR. Power: P = VI.',
      'Current in metals is a flow of electrons, which drift the opposite way to "conventional current".',
    ],
    history: {
      era: '1780s Bologna → 1800 Pavia → 1827 Cologne → 1897 Cambridge',
      protagonist: 'Luigi Galvani, Alessandro Volta, Georg Ohm & J. J. Thomson',
      hook: 'Why did dead frogs’ legs twitch, and how did that lead to the battery?',
      narrative: [
        'In the 1780s Luigi Galvani found that a dissected frog’s leg twitched when touched with two different metals. He believed the electricity came from the animal itself ("animal electricity"). Alessandro Volta disagreed: he thought the two metals were the source. To prove it, in 1800 he stacked discs of zinc and copper separated by brine-soaked cardboard. The voltaic pile produced a steady current, the first battery, and the unit volt is named after him.',
        'With steady currents available, Georg Ohm, a schoolteacher in Cologne, measured how current depended on the wire. In 1827 he published that current is proportional to voltage and inversely proportional to resistance. Prussian academics dismissed his work as a "web of naked fancies" and he lost his job, but within twenty years Ohm’s law was standard and he received the Royal Society’s Copley Medal.',
        'What actually flows? In 1897 J. J. Thomson discovered the electron, showing that current in metals is a drift of tiny negative particles. Unluckily, Benjamin Franklin had already guessed the direction of flow the other way round, so "conventional current" still points opposite to the electrons. Every semiconductor, wire and battery material is designed around these ideas.',
      ],
      takeaway:
        'Resistance is a materials property. Copper conducts, rubber insulates, and silicon sits in between, which is the whole story of semiconductors later in this course.',
    },
    csBridge: {
      concept: 'Hardware Underneath Your Code',
      analogy:
        'Every bit flip in a CPU is a tiny current switched through a transistor. Ohm’s law and P = VI decide how hot your laptop gets.',
      codeSnippet: `const current = (volts, ohms) => volts / ohms;      // A
const power   = (volts, amps) => volts * amps;      // W
current(12, 4);                // 3 A
power(12, 3);                  // 36 W

// heating element: what resistance gives 1000 W at 230 V?
const R = (V, P) => (V * V) / P;
R(230, 1000);                  // 52.9 Ω`,
    },
    visualLab: {
      type: 'ohm_circuit',
      title: 'Electrons in a Circuit',
      instructions: 'Change the battery voltage and the resistance. Watch the electrons speed up or slow down and the bulb brighten.',
      missionPrompt: 'Set 12 V and choose a resistance that gives exactly 3 A.',
      targetState: {},
    },
    guidedSteps: [
      {
        title: '1. Current is flowing charge',
        formula: 'I = \\frac{Q}{t} \\qquad 1\\,\\text{A} = 1\\,\\text{C/s} \\approx 6.24 \\times 10^{18}\\,\\text{electrons per second}',
        explanation: 'An amp is a huge number of electrons each second. Each individual electron actually drifts very slowly.',
      },
      {
        title: '2. Ohm’s law',
        formula: 'V = I R \\qquad I = \\frac{V}{R} = \\frac{12\\,\\text{V}}{4\\,\\Omega} = 3\\,\\text{A}',
        explanation: 'More push (voltage) gives more current; more resistance gives less.',
      },
      {
        title: '3. Electrical power',
        formula: 'P = V I = I^2 R = \\frac{V^2}{R}',
        explanation: 'Power is energy per second (watts). Current through a resistance becomes heat: that is how toasters and furnace elements work.',
      },
    ],
    gate: {
      drills: [
        {
          id: 'p006-d1',
          question: 'A 12 V battery drives current through a 4 Ω resistor. What is the current?',
          options: ['3 A', '48 A', '0.33 A', '16 A'],
          correctIndex: 0,
          hint1: 'I = V / R.',
          hint2: '12 ÷ 4.',
          explanation: 'I = 12 V ÷ 4 Ω = 3 A.',
        },
        {
          id: 'p006-d2',
          question: 'A current of 2 A flows through a 10 Ω resistor. What is the voltage across it?',
          options: ['20 V', '5 V', '0.2 V', '12 V'],
          correctIndex: 0,
          hint1: 'V = IR.',
          hint2: '2 × 10.',
          explanation: 'V = 2 A × 10 Ω = 20 V.',
        },
        {
          id: 'p006-d3',
          question: 'A device runs on 12 V and draws 2 A. What power does it use?',
          options: ['24 W', '6 W', '14 W', '144 W'],
          correctIndex: 0,
          hint1: 'P = VI.',
          hint2: '12 × 2.',
          explanation: 'P = 12 V × 2 A = 24 W.',
        },
      ],
      bossProblem: {
        title: 'Designing a Furnace Element',
        scenario:
          'You are making a 1,000 W heating element for a lab furnace that plugs into 230 V mains. What resistance should the nichrome coil have?',
        options: ['52.9 Ω', '4.3 Ω', '0.23 Ω', '230,000 Ω'],
        correctIndex: 0,
        hint: 'Use P = V²/R and rearrange for R.',
        explanation: 'R = V²/P = 230² ÷ 1,000 = 52,900 ÷ 1,000 = 52.9 Ω. Nichrome is chosen because it has high resistance and doesn’t oxidise when red hot.',
      },
    },
  }),
];

const wiki = (slug, title, why, excerpt, minutes = 6) => ({
  type: 'Encyclopedia',
  source: 'Wikipedia',
  title,
  readTime: `${minutes} min read`,
  url: `https://en.wikipedia.org/wiki/${slug}`,
  whyRead: why,
  inAppExcerpt: excerpt,
});

export const PHYSICS_READINGS = {
  'phys-001': [
    { id: 'read-p001-1', ...wiki('Cubit', 'The Cubit', 'How a forearm became a precise royal standard.', 'The Egyptian royal cubit (about 52.4 cm) was divided into 7 palms of 4 digits each. Surviving cubit rods show it was kept remarkably consistent for centuries.') },
    { id: 'read-p001-2', ...wiki('Pendulum_clock', 'The Pendulum Clock', 'From Galileo’s chandelier to Huygens’s 1656 clock.', 'Huygens’s pendulum clock improved timekeeping accuracy roughly a hundredfold and remained the world’s most accurate timekeeper until the 1930s.') },
  ],
  'phys-002': [
    { id: 'read-p002-1', ...wiki('Archimedes', 'Archimedes', 'Mathematician, engineer and inventor of Syracuse.', 'Archimedes approximated π, found areas and volumes using methods close to calculus, stated the law of the lever and the principle of buoyancy, and designed war machines to defend Syracuse.', 8) },
    { id: 'read-p002-2', ...wiki('Archimedes%27_principle', 'Archimedes’ Principle', 'Why ships float and how hydrometers work.', 'Any object fully or partly immersed in a fluid is buoyed up by a force equal to the weight of fluid it displaces.') },
  ],
  'phys-003': [
    { id: 'read-p003-1', ...wiki('Galileo_Galilei', 'Galileo Galilei', 'Telescope, trial and the science of motion.', 'Galileo’s experiments with inclined planes and pendulums established the laws of falling bodies. His support for heliocentrism led to his trial in 1633 and house arrest for the rest of his life.', 8) },
    { id: 'read-p003-2', ...wiki('Two_New_Sciences', 'Two New Sciences (1638)', 'The book where both strength of materials and kinematics begin.', 'Written as a dialogue, Two New Sciences covers the strength of materials (why big animals need thicker bones) and the motion of objects, including uniformly accelerated motion.') },
  ],
  'phys-004': [
    { id: 'read-p004-1', ...wiki('Newton%27s_laws_of_motion', 'Newton’s Laws of Motion', 'The three laws with many worked examples.', 'Newton’s laws relate the forces on a body to its motion. They hold extremely well for everyday speeds and sizes and are the basis of classical mechanics.', 8) },
    { id: 'read-p004-2', ...wiki('Philosophi%C3%A6_Naturalis_Principia_Mathematica', 'The Principia (1687)', 'The story of how it was written and published.', 'The Principia states Newton’s laws of motion and universal gravitation. Edmond Halley encouraged its writing and paid for its publication.') },
  ],
  'phys-005': [
    { id: 'read-p005-1', ...wiki('James_Prescott_Joule', 'James Prescott Joule', 'Brewer, experimenter, and namesake of the unit of energy.', 'Joule’s paddle-wheel experiments established the mechanical equivalent of heat and supported the law of conservation of energy.') },
    { id: 'read-p005-2', ...wiki('Conservation_of_energy', 'Conservation of Energy', 'One of the most tested laws in physics.', 'In an isolated system the total energy remains constant; energy can change form but is neither created nor destroyed.') },
  ],
  'phys-006': [
    { id: 'read-p006-1', ...wiki('Voltaic_pile', 'The Voltaic Pile', 'The first battery, made from coins and cardboard.', 'Volta’s pile of alternating zinc and copper discs separated by brine-soaked cloth produced the first steady electric current in 1800.') },
    { id: 'read-p006-2', ...wiki('Ohm%27s_law', 'Ohm’s Law', 'When it applies, and when materials break it.', 'Ohm’s law holds for many materials (ohmic conductors) over wide ranges. Diodes, transistors and gas discharges do not obey it, which is exactly what makes them useful.') },
  ],
};
