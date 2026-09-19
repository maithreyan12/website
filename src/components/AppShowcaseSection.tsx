'use client';

import React from 'react';
import Image from 'next/image';
import { DEFAULT_ANDROID_STORE_URL, type HealthBot, type AppLinks } from '@/lib/api';
import {
  ClockIcon,
  SparkleIcon,
  BoltIcon,
  ChatIcon,
  StethoscopeIcon,
} from './Icons';
import styles from './AppShowcaseSection.module.css';

interface AppShowcaseSectionProps {
  bots?: HealthBot[];
  links?: AppLinks;
}

export const AppShowcaseSection: React.FC<AppShowcaseSectionProps> = ({ links }) => {
  return (
    <section id="app-showcase" className={`section ${styles.appSection}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Visual Mockup */}
          <div className={styles.visualCol}>
            <div className={styles.mockupContainer}>
              <div className={styles.phoneFrame}>
                <Image
                  src="/images/app_screen_care.png"
                  alt="PIAX App Interface"
                  width={340}
                  height={680}
                  className={styles.screenImage}
                />
              </div>

              <div className={`${styles.bubble} ${styles.bubbleRider}`}>
                <div className={styles.bubbleIconWrap}>
                  <ClockIcon size={16} color="#D86B52" />
                </div>
                <div>
                  <strong>15-Min Delivery Live</strong>
                  <span>Rider at your apartment gate</span>
                </div>
              </div>

              <div className={`${styles.bubble} ${styles.bubbleBot}`}>
                <div className={styles.bubbleIconWrap}>
                  <SparkleIcon size={16} color="#0D6B5B" />
                </div>
                <div>
                  <strong>Dr. Ananya (AI Gynae)</strong>
                  <span>"Cramp-soothing tea recipe ready"</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: App Features */}
          <div className={styles.detailsCol}>
            <span className="badge badge-coral">Mobile Wellness Companion</span>
            <h2 className={styles.title}>
              Intelligent Menstrual Care in Your Pocket
            </h2>
            <p className={styles.desc}>
              The website is your gateway to customized boxes; the <strong>PIAX App</strong> is your
              private cycle sanctuary. Zero login barriers, device-encrypted privacy, and
              instant emergency care whenever you need it.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <div className={styles.iconBox}>
                  <BoltIcon size={20} color="#0D6B5B" />
                </div>
                <div>
                  <h4>15-Minute Rapid Pad Dispatch</h4>
                  <p>
                    Caught unprepared at work or home? Tap Emergency Quick Order and our nearest
                    partner hub delivers to your doorstep within 15 minutes.
                  </p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.iconBox}>
                  <ChatIcon size={20} color="#0D6B5B" />
                </div>
                <div>
                  <h4>8 Specialized AI Health Assistants</h4>
                  <p>
                    Private, judgment-free consultations 24/7 on cramps, PCOS symptoms, discharge
                    patterns, and fertility rhythms powered by medical AI.
                  </p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.iconBox}>
                  <StethoscopeIcon size={20} color="#0D6B5B" />
                </div>
                <div>
                  <h4>Verified Doctor Tele-Consults</h4>
                  <p>
                    Book 1-on-1 private tele-consultations with certified gynecologists and
                    dermatologists directly within the app.
                  </p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.iconBox}>
                  <ClockIcon size={20} color="#0D6B5B" />
                </div>
                <div>
                  <h4>Smart Pad Change & Inventory Alerts</h4>
                  <p>
                    Gentle reminders to change pads every 4 hours to prevent bacterial accumulation,
                    plus automatic auto-replenish notifications.
                  </p>
                </div>
              </div>
            </div>

            {/* App Store and QR Code Download Banner */}
            <div className={styles.downloadCard}>
              <div className={styles.qrCol}>
                <Image
                  src="/images/playstore_qr.png"
                  alt="Scan QR to download PIAX App"
                  width={84}
                  height={84}
                  className={styles.qrImage}
                />
                <span className={styles.scanLabel}>Scan with camera</span>
              </div>

              <div className={styles.storeCol}>
                <span className={styles.storeTitle}>Download PIAX for Android & iOS</span>
                <p className={styles.storeSub}>
                  Experience instant 15-min delivery and 24/7 AI wellness bots.
                </p>
                <div className={styles.storeButtons}>
                  <a
                    href={links?.android || DEFAULT_ANDROID_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.playStoreBtn}
                  >
                    <Image
                      src="/images/mark_google.png"
                      alt="Google Play"
                      width={18}
                      height={18}
                    />
                    <span>Get on Google Play</span>
                  </a>
                  {links?.ios ? (
                    <a href={links.ios} target="_blank" rel="noopener noreferrer" className={styles.playStoreBtn}>
                      <Image src="/images/mark_apple.png" alt="Apple App Store" width={18} height={18} />
                      <span>iOS App Store</span>
                    </a>
                  ) : (
                    <span className={styles.playStoreBtn} style={{ opacity: 0.6, cursor: 'default' }}>
                      <Image src="/images/mark_apple.png" alt="" width={18} height={18} />
                      <span>iPhone: coming soon</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
