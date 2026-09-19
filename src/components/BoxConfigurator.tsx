'use client';

import React from 'react';
import { useCart, type PackSelection } from '@/context/CartContext';
import { formatRupees, orderTotals, productOfSize } from '@/lib/api';
import {
  MoonIcon,
  SunIcon,
  FeatherIcon,
  SparkleIcon,
  PackageIcon,
  CalendarIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from './Icons';
import styles from './BoxConfigurator.module.css';

const PADS_PER_PACK = 6;

interface PresetOption {
  key: string;
  label: string;
  icon: React.ReactNode;
  packs: PackSelection;
}

const PRESETS: PresetOption[] = [
  {
    key: 'balanced',
    label: 'Balanced Flow',
    icon: <SparkleIcon size={14} color="#0D6B5B" />,
    packs: { doubleXl: 1, extraLong: 1, large: 1 },
  },
  {
    key: 'heavy',
    label: 'Heavy Days & Nights',
    icon: <MoonIcon size={14} color="#D86B52" />,
    packs: { doubleXl: 2, extraLong: 1, large: 0 },
  },
  {
    key: 'light',
    label: 'Lighter Flow',
    icon: <FeatherIcon size={14} color="#926917" />,
    packs: { doubleXl: 0, extraLong: 1, large: 1 },
  },
];

const SIZES: {
  key: keyof PackSelection;
  mm: number;
  pill: string;
  pillStyle: React.CSSProperties;
  barColor: string;
  name: string;
  flow: string;
  legend: string;
  icon: (color: string) => React.ReactNode;
  coverageNote: string;
}[] = [
  {
    key: 'doubleXl',
    mm: 330,
    pill: '330 mm · XXL',
    pillStyle: { background: 'var(--heavy-bg)', color: 'var(--heavy-text)', borderColor: 'var(--heavy-border)' },
    barColor: '#D86B52',
    name: 'Double Extra Long',
    flow: 'Heavy flow days & peaceful overnight sleep',
    legend: 'Heavy (330mm)',
    icon: (c) => <MoonIcon size={18} color={c} />,
    coverageNote: 'Wider flared back wings prevent rear leaks while lying down.',
  },
  {
    key: 'extraLong',
    mm: 290,
    pill: '290 mm · XL',
    pillStyle: { background: 'var(--medium-bg)', color: 'var(--medium-text)', borderColor: 'var(--medium-border)' },
    barColor: '#0D6B5B',
    name: 'Extra Long',
    flow: 'Daytime movement & moderate-to-heavy hours',
    legend: 'Medium (290mm)',
    icon: (c) => <SunIcon size={18} color={c} />,
    coverageNote: 'Comfortable contour that flexes naturally with active walking.',
  },
  {
    key: 'large',
    mm: 240,
    pill: '240 mm · Large',
    pillStyle: { background: 'var(--light-bg)', color: 'var(--light-text)', borderColor: 'var(--light-border)' },
    barColor: '#D97706',
    name: 'Large Day Pad',
    flow: 'Light flow days, spotting & gentle tapering',
    legend: 'Light (240mm)',
    icon: (c) => <FeatherIcon size={18} color={c} />,
    coverageNote: 'Feather-light silhouette with zero bulk under snug clothing.',
  },
];

/**
 * Mix packs of each size into one custom order. Every pack is a real catalog product
 * at its admin price, keeping the bag, the checkout and the backend synchronized.
 */
export const BoxConfigurator: React.FC = () => {
  const { products, config, addPacksToCart, openQuiz, customPacks: packs, setCustomPacks: setPacks } = useCart();

  const sizes = SIZES.map((s) => ({ ...s, product: productOfSize(products, s.mm) })).filter((s) => s.product);
  const totalPacks = sizes.reduce((sum, s) => sum + packs[s.key], 0);
  const totalPads = totalPacks * PADS_PER_PACK;
  const packPrice = sizes.reduce((sum, s) => sum + packs[s.key] * s.product!.price, 0);
  const { discount, delivery, total } = orderTotals(packPrice, config);

  const setCount = (key: keyof PackSelection, delta: number) =>
    setPacks((p) => ({ ...p, [key]: Math.max(0, Math.min(10, p[key] + delta)) }));

  const isPreset = (p: PackSelection) =>
    p.doubleXl === packs.doubleXl && p.extraLong === packs.extraLong && p.large === packs.large;

  if (sizes.length === 0) return null;

  return (
    <section id="custom-box" className={`section ${styles.configSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-coral">Customized Menstrual Comfort</span>
          <h2 className={styles.sectionTitle}>Build Your Own Period Box</h2>
          <p className={styles.sectionSubtitle}>
            Your flow fluctuates across every day of your period. Choose the exact number of Heavy,
            Medium, and Light packs your cycle requires. Each pack contains {PADS_PER_PACK} individually wrapped,
            medical-grade Anion pads.
          </p>
        </div>

        <div className={styles.presetsBar}>
          <span className={styles.presetLabel}>Quick combinations:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.key}
              className={`${styles.presetBtn} ${isPreset(preset.packs) ? styles.presetActive : ''}`}
              onClick={() => setPacks(preset.packs)}
            >
              <span className={styles.presetIcon}>{preset.icon}</span>
              <span>{preset.label}</span>
            </button>
          ))}
          <button className={styles.quizTriggerBtn} onClick={openQuiz}>
            <SparkleIcon size={14} color="#D86B52" />
            <span>Unsure? Take Flow Consultation</span>
          </button>
        </div>

        <div className={styles.builderGrid}>
          {/* Pad Selector Column */}
          <div className={styles.padSelectorCol}>
            {sizes.map((s) => {
              const count = packs[s.key];
              return (
                <div key={s.key} className={`${styles.sizeCard} ${count > 0 ? styles.sizeCardActive : ''}`}>
                  <div className={styles.sizeHeader}>
                    <div className={styles.sizeBadgePill} style={s.pillStyle}>
                      <span className={styles.pillIcon}>{s.icon('currentColor')}</span>
                      <span>{s.pill}</span>
                    </div>
                    <div className={styles.sizeDetails}>
                      <div className={styles.sizeNameRow}>
                        <h3 className={styles.sizeName}>{s.name}</h3>
                        <span className={styles.sizeFlowTag}>{s.flow}</span>
                      </div>
                      <p className={styles.sizeDesc}>
                        {formatRupees(s.product!.price)} per pack of {PADS_PER_PACK} · {s.coverageNote}
                      </p>
                    </div>
                  </div>

                  <div className={styles.counterRow}>
                    <div className={styles.counterWrapper}>
                      <button
                        className={styles.counterBtn}
                        onClick={() => setCount(s.key, -1)}
                        disabled={count <= 0}
                        aria-label={`Fewer ${s.name} packs`}
                      >
                        −
                      </button>
                      <span className={styles.counterNumber}>{count}</span>
                      <button
                        className={styles.counterBtn}
                        onClick={() => setCount(s.key, 1)}
                        disabled={count >= 10}
                        aria-label={`More ${s.name} packs`}
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.unitSub}>
                      {count} {count === 1 ? 'pack' : 'packs'} · {count * PADS_PER_PACK} pads
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Box Summary Column */}
          <div className={styles.boxSummaryCol}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div>
                  <h3 className={styles.summaryTitle}>Your Personalized Box</h3>
                  <span className={styles.boxStatus}>
                    {totalPacks > 0
                      ? `${totalPacks} ${totalPacks === 1 ? 'pack' : 'packs'} configured`
                      : 'Select at least one pack'}
                  </span>
                </div>
                <div className={styles.packCircle}>
                  <span className={styles.packCount}>{totalPads}</span>
                  <span className={styles.packPadsText}>PADS</span>
                </div>
              </div>

              {/* Distribution Bar */}
              <div className={styles.distBarWrapper}>
                <div className={styles.distBar}>
                  {sizes.map((s) =>
                    packs[s.key] > 0 ? (
                      <div
                        key={s.key}
                        className={styles.barSegment}
                        style={{
                          width: `${(packs[s.key] / (totalPacks || 1)) * 100}%`,
                          backgroundColor: s.barColor,
                        }}
                        title={`${packs[s.key] * PADS_PER_PACK} ${s.legend} pads`}
                      />
                    ) : null,
                  )}
                </div>
                <div className={styles.distLegend}>
                  {sizes.map((s) => (
                    <span key={s.key} className={styles.legendItem}>
                      <span className={styles.dot} style={{ background: s.barColor }} />
                      {s.legend}: {packs[s.key] * PADS_PER_PACK}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className={styles.priceContainer}>
                <div className={styles.priceRow}>
                  <span>Packs ({totalPacks})</span>
                  <span className={styles.subtotalPrice}>{formatRupees(packPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className={styles.priceRowSavings}>
                    <span>Auto-Repeat Discount Included</span>
                    <span className={styles.savingsAmount}>− {formatRupees(discount)}</span>
                  </div>
                )}
                {delivery > 0 && (
                  <div className={styles.priceRow}>
                    <span>Delivery</span>
                    <span className={styles.subtotalPrice}>{formatRupees(delivery)}</span>
                  </div>
                )}

                <div className={styles.finalRow}>
                  <div>
                    <span className={styles.totalLabel}>Total Investment</span>
                    <span className={styles.taxSub}>All taxes & handling included</span>
                  </div>
                  <div className={styles.totalValueGroup}>
                    <span className={styles.mainPrice}>{formatRupees(total)}</span>
                  </div>
                </div>
              </div>

              <button
                className={`btn btn-primary btn-lg ${styles.addToCartBtn}`}
                onClick={() => addPacksToCart(packs)}
                disabled={totalPacks === 0}
              >
                <span>Add Box to Bag</span>
                <ArrowRightIcon size={16} color="#FFFFFF" />
              </button>

              <div className={styles.summaryPerks}>
                <div className={styles.perk}>
                  <PackageIcon size={16} color="#0D6B5B" />
                  <span>Plain, discreet odor-sealed packaging</span>
                </div>
                <div className={styles.perk}>
                  <CalendarIcon size={16} color="#0D6B5B" />
                  <span>Want it every month? <a href="#subscriptions">Explore auto-repeat</a></span>
                </div>
                <div className={styles.perk}>
                  <ShieldCheckIcon size={16} color="#0D6B5B" />
                  <span>100% Rash-Free Guarantee or full refund</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
