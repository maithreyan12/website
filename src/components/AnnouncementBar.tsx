import React from 'react';
import type { Banner } from '@/lib/api';
import { webHref, DEFAULT_ANDROID_STORE_URL } from '@/lib/api';
import { SparkleIcon } from './Icons';
import styles from './AnnouncementBar.module.css';

interface AnnouncementBarProps {
  banner?: Banner;
  fallbackHref?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  banner,
  fallbackHref = DEFAULT_ANDROID_STORE_URL,
}) => {
  if (banner) {
    return (
      <div className={styles.banner}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.item}>
              <span className={styles.highlight}>{banner.title}</span>
              {banner.subtitle && <span className={styles.subtitle}>{banner.subtitle}</span>}
            </div>
            {banner.cta_label && (
              <a
                className={styles.ctaLink}
                href={webHref(banner.deep_link, fallbackHref)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{banner.cta_label}</span>
                <span className={styles.arrow}>→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.item}>
            <span className={styles.tag}>Emergency Care</span>
            <span>15-Minute Doorstep Hub Delivery across Chennai & Bengaluru</span>
          </div>
          <span className={styles.bullet}>•</span>
          <div className={styles.item}>
            <span>Custom Box Savings: Save 25% with Auto-Repeat · Use code <strong className={styles.code}>CARE25</strong></span>
          </div>
          <span className={styles.bullet}>•</span>
          <div className={styles.item}>
            <SparkleIcon size={14} color="#D86B52" />
            <span>Certified Rash-Free Anion Organic Comfort</span>
          </div>
        </div>
      </div>
    </div>
  );
};
