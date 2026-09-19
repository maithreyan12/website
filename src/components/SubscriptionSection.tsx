'use client';

import React, { useState, useEffect } from 'react';
import { SubscriptionPlan, fetchSubscriptionPlans, FALLBACK_PLANS, type AppLinks } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import {
  SparkleIcon,
  CheckIcon,
  ShieldCheckIcon,
  CalendarIcon,
  RefreshIcon,
  ClockIcon,
  ArrowRightIcon,
} from './Icons';
import styles from './SubscriptionSection.module.css';

interface SubscriptionSectionProps {
  plans?: SubscriptionPlan[];
  initialPlans?: SubscriptionPlan[];
  links?: AppLinks;
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ plans: pList, initialPlans }) => {
  const initial = (pList && pList.length > 0) ? pList : ((initialPlans && initialPlans.length > 0) ? initialPlans : FALLBACK_PLANS);
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initial);
  const { openApp } = useCart();

  useEffect(() => {
    if (!pList || pList.length === 0) {
      fetchSubscriptionPlans().then((data) => {
        if (data && data.length > 0) {
          setPlans(data);
        }
      });
    }
  }, [pList]);

  return (
    <section id="subscriptions" className={`section ${styles.subSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-coral">Auto-Repeat Tranquility</span>
          <h2 className={styles.title}>Never Rush to the Chemist Again</h2>
          <p className={styles.subtitle}>
            Periods are predictable. Your pad deliveries should be too. Choose a plan managed
            seamlessly from your dashboard, with guaranteed doorstep arrival 3 to 5 days before your cycle begins.
          </p>
        </div>

        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.is_featured ? styles.featuredCard : ''}`}
            >
              {plan.is_featured && (
                <div className={styles.featuredBadge}>
                  <SparkleIcon size={13} color="#BE553C" />
                  <span>MOST POPULAR · SAVE OVER 50%</span>
                </div>
              )}

              <div className={styles.planHeader}>
                <h3 className={styles.planTitle}>{plan.title}</h3>
                <span className={styles.billingSub}>{plan.billing_period}</span>
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.planPrice}>{plan.price_formatted}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.perksList}>
                {plan.perks?.map((perk, idx) => (
                  <div key={idx} className={styles.perkItem}>
                    <span className={styles.checkIconWrap}>
                      <CheckIcon size={12} color="#0D6B5B" />
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className={styles.ctaWrapper}>
                <button
                  className={`btn ${plan.is_featured ? 'btn-coral' : 'btn-primary'} btn-lg`}
                  style={{ width: '100%' }}
                  onClick={() => openApp('plans', { plan: plan.id })}
                >
                  <span>{`Start plan · ${plan.price_formatted}`}</span>
                  <ArrowRightIcon size={16} color="#FFFFFF" />
                </button>
              </div>

              <div className={styles.guaranteeText}>
                <ShieldCheckIcon size={16} color="#0D6B5B" />
                <span>Zero commitment: Pause, skip, or cancel anytime</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.guaranteeGrid}>
          <div className={styles.gCard}>
            <div className={styles.gIconWrap}>
              <CalendarIcon size={22} color="#0D6B5B" />
            </div>
            <h4>Cycle-Synced Delivery</h4>
            <p>
              Deliveries automatically arrive 3 to 5 days before your predicted cycle, keeping you
              comfortably prepared with zero stress.
            </p>
          </div>

          <div className={styles.gCard}>
            <div className={styles.gIconWrap}>
              <RefreshIcon size={22} color="#0D6B5B" />
            </div>
            <h4>Zero Cancellation Fees</h4>
            <p>
              Going on vacation or have extra pads at home? Pause, reschedule or skip your upcoming box with a single tap in the app.
            </p>
          </div>

          <div className={styles.gCard}>
            <div className={styles.gIconWrap}>
              <ClockIcon size={22} color="#D86B52" />
            </div>
            <h4>Emergency 15-Min Priority</h4>
            <p>
              Subscribers receive priority emergency rapid dispatch credits for unexpected early cycles or emergencies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
