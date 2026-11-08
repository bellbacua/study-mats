// Metals and Metallurgy specialization: each class split into parts.
// Practice answers are computed in place so the numbers cannot drift from the working.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

const FE = 55.85;
const O = 16.0;
const CC = 12.01;
const CAO = 56.08;
const CACO3 = 100.09;
const CO2 = 44.01;
const NI = 58.69;
const ACID = 98.08;
const fe2o3 = (2 * FE) / (2 * FE + 3 * O);
const QR = 130000 / 8.314;
const K = (c) => c + 273.15;

export const SPEC_METALS = {
  'met-001': {
    predict: {
      q: 'Oxygen is blown onto the hot metal at a steady rate. How does the carbon content fall over time?',
      options: ['In a straight line at first, then more and more slowly near the end', 'In a straight line all the way to zero', 'Quickly at first, then in a straight line', 'Hardly at all, then all at once at the end'],
      answer: 0,
      reveal: 'While there is plenty of carbon, the oxygen supply sets the pace, so carbon falls in a straight line. Below about 0.3% the carbon atoms must travel to the reaction zone, and the last fraction of a percent comes off slowly.',
    },
    parts: [
      {
        title: 'Iron ore and how much iron it holds',
        minutes: 20,
        explain: [
          'Iron ore is rock rich in iron oxide, usually hematite (Fe₂O₃) or magnetite (Fe₃O₄). To plan a plant you need to know how much iron each tonne of ore can give.',
          'The mass fraction of iron in a pure oxide comes from the formula: the mass of the iron atoms divided by the mass of the whole formula unit. Real ore is never pure oxide, so you multiply by the ore grade (the share that is the oxide), and by the recovery (the share of iron the process actually captures).',
          'These small sums decide how many ships of ore a steelworks must buy each year.',
        ],
        formulas: [
          ['Iron in hematite', 'w_{\\text{Fe}} = \\frac{2(55.85)}{2(55.85) + 3(16.00)} = 0.6994'],
          ['Ore needed', 'm_{\\text{ore}} = \\frac{m_{\\text{Fe}}}{w_{\\text{Fe in ore}} \\times \\text{recovery}}'],
        ],
        examples: [
          ex('What percentage of hematite (Fe₂O₃) is iron by mass?', [['Mass of two iron atoms.', '2 \\times 55.85 = 111.70'], ['Mass of the formula unit.', '111.70 + 3 \\times 16.00 = 159.70'], ['Divide.', '111.70 / 159.70 = 0.6994']], '69.9%'),
          ex('An ore is 60% iron. The plant recovers 95% of it. How many tonnes of ore give 1000 t of iron?', [['Iron captured from each tonne of ore.', '0.60 \\times 0.95 = 0.57\\ \\text{t}'], ['Divide the target by that.', '1000 / 0.57 = 1754']], 'About 1754 t of ore'),
        ],
        practice: [
          pr('What percentage of magnetite (Fe₃O₄) is iron by mass?', (100 * 3 * FE) / (3 * FE + 4 * O), 'Three iron atoms over the whole formula mass.', '3 × 55.85 = 167.55; total 231.55; 167.55/231.55 = 72.4%.'),
          pr('An ore is 80% hematite and the rest is rock with no iron. What percentage of the ore is iron?', 80 * fe2o3, 'Grade × iron fraction of hematite.', '0.80 × 69.94% = 55.9%.'),
          pr('How many tonnes of that ore (80% hematite) give 500 t of iron if all of it is recovered?', 500 / (0.8 * fe2o3), 'Divide by the iron fraction of the ore.', '500 / 0.5595 = 894 t.'),
          pr('An ore is 62% iron and the plant recovers 96%. How many tonnes of ore per tonne of iron?', 1 / (0.62 * 0.96), 'Iron captured per tonne of ore first.', '0.62 × 0.96 = 0.595, so 1/0.595 = 1.68 t.'),
        ],
      },
      {
        title: 'Inside the blast furnace',
        minutes: 25,
        explain: [
          'Coke burns at the bottom of the furnace in hot air, but there is so much carbon that it makes carbon monoxide (CO) rather than CO₂. The CO gas rises through the falling ore and takes its oxygen away.',
          'The overall change is Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂. For every two iron atoms you need three CO molecules, so for every mole of iron you need 1.5 moles of CO.',
          'Molten iron trickles down and collects in the hearth; it soaks up carbon on the way, ending at about 4.5% carbon. Every tonne of iron made this way releases well over a tonne of CO₂, which is why steelmakers are now testing hydrogen in place of carbon.',
        ],
        formulas: [
          ['Reduction by carbon monoxide', '\\text{Fe}_2\\text{O}_3 + 3\\,\\text{CO} \\to 2\\,\\text{Fe} + 3\\,\\text{CO}_2'],
          ['Moles from mass', 'n = \\frac{m}{M}'],
        ],
        examples: [
          ex('How many kilograms of CO are needed to make 1 t of iron by this reaction?', [['Moles of iron in 1 t.', 'n_{\\text{Fe}} = 10^6 / 55.85 = 17\\,905\\ \\text{mol}'], ['1.5 mol of CO per mol of Fe.', 'n_{\\text{CO}} = 1.5 \\times 17\\,905 = 26\\,858\\ \\text{mol}'], ['Convert to mass (CO is 28.01 g/mol).', '26\\,858 \\times 28.01 = 752\\,000\\ \\text{g}']], 'About 752 kg of CO'),
          ex('How much CO₂ does that release per tonne of iron?', [['One CO₂ for each CO.', 'n_{\\text{CO}_2} = 26\\,858\\ \\text{mol}'], ['CO₂ is 44.01 g/mol.', '26\\,858 \\times 44.01 = 1\\,182\\,000\\ \\text{g}']], 'About 1.18 t of CO₂'),
        ],
        practice: [
          pr('How many moles of iron are in 1 kg of iron?', 1000 / FE, 'n = m/M with m in grams.', '1000 / 55.85 = 17.9 mol.'),
          pr('How many moles of CO are needed to reduce 2 mol of Fe₂O₃?', 6, 'Three CO for each Fe₂O₃.', '2 × 3 = 6 mol.'),
          pr('How many kilograms of CO are needed to make 100 kg of iron?', (((100000 / FE) * 1.5) * 28.01) / 1000, 'Moles of iron, then × 1.5, then × 28.01 g/mol.', '1790.5 mol Fe × 1.5 = 2686 mol CO × 28.01 g = 75.2 kg.'),
          pr('Each CO molecule comes from one carbon atom. How many kilograms of carbon make the CO for 1 t of iron?', (26858 * CC) / 1000, 'One mole of carbon per mole of CO.', '26 858 mol × 12.01 g/mol = 323 kg. Real furnaces burn about 350–500 kg of coke per tonne, because they also need heat.'),
        ],
      },
      {
        title: 'Slag: getting rid of the rock',
        minutes: 20,
        explain: [
          'Ore always carries some rock, mostly silica (SiO₂), which melts only at about 1700 °C. Limestone (CaCO₃) is fed in with the ore. In the heat it breaks into lime (CaO) and CO₂, and the lime joins the silica to make a runny, glassy slag that floats on the iron and is tapped off.',
          'Furnace operators watch the basicity, the ratio of CaO to SiO₂ in the slag. A basicity of about 1.0 to 1.2 gives a slag that flows well and also carries away sulfur.',
          'Slag is not waste: ground blast-furnace slag goes into cement, including some Philippine blended cements.',
        ],
        formulas: [
          ['Lime from limestone', '\\text{CaCO}_3 \\to \\text{CaO} + \\text{CO}_2'],
          ['Basicity', 'B = \\frac{m_{\\text{CaO}}}{m_{\\text{SiO}_2}}'],
        ],
        examples: [
          ex('1000 t of ore holds 6% silica. How much lime gives a basicity of 1.0?', [['Silica in the charge.', '0.06 \\times 1000 = 60\\ \\text{t}'], ['Basicity 1.0 means equal masses.', 'm_{\\text{CaO}} = 1.0 \\times 60 = 60\\ \\text{t}']], '60 t of CaO'),
          ex('How much limestone gives that 60 t of CaO?', [['Molar masses: CaCO₃ 100.09, CaO 56.08.', ''], ['Scale by the mass ratio.', '60 \\times \\frac{100.09}{56.08} = 107.1']], 'About 107 t of limestone'),
        ],
        practice: [
          pr('A slag holds 40 t of CaO and 36 t of SiO₂. What is its basicity?', 40 / 36, 'CaO ÷ SiO₂.', '40/36 = 1.11.'),
          pr('How many tonnes of CaO are needed for 25 t of silica at basicity 1.2?', 30, 'B × silica.', '1.2 × 25 = 30 t.'),
          pr('How many tonnes of limestone give 30 t of CaO?', (30 * CACO3) / CAO, 'Multiply by 100.09/56.08.', '30 × 1.785 = 53.5 t.'),
          pr('How many tonnes of CO₂ are released when that limestone breaks down?', (30 * CO2) / CAO, 'One CO₂ for each CaO; use 44.01/56.08.', '30 × 44.01/56.08 = 23.5 t.'),
        ],
      },
      {
        title: 'From hot metal to steel: burning off carbon',
        minutes: 25,
        explain: [
          'In the basic oxygen furnace, oxygen from a water-cooled lance hits the molten iron at supersonic speed. Carbon burns mostly to CO gas: C + ½ O₂ → CO. The reaction gives off so much heat that scrap steel is added to keep the bath from overheating.',
          'To plan a blow you work out how much carbon must go and how much oxygen that needs. A gas at 0 °C and 1 atm takes up 22.4 litres per mole, so moles can be turned into cubic metres of oxygen.',
          'While carbon is plentiful, the carbon content falls at a steady rate set by the oxygen flow. Near the end it slows down, which is the part of the blow that operators watch most closely.',
        ],
        formulas: [
          ['Burning carbon to CO', '\\text{C} + \\tfrac{1}{2}\\,\\text{O}_2 \\to \\text{CO}'],
          ['Carbon removed', 'm_{\\text{C}} = m_{\\text{heat}}\\,(\\%\\text{C}_{\\text{start}} - \\%\\text{C}_{\\text{end}})/100'],
          ['Gas volume at 0 °C, 1 atm', 'V = n \\times 0.0224\\ \\text{m}^3/\\text{mol}'],
        ],
        examples: [
          ex('A 150 t heat goes from 4.4% to 0.05% carbon. How much carbon is removed?', [['Drop in carbon.', '4.4 - 0.05 = 4.35\\%'], ['Of 150 t.', '150 \\times 0.0435 = 6.525\\ \\text{t}']], '6.5 t of carbon'),
          ex('How many cubic metres of oxygen burn that carbon to CO?', [['Moles of carbon.', '6.525 \\times 10^6 / 12.01 = 543\\,300\\ \\text{mol}'], ['Half a mole of O₂ per mole of C.', '271\\,650\\ \\text{mol O}_2'], ['Volume.', '271\\,650 \\times 0.0224 = 6085\\ \\text{m}^3']], 'About 6100 m³ of oxygen'),
        ],
        practice: [
          pr('A 200 t heat goes from 4.5% to 0.1% carbon. How many tonnes of carbon are removed?', 200 * 0.044, 'Drop in % × mass ÷ 100.', '200 × 0.044 = 8.8 t.'),
          pr('How many moles of O₂ burn 1 kg of carbon to CO?', 1000 / CC / 2, 'Moles of C first, then halve.', '1000/12.01 = 83.3 mol C, so 41.6 mol O₂.'),
          pr('How many cubic metres of O₂ (at 0 °C, 1 atm) burn one tonne of carbon to CO?', (1e6 / CC / 2) * 0.0224, 'Moles of O₂ × 0.0224.', '41 632 mol × 0.0224 = 933 m³.'),
          pr('Carbon falls at 0.35% per minute. How many minutes to go from 4.2% to 0.3%?', (4.2 - 0.3) / 0.35, 'Drop ÷ rate.', '3.9/0.35 = 11.1 minutes.'),
        ],
      },
    ],
  },

  'met-002': {
    predict: {
      q: 'As a furnace gets hotter, how does the number of metal oxides that carbon can reduce change?',
      options: ['It grows: carbon can reduce more oxides the hotter it gets', 'It shrinks: carbon works best when cool', 'It stays the same at every temperature', 'Carbon cannot reduce any metal oxide'],
      answer: 0,
      reveal: 'Carbon’s line on the Ellingham diagram slopes down while the metal lines slope up, so it crosses under more and more of them as the temperature rises. That is why furnaces are hot.',
    },
    parts: [
      {
        title: 'ΔG° as a straight line in temperature',
        minutes: 20,
        explain: [
          'You met ΔG = ΔH − TΔS in thermodynamics. For a reaction between pure substances at standard pressure, ΔH° and ΔS° change only slowly with temperature, so ΔG° plotted against T is very nearly a straight line: ΔH° is where it meets T = 0 and −ΔS° is its slope.',
          'Ellingham wrote every reaction with one mole of O₂, so the lines can be compared fairly. Burning a metal turns a gas (O₂) into a solid oxide, so ΔS° is negative and the line rises as T grows.',
          'Where a line reaches ΔG° = 0, the oxide is no longer stable and breaks down by itself. For most metals that is far above any furnace, but silver oxide falls apart at only about 190 °C.',
        ],
        formulas: [
          ['The Ellingham line', '\\Delta G^\\circ(T) = \\Delta H^\\circ - T\\,\\Delta S^\\circ'],
          ['Oxide breaks down where', 'T = \\frac{\\Delta H^\\circ}{\\Delta S^\\circ}'],
        ],
        examples: [
          ex('For 2Ni + O₂ → 2NiO, ΔH° = −479.4 kJ and ΔS° = −0.172 kJ/K. Find ΔG° at 1200 K.', [['Substitute.', '\\Delta G^\\circ = -479.4 - 1200(-0.172)'], ['Work it out.', '-479.4 + 206.4 = -273.0']], '−273 kJ'),
          ex('At what temperature would NiO break down by itself?', [['Set ΔG° = 0.', '0 = -479.4 + 0.172\\,T'], ['Solve.', 'T = 479.4/0.172 = 2787\\ \\text{K}']], 'About 2790 K'),
        ],
        practice: [
          pr('For 2Fe + O₂ → 2FeO, ΔG° ≈ −528 + 0.130T kJ. Find ΔG° at 800 K, in kJ.', -528 + 0.13 * 800, 'Substitute T = 800.', '−528 + 104 = −424 kJ.'),
          pr('For 2C + O₂ → 2CO, ΔG° ≈ −221 − 0.179T kJ. Find ΔG° at 1500 K, in kJ.', -221 - 0.179 * 1500, 'Note the minus sign on the T term.', '−221 − 268.5 = −489.5 kJ.'),
          pr('For Si + O₂ → SiO₂, ΔG° ≈ −911 + 0.180T kJ. By how many kJ does ΔG° rise for each kelvin?', 0.18, 'The slope is −ΔS°.', '0.180 kJ per K.'),
          pr('For 4Ag + O₂ → 2Ag₂O, ΔH° ≈ −62 kJ and ΔS° ≈ −0.133 kJ/K. Above what temperature, in K, does silver oxide break down?', 62 / 0.133, 'Set ΔG° = 0.', 'T = 62/0.133 = 466 K, about 193 °C.'),
        ],
      },
      {
        title: 'Reading the crossings',
        minutes: 25,
        explain: [
          'Subtract two Ellingham reactions and the O₂ cancels. For carbon and iron oxide, ½[(2C + O₂ → 2CO) − (2Fe + O₂ → 2FeO)] gives FeO + C → Fe + CO, and its ΔG° is half the gap between the lines.',
          'So carbon can reduce an oxide wherever carbon’s line lies below it. The temperature where two lines cross is the lowest temperature at which the reduction can run.',
          'You find it by setting the two straight lines equal. The answer tells a plant engineer how hot the furnace must be, before any money is spent on testing.',
        ],
        formulas: [
          ['Crossing temperature', 'T^* = \\frac{\\Delta H_{\\text{oxide}} - \\Delta H_{\\text{C}}}{\\Delta S_{\\text{oxide}} - \\Delta S_{\\text{C}}}'],
          ['Reduction by carbon (per mole of CO)', '\\Delta G^\\circ_{\\text{red}} = \\tfrac{1}{2}\\left(\\Delta G^\\circ_{\\text{C}} - \\Delta G^\\circ_{\\text{oxide}}\\right)'],
        ],
        examples: [
          ex('Using −528 + 0.130T (FeO) and −221 − 0.179T (CO), find where carbon starts to reduce FeO.', [['Set the lines equal.', '-528 + 0.130T = -221 - 0.179T'], ['Collect T.', '0.309\\,T = 307'], ['Solve.', 'T = 993.5\\ \\text{K}']], 'About 994 K (720 °C)'),
          ex('Find ΔG° for FeO + C → Fe + CO at 1200 K.', [['Carbon line.', '-221 - 0.179(1200) = -435.8'], ['FeO line.', '-528 + 0.130(1200) = -372.0'], ['Half the difference.', '\\tfrac{1}{2}(-435.8 + 372.0) = -31.9']], '−31.9 kJ: it runs'),
        ],
        practice: [
          pr('NiO line: −479.4 + 0.172T. Carbon line: −221 − 0.179T. Above what temperature, in K, can carbon reduce NiO?', (479.4 - 221) / (0.172 + 0.179), 'Set them equal and solve.', '258.4/0.351 = 736 K.'),
          pr('SiO₂ line: −911 + 0.180T. Above what temperature, in K, can carbon reduce silica?', (911 - 221) / (0.18 + 0.179), 'Same method.', '690/0.359 = 1922 K.'),
          pr('At 1000 K, find ΔG° in kJ for NiO + C → Ni + CO.', 0.5 * (-221 - 179 - (-479.4 + 172)), 'Half of (carbon line − NiO line) at 1000 K.', '½(−400 + 307.4) = −46.3 kJ.'),
          pr('Convert the FeO crossing (993.5 K) to °C.', 993.5 - 273.15, 'Subtract 273.15.', '720.4 °C.'),
        ],
      },
      {
        title: 'Nickel laterite: grades and tonnages',
        minutes: 20,
        explain: [
          'Philippine nickel ore is laterite, a soft red earth formed when tropical rain weathers rock over millions of years. It holds only about 1–2% nickel, so very large tonnages must be dug, shipped and processed.',
          'Laterite is also wet: often 30–35% of the mined mass is water. Grades are quoted on a dry basis, so you must remove the water first when you work out how much nickel a ship holds.',
          'Combine the grade, the moisture and the recovery to plan a mine. A plant that makes 30 000 t of nickel a year moves millions of tonnes of earth.',
        ],
        formulas: [
          ['Nickel contained', 'm_{\\text{Ni}} = m_{\\text{wet}}(1 - \\text{moisture}) \\times \\text{grade}'],
          ['Ore per tonne of nickel', 'm_{\\text{dry ore}} = \\frac{1}{\\text{grade} \\times \\text{recovery}}'],
        ],
        examples: [
          ex('Ore grades 1.3% nickel and the plant recovers 90%. How many dry tonnes of ore per tonne of nickel?', [['Nickel recovered per tonne of ore.', '0.013 \\times 0.90 = 0.0117\\ \\text{t}'], ['Invert.', '1/0.0117 = 85.5']], '85.5 dry tonnes'),
          ex('If the ore is mined with 30% moisture, how many wet tonnes is that?', [['Dry is 70% of wet.', 'm_{\\text{wet}} = 85.5/0.70'], ['Divide.', '= 122.1']], 'About 122 wet tonnes'),
        ],
        practice: [
          pr('How many tonnes of nickel come from 10 000 dry tonnes of 1.5% ore at 92% recovery?', 10000 * 0.015 * 0.92, 'Tonnes × grade × recovery.', '10 000 × 0.015 × 0.92 = 138 t.'),
          pr('How many dry tonnes of 1.2% ore contain 1 t of nickel?', 1 / 0.012, '1 ÷ grade.', '1/0.012 = 83.3 t.'),
          pr('How many wet tonnes of 1.2% ore (35% moisture) give 1 t of nickel at 90% recovery?', 1 / (0.012 * 0.9) / 0.65, 'Dry tonnes first, then divide by 0.65.', '1/(0.0108) = 92.6 dry t; 92.6/0.65 = 142.5 wet t.'),
          pr('A ship carries 50 000 wet tonnes of ore with 30% moisture and 1.6% nickel (dry basis). How many tonnes of nickel does it hold?', 50000 * 0.7 * 0.016, 'Remove the water, then apply the grade.', '50 000 × 0.70 × 0.016 = 560 t.'),
        ],
      },
      {
        title: 'Leaching with acid (HPAL)',
        minutes: 25,
        explain: [
          'Smelting laterite would mean melting tonnes of rock for each kilogram of nickel. Instead, plants at Coral Bay (Palawan) and Taganito (Surigao) pump the ore as a slurry into autoclaves with sulfuric acid at about 250 °C and 40 atmospheres. Nickel and cobalt dissolve as sulfates: NiO + H₂SO₄ → NiSO₄ + H₂O.',
          'Most of the acid is not used by the nickel at all. Iron, magnesium and aluminium in the ore dissolve too, so a plant may use 250–400 kg of acid for each tonne of ore. Acid is one of the biggest costs, and it is made on site by burning sulfur.',
          'Under the high temperature most of the iron settles back out as hematite, which is why the leftover tailings are red.',
        ],
        formulas: [
          ['Dissolving nickel', '\\text{NiO} + \\text{H}_2\\text{SO}_4 \\to \\text{NiSO}_4 + \\text{H}_2\\text{O}'],
          ['Acid per kg of nickel (stoichiometric)', '\\frac{98.08}{58.69} = 1.671\\ \\text{kg/kg}'],
        ],
        examples: [
          ex('How many kilograms of H₂SO₄ does it take, at the very least, to dissolve 1 kg of nickel as NiSO₄?', [['One mole of acid per mole of nickel.', ''], ['Mass ratio.', '98.08/58.69 = 1.671']], '1.67 kg'),
          ex('Ore grades 1.3% Ni, recovery is 90% and the plant uses 300 kg of acid per tonne of ore. How many tonnes of acid per tonne of nickel?', [['Nickel recovered per tonne of ore.', '13 \\times 0.90 = 11.7\\ \\text{kg}'], ['Acid per kg of nickel.', '300/11.7 = 25.6']], 'About 25.6 t of acid per tonne of nickel'),
        ],
        practice: [
          pr('How many kilograms of H₂SO₄ are needed, at least, to dissolve 1 kg of cobalt (58.93 g/mol) as CoSO₄?', ACID / 58.93, 'One mole of acid per mole of cobalt.', '98.08/58.93 = 1.664 kg.'),
          pr('How many kilograms of NiSO₄ (154.76 g/mol) form from 1 kg of nickel?', 154.76 / NI, 'Mass ratio of sulfate to metal.', '154.76/58.69 = 2.64 kg.'),
          pr('Ore grades 1.2% Ni, recovery is 92% and acid use is 280 kg per tonne of ore. How many tonnes of acid per tonne of nickel?', 0.28 / (0.012 * 0.92), 'Nickel recovered per tonne of ore first.', '0.012 × 0.92 = 0.01104 t; 0.28/0.01104 = 25.4 t.'),
          pr('Of the 280 kg of acid used per tonne of 1.2% ore, what percentage is needed by the nickel itself (all of it dissolved)?', (100 * 12 * (ACID / NI)) / 280, '12 kg of nickel × 1.671.', '12 × 1.671 = 20.1 kg; 20.1/280 = 7.2%.'),
        ],
      },
    ],
  },

  'met-003': {
    predict: {
      q: 'Which adds more strength to copper per atom added: nickel (2% smaller than copper) or tin (18% bigger)?',
      options: ['Tin, because its bigger misfit strains the crystal more', 'Nickel, because it fits so well', 'Both the same, since both are metals', 'Neither adds any strength'],
      answer: 0,
      reveal: 'A badly fitting atom distorts the crystal around it, and those distortions get in the way of slipping dislocations. Tin strengthens copper far more per atom, but only about 9% of it will stay dissolved.',
    },
    parts: [
      {
        title: 'Size misfit and the 15% rule',
        minutes: 20,
        explain: [
          'Picture a crystal as a tray of equal marbles packed tight. Swap one for a marble of a slightly different size and the tray barely notices. Swap in one that is much bigger, and the neighbours are pushed out of place. The crystal pays for that strain in energy, so only a few big atoms are accepted.',
          'Hume-Rothery found the limit at about 15%: if the two atomic radii differ by more than that, only a little of one metal dissolves in the other. Below 15%, wide solubility is possible but not certain, because the crystal structures, electronegativities and valences should also match.',
          'The misfit is measured from the host (the main metal).',
        ],
        formulas: [['Size misfit', '\\delta = \\frac{r_{\\text{solute}} - r_{\\text{host}}}{r_{\\text{host}}} \\times 100\\%']],
        examples: [
          ex('Nickel (0.125 nm) in copper (0.128 nm). Find the misfit.', [['Difference.', '0.125 - 0.128 = -0.003'], ['Divide by the host.', '-0.003/0.128 = -0.023']], '−2.3%: an easy fit'),
          ex('Silver (0.144 nm) in copper. Find the misfit and say what it suggests.', [['Difference.', '0.144 - 0.128 = 0.016'], ['Divide.', '0.016/0.128 = 0.125']], '+12.5%: close to the limit. In fact only about 5% silver dissolves in copper even when hot.'),
        ],
        practice: [
          pr('Aluminium (0.143 nm) in copper (0.128 nm). Misfit in %?', (100 * (0.143 - 0.128)) / 0.128, '(solute − host)/host × 100.', '0.015/0.128 = 11.7%.'),
          pr('Chromium (0.125 nm) in iron (0.124 nm). Misfit in %?', (100 * (0.125 - 0.124)) / 0.124, 'Same formula.', '0.001/0.124 = 0.81%.'),
          pr('Magnesium (0.160 nm) in aluminium (0.143 nm). Misfit in %?', (100 * (0.16 - 0.143)) / 0.143, 'Host is aluminium.', '0.017/0.143 = 11.9%.'),
          pr('Lead (0.175 nm) in copper (0.128 nm). Misfit in %?', (100 * (0.175 - 0.128)) / 0.128, 'Same formula.', '0.047/0.128 = 36.7%: lead hardly dissolves in copper.'),
        ],
      },
      {
        title: 'Carbon in the holes of iron',
        minutes: 25,
        explain: [
          'Small atoms such as carbon, nitrogen and hydrogen do not replace iron atoms. They squeeze into the holes between them: interstitial solid solution. How much fits depends on how big the holes are.',
          'In FCC iron (austenite, above about 912 °C) the biggest hole has a radius of 0.414 times the iron radius. In BCC iron (ferrite, at room temperature) the hole is only 0.155 times the iron radius. A carbon atom (radius about 0.077 nm) is too big for either, but it strains FCC much less.',
          'That is why austenite can hold up to 2.14% carbon by mass but ferrite only 0.022%. To compare with atoms you must convert mass percent to atom percent, because carbon atoms are so light.',
        ],
        formulas: [
          ['Largest hole radius', 'r_{\\text{FCC}} = 0.414\\,R, \\quad r_{\\text{BCC}} = 0.155\\,R'],
          ['Mass % to atom % (carbon in iron)', '\\text{at}\\%\\,\\text{C} = \\frac{w_C/12.01}{w_C/12.01 + w_{Fe}/55.85} \\times 100'],
        ],
        examples: [
          ex('FCC iron has R = 0.129 nm. How big is its largest hole?', [['FCC hole is 0.414 of R.', 'r = 0.414\\,R'], ['Multiply.', '0.414 \\times 0.129 = 0.0534\\ \\text{nm}']], '0.0534 nm, against a carbon atom of 0.077 nm'),
          ex('Convert 0.8% carbon by mass to atom percent.', [['Moles per 100 g: carbon.', '0.8/12.01 = 0.0666'], ['Iron.', '99.2/55.85 = 1.776'], ['Fraction.', '0.0666/(0.0666 + 1.776) = 0.0361']], '3.6 atom %'),
        ],
        practice: [
          pr('BCC iron has R = 0.124 nm. Radius of its largest hole, in nm?', 0.155 * 0.124, '0.155 × R.', '0.155 × 0.124 = 0.0192 nm.', { tol: 0.0003 }),
          pr('How many times bigger is a carbon atom (0.077 nm) than the FCC hole (0.0534 nm)?', 0.077 / 0.0534, 'Divide.', '0.077/0.0534 = 1.44.'),
          pr('Convert 2.14% carbon by mass (most carbon austenite can hold) to atom %.', (100 * (2.14 / CC)) / (2.14 / CC + 97.86 / FE), 'Moles of each per 100 g.', '0.1782/(0.1782 + 1.7522) = 9.2 at%.'),
          pr('Convert 0.022% carbon by mass (most ferrite can hold) to atom %.', (100 * (0.022 / CC)) / (0.022 / CC + 99.978 / FE), 'Same method.', '0.00183/(0.00183 + 1.790) = 0.10 at%.', { tol: 0.002 }),
        ],
      },
      {
        title: 'Strength from solute atoms',
        minutes: 20,
        explain: [
          'Each dissolved atom sets up a little zone of strain. A dislocation gliding through the crystal is pushed and pulled by these zones and needs a higher stress to keep moving. This is solid solution strengthening.',
          'Experiments show the extra strength grows roughly with the square root of the solute fraction: Δσ ≈ K√c. The constant K is bigger for solutes with a bigger size or stiffness misfit.',
          'Because of the square root, the first few percent of solute do the most. Doubling the strengthening needs four times as much solute, and the solubility limit caps it anyway.',
        ],
        formulas: [['Solid solution strengthening', '\\Delta\\sigma \\approx K\\sqrt{c}\\quad (c \\text{ as a fraction})']],
        examples: [
          ex('Tin in copper has K ≈ 600 MPa. How much strength do 4 atom % of tin add?', [['c as a fraction.', 'c = 0.04,\\; \\sqrt{0.04} = 0.2'], ['Multiply.', '600 \\times 0.2 = 120\\ \\text{MPa}']], 'About 120 MPa'),
          ex('Zinc in copper has K ≈ 220 MPa. How much zinc gives 100 MPa?', [['Rearrange.', 'c = (\\Delta\\sigma/K)^2'], ['Substitute.', '(100/220)^2 = 0.207']], 'About 21 atom % zinc'),
        ],
        practice: [
          pr('Nickel in copper, K ≈ 150 MPa. Extra strength from 25 atom % nickel, in MPa?', 150 * Math.sqrt(0.25), '√0.25 = 0.5.', '150 × 0.5 = 75 MPa.'),
          pr('Zinc in copper, K ≈ 220 MPa. Extra strength from 9 atom % zinc, in MPa?', 220 * 0.3, '√0.09 = 0.3.', '220 × 0.3 = 66 MPa.'),
          pr('Tin in copper, K ≈ 600 MPa. How many atom % of tin give 150 MPa?', 100 * (150 / 600) ** 2, 'c = (Δσ/K)².', '(0.25)² = 0.0625 = 6.25%.'),
          pr('How many times more strengthening do 16 atom % of a solute give compared with 4 atom %?', 2, 'Ratio of square roots.', '√(16/4) = 2.'),
        ],
      },
      {
        title: 'Mixing rules for alloys',
        minutes: 20,
        explain: [
          'Some properties of a solid solution can be estimated by mixing those of the pure metals. Vegard’s rule says the lattice parameter changes in a straight line with the atom fraction of the solute. X-ray diffraction can then tell you the composition by measuring the lattice parameter.',
          'Density is estimated by adding up the volumes. One gram of alloy holds w_A grams of A taking up w_A/ρ_A of volume, and so on, so 1/ρ = Σ w/ρ, using mass fractions.',
          'These are only estimates (real atoms pack slightly differently when mixed), but they are close enough to check a supplier’s data.',
        ],
        formulas: [
          ['Vegard’s rule', 'a_{\\text{alloy}} = (1 - x)\\,a_A + x\\,a_B'],
          ['Density of a mixture', '\\frac{1}{\\rho} = \\frac{w_A}{\\rho_A} + \\frac{w_B}{\\rho_B}'],
        ],
        examples: [
          ex('Copper has a = 0.3615 nm and nickel a = 0.3524 nm. Estimate a for copper with 30 atom % nickel.', [['Weight each one.', '0.7(0.3615) + 0.3(0.3524)'], ['Add.', '0.25305 + 0.10572 = 0.35877']], 'About 0.3588 nm'),
          ex('Estimate the density of brass with 70% copper (8.96 g/cm³) and 30% zinc (7.13 g/cm³) by mass.', [['Volume per gram.', '0.70/8.96 + 0.30/7.13 = 0.07813 + 0.04208'], ['Invert.', '1/0.12021 = 8.32']], 'About 8.3 g/cm³ (measured: 8.5)'),
        ],
        practice: [
          pr('Estimate the lattice parameter (nm) of copper with 50 atom % nickel.', 0.5 * 0.3615 + 0.5 * 0.3524, 'Average the two.', '(0.3615 + 0.3524)/2 = 0.3570 nm.', { tol: 0.0003 }),
          pr('Estimate the density (g/cm³) of Monel: 67% nickel (8.90) and 33% copper (8.96) by mass.', 1 / (0.67 / 8.9 + 0.33 / 8.96), 'Add volume per gram, then invert.', '1/(0.07528 + 0.03683) = 8.92 g/cm³.'),
          pr('Estimate the density (g/cm³) of aluminium (2.70) with 4% copper (8.96) by mass.', 1 / (0.96 / 2.7 + 0.04 / 8.96), 'Same method.', '1/(0.35556 + 0.00446) = 2.78 g/cm³.'),
          pr('A copper–nickel alloy has a = 0.3580 nm. Using Vegard’s rule, what atom % of nickel does it hold?', (100 * (0.3615 - 0.358)) / (0.3615 - 0.3524), 'Solve the straight line for x.', 'x = (0.3615 − 0.3580)/(0.3615 − 0.3524) = 0.0035/0.0091 = 38.5%.'),
        ],
      },
    ],
  },

  'met-004': {
    predict: {
      q: 'A quenched aluminium alloy is aged at 160 °C for longer and longer. What happens to its hardness?',
      options: ['It rises to a peak, then falls if you keep going', 'It keeps rising the longer you wait', 'It falls steadily from the start', 'It stays the same, since nothing is added'],
      answer: 0,
      reveal: 'At first, tiny particles form and block dislocations, so hardness climbs. Past the peak the particles grow and spread apart, so they block less, and the alloy softens: it is overaged.',
    },
    parts: [
      {
        title: 'The solvus: what dissolves when hot',
        minutes: 25,
        explain: [
          'On the aluminium–copper phase diagram, the solvus line shows how much copper aluminium can hold in solution. At 548 °C it can hold 5.65% copper by mass; at room temperature almost none (about 0.02%).',
          'Heat an alloy with 4% copper above the solvus and all the copper dissolves (solution treatment). Stay below the temperature where it starts to melt, or the part is ruined. If it then cools slowly, the copper comes out as coarse lumps of the compound CuAl₂ (θ phase), which hardly strengthen it.',
          'The lever rule from the phase diagram class tells you how much θ the alloy holds once it has cooled slowly.',
        ],
        formulas: [
          ['Lever rule for the θ fraction', 'f_\\theta = \\frac{C_0 - C_\\alpha}{C_\\theta - C_\\alpha}'],
          ['Aluminium–copper values', 'C_\\alpha \\approx 0.02\\%,\\quad C_\\theta \\approx 53\\%\\ \\text{Cu}'],
        ],
        examples: [
          ex('Al with 4% Cu is slowly cooled to room temperature. What mass fraction is θ?', [['Lever rule.', 'f_\\theta = \\frac{4 - 0.02}{53 - 0.02}'], ['Divide.', '3.98/52.98 = 0.0751']], 'About 7.5% θ'),
          ex('An alloy’s solvus is at 500 °C and it starts to melt at 548 °C. How wide is the window for solution treatment?', [['The alloy must be above the solvus…', 'T > 500^\\circ\\text{C}'], ['…and below the start of melting.', '548 - 500 = 48']], '48 °C: furnaces must hold temperature to a few degrees'),
        ],
        practice: [
          pr('Al with 3% Cu, slowly cooled. Mass % of θ?', (100 * (3 - 0.02)) / (53 - 0.02), 'Lever rule with C₀ = 3.', '2.98/52.98 = 5.6%.'),
          pr('Al with 5% Cu, slowly cooled. Mass % of θ?', (100 * (5 - 0.02)) / (53 - 0.02), 'Lever rule with C₀ = 5.', '4.98/52.98 = 9.4%.'),
          pr('How many grams of θ are in 2 kg of slowly cooled Al–4% Cu?', (2000 * (4 - 0.02)) / (53 - 0.02), 'Fraction × mass.', '0.0751 × 2000 = 150 g.'),
          pr('An alloy’s solvus is at 470 °C and it starts to melt at 548 °C. Width of the solution-treatment window, in °C?', 78, 'Subtract.', '548 − 470 = 78 °C.'),
        ],
      },
      {
        title: 'Ageing time and the Arrhenius law',
        minutes: 25,
        explain: [
          'After quenching, the copper atoms are trapped in solution and want to come out. During ageing they diffuse and gather into particles. Diffusion speeds up sharply with temperature, following the Arrhenius law from your kinetics class.',
          'So the time to reach peak hardness shrinks quickly as the ageing temperature rises: t_peak = A·e^{Q/RT}. Taking a ratio cancels A, so you only need Q and the two temperatures (in kelvin).',
          'Factories use this to trade time for temperature: a hotter, shorter age saves oven time but gives a slightly lower peak.',
        ],
        formulas: [
          ['Time to peak', 't_{\\text{peak}} = A\\,e^{Q/RT}'],
          ['Comparing two temperatures', '\\frac{t_1}{t_2} = \\exp\\!\\left[\\frac{Q}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)\\right]'],
        ],
        examples: [
          ex('Q = 130 kJ/mol. How many times sooner is the peak at 190 °C than at 160 °C?', [['Kelvin.', 'T_1 = 433.15,\\; T_2 = 463.15'], ['Exponent.', '\\frac{130\\,000}{8.314}\\left(\\frac{1}{433.15} - \\frac{1}{463.15}\\right) = 2.339'], ['Ratio.', 'e^{2.339} = 10.4']], 'About 10 times sooner'),
          ex('The peak comes after 10 h at 160 °C. When does it come at 175 °C? (Q = 130 kJ/mol)', [['Exponent.', '15\\,636\\left(\\frac{1}{448.15} - \\frac{1}{433.15}\\right) = -1.208'], ['Scale the time.', '10 \\times e^{-1.208} = 2.99']], 'About 3 h'),
        ],
        practice: [
          pr('Q = 130 kJ/mol. How many times longer is the peak time at 150 °C than at 170 °C?', Math.exp(QR * (1 / K(150) - 1 / K(170))), 'Use the ratio formula with T₁ = 423.15 K, T₂ = 443.15 K.', 'Exponent 15 636 × 0.0001067 = 1.668; e^1.668 = 5.3.'),
          pr('Peak after 10 h at 160 °C, Q = 130 kJ/mol. Hours to peak at 140 °C?', 10 * Math.exp(QR * (1 / K(140) - 1 / K(160))), 'The lower temperature takes longer.', 'Exponent 15 636 × 0.0001118 = 1.748; 10 × e^1.748 = 57 h.'),
          pr('Peak after 10 h at 160 °C, Q = 130 kJ/mol. At what temperature, in °C, would the peak come after 1 h?', 1 / (1 / K(160) + Math.log(0.1) / QR) - 273.15, 'Solve 0.1 = exp[15 636 (1/T − 1/433.15)] for T.', '1/T = 1/433.15 − 2.303/15 636 = 0.0021614, so T = 462.7 K = 189.5 °C.'),
          pr('An alloy peaks after 20 h at 150 °C and after 2 h at 185 °C. Find Q in kJ/mol.', (8.314 * Math.log(10)) / (1 / K(150) - 1 / K(185)) / 1000, 'ln(t₁/t₂) = (Q/R)(1/T₁ − 1/T₂).', 'Q = 8.314 × ln 10 / (0.0023632 − 0.0021827) = 106 000 J/mol = 106 kJ/mol.'),
        ],
      },
      {
        title: 'Orowan: particles in the way',
        minutes: 20,
        explain: [
          'A dislocation that meets a hard particle cannot cut through it. It bows out between neighbouring particles like a rope pushed between pegs, and only gets past when the stress is high enough to bend it into a tight loop.',
          'Orowan worked out the stress needed: about Gb/L, where G is the shear modulus, b the size of one atomic slip step (the Burgers vector), and L the spacing between particles. Closer particles mean a tighter bend and a higher stress.',
          'A shear stress on the slip planes is about a third of the tensile stress you would measure in a test (the Taylor factor is about 3.06 for many metals).',
        ],
        formulas: [
          ['Orowan stress', '\\Delta\\tau \\approx \\frac{G\\,b}{L}'],
          ['Shear to tensile', '\\Delta\\sigma \\approx 3.06\\,\\Delta\\tau'],
        ],
        examples: [
          ex('Aluminium: G = 26 GPa, b = 0.286 nm. Particles 100 nm apart. Find Δτ.', [['Units in metres and pascals.', '\\frac{26\\times10^9 \\times 0.286\\times10^{-9}}{100\\times10^{-9}}'], ['Work it out.', '7.44\\times10^7\\ \\text{Pa}']], '74 MPa'),
          ex('What tensile strength does that add?', [['Shear stress from above.', '\\Delta\\tau = 74.4\\ \\text{MPa}'], ['Multiply by 3.06.', '3.06 \\times 74.4 = 227.6']], 'About 228 MPa'),
        ],
        practice: [
          pr('Aluminium (G = 26 GPa, b = 0.286 nm), particles 50 nm apart. Δτ in MPa?', (26e9 * 0.286e-9) / 50e-9 / 1e6, 'Gb/L.', '7.436/50e-9 → 148.7 MPa.'),
          pr('Same aluminium, particles 400 nm apart (overaged). Δτ in MPa?', (26e9 * 0.286e-9) / 400e-9 / 1e6, 'Gb/L.', '7.436 / 400e-9 → 18.6 MPa.'),
          pr('What particle spacing, in nm, gives Δτ = 100 MPa in that aluminium?', (26e9 * 0.286e-9) / 100e6 / 1e-9, 'L = Gb/Δτ.', '7.436 / 1e8 = 7.44e-8 m = 74.4 nm.'),
          pr('Steel: G = 80 GPa, b = 0.248 nm, particles 200 nm apart. Δτ in MPa?', (80e9 * 0.248e-9) / 200e-9 / 1e6, 'Gb/L.', '19.84 / 200e-9 → 99.2 MPa.'),
        ],
      },
      {
        title: 'Coarsening: why overaged alloys soften',
        minutes: 20,
        explain: [
          'Once the particles have formed, small ones slowly dissolve and big ones grow, because a big particle has less surface per atom and so a lower energy. The total amount of particle stays the same, but there are fewer, larger, more widely spaced ones.',
          'For many alloys the average radius follows r³ − r₀³ = k·t (Lifshitz–Slyozov–Wagner coarsening). At a fixed volume fraction, the number of particles falls as 1/r³ and their spacing grows in step with r.',
          'Since the Orowan stress goes as 1/L, doubling the particle size halves the strength they give. This is overageing.',
        ],
        formulas: [
          ['Coarsening law', 'r^3 - r_0^3 = k\\,t'],
          ['At fixed volume fraction', 'N \\propto \\frac{1}{r^3},\\quad L \\propto r'],
        ],
        examples: [
          ex('Particles start at r₀ = 5 nm with k = 10 nm³/h. What is r after 100 h?', [['Cube of the start.', '5^3 = 125'], ['Add kt.', '125 + 10 \\times 100 = 1125'], ['Cube root.', '\\sqrt[3]{1125} = 10.4']], 'About 10.4 nm'),
          ex('The particles double in radius at the same volume fraction. What happens to the Orowan strength?', [['Spacing grows with r.', 'L \\to 2L'], ['Strength goes as 1/L.', '\\Delta\\tau \\to \\Delta\\tau/2']], 'It halves'),
        ],
        practice: [
          pr('r₀ = 4 nm, k = 20 nm³/h. Radius in nm after 50 h?', Math.cbrt(64 + 20 * 50), 'Cube, add kt, cube root.', '∛(64 + 1000) = ∛1064 = 10.2 nm.'),
          pr('k = 10 nm³/h. How many hours for particles to grow from 5 nm to 15 nm?', (15 ** 3 - 5 ** 3) / 10, 't = (r³ − r₀³)/k.', '(3375 − 125)/10 = 325 h.'),
          pr('The average radius triples at the same volume fraction. By what factor does the number of particles drop?', 27, 'N goes as 1/r³.', '3³ = 27.'),
          pr('Particles of 5 nm give an Orowan strength of 120 MPa. Estimate it in MPa after they coarsen to 8 nm (same volume fraction).', 120 * (5 / 8), 'L grows in step with r.', '120 × 5/8 = 75 MPa.'),
        ],
      },
    ],
  },

  'met-005': {
    predict: {
      q: 'You make the grains in a steel four times smaller. What happens to the extra strength that grain boundaries give?',
      options: ['It doubles', 'It becomes four times bigger', 'It halves', 'It does not change'],
      answer: 0,
      reveal: 'Grain-boundary strength goes as 1/√d. Dividing d by 4 multiplies 1/√d by √4 = 2. The plot against 1/√d is a straight line.',
    },
    parts: [
      {
        title: 'The Hall–Petch relation',
        minutes: 20,
        explain: [
          'Dislocations glide easily inside a grain but pile up against a grain boundary, because the crystal on the other side is turned a different way. The pile-up pushes on the boundary, and a new slip only starts in the next grain when enough stress has built up.',
          'In a small grain the pile-up is short and pushes weakly, so a bigger applied stress is needed. Working this through gives σy = σ₀ + k/√d. σ₀ is the friction stress inside a grain; k measures how hard the boundaries are to cross.',
          'For mild steel σ₀ ≈ 70 MPa and k ≈ 0.74 MPa·m^½. Remember to put d in metres.',
        ],
        formulas: [['Hall–Petch', '\\sigma_y = \\sigma_0 + \\frac{k}{\\sqrt{d}}']],
        examples: [
          ex('Mild steel with 25 µm grains: find σy.', [['d in metres.', 'd = 25\\times10^{-6}\\ \\text{m},\\; \\sqrt{d} = 0.005'], ['Boundary term.', '0.74/0.005 = 148'], ['Add σ₀.', '70 + 148 = 218']], '218 MPa'),
          ex('What grain size gives 350 MPa?', [['Boundary term needed.', '350 - 70 = 280'], ['Solve for d.', 'd = (0.74/280)^2 = 6.98\\times10^{-6}\\ \\text{m}']], 'About 7 µm'),
        ],
        practice: [
          pr('Mild steel with 16 µm grains. σy in MPa?', 70 + 0.74 / Math.sqrt(16e-6), '√(16 × 10⁻⁶) = 0.004.', '70 + 185 = 255 MPa.'),
          pr('Mild steel with 1 mm grains (very coarse). σy in MPa?', 70 + 0.74 / Math.sqrt(1e-3), '√0.001 = 0.0316.', '70 + 23.4 = 93.4 MPa.'),
          pr('What grain size, in µm, gives σy = 250 MPa in mild steel?', (0.74 / 180) ** 2 * 1e6, 'd = (k/(σy − σ₀))².', '(0.74/180)² = 1.69 × 10⁻⁵ m = 16.9 µm.'),
          pr('A steel gives 150 MPa at d = 100 µm and 230 MPa at d = 25 µm. Find k in MPa·m^½.', 0.8, 'Subtract the two equations to remove σ₀.', '1/√d is 100 and 200 m^−½; 80 MPa / 100 = 0.8 MPa·m^½.'),
        ],
      },
      {
        title: 'Measuring grain size',
        minutes: 20,
        explain: [
          'To use Hall–Petch you need the grain size, which is measured on a polished and etched sample under a microscope. Industry reports it as an ASTM grain size number G.',
          'The rule: at 100 times magnification, one square inch of the image holds N = 2^(G−1) grains. So each step up in G doubles the number of grains. Fine-grained steels are G = 7 or more.',
          'To get the real number of grains per square millimetre, undo the magnification (100² in area) and change square inches to square millimetres (25.4² mm² per in²). The average grain diameter is then roughly one over the square root of that.',
        ],
        formulas: [
          ['ASTM grain size number', 'N = 2^{G-1}\\quad (\\text{per in}^2 \\text{ at } 100\\times)'],
          ['Real grains per mm²', 'N_{\\text{mm}^2} = N \\times \\frac{100^2}{25.4^2}'],
        ],
        examples: [
          ex('A steel is ASTM G = 8. How many grains per square inch at 100×?', [['G − 1 = 7.', 'N = 2^{7}'], ['Work it out.', '= 128']], '128 grains'),
          ex('You count 64 grains per square inch at 100×. What is G?', [['Write 64 as a power of 2.', '64 = 2^6'], ['So G − 1 = 6.', 'G = 7']], 'G = 7'),
        ],
        practice: [
          pr('ASTM G = 5. Grains per square inch at 100×?', 2 ** 4, 'N = 2^(G−1).', '2⁴ = 16.'),
          pr('You count 200 grains per square inch at 100×. What is G (to two decimals)?', 1 + Math.log2(200), 'G = 1 + log₂ N.', 'log₂ 200 = 7.64, so G = 8.64.'),
          pr('For G = 8, how many real grains are in one square millimetre?', (128 * 10000) / 25.4 ** 2, 'N × 100² / 25.4².', '128 × 10 000 / 645.16 = 1984.'),
          pr('Estimate the average grain diameter in µm for 1984 grains per mm².', 1000 / Math.sqrt(1984), 'Diameter ≈ 1/√(grains per mm²), in mm.', '1/√1984 = 0.0224 mm = 22.4 µm.'),
        ],
      },
      {
        title: 'Cold work',
        minutes: 20,
        explain: [
          'Rolling, drawing or bending a metal at room temperature makes millions of new dislocations. They run into each other and tangle, so it takes more and more stress to keep deforming. The metal gets stronger and harder but less ductile: work hardening.',
          'The amount of deformation is measured as percent cold work, the drop in cross-sectional area. For a round wire the area goes as diameter squared; for a sheet rolled without getting wider, it goes as thickness.',
          'Wire is drawn through several dies, and makers track the total cold work, because past a certain amount the wire becomes too brittle to draw further.',
        ],
        formulas: [
          ['Percent cold work', '\\%\\text{CW} = \\frac{A_0 - A_d}{A_0} \\times 100'],
          ['For round wire', '\\%\\text{CW} = \\left(1 - \\frac{d_d^2}{d_0^2}\\right) \\times 100'],
        ],
        examples: [
          ex('A 10 mm wire is drawn to 8 mm. Percent cold work?', [['Area ratio.', '(8/10)^2 = 0.64'], ['Cold work.', '(1 - 0.64) \\times 100 = 36']], '36%'),
          ex('From 10 mm, what diameter gives 50% cold work?', [['Area must halve.', 'd_d^2 = 0.5 \\times 10^2'], ['Square root.', 'd_d = 10\\sqrt{0.5} = 7.07']], '7.07 mm'),
        ],
        practice: [
          pr('A sheet is rolled from 5 mm to 3 mm thick, with no change in width. Percent cold work?', 40, 'Area goes as thickness here.', '(5 − 3)/5 = 40%.'),
          pr('A 6 mm wire is drawn to 4 mm. Percent cold work?', 100 * (1 - 16 / 36), '1 − (4/6)².', '1 − 0.444 = 55.6%.'),
          pr('An 8 mm wire gets 25% cold work. Final diameter in mm?', 8 * Math.sqrt(0.75), 'Area keeps 75%.', '8 × √0.75 = 6.93 mm.'),
          pr('A 10 mm wire is drawn to 8 mm and then to 7 mm with no anneal. Total percent cold work?', 100 * (1 - 49 / 100), 'Compare the final area with the very first.', '1 − (7/10)² = 51%.'),
        ],
      },
      {
        title: 'Recrystallisation and grain growth',
        minutes: 25,
        explain: [
          'Heat a cold-worked metal and, above a certain temperature, new grains free of tangled dislocations start to grow inside the old ones and replace them. The metal becomes soft and ductile again. This recrystallisation temperature is roughly 0.4 of the melting point, measured in kelvin.',
          'Keep heating and the new grains grow, because large grains have less boundary area per volume. A common rule is d² − d₀² = k·t.',
          'This is the trade-off in every annealing furnace: hot and long enough to soften the metal, but not so long that the grains grow coarse and Hall–Petch strength is lost.',
        ],
        formulas: [
          ['Recrystallisation (rule of thumb)', 'T_{\\text{rx}} \\approx 0.4\\,T_m\\quad (\\text{K})'],
          ['Grain growth', 'd^2 - d_0^2 = k\\,t'],
        ],
        examples: [
          ex('Aluminium melts at 933 K. Estimate its recrystallisation temperature.', [['Multiply.', '0.4 \\times 933 = 373\\ \\text{K}'], ['In °C.', '373 - 273 = 100']], 'About 100 °C'),
          ex('Grains start at 10 µm. k = 50 µm²/min. Size after 30 min?', [['Square of the start.', '10^2 = 100'], ['Add kt.', '100 + 50 \\times 30 = 1600'], ['Square root.', '\\sqrt{1600} = 40']], '40 µm'),
        ],
        practice: [
          pr('Iron melts at 1811 K. Estimate its recrystallisation temperature in °C.', 0.4 * 1811 - 273.15, '0.4 × Tm, then subtract 273.15.', '724.4 K = 451 °C.'),
          pr('Tungsten melts at 3695 K. Estimate its recrystallisation temperature in K.', 0.4 * 3695, '0.4 × Tm.', '1478 K.'),
          pr('d₀ = 20 µm, k = 30 µm²/min. Grain size in µm after 60 min?', Math.sqrt(400 + 30 * 60), '√(d₀² + kt).', '√(400 + 1800) = 46.9 µm.'),
          pr('How many minutes for grains to grow from 15 µm to 45 µm with k = 40 µm²/min?', (45 ** 2 - 15 ** 2) / 40, 't = (d² − d₀²)/k.', '(2025 − 225)/40 = 45 min.'),
        ],
      },
    ],
  },

  'met-006': {
    predict: {
      q: 'You add chromium to steel one percent at a time. How does its rusting rate change?',
      options: ['Little change at first, then a sudden big drop at around 10–12%', 'It drops a little with every percent', 'Only steels above 25% chromium stop rusting', 'Chromium does not change how fast steel rusts'],
      answer: 0,
      reveal: 'Below about 10.5% the chromium oxide forms in separate patches. Once there is enough, the patches join into one continuous film and rust is shut out almost at once.',
    },
    parts: [
      {
        title: 'PREN: ranking stainless steels',
        minutes: 20,
        explain: [
          'Stainless steel’s main enemy is chloride, from sea salt, sweat or bleach. Chloride breaks the passive film at a weak spot and digs a small, deep pit while the surface around it looks fine.',
          'Chromium, molybdenum and nitrogen all make the film tougher against chloride. The Pitting Resistance Equivalent Number adds them with weights found from tests: PREN = %Cr + 3.3 %Mo + 16 %N.',
          'Rough guide: under 23 for indoor use, 23–32 for coastal air if washed, 32–40 for chemical plants and brackish water, and 40 or more for seawater.',
        ],
        formulas: [['Pitting resistance', '\\text{PREN} = \\%\\text{Cr} + 3.3\\,\\%\\text{Mo} + 16\\,\\%\\text{N}']],
        examples: [
          ex('Grade 316: 17% Cr, 2.1% Mo, 0.05% N. Find PREN.', [['Each term.', '17 + 3.3(2.1) + 16(0.05)'], ['Add.', '17 + 6.93 + 0.8 = 24.7']], '24.7'),
          ex('A steel has 25% Cr and 0.25% N. How much Mo gives PREN 40?', [['Subtract the rest.', '40 - 25 - 16(0.25) = 11'], ['Divide by 3.3.', '11/3.3 = 3.33']], 'About 3.3% Mo'),
        ],
        practice: [
          pr('Grade 304L: 18.5% Cr, no Mo, 0.08% N. PREN?', 18.5 + 16 * 0.08, 'No Mo term.', '18.5 + 1.28 = 19.8.'),
          pr('Grade 904L: 20% Cr, 4.5% Mo, 0.06% N. PREN?', 20 + 3.3 * 4.5 + 16 * 0.06, 'Add all three terms.', '20 + 14.85 + 0.96 = 35.8.'),
          pr('Grade 254 SMO: 20% Cr, 6.1% Mo, 0.20% N. PREN?', 20 + 3.3 * 6.1 + 16 * 0.2, 'Add all three terms.', '20 + 20.13 + 3.2 = 43.3.'),
          pr('How much Cr (in %) gives PREN 32 with 3% Mo and 0.17% N?', 32 - 3.3 * 3 - 16 * 0.17, 'Subtract the Mo and N terms from 32.', '32 − 9.9 − 2.72 = 19.4%.'),
        ],
      },
      {
        title: 'When stainless steel stops being stainless',
        minutes: 25,
        explain: [
          'Heat a stainless steel to about 500–800 °C, as happens beside a weld, and carbon grabs chromium to form the carbide Cr₂₃C₆ along the grain boundaries. The metal right next to those boundaries loses its chromium and drops below the 10.5% needed for a film. It then corrodes along the boundaries: sensitisation, or weld decay.',
          'Each kilogram of carbon can tie up a lot of chromium: 23 chromium atoms for every 6 carbon atoms. Work it out by mass and you find about 16.6 kg of chromium per kilogram of carbon.',
          'The cure is low carbon. "L" grades such as 304L and 316L hold at most 0.03% carbon, so there is too little carbon to rob much chromium.',
        ],
        formulas: [
          ['Chromium tied up per kg of carbon', '\\frac{23 \\times 52.00}{6 \\times 12.01} = 16.6'],
          ['Chromium lost', '\\%\\text{Cr}_{\\text{tied}} = 16.6 \\times \\%\\text{C}'],
        ],
        examples: [
          ex('A 304 steel has 0.08% carbon. If it all forms Cr₂₃C₆, how much chromium is tied up?', [['Chromium tied per unit of carbon.', '16.6'], ['Multiply by the carbon content.', '16.6 \\times 0.08 = 1.33']], '1.33% of the steel’s mass in chromium'),
          ex('Do the same for 304L with 0.03% carbon.', [['Same factor, less carbon.', '16.6 \\times 0.03'], ['Multiply.', '= 0.50']], '0.50%: a third as much'),
        ],
        practice: [
          pr('How many kg of chromium does 1 kg of carbon tie up in Cr₂₃C₆ (Cr 52.00, C 12.01)?', (23 * 52) / (6 * CC), 'Mass of 23 Cr ÷ mass of 6 C.', '1196/72.06 = 16.6 kg.'),
          pr('A steel holds 0.06% carbon. What % chromium could it tie up as Cr₂₃C₆?', 0.06 * ((23 * 52) / (6 * CC)), '16.6 × %C.', '16.6 × 0.06 = 1.0%.'),
          pr('A steel has 18% Cr and 0.08% C. If all the carbon forms Cr₂₃C₆, what % Cr is left in solution?', 18 - 0.08 * ((23 * 52) / (6 * CC)), 'Subtract the chromium tied up.', '18 − 1.33 = 16.7%.'),
          pr('What is the most carbon (in %) a steel can have if at most 0.5% chromium may be tied up?', 0.5 / ((23 * 52) / (6 * CC)), 'Divide by 16.6.', '0.5/16.6 = 0.030%.', { tol: 0.0005 }),
        ],
      },
      {
        title: 'Hot parts: homologous temperature and cooling',
        minutes: 20,
        explain: [
          'Whether a metal is "hot" depends on how close it is to melting. The homologous temperature T/Tm (both in kelvin) compares them: above about 0.4–0.5, atoms move enough for creep to matter. Lead at room temperature is already at 0.5; steel at 600 °C is about the same.',
          'A turbine blade in a jet engine runs at about 0.8 of its melting point, which no ordinary alloy could survive. Engineers combine three tricks: a nickel superalloy hardened by γ′ particles, a ceramic coating that blocks heat, and cooling air blown through holes inside the blade.',
          'The temperature drops add up, so you can work out the metal temperature from the gas temperature.',
        ],
        formulas: [
          ['Homologous temperature', '\\frac{T}{T_m}\\quad (\\text{both in K})'],
          ['Blade metal temperature', 'T_{\\text{metal}} = T_{\\text{gas}} - \\Delta T_{\\text{coating}} - \\Delta T_{\\text{cooling}}'],
        ],
        examples: [
          ex('A blade runs at 1050 °C and melts at 1350 °C. Find T/Tm.', [['Kelvin.', '1323.15 / 1623.15'], ['Divide.', '= 0.815']], '0.82'),
          ex('Gas at 1500 °C, 150 °C dropped across the coating, 300 °C removed by cooling air. Metal temperature?', [['Take off the coating drop.', '1500 - 150 = 1350'], ['Take off the cooling.', '1350 - 300 = 1050']], '1050 °C'),
        ],
        practice: [
          pr('A steel melts at 1500 °C and runs at 600 °C. Homologous temperature?', K(600) / K(1500), 'Convert both to kelvin first.', '873.15/1773.15 = 0.49.'),
          pr('Gas at 1600 °C, coating drop 170 °C, cooling 380 °C. Metal temperature in °C?', 1050, 'Subtract both drops.', '1600 − 170 − 380 = 1050 °C.'),
          pr('Gas at 1550 °C and cooling removes 350 °C. What coating drop (°C) keeps the metal at 1000 °C?', 200, 'Solve for the coating drop.', '1550 − 350 − 1000 = 200 °C.'),
          pr('A superalloy melts at 1330 °C. What metal temperature in °C gives T/Tm = 0.85?', 0.85 * K(1330) - 273.15, 'Work in kelvin, then convert back.', '0.85 × 1603.15 = 1362.7 K = 1089.5 °C.'),
        ],
      },
      {
        title: 'Predicting creep life: Larson–Miller',
        minutes: 25,
        explain: [
          'A blade must last thousands of hours, but nobody can wait years for a test. The Larson–Miller parameter trades time for temperature: at a given stress, P = T(C + log₁₀ t) stays the same, with T in kelvin, t in hours and C ≈ 20 for most alloys.',
          'So a short test at a higher temperature predicts a long life at a lower one. Dividing by 1000 keeps the numbers handy.',
          'The same trick shows how sensitive blades are to heat: running only 50 K hotter can cut the life by about ten times.',
        ],
        formulas: [['Larson–Miller parameter', 'P = \\frac{T\\,(20 + \\log_{10} t)}{1000}']],
        examples: [
          ex('A blade lasts 10 000 h at 1173 K. Find P.', [['log₁₀ 10 000 = 4.', 'P = 1173 \\times 24 / 1000'], ['Work it out.', '= 28.15']], 'P = 28.15'),
          ex('At the same stress (same P), how long would it last at 1273 K?', [['Solve for log t.', '20 + \\log t = 28\\,152/1273 = 22.115'], ['Undo the log.', 't = 10^{2.115} = 130']], 'About 130 h'),
        ],
        practice: [
          pr('Find P for 1100 K and 100 h.', (1100 * (20 + 2)) / 1000, 'log₁₀ 100 = 2.', '1100 × 22/1000 = 24.2.'),
          pr('With P = 24.2, how many hours would it last at 1000 K?', 10 ** (24200 / 1000 - 20), 'log t = 1000P/T − 20.', 'log t = 24.2 − 20 = 4.2, so t = 15 850 h.'),
          pr('What temperature in K gives 10 000 h of life at P = 26?', 26000 / 24, 'T = 1000P/(20 + log t).', '26 000/24 = 1083 K.'),
          pr('P = 28.152. How many hours would the blade last at 1223 K?', 10 ** (28152 / 1223 - 20), 'log t = 28 152/1223 − 20.', 'log t = 3.019, so t ≈ 1040 h: 50 K hotter, about a tenth of the life.'),
        ],
      },
    ],
  },
};
