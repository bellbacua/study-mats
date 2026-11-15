import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { LED_COLORS, BAND_HEX, resistorBands, si } from './circuitSim.js';
import { GATES } from './logicSim.js';

// Every model here is our own, built from plain shapes in code.
// Two-terminal parts are built lying along +x from 0 (end a) to L (end b);
// the board turns and places them. Logic parts are built around their anchor.

const K = 1.5; // body scale for circuit parts
const mats = {};
const mat = (k, make) => (mats[k] ||= make());
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.1, ...o });
const metal = () => mat('metal', () => std(0xc9ccd1, { metalness: 0.85, roughness: 0.32 }));

let glowTex;
export function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, 'rgba(255,255,255,1)');
  r.addColorStop(0.25, 'rgba(255,255,255,.55)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  glowTex.colorSpace = THREE.SRGBColorSpace;
  return glowTex;
}
function glow(color, size) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, opacity: 0 }));
  s.renderOrder = 10;
  s.scale.setScalar(size);
  s.userData.noPick = true;
  return s;
}

export function label(text, cls = 'lab-tag') {
  const el = document.createElement('div');
  el.className = cls;
  el.textContent = text;
  const o = new CSS2DObject(el);
  o.userData.noPick = true;
  return o;
}

function rod(x0, x1, r, m, y) {
  const len = Math.max(1e-3, x1 - x0);
  const g = new THREE.CylinderGeometry(r, r, len, 10);
  g.rotateZ(Math.PI / 2);
  const mesh = new THREE.Mesh(g, m);
  mesh.position.set((x0 + x1) / 2, y, 0);
  mesh.castShadow = true;
  return mesh;
}
const sphere = (r, m) => {
  const s = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), m);
  s.castShadow = true;
  return s;
};
// metal legs from each end of the run up into a body sitting at the middle
function leads(group, L, half, y) {
  const c = L / 2;
  group.add(rod(0, c - half, 0.03, metal(), y));
  group.add(rod(c + half, L, 0.03, metal(), y));
  const foot = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 14);
  for (const x of [0, L]) {
    const f = new THREE.Mesh(foot, mat('solder', () => std(0xb9bec6, { metalness: 0.9, roughness: 0.25 })));
    f.position.set(x, 0.015, 0);
    group.add(f);
  }
}

// A fat, invisible tube so thin parts are easy to click.
function hitbox(L, r = 0.2) {
  const g = new THREE.BoxGeometry(L + 0.2, r * 2, r * 2);
  const m = new THREE.Mesh(g, mat('hit', () => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })));
  m.position.set(L / 2, r, 0);
  m.userData.hit = true;
  return m;
}

// ---- circuit parts -----------------------------------------------------

