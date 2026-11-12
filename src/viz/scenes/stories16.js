// Story versions, batch 16: the metals, electronic and energy tracks.
// These scenes already had good per-step notes, so `retell` reuses them by
// index (n: k) and adds the hook, the history and the "why it matters" beats.
import { NOTES } from './notes';
import * as spec_metals from './spec_metals';
import * as spec_electronic from './spec_electronic';
import * as spec_energy from './spec_energy';

export function retell(base, type, beats, ease = 1.6) {
  const old = NOTES[type] || [];
  return {
    ...base,
    ease,
    beats: beats.map(({ n, ...b }) => (n == null ? b : { ...b, notes: old[n] })),
  };
}

const M = spec_metals;
const E = spec_electronic;
const G = spec_energy;

export const stainless_pren = retell(M.stainless_pren, 'stainless_pren', [
  { say: 'Iron rusts because its oxide is loose and flaky: it falls off and lets fresh metal corrode. Chromium’s oxide is different: thin, tight and self-healing.', set: { cr: 0, mo: 0, n: 0.05 }, ms: 11000 },
  { say: 'With 5% chromium the protective oxide forms only in patches. Rust gets through the gaps.', set: { cr: 5 }, ms: 9500, n: 0 },
  { say: 'Past about 10.5% the chromium oxide joins into one continuous film, a few nanometres thick, and corrosion slows more than ten times. Harry Brearley made such a steel in Sheffield in 1913.', set: { cr: 12 }, ms: 12000, n: 1 },
  { say: 'Salt water attacks in tiny pits. To rate a steel, metallurgists use PREN = %Cr + 3.3 × %Mo + 16 × %N. Molybdenum and nitrogen count far more per percent.', set: {}, ms: 11000 },
  { say: 'Grade 316: 17% chromium and 2.1% molybdenum. PREN about 25: good for coastal air if it is washed.', set: { cr: 17, mo: 2.1 }, ms: 10000, n: 2 },
  { say: 'Super-duplex: 25% chromium, 3.5% molybdenum, 0.25% nitrogen. PREN about 41: fit for seawater, offshore platforms and desalination plants.', set: { cr: 25, mo: 3.5, n: 0.25 }, ms: 11000, n: 3 },
]);

export const resistivity_temp = retell(E.resistivity_temp, 'resistivity_temp', [
  { say: 'Why does copper conduct and glass not? In a metal, some electrons are free to drift through the whole crystal. Push them with a voltage and they flow.', set: { m: 'cu', T: 20, imp: 0 }, ms: 10500 },
  { say: 'They do not fly straight. They bounce off the vibrating atoms. Pure copper at 20 °C: 1.68 × 10⁻⁸ Ω·m, one of the lowest of any metal.', set: {}, ms: 10500, n: 0 },
  { say: 'Heat it to 200 °C: the atoms shake harder, electrons scatter more, and the resistivity rises by about 70%. That is why hot wires waste more power.', set: { T: 200 }, ms: 11000, n: 1 },
  { say: 'Back at 20 °C, add impurities. Each odd atom is another bump to bounce off. The whole line shifts up by a fixed amount: Matthiessen’s rule (1864).', set: { T: 20, imp: 0.6 }, ms: 11500, n: 2 },
  { say: 'So wiring copper is refined to 99.99% purity. Iron scatters electrons far more: almost six times copper’s resistivity.', set: { m: 'fe', imp: 0 }, ms: 10500, n: 3 },
]);

export const doping_carriers = retell(E.doping_carriers, 'doping_carriers', [
  { say: 'Pure silicon barely conducts. Heat frees only a few electrons, each leaving a hole: about 10¹⁰ of each per cm³, out of 5 × 10²² atoms.', set: { type: 'n', lg: 8 }, ms: 11000, n: 0 },
  { say: 'Phosphorus has five outer electrons; silicon has four. Swap a phosphorus atom in and its fifth electron is left over, free to move.', set: { lg: 12 }, ms: 10500 },
  { say: '10¹⁶ phosphorus atoms per cm³, one in every 5 million silicon atoms. Electrons jump to 10¹⁶; holes drop to 10⁴. A pinch of impurity makes it conduct a million times better.', set: { lg: 16 }, ms: 12000, n: 1 },
  { say: 'Electrons and holes keep a fixed product, n × p ≈ 10²⁰ at room temperature. Raise one and the other falls.', set: {}, ms: 9500 },
  { say: 'Boron has only three outer electrons. It grabs one from a neighbour, leaving a hole. Now holes are the majority: p-type silicon.', set: { type: 'p' }, ms: 11000, n: 2 },
  { say: 'Every chip is built from n-type and p-type regions side by side. Controlling doping to parts per billion is the foundation of electronics.', set: { lg: 17 }, ms: 10000 },
]);

