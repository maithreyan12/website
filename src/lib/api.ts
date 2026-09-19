/**
 * PIAX Unified Web API Layer
 * Connects directly to FastAPI backend /web/site, /products, /subscriptions/plans, /orders.
 * Zero data drift: reads from the same database and admin panel as the Flutter app.
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number;
  size: string;
  rating: number;
  reviews_count: number;
  description: string;
  highlights: string[];
  is_exclusive: boolean;
  is_upcoming: boolean;
  banner_tag: string;
  image_url: string;
  gallery_urls?: string[];
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  price_formatted: string;
  price: number;
  billing_period: string;
  perks: string[];
  is_featured: boolean;
  is_active?: boolean;
}

export interface Banner {
  id: string;
  placement: 'web_announcement' | 'web_hero' | string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_label: string;
  deep_link: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  distance?: string;
  latitude: number;
  longitude: number;
  is_available_now: boolean;
}

export interface HealthBot {
  id: string;
  slug: string;
  name: string;
  role_description: string;
  description: string;
  theme_color: string;
  avatar_url: string;
}

export interface MythBuster {
  id: string;
  question: string;
  answer_is_true: boolean;
  explanation: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  author_name: string;
  author_title: string;
  category: string;
  published_date: string;
  likes?: number;
  shares?: number;
  comments?: number;
  content: string;
  has_audio?: boolean;
  audio_title?: string;
  cover_image_url?: string;
}

export interface SiteConfig {
  delivery_charge?: number;
  flat_discount?: number;
  emergency_eta_minutes?: number;
  support_email?: string;
  support_phone?: string;
  app_android_store_url?: string;
  app_ios_store_url?: string;
  [key: string]: unknown;
}

export interface SiteContent {
  config: SiteConfig;
  banners: Banner[];
  products: Product[];
  plans: SubscriptionPlan[];
  stores: StoreLocation[];
  bots: HealthBot[];
  myth_busters: MythBuster[];
  articles: BlogArticle[];
}

/** A line in the website bag: packs of one product, keyed by its size (e.g. "240 mm"). */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  imageUrl?: string;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://piax-5fqx.onrender.com';

export const DEFAULT_ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=in.co.piax';

export const PRIVACY_POLICY_URL = `${API_BASE_URL}/privacy`;

// High-fidelity fallback catalog matching seed data
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod_pad_large_240',
    name: 'PIAX Anion Sanitary Pad · Large',
    category: 'Sanitary Pads',
    price: 89.0,
    original_price: 89.0,
    size: '240 mm',
    rating: 4.8,
    reviews_count: 142,
    description:
      'Large (240 mm), pack of 6. For lighter days and the start and end of your period. 8-layer construction with negative-ion strip, soft cotton-feel top sheet and leak-lock channels. Perfume-free.',
    highlights: [
      '8-layer construction',
      'Anion-infused strip',
      'Soft cotton-feel top sheet',
      'Four-wing fit · leak-lock channels',
      'Perfume-free · breathable back sheet',
      'Tested to BIS IS 5405:2025 · ISO 11737-1:2018',
      'Made in India',
    ],
    is_exclusive: false,
    is_upcoming: false,
    banner_tag: '',
    image_url: '/images/home_product_pad.png',
  },
  {
    id: 'prod_pad_xl_290',
    name: 'PIAX Anion Sanitary Pad · Extra Long',
    category: 'Sanitary Pads',
    price: 99.0,
    original_price: 99.0,
    size: '290 mm',
    rating: 4.8,
    reviews_count: 198,
    description:
      'Extra Long (290 mm), pack of 6. For regular to heavier days. 8-layer construction with an anion-infused strip, soft cotton-feel top sheet and leak-lock channels. Perfume-free.',
    highlights: [
      '8-layer construction',
      'Anion-infused strip',
      'Soft cotton-feel top sheet',
      'Four-wing fit · leak-lock channels',
      'Perfume-free · breathable back sheet',
      'Tested to BIS IS 5405:2025 · ISO 11737-1:2018',
      'Made in India',
    ],
    is_exclusive: true,
    is_upcoming: false,
    banner_tag: 'BEST SELLER',
    image_url: '/images/home_savers_six.png',
  },
  {
    id: 'prod_pad_xxl_330',
    name: 'PIAX Anion Sanitary Pad · Double Extra Long',
    category: 'Sanitary Pads',
    price: 119.0,
    original_price: 119.0,
    size: '330 mm',
    rating: 4.8,
    reviews_count: 96,
    description:
      'Double Extra Long (330 mm), pack of 6. For heavy days and all-night worry-free sleep. 8-layer construction with an anion-infused strip, soft cotton-feel top sheet and leak-lock channels. Perfume-free.',
    highlights: [
      '8-layer construction',
      'Anion-infused strip',
      'Soft cotton-feel top sheet',
      'Four-wing fit · leak-lock channels',
      'Perfume-free · breathable back sheet',
      'Tested to BIS IS 5405:2025 · ISO 11737-1:2018',
      'Made in India',
    ],
    is_exclusive: false,
    is_upcoming: false,
    banner_tag: '',
    image_url: '/images/home_product_pad.png',
  },
];

