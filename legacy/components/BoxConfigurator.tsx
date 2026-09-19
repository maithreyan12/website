'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './BoxConfigurator.module.css';

export const BoxConfigurator: React.FC = () => {
  const { addCustomBoxToCart, openQuiz } = useCart();

  // State for pad counts
  const [doubleXl, setDoubleXl] = useState(5);
  const [extraLong, setExtraLong] = useState(5);
  const [large, setLarge] = useState(2);
  const [isSubscription, setIsSubscription] = useState(true);

  const totalPads = doubleXl + extraLong + large;

  // Unit pricing: Large = ₹14.8, XL = ₹16.5, XXL = ₹19.8
  const basePrice = Math.round(large * 14.8 + extraLong * 16.5 + doubleXl * 19.8);
  const finalPrice = isSubscription ? Math.round(basePrice * 0.75) : basePrice;
  const savings = isSubscription ? basePrice - finalPrice : 0;

  // Presets
  const applyPreset = (preset: 'balanced' | 'heavy' | 'light') => {
    if (preset === 'balanced') {
      setDoubleXl(4);
      setExtraLong(5);
      setLarge(3);
    } else if (preset === 'heavy') {
      setDoubleXl(7);
      setExtraLong(5);
      setLarge(2);
    } else if (preset === 'light') {
      setDoubleXl(3);
      setExtraLong(4);
      setLarge(5);
    }
  };

  const handleAddToCart = () => {
    if (totalPads < 6) return;
    addCustomBoxToCart({
      large,
      extraLong,
      doubleXl,
      isSubscription,
    });
  };

  return (
    <section id="custom-box" className={`section ${styles.configSection}`}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className="badge badge-coral">Signature Nua-Style Experience</span>
          <h2 className={styles.sectionTitle}>Build Your Own Custom Period Box</h2>
          <p className={styles.sectionSubtitle}>
            Your flow changes from Day 1 to Day 5. Mix and match pad sizes so you never run out of
            heavy pads or waste light pads.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className={styles.presetsBar}>
          <span className={styles.presetLabel}>Quick Presets:</span>
          <button
            className={`${styles.presetBtn} ${
              doubleXl === 4 && extraLong === 5 && large === 3 ? styles.presetActive : ''
            }`}
            onClick={() => applyPreset('balanced')}
          >
            🌸 Medium / Balanced Flow (12 Pads)
          </button>
          <button
            className={`${styles.presetBtn} ${
              doubleXl === 7 && extraLong === 5 && large === 2 ? styles.presetActive : ''
            }`}
            onClick={() => applyPreset('heavy')}
          >
            🔴 Heavy & Night Heavy (14 Pads)
          </button>
          <button
            className={`${styles.presetBtn} ${
              doubleXl === 3 && extraLong === 4 && large === 5 ? styles.presetActive : ''
            }`}
            onClick={() => applyPreset('light')}
          >
            🟡 Light & Sensitive (12 Pads)
          </button>
          <button className={styles.quizTriggerBtn} onClick={openQuiz}>
            <span>✨ Unsure? Take Quiz</span>
          </button>
        </div>

        {/* Main Interactive Grid */}
        <div className={styles.builderGrid}>
          {/* Left Column: Sliders / Counters */}
          <div className={styles.padSelectorCol}>
            {/* Size 1: Double Extra Long */}
            <div className={styles.sizeCard}>
              <div className={styles.sizeHeader}>
                <div className={styles.sizeBadgePill} style={{ background: '#fde8e3', color: '#e87055' }}>
                  330 mm · XXL
                </div>
                <div className={styles.sizeDetails}>
                  <div className={styles.sizeNameRow}>
                    <h3 className={styles.sizeName}>Double Extra Long</h3>
                    <span className={styles.sizeFlowTag}>Heavy Days & Nights</span>
                  </div>
                  <p className={styles.sizeDesc}>
                    Extended fan-shape rear wings for complete anti-leak coverage during heavy flow and sound sleep.
                  </p>
                </div>
              </div>

              <div className={styles.counterRow}>
                <div className={styles.counterWrapper}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setDoubleXl(Math.max(0, doubleXl - 1))}
                    disabled={doubleXl <= 0}
                    aria-label="Decrease XXL pads"
                  >
                    −
                  </button>
                  <span className={styles.counterNumber}>{doubleXl}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setDoubleXl(doubleXl + 1)}
                    aria-label="Increase XXL pads"
                  >
                    +
                  </button>
                </div>
                <span className={styles.unitSub}>
                  {doubleXl} {doubleXl === 1 ? 'pad' : 'pads'} selected
                </span>
              </div>
            </div>

            {/* Size 2: Extra Long */}
            <div className={styles.sizeCard}>
              <div className={styles.sizeHeader}>
                <div className={styles.sizeBadgePill} style={{ background: '#e6f6f4', color: '#007f6d' }}>
                  290 mm · XL
                </div>
                <div className={styles.sizeDetails}>
                  <div className={styles.sizeNameRow}>
                    <h3 className={styles.sizeName}>Extra Long</h3>
                    <span className={styles.sizeFlowTag}>Regular to Moderate Flow</span>
                  </div>
                  <p className={styles.sizeDesc}>
                    Ideal for active daytime wear. 4-wing flexible security with instant-dry SAP absorption core.
                  </p>
                </div>
              </div>

              <div className={styles.counterRow}>
                <div className={styles.counterWrapper}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setExtraLong(Math.max(0, extraLong - 1))}
                    disabled={extraLong <= 0}
                    aria-label="Decrease XL pads"
                  >
                    −
                  </button>
                  <span className={styles.counterNumber}>{extraLong}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setExtraLong(extraLong + 1)}
                    aria-label="Increase XL pads"
                  >
                    +
                  </button>
                </div>
                <span className={styles.unitSub}>
                  {extraLong} {extraLong === 1 ? 'pad' : 'pads'} selected
                </span>
              </div>
            </div>

            {/* Size 3: Large */}
            <div className={styles.sizeCard}>
              <div className={styles.sizeHeader}>
                <div className={styles.sizeBadgePill} style={{ background: '#fef3c7', color: '#b45309' }}>
                  240 mm · L
                </div>
                <div className={styles.sizeDetails}>
                  <div className={styles.sizeNameRow}>
                    <h3 className={styles.sizeName}>Large</h3>
                    <span className={styles.sizeFlowTag}>Light / Start & End of Cycle</span>
                  </div>
                  <p className={styles.sizeDesc}>
                    Ultra-thin, feather-light organic cotton touch with anion strip. No bulkiness, maximum freshness.
                  </p>
                </div>
              </div>

              <div className={styles.counterRow}>
                <div className={styles.counterWrapper}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setLarge(Math.max(0, large - 1))}
                    disabled={large <= 0}
                    aria-label="Decrease Large pads"
                  >
                    −
                  </button>
                  <span className={styles.counterNumber}>{large}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setLarge(large + 1)}
                    aria-label="Increase Large pads"
                  >
                    +
                  </button>
                </div>
                <span className={styles.unitSub}>
                  {large} {large === 1 ? 'pad' : 'pads'} selected
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Box Summary & Checkout */}
          <div className={styles.boxSummaryCol}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div>
                  <h3 className={styles.summaryTitle}>Your Custom Period Kit</h3>
                  <span className={styles.boxStatus}>
                    {totalPads >= 6
                      ? `✨ Box Ready (${totalPads} Pads Total)`
                      : `Select at least ${6 - totalPads} more pads`}
                  </span>
                </div>
                <div className={styles.packCircle}>
                  <span className={styles.packCount}>{totalPads}</span>
                  <span className={styles.packPadsText}>PADS</span>
                </div>
              </div>

              {/* Visual Box Distribution Bar */}
              <div className={styles.distBarWrapper}>
                <div className={styles.distBar}>
                  {doubleXl > 0 && (
                    <div
                      className={styles.barSegment}
                      style={{
                        width: `${(doubleXl / (totalPads || 1)) * 100}%`,
                        backgroundColor: '#e87055',
                      }}
                      title={`${doubleXl} Heavy pads`}
                    />
                  )}
                  {extraLong > 0 && (
                    <div
                      className={styles.barSegment}
                      style={{
                        width: `${(extraLong / (totalPads || 1)) * 100}%`,
                        backgroundColor: '#007f6d',
                      }}
                      title={`${extraLong} Medium pads`}
                    />
                  )}
                  {large > 0 && (
                    <div
                      className={styles.barSegment}
                      style={{
                        width: `${(large / (totalPads || 1)) * 100}%`,
                        backgroundColor: '#f59e0b',
                      }}
                      title={`${large} Light pads`}
                    />
                  )}
                </div>

                <div className={styles.distLegend}>
                  <span className={styles.legendItem}>
                    <span className={styles.dot} style={{ background: '#e87055' }} />
                    Heavy: {doubleXl}
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.dot} style={{ background: '#007f6d' }} />
                    Medium: {extraLong}
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.dot} style={{ background: '#f59e0b' }} />
                    Light: {large}
                  </span>
                </div>
              </div>

              {/* Plan Choice: Auto-Repeat vs One-Time */}
              <div className={styles.toggleContainer}>
                <button
                  className={`${styles.toggleBtn} ${isSubscription ? styles.toggleActive : ''}`}
                  onClick={() => setIsSubscription(true)}
                >
                  <div className={styles.toggleTop}>
                    <strong>Auto-Repeat</strong>
                    <span className={styles.saveBadge}>Save 25%</span>
                  </div>
                  <span className={styles.toggleDesc}>Delivered right before your period starts</span>
                </button>

                <button
                  className={`${styles.toggleBtn} ${!isSubscription ? styles.toggleActive : ''}`}
                  onClick={() => setIsSubscription(false)}
                >
                  <div className={styles.toggleTop}>
                    <strong>One-Time Box</strong>
                  </div>
                  <span className={styles.toggleDesc}>Standard single shipment</span>
                </button>
              </div>

              {/* Pricing Box */}
              <div className={styles.priceContainer}>
                <div className={styles.priceRow}>
                  <span>Pack Subtotal ({totalPads} Pads)</span>
                  <span className={styles.subtotalPrice}>₹{basePrice}</span>
                </div>

                {isSubscription && (
                  <div className={styles.priceRowSavings}>
                    <span>Auto-Repeat 25% Discount</span>
                    <span className={styles.savingsAmount}>− ₹{savings}</span>
                  </div>
                )}

                <div className={styles.finalRow}>
                  <div>
                    <span className={styles.totalLabel}>Total Price</span>
                    <span className={styles.taxSub}>Includes all taxes & discreet packaging</span>
                  </div>
                  <div className={styles.totalValueGroup}>
                    <span className={styles.mainPrice}>₹{finalPrice}</span>
                    {isSubscription && <span className={styles.strikedPrice}>₹{basePrice}</span>}
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                className={`btn btn-primary btn-lg ${styles.addToCartBtn}`}
                onClick={handleAddToCart}
                disabled={totalPads < 6}
              >
                {isSubscription ? 'Subscribe & Add Custom Box →' : 'Add Custom Box to Cart →'}
              </button>

              {/* Micro Perks */}
              <div className={styles.summaryPerks}>
                <div className={styles.perk}>
                  <span>🔒</span> 100% Rash-Free Moneyback Guarantee
                </div>
                <div className={styles.perk}>
                  <span>📦</span> Zero-Commitment: Pause, Edit, or Cancel anytime
                </div>
                <div className={styles.perk}>
                  <span>🚚</span> Free Doorstep Delivery on orders above ₹299
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
