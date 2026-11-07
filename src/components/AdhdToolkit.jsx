import React, { useState, useEffect } from 'react';

export default function AdhdToolkit({ overtimeMode, onToggleOvertime }) {
  // Pomodoro Timer State
  const [secondsLeft, setSecondsLeft] = useState(overtimeMode ? 15 * 60 : 25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(overtimeMode ? '15m' : '25m');

  // Step-by-step Working Memory Equation Lines
  const [stepLines, setStepLines] = useState([
    'Line 1: Write given values & units here...',
    'Line 2: Rearrange formula / isolate variable...',
  ]);
  const [newStepInput, setNewStepInput] = useState('');

  // Quick Expression Calculator
  const [calcExpr, setCalcExpr] = useState('(-3) * (-4) + 18 / 3');
  const [calcOut, setCalcOut] = useState('18');

  // Persistent Brain Dump Notes
  const [brainDump, setBrainDump] = useState(() => {
    return (
      localStorage.getItem('um_mate_brain_dump') ||
      '• Why does Al₂O₃ need 2 Al and 3 O? (+6 and -6 = 0)\n• Ask UM Registrar about GE subject crediting from CS degree'
    );
  });

  useEffect(() => {
    localStorage.setItem('um_mate_brain_dump', brainDump);
  }, [brainDump]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const selectPreset = (label, mins) => {
    setIsRunning(false);
    setTimerPreset(label);
    setSecondsLeft(mins * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleEvalCalc = (expr) => {
    setCalcExpr(expr);
    try {
      // Safe arithmetic evaluation supporting ^ as **
      const sanitized = expr.replace(/\^/g, '**').replace(/[^0-9+\-*/().\s*]/g, '');
      if (!sanitized.trim()) {
        setCalcOut('...');
        return;
      }
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${sanitized})`)();
      if (typeof val === 'number' && !Number.isNaN(val)) {
        setCalcOut(Number.isInteger(val) ? String(val) : val.toPrecision(6));
      } else {
        setCalcOut('...');
      }
    } catch {
      setCalcOut('...');
    }
  };

  const addEquationStep = (e) => {
    e.preventDefault();
    if (!newStepInput.trim()) return;
    setStepLines((prev) => [...prev, `Line ${prev.length + 1}: ${newStepInput.trim()}`]);
    setNewStepInput('');
  };

  return (
    <aside className="adhd-toolkit-sidebar" aria-label="ADHD Focus & Working Memory Toolkit">
      {/* 1. Shift Energy & Overtime Mode Switcher */}
      <div className="toolkit-card shift-card">
        <div className="toolkit-card-header">
          <span className="toolkit-eyebrow">SHIFT ENERGY ADAPTER (10AM–10PM PH)</span>
          <span className={`energy-badge ${overtimeMode ? 'badge-overtime' : 'badge-standard'}`}>
            {overtimeMode ? '🌙 10PM Overtime Sprint' : '⚡ 6PM Full Lecture'}
          </span>
        </div>
        <p className="toolkit-desc">
          {overtimeMode
            ? 'Work ran late tonight! Lessons are condensed into a 15-min TL;DR + Visual Lab + Gate so you keep your streak alive with zero burnout.'
            : 'Out of work on time! Full Historical Origin Stories, CS Compiler Bridges, and Guided Derivations are expanded.'}
        </p>
        <button
          type="button"
          className={`btn-toggle-overtime ${overtimeMode ? 'active' : ''}`}
          onClick={onToggleOvertime}
        >
          {overtimeMode
            ? 'Switch to 45-Min Standard Class Mode'
            : 'Work Ended at 9–10 PM? Activate 15-Min Overtime Mode'}
        </button>
      </div>

      {/* 2. Focus Sprint Timer */}
      <div className="toolkit-card">
        <div className="toolkit-card-header">
          <span className="toolkit-eyebrow">DOPAMINE SPRINT TIMER</span>
          <div className="preset-pills">
            <button
              type="button"
              className={`mini-pill ${timerPreset === '15m' ? 'active' : ''}`}
              onClick={() => selectPreset('15m', 15)}
            >
              15m OT
            </button>
            <button
              type="button"
              className={`mini-pill ${timerPreset === '25m' ? 'active' : ''}`}
              onClick={() => selectPreset('25m', 25)}
            >
              25m Focus
            </button>
            <button
              type="button"
              className={`mini-pill ${timerPreset === '5m' ? 'active' : ''}`}
              onClick={() => selectPreset('5m', 5)}
            >
              5m Break
            </button>
          </div>
        </div>

        <div className="timer-display-row">
          <div className="timer-digits">{formatTime(secondsLeft)}</div>
          <div className="timer-controls">
            <button
              type="button"
              className="btn-timer-main"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              className="btn-timer-reset"
              onClick={() => selectPreset(timerPreset, parseInt(timerPreset, 10))}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3. Working Memory Step-by-Step Equation Pad */}
      <div className="toolkit-card">
        <div className="toolkit-card-header">
          <span className="toolkit-eyebrow">WORKING-MEMORY STEP SOLVER</span>
          <button
            type="button"
            className="text-clear-btn"
            onClick={() => setStepLines(['Line 1: Ready for next problem...'])}
          >
            Clear Steps
          </button>
        </div>
        <p className="toolkit-desc">
          Don’t hold intermediate algebra steps in your head—offload each line here like stack frames:
        </p>

        <div className="step-pad-list">
          {stepLines.map((line, i) => (
            <div key={i} className="step-pad-item">
              <code>{line}</code>
            </div>
          ))}
        </div>

        <form onSubmit={addEquationStep} className="step-input-form">
          <input
            type="text"
            placeholder="e.g. 6x = 24  ->  x = 4"
            value={newStepInput}
            onChange={(e) => setNewStepInput(e.target.value)}
            className="toolkit-input"
          />
          <button type="submit" className="btn-add-step">
            + Line
          </button>
        </form>

        {/* Quick Live Expression Evaluator */}
        <div className="quick-calc-box">
          <label className="calc-label">
            <span>Quick Arithmetic Verifier (`^` for power):</span>
            <input
              type="text"
              value={calcExpr}
              onChange={(e) => handleEvalCalc(e.target.value)}
              className="toolkit-input mono-input"
            />
          </label>
          <div className="calc-output">
            <span>Result =</span>
            <strong className="cyan-text">{calcOut}</strong>
          </div>
        </div>
      </div>

      {/* 4. ADHD Brain Dump Parking Lot */}
      <div className="toolkit-card">
        <div className="toolkit-card-header">
          <span className="toolkit-eyebrow">ADHD BRAIN-DUMP PARKING LOT</span>
          <span className="saved-indicator">Auto-Saved</span>
        </div>
        <p className="toolkit-desc">
          Random thought popped up mid-lesson? Park it here so your focus stays locked on class:
        </p>
        <textarea
          rows={4}
          value={brainDump}
          onChange={(e) => setBrainDump(e.target.value)}
          className="brain-dump-textarea"
          placeholder="Park stray thoughts, questions, or reminders here..."
        />
      </div>
    </aside>
  );
}
