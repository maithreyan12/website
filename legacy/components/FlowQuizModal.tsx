'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './FlowQuizModal.module.css';

export const FlowQuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, addCustomBoxToCart } = useCart();

  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<string>('5-6');
  const [heaviestFlow, setHeaviestFlow] = useState<string>('heavy');
  const [nightConcern, setNightConcern] = useState<string>('back-leak');
  const [rashSensitivity, setRashSensitivity] = useState<string>('often');
  const [isSubscription, setIsSubscription] = useState<boolean>(true);

  if (!isQuizOpen) return null;

  // Calculate recommended pack based on quiz responses
  const getRecommendation = () => {
    let doubleXl = 4;
    let extraLong = 6;
    let large = 4;

    if (heaviestFlow === 'heavy') {
      doubleXl += 3;
      extraLong += 1;
    } else if (heaviestFlow === 'light') {
      doubleXl = Math.max(2, doubleXl - 2);
      large += 3;
    }

    if (nightConcern === 'back-leak') {
      doubleXl += 2;
    }

    if (duration === '7+') {
      extraLong += 3;
      large += 2;
    } else if (duration === '3-4') {
      extraLong = Math.max(3, extraLong - 2);
      doubleXl = Math.max(2, doubleXl - 1);
    }

    const totalPads = doubleXl + extraLong + large;
    const basePrice = Math.round(large * 14.8 + extraLong * 16.5 + doubleXl * 19.8);
    const discountedPrice = Math.round(basePrice * 0.75);

    return {
      doubleXl,
      extraLong,
      large,
      totalPads,
      basePrice,
      discountedPrice,
    };
  };

  const rec = getRecommendation();

  const handleFinishAndAdd = () => {
    addCustomBoxToCart({
      large: rec.large,
      extraLong: rec.extraLong,
      doubleXl: rec.doubleXl,
      isSubscription: isSubscription,
    });
    closeQuiz();
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className={styles.overlay} onClick={closeQuiz}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className="badge badge-coral">Nua-Style Personalization</span>
            <h2>Find Your Perfect Period Pack</h2>
          </div>
          <button className={styles.closeBtn} onClick={closeQuiz} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Question Step 1 */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <span className={styles.stepCounter}>Question 1 of 4</span>
            <h3 className={styles.question}>How many days does your period usually last?</h3>
            <p className={styles.subtitle}>
              Understanding your cycle length helps us prescribe the right pad quantity without excess or shortage.
            </p>

            <div className={styles.optionsGrid}>
              <button
                className={`${styles.optionCard} ${duration === '3-4' ? styles.selected : ''}`}
                onClick={() => setDuration('3-4')}
              >
                <span className={styles.optionIcon}>🌸</span>
                <div className={styles.optionInfo}>
                  <strong>3 to 4 Days</strong>
                  <span>Shorter cycle, lighter total volume needed</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${duration === '5-6' ? styles.selected : ''}`}
                onClick={() => setDuration('5-6')}
              >
                <span className={styles.optionIcon}>🌿</span>
                <div className={styles.optionInfo}>
                  <strong>5 to 6 Days</strong>
                  <span>Average cycle, balanced distribution across days</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${duration === '7+' ? styles.selected : ''}`}
                onClick={() => setDuration('7+')}
              >
                <span className={styles.optionIcon}>🌊</span>
                <div className={styles.optionInfo}>
                  <strong>7+ Days</strong>
                  <span>Extended flow needing higher absorbency & longevity</span>
                </div>
              </button>
            </div>

            <div className={styles.navRow}>
              <div />
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Next Question →
              </button>
            </div>
          </div>
        )}

        {/* Question Step 2 */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <span className={styles.stepCounter}>Question 2 of 4</span>
            <h3 className={styles.question}>How would you describe your flow on peak days?</h3>
            <p className={styles.subtitle}>
              Every woman’s flow is unique. We tailor the ratio of Heavy vs Medium vs Light pads for you.
            </p>

            <div className={styles.optionsGrid}>
              <button
                className={`${styles.optionCard} ${heaviestFlow === 'heavy' ? styles.selected : ''}`}
                onClick={() => setHeaviestFlow('heavy')}
              >
                <span className={styles.optionIcon}>🔴</span>
                <div className={styles.optionInfo}>
                  <strong>Heavy Flow</strong>
                  <span>Pad change required every 2–3 hours; need max absorbency</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${heaviestFlow === 'medium' ? styles.selected : ''}`}
                onClick={() => setHeaviestFlow('medium')}
              >
                <span className={styles.optionIcon}>🟠</span>
                <div className={styles.optionInfo}>
                  <strong>Moderate Flow</strong>
                  <span>Changes every 4–5 hours; steady predictable flow</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${heaviestFlow === 'light' ? styles.selected : ''}`}
                onClick={() => setHeaviestFlow('light')}
              >
                <span className={styles.optionIcon}>🟡</span>
                <div className={styles.optionInfo}>
                  <strong>Light Flow</strong>
                  <span>Minimal discharge; feather-light breathable comfort is priority</span>
                </div>
              </button>
            </div>

            <div className={styles.navRow}>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>
                Next Question →
              </button>
            </div>
          </div>
        )}

        {/* Question Step 3 */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <span className={styles.stepCounter}>Question 3 of 4</span>
            <h3 className={styles.question}>What is your biggest concern while sleeping?</h3>
            <p className={styles.subtitle}>
              Night comfort is crucial for hormonal recovery and restorative sleep.
            </p>

            <div className={styles.optionsGrid}>
              <button
                className={`${styles.optionCard} ${nightConcern === 'back-leak' ? styles.selected : ''}`}
                onClick={() => setNightConcern('back-leak')}
              >
                <span className={styles.optionIcon}>🌙</span>
                <div className={styles.optionInfo}>
                  <strong>Back Leaks & Staining</strong>
                  <span>Need wider 330mm fan-back coverage for tossing & turning</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${nightConcern === 'side-shift' ? styles.selected : ''}`}
                onClick={() => setNightConcern('side-shift')}
              >
                <span className={styles.optionIcon}>🛡️</span>
                <div className={styles.optionInfo}>
                  <strong>Pad Shifting & Side Leaks</strong>
                  <span>Need 4-wing ergonomic lock to anchor firmly in place</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${nightConcern === 'fine' ? styles.selected : ''}`}
                onClick={() => setNightConcern('fine')}
              >
                <span className={styles.optionIcon}>✨</span>
                <div className={styles.optionInfo}>
                  <strong>No major night issues</strong>
                  <span>Standard overnight balance is sufficient</span>
                </div>
              </button>
            </div>

            <div className={styles.navRow}>
              <button className="btn btn-secondary" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(4)}>
                Next Question →
              </button>
            </div>
          </div>
        )}

        {/* Question Step 4 */}
        {step === 4 && (
          <div className={styles.stepContent}>
            <span className={styles.stepCounter}>Question 4 of 4</span>
            <h3 className={styles.question}>Do you suffer from rashes or irritation?</h3>
            <p className={styles.subtitle}>
              PIAX contains a medical-grade Negative Ion (Anion) strip to eliminate friction & bacteria.
            </p>

            <div className={styles.optionsGrid}>
              <button
                className={`${styles.optionCard} ${rashSensitivity === 'often' ? styles.selected : ''}`}
                onClick={() => setRashSensitivity('often')}
              >
                <span className={styles.optionIcon}>⚠️</span>
                <div className={styles.optionInfo}>
                  <strong>Yes, very frequently</strong>
                  <span>Plastic topsheets cause itching, heat rashes & chafing</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${rashSensitivity === 'sometimes' ? styles.selected : ''}`}
                onClick={() => setRashSensitivity('sometimes')}
              >
                <span className={styles.optionIcon}>⚡</span>
                <div className={styles.optionInfo}>
                  <strong>Occasionally on humid or workout days</strong>
                  <span>Need active breathability and odor neutralization</span>
                </div>
              </button>

              <button
                className={`${styles.optionCard} ${rashSensitivity === 'never' ? styles.selected : ''}`}
                onClick={() => setRashSensitivity('never')}
              >
                <span className={styles.optionIcon}>🌱</span>
                <div className={styles.optionInfo}>
                  <strong>Rarely or never</strong>
                  <span>Looking for premium organic comfort and peace of mind</span>
                </div>
              </button>
            </div>

            <div className={styles.navRow}>
              <button className="btn btn-secondary" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button className="btn btn-coral" onClick={() => setStep(5)}>
                See My Personalized Pack 🎉
              </button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {step === 5 && (
          <div className={styles.resultsContent}>
            <div className={styles.recBanner}>
              <span className="badge badge-teal">✨ Clinical Match: 99.4% Flow Compatibility</span>
              <h3 className={styles.recTitle}>Your Custom Period Box is Ready!</h3>
              <p className={styles.recDesc}>
                Based on your {duration}-day cycle and {heaviestFlow} flow, here is your calibrated pad combination designed to keep you 100% rash-free and leak-proof.
              </p>
            </div>

            {/* Pad Breakdown Display */}
            <div className={styles.padBreakdown}>
              <div className={styles.padPill}>
                <span className={styles.pillCount}>{rec.doubleXl}</span>
                <div className={styles.pillMeta}>
                  <strong>Double XL (330mm)</strong>
                  <span>Heavy Days & Peaceful Nights</span>
                </div>
              </div>

              <div className={styles.padPill}>
                <span className={styles.pillCount}>{rec.extraLong}</span>
                <div className={styles.pillMeta}>
                  <strong>Extra Long (290mm)</strong>
                  <span>Medium / Active Day Flow</span>
                </div>
              </div>

              <div className={styles.padPill}>
                <span className={styles.pillCount}>{rec.large}</span>
                <div className={styles.pillMeta}>
                  <strong>Large (240mm)</strong>
                  <span>Light / Start & End Days</span>
                </div>
              </div>
            </div>

            {/* Why this is tailored for you */}
            <div className={styles.doctorInsight}>
              <div className={styles.docIcon}>🩺</div>
              <div>
                <strong>Medical Insight for your Flow:</strong>
                <p>
                  Your profile benefits immensely from the <strong>Anion Negative Ion Strip</strong>, which inhibits anaerobic bacteria growth (preventing odor) and prevents sweat friction rash during high-movement hours.
                </p>
              </div>
            </div>

            {/* Subscription vs One-Time Toggle */}
            <div className={styles.planSelector}>
              <div
                className={`${styles.planOption} ${isSubscription ? styles.planActive : ''}`}
                onClick={() => setIsSubscription(true)}
              >
                <div className={styles.planHeader}>
                  <strong>Auto-Repeat Period Subscription</strong>
                  <span className={styles.saveTag}>Save 25%</span>
                </div>
                <p className={styles.planSub}>
                  Delivered automatically right before your cycle. Pause, skip, or cancel anytime.
                </p>
                <div className={styles.planPrice}>
                  <span className={styles.finalPrice}>₹{rec.discountedPrice}</span>
                  <span className={styles.origPrice}>₹{rec.basePrice}</span>
                  <span className={styles.perMonth}>/ month</span>
                </div>
              </div>

              <div
                className={`${styles.planOption} ${!isSubscription ? styles.planActive : ''}`}
                onClick={() => setIsSubscription(false)}
              >
                <div className={styles.planHeader}>
                  <strong>One-Time Purchase</strong>
                </div>
                <p className={styles.planSub}>Single custom box delivery without subscription.</p>
                <div className={styles.planPrice}>
                  <span className={styles.finalPrice}>₹{rec.basePrice}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={styles.bottomActions}>
              <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                ↺ Retake Quiz
              </button>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleFinishAndAdd}
                style={{ flex: 1 }}
              >
                Add My Custom Pack to Cart ({rec.totalPads} Pads) →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
