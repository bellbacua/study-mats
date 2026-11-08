// Year 3, first semester: statics, experiments, economics and processing.

const ex = (problem, steps, answer) => ({ problem, steps, answer });
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });

export const YEAR3A = {
  'phys-201': {
    predict: {
      q: "The lamp stays the same weight. You lower both cables from a steep V towards a nearly flat line. What happens to the pull in each cable?",
      options: ["It grows sharply","It falls towards zero","It stays at half the weight","It stays at the whole weight"],
      answer: 0,
      reveal: "A nearly flat cable directs very little of its pull upwards. Each cable must pull much harder to keep the same lamp up.",
    },
    parts: [
      {
        title: "Forces as arrows",
        minutes: 25,
        explain: [
          "A force is a push or a pull with a size and a direction. Draw the object alone, then draw every external force on it. This is a free-body diagram. A cable pulls along itself; a smooth support pushes at right angles to its surface.",
          "Choose horizontal x and vertical y directions. A sloping force can be replaced by two perpendicular parts. With its angle measured above the horizontal, the horizontal part uses cosine and the vertical part uses sine. Leftward and downward parts get minus signs.",
        ],
        formulas: [
          ["Force components","F_x=F\\cos\\theta,\\qquad F_y=F\\sin\\theta"],
        ],
        examples: [
          ex("A 100 N pull is 30° above the horizontal. Find its upward part in N.", [
            ["Use sine for the vertical part.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  \\sin  30^{\\circ} = 50\\;\\text{N}"],
          ], "50 N"),
          ex("A 200 N force points 60° above the horizontal. Find its rightward part in N.", [
            ["Use cosine for the horizontal part.", ""],
            ["Substitute the stated values and calculate.", "200 \\times  \\cos  60^{\\circ} = 100\\;\\text{N}"],
          ], "100 N"),
        ],
        practice: [
          pr("A 40 N force points right and a 15 N force points left. Find the signed total in N, taking right as positive.", 25, "Give the leftward force a minus sign.", "40 − 15 = 25 N."),
          pr("A 60 N force points upwards and a 90 N force downwards. Find the signed total in N, taking up as positive.", -30, "Add the upward and downward parts with signs.", "60 − 90 = -30 N."),
          pr("A 300 N pull acts at 30° above horizontal. Find its rightward part in N.", 259.808, "The angle is measured from the horizontal.", "300 × cos 30° ≈ 259.808 N."),
          pr("A lifting ring feels 80 N rightwards and 60 N upwards. Find the resultant force size in N.", 100, "Use Pythagoras on the perpendicular parts.", "√(80² + 60²) = 100 N."),
        ],
      },
      {
        title: "Cables sharing a load",
        minutes: 25,
        explain: [
          "Equilibrium means the total force is zero. For the lamp, upward cable parts must add to the weight. Sideways cable parts must cancel. Weight is already a force, in newtons; mass is measured in kilograms.",
          "For equal cable angles, symmetry makes the tensions equal. Each upward part is T sin θ. Together they support W. Flatter cables therefore need greater tension. This matters when lifting heavy furnace lids and metal plates.",
          "Unequal angles need both balance equations. Write T₁ cos θ₁ = T₂ cos θ₂ for sideways balance and T₁ sin θ₁ + T₂ sin θ₂ = W for upward balance. Solving these together gives the unequal-cable relation below; both angles are measured above horizontal.",
        ],
        formulas: [
          ["Equal cables","2T\\sin\\theta=W,\\qquad T=\\frac{W}{2\\sin\\theta}"],
          ["Unequal cables","T_1=\\frac{W\\cos\\theta_2}{\\sin(\\theta_1+\\theta_2)},\\qquad T_2=\\frac{W\\cos\\theta_1}{\\sin(\\theta_1+\\theta_2)}"],
        ],
        examples: [
          ex("Two equal cables at 30° above horizontal hold a 500 N lamp. Find each tension in N.", [
            ["Divide weight by twice the sine of the angle.", ""],
            ["Substitute the stated values and calculate.", "500 \\div  (2 \\sin  30^{\\circ}) = 500\\;\\text{N}"],
          ], "500 N"),
          ex("Two equal cables at 45° hold a 600 N lid. Find each tension in N.", [
            ["Both cables contribute an upward part.", ""],
            ["Substitute the stated values and calculate.", "600 \\div  (2 \\sin  45^{\\circ})\\approx 424.264\\;\\text{N}"],
          ], "424.264 N"),
        ],
        practice: [
          pr("Two vertical cables equally share a 900 N load. Find each tension in N.", 450, "Each cable carries the same share.", "900 ÷ 2 = 450 N."),
          pr("Equal cables at 30° hold an 800 N load. Find each tension in N.", 800, "Use the equal-cable equation.", "800 ÷ (2 sin 30°) = 800 N."),
          pr("Equal cables at 15° hold a 1000 N lid. Find each tension in N.", 1931.85, "Small sine means a large tension.", "1000 ÷ (2 sin 15°) ≈ 1931.85 N."),
          pr("A 500 N lamp has a left cable at 60° and a right cable at 30° above horizontal. Find left-cable tension in N.", 433.013, "Use both balance equations, or the unequal-cable relation for T₁.", "500 × cos 30° ÷ sin 90° ≈ 433.013 N."),
        ],
      },
      {
        title: "Moments and couples",
        minutes: 25,
        explain: [
          "A force can turn an object as well as move it. Its moment about a point is the force times the perpendicular distance from that point to its line of action. A force whose line passes through the point has no moment there.",
          "Choose anticlockwise as positive and clockwise as negative. Forces balance a rigid body only if their moments balance too. Two equal, opposite, parallel forces separated by a distance form a couple: no net force, but a turning effect.",
        ],
        formulas: [
          ["Moment","M=F d_\\perp"],
          ["Rigid-body balance","\\sum F_x=0,\\quad\\sum F_y=0,\\quad\\sum M=0"],
        ],
        examples: [
          ex("A perpendicular 50 N pull acts 0.4 m from a bolt. Find its moment size in N m.", [
            ["Multiply force by perpendicular distance.", ""],
            ["Substitute the stated values and calculate.", "50 \\times  0.4 = 20\\;\\text{N m}"],
          ], "20 N m"),
          ex("A couple has opposite forces of 120 N, with lines 0.25 m apart. Find its moment size in N m.", [
            ["Use one force and the separation between force lines.", ""],
            ["Substitute the stated values and calculate.", "120 \\times  0.25 = 30\\;\\text{N m}"],
          ], "30 N m"),
        ],
        practice: [
          pr("A 30 N perpendicular force acts 2 m from a pivot. Find the moment size in N m.", 60, "The stated distance is perpendicular.", "30 × 2 = 60 N m."),
          pr("A clockwise 80 N m moment opposes an anticlockwise 50 N m moment. Find the signed total in N m, with anticlockwise positive.", -30, "Clockwise gets a minus sign.", "50 − 80 = -30 N m."),
          pr("A 100 N m moment is needed. With a perpendicular 0.5 m lever, find the force in N.", 200, "Rearrange moment equals force times distance.", "100 ÷ 0.5 = 200 N."),
          pr("A horizontal 0.6 m spanner is pulled with 100 N at 30° to its length. Find the moment size in N m.", 30, "Only the force perpendicular to the spanner turns it.", "0.6 × 100 × sin 30° = 30 N m."),
        ],
      },
      {
        title: "Supports and distributed loads",
        minutes: 25,
        explain: [
          "A pin support can supply horizontal and vertical reactions. A roller on a horizontal surface supplies only a vertical reaction. These are forces from the supports, so they belong on the free-body diagram.",
          "A uniform load w along a length L can be replaced, for external balance, by one force wL at the middle of that length. Take moments about one support to find the other reaction, then use vertical balance. Include the beam weight when it is significant.",
        ],
        formulas: [
          ["Uniform load","W=wL"],
          ["Point load on a span","R_B=\\frac{Pa}{L},\\qquad R_A=P-R_B"],
        ],
        examples: [
          ex("A 4 m beam carries 100 N/m uniformly over its whole span. Find the resultant load in N.", [
            ["Multiply load per metre by loaded length.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  4 = 400\\;\\text{N}"],
          ], "400 N"),
          ex("A 600 N load acts 2 m from A on a 6 m beam supported at A and B. Neglect beam weight. Find the reaction at B in N.", [
            ["Take moments about A.", ""],
            ["Substitute the stated values and calculate.", "600 \\times  2 \\div  6 = 200\\;\\text{N}"],
          ], "200 N"),
        ],
        practice: [
          pr("A 5 m rail carries 80 N/m uniformly. Find the total load in N.", 400, "Use force per length times length.", "5 × 80 = 400 N."),
          pr("A 1000 N load sits at the middle of a weightless simply supported beam. Find the left reaction in N.", 500, "The loading is symmetric.", "1000 ÷ 2 = 500 N."),
          pr("A 900 N load is 1 m from A on a weightless 3 m span. Find the reaction at B in N.", 300, "Balance moments about A.", "900 × 1 ÷ 3 = 300 N."),
          pr("A 6 m beam carries 200 N/m uniformly and an extra 600 N at 2 m from A. Find B’s reaction in N; neglect beam weight.", 800, "Place the uniform resultant at midspan, then add moments.", "(200 × 6 × 3 + 600 × 2) ÷ 6 = 800 N."),
        ],
      },
    ],
  },

  'phys-202': {
    predict: {
      q: "A wooden block rests just below its sliding angle. You replace it with a heavier block of the same wood, with the same surface condition and no tipping. What should happen to the sliding angle?",
      options: ["It becomes much smaller","It stays the same","It becomes much larger","The block cannot slide"],
      answer: 1,
      reveal: "The heavier block has both more downhill pull and more friction capacity. In the dry-friction model these grow together, so mass cancels from the sliding condition.",
    },
    parts: [
      {
        title: "Static friction adjusts",
        minutes: 25,
        explain: [
          "The normal force N is the surface pushing at right angles to itself. Friction acts along the surface and opposes the slipping that would happen without it. For a block on a level floor with no other vertical forces, N equals its weight.",
          "Static friction is adjustable. A gentle push needs only a gentle opposing force. The expression μₛN is the greatest available static friction, not the friction at every moment. Here μₛ is a dimensionless coefficient describing the pair of surfaces.",
        ],
        formulas: [
          ["Static limit","0\\leq |F_s|\\leq\\mu_s N"],
        ],
        examples: [
          ex("A stationary crate is pushed horizontally with 12 N. Its friction limit is 40 N and no other horizontal forces act. Find the friction size in N.", [
            ["A stationary crate has zero total horizontal force.", ""],
            ["Substitute the stated values and calculate.", "F_s=12 = 12\\;\\text{N}"],
          ], "12 N"),
          ex("A block has N = 200 N and μₛ = 0.4. Find its greatest static friction in N.", [
            ["Multiply coefficient by normal force.", ""],
            ["Substitute the stated values and calculate.", "0.4 \\times  200 = 80\\;\\text{N}"],
          ], "80 N"),
        ],
        practice: [
          pr("A stationary block is pushed with 8 N below its friction limit. Find the opposing friction size in N.", 8, "Friction only supplies what balance needs.", "The friction balances the applied push, so its size is 8 N."),
          pr("For N = 150 N and μₛ = 0.5, find the static limit in N.", 75, "Use the limit, rather than assuming motion.", "150 × 0.5 = 75 N."),
          pr("A 10 kg crate rests on a level floor, μₛ = 0.5. Take g = 9.8 m/s². Find the static limit in N.", 49, "First find its normal force from its weight.", "10 × 9.8 × 0.5 = 49 N."),
          pr("A 100 N block is pulled upwards with 20 N while remaining on a level floor. With μₛ = 0.4, find the horizontal friction limit in N.", 32, "The upward pull reduces the normal force.", "(100 − 20) × 0.4 = 32 N."),
        ],
      },
      {
        title: "Sliding and energy loss",
        minutes: 25,
        explain: [
          "Once surfaces slide, kinetic friction is often modelled as μₖN. For many dry pairs μₖ is lower than μₛ. This explains why starting a heavy crate can take more effort than keeping it moving.",
          "Friction changes mechanical energy into heat and surface damage. During straight sliding at constant normal force, the energy lost is friction times sliding distance. Use measured coefficients for a real material pair; surface finish and contamination can change them.",
        ],
        formulas: [
          ["Sliding force","F_k=\\mu_k N"],
          ["Energy dissipated","E_{\\mathrm{loss}}=F_k s"],
        ],
        examples: [
          ex("A sliding block has N = 100 N and μₖ = 0.3. Find friction in N.", [
            ["Use the sliding coefficient.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  0.3 = 30\\;\\text{N}"],
          ], "30 N"),
          ex("A sliding contact resists with 40 N for 3 m. Find the energy dissipated in J.", [
            ["Force times distance gives energy.", ""],
            ["Substitute the stated values and calculate.", "40 \\times  3 = 120\\;\\text{J}"],
          ], "120 J"),
        ],
        practice: [
          pr("N = 200 N and μₖ = 0.2. Find sliding friction in N.", 40, "Multiply normal force by kinetic coefficient.", "200 × 0.2 = 40 N."),
          pr("Sliding friction is 25 N over 4 m. Find energy loss in J.", 100, "Use the full sliding distance.", "25 × 4 = 100 J."),
          pr("A 5 kg block slides on a horizontal surface with μₖ = 0.4. Take g = 9.8 m/s². Find friction in N.", 19.6, "Find weight, then the sliding resistance.", "5 × 9.8 × 0.4 = 19.6 N."),
          pr("A 20 kg crate is pulled horizontally with 100 N; μₖ = 0.3 and g = 9.8 m/s². Find acceleration in m/s² while it slides.", 2.06, "Subtract friction from the pull, then divide by mass.", "(100 − 0.3 × 20 × 9.8) ÷ 20 = 2.06 m/s²."),
        ],
      },
      {
        title: "The angle that starts sliding",
        minutes: 25,
        explain: [
          "On a ramp, weight has two parts. The downhill part is mg sin θ. The part pressing into the ramp is mg cos θ, which equals N if no other normal forces act.",
          "At impending downhill sliding, the downhill part just reaches μₛN. Dividing cancels mg and gives tan θ = μₛ. This is the angle of repose for the block model, assuming it slides before it tips. Angles in these problems are in degrees.",
        ],
        formulas: [
          ["Ramp forces","N=mg\\cos\\theta,\\qquad F_\\parallel=mg\\sin\\theta"],
          ["Sliding threshold","\\theta_c=\\tan^{-1}\\mu_s"],
        ],
        examples: [
          ex("For μₛ = 0.5, find the limiting ramp angle in degrees.", [
            ["Use the inverse tangent of the coefficient.", ""],
            ["Substitute the stated values and calculate.", "\\tan^{-1}(0.5)\\approx 26.5651\\;\\text{degrees}"],
          ], "26.5651 degrees"),
          ex("A block starts sliding at 30°. Find μₛ.", [
            ["Take the tangent of the measured angle.", ""],
            ["Substitute the stated values and calculate.", "\\tan  30^{\\circ}\\approx 0.57735"],
          ], "0.57735"),
        ],
        practice: [
          pr("A block weighs 100 N on a 30° slope. Find the downhill weight component in N.", 50, "Resolve weight along the slope.", "100 × sin 30° = 50 N."),
          pr("The same 100 N block is on a 30° slope. Find N in N.", 86.6025, "Resolve weight perpendicular to the slope.", "100 × cos 30° ≈ 86.6025 N."),
          pr("For a stated oily-contact coefficient μₛ = 0.1, find the limiting angle in degrees.", 5.71059, "Use inverse tangent; the small coefficient gives a shallow angle.", "tan⁻¹(0.1) ≈ 5.71059 degrees."),
          pr("A ramp rises 0.3 m over a horizontal distance of 0.8 m when sliding begins. Find μₛ.", 0.375, "Tangent is rise divided by horizontal run.", "0.3 ÷ 0.8 = 0.375."),
        ],
      },
      {
        title: "Friction in holding devices",
        minutes: 25,
        explain: [
          "Clamps and brakes use friction deliberately. To hold a plate against a sideways force, a clamp needs enough normal force that the friction limit reaches the applied force. Count the contact faces that really share the load.",
          "A belt around a rough drum can support unequal tensions. At impending slip, the ratio of tight-side to slack-side tension is e^(μθ), with wrap angle θ in radians. This ideal belt rule assumes a flexible belt and dry contact. It differs from a flat block because the direction of the contact force changes around the drum.",
        ],
        formulas: [
          ["Clamping condition","F\\leq\\mu_s N"],
          ["Belt at impending slip","\\frac{T_{\\mathrm{tight}}}{T_{\\mathrm{slack}}}=e^{\\mu_s\\theta}"],
        ],
        examples: [
          ex("One effective clamp face must hold a 60 N sideways load. With μₛ = 0.3, find the least normal force in N.", [
            ["Rearrange the friction limit.", ""],
            ["Substitute the stated values and calculate.", "60 \\div  0.3 = 200\\;\\text{N}"],
          ], "200 N"),
          ex("A belt wraps π radians around a drum with μₛ = 0.2. Find the greatest tight/slack tension ratio.", [
            ["Use radians in the exponential.", ""],
            ["Substitute the stated values and calculate.", "e^{0.2\\pi }\\approx 1.87446"],
          ], "1.87446"),
        ],
        practice: [
          pr("One clamp face has N = 500 N and μₛ = 0.2. Find its holding limit in N.", 100, "Use friction coefficient times normal force.", "500 × 0.2 = 100 N."),
          pr("Two equally loaded clamp faces each have N = 200 N and μₛ = 0.3. Find their combined holding limit in N.", 120, "Add the limits from the two faces.", "2 × 200 × 0.3 = 120 N."),
          pr("A brake pad exerts a tangential friction force of 80 N at a 0.15 m radius. Find braking moment in N m.", 12, "Moment uses the perpendicular lever arm.", "80 × 0.15 = 12 N m."),
          pr("A belt has slack-side tension 100 N, μₛ = 0.3 and wrap angle π radians. Find tight-side tension at impending slip in N.", 256.633, "Multiply slack tension by the limiting tension ratio.", "100 × e^(0.3π) ≈ 256.633 N."),
        ],
      },
    ],
  },

  'phys-203': {
    predict: {
      q: "The animation uses the same aluminium area in every section. Turn the 40 mm wide, 10 mm tall bar onto its edge. With the same span and load, how does its bending stiffness change?",
      options: ["It stays the same","It doubles","It rises sixteenfold","It falls to one quarter"],
      answer: 2,
      reveal: "The height becomes four times larger while the width becomes four times smaller. Since the second moment is width times height cubed divided by twelve, the result is sixteen times larger.",
    },
    parts: [
      {
        title: "Finding a balance point",
        minutes: 25,
        explain: [
          "The centroid is the geometric balance point of an area. For a thin plate of uniform thickness and density, it is also the centre of mass. A rectangle balances halfway across its width and halfway up its height.",
          "For several non-overlapping pieces, average their centre positions using their areas as weights. Measure every centre from the same reference line. A larger piece pulls the combined centroid closer to itself.",
        ],
        formulas: [
          ["Composite centroid","\\bar y=\\frac{\\sum A_i y_i}{\\sum A_i}"],
        ],
        examples: [
          ex("A rectangle is 40 mm tall with its bottom at y = 0. Find its centroid height in mm.", [
            ["A rectangle balances halfway up.", ""],
            ["Substitute the stated values and calculate.", "40 \\div  2 = 20\\;\\text{mm}"],
          ], "20 mm"),
          ex("Areas of 100 and 300 mm² have centre heights 10 and 30 mm. Find their combined centroid height in mm.", [
            ["Form the area-weighted average.", ""],
            ["Substitute the stated values and calculate.", "(100 \\times  10 + 300 \\times  30) \\div  (100 + 300) = 25\\;\\text{mm}"],
          ], "25 mm"),
        ],
        practice: [
          pr("A 60 mm tall rectangle starts at y = 0. Find its centroid height in mm.", 30, "Use half the height.", "60 ÷ 2 = 30 mm."),
          pr("Equal areas have centres at y = 5 and 25 mm. Find the combined centroid height in mm.", 15, "Equal weights give an ordinary average.", "(5 + 25) ÷ 2 = 15 mm."),
          pr("Areas of 200 and 100 mm² have centre heights 10 and 40 mm. Find the centroid height in mm.", 20, "Weight each height by its area.", "(200 × 10 + 100 × 40) ÷ 300 = 20 mm."),
          pr("A T-section has a 5 × 40 mm web from y = 0 to 40 mm and a 40 × 5 mm flange from y = 40 to 45 mm. Find its centroid height in mm.", 31.25, "Use the two non-overlapping rectangles and their own centre heights.", "(200 × 20 + 200 × 42.5) ÷ 400 = 31.25 mm."),
        ],
      },
      {
        title: "Area far from an axis",
        minutes: 25,
        explain: [
          "The second moment of area adds each tiny area times the square of its distance from an axis. Its units are length to the fourth power. It measures shape, rather than the mass moment of inertia used in rotation.",
          "For a rectangle about a horizontal line through its centroid, I = bh³/12. Height is the dimension perpendicular to that line. For the same material, span and loading, a larger I gives less elastic bending. This is why a ruler is harder to bend on its edge.",
        ],
        formulas: [
          ["Definition","I_x=\\int y^2\\,dA"],
          ["Centred rectangle","I_x=\\frac{bh^3}{12}"],
        ],
        examples: [
          ex("A rectangle is 20 mm wide and 60 mm tall. Find I about its horizontal centroidal axis in mm⁴.", [
            ["Cube the height, then multiply by width and divide by twelve.", ""],
            ["Substitute the stated values and calculate.", "20 \\times  60^{3} \\div  12 = 360000\\;\\text{mm}^4\\text{}"],
          ], "360000 mm⁴"),
          ex("The same rectangle lies flat: b = 60 mm, h = 20 mm. Find I in mm⁴.", [
            ["Use the new vertical height.", ""],
            ["Substitute the stated values and calculate.", "60 \\times  20^{3} \\div  12 = 40000\\;\\text{mm}^4\\text{}"],
          ], "40000 mm⁴"),
        ],
        practice: [
          pr("A square has b = h = 10 mm. Find its horizontal centroidal I in mm⁴.", 833.333, "Apply the rectangle formula.", "10 × 10³ ÷ 12 ≈ 833.333 mm⁴."),
          pr("A rectangle has b = 40 mm and h = 10 mm. Find its horizontal centroidal I in mm⁴.", 3333.33, "Height is the cubed dimension.", "40 × 10³ ÷ 12 ≈ 3333.33 mm⁴."),
          pr("A bar has b = 10 mm and h = 40 mm. Find its horizontal centroidal I in mm⁴.", 53333.3, "Keep every length in mm.", "10 × 40³ ÷ 12 ≈ 53333.3 mm⁴."),
          pr("A 10 × 40 mm bar is turned from flat to edge. Find I on edge divided by I flat.", 16, "Use the rectangle formula in both orientations.", "(10 × 40³) ÷ (40 × 10³) = 16."),
        ],
      },
      {
        title: "Moving axes and removing holes",
        minutes: 25,
        explain: [
          "A piece has a second moment about its own centre. To use a parallel axis a distance d away, add Ad². Never subtract this term when moving from a piece’s own centroid to another parallel axis.",
          "For a built-up section, first find the combined centroid. Then move each piece’s second moment to the common axis and add. Treat a hole as removed area: subtract its area contribution and its second moment. Hollow sections can keep material far from the centre while saving mass.",
        ],
        formulas: [
          ["Parallel axes","I=I_c+Ad^2"],
          ["Centred rectangular hole","I=\\frac{BH^3-bh^3}{12}"],
        ],
        examples: [
          ex("A piece has I_c = 1000 mm⁴ and A = 100 mm². Find I about a parallel axis 5 mm away in mm⁴.", [
            ["Add the area times distance squared.", ""],
            ["Substitute the stated values and calculate.", "1000 + 100 \\times  5^{2} = 3500\\;\\text{mm}^4\\text{}"],
          ], "3500 mm⁴"),
          ex("A centred square tube is 30 mm outside and 20 mm inside. Find its horizontal centroidal I in mm⁴.", [
            ["Subtract the centred hole from the outer square.", ""],
            ["Substitute the stated values and calculate.", "(30^{4} - 20^{4}) \\div  12\\approx 54166.7\\;\\text{mm}^4\\text{}"],
          ], "54166.7 mm⁴"),
        ],
        practice: [
          pr("A = 50 mm² and d = 4 mm. Find the added Ad² term in mm⁴.", 800, "Square the offset.", "50 × 4² = 800 mm⁴."),
          pr("I_c = 2000 mm⁴, A = 200 mm² and d = 3 mm. Find I in mm⁴.", 3800, "Add the offset contribution.", "2000 + 200 × 3² = 3800 mm⁴."),
          pr("A centred hollow rectangle has outer width 40 mm, height 60 mm, inner width 30 mm, height 50 mm. Find horizontal I in mm⁴.", 407500, "Subtract the inner rectangle’s second moment.", "(40 × 60³ − 30 × 50³) ÷ 12 = 407500 mm⁴."),
          pr("Two identical pieces each have I_c = 800 mm⁴, A = 100 mm², and centres 10 mm from the combined axis. Find total I in mm⁴.", 21600, "Move each piece to the common axis, then add both.", "2 × (800 + 100 × 10²) = 21600 mm⁴."),
        ],
      },
      {
        title: "Designing a stiff section",
        minutes: 25,
        explain: [
          "An I-section has two broad flanges joined by a thinner web. The flanges place much of the area far above and below the centroid. The web holds them apart and helps carry shear. The shape makes efficient use of material for bending about the strong axis.",
          "Compare shapes using the same axis and the same amount of material. For symmetric sections, the centroid lies at mid-height. In elastic bending with all other conditions fixed, deflection is inversely proportional to EI, where E is the material’s elastic modulus. This comparison alone does not check buckling or failure.",
        ],
        formulas: [
          ["Symmetric I-section","I=2(I_f+A_fd^2)+I_w"],
          ["Same load and span","\\frac{\\delta_2}{\\delta_1}=\\frac{E_1I_1}{E_2I_2}"],
        ],
        examples: [
          ex("An I-section has two 30 × 4 mm flanges and a 5 × 32 mm web between them. Find total area in mm².", [
            ["Add the non-overlapping rectangle areas.", ""],
            ["Substitute the stated values and calculate.", "2 \\times  30 \\times  4 + 5 \\times  32 = 400\\;\\text{mm}^2\\text{}"],
          ], "400 mm²"),
          ex("That symmetric I-section is 40 mm deep. Its flange centres are 18 mm from the centroid. Find horizontal I in mm⁴.", [
            ["Move each flange to mid-height, then add the centred web.", ""],
            ["Substitute the stated values and calculate.", "2 \\times  (30 \\times  4^{3} \\div  12 + 120 \\times  18^{2}) + 5 \\times  32^{3} \\div  12\\approx 91733.3\\;\\text{mm}^4\\text{}"],
          ], "91733.3 mm⁴"),
        ],
        practice: [
          pr("A symmetric section is 80 mm deep. Find its centroid height above the bottom in mm.", 40, "Use symmetry.", "80 ÷ 2 = 40 mm."),
          pr("A beam’s I doubles while E, span and load stay fixed. Find new deflection divided by old deflection.", 0.5, "Deflection varies inversely with I.", "1 ÷ 2 = 0.5."),
          pr("A beam sags 12 mm. The same material and loading with three times I gives what sag in mm?", 4, "Divide sag by the stiffness increase.", "12 ÷ 3 = 4 mm."),
          pr("A steel beam with E = 200 GPa and I = 40000 mm⁴ is replaced by aluminium with E = 70 GPa. What I in mm⁴ gives the same EI?", 114286, "Set old EI equal to new EI.", "200 × 40000 ÷ 70 ≈ 114286 mm⁴."),
        ],
      },
    ],
  },

  'phys-204': {
    predict: {
      q: "The bridge carries one load. You move it from the middle to a joint one quarter of the span from the left support. What share of the load reaches the left support?",
      options: ["One quarter","One half","The whole load","Three quarters"],
      answer: 3,
      reveal: "The nearby support carries more. Taking moments about the right support gives the left reaction as three quarters of the load, even when the diagonal pattern changes.",
    },
    parts: [
      {
        title: "A truss as one body",
        minutes: 25,
        explain: [
          "An ideal plane truss is made from straight members joined by frictionless pins. Loads act at joints, and member weight is neglected or assigned to joints. Each member then carries a pull or a push along its length.",
          "Before studying individual members, draw the whole truss. The internal member forces cancel in pairs, leaving external loads and support reactions. A pin and a roller usually provide three unknown reaction components in a flat problem.",
        ],
        formulas: [
          ["Support reactions","R_B=\\frac{Pa}{L},\\qquad R_A=P-R_B"],
        ],
        examples: [
          ex("A weightless 8 m truss carries 100 kN at 2 m from A. Find the reaction at B in kN.", [
            ["Take moments about A.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  2 \\div  8 = 25\\;\\text{kN}"],
          ], "25 kN"),
          ex("The same 100 kN load acts 2 m from A on an 8 m span. Find the reaction at A in kN.", [
            ["The two vertical reactions add to the load.", ""],
            ["Substitute the stated values and calculate.", "100 - 100 \\times  2 \\div  8 = 75\\;\\text{kN}"],
          ], "75 kN"),
        ],
        practice: [
          pr("A 60 kN load acts at the middle of a weightless truss. Find the left reaction in kN.", 30, "Use symmetry.", "60 ÷ 2 = 30 kN."),
          pr("A weightless 10 m truss carries 80 kN at 3 m from A. Find B’s reaction in kN.", 24, "Balance moments about A.", "80 × 3 ÷ 10 = 24 kN."),
          pr("A weightless 12 m truss carries 90 kN at 4 m from A. Find A’s reaction in kN.", 60, "Find B first, then use vertical balance.", "90 − 90 × 4 ÷ 12 = 60 kN."),
          pr("A weightless 8 m truss carries 40 kN at 2 m and 60 kN at 6 m from A. Find B’s reaction in kN.", 55, "Add the moments of both loads.", "(40 × 2 + 60 × 6) ÷ 8 = 55 kN."),
        ],
      },
      {
        title: "Balancing one joint",
        minutes: 25,
        explain: [
          "Isolate a joint and draw every force acting on it. Start by drawing unknown member forces away from the joint, as if they were pulling. A positive result means tension. A negative result means the actual force is compression.",
          "At each joint, horizontal parts add to zero and vertical parts add to zero. Start where there are at most two unknown member forces. Solve there, then carry each known force to the neighbouring joint with the opposite direction.",
        ],
        formulas: [
          ["Joint equilibrium","\\sum F_x=0,\\qquad\\sum F_y=0"],
        ],
        examples: [
          ex("At an apex, two identical bars slope down at 30° to horizontal and support a 100 kN downward load. Find each compressive force size in kN.", [
            ["Each compression force supplies an upward component.", ""],
            ["Substitute the stated values and calculate.", "100 \\div  (2 \\sin  30^{\\circ}) = 100\\;\\text{kN}"],
          ], "100 kN"),
          ex("At a support joint, the upward reaction is 30 kN. One diagonal at 30° balances it vertically and a horizontal member balances sideways. Find diagonal compression size in kN.", [
            ["Only the diagonal has a vertical component.", ""],
            ["Substitute the stated values and calculate.", "30 \\div  \\sin  30^{\\circ} = 60\\;\\text{kN}"],
          ], "60 kN"),
        ],
        practice: [
          pr("A joint has one 20 kN rightward force and one horizontal unknown force to balance it. Find the unknown force size in kN.", 20, "Horizontal components must cancel.", "Horizontal balance requires an equal leftward force, with size 20 kN."),
          pr("A diagonal force is 50 kN at 30° to horizontal. Find its vertical component size in kN.", 25, "Use the sine component.", "50 × sin 30° = 25 kN."),
          pr("At an apex, two equal bars at 45° to horizontal support an 80 kN downward load. Find each compression size in kN.", 56.5685, "Share the upward load between two inclined forces.", "80 ÷ (2 sin 45°) ≈ 56.5685 kN."),
          pr("A support joint has an upward reaction of 40 kN, a diagonal with rise/run = 3/4, and a horizontal tie. Find diagonal compression size in kN.", 66.6667, "A 3–4–5 triangle gives the diagonal’s vertical fraction.", "40 ÷ (3/5) ≈ 66.6667 kN."),
        ],
      },
      {
        title: "Zero forces and counting",
        minutes: 25,
        explain: [
          "Some members carry no force under a particular load. At an unloaded joint with just two non-collinear members, both forces are zero. At an unloaded joint with three members, two collinear, the third has zero force. A support reaction counts as a load here.",
          "Counting gives another useful warning. A simple stable plane truss with j joints, m members and r support reactions has m + r = 2j when all forces can be found by statics alone. The equality is necessary, but geometry must also prevent a mechanism. A zero-force member can still help under a different load or brace a compression member.",
        ],
        formulas: [
          ["Counting condition","m+r=2j"],
        ],
        examples: [
          ex("A candidate plane truss has 8 joints and 3 reaction components. How many members satisfy the counting condition?", [
            ["Subtract the reactions from twice the joint count.", ""],
            ["Substitute the stated values and calculate.", "2 \\times  8 - 3 = 13"],
          ], "13"),
          ex("An unloaded, unsupported joint has exactly two non-collinear members. How many of those members have zero force?", [
            ["Use both horizontal and vertical balance.", ""],
            ["Without an external load, neither non-collinear member can balance a force from the other. Both must carry zero force.", "F_1=F_2=0\\quad\\Rightarrow\\quad n=2"],
          ], "2"),
        ],
        practice: [
          pr("A candidate plane truss has 6 joints and 3 reaction components. Find the member count required by the counting condition.", 9, "Use m = 2j − r.", "2 × 6 − 3 = 9."),
          pr("A candidate plane truss has 13 members and 3 reaction components. How many joints satisfy the counting condition?", 8, "Use j = (m + r)/2.", "(13 + 3) ÷ 2 = 8."),
          pr("An unloaded, unsupported joint has three members, two collinear and one inclined. How many members are necessarily zero-force members?", 1, "Balance perpendicular to the collinear pair.", "The inclined member is the only member with a perpendicular component, so it must carry zero force. The necessary count is 1."),
          pr("A plane truss has 10 joints, 3 reactions and 15 members. How many members short of the counting equality is it?", 2, "Compare the required count with the given count.", "2 × 10 − 3 − 15 = 2."),
        ],
      },
      {
        title: "Cutting through members",
        minutes: 25,
        explain: [
          "The method of sections finds selected member forces without solving every joint. Imagine cutting through a few members and keep one side. Draw the cut forces and all external loads on that side.",
          "You have three independent equilibrium equations for that piece. A cut through at most three unknown member forces often works well. Take moments about the intersection of two cut force lines to remove both unknowns at once. Compression members also need checks against buckling, which comes later.",
        ],
        formulas: [
          ["Section equilibrium","\\sum F_x=0,\\quad\\sum F_y=0,\\quad\\sum M=0"],
          ["Chord force from a moment","F=\\frac{|M|}{h}"],
        ],
        examples: [
          ex("A truss section has an external moment of 120 kN m about a point where two cut forces intersect. The remaining horizontal chord is 3 m away. Find its force size in kN.", [
            ["Only the remaining chord supplies a moment about this point.", ""],
            ["Substitute the stated values and calculate.", "120 \\div  3 = 40\\;\\text{kN}"],
          ], "40 kN"),
          ex("The external moment to balance is 200 kN m. A horizontal cut member has a 4 m perpendicular lever arm. Find its force size in kN.", [
            ["Use moment divided by lever arm.", ""],
            ["Substitute the stated values and calculate.", "200 \\div  4 = 50\\;\\text{kN}"],
          ], "50 kN"),
        ],
        practice: [
          pr("A cut member acts 2 m from the chosen moment point and carries 30 kN perpendicularly. Find its moment size in kN m.", 60, "Multiply force by lever arm.", "2 × 30 = 60 kN m."),
          pr("A 90 kN m external moment is balanced by one cut chord 3 m from the moment point. Find the chord force size in kN.", 30, "Eliminate the other cut forces by choosing their intersection.", "90 ÷ 3 = 30 kN."),
          pr("For a section moment of 240 kN m, increasing chord separation from 3 m to 4 m gives what new chord force size in kN?", 60, "Use the new perpendicular separation.", "240 ÷ 4 = 60 kN."),
          pr("On the retained side, an upward 75 kN reaction acts 4 m from the moment point and a downward 100 kN load acts 1 m from it, producing opposite moments. A cut chord has a 2 m arm. Find chord force size in kN.", 100, "Subtract opposing external moments, then divide by the chord arm.", "|75 × 4 − 100 × 1| ÷ 2 = 100 kN."),
        ],
      },
    ],
  },

  'math-028': {
    predict: {
      q: "The three hardness groups have different mean hardnesses. Keep those means fixed but make the readings within each group much less scattered. What happens to the evidence that the means differ?",
      options: ["It becomes stronger","It becomes weaker","It stays unchanged","It proves every pair differs"],
      answer: 0,
      reveal: "Tighter groups make the same separation easier to distinguish from scatter. The F ratio rises, although the test still does not identify which pairs differ.",
    },
    parts: [
      {
        title: "Means and two kinds of scatter",
        minutes: 25,
        explain: [
          "A treatment is a condition being tested, such as a tempering temperature. A group contains measurements made under one treatment. The group mean is its average. The grand mean is the average of all observations, so larger groups get more weight.",
          "ANOVA asks whether the population means are all equal. A difference between sample means alone is not enough: repeated hardness readings also vary within each treatment. We compare variation between groups with variation inside them.",
        ],
        formulas: [
          ["Group and grand means","\\bar y_i=\\frac{\\sum_j y_{ij}}{n_i},\\qquad\\bar y=\\frac{\\sum_i n_i\\bar y_i}{N}"],
        ],
        examples: [
          ex("Hardness readings are 40, 42 and 44 HRC. Find the group mean in HRC.", [
            ["Add the readings and divide by their count.", ""],
            ["Substitute the stated values and calculate.", "(40 + 42 + 44) \\div  3 = 42\\;\\text{HRC}"],
          ], "42 HRC"),
          ex("One group has 2 readings with mean 40 HRC; another has 4 readings with mean 46 HRC. Find the grand mean in HRC.", [
            ["Weight each group mean by its number of readings.", ""],
            ["Substitute the stated values and calculate.", "(2 \\times  40 + 4 \\times  46) \\div  6 = 44\\;\\text{HRC}"],
          ], "44 HRC"),
        ],
        practice: [
          pr("Readings are 30 and 34 HRC. Find their mean in HRC.", 32, "Average the two readings.", "(30 + 34) ÷ 2 = 32 HRC."),
          pr("Three equal-sized groups have means 40, 45 and 50 HRC. Find the grand mean in HRC.", 45, "Equal group sizes allow an ordinary average.", "(40 + 45 + 50) ÷ 3 = 45 HRC."),
          pr("A group has readings 38, 40, 42 and 44 HRC. Find its mean in HRC.", 41, "Sum all four readings.", "(38 + 40 + 42 + 44) ÷ 4 = 41 HRC."),
          pr("A group of 3 has mean 36 HRC and a group of 6 has mean 42 HRC. Find the grand mean in HRC.", 40, "Use observation counts as weights.", "(3 × 36 + 6 × 42) ÷ 9 = 40 HRC."),
        ],
      },
      {
        title: "Splitting sums of squares",
        minutes: 25,
        explain: [
          "A sum of squares adds squared distances. Between-group SS uses the distance from each group mean to the grand mean, multiplied by group size. Within-group SS uses the distance of every observation from its own group mean.",
          "Total SS uses each observation’s distance from the grand mean. It equals between SS plus within SS. Squaring prevents positive and negative departures from cancelling. The units are squared response units, such as HRC squared.",
        ],
        formulas: [
          ["Between groups","SS_B=\\sum_i n_i(\\bar y_i-\\bar y)^2"],
          ["Within groups","SS_W=\\sum_i\\sum_j(y_{ij}-\\bar y_i)^2"],
          ["Total","SS_T=SS_B+SS_W"],
        ],
        examples: [
          ex("Two groups each have 3 readings. Their means are 40 and 44 HRC; the grand mean is 42 HRC. Find between-group SS in HRC².", [
            ["Square each mean’s departure and weight by group size.", ""],
            ["Substitute the stated values and calculate.", "3 \\times  (40 - 42)^{2} + 3 \\times  (44 - 42)^{2} = 24\\;\\text{HRC}^2\\text{}"],
          ], "24 HRC²"),
          ex("A group has readings 38, 40 and 42 HRC with mean 40 HRC. Find its within-group SS contribution in HRC².", [
            ["Use departures from this group’s own mean.", ""],
            ["Substitute the stated values and calculate.", "(38 - 40)^{2} + (40 - 40)^{2} + (42 - 40)^{2} = 8\\;\\text{HRC}^2\\text{}"],
          ], "8 HRC²"),
        ],
        practice: [
          pr("A group has two readings, 9 and 11 MPa, with mean 10 MPa. Find its within-group SS contribution in MPa².", 2, "Square and add the two departures.", "(9 − 10)² + (11 − 10)² = 2 MPa²."),
          pr("Between SS is 24 HRC² and within SS is 18 HRC². Find total SS in HRC².", 42, "Add the two contributions.", "24 + 18 = 42 HRC²."),
          pr("Total SS is 90 MPa² and within SS is 30 MPa². Find between SS in MPa².", 60, "Rearrange the SS decomposition.", "90 − 30 = 60 MPa²."),
          pr("Three groups each have 4 readings and means 10, 12 and 14 MPa. The grand mean is 12 MPa. Find between SS in MPa².", 32, "Weight each squared departure by four.", "4 × [(10 − 12)² + (12 − 12)² + (14 − 12)²] = 32 MPa²."),
        ],
      },
      {
        title: "Mean squares and F",
        minutes: 25,
        explain: [
          "A sum of squares grows with the number of observations. Divide by degrees of freedom to get a mean square. With k groups and N independent observations, between groups has k − 1 degrees of freedom and within groups has N − k.",
          "The F statistic is between mean square divided by within mean square. Under equal population means, both mean squares estimate the same error variance, so their ratio is often near one. It is not fixed at one. If the observed group means happen to be identical, between SS and F are zero.",
        ],
        formulas: [
          ["Mean squares","MS_B=\\frac{SS_B}{k-1},\\qquad MS_W=\\frac{SS_W}{N-k}"],
          ["F statistic","F=\\frac{MS_B}{MS_W}"],
        ],
        examples: [
          ex("There are 3 groups and 15 observations. Find within-group degrees of freedom.", [
            ["Subtract group count from observation count.", ""],
            ["Substitute the stated values and calculate.", "15 - 3 = 12"],
          ], "12"),
          ex("Between SS = 60, within SS = 36, k = 3 and N = 15. Find F.", [
            ["Find the degrees of freedom for each source of variation.", "df_B=3-1=2,\\qquad df_W=15-3=12"],
            ["Divide the between-group sum of squares by its degrees of freedom.", "MS_B=60/2=30"],
            ["Do the same for the within-group variation.", "MS_W=36/12=3"],
            ["Divide between mean square by within mean square.", "F=30/3=10"],
          ], "10"),
        ],
        practice: [
          pr("An experiment compares 4 groups. Find between-group degrees of freedom.", 3, "Subtract one from the group count.", "4 − 1 = 3."),
          pr("Within SS = 48 MPa² and within degrees of freedom = 12. Find within mean square in MPa².", 4, "Divide SS by degrees of freedom.", "48 ÷ 12 = 4 MPa²."),
          pr("Between mean square = 20 and within mean square = 4. Find F.", 5, "Put between in the numerator.", "20 ÷ 4 = 5."),
          pr("Between SS = 96, within SS = 60, k = 4 and N = 24. Find F.", 10.6667, "Find both mean squares using the corresponding degrees of freedom.", "(96 ÷ 3) ÷ (60 ÷ 20) ≈ 10.6667."),
        ],
      },
      {
        title: "Decisions and fair comparisons",
        minutes: 25,
        explain: [
          "Choose a significance level before looking at results. A p-value is the probability, assuming equal population means and the model assumptions, of an F statistic at least as large as observed. It is not the probability that the equal-means claim is true.",
          "Ordinary one-way ANOVA assumes independent errors, roughly normal errors within treatments, and similar error variances. Randomly assign specimens to treatments. Inspect residuals, which are observations minus fitted group means. A significant result says at least one mean differs; adjusted follow-up comparisons are needed to locate differences.",
          "For the animation’s three groups of ten, the F distribution has degrees of freedom 2 and 27. Its upper-tail probability has the simple formula below. Use that formula only for these degrees of freedom. Tighter measurement scatter can reveal a difference without changing the group means.",
        ],
        formulas: [
          ["Residual","e_{ij}=y_{ij}-\\bar y_i"],
          ["Tail probability for 2 and 27 degrees of freedom","p=\\left(1+\\frac{2F}{27}\\right)^{-27/2}"],
        ],
        examples: [
          ex("A specimen measures 46 HRC; its fitted group mean is 43 HRC. Find its signed residual in HRC.", [
            ["Subtract the fitted group mean from the observation.", ""],
            ["Substitute the stated values and calculate.", "46 - 43 = 3\\;\\text{HRC}"],
          ], "3 HRC"),
          ex("For degrees of freedom 2 and 27, F = 10. Use the stated tail formula to find p.", [
            ["Insert F into the tail probability formula.", ""],
            ["Substitute the stated values and calculate.", "(1 + 2 \\times  10 \\div  27)^{-27/2}\\approx 0.000562458"],
          ], "0.000562458"),
        ],
        practice: [
          pr("A specimen measures 38 HRC; its group mean is 40 HRC. Find the residual in HRC.", -2, "Keep the sign.", "38 − 40 = -2 HRC."),
          pr("Four treatments are compared. How many distinct treatment pairs could be checked afterwards?", 6, "Each pair uses two treatments; avoid counting it twice.", "4 × 3 ÷ 2 = 6."),
          pr("For degrees of freedom 2 and 27, F = 4. Find p with the stated formula.", 0.0300949, "Use the F value without rounding the intermediate result.", "(1 + 2 × 4 ÷ 27)^(−27/2) ≈ 0.0300949."),
          pr("In the scene, F = 10d²/s², where d is the mean gap and s the within-group scatter. With d = 1.5 HRC and s = 2 HRC, find F.", 5.625, "Square both the gap and scatter.", "10 × 1.5² ÷ 2² = 5.625."),
        ],
      },
    ],
  },

  'math-029': {
    predict: {
      q: "On the experiment cube, suppose raising temperature softens the steel at short times but hardens it by the same amount at long times. What could the average temperature effect be?",
      options: ["Always positive","Exactly zero","Always negative","Equal to the final hardness"],
      answer: 1,
      reveal: "The opposite changes can cancel in the average. That hides a strong interaction: the effect of temperature depends on time, so comparing both settings together matters.",
    },
    parts: [
      {
        title: "Every combination gets a trial",
        minutes: 25,
        explain: [
          "A factor is something deliberately changed, such as temperature or holding time. A level is one chosen setting of a factor. The response is what is measured, such as hardness. A full factorial experiment includes every combination of the levels.",
          "With two levels for each factor, the number of combinations doubles whenever a factor is added. A cube represents three factors: each corner is one combination. One complete repeat uses fresh specimens at every corner, allowing experimental scatter to be estimated.",
        ],
        formulas: [
          ["Two levels per factor","N_{\\mathrm{combinations}}=2^k"],
          ["Replicated design","N_{\\mathrm{runs}}=r\\,2^k"],
        ],
        examples: [
          ex("Three factors each have two levels. How many combinations are in the full factorial?", [
            ["Multiply the number of levels for each factor.", ""],
            ["Substitute the stated values and calculate.", "2^{3} = 8"],
          ], "8"),
          ex("A two-factor, two-level experiment is repeated independently three times. How many specimen runs are needed?", [
            ["Multiply a complete set of combinations by the repeat count.", ""],
            ["Substitute the stated values and calculate.", "3 \\times  2^{2} = 12"],
          ], "12"),
        ],
        practice: [
          pr("Two factors each have two levels. How many combinations are needed?", 4, "Choose a level of each factor.", "2² = 4."),
          pr("Four factors each have two levels. How many combinations are needed?", 16, "Use two to the number of factors.", "2⁴ = 16."),
          pr("Three two-level factors are tested with two independent specimens per combination. How many runs are needed?", 16, "Count all corners in both repeats.", "2 × 2³ = 16."),
          pr("Temperature has 3 levels, time has 2 and cooling has 2. How many full-factorial combinations are needed?", 12, "Multiply the level counts, even when they differ.", "3 × 2 × 2 = 12."),
        ],
      },
      {
        title: "Measuring a main effect",
        minutes: 25,
        explain: [
          "A main effect is the average response with a factor high minus the average response with that factor low. Average over all the other factors. A negative hardness effect means the high setting gives softer specimens on average.",
          "In a balanced two-level design, each factor is high in half the combinations and low in half. The same observations help estimate several effects. Do not confuse the main effect with the response itself, or with a change observed at only one setting of another factor.",
        ],
        formulas: [
          ["Main effect","E_A=\\bar y_{A+}-\\bar y_{A-}"],
        ],
        examples: [
          ex("Mean hardness is 40 HRC with temperature high and 48 HRC with temperature low. Find the temperature effect in HRC.", [
            ["Subtract the low-setting mean from the high-setting mean.", ""],
            ["Substitute the stated values and calculate.", "40 - 48 = -8\\;\\text{HRC}"],
          ], "-8 HRC"),
          ex("At A high the responses are 30 and 34 MPa; at A low they are 24 and 28 MPa. Find the A effect in MPa.", [
            ["Average each side before subtracting.", ""],
            ["Substitute the stated values and calculate.", "(30 + 34) \\div  2 - (24 + 28) \\div  2 = 6\\;\\text{MPa}"],
          ], "6 MPa"),
        ],
        practice: [
          pr("Mean yield is 18 g at high and 15 g at low. Find the main effect in g.", 3, "Use high minus low.", "18 − 15 = 3 g."),
          pr("Mean hardness is 42 HRC at high and 46 HRC at low. Find the main effect in HRC.", -4, "A reduction gives a negative effect.", "42 − 46 = -4 HRC."),
          pr("A-high readings are 40, 42, 44 and 46 HRC; the A-low mean is 48 HRC. Find the A effect in HRC.", -5, "Average all four high readings.", "(40 + 42 + 44 + 46) ÷ 4 − 48 = -5 HRC."),
          pr("B-high responses total 180 MPa over 4 runs; B-low responses total 164 MPa over 4 runs. Find the B effect in MPa.", 4, "Convert both totals into means.", "180 ÷ 4 − 164 ÷ 4 = 4 MPa."),
        ],
      },
      {
        title: "When factors work together",
        minutes: 25,
        explain: [
          "An interaction means the effect of one factor changes when another factor changes. Imagine a temperature increase that does almost nothing during a short hold but strongly softens the steel during a long hold. One overall temperature effect cannot describe both situations.",
          "For two levels of A and B, call the responses y₋₋, y₊₋, y₋₊ and y₊₊. The first sign refers to A. The conventional AB effect is half the difference between the A effects at B high and B low. Equivalently, compare the average at matching signs with the average at mixed signs.",
        ],
        formulas: [
          ["Interaction effect","E_{AB}=\\frac{(y_{++}-y_{-+})-(y_{+-}-y_{--})}{2}"],
        ],
        examples: [
          ex("The A effect is +8 MPa at B high and 0 MPa at B low. Find the conventional AB effect in MPa.", [
            ["Take half the difference between the two A effects.", ""],
            ["Substitute the stated values and calculate.", "(8 - 0) \\div  2 = 4\\;\\text{MPa}"],
          ], "4 MPa"),
          ex("Responses y₋₋, y₊₋, y₋₊, y₊₊ are 10, 14, 12 and 24 MPa. Find the AB effect in MPa.", [
            ["Find the A change at each B setting, then compare.", ""],
            ["Substitute the stated values and calculate.", "[(24 - 12) - (14 - 10)] \\div  2 = 4\\;\\text{MPa}"],
          ], "4 MPa"),
        ],
        practice: [
          pr("The A effect is 6 MPa at both B levels. Find AB in MPa.", 0, "Identical changes mean no interaction.", "(6 − 6) ÷ 2 = 0 MPa.", { tol: 0.000001 }),
          pr("The A effect is 10 MPa at B high and 2 MPa at B low. Find AB in MPa.", 4, "Use half the difference.", "(10 − 2) ÷ 2 = 4 MPa."),
          pr("The A effect is −12 HRC at B high and −4 HRC at B low. Find AB in HRC.", -4, "Keep the negative signs when subtracting.", "[−12 − (−4)] ÷ 2 = -4 HRC."),
          pr("At B low, raising A changes hardness by −6 HRC; at B high it changes hardness by +6 HRC. With equal weighting, find the main A effect in HRC.", 0, "Average the two conditional effects; they can cancel.", "(−6 + 6) ÷ 2 = 0 HRC.", { tol: 0.000001 }),
        ],
      },
      {
        title: "Planning and interpreting a design",
        minutes: 25,
        explain: [
          "Randomise run order so that furnace drift or changing room conditions do not consistently favour one setting. Replicate with independent specimens to estimate experimental error. Repeated readings of the same specimen measure reading repeatability, which is a different source of variation.",
          "If specimens come from different batches, blocking can keep batch variation separate from treatment comparisons. Place a balanced set of treatments within each block. Centre points, halfway between high and low settings, can reveal curvature that two levels alone miss.",
          "A simple fitted model uses a and b equal to −1 at low and +1 at high. Its coefficients for the main effects and interaction are half the corresponding effects. Use it within the tested region, and make confirmation specimens before adopting the suggested heat treatment.",
        ],
        formulas: [
          ["Two-factor response model","\\hat y=b_0+b_Aa+b_Bb+b_{AB}ab"],
          ["Effect and coefficient","b_A=E_A/2"],
        ],
        examples: [
          ex("A fitted model has grand mean 40 HRC and A effect −8 HRC. Find b_A in HRC.", [
            ["The coefficient is half the high-minus-low effect.", ""],
            ["Substitute the stated values and calculate.", "-8 \\div  2 = -4\\;\\text{HRC}"],
          ], "-4 HRC"),
          ex("Use ŷ = 40 − 4a − 2b − ab HRC at a = +1 and b = +1. Find predicted hardness in HRC.", [
            ["Substitute both high settings, including their product.", ""],
            ["Substitute the stated values and calculate.", "40 - 4(1) - 2(1) - (1)(1) = 33\\;\\text{HRC}"],
          ], "33 HRC"),
        ],
        practice: [
          pr("An experiment has 8 combinations and 3 independent replicates per combination. Find the total specimen count.", 24, "Multiply combinations by specimens per combination.", "8 × 3 = 24."),
          pr("A main effect is +6 MPa. Find its fitted coefficient in MPa.", 3, "Divide the effect by two.", "6 ÷ 2 = 3 MPa."),
          pr("A factor’s low temperature is 600 °C and its high temperature is 800 °C. Find the centre-point temperature in °C.", 700, "Use the midpoint of the two settings.", "(600 + 800) ÷ 2 = 700 °C."),
          pr("Use ŷ = 40 − 4a − 2b − ab HRC at a = −1 and b = +1. Find predicted hardness in HRC.", 43, "Include the sign of the interaction product.", "40 − 4(−1) − 2(1) − (−1)(1) = 43 HRC."),
        ],
      },
    ],
  },

  'eng-004': {
    predict: {
      q: "In discount mode, ₱110,000 arrives in two years. Which yearly compound rate makes it worth ₱100,000 today, assuming no fees or tax?",
      options: ["About 10%","About 2.5%","About 4.9%","About 20%"],
      answer: 2,
      reveal: "The money needs to grow by ten per cent over two years, with interest earning interest. The yearly rate is slightly below five per cent because the second year also earns interest on the first year’s gain.",
    },
    parts: [
      {
        title: "Simple and compound growth",
        minutes: 25,
        explain: [
          "Principal P is the amount at the start. Interest is payment for the use of money over time. A rate of five per cent per year means a yearly fraction of 0.05. Keep the rate period and the number of periods consistent.",
          "Simple interest pays on the starting principal only. Compound interest adds each period’s interest to the balance, so later interest is calculated on a larger amount. The following are hypothetical fixed-rate examples with no fees, withdrawals or taxes.",
        ],
        formulas: [
          ["Simple growth","F=P(1+ni)"],
          ["Compound growth","F=P(1+i)^n"],
        ],
        examples: [
          ex("Find the future balance in pesos of ₱10000 at 10% simple interest per year for 2 years.", [
            ["Use the starting principal for every year’s interest.", ""],
            ["Substitute the stated values and calculate.", "10000 \\times  (1 + 2 \\times  0.10) = 12000\\;\\text{pesos}"],
          ], "12000 pesos"),
          ex("Find the future balance in pesos of ₱10000 at 10% compound interest per year for 2 years.", [
            ["Apply the growth factor once per year.", ""],
            ["Substitute the stated values and calculate.", "10000 \\times  1.10^{2} = 12100\\;\\text{pesos}"],
          ], "12100 pesos"),
        ],
        practice: [
          pr("A ₱2000 balance earns 5% for one year. Find the interest earned in pesos.", 100, "Multiply principal by the yearly rate.", "2000 × 0.05 = 100 pesos."),
          pr("Find the balance in pesos of ₱5000 at 8% compound interest for one year.", 5400, "Multiply by one plus the rate.", "5000 × 1.08 = 5400 pesos."),
          pr("Find the balance in pesos of ₱20000 at 6% compound interest per year for 3 years.", 23820.3, "Use a growth factor for each year.", "20000 × 1.06³ ≈ 23820.3 pesos."),
          pr("For ₱10000 at 10% per year over 3 years, find compound balance minus simple balance in pesos.", 310, "Calculate both balances at the same future date.", "10000 × 1.10³ − 10000 × (1 + 3 × 0.10) = 310 pesos."),
        ],
      },
      {
        title: "Bringing money back to today",
        minutes: 25,
        explain: [
          "Present worth P is the amount today equivalent to a future payment F at a stated rate. Discounting reverses compound growth: divide by the growth factor. A payment further away has lower present worth when the rate is positive.",
          "Draw a time line before comparing payments. Put today at time zero and mark when each payment happens. Money received is positive and money paid is negative. Move amounts to one common date before adding them. A materials lab can use this to compare paying for a furnace now with paying later.",
        ],
        formulas: [
          ["Present worth","P=\\frac{F}{(1+i)^n}"],
          ["Rate from two equivalent amounts","i=\\left(\\frac FP\\right)^{1/n}-1"],
        ],
        examples: [
          ex("Find the present worth in pesos of ₱12100 due in 2 years at 10% per year.", [
            ["Divide by the two-year growth factor.", ""],
            ["Substitute the stated values and calculate.", "12100 \\div  1.10^{2} = 10000\\;\\text{pesos}"],
          ], "10000 pesos"),
          ex("What annual compound rate, in per cent, makes ₱110000 in 2 years equivalent to ₱100000 today?", [
            ["Take the square root of the future-to-present ratio.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  [\\sqrt{110000 \\div  100000} - 1]\\approx 4.88088\\;\\text{\\%}"],
          ], "4.88088 %"),
        ],
        practice: [
          pr("Find today’s equivalent in pesos of ₱1100 in one year at 10%.", 1000, "Discount one year.", "1100 ÷ 1.10 = 1000 pesos."),
          pr("Find today’s equivalent in pesos of ₱14400 in 2 years at 20% per year.", 10000, "Use two periods of discounting.", "14400 ÷ 1.20² = 10000 pesos."),
          pr("Find the present worth in pesos of ₱110000 in 2 years at 8% per year.", 94307.3, "The rate is a yearly decimal fraction.", "110000 ÷ 1.08² ≈ 94307.3 pesos."),
          pr("A project pays ₱1100 at year 1 and ₱1210 at year 2. At 10% per year, find their combined present worth in pesos.", 2000, "Discount each payment by its own time, then add.", "1100 ÷ 1.10 + 1210 ÷ 1.10² = 2000 pesos."),
        ],
      },
      {
        title: "Equal yearly payments",
        minutes: 25,
        explain: [
          "An annuity is an equal payment A repeated at regular intervals. Here every payment occurs at the end of a year, starting one year from today. Each payment has a different discount distance, even though the amounts are equal.",
          "The present-worth factor adds all those discounted payments. The capital-recovery factor reverses the relation: it finds the yearly payment equivalent to an initial amount. These relations help plan a lab equipment loan or a regular maintenance fund. At zero interest, present worth is simply the payment times the count.",
        ],
        formulas: [
          ["End-of-year annuity","P=A\\frac{1-(1+i)^{-n}}{i}"],
          ["Equal payment from principal","A=P\\frac{i}{1-(1+i)^{-n}}"],
        ],
        examples: [
          ex("A fund pays ₱1000 at each year-end for 2 years. At 10% per year, find its present worth in pesos.", [
            ["Discount both payments, or use the annuity factor.", ""],
            ["Substitute the stated values and calculate.", "1000 \\times  [1 - 1.10^{-2}] \\div  0.10\\approx 1735.54\\;\\text{pesos}"],
          ], "1735.54 pesos"),
          ex("A ₱10000 loan is repaid with 2 equal year-end payments at 10% per year. Find each payment in pesos.", [
            ["Divide principal by the annuity present-worth factor.", ""],
            ["Substitute the stated values and calculate.", "10000 \\times  0.10 \\div  [1 - 1.10^{-2}]\\approx 5761.9\\;\\text{pesos}"],
          ], "5761.9 pesos"),
        ],
        practice: [
          pr("At zero interest, four year-end payments of ₱500 have what present worth in pesos?", 2000, "With no interest, no payment is discounted.", "4 × 500 = 2000 pesos."),
          pr("Using a stated present-worth annuity factor of 3.2, find the present worth in pesos of yearly payments of ₱2000.", 6400, "Multiply the yearly amount by the given factor.", "2000 × 3.2 = 6400 pesos."),
          pr("Find the present worth in pesos of ₱3000 paid at each year-end for 3 years at 8% per year.", 7731.29, "Use the factor for three year-end payments.", "3000 × [1 − 1.08^(−3)] ÷ 0.08 ≈ 7731.29 pesos."),
          pr("A lab borrows ₱50000 and repays it over 5 equal year-end payments at 6% per year. Find the yearly payment in pesos.", 11869.8, "Use the capital-recovery relation.", "50000 × 0.06 ÷ [1 − 1.06^(−5)] ≈ 11869.8 pesos."),
        ],
      },
      {
        title: "Rates, periods and purchasing power",
        minutes: 25,
        explain: [
          "A nominal annual rate quoted with monthly compounding must be divided into monthly periods. The effective annual rate is the actual yearly growth after all those compounding steps. Do not put a monthly rate into a formula with a count in years.",
          "Inflation measures a rise in prices, which reduces purchasing power. A real return compares money growth with price growth: divide the money growth factor by the price growth factor. Keep constant-purchasing-power cash flows with real rates, and cash flows including inflation with rates that include it.",
        ],
        formulas: [
          ["Effective yearly rate","i_{\\mathrm{eff}}=\\left(1+\\frac jm\\right)^m-1"],
          ["Real rate","1+i_{\\mathrm{real}}=\\frac{1+i_{\\mathrm{money}}}{1+f}"],
        ],
        examples: [
          ex("A nominal annual rate is 12%, compounded monthly. Find the monthly rate in per cent.", [
            ["Divide the annual nominal percentage by the number of months.", ""],
            ["Substitute the stated values and calculate.", "12 \\div  12 = 1\\;\\text{\\%}"],
          ], "1 %"),
          ex("Money earns 10% over a year while prices rise 5%. Find the real return in per cent.", [
            ["Compare growth factors rather than subtracting percentages.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  (1.10 \\div  1.05 - 1)\\approx 4.7619\\;\\text{\\%}"],
          ], "4.7619 %"),
        ],
        practice: [
          pr("How many monthly periods are there in 3 years?", 36, "Use twelve periods per year.", "3 × 12 = 36."),
          pr("At 1% per month, find the balance in pesos of ₱10000 after 6 months.", 10615.2, "Use six monthly growth factors.", "10000 × 1.01⁶ ≈ 10615.2 pesos."),
          pr("Find the effective annual rate in per cent for a nominal 12% compounded monthly.", 12.6825, "Compound the monthly rate for a full year.", "100 × (1.01¹² − 1) ≈ 12.6825 %."),
          pr("A material costs ₱1000 today and its price rises 4% each year. Find its expected price in pesos after 3 years under this assumption.", 1124.86, "Compound the price increase over three years.", "1000 × 1.04³ ≈ 1124.86 pesos."),
        ],
      },
    ],
  },

  'eng-005': {
    predict: {
      q: "The efficient furnace costs more now but saves fuel every year. In the animation, you raise the interest rate while keeping prices and fuel bills fixed. Which way should the choice shift?",
      options: ["Towards the efficient furnace","Towards an exact tie at all rates","Towards buying both furnaces","Towards the cheaper furnace"],
      answer: 3,
      reveal: "A higher discount rate gives future fuel savings less weight today. That makes the lower purchase price more attractive and can reverse the choice.",
    },
    parts: [
      {
        title: "Compare the same service",
        minutes: 25,
        explain: [
          "A cheap purchase can be expensive to own. A fair comparison starts with alternatives that provide the required service, capacity and quality over the same study period. Include installation, running costs, maintenance and any end-of-period resale value.",
          "Use one discount rate and one time reference. In this class, a cost total is written as a positive amount. Future resale value reduces that cost total. Assume the listed prices and cash flows are known estimates, with no extra taxes or financing charges unless stated.",
        ],
        formulas: [
          ["Present worth of costs","PW=C_0+\\sum_{t=1}^{n}\\frac{C_t}{(1+i)^t}-\\frac{S}{(1+i)^n}"],
        ],
        examples: [
          ex("A machine costs ₱10000 now and ₱2200 in running costs after one year. At 10%, find the present worth of costs in pesos.", [
            ["Discount the future bill and add the purchase price.", ""],
            ["Substitute the stated values and calculate.", "10000 + 2200 \\div  1.10 = 12000\\;\\text{pesos}"],
          ], "12000 pesos"),
          ex("A fixture costs ₱20000 now and is resold for ₱6050 after 2 years. At 10%, find its net present cost in pesos, ignoring other costs.", [
            ["Resale value is a benefit, so subtract its present worth.", ""],
            ["Substitute the stated values and calculate.", "20000 - 6050 \\div  1.10^{2} = 15000\\;\\text{pesos}"],
          ], "15000 pesos"),
        ],
        practice: [
          pr("Installation costs ₱3000 and the equipment costs ₱12000, both today. Find the initial cost in pesos.", 15000, "Both costs occur at the same time.", "3000 + 12000 = 15000 pesos."),
          pr("A ₱5500 maintenance bill occurs after one year. At 10%, find its present cost in pesos.", 5000, "Discount the bill for one year.", "5500 ÷ 1.10 = 5000 pesos."),
          pr("A machine costs ₱30000 now, needs ₱2420 after 2 years and has no resale value. At 10%, find its present cost in pesos.", 32000, "Use two discount periods for the maintenance bill.", "30000 + 2420 ÷ 1.10² = 32000 pesos."),
          pr("A machine costs ₱40000 now, needs ₱5500 after 1 year and is sold for ₱12100 after 2 years. At 10%, find net present cost in pesos.", 35000, "Add discounted costs and subtract discounted resale value.", "40000 + 5500 ÷ 1.10 − 12100 ÷ 1.10² = 35000 pesos."),
        ],
      },
      {
        title: "Running costs over a lifetime",
        minutes: 25,
        explain: [
          "When the same running cost A occurs at every year-end, use the annuity factor from the interest class. Add its present worth to the initial cost. The lower cost wins only if both options meet the same service requirements.",
          "For the furnace scene, both furnaces run for ten years with no resale value. Furnace A costs ₱2 million and uses ₱0.60 million each year. B costs ₱3.2 million and uses ₱0.35 million each year. B starts higher but accumulates discounted costs more slowly.",
        ],
        formulas: [
          ["Uniform running cost","PW=C_0+A\\frac{1-(1+i)^{-n}}{i}"],
        ],
        examples: [
          ex("Using millions of pesos, find furnace A’s present cost over 10 years at 10%: C₀ = 2 and yearly cost = 0.60.", [
            ["Multiply the yearly bill by the ten-year annuity factor.", ""],
            ["Substitute the stated values and calculate.", "2 + 0.60 \\times  [1 - 1.10^{-10}] \\div  0.10\\approx 5.68674\\;\\text{million pesos}"],
          ], "5.68674 million pesos"),
          ex("Using millions of pesos, find furnace B’s present cost over 10 years at 10%: C₀ = 3.2 and yearly cost = 0.35.", [
            ["Use the same factor and study period as for A.", ""],
            ["Substitute the stated values and calculate.", "3.2 + 0.35 \\times  [1 - 1.10^{-10}] \\div  0.10\\approx 5.3506\\;\\text{million pesos}"],
          ], "5.3506 million pesos"),
        ],
        practice: [
          pr("A stated annuity factor is 4. Costs are ₱10000 now and ₱2000 each year. Find present cost in pesos.", 18000, "Use the supplied factor for the recurring bill.", "10000 + 2000 × 4 = 18000 pesos."),
          pr("Two designs have present costs of ₱55000 and ₱48000. Find the cost saving in pesos from choosing the cheaper one.", 7000, "Subtract the smaller total from the larger.", "55000 − 48000 = 7000 pesos."),
          pr("A handrail costs ₱100000 now and ₱30000 at each year-end for 10 years. At 8%, find present cost in pesos.", 301302, "Discount all ten upkeep payments using the annuity factor.", "100000 + 30000 × [1 − 1.08^(−10)] ÷ 0.08 ≈ 301302 pesos."),
          pr("Furnace A costs 2 million now and 0.60 million yearly; B costs 3.2 million now and 0.35 million yearly. Over 10 years at 10%, find A’s present cost minus B’s, in million pesos.", 0.336142, "Compare totals using the same rate and horizon.", "(2 − 3.2) + (0.60 − 0.35) × [1 − 1.10^(−10)] ÷ 0.10 ≈ 0.336142 million pesos."),
        ],
      },
      {
        title: "Annual worth and different lives",
        minutes: 25,
        explain: [
          "Annual worth turns present cost into an equivalent equal year-end cost over the study period. For alternatives covering the same service period, lower present cost and lower annual cost give the same ranking.",
          "If equipment lives differ, choose a common study period and include replacements and resale values at their actual times. An alternative is to compare annual worth over each life when identical replacement cycles can reasonably be repeated indefinitely. Do not silently compare a short service with a long one.",
        ],
        formulas: [
          ["Equivalent annual cost","AW=PW\\frac{i}{1-(1+i)^{-n}}"],
          ["Zero-rate annual cost","AW=\\frac{PW}{n}\\quad(i=0)"],
        ],
        examples: [
          ex("An asset’s present cost is ₱10000 for a 2-year service period at 10%. Find equivalent annual cost in pesos per year.", [
            ["Divide present cost by the annuity factor.", ""],
            ["Substitute the stated values and calculate.", "10000 \\times  0.10 \\div  [1 - 1.10^{-2}]\\approx 5761.9\\;\\text{pesos/year}"],
          ], "5761.9 pesos/year"),
          ex("At zero interest, an asset costs ₱12000 and lasts 4 years with no upkeep or resale. Find its annual cost in pesos per year.", [
            ["Spread the cost evenly when the rate is zero.", ""],
            ["Substitute the stated values and calculate.", "12000 \\div  4 = 3000\\;\\text{pesos/year}"],
          ], "3000 pesos/year"),
        ],
        practice: [
          pr("A present cost is ₱30000 and the supplied capital-recovery factor is 0.25 per year. Find annual cost in pesos per year.", 7500, "Multiply present worth by the supplied recovery factor.", "30000 × 0.25 = 7500 pesos/year."),
          pr("A 3-year machine is replaced identically over a 6-year study. Counting the original purchase and the replacement at year 3, how many purchases are needed?", 2, "Count full service lives inside the study period.", "6 ÷ 3 = 2."),
          pr("A replacement costs ₱12100 at year 2. At 10%, find its present cost in pesos.", 10000, "Treat the replacement as a dated future payment.", "12100 ÷ 1.10² = 10000 pesos."),
          pr("A 2-year machine costs ₱10000 now and an identical replacement costs ₱10000 at year 2. Over 4 years at 10%, find purchase-only present cost in pesos; assume zero resale.", 18264.5, "Include the initial and replacement purchases, with no purchase at the study end.", "10000 + 10000 ÷ 1.10² ≈ 18264.5 pesos."),
        ],
      },
      {
        title: "Break-even and uncertain estimates",
        minutes: 25,
        explain: [
          "Break-even is the point where two total costs are equal. It can refer to output, fuel price or the discount rate. With fixed cost C and variable cost v per item, total cost for Q items is C + vQ.",
          "For an upgrade, compare its extra initial cost with the present worth of its future savings. Simple payback divides extra cost by yearly savings but ignores interest and later cash flows. Use it as a rough timing measure, then check present worth.",
          "Cost estimates are uncertain. Change one important assumption over a plausible range and see whether the preferred alternative changes. This is sensitivity analysis. For the furnace comparison, raising the rate reduces the value of later savings and can favour A.",
        ],
        formulas: [
          ["Output break-even","Q^*=\\frac{C_B-C_A}{v_A-v_B}"],
          ["Simple payback","t_p=\\frac{\\Delta C_0}{\\Delta A}"],
        ],
        examples: [
          ex("A process costs ₱10000 fixed plus ₱5 per item; B costs ₱16000 fixed plus ₱3 per item. Find break-even output in items.", [
            ["Divide extra fixed cost by saving per item.", ""],
            ["Substitute the stated values and calculate.", "(16000 - 10000) \\div  (5 - 3) = 3000\\;\\text{items}"],
          ], "3000 items"),
          ex("An efficient furnace costs an extra ₱1200000 and saves ₱250000 per year. Find simple payback in years.", [
            ["Use extra purchase cost divided by annual saving.", ""],
            ["Substitute the stated values and calculate.", "1200000 \\div  250000 = 4.8\\;\\text{years}"],
          ], "4.8 years"),
        ],
        practice: [
          pr("A coating upgrade costs an extra ₱60000 and saves ₱15000 per year. Find simple payback in years.", 4, "This rough measure ignores interest.", "60000 ÷ 15000 = 4 years."),
          pr("An upgrade costs ₱100000 extra and saves ₱30000 yearly. A supplied annuity factor is 4. Find present savings minus extra cost in pesos.", 20000, "Discount the saving using the factor, then subtract the extra price.", "30000 × 4 − 100000 = 20000 pesos."),
          pr("A has fixed cost ₱20000 and ₱8 per item; B has fixed cost ₱50000 and ₱5 per item. Find break-even output in items.", 10000, "Use the difference in fixed costs and per-item costs.", "(50000 − 20000) ÷ (8 − 5) = 10000 items."),
          pr("For the scene’s 10-year furnaces, at 25% per year find A’s cost minus B’s in million pesos. A: 2 now + 0.60 yearly; B: 3.2 now + 0.35 yearly.", -0.307374, "A negative difference means A has lower present cost.", "−1.2 + 0.25 × [1 − 1.25^(−10)] ÷ 0.25 ≈ -0.307374 million pesos."),
        ],
      },
    ],
  },

  'mate-120': {
    predict: {
      q: "Quenched PET makes an upward peak near 130 °C before a downward melting peak near 250 °C. In this scene upward means heat released. What is the PET doing at the first peak?",
      options: ["Melting into a liquid","Losing mass as vapour","Forming solid crystals","Breaking apart its chains"],
      answer: 2,
      reveal: "The initially disordered chains gain enough mobility to form crystals while still solid. That ordering releases heat; melting later absorbs heat and points the other way on this trace.",
    },
    parts: [
      {
        title: "Reading peaks and steps",
        minutes: 25,
        explain: [
          "Thermal analysis follows a sample while temperature changes in a controlled way. Differential scanning calorimetry, or DSC, measures heat flow compared with a reference. Differential thermal analysis, or DTA, measures a temperature difference. They reveal related events but measure different quantities.",
          "Melting absorbs heat and crystallisation releases it. A glass transition is a change in heat capacity, seen as a baseline step rather than a melting peak. Always check the instrument’s sign convention. In this animation exothermic events point up and endothermic events point down.",
          "The temperatures shown for PET are approximate teaching values; real peaks depend on thermal history and measurement conditions. A peak maximum and its onset are different reported temperatures.",
        ],
        formulas: [
          ["DTA signal","\\Delta T=T_{\\mathrm{sample}}-T_{\\mathrm{reference}}"],
          ["Temperature interval","\\Delta T_{\\mathrm{event}}=T_2-T_1"],
        ],
        examples: [
          ex("During a DTA run the sample is at 132 °C and the reference at 130 °C. Find sample minus reference in °C.", [
            ["Subtract the reference temperature.", ""],
            ["Substitute the stated values and calculate.", "132 - 130 = 2\\;\\text{°C}"],
          ], "2 °C"),
          ex("A DSC melting event starts at 245 °C and peaks at 252 °C. Find peak minus onset in °C.", [
            ["Use the two different reported temperatures.", ""],
            ["Substitute the stated values and calculate.", "252 - 245 = 7\\;\\text{°C}"],
          ], "7 °C"),
        ],
        practice: [
          pr("A glass-transition interval starts at 70 °C and ends at 80 °C. Find its width in °C.", 10, "Subtract the lower temperature from the upper.", "80 − 70 = 10 °C."),
          pr("A DTA sample is at 158 °C and its reference is at 160 °C. Find sample minus reference in °C.", -2, "Keep the sign.", "158 − 160 = -2 °C."),
          pr("The scene shows PET crystallisation near 130 °C and melting near 250 °C. Find the separation in °C.", 120, "Compare the two peak temperatures.", "250 − 130 = 120 °C."),
          pr("A melting peak is measured at 249, 251 and 250 °C in three repeats. Find the mean peak temperature in °C.", 250, "Average all repeated measurements.", "(249 + 251 + 250) ÷ 3 = 250 °C."),
        ],
      },
      {
        title: "Heating rate and heat capacity",
        minutes: 25,
        explain: [
          "The heating rate β is temperature rise divided by elapsed time. A faster scan gives the sample less time at each temperature and can shift events. Use the same rate when comparing thermal histories, and report sample mass and atmosphere too.",
          "Away from transitions, heating a mass m through a small interval needs approximately Q = mcₚΔT. Its heat-flow rate is approximately mcₚβ if heat capacity is steady. Use seconds with watts. A milliwatt is a millijoule per second.",
        ],
        formulas: [
          ["Heating rate","\\beta=\\frac{\\Delta T}{\\Delta t}"],
          ["Sensible heat","Q=mc_p\\Delta T"],
          ["Baseline heat flow","\\dot Q=mc_p\\beta"],
        ],
        examples: [
          ex("A sample heats from 25 to 125 °C at 10 °C/min. Find elapsed time in minutes.", [
            ["Divide temperature rise by heating rate.", ""],
            ["Substitute the stated values and calculate.", "(125 - 25) \\div  10 = 10\\;\\text{min}"],
          ], "10 min"),
          ex("A 0.010 g sample has cₚ = 1.2 J/(g K) over a 20 K rise. Find required heat in J.", [
            ["Multiply mass, heat capacity and temperature rise.", ""],
            ["Substitute the stated values and calculate.", "0.010 \\times  1.2 \\times  20 = 0.24\\;\\text{J}"],
          ], "0.24 J"),
        ],
        practice: [
          pr("A scan rises 60 °C in 6 min. Find heating rate in °C/min.", 10, "Use rise per minute.", "60 ÷ 6 = 10 °C/min."),
          pr("At 10 °C/min, how many minutes take the sample from 25 to 250 °C?", 22.5, "Find the temperature rise first.", "(250 − 25) ÷ 10 = 22.5 min."),
          pr("Convert a heating rate of 12 °C/min to K/s.", 0.2, "A degree interval is the same size in °C and K; convert minutes to seconds.", "12 ÷ 60 = 0.2 K/s."),
          pr("A 0.010 g sample has cₚ = 1.5 J/(g K) and heats at 0.2 K/s. Find baseline heat flow in mW.", 3, "Find J/s, then multiply by a thousand for mW.", "0.010 × 1.5 × 0.2 × 1000 = 3 mW."),
        ],
      },
      {
        title: "Peak area and crystallinity",
        minutes: 25,
        explain: [
          "Heat is the area of a heat-flow peak above or below the chosen baseline. If the horizontal axis is time, integrate directly. If it is temperature, divide the area by the heating rate in matching time units.",
          "Divide heat by sample mass to obtain specific enthalpy in J/g. For neat PET, use the stated teaching reference of 140 J/g for fully crystalline material. If cold crystallisation occurs during heating, subtract that released heat from the melting heat to estimate the crystallinity present before the scan. Use positive peak magnitudes in this calculation.",
        ],
        formulas: [
          ["Peak heat","Q=\\int\\dot Q\\,dt=\\frac1\\beta\\int\\dot Q\\,dT"],
          ["Initial crystallinity","X_c=\\frac{\\Delta H_m-\\Delta H_{cc}}{\\Delta H_m^0}\\,100\\%"],
        ],
        examples: [
          ex("A baseline-corrected melting peak supplies an average extra 2 mW for 50 s. Find absorbed heat in J.", [
            ["Molecular rearrangement heat is power times time; convert mW to W.", ""],
            ["Substitute the stated values and calculate.", "2 \\times  50 \\div  1000 = 0.1\\;\\text{J}"],
          ], "0.1 J"),
          ex("Neat PET has melting enthalpy 56 J/g and cold-crystallisation magnitude 14 J/g. Use 140 J/g as fully crystalline reference. Find initial crystallinity in per cent.", [
            ["Subtract crystals formed during the scan before dividing by the reference.", ""],
            ["Substitute the stated values and calculate.", "(56 - 14) \\div  140 \\times  100 = 30\\;\\text{\\%}"],
          ], "30 %"),
        ],
        practice: [
          pr("A 0.010 g sample absorbs 0.42 J in its melting peak. Find specific melting enthalpy in J/g.", 42, "Divide heat by mass in grams.", "0.42 ÷ 0.010 = 42 J/g."),
          pr("PET has melting enthalpy 42 J/g and no cold crystallisation. With a 140 J/g reference, find crystallinity in per cent.", 30, "Divide measured enthalpy by the reference.", "42 ÷ 140 × 100 = 30 %."),
          pr("A peak area against temperature is 6 mW K and the heating rate is 0.2 K/s. Find heat magnitude in J.", 0.03, "Divide by heating rate to get mW s, then convert to J.", "6 ÷ 0.2 ÷ 1000 = 0.03 J."),
          pr("Neat PET has ΔHₘ = 70 J/g and ΔHcc = 28 J/g. Using 140 J/g as the reference, find initial crystallinity in per cent.", 30, "Correct for crystals made during heating.", "(70 − 28) ÷ 140 × 100 = 30 %."),
        ],
      },
      {
        title: "Mass change and expansion",
        minutes: 25,
        explain: [
          "Thermogravimetric analysis, or TGA, records mass as the sample is heated. It can reveal loss of moisture, decomposition or oxidation. A mass loss alone does not identify the escaping substance. The remaining mass may contain filler, ash or unreacted material, depending on atmosphere.",
          "Dilatometry records a length change. Over a range with nearly constant expansion coefficient α, the reversible expansion is αL₀ΔT. A departure from the smooth trend can indicate a transformation. Combining DSC, TGA and length measurements helps distinguish heat absorption from mass loss or structural change.",
        ],
        formulas: [
          ["Mass loss","\\%\\,\\mathrm{loss}=100\\frac{m_0-m_f}{m_0}"],
          ["Expansion","\\Delta L=\\alpha L_0\\Delta T"],
        ],
        examples: [
          ex("A TGA sample starts at 20 mg and finishes at 18 mg. Find mass loss in per cent.", [
            ["Divide lost mass by initial mass.", ""],
            ["Substitute the stated values and calculate.", "(20 - 18) \\div  20 \\times  100 = 10\\;\\text{\\%}"],
          ], "10 %"),
          ex("A 100 mm metal sample has stated α = 12 × 10⁻⁶ K⁻¹. Find expansion over 100 K in mm.", [
            ["Multiply original length, coefficient and temperature rise.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  12 \\times  10^{-6} \\times  100 = 0.12\\;\\text{mm}"],
          ], "0.12 mm"),
        ],
        practice: [
          pr("A 10 mg TGA sample leaves 3 mg residue. Find residue in per cent of initial mass.", 30, "Use remaining mass rather than lost mass.", "3 ÷ 10 × 100 = 30 %."),
          pr("A sample falls from 25 mg to 20 mg. Find mass loss in mg.", 5, "Subtract final mass from initial mass.", "25 − 20 = 5 mg."),
          pr("A 50 mm specimen has α = 20 × 10⁻⁶ K⁻¹ over 200 K. Find expansion in mm.", 0.2, "Keep length units in mm.", "50 × 20 × 10⁻⁶ × 200 = 0.2 mm."),
          pr("A 100 mm specimen lengthens by 0.2 mm over 100 K. Find α in units of 10⁻⁶ K⁻¹.", 20, "Rearrange the expansion relation, then express the result in millionths.", "0.2 ÷ (100 × 100) × 10⁶ = 20 × 10⁻⁶ K⁻¹."),
        ],
      },
    ],
  },

  'mate-121': {
    predict: {
      q: "You keep voltage and current fixed but move the welding torch twice as fast. In the scene’s model, what happens to the energy delivered to each millimetre of weld?",
      options: ["It halves","It doubles","It stays the same","It becomes four times larger"],
      answer: 0,
      reveal: "The same power is spread over twice as much weld length each second. Heat input per millimetre halves, giving narrower heated zones and faster cooling in the scene’s model.",
    },
    parts: [
      {
        title: "From power to heat per length",
        minutes: 25,
        explain: [
          "Fusion welding joins metal by melting the edges and letting them solidify together, often with added filler. Arc voltage V times current I gives electrical power. Only a fraction η of that power enters the workpiece as useful heat.",
          "Heat input H is energy per length, not temperature. Divide useful power by travel speed. With power in watts and speed in mm/s, the result is J/mm. The same power gives more heat per millimetre when the torch moves slowly.",
        ],
        formulas: [
          ["Useful power","P=\\eta VI"],
          ["Heat input","H=\\frac{\\eta VI}{v}"],
        ],
        examples: [
          ex("For η = 0.8, V = 25 V and I = 150 A, find useful power in W.", [
            ["Multiply electrical power by efficiency.", ""],
            ["Substitute the stated values and calculate.", "0.8 \\times  25 \\times  150 = 3000\\;\\text{W}"],
          ], "3000 W"),
          ex("The useful power is 3000 W and travel speed is 4 mm/s. Find heat input in J/mm.", [
            ["Divide energy per second by distance per second.", ""],
            ["Substitute the stated values and calculate.", "3000 \\div  4 = 750\\;\\text{J/mm}"],
          ], "750 J/mm"),
        ],
        practice: [
          pr("An arc uses 20 V and 100 A. Find electrical power in W.", 2000, "Power equals voltage times current.", "20 × 100 = 2000 W."),
          pr("Useful power is 2000 W and speed is 5 mm/s. Find heat input in J/mm.", 400, "Use useful power rather than total electrical power.", "2000 ÷ 5 = 400 J/mm."),
          pr("η = 0.8, V = 20 V, I = 200 A and speed = 5 mm/s. Find heat input in J/mm.", 640, "Account for efficiency before dividing by speed.", "0.8 × 20 × 200 ÷ 5 = 640 J/mm."),
          pr("η = 0.8, V = 25 V and I = 200 A. What speed in mm/s gives H = 1000 J/mm?", 4, "Rearrange the heat-input relation for travel speed.", "0.8 × 25 × 200 ÷ 1000 = 4 mm/s."),
        ],
      },
      {
        title: "Fusion, affected metal and base metal",
        minutes: 25,
        explain: [
          "The fusion zone has melted and solidified, so it behaves like a small casting. The heat-affected zone, or HAZ, stayed solid but was heated enough to alter its structure or properties. The base metal farther away received less heating.",
          "In steel, fast cooling can create hard martensite in susceptible compositions, while high peak temperatures can coarsen grains. The HAZ is not the same as the visible heat tint. The animation uses a simplified thick-plate model in which distance to a chosen peak-temperature boundary grows with the square root of heat input.",
        ],
        formulas: [
          ["Scene width scaling at fixed boundary temperature","\\frac{r_2}{r_1}=\\sqrt{\\frac{H_2}{H_1}}"],
          ["Band width on one side","w_{\\mathrm{HAZ}}=r_{\\mathrm{affected}}-r_{\\mathrm{fusion}}"],
        ],
        examples: [
          ex("A fusion boundary is 4 mm from the centre line and the affected boundary is 7 mm away. Find the HAZ band width on one side in mm.", [
            ["Subtract the fusion radius from the affected radius.", ""],
            ["Substitute the stated values and calculate.", "7 - 4 = 3\\;\\text{mm}"],
          ], "3 mm"),
          ex("In the stated square-root model, a boundary radius is 3 mm at H = 500 J/mm. Find its radius at H = 2000 J/mm in mm.", [
            ["Multiply the original radius by the square root of the heat-input ratio.", ""],
            ["Substitute the stated values and calculate.", "3 \\times  \\sqrt{2000 \\div  500} = 6\\;\\text{mm}"],
          ], "6 mm"),
        ],
        practice: [
          pr("The fusion zone extends 5 mm each side of the centre line. Find its full width in mm.", 10, "Include both sides.", "2 × 5 = 10 mm."),
          pr("Affected radius is 9 mm and fusion radius is 6 mm. Find HAZ width on one side in mm.", 3, "Take the difference of the radii.", "9 − 6 = 3 mm."),
          pr("A boundary lies 4 mm from the centre line. If heat input doubles in the square-root model, find the new radius in mm.", 5.65685, "The radius grows as the square root, not directly with heat input.", "4 × √2 ≈ 5.65685 mm."),
          pr("Affected radius is 8 mm and fusion radius is 5 mm. Find the combined HAZ width across both sides in mm.", 6, "Find one solid affected band, then count both bands.", "2 × (8 − 5) = 6 mm."),
        ],
      },
      {
        title: "Cooling time and cracking risk",
        minutes: 25,
        explain: [
          "The cooling interval from 800 to 500 °C is often written t₈/₅. It helps relate a welding thermal cycle to changes in steel microstructure. A longer time means slower average cooling over that interval, though the instantaneous rate changes throughout.",
          "Composition, plate thickness, joint shape and preheat all affect real cooling. The scene uses t = H[1/475 − 1/775]/(2πk) for a room-temperature thick plate, with k = 0.025 W/(mm K). This is a teaching model, not a universal welding procedure.",
          "Hydrogen, a susceptible hard structure and tensile stress together encourage delayed cracking. Preheat and controlled interpass temperature can slow cooling; suitable dry consumables reduce hydrogen. More heat is not always better, because excessive heating may worsen grain growth and toughness.",
        ],
        formulas: [
          ["Average cooling rate magnitude","R=\\frac{800-500}{t_{8/5}}"],
          ["Scene cooling time","t_{8/5}=\\frac{H}{2\\pi k}\\left(\\frac1{475}-\\frac1{775}\\right)"],
        ],
        examples: [
          ex("A weld cools from 800 to 500 °C in 15 s. Find average cooling rate magnitude in °C/s.", [
            ["Divide the temperature drop by elapsed time.", ""],
            ["Substitute the stated values and calculate.", "(800 - 500) \\div  15 = 20\\;\\text{°C/s}"],
          ], "20 °C/s"),
          ex("Use the scene formula with H = 2500 J/mm and k = 0.025 W/(mm K). Find t₈/₅ in s.", [
            ["Insert the heat input and the stated conductivity.", ""],
            ["Substitute the stated values and calculate.", "2500 \\div  (2\\pi  \\times  0.025) \\times  (1/475 - 1/775)\\approx 12.9702\\;\\text{s}"],
          ], "12.9702 s"),
        ],
        practice: [
          pr("A 300 °C cooling interval takes 10 s. Find average rate magnitude in °C/s.", 30, "Use temperature drop divided by time.", "300 ÷ 10 = 30 °C/s."),
          pr("A 300 °C drop occurs at an average magnitude of 25 °C/s. Find elapsed time in s.", 12, "Divide temperature drop by average rate.", "300 ÷ 25 = 12 s."),
          pr("Use the scene formula with H = 750 J/mm and k = 0.025 W/(mm K). Find cooling time in s.", 3.89105, "Use the same temperature interval and model constants.", "750 ÷ (2π × 0.025) × (1/475 − 1/775) ≈ 3.89105 s."),
          pr("At fixed conditions in this scene, t₈/₅ is proportional to H. A 1000 J/mm run gives 5.2 s. Estimate time in s for 2500 J/mm using this rounded starting value.", 13, "Scale by the heat-input ratio.", "5.2 × 2500 ÷ 1000 = 13 s."),
        ],
      },
      {
        title: "Processes, defects and checking a joint",
        minutes: 25,
        explain: [
          "Arc welding uses an electrical arc as its heat source. Resistance welding generates heat where current passes through contacting sheets; in a simple constant-resistance model the heat is I²Rt. Shielding gas or flux protects hot metal from air in processes that need it.",
          "Porosity means trapped gas cavities. Lack of fusion means surfaces failed to join. Cracks can start during solidification or later. Uneven heating and shrinkage also cause distortion and residual stress. Visual inspection, penetrant testing and other methods reveal different kinds of defects; choose a method suitable for the material and defect.",
          "A simple fillet-weld estimate uses effective throat area rather than the visible outer face. For an equal-leg fillet with a flat face, throat thickness is leg size divided by √2. Real design requires the appropriate joint rules and load assessment.",
        ],
        formulas: [
          ["Resistance heating model","Q=I^2Rt"],
          ["Ideal equal-leg fillet","a=\\frac{z}{\\sqrt2},\\quad A=aL,\\quad\\tau_{\\mathrm{avg}}=\\frac FA"],
        ],
        examples: [
          ex("A resistance weld carries 1000 A for 0.2 s through a stated constant resistance of 0.001 Ω. Find heat in J.", [
            ["Square current in the resistance-heating relation.", ""],
            ["Substitute the stated values and calculate.", "1000^{2} \\times  0.001 \\times  0.2 = 200\\;\\text{J}"],
          ], "200 J"),
          ex("An ideal equal-leg fillet has leg size 6 mm and effective length 100 mm. Find effective throat area in mm².", [
            ["Find throat thickness, then multiply by effective length.", ""],
            ["Substitute the stated values and calculate.", "(6 \\div  \\sqrt{2}) \\times  100\\approx 424.264\\;\\text{mm}^2\\text{}"],
          ], "424.264 mm²"),
        ],
        practice: [
          pr("A weld has effective throat area 200 mm² and carries 10000 N in uniform shear. Find average shear stress in MPa.", 50, "N/mm² is MPa.", "10000 ÷ 200 = 50 MPa."),
          pr("A straight weld is 120 mm long and is made at 4 mm/s. Find travel time in s.", 30, "Divide length by travel speed.", "120 ÷ 4 = 30 s."),
          pr("An ideal equal-leg fillet has leg size 8 mm. Find throat thickness in mm.", 5.65685, "Use the perpendicular distance to the flat weld face.", "8 ÷ √2 ≈ 5.65685 mm."),
          pr("Two identical fillets each have effective throat 4 mm and effective length 100 mm. They share a 24000 N shear load equally. Find average stress over the combined throat area in MPa.", 30, "Add both throat areas before dividing the total force.", "24000 ÷ (2 × 4 × 100) = 30 MPa."),
        ],
      },
    ],
  },

  'mate-122': {
    predict: {
      q: "Near the water jet, 1045 is slightly harder than 4340 in the scene. Farther along the bar, which steel should keep more hardness?",
      options: ["1045, because it starts harder","4340, because it hardens deeper","Both must fall at the same rate","Neither can stay hard away from water"],
      answer: 1,
      reveal: "Starting hardness and hardenability describe different things. The alloy steel delays softer transformations, so it can remain hard where cooling is slower, even with a slightly lower hardness at the quenched end.",
    },
    parts: [
      {
        title: "Hardness is not hardenability",
        minutes: 25,
        explain: [
          "Hardness measures resistance to a local indentation. Hardenability describes how readily a steel forms hard structures at slower cooling rates, so it can harden deeper into a thick part. A very hard surface does not guarantee a hard centre.",
          "Carbon strongly affects the hardness of martensite. Alloy additions such as chromium, molybdenum and nickel can delay softer transformations during cooling. The animation compares representative curves for 1045, 4140 and 4340; these are illustrative curves rather than guaranteed values for every batch.",
        ],
        formulas: [
          ["Hardness difference","\\Delta H=H_{\\mathrm{near}}-H_{\\mathrm{far}}"],
        ],
        examples: [
          ex("Steel A reads 58 HRC near the quenched end and 22 HRC farther away. Find the difference in HRC.", [
            ["Subtract the far reading from the near reading.", ""],
            ["Substitute the stated values and calculate.", "58 - 22 = 36\\;\\text{HRC}"],
          ], "36 HRC"),
          ex("Steel B reads 55 HRC near the end and 50 HRC farther away. Find its hardness drop in HRC.", [
            ["Use the same near-minus-far comparison.", ""],
            ["Substitute the stated values and calculate.", "55 - 50 = 5\\;\\text{HRC}"],
          ], "5 HRC"),
        ],
        practice: [
          pr("At the same distant point, steels X and Y read 48 and 30 HRC. Find X minus Y in HRC.", 18, "Compare at the same cooling position.", "48 − 30 = 18 HRC."),
          pr("A steel drops from 56 to 40 HRC. Find the drop in HRC.", 16, "Subtract the later hardness reading.", "56 − 40 = 16 HRC."),
          pr("A specified hardness is at least 45 HRC. A point measures 49 HRC. Find the margin above the requirement in HRC.", 4, "Subtract the acceptance threshold.", "49 − 45 = 4 HRC."),
          pr("Two steels have drops of 30 and 8 HRC across the same distance. Find how much smaller the second drop is, in HRC.", 22, "Compare the two drops rather than taking a ratio of HRC readings.", "30 − 8 = 22 HRC."),
        ],
      },
      {
        title: "One bar, many cooling rates",
        minutes: 25,
        explain: [
          "In an end-quench test, a steel bar is first heated to form austenite. Water cools one end. Points close to the jet cool rapidly, while distant points cool more slowly. A prepared surface along the bar allows hardness readings to be taken at known distances.",
          "Plot hardness vertically and distance horizontally. The vertical scale is HRC, a Rockwell hardness scale; distance is in mm. A flatter curve usually indicates greater hardenability. Keep test conditions consistent, and do not treat a Jominy distance as a literal hardened depth in a different-shaped part.",
        ],
        formulas: [
          ["Reading spacing","d_n=d_0+n\\Delta d"],
          ["Cooling rate magnitude","R=\\frac{T_1-T_2}{\\Delta t}"],
        ],
        examples: [
          ex("Hardness is measured from d = 1.5 mm in steps of 1.5 mm. Find the distance in mm after 4 further steps.", [
            ["Add the step count times the spacing to the starting distance.", ""],
            ["Substitute the stated values and calculate.", "1.5 + 4 \\times  1.5 = 7.5\\;\\text{mm}"],
          ], "7.5 mm"),
          ex("A point cools from 750 to 650 °C in 5 s. Find average cooling rate magnitude in °C/s.", [
            ["Divide temperature loss by time.", ""],
            ["Substitute the stated values and calculate.", "(750 - 650) \\div  5 = 20\\;\\text{°C/s}"],
          ], "20 °C/s"),
        ],
        practice: [
          pr("Readings are taken at 3 and 6 mm. Find their separation in mm.", 3, "Subtract distances measured from the same end.", "6 − 3 = 3 mm."),
          pr("The first reading is at 1.5 mm and the last at 15 mm, with 1.5 mm spacing. Including both ends, how many readings are taken?", 10, "Count intervals, then add the first reading.", "(15 − 1.5) ÷ 1.5 + 1 = 10."),
          pr("A near-end point cools through 100 °C in 0.5 s. Find average rate magnitude in °C/s.", 200, "A shorter time means a faster rate.", "100 ÷ 0.5 = 200 °C/s."),
          pr("One point cools through 100 °C in 2 s and another in 10 s. Find the first rate divided by the second rate.", 5, "Calculate the two cooling rates before comparing.", "(100 ÷ 2) ÷ (100 ÷ 10) = 5."),
        ],
      },
      {
        title: "Reading and interpolating curves",
        minutes: 25,
        explain: [
          "A hardness requirement defines a horizontal line on the graph. The distance where the curve crosses that line shows how far along the test bar the requirement is maintained. Between close measured points, straight-line interpolation gives an estimate, not an exact measurement.",
          "The scene uses a smooth teaching relation H(d) = Hbase + (Hmax − Hbase)/[1 + (d/d₅₀)³]. At d = d₅₀ the hardness is halfway between its two limits. Its fitted parameters describe the animation; they are not a general law for all steels.",
        ],
        formulas: [
          ["Linear interpolation","H(d)=H_1+(H_2-H_1)\\frac{d-d_1}{d_2-d_1}"],
          ["Scene curve","H(d)=H_b+\\frac{H_m-H_b}{1+(d/d_{50})^3}"],
        ],
        examples: [
          ex("Measured hardness falls linearly from 50 HRC at 10 mm to 40 HRC at 20 mm. Estimate hardness at 15 mm in HRC.", [
            ["Use the fraction of the distance interval travelled.", ""],
            ["Substitute the stated values and calculate.", "50 + (40 - 50) \\times  (15 - 10) \\div  (20 - 10) = 45\\;\\text{HRC}"],
          ], "45 HRC"),
          ex("For the scene’s 4140 curve use Hbase = 28, Hmax = 56 and d₅₀ = 18 mm. Find hardness at 18 mm in HRC.", [
            ["At d₅₀ the changing part has halved.", ""],
            ["Substitute the stated values and calculate.", "28 + (56 - 28) \\div  [1 + (18/18)^{3}] = 42\\;\\text{HRC}"],
          ], "42 HRC"),
        ],
        practice: [
          pr("Hardness falls linearly from 48 HRC at 8 mm to 44 HRC at 12 mm. Estimate hardness at 10 mm in HRC.", 46, "The requested distance is halfway between readings.", "48 + (44 − 48) × (10 − 8) ÷ (12 − 8) = 46 HRC."),
          pr("The scene’s 1045 curve has Hbase = 20, Hmax = 58 and d₅₀ = 4 mm. Find hardness at 4 mm in HRC.", 39, "Use the midpoint property of d₅₀.", "20 + (58 − 20) ÷ [1 + (4/4)³] = 39 HRC."),
          pr("The scene’s 4140 curve has Hbase = 28, Hmax = 56 and d₅₀ = 18 mm. Find hardness at 36 mm in HRC.", 31.1111, "The distance ratio is squared nowhere here: it is cubed.", "28 + (56 − 28) ÷ [1 + (36/18)³] ≈ 31.1111 HRC."),
          pr("Using linear interpolation between 50 HRC at 10 mm and 40 HRC at 20 mm, find the distance in mm where hardness reaches 45 HRC.", 15, "Find the fraction of the hardness drop, then the corresponding distance.", "10 + (45 − 50) ÷ (40 − 50) × (20 − 10) = 15 mm."),
        ],
      },
      {
        title: "From a test curve to a real part",
        minutes: 25,
        explain: [
          "A real gear or shaft cools differently at its surface and centre. Its size, shape, quench medium and agitation matter. A cooling-rate correlation can match a location in a part to an equivalent Jominy distance. Read the curve at that equivalent distance, rather than equating the distance with the depth below the surface.",
          "Choose a steel using the slowest-cooling location that must meet the hardness requirement. Faster quenching can increase hardness depth but also distortion and cracking risk. Tempering after quenching adjusts the final hardness and toughness, so confirm the requirement after the complete treatment.",
          "For measurements, report spread as well as the mean. In the exercises below, equivalent distances and hardness readings are supplied teaching data. They illustrate selection reasoning without pretending to predict a real part from diameter alone.",
        ],
        formulas: [
          ["Requirement margin","\\mathrm{margin}=H_{\\mathrm{measured}}-H_{\\mathrm{required}}"],
          ["Mean hardness","\\bar H=\\frac{\\sum H_i}{n}"],
        ],
        examples: [
          ex("A part’s centre matches a Jominy position with hardness 48 HRC. The requirement is 45 HRC. Find the margin in HRC.", [
            ["Compare the correlated hardness with the stated requirement.", ""],
            ["Substitute the stated values and calculate.", "48 - 45 = 3\\;\\text{HRC}"],
          ], "3 HRC"),
          ex("Three centre readings after tempering are 44, 46 and 45 HRC. Find mean hardness in HRC.", [
            ["Average the final-treatment readings.", ""],
            ["Substitute the stated values and calculate.", "(44 + 46 + 45) \\div  3 = 45\\;\\text{HRC}"],
          ], "45 HRC"),
        ],
        practice: [
          pr("A centre reads 42 HRC against a 45 HRC minimum. Find the signed margin in HRC.", -3, "A negative margin means the requirement is missed.", "42 − 45 = -3 HRC."),
          pr("Quenched hardness is 56 HRC and tempered hardness is 48 HRC. Find the decrease in HRC.", 8, "Compare before and after tempering.", "56 − 48 = 8 HRC."),
          pr("Readings are 43, 47, 45 and 46 HRC. Find the range in HRC.", 4, "Range is the largest reading minus the smallest.", "47 − 43 = 4 HRC."),
          pr("At a supplied equivalent centre position, candidate steels give 30, 43 and 51 HRC. With a 45 HRC minimum, how many candidates meet the requirement?", 1, "Check each candidate against the minimum.", "Only the candidate at 51 HRC reaches the 45 HRC minimum. The count is 1."),
        ],
      },
    ],
  },

  'mate-123': {
    predict: {
      q: "The moulding machine keeps filling, packing and ejection times fixed. You double the wall thickness while keeping temperatures and material the same. What should happen?",
      options: ["The whole cycle doubles","Cooling time only doubles","The whole cycle quadruples","Cooling time quadruples"],
      answer: 3,
      reveal: "Heat must travel farther out of the thicker wall, so the model’s cooling time grows with thickness squared. The whole cycle grows by less than four times because its other stages stay fixed.",
    },
    parts: [
      {
        title: "Melt, shape and cool",
        minutes: 25,
        explain: [
          "Thermoplastics soften when heated and can be shaped as a melt. In extrusion, a screw moves and mixes material through a heated barrel, then pushes it through a die to make a continuous profile. Pipes and wire coatings are common examples.",
          "Injection moulding fills a closed cavity, then cools and ejects a separate part. A rotating screw prepares the melt and then moves forward to inject it. Match the process to the shape: continuous lengths suit extrusion, while individual detailed housings suit moulding.",
          "Mass flow links material use and output. With uniform density, mass equals density times volume. These exercises assume all stated material becomes product unless a waste fraction is given.",
        ],
        formulas: [
          ["Mass from volume","m=\\rho V"],
          ["Mass flow","\\dot m=\\rho\\dot V"],
        ],
        examples: [
          ex("A polymer has stated density 0.9 g/cm³. Find the mass in g of a 20 cm³ part.", [
            ["Multiply density by part volume.", ""],
            ["Substitute the stated values and calculate.", "0.9 \\times  20 = 18\\;\\text{g}"],
          ], "18 g"),
          ex("An extruder delivers 10 cm³/s of melt with stated density 0.8 g/cm³. Find mass flow in g/s.", [
            ["Use density times volume delivered per second.", ""],
            ["Substitute the stated values and calculate.", "10 \\times  0.8 = 8\\;\\text{g/s}"],
          ], "8 g/s"),
        ],
        practice: [
          pr("A part has volume 30 cm³ and density 1.0 g/cm³. Find mass in g.", 30, "Use consistent volume units.", "30 × 1.0 = 30 g."),
          pr("A machine makes 100 parts of 15 g each. Find product mass in kg.", 1.5, "Find grams first, then convert to kilograms.", "100 × 15 ÷ 1000 = 1.5 kg."),
          pr("An extruder supplies 120 g/min. How many grams does it deliver in 5 min?", 600, "Multiply flow by elapsed time.", "120 × 5 = 600 g."),
          pr("A batch uses 2 kg of polymer and 10% of the input becomes waste. Find good product mass in kg.", 1.8, "Keep the fraction remaining after the loss.", "2 × (1 − 0.10) = 1.8 kg."),
        ],
      },
      {
        title: "The injection moulding cycle",
        minutes: 25,
        explain: [
          "First the screw fills the cavity. Packing then supplies more melt while the material starts to contract. Cooling continues until the part is stiff enough to remove. The mould opens and ejector pins push the part out.",
          "For simple timing exercises, add the listed non-overlapping stages. Actual machines may prepare the next shot while the current part cools, so avoid counting overlapping time twice. A mould with several cavities makes several parts per cycle. Output also depends on rejected parts and stopped time.",
        ],
        formulas: [
          ["Cycle time","t_{\\mathrm{cycle}}=t_{\\mathrm{fill}}+t_{\\mathrm{pack}}+t_{\\mathrm{cool}}+t_{\\mathrm{open/eject}}"],
          ["Ideal output","N_{\\mathrm{hour}}=\\frac{3600c}{t_{\\mathrm{cycle}}}"],
        ],
        examples: [
          ex("Non-overlapping stages take 1 s to fill, 3 s to pack, 5 s to cool and 2 s to open and eject. Find total cycle time in s.", [
            ["Add the stated stage times once each.", ""],
            ["Substitute the stated values and calculate.", "1 + 3 + 5 + 2 = 11\\;\\text{s}"],
          ], "11 s"),
          ex("A single-cavity mould has a 12 s cycle with no stoppages. Find ideal output in parts per hour.", [
            ["Divide seconds per hour by seconds per cycle.", ""],
            ["Substitute the stated values and calculate.", "3600 \\div  12 = 300\\;\\text{parts/hour}"],
          ], "300 parts/hour"),
        ],
        practice: [
          pr("A cycle has stages of 2, 4, 10 and 2 s. Find total time in s.", 18, "Add the four non-overlapping intervals.", "2 + 4 + 10 + 2 = 18 s."),
          pr("A four-cavity mould runs a 20 s cycle without stoppages. Find output in parts per hour.", 720, "Multiply cycles per hour by cavities per cycle.", "3600 × 4 ÷ 20 = 720 parts/hour."),
          pr("Cooling takes 18 s in a 24 s cycle. Find the cooling share in per cent.", 75, "Divide cooling time by total cycle time.", "18 ÷ 24 × 100 = 75 %."),
          pr("A two-cavity mould runs a 15 s cycle without stoppages, but 5% of parts are rejected. Find average good output in parts per hour.", 456, "Find gross output, then retain the good fraction.", "3600 × 2 ÷ 15 × 0.95 = 456 parts/hour."),
        ],
      },
      {
        title: "Why thick walls cool slowly",
        minutes: 25,
        explain: [
          "Thermal diffusivity α describes how quickly a temperature disturbance spreads through a material. With the same material, melt temperature, mould temperature and ejection temperature, the wall-cooling model gives time proportional to thickness squared.",
          "This square relation applies to the cooling stage, not automatically to the whole cycle. Halving thickness cuts the model cooling time to one quarter. Keep wall thickness as even as practical; a thick local boss can determine when the entire part is ready for ejection.",
          "The scene uses a representative polymer diffusivity of 10⁻⁷ m²/s. In its slab formula, s is full wall thickness in metres, Tₘ is initial melt temperature, T_w is mould-wall temperature and Tₑ is the centre temperature at ejection. The symbol ln means natural logarithm. With diffusivity in m²/s the time is in seconds. For comparing thicknesses with all temperatures fixed, these other factors cancel.",
        ],
        formulas: [
          ["Thickness scaling","\\frac{t_{c2}}{t_{c1}}=\\left(\\frac{s_2}{s_1}\\right)^2"],
          ["Ideal slab cooling model","t_c=\\frac{s^2}{\\pi^2\\alpha}\\ln\\left[\\frac8{\\pi^2}\\frac{T_m-T_w}{T_e-T_w}\\right]"],
        ],
        examples: [
          ex("A 2 mm wall takes 5 s to cool under stated conditions. Estimate cooling time in s for 4 mm at the same conditions.", [
            ["Square the thickness ratio.", ""],
            ["Substitute the stated values and calculate.", "5 \\times  (4/2)^{2} = 20\\;\\text{s}"],
          ], "20 s"),
          ex("A 5 mm wall takes 30 s to cool. Estimate cooling time in s for a 3 mm wall.", [
            ["Apply the new-to-old thickness ratio.", ""],
            ["Substitute the stated values and calculate.", "30 \\times  (3/5)^{2} = 10.8\\;\\text{s}"],
          ], "10.8 s"),
        ],
        practice: [
          pr("Thickness doubles at fixed conditions. Find new cooling time divided by old cooling time.", 4, "Cooling follows the square of thickness.", "2² = 4."),
          pr("A wall takes 16 s to cool. If thickness halves, estimate the new cooling time in s.", 4, "Square one half before scaling the time.", "16 × (1/2)² = 4 s."),
          pr("A 3 mm wall cools in 9 s. Estimate time in s for a 4 mm wall at the same temperatures.", 16, "Use the squared ratio of thicknesses.", "9 × (4/3)² = 16 s."),
          pr("Other cycle stages total 6 s. Cooling is 5 s for a 2 mm wall. Estimate whole cycle time in s for a 4 mm wall under the same cooling conditions.", 26, "Scale only cooling, then add the fixed stages.", "6 + 5 × (4/2)² = 26 s."),
        ],
      },
      {
        title: "Shrinkage, flow and practical design",
        minutes: 25,
        explain: [
          "Polymer melt usually contracts as it cools. Mould dimensions allow for the expected shrinkage, but the final amount depends on material, flow direction and processing. Thick sections can produce sink marks or internal voids because their centres cool later.",
          "For a stated linear shrinkage fraction s, final length is mould length times (1 − s). This simple relation assumes uniform shrinkage in the measured direction. Ribs can improve stiffness without making the whole wall thick, though poor rib design can still cause sinks.",
          "In steady extrusion, volume flow equals profile area times exit speed. Keep units consistent and use the final dimensions specified in the problem. Real extrudates may swell at the die exit and shrink during cooling; neither change is included unless stated.",
        ],
        formulas: [
          ["Linear shrinkage","L_f=L_m(1-s)"],
          ["Steady extrusion","\\dot V=A v"],
        ],
        examples: [
          ex("A mould length is 100 mm and the stated linear shrinkage is 2%. Find final length in mm.", [
            ["Keep the fraction left after shrinkage.", ""],
            ["Substitute the stated values and calculate.", "100 \\times  (1 - 0.02) = 98\\;\\text{mm}"],
          ], "98 mm"),
          ex("A uniform extruded profile has area 20 mm² and moves at 50 mm/s. Find volume flow in mm³/s, neglecting swelling.", [
            ["Multiply area by travel per second.", ""],
            ["Substitute the stated values and calculate.", "20 \\times  50 = 1000\\;\\text{mm}^3\\text{/s}"],
          ], "1000 mm³/s"),
        ],
        practice: [
          pr("A 50 mm mould dimension shrinks by 1%. Find the length reduction in mm.", 0.5, "The reduction is shrinkage fraction times mould dimension.", "50 × 0.01 = 0.5 mm."),
          pr("A 200 mm mould dimension has 1.5% linear shrinkage. Find final length in mm.", 197, "Subtract the fractional shrinkage from one.", "200 × (1 − 0.015) = 197 mm."),
          pr("A final length of 98 mm is required with 2% linear shrinkage. Find the required mould length in mm.", 100, "Divide final length by the retained fraction.", "98 ÷ (1 − 0.02) = 100 mm."),
          pr("A tube has outer diameter 10 mm, inner diameter 6 mm and exits at 20 mm/s. Find volume flow in mm³/s, neglecting swelling.", 1005.31, "Subtract the inner circular area before multiplying by speed.", "(π/4) × (10² − 6²) × 20 ≈ 1005.31 mm³/s."),
        ],
      },
    ],
  },

};
