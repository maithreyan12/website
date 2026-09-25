import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us — PIAX',
  description: 'Get in touch with the PIAX customer care team for order inquiries, menstrual care support, or enterprise partnerships.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div style={{ marginBottom: '16px' }}>
          <Link href="/" style={{ color: 'var(--primary-emerald, #008774)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            &larr; Back to PIAX Home
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.updated}>
            We&apos;re here to support your comfort and cycle care. Reach out anytime.
          </p>
        </header>

        <section className={styles.card}>
          <h2>Customer Experience &amp; Inquiries</h2>
          <p>
            Whether you have a question about our 100% organic cotton anion pads, our cycle companion app, or an existing delivery, our dedicated care team is ready to help.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ background: 'var(--mint-bg, #f2f9f7)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(0, 135, 116, 0.15)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-emerald, #008774)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Email Support</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--primary-deep, #052620)', marginBottom: '4px' }}>
                <a href="mailto:support@piax.co.in" style={{ color: 'inherit', textDecoration: 'none' }}>support@piax.co.in</a>
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-sub, #4b635e)' }}>Response within 2 to 4 business hours</div>
            </div>

            <div style={{ background: 'var(--mint-bg, #f2f9f7)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(0, 135, 116, 0.15)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-emerald, #008774)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Operating Hours</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary-deep, #052620)', marginBottom: '4px' }}>
                Mon – Sat: 9:00 AM – 7:00 PM IST
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-sub, #4b635e)' }}>Emergency dispatch active 24/7 in app</div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Registered Corporate Office</h2>
          <p>
            <strong>Entity Name:</strong> PIAX Wellness Private Limited<br />
            <strong>Operating Address:</strong> No. 12, First Cross Street, T. Nagar, Chennai, Tamil Nadu 600017, India<br />
            <strong>Country of Origin:</strong> India<br />
            <strong>Official Website:</strong> <a href="https://piax.co.in">https://piax.co.in</a>
          </p>
        </section>

        <section className={styles.card}>
          <h2>Grievance Redressal &amp; Data Protection Officer</h2>
          <p>
            In accordance with the Information Technology Act 2000 and rules made thereunder, you can contact our Grievance Officer directly for privacy or payment escalations:
          </p>
          <p>
            <strong>Attention:</strong> Grievance Officer, PIAX Wellness Private Limited<br />
            <strong>Email:</strong> <a href="mailto:support@piax.co.in?subject=Grievance%20Officer%20Escalation">support@piax.co.in</a><br />
            <strong>Subject Line:</strong> Attention: Grievance Redressal
          </p>
        </section>
      </div>
    </div>
  );
}
