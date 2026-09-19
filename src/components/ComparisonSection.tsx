'use client';

import React from 'react';
import {
  SparkleIcon,
  CheckIcon,
  CrossIcon,
  ArrowRightIcon,
} from './Icons';
import styles from './ComparisonSection.module.css';

interface FeatureComparison {
  feature: string;
  piax: string;
  ordinary: string;
  isHighlight?: boolean;
}

const COMPARISONS: FeatureComparison[] = [
  {
    feature: 'Skin Friction & Rash Risk',
    piax: '100% Rash-Free hypoallergenic plant-cotton feel with zero plastic friction',
    ordinary: 'Synthetic plastic mesh that traps sweat, causing heat rash & itching',
    isHighlight: true,
  },
  {
    feature: 'Bacterial & Odor Defense',
    piax: 'Active Anion Negative Ion Strip neutralizes 99.9% bacteria & odor naturally',
    ordinary: 'Masked with artificial synthetic perfumes that trigger pH imbalance',
  },
  {
    feature: 'Core Absorption Capacity',
    piax: 'Japanese SAP polymer locks 5x more liquid dry in under 15 seconds',
    ordinary: 'Basic wood pulp fluff that clumps, collapses, and leaks under pressure',
    isHighlight: true,
  },
  {
    feature: 'Chlorine Bleach & Dioxins',
    piax: '0% Chlorine, 0% Dioxins, 0% Perfume, 0% Phthalates',
    ordinary: 'Industrial chlorine-bleached cotton blends with trace toxins',
  },
  {
    feature: 'Airflow & Breathability',
    piax: 'Micro-perforated breathable backsheet releases body heat and moisture',
    ordinary: 'Solid plastic sheet that acts like a greenhouse, trapping heat',
  },
  {
    feature: 'Emergency 15-Min Delivery',
    piax: 'Dispatched to your doorstep in 15 minutes via PIAX Partner network',
    ordinary: '2 to 3 days standard ecommerce transit wait',
    isHighlight: true,
  },
];

export const ComparisonSection: React.FC = () => {
  return (
    <section className={`section ${styles.comparisonSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-coral">The Honest Difference</span>
          <h2 className={styles.title}>PIAX Anion Care vs Ordinary Plastic Pads</h2>
          <p className={styles.subtitle}>
            You wear a sanitary pad for over 50,000 hours in your lifetime. Here is why switching to
            medical-grade anion organic care is the gentlest gift to your body.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th className={styles.featureCol}>Feature</th>
                <th className={styles.piaxCol}>
                  <div className={styles.thPiaxBadge}>
                    <SparkleIcon size={16} color="#0D6B5B" />
                    <span>PIAX Anion Care</span>
                  </div>
                </th>
                <th className={styles.ordinaryCol}>Ordinary Conventional Pads</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map((row, idx) => (
                <tr key={idx} className={row.isHighlight ? styles.highlightRow : ''}>
                  <td className={styles.featureCell}>
                    <strong>{row.feature}</strong>
                  </td>
                  <td className={styles.piaxCell}>
                    <div className={styles.piaxContent}>
                      <span className={styles.checkIconWrap}>
                        <CheckIcon size={14} color="#0D6B5B" />
                      </span>
                      <span>{row.piax}</span>
                    </div>
                  </td>
                  <td className={styles.ordinaryCell}>
                    <div className={styles.ordinaryContent}>
                      <span className={styles.crossIconWrap}>
                        <CrossIcon size={14} color="#BE553C" />
                      </span>
                      <span>{row.ordinary}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.bottomCta}>
          <a href="#custom-box" className="btn btn-primary btn-lg">
            <span>Experience the PIAX Difference</span>
            <ArrowRightIcon size={16} color="#FFFFFF" />
          </a>
        </div>
      </div>
    </section>
  );
};
