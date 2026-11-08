// Year 4, first semester: processing, fracture, nanomaterials, mechanics of solids and fluids.
// Each class split into parts: explanation, key formulas, worked examples shown one step
// at a time, and practice problems where you type the answer.
//
// Practice answers: a number (checked to about 1%), or 'inf', '-inf' or 'dne'
// (does not exist). `tol` overrides the tolerance (absolute).

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const YEAR4A = {
  'mate-130': {
    predict: {
      q: 'A steel plate 20 × 20 × 4 cm is cast in sand. On top sits a round riser (height = diameter) that must stay liquid longer than the plate. The plate is only 4 cm thick. How wide must the riser be?',
      options: ['About 4 cm', 'About 6 cm', 'About 10 cm', 'About 16 cm'],
      answer: 2,
      reveal: 'About 10 cm. What matters is volume ÷ cooling area, not thickness. The plate’s is 1.43 cm and a riser’s is D/6. With the usual 1.2 margin, D/6 ≥ 1.71 cm, so D ≥ 10.3 cm. A 6 cm riser freezes first and leaves a hole in the plate.',
    },
    parts: [
      {
        title: 'Freezing time and the casting modulus',
        minutes: 20,
        explain: [
          'Molten metal in a mould loses heat through its surface. A thin skin of solid metal forms on the mould walls first, then grows inward until the centre freezes last.',
          'How long that takes depends on how much heat is stored (the volume V) compared with how fast it can leave (the cooling surface area A). Their ratio V/A is called the casting modulus M, measured in cm. A big, compact lump has a large M; a thin plate or fin has a small M.',
          'In 1940 Nicolas Chvorinov found that the freezing time grows with the square of the modulus: t = B·M². B is a mould constant, about 2 min/cm² for steel in a sand mould. Double the modulus and the freezing time is four times longer.',
          'For a cube of side s, V = s³ and A = 6s², so M = s/6. For a cylinder whose height equals its diameter D, M = D/6 too. These two shortcuts save a lot of arithmetic.',
        ],
        formulas: [
          ['Casting modulus', 'M = \\frac{V}{A}'],
          ['Chvorinov’s rule', 't_s = B\\,M^{2}'],
          ['Cube or cylinder with H = D', 'M = \\frac{s}{6}, \\quad M = \\frac{D}{6}'],
        ],
        examples: [
          ex('A steel cube of side 6 cm is cast in sand (B = 2 min/cm²). Find its modulus and freezing time.', [
            ['Volume and cooling area.', 'V = 6^3 = 216\\,\\text{cm}^3, \\quad A = 6 \\times 6^2 = 216\\,\\text{cm}^2'],
            ['Modulus.', 'M = 216/216 = 1\\,\\text{cm}'],
            ['Freezing time.', 't = 2 \\times 1^2 = 2\\,\\text{min}'],
          ], '1 cm; 2 min'),
          ex('A steel plate is 20 × 20 × 4 cm, cooled on all faces. Find its modulus and freezing time (B = 2 min/cm²).', [
            ['Volume.', 'V = 20 \\times 20 \\times 4 = 1600\\,\\text{cm}^3'],
            ['Area: two big faces and four edges.', 'A = 2(400) + 4(80) = 1120\\,\\text{cm}^2'],
            ['Modulus and time.', 'M = 1600/1120 = 1.43\\,\\text{cm}, \\quad t = 2(1.43)^2 = 4.08\\,\\text{min}'],
          ], '1.43 cm; about 4.1 min'),
        ],
        practice: [
          pr('A steel cube of side 9 cm. What is its casting modulus, in cm?', 1.5, 'For a cube, M = side ÷ 6.', 'M = 9/6 = 1.5 cm.'),
          pr('The same 9 cm cube in sand with B = 2 min/cm². Freezing time, in minutes?', 4.5, 'Use t = B·M².', 't = 2 × 1.5² = 4.5 min.'),
          pr('A steel cylinder 12 cm across and 12 cm tall (B = 2 min/cm²). Freezing time, in minutes?', 8, 'With H = D, M = D/6.', 'M = 12/6 = 2 cm, so t = 2 × 2² = 8 min.'),
          pr('Every dimension of a casting is doubled. By what factor does its freezing time grow?', 4, 'V grows 8 times and A 4 times, so M doubles.', 'M doubles, and t ∝ M², so t grows 2² = 4 times.'),
          pr('A bar 2 × 2 × 20 cm cools on all faces. What is its modulus, in cm?', 0.476, 'V = 80 cm³. A = two 2 × 2 ends plus four 2 × 20 sides.', 'A = 8 + 160 = 168 cm², so M = 80/168 ≈ 0.476 cm.'),
        ],
      },
      {
        title: 'Shrinkage and sizing a riser',
        minutes: 25,
        explain: [
          'Metal shrinks three times as it cools: as a liquid, while it freezes, and as a solid. The freezing shrinkage is the dangerous one: steel loses about 3% of its volume when it turns solid. If the last liquid to freeze is trapped inside the part, that 3% becomes a hole.',
          'A riser is a reservoir of liquid metal joined to the casting. It works only if it freezes after the part, so its modulus must be larger. Foundries use a margin: the riser modulus should be at least 1.2 times the casting modulus.',
          'The riser must also hold enough metal. A plain riser can give up only about 14% of its own volume before its own shrinkage hole reaches down into the part. It has to feed the casting’s shrinkage and its own, which sets a minimum riser volume.',
        ],
        formulas: [
          ['Modulus rule', 'M_{\\text{riser}} \\ge 1.2\\,M_{\\text{casting}}'],
          ['Volume rule', '\\beta (V_c + V_r) \\le \\varepsilon V_r \\;\\Rightarrow\\; V_r \\ge \\frac{\\beta V_c}{\\varepsilon - \\beta}'],
        ],
        examples: [
          ex('Size a cylindrical riser (H = D) for the 20 × 20 × 4 cm plate, modulus 1.43 cm.', [
            ['The riser needs 1.2 times the plate’s modulus.', 'M_r \\ge 1.2 \\times 1.43 = 1.71\\,\\text{cm}'],
            ['For H = D, M = D/6.', 'D \\ge 6 \\times 1.71 = 10.3\\,\\text{cm}'],
            ['Check freezing times with B = 2.', 't_r = 2(1.71)^2 = 5.9\\,\\text{min} > 4.1\\,\\text{min}'],
          ], 'D ≈ 10.3 cm'),
          ex('Steel shrinks 3% on freezing (β = 0.03) and a riser can give 14% of its volume (ε = 0.14). What riser volume does the 1,600 cm³ plate need? Is the 10.3 cm riser enough?', [
            ['Use the volume rule.', 'V_r \\ge \\frac{0.03 \\times 1600}{0.14 - 0.03} = 436\\,\\text{cm}^3'],
            ['Volume of the 10.3 cm riser.', 'V = \\tfrac{\\pi}{4}(10.3)^3 = 858\\,\\text{cm}^3'],
            ['858 > 436, so both rules are met.', ''],
          ], '436 cm³; yes'),
        ],
        practice: [
          pr('A casting has a modulus of 2.0 cm. What is the smallest riser modulus allowed by the 1.2 rule, in cm?', 2.4, 'Multiply by 1.2.', '1.2 × 2.0 = 2.4 cm.'),
          pr('That riser is a cylinder with H = D. What diameter does it need, in cm?', 14.4, 'M = D/6, so D = 6M.', 'D = 6 × 2.4 = 14.4 cm.'),
          pr('A cube casting of side 10 cm needs a cylindrical riser (H = D). Smallest diameter by the 1.2 rule, in cm?', 12, 'The cube’s modulus is 10/6 cm.', 'M_r = 1.2 × 10/6 = 2 cm, so D = 6 × 2 = 12 cm.'),
          pr('A hub has modulus 2.0 cm and a rim 0.8 cm. How many times longer does the hub take to freeze?', 6.25, 't ∝ M².', '(2.0/0.8)² = 2.5² = 6.25.'),
          pr('With β = 0.03 and ε = 0.14, what minimum riser volume feeds a 2,000 cm³ casting, in cm³?', 545, 'V_r ≥ βV_c/(ε − β).', '0.03 × 2000/0.11 ≈ 545 cm³.'),
        ],
      },
      {
        title: 'Moulds, patterns and pouring',
        minutes: 20,
        explain: [
          'Sand casting packs sand around a pattern, a model of the part, in two boxes: the cope on top and the drag below. The pattern is lifted out and metal flows in through a channel system called the gating. Lost-wax (investment) casting gives finer detail; die casting forces aluminium or zinc into steel moulds for fast, accurate parts.',
          'The solid part keeps shrinking as it cools to room temperature, so the pattern is made slightly larger. This pattern allowance is about 2% for steel, 1.3% for aluminium and 1% for grey cast iron (graphite forming in the iron offsets some shrinkage).',
          'Liquid metal is heavy. Its pressure ρgh pushes up on the cope over the area of the part, and can lift the cope and let metal run out. The cope must be weighted or clamped against that force. Pouring time is simply volume divided by flow rate.',
        ],
        formulas: [
          ['Pattern size', 'L_{\\text{pattern}} = L_{\\text{part}}(1 + a)'],
          ['Force lifting the cope', 'F = \\rho g h A'],
          ['Pouring time', 't = \\frac{V}{Q}'],
        ],
        examples: [
          ex('A steel bracket must be 500 mm long. The allowance is 2%. How long is the pattern?', [
            ['Add 2% to the part length.', 'L_p = 500 \\times 1.02'],
            ['Evaluate.', 'L_p = 510\\,\\text{mm}'],
          ], '510 mm'),
          ex('Liquid steel (ρ = 7,000 kg/m³) stands 0.15 m above the top of a 0.2 × 0.2 m part. What upward force acts on the cope, and what mass of weights balances it?', [
            ['Pressure at the parting line.', 'p = 7000 \\times 9.8 \\times 0.15 = 10\\,290\\,\\text{Pa}'],
            ['Times the area under the cope.', 'F = 10\\,290 \\times 0.04 = 411.6\\,\\text{N}'],
            ['Mass with that weight.', 'm = F/g = 411.6/9.8 = 42\\,\\text{kg}'],
          ], '412 N; 42 kg'),
        ],
        practice: [
          pr('An aluminium casting must be 300 mm long, allowance 1.3%. Pattern length, in mm?', 303.9, 'Multiply by 1.013.', '300 × 1.013 = 303.9 mm.'),
          pr('A steel pattern is 612 mm long, allowance 2%. How long is the finished part, in mm?', 600, 'Divide by 1.02.', '612/1.02 = 600 mm.'),
          pr('Liquid steel (7,000 kg/m³) stands 0.25 m above a part with 0.06 m² area under the cope. Upward force, in N? (g = 9.8)', 1029, 'F = ρghA.', '7000 × 9.8 × 0.25 × 0.06 = 1,029 N.'),
          pr('The plate (1,600 cm³) and its riser (858 cm³) are filled at 500 cm³/s. Pouring time, in s?', 4.92, 'Add the volumes, then divide by the flow rate.', '2458/500 ≈ 4.92 s.'),
          pr('The plate is 1,600 cm³, riser 858 cm³ and gating 200 cm³. What percentage of the poured metal ends up in the part?', 60.2, 'Part volume ÷ total poured volume.', '1600/2658 ≈ 0.602, so about 60.2%. The rest is remelted.'),
        ],
      },
      {
        title: 'Grain structure and casting defects',
        minutes: 25,
        explain: [
          'A cut through a casting shows three zones. Next to the cold mould wall is a thin chill zone of tiny grains. Then long columnar grains grow inward, towards the heat flow. In the centre, where the liquid is almost still and evenly cool, equiaxed (roughly round) grains form.',
          'Metals freeze as tree-like crystals called dendrites. The spacing of their side branches (the secondary arm spacing λ) shrinks when cooling is fast. Finer spacing means smaller pockets of segregation and better strength and ductility. For one aluminium alloy, λ ≈ 10·t^(1/3) µm, with t the local freezing time in seconds.',
          'Common defects each have a cause. Shrinkage cavities come from poor feeding. Gas porosity comes from gas that dissolves in liquid metal but not in solid: liquid aluminium holds about 0.69 mL of hydrogen per 100 g, solid only 0.036 mL. Misruns and cold shuts come from metal too cold to fill the mould. Hot tears form when a part shrinks against a rigid mould.',
        ],
        formulas: [
          ['Arm spacing (one Al alloy)', '\\lambda \\approx 10\\,t^{1/3}\\;\\mu\\text{m}\\;(t \\text{ in s})'],
          ['Hydrogen released per 100 g Al', '\\Delta V = 0.69 - 0.036\\,\\text{mL}'],
        ],
        examples: [
          ex('A thick aluminium section freezes in 1,000 s and a thin wall in 8 s. Compare their arm spacings.', [
            ['Thick section.', '\\lambda = 10 \\times 1000^{1/3} = 10 \\times 10 = 100\\,\\mu\\text{m}'],
            ['Thin wall.', '\\lambda = 10 \\times 8^{1/3} = 10 \\times 2 = 20\\,\\mu\\text{m}'],
            ['The thin wall has five times finer structure, and is usually stronger.', ''],
          ], '100 µm and 20 µm'),
          ex('How many times more hydrogen does liquid aluminium hold than solid? How much gas could a 1 kg casting release on freezing?', [
            ['Ratio of solubilities.', '0.69/0.036 = 19.2'],
            ['Released per 100 g.', '0.69 - 0.036 = 0.654\\,\\text{mL}'],
            ['1 kg is ten lots of 100 g.', '10 \\times 0.654 = 6.54\\,\\text{mL}'],
          ], 'about 19 times; 6.5 mL'),
        ],
        practice: [
          pr('Using λ ≈ 10·t^(1/3) µm, what arm spacing forms where the metal freezes in 125 s, in µm?', 50, '125 = 5³.', '10 × 5 = 50 µm.'),
          pr('What local freezing time gives λ = 30 µm, in s?', 27, 'Solve 10·t^(1/3) = 30.', 't^(1/3) = 3, so t = 27 s.'),
          pr('Freezing time rises 8 times. By what factor does λ grow?', 2, 'λ ∝ t^(1/3).', '8^(1/3) = 2.'),
          pr('A thin wall has modulus 0.3 cm and a boss 1.2 cm. Using Chvorinov, how many times longer does the boss take to freeze?', 16, 't ∝ M².', '(1.2/0.3)² = 4² = 16.'),
          pr('How much hydrogen (mL) can 500 g of aluminium release on freezing, using 0.69 and 0.036 mL per 100 g?', 3.27, 'Find the release per 100 g first.', '0.654 mL per 100 g × 5 = 3.27 mL.'),
        ],
      },
    ],
  },

  'mate-131': {
    predict: {
      q: 'Annealed copper has a yield strength of 70 MPa. Cold rolling makes it stronger. Roughly what thickness reduction doubles the yield strength to 140 MPa?',
      options: ['About 20%', 'About 50%', 'About 75%', 'About 90%'],
      answer: 0,
      reveal: 'Only about 20%. Copper hardens fastest at the start: the first small amount of cold work multiplies its dislocations hugely. A 50% reduction already takes it to about 260 MPa, nearly four times the annealed value.',
    },
    parts: [
      {
        title: 'Reduction and true strain',
        minutes: 20,
        explain: [
          'Forming shapes solid metal by pushing it, not by cutting or melting. Rolling squeezes it between turning rolls into plate, sheet or rail. Forging hammers or presses it. Extrusion pushes it through a shaped hole (a die). Wire drawing pulls it through a die.',
          'How much the metal was worked is measured in two ways. The reduction r is the fraction of thickness (or area) removed. The true strain ε = ln(h₀/h) adds up neatly over several passes: rolling 10 → 8 mm then 8 → 6 mm gives the same total true strain as 10 → 6 mm in one go.',
          'Metal does not change volume when it is formed. If a strip keeps its width, halving its thickness doubles its length. For wire, the area goes down with the square of the diameter, so the true strain is ε = ln(A₀/A) = 2 ln(d₀/d).',
        ],
        formulas: [
          ['Reduction', 'r = \\frac{h_0 - h}{h_0}'],
          ['True strain', '\\varepsilon = \\ln\\frac{h_0}{h} \\quad (\\text{wire: } 2\\ln\\tfrac{d_0}{d})'],
          ['Constant volume', 'h_0 L_0 = h L \\;(\\text{same width})'],
        ],
        examples: [
          ex('A copper strip is rolled from 10 mm to 5 mm. Find the reduction and the true strain.', [
            ['Reduction.', 'r = (10 - 5)/10 = 0.5 = 50\\%'],
            ['True strain.', '\\varepsilon = \\ln(10/5) = \\ln 2 = 0.693'],
          ], '50%; 0.693'),
          ex('Copper wire is drawn from 5 mm to 1 mm in diameter. Find the area reduction and true strain.', [
            ['The area falls with d².', 'A/A_0 = (1/5)^2 = 0.04'],
            ['Area reduction.', 'r = 1 - 0.04 = 0.96 = 96\\%'],
            ['True strain.', '\\varepsilon = 2\\ln(5/1) = 3.22'],
          ], '96%; 3.22'),
        ],
        practice: [
          pr('A 20 mm plate is rolled to 15 mm. What is the reduction, in %?', 25, 'r = (h₀ − h)/h₀.', '5/20 = 0.25 = 25%.'),
          pr('Same plate, 20 → 15 mm. What is the true strain?', 0.288, 'ε = ln(h₀/h).', 'ln(20/15) = ln 1.333 ≈ 0.288.'),
          pr('A strip 2 m long is rolled from 8 mm to 2 mm thick with no change in width. How long is it now, in m?', 8, 'Volume stays the same.', 'L = 2 × 8/2 = 8 m.'),
          pr('A strip goes 10 → 8 mm, then 8 → 6 mm. What is the total true strain?', 0.511, 'Add ln(10/8) and ln(8/6), or take ln(10/6).', 'ln(10/6) ≈ 0.511.'),
          pr('Wire is drawn from 4 mm to 3 mm diameter. What is the area reduction, in %?', 43.75, 'A/A₀ = (3/4)².', '1 − 9/16 = 0.4375, so 43.75%.'),
        ],
      },
      {
        title: 'Strain hardening',
        minutes: 25,
        explain: [
          'Metals deform by the sliding of dislocations, line faults in the crystal. Cold working creates many more of them, and they tangle and block each other. Each new step of sliding needs a higher stress, so the metal gets stronger. The price is ductility: there is less stretch left before it cracks.',
          'A simple law describes the hardening: the flow stress σ = K·εⁿ. K is the strength coefficient and n the strain-hardening exponent. For annealed copper K ≈ 320 MPa and n ≈ 0.54; for annealed 1020 steel K ≈ 530 MPa and n ≈ 0.26. A large n means the metal hardens a lot and can be stretched evenly a long way.',
          'In a tensile test, necking starts when the true strain equals n. So copper (n ≈ 0.54) can stretch evenly much further than 1020 steel (n ≈ 0.26) before a neck forms.',
        ],
        formulas: [
          ['Flow stress', '\\sigma = K\\,\\varepsilon^{\\,n}'],
          ['Strain for a target stress', '\\varepsilon = \\left(\\frac{\\sigma}{K}\\right)^{1/n}'],
          ['Necking starts at', '\\varepsilon_u = n'],
        ],
        examples: [
          ex('Annealed copper (K = 320 MPa, n = 0.54) is cold rolled 50%. Estimate its new yield strength.', [
            ['True strain for 50%.', '\\varepsilon = \\ln 2 = 0.693'],
            ['Use the hardening law.', '\\sigma = 320 \\times 0.693^{0.54}'],
            ['Evaluate.', '\\sigma \\approx 263\\,\\text{MPa}'],
          ], 'about 263 MPa'),
          ex('What cold-rolling reduction raises copper to 140 MPa?', [
            ['Solve for the strain.', '\\varepsilon = (140/320)^{1/0.54} = 0.216'],
            ['Turn strain into thickness ratio.', 'h/h_0 = e^{-0.216} = 0.805'],
            ['Reduction.', 'r = 1 - 0.805 = 0.195 \\approx 19.5\\%'],
          ], 'about 19.5%'),
        ],
        practice: [
          pr('Copper (K = 320 MPa, n = 0.54) at a true strain of 0.2. Flow stress, in MPa?', 134, 'σ = K·εⁿ.', '320 × 0.2^0.54 ≈ 134 MPa.'),
          pr('Annealed 1020 steel (K = 530 MPa, n = 0.26) at a true strain of 0.3. Flow stress, in MPa?', 388, 'σ = K·εⁿ.', '530 × 0.3^0.26 ≈ 388 MPa.'),
          pr('What thickness reduction (in %) gives a true strain of 0.5?', 39.3, 'h/h₀ = e^(−0.5).', '1 − e^(−0.5) = 1 − 0.607 = 0.393, so 39.3%.'),
          pr('Copper is cold rolled 75%. Using K = 320 MPa and n = 0.54, what is its flow stress, in MPa?', 382, 'ε = ln(1/0.25) = ln 4.', 'ε = 1.386, so σ = 320 × 1.386^0.54 ≈ 382 MPa.'),
          pr('70/30 brass has n ≈ 0.49. At what true strain does necking start in a tensile test?', 0.49, 'Necking starts when ε = n.', 'ε_u = n = 0.49.'),
        ],
      },
      {
        title: 'Hot working and recrystallisation',
        minutes: 20,
        explain: [
          'If cold-worked metal is heated enough, new grains free of tangled dislocations grow and replace the old ones. This is recrystallisation. The metal becomes soft and ductile again; annealing between forming steps uses exactly this.',
          'The temperature needed is roughly 0.4 to 0.5 of the melting point, measured in kelvin. The ratio T/T_m (both in K) is called the homologous temperature. Copper melts at 1,358 K, so it recrystallises above about 540–680 K (270–400 °C).',
          'Hot working means forming above the recrystallisation temperature: the grains re-form as fast as they are squashed, so huge reductions are possible with no hardening. Steel slabs are hot rolled near 1,100 °C. Lead melts at only 601 K, so room temperature is already about 0.49 of its melting point: lead never stays work-hardened at room temperature.',
        ],
        formulas: [
          ['Recrystallisation', 'T_{\\text{rx}} \\approx 0.4\\text{–}0.5\\,T_m \\;(\\text{K})'],
          ['Homologous temperature', 'T_H = \\frac{T}{T_m} \\;(\\text{both in K})'],
        ],
        examples: [
          ex('Estimate the lower recrystallisation temperature of copper (T_m = 1,358 K), in °C.', [
            ['Take 0.4 of the melting point.', '0.4 \\times 1358 = 543\\,\\text{K}'],
            ['Convert to °C.', '543 - 273 = 270\\,°\\text{C}'],
          ], 'about 270 °C'),
          ex('Lead melts at 601 K. What is its homologous temperature at room temperature (293 K)? Is lead hot worked at room temperature?', [
            ['Ratio of temperatures in kelvin.', 'T_H = 293/601 = 0.49'],
            ['0.49 is above 0.4.', '\\text{it recrystallises: forming lead at room temperature is hot working}'],
          ], '0.49; yes'),
        ],
        practice: [
          pr('Aluminium melts at 933 K. Taking T_rx = 0.4 T_m, what is its recrystallisation temperature, in °C?', 100, 'Find 0.4 × 933 in K, then subtract 273.', '373 K − 273 = 100 °C.'),
          pr('Tungsten melts at 3,695 K. Taking T_rx = 0.4 T_m, what is its recrystallisation temperature, in °C?', 1205, '0.4 × 3695, then convert.', '1,478 K − 273 = 1,205 °C. Tungsten is still “cold worked” when red hot.'),
          pr('Zinc melts at 693 K. What is its homologous temperature at 293 K?', 0.423, 'Divide the two kelvin temperatures.', '293/693 ≈ 0.423.'),
          pr('Steel is hot rolled at 1,100 °C. Iron melts at 1,811 K. Homologous temperature?', 0.758, 'Convert 1,100 °C to kelvin first.', '1,373/1,811 ≈ 0.758.'),
        ],
      },
      {
        title: 'Planning passes: drawing, rolling force and anneals',
        minutes: 25,
        explain: [
          'A die can only pull so much through at once. In wire drawing, if the reduction in one pass is too large, the force needed to pull the wire exceeds the strength of the wire already drawn, and it snaps. Practical passes take about 20–45% of the area each.',
          'Rolls grip the metal by friction. The largest thickness drop one pass can take is about Δh_max = μ²R, where μ is the friction coefficient and R the roll radius. Big rolls and rough (hot) surfaces allow bigger drafts.',
          'The roll touches the strip over a contact length L ≈ √(RΔh). A rough estimate of the rolling force is the average flow stress times the strip width times L. Mills are sized with this force.',
          'Cold work uses up ductility, so long reductions are split into stages with an anneal between them. A copper wire mill might allow 75% area reduction (true strain 1.39) between anneals.',
        ],
        formulas: [
          ['Area left after n passes', '\\frac{A_n}{A_0} = (1 - r)^n'],
          ['Contact length and force', 'L = \\sqrt{R\\,\\Delta h}, \\quad F \\approx \\bar{\\sigma}\\,w\\,L'],
          ['Largest draft', '\\Delta h_{\\max} = \\mu^2 R'],
        ],
        examples: [
          ex('Wire must go from 5 mm to 1 mm (area ratio 0.04). Each pass removes 30% of the area. How many passes?', [
            ['After n passes the area ratio is 0.7ⁿ.', '0.7^n \\le 0.04'],
            ['Solve with logarithms.', 'n \\ge \\ln 0.04 / \\ln 0.7 = 9.02'],
            ['Passes come in whole numbers: 9 passes leave 0.0404, just too much.', 'n = 10'],
          ], '10 passes'),
          ex('A strip 300 mm wide is rolled with Δh = 5 mm by rolls of radius 250 mm. Average flow stress 200 MPa. Estimate the roll force.', [
            ['Contact length.', 'L = \\sqrt{250 \\times 5} = 35.4\\,\\text{mm}'],
            ['Force = stress × width × length (MPa × mm² = N).', 'F = 200 \\times 300 \\times 35.4 = 2.12 \\times 10^6\\,\\text{N}'],
          ], 'about 2.1 MN'),
        ],
        practice: [
          pr('Rolls of radius 250 mm with friction μ = 0.1. Largest draft in one pass, in mm?', 2.5, 'Δh_max = μ²R.', '0.01 × 250 = 2.5 mm.'),
          pr('Hot rolls of radius 300 mm with μ = 0.2. Largest draft, in mm?', 12, 'Δh_max = μ²R.', '0.04 × 300 = 12 mm.'),
          pr('Rolls of radius 300 mm take a 4 mm draft. Contact length, in mm?', 34.6, 'L = √(RΔh).', '√1200 ≈ 34.6 mm.'),
          pr('A strip 1,000 mm wide, contact length 34.6 mm, average flow stress 150 MPa. Roll force, in MN?', 5.2, 'F = σ̄wL in N, then divide by 10⁶.', '150 × 1000 × 34.6 ≈ 5.2 × 10⁶ N = 5.2 MN.'),
          pr('Wire needs a total true strain of 3.22, and the mill allows 1.39 between anneals. How many drawing stages are needed (a whole number)?', 3, 'Divide and round up.', '3.22/1.39 = 2.3, so 3 stages, with 2 anneals between them.'),
        ],
      },
    ],
  },

  'mate-132': {
    predict: {
      q: 'A pressed iron-powder part (60% dense) sintered at 1,250 °C for an hour comes out about 98% dense. Run a second part at 1,000 °C, only 250 °C cooler, for the same hour. How dense does it get?',
      options: ['About 95%', 'About 90%', 'About 85%', 'About 70%'],
      answer: 3,
      reveal: 'Only about 70%. Sintering runs on atoms hopping by diffusion, and that rate follows an Arrhenius law: here 250 °C less makes it about ten times slower. The cooler part has barely started closing its pores.',
    },
    parts: [
      {
        title: 'Powders, pressing and green density',
        minutes: 20,
        explain: [
          'Powder metallurgy starts with fine metal powder, often made by spraying molten metal into a jet of water or gas. The powder is poured into a steel die and pressed into shape. The pressed part, weak like a biscuit, is called a green compact.',
          'Its quality is described by relative density: its density divided by the density of solid metal. Solid iron is 7.87 g/cm³. A compact pressed at 400–800 MPa reaches about 60–90% relative density; the rest is pores. Porosity is 1 minus the relative density.',
          'Pressing needs a big press. The force is the compaction pressure times the area of the part’s face seen from the punch. A gear face of 15 cm² pressed at 600 MPa needs 900 kN, the weight of about 92 tonnes.',
        ],
        formulas: [
          ['Relative density', '\\rho_r = \\frac{\\rho}{\\rho_{\\text{solid}}}, \\quad \\text{porosity} = 1 - \\rho_r'],
          ['Press force', 'F = p\\,A'],
        ],
        examples: [
          ex('A green iron compact has mass 50 g and volume 9.5 cm³. Find its relative density.', [
            ['Density.', '\\rho = 50/9.5 = 5.26\\,\\text{g/cm}^3'],
            ['Divide by solid iron.', '\\rho_r = 5.26/7.87 = 0.669'],
          ], 'about 66.9%'),
          ex('A gear with a 15 cm² face is pressed at 600 MPa. What press force is needed?', [
            ['Convert the area to m².', 'A = 15 \\times 10^{-4} = 1.5 \\times 10^{-3}\\,\\text{m}^2'],
            ['Force.', 'F = 600 \\times 10^6 \\times 1.5 \\times 10^{-3} = 900\\,000\\,\\text{N}'],
          ], '900 kN'),
        ],
        practice: [
          pr('An iron part has density 6.8 g/cm³ (solid iron 7.87). What is its porosity, in %?', 13.6, 'Porosity = 1 − ρ/ρ_solid.', '1 − 6.8/7.87 = 0.136, about 13.6%.'),
          pr('A bushing with an 8 cm² face is pressed at 500 MPa. Press force, in kN?', 400, '1 cm² = 10⁻⁴ m².', '500 × 10⁶ × 8 × 10⁻⁴ = 400,000 N = 400 kN.'),
          pr('A sintered part is 12 cm³ with density 6.8 g/cm³. Its mass, in g?', 81.6, 'Mass = density × volume.', '6.8 × 12 = 81.6 g.'),
          pr('A press can give 1,000 kN. What largest face area can it press at 625 MPa, in cm²?', 16, 'A = F/p, then convert m² to cm².', '10⁶/(625 × 10⁶) = 0.0016 m² = 16 cm².'),
        ],
      },
      {
        title: 'Why sintering happens: surface energy',
        minutes: 25,
        explain: [
          'Atoms at a surface have fewer neighbours than atoms inside, so every square metre of surface stores energy, the surface energy γ (about 2 J/m² for iron). Fine powder has an enormous surface. Joining particles together removes surface and releases that energy. This is what drives sintering.',
          'For spheres of diameter D the surface per kilogram is 6/(ρD). Iron powder of 10 µm has about 76 m² per kilogram. The stored energy is small (about 150 J/kg), so atoms need high temperature to move by diffusion and use it.',
          'Sintering begins with necks: small bridges where particles touch. Kuczynski found that the neck radius x grows very slowly, roughly as (x/r)⁵ ∝ t. Doubling the neck size takes 2⁵ = 32 times longer.',
          'Smaller particles sinter much faster. For diffusion through the particles, the time to reach the same stage scales with the cube of the particle size. Halve the powder size and the time drops to an eighth.',
        ],
        formulas: [
          ['Surface per kg (spheres)', 'S = \\frac{6}{\\rho D}'],
          ['Energy released', 'E = \\gamma\\,\\Delta A'],
          ['Neck growth; size effect', '\\left(\\tfrac{x}{r}\\right)^5 \\propto t, \\qquad t \\propto D^3'],
        ],
        examples: [
          ex('Iron powder (ρ = 7,870 kg/m³) has 10 µm particles. Find its surface per kg and the energy stored there, with γ = 2 J/m².', [
            ['Surface per kg.', 'S = \\frac{6}{7870 \\times 10 \\times 10^{-6}} = 76.2\\,\\text{m}^2/\\text{kg}'],
            ['Energy.', 'E = 2 \\times 76.2 = 152\\,\\text{J/kg}'],
          ], '76 m²/kg; 152 J/kg'),
          ex('A neck reaches x/r = 0.1 after 10 min. How long until x/r = 0.2?', [
            ['Time grows with (x/r)⁵.', 't_2/t_1 = (0.2/0.1)^5 = 32'],
            ['Multiply.', 't_2 = 32 \\times 10 = 320\\,\\text{min}'],
          ], '320 min'),
        ],
        practice: [
          pr('Iron powder of 1 µm (ρ = 7,870 kg/m³). Surface per kg, in m²/kg?', 762, 'S = 6/(ρD) with D in metres.', '6/(7870 × 10⁻⁶) ≈ 762 m²/kg.'),
          pr('With γ = 2 J/m², how much surface energy (J) is stored in 1 kg of that 1 µm powder?', 1525, 'E = γS.', '2 × 762.4 ≈ 1,525 J.'),
          pr('Using t ∝ D³, how many times faster does 10 µm powder reach a stage than 50 µm powder?', 125, 'Ratio of sizes, cubed.', '(50/10)³ = 125 times faster.'),
          pr('Using (x/r)⁵ ∝ t, a neck takes 20 min to reach x/r = 0.15. How long to reach 0.30, in min?', 640, 'Doubling x/r multiplies time by 2⁵.', '32 × 20 = 640 min.'),
        ],
      },
      {
        title: 'Densification, temperature and shrinkage',
        minutes: 25,
        explain: [
          'As sintering goes on, the pores shrink and close, and the part gets denser. A simple model says the pore fraction falls exponentially with time: ρ = 1 − (1 − ρ₀)e^(−kt), where ρ₀ is the green relative density.',
          'The rate constant k follows the Arrhenius law you met in kinetics, k = k₀e^(−Q/RT). For the iron in this class’s animation, Q ≈ 148 kJ/mol, which makes k about ten times larger at 1,250 °C than at 1,000 °C. Temperature matters far more than time.',
          'Mass stays the same while volume falls, so the part shrinks. Each length shrinks by ΔL/L₀ = 1 − (ρ₀/ρ)^(1/3). Going from 60% to 95% dense shrinks every dimension by about 14%, so dies are made oversize to land on the final size.',
        ],
        formulas: [
          ['Densification', '\\rho(t) = 1 - (1 - \\rho_0)\\,e^{-kt}'],
          ['Rate constant', 'k = k_0\\,e^{-Q/RT}'],
          ['Linear shrinkage', '\\frac{\\Delta L}{L_0} = 1 - \\left(\\frac{\\rho_0}{\\rho}\\right)^{1/3}'],
        ],
        examples: [
          ex('At 1,250 °C, k = 0.050 per minute. A 60% dense compact is held 60 min. Final density?', [
            ['Exponent.', 'kt = 0.050 \\times 60 = 3.0'],
            ['Pore fraction left.', '0.4\\,e^{-3.0} = 0.4 \\times 0.0498 = 0.0199'],
            ['Density.', '\\rho = 1 - 0.0199 = 0.980'],
          ], 'about 98%'),
          ex('Same furnace (k = 0.050 per min). How long to reach 95% density from 60%?', [
            ['Set the pore fraction left to 0.05.', '0.4\\,e^{-kt} = 0.05'],
            ['Solve.', 'kt = \\ln(0.4/0.05) = \\ln 8 = 2.08'],
            ['Time.', 't = 2.08/0.050 = 41.6\\,\\text{min}'],
          ], 'about 42 min'),
        ],
        practice: [
          pr('At 1,000 °C, k = 0.0050 per min. A 60% compact is held 60 min. Final density, in %?', 70.4, 'Pore fraction left = 0.4e^(−kt).', '0.4e^(−0.3) = 0.296, so ρ ≈ 70.4%.'),
          pr('A compact goes from 60% to 90% density. Linear shrinkage, in %?', 12.6, '1 − (0.6/0.9)^(1/3).', '(0.667)^(1/3) = 0.874, so 12.6%.'),
          pr('With k = 0.050 per min, how long to go from 60% to 90% density, in min?', 27.7, 'Solve 0.4e^(−kt) = 0.1.', 'kt = ln 4 = 1.386, t = 27.7 min.'),
          pr('A cube must be 20 mm after sintering from 60% to 95% density. How big must the green cube be, in mm?', 23.3, 'Lengths scale as (ρ/ρ₀)^(1/3).', '20 × (0.95/0.6)^(1/3) ≈ 23.3 mm.'),
          pr('With Q = 148.5 kJ/mol and R = 8.314 J/(mol·K), by what factor is k larger at 1,523 K than at 1,273 K?', 10.0, 'Ratio = exp[(Q/R)(1/1273 − 1/1523)].', 'Q/R = 17,861 K; the bracket is 1.29 × 10⁻⁴; e^2.30 ≈ 10.'),
        ],
      },
      {
        title: 'Liquid-phase sintering and powder products',
        minutes: 20,
        explain: [
          'Some parts are mixtures that could never be cast. Cemented carbide cutting tools are hard tungsten carbide (WC) grains in a few percent of cobalt. At about 1,400 °C the cobalt melts and wets the solid carbide grains, pulling them together: liquid-phase sintering. WC itself, melting near 2,870 °C, never melts.',
          'The density of such a mix follows from the volumes of its parts. With mass fractions w and densities ρ, 1/ρ = w₁/ρ₁ + w₂/ρ₂. WC is 15.6 g/cm³ and cobalt 8.9 g/cm³.',
          'Porosity can be a feature. Self-lubricating bronze bearings are left about 20–25% porous and soaked in oil; heat from running draws the oil out. Powder parts also waste very little metal (about 97% of the powder ends up in the part), while machining a gear from bar can turn more than half the bar into chips.',
        ],
        formulas: [
          ['Mixture density', '\\frac{1}{\\rho} = \\frac{w_1}{\\rho_1} + \\frac{w_2}{\\rho_2}'],
          ['Oil held', 'V_{\\text{oil}} = \\text{porosity} \\times V'],
          ['Material use', '\\text{utilisation} = \\frac{m_{\\text{part}}}{m_{\\text{start}}}'],
        ],
        examples: [
          ex('Find the density of WC–10% Co by mass (WC 15.6, Co 8.9 g/cm³).', [
            ['Volume of 1 g.', '\\frac{0.9}{15.6} + \\frac{0.1}{8.9} = 0.0577 + 0.0112 = 0.0689\\,\\text{cm}^3'],
            ['Density is 1 g over that volume.', '\\rho = 1/0.0689 = 14.5\\,\\text{g/cm}^3'],
          ], '14.5 g/cm³'),
          ex('A gear of 200 g is machined from a 500 g bar, or made from powder with 97% utilisation. How much starting metal does each route need?', [
            ['Machining utilisation.', '200/500 = 40\\%'],
            ['Powder route.', 'm = 200/0.97 = 206\\,\\text{g}'],
          ], '500 g against 206 g'),
        ],
        practice: [
          pr('Density of WC–6% Co by mass (WC 15.6, Co 8.9 g/cm³), in g/cm³?', 14.93, 'Add 0.94/15.6 and 0.06/8.9, then take 1 over the sum.', '0.0603 + 0.0067 = 0.0670 cm³/g, so ρ ≈ 14.93 g/cm³.'),
          pr('A bronze bearing of volume 2 cm³ is 22% porous. How much oil can it hold, in cm³?', 0.44, 'Oil volume = porosity × volume.', '0.22 × 2 = 0.44 cm³.'),
          pr('How many kg of powder are needed for 1,000 gears of 200 g each at 97% utilisation?', 206.2, 'Each gear needs 200/0.97 g.', '206.2 g × 1000 = 206.2 kg.'),
          pr('WC–Co is sintered at 1,400 °C. WC melts at 2,870 °C. What is the homologous temperature of the WC (use kelvin)?', 0.532, 'Add 273 to both before dividing.', '1,673/3,143 ≈ 0.532: hot enough for diffusion, far from melting.'),
        ],
      },
    ],
  },

  'mate-133': {
    predict: {
      q: 'In a Charpy test at 20 °C, a bar of 1940s ship steel absorbs about 93 J and breaks bent and torn. The same steel is tested at −20 °C, a cold winter sea. What will the pendulum read now?',
      options: ['About 80 J', 'Under 10 J', 'About 50 J', 'About 93 J'],
      answer: 1,
      reveal: 'About 6 J, less than a tenth. Its transition sits near +5 °C, so 40 degrees of cooling drops it from the tough upper shelf to the brittle lower shelf. The broken face turns flat and shiny, just like the wartime ships.',
    },
    parts: [
      {
        title: 'The Charpy test: energy from heights',
        minutes: 20,
        explain: [
          'The Charpy test strikes a small notched bar (10 × 10 mm, 55 mm long, with a 2 mm deep V-notch) with a heavy swinging pendulum. The bar breaks and the pendulum swings on, but not as high as it started. The height it lost is the energy the bar soaked up.',
          'The energy is mass × g × height lost: E = mg(h₀ − h₁). Machines read the angles of the arm instead of heights. If the arm is L long and makes an angle θ with the straight-down position, its head is h = L(1 − cos θ) above the lowest point.',
          'The result is often divided by the area behind the notch (8 × 10 mm = 0.8 cm²) to give J/cm², but most standards simply quote joules for the standard bar.',
        ],
        formulas: [
          ['Energy absorbed', 'E = m g (h_0 - h_1)'],
          ['Height from arm angle', 'h = L(1 - \\cos\\theta)'],
        ],
        examples: [
          ex('A 20 kg pendulum is released from 1.5 m and rises to 1.0 m after breaking a bar. Energy absorbed? (g = 9.8)', [
            ['Height lost.', 'h_0 - h_1 = 0.5\\,\\text{m}'],
            ['Energy.', 'E = 20 \\times 9.8 \\times 0.5 = 98\\,\\text{J}'],
          ], '98 J'),
          ex('A 20 kg pendulum with a 0.8 m arm is released at 140° from straight down and swings up to 60° after the break. Energy absorbed?', [
            ['Start height.', 'h_0 = 0.8(1 - \\cos 140°) = 0.8(1.766) = 1.413\\,\\text{m}'],
            ['End height.', 'h_1 = 0.8(1 - \\cos 60°) = 0.4\\,\\text{m}'],
            ['Energy.', 'E = 20 \\times 9.8 \\times 1.013 = 198.5\\,\\text{J}'],
          ], 'about 199 J'),
        ],
        practice: [
          pr('A 25 kg pendulum falls from 1.2 m and rises to 0.8 m. Energy absorbed, in J? (g = 9.8)', 98, 'E = mg(h₀ − h₁).', '25 × 9.8 × 0.4 = 98 J.'),
          pr('A 30 kg pendulum falls from 1.2 m and rises to 0.5 m. Energy absorbed, in J?', 205.8, 'Height lost is 0.7 m.', '30 × 9.8 × 0.7 = 205.8 J.'),
          pr('A 22 kg pendulum with a 0.75 m arm is released at 150° from straight down. How much energy does it carry at the bottom, in J?', 301.7, 'h = L(1 − cos θ), and cos 150° = −0.866.', 'h = 0.75 × 1.866 = 1.400 m; E = 22 × 9.8 × 1.400 ≈ 301.7 J.'),
          pr('A standard bar (0.8 cm² behind the notch) absorbs 150 J. What is that in J/cm²?', 187.5, 'Divide by the area.', '150/0.8 = 187.5 J/cm².'),
        ],
      },
      {
        title: 'The S-shaped transition curve',
        minutes: 25,
        explain: [
          'Test the same steel at many temperatures and plot energy against temperature. The points make an S shape. On the high upper shelf the bar tears in a ductile way. On the low lower shelf it snaps in a brittle way. In between lies the transition region.',
          'A smooth S-curve can be written with the function tanh, which rises smoothly from −1 to +1 and equals 0 at 0. Your calculator has it. In E(T) the middle of the S is at T₀, where the energy is halfway between the shelves, and c sets how wide the transition is.',
          'Specifications use a fixed energy instead of T₀: for example, the temperature where the steel still absorbs 27 J. For the 1940s ship steel in the animation (lower shelf 5 J, upper 100 J, T₀ = +5 °C, c = 12 °C), that is just below 0 °C. For a modern fine-grained steel (10 J, 200 J, T₀ = −45 °C, c = 15 °C) it is about −62 °C.',
        ],
        formulas: [
          ['Transition curve', 'E(T) = E_{\\text{low}} + \\tfrac12 (E_{\\text{up}} - E_{\\text{low}})\\Big[1 + \\tanh\\frac{T - T_0}{c}\\Big]'],
          ['Middle of the S', 'E(T_0) = \\tfrac12 (E_{\\text{up}} + E_{\\text{low}})'],
        ],
        examples: [
          ex('Ship steel: E_low = 5 J, E_up = 100 J, T₀ = 5 °C, c = 12 °C. Find E at −20 °C. (tanh(−2.083) = −0.969)', [
            ['The bracket.', '(T - T_0)/c = (-20 - 5)/12 = -2.083'],
            ['Use the given tanh.', '1 + \\tanh(-2.083) = 1 - 0.969 = 0.031'],
            ['Energy.', 'E = 5 + 47.5 \\times 0.031 = 6.5\\,\\text{J}'],
          ], 'about 6.5 J'),
          ex('Same steel. At what temperature does it absorb only 20 J? (The number whose tanh is −0.684 is −0.837.)', [
            ['Set E = 20 and solve for the tanh.', '20 = 5 + 47.5(1 + \\tanh x) \\Rightarrow \\tanh x = -0.684'],
            ['So x = −0.837.', 'x = (T - 5)/12 = -0.837'],
            ['Temperature.', 'T = 5 - 12 \\times 0.837 = -5.0\\,°\\text{C}'],
          ], 'about −5 °C'),
        ],
        practice: [
          pr('Ship steel: lower shelf 5 J, upper shelf 100 J. What energy does it absorb at T₀, in J?', 52.5, 'Halfway between the shelves.', '(5 + 100)/2 = 52.5 J.'),
          pr('Ship steel (5 J, 100 J, T₀ = 5 °C, c = 12 °C) at 0 °C. Energy, in J? (tanh(−0.417) = −0.394)', 33.8, 'E = 5 + 47.5(1 + tanh).', '5 + 47.5 × 0.606 ≈ 33.8 J.'),
          pr('Modern steel (10 J, 200 J, T₀ = −45 °C, c = 15 °C) at −30 °C. Energy, in J? (tanh(1) = 0.762)', 177.4, 'The half-gap is 95 J.', '10 + 95 × 1.762 ≈ 177.4 J.'),
          pr('Modern steel at its own T₀ of −45 °C. Energy, in J?', 105, 'Halfway between 10 and 200.', '(10 + 200)/2 = 105 J.'),
        ],
      },
      {
        title: 'Why some metals turn brittle, and reading the bar',
        minutes: 20,
        explain: [
          'In body-centred cubic (BCC) metals such as ferritic steel, the stress needed to move dislocations rises steeply as temperature falls. When it gets cold enough, it becomes easier for the crystal to split along a plane (cleavage) than to deform. Face-centred cubic (FCC) metals (aluminium, copper, nickel, austenitic stainless steel) have no such steep rise, so they stay tough in the cold.',
          'The transition temperature moves with composition and structure. Finer grains and nickel lower it; more carbon, phosphorus and coarse grains raise it. Arctic and LNG steels use fine grains and nickel for this reason.',
          'The broken bar is read as well as the energy. The fraction of the fracture face that is dull and fibrous is the percent shear (ductile). Some codes also require a lateral expansion of at least 0.38 mm: the bar must bulge sideways that much at the compression side, proof that it deformed before breaking.',
        ],
        formulas: [
          ['Percent shear', '\\%\\,\\text{shear} = \\left(1 - \\frac{A_{\\text{shiny}}}{A_{\\text{face}}}\\right) \\times 100'],
          ['Lateral expansion', '\\Delta w = w_{\\text{after}} - w_{\\text{before}}'],
        ],
        examples: [
          ex('A broken bar’s 80 mm² face has 20 mm² of flat, shiny area. What is the percent shear?', [
            ['Shiny fraction.', '20/80 = 0.25'],
            ['Dull fraction.', '(1 - 0.25) \\times 100 = 75\\%'],
          ], '75% shear'),
          ex('A 10.00 mm wide bar measures 10.52 mm at its widest after breaking. Does it pass a 0.38 mm lateral expansion rule?', [
            ['Bulge.', '\\Delta w = 10.52 - 10.00 = 0.52\\,\\text{mm}'],
            ['Compare.', '0.52 > 0.38 \\Rightarrow \\text{passes}'],
          ], 'yes, 0.52 mm'),
        ],
        practice: [
          pr('An 80 mm² fracture face has 56 mm² shiny. Percent shear?', 30, '1 − shiny fraction.', '1 − 56/80 = 0.30, so 30% shear: mostly brittle.'),
          pr('Of aluminium, copper, mild steel, nickel and tungsten, how many are BCC and so show a ductile-to-brittle transition?', 2, 'Aluminium, copper and nickel are FCC.', 'Mild steel and tungsten are BCC: 2.'),
          pr('A 10.00 mm bar measures 10.21 mm after breaking. By how many mm does it fall short of a 0.38 mm rule?', 0.17, 'Find the bulge first.', '0.21 mm bulge; 0.38 − 0.21 = 0.17 mm short.'),
          pr('A freezer rack runs at −30 °C. Steel A has T₀ = +10 °C. How many degrees below its transition middle does it work?', 40, 'Subtract the temperatures.', '10 − (−30) = 40 °C below: deep on the brittle side.'),
        ],
      },
      {
        title: 'Toughness and the critical crack size',
        minutes: 25,
        explain: [
          'Charpy energy ranks steels, but design needs a number tied to cracks. Fracture mechanics uses the stress intensity K = Yσ√(πa): σ is the stress, a the crack depth (in metres) and Y a shape factor (1 for a crack in a wide plate, about 1.12 for an edge crack). K is in MPa√m.',
          'A crack runs when K reaches the material’s fracture toughness K_IC. Solve for the crack depth that just breaks the part: a_c = (1/π)(K_IC/(Yσ))². A structural steel might have K_IC ≈ 40 MPa√m on the lower shelf and 150 MPa√m on the upper shelf.',
          'That is why the transition matters so much in forensic work. At 200 MPa a crack of about 13 mm breaks the cold steel, while the warm steel tolerates a crack of about 180 mm. A crack an inspector could easily miss in winter is harmless in summer.',
        ],
        formulas: [
          ['Stress intensity', 'K = Y\\sigma\\sqrt{\\pi a}'],
          ['Critical crack depth', 'a_c = \\frac{1}{\\pi}\\left(\\frac{K_{IC}}{Y\\sigma}\\right)^2'],
          ['Fracture stress', '\\sigma_f = \\frac{K_{IC}}{Y\\sqrt{\\pi a}}'],
        ],
        examples: [
          ex('A steel plate carries 200 MPa (Y = 1). Find the critical crack depth on the lower shelf (K_IC = 40 MPa√m).', [
            ['Ratio inside the bracket.', 'K_{IC}/(Y\\sigma) = 40/200 = 0.2\\,\\sqrt{\\text{m}}'],
            ['Square and divide by π.', 'a_c = 0.04/\\pi = 0.0127\\,\\text{m}'],
          ], 'about 12.7 mm'),
          ex('Same plate on the upper shelf (K_IC = 150 MPa√m).', [
            ['Ratio.', '150/200 = 0.75'],
            ['Critical depth.', 'a_c = 0.5625/\\pi = 0.179\\,\\text{m}'],
          ], 'about 179 mm'),
        ],
        practice: [
          pr('An edge crack (Y = 1.12) in a part at 250 MPa, K_IC = 40 MPa√m. Critical depth, in mm?', 6.5, 'a_c = (1/π)(K/(Yσ))², then convert m to mm.', '(40/280)² = 0.0204; ÷ π = 0.0065 m = 6.5 mm.'),
          pr('A plate (Y = 1) has a 10 mm crack and K_IC = 40 MPa√m. At what stress does it break, in MPa?', 225.7, 'σ_f = K/(Y√(πa)) with a = 0.01 m.', '√(π × 0.01) = 0.1772; 40/0.1772 ≈ 225.7 MPa.'),
          pr('K_IC = 60 MPa√m, σ = 300 MPa, Y = 1. Critical depth, in mm?', 12.7, 'The ratio is 0.2 again.', '0.2²/π = 0.0127 m = 12.7 mm.'),
          pr('Edge crack (Y = 1.12) 4 mm deep in steel with K_IC = 50 MPa√m. Fracture stress, in MPa?', 398, '√(π × 0.004) = 0.1121.', '50/(1.12 × 0.1121) ≈ 398 MPa.'),
        ],
      },
    ],
  },

  'mate-134': {
    predict: {
      q: 'Two identical shafts broke by fatigue. One was lightly loaded and ran for years; the other was heavily loaded and broke within weeks. On which one does the rough final-fracture zone cover more of the broken face?',
      options: ['The lightly loaded one', 'Both about the same', 'The heavily loaded one', 'Neither: fatigue leaves none'],
      answer: 2,
      reveal: 'The heavily loaded one. The last part of the section tears through when the steel left can no longer carry the load. Under a high load that happens while the crack is still short, so the final zone is big. Under a light load the crack creeps across most of the shaft first.',
    },
    parts: [
      {
        title: 'Evidence first, then the loads',
        minutes: 20,
        explain: [
          'Failure analysis is detective work done in a fixed order: collect the evidence and the history (drawings, loads, maintenance), look with the eye and a hand lens, study the fracture surfaces (fractography), cut and polish sections (metallography), run tests (hardness, chemistry, tensile), decide the cause, and write the report.',
          'Protect the evidence. Never fit the broken faces back together: rubbing wipes out the fine marks. Keep them dry and clean, and photograph everything before cutting.',
          'An early, simple check is to compute the stress the part normally carried and compare it with the strength of its material. The ratio strength ÷ stress is the safety factor. If the normal stress is far below the strength, a single overload is unlikely to be the story, and fatigue, corrosion or a defect become suspects.',
        ],
        formulas: [
          ['Axial stress', '\\sigma = \\frac{F}{A}'],
          ['Bending stress in a round shaft', '\\sigma = \\frac{32 M}{\\pi d^3}'],
          ['Safety factor', 'n = \\frac{\\sigma_{\\text{strength}}}{\\sigma}'],
        ],
        examples: [
          ex('A 20 mm bolt shank carried 30 kN. What was the stress? The bolt’s yield strength is 640 MPa: what is the safety factor?', [
            ['Shank area.', 'A = \\tfrac{\\pi}{4}(20)^2 = 314\\,\\text{mm}^2'],
            ['Stress (N/mm² = MPa).', '\\sigma = 30\\,000/314 = 95.5\\,\\text{MPa}'],
            ['Safety factor.', 'n = 640/95.5 = 6.7'],
          ], '95.5 MPa; 6.7'),
          ex('A 40 mm crane shaft carries a bending moment of 300 N·m. Find the bending stress.', [
            ['Use N·mm: 300 N·m = 300,000 N·mm.', ''],
            ['Bending stress.', '\\sigma = \\frac{32 \\times 300\\,000}{\\pi \\times 40^3} = 47.7\\,\\text{MPa}'],
          ], '47.7 MPa'),
        ],
        practice: [
          pr('An M20 bolt has a stress area of 245 mm² and carried 30 kN. Stress, in MPa?', 122.4, 'σ = F/A in N/mm².', '30,000/245 ≈ 122.4 MPa.'),
          pr('That bolt’s yield strength is 640 MPa. What is its safety factor?', 5.23, 'n = strength ÷ stress.', '640/122.4 ≈ 5.23.'),
          pr('A 50 mm shaft carries a bending moment of 800 N·m. Bending stress, in MPa?', 65.2, 'Convert to N·mm and use 32M/(πd³).', '32 × 800,000/(π × 125,000) ≈ 65.2 MPa.'),
          pr('The shaft steel has a yield strength of 350 MPa and the stress is 65.2 MPa. Safety factor?', 5.37, 'Divide.', '350/65.2 ≈ 5.37: no single overload, so look for fatigue.'),
        ],
      },
      {
        title: 'Reading the fracture surface',
        minutes: 25,
        explain: [
          'A ductile overload stretches and necks before breaking. A round bar ends in a “cup and cone” with a dull, fibrous centre and 45° shear lips. The reduction in area at the neck, RA = (A₀ − A_f)/A₀, is large (often 50–70%).',
          'A brittle fracture is flat and shiny, with little or no necking. Chevron (V-shaped) marks on it point back to where it started, like arrows.',
          'A fatigue fracture has a smooth zone with curved beach marks spreading from the origin, and a rough final zone. Small steps called ratchet marks appear between neighbouring origins; around a round shaft, the number of ratchet marks equals the number of origins.',
          'The final zone breaks when the remaining steel can no longer carry the load. As a simple estimate, the stress on that remaining ligament is the nominal stress divided by the fraction of section left. So a final zone that is 10% of the section means the nominal stress was about 10% of the strength.',
        ],
        formulas: [
          ['Reduction in area', 'RA = \\frac{A_0 - A_f}{A_0} = 1 - \\left(\\frac{d_f}{d_0}\\right)^2'],
          ['Stress on the remaining ligament', '\\sigma_{\\text{lig}} \\approx \\frac{\\sigma_{\\text{nom}}}{f_{\\text{left}}}'],
        ],
        examples: [
          ex('A 10 mm bar broke with a neck 6 mm across. Find the reduction in area.', [
            ['Area ratio.', '(6/10)^2 = 0.36'],
            ['RA.', '1 - 0.36 = 0.64 = 64\\%'],
            ['A large RA means a ductile overload.', ''],
          ], '64%'),
          ex('A fatigue crack covered 80% of a shaft’s section before it broke. The nominal stress was 40 MPa. What stress tore the last 20%?', [
            ['Fraction left.', 'f_{\\text{left}} = 0.2'],
            ['Ligament stress.', '\\sigma_{\\text{lig}} \\approx 40/0.2 = 200\\,\\text{MPa}'],
          ], 'about 200 MPa'),
        ],
        practice: [
          pr('A 12 mm bar broke with a neck 10 mm across. Reduction in area, in %?', 30.6, 'RA = 1 − (d_f/d₀)².', '1 − (10/12)² = 0.306, about 30.6%.'),
          pr('A steel of strength 600 MPa failed by fatigue at a nominal 60 MPa. Using the ligament estimate, what fraction of the section is the final zone, in %?', 10, 'Final zone breaks when σ_nom/f = strength.', 'f = 60/600 = 0.1, so 10%.'),
          pr('A fatigue final zone covers 25% of the face and the nominal stress was 50 MPa. Ligament stress, in MPa?', 200, 'Divide by the fraction left.', '50/0.25 = 200 MPa.'),
          pr('A broken rotating shaft shows 4 ratchet marks spaced around its edge. How many fatigue origins were there?', 4, 'Around a full circle, marks and origins alternate.', 'Four ratchet marks separate four origins.'),
        ],
      },
      {
        title: 'Counting cycles: striations and crack growth',
        minutes: 25,
        explain: [
          'Under a scanning electron microscope a fatigue surface shows striations: tiny ridges, one per load cycle. Their spacing is how far the crack grew in one cycle. Dividing a length of crack by the spacing estimates the number of cycles it took.',
          'Cycles turn into time with the loading frequency. A shaft turning at 1,450 rpm under bending sees 1,450 cycles a minute, 87,000 an hour. Fatigue cracks can grow from tiny to fatal in hours on fast machines.',
          'Paris’s law predicts the growth rate: da/dN = C(ΔK)^m, with ΔK = Δσ√(πa). For ordinary ferrite–pearlite steels, C ≈ 6.9 × 10⁻¹² (a in m, ΔK in MPa√m) and m ≈ 3. Because ΔK grows with √a, a crack four times deeper grows 4^1.5 = 8 times faster: cracks speed up as they grow.',
        ],
        formulas: [
          ['Cycles from striations', 'N \\approx \\frac{\\Delta a}{s}'],
          ['Stress-intensity range', '\\Delta K = \\Delta\\sigma\\sqrt{\\pi a}'],
          ['Paris’s law', '\\frac{da}{dN} = C(\\Delta K)^m'],
        ],
        examples: [
          ex('Striations are 0.5 µm apart over a 1 mm stretch of crack. How many cycles is that, and how long on a shaft at 1,450 rpm?', [
            ['1 mm = 1,000 µm.', 'N = 1000/0.5 = 2000\\,\\text{cycles}'],
            ['Time.', 't = 2000/1450 = 1.38\\,\\text{min}'],
          ], '2,000 cycles; about 1.4 min'),
          ex('A steel part has Δσ = 100 MPa and a 5 mm crack. Find the growth rate (C = 6.9 × 10⁻¹², m = 3).', [
            ['Stress-intensity range.', '\\Delta K = 100\\sqrt{\\pi \\times 0.005} = 12.5\\,\\text{MPa}\\sqrt{\\text{m}}'],
            ['Paris’s law.', 'da/dN = 6.9 \\times 10^{-12} \\times 12.5^3 = 1.36 \\times 10^{-8}\\,\\text{m}'],
            ['In µm per cycle.', '0.0136\\,\\mu\\text{m/cycle}'],
          ], 'about 0.014 µm per cycle'),
        ],
        practice: [
          pr('Striations 0.2 µm apart over 3 mm of crack. About how many cycles?', 15000, 'Change 3 mm to µm.', '3000/0.2 = 15,000 cycles.'),
          pr('Those 15,000 cycles on a shaft at 1,450 rpm took how many minutes?', 10.3, 'One cycle per turn.', '15,000/1,450 ≈ 10.3 min.'),
          pr('Same steel (C = 6.9 × 10⁻¹², m = 3), Δσ = 100 MPa, crack now 20 mm. Growth rate, in µm per cycle?', 0.109, 'ΔK = 100√(π × 0.02) = 25.1.', '6.9 × 10⁻¹² × 25.1³ = 1.09 × 10⁻⁷ m ≈ 0.109 µm.'),
          pr('With m = 3, by what factor does the growth rate rise when the crack depth is 4 times larger?', 8, 'ΔK ∝ √a, so rate ∝ a^1.5.', '4^1.5 = 8.'),
        ],
      },
      {
        title: 'Root cause, stress raisers and inspection',
        minutes: 20,
        explain: [
          'The physical cause (“fatigue from the keyway corner”) is not the end. The root cause is why that happened: a sharp corner on the drawing, the wrong steel, a missed inspection, corrosion in salty air. The report must name the root cause, or the failure will happen again.',
          'Most fatigue cracks start at stress raisers: keyways, holes, sharp fillets, weld toes, corrosion pits. The local stress is the stress concentration factor K_t times the nominal stress. A sharp keyway corner can have K_t ≈ 2.5–3; a generous radius brings it down a lot.',
          'When cracks cannot be prevented, they are managed. If inspectors can find a crack of size a_d and the part fails at a_c, the time for the crack to grow from one to the other is split by a safety factor (often 2 or 3) to set the inspection interval. After Aloha 243, ageing aircraft were inspected this way.',
        ],
        formulas: [
          ['Local stress', '\\sigma_{\\text{local}} = K_t\\,\\sigma_{\\text{nom}}'],
          ['Inspection interval', 'N_{\\text{insp}} = \\frac{a_c - a_d}{(da/dN)\\,\\times\\,\\text{SF}}'],
        ],
        examples: [
          ex('A shaft has a nominal stress of 80 MPa at a keyway with K_t = 2.5. Find the local stress.', [
            ['Multiply.', '\\sigma_{\\text{local}} = 2.5 \\times 80 = 200\\,\\text{MPa}'],
            ['If the fatigue limit is below 200 MPa, cracks will start there even though 80 MPa looks safe.', ''],
          ], '200 MPa'),
          ex('Inspectors can find a 2 mm crack; the part fails at 10 mm. The crack grows about 0.001 mm per flight. With a safety factor of 2, how often must it be inspected?', [
            ['Growth allowed.', '10 - 2 = 8\\,\\text{mm}'],
            ['Flights to grow it.', '8/0.001 = 8000'],
            ['Divide by the safety factor.', '8000/2 = 4000\\,\\text{flights}'],
          ], 'every 4,000 flights'),
        ],
        practice: [
          pr('K_t = 3 at a sharp fillet. What nominal stress gives a local stress of 450 MPa, in MPa?', 150, 'Divide by K_t.', '450/3 = 150 MPa.'),
          pr('A fillet is reground from K_t = 2.8 to K_t = 1.6 at a nominal 100 MPa. By how many MPa does the local stress fall?', 120, 'Find both local stresses.', '280 − 160 = 120 MPa.'),
          pr('Detectable crack 5 mm, critical 25 mm, growth 0.0005 mm per cycle, safety factor 3. Inspection interval, in cycles?', 13333, '(a_c − a_d)/rate, then ÷ 3.', '20/0.0005 = 40,000; ÷ 3 ≈ 13,333 cycles.'),
          pr('A keyway with K_t = 2.5 sees 120 MPa nominal. The steel’s fatigue limit is 250 MPa. By how many MPa does the local stress exceed it?', 50, 'Local = K_t × nominal.', '2.5 × 120 = 300 MPa, which is 50 MPa over the limit.'),
        ],
      },
    ],
  },
  'mate-135': {
    predict: {
      q: 'A gold particle 100 nm across has under 2% of its atoms on the surface. You shrink it to 3 nm across. Roughly what share of its atoms are now on the surface?',
      options: ['Still under 5%', 'About 15%', 'Nearly half', 'Every single atom'],
      answer: 2,
      reveal: 'Nearly half. Surface grows in importance as size falls, because the outer shell is always one atom thick. At 3 nm that one-atom shell holds about 47% of all the atoms, so the particle behaves very differently from a lump of gold.',
    },
    parts: [
      {
        title: 'How small is a nanometre?',
        minutes: 20,
        explain: [
          'A nanometre (nm) is a billionth of a metre. A gold atom is about 0.29 nm across, so one nanometre is only three or four atoms wide. A human hair is about 80,000 nm thick.',
          'A material counts as a nanomaterial when at least one of its dimensions is under 100 nm. That covers tiny particles (all three dimensions small), wires (two small) and thin films (one small).',
          'Particles this small contain surprisingly few atoms, so you can almost count them. Divide the particle’s volume by the space one atom takes up. For gold each atom takes about 0.017 nm³.',
        ],
        formulas: [
          ['Unit', '1\\,\\text{nm} = 10^{-9}\\,\\text{m}'],
          ['Atoms in a sphere', 'N \\approx \\frac{\\pi D^3 / 6}{v_{\\text{atom}}}'],
        ],
        examples: [
          ex('How many 10 nm particles would fit side by side across an 80 µm hair?', [
            ['Change the hair to nanometres.', '80\\,\\mu\\text{m} = 80\\,000\\,\\text{nm}'],
            ['Divide by the particle width.', '80\\,000 / 10 = 8000'],
          ], '8,000 particles'),
          ex('About how many atoms are in a gold particle 5 nm across? (Each atom takes 0.017 nm³.)', [
            ['Volume of the sphere.', 'V = \\frac{\\pi \\times 5^3}{6} = 65.4\\,\\text{nm}^3'],
            ['Divide by the space per atom.', 'N = 65.4 / 0.017 \\approx 3850'],
          ], 'about 3,850 atoms'),
        ],
        practice: [
          pr('How many nanometres are in 0.5 mm?', 500000, '1 mm = 1,000,000 nm.', '0.5 × 1,000,000 = 500,000 nm.'),
          pr('How many gold atoms (0.29 nm wide) fit side by side across 29 nm?', 100, 'Divide the length by one atom’s width.', '29 ÷ 0.29 = 100 atoms.'),
          pr('Of these, how many count as nanomaterials: a film 30 nm thick, a powder of 2 µm grains, a wire 50 nm wide, a bead 150 nm across?', 2, 'At least one dimension must be under 100 nm.', 'Only the film and the wire qualify: 2.'),
          pr('About how many atoms are in a gold particle 2 nm across? (0.017 nm³ per atom)', 246, 'V = πD³/6, then divide.', 'V = 4.19 nm³, and 4.19 ÷ 0.017 ≈ 246 atoms.', { tol: 5 }),
        ],
      },
      {
        title: 'The share of atoms on the surface',
        minutes: 20,
        explain: [
          'Think of a particle as an outer shell one atom thick around a solid core. The atoms in that shell are the surface atoms. They have fewer neighbours, so they are less tightly held and more ready to react.',
          'The core has a diameter of D − 2a, where a is the atom’s width. The fraction of the volume in the core is the cube of the ratio of diameters, so the surface fraction is what is left over.',
          'The fraction hardly matters for big particles. It climbs quickly below about 20 nm, which is why that range is where the unusual behaviour begins.',
        ],
        formulas: [
          ['Surface fraction', 'f \\approx 1 - \\left(1 - \\frac{2a}{D}\\right)^{3}'],
        ],
        examples: [
          ex('What share of the atoms is on the surface of a 10 nm gold particle? (a = 0.29 nm)', [
            ['Find the bracket.', '1 - \\frac{2 \\times 0.29}{10} = 0.942'],
            ['Cube it.', '0.942^3 = 0.836'],
            ['Subtract from 1.', 'f = 1 - 0.836 = 0.164'],
          ], 'about 16.4%'),
          ex('Repeat for a 3 nm gold particle.', [
            ['Find the bracket.', '1 - \\frac{0.58}{3} = 0.807'],
            ['Cube it.', '0.807^3 = 0.525'],
            ['Subtract from 1.', 'f = 0.475'],
          ], 'about 47.5%'),
        ],
        practice: [
          pr('What percentage of atoms is on the surface of a 20 nm gold particle?', 8.45, 'The bracket is 1 − 0.58/20 = 0.971.', '1 − 0.971³ = 0.0845, about 8.45%.'),
          pr('What percentage of atoms is on the surface of a 5 nm gold particle?', 30.9, 'The bracket is 0.884.', '1 − 0.884³ = 0.309, about 30.9%.'),
          pr('What percentage of atoms is on the surface of a 100 nm gold particle?', 1.73, 'The bracket is 0.9942.', '1 − 0.9942³ = 0.0173, about 1.73%.'),
          pr('In a 3 nm particle, what percentage of the atoms are not on the surface?', 52.5, 'Take the surface share away from 100%.', '100 − 47.5 = 52.5%.'),
        ],
      },
      {
        title: 'Surface-to-volume ratio',
        minutes: 20,
        explain: [
          'A sphere’s surface area divided by its volume is simply 6/D. Make the particle ten times smaller and every gram of it has ten times more surface.',
          'That is why tiny particles make such good catalysts: chemical reactions happen at surfaces, so more surface for the same metal means more reaction for the same cost.',
          'Surface also stores energy, because surface atoms are missing some of their bonds. Multiply the surface area by the surface energy γ to find how much. This stored energy is the reason nanoparticles tend to clump together and grow.',
        ],
        formulas: [
          ['Sphere', '\\frac{S}{V} = \\frac{6}{D}'],
          ['Total surface', 'S = \\frac{6V}{D} = \\frac{6m}{\\rho D}'],
          ['Stored energy', 'E = \\gamma S'],
        ],
        examples: [
          ex('Compare surface per volume for gold particles 1,000 nm and 10 nm across.', [
            ['Large particle.', '6/1000 = 0.006\\,\\text{nm}^{-1}'],
            ['Small particle.', '6/10 = 0.6\\,\\text{nm}^{-1}'],
            ['Compare.', '0.6 / 0.006 = 100'],
          ], '100 times more'),
          ex('What is the total surface of 1 g of gold as 10 nm particles? (ρ = 19.3 g/cm³)', [
            ['Volume in m³.', 'V = 1/19.3 = 0.0518\\,\\text{cm}^3 = 5.18 \\times 10^{-8}\\,\\text{m}^3'],
            ['Use S = 6V/D.', 'S = \\frac{6 \\times 5.18 \\times 10^{-8}}{10^{-8}} = 31.1\\,\\text{m}^2'],
          ], 'about 31 m²'),
        ],
        practice: [
          pr('What is S/V for a particle 2 nm across, in nm⁻¹?', 3, 'Use 6/D.', '6/2 = 3 nm⁻¹.'),
          pr('A particle shrinks from 100 nm to 10 nm. By what factor does S/V rise?', 10, 'S/V is proportional to 1/D.', '100/10 = 10 times.'),
          pr('What is the total surface of 1 g of gold as 5 nm particles, in m²?', 62.2, 'Half the size gives twice the 31.1 m² of the 10 nm powder.', '2 × 31.1 = 62.2 m².'),
          pr('With γ = 1.5 J/m², how much energy is stored in 31.1 m² of gold surface, in J?', 46.65, 'E = γS.', '1.5 × 31.1 = 46.65 J.'),
        ],
      },
      {
        title: 'Melting points and colour change with size',
        minutes: 25,
        explain: [
          'Surface atoms are less firmly held, so a tiny particle needs less heat to melt. A simple rule says the melting point falls in proportion to 1/D. For gold the constant C is about 0.8 nm, a value measured on real particles.',
          'Colour changes too. Light makes the free electrons in a small gold particle slosh back and forth together. Particles of about 20 nm absorb green light most strongly, near 520 nm, so the light that gets through looks ruby red. Faraday made this red gold in 1856, and the Romans used it unknowingly in the Lycurgus Cup.',
          'To turn a colour of light into an energy, use E = 1240/λ, with λ in nm and E in electron-volts (eV).',
        ],
        formulas: [
          ['Melting point', 'T_m(D) = T_{\\text{bulk}}\\left(1 - \\frac{C}{D}\\right)'],
          ['Photon energy', 'E = \\frac{1240}{\\lambda}'],
        ],
        examples: [
          ex('Bulk gold melts at 1,337 K. Estimate the melting point of a 4 nm particle (C = 0.8 nm).', [
            ['The bracket.', '1 - 0.8/4 = 0.8'],
            ['Multiply.', 'T_m = 1337 \\times 0.8 = 1070\\,\\text{K}'],
          ], 'about 1,070 K'),
          ex('What gold particle size melts at 1,000 K?', [
            ['Divide by the bulk value.', '1000/1337 = 0.748'],
            ['Solve the bracket.', 'C/D = 1 - 0.748 = 0.252'],
            ['Find D.', 'D = 0.8/0.252 = 3.17\\,\\text{nm}'],
          ], 'about 3.2 nm'),
        ],
        practice: [
          pr('Estimate the melting point of a 2 nm gold particle, in K.', 802, 'The bracket is 1 − 0.8/2.', '1337 × 0.6 ≈ 802 K.'),
          pr('Estimate the melting point of a 10 nm gold particle, in K.', 1230, 'The bracket is 0.92.', '1337 × 0.92 ≈ 1,230 K.'),
          pr('At what diameter is gold’s melting point 10% below the bulk value, in nm?', 8, 'Set C/D = 0.10.', 'D = 0.8/0.10 = 8 nm.'),
          pr('What is the energy of 520 nm green light, in eV?', 2.38, 'E = 1240/λ.', '1240/520 ≈ 2.38 eV.'),
        ],
      },
    ],
  },

  'mate-136': {
    predict: {
      q: 'You roll graphene into two tubes with almost the same width: one with (n, m) = (9, 0) and one with (10, 0). Will they carry electricity in the same way?',
      options: ['Yes, the same width means the same behaviour', 'Yes, all carbon tubes are metals', 'No, one is a metal and one a semiconductor', 'No, neither one conducts at all'],
      answer: 2,
      reveal: 'One step in n changes everything. When n − m divides exactly by 3, the tube conducts like a metal. (9, 0) does and (10, 0) does not, so it is a semiconductor, even though the two tubes are nearly the same width.',
    },
    parts: [
      {
        title: 'One element, many solids',
        minutes: 20,
        explain: [
          'Carbon can bond in several ways. Diamond joins each atom to four neighbours in three dimensions. Graphite is made of flat sheets of hexagons piled loosely, 0.335 nm apart, which is why it writes on paper.',
          'One of those sheets by itself is graphene. Geim and Novoselov first separated it in 2004, using sticky tape. A C₆₀ fullerene is a closed cage like a football, with 12 pentagons and 20 hexagons.',
          'In graphene the carbon atoms are 0.142 nm apart. Each hexagon has an area of (3√3/2)·a_cc², and there are two atoms per hexagon. From that you can find how light a sheet is.',
        ],
        formulas: [
          ['Hexagon area', 'A_{\\text{hex}} = \\frac{3\\sqrt{3}}{2}\\,a_{cc}^{2}'],
          ['Atoms per area', 'n = \\frac{2}{A_{\\text{hex}}}'],
        ],
        examples: [
          ex('Find the mass of one square metre of graphene (a_cc = 0.142 nm).', [
            ['Hexagon area.', 'A = 2.598 \\times 0.142^2 = 0.0524\\,\\text{nm}^2'],
            ['Atoms per square nanometre.', '2/0.0524 = 38.2\\,\\text{nm}^{-2} = 3.82 \\times 10^{19}\\,\\text{m}^{-2}'],
            ['Mass, using 12 g per 6.022 × 10²³ atoms.', 'm = \\frac{3.82 \\times 10^{19} \\times 12}{6.022 \\times 10^{23}} = 7.6 \\times 10^{-4}\\,\\text{g}'],
          ], 'about 0.76 mg'),
          ex('How many graphene layers are in a graphite flake 1 mm thick?', [
            ['Change to nanometres.', '1\\,\\text{mm} = 10^{6}\\,\\text{nm}'],
            ['Divide by the spacing.', '10^{6} / 0.335 = 2.99 \\times 10^{6}'],
          ], 'about 3 million layers'),
        ],
        practice: [
          pr('How many layers are in a graphite flake 0.1 mm thick?', 298500, 'Change 0.1 mm to nm, then divide by 0.335.', '100,000 ÷ 0.335 ≈ 298,500 layers.'),
          pr('What area does 1 g of graphene cover, in m²? (0.761 mg per m²)', 1314, 'Divide 1,000 mg by 0.761 mg/m².', '1000/0.761 ≈ 1,314 m².'),
          pr('What is the mass of one mole of C₆₀, in g?', 720, 'Each carbon mole is 12 g.', '60 × 12 = 720 g.'),
          pr('A C₆₀ cage has 12 pentagons and 20 hexagons. How many faces is that in total?', 32, 'Add them.', '12 + 20 = 32 faces.'),
        ],
      },
      {
        title: 'The chiral vector',
        minutes: 20,
        explain: [
          'To make a nanotube, imagine a sheet of graphene and pick two equivalent atoms on it. Roll the sheet so that those two atoms meet. The arrow joining them is called the chiral vector, and it becomes the tube’s circumference.',
          'The arrow is written with two whole numbers, (n, m): n steps along one direction of the sheet and m along the other. Different pairs give different tubes.',
          'The length of the arrow uses the sheet’s repeat distance, a = 0.246 nm. Tubes with m = 0 are called zigzag and tubes with n = m are called armchair, after the shape of their open edge.',
        ],
        formulas: [
          ['Circumference', 'C = a\\sqrt{n^2 + nm + m^2}'],
        ],
        examples: [
          ex('Find the circumference of a (10, 10) armchair tube.', [
            ['Inside the root.', '100 + 100 + 100 = 300'],
            ['Multiply by a.', 'C = 0.246 \\times \\sqrt{300} = 4.26\\,\\text{nm}'],
          ], '4.26 nm'),
          ex('Find the circumference of a (9, 0) zigzag tube.', [
            ['Inside the root.', '81 + 0 + 0 = 81'],
            ['Multiply by a.', 'C = 0.246 \\times 9 = 2.21\\,\\text{nm}'],
          ], '2.21 nm'),
        ],
        practice: [
          pr('For (8, 4), what is n² + nm + m²?', 112, 'Put in the numbers.', '64 + 32 + 16 = 112.'),
          pr('Find the circumference of a (6, 5) tube, in nm.', 2.35, 'The root is √91.', '0.246 × √91 ≈ 2.35 nm.'),
          pr('Find the circumference of a (5, 5) tube, in nm.', 2.13, 'The root is √75.', '0.246 × √75 ≈ 2.13 nm.'),
          pr('Find the circumference of a (12, 0) tube, in nm.', 2.95, 'The root is 12.', '0.246 × 12 ≈ 2.95 nm.'),
        ],
      },
      {
        title: 'Tube diameter',
        minutes: 15,
        explain: [
          'The chiral vector wraps once around the tube, so the diameter is simply the circumference divided by π.',
          'Most single-walled tubes are 0.7 to 2 nm wide. Working backwards from a desired diameter gives the numbers (n, m) to aim for, and these must be whole numbers.',
        ],
        formulas: [
          ['Diameter', 'd = \\frac{a}{\\pi}\\sqrt{n^2 + nm + m^2}'],
          ['Zigzag size', 'n = \\frac{\\pi d}{a}'],
        ],
        examples: [
          ex('Find the diameter of a (10, 10) tube.', [
            ['Use the circumference found earlier.', 'C = 4.26\\,\\text{nm}'],
            ['Divide by π.', 'd = 4.26/\\pi = 1.36\\,\\text{nm}'],
          ], '1.36 nm'),
          ex('Find the diameter of a (6, 5) tube.', [
            ['The circumference is 2.35 nm.', 'C = 0.246\\sqrt{91} = 2.35\\,\\text{nm}'],
            ['Divide by π.', 'd = 2.35/\\pi = 0.747\\,\\text{nm}'],
          ], '0.747 nm'),
        ],
        practice: [
          pr('Find the diameter of a (5, 5) tube, in nm.', 0.678, 'Divide 2.13 by π.', '2.13/π ≈ 0.678 nm.'),
          pr('Find the diameter of a (9, 0) tube, in nm.', 0.705, 'C = 0.246 × 9.', '2.214/π ≈ 0.705 nm.'),
          pr('Find the diameter of a (20, 0) tube, in nm.', 1.57, 'C = 0.246 × 20.', '4.92/π ≈ 1.57 nm.'),
          pr('Which whole number n gives a zigzag (n, 0) tube closest to 1.0 nm wide?', 13, 'Use n = πd/a and round.', 'π/0.246 = 12.8, so n = 13.', { tol: 0.1 }),
        ],
      },
      {
        title: 'Metal or semiconductor, and strength',
        minutes: 20,
        explain: [
          'Electrons in graphene only behave like those in a metal at certain special points. Rolling the sheet allows only some electron paths. If the allowed paths reach those special points, the tube is a metal. The test comes out neatly: if n − m divides exactly by 3, the tube is metallic.',
          'About one tube in three is a metal, and the rest are semiconductors. A semiconducting tube has a band gap of roughly 0.8/d eV, with d in nanometres, so wider tubes have smaller gaps.',
          'Carbon’s bonds also make these sheets extraordinarily strong for their weight. Graphene’s strength is about 130 GPa at a density of 2,200 kg/m³, which is why it is studied as a reinforcement for composites.',
        ],
        formulas: [
          ['Metal test', '(n - m) \\div 3 \\text{ is a whole number}'],
          ['Band gap', 'E_g \\approx \\frac{0.8}{d}\\,\\text{eV}'],
          ['Specific strength', '\\frac{\\sigma}{\\rho}'],
        ],
        examples: [
          ex('Is a (10, 0) tube a metal? Estimate its band gap if not.', [
            ['n − m = 10, which does not divide by 3.', '\\text{semiconductor}'],
            ['Its diameter.', 'd = 0.246 \\times 10/\\pi = 0.783\\,\\text{nm}'],
            ['Band gap.', 'E_g = 0.8/0.783 = 1.02\\,\\text{eV}'],
          ], 'semiconductor; about 1.0 eV'),
          ex('Is a (12, 3) tube a metal?', [
            ['Find n − m.', '12 - 3 = 9'],
            ['Nine divides by 3.', '9 \\div 3 = 3'],
          ], 'yes, a metal'),
        ],
        practice: [
          pr('How many of these are metallic: (9, 0), (10, 0), (8, 2), (7, 5), (10, 10)?', 3, 'Find n − m for each one.', 'The differences are 9, 10, 6, 2 and 0. Three divide by 3 (9, 6 and 0).'),
          pr('Estimate the band gap of a semiconducting tube 1.6 nm wide, in eV.', 0.5, 'E_g = 0.8/d.', '0.8/1.6 = 0.5 eV.'),
          pr('Estimate the band gap of a (13, 0) tube, in eV.', 0.786, 'First d = 0.246 × 13/π = 1.018 nm.', '0.8/1.018 ≈ 0.786 eV.'),
          pr('Steel: strength 1 GPa and density 7,850 kg/m³. Graphene: 130 GPa and 2,200 kg/m³. How many times higher is graphene’s specific strength?', 464, 'Divide strength by density for each, then compare.', '(130/2200) ÷ (1/7850) ≈ 464 times.'),
        ],
      },
    ],
  },

  'phys-212': {
    predict: {
      q: 'A steel rod is loaded along its length and is just about to bow sideways. Keep the same rod and the same supports, but make it twice as long. What load makes it bow now?',
      options: ['The same load', 'Half the load', 'A quarter of the load', 'Twice the load'],
      answer: 2,
      reveal: 'A quarter. The buckling load falls with the square of the length, so a longer column is far weaker in compression even though the steel has not changed.',
    },
    parts: [
      {
        title: 'Euler’s critical load',
        minutes: 25,
        explain: [
          'Press on the ends of a long thin ruler and it stays straight for a while, then suddenly bows out. That sudden sideways failure is buckling. The material has not been crushed. The straight shape has simply stopped being stable.',
          'Leonhard Euler worked out the load at which this happens in 1744. It depends on the stiffness E of the material and on the second moment of area I, which measures how far the material lies from the bending axis. The strength of the steel does not appear in the formula at all.',
          'For a round bar I = πd⁴/64. Because of the fourth power, a slightly thicker bar is much harder to buckle.',
        ],
        formulas: [
          ['Pinned ends', 'P_{cr} = \\frac{\\pi^2 E I}{L^2}'],
          ['Round bar', 'I = \\frac{\\pi d^4}{64}'],
        ],
        examples: [
          ex('A pinned steel rod (E = 200 GPa) is 25 mm across and 2 m long. Find its buckling load.', [
            ['Second moment of area.', 'I = \\pi \\times 25^4 / 64 = 19\\,175\\,\\text{mm}^4'],
            ['Use E = 200,000 N/mm² and L = 2000 mm.', 'P_{cr} = \\frac{\\pi^2 \\times 200\\,000 \\times 19\\,175}{2000^2}'],
            ['Evaluate.', 'P_{cr} = 9462\\,\\text{N}'],
          ], 'about 9.46 kN'),
          ex('Shorten the same rod to 1 m. What is the buckling load?', [
            ['The length is halved, so L² is a quarter.', 'P_{cr} \\text{ rises 4 times}'],
            ['Multiply.', '4 \\times 9.46 = 37.85\\,\\text{kN}'],
          ], '37.85 kN'),
        ],
        practice: [
          pr('Find I for a round bar 20 mm across, in mm⁴.', 7854, 'I = πd⁴/64.', 'π × 160,000/64 ≈ 7,854 mm⁴.'),
          pr('A pinned steel rod (E = 200 GPa) is 20 mm across and 1.5 m long. Buckling load, in kN?', 6.89, 'Use I = 7,854 mm⁴ and L = 1,500 mm.', 'π² × 200,000 × 7,854 / 1,500² ≈ 6,890 N = 6.89 kN.'),
          pr('A column is made three times longer. By what factor does its buckling load fall?', 9, 'P is proportional to 1/L².', '3² = 9 times lower.'),
          pr('A rod’s diameter is doubled. By what factor does its buckling load rise?', 16, 'P is proportional to d⁴.', '2⁴ = 16 times higher.'),
        ],
      },
      {
        title: 'End conditions',
        minutes: 20,
        explain: [
          'How the ends are held matters a great deal. A clamped end stops the column from rotating, which forces it into a shorter curve. A free end makes it worse.',
          'All these cases fit the same formula if L is replaced by the effective length KL. The value of K is 1 for pinned–pinned ends, 0.7 for fixed–pinned, 0.5 for fixed–fixed and 2 for fixed–free, like a flagpole.',
          'Real connections are never perfectly fixed, so engineers do not rely on the most favourable values without care.',
        ],
        formulas: [
          ['General form', 'P_{cr} = \\frac{\\pi^2 E I}{(K L)^2}'],
        ],
        examples: [
          ex('The 25 mm, 2 m steel rod (pinned load 9.46 kN) is clamped at both ends. Find its buckling load.', [
            ['K = 0.5, so the effective length is halved.', 'K L = 1\\,\\text{m}'],
            ['The load rises by 1/K².', 'P = 9.46 / 0.25 = 37.85\\,\\text{kN}'],
          ], '37.85 kN'),
          ex('The same rod is fixed at the base and free at the top. Find its buckling load.', [
            ['K = 2.', 'K^2 = 4'],
            ['Divide the pinned load.', 'P = 9.46 / 4 = 2.37\\,\\text{kN}'],
          ], '2.37 kN'),
        ],
        practice: [
          pr('By what factor does fixing both ends raise the load, compared with pinned ends?', 4, 'The factor is 1/K² with K = 0.5.', '1/0.25 = 4 times.'),
          pr('By what factor does a fixed–pinned column (K = 0.7) beat a pinned one?', 2.04, 'The factor is 1/K².', '1/0.49 ≈ 2.04 times.'),
          pr('A fixed–free column compared with a pinned one: what fraction of the load does it carry?', 0.25, 'K = 2, so divide by K².', '1/4 = 0.25.'),
          pr('The 25 mm rod is 1 m long (pinned load 37.85 kN) and fixed–pinned. Buckling load, in kN?', 77.2, 'Divide by K² = 0.49.', '37.85/0.49 ≈ 77.2 kN.'),
        ],
      },
      {
        title: 'Slenderness: buckling or crushing?',
        minutes: 25,
        explain: [
          'A short fat column crushes when the stress reaches the yield strength. A long thin one buckles first. The slenderness ratio λ = KL/r tells you which will happen, where r = √(I/A) is the radius of gyration. For a round bar r = d/4.',
          'Dividing Euler’s load by the area gives a buckling stress of π²E/λ². Euler’s formula is only valid while this stress is below yield.',
          'The dividing line is where the two are equal. Stiffer columns and weaker steels have the crossover at different places: for ordinary steel with 250 MPa yield it is near λ = 89.',
        ],
        formulas: [
          ['Slenderness', '\\lambda = \\frac{K L}{r}, \\quad r = \\sqrt{\\frac{I}{A}}'],
          ['Buckling stress', '\\sigma_{cr} = \\frac{\\pi^2 E}{\\lambda^2}'],
          ['Crossover', '\\lambda_c = \\pi\\sqrt{\\frac{E}{\\sigma_y}}'],
        ],
        examples: [
          ex('Find the slenderness and buckling stress of the pinned 25 mm, 2 m rod.', [
            ['Radius of gyration.', 'r = 25/4 = 6.25\\,\\text{mm}'],
            ['Slenderness.', '\\lambda = 2000/6.25 = 320'],
            ['Stress.', '\\sigma_{cr} = \\frac{\\pi^2 \\times 200\\,000}{320^2} = 19.3\\,\\text{MPa}'],
          ], 'λ = 320; 19.3 MPa'),
          ex('Find the crossover slenderness for steel with E = 200 GPa and yield 250 MPa.', [
            ['Divide E by yield.', '200\\,000/250 = 800'],
            ['Take the root and multiply by π.', '\\lambda_c = \\pi\\sqrt{800} = 88.9'],
          ], 'about 89'),
        ],
        practice: [
          pr('A pinned round bar is 40 mm across and 2 m long. What is its slenderness?', 200, 'r = d/4.', 'r = 10 mm, so 2,000/10 = 200.'),
          pr('What is the buckling stress at a slenderness of 200 (E = 200 GPa), in MPa?', 49.3, 'σ = π²E/λ².', '1,973,920/40,000 ≈ 49.3 MPa.'),
          pr('What is the crossover slenderness of steel with yield 350 MPa (E = 200 GPa)?', 75.1, 'λ_c = π√(E/σ_y).', 'π × √571.4 ≈ 75.1.'),
          pr('What is the buckling stress at a slenderness of 100 (E = 200 GPa), in MPa?', 197.4, 'σ = π²E/λ².', '1,973,920/10,000 ≈ 197.4 MPa.'),
        ],
      },
      {
        title: 'Shaping columns against buckling',
        minutes: 20,
        explain: [
          'A rectangular bar always buckles the easy way, around its weakest axis. To find that axis, use the smaller dimension as the height in I = bh³/12.',
          'For the same amount of metal, a tube beats a solid bar because its material sits far from the centre, and that raises I greatly. Scaffolding and bicycle frames are tubes for this reason.',
          'Designers then divide the buckling load by a safety factor, because real columns are never perfectly straight. Aluminium has about a third of steel’s stiffness, so an aluminium column of the same shape buckles at about a third of the load.',
        ],
        formulas: [
          ['Rectangle', 'I = \\frac{b h^3}{12}'],
          ['Tube', 'I = \\frac{\\pi (D^4 - d^4)}{64}'],
          ['Safe load', 'P_{\\text{safe}} = \\frac{P_{cr}}{SF}'],
        ],
        examples: [
          ex('A pinned steel bar 50 × 20 mm is 1 m long. Find its buckling load (E = 200 GPa).', [
            ['Weak axis: h = 20 mm.', 'I = 50 \\times 20^3/12 = 33\\,333\\,\\text{mm}^4'],
            ['Euler’s formula.', 'P = \\frac{\\pi^2 \\times 200\\,000 \\times 33\\,333}{1000^2} = 65\\,800\\,\\text{N}'],
          ], 'about 65.8 kN'),
          ex('Compare a solid bar 30 mm across with a tube of 50 mm outer and 40 mm inner diameter. They use the same amount of steel.', [
            ['Solid.', 'I = \\pi \\times 30^4/64 = 39\\,761\\,\\text{mm}^4'],
            ['Tube.', 'I = \\pi(50^4 - 40^4)/64 = 181\\,133\\,\\text{mm}^4'],
            ['Compare.', '181\\,133 / 39\\,761 = 4.56'],
          ], 'the tube is about 4.6 times stronger'),
        ],
        practice: [
          pr('A buckling load of 65.8 kN with a safety factor of 3 gives what safe load, in kN?', 21.9, 'Divide by the safety factor.', '65.8/3 ≈ 21.9 kN.'),
          pr('The 9.46 kN steel rod is remade in aluminium (E = 70 GPa). New buckling load, in kN?', 3.31, 'P is proportional to E.', '9.46 × 70/200 ≈ 3.31 kN.'),
          pr('A square steel bar 20 × 20 mm is pinned and 1.5 m long. Buckling load, in kN? (E = 200 GPa)', 11.7, 'I = 20⁴/12 = 13,333 mm⁴.', 'π² × 200,000 × 13,333/1,500² ≈ 11,700 N = 11.7 kN.'),
          pr('A bar is 40 × 10 mm. How many times larger is I about the strong axis than the weak axis?', 16, 'The ratio is (40/10)².', '(40/10)² = 16 times.'),
        ],
      },
    ],
  },

  'phys-213': {
    predict: {
      q: 'A solid steel shaft is bored out with a hole half its diameter. That removes a quarter of the steel. How much does the largest twisting stress in the shaft go up?',
      options: ['About 7%', 'About 25%', 'About 33%', 'About 50%'],
      answer: 0,
      reveal: 'Only about 7%. The middle of a twisted shaft is barely working. Its material sits close to the centre, where stress is small, so removing it saves a quarter of the weight and costs very little strength.',
    },
    parts: [
      {
        title: 'Shear stress in a twisted shaft',
        minutes: 25,
        explain: [
          'When a shaft transmits a turning effort, or torque T, each slice twists a little relative to the next. Material near the centre hardly moves, while material at the outer edge moves most.',
          'That makes the shear stress grow in a straight line from zero at the centre to its largest value at the surface. Here J is the polar moment of area, which measures how the material is spread around the centre.',
          'For a solid shaft, the formula simplifies. Note that the torque in N·m must be converted to N·mm if d is in mm, and then the stress comes out in MPa.',
        ],
        formulas: [
          ['Shear stress', '\\tau = \\frac{T r}{J}'],
          ['Solid shaft surface', '\\tau_{\\max} = \\frac{16 T}{\\pi d^3}'],
        ],
        examples: [
          ex('A 40 mm solid shaft carries 500 N·m. Find the largest shear stress.', [
            ['Use N·mm.', 'T = 500\\,000\\,\\text{N mm}'],
            ['Apply the formula.', '\\tau = \\frac{16 \\times 500\\,000}{\\pi \\times 40^3} = 39.8\\,\\text{MPa}'],
          ], '39.8 MPa'),
          ex('What solid shaft diameter carries 1,200 N·m if shear stress must stay under 60 MPa?', [
            ['Rearrange for d³.', 'd^3 = \\frac{16 \\times 1\\,200\\,000}{\\pi \\times 60} = 101\\,859\\,\\text{mm}^3'],
            ['Take the cube root.', 'd = 46.7\\,\\text{mm}'],
          ], 'about 46.7 mm'),
        ],
        practice: [
          pr('A 25 mm solid shaft carries 100 N·m. Largest shear stress, in MPa?', 32.6, 'τ = 16T/(πd³) with T in N·mm.', '16 × 100,000/(π × 15,625) ≈ 32.6 MPa.'),
          pr('A 50 mm solid shaft carries 2,000 N·m. Largest shear stress, in MPa?', 81.5, 'Change the torque to N·mm first.', '16 × 2,000,000/(π × 125,000) ≈ 81.5 MPa.'),
          pr('The surface of a shaft of radius 20 mm has a stress of 80 MPa. What is the stress at radius 10 mm, in MPa?', 40, 'Stress grows in proportion to radius.', '80 × 10/20 = 40 MPa.'),
          pr('A shaft’s diameter is doubled at the same torque. By what factor does the stress fall?', 8, 'τ depends on 1/d³.', '2³ = 8 times lower.'),
        ],
      },
      {
        title: 'The polar moment of area',
        minutes: 20,
        explain: [
          'J collects the effect of how far each piece of material lies from the centre. Material far out counts far more, because J depends on the distance squared.',
          'For a solid round section, J = πd⁴/32. A hollow section is the outer circle minus the hole, so its J is the difference between the two.',
          'Since the hole term is a fourth power, a small hole removes very little J. A hole half the diameter takes away just 1/16 of J.',
        ],
        formulas: [
          ['Solid', 'J = \\frac{\\pi d^4}{32}'],
          ['Hollow', 'J = \\frac{\\pi (D^4 - d^4)}{32}'],
        ],
        examples: [
          ex('Find J for a solid shaft 40 mm across.', [
            ['Fourth power.', '40^4 = 2\\,560\\,000'],
            ['Apply the formula.', 'J = \\pi \\times 2\\,560\\,000 / 32 = 251\\,327\\,\\text{mm}^4'],
          ], '251,327 mm⁴'),
          ex('Find J for a tube of 50 mm outer and 40 mm inner diameter.', [
            ['Subtract the fourth powers.', '50^4 - 40^4 = 3\\,690\\,000'],
            ['Apply the formula.', 'J = \\pi \\times 3\\,690\\,000 / 32 = 362\\,265\\,\\text{mm}^4'],
          ], '362,265 mm⁴'),
        ],
        practice: [
          pr('Find J for a solid shaft 30 mm across, in mm⁴.', 79522, 'J = πd⁴/32.', 'π × 810,000/32 ≈ 79,522 mm⁴.'),
          pr('Find J for a tube 60 mm outside and 40 mm inside, in mm⁴.', 1021018, 'Subtract the fourth powers first.', 'π(12,960,000 − 2,560,000)/32 ≈ 1,021,018 mm⁴.'),
          pr('A hole of half the shaft’s diameter is bored through it. What fraction of J remains?', 0.9375, '(1/2)⁴ of J is lost.', '1 − 1/16 = 0.9375.'),
          pr('That 60/40 mm tube carries 1,000 N·m. Largest shear stress, in MPa?', 29.4, 'τ = Tr/J with r = 30 mm.', '1,000,000 × 30/1,021,018 ≈ 29.4 MPa.'),
        ],
      },
      {
        title: 'Angle of twist',
        minutes: 20,
        explain: [
          'A long shaft twists more than a short one under the same torque. The twist also depends on the material’s shear modulus G, which is about 80 GPa for steel and about 26 GPa for aluminium.',
          'The formula gives the angle in radians. To change radians to degrees, multiply by 180/π. Many shafts are designed so that the twist stays small, because too much twist makes machinery vibrate or lose its timing.',
        ],
        formulas: [
          ['Twist', '\\theta = \\frac{T L}{G J}'],
          ['Degrees', '\\theta° = \\theta \\times \\frac{180}{\\pi}'],
        ],
        examples: [
          ex('A 40 mm steel shaft (J = 251,327 mm⁴, G = 80,000 MPa), 1 m long, carries 500 N·m. Find the twist.', [
            ['Use N and mm.', '\\theta = \\frac{500\\,000 \\times 1000}{80\\,000 \\times 251\\,327}'],
            ['Evaluate.', '\\theta = 0.0249\\,\\text{rad}'],
            ['Convert.', '\\theta = 1.42°'],
          ], '0.0249 rad, about 1.42°'),
          ex('How long can that shaft be if the twist must not pass 2°?', [
            ['Twist is proportional to length.', 'L = 1 \\times 2/1.425'],
            ['Evaluate.', 'L = 1.40\\,\\text{m}'],
          ], 'about 1.4 m'),
        ],
        practice: [
          pr('A steel shaft 30 mm across (J = 79,522 mm⁴) and 2 m long carries 200 N·m. Twist, in degrees? (G = 80 GPa)', 3.6, 'Find θ in radians, then multiply by 180/π.', '200,000 × 2000/(80,000 × 79,522) = 0.0629 rad ≈ 3.6°.'),
          pr('A shaft’s diameter is doubled. By what factor does the twist fall?', 16, 'θ depends on 1/J, and J depends on d⁴.', '2⁴ = 16 times less.'),
          pr('An identical aluminium shaft (G = 26 GPa) replaces a steel one (G = 80 GPa). How many times more does it twist?', 3.08, 'θ depends on 1/G.', '80/26 ≈ 3.08 times.'),
          pr('Change 0.05 radians to degrees.', 2.86, 'Multiply by 180/π.', '0.05 × 57.3 ≈ 2.86°.'),
        ],
      },
      {
        title: 'Power and hollow drive shafts',
        minutes: 20,
        explain: [
          'Shafts carry power. Power is torque times rotation speed: P = Tω, with ω in radians per second. At the same power, a fast shaft carries less torque, so it can be thinner. Gearboxes use this idea.',
          'For strength, what counts for a shaft is J divided by the outer radius. A hollow shaft with the same strength as a solid one is wider but much lighter. Cars, ships and aircraft use them for this reason.',
        ],
        formulas: [
          ['Power', 'P = T\\omega, \\quad \\omega = \\frac{2\\pi N}{60}'],
          ['Equal strength', 'D^3 (1 - k^4) = d_{\\text{solid}}^3, \\quad k = d/D'],
        ],
        examples: [
          ex('A 15 kW motor runs at 1,450 rpm. What torque does its shaft carry?', [
            ['Turn speed into ω.', '\\omega = 2\\pi \\times 1450/60 = 151.8\\,\\text{rad/s}'],
            ['Divide power by ω.', 'T = 15\\,000/151.8 = 98.8\\,\\text{N m}'],
          ], '98.8 N·m'),
          ex('A solid 50 mm shaft is replaced by an equally strong hollow one with k = 0.8. How much lighter is it?', [
            ['Outer diameter.', 'D^3 = 50^3 / (1 - 0.4096) = 211\\,721, \\quad D = 59.6\\,\\text{mm}'],
            ['Areas.', 'A_{\\text{solid}} = 1963\\,\\text{mm}^2, \\quad A_{\\text{hollow}} = \\tfrac{\\pi}{4}(59.6^2)(1 - 0.64) = 1004\\,\\text{mm}^2'],
            ['Compare.', '1004 / 1963 = 0.51'],
          ], 'about 49% lighter'),
        ],
        practice: [
          pr('A 30 kW motor turns at 1,000 rpm. Torque, in N·m?', 286.5, 'ω = 2π × 1000/60.', '30,000/104.72 ≈ 286.5 N·m.'),
          pr('A 75 kW motor turns at 3,000 rpm. Torque, in N·m?', 238.7, 'ω = 314.2 rad/s.', '75,000/314.16 ≈ 238.7 N·m.'),
          pr('A shaft carries 100 N·m at 1,500 rpm. Power, in kW?', 15.7, 'P = Tω, and ω = 157.1 rad/s.', '100 × 157.08 = 15,708 W ≈ 15.7 kW.'),
          pr('Boring out half the diameter (k = 0.5) removes what percentage of the shaft’s mass?', 25, 'Mass follows area, and area goes with diameter squared.', '(0.5)² = 0.25, so 25%.'),
        ],
      },
    ],
  },

  'phys-214': {
    predict: {
      q: 'You rotate a small square of stressed material by 45°. The point for that face moves around Mohr’s circle. How far around the circle does it go?',
      options: ['22.5°', '45°', '90°', '180°'],
      answer: 2,
      reveal: '90°. On Mohr’s circle every angle is doubled, so turning the square by 45° moves the point a quarter of the way around. This is why a quarter-turn on the circle takes you from the biggest normal stress to the biggest shear.',
    },
    parts: [
      {
        title: 'Stress depends on the cut',
        minutes: 20,
        explain: [
          'Pull on a bar, and straight across the bar you find plain tension. Cut it on a slant and the same forces look like a mix of pulling and sliding. The stress at a point depends on the direction of the cut you look at.',
          'For a thin flat piece, three numbers describe everything: normal stress σx, normal stress σy, and shear stress τ. Tension is counted as positive and compression as negative.',
          'In 1882 Otto Mohr showed that all possible combinations of normal and shear stress at a point lie on one circle. You only need its centre and radius.',
        ],
        formulas: [
          ['Centre', 'C = \\frac{\\sigma_x + \\sigma_y}{2}'],
          ['Radius', 'R = \\sqrt{\\left(\\frac{\\sigma_x - \\sigma_y}{2}\\right)^2 + \\tau^2}'],
        ],
        examples: [
          ex('σx = 80, σy = 20 and τ = 40 MPa. Find the centre and radius.', [
            ['Centre.', 'C = (80 + 20)/2 = 50\\,\\text{MPa}'],
            ['Radius.', 'R = \\sqrt{30^2 + 40^2} = 50\\,\\text{MPa}'],
          ], 'C = 50, R = 50 MPa'),
          ex('σx = 100, σy = −20 and τ = 0 MPa. Find the centre and radius.', [
            ['Centre.', 'C = (100 - 20)/2 = 40\\,\\text{MPa}'],
            ['Radius.', 'R = \\sqrt{60^2 + 0} = 60\\,\\text{MPa}'],
          ], 'C = 40, R = 60 MPa'),
        ],
        practice: [
          pr('σx = 120, σy = 40 MPa. Find the centre, in MPa.', 80, 'Average the two.', '(120 + 40)/2 = 80 MPa.'),
          pr('σx = 120, σy = 40, τ = 30 MPa. Find the radius, in MPa.', 50, 'Half the difference is 40.', '√(40² + 30²) = 50 MPa.'),
          pr('σx = −50, σy = 30, τ = 30 MPa. Find the centre, in MPa.', -10, 'Keep the minus sign.', '(−50 + 30)/2 = −10 MPa.'),
          pr('σx = 140, σy = 20, τ = 80 MPa. Find the radius, in MPa.', 100, 'Half the difference is 60.', '√(60² + 80²) = 100 MPa.'),
        ],
      },
      {
        title: 'Principal stresses',
        minutes: 20,
        explain: [
          'The two points where the circle crosses the horizontal axis have zero shear. The stresses there are the principal stresses: the largest and smallest normal stress possible at that point.',
          'They act on faces at right angles to each other. To find how far to rotate the square to reach them, use the angle on the circle, and halve it to get the real angle.',
          'Designers care about the principal stresses because cracks in brittle materials open up across the largest tensile stress.',
        ],
        formulas: [
          ['Principal stresses', '\\sigma_{1,2} = C \\pm R'],
          ['Principal angle', '\\tan 2\\theta_p = \\frac{2\\tau}{\\sigma_x - \\sigma_y}'],
        ],
        examples: [
          ex('σx = 80, σy = 20, τ = 40 MPa (C = 50, R = 50). Find the principal stresses and angle.', [
            ['Principal stresses.', '\\sigma_1 = 100, \\quad \\sigma_2 = 0\\,\\text{MPa}'],
            ['Double angle.', '\\tan 2\\theta = 80/60, \\quad 2\\theta = 53.13°'],
            ['Halve it.', '\\theta_p = 26.57°'],
          ], '100 and 0 MPa; 26.6°'),
          ex('σx = 120, σy = 40, τ = 30 MPa (C = 80, R = 50). Find the principal stresses and angle.', [
            ['Principal stresses.', '\\sigma_1 = 130, \\quad \\sigma_2 = 30\\,\\text{MPa}'],
            ['Angle.', '\\tan 2\\theta = 60/80, \\quad \\theta_p = 18.43°'],
          ], '130 and 30 MPa; 18.4°'),
        ],
        practice: [
          pr('With C = 80 and R = 100 MPa, what is σ₁, in MPa?', 180, 'Add the radius.', '80 + 100 = 180 MPa.'),
          pr('With C = 80 and R = 100 MPa, what is σ₂, in MPa?', -20, 'Subtract the radius.', '80 − 100 = −20 MPa.'),
          pr('σx = −50, σy = 30, τ = 30 MPa, with C = −10 and R = 50. What is σ₁, in MPa?', 40, 'σ₁ = C + R.', '−10 + 50 = 40 MPa.'),
          pr('σx = 100, σy = 0, τ = 50 MPa. Principal angle, in degrees?', 22.5, 'tan 2θ = 100/100.', '2θ = 45°, so θ = 22.5°.'),
        ],
      },
      {
        title: 'Stress on a tilted cut',
        minutes: 25,
        explain: [
          'For a cut turned by an angle θ, go around the circle by 2θ. These two formulas give the same answer as measuring the point on the circle.',
          'A simple check: a bar in plain tension σ, cut at 45°, has a normal stress of σ/2 and a shear stress of size σ/2. That is why soft metals tend to slip on 45° planes when pulled.',
        ],
        formulas: [
          ['Normal stress', '\\sigma_\\theta = C + \\frac{\\sigma_x - \\sigma_y}{2}\\cos 2\\theta + \\tau \\sin 2\\theta'],
          ['Shear stress', '\\tau_\\theta = -\\frac{\\sigma_x - \\sigma_y}{2}\\sin 2\\theta + \\tau \\cos 2\\theta'],
        ],
        examples: [
          ex('σx = 80, σy = 20, τ = 40 MPa on a cut at θ = 30°. Find the normal stress.', [
            ['Double the angle.', '2\\theta = 60°'],
            ['Put in the numbers.', '\\sigma_\\theta = 50 + 30(0.5) + 40(0.866)'],
            ['Evaluate.', '\\sigma_\\theta = 99.6\\,\\text{MPa}'],
          ], '99.6 MPa'),
          ex('A bar in plain tension of 100 MPa is cut at 45°. Find both stresses.', [
            ['C = 50 and half the difference is 50. The double angle is 90°.', '\\cos 90° = 0, \\quad \\sin 90° = 1'],
            ['Normal stress.', '\\sigma_\\theta = 50\\,\\text{MPa}'],
            ['Shear stress.', '\\tau_\\theta = -50\\,\\text{MPa}'],
          ], '50 MPa normal; 50 MPa shear in size'),
        ],
        practice: [
          pr('A bar in tension of 100 MPa is cut at 30°. Normal stress, in MPa?', 75, 'C = 50, half-difference = 50, 2θ = 60°.', '50 + 50 × 0.5 = 75 MPa.'),
          pr('Same bar and cut. What is the size of the shear stress, in MPa?', 43.3, 'Half-difference × sin 60°.', '50 × 0.866 = 43.3 MPa.'),
          pr('σx = 60, σy = −20, τ = 0 MPa, cut at 45°. Normal stress, in MPa?', 20, 'The cosine of 90° is zero, so only C remains.', 'C = 20 MPa.'),
          pr('A square is rotated by 35°. How many degrees does its point move around the circle?', 70, 'The circle doubles every angle.', '2 × 35 = 70°.'),
        ],
      },
      {
        title: 'Maximum shear and when metals yield',
        minutes: 20,
        explain: [
          'The top of the circle gives the largest shear stress in the plane, and it is equal to the radius. It acts at 45° to the principal directions.',
          'Metals yield by slipping, so a yield rule should look at shear. Tresca’s rule says yielding starts when the difference between the largest and smallest principal stresses reaches the yield strength.',
          'The von Mises rule uses a combined stress, and it fits test results a little better. For a state where the third stress is zero, compare the von Mises stress with the yield strength. The ratio of the two is the safety factor.',
        ],
        formulas: [
          ['Largest shear', '\\tau_{\\max} = R'],
          ['Tresca', '\\sigma_1 - \\sigma_2 \\le \\sigma_y'],
          ['Von Mises', '\\sigma_v = \\sqrt{\\sigma_1^2 - \\sigma_1\\sigma_2 + \\sigma_2^2}'],
        ],
        examples: [
          ex('Principal stresses are 100 and 0 MPa. Find the largest in-plane shear and von Mises stress.', [
            ['Radius.', 'R = (100 - 0)/2 = 50\\,\\text{MPa}'],
            ['Von Mises.', '\\sigma_v = \\sqrt{100^2 - 0 + 0} = 100\\,\\text{MPa}'],
          ], '50 MPa; 100 MPa'),
          ex('A shaft in pure torsion has τ = 60 MPa, so σ₁ = 60 and σ₂ = −60 MPa. Find the von Mises stress.', [
            ['Put in the numbers, watching the signs.', '\\sigma_v = \\sqrt{3600 + 3600 + 3600}'],
            ['Evaluate.', '\\sigma_v = 103.9\\,\\text{MPa}'],
          ], '103.9 MPa'),
        ],
        practice: [
          pr('Principal stresses are 130 and 30 MPa. Largest in-plane shear, in MPa?', 50, 'Half the difference.', '(130 − 30)/2 = 50 MPa.'),
          pr('Principal stresses are 130 and 30 MPa. Von Mises stress, in MPa?', 117.9, 'Use the formula.', '√(16,900 − 3,900 + 900) = √13,900 ≈ 117.9 MPa.'),
          pr('In pure shear of 100 MPa, a steel has yield 300 MPa. Von Mises safety factor?', 1.73, 'σ_v = √3 × 100.', '300/173.2 ≈ 1.73.'),
          pr('Same pure shear and steel. Tresca safety factor?', 1.5, 'σ₁ − σ₂ = 200 MPa.', '300/200 = 1.5.'),
        ],
      },
    ],
  },

  'phys-215': {
    predict: {
      q: 'A steel ball falls steadily through thick liquid. You swap it for a steel ball with twice the radius. How much faster does it fall?',
      options: ['The same speed', 'Twice as fast', 'Four times as fast', 'Eight times as fast'],
      answer: 2,
      reveal: 'Four times as fast. Weight grows with the volume (radius cubed) but drag grows with the radius alone, so speed depends on radius squared.',
    },
    parts: [
      {
        title: 'Pressure in still fluids',
        minutes: 20,
        explain: [
          'A fluid at rest pushes in every direction. The pressure grows with depth, because each layer carries the weight of everything above it. Pascal showed this in 1648 by sending a barometer up a mountain.',
          'The pressure difference only depends on the depth, the density and gravity. The shape of the container does not matter.',
          'Pascal’s law says a pressure applied to an enclosed fluid reaches every part of it. A small force on a small piston becomes a large force on a large one. This is how car brakes and hydraulic presses work.',
        ],
        formulas: [
          ['Depth', 'p = p_0 + \\rho g h'],
          ['Hydraulic press', '\\frac{F_1}{A_1} = \\frac{F_2}{A_2}'],
        ],
        examples: [
          ex('Find the pressure 10 m below the surface of water (surface pressure 101.3 kPa).', [
            ['Extra pressure from the water.', '\\rho g h = 1000 \\times 9.8 \\times 10 = 98\\,\\text{kPa}'],
            ['Add the air pressure.', 'p = 101.3 + 98 = 199.3\\,\\text{kPa}'],
          ], '199.3 kPa'),
          ex('Find the extra pressure at the bottom of a ladle of liquid steel 1.5 m deep (ρ = 7,000 kg/m³).', [
            ['Use ρgh.', '7000 \\times 9.8 \\times 1.5 = 102\\,900\\,\\text{Pa}'],
            ['State in kPa.', '102.9\\,\\text{kPa}'],
          ], '102.9 kPa'),
        ],
        practice: [
          pr('What is the extra pressure 25 m under water, in kPa?', 245, 'ρgh with ρ = 1,000 kg/m³.', '1000 × 9.8 × 25 = 245,000 Pa = 245 kPa.'),
          pr('What is the pressure of a column of mercury 0.76 m high, in kPa? (ρ = 13,600 kg/m³)', 101.3, 'Use ρgh.', '13,600 × 9.8 × 0.76 ≈ 101,300 Pa = 101.3 kPa.'),
          pr('A 100 N force pushes on a piston of 2 cm². The other piston is 200 cm². What force does it give, in N?', 10000, 'The force scales with area.', '100 × 200/2 = 10,000 N.'),
          pr('At what depth of water is the extra pressure 200 kPa, in m?', 20.4, 'h = p/(ρg).', '200,000/9,800 ≈ 20.4 m.'),
        ],
      },
      {
        title: 'Viscosity',
        minutes: 20,
        explain: [
          'Viscosity is a fluid’s resistance to flowing. Picture thin layers of fluid sliding over each other. Honey resists strongly, water hardly at all. Newton said the resisting stress is proportional to how quickly the velocity changes between layers.',
          'That rate of change is called the shear rate: for a thin film between a still plate and a moving one, it is the speed divided by the gap. The viscosity μ is measured in Pa·s.',
          'Water has μ ≈ 0.001 Pa·s and honey about 10 Pa·s. Liquid steel is surprisingly runny, at about 0.006 Pa·s. Molten glass and slag can be many thousands of times thicker.',
        ],
        formulas: [
          ['Newton’s law', '\\tau = \\mu \\frac{dv}{dy} \\approx \\mu \\frac{v}{h}'],
          ['Force on a plate', 'F = \\tau A'],
        ],
        examples: [
          ex('Oil (μ = 0.1 Pa·s) fills a 1 mm gap and a plate slides over it at 0.5 m/s. Find the shear stress.', [
            ['Shear rate.', 'v/h = 0.5/0.001 = 500\\,\\text{s}^{-1}'],
            ['Multiply by viscosity.', '\\tau = 0.1 \\times 500 = 50\\,\\text{Pa}'],
          ], '50 Pa'),
          ex('The plate above has an area of 0.2 m². What force is needed to drag it?', [
            ['Use F = τA.', 'F = 50 \\times 0.2'],
            ['Evaluate.', 'F = 10\\,\\text{N}'],
          ], '10 N'),
        ],
        practice: [
          pr('Water (μ = 0.001 Pa·s) in a 0.5 mm gap, plate speed 2 m/s. Shear stress, in Pa?', 4, 'Shear rate is v/h.', '0.001 × 2/0.0005 = 4 Pa.'),
          pr('How many times thicker is honey (10 Pa·s) than water (0.001 Pa·s)?', 10000, 'Divide the two.', '10/0.001 = 10,000 times.'),
          pr('Oil (μ = 0.25 Pa·s) in a 0.5 mm gap, plate speed 1 m/s. Shear stress, in Pa?', 500, 'τ = μv/h.', '0.25 × 1/0.0005 = 500 Pa.'),
          pr('A shear stress of 500 Pa acts on 0.04 m². What is the force, in N?', 20, 'F = τA.', '500 × 0.04 = 20 N.'),
        ],
      },
      {
        title: 'Stokes’s law: a falling ball',
        minutes: 25,
        explain: [
          'A small ball sinking in thick liquid speeds up until the drag equals its weight minus the buoyancy. After that it falls at a steady speed.',
          'George Stokes worked out the drag on a sphere in 1851. Setting the forces equal gives a fall speed. Time a ball between two marks, and you can calculate the viscosity.',
          'The formula holds only for slow creeping flow, where the Reynolds number ρvD/μ is below about 1.',
        ],
        formulas: [
          ['Steady speed', 'v = \\frac{2(\\rho_s - \\rho_f) g r^2}{9\\mu}'],
          ['Viscosity from a fall', '\\mu = \\frac{2(\\rho_s - \\rho_f) g r^2}{9v}'],
        ],
        examples: [
          ex('A steel ball (7,800 kg/m³) of radius 1 mm falls through glycerine (1,260 kg/m³, μ = 1.2 Pa·s). Find its speed.', [
            ['Density difference.', '7800 - 1260 = 6540\\,\\text{kg/m}^3'],
            ['Put in the numbers.', 'v = \\frac{2 \\times 6540 \\times 9.8 \\times (0.001)^2}{9 \\times 1.2}'],
            ['Evaluate.', 'v = 0.0119\\,\\text{m/s}'],
          ], '11.9 mm/s'),
          ex('The same ball falls 0.2 m in 5 s through oil (900 kg/m³). Find the viscosity.', [
            ['Speed.', 'v = 0.2/5 = 0.04\\,\\text{m/s}'],
            ['Use the viscosity form.', '\\mu = \\frac{2 \\times 6900 \\times 9.8 \\times 10^{-6}}{9 \\times 0.04}'],
            ['Evaluate.', '\\mu = 0.376\\,\\text{Pa s}'],
          ], '0.376 Pa·s'),
        ],
        practice: [
          pr('A 2 mm radius steel ball falls through that same glycerine. Speed, in mm/s? (The 1 mm ball falls at 11.87 mm/s.)', 47.5, 'Speed depends on r².', '11.87 × 4 ≈ 47.5 mm/s.'),
          pr('A 0.5 mm radius ball in the same glycerine. Speed, in mm/s?', 2.97, 'r is halved, so v is a quarter.', '11.87/4 ≈ 2.97 mm/s.'),
          pr('A steel ball (r = 1.5 mm) falls at 0.05 m/s through oil of density 960 kg/m³. Viscosity, in Pa·s?', 0.67, 'μ = 2(ρₛ − ρ_f)gr²/(9v).', '2 × 6840 × 9.8 × 2.25 × 10⁻⁶/0.45 ≈ 0.67 Pa·s.'),
          pr('A ball’s radius is tripled. By what factor does its speed rise?', 9, 'v depends on r².', '3² = 9.'),
        ],
      },
      {
        title: 'Flow in tubes, and inclusions rising in steel',
        minutes: 20,
        explain: [
          'Jean Poiseuille studied how liquids flow through narrow tubes. The flow rate depends on the fourth power of the radius, so a slightly narrower tube carries far less.',
          'Stokes’s law helps steelmakers too. Tiny pieces of oxide, called inclusions, are lighter than steel and float up. Give them enough time in the ladle and they reach the slag on top, leaving cleaner steel.',
          'Small inclusions rise very slowly, because their speed depends on the radius squared. That is why very small ones are so hard to remove.',
        ],
        formulas: [
          ['Poiseuille’s law', 'Q = \\frac{\\pi r^4 \\Delta p}{8\\mu L}'],
        ],
        examples: [
          ex('Oil (μ = 0.1 Pa·s) flows through a tube of radius 2 mm and length 1 m, pushed by 50 kPa. Find the flow rate.', [
            ['Top of the fraction.', '\\pi (0.002)^4 \\times 50\\,000 = 2.513 \\times 10^{-6}'],
            ['Divide by 8μL.', 'Q = 2.513 \\times 10^{-6} / 0.8 = 3.14 \\times 10^{-6}\\,\\text{m}^3/\\text{s}'],
          ], '3.14 mL/s'),
          ex('An alumina inclusion (3,900 kg/m³, r = 25 µm) rises in steel (7,000 kg/m³, μ = 0.006 Pa·s). How long to rise 1 m?', [
            ['Speed.', 'v = \\frac{2 \\times 3100 \\times 9.8 \\times (25 \\times 10^{-6})^2}{9 \\times 0.006} = 7.03 \\times 10^{-4}\\,\\text{m/s}'],
            ['Time.', 't = 1/(7.03 \\times 10^{-4}) = 1422\\,\\text{s}'],
          ], 'about 24 minutes'),
        ],
        practice: [
          pr('A tube’s radius is halved. By what factor does the flow fall?', 16, 'Q depends on r⁴.', '2⁴ = 16 times less.'),
          pr('Oil (μ = 0.05 Pa·s) flows through a tube of radius 1 mm and length 0.5 m, pushed by 20 kPa. Flow rate, in mL/s?', 0.314, 'Use Q = πr⁴Δp/(8μL) in SI units.', 'π × 10⁻¹² × 20,000/0.2 = 3.14 × 10⁻⁷ m³/s = 0.314 mL/s.'),
          pr('An inclusion rises at 0.7 mm/s. How long does it take to rise 1.4 m, in s?', 2000, 'Time = distance/speed.', '1400/0.7 = 2,000 s.'),
          pr('An inclusion’s radius is 5 times smaller. How many times longer does it take to rise the same height?', 25, 'Speed depends on r².', '5² = 25 times longer.'),
        ],
      },
    ],
  },

  'phys-216': {
    predict: {
      q: 'Water flows through a 25 mm glass pipe with a thin streak of dye. Roughly what water speed makes the dye start to go wavy and break up?',
      options: ['About 0.1 m/s, slower than a slow walk', 'About 1 m/s', 'About 10 m/s', 'It never breaks up in water'],
      answer: 0,
      reveal: 'Only about 0.1 m/s. Water is so thin that the smooth flow gives way easily. A Reynolds number near 2,300 for this pipe is reached at only about 9 cm/s, slower than a slow walk.',
    },
    parts: [
      {
        title: 'Continuity: what goes in comes out',
        minutes: 15,
        explain: [
          'Water hardly compresses, so the volume flowing past any point of a pipe each second must be the same. Where the pipe narrows, the water has to speed up.',
          'The flow rate Q is the area times the speed. Since area depends on diameter squared, halving the diameter makes the water go four times faster.',
        ],
        formulas: [
          ['Continuity', 'A_1 v_1 = A_2 v_2'],
          ['Flow rate', 'Q = A v = \\frac{\\pi D^2}{4} v'],
        ],
        examples: [
          ex('Water at 1 m/s in a 50 mm pipe enters a 25 mm section. Find its new speed.', [
            ['The area ratio is the diameter ratio squared.', '(50/25)^2 = 4'],
            ['Multiply.', 'v_2 = 4 \\times 1 = 4\\,\\text{m/s}'],
          ], '4 m/s'),
          ex('Find the flow rate for 2 m/s in a 50 mm pipe.', [
            ['Area.', 'A = \\pi (0.05)^2/4 = 1.963 \\times 10^{-3}\\,\\text{m}^2'],
            ['Flow rate.', 'Q = 1.963 \\times 10^{-3} \\times 2 = 3.93 \\times 10^{-3}\\,\\text{m}^3/\\text{s}'],
          ], '3.93 L/s'),
        ],
        practice: [
          pr('Water at 0.5 m/s in a 100 mm pipe enters a 50 mm section. New speed, in m/s?', 2, 'The diameter ratio is 2.', '0.5 × 2² = 2 m/s.'),
          pr('A flow of 10 L/s passes through a 50 mm pipe. Speed, in m/s?', 5.09, 'v = Q/A, with Q = 0.01 m³/s.', '0.01/0.001963 ≈ 5.09 m/s.'),
          pr('How long does a 3.93 L/s flow take to fill a 1,000 L tank, in s?', 254, 'Volume divided by rate.', '1000/3.93 ≈ 254 s.'),
          pr('A pipe’s diameter narrows to a third. By what factor does the speed rise?', 9, 'Speed follows 1/D².', '3² = 9.'),
        ],
      },
      {
        title: 'Bernoulli’s equation',
        minutes: 25,
        explain: [
          'In 1738 Daniel Bernoulli published the idea that where a fluid speeds up, its pressure falls. It is really energy conservation for a flowing fluid, ignoring friction.',
          'Along a streamline, pressure, kinetic energy per volume and height energy per volume add up to a constant. It explains the Venturi flow meter, which measures pressure drop in a narrow throat to find the flow.',
          'Water leaving a hole in a tank follows the same rule. Its speed is the same as if it had fallen freely from the water surface. This result is called Torricelli’s law.',
        ],
        formulas: [
          ['Bernoulli', 'p + \\tfrac12 \\rho v^2 + \\rho g h = \\text{constant}'],
          ['Torricelli', 'v = \\sqrt{2 g h}'],
        ],
        examples: [
          ex('Water goes from 1 m/s at 150 kPa into a throat at 4 m/s, at the same height. Find the throat pressure.', [
            ['Write Bernoulli for two points.', 'p_2 = p_1 + \\tfrac12\\rho(v_1^2 - v_2^2)'],
            ['Put in the numbers.', 'p_2 = 150\\,000 + 500(1 - 16)'],
            ['Evaluate.', 'p_2 = 142\\,500\\,\\text{Pa}'],
          ], '142.5 kPa'),
          ex('Water leaves a hole 5 m below the surface of a tank. Find its speed.', [
            ['Torricelli.', 'v = \\sqrt{2 \\times 9.8 \\times 5}'],
            ['Evaluate.', 'v = 9.9\\,\\text{m/s}'],
          ], '9.9 m/s'),
        ],
        practice: [
          pr('Water at 2 m/s and 200 kPa speeds up to 6 m/s at the same height. New pressure, in kPa?', 184, 'Pressure drop is ½ρ(v₂² − v₁²).', '500 × (36 − 4) = 16,000 Pa, so 200 − 16 = 184 kPa.'),
          pr('Water leaves a hole 1.25 m below the surface. Speed, in m/s?', 4.95, 'v = √(2gh).', '√24.5 ≈ 4.95 m/s.'),
          pr('Air (1.2 kg/m³) moves at 60 m/s over a surface and at 50 m/s under it. Pressure difference, in Pa?', 660, 'Δp = ½ρ(v₂² − v₁²).', '0.6 × (3600 − 2500) = 660 Pa.'),
          pr('Water rises 10 m in a pipe at constant speed. How much does the pressure fall, in kPa?', 98, 'Δp = ρgh.', '1000 × 9.8 × 10 = 98,000 Pa = 98 kPa.'),
        ],
      },
      {
        title: 'The Reynolds number',
        minutes: 20,
        explain: [
          'In 1883 Osborne Reynolds put a thin streak of dye into water flowing through a glass pipe. At low speed the dye stayed in a straight line. At higher speed it suddenly broke up and mixed.',
          'He found that one number decides which will happen. It compares inertia, which tends to stir the flow up, with viscosity, which calms it down.',
          'In a pipe, flow is smooth (laminar) below about 2,300 and fully chaotic (turbulent) above about 4,000. In between it switches back and forth.',
        ],
        formulas: [
          ['Reynolds number', 'Re = \\frac{\\rho v D}{\\mu}'],
        ],
        examples: [
          ex('Water (1,000 kg/m³, μ = 0.001 Pa·s) flows at 0.5 m/s in a 25 mm pipe. Find Re and the flow type.', [
            ['Put in the numbers.', 'Re = \\frac{1000 \\times 0.5 \\times 0.025}{0.001}'],
            ['Evaluate.', 'Re = 12\\,500'],
            ['Above 4,000 means turbulent.', '12\\,500 > 4000'],
          ], '12,500; turbulent'),
          ex('Oil (900 kg/m³, μ = 0.1 Pa·s) flows at the same speed in the same pipe.', [
            ['Put in the numbers.', 'Re = \\frac{900 \\times 0.5 \\times 0.025}{0.1}'],
            ['Evaluate.', 'Re = 112.5'],
          ], '112.5; laminar'),
        ],
        practice: [
          pr('Water flows at 0.1 m/s in a 10 mm pipe. What is Re?', 1000, 'Re = ρvD/μ.', '1000 × 0.1 × 0.01/0.001 = 1,000.'),
          pr('What water speed gives Re = 2,300 in a 50 mm pipe, in m/s?', 0.046, 'v = Re × μ/(ρD).', '2300 × 0.001/(1000 × 0.05) = 0.046 m/s.'),
          pr('Liquid steel (7,000 kg/m³, μ = 0.006 Pa·s) flows at 1 m/s in a 50 mm nozzle. What is Re?', 58333, 'Re = ρvD/μ.', '7000 × 1 × 0.05/0.006 ≈ 58,333.'),
          pr('Three pipes have Re of 1,500, 3,000 and 6,000. How many are fully turbulent?', 1, 'Fully turbulent means above about 4,000.', 'Only 6,000: that is 1.'),
        ],
      },
      {
        title: 'Friction in pipes and pumping power',
        minutes: 20,
        explain: [
          'Friction costs pressure along a pipe. The pressure loss depends on a friction factor f, which comes from the Reynolds number.',
          'For laminar flow, f = 64/Re. For smooth turbulent pipes up to Re of 100,000, a simple formula by Blasius works. Pumping power is the pressure loss multiplied by the flow rate.',
          'Turbulent flow mixes fluid well and moves heat quickly, which is useful in cooling water loops. The price is more pumping power.',
        ],
        formulas: [
          ['Pressure loss', '\\Delta p = f \\frac{L}{D}\\,\\frac{\\rho v^2}{2}'],
          ['Friction factor', 'f = \\frac{64}{Re}, \\quad f = \\frac{0.316}{Re^{0.25}}'],
          ['Pump power', 'P = \\Delta p \\, Q'],
        ],
        examples: [
          ex('The oil above (Re = 112.5, 900 kg/m³, 0.5 m/s) runs through 10 m of 25 mm pipe. Find the pressure loss.', [
            ['Friction factor.', 'f = 64/112.5 = 0.569'],
            ['Length over diameter.', 'L/D = 400'],
            ['Pressure loss.', '\\Delta p = 0.569 \\times 400 \\times \\frac{900 \\times 0.25}{2} = 25\\,600\\,\\text{Pa}'],
          ], '25.6 kPa'),
          ex('The water above (Re = 12,500, 0.5 m/s) runs through the same pipe. Find the pressure loss.', [
            ['Friction factor.', 'f = 0.316 / 12\\,500^{0.25} = 0.0299'],
            ['Pressure loss.', '\\Delta p = 0.0299 \\times 400 \\times 125 = 1494\\,\\text{Pa}'],
          ], 'about 1.5 kPa'),
        ],
        practice: [
          pr('What is the friction factor for laminar flow at Re = 1,000?', 0.064, 'f = 64/Re.', '64/1000 = 0.064.'),
          pr('What is the friction factor for a smooth pipe at Re = 100,000?', 0.0178, 'Re^0.25 = 17.78.', '0.316/17.78 ≈ 0.0178.'),
          pr('A pump provides 100 kPa at 0.01 m³/s. Power, in W?', 1000, 'P = Δp × Q.', '100,000 × 0.01 = 1,000 W.'),
          pr('In a laminar pipe, the speed is doubled. By what factor does the pressure loss rise?', 2, 'f halves while v² goes up 4 times.', '0.5 × 4 = 2 times.'),
        ],
      },
    ],
  },
};
