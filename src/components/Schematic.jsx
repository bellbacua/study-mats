// A small circuit-diagram drawer, written for this app (no outside drawing
// library). Circuits are lists of parts placed on a grid; one grid step is
// S pixels. The symbols follow the usual textbook (ANSI-style) shapes.
//
// Two-terminal parts: { t, a: [x, y], b: [x, y], label, ...state }
//   t = R resistor · pot · C capacitor · Ce polarised capacitor (a = +) · L inductor
//       D diode (a = anode) · LED (on: true | false | 'dead', c: colour) · Z zener
//       bat battery (a = +) · sw push button (closed) · lamp · M motor · F fuse
//       meter (letter: 'V' | 'A') · coil (relay coil) · X crystal
// Others: { t: 'w', p: [[x, y], ...], flow } wire · { t: 'gnd', a } · { t: 'vcc', a, label }
//   { t: 'dot', a } · { t: 'txt', a, label } · { t: 'npn', a } (base at a, collector
//   up-right at a + [1.5, -1], emitter a + [1.5, 1]) · { t: 'nand', a } (inputs at a and
//   a + [0, 1], output a + [2.5, 0.5]) · { t: 'chip', a, w, h, label, pins: [{ s, i, n }] }
// Any part can carry hl: 'bad' (shown red) or 'fix' (shown green), and hot: true.

export const S = 40;

const P = ([x, y]) => [x * S, y * S];

