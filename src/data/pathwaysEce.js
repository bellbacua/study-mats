// "Where it leads" for Electronics Engineering (ECE): the road to the PRC
// licence under RA 9292, then where ECE graduates work in the Philippines.
// Claims about laws, places and employers carry [n] marks that point to SOURCES.

export const SOURCES = [
  { n: 1, title: 'Republic Act 9292, the Electronics Engineering Law of 2004 (full text, LawPhil)', url: 'https://lawphil.net/statutes/repacts/ra2004/ra_9292_2004.html' },
  { n: 2, title: 'Professional Regulation Commission (PRC): exam schedules, filing and results', url: 'https://www.prc.gov.ph' },
  { n: 3, title: 'ECE board exam guide: subjects, weights, passing rule and recent pass rates (SuperTutor, a review company, 2026)', url: 'https://supertutor.ph/resources/blog/licensure-exams/ece-board-2026-complete-guide/' },
  { n: 4, title: 'Institute of Electronics Engineers of the Philippines, IECEP (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Institute_of_Electronics_Engineers_of_the_Philippines' },
  { n: 5, title: 'OECD: the Philippine semiconductor ecosystem, assembly, testing and packaging', url: 'https://www.oecd.org/en/publications/promoting-the-growth-of-the-semiconductor-ecosystem-in-the-philippines_01497fea-en/full-report/examining-the-domestic-philippine-semiconductor-ecosystem-with-a-focus-on-assembly-testing-and-packaging_be2bc7eb.html' },
  { n: 6, title: 'Texas Instruments to expand its Clark and Baguio plants (Inquirer, 2021)', url: 'https://business.inquirer.net/415337/us-microchip-maker-sets-1-b-expansion-of-2-ph-plants' },
  { n: 7, title: 'DITO Telecommunity (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dito_Telecommunity' },
  { n: 8, title: 'Integrated Micro-Electronics, Inc. (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Integrated_Micro-Electronics,_Inc.' },
  { n: 9, title: 'Smart Communications (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Smart_Communications' },
  { n: 10, title: 'Globe Telecom (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Globe_Telecom' },
  { n: 11, title: 'National Telecommunications Commission (Wikipedia)', url: 'https://en.wikipedia.org/wiki/National_Telecommunications_Commission_(Philippines)' },
  { n: 12, title: 'Philippine Space Agency (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Philippine_Space_Agency' },
  { n: 13, title: 'Diwata-1, the first Philippine microsatellite (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Diwata-1' },
  { n: 14, title: 'DOST Advanced Science and Technology Institute, ASTI (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Advanced_Science_and_Technology_Institute' },
  { n: 15, title: 'DOST-SEI ERDT graduate scholarships (brochure, 2023–2024)', url: 'https://fs2.mapua.edu.ph/MapuaWebsite7/Assets/ERDT_Brochure_2023-2024_signed.pdf' },
];

export const ROAD = [
  { when: 'Now → August 2027', title: 'Study Mats', detail: 'Math, physics, circuits and devices from scratch, with the stories behind them, so the first two years at UM feel familiar.' },
  {
    when: '2027 → about 2032',
    title: 'BS Electronics Engineering at UM',
    detail: 'Four years of classes (circuits, electronics, signals, communications, microcontrollers), a capstone project, 320 hours of on-the-job training, then a final term of reviews in the four board-exam areas (from the UM prospectus).',
  },
  {
    when: 'From year 3 (optional)',
    title: 'Electronics Technician licence (ECT)',
    detail: 'RA 9292 lets you take the Electronics Technician exam once you reach the third-year level of a BS Electronics Engineering program. It is a real licence for installing, testing and repairing electronic systems, and a good rehearsal for the big exam. [1]',
  },
  {
    when: 'After graduating',
    title: 'The ECE board exam',
    detail: 'Two days of written tests. The current four subjects are Mathematics (20%), General Engineering and Applied Sciences (20%), Electronics (30%) and Electronic Systems and Technologies (30%). [3] You need at least 70% in every subject, not just on average; pass most subjects and score 60–69% in the rest and you may take one removal exam. [1] PRC currently holds it twice a year; check its site for dates and filing. [2] [3]',
  },
  {
    when: 'Once you pass',
    title: 'Registered Electronics Engineer (ECE)',
    detail: 'You take the oath, get your PRC licence and can sign as ECE. RA 9292 provides for one accredited professional organisation for the field [1]; the PRC-recognised one is IECEP, founded in 1950. [4] The law’s list of ECE work runs from telecoms and broadcasting to computers, ICT, robotics and medical electronics. [1]',
  },
  {
    when: 'About 7+ years later',
    title: 'Professional Electronics Engineer (PECE)',
    detail: 'The top title. You need at least 7 years of practice as an ECE, 2 of them in charge of significant engineering work, references from three PECEs, and an oral interview with the Board. Only a PECE may offer consulting services and sign and seal plans. [1]',
  },
];

