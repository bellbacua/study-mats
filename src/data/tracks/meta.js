// Specializations: elective tracks that sit on top of the core timetable.
// The first one unlocks when every Year 1 class is passed, a second after
// Year 2 and a third after Year 3. Inside a track the classes go in order,
// and each also waits for the core class (`after`) whose ideas it builds on.

export const TRACKS = [
  {
    id: 'metals',
    title: 'Metals and Metallurgy',
    icon: '⚒',
    blurb: 'How metal is won from ore, made into steel and alloys, and made stronger. Very close to the Philippine nickel, copper and steel industry.',
    jobs: 'Mining and smelting plants, steel mills, foundries, heat-treatment shops, failure analysis.',
    um: ['MATE 303', 'MATE 308'],
    classes: [
      { id: 'met-001', after: 'chem-011' }, // iron and steel making
      { id: 'met-002', after: 'chem-101' }, // extracting nickel: Ellingham, laterite, HPAL
      { id: 'met-003', after: 'mate-202' }, // solid solutions and alloy design
      { id: 'met-004', after: 'mate-203' }, // precipitation hardening
      { id: 'met-005', after: 'mate-203' }, // grain size, cold work, recrystallisation
      { id: 'met-006', after: 'mate-124' }, // stainless steels and superalloys
    ],
  },
  {
    id: 'electronic',
    title: 'Electronic Materials',
    icon: '⚡',
    blurb: 'Why some materials conduct and others do not, how doping and junctions make chips work, and how pure silicon is grown.',
    jobs: 'Semiconductor plants (Cebu, Laguna, Batangas), electronics assembly and testing, magnet and sensor makers.',
    um: ['MATE 303', 'MATE 405'],
    classes: [
      { id: 'elec-001', after: 'phys-006' }, // conductors and resistivity
      { id: 'elec-002', after: 'mate-401' }, // carriers and doping
      { id: 'elec-003', after: 'mate-401' }, // the p–n junction
      { id: 'elec-004', after: 'mate-202' }, // growing pure silicon
      { id: 'elec-005', after: 'mate-401' }, // dielectrics and capacitors
      { id: 'elec-006', after: 'phys-208' }, // magnetic materials
    ],
  },
  {
    id: 'energy',
    title: 'Energy Materials',
    icon: '☀',
    blurb: 'The materials inside solar panels, batteries, fuel cells and geothermal plants, and the numbers that decide which one wins.',
    jobs: 'Solar and battery makers, power plants (including geothermal in Leyte and Negros), electric-vehicle and grid-storage firms.',
    um: ['MATE 308', 'MATE 405'],
    classes: [
      { id: 'enrg-001', after: 'phys-012' }, // energy in a kilogram
      { id: 'enrg-002', after: 'chem-011' }, // battery electrodes and capacity
      { id: 'enrg-003', after: 'mate-401' }, // solar cells
      { id: 'enrg-004', after: 'chem-101' }, // fuel cells and hydrogen
      { id: 'enrg-005', after: 'mate-401' }, // thermoelectrics
      { id: 'enrg-006', after: 'mate-124' }, // geothermal plant materials
    ],
  },
];

// Weeks that make up each year of the core timetable, and how many tracks
// can be open once that year is finished.
export const YEAR_ENDS = [
  { year: 1, lastWeek: 24, slots: 1 },
  { year: 2, lastWeek: 32, slots: 2 },
  { year: 3, lastWeek: 40, slots: 3 },
];
