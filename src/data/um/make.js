// Compact builders for the UM-aligned classes. Each class is written as one
// object holding its lesson, readings, labs, history questions, glossary terms
// and timeline events; index.js splits them into the shapes the app uses.
// In drills and quiz questions the FIRST option is the right one: Practice
// shuffles the order on screen.

export const UM_COURSES = {
  'CEE 200': 'Math Plus',
  'MATE 101': 'Materials Engineering as a Profession',
  'BCHE 111': 'Chemistry for Engineers',
  'DRAW 102': 'Computer-Aided Drafting',
  'CEE 101': 'Engineering Calculus 1',
  'MATE 102': 'Analytical Chemistry',
  'MATE 103': 'Structure-Property Relationships 1',
  'CEE 105': 'Engineering Data Analysis',
  'CEE 103': 'Engineering Calculus 2',
  'MATE 201': 'Structure-Property Relationships 2',
  'CEE 114': 'Environmental Science and Engineering',
  'MATE 203': 'Analytical Techniques in Materials Engineering',
  'MATE 202': 'Thermodynamics of Materials',
  'MATE 204': 'Solid State Engineering',
  'MATE 206': 'Kinetics of Materials and Processes',
  'CEE 104': 'Differential Equations',
  'CEE 102': 'Physics 1 for Engineers',
  'MATE 208': 'Organic Chemistry',
  'MATE 207': 'Computer Applications in Materials Engineering',
  'MATE 304': 'Design and Analysis of Experiments',
  'MATE 302': 'Thermodynamics and Kinetics Laboratory',
  'MATE 307': 'Degradation of Materials',
  'MATE 305': 'Synthesis and Processing of Materials',
  'MATE 306': 'Materials Selection and Plant Design',
  'MATE 312': 'Nanotechnology',
  'BEE 319': 'Basic Electrical Engineering',
  'CEE 117': 'Statics of Rigid Bodies',
  'CEE 118': 'Dynamics of Rigid Bodies',
  'CEE 109': 'Engineering Economics',
  'MATE 303': 'Materials Elective 1',
  'MATE 310': 'Methods of Research',
  'CEE 108': 'Engineering Management',
  'MATE 402': 'Laws, Ethics, Seminars and Plant Visit',
  'MATE 308': 'Materials Elective 2',
  'BCE 222': 'Mechanics of Deformable Bodies',
  'MATE 309': 'Mechanics of Fluids',
  'MATE 401': 'Forensic Engineering',
  'MATE 403': 'Thesis 1',
  'MATE 404': 'Thesis 2',
  'MATE 405': 'Special Topics',
  'CEE 115': 'Technopreneurship',
  'MATE 406': 'Quality Assurance',
};

export const phet = (slug, name, task) => ({ tool: `PhET: ${name}`, kind: 'online', url: `https://phet.colorado.edu/en/simulations/${slug}`, task });
export const online = (tool, url, task) => ({ tool, kind: 'online', url, task });
export const software = (tool, url, task) => ({ tool, kind: 'software', url, task });
export const home = (task) => ({ tool: 'At home', kind: 'home', url: null, task });
export const desmos = (task) => online('Desmos graphing calculator', 'https://www.desmos.com/calculator', task);
export const geogebra = (task) => online('GeoGebra', 'https://www.geogebra.org/calculator', task);
export const wolfram = (task) => online('Wolfram|Alpha', 'https://www.wolframalpha.com/', task);
export const chemcollective = (task) => online('ChemCollective virtual lab', 'https://chemcollective.org/vlabs', task);
export const doitpoms = (task) => online('DoITPoMS teaching library (Cambridge)', 'https://www.doitpoms.ac.uk/tlplib/index.php', task);

