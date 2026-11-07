import React, { useState, useEffect } from 'react';

export default function AdvancedVisualLabs({ type, onComplete }) {
  const [paramA, setParamA] = useState(50);
  const [paramB, setParamB] = useState(35);

  useEffect(() => {
    onComplete();
  }, [paramA, paramB, type, onComplete]);

  if (type === 'phase_diagram_lever_lab') {
    const cAlpha = 10;
    const cBeta = 90;
    const c0 = Math.max(15, Math.min(85, paramA));
    const wAlpha = ((cBeta - c0) / (cBeta - cAlpha)) * 100;
    const wBeta = ((c0 - cAlpha) / (cBeta - cAlpha)) * 100;
    const toX = (c) => 80 + (c / 100) * 600;

    return (
      <div className="lab-inner">
        <svg viewBox="0 0 760 210" className="b1b-svg">
          <line x1="80" y1="165" x2="680" y2="165" stroke="#475569" strokeWidth="2" />
          {/* Tie line */}
          <line x1={toX(cAlpha)} y1="95" x2={toX(cBeta)} y2="95" stroke="#334155" strokeWidth="6" />
          {/* Left Arm (Opposite to Beta) */}
          <line x1={toX(cAlpha)} y1="95" x2={toX(c0)} y2="95" stroke="#38bdf8" strokeWidth="6" />
          {/* Right Arm (Opposite to Alpha) */}
          <line x1={toX(c0)} y1="95" x2={toX(cBeta)} y2="95" stroke="#f59e0b" strokeWidth="6" />

          {/* Endpoints & Fulcrum */}
          <circle cx={toX(cAlpha)} cy="95" r="8" fill="#38bdf8" />
          <text x={toX(cAlpha)} y="72" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="JetBrains Mono, monospace">
            Phase α ({cAlpha}% B)
          </text>

          <circle cx={toX(cBeta)} cy="95" r="8" fill="#f59e0b" />
          <text x={toX(cBeta)} y="72" textAnchor="middle" fill="#f59e0b" fontSize="12" fontFamily="JetBrains Mono, monospace">
            Phase β ({cBeta}% B)
          </text>

          <polygon
            points={`${toX(c0)},98 ${toX(c0) - 12},128 ${toX(c0) + 12},128`}
            fill="#10b981"
          />
          <text x={toX(c0)} y="148" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            Alloy C₀ = {c0} wt% B
          </text>

          <text x="380" y="34" textAnchor="middle" fill="#f8fafc" fontSize="13.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            Lever Rule:  W_α = ({cBeta} − {c0})/80 = {wAlpha.toFixed(1)}%   |   W_β = ({c0} − {cAlpha})/80 = {wBeta.toFixed(1)}%
          </text>
        </svg>

        <div className="lab-controls-grid">
          <div className="control-box">
            <div className="control-label-row">
              <span>Overall Alloy Composition (C₀)</span>
              <strong className="mono-val emerald-text">{c0} wt% B</strong>
            </div>
            <input type="range" min="15" max="85" value={c0} onChange={(e) => setParamA(Number(e.target.value))} />
          </div>
          <div className="control-box">
            <div className="control-label-row">
              <span>Microstructure Mass Fractions</span>
              <strong className="mono-val amber-text">
                {wAlpha.toFixed(1)}% α  /  {wBeta.toFixed(1)}% β
              </strong>
            </div>
            <p className="micro-copy">
              Notice how moving C₀ closer to Phase β increases the fraction of Phase β!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'stress_strain_curve_lab' || type === 'integral_area_toughness_lab') {
    const strainPct = Math.max(1, Math.min(95, paramA));
    const cursorX = 90 + (strainPct / 100) * 580;

    return (
      <div className="lab-inner">
        <svg viewBox="0 0 760 215" className="b1b-svg">
          <line x1="90" y1="180" x2="690" y2="180" stroke="#475569" strokeWidth="2" />
          <line x1="90" y1="20" x2="90" y2="180" stroke="#475569" strokeWidth="2" />
          {/* Shaded Toughness Integral Area */}
          <path
            d="M 90 180 L 180 75 Q 340 25 500 35 Q 600 45 650 85 L 650 180 Z"
            fill="#10b981"
            fillOpacity="0.16"
          />
          {/* Stress-Strain Curve */}
          <path
            d="M 90 180 L 180 75 Q 340 25 500 35 Q 600 45 650 85"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
          />
          <circle cx="180" cy="75" r="5" fill="#f59e0b" />
          <text x="180" y="62" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="JetBrains Mono, monospace">
            Yield (σ_y)
          </text>
          <circle cx="445" cy="33" r="5" fill="#10b981" />
          <text x="445" y="21" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="JetBrains Mono, monospace">
            UTS Peak (Necking Starts)
          </text>
          <circle cx="650" cy="85" r="5" fill="#f43f5e" />
          <text x="650" y="72" textAnchor="middle" fill="#f43f5e" fontSize="11" fontFamily="JetBrains Mono, monospace">
            Fracture (✕)
          </text>
          {/* Scrubber line */}
          <line x1={cursorX} y1="25" x2={cursorX} y2="180" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="2" />
          <text x="390" y="198" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono, monospace">
            {strainPct < 18
              ? 'Regime: Linear Elastic (σ = E·ε — Reversible Atomic Bond Stretch)'
              : strainPct < 65
              ? 'Regime: Plastic Strain Hardening (Dislocations Multiply & Tangle)'
              : 'Regime: Localized Necking → Fracture (Toughness = Shaded Area ∫ σ dε)'}
          </text>
        </svg>

        <div className="lab-controls-grid">
          <div className="control-box">
            <div className="control-label-row">
              <span>Applied Tensile Strain Scrubber (ε)</span>
              <strong className="mono-val cyan-text">{(strainPct * 0.25).toFixed(1)}% Elongation</strong>
            </div>
            <input type="range" min="2" max="95" value={strainPct} onChange={(e) => setParamA(Number(e.target.value))} />
          </div>
          <div className="control-box">
            <div className="control-label-row">
              <span>Accumulated Toughness Integral (∫ σ dε)</span>
              <strong className="mono-val emerald-text">{(strainPct * 1.45).toFixed(1)} MJ/m³</strong>
            </div>
            <p className="micro-copy">
              The area under the curve equals the total mechanical energy absorbed per m³ before fracture.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Universal interactive parameter curve explorer for Calculus, Quadratics, Thermodynamics, Diffusion, TTT, Polymers, Ceramics, Semiconductors, and Ashby
  const xNorm = paramA / 100;
  const curveX = 110 + xNorm * 540;
  const slopeVal = ((paramA - 50) * 0.16).toFixed(2);
  const funcVal = (0.04 * (paramA - 50) * (paramA - 50) + 25).toFixed(1);
  const curveY = 165 - ((paramA - 50) * (paramA - 50)) * 0.045;

  // Build parabola/curve path
  const pts = [];
  for (let p = 5; p <= 95; p += 3) {
    const px = 110 + (p / 100) * 540;
    const py = 165 - ((p - 50) * (p - 50)) * 0.045;
    pts.push(`${pts.length === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`);
  }

  const tangentSlope = -(paramA - 50) * 0.09 * 0.42;
  const tx1 = curveX - 75;
  const ty1 = curveY - tangentSlope * 75;
  const tx2 = curveX + 75;
  const ty2 = curveY + tangentSlope * 75;

  return (
    <div className="lab-inner">
      <svg viewBox="0 0 760 210" className="b1b-svg">
        <line x1="90" y1="175" x2="670" y2="175" stroke="#475569" strokeWidth="2" />
        <line x1="380" y1="20" x2="380" y2="190" stroke="#334155" strokeDasharray="4 4" strokeWidth="1.5" />
        <path d={pts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth="3.5" />
        <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx={curveX} cy={curveY} r="6.5" fill="#10b981" stroke="#0c1017" strokeWidth="2" />
        <text x="380" y="32" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          State Value f(x) = {funcVal}   |   Instantaneous Derivative Slope (dy/dx) = {slopeVal}
        </text>
        <text x="380" y="198" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="JetBrains Mono, monospace">
          {Math.abs(paramA - 50) <= 3
            ? '✓ Critical Stationary Point Reached: Tangent Slope dy/dx = 0.00 (Local Minimum Equilibrium!)'
            : 'Drag the Control Parameter toward 50 to find the stationary equilibrium point (dy/dx = 0)'}
        </text>
      </svg>

      <div className="lab-controls-grid">
        <div className="control-box">
          <div className="control-label-row">
            <span>Primary State Parameter (x / T / C)</span>
            <strong className="mono-val cyan-text">{paramA}</strong>
          </div>
          <input type="range" min="10" max="90" value={paramA} onChange={(e) => setParamA(Number(e.target.value))} />
        </div>
        <div className="control-box">
          <div className="control-label-row">
            <span>Secondary Coupling Factor</span>
            <strong className="mono-val amber-text">{paramB}</strong>
          </div>
          <input type="range" min="10" max="90" value={paramB} onChange={(e) => setParamB(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
