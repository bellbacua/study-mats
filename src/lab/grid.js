// Shared board rules for both labs.
// Wires are straight runs between grid points. Two wires join where one of
// them ends (a "T" or a corner) or at a part's pin, never where they simply
// cross: the same rule as a dot on a printed circuit diagram.

export const pkey = (p) => `${p[0]},${p[1]}`;

export function pointsOn(a, b) {
  const out = [];
  const dx = Math.sign(b[0] - a[0]);
  const dy = Math.sign(b[1] - a[1]);
  const n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]));
  for (let k = 0; k <= n; k++) out.push([a[0] + dx * k, a[1] + dy * k]);
  return out;
}

// Cut each wire at interior points that are a junction (some wire ends there,
// or a pin sits there). Returns pieces { id, src, a, b }.
export function splitWires(wires, pinPoints = []) {
  const joints = new Set(pinPoints.map(pkey));
  for (const w of wires) {
    joints.add(pkey(w.a));
    joints.add(pkey(w.b));
  }
  const pieces = [];
  for (const w of wires) {
    const pts = pointsOn(w.a, w.b);
    let start = pts[0];
    let k = 0;
    for (let i = 1; i < pts.length; i++) {
      if (i === pts.length - 1 || joints.has(pkey(pts[i]))) {
        pieces.push({ ...w, id: `${w.id}#${k++}`, src: w.id, a: start, b: pts[i] });
        start = pts[i];
      }
    }
  }
  return pieces;
}

// Points where three or more wire/pin ends meet get a solder dot.
export function junctionDots(pieces, pinPoints = []) {
  const count = new Map();
  const bump = (p) => count.set(pkey(p), (count.get(pkey(p)) || 0) + 1);
  for (const w of pieces) {
    bump(w.a);
    bump(w.b);
  }
  pinPoints.forEach(bump);
  return [...count.entries()].filter(([, c]) => c >= 3).map(([k]) => k.split(',').map(Number));
}

// Snap a drag to a straight run along its longer direction.
export function straighten(a, b) {
  return Math.abs(b[0] - a[0]) >= Math.abs(b[1] - a[1]) ? [b[0], a[1]] : [a[0], b[1]];
}

let seq = 0;
export const newId = (prefix) => `${prefix}${Date.now().toString(36)}${(seq++).toString(36)}`;
