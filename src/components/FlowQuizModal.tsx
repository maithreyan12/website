'use client';

import React, { useState, useEffect } from 'react';
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
    subtitle: 'Knowing your duration helps us balance your pad counts so you never run out or overstock.',
    options: [
      {
        label: '3 to 4 Days',
        sublabel: 'A shorter, compact cycle with quick tapering.',
        icon: <DropletIcon size={20} color="#0D6B5B" />,
      },
      {
        label: '5 to 6 Days',
        sublabel: 'The classic balanced cycle with distinct heavy and light phases.',
        icon: <DropletIcon size={20} color="#D86B52" />,
      },
      {
        label: '7 or More Days',
        sublabel: 'Extended cycle requiring longer coverage and anti-chafing breathability.',
        icon: <DropletIcon size={20} color="#9B3D28" />,
      },
    ],
  },
  {
    id: 2,
    badge: 'Step 2 of 4 · Flow Intensity',
    title: 'How intense is your flow on your heaviest days?',
    subtitle: 'This calculates the exact proportion of 330mm Double XL and 290mm Extra Long pads you need.',
    options: [
      {
        label: 'Light to Moderate',
        sublabel: 'Changing pads every 4-6 hours with minimal overflow worry.',
        icon: <FeatherIcon size={20} color="#0D6B5B" />,
      },
      {
        label: 'Heavy & Frequent',
        sublabel: 'Changing every 2-3 hours on days 1–2, needs fast Japanese SAP lock.',
        icon: <DropletIcon size={20} color="#D86B52" />,
      },
      {
        label: 'Very Heavy with Night Anxiety',
        sublabel: 'Sudden surges and tossing at night; need 330mm wide rear protection.',
        icon: <MoonIcon size={20} color="#9B3D28" />,
      },
    ],
  },
  {
    id: 3,
    badge: 'Step 3 of 4 · Skin Sensitivity',
    title: 'Do you experience itching, chafing, or heat rash from pads?',
    subtitle: 'Standard plastic topsheets trap heat. PIAX uses active Anions and plant-cotton to keep skin calm.',
    options: [
      {
        label: 'Yes, very sensitive skin',
        sublabel: 'Frequent redness or chafing; synthetic pads feel scratchy and unbearable.',
        icon: <HeartHandIcon size={20} color="#D86B52" />,
      },
      {
        label: 'Sometimes during summer or active days',
        sublabel: 'Moisture and sweat cause friction and stuffiness on busy days.',
        icon: <LeafIcon size={20} color="#0D6B5B" />,
      },
      {
        label: 'Rarely, but I insist on zero toxins',
        sublabel: 'Looking for 0% chlorine, 0% fragrance, and pure clinical-grade hygiene.',
        icon: <ShieldCheckIcon size={20} color="#0D6B5B" />,
      },
    ],
  },
  {
    id: 4,
    badge: 'Step 4 of 4 · Comfort Sanctuary',
    title: 'What matters most to you while menstruating?',
    subtitle: 'We tailor your personal pack to give you unconditional reassurance all cycle long.',
    options: [
      {
        label: 'Zero Skin Friction & Rash-Free Bliss',
        sublabel: 'Feather-soft topsheet with soothing negative ion calming strip.',
        icon: <FeatherIcon size={20} color="#0D6B5B" />,
      },
      {
        label: 'Total Overnight Leak Peace of Mind',
        sublabel: 'Deep embossed channels & Japanese SAP core so you can sleep in any position.',
        icon: <MoonIcon size={20} color="#D86B52" />,
      },
      {
        label: 'Hassle-Free Auto-Repeat Delivery',
        sublabel: 'Delivered directly to your door 3 days before your period, every single cycle.',
        icon: <SparkleIcon size={20} color="#0D6B5B" />,
      },
    ],
  },
];

