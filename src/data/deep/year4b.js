// Year 4, second semester: biomaterials, printing, batteries, quality, plants, business, thesis, capstone.
// Each class split into parts: explanation, key formulas, worked examples shown one step
// at a time, and practice problems where you type the answer.
//
// Practice answers: a number (checked to about 1%), or 'inf', '-inf' or 'dne'
// (does not exist). `tol` overrides the tolerance (absolute).

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const YEAR4B = {
  'mate-137': {
    predict: {
      q: 'A titanium hip stem has only half the cross-section of the bone around it. The two are squeezed together and share the body’s load. Who carries more?',
      options: ['The bone, because it has twice the area', 'They share it equally', 'The stem, carrying about three-quarters', 'The bone carries all of it'],
      answer: 2,
      reveal: 'The stem takes about three-quarters. Parts squeezed side by side share load according to stiffness times area, and titanium is about six times stiffer than bone. So the bone, despite its larger area, is left under-loaded.',
    },
    parts: [
      {
        title: 'Sharing a load side by side',
        minutes: 20,
        explain: [
          'A biomaterial is a material that works in contact with the living body. A hip implant is a good example: a metal stem goes into the hollow of the thigh bone, and the two must carry your weight together.',
          'Because the stem and the bone are joined, they squeeze by the same amount. A stiffer part needs more force to squeeze by that amount, so it takes more of the load. Each part’s share is its E × A divided by the total.',
          'Here E is the stiffness of the material and A is the area of its cross-section. Bone has E ≈ 18 GPa and titanium about 110 GPa.',
        ],
        formulas: [
          ['Share of load', 'F_i = F \\, \\frac{E_i A_i}{\\sum E A}'],
          ['Strain', '\\varepsilon = \\frac{F}{\\sum E A}'],
        ],
        examples: [
          ex('Bone (18 GPa, 400 mm²) and a titanium stem (110 GPa, 200 mm²) share a 2,000 N load. Find the force on each.', [
            ['E × A for each.', '18 \\times 400 = 7200, \\quad 110 \\times 200 = 22\\,000\\,\\text{kN}'],
            ['Bone’s share.', '7200 / 29\\,200 = 0.247'],
            ['Forces.', 'F_b = 493\\,\\text{N}, \\quad F_s = 1507\\,\\text{N}'],
          ], 'bone 493 N; stem 1,507 N'),
          ex('Find the bone’s share if the stem is cobalt–chromium (210 GPa, 200 mm²).', [
            ['Stem’s E × A.', '210 \\times 200 = 42\\,000\\,\\text{kN}'],
            ['Bone’s share.', '7200 / 49\\,200 = 0.146'],
          ], 'about 14.6%'),
        ],
        practice: [
          pr('Bone (18 GPa, 500 mm²) and titanium (110 GPa, 100 mm²). What percentage of the load does the titanium carry?', 55, 'E × A is 9,000 for bone and 11,000 for the stem.', '11,000/20,000 = 55%.'),
          pr('In that same joint the load is 3,000 N. Force on the bone, in N?', 1350, 'Bone carries the other 45%.', '0.45 × 3,000 = 1,350 N.'),
          pr('Bone (18 GPa, 400 mm²) with a polymer stem (3 GPa, 200 mm²). What percentage of the load does the bone carry?', 92.3, 'E × A is 7,200 and 600.', '7,200/7,800 ≈ 92.3%.'),
          pr('Bone (18 GPa, 400 mm²) beside a titanium stem (110 GPa, 200 mm²) has a total E × A of 29,200 kN. A 2,000 N load acts on it. What is the strain, in microstrain (millionths)?', 68.5, 'Strain = force/total E × A. Keep the same units (2 kN).', '2/29,200 = 6.85 × 10⁻⁵ = 68.5 microstrain.'),
        ],
      },
      {
        title: 'The stiffness gap',
        minutes: 20,
        explain: [
          'Metals are 6 to 12 times stiffer than bone, which is the source of the problem. Comparing the stiffness of each implant material with bone gives a quick measure of how badly the two are matched.',
          'Surgeons and designers can reduce the difference in two ways: by choosing a less stiff material, or by making the stem thinner. A thin stem must still be strong enough, so its size is a balance.',
          'A second approach is to use a porous metal or a polymer-coated stem, which lowers the effective stiffness.',
        ],
        formulas: [
          ['Stiffness ratio', 'r = \\frac{E_{\\text{implant}}}{E_{\\text{bone}}}'],
          ['Equal share', 'A_s = \\frac{E_b A_b}{E_s}'],
        ],
        examples: [
          ex('How many times stiffer than bone (18 GPa) is titanium (110 GPa)?', [
            ['Divide the two.', '110 / 18'],
            ['Evaluate.', 'r = 6.1'],
          ], '6.1 times'),
          ex('Bone is 18 GPa and 400 mm². What titanium stem area gives each half the load, and what stem diameter is that?', [
            ['Equal E × A.', 'A_s = 7200/110 = 65.5\\,\\text{mm}^2'],
            ['Diameter from area.', 'd = \\sqrt{4 \\times 65.5 / \\pi} = 9.13\\,\\text{mm}'],
          ], '65.5 mm²; 9.1 mm'),
        ],
        practice: [
          pr('How many times stiffer than bone (18 GPa) is cobalt–chromium (210 GPa)?', 11.67, 'Divide.', '210/18 ≈ 11.67.'),
          pr('How many times stiffer than bone (18 GPa) is stainless steel (193 GPa)?', 10.7, 'Divide.', '193/18 ≈ 10.7.'),
          pr('What cobalt–chromium stem area (210 GPa) equals the stiffness of 400 mm² of bone (18 GPa), in mm²?', 34.3, 'A = E_bA_b/E_s.', '7,200/210 ≈ 34.3 mm².'),
          pr('A titanium stem of area 65.5 mm² has what stem-to-bone load ratio with 400 mm² of bone (18 GPa)?', 1, 'Compare the two values of E × A.', '110 × 65.5 ≈ 7,200, the same as the bone: a ratio of 1.'),
        ],
      },
      {
        title: 'Stress shielding and Wolff’s law',
        minutes: 20,
        explain: [
          'Bone is alive. Julius Wolff described in the 1890s how bone adapts to the loads it carries: under more load it grows thicker, under less it is slowly removed. Astronauts lose bone for this reason.',
          'A stiff implant takes most of the load, so the bone beside it is “shielded” from its usual stress. Over years it thins, which can loosen the implant. The stress-shielding percentage shows how much of the usual bone stress has gone.',
          'Thinning makes the problem feed on itself: less bone means an even smaller share of the load.',
        ],
        formulas: [
          ['Shielding', 'SS = \\left(1 - \\frac{\\sigma_{\\text{with}}}{\\sigma_{\\text{without}}}\\right) \\times 100\\%'],
        ],
        examples: [
          ex('A 2,000 N load on 400 mm² of bone gives 5 MPa. With a stem, the bone carries 493 N. Find the shielding.', [
            ['Stress with the stem.', '\\sigma = 493/400 = 1.23\\,\\text{MPa}'],
            ['Shielding.', 'SS = (1 - 1.23/5) \\times 100 = 75.3\\%'],
          ], '75%'),
          ex('With a polymer stem the bone keeps 92.3% of the load. What is the shielding?', [
            ['The bone stress is 92.3% of normal.', '\\sigma_{\\text{with}}/\\sigma_{\\text{without}} = 0.923'],
            ['Shielding.', 'SS = (1 - 0.923) \\times 100 = 7.7\\%'],
          ], '7.7%'),
        ],
        practice: [
          pr('The bone keeps 40% of its normal stress with an implant. Shielding, in %?', 60, 'Take the fraction kept away from 100%.', '100 − 40 = 60%.'),
          pr('Normal bone stress is 5 MPa, and with an implant it is 3 MPa. Shielding, in %?', 40, '1 − 3/5.', '0.4 × 100 = 40%.'),
          pr('A bone cross-section of 400 mm² thins by 15%. New area, in mm²?', 340, 'Keep 85% of it.', '0.85 × 400 = 340 mm².'),
          pr('That thinned bone (18 GPa, 340 mm²) is beside the titanium stem (110 GPa, 200 mm²). What percentage of the load does the bone now carry?', 21.8, 'E × A for bone is 6,120.', '6,120/28,120 ≈ 21.8%, down from 24.7%.'),
        ],
      },
      {
        title: 'Wear, corrosion and bonding',
        minutes: 20,
        explain: [
          'A hip joint moves about a million times a year. The metal or ceramic ball rubs against a polyethylene cup, which slowly wears. The wear volume per year is the ball’s projected area multiplied by the depth lost.',
          'The debris matters. Tiny particles can trigger inflammation that destroys nearby bone, so cross-linked polyethylene, which wears about five times less, has become common.',
          'Titanium also forms a thin protective oxide, and bone grows directly on to it. Per-Ingvar Brånemark found this bonding, called osseointegration, by accident in the 1950s. Metal ions released by corrosion are kept very low by that oxide.',
        ],
        formulas: [
          ['Wear volume', 'V = \\pi r^2 \\, d'],
          ['Implant life', 't = \\frac{d_{\\text{allowed}}}{\\text{rate}}'],
          ['Interface stress', '\\tau = \\frac{F}{A}'],
        ],
        examples: [
          ex('A 28 mm ball wears a cup at 0.1 mm per year. Find the wear volume per year.', [
            ['Radius.', 'r = 14\\,\\text{mm}'],
            ['Volume.', 'V = \\pi \\times 14^2 \\times 0.1 = 61.6\\,\\text{mm}^3'],
          ], '61.6 mm³ per year'),
          ex('A cup can lose 3 mm before it must be replaced. Wear is 0.1 mm per year. How long will it last?', [
            ['Divide allowed depth by the rate.', 't = 3 / 0.1'],
            ['Evaluate.', 't = 30\\,\\text{years}'],
          ], '30 years'),
        ],
        practice: [
          pr('A 32 mm ball wears at 0.1 mm per year. Wear volume, in mm³ per year?', 80.4, 'r = 16 mm.', 'π × 256 × 0.1 ≈ 80.4 mm³.'),
          pr('A liner may lose 2 mm and wears 0.05 mm per year. Life, in years?', 40, 'Divide.', '2/0.05 = 40 years.'),
          pr('Ions are released at 1.5 µg/cm² per day from a 50 cm² implant. How many mg per year?', 27.4, 'Multiply, then change µg to mg.', '1.5 × 50 × 365 = 27,375 µg ≈ 27.4 mg.'),
          pr('A bonded interface of 500 mm² carries 2,000 N in shear. Stress, in MPa?', 4, 'τ = F/A.', '2000/500 = 4 MPa.'),
        ],
      },
    ],
  },

  'mate-138': {
    predict: {
      q: 'A dome 20 mm high is being printed in flat layers. You halve the layer height. What happens to the print?',
      options: ['Same time, smoother surface', 'Twice the time, and the staircase on the slope gets half as tall', 'Half the time, rougher surface', 'Four times the time, and no staircase at all'],
      answer: 1,
      reveal: 'Twice the time and half the staircase. Halving the layer height means twice as many layers, and each step on the sloped surface is half as tall. Thin layers look better but always cost time.',
    },
    parts: [
      {
        title: 'Building with layers',
        minutes: 15,
        explain: [
          'Additive manufacturing, or 3D printing, builds a part one thin layer at a time, instead of cutting it from a block or pouring it into a mould. Hideo Kodama described the idea in 1981 and Chuck Hull built a working machine that cured liquid resin with light.',
          'There are three common families. Stereolithography cures resin with light. Fused deposition squeezes melted plastic from a nozzle. Powder-bed fusion melts a thin layer of powder with a laser.',
          'The basic calculation is simple: the number of layers is the height divided by the layer height.',
        ],
        formulas: [
          ['Layers', 'N = \\frac{H}{h}'],
        ],
        examples: [
          ex('How many layers does a 20 mm dome need at a 0.2 mm layer height?', [
            ['Use N = H/h.', 'N = 20 / 0.2'],
            ['Evaluate.', 'N = 100'],
          ], '100 layers'),
          ex('How many layers does the same dome need at 0.05 mm?', [
            ['Use N = H/h.', 'N = 20 / 0.05'],
            ['Evaluate.', 'N = 400'],
          ], '400 layers'),
        ],
        practice: [
          pr('How many layers are needed for a 30 mm part at 0.15 mm?', 200, 'Divide.', '30/0.15 = 200.'),
          pr('How many layers for a 20 mm part at 0.25 mm?', 80, 'Divide.', '20/0.25 = 80.'),
          pr('How many layers for a 120 mm part at 0.06 mm?', 2000, 'Divide.', '120/0.06 = 2,000.'),
          pr('What layer height gives 250 layers on a 20 mm part, in mm?', 0.08, 'h = H/N.', '20/250 = 0.08 mm.'),
        ],
      },
      {
        title: 'Print time',
        minutes: 20,
        explain: [
          'Each layer takes time to draw or expose, and most machines also need a few seconds to recoat or move between layers. Multiply the time for one layer by the number of layers.',
          'A nozzle printer has a clear speed limit: the volume it can lay down each second is the bead width, multiplied by the layer height and by the travel speed. Divide the part’s volume by that rate to estimate the time.',
          'That is why thinner layers at the same width and speed take longer.',
        ],
        formulas: [
          ['Layer-by-layer', 't = N \\, t_{\\text{layer}}'],
          ['Extrusion rate', 'Q = w\\,h\\,v, \\quad t = \\frac{V}{Q}'],
        ],
        examples: [
          ex('A part needs 100 layers at 45 s each. How long will it take?', [
            ['Multiply.', 't = 100 \\times 45 = 4500\\,\\text{s}'],
            ['Change to minutes.', '4500/60 = 75\\,\\text{min}'],
          ], '75 minutes'),
          ex('A 0.4 mm nozzle prints 0.2 mm layers at 50 mm/s. How long does a 20 cm³ part take?', [
            ['Rate.', 'Q = 0.4 \\times 0.2 \\times 50 = 4\\,\\text{mm}^3/\\text{s}'],
            ['Time.', 't = 20\\,000/4 = 5000\\,\\text{s} = 83.3\\,\\text{min}'],
          ], 'about 83 minutes'),
        ],
        practice: [
          pr('400 layers take 20 s each, plus 5 s of recoating per layer. Total time, in hours?', 2.78, 'Each layer takes 25 s in total.', '400 × 25 = 10,000 s ≈ 2.78 h.'),
          pr('A 50 cm³ part at 8 mm³/s takes how many minutes?', 104.2, 'Change cm³ to mm³.', '50,000/8 = 6,250 s ≈ 104.2 min.'),
          pr('A 0.6 mm nozzle prints 0.3 mm layers at 40 mm/s. Flow rate, in mm³/s?', 7.2, 'Q = whv.', '0.6 × 0.3 × 40 = 7.2 mm³/s.'),
          pr('Layer height is halved with width and speed unchanged. By what factor does print time rise?', 2, 'Q is proportional to h.', 'Half the rate means 2 times the time.'),
        ],
      },
      {
        title: 'Stair-stepping on slopes',
        minutes: 20,
        explain: [
          'Flat layers can only approximate a curve, so a sloped surface looks like a tiny staircase. The height of each small step measured against the true surface is called the cusp height.',
          'It depends on the layer height and on the surface’s tilt. Let θ be the angle between the surface’s outward direction and the build direction. Then the cusp height is h·cos θ.',
          'A horizontal top (θ = 0°) has a cusp as tall as the whole layer, while a vertical wall (θ = 90°) has none. So how a part is laid on the bed really does change its finish.',
        ],
        formulas: [
          ['Cusp height', '\\delta = h \\cos\\theta'],
          ['Layer needed', 'h = \\frac{\\delta}{\\cos\\theta}'],
        ],
        examples: [
          ex('A 0.2 mm layer prints a surface with θ = 60°. Find the cusp height.', [
            ['Cosine.', '\\cos 60° = 0.5'],
            ['Multiply.', '\\delta = 0.2 \\times 0.5 = 0.1\\,\\text{mm}'],
          ], '0.1 mm'),
          ex('What layer height keeps the cusp at 0.05 mm on a slope with θ = 45°?', [
            ['Cosine.', '\\cos 45° = 0.707'],
            ['Divide.', 'h = 0.05 / 0.707 = 0.0707\\,\\text{mm}'],
          ], '0.0707 mm'),
        ],
        practice: [
          pr('A 0.3 mm layer at θ = 0°. Cusp height, in mm?', 0.3, 'cos 0° = 1.', '0.3 × 1 = 0.3 mm.'),
          pr('A 0.1 mm layer at θ = 60°. Cusp height, in mm?', 0.05, 'cos 60° = 0.5.', '0.1 × 0.5 = 0.05 mm.'),
          pr('What layer height gives a 0.1 mm cusp at θ = 30°, in mm?', 0.1155, 'Divide by cos 30°.', '0.1/0.866 ≈ 0.1155 mm.'),
          pr('What is the cusp height for any layer height on a vertical wall (θ = 90°), in mm?', 0, 'cos 90° = 0.', 'h × 0 = 0 mm.', { tol: 0.001 }),
        ],
      },
      {
        title: 'Printing metal',
        minutes: 25,
        explain: [
          'Metal powder-bed fusion spreads a layer of powder about 30–40 µm thick and melts lines in it with a laser. The energy delivered to each cubic millimetre is the laser power divided by the speed, the spacing between lines and the layer thickness.',
          'Too little energy leaves unmelted gaps, and too much boils the metal and traps gas. Good parts reach about 99.5% density or better.',
          'It is slow, but it wastes little. Aerospace firms care about the buy-to-fly ratio: the mass of metal bought for each kilogram that actually flies. Milling a titanium part from a block can waste over 90% of the metal.',
        ],
        formulas: [
          ['Energy density', 'E_v = \\frac{P}{v\\,s\\,t}'],
          ['Build rate', 'R = v\\,s\\,t'],
          ['Buy-to-fly', 'BTF = \\frac{m_{\\text{bought}}}{m_{\\text{part}}}'],
        ],
        examples: [
          ex('A 200 W laser moves at 1,000 mm/s with 0.1 mm spacing and 0.03 mm layers. Find the energy density.', [
            ['Bottom of the fraction.', '1000 \\times 0.1 \\times 0.03 = 3\\,\\text{mm}^3/\\text{s}'],
            ['Divide.', 'E_v = 200/3 = 66.7\\,\\text{J/mm}^3'],
          ], '66.7 J/mm³'),
          ex('At that build rate, how long does a 100 cm³ part take?', [
            ['Change volume.', '100\\,\\text{cm}^3 = 100\\,000\\,\\text{mm}^3'],
            ['Divide by the rate.', 't = 100\\,000/3 = 33\\,333\\,\\text{s} = 9.26\\,\\text{h}'],
          ], 'about 9.3 hours'),
        ],
        practice: [
          pr('300 W, 1,200 mm/s, 0.09 mm spacing, 0.04 mm layers. Energy density, in J/mm³?', 69.4, 'Rate = 1200 × 0.09 × 0.04.', '300/4.32 ≈ 69.4 J/mm³.'),
          pr('At a build rate of 4.32 mm³/s, how long does a 50 cm³ part take, in hours?', 3.21, 'Divide, then convert seconds.', '50,000/4.32 ≈ 11,574 s ≈ 3.21 h.'),
          pr('A 100 g titanium bracket is milled from a 1,500 g block. Buy-to-fly ratio?', 15, 'Mass bought ÷ mass of part.', '1500/100 = 15.'),
          pr('A printed part is 99.5% dense. What is its porosity, in %?', 0.5, 'Take it from 100%.', '100 − 99.5 = 0.5%.'),
        ],
      },
    ],
  },

  'mate-139': {
    predict: {
      q: 'You drain a lithium-ion cell in 20 minutes instead of 2 hours. Compared with the slow drain, how much energy do you get out?',
      options: ['Exactly the same', 'A little less, because the voltage sags', 'More, because the ions move faster', 'Nothing at all'],
      answer: 1,
      reveal: 'A little less. Drawing a large current drops the voltage inside the cell’s own resistance, and that lost energy becomes heat. That is why fast charging and hard acceleration warm a battery.',
    },
    parts: [
      {
        title: 'Energy stored',
        minutes: 15,
        explain: [
          'A battery stores energy chemically. As it discharges, ions move inside the cell from one electrode to the other while electrons flow around the outside circuit and do useful work. Alessandro Volta built the first such pile in 1800.',
          'Capacity tells how much charge a cell can move, in ampere-hours (Ah). Energy is capacity multiplied by voltage. A typical lithium-ion cell has about 3.7 V.',
          'Cells are joined end to end to add voltage and side by side to add capacity. The total energy is the energy of one cell multiplied by the number of cells.',
        ],
        formulas: [
          ['Energy', 'E = V \\times Q'],
          ['Specific energy', 'e = \\frac{E}{m}'],
        ],
        examples: [
          ex('A cell has 3.7 V and 3 Ah. Find its energy in Wh and joules.', [
            ['Multiply.', 'E = 3.7 \\times 3 = 11.1\\,\\text{Wh}'],
            ['One Wh is 3,600 J.', '11.1 \\times 3600 = 39\\,960\\,\\text{J}'],
          ], '11.1 Wh; about 40 kJ'),
          ex('A pack has 96 cells in series, each 3.7 V and 60 Ah. Find its voltage and energy.', [
            ['Voltage.', 'V = 96 \\times 3.7 = 355.2\\,\\text{V}'],
            ['Energy.', 'E = 355.2 \\times 60 = 21\\,312\\,\\text{Wh}'],
          ], '355 V; 21.3 kWh'),
        ],
        practice: [
          pr('A 3.7 V, 5 Ah cell stores how many Wh?', 18.5, 'Multiply.', '3.7 × 5 = 18.5 Wh.'),
          pr('An 11.1 Wh cell weighs 45 g. Specific energy, in Wh/kg?', 246.7, 'Change 45 g to 0.045 kg.', '11.1/0.045 ≈ 246.7 Wh/kg.'),
          pr('How many 18.5 Wh cells are needed for 50 kWh (a whole number, rounded up)?', 2703, 'Change 50 kWh to Wh.', '50,000/18.5 = 2,702.7, so 2,703 cells.', { tol: 1 }),
          pr('A 15 Wh battery powers a 5 W phone for how many hours?', 3, 'Time = energy/power.', '15/5 = 3 h.'),
        ],
      },
      {
        title: 'Where the capacity comes from',
        minutes: 25,
        explain: [
          'In a lithium-ion cell, lithium ions shuttle between a graphite anode and an oxide cathode such as LiCoO₂. John Goodenough found the cathode and Akira Yoshino made a safe working cell around it.',
          'Each lithium ion carries one electron’s worth of charge. Faraday’s constant says one mole of electrons carries 96,485 C, which equals 26.8 Ah. Dividing by the molar mass tells how much charge one gram of the electrode can hold.',
          'In practice LiCoO₂ can only give up about half of its lithium, because removing more damages its structure. So its usable capacity is about half its theoretical value.',
        ],
        formulas: [
          ['Theoretical capacity', 'q = \\frac{n F}{3.6\\,M}\\;\\text{mAh/g}'],
        ],
        examples: [
          ex('Find the theoretical capacity of graphite, using LiC₆ (one lithium per 72.07 g of carbon).', [
            ['Use n = 1.', 'q = \\frac{96\\,485}{3.6 \\times 72.07}'],
            ['Evaluate.', 'q = 371.9\\,\\text{mAh/g}'],
          ], 'about 372 mAh/g'),
          ex('Find the theoretical capacity of LiCoO₂ (97.87 g/mol), and the usable value at half.', [
            ['Use n = 1.', 'q = \\frac{96\\,485}{3.6 \\times 97.87} = 273.8\\,\\text{mAh/g}'],
            ['Half of that.', '273.8/2 = 137\\,\\text{mAh/g}'],
          ], '274; about 137 mAh/g'),
        ],
        practice: [
          pr('Find the theoretical capacity of LiFePO₄ (157.76 g/mol), in mAh/g.', 169.9, 'q = 96,485/(3.6 × M).', '96,485/567.9 ≈ 169.9 mAh/g.'),
          pr('How many grams of graphite (372 mAh/g) does a 3 Ah cell need?', 8.06, 'Use 3,000 mAh.', '3000/372 ≈ 8.06 g.'),
          pr('How many grams of LiCoO₂ (usable 140 mAh/g) does a 3 Ah cell need?', 21.4, 'Use 3,000 mAh.', '3000/140 ≈ 21.4 g.'),
          pr('1 Ah is 3,600 C and each ion carries 1.602 × 10⁻¹⁹ C. How many ions is that, in units of 10²² ions?', 2.247, 'Divide the charge by the charge per ion.', '3600/(1.602 × 10⁻¹⁹) ≈ 2.25 × 10²² ions, so the answer is about 2.25.'),
        ],
      },
      {
        title: 'Voltage under load',
        minutes: 20,
        explain: [
          'A cell has a small internal resistance R, due to its electrolyte and electrodes. As current flows, some of the voltage is lost inside the cell, so the output voltage is lower than the open-circuit voltage.',
          'That lost voltage does not vanish: it turns into heat, at a rate of I²R. A large current heats a cell much faster, since doubling the current makes four times the heat.',
          'Efficiency here is simply the fraction of the voltage that gets outside the cell.',
        ],
        formulas: [
          ['Output voltage', 'V = E - I R'],
          ['Heat', 'P = I^2 R'],
          ['Efficiency', '\\eta = \\frac{V}{E}'],
        ],
        examples: [
          ex('A 3.7 V cell has R = 0.05 Ω. Find the output voltage at 3 A.', [
            ['Voltage lost.', 'IR = 3 \\times 0.05 = 0.15\\,\\text{V}'],
            ['Output.', 'V = 3.7 - 0.15 = 3.55\\,\\text{V}'],
          ], '3.55 V'),
          ex('Find the heat produced in that cell at 3 A.', [
            ['Use P = I²R.', 'P = 3^2 \\times 0.05'],
            ['Evaluate.', 'P = 0.45\\,\\text{W}'],
          ], '0.45 W'),
        ],
        practice: [
          pr('A 3.7 V cell, R = 0.05 Ω, at 10 A. Output voltage, in V?', 3.2, 'V = E − IR.', '3.7 − 0.5 = 3.2 V.'),
          pr('The same cell at 10 A. Heat, in W?', 5, 'P = I²R.', '100 × 0.05 = 5 W.'),
          pr('A cell’s voltage drops from 3.7 V to 3.4 V at 6 A. Internal resistance, in Ω?', 0.05, 'R = ΔV/I.', '0.3/6 = 0.05 Ω.'),
          pr('A 3.7 V cell outputs 3.55 V under load. Efficiency, in %?', 95.9, 'Divide output by open-circuit voltage.', '3.55/3.7 ≈ 95.9%.'),
        ],
      },
      {
        title: 'C-rate, ageing and cost',
        minutes: 20,
        explain: [
          'The C-rate compares the current with the capacity. A rate of 1C drains the battery in one hour, and 2C drains it in half an hour.',
          'Each charge and discharge cycle slightly damages the cell, partly because a thin layer grows on the graphite and uses up lithium. Cells are often said to be worn out at 80% of their starting capacity.',
          'The real cost of stored energy spreads the purchase price across every kilowatt-hour the battery will deliver in its life.',
        ],
        formulas: [
          ['C-rate', 'C = \\frac{I}{Q}, \\quad t = \\frac{1}{C}\\;\\text{h}'],
          ['Cost per kWh', 'c = \\frac{\\text{price}}{E \\times \\text{cycles}}'],
        ],
        examples: [
          ex('A 3 Ah cell is discharged at 6 A. Find the C-rate and the discharge time.', [
            ['C-rate.', 'C = 6/3 = 2'],
            ['Time.', 't = 1/2\\,\\text{h} = 30\\,\\text{min}'],
          ], '2C; 30 minutes'),
          ex('A cell loses 0.02% of its capacity per cycle. What is left after 1,000 cycles, using a straight-line fade?', [
            ['Total loss.', '1000 \\times 0.02\\% = 20\\%'],
            ['Capacity left.', '100 - 20 = 80\\%'],
          ], '80%'),
        ],
        practice: [
          pr('A 3 Ah cell runs at 6C. Current, in A?', 18, 'I = C × Q.', '6 × 3 = 18 A.'),
          pr('A 5 Ah cell is discharged at 0.5C. Time, in hours?', 2, 't = 1/C.', '1/0.5 = 2 h.'),
          pr('A cell loses 0.04% per cycle. How many cycles until it reaches 80% capacity?', 500, 'It may lose 20%.', '20/0.04 = 500 cycles.'),
          pr('A ₱120,000 home battery stores 10 kWh and lasts 3,000 cycles. Cost per kWh delivered, in pesos?', 4, 'Total energy delivered is 10 × 3,000 kWh.', '120,000/30,000 = ₱4 per kWh.'),
        ],
      },
    ],
  },

  'eng-009': {
    predict: {
      q: 'Single rods vary in length with a spread of σ = 1 mm. Each dot on the chart is the average of 5 rods. The machine drifts by 1.5 mm. Will a dot go past the ±3σ/√5 control limits?',
      options: ['Yes, the limits are only about ±1.3 mm', 'No, the drift must reach 3 mm', 'No, the limits are ±5 mm', 'Only if 5 rods are all faulty'],
      answer: 0,
      reveal: 'Yes. Averages vary far less than single rods, so the limits are about ±1.34 mm. A real shift of 1.5 mm pushes the average past them, even though most single rods would still look normal.',
    },
    parts: [
      {
        title: 'Why averages vary less',
        minutes: 15,
        explain: [
          'Every process varies a little. If you measured rods one at a time, you could not tell ordinary scatter from a real change. Walter Shewhart’s insight in the 1920s was to plot the average of small samples instead.',
          'Averages have much less scatter than single measurements, because a high value and a low value tend to cancel. The standard deviation of an average of n values is σ/√n.',
          'To halve the scatter of the average, you need four times the sample size.',
        ],
        formulas: [
          ['Scatter of averages', '\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}'],
        ],
        examples: [
          ex('Rods have σ = 0.2 mm. Find the scatter of averages of 5 rods.', [
            ['Use σ/√n.', '0.2 / \\sqrt{5}'],
            ['Evaluate.', '0.0894\\,\\text{mm}'],
          ], '0.089 mm'),
          ex('Find the scatter if you measure 25 rods instead.', [
            ['Use σ/√n.', '0.2 / \\sqrt{25}'],
            ['Evaluate.', '0.04\\,\\text{mm}'],
          ], '0.04 mm'),
        ],
        practice: [
          pr('σ = 0.6 mm and n = 9. Scatter of the averages, in mm?', 0.2, '√9 = 3.', '0.6/3 = 0.2 mm.'),
          pr('σ = 1 mm and n = 4. Scatter of the averages, in mm?', 0.5, '√4 = 2.', '1/2 = 0.5 mm.'),
          pr('You sample 5 rods at a time. What sample size halves the scatter of the average?', 20, 'Multiply n by 4.', '5 × 4 = 20.'),
          pr('Five rods measure 10.1, 10.3, 9.9, 10.1 and 10.1 mm. What is their average, in mm?', 10.1, 'Add and divide by 5.', '50.5/5 = 10.1 mm.'),
        ],
      },
      {
        title: 'The control chart',
        minutes: 20,
        explain: [
          'A control chart plots sample averages in time order around a centre line. The limits are set at three standard deviations of the average on either side.',
          'A point outside the limits is a signal that something real has changed, so someone should look for a cause. Points inside are noise: changing the machine for them only makes things worse.',
          'With normal scatter, about 0.27% of points fall outside ±3σ by chance alone, so false alarms are rare but not impossible.',
        ],
        formulas: [
          ['Control limits', 'UCL,\\, LCL = \\bar{\\bar{x}} \\pm \\frac{3\\sigma}{\\sqrt{n}}'],
        ],
        examples: [
          ex('Centre line 100 mm, σ = 0.5 mm, n = 5. Find the limits.', [
            ['Half-width.', '3 \\times 0.5 / \\sqrt{5} = 0.671\\,\\text{mm}'],
            ['Limits.', '100 \\pm 0.671 = 99.33 \\text{ and } 100.67\\,\\text{mm}'],
          ], '99.33 and 100.67 mm'),
          ex('With those limits, a sample average reads 100.8 mm. Is it a signal?', [
            ['Compare with the upper limit.', '100.8 > 100.67'],
            ['It is outside, so look for a cause.', '\\text{signal}'],
          ], 'yes'),
        ],
        practice: [
          pr('Centre 50 mm, σ = 0.3 mm, n = 9. Upper limit, in mm?', 50.3, 'Half-width = 3σ/√n.', '50 + 3 × 0.3/3 = 50.3 mm.'),
          pr('Same chart. Lower limit, in mm?', 49.7, 'Subtract the half-width.', '50 − 0.3 = 49.7 mm.'),
          pr('σ = 0.5 mm and n = 25. Total width from LCL to UCL, in mm?', 0.6, 'Width = 6σ/√n.', '6 × 0.5/5 = 0.6 mm.'),
          pr('With a 0.27% false-alarm rate, how many false alarms do you expect in 1,000 points?', 2.7, 'Multiply.', '0.0027 × 1000 = 2.7.'),
        ],
      },
      {
        title: 'Process capability',
        minutes: 20,
        explain: [
          'A process can be perfectly steady and still make parts that the customer rejects. Capability compares the customer’s allowed range with the process’s natural spread.',
          'Cp = (USL − LSL)/6σ, where USL and LSL are the upper and lower specification limits. A value of 1.33 or more is a common target.',
          'Cp ignores where the process is centred. Cpk looks at the nearer limit, so it also shows whether the process has drifted off-centre.',
        ],
        formulas: [
          ['Capability', 'C_p = \\frac{USL - LSL}{6\\sigma}'],
          ['Centred capability', 'C_{pk} = \\min\\!\\left(\\frac{USL - \\mu}{3\\sigma},\\, \\frac{\\mu - LSL}{3\\sigma}\\right)'],
        ],
        examples: [
          ex('A rod must be 10 ± 0.6 mm and σ = 0.1 mm. Find Cp.', [
            ['Tolerance width.', '1.2\\,\\text{mm}'],
            ['Divide by 6σ.', 'C_p = 1.2/0.6 = 2'],
          ], 'Cp = 2'),
          ex('The process mean is now 10.2 mm. Find Cpk.', [
            ['Nearer limit is USL = 10.6.', '10.6 - 10.2 = 0.4'],
            ['Divide by 3σ.', 'C_{pk} = 0.4 / 0.3 = 1.33'],
          ], 'Cpk = 1.33'),
        ],
        practice: [
          pr('Tolerance 50 ± 0.3 mm and σ = 0.08 mm. Find Cp.', 1.25, 'Width is 0.6 mm.', '0.6/0.48 = 1.25.'),
          pr('A process has a tolerance width of 1.2 mm and must reach Cp = 1.33. Largest σ, in mm?', 0.15, 'σ = width/(6 × Cp).', '1.2/(6 × 1.33) ≈ 0.15 mm.'),
          pr('USL 5.5, LSL 4.5, mean 5.1, σ = 0.1. Find Cpk.', 1.33, 'The nearer limit is USL.', '0.4/0.3 ≈ 1.33.'),
          pr('USL 5.5, LSL 4.5 and σ = 0.1. Find Cp.', 1.67, 'Width is 1.0.', '1.0/0.6 ≈ 1.67.'),
        ],
      },
      {
        title: 'Acting on the signals',
        minutes: 15,
        explain: [
          'A point beyond the limits is the clearest signal, but not the only one. A long run on one side of the centre line is unlikely by chance, so it suggests a small steady drift.',
          'If points are equally likely to fall above or below, the chance of 8 in a row above is ½ multiplied by itself 8 times.',
          'W. Edwards Deming taught Japanese industry that most defects come from the system rather than the workers. ISO 9001 now asks firms to keep records and to act on them.',
        ],
        formulas: [
          ['Run on one side', 'P = \\left(\\tfrac12\\right)^{n}'],
          ['False alarms', 'E = N \\times 0.0027'],
        ],
        examples: [
          ex('What is the chance of 7 points in a row above the centre line, by chance alone?', [
            ['Multiply seven halves.', 'P = (0.5)^7'],
            ['Evaluate.', 'P = 0.0078 = 0.78\\%'],
          ], '0.78%'),
          ex('A chart is updated 24 times a day. How many false alarms should you expect in a year?', [
            ['Points per year.', '24 \\times 365 = 8760'],
            ['Multiply by the rate.', '8760 \\times 0.0027 = 23.7'],
          ], 'about 24'),
        ],
        practice: [
          pr('What is the chance of 8 points in a row above the centre line, in %?', 0.39, '(1/2)⁸.', '1/256 ≈ 0.0039, so 0.39%.'),
          pr('A batch of 2,000 rods has a 1.5% defect rate. How many are defective?', 30, 'Multiply.', '0.015 × 2000 = 30.'),
          pr('Each defective rod costs ₱250. What do the 30 defects cost, in pesos?', 7500, 'Multiply.', '30 × 250 = ₱7,500.'),
          pr('A chart is updated 12 times a day for a year. Expected false alarms?', 11.8, 'Use 0.27% of all points.', '12 × 365 × 0.0027 ≈ 11.8.'),
        ],
      },
    ],
  },

  'eng-010': {
    predict: {
      q: 'A plant making 10,000 tonnes a year costs ₱200 million to build. You design a plant with twice the capacity. How much will it cost?',
      options: ['₱400 million, twice as much', '₱300 million, about 50% more', '₱220 million, barely more', '₱800 million, four times as much'],
      answer: 1,
      reveal: 'About ₱300 million. Equipment cost grows more slowly than capacity: multiply by 2 to the power 0.6, which is 1.52. So each tonne of capacity gets cheaper as the plant gets bigger.',
    },
    parts: [
      {
        title: 'The six-tenths rule',
        minutes: 20,
        explain: [
          'A plant is a chain of unit operations: crushing, mixing, heating, separating. Before anyone builds one, engineers need a rough cost, long before detailed designs exist.',
          'A very useful shortcut scales the known cost of a similar plant. Cost rises with capacity to about the 0.6 power. Doubling capacity costs about 52% more, not 100%.',
          'The rule works over a moderate range of sizes, roughly a factor of up to 10. Its accuracy is about plus or minus 30%.',
        ],
        formulas: [
          ['Six-tenths rule', 'C_2 = C_1 \\left(\\frac{Q_2}{Q_1}\\right)^{0.6}'],
        ],
        examples: [
          ex('A 10,000 t/yr plant costs ₱200 million. Estimate a 20,000 t/yr plant.', [
            ['The capacity ratio is 2.', '2^{0.6} = 1.516'],
            ['Multiply.', 'C_2 = 200 \\times 1.516 = 303\\,\\text{million}'],
          ], '₱303 million'),
          ex('Estimate the cost of a smaller 5,000 t/yr plant.', [
            ['The capacity ratio is 0.5.', '0.5^{0.6} = 0.660'],
            ['Multiply.', 'C_2 = 200 \\times 0.660 = 132\\,\\text{million}'],
          ], '₱132 million'),
        ],
        practice: [
          pr('Estimate the cost of a 30,000 t/yr plant, in ₱ million (10,000 t/yr costs ₱200 million).', 386.6, '3^0.6 = 1.933.', '200 × 1.933 ≈ 386.6.'),
          pr('Estimate a plant ten times larger, in ₱ million.', 796, '10^0.6 = 3.981.', '200 × 3.981 ≈ 796.'),
          pr('A 100 t/day unit costs ₱5 million. Estimate a 400 t/day unit, in ₱ million.', 11.49, '4^0.6 = 2.297.', '5 × 2.297 ≈ 11.49.'),
          pr('Halving a plant’s capacity saves what percentage of its capital cost?', 34, '0.5^0.6 = 0.660.', '1 − 0.660 = 34%.'),
        ],
      },
      {
        title: 'Why 0.6?',
        minutes: 20,
        explain: [
          'Most equipment is containers: tanks, pipes, furnaces, vessels. Capacity follows the volume, but cost follows the amount of steel, which depends on the surface area.',
          'Area grows with volume to the power 2/3, so cost grows with capacity to about 0.67. Real plants come out a little lower, about 0.6, because items like controls barely grow.',
          'The result is that the cost of capacity per tonne falls as size rises. That is called economy of scale.',
        ],
        formulas: [
          ['Area and volume', 'A \\propto V^{2/3}'],
          ['Cost per tonne', 'c = \\frac{C}{Q} \\propto Q^{-0.4}'],
        ],
        examples: [
          ex('A tank’s volume is multiplied by 8. By what factor does its surface area grow?', [
            ['Use the 2/3 power.', '8^{2/3} = (\\sqrt[3]{8})^2'],
            ['Evaluate.', '2^2 = 4'],
          ], '4 times'),
          ex('Compare capital per tonne: 10,000 t/yr for ₱200 million against 40,000 t/yr.', [
            ['Small plant.', '200\\,\\text{M} / 10\\,000 = 20\\,000\\,\\text{pesos/t}'],
            ['Large plant cost.', 'C = 200 \\times 4^{0.6} = 459.5\\,\\text{M}'],
            ['Large plant per tonne.', '459.5\\,\\text{M} / 40\\,000 = 11\\,487\\,\\text{pesos/t}'],
          ], '₱20,000 against ₱11,487 per tonne'),
        ],
        practice: [
          pr('A tank’s volume is multiplied by 27. By what factor does its surface area grow?', 9, '27^(2/3).', '3² = 9.'),
          pr('A 20,000 t/yr plant costs ₱303.1 million. Capital per tonne of annual capacity, in pesos?', 15155, 'Divide cost by capacity.', '303,100,000/20,000 = ₱15,155.'),
          pr('With an exponent of 0.67, doubling capacity multiplies the cost by what factor?', 1.59, '2^0.67.', '2^0.67 ≈ 1.59.'),
          pr('A plant is made ten times larger. Its cost per tonne is what fraction of the original?', 0.398, 'Cost per tonne goes as Q^(−0.4).', '10^(−0.4) ≈ 0.398.'),
        ],
      },
      {
        title: 'Sizing from a mass balance',
        minutes: 20,
        explain: [
          'To size equipment you first work out how much material must pass through. A mass balance traces the material from ore to product.',
          'Ore contains only some valuable metal, and not all of it is recovered. Dividing the product by grade times recovery gives the ore tonnage. The Philippines mines nickel laterite this way, at grades of about 1–2% nickel.',
          'A plant does not run all year. Dividing the annual tonnage by the operating hours gives the feed rate that equipment must handle.',
        ],
        formulas: [
          ['Ore needed', 'm_{\\text{ore}} = \\frac{m_{\\text{metal}}}{g \\, r}'],
          ['Feed rate', '\\dot m = \\frac{m_{\\text{yr}}}{\\text{hours}}'],
        ],
        examples: [
          ex('A plant makes 1,000 t of nickel a year from 1.5% ore at 85% recovery. How much ore is needed?', [
            ['Multiply grade by recovery.', '0.015 \\times 0.85 = 0.01275'],
            ['Divide.', '1000 / 0.01275 = 78\\,431\\,\\text{t}'],
          ], 'about 78,400 t'),
          ex('The plant runs 8,000 hours a year. What is the ore feed rate?', [
            ['Divide tonnes by hours.', '78\\,431 / 8000'],
            ['Evaluate.', '9.8\\,\\text{t/h}'],
          ], '9.8 t/h'),
        ],
        practice: [
          pr('2,000 t of nickel from 2% ore at 90% recovery. Ore needed, in t?', 111111, 'Multiply the grade and recovery first.', '2000/0.018 ≈ 111,111 t.'),
          pr('A plant is available 90% of the year. Operating hours per year?', 7884, 'A year has 8,760 hours.', '0.9 × 8760 = 7,884 h.'),
          pr('50,000 t a year in 7,500 hours. Feed rate, in t/h?', 6.67, 'Divide.', '50,000/7,500 ≈ 6.67 t/h.'),
          pr('100 t of feed passes through 3 stages, each keeping 95%. What mass comes out, in t?', 85.7, '0.95³.', '100 × 0.857 ≈ 85.7 t.'),
        ],
      },
      {
        title: 'Annual profit and payback',
        minutes: 20,
        explain: [
          'A plant has to earn money after every cost. Each tonne earns its selling price less its operating cost. The owner also has to pay for the capital, a yearly charge of about 10–20% of the plant’s cost.',
          'Payback time is the capital divided by the yearly profit. Larger plants often earn more, but only if the market can buy everything they make.',
          'A plant that can only sell part of its output still has to pay the whole capital charge.',
        ],
        formulas: [
          ['Annual profit', '\\Pi = Q(p - c) - r\\,C_{\\text{cap}}'],
          ['Payback', 't = \\frac{C_{\\text{cap}}}{\\Pi}'],
        ],
        examples: [
          ex('Q = 10,000 t/yr, price ₱30,000, operating cost ₱18,000 per tonne, plant ₱200 million, capital charge 15%. Find the profit.', [
            ['Margin.', '10\\,000 \\times 12\\,000 = 120\\,\\text{M}'],
            ['Capital charge.', '0.15 \\times 200 = 30\\,\\text{M}'],
            ['Profit.', '120 - 30 = 90\\,\\text{M}'],
          ], '₱90 million a year'),
          ex('Find the payback time of that plant, using its ₱90 million yearly profit.', [
            ['Divide.', 't = 200 / 90'],
            ['Evaluate.', 't = 2.2\\,\\text{years}'],
          ], '2.2 years'),
        ],
        practice: [
          pr('Q = 5,000 t/yr, margin ₱10,000 per tonne, plant ₱100 million, charge 20%. Profit, in ₱ million?', 30, 'Margin minus capital charge.', '50 − 20 = ₱30 million.'),
          pr('A ₱100 million plant earns ₱30 million a year. Payback, in years?', 3.33, 'Divide.', '100/30 ≈ 3.33 years.'),
          pr('Margin is ₱10,000 per tonne and the capital charge is ₱20 million a year. What output breaks even, in t/yr?', 2000, 'Set Q × margin equal to the charge.', '20,000,000/10,000 = 2,000 t/yr.'),
          pr('A plant sells 15,000 t at a ₱12,000 margin and has a ₱45.5 million capital charge. Profit, in ₱ million?', 134.5, 'Margin earned minus the charge.', '180 − 45.5 = ₱134.5 million.'),
        ],
      },
    ],
  },

  'eng-011': {
    predict: {
      q: 'A materials startup has ₱6 million, spends ₱400,000 a month, and its sales begin at ₱50,000 a month, growing 10% each month. Does the cash last until sales catch up with spending?',
      options: ['No, it runs out at about 17 months', 'Yes, with cash to spare, about month 22', 'No, sales never catch up', 'Yes, by month 6'],
      answer: 1,
      reveal: 'Yes. Ignoring growth, the money lasts about 17 months. But sales growing 10% a month reach ₱400,000 at about month 22, and by then the total shortfall has been about ₱5.2 million, less than the ₱6 million in the bank.',
    },
    parts: [
      {
        title: 'Burn rate and runway',
        minutes: 20,
        explain: [
          'Technopreneurship means building a business around a new technology. Thomas Edison’s Menlo Park lab was an early example: it produced inventions, and the businesses to sell them.',
          'A young company usually spends more than it earns. The difference each month is called the net burn. The number of months its cash will last is called the runway.',
          'Runway tells a founder how long there is to prove the business, or to raise more money.',
        ],
        formulas: [
          ['Net burn', 'B = \\text{costs} - \\text{revenue}'],
          ['Runway', 'R = \\frac{\\text{cash}}{B}'],
        ],
        examples: [
          ex('A company has ₱6 million, spends ₱400,000 a month and earns ₱50,000. Find its runway.', [
            ['Net burn.', 'B = 400\\,000 - 50\\,000 = 350\\,000'],
            ['Runway.', 'R = 6\\,000\\,000 / 350\\,000 = 17.1'],
          ], 'about 17 months'),
          ex('A company has ₱4.8 million, spends ₱500,000 and earns ₱100,000 a month. Find its runway.', [
            ['Net burn.', 'B = 400\\,000'],
            ['Runway.', 'R = 4\\,800\\,000 / 400\\,000 = 12'],
          ], '12 months'),
        ],
        practice: [
          pr('₱9 million cash, ₱450,000 costs and ₱150,000 revenue each month. Runway, in months?', 30, 'Net burn is the difference.', '9,000,000/300,000 = 30 months.'),
          pr('₱6 million cash and net burn cut to ₱250,000. Runway, in months?', 24, 'Divide.', '6,000,000/250,000 = 24 months.'),
          pr('What cash, in ₱ million, gives 18 months at ₱300,000 net burn?', 5.4, 'Multiply.', '18 × 0.3 = ₱5.4 million.'),
          pr('₱3.2 million cash, ₱400,000 costs, no revenue. Runway, in months?', 8, 'Divide.', '3,200,000/400,000 = 8 months.'),
        ],
      },
      {
        title: 'Growing revenue',
        minutes: 20,
        explain: [
          'Sales that grow by a fixed percentage each month grow like compound interest. Small differences in the growth rate make a large difference after a year or two.',
          'A handy figure is the doubling time: how many months it takes for revenue to double. The rule of 70 estimates it by dividing 70 by the percentage growth rate.',
        ],
        formulas: [
          ['Compound growth', 'R_n = R_0 (1 + g)^n'],
          ['Doubling time', 'n_2 = \\frac{\\ln 2}{\\ln(1 + g)} \\approx \\frac{70}{\\%g}'],
        ],
        examples: [
          ex('Sales start at ₱50,000 and grow 10% a month. Find sales after 12 months.', [
            ['Growth factor.', '1.1^{12} = 3.138'],
            ['Multiply.', 'R_{12} = 50\\,000 \\times 3.138 = 156\\,900'],
          ], 'about ₱156,900'),
          ex('Find the doubling time at 10% a month.', [
            ['Divide the logarithms.', 'n_2 = \\ln 2 / \\ln 1.1'],
            ['Evaluate.', 'n_2 = 7.27\\,\\text{months}'],
          ], 'about 7.3 months'),
        ],
        practice: [
          pr('Sales of ₱100,000 grow 5% a month. Sales after 24 months, in pesos?', 322500, '1.05²⁴ = 3.225.', '100,000 × 3.225 = ₱322,500.'),
          pr('Sales of ₱50,000 grow 20% a month. Sales after 6 months, in pesos?', 149299, '1.2⁶ = 2.986.', '50,000 × 2.986 ≈ ₱149,300.'),
          pr('What is the doubling time at 5% a month, in months?', 14.2, 'Use ln 2 / ln 1.05.', '0.693/0.0488 ≈ 14.2 months.'),
          pr('Using the rule of 70, what is the doubling time at 7% a month, in months?', 10, 'Divide 70 by the percentage.', '70/7 = 10 months.'),
        ],
      },
      {
        title: 'The break-even month',
        minutes: 20,
        explain: [
          'Break-even arrives when monthly sales reach monthly costs. With fixed costs, you can solve for that month using logarithms, then round up to a whole month.',
          'The total cash used until then is the sum of each month’s shortfall. Sales in the months before break-even add up to a geometric series, a type of sum you can work out with one formula.',
          'Faster growth shortens the time to break-even dramatically, and that is why investors focus on growth.',
        ],
        formulas: [
          ['Break-even month', 'n = \\frac{\\ln(C / R_0)}{\\ln(1 + g)}'],
          ['Sales so far', 'S_n = R_0 \\frac{(1 + g)^n - 1}{g}'],
        ],
        examples: [
          ex('Costs ₱400,000 a month, sales start at ₱50,000 and grow 10%. Find the break-even month.', [
            ['Ratio.', 'C / R_0 = 8'],
            ['Divide the logarithms.', 'n = \\ln 8 / \\ln 1.1 = 21.8'],
            ['Round up.', 'n = 22'],
          ], 'month 22'),
          ex('Find the break-even month if growth is 20% a month.', [
            ['Divide the logarithms.', 'n = \\ln 8 / \\ln 1.2 = 11.4'],
            ['Round up.', 'n = 12'],
          ], 'month 12'),
        ],
        practice: [
          pr('Costs ₱300,000, sales ₱60,000 growing 10% a month. Exact break-even month (one decimal)?', 16.9, 'ln 5 / ln 1.1.', '1.609/0.0953 ≈ 16.9.'),
          pr('Costs ₱400,000, sales ₱50,000 growing 15% a month. Exact break-even month (one decimal)?', 14.9, 'ln 8 / ln 1.15.', '2.079/0.1398 ≈ 14.9.'),
          pr('Costs ₱400,000, sales ₱50,000 growing 5% a month. Exact break-even month (one decimal)?', 42.6, 'ln 8 / ln 1.05.', '2.079/0.0488 ≈ 42.6.'),
          pr('Sales start at ₱50,000 and grow 10%. Total sales over the first 12 months, in pesos?', 1069000, 'Use the series formula with 1.1¹² = 3.138.', '50,000 × 2.138/0.1 ≈ ₱1,069,000.'),
        ],
      },
      {
        title: 'Unit economics and investors',
        minutes: 20,
        explain: [
          'Each product sold has to earn more than the cost of making it. The difference is the contribution per unit. Fixed costs like rent and salaries are then covered by the contributions.',
          'To raise money, founders sell shares. If an investor pays ₱5 million for 20%, the whole company is valued at ₱25 million after the money goes in. That is the post-money value.',
          'Each new round makes the founder’s share smaller. This is called dilution, and it multiplies: each round takes its percentage of what the founder has left.',
        ],
        formulas: [
          ['Break-even units', 'Q = \\frac{F}{p - c}'],
          ['Post-money', 'V = \\frac{\\text{investment}}{\\text{share}}'],
        ],
        examples: [
          ex('A coating sells at ₱500/kg and costs ₱300/kg to make. Fixed costs are ₱400,000 a month. How many kg must be sold each month?', [
            ['Contribution.', '500 - 300 = 200'],
            ['Divide.', 'Q = 400\\,000 / 200 = 2000\\,\\text{kg}'],
          ], '2,000 kg'),
          ex('An investor pays ₱5 million for 20%. Find the post-money value and the value before the money.', [
            ['Post-money.', 'V = 5 / 0.2 = 25\\,\\text{M}'],
            ['Before the money.', '25 - 5 = 20\\,\\text{M}'],
          ], '₱25 million; ₱20 million'),
        ],
        practice: [
          pr('Price ₱800, cost ₱500, fixed costs ₱600,000 per month. Units to break even each month?', 2000, 'Fixed ÷ contribution.', '600,000/300 = 2,000 units.'),
          pr('A founder sells 25% in round one and then 20% in round two. What percentage does the founder keep?', 60, 'Multiply what remains.', '0.75 × 0.80 = 0.60 = 60%.'),
          pr('An investor pays ₱10 million for 25%. Post-money value, in ₱ million?', 40, 'Investment ÷ share.', '10/0.25 = ₱40 million.'),
          pr('Price ₱500 and cost ₱300. Contribution as a percentage of price?', 40, 'Margin ÷ price.', '200/500 = 40%.'),
        ],
      },
    ],
  },

  'eng-012': {
    predict: {
      q: 'You test plain and fibre bricks. You test 16 bricks of each type instead of 4. What happens to the uncertainty in the difference between the two averages?',
      options: ['It stays the same', 'It falls to a half', 'It falls to a quarter', 'It falls to a sixteenth'],
      answer: 1,
      reveal: 'It falls to a half. The uncertainty shrinks with the square root of the sample size. Four times the bricks means √4 = 2, so the error bars become half as wide.',
    },
    parts: [
      {
        title: 'Asking a question, measuring the scatter',
        minutes: 20,
        explain: [
          'A thesis asks a clear question, tests it with a planned experiment, and reports what happened honestly so that others can check the work. Wilhelm von Humboldt’s universities made research a central part of university life in the 1800s.',
          'Most materials theses compare things: does the fibre make the brick stronger? Each test gives a slightly different value, so you need the average and also a measure of the scatter.',
          'The sample standard deviation s measures how far values typically lie from the average. Dividing by n − 1 rather than n corrects for the fact that the average came from the same data.',
        ],
        formulas: [
          ['Average', '\\bar{x} = \\frac{\\sum x_i}{n}'],
          ['Standard deviation', 's = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}'],
        ],
        examples: [
          ex('Three bricks test at 20, 22 and 24 MPa. Find the mean and standard deviation.', [
            ['Mean.', '\\bar{x} = 66/3 = 22\\,\\text{MPa}'],
            ['Squared differences.', '4 + 0 + 4 = 8'],
            ['Divide by n − 1 and take the root.', 's = \\sqrt{8/2} = 2\\,\\text{MPa}'],
          ], 'mean 22; s = 2 MPa'),
          ex('Five bricks test at 30, 34, 32, 36 and 28 MPa. Find the mean and standard deviation.', [
            ['Mean.', '\\bar{x} = 160/5 = 32\\,\\text{MPa}'],
            ['Squared differences.', '4 + 4 + 0 + 16 + 16 = 40'],
            ['Divide by n − 1 and take the root.', 's = \\sqrt{40/4} = 3.16\\,\\text{MPa}'],
          ], 'mean 32; s = 3.16 MPa'),
        ],
        practice: [
          pr('Find the mean of 10, 14 and 12.', 12, 'Add and divide.', '36/3 = 12.'),
          pr('Find the standard deviation of 10, 14 and 12.', 2, 'Squared differences add to 8.', '√(8/2) = 2.'),
          pr('Find the mean of 4, 6, 8 and 10.', 7, 'Add and divide.', '28/4 = 7.'),
          pr('Find the standard deviation of 4, 6, 8 and 10.', 2.58, 'Squared differences add to 20.', '√(20/3) ≈ 2.58.'),
        ],
      },
      {
        title: 'The uncertainty of a difference',
        minutes: 20,
        explain: [
          'Two groups of tests each have their own uncertainty. When you subtract the averages, the uncertainties do not cancel: they combine.',
          'The standard error of the difference uses each group’s variance divided by its sample size, added together, and square-rooted.',
          'A larger sample shrinks this uncertainty, but only slowly: it takes four times the samples to halve it.',
        ],
        formulas: [
          ['Standard error of a difference', 'SE = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}'],
        ],
        examples: [
          ex('Two groups each have s = 3 MPa and n = 5. Find SE.', [
            ['Each term.', '9/5 = 1.8'],
            ['Add and take the root.', 'SE = \\sqrt{1.8 + 1.8} = 1.90\\,\\text{MPa}'],
          ], '1.90 MPa'),
          ex('Groups have s₁ = 4 and s₂ = 2 MPa, each with n = 8. Find SE.', [
            ['Each term.', '16/8 = 2, \\quad 4/8 = 0.5'],
            ['Add and take the root.', 'SE = \\sqrt{2.5} = 1.58\\,\\text{MPa}'],
          ], '1.58 MPa'),
        ],
        practice: [
          pr('Both groups have s = 2 and n = 8. Find SE.', 1, 'Each term is 0.5.', '√(0.5 + 0.5) = 1.'),
          pr('Both groups have s = 6 and n = 9. Find SE.', 2.83, 'Each term is 4.', '√8 ≈ 2.83.'),
          pr('s₁ = 5 with n₁ = 25, and s₂ = 12 with n₂ = 36. Find SE.', 2.24, 'The terms are 1 and 4.', '√5 ≈ 2.24.'),
          pr('Sample sizes are multiplied by 4. SE becomes what fraction of its old value?', 0.5, 'SE follows 1/√n.', '1/√4 = 0.5.'),
        ],
      },
      {
        title: 'The t statistic',
        minutes: 20,
        explain: [
          'William Gosset worked at the Guinness brewery in Dublin, where he had to judge small samples of barley. Writing under the name Student in 1908, he worked out how to do it properly.',
          'The t statistic divides the difference between the two means by its standard error. A large size of t means the difference is big compared with the scatter.',
          'Compare t with a critical value from a table, using n₁ + n₂ − 2 degrees of freedom. If the size of t is larger, you call the difference significant: it is unlikely to be chance.',
        ],
        formulas: [
          ['t statistic', 't = \\frac{\\bar{x}_2 - \\bar{x}_1}{SE}'],
          ['Degrees of freedom', '\\text{df} = n_1 + n_2 - 2'],
        ],
        examples: [
          ex('Fibre bricks average 6 MPa stronger, with SE = 1.90 MPa and n = 5 each. The critical t for 8 degrees of freedom is 2.306. Is it significant?', [
            ['Find t.', 't = 6/1.90 = 3.16'],
            ['Compare.', '3.16 > 2.306'],
          ], 'yes, significant'),
          ex('The difference is only 2 MPa, with the same SE. Is it significant?', [
            ['Find t.', 't = 2/1.90 = 1.05'],
            ['Compare.', '1.05 < 2.306'],
          ], 'no'),
        ],
        practice: [
          pr('The difference is 5 and SE is 2. Find t.', 2.5, 'Divide.', '5/2 = 2.5.'),
          pr('SE = 1.5. What difference gives t = 2.0?', 3, 'Multiply.', '2 × 1.5 = 3.'),
          pr('Groups of 8 and 8. How many degrees of freedom?', 14, 'n₁ + n₂ − 2.', '8 + 8 − 2 = 14.'),
          pr('With a critical value of 2.2, how many of these are significant: t = 1.2, 2.5, 3.1, −2.4?', 3, 'Ignore the sign and compare the size.', '2.5, 3.1 and −2.4: 3.'),
        ],
      },
      {
        title: 'Planning a sample, and honest reporting',
        minutes: 20,
        explain: [
          'Good planning happens before the tests. To detect a difference Δ, you need the standard error to be small compared with Δ. A rough estimate of the samples per group needed comes from setting t ≈ 2.',
          'A confidence interval says more than a yes or no answer. It gives the range of differences that the data support.',
          'Honesty matters most. If you test 20 ideas at the 5% level, one will seem significant by chance alone. Decide your test in advance, report every result, and include those that failed.',
        ],
        formulas: [
          ['Sample size', 'n \\approx 2\\left(\\frac{t\\,s}{\\Delta}\\right)^{2}'],
          ['Confidence interval', '\\Delta \\pm t \\cdot SE'],
        ],
        examples: [
          ex('Brick strength scatters with s = 3 MPa. To detect Δ = 3 MPa with t ≈ 2, how many bricks per group?', [
            ['Bracket.', '2 \\times 3 / 3 = 2'],
            ['Square and double.', 'n = 2 \\times 2^2 = 8'],
          ], '8 bricks per group'),
          ex('The difference is 6 MPa, SE = 1.90 and t = 2.306. Find the 95% confidence interval.', [
            ['Half-width.', '2.306 \\times 1.90 = 4.38'],
            ['Range.', '6 \\pm 4.38 = 1.62 \\text{ to } 10.38\\,\\text{MPa}'],
          ], '1.6 to 10.4 MPa'),
        ],
        practice: [
          pr('s = 4, Δ = 2, t ≈ 2. Samples per group?', 32, 'The bracket is 4.', '2 × 4² = 32.'),
          pr('s = 5, Δ = 5, t ≈ 2. Samples per group?', 8, 'The bracket is 2.', '2 × 2² = 8.'),
          pr('t = 2 and SE = 1.5. What is the half-width of the confidence interval?', 3, 'Multiply.', '2 × 1.5 = 3.'),
          pr('You test 20 ideas that do nothing, at the 5% level. How many false positives do you expect?', 1, 'Multiply.', '20 × 0.05 = 1.'),
        ],
      },
    ],
  },

  'mate-402': {
    predict: {
      q: 'For a light, stiff beam, the best material has the highest √E/ρ. Steel is about three times stiffer than aluminium, but also about three times denser. Which makes the lighter beam?',
      options: ['Steel, because it is stiffer', 'Aluminium, by a wide margin', 'They tie exactly', 'Neither one can make a beam'],
      answer: 1,
      reveal: 'Aluminium, and by a lot. Stiffness counts only through its square root in a beam, while density counts fully. So steel’s stiffness advantage shrinks and its weight penalty does not. This is why aircraft are not made of steel.',
    },
    parts: [
      {
        title: 'Galvanic cells and corrosion',
        minutes: 20,
        explain: [
          'Corrosion is what happens when a refined metal goes back toward its natural state as ore. It releases energy, so the metal is always inclined to do it. Corrosion is really a pair of chemical reactions.',
          'At the anode the metal loses electrons and dissolves: oxidation. At the cathode something else gains those electrons: reduction. A handy memory aid is AN OX and RED CAT.',
          'Join two different metals in a wet environment and the more reactive one becomes the anode and corrodes. The driving voltage is the difference between their standard potentials.',
        ],
        formulas: [
          ['Cell voltage', 'E = E_{\\text{cathode}} - E_{\\text{anode}}'],
          ['Free energy', '\\Delta G = -nFE'],
        ],
        examples: [
          ex('Find the voltage of a zinc (−0.76 V) and copper (+0.34 V) cell.', [
            ['Zinc is more negative, so it is the anode.', 'E = 0.34 - (-0.76)'],
            ['Evaluate.', 'E = 1.10\\,\\text{V}'],
          ], '1.10 V'),
          ex('Zinc and iron (−0.44 V) are joined. Which is the anode, and what is the voltage?', [
            ['Zinc is more negative, so zinc corrodes.', '\\text{anode: zinc}'],
            ['Voltage.', 'E = -0.44 - (-0.76) = 0.32\\,\\text{V}'],
          ], 'zinc; 0.32 V'),
        ],
        practice: [
          pr('Find the voltage of a magnesium (−2.37 V) and iron (−0.44 V) couple, in V.', 1.93, 'Cathode minus anode.', '−0.44 − (−2.37) = 1.93 V.'),
          pr('Find the voltage of an aluminium (−1.66 V) and copper (+0.34 V) couple, in V.', 2, 'Cathode minus anode.', '0.34 − (−1.66) = 2.00 V.'),
          pr('Find the voltage of a nickel (−0.25 V) and iron (−0.44 V) couple, in V.', 0.19, 'Iron is the anode here.', '−0.25 − (−0.44) = 0.19 V.'),
          pr('A 1.10 V cell moves 2 mol of electrons per reaction (F = 96,485 C/mol). What is the size of ΔG, in kJ?', 212.3, 'ΔG = −nFE.', '2 × 96,485 × 1.10 ≈ 212,300 J = 212.3 kJ.'),
        ],
      },
      {
        title: 'Faraday’s law: how fast metal is lost',
        minutes: 25,
        explain: [
          'Every atom that dissolves releases electrons, so current measures corrosion directly. Michael Faraday worked out the relationship in the 1830s. The same law governs electroplating, in which metal is put on instead of taken off.',
          'Here I is the current, t the time, M the molar mass, n the number of electrons each atom gives up, and F is Faraday’s constant.',
          'The mass lost can be converted to a thickness by dividing by density and area. Engineers quote corrosion rates in millimetres per year.',
        ],
        formulas: [
          ['Faraday’s law', 'm = \\frac{I t M}{n F}'],
          ['Thickness lost', 'd = \\frac{m}{\\rho A}'],
        ],
        examples: [
          ex('A current of 1 A dissolves iron (M = 55.85, n = 2) for one year (3.156 × 10⁷ s). Find the mass lost.', [
            ['Use the formula.', 'm = \\frac{1 \\times 3.156 \\times 10^{7} \\times 55.85}{2 \\times 96\\,485}'],
            ['Evaluate.', 'm = 9134\\,\\text{g}'],
          ], 'about 9.1 kg'),
          ex('How much zinc (M = 65.38, n = 2) is plated by 2 A in one hour?', [
            ['Use the formula.', 'm = \\frac{2 \\times 3600 \\times 65.38}{2 \\times 96\\,485}'],
            ['Evaluate.', 'm = 2.44\\,\\text{g}'],
          ], '2.44 g'),
        ],
        practice: [
          pr('A 5 A current dissolves a zinc anode for 30 days. Mass, in kg? (M = 65.38, n = 2)', 4.39, 'Thirty days is 2,592,000 s.', '5 × 2,592,000 × 65.38/192,970 ≈ 4,391 g = 4.39 kg.'),
          pr('How much copper (M = 63.55, n = 2) is plated by 3 A in 2 h, in g?', 7.11, 'Two hours is 7,200 s.', '3 × 7200 × 63.55/192,970 ≈ 7.11 g.'),
          pr('9,134 g of iron (7.87 g/cm³) is lost evenly from 1 m². Thickness, in mm?', 1.16, 'Volume/area, using 10,000 cm².', '1,160.6 cm³/10,000 cm² = 0.116 cm = 1.16 mm.'),
          pr('How much aluminium (M = 26.98, n = 3) dissolves at 1 A in 1 h, in g?', 0.336, 'Use n = 3.', '3600 × 26.98/289,455 ≈ 0.336 g.'),
        ],
      },
      {
        title: 'Cathodic protection',
        minutes: 20,
        explain: [
          'Attach a more reactive metal such as zinc or magnesium to a steel ship’s hull and the zinc becomes the anode. It corrodes in place of the steel, so it is called a sacrificial anode. The steel, now the cathode, is protected.',
          'The size of the anode follows from Faraday’s law. Multiply the area of steel by the current density it needs to get the current, and then find the mass consumed over the design life.',
          'Area ratios matter. A small anode joined to a large cathode has to supply all the current through a small surface, so it corrodes very fast.',
        ],
        formulas: [
          ['Current needed', 'I = i \\, A'],
          ['Anode mass', 'm = \\frac{I t M}{n F \\, u}'],
        ],
        examples: [
          ex('A hull of 100 m² needs 20 mA/m². Find the current.', [
            ['Multiply.', 'I = 100 \\times 0.020'],
            ['Evaluate.', 'I = 2\\,\\text{A}'],
          ], '2 A'),
          ex('How much zinc does that 2 A use in one year, if only 85% of the anode can be used?', [
            ['Faraday’s law.', 'm = \\frac{2 \\times 3.156 \\times 10^{7} \\times 65.38}{192\\,970} = 21\\,386\\,\\text{g}'],
            ['Allow for use of only 85%.', '21.39/0.85 = 25.2\\,\\text{kg}'],
          ], 'about 25 kg'),
        ],
        practice: [
          pr('A 50 m² structure needs 30 mA/m². Current, in A?', 1.5, 'Change mA to A.', '50 × 0.03 = 1.5 A.'),
          pr('How much zinc (kg) does 1.5 A consume over 2 years (6.312 × 10⁷ s), counting all of it?', 32.1, 'Use Faraday’s law with n = 2.', '1.5 × 6.312 × 10⁷ × 65.38/192,970 ≈ 32,080 g = 32.1 kg.'),
          pr('A cathode has 100 times the area of its anode. By what factor is the anode’s current density larger than the cathode’s?', 100, 'The same current passes through both.', 'The current density ratio equals the area ratio: 100.'),
          pr('A zinc coating 85 µm thick loses 1 µm per year. How many years will it last?', 85, 'Divide.', '85/1 = 85 years.'),
        ],
      },
      {
        title: 'Choosing a material: Ashby’s method',
        minutes: 25,
        explain: [
          'Michael Ashby’s method turns material choice into a calculation. Write the part’s requirement, then find the combination of properties that gives the lightest design. That combination is a performance number M. The bigger M is, the better.',
          'For a tie rod that must be stiff, M = E/ρ. For a light, stiff beam, M = √E/ρ. Each comes from the equations for that shape of part, and that is why the same materials rank differently.',
          'The mass of the part is proportional to 1/M, so the ratio of M values tells how much lighter one choice is. After M, you also check cost, corrosion and availability.',
        ],
        formulas: [
          ['Tie rod', 'M = \\frac{E}{\\rho}'],
          ['Beam', 'M = \\frac{\\sqrt{E}}{\\rho}'],
          ['Mass ratio', '\\frac{m_A}{m_B} = \\frac{M_B}{M_A}'],
        ],
        examples: [
          ex('Compare steel (200 GPa, 7.85 g/cm³) and aluminium (70 GPa, 2.7 g/cm³) for a stiff tie rod.', [
            ['Steel.', 'M = 200/7.85 = 25.5'],
            ['Aluminium.', 'M = 70/2.7 = 25.9'],
          ], 'almost equal'),
          ex('Compare the same two, and carbon fibre composite (150 GPa, 1.6 g/cm³), for a light beam.', [
            ['Steel.', 'M = \\sqrt{200}/7.85 = 1.80'],
            ['Aluminium.', 'M = \\sqrt{70}/2.7 = 3.10'],
            ['Composite.', 'M = \\sqrt{150}/1.6 = 7.65'],
          ], 'composite wins, then aluminium'),
        ],
        practice: [
          pr('Find M = √E/ρ for alumina (E = 380 GPa, ρ = 3.9 g/cm³).', 5, 'Take the root of E first.', '19.49/3.9 ≈ 5.0.'),
          pr('Find M = E/ρ for carbon fibre composite (150 GPa, 1.6 g/cm³).', 93.75, 'Divide.', '150/1.6 = 93.75.'),
          pr('Find M = √E/ρ for titanium (110 GPa, 4.5 g/cm³).', 2.33, 'Take the root of E first.', '10.49/4.5 ≈ 2.33.'),
          pr('For a light beam with M = 1.80 for steel and 3.10 for aluminium, how many times heavier is the steel beam?', 1.72, 'Mass ratio is the inverse of the M ratio.', '3.10/1.80 ≈ 1.72.'),
        ],
      },
    ],
  },
};
