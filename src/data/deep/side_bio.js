// Biomolecular Engineering side topic: each class split into parts.
// Practice mixes pick-an-answer questions (first option correct, shown shuffled)
// with typed numbers that are computed in place.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution) => ({ q, options, hint, solution });
const LN2 = Math.LN2;

export const SIDE_BIO = {
  'bio-001': {
    predict: {
      q: 'A cube 1 cm on a side is cut into 1000 cubes 1 mm on a side. What happens to the total surface?',
      options: ['It becomes 10 times larger', 'It stays the same', 'It becomes 1000 times larger', 'It halves'],
      answer: 0,
      reveal: 'One big cube: 6 cm². Small cubes: 1000 × 6 × 0.01 cm² = 60 cm². Same volume, ten times the surface. Cells use the same trick.',
    },
    parts: [
      {
        title: 'How small is a cell?',
        minutes: 15,
        explain: [
          'Cells are measured in micrometres (µm): 1 µm is a thousandth of a millimetre. A human hair is about 70–100 µm thick; a red blood cell about 7–8 µm across; a typical bacterium about 1–2 µm long.',
          'The naked eye can just see things about 0.1 mm (100 µm) across, so almost all cells need a microscope. Leeuwenhoek’s single lenses magnified about 200 times, enough to see bacteria as specks.',
        ],
        formulas: [['Unit steps', '1\\ \\text{mm} = 1000\\ \\mu\\text{m},\\quad 1\\ \\mu\\text{m} = 1000\\ \\text{nm}']],
        examples: [
          ex('How many 8 µm red blood cells fit side by side across 1 mm?', [['Convert.', '1\\ \\text{mm} = 1000\\ \\mu\\text{m}'], ['Divide.', '1000 / 8 = 125']], '125'),
          ex('A 2 µm bacterium is magnified 200 times. How big does it look?', [['Multiply.', '2 \\times 200 = 400\\ \\mu\\text{m}'], ['In millimetres.', '0.4\\ \\text{mm}']], '0.4 mm, a visible speck'),
        ],
        practice: [
          pr('How many 1 µm bacteria fit end to end across 1 cm?', 10000, '1 cm = 10 mm = 10 000 µm.', '10 000.'),
          pr('A 10 µm cell is magnified 400 times. Apparent size in mm?', 4, '10 × 400 µm, then ÷ 1000.', '4 mm.'),
          pr('A hair is 80 µm thick. How many 8 µm red blood cells fit across it?', 10, 'Divide.', '10.'),
          ch('Who first saw single-celled life (from 1673 on)?', ['Antonie van Leeuwenhoek', 'Robert Hooke', 'Rudolf Virchow', 'Louis Pasteur'], 'A cloth merchant in Delft.', 'Leeuwenhoek’s letters to the Royal Society.'),
        ],
      },
      {
        title: 'Surface against volume',
        minutes: 20,
        explain: [
          'For a sphere of radius r, surface A = 4πr² and volume V = (4/3)πr³, so A/V = 3/r. For a cube of side s, A/V = 6/s.',
          'Everything a cell takes in or gets rid of crosses the surface, but the need for food grows with the volume. So as a cell grows, each part of its inside gets less supply.',
          'Cells deal with this by staying small, by being long and thin (nerve cells), or by folding their surface (the gut lining).',
        ],
        formulas: [
          ['Sphere', '\\frac{A}{V} = \\frac{3}{r}'],
          ['Cube', '\\frac{A}{V} = \\frac{6}{s}'],
        ],
        examples: [
          ex('A/V for a cell of radius 5 µm?', [['Use 3/r.', '3/5'], ['Result.', '0.6\\ \\mu\\text{m}^{-1}']], '0.6 per µm'),
          ex('By what factor does A/V fall when r goes from 2 µm to 20 µm?', [['Ratio of 3/r values.', '(3/2)/(3/20)'], ['Result.', '10']], '10 times smaller'),
        ],
        practice: [
          pr('A/V of a sphere of radius 15 µm (per µm)?', 0.2, '3/r.', '0.2.'),
          pr('A/V of a cube of side 2 µm (per µm)?', 3, '6/s.', '3.'),
          pr('A cell needs A/V of at least 0.5 per µm. Largest radius in µm?', 6, 'Solve 3/r = 0.5.', 'r = 6 µm.'),
          ch('Which shape helps a large cell keep a high surface-to-volume ratio?', ['Long and thin', 'Perfect sphere', 'Large cube', 'Shape does not matter'], 'Nerve cells.', 'A thin shape keeps every part close to the surface.'),
        ],
      },
      {
        title: 'Cell theory and the cells engineers use',
        minutes: 15,
        explain: [
          'Cell theory: living things are made of cells (Schleiden 1838, Schwann 1839); the cell is the unit of life; cells come only from cells (Virchow 1855).',
          'Bacteria are prokaryotes: no nucleus, small (about 1–2 µm). Yeast, plant and animal cells are eukaryotes: they have a nucleus and are usually 10–100 µm.',
          'Biomolecular engineers most often grow the bacterium E. coli, baker’s yeast, and Chinese hamster ovary (CHO) cells, which make many protein medicines.',
        ],
        formulas: [['Volume ratio', '\\frac{V_1}{V_2} = \\left(\\frac{r_1}{r_2}\\right)^3']],
        examples: [
          ex('How many times larger in volume is a 10 µm yeast cell than a 1 µm bacterium (both treated as spheres of that diameter)?', [['Cube the ratio.', '(10/1)^3'], ['Result.', '1000']], '1000 times'),
          ex('Which of these has a nucleus: E. coli or yeast?', [['E. coli is a bacterium.', 'Prokaryote: no nucleus.'], ['Yeast is a fungus.', 'Eukaryote: has a nucleus.']], 'Yeast'),
        ],
        practice: [
          pr('A 20 µm cell versus a 2 µm cell: volume ratio?', 1000, '(20/2)³.', '1000.'),
          ch('Who stated that every cell comes from a cell (1855)?', ['Rudolf Virchow', 'Theodor Schwann', 'Robert Hooke', 'Gregor Mendel'], 'Omnis cellula e cellula.', 'Virchow.'),
          ch('Which is a prokaryote?', ['E. coli', 'Yeast', 'A human liver cell', 'A plant leaf cell'], 'No nucleus.', 'Bacteria are prokaryotes.'),
          ch('Many protein medicines are made in cells from…', ['Chinese hamster ovaries (CHO cells)', 'Cork', 'Red blood cells', 'Sand'], 'A mammal cell line.', 'CHO cells.'),
        ],
      },
    ],
  },

  'bio-002': {
    predict: {
      q: 'Which family of molecules stores most of a cell’s genetic information?',
      options: ['Nucleic acids', 'Carbohydrates', 'Lipids', 'Salts'],
      answer: 0,
      reveal: 'DNA and RNA are nucleic acids. Carbohydrates and lipids mostly store energy and build walls and membranes; proteins do most of the work.',
    },
    parts: [
      {
        title: 'Four families',
        minutes: 15,
        explain: [
          'Carbohydrates: sugars like glucose (C₆H₁₂O₆) and chains of sugars like starch and cellulose. Energy and structure.',
          'Lipids: fats, oils and the molecules of cell membranes. They do not mix with water. Proteins: chains of amino acids that do most jobs in a cell. Nucleic acids: DNA and RNA, chains of nucleotides that carry instructions.',
          'Cellulose, a sugar chain, is the most abundant natural polymer on Earth and the main material of wood and cotton.',
        ],
        formulas: [['Glucose', '\\text{C}_6\\text{H}_{12}\\text{O}_6,\\ M = 180\\ \\text{g/mol}']],
        examples: [
          ex('Molar mass of glucose from C = 12, H = 1, O = 16?', [['Add the atoms.', '6(12) + 12(1) + 6(16)'], ['Result.', '72 + 12 + 96 = 180']], '180 g/mol'),
          ex('Which family is cotton mostly made of?', [['Cotton is nearly pure cellulose.', 'Cellulose = a chain of glucose.'], ['Family.', 'Carbohydrate.']], 'Carbohydrates'),
        ],
        practice: [
          pr('Molar mass of sucrose, C₁₂H₂₂O₁₁ (C 12, H 1, O 16)?', 342, 'Add up.', '144 + 22 + 176 = 342.'),
          ch('Cell membranes are built mainly from…', ['Lipids', 'Carbohydrates', 'Nucleic acids', 'Metals'], 'They do not mix with water.', 'A double layer of lipids.'),
          ch('Which molecules do most of the work in a cell?', ['Proteins', 'Lipids', 'Water', 'Salt'], 'Enzymes, pumps, motors.', 'Proteins.'),
          ch('The most abundant natural polymer on Earth is…', ['Cellulose', 'DNA', 'Rubber', 'Silk'], 'Wood and cotton.', 'Cellulose.'),
        ],
      },
      {
        title: 'Building chains',
        minutes: 15,
        explain: [
          'Units join by condensation: each new bond releases one water molecule. Breaking them with water is hydrolysis, which is how you digest food.',
          'A chain of n units has n − 1 bonds, so it releases n − 1 water molecules. Its mass is the sum of the units minus the water lost.',
          'An average amino acid in a protein weighs about 110 daltons (110 g/mol), already counting the water lost.',
        ],
        formulas: [
          ['Bonds in a chain', '\\text{bonds} = n - 1'],
          ['Protein mass', 'M \\approx 110\\,n\\ \\text{Da}'],
        ],
        examples: [
          ex('Glucose (180) units make a chain of 3. Mass?', [['Units minus water.', '3(180) - 2(18)'], ['Result.', '540 - 36 = 504']], '504 g/mol'),
          ex('Roughly how many amino acids in a 55 000 Da protein?', [['Divide.', '55\\,000/110'], ['Result.', '500']], 'About 500'),
        ],
        practice: [
          pr('How many water molecules are released making a chain of 100 amino acids?', 99, 'n − 1.', '99.'),
          pr('Mass of a chain of 4 glucose units (glucose 180, water 18)?', 4 * 180 - 3 * 18, '4 × 180 − 3 × 18.', '666 g/mol.'),
          pr('Insulin has 51 amino acids. Estimated mass in Da (110 each)?', 5610, 'Multiply.', '5610 (the real value is about 5808).', { tol: 1 }),
          ch('Digesting starch into glucose is an example of…', ['Hydrolysis', 'Condensation', 'Melting', 'Combustion'], 'Water breaks the bonds.', 'Hydrolysis.'),
        ],
      },
      {
        title: 'The numbers game',
        minutes: 15,
        explain: [
          'With 20 amino acids, a chain of n has 20ⁿ possible sequences. In powers of ten, log₁₀(20ⁿ) = 1.301 n.',
          'DNA has 4 bases, so a stretch of n bases has 4ⁿ sequences; log₁₀(4ⁿ) = 0.602 n.',
          'These numbers are why engineers rarely design proteins from nothing: they change existing ones step by step and keep the improvements (directed evolution, Nobel Prize 2018 to Frances Arnold).',
        ],
        formulas: [['Powers of ten', '\\log_{10}(20^n) = 1.301\\,n,\\quad \\log_{10}(4^n) = 0.602\\,n']],
        examples: [
          ex('How many DNA sequences of length 10?', [['4^n.', '4^{10}'], ['Result.', '1\\,048\\,576']], 'About a million'),
          ex('Order of magnitude of the number of 50-amino-acid chains?', [['Multiply.', '1.301 \\times 50 = 65'], ['Result.', '10^{65}']], 'About 10⁶⁵'),
        ],
        practice: [
          pr('How many possible chains of 2 amino acids?', 400, '20².', '400.'),
          pr('How many DNA sequences of length 5?', 1024, '4⁵.', '1024.'),
          pr('Power of ten for the number of 200-amino-acid chains (give the exponent)?', 260, '1.301 × 200.', '260.', { tol: 1 }),
          ch('Who won the 2018 Nobel Prize in Chemistry for directed evolution of enzymes?', ['Frances Arnold', 'Rosalind Franklin', 'Maud Menten', 'Kary Mullis'], 'Caltech.', 'Frances Arnold (shared with Smith and Winter).'),
        ],
      },
    ],
  },

  'bio-003': {
    predict: {
      q: 'One strand of DNA reads ATGC. What does the partner strand read, letter for letter?',
      options: ['TACG', 'ATGC', 'GCAT', 'UACG'],
      answer: 0,
      reveal: 'A pairs with T and G with C, so ATGC pairs with TACG. (Strictly, the partner runs in the opposite direction, so it is usually written GCAT.)',
    },
    parts: [
      {
        title: 'Pairing and Chargaff’s rules',
        minutes: 15,
        explain: [
          'Each strand is a backbone of sugar and phosphate with a base sticking out: A (adenine), T (thymine), G (guanine) or C (cytosine).',
          'Across the helix, A always pairs with T and G with C. So %A = %T and %G = %C. Since the four add to 100%, knowing one base share gives all four.',
          'The two strands run in opposite directions (antiparallel), like two lanes of a road.',
        ],
        formulas: [['From one share to all', '\\%A = \\%T = 50 - \\%G']],
        examples: [
          ex('A sample is 22% C. Find all four.', [['C = G.', 'G = 22\\%'], ['A = T = (100 − 44)/2.', 'A = T = 28\\%']], 'A 28, T 28, G 22, C 22'),
          ex('Write the partner of GGATC (letter for letter).', [['Pair each.', 'G\\to C,\\ G\\to C,\\ A\\to T,\\ T\\to A,\\ C\\to G'], ['Result.', 'CCTAG']], 'CCTAG'),
        ],
        practice: [
          pr('A DNA sample is 35% A. What % is G?', 15, 'A = T = 35, then split the rest.', '100 − 70 = 30, so G = 15.'),
          pr('A sample is 18% T. What % is C?', 32, 'T = A = 18.', '100 − 36 = 64, so C = 32.'),
          ch('Partner of AATG (letter for letter)?', ['TTAC', 'AATG', 'GGCA', 'UUAC'], 'A–T, G–C.', 'TTAC.'),
          ch('Who reported A = T and G = C in 1950?', ['Erwin Chargaff', 'Francis Crick', 'Friedrich Miescher', 'Linus Pauling'], 'His rules.', 'Chargaff.'),
        ],
      },
      {
        title: 'Size of DNA',
        minutes: 15,
        explain: [
          'Each base pair adds about 0.34 nm to the length of the helix; one full turn is about 10.5 base pairs (about 3.4–3.6 nm).',
          'The human genome is about 3.1 billion base pairs. Stretched out, the DNA in one human cell (two copies) is about 2 metres long, packed into a nucleus about 6 µm across.',
          'A base pair weighs about 650 daltons.',
        ],
        formulas: [['Length', 'L = 0.34\\ \\text{nm} \\times \\text{base pairs}']],
        examples: [
          ex('Length of a 1000 base-pair gene?', [['Multiply.', '1000 \\times 0.34\\ \\text{nm}'], ['Result.', '340\\ \\text{nm} = 0.34\\ \\mu\\text{m}']], '0.34 µm'),
          ex('Length of one copy of the human genome (3.1 × 10⁹ bp)?', [['Multiply.', '3.1\\times10^9 \\times 0.34\\times10^{-9}\\ \\text{m}'], ['Result.', '\\approx 1.05\\ \\text{m}']], 'About 1 m'),
        ],
        practice: [
          pr('Length in nm of 50 base pairs?', 17, '50 × 0.34.', '17 nm.'),
          pr('How many full turns in 210 base pairs (10.5 per turn)?', 20, 'Divide.', '20.'),
          pr('Mass in daltons of a 1500 bp piece (650 Da per bp)?', 975000, 'Multiply.', '975 000 Da.'),
          ch('Roughly how long is the DNA in one human cell if stretched out?', ['About 2 metres', 'About 2 mm', 'About 2 km', 'About 2 µm'], 'Two copies of about 1 m.', 'About 2 m.'),
        ],
      },
      {
        title: 'Melting and copying',
        minutes: 15,
        explain: [
          'Heating DNA separates the strands (melting). G–C pairs have three hydrogen bonds, A–T pairs two, so DNA with more G and C melts at a higher temperature.',
          'For short strands (under about 20 bases) a quick estimate is the Wallace rule: Tm ≈ 2(A+T) + 4(G+C) °C.',
          'Meselson and Stahl showed in 1958 that each copy of DNA keeps one old strand and makes one new strand (semi-conservative copying).',
        ],
        formulas: [['Wallace rule', 'T_m \\approx 2(n_A + n_T) + 4(n_G + n_C)']],
        examples: [
          ex('Tm of AGCTTAGC?', [['Count.', 'A+T = 4,\\ G+C = 4'], ['Rule.', '2(4) + 4(4) = 24\\ ^\\circ\\text{C}']], '24 °C'),
          ex('A 20-base primer with 12 G or C. Tm?', [['A+T = 8.', '2(8) + 4(12)'], ['Result.', '16 + 48 = 64']], '64 °C'),
        ],
        practice: [
          pr('Tm by the Wallace rule for an 18-base primer with 9 G or C?', 54, '2(9) + 4(9).', '54 °C.'),
          pr('Tm for a 22-base primer with 8 G or C?', 2 * 14 + 4 * 8, '2(14) + 4(8).', '60 °C.'),
          pr('How many hydrogen bonds in total hold the pairs of GCAT?', 10, 'G–C 3, C–G 3, A–T 2, T–A 2.', '10.'),
          ch('Meselson and Stahl (1958) showed DNA copying is…', ['Semi-conservative', 'Fully conservative', 'Random', 'Impossible'], 'One old, one new.', 'Semi-conservative.'),
        ],
      },
    ],
  },

  'bio-004': {
    predict: {
      q: 'The RNA AUG UUU UAA is read in threes. How many amino acids are in the protein?',
      options: ['2', '3', '9', '1'],
      answer: 0,
      reveal: 'AUG = Met, UUU = Phe, UAA = stop. Stop adds nothing, so the protein is Met–Phe: two amino acids.',
    },
    parts: [
      {
        title: 'Transcription: DNA to RNA',
        minutes: 15,
        explain: [
          'RNA is like a single strand of DNA, but uses U (uracil) in place of T, and ribose sugar.',
          'In transcription, the enzyme RNA polymerase reads one DNA strand (the template) and builds a matching RNA: A → U, T → A, G → C, C → G.',
          'The RNA then has the same letters as the other DNA strand (the sense strand), with U for T.',
        ],
        formulas: [['Template to RNA', 'A\\to U,\\ T\\to A,\\ G\\to C,\\ C\\to G']],
        examples: [
          ex('Template strand TACAAA. RNA?', [['Pair each, U for A.', 'T\\to A,\\ A\\to U,\\ C\\to G,\\ A\\to U,\\ A\\to U,\\ A\\to U'], ['Result.', 'AUGUUU']], 'AUGUUU'),
          ex('Sense strand ATGGCT. RNA?', [['Same letters as the sense strand.', 'ATGGCT'], ['Swap T for U.', 'AUGGCU']], 'AUGGCU'),
        ],
        practice: [
          ch('Template TTT. RNA?', ['AAA', 'UUU', 'TTT', 'GGG'], 'T pairs with A.', 'AAA.'),
          ch('Which base is in RNA but not DNA?', ['Uracil (U)', 'Thymine (T)', 'Guanine (G)', 'Adenine (A)'], 'U replaces T.', 'Uracil.'),
          ch('Which enzyme makes RNA from DNA?', ['RNA polymerase', 'Ligase', 'A restriction enzyme', 'Ribosome'], 'Polymerase builds chains.', 'RNA polymerase.'),
          pr('How many RNA bases are needed to encode a 300-amino-acid protein, including the stop codon?', 903, '3 per amino acid, plus 3 for stop.', '900 + 3 = 903.'),
        ],
      },
      {
        title: 'Translation: reading codons',
        minutes: 20,
        explain: [
          'Ribosomes read the RNA three bases at a time from the start codon AUG (which also means methionine).',
          'Each codon stands for one amino acid. The table is redundant: 61 codons for 20 amino acids, plus 3 stop codons (UAA, UAG, UGA).',
          'Small adapter molecules (transfer RNA) carry the matching amino acid to each codon.',
        ],
        formulas: [['Codons', '4^3 = 64 = 61 \\text{ amino-acid codons} + 3 \\text{ stops}']],
        examples: [
          ex('Translate AUG GGC UGA.', [['AUG = Met, GGC = Gly.', '\\text{Met–Gly}'], ['UGA = stop.', '\\text{end}']], 'Met–Gly'),
          ex('How many amino acids from an RNA of 33 bases starting with AUG and ending with a stop?', [['Codons.', '33/3 = 11'], ['Minus the stop.', '10']], '10'),
        ],
        practice: [
          pr('How many codons stand for amino acids (not stop)?', 61, '64 − 3.', '61.'),
          pr('An RNA from AUG to the stop codon (inclusive) is 450 bases. How many amino acids?', 149, '450/3 = 150 codons, minus the stop.', '149.'),
          ch('Which is a stop codon?', ['UAA', 'AUG', 'UUU', 'GGG'], 'Three of them: UAA, UAG, UGA.', 'UAA.'),
          ch('What carries amino acids to the ribosome?', ['Transfer RNA', 'DNA', 'Lipids', 'Messenger RNA'], 'An adapter.', 'tRNA.'),
        ],
      },
      {
        title: 'Mutations',
        minutes: 15,
        explain: [
          'A substitution swaps one base. It may change one amino acid, none (if the new codon means the same thing), or create an early stop.',
          'An insertion or deletion of one or two bases shifts the reading frame and garbles everything after it. Three bases inserted add one amino acid without a shift.',
          'Sickle-cell disease comes from one substitution in the haemoglobin gene: GAG → GTG in DNA, so glutamate becomes valine.',
        ],
        formulas: [['Frameshift unless', '\\text{inserted bases} \\equiv 0 \\pmod 3']],
        examples: [
          ex('GAA (Glu) mutates to GAG. Effect?', [['GAG also means Glu.', '\\text{same amino acid}'], ['Name.', 'A silent mutation.']], 'No change: silent'),
          ex('Six bases are deleted in the middle of a gene. Frameshift?', [['6 is a multiple of 3.', '6 \\bmod 3 = 0'], ['Effect.', 'Two amino acids lost, rest unchanged.']], 'No frameshift'),
        ],
        practice: [
          ch('Inserting 1 base near the start of a gene usually…', ['Changes every amino acid after it', 'Changes nothing', 'Adds one amino acid', 'Removes one amino acid'], 'Reading frame.', 'Frameshift.'),
          ch('Inserting 3 bases between two codons…', ['Adds one amino acid, no frameshift', 'Garbles everything after', 'Removes a codon', 'Always makes a stop'], '3 is one codon.', 'One extra amino acid.'),
          ch('In sickle-cell disease, glutamate is replaced by…', ['Valine', 'Glycine', 'Methionine', 'Nothing'], 'GAG → GTG.', 'Valine.'),
          pr('How many bases must be deleted (smallest number above 0) to remove amino acids without a frameshift?', 3, 'Whole codons.', '3.'),
        ],
      },
    ],
  },

  'bio-005': {
    predict: {
      q: 'You heat an enzyme to 90 °C and cool it slowly. Most enzymes then…',
      options: ['Stay inactive, because they unfolded and tangled', 'Work better than before', 'Turn into DNA', 'Are unchanged'],
      answer: 0,
      reveal: 'Heat unfolds proteins, and unfolded chains usually stick to each other (aggregate). Anfinsen’s small, tough ribonuclease was special: under careful conditions it refolded.',
    },
    parts: [
      {
        title: 'Levels of structure',
        minutes: 15,
        explain: [
          'Primary structure: the amino acid sequence. Secondary: local shapes held by hydrogen bonds, mainly the α-helix and β-sheet (proposed by Linus Pauling in 1951).',
          'Tertiary: the full 3D fold of one chain. Quaternary: several chains together, like haemoglobin’s four chains.',
          'An α-helix rises about 0.15 nm per amino acid, with 3.6 amino acids per turn.',
        ],
        formulas: [['α-helix length', 'L \\approx 0.15\\ \\text{nm} \\times n']],
        examples: [
          ex('Length of a 20-amino-acid α-helix?', [['Multiply.', '20 \\times 0.15'], ['Result.', '3\\ \\text{nm}']], '3 nm'),
          ex('Turns in that helix?', [['Divide by 3.6.', '20/3.6'], ['Result.', '\\approx 5.6']], 'About 5.6 turns'),
        ],
        practice: [
          pr('Length in nm of a 30-amino-acid α-helix?', 4.5, '30 × 0.15.', '4.5 nm.'),
          pr('How many amino acids in 10 turns of α-helix?', 36, '10 × 3.6.', '36.'),
          ch('Haemoglobin’s four chains together are its…', ['Quaternary structure', 'Primary structure', 'Secondary structure', 'Sequence'], 'Several chains.', 'Quaternary.'),
          ch('Who proposed the α-helix (1951)?', ['Linus Pauling', 'John Kendrew', 'Christian Anfinsen', 'James Watson'], 'Caltech chemist.', 'Pauling, with Corey and Branson.'),
        ],
      },
      {
        title: 'Levinthal’s numbers',
        minutes: 15,
        explain: [
          'If each amino acid can take about 3 shapes, a chain of n has 3ⁿ shapes; log₁₀(3ⁿ) = 0.477 n.',
          'Even trying 10¹³ shapes per second, a chain of 100 needs about 10³⁴ seconds, while the universe is about 4 × 10¹⁷ seconds old.',
          'Real proteins fold in microseconds to seconds, so folding must follow a guided path: the energy funnel.',
        ],
        formulas: [['Search time', '\\log_{10} t = 0.477\\,n - 13']],
        examples: [
          ex('Blind search time for n = 40?', [['Exponent.', '0.477 \\times 40 - 13 = 6.1'], ['Result.', '10^{6.1} \\approx 1.3\\times10^6\\ \\text{s}']], 'About 15 days'),
          ex('For n = 60?', [['Exponent.', '28.6 - 13 = 15.6'], ['Result.', '\\approx 4\\times10^{15}\\ \\text{s}']], 'About 100 million years'),
        ],
        practice: [
          pr('Exponent of 10 for the number of shapes of a 50-amino-acid chain (3 per amino acid)?', 50 * Math.log10(3), '0.477 × 50.', 'About 23.9.', { tol: 0.1 }),
          pr('Exponent of 10 for the blind search time (s) of a 50-amino-acid chain?', 50 * Math.log10(3) - 13, 'Subtract 13.', 'About 10.9.', { tol: 0.1 }),
          pr('Smallest chain length whose blind search exceeds 10¹⁷ s?', 63, 'Solve 0.4771n − 13 > 17.', 'n > 62.9, so 63.'),
          ch('Which idea explains fast folding?', ['An energy funnel guiding the chain downhill', 'Trying every shape', 'Folding at random', 'DNA templates for shape'], 'Not a blind search.', 'The funnel.'),
        ],
      },
      {
        title: 'Keeping proteins folded in processing',
        minutes: 15,
        explain: [
          'Proteins unfold (denature) with heat, extreme acidity, some salts and solvents, and strong stirring at air–liquid surfaces.',
          'Unfolded proteins tend to clump (aggregate). For a protein medicine that is serious: clumps can lose activity and trigger immune reactions.',
          'Engineers keep proteins cold (often 2–8 °C), at the right acidity, and add stabilising sugars such as sucrose or trehalose.',
        ],
        formulas: [['Fraction unfolded (two-state)', 'f_U = \\frac{1}{1 + e^{\\Delta G/RT}}']],
        examples: [
          ex('ΔG of folding stability is 0 at the melting temperature. Fraction unfolded?', [['e^0 = 1.', 'f_U = 1/(1+1)'], ['Result.', '0.5']], 'Half unfolded'),
          ex('ΔG/RT = 4.6 (stable). Fraction unfolded?', [['e^{4.6} ≈ 100.', 'f_U = 1/101'], ['Result.', '\\approx 1\\%']], 'About 1%'),
        ],
        practice: [
          pr('ΔG/RT = 2.3. Fraction unfolded (decimal)?', 1 / (1 + Math.exp(2.3)), '1/(1 + e^{2.3}).', 'About 0.091.', { tol: 0.003 }),
          pr('ΔG/RT = 6.9. Fraction unfolded (decimal)?', 1 / (1 + Math.exp(6.9)), 'e^{6.9} ≈ 1000.', 'About 0.001.', { tol: 0.0003 }),
          ch('Why are protein medicines usually stored at 2–8 °C?', ['To slow unfolding and clumping', 'To kill the protein', 'To make them sweeter', 'Because they are gases'], 'Stability.', 'Cold slows damage.'),
          ch('Which sugar is often added to stabilise proteins?', ['Trehalose', 'Cellulose', 'Starch', 'Lactic acid'], 'Also found in desert plants.', 'Trehalose (or sucrose).'),
        ],
      },
    ],
  },

  'bio-006': {
    predict: {
      q: 'An enzyme has Km = 2 mM. You raise the substrate from 2 mM to 200 mM. The speed…',
      options: ['Roughly doubles, from 50% to about 99% of top speed', 'Increases 100 times', 'Stays the same', 'Falls'],
      answer: 0,
      reveal: 'At [S] = Km the enzyme runs at 50%. At 100 × Km it runs at 100/101 ≈ 99%. A hundred times more substrate buys only twice the speed.',
    },
    parts: [
      {
        title: 'The Michaelis–Menten equation',
        minutes: 20,
        explain: [
          'Enzyme E binds substrate S to form a complex ES, which makes product P and frees the enzyme: E + S ⇌ ES → E + P.',
          'Assuming the complex quickly reaches a steady level gives v = Vmax[S]/(Km + [S]).',
          'At low [S] the speed is nearly proportional to [S] (v ≈ Vmax[S]/Km). At high [S] it approaches Vmax.',
        ],
        formulas: [['Rate', 'v = \\frac{V_{\\max}[S]}{K_m + [S]}']],
        examples: [
          ex('Vmax = 60, Km = 3 mM, [S] = 6 mM. v?', [['Substitute.', '60 \\times 6 / (3 + 6)'], ['Result.', '360/9 = 40']], '40'),
          ex('What [S] gives 75% of Vmax?', [['Set v/Vmax = 0.75.', '[S]/(K_m + [S]) = 0.75'], ['Solve.', '[S] = 3K_m']], '3 Km'),
        ],
        practice: [
          pr('Vmax = 120, Km = 4 mM, [S] = 12 mM. v?', 90, '120 × 12/16.', '90.'),
          pr('Vmax = 50, Km = 10 mM, [S] = 2 mM. v?', 50 * 2 / 12, '50 × 2/12.', '8.33.', { tol: 0.02 }),
          pr('[S] as a multiple of Km for 80% of Vmax?', 4, 'Solve x/(1 + x) = 0.8.', '4.'),
          pr('[S] as a multiple of Km for 99% of Vmax?', 99, 'x/(1 + x) = 0.99.', '99.'),
        ],
      },
      {
        title: 'Finding Km and Vmax from data',
        minutes: 15,
        explain: [
          'Measure v at several [S]. Plotting 1/v against 1/[S] gives a straight line (the Lineweaver–Burk plot, 1934): slope Km/Vmax, crossing the 1/v axis at 1/Vmax.',
          'Today people usually fit the curve directly, but the straight-line form is easy to do by hand.',
          'Two measurements are enough for a rough estimate.',
        ],
        formulas: [['Lineweaver–Burk', '\\frac{1}{v} = \\frac{K_m}{V_{\\max}}\\cdot\\frac{1}{[S]} + \\frac{1}{V_{\\max}}']],
        examples: [
          ex('The 1/v axis is crossed at 0.02 and the slope is 0.1 mM. Vmax and Km?', [['Vmax = 1/0.02.', '50'], ['Km = slope × Vmax.', '0.1 \\times 50 = 5\\ \\text{mM}']], 'Vmax 50, Km 5 mM'),
          ex('At [S] = Km, v = 30. Vmax?', [['Half speed.', 'v = V_{\\max}/2'], ['So.', 'V_{\\max} = 60']], '60'),
        ],
        practice: [
          pr('Intercept 1/Vmax = 0.01. Vmax?', 100, 'Invert.', '100.'),
          pr('Vmax = 100 and slope Km/Vmax = 0.08 mM. Km in mM?', 8, 'Multiply.', '8 mM.'),
          pr('v = 25 at [S] = Km. Vmax?', 50, 'Double it.', '50.'),
          ch('In the Lineweaver–Burk plot, the x-axis is…', ['1/[S]', '[S]', 'v', 'Time'], 'Double reciprocal.', '1/[S].'),
        ],
      },
      {
        title: 'Enzymes at work',
        minutes: 15,
        explain: [
          'Turnover number kcat = Vmax / [enzyme]: how many molecules one enzyme converts per second. Catalase reaches millions per second.',
          'Enzymes have a best temperature and acidity. Above the best temperature they unfold; that is why washing-powder enzymes come from microbes that live in warm places.',
          'Industrial uses: amylases turn starch into sugar syrups, proteases in washing powder remove stains, lactase makes lactose-free milk.',
        ],
        formulas: [['Turnover', 'k_{\\text{cat}} = \\frac{V_{\\max}}{[E]_{\\text{total}}}']],
        examples: [
          ex('Vmax = 2 × 10⁻⁴ M/s with 10⁻⁹ M enzyme. kcat?', [['Divide.', '2\\times10^{-4}/10^{-9}'], ['Result.', '2\\times10^5\\ \\text{s}^{-1}']], '200 000 per second'),
          ex('An enzyme converts 1000 molecules per second. How many in one hour?', [['Seconds in an hour.', '3600'], ['Multiply.', '3.6\\times10^6']], '3.6 million'),
        ],
        practice: [
          pr('Vmax = 5 × 10⁻⁶ M/s, enzyme 10⁻⁸ M. kcat per second?', 500, 'Divide.', '500.'),
          pr('kcat = 50 per second. Molecules converted by one enzyme in a minute?', 3000, '50 × 60.', '3000.'),
          ch('Which enzyme turns lactose into simpler sugars?', ['Lactase', 'Amylase', 'Protease', 'Catalase'], 'Named after its substrate.', 'Lactase.'),
          ch('Why do enzymes slow down above a certain temperature?', ['They unfold', 'They freeze', 'They turn into DNA', 'The substrate disappears'], 'Denaturation.', 'Heat unfolds them.'),
        ],
      },
    ],
  },

  'bio-007': {
    predict: {
      q: 'A culture doubles every hour. If the tank is full at 10 hours, when was it half full?',
      options: ['At 9 hours', 'At 5 hours', 'At 1 hour', 'At 8 hours'],
      answer: 0,
      reveal: 'One doubling before full. Exponential growth hides most of its change in the last few doublings.',
    },
    parts: [
      {
        title: 'Exponential growth',
        minutes: 15,
        explain: [
          'If each cell divides into two every td hours, after t hours there are N = N₀ · 2^(t/td) cells.',
          'The same growth written with e: N = N₀ e^(μt), with μ = ln 2 / td. μ is the specific growth rate.',
          'E. coli in rich medium can double about every 20 minutes; mammal cells used for medicines take about a day.',
        ],
        formulas: [
          ['Doubling', 'N = N_0\\,2^{t/t_d}'],
          ['Growth rate', '\\mu = \\frac{\\ln 2}{t_d}'],
        ],
        examples: [
          ex('1000 cells, td = 20 min. After 2 hours?', [['Doublings.', '120/20 = 6'], ['Multiply.', '1000 \\times 2^6 = 64\\,000']], '64 000'),
          ex('td = 24 h. μ?', [['Divide.', '0.693/24'], ['Result.', '0.029\\ \\text{h}^{-1}']], '0.029 per hour'),
        ],
        practice: [
          pr('td = 30 min. Number of doublings in 5 hours?', 10, '300/30.', '10.'),
          pr('Starting with 100 cells, 10 doublings later?', 102400, '100 × 2¹⁰.', '102 400.'),
          pr('μ = 0.5 per hour. Doubling time in hours?', LN2 / 0.5, 'ln 2 / μ.', '1.39 h.', { tol: 0.01 }),
          pr('td = 2 h. μ per hour?', LN2 / 2, 'ln 2 / 2.', '0.347.', { tol: 0.002 }),
        ],
      },
      {
        title: 'Monod and running out of food',
        minutes: 15,
        explain: [
          'Monod: μ = μmax S/(Ks + S). When food S is plentiful (S ≫ Ks), cells grow at nearly μmax; when scarce, growth slows.',
          'Yield Y: grams of cells made per gram of food used. With Y = 0.5, 20 g/L of sugar can make at most 10 g/L of cells.',
          'In a batch, growth goes: lag phase, exponential phase, slowing, then stationary phase when the food is gone.',
        ],
        formulas: [
          ['Monod', '\\mu = \\mu_{\\max}\\frac{S}{K_s + S}'],
          ['Yield', 'X_{\\max} = X_0 + Y S_0']],
        examples: [
          ex('μmax = 0.8 /h, Ks = 0.2 g/L, S = 0.2 g/L. μ?', [['S = Ks.', '\\mu = \\mu_{\\max}/2'], ['Result.', '0.4\\ \\text{h}^{-1}']], '0.4 per hour'),
          ex('Y = 0.4, 25 g/L sugar, starting cells negligible. Final cells?', [['Multiply.', '0.4 \\times 25'], ['Result.', '10\\ \\text{g/L}']], '10 g/L'),
        ],
        practice: [
          pr('μmax = 1.0 /h, Ks = 0.1 g/L, S = 0.9 g/L. μ?', 0.9, '1.0 × 0.9/1.0.', '0.9 per hour.'),
          pr('Y = 0.5, 40 g/L sugar. Most cells possible (g/L)?', 20, 'Y × S₀.', '20 g/L.'),
          pr('μmax = 0.6, Ks = 0.5 g/L, S = 0.1 g/L. μ?', 0.6 * 0.1 / 0.6, '0.6 × 0.1/0.6.', '0.1 per hour.', { tol: 0.002 }),
          ch('When the food runs out, the culture enters the…', ['Stationary phase', 'Lag phase', 'Exponential phase', 'Folding phase'], 'Growth stops.', 'Stationary.'),
        ],
      },
      {
        title: 'Oxygen and scale-up',
        minutes: 15,
        explain: [
          'Growing cells need oxygen, but oxygen dissolves poorly in water: only about 7–8 mg/L at 30 °C in contact with air.',
          'The oxygen transfer rate is OTR = kLa (C* − C): the mixing and bubbles (kLa) times how far the liquid is below saturation.',
          'Bigger tanks are harder to mix and cool, so scale-up is a classic engineering problem: penicillin went from bottles to tanks of tens of thousands of litres in the 1940s.',
        ],
        formulas: [['Oxygen transfer', '\\text{OTR} = k_La\\,(C^* - C)']],
        examples: [
          ex('kLa = 100 per hour, C* = 7 mg/L, C = 2 mg/L. OTR?', [['Difference.', '7 - 2 = 5'], ['Multiply.', '100 \\times 5 = 500\\ \\text{mg/(L·h)}']], '500 mg/L per hour'),
          ex('Cells need 600 mg/(L·h) and C must stay at 2 mg/L. kLa needed?', [['Divide.', '600/5'], ['Result.', '120\\ \\text{h}^{-1}']], '120 per hour'),
        ],
        practice: [
          pr('kLa = 200 /h, C* = 7, C = 3 mg/L. OTR in mg/(L·h)?', 800, '200 × 4.', '800.'),
          pr('Demand 900 mg/(L·h), C* − C = 6 mg/L. kLa needed (per hour)?', 150, 'Divide.', '150.'),
          ch('Why is oxygen a problem in big bioreactors?', ['It dissolves poorly in water and is hard to mix in', 'Cells do not need it', 'It explodes', 'It is too cheap'], 'About 7 mg/L.', 'Low solubility plus mixing limits.'),
          ch('Which company opened the first large deep-tank penicillin plant in 1944?', ['Pfizer', 'Genentech', 'Nestlé', 'Bayer'], 'Brooklyn.', 'Pfizer.'),
        ],
      },
    ],
  },

  'bio-008': {
    predict: {
      q: 'A restriction enzyme cuts at GAATTC. On average, how often does that 6-letter sequence appear in random DNA?',
      options: ['About once every 4096 letters', 'Once every 6 letters', 'Once every 24 letters', 'Never'],
      answer: 0,
      reveal: 'Each position has a 1 in 4 chance of the right letter, so 6 in a row has (1/4)⁶ = 1/4096.',
    },
    parts: [
      {
        title: 'Cutting and pasting',
        minutes: 15,
        explain: [
          'Restriction enzymes recognise short sequences, often palindromes that read the same on both strands (GAATTC pairs with CTTAAG, which read backwards is GAATTC).',
          'Many cut in a staggered way, leaving short single-stranded "sticky ends" that pair with any end cut by the same enzyme. DNA ligase then seals the joint.',
          'A recognition site of n letters appears about once every 4ⁿ letters in random DNA.',
        ],
        formulas: [['Expected spacing', '4^n']],
        examples: [
          ex('Expected spacing for a 4-letter site?', [['4^4.', '256'], ['So.', '\\text{about every 256 bp}']], '256 bp'),
          ex('How many GAATTC sites expected in a 50 000 bp virus?', [['Spacing 4096.', '50\\,000/4096'], ['Result.', '\\approx 12']], 'About 12'),
        ],
        practice: [
          pr('Expected spacing for an 8-letter site (bp)?', 65536, '4⁸.', '65 536.'),
          pr('Expected number of 4-letter sites in 10 240 bp?', 40, '10 240/256.', '40.'),
          ch('Which enzyme seals pasted DNA pieces?', ['DNA ligase', 'RNA polymerase', 'Amylase', 'Restriction enzyme'], 'Glue.', 'Ligase.'),
          ch('In 1973 the first recombinant DNA organism was made by…', ['Stanley Cohen and Herbert Boyer', 'Watson and Crick', 'Kary Mullis', 'Pasteur'], 'Plasmids in bacteria.', 'Cohen and Boyer.'),
        ],
      },
      {
        title: 'PCR arithmetic',
        minutes: 20,
        explain: [
          'Each PCR cycle multiplies the number of copies by (1 + E), where E is the efficiency (1 means perfect doubling).',
          'Copies after n cycles: N = N₀(1 + E)ⁿ. To reach a target, n = log(N/N₀)/log(1 + E).',
          'Each cycle takes a few minutes: separate at about 95 °C, attach primers at about 50–65 °C, copy at 72 °C.',
        ],
        formulas: [['Cycles needed', 'n = \\frac{\\log(N/N_0)}{\\log(1+E)}']],
        examples: [
          ex('100 starting copies, 20 perfect cycles. Copies?', [['2^20.', '1\\,048\\,576'], ['Multiply.', '\\approx 1.05\\times10^8']], 'About 100 million'),
          ex('Cycles to multiply a million-fold at E = 1?', [['log 10⁶ / log 2.', '6/0.301'], ['Result.', '19.9 \\Rightarrow 20']], '20 cycles'),
        ],
        practice: [
          pr('Copies from 1 after 10 cycles at E = 0.9?', 1.9 ** 10, '1.9¹⁰.', 'About 613.', { tol: 1 }),
          pr('Cycles (exact, not rounded) to multiply 1000-fold at E = 1?', 3 / Math.log10(2), 'log 1000 / log 2.', '9.97.', { tol: 0.02 }),
          pr('Cycles (exact) to multiply a billion-fold at E = 0.9?', 9 / Math.log10(1.9), '9/log 1.9.', '32.3.', { tol: 0.05 }),
          pr('A run of 35 cycles at 3 minutes each takes how many minutes?', 105, 'Multiply.', '105 min.'),
        ],
      },
      {
        title: 'Making a protein in bacteria',
        minutes: 15,
        explain: [
          'Steps: copy the gene (PCR), cut it and a plasmid with the same restriction enzyme, paste with ligase, put the plasmid into bacteria, select the ones that took it up (the plasmid also carries antibiotic resistance), and grow them in a bioreactor.',
          'Human insulin was the first medicine made this way: Genentech made it in 1978 and it was approved as Humulin in 1982.',
          'Bacteria cannot do some finishing steps (such as adding sugar chains), so many complex proteins are made in yeast or mammal cells instead.',
        ],
        formulas: [['Product from a batch', '\\text{protein} = \\text{volume} \\times \\text{titre}']],
        examples: [
          ex('A 10 000 L tank gives 2 g/L of protein, and 70% is recovered. Product?', [['Made.', '10\\,000 \\times 2 = 20\\,000\\ \\text{g}'], ['Recovered.', '0.7 \\times 20 = 14\\ \\text{kg}']], '14 kg'),
          ex('A patient uses 1.5 mg a day. Days of supply in 14 kg?', [['Convert.', '14\\ \\text{kg} = 1.4\\times10^7\\ \\text{mg}'], ['Divide.', '\\approx 9.3\\times10^6\\ \\text{days}']], 'About 9.3 million patient-days'),
        ],
        practice: [
          pr('A 2000 L tank at 3 g/L with 60% recovery. Product in kg?', 3.6, '2000 × 3 × 0.6 g.', '3600 g = 3.6 kg.'),
          ch('Why is an antibiotic-resistance gene put on the plasmid?', ['To select only the bacteria that took up the plasmid', 'To make the protein', 'To cut DNA', 'To feed the cells'], 'Selection.', 'Only those bacteria survive the antibiotic.'),
          ch('When was bacteria-made human insulin approved?', ['1982', '1973', '1953', '1996'], 'Humulin.', '1982.'),
          ch('Why are some proteins made in mammal cells rather than bacteria?', ['Bacteria cannot add some finishing touches, like sugar chains', 'Bacteria are too big', 'Mammal cells grow faster', 'Bacteria cannot read DNA'], 'Post-translational changes.', 'Missing finishing steps.'),
        ],
      },
    ],
  },

  'bio-009': {
    predict: {
      q: 'A mixture of a small and a large protein goes through a gel-filtration column (beads with tiny pores). Which comes out first?',
      options: ['The large protein', 'The small protein', 'Both together', 'Neither'],
      answer: 0,
      reveal: 'Small molecules wander into the pores and take a longer path; large ones cannot enter and go straight through. Big comes out first.',
    },
    parts: [
      {
        title: 'Kinds of chromatography',
        minutes: 15,
        explain: [
          'Size exclusion (gel filtration): beads with pores; large molecules come out first.',
          'Ion exchange: charged beads hold oppositely charged proteins; they are released by raising the salt. Affinity: beads carry something that binds only the target, like an antibody grabbing its partner. Protein A beads, which grab antibodies, are the standard first step for antibody medicines.',
          'Each kind separates by a different property, so purification uses several in a row.',
        ],
        formulas: [['Retention factor', 'k = \\frac{t_R - t_0}{t_0}']],
        examples: [
          ex('A protein comes out at 12 min; a non-sticking marker at 4 min. k?', [['Subtract.', '12 - 4 = 8'], ['Divide.', '8/4 = 2']], '2'),
          ex('Which method uses a binding partner on the beads?', [['Binding, not size or charge.', ''], ['Name.', 'Affinity chromatography.']], 'Affinity'),
        ],
        practice: [
          pr('tR = 9 min, t0 = 3 min. Retention factor?', 2, '(9 − 3)/3.', '2.'),
          pr('t0 = 2 min and k = 4. When does the protein come out (min)?', 10, 'tR = t0(1 + k).', '10 min.'),
          ch('Which separates by charge?', ['Ion exchange', 'Size exclusion', 'Affinity', 'Centrifugation'], 'Charged beads.', 'Ion exchange.'),
          ch('In size exclusion, which comes out last?', ['The smallest molecule', 'The largest molecule', 'They come out together', 'The heaviest metal'], 'It visits all the pores.', 'Smallest last.'),
        ],
      },
      {
        title: 'Resolution',
        minutes: 15,
        explain: [
          'Rs = 2(t₂ − t₁)/(w₁ + w₂), with w the width at the base of each peak. Rs ≈ 1.5 means the peaks barely touch at the baseline.',
          'In a longer column peaks move apart in proportion to the length L but widen only as √L, so Rs grows as √L.',
          'Better beads (smaller and more even) make narrower peaks, which is often cheaper than a longer column.',
        ],
        formulas: [
          ['Resolution', 'R_s = \\frac{2(t_2 - t_1)}{w_1 + w_2}'],
          ['Length', 'R_s \\propto \\sqrt{L}'],
        ],
        examples: [
          ex('Peaks at 10 and 11.5 min, widths 1.0 and 1.0 min. Rs?', [['Gap.', '1.5'], ['Rs.', '2(1.5)/2 = 1.5']], '1.5'),
          ex('Rs = 0.9 at 20 cm. Length for 1.5?', [['Square the ratio.', '(1.5/0.9)^2 = 2.78'], ['Multiply.', '20 \\times 2.78 = 55.6\\ \\text{cm}']], 'About 56 cm'),
        ],
        practice: [
          pr('Peaks at 6.0 and 7.2 min, widths 0.6 and 0.6. Rs?', 2, '2 × 1.2 / 1.2.', '2.0.'),
          pr('Peaks at 3.0 and 3.5, widths 0.5 and 0.5. Rs?', 1, '2 × 0.5 / 1.0.', '1.0.'),
          pr('Rs = 1.2 at 10 cm. Rs at 40 cm?', 2.4, '× √4.', '2.4.'),
          pr('Rs = 1.0 at 15 cm. Length in cm for Rs = 2?', 60, '15 × 2².', '60 cm.'),
        ],
      },
      {
        title: 'Yield and purity across steps',
        minutes: 15,
        explain: [
          'Each purification step loses some product. Overall yield is the product of the step yields: three steps at 80% each give 0.8³ = 51%.',
          'Purity rises at each step. Downstream processing can be half or more of the cost of making a protein medicine.',
          'Other tools: centrifuges remove cells (Svedberg built the ultracentrifuge in the 1920s), filters remove debris, and electrophoresis (Tiselius) checks purity by running proteins through a gel in an electric field.',
        ],
        formulas: [['Overall yield', 'Y = y_1 \\times y_2 \\times \\dots \\times y_n']],
        examples: [
          ex('Steps at 90%, 85% and 75%. Overall yield?', [['Multiply.', '0.9 \\times 0.85 \\times 0.75'], ['Result.', '0.574']], '57%'),
          ex('Five steps at 90% each?', [['Power.', '0.9^5'], ['Result.', '0.59']], '59%'),
        ],
        practice: [
          pr('Overall yield (decimal) of four steps at 80%?', 0.8 ** 4, '0.8⁴.', '0.41.', { tol: 0.002 }),
          pr('Steps at 95%, 70%, 90%. Overall yield (decimal)?', 0.95 * 0.7 * 0.9, 'Multiply.', '0.60.', { tol: 0.002 }),
          pr('100 g goes in, overall yield 0.55. Grams out?', 55, 'Multiply.', '55 g.'),
          ch('Who won the 1948 Nobel Prize for electrophoresis?', ['Arne Tiselius', 'The Svedberg', 'Mikhail Tsvet', 'Archer Martin'], 'Uppsala.', 'Tiselius.'),
        ],
      },
    ],
  },

  'bio-010': {
    predict: {
      q: 'Bone is about 20 GPa stiff; a steel hip stem about 200 GPa. What problem can a much stiffer implant cause?',
      options: ['The implant carries the load, so the nearby bone weakens (stress shielding)', 'The bone gets stronger', 'The implant melts', 'Nothing'],
      answer: 0,
      reveal: 'Bone keeps itself strong by being loaded. A stiff implant takes the load, and the bone around it thins over the years. This is why titanium (about 110 GPa) and porous designs are popular.',
    },
    parts: [
      {
        title: 'Matching stiffness',
        minutes: 15,
        explain: [
          'Stiffness is measured by Young’s modulus E. Cortical bone: about 10–30 GPa. Titanium alloy: about 110 GPa. Stainless steel: about 200 GPa. Cobalt–chromium: about 230 GPa.',
          'When bone and implant share a load side by side, each carries a share proportional to E × area. A stiffer implant takes more of the load, and bone that is not loaded is slowly removed (stress shielding).',
          'Porous metals and polymer composites are designed to bring the stiffness closer to bone.',
        ],
        formulas: [['Load share of the implant', '\\frac{F_i}{F} = \\frac{E_iA_i}{E_iA_i + E_bA_b}']],
        examples: [
          ex('Equal areas, steel (200 GPa) and bone (20 GPa). Implant share?', [['Substitute.', '200/(200 + 20)'], ['Result.', '0.91']], '91%'),
          ex('Equal areas, titanium (110) and bone (20)?', [['Substitute.', '110/130'], ['Result.', '0.85']], '85%'),
        ],
        practice: [
          pr('Equal areas, cobalt–chromium (230 GPa) and bone (20 GPa). Implant share (decimal)?', 230 / 250, '230/250.', '0.92.'),
          pr('Equal areas, a porous titanium at 20 GPa and bone at 20 GPa. Implant share?', 0.5, 'Equal.', '0.5.'),
          pr('Implant area half the bone area, titanium 110 vs bone 20. Implant share (decimal)?', 55 / 75, '110 × 0.5 / (55 + 20).', '0.73.', { tol: 0.005 }),
          ch('Bone that carries less load over the years tends to…', ['Thin out (stress shielding)', 'Grow thicker', 'Turn to metal', 'Stay exactly the same'], 'Use it or lose it.', 'It is resorbed.'),
        ],
      },
      {
        title: 'Materials the body accepts',
        minutes: 15,
        explain: [
          'Titanium forms a thin, stable oxide skin (TiO₂) that the body tolerates well, which is why bone grows onto it (Brånemark’s osseointegration).',
          'Bioglass 45S5 (45% SiO₂, 24.5% Na₂O, 24.5% CaO, 6% P₂O₅ by weight) forms a bone-like mineral layer on its surface and bonds to bone.',
          'Ultra-high-molecular-weight polyethylene is used for the cup of hip joints because it wears slowly against metal or ceramic balls.',
        ],
        formulas: [['Bioglass 45S5 (wt%)', '45\\ \\text{SiO}_2 + 24.5\\ \\text{Na}_2\\text{O} + 24.5\\ \\text{CaO} + 6\\ \\text{P}_2\\text{O}_5 = 100']],
        examples: [
          ex('Grams of SiO₂ in 200 g of Bioglass 45S5?', [['45% of 200.', '0.45 \\times 200'], ['Result.', '90\\ \\text{g}']], '90 g'),
          ex('Grams of CaO in the same batch?', [['24.5% of 200.', '0.245 \\times 200'], ['Result.', '49\\ \\text{g}']], '49 g'),
        ],
        practice: [
          pr('Grams of P₂O₅ in 500 g of Bioglass 45S5?', 30, '6% of 500.', '30 g.'),
          pr('Grams of Na₂O in 1000 g?', 245, '24.5%.', '245 g.'),
          ch('Why does bone tolerate titanium well?', ['A stable oxide skin forms on it', 'It is magnetic', 'It dissolves', 'It is soft'], 'TiO₂.', 'The passive oxide layer.'),
          ch('Which polymer is used for hip cups since Charnley?', ['Polyethylene', 'PTFE', 'PVC', 'Nylon'], 'He switched in 1962.', 'High-density, now ultra-high-molecular-weight, polyethylene.'),
        ],
      },
      {
        title: 'Dissolving implants',
        minutes: 15,
        explain: [
          'Polyglycolic acid (PGA) and polylactic acid (PLA) break down by reacting with water (hydrolysis) into acids the body already handles.',
          'A simple model: mass left M = M₀ e^(−kt), half-life t½ = ln 2 / k. PGA loses strength in weeks; PLA takes months to years; blends (PLGA) are in between.',
          'The aim is that the implant weakens only as fast as the tissue takes over the load.',
        ],
        formulas: [
          ['Mass left', 'M = M_0 e^{-kt}'],
          ['Half-life', 't_{1/2} = \\frac{\\ln 2}{k}'],
        ],
        examples: [
          ex('k = 0.05 per week. Half-life?', [['Divide.', '0.693/0.05'], ['Result.', '13.9\\ \\text{weeks}']], 'About 14 weeks'),
          ex('Half-life 10 weeks. Fraction left at 30 weeks?', [['Three half-lives.', '(1/2)^3'], ['Result.', '0.125']], '12.5%'),
        ],
        practice: [
          pr('k = 0.2 per week. Half-life in weeks?', LN2 / 0.2, 'ln 2 / k.', '3.47 weeks.', { tol: 0.02 }),
          pr('Half-life 8 weeks. k per week?', LN2 / 8, 'ln 2 / 8.', '0.087.', { tol: 0.001 }),
          pr('Half-life 6 weeks. Percentage left at 24 weeks?', 6.25, 'Four half-lives.', '6.25%.'),
          pr('k = 0.1 per week. Fraction left after 10 weeks (decimal)?', Math.exp(-1), 'e^{−1}.', '0.368.', { tol: 0.002 }),
        ],
      },
    ],
  },
};
