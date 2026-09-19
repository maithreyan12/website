import React from 'react';
import type { AppLinks, SiteConfig, StoreLocation } from '@/lib/api';
import { formatRupees } from '@/lib/api';
import { GetAppButton } from './GetAppButton';
import styles from './DeliverySection.module.css';

interface DeliverySectionProps {
  config: SiteConfig;
  stores: StoreLocation[];
  links: AppLinks;
}

/**
 * Delivery terms exactly as the backend charges them at checkout
 * (admin → App settings: delivery_charge, flat_discount, emergency_eta_minutes)
 * and the partner stores orders are dispatched from (admin → Stores).
 */
export const DeliverySection: React.FC<DeliverySectionProps> = ({ config, stores, links }) => {
  const terms = [
    config.emergency_eta_minutes
      ? { value: `~${config.emergency_eta_minutes} min`, label: 'Typical emergency delivery time' }
      : null,
    typeof config.delivery_charge === 'number'
      ? {
          value: config.delivery_charge > 0 ? formatRupees(config.delivery_charge) : 'Free',
          label: 'Delivery fee per order',
        }
      : null,
    typeof config.flat_discount === 'number' && config.flat_discount > 0
      ? { value: `${formatRupees(config.flat_discount)} off`, label: 'Taken off every order at checkout' }
      : null,
  ].filter(Boolean) as { value: string; label: string }[];

  if (terms.length === 0 && stores.length === 0) return null;

  return (
    <section id="delivery" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Delivery</span>
          <h2 className={styles.title}>Caught short? Order from the app.</h2>
          <p className={styles.subtitle}>
            Orders go to the nearest partner store and a delivery partner brings them over. You can
            follow the rider live in the app.
          </p>
        </div>

        {terms.length > 0 && (
          <div className={styles.terms}>
            {terms.map((t) => (
              <div key={t.label} className={styles.term}>
                <strong>{t.value}</strong>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        )}

        {stores.length > 0 && (
          <>
            <h3 className={styles.storesHeading}>Delivering from</h3>
            <div className={styles.stores}>
              {stores.map((store) => (
                <div key={store.id} className={styles.store}>
                  <strong>{store.name}</strong>
                  <span>{store.address}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className={styles.cta}>
          <GetAppButton links={links} label="Order now in the PIAX app" className="btn btn-primary btn-lg" />
        </div>
      </div>
    </section>
  );
};