export const diode_iv = retell(E.diode_iv, 'diode_iv', [
  { say: 'Join p-type to n-type silicon. Where they meet, electrons fill holes and leave a thin barrier with no free carriers: a pn junction, the heart of a diode.', set: { V: 0, T: 300 }, ms: 11000 },
  { say: 'Push forward with 0.3 V: the barrier is lowered only slightly. The current is a few microamps at most.', set: { V: 0.3 }, ms: 9500, n: 0 },
  { say: 'Past about 0.6 V the current shoots up: every extra 60 mV multiplies it by ten. Shockley wrote the equation in 1949.', set: { V: 0.62 }, ms: 10500, n: 1 },
  { say: 'Reverse the voltage and the barrier grows. Only a tiny leakage, about a picoamp, gets through. Current flows one way only: that turns AC into DC in every charger.', set: { V: -0.8 }, ms: 11500, n: 2 },
  { say: 'Heat the diode to 350 K and the same current flows at a lower voltage, about 2 mV less per kelvin. Many electronic thermometers work this way.', set: { V: 0.52, T: 350 }, ms: 11000, n: 3 },
]);

export const czochralski_scheil = retell(E.czochralski_scheil, 'czochralski_scheil', [
  { say: 'Chips need one perfect crystal of silicon. Jan Czochralski’s method (1916): dip a seed crystal into molten silicon and pull it up slowly while turning. The melt freezes onto it.', set: { imp: 'p', fs: 0 }, ms: 12000 },
  { say: 'Impurities prefer the liquid. Phosphorus has k = 0.35: the first crystal holds only 35% of the melt’s phosphorus. The rest stays behind.', set: { fs: 0.05 }, ms: 10500, n: 0 },
  { say: 'As the melt shrinks, the rejected phosphorus piles up in it, so later crystal is richer. At 90% frozen, it is 4.5 times the start. Scheil’s equation (1942) predicts this curve.', set: { fs: 0.9 }, ms: 12000, n: 1 },
  { say: 'Boron, with k close to 1, stays almost even along the whole ingot. That is why it is the favourite p-type dopant.', set: { imp: 'b' }, ms: 10000, n: 2 },
  { say: 'Iron, with k ≈ 10⁻⁵, is almost completely left behind. Freezing itself purifies the silicon, and the dirty last bit is cut off.', set: { imp: 'fe', fs: 0.5 }, ms: 10500, n: 3 },
]);

export const capacitor_dielectric = retell(E.capacitor_dielectric, 'capacitor_dielectric', [
  { say: 'A capacitor stores charge on two plates facing each other across a gap. Every phone holds hundreds of them, smoothing power and storing bits.', set: { mat: 'air', d: 100, V: 0 }, ms: 10500 },
  { say: 'Air, 100 µm gap, 100 V: only 8.9 pF. The field is 1 MV per metre, a third of what air can stand before it sparks.', set: { V: 100 }, ms: 10500, n: 0 },
  { say: 'Fill the gap with mica. Its molecules stretch and line up against the field, partly cancelling it, so the plates hold six times the charge. Faraday found this in 1837.', set: { mat: 'mica' }, ms: 11500, n: 1 },
  { say: 'Barium titanate, a ceramic discovered in the 1940s: εᵣ around 2,000. The same plates now store 18 nF.', set: { mat: 'bto' }, ms: 10500, n: 2 },
  { say: 'Thinner gaps store more, but the field grows. At 10 µm and 100 V it reaches 10 MV/m, above its breakdown strength, and the capacitor fails.', set: { d: 10 }, ms: 11000, n: 3 },
]);

