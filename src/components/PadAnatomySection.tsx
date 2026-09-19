'use client';

import React, { useState } from 'react';
import {
  SparkleIcon,
  LeafIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from './Icons';
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
    title: 'Hypoallergenic Plant-Cotton Topsheet',
    category: 'Surface Comfort',
    description:
      'Ultra-fine, micro-perforated plant-fiber topsheet that draws moisture away instantly, keeping skin completely dry, cool, and free from heat rash or chafing.',
    tag: '0% Plastic Feel',
  },
  {
    number: 2,
    title: 'Medical-Grade Anion Negative Ion Strip',
    category: 'Antibacterial & Cramp Soothing',
    description:
      'Emits over 6,000 negative ions per cubic cm upon moisture contact. Suppresses 99.9% of anaerobic bacteria, neutralizes odor naturally, and eases lower abdominal cramp tension.',
    tag: 'Clinically Proven Anion',
  },
  {
    number: 3,
    title: 'Sterilized Air-Laid Cellulose (Upper Barrier)',
    category: 'Structural Barrier',
    description:
      'Zero-chlorine sterilized cellulose wrapping that encases the core 360°, ensuring zero clumping or shifting during active walking and movement.',
    tag: '100% Chlorine-Free',
  },
  {
    number: 4,
    title: 'Japanese Super Absorbent Polymer (SAP)',
    category: 'High-Capacity Absorption',
    description:
      'World-class micro-crystals that absorb 50x their weight in seconds, locking liquid securely as a dry gel so you never feel dampness or wet backflow.',
    tag: '5x Faster Dry Lock',
  },
  {
    number: 5,
    title: 'Dual Leak-Lock Fluid Routing Channels',
    category: 'Leak Prevention',
    description:
      'Deep embossed fluid-routing channels combined with 4-wing side stabilizers ensure liquid stays centered even under high pressure and overnight tossing.',
    tag: '4-Wing Anti-Leak',
  },
  {
    number: 6,
    title: 'Sterilized Air-Laid Cellulose (Lower Barrier)',
    category: 'Core Containment',
    description:
      'Lower protection shield ensuring the absorbent polymers remain locked securely even during heavy night flows.',
    tag: 'Zero Clumping',
  },
  {
    number: 7,
    title: 'Micro-Porous Breathable Backsheet',
    category: 'Airflow & Cooling',
    description:
      'Engineered with microscopic vents that let moisture vapor and body heat escape freely while stopping liquid completely. Goodbye to sweaty stuffiness.',
    tag: '100% Breathable',
  },
  {
    number: 8,
    title: 'Food-Grade Non-Toxic Adhesive Strip',
    category: 'Secure Attachment',
    description:
      'Gentle, food-grade adhesive lines that grip underwear firmly without leaving sticky chemical residue or damaging delicate fabrics.',
    tag: 'Safe Non-Toxic Grip',
  },
];

export const PadAnatomySection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(2);

  const currentLayer = LAYERS.find((l) => l.number === activeLayer) || LAYERS[1];

  return (
    <section id="why-piax" className={`section ${styles.anatomySection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Engineering Excellence</span>
          <h2 className={styles.title}>Inside the 8-Layer PIAX Anion Pad</h2>
          <p className={styles.subtitle}>
            Tested to BIS IS 5405:2025 and ISO 11737-1:2018 standards. Explore how each layer is
            crafted for pure absorbency, soothing hygiene, and rash-free comfort.
          </p>
        </div>

        <div className={styles.interactiveGrid}>
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
                      <span className={styles.starBadge}>
                        <SparkleIcon size={12} color="#0D6B5B" />
                        <span>Core Innovation</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

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

              {currentLayer.number === 2 && (
                <div className={styles.anionBox}>
                  <div className={styles.anionBadge}>
                    <LeafIcon size={16} color="#0D6B5B" />
                    <span>Why Anions Matter for Menstrual Relief</span>
                  </div>
                  <p>
                    Conventional pads trap body heat and moisture, allowing bacteria to multiply within
                    20 minutes. PIAX’s negative ions inhibit bacterial enzymes, maintain the natural vaginal
                    flora, and soothe lower abdominal tension naturally.
                  </p>
                </div>
              )}

              <div className={styles.certChecklist}>
                <div className={styles.checkItem}>
                  <CheckCircleIcon size={18} color="#0D6B5B" />
                  <span>Tested to BIS IS 5405:2025 (Govt of India Standards)</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircleIcon size={18} color="#0D6B5B" />
                  <span>ISO 11737-1:2018 Certified Sterilization</span>
                </div>
                <div className={styles.checkItem}>
                  <ShieldCheckIcon size={18} color="#0D6B5B" />
                  <span>Dermatologically Approved & Hypoallergenic</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <a href="#custom-box" className="btn btn-primary">
                  <span>Build Box with Anion Pads</span>
                  <ArrowRightIcon size={16} color="#FFFFFF" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
