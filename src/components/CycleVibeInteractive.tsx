'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart, type PackSelection } from '@/context/CartContext';
import {
  FeatherIcon,
  MoonIcon,
  LeafIcon,
  SparkleIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  HeartHandIcon,
  PackageIcon,
  ShieldCheckIcon,
} from './Icons';
import styles from './CycleVibeInteractive.module.css';

interface Vibe {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ReactNode;
  comfortAdvice: string;
  solutionTitle: string;
  solutionDesc: string;
  padRecommendation: {
    size: string;
    length: string;
    pads: string;
    packs: PackSelection;
  };
  crampRitual: string;
}

const VIBES: Vibe[] = [
  {
    id: 'crampy',
    tag: 'Tender & Low Energy',
    title: 'Crampy, Bloated & Sore',
    subtitle: 'When lower abdominal aches make you just want to curl up with a hot water bottle.',
    accentColor: '#D86B52',
    bgGradient: 'linear-gradient(135deg, #FFF5F2 0%, #FEECE7 100%)',
    icon: <HeartHandIcon size={22} color="#D86B52" />,
    comfortAdvice: 'Your uterus is actively contracting. Avoid cold drinks; sip warm chamomile ginger tea, apply gentle warmth, and wear loose clothing.',
    solutionTitle: 'Medical-Grade Anion Negative Ion Strip',
    solutionDesc: 'The natural negative ions emit a soothing micro-current upon moisture contact that relaxes pelvic smooth muscle tension, reduces swelling, and keeps you feeling refreshed.',
    padRecommendation: {
      size: 'Double Extra Long',
      length: '330 mm · XXL',
      pads: 'Heavy flow cushioning',
      packs: { doubleXl: 2, extraLong: 1, large: 0 },
    },
    crampRitual: 'Includes complimentary herbal chamomile cramp-soothing tea in every custom box.',
  },
  {
    id: 'sleep',
    tag: 'Restless Night Anxiety',
    title: 'Waking Up to Check the Sheets',
    subtitle: 'Tossing, turning, and constant anxiety about waking up to stained pajama bottoms.',
    accentColor: '#9B3D28',
    bgGradient: 'linear-gradient(135deg, #FBF4F2 0%, #F5EAE6 100%)',
    icon: <MoonIcon size={22} color="#9B3D28" />,
    comfortAdvice: 'Quality sleep is when your body regenerates red blood cells. You shouldn’t have to sleep in one stiff position all night.',
    solutionTitle: 'Extra-Wide 330mm Flared Back + 4 Wings',
    solutionDesc: 'Our Double XL pad features a 16 cm wide rear fan wing and Japanese SAP polymer that locks liquid into dry gel in 10 seconds. Sleep on your back, stomach, or side with total freedom.',
    padRecommendation: {
      size: 'Double Extra Long',
      length: '330 mm · XXL',
      pads: 'Zero rear leak guarantee',
      packs: { doubleXl: 2, extraLong: 1, large: 0 },
    },
    crampRitual: 'Locks up to 5x more liquid than ordinary pads so you never wake up feeling damp.',
  },
  {
    id: 'active',
    tag: 'On The Go & Active',
    title: 'Busy Day, Workouts & Commuting',
    subtitle: 'Rushing between meetings, lectures, or gym workouts without time for awkward bathroom runs.',
    accentColor: '#0D6B5B',
    bgGradient: 'linear-gradient(135deg, #F0F8F5 0%, #E3F2EC 100%)',
    icon: <LeafIcon size={22} color="#0D6B5B" />,
    comfortAdvice: 'Dynamic movement causes conventional pads to bunch up, shift sideways, and crinkle loudly. You need ergonomic flexibility.',
    solutionTitle: '4-Wing Side Stabilizers & 0.1cm Feather Core',
    solutionDesc: 'Contoured dual-channel fluid routing holds the pad firmly against your underwear contours. Ultra-thin profile means zero awkward bulk even under tight yoga leggings.',
    padRecommendation: {
      size: 'Extra Long Daytime',
      length: '290 mm · XL',
      pads: 'Active flexibility & zero shifting',
      packs: { doubleXl: 1, extraLong: 2, large: 0 },
    },
    crampRitual: 'No crinkly plastic sounds in the public restroom. Completely silent disposal wrapper.',
  },
  {
    id: 'chafing',
    tag: 'Sensitive & Itchy Skin',
    title: 'Rash & Friction Chafing',
    subtitle: 'Terrible red bumps, heat rash, and stinging friction from synthetic plastic mesh pads.',
    accentColor: '#B45309',
    bgGradient: 'linear-gradient(135deg, #FEF9EE 0%, #FDF2DC 100%)',
    icon: <FeatherIcon size={22} color="#B45309" />,
    comfortAdvice: 'Synthetic petrochemical pads create an airtight greenhouse effect. Trapped sweat breeds bacterial imbalance in 20 minutes.',
    solutionTitle: '100% Plant-Cotton Topsheet & Breathable Back',
    solutionDesc: 'Micro-perforated natural fibers allow skin to breathe freely. Zero chlorine bleaching, zero artificial perfumes, and certified hypoallergenic by dermatologists.',
    padRecommendation: {
      size: 'Gentle Large Day Pad',
      length: '240 mm · Large',
      pads: 'Feather-light rash-free touch',
      packs: { doubleXl: 1, extraLong: 1, large: 1 },
    },
    crampRitual: 'Backed by our 100% Rash-Free Comfort Guarantee or full refund.',
  },
];