// Free textbooks used across the course (OpenStax, CC BY).
export const BOOKS = {
  calc1: ['OpenStax', 'Calculus Volume 1', 'https://openstax.org/details/books/calculus-volume-1'],
  calc2: ['OpenStax', 'Calculus Volume 2', 'https://openstax.org/details/books/calculus-volume-2'],
  calc3: ['OpenStax', 'Calculus Volume 3', 'https://openstax.org/details/books/calculus-volume-3'],
  precalc: ['OpenStax', 'Precalculus 2e', 'https://openstax.org/details/books/precalculus-2e'],
  chem: ['OpenStax', 'Chemistry 2e', 'https://openstax.org/details/books/chemistry-2e'],
  organic: ['OpenStax', 'Organic Chemistry', 'https://openstax.org/details/books/organic-chemistry'],
  phys1: ['OpenStax', 'University Physics Volume 1', 'https://openstax.org/details/books/university-physics-volume-1'],
  phys2: ['OpenStax', 'University Physics Volume 2', 'https://openstax.org/details/books/university-physics-volume-2'],
  phys3: ['OpenStax', 'University Physics Volume 3', 'https://openstax.org/details/books/university-physics-volume-3'],
  stats: ['OpenStax', 'Introductory Statistics 2e', 'https://openstax.org/details/books/introductory-statistics-2e'],
};

const wiki = (title) => `https://en.wikipedia.org/wiki/${title.replace(/ /g, '_')}`;

// reading: ['wiki', 'Article title', why, excerpt] or ['book', key, chapter, why, excerpt] or ['link', source, title, url, why, excerpt]
function reading(r, id, i) {
  const base = { id: `read-${id}-${i + 1}`, readTime: '10 min read' };
  if (r[0] === 'wiki') return { ...base, type: 'Encyclopedia', source: 'Wikipedia', title: r[1], url: wiki(r[1]), whyRead: r[2], inAppExcerpt: r[3] };
  if (r[0] === 'book') {
    const [src, name, url] = BOOKS[r[1]];
    return { ...base, type: 'Free textbook', source: src, title: `${name}: ${r[2]}`, readTime: 'chapter', url, whyRead: r[3], inAppExcerpt: r[4] };
  }
  return { ...base, type: 'Article', source: r[1], title: r[2], url: r[3], whyRead: r[4], inAppExcerpt: r[5] };
}

export function mk(o) {
  const lesson = {
    id: o.id,
    code: o.code,
    track: o.track,
    um: o.um,
    standardMins: 40,
    overtimeMins: 15,
    xpReward: 100,
    prereqIds: [],
    umCourseLink: '',
    title: o.title,
    subtitle: o.subtitle,
    overtimeDigest: o.digest,
    history: { era: o.era, protagonist: o.who, hook: o.hook, narrative: o.story, takeaway: o.takeaway },
    visualLab: { type: o.viz, title: o.vizTitle, instructions: o.vizHow, missionPrompt: '', targetState: {} },
    guidedSteps: o.steps.map(([title, formula, explanation], i) => ({ title: `${i + 1}. ${title}`, formula, explanation })),
    gate: {
      drills: o.drills.map(([question, options, hint1, hint2, explanation], i) => ({
        id: `${o.id}-d${i + 1}`,
        question,
        options,
        correctIndex: 0,
        hint1,
        hint2,
        explanation,
      })),
      bossProblem: { title: o.boss[0], scenario: o.boss[1], options: o.boss[2], correctIndex: 0, hint: o.boss[3], explanation: o.boss[4] },
    },
  };
  return {
    lesson,
    readings: (o.read || []).map((r, i) => reading(r, o.id, i)),
    labs: o.labs || [],
    quiz: (o.quiz || []).map(([question, options, explanation]) => ({ question, options, correctIndex: 0, explanation })),
    gloss: (o.gloss || []).map(([term, def, match = []]) => ({ term, def, lesson: o.id, match })),
    events: (o.events || []).map(([year, title, detail, approx = false]) => ({
      year,
      subject: o.track === 'eng' ? 'mate' : o.track,
      title,
      detail,
      lesson: o.id,
      approx,
    })),
  };
}
