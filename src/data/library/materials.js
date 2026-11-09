// The materials shelf of the Library: about a hundred materials with typical
// room-temperature properties. Real grades and tempers vary a lot, so treat
// every number as "a typical value", not a specification.
//
// m(id, name, family, wikipedia, [rho, E, s, t, k], price band, note, classes, extra)
//   rho  density, g/cm³
//   E    stiffness (Young's modulus), GPa
//   s    strength, MPa (see STRENGTH_NOTE: what "strength" means per family)
//   t    temperature, °C, with tk saying what happens there (default: melts)
//   k    thermal conductivity, W/(m·K)
//   price band 1–5 (see PRICE_BANDS)
// null means "not a useful single number" (the note says why).

export const SOURCES = {
  ashby: { title: 'M. F. Ashby, Materials Selection in Mechanical Design, 5th ed. (Elsevier, 2017), data appendix', url: 'https://www.sciencedirect.com/book/9780081005996/materials-selection-in-mechanical-design' },
  callister: { title: 'W. D. Callister & D. G. Rethwisch, Materials Science and Engineering: An Introduction, 10th ed. (Wiley, 2018), Appendix B', url: 'https://www.wiley.com/en-us/Materials+Science+and+Engineering%3A+An+Introduction%2C+10th+Edition-p-9781119405498' },
  matweb: { title: 'MatWeb material property data (search any grade by name)', url: 'https://www.matweb.com/' },
  asm: { title: 'ASM International, ASM Handbook Vol. 2: Properties and Selection: Nonferrous Alloys (1990)', url: 'https://www.asminternational.org/' },
  toolbox: { title: 'The Engineering ToolBox: thermal conductivity of common materials', url: 'https://www.engineeringtoolbox.com/thermal-conductivity-d_429.html' },
};

export const STRENGTH_NOTE =
  'Strength means yield strength for metals and plastics (where they start to bend for good), the breaking strength in bending for ceramics and glass, and the tensile strength along the fibres for fibres, wood and composites.';

export const PRICE_BANDS = [
  null,
  { label: '$', range: 'under 1 USD per kg' },
  { label: '$$', range: '1 to 10 USD per kg' },
  { label: '$$$', range: '10 to 100 USD per kg' },
  { label: '$$$$', range: '100 to 1,000 USD per kg' },
  { label: '$$$$$', range: 'over 1,000 USD per kg' },
];

export const FAMILIES = [
  { id: 'steel', label: 'Irons & steels', color: 'var(--blue)' },
  { id: 'metal', label: 'Other metals', color: 'var(--teal)' },
  { id: 'ceramic', label: 'Ceramics & glass', color: 'var(--gold)' },
  { id: 'polymer', label: 'Plastics', color: 'var(--purple)' },
  { id: 'elastomer', label: 'Rubbers', color: 'var(--red)' },
  { id: 'composite', label: 'Fibres & composites', color: 'var(--yellow)' },
  { id: 'natural', label: 'Natural materials', color: 'var(--green)' },
  { id: 'functional', label: 'Electronic & energy', color: '#e59ac7' },
  { id: 'foam', label: 'Foams', color: '#9aa7b8' },
];

export const PROPS = [
  { key: 'rho', label: 'Density', unit: 'g/cm³', hint: 'How heavy a fixed volume is. Water is 1.' },
  { key: 'E', label: 'Stiffness', unit: 'GPa', hint: 'How hard it is to stretch elastically (Young’s modulus).' },
  { key: 's', label: 'Strength', unit: 'MPa', hint: STRENGTH_NOTE },
  { key: 't', label: 'Melts / softens', unit: '°C', hint: 'Where it melts, softens, chars or breaks down. The card says which.' },
  { key: 'k', label: 'Heat conduction', unit: 'W/(m·K)', hint: 'How fast heat flows through it. Copper is about 390; still air about 0.025.' },
  { key: 'price', label: 'Price band', unit: '', hint: 'Rough bulk price per kilogram. Prices move with markets.' },
];

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;
const m = (id, name, fam, wiki, [rho, E, s, t, k], price, note, classes = [], extra = {}) => ({
  id,
  name,
  fam,
  wiki: W(wiki),
  rho,
  E,
  s,
  t,
  k,
  price,
  note,
  classes,
  tk: 'melts',
  src: ['ashby', 'callister'],
  ...extra,
});

const STEEL = ['mate-127', 'mate-202', 'met-001'];
const HEAT = ['mate-203', 'mate-122'];
const ALU = ['met-004', 'met-003'];
const POLY = ['mate-301', 'chem-016', 'mate-123'];
const CER = ['mate-302', 'mate-110'];
const SEMI = ['elec-002', 'elec-004', 'mate-401'];

