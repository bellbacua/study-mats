import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Small 3D models of common parts, built from plain shapes in three.js (our own
// models, nothing downloaded). Drag to turn them. kind:
//   resistor { bands: ['#hex', ...] } · dip { pins, label } · to92 { label } · to220 { label }
//   led { color } · ecap { label } · ccap · diode
// The model is rebuilt when `opts` changes (for the colour-code tool).

const metal = () => new THREE.MeshStandardMaterial({ color: 0xc9ccd1, metalness: 0.95, roughness: 0.28 });
const plastic = (color, rough = 0.55) => new THREE.MeshStandardMaterial({ color, metalness: 0.05, roughness: rough });

function textTexture(text, { bg = '#1a1b1f', fg = '#d8dadf', w = 512, h = 128, size = 64 } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.fillStyle = fg;
  g.font = `600 ${size}px "JetBrains Mono", monospace`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function leg(len, r = 0.035) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12), metal());
  return m;
}

function build(kind, o) {
  const g = new THREE.Group();
  if (kind === 'resistor') {
    // a dog-bone body: wider at both ends, like a real carbon-film resistor
    const prof = [
      [0, -1.25],
      [0.2, -1.25],
      [0.36, -1.15],
      [0.38, -0.85],
      [0.3, -0.6],
      [0.3, 0.6],
      [0.38, 0.85],
      [0.36, 1.15],
      [0.2, 1.25],
      [0, 1.25],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), plastic(o.body || 0xd9c39a, 0.6));
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const bands = o.bands || [];
    // digit bands sit together at one end; the tolerance band stands apart
    const spots = bands.length === 5 ? [-0.95, -0.55, -0.25, 0.05, 0.85] : bands.length === 4 ? [-0.95, -0.5, -0.1, 0.85] : bands.map((_, i) => -0.9 + i * 0.4);
    bands.forEach((hex, i) => {
      const x = spots[i];
      const r = Math.abs(x) > 0.7 ? 0.385 : 0.305;
      const b = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.16, 48, 1, true), new THREE.MeshStandardMaterial({ color: hex, roughness: 0.45, metalness: hex === '#d4af37' || hex === '#c0c0c0' ? 0.8 : 0.05, side: THREE.DoubleSide }));
      b.rotation.z = Math.PI / 2;
      b.position.x = x;
      g.add(b);
    });
    for (const s of [-1, 1]) {
      const l = leg(1.4);
      l.rotation.z = Math.PI / 2;
      l.position.x = s * 1.9;
      g.add(l);
    }
  } else if (kind === 'diode') {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.3, 40), plastic(0x161616, 0.35));
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.285, 0.18, 40, 1, true), plastic(0xd0d3d8, 0.4));
    band.rotation.z = Math.PI / 2;
    band.position.x = 0.48;
    g.add(band);
    for (const s of [-1, 1]) {
      const l = leg(1.5);
      l.rotation.z = Math.PI / 2;
      l.position.x = s * 1.4;
      g.add(l);
    }
  } else if (kind === 'dip') {
    const n = (o.pins || 8) / 2;
    const len = n * 0.254 * 2 + 0.2;
    const body = new THREE.Mesh(new THREE.BoxGeometry(len, 0.32, 1.3), [plastic(0x1b1c20, 0.7), plastic(0x1b1c20, 0.7), new THREE.MeshStandardMaterial({ map: textTexture(o.label || '', { w: 1024, h: 256, size: Math.min(110, 1700 / Math.max(6, (o.label || '').length)) }), roughness: 0.75 }), plastic(0x1b1c20, 0.7), plastic(0x1b1c20, 0.7), plastic(0x1b1c20, 0.7)]);
    body.position.y = 0.36;
    g.add(body);
    const notch = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.02, 24), plastic(0x0c0c0e));
    notch.position.set(-len / 2 + 0.02, 0.53, 0);
    notch.rotation.z = Math.PI / 2;
    g.add(notch);
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.01, 20), plastic(0x0c0c0e));
    dot.position.set(-len / 2 + 0.28, 0.525, 0.4);
    g.add(dot);
    for (let i = 0; i < n; i += 1) {
      for (const s of [-1, 1]) {
        const x = -len / 2 + 0.2 + i * 0.508 + 0.05;
        const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.22), metal());
        shoulder.position.set(x, 0.36, s * 0.75);
        g.add(shoulder);
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.7, 0.03), metal());
        pin.position.set(x, 0.02, s * 0.86);
        g.add(pin);
      }
    }
    g.position.x = 0;
  } else if (kind === 'to92') {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 0.5, Math.PI * 0.15, Math.PI * 0.85, true);
    shape.lineTo(Math.cos(Math.PI * 0.15) * 0.5, Math.sin(Math.PI * 0.15) * 0.5);
    const body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.9, bevelEnabled: false, curveSegments: 32 }), [plastic(0x1b1c20, 0.6), plastic(0x1b1c20, 0.6)]);
    body.rotation.x = -Math.PI / 2;
    body.position.set(0, 0.6, 0.16);
    g.add(body);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.8), new THREE.MeshStandardMaterial({ map: textTexture(o.label || '', { w: 512, h: 512, size: 80 }), roughness: 0.7 }));
    face.position.set(0, 1.05, 0.28);
    g.add(face);
    for (const x of [-0.25, 0, 0.25]) {
      const l = leg(1.5, 0.03);
      l.position.set(x, -0.15, 0);
      g.add(l);
    }
  } else if (kind === 'to220') {
    const tab = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.06), metal());
    tab.position.set(0, 1.55, -0.18);
    g.add(tab);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 24), plastic(0x0b0c0f));
    hole.rotation.x = Math.PI / 2;
    hole.position.set(0, 1.6, -0.16);
    g.add(hole);
    const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.9, 0.42), [plastic(0x1b1c20), plastic(0x1b1c20), plastic(0x1b1c20), plastic(0x1b1c20), new THREE.MeshStandardMaterial({ map: textTexture(o.label || '', { w: 512, h: 460, size: 96 }), roughness: 0.7 }), plastic(0x1b1c20)]);
    body.position.set(0, 0.8, 0);
    g.add(body);
    for (const x of [-0.25, 0, 0.25]) {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.04), metal());
      l.position.set(x, -0.35, 0);
      g.add(l);
    }
  } else if (kind === 'led') {
    const col = new THREE.Color(o.color || '#ff3b2f');
    const lens = new THREE.MeshPhysicalMaterial({ color: col, transmission: 0.6, roughness: 0.15, thickness: 0.5, emissive: col, emissiveIntensity: 0.55, transparent: true, opacity: 0.92 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), lens);
    dome.position.y = 1.1;
    g.add(dome);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.7, 40), lens);
    tube.position.y = 0.75;
    g.add(tube);
    // the rim has a flat side on the cathode (minus) leg
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 40, 1, false, 0.35, Math.PI * 2 - 0.7), lens);
    rim.position.y = 0.4;
    g.add(rim);
    const l1 = leg(2.1, 0.03);
    l1.position.set(-0.13, -0.55, 0);
    g.add(l1);
    const l2 = leg(1.7, 0.03);
    l2.position.set(0.13, -0.35, 0);
    g.add(l2);
  } else if (kind === 'ecap') {
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.6, 48), plastic(o.body || 0x1d3f8a, 0.4));
    can.position.y = 0.9;
    g.add(can);
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.505, 0.505, 1.5, 48, 1, true, -0.35, 0.7), new THREE.MeshStandardMaterial({ map: textTexture('−  −  −', { bg: '#c9ced8', fg: '#1a2030', w: 128, h: 512, size: 70 }), roughness: 0.5, side: THREE.DoubleSide }));
    stripe.position.y = 0.9;
    g.add(stripe);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.02, 48), metal());
    top.position.y = 1.71;
    g.add(top);
    const l1 = leg(1.6, 0.03);
    l1.position.set(-0.17, -0.7, 0);
    g.add(l1);
    const l2 = leg(1.2, 0.03);
    l2.position.set(0.17, -0.5, 0);
    g.add(l2);
    g.rotation.y = -0.9;
  } else if (kind === 'ccap') {
    const disc = new THREE.Mesh(new THREE.SphereGeometry(0.55, 40, 24), plastic(0xd88a2c, 0.45));
    disc.scale.set(1, 1, 0.32);
    disc.position.y = 1;
    g.add(disc);
    for (const x of [-0.18, 0.18]) {
      const l = leg(1.8, 0.03);
      l.position.set(x, -0.1, 0);
      g.add(l);
    }
  }
  return g;
}

