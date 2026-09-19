'use client';

import React, { useState } from 'react';
import styles from './PadAnatomySection.module.css';

interface LayerInfo {
  number: number;
  title: string;
  category: string;
  description: string;
  tag: string;
}

const LAYERS: LayerInfo[] = [
  {
    number: 1,
    title: 'Hypoallergenic Cotton-Feel Topsheet',
    category: 'Surface Comfort',
    description:
      'Ultra-fine, perforated plant-fiber topsheet that draws moisture away instantly, keeping your skin bone-dry and preventing heat rash and chafing.',
    tag: '0% Plastic Feel',
  },
  {
    number: 2,
    title: 'Medical-Grade Anion Negative Ion Strip',
    category: 'Antibacterial Core',
    description:
      'Emits over 6,000 negative ions per cubic cm upon moisture contact. Suppresses 99.9% of anaerobic bacteria, neutralizes odor, and soothes inflammatory cramps.',
    tag: 'Clinically Proven Anion',
  },
  {
    number: 3,
    title: 'Sterilized Air-Laid Wrapping (Upper)',
    category: 'Structural Barrier',
    description:
      'Zero-chlorine sterilized cellulose wrapping that encases the core 360°, ensuring no clumping or shifting during active gym workouts or long walks.',
    tag: '100% Chlorine-Free',
  },
  {
    number: 4,
    title: 'Japanese Super Absorbent Polymer (SAP)',
    category: 'High-Capacity Absorption',
    description:
      'World-class micro-crystals that absorb 50x their weight in seconds, locking liquid securely as dry gel so you never experience a wet sensation.',
    tag: '5x Faster Lock',
  },
  {
    number: 5,
    title: 'Dual Leak-Lock Side Flow Channels',
    category: 'Leak Prevention',
    description:
      'Deep embossed fluid-routing channels combined with 4-wing side stabilizers ensure liquid stays centered even under high pressure.',
    tag: '4-Wing Anti-Leak',
  },
  {
    number: 6,
    title: 'Sterilized Air-Laid Wrapping (Lower)',
    category: 'Core Containment',
    description:
      'Lower protection shield ensuring the absorbent polymers remain locked securely even during tossing and turning at night.',
    tag: 'Zero Clumping',
  },
  {
    number: 7,
    title: 'Breathable Micro-Perforated Backsheet',
    category: 'Airflow & Cooling',
    description:
      'Engineered with microscopic vents that let moisture vapor and body heat escape while stopping liquid completely. Say goodbye to stuffiness.',
    tag: '100% Breathable',
  },
  {
    number: 8,
    title: 'Food-Grade Non-Toxic Adhesive Strip',
    category: 'Secure Attachment',
    description:
      'Gentle, food-grade adhesive lines that grip underwear firmly without leaving sticky chemical residue or damaging delicate fabrics.',
    tag: 'Safe Non-Toxic Glue',
  },
];

export const PadAnatomySection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(2); // Default to Anion strip

  const currentLayer = LAYERS.find((l) => l.number === activeLayer) || LAYERS[1];

  return (
    <section id="why-piax" className={`section ${styles.anatomySection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Engineering Excellence</span>
          <h2 className={styles.title}>Inside the 8-Layer PIAX Anion Pad</h2>
          <p className={styles.subtitle}>
            Tested to BIS IS 5405:2025 and ISO 11737-1:2018 standards. Explore how each layer is
            crafted for maximum absorbency, hygiene, and rash-free comfort.
          </p>
        </div>

        <div className={styles.interactiveGrid}>
          {/* Left Column: Interactive Layer Stack */}
          <div className={styles.stackCol}>
            <div className={styles.stackContainer}>
              {LAYERS.map((layer) => {
                const isActive = layer.number === activeLayer;
                return (
                  <button
                    key={layer.number}
                    className={`${styles.layerBar} ${isActive ? styles.layerActive : ''}`}
                    onClick={() => setActiveLayer(layer.number)}
                  >
                    <div className={styles.layerNumberBadge}>
                      Layer {layer.number}
                    </div>
                    <div className={styles.layerBarTitle}>
                      {layer.title}
                    </div>
                    {layer.number === 2 && (
                      <span className={styles.starBadge}>⭐ Star Technology</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Layer Deep-Dive Detail Card */}
          <div className={styles.detailCol}>
            <div className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <span className="badge badge-coral">{currentLayer.category}</span>
                <span className={styles.layerTagBadge}>{currentLayer.tag}</span>
              </div>

              <div className={styles.layerHeroRow}>
                <div className={styles.layerBigNum}>{currentLayer.number}</div>
                <h3 className={styles.detailTitle}>{currentLayer.title}</h3>
              </div>

              <p className={styles.detailDesc}>{currentLayer.description}</p>

              {/* Special Anion Feature Highlight */}
              {currentLayer.number === 2 && (
                <div className={styles.anionBox}>
                  <div className={styles.anionBadge}>✨ Why Anions Matter for Period Health</div>
                  <p>
                    Conventional pads trap heat and moisture, breeding odor-causing bacteria within
                    20 minutes. PIAX’s negative ions inhibit bacterial enzymes, maintain natural vaginal
                    flora, and promote circulation to ease lower abdominal cramps.
                  </p>
                </div>
              )}

              {/* Certifications row */}
              <div className={styles.certChecklist}>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Tested to BIS IS 5405:2025 (Govt of India Standards)</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>ISO 11737-1:2018 Certified Sterilization</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Dermatologically Approved & Hypoallergenic</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <a href="#custom-box" className="btn btn-primary">
                  Build Box with Anion Pads →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
