'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatRupees, productOfSize, type Product } from '@/lib/api';
import styles from './FlowQuizModal.module.css';

/**
 * "Which size is right for me?" — the same three questions and the same
 * scoring as the app's size finder (lib/features/shop/size_finder_sheet.dart),
 * so a woman gets the same answer on the website and in the app.
 */

// Sizes in the app's LUMA / VERA / NOCTE / SEREN order.
const RANGE = [
  { mm: 240, name: 'Large', useCase: 'Lighter days, and the start and end of your period.', icon: '🌼' },
  { mm: 290, name: 'Extra Long', useCase: 'Your everyday size — the one most people settle on.', icon: '🌿' },
  { mm: 330, name: 'Double Extra Long', useCase: 'Heavier days, and nights you would rather not think about it.', icon: '🌙' },
  { mm: 360, name: 'Overnight', useCase: 'Maximum coverage for a full night of sleep.', icon: '✨' },
];

const QUESTIONS: {
  prompt: string;
  helper: string;
  options: { label: string; detail: string; weights: [number, number, number, number] }[];
}[] = [
  {
    prompt: 'On your heaviest day, how often do you change your pad?',
    helper: 'Your best guess is fine.',
    options: [
      { label: 'Every 6 hours or more', detail: 'Lighter flow', weights: [3, 1, 0, 0] },
      { label: 'Every 4 to 6 hours', detail: 'Fairly typical', weights: [1, 3, 1, 0] },
      { label: 'Every 2 to 4 hours', detail: 'On the heavier side', weights: [0, 1, 3, 2] },
      { label: 'More often than that', detail: 'Heavy flow', weights: [0, 0, 2, 3] },
    ],
  },
  {
    prompt: 'What are you shopping for right now?',
    helper: 'Most people end up keeping two sizes at home.',
    options: [
      { label: 'Daytime, out and about', detail: 'Work, college, errands', weights: [2, 3, 1, 0] },
      { label: 'Overnight', detail: 'Eight hours or so of sleep', weights: [0, 0, 2, 3] },
      { label: 'The lighter start and end days', detail: 'Days one and five', weights: [3, 1, 0, 0] },
      { label: 'One size for everything', detail: 'Keep it simple', weights: [0, 3, 2, 0] },
    ],
  },
  {
    prompt: 'Have you had leaks with your current pads?',
    helper: 'This only affects the length we suggest.',
    options: [
      { label: 'No, they work fine', detail: '', weights: [1, 2, 1, 0] },
      { label: 'Sometimes, at night', detail: 'Back leaks especially', weights: [0, 0, 2, 3] },
      { label: 'Sometimes, during the day', detail: 'Long days out', weights: [0, 1, 3, 1] },
      { label: 'Fairly often', detail: 'On most heavy days', weights: [0, 0, 2, 3] },
    ],
  },
];

interface Pick {
  index: number;
  product: Product;
}

/** Sums the chosen weights; sizes not on sale are skipped, Extra Long wins a tie-free blank. */
function recommend(answers: (number | null)[], products: Product[]): { best?: Pick; alt?: Pick } {
  const totals = [0, 0, 0, 0];
  answers.forEach((a, q) => {
    if (a === null) return;
    QUESTIONS[q].options[a].weights.forEach((w, i) => (totals[i] += w));
  });
  const available = RANGE.map((r) => productOfSize(products, r.mm));

  let best: Pick | undefined;
  let bestScore = -1;
  available.forEach((product, i) => {
    if (product && totals[i] > bestScore) {
      bestScore = totals[i];
      best = { index: i, product };
    }
  });
  if (!best) return {};

  let alt: Pick | undefined;
  for (const offset of [1, -1]) {
    const i = best.index + offset;
    const product = available[i];
    if (product) {
      alt = { index: i, product };
      break;
    }
  }
  return { best, alt };
}

