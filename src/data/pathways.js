// "Where it leads": the road from today through the degree to working life,
// for general materials engineering and for each specialization track.
// Claims about specific places and laws carry [n] marks that point to SOURCES.

export const SOURCES = [
  { n: 1, title: 'Metallurgical Engineering Law of the Philippines (RA 10688), PRC', url: 'https://lucena.prc.gov.ph/metallurgical-engineering' },
  { n: 2, title: 'Nickel Asia and Sumitomo: Coral Bay and Taganito HPAL plants (Mining Technology, 2025)', url: 'https://www.mining-technology.com/news/nickel-asia-sell-coral-bay-nickel-sumitomo/' },
  { n: 3, title: 'Texas Instruments to expand its Clark and Baguio plants (Inquirer, 2021)', url: 'https://business.inquirer.net/415337/us-microchip-maker-sets-1-b-expansion-of-2-ph-plants' },
  { n: 4, title: 'OECD: the Philippine semiconductor ecosystem, assembly, testing and packaging', url: 'https://www.oecd.org/en/publications/promoting-the-growth-of-the-semiconductor-ecosystem-in-the-philippines_01497fea-en/full-report/examining-the-domestic-philippine-semiconductor-ecosystem-with-a-focus-on-assembly-testing-and-packaging_be2bc7eb.html' },
  { n: 5, title: 'Energy Development Corporation (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Energy_Development_Corporation' },
  { n: 6, title: 'About DOST-MIRDC, the Metals Industry Research and Development Center', url: 'https://mirdc.dost.gov.ph/transparency/about-mirdc' },
  { n: 7, title: 'DOST-SEI ERDT graduate scholarships (brochure, 2023–2024)', url: 'https://fs2.mapua.edu.ph/MapuaWebsite7/Assets/ERDT_Brochure_2023-2024_signed.pdf' },
  { n: 8, title: 'Glencore’s Philippine copper smelter (PASAR) put into maintenance (2025)', url: 'https://newsletter.en.creamermedia.com/article/glencores-philippine-copper-smelter-put-into-maintenance-2025-02-25' },
];

// The shared road, before the paths split.
export const ROAD = [
  { when: 'Now → August 2027', title: 'Study Mats', detail: 'Year 1 math, physics and chemistry from scratch, with the stories behind them. You arrive at UM already knowing the foundations.' },
  { when: '2027 → 2031', title: 'BS Materials Engineering at UM', detail: 'The 141-class core: structure, properties, processing and performance of metals, ceramics, polymers and composites.' },
  { when: 'Years 2 → 4', title: 'Pick your tracks', detail: 'Each finished year opens a track. The track you lean towards shapes your thesis topic and your on-the-job training.' },
  { when: 'Year 4', title: 'Thesis and on-the-job training', detail: 'A real question tested in a lab, and a summer inside a plant. Both are what employers look at first.' },
  {
    when: 'After graduating',
    title: 'Licence?',
    detail: 'Materials Engineering has no PRC board exam of its own. The closest is the Metallurgical Engineer licensure exam under RA 10688, which has its own rules on who may take it: check with PRC before counting on it. [1]',
  },
];

