import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — PIAX',
  description:
    'How PIAX collects, uses and protects your cycle, account and order data. We never sell your health data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div style={{ marginBottom: '16px' }}>
          <a href="/" style={{ color: 'var(--primary-emerald, #008774)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            &larr; Back to PIAX Home
          </a>
        </div>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>
            Effective Date: September 19, 2026 · Compliant with Google Play Health Apps Policy
          </p>
        </header>

        <section id="medical" className={styles.disclaimer}>
          <h2 className={styles.disclaimerTitle}>⚠️ Mandatory Medical Disclaimer</h2>
          <p>
            PIAX is not a medical device and does not diagnose, treat, cure, or prevent any medical
            condition. Cycle forecasts and fertility estimates are for educational and tracking
            purposes only and must not be used as a method of contraception or birth control. Always
            consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
          </p>
        </section>

        <section className={styles.card}>
          <h2>1. Types of Data We Collect</h2>
          <p>
            We only collect data strictly necessary to provide menstrual tracking, reminder
            notifications, and product delivery services:
          </p>
          <ul>
            <li>
              <strong>Menstrual &amp; Cycle Information:</strong> Period start and end dates, flow
              intensity, physical signs (cramps, headaches, body temperature), emotional states,
              sexual activity, and ovulation or pregnancy test results.
            </li>
            <li>
              <strong>Account Details:</strong> Profile name, email address, and optional phone
              number used for account verification.
            </li>
            <li>
              <strong>Reminders &amp; Schedules:</strong> Custom medication, hydration, and pad
              change reminder times configured locally.
            </li>
            <li>
              <strong>Orders &amp; Fulfillment:</strong> Delivery address, recipient contact
              details, and transaction histories for feminine care product purchases.
            </li>
            <li>
              <strong>Technical &amp; Diagnostic Data:</strong> Device model, OS version, and
              anonymous crash telemetry to maintain application performance.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>2. How We Use Your Data</h2>
          <p>Your health and personal data is used solely to provide your requested services:</p>
          <ul>
            <li>
              Calculating cycle day predictions, expected period windows, and fertile window
              estimations.
            </li>
            <li>Scheduling on-device notifications for pill, hydration, and cycle reminders.</li>
            <li>Fulfilling sanitary care orders and providing customer support.</li>
          </ul>
          <div className={styles.highlight}>
            🛡️ <strong>Zero Data Selling Guarantee:</strong> We do NOT sell, lease, trade, or rent
            personal or health data to advertisers, data brokers, or third parties under any
            circumstances. Your health data is never used for advertising.
          </div>
        </section>

        <section className={styles.card}>
          <h2>3. Data Security, Retention &amp; Your Rights</h2>
          <p>We treat your reproductive health information with strict security standards:</p>
          <ul>
            <li>
              <strong>Encryption:</strong> All data in transit is encrypted using industry-standard
              HTTPS/TLS protocols.
            </li>
            <li>
              <strong>Right to Deletion:</strong> You can edit or permanently delete your account
              and all associated cycle records at any time directly in the app via Settings.
            </li>
            <li>
              <strong>Data Retention:</strong> Health records are stored only while your account
              remains active. Upon account deletion, all personal records are purged.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>4. AI Health Assistant &amp; Community</h2>
          <p>
            Conversations with our Health Assistant bots provide general educational wellness
            guidance. Responses are generated by artificial intelligence and may occasionally
            contain inaccuracies. Bot interactions do not establish a doctor-patient relationship
            and do not replace professional medical evaluations. In an emergency, contact local
            emergency services (such as 112) immediately.
          </p>
        </section>

        <section className={styles.card}>
          <h2>5. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or your
            data, please contact our Data Protection Team:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:support@piax.co.in">support@piax.co.in</a>
            <br />
            <strong>Website:</strong> <a href="https://piax.co.in">https://piax.co.in</a>
          </p>
        </section>
      </div>
    </div>
  );
}