export const CycleVibeInteractive: React.FC = () => {
  const [activeVibeId, setActiveVibeId] = useState<string>('crampy');
  const { setCustomPacks } = useCart();

  const currentVibe = VIBES.find((v) => v.id === activeVibeId) || VIBES[0];

  const handleApplyVibePacks = () => {
    setCustomPacks(currentVibe.padRecommendation.packs);
    const builder = document.getElementById('custom-box');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`section ${styles.vibeSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-coral">Interactive Comfort Companion</span>
          <h2 className={styles.title}>
            How is your body feeling <span className={styles.italicAccent}>right now?</span>
          </h2>
          <p className={styles.subtitle}>
            Periods aren’t one-size-fits-all. Tap your cycle mood below to see how PIAX nurtures
            your body with soothing rituals, custom pad configurations, and instant relief.
          </p>
        </div>

        {/* Tab Buttons / Mood Selectors */}
        <div className={styles.moodTabs}>
          {VIBES.map((vibe) => {
            const isActive = vibe.id === activeVibeId;
            return (
              <button
                key={vibe.id}
                className={`${styles.moodTab} ${isActive ? styles.moodTabActive : ''}`}
                onClick={() => setActiveVibeId(vibe.id)}
              >
                <div className={styles.tabIconCircle}>{vibe.icon}</div>
                <div className={styles.tabTextGroup}>
                  <span className={styles.tabTag}>{vibe.tag}</span>
                  <strong className={styles.tabTitle}>{vibe.title}</strong>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Experience Card */}
        <div className={styles.interactiveCard} style={{ background: currentVibe.bgGradient }}>
          <div className={styles.cardGrid}>
            {/* Left: Empathetic Advice & Science Solution */}
            <div className={styles.leftCol}>
              <div className={styles.vibePillBadge} style={{ color: currentVibe.accentColor }}>
                <SparkleIcon size={14} color={currentVibe.accentColor} />
                <span>Your Personalized Relief Strategy</span>
              </div>

              <h3 className={styles.experienceTitle}>{currentVibe.title}</h3>
              <p className={styles.comfortAdviceText}>{currentVibe.comfortAdvice}</p>

              <div className={styles.solutionBox}>
                <div className={styles.solutionHeader}>
                  <LeafIcon size={18} color={currentVibe.accentColor} />
                  <h4>{currentVibe.solutionTitle}</h4>
                </div>
                <p>{currentVibe.solutionDesc}</p>
              </div>

              <div className={styles.ritualCallout}>
                <HeartHandIcon size={16} color="#0D6B5B" />
                <span>{currentVibe.crampRitual}</span>
              </div>
            </div>

            {/* Right: Recommended Pad & Action */}
            <div className={styles.rightCol}>
              <div className={styles.padCard}>
                <div className={styles.padBadgeRow}>
                  <span className={styles.recommendedTag}>Recommended Size</span>
                  <span className={styles.padLengthBadge} style={{ background: currentVibe.accentColor, color: '#FFFFFF' }}>
                    {currentVibe.padRecommendation.length}
                  </span>
                </div>

                <div className={styles.padImageContainer}>
                  <Image
                    src="/images/home_savers_six.png"
                    alt={currentVibe.padRecommendation.size}
                    width={280}
                    height={200}
                    className={styles.padImg}
                  />
                  <div className={styles.floatingTagTop}>0.1 cm Ultra-Thin</div>
                  <div className={styles.floatingTagBottom}>100% Rash-Free</div>
                </div>

                <h4 className={styles.padCardTitle}>{currentVibe.padRecommendation.size}</h4>
                <p className={styles.padCardSub}>{currentVibe.padRecommendation.pads}</p>

                <div className={styles.perksChecklist}>
                  <div className={styles.checkRow}>
                    <CheckCircleIcon size={15} color="#0D6B5B" />
                    <span>6,000+ Anion negative ions</span>
                  </div>
                  <div className={styles.checkRow}>
                    <CheckCircleIcon size={15} color="#0D6B5B" />
                    <span>Noiseless, discreet peel wrapper</span>
                  </div>
                  <div className={styles.checkRow}>
                    <CheckCircleIcon size={15} color="#0D6B5B" />
                    <span>Tested to BIS IS 5405:2025 standard</span>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleApplyVibePacks}
                >
                  <span>Build Box with This Pad</span>
                  <ArrowRightIcon size={16} color="#FFFFFF" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tactile Unboxing Experience - What Girls Love */}
        <div className={styles.unboxingExperience}>
          <div className={styles.unboxingHeader}>
            <span className="badge badge-teal">The Tactile Experience</span>
            <h3 className={styles.unboxingTitle}>What’s inside every PIAX Box?</h3>
            <p className={styles.unboxingSub}>
              We obsess over every detail so your period feels like a pampering wellness ritual.
            </p>
          </div>

          <div className={styles.unboxingGrid}>
            <div className={styles.unboxItem}>
              <div className={styles.unboxIconWrap}>
                <PackageIcon size={22} color="#0D6B5B" />
              </div>
              <h4>Keepsake Vanity Box</h4>
              <p>
                Matte porcelain drawer box that looks elegant on your shelf or dresser, keeping pads sterile and organized.
              </p>
            </div>

            <div className={styles.unboxItem}>
              <div className={styles.unboxIconWrap}>
                <FeatherIcon size={22} color="#D86B52" />
              </div>
              <h4>Silent Disposal Sleeves</h4>
              <p>
                Zero crinkly noises in office or campus restrooms. Each pad is wrapped in a soft, biodegradable, resealable disposal pouch.
              </p>
            </div>

            <div className={styles.unboxItem}>
              <div className={styles.unboxIconWrap}>
                <LeafIcon size={22} color="#0D6B5B" />
              </div>
              <h4>Cramp Calming Sachet</h4>
              <p>
                A complimentary organic herbal chamomile and ginger tea sachet in every box to soothe cramp spasms from within.
              </p>
            </div>

            <div className={styles.unboxItem}>
              <div className={styles.unboxIconWrap}>
                <ClockIcon size={22} color="#D86B52" />
              </div>
              <h4>15-Min Emergency Hub Code</h4>
              <p>
                VIP priority credits in the PIAX mobile app for instantaneous 15-minute delivery when your period arrives early.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
