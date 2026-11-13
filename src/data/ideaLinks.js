// Links between subjects for the idea map: a class and the earlier classes
// from OTHER subjects whose idea it uses (within a subject, each class
// already builds on the one before it). Every link points to a class that
// comes earlier on the timetable, so following the map never sends you
// ahead of yourself. Checked by scripts/check-idea-links.mjs.
export const IDEA_LINKS = {
  // Year 1
  'mate-001': ['chem-000'], // what things are made of
  'phys-002': ['num-005'], // density is a division
  'phys-003': ['num-005'],
  'math-002': ['num-005'],
  'chem-002': ['math-002', 'phys-001'], // ratios and units
  'num-007': ['math-002'],
  'math-004': ['num-005'],
  'chem-003': ['math-004', 'chem-002'], // 6.022 × 10²³ in scientific notation
  'geo-001': ['num-008'], // √2 is irrational
  'chem-004': ['chem-000'],
  'math-003': ['math-001'],
  'chem-001': ['chem-004'],
  'math-005': ['math-003', 'geo-001'],
  'phys-005': ['phys-004'],
  'chem-006': ['math-005', 'math-003', 'phys-005'], // straight-line gas laws, temperature
  'mate-100': ['chem-003'],
  'chem-013': ['chem-003'],
  'mate-110': ['chem-001', 'mate-001'], // bonds decide the family
  'math-010': ['geo-002'],
  'phys-101': ['phys-004', 'math-005'], // force, and stress-strain as a straight line
  'num-009': ['math-006'], // quadratics with no real roots
  'math-011': ['math-005'],
  'phys-006': ['chem-001'], // electrons
  'phys-007': ['math-011', 'math-006'], // a parabola path
  'chem-008': ['math-008'], // Arrhenius
  'mate-111': ['math-011', 'mate-110'],
  'chem-009': ['math-008'],
  'phys-008': ['math-011'],
  'chem-010': ['math-008'], // pH is a logarithm
  'math-101': ['phys-003'], // speed as a rate of change
  'phys-009': ['math-010'], // radians
  'chem-011': ['phys-006'], // electric current
  'mate-114': ['phys-101'],
  'phys-010': ['phys-101', 'math-010'], // Hooke's law, sine waves
  'phys-011': ['math-010'],
  'mate-112': ['mate-111', 'geo-002', 'phys-011'], // Bragg's law: waves and sin θ
  'chem-005': ['phys-011'],
  'mate-116': ['phys-012', 'math-008'], // S = k ln W
  'mate-113': ['mate-111'],
  'chem-014': ['phys-013', 'chem-005'], // light and orbitals
  // Year 2
  'chem-101': ['mate-116', 'chem-009'],
  'mate-201': ['mate-113', 'math-101', 'math-008'], // Fick's law and Arrhenius
  'mate-301': ['chem-016'],
  'mate-117': ['chem-101'],
  'mate-118': ['chem-005', 'phys-006'],
  'mate-401': ['mate-118'],
  'mate-119': ['chem-101', 'math-015'], // critical radius: where the slope is zero
  'mate-203': ['mate-119'],
  'mate-302': ['mate-110', 'phys-101'],
  'eng-003': ['math-023'],
  'chem-017': ['chem-010'],
  'math-026': ['phys-010'],
  'phys-201': ['math-011'],
  'eng-004': ['math-008'], // growth by a fixed percentage
  'mate-120': ['mate-202'],
  'mate-121': ['mate-203'],
  'phys-203': ['math-018'], // areas and moments by integrals
  'mate-122': ['mate-203'],
  'mate-123': ['mate-301'],
  'mate-124': ['chem-011', 'chem-010'], // Pourbaix: voltage against pH
  'phys-207': ['math-007'], // solving several equations at once
  'eng-006': ['math-024'],
  'mate-125': ['phys-101', 'mate-201'],
  'mate-127': ['mate-203'],
  'mate-126': ['mate-201', 'math-008'],
  'phys-209': ['math-010', 'num-009'], // sine waves and complex numbers
  'mate-128': ['mate-302'],
  'phys-211': ['phys-101'],
  'mate-130': ['mate-119', 'mate-202'],
  'phys-215': ['phys-002'], // Archimedes
  'mate-133': ['mate-302', 'mate-127'],
  'mate-135': ['mate-110'],
  'mate-131': ['mate-201'],
  'mate-134': ['mate-125', 'mate-133'],
  'mate-132': ['mate-201'],
  'phys-214': ['math-027'], // stress as a table of numbers
  'eng-009': ['math-024'],
  'mate-137': ['mate-124'],
  'mate-138': ['mate-132', 'eng-002'],
  'mate-139': ['chem-011', 'mate-401'],
  'eng-012': ['eng-006'],
  'mate-402': ['mate-134', 'eng-006'],
  // Computer Science
  'cs-101': ['comp-002'],
  'comp-003': ['cs-103'],
  'comp-004': ['comp-001'], // Boole's logic in circuits
  'comp-006': ['cs-103'],
  'comp-007': ['cs-104'],
  'comp-009': ['math-021'],
  'comp-010': ['math-014', 'math-027'], // chain rule and matrices
  'comp-011': ['math-011'],
  // Side topics
  'phil-007': ['math-022'], // Bayes needs probability
  'econ-004': ['math-101'], // the margin is a derivative
  'bio-002': ['chem-001'],
  'bio-006': ['chem-008'], // enzymes speed up reactions
};
