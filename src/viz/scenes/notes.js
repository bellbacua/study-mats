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
};
