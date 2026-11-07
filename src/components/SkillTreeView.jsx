import React from 'react';
import { LESSONS, UM_SKILL_TREE_NODES } from '../data/curriculum';

export default function SkillTreeView({
  passedLessons,
  isLessonUnlocked,
  activeLessonId,
  onSelectLesson,
}) {
  return (
    <section className="skill-tree-panel" aria-label="UM Materials Engineering Prerequisite Skill Tree">
      <div className="skill-tree-header">
        <div>
          <span className="section-eyebrow">UNIVERSITY OF MINDANAO • CEE BSMTE CURRICULUM MAP</span>
          <h3>Prerequisite Dependency Graph & Self-Paced Course Queue</h3>
          <p>
            Zero calendar deadlines or "missed day" pressure—take each module whenever your schedule allows, and pass its prerequisite gate (80%+) to unlock the next module.
          </p>
        </div>
        <div className="tree-legend">
          <span className="legend-item"><i className="dot dot-passed" /> Passed (80%+)</span>
          <span className="legend-item"><i className="dot dot-unlocked" /> Ready / Enrolled</span>
          <span className="legend-item"><i className="dot dot-locked" /> Prerequisite Locked</span>
        </div>
      </div>

      {/* Interactive SVG Skill Tree DAG (24 Modules from Math 001 to 4th-Year BSMTE Capstone) */}
      <div className="skill-tree-svg-wrap">
        <svg viewBox="0 0 1860 230" className="skill-tree-svg" style={{ minWidth: '1580px' }}>
          {/* Directed Edges */}
          {UM_SKILL_TREE_NODES.map((node) =>
            node.connectsTo.map((targetId) => {
              const target = UM_SKILL_TREE_NODES.find((n) => n.id === targetId);
              if (!target) return null;
              const x1 = (node.x / 100) * 1740 + 60;
              const y1 = (node.y / 100) * 190 + 20;
              const x2 = (target.x / 100) * 1740 + 60;
              const y2 = (target.y / 100) * 190 + 20;
              const isEdgeActive = !!passedLessons[node.id];

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isEdgeActive ? '#10b981' : '#334155'}
                  strokeWidth={isEdgeActive ? 3 : 2}
                  strokeDasharray={isEdgeActive ? 'none' : '5 5'}
                />
              );
            })
          )}

          {/* Nodes */}
          {UM_SKILL_TREE_NODES.map((node) => {
            const cx = (node.x / 100) * 1740 + 60;
            const cy = (node.y / 100) * 190 + 20;
            const isPassed = !!passedLessons[node.id];
            const isUnlocked = isLessonUnlocked(node.id);
            const isCurrent = activeLessonId === node.id;

            const strokeColor = isPassed
              ? '#10b981'
              : isUnlocked
              ? '#38bdf8'
              : '#475569';

            return (
              <g
                key={node.id}
                className={`tree-node-group ${isUnlocked ? 'node-clickable' : 'node-disabled'}`}
                onClick={() => {
                  if (isUnlocked) onSelectLesson(node.id);
                }}
              >
                <rect
                  x={cx - 64}
                  y={cy - 28}
                  width="128"
                  height="56"
                  rx="10"
                  fill={isCurrent ? '#1e293b' : '#0f172a'}
                  stroke={strokeColor}
                  strokeWidth={isCurrent ? 3 : 2}
                />
                <text
                  x={cx}
                  y={cy - 6}
                  textAnchor="middle"
                  fill={strokeColor}
                  fontSize="11.5"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {isPassed ? '✓ ' : !isUnlocked ? '🔒 ' : '⚡ '}
                  {node.code}
                </text>
                <text
                  x={cx}
                  y={cy + 13}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="9.5"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {node.name.length > 18 ? `${node.name.slice(0, 17)}…` : node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Weekly College Timetable Grid (Mon - Sat) */}
      <div className="timetable-grid">
        {LESSONS.map((item) => {
          const passed = !!passedLessons[item.id];
          const unlocked = isLessonUnlocked(item.id);
          const active = activeLessonId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`timetable-card ${active ? 'tt-active' : ''} ${
                passed ? 'tt-passed' : unlocked ? 'tt-unlocked' : 'tt-locked'
              }`}
              onClick={() => {
                if (unlocked) onSelectLesson(item.id);
              }}
              disabled={!unlocked}
            >
              <div className="tt-top">
                <span className="tt-day">
                  {item.daySlot}
                </span>
                <span className={`tt-track track-${item.track}`}>{item.code}</span>
              </div>
              <h4 className="tt-title">{item.title}</h4>
              <div className="tt-footer">
                <span>
                  {passed
                    ? `✓ Passed (${passedLessons[item.id].score}%)`
                    : unlocked
                    ? '⚡ Open for Study'
                    : `🔒 Pass ${item.prereqIds.join(', ').toUpperCase()} first`}
                </span>
                <span className="tt-xp">+{item.xpReward} XP</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
