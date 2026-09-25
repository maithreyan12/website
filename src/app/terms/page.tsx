import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service — PIAX',
  description: 'Terms and conditions governing the use of PIAX website, mobile application, and period care products.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div style={{ marginBottom: '16px' }}>
          <Link href="/" style={{ color: 'var(--primary-emerald, #008774)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            &larr; Back to PIAX Home
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Terms and Conditions</h1>
          <p className={styles.updated}>
            Last Updated: September 2026 &middot; PIAX Wellness Private Limited
          </p>
        </header>

        <section className={styles.card}>
          <h2>1. Introduction & Acceptance of Terms</h2>
          <p>
            Welcome to PIAX. These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website 
            located at <a href="https://piax.co.in">https://piax.co.in</a>, the PIAX mobile applications, and all associated services, 
            products, and content provided by <strong>PIAX Wellness Private Limited</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p>
            By accessing or using our website, purchasing products, or downloading our application, you agree to be bound by these Terms. 
            If you do not agree with any part of these Terms, you must discontinue use immediately.
          </p>
        </section>

        <section className={styles.card}>
          <h2>2. Eligibility & Account Security</h2>
          <p>
            You must be at least 18 years of age or possess legal parental/guardian consent to use our services and make online purchases. 
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section className={styles.card}>
          <h2>3. Product Orders, Pricing & Payment Terms</h2>
          <p>
            All products displayed on our website, including organic sanitary pads, custom boxes, and subscriptions, are subject to availability. 
            Prices are listed in Indian Rupees (&inr;) and include applicable GST/taxes unless otherwise indicated.
          </p>
          <p>
            We accept online payments through secure, RBI-authorized payment gateways including Razorpay, UPI, debit/credit cards, and net banking. 
            By placing an order, you represent and warrant that you are legally authorized to use the designated payment method.
          </p>
        </section>

        <section className={styles.card}>
          <h2>4. Shipping, Delivery & Tracking</h2>
          <p>
            Orders are processed and dispatched in accordance with our <Link href="/shipping">Shipping and Delivery Policy</Link>. 
            Standard doorstep delivery takes 2 to 4 business days across India. Emergency 15-minute dispatch is available in select serviceable zones.
          </p>
        </section>

        <section className={styles.card}>
          <h2>5. Cancellation, Returns & Refunds</h2>
          <p>
            Cancellations and returns are governed by our <Link href="/refund">Cancellation and Refund Policy</Link>. Due to hygiene and personal healthcare standards, 
            opened or unsealed sanitary pad boxes cannot be returned unless damaged during transit or defective. Approved refunds are credited to the original payment method within 5 to 7 business days.
          </p>
        </section>

        <section className={styles.card}>
          <h2>6. Medical Guidance & Health Disclaimers</h2>
          <p>
            PIAX period care tools, cycle calculators, and AI wellness guides are designed for educational and menstrual tracking purposes only. 
            They are not medical devices and do not provide medical diagnosis, treatment, or contraceptive protection. Always seek professional advice from a licensed gynecologist.
          </p>
        </section>

        <section className={styles.card}>
          <h2>7. Intellectual Property</h2>
          <p>
            All trademarks, logos, brand names, designs, text, graphics, and software are the exclusive intellectual property of PIAX Wellness Private Limited. Unauthorized reproduction or commercial use is strictly prohibited.
          </p>
        </section>

        <section className={styles.card}>
          <h2>8. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
          </p>
        </section>

        <section className={styles.card}>
          <h2>9. Contact Information</h2>
          <p>
            For questions or legal inquiries regarding these Terms:
          </p>
          <p>
            <strong>PIAX Wellness Private Limited</strong><br />
            <strong>Email:</strong> <a href="mailto:support@piax.co.in">support@piax.co.in</a><br />
            <strong>Website:</strong> <a href="https://piax.co.in">https://piax.co.in</a>
          </p>
        </section>
      </div>
    </div>
  );
}
