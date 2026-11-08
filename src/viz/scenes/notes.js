// Callouts for the narrated steps of each animation: one short note per idea,
// placed in the picture with an arrow to the thing to look at. Coordinates are
// the scene's own world units (2D scenes span about x −8…8, y −4.5…4.5).
// NOTES[type][beat] = [{ text, at: [x, y], to?: [x, y], color? }]
import { C } from '../theme';

export const NOTES = {
  tally_counting: [
    [{ text: 'one sheep ↔ one notch', at: [-3.6, 0.6], to: [0.9, 2.6] }],
    [{ text: 'four strokes and a slash = 5', at: [-2.4, -1.4], to: [1.2, 1.6] }],
    [
      { text: '5 bundles of five', at: [-3.4, -2.6], to: [1.4, 0.2] },
      { text: '+ 2 left over', at: [6.6, -1.2], to: [5.4, 0.2], color: C.gold },
    ],
  ],
  electrolysis_water: [
    [{ text: 'water + electricity: what comes out?', at: [5.2, 0.8], to: [1.2, 0] }],
    [
      { text: 'hydrogen gathers at −', at: [-6.6, 2.4], to: [-4.2, 1.6] },
      { text: 'oxygen gathers at +', at: [5.0, 1.6], to: [1.3, 1.8], color: C.red },
    ],
    [
      { text: 'twice the volume…', at: [-6.6, 2.4], to: [-4.2, 2.6] },
      { text: '…of this: H₂O = 2 H : 1 O', at: [5.2, 1.4], to: [1.3, 3.0], color: C.red },
    ],
  ],
  numeral_systems: [
    [
      { text: 'tens place: 2 bundles of ten', at: [-5.0, 0.6], to: [-1.0, -1.4] },
      { text: 'ones place: 3', at: [4.2, 0.4], to: [0.8, -1.2], color: C.gold },
    ],
    [
      { text: 'one bundle of sixty', at: [-5.0, 0.4], to: [-1.0, -2.0] },
      { text: '15 single ones', at: [4.2, 0.4], to: [0.8, -1.7], color: C.gold },
    ],
    [
      { text: 'each place is worth double the one to its right', at: [-5.6, 1.2], to: [-3.1, 3.2] },
      { text: 'an empty place is written 0', at: [-4.6, -3.4], to: [-1.8, -2.2], color: C.gold },
    ],
  ],
  base_ten_addition: [
    [
      { text: '2 rods = 2 tens', at: [-4.2, 2.6], to: [-6.7, 1.0] },
      { text: '7 small squares = 7 ones', at: [-4.0, -2.4], to: [-6.1, -0.9] },
      { text: '15 = 1 rod + 5 squares', at: [4.8, 2.2], to: [2.0, 0.6], color: C.gold },
    ],
    [{ text: 'put together: 3 rods and 12 squares', at: [2.4, 2.4], to: [-1.9, 1.0] }],
    [
      { text: 'ten squares glued into one rod: "carry the 1"', at: [2.8, 2.6], to: [-2.2, 1.4], color: C.green },
      { text: '2 ones left', at: [2.0, -2.2], to: [-1.4, -0.9], color: C.gold },
    ],
  ],
  units_ruler: [
    [{ text: 'one royal cubit (52.4 cm)', at: [-5.0, 3.0], to: [-5.0, 0.3] }],
    [{ text: 'one hand is much shorter, so you need more of them', at: [-3.6, 3.1], to: [-5.9, 0.3] }],
    [{ text: 'the beam never changed, only the ruler', at: [3.6, 3.1], to: [2.0, 1.4] }],
  ],
  lever_balance: [
    [
      { text: '6 kg × 2 m = 12: pulls harder', at: [-5.0, 2.2], to: [-2.3, -1.3] },
      { text: '3 kg × 2 m = 6', at: [4.2, 2.0], to: [2.3, -0.4], color: C.gold },
    ],
    [{ text: 'twice as far out: 3 × 4 = 12', at: [4.4, 2.2], to: [4.6, -0.6], color: C.gold }],
    [{ text: '1 kg, six times as far from the pivot', at: [3.6, 2.2], to: [6.8, -0.6], color: C.gold }],
  ],
  prime_sieve: [
    [{ text: 'every second number is a multiple of 2: crossed out', at: [5.8, 2.4], to: [3.0, 3.1] }],
    [{ text: 'then every third, every fifth…', at: [5.8, 1.0], to: [2.25, 1.55] }],
    [
      { text: 'whatever survives is prime', at: [5.9, -0.6], to: [2.25, -1.5], color: C.gold },
      { text: '60 is built only from primes', at: [-6.0, -1.6], to: [2.9, 0.3] },
    ],
  ],
  galileo_ramp: [
    [{ text: 'mark the ball after each second', at: [-2.0, 3.4], to: [-6.3, 1.9] }],
    [{ text: 'the gaps grow 1, 3, 5, 7: it keeps speeding up', at: [2.6, 3.2], to: [-1.6, 1.3] }],
    [{ text: 'total distance: 1, 4, 9, 16 = t²', at: [1.0, 3.4], to: [3.0, -2.0] }],
  ],
  fraction_area_grid: [
    [{ text: 'cut both into the same size pieces: sixths', at: [4.2, 2.8], to: [0.6, 0.6] }],
    [{ text: '8 twelfths + 9 twelfths = 17 twelfths', at: [4.2, 2.8], to: [2.6, 0.6] }],
    [{ text: 'the overlap: ⅔ of ¾ = 6 of the 12 cells', at: [5.4, -2.8], to: [2.4, 0.2], color: C.green }],
  ],
  number_line_vectors: [
    [
      { text: 'start at −4', at: [-5.6, -2.0], to: [-1.8, -0.2] },
      { text: 'slide 7 to the right', at: [-4.6, 2.6], to: [-1.3, 2.1], color: C.green },
    ],
    [{ text: '×(−2): twice as long, flipped to the other side of 0', at: [-4.2, 2.8], to: [1.6, 0.6] }],
    [{ text: 'multiply first, then slide', at: [5.4, 2.4], to: [2.6, 0.7] }],
  ],
  dimensional_pipeline: [
    [{ text: 'what you know, written as a fraction with its units', at: [-3.0, 2.6], to: [-5.4, 1.2] }],
    [{ text: 'each new fraction equals 1, so the value is unchanged', at: [0.0, 2.8], to: [-2.0, 1.2] }],
    [{ text: 'g on top cancels g below; only kg/m³ is left', at: [-1.0, 2.8], to: [-4.5, 0.7], color: C.red }],
  ],
  decimal_zoom: [
    [{ text: '0.375 sits between 3 and 4 tenths', at: [-1.6, 1.2], to: [-1.8, 3.6] }],
    [{ text: 'zoom in: between 7 and 8 hundredths', at: [-1.6, -0.5], to: [3.4, 1.4] }],
    [{ text: 'zoom again: exactly 5 thousandths', at: [3.2, -2.6], to: [-0.1, -0.9], color: C.gold }],
  ],
  irrational_sqrt2: [
    [{ text: 'the diagonal d: d² = 1² + 1² = 2', at: [0.8, 1.2], to: [-4.0, -0.2] }],
    [{ text: 'swing it down: √2 is a real point on the line', at: [3.4, 0.6], to: [-0.4, -2.1] }],
    [{ text: 'fractions crowd in from both sides, but none lands exactly on √2', at: [3.6, 0.2], to: [-0.4, -2.0], color: C.green }],
  ],
  exponent_growth_scaler: [
    [{ text: 'each square is 10× smaller than the one around it', at: [-3.6, -4.0], to: [-3.6, -0.4] }],
    [{ text: 'four steps down = divide by 10 four times', at: [-3.6, -4.0], to: [0.9, -0.2], color: C.gold }],
    [{ text: 'ten steps down: one atom', at: [-3.6, -4.0], to: [-3.6, -3.1], color: C.gold }],
  ],
  number_sets: [
    [{ text: '7 is in ℕ, so it is in every box around ℕ too', at: [3.4, -3.7], to: [-2.6, -0.3] }],
    [{ text: '−3: outside ℕ, but inside ℤ', at: [3.4, -3.7], to: [-0.9, -1.0] }],
    [{ text: '√2: inside ℝ, but outside ℚ', at: [5.4, -3.4], to: [3.0, 1.0], color: C.gold }],
  ],
  mole_stoichiometry_reactor: [
    [{ text: 'count each kind of atom on both sides: they do not match', at: [3.2, -0.6], to: [0.6, -1.9], color: C.red }],
    [{ text: 'oxygen now matches: 6 on each side', at: [3.0, -0.6], to: [1.4, -2.9], color: C.green }],
    [{ text: '4 iron atoms in, 4 out: balanced', at: [3.0, -0.6], to: [1.4, -1.9], color: C.green }],
  ],
  pythagoras_squares: [
    [{ text: 'a square built on each side of the triangle', at: [-5.6, -2.6], to: [-2.6, -0.4] }],
    [{ text: '9 + 16 small squares fill exactly 25', at: [-5.4, -2.8], to: [2.4, 2.2] }],
    [{ text: 'c² = 2, so c = √2: not a fraction', at: [-5.2, -2.8], to: [1.8, 2.6] }],
  ],
  algebra_balance_beam: [
    [{ text: 'guess x = 3: this side weighs only 13, so it rises', at: [-4.2, 2.6], to: [-5.6, -0.5] }],
    [{ text: 'take 4 off both pans: still level', at: [0.0, 2.4], to: [4.0, -1.2] }],
    [{ text: 'one box balances one of three equal groups: x = 5', at: [0.0, 2.4], to: [-6.3, -1.6], color: C.green }],
  ],
  newton_forces: [
    [
      { text: 'friction always pushes back', at: [-5.6, -3.4], to: [-3.6, -1.5], color: C.red },
      { text: '200 − 98 = 102 N left over to speed it up', at: [3.0, 1.6], to: [-2.2, 0.6], color: C.green },
    ],
    [{ text: '98 forward, 98 back: net zero, so no speeding up', at: [1.0, 1.6], to: [-4.0, -0.8] }],
    [{ text: 'twice the mass → half the acceleration', at: [3.2, 1.6], to: [-3.2, -0.6], color: C.gold }],
  ],
  cartesian_slope_wave: [
    [{ text: 'every point here has y equal to x', at: [-4.4, 2.0], to: [2, 2] }],
    [{ text: '1 across, 2 up: slope 2', at: [-5.0, -1.2], to: [-0.4, -1.2], color: C.green }],
    [
      { text: 'b = 2: where it crosses the up-down axis', at: [-4.8, 0.6], to: [-0.1, 1.9], color: C.red },
      { text: 'negative slope: walks downhill', at: [4.6, -2.2], to: [3, 0.6], color: C.gold },
    ],
  ],
  pendulum_energy: [
    [
      { text: 'blue + yellow always add to the same total', at: [1.2, 2.8], to: [4.8, 0.6] },
      { text: 'lowest point = fastest', at: [-5.8, -3.4], to: [-1.0, -1.6], color: C.gold },
    ],
    [{ text: 'friction turns swing into heat', at: [1.2, 2.8], to: [6.8, 0.6], color: C.red }],
    [{ text: 'the swing dies; the lost energy is all here as heat', at: [0.8, 3.0], to: [6.8, 1.6], color: C.red }],
  ],
  gas_piston: [
    [
      { text: 'each flash = one molecule pushing on the wall', at: [-4.8, 3.6], to: [-2.6, 1.0] },
      { text: '≈ 100 kPa: ordinary air pressure', at: [5.4, 1.2], to: [5.0, -2.4], color: C.gold },
    ],
    [
      { text: 'half the room → each wall hit twice as often', at: [-1.4, 2.6], to: [-5.2, 1.0] },
      { text: 'half the volume → double the pressure', at: [5.4, 1.4], to: [3.5, -1.7], color: C.gold },
    ],
    [
      { text: 'hotter = faster, harder hits', at: [-1.4, 2.6], to: [-5.2, 1.0], color: C.red },
      { text: 'same volume, pressure doubled again', at: [5.4, 1.8], to: [3.5, -0.5], color: C.gold },
    ],
  ],
  function_machine: [
    [
      { text: '1 goes in → 3 comes out', at: [-1.0, -2.4], to: [-4.6, -2.4], color: C.green },
      { text: 'the pair (1, 3) becomes one dot', at: [0.6, 3.2], to: [4.4, 0.2], color: C.gold },
    ],
    [{ text: 'every input leaves a dot; the dots draw the line', at: [0.6, 3.2], to: [5.5, 1.5], color: C.gold }],
    [
      { text: '2 and −2 both give 4: that is allowed', at: [-0.4, 3.2], to: [2.2, 0.6], color: C.gold },
      { text: 'never allowed: one input, two outputs', at: [-0.6, -3.6], color: C.red },
    ],
  ],
  bonding_energy_well: [
    [{ text: 'far apart: flat line, no push or pull', at: [5.4, 0.2], to: [1.2, -0.6] }],
    [{ text: 'too close: the electron clouds shove back hard', at: [-1.4, 1.6], to: [-5.8, 0.4], color: C.red }],
    [
      { text: 'bottom of the well = bond length', at: [-1.2, -3.4], to: [-5.2, -2.2], color: C.gold },
      { text: 'heat makes them rattle; the lopsided well lets the average spacing creep outward → expansion', at: [1.6, 1.4], to: [-4.7, 0.9] },
    ],
  ],
  trig_unit_circle: [
    [
      { text: 'height = sin θ (½ at 30°)', at: [-1.0, 3.4], to: [-2.4, 0.7], color: C.red },
      { text: 'sideways = cos θ', at: [-4.0, -3.4], to: [-3.4, -0.1], color: C.green },
    ],
    [{ text: 'at the top: sin = 1, cos = 0', at: [-0.8, 3.7], to: [-4.4, 2.5] }],
    [{ text: 'your height, recorded angle by angle, draws the sine wave', at: [3.8, 3.4], to: [-0.2, 1.3], color: C.red }],
  ],
  gravimetric_steps: [
    [{ text: 'the chloride is in there, dissolved and invisible', at: [1.4, 0.6], to: [-4.2, -1.4] }],
    [{ text: 'Ag⁺ meets Cl⁻ → white AgCl solid that sinks', at: [1.4, 0.4], to: [-4.2, -2.8] }],
    [{ text: 'heat and reweigh until the mass stops changing', at: [-3.6, 1.2], to: [0.8, -1.4], color: C.red }],
  ],
  quadratic_parabola_lab: [
    [
      { text: 'a root is where the curve hits the axis', at: [-4.8, -2.4], to: [-2.0, -0.1], color: C.red },
      { text: 'the other root: x = 2', at: [4.6, -1.2], to: [2.1, -0.1], color: C.red },
    ],
    [{ text: '(x + 2)(x + 3) = 0 → x = −2 or −3', at: [3.6, -2.0], to: [-2.1, -0.1], color: C.red }],
    [{ text: 'never touches the axis: no real roots', at: [3.8, -1.6], to: [-1.0, 0.9], color: C.red }],
  ],
  family_bars: [
    [{ text: 'carbon fibre: a fifth the weight of steel', at: [3.8, -1.4], to: [-0.5, -1.0] }],
    [
      { text: 'polymers: hundreds of times floppier', at: [5.6, -1.7], to: [1.4, -2.6], color: C.green },
      { text: 'each grid step here is ×10', at: [5.0, -3.3], to: [2.6, -4.0] },
    ],
    [
      { text: 'ceramics: furnace-proof', at: [3.4, -0.4], to: [4.2, 2.3], color: C.gold },
      { text: 'polymers soften just above boiling water', at: [3.2, -2.6], to: [-1.4, -1.8], color: C.green },
    ],
  ],
  sine_wave_unwrap: [
    [
      { text: 'the dot’s height…', at: [-4.4, 3.4], to: [-5.4, 1.8] },
      { text: '…drawn out over time = the sine wave', at: [0.6, 3.3], to: [-2.2, 1.8], color: C.gold },
    ],
    [{ text: 'twice as fast → squeezed: one cycle takes π seconds', at: [2.4, -3.2], to: [3.8, -1.4], color: C.gold }],
    [{ text: 'a quarter turn ahead: the peak comes early. That is cosine.', at: [3.0, -3.0], to: [-0.3, 2.0], color: C.gold }],
  ],
  stress_strain_curve_lab: [
    [{ text: 'straight line: let go and it springs back', at: [-2.6, -1.4], to: [-6.9, -1.6] }],
    [
      { text: 'yield: atoms start slipping for good', at: [-3.6, -1.6], to: [-6.8, 0.3], color: C.red },
      { text: 'and it gets stronger as it stretches', at: [1.8, 0.8], to: [-5.4, 2.1], color: C.gold },
    ],
    [
      { text: 'UTS: the highest point', at: [0.4, 3.4], to: [-3.9, 2.9], color: C.gold },
      { text: 'necking: it thins in one spot, then breaks', at: [1.6, -1.6], to: [5.0, 0.1], color: C.red },
    ],
  ],
  complex_plane: [
    [
      { text: '× (−1) = a half turn', at: [-4.4, 2.6], to: [-0.4, 1.0], color: C.gold },
      { text: 'is there a number that turns only 90°?', at: [4.0, 2.4], color: C.red },
    ],
    [
      { text: '× i = a quarter turn: 2 becomes 2i', at: [-3.6, 2.8], to: [-0.1, 1.9], color: C.gold },
      { text: 'twice = a half turn = × (−1), so i² = −1', at: [4.0, -2.4] },
    ],
    [{ text: 'turned 45° and stretched √2 times', at: [-3.4, 2.6], to: [0.4, 1.4], color: C.gold }],
  ],
  vector_add: [
    [
      { text: 'slide b so its tail sits on a’s tip', at: [4.6, 0.6], to: [2.1, 0.0], color: C.gold },
      { text: 'start → finish = the sum', at: [-3.6, 2.4], to: [0.8, 1.0], color: C.green },
    ],
    [{ text: 'same direction: 4 + 3 = 7 N', at: [-3.4, 2.0], to: [1.6, 0.5], color: C.green }],
    [{ text: 'opposite: they fight, 4 − 3 = 1 N left', at: [3.6, -2.4], to: [0.5, -0.4], color: C.green }],
  ],
  solubility_beaker: [
    [
      { text: 'only ~32 g dissolves; the rest sits on the bottom', at: [-2.6, -3.8], to: [-4.0, -2.6] },
      { text: 'above the curve = more than the water can hold', at: [4.4, 2.6], to: [2.1, -2.0], color: C.red },
    ],
    [
      { text: 'all 100 g has vanished', at: [-4.6, 3.4], to: [-4.6, 0.6] },
      { text: 'hot water holds far more: 110 g at 60 °C', at: [4.4, 2.8], to: [4.6, -0.5], color: C.green },
    ],
    [
      { text: 'cooled: the extra comes back out as crystals', at: [-2.4, -3.8], to: [-4.2, -1.8] },
      { text: '100 g at 30 °C: far above the curve', at: [4.8, 2.6], to: [2.7, -0.5], color: C.red },
    ],
  ],
  ohm_circuit: [
    [
      { text: 'blue dots = electrons drifting round the loop', at: [-0.6, 0.4], to: [-2.2, -2.4] },
      { text: 'the resistor: how hard current is to push through', at: [-4.8, 3.6], to: [-1.8, 2.4], color: C.red },
    ],
    [{ text: 'half the resistance → double the current: brighter', at: [-0.4, 0.2], to: [3.2, 0.0], color: C.gold }],
    [{ text: '8× the resistance → ⅛ the current: dim', at: [-0.4, 0.2], to: [3.9, 0.0], color: C.gold }],
  ],
  linear_system_intersection: [
    [
      { text: 'every point on a line fits its equation', at: [-4.4, -2.4], to: [-2.2, -1.2] },
      { text: 'on both lines at once: the solution', at: [5.2, 2.8], to: [1.1, 2.1], color: C.red },
    ],
    [{ text: 'x + 1 = −x + 3 → x = 1, y = 2', at: [-4.4, 2.6], to: [0.9, 2.1], color: C.red }],
    [{ text: 'same slope: parallel, never meet → no solution', at: [4.4, -2.4], color: C.red }],
  ],
  projectile_launcher: [
    [
      { text: 'sideways speed never changes', at: [1.2, -1.4], to: [-0.6, -3.3] },
      { text: 'up-down speed shrinks, flips, then grows downward', at: [-2.2, 1.6], to: [-1.7, -3.6], color: C.red },
    ],
    [{ text: '60°: higher, but lands in the same spot', at: [3.6, -1.0], to: [-1.2, -3.5], color: C.gold }],
    [{ text: '45°: the farthest landing for this speed', at: [3.4, -1.2], to: [-0.3, -3.5], color: C.gold }],
  ],
  arrhenius_log_linearizer: [
    [
      { text: '500 → 1000 K: barely seems to move…', at: [-3.0, -1.4], to: [-2.2, -3.1], color: C.gold },
      { text: '…then it explodes. Hard to read.', at: [-1.0, 1.6], to: [3.9, -1.0] },
    ],
    [{ text: 'ln k against 1/T: a straight line', at: [-1.6, -2.2], to: [-1.0, 1.4] }],
    [{ text: 'bigger Ea → steeper line', at: [-1.6, -2.4], to: [-1.0, 0.4], color: C.green }],
  ],
  reaction_collisions: [
    [
      { text: 'blue A + red B → gold C, but only if they hit hard enough', at: [4.4, 1.4] },
      { text: 'A gets used up', at: [3.6, -1.6], to: [1.3, 0.3] },
    ],
    [{ text: 'more crowded → more collisions → faster start', at: [4.4, 1.4], to: [1.1, 2.2] }],
    [{ text: '30 K hotter → far more hits clear the energy bar', at: [4.4, 1.4], to: [1.2, -0.7], color: C.red }],
  ],
  compound_e: [
    [
      { text: 'paid once: 1 jumps to 2 at year end', at: [-4.6, -2.5], to: [-2.0, 0.4], color: C.gold },
      { text: 'e ≈ 2.718: the ceiling', at: [-0.2, 1.6], to: [-1.6, 2.5], color: C.red },
    ],
    [{ text: 'monthly: interest earns interest, step by step', at: [-4.4, -2.6], to: [-4.6, 0.0], color: C.gold }],
    [
      { text: 'daily: nearly smooth, still under e', at: [-4.4, -2.6], to: [-4.4, 0.3], color: C.gold },
      { text: 'eˣ: slope = height, everywhere', at: [3.0, 2.0], to: [6.2, 0.9], color: C.green },
    ],
  ],
  equilibrium_flow: [
    [
      { text: 'blue A ⇄ gold B: changing both ways, all the time', at: [4.4, 1.6] },
      { text: 'A falls, B rises… then both level off', at: [4.0, -1.4], to: [1.2, -0.2] },
    ],
    [
      { text: 'particles still switch; only the totals stop changing', at: [4.4, 1.8] },
      { text: 'K = 4: about 4 B for every 1 A', at: [4.4, -0.4], to: [1.0, -1.6], color: C.gold },
    ],
    [{ text: '+30 A upsets the balance, so more B forms', at: [4.4, 0.6], to: [1.1, -0.6], color: C.gold }],
  ],
  collision_carts: [
    [
      { text: 'equal, bouncy carts: watch cart 1 stop dead', at: [0, 2.0] },
      { text: 'momentum = mass × speed; the total before = the total after', at: [0, -2.6], color: C.gold },
    ],
    [
      { text: 'sticky: they leave together at half the speed', at: [0, 2.0] },
      { text: 'half the movement energy → heat and bent metal', at: [0, -2.6], color: C.red },
    ],
    [{ text: 'heavy hits light: the light cart shoots off faster', at: [0, 2.0], color: C.gold }],
  ],
  limit_zoom: [
    [
      { text: 'a hole: 0/0 at x = 1', at: [2.6, -1.6], to: [0.1, 0.2], color: C.red },
      { text: 'start 1 away, then step closer', at: [-4.6, 2.6], to: [-2.6, -0.6], color: C.gold },
    ],
    [{ text: 'from both sides it heads to 2: the limit is 2', at: [3.4, -1.0], to: [0.1, 0.3], color: C.gold }],
    [{ text: 'a hole at 0, yet it heads firmly to 1', at: [-3.6, 3.0], to: [-0.1, 1.7], color: C.gold }],
  ],
  ph_scale: [
    [
      { text: 'pure water: right in the middle', at: [-4.0, 3.4], to: [-0.1, 0.9] },
      { text: 'H⁺ = OH⁻: neutral', at: [5.2, -3.4], to: [2.9, -3.3] },
    ],
    [{ text: 'each step = ×10: 5 steps → 100,000× more H⁺', at: [-3.4, 3.4], to: [-4.6, 0.9], color: C.red }],
    [{ text: 'lots of OH⁻: this alkaline coat keeps the steel bars from rusting', at: [4.8, 3.2], to: [5.0, 1.0], color: C.blue }],
  ],
  derivative_tangent_lab: [
    [
      { text: 'the secant: average slope across the gap h', at: [-5.0, 3.0], to: [-2.4, -1.6], color: C.gold },
      { text: 'rise over run', at: [5.2, -2.4], to: [2.9, -0.2] },
    ],
    [{ text: 'shrink h: the secant settles onto the tangent', at: [5.2, -2.2], to: [1.3, -0.4], color: C.gold }],
    [
      { text: 'green = f′(x): the slope at every x', at: [-4.0, -3.4], to: [-3.1, -1.9], color: C.green },
      { text: 'f peaks → f′ crosses zero', at: [4.4, 3.4], to: [1.6, 0.1], color: C.gold },
    ],
  ],
  rolling_race: [
    [
      { text: 'same mass, same radius: only where the mass sits differs', at: [-4.2, -1.2] },
      { text: 'ball wins: its mass sits near the middle, so less energy goes into spinning', at: [3.0, -1.0], to: [6.9, 1.2], color: C.green },
    ],
    [{ text: 'steeper: everyone is faster, the order stays the same', at: [0, -1.2] }],
  ],
  galvanic_cell: [
    [{ text: 'zinc gives up electrons; they flow through the wire to the copper', at: [0, -0.8], to: [-2.0, 3.5] }],
    [{ text: 'zinc still gives way first: it sacrifices itself to save the iron', at: [0, -0.8], to: [-3.8, 0.4] }],
    [{ text: 'magnesium is far more eager: 2.71 V', at: [0, -0.8], to: [0, 3.0], color: C.green }],
  ],
  slope_tracer: [
    [
      { text: 'slope of the tangent here…', at: [5.6, 3.4], to: [2.8, 4.0], color: C.gold },
      { text: '…plotted below: the slopes make the line 2x', at: [5.4, -1.2], to: [2.8, -1.0], color: C.green },
    ],
    [
      { text: 'flat at the top → slope 0', at: [5.6, 3.2], to: [2.3, 2.6], color: C.gold },
      { text: 'the slopes of sin x make cos x', at: [5.4, -1.2], to: [1.0, -2.0], color: C.green },
    ],
    [{ text: 'twice as fast → twice as steep: 2 cos 2x', at: [5.6, -0.8], to: [0.7, -1.7], color: C.green }],
  ],
  brinell_dent: [
    [{ text: 'wide dent (about 5 mm) = soft: HB ≈ 130', at: [1.4, 3.9], to: [3.4, 1.8], color: C.gold }],
    [{ text: 'hardened steel: small dent, HB ≈ 600', at: [1.4, 3.9], to: [4.2, 1.6], color: C.gold }],
    [{ text: 'soft aluminium needs a lighter load (500 kgf) to leave a readable dent', at: [1.2, 3.8], to: [4.2, 1.6], color: C.gold }],
  ],
  spring_mass: [
    [
      { text: 'stretched further → pulled back harder', at: [-5.0, -2.6], to: [-4.1, 0.0], color: C.red },
      { text: 'its height over time: a cosine wave', at: [2.0, 2.8], to: [5.6, 1.6], color: C.gold },
    ],
    [{ text: 'smaller swing, same rhythm: the period does not change', at: [2.0, 2.8], to: [5.4, 0.6], color: C.gold }],
    [{ text: '4× the mass → twice as slow', at: [1.4, 2.8], to: [-3.8, 2.2], color: C.gold }],
  ],
  titration_curve: [
    [{ text: 'adding base: at first the pH barely moves', at: [-0.4, 0.4], to: [1.5, -2.4] }],
    [{ text: 'moles match: one drop jumps the pH from 4 to 10, and the flask turns pink', at: [-0.6, 0.6], to: [2.5, 0.0] }],
    [
      { text: 'weak acid: starts higher, rises gently', at: [-0.6, 1.6], to: [0.6, -1.0] },
      { text: 'equivalence at pH 8.7: right where the indicator turns pink', at: [5.2, -1.0], to: [2.7, 0.7], color: C.green },
    ],
  ],
  box_optimizer: [
    [{ text: 'tiny cut: a flat tray, little volume', at: [-1.0, -2.4], to: [-3.6, -2.8] }],
    [
      { text: 'deep cut: tall but narrow', at: [-1.6, -2.4], to: [-5.2, -2.6] },
      { text: 'past the peak, volume falls again', at: [6.0, 1.6], to: [5.5, -0.8], color: C.gold },
    ],
    [{ text: 'flat top: slope zero → the biggest box, ≈ 593 cm³', at: [5.8, 3.6], to: [3.5, 2.7], color: C.gold }],
  ],
  standing_wave: [
    [{ text: 'middle = top + bottom, added point by point', at: [-3.6, -1.6], to: [-3.6, -0.2], color: C.gold }],
    [{ text: 'a node: this point never moves', at: [1.8, -1.6], to: [0, -0.1], color: C.gold }],
    [
      { text: 'only whole numbers of half-waves fit', at: [0, 2.8], color: C.gold },
      { text: 'fixed end', at: [-6.4, -2.2], to: [-7.0, -0.2] },
    ],
  ],
  microscope_zoom: [
    [{ text: 'to the eye: perfectly uniform steel', at: [0, -1.8], to: [0, -0.1] }],
    [{ text: 'each patch is a separate crystal: a grain, about 50 μm across', at: [0, 0] }],
    [{ text: 'pearlite: thin layers of iron and iron carbide, 0.3 μm apart', at: [0, 0] }],
  ],
  integral_area_toughness_lab: [
    [{ text: '4 rectangles: some stick out, some fall short', at: [5.6, 2.6], to: [0.8, 1.8] }],
    [{ text: '80 thin strips hug the curve: that sum is the integral', at: [5.6, 2.6], to: [3.0, 0.5] }],
    [
      { text: 'area = toughness: energy absorbed before breaking', at: [2.0, -1.4], to: [-4.0, -1.0], color: C.blue },
      { text: 'broke early: all the area to the right is lost', at: [3.0, -2.8], to: [-2.5, -2.0], color: C.red },
    ],
  ],
  heating_curve: [
    [{ text: '42 kJ: ice warms from −20 to 0 °C', at: [-0.6, -1.2], to: [-3.5, -3.0], color: C.red }],
    [{ text: '334 kJ in, yet stuck at 0 °C: the heat is pulling the crystal apart', at: [0.6, -1.0], to: [-2.9, -2.5], color: C.red }],
    [{ text: 'boiling: 2,256 kJ, the longest flat part by far', at: [3.0, 0.6], to: [2.2, 2.3], color: C.red }],
  ],
  bragg_planes: [
    [
      { text: 'out of step with plane 1', at: [-4.6, 0.6], to: [-3.0, -1.3] },
      { text: 'over many planes the mismatches cancel → almost nothing', at: [4.4, 0.4], to: [1.7, -3.0] },
    ],
    [
      { text: 'extra path = one whole wavelength: the waves line up', at: [-4.4, 0.5], to: [-3.0, -2.6], color: C.gold },
      { text: 'a bright peak', at: [4.6, 1.6], to: [2.7, 2.9] },
    ],
    [{ text: 'closer planes → the peak moves to a larger angle', at: [2.8, 0.4], to: [4.6, 2.8], color: C.gold }],
  ],
  lens_rays: [
    [
      { text: 'object far away (beyond 2f)', at: [-5.6, 2.8], to: [-5.3, 1.3] },
      { text: 'image: small and upside down', at: [3.8, 1.4], to: [2.2, -0.5], color: C.gold },
    ],
    [{ text: 'between f and 2f: bigger, still upside down', at: [4.4, 1.6], to: [4.4, -1.6], color: C.gold }],
    [
      { text: 'object inside f', at: [-3.4, -1.8], to: [-1.9, 0.6] },
      { text: 'your eye traces the rays back: a big upright image', at: [4.6, 0.8], to: [-3.4, 2.6], color: C.gold },
    ],
  ],
  integration_methods: [
    [
      { text: 'an awkward area…', at: [-5.2, -2.8], to: [-5.8, 0.4], color: C.green },
      { text: '…is the same area under cos u: sin 1 ≈ 0.84', at: [4.6, 1.4], to: [2.2, 1.2], color: C.green },
    ],
    [{ text: 'both dip below the axis together and always match', at: [0, -3.4], color: C.red }],
    [
      { text: 'hard: the area under ln u', at: [4.4, -1.6], to: [1.0, -1.6], color: C.blue },
      { text: 'easy: the area beside it, b − 1', at: [-3.6, 3.0], to: [-4.6, 0.6], color: C.green },
    ],
  ],
  entropy_mixing: [
    [{ text: 'pure copper: one arrangement, W = 1, S = 0', at: [4.4, -1.2], to: [1.3, -3.4] }],
    [{ text: 'one nickel, any of 64 sites → 64 arrangements', at: [4.4, -1.2], to: [-2.3, 1.9], color: C.teal }],
    [{ text: 'half and half: the most arrangements of all', at: [4.4, -1.2], to: [4.0, 3.3], color: C.gold }],
  ],
  defect_lattice: [
    [{ text: 'a vacancy: one empty site', at: [-3.6, -3.2], to: [-3.6, -0.35], color: C.red }],
    [{ text: 'an extra small atom squeezed in, pushing its neighbours apart', at: [-3.6, -3.2], to: [-3.3, 0.0], color: C.teal }],
    [
      { text: 'grain boundary: two crystals at different tilts meet', at: [-3.6, -3.4], to: [-3.45, -1.6], color: C.red },
      { text: 'near melting: about 1 site in 2,000 is empty', at: [4.4, -1.6], to: [6.8, 3.2] },
    ],
  ],
  beer_lambert: [
    [
      { text: 'about a third of the light is absorbed in the solution', at: [-0.6, 3.8], to: [-2.6, 2.7] },
      { text: 'absorbance A rises in a straight line with concentration', at: [5.4, -1.8], to: [1.6, -2.6] },
    ],
    [
      { text: 'double the concentration: A doubles…', at: [5.4, -1.8], to: [0.2, -2.9], color: C.gold },
      { text: '…but only 11% gets through', at: [2.6, 3.6], to: [4.0, 2.1], color: C.red },
    ],
    [
      { text: '2 cm cell: twice the path, like doubling the concentration', at: [1.6, 3.7], to: [-2.2, 2.6] },
      { text: 'longer path → steeper line', at: [5.4, -1.8], to: [1.4, -1.5], color: C.gold },
    ],
  ],
  gibbs_free_energy_lab: [
    [{ text: 'ΔG above zero: it will not go by itself', at: [-2.6, 2.2], to: [-4.5, 0.4], color: C.red }],
    [{ text: '−TΔS grows with T, so the line falls', at: [2.4, 1.6], to: [0.5, -0.6] }],
    [
      { text: 'crosses zero at T = ΔH/ΔS = 500 K', at: [-3.2, 2.4], to: [-3.25, 0.1], color: C.gold },
      { text: 'below zero: it runs by itself', at: [1.6, -2.6], to: [1.2, -0.9], color: C.green },
    ],
  ],
  diffusion_dislocation_lab: [
    [
      { text: 'random jumps, but more go inward than out', at: [2.0, -2.2], to: [-4.5, -2.2] },
      { text: 'carbon thins out with depth', at: [2.4, 2.6], to: [-5.0, 2.0] },
    ],
    [{ text: '4× the time → only 2× deeper', at: [2.4, 2.6], to: [-2.9, 1.8], color: C.gold }],
    [{ text: '+150 °C: deeper than hours of waiting', at: [4.2, 2.8], to: [1.0, 2.0], color: C.red }],
  ],
  phase_rule_water: [
    [{ text: 'one phase: nudge T or P and it stays liquid → F = 2', at: [-0.8, -0.8], to: [2.5, 1.3] }],
    [{ text: 'on the line: at this pressure it boils at only one temperature → F = 1', at: [-1.2, -0.8], to: [4.5, 1.3], color: C.gold }],
    [{ text: 'triple point: ice, water and vapour together → F = 0', at: [-0.8, -0.8], to: [1.9, -1.7], color: C.gold }],
  ],
  dice_frequencies: [
    [
      { text: 'after 10 rolls the bars jump around', at: [-3.0, 3.6] },
      { text: 'the share of 7s swings wildly', at: [4.6, 2.6], to: [2.2, 3.0], color: C.pink },
    ],
    [
      { text: 'thousands of rolls: each bar settles on its true chance', at: [-3.6, 3.6] },
      { text: '7: 6 ways out of 36', at: [-1.0, 2.4], to: [-3.7, 0.6], color: C.gold },
    ],
    [
      { text: 'one die: flat at 1/6', at: [-4.2, 3.6], to: [-4.2, 1.0], color: C.gold },
      { text: 'law of large numbers: it settles', at: [4.6, 2.4], to: [5.0, -1.1], color: C.pink },
    ],
  ],
  band_formation: [
    [{ text: 'one atom: sharp levels with a big gap between', at: [1.0, 2.8], to: [3.0, -1.0], color: C.red }],
    [
      { text: '40 atoms: each level spreads into a band', at: [-4.2, -1.6], to: [-1.8, -2.4] },
      { text: 'the gap shrinks to about 1.1 eV', at: [5.6, 1.8], to: [3.2, -0.6], color: C.red },
    ],
    [{ text: 'half full: empty levels just above the electrons → it conducts', at: [-4.2, -1.6], to: [-1.0, -0.4], color: C.gold }],
  ],
  phase_diagram_lever_lab: [
    [{ text: 'pick a composition and a temperature: here, all liquid', at: [-0.6, 3.6], to: [-3.3, 2.8] }],
    [{ text: 'inside the lens: liquid and solid α together', at: [1.6, -0.4], to: [-3.3, 0.2] }],
    [
      { text: 'tie line: its ends give each phase’s composition', at: [1.6, -0.6], to: [-2.6, -0.1], color: C.gold },
      { text: 'each share = the OPPOSITE arm ÷ the whole line', at: [5.6, 0.9], to: [5.6, 2.8] },
    ],
  ],
  galton_board: [
    [
      { text: 'at each pin: left or right, at random', at: [-4.2, 2.6], to: [-0.6, 2.2] },
      { text: 'the middle is reached by the most paths', at: [4.6, -1.2], to: [0.6, -2.0], color: C.gold },
    ],
    [{ text: '12 rows: the pile becomes a bell curve', at: [4.6, -1.2], to: [1.4, -1.6], color: C.gold }],
    [{ text: '68% land within one standard deviation of the middle', at: [4.8, -1.2], to: [0.9, -2.6], color: C.gold }],
  ],
  semiconductor_bandgap_lab: [
    [
      { text: 'to conduct, an electron must jump the gap', at: [-1.0, 3.0], to: [3.5, -0.9] },
      { text: 'at room temperature only a few make it', at: [-4.6, 1.8], to: [-2.6, 0.2] },
    ],
    [{ text: 'phosphorus: spare electrons sitting just below the conduction band', at: [-1.0, 2.6], to: [-1.6, -1.0], color: C.green }],
    [{ text: 'falling back across the gap gives light: 2.75 eV → blue', at: [5.2, -3.2], to: [5.8, 0.3], color: C.blue }],
  ],
  nucleation_barrier: [
    [
      { text: 'clusters keep forming, then melt away again', at: [-4.5, 0.6] },
      { text: '40 K under: the barrier peaks far out, at r* = 6.4 nm', at: [5.2, -1.0], to: [2.3, 2.6], color: C.red },
    ],
    [
      { text: 'past the top of the barrier, a cluster keeps growing…', at: [5.0, 2.0], to: [2.8, 0.9], color: C.gold },
      { text: '…into a grain', at: [-2.4, -0.8], to: [-4.2, -2.4], color: C.gold },
    ],
    [{ text: 'tiny barrier: grains start everywhere → many small grains', at: [5.0, 2.0], to: [2.0, 0.3], color: C.gold }],
  ],
  taylor_build: [
    [
      { text: 'near 0, x matches sin x well…', at: [3.6, -2.6], to: [0.4, 0.4], color: C.gold },
      { text: '…but shoots off as x grows', at: [-4.4, 3.0], to: [3.0, 3.0], color: C.gold },
    ],
    [{ text: '5 terms: hugs the wave from −π to π', at: [-3.0, 3.2], to: [-2.0, -0.9], color: C.gold }],
    [
      { text: 'matches only between −1 and 1', at: [-4.6, 2.6], to: [0.5, 0.4], color: C.gold },
      { text: 'outside, the series falls apart', at: [4.4, -2.4], to: [1.7, -1.6], color: C.red },
    ],
  ],
  least_squares: [
    [
      { text: 'each gap to the line, drawn as a real square', at: [-4.0, -2.2], to: [-4.4, -0.2], color: C.pink },
      { text: 'a poor guess: 22× the smallest total', at: [4.6, -0.6], to: [4.4, 2.6] },
    ],
    [{ text: 'big gaps count most: their squares grow fastest', at: [-4.0, -2.2], to: [-4.4, -0.6], color: C.pink }],
    [{ text: 'the least-squares line: no other line has less total area', at: [-4.0, -2.2], to: [-5.0, -0.4], color: C.gold }],
  ],
  ttt_cooling_curve_lab: [
    [{ text: 'a race: reach the bottom before hitting this C-shaped “nose”', at: [5.6, 0.4], to: [-3.9, 0.8], color: C.red }],
    [{ text: 'slow cooling crosses the C-curves → soft pearlite', at: [5.6, 0.4], to: [-0.5, 1.3], color: C.red }],
    [{ text: 'water quench dodges the nose → hard martensite', at: [5.6, 0.4], to: [-5.1, 0.4], color: C.blue }],
  ],
  griffith_fracture_composite_lab: [
    [
      { text: 'longer crack → lower breaking stress', at: [-2.6, 1.6], to: [-5.0, -0.2] },
      { text: 'stress piles up at the crack tips', at: [4.6, 1.4], to: [4.1, 0.1], color: C.red },
    ],
    [{ text: '15 mm crack: 150 MPa is now above the curve → it breaks', at: [-2.6, 1.6], to: [-1.5, -1.8], color: C.red }],
    [{ text: 'glass: so little toughness that a 1 mm scratch drops it to about 13 MPa', at: [-3.0, 1.0], to: [-6.9, -3.3], color: C.red }],
  ],
  slope_field_cooling: [
    [
      { text: 'each dash: the cooling rate at that time and temperature', at: [2.6, 2.6] },
      { text: 'the true curve follows the dashes', at: [2.0, -0.4], to: [-2.6, 0.8], color: C.gold },
    ],
    [{ text: 'straight 10 s steps cut the corner: it cools too fast', at: [2.0, 0.6], to: [-2.3, -0.6], color: C.pink }],
    [{ text: 'water + big steps: it overshoots below 50 °C', at: [2.6, -0.8], to: [-4.4, -3.0], color: C.red }],
  ],
  spreadsheet_fit: [
    [{ text: 'each row of the sheet becomes one dot', at: [5.4, 1.0], to: [4.5, 2.5] }],
    [{ text: 'fitting all 12 rows bends the line: the slope is a third too low', at: [5.4, 0.4], to: [3.6, 0.9], color: C.red }],
    [{ text: 'only the straight first 7 rows: E ≈ 70 GPa', at: [5.4, 0.6], to: [2.45, 0.6], color: C.green }],
  ],
  co2_keeling: [
    [
      { text: '1958: about 315 ppm', at: [-4.0, -1.2], to: [-6.9, -2.3] },
      { text: 'each small wiggle is one year', at: [3.0, -1.6], to: [1.4, 0.2] },
    ],
    [{ text: '1990: rising faster every decade', at: [-2.0, 1.6], to: [-0.6, -0.6], color: C.red }],
    [{ text: 'summer: forests grow and draw CO₂ down', at: [4.6, 1.4], to: [3.0, -1.0], color: C.green }],
    [{ text: 'today: over 420 ppm, about 50% above pre-industrial', at: [-1.6, 2.6], to: [6.3, 2.9], color: C.red }],
  ],
  damped_oscillator: [
    [{ text: 'each swing a little smaller: underdamped', at: [5.0, -1.6], to: [4.2, 0.3], color: C.gold }],
    [{ text: 'back to rest as fast as possible, without passing it', at: [3.6, 1.6], to: [0.3, 0.0], color: C.gold }],
    [{ text: 'too much damping: it creeps back slowly', at: [4.2, 1.4], to: [2.0, 0.3], color: C.gold }],
  ],
  matrix_transform: [
    [
      { text: '(0, 1) leans over to (1, 1)', at: [-1.8, 3.0], to: [0.8, 0.9], color: C.red },
      { text: 'same base, same height: the area stays 1', at: [4.0, -1.6], to: [1.2, 0.5], color: C.gold },
    ],
    [{ text: 'stretched 2 × 1.5: every area grows 3 times', at: [4.2, -1.6], to: [1.2, 0.8], color: C.gold }],
    [{ text: 'a quarter turn: (1, 0) → (0, 1), and the area is unchanged', at: [4.2, -1.6], to: [0.0, 0.8], color: C.green }],
  ],
  force_balance: [
    [
      { text: 'each cable pulls 354 N, less than the 500 N lamp: they share the job', at: [-0.6, -2.4], to: [-4.2, 0.4] },
      { text: 'head to tail, the arrows close a triangle → balance', at: [4.6, -2.6], to: [3.8, 0.4], color: C.gold },
    ],
    [{ text: 'flat cables: each must pull 966 N, almost twice the lamp', at: [-0.6, 2.4], to: [-4.6, 0.1], color: C.red }],
    [{ text: 'the steeper cable carries more', at: [-0.4, 2.8], to: [-4.0, 1.4], color: C.blue }],
  ],
  anova_groups: [
    [
      { text: 'same true hardness: the groups differ only by chance', at: [-3.8, 2.6] },
      { text: 'no spread between groups → F ≈ 0', at: [4.4, 1.2], to: [2.8, -2.9] },
    ],
    [
      { text: 'group means 3 HRC apart', at: [-3.6, 2.6], to: [-2.2, 0.5], color: C.red },
      { text: 'between ≫ within → F = 10: a real difference', at: [5.9, 0.4], to: [3.0, 1.6], color: C.gold },
    ],
    [{ text: 'a small gap lost in big scatter → F = 1.4: not convincing', at: [-3.6, 2.8] }],
  ],
  compound_growth: [
    [
      { text: 'compound: interest earns interest', at: [-2.0, 2.4], to: [1.4, 0.6], color: C.gold },
      { text: 'simple: the same ₱8,000 every year', at: [3.8, -1.6], to: [2.4, 0.1], color: C.blue },
    ],
    [{ text: 'after 20 years the gap is huge', at: [2.0, -1.6], to: [6.9, 1.6], color: C.gold }],
    [{ text: '₱110,000 in 2 years is worth only ₱94,307 today', at: [0.8, -1.4], to: [-5.3, 2.0], color: C.blue }],
  ],
  dsc_curve: [
    [{ text: 'glass transition: a step down, it now needs more heat to warm', at: [2.4, 3.2], to: [0.2, -0.8], color: C.gold }],
    [{ text: 'chains line up and crystallise: heat comes OUT (peak up)', at: [4.4, 3.2], to: [1.8, 0.6], color: C.gold }],
    [
      { text: 'already crystalline: no crystallisation peak', at: [2.6, 3.2], to: [1.8, -0.6] },
      { text: 'melting: heat goes IN (deep dip)', at: [2.6, -2.8], to: [5.6, -2.6], color: C.red },
    ],
  ],
  friction_ramp: [
    [
      { text: 'friction matches the pull: the block stays', at: [-3.6, 2.6], to: [-3.0, -1.3] },
      { text: 'the pull down the slope is less than the most friction can give', at: [4.6, 2.8], to: [3.6, -2.0], color: C.gold },
    ],
    [{ text: 'past 26.6° the pull wins, and it slides', at: [4.6, 2.8], to: [5.4, -0.9], color: C.red }],
    [{ text: 'oily steel (μₛ = 0.1) slides from just 5.7°', at: [-2.6, 2.0], to: [-4.0, -1.6], color: C.red }],
  ],
  weld_haz: [
    [
      { text: 'melted: the fusion zone', at: [-3.0, 3.0], to: [-6.0, 0.4], color: C.red },
      { text: 'heated past 727 °C: the heat-affected zone', at: [-2.6, -2.2], to: [-5.0, -1.1], color: C.gold },
    ],
    [{ text: 'low heat: thin zones, but the cold plate quenches it in about 1 s → brittle', at: [-2.6, -2.2], to: [-4.6, -0.4], color: C.red }],
    [{ text: 'high heat: wide zones and slow cooling (about 13 s)', at: [-0.8, -2.6], to: [-2.6, -1.6], color: C.gold }],
  ],
  cashflow_compare: [
    [
      { text: 'A starts cheaper, but its fuel bills add up faster', at: [-3.6, 2.6], to: [-2.8, 1.0], color: C.red },
      { text: 'by year 10, B is about ₱340,000 cheaper', at: [-3.4, -0.6], to: [-0.9, 1.3], color: C.blue },
    ],
    [
      { text: 'at 25%, future savings are worth little today: cheap A wins', at: [-3.6, -0.8], to: [-0.9, 0.0], color: C.red },
      { text: 'each bar: one year’s fuel bill in today’s money', at: [5.0, 3.2], to: [1.4, 1.2] },
    ],
    [{ text: 'about 16%: the totals end level (break-even)', at: [-3.6, -0.8], to: [-0.95, 0.7], color: C.gold }],
  ],
  factorial_cube: [
    [
      { text: 'top face (long time) against bottom face (short time)', at: [-3.4, 3.6], to: [-3.8, 2.0] },
      { text: 'effect of time: −4.6 HRC', at: [5.0, -2.2], to: [4.4, -0.6], color: C.gold },
    ],
    [{ text: 'temperature: right face against left → −8 HRC, the biggest', at: [5.6, -2.6], to: [3.4, -2.0], color: C.red }],
    [{ text: 'interaction AB: invisible if you change one thing at a time', at: [5.0, -2.4], to: [6.6, -0.6], color: C.gold }],
  ],
  section_inertia: [
    [
      { text: 'flat: all the metal within 5 mm of the centre', at: [-4.4, -1.6], to: [-4.4, -0.3] },
      { text: 'so it sags a lot', at: [6.4, 1.4], to: [4.6, 1.3], color: C.red },
    ],
    [{ text: 'on edge: metal reaches 20 mm out → 16× stiffer (distance counts squared)', at: [-1.8, -2.4], to: [-4.6, 1.8], color: C.gold }],
    [{ text: 'I-beam: metal in flanges far from the centre → 28× the flat bar', at: [-1.6, -2.6], to: [-4.6, 2.0], color: C.gold }],
  ],
  jominy_bar: [
    [{ text: 'quenched end: cooled at ~150 °C/s → hard martensite', at: [-2.2, -2.6], to: [-5.4, -2.2], color: C.gold }],
    [{ text: '15 mm in: only ~9 °C/s → soft pearlite, 21 HRC', at: [-2.0, 1.0], to: [3.6, -2.0], color: C.red }],
    [{ text: '4340: alloying delays pearlite → still 55 HRC at 15 mm', at: [-2.0, 1.0], to: [3.6, 2.0], color: C.gold }],
  ],
  injection_cycle: [
    [{ text: 'fill, pack, cool, eject: one part every 10.6 s', at: [-0.6, -2.8], to: [-4.6, -2.8] }],
    [{ text: 'a 4 mm wall: cooling takes 4× as long', at: [2.6, -3.6], to: [-2.0, -2.8], color: C.blue }],
    [{ text: '6 mm: about 41 s of cooling, so designers keep walls thin', at: [0.6, -1.4], to: [1.0, -2.7], color: C.blue }],
  ],
  truss_bridge: [
    [
      { text: 'top chord: squeezed (red)', at: [-3.4, 3.2], to: [-2.0, 2.4], color: C.red },
      { text: 'bottom chord: stretched (blue)', at: [-2.6, -1.8], to: [-2.4, -0.8], color: C.blue },
    ],
    [{ text: 'Howe: diagonals pushed (red), verticals pulled (blue)', at: [3.6, 3.2], to: [1.6, 0.9], color: C.red }],
    [{ text: 'load near the left: the left support takes 75 kN', at: [-0.6, -3.2], to: [-6.0, -2.0], color: C.gold }],
  ],
  pourbaix_iron: [
    [{ text: 'neutral water at −0.3 V: corrosion, iron dissolves', at: [-4.0, 2.6], to: [-2.8, -0.9], color: C.red }],
    [{ text: 'below −0.62 V: immunity, bare iron is stable', at: [-1.0, -1.6], to: [-2.8, -2.9], color: C.green }],
    [{ text: 'concrete, pH 12.5: passive, an oxide film seals the steel', at: [-2.6, 2.6], to: [0.8, -0.3], color: C.blue }],
  ],
  gyroscope: [
    [
      { text: 'gravity pulls the wheel down…', at: [-5.4, -1.8], to: [-4.1, 0.1], color: C.green },
      { text: '…yet the axle swings sideways round the post', at: [1.8, 1.6], to: [-1.2, 0.9], color: C.gold },
    ],
    [{ text: '3× the spin → it swings round 3× more slowly', at: [1.8, 1.6], to: [-1.2, 0.9], color: C.gold }],
    [{ text: 'shorter arm: half the torque, half the swing speed', at: [1.8, 1.6], to: [-2.6, 0.6], color: C.gold }],
  ],
  kirchhoff_circuit: [
    [{ text: 'junction at 6.55 V, above 6 V: current is pushed back into this battery (charging it)', at: [5.8, 0.0], to: [2.6, -0.6], color: C.pink }],
    [{ text: 'both batteries push in: 1.6 A down the middle', at: [-4.2, -1.2], to: [-1.4, -0.6], color: C.green }],
    [{ text: 'what flows in flows out: I₁ + I₃ = I₂', at: [-4.2, -1.2], to: [-1.5, 2.3], color: C.gold }],
  ],
  confidence_intervals: [
    [
      { text: 'each line: one lab’s 95% interval from 5 specimens', at: [5.6, 1.4] },
      { text: 'this one misses the true value', at: [5.4, -1.4], to: [4.0, -2.6], color: C.red },
    ],
    [
      { text: '30 specimens: about ±11 MPa', at: [4.6, 1.0] },
      { text: 'still 1 in 20 misses: that is what 95% means', at: [3.4, -2.2], to: [-1.4, -2.9], color: C.red },
    ],
    [{ text: '99%: more certainty costs wider intervals', at: [4.6, 1.0] }],
  ],
  sn_curve: [
    [{ text: '±500 MPa: breaks after about 15,000 cycles', at: [4.8, 2.6], to: [3.2, 0.1], color: C.gold }],
    [{ text: 'below the endurance limit the steel curve goes flat → it lasts forever', at: [4.6, 2.6], to: [5.6, -0.4], color: C.blue }],
    [{ text: 'aluminium has no floor: it fails eventually, after ~6 million cycles', at: [4.6, 2.6], to: [5.3, -2.0], color: C.gold }],
  ],
  transformer: [
    [{ text: 'twice the turns on this side → twice the voltage', at: [-0.6, -2.8], to: [-2.4, -1.0], color: C.green }],
    [
      { text: '1,000 turns in, 50 out: 230 V becomes 11.5 V', at: [-0.6, -2.8], to: [-2.3, -1.0], color: C.green },
      { text: 'the output wave is tiny', at: [4.6, -1.6], to: [4.0, 0.3], color: C.green },
    ],
    [{ text: 'power in ≈ power out: 0.43 A × 230 V ≈ 8.7 A × 11.5 V', at: [-4.4, -3.6] }],
  ],
  steel_carbon: [
    [{ text: '0.2% C: mostly soft ferrite, easy to bend and weld', at: [5.0, 0.4], to: [2.3, -0.6], color: C.gold }],
    [{ text: '0.45% C: about 58% pearlite → stronger, less ductile', at: [5.4, -0.6], to: [3.4, 0.0], color: C.gold }],
    [
      { text: 'past 0.76% C: brittle cementite lines the grain boundaries', at: [4.4, -1.2], to: [-2.2, 0.0], color: C.red },
      { text: 'strength barely rises; ductility keeps falling', at: [4.6, 0.6], to: [6.5, 2.1] },
    ],
  ],
  four_bar: [
    [{ text: 'shortest + longest ≤ the other two: the short crank turns fully', at: [3.2, 0.0], to: [-5.8, -1.1], color: C.gold }],
    [{ text: 'not Grashof: no link turns fully, the crank only rocks', at: [3.2, 0.0], to: [-5.0, 0.0], color: C.gold }],
    [{ text: 'a point on the coupler traces a curve', at: [3.2, 0.0], to: [-4.5, 0.4], color: C.pink }],
  ],
  gantt_cpm: [
    [
      { text: 'critical path A → B → D → F: 12 weeks', at: [-0.6, 2.8], to: [0.4, 1.0], color: C.red },
      { text: 'slack: C can slip 2 weeks', at: [3.4, -3.2], to: [2.2, 0.1] },
    ],
    [{ text: 'a 6-week foundation ties: now both paths are critical', at: [4.0, -3.0], to: [2.0, 0.2], color: C.red }],
    [{ text: '9-week foundation: the new critical path, finish moves to week 15', at: [3.6, -3.0], to: [3.0, 0.2], color: C.red }],
  ],
  creep_curve: [
    [
      { text: 'steady creep: a slow, constant stretch', at: [-5.4, 1.2], to: [-4.2, 0.35], color: C.gold },
      { text: 'then it speeds up and breaks', at: [-4.8, 3.2], to: [-2.0, 1.0], color: C.pink },
    ],
    [{ text: 'half the stress: life about 3,800× longer', at: [2.4, -0.9], to: [5.45, 0.25], color: C.yellow }],
    [
      { text: 'same point on the line: hotter trades for shorter', at: [2.4, -0.9], to: [5.45, 0.25], color: C.yellow },
      { text: '100 °C hotter: life falls ~500×', at: [-4.0, -1.4], to: [0.0, -2.6], color: C.red },
    ],
  ],
  ac_power: [
    [{ text: 'power never dips below zero: all of it does work', at: [4.4, 0.9], to: [-1.0, 0.15], color: C.pink }],
    [{ text: 'S (what the cables carry) is bigger than P (the useful part)', at: [4.4, 1.3], to: [4.1, -1.4], color: C.white }],
    [{ text: 'all reactive: 2,300 VA carried, 0 W of work', at: [4.4, 1.6], to: [2.55, 0.4], color: C.teal }],
  ],
  glass_viscosity: [
    [{ text: 'working range: shape it now', at: [4.3, 0.7], to: [4.25, -2.0], color: C.gold }],
    [{ text: '310 °C cooler: about 4,000× thicker', at: [5.0, 1.6], to: [2.5, -0.4], color: C.yellow }],
    [{ text: 'annealing point: hold here, then cool slowly', at: [4.6, 0.3], to: [1.45, 1.85], color: C.teal }],
  ],
  safety_factor: [
    [{ text: 'the tails barely touch', at: [-0.8, -1.3], to: [-2.55, -3.1], color: C.green }],
    [{ text: 'overlap: a weak part meets a big load', at: [0.4, -0.6], to: [-3.0, -3.0], color: C.red }],
    [{ text: 'real loads 20% above the assumed ones', at: [-0.6, 2.6], to: [-3.3, 1.6], color: C.blue }],
  ],
  beam_bending: [
    [{ text: 'the bending moment peaks right under the load', at: [1.2, -2.7], to: [-2.2, -2.95], color: C.pink }],
    [{ text: 'the near support carries most of the load', at: [-1.6, 1.3], to: [-6.2, 1.1], color: C.blue }],
    [
      { text: 'neutral axis: no stress at all', at: [1.6, 1.2], to: [4.4, 0.05], color: C.yellow },
      { text: 'bottom is stretched: cracks start here', at: [1.6, -3.1], to: [5.2, -1.6], color: C.teal },
    ],
  ],
  casting_riser: [
    [
      { text: 'shrinkage hole: nothing left to feed it', at: [0.4, -3.0], to: [-2.4, -1.9], color: C.red },
      { text: 'riser (pink) freezes before the plate', at: [5.4, 0.6], to: [3.55, 1.65], color: C.pink },
    ],
    [{ text: 'the last liquid is now in the riser', at: [0.6, -0.9], to: [-2.95, 0.15], color: C.gold }],
    [{ text: 'riser holds more steel than the plate: waste', at: [0.6, -0.9], to: [-2.0, 1.5], color: C.red }],
  ],
  stokes_fall: [
    [{ text: 'bigger ball, faster: speed grows with r²', at: [-0.6, 1.6], to: [4.0, 0.0], color: C.white }],
    [{ text: 'honey is thicker: the ball crawls', at: [0.6, -1.9], to: [5.0, -1.0], color: C.yellow }],
    [{ text: 'engine oil is thinner: faster', at: [0.2, 2.1], to: [3.3, 0.75], color: C.gold }],
  ],
  charpy_dbtt: [
    [
      { text: 'upper shelf: tough, absorbs a lot', at: [1.4, 0.9], to: [5.85, -0.4], color: C.red },
      { text: 'dull grey, torn break', at: [-4.6, -2.6], to: [-7.0, -2.6], color: C.grey },
    ],
    [
      { text: 'lower shelf: brittle, almost nothing absorbed', at: [0.6, -1.4], to: [4.2, -3.0], color: C.red },
      { text: 'flat, shiny break', at: [-4.6, -2.6], to: [-7.0, -2.6], color: C.white },
    ],
    [{ text: 'fine-grained steel: still tough at −20 °C', at: [-0.6, 0.9], to: [4.25, 2.4], color: C.blue }],
  ],
  column_buckling: [
    [{ text: 'load below the curve: safe', at: [-1.0, -0.8], to: [2.5, -2.4], color: C.green }],
    [{ text: 'now above the curve: it bows sideways', at: [5.0, 0.0], to: [4.7, -2.3], color: C.red }],
    [{ text: 'fixed ends lift the curve 4×: safe again', at: [5.6, 0.9], to: [4.7, -2.35], color: C.green }],
  ],
  nano_surface: [
    [{ text: 'yellow rim = surface atoms: only 8% at 20 nm', at: [-0.2, -3.5], to: [-2.2, -1.6], color: C.yellow }],
    [
      { text: 'a third of the atoms are on the surface', at: [0.0, 1.0], to: [2.75, 1.7], color: C.yellow },
      { text: 'melts about 250 °C lower', at: [0.0, -1.7], to: [2.75, -1.47], color: C.red },
    ],
    [
      { text: 'two thirds on the surface', at: [0.0, 3.0], to: [2.55, 2.6], color: C.yellow },
      { text: 'melts far below gold’s 1,064 °C', at: [0.0, -2.9], to: [2.55, -2.4], color: C.red },
    ],
  ],
  rolling_mill: [
    [
      { text: 'grains squashed flat', at: [1.0, 3.3], to: [0.0, 0.8], color: C.gold },
      { text: 'yield strength up: 70 → 260 MPa', at: [3.6, 0.5], to: [5.2, -1.75], color: C.yellow },
    ],
    [{ text: 'ductility nearly gone', at: [4.4, 1.0], to: [6.85, -3.3], color: C.teal }],
    [
      { text: 'hot: new round grains form', at: [1.0, 3.3], to: [-0.5, 0.9], color: C.gold },
      { text: 'stays soft', at: [4.6, 0.6], to: [6.8, -2.9], color: C.yellow },
    ],
  ],
  reynolds_dye: [
    [{ text: 'fastest in the middle, still at the walls', at: [4.8, -2.0], to: [1.75, -2.1], color: C.yellow }],
    [{ text: 'the thread starts to wave and burst', at: [-2.4, -0.4], to: [1.2, 1.5], color: C.red }],
    [{ text: 'mixing flattens the speed profile', at: [4.6, -2.0], to: [1.1, -2.1], color: C.yellow }],
  ],
  shaft_torsion: [
    [
      { text: 'zero at the centre, largest at the rim', at: [-1.8, -2.8], to: [4.4, 0.5], color: C.pink },
      { text: 'a straight line twists into a spiral', at: [-4.0, 3.0], to: [-3.0, 1.05], color: C.yellow },
    ],
    [{ text: 'the bored-out core carried very little', at: [-1.8, -2.8], to: [3.6, 0.0], color: C.white }],
    [{ text: 'smaller shaft, twice the torque: 4× the stress', at: [-2.4, -2.8], to: [2.7, -0.7], color: C.pink }],
  ],
  fracture_surface: [
    [{ text: 'the crack started here, at the keyway corner', at: [-1.6, -3.4], to: [-5.4, -2.3], color: C.red }],
    [{ text: 'small final zone: the load was low', at: [1.8, 3.3], to: [-1.3, 2.4], color: C.gold }],
    [{ text: 'river marks fan back to the origin', at: [-1.4, -3.4], to: [-4.6, -1.6], color: C.white }],
  ],
  sintering_density: [
    [{ text: 'dark gaps = pores still open', at: [-1.6, -3.1], to: [-3.95, 0.12], color: C.white }],
    [{ text: 'pores closed, and the part shrank inside its old outline', at: [0.4, -2.9], to: [-1.0, -1.6], color: C.gold }],
    [{ text: 'ten minutes: still porous', at: [4.6, -0.6], to: [2.5, -0.05], color: C.yellow }],
  ],
  mohr_circle: [
    [{ text: 'x-face: (80, 40) on the circle', at: [6.0, 2.7], to: [5.6, 1.25], color: C.blue }],
    [{ text: 'on the axis: no shear, σ₁ = 100 MPa', at: [5.6, 2.6], to: [6.1, 0.3], color: C.red }],
    [{ text: 'turned 45°: pure tension, 50 MPa', at: [-2.0, 3.0], to: [-4.0, 1.3], color: C.teal }],
  ],
  nanotube_roll: [
    [{ text: 'the arrow’s two ends meet when the sheet rolls up', at: [5.0, -1.1], to: [3.5, -2.55], color: C.yellow }],
    [{ text: 'n − m = 0: conducts like a metal', at: [4.6, 0.6], to: [1.2, 0.6], color: C.yellow }],
    [{ text: 'n − m = 10: a semiconductor', at: [4.4, 0.6], to: [0.8, 0.6], color: C.teal }],
  ],
  control_chart: [
    [{ text: 'just noise: every point inside the limits', at: [-3.4, -2.4], to: [-3.9, -0.85], color: C.teal }],
    [{ text: 'first sample after the drift: out of limits', at: [-3.6, 3.0], to: [0.0, 1.35], color: C.red }],
    [{ text: 'small drift, small samples: hidden for 7 hours', at: [-3.4, 3.1], to: [2.75, 2.1], color: C.red }],
  ],
  implant_stiffness: [
    [
      { text: 'specks: bone thinning', at: [-0.6, -0.5], to: [-2.8, 0.2], color: C.white },
      { text: 'the stem takes most of the load', at: [5.4, 1.3], to: [5.8, 2.6], color: C.teal },
    ],
    [{ text: 'titanium: half as stiff, bone takes 42%', at: [4.6, 0.9], to: [3.3, -1.6], color: C.blue }],
    [{ text: 'bone now carries over half', at: [4.6, 0.9], to: [3.0, 2.65], color: C.yellow }],
  ],
  plant_scaleup: [
    [{ text: 'gap = profit on each tonne', at: [-0.4, 1.6], to: [2.9, -0.7], color: C.green }],
    [{ text: 'small plant: cost above the price, a loss', at: [4.4, 2.6], to: [1.95, 0.55], color: C.red }],
    [
      { text: 'cost ×2.3 for output ×4', at: [-0.8, 2.6], to: [-2.7, 0.75], color: C.teal },
      { text: 'big plant: cheapest per tonne', at: [4.4, 1.4], to: [7.3, -1.6], color: C.green },
    ],
  ],
  print_layers: [
    [{ text: 'each thick layer leaves a big step', at: [0.4, 2.9], to: [4.0, 1.65], color: C.teal }],
    [{ text: 'thinner layers: smaller steps, 3× the time', at: [0.4, 2.9], to: [3.75, 2.0], color: C.teal }],
    [{ text: 'almost smooth, but 4 hours', at: [0.4, 2.9], to: [3.6, 2.25], color: C.teal }],
  ],
  startup_runway: [
    [
      { text: 'the cash runs out in month 17', at: [1.8, -0.9], to: [-1.75, -1.6], color: C.red },
      { text: 'sales would cover costs only here: too late', at: [-2.4, 2.2], to: [1.3, 0.15], color: C.yellow },
    ],
    [{ text: 'lowest point: ₱1.4 M still left', at: [-2.0, -2.6], to: [-2.1, -1.0], color: C.green }],
    [{ text: 'twice the money lasts until break-even', at: [-0.4, -2.6], to: [1.3, -0.25], color: C.green }],
  ],
  battery_cycle: [
    [
      { text: 'electrons run the outside circuit', at: [0.4, 3.5], to: [-3.5, 3.8], color: C.blue },
      { text: 'most lithium (yellow) is in the graphite', at: [-4.2, -3.5], to: [-5.9, -0.6], color: C.yellow },
    ],
    [{ text: 'now most lithium sits in the oxide', at: [-2.4, -3.5], to: [-1.4, -0.6], color: C.yellow }],
    [{ text: 'heavy draw: below the cut-off, phone off', at: [5.0, -2.6], to: [3.45, -1.1], color: C.red }],
  ],
  thesis_ttest: [
    [{ text: 'the error bars overlap: can’t tell yet', at: [-4.0, 3.0], to: [-3.6, 0.85], color: C.white }],
    [{ text: 'more bricks: shorter bars, a clear gap', at: [-4.0, 3.0], to: [-1.05, 0.9], color: C.yellow }],
    [{ text: 'a big gain shows even with 5 bricks', at: [-4.6, 3.0], to: [-2.0, 1.75], color: C.yellow }],
  ],
  ashby_corrosion_capstone_lab: [
    [{ text: 'up and to the left = light and stiff', at: [-4.0, 3.2], color: C.white }],
    [{ text: 'the slope-2 line: slide it up', at: [4.4, -1.2], to: [1.3, 1.3], color: C.white }],
    [{ text: 'the bright bubbles are above the line: the winners', at: [-4.2, 3.2], to: [-0.5, 1.1], color: C.gold }],
  ],
  bof_blow: [
    [{ text: 'start: 4.4% carbon', at: [3.4, 2.6], to: [-0.4, 3.2], color: C.yellow }],
    [{ text: 'a straight line: carbon burns at a steady rate', at: [4.4, 1.2], to: [1.0, 0.4], color: C.yellow }],
    [{ text: 'the tail: carbon runs short, burning slows', at: [4.4, -1.2], to: [3.0, -3.0], color: C.yellow }],
    [{ text: 'more oxygen: steeper start, same slow tail', at: [4.4, 1.4], to: [0.7, 0.3], color: C.yellow }],
  ],
  ellingham: [
    [{ text: 'carbon’s line is above nickel’s: it can’t take the oxygen yet', at: [-4.2, 3.0], to: [-3.15, 1.4], color: C.white }],
    [{ text: 'carbon dips below nickel: NiO can be reduced', at: [-4.4, 3.0], to: [-2.2, 1.35], color: C.green }],
    [{ text: 'below FeO too: iron smelting works', at: [-4.6, 3.0], to: [-0.7, 0.7], color: C.red }],
    [{ text: 'about 2,000 K: even silica gives up its oxygen', at: [0.0, -2.4], to: [3.7, -0.7], color: C.purple }],
  ],
  solid_solution: [
    [{ text: 'nickel fits: almost the same size', at: [0.0, 3.6], to: [-1.5, 2.45], color: C.green }],
    [{ text: 'brass: up to 35% zinc dissolves', at: [4.6, 2.4], to: [5.5, -0.6], color: C.teal }],
    [{ text: 'tin: few atoms, big strengthening', at: [4.8, 2.6], to: [2.4, 0.7], color: C.purple }],
    [{ text: 'extra tin forms a brittle second phase (grey)', at: [-1.0, 3.95], to: [-2.2, 1.6], color: C.grey }],
  ],
  ageing_curve: [
    [{ text: 'soft at first: atoms only starting to cluster', at: [0.8, -2.6], to: [-2.9, -1.9], color: C.yellow }],
    [{ text: 'peak: the finest, most numerous particles', at: [-3.4, 3.4], to: [-0.1, 2.1], color: C.yellow }],
    [{ text: 'overaged: particles coarsen, it softens', at: [3.4, -0.6], to: [5.9, -2.7], color: C.yellow }],
    [{ text: 'hotter: the peak comes sooner, but lower', at: [-0.4, 3.3], to: [-4.0, 1.25], color: C.red }],
  ],
  hall_petch: [
    [{ text: 'each grain wall blocks slip', at: [-1.4, 3.4], to: [-3.6, 1.0], color: C.gold }],
    [{ text: 'few walls: weaker', at: [5.0, -2.2], to: [1.5, -2.25], color: C.yellow }],
    [{ text: 'fine grains: 400 MPa, on the same line', at: [-0.3, 1.3], to: [4.4, 0.5], color: C.yellow }],
  ],
  stainless_pren: [
    [{ text: 'too little Cr: oxide in patches, rust gets through', at: [-2.4, 1.2], to: [-5.65, 2.25], color: C.red }],
    [{ text: 'past 10.5%: one continuous film, 10× slower', at: [-0.8, 1.2], to: [-3.85, -2.2], color: C.green }],
    [{ text: 'PREN 25: fine for washed coastal air', at: [1.2, -1.2], to: [3.2, -0.1], color: C.teal }],
    [{ text: 'PREN 41: fit for seawater', at: [1.2, -1.0], to: [3.2, 2.2], color: C.green }],
  ],
  resistivity_temp: [
    [{ text: 'electrons (blue) bounce off the shaking atoms', at: [-4.0, 3.2], to: [-4.5, 1.5], color: C.blue }],
    [{ text: 'hotter: more shaking, +70% resistance', at: [3.4, -0.8], to: [4.7, -2.8], color: C.gold }],
    [{ text: 'impurities add a fixed extra', at: [-4.0, 3.2], to: [-4.35, 0.85], color: C.red }],
    [{ text: 'iron: about 6× copper', at: [4.6, -1.8], to: [2.05, -1.35], color: C.red }],
  ],
  doping_carriers: [
    [{ text: 'n = p: heat alone makes a few carriers', at: [3.6, 2.6], to: [2.7, 0.2], color: C.white }],
    [
      { text: 'each phosphorus atom frees one electron', at: [-2.0, 3.4], to: [-5.1, 0.4], color: C.green },
      { text: 'electrons up a million times', at: [5.4, 2.6], to: [3.5, 1.9], color: C.blue },
    ],
    [{ text: 'boron grabs electrons: holes take over', at: [-2.0, 3.4], to: [-5.1, 0.4], color: C.purple }],
  ],
  diode_iv: [
    [{ text: 'at 0.3 V: barely any current', at: [-2.6, -1.4], to: [2.7, -2.9], color: C.yellow }],
    [{ text: 'past 0.6 V: the current shoots up', at: [0.6, 2.6], to: [5.0, 1.0], color: C.yellow }],
    [{ text: 'reverse: only a picoamp leaks through', at: [-3.0, -1.4], to: [-4.9, -2.85], color: C.white }],
    [{ text: 'hotter: the same current at ~0.1 V less', at: [0.6, 2.4], to: [4.25, 0.3], color: C.yellow }],
  ],
  czochralski_scheil: [
    [{ text: 'first crystal: only 35% of the melt’s phosphorus', at: [0.6, 0.5], to: [1.2, 1.9], color: C.green }],
    [
      { text: 'late crystal: 4.5× richer', at: [3.6, 0.7], to: [6.55, 2.5], color: C.green },
      { text: 'the last part to freeze is richest', at: [-2.0, -1.0], to: [-4.6, -1.25], color: C.red },
    ],
    [{ text: 'boron: almost even all along', at: [3.0, 0.8], to: [6.5, 2.5], color: C.purple }],
    [{ text: 'iron stays behind in the melt', at: [3.4, -0.6], to: [4.1, -2.1], color: C.red }],
  ],
  capacitor_dielectric: [
    [{ text: 'air: the field is 33% of breakdown', at: [5.6, -2.4], to: [3.45, -1.7], color: C.green }],
    [{ text: 'molecules line up with the field: 6× the charge', at: [-3.6, 3.6], to: [-6.5, 0.8], color: C.yellow }],
    [{ text: 'barium titanate: about 2,000× air', at: [-3.6, 3.6], to: [-3.0, 0.9], color: C.yellow }],
    [{ text: 'too thin: the field beats breakdown', at: [-1.4, 3.3], to: [2.6, 1.6], color: C.red }],
  ],
  hysteresis_loop: [
    [{ text: 'field off, yet B stays at 1.3 T: remanence', at: [-4.0, 3.4], to: [-0.6, 2.6], color: C.white }],
    [{ text: 'B reaches zero only at −900 kA/m', at: [-5.4, 1.2], to: [-2.7, 0.1], color: C.red }],
    [{ text: 'soft iron: a thin loop, little energy lost', at: [-4.6, 1.6], to: [-1.0, 0.6], color: C.teal }],
  ],
  energy_density: [
    [
      { text: 'diesel: a quarter of a kilogram', at: [1.6, 2.6], to: [-1.25, 1.95], color: C.gold },
      { text: 'water in a dam: over 4 tonnes', at: [4.6, -1.0], to: [3.6, -2.0], color: C.green },
    ],
    [{ text: 'lithium-ion: about 17× heavier than diesel', at: [4.6, 1.2], to: [1.75, 0.9], color: C.blue }],
    [{ text: 'lead-acid: almost 7 tonnes', at: [5.6, -0.4], to: [3.9, -1.15], color: C.grey }],
  ],
  electrode_capacity: [
    [{ text: 'the cathode is most of the weight', at: [-3.2, 3.2], to: [0.2, 0.3], color: C.red }],
    [
      { text: 'silicon anode: almost nothing', at: [-2.8, -3.9], to: [0.3, -3.1], color: C.blue },
      { text: 'only about a third more energy', at: [5.0, 3.0], to: [5.5, 0.9], color: C.yellow },
    ],
    [{ text: 'better cathode + silicon blend', at: [5.0, 3.0], to: [5.5, 1.3], color: C.yellow }],
    [{ text: 'LTO sits high: only a 1.85 V gap', at: [-3.4, -2.6], to: [-4.9, -0.75], color: C.blue }],
  ],
  solar_bandgap: [
    [
      { text: 'too little energy: passes straight through', at: [-3.4, 3.8], to: [-5.8, -1.5], color: C.grey },
      { text: 'the extra above the gap is lost as heat', at: [3.6, 1.2], to: [1.0, 0.6], color: C.red },
    ],
    [{ text: 'tiny gap: catches all, keeps little', at: [3.6, 1.2], to: [-2.5, 1.5], color: C.red }],
    [{ text: 'wide gap: most photons pass through', at: [3.6, 1.2], to: [-2.0, 0.6], color: C.grey }],
    [{ text: 'GaAs: close to the best compromise', at: [-4.6, 1.8], to: [-2.05, 2.7], color: C.teal }],
  ],
  fuel_cell_curve: [
    [{ text: 'already below 1.23 V: the activation loss', at: [-2.4, 1.6], to: [-6.0, 1.85], color: C.red }],
    [{ text: 'a straight drop: the membrane’s resistance', at: [3.0, 1.6], to: [0.8, -0.05], color: C.yellow }],
    [{ text: 'gas can’t arrive fast enough: a cliff', at: [2.2, -2.2], to: [5.4, -1.3], color: C.purple }],
    [{ text: 'thinner membrane: more volts at high current', at: [3.6, 1.6], to: [1.1, 0.4], color: C.yellow }],
  ],
  thermoelectric_zt: [
    [
      { text: 'the most any heat engine could get: 25%', at: [2.8, 0.2], to: [-0.4, -1.0], color: C.green },
      { text: 'this material: about 5%', at: [3.0, -1.6], to: [-0.45, -3.0], color: C.yellow },
    ],
    [{ text: 'about 8%, against 40% for Carnot', at: [3.0, -1.6], to: [0.7, -2.7], color: C.yellow }],
    [{ text: 'silicon–germanium at 1000 K: about 12%', at: [3.4, -0.6], to: [6.5, -2.3], color: C.yellow }],
    [{ text: 'ZT = 3: about 15%, near small engines', at: [2.6, -3.0], to: [0.65, -2.15], color: C.yellow }],
  ],
  geothermal_flash: [
    [{ text: 'only 12% steam; silica well under its limit', at: [1.6, -2.6], to: [5.7, -1.45], color: C.yellow }],
    [{ text: 'more steam, silica still dissolved', at: [1.2, -2.4], to: [3.4, -0.5], color: C.yellow }],
    [
      { text: 'over the line: silica scale forms', at: [4.0, -1.2], to: [1.3, 1.35], color: C.red },
      { text: 'scale lining the pipe', at: [-2.6, -2.8], to: [-5.5, -2.4], color: C.white },
    ],
  ],
  socrates_definition: [
    [{ text: 'too narrow: real courage left outside it', at: [3.8, -2.3], to: [3.6, -0.35], color: C.red }],
    [{ text: 'too broad: the gambler and the fool get in', at: [-4.4, -2.6], to: [-3.6, 0.4], color: C.red }],
    [{ text: 'the doctor gets in too: still unsolved', at: [-4.4, -2.6], to: [-3.6, 1.3], color: C.red }],
  ],
  syllogism_venn: [
    [{ text: 'the only open part of S lies inside P: valid', at: [-3.0, -3.0], to: [2.1, 0.0], color: C.green }],
    [{ text: 'X: some S is surely here, and it is inside P', at: [-3.0, -3.0], to: [2.1, 0.1], color: C.red }],
    [{ text: 'S outside P is still open: invalid', at: [-3.0, -3.0], to: [0.9, -0.6], color: C.red }],
  ],
  truth_table: [
    [{ text: 'both premises true, and Q is true: valid', at: [5.2, 0.6], to: [2.6, 1.75], color: C.green }],
    [{ text: 'premises true, conclusion false: invalid', at: [5.2, -1.2], to: [2.6, -0.3], color: C.red }],
    [{ text: 'only row 4 qualifies, and ¬P holds: valid', at: [5.2, 0.8], to: [2.6, -1.4], color: C.green }],
  ],
  hidden_factor: [
    [{ text: 'hot days (red): more ice cream and more swimmers', at: [-2.4, 2.6], to: [3.2, 0.6], color: C.red }],
    [{ text: 'same temperature: almost no link left', at: [3.6, 2.6], to: [0.5, -0.8], color: C.grey }],
    [{ text: 'a real cause would keep the slope', at: [-2.4, 2.6], to: [1.2, 0.7], color: C.white }],
  ],
  descartes_doubt: [
    [],
    [{ text: 'the senses fool us', at: [-6.2, -2.4], to: [-4.6, -2.4], color: C.grey }],
    [{ text: 'true even in a dream', at: [-6.2, 1.9], to: [-4.6, 1.3], color: C.teal }],
    [{ text: 'one belief survives', at: [-6.2, 2.5], to: [-4.6, 3.2], color: C.gold }],
  ],
  induction_turkey: [
    [{ text: 'only 3 meals: 80% sure', at: [-2.0, 0.6], to: [-5.9, 0.8], color: C.yellow }],
    [{ text: 'day 98: 99%, the rule seems proven', at: [-1.0, 1.6], to: [-4.7, 3.2], color: C.yellow }],
    [{ text: 'one surprise undoes a thousand mornings', at: [2.0, 0.6], to: [5.95, 0.0], color: C.red }],
  ],
  bayes_grid: [
    [
      { text: 'red: the 9 sick people caught', at: [-4.2, 1.6], to: [-5.6, 3.95], color: C.red },
      { text: 'yellow: 89 healthy people flagged too', at: [1.2, 1.4], to: [-1.0, 3.3], color: C.gold },
    ],
    [{ text: 'a common condition: red now outnumbers yellow', at: [0.0, 0.8], to: [0.0, 3.0], color: C.red }],
    [{ text: 'cleaner test: only about as many yellow as red', at: [0.0, 1.0], to: [-3.0, 3.9], color: C.gold }],
  ],
  eclipse_1919: [
    [{ text: 'Príncipe: a wide error bar', at: [5.4, 0.2], to: [2.75, 0.6], color: C.yellow }],
    [{ text: 'Sobral: about 9 error bars from Newton', at: [-2.6, -1.6], to: [1.2, 1.6], color: C.yellow }],
    [{ text: 'radio: right on Einstein’s 1.75', at: [5.4, -0.4], to: [3.95, 0.95], color: C.green }],
  ],
  epicycles: [
    [{ text: 'line of sight: where Mars appears among the stars', at: [-2.6, 3.6], to: [-6.6, 2.6], color: C.white }],
    [
      { text: 'Earth overtakes: Mars seems to go backwards', at: [2.2, 2.6], to: [-2.4, 3.25], color: C.red },
      { text: 'the backwards dip', at: [-1.0, -2.6], to: [1.7, -3.5], color: C.red },
    ],
    [{ text: 'the epicycle’s loop is the backwards bit', at: [2.6, 2.6], to: [-2.8, 2.3], color: C.red }],
  ],
  ethics_matrix: [
    [
      { text: 'quiet approval: a big hidden harm', at: [1.6, -2.4], to: [-4.6, -2.0], color: C.red },
      { text: 'open re-check: best overall', at: [0.0, 1.6], to: [0.0, 0.4], color: C.green },
    ],
    [{ text: 'count only money and the quiet option wins', at: [2.4, 2.6], to: [-3.2, 2.3], color: C.red }],
    [{ text: 'duty: hiding a known risk is off the table', at: [2.6, 2.6], to: [-3.6, 1.6], color: C.grey }],
  ],
  cell_surface: [
    [{ text: 'small cell: lots of surface for its inside', at: [-4.6, 2.6], to: [-4.3, 0.3], color: C.yellow }],
    [{ text: 'ten times less surface per inside', at: [3.8, 0.6], to: [2.75, -2.8], color: C.teal }],
    [{ text: 'the middle is far from the surface', at: [-4.4, -2.0], to: [-4.4, -0.6], color: C.white }],
  ],
  protein_chain: [
    [{ text: '3 beads: 8000 possible chains', at: [1.6, -2.4], to: [-0.8, -3.2], color: C.blue }],
    [{ text: '62 beads: as many as atoms in the universe', at: [1.0, 2.8], to: [4.2, 0.65], color: C.red }],
    [{ text: 'far more chains than could ever be made', at: [3.6, -1.6], to: [7.5, 2.9], color: C.blue }],
  ],
  dna_pairs: [
    [{ text: 'mostly A–T: melts at about 48 °C', at: [5.0, -2.25], to: [1.6, -3.5], color: C.gold }],
    [{ text: 'half G–C: about 60 °C', at: [5.4, -2.25], to: [3.05, -3.5], color: C.gold }],
    [{ text: 'all G–C, 3 bonds each: about 80 °C', at: [2.4, -2.25], to: [5.5, -3.5], color: C.red }],
  ],
};