export function buildCircuitPart(p, L) {
  const g = new THREE.Group();
  const c = L / 2;
  const out = { group: g, update: () => {} };
  g.add(hitbox(L));
  // part bodies sit in their own group, scaled up so they read at board size
  const bg = new THREE.Group();
  bg.position.set(c, 0, 0);
  bg.scale.setScalar(K);
  g.add(bg);

  if (p.type === 'wire') {
    const m = std(0xc7834f, { roughness: 0.4, metalness: 0.35 });
    g.add(rod(0, L, 0.05, m, 0.06));
    for (const x of [0, L]) {
      const s = sphere(0.065, m);
      s.position.set(x, 0.06, 0);
      g.add(s);
    }
    out.update = ({ color }) => {
      m.color.copy(color);
      m.emissive.copy(color).multiplyScalar(0.18);
    };
    return out;
  }

  if (p.type === 'resistor') {
    const half = Math.min(0.4, (c - 0.12) / K);
    leads(g, L, (half) * K, 0.16 * K);
    const bodyM = std(0xd8c29a, { roughness: 0.6 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, half * 2 - 0.22, 6, 16), bodyM);
    body.rotation.z = Math.PI / 2;
    body.position.set(0, 0.16, 0);
    body.castShadow = true;
    bg.add(body);
    const bands = [...resistorBands(p.value), 10];
    bands.forEach((d, k) => {
      const col = d === 10 ? 0xc9a24a : BAND_HEX[d];
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.128, 0.128, 0.045, 18), mat(`band${col}`, () => std(col, { roughness: 0.5, metalness: d === 10 ? 0.6 : 0 })));
      b.rotation.z = Math.PI / 2;
      b.position.set(-half * 0.55 + k * half * 0.32 + (k === 3 ? half * 0.12 : 0), 0.16, 0);
      bg.add(b);
    });
    const tag = label(si(p.value, 'Ω', 2));
    tag.position.set(0, 0.48, 0);
    bg.add(tag);
    out.update = ({ r }) => {
      // glows red-hot past its ¼ watt rating
      const hot = Math.min(1, Math.max(0, (r?.power || 0) / 0.25 - 0.6));
      bodyM.emissive.setRGB(hot * 0.9, hot * 0.18, 0);
    };
    return out;
  }

  if (p.type === 'battery') {
    const half = Math.min(0.5, (c - 0.1) / K);
    leads(g, L, (half) * K, 0.2 * K);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, half * 2 - 0.12, 28), mat('batt', () => std(0x23272e, { roughness: 0.35, metalness: 0.4 })));
    body.rotation.z = Math.PI / 2;
    body.position.set(-0.06, 0.2, 0);
    body.castShadow = true;
    bg.add(body);
    // the + end (towards b) is copper-coloured with a nub
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.192, 0.192, 0.16, 28), mat('battcap', () => std(0xd79a3c, { roughness: 0.3, metalness: 0.75 })));
    cap.rotation.z = Math.PI / 2;
    cap.position.set(half - 0.2, 0.2, 0);
    bg.add(cap);
    const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 16), metal());
    nub.rotation.z = Math.PI / 2;
    nub.position.set(half - 0.08, 0.2, 0);
    bg.add(nub);
    const tag = label(`${p.value} V`, 'lab-tag strong');
    tag.position.set(0, 0.55, 0);
    bg.add(tag);
    const plus = label('+', 'lab-sign');
    plus.position.set(half + 0.05, 0.32, 0.22);
    const minus = label('−', 'lab-sign');
    minus.position.set(-half - 0.05, 0.32, 0.22);
    bg.add(plus, minus);
    return out;
  }

  if (p.type === 'capacitor') {
    const half = Math.min(0.34, (c - 0.1) / K);
    leads(g, L, (half) * K, 0.2 * K);
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, half * 2, 28), mat('capcan', () => std(0x1f3f6a, { roughness: 0.35, metalness: 0.3 })));
    can.rotation.z = Math.PI / 2;
    can.position.set(0, 0.21, 0);
    can.castShadow = true;
    bg.add(can);
    // a light ring that fills with charge
    const ringM = new THREE.MeshBasicMaterial({ color: 0x58c4dd, transparent: true, opacity: 0.15, toneMapped: false });
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.205, 0.07, 28, 1, true), ringM);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(0, 0.21, 0);
    bg.add(ring);
    const tag = label(p.value >= 1000 ? `${p.value / 1000} mF` : `${p.value} µF`);
    tag.position.set(0, 0.56, 0);
    bg.add(tag);
    out.update = ({ r, vmax }) => {
      const k = Math.min(1, Math.abs(r?.v || 0) / Math.max(1, vmax));
      ringM.opacity = 0.15 + 0.85 * k;
      ring.scale.set(1, 1, 1);
      tag.element.textContent = `${p.value >= 1000 ? `${p.value / 1000} mF` : `${p.value} µF`} · ${(Math.abs(r?.v || 0)).toFixed(1)} V`;
    };
    return out;
  }

  if (p.type === 'led') {
    const info = LED_COLORS[p.color] || LED_COLORS.red;
    const col = new THREE.Color(info.hex);
    leads(g, L, (0.12) * K, 0.08 * K);
    const lensM = new THREE.MeshStandardMaterial({ color: col.clone().multiplyScalar(0.55), roughness: 0.15, metalness: 0, transparent: true, opacity: 0.88, emissive: col, emissiveIntensity: 0 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), lensM);
    dome.position.set(0, 0.34, 0);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.24, 24), lensM);
    stem.position.set(0, 0.22, 0);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.175, 0.04, 24), lensM);
    rim.position.set(0, 0.11, 0);
    for (const m of [dome, stem, rim]) {
      m.castShadow = true;
      bg.add(m);
    }
    // a little arrow on the board: the way current is allowed through
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.16, 3),
      mat('arrow', () => new THREE.MeshBasicMaterial({ color: 0x58c4dd, transparent: true, opacity: 0.55 }))
    );
    arrow.rotation.z = -Math.PI / 2;
    arrow.position.set(0.26, 0.04, 0.2);
    bg.add(arrow);
    const halo = glow(col, 1.4);
    halo.position.set(0, 0.32, 0);
    bg.add(halo);
    const tag = label(info.label);
    tag.position.set(0, 0.62, 0);
    bg.add(tag);
    out.update = ({ r, broken }) => {
      if (broken) {
        lensM.color.setHex(0x2a2a2a);
        lensM.emissiveIntensity = 0;
        halo.material.opacity = 0;
        tag.element.textContent = 'Burnt out';
        tag.element.classList.add('bad');
        return;
      }
      const k = r?.lit ? Math.min(1, Math.sqrt(Math.max(0, r.i) / 0.02)) : 0;
      lensM.emissiveIntensity = 0.1 + 2.4 * k;
      halo.material.opacity = 0.9 * k;
      halo.scale.setScalar(0.8 + 1.4 * k);
    };
    return out;
  }

  if (p.type === 'bulb') {
    leads(g, L, (0.16) * K, 0.08 * K);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.18, 20), metal());
    base.position.set(0, 0.12, 0);
    base.castShadow = true;
    bg.add(base);
    const glass = new THREE.Mesh(new THREE.SphereGeometry(0.27, 28, 20), new THREE.MeshStandardMaterial({ color: 0xe8f0ff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.25, depthWrite: false }));
    glass.position.set(0, 0.46, 0);
    bg.add(glass);
    const filM = new THREE.MeshStandardMaterial({ color: 0x553322, emissive: 0xffb257, emissiveIntensity: 0 });
    const fil = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 6, 20, Math.PI), filM);
    fil.position.set(0, 0.42, 0);
    bg.add(fil);
    const halo = glow(0xffc070, 2.2);
    halo.position.set(0, 0.46, 0);
    bg.add(halo);
    out.update = ({ r }) => {
      const k = Math.min(1, Math.sqrt((r?.power || 0) / 2.7));
      filM.emissiveIntensity = 4 * k;
      halo.material.opacity = 0.95 * k;
      halo.scale.setScalar(1 + 1.8 * k);
    };
    return out;
  }

  if (p.type === 'switch') {
    const base = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.5, L - 0.2), 0.12, 0.42), mat('swbase', () => std(0x2a313b, { roughness: 0.7 })));
    base.position.set(c, 0.06, 0);
    base.castShadow = true;
    g.add(base);
    for (const x of [0.12, L - 0.12]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.22), metal());
      post.position.set(x, 0.18, 0);
      g.add(post);
    }
    const hinge = new THREE.Group();
    hinge.position.set(0.12, 0.28, 0);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(L - 0.24, 0.05, 0.12), metal());
    blade.position.set((L - 0.24) / 2, 0, 0);
    blade.castShadow = true;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), mat('knob', () => std(0xfc6255, { roughness: 0.4 })));
    knob.position.set(L - 0.32, 0.09, 0);
    hinge.add(blade, knob);
    g.add(hinge);
    let ang = p.on ? 0 : 0.5;
    hinge.rotation.z = ang;
    out.update = ({ dt }) => {
      const goal = p.on ? 0 : 0.5;
      ang += (goal - ang) * Math.min(1, dt * 14);
      hinge.rotation.z = ang;
    };
    return out;
  }
  return out;
}

