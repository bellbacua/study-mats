// Analytical chemistry, organic chemistry and introductory materials.
const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const CHEM2 = {
  'chem-012': {
    predict: {
      "q": "Two flasks hold equal moles of acid. One is strong HCl, the other weak acetic acid. With the same NaOH, which reaches equivalence first?",
      "options": [
        "Both need the same volume",
        "The strong acid needs less",
        "The weak acid needs less",
        "Their starting pH decides"
      ],
      "answer": 0,
      "reveal": "Both need the same volume. Strength describes how much acid separates into ions in water; it does not change how many acid molecules the base must neutralise."
    },
    parts: [
      {
        title: "Counting what the burette delivers",
        minutes: 20,
        explain: [
          "A titration measures an unknown amount by reacting it with a known solution. The burette delivers the known solution, called the titrant. Its final reading minus its initial reading gives the volume delivered.",
          "Concentration c in mol/L tells you the moles in each litre. Change mL to L before using n = cV. At equivalence, the reacting amounts match the balanced equation; for HCl and NaOH they match one for one.",
        ],
        formulas: [
          ["Moles delivered","n=cV"],
          ["Delivered volume","V=V_f-V_i"],
        ],
        examples: [
          ex("A burette moves from 1.20 to 19.70 mL. What volume was delivered, in mL?", [
            ["Subtract the first reading from the last.","V=V_f-V_i"],
            ["Substitute and calculate.","19.70 - 1.20 \\approx 18.5\\,\\text{mL}"],
          ], "18.5 mL"),
          ex("How many moles are in 20.0 mL of 0.100 mol/L NaOH?", [
            ["Divide mL by 1000 before multiplying.","n=cV"],
            ["Substitute and calculate.","0.100 \\times  20.0 / 1000 \\approx 0.002\\,\\text{mol}"],
          ], "0.002 mol"),
        ],
        practice: [
          pr("A burette moves from 2.10 to 17.60 mL. Find the delivered volume in mL.", 15.500000000000002, "Use the difference of the readings.", "Use the difference of the readings. 17.60 − 2.10 = 15.5 mL."),
          pr("Find the moles in 30.0 mL of 0.200 mol/L NaOH.", 0.006, "Use litres in n = cV.", "Use litres in n = cV. 0.200 × 0.0300 = 0.006 mol."),
          pr("How many mL of 0.100 mol/L NaOH contain 0.00300 mol?", 30, "Rearrange n = cV, then change L to mL.", "Rearrange n = cV, then change L to mL. 0.00300 / 0.100 × 1000 = 30 mL."),
          pr("25.0 mL of HCl contains 0.00200 mol. Find its concentration in mol/L.", 0.08, "Divide moles by the sample volume in litres.", "Divide moles by the sample volume in litres. 0.00200 / 0.0250 = 0.08 mol/L."),
        ],
      },
      {
        title: "Matching the reaction, not just the volumes",
        minutes: 25,
        explain: [
          "For a reaction that uses equal moles of acid and base, cₐVₐ = cᵦVᵦ. Both volumes may stay in mL in this particular equation because the conversion cancels on both sides.",
          "Always check the reaction first. Complete neutralisation of one mole of H₂SO₄ takes two moles of NaOH. A diluted sample also needs care: titration gives the concentration after dilution, which must be multiplied by the dilution factor to recover the original.",
        ],
        formulas: [
          ["Equal-mole reaction","c_aV_a=c_bV_b"],
          ["Sulfuric acid","\\mathrm{H_2SO_4}+2\\mathrm{NaOH}\\to\\mathrm{Na_2SO_4}+2\\mathrm{H_2O}"],
        ],
        examples: [
          ex("25.0 mL HCl needs 20.0 mL of 0.100 mol/L NaOH. Find HCl concentration in mol/L.", [
            ["Match acid and base moles.","c_a=c_bV_b/V_a"],
            ["Substitute and calculate.","0.100 \\times  20.0 / 25.0 \\approx 0.08\\,\\text{mol/L}"],
          ], "0.08 mol/L"),
          ex("10.0 mL H₂SO₄ needs 20.0 mL of 0.100 mol/L NaOH for complete neutralisation. Find acid concentration in mol/L.", [
            ["Two moles of base react with each mole of acid.","c_a=c_bV_b/(2V_a)"],
            ["Substitute and calculate.","0.100 \\times  20.0 / (2 \\times  10.0) \\approx 0.1\\,\\text{mol/L}"],
          ], "0.1 mol/L"),
        ],
        practice: [
          pr("20.0 mL HCl needs 30.0 mL of 0.200 mol/L NaOH. Find the acid concentration in mol/L.", 0.3, "Use the equal-mole relation.", "Use the equal-mole relation. 0.200 × 30.0 / 20.0 = 0.3 mol/L."),
          pr("25.0 mL of 0.0800 mol/L HCl needs how many mL of 0.100 mol/L NaOH?", 20, "Solve for the base volume.", "Solve for the base volume. 0.0800 × 25.0 / 0.100 = 20 mL."),
          pr("A diluted vinegar is 0.0800 mol/L. It was made by diluting 10.0 mL to 100.0 mL. Find the original concentration in mol/L.", 0.8, "Multiply by final volume divided by original volume.", "Multiply by final volume divided by original volume. 0.0800 × 100.0 / 10.0 = 0.8 mol/L."),
          pr("A 10.0 mL bath sample is diluted to 100.0 mL. A 25.0 mL portion needs 15.0 mL of 0.100 mol/L NaOH. Assuming a one-for-one acid reaction, find the original concentration in mol/L.", 0.6, "Find the diluted concentration, then undo the dilution.", "Find the diluted concentration, then undo the dilution. (0.100 × 15.0 / 25.0) × (100.0 / 10.0) = 0.6 mol/L."),
        ],
      },
      {
        title: "Why the curve suddenly climbs",
        minutes: 25,
        explain: [
          "Before equivalence in a strong-acid titration, added OH⁻ removes H⁺. Find the excess moles of H⁺, then divide by the total mixed volume. At equivalence a strong acid and strong base give pH 7 at 25 °C in the ideal dilute model.",
          "After equivalence, use excess OH⁻ instead. At 25 °C, pH + pOH = 14. Near equivalence almost no acid remains to use up another drop, so the pH changes sharply. pH values cannot be averaged.",
        ],
        formulas: [
          ["Before equivalence","[\\mathrm{H^+}]=\\frac{n_a-n_b}{V_a+V_b}"],
          ["Acidity and basicity","\\mathrm{pH}=-\\log_{10}[\\mathrm{H^+}],\\quad\\mathrm{pH}+\\mathrm{pOH}=14"],
        ],
        examples: [
          ex("Mix 25.0 mL of 0.100 mol/L HCl with 20.0 mL of 0.100 mol/L NaOH at 25 °C. Find pH, ignoring activity effects.", [
            ["Divide the excess acid moles by total litres.","\\mathrm{pH}=-\\log_{10}((n_a-n_b)/V)"],
            ["Substitute and calculate.","-\\log_{10}((0.0025-0.0020)/0.045) \\approx 1.954243"],
          ], "1.954243"),
          ex("The same acid receives 30.0 mL of 0.100 mol/L NaOH at 25 °C. Find pH in the ideal model.", [
            ["Now base is in excess.","\\mathrm{pH}=14+\\log_{10}[\\mathrm{OH^-}]"],
            ["Substitute and calculate.","14+\\log_{10}((0.0030-0.0025)/0.055) \\approx 11.95861"],
          ], "11.95861"),
        ],
        practice: [
          pr("An ideal strong acid has [H⁺] = 0.0100 mol/L. Find pH.", 2, "Take the negative base-ten logarithm.", "Take the negative base-ten logarithm. -log₁₀(0.0100) = 2."),
          pr("At 25 °C, pOH is 3.00. Find pH.", 11, "Subtract pOH from 14.", "Subtract pOH from 14. 14 − 3.00 = 11."),
          pr("For the ideal 25.0 mL, 0.100 mol/L HCl sample, add 24.0 mL of 0.100 mol/L NaOH. Find remaining H⁺ concentration in mol/L.", 0.0020408163265306176, "Subtract moles before dividing by total litres.", "Subtract moles before dividing by total litres. (0.00250 − 0.00240) / 0.0490 = 0.002040816 mol/L."),
          pr("For that sample, add 26.0 mL of 0.100 mol/L NaOH at 25 °C. Find pH in the ideal model.", 11.292429823902063, "Calculate the small excess of base.", "Calculate the small excess of base. 14+log₁₀((0.00260-0.00250)/0.0510) = 11.29243."),
        ],
      },
      {
        title: "Weak acids and a trustworthy end point",
        minutes: 25,
        explain: [
          "A weak acid and its conjugate base make a mixture that resists pH changes. In this region, pH = pKₐ + log₁₀(base/acid). At half-equivalence the two amounts match, so pH = pKₐ. At equivalence the conjugate base reacts with water, making the solution basic.",
          "Equivalence is a mole balance. The end point is the observed colour change. Choose an indicator whose change lies in the steep region of the curve. Standardise the titrant against a known amount first, rinse equipment correctly, and repeat close results. These steps matter when testing a metal-cleaning bath.",
        ],
        formulas: [
          ["Weak-acid mixture","\\mathrm{pH}=\\mathrm{p}K_a+\\log_{10}(n_{\\rm base}/n_{\\rm acid})"],
          ["Standardisation, one-for-one reaction","c_b=n_{\\rm standard}/V_b"],
        ],
        examples: [
          ex("A weak acid has pKₐ = 4.74. At half-equivalence, find pH using the weak-acid mixture approximation.", [
            ["Equal acid and conjugate-base amounts give a ratio of one.","\\mathrm{pH}=\\mathrm{p}K_a+\\log_{10}(1)"],
            ["Substitute and calculate.","4.74+\\log_{10}(1) \\approx 4.74"],
          ], "4.74"),
          ex("At one stage, conjugate base is 0.002 mol and acid is 0.001 mol, with pKₐ = 4.74. Find approximate pH.", [
            ["Use the mole ratio in the same flask.","\\mathrm{pH}=\\mathrm{p}K_a+\\log_{10}(n_b/n_a)"],
            ["Substitute and calculate.","4.74+\\log_{10}(2) \\approx 5.04103"],
          ], "5.04103"),
        ],
        practice: [
          pr("Equivalence is at 25.0 mL. At how many mL is half-equivalence?", 12.5, "Halve the equivalence volume.", "Halve the equivalence volume. 25.0 / 2 = 12.5 mL."),
          pr("A standard supplies 0.00200 mol of acid and uses 19.80 mL NaOH, reacting one for one. Find NaOH concentration in mol/L.", 0.10101010101010101, "Divide known moles by delivered litres.", "Divide known moles by delivered litres. 0.00200 / 0.01980 = 0.1010101 mol/L."),
          pr("Concordant titres are 20.10, 20.00 and 20.20 mL. Find their mean in mL.", 20.099999999999998, "Add the readings and divide by their count.", "Add the readings and divide by their count. (20.10 + 20.00 + 20.20) / 3 = 20.1 mL."),
          pr("A one-for-one acid bath actually needs 20.0 mL titrant, but an overshoot records 20.4 mL. By what percentage is the calculated concentration too high?", 1.999999999999993, "Concentration is proportional to recorded titre.", "Concentration is proportional to recorded titre. 100 × (20.4 − 20.0) / 20.0 = 2 %."),
        ],
      },
    ],
  },
  'chem-013': {
    predict: {
      "q": "After silver nitrate is added to a salt sample, could the dried silver chloride weigh more than the original sample?",
      "options": [
        "No, the balance must be wrong",
        "Yes, silver adds to the solid",
        "Only if water remains in it",
        "No, filtering removes all silver"
      ],
      "answer": 1,
      "reveal": "Yes. The chloride comes from the sample, but the silver comes from the added reagent. Only a fixed fraction of the dry silver chloride mass is chloride."
    },
    parts: [
      {
        title: "Making something we can weigh",
        minutes: 20,
        explain: [
          "Gravimetric analysis turns the substance we want to measure into a solid of known composition. The substance being measured is the analyte. Adding silver ions to chloride solution makes solid silver chloride, AgCl, called a precipitate.",
          "Collect the solid on a filter, wash away dissolved salts, then dry or heat it as the method requires. Weigh the empty container too. The difference between full and empty masses is the solid mass. A wet solid gives a falsely high result.",
        ],
        formulas: [
          ["Precipitation","\\mathrm{Ag^+}+\\mathrm{Cl^-}\\to\\mathrm{AgCl}(s)"],
          ["Mass by difference","m_s=m_{\\rm full}-m_{\\rm empty}"],
        ],
        examples: [
          ex("An empty crucible is 24.320 g and with dry solid is 24.807 g. Find the solid mass in g.", [
            ["Subtract the container mass.","m_s=m_f-m_e"],
            ["Substitute and calculate.","24.807 - 24.320 \\approx 0.487\\,\\text{g}"],
          ], "0.487 g"),
          ex("A solid plus container falls from 25.120 to a constant 25.080 g after drying. Find the removed water mass in g.", [
            ["The lost mass is water under the stated drying assumption.","m_w=m_{\\rm wet}-m_{\\rm dry}"],
            ["Substitute and calculate.","25.120 - 25.080 \\approx 0.04\\,\\text{g}"],
          ], "0.04 g"),
        ],
        practice: [
          pr("Filter paper is 0.850 g; paper with dry precipitate is 1.237 g. Find precipitate mass in g.", 0.3870000000000001, "Take full minus empty.", "Take full minus empty. 1.237 − 0.850 = 0.387 g."),
          pr("Drying reduces a collected solid from 0.620 g to 0.600 g. Find water removed in g.", 0.020000000000000018, "Subtract dry from wet mass.", "Subtract dry from wet mass. 0.620 − 0.600 = 0.02 g."),
          pr("A crucible is 18.500 g empty. Successive full readings are 19.104, 19.100 and 19.100 g. Find the constant solid mass in g.", 0.6000000000000014, "Use the repeated full reading.", "Use the repeated full reading. 19.100 − 18.500 = 0.6 g."),
          pr("Exactly 0.00300 mol Ag⁺ reacts with excess chloride. With AgCl molar mass 143.32 g/mol, find dry AgCl mass in g.", 0.42996, "One silver ion gives one AgCl unit.", "One silver ion gives one AgCl unit. 0.00300 × 143.32 = 0.42996 g."),
        ],
      },
      {
        title: "The solid is only partly analyte",
        minutes: 25,
        explain: [
          "A gram of AgCl is not a gram of chloride. The gravimetric factor is the analyte mass in one mole of solid divided by the solid molar mass. Multiplying the weighed solid mass by this factor gives the analyte mass.",
          "Count atoms in the formula. Fe₂O₃ contains two iron atoms per formula unit, so its iron factor uses twice the iron molar mass. Keep the whole factor in your calculation and round only the final answer.",
        ],
        formulas: [
          ["Gravimetric factor","f=\\frac{\\nu M_{\\rm analyte}}{M_{\\rm solid}}"],
          ["Analyte mass","m_{\\rm analyte}=fm_{\\rm solid}"],
        ],
        examples: [
          ex("Use Cl = 35.45 and AgCl = 143.32 g/mol. Find the chloride mass fraction of AgCl.", [
            ["One AgCl contains one Cl.","f=M_{\\rm Cl}/M_{\\rm AgCl}"],
            ["Substitute and calculate.","35.45 / 143.32 \\approx 0.2473486"],
          ], "0.2473486"),
          ex("A dry 0.600 g Fe₂O₃ solid contains all the sample iron. Use Fe = 55.85 and Fe₂O₃ = 159.70 g/mol. Find iron mass in g.", [
            ["Include both iron atoms.","m_{\\rm Fe}=m_s(2M_{\\rm Fe}/M_s)"],
            ["Substitute and calculate.","0.600 \\times  (2 \\times  55.85 / 159.70) \\approx 0.4196619\\,\\text{g}"],
          ], "0.4196619 g"),
        ],
        practice: [
          pr("AgCl weighs 0.287 g. With chloride factor 0.2474, find chloride mass in g.", 0.07100379999999999, "Multiply by the analyte fraction.", "Multiply by the analyte fraction. 0.287 × 0.2474 = 0.0710038 g."),
          pr("Find iron mass fraction in Fe₂O₃ using Fe = 55.85 and Fe₂O₃ = 159.70 g/mol.", 0.6994364433312461, "There are two Fe atoms per formula unit.", "There are two Fe atoms per formula unit. 2 × 55.85 / 159.70 = 0.6994364."),
          pr("Sulfate is collected as 0.4668 g BaSO₄. Use sulfate = 96.06 and BaSO₄ = 233.39 g/mol. Find sulfate mass in g.", 0.19212823171515492, "There is one sulfate group per BaSO₄.", "There is one sulfate group per BaSO₄. 0.4668 × 96.06 / 233.39 = 0.1921282 g."),
          pr("How many g AgCl correspond to 0.100 g chloride if its chloride mass fraction is 0.2474?", 0.4042037186742118, "Divide the desired analyte mass by its fraction.", "Divide the desired analyte mass by its fraction. 0.100 / 0.2474 = 0.4042037 g."),
        ],
      },
      {
        title: "From precipitate to ore grade",
        minutes: 25,
        explain: [
          "A mass percentage compares analyte mass with the original sample mass. Ore grade is often reported this way. Use the original weighed sample as the denominator, rather than the heavier precipitate.",
          "If only a measured portion of a dissolved sample is analysed, scale up before finding the percentage. The portion, called an aliquot, must represent a well-mixed solution. Water added during dilution changes concentration but does not create or remove analyte.",
        ],
        formulas: [
          ["Mass percentage","w=100m_a/m_0"],
          ["Whole sample from a portion","m_{\\rm whole}=m_{\\rm portion}V_{\\rm total}/V_{\\rm portion}"],
        ],
        examples: [
          ex("1.000 g ore yields 0.600 g Fe₂O₃. Use iron fraction 0.6994. Find mass percent iron.", [
            ["Convert oxide to iron, then divide by ore mass.","w=100fm_s/m_0"],
            ["Substitute and calculate.","100 \\times  0.6994 \\times  0.600 / 1.000 \\approx 41.964\\,\\%"],
          ], "41.964 %"),
          ex("A 25.0 mL portion from a 250.0 mL sample solution contains 0.0200 g analyte. Find analyte mass in the whole solution, in g.", [
            ["The portion is one tenth of the solution.","m=m_pV/V_p"],
            ["Substitute and calculate.","0.0200 \\times  250.0 / 25.0 \\approx 0.2\\,\\text{g}"],
          ], "0.2 g"),
        ],
        practice: [
          pr("A 0.500 g sample contains 0.100 g chloride. Find mass percent chloride.", 20, "Divide analyte mass by sample mass.", "Divide analyte mass by sample mass. 100 × 0.100 / 0.500 = 20 %."),
          pr("A 0.500 g sample yields 0.980 g AgCl. Use chloride fraction 0.2474. Find mass percent chloride.", 48.4904, "Only a fraction of AgCl is chloride.", "Only a fraction of AgCl is chloride. 100 × 0.2474 × 0.980 / 0.500 = 48.4904 %."),
          pr("A 2.000 g ore yields 1.200 g oxide with iron mass fraction 0.6994. Find mass percent iron.", 41.964, "Relate iron mass to original ore mass.", "Relate iron mass to original ore mass. 100 × 0.6994 × 1.200 / 2.000 = 41.964 %."),
          pr("A 1.000 g sample is dissolved to 100.0 mL. A 20.0 mL portion yields 0.100 g AgCl. With chloride factor 0.2474, find percent chloride in the sample.", 12.370000000000001, "Scale the chloride in the portion up to the full solution.", "Scale the chloride in the portion up to the full solution. 100 × 0.2474 × 0.100 × (100 / 20) / 1.000 = 12.37 %."),
        ],
      },
      {
        title: "Finding and reducing weighing errors",
        minutes: 25,
        explain: [
          "An ideal precipitate is pure, nearly insoluble and easy to filter. Letting crystals grow in warm solution can make them easier to collect. Washing removes soluble impurities, but excessive washing can dissolve some solid. Loss gives a low answer; contamination gives a high answer.",
          "A blank follows the same procedure without the sample. It reveals residue contributed by reagents or equipment. Subtract that residue when the method calls for it. Recovery compares a measured known addition with the amount added; repeated drying checks whether the weighing form is stable.",
        ],
        formulas: [
          ["Blank correction","m_{\\rm corrected}=m_{\\rm observed}-m_{\\rm blank}"],
          ["Recovery","R=100m_{\\rm recovered}/m_{\\rm added}"],
        ],
        examples: [
          ex("Observed precipitate is 0.504 g and the blank residue is 0.004 g. Find corrected mass in g.", [
            ["Remove the reagent contribution.","m_c=m_o-m_b"],
            ["Substitute and calculate.","0.504 - 0.004 \\approx 0.5\\,\\text{g}"],
          ], "0.5 g"),
          ex("A known 0.100 g addition gives 0.0980 g recovered analyte. Find percentage recovery.", [
            ["Compare recovered with added mass.","R=100m_r/m_a"],
            ["Substitute and calculate.","100 \\times  0.0980 / 0.100 \\approx 98\\,\\%"],
          ], "98 %"),
        ],
        practice: [
          pr("A dry solid should weigh 0.500 g but retains 0.010 g water. Find its observed mass in g.", 0.51, "Water adds to the reading.", "Water adds to the reading. 0.500 + 0.010 = 0.51 g."),
          pr("0.005 g of a 0.500 g precipitate is lost. Find the percentage lost.", 1, "Compare the loss with the true solid mass.", "Compare the loss with the true solid mass. 100 × 0.005 / 0.500 = 1 %."),
          pr("A result is 0.420 g analyte; its reference is 0.400 g. Find signed relative error in percent.", 4.99999999999999, "Subtract reference, divide by reference.", "Subtract reference, divide by reference. 100 × (0.420 − 0.400) / 0.400 = 5 %."),
          pr("An ore test gives 0.610 g oxide including a 0.010 g blank. Use iron factor 0.6994 and sample mass 1.000 g. Find corrected percent iron.", 41.964, "Correct the solid mass before applying the factor.", "Correct the solid mass before applying the factor. 100 × 0.6994 × (0.610 − 0.010) / 1.000 = 41.964 %."),
        ],
      },
    ],
  },
  'chem-014': {
    predict: {
      "q": "A solution lets one tenth of a beam through. You double the distance the light travels through that same solution. How much gets through now?",
      "options": [
        "One fifth of the beam",
        "One twentieth of the beam",
        "One hundredth of the beam",
        "One tenth of the beam"
      ],
      "answer": 2,
      "reveal": "One hundredth gets through. Each equal thickness passes the same fraction of the light reaching it, so the second thickness passes one tenth of the first tenth."
    },
    parts: [
      {
        title: "Light carries an energy clue",
        minutes: 20,
        explain: [
          "Light has a wavelength: the distance between neighbouring wave crests. Atoms absorb or emit particular wavelengths because their electrons can change energy only by allowed amounts. A pattern of lines can therefore identify an element.",
          "A photon is one packet of light energy. Shorter wavelengths carry more energy. For a convenient approximation, energy in electron volts is 1240 divided by wavelength in nanometres. Spectroscopy uses these energy changes to study metal ions, surfaces and chemical bonds.",
        ],
        formulas: [
          ["Photon energy","E=hc/\\lambda\\approx1240/\\lambda_{\\rm nm}\\quad(\\mathrm{eV})"],
        ],
        examples: [
          ex("Using E = 1240/λ, find the energy in eV of 620 nm light.", [
            ["Divide 1240 by the wavelength in nm.","E=1240/\\lambda"],
            ["Substitute and calculate.","1240 / 620 \\approx 2\\,\\text{eV}"],
          ], "2 eV"),
          ex("A photon carries 3.10 eV. Using the same approximation, find wavelength in nm.", [
            ["Rearrange the photon energy relation.","\\lambda=1240/E"],
            ["Substitute and calculate.","1240 / 3.10 \\approx 400\\,\\text{nm}"],
          ], "400 nm"),
        ],
        practice: [
          pr("Find the energy in eV of 500 nm light using 1240/λ.", 2.48, "Keep wavelength in nm.", "Keep wavelength in nm. 1240 / 500 = 2.48 eV."),
          pr("Find wavelength in nm for 2.00 eV light using 1240/E.", 620, "Divide the conversion constant by energy.", "Divide the conversion constant by energy. 1240 / 2.00 = 620 nm."),
          pr("Compare photon energies at 400 and 800 nm. What is E₄₀₀/E₈₀₀?", 2, "Energy is inversely proportional to wavelength.", "Energy is inversely proportional to wavelength. 800 / 400 = 2."),
          pr("A photon is absorbed in a change from 1.0 to 3.5 eV. Find the absorbed energy in eV.", 2.5, "Use final minus initial electron energy.", "Use final minus initial electron energy. 3.5 − 1.0 = 2.5 eV."),
        ],
      },
      {
        title: "Absorbance measures repeated loss",
        minutes: 20,
        explain: [
          "Transmittance T is outgoing intensity divided by incoming intensity. It is a fraction, so a percentage must first be divided by 100. Absorbance A is −log₁₀T. A larger absorbance means less transmitted light.",
          "Absorbance adds when light passes through successive identical layers. Transmittance multiplies. That is why doubling path length does not simply halve the light. A clear solvent blank removes the background from the solvent and cuvette.",
        ],
        formulas: [
          ["Transmission","T=I/I_0=10^{-A}"],
          ["Absorbance","A=-\\log_{10}T"],
        ],
        examples: [
          ex("A detector receives 25 units from an incoming 100 units. Find transmittance as a fraction.", [
            ["Compare outgoing with incoming intensity.","T=I/I_0"],
            ["Substitute and calculate.","25 / 100 \\approx 0.25"],
          ], "0.25"),
          ex("A sample transmits 10% of light. Find absorbance.", [
            ["Turn the percentage into a fraction before taking the logarithm.","A=-\\log_{10}T"],
            ["Substitute and calculate.","-\\log_{10}(0.10) \\approx 1"],
          ], "1"),
        ],
        practice: [
          pr("Absorbance is 2. Find percentage transmittance.", 1, "Convert 10 to the negative absorbance into a percentage.", "Convert 10 to the negative absorbance into a percentage. 100 × 10^(-2) = 1 %."),
          pr("Transmittance is 0.50. Find absorbance.", 0.3010299956639812, "Take the negative base-ten logarithm.", "Take the negative base-ten logarithm. -log₁₀(0.50) = 0.30103."),
          pr("Each of two identical layers transmits 0.20 of the arriving light. Find combined transmittance as a percentage.", 4, "Multiply the fractions.", "Multiply the fractions. 100 × 0.20 × 0.20 = 4 %."),
          pr("A blank has absorbance 0.05 and the sample plus blank has absorbance 0.65. Find corrected absorbance.", 0.6, "Subtract the background.", "Subtract the background. 0.65 − 0.05 = 0.6."),
        ],
      },
      {
        title: "Concentration from a beam",
        minutes: 25,
        explain: [
          "The Beer–Lambert law is A = εlc. Here l is the path length in cm, c is concentration in mol/L, and ε describes absorption at the chosen wavelength in L/(mol·cm). Absorbance has no units. Keep wavelength fixed when comparing samples.",
          "Doubling either path length or concentration doubles absorbance in a dilute solution that obeys this law. If a sample is too dark, dilute it and recover the original concentration afterwards. Cloudiness scatters light and can spoil this simple absorption model.",
        ],
        formulas: [
          ["Beer–Lambert law","A=\\varepsilon lc"],
          ["Unknown concentration","c=A/(\\varepsilon l)"],
        ],
        examples: [
          ex("A solution has ε = 12 L/(mol·cm), l = 1 cm and c = 0.040 mol/L. Find absorbance.", [
            ["Multiply the three factors.","A=\\varepsilon lc"],
            ["Substitute and calculate.","12 \\times  1 \\times  0.040 \\approx 0.48"],
          ], "0.48"),
          ex("With ε = 12 L/(mol·cm) and l = 2 cm, what concentration in mol/L gives A = 1?", [
            ["Divide absorbance by absorption strength and path length.","c=A/(\\varepsilon l)"],
            ["Substitute and calculate.","1 / (12 \\times  2) \\approx 0.04166667\\,\\text{mol/L}"],
          ], "0.04166667 mol/L"),
        ],
        practice: [
          pr("ε = 12 L/(mol·cm), l = 1 cm, c = 0.080 mol/L. Find absorbance.", 0.96, "Use the product εlc.", "Use the product εlc. 12 × 1 × 0.080 = 0.96."),
          pr("A = 0.60, ε = 12 L/(mol·cm), l = 1 cm. Find concentration in mol/L.", 0.049999999999999996, "Rearrange the absorption law.", "Rearrange the absorption law. 0.60 / 12 = 0.05 mol/L."),
          pr("A solution has A = 0.48 through 1 cm. Find A through 2 cm at the same concentration.", 0.96, "Absorbance scales with distance.", "Absorbance scales with distance. 0.48 × 2 = 0.96."),
          pr("A tenfold diluted metal-ion solution has concentration 0.0040 mol/L. Find its original concentration in mol/L.", 0.04, "Undo the dilution.", "Undo the dilution. 10 × 0.0040 = 0.04 mol/L."),
        ],
      },
      {
        title: "Standards, unknowns and warning signs",
        minutes: 25,
        explain: [
          "Calibration uses several standards of known concentration. Plot absorbance against concentration and describe the straight region as A = mc + b. The slope m measures sensitivity, while b is the remaining background. An unknown concentration is (A − b)/m.",
          "Measure an unknown within the range covered by the standards. A curved response, dirty cuvette or wrong blank can give a plausible but false result. Repeat measurements and dilute concentrated samples. A materials lab can use this approach to measure dissolved copper from a corrosion test.",
        ],
        formulas: [
          ["Calibration line","A=mc+b"],
          ["Read an unknown","c=(A-b)/m"],
        ],
        examples: [
          ex("A calibration is A = 0.020c + 0.010 with c in mg/L. An unknown gives A = 0.410. Find c in mg/L.", [
            ["Subtract the intercept, then divide by the slope.","c=(A-b)/m"],
            ["Substitute and calculate.","(0.410 - 0.010) / 0.020 \\approx 20\\,\\text{mg/L}"],
          ], "20 mg/L"),
          ex("Standards at 5 and 15 mg/L give A = 0.15 and 0.35. Find the slope in L/mg.", [
            ["Use the change in absorbance per concentration change.","m=(A_2-A_1)/(c_2-c_1)"],
            ["Substitute and calculate.","(0.35 - 0.15) / (15 - 5) \\approx 0.02\\,\\text{L/mg}"],
          ], "0.02 L/mg"),
        ],
        practice: [
          pr("A = 0.030c with c in mg/L. Find c for A = 0.300, in mg/L.", 10, "Divide absorbance by the slope.", "Divide absorbance by the slope. 0.300 / 0.030 = 10 mg/L."),
          pr("A = 0.040c + 0.020. Find absorbance for c = 10 mg/L.", 0.42000000000000004, "Include the intercept.", "Include the intercept. 0.040 × 10 + 0.020 = 0.42."),
          pr("A = 0.020c + 0.050. For A = 0.250, find c in mg/L.", 10, "Correct for background first.", "Correct for background first. (0.250 − 0.050) / 0.020 = 10 mg/L."),
          pr("A corrosion sample is diluted from 5.0 to 50.0 mL. Its diluted concentration is 8.0 mg/L. Find original concentration in mg/L.", 80, "Multiply by the dilution ratio.", "Multiply by the dilution ratio. 8.0 × 50.0 / 5.0 = 80 mg/L."),
        ],
      },
    ],
  },
  'chem-015': {
    predict: {
      "q": "Ethane, ethene and ethyne have increasingly strong bonds between their two carbons. Which should have the widest angle around a carbon?",
      "options": [
        "Ethane, with its single bond",
        "Ethene, with its double bond",
        "All three have equal angles",
        "Ethyne, with its triple bond"
      ],
      "answer": 3,
      "reveal": "Ethyne is straight around each carbon. Ethene has a flat arrangement, while ethane has a three-dimensional tetrahedral arrangement; stronger multiple bonding changes the shape as well as the bond."
    },
    parts: [
      {
        title: "Carbon keeps four bond shares",
        minutes: 20,
        explain: [
          "Carbon usually forms four covalent bond shares in neutral organic molecules. A line means a shared pair of electrons. A double bond uses two shares at each end; a triple bond uses three. Hydrogen makes one bond.",
          "When a drawing omits hydrogens on carbon, add enough to bring each carbon to four bond shares. Count bond order rather than just the number of neighbouring atoms. Long carbon backbones make fuels, waxes and many plastics possible.",
        ],
        formulas: [
          ["Carbon valence","N_{\\rm H}=4-\\sum\\text{bond orders to other atoms}"],
          ["Shared electrons","N_e=2\\sum\\text{bond orders}"],
        ],
        examples: [
          ex("An end carbon has one single bond to another carbon. How many H atoms complete its valence?", [
            ["Subtract the used bond shares from four.","N_{\\rm H}=4-b"],
            ["Substitute and calculate.","4 - 1 \\approx 3"],
          ], "3"),
          ex("How many electrons are shared in one C=C double bond?", [
            ["Each bond share is a pair of electrons.","N_e=2b"],
            ["Substitute and calculate.","2 \\times  2 \\approx 4"],
          ], "4"),
        ],
        practice: [
          pr("How many H atoms complete a carbon already joined to two carbons by single bonds?", 2, "Count both existing single bonds.", "Count both existing single bonds. 4 − 2 = 2."),
          pr("A carbon has one triple bond to another carbon. How many H atoms complete its valence?", 1, "A triple bond uses three shares.", "A triple bond uses three shares. 4 − 3 = 1."),
          pr("How many electrons are shared in one carbon–carbon triple bond?", 6, "Multiply bond order by two.", "Multiply bond order by two. 2 × 3 = 6."),
          pr("For CH₃–CH₂–CH₃, how many H atoms are present in total?", 8, "Add the hydrogens on all three carbons.", "Add the hydrogens on all three carbons. 3 + 2 + 3 = 8."),
        ],
      },
      {
        title: "Chains, branches and names",
        minutes: 25,
        explain: [
          "An alkane has only single bonds. An open chain with n carbons has formula CₙH₂ₙ₊₂, whether straight or branched. The prefixes meth-, eth-, prop-, but- and pent- indicate the first successive chain lengths. The ending -ane marks an alkane.",
          "For a branched molecule, choose the longest continuous carbon chain, then number from the end that gives branches lower positions. Molecules with the same formula but different connections are structural isomers. Their shapes can change boiling behaviour and how polymer chains pack.",
        ],
        formulas: [
          ["Open-chain alkane","\\mathrm{C}_n\\mathrm{H}_{2n+2}"],
          ["Branch carbon count","N_C=N_{\\rm main}+N_{\\rm branches}"],
        ],
        examples: [
          ex("An open-chain alkane has 5 carbons. How many H atoms are in its formula?", [
            ["Use the alkane hydrogen rule.","H=2n+2"],
            ["Substitute and calculate.","2 \\times  5 + 2 \\approx 12"],
          ], "12"),
          ex("2-methylpropane has a three-carbon main chain and a one-carbon branch. Find total carbon atoms.", [
            ["Include the branch as well as the main chain.","N_C=N_m+N_b"],
            ["Substitute and calculate.","3 + 1 \\approx 4"],
          ], "4"),
        ],
        practice: [
          pr("How many hydrogens are in open-chain hexane, with 6 carbons?", 14, "Use twice the carbon count plus two.", "Use twice the carbon count plus two. 2 × 6 + 2 = 14."),
          pr("An open-chain alkane has 18 H atoms. Find its number of carbon atoms.", 8, "Rearrange the alkane formula.", "Rearrange the alkane formula. (18 − 2) / 2 = 8."),
          pr("A five-carbon main chain has two methyl branches, each containing one carbon. Find total carbons.", 7, "Add both branch carbons.", "Add both branch carbons. 5 + 2 × 1 = 7."),
          pr("A branch on a five-carbon chain can be numbered 2 from one end or 4 from the other. Which smaller position number is used?", 2, "Choose the end nearer the branch.", "Choose the end nearer the branch. min(2,4) = 2."),
        ],
      },
      {
        title: "Multiple bonds set the shape",
        minutes: 25,
        explain: [
          "Electron groups spread apart around carbon. Four single-bond groups give a tetrahedron with angles near 109.5°. Three groups around a carbon in a double bond lie roughly in a plane, near 120°. Two groups around a carbon in a triple bond lie in a line, at 180°.",
          "An open chain with one double bond has two fewer H atoms than the corresponding alkane. One triple bond removes four H atoms. Double bonds resist free twisting, so different arrangements on either side can be distinct molecules. This helps explain why chain shape affects polymers.",
        ],
        formulas: [
          ["One double bond, no rings","\\mathrm{C}_n\\mathrm{H}_{2n}"],
          ["One triple bond, no rings","\\mathrm{C}_n\\mathrm{H}_{2n-2}"],
        ],
        examples: [
          ex("An open-chain alkene with one double bond has 4 carbons. Find its H count.", [
            ["Use the single-double-bond formula.","H=2n"],
            ["Substitute and calculate.","2 \\times  4 \\approx 8"],
          ], "8"),
          ex("By how many degrees is the ideal angle in ethyne larger than in ethene?", [
            ["Compare the linear and flat angles.","\\Delta\\theta=180^\\circ-120^\\circ"],
            ["Substitute and calculate.","180 - 120 \\approx 60\\,\\text{degrees}"],
          ], "60 degrees"),
        ],
        practice: [
          pr("How many H atoms does ethene, with 2 carbons and one double bond, contain?", 4, "Use H = 2n.", "Use H = 2n. 2 × 2 = 4."),
          pr("How many H atoms does an open-chain alkyne with 5 carbons and one triple bond contain?", 8, "Use H = 2n − 2.", "Use H = 2n − 2. 2 × 5 − 2 = 8."),
          pr("Ideal angles around an ethene carbon divide a full turn equally among three directions. Find each angle in degrees.", 120, "Divide a full turn by three.", "Divide a full turn by three. 360 / 3 = 120 degrees."),
          pr("Compare ideal ethene and methane bond angles of 120° and 109.5°. Find the difference in degrees.", 10.5, "Subtract the smaller angle.", "Subtract the smaller angle. 120 − 109.5 = 10.5 degrees."),
        ],
      },
      {
        title: "Rings, reactions and useful backbones",
        minutes: 25,
        explain: [
          "Closing an alkane chain into a single ring removes two hydrogens. A saturated single ring therefore has formula CₙH₂ₙ. Benzene is different: its flat carbon ring has shared bonding spread around the ring. Its bonds cannot be treated as freely rotating single bonds.",
          "An alkene can add hydrogen across its double bond, using one H₂ molecule per double bond. It can also join many monomers into a polymer. Complete combustion instead turns all carbon into CO₂ and all hydrogen into water, if oxygen is sufficient. Count atoms to balance these reactions.",
        ],
        formulas: [
          ["Hydrogen needed","n_{\\mathrm{H_2}}=n_{\\mathrm{C=C}}"],
          ["Complete combustion","\\mathrm{C}_x\\mathrm{H}_y+(x+y/4)\\mathrm{O_2}\\to x\\mathrm{CO_2}+(y/2)\\mathrm{H_2O}"],
        ],
        examples: [
          ex("A saturated single ring has 6 carbons. Find its H count.", [
            ["A single ring removes two H atoms relative to an open alkane.","H=2n"],
            ["Substitute and calculate.","2 \\times  6 \\approx 12"],
          ], "12"),
          ex("Complete combustion of 1 mol propane, C₃H₈, needs how many mol O₂?", [
            ["Allow oxygen for all CO₂ and water.","n_{\\mathrm{O_2}}=x+y/4"],
            ["Substitute and calculate.","3 + 8 / 4 \\approx 5\\,\\text{mol}"],
          ], "5 mol"),
        ],
        practice: [
          pr("One benzene molecule has 6 carbons. How many carbon atoms are in 3 molecules?", 18, "Multiply the molecular count by carbons per molecule.", "Multiply the molecular count by carbons per molecule. 6 × 3 = 18."),
          pr("How many mol CO₂ form on complete combustion of 2 mol butane, C₄H₁₀?", 8, "Each carbon atom gives one CO₂ molecule.", "Each carbon atom gives one CO₂ molecule. 4 × 2 = 8 mol."),
          pr("A molecule has 3 separate C=C bonds. How many H₂ molecules completely hydrogenate those bonds?", 3, "Each double bond adds one H₂.", "Each double bond adds one H₂. 3 × 1 = 3."),
          pr("100 ethene molecules join into a polyethylene chain without losing atoms. How many carbon atoms does the chain contain?", 200, "Each monomer supplies two carbons.", "Each monomer supplies two carbons. 2 × 100 = 200."),
        ],
      },
    ],
  },
  'chem-016': {
    predict: {
      "q": "The glowing group in acetic acid contains C=O beside another oxygen. Which other model shares that feature, although it is not an acid?",
      "options": [
        "Methyl acetate",
        "Methylamine",
        "Ethanol",
        "Acetone"
      ],
      "answer": 0,
      "reveal": "Methyl acetate is an ester: it also has a carbonyl beside another oxygen. In the acid that oxygen carries hydrogen; in the ester it joins to another carbon group."
    },
    parts: [
      {
        title: "Recognising the working group",
        minutes: 20,
        explain: [
          "A functional group is a small arrangement of atoms that gives a molecule characteristic reactions. R means the remaining carbon group. An alcohol has R–OH; an amine can have R–NH₂. A carbonyl is a carbon double-bonded to oxygen, C=O.",
          "A ketone has a carbonyl between carbon groups. A carboxylic acid has –COOH; an ester has –COO– between carbon groups. Look at connections as well as counting oxygen atoms. This distinguishes solvents, resin ingredients and the links in polyester.",
        ],
        formulas: [
          ["Common groups","\\mathrm{R{-}OH},\\quad\\mathrm{R{-}COOH},\\quad\\mathrm{R{-}COO{-}R^{\\prime}}"],
          ["Carbonyl","\\mathrm{C=O}"],
        ],
        examples: [
          ex("How many oxygen atoms belong to one –COOH group?", [
            ["Count the carbonyl oxygen and the hydroxyl oxygen.","N_O=1+1"],
            ["Substitute and calculate.","1 + 1 \\approx 2"],
          ], "2"),
          ex("A molecule has two ester groups. How many oxygen atoms belong to those groups in total?", [
            ["Each ester group has two oxygens.","N_O=2N_g"],
            ["Substitute and calculate.","2 \\times  2 \\approx 4"],
          ], "4"),
        ],
        practice: [
          pr("How many oxygen atoms are in three separate alcohol –OH groups?", 3, "Each group contributes one oxygen.", "Each group contributes one oxygen. 3 × 1 = 3."),
          pr("How many nitrogen atoms are in two –NH₂ groups?", 2, "Each group has one nitrogen.", "Each group has one nitrogen. 2 × 1 = 2."),
          pr("A molecule contains one ketone group and one ester group, with no other oxygen. Find its oxygen count.", 3, "Add the oxygen contributions of the two groups.", "Add the oxygen contributions of the two groups. 1 + 2 = 3."),
          pr("A molecule has two –COOH groups and one alcohol –OH group. How many oxygen atoms does it have?", 5, "Count whole acid groups before adding the separate alcohol oxygen.", "Count whole acid groups before adding the separate alcohol oxygen. 2 × 2 + 1 = 5."),
        ],
      },
      {
        title: "Groups join and groups split",
        minutes: 25,
        explain: [
          "An acid group and an alcohol group can form an ester link and release water. An acid and an amine can form an amide link under suitable conditions. The bonds made and broken determine the products; the names alone are not a recipe for an instant reaction.",
          "Hydrolysis is bond splitting using water. Ester links in polyester can be broken this way under suitable conditions. An alcohol can also form hydrogen bonds with water, helping small alcohols dissolve. Group type therefore matters both in manufacture and in chemical recycling.",
        ],
        formulas: [
          ["Ester formation","\\mathrm{RCOOH}+\\mathrm{R^{\\prime}OH}\\rightleftharpoons\\mathrm{RCOOR^{\\prime}}+\\mathrm{H_2O}"],
          ["Condensation mass balance","m_{\\rm product}=m_{\\rm reactants}-m_{\\rm water}"],
        ],
        examples: [
          ex("Five acid–alcohol pairs each make one ester link. How many water molecules form?", [
            ["One ester link releases one water molecule.","N_w=N_{\\rm links}"],
            ["Substitute and calculate.","5 \\times  1 \\approx 5"],
          ], "5"),
          ex("A condensation uses 100 g reactants and releases 9 g water with no other loss. Find retained product mass in g.", [
            ["Apply conservation of mass.","m_p=m_r-m_w"],
            ["Substitute and calculate.","100 - 9 \\approx 91\\,\\text{g}"],
          ], "91 g"),
        ],
        practice: [
          pr("Hydrolysis breaks 4 ester links. How many water molecules are consumed if one is used per link?", 4, "Count one water for each broken link.", "Count one water for each broken link. 4 × 1 = 4."),
          pr("0.20 mol ester links form, releasing one mole water per mole links. Use water molar mass 18 g/mol. Find water mass in g.", 3.6, "Convert link moles to water moles, then to mass.", "Convert link moles to water moles, then to mass. 0.20 × 18 = 3.6 g."),
          pr("Reactants total 250 g and release 18 g water. Find product mass in g if nothing else leaves.", 232, "Subtract only the escaping water.", "Subtract only the escaping water. 250 − 18 = 232 g."),
          pr("An ester hydrolysis consumes 0.50 mol water. If one water breaks one link, how many mol links are broken?", 0.5, "Use the one-for-one reaction.", "Use the one-for-one reaction. 0.50 × 1 = 0.5 mol."),
        ],
      },
      {
        title: "Addition makes a long carbon chain",
        minutes: 25,
        explain: [
          "A monomer is a small molecule that can join a polymer chain. In addition polymerisation of ethene, the extra part of each C=C bond opens so new single bonds can join neighbouring units. No small molecule has to leave.",
          "The repeating unit of polyethylene contains the same atoms as ethene. Degree of polymerisation is the number of repeating units in a chain. Ignoring the small contribution from end groups, chain molar mass is this count times repeat-unit molar mass. Branching changes how tightly chains can pack.",
        ],
        formulas: [
          ["Polyethylene","n\\,\\mathrm{CH_2{=}CH_2}\\to(\\mathrm{{-}CH_2{-}CH_2{-}})_n"],
          ["Chain molar mass, neglecting ends","M\\approx nM_0"],
        ],
        examples: [
          ex("Use polyethylene repeat-unit molar mass 28 g/mol. Find chain molar mass for 1000 units, neglecting ends, in g/mol.", [
            ["Multiply units by repeat-unit molar mass.","M=nM_0"],
            ["Substitute and calculate.","1000 \\times  28 \\approx 28000\\,\\text{g/mol}"],
          ], "28000 g/mol"),
          ex("A polyethylene chain has molar mass 56000 g/mol. With repeat mass 28 g/mol and negligible end groups, find its number of units.", [
            ["Divide chain mass by repeat mass.","n=M/M_0"],
            ["Substitute and calculate.","56000 / 28 \\approx 2000"],
          ], "2000"),
        ],
        practice: [
          pr("20 ethene monomers join without atom loss. Find total carbon atoms.", 40, "Two carbons enter per monomer.", "Two carbons enter per monomer. 2 × 20 = 40."),
          pr("20 ethene monomers join without atom loss. Find total hydrogen atoms.", 80, "Four hydrogens enter per monomer.", "Four hydrogens enter per monomer. 4 × 20 = 80."),
          pr("A repeat unit is 42 g/mol. A chain contains 500 units. Neglecting ends, find molar mass in g/mol.", 21000, "Use count times repeat mass.", "Use count times repeat mass. 500 × 42 = 21000 g/mol."),
          pr("A batch starts with 200 g ethene; 80% becomes polyethylene. Ignoring initiator and end groups, find polymer mass in g.", 160, "Addition retains the mass of reacted monomer.", "Addition retains the mass of reacted monomer. 0.80 × 200 = 160 g."),
        ],
      },
      {
        title: "Condensation and chain architecture",
        minutes: 25,
        explain: [
          "To grow a long chain by condensation, monomers need reactive groups at both ends. A diacid and a diol can form polyester; a diacid and a diamine can form nylon. A linear chain made from N separate molecules has N − 1 joining links when it has no rings or branches.",
          "Groups at more than two sites can make branches or cross-links between chains. Cross-links limit movement and may prevent a material from flowing when heated. Thermoplastics can soften and flow; a cured thermoset network cannot simply be melted and reshaped. Recycling depends on both link chemistry and chain architecture.",
        ],
        formulas: [
          ["Links in one open chain","L=N-1"],
          ["Water from condensation","m_w=n_{\\rm links}M_w"],
        ],
        examples: [
          ex("Six bifunctional molecules join into one open linear chain. If each join releases water, how many water molecules form?", [
            ["Connecting N pieces in a line needs N − 1 joins.","L=N-1"],
            ["Substitute and calculate.","6 - 1 \\approx 5"],
          ], "5"),
          ex("A diacid is 146 g/mol and a diamine 116 g/mol. A nylon repeat pair loses two waters of 18 g/mol each. Find repeat molar mass in g/mol.", [
            ["Subtract the water lost from the two monomers.","M_0=M_a+M_b-2M_w"],
            ["Substitute and calculate.","146 + 116 - 2 \\times  18 \\approx 226\\,\\text{g/mol}"],
          ], "226 g/mol"),
        ],
        practice: [
          pr("Ten molecules form one linear chain with no rings. Find joining-link count.", 9, "Use one fewer link than starting molecules.", "Use one fewer link than starting molecules. 10 − 1 = 9."),
          pr("A diol molecule has two –OH groups. How many such groups are in 8 molecules?", 16, "Count both ends of each molecule.", "Count both ends of each molecule. 2 × 8 = 16."),
          pr("0.30 mol condensation links each release one water. Use water = 18 g/mol. Find released mass in g.", 5.3999999999999995, "Convert water moles to mass.", "Convert water moles to mass. 0.30 × 18 = 5.4 g."),
          pr("A polyester repeat pair uses monomers of 166 and 62 g/mol, losing two waters of 18 g/mol. Find repeat molar mass in g/mol.", 192, "Account for both released waters.", "Account for both released waters. 166 + 62 − 2 × 18 = 192 g/mol."),
        ],
      },
    ],
  },
  'chem-017': {
    predict: {
      "q": "Zoom in on one year of the rising CO₂ curve. If CO₂ falls for several months, what should you expect when you zoom back out?",
      "options": [
        "The long rise has ended",
        "Seasonal dips can sit on a rise",
        "The yearly average must fall",
        "Every following month will fall"
      ],
      "answer": 1,
      "reveal": "Seasonal dips can sit on a long rise. Northern vegetation draws down CO₂ during its growing season, while the multi-year trend can still climb."
    },
    parts: [
      {
        title: "Reading concentration and trend",
        minutes: 20,
        explain: [
          "Parts per million, ppm, describes a tiny share. In a gas mixture it can mean the number of molecules of one gas in a million molecules of the mixture. A concentration tells you the share; total pollution also depends on how much air or water is present.",
          "The Keeling curve combines a long rise with seasonal variation. Compare the same season across years, or compare yearly averages, to avoid mistaking a seasonal dip for a lasting decline. The scene is a smoothed illustration rather than a source of current measurements.",
        ],
        formulas: [
          ["Molecular ppm","c_{\\rm ppm}=10^6N_g/N_{\\rm total}"],
          ["Change in concentration","\\Delta c=c_f-c_i"],
        ],
        examples: [
          ex("A gas mixture contains 420 CO₂ molecules per million total molecules. What is its CO₂ concentration in ppm?", [
            ["Use the stated share per million.","c=10^6N_g/N"],
            ["Substitute and calculate.","1000000 \\times  420 / 1000000 \\approx 420\\,\\text{ppm}"],
          ], "420 ppm"),
          ex("Two yearly mean concentrations are 400 and 410 ppm. Find their difference in ppm.", [
            ["Subtract the earlier mean.","\\Delta c=c_f-c_i"],
            ["Substitute and calculate.","410 - 400 \\approx 10\\,\\text{ppm}"],
          ], "10 ppm"),
        ],
        practice: [
          pr("A mixture has 800 target molecules among 2000000 molecules total. Find ppm.", 400, "Scale the fraction to a million.", "Scale the fraction to a million. 1000000 × 800 / 2000000 = 400 ppm."),
          pr("A hypothetical concentration rises from 300 to 330 ppm. Find percentage increase.", 10, "Divide the increase by the starting value.", "Divide the increase by the starting value. 100 × (330 − 300) / 300 = 10 %."),
          pr("A seasonal model has mean 410 ppm and deviation −3 ppm. Find the model concentration in ppm.", 407, "Add the signed seasonal deviation.", "Add the signed seasonal deviation. 410 − 3 = 407 ppm."),
          pr("The same month has 405 ppm in one year and 417 ppm six years later. Find average rise in ppm/year.", 2, "Use the concentration change divided by elapsed time.", "Use the concentration change divided by elapsed time. (417 − 405) / 6 = 2 ppm/year."),
        ],
      },
      {
        title: "Carbon, oxygen and climate",
        minutes: 25,
        explain: [
          "Carbon dioxide absorbs some infrared radiation leaving Earth. Adding more changes the energy balance. This is different from ozone depletion: stratospheric ozone screens ultraviolet light, while certain chlorine-containing chemicals can destroy ozone through repeated reactions.",
          "Burning carbon adds oxygen from air to the product mass. With rounded molar masses C = 12 and CO₂ = 44 g/mol, complete burning makes 44/12 times the carbon mass as CO₂. Cement can also release CO₂ when limestone decomposes, even apart from the fuel used to heat it.",
        ],
        formulas: [
          ["Carbon combustion","\\mathrm{C}+\\mathrm{O_2}\\to\\mathrm{CO_2}"],
          ["Carbon dioxide mass","m_{\\mathrm{CO_2}}=m_C(44/12)"],
        ],
        examples: [
          ex("Completely burn 12 kg pure carbon. Using C = 12 and CO₂ = 44, find CO₂ mass in kg.", [
            ["Use the product-to-carbon molar mass ratio.","m_{\\mathrm{CO_2}}=m_C(44/12)"],
            ["Substitute and calculate.","12 \\times  44 / 12 \\approx 44\\,\\text{kg}"],
          ], "44 kg"),
          ex("100 kg pure limestone decomposes completely by CaCO₃ → CaO + CO₂. Use molar masses 100 and 44 g/mol for CaCO₃ and CO₂. Find CO₂ released in kg.", [
            ["Each mole of limestone gives one mole of CO₂.","m_{\\mathrm{CO_2}}=m_{\\mathrm{CaCO_3}}(44/100)"],
            ["Substitute and calculate.","100 \\times  44 / 100 \\approx 44\\,\\text{kg}"],
          ], "44 kg"),
        ],
        practice: [
          pr("Burn 3 kg pure carbon completely. Find CO₂ mass using 44/12, in kg.", 11, "Multiply by the molar mass ratio.", "Multiply by the molar mass ratio. 3 × 44 / 12 = 11 kg."),
          pr("Complete burning of carbon produces 44 kg CO₂. Find oxygen mass added if the carbon mass was 12 kg.", 32, "Product mass includes the carbon and oxygen.", "Product mass includes the carbon and oxygen. 44 − 12 = 32 kg."),
          pr("A fuel batch contains 80 kg carbon that burns completely. Find CO₂ mass using 44/12, in kg.", 293.3333333333333, "Use carbon mass, not total fuel mass.", "Use carbon mass, not total fuel mass. 80 × 44 / 12 = 293.3333 kg."),
          pr("A process emits 500 kg CO₂ per tonne product. An improvement cuts that by 20%. Find the new emission per tonne, in kg.", 400, "Keep the fraction remaining.", "Keep the fraction remaining. 500 × (1 − 0.20) = 400 kg."),
        ],
      },
      {
        title: "Water treatment needs a mass balance",
        minutes: 25,
        explain: [
          "A dissolved pollutant concentration in mg/L becomes a pollutant mass when multiplied by litres. In dilute water, mg/L is approximately a mass-based ppm because a litre of water has mass close to a kilogram. This convention differs from molecular ppm in air.",
          "Treatment may capture pollutants in a solid rather than destroy them. Neutralisation can change acidity, precipitation can remove dissolved metals, and settling can collect the solid. The sludge still needs responsible handling. Dilution lowers concentration but leaves the total pollutant mass unchanged.",
        ],
        formulas: [
          ["Pollutant mass","m=cV"],
          ["Removal percentage","R=100(c_{\\rm in}-c_{\\rm out})/c_{\\rm in}"],
        ],
        examples: [
          ex("A tank contains 200 L water at 5 mg/L dissolved metal. Find metal mass in mg.", [
            ["Multiply concentration by volume.","m=cV"],
            ["Substitute and calculate.","200 \\times  5 \\approx 1000\\,\\text{mg}"],
          ], "1000 mg"),
          ex("At equal inflow and outflow volumes, treatment lowers metal concentration from 10 to 1 mg/L. Find removal percentage.", [
            ["Compare the removed share with the initial concentration.","R=100(c_i-c_o)/c_i"],
            ["Substitute and calculate.","100 \\times  (10 - 1) / 10 \\approx 90\\,\\%"],
          ], "90 %"),
        ],
        practice: [
          pr("50 L water contains 2 mg/L pollutant. Find pollutant mass in mg.", 100, "Use concentration times litres.", "Use concentration times litres. 50 × 2 = 100 mg."),
          pr("100 mg pollutant is uniformly dissolved in 20 L water. Find concentration in mg/L.", 5, "Divide mass by water volume.", "Divide mass by water volume. 100 / 20 = 5 mg/L."),
          pr("A tank holds 1000 mg pollutant. Clean water increases total volume to 500 L without loss. Find final concentration in mg/L.", 2, "Dilution preserves pollutant mass.", "Dilution preserves pollutant mass. 1000 / 500 = 2 mg/L."),
          pr("A 100 L batch falls from 8 to 0.5 mg/L metal during treatment, with unchanged volume. Find captured metal mass in mg.", 750, "Multiply the concentration drop by volume.", "Multiply the concentration drop by volume. (8 − 0.5) × 100 = 750 mg."),
        ],
      },
      {
        title: "Comparing whole lives fairly",
        minutes: 25,
        explain: [
          "A life-cycle comparison needs a common service: for example, keeping the same roof area weatherproof for the same time. Count raw materials, manufacture, transport, maintenance and end-of-life handling. A lighter product may save transport energy but require more energy to manufacture.",
          "Reuse and recycling can reduce new extraction. Use stated energy and recovery assumptions rather than assuming every collected item becomes new material. A factory must also check the applicable Philippine environmental requirements; a carbon or energy total alone does not measure every environmental effect.",
        ],
        formulas: [
          ["Total life-cycle energy","E_{\\rm total}=E_{\\rm make}+E_{\\rm use}+E_{\\rm end}"],
          ["Energy saved","S=E_{\\rm original}-E_{\\rm alternative}"],
        ],
        examples: [
          ex("In a stated model, making 1 kg primary aluminium takes 200 MJ and recycled aluminium takes 10 MJ. Find percentage energy saving.", [
            ["Compare the saved energy with primary production.","S=100(E_p-E_r)/E_p"],
            ["Substitute and calculate.","100 \\times  (200 - 10) / 200 \\approx 95\\,\\%"],
          ], "95 %"),
          ex("Two roofs give the same service. A uses 1000 MJ to make and 200 MJ to maintain; B uses 800 and 500 MJ. Find B total minus A total, in MJ.", [
            ["Add each roof life-cycle stages first.","\\Delta E=(E_{Bm}+E_{Bu})-(E_{Am}+E_{Au})"],
            ["Substitute and calculate.","(800 + 500) - (1000 + 200) \\approx 100\\,\\text{MJ}"],
          ], "100 MJ"),
        ],
        practice: [
          pr("A recycling process collects 100 kg metal and recovers 90%. Find recovered mass in kg.", 90, "Multiply by recovery fraction.", "Multiply by recovery fraction. 100 × 0.90 = 90 kg."),
          pr("A product uses 50 MJ to make, 20 MJ during use and 5 MJ at end of life. Find total in MJ.", 75, "Add the listed stages.", "Add the listed stages. 50 + 20 + 5 = 75 MJ."),
          pr("A batch contains 60 kg primary and 40 kg recycled metal. Assumed energies are 200 and 10 MJ/kg respectively. Find manufacturing energy in MJ.", 12400, "Sum each mass times its energy per kilogram.", "Sum each mass times its energy per kilogram. 60 × 200 + 40 × 10 = 12400 MJ."),
          pr("A school needs roof service for 30 years. Sheet A lasts 10 years and sheet B lasts 15 years. Ignore repairs. How many fewer complete sets of B are needed?", 1, "Divide service time by each lifetime and compare.", "Divide service time by each lifetime and compare. 30 / 10 − 30 / 15 = 1."),
        ],
      },
    ],
  },
  'chem-101': {
    predict: {
      "q": "A change absorbs heat but increases entropy. In the Gibbs energy scene, can warming alone make the forward change favourable?",
      "options": [
        "No, absorbing heat forbids it",
        "Yes, at every temperature",
        "Yes, above a crossover",
        "Only if entropy decreases"
      ],
      "answer": 2,
      "reveal": "Above a crossover, the entropy term TΔS can outweigh the positive enthalpy change. The sign of ΔG then becomes negative; that predicts the favourable direction, not how quickly the change occurs."
    },
    parts: [
      {
        title: "Heat and a consistent energy balance",
        minutes: 20,
        explain: [
          "Enthalpy H is an energy quantity useful for changes at constant pressure. A negative enthalpy change means heat leaves the reacting system under those conditions; a positive change means heat enters. Always say which direction the reaction is written.",
          "Reversing a reaction reverses its enthalpy sign. Multiplying the reaction amount multiplies the heat. Hess’s law says enthalpy changes add along a reaction route, so an overall change can be found from measured steps. This helps estimate the heat demand of materials processing.",
        ],
        formulas: [
          ["Reaction heat","q_p=n\\Delta H"],
          ["Hess’s law","\\Delta H_{\\rm overall}=\\sum_i\\Delta H_i"],
        ],
        examples: [
          ex("A reaction releases 40 kJ per mole as written. Find system heat change for 3 mol, in kJ.", [
            ["Heat released gives a negative system heat change.","q=n\\Delta H"],
            ["Substitute and calculate.","3 \\times  (-40) \\approx -120\\,\\text{kJ}"],
          ], "-120 kJ"),
          ex("Two reaction steps have enthalpy changes +80 and −110 kJ/mol. Find their total in kJ/mol.", [
            ["Add changes along the route.","\\Delta H=\\Delta H_1+\\Delta H_2"],
            ["Substitute and calculate.","80 - 110 \\approx -30\\,\\text{kJ/mol}"],
          ], "-30 kJ/mol"),
        ],
        practice: [
          pr("A process absorbs 25 kJ/mol for 2 mol. Find absorbed heat in kJ.", 50, "Multiply per-mole heat by amount.", "Multiply per-mole heat by amount. 2 × 25 = 50 kJ."),
          pr("The forward reaction has ΔH = −60 kJ/mol. Find ΔH for the reverse in kJ/mol.", 60, "Reverse the sign when reversing the reaction.", "Reverse the sign when reversing the reaction. −(−60) = 60 kJ/mol."),
          pr("A route has steps +120, −70 and −30 kJ/mol. Find overall ΔH in kJ/mol.", 20, "Add all signed contributions.", "Add all signed contributions. 120 − 70 − 30 = 20 kJ/mol."),
          pr("A hypothetical oxide forms with ΔH = −200 kJ/mol. Find the heat change for decomposing 0.50 mol back to the same elements, in kJ.", 100, "Reverse formation, then scale the amount.", "Reverse formation, then scale the amount. −0.50 × (−200) = 100 kJ."),
        ],
      },
      {
        title: "Entropy and absolute temperature",
        minutes: 25,
        explain: [
          "Entropy S measures how widely energy and particles can be distributed among possible arrangements. Melting and gas formation often increase it. The second law concerns system plus surroundings: a spontaneous change increases their total entropy.",
          "Thermodynamic temperature must be in kelvin. For a reversible transfer of heat at a fixed temperature, ΔS = qᵣₑᵥ/T. A melting transition at equilibrium is a useful example. Use matching energy units: J/(mol·K) must become kJ/(mol·K) before it is combined with kJ/mol.",
        ],
        formulas: [
          ["Absolute temperature","T_{\\rm K}=T_{^\\circ\\rm C}+273.15"],
          ["Reversible isothermal heat transfer","\\Delta S=q_{\\rm rev}/T"],
        ],
        examples: [
          ex("Convert 26.85 °C to kelvin.", [
            ["Add the offset to Celsius temperature.","T_K=T_C+273.15"],
            ["Substitute and calculate.","26.85 + 273.15 \\approx 300\\,\\text{K}"],
          ], "300 K"),
          ex("A reversible isothermal transition absorbs 6000 J/mol at 300 K. Find entropy change in J/(mol K).", [
            ["Divide reversible heat by absolute temperature.","\\Delta S=\\Delta H/T"],
            ["Substitute and calculate.","6000 / 300 \\approx 20\\,\\text{J/(mol K)}"],
          ], "20 J/(mol K)"),
        ],
        practice: [
          pr("Convert 126.85 °C to kelvin.", 400, "Use the absolute scale.", "Use the absolute scale. 126.85 + 273.15 = 400 K."),
          pr("Convert 150 J/(mol K) to kJ/(mol K).", 0.15, "Divide joules by 1000.", "Divide joules by 1000. 150 / 1000 = 0.15 kJ/(mol K)."),
          pr("System entropy changes by −10 J/K and surroundings by +15 J/K. Find total change in J/K.", 5, "Include both system and surroundings.", "Include both system and surroundings. −10 + 15 = 5 J/K."),
          pr("A reversible isothermal transition has ΔS = 12 J/(mol K) at 500 K. Find absorbed heat in J/mol.", 6000, "Multiply entropy change by temperature.", "Multiply entropy change by temperature. 500 × 12 = 6000 J/mol."),
        ],
      },
      {
        title: "Gibbs energy chooses the direction",
        minutes: 25,
        explain: [
          "At constant temperature and pressure, Gibbs energy G combines enthalpy and entropy. For the actual composition, ΔG < 0 favours the forward change, ΔG > 0 favours the reverse, and ΔG = 0 means equilibrium. A negative value does not promise a fast reaction: an energy barrier may still slow it.",
          "Calculate ΔG = ΔH − TΔS with temperature in kelvin and matching units. When both ΔH and ΔS are positive, heating can make the forward change favourable. When both are negative, cooling can favour it. With opposite signs, the direction may remain the same over the range considered.",
        ],
        formulas: [
          ["Gibbs energy change","\\Delta G=\\Delta H-T\\Delta S"],
        ],
        examples: [
          ex("At 300 K, ΔH = +100 kJ/mol and ΔS = +200 J/(mol K). Find ΔG in kJ/mol.", [
            ["Change the entropy units to kJ before subtracting.","\\Delta G=\\Delta H-T(\\Delta S_J/1000)"],
            ["Substitute and calculate.","100 - 300 \\times  200 / 1000 \\approx 40\\,\\text{kJ/mol}"],
          ], "40 kJ/mol"),
          ex("For the same constant ΔH and ΔS, find ΔG at 800 K in kJ/mol.", [
            ["Use the higher temperature in the entropy term.","\\Delta G=\\Delta H-T\\Delta S"],
            ["Substitute and calculate.","100 - 800 \\times  0.200 \\approx -60\\,\\text{kJ/mol}"],
          ], "-60 kJ/mol"),
        ],
        practice: [
          pr("ΔH = −120 kJ/mol, ΔS = +100 J/(mol K), T = 300 K. Find ΔG in kJ/mol.", -150, "Subtract a positive entropy term from negative enthalpy.", "Subtract a positive entropy term from negative enthalpy. −120 − 300 × 0.100 = -150 kJ/mol."),
          pr("ΔH = +50 kJ/mol, ΔS = −100 J/(mol K), T = 300 K. Find ΔG in kJ/mol.", 80, "Subtracting a negative term adds to ΔH.", "Subtracting a negative term adds to ΔH. 50 − 300 × (−0.100) = 80 kJ/mol."),
          pr("ΔH = −60 kJ/mol and ΔS = −100 J/(mol K), constant over the range. Find ΔG at 400 K in kJ/mol.", -20, "Keep the entropy sign when converting units.", "Keep the entropy sign when converting units. −60 − 400 × (−0.100) = -20 kJ/mol."),
          pr("For ΔH = −60 kJ/mol and ΔS = −100 J/(mol K), find ΔG at 800 K in kJ/mol.", 20, "The same negative entropy now has a larger temperature term.", "The same negative entropy now has a larger temperature term. −60 − 800 × (−0.100) = 20 kJ/mol."),
        ],
      },
      {
        title: "Crossovers, phases and equilibrium mixtures",
        minutes: 30,
        explain: [
          "At a crossover, ΔG = 0, so T* = ΔH/ΔS when the ratio is positive. Treating ΔH and ΔS as constant gives a useful local model for melting or a furnace reaction. Real values vary with temperature, so this approximation needs a stated range.",
          "Composition also matters. Standard Gibbs energy ΔG° describes standard reference states, while actual ΔG = ΔG° + RT ln Q includes the present mixture through the reaction quotient Q. At equilibrium Q = K and ΔG° = −RT ln K. A negative ΔG° favours products at equilibrium without requiring every reactant molecule to disappear.",
        ],
        formulas: [
          ["Crossover","T^*=\\Delta H/\\Delta S"],
          ["Composition and equilibrium","\\Delta G=\\Delta G^\\circ+RT\\ln Q,\\quad\\Delta G^\\circ=-RT\\ln K"],
        ],
        examples: [
          ex("A model has ΔH = 180 kJ/mol and ΔS = 0.150 kJ/(mol K), both constant. Find crossover temperature in K.", [
            ["Set ΔG to zero and divide.","T^*=\\Delta H/\\Delta S"],
            ["Substitute and calculate.","180 / 0.150 \\approx 1200\\,\\text{K}"],
          ], "1200 K"),
          ex("With R = 8.314 J/(mol K), T = 300 K and K = 10, find ΔG° in kJ/mol.", [
            ["Use the natural logarithm and change J to kJ.","\\Delta G^\\circ=-RT\\ln K"],
            ["Substitute and calculate.","-8.314 \\times  300 \\times  \\ln(10) / 1000 \\approx -5.743108\\,\\text{kJ/mol}"],
          ], "-5.743108 kJ/mol"),
        ],
        practice: [
          pr("A melting model has ΔH = 6000 J/mol and ΔS = 20 J/(mol K). Find melting temperature in K.", 300, "The two energy units already match.", "The two energy units already match. 6000 / 20 = 300 K."),
          pr("A model has ΔH = 100 kJ/mol and ΔS = 200 J/(mol K). Find crossover in K.", 500, "Convert entropy to kJ before dividing.", "Convert entropy to kJ before dividing. 100 / (200 / 1000) = 500 K."),
          pr("At 300 K, ΔG° = 0 and Q = 2. Use R = 8.314 J/(mol K). Find actual ΔG in kJ/mol.", 1.7288476977526155, "Include the present composition term.", "Include the present composition term. 8.314 × 300 × ln(2) / 1000 = 1.728848 kJ/mol."),
          pr("At 300 K, ΔG° = −5.00 kJ/mol. Use R = 8.314 J/(mol K). Find equilibrium constant K.", 7.423501082008594, "Rearrange the logarithmic equilibrium relation.", "Rearrange the logarithmic equilibrium relation. e^(5000/(8.314 × 300)) = 7.423501."),
        ],
      },
    ],
  },
  'mate-001': {
    predict: {
      "q": "The scene shows a bolo with a hard edge and a tougher back. If both regions are steel, what most plausibly gives them different behaviour?",
      "options": [
        "They contain different numbers of atoms",
        "Their colours directly set their strength",
        "The heavier steel is always the harder",
        "They were heated and cooled differently"
      ],
      "answer": 3,
      "reveal": "Different heating and cooling can change the arrangement inside the same steel. The processing can therefore give a hard cutting edge and a tougher back that resists breaking."
    },
    parts: [
      {
        title: "From making to using",
        minutes: 20,
        explain: [
          "A materials engineer connects four ideas. Processing means how something is made. Structure means what it is like inside. Properties describe what the material can do. Performance describes how the finished product works in its job.",
          "A smith heats and cools a bolo to change its inside, which changes how the edge resists wear. A bottle maker stretches hot plastic to change the arrangement of its long molecules. The product name alone does not tell the whole story.",
        ],
        formulas: [
          ["The chain of ideas","\\text{processing}\\to\\text{structure}\\to\\text{properties}\\to\\text{performance}"],
        ],
        examples: [
          ex("A workshop examines making, inside arrangement, material behaviour and service in use. How many stages does this cover?", [
            ["Count the four named stages.","N=1+1+1+1"],
            ["Substitute and calculate.","1 + 1 + 1 + 1 \\approx 4"],
          ], "4"),
          ex("Four products each have one processing observation and one performance observation. Find the total observations.", [
            ["Each product contributes two observations.","N=4\\times2"],
            ["Substitute and calculate.","4 \\times  2 \\approx 8"],
          ], "8"),
        ],
        practice: [
          pr("A team records one observation at each of four stages for two products. Find total observations.", 8, "Multiply stages by products.", "Multiply stages by products. 4 × 2 = 8."),
          pr("Three bolo blades each receive a heating step and a cooling step. Find the total steps counted.", 6, "Count two steps for every blade.", "Count two steps for every blade. 3 × 2 = 6."),
          pr("A class traces four stages for each of three products. Find total stage descriptions.", 12, "Multiply products by stages.", "Multiply products by stages. 3 × 4 = 12."),
          pr("A report needs four stages for each of four products. Twelve stage descriptions are complete. How many remain?", 4, "Find the full count, then subtract completed descriptions.", "Find the full count, then subtract completed descriptions. 4 × 4 − 12 = 4."),
        ],
      },
      {
        title: "Choosing for a job",
        minutes: 20,
        explain: [
          "Selection starts with the job. A cooking pot must carry food, survive heating and allow useful heat flow. A wire covering must keep electricity away from hands. A material can suit one job and fail another.",
          "A requirement is a condition a product must meet. Compare candidates under the same conditions, and reject any that fails a required condition. Only then compare things such as price, mass or ease of making. There is no single best material for every use.",
        ],
        formulas: [
          ["Total material cost","\\text{cost}=\\text{number of items}\\times\\text{cost per item}"],
        ],
        examples: [
          ex("A workshop needs 6 handles at ₱20 each. Find total handle cost in pesos.", [
            ["Multiply number needed by price each.","C=Np"],
            ["Substitute and calculate.","6 \\times  20 \\approx 120\\,\\text{pesos}"],
          ], "120 pesos"),
          ex("A candidate passes 3 of 4 required checks. How many required checks does it fail?", [
            ["Every required check must pass.","N_f=N-N_p"],
            ["Substitute and calculate.","4 - 3 \\approx 1"],
          ], "1"),
        ],
        practice: [
          pr("A school needs 5 sheets at ₱100 each. Find total cost in pesos.", 500, "Use quantity times price.", "Use quantity times price. 5 × 100 = 500 pesos."),
          pr("Candidate A passes all 4 requirements. Candidate B fails 1. Of these two, how many remain eligible?", 1, "Reject any candidate that fails a requirement.", "Reject any candidate that fails a requirement. 2 − 1 = 1."),
          pr("A handle option costs ₱30 each and another costs ₱20 each. For 8 handles, find extra cost of the dearer option in pesos.", 80, "Find the price difference for each handle first.", "Find the price difference for each handle first. 8 × (30 − 20) = 80 pesos."),
          pr("Twelve parts are needed. They are sold in packs of 3. How many packs are required?", 4, "Divide required parts by parts in a pack.", "Divide required parts by parts in a pack. 12 / 3 = 4."),
        ],
      },
      {
        title: "Making and checking quality",
        minutes: 20,
        explain: [
          "A material choice is only a start. Engineers also choose how to shape it and check whether each batch meets the requirements. A test compares a measured result with a stated target. Passing one test does not prove a product will survive every use.",
          "Good comparisons change one thing at a time. To compare cooling methods, start with the same steel and the same shape. Record what was changed and what was observed. Testing helps connect a making step with a useful property.",
        ],
        formulas: [
          ["Accepted parts","N_{\\rm accepted}=N_{\\rm made}-N_{\\rm rejected}"],
        ],
        examples: [
          ex("A batch has 20 parts and 3 fail inspection. How many are accepted?", [
            ["Remove the failed parts from the batch.","N_a=N-N_r"],
            ["Substitute and calculate.","20 - 3 \\approx 17"],
          ], "17"),
          ex("Two cooling methods are each tried on 4 identical blades. How many blades are tested?", [
            ["Use the same number for each method.","N=2\\times4"],
            ["Substitute and calculate.","2 \\times  4 \\approx 8"],
          ], "8"),
        ],
        practice: [
          pr("A batch has 12 tiles; 2 are cracked. How many intact tiles remain?", 10, "Subtract cracked tiles.", "Subtract cracked tiles. 12 − 2 = 10."),
          pr("Three batches each provide 2 samples. Find total samples tested.", 6, "Multiply batches by samples per batch.", "Multiply batches by samples per batch. 3 × 2 = 6."),
          pr("A factory needs 30 accepted parts. It has 24 accepted parts already. How many more accepted parts are needed?", 6, "Find the gap to the target.", "Find the gap to the target. 30 − 24 = 6."),
          pr("A test needs 18 specimens. Each sheet gives 3 usable specimens. How many sheets are needed?", 6, "Divide specimen count by yield per sheet.", "Divide specimen count by yield per sheet. 18 / 3 = 6."),
        ],
      },
      {
        title: "Investigating failure and using less",
        minutes: 20,
        explain: [
          "When a product breaks, ask where it broke, how it was used and how it was made. A crack may involve the material, the shape, the joining method or the service conditions. Evidence from several observations is stronger than a guess from appearance alone.",
          "Engineers also ask how to provide the same service with less waste. Reusing offcuts, repairing a product and recovering metal can save material. Count both useful output and waste so an apparent improvement does not merely move the waste somewhere else.",
        ],
        formulas: [
          ["Material balance","\\text{input}=\\text{useful output}+\\text{waste}"],
        ],
        examples: [
          ex("A shop uses 10 kg material and makes 8 kg useful parts. With no other output, find waste in kg.", [
            ["Subtract useful output from input.","m_w=m_i-m_u"],
            ["Substitute and calculate.","10 - 8 \\approx 2\\,\\text{kg}"],
          ], "2 kg"),
          ex("Six broken handles each need 2 observations. How many observations are needed?", [
            ["Give each failure the same inspection.","N=6\\times2"],
            ["Substitute and calculate.","6 \\times  2 \\approx 12"],
          ], "12"),
        ],
        practice: [
          pr("A 12 kg sheet gives 9 kg parts. Find offcut mass in kg.", 3, "Account for all the input mass.", "Account for all the input mass. 12 − 9 = 3 kg."),
          pr("A shop recovers 2 kg offcuts from each of 4 batches. Find recovered mass in kg.", 8, "Add equal recoveries by multiplying.", "Add equal recoveries by multiplying. 4 × 2 = 8 kg."),
          pr("One method wastes 4 kg per batch and another wastes 2 kg. For 5 batches, find material saved in kg.", 10, "Multiply the saving per batch by batch count.", "Multiply the saving per batch by batch count. 5 × (4 − 2) = 10 kg."),
          pr("A repair uses 2 kg new metal instead of replacing an entire 10 kg part. Find new metal avoided in kg.", 8, "Compare replacement and repair amounts.", "Compare replacement and repair amounts. 10 − 2 = 8 kg."),
        ],
      },
    ],
  },
  'mate-110': {
    predict: {
      "q": "In the family comparison, could a ceramic be stiffer than steel while still being easier to break when dropped?",
      "options": [
        "Yes, stiffness and toughness differ",
        "No, stiffness prevents cracking",
        "Only if the ceramic is heavier",
        "No, metals always rank stiffest"
      ],
      "answer": 0,
      "reveal": "Yes. Stiffness measures resistance to elastic stretching; toughness concerns energy absorbed before fracture. Strongly bonded ceramics can be very stiff yet let cracks run readily."
    },
    parts: [
      {
        title: "Families begin with bonding",
        minutes: 20,
        explain: [
          "Metals share mobile electrons, which help carry heat and electricity. Their atoms can often move past one another without immediate fracture. Ceramics use mainly ionic or covalent bonding and are often hard, stiff and heat resistant, but many crack with little warning.",
          "Polymers are long molecules whose movement depends on temperature and bonding between chains. Composites combine distinct constituents, such as fibres and resin. These are broad tendencies, not guarantees: graphite conducts, and a polymer may be stiff or rubbery depending on its structure and temperature.",
        ],
        formulas: [
          ["Mixture volume","V=V_1+V_2"],
          ["Constituent volume fraction","V_f=V_{\\rm constituent}/V_{\\rm total}"],
        ],
        examples: [
          ex("A composite contains 30 cm³ glass fibres and 70 cm³ resin. Find total volume in cm³, assuming volumes add.", [
            ["Add the constituent volumes.","V=V_f+V_m"],
            ["Substitute and calculate.","30 + 70 \\approx 100\\,\\mathrm{cm^3}"],
          ], "100 cm³"),
          ex("The same composite has 30 cm³ fibres in 100 cm³ total. Find fibre volume fraction.", [
            ["Divide fibre volume by total volume.","f=V_f/V"],
            ["Substitute and calculate.","30 / 100 \\approx 0.3"],
          ], "0.3"),
        ],
        practice: [
          pr("A set contains steel, copper, glass and polyethylene. How many of these are metals?", 2, "Steel and copper belong to the metal family.", "Steel and copper belong to the metal family. 1 + 1 = 2."),
          pr("A composite has fibre volume fraction 0.40. Find matrix volume fraction, assuming only two constituents.", 0.6, "The fractions add to one.", "The fractions add to one. 1 − 0.40 = 0.6."),
          pr("A two-constituent composite has 200 cm³ total volume and fibre fraction 0.25. Find fibre volume in cm³.", 50, "Multiply total volume by the fraction.", "Multiply total volume by the fraction. 0.25 × 200 = 50 cm³."),
          pr("A 50 cm³ composite has 15 cm³ fibres and only resin otherwise. Find resin volume in cm³.", 35, "Subtract the fibres from total volume.", "Subtract the fibres from total volume. 50 − 15 = 35 cm³."),
        ],
      },
      {
        title: "Density and equal-size comparisons",
        minutes: 20,
        explain: [
          "Density is mass divided by volume. Compare equal volumes when asking which material is heavier for the same size. Typical rounded densities are about 7.8 g/cm³ for steel, 2.7 for aluminium and roughly 1 for many polymers, with substantial variation between grades.",
          "A light material is not automatically the best design. It may need more volume to carry the load. Start with a fair comparison, then check strength, temperature and the intended service. Here the supplied densities are rounded teaching values rather than specifications for a purchase.",
        ],
        formulas: [
          ["Density","\\rho=m/V"],
          ["Mass","m=\\rho V"],
        ],
        examples: [
          ex("Use steel density 7.8 g/cm³. Find the mass of 10 cm³ steel in g.", [
            ["Multiply density by volume.","m=\\rho V"],
            ["Substitute and calculate.","7.8 \\times  10 \\approx 78\\,\\text{g}"],
          ], "78 g"),
          ex("An aluminium part has mass 54 g and density 2.7 g/cm³. Find volume in cm³.", [
            ["Divide mass by density.","V=m/\\rho"],
            ["Substitute and calculate.","54 / 2.7 \\approx 20\\,\\mathrm{cm^3}"],
          ], "20 cm³"),
        ],
        practice: [
          pr("A polymer has mass 20 g in 20 cm³. Find density in g/cm³.", 1, "Use mass per volume.", "Use mass per volume. 20 / 20 = 1 g/cm³."),
          pr("Use aluminium density 2.7 g/cm³. Find mass of 20 cm³ in g.", 54, "Use the given grade density.", "Use the given grade density. 2.7 × 20 = 54 g."),
          pr("Equal 10 cm³ parts use steel at 7.8 or aluminium at 2.7 g/cm³. Find the mass saved by aluminium in g.", 51, "Multiply the density difference by the common volume.", "Multiply the density difference by the common volume. (7.8 − 2.7) × 10 = 51 g."),
          pr("A metal part is 78 g at 7.8 g/cm³. A same-volume polymer is 1.2 g/cm³. Find polymer part mass in g.", 12, "Find the shared volume first.", "Find the shared volume first. 1.2 × (78 / 7.8) = 12 g."),
        ],
      },
      {
        title: "Reading a property comparison",
        minutes: 25,
        explain: [
          "Stiffness measures resistance to elastic shape change. Hardness measures resistance to a permanent dent or scratch. Toughness measures energy absorbed before fracture. These describe different tests, so a material can score highly on one and poorly on another.",
          "A property chart can use ordinary spacing or powers of ten. On a powers-of-ten scale, equal steps mean equal ratios, not equal additions. Also check the property name: high heat conduction is useful in a heat sink but unwelcome in an insulating handle. Glass has a softening range rather than one sharp melting point.",
        ],
        formulas: [
          ["Property ratio","r=P_A/P_B"],
          ["One decade","P_{j+1}=10P_j"],
        ],
        examples: [
          ex("Given stiffness values 200 GPa for steel and 2 GPa for a polymer, find steel-to-polymer stiffness ratio.", [
            ["Compare the same property in matching units.","r=E_s/E_p"],
            ["Substitute and calculate.","200 / 2 \\approx 100"],
          ], "100"),
          ex("A property rises from 1 to 100 across two equal steps on a powers-of-ten scale. What multiplication occurs at each step?", [
            ["Two equal multipliers must give one hundred.","r^2=100"],
            ["Substitute and calculate.","\\sqrt{100} \\approx 10"],
          ], "10"),
        ],
        practice: [
          pr("Given aluminium stiffness 70 GPa and a polymer stiffness 3.5 GPa, find their ratio.", 20, "Divide the larger stiffness by the smaller.", "Divide the larger stiffness by the smaller. 70 / 3.5 = 20."),
          pr("Given heat conductivities 200 and 0.2 W/(m K), find their ratio.", 1000, "Compare matching units.", "Compare matching units. 200 / 0.2 = 1000."),
          pr("A chart mark is 10 GPa. Move one decade upward. What stiffness is reached in GPa?", 100, "One decade multiplies by ten.", "One decade multiplies by ten. 10 × 10 = 100 GPa."),
          pr("A design must survive 150 °C. Candidate softening limits are 100, 120, 200 and 300 °C. Using only this screen, how many candidates have limits strictly above service temperature?", 2, "Count only the two limits above the target.", "Count only the two limits above the target. 1 + 1 = 2."),
        ],
      },
      {
        title: "Composites and choosing by service",
        minutes: 25,
        explain: [
          "A composite has a reinforcing constituent and a surrounding matrix that transfers load and holds the reinforcement in place. Strong fibres help most along their length. A result measured along fibres should not be used as though the material behaves identically in every direction.",
          "For aligned continuous fibres loaded along their length with equal strain and good bonding, a simple stiffness estimate is E = V_fE_f + V_mE_m. Volume fractions add to one. Real design also checks cracks, joints, moisture, manufacture and cost; the estimate is one step in selection.",
        ],
        formulas: [
          ["Longitudinal rule of mixtures","E_L=V_fE_f+(1-V_f)E_m"],
          ["Density, additive volumes","\\rho_c=V_f\\rho_f+(1-V_f)\\rho_m"],
        ],
        examples: [
          ex("An ideal aligned composite has fibre fraction 0.5, fibre stiffness 70 GPa and matrix stiffness 3 GPa. Find longitudinal stiffness in GPa.", [
            ["Weight each stiffness by its volume share.","E_L=V_fE_f+V_mE_m"],
            ["Substitute and calculate.","0.5 \\times  70 + 0.5 \\times  3 \\approx 36.5\\,\\text{GPa}"],
          ], "36.5 GPa"),
          ex("A composite has 0.4 fibre fraction, fibre density 2.5 and matrix density 1.2 g/cm³. Assume additive volumes. Find density in g/cm³.", [
            ["Use the remaining fraction for matrix.","\\rho_c=V_f\\rho_f+(1-V_f)\\rho_m"],
            ["Substitute and calculate.","0.4 \\times  2.5 + 0.6 \\times  1.2 \\approx 1.72\\,\\mathrm{g/cm^3}"],
          ], "1.72 g/cm³"),
        ],
        practice: [
          pr("A two-constituent composite has fibre fraction 0.3. Find matrix fraction.", 0.7, "Subtract from one.", "Subtract from one. 1 − 0.3 = 0.7."),
          pr("Under the ideal equal-strain model, Vf = 0.2, Ef = 100 GPa and Em = 5 GPa. Find longitudinal stiffness in GPa.", 24, "Use the weighted sum.", "Use the weighted sum. 0.2 × 100 + 0.8 × 5 = 24 GPa."),
          pr("Assume additive volumes and equal constituent volumes. Densities are 2.0 and 1.0 g/cm³. Find composite density in g/cm³.", 1.5, "Each constituent has fraction one half.", "Each constituent has fraction one half. 0.5 × 2.0 + 0.5 × 1.0 = 1.5 g/cm³."),
          pr("An ideal aligned composite has EL = 22 GPa, Em = 2 GPa and Ef = 102 GPa. Find fibre volume fraction.", 0.2, "Rearrange the mixture equation.", "Rearrange the mixture equation. (22 − 2) / (102 − 2) = 0.2."),
        ],
      },
    ],
  },
  'mate-102': {
    predict: {
      "q": "An FCC cube shows eight corner spheres and six face spheres. Once neighbouring cubes claim their shares, how many whole atoms belong to this one cube?",
      "options": [
        "Fourteen atoms",
        "Four atoms",
        "Eight atoms",
        "Two atoms"
      ],
      "answer": 1,
      "reveal": "Four atoms belong to the cube. Each corner contributes one eighth and each face contributes one half; visible spheres are shared with neighbouring cells."
    },
    parts: [
      {
        title: "A repeating cell and shared atoms",
        minutes: 20,
        explain: [
          "A crystal repeats a regular pattern in space. A unit cell is a box whose repeated copies build that pattern. The drawn spheres at its boundary are shared with neighbouring boxes; they do not all belong fully to one box.",
          "In a cubic lattice, each corner atom is shared by eight cells and each face atom by two. A body-centred atom belongs wholly to its cell. Simple cubic has corners only; body-centred cubic adds a centre; face-centred cubic adds face atoms. Count effective whole atoms before calculating a metal’s density.",
        ],
        formulas: [
          ["Effective atoms","n=N_c/8+N_f/2+N_b"],
        ],
        examples: [
          ex("A simple cubic cell has 8 corner atoms only. Find effective atoms per cell.", [
            ["Each corner contributes one eighth.","n=N_c/8"],
            ["Substitute and calculate.","8 / 8 \\approx 1"],
          ], "1"),
          ex("A BCC cell has 8 corners and 1 interior atom. Find effective atoms per cell.", [
            ["Add the whole interior atom to the corner shares.","n=N_c/8+N_b"],
            ["Substitute and calculate.","8 / 8 + 1 \\approx 2"],
          ], "2"),
        ],
        practice: [
          pr("How many whole atoms do 6 face-centred atoms contribute to one FCC cell?", 3, "Each face atom is shared by two cells.", "Each face atom is shared by two cells. 6 / 2 = 3."),
          pr("An FCC cell has 8 corners and 6 faces. Find effective atoms per cell.", 4, "Combine corner and face contributions.", "Combine corner and face contributions. 8 / 8 + 6 / 2 = 4."),
          pr("How many effective atoms belong to 10 BCC cells in a bulk crystal?", 20, "Use two effective atoms per cell.", "Use two effective atoms per cell. 2 × 10 = 20."),
          pr("A bulk region contains 24 effective atoms in FCC cells. How many cells does this represent?", 6, "Divide by atoms per FCC cell.", "Divide by atoms per FCC cell. 24 / 4 = 6."),
        ],
      },
      {
        title: "Where neighbouring spheres touch",
        minutes: 25,
        explain: [
          "Atomic radius r and cube edge a are linked by where spheres touch in the ideal hard-sphere model. Simple cubic spheres touch along an edge. In BCC they touch along a body diagonal, from one corner through the centre to the opposite corner.",
          "In FCC they touch along a face diagonal. Pythagoras gives a face diagonal of √2a and a body diagonal of √3a. Either touching diagonal covers four radii. Keep radius and edge in the same units. These relations turn an atomic length into a measurable cell size.",
        ],
        formulas: [
          ["Simple cubic","a=2r"],
          ["BCC","a=4r/\\sqrt3"],
          ["FCC","a=2\\sqrt2r"],
        ],
        examples: [
          ex("In a simple cubic hard-sphere model, r = 0.150 nm. Find a in nm.", [
            ["Touching neighbours span two radii along an edge.","a=2r"],
            ["Substitute and calculate.","2 \\times  0.150 \\approx 0.3\\,\\text{nm}"],
          ], "0.3 nm"),
          ex("In an FCC model, r = 0.128 nm. Find edge length a in nm.", [
            ["Use the touching face diagonal.","a=2\\sqrt2r"],
            ["Substitute and calculate.","2 \\times  \\sqrt{2} \\times  0.128 \\approx 0.3620387\\,\\text{nm}"],
          ], "0.3620387 nm"),
        ],
        practice: [
          pr("A simple cubic cell edge is 0.300 nm. Find radius in nm.", 0.15, "Halve the touching edge.", "Halve the touching edge. 0.300 / 2 = 0.15 nm."),
          pr("BCC has r = 0.124 nm. Find a in nm.", 0.2863657335180544, "Four radii span the body diagonal.", "Four radii span the body diagonal. 4 × 0.124 / √(3) = 0.2863657 nm."),
          pr("FCC edge a = 0.400 nm. Find radius in nm.", 0.1414213562373095, "Rearrange the face-diagonal relation.", "Rearrange the face-diagonal relation. 0.400 / (2 × √(2)) = 0.1414214 nm."),
          pr("BCC edge a = 0.286 nm. Find body diagonal in nm.", 0.49536653096469885, "Use Pythagoras across three perpendicular edges.", "Use Pythagoras across three perpendicular edges. √(3) × 0.286 = 0.4953665 nm."),
        ],
      },
      {
        title: "Packing and nearest neighbours",
        minutes: 25,
        explain: [
          "Atomic packing factor is the fraction of cell volume occupied by the hard spheres. Add the volumes of the effective atoms and divide by the cube volume. The leftover fraction is space between spheres in this model, not a set of macroscopic holes.",
          "Simple cubic, BCC and FCC have different touching patterns. Their coordination numbers, the numbers of nearest neighbours to an atom, are six, eight and twelve respectively. FCC packs identical touching spheres more closely than BCC. Packing alone does not determine density: atom mass and radius also matter.",
        ],
        formulas: [
          ["Packing factor","\\mathrm{APF}=\\frac{n(4\\pi r^3/3)}{a^3}"],
          ["Unfilled fraction","f_{\\rm empty}=1-\\mathrm{APF}"],
        ],
        examples: [
          ex("For simple cubic use n = 1, r = 1 and a = 2 in matching arbitrary units. Find packing factor.", [
            ["Divide one sphere volume by cube volume.","\\mathrm{APF}=n(4\\pi r^3/3)/a^3"],
            ["Substitute and calculate.","(4 \\times  \\pi / 3) / 2^3 \\approx 0.5235988"],
          ], "0.5235988"),
          ex("For BCC use n = 2, r = 1, a = 4/√3. Find packing factor.", [
            ["Count both effective spheres.","\\mathrm{APF}=n(4\\pi r^3/3)/a^3"],
            ["Substitute and calculate.","2 \\times  (4 \\times  \\pi / 3) / (4/\\sqrt{3})^3 \\approx 0.6801748"],
          ], "0.6801748"),
        ],
        practice: [
          pr("Use rounded FCC packing factor 0.74. Find unfilled percentage.", 26, "Subtract occupied fraction from one.", "Subtract occupied fraction from one. 100 × (1 − 0.74) = 26 %."),
          pr("Use rounded BCC packing factor 0.68. Find occupied volume in a 100 nm³ region, in nm³.", 68, "Multiply region volume by occupied fraction.", "Multiply region volume by occupied fraction. 0.68 × 100 = 68 nm³."),
          pr("For FCC use n = 4, r = 1, a = 2√2. Find packing factor.", 0.7404804896930608, "Use the FCC effective atom count and touching edge.", "Use the FCC effective atom count and touching edge. 4 × (4 × π / 3) / (2√(2))^3 = 0.7404805."),
          pr("FCC has 12 nearest neighbours and BCC has 8. How many more does FCC have?", 4, "Compare neighbour counts, not atoms per cell.", "Compare neighbour counts, not atoms per cell. 12 − 8 = 4."),
        ],
      },
      {
        title: "Density from a very small box",
        minutes: 30,
        explain: [
          "A unit cell has mass nM/Nₐ, where M is molar mass in g/mol and Nₐ is Avogadro’s constant. Divide this mass by cell volume a³ to get density. This links a crystal picture to the mass of a real piece of metal.",
          "Use centimetres for a if density is wanted in g/cm³. One nanometre is 10⁻⁷ cm, so cubing that conversion is essential. The result is the ideal density of a perfect crystal at the stated edge length; porosity and temperature can change a measured bulk density.",
        ],
        formulas: [
          ["Theoretical density","\\rho=\\frac{nM}{N_Aa^3}"],
          ["Length conversion","1\\,\\mathrm{nm}=10^{-7}\\,\\mathrm{cm}"],
        ],
        examples: [
          ex("An FCC copper model uses n = 4, M = 63.55 g/mol, a = 0.361 nm and Nₐ = 6.022 × 10²³ mol⁻¹. Find density in g/cm³.", [
            ["Convert the edge to cm before cubing.","\\rho=nM/(N_Aa^3)"],
            ["Substitute and calculate.","4 \\times  63.55 / (6.022 \\times  10^{23} \\times  (0.361 \\times  10^{-7})^3) \\approx 8.972494\\,\\mathrm{g/cm^3}"],
          ], "8.972494 g/cm³"),
          ex("A BCC iron model uses n = 2, M = 55.85 g/mol, a = 0.2866 nm and Nₐ = 6.022 × 10²³ mol⁻¹. Find density in g/cm³.", [
            ["Use the BCC effective atom count.","\\rho=nM/(N_Aa^3)"],
            ["Substitute and calculate.","2 \\times  55.85 / (6.022 \\times  10^{23} \\times  (0.2866 \\times  10^{-7})^3) \\approx 7.879232\\,\\mathrm{g/cm^3}"],
          ], "7.879232 g/cm³"),
        ],
        practice: [
          pr("A cube edge is 0.400 nm. Find cell volume in nm³.", 0.06400000000000002, "Cube the edge.", "Cube the edge. 0.400^3 = 0.064 nm³."),
          pr("Convert 0.400 nm to a number of units of 10⁻⁷ cm.", 0.4, "One nanometre equals one unit of 10⁻⁷ cm.", "One nanometre equals one unit of 10⁻⁷ cm. (0.400 × 10^(-7)) / 10^(-7) = 0.4 units of 10⁻⁷ cm."),
          pr("Find mass per FCC gold cell using n = 4, M = 197 g/mol and Nₐ = 6.022 × 10²³ mol⁻¹, in units of 10⁻²¹ g.", 1.3085353703088676, "Divide the molar mass of four atoms by Avogadro’s constant.", "Divide the molar mass of four atoms by Avogadro’s constant. (4 × 197 / (6.022 × 10^(23))) / 10^(-21) = 1.308535 units of 10⁻²¹ g."),
          pr("An FCC aluminium model uses n = 4, M = 26.98 g/mol, a = 0.405 nm and Nₐ = 6.022 × 10²³ mol⁻¹. Find density in g/cm³.", 2.6977153050456426, "Find mass per cell and divide by the converted cell volume.", "Find mass per cell and divide by the converted cell volume. 4 × 26.98 / (6.022 × 10^(23) × (0.405 × 10^(-7))^3) = 2.697715 g/cm³."),
        ],
      },
    ],
  },
  'mate-111': {
    predict: {
      "q": "In the cubic-cell scene, a plane cuts x and y but runs parallel to z. What must the third Miller number be?",
      "options": [
        "One, for one vertical wall",
        "Two, for two crossed axes",
        "Zero, for no z intercept",
        "Three, for a three-dimensional cube"
      ],
      "answer": 2,
      "reveal": "It is zero. A parallel plane never meets the z axis, so its intercept is treated as infinite and its reciprocal is zero."
    },
    parts: [
      {
        title: "Intercepts become a plane name",
        minutes: 25,
        explain: [
          "A crystal plane is a flat slice through a crystal. Its intercept is where it meets an axis. Measure intercepts in cell lengths, take their reciprocals and clear fractions to describe the orientation with small whole numbers (hkl). The letters correspond to x, y and z.",
          "A plane parallel to an axis has no finite intercept on that axis; its reciprocal contributes zero. A negative intercept gives a negative Miller number, usually shown with a bar. Do not use (000): it describes no plane. Translating a plane away from the origin makes its intercepts easier to read.",
        ],
        formulas: [
          ["Reciprocal intercepts","(h:k:l)=(1/p:1/q:1/r)"],
          ["Parallel axis","1/\\infty=0"],
        ],
        examples: [
          ex("A plane cuts x at 1 cell length and is parallel to y and z. Find h in its simplest Miller name.", [
            ["Take the reciprocal of the finite intercept.","h=1/p"],
            ["Substitute and calculate.","1 / 1 \\approx 1"],
          ], "1"),
          ex("Intercepts are x = 2, y = 1 and z = ∞, in cell lengths. After reciprocals and clearing fractions, find h.", [
            ["Multiply all reciprocal intercepts by two.","h=2(1/2)"],
            ["Substitute and calculate.","2 \\times  (1 / 2) \\approx 1"],
          ], "1"),
        ],
        practice: [
          pr("A plane has intercepts x = 1, y = 1, z = ∞. What is l?", 0, "Parallel to z means zero reciprocal contribution.", "Parallel to z means zero reciprocal contribution. 1 / ∞ = 0.", { tol: 0.000001 }),
          pr("Intercepts are x = 1, y = 2, z = ∞. Clear reciprocal fractions. What is h?", 2, "Multiply the reciprocal triple by two.", "Multiply the reciprocal triple by two. 2 × (1 / 1) = 2."),
          pr("Intercepts are x = 2, y = 3, z = ∞. Use the smallest integer reciprocal triple. Find k.", 2, "Clear halves and thirds with a common factor of six.", "Clear halves and thirds with a common factor of six. 6 / 3 = 2."),
          pr("Intercepts are x = −1, y = 1, z = ∞. Find signed h in the simplest Miller name.", -1, "Keep the sign when taking a reciprocal.", "Keep the sign when taking a reciprocal. 1 / (−1) = -1."),
        ],
      },
      {
        title: "Seeing slices inside the cube",
        minutes: 25,
        explain: [
          "For a cubic cell, use fractional coordinates X = x/a, Y = y/a and Z = z/a. A representative plane satisfies hX + kY + lZ = 1. Setting two coordinates to zero gives an axis intercept. If its coefficient is zero, that axis is parallel to the plane.",
          "The (100) slice is a cube face, (110) is a diagonal wall and (111) cuts a triangle through three axes. Parallel slices can represent the same orientation. In diffraction, labels such as (200) retain their higher order and spacing; do not reduce them as though they were merely an orientation name.",
        ],
        formulas: [
          ["Representative cubic plane","hX+kY+lZ=1"],
          ["Finite x intercept","X=1/h\\quad(h\\ne0)"],
        ],
        examples: [
          ex("For the representative (200) plane, find x intercept in cell lengths.", [
            ["Set the other coordinates to zero.","X=1/h"],
            ["Substitute and calculate.","1 / 2 \\approx 0.5"],
          ], "0.5"),
          ex("The (111) plane contains X = 0.2 and Y = 0.3. Find Z.", [
            ["Make the coordinate sum equal one.","Z=1-X-Y"],
            ["Substitute and calculate.","1 - 0.2 - 0.3 \\approx 0.5"],
          ], "0.5"),
        ],
        practice: [
          pr("For the representative (100) plane, find x intercept in cell lengths.", 1, "Use the reciprocal of h.", "Use the reciprocal of h. 1 / 1 = 1."),
          pr("For the representative (120) plane, find y intercept in cell lengths.", 0.5, "Use the reciprocal of k.", "Use the reciprocal of k. 1 / 2 = 0.5."),
          pr("On the (110) plane, X = 0.25. Find Y.", 0.75, "The z term is zero.", "The z term is zero. 1 − 0.25 = 0.75."),
          pr("On the representative (211) plane, X = 0.20 and Y = 0.30. Find Z.", 0.3, "Include the factor two on X.", "Include the factor two on X. 1 − 2 × 0.20 − 0.30 = 0.3."),
        ],
      },
      {
        title: "Directions and the normal to a plane",
        minutes: 25,
        explain: [
          "A direction describes an arrow rather than a slice. Write it in square brackets [uvw]. Find its components along the crystal axes, then multiply or divide all components by the same positive number to get small integers. Reversing all signs reverses the arrow.",
          "In a cubic crystal, [hkl] is perpendicular to (hkl). This perpendicular direction is called the normal. Dot products can test whether a direction lies within a plane: a zero dot product with the normal means it does. This simple matching rule does not hold unchanged for all crystal shapes.",
        ],
        formulas: [
          ["Cubic plane normal","\\mathbf n\\parallel[hkl]"],
          ["Direction lies in plane","hu+kv+lw=0"],
        ],
        examples: [
          ex("An arrow goes from (0,0,0) to (2,2,0). Reduce its direction to smallest integers. Find u.", [
            ["Divide all components by their common factor.","u=2/2"],
            ["Substitute and calculate.","2 / 2 \\approx 1"],
          ], "1"),
          ex("For normal [111] and direction [1,−1,0], find their dot product.", [
            ["Multiply matching components and add.","s=hu+kv+lw"],
            ["Substitute and calculate.","1 \\times  1 + 1 \\times  (-1) + 1 \\times  0 \\approx 0"],
          ], "0"),
        ],
        practice: [
          pr("What is w in the cubic normal [110] to plane (110)?", 0, "The normal uses the three plane numbers.", "The normal uses the three plane numbers. 0 + 0 = 0.", { tol: 0.000001 }),
          pr("A direction goes from (0,0,0) to (4,2,0). Reduce to smallest integers. Find u.", 2, "Divide all components by two.", "Divide all components by two. 4 / 2 = 2."),
          pr("Find the dot product of [100] and [011].", 0, "Multiply matching components.", "Multiply matching components. 1 × 0 + 0 × 1 + 0 × 1 = 0.", { tol: 0.000001 }),
          pr("The vector [111] has three unit components along perpendicular cubic axes. Find its length in cell-edge units.", 1.7320508075688772, "Use Pythagoras in three dimensions.", "Use Pythagoras in three dimensions. √(1^2+1^2+1^2) = 1.732051."),
        ],
      },
      {
        title: "Plane spacing and useful orientations",
        minutes: 25,
        explain: [
          "For a cubic crystal, labelled plane spacing is d = a/√(h² + k² + l²). A larger sum of squared labels means smaller spacing. This formula is geometric; an actual diffraction peak also depends on which atoms occupy the cell.",
          "Orientation matters in engineering. FCC metals commonly slip along close-packed directions in {111} planes, while silicon wafers are supplied with specified surface orientations. Parentheses name a plane orientation; braces group symmetry-related orientations. Use the cell edge and plane label together when reporting a spacing.",
        ],
        formulas: [
          ["Cubic spacing","d_{hkl}=a/\\sqrt{h^2+k^2+l^2}"],
          ["Cell edge from spacing","a=d_{hkl}\\sqrt{h^2+k^2+l^2}"],
        ],
        examples: [
          ex("A cubic crystal has a = 0.400 nm. Find d₁₁₀ in nm.", [
            ["Use the sum of squared plane labels.","d=a/\\sqrt{h^2+k^2+l^2}"],
            ["Substitute and calculate.","0.400 / \\sqrt{1+1} \\approx 0.2828427\\,\\text{nm}"],
          ], "0.2828427 nm"),
          ex("Copper has rounded a = 0.361 nm. Find d₁₁₁ in nm.", [
            ["All three labels contribute one to the square sum.","d_{111}=a/\\sqrt3"],
            ["Substitute and calculate.","0.361 / \\sqrt{3} \\approx 0.2084234\\,\\text{nm}"],
          ], "0.2084234 nm"),
        ],
        practice: [
          pr("A cubic crystal has a = 0.400 nm. Find d₁₀₀ in nm.", 0.4, "The square sum is one.", "The square sum is one. 0.400 / √(1) = 0.4 nm."),
          pr("For a = 0.400 nm, find d₂₀₀ in nm.", 0.2, "Keep the label two when finding this spacing.", "Keep the label two when finding this spacing. 0.400 / 2 = 0.2 nm."),
          pr("A cubic sample has d₂₀₀ = 0.180 nm. Find a in nm.", 0.36, "Undo division by two.", "Undo division by two. 2 × 0.180 = 0.36 nm."),
          pr("For one cubic crystal, find d₁₀₀/d₁₁₁.", 1.7320508075688772, "The common cell edge cancels.", "The common cell edge cancels. √(3) = 1.732051."),
        ],
      },
    ],
  },
  'mate-113': {
    predict: {
      "q": "In the copper defect scene, heating makes the atoms shake more. What should happen to the fraction of empty lattice sites before melting?",
      "options": [
        "It falls as gaps close",
        "It stays fixed by the lattice",
        "It becomes exactly zero",
        "It rises sharply with heat"
      ],
      "answer": 3,
      "reveal": "The equilibrium vacancy fraction rises sharply. Making a vacancy costs energy, but at higher temperature the many possible arrangements containing vacancies become more important."
    },
    parts: [
      {
        title: "Counting departures from a perfect pattern",
        minutes: 20,
        explain: [
          "A vacancy is an empty regular atom site. A substitutional atom replaces a host atom on a regular site. An interstitial sits between the regular sites. These point defects disturb their neighbours, but they can make useful alloys rather than simply ruin a crystal.",
          "Count regular sites separately from atoms. Moving an atom from a regular site into a gap makes a vacancy and an interstitial together without removing an atom. In ionic crystals, combinations of defects must also preserve electrical neutrality over the sample.",
        ],
        formulas: [
          ["Occupied regular sites","N_o=N_s-N_v"],
          ["Atoms including interstitials","N_a=N_o+N_i"],
        ],
        examples: [
          ex("A model has 100 regular sites and 3 vacancies. How many regular sites are occupied?", [
            ["Subtract empty sites from regular sites.","N_o=N_s-N_v"],
            ["Substitute and calculate.","100 - 3 \\approx 97"],
          ], "97"),
          ex("A model has 100 regular sites, 2 vacancies and 2 interstitial atoms. Find total atoms.", [
            ["Add the interstitials after subtracting vacancies.","N_a=N_s-N_v+N_i"],
            ["Substitute and calculate.","100 - 2 + 2 \\approx 100"],
          ], "100"),
        ],
        practice: [
          pr("A model has 80 regular sites and 4 vacancies. Find occupied regular sites.", 76, "Remove the empty sites.", "Remove the empty sites. 80 − 4 = 76."),
          pr("A fully occupied 100-site model has 5 substitutional atoms. Find host atoms.", 95, "Foreign atoms replace host atoms.", "Foreign atoms replace host atoms. 100 − 5 = 95."),
          pr("A 200-site model has 4 vacancies. Find vacancy fraction.", 0.02, "Divide vacancy count by regular-site count.", "Divide vacancy count by regular-site count. 4 / 200 = 0.02."),
          pr("Three host atoms move from regular sites into gaps without leaving the sample. How many point defects are created, counting vacancies and interstitials separately?", 6, "Each move makes a pair.", "Each move makes a pair. 2 × 3 = 6."),
        ],
      },
      {
        title: "Vacancies multiply as temperature rises",
        minutes: 25,
        explain: [
          "At equilibrium, a simple vacancy model gives nᵥ/N = exp(−Qᵥ/kT). Qᵥ is the energy to form a vacancy, k is Boltzmann’s constant and T is in kelvin. Use eV for Qᵥ if k is given in eV/K. The model neglects some finer corrections.",
          "The negative exponent becomes less negative as temperature rises, so the vacancy fraction increases. Multiply this fraction by the number of regular sites to find an expected vacancy count. It is a statistical average; a tiny piece need not contain that exact count. Vacancies help atoms change places during diffusion.",
        ],
        formulas: [
          ["Equilibrium vacancy fraction","f_v=e^{-Q_v/(kT)}"],
          ["Expected vacancies","n_v=Nf_v"],
        ],
        examples: [
          ex("Use Qᵥ = 0.9 eV, k = 8.62 × 10⁻⁵ eV/K and T = 1000 K. Find vacancy fraction in the simple model.", [
            ["Keep energy and temperature units consistent.","f_v=e^{-Q_v/(kT)}"],
            ["Substitute and calculate.","e^{-0.9/(8.62 \\times  10^{-5} \\times  1000)} \\approx 0.0000292148"],
          ], "0.0000292148"),
          ex("A region has 10¹² regular sites and vacancy fraction 0.000020. Find expected vacancies.", [
            ["Multiply sites by fraction.","n_v=Nf_v"],
            ["Substitute and calculate.","10^{12} \\times  0.000020 \\approx 20000000"],
          ], "20000000"),
        ],
        practice: [
          pr("A model has 10⁸ sites and vacancy fraction 0.000001. Find expected vacancies.", 100, "Use the fraction of all regular sites.", "Use the fraction of all regular sites. 10^8 × 10^(-6) = 100."),
          pr("Using Qᵥ = 0.9 eV and k = 8.62 × 10⁻⁵ eV/K, find vacancy fraction at 600 K in units of 10⁻⁹ (so 10⁻⁹ would be entered as 1).", 27.7122270508186, "Use the absolute temperature in the exponent.", "Use the absolute temperature in the exponent. e^(-0.9/(8.62 × 10^(-5) × 600))/10^(-9) = 27.71223."),
          pr("Using the same Qᵥ and k, find vacancy fraction at 1200 K.", 0.0001664698983324571, "A hotter crystal has a less negative exponent.", "A hotter crystal has a less negative exponent. e^(-0.9/(8.62 × 10^(-5) × 1200)) = 0.0001664699.", { tol: 8.323494916622854e-7 }),
          pr("For the same model, find fᵥ(1200 K)/fᵥ(600 K), using Qᵥ = 0.9 eV and k = 8.62 × 10⁻⁵ eV/K.", 6007.092032956622, "Divide the two exponential fractions.", "Divide the two exponential fractions. e^((0.9/(8.62 × 10^(-5)))(1/600-1/1200)) = 6007.092."),
        ],
      },
      {
        title: "Impurities, strain and moving lines",
        minutes: 25,
        explain: [
          "Substitutional mixing is easier when atom sizes and crystal structures are similar. A useful size guide compares the absolute radius difference with the host radius. A mismatch below roughly 15% helps, but it does not alone guarantee complete solubility; chemistry and temperature matter too.",
          "A dislocation is a line defect that lets neighbouring regions slip by successive small movements. Solute atoms distort the crystal and can impede that motion, strengthening the metal. Carbon in iron is an interstitial example; nickel replacing copper is substitutional. Stronger does not always mean tougher or more corrosion resistant.",
        ],
        formulas: [
          ["Radius mismatch","\\delta=100|r_s-r_h|/r_h"],
          ["Atomic percentage","x_s=100N_s/(N_s+N_h)"],
        ],
        examples: [
          ex("Copper host radius is 0.128 nm and nickel solute radius is 0.125 nm. Find radius mismatch in percent.", [
            ["Use absolute difference divided by host radius.","\\delta=100|r_s-r_h|/r_h"],
            ["Substitute and calculate.","100 \\times  |0.125 - 0.128| / 0.128 \\approx 2.34375\\,\\%"],
          ], "2.34375 %"),
          ex("A model alloy has 20 solute and 980 host atoms. Find atomic percent solute.", [
            ["Use all atoms in the denominator.","x_s=100N_s/(N_s+N_h)"],
            ["Substitute and calculate.","100 \\times  20 / (20 + 980) \\approx 2\\,\\%"],
          ], "2 %"),
        ],
        practice: [
          pr("Host radius is 0.100 nm and solute radius is 0.110 nm. Find mismatch in percent.", 9.999999999999995, "Compare difference with host size.", "Compare difference with host size. 100 × |0.110 − 0.100| / 0.100 = 10 %."),
          pr("An alloy model has 10 solute and 190 host atoms. Find atomic percent solute.", 5, "Divide solute by total atoms.", "Divide solute by total atoms. 100 × 10 / (10 + 190) = 5 %."),
          pr("Host radius is 0.128 nm and solute radius is 0.175 nm. Find mismatch in percent.", 36.718749999999986, "Keep the host radius in the denominator.", "Keep the host radius in the denominator. 100 × |0.175 − 0.128| / 0.128 = 36.71875 %."),
          pr("An alloy model has 500 occupied regular sites; 8% hold solute atoms. Find host atom count.", 460, "Subtract the solute share from the occupied count.", "Subtract the solute share from the occupied count. 500 × (1 − 0.08) = 460."),
        ],
      },
      {
        title: "Grain boundaries can raise strength",
        minutes: 25,
        explain: [
          "A grain is a small crystal region with one orientation. Where differently oriented grains meet, a grain boundary interrupts the regular pattern. Boundaries obstruct dislocation motion. For many ordinary grain sizes, refining grains therefore raises the stress needed for permanent deformation.",
          "The Hall–Petch relation estimates yield stress as σᵧ = σ₀ + kᵧ/√d. Here d is grain size, σ₀ is a base stress and kᵧ is a fitted constant. Its units must match the chosen length units. The relation has limits, especially for extremely tiny grains and when other strengthening mechanisms change.",
        ],
        formulas: [
          ["Hall–Petch relation","\\sigma_y=\\sigma_0+k_y/\\sqrt d"],
          ["Boundary strengthening contribution","\\Delta\\sigma=k_y/\\sqrt d"],
        ],
        examples: [
          ex("Use σ₀ = 50 MPa, kᵧ = 300 MPa·√μm and d = 100 μm. Find yield stress in MPa.", [
            ["Use micrometres because the constant is supplied for those units.","\\sigma_y=\\sigma_0+k_y/\\sqrt d"],
            ["Substitute and calculate.","50 + 300 / \\sqrt{100} \\approx 80\\,\\text{MPa}"],
          ], "80 MPa"),
          ex("For the same constants, refine grains from 100 to 25 μm. Find the yield-stress increase in MPa.", [
            ["Subtract the two boundary contributions.","\\Delta\\sigma=k_y(1/\\sqrt{d_2}-1/\\sqrt{d_1})"],
            ["Substitute and calculate.","300 \\times  (1/\\sqrt{25} - 1/\\sqrt{100}) \\approx 30\\,\\text{MPa}"],
          ], "30 MPa"),
        ],
        practice: [
          pr("With σ₀ = 50 MPa and kᵧ = 300 MPa·√μm, find yield stress for d = 25 μm in MPa.", 110, "Add the base stress to the boundary term.", "Add the base stress to the boundary term. 50 + 300 / √(25) = 110 MPa."),
          pr("Use kᵧ = 300 MPa·√μm and d = 9 μm. Find boundary contribution alone, in MPa.", 100, "Do not add a base stress to this requested contribution.", "Do not add a base stress to this requested contribution. 300 / √(9) = 100 MPa."),
          pr("With σ₀ = 50 MPa and kᵧ = 300 MPa·√μm, a sample yields at 150 MPa. Find d in μm.", 9, "Isolate the square root, then square.", "Isolate the square root, then square. (300 / (150 − 50))^2 = 9 μm."),
          pr("If grain size falls from 100 to 25 μm, by what factor does the Hall–Petch boundary contribution increase, with kᵧ unchanged?", 2, "The contribution varies as the inverse square root of grain size.", "The contribution varies as the inverse square root of grain size. √(100 / 25) = 2."),
        ],
      },
    ],
  },
  'mate-114': {
    predict: {
      "q": "The scene gives aluminium an oversized dent under a heavy ball load. What is the best next move to get a readable hardness test?",
      "options": [
        "Reduce the applied load",
        "Increase the applied load",
        "Use the oversized dent anyway",
        "Report it as hardened steel"
      ],
      "answer": 0,
      "reveal": "Reduce the load so the dent falls within the readable range for that ball. A larger load makes a larger dent; it does not by itself mean the aluminium has become softer."
    },
    parts: [
      {
        title: "Scratch, dent and fracture are different",
        minutes: 20,
        explain: [
          "Hardness describes resistance to permanent scratching or indentation. A hardness test leaves a mark. It is quick and uses only a small region, but the mark still matters on a finished surface. Hardness is different from stiffness and from resistance to fracture.",
          "The Mohs scale ranks minerals by which can scratch which. Its steps are not equal numerical increases in hardness. Metal tests instead use a controlled indenter and load: Brinell uses a ball, Vickers a diamond pyramid, and Rockwell a depth measurement on a specified scale.",
        ],
        formulas: [
          ["Indentation resistance","H=F/A_{\\rm indentation}"],
          ["Mean measured diameter","\\bar d=(d_1+d_2)/2"],
        ],
        examples: [
          ex("A ball dent measures 4.0 mm in one direction and 4.2 mm in the perpendicular direction. Find mean diameter in mm.", [
            ["Average the two readings.","\\bar d=(d_1+d_2)/2"],
            ["Substitute and calculate.","(4.0 + 4.2) / 2 \\approx 4.1\\,\\text{mm}"],
          ], "4.1 mm"),
          ex("A mineral has Mohs rank 7. Test pieces have ranks 2, 5 and 9. In the ideal ranking, how many of these can it scratch?", [
            ["Count the pieces with lower rank; do not treat rank as a ratio.","N=1+1"],
            ["Substitute and calculate.","1 + 1 \\approx 2"],
          ], "2"),
        ],
        practice: [
          pr("Two dent readings are 3.8 and 4.0 mm. Find mean diameter in mm.", 3.9, "Use the arithmetic mean.", "Use the arithmetic mean. (3.8 + 4.0) / 2 = 3.9 mm."),
          pr("A 500 kgf indentation load is distributed over 5 mm² curved contact area. Find F/A in kgf/mm².", 100, "Divide the load by indentation area.", "Divide the load by indentation area. 500 / 5 = 100 kgf/mm²."),
          pr("A sample is indented three times; each dent is read along two perpendicular directions. How many diameter readings are taken?", 6, "Count two readings per dent.", "Count two readings per dent. 3 × 2 = 6."),
          pr("Same-ball, same-load tests give dent diameters 3.5, 4.0 and 5.0 mm. What is the smallest diameter, in mm, identifying the hardest sample?", 3.5, "Choose the smallest permanent dent under identical conditions.", "Choose the smallest permanent dent under identical conditions. min(3.5,4.0,5.0) = 3.5 mm."),
        ],
      },
      {
        title: "The curved area beneath a Brinell ball",
        minutes: 25,
        explain: [
          "A Brinell test presses a hard ball of diameter D into the material with load F. Measure dent diameter d after unloading. The ideal spherical-cap depth is h = (D − √(D² − d²))/2. The curved cap area is πDh, rather than the flat circular area seen from above.",
          "Brinell hardness uses F/(πDh) when F is in kilograms-force and lengths are in millimetres. Kilograms-force is a force unit, not the mass in kilograms. State the ball size and test load with a result, and use the same convention throughout the calculation.",
        ],
        formulas: [
          ["Spherical-cap depth","h=\\frac{D-\\sqrt{D^2-d^2}}2"],
          ["Brinell hardness","HB=\\frac{F}{\\pi Dh}=\\frac{2F}{\\pi D(D-\\sqrt{D^2-d^2})}"],
        ],
        examples: [
          ex("D = 10 mm and d = 4 mm. Find ideal cap depth h in mm.", [
            ["Use the ball geometry rather than half the dent diameter.","h=(D-\\sqrt{D^2-d^2})/2"],
            ["Substitute and calculate.","(10 - \\sqrt{100-16}) / 2 \\approx 0.4174243\\,\\text{mm}"],
          ], "0.4174243 mm"),
          ex("Use F = 3000 kgf, D = 10 mm and d = 4 mm. Find Brinell hardness HB.", [
            ["Divide load by the curved spherical-cap area.","HB=2F/(\\pi D(D-\\sqrt{D^2-d^2}))"],
            ["Substitute and calculate.","6000 / (\\pi \\times  10 \\times  (10 - \\sqrt{100-16})) \\approx 228.7671"],
          ], "228.7671"),
        ],
        practice: [
          pr("For D = 10 mm and h = 0.5 mm, find curved dent area in mm².", 15.707963267948966, "Use πDh, not the flat circle area.", "Use πDh, not the flat circle area. π × 10 × 0.5 = 15.70796 mm²."),
          pr("F = 500 kgf, D = 10 mm and h = 0.2 mm. Find HB.", 79.57747154594767, "Divide force by curved area.", "Divide force by curved area. 500 / (π × 10 × 0.2) = 79.57747."),
          pr("D = 10 mm and d = 5 mm. Find ideal depth h in mm.", 0.6698729810778064, "Evaluate the square root before subtracting.", "Evaluate the square root before subtracting. (10 − √(100-25)) / 2 = 0.669873 mm."),
          pr("F = 3000 kgf, D = 10 mm and d = 5 mm. Find HB.", 142.5538401347249, "Use the diameter form of the Brinell equation.", "Use the diameter form of the Brinell equation. 6000 / (π × 10 × (10 − √(100-25))) = 142.5538."),
        ],
      },
      {
        title: "Choosing a readable indentation",
        minutes: 25,
        explain: [
          "The scene uses a useful target range: dent diameter from 0.24D to 0.60D. Too small a dent is hard to read accurately. Too large a dent is unsuitable for the intended test geometry. For the same ball, lowering the load reduces the dent.",
          "The surface must be prepared and the specimen thick enough that the support does not influence the indentation. Keep dents away from edges and from one another. Choose test conditions for the material and follow the applicable laboratory method; the scene’s simplified range is a teaching guide.",
        ],
        formulas: [
          ["Scene dent range","0.24D\\le d\\le0.60D"],
          ["Load from target cap depth","F=HB\\pi Dh"],
        ],
        examples: [
          ex("For D = 10 mm, find the lower readable dent diameter in the scene, in mm.", [
            ["Multiply ball diameter by the lower fraction.","d_{\\rm min}=0.24D"],
            ["Substitute and calculate.","0.24 \\times  10 \\approx 2.4\\,\\text{mm}"],
          ], "2.4 mm"),
          ex("For D = 10 mm, find the upper readable dent diameter in the scene, in mm.", [
            ["Use the upper fraction.","d_{\\rm max}=0.60D"],
            ["Substitute and calculate.","0.60 \\times  10 \\approx 6\\,\\text{mm}"],
          ], "6 mm"),
        ],
        practice: [
          pr("For D = 5 mm, find the lower scene target diameter in mm.", 1.2, "Scale the lower limit with ball size.", "Scale the lower limit with ball size. 0.24 × 5 = 1.2 mm."),
          pr("A dent is 3 mm across under a 10 mm ball. Find d/D.", 0.3, "Compare dent diameter with ball diameter.", "Compare dent diameter with ball diameter. 3 / 10 = 0.3."),
          pr("A model material has HB = 100. With D = 10 mm, what load in kgf gives h = 0.2 mm in the ideal model?", 628.3185307179588, "Rearrange HB = F/(πDh).", "Rearrange HB = F/(πDh). 100 × π × 10 × 0.2 = 628.3185 kgf."),
          pr("For the scene aluminium model HB = 95 and D = 10 mm, use F = 500 kgf. Calculate dent diameter in mm from h = F/(πD HB) and d = 2√(h(D − h)).", 2.566903489083904, "Find depth first, then diameter.", "Find depth first, then diameter. 2√((500/(π × 10 × 95))(10-500/(π × 10 × 95))) = 2.566903 mm."),
        ],
      },
      {
        title: "Strength estimates and reporting limits",
        minutes: 25,
        explain: [
          "For many steels, an empirical estimate relates tensile strength in MPa to about 3.45 times Brinell hardness. It is a correlation with scatter, not a definition of strength. It should not be carried over to aluminium, brass or other families without an appropriate calibration.",
          "Use a hardness estimate to screen heat treatment, then apply the required acceptance method. A local hard spot may not represent the whole component. Average comparable readings, report test conditions and investigate unusual spread. Hardness alone does not establish toughness, fatigue life or safe service.",
        ],
        formulas: [
          ["Approximate steel correlation","\\sigma_{\\rm UTS}\\approx3.45HB\\quad(\\mathrm{MPa})"],
          ["Hardness for a target estimate","HB\\approx\\sigma_{\\rm target}/3.45"],
        ],
        examples: [
          ex("A steel gives HB = 200. Estimate tensile strength in MPa using 3.45HB.", [
            ["Apply the steel-only empirical factor.","\\sigma_{\\rm UTS}\\approx3.45HB"],
            ["Substitute and calculate.","3.45 \\times  200 \\approx 690\\,\\text{MPa}"],
          ], "690 MPa"),
          ex("A steel screening target is an estimated tensile strength of 900 MPa. Find corresponding HB using the stated correlation.", [
            ["Divide target strength by the empirical factor.","HB\\approx\\sigma/3.45"],
            ["Substitute and calculate.","900 / 3.45 \\approx 260.8696"],
          ], "260.8696"),
        ],
        practice: [
          pr("For steel HB = 120, estimate tensile strength in MPa.", 414, "Multiply hardness by the given factor.", "Multiply hardness by the given factor. 3.45 × 120 = 414 MPa."),
          pr("For steel HB = 240, estimate tensile strength in MPa.", 828, "Use the same empirical factor.", "Use the same empirical factor. 3.45 × 240 = 828 MPa."),
          pr("Comparable steel readings are HB 190, 200 and 210. Find mean HB.", 200, "Average only the comparable measurements.", "Average only the comparable measurements. (190 + 200 + 210) / 3 = 200."),
          pr("Heat treatment raises a steel from HB 180 to HB 260. Using the same correlation, find estimated tensile-strength increase in MPa.", 276, "Apply the factor to the hardness increase.", "Apply the factor to the hardness increase. 3.45 × (260 − 180) = 276 MPa."),
        ],
      },
    ],
  },
};
