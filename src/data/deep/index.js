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

// Classes that have been split into parts (the "Learn it" section).
// The Calculus 1 classes are the pilot.
export const DEEP = { ...CALC1, ...CALC2, ...NUMBERS, ...ALGEBRA, ...PHYSICS1, ...CHEM1, ...CHEM2, ...MATE1, ...YEAR3A, ...YEAR3B, ...YEAR4A, ...YEAR4B, ...SPEC_METALS };
