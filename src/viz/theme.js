// Palette borrowed in spirit from 3Blue1Brown's manim defaults.
export const C = {
  bg: 0x0d1117,
  grid: 0x1f3a52,
  gridFaint: 0x15263a,
  axis: 0xb8c2cc,
  text: '#e6edf3',
  blue: 0x58c4dd,
  teal: 0x5cd0b3,
  green: 0x83c167,
  yellow: 0xffd84a,
  gold: 0xf0ac5f,
  red: 0xfc6255,
  maroon: 0xc55f73,
  purple: 0x9a72ac,
  pink: 0xd147bd,
  grey: 0x888888,
  white: 0xffffff,
};

export const css = (hex) => `#${hex.toString(16).padStart(6, '0')}`;
