// Story versions, batch 18: side topic, Biomolecular Engineering.
import { retell } from './stories16';
import * as B from './side_bio';

export const cell_surface = retell(B.cell_surface, 'cell_surface', [
  { say: 'Every living thing is made of cells, and almost all cells are tiny. Why not one big cell? Food and oxygen come in through the surface, but are used by the whole inside.', set: { r: 1 }, ms: 11500 },
  { say: 'A bacterium-sized cell, radius 1 µm: 3 µm² of surface for every µm³ inside. Food has an easy way in.', set: {}, ms: 10000, n: 0 },
  { say: 'Grow the cell. Its surface grows with r², but its inside grows with r³. Galileo noticed this square–cube rule in 1638 for bones and beams.', set: { r: 5 }, ms: 11000 },
  { say: 'A typical animal cell, 10 µm: the ratio has fallen to 0.3. Ten times less surface for each part of the inside.', set: { r: 10 }, ms: 10000, n: 1 },
  { say: 'At 30 µm the ratio is 0.1. The middle of the cell would struggle to get enough oxygen and food. So cells divide instead of growing huge.', set: { r: 30 }, ms: 11000, n: 2 },
  { say: 'Engineers use the same rule: catalysts are made as fine powders, and nanoparticles react fast, because small things have so much surface.', set: { r: 3 }, ms: 10000 },
]);

export const protein_chain = retell(B.protein_chain, 'protein_chain', [
  { say: 'Proteins do most of the work in living things: muscles, enzymes, antibodies. Each one is a chain of amino acids, picked from a menu of 20.', set: { n: 1 }, ms: 10500 },
  { say: 'Three amino acids, 20 choices each: 20 × 20 × 20 = 8,000 different chains.', set: { n: 3 }, ms: 9500, n: 0 },
  { say: 'Frederick Sanger read the first full protein sequence, insulin, in the early 1950s, and won the 1958 Nobel Prize. Every protein has one exact order.', set: { n: 20 }, ms: 11000 },
  { say: '62 amino acids: about 10⁸⁰ possibilities, roughly the number of atoms in the observable universe. And that is a small protein.', set: { n: 62 }, ms: 11000, n: 1 },
  { say: '100 amino acids: about 10¹³⁰ possibilities. Nature has tried only a tiny fraction, which leaves enormous room for engineers to design new proteins.', set: { n: 100 }, ms: 11000, n: 2 },
]);

export const dna_pairs = retell(B.dna_pairs, 'dna_pairs', [
  { say: 'DNA is a twisted ladder. Each rung is a pair of bases: A always pairs with T, and G with C. Watson and Crick found the structure in 1953, using Rosalind Franklin’s X-ray photographs.', set: { g: 4 }, ms: 12000 },
  { say: 'A–T pairs hold with two hydrogen bonds; G–C pairs with three. Mostly A and T: the strands melt apart at about 48 °C.', set: {}, ms: 11000, n: 0 },
  { say: 'Half G and C: melting point about 60 °C, a common target for PCR primers.', set: { g: 10 }, ms: 9500, n: 1 },
  { say: 'All G and C: three bonds on every rung, about 80 °C. And the partner strand always follows the pairing rule.', set: { g: 20 }, ms: 10500, n: 2 },
  { say: 'That rule is how DNA copies itself: unzip the ladder, and each half is a template for a new partner. Watson and Crick noted it in one famous understated sentence.', set: { g: 12 }, ms: 11000 },
]);

export const codon_reader = retell(B.codon_reader, 'codon_reader', [
  { say: 'A gene is a message in four letters. A cell reads it in words of three letters, codons. Each codon names one amino acid, or says stop.', set: { frame: '0', mut: 'none' }, ms: 10500 },
  { say: 'In 1961 Nirenberg and Matthaei cracked the first word: UUU means phenylalanine. Within five years all 64 codons were known.', set: {}, ms: 10500 },
  { say: 'Read in threes from AUG, the start: Met, Ala, Phe, Lys, Trp, Gly, His, Glu, then UAA means stop.', set: {}, ms: 10500, n: 0 },
  { say: 'Start one letter later and the same message reads as a different, wrong protein. Where you start matters.', set: { frame: '1' }, ms: 10000, n: 1 },
  { say: 'Swap one letter: only one amino acid changes, Lys becomes Glu. Sometimes harmless, sometimes not: sickle-cell disease is one such swap.', set: { frame: '0', mut: 'sub' }, ms: 11000, n: 2 },
  { say: 'Insert one letter and every word after it is cut in a new place. Here a stop signal appears early. That is a frameshift, usually far worse.', set: { mut: 'ins' }, ms: 11000, n: 3 },
]);

export const levinthal_search = retell(B.levinthal_search, 'levinthal_search', [
  { say: 'A protein works only once it folds into one exact 3D shape. How does a chain find that shape? Suppose it tried every shape, one by one.', set: { n: 20 }, ms: 10500 },
  { say: '20 amino acids, 3 possible bends each: about 3.5 billion shapes. Trying ten trillion a second, the blind search takes a third of a millisecond.', set: {}, ms: 11000, n: 0 },
  { say: '65 amino acids: the blind search would outlast the universe.', set: { n: 65 }, ms: 9000, n: 1 },
  { say: '150 amino acids, an average protein: 10⁵⁸ seconds. Yet real proteins fold in milliseconds to seconds. Cyrus Levinthal pointed this out in 1969: folding cannot be a blind search.', set: { n: 150 }, ms: 12000, n: 2 },
  { say: 'The chain slides downhill in energy, forming small pieces first. Predicting the final shape took 50 years, until AlphaFold (2020), recognised by the 2024 Nobel Prize in Chemistry.', set: { n: 100 }, ms: 12000 },
]);