export const FlowQuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, setCustomPacks, addPacksToCart } = useCart();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([1, 1, 0, 0]);

  // Lock background body scroll completely when modal is open
  useEffect(() => {
    if (!isQuizOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isQuizOpen]);

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

  const getRecommendation = (): {
    packs: PackSelection;
    title: string;
    description: string;
    anionBenefit: string;
    totalPads: number;
  } => {
    const duration = answers[0];
    const flow = answers[1];

    if (flow === 2 || (duration === 2 && flow >= 1)) {
      return {
        packs: { doubleXl: 2, extraLong: 1, large: 0 },
        title: 'Deep Rest & High-Capacity Pack',
        description: 'Extra overnight coverage with two packs of 330mm Double XL pads and Extra Long pads for active daytime protection.',
        anionBenefit: '6,000+ negative ions/cm³ relax pelvic muscle tension and inhibit odor naturally.',
        totalPads: 18,
      };
    } else if (flow === 0 && duration === 0) {
      return {
        packs: { doubleXl: 0, extraLong: 1, large: 2 },
        title: 'Gentle Flow & Feather-Light Pack',
        description: 'A breathable balance for lighter cycles. Feather-light 240mm pads with Extra Long pads for peak hours.',
        anionBenefit: 'Hypoallergenic plant-cotton topsheets prevent sweat accumulation and chafing.',
        totalPads: 18,
      };
    } else {
      return {
        packs: { doubleXl: 1, extraLong: 1, large: 1 },
        title: 'Signature Balanced Cycle Sanctuary',
        description: 'Our most loved blend: 330mm for sleep, 290mm for active days, and 240mm for gentle tapering days.',
        anionBenefit: 'Micro-perforated breathable backsheet releases heat so skin stays dry and cool.',
        totalPads: 18,
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
        {/* Compact Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.brandBadge}>
            <Image src="/images/logo_lotus.png" alt="PIAX" width={20} height={20} />
            <span>PIAX Flow Consultation</span>
          </div>
          <button className={styles.closeBtn} onClick={closeQuiz} aria-label="Close consultation">
            <CrossIcon size={16} color="#6E8881" />
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
                      {isSelected && <CheckIcon size={11} color="#FFFFFF" />}
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
          /* Result Screen - Compact & Showing the Real Product Visual */
          <div className={styles.resultBody}>
            <div className={styles.resultHero}>
              <span className={styles.resultPill}>
                <SparkleIcon size={13} color="#D86B52" />
                <span>Your Personalized PIAX Comfort Profile</span>
              </span>
              <h2 className={styles.resultTitle}>{rec.title}</h2>
              <p className={styles.resultDesc}>{rec.description}</p>
            </div>

            {/* Product Visual Showcase Banner */}
            <div className={styles.productShowcaseBanner}>
              <div className={styles.productVisualLeft}>
                <Image
                  src="/images/home_product_pad.png"
                  alt="PIAX Custom Period Box"
                  width={140}
                  height={110}
                  className={styles.productThumbnail}
                  priority
                />
              </div>
              <div className={styles.productVisualRight}>
                <div className={styles.packSummaryTitle}>
                  <strong>Your Custom Box: {rec.totalPads} Pads</strong>
                  <span>6 pads per pack · Individually sealed</span>
                </div>
                <div className={styles.pillBadgesRow}>
                  {rec.packs.doubleXl > 0 && (
                    <span className={styles.microPillHeavy}>
                      {rec.packs.doubleXl}x 330mm XXL
                    </span>
                  )}
                  {rec.packs.extraLong > 0 && (
                    <span className={styles.microPillMedium}>
                      {rec.packs.extraLong}x 290mm XL
                    </span>
                  )}
                  {rec.packs.large > 0 && (
                    <span className={styles.microPillLight}>
                      {rec.packs.large}x 240mm L
                    </span>
                  )}
                </div>
                <p className={styles.anionSnippetText}>
                  <LeafIcon size={14} color="#0D6B5B" />
                  <span>{rec.anionBenefit}</span>
                </p>
              </div>
            </div>

            {/* Quality Reassurance - Slim Row */}
            <div className={styles.reassuranceRow}>
              <div className={styles.rItem}>
                <ShieldCheckIcon size={14} color="#0D6B5B" />
                <span>100% Rash-Free</span>
              </div>
              <div className={styles.rItem}>
                <CheckIcon size={13} color="#0D6B5B" />
                <span>BIS IS 5405:2025</span>
              </div>
              <div className={styles.rItem}>
                <LeafIcon size={14} color="#0D6B5B" />
                <span>0% Plastic Feel</span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.resultActions}>
              <button className="btn btn-primary" onClick={handleDirectAddToCart}>
                <span>Add Recommended Box to Bag</span>
                <ArrowRightIcon size={15} color="#FFFFFF" />
              </button>
              <button className="btn btn-secondary" onClick={handleApplyToBuilder}>
                Customize Pad Counts in Builder
              </button>
            </div>

            <div className={styles.restartRow}>
              <button className={styles.restartBtn} onClick={resetQuiz}>
                Retake questions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
