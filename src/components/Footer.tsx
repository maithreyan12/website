'use client';

import React from 'react';
import Image from 'next/image';
import type { SiteConfig, AppLinks } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { SparkleIcon } from './Icons';
import styles from './Footer.module.css';

interface FooterProps {
  config?: SiteConfig;
  links?: AppLinks;
}

export const Footer: React.FC<FooterProps> = () => {
  const { openQuiz } = useCart();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <Image
                src="/images/logo_lotus.png"
                alt="PIAX Logo"
                width={36}
                height={36}
                className={styles.footerLogo}
              />
              <span className={styles.brandTitle}>PIAX</span>
            </div>
            <p className={styles.brandDesc}>
              Luxury Organic Anion Sanitary Care & Intelligent Cycle Companion. Certified rash-free,
              0% toxins, and engineered to empower women with custom period kits and 15-minute emergency delivery.
            </p>

            <div className={styles.certPills}>
              <span className={styles.certPill}>Tested to BIS IS 5405:2025</span>
              <span className={styles.certPill}>ISO 11737-1:2018</span>
              <span className={styles.certPill}>Crafted in India</span>
            </div>
          </div>

          {/* Nav Column 1: Period Care */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeading}>Period Care</h4>
            <ul className={styles.linkList}>
              <li><a href="/#custom-box">Build Your Own Box</a></li>
              <li><a href="/#shop">Large Pads (240 mm)</a></li>
              <li><a href="/#shop">Extra Long Pads (290 mm)</a></li>
              <li><a href="/#shop">Double XL Pads (330 mm)</a></li>
              <li><a href="/#subscriptions">Auto-Repeat Period Subscription</a></li>
            </ul>
          </div>

          {/* Nav Column 2: Health Tools & App */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeading}>Smart Tools & App</h4>
            <ul className={styles.linkList}>
              <li>
                <button onClick={openQuiz} className={styles.textBtn}>
                  <SparkleIcon size={14} color="#D86B52" />
                  <span>Flow & Comfort Consultation</span>
                </button>
              </li>
              <li><a href="/#cycle-calculator">Period & Cycle Predictor</a></li>
              <li><a href="/#app-showcase">15-Minute Emergency Delivery</a></li>
              <li><a href="/#app-showcase">8 AI Health Assistants</a></li>
              <li><a href="/#app-showcase">Gynaecologist Video Consults</a></li>
            </ul>
          </div>

          {/* Nav Column 3: Platform & Control */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeading}>Platform & Control</h4>
            <ul className={styles.linkList}>
              <li><a href="/#app-showcase">Delivery Partner App</a></li>
              <li><a href="/#why-piax">Clinical Safety Standards</a></li>
              <li><a href="/#reviews">Doctor Testimonials</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className={styles.disclaimerRow}>
          <p>
            <strong>Medical Disclaimer:</strong> Information provided by the PIAX period calculator,
            flow questionnaire, and educational articles is for general wellness guidance and does
            not constitute formal clinical diagnosis. Consult a licensed gynecologist for persistent
            menstrual abnormalities, endometriosis, or severe pelvic pain.
          </p>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} PIAX Wellness Private Limited. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <span>•</span>
            <a href="/terms">Terms of Service</a>
            <span>•</span>
            <a href="/refund">Cancellation &amp; Refund Policy</a>
            <span>•</span>
            <a href="/shipping">Shipping Policy</a>
            <span>•</span>
            <a href="/contact">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
