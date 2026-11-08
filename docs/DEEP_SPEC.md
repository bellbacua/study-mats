# Deeper classes: how to split a class into parts

This file is the brief for writing the "Learn it" parts of a class. The Calculus 1 pilot in
`src/data/deep/calc1.js` is the reference: copy its shape, tone and level exactly.

## Who it is for

- One learner who will start BS Materials Engineering at the University of Mindanao in August 2027.
- No background at all. Explain every idea from scratch, in plain words. Short sentences.
- No programming or computer-science framing anywhere (no "code", "array", "index", "stack",
  "algorithm", "debug", etc.). `node scripts/check-deep.mjs` flags these words.
- Never mention Claude, ChatGPT, Codex or any AI in the content.
- British/neutral spelling as in the pilot ("optimisation", "colour"). Philippine context is
  welcome (pesos, local materials, local places) where it fits naturally.

## What a class gets

Each class (a lesson id from `src/data/path.js`, e.g. `mate-110`) gets one entry:

```js
'mate-110': {
  predict: { q, options: [4 strings], answer: <index of the right option>, reveal },
  parts: [ part, part, part, part ],   // 4 parts (3 or 5 only if the topic truly needs it)
},
```

### predict
A question asked BEFORE the class's animation is shown. It must be about what the animation
shows (read the class's `visualLab` scene in `src/viz/scenes/` and its `missionPrompt`).
It should be guessable from everyday intuition, and the right answer should be a little
surprising for at least one tempting wrong option. `reveal` explains the answer in 1-3
sentences and does NOT end with "Now check it in the animation" (the app adds that).

### part
```js
{
  title: 'Short topic name',          // a sub-topic, not "Part 1"
  minutes: 20,                        // 15-30
  explain: ['paragraph', 'paragraph', 'paragraph'],   // 2-4 paragraphs, plain words
  formulas: [['Label', 'LaTeX']],     // 1-3; LaTeX must render in KaTeX
  examples: [ex(problem, steps, answer), ex(...)],    // exactly 2 worked examples
  practice: [pr(q, a, hint, solution), ... ],          // 4-5 problems
}
```
- `ex(problem, [[stepText, latexOrEmptyString], ...], answerText)`: 2-4 steps. Each step is one
  move a beginner could make, with the maths for that move in LaTeX ('' if none).
- `pr(q, a, hint, solution, extra?)`: `a` is a NUMBER (or `'inf'`, `'-inf'`, `'dne'`). The learner
  types it; answers within about 1% are accepted. Pass `{ tol: x }` as `extra` for an absolute
  tolerance when 1% is wrong (very small or zero answers). Ask for the units you expect in the
  question ("in MPa", "in kJ"). For conceptual topics, still make the answer a number: a count,
  a ratio, a value read off a rule, a computed property. Do not ask for years or dates
  (history is quizzed elsewhere). Order problems from easy to harder.
- `hint` nudges the next step without giving the answer. `solution` shows the working in one
  or two sentences and ends with the answer.

### Choosing the parts
- Together the parts should cover what the matching UM course (the class's `um` codes; names in
  `src/data/um/make.js` UM_COURSES) teaches about this topic in a semester, in a sensible
  teaching order. The existing class (story, `overtimeDigest`, `guidedSteps`) is the starting
  point: part 1 usually deepens the core idea, later parts add the sub-topics a real course
  spends weeks on (methods, special cases, applications to materials).
- Stay at the level of the class's place in the timetable: do not use maths the learner has not
  met yet (check earlier weeks in `src/data/path.js`).
- Where the topic allows, include at least one materials-engineering application per class.

## Correctness (the most important rule)
- Every number in an example or practice problem must be computed, not guessed. Check each one
  with a quick `node -e "console.log(...)"` before writing it.
- Physical constants and material properties must be realistic (cite typical values only).
- The question must have exactly one right answer under the stated assumptions.

## Files
- Put each batch in its own file `src/data/deep/<batch>.js` exporting a named object
  (e.g. `export const NUMBERS = { ... }`), using the same `ex` and `pr` helpers as `calc1.js`
  (copy the two helper lines).
- Register it in `src/data/deep/index.js` (import it and spread it into `DEEP`).

## Before committing a batch
1. `node scripts/check-deep.mjs <the ids of the batch>` prints "all good".
2. `npx vite build` succeeds.
3. `npx oxlint src/data/deep` has no errors.
4. Commit only the batch file and `index.js`, with the message
   `Deeper classes: <batch name> (<n> classes)`. Never commit `data/*.db` or `scene-test.html`.
   Never delete files.

## Batches
See `docs/deep-batches.md` for the class ids in each batch, in order.
