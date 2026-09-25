
import type { Metadata, Viewport } from 'next';
import './landing.css';
import { CartProvider } from '@/context/CartContext';
import { AppPanel } from '@/components/AppPanel';
import { fetchSite } from '@/lib/api';

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
    url: 'https://piax.co.in',
    siteName: 'PIAX',
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await fetchSite();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <CartProvider products={site.products} config={site.config}>
          <main>{children}</main>
          <AppPanel />
        </CartProvider>
      </body>
    </html>
  );
}


