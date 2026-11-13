// "I'm lost" help, written ahead of time (the app makes no AI calls).
//
// For each class, `p` has one entry per story paragraph and `s` one per
// animation step, in order:
//   p: [[plainer, everyday comparison, [quick-check question, right, wrong, wrong]], ...]
//   s: [[plainer, everyday comparison], ...]
// A plainer version only restates its paragraph or step, so it is shown with
// that paragraph's own citation marks (steps use the class's topic source).
// A comparison is a teaching picture, not a new fact: it is labelled as one
// and points at the same sources as the fact it pictures.
// Leave an entry null to skip it. Checked by scripts/check-help.mjs.
import { START_HELP } from './start';
import { Y1A_HELP } from './y1a';

export const HELP = { ...START_HELP, ...Y1A_HELP };
