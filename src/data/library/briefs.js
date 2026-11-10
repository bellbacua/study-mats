// Design challenges: a real brief, a short list of candidate materials from the
// Materials shelf, and a verdict for each. Numbers shown to the learner are
// read from materials.js at run time; `use` overrides one value where the
// usual condition of the material in that job differs from the shelf entry.
//
// verdict: 'best' | 'good' (would work) | 'poor' (poor fit) | 'fail'
// metric: a figure of merit computed from the shelf numbers (higher is better
// unless `lower: true`). Not every job has one, and that is said on screen.

const W = (t, title) => ({ title: `Wikipedia: ${title || decodeURIComponent(t).replace(/_/g, ' ')}`, url: `https://en.wikipedia.org/wiki/${t}` });
const ASHBY = {
  title: 'M. F. Ashby, Materials Selection in Mechanical Design, 5th ed. (Elsevier, 2017): material indices for springs, beams, ties and heat flow',
  url: 'https://www.sciencedirect.com/book/9780081005996/materials-selection-in-mechanical-design',
};
const CALLISTER = {
  title: 'W. D. Callister & D. G. Rethwisch, Materials Science and Engineering: An Introduction, 10th ed. (Wiley, 2018)',
  url: 'https://www.wiley.com/en-us/Materials+Science+and+Engineering%3A+An+Introduction%2C+10th+Edition-p-9781119405498',
};

export const VERDICTS = {
  best: { label: 'Best fit', stars: 3 },
  good: { label: 'Would work', stars: 2 },
  poor: { label: 'Poor fit', stars: 1 },
  fail: { label: 'Would fail', stars: 0 },
};