// Each path: stages from first job onwards. `classes` are lessons that lead there.
export const PATHS = [
  {
    id: 'core',
    title: 'General materials engineering',
    icon: '◆',
    blurb: 'Every factory buys, tests and shapes materials, so a materials engineer fits almost anywhere things are made.',
    classes: ['mate-001', 'mate-113', 'mate-115', 'mate-125', 'eng-012'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Quality / QA engineer', what: 'Tests incoming materials and finished parts, and finds out why some fail.', where: 'Cement, packaging, food cans, car parts, appliances.' },
          { title: 'Materials testing engineer', what: 'Runs tensile, hardness and impact tests and writes the reports that buildings and machines rely on.', where: 'Testing laboratories and construction-materials suppliers.' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Process engineer', what: 'Owns one step of a production line and makes it cheaper, faster and more consistent.', where: 'Any manufacturing plant.' },
          { title: 'Failure analyst', what: 'Cuts open broken parts, reads the fracture surface and says what went wrong.', where: 'Labs, insurers, large plants.' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Plant or quality manager', what: 'Runs a whole operation or its quality system.', where: 'Manufacturing.' },
          { title: 'Government researcher', what: 'Helps local industry with testing, new processes and standards.', where: 'DOST-MIRDC, the metals research centre in Taguig. [6]' },
        ],
      },
      {
        stage: 'Further study (optional)',
        roles: [
          { title: 'MS or PhD', what: 'Research degrees open R&D and university teaching. DOST-SEI’s ERDT programme funds engineering graduate study in the Philippines. [7]', where: 'Philippine universities, or abroad.' },
        ],
      },
    ],
  },
  {
    id: 'metals',
    title: 'Metals and Metallurgy',
    icon: '⚒',
    blurb: 'From ore to steel: extraction, alloys and heat treatment. Mindanao has some of the country’s biggest nickel operations. [2]',
    classes: ['met-001', 'met-002', 'met-004', 'met-006', 'mate-127'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Plant metallurgist (trainee)', what: 'Watches the leach, the furnaces and the chemistry so the plant recovers as much metal as possible.', where: 'Nickel HPAL plants at Taganito, Surigao del Norte, and Coral Bay, Palawan. [2]' },
          { title: 'Steel mill or foundry engineer', what: 'Melting scrap in electric arc furnaces, casting and rolling, checking each heat’s chemistry.', where: 'Steel mills and foundries.' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Welding engineer', what: 'Chooses welding methods and checks welds on bridges, tanks and ships.', where: 'Fabrication shops, shipyards, construction.' },
          { title: 'Corrosion engineer', what: 'Keeps pipes, ships and plants from rusting away: coatings, alloys and cathodic protection.', where: 'Oil, gas, power and water utilities.' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Chief metallurgist', what: 'Responsible for every process decision in a plant.', where: 'Mining, smelting and steel companies.' },
          { title: 'Working abroad', what: 'Experienced metallurgists are in demand where mining is big.', where: 'Australia, Canada, and mining firms worldwide.' },
        ],
      },
      {
        stage: 'Good to know',
        roles: [
          { title: 'A changing industry', what: 'The country’s only copper smelter, PASAR in Leyte, was put on maintenance in 2025, so jobs move with world metal prices. [8]', where: 'Follow nickel and copper news.' },
        ],
      },
    ],
  },
  {
    id: 'electronic',
    title: 'Electronic Materials',
    icon: '⚡',
    blurb: 'Chips, sensors and magnets. Electronics is the Philippines’ biggest export, and most of it is chip assembly and testing. [4]',
    classes: ['elec-002', 'elec-003', 'elec-004', 'mate-401', 'mate-115'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Process / test engineer', what: 'Keeps one step of chip assembly, testing or packaging running and improves its yield.', where: 'Assembly-and-test plants, the core of the Philippine industry. [4] Texas Instruments runs plants in Baguio and Clark. [3]' },
          { title: 'Failure analysis engineer', what: 'Cross-sections dead chips and looks at them with optical and electron microscopes.', where: 'The same plants’ analysis labs.' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Reliability engineer', what: 'Heats, cools and shakes devices to predict how long they will last.', where: 'Semiconductor and electronics firms.' },
          { title: 'Packaging materials engineer', what: 'Chooses the solders, moulding plastics and wires that hold a chip together.', where: 'Assembly-and-test plants.' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Engineering manager', what: 'Leads process or product engineering for a production line.', where: 'Electronics plants.' },
          { title: 'Chip-making fabs abroad', what: 'Making the chips themselves (front end) usually needs an MS or PhD.', where: 'Taiwan, Singapore, Japan, Korea, the US.' },
        ],
      },
    ],
  },
  {
    id: 'energy',
    title: 'Energy Materials',
    icon: '☀',
    blurb: 'Batteries, solar and geothermal. The Philippines is one of the world’s largest geothermal power producers. [5]',
    classes: ['enrg-002', 'enrg-003', 'enrg-006', 'mate-124', 'chem-011'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Geothermal materials engineer', what: 'Fights silica scaling and corrosion in hot wells, pipes and turbines.', where: 'EDC’s geothermal fields in Leyte, Negros and Mount Apo, near Davao. [5]' },
          { title: 'Solar or storage QA engineer', what: 'Checks panels, inverters and battery packs before and after they go into a plant.', where: 'Solar farms and grid battery projects.' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Asset integrity engineer', what: 'Decides when a pipe, vessel or turbine part must be repaired or replaced.', where: 'Power plants.' },
          { title: 'Battery cell engineer', what: 'Works on electrode materials and cell design.', where: 'Mostly abroad: Korea, Japan, China, Europe.' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Plant or asset manager', what: 'Keeps a power plant safe and running for decades.', where: 'Power companies.' },
          { title: 'Energy researcher', what: 'Usually after an MS or PhD: new cells, coatings and alloys.', where: 'Universities, government labs and companies.' },
        ],
      },
    ],
  },
];
