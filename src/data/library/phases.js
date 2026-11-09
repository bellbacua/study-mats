// Binary phase diagrams, simplified from the standard textbook versions.
// Each curve is a list of [composition (wt %), temperature (°C)] points.
// Each region is a closed outline built from curves, plus the phases found there.
// For two-phase regions, `left` and `right` name the curves whose compositions
// at a given temperature are the two ends of the tie line (for the lever rule).

export const SOURCES = {
  callister: {
    title: 'W. D. Callister & D. G. Rethwisch, Materials Science and Engineering: An Introduction, 10th ed., Wiley, chapter 9 (Phase Diagrams)',
    url: 'https://www.wiley.com/en-us/Materials+Science+and+Engineering%3A+An+Introduction%2C+10th+Edition-p-9781119405498',
  },
  doitpoms: { title: 'DoITPoMS (University of Cambridge), Teaching and learning package: Phase diagrams and solidification', url: 'https://www.doitpoms.ac.uk/tlplib/phase-diagrams/index.php' },
  asm: { title: 'ASM International, Alloy Phase Diagram Database (the professional reference)', url: 'https://www.asminternational.org/materials-resources/online-databases/-/journal_content/56/10192/15469013/DATABASE' },
  lever: { title: 'Wikipedia: Lever rule', url: 'https://en.wikipedia.org/wiki/Lever_rule' },
  eutectic: { title: 'Wikipedia: Eutectic system', url: 'https://en.wikipedia.org/wiki/Eutectic_system' },
};

const rev = (c) => [...c].reverse();

// ------------------------------------------------------------- copper–nickel
const cuni = (() => {
  const Lq = [[0, 1085], [10, 1140], [20, 1195], [31.5, 1250], [40, 1285], [50, 1325], [60, 1360], [70, 1390], [80, 1415], [90, 1437], [100, 1455]];
  const Sd = [[0, 1085], [10, 1110], [20, 1155], [30, 1205], [42.5, 1250], [50, 1280], [60, 1320], [70, 1355], [80, 1390], [90, 1425], [100, 1455]];
  return {
    id: 'cuni',
    name: 'Copper–nickel',
    a: 'Cu',
    b: 'Ni',
    x: [0, 100],
    t: [1000, 1500],
    tick: 50,
    curves: { Lq, Sd },
    lines: ['Lq', 'Sd'],
    start: [35, 1250],
    regions: [
      { id: 'L', label: 'L', name: 'Liquid', poly: [...Lq, [100, 1500], [0, 1500]], color: '#fc6255' },
      { id: 'aL', label: 'α + L', name: 'Solid α and liquid', poly: [...Lq, ...rev(Sd)], left: ['L', 'Lq'], right: ['α', 'Sd'], color: '#f0ac5f' },
      { id: 'a', label: 'α', name: 'Solid α (one crystal type, Cu and Ni mixed on the same FCC lattice)', poly: [...Sd, [100, 1000], [0, 1000]], color: '#58c4dd' },
    ],
    story:
      'The simplest kind of diagram. Copper and nickel have the same FCC crystal and atoms of nearly the same size, so they mix in any amount as solids. Between the two lines, a solid with more nickel grows out of a liquid with less. This is the textbook example used to teach the lever rule: at 35 wt% Ni and 1250 °C, the liquid holds about 31.5 wt% Ni and the solid about 42.5 wt% Ni.',
    uses: 'Cupronickel coins (25% Ni in US nickels, many others), seawater pipes, Monel.',
    find: /copper.nickel|cu.ni|isomorphous|lever rule/i,
    sources: ['callister', 'doitpoms', { title: 'Wikipedia: Cupronickel', url: 'https://en.wikipedia.org/wiki/Cupronickel' }],
  };
})();