export default function Part3D({ kind, opts = {}, height = 220, label }) {
  const ref = useRef(null);
  const key = JSON.stringify([kind, opts]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return undefined; // no WebGL: the photo and diagram still explain the part
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const key1 = new THREE.DirectionalLight(0xffffff, 1.6);
    key1.position.set(3, 5, 4);
    scene.add(key1, new THREE.AmbientLight(0xffffff, 0.35));
    const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const flat = kind === 'resistor' || kind === 'diode';
    cam.position.set(flat ? 0.8 : 2.6, flat ? 1.6 : 2.2, flat ? 5.2 : 4.4);
    const model = build(kind, opts);
    const box = new THREE.Box3().setFromObject(model);
    const c = box.getCenter(new THREE.Vector3());
    model.position.sub(c);
    scene.add(model);
    // back the camera off until the whole model fits, whatever its size
    const radius = box.getSize(new THREE.Vector3()).length() / 2;
    const dist = (radius / Math.sin(((cam.fov / 2) * Math.PI) / 180)) * (flat ? 0.78 : 0.95);
    cam.position.normalize().multiplyScalar(dist);
    const controls = new OrbitControls(cam, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotateSpeed = 1.2;
    const fit = () => {
      const w = el.clientWidth || 300;
      renderer.setSize(w, height);
      cam.aspect = w / height;
      cam.updateProjectionMatrix();
    };
    fit();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    ro?.observe(el);
    let raf = 0;
    let visible = true;
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((es) => (visible = es.some((e) => e.isIntersecting))) : null;
    io?.observe(el);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      controls.update();
      renderer.render(scene, cam);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        for (const m of ms) {
          m.map?.dispose();
          m.dispose();
        }
      });
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // the model only depends on what `key` captures
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, height]);
  return <div ref={ref} className="part3d" style={{ height }} role="img" aria-label={label ? `3D model of ${label}. Drag to turn it.` : '3D model. Drag to turn it.'} />;
}
