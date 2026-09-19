'use client';

import React from 'react';
import Image from 'next/image';
import type { Banner, Product, SiteConfig, AppLinks } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import {
  SparkleIcon,
  CottonIcon,
  ShieldCheckIcon,
  LeafIcon,
  ClockIcon,
  RefreshIcon,
  StarIcon,
  ArrowRightIcon,
  FeatherIcon,
} from './Icons';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  banner?: Banner;
  products?: Product[];
  config?: SiteConfig;
  links?: AppLinks;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { openQuiz } = useCart();

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Empathetic Copy & Luxury CTAs */}
          <div className={styles.leftCol}>
            <div className={styles.pillBadge}>
              <span className={styles.greenDot} />
              <span>Tested to BIS IS 5405:2025 · Gynaecologist Approved</span>
            </div>

            <h1 className={styles.title}>
              Period care as gentle as your body <span className={styles.gradientText}>deserves.</span>
            </h1>

            <p className={styles.description}>
              Every cycle is deeply personal. Customize your private box with the exact ratio of
              Heavy, Medium, and Light pads your body asks for. Infused with a soothing medical-grade{' '}
              <strong>Anion strip</strong> to relieve cramps, neutralize odor, and give you 100% rash-free peace of mind.
            </p>

            <div className={styles.actionGroup}>
              <a href="#custom-box" className="btn btn-primary btn-lg">
                <span>Build Your Own Box</span>
                <ArrowRightIcon size={16} color="#FFFFFF" />
              </a>
              <button onClick={openQuiz} className="btn btn-secondary btn-lg">
                <SparkleIcon size={17} color="#D86B52" />
                <span>Find Your Flow Profile</span>
              </button>
            </div>

            <div className={styles.trustBar}>
              <div className={styles.trustItem}>
                <div className={styles.starRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} size={14} color="#D97706" />
                  ))}
                </div>
                <strong>4.8 / 5 Rating</strong>
                <span>10,000+ happy women</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <div className={styles.trustIconWrap}>
                  <FeatherIcon size={16} color="#0D6B5B" />
                </div>
                <strong>100% Rash-Free</strong>
                <span>Zero friction guarantee</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <div className={styles.trustIconWrap}>
                  <ClockIcon size={16} color="#D86B52" />
                </div>
                <strong>15-Min Delivery</strong>
                <span>Rapid emergency hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Sanctuary */}
          <div className={styles.rightCol}>
            <div className={styles.visualWrapper}>
              <div className={styles.glowBg} />

              <div className={styles.mainImageCard}>
                <Image
                  src="/images/home_savers_six.png"
                  alt="PIAX Anion Sanitary Pad Box Pack"
                  width={520}
                  height={420}
                  className={styles.heroImage}
                  priority
                />

                <div className={`${styles.floatingCard} ${styles.cardTopLeft}`}>
                  <div className={styles.floatingIcon}>
                    <LeafIcon size={18} color="#0D6B5B" />
                  </div>
                  <div>
                    <strong>Anion Strip Protection</strong>
                    <span>Neutralizes bacteria & relieves cramps naturally</span>
                  </div>
                </div>

                <div className={`${styles.floatingCard} ${styles.cardBottomRight}`}>
                  <div className={styles.floatingIcon}>
                    <ShieldCheckIcon size={18} color="#D86B52" />
                  </div>
                  <div>
                    <strong>8-Layer Anti-Leak</strong>
                    <span>Japanese SAP core with 4 secure wings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges Banner */}
        <div className={styles.certBanner}>
          <div className={styles.certItem}>
            <div className={styles.certIcon}>
              <CottonIcon size={20} color="#0D6B5B" />
            </div>
            <div>
              <strong>100% Organic Cotton Feel</strong>
              <span>Ultra-soft, zero crinkle & breathable</span>
            </div>
          </div>

          <div className={styles.certItem}>
            <div className={styles.certIcon}>
              <ShieldCheckIcon size={20} color="#0D6B5B" />
            </div>
            <div>
              <strong>0% Toxins & Fragrance</strong>
              <span>Zero chlorine, dioxins, or artificial perfumes</span>
            </div>
          </div>

          <div className={styles.certItem}>
            <div className={styles.certIcon}>
              <SparkleIcon size={20} color="#0D6B5B" />
            </div>
            <div>
              <strong>BIS IS 5405:2025 Certified</strong>
              <span>Government lab tested for clinical safety</span>
            </div>
          </div>

          <div className={styles.certItem}>
            <div className={styles.certIcon}>
              <RefreshIcon size={20} color="#0D6B5B" />
            </div>
            <div>
              <strong>Auto-Repeat Tranquility</strong>
              <span>Cycle-synced delivery; pause or skip anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
