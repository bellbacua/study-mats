import { CALC1 } from './calc1';
import { CALC2 } from './calc2';
import { NUMBERS } from './numbers';
import { ALGEBRA } from './algebra';

// Classes that have been split into parts (the "Learn it" section).
// The Calculus 1 classes are the pilot.
export const DEEP = { ...CALC1, ...CALC2, ...NUMBERS, ...ALGEBRA };
