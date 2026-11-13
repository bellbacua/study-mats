import { HINT_STEPS } from './hintSteps';
import { CALC1 } from './calc1';
import { CALC2 } from './calc2';
import { NUMBERS } from './numbers';
import { ALGEBRA } from './algebra';
import { PHYSICS1 } from './physics1';
import { CHEM1 } from './chem1';
import { CHEM2 } from './chem2';
import { MATE1 } from './mate1';
import { YEAR3A } from './year3a';
import { YEAR3B } from './year3b';
import { YEAR4A } from './year4a';
import { YEAR4B } from './year4b';
import { SPEC_METALS } from './spec_metals';
import { SPEC_ELECTRONIC } from './spec_electronic';
import { SPEC_ENERGY } from './spec_energy';
import { SIDE_PHILO } from './side_philo';
import { SIDE_BIO } from './side_bio';
import { SIDE_COMP } from './side_comp';
import { SIDE_ECON } from './side_econ';
import { CS_PROG } from './cs_prog';
import { CS_AI } from './cs_ai';
import { CS_DISC } from './cs_disc';
import { START } from './start';
import { CS_ALGO } from './cs_algo';
import { CS_SYS } from './cs_sys';
import { CS_PRACTICE } from './cs_practice';
import { SEC } from './sec';

// Classes that have been split into parts (the "Learn it" section).
// The Calculus 1 classes are the pilot.
export const DEEP = { ...CALC1, ...CALC2, ...NUMBERS, ...ALGEBRA, ...PHYSICS1, ...CHEM1, ...CHEM2, ...MATE1, ...YEAR3A, ...YEAR3B, ...YEAR4A, ...YEAR4B, ...SPEC_METALS, ...SPEC_ELECTRONIC, ...SPEC_ENERGY, ...SIDE_PHILO, ...SIDE_BIO, ...SIDE_COMP, ...SIDE_ECON, ...CS_PROG, ...CS_AI, ...CS_DISC, ...START, ...CS_ALGO, ...CS_SYS, ...CS_PRACTICE, ...SEC };

// Written "first steps" for the hint ladder (see hintSteps.js).
for (const [key, [steps]] of Object.entries(HINT_STEPS)) {
  const [id, part, k] = key.split(':');
  const item = DEEP[id]?.parts?.[Number(part)]?.practice?.[Number(k)];
  if (item && !item.steps) item.steps = steps;
}