// ------------------------------------------------------------- lead–tin
const pbsn = (() => {
  const La = [[0, 327], [20, 280], [40, 238], [61.9, 183]];
  const Lb = [[61.9, 183], [80, 205], [100, 232]];
  const Sa = [[0, 327], [10, 276], [18.3, 183]];
  const Sb = [[97.8, 183], [100, 232]];
  const Va = [[18.3, 183], [12, 150], [6, 100], [2.5, 50], [2, 0]];
  const Vb = [[97.8, 183], [98.8, 100], [99.3, 0]];
  return {
    id: 'pbsn',
    name: 'Lead–tin (solder)',
    a: 'Pb',
    b: 'Sn',
    x: [0, 100],
    t: [0, 350],
    tick: 50,
    curves: { La, Lb, Sa, Sb, Va, Vb },
    lines: ['La', 'Lb', 'Sa', 'Sb', 'Va', 'Vb'],
    iso: [[18.3, 97.8, 183]],
    marks: [{ x: 61.9, t: 183, text: 'Eutectic: 61.9 wt% Sn, 183 °C' }],
    start: [40, 150],
    regions: [
      { id: 'L', label: 'L', name: 'Liquid', poly: [...La, ...Lb.slice(1), [100, 350], [0, 350]], color: '#fc6255' },
      { id: 'aL', label: 'α + L', name: 'Lead-rich solid α and liquid', poly: [...La, ...rev(Sa)], left: ['α', 'Sa'], right: ['L', 'La'], color: '#f0ac5f' },
      { id: 'bL', label: 'β + L', name: 'Tin-rich solid β and liquid', poly: [...Lb, ...rev(Sb)], left: ['L', 'Lb'], right: ['β', 'Sb'], color: '#e8c26a' },
      { id: 'a', label: 'α', name: 'Solid α (lead with some tin dissolved)', poly: [...Sa, ...Va.slice(1), [0, 0]], color: '#58c4dd' },
      { id: 'b', label: 'β', name: 'Solid β (tin with a little lead dissolved)', poly: [...Sb, [100, 0], ...rev(Vb)], color: '#8fa8ff' },
      { id: 'ab', label: 'α + β', name: 'Two solids, α and β', poly: [...Va, ...rev(Vb)], left: ['α', 'Va'], right: ['β', 'Vb'], color: '#5cd0b3' },
    ],
    story:
      'A eutectic diagram. Lead and tin barely dissolve in each other as solids, so the solid splits into two kinds of crystals. At exactly 61.9 wt% Sn the whole liquid freezes at one temperature, 183 °C, lower than either pure metal. That is why 63/37 tin–lead solder melts so sharply and so low. Lead-free solders (tin–silver–copper) copy the same trick.',
    uses: 'Electronics solder (now mostly lead-free), plumbing solder, fusible plugs.',
    find: /eutectic|solder|lead.tin|tin.lead/i,
    sources: ['callister', 'eutectic', { title: 'Wikipedia: Solder', url: 'https://en.wikipedia.org/wiki/Solder' }],
  };
})();

// ------------------------------------------------------------- iron–carbon
const fec = (() => {
  const L1 = [[0, 1538], [1, 1470], [2, 1380], [3, 1280], [4.3, 1147]];
  const L2 = [[4.3, 1147], [5, 1180], [6.67, 1252]];
  const Sg = [[0, 1538], [0.5, 1475], [1, 1410], [1.5, 1320], [2.14, 1147]];
  const A3 = [[0, 912], [0.2, 860], [0.4, 810], [0.76, 727]];
  const Acm = [[0.76, 727], [1.2, 850], [1.6, 960], [2.14, 1147]];
  const Aa = [[0, 912], [0.022, 727]];
  const Va = [[0.022, 727], [0.008, 400]];
  const C = [[6.67, 400], [6.67, 1252]];
  return {
    id: 'fec',
    name: 'Iron–carbon (steel and cast iron)',
    a: 'Fe',
    b: 'C',
    x: [0, 6.67],
    t: [400, 1600],
    tick: 100,
    curves: { L1, L2, Sg, A3, Acm, Aa, Va, C },
    lines: ['L1', 'L2', 'Sg', 'A3', 'Acm', 'Aa', 'Va'],
    iso: [[2.14, 6.67, 1147], [0.022, 6.67, 727]],
    marks: [
      { x: 0.76, t: 727, text: 'Eutectoid: 0.76 wt% C, 727 °C' },
      { x: 4.3, t: 1147, text: 'Eutectic: 4.3 wt% C, 1147 °C' },
    ],
    bands: [
      { from: 0, to: 2.14, text: 'Steels' },
      { from: 2.14, to: 6.67, text: 'Cast irons' },
    ],
    start: [0.76, 800],
    regions: [
      { id: 'L', label: 'L', name: 'Liquid', poly: [...L1, ...L2.slice(1), [6.67, 1600], [0, 1600]], color: '#fc6255' },
      { id: 'gL', label: 'γ + L', name: 'Austenite and liquid', poly: [...L1, ...rev(Sg)], left: ['γ', 'Sg'], right: ['L', 'L1'], color: '#f0ac5f' },
      { id: 'cL', label: 'L + Fe₃C', name: 'Liquid and cementite', poly: [...L2, [6.67, 1147]], left: ['L', 'L2'], right: ['Fe₃C', 'C'], color: '#e8c26a' },
      { id: 'g', label: 'γ (austenite)', name: 'Austenite: FCC iron that can hold up to 2.14 wt% carbon', poly: [...Sg, ...rev(Acm), ...rev(A3).slice(1)], color: '#58c4dd' },
      { id: 'gc', label: 'γ + Fe₃C', name: 'Austenite and cementite', poly: [[2.14, 1147], [6.67, 1147], [6.67, 727], ...Acm], left: ['γ', 'Acm'], right: ['Fe₃C', 'C'], color: '#8fa8ff' },
      { id: 'ag', label: 'α + γ', name: 'Ferrite and austenite', poly: [...A3, [0.022, 727], [0, 912]], left: ['α', 'Aa'], right: ['γ', 'A3'], color: '#83c167' },
      { id: 'a', label: 'α', name: 'Ferrite: BCC iron that holds almost no carbon (at most 0.022 wt%)', poly: [[0, 912], [0.022, 727], [0.008, 400], [0, 400]], color: '#b48ad0' },
      {
        id: 'ac',
        label: 'α + Fe₃C',
        name: 'Ferrite and cementite (slow-cooled, the cementite forms layers called pearlite)',
        poly: [[0.022, 727], [6.67, 727], [6.67, 400], [0.008, 400]],
        left: ['α', 'Va'],
        right: ['Fe₃C', 'C'],
        color: '#5cd0b3',
      },
    ],
    story:
      'The most important diagram in metallurgy. Iron changes crystal from BCC (ferrite) to FCC (austenite) at 912 °C, and FCC iron can hold far more carbon. Cool austenite with 0.76 wt% carbon slowly and at 727 °C it splits into fine layers of ferrite and cementite (Fe₃C) called pearlite. Cool it fast instead and the carbon gets trapped, giving hard martensite. That is not on this diagram, because the diagram only shows what forms when there is time to settle. The small δ-iron corner near the top left (above 1394 °C, under 0.5 wt% C) is left out to keep it readable.',
    uses: 'Choosing heat treatments for every steel: annealing, normalising, hardening; casting temperatures for cast iron.',
    find: /iron.carbon|fe.fe3c|eutectoid|austenite|pearlite|cementite/i,
    sources: [
      'callister',
      'doitpoms',
      { title: 'Wikipedia: Austenite', url: 'https://en.wikipedia.org/wiki/Austenite' },
      { title: 'Wikipedia: Pearlite', url: 'https://en.wikipedia.org/wiki/Pearlite' },
    ],
  };
})();

