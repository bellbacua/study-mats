// Year 3, second semester: materials, dynamics, electrical engineering and professional practice.
const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const YEAR3B = {
  'mate-124': {
    predict: {
      q: 'The iron map shows a pier corroding at pH 8 and −0.45 V. Without changing the seawater, which move could make bare iron stable?',
      options: ['Raise the potential to −0.30 V', 'Keep the potential at −0.45 V', 'Lower the potential to −0.80 V', 'Raise the potential to −0.10 V'],
      answer: 2,
      reveal: 'Lowering the potential crosses the immunity boundary near −0.62 V. Higher potentials may favour a protective oxide film in this simplified map; that is passivation.',
    },
    parts: [
      {
        title: 'Where metal is lost',
        minutes: 25,
        explain: [
          'Corrosion is a chemical change that consumes metal. At an anodic site, metal atoms lose electrons and enter the water as ions. A cathodic reaction elsewhere uses those electrons. Both reactions need a conducting path.',
          'Uniform attack spreads over a surface. Pitting concentrates loss into holes; crevice attack hides beneath seals. Grain boundaries can be attacked too. The same lost mass can be much more dangerous when it is concentrated in one place.',
          'Here Δm is mass lost, ρ is density and A is exposed area. Dividing mass by density gives lost volume; dividing that volume by area gives average penetration d. Time t then gives rate r.',
        ],
        formulas: [
          ['Average penetration', 'd = \\frac{\\Delta m}{\\rho A}'],
          ['Loss rate', 'r = d/t'],
        ],
        examples: [
          ex('A steel coupon loses 7.8 g over 10 cm². Take density as 7.8 g/cm³ and uniform attack. Find lost thickness in mm.', [
            ['Divide mass by density and area, then convert cm to mm.', '7.8/(7.8 \\times  10) \\times  10'],
            ['Evaluate, keeping the stated units.', '1\\,\\text{mm}'],
          ], '1 mm'),
          ex('Uniform penetration is 0.24 mm in 3 years. Find the average rate in mm/year.', [
            ['Divide penetration by exposure time.', '0.24/3'],
            ['Evaluate, keeping the stated units.', '0.08\\,\\text{mm/year}'],
          ], '0.08 mm/year'),
        ],
        practice: [
          pr('A coating test loses 0.12 mm in 2 years. Find the average rate in mm/year.', 0.06, 'Use thickness lost per year.', '0.12/2 = 0.06 mm/year.', { tol: 0.0006 }),
          pr('A 6 mm plate loses 0.2 mm uniformly from one face each year. What thickness remains after 5 years, in mm?', 5, 'Subtract the total loss from the original thickness.', '6 − 0.2 × 5 = 5 mm.'),
          pr('A pit is 1.8 mm deep while the average penetration is 0.15 mm. Find pit depth divided by average penetration.', 12, 'Compare the local damage with the average.', '1.8/0.15 = 12.'),
          pr('A 3 mm corrosion allowance is consumed at a constant 0.12 mm/year. How many years does that allowance cover?', 25, 'Divide the allowance by the assumed rate.', '3/0.12 = 25 years.'),
        ],
      },
      {
        title: 'Reading the iron map',
        minutes: 25,
        explain: [
          'A Pourbaix diagram is a map with pH across and electrical potential E upwards. Low pH means acidic water. A higher potential means a greater tendency to remove electrons from the metal. Potentials must use the same reference electrode as the map.',
          'Immunity means metal is the stable form. Corrosion means dissolved ions are stable. Passivation means a solid film can be stable. These are predictions of equilibrium, not measurements of how fast damage happens. Use the scene’s simplified boundaries only for the stated conditions.',
          'A point must be located using both coordinates. Moving horizontally changes pH; moving vertically changes potential. Read the region beneath the point, rather than treating a high pH or a low potential as a universal guarantee.',
        ],
        formulas: [
          ['Scene immunity boundary below pH 9', 'E_b = -0.617\\,\\text{V}'],
          ['Potential change', '\\Delta E = E_f-E_i'],
        ],
        examples: [
          ex('At pH 8, move from −0.45 V to −0.80 V. Find the signed potential change in V.', [
            ['Final minus initial gives the direction of the change.', '-0.80 - (-0.45)'],
            ['Evaluate, keeping the stated units.', '-0.35\\,\\text{V}'],
          ], '-0.35 V'),
          ex('The scene boundary is −0.617 V at pH 8. How far below it is −0.80 V, in V?', [
            ['Subtract the chosen potential from the boundary.', '-0.617 - (-0.80)'],
            ['Evaluate, keeping the stated units.', '0.183\\,\\text{V}'],
          ], '0.183 V'),
        ],
        practice: [
          pr('At pH 8, how far above −0.617 V is −0.50 V, in V?', 0.117, 'Subtract the boundary potential.', '−0.50 − (−0.617) = 0.117 V.', { tol: 0.00117 }),
          pr('A controller lowers E by 0.25 V from −0.40 V at pH 8. Find the final E in V.', -0.65, 'A downward move subtracts potential.', '−0.40 − 0.25 = -0.65 V.'),
          pr('For pH at least 9, use the scene boundary E = −0.085 − 0.0591 pH. Find E at pH 10, in V.', -0.676, 'Put the pH into the sloping boundary.', '−0.085 − 0.0591 × 10 = -0.676 V.'),
          pr('Using that same boundary, find E at pH 12, in V.', -0.7942, 'Use the alkaline boundary, not the horizontal one.', '−0.085 − 0.0591 × 12 = -0.7942 V.'),
        ],
      },
      {
        title: 'Electron flow and galvanic couples',
        minutes: 25,
        explain: [
          'Two dissimilar metals in electrical contact can form a galvanic couple in wet surroundings. The less noble metal becomes the anode and loses metal. A small exposed anode connected to a large cathode is especially vulnerable because its current is concentrated.',
          'Faraday’s law links electrical charge to metal loss. Charge Q equals current I times time t. For iron dissolving as Fe²⁺, each mole of iron releases two moles of electrons. Use molar mass 55.85 g/mol and Faraday constant about 96,485 C/mol.',
          'Current density j is current per exposed area. Its units help distinguish a large current spread over a large surface from the same current concentrated on a small bolt.',
        ],
        formulas: [
          ['Charge', 'Q=It'],
          ['Iron loss', 'm=\\frac{55.85Q}{2F},\\quad F=96485\\,\\text{C/mol}'],
          ['Current density', 'j=I/A'],
        ],
        examples: [
          ex('A corrosion current of 0.02 A flows for 3,600 s. Find charge in C.', [
            ['Multiply current by time in seconds.', '0.02 \\times  3600'],
            ['Evaluate, keeping the stated units.', '72\\,\\text{C}'],
          ], '72 C'),
          ex('Iron dissolves as Fe²⁺ with charge 1,929.7 C. Find the mass lost in g using F = 96,485 C/mol.', [
            ['Use two electrons per iron atom.', '55.85 \\times  1929.7/(2 \\times  96485)'],
            ['Evaluate, keeping the stated units.', '0.5585\\,\\text{g}'],
          ], '0.5585 g'),
        ],
        practice: [
          pr('A 0.05 A current crosses an exposed anode of 5 cm². Find current density in A/cm².', 0.01, 'Spread current over the anodic area.', '0.05/5 = 0.01 A/cm².', { tol: 0.0001 }),
          pr('The same 0.05 A crosses only 1 cm². Find current density in A/cm².', 0.05, 'The smaller anode concentrates the current.', '0.05/1 = 0.05 A/cm².', { tol: 0.0005 }),
          pr('A 0.01 A current flows for 2 hours. Find charge in C.', 72, 'Convert hours into seconds before multiplying.', '0.01 × 2 × 3600 = 72 C.'),
          pr('Iron dissolves as Fe²⁺ with charge 9,648.5 C. Find mass lost in g.', 2.7925, 'Convert charge to moles of iron, then to mass.', '55.85 × 9648.5/(2 × 96485) = 2.7925 g.'),
        ],
      },
      {
        title: 'Protection and its limits',
        minutes: 25,
        explain: [
          'A barrier coating interrupts contact with water. Cathodic protection supplies electrons, lowering the steel potential. A sacrificial anode supplies those electrons by corroding itself. Electrical isolation can break a galvanic couple.',
          'Concrete can support a protective film because its pore water is alkaline. Carbonation can lower pH, and chlorides can break down a film locally. A passive colour on the map does not promise freedom from pitting. Inspect coatings and measure actual conditions.',
          'Stress-corrosion cracking needs a susceptible material, tensile stress and a suitable environment together. Protection may therefore require changing the material or stress as well as the water chemistry. A map alone cannot identify this cracking risk.',
        ],
        formulas: [
          ['Anode service estimate', 't=Q_{\\text{usable}}/I'],
          ['Capacity conversion', '1\\,\\text{Ah}=3600\\,\\text{C}'],
        ],
        examples: [
          ex('An anode has 240 Ah usable capacity and must supply 0.04 A steadily. Estimate service time in hours.', [
            ['Divide usable charge capacity by protective current.', '240/0.04'],
            ['Evaluate, keeping the stated units.', '6000\\,\\text{h}'],
          ], '6000 h'),
          ex('A nominal 500 Ah anode has 80% usable capacity. Find usable capacity in Ah.', [
            ['Only the stated fraction is available.', '500 \\times  0.8'],
            ['Evaluate, keeping the stated units.', '400\\,\\text{Ah}'],
          ], '400 Ah'),
        ],
        practice: [
          pr('A coating leaves 2% of a 10 m² surface exposed. Find exposed area in m².', 0.2, 'Turn the percentage into a fraction.', '0.02 × 10 = 0.2 m².', { tol: 0.002 }),
          pr('Protection needs 0.03 A/m² over 4 m² of bare steel. Find total current in A.', 0.12, 'Multiply current per area by bare area.', '0.03 × 4 = 0.12 A.', { tol: 0.0012 }),
          pr('An anode supplies 0.1 A for 48 hours. How much capacity does it use, in Ah?', 4.8, 'Here time stays in hours.', '0.1 × 48 = 4.8 Ah.'),
          pr('An anode has 600 Ah nominal capacity, 75% usable, and a steady demand of 0.15 A. Estimate service hours.', 3000, 'Find usable capacity before dividing by demand.', '600 × 0.75/0.15 = 3000 h.'),
        ],
      }
    ],
  },

  'mate-125': {
    predict: {
      q: 'In the S–N scene, steel survives indefinitely in the model at 300 MPa. You switch to aluminium without changing that stress. What should you expect?',
      options: ['Aluminium eventually fails', 'Both curves become horizontal', 'Aluminium has unlimited life', 'Both specimens fail at once'],
      answer: 0,
      reveal: 'The steel model has an endurance floor, but the aluminium curve keeps falling. A stress that gives unlimited life in one idealised model can still give a finite life in the other.',
    },
    parts: [
      {
        title: 'A load that keeps returning',
        minutes: 25,
        explain: [
          'Fatigue is damage from repeated loading. A crack may start at a scratch, hole or weld toe and advance a little each cycle. The final break can happen under a load that the uncracked part carried many times before.',
          'Describe a cycle by its largest and smallest stresses. The amplitude is half their difference; the mean is halfway between them. Tension is positive and compression negative. Equal amplitude does not mean equal fatigue behaviour if mean stress differs.',
          'A complete cycle returns to its starting point. The stress range is maximum minus minimum; amplitude is only half that range. A high tensile mean can be hidden if you report amplitude alone.',
        ],
        formulas: [
          ['Amplitude', '\\sigma_a=(\\sigma_{\\max}-\\sigma_{\\min})/2'],
          ['Mean stress', '\\sigma_m=(\\sigma_{\\max}+\\sigma_{\\min})/2'],
        ],
        examples: [
          ex('A shaft cycles from −180 to +180 MPa. Find amplitude in MPa.', [
            ['Take half the full stress range.', '(180 - (-180))/2'],
            ['Evaluate, keeping the stated units.', '180\\,\\text{MPa}'],
          ], '180 MPa'),
          ex('A bracket cycles from 40 to 240 MPa. Find mean stress in MPa.', [
            ['Average the two ends of the cycle.', '(240 + 40)/2'],
            ['Evaluate, keeping the stated units.', '140\\,\\text{MPa}'],
          ], '140 MPa'),
        ],
        practice: [
          pr('Stress cycles from 0 to 120 MPa. Find amplitude in MPa.', 60, 'The range is not the amplitude.', '(120 − 0)/2 = 60 MPa.'),
          pr('Stress cycles from −100 to 200 MPa. Find mean stress in MPa.', 50, 'Keep the compression sign.', '(200 − 100)/2 = 50 MPa.'),
          pr('A machine makes 25 load cycles per second. How many cycles occur in 2 hours?', 180000, 'Convert the operating time to seconds.', '25 × 2 × 3600 = 180000 cycles.'),
          pr('A rotating shaft sees one bending cycle per turn at 900 rpm. How many cycles occur in 8 hours?', 432000, 'Multiply turns per minute by total minutes.', '900 × 60 × 8 = 432000 cycles.'),
        ],
      },
      {
        title: 'Reading life from an S–N curve',
        minutes: 25,
        explain: [
          'An S–N curve links stress amplitude S to cycles until failure N under specified test conditions. Logarithmic spacing lets a short axis show many powers of ten. Moving down in stress can move far to the right in life.',
          'Basquin’s law fits part of this curve with a power law. The scene uses a steel endurance limit of 350 MPa and an aluminium model with no floor. Real endurance depends on surface finish, size, environment and loading; an ideal floor is not a guarantee for a corroded component.',
          'In the fitted law, σf is a stress coefficient, b is a negative exponent and N counts complete cycles to failure. The factor 2N counts reversals. Keep the cycle convention consistent with the fitted constants.',
        ],
        formulas: [
          ['Basquin relation', '\\sigma_a=\\sigma_f(2N)^b'],
          ['Solve for life', 'N=\\tfrac12(\\sigma_a/\\sigma_f)^{1/b}'],
        ],
        examples: [
          ex('For a teaching fit σa = 1,000(2N)^(−0.1) MPa, find σa at N = 500,000 cycles, in MPa.', [
            ['Put twice the cycle count into the power.', '1000 \\times  (2 \\times  500000)^{-0.1}'],
            ['Evaluate, keeping the stated units.', '251.1886\\,\\text{MPa}'],
          ], '251.1886 MPa'),
          ex('For that fit, find life at σa = 500 MPa, in cycles.', [
            ['Rearrange the power law before substituting.', '0.5 \\times  (500/1000)^{-10}'],
            ['Evaluate, keeping the stated units.', '512\\,\\text{cycles}'],
          ], '512 cycles'),
        ],
        practice: [
          pr('Using the scene steel endurance limit of 350 MPa, find limit divided by a 175 MPa amplitude.', 2, 'Compare the amplitude with the floor.', '350/175 = 2.'),
          pr('How many times longer is 10 million cycles than 100,000 cycles?', 100, 'Divide the two cycle counts.', '10000000/100000 = 100.'),
          pr('Using σa = 1,000(2N)^(−0.1), find amplitude at N = 5,000 cycles, in MPa.', 398.1072, 'Use the same teaching fit, without an added floor.', '1000 × (2 × 5000)^(−0.1) = 398.1072 MPa.'),
          pr('Using that fit, find life at σa = 400 MPa, in cycles.', 4768.372, 'The exponent when solving for N is −10.', '0.5 × (400/1000)^(−10) = 4768.372 cycles.'),
        ],
      },
      {
        title: 'Mean stress and local damage',
        minutes: 25,
        explain: [
          'A tensile mean stress helps cracks stay open. The simple Goodman relation estimates how much alternating stress remains available when a tensile mean stress is present. Se is the corrected endurance strength and Su the tensile strength.',
          'A notch raises local stress above the nominal value calculated from load and area. The theoretical concentration factor Kt estimates this elastic peak. It is a warning sign, not automatically the fatigue reduction factor: material sensitivity and notch size also matter.',
          'The Goodman boundary estimates a limit, not a safe operating recommendation with every uncertainty covered. A utilisation below one lies beneath that boundary; a value above one exceeds it under the model.',
        ],
        formulas: [
          ['Goodman boundary', '\\sigma_a/S_e+\\sigma_m/S_u=1'],
          ['Elastic peak', '\\sigma_{\\text{peak}}=K_t\\sigma_{\\text{nom}}'],
        ],
        examples: [
          ex('Take Se = 300 MPa and Su = 600 MPa. At mean stress 120 MPa, find the Goodman boundary amplitude in MPa.', [
            ['Subtract the mean-stress fraction from one.', '300 \\times  (1 - 120/600)'],
            ['Evaluate, keeping the stated units.', '240\\,\\text{MPa}'],
          ], '240 MPa'),
          ex('A notch has Kt = 2.5 and nominal elastic stress 80 MPa. Find the peak estimate in MPa.', [
            ['Multiply nominal stress by the concentration factor.', '2.5 \\times  80'],
            ['Evaluate, keeping the stated units.', '200\\,\\text{MPa}'],
          ], '200 MPa'),
        ],
        practice: [
          pr('For Se = 240 MPa and Su = 600 MPa at zero mean stress, find the Goodman boundary amplitude in MPa.', 240, 'Zero mean stress uses none of the mean-stress allowance.', '240 × (1 − 0/600) = 240 MPa.'),
          pr('For the same strengths at mean stress 300 MPa, find the boundary amplitude in MPa.', 120, 'Half the tensile strength uses half the allowance.', '240 × (1 − 300/600) = 120 MPa.'),
          pr('A smoother corner lowers Kt from 3 to 2 under nominal stress 50 MPa. How much does the elastic peak fall, in MPa?', 50, 'Find the difference between the two peak estimates.', '(3 − 2) × 50 = 50 MPa.'),
          pr('Se = 300 MPa, Su = 600 MPa, σa = 120 MPa and σm = 120 MPa. Find the Goodman utilisation σa/Se + σm/Su.', 0.6, 'Add the two fractions; a boundary value is one.', '120/300 + 120/600 = 0.6.'),
        ],
      },
      {
        title: 'Mixed loads and growing cracks',
        minutes: 25,
        explain: [
          'A real machine sees different load levels. Miner’s rule adds the fraction of life used at each level: actual cycles n divided by constant-amplitude life N. A total near one predicts failure in this approximate model. The order of loads can matter in reality.',
          'Once a crack is measurable, crack-growth methods can guide inspection. Paris’ law relates advance per cycle to the range of crack-tip loading ΔK. It applies in a middle growth range, away from very slow growth and final rapid fracture.',
          'In Paris’ relation, a is crack length, C and m are fitted constants, and ΔK measures the changing stress concentration near the crack tip. A constant-rate calculation is only a local approximation as the crack grows.',
        ],
        formulas: [
          ['Miner sum', 'D=\\sum n_i/N_i'],
          ['Paris relation', 'da/dN=C(\\Delta K)^m'],
        ],
        examples: [
          ex('A shaft uses 20,000 cycles of a 100,000-cycle life and 30,000 cycles of a 150,000-cycle life. Find Miner damage D.', [
            ['Add life fractions, not raw cycles.', '20000/100000 + 30000/150000'],
            ['Evaluate, keeping the stated units.', '0.4'],
          ], '0.4'),
          ex('A crack grows at a constant 0.000002 mm/cycle over a short interval. Find advance after 50,000 cycles, in mm.', [
            ['Multiply the local rate by the cycle count.', '0.000002 \\times  50000'],
            ['Evaluate, keeping the stated units.', '0.1\\,\\text{mm}'],
          ], '0.1 mm'),
        ],
        practice: [
          pr('A component has used 25,000 of its 100,000-cycle life at one stress. Find D.', 0.25, 'Use actual cycles divided by life.', '25000/100000 = 0.25.', { tol: 0.0025 }),
          pr('Miner damage is 0.6. The next stress has a life of 200,000 cycles. How many more cycles reach D = 1?', 80000, 'Use the remaining life fraction.', '(1 − 0.6) × 200000 = 80000 cycles.'),
          pr('In Paris’ law with m = 3 and unchanged C, doubling ΔK multiplies growth rate by what factor?', 8, 'Raise the loading ratio to m.', '2^3 = 8.'),
          pr('An inspection permits 0.3 mm growth. Assume a constant local rate of 0.000003 mm/cycle. Find the corresponding interval in cycles.', 100000, 'Divide allowed advance by advance per cycle.', '0.3/0.000003 = 100000 cycles.'),
        ],
      }
    ],
  },

  'mate-126': {
    predict: {
      q: 'In the creep scene, keep the load fixed and turn the furnace hotter. Which change in rupture life is most plausible?',
      options: ['Life must increase with heat', 'Life stays fixed with the load', 'Life always falls by just half', 'Life can fall by huge factors'],
      answer: 3,
      reveal: 'Higher temperature greatly speeds the processes that let the metal deform. In this model, temperature enters a logarithmic life relation, so a modest temperature change can mean a very large life change.',
    },
    parts: [
      {
        title: 'Warm compared with melting',
        minutes: 25,
        explain: [
          'Creep is permanent stretching that continues under a steady load. A metal can creep without an increasing force. What feels cold to us may already be warm compared with that metal’s melting temperature.',
          'Compare temperatures in kelvin, measured from absolute zero. The ratio T/Tm is called homologous temperature. For many metals, creep becomes a design concern around 0.4 of the melting temperature. This is a guide, not a sharp boundary.',
          'A ratio is meaningful only when numerator and denominator use the same absolute temperature scale. Dividing Celsius temperatures would give a misleading comparison because the zero of Celsius is not absolute zero.',
        ],
        formulas: [
          ['Absolute temperature', 'T_K=T_{°C}+273.15'],
          ['Homologous temperature', 'T_H=T_K/T_m'],
        ],
        examples: [
          ex('A furnace is at 600 °C. Find its temperature in K.', [
            ['Add the Celsius-to-kelvin offset.', '600 + 273.15'],
            ['Evaluate, keeping the stated units.', '873.15\\,\\text{K}'],
          ], '873.15 K'),
          ex('Take a steel melting temperature of 1,800 K. Find T/Tm at 600 °C.', [
            ['Convert the operating temperature before taking the ratio.', '(600 + 273.15)/1800'],
            ['Evaluate, keeping the stated units.', '0.4850833'],
          ], '0.4850833'),
        ],
        practice: [
          pr('Convert 150 °C to K.', 423.15, 'Add 273.15.', '150 + 273.15 = 423.15 K.'),
          pr('Aluminium melts at about 933 K. Find T/Tm at 150 °C.', 0.453537, 'Both temperatures must be absolute.', '(150 + 273.15)/933 = 0.453537.', { tol: 0.004535369774919614 }),
          pr('Take lead melting at 600 K. Find T/Tm at 25 °C.', 0.4969167, 'Room temperature can be a high fraction of melting.', '(25 + 273.15)/600 = 0.4969167.', { tol: 0.004969166666666666 }),
          pr('For Tm = 1,800 K, express 0.4Tm in °C.', 446.85, 'Find the threshold in kelvin, then convert back.', '0.4 × 1800 − 273.15 = 446.85 °C.'),
        ],
      },
      {
        title: 'Three stages of stretching',
        minutes: 25,
        explain: [
          'Strain is extension divided by the original length. On a creep curve, primary creep slows as the material hardens. Secondary creep has a nearly steady slope. Tertiary creep speeds up as damage and thinning concentrate the load.',
          'The steady slope is strain gained per unit time. Multiplying it by time estimates secondary creep strain, but does not describe the early settling or final acceleration. A turbine blade must stay within its clearance well before rupture.',
          'A strain of 0.01 means an extension of one hundredth of the original length. Strain has no length unit because the two lengths divide out. The dot above strain means change per unit time.',
        ],
        formulas: [
          ['Strain', '\\varepsilon=\\Delta L/L_0'],
          ['Steady increment', '\\Delta\\varepsilon=\\dot\\varepsilon t'],
        ],
        examples: [
          ex('A 100 mm gauge length extends 0.4 mm. Find dimensionless strain.', [
            ['Divide extension by the starting length.', '0.4/100'],
            ['Evaluate, keeping the stated units.', '0.004'],
          ], '0.004'),
          ex('A secondary rate is 0.000002 per hour. Find strain gained in 1,000 h.', [
            ['Use the constant slope only over this secondary interval.', '0.000002 \\times  1000'],
            ['Evaluate, keeping the stated units.', '0.002'],
          ], '0.002'),
        ],
        practice: [
          pr('A 200 mm bar develops strain 0.003. Find its extension in mm.', 0.6, 'Multiply strain by original length.', '200 × 0.003 = 0.6 mm.'),
          pr('Strain rises from 0.002 to 0.005 over 1,500 h. Find mean rate per hour.', 0.000002, 'Divide the strain change by elapsed time.', '(0.005 − 0.002)/1500 = 0.000002 per hour.', { tol: 2e-8 }),
          pr('A 100 mm blade has 0.5 mm spare clearance. Neglect initial creep and take a constant rate of 0.000001 per hour. Find time to consume clearance in h.', 5000, 'Convert clearance into permitted strain first.', '(0.5/100)/0.000001 = 5000 h.'),
          pr('Creep strain is already 0.001. Add 2,000 h at a steady rate of 0.000002 per hour. Find total strain.', 0.005, 'Add the accumulated strain to the new increment.', '0.001 + 2000 × 0.000002 = 0.005.', { tol: 0.00005 }),
        ],
      },
      {
        title: 'Why stress and heat matter so much',
        minutes: 25,
        explain: [
          'Atoms and defects move more easily as temperature rises. In a useful steady-creep fit, the stress enters as a power and temperature enters an exponential factor. A small stress increase can therefore produce a much larger increase in rate.',
          'The constants belong to a particular material and mechanism. At high temperature, dislocations may climb; at other conditions, diffusion or grain-boundary motion may dominate. Alloy choice, stable particles and grain structure all affect resistance.',
          'In the rate fit, A sets the scale, n measures stress sensitivity, Q is an activation energy and R is the gas constant. T must be in kelvin. Comparing rates can cancel A and avoid needing its units.',
        ],
        formulas: [
          ['Steady creep fit', '\\dot\\varepsilon=A\\sigma^n e^{-Q/(RT)}'],
          ['Same-temperature rate ratio', '\\dot\\varepsilon_2/\\dot\\varepsilon_1=(\\sigma_2/\\sigma_1)^n'],
        ],
        examples: [
          ex('At the same temperature with n = 5, what rate factor follows from doubling stress?', [
            ['Use the stress ratio raised to the power n.', '2^5'],
            ['Evaluate, keeping the stated units.', '32'],
          ], '32'),
          ex('With n = 4, stress rises from 100 to 150 MPa. Find the rate factor at unchanged temperature.', [
            ['Take the ratio before raising it to the fourth power.', '(150/100)^4'],
            ['Evaluate, keeping the stated units.', '5.0625'],
          ], '5.0625'),
        ],
        practice: [
          pr('With n = 3, stress is halved at fixed temperature. Find new rate divided by old rate.', 0.125, 'A lower stress gives a ratio below one.', '0.5^3 = 0.125.', { tol: 0.00125 }),
          pr('With n = 5, a stress reduction from 200 to 160 MPa gives what rate ratio?', 0.32768, 'Keep final stress over initial stress.', '(160/200)^5 = 0.32768.', { tol: 0.0032768000000000007 }),
          pr('With n = 4, an initial rate of 0.000001 per hour is measured at 100 MPa. Find the rate at 200 MPa, per hour.', 0.000016, 'Multiply the original rate by the stress factor.', '0.000001 × 2^4 = 0.000016 per hour.', { tol: 1.6e-7 }),
          pr('At fixed stress take Q/R = 24,000 K. Find the rate ratio on heating from 800 to 900 K: exp[24000(1/800 − 1/900)].', 28.03162, 'Evaluate the difference of reciprocal absolute temperatures.', 'e^(24000(1/800 − 1/900)) = 28.03162.'),
        ],
      },
      {
        title: 'Predicting rupture life',
        minutes: 25,
        explain: [
          'The Larson–Miller parameter combines temperature with rupture time. At one fixed stress, tests of the same material may share approximately the same parameter P. Use hours for time and kelvin for temperature, with a fitted constant C.',
          'First divide P by T and subtract C to find log₁₀ of the life. Then raise ten to that result. Long extrapolations can fail if the material changes during service. The scene uses T = Celsius + 273 and P = 26000 − 31.25σ; keep those conventions for its mission.',
          'The base-ten logarithm asks which power of ten gives the time. A one-unit rise in log₁₀ life means ten times the hours. P carries units of kelvin under the convention used here.',
        ],
        formulas: [
          ['Larson–Miller', 'P=T(C+\\log_{10}t_r)'],
          ['Life', 't_r=10^{P/T-C}'],
        ],
        examples: [
          ex('At a fixed stress, P = 20,000 K and C = 20. Find life at 800 K, in hours.', [
            ['Find the base-ten logarithm before taking the power.', '10^{20000/800 - 20}'],
            ['Evaluate, keeping the stated units.', '100000\\,\\text{h}'],
          ], '100000 h'),
          ex('A test lasts 1,000 h at 900 K with C = 20. Find P in K.', [
            ['The base-ten logarithm of time enters the bracket.', '900 \\times  (20 + 3)'],
            ['Evaluate, keeping the stated units.', '20700\\,\\text{K}'],
          ], '20700 K'),
        ],
        practice: [
          pr('With P = 21,000 K and C = 20, find log₁₀ of rupture hours at 840 K.', 5, 'Divide by temperature and subtract C.', '21000/840 − 20 = 5.'),
          pr('With P = 21,000 K and C = 20, find life at 1,000 K, in h.', 10, 'Raise ten to the calculated logarithm.', '10^(21000/1000 − 20) = 10 h.'),
          pr('For the scene mission use T = 873 K, C = 20 and life 100,000 h. Find the required P in K.', 21825, 'Use the scene’s rounded temperature conversion.', '873 × (20 + 5) = 21825 K.'),
          pr('The scene has P = 26000 − 31.25σ. At 600 °C and 100,000 h, P is 873 × 25 K. Find stress σ in MPa.', 133.6, 'Rearrange the straight-line master relation.', '(26000 − 873 × 25)/31.25 = 133.6 MPa.'),
        ],
      }
    ],
  },

  'mate-127': {
    predict: {
      q: 'You slowly cool steels while sliding carbon upwards in the scene. At which composition should the structure become entirely pearlite, just before extra cementite appears?',
      options: ['Near 0.20% carbon', 'Near 0.76% carbon', 'Near 0.45% carbon', 'Near 1.20% carbon'],
      answer: 1,
      reveal: 'The eutectoid composition is about 0.76% carbon. Less carbon leaves extra ferrite; more leaves extra cementite. Pearlite itself already contains both phases in fine layers.',
    },
    parts: [
      {
        title: 'Carbon and steel names',
        minutes: 25,
        explain: [
          'Steel is mainly iron with a small carbon content. Carbon changes the structures that form during cooling, so a small composition change can strongly change hardness and ductility. Ductility means the ability to stretch before breaking.',
          'In common four-digit SAE names, the first pair identifies a family. For plain carbon grades beginning with 10, the last pair gives nominal carbon in hundredths of a mass percent. A name does not tell you the heat treatment or guarantee an exact strength.',
          'A mass percentage compares carbon mass with the mass of the whole alloy. It does not mean the same percentage of its volume or the same percentage of its atoms.',
        ],
        formulas: [
          ['Mass percent', 'C=100m_C/m_{\\text{alloy}}'],
          ['Nominal carbon for 10xx', 'C=xx/100\\;\\%'],
        ],
        examples: [
          ex('Find nominal carbon in 1045 steel, in mass percent.', [
            ['Read the last pair as hundredths of a percent.', '45/100'],
            ['Evaluate, keeping the stated units.', '0.45\\,\\text{\\%}'],
          ], '0.45 %'),
          ex('A 20 kg heat contains 0.12 kg carbon. Find carbon in mass percent.', [
            ['Divide carbon mass by total alloy mass.', '100 \\times  0.12/20'],
            ['Evaluate, keeping the stated units.', '0.6\\,\\text{\\%}'],
          ], '0.6 %'),
        ],
        practice: [
          pr('Find nominal carbon in 1020 steel, in mass percent.', 0.2, 'Use the last pair of digits.', '20/100 = 0.2 %.', { tol: 0.002 }),
          pr('Find nominal carbon in 1080 steel, in mass percent.', 0.8, 'The name states a small carbon percentage.', '80/100 = 0.8 %.'),
          pr('A 50 kg heat is to contain 0.4 mass percent carbon. Find carbon mass in kg.', 0.2, 'Convert percent to a mass fraction.', '50 × 0.4/100 = 0.2 kg.', { tol: 0.002 }),
          pr('Blend 10 kg of 0.2% C steel with 10 kg of 0.8% C steel, with no carbon loss. Find final carbon in mass percent.', 0.5, 'Add the carbon contributions and divide by total mass.', '(10 × 0.2 + 10 × 0.8)/20 = 0.5 %.'),
        ],
      },
      {
        title: 'Ferrite and pearlite',
        minutes: 25,
        explain: [
          'In slowly cooled low-carbon steel, soft ferrite sits beside pearlite. Pearlite is a layered mixture of ferrite and hard iron carbide, called cementite. It is a microstructure, not a separate phase.',
          'Just below the eutectoid temperature, use 0.022% C for ferrite and 0.76% C for pearlite. The lever rule gives mass fractions from carbon balance. This simple result assumes slow cooling; quenching can produce a very different structure.',
          'The symbol f means a mass fraction between zero and one. Multiplying it by 100 gives mass percent. The extra ferrite fraction excludes the ferrite already contained inside pearlite.',
        ],
        formulas: [
          ['Pearlite below the eutectoid', 'f_P=(C-0.022)/(0.76-0.022)'],
          ['Extra ferrite', 'f_F=1-f_P'],
        ],
        examples: [
          ex('For slowly cooled 0.40% C steel, estimate pearlite in mass percent using the stated endpoints.', [
            ['Use distance from the ferrite endpoint over the full interval.', '100 \\times  (0.40 - 0.022)/(0.76 - 0.022)'],
            ['Evaluate, keeping the stated units.', '51.21951\\,\\text{\\%}'],
          ], '51.21951 %'),
          ex('Using the same endpoints, estimate extra ferrite in 0.20% C steel, in mass percent.', [
            ['Subtract the pearlite fraction from one.', '100 \\times  (1 - (0.20 - 0.022)/(0.76 - 0.022))'],
            ['Evaluate, keeping the stated units.', '75.88076\\,\\text{\\%}'],
          ], '75.88076 %'),
        ],
        practice: [
          pr('At exactly 0.76% C, how much pearlite forms by slow eutectoid transformation, in mass percent?', 100, 'The overall composition equals the pearlite endpoint.', '100 × (0.76 − 0.022)/(0.76 − 0.022) = 100 %.'),
          pr('Estimate pearlite in slowly cooled 0.45% C steel, in mass percent.', 57.99458, 'Use the stated lever rule.', '100 × (0.45 − 0.022)/0.738 = 57.99458 %.'),
          pr('What carbon content gives 50 mass percent pearlite, using the stated endpoints? Answer in mass percent C.', 0.391, 'Move halfway between the two endpoint compositions.', '0.022 + 0.5 × (0.76 − 0.022) = 0.391 % C.', { tol: 0.00391 }),
          pr('A 10 kg steel piece has pearlite mass fraction 0.6. Find the mass of extra ferrite in kg.', 4, 'Use the fraction outside the pearlite.', '10 × (1 − 0.6) = 4 kg.'),
        ],
      },
      {
        title: 'Above the eutectoid',
        minutes: 25,
        explain: [
          'Above the eutectoid carbon content, slowly cooled steel forms extra cementite before the remaining austenite turns into pearlite. This extra carbide may decorate grain boundaries and reduce toughness. More carbon is not an unlimited route to a better steel.',
          'A second lever rule uses pearlite at 0.76% C and cementite at about 6.7% C. Its result is extra cementite outside pearlite. Do not add it to a claim of 100% pearlite: the two constituents must share the whole mass.',
          'Distinguish extra cementite from all cementite. Pearlite contains cementite too, so the mass of every carbide in the steel would require a separate phase balance.',
        ],
        formulas: [
          ['Extra cementite', 'f_{cem}=(C-0.76)/(6.7-0.76)'],
          ['Remaining pearlite', 'f_P=1-f_{cem}'],
        ],
        examples: [
          ex('For slowly cooled 1.2% C steel, find extra cementite in mass percent.', [
            ['Use the distance above the eutectoid composition.', '100 \\times  (1.2 - 0.76)/(6.7 - 0.76)'],
            ['Evaluate, keeping the stated units.', '7.407407\\,\\text{\\%}'],
          ], '7.407407 %'),
          ex('Find pearlite in that same 1.2% C steel, in mass percent.', [
            ['Subtract the extra cementite fraction from one.', '100 \\times  (1 - (1.2 - 0.76)/5.94)'],
            ['Evaluate, keeping the stated units.', '92.59259\\,\\text{\\%}'],
          ], '92.59259 %'),
        ],
        practice: [
          pr('For 1.0% C steel, find extra cementite in mass percent.', 4.040404, 'Apply the upper-carbon lever rule.', '100 × (1.0 − 0.76)/5.94 = 4.040404 %.'),
          pr('For 1.4% C steel, find extra cementite in mass percent.', 10.77441, 'The interval between endpoints stays the same.', '100 × (1.4 − 0.76)/5.94 = 10.77441 %.'),
          pr('If extra cementite is 5 mass percent, find bulk carbon in mass percent using these endpoints.', 1.057, 'Start at the eutectoid and move through 5% of the interval.', '0.76 + 0.05 × 5.94 = 1.057 % C.'),
          pr('A 20 kg steel piece contains 8 mass percent extra cementite. Find pearlite mass in kg.', 18.4, 'Pearlite takes the remaining mass.', '20 × (1 − 0.08) = 18.4 kg.'),
        ],
      },
      {
        title: 'Alloys and property trade-offs',
        minutes: 25,
        explain: [
          'Chromium can support a protective surface film in stainless steel. Nickel helps stabilise austenite and can improve low-temperature toughness. Molybdenum can help hot strength. These effects depend on composition and heat treatment, so choose a grade for its service conditions.',
          'The scene uses approximate trends for slowly cooled plain carbon steel, not design certificates. Below 0.8% C it estimates tensile strength as 290 + 830C MPa, with C entered as a percentage number. Its elongation estimate falls as 40 − 42C percent in this range.',
          'Elongation in a tensile test is extension at fracture relative to the original gauge length. A larger value usually means more stretching before the break. Strength and elongation describe different parts of the material’s behaviour.',
        ],
        formulas: [
          ['Scene strength fit', 'S_u=290+830C\\;\\text{MPa}'],
          ['Scene elongation fit', 'e=40-42C\\;\\%'],
        ],
        examples: [
          ex('Use the scene fit at 0.20% C to estimate tensile strength in MPa.', [
            ['Enter carbon as 0.20, not 0.002.', '290 + 830 \\times  0.20'],
            ['Evaluate, keeping the stated units.', '456\\,\\text{MPa}'],
          ], '456 MPa'),
          ex('Use the scene fit at 0.45% C to estimate elongation in percent.', [
            ['Subtract the carbon-related reduction.', '40 - 42 \\times  0.45'],
            ['Evaluate, keeping the stated units.', '21.1\\,\\text{\\%}'],
          ], '21.1 %'),
        ],
        practice: [
          pr('Estimate tensile strength at 0.40% C using the scene fit, in MPa.', 622, 'Use the low-carbon branch of the fit.', '290 + 830 × 0.40 = 622 MPa.'),
          pr('Estimate elongation at 0.60% C using the scene fit, in percent.', 14.8, 'Increasing carbon lowers this estimate.', '40 − 42 × 0.60 = 14.8 %.'),
          pr('A 100 kg teaching melt contains 12 mass percent chromium. Find chromium mass in kg.', 12, 'Mass fraction times total mass.', '100 × 0.12 = 12 kg.'),
          pr('A shaft must carry 40,000 N over 200 mm². A candidate has measured yield strength 400 MPa. Find yield strength divided by nominal working stress.', 2, 'Calculate stress in N/mm², which equals MPa.', '400/(40000/200) = 2.'),
        ],
      }
    ],
  },

  'mate-128': {
    predict: {
      q: 'A freshly shaped bottle looks rigid but later cracks as it cools. Which stop on the viscosity curve could help without making it flow like a melt again?',
      options: ['Hold near the annealing point', 'Hold near the melting point', 'Rush past the strain point', 'Cool straight to room temperature'],
      answer: 0,
      reveal: 'Near the annealing point the glass can relax internal stress while remaining very stiff. Cooling too quickly through this range can lock stress into the finished bottle.',
    },
    parts: [
      {
        title: 'A solid without a crystal pattern',
        minutes: 25,
        explain: [
          'Glass is an amorphous solid: its atoms lack the repeating long-range pattern of a crystal. It becomes less able to rearrange as it cools. It is a solid at room temperature, not a window-sized liquid that visibly drains downwards.',
          'Silica builds a connected network. Other oxides change how easily it melts, its expansion and its durability. A mass-percent recipe tells you how much of each ingredient is present; the recipe must add to the whole batch.',
          'Heating and cooling schedules matter as well as composition. A glass transition marks a range where structural rearrangement becomes too slow on the observation timescale, rather than the sharp melting of a pure crystal.',
        ],
        formulas: [
          ['Batch mass', 'm_i=(w_i/100)m_{total}'],
          ['Composition balance', '\\sum w_i=100\\%'],
        ],
        examples: [
          ex('A simplified 20 kg glass batch contains 72 mass percent silica. Find silica mass in kg.', [
            ['Multiply batch mass by the silica fraction.', '20 \\times  0.72'],
            ['Evaluate, keeping the stated units.', '14.4\\,\\text{kg}'],
          ], '14.4 kg'),
          ex('A simplified recipe has 72% silica and 14% soda, with the remainder lime. Find lime mass percent.', [
            ['All percentages must sum to the whole.', '100 - 72 - 14'],
            ['Evaluate, keeping the stated units.', '14\\,\\text{\\%}'],
          ], '14 %'),
        ],
        practice: [
          pr('A 50 kg batch contains 10 mass percent lime. Find lime mass in kg.', 5, 'Use one tenth of the batch.', '50 × 0.10 = 5 kg.'),
          pr('A batch contains 15 kg silica out of 20 kg total. Find silica mass percent.', 75, 'Divide the ingredient mass by the total.', '100 × 15/20 = 75 %.'),
          pr('A 30 kg batch contains 20 mass percent recycled glass. Find recycled mass in kg.', 6, 'Convert percent to a fraction.', '30 × 0.20 = 6 kg.'),
          pr('Mix 10 kg of glass containing 70% silica with 30 kg containing 74% silica. Find mixed silica mass percent.', 73, 'Take a mass-weighted mean.', '(10 × 70 + 30 × 74)/40 = 73 %.'),
        ],
      },
      {
        title: 'Viscosity spans powers of ten',
        minutes: 25,
        explain: [
          'Viscosity measures resistance to flow. The scene plots log₁₀ of viscosity in Pa·s. A rise of one on this scale means ten times the viscosity, not one extra Pa·s. Glass can change by many such steps during cooling.',
          'The scene’s illustrative window-glass fit is log₁₀η = −2.6 + 4500/(T − 260), with T in °C. Use it only within the shown temperature range. Different glass compositions need different fitted constants.',
          'The symbol η, read eta, is viscosity. The fitted offset temperature is a mathematical parameter; it is not a temperature at which this glass should be processed or a claim that the fit remains valid there.',
        ],
        formulas: [
          ['Scene viscosity fit', '\\log_{10}\\eta=-2.6+4500/(T-260)'],
          ['Recover viscosity', '\\eta=10^{\\log_{10}\\eta}'],
        ],
        examples: [
          ex('Using the scene fit, find log₁₀η at 1,160 °C, with η measured in Pa·s.', [
            ['Subtract the offset temperature before dividing.', '-2.6 + 4500/(1160 - 260)'],
            ['Evaluate, keeping the stated units.', '2.4'],
          ], '2.4'),
          ex('A glass changes from log₁₀η = 3 to 6. Find final viscosity divided by initial viscosity.', [
            ['Subtract logarithms to find the power of ten.', '10^{6 - 3}'],
            ['Evaluate, keeping the stated units.', '1000'],
          ], '1000'),
        ],
        practice: [
          pr('If log₁₀η = 3, find viscosity in Pa·s.', 1000, 'Raise ten to the plotted value.', '10^3 = 1000 Pa·s.'),
          pr('Using the scene fit, find log₁₀η at 760 °C.', 6.4, 'Evaluate the denominator first.', '−2.6 + 4500/(760 − 260) = 6.4.'),
          pr('Using the scene fit, find log₁₀η at 560 °C.', 12.4, 'The smaller denominator gives a larger viscosity.', '−2.6 + 4500/(560 − 260) = 12.4.'),
          pr('Using the scene fit, find the temperature at log₁₀η = 3, in °C.', 1063.571, 'Solve the fit for temperature.', '260 + 4500/(3 + 2.6) = 1063.571 °C.'),
        ],
      },
      {
        title: 'Shaping and annealing',
        minutes: 25,
        explain: [
          'A glassmaker shapes glass while it is thick enough to hold together yet soft enough to move. In the scene the working reference is 10³ Pa·s. The annealing reference is much stiffer, at 10¹² Pa·s.',
          'An annealing hold allows stress to relax. The piece then cools slowly through the range where relaxation becomes too slow. The hold time depends on thickness and composition; the reference viscosity alone does not specify a safe cooling schedule.',
          'Thicker sections cool less evenly than thin ones. This can leave one region trying to contract while another is still hot. Annealing reduces the resulting internal stress before it becomes trapped.',
        ],
        formulas: [
          ['Reference temperature from the fit', 'T=260+\\frac{4500}{\\log_{10}\\eta+2.6}'],
          ['Cooling time', 't=\\Delta T/r'],
        ],
        examples: [
          ex('Use the scene fit to find the annealing reference at log₁₀η = 12, in °C.', [
            ['Rearrange the viscosity fit for T.', '260 + 4500/(12 + 2.6)'],
            ['Evaluate, keeping the stated units.', '568.2192\\,\\text{°C}'],
          ], '568.2192 °C'),
          ex('A teaching cooling schedule drops from 600 to 500 °C at 2 °C/min. Find duration in min.', [
            ['Divide the temperature drop by the specified rate.', '(600 - 500)/2'],
            ['Evaluate, keeping the stated units.', '50\\,\\text{min}'],
          ], '50 min'),
        ],
        practice: [
          pr('Find annealing viscosity divided by working viscosity, using 10¹² and 10³ Pa·s.', 1000000000, 'Subtract the exponents.', '10^(12 − 3) = 1000000000.'),
          pr('Use the scene fit to find the strain reference at log₁₀η = 13.5, in °C.', 539.5031, 'Use the same fit with the new reference.', '260 + 4500/(13.5 + 2.6) = 539.5031 °C.'),
          pr('A specified schedule cools through 80 °C at 0.5 °C/min. Find time in min.', 160, 'A slower rate requires more time.', '80/0.5 = 160 min.'),
          pr('A batch is held for 45 min and then cooled through 120 °C at 1.5 °C/min. Find total time in min.', 125, 'Add the hold to the cooling duration.', '45 + 120/1.5 = 125 min.'),
        ],
      },
      {
        title: 'Keeping surface flaws closed',
        minutes: 25,
        explain: [
          'Glass cracks usually start at surface flaws opened by tension. Thermal tempering cools the surfaces quickly so the final surface is in compression. Chemical strengthening can replace smaller surface ions with larger ones, also creating compression.',
          'Applied tension must first cancel surface compression before a flaw opens. A simple stress balance helps explain the benefit, but actual failure also depends on flaw depth, moisture and time. Borosilicate glass reduces thermal stress by expanding less during heating.',
          'In the expansion relation, α is length change per original length per degree, L is original length and ΔT is temperature rise. Free expansion assumes the strip is not restrained by its supports.',
        ],
        formulas: [
          ['Surface stress, tension positive', '\\sigma_{net}=\\sigma_{applied}-\\sigma_{compression}'],
          ['Free expansion', '\\Delta L=\\alpha L\\Delta T'],
        ],
        examples: [
          ex('Applied surface tension is 80 MPa and residual compression is 100 MPa. Find net stress in MPa, tension positive.', [
            ['Subtract the existing compression.', '80 - 100'],
            ['Evaluate, keeping the stated units.', '-20\\,\\text{MPa}'],
          ], '-20 MPa'),
          ex('A 1 m glass strip has expansion coefficient 9 × 10⁻⁶ per °C. For a uniform 100 °C rise, find free extension in mm.', [
            ['Multiply expansion coefficient, length and temperature rise.', '9 \\times  10^{-6} \\times  1 \\times  100 \\times  1000'],
            ['Evaluate, keeping the stated units.', '0.9\\,\\text{mm}'],
          ], '0.9 mm'),
        ],
        practice: [
          pr('Surface compression is 120 MPa. How much applied tension just brings net surface stress to zero, in MPa?', 120, 'Applied tension must first cancel compression.', '120 + 0 = 120 MPa.'),
          pr('A simplified flaw opens at net tension 40 MPa. With 150 MPa surface compression, find required applied tension in MPa.', 190, 'Add the flaw-opening stress to the compression.', '40 + 150 = 190 MPa.'),
          pr('A 1 m borosilicate strip has α = 3.3 × 10⁻⁶ per °C. Find free extension for 100 °C rise, in mm.', 0.33, 'Use the smaller expansion coefficient.', '3.3 × 10^(−6) × 1 × 100 × 1000 = 0.33 mm.', { tol: 0.0033000000000000004 }),
          pr('Compare α = 9 × 10⁻⁶ and 3.3 × 10⁻⁶ per °C. For equal length and heating, find the larger extension divided by the smaller.', 2.727273, 'The common length and temperature change cancel.', '9/3.3 = 2.727273.'),
        ],
      }
    ],
  },

  'phys-205': {
    predict: {
      q: 'The spinning wheel swings slowly around its pivot. You triple its spin speed while keeping its overhang fixed. What happens to the time for one slow circle?',
      options: ['It becomes three times shorter', 'It stays exactly the same', 'The slow circling stops entirely', 'It becomes three times longer'],
      answer: 3,
      reveal: 'More spin gives more angular momentum for the same sideways torque to turn. The precession rate falls to one third, so its period triples.',
    },
    parts: [
      {
        title: 'Where the mass sits',
        minutes: 25,
        explain: [
          'Moment of inertia I measures resistance to angular acceleration about a chosen axis. A mass twice as far from that axis contributes four times as much. Always state the axis: the same body can have different moments about different axes.',
          'For a thin ring around its centre I = MR²; for a uniform solid disc I = MR²/2. A rim-heavy flywheel stores more rotational energy at the same speed, mass and outer radius. Its rim must also withstand the stress.',
          'Do not confuse mass moment of inertia with mass alone. Its units are kg·m² because each mass contribution is multiplied by a squared distance. Moving the axis changes those distances.',
        ],
        formulas: [
          ['Point masses', 'I=\\sum m_i r_i^2'],
          ['Ring and disc', 'I_{ring}=MR^2,\\quad I_{disc}=MR^2/2'],
        ],
        examples: [
          ex('A 2 kg point mass is 0.3 m from an axis. Find I in kg·m².', [
            ['Square the distance before multiplying by mass.', '2 \\times  0.3^2'],
            ['Evaluate, keeping the stated units.', '0.18\\,\\text{kg·m}^{2}\\text{}'],
          ], '0.18 kg·m²'),
          ex('A uniform 4 kg disc has radius 0.2 m. Find I about its central axle in kg·m².', [
            ['Use half the ring value.', '0.5 \\times  4 \\times  0.2^2'],
            ['Evaluate, keeping the stated units.', '0.08\\,\\text{kg·m}^{2}\\text{}'],
          ], '0.08 kg·m²'),
        ],
        practice: [
          pr('A thin 4 kg ring has radius 0.2 m. Find central I in kg·m².', 0.16, 'All the ring mass is at the rim.', '4 × 0.2^2 = 0.16 kg·m².', { tol: 0.0016000000000000003 }),
          pr('Two 1 kg masses are each 0.5 m from the axis. Find total I in kg·m².', 0.5, 'Add both contributions.', '2 × 1 × 0.5^2 = 0.5 kg·m².'),
          pr('A point mass moves from radius 0.1 m to 0.3 m. Find new I divided by old I.', 9, 'The mass cancels; distance is squared.', '(0.3/0.1)^2 = 9.'),
          pr('A body has centre-of-mass I = 0.04 kg·m² and mass 2 kg. Find I about a parallel axis 0.2 m away, using I = Icm + Md².', 0.12, 'Add the shift contribution.', '0.04 + 2 × 0.2^2 = 0.12 kg·m².', { tol: 0.0012000000000000003 }),
        ],
      },
      {
        title: 'Torque, speed and stored energy',
        minutes: 25,
        explain: [
          'Angular speed ω tells how quickly angle changes, in radians per second. One revolution is 2π radians. Torque changes angular speed according to τ = Iα about a fixed axis with constant I.',
          'Rotational energy is Iω²/2. Doubling speed quadruples energy, which is useful for smoothing a press drive but raises the consequences of a broken flywheel. Materials selection must account for strength as well as inertia.',
          'Angular acceleration α is the change in angular speed per second. In the energy expression K is energy in joules, and radians must be used for angular speed and work.',
        ],
        formulas: [
          ['Speed conversion', '\\omega=\\text{rpm}\\times 2\\pi/60'],
          ['Rotation', '\\tau=I\\alpha,\\quad K=I\\omega^2/2'],
        ],
        examples: [
          ex('Convert 600 rpm to rad/s.', [
            ['Convert revolutions to radians and minutes to seconds.', '600 \\times  2\\pi/60'],
            ['Evaluate, keeping the stated units.', '62.83185\\,\\text{rad/s}'],
          ], '62.83185 rad/s'),
          ex('A wheel with I = 0.2 kg·m² turns at 20 rad/s. Find energy in J.', [
            ['Square the angular speed.', '0.5 \\times  0.2 \\times  20^2'],
            ['Evaluate, keeping the stated units.', '40\\,\\text{J}'],
          ], '40 J'),
        ],
        practice: [
          pr('Torque is 3 N·m and I = 0.5 kg·m². Find angular acceleration in rad/s².', 6, 'Divide torque by moment of inertia.', '3/0.5 = 6 rad/s².'),
          pr('A wheel accelerates from rest at 4 rad/s² for 5 s. Find final speed in rad/s.', 20, 'For constant acceleration use speed gained per second.', '4 × 5 = 20 rad/s.'),
          pr('Find energy for I = 0.1 kg·m² at 30 rad/s, in J.', 45, 'Use the rotational energy expression.', '0.5 × 0.1 × 30^2 = 45 J.'),
          pr('A constant 2 N·m torque turns a wheel through 3 revolutions. Find work in J.', 37.69911, 'Work is torque times angle in radians.', '2 × 3 × 2π = 37.69911 J.'),
        ],
      },
      {
        title: 'Angular momentum and its direction',
        minutes: 25,
        explain: [
          'For rotation about a principal axis, angular momentum is L = Iω along the spin axis. Curl your right-hand fingers in the spin direction; the thumb gives the direction of L. Torque changes this vector, including its direction.',
          'With negligible external torque, angular momentum stays constant. Moving mass inward can therefore increase spin speed. A sideways torque mainly changes the direction of a fast wheel’s angular momentum instead of simply increasing its size.',
          'A vector carries both size and direction. Equal and opposite spin momenta cancel when added, while parallel momenta add. Conservation applies to the total system when its external torque is negligible.',
        ],
        formulas: [
          ['Spin momentum', 'L=I\\omega'],
          ['No external torque', 'I_1\\omega_1=I_2\\omega_2'],
        ],
        examples: [
          ex('I = 0.3 kg·m² and ω = 10 rad/s. Find L in kg·m²/s.', [
            ['Multiply inertia by angular speed.', '0.3 \\times  10'],
            ['Evaluate, keeping the stated units.', '3\\,\\text{kg·m}^{2}\\text{/s}'],
          ], '3 kg·m²/s'),
          ex('Without external torque, I falls from 0.4 to 0.2 kg·m² from an initial 5 rad/s. Find final speed in rad/s.', [
            ['Preserve the product Iω.', '0.4 \\times  5/0.2'],
            ['Evaluate, keeping the stated units.', '10\\,\\text{rad/s}'],
          ], '10 rad/s'),
        ],
        practice: [
          pr('A wheel has L = 6 kg·m²/s and I = 0.5 kg·m². Find ω in rad/s.', 12, 'Rearrange L = Iω.', '6/0.5 = 12 rad/s.'),
          pr('A 0.8 N·m torque acts along L for 3 s. Find the increase in L in kg·m²/s.', 2.4, 'Torque times time gives angular impulse.', '0.8 × 3 = 2.4 kg·m²/s.'),
          pr('No external torque acts. I triples from 0.1 to 0.3 kg·m² while initial ω = 18 rad/s. Find final ω.', 6, 'A larger inertia needs a smaller speed.', '0.1 × 18/0.3 = 6 rad/s.'),
          pr('Two coaxial wheels rotate in opposite directions with signed momenta +8 and −3 kg·m²/s. Find total L.', 5, 'Add with direction signs.', '8 − 3 = 5 kg·m²/s.'),
        ],
      },
      {
        title: 'The slow circle of precession',
        minutes: 25,
        explain: [
          'Gravity acts at the wheel’s centre of mass, away from the pivot. For a horizontal axle it produces torque mgr, where r is the overhang. In steady slow precession the fast spin axis moves sideways at Ω = τ/L.',
          'The precession period is 2π/Ω. This approximation assumes fast spin, a nearly horizontal axle and steady motion; a wheel released carelessly can wobble too. In the scene the disc radius is 0.15 m and g = 9.8 m/s².',
          'Use Ω for the slow movement of the axle and ω for the fast spinning of the wheel itself. These are different motions, even though both angular speeds use radians per second.',
        ],
        formulas: [
          ['Slow precession', '\\Omega=mgr/(I\\omega)'],
          ['Period', 'T_p=2\\pi/\\Omega'],
        ],
        examples: [
          ex('Torque is 0.6 N·m and spin momentum is 3 kg·m²/s. Find Ω in rad/s.', [
            ['Divide sideways torque by spin momentum.', '0.6/3'],
            ['Evaluate, keeping the stated units.', '0.2\\,\\text{rad/s}'],
          ], '0.2 rad/s'),
          ex('For Ω = 0.5 rad/s, find precession period in s.', [
            ['A full slow circle is 2π radians.', '2\\pi/0.5'],
            ['Evaluate, keeping the stated units.', '12.56637\\,\\text{s}'],
          ], '12.56637 s'),
        ],
        practice: [
          pr('A 2 kg wheel has overhang 0.1 m. With g = 9.8 m/s², find gravitational torque in N·m.', 1.96, 'Multiply weight by the perpendicular overhang.', '2 × 9.8 × 0.1 = 1.96 N·m.'),
          pr('At fixed torque and inertia, doubling spin changes Ω by what factor?', 0.5, 'Spin speed is in the denominator.', '1/2 = 0.5.'),
          pr('Use the scene disc radius 0.15 m, overhang 0.2 m and spin 3,000 rpm. Find steady precession period in s.', 11.3299, 'Use disc inertia; its mass cancels.', '2π/[2 × 9.8 × 0.2/(0.15^2 × 3000 × 2π/60)] = 11.3299 s.'),
          pr('Keeping that disc and spin fixed, halve the overhang to 0.1 m. Find the new period in s.', 22.65981, 'Half the torque means twice the period.', '2π/[2 × 9.8 × 0.1/(0.15^2 × 3000 × 2π/60)] = 22.65981 s.'),
        ],
      }
    ],
  },

  'phys-206': {
    predict: {
      q: 'The linkage has ground 4, rocker 3, coupler 5 and crank 2.5. Its crank gets stuck. Which replacement crank should let it turn continuously?',
      options: ['A longer crank of 3.0', 'A shorter crank of 1.5', 'Another crank of 2.5', 'Any crank with more mass'],
      answer: 1,
      reveal: 'With crank 1.5, shortest plus longest is 6.5, below the other pair’s 7. With crank 2.5 or 3, that test fails. A stronger motor cannot remove a geometric limit.',
    },
    parts: [
      {
        title: 'Links, joints and freedom',
        minutes: 25,
        explain: [
          'A mechanism ties the motion of rigid pieces together. A link is one rigid piece, and a pin joint lets two links turn relative to each other. The fixed frame counts as a link called the ground.',
          'A free rigid body in a plane can move in two directions and turn: three freedoms. Each ordinary pin removes two relative freedoms. The mobility count below works for independent constraints in a usual planar linkage; special geometry can make the count misleading.',
          'In the mobility expression, n is the total number of links and j counts ordinary joints between two links. F tells how many independent movements must be specified to determine the configuration.',
        ],
        formulas: [
          ['Planar pin linkage mobility', 'F=3(n-1)-2j'],
        ],
        examples: [
          ex('A normal four-bar mechanism has 4 links including ground and 4 pin joints. Find mobility F.', [
            ['Count the frame as a link.', '3 \\times  (4 - 1) - 2 \\times  4'],
            ['Evaluate, keeping the stated units.', '1'],
          ], '1'),
          ex('A usual six-link planar mechanism has 7 independent pin joints. Find F.', [
            ['Subtract the constraints from the moving-body freedoms.', '3 \\times  (6 - 1) - 2 \\times  7'],
            ['Evaluate, keeping the stated units.', '1'],
          ], '1'),
        ],
        practice: [
          pr('How many planar freedoms does one unconstrained rigid body have?', 3, 'Count two translations and one rotation.', '2 + 1 = 3.'),
          pr('A two-link system including ground has one pin joint. Find F.', 1, 'Only one link moves.', '3 × (2 − 1) − 2 = 1.'),
          pr('A normal three-link closed triangle has 3 pins. Find F.', 0, 'A rigid triangle does not act like a four-bar.', '3 × (3 − 1) − 2 × 3 = 0.', { tol: 1e-12 }),
          pr('A usual five-link planar chain has 5 independent pins. Find F.', 2, 'Apply the count with the ground included.', '3 × (5 − 1) − 2 × 5 = 2.'),
        ],
      },
      {
        title: 'Can the crank go all the way?',
        minutes: 25,
        explain: [
          'A four-bar loop contains ground, crank, coupler and rocker. Sort the four lengths: s is shortest, l longest, and p and q the other two. Grashof’s condition compares s + l with p + q.',
          'With a strict inequality s + l < p + q, a shortest link next to the ground can rotate continuously. Equality gives a change-point geometry that can need guidance. For the scene mission, keep the input crank shortest and avoid relying on that equality.',
          'Grashof’s condition concerns which relative rotations geometry permits. Which link is fixed also matters. Merely satisfying the length comparison does not mean every chosen input link can rotate fully.',
        ],
        formulas: [
          ['Grashof comparison', 's+l\\le p+q'],
          ['Margin', 'G=(p+q)-(s+l)'],
        ],
        examples: [
          ex('Lengths are 1, 3, 4 and 5 units. Find Grashof margin G.', [
            ['Pair the shortest with the longest.', '(3 + 4) - (1 + 5)'],
            ['Evaluate, keeping the stated units.', '1'],
          ], '1'),
          ex('Lengths are 2.2, 2.8, 3 and 4 units. Find G.', [
            ['A negative margin fails the test.', '(2.8 + 3) - (2.2 + 4)'],
            ['Evaluate, keeping the stated units.', '-0.4'],
          ], '-0.4'),
        ],
        practice: [
          pr('Lengths are 2, 5, 6 and 7 cm. Find s + l in cm.', 9, 'Choose the two extreme lengths.', '2 + 7 = 9 cm.'),
          pr('For those same lengths, find p + q in cm.', 11, 'Use the remaining pair.', '5 + 6 = 11 cm.'),
          pr('Ground 4, rocker 3, coupler 5, crank 1.5: find G.', 0.5, 'The crank is shortest and the coupler longest.', '(3 + 4) − (1.5 + 5) = 0.5.'),
          pr('Ground 4, rocker 3 and coupler 5: find the shortest-crank length at the Grashof equality, in the same units.', 2, 'Set crank plus coupler equal to the other pair.', '3 + 4 − 5 = 2.'),
        ],
      },
      {
        title: 'Finding positions and speeds',
        minutes: 25,
        explain: [
          'The crank end travels on a circle. Its horizontal and vertical positions relative to its pivot are a cos θ and a sin θ. If angular speed is constant, its speed around that circle is aω.',
          'The coupler’s far end must also stay a fixed distance from the rocker pivot. Those two distance conditions determine its position. Not every requested crank angle is reachable when the lengths fail the full-rotation test.',
          'Angles can be written in degrees for a sketch, but v = aω requires ω in radians per second. The speed is tangent to the tip’s circular path, rather than along the crank.',
        ],
        formulas: [
          ['Crank end', 'x=a\\cos\\theta,\\quad y=a\\sin\\theta'],
          ['Tip speed', 'v=a\\omega'],
        ],
        examples: [
          ex('A 0.1 m crank points at 60°. Find its horizontal offset in m.', [
            ['Use cosine for the horizontal component.', '0.1 \\times  \\cos(60^\\circ)'],
            ['Evaluate, keeping the stated units.', '0.05\\,\\text{m}'],
          ], '0.05 m'),
          ex('A 0.2 m crank turns at 5 rad/s. Find tip speed in m/s.', [
            ['Multiply radius by angular speed.', '0.2 \\times  5'],
            ['Evaluate, keeping the stated units.', '1\\,\\text{m/s}'],
          ], '1 m/s'),
        ],
        practice: [
          pr('A 2 cm crank points at 90°. Find vertical offset in cm.', 2, 'Use sine for the vertical component.', '2 × sin(90°) = 2 cm.'),
          pr('A 0.15 m crank turns at 4 rad/s. Find tip speed in m/s.', 0.6, 'The crank radius is the tip’s path radius.', '0.15 × 4 = 0.6 m/s.'),
          pr('Two pin centres differ by 3 cm horizontally and 4 cm vertically. Find their separation in cm.', 5, 'Use the right-triangle distance.', '√(3^2+4^2) = 5 cm.'),
          pr('A crank turns uniformly through 180° in 0.5 s. Find its angular speed in rad/s.', 6.283185, 'Convert the half-turn to radians.', 'π/0.5 = 6.283185 rad/s.'),
        ],
      },
      {
        title: 'Motion becomes a useful job',
        minutes: 25,
        explain: [
          'A point fixed to the coupler traces a curve. Choosing its position and the link lengths can produce a useful near-straight stroke for a press or handling arm. The point’s path is not generally a circle about either ground pivot.',
          'A linkage trades motion against force. In a slow ideal machine, input work equals output work. A short output travel can give a large force, but real joints lose energy and near-straight alignments can create very large bearing loads.',
          'Efficiency η is useful output energy divided by input energy. A fraction below one accounts for losses. A calculated force gain should still be checked against link strength, pin strength and wear.',
        ],
        formulas: [
          ['Ideal work balance', 'F_{in}d_{in}=F_{out}d_{out}'],
          ['Useful output', 'W_{out}=\\eta W_{in}'],
        ],
        examples: [
          ex('An ideal slow mechanism receives 100 N through 0.2 m and moves its output 0.05 m. Find output force in N.', [
            ['Equate input and output work.', '100 \\times  0.2/0.05'],
            ['Evaluate, keeping the stated units.', '400\\,\\text{N}'],
          ], '400 N'),
          ex('A press receives 200 J per stroke with efficiency 80%. Find useful work in J.', [
            ['Multiply by the useful fraction.', '200 \\times  0.8'],
            ['Evaluate, keeping the stated units.', '160\\,\\text{J}'],
          ], '160 J'),
        ],
        practice: [
          pr('An ideal linkage has input travel 12 mm and output travel 3 mm. Find force multiplication.', 4, 'Force gain is the inverse travel trade-off.', '12/3 = 4.'),
          pr('An output force of 500 N moves 0.02 m. Find output work in J.', 10, 'Multiply force by travel.', '500 × 0.02 = 10 J.'),
          pr('Input work is 50 J and useful output is 40 J. Find efficiency in percent.', 80, 'Compare useful work with supplied work.', '100 × 40/50 = 80 %.'),
          pr('A handling mechanism makes 30 strokes per minute, each with 12 J useful work. Find average useful power in W.', 6, 'Find useful energy per second.', '30 × 12/60 = 6 W.'),
        ],
      }
    ],
  },

  'phys-207': {
    predict: {
      q: 'The scene has a 12 V left supply, a 4 Ω left resistor and a 6 Ω middle resistor. A right supply joins through another resistor. Can that connected right branch carry zero current?',
      options: ['Only if its resistance is zero', 'Only if both supplies are 12 V', 'Yes, when supply matches junction', 'Only if its wire is disconnected'],
      answer: 2,
      reveal: 'With no right-branch current, the left supply and two resistors set the junction at 7.2 V. Match the right supply to that voltage and its resistor has no voltage difference to drive current.',
    },
    parts: [
      {
        title: 'Charge cannot disappear at a junction',
        minutes: 25,
        explain: [
          'Current is charge passing each second. In a steady circuit, charge does not continually pile up at a junction. The currents entering must therefore total the currents leaving. This is Kirchhoff’s current law.',
          'Choose an arrow for each unknown current before calculating. A negative answer means the current flows opposite to your arrow. It does not mean the calculation failed. In a furnace supply, this keeps track of how different heaters share the current.',
          'The unit ampere means coulomb of charge per second. Conservation of charge explains the junction rule without depending on resistor values or on which battery is stronger.',
        ],
        formulas: [
          ['Junction balance', '\\sum I_{in}=\\sum I_{out}'],
          ['Charge flow', 'Q=It'],
        ],
        examples: [
          ex('Currents 3 A and 2 A enter a junction. One branch leaves. Find its current in A.', [
            ['Add all incoming currents.', '3 + 2'],
            ['Evaluate, keeping the stated units.', '5\\,\\text{A}'],
          ], '5 A'),
          ex('A junction receives 5 A and sends out 1.5 A through one branch. Find the other outgoing current in A.', [
            ['Subtract the known outgoing share.', '5 - 1.5'],
            ['Evaluate, keeping the stated units.', '3.5\\,\\text{A}'],
          ], '3.5 A'),
        ],
        practice: [
          pr('A current of 0.4 A flows for 10 s. Find charge in C.', 4, 'Multiply charge per second by seconds.', '0.4 × 10 = 4 C.'),
          pr('Two outgoing branches carry 1.2 A and 0.8 A. Find total incoming current in A.', 2, 'Charge balance adds the outgoing currents.', '1.2 + 0.8 = 2 A.'),
          pr('Take I1 and I3 into the junction and I2 out. If I1 = 2 A and I2 = 1.5 A, find signed I3 in A.', -0.5, 'Use I3 = I2 − I1.', '1.5 − 2 = -0.5 A.'),
          pr('A 6 A feed splits equally between four identical branches. Find each branch current in A.', 1.5, 'Identical branches share equally.', '6/4 = 1.5 A.'),
        ],
      },
      {
        title: 'Energy balances around a loop',
        minutes: 25,
        explain: [
          'Voltage is energy transferred per unit charge. Walk once around a closed circuit and return to the same potential: the signed voltage changes must sum to zero. A battery rise must balance the resistor drops in a simple loop.',
          'For a resistor, the drop in the direction of current is IR. Moving through it in the opposite direction gives a rise. Keep one walking direction throughout the loop; the physical result is independent of that choice.',
          'The unit ohm is volt per ampere. Resistance describes how much voltage drop is needed for a given current. Ideal connecting wires have no voltage drop in these exercises.',
        ],
        formulas: [
          ['Loop law', '\\sum\\Delta V=0'],
          ['Resistor drop', 'V=IR'],
        ],
        examples: [
          ex('A 12 V source feeds series resistors of 2 Ω and 4 Ω. Find current in A.', [
            ['Add series resistance before applying Ohm’s law.', '12/(2 + 4)'],
            ['Evaluate, keeping the stated units.', '2\\,\\text{A}'],
          ], '2 A'),
          ex('A 15 V source has resistor drops of 6 V and an unknown drop. Find the unknown in V.', [
            ['The drops must add to the supply rise.', '15 - 6'],
            ['Evaluate, keeping the stated units.', '9\\,\\text{V}'],
          ], '9 V'),
        ],
        practice: [
          pr('A 3 Ω resistor carries 2 A. Find its voltage drop in V.', 6, 'Use current times resistance.', '3 × 2 = 6 V.'),
          pr('A 24 V loop carries 2 A. Find total resistance in Ω.', 12, 'Rearrange Ohm’s law.', '24/2 = 12 Ω.'),
          pr('Two opposing ideal sources of 12 V and 8 V drive a 2 Ω loop. Find current magnitude in A.', 2, 'Subtract opposing source voltages.', '(12 − 8)/2 = 2 A.'),
          pr('A 10 V source drives 1 A through series resistors of 3 Ω and R. Find R in Ω.', 7, 'Find total resistance, then remove the known resistor.', '10/1 − 3 = 7 Ω.'),
        ],
      },
      {
        title: 'The shared junction voltage',
        minutes: 25,
        explain: [
          'Set the lower rail to zero volts and call the top junction Va. In the scene the left current is (12 − Va)/4, the middle current is Va/6 and the right current is (V2 − Va)/R3. Their signs follow the chosen arrows.',
          'Substitute these expressions into the junction balance and collect the terms containing Va. This solves the coupled circuit without guessing how the batteries share the load. A supply with a lower voltage than Va receives current into its positive end.',
          'The quantities 1/R are conductances, measured in siemens. A larger conductance means an easier current path. The junction voltage is determined by all connected branches together.',
        ],
        formulas: [
          ['Scene junction voltage', 'V_a=\\frac{12/4+V_2/R_3}{1/4+1/6+1/R_3}'],
          ['Right branch, into junction positive', 'I_3=(V_2-V_a)/R_3'],
        ],
        examples: [
          ex('In the scene set V2 = 6 V and R3 = 2 Ω. Find Va in V.', [
            ['Use the three conductances in the denominator.', '(12/4 + 6/2)/(1/4 + 1/6 + 1/2)'],
            ['Evaluate, keeping the stated units.', '6.545455\\,\\text{V}'],
          ], '6.545455 V'),
          ex('With V2 = 6 V and R3 = 2 Ω, find signed I3 into the junction in A.', [
            ['Compare the supply voltage with the junction voltage.', '(6 - 6.545455)/2'],
            ['Evaluate, keeping the stated units.', '-0.2727273\\,\\text{A}'],
          ], '-0.2727273 A'),
        ],
        practice: [
          pr('Set V2 = 12 V and R3 = 2 Ω in the scene. Find Va in V.', 9.818182, 'Both supplies now feed the top junction.', '(12/4 + 12/2)/(1/4 + 1/6 + 1/2) = 9.818182 V.'),
          pr('At Va = 9 V, find the left current from the scene’s 12 V supply through 4 Ω, in A.', 0.75, 'Use the voltage difference across the left resistor.', '(12 − 9)/4 = 0.75 A.'),
          pr('At Va = 9 V, find the current down the scene’s 6 Ω middle resistor, in A.', 1.5, 'The lower rail is at zero volts.', '9/6 = 1.5 A.'),
          pr('Find V2 that makes I3 = 0 in the scene, in V. R1 = 4 Ω, R2 = 6 Ω and V1 = 12 V.', 7.2, 'The remaining left circuit is a voltage divider.', '12 × 6/(4 + 6) = 7.2 V.'),
        ],
      },
      {
        title: 'Power and measurement',
        minutes: 25,
        explain: [
          'A resistor turns electrical energy into heat at rate I²R. A heater needs that heat; a supply lead usually does not. The sum of power supplied must equal power absorbed in a steady ideal circuit.',
          'An ideal voltmeter compares potentials without drawing current. An ideal ammeter sits in a branch and measures its current without adding resistance. A balanced bridge compares resistor ratios and can measure a materials sensor with no current in its central measuring branch.',
          'For the bridge relation, compare two series pairs connected across the same supply, with a measuring branch between their midpoints. When the ratios match, the midpoint voltages match and the measuring branch carries no current.',
        ],
        formulas: [
          ['Electrical power', 'P=VI=I^2R'],
          ['Balanced bridge', 'R_1/R_2=R_3/R_4'],
        ],
        examples: [
          ex('A 6 Ω heater carries 2 A. Find power in W.', [
            ['Square current before multiplying by resistance.', '2^2 \\times  6'],
            ['Evaluate, keeping the stated units.', '24\\,\\text{W}'],
          ], '24 W'),
          ex('A balanced bridge has R1 = 100 Ω, R2 = 200 Ω and R3 = 150 Ω. Find R4 in Ω.', [
            ['Make the two resistor ratios equal.', '200 \\times  150/100'],
            ['Evaluate, keeping the stated units.', '300\\,\\text{}\\Omega\\text{}'],
          ], '300 Ω'),
        ],
        practice: [
          pr('A 12 V source supplies 1.5 A. Find delivered power in W.', 18, 'Multiply voltage by supplied current.', '12 × 1.5 = 18 W.'),
          pr('A lead of 0.2 Ω carries 5 A. Find heating power in W.', 5, 'Even a small lead resistance dissipates power.', '5^2 × 0.2 = 5 W.'),
          pr('A rechargeable source has 6 V with 0.3 A entering its positive end. Find absorbed electrical power in W.', 1.8, 'Incoming current at the positive end means absorption.', '6 × 0.3 = 1.8 W.'),
          pr('A heater uses 40 W for 90 s. Find electrical energy converted to heat in J.', 3600, 'Power is energy per second.', '40 × 90 = 3600 J.'),
        ],
      }
    ],
  },

  'phys-208': {
    predict: {
      q: 'An ideal transformer runs the scene’s fixed-power lamp. You halve the secondary turns while leaving the primary unchanged. How do secondary voltage and current change?',
      options: ['Voltage doubles; current halves', 'Voltage halves; current doubles', 'Voltage halves; current halves', 'Voltage doubles; current doubles'],
      answer: 1,
      reveal: 'The turns ratio halves the output voltage. Because this scene keeps lamp power fixed, the current doubles to keep voltage times current unchanged.',
    },
    parts: [
      {
        title: 'A changing field makes voltage',
        minutes: 25,
        explain: [
          'Magnetic flux measures the field passing through a turn of wire. A changing flux induces voltage around the turn. Faraday’s law says that more turns or faster change gives a larger induced voltage.',
          'The minus sign expresses Lenz’s law: the induced effect opposes the change that caused it. A steady flux gives no induced voltage. A battery can cause a brief output pulse on switching, but cannot run an ordinary transformer continuously with steady direct current.',
          'Flux Φ is measured in webers. For a uniform field perpendicular to a flat loop, field strength B in teslas times loop area A gives flux. A tilted loop would need its angle included.',
        ],
        formulas: [
          ['Faraday’s law', '\\mathcal E=-N\\,d\\Phi/dt'],
          ['Uniform perpendicular field', '\\Phi=BA'],
        ],
        examples: [
          ex('A 100-turn coil sees flux rise by 0.002 Wb per turn in 0.01 s. Find induced voltage magnitude in V.', [
            ['Multiply turns by flux change per second.', '100 \\times  0.002/0.01'],
            ['Evaluate, keeping the stated units.', '20\\,\\text{V}'],
          ], '20 V'),
          ex('A perpendicular 0.5 T field crosses area 0.004 m². Find flux in Wb.', [
            ['Multiply field by area.', '0.5 \\times  0.004'],
            ['Evaluate, keeping the stated units.', '0.002\\,\\text{Wb}'],
          ], '0.002 Wb'),
        ],
        practice: [
          pr('Flux stays constant through a 200-turn coil. Find induced voltage in V.', 0, 'Faraday’s law uses change, not flux alone.', '200 × 0 = 0 V.', { tol: 1e-12 }),
          pr('A 50-turn coil has flux changing at 0.03 Wb/s. Find voltage magnitude in V.', 1.5, 'Each turn contributes the same magnitude.', '50 × 0.03 = 1.5 V.'),
          pr('A 200-turn coil must produce 10 V magnitude. Find required flux-change rate in Wb/s.', 0.05, 'Divide voltage by the number of turns.', '10/200 = 0.05 Wb/s.', { tol: 0.0005 }),
          pr('The same flux change takes 0.02 s instead of 0.1 s. Find new induced magnitude divided by old.', 5, 'The rate is inversely proportional to the time taken.', '0.1/0.02 = 5.'),
        ],
      },
      {
        title: 'Turns set the voltage ratio',
        minutes: 25,
        explain: [
          'A transformer has a primary input coil and a secondary output coil sharing a magnetic core. In the ideal model, the changing flux passes through both coils, and each turn sees the same voltage.',
          'The voltage ratio therefore equals the turns ratio. Use rms voltages consistently for sine waves. More secondary turns step voltage up; fewer step it down. The voltage frequency remains the same.',
          'N1 and V1 describe the primary; N2 and V2 describe the secondary. The turn counts are pure numbers. The ratio must use secondary over primary on both sides.',
        ],
        formulas: [
          ['Ideal turns ratio', 'V_2/V_1=N_2/N_1'],
        ],
        examples: [
          ex('V1 = 230 V, N1 = 1,000 and N2 = 50. Find V2 in V.', [
            ['Multiply input voltage by secondary turns over primary turns.', '230 \\times  50/1000'],
            ['Evaluate, keeping the stated units.', '11.5\\,\\text{V}'],
          ], '11.5 V'),
          ex('A 230 V input must give 12 V with N1 = 920 turns. Find N2.', [
            ['Rearrange the turns ratio.', '920 \\times  12/230'],
            ['Evaluate, keeping the stated units.', '48\\,\\text{turns}'],
          ], '48 turns'),
        ],
        practice: [
          pr('N1 = 500 and N2 = 1,000 with V1 = 230 V. Find output in V.', 460, 'The secondary has more turns.', '230 × 1000/500 = 460 V.'),
          pr('N1 = 400 and N2 = 100 with V1 = 120 V. Find output in V.', 30, 'The ratio is less than one.', '120 × 100/400 = 30 V.'),
          pr('A transformer steps 240 V down to 24 V. Find N2/N1.', 0.1, 'The voltage ratio equals the turns ratio.', '24/240 = 0.1.', { tol: 0.001 }),
          pr('A 60 Hz input feeds an ideal transformer. How many output cycles occur in 2 s?', 120, 'A transformer changes voltage, not frequency.', '60 × 2 = 120 cycles.'),
        ],
      },
      {
        title: 'Current trades against voltage',
        minutes: 25,
        explain: [
          'An ideal transformer cannot create energy. For a resistive load, input power equals output power, so increasing voltage reduces current in the same proportion. Use the actual load when deciding whether power is fixed.',
          'The scene assumes a fixed 100 W output load. A real lamp or fixed resistor need not keep constant power as voltage changes. Real transformers also draw a small magnetising current and lose power as heat.',
          'The inverse current ratio applies to the ideal loaded transformer. Increasing output current is not free extra power, because the corresponding output voltage is lower.',
        ],
        formulas: [
          ['Ideal resistive power balance', 'V_1I_1=V_2I_2'],
          ['Current ratio', 'I_2/I_1=N_1/N_2'],
        ],
        examples: [
          ex('The scene load uses 100 W at 11.5 V. Find secondary current in A.', [
            ['Current is power divided by voltage.', '100/11.5'],
            ['Evaluate, keeping the stated units.', '8.695652\\,\\text{A}'],
          ], '8.695652 A'),
          ex('An ideal transformer supplies 120 W from 240 V. Find primary current in A.', [
            ['Input power equals output power.', '120/240'],
            ['Evaluate, keeping the stated units.', '0.5\\,\\text{A}'],
          ], '0.5 A'),
        ],
        practice: [
          pr('Output power is 60 W at 12 V. Find output current in A.', 5, 'Divide the load power by its voltage.', '60/12 = 5 A.'),
          pr('Input is 230 V at 2 A, with ideal output at 23 V into a resistive load. Find output current in A.', 20, 'Preserve input and output power.', '230 × 2/23 = 20 A.'),
          pr('A real transformer supplies 480 W with 96% efficiency. Find input power in W.', 500, 'Output is the efficiency fraction of input.', '480/0.96 = 500 W.'),
          pr('For that 480 W output and 96% efficiency, find heat loss in W.', 20, 'Subtract useful output from required input.', '480/0.96 − 480 = 20 W.'),
        ],
      },
      {
        title: 'Why the core and cables matter',
        minutes: 25,
        explain: [
          'Copper resistance heats the coils. A changing field can also drive circulating eddy currents inside the core. Thin insulated steel sheets interrupt those current paths. Silicon steel and suitable grain orientation help reduce core losses.',
          'High transmission voltage reduces current for the same delivered power. Cable heating falls with current squared. Transformer design balances core behaviour, insulation, copper size and cooling; changing turns alone does not settle all those questions.',
          'Core loss includes hysteresis: energy spent as magnetic domains change direction each cycle. A narrow magnetic hysteresis loop indicates less energy lost per unit core volume per cycle.',
        ],
        formulas: [
          ['Line heating', 'P_{loss}=I^2R'],
          ['At fixed delivered power', 'I=P/V'],
        ],
        examples: [
          ex('Transmit 1 MW at 10 kV. Find current in A, assuming a unity power factor.', [
            ['Use consistent volts and watts.', '1000000/10000'],
            ['Evaluate, keeping the stated units.', '100\\,\\text{A}'],
          ], '100 A'),
          ex('A line carries 100 A through total resistance 5 Ω. Find heating loss in W.', [
            ['Use the round-trip line resistance as stated.', '100^2 \\times  5'],
            ['Evaluate, keeping the stated units.', '50000\\,\\text{W}'],
          ], '50000 W'),
        ],
        practice: [
          pr('Transmit 1 MW at 100 kV with unity power factor. Find current in A.', 10, 'More voltage means less current.', '1000000/100000 = 10 A.'),
          pr('Find loss at 10 A in a 5 Ω line, in W.', 500, 'Square the smaller current.', '10^2 × 5 = 500 W.'),
          pr('At fixed power and resistance, tripling transmission voltage changes heating loss by what factor?', 0.1111111, 'Current falls by three; heating uses its square.', '1/3^2 = 0.1111111.', { tol: 0.0011111111111111111 }),
          pr('A winding of resistance 0.8 Ω carries 3 A. Find copper heating in W.', 7.2, 'The same resistance law applies to a coil.', '3^2 × 0.8 = 7.2 W.'),
        ],
      }
    ],
  },

  'phys-209': {
    predict: {
      q: 'The AC scene shows 230 V and 10 A. You shift current a quarter-cycle behind voltage, to 90°. What does the average power become in the ideal model?',
      options: ['It falls to zero watts', 'It remains at 2,300 W', 'It becomes −2,300 W', 'It doubles to 4,600 W'],
      answer: 0,
      reveal: 'The ideal coil takes energy during part of the cycle and returns it during another part. At 90° the positive and negative contributions cancel, even though the cables still carry current.',
    },
    parts: [
      {
        title: 'The useful size of an AC wave',
        minutes: 25,
        explain: [
          'Alternating voltage and current reverse direction repeatedly. A sine wave has a peak value and a frequency in cycles per second, called hertz. Its period is the time for one complete cycle.',
          'The rms value gives the same average heating in a resistor as a steady value of that size. For a sine wave it is the peak divided by √2. Unless stated otherwise, the voltage and current used for AC power here are rms values.',
          'A root-mean-square calculation squares the wave, averages those squares and takes a square root. Squaring keeps the negative half-cycle from cancelling the positive half when estimating heating.',
        ],
        formulas: [
          ['Sinusoidal rms', 'V_{rms}=V_{peak}/\\sqrt2'],
          ['Period', 'T=1/f'],
        ],
        examples: [
          ex('A sine-wave supply is 230 V rms. Find peak voltage in V.', [
            ['Multiply rms by √2 to recover the peak.', '230 \\times  \\sqrt2'],
            ['Evaluate, keeping the stated units.', '325.2691\\,\\text{V}'],
          ], '325.2691 V'),
          ex('A sine wave has frequency 60 Hz. Find period in ms.', [
            ['Invert frequency, then convert seconds to milliseconds.', '1000/60'],
            ['Evaluate, keeping the stated units.', '16.66667\\,\\text{ms}'],
          ], '16.66667 ms'),
        ],
        practice: [
          pr('A sine current peaks at 10 A. Find rms current in A.', 7.071068, 'Divide peak by √2.', '10/√2 = 7.071068 A.'),
          pr('A 50 Hz supply completes how many cycles in 3 s?', 150, 'Frequency counts cycles each second.', '50 × 3 = 150 cycles.'),
          pr('A 10 Ω resistor carries 2 A rms. Find average heating in W.', 40, 'Rms current works directly in I²R.', '2^2 × 10 = 40 W.'),
          pr('A sine voltage peaks at 100 V across 50 Ω. Find average resistor power in W.', 100, 'Convert to rms before using V²/R.', '(100/√2)^2/50 = 100 W.'),
        ],
      },
      {
        title: 'Phase and real power',
        minutes: 25,
        explain: [
          'Two waves can have the same frequency but reach their peaks at different times. Their phase angle φ describes that shift. An inductive load typically has current lagging voltage, as the scene’s blue wave does.',
          'Instantaneous power is voltage times current at that moment. Its cycle average is VI cos φ for sine waves. The power factor cos φ measures how much real power is transferred for a given rms voltage and current.',
          'Negative instantaneous power means energy is flowing back towards the source at that moment. It need not mean negative average power over the whole cycle.',
        ],
        formulas: [
          ['Real power', 'P=VI\\cos\\varphi'],
          ['Power factor', 'PF=P/(VI)'],
        ],
        examples: [
          ex('A motor draws 10 A at 230 V with PF = 0.8. Find real input power in W.', [
            ['Multiply apparent power by the power factor.', '230 \\times  10 \\times  0.8'],
            ['Evaluate, keeping the stated units.', '1840\\,\\text{W}'],
          ], '1840 W'),
          ex('At 230 V and 10 A, phase is 60°. Find real power in W.', [
            ['Use cosine of the phase angle.', '230 \\times  10 \\times  \\cos(60^\\circ)'],
            ['Evaluate, keeping the stated units.', '1150\\,\\text{W}'],
          ], '1150 W'),
        ],
        practice: [
          pr('A resistive heater draws 5 A at 230 V with PF = 1. Find power in W.', 1150, 'Voltage and current are in step.', '230 × 5 = 1150 W.'),
          pr('A load takes 800 W at 200 V and 5 A. Find its power factor.', 0.8, 'Compare real power with VI.', '800/(200 × 5) = 0.8.'),
          pr('Find the lag angle giving PF = 0.95, in degrees between 0 and 90.', 18.19487, 'Take inverse cosine, then express the angle in degrees.', '180arccos(0.95)/π = 18.19487 degrees.'),
          pr('An ideal inductive load has PF = 0 at 230 V and 10 A. Find average real power in W.', 0, 'Energy returned balances energy received.', '230 × 10 × 0 = 0 W.', { tol: 1e-12 }),
        ],
      },
      {
        title: 'The power triangle',
        minutes: 25,
        explain: [
          'Apparent power S = VI measures the demand on cables and transformers, in volt-amperes. Real power P, in watts, becomes net energy transfer. Reactive power Q, in var, describes the back-and-forth energy exchange.',
          'For sine waves these quantities form a right triangle: S² = P² + Q². This is why adding real and reactive power as ordinary numbers gives the wrong apparent power. We use positive Q for a lagging inductive load.',
          'Reactive power is not wasted heat by itself: it describes exchanged energy. The associated current can still cause real resistive heating in supply wires and windings.',
        ],
        formulas: [
          ['Power triangle', 'S=VI,\\quad Q=VI\\sin\\varphi'],
          ['Magnitudes', 'S^2=P^2+Q^2'],
        ],
        examples: [
          ex('At 230 V and 10 A, find apparent power in VA.', [
            ['Apparent power does not include power factor.', '230 \\times  10'],
            ['Evaluate, keeping the stated units.', '2300\\,\\text{VA}'],
          ], '2300 VA'),
          ex('A load has P = 3,000 W and Q = 4,000 var. Find S in VA.', [
            ['Use the right-triangle magnitude.', '\\sqrt{3000^2+4000^2}'],
            ['Evaluate, keeping the stated units.', '5000\\,\\text{VA}'],
          ], '5000 VA'),
        ],
        practice: [
          pr('A load has S = 1,000 VA and PF = 0.6. Find P in W.', 600, 'Multiply S by the power factor.', '1000 × 0.6 = 600 W.'),
          pr('For S = 1,000 VA and P = 600 W, find positive Q in var.', 800, 'Rearrange the triangle relation.', '√(1000^2-600^2) = 800 var.'),
          pr('A load has P = 3,000 W and S = 5,000 VA. Find PF.', 0.6, 'Power factor is real over apparent power.', '3000/5000 = 0.6.'),
          pr('An inductive load has S = 2,000 VA and phase 30°. Find Q in var.', 1000, 'Reactive power uses sine.', '2000 × sin(30°) = 1000 var.'),
        ],
      },
      {
        title: 'Reducing the supply current',
        minutes: 25,
        explain: [
          'A capacitor can supply reactive power that offsets an inductive motor’s demand. Then less reactive current needs to travel from the supply. At fixed real power and voltage, improving power factor reduces the supply current.',
          'The motor still needs real energy for its work and losses. The benefit is lower cable heating and less apparent-power demand. The simple formulas here assume a single-phase sinusoidal supply; three-phase systems need their own voltage convention.',
          'Cancellation is signed: capacitive and inductive reactive powers oppose each other. Too much capacitance can overcorrect the load, so a correction design must use measurements and a suitable target.',
        ],
        formulas: [
          ['Single-phase current', 'I=P/(VPF)'],
          ['Heating ratio', 'P_{loss,2}/P_{loss,1}=(I_2/I_1)^2'],
        ],
        examples: [
          ex('A single-phase 2,300 W load runs at 230 V and PF = 0.5. Find supply current in A.', [
            ['Divide by voltage and power factor.', '2300/(230 \\times  0.5)'],
            ['Evaluate, keeping the stated units.', '20\\,\\text{A}'],
          ], '20 A'),
          ex('Improve that load to PF = 1 at unchanged real power and voltage. Find supply current in A.', [
            ['Real power stays fixed.', '2300/230'],
            ['Evaluate, keeping the stated units.', '10\\,\\text{A}'],
          ], '10 A'),
        ],
        practice: [
          pr('At fixed real power and voltage, PF rises from 0.7 to 0.95. Find new current divided by old.', 0.7368421, 'Current varies inversely with power factor.', '0.7/0.95 = 0.7368421.'),
          pr('For that PF improvement, find current reduction in percent.', 26.31579, 'Subtract the current ratio from one.', '100 × (1 − 0.7/0.95) = 26.31579 %.'),
          pr('For that PF improvement and unchanged cable resistance, find new heating divided by old.', 0.5429363, 'Square the supply-current ratio.', '(0.7/0.95)^2 = 0.5429363.'),
          pr('A motor demands 1,200 var and a capacitor supplies 900 var locally. Find net inductive demand from the supply in var.', 300, 'Subtract the compensating reactive contribution.', '1200 − 900 = 300 var.'),
        ],
      }
    ],
  },

  'phys-211': {
    predict: {
      q: 'The beam scene puts a load at the centre of a supported shelf. You slide the same load towards one support. What should happen to the largest bending stress?',
      options: ['It stays fixed with the load', 'It rises near the support', 'It falls near the support', 'It is zero at every position'],
      answer: 2,
      reveal: 'Near a support, much of the load passes directly into that support. The maximum moment Pa(L − a)/L falls, so the largest bending stress falls too.',
    },
    parts: [
      {
        title: 'Supports share the load',
        minutes: 25,
        explain: [
          'A simply supported beam can turn at its supports while the supports provide upward reactions. For a downward point load P at distance a from the left end, vertical forces and moments must balance.',
          'Taking moments about one support gives the other reaction. A central load splits equally; a load near one end puts more force into that nearby support. These reactions are the starting point for the internal force diagrams.',
          'Here L is total span and a is measured from the left support. Reactions are forces, so their units match P. Their sum must recover the applied load.',
        ],
        formulas: [
          ['Point-load reactions', 'R_A=P(L-a)/L,\\quad R_B=Pa/L'],
        ],
        examples: [
          ex('A 3 m beam carries 6 kN at midspan. Find left reaction in kN.', [
            ['Use the load’s distance from the opposite support.', '6 \\times  (3 - 1.5)/3'],
            ['Evaluate, keeping the stated units.', '3\\,\\text{kN}'],
          ], '3 kN'),
          ex('A 3 m beam carries 6 kN at a = 1 m. Find right reaction in kN.', [
            ['Balance moments about the left support.', '6 \\times  1/3'],
            ['Evaluate, keeping the stated units.', '2\\,\\text{kN}'],
          ], '2 kN'),
        ],
        practice: [
          pr('An 8 kN central load sits on a simply supported beam. Find each reaction in kN.', 4, 'Use symmetry.', '8/2 = 4 kN.'),
          pr('A 4 m beam carries 10 kN at a = 1 m. Find left reaction in kN.', 7.5, 'The nearby support takes the larger share.', '10 × (4 − 1)/4 = 7.5 kN.'),
          pr('For that 4 m beam and load, find right reaction in kN.', 2.5, 'Use the left lever arm.', '10 × 1/4 = 2.5 kN.'),
          pr('The scene has L = 3 m, P = 5 kN and a = 0.5 m. Find left reaction in kN.', 4.166667, 'Insert the scene dimensions into the reaction formula.', '5 × (3 − 0.5)/3 = 4.166667 kN.'),
        ],
      },
      {
        title: 'Shear and moment diagrams',
        minutes: 25,
        explain: [
          'Imagine cutting the beam at a section. The internal shear force balances the vertical forces on one side of the cut. Before the point load, shear equals RA. After it, shear equals RA − P, using this sign convention.',
          'Bending moment measures the internal turning effect. Its slope along the beam is the shear. A single point load makes a jump in shear and a corner in moment; the largest moment occurs beneath the load.',
          'Shear has force units, while moment has force times length. At the ideal simple supports the bending moment is zero. These endpoint checks can catch a misplaced lever arm.',
        ],
        formulas: [
          ['Shear on each side', 'V_{left}=R_A,\\quad V_{right}=R_A-P'],
          ['Peak moment', 'M_{max}=Pa(L-a)/L'],
        ],
        examples: [
          ex('A 3 m beam has 5 kN at its centre. Find maximum moment in kN·m.', [
            ['At midspan use PL/4.', '5 \\times  3/4'],
            ['Evaluate, keeping the stated units.', '3.75\\,\\text{kN·m}'],
          ], '3.75 kN·m'),
          ex('For the same central load, find shear just to its right, in kN.', [
            ['Subtract the load from the left reaction.', '2.5 - 5'],
            ['Evaluate, keeping the stated units.', '-2.5\\,\\text{kN}'],
          ], '-2.5 kN'),
        ],
        practice: [
          pr('A 2 m beam has a central 10 kN load. Find maximum moment in kN·m.', 5, 'Use the central-load shortcut.', '10 × 2/4 = 5 kN·m.'),
          pr('A 3 m beam has 5 kN at a = 0.5 m. Find maximum moment in kN·m.', 2.083333, 'Multiply the load by both distances and divide by span.', '5 × 0.5 × (3 − 0.5)/3 = 2.083333 kN·m.'),
          pr('In a region with constant shear 2 kN over 0.8 m, find the increase in moment in kN·m.', 1.6, 'Moment change is the area under the shear diagram.', '2 × 0.8 = 1.6 kN·m.'),
          pr('A 4 m beam carries 8 kN at a = 1 m. Find maximum moment in kN·m.', 6, 'Use the off-centre point-load relation.', '8 × 1 × (4 − 1)/4 = 6 kN·m.'),
        ],
      },
      {
        title: 'Stress across the depth',
        minutes: 25,
        explain: [
          'In ordinary elastic bending, one face stretches while the other is compressed. At the neutral axis the longitudinal bending stress is zero. Away from that axis, stress grows in proportion to distance y.',
          'The flexure formula assumes a slender beam, small deformation and elastic material behaviour. Use the cross-section’s area moment I, which has units of length to the fourth power. It differs from the mass moment used for spinning wheels.',
          'In a rectangle b is width, h is depth and c = h/2 is the outer distance. Section modulus S packages the geometry needed for the maximum stress: σmax = M/S.',
        ],
        formulas: [
          ['Flexure', '\\sigma=My/I'],
          ['Rectangle', 'I=bh^3/12,\\quad S=I/(h/2)=bh^2/6'],
        ],
        examples: [
          ex('A rectangle is 50 mm wide and 100 mm deep. Find section modulus S in mm³.', [
            ['Depth is squared in section modulus.', '50 \\times  100^2/6'],
            ['Evaluate, keeping the stated units.', '83333.33\\,\\text{mm}^{3}\\text{}'],
          ], '83333.33 mm³'),
          ex('With S = 50 × 100²/6 mm³ and moment 3.75 kN·m, find outer stress magnitude in MPa.', [
            ['Convert moment to N·mm before dividing.', '3750000/(50 \\times  100^2/6)'],
            ['Evaluate, keeping the stated units.', '45\\,\\text{MPa}'],
          ], '45 MPa'),
        ],
        practice: [
          pr('For a nonzero bending moment, find bending stress at y = 0, in MPa.', 0, 'The neutral axis has zero distance y.', '1 × 0 = 0 MPa.', { tol: 1e-12 }),
          pr('An elastic section has 40 MPa at y = 50 mm. Find stress magnitude at y = 25 mm, in MPa.', 20, 'Stress varies linearly with distance.', '40 × 25/50 = 20 MPa.'),
          pr('A 60 mm wide, 120 mm deep rectangle has what I in mm⁴?', 8640000, 'Area moment uses depth cubed.', '60 × 120^3/12 = 8640000 mm⁴.'),
          pr('A section has I = 8,000,000 mm⁴ and outer distance c = 80 mm. Find S in mm³.', 100000, 'Divide the area moment by outer distance.', '8000000/80 = 100000 mm³.'),
        ],
      },
      {
        title: 'Choosing depth and controlling deflection',
        minutes: 25,
        explain: [
          'For a rectangular beam of fixed width, doubling depth multiplies section modulus by four and area moment by eight. A deeper beam therefore lowers stress and usually reduces sag strongly. Material stiffness E controls deflection as well as geometry.',
          'For a central point load on a simply supported elastic beam, midspan deflection is PL³/(48EI). Check both stress and deflection. The scene mission has two mirror-image load positions giving the same stress; specify a side if solving for a unique position.',
          'Deflection is movement of the beam from its unloaded position. A beam can remain below its strength limit yet sag too much for a machine, wall or shelf to function properly.',
        ],
        formulas: [
          ['Central deflection', '\\delta=PL^3/(48EI)'],
          ['Stress limit', 'M_{allow}=\\sigma_{allow}S'],
        ],
        examples: [
          ex('A beam with S = 80,000 mm³ allows 100 MPa bending stress. Find allowed moment in kN·m.', [
            ['Multiply stress by section modulus, then convert N·mm.', '100 \\times  80000/1000000'],
            ['Evaluate, keeping the stated units.', '8\\,\\text{kN·m}'],
          ], '8 kN·m'),
          ex('For P = 1,000 N, L = 2,000 mm, E = 200,000 N/mm² and I = 8,000,000 mm⁴, find central deflection in mm.', [
            ['Use a consistent N and mm system.', '1000 \\times  2000^3/(48 \\times  200000 \\times  8000000)'],
            ['Evaluate, keeping the stated units.', '0.1041667\\,\\text{mm}'],
          ], '0.1041667 mm'),
        ],
        practice: [
          pr('At fixed width and moment, doubling rectangular depth changes peak stress by what factor?', 0.25, 'Stress is inverse to section modulus.', '1/2^2 = 0.25.', { tol: 0.0025 }),
          pr('At unchanged P, L and E, doubling I changes central deflection by what factor?', 0.5, 'Deflection is inverse to I.', '1/2 = 0.5.'),
          pr('For a 3 m beam and 5 kN point load, S = 50 × 100²/6 mm³ and target stress 30 MPa, find the load position a nearest the left support, in m.', 0.6339746, 'Target moment is 2.5 kN·m; solve a(3 − a) = 1.5 and choose a below midspan.', '(3 − √(9 − 6))/2 = 0.6339746 m.'),
          pr('A 3 m beam has a permitted central-load moment of 2.5 kN·m. Find maximum central point load in kN.', 3.333333, 'Rearrange M = PL/4.', '4 × 2.5/3 = 3.333333 kN.'),
        ],
      }
    ],
  },

  'eng-006': {
    predict: {
      q: 'Twenty labs show intervals for the same alloy. You keep their sample counts unchanged but raise confidence from 95% to 99%. What should happen to the intervals?',
      options: ['They shrink around each mean', 'They all centre on the truth', 'They keep exactly the same width', 'They widen around each mean'],
      answer: 3,
      reveal: 'Higher confidence needs a wider net when the observations stay the same. It does not move a lab’s sample mean onto the true mean. More specimens can recover precision.',
    },
    parts: [
      {
        title: 'Turn an idea into a test',
        minutes: 25,
        explain: [
          'A research question names something you can measure. Instead of asking whether an alloy is better, ask whether a specified treatment raises its mean yield strength under a stated test. A hypothesis should say what result would count against it.',
          'Read earlier work to learn what is already known, then define a comparison, an outcome and a method before testing. A measured improvement and a percentage improvement are different quantities. Report which one you mean.',
          'Before collecting results, define what counts as an independent specimen and what would invalidate a test. This reduces the temptation to change the rules after seeing whether the outcome is favourable.',
        ],
        formulas: [
          ['Difference', '\\Delta=\\bar x_{treated}-\\bar x_{control}'],
          ['Relative gain', 'g=100\\Delta/\\bar x_{control}'],
        ],
        examples: [
          ex('Control mean strength is 400 MPa and treated mean is 440 MPa. Find the difference in MPa.', [
            ['Subtract the control from the treated value.', '440 - 400'],
            ['Evaluate, keeping the stated units.', '40\\,\\text{MPa}'],
          ], '40 MPa'),
          ex('For those means, find the improvement in percent relative to control.', [
            ['Divide the gain by the control mean.', '100 \\times  (440 - 400)/400'],
            ['Evaluate, keeping the stated units.', '10\\,\\text{\\%}'],
          ], '10 %'),
        ],
        practice: [
          pr('A hypothesis predicts at least a 20 MPa increase from a control mean of 350 MPa. Find the predicted minimum treated mean in MPa.', 370, 'Add the stated minimum gain.', '350 + 20 = 370 MPa.'),
          pr('Mean strength rises from 500 to 525 MPa. Find percentage gain.', 5, 'Use the starting value as the denominator.', '100 × (525 − 500)/500 = 5 %.'),
          pr('A study compares 3 treatments plus one control, with 6 independent specimens each. Find total specimens.', 24, 'Include the control group.', '(3 + 1) × 6 = 24 specimens.'),
          pr('A study needs 48 valid specimens and expects a 20% invalid-test fraction. Find the planned number to obtain 48 valid specimens on average.', 60, 'The valid fraction is 0.8.', '48/(1 − 0.2) = 60 specimens.'),
        ],
      },
      {
        title: 'Fair comparisons and independent specimens',
        minutes: 25,
        explain: [
          'Change the treatment you want to study while holding other conditions steady. Random assignment reduces systematic differences between groups. Blocking compares treatments within a shared batch or day to reduce unwanted variation.',
          'Replication means testing independent specimens. Reading the same specimen repeatedly checks measurement repeatability but does not create new independent specimens. Plan enough genuine replication and record specimen preparation, equipment settings and departures from the plan.',
          'Controls help separate a treatment effect from a change in measurement or preparation. Repeated readings are still useful, but their purpose differs from testing variability between independently prepared specimens.',
        ],
        formulas: [
          ['Balanced treatment count', 'N=gr'],
          ['Mean', '\\bar x=\\sum x_i/n'],
        ],
        examples: [
          ex('Four treatments each use five independent specimens. Find total specimens.', [
            ['Multiply groups by replication per group.', '4 \\times  5'],
            ['Evaluate, keeping the stated units.', '20\\,\\text{specimens}'],
          ], '20 specimens'),
          ex('Three independent specimens give strengths 490, 500 and 510 MPa. Find their mean in MPa.', [
            ['Add strengths and divide by specimen count.', '(490 + 500 + 510)/3'],
            ['Evaluate, keeping the stated units.', '500\\,\\text{MPa}'],
          ], '500 MPa'),
        ],
        practice: [
          pr('Five specimens each receive four repeat readings. How many independent specimens are present?', 5, 'Repeat readings do not multiply independent specimens.', '5 × 1 = 5 specimens.'),
          pr('Two treatments are applied once in each of six independent batch blocks. Find total specimen tests.', 12, 'Each block contains both treatments.', '2 × 6 = 12 tests.'),
          pr('A machine reads a reference as 102, 100 and 101 MPa. Find mean reading in MPa.', 101, 'Average the repeated readings.', '(102 + 100 + 101)/3 = 101 MPa.'),
          pr('That reference is certified at 100 MPa. Find mean reading minus reference value in MPa.', 1, 'A positive difference indicates an upward bias here.', '(102 + 100 + 101)/3 − 100 = 1 MPa.'),
        ],
      },
      {
        title: 'Intervals describe uncertainty in a mean',
        minutes: 25,
        explain: [
          'A sample mean varies between experiments. Its standard error is estimated by s/√n, where s measures specimen scatter and n counts independent specimens. A confidence interval puts a multiplier around that estimated error.',
          'A 95% method captures the fixed true mean in about 95% of many repeated studies under its assumptions. It does not claim that 95% of individual strengths lie inside. Small samples need an appropriate t multiplier, not a universal value of two.',
          'The multiplier t* depends on confidence level and available information about scatter. Raising confidence widens an interval with the same observations. Increasing n usually narrows it, which is the central trade-off in the scene.',
        ],
        formulas: [
          ['Standard error', 'SE=s/\\sqrt n'],
          ['Mean interval', '\\bar x\\pm t^*s/\\sqrt n'],
        ],
        examples: [
          ex('Specimen standard deviation is 30 MPa with n = 36. Find SE in MPa.', [
            ['Divide scatter by the square root of specimen count.', '30/\\sqrt{36}'],
            ['Evaluate, keeping the stated units.', '5\\,\\text{MPa}'],
          ], '5 MPa'),
          ex('Mean is 500 MPa, s = 20 MPa, n = 25 and supplied t multiplier is 2.064. Find the upper interval endpoint in MPa.', [
            ['Add the margin to the mean.', '500 + 2.064 \\times  20/\\sqrt{25}'],
            ['Evaluate, keeping the stated units.', '508.256\\,\\text{MPa}'],
          ], '508.256 MPa'),
        ],
        practice: [
          pr('With s = 24 MPa and n = 16, find SE in MPa.', 6, 'Use the square root, not the sample count itself.', '24/√(16) = 6 MPa.'),
          pr('For a supplied multiplier of 2, s = 30 MPa and n = 100, find margin in MPa.', 6, 'Multiply SE by the supplied multiplier.', '2 × 30/√(100) = 6 MPa.'),
          pr('An interval is 480 to 520 MPa. Find its margin about the midpoint, in MPa.', 20, 'Margin is half the total width.', '(520 − 480)/2 = 20 MPa.'),
          pr('For 20 independent studies using a valid 95% interval method, find the expected number of intervals missing the true mean.', 1, 'Multiply study count by the miss probability; the actual count can vary.', '20 × (1 − 0.95) = 1 intervals.'),
        ],
      },
      {
        title: 'Plan precision and report honestly',
        minutes: 25,
        explain: [
          'To plan a study, choose a useful margin of error rather than only a convenient specimen count. With an approximate multiplier of two, n is about (2s/E)². Round required counts upwards and revisit the estimate when pilot scatter is uncertain.',
          'Write what was done so another researcher can repeat it. Separate observations from interpretation, report uncertainty and invalid tests, and cite the work that informed the method. A narrow interval does not fix bias, confounding or unrepresentative sampling.',
          'Planning also needs time, cost and access to specimens. If the available count cannot reach the desired precision, report that limitation and revise the question instead of presenting an uncertain result as decisive.',
        ],
        formulas: [
          ['Approximate planning count', 'n\\approx(2s/E)^2'],
          ['Fixed-multiplier scaling', 'E_2/E_1=\\sqrt{n_1/n_2}'],
        ],
        examples: [
          ex('Use multiplier 2 and estimated s = 20 MPa for target margin 5 MPa. Estimate required n.', [
            ['Put the desired margin in the denominator before squaring.', '(2 \\times  20/5)^2'],
            ['Evaluate, keeping the stated units.', '64\\,\\text{specimens}'],
          ], '64 specimens'),
          ex('At fixed scatter and multiplier, a study uses 16 specimens. How many are needed to halve its margin?', [
            ['Halving a square-root error needs four times the count.', '16 \\times  4'],
            ['Evaluate, keeping the stated units.', '64\\,\\text{specimens}'],
          ], '64 specimens'),
        ],
        practice: [
          pr('With multiplier 2 and s = 30 MPa, estimate n for a 10 MPa margin.', 36, 'Use the planning expression.', '(2 × 30/10)^2 = 36 specimens.'),
          pr('At fixed scatter and multiplier, increase n from 25 to 100. Find new margin divided by old.', 0.5, 'Take the square root of old count over new count.', '√(25/100) = 0.5.'),
          pr('A report has 40 tests, including 3 invalid tests documented before analysis. How many valid results remain?', 37, 'Keep an explicit count of exclusions.', '40 − 3 = 37 results.'),
          pr('Using multiplier 2, s = 23 MPa and margin 6 MPa, find the required whole specimen count, rounded upwards.', 59, 'Square the ratio, then take the next whole count.', 'round up((2 × 23/6)^2) = 59 specimens.'),
        ],
      }
    ],
  },

  'eng-007': {
    predict: {
      q: 'In the scene, design takes 3 weeks, the furnace order 6, foundation 4, installation 2 and testing 1. Installation waits for both order and foundation. What if foundation grows to 6 weeks?',
      options: ['The finish stays at 12 weeks', 'The finish moves to 14 weeks', 'The finish moves to 16 weeks', 'The finish falls to 10 weeks'],
      answer: 0,
      reveal: 'The foundation uses up its two weeks of slack and now ties the furnace order. Installation still starts at week 9, so the finish stays at week 12; either branch can now delay it.',
    },
    parts: [
      {
        title: 'Tasks and waiting relationships',
        minutes: 25,
        explain: [
          'A project is a set of activities with durations and dependencies. A Gantt chart draws each activity as a horizontal bar against time. A dependency says which work must finish before another activity starts.',
          'Some tasks can happen in parallel. Adding every duration usually overstates project time. For the furnace scene, design precedes ordering, foundation and training. Installation waits for ordering and foundation; testing waits for installation and training.',
          'A finish at week 3 means three weeks have elapsed since project time zero. Use that elapsed-time convention consistently so counting named calendar weeks does not add an accidental extra week.',
        ],
        formulas: [
          ['Task finish', 'EF=ES+d'],
          ['Joining branches', 'ES=\\max(EF_{predecessors})'],
        ],
        examples: [
          ex('Design starts at week 0 and lasts 3 weeks. Find its finish week.', [
            ['Add duration to start.', '0 + 3'],
            ['Evaluate, keeping the stated units.', '3\\,\\text{weeks}'],
          ], '3 weeks'),
          ex('An installation waits for tasks finishing at weeks 7 and 9. Find earliest start week.', [
            ['Both required tasks must be finished.', '\\max(7,9)'],
            ['Evaluate, keeping the stated units.', '9\\,\\text{weeks}'],
          ], '9 weeks'),
        ],
        practice: [
          pr('A 4-week task starts at week 3. Find its finish week.', 7, 'Add start and duration.', '3 + 4 = 7 weeks.'),
          pr('Two independent tasks take 5 and 8 weeks from the same start. Find time until both are complete, in weeks.', 8, 'The slower parallel branch sets the wait.', 'max(5,8) = 8 weeks.'),
          pr('Tasks of 2, 4 and 3 weeks must run one after another. Find total duration in weeks.', 9, 'Sequential tasks add.', '2 + 4 + 3 = 9 weeks.'),
          pr('After 3 weeks of design, ordering takes 6 weeks in parallel with 4 weeks of foundation work. Find the earliest installation start week.', 9, 'Take the longer branch after design.', '3 + max(6,4) = 9 weeks.'),
        ],
      },
      {
        title: 'Forward pass and the critical path',
        minutes: 25,
        explain: [
          'Work forwards through the dependencies to find earliest starts and finishes. At a join, use the latest finish among the required predecessors. The earliest project completion is the finish of the last required activity.',
          'The critical path is the longest dependent chain. Its activities have no spare time in the current schedule. More than one path can be critical, and changing a duration can change which path controls the finish.',
          'The simplest critical-path schedule assumes fixed durations and no resource conflicts. It provides a baseline. Review it when access, staffing, delivery conditions or safety constraints change.',
        ],
        formulas: [
          ['Forward pass', 'ES_j=\\max_{i\\to j}EF_i,\\quad EF_j=ES_j+d_j'],
          ['Project duration', 'T=\\max EF_{final}'],
        ],
        examples: [
          ex('For the scene chain A → B → D → F, durations are 3, 6, 2 and 1 weeks. Find chain length in weeks.', [
            ['Add durations along this dependent chain.', '3 + 6 + 2 + 1'],
            ['Evaluate, keeping the stated units.', '12\\,\\text{weeks}'],
          ], '12 weeks'),
          ex('Foundation C becomes 9 weeks after 3-week design. Installation takes 2 and testing 1 week; ordering still takes 6 weeks. Find project duration in weeks.', [
            ['The longer preparation branch sets installation start.', '3 + \\max(9,6) + 2 + 1'],
            ['Evaluate, keeping the stated units.', '15\\,\\text{weeks}'],
          ], '15 weeks'),
        ],
        practice: [
          pr('One complete path takes 10 weeks and another 12. Find shortest possible project duration with unlimited resources, in weeks.', 12, 'All required paths must finish.', 'max(10,12) = 12 weeks.'),
          pr('Two paths each take 12 weeks. How many critical paths are there if these are the only complete paths?', 2, 'A tie makes both controlling paths critical.', '1 + 1 = 2 paths.'),
          pr('In the scene, foundation takes 5 weeks while ordering takes 6. Find project duration in weeks.', 12, 'Foundation still finishes before the furnace arrives.', '3 + max(5,6) + 2 + 1 = 12 weeks.'),
          pr('In the scene, foundation takes 10 weeks and ordering 6. Find project duration in weeks.', 16, 'The civil-work branch now controls.', '3 + max(10,6) + 2 + 1 = 16 weeks.'),
        ],
      },
      {
        title: 'Backward pass and slack',
        minutes: 25,
        explain: [
          'Starting at the required finish, work backwards to find each latest finish and latest start. When a task feeds several successors, it must finish by the earliest of their latest starts.',
          'Total slack is latest start minus earliest start. It tells how much a task may slip without delaying the current project finish. Slack can be shared with other tasks on a path, so it is not a separate allowance to spend independently at every activity.',
          'ES and EF mean earliest start and finish; LS and LF mean latest start and finish without delaying the project. The backward pass uses the same dependency relationships as the forward pass.',
        ],
        formulas: [
          ['Backward pass', 'LF_i=\\min_{i\\to j}LS_j,\\quad LS_i=LF_i-d_i'],
          ['Slack', 's=LS-ES'],
        ],
        examples: [
          ex('A task has earliest start week 3 and latest start week 5. Find slack in weeks.', [
            ['Subtract earliest from latest start.', '5 - 3'],
            ['Evaluate, keeping the stated units.', '2\\,\\text{weeks}'],
          ], '2 weeks'),
          ex('A 4-week task must finish by week 9. Find latest start week.', [
            ['Work backwards from its latest finish.', '9 - 4'],
            ['Evaluate, keeping the stated units.', '5\\,\\text{weeks}'],
          ], '5 weeks'),
        ],
        practice: [
          pr('A task has ES = 7 and LS = 7 weeks. Find slack in weeks.', 0, 'Equal starts identify a critical task.', '7 − 7 = 0 weeks.', { tol: 1e-12 }),
          pr('A task feeds successors with latest starts at weeks 8 and 11. Find its latest finish week.', 8, 'Meet the earlier successor’s deadline.', 'min(8,11) = 8 weeks.'),
          pr('In the scene with foundation duration 4 weeks, C starts at week 3 and installation starts at week 9. Find C slack in weeks.', 2, 'Find latest start from the installation deadline.', '(9 − 4) − 3 = 2 weeks.'),
          pr('In the scene, training E starts at week 3 and lasts 3 weeks. Testing starts at week 11. Find E total slack in weeks.', 5, 'Training must finish by the testing start.', '(11 − 3) − 3 = 5 weeks.'),
        ],
      },
      {
        title: 'Time, cost and uncertainty',
        minutes: 25,
        explain: [
          'Paying to shorten a non-critical activity may leave the project finish unchanged. Shorten a controlling path, then recalculate: another path can become critical. Resource limits can also prevent tasks from overlapping as freely as the first schedule assumes.',
          'PERT uses optimistic, most likely and pessimistic times to form a weighted estimate. It is a planning aid, not a promise. Keep cost, remaining risk and the evidence for each duration visible when choosing a recovery plan.',
          'In the PERT expression, a is optimistic time, m most likely and b pessimistic. They are estimates for the same task and must use the same time unit.',
        ],
        formulas: [
          ['PERT expected time', 't_e=(a+4m+b)/6'],
          ['Cost per week saved', 'c=\\Delta cost/\\Delta t'],
        ],
        examples: [
          ex('A task has optimistic 2, most likely 4 and pessimistic 8 weeks. Find PERT expected time in weeks.', [
            ['Give the most likely time four times the weight.', '(2 + 4 \\times  4 + 8)/6'],
            ['Evaluate, keeping the stated units.', '4.333333\\,\\text{weeks}'],
          ], '4.333333 weeks'),
          ex('Shortening a critical task by 2 weeks costs ₱60,000 extra. Find cost per week saved in pesos.', [
            ['Divide extra cost by the reduction.', '60000/2'],
            ['Evaluate, keeping the stated units.', '30000\\,\\text{pesos/week}'],
          ], '30000 pesos/week'),
        ],
        practice: [
          pr('In the original 12-week scene schedule, training has 5 weeks slack. Shorten training by 2 weeks only. Find the project finish week.', 12, 'The ordering path still controls.', '3 + 6 + 2 + 1 = 12 weeks.'),
          pr('Original ordering is 6 weeks and foundation is 4. Shorten ordering to 5 weeks; design 3, installation 2 and testing 1 stay unchanged. Find project duration.', 11, 'Recalculate the longest preparation branch.', '3 + max(5,4) + 2 + 1 = 11 weeks.'),
          pr('Shorten ordering further to 3 weeks while foundation stays at 4. Find project duration with the same other tasks, in weeks.', 10, 'The foundation now controls installation.', '3 + max(3,4) + 2 + 1 = 10 weeks.'),
          pr('Two jobs each need the only furnace for 4 hours and cannot overlap. Find minimum combined furnace occupation in h.', 8, 'A shared resource imposes a sequence.', '4 + 4 = 8 h.'),
        ],
      }
    ],
  },

  'eng-008': {
    predict: {
      q: 'The safety scene keeps mean strength at twice mean load. You double the scatter in both. Does the same factor of safety preserve the same failure chance?',
      options: ['Yes, the mean ratio decides all', 'No, the failure chance rises', 'Yes, the scatter cancels away', 'No, the failure chance falls'],
      answer: 1,
      reveal: 'Wider load and strength distributions make unsafe combinations more likely even though their means keep the same ratio. A safety factor is only part of the evidence for a responsible decision.',
    },
    parts: [
      {
        title: 'Public safety and a stated margin',
        minutes: 25,
        explain: [
          'Engineering decisions affect people who cannot inspect the calculations themselves. Put public safety first, work within your competence and describe limitations honestly. Pressure from cost or schedule does not make unsupported evidence trustworthy.',
          'A factor of safety compares an appropriate strength with an expected demand. State whether strength means yielding, fracture or another limit. A ratio alone cannot approve a design: the load case, material evidence and relevant failure modes must also be checked.',
          'When a calculation is outside your competence, obtaining an appropriate review is part of responsibility. Numerical confidence should not be substituted for relevant experience or evidence.',
        ],
        formulas: [
          ['Factor of safety', 'n=S/L'],
          ['Allowable demand in a simple model', 'L_{allow}=S/n_{required}'],
        ],
        examples: [
          ex('Measured yield strength is 300 MPa and calculated working stress is 120 MPa. Find the yield-based safety factor.', [
            ['Compare strength with the same kind of demand.', '300/120'],
            ['Evaluate, keeping the stated units.', '2.5'],
          ], '2.5'),
          ex('For a teaching requirement n = 2 and strength 360 MPa, find allowable stress in MPa.', [
            ['Divide strength by the stated required factor.', '360/2'],
            ['Evaluate, keeping the stated units.', '180\\,\\text{MPa}'],
          ], '180 MPa'),
        ],
        practice: [
          pr('Strength is 240 MPa and working stress is 80 MPa. Find n.', 3, 'Strength goes above demand.', '240/80 = 3.'),
          pr('A stated requirement is n = 2.5 at demand 100 MPa. Find required strength in MPa.', 250, 'Multiply required factor by demand.', '2.5 × 100 = 250 MPa.'),
          pr('Verified strength is 200 MPa and revised demand is 250 MPa. Find n.', 0.8, 'A result below one means demand exceeds this strength.', '200/250 = 0.8.'),
          pr('Strength 400 MPa was accepted for 160 MPa demand. Revised demand is 200 MPa. Find the reduction in safety factor.', 0.5, 'Compare the old and revised ratios.', '400/160 − 400/200 = 0.5.'),
        ],
      },
      {
        title: 'Recheck the assumptions',
        minutes: 25,
        explain: [
          'A design change can invalidate an earlier calculation. Extra dead weight, a new operating temperature or a changed weld detail needs review. A neat original report is not evidence that the changed design is safe.',
          'The bridge and seal stories in the class show why warnings need a response. When evidence indicates danger, record the concern clearly, seek competent review and take it to people able to act. Do not sign a result you cannot substantiate.',
          'State both what is known and what remains uncertain. A warning should identify the affected component and the consequence, rather than burying the issue in a general statement that more study would be useful.',
        ],
        formulas: [
          ['Underestimated demand', 'L_{true}=(1+u)L_{assumed}'],
          ['Revised factor', 'n_{true}=n_{assumed}/(1+u)'],
        ],
        examples: [
          ex('An assumed demand of 100 MPa is actually 20% higher. Find true demand in MPa.', [
            ['Apply the increase to the assumed value.', '100 \\times  1.2'],
            ['Evaluate, keeping the stated units.', '120\\,\\text{MPa}'],
          ], '120 MPa'),
          ex('The design factor was 2.4, but demand is 20% higher than assumed. Find true factor.', [
            ['The unchanged strength must cover the larger demand.', '2.4/1.2'],
            ['Evaluate, keeping the stated units.', '2'],
          ], '2'),
        ],
        practice: [
          pr('An assumed 50 kN load rises by 10%. Find revised load in kN.', 55, 'Multiply by one plus the fractional increase.', '50 × 1.1 = 55 kN.'),
          pr('A design factor of 1.8 used an assumed load that the actual load exceeds by 30%. Find true factor.', 1.384615, 'Use actual load equal to 1.3 times assumed load.', '1.8/1.3 = 1.384615.'),
          pr('A machine’s steady load is 80 kN, with an additional 20 kN in the stated worst case. Find demand for that case in kN.', 100, 'Include the additional load rather than averaging it away.', '80 + 20 = 100 kN.'),
          pr('A member’s capacity is 180 kN and revised worst-case demand is 120 kN. Find its capacity-to-demand ratio.', 1.5, 'Use the revised case in the denominator.', '180/120 = 1.5.'),
        ],
      },
      {
        title: 'Scatter and chance of failure',
        minutes: 25,
        explain: [
          'Strength and load vary. In the scene, both follow independent normal distributions. Failure means an actual load exceeds actual strength. Increasing scatter makes this event more likely when mean strength is above mean load.',
          'The separation measure β compares the gap between means with the combined standard deviation. A larger β gives lower failure probability in this model. The picture’s overlap is a visual cue; its area is not itself the probability that load exceeds strength. Distribution assumptions and independence need evidence.',
          'The symbols μS and μL are mean strength and mean load; sS and sL describe their standard deviations. CV compares each deviation with its own mean. Do not use the same absolute deviation merely because both CV values match.',
        ],
        formulas: [
          ['Independent normal separation', '\\beta=\\frac{\\mu_S-\\mu_L}{\\sqrt{s_S^2+s_L^2}}'],
          ['Relative scatter', 'CV=s/\\mu'],
        ],
        examples: [
          ex('Mean strength is 200 MPa and mean load is 100 MPa. Their standard deviations are 20 and 10 MPa. Find β.', [
            ['Divide the mean gap by combined independent scatter.', '(200 - 100)/\\sqrt{20^2+10^2}'],
            ['Evaluate, keeping the stated units.', '4.472136'],
          ], '4.472136'),
          ex('Keep those means but double both standard deviations to 40 and 20 MPa. Find β.', [
            ['Wider scatter reduces separation measured in standard deviations.', '(200 - 100)/\\sqrt{40^2+20^2}'],
            ['Evaluate, keeping the stated units.', '2.236068'],
          ], '2.236068'),
        ],
        practice: [
          pr('Mean strength is 300 MPa with standard deviation 30 MPa. Find CV as a decimal.', 0.1, 'Divide standard deviation by the mean.', '30/300 = 0.1.', { tol: 0.001 }),
          pr('Mean load is 120 MPa with CV = 0.1. Find its standard deviation in MPa.', 12, 'Multiply relative scatter by its own mean.', '120 × 0.1 = 12 MPa.'),
          pr('Independent strength and load have standard deviations 30 and 40 MPa. Find combined standard deviation in MPa.', 50, 'Add variances, then take a square root.', '√(30^2+40^2) = 50 MPa.'),
          pr('Mean strength is 250 MPa and mean load is 150 MPa; combined standard deviation is 50 MPa. Find β.', 2, 'Use the mean gap in the numerator.', '(250 − 150)/50 = 2.'),
        ],
      },
      {
        title: 'Evidence, responsibility and clear reporting',
        minutes: 25,
        explain: [
          'A responsible report identifies the item tested, the method, the results, the uncertainty and unresolved concerns. Keep traceable records. A certificate from a different heat or weld cannot establish the properties of the item you are asked to approve.',
          'If evidence is missing or falsified, do not invent results or sign an unsupported approval. State the problem, its possible consequence and the action needed, then seek review and escalate unresolved danger. Disclose conflicts of interest so others can judge your advice fairly.',
          'A small expected failure count is not permission to ignore a severe consequence. Ethical judgement includes who is exposed, whether the evidence is credible and whether concerns have been resolved.',
        ],
        formulas: [
          ['Evidence coverage', 'c=N_{verified}/N_{required}'],
          ['Expected count under a stated model', 'E[N_{fail}]=Np'],
        ],
        examples: [
          ex('A stated release rule requires verified records for all 12 welds. Only 9 have valid records. How many are still unverified?', [
            ['Missing evidence remains unresolved.', '12 - 9'],
            ['Evaluate, keeping the stated units.', '3\\,\\text{welds}'],
          ], '3 welds'),
          ex('Under a supplied model, each of 10,000 items has failure probability 0.001. Find the expected failure count; this is not an exact prediction.', [
            ['Multiply population by probability.', '10000 \\times  0.001'],
            ['Evaluate, keeping the stated units.', '10\\,\\text{failures}'],
          ], '10 failures'),
        ],
        practice: [
          pr('A review requires 8 checks. Five are documented as complete. How many remain without completed evidence?', 3, 'Subtract the completed count.', '8 − 5 = 3 checks.'),
          pr('Of 20 required material certificates, 15 are verified. Find verified coverage as a decimal.', 0.75, 'Count only verified documents.', '15/20 = 0.75.'),
          pr('A supplied model changes failure probability from 0.01 to 0.001. Find the risk-reduction factor old probability divided by new.', 10, 'Compare probabilities as a ratio.', '0.01/0.001 = 10.'),
          pr('A release rule requires 10 matching specimen records. Ten are supplied, but 2 belong to another batch. How many additional matching records are required?', 2, 'Count matching records, not just supplied sheets.', '10 − (10 − 2) = 2 records.'),
        ],
      }
    ],
  },
};
