'use client';

import React from 'react';
import {
  StethoscopeIcon,
  StarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from './Icons';
import styles from './ReviewsSection.module.css';

interface Review {
  name: string;
  location: string;
  rating: number;
  flowType: string;
  quote: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    name: 'Priyanka M.',
    location: 'Bengaluru',
    rating: 5,
    flowType: 'Heavy Flow · 18-Pad Custom Box',
    quote:
      'I have struggled with terrible contact dermatitis and heat rashes from plastic pads for over 8 years. Within my first cycle using PIAX Anion pads, the itching completely vanished. The custom box is a lifesaver because I need 7 XXL pads and only a couple of light ones.',
    verified: true,
  },
  {
    name: 'Ananya S.',
    location: 'Chennai',
    rating: 5,
    flowType: 'Balanced Flow · Auto-Repeat Subscriber',
    quote:
      'The Auto-Repeat subscription arrives like clockwork 3 days before my period starts. No awkward chemist visits, no panic at midnight. Plus, the 15-minute emergency delivery helped my roommate last month when she got caught off guard!',
    verified: true,
  },
  {
    name: 'Meghna K.',
    location: 'Hyderabad',
    rating: 5,
    flowType: 'Active Flow · 4-Wing Secure Lock',
    quote:
      'I do crossfit and regular pads always shifted or felt soggy after an hour. The 4-wing lock and Japanese SAP in PIAX pads stay bone-dry and locked in place. The negative ion strip really does keep you feeling fresh all day.',
    verified: true,
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className={`section ${styles.reviewsSection}`}>
      <div className="container">
        <div className={styles.doctorBanner}>
          <div className={styles.docAvatarCol}>
            <div className={styles.docAvatar}>
              <StethoscopeIcon size={28} color="#0D6B5B" />
            </div>
          </div>
          <div className={styles.docContentCol}>
            <span className="badge badge-teal">Medical Advisory Endorsement</span>
            <blockquote className={styles.docQuote}>
              "Over 65% of women report vaginal itching and friction rashes caused by synthetic
              petrochemical topsheets and artificial masking fragrances. PIAX’s negative ion (anion)
              strip and micro-porous breathable backsheet create an optimal microclimate that prevents
              anaerobic bacterial overgrowth while respecting the body’s natural pH."
            </blockquote>
            <div className={styles.docAuthor}>
              <strong>Dr. Niveditha Ramanan, MBBS, DGO</strong>
              <span>Consultant Obstetrician & Gynaecologist · Women's Health Advocate</span>
            </div>
          </div>
        </div>

        <div className={styles.header}>
          <span className="badge badge-coral">Real Experiences</span>
          <h2 className={styles.title}>Loved by 10,000+ Women Across India</h2>
          <p className={styles.subtitle}>
            Read honest feedback from women who made the switch to rash-free, customized cycle care.
          </p>
        </div>

        <div className={styles.reviewsGrid}>
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className={styles.reviewCard}>
              <div className={styles.cardTop}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} size={15} color="#D97706" />
                  ))}
                </div>
                {rev.verified && (
                  <span className={styles.verifiedBadge}>
                    <CheckCircleIcon size={14} color="#0D6B5B" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>

              <p className={styles.quoteText}>"{rev.quote}"</p>

              <div className={styles.authorRow}>
                <div className={styles.avatarCircle}>{rev.name[0]}</div>
                <div>
                  <div className={styles.authorName}>
                    {rev.name} · <span className={styles.loc}>{rev.location}</span>
                  </div>
                  <span className={styles.flowBadge}>{rev.flowType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
