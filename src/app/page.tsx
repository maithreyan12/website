import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { CycleVibeInteractive } from '@/components/CycleVibeInteractive';
import { ComfortSanctuarySection } from '@/components/ComfortSanctuarySection';
import { BoxConfigurator } from '@/components/BoxConfigurator';
import { PadAnatomySection } from '@/components/PadAnatomySection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SubscriptionSection } from '@/components/SubscriptionSection';
import { CycleCalculatorSection } from '@/components/CycleCalculatorSection';
import { AppShowcaseSection } from '@/components/AppShowcaseSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { fetchSite } from '@/lib/api';

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const site = await fetchSite();

  return (
    <>
      <HeroSection />
      <CycleVibeInteractive />
      <ComfortSanctuarySection />
      <BoxConfigurator />
      <PadAnatomySection />
      <ComparisonSection />
      <ProductCatalog initialProducts={site.products} />
      <SubscriptionSection initialPlans={site.plans} />
      <CycleCalculatorSection />
      <AppShowcaseSection />
      <ReviewsSection />
    </>
  );
}