export const hysteresis_loop = retell(E.hysteresis_loop, 'hysteresis_loop', [
  { say: 'Inside iron, tiny regions called domains are each magnetised in some direction. An outside field H swings them round; B shows how magnetised the metal becomes.', set: { mat: 'ndfeb', ph: 0 }, ms: 11000 },
  { say: 'Sweep the field up, then down. The way back is not the way up: the material remembers. Ewing named this hysteresis in 1881.', set: { ph: 0.15 }, ms: 10500 },
  { say: 'NdFeB after magnetising: the field is back to zero, but B stays at 1.3 T. That memory is the remanence.', set: { ph: 0.25 }, ms: 10000, n: 0 },
  { say: 'Push the field backwards to −900 kA/m before B finally reaches zero. That huge coercivity is what makes a permanent magnet. NdFeB, invented in 1982, drives every EV motor and earbud.', set: { ph: 0.34 }, ms: 12000, n: 1 },
  { say: 'Soft iron is the opposite: only 0.08 kA/m flips it. The loop is so thin it is almost a line. The loop’s area is energy lost each cycle, so transformers want it thin.', set: { mat: 'iron', ph: 0.27 }, ms: 12000, n: 2 },
  { say: 'Ferrite magnets sit in between: cheap, and good enough for fridge magnets and speakers.', set: { mat: 'ferrite', ph: 0.3 }, ms: 9000 },
]);

export const energy_density = retell(G.energy_density, 'energy_density', [
  { say: 'Every energy source must be carried, stored or held back somehow. How much mass does each need to give the same useful energy?', set: { E: 1 }, ms: 9500 },
  { say: '1 kWh of useful work runs a fan for about 16 hours, or lifts a car 300 m. Diesel needs a quarter of a kilogram; a dam needs over 4 tonnes of water.', set: {}, ms: 11500, n: 0 },
  { say: '20 kWh, a small electric car’s 100 km. Diesel: about 5 kg. Lithium-ion cells: about 90 kg, still about 17 times heavier, even after counting the engine’s waste heat.', set: { E: 20 }, ms: 12000, n: 1 },
  { say: '200 kWh, an electric jeepney’s day. Lead-acid would need almost 7 tonnes, which is why nobody builds it that way.', set: { E: 200 }, ms: 10500, n: 2 },
  { say: 'Better battery materials are slowly closing this gap. That race is one of the biggest in materials engineering today.', set: { E: 60 }, ms: 9000 },
]);

export const electrode_capacity = retell(G.electrode_capacity, 'electrode_capacity', [
  { say: 'A battery’s energy depends on how much lithium each gram of electrode can hold (mAh/g) and the voltage between the two sides.', set: { c: 'lco', a: 'gr' }, ms: 10500 },
  { say: 'The 1991 Sony cell: LiCoO₂ with graphite. Each amp-hour needs about 7 g of cathode, but under 3 g of anode. The cathode is most of the weight.', set: {}, ms: 11500, n: 0 },
  { say: 'Silicon holds ten times what graphite holds. Swap it in and the anode almost vanishes. But the cathode stays, so the cell gains only about a third.', set: { a: 'si' }, ms: 11500, n: 1 },
  { say: 'Silicon also swells to about four times its size when full of lithium, and cracks. So real cells use a silicon–graphite blend, with a better nickel-rich cathode.', set: { c: 'nmc', a: 'sib' }, ms: 12000, n: 2 },
  { say: 'LFP with LTO: very safe and long-lived, for buses and grid storage, but the voltage gap shrinks to 1.85 V, so the energy is low. Every choice is a trade-off.', set: { c: 'lfp', a: 'lto' }, ms: 11500, n: 3 },
]);

export const solar_bandgap = retell(G.solar_bandgap, 'solar_bandgap', [
  { say: 'Sunlight is a stream of photons of many energies. A solar cell catches a photon only if it has at least the band-gap energy, and it can keep only that much from each one.', set: { Eg: 1.12 }, ms: 11500 },
  { say: 'Silicon, 1.12 eV. Grey photons pass through; the yellow part is what the cell keeps; the red part above the gap is lost as heat.', set: {}, ms: 11000, n: 0 },
  { say: 'A tiny gap, 0.5 eV, catches almost every photon, but keeps only 0.5 eV from each one. Most of the sunlight becomes heat.', set: { Eg: 0.5 }, ms: 10500, n: 1 },
  { say: 'A wide gap, 2.5 eV, keeps a lot from each photon it catches, but most photons pass straight through.', set: { Eg: 2.5 }, ms: 10000, n: 2 },
  { say: 'Shockley and Queisser (1961) worked out the best possible: about 33%, near 1.34 eV. Gallium arsenide, 1.42 eV, holds the single-junction record and powers satellites.', set: { Eg: 1.42 }, ms: 12000, n: 3 },
  { say: 'Stack cells with different gaps and each layer takes its own slice of the spectrum. Multi-junction cells have passed 45% this way.', set: { Eg: 1.8 }, ms: 10000 },
]);

