// Computer Science track: Graphics and Visual Computing. How a computer draws:
// pixels, lines, 3D geometry, light and curves. Written with mk(). Story
// claims are cited as [n], pointing at each class's `sources`.
import { mk, home, online } from '../um/make';

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;
const SCRATCHA = (ch, why, summary) => ['link', 'Scratchapixel (free graphics lessons)', ch, 'https://www.scratchapixel.com/', why, summary];

export default [
  mk({
    id: 'gfx-001',
    code: 'GFX 1',
    track: 'gfx',
    um: [],
    title: 'Pixels and Colour',
    subtitle: 'Young’s three receptors, Maxwell’s tartan ribbon, and Kirsch’s first digital photo',
    digest: [
      'A screen is a grid of pixels. Each pixel mixes red, green and blue light; three numbers from 0 to 255 make about 16.8 million colours.',
      'This works because human eyes have three kinds of colour receptors, so three well-chosen lights can fool them into seeing almost any colour.',
      'Images are just big tables of these numbers, which is why computers can edit, compress and generate them.',
    ],
    era: '1802 Young → 1861 Maxwell’s colour photograph → 1957 Kirsch’s scan',
    who: 'Thomas Young, James Clerk Maxwell & Russell Kirsch',
    hook: 'Your screen has no yellow light in it at all. So how does it show a yellow mango?',
    story: [
      'In 1802 Thomas Young proposed that the eye has just three kinds of colour-sensitive receptors; Hermann von Helmholtz later developed the idea, now the Young–Helmholtz theory [1].',
      'In 1861 James Clerk Maxwell showed the first colour photograph: a tartan ribbon photographed three times through red, green and blue filters and projected back together, with the photographer Thomas Sutton [2].',
      'In 1957 Russell Kirsch at the US National Bureau of Standards scanned a photo of his baby son into the SEAC computer: 176 × 176 pixels, one of the first digital images [3].',
    ],
    takeaway: 'Colour on screens = three numbers per pixel (R, G, B), mixed by adding light. Red + green light looks yellow.',
    viz: 'rgb_mix',
    vizTitle: 'Mixing Light: Red, Green, Blue',
    vizHow: 'Set the brightness of the red, green and blue sub-pixels. The big square is what your eye sees from a distance.',
    steps: [
      ['A pixel', '(R, G, B),\\ 0 \\le R, G, B \\le 255', 'One byte per channel.'],
      ['Colours', '256^3 = 16\\,777\\,216', '24-bit “true colour”.'],
      ['Additive mixing', '\\text{red} + \\text{green} = \\text{yellow}', 'Adding light, not mixing paint.'],
    ],
    drills: [
      ['What colour is (255, 255, 0)?', ['Yellow', 'Brown', 'Green', 'White'], 'Red light + green light.', 'Additive.', 'Yellow.'],
      ['How many colours does 24-bit colour allow?', ['16,777,216', '256', '65,536', '24'], '256³.', '2²⁴.', '16,777,216.'],
      ['How big was Kirsch’s 1957 image?', ['176 × 176 pixels', '1920 × 1080', '8 × 8', '1,000 × 1,000'], 'SEAC.', 'Small.', '176 × 176.'],
    ],
    boss: [
      'Paint versus light',
      'Mixing red and green paint gives a muddy brown, but red and green light give yellow. Why the difference?',
      ['Light adds wavelengths; paint absorbs them (subtractive)', 'Screens are magic', 'Paint is lower quality', 'They give the same colour'],
      'What does each pigment do to white light?',
      'Each pigment removes part of the light; two pigments remove more and little is left. Screens add light, so the eye’s red and green receptors both fire, which it reads as yellow.',
    ],
    read: [
      ['wiki', 'RGB color model', 'How screens make colour.', 'An additive colour model in which red, green and blue light are combined in various intensities. Usually 8 bits per channel, written as hex like #FFD700.'],
      ['wiki', 'Trichromacy', 'Why three colours are enough for us.', 'Humans have three types of cone cells, most sensitive to long, medium and short wavelengths. Any colour sensation is a mix of their three responses.'],
    ],
    sources: [
      ['Wikipedia: Young–Helmholtz theory', W('Young%E2%80%93Helmholtz_theory'), 'Young 1802; Helmholtz'],
      ['Wikipedia: Tartan Ribbon', W('Tartan_Ribbon'), 'Maxwell and Sutton, 1861'],
      ['Wikipedia: Russell A. Kirsch', W('Russell_A._Kirsch'), 'SEAC scan, 1957, 176 × 176'],
    ],
    labs: [
      online('Any colour picker (search “color picker” in a browser)', 'https://www.google.com/search?q=color+picker', 'Find the RGB numbers of the Philippine flag’s blue, red and yellow.'),
      home('Look at a phone or TV screen through a magnifying glass or a drop of water. Can you see the red, green and blue sub-pixels?'),
    ],
    quiz: [
      ['Who showed the first colour photograph in 1861?', ['James Clerk Maxwell', 'Thomas Young', 'Louis Daguerre', 'Russell Kirsch'], 'A tartan ribbon.'],
      ['What hex code is pure red?', ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF'], 'FF = 255.'],
    ],
    gloss: [
      ['Pixel', 'One dot of a digital image, with a colour value.', ['picture element']],
      ['RGB', 'Describing colour by red, green and blue light intensities.', ['hex colour']],
      ['Additive colour', 'Colour made by adding light; all three at full give white.', ['subtractive colour']],
    ],
    events: [
      [1861, 'Maxwell’s colour photo', 'Three filters, one image.', false],
      [1957, 'First digital photo', 'Kirsch’s 176 × 176 scan.', false],
    ],
  }),

  mk({
    id: 'gfx-002',
    code: 'GFX 2',
    track: 'gfx',
    um: [],
    title: 'Drawing a Line on a Grid',
    subtitle: 'Bresenham’s algorithm: straight lines with only adding and comparing',
    digest: [
      'A screen can only light whole pixels. To draw a line, the computer must choose which pixels best follow the true line.',
      'Bresenham’s 1962 algorithm steps along x one pixel at a time and keeps a running error, deciding up or not using only whole-number addition.',
      'Antialiasing then shades edge pixels partly, so lines look smooth instead of jagged.',
    ],
    era: '1962 Bresenham → 1965 publication → 1991 Wu’s antialiased lines',
    who: 'Jack Bresenham & Xiaolin Wu',
    hook: 'A line from one corner of your screen to a point slightly above the other: which pixels light up?',
    story: [
      'In 1962 Jack Bresenham, working at IBM, needed to drive a pen plotter that could only step in small fixed moves. He devised a way to choose the steps for a straight line using only integer addition, subtraction and comparison, and published it in 1965 [1].',
      'Because it avoids multiplication and fractions, the method was fast on the hardware of the time and is still built into graphics systems [1].',
      'Jagged edges, called aliasing, bothered designers. In 1991 Xiaolin Wu published a fast way to draw antialiased lines by sharing each point’s brightness between the two nearest pixels [2].',
    ],
    takeaway: 'Step along the long axis; keep an error term; step the short axis when the error passes one half.',
    viz: 'bresenham_line',
    vizTitle: 'Bresenham’s Line, Pixel by Pixel',
    vizHow: 'Choose the end point. The algorithm lights one pixel per column, stepping up when the running error says the true line has moved closer to the next row.',
    steps: [
      ['Slope', 'm = \\dfrac{\\Delta y}{\\Delta x} \\le 1', 'The first octant: shallow lines.'],
      ['Error term', 'e \\leftarrow e + 2\\Delta y', 'Doubled to stay in whole numbers.'],
      ['Step up', '\\text{if } e > \\Delta x:\\ y \\leftarrow y+1,\\ e \\leftarrow e - 2\\Delta x', 'The line is now closer to the next row.'],
    ],
    drills: [
      ['How many pixels does Bresenham light for a shallow line from x = 0 to x = 10?', ['11', '10', '20', '5'], 'One per column.', 'Columns 0 to 10.', '11.'],
      ['Why did Bresenham avoid fractions?', ['Integer adding was much faster on 1960s hardware', 'Fractions are wrong', 'Plotters cannot store fractions in memory at all', 'For fun'], 'Speed.', 'Whole numbers only.', 'Speed with integers.'],
      ['What is aliasing in graphics?', ['Jagged staircase edges from whole pixels', 'Using two names', 'Colour blindness', 'Blurred photos'], 'Stairs.', 'Sampling on a grid.', 'Jagged edges.'],
    ],
    boss: [
      'Steep lines',
      'For a steep line (slope above 1), stepping along x would leave gaps. What does Bresenham do instead?',
      ['Swap roles: step along y one row at a time and decide when to step x', 'Draw it twice', 'Skip it', 'Use fractions'],
      'One pixel per step on the longer axis.',
      'The long axis gets one pixel per step, so there are never gaps. The same rule works in all eight directions by symmetry.',
    ],
    read: [
      ['wiki', 'Bresenham’s line algorithm', 'The method, derivation and code.', 'An algorithm that selects the pixels closest to a straight line using only integer arithmetic, by tracking the accumulated error between the line and the chosen pixels.'],
      ['wiki', 'Spatial anti-aliasing', 'Why edges look jagged and how to smooth them.', 'Sampling a continuous shape on a pixel grid causes stair-steps. Shading edge pixels by how much the shape covers them, or sampling several points per pixel, smooths them.'],
    ],
    sources: [
      ['Wikipedia: Bresenham’s line algorithm', W('Bresenham%27s_line_algorithm'), 'IBM, 1962; published 1965; integer arithmetic'],
      ['Wikipedia: Xiaolin Wu’s line algorithm', W('Xiaolin_Wu%27s_line_algorithm'), '1991 antialiased lines'],
    ],
    labs: [
      online('Python Tutor', 'https://pythontutor.com/', 'Type in the Bresenham loop from the Learn it part and step through it for a line to (8, 3). Write down each pixel.'),
      home('On graph paper, draw a line from (0, 0) to (10, 4) with a ruler, then shade one square per column that the line passes closest to.'),
    ],
    quiz: [
      ['Where did Bresenham work when he created his algorithm?', ['IBM', 'Bell Labs', 'Xerox PARC', 'MIT'], '1962.'],
      ['What kind of device first used it?', ['A pen plotter', 'A phone screen', 'A laser printer', 'A VR headset'], 'Small fixed steps.'],
    ],
    gloss: [
      ['Rasterisation', 'Turning shapes into pixels.', ['raster']],
      ['Bresenham’s algorithm', 'Drawing lines on a pixel grid with integer arithmetic.', []],
      ['Antialiasing', 'Softening jagged edges by partially shading edge pixels.', ['aliasing']],
    ],
    events: [
      [1962, 'Bresenham’s line', 'Integer line drawing.', false],
      [1991, 'Wu’s antialiased lines', 'Smooth edges, fast.', false],
    ],
  }),

  mk({
    id: 'gfx-003',
    code: 'GFX 3',
    track: 'gfx',
    um: [],
    title: 'Moving Shapes with Matrices',
    subtitle: 'Sketchpad, homogeneous coordinates, and rotate–scale–move',
    digest: [
      'Every shape on screen is a list of points. Moving, turning and resizing it means doing the same calculation to every point.',
      'Rotation and scaling are matrix multiplications (math-027). Adding a third coordinate, always 1, lets moving be a matrix too.',
      'Then any sequence of moves combines into one matrix, which graphics cards apply to millions of points at once.',
    ],
    era: '1827 Möbius → 1963 Sketchpad and Roberts → today’s GPUs',
    who: 'August Möbius, Ivan Sutherland & Larry Roberts',
    hook: 'A game character turns, grows and walks at the same time. How does the computer move every point of it at once?',
    story: [
      'In 1827 the mathematician August Möbius introduced homogeneous coordinates, giving each point an extra number so that geometry at infinity could be handled [1].',
      'In 1963 Ivan Sutherland’s MIT PhD project Sketchpad let people draw on a screen with a light pen and then move, rotate and resize the drawings; it is often called the first graphical user interface and earned him the 1988 Turing Award [2].',
      'The same year Larry Roberts, also at MIT, used homogeneous coordinates and matrices for 3D graphics and perspective in his thesis on machine perception of solids [3]. Graphics hardware has worked this way ever since [1].',
    ],
    takeaway: 'Points times matrices: rotate, scale and translate with 3 × 3 matrices in 2D (4 × 4 in 3D), and multiply them to combine.',
    viz: 'transform2d',
    vizTitle: 'Rotate, Scale, Move',
    vizHow: 'A house shape. Change the angle, the scale and the shift. The matrix on the right is applied to every corner.',
    steps: [
      ['Rotate by θ', '\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}', 'Turns every point about the origin.'],
      ['Homogeneous move', '\\begin{pmatrix} 1 & 0 & t_x \\\\ 0 & 1 & t_y \\\\ 0 & 0 & 1 \\end{pmatrix}', 'A third coordinate of 1 makes moving a multiplication.'],
      ['Combine', 'M = T\\,R\\,S', 'Applied right to left: scale, then rotate, then move.'],
    ],
    drills: [
      ['Rotating the point (1, 0) by 90° gives …', ['(0, 1)', '(1, 1)', '(−1, 0)', '(0, −1)'], 'Counter-clockwise.', 'cos 90° = 0, sin 90° = 1.', '(0, 1).'],
      ['Why add a third coordinate equal to 1?', ['So moving (translation) is a matrix multiplication too', 'For colour', 'To make it 3D', 'It is a mistake'], 'Homogeneous.', 'Then all moves combine.', 'Translation as a matrix.'],
      ['Who built Sketchpad in 1963?', ['Ivan Sutherland', 'Douglas Engelbart', 'Alan Kay', 'Steve Jobs'], 'MIT PhD.', 'Turing Award 1988.', 'Ivan Sutherland.'],
    ],
    boss: [
      'Order matters',
      'Rotate then move, or move then rotate: do you end up in the same place?',
      ['No: rotating after moving swings the shape around the origin', 'Yes, always', 'Only for squares', 'Only in 3D'],
      'Matrix multiplication is not commutative.',
      'Rotation turns about the origin, so a shape already moved away swings in a big arc. That is why the order T R S is chosen with care.',
    ],
    read: [
      ['wiki', 'Transformation matrix', 'Rotation, scaling and translation as matrices.', 'Linear transformations of points are matrix multiplications. With homogeneous coordinates, translation and perspective also become matrices, so sequences of transformations compose by multiplication.'],
      SCRATCHA('Geometry: points, vectors and matrices', 'A careful free introduction for graphics.', 'Covers coordinate systems, how 4 × 4 matrices encode rotation, scale and translation, row versus column conventions, and how transforms combine.'),
    ],
    sources: [
      ['Wikipedia: Homogeneous coordinates', W('Homogeneous_coordinates'), 'Möbius, 1827; use in graphics'],
      ['Wikipedia: Sketchpad', W('Sketchpad'), 'Sutherland, 1963; Turing Award 1988'],
      ['Wikipedia: Lawrence Roberts (scientist)', W('Lawrence_Roberts_(scientist)'), '1963 thesis; homogeneous coordinates in 3D graphics'],
    ],
    labs: [
      online('GeoGebra (free)', 'https://www.geogebra.org/classic', 'Draw a triangle, then apply Rotate by 45° and Dilate by 2. Check the new corners against the matrix formulas.'),
      home('Draw a small house on graph paper with corners at whole numbers. Rotate each corner by 90° using (x, y) → (−y, x). Redraw it.'),
    ],
    quiz: [
      ['Who introduced homogeneous coordinates?', ['August Möbius', 'René Descartes', 'Ivan Sutherland', 'Carl Gauss'], '1827.'],
      ['What size matrices move points in 3D graphics?', ['4 × 4', '3 × 3', '2 × 2', '5 × 5'], 'One extra coordinate.'],
    ],
    gloss: [
      ['Transformation matrix', 'A matrix that rotates, scales, moves or projects points.', []],
      ['Homogeneous coordinates', 'Adding an extra coordinate so translation and perspective are matrix products.', []],
    ],
    events: [
      [1827, 'Homogeneous coordinates', 'Möbius.', false],
      [1963, 'Sketchpad', 'Drawing and moving shapes on screen.', false],
    ],
  }),

  mk({
    id: 'gfx-004',
    code: 'GFX 4',
    track: 'gfx',
    um: [],
    title: 'Perspective: From Brunelleschi to the Camera',
    subtitle: 'Why far things look small, and the one division that makes 3D',
    digest: [
      'A camera, an eye or a 3D game all project the world onto a flat image. A point at depth z appears at x′ = f·x / z.',
      'Dividing by depth is what makes far things small and parallel rails meet at a vanishing point.',
      'Renaissance painters worked this out by experiment and geometry five centuries before computers.',
    ],
    era: 'c. 1415 Brunelleschi → 1435 Alberti → 1525 Dürer → 1963 Roberts',
    who: 'Filippo Brunelleschi, Leon Battista Alberti & Albrecht Dürer',
    hook: 'Railway tracks are parallel. Why do they seem to meet in the distance?',
    story: [
      'Around 1415 the Florentine architect Filippo Brunelleschi painted the Baptistery on a panel and had viewers compare it, through a hole in the panel and a mirror, with the real building; the geometry matched [1].',
      'In 1435 Leon Battista Alberti wrote On Painting (De pictura), the first written method for drawing in perspective, with a vanishing point where parallel lines meet [1].',
      'In 1525 Albrecht Dürer published woodcuts of drawing machines: a string from the eye to each point of an object, marking where it crosses a frame, exactly the projection computers do [2]. Larry Roberts put this into matrices for computer graphics in 1963 [3].',
    ],
    takeaway: 'Perspective projection: x′ = f x / z, y′ = f y / z. Twice as far looks half as big.',
    viz: 'perspective_cube',
    vizTitle: 'A Cube Through a Pinhole',
    vizHow: 'Move the cube nearer or farther and change the focal length. The front face is drawn bright, the back face dim.',
    steps: [
      ['Projection', 'x\' = \\dfrac{f\\,x}{z},\\quad y\' = \\dfrac{f\\,y}{z}', 'Similar triangles from the eye.'],
      ['Size', '\\text{size on screen} \\propto 1/z', 'Double the distance, half the size.'],
      ['Vanishing point', 'z \\to \\infty \\Rightarrow (x\', y\') \\to \\text{one point}', 'Parallel lines meet.'],
    ],
    drills: [
      ['A pole 2 m tall at 10 m, focal length 1. Image height?', ['0.2', '20', '2', '0.02'], 'f h / z.', '2 / 10.', '0.2.'],
      ['Move it to 20 m. Image height?', ['0.1', '0.2', '0.4', '2'], 'Twice as far.', 'Half as big.', '0.1.'],
      ['Who wrote the first perspective method, in 1435?', ['Leon Battista Alberti', 'Brunelleschi', 'Dürer', 'Leonardo'], 'De pictura.', 'On Painting.', 'Alberti.'],
    ],
    boss: [
      'Zooming versus walking closer',
      'A photographer can make a building fill the frame by zooming (bigger f) or walking closer (smaller z). Do the two photos look the same?',
      ['No: walking closer changes the relative sizes of near and far parts; zooming does not', 'Yes, exactly', 'Zooming adds colour', 'Walking closer makes it smaller'],
      'f scales everything equally; z differs across the building.',
      'Zooming multiplies every x′ by the same factor. Walking closer changes each part’s z by a different ratio, so the near parts grow faster: the perspective itself changes.',
    ],
    read: [
      ['wiki', '3D projection', 'Perspective and orthographic projection.', 'Perspective projection divides by depth so distant objects shrink; orthographic projection drops depth, keeping sizes. Graphics pipelines use a 4 × 4 projection matrix followed by a divide.'],
      ['wiki', 'Perspective (graphical)', 'The art history: Brunelleschi, Alberti, Dürer.', 'Linear perspective represents depth with converging lines toward vanishing points; developed in early Renaissance Florence and spread through treatises.'],
    ],
    sources: [
      ['Wikipedia: Perspective (graphical)', W('Perspective_(graphical)'), 'Brunelleschi c. 1415; Alberti 1435'],
      ['Wikipedia: Albrecht Dürer', W('Albrecht_D%C3%BCrer'), '1525 treatise on measurement with perspective machines'],
      ['Wikipedia: Lawrence Roberts (scientist)', W('Lawrence_Roberts_(scientist)'), 'perspective with matrices, 1963'],
    ],
    labs: [
      online('Phone camera', 'https://en.wikipedia.org/wiki/Perspective_distortion', 'Take two photos of a friend: one close with wide zoom, one far with full zoom, face the same size. Compare the nose and ears.'),
      home('Stand on a long straight road or corridor. Hold a ruler at arm’s length and measure how the width shrinks with distance.'),
    ],
    quiz: [
      ['In what year did Dürer publish his perspective machines?', ['1525', '1435', '1415', '1963'], 'Woodcuts.'],
      ['What does a projection divide by?', ['Depth z', 'Width', 'Colour', 'Time'], 'Similar triangles.'],
    ],
    gloss: [
      ['Perspective projection', 'Mapping 3D points to an image by dividing by depth.', ['projection']],
      ['Vanishing point', 'The point where parallel lines appear to meet in a perspective image.', []],
      ['Focal length', 'The distance from the pinhole or lens to the image plane, setting the zoom.', []],
    ],
    events: [
      [1435, 'De pictura', 'Perspective written down.', false],
      [1525, 'Dürer’s machines', 'Projection by string.', false],
    ],
  }),

  mk({
    id: 'gfx-005',
    code: 'GFX 5',
    track: 'gfx',
    um: [],
    title: 'Triangles and the Z-Buffer',
    subtitle: 'The Utah teapot, Ed Catmull, and how games decide what is in front',
    digest: [
      'Games and films build surfaces from triangles: simple, always flat, and easy to fill with pixels.',
      'When triangles overlap, the nearer one must win. The z-buffer stores, for every pixel, the depth of the nearest thing drawn so far, and only draws over it if the new thing is nearer.',
      'This lets triangles be drawn in any order, which is exactly what graphics cards do, billions per second.',
    ],
    era: '1974 Catmull’s z-buffer → 1975 Utah teapot → 1995 Toy Story',
    who: 'Ed Catmull, Martin Newell & the University of Utah graphics group',
    hook: 'A game draws a tree, then the hill behind it. Why doesn’t the hill cover the tree?',
    story: [
      'The University of Utah was a centre of computer graphics in the late 1960s and 1970s, led by David Evans and Ivan Sutherland [1].',
      'In his 1974 PhD thesis there, Ed Catmull described the z-buffer (Wolfgang Straßer described it independently the same year) [2]. In 1975 Martin Newell modelled his teapot for tests; the Utah teapot is still the standard test object of graphics [3].',
      'Catmull went on to co-found Pixar, which released Toy Story, the first entirely computer-animated feature film, in 1995 [4]. He and Pat Hanrahan received the 2019 Turing Award for contributions to 3D graphics [4].',
    ],
    takeaway: 'For each pixel keep the nearest depth so far; draw a new fragment only if it is nearer. Order no longer matters.',
    viz: 'zbuffer',
    vizTitle: 'Who Is in Front? The Z-Buffer',
    vizHow: 'Two triangles: red is near, blue is far. Change the drawing order and switch the z-buffer on and off.',
    steps: [
      ['Fill', '\\text{each triangle} \\to \\text{pixels (fragments)}', 'Every pixel inside gets a colour and a depth.'],
      ['Depth test', '\\text{if } z_{new} < z_{buf}:\\ \\text{draw},\\ z_{buf} \\leftarrow z_{new}', 'Smaller z is nearer.'],
      ['Any order', '\\text{result does not depend on order}', 'Unlike painting back to front.'],
    ],
    drills: [
      ['What does the z-buffer store for each pixel?', ['The depth of the nearest surface drawn so far', 'Its colour only', 'Its brightness', 'Nothing'], 'z = depth.', 'One number per pixel.', 'Nearest depth.'],
      ['Without a z-buffer, drawing far then near works. What goes wrong drawing near then far?', ['The far object covers the near one', 'Nothing', 'Both vanish', 'Colours swap'], 'Later wins.', 'The painter’s problem.', 'Far covers near.'],
      ['Who described the z-buffer in his 1974 thesis?', ['Ed Catmull', 'Martin Newell', 'Ivan Sutherland', 'John Lasseter'], 'Utah, later Pixar.', 'Turing Award 2019.', 'Ed Catmull.'],
    ],
    boss: [
      'Why triangles?',
      'Why do graphics cards draw everything with triangles rather than squares or curved patches?',
      ['Three points always lie on one flat plane, so filling and depth are simple and exact', 'Triangles look nicer', 'Squares are patented', 'Tradition only'],
      'Can four points fail to be flat?',
      'Any three points define a plane, so depth varies linearly across a triangle and is easy to compute for each pixel. Any shape can be approximated with enough triangles.',
    ],
    read: [
      ['wiki', 'Z-buffering', 'The depth buffer and its quirks.', 'A per-pixel store of the nearest depth so far. New fragments pass the depth test only if nearer. Limited precision can cause “z-fighting” between nearly coplanar surfaces.'],
      SCRATCHA('Rasterization: a practical implementation', 'Build a tiny rasteriser step by step.', 'Projects triangle vertices, tests which pixels fall inside using edge functions, interpolates depth across the triangle, and uses a depth buffer to resolve visibility.'),
    ],
    sources: [
      ['Wikipedia: University of Utah School of Computing', W('University_of_Utah_School_of_Computing'), 'Evans and Sutherland; graphics centre'],
      ['Wikipedia: Z-buffering', W('Z-buffering'), 'Catmull 1974; Straßer 1974'],
      ['Wikipedia: Utah teapot', W('Utah_teapot'), 'Martin Newell, 1975'],
      ['Wikipedia: Edwin Catmull', W('Edwin_Catmull'), 'Pixar; Toy Story 1995; Turing Award 2019 with Hanrahan'],
    ],
    labs: [
      online('Three.js editor (free, in the browser)', 'https://threejs.org/editor/', 'Add a box and a sphere that overlap. Rotate the camera and see the depth test decide what is visible.'),
      home('Cut two paper triangles of different colours. Write a “depth” on each. Lay them down in both orders, letting the smaller depth win each time.'),
    ],
    quiz: [
      ['Who modelled the Utah teapot?', ['Martin Newell', 'Ed Catmull', 'Pixar', 'Ivan Sutherland'], '1975.'],
      ['What was the first fully computer-animated feature film?', ['Toy Story (1995)', 'Tron (1982)', 'Shrek (2001)', 'Avatar (2009)'], 'Pixar.'],
    ],
    gloss: [
      ['Z-buffer', 'A per-pixel record of the nearest depth drawn, used to decide visibility.', ['depth buffer']],
      ['Rasterisation', 'Converting triangles into pixels.', ['fragment']],
      ['Mesh', 'A surface made of many triangles.', ['polygon']],
    ],
    events: [
      [1974, 'Z-buffer', 'Catmull’s thesis.', false],
      [1975, 'Utah teapot', 'The standard test object.', false],
      [1995, 'Toy Story', 'First fully computer-animated feature.', false],
    ],
  }),

  mk({
    id: 'gfx-006',
    code: 'GFX 6',
    track: 'gfx',
    um: [],
    title: 'Light and Shading',
    subtitle: 'Lambert’s cosine law, Gouraud and Phong',
    digest: [
      'A surface facing a light is bright; one turned away is dark. Lambert’s cosine law says brightness is proportional to the cosine of the angle between the surface normal and the light.',
      'In vector terms that is a dot product: I = max(0, n · l). One multiplication per pixel gives a convincing 3D look.',
      'Shiny highlights come from Phong’s model, which adds a bright spot where light reflects toward the eye.',
    ],
    era: '1760 Lambert → 1971 Gouraud → 1975 Phong',
    who: 'Johann Heinrich Lambert, Henri Gouraud & Bui Tuong Phong',
    hook: 'A flat circle on screen suddenly looks like a ball. What did the shading change?',
    story: [
      'In his 1760 book Photometria, the Swiss scientist Johann Heinrich Lambert set out the cosine law: the light falling on a surface is proportional to the cosine of the angle of incidence [1].',
      'In 1971 Henri Gouraud at the University of Utah computed lighting at the corners of each triangle and blended the colours across it, making faceted models look smooth [2].',
      'In 1975 Bui Tuong Phong, a Vietnamese-born researcher at Utah, blended the surface normals instead and added a specular highlight term; the Phong model is still taught everywhere [3]. Phong died the same year, aged 32 [3].',
    ],
    takeaway: 'Diffuse brightness = max(0, n · l). Add a specular term (r · v)ˢ for shine.',
    viz: 'lambert_shading',
    vizTitle: 'Turning a Circle into a Ball',
    vizHow: 'Move the light around. Each patch of the ball is shaded by the dot product of its normal with the light direction. Add a highlight.',
    steps: [
      ['Normal', '\\mathbf n', 'A unit vector pointing out of the surface.'],
      ['Diffuse', 'I_d = \\max(0,\\ \\mathbf n \\cdot \\mathbf l)', 'Lambert’s cosine law.'],
      ['Specular', 'I_s = \\big(\\max(0,\\ \\mathbf r \\cdot \\mathbf v)\\big)^{s}', 'Phong: a highlight where reflection meets the eye.'],
    ],
    drills: [
      ['A surface faces the light directly. n · l = ?', ['1', '0', '−1', '0.5'], 'Angle 0.', 'cos 0°.', '1.'],
      ['The light comes at 60° from the normal. Brightness factor?', ['0.5', '0.87', '1', '0'], 'cos 60°.', 'One half.', '0.5.'],
      ['Who added the specular highlight model in 1975?', ['Bui Tuong Phong', 'Henri Gouraud', 'Lambert', 'Ed Catmull'], 'Utah.', 'Phong model.', 'Bui Tuong Phong.'],
    ],
    boss: [
      'Why max(0, …)?',
      'Why does the formula use max(0, n · l) rather than n · l itself?',
      ['A surface facing away from the light gets no light, not “negative light”', 'To make it faster', 'Because cosines are always positive', 'It is optional'],
      'What is n · l on the dark side?',
      'Facing away gives a negative dot product. Light cannot be negative, so it is clipped to 0: the shadowed side.',
    ],
    read: [
      ['wiki', 'Lambertian reflectance', 'Matte surfaces and the cosine law.', 'An ideal matte surface looks equally bright from all viewing directions; its brightness depends only on the cosine of the angle between the normal and the light.'],
      ['wiki', 'Phong reflection model', 'Ambient, diffuse and specular terms.', 'Models a surface as the sum of ambient light, Lambertian diffuse reflection, and a specular highlight whose sharpness is set by a shininess exponent.'],
    ],
    sources: [
      ['Wikipedia: Lambert’s cosine law', W('Lambert%27s_cosine_law'), 'Photometria, 1760'],
      ['Wikipedia: Gouraud shading', W('Gouraud_shading'), 'Henri Gouraud, 1971'],
      ['Wikipedia: Bui Tuong Phong', W('Bui_Tuong_Phong'), '1975 model; died 1975 aged 32'],
    ],
    labs: [
      online('Shadertoy (free, in the browser)', 'https://www.shadertoy.com/', 'Open any “sphere lighting” example and change the light direction vector. Watch the bright side move.'),
      home('Shine a phone torch on a ball in a dark room from different angles. Where is it brightest? Where is the shiny spot?'),
    ],
    quiz: [
      ['In what book did Lambert state the cosine law?', ['Photometria', 'Principia', 'De pictura', 'Opticks'], '1760.'],
      ['What did Gouraud shading interpolate across a triangle?', ['Colours computed at the corners', 'Normals', 'Textures', 'Shadows'], '1971.'],
    ],
    gloss: [
      ['Normal vector', 'A unit vector perpendicular to a surface.', ['normal']],
      ['Diffuse reflection', 'Matte light spread in all directions, following Lambert’s law.', []],
      ['Specular highlight', 'The bright spot of light reflected toward the viewer from a shiny surface.', []],
    ],
    events: [
      [1760, 'Lambert’s Photometria', 'The cosine law.', false],
      [1975, 'Phong shading', 'Highlights.', false],
    ],
  }),

  mk({
    id: 'gfx-007',
    code: 'GFX 7',
    track: 'gfx',
    um: [],
    title: 'Ray Tracing',
    subtitle: 'Appel’s rays, Whitted’s reflections, and real-time light in games',
    digest: [
      'Ray tracing works backwards from the eye: for each pixel, send a ray into the scene and find the first thing it hits.',
      'From that point, send more rays: to the light (is it in shadow?), and along reflections and refractions.',
      'It gives realistic shadows and reflections naturally, at the cost of a lot of computation, which GPUs can now do in real time.',
    ],
    era: '1968 Appel → 1980 Whitted → 1986 Kajiya → 2018 real-time ray tracing',
    who: 'Arthur Appel, Turner Whitted & Jim Kajiya',
    hook: 'How does a film computer know that the floor under a ball should be in shadow?',
    story: [
      'In 1968 Arthur Appel at IBM described ray casting: shooting a ray from the eye through each point of the image to find visible surfaces, and toward the light to find shadows [1].',
      'In 1980 Turner Whitted at Bell Labs made it recursive: when a ray hits a mirror or glass, trace new reflected and refracted rays. His images of shiny and glass spheres took over an hour each [2].',
      'In 1986 Jim Kajiya wrote down the rendering equation, which describes all light bouncing in a scene; path tracing solves it by averaging many random rays [3]. In 2018 NVIDIA’s RTX graphics cards added hardware to trace rays in real time for games [4].',
    ],
    takeaway: 'For each pixel: cast a ray, find the nearest hit, ask the light (shadow ray), and recurse for mirrors.',
    viz: 'ray_trace',
    vizTitle: 'Rays from the Eye',
    vizHow: 'Rays go from the eye through each pixel of the screen. Hits on the ball are shaded; floor hits check a shadow ray to the light.',
    steps: [
      ['Primary ray', '\\mathbf p(t) = \\mathbf e + t\\,\\mathbf d', 'From the eye e in direction d.'],
      ['Hit a sphere', '|\\mathbf p(t) - \\mathbf c|^2 = r^2', 'A quadratic in t; the smaller positive root is the nearest hit.'],
      ['Shadow ray', '\\text{hit} \\to \\text{light: blocked?}', 'If something is in the way, the point is in shadow.'],
    ],
    drills: [
      ['Which way do ray tracers trace rays?', ['From the eye into the scene', 'From every light in every direction', 'From the screen backwards to the light only', 'Randomly'], 'Backwards from reality.', 'Only rays that reach the eye matter.', 'From the eye.'],
      ['What does a shadow ray check?', ['Whether anything blocks the path from the hit point to the light', 'The colour of the sky', 'The pixel’s position', 'Nothing'], 'Light visible?', 'Blocked means shadow.', 'Blockers between point and light.'],
      ['Who made ray tracing recursive with reflections in 1980?', ['Turner Whitted', 'Arthur Appel', 'Jim Kajiya', 'Ed Catmull'], 'Bell Labs.', 'Shiny spheres.', 'Turner Whitted.'],
    ],
    boss: [
      'Why trace backwards?',
      'Real light travels from lamps to eyes. Why do ray tracers start at the eye instead?',
      ['Almost all light from a lamp never reaches the eye; tracing from the eye only computes rays that matter', 'It is more accurate physically', 'Light travels both ways at once', 'Lamps are hard to model'],
      'How many lamp rays hit a small camera?',
      'Of the trillions of rays a lamp sends, a tiny fraction enters the camera. Starting at the eye wastes nothing; the shadow ray then checks the light.',
    ],
    read: [
      ['link', 'Peter Shirley', 'Ray Tracing in One Weekend (free book)', 'https://raytracing.github.io/', 'Write your own ray tracer in a weekend.', 'Builds a ray tracer from scratch: rays, spheres, surface normals, antialiasing, diffuse, metal and glass materials, and a camera, ending with a scene of many spheres.'],
      ['wiki', 'Ray tracing (graphics)', 'History and methods.', 'Rendering by tracing rays from the camera, finding intersections, and computing shading with shadow, reflection and refraction rays; path tracing extends it with random bounces.'],
    ],
    sources: [
      ['Wikipedia: Ray casting', W('Ray_casting'), 'Arthur Appel, IBM, 1968'],
      ['Wikipedia: Ray tracing (graphics)', W('Ray_tracing_(graphics)'), 'Whitted 1980 recursive ray tracing'],
      ['Wikipedia: Rendering equation', W('Rendering_equation'), 'Kajiya, 1986'],
      ['Wikipedia: Nvidia RTX', W('Nvidia_RTX'), '2018 real-time ray tracing hardware'],
    ],
    labs: [
      online('Ray Tracing in One Weekend', 'https://raytracing.github.io/', 'Follow chapters 1–6 in Python or C++ and render a sphere with surface normals as colours.'),
      home('In a dark room, put a ball on a table and a torch to one side. Trace with string from your eye to the floor next to the ball, then from that spot to the torch: does the ball block it?'),
    ],
    quiz: [
      ['Who wrote down the rendering equation in 1986?', ['Jim Kajiya', 'Turner Whitted', 'Arthur Appel', 'Pat Hanrahan'], 'All light in a scene.'],
      ['When did game GPUs add real-time ray tracing hardware?', ['2018', '1995', '2008', '1980'], 'NVIDIA RTX.'],
    ],
    gloss: [
      ['Ray tracing', 'Rendering by following rays from the eye through each pixel into the scene.', ['ray casting', 'path tracing']],
      ['Shadow ray', 'A ray from a surface point to a light, testing whether the point is lit.', []],
    ],
    events: [
      [1968, 'Ray casting', 'Appel at IBM.', false],
      [1980, 'Recursive ray tracing', 'Whitted’s shiny spheres.', false],
      [2018, 'Real-time ray tracing', 'GPUs trace rays for games.', false],
    ],
  }),

  mk({
    id: 'gfx-008',
    code: 'GFX 8',
    track: 'gfx',
    um: [],
    title: 'Curves and Animation',
    subtitle: 'De Casteljau and Bézier at the car factories, and the frames of Toy Story',
    digest: [
      'Smooth curves in fonts, logos and car bodies are Bézier curves: a few control points pull the curve into shape.',
      'De Casteljau’s algorithm draws them by repeated in-between points (linear interpolation), which is easy to compute and to understand.',
      'Animation uses the same idea in time: artists set key poses, and the computer interpolates the frames in between.',
    ],
    era: '1959 de Casteljau at Citroën → 1962 Bézier at Renault → 1995 Toy Story',
    who: 'Paul de Casteljau, Pierre Bézier & the Pixar animators',
    hook: 'The letters you are reading are drawn by curves defined by just a few points each. How?',
    story: [
      'In 1959 the mathematician Paul de Casteljau at Citroën developed a way to describe car body curves with control points, computed by repeated interpolation; Citroën kept it secret for years [1].',
      'Independently, the engineer Pierre Bézier at Renault published a similar method in the early 1960s and used it in the UNISURF design system, so the curves carry his name [1].',
      'Bézier curves now describe the outlines of fonts: PostScript and OpenType use cubic curves and TrueType quadratic ones [2]. In 1995 Pixar’s Toy Story was made entirely by computer, its animators posing characters at key frames and letting curves fill the motion in between [3].',
    ],
    takeaway: 'lerp(a, b, t) = a + t(b − a). Apply it repeatedly between control points and you trace a Bézier curve.',
    viz: 'bezier_casteljau',
    vizTitle: 'De Casteljau’s Construction',
    vizHow: 'Four control points. Slide t from 0 to 1: interpolate between neighbours, then between those points, and so on. The last point traces the curve.',
    steps: [
      ['Lerp', '\\text{lerp}(\\mathbf a, \\mathbf b, t) = (1-t)\\mathbf a + t\\mathbf b', 'The point a fraction t of the way from a to b.'],
      ['Repeat', '4 \\to 3 \\to 2 \\to 1 \\text{ points}', 'Each level interpolates the one before.'],
      ['Cubic Bézier', '\\mathbf B(t) = (1-t)^3\\mathbf P_0 + 3(1-t)^2t\\,\\mathbf P_1 + 3(1-t)t^2\\mathbf P_2 + t^3\\mathbf P_3', 'Bernstein polynomials (cs-114 counting numbers 1, 3, 3, 1).'],
    ],
    drills: [
      ['lerp(2, 10, 0.25)?', ['4', '6', '2.5', '8'], '2 + 0.25 × 8.', 'A quarter of the way.', '4.'],
      ['Does a cubic Bézier curve pass through its middle control points?', ['Usually not: they only pull it', 'Always', 'Only at t = 0.5', 'Never through any point'], 'It starts at P₀ and ends at P₃.', 'Middle points are handles.', 'Usually not.'],
      ['At which car company did de Casteljau work?', ['Citroën', 'Renault', 'Toyota', 'Ford'], '1959.', 'Bézier was at Renault.', 'Citroën.'],
    ],
    boss: [
      'Easing',
      'In animation, a ball moved at constant speed between two keyframes looks robotic. How do animators fix it with the same curve idea?',
      ['Use a curve for time too, so motion speeds up and slows down (ease in, ease out)', 'Add more balls', 'Use fewer frames', 'Make it bounce randomly'],
      'Replace t by a smooth function of t.',
      'An S-shaped Bézier easing curve maps time to progress: slow at the start, fast in the middle, slow at the end, like real objects with inertia.',
    ],
    read: [
      ['wiki', 'Bézier curve', 'Definition, de Casteljau’s algorithm and uses.', 'A parametric curve defined by control points through Bernstein polynomials, computed stably by de Casteljau’s repeated interpolation; used in fonts, vector graphics and animation.'],
      ['link', 'Pomax', 'A Primer on Bézier Curves (free, interactive)', 'https://pomax.github.io/bezierinfo/', 'Every idea, with draggable diagrams.', 'Explains Bézier curves from linear interpolation upward, de Casteljau’s algorithm, splitting, derivatives, bounding boxes and many practical operations, with interactive figures.'],
    ],
    sources: [
      ['Wikipedia: Bézier curve', W('B%C3%A9zier_curve'), 'de Casteljau 1959 at Citroën; Bézier at Renault, UNISURF'],
      ['Wikipedia: Outline font', W('Outline_font'), 'PostScript/OpenType cubic, TrueType quadratic'],
      ['Wikipedia: Toy Story', W('Toy_Story'), '1995; first entirely computer-animated feature'],
    ],
    labs: [
      online('A Primer on Bézier Curves', 'https://pomax.github.io/bezierinfo/', 'Drag the control points in the first interactive figures and watch the de Casteljau lines move with t.'),
      home('Mark four points on paper. With a ruler, mark the halfway points between neighbours, then halfway between those, then once more. That last point lies on the curve at t = ½.'),
    ],
    quiz: [
      ['Which film, in 1995, was the first made entirely by computer animation?', ['Toy Story', 'Jurassic Park', 'Tron', 'Shrek'], 'Pixar.'],
      ['What kind of Bézier curves does TrueType use?', ['Quadratic', 'Cubic', 'Linear only', 'Circles'], 'PostScript uses cubic.'],
    ],
    gloss: [
      ['Bézier curve', 'A smooth curve shaped by control points.', ['control point']],
      ['Linear interpolation', 'Finding a point a fraction t of the way between two values.', ['lerp']],
      ['Keyframe', 'A pose set by an animator; the frames between are interpolated.', ['in-betweening']],
    ],
    events: [
      [1959, 'De Casteljau at Citroën', 'Curves from control points.', false],
      [1995, 'Toy Story', 'An entirely computer-made film.', false],
    ],
  }),
];
