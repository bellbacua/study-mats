import { GLOSSARY } from '../data/glossary';

// A starter outline for a class's notes, built from that class. The prompts
// ask questions instead of copying text, because writing it in your own
// words is what makes it stick.
export function noteScaffold(lesson) {
  const terms = GLOSSARY.filter((g) => g.lesson === lesson.id).map((g) => g.term);
  const formulas = lesson.guidedSteps.map((s) => s.title.replace(/^\d+\.\s*/, ''));
  return [
    `# ${lesson.title.split(':')[0]}`,
    '',
    '## The big idea (one sentence, my words)',
    '- ',
    '',
    '## Key terms',
    ...(terms.length ? terms.slice(0, 6).map((t) => `- **${t}**: `) : ['- ']),
    '',
    '## Formulas & what each letter means',
    ...formulas.map((f) => `- ${f}: $  $`),
    '',
    '## The story (who, when, why it mattered)',
    `- ${lesson.history.protagonist.split('(')[0].trim()}, ${lesson.history.era.split('•')[0].trim()}: `,
    '',
    '## Questions I still have',
    '- ',
    '',
    '## Explain it to a friend (3 sentences, no peeking)',
    '',
  ].join('\n');
}

export const NOTE_TIPS = [
  {
    title: 'Write less, think more',
    body: 'Notes are not a copy of the lesson. The lesson is always here. Write only what you’d need to rebuild the idea yourself: the big idea, the key terms, the formula and what each letter means.',
  },
  {
    title: 'Use your own words',
    body: 'If you can’t say it without looking, you don’t know it yet. Read a section, look away, then write it. Rephrasing is where the learning happens (the “generation effect”).',
  },
  {
    title: 'Follow the importance labels',
    body: '⭐ Must know = the short version, key formulas and dotted-underlined terms; these are what quizzes test. 📖 Good to know = the history story; note the who, when and why in one line. Everything else is optional.',
  },
  {
    title: 'Questions beat statements',
    body: 'Turn facts into questions: “Why is −×− positive?” instead of “−×− is positive”. Later you can cover the answer and test yourself. That’s active recall, the most effective study habit there is.',
  },
  {
    title: 'Leave a “still confused” list',
    body: 'Write down what didn’t click. Come back after the practice round or the next class; often it clicks later. Crossing those off is very satisfying.',
  },
  {
    title: 'Finish with the 3-sentence test',
    body: 'End every class by explaining it to an imaginary friend in three sentences (the Feynman technique). If you get stuck, that’s exactly the part to review.',
  },
  {
    title: 'Use the shortcuts',
    body: '“Start my notes” gives you an outline for the class. 📌 buttons next to key points drop a prompt into your notes. Ctrl + . opens and closes the notes.',
  },
];
