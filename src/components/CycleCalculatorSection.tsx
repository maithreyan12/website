'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  SparkleIcon,
  LeafIcon,
  PackageIcon,
  ArrowRightIcon,
  CalendarIcon,
} from './Icons';
import styles from './CycleCalculatorSection.module.css';

/** yyyy-mm-dd in her own time zone (toISOString would give UTC's date). */
function localIsoDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const CycleCalculatorSection: React.FC = () => {
  const { openApp, savedCycle } = useCart();
  const [lastPeriodDate, setLastPeriodDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return localIsoDate(d);
  });
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  // Whether she changed the example values; only then are they sent to her tracker.
  const [edited, setEdited] = useState(false);

  // Once the app reports her saved cycle, show exactly that, so the calculator
  // and the tracker never disagree.
  useEffect(() => {
    if (!savedCycle) return;
    setLastPeriodDate(savedCycle.last);
    setCycleLength(Math.min(40, Math.max(21, savedCycle.cycle)));
    setPeriodDuration(Math.min(8, Math.max(3, savedCycle.period)));
    setEdited(false);
  }, [savedCycle]);

  const openTracker = () =>
    openApp(
      'tracker',
      edited ? { last: lastPeriodDate, cycle: String(cycleLength), period: String(periodDuration) } : undefined,
    );

  // Same prediction as the app's backend (services/cycle_prediction.py):
  const DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(`${lastPeriodDate}T00:00:00`);
  const daysPassed = Math.round((today.getTime() - startDate.getTime()) / DAY);
  const currentDay = (((daysPassed % cycleLength) + cycleLength) % cycleLength) + 1;
  // Day `cycleLength` is the last of this cycle; the next starts the day after.
  const daysUntilNext = cycleLength - currentDay + 1;
  const nextPeriodDate = new Date(today.getTime() + daysUntilNext * DAY);
  const cycleStart = new Date(today.getTime() - (currentDay - 1) * DAY);
  const fertileStart = new Date(cycleStart.getTime() + 11 * DAY);
  const fertileEnd = new Date(cycleStart.getTime() + 16 * DAY);
  const ovulationDate = new Date(cycleStart.getTime() + 13 * DAY);

  // A pad every 4–6 hours -> about 4 a day; packs hold 6.
  const padsNeeded = periodDuration * 4;
  const packsNeeded = Math.ceil(padsNeeded / 6);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="cycle-calculator" className={`section ${styles.calcSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Smart Cycle Intelligence</span>
          <h2 className={styles.title}>Interactive Period & Flow Predictor</h2>
          <p className={styles.subtitle}>
            Plan your month with restorative confidence. Predict your next period, understand your hormonal
            phases, and ensure your personalized PIAX box arrives at your doorstep before your cycle starts.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.controlsCol}>
              <h3 className={styles.colTitle}>Cycle Parameters</h3>
              {savedCycle && !edited && (
                <p className={styles.savedNote}>Showing your saved cycle from your PIAX tracker</p>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>First Day of Last Period</label>
                <input
                  type="date"
                  max={localIsoDate(new Date())}
                  className={styles.dateInput}
                  value={lastPeriodDate}
                  onChange={(e) => {
                    if (!e.target.value) return;
                    setLastPeriodDate(e.target.value);
                    setEdited(true);
                  }}
                />
              </div>

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
                  onChange={(e) => {
                    setCycleLength(Number(e.target.value));
                    setEdited(true);
                  }}
                  className={styles.slider}
                />
                <div className={styles.sliderMarks}>
                  <span>21 days</span>
                  <span>28 days (Normal)</span>
                  <span>40 days</span>
                </div>
              </div>

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
                  onChange={(e) => {
                    setPeriodDuration(Number(e.target.value));
                    setEdited(true);
                  }}
                  className={styles.slider}
                />
                <div className={styles.sliderMarks}>
                  <span>3 days</span>
                  <span>5 days</span>
                  <span>8 days</span>
                </div>
              </div>

              <div className={styles.hintBox}>
                <div className={styles.hintIconWrap}>
                  <SparkleIcon size={16} color="#0D6B5B" />
                </div>
                <div>
                  <strong>Comfort Tip:</strong> Sync your daily symptoms in the PIAX mobile app for AI-assisted hormone curve predictions, private cycle logging, and cramp-soothing recipes.
                </div>
              </div>
            </div>

            <div className={styles.resultsCol}>
              <div className={styles.resultsHeader}>
                <span className="badge badge-coral">Forecast Summary</span>
                <div className={styles.daysBadge}>
                  {daysUntilNext > 1 ? `In ${daysUntilNext} days` : 'Tomorrow'}
                </div>
              </div>

              <div className={styles.nextPeriodBox}>
                <span className={styles.npLabel}>Next Predicted Period</span>
                <div className={styles.npDate}>{formatDate(nextPeriodDate)}</div>
                <span className={styles.npSub}>
                  Expected duration: {periodDuration} days of flow
                </span>
              </div>

              <div className={styles.milestoneGrid}>
                <div className={styles.milestoneCard}>
                  <div className={styles.mIconWrap}>
                    <LeafIcon size={18} color="#0D6B5B" />
                  </div>
                  <div>
                    <span className={styles.mLabel}>Fertile Window</span>
                    <strong>
                      {formatDate(fertileStart)} – {formatDate(fertileEnd)}
                    </strong>
                  </div>
                </div>

                <div className={styles.milestoneCard}>
                  <div className={styles.mIconWrap}>
                    <SparkleIcon size={18} color="#D86B52" />
                  </div>
                  <div>
                    <span className={styles.mLabel}>Estimated Ovulation</span>
                    <strong>{formatDate(ovulationDate)}</strong>
                  </div>
                </div>
              </div>

              <div className={styles.recPackBox}>
                <div className={styles.recLabelRow}>
                  <PackageIcon size={16} color="#0D6B5B" />
                  <span className={styles.recLabel}>
                    For a {periodDuration}-day period:
                  </span>
                </div>
                <div className={styles.recBadges}>
                  <span className={styles.badgeXl}>About {padsNeeded} pads needed</span>
                  <span className={styles.badgeL}>
                    {packsNeeded} {packsNeeded === 1 ? 'pack' : 'packs'} of 6
                  </span>
                </div>
              </div>

              <div className={styles.resultActions}>
                <a href="#custom-box" className="btn btn-primary" style={{ width: '100%' }}>
                  <span>Build box before {formatDate(nextPeriodDate)}</span>
                  <ArrowRightIcon size={16} color="#FFFFFF" />
                </a>
                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: 10 }}
                  onClick={openTracker}
                >
                  <CalendarIcon size={16} color="#0D6B5B" />
                  <span>Open Private Cycle Tracker</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