// ------------------------------------------------------------- aluminium–silicon
const alsi = (() => {
  const La = [[0, 660], [6, 620], [12.6, 577]];
  const Lb = [[12.6, 577], [20, 690], [30, 800], [50, 1000], [70, 1180], [100, 1414]];
  const Sa = [[0, 660], [1.65, 577]];
  const Va = [[1.65, 577], [0.8, 500], [0.3, 400], [0.1, 300]];
  const Si = [[100, 300], [100, 1414]];
  return {
    id: 'alsi',
    name: 'Aluminium–silicon (casting alloys)',
    a: 'Al',
    b: 'Si',
    x: [0, 100],
    t: [300, 1500],
    tick: 100,
    curves: { La, Lb, Sa, Va, Si },
    lines: ['La', 'Lb', 'Sa', 'Va'],
    iso: [[1.65, 100, 577]],
    marks: [{ x: 12.6, t: 577, text: 'Eutectic: 12.6 wt% Si, 577 °C' }],
    start: [7, 600],
    regions: [
      { id: 'L', label: 'L', name: 'Liquid', poly: [...La, ...Lb.slice(1), [100, 1500], [0, 1500]], color: '#fc6255' },
      { id: 'aL', label: 'α + L', name: 'Aluminium-rich solid α and liquid', poly: [...La, ...rev(Sa)], left: ['α', 'Sa'], right: ['L', 'La'], color: '#f0ac5f' },
      { id: 'sL', label: 'L + Si', name: 'Liquid and silicon crystals', poly: [...Lb, [100, 577]], left: ['L', 'Lb'], right: ['Si', 'Si'], color: '#e8c26a' },
      { id: 'a', label: 'α', name: 'Solid α (aluminium with a little silicon dissolved)', poly: [...Sa, ...Va.slice(1), [0, 300]], color: '#58c4dd' },
      { id: 'as', label: 'α + Si', name: 'Aluminium α and silicon crystals', poly: [...Va, [100, 300], [100, 577]], left: ['α', 'Va'], right: ['Si', 'Si'], color: '#5cd0b3' },
    ],
    story:
      'Another eutectic, and the reason most cast aluminium parts contain 7 to 12 wt% silicon. Near the eutectic (12.6 wt% Si) the liquid freezes at only 577 °C and flows well into moulds, and the silicon crystals make the metal harder and more wear-resistant. Engine blocks, cylinder heads and car wheels are made this way.',
    uses: 'Engine blocks, cylinder heads, alloy wheels (A356 has about 7% Si), pistons.',
    find: /alumin(i)?um.silicon|al.si\b|casting alloy/i,
    sources: ['callister', 'eutectic', { title: 'Wikipedia: Aluminium–silicon alloys', url: 'https://en.wikipedia.org/wiki/Aluminium%E2%80%93silicon_alloys' }],
  };
})();

export const DIAGRAMS = [fec, cuni, pbsn, alsi];
