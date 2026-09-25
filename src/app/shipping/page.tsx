import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/page.module.css';

export const metadata: Metadata = {
  title: 'Shipping and Delivery Policy — PIAX',
  description: 'Details on our discreet packaging, 15-minute emergency delivery in select hubs, and 2-4 day pan-India shipping.',
  alternates: { canonical: '/shipping' },
};

export default function ShippingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div style={{ marginBottom: '16px' }}>
          <Link href="/" style={{ color: 'var(--primary-emerald, #008774)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            &larr; Back to PIAX Home
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Shipping &amp; Delivery Policy</h1>
          <p className={styles.updated}>
            Effective Date: September 2026 &middot; PIAX Wellness Private Limited
          </p>
        </header>

        <section className={styles.card}>
          <h2>1. 100% Discreet &amp; Eco-Friendly Packaging</h2>
          <p>
            Your dignity, comfort, and privacy are paramount. All PIAX sanitary pads and menstrual care accessories are packed in tamper-evident, unmarked, 100% biodegradable kraft packaging. There is zero external mention of the package contents, ensuring total discretion upon doorstep delivery.
          </p>
        </section>

        <section className={styles.card}>
          <h2>2. Delivery Modes &amp; Estimated Timelines</h2>
          <p>
            PIAX offers two delivery tiers depending on urgency and delivery location:
          </p>
          <ul>
            <li>
              <strong>15-Minute Emergency Hub Delivery:</strong> In serviceable metro zones (including partner delivery hubs in Chennai, Bengaluru, and tier-1 clusters), tap &ldquo;Emergency Dispatch&rdquo; in the PIAX app. Our nearest rider delivers fresh pads to your doorstep or campus gate in 15 to 30 minutes.
            </li>
            <li>
              <strong>Standard Pan-India Doorstep Delivery:</strong> Orders dispatched via express courier partners (BlueDart, Delhivery, Xpressbees) are delivered within <strong>2 to 4 business days</strong> across all pin codes in India.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>3. Shipping Charges &amp; Free Delivery</h2>
          <p>
            Shipping charges are transparently calculated at checkout before payment:
          </p>
          <ul>
            <li>
              <strong>Orders above &inr;299:</strong> Eligible for <strong>FREE standard doorstep shipping</strong>.
            </li>
            <li>
              <strong>Orders below &inr;299:</strong> A nominal flat delivery fee of &inr;50 applies for pan-India logistics.
            </li>
            <li>
              <strong>Emergency Dispatch:</strong> A real-time rider dispatch convenience fee (typically &inr;30 to &inr;50) is shown prior to checkout.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>4. Order Tracking &amp; Notifications</h2>
          <p>
            Once your order is handed over to our logistics partner, you will receive an SMS and WhatsApp notification containing your live AWB tracking number. You can also view live delivery progress inside the PIAX app.
          </p>
        </section>

        <section className={styles.card}>
          <h2>5. Damaged or Non-Delivery Inquiries</h2>
          <p>
            If your package is delayed past the estimated window or appears physically damaged at delivery, please alert us within 48 hours:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:support@piax.co.in">support@piax.co.in</a><br />
            <strong>Entity:</strong> PIAX Wellness Private Limited, Chennai, Tamil Nadu, India
          </p>
        </section>
      </div>
    </div>
  );
}
