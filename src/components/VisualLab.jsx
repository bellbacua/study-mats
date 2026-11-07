import React, { useState, useEffect } from 'react';
import AdvancedVisualLabs from './AdvancedVisualLabs';

const ELEMENT_DATA = {
  1: { symbol: 'H', name: 'Hydrogen', category: 'Nonmetal Gas', note: '1 valence e⁻ (wants 2 in Shell 1)' },
  2: { symbol: 'He', name: 'Helium', category: 'Noble Gas (Inert)', note: 'Full Shell 1 (2/2) — Completely unreactive!' },
  3: { symbol: 'Li', name: 'Lithium', category: 'Alkali Metal (Battery Anode)', note: '1 loose valence e⁻ in Shell 2 — Easily donates it (Li⁺)' },
  6: { symbol: 'C', name: 'Carbon', category: 'Covalent Network / Polymer Backbone', note: '4 valence e⁻ — Forms 4 strong covalent bonds (Diamond, Graphene, Plastics)' },
  8: { symbol: 'O', name: 'Oxygen', category: 'Reactive Nonmetal (Oxide Former)', note: '6 valence e⁻ in Shell 2 — Aggressively grabs 2 e⁻ to form ceramics (O²⁻)' },
  10: { symbol: 'Ne', name: 'Neon', category: 'Noble Gas (Inert)', note: 'Full Octet in Shell 2 (8/8) — Zero desire to bond' },
  11: { symbol: 'Na', name: 'Sodium', category: 'Reactive Metal', note: '1 valence e⁻ in Shell 3 — Donates 1 e⁻ to form Na⁺' },
  12: { symbol: 'Mg', name: 'Magnesium', category: 'Lightweight Structural Metal', note: '2 valence e⁻ in Shell 3 — Forms Mg²⁺ in alloys & ceramics' },
  13: { symbol: 'Al', name: 'Aluminum', category: 'Engineering Metal (FCC)', note: '3 valence e⁻ in Shell 3 — Sea of electrons makes it conductive & ductile!' },
  14: { symbol: 'Si', name: 'Silicon', category: 'Semiconductor (CPU & Solar Core)', note: '4 valence e⁻ in Shell 3 — Shares with 4 neighbors in a diamond lattice!' },
  17: { symbol: 'Cl', name: 'Chlorine', category: 'Halogen Nonmetal', note: '7 valence e⁻ in Shell 3 — Needs just 1 more electron for a full octet (Cl⁻)' },
  18: { symbol: 'Ar', name: 'Argon', category: 'Noble Shielding Gas (Welding)', note: 'Full Octet in Shell 3 (8/8) — Used in UM metallurgy furnaces to prevent oxidation' },
};

