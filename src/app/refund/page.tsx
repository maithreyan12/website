import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/page.module.css';

export const metadata: Metadata = {
  title: 'Cancellation and Refund Policy — PIAX',
  description: 'Learn about our order cancellation timelines, return policies for feminine hygiene products, and 5-7 business days refund process.',
  alternates: { canonical: '/refund' },
};

export default function RefundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div style={{ marginBottom: '16px' }}>
          <Link href="/" style={{ color: 'var(--primary-emerald, #008774)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            &larr; Back to PIAX Home
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Cancellation &amp; Refund Policy</h1>
          <p className={styles.updated}>
            Effective Date: September 2026 &middot; PIAX Wellness Private Limited
          </p>
        </header>

        <section className={styles.card}>
          <h2>1. Order Cancellation Policy</h2>
          <p>
            We know cycle needs can change. You can cancel your order before it has been dispatched for delivery:
          </p>
          <ul>
            <li>
              <strong>Standard Orders:</strong> You may cancel anytime before dispatch (typically within 4 hours of placing the order) by visiting your in-app order dashboard or contacting us at <a href="mailto:support@piax.co.in">support@piax.co.in</a>.
            </li>
            <li>
              <strong>Emergency 15-Minute Dispatch:</strong> Due to immediate rider allocation and automated picking, emergency orders cannot be cancelled once the partner courier has picked up the package.
            </li>
            <li>
              <strong>Pre-paid Cancellations:</strong> If you cancel before dispatch, a full refund of 100% of the transaction amount will be initiated immediately.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>2. Hygiene &amp; Return Policy</h2>
          <p>
            PIAX sanitary pads are classified under intimate feminine hygiene care products. To protect the health, safety, and hygiene of all customers:
          </p>
          <ul>
            <li>
              Opened, used, or tampered sanitary pad packs cannot be returned or restocked under any circumstance.
            </li>
            <li>
              Returns are accepted if you received a damaged outer package, leaked item, defective product, or incorrect size/item delivered compared to your order confirmation.
            </li>
            <li>
              To initiate a return for damaged or incorrect goods, notify our support team within <strong>48 hours of delivery</strong> with photos of the unboxing and product packaging.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>3. Refund Processing &amp; Timelines</h2>
          <div className={styles.highlight} style={{ marginBottom: '16px' }}>
            💳 <strong>Transparent Refund Guarantee:</strong> Approved refunds are credited directly back to the original source payment method within <strong>5 to 7 business days</strong>.
          </div>
          <p>
            Once our customer experience team verifies your cancellation or return request:
          </p>
          <ul>
            <li>
              <strong>UPI Payments:</strong> Refunds are reflected in your bank account / UPI app within 24 to 48 hours.
            </li>
            <li>
              <strong>Debit / Credit Cards &amp; Net Banking:</strong> Refunds are credited to the issuing bank card within <strong>5 to 7 business days</strong>, subject to your bank&apos;s settlement schedule.
            </li>
            <li>
              <strong>Wallets:</strong> Credited to the respective wallet provider within 24 hours.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>4. Subscription Cancellations</h2>
          <p>
            PIAX auto-repeat period subscriptions can be paused, modified, or cancelled anytime directly in the PIAX mobile app under <em>Subscriptions &rarr; Manage</em>. There are no lock-in periods or hidden cancellation fees. Cancellations requested before the monthly billing renewal date will not be charged.
          </p>
        </section>

        <section className={styles.card}>
          <h2>5. Customer Support &amp; Help Desk</h2>
          <p>
            If your refund has not reflected after 7 business days, or if you need assistance with an ongoing return:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:support@piax.co.in">support@piax.co.in</a><br />
            <strong>Operating Hours:</strong> Monday – Saturday, 9:00 AM – 7:00 PM IST<br />
            <strong>Entity:</strong> PIAX Wellness Private Limited, Chennai, Tamil Nadu, India
          </p>
        </section>
      </div>
    </div>
  );
}