export const MATERIALS = [
  // ---------- irons & steels ----------
  m('iron', 'Pure iron', 'steel', 'Iron', [7.87, 211, 130, 1538, 80], 2, 'Soft and magnetic. Almost all of it is turned into steel; pure iron is used for magnet cores and as a reference metal.', ['met-001', 'mate-202']),
  m('s1020', 'Low-carbon steel (1020)', 'steel', 'Carbon_steel', [7.85, 207, 210, 1515, 52], 1, 'The everyday “mild steel” of beams, car bodies, nails and rebar. Easy to weld and bend; the 20 in the name means 0.20% carbon.', STEEL),
  m('s1045', 'Medium-carbon steel (1045)', 'steel', 'Carbon_steel', [7.85, 205, 530, 1500, 50], 1, 'Shafts, axles and gears. More carbon (0.45%) gives more strength, and it can be quenched and tempered.', [...STEEL, ...HEAT]),
  m('s1080', 'High-carbon steel (1080)', 'steel', 'Carbon_steel', [7.85, 205, 380, 1470, 48], 1, 'Almost all pearlite at 0.8% carbon. Annealed it is shown here; drawn into piano wire or springs it passes 2,000 MPa.', [...STEEL, ...HEAT]),
  m('s4140', 'Chromium–molybdenum steel (4140)', 'steel', 'Alloy_steel', [7.85, 205, 900, 1500, 43], 2, 'Quenched and tempered for crankshafts, bolts and drill collars. Chromium and molybdenum let thick sections harden all the way through.', [...STEEL, ...HEAT]),
  m('d2', 'Tool steel (D2)', 'steel', 'Tool_steel', [7.7, 210, 1500, 1420, 20], 2, 'Hardened for dies and knives. About 12% chromium and 1.5% carbon form hard carbides that resist wear.', ['mate-127', 'mate-203']),
  m('ss304', 'Stainless steel 304', 'steel', 'SAE_304_stainless_steel', [8.0, 193, 215, 1450, 16], 2, 'The kitchen-sink stainless: 18% chromium, 8% nickel. A thin chromium oxide film heals itself when scratched. Not magnetic when annealed.', ['met-006', 'mate-124']),
  m('ss316', 'Stainless steel 316', 'steel', 'SAE_316L_stainless_steel', [8.0, 193, 205, 1400, 16], 2, 'Adds 2–3% molybdenum to resist pitting in seawater and chlorides. Used for boat fittings and surgical tools.', ['met-006', 'mate-124', 'mate-137']),
  m('ss410', 'Martensitic stainless (410)', 'steel', 'Martensitic_stainless_steel', [7.7, 200, 275, 1500, 25], 2, 'About 12% chromium and enough carbon to harden by quenching. Cutlery, turbine blades and valves. Shown annealed.', ['met-006', 'mate-203']),
  m('duplex', 'Duplex stainless (2205)', 'steel', 'Duplex_stainless_steel', [7.8, 200, 450, 1450, 19], 3, 'Half ferrite, half austenite. Twice the yield strength of 304 and much better against chloride cracking; used in desalination and offshore pipes.', ['met-006']),
  m('maraging', 'Maraging steel (300 grade)', 'steel', 'Maraging_steel', [8.0, 190, 2000, 1413, 25], 3, 'Almost no carbon but 18% nickel; strengthened by tiny precipitates during ageing. Rocket motor cases and golf club faces.', ['met-004', 'mate-127']),
  m('greyiron', 'Grey cast iron', 'steel', 'Gray_iron', [7.15, 100, 200, 1200, 46], 1, 'Graphite flakes make it machine easily, damp vibration and pour well, but the flakes act as cracks: it is weak in tension. Engine blocks and manhole covers. Strength is tensile (no yield).', ['mate-130', 'mate-202']),
  m('ductileiron', 'Ductile (nodular) cast iron', 'steel', 'Ductile_iron', [7.1, 169, 275, 1150, 36], 1, 'A pinch of magnesium turns the graphite into round nodules, so cracks have nothing sharp to start from. Water pipes and crankshafts.', ['mate-130']),
  m('hadfield', 'Manganese steel (Hadfield)', 'steel', 'Mangalloy', [7.9, 200, 380, 1400, 13], 2, 'About 12% manganese. Its surface hardens as it is hammered, which is why it is used for rock crushers and railway crossings. Robert Hadfield, 1882.', ['mate-127']),

  // ---------- other metals ----------
  m('al1100', 'Aluminium, commercially pure (1100)', 'metal', 'Aluminium', [2.71, 69, 35, 655, 222], 2, 'Soft, light and an excellent conductor. Foil, cooking pots and heat sinks. A natural oxide film protects it.', ALU),
  m('al6061', 'Aluminium 6061-T6', 'metal', '6061_aluminium_alloy', [2.7, 69, 276, 600, 167], 2, 'The general-purpose structural aluminium: bicycle frames, window frames, truck parts. Magnesium and silicon precipitates give its strength.', ALU),
  m('al7075', 'Aluminium 7075-T6', 'metal', '7075_aluminium_alloy', [2.81, 72, 505, 590, 130], 3, 'Zinc-rich aircraft alloy, as strong as many steels at a third of the weight, but harder to weld and more prone to stress corrosion.', ALU),
  m('al2024', 'Aluminium 2024-T3 (duralumin family)', 'metal', '2024_aluminium_alloy', [2.78, 73, 345, 580, 121], 3, 'Copper-bearing alloy for aircraft skins, descended from Alfred Wilm’s duralumin of 1906. Good fatigue resistance.', ['met-004', 'mate-125']),
  m('cu', 'Copper (pure, annealed)', 'metal', 'Copper', [8.94, 115, 70, 1085, 390], 2, 'Second only to silver at carrying electricity and heat. Wires, motors, pipes. Cold work raises its yield several times.', ['elec-001', 'met-005']),
  m('brass', 'Cartridge brass (70% Cu, 30% Zn)', 'metal', 'Brass', [8.53, 110, 75, 950, 120], 2, 'Deep-draws without cracking, which made it the metal of ammunition cases. Shown annealed; cold-rolled it reaches over 400 MPa.', ['met-003', 'met-005']),
  m('bronze', 'Phosphor bronze (Cu–5% Sn)', 'metal', 'Phosphor_bronze', [8.86, 110, 130, 1000, 84], 3, 'Tin bronze with a little phosphorus. Springs, bearings and bells; bronze gave the Bronze Age its name over 5,000 years ago.', ['met-003', 'chem-000']),
  m('cube', 'Beryllium copper', 'metal', 'Beryllium_copper', [8.25, 128, 1100, 900, 105], 3, 'Age-hardened to steel-like strength while staying conductive. Non-sparking tools for oil refineries and springy electrical contacts. Its dust is toxic to breathe.', ['met-004']),
  m('ni', 'Nickel (pure)', 'metal', 'Nickel', [8.89, 204, 148, 1455, 70], 3, 'Resists caustic soda and is the base of superalloys and stainless steel. The Philippines is one of the world’s biggest nickel ore exporters.', ['met-002', 'met-006']),
  m('in718', 'Nickel superalloy (Inconel 718)', 'metal', 'Inconel', [8.19, 200, 1035, 1300, 11.4], 3, 'Keeps its strength to about 650 °C. Jet-engine discs and rocket parts. Tiny gamma-double-prime precipitates do the work.', ['met-006', 'mate-126']),
  m('monel', 'Monel 400 (Ni–Cu)', 'metal', 'Monel', [8.8, 180, 240, 1330, 22], 3, 'Two-thirds nickel, one-third copper. Very resistant to seawater; used for pumps, propeller shafts and marine fasteners.', ['met-003']),
  m('ti2', 'Titanium, commercially pure (Grade 2)', 'metal', 'Titanium', [4.51, 105, 275, 1665, 16.4], 3, 'Its oxide film makes it almost immune to seawater and body fluids. Heat exchangers, dental implants.', ['mate-137']),
  m('ti64', 'Titanium alloy Ti-6Al-4V', 'metal', 'Ti-6Al-4V', [4.43, 114, 880, 1650, 6.7], 3, 'Half of all titanium used. Aircraft frames, hip stems and 3D-printed brackets. Strength of a good steel at 57% of the weight.', ['mate-137', 'mate-138']),
  m('mg', 'Magnesium alloy AZ31', 'metal', 'Magnesium_alloy', [1.77, 45, 200, 630, 96], 2, 'The lightest structural metal. Laptop cases and car seat frames. Burns fiercely as fine chips and corrodes easily if not coated.', ['met-003']),
  m('zn', 'Zinc', 'metal', 'Zinc', [7.14, 108, 30, 420, 116], 2, 'Most zinc goes on steel as a coating (galvanising) and is eaten away first to protect it. Weak and creeps at room temperature.', ['mate-124', 'mate-402']),
  m('pb', 'Lead', 'metal', 'Lead', [11.34, 16, 10, 327, 35], 2, 'Heavy, soft and easy to cast. Car batteries and radiation shields. Toxic: banned from paint, petrol and solder in many countries.', ['chem-017']),
  m('sn', 'Tin', 'metal', 'Tin', [7.29, 50, 11, 232, 67], 3, 'Coats steel cans (tinplate) and is the main metal in solder. Below 13 °C it can slowly crumble into grey “tin pest”.', ['mate-117']),
  m('solder', 'Lead-free solder (SAC305)', 'metal', 'Solder', [7.4, 50, 35, 218, 58], 3, '96.5% tin, 3% silver, 0.5% copper. It replaced tin–lead solder in electronics after the EU’s 2006 RoHS rules.', ['mate-202']),
  m('au', 'Gold', 'metal', 'Gold', [19.3, 79, null, 1064, 318], 5, 'Never tarnishes, so it coats electrical contacts. So soft when pure that it bends by hand (no useful yield value). One gram can be beaten into about a square metre of leaf.', ['chem-004']),
  m('ag', 'Silver', 'metal', 'Silver', [10.49, 83, 55, 962, 429], 4, 'The best electrical and thermal conductor of all metals. Solar-cell contacts, mirrors, brazing alloys.', ['elec-001', 'enrg-003']),
  m('pt', 'Platinum', 'metal', 'Platinum', [21.45, 168, null, 1768, 72], 5, 'Catalyst in car exhausts and fuel cells, and in lab crucibles that must survive almost anything. Very soft when pure.', ['enrg-004']),
  m('w', 'Tungsten', 'metal', 'Tungsten', [19.25, 411, 750, 3422, 173], 3, 'The highest melting point of any metal. Lamp filaments, welding electrodes and heavy counterweights. Brittle at room temperature unless worked.', ['met-003', 'mate-132']),
  m('mo', 'Molybdenum', 'metal', 'Molybdenum', [10.28, 329, 550, 2623, 138], 3, 'Furnace parts and an alloying element that helps steels harden and resist pitting.', ['met-006']),
  m('ta', 'Tantalum', 'metal', 'Tantalum', [16.69, 186, 170, 3017, 57], 4, 'Its oxide makes tiny high-value capacitors for phones. Also used in chemical plants and implants.', ['elec-005']),
  m('cocr', 'Cobalt–chromium alloy (CoCrMo)', 'metal', 'Cobalt-chrome', [8.3, 210, 450, 1350, 13], 3, 'Hard-wearing and corrosion resistant. Heads of artificial hips and knee parts, and dental frameworks.', ['mate-137', 'bio-010']),
  m('nitinol', 'Nitinol (nickel–titanium)', 'metal', 'Nickel_titanium', [6.45, 75, 500, 1310, 18], 4, 'A shape-memory alloy: bend it cold and it springs back when warmed. Heart stents and glasses frames. Found at the US Naval Ordnance Laboratory in 1959.', ['mate-137', 'mate-203']),
  m('li', 'Lithium metal', 'metal', 'Lithium', [0.534, 4.9, null, 180.5, 85], 3, 'The lightest metal: it floats on water (and reacts with it). Holds about 3,860 mAh per gram, which is why researchers want lithium-metal anodes.', ['mate-139', 'enrg-002']),
  m('zr', 'Zirconium alloy (Zircaloy-4)', 'metal', 'Zircaloy', [6.56, 99, 380, 1850, 21.5], 3, 'Lets neutrons pass almost untouched, so it wraps the uranium fuel in nuclear reactors.', ['met-003']),
  m('cr', 'Chromium', 'metal', 'Chromium', [7.19, 279, 280, 1907, 94], 2, 'Brittle on its own but the key to stainless steel. Thin chrome plating gives taps and bumpers their shine.', ['met-006']),

  // ---------- ceramics & glass ----------
  m('al2o3', 'Alumina (Al₂O₃, 99.5%)', 'ceramic', 'Aluminium_oxide', [3.9, 370, 380, 2072, 30], 2, 'The workhorse technical ceramic: spark-plug insulators, cutting tools, armour and electronic substrates. Ruby and sapphire are alumina too.', CER),
  m('sapphire', 'Sapphire (single-crystal alumina)', 'ceramic', 'Sapphire', [3.98, 345, 400, 2040, 35], 4, 'Grown as large crystals for scratch-proof watch glasses, camera-lens covers and LED substrates.', ['mate-302', 'elec-004']),
  m('ysz', 'Zirconia (yttria-stabilised, 3Y-TZP)', 'ceramic', 'Zirconium_dioxide', [6.05, 205, 1000, 2715, 2.5], 3, 'Unusually tough for a ceramic: crystals near a crack change shape and squeeze it shut. Dental crowns, knife blades, oxygen sensors.', ['mate-302', 'mate-137']),
  m('sic', 'Silicon carbide (SiC)', 'ceramic', 'Silicon_carbide', [3.21, 410, 450, 2730, 120], 3, 'Very hard and conducts heat well. Abrasives, brake discs, bullet-proof plates, and power chips in electric cars.', [...CER, 'elec-002'], { tk: 'breaks down' }),
  m('si3n4', 'Silicon nitride (Si₃N₄)', 'ceramic', 'Silicon_nitride', [3.2, 310, 800, 1900, 30], 3, 'Tough and shock resistant. Ball bearings for high-speed spindles and turbocharger rotors.', CER, { tk: 'breaks down' }),
  m('wcco', 'Cemented carbide (WC–6% Co)', 'ceramic', 'Cemented_carbide', [15.0, 620, 2000, 2870, 85], 3, 'Hard tungsten-carbide grains glued with cobalt metal. Drill bits and lathe inserts. The temperature is for the carbide; the cobalt binder melts lower, near 1,320 °C.', ['mate-132', 'mate-302']),
  m('b4c', 'Boron carbide (B₄C)', 'ceramic', 'Boron_carbide', [2.52, 450, 350, 2763, 30], 3, 'One of the hardest materials known and very light: body armour plates and sandblasting nozzles.', CER),
  m('diamond', 'Diamond', 'ceramic', 'Diamond', [3.51, 1050, null, 1500, 2200], 5, 'The stiffest bulk material and the best heat conductor at room temperature. Strength depends on flaws, so no single value. In air it burns from about 700 °C; without air it turns to graphite near 1,500 °C.', ['mate-136', 'mate-114'], { tk: 'turns to graphite (no air)' }),
  m('graphite', 'Graphite (synthetic, fine grain)', 'ceramic', 'Graphite', [1.8, 10, 40, 3650, 100], 2, 'Layers of carbon that slide over each other. Pencils, lubricants, crucibles, electrodes for steel arc furnaces and battery anodes.', ['mate-136', 'enrg-002'], { tk: 'sublimes' }),
  m('sodalime', 'Soda-lime glass', 'ceramic', 'Soda–lime_glass', [2.5, 72, 50, 720, 1.0], 1, 'Windows and bottles: about 90% of all glass. Real strength is set by surface scratches, not by the glass itself.', ['mate-128'], { tk: 'softens' }),
  m('borosilicate', 'Borosilicate glass (Pyrex type)', 'ceramic', 'Borosilicate_glass', [2.23, 64, 50, 820, 1.14], 2, 'Expands only a third as much as window glass when heated, so it survives hot-to-cold shocks. Lab glassware and oven dishes. Otto Schott, 1893.', ['mate-128'], { tk: 'softens' }),
  m('silica', 'Fused silica (pure SiO₂ glass)', 'ceramic', 'Fused_quartz', [2.2, 72, 50, 1665, 1.38], 3, 'Almost no thermal expansion and very clear. Optical fibres, telescope mirrors and the crucibles that grow silicon crystals.', ['mate-128', 'elec-004'], { tk: 'softens' }),
  m('glassceramic', 'Glass-ceramic (Pyroceram type)', 'ceramic', 'Glass-ceramic', [2.6, 120, 150, 1250, 3.6], 2, 'Glass that is crystallised on purpose. Stovetop panels and CorningWare. Donald Stookey found it in 1953 when a furnace overheated.', ['mate-128', 'mate-119'], { tk: 'softens' }),
  m('porcelain', 'Porcelain', 'ceramic', 'Porcelain', [2.4, 70, 50, 1400, 1.5], 1, 'Fired clay, feldspar and quartz. Plates, toilets and the insulators on power lines. Chinese potters made it by the Tang dynasty.', ['mate-110'], { tk: 'softens' }),
  m('brick', 'Fired clay brick', 'ceramic', 'Brick', [1.9, 15, 7, null, 0.7], 1, 'Strength here is in tension (or bending); in compression bricks carry 20–100 MPa, which is how they are used.', ['mate-110']),
  m('concrete', 'Concrete (ordinary)', 'ceramic', 'Concrete', [2.4, 30, 3, null, 1.7], 1, 'The most used material on Earth after water. Strong in compression (20–50 MPa) but weak in tension (the 3 MPa shown), so steel bars go where it is pulled.', ['chem-017', 'phys-211']),
  m('ha', 'Hydroxyapatite', 'ceramic', 'Hydroxyapatite', [3.16, 110, 100, 1650, 1.3], 4, 'The mineral of bone and tooth enamel. Coated on implants so bone bonds to them.', ['mate-137', 'bio-010'], { tk: 'breaks down' }),
  m('mgo', 'Magnesia (MgO) refractory', 'ceramic', 'Magnesium_oxide', [3.58, 300, 100, 2852, 45], 1, 'Lines steelmaking furnaces and ladles, because it resists molten metal and basic slag.', ['met-001']),

  // ---------- plastics ----------
  m('ldpe', 'Low-density polyethylene (LDPE)', 'polymer', 'Low-density_polyethylene', [0.92, 0.2, 10, 110, 0.33], 2, 'Branched chains that pack loosely. Plastic bags and squeeze bottles. Found by accident at ICI in 1933.', POLY),
  m('hdpe', 'High-density polyethylene (HDPE)', 'polymer', 'High-density_polyethylene', [0.95, 1.0, 26, 130, 0.48], 2, 'Straight chains that crystallise well. Milk jugs, water pipes, chopping boards. Made possible by Ziegler’s catalysts (1953).', POLY),
  m('uhmwpe', 'Ultra-high-molecular-weight polyethylene', 'polymer', 'Ultra-high-molecular-weight_polyethylene', [0.93, 0.8, 22, 135, 0.4], 2, 'Chains millions of units long make it extremely wear resistant: the cup of artificial hips. As fibres (Dyneema) it is stronger than steel by weight.', [...POLY, 'mate-137']),
  m('pp', 'Polypropylene (PP)', 'polymer', 'Polypropylene', [0.905, 1.4, 33, 165, 0.12], 2, 'Food tubs, car bumpers, “living hinges” on bottle caps that flex millions of times. Natta, 1954.', POLY),
  m('pvc', 'PVC, rigid (uPVC)', 'polymer', 'Polyvinyl_chloride', [1.4, 3.0, 45, 80, 0.19], 2, 'Water and drain pipes, window frames. With plasticiser added it becomes soft PVC for cables and hoses.', POLY, { tk: 'softens (Tg)' }),
  m('ps', 'Polystyrene (PS)', 'polymer', 'Polystyrene', [1.05, 3.2, 40, 100, 0.13], 2, 'Clear, stiff and brittle: CD cases and disposable cutlery. Foamed, it becomes Styrofoam.', POLY, { tk: 'softens (Tg)' }),
  m('pet', 'PET (polyethylene terephthalate)', 'polymer', 'Polyethylene_terephthalate', [1.38, 2.8, 55, 255, 0.2], 2, 'Soft-drink bottles and polyester clothing. Stretching the bottle as it is blown lines up the chains and makes it strong.', [...POLY, 'mate-120']),
  m('nylon', 'Nylon 6,6', 'polymer', 'Nylon_66', [1.14, 2.8, 70, 265, 0.25], 2, 'The first fully synthetic fibre, from Wallace Carothers at DuPont (1935). Gears, zip ties, ropes. Absorbs water, which softens it.', POLY),
  m('pc', 'Polycarbonate (PC)', 'polymer', 'Polycarbonate', [1.2, 2.4, 62, 147, 0.2], 2, 'Clear and very tough: safety glasses, riot shields, greenhouse panels.', POLY, { tk: 'softens (Tg)' }),
  m('pmma', 'Acrylic (PMMA, Plexiglas)', 'polymer', 'Poly(methyl_methacrylate)', [1.18, 3.0, 65, 105, 0.19], 2, 'Clearer than glass and half the weight. Aquarium windows, signs, and the bone cement that fixes hip implants.', [...POLY, 'mate-137'], { tk: 'softens (Tg)' }),
  m('ptfe', 'PTFE (Teflon)', 'polymer', 'Polytetrafluoroethylene', [2.2, 0.5, 15, 327, 0.25], 3, 'Almost nothing sticks to it and almost nothing dissolves it. Non-stick pans, seals, cable insulation. Roy Plunkett found it by accident in 1938.', POLY),
  m('abs', 'ABS', 'polymer', 'Acrylonitrile_butadiene_styrene', [1.05, 2.2, 42, 105, 0.17], 2, 'Tough rubber-toughened plastic: LEGO bricks, phone housings, and a common 3D-printing filament.', [...POLY, 'mate-138'], { tk: 'softens (Tg)' }),
  m('peek', 'PEEK', 'polymer', 'Polyether_ether_ketone', [1.32, 3.7, 95, 343, 0.25], 4, 'A high-performance plastic that survives 250 °C steam and body implants. Spine cages and aircraft brackets.', [...POLY, 'mate-137']),
  m('epoxy', 'Epoxy resin', 'polymer', 'Epoxy', [1.2, 3.0, 60, 120, 0.2], 2, 'A thermoset glue that sets hard by cross-linking. The matrix of most carbon-fibre composites. The temperature is its softening point (Tg), which depends on the hardener.', ['chem-016', 'mate-302'], { tk: 'softens (Tg)' }),
  m('phenolic', 'Phenolic (Bakelite)', 'polymer', 'Bakelite', [1.3, 4, 45, 300, 0.25], 2, 'The first fully synthetic plastic (Leo Baekeland, 1907). Heat-proof pan handles and circuit boards. It chars instead of melting.', ['chem-016', 'mate-301'], { tk: 'chars' }),
  m('pla', 'PLA (polylactic acid)', 'polymer', 'Polylactic_acid', [1.24, 3.5, 60, 60, 0.13], 2, 'Made from corn or cassava starch. The most common 3D-printing plastic. Compostable only in hot industrial composters.', [...POLY, 'mate-138'], { tk: 'softens (Tg)' }),
  m('kevlar', 'Aramid fibre (Kevlar 49)', 'composite', 'Kevlar', [1.44, 112, 3000, 500, 0.04], 3, 'Stephanie Kwolek’s 1965 discovery at DuPont. Five times stronger than steel by weight: body armour, tyres, ropes.', ['mate-302', 'mate-301'], { tk: 'breaks down' }),

  // ---------- rubbers ----------
  m('nr', 'Natural rubber (vulcanised)', 'elastomer', 'Natural_rubber', [0.93, 0.0015, 25, -70, 0.13], 2, 'Tapped from the Pará rubber tree. Sulfur cross-links (Goodyear, 1839) stop it going sticky in heat. Stretches to 7 times its length. Strength here is tensile; below the temperature shown it turns glassy and brittle.', ['mate-301'], { tk: 'turns glassy below' }),
  m('neoprene', 'Neoprene (polychloroprene)', 'elastomer', 'Neoprene', [1.23, 0.005, 20, -40, 0.19], 2, 'The first mass-produced synthetic rubber (DuPont, 1931). Wetsuits, laptop sleeves, bridge bearings.', ['mate-301'], { tk: 'turns glassy below' }),
  m('silicone', 'Silicone rubber', 'elastomer', 'Silicone_rubber', [1.2, 0.005, 8, -120, 0.2], 3, 'A silicon–oxygen backbone keeps it flexible from −50 °C to over 200 °C. Baking moulds, seals, medical tubing.', ['mate-301', 'mate-137'], { tk: 'turns glassy below' }),
  m('epdm', 'EPDM rubber', 'elastomer', 'EPDM_rubber', [0.86, 0.005, 15, -55, 0.25], 2, 'Shrugs off sunlight, ozone and weather. Car door seals and flat-roof membranes.', ['mate-301'], { tk: 'turns glassy below' }),

  // ---------- fibres & composites ----------
  m('cfrp_ud', 'Carbon-fibre composite, along the fibres', 'composite', 'Carbon-fiber_reinforced_polymer', [1.6, 135, 1500, 300, 7], 3, 'Carbon fibres in epoxy, loaded along the fibres. Across the fibres it is ten times weaker, so real parts stack layers in several directions.', ['mate-302'], { tk: 'matrix breaks down' }),
  m('cfrp_qi', 'Carbon-fibre composite, quasi-isotropic laid-up', 'composite', 'Carbon-fiber_reinforced_polymer', [1.55, 60, 600, 300, 5], 3, 'Layers at 0°, ±45° and 90° give similar properties in every in-plane direction. Aircraft wings (Boeing 787) and racing bike frames.', ['mate-302'], { tk: 'matrix breaks down' }),
  m('gfrp', 'Glass-fibre composite (along the fibres)', 'composite', 'Fibreglass', [1.9, 40, 1000, 300, 0.4], 2, 'Cheaper than carbon fibre and does not conduct electricity. Boat hulls, wind-turbine blades, water tanks.', ['mate-302'], { tk: 'matrix breaks down' }),
  m('cfibre', 'Carbon fibre (single fibre, T700 class)', 'composite', 'Carbon_fibers', [1.8, 230, 4900, 3650, 10], 3, 'Each fibre is about 7 µm thick, a tenth of a hair. Made by baking acrylic fibres at 1,000–3,000 °C. (In air it burns from about 400 °C.)', ['mate-302', 'mate-136'], { tk: 'sublimes (no air)' }),
  m('eglass', 'E-glass fibre', 'composite', 'Glass_fiber', [2.58, 72, 3400, 846, 1.3], 2, 'Drawn glass fibres. A fresh fibre is far stronger than a window because it has hardly any surface flaws: Griffith’s point, made into a product.', ['mate-302', 'mate-128'], { tk: 'softens' }),
  m('cmc', 'SiC/SiC ceramic-matrix composite', 'composite', 'Ceramic_matrix_composite', [2.5, 200, 300, 1300, 15], 4, 'Silicon-carbide fibres in silicon carbide. Runs hotter than nickel superalloys at a third of the weight; now in jet-engine shrouds. The temperature is a typical use limit.', ['mate-302', 'met-006'], { tk: 'used up to' }),

  // ---------- natural ----------
  m('pine', 'Pine wood (along the grain)', 'natural', 'Pine', [0.5, 10, 40, 300, 0.12], 1, 'Cellulose fibres in a lignin glue, like a natural composite. About 10 times weaker across the grain. Strength shown is in compression along the grain.', ['mate-110', 'mate-302'], { tk: 'chars' }),
  m('balsa', 'Balsa wood', 'natural', 'Ochroma', [0.15, 3.5, 12, 300, 0.05], 2, 'Mostly air inside thin cell walls. Model aircraft and the core of wind-turbine blades.', ['mate-110'], { tk: 'chars' }),
  m('bamboo', 'Bamboo (along the culm)', 'natural', 'Bamboo', [0.7, 15, 150, 300, 0.15], 1, 'Grows up to a metre a day and is a hollow fibre composite. Scaffolding in Asia, floors and bridges. Strength shown is tensile.', ['mate-110', 'mate-302'], { tk: 'chars' }),
  m('abaca', 'Abacá fibre (Manila hemp)', 'natural', 'Abacá', [1.5, 25, 700, 250, null], 2, 'A banana relative native to the Philippines, which grows most of the world’s supply. Very strong in salt water: ship ropes, tea bags, banknote paper and car-part composites.', ['mate-302'], { tk: 'breaks down', src: ['matweb'] }),
  m('coir', 'Coir (coconut fibre)', 'natural', 'Coir', [1.2, 5, 150, 250, null], 1, 'From coconut husks, a big Philippine farm product. Doormats, erosion-control nets and mattress fill. Strength shown is tensile.', ['mate-302'], { tk: 'breaks down', src: ['matweb'] }),
  m('cork', 'Cork', 'natural', 'Cork_(material)', [0.15, 0.02, 1, 300, 0.04], 2, 'Bark of the cork oak, made of tiny sealed cells. Robert Hooke named “cells” after looking at it in 1665. Strength shown is where it starts to crush.', ['bio-001', 'mate-110'], { tk: 'chars' }),
  m('bone', 'Cortical bone', 'natural', 'Bone', [1.9, 18, 130, null, 0.5], null, 'Collagen fibres stiffened by hydroxyapatite crystals. Strength shown is tensile; in compression it carries about 190 MPa. Implants much stiffer than bone take its load away (stress shielding).', ['mate-137', 'bio-010']),
  m('silk', 'Spider dragline silk', 'natural', 'Spider_silk', [1.3, 10, 1100, 230, null], null, 'As strong as good steel by weight and far tougher, because it stretches about 30% before breaking. Not farmed: spiders eat each other.', ['bio-005'], { tk: 'breaks down' }),
  m('nacre', 'Nacre (mother of pearl)', 'natural', 'Nacre', [2.7, 70, 100, null, null], null, '95% brittle aragonite tiles in a thin protein glue, yet about 1,000 times tougher than the mineral alone. A model for designing tough ceramics.', ['mate-302', 'bio-010']),

  // ---------- electronic & energy ----------
  m('si', 'Silicon', 'functional', 'Silicon', [2.33, 150, null, 1414, 150], 3, 'The material of chips and solar cells, refined to 99.9999999% purity. Strength depends on surface flaws, so no single value.', SEMI),
  m('ge', 'Germanium', 'functional', 'Germanium', [5.32, 103, null, 938, 60], 5, 'The first transistor (Bell Labs, 1947) was germanium. Today: infrared lenses, fibre optics and space solar cells.', ['elec-002', 'comp-005']),
  m('gaas', 'Gallium arsenide (GaAs)', 'functional', 'Gallium_arsenide', [5.32, 85, null, 1238, 55], 5, 'Electrons move about six times faster than in silicon. Phone radio chips, red LEDs and record-efficiency solar cells.', ['elec-003', 'enrg-003']),
  m('gan', 'Gallium nitride (GaN)', 'functional', 'Gallium_nitride', [6.15, 300, null, 2500, 130], 5, 'Made blue LEDs possible (Akasaki, Amano, Nakamura; Nobel Prize 2014), and with them white LED lighting. Also small fast phone chargers.', ['elec-003'], { tk: 'breaks down' }),
  m('ndfeb', 'Neodymium magnet (NdFeB)', 'functional', 'Neodymium_magnet', [7.5, 160, 80, 1150, 9], 3, 'The strongest permanent magnet, invented in 1982–84. Electric-car motors, wind turbines, earbuds. Brittle; loses magnetism above about 80–200 °C depending on grade.', ['elec-006']),
  m('ferrite', 'Manganese–zinc ferrite', 'functional', 'Ferrite_(magnet)', [4.8, 120, 50, 1500, 4], 2, 'A magnetic ceramic that barely conducts electricity, so it wastes little power at high frequency. Chargers and the lumps on laptop cables.', ['elec-006']),
  m('sisteel', 'Electrical steel (3% silicon, grain-oriented)', 'functional', 'Electrical_steel', [7.65, 200, 320, 1500, 25], 2, 'Silicon raises resistance to cut eddy currents, and aligned grains make it easy to magnetise in one direction. The cores of power transformers.', ['elec-006', 'phys-208']),
  m('ybco', 'YBCO superconductor', 'functional', 'Yttrium_barium_copper_oxide', [6.3, 150, null, 1000, 5], 5, 'In 1987 it became the first material to superconduct above the boiling point of liquid nitrogen (−196 °C): it does so below about −180 °C (93 K). Brittle ceramic, made as coated tapes.', ['mate-118'], { tk: 'breaks down' }),
  m('pzt', 'Piezoelectric ceramic (PZT)', 'functional', 'Lead_zirconate_titanate', [7.6, 63, 80, 1350, 1.5], 3, 'Squeeze it and it makes a voltage; apply a voltage and it moves. Ultrasound probes, gas-lighter sparks, inkjet heads.', ['elec-005']),
  m('bto', 'Barium titanate', 'functional', 'Barium_titanate', [6.02, 67, 50, 1625, 2.6], 3, 'Its huge dielectric constant (thousands) fills the trillions of tiny capacitors made every year.', ['elec-005']),
  m('ito', 'Indium tin oxide (ITO)', 'functional', 'Indium_tin_oxide', [7.14, 116, null, 1900, 10], 4, 'A coating that conducts electricity yet is see-through: the touch layer of phone screens and solar-cell tops.', ['enrg-003', 'elec-001']),
  m('lco', 'Lithium cobalt oxide (LiCoO₂)', 'functional', 'Lithium_cobalt_oxide', [5.05, null, null, null, null], 3, 'The cathode of the first lithium-ion batteries (Goodenough’s group, 1980; Sony, 1991). About 140 mAh/g usable of 274 in theory.', ['mate-139', 'enrg-002']),
  m('lfp', 'Lithium iron phosphate (LiFePO₄)', 'functional', 'Lithium_iron_phosphate', [3.6, null, null, null, null], 2, 'A safer, longer-lived, cobalt-free cathode (about 170 mAh/g in theory). Used in many electric buses, jeepneys and home batteries.', ['mate-139', 'enrg-002']),
  m('graphene', 'Graphene (one atom thick)', 'functional', 'Graphene', [2.2, 1000, 130000, null, 3000], 5, 'One sheet of graphite. In tests on perfect flakes it is the strongest material measured (130 GPa). Density shown is graphite’s, since one layer has no thickness to speak of. Isolated with sticky tape in 2004.', ['mate-136', 'mate-135']),

  // ---------- foams ----------
  m('eps', 'Expanded polystyrene foam (EPS)', 'foam', 'Polystyrene', [0.02, 0.005, 0.1, 100, 0.035], 2, '98% air. Packaging and building insulation. Strength shown is where it starts to crush.', ['mate-301'], { tk: 'softens' }),
  m('pufoam', 'Rigid polyurethane foam', 'foam', 'Polyurethane', [0.03, 0.01, 0.2, 200, 0.025], 2, 'Sprayed into fridge walls and roof panels: one of the best everyday insulators.', ['mate-301'], { tk: 'breaks down' }),
  m('alfoam', 'Aluminium foam', 'foam', 'Metal_foam', [0.4, 1, 5, 660, 10], 3, 'Crushes slowly and evenly, soaking up crash energy. Car crash boxes and blast panels.', ['met-004']),
  m('aerogel', 'Silica aerogel', 'foam', 'Aerogel', [0.1, 0.001, 0.016, 1200, 0.015], 5, 'Up to 99.8% air, a solid that looks like frozen smoke. NASA’s Stardust probe caught comet dust in it. Insulates better than still air.', ['mate-135'], { tk: 'softens' }),
];
