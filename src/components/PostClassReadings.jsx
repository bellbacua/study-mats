import React, { useState } from 'react';
import { LESSON_READINGS, GLOBAL_OPEN_SOURCE_SHELF } from '../data/openSourceReadings';

export default function PostClassReadings({
  lessonId,
  lessonCode,
  completedReadings,
  onToggleReadingDone,
}) {
  const readings = LESSON_READINGS[lessonId] || [];
  const [expandedId, setExpandedId] = useState(() =>
    readings[0] ? readings[0].id : null
  );
  const [showGlobalShelf, setShowGlobalShelf] = useState(false);

  return (
    <section
      className="post-readings-section"
      aria-label="Post-Class Open-Source Deep-Dive Readings"
    >
      <div className="readings-header-row">
        <div>
          <span className="section-eyebrow">
            POST-CLASS FURTHER EXPLORATION • 100% FREE & OPEN-SOURCE
          </span>
          <h3 className="readings-main-title">
            {lessonCode} Deep-Dive Readings (OpenStax, Blogs & MIT/Cambridge OCW)
          </h3>
          <p className="readings-subtitle">
            Want to go deeper after class? Read the curated **In-App Textbook Excerpt** right here without leaving your workspace, or jump straight to the full open-source chapter/blog.
          </p>
        </div>

        <button
          type="button"
          className="btn-ghost-sm"
          onClick={() => setShowGlobalShelf(!showGlobalShelf)}
        >
          📚 {showGlobalShelf ? 'Hide Full Open-Source Library' : 'View Full Open-Source Bookshelf (6)'}
        </button>
      </div>

      {/* Lesson-Specific Curated Readings */}
      <div className="readings-cards-list">
        {readings.map((item) => {
          const isRead = !!completedReadings[item.id];
          const isExpanded = expandedId === item.id;

          return (
            <article
              key={item.id}
              className={`reading-card ${isRead ? 'reading-completed' : ''}`}
            >
              <div className="reading-card-top">
                <div className="reading-meta-badges">
                  <span className="reading-type-badge">{item.type}</span>
                  <span className="reading-source-tag">{item.source}</span>
                  <span className="reading-time-tag">⏱ {item.readTime}</span>
                </div>

                <div className="reading-actions-cluster">
                  <button
                    type="button"
                    className={`btn-mark-read ${isRead ? 'read-done' : ''}`}
                    onClick={() => onToggleReadingDone(item.id)}
                  >
                    {isRead ? '✓ Read (+25 XP Earned)' : 'Mark as Read (+25 XP)'}
                  </button>
                </div>
              </div>

              <h4 className="reading-title">{item.title}</h4>
              <p className="reading-why">
                <strong>Why read this:</strong> {item.whyRead}
              </p>

              <div className="reading-btn-bar">
                <button
                  type="button"
                  className="btn-excerpt-toggle"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : item.id)
                  }
                >
                  {isExpanded
                    ? '▾ Hide In-App Textbook/Blog Excerpt'
                    : '▸ Read Key Excerpt & Extra Examples In-App'}
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-external-resource"
                >
                  Open Full Open-Source Resource ({item.source.split('•')[0].trim()}) ↗
                </a>
              </div>

              {isExpanded && (
                <div className="in-app-excerpt-drawer">
                  <div className="excerpt-label">
                    IN-APP DIGEST & WORKED NOTES FROM {item.source.toUpperCase()}
                  </div>
                  <div className="excerpt-body">{item.inAppExcerpt}</div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Optional Global Open-Source Reference Shelf */}
      {showGlobalShelf && (
        <div className="global-shelf-box">
          <div className="shelf-header">
            <h4>Permanent Open-Source Materials Engineering & Math Library</h4>
            <p>
              Bookmark these 6 zero-cost textbooks and visual archives—they cover your entire journey from Pre-Algebra to 4th-Year UM Materials Engineering:
            </p>
          </div>

          <div className="shelf-grid">
            {GLOBAL_OPEN_SOURCE_SHELF.map((book, idx) => (
              <a
                key={idx}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shelf-item-card"
              >
                <span className="shelf-cat">{book.category}</span>
                <h5>{book.title} ↗</h5>
                <p>{book.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
