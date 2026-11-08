// Physics foundations: four beginner-friendly parts for each class.
const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const PHYSICS1 = {
  'phys-001': {
    predict: {
      "q": "The steel beam stays on the table. You swap a cubit ruler for a much shorter hand ruler. What happens to the measurement?",
      "options": [
        "The count gets smaller",
        "The beam gets longer",
        "The count gets larger",
        "The count stays fixed"
      ],
      "answer": 2,
      "reveal": "More short units fit along the same beam. Only the number and the unit change; the beam keeps its length."
    },
    parts: [
      {
        title: "A number needs a unit",
        minutes: 20,
        explain: [
          "A measurement compares an object with a chosen unit. Put equal units end to end, with no gaps or overlaps. The count tells you the length in that unit. In the formula, L means total length and u means one unit length. A last piece can be shorter than a whole unit.",
          "A unit must stay the same size as you measure. Two people may have different hand spans. An agreed ruler lets a workshop cut matching pieces, even when different people measure them.",
        ],
        formulas: [["Equal units","L=u+u+\\cdots+u"]],
        examples: [
          ex("A strip spans three equal 10 cm sections. How long is it in cm?", [
            ["Add one unit for each mark.", ""],
            ["Substitute the given values and calculate.", "10+10+10 = 30\\,\\mathrm{cm}"],
          ], "30 cm"),
          ex("A plank spans two 20 cm rods and a final 5 cm piece. Its length in cm?", [
            ["Add all the pieces, including the last short piece.", ""],
            ["Substitute the given values and calculate.", "20+20+5 = 45\\,\\mathrm{cm}"],
          ], "45 cm"),
        ],
        practice: [
          pr("Two 15 cm pieces lie end to end. Total length in cm?", 30, "Add the two lengths.", "15+15 = 30 cm."),
          pr("A bar spans four 5 cm units. Length in cm?", 20, "Add four equal lengths.", "5+5+5+5 = 20 cm."),
          pr("A metal strip spans 20 cm, 20 cm and 7 cm. Length in cm?", 47, "Include the final part of a unit.", "20+20+7 = 47 cm."),
          pr("A sheet needs 60 cm of edging. You have 25 cm and 20 cm. How many more cm are needed?", 15, "Subtract the pieces you already have.", "60-25-20 = 15 cm."),
        ],
      },
      {
        title: "Changing the ruler",
        minutes: 20,
        explain: [
          "A shorter ruler unit fits more times along the same object. The object has not grown. For example, centimetres give a larger count than metres because each centimetre is shorter.",
          "At this stage, convert by adding equal lengths. Each metre contains one hundred centimetres. Keep the unit beside every measurement so a cutting instruction cannot be mistaken for a different length.",
        ],
        formulas: [["One metre","1\\,\\text{m}=100\\,\\text{cm}"]],
        examples: [
          ex("A beam is 2 m long. Its length in cm?", [
            ["Replace each metre with one hundred centimetres.", ""],
            ["Substitute the given values and calculate.", "100+100 = 200\\,\\mathrm{cm}"],
          ], "200 cm"),
          ex("A strip is 1 m and 30 cm long. Total length in cm?", [
            ["Change the whole metre first.", ""],
            ["Substitute the given values and calculate.", "100+30 = 130\\,\\mathrm{cm}"],
          ], "130 cm"),
        ],
        practice: [
          pr("A plate is 1 m and 5 cm long. Length in cm?", 105, "Add the extra centimetres.", "100+5 = 105 cm."),
          pr("A beam is 3 m long. Length in cm?", 300, "Add one hundred for each metre.", "100+100+100 = 300 cm."),
          pr("A 1 m strip loses a 35 cm offcut. How many cm remain?", 65, "Use centimetres for both lengths.", "100-35 = 65 cm."),
          pr("A rack holds pieces of 1 m, 40 cm and 60 cm end to end. Total length in cm?", 200, "Change the metre before adding.", "100+40+60 = 200 cm."),
        ],
      },
      {
        title: "Clocks and elapsed time",
        minutes: 20,
        explain: [
          "Elapsed time is how long an event lasts. A clock reading tells you when it happens. Find elapsed time by counting forwards from the start to the finish.",
          "One minute contains sixty seconds and one hour contains sixty minutes. Furnace holds and cooling trials need both a number and a time unit. Adding hours directly to minutes would mix different-sized units.",
        ],
        formulas: [["Time units","1\\,\\text{min}=60\\,\\text{s},\\quad 1\\,\\text{h}=60\\,\\text{min}"]],
        examples: [
          ex("A test lasts 2 min. How many seconds is that?", [
            ["Add sixty seconds for each minute.", ""],
            ["Substitute the given values and calculate.", "60+60 = 120\\,\\mathrm{s}"],
          ], "120 s"),
          ex("A hold lasts 1 h and 15 min. How many minutes is that?", [
            ["Change the hour to minutes.", ""],
            ["Substitute the given values and calculate.", "60+15 = 75\\,\\mathrm{min}"],
          ], "75 min"),
        ],
        practice: [
          pr("A cooling trial lasts 1 min and 20 s. Time in seconds?", 80, "Add the remaining seconds after changing the minute.", "60+20 = 80 s."),
          pr("A process starts at 10:10 and finishes at 10:45. Elapsed time in minutes?", 35, "Both readings are within the same hour.", "45-10 = 35 min."),
          pr("A trial lasts 3 min and 5 s. Time in seconds?", 185, "Count three whole minutes, then the extra seconds.", "60+60+60+5 = 185 s."),
          pr("A hold starts at 11:50 and ends at 12:20. Elapsed time in minutes?", 30, "Count to noon, then count onwards.", "10+20 = 30 min."),
        ],
      },
      {
        title: "Reading a scale fairly",
        minutes: 20,
        explain: [
          "A ruler measures between two marks. If its end is damaged, start at another mark and subtract the starting reading from the finishing reading. The printed number at the far end is not always the length.",
          "Repeated measurements may differ a little. Record the smallest and largest readings to show the spread. A ruler with centimetre marks cannot justify a claim about tiny details between them. Careful measurement of a metal sample starts with an honest reading.",
        ],
        formulas: [["Length between marks","L=\\text{finish}-\\text{start}"],["Spread","\\text{spread}=\\text{largest}-\\text{smallest}"]],
        examples: [
          ex("A strip starts at 3 cm and ends at 18 cm on a ruler. Length in cm?", [
            ["Subtract the starting mark.", ""],
            ["Substitute the given values and calculate.", "18-3 = 15\\,\\mathrm{cm}"],
          ], "15 cm"),
          ex("Three readings are 21, 22 and 23 mm. What is their spread in mm?", [
            ["Compare the largest and smallest readings.", ""],
            ["Substitute the given values and calculate.", "23-21 = 2\\,\\mathrm{mm}"],
          ], "2 mm"),
        ],
        practice: [
          pr("A rod lies between 5 cm and 17 cm. Length in cm?", 12, "The ruler did not start at zero.", "17-5 = 12 cm."),
          pr("Readings are 48, 50 and 49 mm. Spread in mm?", 2, "Choose the largest and smallest.", "50-48 = 2 mm."),
          pr("A sheet spans 12 cm to 39 cm. Length in cm?", 27, "Subtract the two end readings.", "39-12 = 27 cm."),
          pr("A cut should be 80 mm but measures 83 mm. How much too long is it in mm?", 3, "Compare the measured and intended lengths.", "83-80 = 3 mm."),
        ],
      },
    ],
  },
  'phys-002': {
    predict: {
      "q": "A 6 kg mass sits 2 m left of the pivot. Where should a 3 kg mass sit on the right to balance a light, level lever?",
      "options": [
        "At 4 m",
        "At 1 m",
        "At 2 m",
        "At 6 m"
      ],
      "answer": 0,
      "reveal": "The smaller mass needs a longer arm. Both sides then have the same mass times distance: the turning effects balance."
    },
    parts: [
      {
        title: "Distance can balance weight",
        minutes: 20,
        explain: [
          "A pivot is the point a lever turns around. A load farther from the pivot has more turning effect. For a light horizontal lever with hanging loads, compare mass times distance on each side.",
          "To balance, make these two products equal. The lever itself is taken to have negligible weight. This is the principle behind a crowbar lifting a casting and a balance comparing samples.",
        ],
        formulas: [["Lever balance","m_1d_1=m_2d_2"]],
        examples: [
          ex("A 6 kg load is 2 m left of a pivot. How far right must 3 kg hang, in m?", [
            ["Find the mass-distance product on the left.", "6\\times2=12\\,\\mathrm{kg\\cdot m}"],
            ["Set the right product equal to the left.", "3d=12"],
            ["Divide by the right mass to find its distance.", "d=12/3=4\\,\\mathrm{m}"],
          ], "4 m"),
          ex("A 4 kg mass hangs 3 m left. What mass at 2 m right balances it, in kg?", [
            ["Divide the left product by the right distance.", ""],
            ["Substitute the given values and calculate.", "4\\times3\\div2 = 6\\,\\mathrm{kg}"],
          ], "6 kg"),
        ],
        practice: [
          pr("A 2 kg mass at 3 m has what mass-distance product, in kg·m?", 6, "Multiply mass by distance.", "2×3 = 6 kg·m."),
          pr("A 5 kg load at 2 m balances 2 kg at what distance in m?", 5, "Match the two products.", "5×2÷2 = 5 m."),
          pr("A 9 kg load at 1 m balances what mass at 3 m, in kg?", 3, "The larger arm needs a smaller mass.", "9÷3 = 3 kg."),
          pr("A 4 kg load at 3 m and a 2 kg load at 1 m both hang left. What mass at 2 m right balances them, in kg?", 7, "Add the two left turning effects first.", "(4×3+2×1)÷2 = 7 kg."),
        ],
      },
      {
        title: "Mass packed into volume",
        minutes: 20,
        explain: [
          "Mass tells you how much matter a sample contains. Volume tells you how much space it occupies. Density is the mass of one unit of volume, found by dividing total mass by total volume.",
          "A decimal point shows a part of a unit: 2.7 means two whole units and seven tenths. A large aluminium block can outweigh a small steel block. Compare density to compare the materials fairly. Typical densities are about 2.7 g/cm³ for aluminium and 7.85 g/cm³ for steel; actual alloys vary.",
        ],
        formulas: [["Density","\\rho=m/V"],["Mass","m=\\rho V"]],
        examples: [
          ex("A sample has mass 54 g and volume 20 cm³. Density in g/cm³?", [
            ["Divide mass by volume.", ""],
            ["Substitute the given values and calculate.", "54\\div20 = 2.7\\,\\mathrm{g/cm^{3}}"],
          ], "2.7 g/cm³"),
          ex("Use a typical steel density of 7.85 g/cm³. What is the mass of 10 cm³ in g?", [
            ["Multiply density by volume.", ""],
            ["Substitute the given values and calculate.", "7.85\\times10 = 78.5\\,\\mathrm{g}"],
          ], "78.5 g"),
        ],
        practice: [
          pr("A sample is 60 g and 20 cm³. Density in g/cm³?", 3, "Find mass per cubic centimetre.", "60÷20 = 3 g/cm³."),
          pr("A block has density 2 g/cm³ and volume 30 cm³. Mass in g?", 60, "Multiply the amount in each cubic centimetre by the volume.", "2×30 = 60 g."),
          pr("A 100 g sample has density 5 g/cm³. Volume in cm³?", 20, "Divide mass by density.", "100÷5 = 20 cm³."),
          pr("Two pieces of the same uniform alloy have masses 40 g and 60 g and volumes 5 cm³ and 7.5 cm³. Combined density in g/cm³?", 8, "Add masses and volumes separately before dividing.", "(40+60)÷(5+7.5) = 8 g/cm³."),
        ],
      },
      {
        title: "Measuring an awkward shape",
        minutes: 20,
        explain: [
          "A crown or rough casting has no simple length-times-width volume. Lower it fully into water and measure the rise in water volume. That rise is the volume it displaces.",
          "Use a sample that does not dissolve, absorb water or trap air. Compare its measured density with a known material. A mismatch can rule out purity, but density alone cannot identify every possible mixture.",
        ],
        formulas: [["Displacement volume","V=V_{\\text{after}}-V_{\\text{before}}"],["Density test","\\rho=m/V"]],
        examples: [
          ex("Water rises from 50 to 70 cm³ when a sample is submerged. Sample volume in cm³?", [
            ["Subtract the initial water reading.", ""],
            ["Substitute the given values and calculate.", "70-50 = 20\\,\\mathrm{cm^{3}}"],
          ], "20 cm³"),
          ex("A 270 g casting raises water from 100 to 200 cm³. Density in g/cm³?", [
            ["Find the displaced volume.", "V=200-100=100\\,\\mathrm{cm^{3}}"],
            ["Divide the mass by that volume.", "\\rho=270/100=2.7\\,\\mathrm{g/cm^{3}}"],
          ], "2.7 g/cm³"),
        ],
        practice: [
          pr("Water rises from 30 to 42 cm³. Sample volume in cm³?", 12, "Use the rise, not the final reading.", "42-30 = 12 cm³."),
          pr("A 160 g object displaces 20 cm³. Density in g/cm³?", 8, "Divide mass by displaced volume.", "160÷20 = 8 g/cm³."),
          pr("A 193 g pure-gold sample has density 19.3 g/cm³. Displaced volume in cm³?", 10, "Divide mass by density.", "193÷19.3 = 10 cm³."),
          pr("A 1000 g crown displaces 60 cm³. Its density in g/cm³?", 16.666666666666668, "Use the measured volume rather than the density of gold.", "1000÷60 ≈ 16.66667 g/cm³."),
        ],
      },
      {
        title: "Why objects float",
        minutes: 25,
        explain: [
          "Water pushes upward on a submerged object. The upward push equals the weight of displaced water. Before introducing force calculations, compare masses: floating needs displaced water with the same mass as the object.",
          "Fresh water has density about 1 g/cm³. An object less dense than water can float partly submerged. A hollow metal boat can float because its mass is spread over the whole outside volume, including the enclosed air. Assume it stays watertight.",
        ],
        formulas: [["Floating mass balance","m_{\\text{object}}=\\rho_{\\text{water}}V_{\\text{submerged}}"]],
        examples: [
          ex("A floating 80 g object displaces fresh water of density 1 g/cm³. Submerged volume in cm³?", [
            ["The displaced water must have the same mass.", ""],
            ["Substitute the given values and calculate.", "80\\div1 = 80\\,\\mathrm{cm^{3}}"],
          ], "80 cm³"),
          ex("A watertight shell has mass 200 g and outside volume 500 cm³. Average density in g/cm³?", [
            ["Include the enclosed space in the outside volume.", ""],
            ["Substitute the given values and calculate.", "200\\div500 = 0.4\\,\\mathrm{g/cm^{3}}"],
          ], "0.4 g/cm³"),
        ],
        practice: [
          pr("What mass of water occupies 30 cm³ at 1 g/cm³, in g?", 30, "Multiply water density by displaced volume.", "1×30 = 30 g."),
          pr("A floating 120 g sample displaces how many cm³ of fresh water at 1 g/cm³?", 120, "Match the mass of displaced water to the sample.", "120÷1 = 120 cm³."),
          pr("A solid sample has volume 100 cm³ and density 0.8 g/cm³. Its floating submerged volume in fresh water at 1 g/cm³, in cm³?", 80, "Find the sample mass, then the matching water volume.", "100×0.8÷1 = 80 cm³."),
          pr("A watertight container can displace at most 600 g of water. Its own mass is 150 g. Maximum added mass before complete submersion, in g?", 450, "Reserve part of the displaced mass for the container itself.", "600-150 = 450 g."),
        ],
      },
    ],
  },
  'phys-003': {
    predict: {
      "q": "A ball released from rest on the ramp travels 1 unit in its first second. With constant acceleration, how far does it travel during the fourth second alone?",
      "options": [
        "4 units",
        "8 units",
        "16 units",
        "7 units"
      ],
      "answer": 3,
      "reveal": "Total distance grows with time squared. Subtract the distance after three seconds from the distance after four; the gaps grow as the odd numbers."
    },
    parts: [
      {
        title: "Distance and travel time",
        minutes: 20,
        explain: [
          "Distance is the length of the route travelled. Average speed is distance divided by elapsed time. It describes the whole trip, even if the object speeds up and slows down along the way.",
          "Keep both units visible: metres divided by seconds gives metres per second. For now, use motion in one direction so distance and the size of the position change are the same.",
        ],
        formulas: [["Average speed","v_{\\text{avg}}=d/t"]],
        examples: [
          ex("A trolley travels 12 m in 4 s. Average speed in m/s?", [
            ["Divide distance by elapsed time.", ""],
            ["Substitute the given values and calculate.", "12\\div4 = 3\\,\\mathrm{m/s}"],
          ], "3 m/s"),
          ex("A sample travels on a belt at 2 m/s for 6 s. Distance in m?", [
            ["Each second adds the same distance.", ""],
            ["Substitute the given values and calculate.", "2\\times6 = 12\\,\\mathrm{m}"],
          ], "12 m"),
        ],
        practice: [
          pr("A cart covers 10 m in 5 s. Average speed in m/s?", 2, "Find metres travelled each second.", "10÷5 = 2 m/s."),
          pr("A conveyor travels 15 m in 3 s. Average speed in m/s?", 5, "Divide the distance by the time.", "15÷3 = 5 m/s."),
          pr("At a steady 4 m/s, how many seconds does a trolley need to travel 20 m?", 5, "Divide distance by speed.", "20÷4 = 5 s."),
          pr("A cart covers 6 m in 2 s, then 6 m in 4 s. Whole-trip average speed in m/s?", 2, "Add distances and times separately.", "(6+6)÷(2+4) = 2 m/s."),
        ],
      },
      {
        title: "Equal gains in speed",
        minutes: 20,
        explain: [
          "Acceleration tells you how much speed changes each second. A constant acceleration adds the same amount of speed in every equal time interval. The distance added each second still grows because the ball is moving faster.",
          "Speed and acceleration are different quantities. A fast conveyor moving steadily has no acceleration. In this part all motion and speed gains are along the same direction.",
        ],
        formulas: [["Acceleration","a=(v-u)/t"],["Final speed","v=u+at"]],
        examples: [
          ex("Speed rises from 2 to 10 m/s in 4 s. Acceleration in m/s²?", [
            ["Find the speed gain, then divide by time.", ""],
            ["Substitute the given values and calculate.", "(10-2)\\div4 = 2\\,\\mathrm{m/s^{2}}"],
          ], "2 m/s²"),
          ex("A ball starts at rest and gains 3 m/s each second for 5 s. Final speed in m/s?", [
            ["Add the same speed gain for every second.", ""],
            ["Substitute the given values and calculate.", "0+3\\times5 = 15\\,\\mathrm{m/s}"],
          ], "15 m/s"),
        ],
        practice: [
          pr("Speed rises from 1 to 7 m/s in 3 s. Acceleration in m/s²?", 2, "Use the change in speed.", "(7-1)÷3 = 2 m/s²."),
          pr("A ball starts at 2 m/s with acceleration 2 m/s² for 4 s. Final speed in m/s?", 10, "Keep the starting speed as well as the gain.", "2+2×4 = 10 m/s."),
          pr("A belt runs steadily at 5 m/s for 8 s. Acceleration in m/s²?", 0, "Ask whether its speed changed.", "(5-5)÷8 = 0 m/s².", { tol: 0.000001 }),
          pr("A trolley gains speed from 3 to 15 m/s at 4 m/s². Elapsed time in s?", 3, "Divide the required speed gain by the gain each second.", "(15-3)÷4 = 3 s."),
        ],
      },
      {
        title: "The growing gaps on a ramp",
        minutes: 25,
        explain: [
          "Start a ball from rest with constant acceleration. Its total distance grows with time times time. Doubling the time makes the distance four times as large. In a formula, t² means t multiplied by itself.",
          "To find the distance in one particular second, subtract two total distances. The ramp scene uses a simplified constant acceleration; the odd-number pattern also holds for a real rolling ball with constant acceleration, although its acceleration can differ.",
        ],
        formulas: [["From rest","d=\\tfrac12at^2"],["Distance ratio","d_2/d_1=(t_2/t_1)^2"]],
        examples: [
          ex("A ball starts from rest with a = 2 m/s². Distance after 3 s in m?", [
            ["Multiply time by itself, then by half the acceleration.", ""],
            ["Substitute the given values and calculate.", "0.5\\times2\\times3\\times3 = 9\\,\\mathrm{m}"],
          ], "9 m"),
          ex("A ball covers 1 m in its first second from rest. With constant acceleration, distance during its fourth second in m?", [
            ["Subtract the total after three seconds from the total after four.", ""],
            ["Substitute the given values and calculate.", "4\\times4-3\\times3 = 7\\,\\mathrm{m}"],
          ], "7 m"),
        ],
        practice: [
          pr("From rest at a = 2 m/s², distance after 2 s in m?", 4, "Use time twice.", "0.5×2×2×2 = 4 m."),
          pr("From rest at a = 4 m/s², distance after 3 s in m?", 18, "Find half the acceleration times time squared.", "0.5×4×3×3 = 18 m."),
          pr("A ball travels 2 m in the first second from rest. With constant acceleration, total distance after 3 s in m?", 18, "Scale the first-second distance by time squared.", "2×3×3 = 18 m."),
          pr("A ball travels 2 m in the first second from rest. With constant acceleration, distance during its third second in m?", 10, "Subtract total distances at the two ends of that second.", "2×(3×3-2×2) = 10 m."),
        ],
      },
      {
        title: "Free fall and a fair experiment",
        minutes: 25,
        explain: [
          "With negligible air resistance, dropped objects gain speed at the same rate whatever their mass. Near Earth, take this rate as 9.8 m/s². A casting dropped from rest therefore follows the same time-squared rule as the ramp ball.",
          "Test one change at a time. To compare masses fairly, use the same release height, release both from rest and reduce air effects. A broad sheet and a compact ball differ in shape as well as mass, so their fall through air is not a fair mass-only comparison.",
        ],
        formulas: [["Dropped distance","d=\\tfrac12gt^2"],["Dropped speed","v=gt"]],
        examples: [
          ex("A casting is dropped from rest for 2 s. With g = 9.8 m/s² and no air resistance, distance in m?", [
            ["Use the time-squared rule with gravity as the acceleration.", ""],
            ["Substitute the given values and calculate.", "0.5\\times9.8\\times2\\times2 = 19.6\\,\\mathrm{m}"],
          ], "19.6 m"),
          ex("A ball falls from rest for 3 s with g = 9.8 m/s² and no air resistance. Speed in m/s?", [
            ["Each second adds the same speed.", ""],
            ["Substitute the given values and calculate.", "9.8\\times3 \\approx 29.4\\,\\mathrm{m/s}"],
          ], "29.4 m/s"),
        ],
        practice: [
          pr("Using g = 9.8 m/s², a dropped object has what speed after 1 s, in m/s? Ignore air.", 9.8, "Multiply the rate of speed gain by time.", "9.8×1 = 9.8 m/s."),
          pr("Using g = 9.8 m/s², distance fallen from rest in 1 s, in m? Ignore air.", 4.9, "Use half the acceleration times time squared.", "0.5×9.8×1×1 = 4.9 m."),
          pr("Using g = 9.8 m/s², how much speed does a freely falling object gain in 4 s, in m/s? Ignore air.", 39.2, "Count four equal speed gains.", "9.8×4 = 39.2 m/s."),
          pr("A 1 kg and a 5 kg ball are dropped together in a vacuum. Using g = 9.8 m/s², what is the difference in their distances after 2 s, in m?", 0, "Both balls have the same acceleration and starting speed.", "0.5×9.8×4-0.5×9.8×4 = 0 m.", { tol: 0.000001 }),
        ],
      },
    ],
  },
  'phys-004': {
    predict: {
      "q": "A crate is already sliding. You adjust your push until it exactly matches friction. What happens next on the level floor?",
      "options": [
        "It immediately stops",
        "It keeps the same speed",
        "It steadily speeds up",
        "It reverses direction"
      ],
      "answer": 1,
      "reveal": "Balanced forces mean zero acceleration. They preserve the speed the crate already has; they do not remove it."
    },
    parts: [
      {
        title: "Forces belong on one object",
        minutes: 20,
        explain: [
          "A force is a push or pull, measured in newtons, N. Draw the object on its own and add arrows for the forces acting on it. The net force is their total, including direction.",
          "Choose a positive direction before subtracting. Opposing forces on the same object can cancel. A force pair from two interacting objects acts on different objects, so those two forces do not cancel on either object alone.",
        ],
        formulas: [["One line of motion","F_{\\text{net}}=F_{\\text{right}}-F_{\\text{left}}"]],
        examples: [
          ex("A crate has 70 N right and 20 N left. Taking right as positive, net force in N?", [
            ["Subtract the opposing force.", ""],
            ["Substitute the given values and calculate.", "70-20 = 50\\,\\mathrm{N}"],
          ], "50 N"),
          ex("A press pushes a sample down with 200 N. What is the magnitude of the sample’s force on the press, in N?", [
            ["The two interaction forces have equal magnitudes.", ""],
            ["Substitute the given values and calculate.", "200 = 200\\,\\mathrm{N}"],
          ], "200 N"),
        ],
        practice: [
          pr("A trolley has 30 N right and 10 N left. Net force in N, right positive?", 20, "Combine forces on the trolley only.", "30-10 = 20 N."),
          pr("Two forces of 15 N each act rightward. Net force in N?", 30, "Forces in the same direction add.", "15+15 = 30 N."),
          pr("A trolley has 10 N right and 25 N left. Net force in N, right positive?", -15, "A leftward result is negative.", "10-25 = -15 N."),
          pr("A crate has 80 N right, 30 N left and another 50 N left. Net force in N, right positive?", 0, "Include every force on this object.", "80-30-50 = 0 N.", { tol: 0.000001 }),
        ],
      },
      {
        title: "Mass and changing motion",
        minutes: 25,
        explain: [
          "Mass measures resistance to a change in motion. Newton’s second law says net force equals mass times acceleration. A larger mass needs more net force for the same acceleration.",
          "Zero net force means zero acceleration. An object at rest stays at rest, while a moving object keeps its velocity. On a straight conveyor this explains why maintaining motion can require balancing friction without any speed increase.",
        ],
        formulas: [["Newton’s second law","F_{\\text{net}}=ma"],["Acceleration","a=F_{\\text{net}}/m"]],
        examples: [
          ex("A 10 kg trolley has net force 40 N. Acceleration in m/s²?", [
            ["Start with Newton’s second law.", "F_{\\text{net}}=ma"],
            ["Divide both sides by mass.", "a=F_{\\text{net}}/m"],
            ["Substitute the force and mass.", "a=40/10=4\\,\\mathrm{m/s^{2}}"],
          ], "4 m/s²"),
          ex("A 25 kg crate needs acceleration 2 m/s². Net force in N?", [
            ["Multiply mass by acceleration.", ""],
            ["Substitute the given values and calculate.", "25\\times2 = 50\\,\\mathrm{N}"],
          ], "50 N"),
        ],
        practice: [
          pr("A 5 kg object has net force 15 N. Acceleration in m/s²?", 3, "Use the total force, not just one push.", "15÷5 = 3 m/s²."),
          pr("A 20 kg cart accelerates at 3 m/s². Net force in N?", 60, "Multiply mass and acceleration.", "20×3 = 60 N."),
          pr("A net force of 18 N gives acceleration 3 m/s². Mass in kg?", 6, "Rearrange force equals mass times acceleration.", "18÷3 = 6 kg."),
          pr("A 50 kg crate has a 200 N push and 100 N opposing friction. Acceleration in m/s²?", 2, "Find the net force before dividing.", "(200-100)÷50 = 2 m/s²."),
        ],
      },
      {
        title: "Weight and support",
        minutes: 20,
        explain: [
          "Weight is the downward force of gravity, not the mass itself. Near Earth, weight in newtons is mass in kilograms times 9.8 m/s². The same mass would have a different weight on another world.",
          "A level floor supplies an upward normal force. With no vertical acceleration and no other vertical forces, the normal force equals weight. A cable holding a sample at rest also balances its weight.",
        ],
        formulas: [["Weight","W=mg"],["Vertical balance","N-mg=0"]],
        examples: [
          ex("Take g = 9.8 m/s². Weight of a 10 kg sample in N?", [
            ["Multiply mass by gravitational acceleration.", ""],
            ["Substitute the given values and calculate.", "10\\times9.8 = 98\\,\\mathrm{N}"],
          ], "98 N"),
          ex("A 5 kg sample rests on a level table with no other vertical forces. Normal force in N, using g = 9.8 m/s²?", [
            ["The table must balance the weight.", ""],
            ["Substitute the given values and calculate.", "5\\times9.8 = 49\\,\\mathrm{N}"],
          ], "49 N"),
        ],
        practice: [
          pr("Weight of 2 kg in N, with g = 9.8 m/s²?", 19.6, "Use weight equals mass times gravity.", "2×9.8 = 19.6 N."),
          pr("A cable holds 20 kg at rest. Tension in N, with g = 9.8 m/s²?", 196, "Balance the downward weight.", "20×9.8 = 196 N."),
          pr("An object weighs 147 N where g = 9.8 m/s². Mass in kg?", 14.999999999999998, "Divide weight by gravitational acceleration.", "147÷9.8 ≈ 15 kg."),
          pr("A 10 kg sample sits on a table while an extra 12 N pushes downward. Normal force in N, with g = 9.8 m/s²?", 110, "The table balances both downward forces.", "10×9.8+12 = 110 N."),
        ],
      },
      {
        title: "Friction and a steady slide",
        minutes: 25,
        explain: [
          "Sliding friction opposes sliding. In a simple model its magnitude is μN, where μ is the coefficient of kinetic friction and N is the normal force. On a level floor with a horizontal push, N equals mg.",
          "Static friction can adjust up to a limit before sliding starts. Do not assume it always equals that limit. Here the crate is already sliding, so use kinetic friction. A steady sliding speed requires a push equal to this friction.",
        ],
        formulas: [["Sliding friction","f_k=\\mu_kN"],["Horizontal motion","a=(F-f_k)/m"]],
        examples: [
          ex("A 50 kg crate slides on a level floor with μ = 0.2. Using g = 9.8 m/s², friction in N?", [
            ["Find the normal force from the weight.", "N=50\\times9.8\\approx490\\,\\mathrm{N}"],
            ["Multiply by the sliding coefficient.", "f_k=0.2\\times490=98\\,\\mathrm{N}"],
          ], "98 N"),
          ex("A 20 kg crate slides with μ = 0.25 and a horizontal push of 69 N. Using g = 9.8 m/s², acceleration in m/s²?", [
            ["Find the sliding friction.", "f_k=0.25\\times20\\times9.8=49\\,\\mathrm{N}"],
            ["Subtract friction from the push.", "F_{\\text{net}}=69-49=20\\,\\mathrm{N}"],
            ["Divide the net force by mass.", "a=20/20=1\\,\\mathrm{m/s^{2}}"],
          ], "1 m/s²"),
        ],
        practice: [
          pr("Normal force is 100 N and μ = 0.3. Sliding friction in N?", 30, "Multiply the coefficient by the normal force.", "0.3×100 = 30 N."),
          pr("A sliding crate has friction 45 N. Horizontal push needed for steady speed in N?", 45, "Steady speed requires balanced horizontal forces.", "45 = 45 N."),
          pr("A 10 kg crate slides with 20 N friction and a 50 N push. Acceleration in m/s²?", 3, "Use the remaining force after friction.", "(50-20)÷10 = 3 m/s²."),
          pr("A 40 kg crate slides steadily under a 78.4 N horizontal push. Using g = 9.8 m/s², find μ.", 0.2, "The push equals friction; divide it by the normal force.", "78.4÷(40×9.8) = 0.2."),
        ],
      },
    ],
  },
  'phys-005': {
    predict: {
      "q": "You add friction to the swinging pendulum. Long after release it rests at the bottom. Where has its original height energy gone?",
      "options": [
        "It has been destroyed",
        "It stays as motion",
        "It returns as height",
        "It becomes thermal energy"
      ],
      "answer": 3,
      "reveal": "Friction transfers the pendulum’s mechanical energy into thermal energy in the moving parts and surroundings. The heat share grows as the swings shrink."
    },
    parts: [
      {
        title: "Energy stored in motion and height",
        minutes: 20,
        explain: [
          "Energy measures the ability to cause change. A moving object has kinetic energy. Because speed is squared, a faster impact can carry much more energy even when mass is unchanged.",
          "A raised object has gravitational potential energy relative to a chosen zero height. Use the bottom of a pendulum swing as that zero. Near Earth take g = 9.8 m/s².",
        ],
        formulas: [["Kinetic energy","K=\\tfrac12mv^2"],["Height energy","U=mgh"]],
        examples: [
          ex("A 2 kg trolley moves at 3 m/s. Kinetic energy in J?", [
            ["Square the speed.", "v^2=3^2=9\\,\\mathrm{m^{2}/s^{2}}"],
            ["Multiply by half the mass.", "K=0.5\\times2\\times9=9\\,\\mathrm{J}"],
          ], "9 J"),
          ex("A 2 kg sample is 5 m above the chosen zero. Potential energy in J, with g = 9.8 m/s²?", [
            ["Multiply mass, gravity and height.", ""],
            ["Substitute the given values and calculate.", "2\\times9.8\\times5 = 98\\,\\mathrm{J}"],
          ], "98 J"),
        ],
        practice: [
          pr("A 4 kg cart moves at 2 m/s. Kinetic energy in J?", 8, "Use half the mass times speed squared.", "0.5×4×2^2 = 8 J."),
          pr("A 3 kg load rises 2 m. Gain in potential energy in J, with g = 9.8 m/s²?", 58.800000000000004, "Use the height increase.", "3×9.8×2 ≈ 58.8 J."),
          pr("At fixed mass, speed doubles. By what factor does kinetic energy change?", 4, "Compare the squared speeds.", "2^2 = 4."),
          pr("A 2 kg cart has 25 J of kinetic energy. Speed in m/s?", 5, "Rearrange the kinetic energy relation and take the square root.", "√(2×25÷2) = 5 m/s."),
        ],
      },
      {
        title: "Work transfers energy",
        minutes: 25,
        explain: [
          "Work is energy transferred by a force acting through a distance. For a constant force parallel to the motion, multiply force by distance. A force against the motion does negative work.",
          "Net work changes kinetic energy. A motor can supply work to move a sheet through a roller. If friction removes some energy, the motor must supply that energy as well as any increase in motion energy.",
        ],
        formulas: [["Parallel force","W=Fd"],["Work and motion","W_{\\text{net}}=K_f-K_i"]],
        examples: [
          ex("A constant 30 N force acts along a 4 m movement. Work in J?", [
            ["Multiply force by the distance along it.", ""],
            ["Substitute the given values and calculate.", "30\\times4 = 120\\,\\mathrm{J}"],
          ], "120 J"),
          ex("A cart gains kinetic energy from 10 to 46 J. Net work in J?", [
            ["Work equals the change in kinetic energy.", ""],
            ["Substitute the given values and calculate.", "46-10 = 36\\,\\mathrm{J}"],
          ], "36 J"),
        ],
        practice: [
          pr("A 10 N push acts along 3 m. Work in J?", 30, "Use force times distance.", "10×3 = 30 J."),
          pr("Friction of 8 N opposes a 5 m slide. Work by friction in J?", -40, "Opposing force does negative work.", "-8×5 = -40 J."),
          pr("A motor supplies 200 J of work over 4 m along its force. Constant force in N?", 50, "Divide work by distance.", "200÷4 = 50 N."),
          pr("A 2 kg cart starts at rest. Net work is 16 J. Final speed in m/s?", 4, "Turn the work into final kinetic energy.", "√(2×16÷2) = 4 m/s."),
        ],
      },
      {
        title: "The pendulum’s energy account",
        minutes: 25,
        explain: [
          "Without friction, kinetic and potential energy exchange while their sum stays fixed. At a turning point the pendulum is momentarily still. At the bottom its potential energy is lowest and speed is greatest.",
          "With friction, include thermal energy in the account. The combined energy stays constant for the pendulum and its surroundings when no extra energy enters. A worn bearing heats up because it receives energy from motion.",
        ],
        formulas: [["Energy account","K+U+E_{\\text{thermal}}=E_{\\text{initial}}"]],
        examples: [
          ex("A pendulum starts with 20 J. Later U = 6 J with no friction. Kinetic energy in J?", [
            ["Subtract the remaining height energy from the total.", ""],
            ["Substitute the given values and calculate.", "20-6 = 14\\,\\mathrm{J}"],
          ], "14 J"),
          ex("A pendulum starts with 30 J. Later K = 8 J and U = 10 J. Energy transferred to heat in J?", [
            ["Add the two remaining mechanical energy shares.", "K+U=8+10=18\\,\\mathrm{J}"],
            ["Subtract that total from the initial energy.", "E_{\\text{thermal}}=30-18=12\\,\\mathrm{J}"],
          ], "12 J"),
        ],
        practice: [
          pr("A frictionless pendulum has total energy 12 J and U = 9 J. K in J?", 3, "The two mechanical shares add to the total.", "12-9 = 3 J."),
          pr("Initial energy is 50 J; heat transfer has reached 15 J. Remaining mechanical energy in J?", 35, "Subtract the thermal share.", "50-15 = 35 J."),
          pr("A 1 kg pendulum falls through a vertical height of 0.2 m. With no friction and g = 9.8 m/s², bottom speed in m/s?", 1.9798989873223332, "Set the lost height energy equal to kinetic energy.", "√(2×9.8×0.2) ≈ 1.979899 m/s."),
          pr("A 2 kg moving sample has 40 J initially. It loses 15 J to friction and ends at the same height. Final speed in m/s?", 5, "Find the remaining kinetic energy before solving for speed.", "√(2×(40-15)÷2) = 5 m/s."),
        ],
      },
      {
        title: "Heat capacity and power",
        minutes: 25,
        explain: [
          "Temperature tells you how hot something is; heat is energy transferred because of a temperature difference. Specific heat c tells you the energy needed per unit mass per degree. Assume c stays constant and no phase change occurs.",
          "Power is energy transferred per second. A faster heater can deliver the same energy in less time. For these estimates, use typical c values of 4.18 J/(g·°C) for water and 0.49 J/(g·°C) for steel, and ignore heat loss.",
        ],
        formulas: [["Heating","Q=mc\\Delta T"],["Power","P=E/t"]],
        examples: [
          ex("Warm 100 g of water by 10 °C with c = 4.18 J/(g·°C). Required heat in J?", [
            ["Multiply mass, specific heat and temperature rise.", ""],
            ["Substitute the given values and calculate.", "100\\times4.18\\times10 = 4180\\,\\mathrm{J}"],
          ], "4180 J"),
          ex("A heater transfers 2400 J in 20 s. Mean power in W?", [
            ["Divide energy by elapsed time.", ""],
            ["Substitute the given values and calculate.", "2400\\div20 = 120\\,\\mathrm{W}"],
          ], "120 W"),
        ],
        practice: [
          pr("A device transfers 600 J in 10 s. Power in W?", 60, "A watt is a joule each second.", "600÷10 = 60 W."),
          pr("Warm 200 g of steel by 20 °C with c = 0.49 J/(g·°C). Heat in J?", 1960, "Use the steel specific heat.", "200×0.49×20 = 1960 J."),
          pr("A 500 W heater runs for 30 s. Energy delivered in J?", 15000, "Multiply energy per second by time.", "500×30 = 15000 J."),
          pr("A 100 g steel sample absorbs 980 J with c = 0.49 J/(g·°C). Temperature rise in °C?", 20, "Divide heat by the sample’s heat capacity.", "980÷(100×0.49) = 20 °C."),
        ],
      },
    ],
  },
  'phys-006': {
    predict: {
      "q": "An ideal 12 V battery drives a 6 Ω resistor. You replace it with 3 Ω. What happens to the heating power?",
      "options": [
        "It halves",
        "It stays the same",
        "It doubles",
        "It quadruples"
      ],
      "answer": 2,
      "reveal": "At fixed voltage, halving resistance doubles current. Since power equals voltage times current, the heating power doubles too."
    },
    parts: [
      {
        title: "Charge, current and voltage",
        minutes: 20,
        explain: [
          "Electric charge is measured in coulombs, C. Current is the charge passing a point each second, measured in amperes, A. It is a rate of flow rather than an amount stored in a wire.",
          "Voltage is energy transferred per coulomb between two points. Conventional current follows positive charge; electrons in a metal drift the opposite way. A closed circuit is needed for a steady current.",
        ],
        formulas: [["Current","I=Q/t"],["Energy per charge","V=E/Q"]],
        examples: [
          ex("Charge of 12 C passes in 4 s. Current in A?", [
            ["Divide charge by time.", ""],
            ["Substitute the given values and calculate.", "12\\div4 = 3\\,\\mathrm{A}"],
          ], "3 A"),
          ex("A battery supplies 60 J to 5 C. Voltage in V?", [
            ["Find energy per coulomb.", ""],
            ["Substitute the given values and calculate.", "60\\div5 = 12\\,\\mathrm{V}"],
          ], "12 V"),
        ],
        practice: [
          pr("Charge of 8 C passes in 2 s. Current in A?", 4, "Use charge per second.", "8÷2 = 4 A."),
          pr("A current of 3 A flows for 5 s. Charge in C?", 15, "Multiply charge each second by time.", "3×5 = 15 C."),
          pr("A 9 V source transfers energy to 4 C. Energy in J?", 36, "Multiply energy per coulomb by charge.", "9×4 = 36 J."),
          pr("Charge of 24 C passes at 2 A. Elapsed time in s?", 12, "Divide the total charge by the flow rate.", "24÷2 = 12 s."),
        ],
      },
      {
        title: "Resistance and the material",
        minutes: 25,
        explain: [
          "Resistance measures how strongly a component opposes current. An ohmic resistor obeys V = IR at fixed temperature. Raising the voltage increases its current; raising its resistance decreases current at the same voltage.",
          "For a uniform wire, resistance is resistivity times length divided by cross-sectional area. Resistivity belongs to the material at a stated temperature. A longer wire has more resistance; a thicker wire has less. Use consistent metre units.",
        ],
        formulas: [["Ohm’s law","V=IR"],["Uniform wire","R=\\rho L/A"]],
        examples: [
          ex("A 12 V source is connected across 4 Ω. Current in A?", [
            ["Divide voltage by resistance.", ""],
            ["Substitute the given values and calculate.", "12\\div4 = 3\\,\\mathrm{A}"],
          ], "3 A"),
          ex("Use copper resistivity 1.7 × 10⁻⁸ Ω·m near room temperature. A 2 m wire has area 1 × 10⁻⁶ m². Resistance in Ω?", [
            ["Write resistance in terms of the wire’s material and shape.", "R=\\rho L/A"],
            ["Multiply resistivity by length.", "\\rho L=1.7\\times10^{-8}\\times2=3.4e-8\\,\\mathrm{\\Omega \\cdot m^{2}}"],
            ["Divide by the cross-sectional area.", "R=(3.4\\times10^{-8})/10^{-6}=0.034\\,\\Omega"],
          ], "0.034 Ω"),
        ],
        practice: [
          pr("A 6 V source is connected across 3 Ω. Current in A?", 2, "Apply Ohm’s law.", "6÷3 = 2 A."),
          pr("A resistor carries 2 A at 10 V. Resistance in Ω?", 5, "Divide voltage by current.", "10÷2 = 5 Ω."),
          pr("A wire has resistance 0.4 Ω. The same material and area are used at twice the length. Resistance in Ω?", 0.8, "Resistance scales directly with length.", "0.4×2 = 0.8 Ω."),
          pr("A wire has resistance 0.8 Ω. Its area is doubled and length halved, at the same temperature. New resistance in Ω?", 0.2, "Apply both changes to length divided by area.", "0.8×0.5÷2 = 0.2 Ω."),
        ],
      },
      {
        title: "Series and parallel paths",
        minutes: 25,
        explain: [
          "Resistors in series lie along one path, so they carry the same current. Their voltage drops add and their resistances add. An ideal connecting wire has negligible resistance.",
          "Parallel branches share the same voltage. Each carries its own current and the branch currents add. Adding a parallel path reduces the equivalent resistance. This is how several loads can use one supply voltage.",
        ],
        formulas: [["Series","R_s=R_1+R_2"],["Parallel","1/R_p=1/R_1+1/R_2"]],
        examples: [
          ex("Resistors of 3 Ω and 5 Ω are in series. Equivalent resistance in Ω?", [
            ["Add series resistances.", ""],
            ["Substitute the given values and calculate.", "3+5 = 8\\,\\Omega"],
          ], "8 Ω"),
          ex("Two 6 Ω resistors are in parallel. Equivalent resistance in Ω?", [
            ["Add the reciprocal resistances.", "1/R_p=1/6+1/6\\approx0.3333333"],
            ["Take the reciprocal to find resistance.", "R_p=1/(1/3)=3\\,\\Omega"],
          ], "3 Ω"),
        ],
        practice: [
          pr("Resistors of 2 Ω and 4 Ω are in series. Total resistance in Ω?", 6, "There is only one current path.", "2+4 = 6 Ω."),
          pr("A 12 V source drives 2 Ω and 4 Ω in series. Current in A?", 2, "Find total resistance first.", "12÷(2+4) = 2 A."),
          pr("A 6 Ω and a 3 Ω resistor are in parallel across 12 V. Total current in A?", 6, "Find each branch current, then add.", "12÷6+12÷3 = 6 A."),
          pr("A 2 Ω resistor is in series with two parallel 4 Ω resistors. Total resistance in Ω?", 4, "Replace the parallel pair before adding the series resistor.", "2+1÷(1/4+1/4) = 4 Ω."),
        ],
      },
      {
        title: "Heating and electrical energy",
        minutes: 25,
        explain: [
          "A resistor transfers electrical energy into thermal energy. Its power is voltage times current. Combining this with Ohm’s law gives power as current squared times resistance, or voltage squared divided by resistance.",
          "Which quantity stays fixed matters. At fixed voltage, a lower resistance draws more power. At fixed current, a larger resistance releases more heat. Heating elements use this transfer to warm a furnace.",
        ],
        formulas: [["Electrical power","P=VI=I^2R=V^2/R"],["Energy","E=Pt"]],
        examples: [
          ex("A 12 V resistor carries 3 A. Power in W?", [
            ["Multiply voltage by current.", ""],
            ["Substitute the given values and calculate.", "12\\times3 = 36\\,\\mathrm{W}"],
          ], "36 W"),
          ex("A 24 W element runs for 120 s. Energy in J?", [
            ["Multiply power by elapsed time.", ""],
            ["Substitute the given values and calculate.", "24\\times120 = 2880\\,\\mathrm{J}"],
          ], "2880 J"),
        ],
        practice: [
          pr("A resistor carries 2 A across 6 V. Power in W?", 12, "Use voltage times current.", "2×6 = 12 W."),
          pr("A 4 Ω resistor carries 3 A. Heating power in W?", 36, "Use current squared times resistance.", "3^2×4 = 36 W."),
          pr("An ideal 12 V supply drives 6 Ω. Heating power in W?", 24, "Use voltage squared divided by resistance.", "12^2÷6 = 24 W."),
          pr("A 500 W heater runs for 2 h. Electrical energy in kWh?", 1, "Change watts to kilowatts before multiplying by hours.", "500÷1000×2 = 1 kWh."),
        ],
      },
    ],
  },
  'phys-007': {
    predict: {
      "q": "Launch two balls at the same speed from level ground, one at 30° and one at 60°. Ignore air and land them at launch height. Which travels farther sideways?",
      "options": [
        "Equal ranges",
        "The 30° launch",
        "The 60° launch",
        "The heavier ball"
      ],
      "answer": 0,
      "reveal": "The steeper launch stays in the air longer but moves sideways more slowly. For these complementary angles the two effects exactly balance."
    },
    parts: [
      {
        title: "Two directions at once",
        minutes: 20,
        explain: [
          "A projectile is an object moving freely under gravity after release. Ignore air resistance and take g = 9.81 m/s² downward. Split the starting velocity into horizontal and vertical components.",
          "For launch speed u at angle θ above horizontal, the components are u cos θ and u sin θ. Gravity changes only the vertical component. The horizontal speed stays constant, even at the highest point.",
        ],
        formulas: [["Starting components","u_x=u\\cos\\theta,\\quad u_y=u\\sin\\theta"],["Horizontal travel","x=u_xt"]],
        examples: [
          ex("A ball launches at 20 m/s and 30° above horizontal. Initial upward speed in m/s?", [
            ["Use sine for the vertical component.", ""],
            ["Substitute the given values and calculate.", "20\\sin30^\\circ \\approx 10\\,\\mathrm{m/s}"],
          ], "10 m/s"),
          ex("A projectile has horizontal speed 8 m/s. Horizontal distance after 2 s in m?", [
            ["Horizontal speed stays constant.", ""],
            ["Substitute the given values and calculate.", "8\\times2 = 16\\,\\mathrm{m}"],
          ], "16 m"),
        ],
        practice: [
          pr("A projectile has horizontal speed 6 m/s. Horizontal distance in 3 s, in m?", 18, "Multiply horizontal speed by time.", "6×3 = 18 m."),
          pr("A ball launches at 10 m/s and 60°. Horizontal component in m/s?", 5.000000000000001, "Use cosine for the horizontal component.", "10cos 60° ≈ 5 m/s."),
          pr("A ball launches at 20 m/s and 45°. Horizontal component in m/s?", 14.142135623730951, "Resolve the launch velocity.", "20cos 45° ≈ 14.14214 m/s."),
          pr("A projectile launches with horizontal speed 12 m/s. At its highest point, what is its horizontal speed in m/s? Ignore air.", 12, "There is no horizontal acceleration.", "12 = 12 m/s."),
        ],
      },
      {
        title: "Climbing and falling",
        minutes: 25,
        explain: [
          "Choose upward as positive and the launch point as zero height. Then vertical velocity is u_y − gt and height is u_y t − gt²/2. The negative term represents gravity pulling the path downward.",
          "At the highest point the vertical velocity is zero, but acceleration is still downward. Set the vertical velocity to zero to find the time to the top. Use that time in the height relation, or use u_y²/(2g).",
        ],
        formulas: [["Vertical motion","v_y=u_y-gt,\\quad y=u_yt-\\tfrac12gt^2"],["Top of flight","t_{\\text{top}}=u_y/g,\\quad h=u_y^2/(2g)"]],
        examples: [
          ex("A projectile starts with upward speed 9.81 m/s. Time to its highest point in s, using g = 9.81 m/s²?", [
            ["At the top, gravity has removed the initial upward speed.", ""],
            ["Substitute the given values and calculate.", "9.81\\div9.81 = 1\\,\\mathrm{s}"],
          ], "1 s"),
          ex("A ball starts with upward speed 19.62 m/s. Maximum rise in m, using g = 9.81 m/s²?", [
            ["Square the starting vertical speed.", "u_y^2=19.62^2\\approx384.9444\\,\\mathrm{m^{2}/s^{2}}"],
            ["Calculate twice the gravitational acceleration.", "2g=2\\times9.81=19.62\\,\\mathrm{m/s^{2}}"],
            ["Divide to get the maximum rise.", "h=384.9444/19.62\\approx19.62\\,\\mathrm{m}"],
          ], "19.62 m"),
        ],
        practice: [
          pr("Initial upward speed is 15 m/s. Vertical velocity after 1 s in m/s, with g = 9.81 m/s²?", 5.1899999999999995, "Subtract gravity times elapsed time.", "15-9.81 ≈ 5.19 m/s."),
          pr("Initial upward speed is 10 m/s. Height after 1 s in m, with g = 9.81 m/s²?", 5.095, "Subtract the gravitational fall from the upward travel.", "10-0.5×9.81 = 5.095 m."),
          pr("A projectile has upward speed 5 m/s initially. Vertical velocity after 1 s in m/s, upward positive, with g = 9.81 m/s²?", -4.8100000000000005, "A negative result means downward motion.", "5-9.81 ≈ -4.81 m/s."),
          pr("A projectile launches at 20 m/s and 30°. Maximum rise in m, with g = 9.81 m/s²?", 5.096839959225279, "Find the vertical component before finding the rise.", "(20sin 30°)^2÷(2×9.81) ≈ 5.09684 m."),
        ],
      },
      {
        title: "Range on level ground",
        minutes: 25,
        explain: [
          "If landing height equals launch height, the downward trip takes as long as the upward trip. Flight time is twice the time to the top. Range is horizontal speed multiplied by this flight time.",
          "At fixed launch speed the greatest level-ground range occurs at 45°. Angles adding to a right angle have the same range. These statements assume no air resistance; a higher or lower landing surface changes the answer.",
        ],
        formulas: [["Level-ground flight","T=2u\\sin\\theta/g"],["Range","R=u^2\\sin(2\\theta)/g"]],
        examples: [
          ex("A ball launches at 20 m/s and 45° onto level ground. Range in m, with g = 9.81 m/s² and no air?", [
            ["At this angle, sine of twice the angle is one.", ""],
            ["Substitute the given values and calculate.", "20^2\\div9.81 \\approx 40.77472\\,\\mathrm{m}"],
          ], "40.77472 m"),
          ex("A level-ground launch has initial upward speed 9.81 m/s. Flight time in s, with g = 9.81 m/s²?", [
            ["Double the time needed to reach the top.", ""],
            ["Substitute the given values and calculate.", "2\\times9.81\\div9.81 = 2\\,\\mathrm{s}"],
          ], "2 s"),
        ],
        practice: [
          pr("A projectile stays airborne for 3 s with horizontal speed 5 m/s. Range in m?", 15, "Multiply sideways speed by flight time.", "5×3 = 15 m."),
          pr("A level-ground launch has initial upward speed 4.905 m/s. Flight time in s, with g = 9.81 m/s²?", 1, "Use twice the upward travel time.", "2×4.905÷9.81 = 1 s."),
          pr("A ball launches at 10 m/s and 30° onto level ground. Range in m, with g = 9.81 m/s² and no air?", 8.827985767425469, "Use sine of twice the launch angle.", "10^2sin 60°÷9.81 ≈ 8.827986 m."),
          pr("On level ground with no air, doubling launch speed at the same angle changes range by what factor?", 4, "Range depends on the square of launch speed.", "2^2 = 4."),
        ],
      },
      {
        title: "Leaving a raised conveyor",
        minutes: 25,
        explain: [
          "A sample leaving a horizontal conveyor has no initial vertical velocity. Its fall time depends on the height, while its sideways travel depends on the conveyor speed. Solve the fall first, then the horizontal motion.",
          "This helps estimate where a material sample lands during a controlled drop test. Treat the sample as a small object and neglect air. A rotating or irregular fragment in a real workshop may not follow this ideal path.",
        ],
        formulas: [["Horizontal release","t=\\sqrt{2h/g},\\quad x=u_xt"],["Impact speed","v=\\sqrt{u_x^2+(gt)^2}"]],
        examples: [
          ex("A sample leaves a horizontal belt 4.905 m above the floor. Fall time in s, using g = 9.81 m/s² and no air?", [
            ["Use free fall from rest in the vertical direction.", ""],
            ["Substitute the given values and calculate.", "\\sqrt{2\\times4.905\\div9.81} = 1\\,\\mathrm{s}"],
          ], "1 s"),
          ex("A sample leaves horizontally at 3 m/s from height 4.905 m. Horizontal travel in m, using g = 9.81 m/s² and no air?", [
            ["Find the fall time from vertical motion.", "t=\\sqrt{2\\times4.905/9.81}=1\\,\\mathrm{s}"],
            ["Multiply the horizontal speed by that time.", "x=3\\times1=3\\,\\mathrm{m}"],
          ], "3 m"),
        ],
        practice: [
          pr("A horizontally released sample falls for 2 s at sideways speed 4 m/s. Horizontal travel in m?", 8, "Horizontal motion is steady.", "4×2 = 8 m."),
          pr("A horizontally released sample falls for 0.5 s. Downward speed in m/s, with g = 9.81 m/s²?", 4.905, "Its initial vertical speed is zero.", "9.81×0.5 = 4.905 m/s."),
          pr("A sample leaves horizontally from height 19.62 m at 2 m/s. Horizontal travel in m, with g = 9.81 m/s² and no air?", 4, "Solve vertical motion before horizontal travel.", "2√(2×19.62÷9.81) = 4 m."),
          pr("A projectile hits with perpendicular velocity components 3 m/s sideways and 4 m/s downward. Impact speed in m/s?", 5, "Combine perpendicular components using Pythagoras.", "√(3^2+4^2) = 5 m/s."),
        ],
      },
    ],
  },
  'phys-008': {
    predict: {
      "q": "A 2 kg cart moves right at 1 m/s. A 1 kg cart moves left at 2 m/s. With no outside horizontal force, they stick together. What follows?",
      "options": [
        "They move right",
        "They stop together",
        "They move left",
        "They bounce apart"
      ],
      "answer": 1,
      "reveal": "Their momenta are equal and opposite, so the combined momentum is zero. They stop together while their movement energy becomes deformation and thermal energy."
    },
    parts: [
      {
        title: "Momentum includes direction",
        minutes: 20,
        explain: [
          "Momentum is mass times velocity. It measures motion with a direction, so choose right as positive and left as negative. Two moving objects can have zero combined momentum.",
          "Kinetic energy has no direction and is never negative. Momentum can cancel even when kinetic energy remains positive. This distinction matters when a materials test uses two moving impactors.",
        ],
        formulas: [["Momentum","p=mv"],["Total","p_{\\text{total}}=m_1u_1+m_2u_2"]],
        examples: [
          ex("A 3 kg cart moves right at 2 m/s. Momentum in kg·m/s, right positive?", [
            ["Multiply mass by signed velocity.", ""],
            ["Substitute the given values and calculate.", "3\\times2 = 6\\,\\mathrm{kg\\cdot m/s}"],
          ], "6 kg·m/s"),
          ex("A 2 kg cart moves left at 3 m/s. Momentum in kg·m/s, right positive?", [
            ["Use a negative velocity for leftward motion.", ""],
            ["Substitute the given values and calculate.", "2\\times(-3) = -6\\,\\mathrm{kg\\cdot m/s}"],
          ], "-6 kg·m/s"),
        ],
        practice: [
          pr("A 4 kg cart moves right at 1 m/s. Momentum in kg·m/s?", 4, "Mass times velocity gives momentum.", "4×1 = 4 kg·m/s."),
          pr("A 2 kg cart has rightward momentum 10 kg·m/s. Velocity in m/s?", 5, "Divide momentum by mass.", "10÷2 = 5 m/s."),
          pr("Two carts have momenta +6 and −4 kg·m/s. Total momentum in kg·m/s?", 2, "Add with signs.", "6-4 = 2 kg·m/s."),
          pr("A 3 kg cart moves right at 2 m/s and a 2 kg cart left at 3 m/s. Total momentum in kg·m/s, right positive?", 0, "Calculate each signed momentum before adding.", "3×2+2×(-3) = 0 kg·m/s.", { tol: 0.000001 }),
        ],
      },
      {
        title: "Impulse changes momentum",
        minutes: 25,
        explain: [
          "Impulse measures a force acting over time. For a constant or average force, impulse is force times contact time. It equals the change in momentum, and its units N·s equal kg·m/s.",
          "For the same momentum change, a longer stopping time reduces the average force. Padding and deformable impact absorbers use this idea. Peak force may still be higher than the average.",
        ],
        formulas: [["Impulse","J=F_{\\text{avg}}\\Delta t=\\Delta p"]],
        examples: [
          ex("A 40 N average force acts for 0.5 s. Impulse magnitude in N·s?", [
            ["Multiply average force by contact time.", ""],
            ["Substitute the given values and calculate.", "40\\times0.5 = 20\\,\\mathrm{N\\cdot s}"],
          ], "20 N·s"),
          ex("A 2 kg cart slows from +6 m/s to rest in 0.3 s. Average force in N, right positive?", [
            ["Calculate the initial momentum.", "p_i=2\\times6=12\\,\\mathrm{kg\\cdot m/s}"],
            ["Subtract initial momentum from the zero final momentum.", "\\Delta p=0-12=-12\\,\\mathrm{kg\\cdot m/s}"],
            ["Divide by the stopping time.", "F_{\\text{avg}}=-12/0.3=-40\\,\\mathrm{N}"],
          ], "-40 N"),
        ],
        practice: [
          pr("An average force of 10 N acts for 2 s. Impulse in N·s?", 20, "Use force times time.", "10×2 = 20 N·s."),
          pr("Momentum changes by +12 kg·m/s in 3 s. Average force in N?", 4, "Divide momentum change by elapsed time.", "12÷3 = 4 N."),
          pr("A 1 kg ball reverses from +3 to −3 m/s. Impulse in N·s?", -6, "Final momentum minus initial momentum.", "1×(-3-3) = -6 N·s."),
          pr("An absorber stops a cart with momentum 20 kg·m/s in 0.4 s. Average stopping-force magnitude in N?", 50, "Use the size of the momentum change.", "20÷0.4 = 50 N."),
        ],
      },
      {
        title: "Sticking together",
        minutes: 25,
        explain: [
          "During a collision, each object pushes on the other. For the pair, these internal impulses cancel. If the outside impulse is negligible, combined momentum is the same before and after.",
          "When objects stick, they share one final velocity. Divide the total starting momentum by the combined mass. Kinetic energy generally falls because some energy becomes heat, sound and permanent deformation.",
        ],
        formulas: [["Sticky collision","v=(m_1u_1+m_2u_2)/(m_1+m_2)"]],
        examples: [
          ex("A 2 kg cart at +4 m/s sticks to a stationary 2 kg cart. Final velocity in m/s? Ignore outside impulse.", [
            ["Add initial momenta.", "p_i=2\\times4+2\\times0=8\\,\\mathrm{kg\\cdot m/s}"],
            ["Add the masses that now move together.", "m=2+2=4\\,\\mathrm{kg}"],
            ["Divide momentum by total mass.", "v=8/4=2\\,\\mathrm{m/s}"],
          ], "2 m/s"),
          ex("A 3 kg cart at +2 m/s sticks to a 1 kg cart at −2 m/s. Final velocity in m/s? Ignore outside impulse.", [
            ["Add the signed initial momenta.", "p_i=3\\times2+1\\times(-2)=4\\,\\mathrm{kg\\cdot m/s}"],
            ["Add the two masses.", "m=3+1=4\\,\\mathrm{kg}"],
            ["Divide total momentum by total mass.", "v=4/4=1\\,\\mathrm{m/s}"],
          ], "1 m/s"),
        ],
        practice: [
          pr("Two 1 kg carts at +2 and 0 m/s stick. Final velocity in m/s? Ignore outside impulse.", 1, "The final mass includes both carts.", "(1×2)÷2 = 1 m/s."),
          pr("A 2 kg cart at +1 m/s sticks to 1 kg at −2 m/s. Final velocity in m/s? Ignore outside impulse.", 0, "Compare the opposing momenta.", "(2×1-1×2)÷3 = 0 m/s.", { tol: 0.000001 }),
          pr("A 1 kg cart at +2 m/s sticks to 3 kg at rest. Final velocity in m/s? Ignore outside impulse.", 0.5, "Divide the incoming momentum by the combined mass.", "2÷4 = 0.5 m/s."),
          pr("A 2 kg cart at 4 m/s sticks to an identical stationary cart. Kinetic energy lost in J? Ignore outside impulse.", 8, "Find the shared final speed from momentum, then compare kinetic energies.", "0.5×2×4^2-0.5×4×2^2 = 8 J."),
        ],
      },
      {
        title: "Bouncing and impact absorption",
        minutes: 25,
        explain: [
          "An elastic collision conserves both momentum and kinetic energy. For equal masses in a straight-line elastic collision, the velocities swap. A stationary target leaves at the incoming speed while the incoming object stops.",
          "Real materials can rebound while still losing some kinetic energy. The coefficient of restitution e compares separation speed with approach speed along the collision line. It is one for an ideal elastic collision and zero when there is no relative rebound.",
        ],
        formulas: [["Restitution","e=(v_2-v_1)/(u_1-u_2)"],["Energy absorbed","E_{\\text{absorbed}}=K_i-K_f"]],
        examples: [
          ex("Equal-mass carts collide elastically in a line. Their initial velocities are +3 and 0 m/s. Final velocity of the second cart in m/s? Ignore outside impulse.", [
            ["Equal masses exchange velocities in an elastic collision.", ""],
            ["Substitute the given values and calculate.", "3 = 3\\,\\mathrm{m/s}"],
          ], "3 m/s"),
          ex("Approach speed is 4 m/s and separation speed is 2 m/s. Restitution e?", [
            ["Divide separation speed by approach speed.", ""],
            ["Substitute the given values and calculate.", "2\\div4 = 0.5"],
          ], "0.5"),
        ],
        practice: [
          pr("An impact begins with 20 J and leaves 12 J of kinetic energy. Energy absorbed in J?", 8, "Compare kinetic energies before and after.", "20-12 = 8 J."),
          pr("Approach speed is 5 m/s and separation speed is 5 m/s. Restitution e?", 1, "Use the speed ratio.", "5÷5 = 1."),
          pr("Equal masses collide elastically with initial velocities +2 and −1 m/s. Final velocity of the first cart in m/s? Ignore outside impulse.", -1, "Swap the two initial velocities.", "-1 = -1 m/s."),
          pr("A 1 kg ball hits a rigid stationary wall at 4 m/s and rebounds at 2 m/s. Loss of kinetic energy in J?", 6, "Subtract final kinetic energy from initial kinetic energy.", "0.5×(4^2-2^2) = 6 J."),
        ],
      },
    ],
  },
  'phys-009': {
    predict: {
      "q": "A solid ball, a solid disc and a hoop have equal mass and radius. Released together, they roll without slipping down the same ramp. Ignore energy losses. Who arrives first?",
      "options": [
        "The hoop",
        "The disc",
        "All arrive together",
        "The solid ball"
      ],
      "answer": 3,
      "reveal": "The solid ball puts the smallest share of its energy into spinning. More becomes forward motion, so it reaches the bottom first."
    },
    parts: [
      {
        title: "Turning with a force",
        minutes: 20,
        explain: [
          "Torque is the turning effect of a force about a chosen axis. It depends on force and the perpendicular distance from the axis to the force’s line of action. A longer wrench gives more torque for the same perpendicular push.",
          "In τ = rF sin θ, r is the distance from pivot to the point of application and θ is the angle between that radius and the force. A force pointing straight through the pivot has zero torque.",
        ],
        formulas: [["Torque magnitude","\\tau=rF\\sin\\theta"]],
        examples: [
          ex("A 20 N force acts at right angles to a 0.3 m wrench. Torque magnitude in N·m?", [
            ["A perpendicular push has sine equal to one.", ""],
            ["Substitute the given values and calculate.", "0.3\\times20 = 6\\,\\mathrm{N\\cdot m}"],
          ], "6 N·m"),
          ex("A 40 N force acts 30° to a 0.5 m radius. Torque magnitude in N·m?", [
            ["Include the sine of the angle.", ""],
            ["Substitute the given values and calculate.", "0.5\\times40\\sin30^\\circ \\approx 10\\,\\mathrm{N\\cdot m}"],
          ], "10 N·m"),
        ],
        practice: [
          pr("A 10 N perpendicular force acts 0.2 m from an axis. Torque in N·m?", 2, "Multiply force by its perpendicular arm.", "10×0.2 = 2 N·m."),
          pr("A torque of 12 N·m is needed with a 0.4 m wrench. Perpendicular force in N?", 30, "Divide required torque by arm length.", "12÷0.4 = 30 N."),
          pr("A 50 N force points along a wrench directly towards the pivot. Torque magnitude in N·m?", 0, "The force’s line passes through the pivot.", "0.5×50sin 0 = 0 N·m.", { tol: 0.000001 }),
          pr("A press lever has clockwise torque 18 N·m and anticlockwise torque 6 N·m. Net clockwise torque in N·m?", 12, "Opposite turning effects subtract.", "18-6 = 12 N·m."),
        ],
      },
      {
        title: "Where the mass sits",
        minutes: 25,
        explain: [
          "Moment of inertia I measures resistance to angular acceleration about an axis. For small masses, add each mass times its distance from the axis squared. Moving the same mass outward makes spinning harder.",
          "For a thin hoop about its centre I = mR². A uniform solid disc has I = mR²/2 and a uniform solid sphere has I = 2mR²/5. These values refer to their central symmetry axes.",
        ],
        formulas: [["Separated masses","I=\\sum mr^2"],["Hoop, disc, sphere","I=mR^2,\\quad \\tfrac12mR^2,\\quad \\tfrac25mR^2"]],
        examples: [
          ex("A small 2 kg mass is 0.5 m from an axis. Moment of inertia in kg·m²?", [
            ["Square the distance before multiplying by mass.", ""],
            ["Substitute the given values and calculate.", "2\\times0.5^2 = 0.5\\,\\mathrm{kg\\cdot m^{2}}"],
          ], "0.5 kg·m²"),
          ex("A uniform solid disc has mass 4 kg and radius 0.2 m. Central moment of inertia in kg·m²?", [
            ["Use half the mass times radius squared.", ""],
            ["Substitute the given values and calculate.", "0.5\\times4\\times0.2^2 \\approx 0.08\\,\\mathrm{kg\\cdot m^{2}}"],
          ], "0.08 kg·m²"),
        ],
        practice: [
          pr("A small 1 kg mass sits 2 m from an axis. I in kg·m²?", 4, "Distance enters squared.", "1×2^2 = 4 kg·m²."),
          pr("A thin hoop has mass 2 kg and radius 0.5 m. Central I in kg·m²?", 0.5, "Use the hoop relation.", "2×0.5^2 = 0.5 kg·m²."),
          pr("A uniform solid sphere has mass 5 kg and radius 0.1 m. Central I in kg·m²?", 0.020000000000000004, "Use the solid-sphere factor.", "(2/5)×5×0.1^2 ≈ 0.02 kg·m²."),
          pr("Two small 1 kg masses are each 0.3 m from an axis on a light rod. Total I in kg·m²?", 0.18, "Add the two contributions.", "2×1×0.3^2 = 0.18 kg·m²."),
        ],
      },
      {
        title: "Angular motion and energy",
        minutes: 25,
        explain: [
          "Angular speed ω measures angle swept per second, in radians per second. Angular acceleration α measures its rate of change. For a rigid object turning about a fixed axis, net torque equals Iα.",
          "Rotational kinetic energy is Iω²/2. A flywheel stores energy in spinning, while a roller carries both rotational and forward energy. With no outside torque about an axis, angular momentum Iω stays constant.",
        ],
        formulas: [["Angular acceleration","\\tau_{\\text{net}}=I\\alpha"],["Spin energy","K_{\\text{rot}}=\\tfrac12I\\omega^2"],["Angular momentum","L=I\\omega"]],
        examples: [
          ex("A rotor has I = 0.5 kg·m² and net torque 2 N·m. Angular acceleration in rad/s²?", [
            ["Divide net torque by moment of inertia.", ""],
            ["Substitute the given values and calculate.", "2\\div0.5 = 4\\,\\mathrm{rad/s^{2}}"],
          ], "4 rad/s²"),
          ex("A flywheel has I = 2 kg·m² and angular speed 3 rad/s. Spin energy in J?", [
            ["Use half the inertia times angular speed squared.", ""],
            ["Substitute the given values and calculate.", "0.5\\times2\\times3^2 = 9\\,\\mathrm{J}"],
          ], "9 J"),
        ],
        practice: [
          pr("A rotor has I = 2 kg·m² and net torque 6 N·m. Angular acceleration in rad/s²?", 3, "Apply the rotational form of Newton’s law.", "6÷2 = 3 rad/s²."),
          pr("A rotor has I = 0.4 kg·m² and ω = 5 rad/s. Angular momentum in kg·m²/s?", 2, "Multiply inertia by angular speed.", "0.4×5 = 2 kg·m²/s."),
          pr("With zero outside torque, I falls from 4 to 2 kg·m². Initial ω is 3 rad/s. Final ω in rad/s?", 6, "Keep the product Iω unchanged.", "4×3÷2 = 6 rad/s."),
          pr("A roller has forward kinetic energy 12 J, I = 0.2 kg·m² and ω = 10 rad/s. Total kinetic energy in J?", 22, "Add forward energy and spin energy.", "12+0.5×0.2×10^2 = 22 J."),
        ],
      },
      {
        title: "Rolling down the ramp",
        minutes: 25,
        explain: [
          "Rolling without slipping links forward speed v to spin through v = ωR. As an object descends, height energy supplies both forms of kinetic energy. The shape factor I/(mR²) determines their division.",
          "For rigid shapes rolling from rest on the same uniform slope, acceleration is g sin θ divided by one plus the shape factor. Assume enough static friction to prevent slipping and no energy loss. Mass and radius cancel, so changing them alone does not change the race order.",
        ],
        formulas: [["Rolling acceleration","a=g\\sin\\theta/[1+I/(mR^2)]"],["From rest over length s","t=\\sqrt{2s/a}"]],
        examples: [
          ex("A hoop rolls without slipping down a 30° slope. Acceleration in m/s² with g = 9.81 m/s²?", [
            ["A hoop has shape factor one.", ""],
            ["Substitute the given values and calculate.", "9.81\\times0.5\\div(1+1) = 2.4525\\,\\mathrm{m/s^{2}}"],
          ], "2.4525 m/s²"),
          ex("A solid ball rolls from rest down 2 m of a 30° ramp. Time in s with g = 9.81 m/s² and no losses?", [
            ["Find acceleration using the solid-ball shape factor.", "a=9.81\\sin30^\\circ/(1+0.4)\\approx3.503571\\,\\mathrm{m/s^{2}}"],
            ["Solve the distance relation for time.", "s=\\tfrac12at^2\\quad\\Rightarrow\\quad t=\\sqrt{2s/a}"],
            ["Use the ramp length and the unrounded acceleration.", "t=\\sqrt{4/(9.81\\times0.5/1.4)}\\approx1.0685\\,\\mathrm{s}"],
          ], "1.0685 s"),
        ],
        practice: [
          pr("A rolling wheel has radius 0.2 m and ω = 5 rad/s. Forward speed in m/s without slipping?", 1, "Use forward speed equals angular speed times radius.", "0.2×5 = 1 m/s."),
          pr("A solid disc rolls down a 30° slope. Acceleration in m/s² with g = 9.81 m/s² and no slipping?", 3.27, "A solid disc has shape factor one half.", "9.81×0.5÷1.5 = 3.27 m/s²."),
          pr("A solid ball rolls down a 30° slope. Acceleration in m/s² with g = 9.81 m/s² and no slipping?", 3.503571428571429, "A solid ball has shape factor two fifths.", "9.81×0.5÷1.4 ≈ 3.503571 m/s²."),
          pr("A hoop rolls from rest down 2 m of a 30° slope. Travel time in s with g = 9.81 m/s² and no losses?", 1.277101713628202, "Find the hoop acceleration and use distance equals half acceleration times time squared.", "√(4×2÷(9.81×0.5)) ≈ 1.277102 s."),
        ],
      },
    ],
  },
  'phys-010': {
    predict: {
      "q": "On the ideal spring animation, you double the pull-down distance while keeping mass and stiffness fixed. How does the time for one full bounce change?",
      "options": [
        "It doubles",
        "It stays the same",
        "It halves",
        "It becomes four times longer"
      ],
      "answer": 1,
      "reveal": "A larger displacement brings a proportionally larger restoring force. The mass travels farther but also moves faster, leaving the period unchanged for an ideal linear spring."
    },
    parts: [
      {
        title: "A spring pulls towards balance",
        minutes: 20,
        explain: [
          "A spring has an equilibrium position where the net force is zero. Measure displacement x from that position and choose a positive direction. An ideal linear spring gives a restoring force proportional to displacement and opposite in direction.",
          "Stiffness k is measured in N/m. For a vertical spring, the weight causes an initial static stretch. Motion measured from that loaded equilibrium still follows the same restoring-force relation. Stay within the elastic range.",
        ],
        formulas: [["Restoring force about equilibrium","F_{\\text{net}}=-kx"],["Static vertical extension","x_0=mg/k"]],
        examples: [
          ex("An ideal spring has k = 100 N/m and x = +0.02 m from equilibrium. Restoring force in N?", [
            ["The force points opposite to displacement.", ""],
            ["Substitute the given values and calculate.", "-100\\times0.02 = -2\\,\\mathrm{N}"],
          ], "-2 N"),
          ex("A 1 kg mass hangs at rest from a vertical spring with k = 98 N/m. Static extension in m with g = 9.8 m/s²?", [
            ["At rest the spring force balances weight.", ""],
            ["Substitute the given values and calculate.", "1\\times9.8\\div98 = 0.1\\,\\mathrm{m}"],
          ], "0.1 m"),
        ],
        practice: [
          pr("A spring has k = 40 N/m and x = +0.1 m. Restoring force in N?", -4, "Use the negative restoring sign.", "-40×0.1 = -4 N."),
          pr("A spring force has magnitude 6 N at extension 0.03 m. Stiffness in N/m?", 200, "Divide force magnitude by extension.", "6÷0.03 = 200 N/m."),
          pr("A spring has k = 50 N/m and x = −0.04 m. Restoring force in N?", 2, "A negative displacement gives a positive force.", "-50×(-0.04) = 2 N."),
          pr("A 2 kg mass hangs at rest from a 196 N/m vertical spring. Static extension in m with g = 9.8 m/s²?", 0.1, "Balance weight with the spring force.", "2×9.8÷196 = 0.1 m."),
        ],
      },
      {
        title: "Timing a full oscillation",
        minutes: 25,
        explain: [
          "One oscillation returns the mass to the same position moving in the same direction. The time for this is the period T. Frequency f counts full oscillations each second, so f = 1/T.",
          "An ideal mass and spring have period 2π√(m/k). More mass slows the motion; more stiffness speeds it up. Amplitude, the largest displacement from equilibrium, does not appear. Assume the spring’s own mass and damping are negligible.",
        ],
        formulas: [["Period","T=2\\pi\\sqrt{m/k}"],["Frequency","f=1/T"]],
        examples: [
          ex("A 1 kg mass oscillates on a 40 N/m ideal spring. Period in s?", [
            ["Take the square root of mass divided by stiffness.", "\\sqrt{m/k}=\\sqrt{1/40}\\approx0.1581139\\,\\mathrm{s}"],
            ["Multiply by a full turn in radians.", "T=2\\pi\\sqrt{1/40}\\approx0.9934588\\,\\mathrm{s}"],
          ], "0.9934588 s"),
          ex("A mass makes 10 full oscillations in 5 s. Frequency in Hz?", [
            ["Divide the count by the elapsed time.", ""],
            ["Substitute the given values and calculate.", "10\\div5 = 2\\,\\mathrm{Hz}"],
          ], "2 Hz"),
        ],
        practice: [
          pr("An oscillator has period 0.5 s. Frequency in Hz?", 2, "Take the reciprocal of period.", "1÷0.5 = 2 Hz."),
          pr("An ideal oscillator’s mass becomes four times larger at fixed stiffness. Period changes by what factor?", 2, "Period depends on the square root of mass.", "√4 = 2."),
          pr("An ideal oscillator’s stiffness becomes four times larger at fixed mass. Period changes by what factor?", 0.5, "Stiffness is beneath the square root in the denominator.", "1÷√4 = 0.5."),
          pr("For an ideal 1 kg oscillator, what stiffness gives period 1 s, in N/m?", 39.47841760435743, "Square the period relation and solve for stiffness.", "4π^2 ≈ 39.47842 N/m."),
        ],
      },
      {
        title: "Reading the motion through a cycle",
        minutes: 25,
        explain: [
          "When released from its greatest displacement A, an ideal oscillator follows x = A cos(ωt). Angular frequency ω = √(k/m) counts how fast the phase angle changes in radians per second.",
          "At an end point the speed is zero and acceleration is greatest towards equilibrium. At equilibrium the acceleration is zero and speed is greatest. The position-time trace repeats, so equal positions can occur with opposite directions of travel.",
        ],
        formulas: [["Position","x=A\\cos(\\omega t),\\quad \\omega=\\sqrt{k/m}"],["Acceleration","a=-\\omega^2x"]],
        examples: [
          ex("An oscillator has k = 16 N/m and m = 1 kg. Angular frequency in rad/s?", [
            ["Take the square root of stiffness divided by mass.", ""],
            ["Substitute the given values and calculate.", "\\sqrt{16/1} = 4\\,\\mathrm{rad/s}"],
          ], "4 rad/s"),
          ex("An oscillator has ω = 4 rad/s and x = +0.05 m. Acceleration in m/s²?", [
            ["Acceleration points towards equilibrium.", ""],
            ["Substitute the given values and calculate.", "-4^2\\times0.05 = -0.8\\,\\mathrm{m/s^{2}}"],
          ], "-0.8 m/s²"),
        ],
        practice: [
          pr("Released from x = +0.2 m, an ideal oscillator has what position after one full period, in m?", 0.2, "One period returns it to its starting phase.", "0.2cos (2π) = 0.2 m."),
          pr("Released from x = +0.2 m, an ideal oscillator has what position after half a period, in m?", -0.2, "Half a period reaches the opposite end.", "0.2cos π = -0.2 m."),
          pr("An oscillator has ω = 5 rad/s and x = −0.04 m. Acceleration in m/s²?", 1, "Keep the sign of displacement.", "-5^2×(-0.04) = 1 m/s²."),
          pr("An ideal oscillator has m = 2 kg, k = 50 N/m and amplitude 0.1 m. Maximum acceleration magnitude in m/s²?", 2.5, "Use acceleration magnitude at the greatest displacement.", "50÷2×0.1 = 2.5 m/s²."),
        ],
      },
      {
        title: "Stored energy, damping and resonance",
        minutes: 25,
        explain: [
          "A stretched linear spring stores energy kx²/2. In an ideal oscillator the total energy is kA²/2. It trades between spring energy and kinetic energy, giving maximum speed A√(k/m).",
          "Damping transfers mechanical energy to thermal energy and reduces the amplitude. A repeated driving force can build large motion near the natural frequency: resonance. Materials in mounts can absorb vibration; stiffness and mass set the natural frequency before damping alters the response.",
        ],
        formulas: [["Total oscillation energy","E=\\tfrac12kA^2"],["Maximum speed","v_{\\max}=A\\sqrt{k/m}"],["Energy ratio","E_2/E_1=(A_2/A_1)^2"]],
        examples: [
          ex("An ideal spring has k = 100 N/m and amplitude 0.2 m. Total energy in J?", [
            ["Square the amplitude before multiplying.", ""],
            ["Substitute the given values and calculate.", "0.5\\times100\\times0.2^2 \\approx 2\\,\\mathrm{J}"],
          ], "2 J"),
          ex("An ideal oscillator has A = 0.1 m, k = 100 N/m and m = 1 kg. Maximum speed in m/s?", [
            ["Multiply amplitude by angular frequency.", ""],
            ["Substitute the given values and calculate.", "0.1\\sqrt{100/1} = 1\\,\\mathrm{m/s}"],
          ], "1 m/s"),
        ],
        practice: [
          pr("A spring has k = 20 N/m and extension 0.1 m. Stored energy in J?", 0.10000000000000002, "Use half the stiffness times extension squared.", "0.5×20×0.1^2 ≈ 0.1 J."),
          pr("At fixed stiffness, amplitude doubles. Total energy changes by what factor?", 4, "Energy scales with amplitude squared.", "2^2 = 4."),
          pr("Damping reduces an oscillator’s amplitude to half while stiffness stays fixed. Remaining energy as a fraction of the initial energy?", 0.25, "Square the amplitude fraction.", "0.5^2 = 0.25."),
          pr("A vibrating mount starts with 8 J and later has 2 J of mechanical energy. Energy transferred to heat in J?", 6, "Subtract the remaining mechanical energy.", "8-2 = 6 J."),
        ],
      },
    ],
  },
  'phys-011': {
    predict: {
      "q": "On a string fixed at both ends, you want four still points, counting both ends. Which harmonic should you choose?",
      "options": [
        "The third harmonic",
        "The first harmonic",
        "The fourth harmonic",
        "The fifth harmonic"
      ],
      "answer": 0,
      "reveal": "The third harmonic has three moving loops separated and bounded by four nodes. Counting the fixed ends is the easy detail to miss."
    },
    parts: [
      {
        title: "What travels in a wave",
        minutes: 20,
        explain: [
          "A wave carries a disturbance and energy from place to place. A point on a string moves up and down while the pattern moves along the string. The material does not need to travel with the wave.",
          "Wavelength λ is the distance between neighbouring crests. Frequency f is the number of cycles per second. The wave moves one wavelength per period, so its speed is frequency times wavelength. Sound in a material is a travelling compression rather than a sideways string movement.",
        ],
        formulas: [["Wave speed","v=f\\lambda"],["Period","T=1/f"]],
        examples: [
          ex("A wave has f = 5 Hz and wavelength 2 m. Speed in m/s?", [
            ["Multiply cycles per second by metres per cycle.", ""],
            ["Substitute the given values and calculate.", "5\\times2 = 10\\,\\mathrm{m/s}"],
          ], "10 m/s"),
          ex("Sound travels at 343 m/s in air with f = 686 Hz. Wavelength in m?", [
            ["Rearrange wave speed equals frequency times wavelength.", "\\lambda=v/f"],
            ["Divide sound speed by frequency.", "\\lambda=343/686=0.5\\,\\mathrm{m}"],
          ], "0.5 m"),
        ],
        practice: [
          pr("A wave has f = 4 Hz and wavelength 3 m. Speed in m/s?", 12, "Use frequency times wavelength.", "4×3 = 12 m/s."),
          pr("A wave has frequency 20 Hz. Period in s?", 0.05, "Take the reciprocal of frequency.", "1÷20 = 0.05 s."),
          pr("A wave travels at 100 m/s with wavelength 0.5 m. Frequency in Hz?", 200, "Divide wave speed by wavelength.", "100÷0.5 = 200 Hz."),
          pr("Use longitudinal sound speed 5900 m/s in steel. At frequency 2 MHz, wavelength in mm?", 2.9499999999999997, "Change megahertz to hertz, then metres to millimetres.", "5900÷(2×10^6)×1000 ≈ 2.95 mm."),
        ],
      },
      {
        title: "Adding waves",
        minutes: 20,
        explain: [
          "For small disturbances, two overlapping waves add their signed displacements. Two upward crests reinforce. An upward crest and an equal downward trough cancel at that place and instant.",
          "Cancellation of displacement at one point does not mean energy vanished. The waves continue through each other. Two equal waves travelling in opposite directions can form a standing pattern, with permanently still nodes and moving antinodes.",
        ],
        formulas: [["Superposition","y=y_1+y_2"],["Equal-wave antinode amplitude","A_{\\text{standing}}=2A"]],
        examples: [
          ex("Two waves give displacements +3 mm and +2 mm at one point. Result in mm?", [
            ["Add the signed displacements.", ""],
            ["Substitute the given values and calculate.", "3+2 = 5\\,\\mathrm{mm}"],
          ], "5 mm"),
          ex("Two waves give +4 mm and −4 mm. Result in mm?", [
            ["Equal and opposite displacements cancel.", ""],
            ["Substitute the given values and calculate.", "4-4 = 0\\,\\mathrm{mm}"],
          ], "0 mm"),
        ],
        practice: [
          pr("Two displacements are +2 mm and +5 mm. Sum in mm?", 7, "Add heights with signs.", "2+5 = 7 mm."),
          pr("Two displacements are +6 mm and −2 mm. Sum in mm?", 4, "A trough contributes negatively.", "6-2 = 4 mm."),
          pr("Two displacements are −3 mm and −4 mm. Sum in mm?", -7, "Both disturbances point downwards.", "-3-4 = -7 mm."),
          pr("Two equal opposite-travelling waves each have amplitude 2 mm. Standing-wave antinode amplitude in mm?", 4, "At an antinode the equal wave amplitudes reinforce.", "2×2 = 4 mm."),
        ],
      },
      {
        title: "Harmonics and still points",
        minutes: 25,
        explain: [
          "A string fixed at both ends must have a node at each end. Only whole numbers of half-wavelengths fit along its length L. That whole number n names the harmonic.",
          "The nth harmonic has n moving loops, n + 1 nodes including the ends, and wavelength 2L/n. Its frequency is n times the fundamental frequency. Keep tension and the string itself unchanged when comparing these harmonics.",
        ],
        formulas: [["Allowed wavelengths","\\lambda_n=2L/n"],["Harmonic frequencies","f_n=nv/(2L)"],["Node count","N=n+1"]],
        examples: [
          ex("A fixed-end string is 0.65 m long. Third-harmonic wavelength in m?", [
            ["Fit three half-wavelengths into the string.", ""],
            ["Substitute the given values and calculate.", "2\\times0.65\\div3 \\approx 0.4333333\\,\\mathrm{m}"],
          ], "0.4333333 m"),
          ex("A string’s fundamental is 110 Hz. Fourth-harmonic frequency in Hz?", [
            ["Multiply the fundamental by the harmonic number.", ""],
            ["Substitute the given values and calculate.", "4\\times110 = 440\\,\\mathrm{Hz}"],
          ], "440 Hz"),
        ],
        practice: [
          pr("How many nodes including both ends belong to the second harmonic?", 3, "There is one more node than moving loops.", "2+1 = 3."),
          pr("A string has four nodes including its ends. What is its harmonic number?", 3, "Subtract one from the number of nodes.", "4-1 = 3."),
          pr("A fixed-end string has length 1 m and wave speed 40 m/s. Fundamental frequency in Hz?", 20, "The fundamental wavelength is twice the length.", "40÷(2×1) = 20 Hz."),
          pr("A fixed-end string has length 0.5 m and wave speed 100 m/s. Third-harmonic frequency in Hz?", 300, "Use the harmonic number as well as the fundamental relation.", "3×100÷(2×0.5) = 300 Hz."),
        ],
      },
      {
        title: "Tension and material testing",
        minutes: 25,
        explain: [
          "A stretched string’s wave speed is √(F_T/μ), where F_T is tension and μ is mass per unit length. Greater tension makes waves faster; a heavier string at the same tension makes them slower.",
          "Sound pulses can also test solid materials. An ultrasonic pulse reflects from a boundary or flaw. If it goes to the back surface and returns, the travelled distance is twice the thickness. Use the sound speed appropriate to the material and wave type.",
        ],
        formulas: [["Stretched string","v=\\sqrt{F_T/\\mu}"],["Pulse echo thickness","d=vt/2"]],
        examples: [
          ex("A string has tension 100 N and mass per length 0.01 kg/m. Wave speed in m/s?", [
            ["Divide tension by mass per length, then take the square root.", ""],
            ["Substitute the given values and calculate.", "\\sqrt{100/0.01} = 100\\,\\mathrm{m/s}"],
          ], "100 m/s"),
          ex("A longitudinal pulse travels in steel at 5900 m/s. Its back-surface echo returns after 10 μs. Thickness in mm?", [
            ["Change microseconds to seconds.", "t=10\\times10^{-6}\\approx0.00001\\,\\mathrm{s}"],
            ["Find the round-trip distance.", "vt=5900\\times10^{-5}\\approx0.059\\,\\mathrm{m}"],
            ["Halve the distance and convert to millimetres.", "d=0.059/2\\times1000=29.5\\,\\mathrm{mm}"],
          ], "29.5 mm"),
        ],
        practice: [
          pr("A 2 m string has mass 0.02 kg. Mass per length in kg/m?", 0.01, "Divide mass by string length.", "0.02÷2 = 0.01 kg/m."),
          pr("A string has tension 36 N and mass per length 0.01 kg/m. Wave speed in m/s?", 60, "Use the string-speed relation.", "√(36/0.01) = 60 m/s."),
          pr("At fixed mass per length, tension rises by a factor of four. Wave speed changes by what factor?", 2, "Wave speed depends on the square root of tension.", "√4 = 2."),
          pr("A pulse moves at 5000 m/s through a 25 mm plate. Back-surface echo time in μs?", 10, "Use twice the thickness, then change seconds to microseconds.", "2×0.025÷5000×10^6 = 10 μs."),
        ],
      },
    ],
  },
  'phys-012': {
    predict: {
      "q": "The ice in the heating scene has reached 0 °C and is halfway melted. You add a little more heat at normal pressure. What changes first?",
      "options": [
        "Temperature rises above 0 °C",
        "The ice gets colder",
        "More ice melts at 0 °C",
        "The whole sample starts boiling"
      ],
      "answer": 2,
      "reveal": "While ice and water coexist in equilibrium, added heat melts more ice without raising the temperature. The temperature rises only after the ice has finished melting."
    },
    parts: [
      {
        title: "Heat, temperature and a common scale",
        minutes: 20,
        explain: [
          "Temperature describes thermal state: it helps predict which way heat will flow. Heat is energy transferred because of a temperature difference. A large warm bath can release more energy than a tiny much hotter chip.",
          "Heat flows spontaneously from higher to lower temperature until thermal equilibrium. Celsius and kelvin have equal-sized steps, but different zeros. Use T in kelvin = temperature in °C + 273.15; temperature differences have the same numerical size in either unit.",
        ],
        formulas: [["Temperature conversion","T(\\text{K})=\\theta({}^\\circ\\text{C})+273.15"],["Temperature change","\\Delta T=T_f-T_i"]],
        examples: [
          ex("A sample is at 25 °C. Temperature in K?", [
            ["Add the Celsius-to-kelvin offset.", ""],
            ["Substitute the given values and calculate.", "25+273.15 = 298.15\\,\\mathrm{K}"],
          ], "298.15 K"),
          ex("A casting cools from 200 to 80 °C. Signed temperature change in °C?", [
            ["Final minus initial gives a negative cooling change.", ""],
            ["Substitute the given values and calculate.", "80-200 = -120\\,\\mathrm{{}^\\circ C}"],
          ], "-120 °C"),
        ],
        practice: [
          pr("Ice water is at 0 °C. Temperature in K?", 273.15, "The Celsius zero is above absolute zero.", "0+273.15 = 273.15 K."),
          pr("A sample warms from 20 to 50 °C. Temperature rise in K?", 30, "A kelvin step equals a Celsius degree.", "50-20 = 30 K."),
          pr("A sample is at 300 K. Temperature in °C?", 26.850000000000023, "Subtract the offset for kelvin to Celsius.", "300-273.15 ≈ 26.85 °C."),
          pr("A hot sample cools from 100 °C to 40 °C. Magnitude of the temperature drop in K?", 60, "The question asks for a positive size of change.", "100-40 = 60 K."),
        ],
      },
      {
        title: "Heating and mixing",
        minutes: 25,
        explain: [
          "Without a phase change, transferred heat is mass times specific heat times temperature change. Specific heat depends on material and temperature; treat the stated value as constant over each problem.",
          "In an insulated mixture, heat lost by the hotter sample equals heat gained by the colder one. Both finish at the same temperature. Neglect the container’s heat capacity and assume neither substance changes phase or reacts.",
        ],
        formulas: [["Sensible heat","Q=mc\\Delta T"],["Insulated mixing","m_hc_h(T_h-T_f)=m_cc_c(T_f-T_c)"]],
        examples: [
          ex("Warm 1 kg of water from 20 to 30 °C with c = 4186 J/(kg·°C). Heat in J?", [
            ["Multiply mass, specific heat and temperature rise.", ""],
            ["Substitute the given values and calculate.", "1\\times4186\\times(30-20) = 41860\\,\\mathrm{J}"],
          ], "41860 J"),
          ex("Equal masses of water at 80 and 20 °C mix in an insulated container of negligible heat capacity. Final temperature in °C?", [
            ["Equal heat capacities make the gains and losses symmetric.", ""],
            ["Substitute the given values and calculate.", "(80+20)\\div2 = 50\\,\\mathrm{{}^\\circ C}"],
          ], "50 °C"),
        ],
        practice: [
          pr("Warm 2 kg of iron by 10 °C with c = 450 J/(kg·°C). Heat in J?", 9000, "Use the stated specific heat.", "2×450×10 = 9000 J."),
          pr("A 0.5 kg sample has c = 500 J/(kg·°C) and absorbs 5000 J. Temperature rise in °C?", 20, "Divide heat by the total heat capacity.", "5000÷(0.5×500) = 20 °C."),
          pr("Insulated mixing combines 1 kg of water at 80 °C with 3 kg at 20 °C. No phase change or container heating. Final temperature in °C?", 35, "Use a mass-weighted mean because the specific heats match.", "(1×80+3×20)÷4 = 35 °C."),
          pr("A 1 kg iron sample at 100 °C with c = 450 J/(kg·°C) enters 1 kg of water at 20 °C with c = 4186 J/(kg·°C). Insulated container has negligible heat capacity. Final temperature in °C?", 27.765314926660913, "Weight each starting temperature by its sample heat capacity.", "(450×100+4186×20)÷(450+4186) ≈ 27.76531 °C."),
        ],
      },
      {
        title: "Melting and boiling plateaux",
        minutes: 25,
        explain: [
          "At a phase change, energy can change the arrangement of matter without changing temperature. The energy per kilogram for the change is latent heat L. Melting or boiling a mass m takes Q = mL at the transition temperature.",
          "For pure water near normal atmospheric pressure, use melting at 0 °C and boiling at 100 °C. The scene starts with cold ice, so first warm the ice, then melt it, then warm the water. Keep separate accounts for each stage.",
        ],
        formulas: [["Latent heat","Q=mL"],["Successive stages","Q_{\\text{total}}=Q_{\\text{warming}}+Q_{\\text{phase}}+\\cdots"]],
        examples: [
          ex("Melt 0.5 kg of ice already at 0 °C. Use L = 334 kJ/kg. Heat required in kJ?", [
            ["Only the phase-change energy is needed.", ""],
            ["Substitute the given values and calculate.", "0.5\\times334 = 167\\,\\mathrm{kJ}"],
          ], "167 kJ"),
          ex("In the scene, 1 kg ice starts at −20 °C. Use c_ice = 2.1 kJ/(kg·°C) and L = 334 kJ/kg. Energy to warm it and melt half, in kJ?", [
            ["Warm all the ice from minus twenty to zero.", "Q_1=1\\times2.1\\times20=42\\,\\mathrm{kJ}"],
            ["Supply latent heat for half the ice mass.", "Q_2=0.5\\times334=167\\,\\mathrm{kJ}"],
            ["Add the warming and melting energy.", "Q=42+167=209\\,\\mathrm{kJ}"],
          ], "209 kJ"),
        ],
        practice: [
          pr("Melt 2 kg ice at 0 °C with L = 334 kJ/kg. Heat in kJ?", 668, "Multiply mass by latent heat.", "2×334 = 668 kJ."),
          pr("Boil 0.1 kg water already at 100 °C with L = 2256 kJ/kg. Heat in kJ?", 225.60000000000002, "There is no warming stage here.", "0.1×2256 ≈ 225.6 kJ."),
          pr("Ice starts at 0 °C and absorbs 83.5 kJ during melting. With L = 334 kJ/kg, mass melted in kg?", 0.25, "Divide phase-change energy by latent heat.", "83.5÷334 = 0.25 kg."),
          pr("Warm 1 kg ice from −20 °C, melt it, then warm the water to 100 °C without boiling. Use c_ice = 2.1, c_water = 4.186 kJ/(kg·°C), L = 334 kJ/kg. Total energy in kJ?", 794.6, "Add ice warming, melting and water warming.", "2.1×20+334+4.186×100 = 794.6 kJ."),
        ],
      },
      {
        title: "Expansion and heat flowing through solids",
        minutes: 25,
        explain: [
          "Most solids expand when heated. For a modest temperature change, length change is αL₀ΔT. The coefficient α depends on material. Typical steel has α about 12 × 10⁻⁶ per °C; allow space for expansion in long rails and fixtures.",
          "Heat also conducts through a slab from hot to cold. At steady temperatures its transfer rate is kAΔT/d. Here k is thermal conductivity, A is area and d is thickness. Larger conductivity or area increases heat flow; greater thickness reduces it.",
        ],
        formulas: [["Linear expansion","\\Delta L=\\alpha L_0\\Delta T"],["Steady conduction rate","\\dot Q=kA\\Delta T/d"]],
        examples: [
          ex("A 2 m steel bar warms by 50 °C. With α = 12 × 10⁻⁶ per °C, extension in mm?", [
            ["Find extension in metres, then change to millimetres.", ""],
            ["Substitute the given values and calculate.", "12\\times10^{-6}\\times2\\times50\\times1000 \\approx 1.2\\,\\mathrm{mm}"],
          ], "1.2 mm"),
          ex("A slab has k = 0.5 W/(m·K), area 2 m², thickness 0.1 m and temperature difference 20 K. Steady heat flow rate in W?", [
            ["Multiply conductivity, area and temperature difference; divide by thickness.", ""],
            ["Substitute the given values and calculate.", "0.5\\times2\\times20\\div0.1 = 200\\,\\mathrm{W}"],
          ], "200 W"),
        ],
        practice: [
          pr("A 1 m steel rod warms by 10 °C with α = 12 × 10⁻⁶ per °C. Extension in mm?", 0.12000000000000001, "Use the initial length.", "12×10^-6×1×10×1000 ≈ 0.12 mm."),
          pr("A 100 m steel rail warms by 40 °C with α = 12 × 10⁻⁶ per °C. Extension in cm?", 4.8, "Convert the calculated metres to centimetres.", "12×10^-6×100×40×100 = 4.8 cm."),
          pr("A slab has k = 1 W/(m·K), area 1 m², thickness 0.2 m and temperature difference 10 K. Steady heat flow rate in W?", 50, "Use the temperature difference across the slab.", "1×1×10÷0.2 = 50 W."),
          pr("A slab conducts 200 W steadily. Its thickness is doubled while material, area and face temperatures stay fixed. New rate in W?", 100, "Conduction rate varies inversely with thickness.", "200÷2 = 100 W."),
        ],
      },
    ],
  },
  'phys-013': {
    predict: {
      "q": "A converging lens has focal length 10 cm. You move an object from 25 cm to 15 cm in front of it. What happens to its real image?",
      "options": [
        "It gets smaller and closer",
        "It gets larger and farther",
        "It becomes upright and closer",
        "It stays the same size"
      ],
      "answer": 1,
      "reveal": "Moving towards the focal point from outside it sends the real image farther away and makes it larger. It remains upside down; at the focal point the emerging rays become parallel."
    },
    parts: [
      {
        title: "Light bending at a boundary",
        minutes: 20,
        explain: [
          "Light changes speed when it enters a different transparent material. The optical quantity n, often called refractive ratio, is vacuum light speed divided by speed in the material. Typical glass has n around 1.5, depending on composition and wavelength.",
          "Measure angles from the normal, a line perpendicular to the surface. Snell’s law connects the angles. Entering a larger n bends the ray towards the normal; a ray entering along the normal keeps its direction even though its speed changes.",
        ],
        formulas: [["Optical ratio","n=c/v"],["Snell’s law","n_1\\sin\\theta_1=n_2\\sin\\theta_2"]],
        examples: [
          ex("Take vacuum light speed c = 3 × 10⁸ m/s and glass n = 1.5. Light speed in glass in m/s?", [
            ["Divide vacuum speed by the optical ratio.", ""],
            ["Substitute the given values and calculate.", "3\\times10^8\\div1.5 = 200000000\\,\\mathrm{m/s}"],
          ], "200000000 m/s"),
          ex("Light enters glass n = 1.5 from air n = 1 at 30° to the normal. What is sine of the refracted angle?", [
            ["Use Snell’s law and solve for the sine.", ""],
            ["Substitute the given values and calculate.", "1\\sin30^\\circ\\div1.5 \\approx 0.3333333"],
          ], "0.3333333"),
        ],
        practice: [
          pr("A transparent material has n = 2. With c = 3 × 10⁸ m/s, light speed in m/s?", 150000000, "Use speed equals vacuum speed divided by n.", "3×10^8÷2 = 150000000 m/s."),
          pr("Light speed in a material is 2.4 × 10⁸ m/s. With c = 3 × 10⁸ m/s, find n.", 1.25, "Compare vacuum and material speeds.", "(3×10^8)÷(2.4×10^8) = 1.25."),
          pr("Light enters glass n = 1.5 from air n = 1 at 0° to the normal. Refracted angle in degrees?", 0, "A ray on the normal has no sideways component.", "0 = 0 degrees.", { tol: 0.000001 }),
          pr("Light passes from glass n = 1.5 into air n = 1. What is sine of the critical angle for total internal reflection?", 0.6666666666666666, "At the critical angle, the transmitted ray would be along the surface.", "1÷1.5 ≈ 0.6666667."),
        ],
      },
      {
        title: "Where a lens forms an image",
        minutes: 25,
        explain: [
          "A thin converging lens brings parallel rays to its focal point a distance f away. A ray through the centre travels almost straight. Where rays from one object point meet on the far side, they form a real image that can be caught on a screen.",
          "Use positive object distance for an object in front of the lens and positive image distance for a real image on the far side. The thin-lens relation gives the location. Assume small ray angles and a lens thin compared with these distances.",
        ],
        formulas: [["Thin lens","1/f=1/d_o+1/d_i"],["Solved for image distance","d_i=fd_o/(d_o-f)"]],
        examples: [
          ex("A thin converging lens has f = 10 cm and object distance 30 cm. Image distance in cm?", [
            ["Rearrange the thin-lens relation.", "d_i=fd_o/(d_o-f)"],
            ["Find how far the object is beyond the focal point.", "d_o-f=30-10=20\\,\\mathrm{cm}"],
            ["Calculate the image distance.", "d_i=10\\times30/20=15\\,\\mathrm{cm}"],
          ], "15 cm"),
          ex("A thin converging lens has f = 10 cm and object distance 15 cm. Image distance in cm?", [
            ["Keep the difference between object distance and focal length in the denominator.", ""],
            ["Substitute the given values and calculate.", "10\\times15\\div(15-10) = 30\\,\\mathrm{cm}"],
          ], "30 cm"),
        ],
        practice: [
          pr("A converging lens has f = 5 cm and object distance 10 cm. Image distance in cm?", 10, "Use the same units for both distances.", "5×10÷(10-5) = 10 cm."),
          pr("A converging lens has f = 8 cm and object distance 24 cm. Image distance in cm?", 12, "Apply the thin-lens relation.", "8×24÷(24-8) = 12 cm."),
          pr("A real image and object are both 20 cm from a thin lens. Focal length in cm?", 10, "Add reciprocal distances to find reciprocal focal length.", "1÷(1/20+1/20) = 10 cm."),
          pr("A thin lens must form a real image 30 cm away from an object 15 cm away. Focal length in cm?", 10, "Use the reciprocal relation rather than adding distances.", "1÷(1/15+1/30) = 10 cm."),
        ],
      },
      {
        title: "Size, orientation and virtual images",
        minutes: 25,
        explain: [
          "Magnification is image height divided by object height. For a thin lens, m = −d_i/d_o. A negative value means inverted; a positive value means upright. The magnitude tells how much larger or smaller the image is.",
          "An object closer than a converging lens’s focal length produces a virtual image on the object side. The emerging rays spread apart; your eye traces them backwards. A magnifying glass works this way, but this image cannot be projected directly onto a screen.",
        ],
        formulas: [["Magnification","m=-d_i/d_o=h_i/h_o"],["Image height","h_i=mh_o"]],
        examples: [
          ex("A lens has object distance 15 cm and real image distance 30 cm. Signed magnification?", [
            ["Use negative image distance divided by positive object distance.", ""],
            ["Substitute the given values and calculate.", "-30\\div15 = -2"],
          ], "-2"),
          ex("A converging lens has f = 10 cm and object distance 5 cm. Signed image distance in cm?", [
            ["Subtract focal length from object distance.", "d_o-f=5-10=-5\\,\\mathrm{cm}"],
            ["Calculate the signed image distance.", "d_i=10\\times5/(-5)=-10\\,\\mathrm{cm}"],
            ["Interpret the sign. The image is virtual and on the object side of the lens.", ""],
          ], "-10 cm"),
        ],
        practice: [
          pr("Object distance is 20 cm and real image distance is 10 cm. Signed magnification?", -0.5, "An inverted real image has negative magnification.", "-10÷20 = -0.5."),
          pr("A 2 mm object has magnification −3. Signed image height in mm?", -6, "Multiply object height by signed magnification.", "-3×2 = -6 mm."),
          pr("Object distance is 5 cm and virtual image distance is −10 cm. Signed magnification?", 2, "Keep both minus signs.", "-(-10)÷5 = 2."),
          pr("A converging lens has f = 10 cm. To form a real image with m = −2, what object distance is needed in cm?", 15, "Set image distance equal to twice object distance in the lens relation.", "10×(1+1/2) = 15 cm."),
        ],
      },
      {
        title: "Magnification cannot replace resolution",
        minutes: 25,
        explain: [
          "Resolution is the ability to distinguish nearby details. Magnification enlarges the image but cannot restore detail already blurred together. A microscope used to inspect grain boundaries needs suitable resolution as well as useful magnification.",
          "A common estimate is d ≈ λ/(2NA), where d is the smallest separation, λ is wavelength and NA is numerical aperture, a measure of the lens’s light-collecting cone. Shorter wavelength or larger NA reduces d. This is an approximate optical limit, not an exact boundary for every specimen.",
        ],
        formulas: [["Resolution estimate","d\\approx\\lambda/(2\\,\\mathrm{NA})"],["Combined microscope magnification","M=M_{\\text{objective}}M_{\\text{eyepiece}}"]],
        examples: [
          ex("Use wavelength 550 nm and NA = 1.4. Estimated resolution d in nm?", [
            ["Divide wavelength by twice the numerical aperture.", ""],
            ["Substitute the given values and calculate.", "550\\div(2\\times1.4) \\approx 196.4286\\,\\mathrm{nm}"],
          ], "196.4286 nm"),
          ex("An objective magnifies 40 times and an eyepiece 10 times. Total magnification magnitude?", [
            ["Multiply the two magnification factors.", ""],
            ["Substitute the given values and calculate.", "40\\times10 = 400"],
          ], "400"),
        ],
        practice: [
          pr("Wavelength is 500 nm and NA = 1. Estimated resolution in nm?", 250, "Use wavelength divided by twice NA.", "500÷2 = 250 nm."),
          pr("An objective magnifies 20 times and an eyepiece 10 times. Total magnification magnitude?", 200, "The two stages multiply.", "20×10 = 200."),
          pr("At fixed wavelength, NA doubles. Estimated minimum separation changes by what factor?", 0.5, "Minimum separation varies inversely with NA.", "1÷2 = 0.5."),
          pr("A microscope uses wavelength 600 nm. What NA gives estimated resolution 300 nm?", 1, "Rearrange the resolution estimate for NA.", "600÷(2×300) = 1."),
        ],
      },
    ],
  },
  'phys-101': {
    predict: {
      "q": "In the steel tensile scene, the engineering stress falls after its peak while the bar is still being stretched. What is happening to the specimen?",
      "options": [
        "It is narrowing locally into a neck",
        "It has finished breaking everywhere",
        "It is becoming uniformly thicker",
        "It is returning to its original shape"
      ],
      "answer": 0,
      "reveal": "After the ultimate tensile point, deformation concentrates in a neck and the carried load falls. The original area still defines engineering stress, so that falling curve does not mean elastic recovery."
    },
    parts: [
      {
        title: "Stress makes forces comparable",
        minutes: 20,
        explain: [
          "A force alone cannot compare a thin wire with a thick rod. An axial force pulls along the specimen’s length. Engineering stress divides this force by original cross-sectional area. Use N and mm² to obtain MPa, since one N/mm² equals one MPa.",
          "The stress describes the loading inside the specimen; it is not itself a material property. Yield strength and modulus are properties measured from the response. For a circular section, area grows with diameter squared, so doubling diameter gives four times the area.",
        ],
        formulas: [["Engineering stress","\\sigma=F/A_0"],["Circular area","A_0=\\pi d^2/4"]],
        examples: [
          ex("A tensile sample carries 2000 N over original area 20 mm². Engineering stress in MPa?", [
            ["Divide load by original area.", ""],
            ["Substitute the given values and calculate.", "2000\\div20 = 100\\,\\mathrm{MPa}"],
          ], "100 MPa"),
          ex("A circular rod has diameter 10 mm. Original cross-sectional area in mm²?", [
            ["Square the diameter, then multiply by π/4.", ""],
            ["Substitute the given values and calculate.", "\\pi\\times10^2\\div4 \\approx 78.53982\\,\\mathrm{mm^{2}}"],
          ], "78.53982 mm²"),
        ],
        practice: [
          pr("A sample carries 600 N over 10 mm². Stress in MPa?", 60, "Use force per original area.", "600÷10 = 60 MPa."),
          pr("A uniform section of 25 mm² carries stress 80 MPa. Axial force in N?", 2000, "Multiply stress by area.", "25×80 = 2000 N."),
          pr("A load is 3000 N at stress 150 MPa. Original area in mm²?", 20, "Divide force by stress.", "3000÷150 = 20 mm²."),
          pr("Two circular rods of the same material have diameters 2 mm and 6 mm. At the same engineering stress, what is larger load divided by smaller load?", 9, "Loads scale with cross-sectional area at fixed stress.", "(6/2)^2 = 9."),
        ],
      },
      {
        title: "Strain and elastic stiffness",
        minutes: 25,
        explain: [
          "Engineering strain is extension divided by original length. It has no units because the length units cancel. Multiply strain by one hundred to express percent elongation. A long specimen can extend more while having the same strain as a short one.",
          "In the linear elastic region, stress equals Young’s modulus E times strain. Unloading here recovers the deformation. Use matching stress and modulus units. The tensile animation enlarges the elastic strain region to make it visible; calculate real elastic strains from E rather than the displayed width.",
        ],
        formulas: [["Engineering strain","\\varepsilon=\\Delta L/L_0"],["Linear elasticity","\\sigma=E\\varepsilon"],["Uniform axial extension","\\Delta L=FL_0/(A_0E)"]],
        examples: [
          ex("A 200 mm gauge length extends by 0.2 mm. Engineering strain as a fraction?", [
            ["Use the original gauge length rather than the stretched length.", "\\varepsilon=\\Delta L/L_0"],
            ["Divide extension by the original length.", "\\varepsilon=0.2/200=0.001"],
          ], "0.001"),
          ex("Use typical steel E = 200000 MPa. At elastic strain 0.001, stress in MPa?", [
            ["Multiply modulus by fractional strain.", ""],
            ["Substitute the given values and calculate.", "200000\\times0.001 = 200\\,\\mathrm{MPa}"],
          ], "200 MPa"),
        ],
        practice: [
          pr("A 100 mm gauge length extends by 0.05 mm. Fractional strain?", 0.0005, "Keep both lengths in millimetres.", "0.05÷100 = 0.0005.", { tol: 0.000005 }),
          pr("Fractional strain is 0.002. Percent strain in %?", 0.2, "Multiply the fraction by one hundred.", "0.002×100 = 0.2 %."),
          pr("Use aluminium E = 69000 MPa. At elastic stress 69 MPa, fractional strain?", 0.001, "Divide stress by modulus.", "69÷69000 = 0.001."),
          pr("A uniform steel rod has F = 1000 N, L₀ = 100 mm, A₀ = 10 mm² and E = 200000 MPa. Assuming linear elasticity, extension in mm?", 0.05, "Combine stress and strain using consistent N and mm units.", "1000×100÷(10×200000) = 0.05 mm."),
        ],
      },
      {
        title: "Yielding, hardening and fracture",
        minutes: 25,
        explain: [
          "Yielding marks the onset of permanent deformation. Beyond yield, a ductile metal can keep stretching while stress rises: strain hardening. The highest engineering stress is the ultimate tensile strength, or UTS. A neck then develops before fracture.",
          "Engineering stress always uses the original area. True stress uses the current area, so it can be larger as the specimen narrows. After plastic loading, unloading is approximately elastic with slope E; the strain left at zero force is permanent strain. A brittle material can break with little plastic stretch.",
        ],
        formulas: [["True stress","\\sigma_{\\text{true}}=F/A_{\\text{current}}"],["Plastic strain after unloading","\\varepsilon_p=\\varepsilon_{\\text{total}}-\\sigma/E"],["Ductility","\\text{elongation percent}=100(L_f-L_0)/L_0"]],
        examples: [
          ex("A specimen carries 8000 N with original area 20 mm² and current area 16 mm². True stress in MPa?", [
            ["True stress uses current area.", ""],
            ["Substitute the given values and calculate.", "8000\\div16 = 500\\,\\mathrm{MPa}"],
          ], "500 MPa"),
          ex("A specimen at total strain 0.01 carries 200 MPa. With E = 200000 MPa and elastic unloading, permanent fractional strain?", [
            ["Find the elastic part that unloading recovers.", "\\varepsilon_e=\\sigma/E=200/200000=0.001"],
            ["Subtract recoverable strain from total strain.", "\\varepsilon_p=0.01-0.001\\approx0.009"],
          ], "0.009"),
        ],
        practice: [
          pr("Measured engineering stresses are 100, 250, 420 and 380 MPa before fracture. UTS in MPa?", 420, "Choose the largest engineering stress.", "max(100,250,420,380) = 420 MPa."),
          pr("A gauge length grows from 50 mm to 60 mm after fracture pieces are fitted together. Percent elongation in %?", 20, "Compare permanent extension with original length.", "100×(60-50)÷50 = 20 %."),
          pr("Original area is 20 mm² and final neck area is 12 mm². Percent reduction of area in %?", 40, "Use the area lost as a fraction of the original.", "100×(20-12)÷20 = 40 %."),
          pr("A sample carries 6000 N, with original area 20 mm² and current area 15 mm². True stress minus engineering stress in MPa?", 100, "Calculate the two stresses using their different areas.", "6000÷15-6000÷20 = 100 MPa."),
        ],
      },
      {
        title: "Sideways contraction and a design limit",
        minutes: 25,
        explain: [
          "A stretched elastic bar usually becomes thinner. Poisson’s ratio ν is minus the lateral strain divided by axial strain. The minus sign makes ν positive when length increases and width decreases. A typical metal value is around 0.30, within small elastic strains.",
          "For a simple static axial design check, divide yield strength by a stated factor of safety to find allowable stress. Required area is force divided by that allowable stress. This check addresses yielding under the stated load; other failure modes need their own checks.",
        ],
        formulas: [["Poisson’s ratio","\\nu=-\\varepsilon_{\\text{lateral}}/\\varepsilon_{\\text{axial}}"],["Allowable stress","\\sigma_{\\text{allow}}=\\sigma_y/\\mathrm{FS}"],["Required area","A_{\\min}=F/\\sigma_{\\text{allow}}"]],
        examples: [
          ex("Axial elastic strain is +0.001 and lateral strain is −0.0003. Poisson’s ratio?", [
            ["Apply the minus sign to the ratio of strains.", ""],
            ["Substitute the given values and calculate.", "-(-0.0003)\\div0.001 = 0.3"],
          ], "0.3"),
          ex("Steel yield strength is 250 MPa. Using factor of safety 2 against axial yielding, allowable stress in MPa?", [
            ["Divide yield strength by the safety factor.", ""],
            ["Substitute the given values and calculate.", "250\\div2 = 125\\,\\mathrm{MPa}"],
          ], "125 MPa"),
        ],
        practice: [
          pr("Yield strength is 300 MPa and safety factor is 3. Allowable stress in MPa?", 100, "Use yield strength rather than UTS.", "300÷3 = 100 MPa."),
          pr("Axial elastic strain is 0.002 and ν = 0.3. Signed lateral strain?", -0.0006, "Lateral contraction has negative strain.", "-0.3×0.002 = -0.0006.", { tol: 0.000005999999999999999 }),
          pr("An axial load is 5000 N and allowable stress is 100 MPa. Minimum area in mm²?", 50, "Use N/mm² for MPa.", "5000÷100 = 50 mm²."),
          pr("An axial load is 12000 N, yield strength 240 MPa and safety factor 2. Minimum area against yielding in mm²?", 100, "Find allowable stress first, then required area.", "12000÷(240÷2) = 100 mm²."),
        ],
      },
    ],
  },
};