export const PATHS = [
  {
    id: 'chips',
    title: 'Chips and electronics manufacturing',
    icon: '▦',
    blurb: 'Electronics is the Philippines’ biggest export, and most of it is assembling, testing and packaging chips. [5]',
    classes: ['ee-115', 'ee-116', 'ece-201', 'ee-107'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Test / product engineer', what: 'Writes and runs the programs that test every finished chip, and finds out why some fail.', where: 'Assembly-and-test plants: Texas Instruments in Baguio and Clark [6], and many more. [5]' },
          { title: 'Process or equipment engineer', what: 'Keeps the bonding, moulding and test machines running and improves the yield of one production step.', where: 'The same plants. [5]' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Electronics manufacturing (EMS) engineer', what: 'Builds whole circuit boards and products for other brands: car electronics, medical and industrial gear.', where: 'Integrated Micro-Electronics (IMI), headquartered in Biñan, Laguna. [8]' },
          { title: 'Reliability or failure analysis engineer', what: 'Heats, cools and shakes devices to see how long they last, and cuts open the ones that die.', where: 'Semiconductor and electronics firms. [5]' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Engineering manager', what: 'Leads a test, product or process engineering team.', where: 'Electronics plants.' },
          { title: 'Chip design', what: 'Designing the circuits on the chip itself usually needs a master’s degree or more, and many such jobs are abroad.', where: 'Taiwan, Singapore, Japan, Korea, the US, and a few design teams in the Philippines.' },
        ],
      },
    ],
  },
  {
    id: 'telecom',
    title: 'Telecommunications',
    icon: '📡',
    blurb: 'Mobile networks, fibre, radio and TV: the "communications" half of ECE, and what the board exam’s systems subject covers. [3]',
    classes: ['ee-112', 'ece-204', 'ece-203', 'ee-111'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Network or radio (RF) engineer', what: 'Plans where cell sites go, sets their antennas and frequencies, and chases dropped calls and slow data.', where: 'Mobile operators such as Smart [9], Globe [10] and DITO [7], and the contractors that build their towers and fibre.' },
          { title: 'Transmission or fibre engineer', what: 'Designs and tests the fibre and microwave links that carry traffic between sites.', where: 'Operators and contractors.' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Broadcast engineer', what: 'Keeps radio and TV transmitters, studios and links on air.', where: 'Radio and TV networks.' },
          { title: 'Regulator', what: 'Assigns radio frequencies, licenses stations and checks that equipment follows the rules.', where: 'The National Telecommunications Commission (NTC). [11]' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Network planning lead', what: 'Decides how a whole region’s network grows, from 4G to 5G and beyond.', where: 'Operators.' },
          { title: 'Consulting (PECE)', what: 'Designs and signs telecom plans for buildings and projects. Consulting is reserved for PECEs. [1]', where: 'Engineering consultancies, or your own firm.' },
        ],
      },
    ],
  },
  {
    id: 'embedded',
    title: 'Embedded systems and automation',
    icon: '⚙',
    blurb: 'Small computers inside things: machines, cars, meters and appliances. Microcontrollers, sensors and control loops.',
    classes: ['ece-201', 'ece-202', 'ece-203', 'ee-117'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Embedded firmware engineer', what: 'Writes the program inside a microcontroller and tests it on real circuit boards.', where: 'Electronics makers and product design firms. [8]' },
          { title: 'Automation or instrumentation engineer', what: 'Wires and programs the controllers, sensors and drives that run a production line.', where: 'Factories of every kind, food and drink to cement.' },
        ],
      },
      {
        stage: 'Growing · 3–8 years',
        roles: [
          { title: 'Hardware design engineer', what: 'Designs circuit boards: picks the parts, draws the schematic and lays out the copper.', where: 'Product companies, here and abroad.' },
          { title: 'Systems integrator', what: 'Builds complete control, security or building-management systems for clients.', where: 'Integration companies.' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Lead engineer or architect', what: 'Decides how a whole product’s electronics and software fit together.', where: 'Product companies.' },
          { title: 'Your own product', what: 'Cheap microcontrollers and boards make small hardware start-ups possible.', where: 'Anywhere.' },
        ],
      },
    ],
  },
  {
    id: 'research',
    title: 'Research and space',
    icon: '🛰',
    blurb: 'Filipino engineers have built satellites: Diwata-1, launched in 2016, was the country’s first microsatellite, built by DOST-ASTI and UP engineers with Tohoku and Hokkaido universities in Japan. [13]',
    classes: ['ee-111', 'ee-112', 'ece-203', 'ee-114'],
    stages: [
      {
        stage: 'First job · 0–3 years',
        roles: [
          { title: 'Research engineer', what: 'Builds and tests prototypes in government ICT and electronics research.', where: 'DOST’s Advanced Science and Technology Institute (ASTI). [14]' },
          { title: 'Space systems engineer (trainee)', what: 'Works on satellite electronics, ground stations and the data they bring down.', where: 'The Philippine Space Agency (PhilSA). [12]' },
        ],
      },
      {
        stage: 'Further study',
        roles: [
          { title: 'MS or PhD', what: 'Research jobs usually need a graduate degree. DOST-SEI’s ERDT programme funds engineering graduate study in the Philippines. [15]', where: 'Philippine universities, or abroad.' },
        ],
      },
      {
        stage: 'Senior · 8+ years',
        roles: [
          { title: 'Researcher or professor', what: 'Leads a lab, wins grants and teaches the next engineers.', where: 'Universities and government institutes.' },
        ],
      },
    ],
  },
];
