// Story versions, batch 14: year 4.
import { C } from '../theme';
import * as um_year4a from './um_year4a';
import * as um_year4b from './um_year4b';

const Z = um_year4a;
const W = um_year4b;

// ---------------------------------------------------------------------------
// Rolling: cold work and hot work
// ---------------------------------------------------------------------------
export const rolling_mill = {
  ...Z.rolling_mill,
  ease: 1.6,
  beats: [
    {
      say: 'A copper strip squeezed between two rolls comes out thinner and longer. Sheet, foil and wire all start this way.',
      set: { r: 20, mode: 'cold' },
      ms: 9500,
    },
    {
      say: 'Rolled cold, from 10 to 5 mm, a 50% reduction. The grains are squashed flat, and the yield strength climbs from 70 to about 260 MPa.',
      set: { r: 50 },
      ms: 11000,
      notes: [
        { text: 'grains squashed flat', at: [1.0, 3.3], to: [0.0, 0.8], color: C.gold },
        { text: 'yield strength up: 70 → 260 MPa', at: [3.6, 0.5], to: [5.2, -1.75], color: C.yellow },
      ],
    },
    {
      say: 'Why stronger? Each pass creates more dislocations, the line defects that let metal bend. They tangle and jam each other: work hardening.',
      set: {},
      ms: 11000,
    },
    {
      say: 'The price is ductility. At 75% cold work the stretch before breaking is down to about 3%, from 45%. Roll much further and the strip cracks.',
      set: { r: 75 },
      ms: 11000,
      notes: [{ text: 'ductility nearly gone', at: [4.4, 1.0], to: [6.85, -3.3], color: C.teal }],
    },
    {
      say: 'Roll it hot instead, above its recrystallisation temperature. New round grains form as fast as the old ones are squashed. The strip stays soft and can take huge reductions.',
      set: { mode: 'hot' },
      ms: 11500,
      notes: [
        { text: 'hot: new round grains form', at: [1.0, 3.3], to: [-0.5, 0.9], color: C.gold },
        { text: 'stays soft', at: [4.6, 0.6], to: [6.8, -2.9], color: C.yellow },
      ],
    },
    {
      say: 'So mills roll hot to get the shape, then finish cold to get strength and a smooth surface. The final cold pass sets the temper of the sheet.',
      set: { mode: 'cold', r: 30 },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// Reynolds: laminar and turbulent flow
// ---------------------------------------------------------------------------
export const reynolds_dye = {
  ...Z.reynolds_dye,
  ease: 1.6,
  beats: [
    {
      say: 'In 1883 Osborne Reynolds ran water through a glass pipe and let a thin thread of dye into the middle.',
      set: { v: 0.05, f: 'water' },
      ms: 9500,
    },
    {
      say: 'Slow flow: the dye stays a straight thread. The water slides in smooth layers, fastest in the middle and still at the walls. This is laminar flow.',
      set: {},
      ms: 11000,
      notes: [{ text: 'fastest in the middle, still at the walls', at: [4.8, -2.0], to: [1.75, -2.1], color: C.yellow }],
    },
    {
      say: 'One number predicts the behaviour: Re = density × speed × pipe width ÷ viscosity. Here, at 5 cm/s in a 25 mm pipe, Re = 1,250.',
      set: {},
      ms: 11000,
    },
    {
      say: 'At 12 cm/s, Re = 3,000. The thread starts to wave and burst in places: transitional flow, exactly what Reynolds saw.',
      set: { v: 0.12 },
      ms: 10500,
      notes: [{ text: 'the thread starts to wave and burst', at: [-2.4, -0.4], to: [1.2, 1.5], color: C.red }],
    },
    {
      say: 'At 40 cm/s, Re = 10,000. The dye is torn apart and fills the pipe: turbulent flow. The mixing flattens the speed profile.',
      set: { v: 0.4 },
      ms: 10500,
      notes: [{ text: 'mixing flattens the speed profile', at: [4.6, -2.0], to: [1.1, -2.1], color: C.yellow }],
    },
    {
      say: 'A thicker oil at the same speed has a much smaller Re and stays laminar. Turbulence mixes and cools well, but costs more pumping power.',
      set: { f: 'oil' },
      ms: 10500,
    },
  ],
};

// ---------------------------------------------------------------------------
// Torsion of shafts
// ---------------------------------------------------------------------------
export const shaft_torsion = {
  ...Z.shaft_torsion,
  ease: 1.6,
  beats: [
    {
      say: 'A motor twists a shaft to drive a pump. Draw a straight line along its surface, then apply 1 kN·m of torque: the line twists into a spiral (exaggerated here).',
      set: { T: 1, d: 50, k: 0 },
      ms: 11000,
      notes: [{ text: 'a straight line twists into a spiral', at: [-4.0, 3.0], to: [-3.0, 1.05], color: C.yellow }],
    },
    {
      say: 'Inside, the shear stress is zero at the centre and grows in a straight line to the surface: 41 MPa for this 50 mm solid shaft.',
      set: {},
      ms: 10500,
      notes: [{ text: 'zero at the centre, largest at the rim', at: [-1.8, -2.8], to: [4.4, 0.5], color: C.pink }],
    },
    {
      say: 'So the core does little work. Bore it out to 30 mm inside: 36% lighter, yet the surface stress rises only to 47 MPa.',
      set: { k: 0.6 },
      ms: 11000,
      notes: [{ text: 'the bored-out core carried very little', at: [-1.8, -2.8], to: [3.6, 0.0], color: C.white }],
    },
    {
      say: 'That is why car drive shafts and bicycle frames are tubes.',
      set: {},
      ms: 7500,
    },
    {
      say: 'A 40 mm solid shaft with 2 kN·m: the stress doubles with torque and grows as 1 ÷ diameter³, to 159 MPa. Small changes in size matter a lot.',
      set: { T: 2, d: 40, k: 0 },
      ms: 11000,
      notes: [{ text: 'smaller shaft, twice the torque: 4× the stress', at: [-2.4, -2.8], to: [2.7, -0.7], color: C.pink }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Reading a fracture surface
// ---------------------------------------------------------------------------
export const fracture_surface = {
  ...Z.fracture_surface,
  ease: 1.6,
  beats: [
    {
      say: 'A broken shaft is a crime scene. Look at the broken face end-on, and it tells you how it failed.',
      set: { mode: 'fatigue', load: 0.6 },
      ms: 9000,
    },
    {
      say: 'Fatigue: the crack started at one point, here a sharp keyway corner, where stress concentrates.',
      set: {},
      ms: 9500,
      notes: [{ text: 'the crack started here, at the keyway corner', at: [-1.6, -3.4], to: [-5.4, -2.3], color: C.red }],
    },
    {
      say: 'It grew a little with each start and stop of the machine, leaving curved beach marks like ripples on sand. The rough zone opposite is where the last of the shaft finally tore.',
      set: {},
      ms: 11500,
    },
    {
      say: 'At low stress, the crack can cross most of the shaft before the rest gives way, so the final zone is small. Its size tells an investigator the load.',
      set: { load: 0.15 },
      ms: 11000,
      notes: [{ text: 'small final zone: the load was low', at: [1.8, 3.3], to: [-1.3, 2.4], color: C.gold }],
    },
    {
      say: 'A single overload in a ductile metal looks different: a dull, fibrous, torn face with a raised lip around the edge.',
      set: { mode: 'ductile', load: 0.8 },
      ms: 10500,
    },
    {
      say: 'Brittle fracture: a flat, shiny, crystalline face, with river marks fanning back to the origin and no beach marks.',
      set: { mode: 'brittle', load: 0.6 },
      ms: 10500,
      notes: [{ text: 'river marks fan back to the origin', at: [-1.4, -3.4], to: [-4.6, -1.6], color: C.white }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Sintering: powder to solid
// ---------------------------------------------------------------------------
export const sintering_density = {
  ...Z.sintering_density,
  ease: 1.6,
  beats: [
    {
      say: 'Many ceramics and some metal parts start as powder pressed into shape. It is fragile and full of gaps. Heat it, below melting, and it turns solid: sintering.',
      set: { T: 1000, tm: 0 },
      ms: 11000,
    },
    {
      say: 'Hot atoms wander. They move from the particles into the contact points, building necks between neighbours.',
      set: { tm: 60 },
      ms: 10000,
    },
    {
      say: 'At 1,000 °C for an hour this is slow: the part is still about 70% dense, full of pores.',
      set: {},
      ms: 9500,
      notes: [{ text: 'dark gaps = pores still open', at: [-1.6, -3.1], to: [-3.95, 0.12], color: C.white }],
    },
    {
      say: 'At 1,250 °C the atoms move about ten times faster. In an hour the pores close to about 98% density, and the part shrinks about 15% in every direction.',
      set: { T: 1250 },
      ms: 11500,
      notes: [{ text: 'pores closed, and the part shrank inside its old outline', at: [0.4, -2.9], to: [-1.0, -1.6], color: C.gold }],
    },
    {
      say: 'Designers make the pressed part bigger to allow for that shrinkage.',
      set: {},
      ms: 7500,
    },
    {
      say: 'Even at 1,250 °C, ten minutes is not enough: about 76%. Temperature and time trade against each other. Spark plugs, tiles and dental crowns are all sintered.',
      set: { tm: 10 },
      ms: 11000,
      notes: [{ text: 'ten minutes: still porous', at: [4.6, -0.6], to: [2.5, -0.05], color: C.yellow }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Mohr's circle
// ---------------------------------------------------------------------------
export const mohr_circle = {
  ...Z.mohr_circle,
  ease: 1.6,
  beats: [
    {
      say: 'A tiny square of material inside a loaded part. Its faces are pushed or pulled (σ) and dragged sideways (τ). Here σx = 80, σy = 20 and τxy = 40 MPa.',
      set: { sx: 80, sy: 20, txy: 40, th: 0 },
      ms: 11500,
    },
    {
      say: 'Turn the square and the stresses on its faces change. Otto Mohr (1882) showed that all the possibilities lie on one circle. The x-face is the point (80, 40).',
      set: {},
      ms: 11500,
      notes: [{ text: 'x-face: (80, 40) on the circle', at: [6.0, 2.7], to: [5.6, 1.25], color: C.blue }],
    },
    { say: 'Rotate the square slowly…', set: { th: 12 }, ms: 7500 },
    {
      say: 'At 26.6° the point reaches the axis, having moved twice as far, 53°, round the circle. No shear on the faces, and σ₁ = 100 MPa: the largest pull at this point.',
      set: { th: 26.6 },
      ms: 11500,
      notes: [{ text: 'on the axis: no shear, σ₁ = 100 MPa', at: [5.6, 2.6], to: [6.1, 0.3], color: C.red }],
    },
    {
      say: 'Cracks in brittle materials open across that direction. So the circle tells you where a part will crack.',
      set: {},
      ms: 9500,
    },
    {
      say: 'Pure twisting: no σ, τ = 50. Turned 45°, the faces carry pure pull and push of 50 MPa. That is why twisted chalk snaps along a 45° spiral.',
      set: { sx: 0, sy: 0, txy: 50, th: 45 },
      ms: 11500,
      notes: [{ text: 'turned 45°: pure tension, 50 MPa', at: [-2.0, 3.0], to: [-4.0, 1.3], color: C.teal }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Carbon nanotubes: rolling graphene
// ---------------------------------------------------------------------------
export const nanotube_roll = {
  ...Z.nanotube_roll,
  ease: 1.4,
  beats: [
    {
      say: 'Graphene: one layer of carbon atoms in a honeycomb. Roll it into a seamless tube and you have a carbon nanotube, made famous by Sumio Iijima in 1991.',
      set: { n: 10, m: 10, roll: 0 },
      ms: 11000,
    },
    {
      say: 'The yellow arrow, the chiral vector (n, m) = (10, 10), says how to roll it: its two ends are the atoms that will meet.',
      set: {},
      ms: 10000,
      notes: [{ text: 'the arrow’s two ends meet when the sheet rolls up', at: [5.0, -1.1], to: [3.5, -2.55], color: C.yellow }],
    },
    { say: 'Roll…', set: { roll: 0.5 }, ms: 6000 },
    {
      say: '(10, 10) is an armchair tube, 1.36 nm across. Since n − m = 0, a multiple of 3, it conducts like a metal.',
      set: { roll: 1 },
      ms: 10500,
      notes: [{ text: 'n − m = 0: conducts like a metal', at: [4.6, 0.6], to: [1.2, 0.6], color: C.yellow }],
    },
    {
      say: 'Change to (10, 0), a zigzag tube. Now n − m = 10, not a multiple of 3: a semiconductor, with a band gap. Same carbon, same sheet, only a different roll.',
      set: { n: 10, m: 0 },
      ms: 11500,
      notes: [{ text: 'n − m = 10: a semiconductor', at: [4.4, 0.6], to: [0.8, 0.6], color: C.teal }],
    },
    {
      say: 'Making tubes of only one kind is still a major challenge, and one reason nanotube computer chips are not yet everywhere.',
      set: { n: 9, m: 6 },
      ms: 10000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Statistical process control
// ---------------------------------------------------------------------------
export const control_chart = {
  ...W.control_chart,
  ease: 1.6,
  beats: [
    {
      say: 'A machine cuts rods to 100 mm. Every hour, measure 5 rods and plot their average. Walter Shewhart invented this chart at Western Electric in 1924.',
      set: { drift: 0, n: 5 },
      ms: 10500,
    },
    {
      say: 'The lines are limits, three standard errors either side of the target. If nothing has changed, almost every point lands inside.',
      set: {},
      ms: 10000,
      notes: [{ text: 'just noise: every point inside the limits', at: [-3.4, -2.4], to: [-3.9, -0.85], color: C.teal }],
    },
    {
      say: 'The points still wander. That is ordinary noise. Adjusting the machine to chase it only makes things worse.',
      set: {},
      ms: 9500,
    },
    {
      say: 'At hour 15 the cutter drifts 0.2 mm long. The very first sample after it jumps above the upper limit: a real signal. Stop and find the cause.',
      set: { drift: 0.2 },
      ms: 11000,
      notes: [{ text: 'first sample after the drift: out of limits', at: [-3.6, 3.0], to: [0.0, 1.35], color: C.red }],
    },
    {
      say: 'A smaller drift, 0.1 mm, with samples of only 2 rods: the limits are wide, and the change hides in the noise for 7 hours.',
      set: { drift: 0.1, n: 2 },
      ms: 11000,
      notes: [{ text: 'small drift, small samples: hidden for 7 hours', at: [-3.4, 3.1], to: [2.75, 2.1], color: C.red }],
    },
    {
      say: 'Bigger samples narrow the limits and catch small drifts sooner. Try 8 rods.',
      set: { n: 8 },
      ms: 9000,
    },
  ],
};

// ---------------------------------------------------------------------------
// Hip implants: stress shielding
// ---------------------------------------------------------------------------
export const implant_stiffness = {
  ...W.implant_stiffness,
  ease: 1.6,
  beats: [
    {
      say: 'A hip replacement: a metal stem pushed down inside the thigh bone. When you stand, the load is shared between stem and bone.',
      set: { d: 14, k: 'cocr' },
      ms: 10000,
    },
    {
      say: 'The stiffer partner carries more. A 14 mm cobalt-chrome stem is about 12 times stiffer than bone and takes about four-fifths of the load.',
      set: {},
      ms: 10500,
      notes: [{ text: 'the stem takes most of the load', at: [5.4, 1.3], to: [5.8, 2.6], color: C.teal }],
    },
    {
      say: 'Bone is alive. Wolff (1892): bone grows where it is loaded and thins where it is not. Shielded from load, the bone around the stem slowly thins, and the stem can loosen.',
      set: {},
      ms: 12000,
      notes: [{ text: 'specks: bone thinning', at: [-0.6, -0.5], to: [-2.8, 0.2], color: C.white }],
    },
    {
      say: 'A 12 mm titanium-alloy stem: about half as stiff as cobalt-chrome, so the bone takes back about 42% of the load.',
      set: { d: 12, k: 'ti' },
      ms: 10500,
      notes: [{ text: 'titanium: half as stiff, bone takes 42%', at: [4.6, 0.9], to: [3.3, -1.6], color: C.blue }],
    },
    {
      say: 'A 10 mm titanium stem lets the bone carry just over half. Too thin, though, and the stem itself may bend or break. The designer balances both.',
      set: { d: 10 },
      ms: 11000,
      notes: [{ text: 'bone now carries over half', at: [4.6, 0.9], to: [3.0, 2.65], color: C.yellow }],
    },
  ],
};

// ---------------------------------------------------------------------------
// Scaling up a plant
// ---------------------------------------------------------------------------
export const plant_scaleup = {
  ...W.plant_scaleup,
  ease: 1.6,
  beats: [
    {
      say: 'How big should a new plant be? A reference plant making 10,000 t a year costs ₱200 M to build.',
      set: { Q: 10000 },
      ms: 9500,
    },
    {
      say: 'Each tonne costs about ₱22,200 to make and sells for ₱25,000. The gap is profit: ₱28 M a year.',
      set: {},
      ms: 10000,
      notes: [{ text: 'gap = profit on each tonne', at: [-0.4, 1.6], to: [2.9, -0.7], color: C.green }],
    },
    {
      say: 'Plant cost does not grow in step with size. Engineers use the six-tenths rule: twice the capacity costs about 2^0.6 ≈ 1.5 times as much. A tank twice as big needs far less than twice the steel.',
      set: { Q: 20000 },
      ms: 12000,
    },
    {
      say: 'A small 3,000 t plant costs only ₱97 M, but its building cost and fixed staff are spread over few tonnes: about ₱26,900 each. It loses money.',
      set: { Q: 3000 },
      ms: 11000,
      notes: [{ text: 'small plant: cost above the price, a loss', at: [4.4, 2.6], to: [1.95, 0.55], color: C.red }],
    },
    {
      say: 'At 40,000 t the plant costs ₱460 M, 2.3 times as much for 4 times the output. Each tonne costs about ₱20,000: if the market will buy them all.',
      set: { Q: 40000 },
      ms: 11000,
      notes: [
        { text: 'cost ×2.3 for output ×4', at: [-0.8, 2.6], to: [-2.7, 0.75], color: C.teal },
        { text: 'big plant: cheapest per tonne', at: [4.4, 1.4], to: [7.3, -1.6], color: C.green },
      ],
    },
  ],
};
