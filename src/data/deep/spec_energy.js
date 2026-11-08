// Energy Materials specialization: each class split into parts.
// Practice answers are computed in place so the numbers cannot drift from the working.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

const F = 96485;
const G = 9.81;
const qmAh = (n, M) => (n * F) / (3.6 * M);
const pair = (a, c) => 1 / (1 / a + 1 / c);
const teEta = (Th, Tc, ZT) => ((Th - Tc) / Th) * ((Math.sqrt(1 + ZT) - 1) / (Math.sqrt(1 + ZT) + Tc / Th));
const amorph = (Tc) => 10 ** (4.52 - 731 / (Tc + 273.15));

export const SPEC_ENERGY = {
  'enrg-001': {
    predict: {
      q: 'For the same useful energy at the wheels, how much heavier is a lithium-ion battery than a tank of diesel?',
      options: ['About 17 times heavier', 'About the same', 'About 50 times heavier', 'About 2 times heavier'],
      answer: 0,
      reveal: 'Diesel stores about 50 times more energy per kilogram, but an engine wastes about 70% of it while a motor wastes only about 10%. Together that gives about 17 times.',
    },
    parts: [
      {
        title: 'Joules, watt-hours and specific energy',
        minutes: 20,
        explain: [
          'Energy has many units. The joule (J) is the SI unit; a watt is one joule per second. Electricity is sold in kilowatt-hours: 1 kW for 1 hour is 1000 × 3600 = 3.6 million joules, 3.6 MJ.',
          'Specific energy is energy divided by mass. Fuels are quoted in MJ/kg (diesel 45–46, petrol 46, hydrogen 120), batteries in Wh/kg (lead-acid 35, lithium-ion cells 150–270).',
          'To compare, convert: 1 Wh/kg = 3600 J/kg = 0.0036 MJ/kg.',
        ],
        formulas: [
          ['Specific energy', 'e = \\frac{E}{m}'],
          ['Unit change', '1\\ \\text{kWh} = 3.6\\ \\text{MJ},\\quad 1\\ \\text{Wh/kg} = 0.0036\\ \\text{MJ/kg}'],
        ],
        examples: [
          ex('Convert 250 Wh/kg to MJ/kg.', [['Multiply by 3600 J per Wh.', '250 \\times 3600 = 900\\,000\\ \\text{J/kg}'], ['Write in MJ.', '0.9\\ \\text{MJ/kg}']], '0.9 MJ/kg'),
          ex('How many times more energy per kilogram does diesel (46 MJ/kg) hold than a 250 Wh/kg cell?', [['Same units first.', '250\\ \\text{Wh/kg} = 0.9\\ \\text{MJ/kg}'], ['Divide.', '46 / 0.9 = 51']], 'About 51 times'),
        ],
        practice: [
          pr('How many MJ are in 60 kWh?', 60 * 3.6, '1 kWh = 3.6 MJ.', '60 × 3.6 = 216 MJ.'),
          pr('Lead-acid stores 35 Wh/kg. In MJ/kg?', (35 * 3600) / 1e6, 'Multiply by 3600, divide by a million.', '35 × 3600 = 126 000 J/kg = 0.126 MJ/kg.', { tol: 0.001 }),
          pr('Hydrogen holds 120 MJ/kg. In kWh per kg?', 120 / 3.6, 'Divide by 3.6.', '120/3.6 = 33.3 kWh/kg.'),
          pr('A 5000 mAh, 3.85 V phone battery stores how many Wh?', (5000 * 3.85) / 1000, 'Wh = mAh × V / 1000.', '5000 × 3.85 / 1000 = 19.25 Wh.'),
        ],
      },
      {
        title: 'Mass for a job, counting efficiency',
        minutes: 20,
        explain: [
          'What you want is useful work at the wheels, not stored energy. An engine turns about 25–35% of its fuel into motion; the rest leaves as heat. An electric motor with its electronics turns about 85–90% of the battery’s energy into motion.',
          'So the mass you must carry is the useful energy divided by (specific energy × efficiency).',
          'This is why electric vehicles can compete with fuel despite a much lower specific energy: they waste far less of what they carry.',
        ],
        formulas: [['Mass needed', 'm = \\frac{E_{\\text{useful}}}{e\\,\\eta}']],
        examples: [
          ex('A small car needs 20 kWh of useful energy for 100 km. How much diesel (46 MJ/kg, 30%)?', [['Useful energy in MJ.', '20 \\times 3.6 = 72\\ \\text{MJ}'], ['Divide by eη.', '72 / (46 \\times 0.30) = 5.2\\ \\text{kg}']], '5.2 kg'),
          ex('Same job with lithium-ion cells (0.9 MJ/kg, 90%)?', [['Useful energy.', '72\\ \\text{MJ}'], ['Divide by eη.', '72 / (0.9 \\times 0.90) = 88.9\\ \\text{kg}']], 'About 89 kg'),
        ],
        practice: [
          pr('Useful energy 50 kWh from petrol (46 MJ/kg) at 25%. Mass in kg?', (50 * 3.6) / (46 * 0.25), '180 MJ ÷ (46 × 0.25).', '180/11.5 = 15.7 kg.'),
          pr('Useful energy 50 kWh from Li-ion cells (0.9 MJ/kg) at 90%. Mass in kg?', (50 * 3.6) / (0.9 * 0.9), '180 MJ ÷ 0.81.', '180/0.81 = 222 kg.'),
          pr('Useful energy 10 kWh from lead-acid (0.126 MJ/kg) at 85%. Mass in kg?', (10 * 3.6) / (0.126 * 0.85), '36 MJ ÷ (0.126 × 0.85).', '36/0.1071 = 336 kg.'),
          pr('A battery pack is 400 kg at 160 Wh/kg, used at 88%. Useful energy in kWh?', (400 * 160 * 0.88) / 1000, 'Stored energy × efficiency.', '400 × 160 = 64 kWh, × 0.88 = 56.3 kWh.'),
        ],
      },
      {
        title: 'Storing energy by lifting water',
        minutes: 20,
        explain: [
          'Lifting a mass m by a height h stores mgh. Per kilogram that is just gh: about 9.81 J for every metre. Water 100 m up holds only 981 J/kg, roughly 50 000 times less than diesel.',
          'Pumped hydro still stores most of the world’s grid energy, because water and height are cheap and the round trip loses only 20–30%. The Philippines runs pumped storage at Kalayaan in Laguna, between Laguna de Bay and a reservoir up the mountain.',
          'Because gh is so small, pumped storage needs huge volumes: a cubic metre of water is 1000 kg.',
        ],
        formulas: [
          ['Gravity energy per kg', 'e = g\\,h'],
          ['Total', 'E = m\\,g\\,h\\,\\eta'],
        ],
        examples: [
          ex('How much energy per kg does water hold 300 m up?', [['Multiply.', '9.81 \\times 300'], ['Result.', '2943\\ \\text{J/kg}']], '2943 J/kg'),
          ex('How many tonnes of water, falling 300 m at 85%, give 1 MWh?', [['Energy in J.', '1\\ \\text{MWh} = 3.6\\times10^{9}\\ \\text{J}'], ['Divide by ghη.', '\\frac{3.6\\times10^9}{9.81 \\times 300 \\times 0.85} = 1.44\\times10^{6}\\ \\text{kg}']], 'About 1440 t'),
        ],
        practice: [
          pr('Energy in J/kg of water 50 m up?', G * 50, 'gh.', '9.81 × 50 = 490.5 J/kg.'),
          pr('Energy in kWh stored by 1000 t of water 200 m up (no losses)?', (1e6 * G * 200) / 3.6e6, 'mgh in J, then ÷ 3.6×10⁶.', '1.962×10⁹ J = 545 kWh.'),
          pr('How many kg of water 100 m up store as much energy as 1 kg of diesel (46 MJ)?', 46e6 / (G * 100), 'Divide 46 MJ by gh.', '46×10⁶/981 = 46 900 kg.', { tol: 50 }),
          pr('A pumped-storage plant uses 100 MWh to pump water up and gets 78 MWh back. Round-trip efficiency in %?', 78, 'Out ÷ in.', '78/100 = 78%.'),
        ],
      },
      {
        title: 'Energy per litre and range',
        minutes: 20,
        explain: [
          'Mass is not the only limit. Space matters too, so engineers also use energy density per litre. Diesel holds about 36 MJ/L; hydrogen gas at 700 bar only about 4.8 MJ/L, which is why hydrogen tanks are large.',
          'Range follows directly: range = useful energy ÷ energy used per kilometre.',
          'A typical electric car uses about 0.15–0.20 kWh per km at the wheels plus losses; a jeepney or bus several times that.',
        ],
        formulas: [
          ['Energy per volume', 'e_V = e \\times \\rho'],
          ['Range', '\\text{range} = \\frac{E\\,\\eta}{\\text{energy per km}}'],
        ],
        examples: [
          ex('Diesel has 45.6 MJ/kg and a density of 0.83 kg/L. Energy per litre?', [['Multiply.', '45.6 \\times 0.83'], ['Result.', '37.8\\ \\text{MJ/L}']], '37.8 MJ/L'),
          ex('A 60 kWh car pack, used at 90%, with 0.18 kWh/km at the wheels. Range?', [['Useful energy.', '60 \\times 0.9 = 54\\ \\text{kWh}'], ['Divide.', '54 / 0.18 = 300\\ \\text{km}']], '300 km'),
        ],
        practice: [
          pr('Petrol: 46 MJ/kg, 0.74 kg/L. MJ per litre?', 46 * 0.74, 'e × ρ.', '34.0 MJ/L.'),
          pr('How many MJ does a 480 L hydrogen tank hold at 4.8 MJ/L?', 480 * 4.8, 'Volume × energy per litre.', '2304 MJ.'),
          pr('A 40 kWh pack at 90%, using 0.15 kWh/km. Range in km?', (40 * 0.9) / 0.15, 'Useful ÷ per-km.', '36/0.15 = 240 km.'),
          pr('An e-jeepney uses 0.9 kWh/km at the wheels and must run 150 km. Pack size in kWh at 85% efficiency?', (0.9 * 150) / 0.85, 'Useful energy ÷ efficiency.', '135/0.85 = 159 kWh.'),
        ],
      },
    ],
  },

  'enrg-002': {
    predict: {
      q: 'You swap a graphite anode for silicon, which holds about ten times more lithium per gram. Roughly how much more charge can the pair of electrodes hold per gram?',
      options: ['About a third more', 'About ten times more', 'About double', 'No change at all'],
      answer: 0,
      reveal: 'The cathode, which holds much less per gram, still has to be carried. The weaker electrode limits the pair, so the gain is real but far from tenfold.',
    },
    parts: [
      {
        title: 'Faraday’s law and charge per gram',
        minutes: 25,
        explain: [
          'One mole of electrons carries F = 96 485 coulombs, the Faraday constant. If each formula unit of an electrode material takes in n lithium ions (and n electrons), one mole of it, M grams, stores nF coulombs.',
          'Battery people count charge in milliamp-hours: 1 mAh = 3.6 C. So the theoretical capacity is q = nF/(3.6 M) mAh per gram.',
          'For graphite, six carbon atoms (72.06 g) hold one lithium: q = 96 485/(3.6 × 72.06) = 372 mAh/g.',
        ],
        formulas: [['Theoretical capacity', 'q = \\frac{n\\,F}{3.6\\,M}\\ \\text{mAh/g}']],
        examples: [
          ex('Capacity of graphite, LiC₆ (one Li per 6 C, M = 72.06 g/mol)?', [['Substitute.', 'q = \\frac{1 \\times 96\\,485}{3.6 \\times 72.06}'], ['Calculate.', 'q = 372\\ \\text{mAh/g}']], '372 mAh/g'),
          ex('LiCoO₂ (M = 97.87 g/mol) gives up one Li in theory. Capacity?', [['Substitute.', 'q = \\frac{96\\,485}{3.6 \\times 97.87}'], ['Calculate.', 'q = 274\\ \\text{mAh/g}'], ['In practice only half the Li is removed safely.', '\\approx 140\\ \\text{mAh/g}']], '274 mAh/g in theory, about 140 used'),
        ],
        practice: [
          pr('LiFePO₄ (M = 157.76 g/mol, one Li). Theoretical capacity in mAh/g?', qmAh(1, 157.76), 'nF/(3.6M).', '96 485/(3.6 × 157.76) = 170 mAh/g.'),
          pr('Silicon forms Li₁₅Si₄: 3.75 Li per Si (M = 28.09). Capacity in mAh/g?', qmAh(3.75, 28.09), 'n = 3.75.', '3.75 × 96 485/(3.6 × 28.09) = 3578 mAh/g.', { tol: 5 }),
          pr('Lithium metal itself (n = 1, M = 6.94). Capacity in mAh/g?', qmAh(1, 6.94), 'One electron per atom.', '96 485/(3.6 × 6.94) = 3862 mAh/g.', { tol: 5 }),
          pr('How many coulombs are in 3000 mAh?', 3000 * 3.6, '1 mAh = 3.6 C.', '10 800 C.'),
        ],
      },
      {
        title: 'Pairing anode and cathode',
        minutes: 20,
        explain: [
          'A cell needs both electrodes, holding the same charge. For each amp-hour you carry 1000/q_c grams of cathode plus 1000/q_a grams of anode.',
          'So the capacity per gram of the pair is 1/(1/q_a + 1/q_c), the same shape as resistors in parallel. The smaller capacity dominates.',
          'That is why a dramatically better anode gives only a modest gain while the cathode stays the same.',
        ],
        formulas: [
          ['Grams per Ah', 'm = \\frac{1000}{q_a} + \\frac{1000}{q_c}'],
          ['Pair capacity', 'q_{\\text{pair}} = \\frac{1}{1/q_a + 1/q_c}'],
        ],
        examples: [
          ex('Graphite (360) with LiCoO₂ (140). Pair capacity?', [['Sum of reciprocals.', '1/360 + 1/140 = 0.002778 + 0.007143 = 0.009921'], ['Invert.', 'q = 100.8\\ \\text{mAh/g}']], 'About 101 mAh/g'),
          ex('Silicon (3500) with LiCoO₂ (140)?', [['Sum of reciprocals.', '1/3500 + 1/140 = 0.000286 + 0.007143'], ['Invert.', 'q = 134.6\\ \\text{mAh/g}'], ['Compare.', '134.6 / 100.8 = 1.34']], 'About 135 mAh/g, 34% more'),
        ],
        practice: [
          pr('Graphite (360) with NMC (180). Pair capacity in mAh/g?', pair(360, 180), 'Reciprocals.', '1/(1/360 + 1/180) = 120 mAh/g.'),
          pr('Silicon blend (1000) with NMC (180)?', pair(1000, 180), 'Reciprocals.', '152.5 mAh/g.'),
          pr('Graphite (360) with LFP (160)?', pair(360, 160), 'Reciprocals.', '110.8 mAh/g.'),
          pr('Grams of LFP (160 mAh/g) needed per Ah?', 1000 / 160, '1000/q.', '6.25 g.'),
        ],
      },
      {
        title: 'Voltage and energy',
        minutes: 20,
        explain: [
          'Each electrode has a voltage measured against lithium metal: LiCoO₂ about 3.9 V, NMC 3.7–3.8, LFP 3.4; graphite about 0.1 V, LTO 1.55 V. The cell voltage is the difference.',
          'Energy is voltage times charge, so Wh/kg = V × mAh/g. A high-voltage cathode with a low-voltage anode gives the most energy.',
          'These numbers count only the electrode materials. Electrolyte, separator, foils and casing roughly halve the figure for a finished cell.',
        ],
        formulas: [
          ['Cell voltage', 'V = V_c - V_a'],
          ['Energy per mass', 'e\\,(\\text{Wh/kg}) = V \\times q\\,(\\text{mAh/g})'],
        ],
        examples: [
          ex('LiCoO₂ (3.9 V) against graphite (0.1 V) with pair capacity 101 mAh/g. Energy per kg of electrodes?', [['Cell voltage.', '3.9 - 0.1 = 3.8\\ \\text{V}'], ['Multiply.', '3.8 \\times 101 = 384\\ \\text{Wh/kg}']], '384 Wh/kg'),
          ex('LFP (3.4 V, 160) against LTO (1.55 V, 175). Energy per kg of electrodes?', [['Voltage.', '3.4 - 1.55 = 1.85\\ \\text{V}'], ['Pair capacity.', '1/(1/160 + 1/175) = 83.6'], ['Energy.', '1.85 \\times 83.6 = 155\\ \\text{Wh/kg}']], '155 Wh/kg'),
        ],
        practice: [
          pr('NMC (3.8 V, 180) against graphite (0.1 V, 360). Wh per kg of electrodes?', 3.7 * pair(360, 180), 'V × pair capacity.', '3.7 × 120 = 444 Wh/kg.'),
          pr('LFP (3.4 V) against graphite (0.1 V). Cell voltage?', 3.3, 'Difference.', '3.3 V.'),
          pr('A cell: 3.6 V and 3000 mAh. Energy in Wh?', (3.6 * 3000) / 1000, 'V × Ah.', '10.8 Wh.'),
          pr('A finished cell keeps 48% of the electrode figure of 444 Wh/kg. Cell Wh/kg?', 444 * 0.48, 'Multiply.', '213 Wh/kg.'),
        ],
      },
      {
        title: 'Swelling, cycles and fading',
        minutes: 20,
        explain: [
          'Lithium going in and out makes electrodes swell and shrink. Graphite swells about 10%; silicon about 300%, enough to crack its particles and the protective film on them. That is why silicon is blended into graphite in small amounts.',
          'Each cycle a little lithium is trapped for good, mostly in a surface film (the SEI). A cell is usually called worn out at 80% of its first capacity.',
          'If a fixed fraction f is lost each cycle, capacity after N cycles is (1 − f)^N. Small losses add up: 0.02% per cycle leaves about 82% after 1000 cycles.',
        ],
        formulas: [
          ['Capacity fade', 'Q_N = Q_0\\,(1 - f)^N'],
          ['Cycles to 80%', 'N = \\frac{\\ln 0.8}{\\ln(1 - f)}'],
        ],
        examples: [
          ex('A cell loses 0.05% per cycle. Capacity after 500 cycles?', [['Substitute.', '(1 - 0.0005)^{500}'], ['Calculate.', '0.9995^{500} = 0.779']], 'About 78%'),
          ex('How many cycles to reach 80% at 0.02% per cycle?', [['Formula.', 'N = \\ln 0.8 / \\ln 0.9998'], ['Calculate.', 'N = -0.2231 / -0.0002 = 1116']], 'About 1116 cycles'),
        ],
        practice: [
          pr('Capacity fraction after 1000 cycles at 0.03% loss per cycle?', 0.9997 ** 1000, '(1 − f)^N.', '0.9997¹⁰⁰⁰ = 0.741.', { tol: 0.002 }),
          pr('Cycles to 80% at 0.01% loss per cycle?', Math.log(0.8) / Math.log(0.9999), 'ln 0.8 / ln(1 − f).', 'About 2231 cycles.', { tol: 3 }),
          pr('A silicon particle 100 nm across swells 300% in volume. New volume as a multiple of the old?', 4, '300% more means ×(1 + 3).', '4 times.'),
          pr('Starting from that 4× volume, how many times larger is its diameter? (cube root)', 4 ** (1 / 3), 'Volume ∝ d³.', '∛4 = 1.59.', { tol: 0.01 }),
        ],
      },
    ],
  },

  'enrg-003': {
    predict: {
      q: 'A solar cell material has a very small band gap, so it can catch almost every photon in sunlight. Will it be very efficient?',
      options: ['No: each photon gives only the small gap energy, the rest becomes heat', 'Yes: catching every photon is all that matters', 'Yes: small gaps give high voltage', 'It cannot work at all'],
      answer: 0,
      reveal: 'Every photon, however energetic, delivers only about the gap energy. A 0.5 eV cell keeps 0.5 eV from photons averaging well over 1 eV, so most sunlight turns into heat.',
    },
    parts: [
      {
        title: 'Photons and the band gap',
        minutes: 20,
        explain: [
          'Light comes in photons. A photon’s energy in electronvolts is E = 1240/λ with λ in nanometres: red light (700 nm) is 1.77 eV, blue (450 nm) 2.76 eV.',
          'A photon can lift an electron across the band gap only if E ≥ E_g. Silicon’s gap of 1.12 eV means it absorbs light shorter than 1107 nm, which includes all visible light and some infrared.',
          'Any energy above the gap is lost within a trillionth of a second as the electron settles to the band edge, warming the crystal.',
        ],
        formulas: [
          ['Photon energy', 'E\\,(\\text{eV}) = \\frac{1240}{\\lambda\\,(\\text{nm})}'],
          ['Cut-off wavelength', '\\lambda_{\\max} = \\frac{1240}{E_g}'],
        ],
        examples: [
          ex('Longest wavelength gallium arsenide (1.42 eV) absorbs?', [['Formula.', '\\lambda = 1240 / 1.42'], ['Calculate.', '873\\ \\text{nm}']], '873 nm'),
          ex('A 2.5 eV photon hits silicon. How much energy becomes heat?', [['Kept: the gap.', '1.12\\ \\text{eV}'], ['Lost.', '2.5 - 1.12 = 1.38\\ \\text{eV}'], ['As a share.', '1.38/2.5 = 55\\%']], '1.38 eV, 55%'),
        ],
        practice: [
          pr('Photon energy in eV of 550 nm green light?', 1240 / 550, '1240/λ.', '2.25 eV.', { tol: 0.01 }),
          pr('Cut-off wavelength in nm for a perovskite with E_g = 1.6 eV?', 1240 / 1.6, '1240/E_g.', '775 nm.'),
          pr('A 3 eV photon in a 1.12 eV cell: what percentage of its energy is lost as heat?', ((3 - 1.12) / 3) * 100, '(E − E_g)/E.', '62.7%.', { tol: 0.2 }),
          pr('Band gap in eV of a material that absorbs only below 620 nm?', 1240 / 620, '1240/λ.', '2.0 eV.'),
        ],
      },
      {
        title: 'Panel power and sunlight',
        minutes: 20,
        explain: [
          'Panels are rated at standard test conditions: 1000 W/m² of light at 25 °C. Output is P = η G A, and scales almost in proportion to the light.',
          'Over a day, what matters is energy: peak sun hours (PSH) are the hours of 1000 W/m² that would give the same daily total. Much of the Philippines gets about 4.5–5.5 PSH.',
          'Daily energy ≈ rated power × PSH × a performance factor of about 0.75–0.8 for heat, wiring and dust.',
        ],
        formulas: [
          ['Power', 'P = \\eta\\,G\\,A'],
          ['Daily energy', 'E_{\\text{day}} \\approx P_{\\text{rated}} \\times \\text{PSH} \\times PR'],
        ],
        examples: [
          ex('A 1.7 m² panel at 21%. Rated power?', [['Substitute.', 'P = 0.21 \\times 1000 \\times 1.7'], ['Calculate.', '357\\ \\text{W}']], '357 W'),
          ex('A 5 kW rooftop in Davao (5 PSH, PR 0.78). Daily energy?', [['Multiply.', '5 \\times 5 \\times 0.78'], ['Result.', '19.5\\ \\text{kWh per day}']], '19.5 kWh'),
        ],
        practice: [
          pr('A 2 m² panel at 22% in 1000 W/m². Watts?', 0.22 * 1000 * 2, 'ηGA.', '440 W.'),
          pr('The same panel in 600 W/m² of haze. Watts?', 0.22 * 600 * 2, 'Scale G.', '264 W.'),
          pr('A 3 kW system, 4.8 PSH, PR 0.8. kWh per day?', 3 * 4.8 * 0.8, 'Multiply.', '11.52 kWh.'),
          pr('A household uses 300 kWh a month (30 days). System size in kW at 5 PSH and PR 0.8?', 300 / 30 / (5 * 0.8), 'Daily need ÷ (PSH × PR).', '10 kWh/day ÷ 4 = 2.5 kW.'),
        ],
      },
      {
        title: 'The I–V curve and fill factor',
        minutes: 20,
        explain: [
          'A cell’s current–voltage curve runs from the short-circuit current I_sc (at 0 V) to the open-circuit voltage V_oc (at 0 A). Power is zero at both ends; the best is near the "knee".',
          'The fill factor FF = P_max/(V_oc I_sc) says how square the curve is. Good silicon cells reach 0.8 or more.',
          'Cells are wired in series to add voltage: a 60-cell panel at 0.68 V each gives about 41 V open circuit.',
        ],
        formulas: [
          ['Fill factor', 'FF = \\frac{P_{\\max}}{V_{oc}\\,I_{sc}}'],
          ['Efficiency', '\\eta = \\frac{FF\\,V_{oc}\\,I_{sc}}{G\\,A}'],
        ],
        examples: [
          ex('V_oc = 0.68 V, I_sc = 10 A, FF = 0.80. Maximum power?', [['Multiply.', '0.80 \\times 0.68 \\times 10'], ['Result.', '5.44\\ \\text{W}']], '5.44 W'),
          ex('That cell is 15.6 cm square in 1000 W/m². Efficiency?', [['Area.', '0.156^2 = 0.02434\\ \\text{m}^2'], ['Light in.', '1000 \\times 0.02434 = 24.3\\ \\text{W}'], ['Divide.', '5.44 / 24.3 = 22.4\\%']], '22.4%'),
        ],
        practice: [
          pr('V_oc = 0.7 V, I_sc = 9 A, P_max = 5.2 W. Fill factor?', 5.2 / (0.7 * 9), 'P/(V I).', '0.825.', { tol: 0.002 }),
          pr('72 cells in series at V_oc = 0.68 V. Panel V_oc?', 72 * 0.68, 'Multiply.', '48.96 V.'),
          pr('A cell: V_oc 0.65 V, I_sc 8 A, FF 0.78, area 0.0225 m², in 1000 W/m². Efficiency in %?', ((0.78 * 0.65 * 8) / (1000 * 0.0225)) * 100, 'FF·V·I ÷ (G·A).', '4.056/22.5 = 18.0%.', { tol: 0.05 }),
          pr('If FF drops to 0.70 (dirty contacts) for a 5.44 W cell with FF 0.80, new power in W?', (5.44 * 0.7) / 0.8, 'Power ∝ FF.', '4.76 W.'),
        ],
      },
      {
        title: 'Heat, the tropics and the efficiency limit',
        minutes: 20,
        explain: [
          'Hot cells lose voltage. Silicon panels lose about 0.35–0.45% of power per °C above 25 °C, and on a Philippine rooftop cells easily reach 55–65 °C.',
          'A rough cell temperature is T_cell ≈ T_air + (NOCT − 20) × G/800, where NOCT is about 45 °C for a typical panel.',
          'Shockley and Queisser showed a single junction cannot pass about 33%. Layering two cells with different gaps (a tandem, such as perovskite on silicon) gets past it, with lab records above 33%.',
        ],
        formulas: [
          ['Cell temperature', 'T_{\\text{cell}} \\approx T_{\\text{air}} + (NOCT - 20)\\,\\frac{G}{800}'],
          ['Hot output', 'P = P_{\\text{rated}}\\,[1 - \\gamma\\,(T_{\\text{cell}} - 25)]'],
        ],
        examples: [
          ex('Air 32 °C, G = 1000 W/m², NOCT 45 °C. Cell temperature?', [['Rise.', '(45 - 20) \\times 1000/800 = 31.25'], ['Add.', '32 + 31.25 = 63.3\\ ^\\circ\\text{C}']], 'About 63 °C'),
          ex('A 400 W panel at 63 °C, γ = 0.4%/°C. Output?', [['Loss.', '0.004 \\times (63 - 25) = 0.152'], ['Output.', '400 \\times 0.848 = 339\\ \\text{W}']], 'About 339 W'),
        ],
        practice: [
          pr('Air 30 °C, G = 800 W/m², NOCT 45 °C. Cell temperature in °C?', 30 + 25 * (800 / 800), 'Rise = 25 × G/800.', '55 °C.'),
          pr('A 350 W panel at 55 °C, γ = 0.35%/°C. Output in W?', 350 * (1 - 0.0035 * 30), 'Multiply by 1 − γΔT.', '313.25 W.'),
          pr('A panel loses 15% at 60 °C. What γ in % per °C?', 15 / 35, 'Loss ÷ (60 − 25).', '0.43 %/°C.', { tol: 0.005 }),
          pr('A tandem cell: top cell 20% plus bottom cell 13% of the same light. Total %?', 33, 'They share one beam of light.', '33%.'),
        ],
      },
    ],
  },

  'enrg-004': {
    predict: {
      q: 'Hydrogen and oxygen in a perfect fuel cell. What is the highest voltage one cell can give?',
      options: ['About 1.23 V', 'About 12 V', 'Any voltage, given enough platinum', 'About 0.1 V'],
      answer: 0,
      reveal: 'The voltage is fixed by the Gibbs energy of the reaction: 237 kJ per mole of hydrogen shared over two electrons gives 1.23 V. Real cells give 0.6–0.8 V, so many are connected in series.',
    },
    parts: [
      {
        title: 'The ideal voltage from Gibbs energy',
        minutes: 20,
        explain: [
          'In a fuel cell, each H₂ molecule gives up 2 electrons at the anode; they travel through the outside circuit, and meet oxygen and protons at the cathode to make water.',
          'The most electrical work per mole is the Gibbs energy change, 237.1 kJ/mol for liquid water at 25 °C. Dividing by the charge of 2 moles of electrons gives E = 237 100/(2 × 96 485) = 1.229 V.',
          'The full heat of burning hydrogen is ΔH = 285.8 kJ/mol, which corresponds to 1.48 V. The difference (about 17%) must leave as heat even in a perfect cell.',
        ],
        formulas: [
          ['Ideal voltage', 'E^\\circ = \\frac{-\\Delta G^\\circ}{n F}'],
          ['Thermoneutral voltage', 'E_H = \\frac{-\\Delta H^\\circ}{n F}'],
        ],
        examples: [
          ex('Ideal voltage of the hydrogen cell?', [['Substitute.', 'E = \\frac{237\\,100}{2 \\times 96\\,485}'], ['Calculate.', '1.229\\ \\text{V}']], '1.229 V'),
          ex('Best possible efficiency on the heat of burning?', [['Ratio.', '\\Delta G / \\Delta H = 237.1/285.8'], ['Result.', '0.83']], '83%'),
        ],
        practice: [
          pr('Thermoneutral voltage (ΔH = 285 800 J/mol, n = 2)?', 285800 / (2 * F), 'ΔH/(nF).', '1.481 V.', { tol: 0.002 }),
          pr('A methanol cell: ΔG = −702 kJ/mol, 6 electrons. Ideal voltage?', 702000 / (6 * F), 'ΔG/(nF).', '1.21 V.', { tol: 0.005 }),
          pr('A cell at 0.7 V: efficiency on ΔH, in %?', (0.7 / 1.48) * 100, 'V ÷ 1.48.', '47.3%.', { tol: 0.2 }),
          pr('How many cells in series at 0.68 V give 400 V (round up)?', Math.ceil(400 / 0.68), '400/0.68, then round up.', '588.2 → 589 cells.', { tol: 0.5 }),
        ],
      },
      {
        title: 'Losses under load',
        minutes: 25,
        explain: [
          'As current flows, three losses pull the voltage down. Activation loss: the reactions need a push on the catalyst; it grows with the logarithm of current. Resistance loss: protons through the membrane, i × R. Concentration loss: at high current gas cannot reach the catalyst fast enough.',
          'Current is quoted per area (A/cm²) and resistance as area-specific resistance (Ω·cm²), so that the numbers do not depend on cell size.',
          'Power density is V × i. It peaks before the concentration cliff, but cells are usually run below the peak, where efficiency is higher.',
        ],
        formulas: [
          ['Cell voltage', 'V = E - A\\ln\\frac{i}{i_0} - iR - \\eta_{\\text{conc}}'],
          ['Power density', 'p = V\\,i'],
        ],
        examples: [
          ex('E = 1.229 V, activation loss 0.33 V, i = 0.8 A/cm², R = 0.15 Ω·cm², concentration loss 0.03 V. Voltage?', [['Resistance loss.', '0.8 \\times 0.15 = 0.12\\ \\text{V}'], ['Subtract all.', '1.229 - 0.33 - 0.12 - 0.03 = 0.749\\ \\text{V}']], '0.75 V'),
          ex('Power density there?', [['Multiply.', '0.749 \\times 0.8'], ['Result.', '0.60\\ \\text{W/cm}^2']], '0.60 W/cm²'),
        ],
        practice: [
          pr('Resistance loss in V at 1.2 A/cm² with R = 0.1 Ω·cm²?', 0.12, 'iR.', '0.12 V.'),
          pr('A cell gives 0.65 V at 1.1 A/cm². Power density in W/cm²?', 0.65 * 1.1, 'V × i.', '0.715 W/cm².'),
          pr('A 300 cm² cell at 1.0 A/cm² and 0.68 V. Power in W?', 300 * 1 * 0.68, 'p × area.', '204 W.'),
          pr('Activation loss A ln(i/i₀) with A = 0.05 V, i = 1, i₀ = 0.001 A/cm². Loss in V?', 0.05 * Math.log(1000), 'ln 1000 = 6.91.', '0.345 V.', { tol: 0.002 }),
        ],
      },
      {
        title: 'How much hydrogen?',
        minutes: 20,
        explain: [
          'Each mole of H₂ (2.016 g) gives 2 moles of electrons. So a current I uses H₂ at I/(2F) moles per second.',
          'For many cells in series the same current flows through each, so multiply by the number of cells. Put another way, the hydrogen used depends only on the power drawn and the voltage of each cell.',
          'In practice this gives a handy rule: hydrogen use (kg/h) ≈ power (kW) × 0.0376 / V_cell.',
        ],
        formulas: [
          ['Hydrogen flow', '\\dot n_{H_2} = \\frac{I}{2F}\\ \\text{per cell}'],
          ['Mass rate for power P', '\\dot m = \\frac{P}{V_{\\text{cell}}} \\cdot \\frac{2.016\\times10^{-3}}{2F}\\ \\text{kg/s}'],
        ],
        examples: [
          ex('Hydrogen used per hour by one cell at 100 A?', [['Moles per second.', '100 / (2 \\times 96\\,485) = 5.18\\times10^{-4}'], ['Grams per hour.', '5.18\\times10^{-4} \\times 2.016 \\times 3600 = 3.76\\ \\text{g}']], '3.76 g/h'),
          ex('A 100 kW fuel cell at 0.7 V per cell. Hydrogen in kg/h?', [['Rule.', '100 \\times 0.0376 / 0.7'], ['Result.', '5.37\\ \\text{kg/h}']], 'About 5.4 kg/h'),
        ],
        practice: [
          pr('Grams of H₂ per hour for one cell at 200 A?', (200 / (2 * F)) * 2.016 * 3600, 'I/(2F) × 2.016 × 3600.', '7.52 g/h.', { tol: 0.02 }),
          pr('kg/h of H₂ for a 50 kW fuel cell at 0.65 V per cell?', (50 * 0.0376) / 0.65, 'P × 0.0376 / V.', '2.89 kg/h.', { tol: 0.01 }),
          pr('A car carries 5.6 kg of H₂ and uses 0.9 kg per 100 km. Range in km?', (5.6 / 0.9) * 100, 'Divide.', '622 km.'),
          pr('Electricity in kWh from 1 kg of H₂ (33.3 kWh LHV) at 50% efficiency?', 33.3 * 0.5, 'Multiply.', '16.65 kWh.'),
        ],
      },
      {
        title: 'Making hydrogen: the electrolyser',
        minutes: 20,
        explain: [
          'Running the fuel cell backwards splits water. At least 1.23 V is needed, and in practice 1.7–2.0 V per cell, so an electrolyser uses about 50–55 kWh of electricity per kg of hydrogen.',
          'Most hydrogen today is made from natural gas by steam reforming, which releases about 9–10 kg of CO₂ per kg of H₂ ("grey" hydrogen). Made with renewable electricity it is called "green".',
          'Electrolysers need materials that survive harsh conditions: iridium oxide on the oxygen side of PEM electrolysers is one of the rarest metals on Earth, so cutting the iridium is an active research goal.',
        ],
        formulas: [
          ['Energy per kg', 'E = \\frac{2F\\,V}{2.016\\times10^{-3}}\\ \\text{J/kg}'],
          ['Efficiency (LHV)', '\\eta = \\frac{33.3}{E\\,(\\text{kWh/kg})}'],
        ],
        examples: [
          ex('Electricity per kg of H₂ at 1.8 V per cell?', [['Joules per kg.', '\\frac{2 \\times 96\\,485 \\times 1.8}{0.002016} = 1.723\\times10^{8}'], ['In kWh.', '1.723\\times10^8 / 3.6\\times10^6 = 47.9\\ \\text{kWh}']], 'About 48 kWh/kg'),
          ex('Round trip: electrolyser at 48 kWh/kg, fuel cell giving 16.7 kWh/kg. Efficiency?', [['Divide.', '16.7 / 48'], ['Result.', '0.35']], 'About 35%'),
        ],
        practice: [
          pr('kWh per kg of H₂ at 2.0 V per cell?', (2 * F * 2.0) / 0.002016 / 3.6e6, '2FV/M, then ÷ 3.6×10⁶.', '53.2 kWh/kg.', { tol: 0.1 }),
          pr('An electrolyser uses 52 kWh/kg. Efficiency on LHV (33.3 kWh/kg) in %?', (33.3 / 52) * 100, '33.3/52.', '64.0%.', { tol: 0.1 }),
          pr('A 10 MW electrolyser at 52 kWh/kg. kg of H₂ per hour?', 10000 / 52, 'kW ÷ kWh/kg.', '192 kg/h.'),
          pr('Grey hydrogen at 10 kg CO₂ per kg. CO₂ in kg for a bus using 8 kg of H₂ per 100 km?', 80, 'Multiply.', '80 kg per 100 km.'),
        ],
      },
    ],
  },

  'enrg-005': {
    predict: {
      q: 'A thermoelectric generator runs between 500 K and 300 K, with a good material (ZT = 1). What share of the heat becomes electricity?',
      options: ['About 8%', 'About 40%', 'About 80%', 'About 0.1%'],
      answer: 0,
      reveal: 'Carnot allows 40% between these temperatures, and a ZT = 1 material gets about a fifth of that. Low efficiency, but no moving parts, which is why space probes use them.',
    },
    parts: [
      {
        title: 'The Seebeck voltage',
        minutes: 20,
        explain: [
          'Heat one end of a conductor and its charge carriers move faster there, spreading towards the cold end. Charge builds up until a voltage stops the flow: V = S ΔT.',
          'S is negative in n-type materials (electrons carry it) and positive in p-type (holes). A thermocouple joins two different materials, and the readout is the difference of their S values.',
          'Devices join an n leg and a p leg into a couple, so their voltages add: S_couple = S_p − S_n. Hundreds of couples are wired in series.',
        ],
        formulas: [
          ['Seebeck voltage', 'V = S\\,\\Delta T'],
          ['A device', 'V = N\\,(S_p - S_n)\\,\\Delta T'],
        ],
        examples: [
          ex('One couple: S_p = 200 µV/K, S_n = −200 µV/K, ΔT = 150 K. Voltage?', [['Couple coefficient.', '200 - (-200) = 400\\ \\mu\\text{V/K}'], ['Multiply.', '400\\times10^{-6} \\times 150 = 0.06\\ \\text{V}']], '60 mV'),
          ex('How many such couples for 12 V?', [['Divide.', '12 / 0.06'], ['Result.', '200']], '200 couples'),
        ],
        practice: [
          pr('A type-K thermocouple gives 41 µV/K. Voltage in mV at ΔT = 500 K?', 41e-3 * 500, '41 µV/K × 500.', '20.5 mV.'),
          pr('Couple with S = 400 µV/K, 127 couples, ΔT = 60 K. Voltage in V?', 127 * 400e-6 * 60, 'N × S × ΔT.', '3.05 V.', { tol: 0.005 }),
          pr('A thermocouple reads 4.1 mV at 41 µV/K. Temperature difference in K?', 4.1e-3 / 41e-6, 'V/S.', '100 K.'),
          pr('S_p = 180, S_n = −160 µV/K. Couple S in µV/K?', 340, 'S_p − S_n.', '340 µV/K.'),
        ],
      },
      {
        title: 'The figure of merit ZT',
        minutes: 20,
        explain: [
          'A good thermoelectric needs three things that fight each other: a big Seebeck coefficient S, high electrical conductivity σ (so little power is wasted as heat inside), and low thermal conductivity κ (so the temperature difference survives).',
          'They combine into ZT = S²σT/κ. Metals conduct electricity well but have tiny S and high κ. Insulators have big S but no σ. Heavily doped semiconductors are the sweet spot.',
          'κ has two parts: from electrons and from lattice vibrations. Making nanostructures and heavy, complex crystals scatters the vibrations and lowers κ without hurting σ much.',
        ],
        formulas: [['Figure of merit', 'ZT = \\frac{S^2 \\sigma\\,T}{\\kappa}']],
        examples: [
          ex('Bi₂Te₃: S = 200 µV/K, σ = 1×10⁵ S/m, κ = 1.5 W/(m·K), T = 300 K. ZT?', [['S².', '(2\\times10^{-4})^2 = 4\\times10^{-8}'], ['Multiply and divide.', '\\frac{4\\times10^{-8} \\times 10^5 \\times 300}{1.5} = 0.8']], '0.8'),
          ex('Halve κ to 0.75. New ZT?', [['κ is in the denominator.', 'ZT \\propto 1/\\kappa'], ['Double.', '1.6']], '1.6'),
        ],
        practice: [
          pr('Copper: S = 2 µV/K, σ = 6×10⁷ S/m, κ = 400 W/(m·K), T = 300 K. ZT?', ((2e-6) ** 2 * 6e7 * 300) / 400, 'S²σT/κ.', '1.8×10⁻⁴: hopeless.', { tol: 0.00001 }),
          pr('PbTe: S = 250 µV/K, σ = 5×10⁴ S/m, κ = 1.2 W/(m·K), T = 600 K. ZT?', ((250e-6) ** 2 * 5e4 * 600) / 1.2, 'S²σT/κ.', '1.56.', { tol: 0.01 }),
          pr('S rises from 200 to 240 µV/K, all else equal. Factor by which ZT rises?', (240 / 200) ** 2, 'ZT ∝ S².', '1.44.'),
          pr('ZT = 1 at 300 K with κ = 1.5. What κ would give ZT = 1.5?', 1.0, 'ZT ∝ 1/κ.', '1.5 × 1/1.5 = 1.0 W/(m·K).'),
        ],
      },
      {
        title: 'Efficiency and Carnot',
        minutes: 25,
        explain: [
          'No heat engine beats Carnot: η_C = (T_h − T_c)/T_h, with temperatures in kelvin.',
          'A thermoelectric gets a fraction of Carnot set by ZT: (√(1+ZT) − 1)/(√(1+ZT) + T_c/T_h). With ZT = 1 that is roughly a fifth; with ZT = 3 about two fifths.',
          'So thermoelectrics win where reliability and silence matter more than efficiency: space probes, remote sensors, pipeline monitors, car seat coolers.',
        ],
        formulas: [['Best efficiency', '\\eta = \\frac{T_h - T_c}{T_h} \\cdot \\frac{\\sqrt{1+ZT} - 1}{\\sqrt{1+ZT} + T_c/T_h}']],
        examples: [
          ex('T_h = 500 K, T_c = 300 K, ZT = 1. Efficiency?', [['Carnot.', '200/500 = 0.40'], ['ZT factor.', '\\frac{1.414 - 1}{1.414 + 0.6} = 0.206'], ['Multiply.', '0.40 \\times 0.206 = 0.082']], '8.2%'),
          ex('Truck exhaust: 60 kW of heat at those temperatures. Electricity?', [['Multiply.', '60 \\times 0.082'], ['Result.', '4.9\\ \\text{kW}']], 'About 4.9 kW'),
        ],
        practice: [
          pr('Carnot efficiency in % between 600 K and 300 K?', 50, '(T_h − T_c)/T_h.', '50%.'),
          pr('Efficiency in % at T_h = 600 K, T_c = 300 K, ZT = 1?', teEta(600, 300, 1) * 100, 'Carnot × factor.', '0.5 × 0.216 = 10.8%.', { tol: 0.05 }),
          pr('Efficiency in % at T_h = 400 K, T_c = 300 K, ZT = 0.8?', teEta(400, 300, 0.8) * 100, 'Carnot 25%.', '25% × 0.163 = 4.1%.', { tol: 0.05 }),
          pr('Efficiency in % at T_h = 1000 K, T_c = 300 K, ZT = 0.6?', teEta(1000, 300, 0.6) * 100, 'Carnot 70%.', '70% × 0.169 = 11.8%.', { tol: 0.05 }),
        ],
      },
      {
        title: 'Radioisotope generators',
        minutes: 20,
        explain: [
          'An RTG uses the heat of decaying plutonium-238 (half-life 87.7 years) as the hot side. Each gram gives about 0.57 W of heat.',
          'Output falls as the plutonium decays, P(t) = P₀ × 2^(−t/87.7), and a little faster in practice because the thermoelectric legs age too.',
          'Voyager’s three RTGs gave about 470 W at launch in 1977; by the 2020s they were near 220 W, so instruments have been switched off one by one.',
        ],
        formulas: [
          ['Decay', 'P(t) = P_0 \\cdot 2^{-t/87.7}'],
          ['Electric output', 'P_e = \\eta\\,P_{\\text{heat}}'],
        ],
        examples: [
          ex('An RTG has 7.8 kg of Pu-238. Heat output?', [['Multiply.', '7800 \\times 0.57'], ['Result.', '4446\\ \\text{W}']], 'About 4.4 kW of heat'),
          ex('Heat after 45 years, from 4446 W?', [['Halving factor.', '2^{-45/87.7} = 0.701'], ['Multiply.', '4446 \\times 0.701 = 3117\\ \\text{W}']], 'About 3.1 kW'),
        ],
        practice: [
          pr('An RTG gives 110 W of electricity from 2000 W of heat. Efficiency in %?', 5.5, 'Out ÷ in.', '5.5%.'),
          pr('Fraction of Pu-238 heat left after 20 years?', 2 ** (-20 / 87.7), '2^(−t/87.7).', '0.854.', { tol: 0.002 }),
          pr('Heat in W from 4.8 kg of Pu-238?', 4800 * 0.57, 'Multiply by 0.57.', '2736 W.'),
          pr('Years for the heat to fall to 75%?', -87.7 * Math.log2(0.75), 't = −87.7 log₂ 0.75.', '36.4 years.', { tol: 0.2 }),
        ],
      },
    ],
  },

  'enrg-006': {
    predict: {
      q: 'Lower the separator temperature in a geothermal plant and more water flashes to steam. What happens to the water left behind?',
      options: ['It becomes richer in silica and can start depositing scale', 'It becomes purer', 'Nothing changes in it', 'It turns entirely to steam'],
      answer: 0,
      reveal: 'Steam carries away water but almost no silica, so the remaining brine is more concentrated. It is also cooler, and cool water holds less silica. Past saturation, silica deposits in pipes and wells.',
    },
    parts: [
      {
        title: 'Flashing: how much becomes steam',
        minutes: 25,
        explain: [
          'Reservoir water at 250 °C stays liquid because it is under high pressure. In the separator the pressure drops and part of it boils (flashes) until what is left is at the separator temperature.',
          'Energy balance: the enthalpy of the well water equals that of the steam plus the brine. From steam tables: x = (h_res − h_f)/h_fg, with h_f the liquid enthalpy and h_fg the heat to boil it at the separator temperature.',
          'Useful values (kJ/kg): at 250 °C h_f = 1085.8; at 160 °C h_f = 675.5, h_fg = 2082.0; at 120 °C h_f = 503.8, h_fg = 2202.1; at 200 °C h_f = 852.3, h_fg = 1939.7.',
        ],
        formulas: [['Flash fraction', 'x = \\frac{h_{\\text{res}} - h_f(T_s)}{h_{fg}(T_s)}']],
        examples: [
          ex('250 °C reservoir water flashed at 160 °C. Steam fraction?', [['Numerator.', '1085.8 - 675.5 = 410.3'], ['Divide.', '410.3 / 2082.0 = 0.197']], '19.7%'),
          ex('A well gives 100 kg/s of 250 °C water. Steam at 160 °C?', [['Flash fraction.', '0.197'], ['Multiply.', '100 \\times 0.197 = 19.7\\ \\text{kg/s}']], '19.7 kg/s of steam'),
        ],
        practice: [
          pr('Steam fraction flashing at 200 °C?', (1085.8 - 852.3) / 1939.7, '(1085.8 − 852.3)/1939.7.', '0.120.', { tol: 0.002 }),
          pr('Steam fraction flashing at 120 °C?', (1085.8 - 503.8) / 2202.1, '(1085.8 − 503.8)/2202.1.', '0.264.', { tol: 0.002 }),
          pr('Brine fraction left at 160 °C?', 1 - (1085.8 - 675.5) / 2082.0, '1 − x.', '0.803.', { tol: 0.002 }),
          pr('A plant needs 50 kg/s of steam at 160 °C. Well flow in kg/s?', 50 / ((1085.8 - 675.5) / 2082.0), 'Steam ÷ x.', '50/0.197 = 254 kg/s.', { tol: 1 }),
        ],
      },
      {
        title: 'Silica: concentration and solubility',
        minutes: 25,
        explain: [
          'Deep, hot water is in contact with quartz for thousands of years and holds the quartz solubility: log₁₀ C = 5.19 − 1309/T (T in K, C in mg/kg). At 250 °C that is about 487 mg/kg.',
          'Flashing removes water but not silica, so the brine concentration becomes C₀/(1 − x).',
          'Silica that comes out of brine forms amorphous (glassy) silica, which is more soluble than quartz: log₁₀ S = 4.52 − 731/T. The saturation ratio SSI = C/S tells you if it will deposit: above 1, it can.',
        ],
        formulas: [
          ['Concentration', 'C = \\frac{C_0}{1 - x}'],
          ['Amorphous silica solubility', '\\log_{10} S = 4.52 - \\frac{731}{T}'],
          ['Saturation ratio', 'SSI = C/S'],
        ],
        examples: [
          ex('Brine silica after flashing at 160 °C (x = 0.197, C₀ = 487 mg/kg)?', [['Divide.', '487 / (1 - 0.197) = 487 / 0.803'], ['Result.', '607\\ \\text{mg/kg}']], '607 mg/kg'),
          ex('Amorphous silica solubility at 160 °C and the SSI?', [['Temperature in K.', '160 + 273.15 = 433.15'], ['Solubility.', '10^{4.52 - 731/433.15} = 10^{2.832} = 680'], ['SSI.', '607 / 680 = 0.89']], 'SSI 0.89: no scale'),
        ],
        practice: [
          pr('Brine silica in mg/kg after flashing at 120 °C (x = 0.264)?', 487 / (1 - 0.264), 'C₀/(1 − x).', '662 mg/kg.', { tol: 1 }),
          pr('Amorphous silica solubility in mg/kg at 120 °C?', amorph(120), '10^(4.52 − 731/393.15).', '458 mg/kg.', { tol: 2 }),
          pr('SSI at 120 °C (662 mg/kg brine)?', 662 / amorph(120), 'C/S.', '1.45: scale forms.', { tol: 0.01 }),
          pr('Quartz solubility in mg/kg at 280 °C (553.15 K)?', 10 ** (5.19 - 1309 / 553.15), '10^(5.19 − 1309/553.15).', 'About 666 mg/kg.', { tol: 2 }),
        ],
      },
      {
        title: 'Corrosion in geothermal fluids',
        minutes: 20,
        explain: [
          'Steel in hot brine loses metal at a rate given in mm per year. Pipes are made thicker than strength needs by a corrosion allowance: allowance = rate × design life.',
          'Some Philippine wells carry acidic fluid (pH below 4) from volcanic gases. Carbon steel can lose several mm a year there, so engineers use acid-resistant alloys, liners, or neutralise the fluid with caustic soda.',
          'Hydrogen sulfide also makes high-strength steels brittle (sulfide stress cracking), so hardness limits are set for parts in sour fluid.',
        ],
        formulas: [
          ['Corrosion allowance', 't_{\\text{allow}} = r \\times L'],
          ['Life of a wall', 'L = \\frac{t_{\\text{wall}} - t_{\\min}}{r}'],
        ],
        examples: [
          ex('Carbon steel corrodes at 0.2 mm/yr for a 25-year plant. Allowance?', [['Multiply.', '0.2 \\times 25'], ['Result.', '5\\ \\text{mm}']], '5 mm'),
          ex('A 12 mm wall needs at least 6 mm for strength. Life at 0.4 mm/yr?', [['Spare metal.', '12 - 6 = 6\\ \\text{mm}'], ['Divide.', '6 / 0.4 = 15\\ \\text{years}']], '15 years'),
        ],
        practice: [
          pr('Allowance in mm at 0.15 mm/yr for 30 years?', 0.15 * 30, 'r × L.', '4.5 mm.'),
          pr('In acid fluid steel loses 3 mm/yr. Life in years of 9 mm of spare metal?', 3, 'Divide.', '3 years.'),
          pr('A titanium liner corrodes at 0.005 mm/yr. Metal lost in mm over 30 years?', 0.005 * 30, 'Multiply.', '0.15 mm.'),
          pr('A pipe lost 2.4 mm in 8 years. Rate in mm/yr?', 2.4 / 8, 'Loss ÷ time.', '0.3 mm/yr.'),
        ],
      },
      {
        title: 'Power and the balance',
        minutes: 20,
        explain: [
          'A geothermal steam turbine typically needs about 2 kg/s of steam for each MW of electricity (about 7 tonnes per hour).',
          'So the separator choice sets power: lower temperature gives more steam but at lower pressure, and the brine gets closer to scaling.',
          'Plants often add a second, lower-pressure flash or a binary unit (heating a low-boiling fluid) to use the brine’s remaining heat, but only if the brine is treated for silica first.',
        ],
        formulas: [
          ['Electric power (rough)', 'P\\,(\\text{MW}) \\approx \\frac{\\dot m_{\\text{steam}}\\,(\\text{kg/s})}{2}'],
          ['Steam from the wells', '\\dot m_{\\text{steam}} = x\\,\\dot m_{\\text{well}}'],
        ],
        examples: [
          ex('Wells give 500 kg/s at 250 °C; flash at 160 °C. Rough power?', [['Steam.', '500 \\times 0.197 = 98.5\\ \\text{kg/s}'], ['Power.', '98.5 / 2 = 49\\ \\text{MW}']], 'About 49 MW'),
          ex('Flash at 200 °C instead (x = 0.120). Steam needed per MW is about 1.7 kg/s at that higher pressure. Power?', [['Steam.', '500 \\times 0.120 = 60\\ \\text{kg/s}'], ['Power.', '60 / 1.7 = 35\\ \\text{MW}']], 'About 35 MW'),
        ],
        practice: [
          pr('Steam in kg/s from 300 kg/s of well flow at x = 0.197?', 300 * 0.197, 'x × flow.', '59.1 kg/s.'),
          pr('Rough MW from 59.1 kg/s of steam at 2 kg/s per MW?', 59.1 / 2, 'Divide by 2.', '29.6 MW.', { tol: 0.1 }),
          pr('Well flow in kg/s needed for 20 MW at 2 kg/s per MW and x = 0.197?', 40 / 0.197, 'Steam 40 kg/s, ÷ x.', '203 kg/s.', { tol: 1 }),
          pr('Brine flow in kg/s left from 300 kg/s at x = 0.197?', 300 * (1 - 0.197), '(1 − x) × flow.', '240.9 kg/s.', { tol: 0.2 }),
        ],
      },
    ],
  },
};
