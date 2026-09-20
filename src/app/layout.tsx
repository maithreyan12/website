import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { AppPanel } from '@/components/AppPanel';
import { FlowQuizModal } from '@/components/FlowQuizModal';
import { Footer } from '@/components/Footer';
import { appLinks, bannerFor, fetchSite } from '@/lib/api';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PIAX — Luxury Organic Period Care & Customized Cycle Box',
  description:
    'Customized period care crafted for your unique flow. Build your own rash-free box with Double XL, Extra Long, and Large Anion pads. 100% organic cotton feel, 8-layer protection, tested to BIS IS 5405:2025.',
  keywords: [
    'sanitary pads',
    'anion sanitary pads',
    'custom period box',
    'organic cotton pads',
    'rash free pads',
    'period subscription India',
    'nua alternative',
    'piax period care',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'PIAX — Luxury Organic Period Care & Customized Cycle Box',
    description:
      'No two cycles are identical. Mix and match Heavy, Medium, and Light pads for zero rash, zero odor, and total peace of mind.',
    url: 'https://piax.care',
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
  // Same request as the page's, so Next serves both from one fetch.
  const site = await fetchSite();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <CartProvider products={site.products} config={site.config}>
          <AnnouncementBar
            banner={bannerFor(site, 'web_announcement')}
            fallbackHref={site.config.app_android_store_url}
          />
          <Navbar links={appLinks(site.config)} />
          <main>{children}</main>
          {/* Empathetic Nua-Style Flow & Size Consultation */}
          <FlowQuizModal />
          {/* Bag, checkout, size finder, plans: the PIAX app's own screens. */}
          <AppPanel />
          <Footer config={site.config} links={appLinks(site.config)} />
        </CartProvider>
      </body>
    </html>
  );
}
