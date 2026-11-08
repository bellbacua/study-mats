// Chemistry 1: four beginner-friendly parts per class.
// Typical values and model assumptions are stated where they are used.
// Electron configurations: OpenStax Chemistry 2e, section 6.4.
// https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations
// Water freezing constant: OpenStax Chemistry 2e, section 11.4.
// https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const CHEM1 = {
  'chem-000': {
    predict: {
      "q": "The water-splitting scene collects gas in two matching tubes. If the oxygen reaches one mark, where will the hydrogen reach at the same temperature and pressure?",
      "options": [
        "The same mark",
        "Half as high",
        "Twice as high",
        "Four times as high"
      ],
      "answer": 2,
      "reveal": "Hydrogen takes twice the volume. Water contains hydrogen and oxygen in a fixed arrangement, so the two gases collect in a fixed volume ratio."
    },
    parts: [
      {
        title: "Elements, compounds and mixtures",
        minutes: 20,
        explain: [
          "An element contains only one kind of atom. An atom is a tiny piece of matter. Iron contains iron atoms; copper contains copper atoms. Chemists use short symbols such as Fe for iron and Cu for copper.",
          "A compound has different kinds of atoms joined in a fixed arrangement. Water is a compound of hydrogen and oxygen. A mixture has substances together without a fixed recipe: sand and salt can be mixed in many amounts.",
          "Look at what is present, rather than how many pieces you can see. A bowl of iron filings still contains one element. A ceramic tile can contain several compounds."
        ],
        formulas: [
          [
            "Counting kinds",
            "\\text{one kind of atom} \\Rightarrow \\text{element}"
          ]
        ],
        examples: [
          ex("A tray holds iron, copper and aluminium, all pure. How many elements are present?", [
            ["Iron, copper and aluminium each contribute one kind.","1+1+1"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
          ex("A bottle holds only pure water. How many different elements make up its water?", [
            ["Hydrogen is one kind and oxygen is another.","1+1"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("A bowl holds only copper filings. How many elements are present?", 1, "Many pieces can have the same substance.", "Every filing is copper. 1 = 1."),
          pr("Count the elements among iron, water and copper.", 2, "Water is a compound.", "Iron and copper are the two elements. 1+1 = 2."),
          pr("A mixture contains water, sand and salt. How many named substances were mixed?", 3, "Count the names, regardless of whether they dissolve.", "Water, sand and salt are three substances. 1+1+1 = 3."),
          pr("Count the compounds among pure water, pure salt, iron and copper.", 2, "A compound contains joined atoms of different elements.", "Water and salt are compounds; the metals are elements. 1+1 = 2."),
        ],
      },
      {
        title: "Changing shape or making a substance",
        minutes: 20,
        explain: [
          "A physical change keeps the same substance. Ice melting is still water. Cutting a copper sheet makes smaller pieces of copper. A chemical change produces a different substance, as when iron reacts with oxygen to form an oxide.",
          "A colour change or bubbles can be clues, but they do not prove a reaction alone. Boiling water makes bubbles of water vapour. Ask whether a new substance formed.",
          "Mixtures can often be separated physically. A magnet can pull iron from dry sand. Filtering traps an insoluble solid, while evaporation removes a liquid and leaves a dissolved solid behind."
        ],
        formulas: [
          [
            "Physical separation",
            "\\text{mixture} \\rightarrow \\text{separated substances}"
          ]
        ],
        examples: [
          ex("Count the physical changes: ice melts; iron rusts; copper is cut.", [
            ["Melting and cutting keep water and copper.","1+1"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
          ex("Sand and salt water are filtered, then the water is evaporated. How many separation stages are named?", [
            ["Filtering removes sand; evaporation leaves salt.","1+1"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("Count the chemical changes: iron rusts; paper is cut.", 1, "Look for a new substance.", "Rusting forms a new substance. 1 = 1."),
          pr("Count the physical changes: water freezes; salt dissolves; a metal rod bends.", 3, "The salt can be recovered by evaporation.", "Freezing, dissolving and bending keep the substances. 1+1+1 = 3."),
          pr("Count the chemical changes: copper forms an oxide; ice melts; magnesium burns.", 2, "Making an oxide makes a new substance.", "Copper oxidation and magnesium burning are chemical changes. 1+1 = 2."),
          pr("A magnet removes iron, a filter removes sand, then evaporation recovers salt. How many stages are used?", 3, "Count each named separation.", "Magnetic separation, filtering and evaporation are three stages. 1+1+1 = 3."),
        ],
      },
      {
        title: "Following all the matter",
        minutes: 20,
        explain: [
          "Mass tells us how much matter is present. A balance measures it in units such as grams, written g. In an ordinary chemical reaction, the total mass stays the same if everything is kept inside.",
          "A closed container keeps the gases too. In an open container a gas may escape, so the balance can show less. A metal can gain mass by taking oxygen from the air.",
          "To follow a reaction, count all the masses together. For small whole numbers, adding means continuing the count. If a metal gains oxygen, the oxide contains the metal and that oxygen."
        ],
        formulas: [
          [
            "Closed container",
            "m_{\\text{before}}=m_{\\text{after}}"
          ]
        ],
        examples: [
          ex("A sealed reaction vessel weighs 40 g before heating. What does the whole sealed vessel weigh afterwards, in g?", [
            ["All the matter stays inside.","40"],
            ["Evaluate and keep the requested unit.","= 40\\,\\mathrm{g}"],
          ], "40 g"),
          ex("A metal takes in 2 g of oxygen. It started at 6 g. What mass of oxide forms, in g?", [
            ["The oxide holds the metal and the added oxygen.","6+2"],
            ["Evaluate and keep the requested unit.","= 8\\,\\mathrm{g}"],
          ], "8 g"),
        ],
        practice: [
          pr("A sealed vessel weighs 25 g before a reaction. Its final total mass, in g?", 25, "Keep the container sealed.", "No matter has crossed its boundary. 25 = 25 g."),
          pr("A 4 g metal sample combines with 1 g oxygen. What mass of oxide forms, in g?", 5, "Count the two masses together.", "The oxide contains both starting substances. 4+1 = 5 g."),
          pr("A 7 g metal sample combines with 3 g oxygen. What mass of oxide forms, in g?", 10, "Start at seven and count on three.", "The product contains the metal plus oxygen. 7+3 = 10 g."),
          pr("A sealed flask weighs 60 g. A gas forms inside without escaping. What is the whole flask mass, in g?", 60, "Include the invisible gas.", "Gas formation rearranges matter within the flask. 60 = 60 g."),
        ],
      },
      {
        title: "Reading the water-splitting tubes",
        minutes: 20,
        explain: [
          "Electricity can split water into hydrogen gas and oxygen gas. Collecting both gases shows that water is a compound. Each gas is a different substance from liquid water.",
          "At the same temperature and pressure, the hydrogen takes twice the volume of the oxygen. Twice means two equal portions: if oxygen fills one portion, hydrogen fills two. We write this as 2 : 1.",
          "This is a volume comparison, rather than a mass comparison. A tall gas column does not tell you which gas is heavier. The two tubes must have the same width for their heights to compare volumes directly."
        ],
        formulas: [
          [
            "Gas volumes",
            "V_{\\mathrm{H_2}}:V_{\\mathrm{O_2}}=2:1"
          ]
        ],
        examples: [
          ex("Oxygen fills 3 mL. At the same temperature and pressure, how much hydrogen is collected, in mL?", [
            ["Hydrogen fills two equal portions.","3+3"],
            ["Evaluate and keep the requested unit.","= 6\\,\\mathrm{mL}"],
          ], "6 mL"),
          ex("Hydrogen fills 8 mL. How much oxygen is collected under matching conditions, in mL?", [
            ["One of those equal portions is oxygen.","\\frac{8}{2}"],
            ["Evaluate and keep the requested unit.","= 4\\,\\mathrm{mL}"],
          ], "4 mL"),
        ],
        practice: [
          pr("Oxygen fills 1 mL. Hydrogen volume under matching conditions, in mL?", 2, "Use two oxygen-sized portions.", "Hydrogen fills two portions. 1+1 = 2 mL."),
          pr("Oxygen fills 4 mL. Hydrogen volume under matching conditions, in mL?", 8, "Repeat the oxygen volume twice.", "Two portions of four give the hydrogen volume. 4+4 = 8 mL."),
          pr("Hydrogen fills 10 mL. Oxygen volume under matching conditions, in mL?", 5, "Find one of two equal portions.", "The oxygen volume is half the hydrogen volume. 10 ÷ 2 = 5 mL."),
          pr("Oxygen fills 3 mL and hydrogen fills 6 mL. What is their combined volume, in mL?", 9, "Count both gas portions together.", "The two separate gas volumes add together. 3+6 = 9 mL."),
        ],
      },
    ],
  },

  'chem-001': {
    predict: {
      "q": "You build neutral silicon in the atom scene, then add only two neutrons. What changes?",
      "options": [
        "The mass number",
        "The element name",
        "The electric charge",
        "The electron count"
      ],
      "answer": 0,
      "reveal": "Only the mass number changes. Neutrons add mass without charge; the proton count still makes it silicon."
    },
    parts: [
      {
        title: "Protons, electrons and charge",
        minutes: 20,
        explain: [
          "Protons carry positive charge and sit in the nucleus, the tiny centre of an atom. Electrons carry equal negative charge around it. Neutrons sit with the protons but carry no charge.",
          "The atomic number Z counts protons and identifies the element. A neutral atom has just as many electrons as protons. Count protons minus electrons to find its charge in units of the elementary charge.",
          "Losing an electron leaves a positive ion; gaining one makes a negative ion. Chemical changes move electrons between atoms while leaving the nuclei intact."
        ],
        formulas: [
          [
            "Charge number",
            "q=Z-N_e"
          ]
        ],
        examples: [
          ex("An aluminium ion has 13 protons and 10 electrons. What is its charge number?", [
            ["Each proton contributes +1 and each electron −1.","13-10"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
          ex("An oxygen ion has 8 protons and 10 electrons. Find its charge number.", [
            ["Subtract the electron count from the proton count.","8-10"],
            ["Evaluate and keep the requested unit.","= -2"],
          ], "-2"),
        ],
        practice: [
          pr("Neutral carbon has 6 protons. How many electrons does it have?", 6, "Neutral means equal positive and negative charge.", "The electron count equals the proton count. 6 = 6."),
          pr("Sodium has 11 protons and 10 electrons. Find its charge number.", 1, "Use protons minus electrons.", "One positive charge remains unmatched. 11-10 = 1."),
          pr("Chlorine has 17 protons and 18 electrons. Find its charge number.", -1, "An extra electron contributes a negative charge.", "Subtract eighteen from seventeen. 17-18 = -1."),
          pr("A calcium ion has 20 protons and charge +2. How many electrons remain?", 18, "Two positive charges mean two missing electrons.", "Take the charge number away from the proton count. 20-2 = 18."),
        ],
      },
      {
        title: "Isotopes and average atomic mass",
        minutes: 20,
        explain: [
          "The mass number A counts protons and neutrons together. It is a whole-number count, rather than a measured mass in grams. Isotopes have the same protons but different neutrons.",
          "A periodic table usually shows an average atomic mass. Multiply each isotope mass by its fraction of the atoms, then add. A percentage becomes a fraction when divided by 100.",
          "For these calculations, isotope masses are supplied in u, the atomic mass unit. Real isotope masses are close to whole numbers but are not exactly their mass numbers."
        ],
        formulas: [
          [
            "Nucleons",
            "A=Z+N"
          ],
          [
            "Average mass",
            "\\bar m=\\sum_i f_i m_i"
          ]
        ],
        examples: [
          ex("Iron-56 has Z = 26. How many neutrons does it have?", [
            ["Mass number counts protons and neutrons.","56-26"],
            ["Evaluate and keep the requested unit.","= 30"],
          ], "30"),
          ex("A model sample is 75% atoms of mass 10 u and 25% atoms of mass 11 u. Find its average mass, in u.", [
            ["Multiply each isotope mass by its fraction, then add.","0.75\\times 10+0.25\\times 11"],
            ["Evaluate and keep the requested unit.","= 10.25\\,\\mathrm{u}"],
          ], "10.25 u"),
        ],
        practice: [
          pr("Carbon-12 has Z = 6. How many neutrons?", 6, "Use A minus Z.", "Subtract the proton count from the mass number. 12-6 = 6."),
          pr("Silicon-29 has Z = 14. How many neutrons?", 15, "Its mass number is 29.", "Subtract fourteen protons. 29-14 = 15."),
          pr("An atom has 12 protons and 14 neutrons. What is its mass number?", 26, "Count both kinds of nuclear particles.", "Add protons and neutrons. 12+14 = 26."),
          pr("A model sample has equal numbers of atoms of masses 20 u and 22 u. Find the average mass, in u.", 21, "Equal numbers give equal weights.", "Half of each isotope mass contributes to the average. .5 × 20+.5 × 22 = 21 u."),
        ],
      },
      {
        title: "Outer electrons and simple shells",
        minutes: 20,
        explain: [
          "Valence electrons occupy the outermost occupied shell of a main-group atom. These electrons take part most directly in bonding. The inner electrons are often called core electrons.",
          "For the first eighteen neutral atoms, a useful shell picture fills 2 electrons in the first shell and up to 8 in the second, then the third. This is a simplified picture; later we will meet orbitals.",
          "Silicon has four outer electrons and commonly shares electrons with four neighbours. A full outer shell helps explain the low reactivity of noble gases. The octet rule is a useful guide, with exceptions."
        ],
        formulas: [
          [
            "Outer count",
            "N_{\\text{valence}}=N_e-N_{\\text{core}}"
          ]
        ],
        examples: [
          ex("Silicon has 14 electrons, with 2 and 8 in its inner shells. How many are in its outer shell?", [
            ["Subtract the ten core electrons.","14-2-8"],
            ["Evaluate and keep the requested unit.","= 4"],
          ], "4"),
          ex("Oxygen has 6 valence electrons. How many more complete an octet?", [
            ["Count the missing places in the outer shell.","8-6"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("Carbon has 6 electrons and 2 core electrons. How many valence electrons?", 4, "Subtract the core.", "Only the electrons beyond the first shell are outer electrons. 6-2 = 4."),
          pr("Sodium has 11 electrons and 10 core electrons. How many valence electrons?", 1, "Remove the two filled inner shells.", "Subtract the core count. 11-10 = 1."),
          pr("Chlorine has 17 electrons and 10 core electrons. How many more electrons complete its outer octet?", 1, "Find the outer count first.", "The outer count is seven, leaving one place. 8-(17-10) = 1."),
          pr("Four neutral silicon atoms each contribute 4 valence electrons. How many valence electrons are there altogether?", 16, "Multiply atoms by electrons per atom.", "Count four equal groups of four. 4 × 4 = 16."),
        ],
      },
      {
        title: "Charge balance in ceramic formulas",
        minutes: 20,
        explain: [
          "An ionic solid contains positive and negative ions held together by electrical attraction. Its formula gives the simplest whole-number ratio that makes the total charge zero.",
          "Magnesium commonly forms Mg²⁺ and oxygen forms O²⁻. One of each balances. Aluminium forms Al³⁺, so balancing it with oxide requires a different ratio.",
          "Charge balance is a first check on a proposed ceramic formula. It does not by itself prove a substance will form. Atom counts in a formula are separate from charges written above the symbols."
        ],
        formulas: [
          [
            "Neutral compound",
            "n_+q_+ + n_-q_-=0"
          ]
        ],
        examples: [
          ex("Two Al³⁺ ions are balanced by O²⁻ ions. How many oxide ions are required?", [
            ["Two aluminium ions supply six positive charge units.","\\frac{2\\times 3}{2}"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
          ex("A formula unit contains one Ca²⁺ and two Cl⁻ ions. What is its total charge number?", [
            ["The two negative charges cancel the calcium charge.","2-2\\times 1"],
            ["Evaluate and keep the requested unit.","= 0"],
          ], "0"),
        ],
        practice: [
          pr("One Mg²⁺ needs how many O²⁻ ions for neutrality?", 1, "Match equal opposite charges.", "One oxide cancels the magnesium charge. 2 ÷ 2 = 1."),
          pr("One Ca²⁺ needs how many Cl⁻ ions for neutrality?", 2, "Each chloride cancels one positive charge.", "Divide the calcium charge by the chloride charge magnitude. 2 ÷ 1 = 2."),
          pr("Three Mg²⁺ ions need how many N³⁻ ions for neutrality?", 2, "Balance six positive charges in groups of three.", "Divide the total positive charge by three. 3 × 2 ÷ 3 = 2."),
          pr("How many ions are represented in one formula unit of Al₂O₃?", 5, "Count both subscripts.", "There are two aluminium ions and three oxide ions. 2+3 = 5."),
        ],
      },
    ],
  },

  'chem-002': {
    predict: {
      "q": "The conversion scene turns iron density from g/cm³ into kg/m³. A kilogram is a bigger mass unit, yet which number should appear for 7.87 g/cm³?",
      "options": [
        "0.00787",
        "7.87",
        "78.7",
        "7870"
      ],
      "answer": 3,
      "reveal": "The number becomes 7870. A cubic metre contains a million cubic centimetres, which more than offsets converting grams to kilograms."
    },
    parts: [
      {
        title: "Conversion fractions that equal one",
        minutes: 20,
        explain: [
          "A measurement contains a number and a unit. Changing units changes the number while keeping the same physical amount. A conversion fraction uses two equal amounts, so multiplying by it changes no physical quantity.",
          "Put the unwanted unit on the opposite side of the fraction. Starting with grams, use kilograms over grams. The grams cancel and kilograms remain.",
          "Before calculating, check whether the number should grow or shrink. Measuring a fixed length in smaller units gives more of them."
        ],
        formulas: [
          [
            "Mass conversion",
            "m\\,(\\mathrm g)\\times\\frac{1\\,\\mathrm{kg}}{1000\\,\\mathrm g}"
          ]
        ],
        examples: [
          ex("Convert 2500 g to kg.", [
            ["Divide by the number of grams in a kilogram.","\\frac{2500}{1000}"],
            ["Evaluate and keep the requested unit.","= 2.5\\,\\mathrm{kg}"],
          ], "2.5 kg"),
          ex("Convert 3 m to cm.", [
            ["Multiply metres by centimetres per metre.","3\\times 100"],
            ["Evaluate and keep the requested unit.","= 300\\,\\mathrm{cm}"],
          ], "300 cm"),
        ],
        practice: [
          pr("Convert 8000 g to kg.", 8, "Place grams below grams.", "Divide by one thousand. 8000 ÷ 1000 = 8 kg."),
          pr("Convert 2.5 kg to g.", 2500, "A kilogram contains one thousand grams.", "Multiply by the conversion factor. 2.5 × 1000 = 2500 g."),
          pr("Convert 450 cm to m.", 4.5, "Use 1 m per 100 cm.", "Divide centimetres by one hundred. 450 ÷ 100 = 4.5 m."),
          pr("Convert 0.035 m to mm.", 35, "There are 1000 mm per metre.", "Multiply by one thousand. .035 × 1000 = 35 mm."),
        ],
      },
      {
        title: "Prefixes and units per unit",
        minutes: 20,
        explain: [
          "A prefix scales a unit. Kilo means a thousand; milli means a thousandth. Micro means a millionth and nano a billionth. The same prefix meaning applies to length, mass or force.",
          "A rate such as kilometres per hour has a unit on top and another below. Convert both. There are 1000 metres in a kilometre and 3600 seconds in an hour.",
          "Materials measurements span many sizes. A grain may be measured in micrometres, while atomic spacings are measured in nanometres. Keep the prefix with the unit throughout."
        ],
        formulas: [
          [
            "Speed conversion",
            "v\\,\\frac{\\mathrm{km}}{\\mathrm h}\\times\\frac{1000\\,\\mathrm m}{1\\,\\mathrm{km}}\\times\\frac{1\\,\\mathrm h}{3600\\,\\mathrm s}"
          ]
        ],
        examples: [
          ex("Convert 72 km/h to m/s.", [
            ["Multiply by metres per kilometre and divide by seconds per hour.","\\frac{72\\times 1000}{3600}"],
            ["Evaluate and keep the requested unit.","= 20\\,\\mathrm{m/s}"],
          ], "20 m/s"),
          ex("Convert 0.25 μm to nm.", [
            ["Multiply by nanometres per micrometre.","0.25\\times 1000"],
            ["Evaluate and keep the requested unit.","= 250\\,\\mathrm{nm}"],
          ], "250 nm"),
        ],
        practice: [
          pr("Convert 3 kN to N.", 3000, "Kilo means one thousand.", "Multiply by one thousand. 3 × 1000 = 3000 N."),
          pr("Convert 5000 nm to μm.", 5, "Use the ratio between nano and micro.", "Divide by one thousand. 5000 ÷ 1000 = 5 μm."),
          pr("Convert 15 m/s to km/h.", 54, "Convert metres to kilometres and seconds to hours.", "Multiply by seconds per hour, then divide by metres per kilometre. 15 × 3600 ÷ 1000 = 54 km/h."),
          pr("A coating grows at 120 nm/min. Convert this rate to μm/h.", 7.2, "Convert minutes to hours and nanometres to micrometres.", "Multiply by sixty minutes per hour and divide by one thousand. 120 × 60 ÷ 1000 = 7.2 μm/h."),
        ],
      },
      {
        title: "Area and volume conversion traps",
        minutes: 20,
        explain: [
          "An area contains two length factors. A square metre is a square with sides of 100 cm, so its area is 100 × 100 cm². You must convert both lengths.",
          "A volume contains three lengths. Converting each side of a metre cube gives 100 × 100 × 100 little centimetre cubes. Cubing a conversion factor matters as much as choosing its direction.",
          "One millilitre equals one cubic centimetre. A litre contains a thousand millilitres. These links let you compare a beaker reading with the dimensions of a solid sample."
        ],
        formulas: [
          [
            "Area",
            "1\\,\\mathrm{m^2}=100^2\\,\\mathrm{cm^2}"
          ],
          [
            "Volume",
            "1\\,\\mathrm{m^3}=100^3\\,\\mathrm{cm^3}"
          ]
        ],
        examples: [
          ex("Convert 2 m² to cm².", [
            ["Multiply by one hundred twice.","2\\times 100\\times 100"],
            ["Evaluate and keep the requested unit.","= 20000\\,\\mathrm{cm^2}"],
          ], "20000 cm²"),
          ex("Convert 0.003 m³ to litres.", [
            ["Multiply by litres per cubic metre.","0.003\\times 1000"],
            ["Evaluate and keep the requested unit.","= 3\\,\\mathrm{L}"],
          ], "3 L"),
        ],
        practice: [
          pr("Convert 1 m³ to cm³.", 1000000, "Convert all three sides.", "Multiply the three centimetre side lengths. 100 × 100 × 100 = 1000000 cm³."),
          pr("Convert 6 cm² to mm².", 600, "A centimetre contains ten millimetres.", "Use the factor ten for each of two lengths. 6 × 10 × 10 = 600 mm²."),
          pr("Convert 250 cm³ to litres.", 0.25, "A cubic centimetre is one millilitre.", "Divide millilitres by one thousand. 250 ÷ 1000 = 0.25 L.", {"tol":0.0025}),
          pr("A rectangular sample is 2 cm by 3 cm by 5 cm. Find its volume in mm³.", 30000, "Find cm³, then convert each of three lengths.", "Multiply the dimensions and then the cubic conversion factor. 2 × 3 × 5 × 1000 = 30000 mm³."),
        ],
      },
      {
        title: "Density and checking the final unit",
        minutes: 20,
        explain: [
          "Density is mass divided by volume. A density of 7.87 g/cm³ means each cubic centimetre has a mass of 7.87 g. This is a typical room-temperature value for iron.",
          "Converting density needs a mass conversion on top and a volume conversion below. Converting grams to kilograms divides by a thousand; converting the volume denominator from cm³ to m³ multiplies the numerical density by a million.",
          "A unit check also helps when finding mass or volume. Density times volume leaves mass. Mass divided by density leaves volume. Use matching volume units before combining them."
        ],
        formulas: [
          [
            "Density",
            "\\rho=\\frac{m}{V}"
          ],
          [
            "Conversion",
            "1\\,\\mathrm{g/cm^3}=1000\\,\\mathrm{kg/m^3}"
          ]
        ],
        examples: [
          ex("Convert iron density 7.87 g/cm³ to kg/m³.", [
            ["Divide for kilograms, then multiply for cubic metres.","\\frac{7.87}{1000}\\times 1000000"],
            ["Evaluate and keep the requested unit.","= 7870\\,\\mathrm{kg/m^3}"],
          ], "7870 kg/m³"),
          ex("A model ceramic has density 4 g/cm³ and volume 12 cm³. Find its mass in g.", [
            ["Multiply density by volume.","4\\times 12"],
            ["Evaluate and keep the requested unit.","= 48\\,\\mathrm{g}"],
          ], "48 g"),
        ],
        practice: [
          pr("Convert 2.7 g/cm³ to kg/m³.", 2700, "Use the combined density conversion.", "Multiply the numerical density by one thousand. 2.7 × 1000 = 2700 kg/m³."),
          pr("Convert 8900 kg/m³ to g/cm³.", 8.9, "Reverse the combined conversion.", "Divide by one thousand. 8900 ÷ 1000 = 8.9 g/cm³."),
          pr("A sample weighs 54 g and occupies 20 cm³. Find its density in g/cm³.", 2.7, "Use mass divided by volume.", "Divide the sample mass by its volume. 54 ÷ 20 = 2.7 g/cm³."),
          pr("A sample has mass 0.0787 kg and iron density 7.87 g/cm³. Find its volume in cm³.", 10, "Convert mass to grams first.", "Convert kilograms to grams and divide by density. .0787 × 1000 ÷ 7.87 = 10 cm³."),
        ],
      },
    ],
  },

  'chem-003': {
    predict: {
      "q": "In the rust reactor, oxygen comes in pairs but Fe₂O₃ uses oxygen in threes. What is the smallest number of O₂ molecules that can make a whole number of Fe₂O₃ units with no oxygen left over?",
      "options": [
        "1 molecule",
        "3 molecules",
        "2 molecules",
        "6 molecules"
      ],
      "answer": 1,
      "reveal": "Three oxygen molecules supply six oxygen atoms. Those fit exactly into two Fe₂O₃ units, which also need four iron atoms."
    },
    parts: [
      {
        title: "Counting with moles",
        minutes: 20,
        explain: [
          "A mole is a counting unit for tiny particles. One mole contains exactly 6.02214076 × 10²³ particles. We will use 6.022 × 10²³ for calculations here. Always say which particles you mean: atoms, molecules or formula units.",
          "Molar mass M is the mass of one mole, in g/mol. Divide a measured mass by M to find moles. Multiply moles by M to get grams. Different substances have different masses for the same number of particles.",
          "This lets a materials laboratory count atoms by weighing a powder. It is much easier to weigh an iron sample than to count its atoms individually."
        ],
        formulas: [
          [
            "Mass and amount",
            "n=\\frac{m}{M}"
          ],
          [
            "Particles",
            "N=nN_A"
          ]
        ],
        examples: [
          ex("How many moles are in 111.7 g of Fe? Use M = 55.85 g/mol.", [
            ["The mass contains this many molar-mass portions.","\\frac{111.7}{55.85}"],
            ["Evaluate and keep the requested unit.","= 2\\,\\mathrm{mol}"],
          ], "2 mol"),
          ex("How many atoms are in 0.25 mol Fe? Use Nₐ = 6.022 × 10²³ mol⁻¹.", [
            ["Multiply the amount by the number of atoms per mole.","0.25\\times 6.022\\times10^{23}"],
            ["Evaluate and keep the requested unit.","= 1.5055\\times10^{23}\\,\\mathrm{atoms}"],
          ], "1.5055e+23 atoms"),
        ],
        practice: [
          pr("Find the mass of 2 mol carbon using M = 12.01 g/mol, in g.", 24.02, "Multiply moles by molar mass.", "Each mole contributes the stated mass. 2 × 12.01 = 24.02 g."),
          pr("Find moles in 32 g O₂ using M = 32 g/mol.", 1, "Divide by molar mass.", "The mass equals one molar-mass portion. 32 ÷ 32 = 1 mol."),
          pr("How many molecules are in 0.5 mol water, in units of 10²³ molecules? Use Nₐ = 6.022 × 10²³ mol⁻¹.", 3.011, "Multiply moles by particles per mole.", "Take half of 6.022 because the answer is in units of 10²³ molecules. 0.5 × 6.022 = 3.011 × 10²³ molecules."),
          pr("Find the mass of 0.15 mol aluminium using M = 26.98 g/mol, in g.", 4.047, "Use mass = amount times molar mass.", "Multiply the two supplied values. .15 × 26.98 = 4.047 g."),
        ],
      },
      {
        title: "Reading formulas and balancing atoms",
        minutes: 20,
        explain: [
          "A small number after a symbol counts atoms of that element in one molecule or formula unit. In Fe₂O₃, each unit contains two iron atoms and three oxygen atoms. Add their molar-mass contributions to find the compound’s molar mass.",
          "A large number before a formula multiplies the entire formula. Balancing a reaction means choosing these front numbers so each element has the same atom count on both sides.",
          "Keep the small numbers inside each formula fixed. Changing them changes the substance. For iron oxide, matching the oxygen pairs to groups of three is the useful first move."
        ],
        formulas: [
          [
            "Molar mass",
            "M(\\mathrm{Fe_2O_3})=2M(\\mathrm{Fe})+3M(\\mathrm O)"
          ],
          [
            "Balanced reaction",
            "4\\mathrm{Fe}+3\\mathrm{O_2}\\rightarrow2\\mathrm{Fe_2O_3}"
          ]
        ],
        examples: [
          ex("Find M for Fe₂O₃ using Fe = 55.85 and O = 16.00 g/mol, in g/mol.", [
            ["Add the contribution of two iron atoms and three oxygen atoms.","2\\times 55.85+3\\times 16"],
            ["Evaluate and keep the requested unit.","= 159.7\\,\\mathrm{g/mol}"],
          ], "159.7 g/mol"),
          ex("How many oxygen atoms are represented by 3 O₂ molecules?", [
            ["Each molecule contains two oxygen atoms.","3\\times 2"],
            ["Evaluate and keep the requested unit.","= 6"],
          ], "6"),
        ],
        practice: [
          pr("How many hydrogen atoms are represented by 2 H₂O molecules?", 4, "Multiply the coefficient by the hydrogen subscript.", "Each water molecule contains two hydrogen atoms. 2 × 2 = 4."),
          pr("Find M for CO₂ using C = 12.01 and O = 16.00 g/mol, in g/mol.", 44.01, "There is one carbon and two oxygens.", "Add the three atomic contributions. 12.01+2 × 16 = 44.01 g/mol."),
          pr("In the smallest whole-number balance of Fe + O₂ → Fe₂O₃, what is the coefficient of Fe?", 4, "Two oxide units balance three oxygen molecules.", "Two Fe₂O₃ units require four Fe atoms. 2 × 2 = 4."),
          pr("In the smallest whole-number balance of Al + O₂ → Al₂O₃, what is the coefficient of O₂?", 3, "Make six oxygen atoms on each side.", "Two oxide units need six oxygen atoms, supplied in pairs. 2 × 3 ÷ 2 = 3."),
        ],
      },
      {
        title: "From reactant mass to product mass",
        minutes: 20,
        explain: [
          "A balanced equation is a recipe in particles and in moles. In the iron reaction, four moles of Fe consume three moles of O₂ and produce two moles of Fe₂O₃.",
          "Convert grams to moles first. Then multiply by the product coefficient divided by the reactant coefficient. Finally multiply by the product molar mass if grams are requested.",
          "These calculations assume the named reaction goes to completion and the other reactant is available in excess. Oxide is heavier than the iron it contains because oxygen joins it."
        ],
        formulas: [
          [
            "Reaction recipe",
            "n_B=n_A\\frac{\\nu_B}{\\nu_A}"
          ]
        ],
        examples: [
          ex("With excess O₂, 55.85 g Fe reacts by 4 Fe + 3 O₂ → 2 Fe₂O₃. Find oxide mass in g. Use M(Fe) = 55.85 and M(oxide) = 159.70 g/mol.", [
            ["Convert iron mass to amount.","n_{\\mathrm{Fe}}=\\frac{55.85}{55.85}=1\\,\\mathrm{mol}"],
            ["Use two moles of oxide for four moles of iron.","n_{\\mathrm{oxide}}=1\\times\\frac24=0.5\\,\\mathrm{mol}"],
            ["Convert oxide amount to mass.","m=0.5\\times 159.7=79.85\\,\\mathrm g"],
          ], "79.85 g"),
          ex("For that reaction, how many mol O₂ are needed for 2 mol Fe?", [
            ["Multiply the iron amount by three quarters.","\\frac{2\\times 3}{4}"],
            ["Evaluate and keep the requested unit.","= 1.5\\,\\mathrm{mol}"],
          ], "1.5 mol"),
        ],
        practice: [
          pr("For 4 Fe + 3 O₂ → 2 Fe₂O₃, how many mol oxide form from 8 mol Fe with excess oxygen?", 4, "Use two moles oxide per four moles iron.", "Multiply by the balanced ratio. 8 × 2 ÷ 4 = 4 mol."),
          pr("For the same reaction, how many mol Fe are needed for 3 mol oxide?", 6, "Reverse the iron-to-oxide ratio.", "Multiply oxide amount by two. 3 × 4 ÷ 2 = 6 mol."),
          pr("For the same reaction, find O₂ mass needed for 4 mol Fe, in g. Use M(O₂) = 32 g/mol.", 96, "Convert iron moles to oxygen moles first.", "Use the three-to-four ratio, then multiply by oxygen molar mass. 4 × 3 ÷ 4 × 32 = 96 g."),
          pr("For the same reaction, 111.7 g Fe forms oxide with excess O₂. Find oxide mass in g. Use M(Fe) = 55.85 and M(oxide) = 159.70 g/mol.", 159.7, "Convert grams before applying coefficients.", "Divide by iron molar mass, apply the ratio, then multiply by oxide molar mass. 111.7 ÷ 55.85 × 2 ÷ 4 × 159.7 = 159.7 g."),
        ],
      },
      {
        title: "Limiting amounts and yield",
        minutes: 20,
        explain: [
          "When neither reactant is guaranteed to be in excess, one may run out first. That is the limiting reactant. Calculate the product each starting amount could make and choose the smaller result.",
          "The theoretical yield is the product amount allowed by the balanced recipe. Actual yield may be smaller because of incomplete reaction or losses during collection. Percentage yield compares actual to theoretical.",
          "Ore processing and ceramic powder preparation use these checks to avoid wasting reactants. Leftover material must be counted separately from the product."
        ],
        formulas: [
          [
            "Limiting recipe",
            "n_{\\mathrm{oxide}}=\\min\\left(\\frac{n_{\\mathrm{Fe}}}{2},\\frac{2n_{\\mathrm{O_2}}}{3}\\right)"
          ],
          [
            "Yield",
            "\\%Y=100\\frac{m_{\\text{actual}}}{m_{\\text{theoretical}}}"
          ]
        ],
        examples: [
          ex("For 4 Fe + 3 O₂ → 2 Fe₂O₃, start with 4 mol Fe and 2 mol O₂. Find the maximum oxide amount in mol.", [
            ["Find how much oxide the iron could supply.","n_{\\mathrm{oxide,Fe}}=4\\times\\frac24=2\\,\\mathrm{mol}"],
            ["Find how much oxide the oxygen could supply.","n_{\\mathrm{oxide,O_2}}=2\\times\\frac23=1.333333\\,\\mathrm{mol}"],
            ["Choose the smaller amount: oxygen runs out first.","n_{\\mathrm{oxide}}=1.333333\\,\\mathrm{mol}"],
          ], "1.333333 mol"),
          ex("A process theoretically gives 80 g oxide but collects 60 g. Find percentage yield.", [
            ["Divide actual by theoretical and multiply by one hundred.","\\frac{60}{80}\\times 100"],
            ["Evaluate and keep the requested unit.","= 75\\,\\mathrm{\\%}"],
          ], "75 %"),
        ],
        practice: [
          pr("A theoretical yield is 50 g; actual yield is 40 g. Find percentage yield.", 80, "Actual goes on top.", "Divide and convert the fraction to a percentage. 40 ÷ 50 × 100 = 80 %."),
          pr("For 4 Fe + 3 O₂ → 2 Fe₂O₃, 8 mol Fe reacts with 3 mol O₂. Find maximum oxide amount in mol.", 2, "Calculate product from each supply.", "The oxygen supply permits fewer moles of product. min(8 ÷ 2, 3 × 2 ÷ 3) = 2 mol."),
          pr("For the same reaction, 8 mol Fe reacts with 3 mol O₂. How many mol Fe remain after completion?", 4, "Use oxygen to find the consumed iron.", "Subtract the iron used by all the oxygen from the starting iron. 8-3 × 4 ÷ 3 = 4 mol."),
          pr("The theoretical oxide yield is 120 g and percentage yield is 85%. Find collected mass in g.", 102, "Turn the percentage into a fraction.", "Multiply theoretical mass by the yield fraction. 120 × .85 = 102 g."),
        ],
      },
    ],
  },

  'chem-004': {
    predict: {
      "q": "In the periodic landscape, switch the bars from atomic number to atom size. Across period 3 from sodium towards chlorine, what happens to the bars?",
      "options": [
        "They rise steadily",
        "They generally fall",
        "They all become equal",
        "They disappear"
      ],
      "answer": 1,
      "reveal": "The size bars generally fall. More protons pull electrons in the same main shell closer, even though atomic number increases."
    },
    parts: [
      {
        title: "Reading rows and columns",
        minutes: 20,
        explain: [
          "The periodic table orders elements by atomic number, their proton count. A period is a row. A group is a column whose main-group members have similar outer-electron arrangements.",
          "For main-group atoms, the period gives the highest occupied main shell. Group 1 has one outer electron, group 2 has two, and groups 13 to 18 generally have three to eight. Helium has a full first shell with two.",
          "This layout lets you predict a missing neighbour’s chemistry. The historical scene leaves gaps for unknown elements; a gap is a place in a pattern, rather than an instruction to shift all later elements left."
        ],
        formulas: [
          [
            "Main-group outer count",
            "N_v=g-10\\quad(13\\le g\\le18,\\ \\text{except He})"
          ]
        ],
        examples: [
          ex("Silicon is in group 14. How many valence electrons does its neutral atom have?", [
            ["Apply the main-group rule.","14-10"],
            ["Evaluate and keep the requested unit.","= 4"],
          ], "4"),
          ex("Sodium is in period 3. How many main shells are occupied in its neutral atom?", [
            ["Sodium occupies shells one through three.","3"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
        ],
        practice: [
          pr("Magnesium is in group 2. How many valence electrons?", 2, "Group 2 gives its outer count directly.", "Magnesium has two outer electrons. 2 = 2."),
          pr("Chlorine is in group 17. How many valence electrons?", 7, "Use the main-group rule.", "Subtract ten from the group number. 17-10 = 7."),
          pr("Sulfur is in period 3 and group 16. How many valence electrons?", 6, "Use the column for the outer count.", "Subtract ten from sixteen. 16-10 = 6."),
          pr("Na has Z = 11 and Cl has Z = 17. How many increases of one atomic number separate them?", 6, "Subtract their atomic numbers.", "Count the steps from sodium to chlorine. 17-11 = 6."),
        ],
      },
      {
        title: "Why sizes and electron removal vary",
        minutes: 20,
        explain: [
          "Across much of a period, extra protons pull electrons in the same shell more strongly. Atomic radius generally decreases. Down a group, new occupied shells usually make atoms larger.",
          "Ionisation energy is the energy needed to remove an electron from a gas-phase atom. It generally increases across a period and decreases down a group, with exceptions caused by electron arrangements.",
          "Radius depends on how it is defined, so compare values from one consistent table. The landscape uses illustrative radii in picometres, written pm. Its broad pattern is more useful than treating every radius as an exact boundary."
        ],
        formulas: [
          [
            "Size comparison",
            "\\text{size ratio}=\\frac{r_{\\text{larger}}}{r_{\\text{smaller}}}"
          ]
        ],
        examples: [
          ex("Use the scene radii Na = 180 pm and Cl = 100 pm. How much larger is the sodium radius, in pm?", [
            ["Subtract the chlorine radius from the sodium radius.","180-100"],
            ["Evaluate and keep the requested unit.","= 80\\,\\mathrm{pm}"],
          ], "80 pm"),
          ex("Using scene radii K = 220 pm and Na = 180 pm, find r(K)/r(Na).", [
            ["Divide the two radii using matching units.","\\frac{220}{180}"],
            ["Evaluate and keep the requested unit.","= 1.222222"],
          ], "1.222222"),
        ],
        practice: [
          pr("Using scene radii Mg = 150 pm and Si = 110 pm, find their difference in pm.", 40, "Subtract the smaller radius.", "Compare the two scene values. 150-110 = 40 pm."),
          pr("Using scene radii Na = 180 pm and Cl = 100 pm, find r(Na)/r(Cl).", 1.8, "Use the same radius definition for both.", "Divide sodium radius by chlorine radius. 180 ÷ 100 = 1.8."),
          pr("A supplied pair of gas-phase ionisation energies is 500 and 740 kJ/mol. Find the extra energy needed for the second, in kJ/mol.", 240, "Compare removal energies by subtraction.", "Subtract the lower removal energy from the higher. 740-500 = 240 kJ/mol."),
          pr("A model atom has radius 150 pm; its positive ion has radius 100 pm. Find the radius decrease as a percentage of the atom radius.", 33.33333333333333, "Divide the decrease by the original radius.", "Find the decrease, then express it as a fraction of the original. (150-100) ÷ 150 × 100 = 33.33333 %."),
        ],
      },
      {
        title: "Electron attraction and likely bonds",
        minutes: 20,
        explain: [
          "Electronegativity describes how strongly a bonded atom attracts shared electrons. It is a relative scale without units. Fluorine is near the top; many metals have lower values.",
          "Find the difference between two values to estimate how unevenly they share electrons. A small difference suggests fairly even sharing. A larger difference suggests more polar sharing or strong ionic character.",
          "There is no sharp universal boundary that sorts every bond. A material’s structure also matters. Silicon is a useful covalent solid; sodium chloride is a useful example of an ionic solid."
        ],
        formulas: [
          [
            "Electronegativity gap",
            "\\Delta\\chi=|\\chi_A-\\chi_B|"
          ]
        ],
        examples: [
          ex("Using Na = 0.93 and Cl = 3.16, find the electronegativity difference.", [
            ["Subtract the smaller electron-attraction value.","3.16-0.93"],
            ["Evaluate and keep the requested unit.","= 2.23"],
          ], "2.23"),
          ex("Using Si = 1.90 and O = 3.44, find their electronegativity difference.", [
            ["Subtract silicon’s value from oxygen’s.","3.44-1.9"],
            ["Evaluate and keep the requested unit.","= 1.54"],
          ], "1.54"),
        ],
        practice: [
          pr("Two carbon atoms both have electronegativity 2.55. Find their difference.", 0, "Equal values give equal sharing in this comparison.", "Subtract the identical values. 2.55-2.55 = 0.", {"tol":1e-8}),
          pr("Using H = 2.20 and Cl = 3.16, find the difference.", 0.96, "Subtract the smaller value.", "Compare the two supplied values. 3.16-2.20 = 0.96."),
          pr("Using Mg = 1.31 and O = 3.44, find the difference.", 2.13, "Oxygen attracts more strongly.", "Subtract magnesium’s value from oxygen’s. 3.44-1.31 = 2.13."),
          pr("Using Si = 1.90, O = 3.44, Na = 0.93 and Cl = 3.16, by how much is the Na–Cl gap greater than the Si–O gap?", 0.69, "Calculate each gap first.", "Subtract the silicon–oxygen gap from the sodium–chlorine gap. (3.16-.93)-(3.44-1.90) = 0.69."),
        ],
      },
      {
        title: "Neighbours as materials clues",
        minutes: 20,
        explain: [
          "Elements in one main group often form similar compounds because their valence counts match. Oxygen and sulfur are in group 16. Silicon and germanium are in group 14 and both are useful semiconductors.",
          "A substitution can change an electron count. In a simple silicon bonding picture, a phosphorus atom brings one more valence electron than silicon, while boron brings one fewer. Small additions can change electrical behaviour.",
          "These are clues rather than guarantees about every material. A semiconductor also needs the right crystal and electron energies. Counting valence electrons is a helpful first step."
        ],
        formulas: [
          [
            "Valence change",
            "\\Delta N_v=N_{v,\\text{substitute}}-N_{v,\\text{host}}"
          ]
        ],
        examples: [
          ex("Phosphorus contributes 5 valence electrons where silicon contributes 4. What is the change per substituted atom?", [
            ["Subtract the silicon contribution.","5-4"],
            ["Evaluate and keep the requested unit.","= 1"],
          ], "1"),
          ex("Boron contributes 3 valence electrons where silicon contributes 4. What is the change per substituted atom?", [
            ["Subtract the silicon contribution from boron’s.","3-4"],
            ["Evaluate and keep the requested unit.","= -1"],
          ], "-1"),
        ],
        practice: [
          pr("Germanium is in group 14. How many valence electrons does it have?", 4, "Use the main-group outer-count rule.", "Subtract ten from the group number. 14-10 = 4."),
          pr("Ten phosphorus atoms replace ten silicon atoms. How many extra valence electrons do they supply in the simple counting model?", 10, "Find the difference per substitution.", "Multiply the per-atom difference by the number replaced. 10 × (5-4) = 10."),
          pr("Ten boron atoms replace ten silicon atoms. How many valence electrons are missing compared with the original silicon atoms?", 10, "The question asks for the size of the shortage.", "Multiply the one-electron shortage by the number replaced. 10 × (4-3) = 10."),
          pr("A model region has 8 phosphorus substitutions and 3 boron substitutions in silicon. Find the net excess valence-electron count.", 5, "Add excesses and shortages with their signs.", "Subtract the boron shortages from the phosphorus extras. 8 × (5-4)+3 × (3-4) = 5."),
        ],
      },
    ],
  },

  'chem-005': {
    predict: {
      "q": "Choose iron in the electron-cloud scene. Its six 3d electrons have five orbitals available. After spreading out before pairing, how many electrons remain unpaired?",
      "options": [
        "0 electrons",
        "2 electrons",
        "6 electrons",
        "4 electrons"
      ],
      "answer": 3,
      "reveal": "Four remain unpaired. Five electrons first occupy separate orbitals; the sixth pairs with one of them."
    },
    parts: [
      {
        title: "Clouds rather than tiny tracks",
        minutes: 20,
        explain: [
          "An orbital describes where an electron is likely to be found. Its cloud is a probability picture. The many dots in the animation show possible findings across many measurements; they are not thousands of electrons in one atom.",
          "An s orbital is spherical. A p orbital has two lobes separated by a plane where its probability is zero. Most d orbitals have four lobes, while the d orbital along the z direction has two lobes and a ring.",
          "The cloud’s colours mark opposite signs of the electron wave. They do not mark opposite electric charges. Squaring either sign gives a positive contribution to probability."
        ],
        formulas: [
          [
            "Probability weight",
            "P\\propto|\\psi|^2"
          ]
        ],
        examples: [
          ex("At two equal small regions, wave amplitudes are 2 and 1 in the same arbitrary units. What is the ratio of their probability weights?", [
            ["Probability weight is proportional to amplitude squared.","\\frac{\\left(2\\right)^{2}}{\\left(1\\right)^{2}}"],
            ["Evaluate and keep the requested unit.","= 4"],
          ], "4"),
          ex("A normalised probability map assigns 0.35 to one region and 0.65 to the rest. What percentage is in the first region?", [
            ["Multiply the region’s probability by one hundred.","0.35\\times 100"],
            ["Evaluate and keep the requested unit.","= 35\\,\\mathrm{\\%}"],
          ], "35 %"),
        ],
        practice: [
          pr("How many lobes does one p orbital have?", 2, "Picture the two sides of the dumbbell.", "The two lobes belong to one orbital. 2 = 2."),
          pr("A wave amplitude is −3 in arbitrary units. What is its squared probability weight?", 9, "Squaring removes the sign.", "Multiply the amplitude by itself. (−3)² = 9."),
          pr("A normalised map has probability 0.8 inside a chosen region. What probability remains outside?", 0.19999999999999996, "All probabilities together total one.", "Subtract the inside probability from the total. 1-.8 = 0.2.", {"tol":0.0019999999999999996}),
          pr("Two equal small regions have amplitudes −2 and +2. Find the ratio of their probability weights.", 1, "Both signs must be squared.", "The squared magnitudes are equal. (−2)² ÷ 2² = 1."),
        ],
      },
      {
        title: "Shells, subshells and capacity",
        minutes: 20,
        explain: [
          "The main shell number n labels a family of allowed states. Within a shell are subshells named s, p, d and f. They contain one, three, five and seven orbitals respectively.",
          "Each orbital holds at most two electrons, with opposite spins. Spin is an electron property, represented by up and down arrows; it is not a little ball visibly turning.",
          "A shell contains n² orbitals and can hold 2n² electrons. Capacity tells you how many could fit. It does not tell you the order in which different shells fill."
        ],
        formulas: [
          [
            "Subshell capacity",
            "N_{\\max}=2N_{\\text{orbitals}}"
          ],
          [
            "Shell capacity",
            "N_{\\max}=2n^2"
          ]
        ],
        examples: [
          ex("A d subshell has five orbitals. How many electrons can it hold?", [
            ["Multiply the orbital count by two.","2\\times 5"],
            ["Evaluate and keep the requested unit.","= 10"],
          ], "10"),
          ex("Find the maximum electron capacity of shell n = 3.", [
            ["Use the shell capacity rule.","2\\times \\left(3\\right)^{2}"],
            ["Evaluate and keep the requested unit.","= 18"],
          ], "18"),
        ],
        practice: [
          pr("An s subshell has one orbital. Find its electron capacity.", 2, "Use two per orbital.", "Double the orbital count. 2 × 1 = 2."),
          pr("A p subshell has three orbitals. Find its electron capacity.", 6, "Each orbital has room for a pair.", "Multiply three orbitals by two electrons. 2 × 3 = 6."),
          pr("An f subshell has seven orbitals. Find its electron capacity.", 14, "Use the same capacity rule.", "Multiply the number of orbitals by two. 2 × 7 = 14."),
          pr("Shell n = 4 can hold how many electrons at most?", 32, "Use 2n² rather than 2n.", "Square four and double. 2 × 4² = 32."),
        ],
      },
      {
        title: "Filling configurations and forming ions",
        minutes: 20,
        explain: [
          "Electrons occupy the lowest available energies first. For the early neutral atoms, use 1s, 2s, 2p, 3s, 3p, 4s, then 3d. A superscript counts the electrons in that subshell.",
          "The order has exceptions. Neutral chromium has 3d⁵4s¹ and copper has 3d¹⁰4s¹ outside the argon core. Use measured configurations for these atoms rather than forcing a simple pattern.",
          "When transition metals form positive ions, remove the outer 4s electrons before 3d electrons. Iron’s neutral arrangement outside argon is 3d⁶4s²; Fe²⁺ keeps 3d⁶. Electron counts help explain ions in ceramic pigments and magnetic materials."
        ],
        formulas: [
          [
            "Total count",
            "N_e=\\sum\\text{subshell occupancies}"
          ],
          [
            "Ion count",
            "N_e(\\mathrm{X}^{q+})=Z-q"
          ]
        ],
        examples: [
          ex("Silicon has 14 electrons. After 1s²2s²2p⁶3s², how many occupy 3p?", [
            ["Count the filled inner subshells and 3s first.","14-\\left(2+2+6+2\\right)"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
          ex("Neutral iron is [Ar]3d⁶4s². How many 3d electrons remain in Fe³⁺?", [
            ["After removing 4s², remove one more electron from 3d.","6-\\left(3-2\\right)"],
            ["Evaluate and keep the requested unit.","= 5"],
          ], "5"),
        ],
        practice: [
          pr("How many electrons are represented by 1s²2s²2p⁶?", 10, "Add the superscripts.", "Each superscript counts electrons in its subshell. 2+2+6 = 10."),
          pr("Neutral aluminium has 13 electrons. After a 10-electron core and 3s², how many occupy 3p?", 1, "Subtract the occupied lower levels.", "Remove core and 3s electrons from the total. 13-10-2 = 1."),
          pr("Neutral copper has 29 electrons, with an 18-electron core and 3d¹⁰. How many are in 4s?", 1, "Copper is a filling-order exception.", "Subtract the core and filled d subshell. 29-18-10 = 1."),
          pr("Fe²⁺ has Z = 26. How many total electrons does it have?", 24, "A positive charge means electrons were removed.", "Remove two electrons from the neutral count. 26-2 = 24."),
        ],
      },
      {
        title: "Pairing and magnetic clues",
        minutes: 20,
        explain: [
          "Within equal-energy orbitals of one subshell, electrons occupy separate orbitals before pairing. This is Hund’s rule. Draw one arrow in each place, then add opposite arrows for the extra electrons.",
          "An unpaired electron contributes a magnetic moment. An isolated atom or ion with unpaired electrons is attracted to a magnetic field. Whether a whole solid is strongly magnetic also depends on how neighbouring moments interact.",
          "Iron’s unpaired d electrons are a clue to its magnetism. Counting them alone does not prove ferromagnetism. For the following counts, use isolated atoms or free ions with the stated subshell arrangement."
        ],
        formulas: [
          [
            "Unpaired count in one subshell",
            "u=\\begin{cases}e,&e\\le m\\\\2m-e,&m<e\\le2m\\end{cases}"
          ]
        ],
        examples: [
          ex("A free ion has d⁶. With five equal-energy d orbitals, how many electrons are unpaired?", [
            ["One pair leaves four singly occupied orbitals.","2\\times 5-6"],
            ["Evaluate and keep the requested unit.","= 4"],
          ], "4"),
          ex("An atom has p⁴. With three equal-energy p orbitals, how many electrons are unpaired?", [
            ["One orbital is paired and two remain singly occupied.","2\\times 3-4"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("For p² in three equal-energy orbitals, how many electrons are unpaired?", 2, "Place each electron in a different orbital.", "Both electrons remain single. 2 = 2."),
          pr("For p⁶ in three equal-energy orbitals, how many electrons are unpaired?", 0, "All three orbitals are full.", "Each electron has a partner. 2 × 3-6 = 0.", {"tol":1e-8}),
          pr("For d⁵ in five equal-energy orbitals, how many electrons are unpaired?", 5, "Fill singly first.", "Each of five orbitals contains one electron. 5 = 5."),
          pr("For d⁸ in five equal-energy orbitals, how many electrons are unpaired?", 2, "Five singles come first, then three pairs form.", "Three pairs leave two singly occupied orbitals. 2 × 5-8 = 2."),
        ],
      },
    ],
  },

  'chem-006': {
    predict: {
      "q": "In the gas cylinder, keep the amount of gas fixed. You halve its volume and double its kelvin temperature. What happens to the pressure?",
      "options": [
        "Pressure rises fourfold",
        "It becomes twice as large",
        "It stays at its starting value",
        "It becomes half as large"
      ],
      "answer": 0,
      "reveal": "The pressure becomes four times as large. Halving the volume doubles it, and doubling the kelvin temperature doubles it again."
    },
    parts: [
      {
        title: "Pressure and Boyle’s law",
        minutes: 20,
        explain: [
          "Gas pressure comes from particles colliding with the container walls. Pressure is force per area, measured in pascals, Pa. A kilopascal is a thousand pascals.",
          "At fixed temperature and amount, squeezing a gas increases pressure. Pressure times volume stays constant for an ideal gas. Use absolute pressure, measured from vacuum, rather than pressure above the surrounding air.",
          "Real gases are closest to this simple rule at low pressure and away from condensation. Treat the examples as ideal gases. Let the gas return to the stated temperature after squeezing it."
        ],
        formulas: [
          [
            "Boyle’s law",
            "P_1V_1=P_2V_2"
          ]
        ],
        examples: [
          ex("An ideal gas at 100 kPa fills 3 L. At fixed temperature and amount it is squeezed to 1 L. Find absolute pressure in kPa.", [
            ["Divide the starting pressure–volume product by final volume.","\\frac{100\\times 3}{1}"],
            ["Evaluate and keep the requested unit.","= 300\\,\\mathrm{kPa}"],
          ], "300 kPa"),
          ex("An ideal gas at 200 kPa fills 2 L. At fixed temperature and amount, what volume does it occupy at 100 kPa, in L?", [
            ["Divide the constant pressure–volume product by final pressure.","\\frac{200\\times 2}{100}"],
            ["Evaluate and keep the requested unit.","= 4\\,\\mathrm{L}"],
          ], "4 L"),
        ],
        practice: [
          pr("At fixed temperature and amount, an ideal gas goes from 4 L at 80 kPa to 2 L. Find absolute pressure in kPa.", 160, "Use P₁V₁ = P₂V₂.", "Divide the initial pressure–volume product by the final volume. 80 × 4 ÷ 2 = 160 kPa."),
          pr("An ideal gas at 120 kPa occupies 5 L. At fixed temperature and amount it expands to 10 L. Find pressure in kPa.", 60, "The larger volume lowers pressure.", "Use the inverse pressure–volume relation. 120 × 5 ÷ 10 = 60 kPa."),
          pr("At fixed temperature and amount, 1.5 L of ideal gas at 300 kPa expands to 150 kPa. Find volume in L.", 3, "Solve for the unknown volume.", "Divide P₁V₁ by P₂. 300 × 1.5 ÷ 150 = 3 L."),
          pr("A tank gauge reads 150 kPa above air pressure of 100 kPa. Find absolute pressure in kPa.", 250, "The gas law needs pressure above vacuum.", "Add atmospheric pressure to the gauge reading. 150+100 = 250 kPa."),
        ],
      },
      {
        title: "Temperature must start at absolute zero",
        minutes: 20,
        explain: [
          "Kelvin temperature measures from absolute zero. Convert Celsius by adding 273.15. A change of one kelvin has the same size as a change of one Celsius degree, but their zero points differ.",
          "At fixed pressure and amount, an ideal gas expands in proportion to kelvin temperature. At fixed volume and amount, its pressure rises in proportion to kelvin temperature.",
          "A sealed rigid tank changes pressure when heated. A freely moving piston can instead change volume at constant external pressure. Decide which condition applies before choosing the relation."
        ],
        formulas: [
          [
            "Temperature",
            "T(\\mathrm K)=T({}^\\circ\\mathrm C)+273.15"
          ],
          [
            "Thermal ratios",
            "\\frac{V_1}{T_1}=\\frac{V_2}{T_2}\\ (P,n\\text{ fixed}),\\quad\\frac{P_1}{T_1}=\\frac{P_2}{T_2}\\ (V,n\\text{ fixed})"
          ]
        ],
        examples: [
          ex("Convert 25 °C to K.", [
            ["Add the Celsius-to-kelvin offset.","25+273.15"],
            ["Evaluate and keep the requested unit.","= 298.15\\,\\mathrm{K}"],
          ], "298.15 K"),
          ex("A fixed amount of ideal gas fills 2 L at 300 K. It warms to 450 K at constant pressure. Find volume in L.", [
            ["Multiply the old volume by the temperature ratio.","\\frac{2\\times 450}{300}"],
            ["Evaluate and keep the requested unit.","= 3\\,\\mathrm{L}"],
          ], "3 L"),
        ],
        practice: [
          pr("Convert 0 °C to K.", 273.15, "Add the temperature offset.", "Use the Celsius-to-kelvin conversion. 0+273.15 = 273.15 K."),
          pr("A sealed rigid ideal-gas tank is at 100 kPa and 300 K. Find pressure at 600 K, in kPa.", 200, "Volume and amount stay fixed.", "Scale pressure by the kelvin temperature ratio. 100 × 600 ÷ 300 = 200 kPa."),
          pr("At constant pressure, a fixed amount of ideal gas cools from 400 K to 300 K. Its starting volume is 4 L. Find final volume in L.", 3, "Use the final-to-initial temperature ratio.", "Multiply starting volume by the temperature ratio. 4 × 300 ÷ 400 = 3 L."),
          pr("A sealed rigid ideal-gas tank is at 200 kPa and 26.85 °C. It reaches 126.85 °C. Find final pressure in kPa.", 266.6666666666667, "Convert both temperatures to kelvin first.", "Scale pressure using the two absolute temperatures. 200 × (126.85+273.15) ÷ (26.85+273.15) = 266.6667 kPa."),
        ],
      },
      {
        title: "The ideal gas equation",
        minutes: 20,
        explain: [
          "Pressure, volume, amount and temperature fit together as PV = nRT. The constant R links the units. Use R = 8.314 kPa·L/(mol·K) when pressure is in kPa and volume is in L.",
          "The same numerical R works with Pa and m³. Do not mix kPa with m³ without converting. Rearrange the equation so the quantity you want stands alone.",
          "Shielding gases used in welding can be estimated this way at modest pressures. Highly compressed cylinders need corrections for real-gas behaviour; the ideal rule is an estimate there."
        ],
        formulas: [
          [
            "Ideal gas",
            "PV=nRT"
          ],
          [
            "Amount",
            "n=\\frac{PV}{RT}"
          ]
        ],
        examples: [
          ex("An ideal gas has n = 0.1 mol, T = 300 K and V = 2.5 L. Find pressure in kPa using R = 8.314 kPa·L/(mol·K).", [
            ["Multiply amount, gas constant and temperature, then divide by volume.","\\frac{0.1\\times 8.314\\times 300}{2.5}"],
            ["Evaluate and keep the requested unit.","= 99.768\\,\\mathrm{kPa}"],
          ], "99.768 kPa"),
          ex("Find ideal-gas amount in 10 L at 100 kPa and 300 K, in mol. Use R = 8.314 kPa·L/(mol·K).", [
            ["Divide the pressure–volume product by RT.","\\frac{100\\times 10}{8.314\\times 300}"],
            ["Evaluate and keep the requested unit.","= 0.4009302\\,\\mathrm{mol}"],
          ], "0.4009302 mol"),
        ],
        practice: [
          pr("Find pressure for 1 mol ideal gas at 300 K in 25 L, in kPa. Use R = 8.314.", 99.76799999999999, "Use kPa and litres with this R.", "Evaluate nRT divided by V. 1 × 8.314 × 300 ÷ 25 = 99.768 kPa."),
          pr("Find volume of 0.2 mol ideal gas at 300 K and 100 kPa, in L. Use R = 8.314.", 4.9884, "Use V = nRT/P.", "Divide the amount–temperature product times R by pressure. .2 × 8.314 × 300 ÷ 100 = 4.9884 L."),
          pr("Find T for 0.5 mol ideal gas at 200 kPa in 10 L, in K. Use R = 8.314.", 481.11618955977866, "Isolate T = PV/(nR).", "Divide pressure times volume by amount times R. 200 × 10 ÷ (.5 × 8.314) = 481.1162 K."),
          pr("A welding enclosure contains ideal argon at 100 kPa in 50 L at 300 K. Find argon mass in g using R = 8.314 and M = 39.95 g/mol.", 80.08579905380483, "Find moles before mass.", "Use PV/RT for amount, then multiply by molar mass. 100 × 50 ÷ (8.314 × 300) × 39.95 = 80.0858 g."),
        ],
      },
      {
        title: "Mixtures and particle motion",
        minutes: 20,
        explain: [
          "In an ideal gas mixture, each gas contributes a partial pressure. Add those contributions to find total pressure. Each partial pressure is its mole fraction times the total.",
          "A mole fraction is that gas’s amount divided by the total amount. This matters when setting furnace atmospheres: the oxygen partial pressure can matter more than the total gas pressure.",
          "At the same temperature, gases have the same average translational energy per molecule. Lighter molecules move faster on average. Their root-mean-square speed is proportional to the inverse square root of molar mass."
        ],
        formulas: [
          [
            "Partial pressures",
            "P_i=x_iP_{\\text{total}},\\quad x_i=\\frac{n_i}{n_{\\text{total}}}"
          ],
          [
            "Speed ratio at equal T",
            "\\frac{v_1}{v_2}=\\sqrt{\\frac{M_2}{M_1}}"
          ]
        ],
        examples: [
          ex("A mixture has 0.2 mol O₂ and 0.8 mol N₂ at total pressure 100 kPa. Find oxygen partial pressure in kPa.", [
            ["Multiply oxygen mole fraction by total pressure.","\\frac{0.2}{0.2+0.8}\\times 100"],
            ["Evaluate and keep the requested unit.","= 20\\,\\mathrm{kPa}"],
          ], "20 kPa"),
          ex("At equal temperature, compare gases of molar masses 4 and 16 g/mol. Find speed of the lighter gas divided by speed of the heavier gas.", [
            ["The lighter gas has the larger characteristic speed.","\\sqrt{\\frac{16}{4}}"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("Two ideal gases contribute 30 and 70 kPa. Find total pressure in kPa.", 100, "Add the partial pressures.", "Total pressure is their sum. 30+70 = 100 kPa."),
          pr("A gas is 0.25 mole fraction of an ideal mixture at 200 kPa. Find its partial pressure in kPa.", 50, "Multiply its fraction by total pressure.", "Take one quarter of the total pressure. .25 × 200 = 50 kPa."),
          pr("An ideal mixture has 2 mol argon and 3 mol nitrogen. Find argon mole fraction.", 0.4, "Divide argon moles by total moles.", "Add all moles for the denominator. 2 ÷ (2+3) = 0.4.", {"tol":0.004}),
          pr("A furnace gas at 120 kPa contains 0.03 mol oxygen and 0.97 mol inert gas. Find oxygen partial pressure in kPa.", 3.5999999999999996, "Use the oxygen mole fraction.", "Multiply the oxygen fraction by total pressure. .03 ÷ (.03+.97) × 120 = 3.6 kPa."),
        ],
      },
    ],
  },

  'chem-007': {
    predict: {
      "q": "The beaker contains 100 g potassium nitrate dissolved in 100 g water at 60 °C. Cool it to 20 °C, where only 32 g can dissolve. What should appear?",
      "options": [
        "All 100 g stays dissolved",
        "32 g of crystals appear",
        "68 g of crystals appear",
        "All 100 g becomes crystals"
      ],
      "answer": 2,
      "reveal": "About 68 g crystallises, leaving 32 g dissolved. Cooling reduces the solubility; the salt has not vanished or been destroyed."
    },
    parts: [
      {
        title: "Solubility and crystal recovery",
        minutes: 20,
        explain: [
          "A solution has a solute spread through a solvent. In the beaker, potassium nitrate is the solute and water is the solvent. Dissolved ions or molecules are still present even when you cannot see them.",
          "Solubility gives the most that dissolves at a stated temperature. The scene gives grams per 100 g water. A saturated solution has reached this limit; extra solid stays as crystals.",
          "Cooling a hot solution can recover a solid as crystals. Use the cold solubility to calculate what stays dissolved. Assume enough time for equilibrium and no water evaporating."
        ],
        formulas: [
          [
            "Capacity",
            "m_{\\text{capacity}}=s(T)\\frac{m_{\\text{water}}}{100\\,\\mathrm g}"
          ],
          [
            "Crystals",
            "m_{\\text{crystals}}=\\max(0,m_{\\text{solute}}-m_{\\text{capacity}})"
          ]
        ],
        examples: [
          ex("At 20 °C, solubility is 32 g per 100 g water. Add 50 g salt to 100 g water. Find undissolved mass in g.", [
            ["The excess over the solubility remains solid.","50-32"],
            ["Evaluate and keep the requested unit.","= 18\\,\\mathrm{g}"],
          ], "18 g"),
          ex("A hot solution holds 100 g salt in 100 g water. Cooling gives capacity 32 g. Find crystals recovered in g, with no evaporation.", [
            ["Subtract the dissolved mass from the original solute mass.","100-32"],
            ["Evaluate and keep the requested unit.","= 68\\,\\mathrm{g}"],
          ], "68 g"),
        ],
        practice: [
          pr("Solubility is 32 g per 100 g water. How much dissolves at most in 200 g water, in g?", 64, "Scale by the water mass.", "Double the capacity for twice the water. 32 × 200 ÷ 100 = 64 g."),
          pr("Solubility is 32 g per 100 g water. Add 20 g solute to 100 g water. How much is dissolved at equilibrium, in g?", 20, "Compare amount added with capacity.", "All the added solute fits below the limit. min(20, 32) = 20 g."),
          pr("Solubility is 32 g per 100 g water. Add 40 g solute to 50 g water. Find solid left at equilibrium in g.", 24, "Find capacity for the smaller water mass.", "Subtract the scaled dissolved capacity from the added mass. 40-32 × 50 ÷ 100 = 24 g."),
          pr("A solution holds 90 g solute in 200 g water. On cooling, solubility becomes 25 g per 100 g water. Find crystals formed in g, with no evaporation.", 40, "Find how much the cold water holds.", "Subtract cold capacity from starting dissolved mass. 90-25 × 200 ÷ 100 = 40 g."),
        ],
      },
      {
        title: "Molarity and preparing a solution",
        minutes: 20,
        explain: [
          "Molarity is moles of solute per litre of finished solution. Its unit is mol/L, often written M. The volume is the final solution volume, rather than the starting volume of water.",
          "To prepare a solution from a solid, find required moles by multiplying concentration by final volume. Multiply those moles by molar mass to find the mass to weigh.",
          "Dissolve the solid in some solvent, then add enough solvent to reach the final volume. Corrosion testing requires this care so results from different metal samples can be compared."
        ],
        formulas: [
          [
            "Concentration",
            "C=\\frac{n}{V}"
          ],
          [
            "Solid required",
            "m=CVM"
          ]
        ],
        examples: [
          ex("Dissolve 0.25 mol solute to make 0.5 L solution. Find molarity in mol/L.", [
            ["Use moles per litre.","\\frac{0.25}{0.5}"],
            ["Evaluate and keep the requested unit.","= 0.5\\,\\mathrm{mol/L}"],
          ], "0.5 mol/L"),
          ex("Prepare 0.250 L of 0.100 mol/L NaCl. Use M = 58.44 g/mol. Find mass in g.", [
            ["Find moles required for the finished solution.","n=CV=0.100\\times0.250=0.025\\,\\mathrm{mol}"],
            ["Convert that amount to the mass of salt.","m=nM=0.025\\times58.44=1.461\\,\\mathrm g"],
            ["Dissolve this mass, then add water to the final volume mark.","V_{\\text{solution}}=0.250\\,\\mathrm L"],
          ], "1.461 g"),
        ],
        practice: [
          pr("Find concentration of 0.1 mol in 2 L solution, in mol/L.", 0.05, "Use amount divided by volume.", "Divide moles by litres. .1 ÷ 2 = 0.05 mol/L.", {"tol":0.0005}),
          pr("How many mol are in 0.2 L of 0.5 mol/L solution?", 0.1, "Use n = CV.", "Multiply concentration by solution volume. .2 × .5 = 0.1 mol.", {"tol":0.001}),
          pr("A 5.844 g NaCl sample makes 0.5 L solution. Find concentration in mol/L using M = 58.44 g/mol.", 0.2, "Convert grams to moles first.", "Divide mass by molar mass and then by final volume. 5.844 ÷ 58.44 ÷ .5 = 0.2 mol/L.", {"tol":0.002}),
          pr("Prepare 0.1 L of 0.25 mol/L CuSO₄ using anhydrous CuSO₄, M = 159.61 g/mol. Find mass in g.", 3.9902500000000005, "The specified solid is anhydrous.", "Multiply final volume, concentration and the supplied molar mass. .1 × .25 × 159.61 = 3.99025 g."),
        ],
      },
      {
        title: "Dilution and mixing",
        minutes: 20,
        explain: [
          "Adding solvent lowers concentration without changing solute amount. The starting moles equal the final moles: C₁V₁ = C₂V₂. Use matching volume units on both sides.",
          "The dilution volume is the final volume. Taking a portion of concentrated solution and topping up to a mark is different from adding that whole final volume of water.",
          "When mixing solutions of the same solute without reaction, add their moles. Divide by final volume. The exercises below assume volumes add; real mixture volumes can differ slightly."
        ],
        formulas: [
          [
            "Dilution",
            "C_1V_1=C_2V_2"
          ],
          [
            "Mixing same solute",
            "C_f=\\frac{C_1V_1+C_2V_2}{V_1+V_2}"
          ]
        ],
        examples: [
          ex("Dilute 100 mL of 2 mol/L solution to a final 500 mL. Find concentration in mol/L.", [
            ["Divide the starting concentration–volume product by final volume.","\\frac{2\\times 100}{500}"],
            ["Evaluate and keep the requested unit.","= 0.4\\,\\mathrm{mol/L}"],
          ], "0.4 mol/L"),
          ex("Find the volume of 2 mol/L stock needed to prepare 250 mL of 0.1 mol/L solution, in mL.", [
            ["Divide final concentration times final volume by stock concentration.","\\frac{0.1\\times 250}{2}"],
            ["Evaluate and keep the requested unit.","= 12.5\\,\\mathrm{mL}"],
          ], "12.5 mL"),
        ],
        practice: [
          pr("Dilute 50 mL of 1 mol/L solution to 100 mL. Find concentration in mol/L.", 0.5, "The final volume doubles.", "Use the unchanged amount of solute. 1 × 50 ÷ 100 = 0.5 mol/L."),
          pr("Dilute 20 mL of 3 mol/L solution to 300 mL. Find concentration in mol/L.", 0.2, "Use C₁V₁/V₂.", "Divide the starting product by the finished volume. 3 × 20 ÷ 300 = 0.2 mol/L.", {"tol":0.002}),
          pr("Mix 0.1 L of 1 mol/L NaCl with 0.2 L of 0.25 mol/L NaCl. Assume additive volumes and no reaction. Find concentration in mol/L.", 0.5, "Add moles before dividing by total volume.", "Each solution contributes concentration times volume moles. (.1 × 1+.2 × .25) ÷ (.1+.2) = 0.5 mol/L."),
          pr("A 40 mL portion of 0.5 mol/L solution must become 0.08 mol/L. Find the required final volume in mL.", 250, "Solve for final volume rather than added water.", "Divide the unchanged concentration–volume product by target concentration. .5 × 40 ÷ .08 = 250 mL."),
        ],
      },
      {
        title: "Counting dissolved particles",
        minutes: 20,
        explain: [
          "Some solutes stay as molecules; others form ions. An ideal dilute NaCl solution gives nearly two dissolved particles per formula unit. For CaCl₂, the ideal count is three. Real concentrated solutions depart from these counts.",
          "Colligative effects depend on the number of dissolved particles. Molality b counts moles of solute per kilogram of solvent. It uses solvent mass, whereas molarity uses solution volume.",
          "For dilute aqueous solutions, freezing-point depression is approximately iKfb. Here i is the particle factor and Kf for water is 1.86 °C·kg/mol. This standard value is tabulated in OpenStax Chemistry 2e, section 11.4. The depression is a positive amount to subtract from the pure solvent’s freezing point.",
          "Gas dissolution has another rule: at fixed temperature in the dilute range, dissolved concentration is proportional to the gas’s partial pressure. That is why lowering pressure can release bubbles."
        ],
        formulas: [
          [
            "Molality",
            "b=\\frac{n_{\\text{solute}}}{m_{\\text{solvent}}(\\mathrm{kg})}"
          ],
          [
            "Freezing depression",
            "\\Delta T_f=iK_fb"
          ],
          [
            "Henry’s law",
            "C=k_HP"
          ]
        ],
        examples: [
          ex("Find molality of 0.2 mol sugar dissolved in 0.5 kg water, in mol/kg.", [
            ["Divide solute amount by solvent mass.","\\frac{0.2}{0.5}"],
            ["Evaluate and keep the requested unit.","= 0.4\\,\\mathrm{mol/kg}"],
          ], "0.4 mol/kg"),
          ex("For ideal dilute aqueous NaCl, use i = 2, Kf = 1.86 °C·kg/mol and b = 0.1 mol/kg. Find freezing-point depression in °C.", [
            ["Multiply particle factor, solvent constant and molality.","2\\times 1.86\\times 0.1"],
            ["Evaluate and keep the requested unit.","= 0.372\\,\\mathrm{{}^\\circ C}"],
          ], "0.372 °C"),
        ],
        practice: [
          pr("Assume complete dissociation. How many mol ions come from 0.1 mol NaCl?", 0.2, "Each formula unit gives two ions.", "Multiply amount of salt by the ideal particle factor. .1 × 2 = 0.2 mol.", {"tol":0.002}),
          pr("Assume complete dissociation. How many mol ions come from 0.2 mol CaCl₂?", 0.6000000000000001, "Count one calcium ion and two chloride ions.", "Multiply salt amount by three. .2 × 3 = 0.6 mol."),
          pr("For dilute aqueous sugar, i = 1, Kf = 1.86 °C·kg/mol and b = 0.25 mol/kg. Find freezing-point depression in °C.", 0.465, "Sugar remains as molecules.", "Use the particle factor of one. 1 × 1.86 × .25 = 0.465 °C.", {"tol":0.0046500000000000005}),
          pr("A gas has dissolved concentration 0.02 mol/L at partial pressure 100 kPa. At fixed temperature, Henry’s law applies. Find concentration at 250 kPa in mol/L.", 0.05, "Scale concentration by the pressure ratio.", "Multiply the original concentration by final pressure over initial pressure. .02 × 250 ÷ 100 = 0.05 mol/L.", {"tol":0.0005}),
        ],
      },
    ],
  },

  'chem-008': {
    predict: {
      "q": "In the collision scene, compare 300 K with 320 K while keeping the starting particle counts fixed. Which change explains why many more products form early?",
      "options": [
        "The particles themselves grow much larger",
        "More collisions clear the energy barrier",
        "Every collision becomes a successful one",
        "The original energy barrier disappears"
      ],
      "answer": 1,
      "reveal": "A larger fraction of collisions clears the energy barrier. The scene makes a modest temperature increase greatly increase collision success, while leaving many collisions unsuccessful."
    },
    parts: [
      {
        title: "Measuring disappearance and appearance",
        minutes: 20,
        explain: [
          "Reaction rate tells how quickly an amount changes. Concentration is often used so we can compare different vessel sizes. Square brackets, such as [A], mean concentration in mol/L.",
          "A reactant disappears, so its concentration change is negative. Put a minus sign before its change divided by time to quote a positive disappearance rate. Product appearance usually gives a positive change directly.",
          "Balanced coefficients connect the rates of different substances. If two units of A make one unit of B, A disappears twice as fast as B appears. Metal oxidation and coating growth can be followed this way."
        ],
        formulas: [
          [
            "Average disappearance",
            "v_A=\\frac{[A]_{\\text{start}}-[A]_{\\text{end}}}{\\Delta t}"
          ],
          [
            "Reaction 2A → B",
            "v_B=\\frac{v_A}{2}"
          ]
        ],
        examples: [
          ex("A falls from 0.8 to 0.5 mol/L in 10 s. Find average disappearance rate in mol/(L·s).", [
            ["Divide the concentration decrease by elapsed time.","\\frac{0.8-0.5}{10}"],
            ["Evaluate and keep the requested unit.","= 0.03\\,\\mathrm{mol/(L\\cdot s)}"],
          ], "0.03 mol/(L·s)"),
          ex("For 2 A → B, A disappears at 0.04 mol/(L·s). Find B appearance rate in mol/(L·s).", [
            ["Divide the A disappearance rate by its coefficient.","\\frac{0.04}{2}"],
            ["Evaluate and keep the requested unit.","= 0.02\\,\\mathrm{mol/(L\\cdot s)}"],
          ], "0.02 mol/(L·s)"),
        ],
        practice: [
          pr("A falls from 1 to 0.8 mol/L in 5 s. Find disappearance rate in mol/(L·s).", 0.039999999999999994, "Use initial minus final.", "Divide the positive decrease by five seconds. (1-.8) ÷ 5 = 0.04 mol/(L·s).", {"tol":0.00039999999999999996}),
          pr("B rises from 0.1 to 0.4 mol/L in 20 s. Find appearance rate in mol/(L·s).", 0.015000000000000003, "Use final minus initial for a product.", "Divide the concentration increase by time. (.4-.1) ÷ 20 = 0.015 mol/(L·s).", {"tol":0.00015000000000000004}),
          pr("For 2 A → B, B appears at 0.015 mol/(L·s). Find A disappearance rate in mol/(L·s).", 0.03, "Each B needs two A.", "Multiply product appearance by two. 2 × .015 = 0.03 mol/(L·s).", {"tol":0.0003}),
          pr("A falls by 0.24 mol/L at an average disappearance rate of 0.006 mol/(L·s). Find elapsed time in s.", 40, "Rearrange decrease divided by time.", "Divide the concentration loss by its average rate. .24 ÷ .006 = 40 s."),
        ],
      },
      {
        title: "Concentration and measured rate laws",
        minutes: 20,
        explain: [
          "Crowding more particles into the same space usually increases collision opportunities. A rate law describes how measured rate depends on concentrations. Its powers must come from experiments rather than from a balanced equation alone.",
          "For rate = k[A], doubling [A] doubles rate. For rate = k[A]², doubling [A] multiplies rate by four. A law k[A][B] depends on both concentrations.",
          "The constant k has units that make the rate units work. First-order k has units s⁻¹. A second-order law uses L/(mol·s). Compare experiments at the same temperature when finding concentration effects."
        ],
        formulas: [
          [
            "Rate laws",
            "v=k[A],\\qquad v=k[A]^2,\\qquad v=k[A][B]"
          ],
          [
            "Changing one concentration",
            "\\frac{v_2}{v_1}=\\left(\\frac{[A]_2}{[A]_1}\\right)^m"
          ]
        ],
        examples: [
          ex("For rate = k[A], k = 0.2 s⁻¹ and [A] = 0.5 mol/L. Find rate in mol/(L·s).", [
            ["Use the first-order rate law.","0.2\\times 0.5"],
            ["Evaluate and keep the requested unit.","= 0.1\\,\\mathrm{mol/(L\\cdot s)}"],
          ], "0.1 mol/(L·s)"),
          ex("For rate = k[A]², [A] triples at fixed temperature. By what factor does rate change?", [
            ["Square the factor of three.","\\left(3\\right)^{2}"],
            ["Evaluate and keep the requested unit.","= 9"],
          ], "9"),
        ],
        practice: [
          pr("For rate = k[A], [A] doubles. Find the rate multiplication factor.", 2, "The concentration power is one.", "Rate changes by the same factor as concentration. 2 = 2."),
          pr("For rate = k[A]², [A] halves. Find new rate divided by old rate.", 0.25, "Square the fraction remaining.", "Apply the second-order power. 0.5² = 0.25.", {"tol":0.0025}),
          pr("For rate = k[A][B], [A] doubles and [B] triples. Find the rate multiplication factor.", 6, "Multiply the two separate effects.", "Both concentration factors multiply the rate. 2 × 3 = 6."),
          pr("For rate = k[A]², rate is 0.08 mol/(L·s) when [A] = 0.2 mol/L. Find k in L/(mol·s).", 1.9999999999999996, "Divide rate by concentration squared.", "Isolate k from the measured rate law. 0.08 ÷ 0.2² = 2 L/(mol·s)."),
        ],
      },
      {
        title: "Half-lives and changing rate",
        minutes: 20,
        explain: [
          "A first-order reaction loses the same fraction in equal times. Its half-life is the time needed to halve the amount remaining. After each half-life, halve what is left rather than subtracting half the original amount.",
          "The concentration therefore falls in a smooth decay, steep at first and flatter later. The first-order rate constant k is related to half-life by ln(2)/k. The natural logarithm ln uses the base e; here ln(2) is approximately 0.693147.",
          "Half-life is constant only for first-order decay under fixed conditions. A different rate law can give a half-life that depends on the starting concentration. Check the measured law before using the shortcut."
        ],
        formulas: [
          [
            "Repeated halves",
            "[A]=[A]_0\\left(\\frac12\\right)^{t/t_{1/2}}"
          ],
          [
            "First-order half-life",
            "t_{1/2}=\\frac{\\ln2}{k}"
          ]
        ],
        examples: [
          ex("A first-order process starts at 0.8 mol/L. Find concentration after three half-lives in mol/L.", [
            ["Multiply the starting concentration by one eighth.","0.8\\times \\left(0.5\\right)^{3}"],
            ["Evaluate and keep the requested unit.","= 0.1\\,\\mathrm{mol/L}"],
          ], "0.1 mol/L"),
          ex("A first-order process has k = 0.02 s⁻¹. Find half-life in s using ln(2) = 0.693147.", [
            ["Use the first-order half-life relation.","\\frac{0.693147}{0.02}"],
            ["Evaluate and keep the requested unit.","= 34.65735\\,\\mathrm{s}"],
          ], "34.65735 s"),
        ],
        practice: [
          pr("A first-order process starts with 100 g. Find mass remaining after one half-life in g.", 50, "One half-life halves the current amount.", "Take half the initial mass. 100 × .5 = 50 g."),
          pr("A first-order process starts with 80 g. Find mass after two half-lives in g.", 20, "Halve twice.", "Take one quarter of the starting mass. 80 × (1 ÷ 2)² = 20 g."),
          pr("A first-order process has half-life 10 s. What percentage remains after 30 s?", 12.5, "Count how many half-lives have passed.", "Three half-lives leave one eighth of the start. 100 × (1 ÷ 2)³ = 12.5 %."),
          pr("A first-order process has half-life 20 s. Find k in s⁻¹ using ln(2) = 0.693147.", 0.034657349999999996, "Rearrange the half-life relation.", "Divide ln(2) by the half-life. .693147 ÷ 20 = 0.03465735 s⁻¹.", {"tol":0.0003465735}),
        ],
      },
      {
        title: "Energy barriers, catalysts and exposed area",
        minutes: 20,
        explain: [
          "A collision must have enough energy and a suitable orientation to react. The required barrier is called activation energy. Heating raises the fraction of particles able to cross it, often much more than it raises their average speed.",
          "A catalyst provides another route with a lower barrier. It is regenerated over the full reaction. It speeds approach to equilibrium in both directions without changing the equilibrium composition at a fixed temperature.",
          "For a solid reacting at its surface, smaller pieces expose more area. Powdered metal can react much faster than a block of the same mass. The examples use stated simple surface-rate assumptions rather than a universal rule for every solid."
        ],
        formulas: [
          [
            "Successful events",
            "N_{\\text{success}}=fN_{\\text{collisions}}"
          ],
          [
            "Same-volume cubes",
            "A_{\\text{total}}=6Na^2"
          ]
        ],
        examples: [
          ex("A model has 200 collisions each second and success fraction 0.12. Find expected successful events per second.", [
            ["Multiply collision frequency by success fraction.","200\\times 0.12"],
            ["Evaluate and keep the requested unit.","= 24\\,\\mathrm{s^{-1}}"],
          ], "24 s⁻¹"),
          ex("A 2 cm cube is divided into eight 1 cm cubes with all faces exposed. Find final total area divided by initial area.", [
            ["Find the area of the original six faces.","A_0=6\\times2^2=24\\,\\mathrm{cm^2}"],
            ["Add all faces of the eight separate small cubes.","A_1=8\\times6\\times1^2=48\\,\\mathrm{cm^2}"],
            ["Divide new area by old area.","\\frac{A_1}{A_0}=\\frac{48}{24}=2"],
          ], "2"),
        ],
        practice: [
          pr("A model has 100 collisions each second with success fraction 0.2. Find expected successes per second.", 20, "Multiply count by fraction.", "Take the successful share of all collisions. 100 × .2 = 20 s⁻¹."),
          pr("A model activation barrier falls from 80 to 50 kJ/mol with a catalyst. Find barrier reduction in kJ/mol.", 30, "Compare the two barrier heights.", "Subtract the new barrier from the old. 80-50 = 30 kJ/mol."),
          pr("A model surface reaction has rate proportional to exposed area. Area rises from 10 to 30 cm² at fixed conditions. Find the rate multiplication factor.", 3, "Use new area over old area.", "The assumed proportionality gives the same rate ratio. 30 ÷ 10 = 3."),
          pr("At 300 K a model has 200 collisions/s and success fraction 0.12. At a higher temperature it has 240 collisions/s and fraction 0.48. Find new successful-event rate divided by old rate.", 4.8, "Compute successful-event rate at each temperature.", "Compare the products of collision count and success fraction. (240 × .48) ÷ (200 × .12) = 4.8."),
        ],
      },
    ],
  },

  'chem-009': {
    predict: {
      "q": "Set K = 4 in the A ⇌ B scene and let it settle. Add 30 A particles, then wait again. Which description best fits the final state?",
      "options": [
        "The added A all stays as A",
        "Every A eventually becomes B",
        "The forward reaction stops",
        "B returns to about four times A"
      ],
      "answer": 3,
      "reveal": "The mixture returns to about four B for each A. Both directions keep running; adding A changes the amounts but does not change K at fixed temperature."
    },
    parts: [
      {
        title: "Balance while particles keep changing",
        minutes: 20,
        explain: [
          "A reversible reaction can run forwards and backwards. At first, starting with only A, forward change dominates. As B forms, more B can turn back into A.",
          "Equilibrium means the forward and backward rates are equal. The overall amounts stop drifting, even though individual particles keep changing. Equal rates do not require equal amounts.",
          "For the simple A ⇌ B scene, K is [B]/[A] at equilibrium. Particle counts fluctuate around the expected ratio. A small animated sample does not hold an exact ratio at every instant."
        ],
        formulas: [
          [
            "At equilibrium",
            "k_f[A]=k_b[B]"
          ],
          [
            "Simple ratio",
            "K=\\frac{[B]}{[A]}=\\frac{k_f}{k_b}"
          ]
        ],
        examples: [
          ex("For A ⇌ B, equilibrium [A] = 0.2 and [B] = 0.8 mol/L. Find K.", [
            ["Use the simple one-to-one equilibrium ratio.","\\frac{0.8}{0.2}"],
            ["Evaluate and keep the requested unit.","= 4"],
          ], "4"),
          ex("At equilibrium the forward rate is 0.03 mol/(L·s). Find the backward rate in mol/(L·s).", [
            ["The backward rate equals the forward rate.","0.03"],
            ["Evaluate and keep the requested unit.","= 0.03\\,\\mathrm{mol/(L\\cdot s)}"],
          ], "0.03 mol/(L·s)"),
        ],
        practice: [
          pr("For A ⇌ B, equilibrium [A] = 0.5 and [B] = 0.5 mol/L. Find K.", 1, "Compare equal concentrations.", "Divide B by A. .5 ÷ .5 = 1."),
          pr("For A ⇌ B, kf = 0.4 s⁻¹ and kb = 0.1 s⁻¹. Find K.", 4, "At balance, K equals the rate-constant ratio.", "Divide the forward constant by the backward constant. .4 ÷ .1 = 4."),
          pr("For A ⇌ B at equilibrium, K = 4 and [A] = 0.1 mol/L. Find [B] in mol/L.", 0.4, "Rearrange K = [B]/[A].", "Multiply A concentration by K. 4 × .1 = 0.4 mol/L.", {"tol":0.004}),
          pr("At equilibrium, 12 particles per second change A to B on average. How many change B to A per second on average?", 12, "A steady average needs equal traffic both ways.", "The average reverse count equals the average forward count. 12 = 12 s⁻¹."),
        ],
      },
      {
        title: "Writing K and comparing with Q",
        minutes: 20,
        explain: [
          "For a general reaction, multiply product concentrations and divide by reactant concentrations. Raise each concentration to its balanced coefficient. Pure solids and pure liquids are omitted because their activities stay effectively fixed.",
          "The rigorous equilibrium constant uses activities, which are unitless measures of chemical availability. At this level we approximate a dilute solute’s activity by its concentration divided by 1 mol/L. Use the supplied concentrations consistently.",
          "The reaction quotient Q uses current amounts in the same expression. If Q is below K, forward reaction increases the product share. If Q is above K, backward reaction reduces it. At equilibrium Q equals K."
        ],
        formulas: [
          [
            "Example expression",
            "A+2B\\rightleftharpoons C,\\quad K\\approx\\frac{[C]}{[A][B]^2}"
          ],
          [
            "Direction",
            "Q<K:\\ \\text{forward},\\qquad Q>K:\\ \\text{backward}"
          ]
        ],
        examples: [
          ex("For A + 2 B ⇌ C, equilibrium concentrations are A = 0.2, B = 0.5, C = 0.1 mol/L. Find the numerical K using concentrations relative to 1 mol/L.", [
            ["Divide product concentration by A times B squared.","\\frac{0.1}{0.2\\times \\left(0.5\\right)^{2}}"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
          ex("For A ⇌ B, current [B] = 0.6 and [A] = 0.2 mol/L. Find Q.", [
            ["Divide current B concentration by current A concentration.","\\frac{0.6}{0.2}"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
        ],
        practice: [
          pr("For A ⇌ B, current [B] = 0.2 and [A] = 0.4 mol/L. Find Q.", 0.5, "Put B on top.", "Use the current product-to-reactant ratio. .2 ÷ .4 = 0.5."),
          pr("For 2 A ⇌ B, equilibrium A = 0.5 and B = 0.25 mol/L. Find numerical K relative to 1 mol/L.", 1, "Square the reactant concentration.", "Divide B by A squared. 0.25 ÷ 0.5² = 1."),
          pr("For solid C + gas A ⇌ gas B, use gas activities A = 0.2 and B = 0.6. Find K.", 2.9999999999999996, "Omit the pure solid.", "Only the two gas activities enter the ratio. .6 ÷ .2 = 3."),
          pr("For A ⇌ B, Q = 0.5 and K = 2. Find Q/K.", 0.25, "Compare the current ratio with its target.", "Divide Q by K; a result below one signals forward change. .5 ÷ 2 = 0.25.", {"tol":0.0025}),
        ],
      },
      {
        title: "Finding the equilibrium amounts",
        minutes: 20,
        explain: [
          "Keep a record of starting amounts, reaction changes and final amounts. A one-to-one reaction A ⇌ B loses one A for each B gained. The total A plus B stays fixed in this simple closed system.",
          "At equilibrium B = KA. Substitute that into A + B = total, giving A = total/(1 + K). Then subtract A from the total to find B.",
          "For reactions with other coefficients, total particle count may change even though atoms are conserved. Follow the balanced recipe. Do not use the one-to-one total shortcut for every reaction."
        ],
        formulas: [
          [
            "One-to-one closed system",
            "[A]_{eq}=\\frac{C_{\\text{total}}}{1+K},\\qquad[B]_{eq}=\\frac{KC_{\\text{total}}}{1+K}"
          ]
        ],
        examples: [
          ex("For A ⇌ B, total concentration is 1 mol/L and K = 4. Find equilibrium [B] in mol/L.", [
            ["Multiply total concentration by K/(1 + K).","\\frac{4\\times 1}{1+4}"],
            ["Evaluate and keep the requested unit.","= 0.8\\,\\mathrm{mol/L}"],
          ], "0.8 mol/L"),
          ex("For A ⇌ B, total concentration is 0.6 mol/L and K = 0.5. Find equilibrium [A] in mol/L.", [
            ["Divide total concentration by one plus K.","\\frac{0.6}{1+0.5}"],
            ["Evaluate and keep the requested unit.","= 0.4\\,\\mathrm{mol/L}"],
          ], "0.4 mol/L"),
        ],
        practice: [
          pr("For A ⇌ B, total concentration is 2 mol/L and K = 1. Find equilibrium [A] in mol/L.", 1, "Equal ratio means equal shares.", "Divide total by one plus K. 2 ÷ (1+1) = 1 mol/L."),
          pr("For A ⇌ B, total concentration is 1 mol/L and K = 3. Find equilibrium [B] in mol/L.", 0.75, "There are three B portions per A portion.", "Take three quarters of the total. 3 ÷ (1+3) = 0.75 mol/L."),
          pr("A ⇌ B starts with [A] = 1 and [B] = 0 mol/L. Equilibrium [A] is 0.25 mol/L. Find concentration converted to B in mol/L.", 0.75, "Loss of A equals gain of B.", "Subtract final A from starting A. 1-.25 = 0.75 mol/L."),
          pr("A ⇌ B starts with [A] = 0.8 and [B] = 0.2 mol/L. At K = 4, find the net increase in [B] in mol/L.", 0.6000000000000001, "Find final B from the total, then subtract starting B.", "Use the equilibrium share and remove the B already present. 4 × (.8+.2) ÷ (1+4)-.2 = 0.6 mol/L."),
        ],
      },
      {
        title: "Disturbing equilibrium in a furnace",
        minutes: 20,
        explain: [
          "Adding reactant usually drives some forward reaction. Adding product usually drives some reverse reaction. The mixture moves until its ratio again matches K at the same temperature.",
          "Compressing a gas reaction favours the side with fewer gas particles when the gas counts differ. Heating favours the direction that absorbs heat. Temperature can change K; a catalyst only changes how quickly the balance is reached.",
          "A furnace can use a gas mixture to remove oxygen from an oxide. For FeO(s) + CO(g) ⇌ Fe(s) + CO₂(g), the gas ratio CO₂/CO decides the direction relative to K. Pure iron and pure FeO are omitted from that ratio."
        ],
        formulas: [
          [
            "Furnace quotient",
            "Q=\\frac{a_{\\mathrm{CO_2}}}{a_{\\mathrm{CO}}}"
          ],
          [
            "One-to-one particle share",
            "N_B=\\frac{K}{1+K}N_{\\text{total}}"
          ]
        ],
        examples: [
          ex("The scene has 60 A/B particles at K = 4. Add 30 A. Find the expected final B count after equilibration.", [
            ["Take the B equilibrium share of all ninety particles.","\\frac{4}{1+4}\\times \\left(60+30\\right)"],
            ["Evaluate and keep the requested unit.","= 72"],
          ], "72"),
          ex("For FeO(s) + CO(g) ⇌ Fe(s) + CO₂(g), gas activities are CO₂ = 0.2 and CO = 0.8. Find Q.", [
            ["Divide carbon dioxide activity by carbon monoxide activity.","\\frac{0.2}{0.8}"],
            ["Evaluate and keep the requested unit.","= 0.25"],
          ], "0.25"),
        ],
        practice: [
          pr("For N₂ + 3 H₂ ⇌ 2 NH₃, how many total gas molecules are on the reactant side of the written equation?", 4, "Count coefficients of the gases.", "Add the nitrogen and hydrogen molecule counts. 1+3 = 4."),
          pr("For the same equation, how many fewer gas molecules are on the product side than the reactant side?", 2, "Compare the two coefficient totals.", "Subtract the product gas count from the reactant gas count. (1+3)-2 = 2."),
          pr("For A ⇌ B at fixed temperature, K = 4. A catalyst doubles both rate constants. What is the new K?", 4, "K is a ratio of the two constants.", "The equal factors cancel in the ratio. 4 × 2 ÷ 2 = 4."),
          pr("A ⇌ B has total concentration 2 mol/L after an addition, with K = 4. Find equilibrium [A] in mol/L.", 0.4, "The new total still divides into one A portion and four B portions.", "Divide the new total by one plus K. 2 ÷ (1+4) = 0.4 mol/L.", {"tol":0.004}),
        ],
      },
    ],
  },

  'chem-010': {
    predict: {
      "q": "The pH scene asks for a solution with 1000 times the hydrogen-ion concentration of pure water at pH 7. Where should you put the slider?",
      "options": [
        "pH 3",
        "pH 10",
        "pH 4",
        "pH 6"
      ],
      "answer": 2,
      "reveal": "Put it at pH 4. Every step down multiplies hydrogen-ion concentration by ten, so three steps give a thousandfold increase."
    },
    parts: [
      {
        title: "Acids give and bases receive protons",
        minutes: 20,
        explain: [
          "A Brønsted–Lowry acid donates a proton, H⁺. A base accepts one. In water, the proton attaches to a water molecule to form H₃O⁺, often shortened to H⁺ in calculations.",
          "When an acid loses one proton, what remains is its conjugate base. When a base gains one, it becomes its conjugate acid. A conjugate pair differs by one H⁺ and one charge unit.",
          "An acid can have more than one proton to give, often in separate stages. State which stage or complete neutralisation is meant. Do not count every hydrogen atom in a formula as automatically acidic."
        ],
        formulas: [
          [
            "Conjugate pair",
            "\\mathrm{HA+H_2O\\rightleftharpoons H_3O^++A^-}"
          ],
          [
            "Charge after losing H⁺",
            "q_{\text{base}}=q_{\text{acid}}-1"
          ]
        ],
        examples: [
          ex("NH₄⁺ loses one H⁺ to form NH₃. What is the charge number of NH₃?", [
            ["Subtract the donated proton’s charge.","1-1"],
            ["Evaluate and keep the requested unit.","= 0"],
          ], "0"),
          ex("For complete neutralisation, 0.1 mol H₂SO₄ supplies two mol H⁺ per mol acid. How many mol OH⁻ are required?", [
            ["Multiply acid amount by its stated two-proton capacity.","0.1\\times 2"],
            ["Evaluate and keep the requested unit.","= 0.2\\,\\mathrm{mol}"],
          ], "0.2 mol"),
        ],
        practice: [
          pr("HCl gives away one proton per molecule. How many protons can 3 HCl molecules donate?", 3, "Use the stated capacity per molecule.", "Count one proton for each molecule. 3 × 1 = 3."),
          pr("NH₃ accepts one H⁺. What is the charge number of the NH₄⁺ formed?", 1, "Start with neutral ammonia.", "Add the proton’s positive charge. 0+1 = 1."),
          pr("HSO₄⁻ loses one H⁺ to form sulfate. What is the sulfate charge number?", -2, "Remove one positive charge from a negative ion.", "Subtract one from the starting charge number. -1-1 = -2."),
          pr("For complete neutralisation, 0.05 mol acid donates three protons per molecule. How many mol OH⁻ are needed?", 0.15000000000000002, "Use one hydroxide per proton.", "Multiply acid amount by the stated proton capacity. .05 × 3 = 0.15 mol.", {"tol":0.0015000000000000002}),
        ],
      },
      {
        title: "The pH scale and strong acids",
        minutes: 20,
        explain: [
          "pH is minus the base-ten logarithm of hydrogen-ion activity. In dilute solutions we approximate activity by the numerical concentration in mol/L. Thus concentration 10⁻³ mol/L gives pH 3.",
          "A step down by one pH unit means ten times more hydrogen ions. A two-step drop means a hundredfold change. pH is logarithmic, so averaging two pH values does not usually give the pH of their mixture.",
          "A strong monoprotic acid such as dilute HCl dissociates essentially completely. Its hydrogen-ion concentration is approximately its acid concentration when water’s own contribution is negligible. The calculations here assume ideal dilute solutions at 25 °C."
        ],
        formulas: [
          [
            "pH",
            "\\mathrm{pH}=-\\log_{10}[\\mathrm H^+]"
          ],
          [
            "Hydrogen concentration",
            "[\\mathrm H^+]=10^{-\\mathrm{pH}}"
          ]
        ],
        examples: [
          ex("Find pH for [H⁺] = 0.001 mol/L.", [
            ["Take minus the base-ten logarithm.","-\\log_{10}\\left(0.001\\right)"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
          ex("How many times greater is [H⁺] at pH 2 than at pH 5?", [
            ["Raise ten to the difference in pH.","\\left(10\\right)^{5-2}"],
            ["Evaluate and keep the requested unit.","= 1000"],
          ], "1000"),
        ],
        practice: [
          pr("Find pH for ideal 0.01 mol/L HCl, neglecting water’s contribution.", 2, "A strong monoprotic acid gives the same H⁺ concentration.", "Take the negative logarithm of acid concentration. −log₁₀(0.01) = 2."),
          pr("Find [H⁺] at pH 4, in mol/L.", 0.0001, "Reverse the logarithm with a power of ten.", "Raise ten to minus the pH. 10⁻⁴ = 0.0001 mol/L.", {"tol":0.0000010000000000000002}),
          pr("Find pH for [H⁺] = 0.002 mol/L.", 2.6989700043360187, "Use a base-ten logarithm.", "Take minus log of the supplied concentration. −log₁₀(0.002) = 2.69897."),
          pr("Dilute ideal HCl from 0.01 to 0.001 mol/L. By how many units does pH increase, neglecting water’s contribution?", 1, "Find both pH values before subtracting.", "Subtract initial pH from final pH. −log₁₀(0.001) + log₁₀(0.01) = 1."),
        ],
      },
      {
        title: "Water, bases and neutralisation",
        minutes: 20,
        explain: [
          "Water forms tiny amounts of hydrogen and hydroxide ions. At 25 °C, their concentration product is approximately 10⁻¹⁴ for ideal dilute solutions. Equal concentrations give neutral pH 7 at this temperature.",
          "Define pOH using hydroxide just as pH uses hydrogen. At 25 °C, pH plus pOH is 14. A strong base such as dilute NaOH gives nearly one hydroxide per formula unit.",
          "Hydrogen and hydroxide neutralise each other to water. For strong acid–strong base mixtures, compare moles first. Divide the leftover amount by final solution volume before finding pH. Assume additive volumes in the mixing problems."
        ],
        formulas: [
          [
            "Water product at 25 °C",
            "[\\mathrm H^+][\\mathrm{OH^-}]=10^{-14}"
          ],
          [
            "pH and pOH",
            "\\mathrm{pH}+\\mathrm{pOH}=14"
          ],
          [
            "Neutralisation",
            "\\mathrm{H^++OH^-\\rightarrow H_2O}"
          ]
        ],
        examples: [
          ex("At 25 °C, ideal [OH⁻] = 0.001 mol/L. Find pH.", [
            ["Use the water relation at the stated temperature.","14-\\left(-\\log_{10}\\left(0.001\\right)\\right)"],
            ["Evaluate and keep the requested unit.","= 11"],
          ], "11"),
          ex("Mix 0.1 L of 0.1 mol/L HCl with 0.1 L of 0.05 mol/L NaOH at 25 °C. Assume ideal solutions and additive volumes. Find pH.", [
            ["Find the initial hydrogen and hydroxide amounts.","n_{\\mathrm H^+}=0.1\\times0.1=0.01,\\quad n_{\\mathrm{OH^-}}=0.1\\times0.05=0.005\\,\\mathrm{mol}"],
            ["Neutralisation leaves the excess hydrogen ions.","n_{\\mathrm H^+,\\text{left}}=0.010-0.005=0.005\\,\\mathrm{mol}"],
            ["Divide by the combined solution volume.","[\\mathrm H^+]=\\frac{0.005}{0.1+0.1}=0.025\\,\\mathrm{mol/L}"],
            ["Take minus the base-ten logarithm.","\\mathrm{pH}=-\\log_{10}(0.025)=1.60206"],
          ], "1.60206"),
        ],
        practice: [
          pr("At 25 °C, pOH = 4. Find pH.", 10, "Use the sum of pH and pOH.", "Subtract pOH from fourteen. 14-4 = 10."),
          pr("At 25 °C, pH = 3. Find [OH⁻] in nmol/L, where 1 mol/L = 10⁹ nmol/L.", 0.01, "Use the water concentration product.", "Divide the water product by hydrogen concentration, then convert to nanomoles per litre. (10⁻¹⁴ ÷ 10⁻³) × 10⁹ = 0.01 nmol/L.", {"tol":0.0001}),
          pr("Find mol NaOH needed to neutralise 0.025 L of 0.2 mol/L HCl completely.", 0.005000000000000001, "The neutralisation ratio is one to one.", "Multiply acid concentration by its volume in litres. .025 × .2 = 0.005 mol.", {"tol":0.00005000000000000001}),
          pr("Equal moles of ideal dilute HCl and NaOH are mixed at 25 °C. Assume neutral salt and no other acid or base. Find final pH.", 7, "Neither strong acid nor strong base is left over.", "The neutral solution has equal hydrogen and hydroxide concentrations. 7 = 7."),
        ],
      },
      {
        title: "Weak acids and pH control",
        minutes: 20,
        explain: [
          "A weak acid dissociates only partly. Strength describes the fraction that reacts, whereas concentration describes how much was added per litre. A concentrated weak acid can contain more total acid than a dilute strong acid.",
          "For HA ⇌ H⁺ + A⁻, Ka compares the dissociated and undissociated forms. Starting with only HA of concentration C, let x dissociate. Then Ka = x²/(C − x), neglecting water’s contribution.",
          "A solution that resists pH change contains appreciable amounts of a weak acid and its conjugate base. The acid consumes added hydroxide; the base consumes added hydrogen ions. Its pH depends on their ratio, and its capacity depends on their amounts.",
          "For the pH-control examples, use pH ≈ pKa + log₁₀([A⁻]/[HA]). This approximation requires both forms to remain present and ignores changes in activities. pKa means −log₁₀(Ka)."
        ],
        formulas: [
          [
            "Weak acid",
            "K_a=\\frac{x^2}{C-x}"
          ],
          [
            "pH estimate",
            "\\mathrm{pH}\\approx\\mathrm{p}K_a+\\log_{10}\\frac{[\\mathrm A^-]}{[\\mathrm{HA}]}"
          ]
        ],
        examples: [
          ex("A model weak acid has C = 0.1 mol/L and Ka = 0.00001. Neglect water’s contribution. Solve x²/(0.1 − x) = Ka for positive x, then find pH.", [
            ["Let x be the hydrogen concentration, and rearrange the supplied equation.","x^2+0.00001x-0.000001=0"],
            ["Take the positive quadratic root; concentration cannot be negative.","x=\\frac{-0.00001+\\sqrt{0.00001^2+4(0.000001)}}2=0.0009950125\\,\\mathrm{mol/L}"],
            ["Convert the hydrogen concentration to pH.","\\mathrm{pH}=-\\log_{10}(x)=3.002171"],
          ], "3.002171"),
          ex("An acid–base mixture has pKa = 4.76 and [A⁻]/[HA] = 10. Find approximate pH.", [
            ["A tenfold base-to-acid ratio contributes one pH unit.","4.76+\\log_{10}\\left(10\\right)"],
            ["Evaluate and keep the requested unit.","= 5.76"],
          ], "5.76"),
        ],
        practice: [
          pr("An acid–base mixture has pKa = 4.76 and equal acid and conjugate-base concentrations. Find approximate pH.", 4.76, "The logarithm of one is zero.", "The ratio term vanishes. 4.76 + log₁₀(1) = 4.76."),
          pr("An acid–base mixture has pKa = 4.76 and [A⁻]/[HA] = 0.1. Find approximate pH.", 3.76, "The logarithm of one tenth is negative one.", "Add the ratio term to pKa. 4.76 + log₁₀(0.1) = 3.76."),
          pr("A solution that resists pH change contains 0.1 mol A⁻. Add 0.02 mol H⁺, which reacts completely with A⁻. Find A⁻ remaining in mol.", 0.08, "Added hydrogen ions consume the conjugate base one to one.", "Subtract the acid dose from the available base. .1-.02 = 0.08 mol.", {"tol":0.0008}),
          pr("An acid–base mixture initially has 0.1 mol HA and 0.1 mol A⁻. Add 0.02 mol H⁺ without appreciable volume change. Use pKa = 4.76. Find approximate final pH.", 4.583908740944318, "Convert A⁻ into HA before taking the ratio.", "Subtract the dose from base and add it to acid, then use their amount ratio. 4.76 + log₁₀(0.08 ÷ 0.12) = 4.583909."),
        ],
      },
    ],
  },

  'chem-011': {
    predict: {
      "q": "The cell scene offers Zn–Cu, Mg–Cu, Zn–Fe and Cu–Ag. Which pair should give the largest standard voltage, even though magnesium looks less precious than silver?",
      "options": [
        "Mg and Cu electrodes",
        "Cu and Ag electrodes",
        "Zn and Cu electrodes",
        "Zn and Fe electrodes"
      ],
      "answer": 0,
      "reveal": "Magnesium and copper have the widest separation of reduction potentials among the available pairs. Their standard voltage is 2.71 V; the more easily oxidised magnesium is consumed."
    },
    parts: [
      {
        title: "Tracking oxidation numbers",
        minutes: 20,
        explain: [
          "Oxidation is electron loss and reduction is electron gain. They occur together because the electrons released by one substance must be accepted by another. A redox reaction transfers charge as well as rearranging atoms.",
          "An oxidation number is a formal charge account for an atom in a substance. A free element has zero. A single-atom ion has its ion charge. Oxygen is usually −2 and hydrogen usually +1 in the ordinary compounds used here.",
          "The sum of oxidation numbers equals the overall charge. An increase means oxidation; a decrease means reduction. This helps recognise corrosion even when no wire is visible."
        ],
        formulas: [
          [
            "Oxidation-number sum",
            "\\sum_i n_i\\omega_i=q"
          ],
          [
            "Electron loss per atom",
            "N_{e,\\text{lost}}=\\omega_{\\text{final}}-\\omega_{\\text{initial}}"
          ]
        ],
        examples: [
          ex("In neutral Fe₂O₃, take oxygen as −2. Find the oxidation number of iron.", [
            ["Cancel the three oxide contributions using two iron atoms.","\\frac{-\\left(3\\times -2\\right)}{2}"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
          ex("Zinc goes from oxidation number 0 to +2. How many electrons does each atom lose?", [
            ["Find the rise in oxidation number.","2-0"],
            ["Evaluate and keep the requested unit.","= 2"],
          ], "2"),
        ],
        practice: [
          pr("What is the oxidation number of copper in pure Cu metal?", 0, "A free element uses the zero reference.", "An uncombined element has oxidation number zero. 0 = 0.", {"tol":1e-8}),
          pr("In neutral MgO, oxygen is −2. Find the oxidation number of Mg.", 2, "The two contributions must sum to zero.", "Magnesium cancels the oxide charge. 0-(-2) = 2."),
          pr("In neutral H₂SO₄, use H = +1 and O = −2. Find sulfur’s oxidation number.", 6, "Add the known contributions first.", "Sulfur cancels the combined hydrogen and oxygen contributions. -(2 × 1+4 × (-2)) = 6."),
          pr("In MnO₄⁻, use O = −2. Find Mn oxidation number.", 7, "The sum must equal negative one.", "Subtract all oxygen contributions from the total charge. -1-4 × (-2) = 7."),
        ],
      },
      {
        title: "Half-reactions and electron balance",
        minutes: 20,
        explain: [
          "A half-reaction shows one electron transfer. Zinc oxidation is Zn → Zn²⁺ + 2e⁻. Copper reduction is Cu²⁺ + 2e⁻ → Cu. Each half must balance atoms and electric charge.",
          "Multiply half-reactions until the electron counts match, then add them and cancel electrons. The final reaction cannot leave a supply of free electrons unaccounted for.",
          "In acidic water, balance oxygen with water and hydrogen with H⁺ before balancing charge with electrons. In basic water, neutralise added H⁺ with OH⁻ and cancel the extra water. Always recheck atoms and total charge."
        ],
        formulas: [
          [
            "Iron–silver reaction",
            "\\mathrm{Fe+2Ag^+\\rightarrow Fe^{2+}+2Ag}"
          ],
          [
            "Acidic permanganate reduction",
            "\\mathrm{MnO_4^-+8H^++5e^-\\rightarrow Mn^{2+}+4H_2O}"
          ]
        ],
        examples: [
          ex("One Al atom loses 3 electrons; one Cu²⁺ accepts 2. What is the smallest number of electrons transferred in a balanced whole-number combination?", [
            ["Two aluminium atoms and three copper ions exchange six electrons.","2\\times 3"],
            ["Evaluate and keep the requested unit.","= 6"],
          ], "6"),
          ex("In MnO₄⁻ → Mn²⁺ in acidic water, oxygen is balanced with four H₂O. How many H⁺ are needed on the left?", [
            ["Four waters contain eight hydrogen atoms.","4\\times 2"],
            ["Evaluate and keep the requested unit.","= 8"],
          ], "8"),
        ],
        practice: [
          pr("How many electrons must Fe²⁺ lose to become Fe³⁺?", 1, "Compare oxidation numbers.", "The charge number increases by one. 3-2 = 1."),
          pr("One Fe atom forms Fe²⁺. How many Ag⁺ ions can accept its released electrons to form Ag?", 2, "Each silver ion needs one electron.", "Divide iron’s electron supply by the demand per silver ion. 2 ÷ 1 = 2."),
          pr("Two Al atoms form Al³⁺. How many Cu²⁺ ions can they reduce to Cu?", 3, "Balance total electrons.", "Divide the six-electron supply by two electrons per copper ion. 2 × 3 ÷ 2 = 3."),
          pr("For MnO₄⁻ + 8 H⁺ + n e⁻ → Mn²⁺ + 4 H₂O, find n.", 5, "Make the left charge equal to +2.", "Electrons lower the left charge from seven to two. (-1+8)-2 = 5."),
        ],
      },
      {
        title: "Choosing electrodes and voltage",
        minutes: 20,
        explain: [
          "A galvanic cell uses a spontaneous redox reaction to supply electrical energy. Oxidation happens at the anode and reduction at the cathode. Electrons travel through the wire from anode to cathode.",
          "Standard reduction potentials compare how readily each half-reaction accepts electrons under standard conditions. Subtract anode reduction potential from cathode reduction potential. Do not multiply a potential when multiplying its half-reaction.",
          "The salt bridge carries ions to keep the solutions electrically balanced; electrons travel through the external metal circuit. Standard cell voltage is an ideal reference. Actual voltage depends on concentration and operating conditions."
        ],
        formulas: [
          [
            "Standard voltage",
            "E^\\circ_{\\text{cell}}=E^\\circ_{\\text{cathode}}-E^\\circ_{\\text{anode}}"
          ]
        ],
        examples: [
          ex("Find standard Zn–Cu cell voltage in V using E°(Cu²⁺/Cu) = +0.34 V and E°(Zn²⁺/Zn) = −0.76 V.", [
            ["Subtract the anode reduction potential from the cathode reduction potential.","0.34-\\left(-0.76\\right)"],
            ["Evaluate and keep the requested unit.","= 1.1\\,\\mathrm{V}"],
          ], "1.1 V"),
          ex("Find standard Mg–Cu cell voltage in V using Cu = +0.34 V and Mg = −2.37 V as reduction potentials.", [
            ["Subtract magnesium’s potential from copper’s.","0.34-\\left(-2.37\\right)"],
            ["Evaluate and keep the requested unit.","= 2.71\\,\\mathrm{V}"],
          ], "2.71 V"),
        ],
        practice: [
          pr("Find standard Zn–Fe cell voltage in V using Fe = −0.44 V and Zn = −0.76 V.", 0.32, "The higher reduction potential is the cathode.", "Subtract the zinc value from the iron value. -.44-(-.76) = 0.32 V.", {"tol":0.0032}),
          pr("Find standard Fe–Cu cell voltage in V using Cu = +0.34 V and Fe = −0.44 V.", 0.78, "Copper is the cathode.", "Subtract the iron reduction potential. .34-(-.44) = 0.78 V."),
          pr("Find standard Cu–Ag cell voltage in V using Ag = +0.80 V and Cu = +0.34 V.", 0.46, "Silver ions are reduced.", "Subtract the copper reduction potential from silver’s. .8-.34 = 0.46 V.", {"tol":0.0046}),
          pr("A balanced Zn–Cu cell reaction is multiplied by two. Using standard potentials Cu = +0.34 V and Zn = −0.76 V, what is its standard voltage in V?", 1.1, "Voltage does not scale with reaction amount.", "The same electrode-potential difference applies. .34-(-.76) = 1.1 V."),
        ],
      },
      {
        title: "Charge, plating and sacrificial protection",
        minutes: 20,
        explain: [
          "Electric charge passed equals current times time. One ampere carries one coulomb each second. One mole of electrons carries about 96485 C, the Faraday constant used here.",
          "To find deposited mass, divide charge by the Faraday constant to get moles of electrons. Divide by electrons needed per metal ion, then multiply by metal molar mass. Assume all current does the stated reaction in these examples.",
          "A zinc coating can protect a scratched steel roof because zinc oxidises more readily than iron in the coupled system. Magnesium can protect steel too. Protection consumes the sacrificial metal, so the amount available matters."
        ],
        formulas: [
          [
            "Charge",
            "Q=It"
          ],
          [
            "Faraday mass",
            "m=\\frac{ItM}{zF}"
          ]
        ],
        examples: [
          ex("A 2 A current flows for 300 s. Find charge in C.", [
            ["Multiply current by time.","2\\times 300"],
            ["Evaluate and keep the requested unit.","= 600\\,\\mathrm{C}"],
          ], "600 C"),
          ex("Copper plates from Cu²⁺ using 1930 C at 100% current efficiency. Find mass in g with F = 96485 C/mol and M(Cu) = 63.55 g/mol.", [
            ["Convert charge to moles of electrons.","n_e=\\frac{1930}{96485}=0.02000311\\,\\mathrm{mol}"],
            ["Two electrons are needed per copper ion.","n_{\\mathrm{Cu}}=\\frac{n_e}{2}=0.01000155\\,\\mathrm{mol}"],
            ["Multiply copper amount by its molar mass.","m=n_{\\mathrm{Cu}}\\times63.55=0.6355988\\,\\mathrm g"],
          ], "0.6355988 g"),
        ],
        practice: [
          pr("A 0.5 A current runs for 120 s. Find charge in C.", 60, "Use Q = It.", "Multiply the supplied current and time. .5 × 120 = 60 C."),
          pr("How many mol electrons are carried by 9648.5 C? Use F = 96485 C/mol.", 0.1, "Divide charge by charge per mole.", "Use the Faraday constant. 9648.5 ÷ 96485 = 0.1 mol.", {"tol":0.001}),
          pr("Zinc oxidises to Zn²⁺ and supplies 0.2 mol electrons. Find zinc consumed in mol.", 0.1, "Each zinc atom releases two electrons.", "Divide electron amount by two. .2 ÷ 2 = 0.1 mol.", {"tol":0.001}),
          pr("A sacrificial zinc anode supplies 1 A for 3600 s by Zn → Zn²⁺ + 2e⁻. Find mass consumed in g using M(Zn) = 65.38 g/mol and F = 96485 C/mol. Assume 100% efficiency.", 1.2197129087422915, "Convert current and time to charge first.", "Divide charge by F and by two, then multiply by zinc molar mass. 1 × 3600 ÷ 96485 ÷ 2 × 65.38 = 1.219713 g."),
        ],
      },
    ],
  },

  'mate-100': {
    predict: {
      "q": "In the bond-energy scene, add heat while the two atoms stay bound in the lopsided well. Which change should the average-spacing marker show?",
      "options": [
        "It shifts to a larger separation",
        "It stays at the cold separation",
        "It shifts to a smaller separation",
        "It always moves to zero separation"
      ],
      "answer": 0,
      "reveal": "The average-spacing marker shifts towards larger separation. The well rises steeply on the compressed side and more gently on the stretched side, so wider vibration also shifts its midpoint."
    },
    parts: [
      {
        title: "Three ways to hold atoms together",
        minutes: 20,
        explain: [
          "Ionic bonding involves attraction between oppositely charged ions. Covalent bonding involves shared electron pairs. Metallic bonding involves electrons spread through many atoms, helping metals conduct and allowing many atomic planes to slide.",
          "Real materials can mix these bonding characters. Silicon has a covalent network. Many ceramics combine ionic and covalent bonding. Polymer chains contain strong covalent bonds along each chain, with weaker attractions between many chains.",
          "Secondary attractions act between atoms or molecules without forming the same strong electron-sharing network. Temporary shifts of electrons cause dispersion attractions. Permanent uneven charge gives dipole attractions. Hydrogen bonding is a stronger special case involving hydrogen bonded to nitrogen, oxygen or fluorine.",
          "Bonding gives useful property clues, but bond type alone cannot rank every material. Structure, defects and temperature matter too. The strength of an entire polymer is not just the strength of a single bond within its chain."
        ],
        formulas: [
          [
            "Ionic neutrality",
            "\\sum_i n_iq_i=0"
          ],
          [
            "Shared electrons",
            "N_e=2N_{\\text{shared pairs}}"
          ]
        ],
        examples: [
          ex("A silicon atom shares one electron pair with each of four neighbours. How many electrons belong to those four shared pairs, counting each pair once?", [
            ["Multiply the number of pairs by two.","4\\times 2"],
            ["Evaluate and keep the requested unit.","= 8"],
          ], "8"),
          ex("Two Al³⁺ ions need how many O²⁻ ions to make a neutral formula unit?", [
            ["Cancel six positive charges with doubly negative ions.","\\frac{2\\times 3}{2}"],
            ["Evaluate and keep the requested unit.","= 3"],
          ], "3"),
        ],
        practice: [
          pr("How many electrons are in one shared covalent pair?", 2, "A pair has two members.", "One pair contains two electrons. 2 = 2."),
          pr("How many positive charge units come from three Mg²⁺ ions?", 6, "Count charge per ion.", "Multiply ion count by positive charge number. 3 × 2 = 6."),
          pr("Four covalent bonds each share one pair. How many shared pairs are there?", 4, "One pair is assigned to each bond.", "Count one shared pair per bond. 4 = 4."),
          pr("An ionic formula contains two +3 ions and three −2 ions. Find its net charge number.", 0, "Add signed charge contributions.", "The positive and negative totals cancel. 2 × 3+3 × (-2) = 0.", {"tol":1e-8}),
        ],
      },
      {
        title: "Finding the stable spacing",
        minutes: 20,
        explain: [
          "Atoms attract at some separations but strongly repel if pushed too close. At a stable spacing, the two effects balance. A small push either way produces a force towards that spacing.",
          "An energy curve shows the same balance as a valley. The bottom is the equilibrium spacing r₀. The energy needed to separate a bound pair to far apart is the well depth, using zero energy at infinite separation.",
          "The scene uses the Lennard-Jones model E = 4ε[(σ/r)¹² − (σ/r)⁶]. Here ε sets depth and σ sets a distance scale. The bottom lies at about 1.12246σ. This model illustrates a pair interaction; it is not a precise universal law for iron, alumina or polymers."
        ],
        formulas: [
          [
            "Pair energy model",
            "E=4\\varepsilon\\left[\\left(\\frac\\sigma r\\right)^{12}-\\left(\\frac\\sigma r\\right)^6\\right]"
          ],
          [
            "Balance",
            "F_{\text{net}}=F_{\text{attraction}}+F_{\text{repulsion}}=0"
          ]
        ],
        examples: [
          ex("Take attraction as +4.2 nN and repulsion as −4.2 nN. Find net force in nN.", [
            ["Equal opposite forces cancel.","4.2-4.2"],
            ["Evaluate and keep the requested unit.","= 0\\,\\mathrm{nN}"],
          ], "0 nN"),
          ex("In a Lennard-Jones model, σ = 0.22 nm and r₀ = 1.12246σ. Find equilibrium spacing in nm.", [
            ["Use the model’s equilibrium-spacing ratio.","1.12246\\times 0.22"],
            ["Evaluate and keep the requested unit.","= 0.2469412\\,\\mathrm{nm}"],
          ], "0.2469412 nm"),
        ],
        practice: [
          pr("A bound pair has energy −0.4 eV and separated atoms have energy zero. Find energy required to separate it in eV.", 0.4, "Final energy minus initial energy.", "Raise the energy from the well bottom to zero. 0-(-.4) = 0.4 eV.", {"tol":0.004}),
          pr("Take attraction as +3 nN and repulsion as −5 nN. Find net force in nN.", -2, "Keep the stated signs.", "Add both signed contributions. 3-5 = -2 nN."),
          pr("For the Lennard-Jones model at r = σ, find E/ε.", 0, "Both powers of σ/r equal one.", "Subtract equal terms and multiply by four. 4 × (1¹² − 1⁶) = 0.", {"tol":1e-8}),
          pr("For the Lennard-Jones model at r = 2σ, find E/ε.", -0.0615234375, "Use σ/r = one half in both terms.", "Evaluate the repulsive and attractive terms before subtracting. 4 × ((1 ÷ 2)¹² − (1 ÷ 2)⁶) = -0.06152344.", {"tol":0.000615234375}),
        ],
      },
      {
        title: "Bond depth and resistance to stretching",
        minutes: 20,
        explain: [
          "Near the valley bottom, a bond acts approximately like a spring. A small extension needs a force whose magnitude is stiffness k times extension. The restoring force points back towards equilibrium.",
          "Stiffness measures how quickly force grows with displacement. Well depth measures the total energy to separate the pair. They are related in a chosen model but are different properties: a deeper valley is not the same description as a narrower valley.",
          "For comparisons with the same distance scale and well shape, increasing ε deepens and stiffens the Lennard-Jones well. Melting is more complicated than separating a single pair; it also depends on the collective structure and disorder."
        ],
        formulas: [
          [
            "Small-extension force magnitude",
            "|F|\\approx k|r-r_0|"
          ],
          [
            "Spring energy",
            "\\Delta E\\approx\\frac12k(\\Delta r)^2"
          ]
        ],
        examples: [
          ex("A model bond has k = 200 N/m and stretches by 0.015 nm. Find restoring-force magnitude in nN. Use 1 N/m × 1 nm = 1 nN.", [
            ["The supplied unit relation gives the result directly in nN.","200\\times 0.015"],
            ["Evaluate and keep the requested unit.","= 3\\,\\mathrm{nN}"],
          ], "3 nN"),
          ex("A model bond needs 2 nN for a 0.01 nm extension. Find stiffness in N/m.", [
            ["Use the same nN-per-nm conversion as N/m.","\\frac{2}{0.01}"],
            ["Evaluate and keep the requested unit.","= 200\\,\\mathrm{N/m}"],
          ], "200 N/m"),
        ],
        practice: [
          pr("A model bond has k = 100 N/m and extension 0.01 nm. Find force magnitude in nN.", 1, "Use the small-extension rule.", "Multiply stiffness by extension. 100 × .01 = 1 nN."),
          pr("A model pair has energy −0.2 eV at its minimum and zero when separated. Find separation energy in eV.", 0.2, "Measure energy up from the bottom.", "Subtract initial energy from final energy. 0-(-.2) = 0.2 eV.", {"tol":0.002}),
          pr("A fixed-shape Lennard-Jones model changes ε from 0.2 to 0.5 eV with σ fixed. Find new well depth divided by old depth.", 2.5, "Depth equals ε in this model.", "Divide the two energy scales. .5 ÷ .2 = 2.5."),
          pr("For the same spring in its small-extension range, extension doubles. Find new stored energy divided by old stored energy.", 4, "Spring energy depends on extension squared.", "Square the extension ratio. 2² = 4."),
        ],
      },
      {
        title: "Why heating changes average spacing",
        minutes: 20,
        explain: [
          "Heating increases atomic vibration. If an energy valley were perfectly symmetric, a wider vibration would still have the same centre. The actual valley is usually steeper on the compressed side than on the stretched side.",
          "The animation marks the midpoint between its two turning positions as an average-spacing illustration. That midpoint moves towards larger separation as vibration widens. A full thermal average depends on the motion and interactions; the scene is a useful simplified picture.",
          "For a modest temperature range, a bar’s length change is approximately αL₀ΔT. The expansion coefficient α has units per kelvin. Use a temperature difference, so a Celsius change and a kelvin change have the same numerical size.",
          "Expansion gaps let bridge parts and rails change length without excessive force. The exercises use supplied constant coefficients; real values depend on composition, temperature and direction."
        ],
        formulas: [
          [
            "Length change",
            "\\Delta L=\\alpha L_0\\Delta T"
          ],
          [
            "Illustrated midpoint",
            "r_{\\text{mid}}=\\frac{r_{\\min}+r_{\\max}}2"
          ]
        ],
        examples: [
          ex("A 1000 mm steel bar has supplied constant α = 12 × 10⁻⁶ K⁻¹. It warms by 50 K. Find length increase in mm.", [
            ["Use the linear expansion approximation.","0.000012\\times 1000\\times 50"],
            ["Evaluate and keep the requested unit.","= 0.6\\,\\mathrm{mm}"],
          ], "0.6 mm"),
          ex("A model vibration turns at 0.23 and 0.29 nm. Find their midpoint in nm.", [
            ["Add the positions and divide by two.","\\frac{0.23+0.29}{2}"],
            ["Evaluate and keep the requested unit.","= 0.26\\,\\mathrm{nm}"],
          ], "0.26 nm"),
        ],
        practice: [
          pr("A bar has L₀ = 500 mm and α = 20 × 10⁻⁶ K⁻¹. It warms by 10 K. Find length increase in mm.", 0.1, "Use αL₀ΔT.", "Multiply the three supplied factors. 20 × 10⁻⁶ × 500 × 10 = 0.1 mm.", {"tol":0.001}),
          pr("A bar warms from 20 to 80 °C. Find the temperature rise in K.", 60, "Temperature differences have matching Celsius and kelvin sizes.", "Subtract the starting temperature from the final temperature. 80-20 = 60 K."),
          pr("A model symmetric well has turning positions 0.22 and 0.28 nm. Its cold minimum is 0.25 nm. Find the midpoint shift from the cold minimum in nm.", 0, "Find the midpoint before subtracting the minimum.", "Symmetric endpoints keep the midpoint at the cold minimum. (.22+.28) ÷ 2-.25 = 0 nm.", {"tol":1e-8}),
          pr("A 2000 mm bar increases length by 0.8 mm for a 40 K rise. Find its constant expansion coefficient in units of 10⁻⁶ K⁻¹.", 10, "Solve for α, then express it in millionths per kelvin.", "Divide length change by initial length and temperature rise, then multiply by a million. .8 ÷ (2000 × 40) × 1e6 = 10 × 10⁻⁶ K⁻¹."),
        ],
      },
    ],
  },

};
