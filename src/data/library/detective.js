// Failure detective: each case file from failures.js told as a mystery.
// The scene and clues only restate facts already in the case file (and its
// sources); the reveal shows the full file. `no` says why a wrong guess is wrong.

export const CASES = [
  {
    id: 'tay',
    alias: 'The bridge in the storm',
    scene: 'Scotland, 1879. On a stormy December night the high central spans of a nearly new railway bridge fall into the river, with a train on them.',
    clues: [
      'The tall columns were cast iron, bolted to their bracing through small cast lugs.',
      'Some castings had holes that the foundry had hidden with a putty-like paste.',
      'The designer’s calculations made no proper allowance for wind pushing sideways.',
    ],
    answer: 'Brittle cast-iron parts cracked under a wind load that nobody had designed for',
    wrong: [
      { text: 'The train was too heavy and bent the girders downward', no: 'Trains had crossed for over a year. What was new that night was the sideways push of the storm.' },
      { text: 'Decades of rust had eaten through the columns', no: 'The bridge was nearly new.' },
      { text: 'A fatigue crack grew slowly in the steel rails', no: 'The rails did not bring the bridge down; the columns and their lugs did.' },
    ],
  },
  {
    id: 'quebec',
    alias: 'The longest span that never was',
    scene: 'Canada, 1907. A giant steel bridge is being built out over a river from one bank. Before it is finished, the half-built arm folds and falls in about 15 seconds.',
    clues: [
      'During design the span had been made longer.',
      'Nobody recalculated the bridge’s own weight after that change. The real weight was far above the assumed one.',
      'In the days before, workers reported that the lower members, the ones being squeezed, were bending. The warnings were not acted on in time.',
    ],
    answer: 'A squeezed (compression) member buckled under far more weight than was assumed',
    wrong: [
      { text: 'A fatigue crack from years of heavy trains', no: 'The bridge was never finished: no train had crossed it.' },
      { text: 'Wind made the deck twist itself apart', no: 'That is a different famous bridge. This one fell under its own weight.' },
      { text: 'Rust weakened the steel', no: 'The steel was new.' },
    ],
  },
  {
    id: 'titanic',
    alias: 'The unsinkable ship',
    scene: 'North Atlantic, 1912. A new liner strikes an iceberg at speed and sinks in under three hours. Speed and too few lifeboats are the main causes. But decades later, metallurgists test steel raised from the wreck. What do they point to?',
    clues: [
      'The sea that night was close to freezing.',
      'In tests at that temperature, pieces of the hull steel broke with very little bending.',
      'Some of the wrought-iron rivets in the bow held a lot of slag.',
    ],
    answer: 'Hull steel and rivets that were brittle in near-freezing water (still debated)',
    wrong: [
      { text: 'Seawater had corroded the hull thin', no: 'It was the ship’s first voyage.' },
      { text: 'Faulty welds between the hull plates', no: 'The hull was riveted, not welded.' },
      { text: 'Fatigue cracks from years of engine vibration', no: 'The ship was days old.' },
    ],
  },
  {
    id: 'molasses',
    alias: 'The sweet wave',
    scene: 'Boston, 1919. On a January day a 15-metre steel tank of molasses bursts. A wave of syrup several metres high sweeps through the streets.',
    clues: [
      'The tank had leaked since the day it was first filled.',
      'It had never been tested by filling it with water.',
      'The walls were too thin for the load, and the crack started near a manhole at the base, among rivet holes.',
    ],
    answer: 'Thin, brittle steel cracked from a stress concentration near the base',
    wrong: [
      { text: 'Decades of corrosion by the syrup', no: 'The tank had leaked from the start: it was badly made, not worn out.' },
      { text: 'The ground under the tank gave way', no: 'The wall itself split, starting at the manhole.' },
      { text: 'Wind blew the full tank over', no: 'The tank burst; it did not topple.' },
    ],
  },
  {
    id: 'tacoma',
    alias: 'The bridge that danced',
    scene: 'USA, 1940. A slender new suspension bridge, open for four months, twists more and more wildly until the deck tears apart. A camera films it.',
    clues: [
      'The wind that day was steady at about 64 km/h: strong, but no hurricane.',
      'The deck was very thin, with solid sides.',
      'Once the twisting began, each cycle was bigger than the one before.',
    ],
    answer: 'A steady wind fed a growing twisting motion in a deck that was too slender',
    wrong: [
      { text: 'The cable steel was brittle and snapped first', no: 'This was not a material failure: the steel was sound. The shape of the deck was the problem.' },
      { text: 'Fatigue from decades of traffic', no: 'The bridge was four months old.' },
      { text: 'The wind was simply stronger than the bridge', no: 'A steady push of that size was well within its strength. The danger was the growing motion.' },
    ],
  },
  {
    id: 'liberty',
    alias: 'The ships that snapped',
    scene: 'The 1940s. Cargo ships are being built faster than ever before. Hundreds develop serious cracks, and one splits in half while tied up at the dock, in calm weather.',
    clues: [
      'The weather was calm, but cold.',
      'These were among the first hulls to be welded all over instead of riveted.',
      'Cracks often started at the square corners of hatches.',
    ],
    answer: 'Brittle fracture: cold steel, with cracks free to run through welded plates from sharp corners',
    wrong: [
      { text: 'Enemy torpedoes', no: 'One broke in two at its dock, far from any enemy.' },
      { text: 'Rust thinned the hulls', no: 'The ships were new.' },
      { text: 'Overloaded cargo slowly bent the hulls', no: 'They did not bend: they cracked suddenly.' },
    ],
  },
  {
    id: 'comet',
    alias: 'The first jet airliner',
    scene: '1954. The world’s first jet airliner has two crashes within three months. Both aircraft broke up at cruising height in clear air.',
    clues: [
      'Investigators put a whole fuselage in a water tank and pressurised it again and again.',
      'After about 3,000 cycles a crack grew from the corner of a cut-out near the windows.',
      'Every flight pressurises the cabin once: one stress cycle per flight.',
    ],
    answer: 'Metal fatigue from repeated pressurisation, starting at a cut-out corner',
    wrong: [
      { text: 'The skin was too weak to hold even one pressurisation', no: 'It held thousands. Repetition was the killer.' },
      { text: 'An engine exploded', no: 'The tank test reproduced the failure with no engines running.' },
      { text: 'Corrosion from sea air', no: 'The aircraft were only a couple of years old, and the tank test showed pressure cycles were enough.' },
    ],
  },
  {
    id: 'silver',
    alias: 'One link in the chain',
    scene: 'USA, 1967. At rush hour, a suspension bridge over the Ohio River collapses in under a minute.',
    clues: [
      'Instead of wire cables, the bridge hung from chains of long steel bars with an eye at each end.',
      'One eye had a crack only about 2.5 mm deep, in a spot that could not be inspected.',
      'When that one bar broke, nothing else could take over its load.',
    ],
    answer: 'A tiny corrosion-and-fatigue crack broke one bar, and there was no back-up load path',
    wrong: [
      { text: 'An overweight truck broke the deck', no: 'The deck fell because the chain above it let go.' },
      { text: 'Wind twisted the bridge apart', no: 'There was no unusual wind.' },
      { text: 'The towers’ foundations washed away', no: 'The failure began in the chain.' },
    ],
  },
  {
    id: 'flixborough',
    alias: 'The temporary pipe',
    scene: 'England, 1974. A huge cloud of flammable vapour escapes from a chemical plant and explodes. The site is destroyed.',
    clues: [
      'One of a row of reactors had been taken out for repair.',
      'A bypass pipe was made on site to bridge the gap, with no design calculations, and propped on scaffolding.',
      'Flexible bellows at each end let the pipe bend under pressure.',
    ],
    answer: 'A temporary bypass pipe, installed without engineering checks, buckled and tore',
    wrong: [
      { text: 'A reactor vessel corroded through', no: 'The leak came from the bypass, not from a vessel.' },
      { text: 'Lightning struck a storage tank', no: 'No lightning was involved.' },
      { text: 'The steel was brittle in cold weather', no: 'It was June, and the pipe buckled rather than snapped.' },
    ],
  },
  {
    id: 'hyatt',
    alias: 'The walkways above the dance floor',
    scene: 'USA, 1981. During a dance party in a hotel lobby, two walkways hanging one above the other fall onto the crowd.',
    clues: [
      'In the original design, both walkways hung from the same long rods running to the ceiling.',
      'During construction this was changed: the lower walkway now hung from the upper walkway on a second set of rods.',
      'The change was approved without anyone checking the numbers.',
    ],
    answer: 'A construction change made one connection carry both walkways: about twice the load',
    wrong: [
      { text: 'The dancers’ rhythm shook the walkways apart', no: 'People suspected this at first. But the connection was overloaded even standing still.' },
      { text: 'The steel rods were brittle', no: 'The rods did not snap. They pulled through the beams they were bolted to.' },
      { text: 'Corrosion from the lobby fountain', no: 'The hotel was about a year old.' },
    ],
  },
  {
    id: 'jal123',
    alias: 'The repair',
    scene: 'Japan, 1985. Twelve minutes after take-off a jumbo jet loses its tail fin and all its hydraulics.',
    clues: [
      'Seven years earlier the aircraft had scraped its tail on a runway.',
      'The rear pressure wall was repaired with a splice plate that was cut in two.',
      'So part of the joint was held by one row of rivets instead of two.',
    ],
    answer: 'Fatigue cracks grew at a wrongly made repair until the rear pressure wall burst',
    wrong: [
      { text: 'A bomb', no: 'No trace of explosives was found; the bulkhead showed fatigue cracks.' },
      { text: 'An engine broke up and cut the tail', no: 'The engines kept running to the end.' },
      { text: 'A design fault shared by every aircraft of the type', no: 'Only this aircraft had this repair.' },
    ],
  },
  {
    id: 'challenger',
    alias: 'The cold morning',
    scene: 'Florida, 1986. Seventy-three seconds after launch, a space shuttle breaks apart.',
    clues: [
      'It was about −2 °C at launch: the coldest shuttle launch so far.',
      'The solid rocket boosters were built in sections, and each joint was sealed by rubber O-rings.',
      'The night before, engineers had warned against launching in the cold. They were overruled.',
    ],
    answer: 'Cold-stiffened rubber seals did not spring back, and hot gas leaked through a booster joint',
    wrong: [
      { text: 'The fuel tank’s metal turned brittle in the cold', no: 'The tank was torn open only after hot gas escaped from the booster joint.' },
      { text: 'A main engine turbine burst', no: 'The main engines were working normally.' },
      { text: 'Falling ice holed the wing', no: 'Debris striking the wing doomed a different shuttle, 17 years later.' },
    ],
  },
  {
    id: 'aloha',
    alias: 'The convertible',
    scene: 'Hawaii, 1988. A large section of an airliner’s roof tears away in flight. Passengers sit in the open air. The pilots manage to land.',
    clues: [
      'The aircraft was 19 years old and had made about 89,000 flights, mostly short island hops.',
      'It lived in warm, salty, humid air.',
      'Investigators found many small cracks at neighbouring rivet holes along a skin joint.',
    ],
    answer: 'Corrosion weakened a skin joint, and many small fatigue cracks linked into one',
    wrong: [
      { text: 'A bomb in the cabin', no: 'There was no sign of an explosion.' },
      { text: 'One violent gust overloaded a sound fuselage', no: 'The flight was routine. The joint had been weakening for years.' },
      { text: 'A window blew out and the tear spread from it', no: 'The tear ran along a riveted skin joint.' },
    ],
  },
  {
    id: 'united232',
    alias: 'The flaw from 1971',
    scene: 'USA, 1989. The big fan disc of an airliner’s tail engine bursts in flight. Its pieces cut all three hydraulic systems.',
    clues: [
      'The disc was titanium, made in 1971.',
      'At the origin of the break was a tiny hard, brittle spot, rich in nitrogen, left from when the metal was melted.',
      'A crack had been growing from that spot for years, and inspections missed it.',
    ],
    answer: 'A fatigue crack grew from a hidden defect left in the titanium when it was made',
    wrong: [
      { text: 'A bird strike', no: 'The disc burst from within.' },
      { text: 'The engine was run too fast', no: 'It was at normal cruise power.' },
      { text: 'Corrosion of the disc', no: 'The origin was a melting defect inside the metal, not surface attack.' },
    ],
  },
  {
    id: 'sampoong',
    alias: 'The store that folded',
    scene: 'Seoul, 1995. A five-storey department store collapses in about 20 seconds on a busy afternoon.',
    clues: [
      'The building had been designed as offices, then changed into a store.',
      'Columns were made thinner, and some were removed to fit escalators.',
      'Heavy air-conditioning units were added on the roof. Cracks had been appearing for months.',
    ],
    answer: 'Overloaded, weakened columns punched through the floor slabs',
    wrong: [
      { text: 'An earthquake', no: 'There was none.' },
      { text: 'A gas explosion', no: 'The building simply came down, floor onto floor.' },
      { text: 'The ground under the building sank', no: 'The failure started high in the building, in the slabs around the columns.' },
    ],
  },
  {
    id: 'eschede',
    alias: 'The quiet wheel',
    scene: 'Germany, 1998. A high-speed train at about 200 km/h derails and hits a road bridge, which falls onto it.',
    clues: [
      'To make the ride quieter, the wheels had a steel tyre around a ring of rubber.',
      'The tyre flexed a little on every turn of the wheel.',
      'A crack had grown from the inside of the tyre, where it could not easily be seen.',
    ],
    answer: 'A fatigue crack grew in a steel wheel tyre that flexed on every turn',
    wrong: [
      { text: 'The rail buckled in summer heat', no: 'The track was sound until the broken tyre hit a set of points.' },
      { text: 'The bridge collapsed first', no: 'The derailed train knocked it down.' },
      { text: 'The brakes overheated and seized', no: 'The first thing to break was the wheel tyre.' },
    ],
  },
  {
    id: 'columbia',
    alias: 'The piece of foam',
    scene: 'Texas, 2003. A space shuttle breaks apart while returning through the atmosphere at the end of its mission.',
    clues: [
      'During launch, 16 days earlier, a briefcase-sized piece of insulating foam fell off the fuel tank.',
      'It struck the front edge of the wing, which was made of a carbon–carbon composite.',
      'Foam had fallen on earlier flights too, and had come to be treated as normal.',
    ],
    answer: 'Launch debris holed the wing’s heat shield, and hot gas got in during re-entry',
    wrong: [
      { text: 'A rubber seal failed in the cold', no: 'That was the other shuttle accident, in 1986.' },
      { text: 'The wing’s aluminium fatigued after many flights', no: 'The aluminium melted only after hot gas entered through the hole.' },
      { text: 'An engine failed on the way down', no: 'The shuttle glides home: its main engines are not running during re-entry.' },
    ],
  },
  {
    id: 'note7',
    alias: 'The phone that caught fire',
    scene: '2016. A new phone model starts catching fire. It is recalled, replaced, recalled again, and finally cancelled.',
    clues: [
      'The batteries came from two different suppliers, and both kinds failed.',
      'In one, the corner of the pouch squeezed the electrode layers. In the other, welding burrs poked into them.',
      'The separator between the electrodes of a lithium-ion cell is often under 20 µm thick.',
    ],
    answer: 'Short circuits inside the battery, where the electrodes touched through the separator',
    wrong: [
      { text: 'The charger pushed in too much current', no: 'The fault was inside the cells themselves, in two different ways.' },
      { text: 'The screen overheated', no: 'The fires started in the battery.' },
      { text: 'The metal case caught fire', no: 'The case does not burn; the cell’s contents do once it shorts.' },
    ],
  },
  {
    id: 'grenfell',
    alias: 'The fire that climbed',
    scene: 'London, 2017. A fridge catches fire in a flat on a low floor of a 24-storey tower. Within minutes, fire is racing up the outside of the building.',
    clues: [
      'The tower had recently been refurbished with new outer panels and insulation.',
      'The panels looked like metal: two thin aluminium skins. Between the skins was polyethylene.',
      'Behind the panels was an air gap running up the building.',
    ],
    answer: 'Cladding with a plastic core burned, and the gap behind it acted like a chimney',
    wrong: [
      { text: 'A gas main exploded', no: 'The fire began with a fridge and spread across the outside.' },
      { text: 'The concrete frame burned', no: 'Concrete does not burn; the frame was still standing afterwards.' },
      { text: 'The aluminium skins themselves were the main fuel', no: 'The polyethylene core between them was: it burns like candle wax.' },
    ],
  },
  {
    id: 'morandi',
    alias: 'The bridge with few stays',
    scene: 'Italy, 2018. In a rainstorm, a 200-metre section of a motorway bridge falls, with cars and trucks on it.',
    clues: [
      'The deck hung from only a few stays.',
      'Each stay was a bundle of steel cables cased in concrete.',
      'The steel inside the concrete could not easily be seen or inspected.',
    ],
    answer: 'Hidden corrosion of the steel stays, in a design with almost no back-up',
    wrong: [
      { text: 'Lightning cut a stay', no: 'Investigations pointed to long-term corrosion inside the casing.' },
      { text: 'An earthquake', no: 'There was none.' },
      { text: 'Wind made the deck twist apart', no: 'The deck fell when a stay gave way.' },
    ],
  },
];