// ---- logic parts -------------------------------------------------------

function gateShape(type) {
  const s = new THREE.Shape();
  const bubble = type === 'nand' || type === 'nor' || type === 'not';
  const front = bubble ? -0.42 : -0.25;
  if (type === 'and' || type === 'nand') {
    const r = 0.7;
    s.moveTo(-1.65, -r);
    s.lineTo(front - r, -r);
    s.absarc(front - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
    s.lineTo(-1.65, r);
    s.lineTo(-1.65, -r);
  } else if (type === 'or' || type === 'nor' || type === 'xor') {
    const back = type === 'xor' ? -1.5 : -1.65;
    s.moveTo(back, -0.7);
    s.quadraticCurveTo(-0.95, -0.72, front, 0);
    s.quadraticCurveTo(-0.95, 0.72, back, 0.7);
    s.quadraticCurveTo(back + 0.32, 0, back, -0.7);
  } else {
    s.moveTo(-1.6, -0.45);
    s.lineTo(front, 0);
    s.lineTo(-1.6, 0.45);
    s.lineTo(-1.6, -0.45);
  }
  return { shape: s, bubble, front };
}

function extrude(shape, depth, m) {
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 2, curveSegments: 24 });
  geo.rotateX(Math.PI / 2); // shape y → board z, extrusion goes down
  geo.translate(0, depth + 0.02, 0);
  const mesh = new THREE.Mesh(geo, m);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function flatLead(from, to, m) {
  const a = new THREE.Vector3(from[0], 0.06, from[1]);
  const b = new THREE.Vector3(to[0], 0.06, to[1]);
  const len = a.distanceTo(b);
  const geo = new THREE.CylinderGeometry(0.035, 0.035, len, 8);
  geo.rotateZ(Math.PI / 2);
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x);
  return mesh;
}