export default function VisualLab({ lesson, isMissionDone, onCompleteMission }) {
  const { type, title, instructions, missionPrompt } = lesson.visualLab;

  return (
    <section className="visual-lab-card" aria-label="3Blue1Brown Interactive Visual Lab">
      <div className="visual-lab-header">
        <div>
          <span className="lab-eyebrow">3BLUE1BROWN INTERACTIVE INTUITION ENGINE</span>
          <h3 className="visual-lab-title">{title}</h3>
          <p className="visual-lab-instructions">{instructions}</p>
        </div>
        <div className={`mission-badge ${isMissionDone ? 'mission-complete' : 'mission-pending'}`}>
          <span className="mission-dot" />
          <span>{isMissionDone ? 'Stage 1 Lab Mission Verified' : 'Stage 1 Gate: Lab Mission Active'}</span>
        </div>
      </div>

      <div className="mission-banner">
        <strong>{missionPrompt}</strong>
        {!isMissionDone && (
          <button
            type="button"
            className="btn-ghost-sm"
            onClick={onCompleteMission}
            title="Mark interactive exploration complete"
          >
            Mark Explored ✓
          </button>
        )}
      </div>

      <div className="visual-stage">
        {type === 'number_line_vectors' && (
          <NumberLineVectorsLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'bohr_orbital_builder' && (
          <BohrOrbitalBuilderLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'fraction_area_grid' && (
          <FractionAreaGridLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'dimensional_pipeline' && (
          <DimensionalPipelineLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'algebra_balance_beam' && (
          <AlgebraBalanceBeamLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'bonding_energy_well' && (
          <BondingEnergyWellLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'exponent_growth_scaler' && (
          <ExponentGrowthScalerLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'mole_stoichiometry_reactor' && (
          <MoleStoichiometryReactorLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        {type === 'crystal_lattice_3d' && (
          <CrystalLattice3DLab onComplete={onCompleteMission} isMissionDone={isMissionDone} />
        )}
        <AdvancedVisualLabs type={type} onComplete={onCompleteMission} />
      </div>
    </section>
  );
}

/* ============================================================================
   1. MATH 001: 3B1B Vector Transformation Line (Negative × Negative = 180° Flip)
   ============================================================================ */
function NumberLineVectorsLab({ onComplete }) {
  const [baseX, setBaseX] = useState(3);
  const [multK, setMultK] = useState(2);

  useEffect(() => {
    if ((baseX === -3 && multK === -2) || (baseX < 0 && multK < 0)) {
      onComplete();
    }
  }, [baseX, multK, onComplete]);

  const product = baseX * multK;
  const toSvgX = (val) => 380 + val * 28; // -12 to +12 maps around center 380

  const flipsCount = (baseX < 0 ? 1 : 0) + (multK < 0 ? 1 : 0);

  return (
    <div className="lab-inner">
      <svg viewBox="0 0 760 230" className="b1b-svg">
        <defs>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
          </marker>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Subtle tick marks from -12 to +12 */}
        <line x1="30" y1="135" x2="730" y2="135" stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 25 }, (_, i) => i - 12).map((num) => {
          const cx = toSvgX(num);
          const isZero = num === 0;
          return (
            <g key={num}>
              <line
                x1={cx}
                y1={isZero ? 115 : 128}
                x2={cx}
                y2={isZero ? 155 : 142}
                stroke={isZero ? '#f8fafc' : '#475569'}
                strokeWidth={isZero ? 2.5 : 1.5}
              />
              {num % 2 === 0 && (
                <text
                  x={cx}
                  y="170"
                  textAnchor="middle"
                  fill={isZero ? '#f8fafc' : '#94a3b8'}
                  fontSize={isZero ? '13' : '11'}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {num > 0 ? `+${num}` : num}
                </text>
              )}
            </g>
          );
        })}

        {/* Rotation arc indicator when negative */}
        {multK < 0 && baseX !== 0 && (
          <path
            d={`M ${toSvgX(baseX)} 95 A ${Math.abs(baseX * 28)} 48 0 0 ${baseX < 0 ? 1 : 0} ${toSvgX(-baseX)} 95`}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="1.8"
            strokeDasharray="5 4"
          />
        )}

        {/* Base Vector x (Cyan) */}
        {baseX !== 0 && (
          <g>
            <line
              x1={toSvgX(0)}
              y1="95"
              x2={toSvgX(baseX)}
              y2="95"
              stroke="#38bdf8"
              strokeWidth="4"
              markerEnd="url(#arrow-cyan)"
            />
            <text
              x={(toSvgX(0) + toSvgX(baseX)) / 2}
              y="82"
              textAnchor="middle"
              fill="#38bdf8"
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              Base x = {baseX > 0 ? `+${baseX}` : baseX}
            </text>
          </g>
        )}

        {/* Result Vector x * k (Amber) */}
        {product !== 0 && (
          <g>
            <line
              x1={toSvgX(0)}
              y1="135"
              x2={toSvgX(product)}
              y2="135"
              stroke="#f59e0b"
              strokeWidth="5"
              markerEnd="url(#arrow-amber)"
            />
            <circle cx={toSvgX(product)} cy="135" r="5" fill="#f59e0b" />
            <text
              x={toSvgX(product)}
              y="202"
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="13"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              Result: ({baseX}) × ({multK}) = {product > 0 ? `+${product}` : product}
            </text>
          </g>
        )}

        {/* Top status readout */}
        <text x="380" y="34" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="JetBrains Mono, monospace">
          {flipsCount === 0 && '0 Negative Signs → 0° Rotation (Stays Positive)'}
          {flipsCount === 1 && '1 Negative Sign →Single 180° Flip Across Zero (Result is Negative)'}
          {flipsCount === 2 && '2 Negative Signs → Double 180° Flip = 360° Full Rotation Back to Positive (+)!'}
        </text>
      </svg>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>Base Vector (x)</span>
            <strong className="mono-val cyan-text">{baseX > 0 ? `+${baseX}` : baseX}</strong>
          </div>
          <input
            type="range"
            min="-4"
            max="4"
            step="1"
            value={baseX}
            onChange={(e) => setBaseX(Number(e.target.value))}
          />
          <div className="quick-preset-row">
            <button type="button" className="chip-btn" onClick={() => setBaseX(-3)}>
              Set x = −3
            </button>
            <button type="button" className="chip-btn" onClick={() => setBaseX(3)}>
              Set x = +3
            </button>
          </div>
        </div>

        <div className="control-box">
          <div className="control-label-row">
            <span>Scalar Multiplier (k)</span>
            <strong className="mono-val amber-text">{multK > 0 ? `+${multK}` : multK}</strong>
          </div>
          <input
            type="range"
            min="-3"
            max="3"
            step="1"
            value={multK}
            onChange={(e) => setMultK(Number(e.target.value))}
          />
          <div className="quick-preset-row">
            <button type="button" className="chip-btn" onClick={() => { setBaseX(-3); setMultK(-2); }}>
              Mission Preset: (−3) × (−2) = +6
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. CHEM 001: Interactive Bohr & Valence Shell Synthesizer
   ============================================================================ */
function BohrOrbitalBuilderLab({ onComplete }) {
  const [protons, setProtons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const [electrons, setElectrons] = useState(6);

  useEffect(() => {
    if (protons === 14 && electrons === 14) {
      onComplete();
    }
  }, [protons, electrons, onComplete]);

  // Distribute electrons across shells [2, 8, 8]
  const shell1 = Math.min(2, electrons);
  const shell2 = Math.min(8, Math.max(0, electrons - 2));
  const shell3 = Math.min(8, Math.max(0, electrons - 10));
  const shells = [shell1, shell2, shell3].filter((c) => c > 0);
  const valenceCount = shells.length > 0 ? shells[shells.length - 1] : 0;
  const netCharge = protons - electrons;

  const elemInfo = ELEMENT_DATA[protons] || {
    symbol: `Z=${protons}`,
    name: `Element #${protons}`,
    category: valenceCount <= 3 ? 'Metallic Behavior' : valenceCount === 4 ? 'Semiconductor / Covalent' : 'Nonmetal / Ceramic Former',
    note: `Outer shell holds ${valenceCount} valence electron(s).`,
  };

  const renderShellElectrons = (count, radius, color) => {
    return Array.from({ length: count }, (_, idx) => {
      const angle = (idx / count) * Math.PI * 2 - Math.PI / 2;
      const ex = 210 + radius * Math.cos(angle);
      const ey = 135 + radius * Math.sin(angle);
      return (
        <g key={`${radius}-${idx}`}>
          <circle cx={ex} cy={ey} r="6.5" fill={color} stroke="#0c1017" strokeWidth="2" />
          <text x={ex} y={ey + 3} textAnchor="middle" fill="#0c1017" fontSize="9" fontWeight="700">
            −
          </text>
        </g>
      );
    });
  };

  return (
    <div className="lab-inner">
      <div className="bohr-split-layout">
        <svg viewBox="0 0 420 270" className="b1b-svg">
          {/* Shells */}
          <circle cx="210" cy="135" r="46" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="210" cy="135" r="82" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="210" cy="135" r="116" fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="2" />

          {/* Nucleus Core */}
          <circle cx="210" cy="135" r="24" fill="#f43f5e" fillOpacity="0.22" stroke="#f43f5e" strokeWidth="2" />
          <text x="210" y="132" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
            {elemInfo.symbol}
          </text>
          <text x="210" y="146" textAnchor="middle" fill="#cbd5e1" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
            {protons}p⁺ {neutrons}n⁰
          </text>

          {/* Electrons in shells */}
          {shell1 > 0 && renderShellElectrons(shell1, 46, shells.length === 1 ? '#f59e0b' : '#38bdf8')}
          {shell2 > 0 && renderShellElectrons(shell2, 82, shells.length === 2 ? '#f59e0b' : '#38bdf8')}
          {shell3 > 0 && renderShellElectrons(shell3, 116, '#f59e0b')}
        </svg>

        <div className="atom-telemetry-card">
          <div className="telemetry-header">
            <span className="element-badge">{elemInfo.symbol}</span>
            <div>
              <h4>{elemInfo.name}</h4>
              <span className="telemetry-sub">{elemInfo.category}</span>
            </div>
          </div>

          <div className="telemetry-stats-grid">
            <div className="stat-pill">
              <span>Atomic # (Z)</span>
              <strong>{protons}</strong>
            </div>
            <div className="stat-pill">
              <span>Mass # (A)</span>
              <strong>{protons + neutrons} amu</strong>
            </div>
            <div className="stat-pill">
              <span>Valence e⁻</span>
              <strong className="amber-text">{valenceCount} e⁻</strong>
            </div>
            <div className="stat-pill">
              <span>Net Charge</span>
              <strong className={netCharge === 0 ? 'emerald-text' : 'crimson-text'}>
                {netCharge === 0 ? '0 (Neutral)' : netCharge > 0 ? `+${netCharge} Cation` : `${netCharge} Anion`}
              </strong>
            </div>
          </div>

          <p className="telemetry-note">
            <strong>Materials Behavior:</strong> {elemInfo.note}
          </p>

          <div className="quick-preset-row">
            <button
              type="button"
              className="chip-btn"
              onClick={() => { setProtons(14); setNeutrons(14); setElectrons(14); }}
            >
              Mission: Build Silicon (Z=14)
            </button>
            <button
              type="button"
              className="chip-btn"
              onClick={() => { setProtons(13); setNeutrons(14); setElectrons(13); }}
            >
              Aluminum Metal (Z=13)
            </button>
            <button
              type="button"
              className="chip-btn"
              onClick={() => { setProtons(8); setNeutrons(8); setElectrons(8); }}
            >
              Oxygen (Z=8)
            </button>
          </div>
        </div>
      </div>

      <div className="lab-controls-grid three-cols">
        <div className="control-box">
          <div className="control-label-row">
            <span>Protons (Z - Identity)</span>
            <strong className="mono-val crimson-text">{protons} p⁺</strong>
          </div>
          <input type="range" min="1" max="18" value={protons} onChange={(e) => setProtons(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Neutrons (N - Isotope Mass)</span>
            <strong className="mono-val">{neutrons} n⁰</strong>
          </div>
          <input type="range" min="0" max="22" value={neutrons} onChange={(e) => setNeutrons(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Electrons (e⁻ - Shells)</span>
            <strong className="mono-val amber-text">{electrons} e⁻</strong>
          </div>
          <input type="range" min="1" max="18" value={electrons} onChange={(e) => setElectrons(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   3. MATH 002: 3B1B 2D Fraction Grid Subdivider
   ============================================================================ */
function FractionAreaGridLab({ onComplete }) {
  const [numA, setNumA] = useState(1);
  const [denA, setDenA] = useState(3);
  const [numB, setNumB] = useState(1);
  const [denB, setDenB] = useState(4);
  const [mode, setMode] = useState('add'); // 'add' | 'multiply'

  useEffect(() => {
    if (numA === 2 && denA === 3 && numB === 3 && denB === 4) {
      onComplete();
    }
  }, [numA, denA, numB, denB, onComplete]);

  const commonDen = denA * denB;
  const scaledA = numA * denB;
  const scaledB = numB * denA;
  const sumNum = scaledA + scaledB;
  const prodNum = numA * numB;

  return (
    <div className="lab-inner">
      <div className="mode-toggle-bar">
        <button
          type="button"
          className={`mode-tab ${mode === 'add' ? 'active' : ''}`}
          onClick={() => setMode('add')}
        >
          Addition Mode: Common Grid Resolution ({numA}/{denA} + {numB}/{denB})
        </button>
        <button
          type="button"
          className={`mode-tab ${mode === 'multiply' ? 'active' : ''}`}
          onClick={() => setMode('multiply')}
        >
          Multiplication Mode: 2D Area Overlap ({numA}/{denA} × {numB}/{denB})
        </button>
        <button
          type="button"
          className="chip-btn"
          onClick={() => {
            setNumA(2);
            setDenA(3);
            setNumB(3);
            setDenB(4);
          }}
        >
          Load Mission: 2/3 & 3/4
        </button>
      </div>

      <svg viewBox="0 0 760 220" className="b1b-svg">
        {/* Box 1: Fraction A (Vertical slices = denA, horizontal subdivisions = denB) */}
        <g transform="translate(45, 25)">
          <text x="75" y="-6" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            A = {numA}/{denA} = {scaledA}/{commonDen}
          </text>
          {Array.from({ length: denA }, (_, col) =>
            Array.from({ length: denB }, (_, row) => {
              const w = 150 / denA;
              const h = 150 / denB;
              const active = col < numA;
              return (
                <rect
                  key={`a-${col}-${row}`}
                  x={col * w}
                  y={row * h}
                  width={w - 2}
                  height={h - 2}
                  rx="3"
                  fill={active ? '#38bdf8' : '#1e293b'}
                  fillOpacity={active ? 0.78 : 0.45}
                  stroke="#334155"
                />
              );
            })
          )}
        </g>

        <text x="235" y="108" textAnchor="middle" fill="#f8fafc" fontSize="24" fontFamily="JetBrains Mono, monospace">
          {mode === 'add' ? '+' : '×'}
        </text>

        {/* Box 2: Fraction B (Horizontal slices = denB, vertical subdivisions = denA) */}
        <g transform="translate(275, 25)">
          <text x="75" y="-6" textAnchor="middle" fill="#f59e0b" fontSize="13" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            B = {numB}/{denB} = {scaledB}/{commonDen}
          </text>
          {Array.from({ length: denA }, (_, col) =>
            Array.from({ length: denB }, (_, row) => {
              const w = 150 / denA;
              const h = 150 / denB;
              const active = row < numB;
              return (
                <rect
                  key={`b-${col}-${row}`}
                  x={col * w}
                  y={row * h}
                  width={w - 2}
                  height={h - 2}
                  rx="3"
                  fill={active ? '#f59e0b' : '#1e293b'}
                  fillOpacity={active ? 0.78 : 0.45}
                  stroke="#334155"
                />
              );
            })
          )}
        </g>

        <text x="465" y="108" textAnchor="middle" fill="#f8fafc" fontSize="24" fontFamily="JetBrains Mono, monospace">
          =
        </text>

        {/* Box 3: Result */}
        <g transform="translate(505, 25)">
          <text x="105" y="-6" textAnchor="middle" fill="#10b981" fontSize="13.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            {mode === 'add'
              ? `Sum = (${scaledA} + ${scaledB}) / ${commonDen} = ${sumNum}/${commonDen}`
              : `Area Overlap = ${prodNum}/${commonDen}`}
          </text>
          {Array.from({ length: denA }, (_, col) =>
            Array.from({ length: denB }, (_, row) => {
              const w = 150 / denA;
              const h = 150 / denB;
              const idx = row * denA + col;
              const isActive =
                mode === 'add' ? idx < sumNum : col < numA && row < numB;
              return (
                <rect
                  key={`r-${col}-${row}`}
                  x={col * w}
                  y={row * h}
                  width={w - 2}
                  height={h - 2}
                  rx="3"
                  fill={isActive ? '#10b981' : '#1e293b'}
                  fillOpacity={isActive ? 0.85 : 0.4}
                  stroke="#334155"
                />
              );
            })
          )}
          {mode === 'add' && sumNum > commonDen && (
            <text x="165" y="80" fill="#f59e0b" fontSize="12" fontFamily="JetBrains Mono, monospace">
              +{sumNum - commonDen}/{commonDen} overflow (1 whole + {sumNum - commonDen}/{commonDen})
            </text>
          )}
        </g>
      </svg>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>Fraction A ({numA}/{denA})</span>
            <strong className="mono-val cyan-text">{numA} / {denA}</strong>
          </div>
          <label className="mini-slider-label">
            Numerator A: {numA}
            <input type="range" min="1" max={denA} value={numA} onChange={(e) => setNumA(Number(e.target.value))} />
          </label>
          <label className="mini-slider-label">
            Denominator A: {denA}
            <input
              type="range"
              min="2"
              max="6"
              value={denA}
              onChange={(e) => {
                const nextDen = Number(e.target.value);
                setDenA(nextDen);
                if (numA > nextDen) setNumA(nextDen);
              }}
            />
          </label>
        </div>

        <div className="control-box">
          <div className="control-label-row">
            <span>Fraction B ({numB}/{denB})</span>
            <strong className="mono-val amber-text">{numB} / {denB}</strong>
          </div>
          <label className="mini-slider-label">
            Numerator B: {numB}
            <input type="range" min="1" max={denB} value={numB} onChange={(e) => setNumB(Number(e.target.value))} />
          </label>
          <label className="mini-slider-label">
            Denominator B: {denB}
            <input
              type="range"
              min="2"
              max="6"
              value={denB}
              onChange={(e) => {
                const nextDen = Number(e.target.value);
                setDenB(nextDen);
                if (numB > nextDen) setNumB(nextDen);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   4. CHEM 002: Dimensional Analysis Unit-Cancellation Pipeline
   ============================================================================ */
function DimensionalPipelineLab({ onComplete }) {
  // Start in un-canceled orientation so the user gets to flip them to cancel!
  const [flipMass, setFlipMass] = useState(true); // false = 1 kg / 1000 g (correct)
  const [flipVol, setFlipVol] = useState(true); // false = 10^6 cm³ / 1 m³ (correct)

  const massCanceled = !flipMass;
  const volCanceled = !flipVol;
  const allSolved = massCanceled && volCanceled;

  useEffect(() => {
    if (allSolved) {
      onComplete();
    }
  }, [allSolved, onComplete]);

  return (
    <div className="lab-inner">
      <div className="pipeline-stage">
        {/* Starting Quantity */}
        <div className="fraction-card base-card">
          <div className="frac-top">
            <span className="num">7.87</span>
            <span className={`unit-tag ${massCanceled ? 'unit-canceled' : 'unit-raw'}`}>g</span>
          </div>
          <div className="frac-bar" />
          <div className="frac-bottom">
            <span className="num">1</span>
            <span className={`unit-tag ${volCanceled ? 'unit-canceled' : 'unit-raw'}`}>cm³</span>
          </div>
          <span className="card-caption">Iron Density</span>
        </div>

        <span className="pipe-op">×</span>

        {/* Conversion Card 1: Mass */}
        <div className={`fraction-card interactive-card ${massCanceled ? 'card-valid' : 'card-mismatch'}`}>
          <div className="frac-top">
            {flipMass ? (
              <>
                <span className="num">1,000</span>
                <span className="unit-tag unit-bad">g</span>
              </>
            ) : (
              <>
                <span className="num">1</span>
                <span className="unit-tag unit-target">kg</span>
              </>
            )}
          </div>
          <div className="frac-bar" />
          <div className="frac-bottom">
            {flipMass ? (
              <>
                <span className="num">1</span>
                <span className="unit-tag unit-bad">kg</span>
              </>
            ) : (
              <>
                <span className="num">1,000</span>
                <span className="unit-tag unit-canceled">g</span>
              </>
            )}
          </div>
          <button type="button" className="flip-btn" onClick={() => setFlipMass(!flipMass)}>
            ⇄ Flip Mass Factor
          </button>
        </div>

        <span className="pipe-op">×</span>

        {/* Conversion Card 2: Volume */}
        <div className={`fraction-card interactive-card ${volCanceled ? 'card-valid' : 'card-mismatch'}`}>
          <div className="frac-top">
            {flipVol ? (
              <>
                <span className="num">1</span>
                <span className="unit-tag unit-bad">m³</span>
              </>
            ) : (
              <>
                <span className="num">1,000,000</span>
                <span className="unit-tag unit-canceled">cm³</span>
              </>
            )}
          </div>
          <div className="frac-bar" />
          <div className="frac-bottom">
            {flipVol ? (
              <>
                <span className="num">1,000,000</span>
                <span className="unit-tag unit-bad">cm³</span>
              </>
            ) : (
              <>
                <span className="num">1</span>
                <span className="unit-tag unit-target">m³</span>
              </>
            )}
          </div>
          <button type="button" className="flip-btn" onClick={() => setFlipVol(!flipVol)}>
            ⇄ Flip Volume Factor
          </button>
        </div>

        <span className="pipe-op">=</span>

        {/* Output Card */}
        <div className={`fraction-card result-card ${allSolved ? 'card-solved' : ''}`}>
          {allSolved ? (
            <>
              <div className="frac-top">
                <span className="num emerald-text">7,870</span>
                <span className="unit-tag unit-target">kg</span>
              </div>
              <div className="frac-bar" />
              <div className="frac-bottom">
                <span className="num">1</span>
                <span className="unit-tag unit-target">m³</span>
              </div>
              <span className="card-caption emerald-text">Type Check Passed!</span>
            </>
          ) : (
            <div className="type-error-box">
              <strong>Unit TypeError!</strong>
              <p>
                {flipMass && '• "g" is on top twice (g² instead of canceling!). '}
                {flipVol && '• "cm³" is on bottom twice (cm⁶ instead of canceling!).'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   5. MATH 003: Al-Khwarizmi's Al-Jabr & Al-Muqabala Balance Scale
   ============================================================================ */
function AlgebraBalanceBeamLab({ onComplete }) {
  // Equation starts as: 3x - 6 = 12
  const [coeffX, setCoeffX] = useState(3);
  const [leftConst, setLeftConst] = useState(-6);
  const [rightConst, setRightConst] = useState(12);
  const [historyLog, setHistoryLog] = useState(['Initial Equation: 3x − 6 = 12']);

  const isIsolated = coeffX === 1 && leftConst === 0;

  useEffect(() => {
    if (isIsolated) {
      onComplete();
    }
  }, [isIsolated, onComplete]);

  const applyAddConst = (delta) => {
    const nextLeft = leftConst + delta;
    const nextRight = rightConst + delta;
    setLeftConst(nextLeft);
    setRightConst(nextRight);
    setHistoryLog((prev) => [
      ...prev,
      `Al-Jabr (${delta >= 0 ? `+${delta}` : delta} to both pans): ${coeffX}x ${
        nextLeft === 0 ? '' : nextLeft > 0 ? `+ ${nextLeft}` : `− ${Math.abs(nextLeft)}`
      } = ${nextRight}`,
    ]);
  };

  const applyDivide = (divisor) => {
    if (leftConst !== 0) return; // Encourage clearing constant first
    const nextCoeff = coeffX / divisor;
    const nextRight = rightConst / divisor;
    setCoeffX(nextCoeff);
    setRightConst(nextRight);
    setHistoryLog((prev) => [
      ...prev,
      `Al-Muqabala (÷${divisor} both pans): ${nextCoeff === 1 ? 'x' : `${nextCoeff}x`} = ${nextRight}`,
    ]);
  };

  const resetProblem = () => {
    setCoeffX(3);
    setLeftConst(-6);
    setRightConst(12);
    setHistoryLog(['Initial Equation: 3x − 6 = 12']);
  };

  return (
    <div className="lab-inner">
      <svg viewBox="0 0 760 205" className="b1b-svg">
        {/* Fulcrum Triangle */}
        <polygon points="380,125 352,185 408,185" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="380" y="175" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="700">
          =
        </text>

        {/* Horizontal Balance Beam */}
        <line x1="120" y1="125" x2="640" y2="125" stroke="#f8fafc" strokeWidth="4" />

        {/* Left Pan */}
        <rect x="135" y="55" width="190" height="66" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <text x="230" y="94" textAnchor="middle" fill="#38bdf8" fontSize="22" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          {coeffX === 1 ? 'x' : `${coeffX}x`}{' '}
          {leftConst === 0 ? '' : leftConst > 0 ? `+ ${leftConst}` : `− ${Math.abs(leftConst)}`}
        </text>
        <text x="230" y="44" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono, monospace">
          LEFT PAN (Unknown Side)
        </text>

        {/* Right Pan */}
        <rect x="435" y="55" width="190" height="66" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
        <text x="530" y="94" textAnchor="middle" fill="#f59e0b" fontSize="22" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          {rightConst}
        </text>
        <text x="530" y="44" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono, monospace">
          RIGHT PAN (Known Side)
        </text>
      </svg>

      <div className="algebra-controls-bar">
        <div className="alg-btn-group">
          <span className="alg-step-label">Step 1 (Al-Jabr: Restore −6 to 0):</span>
          <button
            type="button"
            className="chip-btn primary-chip"
            disabled={leftConst === 0}
            onClick={() => applyAddConst(6)}
          >
            Add +6 to Both Sides
          </button>
        </div>

        <div className="alg-btn-group">
          <span className="alg-step-label">Step 2 (Scale 3x down to 1x):</span>
          <button
            type="button"
            className="chip-btn primary-chip"
            disabled={leftConst !== 0 || coeffX === 1}
            onClick={() => applyDivide(3)}
          >
            Divide Both Sides by 3
          </button>
        </div>

        <button type="button" className="btn-ghost-sm" onClick={resetProblem}>
          Reset Scale
        </button>
      </div>

      <div className="step-trace-box">
        {historyLog.map((entry, idx) => (
          <div key={idx} className="trace-line">
            <span className="trace-idx">Line {idx + 1}:</span>
            <code>{entry}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   6. MATE 100: Lennard-Jones Interatomic Bonding Energy Well Explorer
   ============================================================================ */
function BondingEnergyWellLab({ onComplete }) {
  const [distR, setDistR] = useState(0.25); // nm
  const [matType, setMatType] = useState('ceramic'); // 'ceramic' | 'metal' | 'polymer'

  useEffect(() => {
    if (Math.abs(distR - 0.25) <= 0.03) {
      onComplete();
    }
  }, [distR, onComplete]);

  const matProfiles = {
    ceramic: {
      name: 'Ceramic (Al₂O₃ Ionic/Covalent)',
      r0: 0.23,
      depth: 85,
      color: '#38bdf8',
      Tm: '2,072 °C (Ultra-deep well → High Melting Point & Stiffness)',
    },
    metal: {
      name: 'Metal (α-Iron Metallic Sea)',
      r0: 0.25,
      depth: 52,
      color: '#f59e0b',
      Tm: '1,538 °C (Medium-deep well → Ductile & Conductive)',
    },
    polymer: {
      name: 'Polymer (Van der Waals Secondary)',
      r0: 0.31,
      depth: 18,
      color: '#10b981',
      Tm: '130 °C (Shallow well → Soft, Melts Easily & High Thermal Expansion)',
    },
  };

  const activeMat = matProfiles[matType];
  // Compute normalized Lennard-Jones energy
  const ratio = activeMat.r0 / distR;
  const rawLJ = Math.pow(ratio, 12) - 2 * Math.pow(ratio, 6); // min is -1 at r = r0
  const clampedLJ = Math.max(-1, Math.min(1.6, rawLJ));

  const zeroEnergyY = 85;
  const pointX = 90 + ((distR - 0.17) / 0.35) * 580;
  const pointY = zeroEnergyY - clampedLJ * activeMat.depth;

  // Build SVG path for active material curve
  const pathPoints = [];
  for (let r = 0.185; r <= 0.50; r += 0.008) {
    const rt = activeMat.r0 / r;
    const e = Math.pow(rt, 12) - 2 * Math.pow(rt, 6);
    if (e <= 1.5) {
      const px = 90 + ((r - 0.17) / 0.35) * 580;
      const py = zeroEnergyY - e * activeMat.depth;
      pathPoints.push(`${pathPoints.length === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
  }

  return (
    <div className="lab-inner">
      <div className="mode-toggle-bar">
        {Object.entries(matProfiles).map(([key, prof]) => (
          <button
            key={key}
            type="button"
            className={`mode-tab ${matType === key ? 'active' : ''}`}
            onClick={() => {
              setMatType(key);
              setDistR(prof.r0);
            }}
          >
            {prof.name}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 760 220" className="b1b-svg">
        {/* Zero Energy Horizontal Axis (r) */}
        <line x1="70" y1={zeroEnergyY} x2="710" y2={zeroEnergyY} stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Vertical Energy Axis */}
        <line x1="90" y1="15" x2="90" y2="205" stroke="#64748b" strokeWidth="2" />
        <text x="82" y="30" textAnchor="end" fill="#f43f5e" fontSize="10" fontFamily="JetBrains Mono, monospace">
          +E (Repulsion)
        </text>
        <text x="82" y="185" textAnchor="end" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono, monospace">
          −E (Bond Well)
        </text>

        {/* Energy Well Curve */}
        <path d={pathPoints.join(' ')} fill="none" stroke={activeMat.color} strokeWidth="3.5" />

        {/* Equilibrium E0 Depth Marker */}
        <line
          x1={90 + ((activeMat.r0 - 0.17) / 0.35) * 580}
          y1={zeroEnergyY}
          x2={90 + ((activeMat.r0 - 0.17) / 0.35) * 580}
          y2={zeroEnergyY + activeMat.depth}
          stroke="#94a3b8"
          strokeDasharray="3 3"
        />
        <text
          x={90 + ((activeMat.r0 - 0.17) / 0.35) * 580 + 8}
          y={zeroEnergyY + activeMat.depth / 2}
          fill="#e2e8f0"
          fontSize="11"
          fontFamily="JetBrains Mono, monospace"
        >
          Bond Energy E₀ (r₀ = {activeMat.r0} nm)
        </text>

        {/* Current State Particle on Curve */}
        <circle cx={pointX} cy={pointY} r="7" fill="#f8fafc" stroke={activeMat.color} strokeWidth="3" />

        {/* Two Visual Atoms Top-Right */}
        <g transform="translate(470, 38)">
          <circle cx="0" cy="0" r="18" fill={activeMat.color} fillOpacity="0.8" />
          <circle cx={distR * 320} cy="0" r="18" fill={activeMat.color} fillOpacity="0.8" />
          <line x1="0" y1="0" x2={distR * 320} y2="0" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={(distR * 320) / 2} y="-24" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="JetBrains Mono, monospace">
            {distR < activeMat.r0 - 0.01
              ? '⚡ Too Close: Electron Clouds Repel!'
              : distR > activeMat.r0 + 0.01
              ? '🧲 Stretched: Bond Pulls Atoms Back'
              : '✓ Equilibrium Bond Spacing (Net Force = 0)'}
          </text>
        </g>
      </svg>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>Interatomic Separation Distance (r)</span>
            <strong className="mono-val cyan-text">{distR.toFixed(2)} nm</strong>
          </div>
          <input
            type="range"
            min="0.19"
            max="0.48"
            step="0.01"
            value={distR}
            onChange={(e) => setDistR(Number(e.target.value))}
          />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Macroscopic Material Prediction</span>
            <strong className="mono-val amber-text">r₀ = {activeMat.r0} nm</strong>
          </div>
          <p className="micro-copy">{activeMat.Tm}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   7. MATH 004: Powers-of-10 Scale Navigator & Exponent Laws
   ============================================================================ */
function ExponentGrowthScalerLab({ onComplete }) {
  const [expA, setExpA] = useState(-9);
  const [expB, setExpB] = useState(23);

  useEffect(() => {
    onComplete();
  }, [expA, expB, onComplete]);

  const SCALE_BENCHMARKS = [
    { exp: -12, label: '10⁻¹² m (Picometer): X-Ray Wavelength & Atomic Nucleus Scale' },
    { exp: -10, label: '10⁻¹⁰ m (1 Ångström): Iron & Silicon Interatomic Bond Length' },
    { exp: -9, label: '10⁻⁹ m (Nanometer): Carbon Nanotube & Transistor Gate Width' },
    { exp: -6, label: '10⁻⁶ m (Micrometer): Steel Crystal Grain Size under Microscope' },
    { exp: -3, label: '10⁻³ m (Millimeter): Sheet Metal Thickness' },
    { exp: 0, label: '10⁰ = 1 (Identity Anchor: Zero Multiplications from 1)' },
    { exp: 6, label: '10⁶ Pa (Megapascal): Typical Yield Stress of Structural Alloys' },
    { exp: 9, label: '10⁹ Pa (Gigapascal): Young’s Stiffness Modulus of Steel (200 GPa)' },
    { exp: 23, label: '10²³ (Avogadro Scale): Number of Atoms in 1 Mole of Material' },
  ];

  const closestBenchmark = SCALE_BENCHMARKS.reduce((prev, curr) =>
    Math.abs(curr.exp - expA) < Math.abs(prev.exp - expA) ? curr : prev
  );

  return (
    <div className="lab-inner">
      <div className="exponent-formula-stage">
        <div className="exp-card">
          <span className="exp-label">Term 1</span>
          <strong className="exp-big cyan-text">10^{expA}</strong>
        </div>
        <span className="pipe-op">×</span>
        <div className="exp-card">
          <span className="exp-label">Term 2</span>
          <strong className="exp-big amber-text">10^{expB}</strong>
        </div>
        <span className="pipe-op">=</span>
        <div className="exp-card exp-result">
          <span className="exp-label">Add Exponents: ({expA}) + ({expB})</span>
          <strong className="exp-big emerald-text">10^{expA + expB}</strong>
        </div>
      </div>

      <div className="benchmark-readout">
        <strong>Scale Benchmark near 10^{expA}:</strong> {closestBenchmark.label}
      </div>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>Exponent A (Microscopic to Macroscopic)</span>
            <strong className="mono-val cyan-text">10^{expA}</strong>
          </div>
          <input type="range" min="-12" max="12" step="1" value={expA} onChange={(e) => setExpA(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Exponent B (Multiplier Scale)</span>
            <strong className="mono-val amber-text">10^{expB}</strong>
          </div>
          <input type="range" min="-10" max="24" step="1" value={expB} onChange={(e) => setExpB(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   8. CHEM 003: Mole & Stoichiometry Corrosion Reactor (Fe + O₂ -> Fe₂O₃)
   ============================================================================ */
function MoleStoichiometryReactorLab({ onComplete }) {
  const [cFe, setCFe] = useState(2);
  const [cO2, setCO2] = useState(2);
  const [cOxide, setCOxide] = useState(1);

  const leftFe = cFe;
  const rightFe = cOxide * 2;
  const leftO = cO2 * 2;
  const rightO = cOxide * 3;
  const isBalanced = leftFe === rightFe && leftO === rightO && cFe === 4 && cO2 === 3 && cOxide === 2;

  useEffect(() => {
    if (isBalanced) {
      onComplete();
    }
  }, [isBalanced, onComplete]);

  return (
    <div className="lab-inner">
      <div className="reactor-equation-bar">
        <div className="reactant-slot">
          <span className="coeff-badge cyan-text">{cFe}</span>
          <span className="chem-formula">Fe (s)</span>
          <small>{(cFe * 55.85).toFixed(1)} g</small>
        </div>
        <span className="pipe-op">+</span>
        <div className="reactant-slot">
          <span className="coeff-badge amber-text">{cO2}</span>
          <span className="chem-formula">O₂ (g)</span>
          <small>{(cO2 * 32.0).toFixed(1)} g</small>
        </div>
        <span className="pipe-op">→</span>
        <div className="reactant-slot">
          <span className="coeff-badge emerald-text">{cOxide}</span>
          <span className="chem-formula">Fe₂O₃ (Hematite Ceramic)</span>
          <small>{(cOxide * 159.7).toFixed(1)} g</small>
        </div>
      </div>

      <div className="atom-accounting-grid">
        <div className={`accounting-card ${leftFe === rightFe ? 'acc-ok' : 'acc-err'}`}>
          <h4>Iron (Fe) Atom Conservation</h4>
          <p className="mono-val">
            Left: {leftFe} Fe atoms  |  Right: {cOxide} × 2 = {rightFe} Fe atoms
          </p>
          <span>{leftFe === rightFe ? '✓ Iron Atoms Balanced!' : '✗ Unbalanced Iron Atoms'}</span>
        </div>

        <div className={`accounting-card ${leftO === rightO ? 'acc-ok' : 'acc-err'}`}>
          <h4>Oxygen (O) Atom Conservation</h4>
          <p className="mono-val">
            Left: {cO2} × 2 = {leftO} O atoms  |  Right: {cOxide} × 3 = {rightO} O atoms
          </p>
          <span>{leftO === rightO ? '✓ Oxygen Atoms Balanced!' : '✗ Unbalanced Oxygen Atoms'}</span>
        </div>
      </div>

      <div className="lab-controls-grid three-cols">
        <div className="control-box">
          <div className="control-label-row">
            <span>Fe Coefficient</span>
            <strong className="mono-val cyan-text">{cFe} mol</strong>
          </div>
          <input type="range" min="1" max="6" value={cFe} onChange={(e) => setCFe(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>O₂ Coefficient</span>
            <strong className="mono-val amber-text">{cO2} mol</strong>
          </div>
          <input type="range" min="1" max="6" value={cO2} onChange={(e) => setCO2(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Fe₂O₃ Coefficient</span>
            <strong className="mono-val emerald-text">{cOxide} mol</strong>
          </div>
          <input type="range" min="1" max="4" value={cOxide} onChange={(e) => setCOxide(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   9. MATH 005: Cartesian Slope & SOH-CAH-TOA Force Vector Decomposer
   ============================================================================ */
function CartesianSlopeWaveLab({ onComplete }) {
  const [forceMag, setForceMag] = useState(100);
  const [angleDeg, setAngleDeg] = useState(37);

  useEffect(() => {
    onComplete();
  }, [forceMag, angleDeg, onComplete]);

  const rad = (angleDeg * Math.PI) / 180;
  const fx = forceMag * Math.cos(rad);
  const fy = forceMag * Math.sin(rad);

  const originX = 120;
  const originY = 185;
  const scale = 1.65;
  const tipX = originX + fx * scale;
  const tipY = originY - fy * scale;

  return (
    <div className="lab-inner">
      <svg viewBox="0 0 760 220" className="b1b-svg">
        {/* Grid axes */}
        <line x1="80" y1={originY} x2="420" y2={originY} stroke="#475569" strokeWidth="2" />
        <line x1={originX} y1="20" x2={originX} y2="205" stroke="#475569" strokeWidth="2" />

        {/* Horizontal Component Fx (Adjacent) */}
        <line x1={originX} y1={originY} x2={tipX} y2={originY} stroke="#38bdf8" strokeWidth="4" />
        <text x={(originX + tipX) / 2} y={originY + 20} textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="JetBrains Mono, monospace">
          F_x = F·cos({angleDeg}°) = {fx.toFixed(1)} N
        </text>

        {/* Vertical Component Fy (Opposite) */}
        <line x1={tipX} y1={originY} x2={tipX} y2={tipY} stroke="#10b981" strokeWidth="4" strokeDasharray="5 3" />
        <text x={tipX + 12} y={(originY + tipY) / 2} fill="#10b981" fontSize="12" fontFamily="JetBrains Mono, monospace">
          F_y = F·sin({angleDeg}°) = {fy.toFixed(1)} N
        </text>

        {/* Hypotenuse Vector F */}
        <line x1={originX} y1={originY} x2={tipX} y2={tipY} stroke="#f59e0b" strokeWidth="4.5" />
        <circle cx={tipX} cy={tipY} r="5.5" fill="#f59e0b" />
        <text x={(originX + tipX) / 2 - 18} y={(originY + tipY) / 2 - 10} fill="#f59e0b" fontSize="12.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          F = {forceMag} N
        </text>

        {/* Right-Triangle Math Summary Panel on Right Side of SVG */}
        <g transform="translate(460, 35)">
          <rect x="0" y="0" width="275" height="145" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="16" y="28" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
            Pythagoras & Slope Check:
          </text>
          <text x="16" y="54" fill="#38bdf8" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            F_x² + F_y² = ({fx.toFixed(1)})² + ({fy.toFixed(1)})²
          </text>
          <text x="16" y="76" fill="#f59e0b" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            √(F_x² + F_y²) = {Math.sqrt(fx * fx + fy * fy).toFixed(1)} N = F
          </text>
          <text x="16" y="104" fill="#10b981" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            Slope m = Rise / Run = tan({angleDeg}°)
          </text>
          <text x="16" y="126" fill="#cbd5e1" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            m = Δy / Δx = {(fy / Math.max(0.01, fx)).toFixed(2)}
          </text>
        </g>
      </svg>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>Tensile Force Angle (θ)</span>
            <strong className="mono-val amber-text">{angleDeg}°</strong>
          </div>
          <input type="range" min="10" max="80" value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Resultant Force Magnitude (F)</span>
            <strong className="mono-val cyan-text">{forceMag} N</strong>
          </div>
          <input type="range" min="50" max="120" step="5" value={forceMag} onChange={(e) => setForceMag(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   10. MATE 102: Interactive 3D Crystal Unit Cell Rotator (SC / BCC / FCC)
   ============================================================================ */
function CrystalLattice3DLab({ onComplete }) {
  const [latticeType, setLatticeType] = useState('bcc'); // 'sc' | 'bcc' | 'fcc'
  const [rotY, setRotY] = useState(32);
  const [rotX, setRotX] = useState(20);

  useEffect(() => {
    onComplete();
  }, [latticeType, rotY, onComplete]);

  // 8 Cube Corners in [-1, 1]^3
  const corners = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];

  // 12 Cube Edges (pairs of corner indices)
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  const faces = [
    [0, 0, -1], [0, 0, 1],
    [0, -1, 0], [0, 1, 0],
    [-1, 0, 0], [1, 0, 0],
  ];

  const project3D = ([x, y, z]) => {
    const radY = (rotY * Math.PI) / 180;
    const radX = (rotX * Math.PI) / 180;
    // Rotate around Y
    const x1 = x * Math.cos(radY) - z * Math.sin(radY);
    const z1 = x * Math.sin(radY) + z * Math.cos(radY);
    // Rotate around X
    const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
    const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

    const scale = 62;
    return {
      px: 230 + x1 * scale,
      py: 115 + y2 * scale,
      depth: z2,
    };
  };

  const projectedCorners = corners.map(project3D);

  const atoms = [
    ...corners.map((c) => ({ pos: c, role: 'corner', color: '#38bdf8', r: 12 })),
    ...(latticeType === 'bcc' ? [{ pos: [0, 0, 0], role: 'body', color: '#f59e0b', r: 18 }] : []),
    ...(latticeType === 'fcc'
      ? faces.map((f) => ({ pos: f, role: 'face', color: '#10b981', r: 15 }))
      : []),
  ]
    .map((atom) => ({ ...atom, ...project3D(atom.pos) }))
    .sort((a, b) => a.depth - b.depth);

  const LATTICE_META = {
    sc: {
      title: 'Simple Cubic (SC)',
      effectiveAtoms: '8 corners × (1/8) = 1.0 Effective Atom',
      apf: '52% Atomic Packing Factor (48% Empty Space)',
      examples: 'Polonium (Rare in metals due to loose packing)',
    },
    bcc: {
      title: 'Body-Centered Cubic (BCC)',
      effectiveAtoms: '8 × (1/8) + 1 Center = 2.0 Effective Atoms',
      apf: '68% Atomic Packing Factor (Touch along √3·a Body Diagonal)',
      examples: 'α-Iron (Room-Temp Steel), Tungsten (W), Chromium (Cr), Titanium-β',
    },
    fcc: {
      title: 'Face-Centered Cubic (FCC)',
      effectiveAtoms: '8 × (1/8) + 6 Faces × (1/2) = 4.0 Effective Atoms',
      apf: '74% Atomic Packing Factor (Maximum Sphere Packing!)',
      examples: 'Aluminum (Al), Copper (Cu), Gold (Au), Nickel (Ni), γ-Austenite Steel',
    },
  };

  const info = LATTICE_META[latticeType];

  return (
    <div className="lab-inner">
      <div className="mode-toggle-bar">
        {Object.entries(LATTICE_META).map(([key, meta]) => (
          <button
            key={key}
            type="button"
            className={`mode-tab ${latticeType === key ? 'active' : ''}`}
            onClick={() => setLatticeType(key)}
          >
            {meta.title}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 760 230" className="b1b-svg">
        {/* Cube wireframe edges */}
        {edges.map(([i, j], idx) => (
          <line
            key={idx}
            x1={projectedCorners[i].px}
            y1={projectedCorners[i].py}
            x2={projectedCorners[j].px}
            y2={projectedCorners[j].py}
            stroke="#475569"
            strokeWidth="2"
          />
        ))}

        {/* Depth-sorted 3D Atoms */}
        {atoms.map((atom, idx) => (
          <circle
            key={idx}
            cx={atom.px}
            cy={atom.py}
            r={atom.r}
            fill={atom.color}
            stroke="#0c1017"
            strokeWidth="2"
          />
        ))}

        {/* Info readout on right */}
        <g transform="translate(420, 28)">
          <rect x="0" y="0" width="315" height="170" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="16" y="28" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
            {info.title}
          </text>
          <text x="16" y="56" fill="#38bdf8" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            {info.effectiveAtoms}
          </text>
          <text x="16" y="82" fill="#f59e0b" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            {info.apf}
          </text>
          <text x="16" y="114" fill="#94a3b8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Engineering Metals:
          </text>
          <text x="16" y="134" fill="#10b981" fontSize="11.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
            {info.examples}
          </text>
          <text x="16" y="156" fill="#cbd5e1" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
            Cyan = 1/8 Corner | Amber = 1 Body | Green = 1/2 Face
          </text>
        </g>
      </svg>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>3D Azimuth Rotation (Yaw)</span>
            <strong className="mono-val cyan-text">{rotY}°</strong>
          </div>
          <input type="range" min="-60" max="60" value={rotY} onChange={(e) => setRotY(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>3D Elevation Tilt (Pitch)</span>
            <strong className="mono-val amber-text">{rotX}°</strong>
          </div>
          <input type="range" min="-45" max="45" value={rotX} onChange={(e) => setRotX(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
