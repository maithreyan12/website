'use client';

import React, { useState } from 'react';
import styles from './CycleCalculatorSection.module.css';

export const CycleCalculatorSection: React.FC = () => {
  // Inputs
  const [lastPeriodDate, setLastPeriodDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d.toISOString().split('T')[0];
  });
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);

  // Calculations
  const startDate = new Date(lastPeriodDate);
  const nextPeriodDate = new Date(startDate);
  nextPeriodDate.setDate(startDate.getDate() + cycleLength);

  const ovulationDate = new Date(nextPeriodDate);
  ovulationDate.setDate(nextPeriodDate.getDate() - 14);

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(ovulationDate.getDate() - 4);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(ovulationDate.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const daysUntilNext = Math.ceil(
    (nextPeriodDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section id="cycle-calculator" className={`section ${styles.calcSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Smart Cycle Intelligence</span>
          <h2 className={styles.title}>Interactive Period & Flow Predictor</h2>
          <p className={styles.subtitle}>
            Plan your month with confidence. Predict your next period, understand your hormonal
            phases, and ensure your personalized PIAX box arrives right on time.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.grid}>
            {/* Input Controls */}
            <div className={styles.controlsCol}>
              <h3 className={styles.colTitle}>Cycle Parameters</h3>

              {/* Date Input */}
              <div className={styles.formGroup}>
                <label className={styles.label}>First Day of Last Period</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                />
              </div>

              {/* Cycle Length Slider */}
              <div className={styles.formGroup}>
                <div className={styles.sliderHeader}>
                  <label className={styles.label}>Average Cycle Length</label>
                  <span className={styles.sliderVal}>{cycleLength} Days</span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="40"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderMarks}>
                  <span>21 days</span>
                  <span>28 days (Normal)</span>
                  <span>40 days</span>
                </div>
              </div>

              {/* Period Duration Slider */}
              <div className={styles.formGroup}>
                <div className={styles.sliderHeader}>
                  <label className={styles.label}>Period Flow Duration</label>
                  <span className={styles.sliderVal}>{periodDuration} Days</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="8"
                  value={periodDuration}
                  onChange={(e) => setPeriodDuration(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderMarks}>
                  <span>3 days</span>
                  <span>5 days</span>
                  <span>8 days</span>
                </div>
              </div>

              <div className={styles.hintBox}>
                <span>💡 Tip:</span> Cycles between 24 and 35 days are clinically considered healthy. Sync your daily symptoms in the PIAX mobile app for AI-assisted hormone curve predictions.
              </div>
            </div>

            {/* Results Display */}
            <div className={styles.resultsCol}>
              <div className={styles.resultsHeader}>
                <span className="badge badge-coral">Forecast Summary</span>
                <div className={styles.daysBadge}>
                  {daysUntilNext > 0 ? `In ${daysUntilNext} days` : 'Due soon'}
                </div>
              </div>

              {/* Next Period Box */}
              <div className={styles.nextPeriodBox}>
                <span className={styles.npLabel}>Next Predicted Period</span>
                <div className={styles.npDate}>{formatDate(nextPeriodDate)}</div>
                <span className={styles.npSub}>
                  Expected duration: {periodDuration} days of flow
                </span>
              </div>

              {/* Cycle Milestones */}
              <div className={styles.milestoneGrid}>
                <div className={styles.milestoneCard}>
                  <span className={styles.mIcon}>🌿</span>
                  <div>
                    <span className={styles.mLabel}>Fertile Window</span>
                    <strong>
                      {formatDate(fertileStart)} – {formatDate(fertileEnd)}
                    </strong>
                  </div>
                </div>

                <div className={styles.milestoneCard}>
                  <span className={styles.mIcon}>✨</span>
                  <div>
                    <span className={styles.mLabel}>Estimated Ovulation</span>
                    <strong>{formatDate(ovulationDate)}</strong>
                  </div>
                </div>
              </div>

              {/* Recommended Pad Configuration */}
              <div className={styles.recPackBox}>
                <span className={styles.recLabel}>
                  📦 Recommended Pack for Your {periodDuration}-Day Flow:
                </span>
                <div className={styles.recBadges}>
                  <span className={styles.badgeXxl}>
                    {Math.round(periodDuration * 0.8)} Heavy XXL
                  </span>
                  <span className={styles.badgeXl}>
                    {Math.round(periodDuration * 1.0)} Medium XL
                  </span>
                  <span className={styles.badgeL}>
                    {Math.round(periodDuration * 0.6)} Light L
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className={styles.resultActions}>
                <a href="#custom-box" className="btn btn-primary" style={{ width: '100%' }}>
                  Order Custom Box for {formatDate(nextPeriodDate)} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