export const FALLBACK_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_annual',
    title: 'Annual Subscription',
    price_formatted: '₹1,800 / year',
    price: 1800.0,
    billing_period: 'Billed yearly (Save over 50%)',
    perks: [
      'Automatic monthly doorstep delivery of customized pads',
      'Unlimited 24/7 AI Health Assistant consultations',
      'Free Emergency 15-min delivery credits',
      '1 Free Doctor Video Consultation per quarter',
      'Exclusive access to premium wellness masterclasses',
    ],
    is_featured: true,
    is_active: true,
  },
  {
    id: 'plan_half_yearly',
    title: 'Half-Yearly Plan',
    price_formatted: '₹999 / 6 months',
    price: 999.0,
    billing_period: 'Billed every 6 months',
    perks: [
      'Automatic monthly doorstep delivery',
      'Full AI Health Assistant access',
      'Discounted Doctor Consultations (20% off)',
      'Convenient and worry-free auto-pause',
    ],
    is_featured: false,
    is_active: true,
  },
];

export const FALLBACK_SITE: SiteContent = {
  config: {
    delivery_charge: 50,
    flat_discount: 50,
    emergency_eta_minutes: 15,
    support_email: '',
    support_phone: '',
    app_android_store_url: DEFAULT_ANDROID_STORE_URL,
    app_ios_store_url: '',
  },
  banners: [],
  products: FALLBACK_PRODUCTS,
  plans: FALLBACK_PLANS,
  stores: [
    {
      id: 'store_1',
      name: 'Apollo Pharmacy - T Nagar Hub',
      address: '360 Stillwater Rd, Palm & T Nagar Main Rd',
      distance: '0.6 km away',
      latitude: 13.0418,
      longitude: 80.2341,
      is_available_now: true,
    },
  ],
  bots: [],
  myth_busters: [
    {
      id: 'myth_1',
      question: 'Exercising during your period is harmful',
      answer_is_true: false,
      explanation: 'False! Light aerobic exercise releases endorphins that ease menstrual cramps.',
    },
  ],
  articles: [
    {
      id: 'art_1',
      title: 'Period Skincare: Sync with your Menstrual Cycle',
      author_name: 'Revathi',
      author_title: 'Skin Care Specialist',
      category: 'Skincare',
      published_date: 'October 14',
      content: 'During menstruation, estrogen drops. Focus on hydrating hyaluronic serums.',
      has_audio: false,
    },
  ],
};

/**
 * Fetch unified site content from backend /web/site
 * With graceful fallback to rich seed catalog so site never fails
 */
export async function fetchSite(): Promise<SiteContent> {
  try {
    const res = await fetch(`${API_BASE_URL}/web/site`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        return data as SiteContent;
      }
    }
  } catch (err) {
    console.warn('Backend /web/site unreachable, using fallback site content:', err);
  }
  return FALLBACK_SITE;
}

export async function fetchProducts(): Promise<Product[]> {
  const site = await fetchSite();
  return site.products.length > 0 ? site.products : FALLBACK_PRODUCTS;
}

export async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const site = await fetchSite();
  return site.plans.length > 0 ? site.plans : FALLBACK_PLANS;
}

export interface AppLinks {
  android: string;
  ios: string;
}

export function appLinks(config: SiteConfig | undefined): AppLinks {
  return {
    android: config?.app_android_store_url?.trim() || DEFAULT_ANDROID_STORE_URL,
    ios: config?.app_ios_store_url?.trim() || '',
  };
}

export function bannerFor(site: SiteContent | null, placement: string): Banner | undefined {
  return site?.banners.find((b) => b.placement === placement);
}

export function webHref(link: string, fallback: string): string {
  return /^https?:\/\//.test(link) ? link : fallback;
}

export function mediaUrl(url: string | undefined, fallback: string): string {
  if (!url) return fallback;
  return url.startsWith('/') ? `${API_BASE_URL}${url}` : url;
}

export function formatRupees(amount: number): string {
  return `₹${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}

/** Pad length in mm from a product's size text ("290 mm" → 290). */
export function sizeMm(product: Pick<Product, 'size'>): number {
  return parseInt(product.size, 10) || 0;
}

/** The in-stock product of a given length, if the catalog has one. */
export function productOfSize(products: Product[], mm: number): Product | undefined {
  return products.find((p) => sizeMm(p) === mm && !p.is_upcoming);
}

/** What the backend charges: subtotal − flat discount + delivery fee (admin → App settings). */
export function orderTotals(subtotal: number, config: SiteConfig) {
  const discount = subtotal > 0 ? Number(config.flat_discount ?? 0) : 0;
  const delivery = subtotal > 0 ? Number(config.delivery_charge ?? 0) : 0;
  return { subtotal, discount, delivery, total: Math.max(0, subtotal - discount + delivery) };
}
