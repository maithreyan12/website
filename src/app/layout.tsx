import type { Metadata, Viewport } from 'next';
import './landing.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PIAX — Luxury Organic Period Care & Intelligent Cycle Companion',
  description:
    'Experience 100% certified organic, rash-free cotton sanitary pads with an intuitive period companion — cycle forecasting, pad change alerts, and private AI wellness support.',
  keywords: [
    'sanitary pads',
    'anion sanitary pads',
    'organic cotton pads',
    'rash free pads',
    'period tracking app',
    'piax period care',
  ],
  icons: {
    icon: '/static/favicon.svg',
    shortcut: '/static/favicon.svg',
    apple: '/static/favicon.svg',
  },
  openGraph: {
    title: 'PIAX — Luxury Organic Period Care & Intelligent Cycle Companion',
    description:
      'Experience 100% certified organic, rash-free cotton sanitary pads with an intuitive period companion — cycle forecasting, pad change alerts, and private AI wellness support.',
    url: 'https://piax.care',
    siteName: 'PIAX',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

