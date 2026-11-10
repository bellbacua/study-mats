import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import katex from 'katex';
import { C, css } from './theme';

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const smooth = (t) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};
export const range = (a, b, n) =>
  Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));

// TeX for a polynomial written the way a person would: poly([[2,'x^2'],[-1,'x'],[3,'']]) → "2x^2 - x + 3"
export function poly(terms) {
  let out = '';
  for (const [c, v] of terms) {
    if (c === 0) continue;
    const mag = Math.abs(c);
    const coef = v && mag === 1 ? '' : `${mag}`;
    out += out ? (c < 0 ? ' - ' : ' + ') : c < 0 ? '-' : '';
    out += `${coef}${v}`;
  }
  return out || '0';
}

const v3 = (p) => new THREE.Vector3(p[0], p[1], p[2] ?? 0);

function texHtml(src) {
  try {
    return katex.renderToString(src, { throwOnError: false, strict: false });
  } catch {
    return src;
  }
}

const ALIGN = {
  center: [0.5, 0.5],
  left: [0, 0.5],
  right: [1, 0.5],
  above: [0.5, 1],
  below: [0.5, 0],
};

// Small "manim-like" vocabulary of shapes for a Stage.
export function createKit(stage) {
  const creatable = [];
  const root = stage.scene;

  function add(obj, parent) {
    (parent || root).add(obj);
    return obj;
  }

  function lineMaterial(opts) {
    const m = new LineMaterial({
      color: opts.color ?? C.blue,
      linewidth: opts.width ?? 3,
      transparent: true,
      opacity: opts.opacity ?? 1,
      dashed: !!opts.dashed,
      dashSize: opts.dashSize ?? 0.18,
      gapSize: opts.gapSize ?? 0.12,
      worldUnits: false,
    });
    m.resolution.set(stage.container.clientWidth || 1, stage.container.clientHeight || 1);
    stage.lineMaterials.add(m);
    return m;
  }

  function line(points, opts = {}) {
    const mat = lineMaterial(opts);
    const obj = new Line2(new LineGeometry(), mat);
    obj.frustumCulled = false;
    obj.renderOrder = opts.z ?? 2;
    let segs = 0;
    const api = {
      obj,
      set(pts) {
        if (pts.length < 2) {
          obj.visible = false;
          return api;
        }
        obj.visible = api._visible !== false;
        const flat = [];
        for (const p of pts) flat.push(p[0], p[1], p[2] ?? 0);
        const start = obj.geometry.attributes.instanceStart;
        if (start && start.data.array.length === (pts.length - 1) * 6) {
          const arr = start.data.array;
          for (let i = 0; i < pts.length - 1; i++) {
            arr.set(flat.slice(i * 3, i * 3 + 6), i * 6);
          }
          start.data.needsUpdate = true;
        } else {
          // A fresh geometry: the renderer caches the instance count per
          // geometry, so growing one in place would keep drawing the old length.
          obj.geometry.dispose();
          obj.geometry = new LineGeometry();
          obj.geometry.setPositions(flat);
        }
        segs = pts.length - 1;
        if (opts.dashed) obj.computeLineDistances();
        api.applyIntro(api._intro ?? 1);
        return api;
      },
      applyIntro(t) {
        api._intro = t;
        if (opts.create !== false) obj.geometry.instanceCount = Math.max(1, Math.ceil(segs * smooth(t)));
        else obj.geometry.instanceCount = segs;
      },
      color(c) {
        mat.color.set(c);
        return api;
      },
      opacity(a) {
        mat.opacity = a;
        return api;
      },
      visible(b) {
        api._visible = b;
        obj.visible = b;
        return api;
      },
    };
    creatable.push(api);
    api.set(points);
    add(obj, opts.parent);
    return api;
  }

  function arrow(from, to, opts = {}) {
    const color = opts.color ?? C.yellow;
    const group = add(new THREE.Group(), opts.parent);
    const shaft = line([from, to], { ...opts, color, parent: group, create: false });
    const headLen = opts.head ?? 0.32;
    let head;
    if (stage.is3d) {
      head = new THREE.Mesh(
        new THREE.ConeGeometry(headLen * 0.45, headLen, 20),
        new THREE.MeshStandardMaterial({ color })
      );
    } else {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(-headLen, headLen * 0.45);
      s.lineTo(-headLen, -headLen * 0.45);
      s.closePath();
      head = new THREE.Mesh(
        new THREE.ShapeGeometry(s),
        new THREE.MeshBasicMaterial({ color, transparent: true })
      );
      head.renderOrder = 3;
    }
    group.add(head);
    const api = {
      obj: group,
      set(a, b) {
        const A = v3(a);
        const B = v3(b);
        const d = B.clone().sub(A);
        const len = d.length();
        group.visible = len > 1e-3 && api._visible !== false;
        if (!group.visible) return api;
        const hl = Math.min(headLen, len * 0.6);
        const shaftEnd = B.clone().sub(d.clone().normalize().multiplyScalar(hl * 0.8));
        shaft.set([a, [shaftEnd.x, shaftEnd.y, shaftEnd.z]]);
        head.scale.setScalar(hl / headLen);
        if (stage.is3d) {
          head.position.copy(B.clone().sub(d.clone().normalize().multiplyScalar(hl / 2)));
          head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
        } else {
          head.position.set(B.x, B.y, 0.01);
          head.rotation.z = Math.atan2(d.y, d.x);
        }
        return api;
      },
      color(c) {
        shaft.color(c);
        head.material.color.set(c);
        return api;
      },
      opacity(a) {
        shaft.opacity(a);
        head.material.transparent = true;
        head.material.opacity = a;
        return api;
      },
      visible(b) {
        api._visible = b;
        group.visible = b;
        return api;
      },
    };
    api.set(from, to);
    return api;
  }

  function dot(p, opts = {}) {
    const r = opts.r ?? 0.09;
    const color = opts.color ?? C.white;
    const mesh = stage.is3d
      ? new THREE.Mesh(
          new THREE.SphereGeometry(r, 24, 16),
          new THREE.MeshStandardMaterial({
            color,
            emissive: opts.glow ? color : 0x000000,
            emissiveIntensity: opts.glow ? 0.6 : 0,
            roughness: 0.4,
          })
        )
      : new THREE.Mesh(
          new THREE.CircleGeometry(r, 32),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: opts.opacity ?? 1 })
        );
    mesh.renderOrder = opts.z ?? 4;
    add(mesh, opts.parent);
    const api = {
      obj: mesh,
      set(q) {
        mesh.position.set(q[0], q[1], q[2] ?? 0.02);
        return api;
      },
      color(c) {
        mesh.material.color.set(c);
        if (opts.glow) mesh.material.emissive?.set(c);
        return api;
      },
      scale(s) {
        mesh.scale.setScalar(s);
        return api;
      },
      opacity(a) {
        mesh.material.transparent = true;
        mesh.material.opacity = a;
        return api;
      },
      visible(b) {
        mesh.visible = b;
        return api;
      },
    };
    return api.set(p);
  }

  function label(content, p, opts = {}) {
    const el = document.createElement('div');
    el.className = `viz-label ${opts.cls || ''}`;
    el.style.color = typeof opts.color === 'number' ? css(opts.color) : opts.color || C.text;
    // em, so labels shrink with the canvas (see .scene-canvas font-size)
    if (opts.size) el.style.fontSize = `${opts.size / 16}em`;
    const obj = new CSS2DObject(el);
    const [cx, cy] = ALIGN[opts.align || 'center'];
    if (obj.center) obj.center.set(cx, cy);
    add(obj, opts.parent);
    let last = null;
    const api = {
      obj,
      el,
      set(c) {
        if (c === last) return api;
        last = c;
        if (opts.tex === false) el.textContent = c;
        else el.innerHTML = texHtml(c);
        return api;
      },
      pos(q) {
        obj.position.set(q[0], q[1], q[2] ?? 0.5);
        return api;
      },
      color(c) {
        el.style.color = typeof c === 'number' ? css(c) : c;
        return api;
      },
      visible(b) {
        obj.visible = b;
        el.style.display = b ? '' : 'none';
        return api;
      },
      opacity(a) {
        el.style.opacity = a;
        return api;
      },
    };
    return api.set(content).pos(p);
  }

  const lineRaw = (...a) => line(...a);
  const labelRaw = (...a) => label(...a);

  // A manim-style NumberPlane: faint blue grid, bright axes, numeric ticks.
  function plane(opts = {}) {
    const [x0, x1, xs = 1] = opts.x || [-7, 7, 1];
    const [y0, y1, ys = 1] = opts.y || [-4, 4, 1];
    const sx = opts.sx ?? 1;
    const sy = opts.sy ?? 1;
    const ox = opts.origin?.[0] ?? 0;
    const oy = opts.origin?.[1] ?? 0;
    const toW = (x, y) => [ox + x * sx, oy + y * sy];
    const ax = opts.axisAt ?? [Math.max(x0, Math.min(0, x1)), Math.max(y0, Math.min(0, y1))];
    // everything the plane draws can live inside a group (opts.parent)
    const line = (pts, o) => lineRaw(pts, { ...o, parent: opts.parent });
    const label = (c, q, o) => labelRaw(c, q, { ...o, parent: opts.parent });
    if (opts.grid !== false) {
      for (let x = Math.ceil(x0 / xs) * xs; x <= x1 + 1e-9; x += xs) {
        if (Math.abs(x - ax[0]) < 1e-9) continue;
        line([toW(x, y0), toW(x, y1)], { color: C.grid, width: 1, z: 0, opacity: 0.7 });
      }
      for (let y = Math.ceil(y0 / ys) * ys; y <= y1 + 1e-9; y += ys) {
        if (Math.abs(y - ax[1]) < 1e-9) continue;
        line([toW(x0, y), toW(x1, y)], { color: C.grid, width: 1, z: 0, opacity: 0.7 });
      }
    }
    line([toW(x0, ax[1]), toW(x1, ax[1])], { color: C.axis, width: 2, z: 1 });
    if (opts.yAxis !== false) line([toW(ax[0], y0), toW(ax[0], y1)], { color: C.axis, width: 2, z: 1 });
    const fmt = opts.fmt || ((v) => `${Math.round(v * 100) / 100}`.replace('-', '−'));
    if (opts.numbers !== false) {
      const xEvery = opts.xEvery ?? xs;
      for (let x = Math.ceil(x0 / xEvery) * xEvery; x <= x1 + 1e-9; x += xEvery) {
        if (Math.abs(x - ax[0]) < 1e-9 && opts.yAxis !== false) continue;
        label(fmt(x, 'x'), [...toW(x, ax[1])].map((v, i) => (i === 1 ? v - 0.22 : v)), {
          tex: false,
          cls: 'tick',
          align: 'below',
        });
      }
      if (opts.yAxis !== false) {
        const yEvery = opts.yEvery ?? ys;
        for (let y = Math.ceil(y0 / yEvery) * yEvery; y <= y1 + 1e-9; y += yEvery) {
          if (Math.abs(y - ax[1]) < 1e-9) continue;
          const [wx, wy] = toW(ax[0], y);
          label(fmt(y, 'y'), [wx - 0.15, wy], { tex: false, cls: 'tick', align: 'right' });
        }
      }
    }
    if (opts.xLabel) {
      const [wx, wy] = toW(x1, ax[1]);
      label(opts.xLabel, [wx, wy + 0.3], { align: 'right', cls: 'axis-name' });
    }
    if (opts.yLabel) {
      const [wx, wy] = toW(ax[0], y1);
      label(opts.yLabel, [wx + 0.2, wy], { align: 'left', cls: 'axis-name' });
    }
    return { toW, x: [x0, x1], y: [y0, y1] };
  }

  // Plot y = f(x) on a plane returned by `plane()` (or raw world coords).
  function curve(f, xr, opts = {}) {
    const P = opts.plane;
    const n = opts.samples ?? 200;
    const build = (fn, r) => {
      const pts = [];
      for (const x of range(r[0], r[1], n)) {
        const y = fn(x);
        if (!Number.isFinite(y)) continue;
        if (opts.clipY && (y < opts.clipY[0] || y > opts.clipY[1])) {
          if (pts.length) break;
          continue;
        }
        pts.push(P ? P.toW(x, y) : [x, y]);
      }
      return pts;
    };
    const l = line(build(f, xr), opts);
    return { ...l, set: (fn, r = xr) => l.set(build(fn, r)) };
  }

  function fill(points, opts = {}) {
    const mat = new THREE.MeshBasicMaterial({
      color: opts.color ?? C.blue,
      transparent: true,
      opacity: opts.opacity ?? 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
    mesh.renderOrder = opts.z ?? 1;
    add(mesh, opts.parent);
    const api = {
      obj: mesh,
      set(pts) {
        mesh.geometry.dispose();
        if (pts.length < 3) {
          mesh.geometry = new THREE.BufferGeometry();
          return api;
        }
        const s = new THREE.Shape(pts.map((p) => new THREE.Vector2(p[0], p[1])));
        mesh.geometry = new THREE.ShapeGeometry(s);
        return api;
      },
      color(c) {
        mat.color.set(c);
        return api;
      },
      opacity(a) {
        mat.opacity = a;
        return api;
      },
      visible(b) {
        mesh.visible = b;
        return api;
      },
    };
    return api.set(points);
  }

  function rect(x, y, w, h, opts = {}) {
    const corners = (X, Y, W, H) => [
      [X, Y],
      [X + W, Y],
      [X + W, Y + H],
      [X, Y + H],
    ];
    const f = opts.fill === false ? null : fill(corners(x, y, w, h), opts);
    const o =
      opts.stroke === false
        ? null
        : line([...corners(x, y, w, h), [x, y]], {
            color: opts.strokeColor ?? opts.color ?? C.white,
            width: opts.width ?? 2,
            create: opts.create ?? false,
            z: (opts.z ?? 1) + 1,
            parent: opts.parent,
          });
    const api = {
      set(X, Y, W, H) {
        f?.set(corners(X, Y, W, H));
        o?.set([...corners(X, Y, W, H), [X, Y]]);
        return api;
      },
      color(c) {
        f?.color(c);
        return api;
      },
      opacity(a) {
        f?.opacity(a);
        return api;
      },
      visible(b) {
        f?.visible(b);
        o?.visible(b);
        return api;
      },
      fill: f,
      outline: o,
    };
    return api;
  }

  function sphere(p, r, color, opts = {}) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, opts.seg ?? 32, opts.seg ? opts.seg / 2 : 20),
      new THREE.MeshStandardMaterial({
        color,
        roughness: opts.roughness ?? 0.35,
        metalness: opts.metalness ?? 0.1,
        emissive: opts.glow ? color : 0x000000,
        emissiveIntensity: opts.glow ?? 0,
        transparent: opts.opacity != null,
        opacity: opts.opacity ?? 1,
      })
    );
    mesh.scale.setScalar(r);
    mesh.position.set(...p);
    add(mesh, opts.parent);
    return mesh;
  }

  function cylinder(a, b, r, color, opts = {}) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1, 16),
      new THREE.MeshStandardMaterial({ color, roughness: 0.5, transparent: true, opacity: opts.opacity ?? 1 })
    );
    add(mesh, opts.parent);
    const up = new THREE.Vector3(0, 1, 0);
    const api = {
      obj: mesh,
      set(A, B) {
        const va = v3(A);
        const d = v3(B).sub(va);
        const len = d.length();
        mesh.visible = len > 1e-4;
        mesh.scale.set(r, len, r);
        mesh.position.copy(va.add(d.clone().multiplyScalar(0.5)));
        mesh.quaternion.setFromUnitVectors(up, d.normalize());
        return api;
      },
    };
    return api.set(a, b);
  }

  function group(parent) {
    return add(new THREE.Group(), parent);
  }

  function tick(intro) {
    for (const l of creatable) l.applyIntro(intro);
  }

  return { line, arrow, dot, label, plane, curve, fill, rect, sphere, cylinder, group, tick, THREE, C };
}