export const fuel_cell_curve = retell(G.fuel_cell_curve, 'fuel_cell_curve', [
  { say: 'A fuel cell combines hydrogen and oxygen into water, directly making electricity, with no burning. William Grove built the first in 1839. In theory it gives 1.23 V.', set: { i: 0, r: 0.15 }, ms: 11500 },
  { say: 'At almost no current it already sits below 1.1 V. Starting the reaction on the catalyst costs voltage: the activation loss.', set: { i: 0.02 }, ms: 10500, n: 0 },
  { say: 'Draw more current. In the middle the voltage falls in a straight line: the membrane’s resistance, V = iR, like any resistor.', set: { i: 0.8 }, ms: 10500, n: 1 },
  { say: 'Near the limit, gas cannot reach the catalyst fast enough and the voltage falls off a cliff.', set: { i: 1.5 }, ms: 9500, n: 2 },
  { say: 'A thinner membrane, lower resistance, keeps more voltage at high current: more power from the same cell. Membrane and catalyst materials decide a fuel cell’s cost.', set: { i: 1.0, r: 0.05 }, ms: 11500, n: 3 },
]);

export const thermoelectric_zt = retell(G.thermoelectric_zt, 'thermoelectric_zt', [
  { say: 'Heat one end of certain materials and a voltage appears: Seebeck found this in 1821. A thermoelectric turns waste heat into electricity with no moving parts.', set: { Th: 400, ZT: 1 }, ms: 11000 },
  { say: 'No heat engine can beat Carnot’s limit. Between 400 K and 300 K that is 25%. This material, with ZT = 1, gets about 5%.', set: {}, ms: 11000, n: 0 },
  { say: 'ZT measures a good thermoelectric: it must conduct electricity well but heat badly. In most materials those two go together, which is what makes it hard.', set: {}, ms: 11000 },
  { say: 'A truck exhaust, 500 K. Carnot 40%, the thermoelectric about 8%.', set: { Th: 500 }, ms: 9000, n: 1 },
  { say: 'Silicon–germanium in space generators runs near 1000 K, with ZT about 0.6. The Voyager probes, launched in 1977, still run on this kind of generator.', set: { Th: 1000, ZT: 0.6 }, ms: 11500, n: 2 },
  { say: 'A future material with ZT = 3 would almost double that, to about 15%, close to small engines.', set: { Th: 500, ZT: 3 }, ms: 9500, n: 3 },
]);

export const geothermal_flash = retell(G.geothermal_flash, 'geothermal_flash', [
  { say: 'The Philippines is one of the world’s largest geothermal power producers, with fields like Tiwi, Makban and Leyte. Hot water from deep wells is flashed into steam to spin turbines.', set: { Ts: 200 }, ms: 12000 },
  { say: 'Water comes up from a 250 °C reservoir. Flashed at 200 °C, only 12% becomes steam, and the leftover brine is far below its silica limit.', set: {}, ms: 10500, n: 0 },
  { say: 'At 160 °C, about 20% flashes to steam: much more power. Silica in the brine rises to about 607 mg/kg, still under the 680 that can stay dissolved.', set: { Ts: 160 }, ms: 11500, n: 1 },
  { say: 'Push it to 120 °C: 26% steam, but the brine is now 45% oversaturated. Silica scale, like glass, starts lining the pipes and choking the wells.', set: { Ts: 120 }, ms: 11500, n: 2 },
  { say: 'So engineers trade power for pipe life, and choose pipe materials and chemical treatments that slow the scale. Find the lowest safe temperature.', set: { Ts: 185 }, ms: 10000 },
]);