export const FlowQuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, products, addToCart } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(QUESTIONS.map(() => null));
  const [withAlt, setWithAlt] = useState(true);

  if (!isQuizOpen) return null;

  const done = step >= QUESTIONS.length;
  const { best, alt } = recommend(answers, products);

  const choose = (option: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === step ? option : a)));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers(QUESTIONS.map(() => null));
    setStep(0);
  };

  const addToBag = () => {
    if (!best) return;
    addToCart(best.product, 1);
    if (withAlt && alt) addToCart(alt.product, 1);
    closeQuiz();
    restart();
  };

  const packs = best ? 1 + (withAlt && alt ? 1 : 0) : 0;
  const price = (best?.product.price ?? 0) + (withAlt && alt ? alt.product.price : 0);

  return (
    <div className={styles.overlay} onClick={closeQuiz}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Find your size"
      >
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className="badge badge-coral">Size finder</span>
            <h2>{done ? 'Your size' : 'Find your size'}</h2>
          </div>
          <button className={styles.closeBtn} onClick={closeQuiz} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {!done && (
          <div className={styles.stepContent}>
            <span className={styles.stepCounter}>
              Question {step + 1} of {QUESTIONS.length}
            </span>
            <h3 className={styles.question}>{QUESTIONS[step].prompt}</h3>
            <p className={styles.subtitle}>{QUESTIONS[step].helper}</p>

            <div className={styles.optionsGrid}>
              {QUESTIONS[step].options.map((option, i) => (
                <button
                  key={option.label}
                  className={`${styles.optionCard} ${answers[step] === i ? styles.selected : ''}`}
                  onClick={() => choose(i)}
                >
                  <div className={styles.optionInfo}>
                    <strong>{option.label}</strong>
                    {option.detail && <span>{option.detail}</span>}
                  </div>
                </button>
              ))}
            </div>

            <div className={styles.navRow}>
              {step > 0 ? (
                <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                  ← Back
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}

        {done && best && (
          <div className={styles.resultsContent}>
            <div className={styles.recBanner}>
              <h3 className={styles.recTitle}>
                {RANGE[best.index].icon} {RANGE[best.index].name} · {best.product.size}
              </h3>
              <p className={styles.recDesc}>{RANGE[best.index].useCase}</p>
            </div>

            <div className={styles.padBreakdown}>
              <div className={styles.padPill}>
                <span className={styles.pillCount}>1</span>
                <div className={styles.pillMeta}>
                  <strong>
                    {best.product.name} — {formatRupees(best.product.price)}
                  </strong>
                  <span>Pack of 6 · your main size</span>
                </div>
              </div>

              {alt && (
                <label className={styles.padPill} style={{ cursor: 'pointer', opacity: withAlt ? 1 : 0.55 }}>
                  <input
                    type="checkbox"
                    checked={withAlt}
                    onChange={(e) => setWithAlt(e.target.checked)}
                    style={{ marginRight: 4 }}
                  />
                  <div className={styles.pillMeta}>
                    <strong>
                      Also add {alt.product.name} — {formatRupees(alt.product.price)}
                    </strong>
                    <span>
                      Many people also keep {RANGE[alt.index].name} for{' '}
                      {alt.index < best.index ? 'lighter' : 'heavier'} days.
                    </span>
                  </div>
                </label>
              )}
            </div>

            <p className={styles.subtitle} style={{ textAlign: 'center' }}>
              A suggestion based on your answers — not medical advice.
            </p>

            <div className={styles.bottomActions}>
              <button className="btn btn-secondary btn-sm" onClick={restart}>
                ↺ Start again
              </button>
              <button className="btn btn-primary btn-lg" onClick={addToBag} style={{ flex: 1 }}>
                Add {packs} {packs === 1 ? 'pack' : 'packs'} to bag · {formatRupees(price)} →
              </button>
            </div>
          </div>
        )}

        {done && !best && (
          <div className={styles.stepContent}>
            <p className={styles.subtitle}>Our pads are being restocked. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};
