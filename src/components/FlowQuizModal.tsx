'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart, type PackSelection } from '@/context/CartContext';
import {
  DropletIcon,
  MoonIcon,
  SunIcon,
  ShieldCheckIcon,
  LeafIcon,
  CheckIcon,
  CrossIcon,
  SparkleIcon,
  FeatherIcon,
  HeartHandIcon,
  ArrowRightIcon,
} from './Icons';
import styles from './FlowQuizModal.module.css';

interface QuestionOption {
  label: string;
  sublabel: string;
  icon?: React.ReactNode;
}

interface Question {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    badge: 'Step 1 of 4 · Cycle Duration',
    title: 'How many days does your period usually last?',
    subtitle: 'Every body has its own rhythm. Knowing your duration helps us balance your pad counts so you never run out or overstock.',
    options: [
      {
        label: '3 to 4 Days',
        sublabel: 'A shorter, compact cycle with quick tapering.',
        icon: <DropletIcon size={22} color="#0D6B5B" />,
      },
      {
        label: '5 to 6 Days',
        sublabel: 'The classic balanced cycle with distinct heavy and light phases.',
        icon: <DropletIcon size={22} color="#D86B52" />,
      },
      {
        label: '7 or More Days',
        sublabel: 'Extended cycle requiring longer coverage and rash-free breathability.',
        icon: <DropletIcon size={22} color="#9B3D28" />,
      },
    ],
  },
  {
    id: 2,
    badge: 'Step 2 of 4 · Flow Intensity',
    title: 'How intense is your flow on your heaviest days?',
    subtitle: 'This helps us calculate the exact proportion of 330mm Double XL and 290mm Extra Long pads your body needs.',
    options: [
      {
        label: 'Light to Moderate',
        sublabel: 'Changing pads every 4-6 hours with minimal overflow worry.',
        icon: <FeatherIcon size={22} color="#0D6B5B" />,
      },
      {
        label: 'Heavy & Frequent',
        sublabel: 'Changing every 2-3 hours during day 1 and 2, needs fast Japanese SAP lock.',
        icon: <DropletIcon size={22} color="#D86B52" />,
      },
      {
        label: 'Very Heavy with Night Anxiety',
        sublabel: 'Sudden surges and tossing at night; need 330mm wide back protection.',
        icon: <MoonIcon size={22} color="#9B3D28" />,
      },
    ],
  },
  {
    id: 3,
    badge: 'Step 3 of 4 · Skin Sensitivity',
    title: 'Do you experience itching, chafing, or heat rash from pads?',
    subtitle: 'Standard plastic topsheets trap heat and breed bacteria. PIAX uses active Anions and plant-cotton to keep skin calm.',
    options: [
      {
        label: 'Yes, very sensitive skin',
        sublabel: 'Frequent redness or chafing; synthetic pads feel scratchy and unbearable.',
        icon: <HeartHandIcon size={22} color="#D86B52" />,
      },
      {
        label: 'Sometimes during summer or workouts',
        sublabel: 'Moisture and sweat cause friction and stuffiness on active days.',
        icon: <LeafIcon size={22} color="#0D6B5B" />,
      },
      {
        label: 'Rarely, but I insist on zero toxins',
        sublabel: 'Looking for 0% chlorine, 0% fragrance, and pure medical-grade hygiene.',
        icon: <ShieldCheckIcon size={22} color="#0D6B5B" />,
      },
    ],
  },
  {
    id: 4,
    badge: 'Step 4 of 4 · Comfort Sanctuary',
    title: 'What matters most to you while menstruating?',
    subtitle: 'We craft your personal pack to give you unconditional reassurance all cycle long.',
    options: [
      {
        label: 'Zero Skin Friction & Rash-Free Bliss',
        sublabel: 'Feather-soft topsheet with soothing negative ion calming strip.',
        icon: <FeatherIcon size={22} color="#0D6B5B" />,
      },
      {
        label: 'Total Overnight Leak Peace of Mind',
        sublabel: 'Deep embossed channels & Japanese SAP core so you can sleep in any position.',
        icon: <MoonIcon size={22} color="#D86B52" />,
      },
      {
        label: 'Hassle-Free Auto-Repeat Delivery',
        sublabel: 'Delivered directly to your door 3 days before your period, every single cycle.',
        icon: <SparkleIcon size={22} color="#0D6B5B" />,
      },
    ],
  },
];

