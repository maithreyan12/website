'use client';

import React, { useEffect, useState } from 'react';
import type { AppLinks } from '@/lib/api';

type Platform = 'ios' | 'android' | 'desktop';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac; touch support gives it away.
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

interface GetAppButtonProps {
  links: AppLinks;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Every "do this" action on the website ends here: ordering, subscribing, the
 * size finder, cycle tracking and the health assistants all happen in the app.
 * On a phone it opens the right store (which shows "Open" when PIAX is already
 * installed); on a computer it opens Google Play.
 */
export const GetAppButton: React.FC<GetAppButtonProps> = ({
  links,
  label = 'Get the PIAX app',
  className = 'btn btn-primary',
  style,
}) => {
  const [platform, setPlatform] = useState<Platform>('desktop');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  if (platform === 'ios' && !links.ios) {
    return (
      <span className={className} style={{ ...style, opacity: 0.7, cursor: 'default' }} aria-disabled="true">
        Coming soon on iPhone
      </span>
    );
  }

  const href = platform === 'ios' ? links.ios : links.android;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {label}
    </a>
  );
};
