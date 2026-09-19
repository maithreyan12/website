'use client';

import React from 'react';
import {
  FeatherIcon,
  LeafIcon,
  MoonIcon,
  ClockIcon,
  HeartHandIcon,
  ShieldCheckIcon,
  SparkleIcon,
  ArrowRightIcon,
} from './Icons';
import { useCart } from '@/context/CartContext';
import styles from './ComfortSanctuarySection.module.css';

interface ComfortPillar {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  ritualTip: string;
}

const PILLARS: ComfortPillar[] = [
  {
    icon: <FeatherIcon size={24} color="#D86B52" />,
    badge: 'Gentle on Sensitive Skin',
    title: 'Zero Plastic Crinkle, Pure Cloud Softness',
    description:
      'Conventional pads use synthetic plastic meshes that trap moisture and sweat against your skin, causing painful friction, heat rashes, and itching. PIAX uses a breathable, micro-perforated plant-cotton topsheet that feels like soft cashmere.',
    ritualTip: 'No chafing between your thighs, no crinkly noises when you move. Just dry, airy comfort.',
  },
  {
    icon: <LeafIcon size={24} color="#0D6B5B" />,
    badge: 'Cramp & Inflammation Relief',
    title: 'Medical-Grade Anion Strip Technology',
    description:
      'Each pad is centered with an active negative ion (Anion) strip emitting 6,000+ ions/cm³ upon moisture contact. Negative ions inhibit 99.9% of anaerobic bacteria, eliminate hormonal odors naturally without perfume, and soothe lower abdominal cramp tension.',
    ritualTip: 'A natural bio-energetic layer that helps your pelvic area stay cool, balanced, and refreshed.',
  },
  {
    icon: <MoonIcon size={24} color="#9B3D28" />,
    badge: 'Sleep Freedom & Zero Stains',
    title: 'Rest in Any Sleeping Position',
    description:
      'Tired of waking up at 3 AM to check for bedsheet leaks? Our 330 mm Double XL pads feature an extra-wide flared fan back and 4 secure wings that stay locked in place no matter how much you curl up or toss.',
    ritualTip: 'Coupled with Japanese SAP crystals that lock liquid 5x faster as a dry gel.',
  },
  {
    icon: <ClockIcon size={24} color="#D86B52" />,
    badge: 'Zero Panic or Stress',
    title: '15-Minute Rapid Doorstep Relief',
    description:
      'Periods can be unpredictable. When your cycle arrives unexpected at home, work, or university, tap Emergency Dispatch in the PIAX app. Our nearest partner hub delivers fresh pads to your gate in 15 minutes.',
    ritualTip: 'Plus, our Auto-Repeat plan delivers your customized box 3 days before every predicted cycle.',
  },
];

export const ComfortSanctuarySection: React.FC = () => {
  const { openQuiz } = useCart();

  return (
    <section className={`section ${styles.sanctuarySection}`}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.pillBadge}>
            <HeartHandIcon size={16} color="#D86B52" />
            <span>Designed For Your Most Sensitive Days</span>
          </div>
          <h2 className={styles.title}>
            Period Care That Truly Makes You <span className={styles.italicWord}>Feel Good.</span>
          </h2>
          <p className={styles.subtitle}>
            When you are bleeding, your body is working hard. You deserve period care that treats you
            with warmth, softness, and total emotional peace of mind — free from plastic rash, chemical scents, or midnight worries.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {PILLARS.map((pillar, idx) => (
            <div key={idx} className={styles.pillarCard}>
              <div className={styles.cardTopRow}>
                <div className={styles.iconCircle}>{pillar.icon}</div>
                <span className={styles.pillarBadge}>{pillar.badge}</span>
              </div>

              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDesc}>{pillar.description}</p>

              <div className={styles.ritualBox}>
                <div className={styles.ritualHeader}>
                  <SparkleIcon size={14} color="#0D6B5B" />
                  <span>The PIAX Touch</span>
                </div>
                <p className={styles.ritualText}>{pillar.ritualTip}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.comfortQuoteBanner}>
          <div className={styles.quoteContent}>
            <div className={styles.guaranteePill}>
              <ShieldCheckIcon size={16} color="#0D6B5B" />
              <span>100% Rash-Free Comfort Guarantee</span>
            </div>
            <h3 className={styles.quoteHeading}>
              "Your period shouldn't feel like an endurance test."
            </h3>
            <p className={styles.quoteSub}>
              If PIAX pads cause any itching, chafing, or discomfort during your cycle, we will
              refund your order in full — no questions asked.
            </p>
          </div>
          <div className={styles.quoteAction}>
            <button onClick={openQuiz} className="btn btn-primary btn-lg">
              <span>Find My Comfort Combination</span>
              <ArrowRightIcon size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