export const michaelis_menten = retell(B.michaelis_menten, 'michaelis_menten', [
  { say: 'An enzyme is a protein machine that grabs a molecule, its substrate, changes it, and lets go. How fast does it work as you add more substrate?', set: { S: 0.5, Km: 5, Vmax: 100 }, ms: 10500 },
  { say: 'At low substrate the speed rises almost in proportion: double [S], nearly double the speed. The enzyme spends most of its time waiting.', set: { S: 2 }, ms: 10500, n: 0 },
  { say: 'At [S] = Km = 5 mM the enzyme runs at exactly half its top speed. That is what Km means: how much substrate it needs to get going.', set: { S: 5 }, ms: 10500, n: 1 },
  { say: 'At 45 mM, nine times Km, it reaches 90%. Every enzyme is nearly always busy; more feed barely helps.', set: { S: 45 }, ms: 10000, n: 2 },
  { say: 'Leonor Michaelis and Maud Menten measured this curve in 1913. Bioreactor engineers use it to decide how much feed is worth adding.', set: { S: 15, Km: 2 }, ms: 10500 },
]);

export const batch_growth = retell(B.batch_growth, 'batch_growth', [
  { say: 'Yeast and bacteria make insulin, vaccines and enzymes in steel tanks. Put a few cells into a tank of sugar broth and wait.', set: { mu: 0.5, t: 0 }, ms: 10000 },
  { say: 'Early on the cells are too few to see: 0.005 g per litre, but doubling every 1.4 hours.', set: { t: 4 }, ms: 9500, n: 0 },
  { say: 'Doubling is deceptive. Nothing seems to happen, then everything does: by about 15 hours the tank is half full of cells.', set: { t: 15 }, ms: 10500, n: 1 },
  { say: 'Then the food runs out and growth stops at 10 g per litre. A faster-growing strain gets there sooner, but not higher. Jacques Monod described this in the 1940s.', set: { mu: 0.8, t: 25 }, ms: 11500, n: 2 },
]);

export const pcr_cycles = retell(B.pcr_cycles, 'pcr_cycles', [
  { say: 'To read a gene you need many copies of it. In 1983 Kary Mullis had an idea while driving: copy it, then copy the copies. He won the 1993 Nobel Prize for it.', set: { n: 0, E: 1 }, ms: 11500 },
  { say: 'Each cycle: heat to about 95 °C to split the strands, cool so short primers stick, then warm so an enzyme builds each partner. One copy becomes two.', set: { n: 1 }, ms: 11500 },
  { say: 'Five perfect cycles: 1 → 2 → 4 → 8 → 16 → 32 copies.', set: { n: 5 }, ms: 9000, n: 0 },
  { say: 'The enzyme comes from Thermus aquaticus, a bacterium from Yellowstone’s hot springs, so it survives the heating. Thirty cycles: over a billion copies, in an hour or two.', set: { n: 30 }, ms: 12000, n: 1 },
  { say: 'Real reactions are less than perfect. At 90% efficiency it takes 33 cycles to pass a billion. COVID tests counted the cycles needed to see the virus.', set: { n: 33, E: 0.9 }, ms: 11000, n: 2 },
]);

export const column_peaks = retell(B.column_peaks, 'column_peaks', [
  { say: 'In 1906 Mikhail Tsvet poured a plant extract through a column of chalk powder. The pigments travelled at different speeds and split into coloured bands. He called it chromatography.', set: { L: 6 }, ms: 12000 },
  { say: 'A short 6 cm column: the two peaks overlap. You cannot collect one without the other.', set: {}, ms: 9500, n: 0 },
  { say: 'A longer column: the gap between the peaks grows with length, but each peak only spreads with the square root of length. Longer wins.', set: { L: 12 }, ms: 10500 },
  { say: 'At 15 cm, resolution passes 1.5: baseline separation, two clean peaks.', set: { L: 15 }, ms: 9500, n: 1 },
  { say: '30 cm separates them even better, but the run takes twice as long and needs more pressure. Drug and vaccine purification is a balance of exactly this.', set: { L: 30 }, ms: 11000, n: 2 },
]);

export const scaffold_decay = retell(B.scaffold_decay, 'scaffold_decay', [
  { say: 'To repair bone, surgeons can implant a porous scaffold, often a polymer that slowly breaks down in the body. New bone grows into it and takes over.', set: { k: 0.15, t: 0 }, ms: 11000 },
  { say: 'The timing must match. Fast breakdown, k = 0.15 per week: the scaffold is mostly gone by week 12, while the new tissue is only half grown. The repair would be weak.', set: { t: 12 }, ms: 12000, n: 0 },
  { say: 'k = 0.058: a half-life of 12 weeks. The scaffold steps aside as fast as the tissue takes over.', set: { k: 0.058 }, ms: 10500, n: 1 },
  { say: 'Too slow, k = 0.02: a year later a third of it is still there, in the way of the new bone.', set: { k: 0.02, t: 52 }, ms: 10000, n: 2 },
  { say: 'Materials engineers tune the rate by the polymer’s chemistry and crystallinity. Dissolving stitches work on the same idea.', set: { k: 0.058, t: 30 }, ms: 10000 },
]);
