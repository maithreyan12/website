'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { type AppEntry, appEntryUrl, appOrigin } from '@/lib/appBridge';
import styles from './AppPanel.module.css';

/**
 * Shows the PIAX app's own screens (bag, checkout, size finder, plans, tracker…)
 * over the website: a side drawer on computers, full screen on phones.
 *
 * The app loads once, on first use, and then stays in the page while closed,
 * so opening it again is instant and her bag, address and login carry over.
 */
export const AppPanel: React.FC = () => {
  const { appEntry, isAppOpen, closeApp, setItemCount, setSavedCycle } = useCart();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  // The entry baked into the iframe URL, and any requested before the app said it's ready.
  const loadedWith = useRef<AppEntry | null>(null);
  const pending = useRef<AppEntry | null>(null);

  const send = (entry: AppEntry) => {
    frameRef.current?.contentWindow?.postMessage(
      { type: 'piax:open', open: entry.open, ...entry.params },
      appOrigin(),
    );
  };

  // Route each new request to the app.
  useEffect(() => {
    if (!appEntry) return;
    if (!src) {
      loadedWith.current = appEntry;
      setSrc(appEntryUrl(appEntry));
    } else if (ready) {
      send(appEntry);
    } else if (appEntry !== loadedWith.current) {
      pending.current = appEntry;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appEntry]);

  // Messages from the app.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow || event.origin !== appOrigin()) return;
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'piax:ready') {
        setReady(true);
        if (pending.current) {
          send(pending.current);
          pending.current = null;
        }
      } else if (data.type === 'piax:cart' && typeof data.count === 'number') {
        setItemCount(data.count);
      } else if (
        data.type === 'piax:cycle' &&
        typeof data.last === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(data.last) &&
        typeof data.cycle === 'number' &&
        typeof data.period === 'number'
      ) {
        setSavedCycle({ last: data.last, cycle: data.cycle, period: data.period });
      } else if (data.type === 'piax:close') {
        // She used the app screen's own back arrow on its first page.
        closeApp();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc closes; the page behind doesn't scroll while the app is open.
  useEffect(() => {
    if (!isAppOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeApp();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isAppOpen, closeApp]);

  if (!src) return null;

  return (
    <div
      className={`${styles.overlay} ${isAppOpen ? styles.open : ''}`}
      onClick={closeApp}
      aria-hidden={!isAppOpen}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="PIAX"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Once the app is up, its own back arrow takes her back here, so this bar is only for loading. */}
        {!ready && (
          <div className={styles.topBar}>
            <button className={styles.closeBtn} onClick={closeApp} aria-label="Close and go back">
              ← Back
            </button>
            <span className={styles.brand}>
              <Image src="/images/logo_lotus.png" alt="" width={20} height={20} />
              PIAX
            </span>
            <span className={styles.spacer} />
          </div>
        )}

        <div className={styles.frameWrap}>
          {!ready && (
            <div className={styles.loader}>
              <Image src="/images/logo_lotus.png" alt="" width={56} height={56} className={styles.loaderLogo} />
              <span>Opening PIAX…</span>
            </div>
          )}
          <iframe
            ref={frameRef}
            src={src}
            title="PIAX"
            className={styles.frame}
            allow="payment; geolocation; clipboard-write"
          />
        </div>
      </div>
    </div>
  );
};
