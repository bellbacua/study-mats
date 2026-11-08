// Materials, drawing and lab data: batch 7.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const MATE1 = {
  'mate-112': {
    predict: {
      q: "The copper planes give a bright X-ray reflection. You switch to planes packed more closely together, keeping the same wavelength. Where should you hunt for their first peak?",
      options: ["At a larger angle","At a smaller angle","At the same angle","At every angle"],
      answer: 0,
      reveal: "Closer planes need a steeper angle to make the extra travel equal one wavelength. A smaller spacing therefore moves the peak to a larger detector angle.",
    },
    parts: [
      {
        title: "Why a crystal makes peaks",
        minutes: 25,
        explain: [
          "X-rays are waves. A crest from one plane of atoms can meet a crest from the next plane and make a strong reflection. If the waves arrive out of step, they partly cancel.",
          "The deeper reflection travels an extra distance 2d sin θ. Here d is the plane spacing and θ is measured from the planes. Bragg’s law says that this distance must equal a whole number n of wavelengths λ. Start with the first reflection, n = 1.",
        ],
        formulas: [
          ["Bragg condition","n\\lambda = 2d\\sin\\theta"],
        ],
        examples: [
          ex("Planes are 0.20 nm apart and θ = 30°. What extra distance does the deeper reflection travel, in nm?", [
            ["Use twice the spacing times the sine of the angle.",""],
            ["Substitute the stated values and calculate.","\\left(2\\times 0.20\\right)\\times \\sin\\left(\\frac{\\pi}{6}\\right) \\approx 0.2\\,\\mathrm{nm}"],
          ], "0.2 nm"),
          ex("A first reflection has λ = 0.154 nm and d = 0.154 nm. Find sin θ.", [
            ["Rearrange Bragg’s law to leave sin θ alone.",""],
            ["Substitute the stated values and calculate.","\\frac{0.154}{2\\times 0.154} \\approx 0.5"],
          ], "0.5"),
        ],
        practice: [
          pr("At θ = 30°, planes spaced 0.30 nm apart give what extra travel, in nm?", 0.3, "Use sin 30° = 0.5.", "2 × 0.30 × 0.5 = 0.3 nm.", { tol: 0.0015 }),
          pr("The extra path is 0.40 nm and λ = 0.20 nm. What reflection order n is this?", 2, "Count wavelengths in the extra path.", "0.40 ÷ 0.20 = 2."),
          pr("For n = 1, λ = 0.10 nm and d = 0.20 nm, find sin θ.", 0.25, "Divide wavelength by twice the spacing.", "0.10 ÷ 0.40 = 0.25.", { tol: 0.00125 }),
          pr("For n = 2, λ = 0.15 nm and d = 0.30 nm, find sin θ.", 0.5, "Include the reflection order in the numerator.", "(2 × 0.15) ÷ (2 × 0.30) = 0.5."),
        ],
      },
      {
        title: "Detector angle and plane spacing",
        minutes: 25,
        explain: [
          "The instrument usually labels its horizontal axis 2θ. This is the angle between the incoming and outgoing beams. Halve that reading before using Bragg’s law.",
          "Keep wavelength and spacing in the same units. A peak gives a spacing, which is evidence about the crystal structure. Several peaks are needed to identify an unknown mixture reliably.",
        ],
        formulas: [
          ["Spacing from a first peak","d=\\frac{\\lambda}{2\\sin\\theta},\\qquad \\theta=\\frac{2\\theta}{2}"],
        ],
        examples: [
          ex("An X-ray peak is at detector angle 60°, with λ = 0.154 nm and n = 1. Find d in nm.", [
            ["Halve the detector angle first.",""],
            ["Substitute the stated values and calculate.","\\frac{0.154}{2\\times \\sin\\left(\\frac{\\pi}{6}\\right)} \\approx 0.154\\,\\mathrm{nm}"],
          ], "0.154 nm"),
          ex("A first peak is at 2θ = 43.3° with λ = 0.154 nm. Find d in nm.", [
            ["Use θ = 21.65°, with your calculator in degrees.",""],
            ["Substitute the stated values and calculate.","\\frac{0.154}{2\\times \\sin\\left(\\frac{21.65\\times \\pi}{180}\\right)} \\approx 0.2087\\,\\mathrm{nm}"],
          ], "0.2087 nm"),
        ],
        practice: [
          pr("A detector reads 80°. What is θ, in degrees?", 40, "The detector reading is twice θ.", "80 ÷ 2 = 40 degrees."),
          pr("A first peak has θ = 30° and λ = 0.20 nm. Find d in nm.", 0.2, "Use sin 30° = 0.5.", "0.20 ÷ (2 × 0.5) = 0.2 nm.", { tol: 0.001 }),
          pr("A first peak has θ = 45° and λ = 0.154 nm. Find d in nm.", 0.108894444303, "Use sin 45° = √2/2.", "0.154 ÷ (2 sin 45°) ≈ 0.1089 nm.", { tol: 0.000544472221515 }),
          pr("With λ = 0.154 nm and n = 1, a spacing of 0.208 nm gives what detector angle 2θ, in degrees?", 43.4549557653, "Find θ with the inverse sine, then double it.", "2 arcsin[0.154 ÷ (2 × 0.208)] ≈ 43.45 degrees."),
        ],
      },
      {
        title: "From spacing to a cubic cell",
        minutes: 25,
        explain: [
          "A cubic crystal repeats in cubes of edge length a. Different plane families cut through those cubes at different spacings. The three whole numbers h, k and l name the plane family.",
          "For cubic crystals, divide a by √(h² + k² + l²) to get d. You can also work backwards from a measured spacing to a. Agreement between several peaks is a useful check on a proposed crystal structure.",
        ],
        formulas: [
          ["Cubic spacing","d_{hkl}=\\frac{a}{\\sqrt{h^2+k^2+l^2}}"],
        ],
        examples: [
          ex("A cubic crystal has a = 0.36 nm. Find its (200) spacing in nm.", [
            ["Square each plane label, add, then take the square root.",""],
            ["Substitute the stated values and calculate.","\\frac{0.36}{\\sqrt{4}} \\approx 0.18\\,\\mathrm{nm}"],
          ], "0.18 nm"),
          ex("A cubic (111) spacing is 0.208 nm. Find a in nm.", [
            ["Multiply spacing by the square root of the sum of the squared labels.",""],
            ["Substitute the stated values and calculate.","0.208\\times \\sqrt{3} \\approx 0.3603\\,\\mathrm{nm}"],
          ], "0.3603 nm"),
        ],
        practice: [
          pr("For a = 0.40 nm, find d₁₀₀ in nm.", 0.4, "Only one squared label is non-zero.", "0.40 ÷ √1 = 0.4 nm.", { tol: 0.002 }),
          pr("For a = 0.40 nm, find d₂₀₀ in nm.", 0.2, "The square root of 2² is 2.", "0.40 ÷ 2 = 0.2 nm.", { tol: 0.001 }),
          pr("For a = 0.40 nm, find d₁₁₀ in nm.", 0.282842712475, "The squared labels add to 2.", "0.40 ÷ √2 ≈ 0.2828 nm.", { tol: 0.001414213562375 }),
          pr("A cubic (220) spacing is 0.128 nm. Find a in nm.", 0.362038671968, "The squared labels add to 8.", "0.128 × √8 ≈ 0.362 nm.", { tol: 0.00181019335984 }),
        ],
      },
      {
        title: "Peak shifts and small crystals",
        minutes: 25,
        explain: [
          "If a crystal stretches, its plane spacing grows. With the same X-rays, its peak then moves to a smaller angle. X-ray measurements can therefore reveal elastic strain as well as identify phases.",
          "Very small coherent crystal regions can broaden peaks. The Scherrer estimate gives their size L from L = Kλ/(β cos θ). K is a dimensionless shape factor; use 0.9 in these exercises. β must be in radians and must describe size broadening after other broadening is removed. L is a coherent region size, which need not equal the visible grain size.",
        ],
        formulas: [
          ["Spacing strain","\\varepsilon=\\frac{d-d_0}{d_0}"],
          ["Scherrer estimate","L=\\frac{K\\lambda}{\\beta\\cos\\theta}"],
        ],
        examples: [
          ex("A spacing rises from 0.200 to 0.202 nm. Find the strain as a percentage.", [
            ["Divide the change by the original spacing, then multiply by 100.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times \\left(0.202-0.2\\right)}{0.2} \\approx 1\\,\\%"],
          ], "1 %"),
          ex("Use K = 0.9, λ = 0.154 nm, β = 0.01 rad and θ = 30°. Estimate L in nm.", [
            ["Put the width in radians and use the cosine of θ.",""],
            ["Substitute the stated values and calculate.","\\frac{0.9\\times 0.154}{0.01\\times \\cos\\left(\\frac{\\pi}{6}\\right)} \\approx 16\\,\\mathrm{nm}"],
          ], "16 nm"),
        ],
        practice: [
          pr("A spacing changes from 0.250 to 0.255 nm. Find strain in percent.", 2, "Compare the increase with the original spacing.", "100 × 0.005 ÷ 0.250 = 2 %."),
          pr("A spacing contracts from 0.200 to 0.199 nm. Find strain in percent.", -0.5, "A contraction gives a negative change.", "100 × (0.199 − 0.200) ÷ 0.200 = -0.5 %."),
          pr("Under the Scherrer assumptions, width doubles at fixed θ. If L was 30 nm, what is its new value in nm?", 15, "Size is inversely proportional to width.", "30 ÷ 2 = 15 nm."),
          pr("Use K = 0.9, λ = 0.154 nm, θ = 30° and L = 40 nm. Find β in radians.", 0.00400103736548, "Rearrange the size estimate to leave β alone.", "(0.9 × 0.154) ÷ (40 cos 30°) ≈ 0.004001 rad.", { tol: 0.000020005186827400002 }),
        ],
      },
    ],
  },

  'mate-115': {
    predict: {
      q: "You zoom in on two marks closer together than a light microscope can resolve. What happens if you keep increasing magnification?",
      options: ["Two sharper marks appear","One larger blur appears","The marks move apart","The marks turn into grains"],
      answer: 1,
      reveal: "Magnification enlarges the image, including its blur. Separating the marks needs better resolution, which is why the scene eventually calls for an electron microscope.",
    },
    parts: [
      {
        title: "Reading a micrograph",
        minutes: 25,
        explain: [
          "A micrograph is a magnified picture of a material. A scale bar tells you how much real length a line in the picture represents. Use it even if the picture has been resized.",
          "Grains are separate crystals within a metal. To estimate a grain width, compare its width in the picture with the scale bar. A field wide enough to contain many grains is usually more representative than a close view of one.",
        ],
        formulas: [
          ["Scale-bar conversion","\\text{real length}=\\frac{\\text{image length}}{\\text{bar length}}\\times\\text{bar value}"],
        ],
        examples: [
          ex("A 20 mm scale bar represents 50 μm. A grain is 12 mm wide in the picture. Find its real width in μm.", [
            ["Use the grain-to-bar length ratio.",""],
            ["Substitute the stated values and calculate.","\\left(\\frac{12}{20}\\right)\\times 50 \\approx 30\\,\\mu \\mathrm{m}"],
          ], "30 μm"),
          ex("A 1 mm field contains 20 equal grain widths along a line. Estimate one width in μm.", [
            ["Convert the field to micrometres, then divide.",""],
            ["Substitute the stated values and calculate.","\\frac{1000}{20} \\approx 50\\,\\mu \\mathrm{m}"],
          ], "50 μm"),
        ],
        practice: [
          pr("A 10 mm bar represents 100 μm. A feature measures 5 mm. Find its size in μm.", 50, "Compare the feature with the bar.", "(5 ÷ 10) × 100 = 50 μm."),
          pr("A 2 mm field contains 40 equal grain widths. Estimate a grain width in μm.", 50, "Convert millimetres to micrometres first.", "2000 ÷ 40 = 50 μm."),
          pr("A 15 mm bar represents 30 μm. A feature measures 7.5 mm. Find its width in μm.", 15, "The feature occupies a fraction of the bar.", "(7.5 ÷ 15) × 30 = 15 μm."),
          pr("A field is 300 μm wide and the average grain width is 25 μm. How many widths fit across?", 12, "Divide field width by grain width.", "300 ÷ 25 = 12."),
        ],
      },
      {
        title: "Magnification and resolution",
        minutes: 25,
        explain: [
          "Magnification is image size divided by real size. Resolution is different: it is the smallest separation at which two details can still be distinguished. A larger picture cannot recover detail that the instrument never resolved.",
          "For light, an approximate resolution limit is λ/(2 NA). λ is the wavelength and NA measures how much light the lens gathers. This explains why ordinary light microscopes stop at roughly a few hundred nanometres, even with greater magnification.",
        ],
        formulas: [
          ["Magnification","M=\\frac{\\text{image size}}{\\text{real size}}"],
          ["Approximate light resolution","d\\approx\\frac{\\lambda}{2\\,\\mathrm{NA}}"],
        ],
        examples: [
          ex("A 50 μm grain appears 10 mm wide. Find the magnification.", [
            ["Put image and object lengths in the same units.",""],
            ["Substitute the stated values and calculate.","\\frac{10000}{50} \\approx 200"],
          ], "200"),
          ex("Use λ = 550 nm and NA = 1.25. Estimate d in nm.", [
            ["Divide wavelength by twice NA.",""],
            ["Substitute the stated values and calculate.","\\frac{550}{2\\times 1.25} \\approx 220\\,\\mathrm{nm}"],
          ], "220 nm"),
        ],
        practice: [
          pr("A 20 μm feature appears 4 mm wide. Find magnification.", 200, "Convert the image length to micrometres.", "4000 ÷ 20 = 200."),
          pr("Use λ = 500 nm and NA = 1. Find d in nm.", 250, "Use the resolution estimate.", "500 ÷ 2 = 250 nm."),
          pr("Use λ = 450 nm and NA = 1.5. Find d in nm.", 150, "The denominator is twice NA.", "450 ÷ 3 = 150 nm."),
          pr("An image at 200× is enlarged to twice its printed width. What is the new displayed magnification?", 400, "Every image length doubles.", "200 × 2 = 400."),
        ],
      },
      {
        title: "Preparing a surface and measuring phases",
        minutes: 25,
        explain: [
          "Cutting and grinding leave damage and scratches. Polishing removes the fine scratches; etching then makes differences between grains or phases visible. Preparation matters because a scratch can be mistaken for a material feature.",
          "On a representative polished section, the area fraction of a phase estimates its volume fraction. One simple method places equally spaced points over the image and counts which phase lies under each point. Use many fields to reduce the influence of an unusual patch.",
        ],
        formulas: [
          ["Point estimate of phase fraction","f\\approx\\frac{\\text{points on phase}}{\\text{total points}}"],
        ],
        examples: [
          ex("Out of 100 equally spaced points, 28 land on a dark phase. Estimate its volume percentage.", [
            ["Divide the phase count by the total count.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times 28}{100} \\approx 28\\,\\%"],
          ], "28 %"),
          ex("Two equal-area fields give 18 and 26 dark points, each out of 50. Find the combined dark-phase percentage.", [
            ["Combine the counts before dividing.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times \\left(18+26\\right)}{50+50} \\approx 44\\,\\%"],
          ], "44 %"),
        ],
        practice: [
          pr("Of 80 points, 20 touch inclusions. Estimate inclusion percentage.", 25, "Use inclusion points over all points.", "100 × 20 ÷ 80 = 25 %."),
          pr("Of 200 points, 150 touch ferrite. Estimate ferrite percentage.", 75, "Use the ferrite count.", "100 × 150 ÷ 200 = 75 %."),
          pr("If two phases fill a section and one occupies 35%, what percentage is the other?", 65, "The phase fractions must fill the whole section.", "100 − 35 = 65 %."),
          pr("Three fields each have 100 points; inclusion counts are 4, 7 and 10. Estimate the combined inclusion percentage.", 7, "Add all inclusion counts and all sample points.", "100 × (4 + 7 + 10) ÷ 300 = 7 %."),
        ],
      },
      {
        title: "Choosing light, SEM or TEM",
        minutes: 25,
        explain: [
          "A scanning electron microscope, or SEM, scans a surface. It is useful for rough fracture surfaces. A transmission electron microscope, or TEM, sends electrons through a very thin specimen and can reveal atomic-scale details.",
          "Instrument resolution depends on the instrument and specimen. In the scene, use approximate limits of 200 nm for light, 1 nm for SEM and 0.05 nm for TEM. Compare feature size with the limit before choosing a view; these are illustrative limits, not promises for every instrument.",
        ],
        formulas: [
          ["Resolution comparison","r=\\frac{\\text{feature size}}{\\text{resolution limit}}"],
        ],
        examples: [
          ex("A pearlite spacing is 0.30 μm. How many times the scene’s 200 nm light-resolution limit is this?", [
            ["Convert the spacing to nanometres.",""],
            ["Substitute the stated values and calculate.","\\frac{300}{200} \\approx 1.5"],
          ], "1.5"),
          ex("A 0.29 nm atomic spacing is how many times the scene’s 0.05 nm TEM limit?", [
            ["Compare lengths in the same units.",""],
            ["Substitute the stated values and calculate.","\\frac{0.29}{0.05} \\approx 5.8"],
          ], "5.8"),
        ],
        practice: [
          pr("Convert a 20 nm particle diameter to μm.", 0.02, "There are 1000 nm in a micrometre.", "20 ÷ 1000 = 0.02 μm.", { tol: 0.0001 }),
          pr("A 10 nm feature is how many times the scene’s 1 nm SEM limit?", 10, "Divide size by the SEM limit.", "10 ÷ 1 = 10."),
          pr("In the scene, smallest detail equals field width divided by 50. For a 10 μm field, find that detail in nm.", 200, "Convert the whole field to nanometres first.", "10000 ÷ 50 = 200 nm."),
          pr("Using the same field-width rule, what field width in nm gives a 0.1 nm smallest detail?", 5, "Reverse the division by 50.", "0.1 × 50 = 5 nm."),
        ],
      },
    ],
  },

  'mate-116': {
    predict: {
      q: "On 64 sites you replace copper atoms with nickel. Which choice leaves the greatest number of different arrangements?",
      options: ["All 64 are nickel","Just 1 is nickel","Exactly 32 are nickel","Exactly 63 are nickel"],
      answer: 2,
      reveal: "Half and half gives the most choices about which sites hold nickel. A nearly pure crystal has far fewer arrangements, even though its atoms can still move.",
    },
    parts: [
      {
        title: "Counting arrangements",
        minutes: 25,
        explain: [
          "A microstate is one particular arrangement of atoms. Swapping two identical copper atoms does not make a different arrangement. Moving a nickel atom to a copper site does.",
          "With N sites and n nickel atoms, count the ways to choose the nickel sites. The symbol N! means N × (N − 1) and so on down to 1; by convention 0! = 1. Dividing by n! and (N − n)! removes repeated counts of identical atoms.",
        ],
        formulas: [
          ["Choosing occupied sites","W=\\frac{N!}{n!(N-n)!}"],
        ],
        examples: [
          ex("Four sites hold one nickel atom and three copper atoms. How many arrangements are possible?", [
            ["Choose which single site holds nickel.",""],
            ["Substitute the stated values and calculate.","4 \\approx 4"],
          ], "4"),
          ex("Four sites hold two nickel and two copper atoms. How many arrangements are possible?", [
            ["Use the choosing formula.",""],
            ["Substitute the stated values and calculate.","\\frac{24}{2\\times 2} \\approx 6"],
          ], "6"),
        ],
        practice: [
          pr("Six sites hold one nickel atom. How many arrangements are possible?", 6, "Only the nickel position matters.", "One choice per site gives 6."),
          pr("Six sites hold five nickel atoms. How many arrangements are possible?", 6, "Choose the single copper position instead.", "One choice for the copper site gives 6."),
          pr("Five sites hold two nickel atoms. Find W.", 10, "Use 5! divided by 2! and 3!.", "120 ÷ (2 × 6) = 10."),
          pr("Six sites hold three nickel atoms. Find W.", 20, "Use 6! divided by 3! twice.", "720 ÷ (6 × 6) = 20."),
        ],
      },
      {
        title: "Entropy is a logarithm of a count",
        minutes: 25,
        explain: [
          "Entropy S measures how many microscopic arrangements fit the same large-scale description. Boltzmann’s rule is S = k ln W. The symbol ln is the natural logarithm, and k converts the count into entropy units.",
          "Use k = 1.38 × 10⁻²³ J/K for these exercises. It is easier to report S/k = ln W when counting only a few atoms. Multiplying arrangement counts adds their logarithms, so independent systems have entropies that add.",
        ],
        formulas: [
          ["Boltzmann rule","S=k\\ln W"],
          ["Change in entropy","\\Delta S/k=\\ln(W_2/W_1)"],
        ],
        examples: [
          ex("If W = 1, find S/k.", [
            ["Take the natural logarithm of the arrangement count.",""],
            ["Substitute the stated values and calculate.","\\ln\\left(1\\right) \\approx 0"],
          ], "0"),
          ex("If W = 6, find S/k.", [
            ["Use the natural logarithm.",""],
            ["Substitute the stated values and calculate.","\\ln\\left(6\\right) \\approx 1.792"],
          ], "1.792"),
        ],
        practice: [
          pr("If W = 10, find S/k.", 2.30258509299, "Entropy divided by k equals ln W.", "ln 10 ≈ 2.303."),
          pr("If W rises by a factor of 2, find ΔS/k.", 0.69314718056, "Take the logarithm of the ratio of counts.", "ln 2 ≈ 0.6931."),
          pr("If W rises from 5 to 20, find ΔS/k.", 1.38629436112, "Divide the counts before taking the logarithm.", "ln(20 ÷ 5) ≈ 1.386."),
          pr("Two independent regions have 4 and 6 arrangements. Find their combined S/k.", 3.17805383035, "Multiply the counts for independent regions.", "ln(4 × 6) = ln 24 ≈ 3.178."),
        ],
      },
      {
        title: "Mixing entropy in an alloy",
        minutes: 25,
        explain: [
          "For a large ideal mixture, the mole fraction x is the fraction of atoms of one kind. The other fraction is 1 − x. Ideal means the atoms mix randomly with no preference for particular neighbours.",
          "The molar mixing entropy is −R[x ln x + (1 − x) ln(1 − x)], with R = 8.314 J/(mol·K). It is highest for equal amounts. At a pure end the mixing entropy is zero; treat x ln x as tending to zero there.",
        ],
        formulas: [
          ["Ideal molar mixing entropy","\\Delta S_{mix}=-R[x\\ln x+(1-x)\\ln(1-x)]"],
        ],
        examples: [
          ex("Find the ideal molar mixing entropy at x = 0.5, using R = 8.314, in J/(mol·K).", [
            ["Both fractions are equal, so the formula becomes R ln 2.",""],
            ["Substitute the stated values and calculate.","8.314\\times \\ln\\left(2\\right) \\approx 5.763\\,\\mathrm{J}/(\\mathrm{mol}\\cdot \\mathrm{K})"],
          ], "5.763 J/(mol·K)"),
          ex("Find the same entropy at x = 0.25, in J/(mol·K).", [
            ["Use both fractions, 0.25 and 0.75.",""],
            ["Substitute the stated values and calculate.","\\left(-8.314\\right)\\times \\left(0.25\\times \\ln\\left(0.25\\right)+0.75\\times \\ln\\left(0.75\\right)\\right) \\approx 4.675\\,\\mathrm{J}/(\\mathrm{mol}\\cdot \\mathrm{K})"],
          ], "4.675 J/(mol·K)"),
        ],
        practice: [
          pr("An alloy has 16 nickel atoms among 64 sites. Find its nickel fraction x.", 0.25, "Divide nickel atoms by all atoms.", "16 ÷ 64 = 0.25.", { tol: 0.00125 }),
          pr("An alloy has x = 0.30. Find the other atomic fraction.", 0.7, "The two fractions add to one.", "1 − 0.30 = 0.7."),
          pr("At x = 0.10, find ideal molar mixing entropy using R = 8.314, in J/(mol·K).", 2.70273984078, "Use 0.10 and 0.90 in the mixing formula.", "−8.314[0.10 ln 0.10 + 0.90 ln 0.90] ≈ 2.703 J/(mol·K)."),
          pr("Two moles of ideal 50:50 alloy mix. Find total mixing entropy in J/K, using R = 8.314.", 11.5256513184, "Multiply molar entropy by the amount in moles.", "2 × 8.314 ln 2 ≈ 11.53 J/K."),
        ],
      },
      {
        title: "Heat, temperature and the second law",
        minutes: 25,
        explain: [
          "Entropy also connects to heat. When heat Q is transferred reversibly at a constant absolute temperature T, the entropy change is Q/T. Use kelvin, not degrees Celsius. A body receiving heat has a positive change.",
          "The second law concerns the total entropy of an isolated system. A hot sample may lose entropy as it cools, while its surroundings gain more. To judge the whole process, include both. The sample alone need not have increasing entropy.",
        ],
        formulas: [
          ["Reversible heat transfer","\\Delta S=Q_{rev}/T"],
          ["Total entropy change","\\Delta S_{total}=\\Delta S_{sample}+\\Delta S_{surroundings}"],
        ],
        examples: [
          ex("A sample receives 600 J reversibly at 300 K. Find ΔS in J/K.", [
            ["Divide received heat by absolute temperature.",""],
            ["Substitute the stated values and calculate.","\\frac{600}{300} \\approx 2\\,\\mathrm{J}/\\mathrm{K}"],
          ], "2 J/K"),
          ex("A 600 K reservoir gives 1200 J to a 300 K reservoir. Find the total entropy change in J/K.", [
            ["Add the hot reservoir’s loss and the cold reservoir’s gain.",""],
            ["Substitute the stated values and calculate.","\\frac{-1200}{600}+\\frac{1200}{300} \\approx 2\\,\\mathrm{J}/\\mathrm{K}"],
          ], "2 J/K"),
        ],
        practice: [
          pr("A sample receives 1000 J reversibly at 500 K. Find ΔS in J/K.", 2, "Use Q/T.", "1000 ÷ 500 = 2 J/K."),
          pr("A reservoir at 400 K loses 800 J. Find its entropy change in J/K.", -2, "Heat leaving has a negative sign.", "−800 ÷ 400 = -2 J/K."),
          pr("Two regions change entropy by −3 J/K and +5 J/K. Find the total in J/K.", 2, "Add both changes with their signs.", "−3 + 5 = 2 J/K."),
          pr("A reversible melting step absorbs 12000 J/mol at 1000 K. Find the molar entropy of fusion in J/(mol·K).", 12, "Divide latent heat per mole by melting temperature.", "12000 ÷ 1000 = 12 J/(mol·K)."),
        ],
      },
    ],
  },

  'mate-117': {
    predict: {
      q: "Ice, liquid water and vapour coexist at water’s triple point. You raise only the temperature a little and wait for equilibrium. Can all three phases remain?",
      options: ["Yes, at any pressure","Yes, if heated slowly","Yes, with less liquid","No, a phase must go"],
      answer: 3,
      reveal: "Three phases of pure water coexist at one temperature and pressure. Changing either condition takes you away from that point, so the same three-phase equilibrium cannot remain.",
    },
    parts: [
      {
        title: "Components and phases",
        minutes: 25,
        explain: [
          "A phase is a region with uniform structure and composition. Several ice cubes count as one phase, because each is the same kind of solid. Ice and liquid water count as two phases.",
          "A component is an independent chemical ingredient. Pure water has one component even when it appears as ice, liquid and vapour. A non-reacting copper–nickel alloy has two components, whatever the number of grains.",
        ],
        formulas: [
          ["Counting distinct phases","P=\\text{number of distinct uniform phases}"],
        ],
        examples: [
          ex("A sealed sample contains ice and liquid water only. How many phases are present?", [
            ["Count kinds of material state, not separate pieces.",""],
            ["Substitute the stated values and calculate.","1+1 \\approx 2"],
          ], "2"),
          ex("A sample contains copper and nickel, with no chemical reactions. How many components are needed?", [
            ["Count independent ingredients.",""],
            ["Substitute the stated values and calculate.","1+1 \\approx 2"],
          ], "2"),
        ],
        practice: [
          pr("Ten identical ice cubes sit in liquid water. How many phases are present?", 2, "All ice cubes belong to the same phase.", "Ice and liquid give 2."),
          pr("Ice, liquid water and water vapour coexist. How many components are present?", 1, "Each phase is made of the same substance.", "Only water is needed, giving 1."),
          pr("A copper–nickel specimen has one uniform solid solution in 100 grains. How many phases are present?", 1, "Different grain orientations do not create different phases.", "One uniform solid solution gives 1."),
          pr("A sealed binary mixture has two different solid phases and one liquid phase. How many phases are present?", 3, "Count the two distinct solids separately.", "Two solids plus one liquid gives 3."),
        ],
      },
      {
        title: "The freedoms in an equilibrium map",
        minutes: 25,
        explain: [
          "The Gibbs phase rule counts independent intensive conditions: temperature, pressure and composition. Intensive means the value does not depend on how much material you have. Sample mass is not one of these freedoms.",
          "For a non-reacting equilibrium system, F = C − P + 2. C is the component count, P the phase count and F the remaining freedoms. Each extra phase imposes another condition, so it removes one freedom.",
        ],
        formulas: [
          ["General phase rule","F=C-P+2"],
        ],
        examples: [
          ex("Pure liquid water is in equilibrium away from a boundary. Find F.", [
            ["Use one component and one phase.",""],
            ["Substitute the stated values and calculate.","1-1+2 \\approx 2"],
          ], "2"),
          ex("A non-reacting binary system has two equilibrium phases. Find F with pressure free.", [
            ["Use two components and two phases.",""],
            ["Substitute the stated values and calculate.","2-2+2 \\approx 2"],
          ], "2"),
        ],
        practice: [
          pr("Pure water has two phases at equilibrium. Find F with pressure free.", 1, "Use C = 1 and P = 2.", "1 − 2 + 2 = 1."),
          pr("Pure water is at its triple point. Find F.", 0, "Three phases coexist.", "1 − 3 + 2 = 0.", { tol: 0.000001 }),
          pr("A binary system has three equilibrium phases. Find F with pressure free.", 1, "Substitute the component and phase counts.", "2 − 3 + 2 = 1."),
          pr("A non-reacting ternary system has two equilibrium phases. Find F with pressure free.", 3, "Ternary means three components.", "3 − 2 + 2 = 3."),
        ],
      },
      {
        title: "Boundaries and the triple point",
        minutes: 25,
        explain: [
          "For pure water, one-phase regions occupy areas on a temperature–pressure map. You can change temperature or pressure slightly and stay within the same region. A two-phase boundary is a line: choosing temperature fixes the coexistence pressure.",
          "At the triple point, ice, water and vapour coexist. There is no freedom in temperature or pressure. The phase rule does not set how many grams of each phase you have; it describes the conditions needed for coexistence.",
        ],
        formulas: [
          ["Pure substance","F=3-P"],
        ],
        examples: [
          ex("Pure water begins with F = 2. A second phase appears at equilibrium. What is the new F?", [
            ["Count the new number of phases.",""],
            ["Substitute the stated values and calculate.","3-2 \\approx 1"],
          ], "1"),
          ex("Boiling water has F = 1 with pressure free. Atmospheric pressure is then fixed. How many freedoms remain?", [
            ["Fixing an independent condition removes one freedom.",""],
            ["Substitute the stated values and calculate.","1-1 \\approx 0"],
          ], "0"),
        ],
        practice: [
          pr("A pure substance has F = 0 with temperature and pressure free. How many phases coexist?", 3, "Rearrange F = 3 − P.", "P = 3 − 0 = 3."),
          pr("A pure substance has F = 2. How many equilibrium phases are present?", 1, "Solve for P.", "3 − 2 = 1."),
          pr("On a pure substance’s two-phase boundary, one independent condition is specified. How many freedoms remain?", 0, "Start with the general phase rule, then remove the fixed condition.", "(1 − 2 + 2) − 1 = 0.", { tol: 0.000001 }),
          pr("A pressure cooker moves water along its liquid–vapour boundary. How many independent choices among temperature and pressure remain before either is specified?", 1, "A boundary is a one-dimensional set of conditions.", "1 − 2 + 2 = 1."),
        ],
      },
      {
        title: "Alloys at fixed pressure",
        minutes: 25,
        explain: [
          "Alloy diagrams usually hold pressure fixed. Remove that freedom to get F = C − P + 1. A binary two-phase region then has one freedom: at a chosen temperature, the two phase compositions are fixed.",
          "The overall composition can still change the amounts of those phases. At a binary three-phase equilibrium, such as a eutectic, F = 0 at fixed pressure. Its temperature and the phase compositions are fixed by the system.",
        ],
        formulas: [
          ["Fixed-pressure phase rule","F=C-P+1"],
        ],
        examples: [
          ex("At fixed pressure, a binary alloy has one phase. Find F.", [
            ["Use the fixed-pressure rule.",""],
            ["Substitute the stated values and calculate.","2-1+1 \\approx 2"],
          ], "2"),
          ex("At fixed pressure, a binary alloy has liquid and two solid phases. Find F.", [
            ["There are three phases.",""],
            ["Substitute the stated values and calculate.","2-3+1 \\approx 0"],
          ], "0"),
        ],
        practice: [
          pr("At fixed pressure, a binary alloy has two phases. Find F.", 1, "Pressure has already been removed.", "2 − 2 + 1 = 1."),
          pr("At fixed pressure, a ternary alloy has two phases. Find F.", 2, "Ternary supplies three components.", "3 − 2 + 1 = 2."),
          pr("At fixed pressure, a ternary system has F = 0. How many phases can coexist?", 4, "Set 0 = 3 − P + 1.", "P = 3 + 1 = 4."),
          pr("A binary two-phase alloy has pressure and temperature fixed. How many intensive freedoms remain?", 0, "Use the fixed-pressure rule and then fix temperature.", "2 − 2 + 1 − 1 = 0.", { tol: 0.000001 }),
        ],
      },
    ],
  },

  'mate-118': {
    predict: {
      q: "The scene puts warm silicon beside diamond at the same temperature. Both contain electrons. Which should have more electrons reaching the upper band?",
      options: ["Silicon, with its smaller gap","Diamond, with its larger gap","Both, in equal numbers","Neither, at any temperature"],
      answer: 0,
      reveal: "Silicon’s smaller energy gap is easier for thermal energy to bridge. Diamond’s much wider gap leaves practically no thermally excited carriers at the temperatures shown.",
    },
    parts: [
      {
        title: "Atomic levels become bands",
        minutes: 25,
        explain: [
          "An isolated atom allows electrons only at certain energies. Bring many atoms close together and the corresponding levels split into many closely spaced levels. Together these form an energy band.",
          "In the scene’s simple model, each atomic level gives N closely spaced levels when N atoms join. A macroscopic crystal has so many atoms that drawing the individual levels is no longer useful; we draw a band instead.",
        ],
        formulas: [
          ["Levels in the simple model","N\\text{ atoms}\\longrightarrow N\\text{ levels per band}"],
        ],
        examples: [
          ex("In the simple model, 12 atoms join. How many levels come from one atomic level?", [
            ["Each atom contributes one corresponding level.",""],
            ["Substitute the stated values and calculate.","12 \\approx 12"],
          ], "12"),
          ex("Eight atoms each contribute two atomic levels. How many levels are there across both resulting bands?", [
            ["Count the contributions to each band.",""],
            ["Substitute the stated values and calculate.","8\\times 2 \\approx 16"],
          ], "16"),
        ],
        practice: [
          pr("Five atoms join. How many levels form in each band?", 5, "Use one corresponding level per atom.", "The level count equals the atom count: 5."),
          pr("The scene changes from 10 to 40 atoms. By what factor does the number of levels per band grow?", 4, "Compare final and initial counts.", "40 ÷ 10 = 4."),
          pr("Thirty atoms each supply three atomic levels. Find the total number of levels across the three bands.", 90, "Multiply atoms by levels supplied per atom.", "30 × 3 = 90."),
          pr("One band has 24 levels in this model. Six atoms are added. How many levels does it then have?", 30, "Each extra atom adds one corresponding level.", "24 + 6 = 30."),
        ],
      },
      {
        title: "Filled bands and available states",
        minutes: 25,
        explain: [
          "Electrons need accessible empty states to change their motion under an electric field. A partly filled band in a metal provides nearby empty states. A completely filled band alone does not give ordinary conduction.",
          "The valence band is the highest occupied band in the insulating ground state. The conduction band lies above it. The energy difference between their edges is the band gap Eg. A semiconductor has a modest gap; an insulator generally has a wider one.",
        ],
        formulas: [
          ["Band gap","E_g=E_{c}-E_{v}"],
        ],
        examples: [
          ex("The valence edge is 0 eV and the conduction edge is 1.12 eV. Find Eg in eV.", [
            ["Subtract the lower edge from the upper edge.",""],
            ["Substitute the stated values and calculate.","1.12-0 \\approx 1.12\\,\\mathrm{eV}"],
          ], "1.12 eV"),
          ex("The valence edge is −2 eV and the conduction edge is 3.5 eV. Find Eg in eV.", [
            ["Keep the negative sign on the lower edge.",""],
            ["Substitute the stated values and calculate.","3.5-\\left(-2\\right) \\approx 5.5\\,\\mathrm{eV}"],
          ], "5.5 eV"),
        ],
        practice: [
          pr("A band has 20 available electron states and 10 are occupied. How many are empty?", 10, "Subtract occupied states from available states.", "20 − 10 = 10."),
          pr("The band edges are −1 eV and 0.4 eV. Find the gap in eV.", 1.4, "Take upper edge minus lower edge.", "0.4 − (−1) = 1.4 eV."),
          pr("Use Eg = 5.5 eV for diamond and 1.1 eV for silicon. What is their gap ratio, diamond divided by silicon?", 5, "Compare the two gap energies.", "5.5 ÷ 1.1 = 5."),
          pr("A band offers 40 electron states and all are occupied. How many empty states are within that band?", 0, "A full band leaves no vacancies within itself.", "40 − 40 = 0.", { tol: 0.000001 }),
        ],
      },
      {
        title: "Heat creates carriers",
        minutes: 25,
        explain: [
          "Heat can lift an electron across a gap. It leaves a hole, which is a missing electron in the valence band. Both the upper-band electron and the hole can carry current.",
          "For a simple intrinsic semiconductor model, carrier concentration varies as T^(3/2) exp[−Eg/(2kT)]. Intrinsic means no deliberate doping. Use k = 8.617 × 10⁻⁵ eV/K and kelvin. This model shows trends; its prefactor and gap can vary with material and temperature.",
        ],
        formulas: [
          ["Thermal energy","kT=k\\,T"],
          ["Intrinsic trend","n_i\\propto T^{3/2}e^{-E_g/(2kT)}"],
        ],
        examples: [
          ex("Using k = 8.617 × 10⁻⁵ eV/K, find kT at 300 K in eV.", [
            ["Multiply the constant by absolute temperature.",""],
            ["Substitute the stated values and calculate.","8.617\\times10^{-5}\\times 300 \\approx 0.02585\\,\\mathrm{eV}"],
          ], "0.02585 eV"),
          ex("For Eg = 1.12 eV and T = 300 K, find Eg/(2kT), using k = 8.617 × 10⁻⁵ eV/K.", [
            ["Find twice the thermal energy first.",""],
            ["Substitute the stated values and calculate.","\\frac{1.12}{\\left(2\\times 8.617\\times10^{-5}\\right)\\times 300} \\approx 21.66"],
          ], "21.66"),
        ],
        practice: [
          pr("Using the same k, find kT at 600 K in eV.", 0.051702, "Multiply k by T.", "8.617 × 10⁻⁵ × 600 = 0.0517 eV.", { tol: 0.00025851 }),
          pr("If 50 electrons cross the gap in pure material, how many holes are created?", 50, "Each crossing leaves one empty valence state.", "One hole for each crossing gives 50."),
          pr("For Eg = 1.12 eV and T = 600 K, find Eg/(2kT), using k = 8.617 × 10⁻⁵ eV/K.", 10.8313024641, "Keep the gap fixed while doubling T.", "1.12 ÷ (2 × 8.617 × 10⁻⁵ × 600) ≈ 10.83."),
          pr("Keep Eg fixed at 1.12 eV and the proportionality constant fixed. Estimate nᵢ(600 K)/nᵢ(300 K), using k = 8.617 × 10⁻⁵ eV/K.", 143060.548393, "Divide the two intrinsic expressions; their common constant cancels.", "(600/300)^(3/2) × exp[(1.12/(2k))(1/300 − 1/600)] ≈ 143100."),
        ],
      },
      {
        title: "Light probes the energy gap",
        minutes: 25,
        explain: [
          "A photon is a packet of light energy. Its energy in electron volts is approximately 1240 divided by its wavelength in nanometres. Shorter wavelength means more energy per photon.",
          "A photon below the gap cannot by itself excite an electron from the valence band to the conduction band. Above the gap, absorption may be possible, but thickness and the details of the material also matter. The gap alone does not predict all absorption or guarantee an efficient light emitter.",
        ],
        formulas: [
          ["Photon energy","E(\\mathrm{eV})\\approx\\frac{1240}{\\lambda(\\mathrm{nm})}"],
          ["Gap wavelength","\\lambda_g\\approx1240/E_g"],
        ],
        examples: [
          ex("Find the photon energy of 620 nm light in eV, using 1240 eV·nm.", [
            ["Divide the energy–wavelength constant by wavelength.",""],
            ["Substitute the stated values and calculate.","\\frac{1240}{620} \\approx 2\\,\\mathrm{eV}"],
          ], "2 eV"),
          ex("For Eg = 1.12 eV, estimate the gap wavelength in nm.", [
            ["Rearrange the photon relation.",""],
            ["Substitute the stated values and calculate.","\\frac{1240}{1.12} \\approx 1107\\,\\mathrm{nm}"],
          ], "1107 nm"),
        ],
        practice: [
          pr("Find the energy of 400 nm light in eV.", 3.1, "Use E = 1240/λ.", "1240 ÷ 400 = 3.1 eV."),
          pr("Find the energy of 800 nm light in eV.", 1.55, "Use wavelength in nanometres.", "1240 ÷ 800 = 1.55 eV."),
          pr("A photon has 2.5 eV. How much energy above a 1.1 eV gap is available, in eV?", 1.4, "Subtract the gap from photon energy.", "2.5 − 1.1 = 1.4 eV."),
          pr("For diamond’s 5.5 eV gap, estimate the threshold wavelength in nm.", 225.454545455, "Divide the constant by the gap.", "1240 ÷ 5.5 ≈ 225.5 nm."),
        ],
      },
    ],
  },

  'mate-119': {
    predict: {
      q: "You cool the molten copper further. Although the atoms move less quickly, what happens to the size a new crystal cluster must reach before it tends to grow?",
      options: ["It becomes larger","It becomes smaller","It stays unchanged","It becomes the grain size"],
      answer: 1,
      reveal: "Greater undercooling makes forming solid save more energy per unit volume. That lowers the critical cluster size, so more small clusters can survive and grow.",
    },
    parts: [
      {
        title: "Surface cost competes with volume saving",
        minutes: 25,
        explain: [
          "A crystal cluster inside a liquid creates a new surface. Making that surface costs energy. Below the melting temperature, making solid also saves energy throughout the cluster’s volume.",
          "For a sphere, surface area grows as radius squared, while volume grows as radius cubed. Write the positive saving per volume as g. Then ΔG = 4πr²γ − (4πr³/3)g. γ is the solid–liquid surface energy. Small clusters are dominated by the surface cost.",
        ],
        formulas: [
          ["Cluster energy","\\Delta G=4\\pi r^2\\gamma-\\frac{4\\pi r^3}{3}g"],
        ],
        examples: [
          ex("A spherical cluster has r = 2 nm and γ = 0.177 aJ/nm². Find its surface energy in aJ.", [
            ["Multiply sphere area by energy per area.",""],
            ["Substitute the stated values and calculate.","\\left(\\left(4\\times \\pi\\right)\\times \\left(2^{2}\\right)\\right)\\times 0.177 \\approx 8.897\\,\\mathrm{aJ}"],
          ], "8.897 aJ"),
          ex("A cluster has r = 2 nm, γ = 0.177 aJ/nm² and g = 0.10 aJ/nm³. Find total ΔG in aJ.", [
            ["Calculate surface cost and subtract the volume saving.",""],
            ["Substitute the stated values and calculate.","\\left(\\left(4\\times \\pi\\right)\\times 4\\right)\\times 0.177-\\frac{\\left(\\left(4\\times \\pi\\right)\\times 8\\right)\\times 0.1}{3} \\approx 5.546\\,\\mathrm{aJ}"],
          ], "5.546 aJ"),
        ],
        practice: [
          pr("When sphere radius doubles, by what factor does its surface area increase?", 4, "Area depends on radius squared.", "2² = 4."),
          pr("When sphere radius doubles, by what factor does its volume increase?", 8, "Volume depends on radius cubed.", "2³ = 8."),
          pr("For r = 1 nm and g = 0.20 aJ/nm³, find the positive volume energy saving in aJ.", 0.837758040957, "Multiply sphere volume by g.", "(4π/3) × 1³ × 0.20 ≈ 0.8378 aJ."),
          pr("For r = 3 nm, γ = 0.177 aJ/nm² and g = 0.20 aJ/nm³, find total ΔG in aJ.", -2.60123871717, "Keep the volume term negative.", "4π(3²)(0.177) − (4π/3)(3³)(0.20) ≈ -2.601 aJ."),
        ],
      },
      {
        title: "The critical cluster",
        minutes: 25,
        explain: [
          "The cluster energy rises to a peak and then falls. The radius at that peak is the critical radius r*. A cluster just below it tends to shrink; one above it tends to grow, because either change lowers its energy.",
          "The energy peak is the nucleation barrier ΔG*. In the spherical model, r* = 2γ/g and ΔG* = 16πγ³/(3g²). This is a simplified model with a sharp interface and constant surface energy.",
        ],
        formulas: [
          ["Critical radius","r^*=2\\gamma/g"],
          ["Barrier","\\Delta G^*=16\\pi\\gamma^3/(3g^2)"],
        ],
        examples: [
          ex("Use γ = 0.177 aJ/nm² and g = 0.10 aJ/nm³. Find r* in nm.", [
            ["Divide twice the surface energy by the volume saving.",""],
            ["Substitute the stated values and calculate.","\\frac{2\\times 0.177}{0.1} \\approx 3.54\\,\\mathrm{nm}"],
          ], "3.54 nm"),
          ex("With the same γ and g, find ΔG* in aJ.", [
            ["Cube γ and square g.",""],
            ["Substitute the stated values and calculate.","\\frac{\\left(16\\times \\pi\\right)\\times \\left(0.177^{3}\\right)}{3\\times \\left(0.1^{2}\\right)} \\approx 9.291\\,\\mathrm{aJ}"],
          ], "9.291 aJ"),
        ],
        practice: [
          pr("Use γ = 0.20 aJ/nm² and g = 0.10 aJ/nm³. Find r* in nm.", 4, "Use 2γ/g.", "2 × 0.20 ÷ 0.10 = 4 nm."),
          pr("At fixed γ, g doubles. If r* was 4 nm, find its new value in nm.", 2, "Critical radius is inversely proportional to g.", "4 ÷ 2 = 2 nm."),
          pr("At fixed γ, g doubles. If the barrier was 12 aJ, find the new barrier in aJ.", 3, "The barrier depends on one over g squared.", "12 ÷ 2² = 3 aJ."),
          pr("A cluster has radius 3 nm and r* = 2 nm. Find the ratio r/r*.", 1.5, "Compare the actual radius with the critical radius.", "3 ÷ 2 = 1.5."),
        ],
      },
      {
        title: "Undercooling changes the barrier",
        minutes: 25,
        explain: [
          "Undercooling ΔT means melting temperature minus liquid temperature. For modest undercooling, the volume saving is approximately g = Hf ΔT/Tm. Hf is latent heat per volume and Tm is the melting temperature in kelvin.",
          "The scene uses illustrative copper values γ = 0.177 aJ/nm², Hf = 1.88 aJ/nm³ and Tm = 1358 K. More undercooling raises g, reduces r* and sharply reduces the barrier. A temperature difference has the same numerical size in kelvin and degrees Celsius.",
        ],
        formulas: [
          ["Driving force estimate","g\\approx H_f\\Delta T/T_m"],
        ],
        examples: [
          ex("Use Hf = 1.88 aJ/nm³, Tm = 1358 K and ΔT = 40 K. Find g in aJ/nm³.", [
            ["Multiply latent heat per volume by the fractional undercooling.",""],
            ["Substitute the stated values and calculate.","\\frac{1.88\\times 40}{1358} \\approx 0.05538\\,\\mathrm{aJ}/\\mathrm{nm}^{3}"],
          ], "0.05538 aJ/nm³"),
          ex("With γ = 0.177 aJ/nm² and the same Hf and Tm, find r* at ΔT = 150 K, in nm.", [
            ["Calculate g at this undercooling, then use 2γ/g.",""],
            ["Substitute the stated values and calculate.","\\frac{2\\times 0.177}{\\frac{1.88\\times 150}{1358}} \\approx 1.705\\,\\mathrm{nm}"],
          ], "1.705 nm"),
        ],
        practice: [
          pr("Tm = 1358 K and the liquid is at 1258 K. Find ΔT in K.", 100, "Subtract liquid temperature from melting temperature.", "1358 − 1258 = 100 K."),
          pr("With Hf = 1.88 aJ/nm³ and Tm = 1358 K, find g at ΔT = 100 K in aJ/nm³.", 0.138438880707, "Use the same driving-force estimate.", "1.88 × 100 ÷ 1358 ≈ 0.1384 aJ/nm³.", { tol: 0.000692194403535 }),
          pr("Using the scene’s copper values, find r* at ΔT = 300 K, in nm.", 0.852361702128, "First find the volume saving.", "2 × 0.177 ÷ (1.88 × 300/1358) ≈ 0.8524 nm."),
          pr("In this model, undercooling triples at fixed γ, Hf and Tm. A barrier was 18 aJ. Find its new value in aJ.", 2, "g triples and the barrier varies as 1/g².", "18 ÷ 3² = 2 aJ."),
        ],
      },
      {
        title: "Seeds, grain count and casting",
        minutes: 25,
        explain: [
          "A new crystal can start on an existing surface. This is heterogeneous nucleation. A favourable surface reduces the new interface that must be created, so it can lower the barrier without requiring as much undercooling.",
          "Foundries add suitable grain-refining particles to make more starting points. If many nuclei survive, they share the casting volume and make finer grains. The estimates here assume equal grain volumes and that every counted nucleus survives; real castings have a distribution of grain sizes.",
        ],
        formulas: [
          ["Equal-grain estimate","\\ell\\approx(V/N)^{1/3}"],
          ["Surface-assisted barrier","\\Delta G^*_{het}=f\\Delta G^*_{hom},\\quad 0<f<1"],
        ],
        examples: [
          ex("A favourable seed multiplies a 20 aJ barrier by f = 0.25. Find the new barrier in aJ.", [
            ["Multiply the original barrier by the surface factor.",""],
            ["Substitute the stated values and calculate.","20\\times 0.25 \\approx 5\\,\\mathrm{aJ}"],
          ], "5 aJ"),
          ex("Eight equal cubic grains fill 1 mm³. Estimate each grain edge in mm.", [
            ["Divide total volume by grain count, then take the cube root.",""],
            ["Substitute the stated values and calculate.","\\sqrt[3]{\\frac{1}{8}} \\approx 0.5\\,\\mathrm{mm}"],
          ], "0.5 mm"),
        ],
        practice: [
          pr("A seed gives f = 0.10 for a 30 aJ barrier. Find the reduced barrier in aJ.", 3, "Use f times the original barrier.", "30 × 0.10 = 3 aJ."),
          pr("A volume of 8 mm³ contains 64 equal cubic grains. Find the estimated edge in mm.", 0.5, "Each grain gets an equal share of the volume.", "(8 ÷ 64)^(1/3) = 0.5 mm."),
          pr("At fixed total volume, grain count rises eightfold. An estimated edge was 0.4 mm. Find the new edge in mm.", 0.2, "Edge scales with the inverse cube root of count.", "0.4 ÷ 8^(1/3) = 0.2 mm.", { tol: 0.001 }),
          pr("A 27 mm³ casting is divided into equal cubic grains of edge 0.3 mm. Estimate the number of grains.", 1000, "Divide total volume by one grain’s volume.", "27 ÷ 0.3³ = 1000."),
        ],
      },
    ],
  },

  'mate-201': {
    predict: {
      q: "A steel gear spends 2 hours in a furnace. You want twice the diffusion depth at the same temperature. How long should you plan for?",
      options: ["3 hours altogether","4 hours altogether","8 hours altogether","16 hours altogether"],
      answer: 2,
      reveal: "Diffusion depth grows with the square root of time. Doubling depth takes four times as long, so the total time is 8 hours.",
    },
    parts: [
      {
        title: "Slip and obstacles",
        minutes: 25,
        explain: [
          "A dislocation is a line defect in a crystal. It lets a plane slip a little at a time, like a ripple moving across a rug. Moving the ripple needs less force than sliding a whole plane at once.",
          "Solute atoms, other dislocations, grain boundaries and small particles can obstruct this motion. Blocking slip raises yield strength. Cold working also reduces cross-sectional area; percentage cold work compares the lost area with the original area.",
        ],
        formulas: [
          ["Percentage cold work","CW=100\\frac{A_0-A_f}{A_0}"],
        ],
        examples: [
          ex("A wire is drawn from 100 to 80 mm² cross-sectional area. Find cold work in percent.", [
            ["Compare area reduction with the original area.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times \\left(100-80\\right)}{100} \\approx 20\\,\\%"],
          ], "20 %"),
          ex("An illustrative metal follows σy = 50 + 100/√d MPa, with d in μm. Find σy at d = 25 μm.", [
            ["Smaller grains increase the boundary contribution.",""],
            ["Substitute the stated values and calculate.","50+\\frac{100}{\\sqrt{25}} \\approx 70\\,\\mathrm{MPa}"],
          ], "70 MPa"),
        ],
        practice: [
          pr("Area falls from 50 to 40 mm². Find cold work in percent.", 20, "Use the original area in the denominator.", "100 × (50 − 40)/50 = 20 %."),
          pr("Area falls from 60 to 30 mm². Find cold work in percent.", 50, "Find the fraction of area removed.", "100 × (60 − 30)/60 = 50 %."),
          pr("Use σy = 50 + 100/√d MPa with d in μm. Find σy for d = 4 μm.", 100, "Evaluate the square root before dividing.", "50 + 100/√4 = 100 MPa."),
          pr("In that illustrative strength rule, refine grains from 25 to 4 μm. Find the strength increase in MPa.", 30, "Subtract the two yield strengths.", "(50 + 100/2) − (50 + 100/5) = 30 MPa."),
        ],
      },
      {
        title: "Flux down a concentration slope",
        minutes: 25,
        explain: [
          "Diffusion is atomic motion that spreads a concentration difference. Individual atoms jump in different directions, but more atoms leave a high-concentration region than a low-concentration one. The net movement is down the concentration slope.",
          "Flux J is the amount passing through unit area per unit time. For a steady, straight concentration profile, Fick’s first law is J = −D(C₂ − C₁)/L. D is diffusivity. Define positive distance from face 1 to face 2 and use consistent units.",
        ],
        formulas: [
          ["Steady diffusion","J=-D\\frac{C_2-C_1}{L}"],
        ],
        examples: [
          ex("A membrane has D = 10⁻⁸ m²/s, C₁ = 2.4 kg/m³, C₂ = 0.4 kg/m³ and L = 0.002 m. Find J in kg/(m²·s), positive towards face 2.", [
            ["Find the signed concentration slope, then multiply by −D.",""],
            ["Substitute the stated values and calculate.","\\frac{\\left(-1\\times10^{-8}\\right)\\times \\left(0.4-2.4\\right)}{0.002} \\approx 0.00001\\,\\mathrm{kg}/(\\mathrm{m}^{2}\\cdot \\mathrm{s})"],
          ], "0.00001 kg/(m²·s)"),
          ex("A constant flux of 10⁻⁵ kg/(m²·s) passes through 0.2 m² for 1000 s. Find the transported mass in kg.", [
            ["Multiply flux by area and time.",""],
            ["Substitute the stated values and calculate.","\\left(1\\times10^{-5}\\times 0.2\\right)\\times 1000 \\approx 0.002\\,\\mathrm{kg}"],
          ], "0.002 kg"),
        ],
        practice: [
          pr("Concentration falls from 3 to 1 kg/m³ across 0.01 m. Find the signed slope in kg/m⁴.", -200, "Use final minus initial concentration over thickness.", "(1 − 3)/0.01 = -200 kg/m⁴."),
          pr("D = 2 × 10⁻⁹ m²/s and dC/dx = −500 kg/m⁴. Find J in kg/(m²·s).", 0.000001, "The two negative signs cancel.", "−(2 × 10⁻⁹) × (−500) = 0.000001 kg/(m²·s).", { tol: 5e-9 }),
          pr("The same concentration difference acts across twice the membrane thickness. Original J = 8 × 10⁻⁶ kg/(m²·s). Find the new J in kg/(m²·s), with D unchanged.", 0.000004, "The slope magnitude halves.", "8 × 10⁻⁶ ÷ 2 = 0.000004 kg/(m²·s).", { tol: 2e-8 }),
          pr("A membrane carries 0.003 kg in 600 s through 0.5 m². Find its mean flux in kg/(m²·s).", 0.00001, "Rearrange mass = flux × area × time.", "0.003 ÷ (600 × 0.5) = 0.00001 kg/(m²·s).", { tol: 5.0000000000000004e-8 }),
        ],
      },
      {
        title: "Temperature controls diffusivity",
        minutes: 25,
        explain: [
          "A jump needs enough energy to pass an atomic barrier. Raising temperature makes successful jumps much more frequent. The Arrhenius relation describes this: D = D₀ exp[−Q/(RT)].",
          "D₀ is a prefactor, Q the activation energy per mole and R the gas constant. Use Q in J/mol with R = 8.314 J/(mol·K), and use kelvin. The scene’s illustrative carbon-in-iron values are D₀ = 2.3 × 10⁻⁵ m²/s and Q = 148000 J/mol.",
        ],
        formulas: [
          ["Arrhenius diffusivity","D=D_0e^{-Q/(RT)}"],
        ],
        examples: [
          ex("Use the scene’s D₀ = 2.3 × 10⁻⁵ m²/s and Q = 148000 J/mol. Find D at 1200 K, using R = 8.314. Report the value in units of 10⁻¹² m²/s.", [
            ["Calculate the exponent using absolute temperature.",""],
            ["Substitute the stated values and calculate.","\\frac{2.3\\times10^{-5}\\times \\exp\\left(\\frac{-148000}{8.314\\times 1200}\\right)}{1\\times10^{-12}} \\approx 8.303\\,\\left(10^{-12}\\,\\mathrm{m}^{2}/\\mathrm{s}\\right)"],
          ], "8.303 10⁻¹² m²/s"),
          ex("With Q = 148000 J/mol, estimate D(1300 K)/D(1200 K), keeping D₀ fixed and R = 8.314.", [
            ["Divide the Arrhenius expressions so D₀ cancels.",""],
            ["Substitute the stated values and calculate.","\\exp\\left(\\left(\\frac{148000}{8.314}\\right)\\times \\left(\\frac{1}{1200}-\\frac{1}{1300}\\right)\\right) \\approx 3.13"],
          ], "3.13"),
        ],
        practice: [
          pr("Convert 950 °C to K using K = °C + 273.15.", 1223.15, "Add the Celsius-to-kelvin offset.", "950 + 273.15 = 1223 K."),
          pr("Convert 148 kJ/mol to J/mol.", 148000, "There are 1000 joules per kilojoule.", "148 × 1000 = 148000 J/mol."),
          pr("Use D₀ = 2.3 × 10⁻⁵ m²/s, Q = 148000 J/mol and R = 8.314. Find D at 1300 K. Report the value in units of 10⁻¹² m²/s.", 25.9896359246, "Substitute the higher absolute temperature.", "(2.3 × 10⁻⁵ exp[−148000/(8.314 × 1300)]) ÷ 10⁻¹² ≈ 25.99 10⁻¹² m²/s."),
          pr("At fixed T, diffusivity changes from 2 × 10⁻¹² to 6 × 10⁻¹² m²/s because a different diffusion path is used. Find the ratio of the new D to the old D.", 3, "Divide the two measured diffusivities.", "(6 × 10⁻¹²)/(2 × 10⁻¹²) = 3."),
        ],
      },
      {
        title: "Depth needs time",
        minutes: 25,
        explain: [
          "Diffusion changes a concentration profile with time. Fick’s second law says that, for constant diffusivity in one direction, the local rate of concentration change equals D times the profile’s curvature. Curvature means how quickly its slope changes with distance. A straight profile has zero curvature, so it has no local accumulation.",
          "For an initially uniform, thick solid held at fixed surface concentration, the scene marks a characteristic length L = 2√(Dt). This is a length scale, not a sharp boundary between treated and untreated metal. At fixed concentration criterion, depth has the same square-root dependence on time.",
        ],
        formulas: [
          ["Fick’s second law in words","\\text{local concentration change per time}=D\\times\\text{profile curvature}"],
          ["Characteristic length","L=2\\sqrt{Dt}"],
        ],
        examples: [
          ex("For D = 10⁻¹¹ m²/s and t = 3600 s, find L = 2√(Dt) in mm.", [
            ["Find length in metres, then convert to millimetres.",""],
            ["Substitute the stated values and calculate.","\\left(2\\times \\sqrt{1\\times10^{-11}\\times 3600}\\right)\\times 1000 \\approx 0.3795\\,\\mathrm{mm}"],
          ], "0.3795 mm"),
          ex("A fixed diffusion-depth criterion is 0.5 mm after 2 h. At the same D, how many hours give 1.5 mm?", [
            ["Time scales as depth squared.",""],
            ["Substitute the stated values and calculate.","2\\times \\left(\\left(\\frac{1.5}{0.5}\\right)^{2}\\right) \\approx 18\\,\\mathrm{h}"],
          ], "18 h"),
        ],
        practice: [
          pr("Convert 4 h to seconds.", 14400, "One hour contains 3600 seconds.", "4 × 3600 = 14400 s."),
          pr("At fixed D, depth is 0.4 mm after 1 h. Find depth after 9 h in mm.", 1.2, "Multiply depth by the square root of the time ratio.", "0.4 × √9 = 1.2 mm."),
          pr("For D = 4 × 10⁻¹² m²/s and t = 10000 s, find L = 2√(Dt) in mm.", 0.4, "Keep seconds and square metres consistent.", "2√(4 × 10⁻¹² × 10000) × 1000 = 0.4 mm.", { tol: 0.002 }),
          pr("For L = 1 mm and D = 10⁻¹¹ m²/s, find the time in hours under L = 2√(Dt).", 6.94444444444, "Square L/2, divide by D, then convert seconds to hours.", "(0.001/2)² ÷ 10⁻¹¹ ÷ 3600 ≈ 6.944 h."),
        ],
      },
    ],
  },

  'mate-202': {
    predict: {
      q: "A tie line joins a nickel-poor liquid to a nickel-rich solid. You move the overall composition towards the liquid end, staying inside the two-phase region at the same temperature. What changes?",
      options: ["Both phase compositions rise","The solid fraction rises","The phase amounts stay equal","The liquid fraction rises"],
      answer: 3,
      reveal: "The tie-line ends keep the same compositions at that temperature. Moving the overall composition towards the liquid end means more liquid and less solid.",
    },
    parts: [
      {
        title: "Reading an equilibrium map",
        minutes: 25,
        explain: [
          "A phase diagram maps equilibrium phases against temperature and composition. For a binary alloy, the composition axis usually gives the mass percentage of one element. The two percentages add to the whole alloy.",
          "The liquidus marks the boundary above which the alloy is all liquid. The solidus marks the boundary below which it is all solid. Between them, liquid and solid can coexist. These equilibrium boundaries do not tell you how quickly a casting reaches its final structure.",
        ],
        formulas: [
          ["Mass percentage","C=100m_B/(m_A+m_B)"],
        ],
        examples: [
          ex("An alloy contains 30 g nickel and 70 g copper. Find its nickel content in wt%.", [
            ["Divide nickel mass by total mass.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times 30}{30+70} \\approx 30\\,\\mathrm{wt}\\%"],
          ], "30 wt%"),
          ex("For an illustrative alloy, liquidus is 1300 °C and solidus is 1200 °C. Find the freezing interval in °C.", [
            ["Subtract the lower boundary from the upper boundary.",""],
            ["Substitute the stated values and calculate.","1300-1200 \\approx 100\\,{}^\\circ \\mathrm{C}"],
          ], "100 °C"),
        ],
        practice: [
          pr("An alloy is 35 wt% nickel and the rest copper. Find copper wt%.", 65, "The mass percentages add to 100.", "100 − 35 = 65 wt%."),
          pr("A 200 g alloy is 25 wt% nickel. Find nickel mass in g.", 50, "Convert the percentage to a fraction.", "200 × 0.25 = 50 g."),
          pr("An alloy contains 40 g nickel and 160 g copper. Find nickel wt%.", 20, "Use total alloy mass in the denominator.", "100 × 40/200 = 20 wt%."),
          pr("An illustrative alloy freezes between 1280 and 1195 °C. Find the interval in °C.", 85, "Take upper minus lower temperature.", "1280 − 1195 = 85 °C."),
        ],
      },
      {
        title: "Tie lines give phase compositions",
        minutes: 25,
        explain: [
          "Inside a two-phase field, draw a horizontal line through the selected temperature. Its endpoints on the boundaries give the compositions of the two phases. Those are usually different from the overall composition.",
          "Call the phase mass fractions wL and wα. Conservation of mass gives wL + wα = 1 and C₀ = wL CL + wα Cα. Use compositions in the same units throughout. A 40 wt% overall alloy does not automatically contain 40% solid.",
        ],
        formulas: [
          ["Composition balance","C_0=w_LC_L+w_\\alpha C_\\alpha"],
          ["Mass balance","w_L+w_\\alpha=1"],
        ],
        examples: [
          ex("Equal masses of liquid at 20 wt% nickel and solid at 60 wt% nickel coexist. Find overall nickel wt%.", [
            ["Take the mass-weighted average.",""],
            ["Substitute the stated values and calculate.","0.5\\times 20+0.5\\times 60 \\approx 40\\,\\mathrm{wt}\\%"],
          ], "40 wt%"),
          ex("A mixture is 75% liquid at 30 wt% nickel and 25% solid at 50 wt% nickel. Find overall nickel wt%.", [
            ["Multiply each composition by its mass fraction.",""],
            ["Substitute the stated values and calculate.","0.75\\times 30+0.25\\times 50 \\approx 35\\,\\mathrm{wt}\\%"],
          ], "35 wt%"),
        ],
        practice: [
          pr("The solid mass fraction is 0.30. Find the liquid mass fraction.", 0.7, "The two fractions add to one.", "1 − 0.30 = 0.7."),
          pr("A tie line ends at 25 and 45 wt% nickel. Find its composition span in percentage points.", 20, "Subtract the left endpoint from the right endpoint.", "45 − 25 = 20 percentage points."),
          pr("A mixture has 0.2 liquid at 10 wt% B and 0.8 solid at 50 wt% B. Find overall wt% B.", 42, "Use the weighted average.", "0.2 × 10 + 0.8 × 50 = 42 wt%."),
          pr("A 400 g two-phase alloy has solid fraction 0.65. Find solid mass in g.", 260, "Multiply total mass by solid fraction.", "400 × 0.65 = 260 g."),
        ],
      },
      {
        title: "The opposite-arm lever rule",
        minutes: 25,
        explain: [
          "The lever rule solves the composition balance. To find the fraction at the right endpoint, divide the distance from the left endpoint to the overall composition by the full tie-line length.",
          "The nearer your overall composition lies to an endpoint, the more of that endpoint’s phase you need. The opposite-arm rule gives this behaviour automatically. It works only between the two endpoints in the stated two-phase field.",
        ],
        formulas: [
          ["Solid fraction when solid is the right endpoint","w_\\alpha=\\frac{C_0-C_L}{C_\\alpha-C_L}"],
          ["Liquid fraction","w_L=1-w_\\alpha"],
        ],
        examples: [
          ex("An illustrative tie line has CL = 30, Cα = 50 and C₀ = 35, all in wt% nickel. Find solid fraction.", [
            ["Use the arm opposite the solid endpoint.",""],
            ["Substitute the stated values and calculate.","\\frac{35-30}{50-30} \\approx 0.25"],
          ], "0.25"),
          ex("For CL = 20, Cα = 60 and C₀ = 50 wt% nickel, find liquid fraction.", [
            ["Use the arm opposite the liquid endpoint.",""],
            ["Substitute the stated values and calculate.","\\frac{60-50}{60-20} \\approx 0.25"],
          ], "0.25"),
        ],
        practice: [
          pr("CL = 20, Cα = 60 and C₀ = 40 wt% nickel. Find solid fraction.", 0.5, "Use overall minus liquid over the full span.", "(40 − 20)/(60 − 20) = 0.5."),
          pr("CL = 10, Cα = 50 and C₀ = 20 wt% B. Find liquid fraction.", 0.75, "The liquid fraction uses the right-hand arm.", "(50 − 20)/(50 − 10) = 0.75."),
          pr("An alloy has CL = 30, Cα = 50 and C₀ = 42 wt% nickel. Find solid percentage.", 60, "Apply the lever rule, then convert to percent.", "100 × (42 − 30)/(50 − 30) = 60 %."),
          pr("A 500 g alloy has CL = 30, Cα = 50 and C₀ = 35 wt% nickel. Find solid mass in g.", 125, "Find solid fraction before multiplying by total mass.", "500 × (35 − 30)/(50 − 30) = 125 g."),
        ],
      },
      {
        title: "Eutectics and the steel map",
        minutes: 25,
        explain: [
          "A eutectic reaction turns a liquid into two solids at a particular equilibrium temperature and composition. A eutectoid reaction instead turns one solid into two other solids. The names are similar, but the starting phases differ.",
          "In the usual metastable iron–cementite diagram, eutectoid austenite near 0.76 wt% carbon forms ferrite and cementite near 727 °C. Their layered microstructure is pearlite. Just below this temperature, use illustrative endpoint compositions 0.022 wt% carbon in ferrite and 6.67 wt% in cementite. Pearlite is a microstructure containing two phases.",
        ],
        formulas: [
          ["Two-solid lever rule","w_\\beta=\\frac{C_0-C_\\alpha}{C_\\beta-C_\\alpha}"],
          ["Eutectoid reaction","\\gamma\\longrightarrow\\alpha+\\mathrm{Fe}_3\\mathrm{C}"],
        ],
        examples: [
          ex("In a binary solder just below its eutectic temperature, Cα = 10, Cβ = 90 and C₀ = 66 wt% B. Find β percentage.", [
            ["Use the arm opposite β.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times \\left(66-10\\right)}{90-10} \\approx 70\\,\\%"],
          ], "70 %"),
          ex("Just below the eutectoid temperature, use Cα = 0.022, Ccementite = 6.67 and C₀ = 0.76 wt% carbon. Find cementite percentage in pearlite.", [
            ["Apply the lever rule between ferrite and cementite.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times \\left(0.76-0.022\\right)}{6.67-0.022} \\approx 11.1\\,\\%"],
          ], "11.1 %"),
        ],
        practice: [
          pr("Pearlite contains ferrite and cementite. How many distinct phases are these?", 2, "Count its two constituent phases.", "Ferrite plus cementite gives 2."),
          pr("A eutectic liquid becomes α and β. How many solid product phases form?", 2, "Count the distinct solid products.", "α plus β gives 2."),
          pr("Just below 727 °C, estimate pearlite percentage in slowly cooled 0.40 wt% carbon steel using ferrite at 0.022 and eutectoid austenite at 0.76 wt% just before transformation.", 51.2195121951, "The fraction of austenite just before transformation becomes pearlite.", "100 × (0.40 − 0.022)/(0.76 − 0.022) ≈ 51.22 %."),
          pr("Using those same assumptions, find the proeutectoid ferrite percentage in 0.40 wt% carbon steel.", 48.7804878049, "Find the ferrite present before the remaining austenite becomes pearlite.", "100 × (0.76 − 0.40)/(0.76 − 0.022) ≈ 48.78 %."),
        ],
      },
    ],
  },

  'mate-203': {
    predict: {
      q: "Two identical steel pieces begin as austenite. One cools slowly in the furnace; the other is quenched rapidly in water. Which is likelier to be harder immediately afterwards?",
      options: ["The water-quenched piece","The furnace-cooled piece","Both must be equally hard","Whichever has less carbon"],
      answer: 0,
      reveal: "A sufficiently rapid quench suppresses diffusion and can form hard martensite. Slow cooling gives carbon time to redistribute into softer structures such as coarse pearlite.",
    },
    parts: [
      {
        title: "Cooling paths need a clock",
        minutes: 25,
        explain: [
          "An equilibrium phase diagram tells you which phases are favoured after enough time. Heat treatment also needs a clock: carbon atoms may not have time to move before the temperature changes again.",
          "A TTT diagram records transformation during holds at constant temperature. Its time axis is commonly logarithmic: equal horizontal distances represent equal time ratios. Continuous cooling needs a cooling-transformation diagram for precise predictions; the scene overlays cooling paths as a simplified guide.",
        ],
        formulas: [
          ["Logarithmic time coordinate","u=\\log_{10}(t)"],
        ],
        examples: [
          ex("On a time axis labelled log₁₀(t/s), what time in seconds corresponds to u = 2?", [
            ["Raise ten to the plotted coordinate.",""],
            ["Substitute the stated values and calculate.","10^{2} \\approx 100\\,\\mathrm{s}"],
          ], "100 s"),
          ex("A constant-rate cooling step falls from 800 to 500 °C in 3 s. Find its mean cooling-rate magnitude in °C/s.", [
            ["Divide the temperature drop by elapsed time.",""],
            ["Substitute the stated values and calculate.","\\frac{800-500}{3} \\approx 100\\,{}^\\circ \\mathrm{C}/\\mathrm{s}"],
          ], "100 °C/s"),
        ],
        practice: [
          pr("What time in seconds corresponds to log₁₀(t/s) = 1?", 10, "Use a power of ten.", "10¹ = 10 s."),
          pr("A hold changes from 10 to 1000 s. By what factor is it longer?", 100, "Compare the two times by division.", "1000 ÷ 10 = 100."),
          pr("A piece cools from 850 to 250 °C in 12 s. Find mean rate magnitude in °C/s.", 50, "Use the whole temperature drop.", "(850 − 250)/12 = 50 °C/s."),
          pr("On a log₁₀ time axis, how many equal decades separate 0.1 and 100 s?", 3, "Subtract their logarithmic coordinates.", "2 − (−1) = 3."),
        ],
      },
      {
        title: "Diffusive transformations compete",
        minutes: 25,
        explain: [
          "Near the equilibrium transformation temperature, the driving force is small. At much lower temperatures, diffusion is slow. Between these extremes, transformation can be faster, giving the familiar C-shaped start curve.",
          "Pearlite forms by carbon redistribution into ferrite and cementite layers. Lower transformation temperatures within the pearlite range generally make finer spacing. Bainite forms in a lower-temperature range by a different process. A fraction transformed measures how much of the original austenite has changed. A simple isothermal fit is X = 1 − exp(−ktⁿ), where t is hold time and k and n are fitted constants; their units must match the time units.",
        ],
        formulas: [
          ["Transformed fraction","X=m_{transformed}/m_{initial}"],
          ["Illustrative isothermal kinetic law","X=1-e^{-kt^n}"],
        ],
        examples: [
          ex("Of 200 g initial austenite, 80 g has transformed during a hold. Find X.", [
            ["Divide transformed mass by initial mass.",""],
            ["Substitute the stated values and calculate.","\\frac{80}{200} \\approx 0.4"],
          ], "0.4"),
          ex("During an illustrative constant-temperature hold, X = 1 − exp(−0.01t²), with t in seconds. Find X at 10 s.", [
            ["Evaluate the exponent, then subtract from one.",""],
            ["Substitute the stated values and calculate.","1-\\exp\\left(\\left(-0.01\\right)\\times \\left(10^{2}\\right)\\right) \\approx 0.6321"],
          ], "0.6321"),
        ],
        practice: [
          pr("Of 100 g austenite, 25 g has transformed. Find the transformed percentage.", 25, "Use transformed mass as a fraction of the initial mass.", "100 × 25/100 = 25 %."),
          pr("A hold transforms 65% of the austenite. What percentage remains?", 35, "The transformed and remaining fractions add to the whole.", "100 − 65 = 35 %."),
          pr("Use X = 1 − exp(−0.01t²) for the same illustrative isothermal hold. Find X at 5 s.", 0.221199216929, "Square the time before multiplying by the constant.", "1 − exp(−0.01 × 5²) ≈ 0.2212.", { tol: 0.001105996084645 }),
          pr("For X = 1 − exp(−0.01t²), find the isothermal time to X = 0.5 in seconds.", 8.32554611158, "Take the logarithm of 1 − X and solve for t.", "√[−ln(0.5)/0.01] ≈ 8.326 s."),
        ],
      },
      {
        title: "Quenching and martensite",
        minutes: 25,
        explain: [
          "A rapid quench can bypass diffusive transformations. Austenite then changes shape by a coordinated movement of atoms, trapping carbon in a strained lattice. The product is martensite, typically hard and brittle.",
          "The martensite start temperature Ms is where this transformation begins on cooling. Its value depends on composition. The scene uses Ms = 220 °C and an illustrative lower marker of 100 °C. Cooling below Ms does not itself mean all austenite has already transformed.",
        ],
        formulas: [
          ["Undercooling below martensite start","\\Delta T_M=M_s-T"],
          ["Illustrative remaining-austenite law","f_\\gamma=e^{-b(M_s-T)},\\quad T<M_s"],
        ],
        examples: [
          ex("Use Ms = 220 °C. A specimen reaches 180 °C. Find the undercooling below Ms in °C.", [
            ["Subtract specimen temperature from Ms.",""],
            ["Substitute the stated values and calculate.","220-180 \\approx 40\\,{}^\\circ \\mathrm{C}"],
          ], "40 °C"),
          ex("For an illustrative martensite law fγ = exp[−0.011(Ms − T)], use Ms = 220 °C and T = 100 °C. Find the martensite fraction, assuming no prior transformation.", [
            ["Find remaining austenite, then subtract it from one.",""],
            ["Substitute the stated values and calculate.","1-\\exp\\left(\\left(-0.011\\right)\\times \\left(220-100\\right)\\right) \\approx 0.7329"],
          ], "0.7329"),
        ],
        practice: [
          pr("Ms = 220 °C and T = 200 °C. Find undercooling below Ms in °C.", 20, "Use Ms minus current temperature.", "220 − 200 = 20 °C."),
          pr("The scene’s markers are 220 and 100 °C. Find their temperature separation in °C.", 120, "Subtract the lower marker.", "220 − 100 = 120 °C."),
          pr("A quenched specimen contains 0.85 martensite and the rest austenite. Find retained-austenite fraction.", 0.15, "The two fractions add to one.", "1 − 0.85 = 0.15.", { tol: 0.00075 }),
          pr("Using fγ = exp[−0.011(Ms − T)], Ms = 220 °C and T = 20 °C, find martensite percentage if no prior transformation occurred.", 88.9196841638, "Subtract retained austenite from one, then convert to percent.", "100{1 − exp[−0.011(220 − 20)]} ≈ 88.92 %."),
        ],
      },
      {
        title: "Anneal, normalise, quench and temper",
        minutes: 25,
        explain: [
          "Annealing with slow cooling can soften steel for machining. Normalising uses air cooling and often gives finer pearlite. Quenching can create high hardness, while tempering reheats below the austenite-forming range to trade some hardness for toughness and relieve stresses.",
          "Hardenability means the ability to harden through a section, rather than just at its surface. A thick centre cools more slowly. Suitable alloying additions can delay diffusive transformations, letting that centre form martensite. Actual schedules depend on steel grade, size and cooling conditions.",
        ],
        formulas: [
          ["Hardness change","\\Delta H=H_{after}-H_{before}"],
          ["Section cooling comparison","r=t_{centre}/t_{surface}"],
        ],
        examples: [
          ex("A tempering trial lowers hardness from 600 to 480 HV. Find the hardness reduction in percent.", [
            ["Compare the loss with the starting hardness.",""],
            ["Substitute the stated values and calculate.","\\frac{100\\times \\left(600-480\\right)}{600} \\approx 20\\,\\%"],
          ], "20 %"),
          ex("A shaft surface reaches a selected temperature in 2 s; its centre takes 12 s. Find the centre-to-surface time ratio.", [
            ["Divide the slower time by the faster time.",""],
            ["Substitute the stated values and calculate.","\\frac{12}{2} \\approx 6"],
          ], "6"),
        ],
        practice: [
          pr("A treatment holds at temperature for 45 min. Find the time in seconds.", 2700, "Each minute contains 60 seconds.", "45 × 60 = 2700 s."),
          pr("Hardness changes from 550 to 500 HV after tempering. Find after minus before in HV.", -50, "Keep the sign of the change.", "500 − 550 = -50 HV."),
          pr("Two trials give yield strengths 900 and 1050 MPa. Find the increase in percent relative to 900 MPa.", 16.6666666667, "Divide the increase by the original strength.", "100 × (1050 − 900)/900 ≈ 16.67 %."),
          pr("In a simplified screening rule, the centre must reach a target before a 30 s limit. It takes 12 s. Find the time margin in seconds.", 18, "Subtract actual time from the stated limit.", "30 − 12 = 18 s."),
        ],
      },
    ],
  },

  'mate-301': {
    predict: {
      q: "In the scene you cool natural rubber from room temperature to below −70 °C. What is the best guess for how it responds to bending?",
      options: ["It flows more easily","It becomes stiff and glassy","It turns into a metal","It stretches more freely"],
      answer: 1,
      reveal: "Below its glass transition, large-scale chain motion becomes slow. The rubber becomes much stiffer and less able to recover quickly from bending.",
    },
    parts: [
      {
        title: "Repeating units make long chains",
        minutes: 25,
        explain: [
          "A polymer molecule is a long chain built from repeating chemical units. A repeat unit is the part you can recognise again and again along the chain. Its molar mass comes from adding the masses of its atoms.",
          "The number-average degree of polymerisation is approximately the number-average molar mass Mn divided by repeat-unit molar mass m. We neglect the small contribution of end groups here. Chains in a real sample do not all have the same length.",
        ],
        formulas: [
          ["Degree of polymerisation","DP_n\\approx M_n/m"],
        ],
        examples: [
          ex("Polyethylene has repeat-unit molar mass 28 g/mol. For Mn = 56000 g/mol, find DPn, neglecting end groups.", [
            ["Divide chain molar mass by repeat-unit molar mass.",""],
            ["Substitute the stated values and calculate.","\\frac{56000}{28} \\approx 2000"],
          ], "2000"),
          ex("For PVC repeat unit C₂H₃Cl, use C = 12, H = 1 and Cl = 35.5 g/mol. Find repeat-unit molar mass in g/mol.", [
            ["Add the contribution of each element.",""],
            ["Substitute the stated values and calculate.","2\\times 12+3\\times 1+35.5 \\approx 62.5\\,\\mathrm{g}/\\mathrm{mol}"],
          ], "62.5 g/mol"),
        ],
        practice: [
          pr("A polymer has Mn = 28000 g/mol and repeat mass 28 g/mol. Find DPn.", 1000, "Use chain mass divided by repeat mass.", "28000 ÷ 28 = 1000."),
          pr("PVC has Mn = 62500 g/mol and repeat mass 62.5 g/mol. Find DPn.", 1000, "Use the PVC repeat-unit mass.", "62500 ÷ 62.5 = 1000."),
          pr("A chain has DP = 1500 and repeat mass 28 g/mol. Estimate its molar mass in g/mol.", 42000, "Reverse the division for DP.", "1500 × 28 = 42000 g/mol."),
          pr("Polypropylene repeat unit is C₃H₆. Use C = 12 and H = 1 g/mol. For Mn = 84000 g/mol, find DPn.", 2000, "Find the repeat mass, then divide Mn by it.", "84000 ÷ (3 × 12 + 6 × 1) = 2000."),
        ],
      },
      {
        title: "Chain architecture and processing",
        minutes: 25,
        explain: [
          "Linear and branched chains can move relative to one another when heated enough. Such thermoplastics can be reshaped by heating, although repeated processing and contamination can damage properties.",
          "Permanent covalent cross-links join chains into a network. A cured thermoset softens to some extent but does not melt into separate flowing chains; sufficient heat causes degradation. Branching also affects packing: many polyethylene grades with fewer branches pack more densely than strongly branched grades.",
        ],
        formulas: [
          ["Mass from density","m=\\rho V"],
          ["Cross-link spacing estimate","\\text{units per interval}=N_{units}/N_{intervals}"],
        ],
        examples: [
          ex("An illustrative chain network has 10000 repeat units divided among 100 equal intervals between cross-links. Find units per interval.", [
            ["Divide units by the stated number of intervals.",""],
            ["Substitute the stated values and calculate.","\\frac{10000}{100} \\approx 100"],
          ], "100"),
          ex("A polyethylene part occupies 50 cm³. Use a typical HDPE density of 0.95 g/cm³. Find mass in g.", [
            ["Multiply density by volume.",""],
            ["Substitute the stated values and calculate.","50\\times 0.95 \\approx 47.5\\,\\mathrm{g}"],
          ], "47.5 g"),
        ],
        practice: [
          pr("A network has 2000 units in 40 equal cross-link intervals. Find units per interval.", 50, "Use units divided by intervals.", "2000 ÷ 40 = 50."),
          pr("Use a typical LDPE density of 0.92 g/cm³. Find the mass of 100 cm³ in g.", 92, "Use mass = density × volume.", "0.92 × 100 = 92 g."),
          pr("Equal 100 cm³ parts use densities 0.95 and 0.92 g/cm³. Find their mass difference in g.", 3, "Multiply the density difference by the shared volume.", "100 × (0.95 − 0.92) = 3 g."),
          pr("The same 10000 repeat units are now divided among 200 cross-link intervals. Find the new average units per interval.", 50, "More intervals reduce the number of units in each.", "10000 ÷ 200 = 50."),
        ],
      },
      {
        title: "Glass transition is about motion",
        minutes: 25,
        explain: [
          "The glass transition Tg is a range where motion of chain segments changes greatly. Below it, amorphous regions respond as a stiff glass. Above it, they can move more easily on the observation timescale. Tg depends on chemistry, testing rate and other conditions.",
          "Tg is different from melting. Crystalline regions can hold a thermoplastic together above Tg until those regions melt. Cross-linked rubber can stay elastic above Tg because its network prevents unrestricted flow. Use the scene’s rubber Tg of −70 °C for the temperature comparisons here.",
        ],
        formulas: [
          ["Distance above glass transition","\\Delta T=T-T_g"],
          ["Stiffness ratio","r=E_{glassy}/E_{rubbery}"],
        ],
        examples: [
          ex("Use rubber Tg = −70 °C. At 25 °C, how far above Tg is it, in °C?", [
            ["Subtract Tg, including its negative sign.",""],
            ["Substitute the stated values and calculate.","25-\\left(-70\\right) \\approx 95\\,{}^\\circ \\mathrm{C}"],
          ], "95 °C"),
          ex("An illustrative amorphous polymer drops from 2000 to 2 MPa across Tg. Find the stiffness ratio before divided by after.", [
            ["Compare moduli by division.",""],
            ["Substitute the stated values and calculate.","\\frac{2000}{2} \\approx 1000"],
          ], "1000"),
        ],
        practice: [
          pr("Polystyrene has illustrative Tg = 100 °C. At 25 °C, find T − Tg in °C.", -75, "A negative value means below Tg.", "25 − 100 = -75 °C."),
          pr("Rubber with Tg = −70 °C is at −100 °C. Find T − Tg in °C.", -30, "Subtract the negative transition temperature.", "−100 − (−70) = -30 °C."),
          pr("An acrylic specimen has Tg = 105 °C and is at 85 °C. How many °C below Tg is it?", 20, "Take Tg minus the current temperature.", "105 − 85 = 20 °C."),
          pr("A polymer’s modulus falls by a factor of 1000 from 3000 MPa. Find the final modulus in MPa.", 3, "Divide by the stated softening factor.", "3000 ÷ 1000 = 3 MPa."),
        ],
      },
      {
        title: "Chain distributions and useful properties",
        minutes: 25,
        explain: [
          "Polymer samples contain a range of chain lengths. Mn weights every molecule equally; Mw gives more weight to heavier molecules. Their ratio, dispersity Đ = Mw/Mn, measures the breadth of the molar-mass distribution and is at least one.",
          "More crystalline packing can also affect stiffness, density and permeability. For an illustrative density estimate of crystalline mass fraction, use specific volume, 1/ρ, as a weighted average. This assumes only crystalline and amorphous regions, with no pores or fillers.",
        ],
        formulas: [
          ["Dispersity","\\mathcal{D}=M_w/M_n"],
          ["Crystalline mass fraction from density","w_c=\\frac{1/\\rho-1/\\rho_a}{1/\\rho_c-1/\\rho_a}"],
        ],
        examples: [
          ex("A polymer has Mn = 50000 and Mw = 100000 g/mol. Find dispersity.", [
            ["Divide weight-average by number-average molar mass.",""],
            ["Substitute the stated values and calculate.","\\frac{100000}{50000} \\approx 2"],
          ], "2"),
          ex("Use ρ = 0.95, ρa = 0.85 and ρc = 1.00 g/cm³ in the two-region model. Estimate crystalline mass fraction.", [
            ["Use reciprocal densities in the mixing relation.",""],
            ["Substitute the stated values and calculate.","\\frac{\\frac{1}{0.95}-\\frac{1}{0.85}}{\\frac{1}{1}-\\frac{1}{0.85}} \\approx 0.7018"],
          ], "0.7018"),
        ],
        practice: [
          pr("Mn = 40000 and Mw = 60000 g/mol. Find dispersity.", 1.5, "Use Mw/Mn.", "60000 ÷ 40000 = 1.5."),
          pr("Dispersity is 2.5 and Mn = 20000 g/mol. Find Mw in g/mol.", 50000, "Multiply dispersity by Mn.", "2.5 × 20000 = 50000 g/mol."),
          pr("A 200 g sample has crystalline mass fraction 0.60. Find crystalline mass in g.", 120, "Multiply total mass by crystalline mass fraction.", "200 × 0.60 = 120 g."),
          pr("A sample has Mn = 80000 and dispersity 1.75. Find Mw in g/mol.", 140000, "Rearrange Mw/Mn = Đ.", "80000 × 1.75 = 140000 g/mol."),
        ],
      },
    ],
  },

  'mate-302': {
    predict: {
      q: "The plate is just holding a tensile load. Its crack grows to four times its original size while material and shape stay the same. What happens to its predicted breaking stress?",
      options: ["It becomes four times larger","It stays at the same value","It falls to half its value","It falls to a quarter"],
      answer: 2,
      reveal: "In the scene’s fracture model, breaking stress varies as one over the square root of crack size. Four times the crack size gives half the breaking stress.",
    },
    parts: [
      {
        title: "Ceramics and crack opening",
        minutes: 25,
        explain: [
          "Ceramics include oxides such as alumina, as well as materials such as silicon carbide and glass. Strong bonding can give high stiffness and hardness, but many ceramics offer little plastic deformation before fracture at ordinary temperatures.",
          "Tension pulls cracks open. Compression tends to close them, so the same brittle material can carry a much greater compressive stress than tensile stress. Stress still means force divided by area; a material name alone does not give a safe load.",
        ],
        formulas: [
          ["Nominal stress","\\sigma=F/A"],
        ],
        examples: [
          ex("A ceramic carries 2000 N compression over 100 mm². Find compressive stress magnitude in MPa.", [
            ["N per mm² equals MPa.",""],
            ["Substitute the stated values and calculate.","\\frac{2000}{100} \\approx 20\\,\\mathrm{MPa}"],
          ], "20 MPa"),
          ex("An illustrative concrete has compressive strength 40 MPa and tensile strength 4 MPa. Find their ratio.", [
            ["Compare compression strength with tension strength.",""],
            ["Substitute the stated values and calculate.","\\frac{40}{4} \\approx 10"],
          ], "10"),
        ],
        practice: [
          pr("A ceramic carries 500 N tension over 50 mm². Find stress in MPa.", 10, "Divide force by area.", "500 ÷ 50 = 10 MPa."),
          pr("At a stated allowable compressive stress of 20 MPa, what load can 200 mm² carry, in N?", 4000, "Rearrange stress = force/area.", "20 × 200 = 4000 N."),
          pr("A bar carries 1200 N tension. Required nominal stress is at most 6 MPa. Find the minimum area in mm² under that requirement.", 200, "Area equals force divided by the stress limit.", "1200 ÷ 6 = 200 mm²."),
          pr("At fixed force, area rises from 20 to 80 mm². An initial stress was 40 MPa. Find the final stress in MPa.", 10, "Stress falls in inverse proportion to area.", "40 × 20/80 = 10 MPa."),
        ],
      },
      {
        title: "Cracks amplify stress",
        minutes: 25,
        explain: [
          "Fracture mechanics describes how a crack concentrates an applied stress near its tip. The stress intensity is K = Yσ√(πa). Y accounts for specimen and crack geometry; a is the crack dimension specified by that model.",
          "For a large plate with a central through-crack of total length 2a, take Y ≈ 1. Use a in metres when toughness is in MPa√m. In these brittle-fracture exercises, failure begins when K reaches KIc. Real design must also consider yielding and whether the model applies.",
        ],
        formulas: [
          ["Stress intensity","K=Y\\sigma\\sqrt{\\pi a}"],
          ["Breaking stress","\\sigma_f=K_{Ic}/(Y\\sqrt{\\pi a})"],
        ],
        examples: [
          ex("A large glass plate has KIc = 0.75 MPa√m, Y = 1 and central crack half-length a = 1 mm. Estimate breaking stress in MPa.", [
            ["Convert the crack half-length to metres.",""],
            ["Substitute the stated values and calculate.","\\frac{0.75}{\\sqrt{\\pi\\times 0.001}} \\approx 13.38\\,\\mathrm{MPa}"],
          ], "13.38 MPa"),
          ex("For σ = 100 MPa, Y = 1 and a = 2 mm, find K in MPa√m.", [
            ["Use the crack dimension in metres.",""],
            ["Substitute the stated values and calculate.","100\\times \\sqrt{\\pi\\times 0.002} \\approx 7.927\\,\\mathrm{MPa}\\sqrt{\\mathrm{m}}"],
          ], "7.927 MPa√m"),
        ],
        practice: [
          pr("Convert crack half-length 0.5 mm to metres.", 0.0005, "Divide millimetres by 1000.", "0.5 ÷ 1000 = 0.0005 m.", { tol: 0.0000025 }),
          pr("An alumina specimen has KIc = 4 MPa√m, Y = 1 and a = 1 mm. Estimate breaking stress in MPa.", 71.3649646461, "Use the same fracture formula with the stated toughness.", "4 ÷ √(π × 0.001) ≈ 71.36 MPa."),
          pr("Use KIc = 29 MPa√m, Y = 1 and a = 2 mm. Find model breaking stress in MPa.", 365.854215693, "Convert a before taking the square root.", "29 ÷ √(π × 0.002) ≈ 365.9 MPa."),
          pr("Use KIc = 29 MPa√m, Y = 1 and a = 15 mm. Find model breaking stress in MPa.", 133.591071129, "The longer crack lowers breaking stress.", "29 ÷ √(π × 0.015) ≈ 133.6 MPa."),
        ],
      },
      {
        title: "Flaw limits and inspection",
        minutes: 25,
        explain: [
          "Rearranging the fracture relation gives a critical crack dimension. At a specified tensile stress, the model predicts fracture if the relevant crack grows to that size. Polishing may improve brittle strength by reducing the largest surface flaws.",
          "A ratio of predicted breaking stress to applied stress is a simple margin for these exercises. It is not a full safety assessment: toughness scatter, crack shape, repeated loading and environmental attack also matter. An inspection threshold must be comfortably smaller than the critical defect.",
        ],
        formulas: [
          ["Critical crack dimension","a_c=\\frac{1}{\\pi}\\left(\\frac{K_{Ic}}{Y\\sigma}\\right)^2"],
          ["Simple fracture margin","n=\\sigma_f/\\sigma"],
        ],
        examples: [
          ex("Use KIc = 44 MPa√m, Y = 1 and σ = 220 MPa. Find critical a in mm.", [
            ["Solve for a in metres, then convert to millimetres.",""],
            ["Substitute the stated values and calculate.","\\left(\\frac{\\left(\\frac{44}{220}\\right)^{2}}{\\pi}\\right)\\times 1000 \\approx 12.73\\,\\mathrm{mm}"],
          ], "12.73 mm"),
          ex("A model predicts breaking stress 120 MPa under applied stress 60 MPa. Find the simple fracture margin.", [
            ["Divide predicted breaking stress by applied stress.",""],
            ["Substitute the stated values and calculate.","\\frac{120}{60} \\approx 2"],
          ], "2"),
        ],
        practice: [
          pr("A crack becomes nine times longer. Original model breaking stress is 90 MPa. Find the new stress in MPa.", 30, "Breaking stress scales as 1/√a.", "90 ÷ √9 = 30 MPa."),
          pr("Polishing cuts a flaw dimension to one quarter. Original model breaking stress is 50 MPa. Find the new value in MPa.", 100, "Take the square root of the flaw-size ratio.", "50 ÷ √0.25 = 100 MPa."),
          pr("Use KIc = 4 MPa√m, Y = 1 and σ = 100 MPa. Find critical a in mm.", 0.509295817894, "Rearrange the fracture condition.", "(4/100)² ÷ π × 1000 ≈ 0.5093 mm."),
          pr("At fixed toughness and geometry, applied stress doubles. A previous critical a was 8 mm. Find the new critical a in mm.", 2, "Critical crack size scales as one over stress squared.", "8 ÷ 2² = 2 mm."),
        ],
      },
      {
        title: "Fibres and matrix share the load",
        minutes: 25,
        explain: [
          "A composite combines distinct materials. Stiff fibres can carry tension along their length while a matrix holds them in place, transfers load and protects their surfaces. Reinforced concrete similarly uses steel where tension would open cracks in concrete.",
          "For aligned continuous fibres loaded along their length, assume perfect bonding and equal strain in fibre and matrix. The longitudinal modulus is then Ef Vf + Em Vm. These are volume fractions, not mass fractions. The estimate does not describe loading across fibres or a poorly bonded composite.",
        ],
        formulas: [
          ["Longitudinal modulus","E_L=V_fE_f+(1-V_f)E_m"],
          ["Density estimate","\\rho_c=V_f\\rho_f+(1-V_f)\\rho_m"],
        ],
        examples: [
          ex("Aligned fibres have Ef = 200 GPa, matrix Em = 3 GPa and fibre volume fraction 0.60. Estimate longitudinal modulus in GPa under equal strain.", [
            ["Weight each modulus by its volume fraction.",""],
            ["Substitute the stated values and calculate.","0.6\\times 200+0.4\\times 3 \\approx 121.2\\,\\mathrm{GPa}"],
          ], "121.2 GPa"),
          ex("Use fibre density 1.8 g/cm³, matrix density 1.2 g/cm³ and Vf = 0.60. Estimate composite density in g/cm³.", [
            ["Take the volume-weighted density.",""],
            ["Substitute the stated values and calculate.","0.6\\times 1.8+0.4\\times 1.2 \\approx 1.56\\,\\mathrm{g}/\\mathrm{cm}^{3}"],
          ], "1.56 g/cm³"),
        ],
        practice: [
          pr("Fibre volume fraction is 0.35 with no pores. Find matrix volume fraction.", 0.65, "The two volume fractions add to one.", "1 − 0.35 = 0.65."),
          pr("Use Ef = 70 GPa, Em = 3 GPa and Vf = 0.50. Find equal-strain longitudinal modulus in GPa.", 36.5, "Use the longitudinal mixture rule.", "0.50 × 70 + 0.50 × 3 = 36.5 GPa."),
          pr("A 100 cm³ composite has Vf = 0.60. Find fibre volume in cm³.", 60, "Multiply total volume by fibre fraction.", "100 × 0.60 = 60 cm³."),
          pr("For Ef = 200 GPa, Em = 3 GPa and Vf = 0.60 at equal strain, what percentage of the axial load is carried by fibres?", 99.0099009901, "At equal strain, load shares are proportional to volume fraction times modulus.", "100 × (0.60 × 200)/(0.60 × 200 + 0.40 × 3) ≈ 99.01 %."),
        ],
      },
    ],
  },

  'mate-401': {
    predict: {
      q: "You keep the scene’s silicon band gap and temperature fixed, then add phosphorus. Why can more electrons move into the conduction band?",
      options: ["The whole gap disappears","The atoms become hotter","The valence band vanishes","Donors offer an easier step"],
      answer: 3,
      reveal: "Phosphorus supplies weakly bound electrons at donor levels near the conduction band. They need far less energy to become mobile than electrons crossing the full silicon gap.",
    },
    parts: [
      {
        title: "Intrinsic electrons and holes",
        minutes: 25,
        explain: [
          "Pure semiconductor material is called intrinsic. An electron excited into the conduction band leaves a hole in the valence band. A hole behaves as a mobile positive carrier because neighbouring electrons can move into the empty state.",
          "In intrinsic material at equilibrium, electron and hole concentrations are equal: n = p = ni. Concentration is carriers per volume, rather than a total carrier count. Keep centimetre-based and metre-based units separate.",
        ],
        formulas: [
          ["Intrinsic balance","n=p=n_i"],
          ["Carrier count","N=nV"],
        ],
        examples: [
          ex("An intrinsic sample has n = 10¹⁰ electrons/cm³. Find p in holes/cm³.", [
            ["Intrinsic electrons and holes occur in equal concentrations.",""],
            ["Substitute the stated values and calculate.","1\\times10^{10} \\approx 10000000000\\,\\mathrm{holes}/\\mathrm{cm}^{3}"],
          ], "10000000000 holes/cm³"),
          ex("A sample has 10¹⁰ mobile electrons/cm³ and volume 0.02 cm³. Find the electron count.", [
            ["Multiply concentration by volume.",""],
            ["Substitute the stated values and calculate.","1\\times10^{10}\\times 0.02 \\approx 200000000"],
          ], "200000000"),
        ],
        practice: [
          pr("Five hundred electrons cross the gap in pure material. How many holes are created?", 500, "Each excitation leaves one hole.", "One per electron gives 500."),
          pr("A sample has p = 2 × 10¹² holes/cm³ and volume 0.5 cm³. Find the hole count.", 1000000000000, "Use concentration times volume.", "2 × 10¹² × 0.5 = 1000000000000."),
          pr("Convert 10¹⁰ carriers/cm³ to carriers/m³.", 10000000000000000, "One cubic metre contains one million cubic centimetres.", "10¹⁰ × 10⁶ = 10000000000000000 carriers/m³."),
          pr("A 0.1 cm³ intrinsic sample has ni = 10¹⁰ cm⁻³. Find the total number of mobile electrons plus holes.", 2000000000, "Count both carrier types.", "2 × 10¹⁰ × 0.1 = 2000000000."),
        ],
      },
      {
        title: "Donors, acceptors and compensation",
        minutes: 25,
        explain: [
          "Silicon shares four valence electrons in bonds. A phosphorus atom supplies an extra electron and acts as a donor, giving n-type material. Boron has one fewer valence electron and acts as an acceptor, giving p-type material.",
          "For these estimates, assume all dopants are ionised, donor and acceptor concentrations greatly exceed the intrinsic concentration, and each contributes one charge. Net donors are ND − NA; net acceptors are NA − ND. The crystal remains electrically neutral overall because ionised dopants balance the mobile charge.",
        ],
        formulas: [
          ["Strongly donor-dominated estimate","n\\approx N_D-N_A"],
          ["Strongly acceptor-dominated estimate","p\\approx N_A-N_D"],
        ],
        examples: [
          ex("A silicon sample has ND = 10¹⁶ cm⁻³ and negligible acceptors. Estimate majority-electron concentration in cm⁻³ under full ionisation.", [
            ["Use one mobile electron per ionised donor.",""],
            ["Substitute the stated values and calculate.","1\\times10^{16} \\approx 10000000000000000\\,\\mathrm{cm}^{-3}"],
          ], "10000000000000000 cm⁻³"),
          ex("ND = 8 × 10¹⁵ and NA = 3 × 10¹⁵ cm⁻³. Estimate majority-electron concentration in cm⁻³.", [
            ["Acceptors compensate some donors.",""],
            ["Substitute the stated values and calculate.","8\\times10^{15}-3\\times10^{15} \\approx 5000000000000000\\,\\mathrm{cm}^{-3}"],
          ], "5000000000000000 cm⁻³"),
        ],
        practice: [
          pr("How many extra valence electrons does phosphorus with five supply relative to silicon with four?", 1, "Subtract the silicon count.", "5 − 4 = 1."),
          pr("How many valence electrons is boron with three short of silicon with four?", 1, "Compare with the four needed for silicon bonding.", "4 − 3 = 1."),
          pr("NA = 9 × 10¹⁵ and ND = 2 × 10¹⁵ cm⁻³. Estimate majority-hole concentration in cm⁻³ under full ionisation.", 7000000000000000, "Subtract donors from acceptors.", "9 × 10¹⁵ − 2 × 10¹⁵ = 7000000000000000 cm⁻³."),
          pr("A sample contains 5 × 10²² silicon sites/cm³. One site per million is replaced by a donor. Find donor concentration in cm⁻³.", 50000000000000000, "Divide site concentration by the replacement interval.", "5 × 10²² ÷ 10⁶ = 50000000000000000 cm⁻³."),
        ],
      },
      {
        title: "Carrier mobility and conductivity",
        minutes: 25,
        explain: [
          "More carriers usually help conduction, but their ease of motion matters too. Mobility μ measures drift speed per unit electric field. Collisions with vibrating atoms and defects restrict that motion.",
          "Conductivity is σ = q(nμn + pμp). Use q = 1.602 × 10⁻¹⁹ C. With concentrations in m⁻³ and mobilities in m²/(V·s), conductivity is in S/m. When one carrier type dominates, its term often gives a useful estimate.",
        ],
        formulas: [
          ["Conductivity","\\sigma=q(n\\mu_n+p\\mu_p)"],
          ["Resistivity","\\rho=1/\\sigma"],
        ],
        examples: [
          ex("Use n = 10²² m⁻³, μn = 0.10 m²/(V·s) and q = 1.602 × 10⁻¹⁹ C. Neglect holes. Find conductivity in S/m.", [
            ["Multiply carrier charge, concentration and mobility.",""],
            ["Substitute the stated values and calculate.","\\left(1.602\\times10^{-19}\\times 1\\times10^{22}\\right)\\times 0.1 \\approx 160.2\\,\\mathrm{S}/\\mathrm{m}"],
          ], "160.2 S/m"),
          ex("A sample has conductivity 100 S/m. Find resistivity in Ω·m.", [
            ["Resistivity is the reciprocal of conductivity.",""],
            ["Substitute the stated values and calculate.","\\frac{1}{100} \\approx 0.01\\,\\Omega \\cdot \\mathrm{m}"],
          ], "0.01 Ω·m"),
        ],
        practice: [
          pr("Convert 1000 cm²/(V·s) to m²/(V·s).", 0.1, "A square metre contains 10000 square centimetres.", "1000 ÷ 10000 = 0.1 m²/(V·s).", { tol: 0.0005 }),
          pr("Use p = 10²² m⁻³, μp = 0.05 m²/(V·s) and q = 1.602 × 10⁻¹⁹ C. Neglect electrons. Find conductivity in S/m.", 80.1, "Use the hole contribution alone.", "1.602 × 10⁻¹⁹ × 10²² × 0.05 = 80.1 S/m."),
          pr("Conductivity is 250 S/m. Find resistivity in Ω·m.", 0.004, "Take the reciprocal.", "1 ÷ 250 = 0.004 Ω·m.", { tol: 0.00002 }),
          pr("Use n = p = 10¹⁶ m⁻³, μn = 0.14 and μp = 0.05 m²/(V·s), with q = 1.602 × 10⁻¹⁹ C. Find conductivity in S/m.", 0.00030438, "Include both carrier contributions.", "1.602 × 10⁻¹⁹ × 10¹⁶ × (0.14 + 0.05) = 0.0003044 S/m.", { tol: 0.0000015219 }),
        ],
      },
      {
        title: "Junctions, light and useful devices",
        minutes: 25,
        explain: [
          "At a p–n junction, carriers initially diffuse across the boundary and leave charged dopants behind. This creates an electric field. Forward bias lowers the barrier to carrier injection; reverse bias generally widens the depleted region.",
          "An efficient LED uses a suitable semiconductor in which electrons and holes recombine to emit light. Photon energy approximately matches the relevant gap: λ ≈ 1240/Eg. Silicon is useful for solar cells, but its indirect gap makes it an inefficient light emitter. The scene’s colour display is an energy illustration rather than an efficiency prediction.",
        ],
        formulas: [
          ["Photon wavelength","\\lambda(\\mathrm{nm})\\approx1240/E_g(\\mathrm{eV})"],
          ["Electrical power","P=VI"],
        ],
        examples: [
          ex("An idealised LED emits across a 2.0 eV gap. Estimate wavelength in nm.", [
            ["Divide the photon constant by gap energy.",""],
            ["Substitute the stated values and calculate.","\\frac{1240}{2} \\approx 620\\,\\mathrm{nm}"],
          ], "620 nm"),
          ex("An LED operates at 3 V and 0.02 A. Find electrical input power in W.", [
            ["Multiply voltage by current.",""],
            ["Substitute the stated values and calculate.","3\\times 0.02 \\approx 0.06\\,\\mathrm{W}"],
          ], "0.06 W"),
        ],
        practice: [
          pr("Estimate wavelength for an emitting gap of 2.75 eV, in nm.", 450.909090909, "Use the scene’s energy–wavelength relation.", "1240 ÷ 2.75 ≈ 450.9 nm."),
          pr("For an emitting gap of 3.10 eV, estimate wavelength in nm.", 400, "Use wavelength equal to 1240 divided by gap.", "1240 ÷ 3.10 = 400 nm."),
          pr("Find the photon energy of 500 nm light in eV.", 2.48, "Reverse the wavelength relation.", "1240 ÷ 500 = 2.48 eV."),
          pr("A device takes 0.10 W electrically and emits 0.025 W as light. Find its optical power efficiency in percent.", 25, "Divide optical output by electrical input.", "100 × 0.025/0.10 = 25 %."),
        ],
      },
    ],
  },

  'eng-001': {
    predict: {
      q: "The block has a round hole drilled straight down from its top. Look straight at its front in the glass-box scene. How should the hidden hole appear?",
      options: ["As one solid circle","As two dashed lines","As one thick diagonal","As no lines at all"],
      answer: 1,
      reveal: "The front view cannot see the circular opening from above. Its two hidden sides are drawn as dashed lines; the top view shows the circle.",
    },
    parts: [
      {
        title: "Three views share dimensions",
        minutes: 25,
        explain: [
          "An orthographic view looks straight at one face. The front view shows width and height. The top view shows width and depth. The side view shows depth and height. Each view leaves out the dimension pointing towards your eye.",
          "Shared dimensions must agree. The front and top have the same width; the front and side have the same height. In a fabrication shop, matching the views helps you understand a bracket before choosing how to cut it.",
          "An isometric drawing shows three faces together, so it helps you picture the object. Parallel edges stay parallel instead of shrinking into the distance. In the usual isometric drawing, measure lengths along its three main directions; do not read a diagonal as a true edge length.",
        ],
        formulas: [
          ["View dimensions","\\text{front: width and height; top: width and depth; side: depth and height}"],
        ],
        examples: [
          ex("A bracket’s front view is 80 mm wide and 60 mm high. Its side view is 40 mm wide and 60 mm high. Find the bracket depth in mm.", [
            ["The side view shows depth horizontally.",""],
            ["Substitute the stated values and calculate.","40 \\approx 40\\,\\mathrm{mm}"],
          ], "40 mm"),
          ex("A top view is 70 mm wide and 25 mm deep. What width must the front view show, in mm?", [
            ["Top and front share width.",""],
            ["Substitute the stated values and calculate.","70 \\approx 70\\,\\mathrm{mm}"],
          ], "70 mm"),
        ],
        practice: [
          pr("A front view is 50 mm high. What height must the side view show, in mm?", 50, "Front and side share height.", "The matching side-view height is 50 mm."),
          pr("A top view is 30 mm deep. What horizontal dimension must the side view show, in mm?", 30, "Side-view width represents depth.", "The depth read from the top is 30 mm."),
          pr("A box is 80 mm wide, 60 mm high and 40 mm deep. How many of these three dimensions appear directly in its front view?", 2, "The front shows width and height.", "Width and height give 2."),
          pr("A drawing labels the same total width as 80 mm in front and 78 mm on top. Find the mismatch in mm.", 2, "Shared widths should be equal.", "80 − 78 = 2 mm."),
        ],
      },
      {
        title: "Visible edges, hidden edges and centres",
        minutes: 25,
        explain: [
          "A solid visible edge is drawn with a continuous line. A hidden edge uses dashes. A centre line uses a thin long-dash and short-dash pattern to mark an axis or a centre. These line types let a flat picture describe features behind the visible surface.",
          "A vertical cylindrical hole is a circle in the top view. Seen from the front, its two sides appear as hidden lines. Measure their separation to read the hole diameter, using the drawing scale. The centre line sits halfway between them.",
        ],
        formulas: [
          ["Hole width in a straight-on view","\\text{diameter}=\\text{right edge position}-\\text{left edge position}"],
        ],
        examples: [
          ex("Hidden sides of a vertical hole lie 30 mm and 50 mm from the left datum face. Find the hole diameter in mm.", [
            ["Subtract the two edge positions.",""],
            ["Substitute the stated values and calculate.","50-30 \\approx 20\\,\\mathrm{mm}"],
          ], "20 mm"),
          ex("Those hidden sides are at 30 and 50 mm. Find the centre position from the left face in mm.", [
            ["The centre is halfway between the two sides.",""],
            ["Substitute the stated values and calculate.","\\frac{30+50}{2} \\approx 40\\,\\mathrm{mm}"],
          ], "40 mm"),
        ],
        practice: [
          pr("A vertical through-hole has two hidden sides in a front view. How many hidden lines represent them?", 2, "Count the left and right sides.", "One line per side gives 2."),
          pr("Hole sides lie at 12 and 22 mm. Find diameter in mm.", 10, "Subtract the left position from the right.", "22 − 12 = 10 mm."),
          pr("Hole sides lie at 12 and 22 mm. Find the centre position in mm.", 17, "Average the edge positions.", "(12 + 22) ÷ 2 = 17 mm."),
          pr("A hole centre is 40 mm from the left face and its diameter is 12 mm. Find the left hole edge position in mm.", 34, "Move left from the centre by half the diameter.", "40 − 12/2 = 34 mm."),
        ],
      },
      {
        title: "Scale preserves proportions",
        minutes: 25,
        explain: [
          "A drawing may be smaller or larger than the real part. Scale 1:2 means one drawing length represents two real lengths. Scale 2:1 means the picture is twice the real size.",
          "The written dimension gives the intended real size, regardless of the printed picture. A resized sheet can make ruler measurements misleading. Use the labelled dimensions to make a part; use scale arithmetic to understand a drawing exercise.",
        ],
        formulas: [
          ["Scale ratio","s=\\frac{\\text{drawing length}}{\\text{real length}}"],
        ],
        examples: [
          ex("At scale 1:2, a real edge is 80 mm long. Find its drawing length in mm.", [
            ["A half-size drawing halves lengths.",""],
            ["Substitute the stated values and calculate.","\\frac{80}{2} \\approx 40\\,\\mathrm{mm}"],
          ], "40 mm"),
          ex("At scale 2:1, a hole diameter measures 24 mm in the drawing. Find real diameter in mm.", [
            ["The drawing is twice real size.",""],
            ["Substitute the stated values and calculate.","\\frac{24}{2} \\approx 12\\,\\mathrm{mm}"],
          ], "12 mm"),
        ],
        practice: [
          pr("At scale 1:1, a real edge is 35 mm long. Find drawing length in mm.", 35, "Full scale keeps the same length.", "The full-scale length is 35 mm."),
          pr("At scale 1:5, a real edge is 100 mm long. Find drawing length in mm.", 20, "Divide by the reduction factor.", "100 ÷ 5 = 20 mm."),
          pr("At scale 1:2, a drawing length is 18 mm. Find real length in mm.", 36, "Real length is twice the picture length.", "18 × 2 = 36 mm."),
          pr("A 60 mm edge is drawn 15 mm long. What number follows 1 in its reduction scale 1:__?", 4, "Compare real length with drawing length.", "60 ÷ 15 = 4."),
        ],
      },
      {
        title: "Dimensions, sections and limits",
        minutes: 25,
        explain: [
          "Dimensions tell the maker sizes and locations. Choose a datum, a reference face or centre, so that hole positions have a clear origin. Do not make the reader guess a missing dimension from the perspective picture.",
          "The projection convention tells you how views are arranged: a top view goes above the front in third-angle projection and below it in first-angle projection. A section view imagines cutting the part open; hatching marks solid material crossed by the cut. A tolerance gives the allowed variation in a size. A dimension of 20 ± 0.1 mm allows any size from 19.9 to 20.1 mm, including the limits.",
        ],
        formulas: [
          ["Size limits","\\text{lower}=\\text{nominal}-t,\\quad\\text{upper}=\\text{nominal}+t"],
        ],
        examples: [
          ex("A width is specified as 40 ± 0.2 mm. Find its upper allowed size in mm.", [
            ["Add the tolerance to the nominal size.",""],
            ["Substitute the stated values and calculate.","40+0.2 \\approx 40.2\\,\\mathrm{mm}"],
          ], "40.2 mm"),
          ex("A plate is 80 mm wide. Hole centres are 15 mm from each side. Find their centre-to-centre separation in mm.", [
            ["Remove the two edge offsets from the total width.",""],
            ["Substitute the stated values and calculate.","80-15-15 \\approx 50\\,\\mathrm{mm}"],
          ], "50 mm"),
        ],
        practice: [
          pr("A thickness is 10 ± 0.1 mm. Find its lower limit in mm.", 9.9, "Subtract the tolerance.", "10 − 0.1 = 9.9 mm."),
          pr("A width is 30 ± 0.2 mm. Find the total allowed size range in mm.", 0.4, "Subtract the lower allowed size from the upper.", "30.2 − 29.8 = 0.4 mm.", { tol: 0.002 }),
          pr("A bar has consecutive lengths 20, 30 and 15 mm along one straight edge. Find total length in mm.", 65, "Add the consecutive lengths.", "20 + 30 + 15 = 65 mm."),
          pr("A 60 mm-wide plate has one hole centre 12 mm from the left face and another 18 mm from the right face. Find centre separation in mm.", 30, "Subtract both edge offsets from total width.", "60 − 12 − 18 = 30 mm."),
        ],
      },
    ],
  },

  'eng-002': {
    predict: {
      q: "The scene extrudes an L-shaped sketch. You double only its extrusion depth, keeping the sketch fixed. What happens to the volume?",
      options: ["It stays the same","It becomes four times larger","It doubles in size","It becomes eight times larger"],
      answer: 2,
      reveal: "Every slice has the same sketch area. Twice as many slices along the depth give twice the volume, while the L-shaped cross-section stays unchanged.",
    },
    parts: [
      {
        title: "A sketch must describe the intended shape",
        minutes: 25,
        explain: [
          "A CAD sketch begins as lines and arcs on a plane. Constraints describe relationships such as horizontal, vertical, equal or concentric. Dimensions then fix sizes and positions. A fully constrained sketch cannot move in ways the design did not intend.",
          "A solid extrusion needs a closed profile. Before adding depth, work out its area. For an L shape, divide it into non-overlapping rectangles or subtract the missing corner from an enclosing rectangle. Counting the shared corner twice gives a wrong volume later.",
        ],
        formulas: [
          ["L-profile area","A=A_{outer}-A_{missing}"],
        ],
        examples: [
          ex("An L profile fits inside a 5 cm by 3 cm rectangle with a 3 cm by 2 cm corner removed. Find sketch area in cm².", [
            ["Subtract the missing rectangle from the enclosing rectangle.",""],
            ["Substitute the stated values and calculate.","5\\times 3-3\\times 2 \\approx 9\\,\\mathrm{cm}^{2}"],
          ], "9 cm²"),
          ex("Two non-overlapping rectangles of areas 6 and 4 cm² form one profile. Find total area in cm².", [
            ["The stated rectangles share no area.",""],
            ["Substitute the stated values and calculate.","6+4 \\approx 10\\,\\mathrm{cm}^{2}"],
          ], "10 cm²"),
        ],
        practice: [
          pr("A rectangular profile is 4 cm by 2 cm. Find area in cm².", 8, "Multiply its two side lengths.", "4 × 2 = 8 cm²."),
          pr("A 6 cm by 4 cm rectangle has a 2 cm by 3 cm corner removed. Find L-profile area in cm².", 18, "Subtract the missing corner.", "6 × 4 − 2 × 3 = 18 cm²."),
          pr("Two overlapping rectangles have areas 8 and 6 cm² with shared area 2 cm². Find their combined profile area in cm².", 12, "Subtract the area counted twice.", "8 + 6 − 2 = 12 cm²."),
          pr("A circular sketch has radius 2 cm. Find area in cm² using π.", 12.5663706144, "Use circle area πr².", "π × 2² ≈ 12.57 cm²."),
        ],
      },
      {
        title: "Extrusion turns area into volume",
        minutes: 25,
        explain: [
          "Extruding pushes the same closed profile straight through a chosen depth. The result has a constant cross-section, so volume is sketch area times depth. A hollow profile can also be extruded if its inner boundary is properly closed.",
          "The scene’s L sketch has area 9 cm². Changing its depth changes volume in direct proportion. Length units must agree: multiplying square centimetres by millimetres without conversion gives the wrong volume.",
        ],
        formulas: [
          ["Extruded volume","V=Ad"],
          ["Depth for a target volume","d=V/A"],
        ],
        examples: [
          ex("The scene’s 9 cm² L profile is extruded 4 cm. Find volume in cm³.", [
            ["Multiply fixed sketch area by depth.",""],
            ["Substitute the stated values and calculate.","9\\times 4 \\approx 36\\,\\mathrm{cm}^{3}"],
          ], "36 cm³"),
          ex("A profile has area 12 cm². What extrusion depth in cm gives 30 cm³?", [
            ["Divide target volume by sketch area.",""],
            ["Substitute the stated values and calculate.","\\frac{30}{12} \\approx 2.5\\,\\mathrm{cm}"],
          ], "2.5 cm"),
        ],
        practice: [
          pr("A 9 cm² profile is extruded 2 cm. Find volume in cm³.", 18, "Use area times depth.", "9 × 2 = 18 cm³."),
          pr("A 20 cm² profile is extruded 5 cm. Find volume in cm³.", 100, "Keep area and depth in matching units.", "20 × 5 = 100 cm³."),
          pr("A 15 cm² profile is extruded 20 mm. Find volume in cm³.", 30, "Convert the depth to centimetres.", "15 × (20/10) = 30 cm³."),
          pr("An extrusion has V = 72 cm³ and d = 6 cm. Find sketch area in cm².", 12, "Reverse V = Ad.", "72 ÷ 6 = 12 cm²."),
        ],
      },
      {
        title: "Revolve a profile around an axis",
        minutes: 25,
        explain: [
          "Revolving spins a profile around an axis to make a round part. A rectangle beside the axis can make a cylinder or a hollow tube. Specify which edge or line is the axis; the same profile revolved around a different line makes a different solid.",
          "A partial revolution makes only part of the full solid. If the profile stays fixed and does not overlap itself, its volume is the full-turn volume times the angle fraction. Use this to understand the scene’s bushing before attempting more detailed features.",
        ],
        formulas: [
          ["Hollow cylindrical volume","V=\\pi(R^2-r^2)h"],
          ["Partial revolution","V_\\phi=\\frac{\\phi}{360^\\circ}V_{full}"],
        ],
        examples: [
          ex("A cylinder has radius 2 cm and height 3 cm. Find volume in cm³.", [
            ["Use πr²h.",""],
            ["Substitute the stated values and calculate.","\\left(\\pi\\times \\left(2^{2}\\right)\\right)\\times 3 \\approx 37.7\\,\\mathrm{cm}^{3}"],
          ], "37.7 cm³"),
          ex("A tube has outer radius 3 cm, inner radius 2 cm and height 4 cm. Find material volume in cm³.", [
            ["Subtract the hole volume from the outer cylinder volume.",""],
            ["Substitute the stated values and calculate.","\\left(\\pi\\times \\left(3^{2}-2^{2}\\right)\\right)\\times 4 \\approx 62.83\\,\\mathrm{cm}^{3}"],
          ], "62.83 cm³"),
        ],
        practice: [
          pr("A profile revolves through 90°. What fraction of a full turn is this?", 0.25, "Divide the angle by a full turn.", "90 ÷ 360 = 0.25.", { tol: 0.00125 }),
          pr("A full revolution would give 80 cm³. Find volume for 180° in cm³, with no overlap.", 40, "Use the angle fraction.", "80 × 180/360 = 40 cm³."),
          pr("A solid cylinder has diameter 4 cm and height 5 cm. Find volume in cm³.", 62.8318530718, "Halve diameter before using πr²h.", "π × (4/2)² × 5 ≈ 62.83 cm³."),
          pr("A full revolved profile gives 120 cm³. Find volume for 270° in cm³, assuming no overlap.", 90, "Multiply by the partial-turn fraction.", "120 × 270/360 = 90 cm³."),
        ],
      },
      {
        title: "Parameter changes update material needs",
        minutes: 25,
        explain: [
          "A parametric model stores dimensions and relationships. If depth is a parameter, changing it updates the solid. Mass follows when you assign density. Check the material choice before trusting a reported mass.",
          "Changing one depth is different from enlarging every dimension. If all lengths grow by a factor s, areas grow by s² and volumes by s³. A hole or pocket removes volume and mass; include it when estimating material for a finished bracket.",
        ],
        formulas: [
          ["Mass","m=\\rho V"],
          ["Uniform enlargement","V_{new}=s^3V_{old}"],
        ],
        examples: [
          ex("A steel bracket has sketch area 24 cm² and depth 2.5 cm. Use typical density 7.85 g/cm³. Find mass in g.", [
            ["Find volume first, then multiply by density.",""],
            ["Substitute the stated values and calculate.","\\left(24\\times 2.5\\right)\\times 7.85 \\approx 471\\,\\mathrm{g}"],
          ], "471 g"),
          ex("A solid of 10 cm³ is enlarged by factor 2 in every length. Find new volume in cm³.", [
            ["All three length directions double.",""],
            ["Substitute the stated values and calculate.","10\\times \\left(2^{3}\\right) \\approx 80\\,\\mathrm{cm}^{3}"],
          ], "80 cm³"),
        ],
        practice: [
          pr("Use aluminium density 2.70 g/cm³ for a 20 cm³ model. Find mass in g.", 54, "Multiply density by volume.", "2.70 × 20 = 54 g."),
          pr("A steel model at 7.85 g/cm³ loses 5 cm³ to a pocket. Find the mass removed in g.", 39.25, "The removed material has the same density.", "7.85 × 5 = 39.25 g."),
          pr("A 9 cm² profile changes extrusion depth from 2 to 5 cm. Find added volume in cm³.", 27, "Multiply area by the added depth.", "9 × (5 − 2) = 27 cm³."),
          pr("A 50 cm³ steel model at 7.85 g/cm³ receives a 10 cm³ pocket. Find finished mass in g.", 314, "Subtract pocket volume before finding mass.", "(50 − 10) × 7.85 = 314 g."),
        ],
      },
    ],
  },

  'eng-003': {
    predict: {
      q: "An aluminium tensile-test fit gives a low stiffness when every row is included. You remove only the rows after the curve bends away from its initial straight line. What should happen?",
      options: ["The fitted stiffness rises","The fitted stiffness falls","The metal itself gets stiffer","The gauge length doubles"],
      answer: 0,
      reveal: "The later plastic-deformation points pull the fitted slope down. Fitting the initial elastic region gives a steeper slope and a more appropriate estimate of Young’s modulus.",
    },
    parts: [
      {
        title: "From raw readings to stress and strain",
        minutes: 25,
        explain: [
          "Keep the original machine readings: load in newtons and extension in millimetres. Record specimen cross-sectional area and original gauge length beside them. These are needed to turn machine readings into material properties.",
          "Engineering stress is load divided by original area. Engineering strain is extension divided by original gauge length. In the scene, area is 20 mm² and gauge length is 50 mm. In a spreadsheet, a cell formula can refer to a load cell and a fixed area cell; repeat the relation for each measurement row.",
        ],
        formulas: [
          ["Engineering stress","\\sigma=F/A_0"],
          ["Engineering strain","\\varepsilon=\\Delta L/L_0"],
        ],
        examples: [
          ex("A tensile test records 2000 N on an original area of 20 mm². Find engineering stress in MPa.", [
            ["Divide force by original area; N/mm² is MPa.",""],
            ["Substitute the stated values and calculate.","\\frac{2000}{20} \\approx 100\\,\\mathrm{MPa}"],
          ], "100 MPa"),
          ex("Extension is 0.10 mm over an original gauge length of 50 mm. Find dimensionless engineering strain.", [
            ["Divide extension by the original length.",""],
            ["Substitute the stated values and calculate.","\\frac{0.10}{50} \\approx 0.002"],
          ], "0.002"),
        ],
        practice: [
          pr("Load is 1000 N and area is 20 mm². Find stress in MPa.", 50, "Use force divided by area.", "1000 ÷ 20 = 50 MPa."),
          pr("Extension is 0.05 mm and gauge length is 50 mm. Find strain.", 0.001, "Use matching length units.", "0.05 ÷ 50 = 0.001.", { tol: 0.000005 }),
          pr("Extension is 0.15 mm over 50 mm. Find engineering strain in percent.", 0.3, "Find strain, then multiply by 100.", "100 × 0.15/50 = 0.3 %.", { tol: 0.0015 }),
          pr("A row uses 3000 N and 20 mm². The area is corrected to 25 mm² while load stays the same. Find corrected stress in MPa.", 120, "Recalculate with the corrected area.", "3000 ÷ 25 = 120 MPa."),
        ],
      },
      {
        title: "Charts and elastic slopes",
        minutes: 25,
        explain: [
          "Place strain on the horizontal axis and stress on the vertical axis of a scatter chart. A scatter chart uses the actual numerical spacing between measurements. A chart that merely spaces row labels equally can distort the slope.",
          "Young’s modulus E is the slope of the initial elastic stress–strain region. Use dimensionless strain when you want the slope in MPa. A slope measured against percent strain is smaller by a factor of 100, so label the horizontal axis carefully.",
        ],
        formulas: [
          ["Elastic slope","E=\\frac{\\Delta\\sigma}{\\Delta\\varepsilon}"],
          ["Unit conversion","1\\,\\mathrm{GPa}=1000\\,\\mathrm{MPa}"],
        ],
        examples: [
          ex("Elastic points are (strain 0.001, stress 70 MPa) and (0.003, 210 MPa). Find E in GPa.", [
            ["Divide stress rise by strain rise, then convert MPa to GPa.",""],
            ["Substitute the stated values and calculate.","\\frac{\\frac{210-70}{0.003-0.001}}{1000} \\approx 70\\,\\mathrm{GPa}"],
          ], "70 GPa"),
          ex("A straight elastic line has E = 70000 MPa. Find stress at strain 0.002, with zero intercept, in MPa.", [
            ["Multiply modulus by dimensionless strain.",""],
            ["Substitute the stated values and calculate.","70000\\times 0.002 \\approx 140\\,\\mathrm{MPa}"],
          ], "140 MPa"),
        ],
        practice: [
          pr("Convert strain 0.2% to a dimensionless fraction.", 0.002, "Percent means per hundred.", "0.2 ÷ 100 = 0.002.", { tol: 0.00001 }),
          pr("Stress rises by 100 MPa while elastic strain rises by 0.002. Find E in GPa.", 50, "Use stress change over strain change.", "100/0.002/1000 = 50 GPa."),
          pr("A stress-versus-percent-strain slope is 700 MPa per percentage point. Find E in GPa.", 70, "Convert percent strain to dimensionless strain.", "700 × 100/1000 = 70 GPa."),
          pr("With E = 70000 MPa and zero intercept, what extension in mm is predicted at stress 140 MPa for a 50 mm gauge length?", 0.1, "Find elastic strain from stress/modulus, then multiply by gauge length.", "(140/70000) × 50 = 0.1 mm.", { tol: 0.0005 }),
        ],
      },
      {
        title: "Fit the region the model describes",
        minutes: 25,
        explain: [
          "A best-fit straight line balances the deviations of measured points from the line. It can include an intercept b as well as a slope m. A non-zero intercept can flag an initial offset; forcing the line through zero without checking may distort the modulus.",
          "The straight elastic model does not describe plastic deformation. Selecting more rows is useful only while those rows belong to the same model. R² measures how much variation around the mean the fitted line explains; a large value alone does not prove that the chosen physical model is appropriate.",
        ],
        formulas: [
          ["Straight line","y=mx+b"],
          ["Fit measure","R^2=1-\\frac{\\sum(y_i-\\hat y_i)^2}{\\sum(y_i-\\bar y)^2}"],
        ],
        examples: [
          ex("A fit gives stress = 70000 × strain + 2 MPa. Find predicted stress at strain 0.001 in MPa.", [
            ["Include the intercept as well as the slope term.",""],
            ["Substitute the stated values and calculate.","70000\\times 0.001+2 \\approx 72\\,\\mathrm{MPa}"],
          ], "72 MPa"),
          ex("For a fitted line, squared residuals total 4 MPa² and squared deviations from mean total 400 MPa². Find R².", [
            ["Subtract the unexplained fraction from one.",""],
            ["Substitute the stated values and calculate.","1-\\frac{4}{400} \\approx 0.99"],
          ], "0.99"),
        ],
        practice: [
          pr("At one strain, measured stress is 101 MPa and fitted stress is 100 MPa. Find measured minus fitted stress in MPa.", 1, "This difference is the residual.", "101 − 100 = 1 MPa."),
          pr("A fit has squared residual sum 10 MPa² and total squared deviation 200 MPa². Find R².", 0.95, "Use the stated sums in the fit measure.", "1 − 10/200 = 0.95."),
          pr("A fit of all rows gives E = 45 GPa; an elastic-only fit gives 70 GPa. Find the increase in fitted E in GPa.", 25, "Subtract the first estimate from the revised estimate.", "70 − 45 = 25 GPa."),
          pr("An elastic fit gives 69 GPa against a 70 GPa reference. Find absolute percentage difference relative to the reference.", 1.42857142857, "Use the absolute difference divided by the reference.", "100 × |69 − 70|/70 ≈ 1.429 %."),
        ],
      },
      {
        title: "Replicates, uncertainty and reporting",
        minutes: 25,
        explain: [
          "Repeated specimens show how much results vary. Report an average with units and explain the chosen fitting region. Keep enough digits during the calculations, then round the final result to a precision supported by the measurements.",
          "A systematic measurement error can affect every row together. If original area is underestimated, every stress and the fitted modulus are overestimated. Repeating the same calculation does not remove that bias; check specimen measurements and instrument calibration.",
        ],
        formulas: [
          ["Mean","\\bar E=\\frac{E_1+\\cdots+E_n}{n}"],
          ["Range","R=E_{max}-E_{min}"],
          ["Area-related correction","E_{corrected}=E_{reported}\\frac{A_{used}}{A_{true}}"],
        ],
        examples: [
          ex("Three specimen moduli are 68, 70 and 72 GPa. Find the mean in GPa.", [
            ["Add all specimen results and divide by their count.",""],
            ["Substitute the stated values and calculate.","\\frac{68+70+72}{3} \\approx 70\\,\\mathrm{GPa}"],
          ], "70 GPa"),
          ex("A modulus was reported as 75 GPa using area 20 mm². True area is 25 mm²; all other measurements remain the same. Find corrected modulus in GPa.", [
            ["Stress and modulus both scale inversely with area.",""],
            ["Substitute the stated values and calculate.","\\frac{75\\times 20}{25} \\approx 60\\,\\mathrm{GPa}"],
          ], "60 GPa"),
        ],
        practice: [
          pr("Results are 69, 70 and 71 GPa. Find their range in GPa.", 2, "Subtract smallest from largest.", "71 − 69 = 2 GPa."),
          pr("Four results are 66, 68, 70 and 72 GPa. Find mean in GPa.", 69, "Give each specimen equal weight.", "(66 + 68 + 70 + 72)/4 = 69 GPa."),
          pr("A dimension is reported as 10.0 mm but is truly 10.2 mm. Find absolute percentage error relative to the true value.", 1.96078431373, "Divide absolute difference by true size.", "100 × |10.0 − 10.2|/10.2 ≈ 1.961 %."),
          pr("A modulus is 70 GPa using a 50 mm gauge length. True gauge length is 49 mm, with area and readings unchanged. Find corrected modulus in GPa.", 68.6, "Modulus from load and extension is proportional to the original gauge length used.", "70 × 49/50 = 68.6 GPa."),
        ],
      },
    ],
  },

};