export const FlowQuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, setCustomPacks, addPacksToCart } = useCart();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([1, 1, 0, 0]);

  if (!isQuizOpen) return null;

  const currentQ = QUESTIONS[step];
  const isLastQuestion = step === QUESTIONS.length - 1;
  const isResultScreen = step === QUESTIONS.length;

  const handleSelect = (optionIdx: number) => {
    const updated = [...answers];
    updated[step] = optionIdx;
    setAnswers(updated);

    if (isLastQuestion) {
      setStep(QUESTIONS.length);
    } else {
      setStep((s) => s + 1);
    }
  };

  // Compute personalized recommendations based on answers:
  // answers[0]: duration (0: 3-4d, 1: 5-6d, 2: 7+d)
  // answers[1]: flow (0: light, 1: heavy, 2: very heavy)
  const getRecommendation = (): {
    packs: PackSelection;
    title: string;
    description: string;
    anionBenefit: string;
  } => {
    const duration = answers[0];
    const flow = answers[1];

    if (flow === 2 || (duration === 2 && flow >= 1)) {
      return {
        packs: { doubleXl: 2, extraLong: 1, large: 1 },
        title: 'Deep Rest & High-Capacity Comfort Pack',
        description:
          'Because you experience heavy flow and overnight anxiety, your custom box provides maximum security with two packs of 330mm Double XL Anion pads, backed by Extra Long and Large pads for daytime comfort.',
        anionBenefit:
          'The 6,000+ negative ions per cm³ in each pad inhibit anaerobic bacteria and soothe deep lower abdominal tension naturally.',
      };
    } else if (flow === 0 && duration === 0) {
      return {
        packs: { doubleXl: 0, extraLong: 1, large: 2 },
        title: 'Gentle Flow & Feather-Light Comfort Pack',
        description:
          'A soft, breathable balance calibrated for shorter or lighter cycles. Plenty of feather-light 240mm pads with Extra Long pads for your first two days.',
        anionBenefit:
          'Hypoallergenic plant-cotton topsheets prevent sweat accumulation and ensure skin remains cool and calm all day.',
      };
    } else {
      return {
        packs: { doubleXl: 1, extraLong: 1, large: 1 },
        title: 'The Signature Balanced Cycle Sanctuary',
        description:
          'Our most celebrated combination for a 5-6 day cycle. 330mm for restful sleeping and peak hours, 290mm for active daytime movement, and 240mm for gentle tapering days.',
        anionBenefit:
          'Zero synthetic perfumes, 0% chlorine bleaching, and micro-perforated backsheets eliminate stuffiness completely.',
      };
    }
  };

  const rec = getRecommendation();

  const handleApplyToBuilder = () => {
    setCustomPacks(rec.packs);
    closeQuiz();
    const el = document.getElementById('custom-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectAddToCart = () => {
    setCustomPacks(rec.packs);
    addPacksToCart(rec.packs);
    closeQuiz();
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([1, 1, 0, 0]);
  };

  return (
    <div className={styles.backdrop} onClick={closeQuiz}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Flow and Comfort Consultation"
      >
        {/* Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.brandBadge}>
            <Image src="/images/logo_lotus.png" alt="PIAX" width={22} height={22} />
            <span>PIAX Flow & Comfort Consultation</span>
          </div>
          <button className={styles.closeBtn} onClick={closeQuiz} aria-label="Close consultation">
            <CrossIcon size={18} color="#6E8881" />
          </button>
        </div>

        {/* Progress Bar (during questions) */}
        {!isResultScreen && (
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Question Screen */}
        {!isResultScreen ? (
          <div className={styles.questionBody}>
            <div className={styles.questionMeta}>
              <span className={styles.stepBadge}>{currentQ.badge}</span>
              <h2 className={styles.questionTitle}>{currentQ.title}</h2>
              <p className={styles.questionSubtitle}>{currentQ.subtitle}</p>
            </div>

            <div className={styles.optionsList}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[step] === idx;
                return (
                  <button
                    key={idx}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => handleSelect(idx)}
                  >
                    <div className={styles.optionIconCol}>{opt.icon}</div>
                    <div className={styles.optionContentCol}>
                      <div className={styles.optionLabel}>{opt.label}</div>
                      <div className={styles.optionSublabel}>{opt.sublabel}</div>
                    </div>
                    <div className={styles.radioCircle}>
                      {isSelected && <CheckIcon size={12} color="#FFFFFF" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles.footerNav}>
              {step > 0 && (
                <button className={styles.prevBtn} onClick={() => setStep((s) => s - 1)}>
                  ← Previous question
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className={styles.resultBody}>
            <div className={styles.resultHero}>
              <span className={styles.resultPill}>
                <SparkleIcon size={14} color="#D86B52" />
                <span>Your Personalized PIAX Comfort Profile</span>
              </span>
              <h2 className={styles.resultTitle}>{rec.title}</h2>
              <p className={styles.resultDesc}>{rec.description}</p>
            </div>

            {/* Anion Comfort Callout */}
            <div className={styles.anionCard}>
              <div className={styles.anionCardHeader}>
                <LeafIcon size={18} color="#0D6B5B" />
                <strong>Why This Combination Feels Good For Your Body</strong>
              </div>
              <p className={styles.anionCardText}>{rec.anionBenefit}</p>
            </div>

            {/* Pack Breakdown */}
            <div className={styles.packBreakdown}>
              <div className={styles.breakdownTitle}>Recommended Box Configuration (18–24 Pads):</div>
              <div className={styles.packGrid}>
                {rec.packs.doubleXl > 0 && (
                  <div className={`${styles.packItem} ${styles.packHeavy}`}>
                    <div className={styles.packItemHeader}>
                      <span className={styles.packBadge}>330 mm · XXL</span>
                      <MoonIcon size={16} color="#B84E37" />
                    </div>
                    <div className={styles.packCountNumber}>
                      {rec.packs.doubleXl} {rec.packs.doubleXl === 1 ? 'pack' : 'packs'}
                    </div>
                    <div className={styles.packSubDetails}>
                      {rec.packs.doubleXl * 6} pads for heavy flow days & overnight rest
                    </div>
                  </div>
                )}

                {rec.packs.extraLong > 0 && (
                  <div className={`${styles.packItem} ${styles.packMedium}`}>
                    <div className={styles.packItemHeader}>
                      <span className={styles.packBadge}>290 mm · XL</span>
                      <SunIcon size={16} color="#0B6153" />
                    </div>
                    <div className={styles.packCountNumber}>
                      {rec.packs.extraLong} {rec.packs.extraLong === 1 ? 'pack' : 'packs'}
                    </div>
                    <div className={styles.packSubDetails}>
                      {rec.packs.extraLong * 6} pads for regular daytime movement
                    </div>
                  </div>
                )}

                {rec.packs.large > 0 && (
                  <div className={`${styles.packItem} ${styles.packLight}`}>
                    <div className={styles.packItemHeader}>
                      <span className={styles.packBadge}>240 mm · Large</span>
                      <FeatherIcon size={16} color="#926917" />
                    </div>
                    <div className={styles.packCountNumber}>
                      {rec.packs.large} {rec.packs.large === 1 ? 'pack' : 'packs'}
                    </div>
                    <div className={styles.packSubDetails}>
                      {rec.packs.large * 6} pads for light flow & tapering days
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quality Reassurance */}
            <div className={styles.reassuranceRow}>
              <div className={styles.rItem}>
                <ShieldCheckIcon size={16} color="#0D6B5B" />
                <span>100% Rash-Free Guarantee</span>
              </div>
              <div className={styles.rItem}>
                <CheckIcon size={14} color="#0D6B5B" />
                <span>BIS IS 5405:2025 Certified</span>
              </div>
              <div className={styles.rItem}>
                <LeafIcon size={16} color="#0D6B5B" />
                <span>0% Plastic Synthetic Feel</span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.resultActions}>
              <button className="btn btn-primary btn-lg" onClick={handleDirectAddToCart}>
                <span>Add Recommended Box to Bag</span>
                <ArrowRightIcon size={16} color="#FFFFFF" />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={handleApplyToBuilder}>
                Customize Pad Counts in Builder
              </button>
            </div>

            <div className={styles.restartRow}>
              <button className={styles.restartBtn} onClick={resetQuiz}>
                Retake consultation questions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
