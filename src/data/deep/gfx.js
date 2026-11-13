// Computer Science track, Graphics (gfx-001 to gfx-008): each class split into
// three parts. Every number was worked out and checked by script.

const ex = (problem, steps, answer, code) => ({
  problem,
  steps: steps.length > 1 ? steps : [...steps, [`So: ${answer}.`, '']],
  answer,
  ...(code ? { code } : {}),
});
const pr = (q, a, hint, solution, extra = {}) => ({ q, a, hint, solution, ...extra });
const ch = (q, options, hint, solution, extra = {}) => ({ q, options, hint, solution, ...extra });

export const GFX = {
  'gfx-001': {
    predict: {
      q: 'A full-HD photo is 1920 × 1080 pixels, with 3 bytes per pixel. Stored with no compression, about how big is it?',
      options: ['About 6 MB', 'About 2 MB', 'About 60 KB', 'About 6 GB'],
      answer: 0,
      reveal: '1920 × 1080 = 2,073,600 pixels, times 3 bytes = 6,220,800 bytes, about 6 MB. That is why photos are compressed (JPEG is often ten times smaller).',
    },
    parts: [
      {
        title: 'Three numbers per pixel',
        minutes: 20,
        explain: [
          'A digital image is a grid of pixels. In colour images each pixel stores three numbers: how bright its red, green and blue lights should be.',
          'With 8 bits (one byte) per channel each number runs from 0 to 255, so a pixel can be any of 256 × 256 × 256 = 16,777,216 colours.',
          'Web designers write colours in hexadecimal: #RRGGBB, two base-16 digits per channel. FF = 15 × 16 + 15 = 255.',
        ],
        formulas: [
          ['Colours with b bits per channel', 'N = (2^b)^3 = 2^{3b}'],
          ['Hex digits', '\\text{FF}_{16} = 15 \\cdot 16 + 15 = 255'],
        ],
        examples: [
          ex('What RGB values does #FFA500 (orange) mean?', [['FF = 255, A5 = 10 × 16 + 5 = 165, 00 = 0.', ''], ['So the pixel is', '(255, 165, 0)']], '(255, 165, 0)'),
          ex('How many colours with 4 bits per channel?', [['16 levels per channel.', '2^4 = 16'], ['Three channels.', '16^3 = 4096']], '4,096'),
        ],
        practice: [
          pr('How many colours with 5 bits per channel?', 32768, '2¹⁵.', '32 × 32 × 32 = 32,768.'),
          pr('What decimal number is the hex value C0?', 192, 'C = 12.', '12 × 16 + 0 = 192.'),
          pr('How many colours with 6 bits per channel?', 262144, '64³.', '2¹⁸ = 262,144.'),
          ch('What colour is (0, 255, 255)?', ['Cyan', 'Magenta', 'Yellow', 'White'], 'Green + blue light.', 'Green and blue together look cyan.'),
        ],
      },
      {
        title: 'How big is an image?',
        minutes: 20,
        explain: [
          'Pixels = width × height. Bytes = pixels × bytes per pixel. A greyscale image needs one byte per pixel; a colour one needs three (four with transparency).',
          'Video is many images per second, so raw sizes become huge. Compression (JPEG for photos, H.264 and newer for video) keeps the size practical.',
          'Kirsch’s 1957 image had 176 × 176 pixels, each just black or white at first: one bit.',
        ],
        formulas: [['Raw size', '\\text{bytes} = W \\times H \\times \\text{bytes per pixel}']],
        code: [['Image size in Python', 'w, h, bpp = 1920, 1080, 3\nbytes_ = w * h * bpp\nprint(bytes_, bytes_ / 1e6, "MB")']],
        examples: [
          ex('How many pixels in Kirsch’s 176 × 176 image?', [['Multiply.', '176 \\times 176'], ['Result.', '30\\,976']], '30,976'),
          ex('Raw size of a 1920 × 1080 colour image?', [['Pixels.', '1920 \\times 1080 = 2\\,073\\,600'], ['Times 3 bytes.', '6\\,220\\,800 \\text{ bytes} \\approx 6.2 \\text{ MB}']], '6,220,800 bytes'),
        ],
        practice: [
          pr('How many pixels in a 4K image, 3840 × 2160?', 8294400, 'Multiply.', '8,294,400: four times full HD.'),
          pr('Bytes for a 640 × 480 greyscale image, 1 byte per pixel?', 307200, 'Multiply.', '307,200.'),
          pr('Raw 1080p colour video at 30 frames per second: how many megabytes per second (1 MB = 10⁶ bytes)?', 186.6, '6,220,800 × 30.', '186,624,000 bytes ≈ 186.6 MB every second.'),
          pr('Kirsch’s 176 × 176 image at 1 bit per pixel: how many bytes?', 3872, '8 bits per byte.', '30,976 ÷ 8 = 3,872.'),
        ],
      },
      {
        title: 'Brightness and blending',
        minutes: 20,
        explain: [
          'Our eyes are most sensitive to green and least to blue. So a colour’s brightness for a greyscale version weighs green most: Y = 0.299 R + 0.587 G + 0.114 B (the standard used for old TV).',
          'Blending two colours is done channel by channel: a fraction t of the way from colour A to colour B is A + t (B − A). Transparency in images works this way.',
        ],
        formulas: [
          ['Brightness (luma)', 'Y = 0.299R + 0.587G + 0.114B'],
          ['Blend', 'C = (1-t)A + tB'],
        ],
        examples: [
          ex('Greyscale value of pure red (255, 0, 0)?', [['Only the red term.', '0.299 \\times 255'], ['Result.', '\\approx 76']], '76'),
          ex('Halfway between red (255, 0, 0) and blue (0, 0, 255)?', [['Average each channel.', '(127.5, 0, 127.5)'], ['Rounded: a purple.', '(128, 0, 128)']], '(128, 0, 128)'),
        ],
        practice: [
          pr('Greyscale value of pure green (0, 255, 0)? (nearest whole number)', 150, '0.587 × 255.', '149.7 ≈ 150: green looks much brighter than red.'),
          pr('Greyscale value of pure blue (0, 0, 255)? (nearest whole number)', 29, '0.114 × 255.', '29.07 ≈ 29.'),
          pr('White (255) at 25% over black (0): what value? (nearest whole number)', 64, '0.25 × 255.', '63.75 ≈ 64.'),
          ch('Why does green get the biggest weight?', ['Our eyes are most sensitive to green light', 'Screens have more green pixels', 'Green is the middle number', 'By tradition only'], 'Eyes.', 'Human sensitivity peaks near green-yellow.'),
        ],
      },
    ],
  },

  'gfx-002': {
    predict: {
      q: 'A line is drawn from pixel (0, 0) to pixel (10, 3). How many pixels light up?',
      options: ['11', '10', '13', '3'],
      answer: 0,
      reveal: 'A shallow line gets exactly one pixel per column, and columns 0 to 10 are 11 columns. Fewer would leave gaps; more would make it thick.',
    },
    parts: [
      {
        title: 'Which pixels?',
        minutes: 20,
        explain: [
          'A line from (0, 0) to (dx, dy) has slope m = dy / dx. For a shallow line (m ≤ 1) we light one pixel in each column x, at the row nearest to the true height m·x.',
          'For a steep line (m > 1) we swap roles: one pixel per row. Either way the number of pixels is one more than the longer of dx and dy.',
        ],
        formulas: [
          ['True height', 'y = m x,\\quad m = \\dfrac{dy}{dx}'],
          ['Pixels lit', '\\max(dx, dy) + 1'],
        ],
        examples: [
          ex('Line to (10, 4). Which row at x = 3?', [['True height.', 'y = 0.4 \\times 3 = 1.2'], ['Nearest row.', '1']], 'row 1'),
          ex('Line to (10, 4). Which row at x = 8?', [['True height.', '0.4 \\times 8 = 3.2'], ['Nearest row.', '3']], 'row 3'),
        ],
        practice: [
          pr('Line to (8, 3). Which row at x = 5?', 2, '3/8 × 5 = 1.875.', 'Nearest row: 2.'),
          pr('How many pixels for a line to (12, 5)?', 13, 'One per column.', '12 + 1 = 13.'),
          pr('How many pixels for a steep line to (3, 9)?', 10, 'One per row.', '9 + 1 = 10.'),
          pr('Line to (10, 4): the true height at x = 6?', 2.4, '0.4 × 6.', '2.4 (so row 2 is lit).'),
        ],
      },
      {
        title: 'The error term, in whole numbers',
        minutes: 25,
        explain: [
          'Computing m·x needs fractions. Bresenham instead keeps a decision value D that says whether the true line is above or below the midpoint between two candidate rows.',
          'Multiplying everything by 2·dx removes the fractions. Start with D = 2dy − dx. At each column: if D > 0, step up a row and subtract 2dx; then add 2dy.',
          'Only additions, subtractions and comparisons: on 1960s hardware, and in today’s chips, that is fast.',
        ],
        formulas: [['Bresenham’s rule', 'D_0 = 2dy - dx;\\quad D > 0 \\Rightarrow y \\mathrel{+}= 1,\\ D \\mathrel{-}= 2dx;\\quad D \\mathrel{+}= 2dy']],
        code: [['Bresenham in Python', 'def line(dx, dy):           # shallow lines, 0 <= dy <= dx\n    D, y, pts = 2*dy - dx, 0, []\n    for x in range(dx + 1):\n        pts.append((x, y))\n        if D > 0:\n            y += 1\n            D -= 2*dx\n        D += 2*dy\n    return pts\n\nprint(line(10, 4))']],
        examples: [
          ex('Line to (10, 4): the first decision value D₀?', [['Formula.', 'D_0 = 2 \\cdot 4 - 10'], ['Result: negative, so stay on row 0.', '-2']], '−2'),
          ex('Next column: D = −2 + 8. What happens?', [['Add 2dy.', 'D = 6'], ['Positive: the next pixel steps up a row, and D becomes 6 − 20 + 8.', '-6']], 'step up; D = −6'),
        ],
        practice: [
          pr('Line to (8, 3): D₀?', -2, '2·3 − 8.', '−2.'),
          pr('Line to (12, 5): D₀?', -2, '2·5 − 12.', '−2.'),
          pr('Line to (10, 4): how many times does y step up in total?', 4, 'It ends at row 4.', 'Four steps up.'),
          ch('Why is D doubled (multiplied by 2dx)?', ['To keep every value a whole number', 'To draw thicker lines', 'To go twice as fast', 'To handle colours'], 'The half in “midpoint”.', 'The midpoint test has a ½; doubling clears it.'),
        ],
      },
      {
        title: 'Smoothing the staircase',
        minutes: 20,
        explain: [
          'Lighting whole pixels gives jagged “stairs”: aliasing. Antialiasing shares brightness between the two nearest pixels, in proportion to how close the true line is.',
          'Wu’s 1991 method does this per column: if the true height is 1.2, row 1 gets 80% brightness and row 2 gets 20%.',
          'Games often use supersampling instead: test several points inside each pixel and average them.',
        ],
        formulas: [['Wu’s split', 'y = k + f:\\ \\text{row } k \\text{ gets } 1-f,\\ \\text{row } k+1 \\text{ gets } f']],
        examples: [
          ex('True height 2.4. How are rows 2 and 3 shaded?', [['Fraction above row 2.', 'f = 0.4'], ['Shares.', '\\text{row 2: } 60\\%,\\ \\text{row 3: } 40\\%']], 'row 2 60%, row 3 40%'),
          ex('4 samples per pixel on a 1920 × 1080 screen: how many samples?', [['Pixels.', '2\\,073\\,600'], ['Times 4.', '8\\,294\\,400']], '8,294,400'),
        ],
        practice: [
          pr('True height 3.75: brightness of row 3, in percent?', 25, 'f = 0.75.', '1 − 0.75 = 25%.'),
          pr('True height 3.75: brightness of row 4, in percent?', 75, 'f.', '75%.'),
          pr('16 samples per pixel (4 × 4) on a 1280 × 720 screen: how many samples?', 14745600, '921,600 × 16.', '14,745,600.'),
          ch('What causes aliasing?', ['Sampling a smooth shape on a grid of whole pixels', 'A slow processor', 'Colour blindness', 'Using too many colours'], 'Grid.', 'Stairs come from the grid.'),
        ],
      },
    ],
  },

  'gfx-003': {
    predict: {
      q: 'The point (2, 0) is rotated 90° anticlockwise about the origin. Where does it go?',
      options: ['(0, 2)', '(2, 2)', '(−2, 0)', '(0, −2)'],
      answer: 0,
      reveal: 'A quarter turn takes the x-axis to the y-axis: (2, 0) lands at (0, 2). In general (x, y) becomes (−y, x).',
    },
    parts: [
      {
        title: 'Rotation as a matrix',
        minutes: 25,
        explain: [
          'To rotate a point (x, y) by θ about the origin: x′ = x cos θ − y sin θ, y′ = x sin θ + y cos θ. That is a 2 × 2 matrix times the point (math-027).',
          'A shape is a list of points, so rotating the shape means multiplying every point by the same matrix. Graphics cards do exactly this, for millions of points.',
        ],
        formulas: [['Rotation', '\\begin{pmatrix} x\' \\\\ y\' \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}']],
        examples: [
          ex('Rotate (3, 1) by 90°.', [['cos 90° = 0, sin 90° = 1.', "x' = -1,\\ y' = 3"], ['Result.', '(-1, 3)']], '(−1, 3)'),
          ex('Rotate (1, 0) by 60°.', [['Use cos 60° and sin 60°.', '(\\cos 60°, \\sin 60°)'], ['Result.', '(0.5,\\ 0.866)']], '(0.5, 0.866)'),
        ],
        practice: [
          pr('Rotate (4, 0) by 60°. The new x?', 2, '4 cos 60°.', '2.'),
          pr('Rotate (0, 2) by 90°. The new y?', 0, '(x, y) → (−y, x).', '(−2, 0): y = 0.'),
          pr('Rotate (1, 1) by 45°. The new y? (2 decimal places)', 1.41, 'sin 45° + cos 45°.', '√2 ≈ 1.41; the new x is 0.'),
          pr('Rotate (1, 1) by 45°. The new x?', 0, 'cos 45° − sin 45°.', '0: the point now lies on the y-axis.'),
        ],
      },
      {
        title: 'Scaling, moving and the extra 1',
        minutes: 25,
        explain: [
          'Scaling by s multiplies both coordinates by s: also a matrix. But moving (translating) adds a fixed amount, which no 2 × 2 matrix can do.',
          'Homogeneous coordinates fix this: write (x, y) as (x, y, 1). A 3 × 3 matrix with the move in its last column then adds tx and ty. In 3D, points become (x, y, z, 1) and matrices are 4 × 4.',
        ],
        formulas: [['Move as a matrix', '\\begin{pmatrix} 1 & 0 & t_x \\\\ 0 & 1 & t_y \\\\ 0 & 0 & 1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} x + t_x \\\\ y + t_y \\\\ 1 \\end{pmatrix}']],
        code: [['Transforms with numpy', 'import numpy as np\nS = np.diag([2, 2, 1])               # scale by 2\nT = np.array([[1, 0, 1], [0, 1, -1], [0, 0, 1]])  # move (1, -1)\np = np.array([2, 3, 1])\nprint(T @ S @ p)                     # [5 5 1]']],
        examples: [
          ex('Scale (2, 3) by 2, then move by (1, −1).', [['Scale.', '(4, 6)'], ['Move.', '(5, 5)']], '(5, 5)'),
          ex('What does the homogeneous point (5, 5, 1) mean?', [['Drop the final 1.', ''], ['It is the ordinary point', '(5, 5)']], '(5, 5)'),
        ],
        practice: [
          pr('Scale (1, 2) by 3, then move by (2, 0). The new x?', 5, '3 + 2.', '5.'),
          pr('Same transform: the new y?', 6, '6 + 0.', '6.'),
          pr('How many numbers are in a 3D transformation matrix?', 16, '4 × 4.', '16.'),
          pr('What is the last coordinate of a point in homogeneous form (before any perspective)?', 1, 'The extra coordinate.', 'Always 1.'),
        ],
      },
      {
        title: 'Combining transforms, in order',
        minutes: 20,
        explain: [
          'Several transforms combine into one matrix by multiplying: M = T R S means scale first, then rotate, then move (read from right to left).',
          'Order matters, because matrix multiplication is not commutative. Rotation turns about the origin, so a shape moved away first swings in a wide arc.',
        ],
        formulas: [['Combine', 'M = T\\,R\\,S,\\quad M\\mathbf p = T(R(S\\mathbf p))']],
        examples: [
          ex('(1, 0): rotate 90°, then move (3, 0).', [['Rotate.', '(0, 1)'], ['Move.', '(3, 1)']], '(3, 1)'),
          ex('(1, 0): move (3, 0), then rotate 90°.', [['Move.', '(4, 0)'], ['Rotate.', '(0, 4)']], '(0, 4): a different place'),
        ],
        practice: [
          pr('(2, 0): move (0, 1), then rotate 90°. The new x?', -1, '(2, 1) → (−y, x).', '(−1, 2): x = −1.'),
          pr('(2, 0): rotate 90°, then move (0, 1). The new y?', 3, '(0, 2) then up 1.', '(0, 3): y = 3.'),
          pr('Two 90° rotations combine into a rotation of how many degrees?', 180, 'Angles add.', '180°.'),
          pr('Scale by 2, then by 3: one scale by what factor?', 6, 'Factors multiply.', '6.'),
        ],
      },
    ],
  },

  'gfx-004': {
    predict: {
      q: 'Two people of the same height stand 10 m and 20 m from a camera. How tall does the far one look, compared with the near one?',
      options: ['Half as tall', 'The same', 'A quarter as tall', 'Twice as tall'],
      answer: 0,
      reveal: 'Image size is proportional to 1/z. Twice as far, half as tall. (Area shrinks to a quarter.)',
    },
    parts: [
      {
        title: 'Similar triangles',
        minutes: 20,
        explain: [
          'Put the eye (or pinhole) at the origin, looking along z, with the image plane at distance f. A point (x, y, z) projects to x′ = f x / z, y′ = f y / z.',
          'It is just similar triangles: the triangle from the eye to the object and the one from the eye to the image have the same shape.',
        ],
        formulas: [['Pinhole projection', "x' = \\dfrac{f x}{z},\\quad y' = \\dfrac{f y}{z}"]],
        examples: [
          ex('A 2 m tall pole at 10 m, lens f = 0.05 m (50 mm). Image height?', [['Projection.', "y' = 0.05 \\times 2 / 10"], ['Result.', '0.01 \\text{ m} = 10 \\text{ mm}']], '10 mm'),
          ex('A point (3, 1, 6) with f = 1. Where on the image?', [['Divide by z.', "(3/6,\\ 1/6)"], ['Result.', '(0.5,\\ 0.167)']], '(0.5, 0.167)'),
        ],
        practice: [
          pr('f = 2, y = 1, z = 4: image height y′?', 0.5, '2 × 1 / 4.', '0.5.'),
          pr('A 1.7 m person at 17 m with f = 0.05 m: image height in millimetres?', 5, '0.05 × 1.7 / 17 m.', '0.005 m = 5 mm.'),
          pr('With f = 1, at what distance does a 2 m pole look 0.1 tall?', 20, '2 / z = 0.1.', 'z = 20.'),
          pr('f = 1, x = 3, z = 6: x′?', 0.5, 'Divide.', '0.5.'),
        ],
      },
      {
        title: 'Vanishing points',
        minutes: 20,
        explain: [
          'Take a rail at x = 1, y = −1 going away from you. Its points project to (1/z, −1/z) with f = 1. As z grows, both go to 0: the rail runs into the centre of the image.',
          'Every set of parallel lines heading away meets at its own vanishing point. Lines that stay at constant depth, like the sleepers across the rails, stay parallel in the picture.',
          'For a camera looking level, all horizontal directions vanish on one line: the horizon, at image height 0.',
        ],
        formulas: [['Far away', "z \\to \\infty:\\ \\left(\\dfrac{f x}{z}, \\dfrac{f y}{z}\\right) \\to (0, 0)"]],
        examples: [
          ex('Rail point (1, −1, z), f = 1, at z = 2 and z = 10?', [['z = 2.', '(0.5, -0.5)'], ['z = 10.', '(0.1, -0.1)']], 'closer to the centre each time'),
          ex('Where is the horizon for a level camera?', [['Points at the same height as the eye have y = 0.', "y' = 0"], ['So the horizon is the middle line of the image.', '']], 'y′ = 0'),
        ],
        practice: [
          pr('Rail point x = 1, z = 100, f = 1: x′?', 0.01, '1 / 100.', '0.01: almost at the vanishing point.'),
          pr('With f = 1, at what z does a point with x = 2 project to x′ = 0.25?', 8, '2 / z = 0.25.', 'z = 8.'),
          pr('Image height y′ of the horizon for a level camera?', 0, 'Eye height.', '0.'),
          ch('Which lines stay parallel in a perspective picture?', ['Lines at constant depth, parallel to the image', 'All parallel lines', 'Lines going away from you', 'None'], 'Their z does not change.', 'Same z, same scale, so they stay parallel.'),
        ],
      },
      {
        title: 'Zoom versus walking closer',
        minutes: 20,
        explain: [
          'Changing f (zooming) multiplies every image coordinate by the same factor: the picture is scaled, but near and far things keep their proportions.',
          'Walking closer changes z by a different ratio for near and far parts, so near parts grow faster. That is why close-up selfies make noses look big.',
          'The field of view of a camera with sensor width w is 2 arctan(w / 2f): a longer lens sees a narrower angle.',
        ],
        formulas: [['Field of view', '\\text{FOV} = 2\\arctan\\dfrac{w}{2f}']],
        examples: [
          ex('A 36 mm wide sensor with a 50 mm lens: field of view?', [['Half-angle.', '\\arctan(18/50) \\approx 19.8°'], ['Double.', '\\approx 39.6°']], 'about 39.6°'),
          ex('Two equal poles at 1 m and 3 m. Ratio of image heights?', [['Heights ∝ 1/z.', '\\dfrac{1/1}{1/3}'], ['Result.', '3']], '3'),
        ],
        practice: [
          pr('Two equal poles at 2 m and 4 m: ratio of near to far image height?', 2, '4 / 2.', '2.'),
          pr('Field of view, in degrees, of a 36 mm sensor with an 18 mm lens?', 90, '2 arctan(1).', '90°: a wide angle.'),
          pr('Field of view, in degrees, of a 36 mm sensor with a 36 mm lens? (1 decimal place)', 53.1, '2 arctan(0.5).', '53.1°.'),
          pr('Zooming from f = 1 to f = 3 makes every image length how many times bigger?', 3, 'f multiplies everything.', '3 times.'),
        ],
      },
    ],
  },

  'gfx-005': {
    predict: {
      q: 'A z-buffer stores one 4-byte depth per pixel. How much memory for a 1920 × 1080 screen?',
      options: ['About 8 MB', 'About 2 MB', 'About 1 GB', 'About 80 KB'],
      answer: 0,
      reveal: '2,073,600 pixels × 4 bytes = 8,294,400 bytes ≈ 8.3 MB. In 1974 that was far too much memory, which is why the idea took years to become standard.',
    },
    parts: [
      {
        title: 'Triangles and the inside test',
        minutes: 25,
        explain: [
          'Three points always lie on one flat plane, so triangles are the simplest surface piece. Any shape can be approximated by enough of them: a mesh.',
          'To fill a triangle, test each pixel centre against the three edges. The edge function E = (b − a) × (p − a) is positive if p is to the left of edge a→b. Inside means all three agree in sign.',
        ],
        formulas: [
          ['Edge function', 'E_{ab}(p) = (b_x - a_x)(p_y - a_y) - (b_y - a_y)(p_x - a_x)'],
          ['Triangle area', 'A = \\tfrac12 |E_{ab}(c)|'],
        ],
        examples: [
          ex('a = (0, 0), b = (4, 0), p = (1, 1): E?', [['Formula.', 'E = 4 \\cdot 1 - 0 \\cdot 1'], ['Result: p is left of a→b.', '4']], '4'),
          ex('Area of the triangle (0, 0), (4, 0), (0, 3)?', [['E for c.', 'E = 4 \\cdot 3 - 0 = 12'], ['Half of it.', '6']], '6'),
        ],
        practice: [
          pr('a = (0, 0), b = (2, 0), p = (1, −1): E?', -2, '2 × (−1) − 0.', '−2: p is to the right.'),
          pr('Area of the triangle (0, 0), (6, 0), (0, 4)?', 12, '½ × 6 × 4.', '12.'),
          pr('How many triangles make the surface of a cube?', 12, 'Each square face is 2 triangles.', '6 × 2 = 12.'),
          ch('Why do graphics cards use triangles?', ['Three points are always flat, so filling and depth are simple and exact', 'They are prettier', 'Squares are patented', 'They use less colour'], 'Four points may not be flat.', 'Depth varies linearly across a triangle.'),
        ],
      },
      {
        title: 'The depth test',
        minutes: 20,
        explain: [
          'The z-buffer starts with “infinitely far” in every pixel. For each new fragment (a pixel of a triangle), compare its depth with the stored one: if nearer, draw it and store its depth; otherwise skip it.',
          'Because each pixel keeps the nearest depth so far, triangles can be drawn in any order and still come out right, even when they cut through each other.',
          'Depths are stored with limited precision. Two surfaces at almost the same depth can flicker as they win in turn: “z-fighting”.',
        ],
        formulas: [['Depth test', 'z_{new} < z_{buf} \\Rightarrow \\text{draw},\\ z_{buf} \\leftarrow z_{new}']],
        code: [['Depth test in Python', 'import math\nzbuf = math.inf\nfor z in [5, 3, 7, 2]:           # fragments for one pixel\n    if z < zbuf:\n        zbuf = z                  # draw it\nprint(zbuf)                       # 2']],
        examples: [
          ex('One pixel gets fragments at depths 5, 3, 7, 2. Which are drawn?', [['5 < ∞ yes; 3 < 5 yes; 7 < 3 no; 2 < 3 yes.', ''], ['Drawn three times; final depth', '2']], '5, 3 and 2; final depth 2'),
          ex('Memory for a 1920 × 1080 z-buffer at 4 bytes each?', [['Pixels.', '2\\,073\\,600'], ['Times 4.', '8\\,294\\,400 \\text{ bytes}']], '8,294,400 bytes'),
        ],
        practice: [
          pr('Fragments at depths 4, 6, 1, 3. Final depth stored?', 1, 'The smallest.', '1.'),
          pr('Same fragments: how many are drawn?', 2, '4 yes, 6 no, 1 yes, 3 no.', '2.'),
          pr('Bytes for a 1280 × 720 z-buffer at 4 bytes per pixel?', 3686400, '921,600 × 4.', '3,686,400.'),
          ch('What is z-fighting?', ['Flicker when two surfaces have almost the same depth', 'Two programs fighting for memory', 'A game genre', 'Lines that are too thick'], 'Precision.', 'Rounding makes them win in turn.'),
        ],
      },
      {
        title: 'Painter’s algorithm versus z-buffer',
        minutes: 20,
        explain: [
          'Before the z-buffer, the painter’s algorithm sorted shapes from far to near and drew them in that order, like a painter covering the background first.',
          'It fails when shapes cut through each other or overlap in a cycle: no order is right. The z-buffer works per pixel, so it handles these cases.',
          'Its cost is memory and “overdraw”: pixels coloured several times before the nearest one wins.',
        ],
        formulas: [['Pixel work', '\\text{fragments per second} = W \\cdot H \\cdot \\text{fps} \\cdot \\text{overdraw}']],
        examples: [
          ex('Pixels per second at 1920 × 1080, 60 frames per second?', [['Per frame.', '2\\,073\\,600'], ['Times 60.', '124\\,416\\,000']], '124,416,000'),
          ex('Same, with overdraw 3?', [['Multiply.', '124\\,416\\,000 \\times 3'], ['Result.', '373\\,248\\,000']], '373,248,000'),
        ],
        practice: [
          pr('1 million triangles per frame at 60 frames per second: triangles per second?', 60000000, 'Multiply.', '60 million.'),
          pr('1280 × 720 at 30 frames per second: pixels per second?', 27648000, '921,600 × 30.', '27,648,000.'),
          pr('With overdraw 2, how many times is each pixel coloured on average?', 2, 'Definition.', '2.'),
          ch('When does the painter’s algorithm fail?', ['When shapes cut through each other or overlap in a cycle', 'When there are too many colours', 'Always', 'Never'], 'No correct far-to-near order.', 'Crossing shapes have no single order.'),
        ],
      },
    ],
  },

  'gfx-006': {
    predict: {
      q: 'Light hits a matte surface at 60° from its normal. Compared with light hitting it head-on, how bright is it?',
      options: ['Half as bright', 'Just as bright', 'Not lit at all', 'A quarter as bright'],
      answer: 0,
      reveal: 'Lambert’s law: brightness ∝ cos 60° = 0.5. The same light is spread over twice the area, like low morning sun.',
    },
    parts: [
      {
        title: 'Normals and the dot product',
        minutes: 20,
        explain: [
          'The normal n is a unit vector pointing straight out of the surface. The light direction l is a unit vector from the surface toward the light.',
          'Their dot product n · l = cos θ, where θ is the angle between them (math-011). It is 1 when the surface faces the light and 0 when the light grazes it.',
          'For a ball centred at the origin, the normal at a surface point p is simply p divided by the radius.',
        ],
        formulas: [
          ['Dot product', '\\mathbf n \\cdot \\mathbf l = n_x l_x + n_y l_y + n_z l_z = \\cos\\theta'],
          ['Unit vector', '\\hat{\\mathbf v} = \\mathbf v / |\\mathbf v|'],
        ],
        examples: [
          ex('n = (0, 0, 1), l = (0, 0.6, 0.8): n · l?', [['Multiply and add.', '0 + 0 + 0.8'], ['Result.', '0.8']], '0.8'),
          ex('Make (3, 4, 0) a unit vector.', [['Length.', '\\sqrt{9 + 16} = 5'], ['Divide.', '(0.6, 0.8, 0)']], '(0.6, 0.8, 0)'),
        ],
        practice: [
          pr('n = (0, 1, 0), l = (0.6, 0.8, 0): n · l?', 0.8, '0.8 × 1.', '0.8.'),
          pr('Brightness factor at 45°? (2 decimal places)', 0.71, 'cos 45°.', '0.707 ≈ 0.71.'),
          pr('A ball of radius 5 at the origin: the x-part of the normal at (3, 0, 4)?', 0.6, '3 / 5.', '0.6.'),
          pr('Length of the vector (1, 2, 2)?', 3, '√(1 + 4 + 4).', '3.'),
        ],
      },
      {
        title: 'Lambert and Gouraud',
        minutes: 20,
        explain: [
          'Diffuse brightness: I = k_d · max(0, n · l), where k_d is how much light the material reflects. Facing away gives a negative dot product, clipped to 0.',
          'A little ambient light k_a is often added so the dark side is not pure black.',
          'Gouraud (1971) computed I only at triangle corners and blended across; Phong (1975) blended the normals, which looks better on curved surfaces.',
        ],
        formulas: [['Diffuse with ambient', 'I = k_a + k_d \\max(0,\\ \\mathbf n \\cdot \\mathbf l)']],
        code: [['Lambert in Python', 'def lambert(n, l, kd=0.8, ka=0.1):\n    d = sum(a * b for a, b in zip(n, l))\n    return ka + kd * max(0, d)\n\nprint(lambert((0, 0, 1), (0, 0.6, 0.8)))   # 0.74']],
        examples: [
          ex('k_d = 0.8, n · l = 0.5, no ambient: I?', [['Multiply.', '0.8 \\times 0.5'], ['Result.', '0.4']], '0.4'),
          ex('Gouraud: corner brightnesses 0.2 and 0.8. Halfway along the edge?', [['Average.', '(0.2 + 0.8)/2'], ['Result.', '0.5']], '0.5'),
        ],
        practice: [
          pr('k_d = 0.9, light at 60°, no ambient: I?', 0.45, '0.9 × 0.5.', '0.45.'),
          pr('n · l = −0.3, no ambient: diffuse I?', 0, 'Clip at 0.', '0: the dark side.'),
          pr('k_a = 0.1, k_d = 0.6, n · l = 0.5: I?', 0.4, '0.1 + 0.3.', '0.4.'),
          pr('Gouraud: a quarter of the way from 0.2 to 1.0?', 0.4, '0.2 + 0.25 × 0.8.', '0.4.'),
        ],
      },
      {
        title: 'Highlights: Phong’s specular term',
        minutes: 25,
        explain: [
          'Shiny surfaces show a bright spot where light reflects toward the eye. The mirror direction of l about n is r = 2(n · l) n − l.',
          'Phong’s specular term is (max(0, r · v))ˢ, where v points to the viewer. The shininess s sets the size: a large s gives a small, sharp highlight (metal); a small s, a broad one (plastic).',
        ],
        formulas: [
          ['Reflection', '\\mathbf r = 2(\\mathbf n \\cdot \\mathbf l)\\mathbf n - \\mathbf l'],
          ['Specular', 'I_s = k_s \\big(\\max(0,\\ \\mathbf r \\cdot \\mathbf v)\\big)^{s}'],
        ],
        examples: [
          ex('r · v = 0.9, shininess s = 10: specular factor?', [['Power.', '0.9^{10}'], ['Result.', '\\approx 0.349']], '0.349'),
          ex('Same angle, s = 50?', [['Power.', '0.9^{50}'], ['Result: almost nothing, so the spot is small.', '\\approx 0.005']], '0.005'),
        ],
        practice: [
          pr('0.9²⁰? (3 decimal places)', 0.122, 'Square 0.9¹⁰.', '0.349² ≈ 0.122.'),
          pr('0.95¹⁰? (2 decimal places)', 0.6, 'Close to 1 stays large.', '0.599 ≈ 0.60.'),
          pr('n = (0, 1), l = (0.6, 0.8): the x-part of r?', -0.6, 'n · l = 0.8, r = 1.6 n − l.', '(−0.6, 0.8): x = −0.6.'),
          ch('Raising shininess s from 10 to 100 makes the highlight…', ['Smaller and sharper', 'Bigger and softer', 'A different colour', 'Disappear completely'], 'High powers kill all but r · v ≈ 1.', 'Smaller and sharper, like polished metal.'),
        ],
      },
    ],
  },

  'gfx-007': {
    predict: {
      q: 'A 1920 × 1080 image is ray traced with one ray per pixel. How many primary rays is that?',
      options: ['About 2 million', 'About 2 thousand', 'About 2 billion', '1,920'],
      answer: 0,
      reveal: '2,073,600 rays, before any shadow or reflection rays. Film renders use hundreds per pixel, which is why they took hours per frame.',
    },
    parts: [
      {
        title: 'Rays and spheres',
        minutes: 25,
        explain: [
          'A ray is a starting point e and a direction d: points p(t) = e + t d for t > 0. With d a unit vector, t is the distance travelled.',
          'A sphere with centre c and radius r is all points with |p − c|² = r². Putting the ray in gives a quadratic in t. No real root: a miss. Otherwise the smaller positive root is the nearest hit.',
        ],
        formulas: [
          ['Ray', '\\mathbf p(t) = \\mathbf e + t\\,\\mathbf d'],
          ['Hit (unit d)', 't = b - \\sqrt{b^2 - |\\mathbf c - \\mathbf e|^2 + r^2},\\quad b = \\mathbf d \\cdot (\\mathbf c - \\mathbf e)'],
        ],
        code: [['Ray–sphere hit in Python', 'import math\ndef hit(e, d, c, r):              # d must be a unit vector\n    oc = [ci - ei for ci, ei in zip(c, e)]\n    b = sum(x * y for x, y in zip(d, oc))\n    disc = b*b - sum(x*x for x in oc) + r*r\n    if disc < 0:\n        return None                   # miss\n    return b - math.sqrt(disc)\n\nprint(hit((0, 0, 0), (0, 0, 1), (0, 0, 5), 1))   # 4.0']],
        examples: [
          ex('Eye at the origin, d = (0, 0, 1), sphere centre (0, 0, 5), radius 1. Distance to the hit?', [['Straight at the centre.', 'b = 5,\\ \\text{disc} = 25 - 25 + 1 = 1'], ['Result.', 't = 5 - 1 = 4']], '4'),
          ex('d = (1, 0, 0), sphere centre (5, 3, 0), radius 1. Hit?', [['The ray passes 3 from the centre.', 'b = 5,\\ \\text{disc} = 25 - 34 + 1 = -8'], ['Negative: a miss.', '']], 'miss'),
        ],
        practice: [
          pr('d = (0, 0, 1) from the origin, sphere centre (0, 0, 10), radius 2: distance to the hit?', 8, '10 − 2.', '8.'),
          pr('d = (1, 0, 0) from the origin, sphere centre (6, 0.6, 0), radius 1: distance to the hit?', 5.2, 'b = 6, disc = 36 − 36.36 + 1 = 0.64.', '6 − 0.8 = 5.2.'),
          pr('Ray from (1, 2, 0) along (1, 0, 0): the x-coordinate at t = 3?', 4, '1 + 3.', '4.'),
          ch('The quadratic has a negative discriminant. That means…', ['The ray misses the sphere', 'The ray hits twice', 'The sphere is behind a light', 'An error'], 'No real t.', 'No intersection.'),
        ],
      },
      {
        title: 'Shadows and mirrors',
        minutes: 20,
        explain: [
          'At each hit point, send a shadow ray toward each light. If it hits anything before reaching the light, the point is in shadow for that light.',
          'For a mirror, send a new ray in the reflected direction r = d − 2(d · n) n and add what it sees. Whitted’s 1980 ray tracer did this recursively, also bending rays through glass.',
        ],
        formulas: [['Mirror direction', '\\mathbf r = \\mathbf d - 2(\\mathbf d \\cdot \\mathbf n)\\,\\mathbf n']],
        examples: [
          ex('A ray going d = (1, −1) hits a floor with normal n = (0, 1). Reflected direction?', [['d · n = −1.', '\\mathbf r = (1, -1) - 2(-1)(0, 1)'], ['Result: it bounces up.', '(1, 1)']], '(1, 1)'),
          ex('1920 × 1080, every primary ray hits something, 2 lights. Total rays?', [['Each pixel: 1 primary + 2 shadow rays.', '3 \\times 2\\,073\\,600'], ['Result.', '6\\,220\\,800']], '6,220,800'),
        ],
        practice: [
          pr('d = (2, −3) hits a floor with n = (0, 1). The y-part of the reflected ray?', 3, 'd · n = −3.', '(2, 3): y = 3.'),
          pr('d = (2, −3) on the same floor: the x-part of the reflected ray?', 2, 'Along the floor nothing changes.', '2.'),
          pr('640 × 480 image, 1 primary + 3 shadow rays per pixel: total rays?', 1228800, '307,200 × 4.', '1,228,800.'),
          ch('A shadow ray reaches the light without hitting anything. The point is…', ['Lit by that light', 'In shadow', 'A mirror', 'Transparent'], 'Nothing blocks it.', 'Lit.'),
        ],
      },
      {
        title: 'Many rays: path tracing and noise',
        minutes: 20,
        explain: [
          'Kajiya’s 1986 rendering equation says the light leaving a point is what it emits plus all light arriving from every direction, reflected. Path tracing estimates that by averaging random rays.',
          'The random error (noise) falls like 1/√N for N samples per pixel: four times the rays halve the noise. That is why film frames needed hours, and why games use denoising.',
        ],
        formulas: [['Noise', '\\text{noise} \\propto \\dfrac{1}{\\sqrt N}']],
        examples: [
          ex('100 samples per pixel at 1920 × 1080: rays?', [['Multiply.', '100 \\times 2\\,073\\,600'], ['Result.', '207\\,360\\,000']], '207,360,000'),
          ex('How many samples cut noise to half?', [['1/√N = 1/2.', 'N = 4'], ['Four times the samples.', '']], '4 times'),
        ],
        practice: [
          pr('To cut noise to one third, how many times more samples?', 9, '√N = 3.', '9.'),
          pr('Noise with 16 samples, relative to 1 sample?', 0.25, '1/√16.', '0.25.'),
          pr('One ray per pixel at 1920 × 1080 and 60 frames per second: rays per second?', 124416000, '2,073,600 × 60.', '124,416,000.'),
          ch('Why do real-time ray-traced games use denoising?', ['They can afford only a few rays per pixel, which looks grainy', 'To add colour', 'To save memory', 'It is required by law'], '1/√N.', 'Few rays mean noise; a filter smooths it.'),
        ],
      },
    ],
  },

  'gfx-008': {
    predict: {
      q: 'A cubic Bézier curve runs from (0, 0) to (6, 0), and both middle control points are at height 4. How high does the curve reach?',
      options: ['3', '4', '2', '6'],
      answer: 0,
      reveal: 'At t = ½ the height is (0 + 3·4 + 3·4 + 0) / 8 = 3. The middle points pull the curve toward them, but it never reaches them.',
    },
    parts: [
      {
        title: 'Linear interpolation',
        minutes: 15,
        explain: [
          'lerp(a, b, t) = a + t(b − a) is the point a fraction t of the way from a to b. At t = 0 it is a; at t = 1 it is b.',
          'For points, apply it to each coordinate. Animation uses it all the time: between two keyframes, the position at time fraction t is a lerp.',
        ],
        formulas: [['Lerp', '\\text{lerp}(a, b, t) = a + t(b - a) = (1-t)a + tb']],
        examples: [
          ex('lerp(2, 10, 0.25)?', [['Distance.', '10 - 2 = 8'], ['A quarter of it, from 2.', '2 + 2 = 4']], '4'),
          ex('lerp((0, 0), (4, 2), 0.5)?', [['Each coordinate.', '(2, 1)'], ['The midpoint.', '(2, 1)']], '(2, 1)'),
        ],
        practice: [
          pr('lerp(10, 20, 0.3)?', 13, '10 + 3.', '13.'),
          pr('lerp(−4, 4, 0.75)?', 2, '−4 + 0.75 × 8.', '2.'),
          pr('For what t is lerp(0, 8, t) = 6?', 0.75, '6 / 8.', '0.75.'),
          pr('lerp(5, 1, 0.5)?', 3, 'Midpoint.', '3.'),
        ],
      },
      {
        title: 'De Casteljau’s construction',
        minutes: 25,
        explain: [
          'Given control points, lerp each neighbouring pair with the same t. That gives one point fewer. Repeat until one point remains: it lies on the Bézier curve at t.',
          'A quadratic (3 points) needs 2 + 1 = 3 lerps; a cubic (4 points) needs 3 + 2 + 1 = 6.',
          'At t = ½ a cubic gives B = (P₀ + 3P₁ + 3P₂ + P₃) / 8.',
        ],
        formulas: [['Cubic at the middle', '\\mathbf B(\\tfrac12) = \\tfrac18(\\mathbf P_0 + 3\\mathbf P_1 + 3\\mathbf P_2 + \\mathbf P_3)']],
        code: [['De Casteljau in Python', 'def lerp(a, b, t):\n    return tuple(x + t * (y - x) for x, y in zip(a, b))\n\ndef bezier(P, t):\n    while len(P) > 1:\n        P = [lerp(P[i], P[i + 1], t) for i in range(len(P) - 1)]\n    return P[0]\n\nprint(bezier([(0, 0), (0, 4), (6, 4), (6, 0)], 0.5))   # (3.0, 3.0)']],
        examples: [
          ex('Quadratic: (0, 0), (2, 4), (4, 0) at t = ½?', [['First level.', '(1, 2),\\ (3, 2)'], ['Second level.', '(2, 2)']], '(2, 2)'),
          ex('Cubic: (0, 0), (0, 4), (6, 4), (6, 0) at t = ½?', [['x.', '(0 + 0 + 18 + 6)/8 = 3'], ['y.', '(0 + 12 + 12 + 0)/8 = 3']], '(3, 3)'),
        ],
        practice: [
          pr('Quadratic (0, 0), (4, 8), (8, 0) at t = ½: the y-value?', 4, 'Levels: (2, 4), (6, 4); then (4, 4).', '4: half the handle’s height.'),
          pr('Cubic with heights 0, 8, 8, 0 at t = ½: the height?', 6, '(0 + 24 + 24 + 0) / 8.', '6.'),
          pr('Cubic with x-values 0, 1, 2, 3 (evenly spaced) at t = 0.25: x?', 0.75, 'Evenly spaced points give a straight-speed line.', '0.75.'),
          pr('How many lerps does de Casteljau need for a cubic at one value of t?', 6, '3 + 2 + 1.', '6.'),
        ],
      },
      {
        title: 'Bernstein weights and easing',
        minutes: 20,
        explain: [
          'Expanding de Casteljau gives the Bernstein form: each control point gets a weight, (1 − t)³, 3(1 − t)²t, 3(1 − t)t², t³. The weights always add to 1 (the 1, 3, 3, 1 come from cs-114).',
          'Animators use the same curves for timing. The “smoothstep” ease 3t² − 2t³ starts and stops gently, unlike a constant-speed lerp.',
          'Film runs at 24 frames per second, so a 2-second move needs 48 in-between positions.',
        ],
        formulas: [
          ['Bernstein weights', 'B(t) = (1-t)^3P_0 + 3(1-t)^2t\\,P_1 + 3(1-t)t^2P_2 + t^3P_3'],
          ['Smoothstep', 's(t) = 3t^2 - 2t^3'],
        ],
        examples: [
          ex('Weights at t = ½?', [['Each factor is ½.', '(\\tfrac18, \\tfrac38, \\tfrac38, \\tfrac18)'], ['They add to 1.', '']], '1/8, 3/8, 3/8, 1/8'),
          ex('Smoothstep at t = 0.25?', [['Compute.', '3(0.0625) - 2(0.015625)'], ['Result: slow start.', '0.15625']], '0.156'),
        ],
        practice: [
          pr('Weight of P₀ at t = ½?', 0.125, '(½)³.', '1/8 = 0.125.'),
          pr('Weight of P₁ at t = ⅓? (3 decimal places)', 0.444, '3 × (2/3)² × (1/3).', '4/9 ≈ 0.444.'),
          pr('Smoothstep at t = 0.75?', 0.84375, '3(0.5625) − 2(0.421875).', '0.84375.'),
          pr('Frames needed for a 2-second move at 24 frames per second?', 48, 'Multiply.', '48.'),
        ],
      },
    ],
  },
};