const ON = new THREE.Color(0xffc44d);
const OFF = new THREE.Color(0x3c5168);
export const logicColor = (v, clash, floating) => (clash ? new THREE.Color(0xfc6255) : floating ? new THREE.Color(0x2a3442) : v ? ON : OFF);

function pinMat() {
  return std(0x3c5168, { metalness: 0.5, roughness: 0.4 });
}
function setPin(m, v) {
  m.color.copy(v ? ON : OFF);
  m.emissive.copy(v ? ON : OFF).multiplyScalar(v ? 0.7 : 0);
}

const SEG = {
  0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg',
};

export function buildLogicPart(p) {
  const g = new THREE.Group();
  const out = { group: g, update: () => {} };
  const hit = (w, d, cx, cz) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.5, d), mat('hit', () => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })));
    m.position.set(cx, 0.25, cz);
    m.userData.hit = true;
    g.add(m);
  };

  if (GATES[p.type]) {
    const { shape, bubble, front } = gateShape(p.type);
    const body = extrude(shape, 0.3, mat('gate', () => std(0x2e3d4f, { roughness: 0.4, metalness: 0.2 })));
    g.add(body);
    if (p.type === 'xor') {
      const arc = new THREE.Shape();
      arc.moveTo(-1.78, -0.7);
      arc.quadraticCurveTo(-1.46, 0, -1.78, 0.7);
      arc.lineTo(-1.88, 0.7);
      arc.quadraticCurveTo(-1.56, 0, -1.88, -0.7);
      arc.lineTo(-1.78, -0.7);
      g.add(extrude(arc, 0.3, mat('gate', () => std(0x2e3d4f))));
    }
    // a thin accent line on top, so the shape reads from above
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry, 30), mat('gateEdge', () => new THREE.LineBasicMaterial({ color: 0x58c4dd, transparent: true, opacity: 0.35 })));
    g.add(edge);
    const outM = pinMat();
    const inMs = [];
    const ins = GATES[p.type].ins === 1 ? [[-2, 0]] : [[-2, -1], [-2, 1]];
    for (const pin of ins) {
      const m = pinMat();
      inMs.push(m);
      g.add(flatLead(pin, [-1.5, pin[1] * 0.45], m));
    }
    if (bubble) {
      const b = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.035, 8, 20), outM);
      b.rotation.x = Math.PI / 2;
      b.position.set(front + 0.12, 0.16, 0);
      g.add(b);
    }
    g.add(flatLead([bubble ? front + 0.2 : front, 0], [0, 0], outM));
    const tag = label(GATES[p.type].label, 'lab-gate');
    tag.position.set(-0.95, 0.42, 0);
    g.add(tag);
    hit(2, GATES[p.type].ins === 1 ? 1 : 2.2, -1, 0);
    out.update = ({ out: v, ins: iv }) => {
      setPin(outM, v);
      inMs.forEach((m, k) => setPin(m, iv?.[k]));
    };
    return out;
  }

  if (p.type === 'input' || p.type === 'clock') {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.18, 0.62), mat('io', () => std(0x1f2731, { roughness: 0.55 })));
    box.position.set(-0.8, 0.09, 0);
    box.castShadow = true;
    g.add(box);
    const track = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.18), mat('track', () => std(0x0c1117)));
    track.position.set(-0.8, 0.19, 0);
    g.add(track);
    const knobM = std(0x3c5168, { roughness: 0.4 });
    const knob = new THREE.Mesh(p.type === 'clock' ? new THREE.CylinderGeometry(0.15, 0.15, 0.08, 20) : new THREE.BoxGeometry(0.28, 0.12, 0.26), knobM);
    knob.position.set(-1.0, 0.25, 0);
    knob.castShadow = true;
    g.add(knob);
    const pin = pinMat();
    g.add(flatLead([-0.25, 0], [0, 0], pin));
    const tag = label(p.type === 'clock' ? 'CLK' : p.label || '?', 'lab-io');
    tag.position.set(-0.8, 0.5, -0.45);
    g.add(tag);
    hit(1.3, 0.8, -0.8, 0);
    let x = -1.0;
    out.update = ({ out: v, dt }) => {
      if (p.type === 'input') {
        x += ((v ? -0.6 : -1.0) - x) * Math.min(1, dt * 16);
        knob.position.x = x;
      } else knob.position.x = -0.8;
      knobM.color.copy(v ? ON : OFF);
      knobM.emissive.copy(ON).multiplyScalar(v ? 0.8 : 0);
      setPin(pin, v);
      tag.element.textContent = p.type === 'clock' ? 'CLK' : p.label || '?';
    };
    return out;
  }

  if (p.type === 'lamp') {
    const pin = pinMat();
    g.add(flatLead([0, 0], [0.4, 0], pin));
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.1, 28), mat('io', () => std(0x1f2731)));
    base.position.set(0.7, 0.05, 0);
    g.add(base);
    const lensM = new THREE.MeshStandardMaterial({ color: 0x3a3320, roughness: 0.15, transparent: true, opacity: 0.9, emissive: ON, emissiveIntensity: 0 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), lensM);
    dome.position.set(0.7, 0.1, 0);
    dome.castShadow = true;
    g.add(dome);
    const halo = glow(0xffc44d, 1.6);
    halo.position.set(0.7, 0.25, 0);
    g.add(halo);
    const tag = label(p.label || '?', 'lab-io');
    tag.position.set(0.7, 0.55, -0.45);
    g.add(tag);
    hit(1.1, 0.8, 0.55, 0);
    out.update = ({ out: v }) => {
      lensM.emissiveIntensity = v ? 2.2 : 0.05;
      lensM.color.setHex(v ? 0x806a2a : 0x3a3320);
      halo.material.opacity = v ? 0.85 : 0;
      setPin(pin, v);
      tag.element.textContent = p.label || '?';
    };
    return out;
  }

  if (p.type === 'display') {
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 3.7), mat('io', () => std(0x1f2731)));
    box.position.set(1.35, 0.08, 1.5);
    box.castShadow = true;
    g.add(box);
    const pins = [0, 1, 2, 3].map((k) => {
      const m = pinMat();
      g.add(flatLead([0, k], [0.2, k], m));
      const t = label(String(1 << k), 'lab-pin');
      t.position.set(0.32, 0.25, k);
      g.add(t);
      return m;
    });
    // two seven-segment digits, built from thin bars
    const segM = () => new THREE.MeshStandardMaterial({ color: 0x241c10, emissive: ON, emissiveIntensity: 0 });
    const digits = [0, 1].map((d) => {
      const segs = {};
      const cx = 0.95 + d * 0.95;
      const cz = 1.5;
      const w = 0.6;
      const h = 0.7;
      const bar = (lx, lz, horiz) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(horiz ? 0.08 : w - 0.1, 0.04, horiz ? h - 0.1 : 0.08), segM());
        m.position.set(cx + lx, 0.18, cz + lz);
        g.add(m);
        return m;
      };
      // a top, b right-top, c right-bottom, d bottom, e left-bottom, f left-top, g middle
      // (the top of the digit is towards the back of the board)
      segs.a = bar(0, -h, false);
      segs.g = bar(0, 0, false);
      segs.d = bar(0, h, false);
      segs.f = bar(-w / 2, -h / 2, true);
      segs.b = bar(w / 2, -h / 2, true);
      segs.e = bar(-w / 2, h / 2, true);
      segs.c = bar(w / 2, h / 2, true);
      return segs;
    });
    hit(2.5, 4, 1.35, 1.5);
    out.update = ({ value = 0, ins: iv }) => {
      pins.forEach((m, k) => setPin(m, iv?.[k]));
      const tens = Math.floor(value / 10);
      const ones = value % 10;
      const show = [tens ? SEG[tens] : '', SEG[ones]];
      digits.forEach((segs, d) => {
        for (const [k, m] of Object.entries(segs)) m.material.emissiveIntensity = show[d].includes(k) ? 2.2 : 0.02;
      });
    };
    return out;
  }
  return out;
}