function bounds(parts) {
  const pts = [];
  for (const p of parts) {
    if (p.a) pts.push(p.a);
    if (p.b) pts.push(p.b);
    if (p.p) pts.push(...p.p);
    if (p.t === 'npn') pts.push([p.a[0] + 2, p.a[1] - 1.2], [p.a[0] + 2, p.a[1] + 1.2]);
    if (p.t === 'nand') pts.push([p.a[0] + 2.6, p.a[1] + 1.4]);
    if (p.t === 'chip') pts.push([p.a[0] - 0.6, p.a[1] - 0.6], [p.a[0] + p.w + 0.6, p.a[1] + p.h + 0.6]);
    if (p.t === 'gnd') pts.push([p.a[0], p.a[1] + 0.7]);
    if (p.t === 'vcc') pts.push([p.a[0], p.a[1] - 0.8]);
  }
  // labels stick out past the wires, so make room for them too (mono text ≈ 0.6 em per letter)
  for (const p of parts) {
    if (!p.label) continue;
    const wd = (String(p.label).length * (p.small || p.t === 'txt' ? 7 : 8)) / S;
    if (p.t === 'txt') {
      const x = p.a[0];
      pts.push(p.anchor === 'end' ? [x - wd, p.a[1]] : p.anchor === 'start' ? [x + wd, p.a[1]] : [x - wd / 2, p.a[1]], p.anchor === 'middle' || !p.anchor ? [x + wd / 2, p.a[1]] : [x, p.a[1]]);
    } else if (p.b) {
      const mx = (p.a[0] + p.b[0]) / 2;
      const my = (p.a[1] + p.b[1]) / 2;
      const vertical = Math.abs(p.b[1] - p.a[1]) > Math.abs(p.b[0] - p.a[0]);
      const side = p.side || (vertical ? 'right' : 'above');
      if (side === 'left') pts.push([mx - 0.5 - wd, my]);
      else if (side === 'right') pts.push([mx + 0.5 + wd, my]);
      else pts.push([mx - wd / 2, my + (side === 'above' ? -0.6 : 0.8)], [mx + wd / 2, my]);
    }
  }
  const xs = pts.map((q) => q[0]);
  const ys = pts.map((q) => q[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

// The symbol drawn along the x axis between -h and +h.
function Symbol2({ p, h }) {
  const zig = (amp, n) => {
    const pts = [[-h, 0]];
    for (let i = 0; i < n; i += 1) pts.push([-h + ((i + 0.5) * 2 * h) / n, i % 2 ? amp : -amp]);
    pts.push([h, 0]);
    return pts.map((q) => q.join(',')).join(' ');
  };
  switch (p.t) {
    case 'R':
      return <polyline points={zig(7, 6)} className="sch-s" />;
    case 'pot':
      return (
        <>
          <polyline points={zig(7, 6)} className="sch-s" />
          <path d={`M ${-h * 0.7} 14 L ${h * 0.7} -14 M ${h * 0.7} -14 l -9 1 M ${h * 0.7} -14 l -3 8`} className="sch-s" />
        </>
      );
    case 'C':
    case 'Ce':
      return (
        <>
          <path d={`M ${-h} 0 H -4 M 4 0 H ${h}`} className="sch-s" />
          <path d="M -4 -12 V 12" className="sch-s thick" />
          {p.t === 'C' ? <path d="M 4 -12 V 12" className="sch-s thick" /> : <path d="M 9 -12 Q 3 0 9 12" className="sch-s thick" />}
          {p.t === 'Ce' && <text x={-14} y={-8} className="sch-pm">+</text>}
          {p.burst && <path d="M -2 -20 l 4 6 l 4 -8 l 4 6" className="sch-s burst" />}
        </>
      );
    case 'L':
    case 'coil': {
      if (p.t === 'coil')
        return (
          <>
            <path d={`M ${-h} 0 H -14 M 14 0 H ${h}`} className="sch-s" />
            <rect x={-14} y={-9} width={28} height={18} className="sch-s" />
            <path d="M -14 9 L 14 -9" className="sch-s" />
          </>
        );
      const n = 4;
      const w = (2 * h) / n;
      let d = `M ${-h} 0`;
      for (let i = 0; i < n; i += 1) d += ` a ${w / 2} ${w / 2} 0 0 1 ${w} 0`;
      return <path d={d} className="sch-s" />;
    }
    case 'D':
    case 'LED':
    case 'Z': {
      const glow = p.t === 'LED' && [true, 'dim', 'flicker', 'blink'].includes(p.on);
      const mode = typeof p.on === 'string' ? p.on : '';
      const dead = p.t === 'LED' && p.on === 'dead';
      return (
        <>
          {glow && <circle r={22} className={`sch-glow ${mode}`} style={{ '--glow': p.c || '#ff4a3d' }} />}
          <path d={`M ${-h} 0 H -8 M 8 0 H ${h}`} className="sch-s" />
          <path d="M -8 -10 L 8 0 L -8 10 Z" className={`sch-s ${glow ? 'lit' : ''}`} style={glow ? { '--glow': p.c || '#ff4a3d' } : undefined} />
          {p.t === 'Z' ? <path d="M 4 -12 L 8 -10 V 10 L 12 12" className="sch-s" /> : <path d="M 8 -10 V 10" className="sch-s" />}
          {p.t === 'LED' && (
            <path
              d="M -1 -13 l 7 -9 m 0 0 l -5 1 m 5 -1 l -1 5 M 7 -11 l 7 -9 m 0 0 l -5 1 m 5 -1 l -1 5"
              className={`sch-s thin ${glow ? 'lit' : ''}`}
              style={glow ? { '--glow': p.c || '#ff4a3d' } : undefined}
            />
          )}
          {dead && <path d="M -10 -10 L 10 10 M 10 -10 L -10 10" className="sch-s burst" />}
        </>
      );
    }
    case 'bat':
      return (
        <>
          <path d={`M ${-h} 0 H -9 M 9 0 H ${h}`} className="sch-s" />
          <path d="M -9 -14 V 14 M 3 -14 V 14" className="sch-s" />
          <path d="M -3 -7 V 7 M 9 -7 V 7" className="sch-s thick" />
          <text x={-20} y={-12} className="sch-pm">+</text>
        </>
      );
    case 'sw':
      return (
        <>
          <path d={`M ${-h} 0 H -12 M 12 0 H ${h}`} className="sch-s" />
          <circle cx={-12} cy={0} r={2.5} className="sch-s fill" />
          <circle cx={12} cy={0} r={2.5} className="sch-s fill" />
          <path d={p.open === false ? 'M -14 -3 H 14 M 0 -3 V -14' : 'M -14 -9 H 14 M 0 -9 V -18'} className="sch-s" />
        </>
      );
    case 'lamp':
    case 'M':
    case 'meter':
      return (
        <>
          <path d={`M ${-h} 0 H -13 M 13 0 H ${h}`} className="sch-s" />
          <circle r={13} className={`sch-s ${p.on ? 'lamp-on' : ''}`} />
          {p.t === 'lamp' && <path d="M -9 -9 L 9 9 M 9 -9 L -9 9" className="sch-s thin" />}
        </>
      );
    case 'F':
      return (
        <>
          <path d={`M ${-h} 0 H ${h}`} className={`sch-s ${p.blown ? 'dash' : ''}`} />
          <rect x={-14} y={-6} width={28} height={12} className="sch-s" />
          {p.blown && <path d="M -4 -6 l 3 6 l 3 -6" className="sch-s burst" />}
        </>
      );
    case 'X':
      return (
        <>
          <path d={`M ${-h} 0 H -9 M 9 0 H ${h}`} className="sch-s" />
          <path d="M -9 -12 V 12 M 9 -12 V 12" className="sch-s thick" />
          <rect x={-5} y={-10} width={10} height={20} className="sch-s" />
        </>
      );
    default:
      return <path d={`M ${-h} 0 H ${h}`} className="sch-s" />;
  }
}

// Letters inside round symbols must stay upright, so they are drawn outside the rotation.
const LETTER = { M: 'M', meter: null };

function TwoTerm({ p }) {
  const [x1, y1] = P(p.a);
  const [x2, y2] = P(p.b);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const h = Math.min(30, len / 2 - 2);
  const vertical = Math.abs(dy) > Math.abs(dx);
  const side = p.side || (vertical ? 'right' : 'above');
  const off = { above: [0, -20], below: [0, 30], left: [-20, 5], right: [20, 5] }[side];
  const anchor = side === 'left' ? 'end' : side === 'right' ? 'start' : 'middle';
  const letter = p.t === 'meter' ? p.letter || 'V' : LETTER[p.t];
  return (
    <g className={`sch-part ${p.hl ? `hl-${p.hl}` : ''} ${p.hot ? 'hot' : ''}`}>
      <g transform={`translate(${mx} ${my}) rotate(${ang})`}>
        <path d={`M ${-len / 2} 0 H ${-h} M ${h} 0 H ${len / 2}`} className="sch-s" />
        <Symbol2 p={p} h={h} />
      </g>
      {letter && (
        <text x={mx} y={my + 5} textAnchor="middle" className="sch-letter">
          {letter}
        </text>
      )}
      {p.label && (
        <text x={mx + off[0]} y={my + off[1]} textAnchor={anchor} className="sch-label">
          {p.label}
        </text>
      )}
    </g>
  );
}

function Part({ p }) {
  const cls = `sch-part ${p.hl ? `hl-${p.hl}` : ''} ${p.hot ? 'hot' : ''}`;
  if (p.t === 'w') {
    const d = p.p.map((q, i) => `${i ? 'L' : 'M'} ${q[0] * S} ${q[1] * S}`).join(' ');
    return (
      <g className={cls}>
        <path d={d} className="sch-s" />
        {p.flow && <path d={d} className="sch-flow" />}
      </g>
    );
  }
  const [x, y] = P(p.a);
  switch (p.t) {
    case 'gnd':
      return <path d={`M ${x} ${y} V ${y + 10} M ${x - 12} ${y + 10} H ${x + 12} M ${x - 8} ${y + 16} H ${x + 8} M ${x - 4} ${y + 22} H ${x + 4}`} className={`sch-s ${cls}`} />;
    case 'vcc':
      return (
        <g className={cls}>
          <path d={`M ${x} ${y} V ${y - 12} M ${x - 10} ${y - 12} H ${x + 10}`} className="sch-s" />
          <text x={x} y={y - 18} textAnchor="middle" className="sch-label">
            {p.label}
          </text>
        </g>
      );
    case 'dot':
      return <circle cx={x} cy={y} r={3.5} className="sch-dot" />;
    case 'txt':
      return (
        <text x={x} y={y} textAnchor={p.anchor || 'middle'} className={`sch-label ${p.small ? 'small' : ''} ${cls}`}>
          {p.label}
        </text>
      );
    case 'npn': {
      const bx = x + 0.6 * S;
      const cx = x + 1.5 * S;
      return (
        <g className={cls}>
          <circle cx={x + 1.05 * S} cy={y} r={0.72 * S} className="sch-s" />
          <path d={`M ${x} ${y} H ${bx} M ${bx} ${y - 16} V ${y + 16}`} className="sch-s" />
          <path d={`M ${bx} ${y - 7} L ${cx} ${y - 0.62 * S} V ${y - S}`} className="sch-s" />
          <path d={`M ${bx} ${y + 7} L ${cx} ${y + 0.62 * S} V ${y + S}`} className="sch-s" />
          <path d={`M ${cx} ${y + 0.62 * S} l -11 -2 l 5 -7 Z`} className="sch-s fill" />
          {p.label && (
            <text x={cx + 12} y={y + 4} className="sch-label">
              {p.label}
            </text>
          )}
        </g>
      );
    }
    case 'nand': {
      const ox = x + 0.5 * S;
      const top = y - 0.3 * S;
      const bot = y + 1.3 * S;
      const r = (bot - top) / 2;
      return (
        <g className={cls}>
          <path d={`M ${x} ${y} H ${ox} M ${x} ${y + S} H ${ox}`} className="sch-s" />
          <path d={`M ${ox} ${top} H ${ox + 0.6 * S} A ${r} ${r} 0 0 1 ${ox + 0.6 * S} ${bot} H ${ox} Z`} className="sch-s" />
          <circle cx={ox + 0.6 * S + r + 5} cy={y + 0.5 * S} r={5} className="sch-s" />
          <path d={`M ${ox + 0.6 * S + r + 10} ${y + 0.5 * S} H ${x + 2.5 * S}`} className="sch-s" />
          {p.label && (
            <text x={ox + 0.5 * S} y={bot + 16} textAnchor="middle" className="sch-label small">
              {p.label}
            </text>
          )}
        </g>
      );
    }
    case 'chip':
      return (
        <g className={cls}>
          <rect x={x} y={y} width={p.w * S} height={p.h * S} rx={4} className="sch-s chip" />
          <text x={x + (p.w * S) / 2} y={y + (p.h * S) / 2 + 5} textAnchor="middle" className="sch-label">
            {p.label}
          </text>
          {(p.pins || []).map((pin) => {
            const at = {
              l: [x, y + pin.i * S, x - 0.5 * S, y + pin.i * S, x + 5, y + pin.i * S + 4, 'start'],
              r: [x + p.w * S, y + pin.i * S, x + p.w * S + 0.5 * S, y + pin.i * S, x + p.w * S - 5, y + pin.i * S + 4, 'end'],
              t: [x + pin.i * S, y, x + pin.i * S, y - 0.5 * S, x + pin.i * S, y + 14, 'middle'],
              b: [x + pin.i * S, y + p.h * S, x + pin.i * S, y + p.h * S + 0.5 * S, x + pin.i * S, y + p.h * S - 6, 'middle'],
            }[pin.s];
            return (
              <g key={`${pin.s}${pin.i}`}>
                <path d={`M ${at[0]} ${at[1]} L ${at[2]} ${at[3]}`} className="sch-s" />
                <text x={at[4]} y={at[5]} textAnchor={at[6]} className="sch-pin">
                  {pin.n}
                </text>
              </g>
            );
          })}
        </g>
      );
    default:
      return <TwoTerm p={p} />;
  }
}

export default function Schematic({ parts, title, className = '', maxWidth }) {
  const [x0, y0, x1, y1] = bounds(parts);
  const pad = 1;
  const vb = [(x0 - pad) * S, (y0 - pad) * S, (x1 - x0 + 2 * pad) * S, (y1 - y0 + 2 * pad) * S];
  return (
    <svg className={`schematic ${className}`} viewBox={vb.join(' ')} role="img" aria-label={title || 'Circuit diagram'} style={maxWidth ? { maxWidth } : undefined}>
      {parts.map((p, i) => (
        <Part key={i} p={p} />
      ))}
    </svg>
  );
}

// A chip drawn from above as its pins really sit: pin 1 next to the notch,
// counted down the left side and back up the right side.
export function DipPinout({ pins, label }) {
  const n = pins.length / 2;
  const pitch = 26;
  const W = 120;
  const H = n * pitch + 16;
  const left = 150;
  const top = 12;
  return (
    <svg className="schematic dip" viewBox={`0 0 ${left * 2 + W} ${H + top * 2}`} role="img" aria-label={`Pin map of ${label}`}>
      <rect x={left} y={top} width={W} height={H} rx={6} className="dip-body" />
      <path d={`M ${left + W / 2 - 12} ${top} a 12 12 0 0 0 24 0`} className="dip-notch" />
      <circle cx={left + 16} cy={top + 18} r={4} className="dip-dot" />
      <text x={left + W / 2} y={top + H / 2} textAnchor="middle" className="dip-name" transform={`rotate(-90 ${left + W / 2} ${top + H / 2})`}>
        {label}
      </text>
      {pins.map((name, i) => {
        const leftSide = i < n;
        const row = leftSide ? i : pins.length - 1 - i;
        const y = top + 8 + row * pitch + pitch / 2;
        const px = leftSide ? left - 14 : left + W;
        return (
          <g key={i}>
            <rect x={px} y={y - 5} width={14} height={10} className="dip-leg" />
            <text x={leftSide ? left + 8 : left + W - 8} y={y + 4} textAnchor={leftSide ? 'start' : 'end'} className="dip-num">
              {i + 1}
            </text>
            <text x={leftSide ? px - 8 : px + 22} y={y + 4} textAnchor={leftSide ? 'end' : 'start'} className="dip-pin">
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