export const BRIEFS = [
  {
    id: 'leafspring',
    icon: '🚙',
    title: 'A leaf spring for a jeepney',
    brief:
      'A jeepney’s rear axle hangs on leaf springs: stacked curved strips that flex every time the wheels hit a bump. They are overloaded daily, splashed with flood water, and fixed in roadside shops.',
    needs: [
      'Store a lot of bending energy and spring back, without taking a permanent bend.',
      'Survive millions of flexes (fatigue) and the odd pothole (toughness).',
      'Cheap, and repairable with ordinary tools.',
    ],
    metric: {
      label: 'Springiness: energy stored per volume before it bends for good',
      unit: 'MJ/m³',
      formula: 'strength² ÷ (2 × stiffness)',
      fn: (m) => (m.s * m.s) / (2 * m.E * 1000),
    },
    candidates: [
      { id: 's4140', verdict: 'best', why: 'A quenched and tempered alloy steel: high yield strength, so it stores a lot of energy, yet tough and cheap. Real leaf springs use close cousins (chromium spring steels such as SAE 5160), and a spring shop can re-arch and re-temper them.' },
      { id: 'gfrp', verdict: 'good', why: 'The numbers are even better than steel: strong and not very stiff, so it stores far more energy per kilogram. Glass-fibre leaf springs are real (the Chevrolet Corvette has used one since the 1980s). But it costs more to make, and a cracked one cannot be repaired by the roadside.' },
      { id: 'ti64', verdict: 'poor', why: 'Excellent spring numbers and no rust, which is why racing cars use titanium springs. At ten or more times the price of steel per kilogram it makes no sense for a jeepney.' },
      { id: 'al6061', verdict: 'poor', why: 'Stores about a quarter of the energy of the alloy steel, and aluminium has no fatigue limit: under repeated bending a crack eventually starts, however small the load.' },
      { id: 's1020', verdict: 'fail', why: 'Same stiffness as the alloy steel but a quarter of the yield strength. The first heavy load would bend it for good, and the jeepney would sag.' },
      { id: 'greyiron', verdict: 'fail', why: 'Brittle in tension because of its graphite flakes. It would snap at the first pothole instead of flexing.' },
    ],
    answer:
      'Steel leaf springs win on cost and repairability, not on raw numbers. The figure of merit for a spring is strength² ÷ stiffness: you want a material that is strong but not too stiff. Heat treatment (quench and temper) is what lifts a steel’s yield strength high enough.',
    sources: [W('Leaf_spring'), W('Corvette_leaf_spring'), ASHBY],
  },
  {
    id: 'kaldero',
    icon: '🍚',
    title: 'The base of a rice pot (kaldero)',
    brief: 'A pot for cooking rice on a gas or charcoal stove. If heat does not spread sideways fast enough, the rice burns over the flame and stays raw at the edges.',
    needs: ['Spread heat quickly and evenly.', 'Light enough to lift when full, and cheap.', 'Safe with food, and does not melt or crack on a flame.'],
    metric: { label: 'Heat conduction', unit: 'W/(m·K)', formula: 'thermal conductivity', fn: (m) => m.k },
    candidates: [
      { id: 'al1100', verdict: 'best', why: 'Conducts heat about 14 times better than stainless steel, weighs a third as much as copper or iron, and is cheap to cast or press. This is what a kaldero is made of.' },
      { id: 'cu', verdict: 'good', why: 'The best common conductor of heat, and chefs love it. But it is over three times as heavy as aluminium, costs more, and bare copper reacts with acidic food, so copper pots are lined with tin or stainless steel.' },
      { id: 'greyiron', verdict: 'good', why: 'A cast-iron kawali works: it conducts heat moderately and, being thick and heavy, holds a lot of it, which is good for frying. For a rice pot it is slow to heat and heavy to carry.' },
      { id: 'ss304', verdict: 'poor', why: 'Tough, shiny and safe, but a poor conductor: hot spots form right over the flame. Good stainless pots solve this by bonding an aluminium or copper layer into the base.' },
      { id: 'borosilicate', verdict: 'poor', why: 'Glass conducts heat about 200 times worse than aluminium. Fine in an oven, where heat arrives from all sides, but over a single flame the base heats unevenly and can crack.' },
      { id: 'pb', verdict: 'fail', why: 'Lead is poisonous and dissolves into food. It also melts at 327 °C, well within reach of a stove flame.' },
    ],
    answer: 'For spreading heat, thermal conductivity is the number to read first; then weight and price decide between the good conductors. That is why aluminium, not copper, became the everyday pot metal.',
    sources: [W('Cookware_and_bakeware'), ASHBY],
  },
  {
    id: 'hip',
    icon: '🦴',
    title: 'The stem of an artificial hip',
    brief: 'A hip replacement has a metal stem that sits inside the thigh bone and carries the body’s weight at every step, for twenty years or more, inside warm salty body fluid.',
    needs: [
      'The body must tolerate it: no poisonous ions, no corrosion.',
      'Survive roughly a million loaded steps a year (fatigue).',
      'Not too stiff. If the stem is much stiffer than bone it carries the load itself, and the unloaded bone around it slowly thins (“stress shielding”).',
    ],
    metric: { label: 'Stiffness (cortical bone is about 18 GPa; closer is kinder to the bone)', unit: 'GPa', formula: 'Young’s modulus', fn: (m) => m.E, lower: true },
    candidates: [
      { id: 'ti64', verdict: 'best', why: 'Strong, fatigue resistant, protected by a stable oxide film, and bone grows right up to it. At 114 GPa it is about half as stiff as steel or cobalt alloys, so it shields the bone less. It is the standard choice for uncemented stems.' },
      { id: 'cocr', verdict: 'good', why: 'Very strong and the most wear resistant of the three implant metals, so it is the classic choice for the polished ball. It is also used for stems, but it is nearly twice as stiff as titanium.' },
      { id: 'ss316', verdict: 'good', why: 'Surgical stainless steel was used in the first successful hips and still is, in cemented stems. It is cheaper, but stiffer than titanium and a little less corrosion resistant over decades.' },
      { id: 'uhmwpe', verdict: 'poor', why: 'Right operation, wrong part. This slippery plastic is the liner of the socket that the ball turns in. As a stem it is over a hundred times too flexible and far too weak.' },
      { id: 'al6061', verdict: 'fail', why: 'Light and stiff enough on paper, but aluminium alloys are not used for load-bearing implants: their fatigue strength is low and they do not resist body fluid the way titanium does.' },
      { id: 'cu', verdict: 'fail', why: 'Copper corrodes in the body and the copper ions released are toxic to the cells around it.' },
    ],
    answer:
      'Here the first filter is not a number in the property table at all: it is whether the body tolerates the material. Only a few metals pass (titanium alloys, cobalt–chromium, some stainless steels). Among those, stiffness close to bone and fatigue strength decide.',
    sources: [W('Hip_replacement'), W('Stress_shielding'), CALLISTER],
  },
  {
    id: 'bottle',
    icon: '🧴',
    title: 'A bottle for a fizzy drink',
    brief: 'A single-use 500 mL bottle for a carbonated drink. It is shipped by the truckload, left in hot cars, squeezed, dropped, and should be recyclable.',
    needs: ['Clear, so you can see the drink.', 'Holds gas pressure and keeps the fizz in for months.', 'Light, tough when dropped, cheap by the billion.'],
    metric: null,
    metricNote: 'No bar chart here: the two properties that decide this job, clearness and how fast gas leaks through the wall, are not in the property table. A table never holds everything that matters.',
    candidates: [
      { id: 'pet', verdict: 'best', why: 'Clear, strong for a plastic, and a good barrier to carbon dioxide. Blowing and stretching the hot preform lines up its chains, which makes the thin wall stronger still. Widely recycled.' },
      { id: 'sodalime', verdict: 'good', why: 'The classic: a perfect gas barrier, clear, and endlessly reusable. But a glass bottle weighs many times more than a PET one and shatters when dropped, which costs fuel and breakage.' },
      { id: 'hdpe', verdict: 'poor', why: 'Tough and cheap, which is why it is used for milk jugs and water gallons. But it is cloudy, and carbon dioxide leaks through it much faster than through PET: the drink would go flat.' },
      { id: 'pla', verdict: 'poor', why: 'A clear plastic made from plants, but it softens at about 60 °C. A bottle left in a hot car or a delivery truck would sag, and it lets gas through faster than PET.' },
      { id: 'pvc', verdict: 'poor', why: 'Clear and strong, and once used for bottles. It has been largely dropped for drinks: even a little PVC mixed in spoils a batch of recycled PET.' },
      { id: 'ps', verdict: 'fail', why: 'Clear but brittle: the plastic of disposable cups. Under gas pressure and a squeeze it cracks.' },
    ],
    answer:
      'PET wins by being good enough at everything at once: clear, strong, a fair gas barrier, tough, light, cheap. Material choices for packaging are usually decided by the property a material is worst at.',
    sources: [W('Polyethylene_terephthalate'), W('Plastic_bottle'), CALLISTER],
  },
  {
    id: 'turbine',
    icon: '✈️',
    title: 'A turbine blade in a jet engine',
    brief:
      'Right behind the burner, each blade sits in gas well over 1,000 °C while spinning thousands of times a minute. The spin alone pulls on the blade with a force of many tonnes, for thousands of hours.',
    needs: ['Keep its strength when glowing hot.', 'Resist creep: slow stretching under a steady pull at high temperature.', 'Not burn away (oxidise) in hot air, and not be so heavy that its own spin tears it off.'],
    metric: { label: 'Melting or softening temperature (a first filter only)', unit: '°C', formula: 'temperature limit', fn: (m) => m.t },
    candidates: [
      { id: 'in718', verdict: 'best', why: 'Nickel superalloys keep most of their strength to within a few hundred degrees of melting, resist creep and form a protective oxide. Inconel 718 itself is used for turbine discs; the blades are cast from even more heat-resistant nickel superalloys, often as one single crystal, with cooling holes and a ceramic coating.' },
      { id: 'cmc', verdict: 'good', why: 'Silicon-carbide composites are a third of the weight of nickel alloys and can run hotter. They entered airline service in the 2010s as turbine shrouds, and are being developed for blades. Costly and hard to make.' },
      { id: 'ss304', verdict: 'poor', why: 'Resists oxidation, but creeps badly at these temperatures. Stainless steels serve in cooler parts such as exhaust ducts.' },
      { id: 'ti64', verdict: 'fail', why: 'Light and strong, so it is the metal of the fan and the front of the compressor. But above roughly 500 °C titanium soaks up oxygen and loses strength, long before it melts.' },
      { id: 'w', verdict: 'fail', why: 'The highest melting point of any metal, but it oxidises quickly in hot air, and it is two and a half times as dense as steel, so the spin load would be enormous.' },
      { id: 'al7075', verdict: 'fail', why: 'Strong at room temperature, but it loses most of its strength above about 150 °C and melts below 600 °C.' },
    ],
    answer:
      'Melting point is only the first filter. What matters is how much strength is left when hot, and for how long (creep). Tungsten melts highest and still fails; nickel superalloys work at a higher fraction of their melting point than any other metal.',
    sources: [W('Turbine_blade'), W('Superalloy'), W('Ceramic_matrix_composite'), CALLISTER],
  },
  {
    id: 'cable',
    icon: '🌉',
    title: 'The main cable of a suspension bridge',
    brief: 'A two-kilometre span hangs from two cables. Each cable must carry the road, the traffic and, above all, its own weight, in sea air, for a hundred years.',
    needs: ['Very high strength for its weight: a long cable mostly holds itself up.', 'Affordable by the tens of thousands of tonnes.', 'Predictable for a century: no slow stretching, inspectable, with a long track record.'],
    metric: { label: 'Strength for its weight', unit: 'MPa per g/cm³', formula: 'strength ÷ density', fn: (m) => m.s / m.rho },
    candidates: [
      { id: 's1080', verdict: 'best', use: { s: 1800 }, useNote: 'as cold-drawn bridge wire (about 1,800 MPa), not annealed as on the shelf', why: 'High-carbon steel drawn through dies into 5 mm wire becomes one of the strongest cheap materials there is. Thousands of parallel wires make a cable; each is galvanised against rust. Every large suspension bridge uses it.' },
      { id: 'cfrp_ud', verdict: 'good', why: 'Four times the strength-for-weight of steel wire and no rust, so very long future spans may need it. A few trial bridges carry carbon-fibre cables. For now the cost, and the difficulty of gripping the ends without crushing the fibres, keep it experimental.' },
      { id: 'kevlar', verdict: 'poor', why: 'The best number on the list, and used for ropes. But aramid fibres creep under a steady load and are weakened by sunlight, both serious for a hundred-year cable.' },
      { id: 'al7075', verdict: 'poor', why: 'Strong for an aluminium alloy, but no better than steel wire for its weight, several times the price, and prone to fatigue and stress-corrosion cracking in sea air.' },
      { id: 's1020', verdict: 'fail', why: 'Ordinary structural steel has about one eighth of the strength of drawn wire at the same density. The cable would have to be so thick it could barely carry itself.' },
      { id: 'nylon', verdict: 'fail', why: 'Far too stretchy (about 70 times less stiff than steel) and it creeps: the deck would sag more every year.' },
    ],
    answer:
      'For a tie that must carry its own weight, the figure of merit is strength ÷ density. Fibres score highest, but cost, creep, anchoring and a century of experience keep cold-drawn steel wire in charge. Note what processing did: drawing raised the same steel from about 400 to 1,800 MPa.',
    sources: [W('Suspension_bridge'), W('Wire_rope'), ASHBY],
  },
  {
    id: 'heatsink',
    icon: '💡',
    title: 'A heat sink for a bright LED lamp',
    brief: 'The LED chip in a street lamp turns much of its power into heat in a spot a few millimetres wide. A finned block must carry that heat away to the air, or the LED dims and dies early.',
    needs: ['Carry heat away fast.', 'Easy to shape into many thin fins.', 'Light (it hangs on a pole) and cheap.'],
    metric: { label: 'Heat conduction', unit: 'W/(m·K)', formula: 'thermal conductivity', fn: (m) => m.k },
    candidates: [
      { id: 'al6061', verdict: 'best', why: 'A good conductor, a third the weight of copper, cheap, and it can be squeezed through a die (extruded) into finned shapes in one step. Almost every heat sink you will see is an aluminium alloy like this.' },
      { id: 'cu', verdict: 'good', why: 'Conducts heat more than twice as well, so it is used where space is tight, as in computer coolers. But it is 3.3 times as heavy, costs more, and is harder to extrude into fins.' },
      { id: 'graphite', verdict: 'poor', why: 'Light, and thin graphite sheets are used inside phones to spread heat sideways. As a finned block it is brittle and awkward to shape.' },
      { id: 'diamond', verdict: 'poor', why: 'The best heat conductor known, five times better than copper, and really used as tiny heat spreaders under laser and radio chips. For a street lamp the price is absurd.' },
      { id: 'ss304', verdict: 'fail', why: 'A metal, but a poor conductor of heat: about a tenth of aluminium. The LED would overheat.' },
      { id: 'abs', verdict: 'fail', why: 'Plastics are heat insulators, about a thousand times worse than aluminium. That is why the lamp’s outer case can be plastic but its heat sink cannot.' },
    ],
    answer: 'Conductivity picks the short list (copper, aluminium); weight, price and how easily it can be shaped pick the winner. “Good enough and easy to make” often beats “best”.',
    sources: [W('Heat_sink'), ASHBY],
  },
  {
    id: 'knife',
    icon: '🔪',
    title: 'The blade of a kitchen knife',
    brief: 'A cook’s knife is used daily on a board, washed, left wet, and sharpened at home now and then.',
    needs: ['Hard enough to take and keep a sharp edge.', 'Tough enough not to chip or snap.', 'Does not rust in a wet kitchen.'],
    metric: null,
    metricNote:
      'No bar chart here, and that is the lesson: the property that matters most, hardness after heat treatment, is not in the table. The shelf lists most of these steels in their soft, annealed state.',
    candidates: [
      { id: 'ss410', verdict: 'best', why: 'A martensitic stainless steel: enough carbon to harden when quenched, and about 12% chromium to resist rust. Kitchen knives use this family (grades such as 420 and 440).' },
      { id: 's1080', verdict: 'good', why: 'The traditional carbon-steel knife. Quenched and tempered it takes a superb edge and is easy to sharpen, but it rusts and stains if left wet.' },
      { id: 'd2', verdict: 'good', why: 'Hard carbides give an edge that lasts a very long time. It is harder to sharpen, and with much of its chromium locked in carbides it can still stain.' },
      { id: 'ysz', verdict: 'good', why: 'Ceramic knives are real, made of this zirconia. Much harder than steel, so they stay sharp for years and never rust. But they chip or snap if dropped or twisted, and need special tools to sharpen.' },
      { id: 'ss304', verdict: 'poor', why: 'The stainless steel of spoons, sinks and pots. It cannot be hardened by quenching (its crystal structure does not change to martensite), so an edge would dull almost at once.' },
      { id: 'ti2', verdict: 'poor', why: 'Never rusts and is light, so it is used for some diving knives. But it is too soft to hold a fine edge for long.' },
    ],
    answer:
      'A knife needs hardness and rust resistance together. Chromium gives stainless steels their rust resistance; carbon plus quenching gives hardness. Only the martensitic stainless steels have both, and heat treatment, not composition alone, makes the blade.',
    sources: [W('Martensitic_stainless_steel'), W('Knife'), W('Ceramic_knife'), CALLISTER],
  },
  {
    id: 'window',
    icon: '🪟',
    title: 'A passenger window in an airliner',
    brief: 'Each cabin window holds back the pressure difference between the cabin and the thin, −50 °C air outside, on every flight, tens of thousands of times.',
    needs: ['Clear.', 'Light: every kilogram costs fuel for the life of the aircraft.', 'Tough, and able to take the pressure cycle of every flight without cracking.'],
    metric: { label: 'Density (lighter is better)', unit: 'g/cm³', formula: 'density', fn: (m) => m.rho, lower: true },
    candidates: [
      { id: 'pmma', verdict: 'best', why: 'Acrylic is clearer than glass, less than half its weight, and does not shatter. Cabin windows are made of stretched acrylic: stretching the sheet lines up the chains and makes it resist cracks better.' },
      { id: 'pc', verdict: 'good', why: 'Much tougher than acrylic, which is why it is used for fighter canopies and riot shields. But it scratches easily and yellows in sunlight, so it needs coatings.' },
      { id: 'sodalime', verdict: 'poor', why: 'Hard and scratch-proof, but more than twice the weight of acrylic, and it breaks suddenly. Cockpit windscreens do use glass, laminated with plastic layers, because they must resist bird strikes and wipers.' },
      { id: 'sapphire', verdict: 'fail', why: 'Very hard and clear, and used for watch faces and some sensor windows. A cabin window of it would cost a fortune and weigh over three times as much as acrylic.' },
      { id: 'ps', verdict: 'fail', why: 'Clear and cheap but brittle, and fine cracks (crazes) grow in it under repeated stress.' },
    ],
    answer: 'Transparency narrows the list to a few glasses and plastics; weight and toughness then favour the plastics. Processing matters again: stretching the acrylic sheet is what makes it reliable.',
    sources: [W('Poly(methyl_methacrylate)'), W('Polycarbonate'), CALLISTER],
  },
  {
    id: 'bike',
    icon: '🚲',
    title: 'The frame of an affordable commuter bicycle',
    brief: 'A bicycle frame is a set of thin tubes that are bent a little at every pedal stroke and bump. The buyer wants it light, wants it to feel stiff, and has a limited budget.',
    needs: ['Stiff and light: the tubes are beams loaded in bending.', 'Tough enough for kerbs and the odd crash, with a long fatigue life.', 'Cheap to make by the thousand.'],
    metric: { label: 'Light, stiff beam index', unit: '√GPa per g/cm³', formula: '√stiffness ÷ density', fn: (m) => Math.sqrt(m.E) / m.rho },
    candidates: [
      { id: 'al6061', verdict: 'best', why: 'For a beam, low density counts for more than high stiffness, so aluminium beats steel. 6061 is cheap, easy to form into fat thin-walled tubes and to weld, then heat treated. Most affordable bikes today are made of it.' },
      { id: 's4140', verdict: 'good', why: '“Chromoly” steel is the classic frame material: tough, forgiving in a crash, easy to repair anywhere, with a long fatigue life. The frame comes out heavier than aluminium.' },
      { id: 'cfrp_qi', verdict: 'good', why: 'The lightest and stiffest choice, and the material of racing bikes. It costs several times more to make, and crash damage can hide inside the layers.' },
      { id: 'bamboo', verdict: 'good', why: 'On this index bamboo beats every metal, and bamboo bikes are really built, including in the Philippines. Each stalk is different, though, and the joints must be made by hand, so it suits craft workshops, not mass production.' },
      { id: 'ti64', verdict: 'poor', why: 'Light, springy, and it never rusts: a lovely frame material. But the metal and the welding are expensive, so it fails the “affordable” part of the brief.' },
      { id: 'greyiron', verdict: 'fail', why: 'Heavy and brittle. It cannot be drawn into thin tubes, and a kerb strike could crack it.' },
    ],
    answer:
      'For a light, stiff beam the figure of merit is √stiffness ÷ density, which rewards low density strongly. That is why aluminium, composites and even bamboo beat steel here although steel is three times as stiff.',
    sources: [W('Bicycle_frame'), W('Bamboo_bicycle'), ASHBY],
  },
];
