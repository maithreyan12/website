'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { productOfSize, Product, FALLBACK_PRODUCTS } from '@/lib/api';

// Pad specifications matching piax-5fqx.onrender.com
const PAD_DATA = [
  {
    title: 'Day Regular Flow Organic Pads',
    badge: 'MOST POPULAR FOR DAY CARE',
    length: '240mm Natural Airflow Length',
    desc: 'Feather-soft organic cotton topsheet that breathes effortlessly with your body. Micro-vented leak channels ensure zero dampness, zero chafing, and 8 hours of weightless protection.',
    absorbency: '80 ml',
    thickness: '1.8 mm',
    img: '/static/img/home_product_pad.png',
  },
  {
    title: 'Heavy Flow & Active Day Pads',
    badge: 'IDEAL FOR WORK & SPORTS',
    length: '290mm Extra-Wide Wing Coverage',
    desc: 'Engineered with Japanese SAP dual-core and wider butterfly wings to catch sudden surges during intense physical activity, work travel, and heavy flow days.',
    absorbency: '120 ml',
    thickness: '2.0 mm',
    img: '/static/img/home_savers_six.png',
  },
  {
    title: 'Overnight & Postpartum 360° Pads',
    badge: 'MAXIMUM ALL-NIGHT SECURITY',
    length: '320mm Extended 360° Fan-Tail',
    desc: 'Extended sleep contour design locks backflow even when tossing and turning. Wake up fresh and dry with zero fear of morning bedsheet stains.',
    absorbency: '160 ml',
    thickness: '2.2 mm',
    img: '/static/img/home_product_pad.png',
  },
];

const PHASES = [
  { title: 'Period', desc: '🪷 Phase: Period (Day 1-5) • PIAX suggests Night Heavy Flow Pad' },
  { title: 'Follicular', desc: '🌱 Phase: Follicular (Day 6-12) • High energy levels, no pads needed' },
  { title: 'Ovulation', desc: '✨ Phase: Ovulation (Day 13-16) • Peak fertility window & natural glow' },
  { title: 'Luteal', desc: '🌙 Phase: Luteal (Day 17-28) • Proactive pad change timer armed' },
];

const FAQS = [
  {
    q: 'What makes PIAX pads 100% rash-free?',
    a: 'Standard pads use artificial synthetic plastic top sheets that trap moisture against your intimate skin, creating friction and heat. PIAX uses only 100% certified organic cotton topsheets that breathe naturally, completely free from chlorine, dyes, and artificial perfumes.',
  },
  {
    q: 'Is the PIAX cycle tracking app free to use?',
    a: 'Yes! The PIAX Android app is free to download on Google Play. You can log periods, track symptoms, receive cycle forecasts, and set pad change timers without paying a subscription.',
  },
  {
    q: 'Is my personal menstrual data safe and private?',
    a: 'Absolutely. Your privacy is our highest priority. All personal cycle data is encrypted in transit and at rest. We never sell, rent, or share your health data with advertisers or data brokers.',
  },
  {
    q: 'How does doorstep delivery work?',
    a: 'Orders placed through the PIAX app are packed in 100% discreet, tamper-proof, eco-friendly packaging and delivered across India within 2 to 4 business days.',
  },
  {
    q: 'Can PIAX be used as birth control or contraception?',
    a: 'No. PIAX is an educational and wellness tracking tool. Cycle estimates must never be relied upon as a method of contraception or birth control. Always consult a qualified physician for medical decisions.',
  },
];

export default function LandingPageClient() {
  const { addToCart, openCart, openApp, itemCount, products } = useCart();
  const [addedToast, setAddedToast] = useState<{ name: string; size: string } | null>(null);

  const getProductForIndex = useCallback(
    (idx: number): Product => {
      const mm = idx === 0 ? 240 : idx === 1 ? 290 : 330;
      return (
        productOfSize(products, mm) ||
        FALLBACK_PRODUCTS[idx] ||
        FALLBACK_PRODUCTS[0]
      );
    },
    [products]
  );

  const handleAddToCart = (prod: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(prod, 1);
    setAddedToast({ name: prod.name, size: prod.size });
    setTimeout(() => {
      setAddedToast((current) => (current?.name === prod.name ? null : current));
    }, 4000);
  };

  const handleBuyNow = (prod: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(prod, 1);
  };

  // Mobile drawer state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // 1. Live Countdown Timer Simulation
  const [timerSec, setTimerSec] = useState(3 * 3600 + 44 * 60 + 12);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSec: number, suffix = false) => {
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return suffix ? `${h}:${m}:${s} remaining` : `${h}:${m}:${s}`;
  };

  const restartSimTimer = () => {
    setTimerSec(4 * 3600);
  };

  // 2. Cycle Phase Selector
  const [activePhase, setActivePhase] = useState(0);

  // 3. Hero 3D Card Mouse Parallax & Dynamic Light Glare
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroGlareRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const card = heroCardRef.current;
    const glare = heroGlareRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transition = 'transform 0.1s ease-out';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    if (glare) {
      glare.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(255,255,255,0.6), transparent 70%)`;
    }
  };

  const handleHeroMouseLeave = () => {
    const card = heroCardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // 4. 3D Smartphone Physics & Rotation Engine
  const [phoneMode, setPhoneMode] = useState<'orbit' | 'front' | 'tilt' | 'spin'>('orbit');
  const [activeAppTab, setActiveAppTab] = useState(0);
  const [phoneScreenOpacity, setPhoneScreenOpacity] = useState(1);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const phoneGlareRef = useRef<HTMLDivElement>(null);
  const phoneStageRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);

  const isPhoneDraggingRef = useRef(false);
  const startPhoneXRef = useRef(0);
  const startPhoneYRef = useRef(0);
  const currentRotXRef = useRef(4);
  const currentRotYRef = useRef(-8);

  const updatePhoneTransform = useCallback((rotX: number, rotY: number, animate = false) => {
    const wrapper = phoneWrapperRef.current;
    const glare = phoneGlareRef.current;
    if (!wrapper) return;

    if (animate) {
      wrapper.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      wrapper.style.transition = 'transform 0.08s ease-out';
    }
    wrapper.style.transform = `perspective(1400px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    if (glare) {
      const glareX = 50 + rotY * 2.2;
      const glareY = 40 + rotX * 2.2;
      glare.style.background = `radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(255,255,255,0.45), rgba(255,255,255,0.06) 50%, transparent 70%)`;
    }
  }, []);

  const setPhone3DView = (mode: 'orbit' | 'front' | 'tilt' | 'spin') => {
    setPhoneMode(mode);
    const wrapper = phoneWrapperRef.current;
    if (!wrapper) return;

    wrapper.classList.remove('phone-spin-360', 'phone-floating-levitate');

    if (mode === 'orbit') {
      wrapper.classList.add('phone-floating-levitate');
      currentRotXRef.current = 4;
      currentRotYRef.current = -8;
      wrapper.style.transform = '';
    } else if (mode === 'front') {
      currentRotXRef.current = 0;
      currentRotYRef.current = 0;
      updatePhoneTransform(0, 0, true);
    } else if (mode === 'tilt') {
      currentRotXRef.current = 8;
      currentRotYRef.current = -18;
      updatePhoneTransform(8, -18, true);
    } else if (mode === 'spin') {
      wrapper.classList.add('phone-spin-360');
    }
  };

  const handlePhoneStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phoneMode === 'spin') return;
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const stage = phoneStageRef.current;
    const wrapper = phoneWrapperRef.current;
    if (!stage || !wrapper) return;

    wrapper.classList.remove('phone-floating-levitate');
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotY = ((x - centerX) / centerX) * 20;
    const rotX = ((y - centerY) / centerY) * -16;
    currentRotXRef.current = rotX;
    currentRotYRef.current = rotY;
    updatePhoneTransform(rotX, rotY, false);
  };

  const handlePhoneStageMouseLeave = () => {
    const wrapper = phoneWrapperRef.current;
    if (!wrapper) return;
    if (phoneMode === 'orbit') {
      wrapper.classList.add('phone-floating-levitate');
      wrapper.style.transform = '';
    } else if (phoneMode === 'front') {
      updatePhoneTransform(0, 0, true);
    } else if (phoneMode === 'tilt') {
      updatePhoneTransform(8, -18, true);
    }
  };

  // Mobile Touch Rotation
  const handlePhoneTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (phoneMode === 'spin') return;
    isPhoneDraggingRef.current = true;
    const wrapper = phoneWrapperRef.current;
    if (wrapper) wrapper.classList.remove('phone-floating-levitate');
    startPhoneXRef.current = e.touches[0].clientX;
    startPhoneYRef.current = e.touches[0].clientY;
  };

  const handlePhoneTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPhoneDraggingRef.current || phoneMode === 'spin') return;
    const deltaX = e.touches[0].clientX - startPhoneXRef.current;
    const deltaY = e.touches[0].clientY - startPhoneYRef.current;
    const rotY = Math.max(-35, Math.min(35, currentRotYRef.current + deltaX * 0.35));
    const rotX = Math.max(-25, Math.min(25, currentRotXRef.current - deltaY * 0.35));
    updatePhoneTransform(rotX, rotY, false);
  };

  const handlePhoneTouchEnd = () => {
    isPhoneDraggingRef.current = false;
    if (phoneMode === 'orbit') {
      setTimeout(() => {
        if (!isPhoneDraggingRef.current && phoneMode === 'orbit') {
          const wrapper = phoneWrapperRef.current;
          if (wrapper) {
            wrapper.classList.add('phone-floating-levitate');
            wrapper.style.transform = '';
          }
        }
      }, 1200);
    }
  };

  const handleAppTabClick = (idx: number) => {
    setActiveAppTab(idx);
    setPhoneScreenOpacity(0.35);
    setTimeout(() => {
      setPhoneScreenOpacity(1);
    }, 140);
  };

  // 5. Organic Pads Flow Selector
  const [activePadFlow, setActivePadFlow] = useState(0);
  const [padCardOpacity, setPadCardOpacity] = useState(1);
  const flowBarRef = useRef<HTMLDivElement>(null);
  const flowBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [flowIndicatorStyle, setFlowIndicatorStyle] = useState({ transform: 'translateX(0px)', width: '0px' });

  const updateFlowIndicator = useCallback((index: number) => {
    const btn = flowBtnRefs.current[index];
    const bar = flowBarRef.current;
    if (btn && bar) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setFlowIndicatorStyle({
        transform: `translateX(${btnRect.left - barRect.left - 5}px)`,
        width: `${btnRect.width}px`,
      });
    }
  }, []);

  const handleSelectPadFlow = (idx: number) => {
    setActivePadFlow(idx);
    updateFlowIndicator(idx);
    setPadCardOpacity(0.35);
    setTimeout(() => {
      setPadCardOpacity(1);
    }, 140);
  };

  useEffect(() => {
    updateFlowIndicator(0);
    const handleResize = () => updateFlowIndicator(activePadFlow);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activePadFlow, updateFlowIndicator]);

  // 6. iPhone Liquid Nav Pill Gliding Tracker & ScrollSpy
  const navMenuRef = useRef<HTMLUListElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeNavIdx, setActiveNavIdx] = useState<number | null>(null);
  const [navPillStyle, setNavPillStyle] = useState({ transform: 'translateX(0px)', width: '0px', opacity: 0 });

  const moveNavPill = useCallback((targetEl: HTMLElement | null, animate = true) => {
    const menu = navMenuRef.current;
    if (!menu || !targetEl) return;
    const menuRect = menu.getBoundingClientRect();
    const linkRect = targetEl.getBoundingClientRect();
    const left = linkRect.left - menuRect.left;
    const width = linkRect.width;

    setNavPillStyle({
      transform: `translateX(${left}px)`,
      width: `${width}px`,
      opacity: 1,
    });
  }, []);

  const handleNavMouseEnter = (linkEl: HTMLElement) => {
    moveNavPill(linkEl, true);
  };

  const handleNavMouseLeave = () => {
    if (activeNavIdx !== null && navLinksRef.current[activeNavIdx]) {
      moveNavPill(navLinksRef.current[activeNavIdx], true);
    } else {
      setNavPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNavIdx(idx);
        moveNavPill(e.currentTarget, true);
      }
    }
  };

  // IntersectionObserver for tracking sections
  useEffect(() => {
    const sectionIds = ['how-it-works', 'app-preview', 'pads', 'anatomy', 'comparison', 'faq'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = sectionIds.indexOf(id);
            if (idx !== -1) {
              setActiveNavIdx(idx);
              const matchingLink = navLinksRef.current[idx];
              if (matchingLink) {
                moveNavPill(matchingLink, true);
              }
            }
          }
        });
      },
      { rootMargin: '-20% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [moveNavPill]);

  // Scroll reveal IntersectionObserver for smooth Apple-style section reveals
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  // 7. FAQ Accordion
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  // Mobile Drawer toggle
  const toggleMobileNav = () => {
    const nextState = !mobileNavOpen;
    setMobileNavOpen(nextState);
    if (nextState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    document.body.style.overflow = '';
  };

  const currentPad = PAD_DATA[activePadFlow];
  const currentProduct = getProductForIndex(activePadFlow);

  return (
    <>
      {/* Ambient Light Orbs */}
      <div className="ambient-canvas">
        <div className="glow-sphere glow-1"></div>
        <div className="glow-sphere glow-2"></div>
        <div className="glow-sphere glow-3"></div>
      </div>

      {/* Sticky Glass Navigation - Apple Liquid Capsule */}
      <div className="container header-wrapper">
        <nav className="nav-glass">
          <a href="/" className="brand-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/static/img/logo_lotus.png"
              alt="PIAX Logo"
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.src = '/static/img/logo_piax_teal.png';
              }}
            />
            <span className="brand-name">PIAX</span>
            <span className="brand-pill">CARE</span>
          </a>

          <ul className="nav-menu" id="navMenu" ref={navMenuRef} onMouseLeave={handleNavMouseLeave}>
            <div
              className="nav-liquid-pill"
              id="navLiquidPill"
              style={{
                transform: navPillStyle.transform,
                width: navPillStyle.width,
                opacity: navPillStyle.opacity,
              }}
            ></div>
            {[
              { href: '#how-it-works', label: 'How It Works' },
              { href: '#app-preview', label: 'App Preview' },
              { href: '#pads', label: 'Organic Pads' },
              { href: '#shop', label: 'Shop Packs' },
              { href: '#anatomy', label: 'Pad Anatomy' },
              { href: '#comparison', label: 'Compare' },
              { href: '#faq', label: 'FAQ' },
            ].map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  ref={(el) => {
                    navLinksRef.current[idx] = el;
                  }}
                  className={`nav-link ${activeNavIdx === idx ? 'active' : ''}`}
                  onMouseEnter={(e) => handleNavMouseEnter(e.currentTarget)}
                  onClick={(e) => handleNavLinkClick(e, item.href, idx)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions-wrap">
            {/* View Bag / In-App Cart Button */}
            <button
              type="button"
              className="nav-cart-btn"
              onClick={() => openCart()}
              aria-label={`View Shopping Bag (${itemCount} items)`}
              title="Open Shopping Bag"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && <span className="nav-cart-badge">{itemCount}</span>}
            </button>

            <a
              href="https://play.google.com/store/apps/details?id=in.co.piax"
              className="liquid-btn nav-desktop-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.624.226-1.206.609-1.636z" />
              </svg>
              <span>Get App</span>
              <div className="liquid-glimmer"></div>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              id="mobileMenuBtn"
              onClick={toggleMobileNav}
              aria-label="Open Navigation Menu"
            >
              <span className="bar-line line-1"></span>
              <span className="bar-line line-2"></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Liquid Glass Navigation Drawer Modal */}
      <div
        className={`mobile-drawer-overlay ${mobileNavOpen ? 'active' : ''}`}
        id="mobileDrawerOverlay"
        onClick={closeMobileNav}
      ></div>
      <div className={`mobile-drawer-panel ${mobileNavOpen ? 'active' : ''}`} id="mobileDrawerPanel">
        <div className="mobile-drawer-header">
          <div className="brand-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/static/img/logo_lotus.png"
              alt="PIAX Logo"
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.src = '/static/img/logo_piax_teal.png';
              }}
            />
            <span className="brand-name">PIAX</span>
            <span className="brand-pill">CARE</span>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={closeMobileNav}
            aria-label="Close navigation"
          >
            &times;
          </button>
        </div>

        <div className="mobile-drawer-links">
          <a href="#how-it-works" className="m-word-link" onClick={closeMobileNav}>
            How It Works
          </a>
          <a href="#app-preview" className="m-word-link" onClick={closeMobileNav}>
            App Preview
          </a>
          <a href="#pads" className="m-word-link" onClick={closeMobileNav}>
            Organic Pads
          </a>
          <a href="#shop" className="m-word-link" onClick={closeMobileNav}>
            Shop Packs
          </a>
          <a href="#anatomy" className="m-word-link" onClick={closeMobileNav}>
            Pad Anatomy
          </a>
          <a href="#comparison" className="m-word-link" onClick={closeMobileNav}>
            Compare
          </a>
          <a href="#faq" className="m-word-link" onClick={closeMobileNav}>
            FAQ
          </a>
        </div>

        <div className="mobile-drawer-cta">
          <button
            type="button"
            className="m-cart-btn"
            onClick={() => {
              closeMobileNav();
              openCart();
            }}
          >
            <span>🛍️ Shopping Bag</span>
            <span className="brand-pill">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          </button>

          <a
            href="https://play.google.com/store/apps/details?id=in.co.piax"
            className="liquid-btn m-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.624.226-1.206.609-1.636z" />
            </svg>
            <span>Get PIAX on Google Play</span>
            <div className="liquid-glimmer"></div>
          </a>
          <div className="m-drawer-footer">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '8px', fontSize: '12px' }}>
              <a href="/privacy" className="m-privacy-link">Privacy</a> &bull;
              <a href="/terms" className="m-privacy-link">Terms</a> &bull;
              <a href="/refund" className="m-privacy-link">Refunds</a> &bull;
              <a href="/shipping" className="m-privacy-link">Shipping</a> &bull;
              <a href="/contact" className="m-privacy-link">Contact</a>
            </div>
            <span>&copy; {new Date().getFullYear()} PIAX Wellness Private Limited</span>
          </div>
        </div>
      </div>

      {/* Hero Section with 3D Mouse Parallax Stage */}
      <section className="container hero-wrap reveal-on-scroll">
        <div className="hero-grid">
          <div className="hero-text-col">
            <div className="tag-badge">
              <span className="tag-pulse"></span>
              100% Certified Organic • Rash-Free Guarantee
            </div>

            <h1 className="hero-h1">
              <span className="hero-title-line">The New Era</span>
              <span className="hero-title-line">of Period Care</span>
              <span className="hero-title-line">
                &amp; <span className="gradient-text">Cycle Intelligence.</span>
              </span>
            </h1>

            <p className="hero-lead">
              Silky-soft, chemical-free organic cotton pads paired with an intuitive cycle companion. Log symptoms,
              track predictions, set pad-change timers, and order rash-free pads to your door.
            </p>

            <div className="hero-cta-group">
              <a
                href="https://play.google.com/store/apps/details?id=in.co.piax"
                className="btn-play"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.624.226-1.206.609-1.636z"
                    fill="#00E676"
                  />
                  <path
                    d="M17.218 8.575L13.793 12l3.425 3.425 3.86-2.228c1.098-.635 1.098-1.759 0-2.394l-3.86-2.228z"
                    fill="#FFD600"
                  />
                  <path
                    d="M13.793 12L3.609 1.814a2.27 2.27 0 0 1 1.706-.329l11.903 6.873-3.425 3.642z"
                    fill="#00B0FF"
                  />
                  <path
                    d="M13.793 12l3.425 3.425-11.903 6.873c-.567.327-1.19.423-1.706.329L13.793 12z"
                    fill="#FF3D00"
                  />
                </svg>
                <div className="play-text-col">
                  <small>FREE ON ANDROID</small>
                  <strong>Get it on Google Play</strong>
                </div>
              </a>

              <a href="#how-it-works" className="btn-glass-secondary">
                How PIAX Works ↓
              </a>
            </div>

            <div className="hero-proof">
              <div className="avatar-stack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/img/avatar_kaavya.png"
                  alt="User"
                  onError={(e) => {
                    e.currentTarget.src = '/static/favicon.svg';
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/img/avatar_kaavya.png"
                  alt="User"
                  style={{ filter: 'hue-rotate(40deg)' }}
                  onError={(e) => {
                    e.currentTarget.src = '/static/favicon.svg';
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/img/avatar_kaavya.png"
                  alt="User"
                  style={{ filter: 'hue-rotate(80deg)' }}
                  onError={(e) => {
                    e.currentTarget.src = '/static/favicon.svg';
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/img/avatar_kaavya.png"
                  alt="User"
                  style={{ filter: 'hue-rotate(120deg)' }}
                  onError={(e) => {
                    e.currentTarget.src = '/static/favicon.svg';
                  }}
                />
              </div>
              <div className="proof-copy">
                <div className="proof-stars">★★★★★</div>
                <strong>Rated 4.9/5</strong> by 10,000+ women in India
              </div>
            </div>
          </div>

          {/* Hero 3D Interactive Stage */}
          <div className="hero-3d-wrapper" id="hero3dWrapper">
            <div
              className="hero-visual-card"
              id="heroVisualCard"
              ref={heroCardRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
            >
              <div className="hero-glare" id="heroGlare" ref={heroGlareRef}></div>

              <div className="hero-pill-badge pos-top-left">
                <span className="pill-icon">🌸</span>
                <div>
                  <div className="pill-label-title">0% Toxins &amp; Chlorine</div>
                  <div className="pill-label-sub">Hypoallergenic Certified</div>
                </div>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/static/img/home_product_pad.png"
                alt="PIAX Organic Sanitary Pads Package"
                className="hero-product-image"
                id="heroProductImg"
              />

              <div className="hero-pill-badge pos-bottom-right">
                <span className="pill-icon">⏰</span>
                <div>
                  <div className="pill-label-title">4h Hygiene Timer</div>
                  <div className="pill-label-sub timer-pill-sub" id="liveTimerCountdown">
                    {formatCountdown(timerSec, true)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metric / Trust Highlights */}
      <div className="container">
        <div className="metric-bar reveal-on-scroll">
          <div className="metric-col">
            <div className="metric-number">100%</div>
            <div className="metric-title">Organic Cotton</div>
            <div className="metric-sub">Certified breathable topsheet</div>
          </div>
          <div className="metric-col">
            <div className="metric-number">0%</div>
            <div className="metric-title">Harmful Chemicals</div>
            <div className="metric-sub">No chlorine, dyes, or perfumes</div>
          </div>
          <div className="metric-col">
            <div className="metric-number">3x</div>
            <div className="metric-title">Greater Absorption</div>
            <div className="metric-sub">Up to 120ml lock capacity</div>
          </div>
          <div className="metric-col">
            <div className="metric-number">4.9★</div>
            <div className="metric-title">Customer Rating</div>
            <div className="metric-sub">Loved by sensitive skin</div>
          </div>
          <div className="metric-col">
            <div className="metric-number">100%</div>
            <div className="metric-title">Private &amp; Secure</div>
            <div className="metric-sub">Encrypted, zero data sales</div>
          </div>
        </div>
      </div>

      {/* HOW PIAX WORKS SECTION */}
      <section id="how-it-works" className="container how-it-works-section reveal-on-scroll">
        <div className="sec-header">
          <div className="sec-eyebrow">THE 3-STEP WELLNESS PROTOCOL</div>
          <h2 className="sec-title">How PIAX Reinvents Your Period Experience</h2>
          <p className="sec-sub">
            No guesswork, no chemical rashes, no running out of pads. Here is how our app and organic pads work
            together.
          </p>
        </div>

        <div className="how-steps-grid">
          {/* Step 1 */}
          <div className="step-3d-card">
            <div className="step-number-tag">01</div>
            <div className="step-icon-bubble">🪷</div>
            <h3>1. Track &amp; Forecast Rhythms</h3>
            <p>
              Log your cycle dates, PMS symptoms, moods, and flow. PIAX analyzes patterns to predict your next cycle with
              zero confusion.
            </p>

            <div className="cycle-phase-selector">
              {PHASES.map((p, idx) => (
                <button
                  key={p.title}
                  className={`phase-tab-btn ${activePhase === idx ? 'active' : ''}`}
                  onClick={() => setActivePhase(idx)}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <div className="phase-result-box" id="phaseResultBox">
              {PHASES[activePhase].desc}
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-3d-card">
            <div className="step-number-tag">02</div>
            <div className="step-icon-bubble">⏰</div>
            <h3>2. 4-Hour Rash Defense</h3>
            <p>
              Medical experts confirm: wearing pads past 5 hours breeds bacteria and causes rashes. PIAX reminds you
              gently when it&apos;s time for a fresh pad.
            </p>

            <div className="timer-sim-box">
              <div>
                <div style={{ fontSize: '10.5px', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  HYGIENE TIMER
                </div>
                <div className="timer-sim-digits" id="simTimerDigits">
                  {formatCountdown(timerSec, false)}
                </div>
              </div>
              <button className="btn-sim-restart" onClick={restartSimTimer}>
                Reset Timer
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-3d-card">
            <div className="step-number-tag">03</div>
            <div className="step-icon-bubble">📦</div>
            <h3>3. Cycle-Synced Delivery</h3>
            <p>
              Order rash-free organic cotton pads delivered to your doorstep in discreet packaging before your cycle
              starts. Never face an emergency again.
            </p>

            <div className="delivery-pill-box">
              <span>🛵</span>
              <div>
                <div>Discreet Home Delivery</div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Delivers across India in 2-3 days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D SMARTPHONE APP EXPERIENCE */}
      <section id="app-preview" className="container phone-showcase-section reveal-on-scroll">
        <div className="phone-experience-grid">
          <div
            className="phone-perspective-stage"
            id="phoneStage"
            ref={phoneStageRef}
            onMouseMove={handlePhoneStageMouseMove}
            onMouseLeave={handlePhoneStageMouseLeave}
          >
            {/* 3D Phone Shell Container */}
            <div
              className={`phone-3d-wrapper ${phoneMode === 'orbit' ? 'phone-floating-levitate' : ''} ${
                phoneMode === 'spin' ? 'phone-spin-360' : ''
              }`}
              id="phone3dWrapper"
              ref={phoneWrapperRef}
            >
              {/* Ambient Studio Floor Glow */}
              <div className="phone-floor-glow" id="phoneFloorGlow"></div>

              {/* Physical Phone Chassis with Side Hardware Buttons */}
              <div
                className="phone-frame-3d"
                id="phoneFrame3d"
                ref={phoneFrameRef}
                onTouchStart={handlePhoneTouchStart}
                onTouchMove={handlePhoneTouchMove}
                onTouchEnd={handlePhoneTouchEnd}
              >
                {/* Hardware Buttons */}
                <div className="btn-hw btn-hw-action"></div>
                <div className="btn-hw btn-hw-vol-up"></div>
                <div className="btn-hw btn-hw-vol-down"></div>
                <div className="btn-hw btn-hw-power"></div>

                {/* Dynamic Island Cutout */}
                <div className="phone-island"></div>

                {/* Screen Area with Glass Glare Reflection */}
                <div className="phone-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/static/img/app_screen_care.png"
                    alt="PIAX Care & Wellness Screen"
                    className="screen-img"
                    id="phoneScreenImg"
                    style={{
                      opacity: phoneScreenOpacity,
                      transition: 'opacity 0.14s ease',
                    }}
                  />
                  <div className="phone-screen-glare" id="phoneScreenGlare" ref={phoneGlareRef}></div>
                </div>
              </div>
            </div>

            {/* 3D Interactive View Mode Toolbar */}
            <div className="phone-3d-toolbar">
              <button
                type="button"
                className={`btn-3d-view ${phoneMode === 'orbit' ? 'active' : ''}`}
                onClick={() => setPhone3DView('orbit')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 1 9 9" />
                  <path d="M12 7a5 5 0 0 1 5 5" />
                </svg>
                <span>3D Float</span>
              </button>
              <button
                type="button"
                className={`btn-3d-view ${phoneMode === 'front' ? 'active' : ''}`}
                onClick={() => setPhone3DView('front')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                </svg>
                <span>Front View</span>
              </button>
              <button
                type="button"
                className={`btn-3d-view ${phoneMode === 'tilt' ? 'active' : ''}`}
                onClick={() => setPhone3DView('tilt')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 3l10 4-4 14-10-4z" />
                </svg>
                <span>3D Angle</span>
              </button>
              <button
                type="button"
                className={`btn-3d-view ${phoneMode === 'spin' ? 'active' : ''}`}
                onClick={() => setPhone3DView('spin')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l6.73-5.19" />
                </svg>
                <span>360° Spin</span>
              </button>
            </div>
            <div className="phone-3d-hint">✨ Move cursor or swipe on phone to rotate in 3D</div>
          </div>

          <div>
            <div className="sec-eyebrow">LIVE APP SHOWCASE</div>
            <h2 className="sec-title dashboard-sec-title">The PIAX Care &amp; Wellness Dashboard</h2>
            <p className="sec-sub" style={{ marginBottom: '28px' }}>
              Designed for elegance, dignity, and real medical hygiene. Here is what you experience every time you open
              PIAX:
            </p>

            <div className="app-feature-list">
              <div
                className={`app-feature-item ${activeAppTab === 0 ? 'active' : ''}`}
                onClick={() => handleAppTabClick(0)}
              >
                <div className="app-feature-icon">🪷</div>
                <div className="app-feature-text">
                  <h4>Intelligent Menstrual Cycle Ring</h4>
                  <p>
                    Visual daily indicator: Period Day 1, next period countdown, natural cycle phase forecasts, and
                    personalized daily rest guidance.
                  </p>
                </div>
              </div>

              <div
                className={`app-feature-item ${activeAppTab === 1 ? 'active' : ''}`}
                onClick={() => handleAppTabClick(1)}
              >
                <div className="app-feature-icon">⏰</div>
                <div className="app-feature-text">
                  <h4>Pad Change Alert Tracker</h4>
                  <p>
                    Direct pad count (Pad 1, Pad 2, Pad 3) and custom hygiene interval reminders (every 4-6 hours) to
                    eliminate rashes and bacteria.
                  </p>
                </div>
              </div>

              <div
                className={`app-feature-item ${activeAppTab === 2 ? 'active' : ''}`}
                onClick={() => handleAppTabClick(2)}
              >
                <div className="app-feature-icon">🛍️</div>
                <div className="app-feature-text">
                  <h4>Instant One-Tap Quick Order</h4>
                  <p>
                    Order certified rash-free organic cotton pads straight from your dashboard with discreet 2-3 day
                    doorstep delivery across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Pads Showcase Section - iPhone Liquid Glass Design */}
      <section id="pads" className="container organic-pads-section reveal-on-scroll">
        <div className="sec-header">
          <div className="sec-eyebrow">100% GOTS ORGANIC COTTON &bull; RASH-FREE DEFENSE</div>
          <h2 className="sec-title">PIAX Pure Organic Sanitary Pads</h2>
          <p className="sec-sub">
            Engineered without synthetic plastics, perfumes, or chlorine bleach. Soft as a cloud, breathable, and
            designed to keep your skin irritation-free all cycle long.
          </p>
        </div>

        <div className="pads-flow-selector-wrap">
          <div className="pads-flow-pill-bar" id="flowPillBar" ref={flowBarRef}>
            <div
              className="flow-liquid-indicator"
              id="flowLiquidIndicator"
              style={{
                transform: flowIndicatorStyle.transform,
                width: flowIndicatorStyle.width,
              }}
            ></div>
            {[
              { title: '🌿 Regular Flow (L)', sub: 'Day / Moderate Flow • 240mm' },
              { title: '⚡ Heavy Flow (XL)', sub: 'Work & Active Days • 290mm' },
              { title: '🌙 Overnight / Postpartum (XXL)', sub: 'All-Night 360° Defense • 320mm' },
            ].map((tab, idx) => (
              <button
                key={tab.title}
                type="button"
                ref={(el) => {
                  flowBtnRefs.current[idx] = el;
                }}
                className={`flow-tab-btn ${activePadFlow === idx ? 'active' : ''}`}
                onClick={() => handleSelectPadFlow(idx)}
              >
                <span>{tab.title}</span>
                <small>{tab.sub}</small>
              </button>
            ))}
          </div>
        </div>

        <div
          className="pads-showcase-glass-card"
          id="padCardDisplay"
          style={{
            opacity: padCardOpacity,
            transform: padCardOpacity === 1 ? 'scale(1)' : 'scale(0.99)',
            transition: 'opacity 0.14s ease, transform 0.14s ease',
          }}
        >
          <div className="pads-card-visual">
            <div className="pad-pack-badge" id="padBadge">
              {currentPad.badge}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPad.img}
              alt="PIAX Organic Sanitary Pads"
              className="pad-featured-img"
              id="padDisplayImg"
            />
            <div className="pad-guarantee-pill">
              <span>🛡️ 100% Rash-Free Skin Guarantee</span>
            </div>
          </div>

          <div className="pads-card-content">
            <div className="pad-spec-length" id="padLength">
              {currentPad.length}
            </div>
            <h3 className="pad-spec-title" id="padTitle">
              {currentPad.title}
            </h3>
            <p className="pad-spec-desc" id="padDesc">
              {currentPad.desc}
            </p>

            <div className="pad-spec-metrics">
              <div className="pad-metric-box">
                <div className="metric-val" id="padAbsorbency">
                  {currentPad.absorbency}
                </div>
                <div className="metric-lbl">Absorbency Lock</div>
              </div>
              <div className="pad-metric-box">
                <div className="metric-val" id="padThickness">
                  {currentPad.thickness}
                </div>
                <div className="metric-lbl">Ultra-Thin Profile</div>
              </div>
              <div className="pad-metric-box">
                <div className="metric-val">0%</div>
                <div className="metric-lbl">Plastic &amp; Chlorine</div>
              </div>
            </div>

            <ul className="pad-benefit-bullets">
              <li>
                ✓ <strong>GOTS-Certified 100% Organic Cotton</strong> topsheet
              </li>
              <li>
                ✓ <strong>Natural Anion Anti-Odor Core</strong> inhibits bacteria &amp; smell
              </li>
              <li>
                ✓ <strong>Micro-porous breathable backsheet</strong> eliminates sweating &amp; heat
              </li>
              <li>
                ✓ <strong>Individually sealed in biodegradable film</strong> with easy disposal tab
              </li>
            </ul>

            <div className="pad-order-row">
              <div className="pad-pricing-box">
                <div className="pad-price-tag">
                  <span className="pad-price-curr">₹{currentProduct.price}</span>
                  <span className="pad-price-orig">₹{currentProduct.original_price + 30}</span>
                  <span className="pad-price-badge">PACK OF 6</span>
                </div>
                <span className="pack-subtext">Free discreet doorstep delivery before every cycle</span>
              </div>
              <div className="pad-order-actions">
                <button
                  type="button"
                  className="btn-add-bag"
                  onClick={(e) => handleAddToCart(currentProduct, e)}
                  title="Add to Bag"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  className="liquid-btn"
                  onClick={(e) => handleBuyNow(currentProduct, e)}
                >
                  <span>Buy in PIAX App</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <div className="liquid-glimmer"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Liquid Glass Features */}
        <div className="pads-three-grid">
          <div className="pad-glass-feature">
            <div className="feature-glass-icon">🌸</div>
            <h4>Cloud-Soft Cotton Comfort</h4>
            <p>
              Pure organic cotton touches your skin with gentle tenderness. Zero artificial fragrance, zero dioxins,
              zero synthetic plastics.
            </p>
          </div>
          <div className="pad-glass-feature">
            <div className="feature-glass-icon">🛡️</div>
            <h4>Clinically Proven Rash-Free</h4>
            <p>
              Continuous airflow design eliminates moisture accumulation and chafing even in hot tropical weather and
              active workouts.
            </p>
          </div>
          <div className="pad-glass-feature">
            <div className="feature-glass-icon">🛵</div>
            <h4>Cycle-Synced Delivery</h4>
            <p>
              Your period cycle countdown automatically pairs with doorstep delivery. Fresh organic pads arrive 2-3 days
              before you need them.
            </p>
          </div>
        </div>

        {/* All Products Shelf - Direct Central Catalog */}
        <div className="products-shelf-wrap reveal-on-scroll" id="shop">
          <div className="shelf-header">
            <div className="shelf-eyebrow">🛍️ LIVE CENTRAL CATALOG</div>
            <h3 className="shelf-title">Order Individual Packs for Any Flow</h3>
            <p className="shelf-sub">
              Stock up on your exact preferred size. 6 individually sealed pads per pack with biodegradable discreet wrappers, synchronized live with our central warehouse catalog.
            </p>
          </div>

          <div className="shelf-grid">
            {[0, 1, 2].map((idx) => {
              const prod = getProductForIndex(idx);
              const isBestSeller = idx === 1;
              return (
                <div key={prod.id || idx} className="shelf-card">
                  {isBestSeller && <div className="shelf-badge">★ Best Seller</div>}
                  <div className="shelf-img-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PAD_DATA[idx]?.img || '/static/img/home_product_pad.png'}
                      alt={prod.name}
                      className="shelf-img"
                    />
                    <span className="shelf-size-pill">{prod.size}</span>
                  </div>

                  <div className="shelf-rating">
                    <span>★ {prod.rating || 4.8}</span>
                    <span className="shelf-review-count">({prod.reviews_count || 140}+ reviews)</span>
                  </div>

                  <h4 className="shelf-product-title">{prod.name}</h4>
                  <p className="shelf-product-desc">{prod.description}</p>

                  <div className="shelf-footer">
                    <div className="shelf-price-col">
                      <span className="shelf-price">₹{prod.price}</span>
                      <span className="shelf-pack-lbl">Pack of 6 pads</span>
                    </div>

                    <div className="shelf-actions">
                      <button
                        type="button"
                        className="shelf-add-btn"
                        title="Add to Bag"
                        aria-label={`Add ${prod.name} to Bag`}
                        onClick={(e) => handleAddToCart(prod, e)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="shelf-buy-btn"
                        onClick={(e) => handleBuyNow(prod, e)}
                      >
                        <span>Buy Now</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pad Anatomy Section */}
      <section id="anatomy" className="container anatomy-section reveal-on-scroll">
        <div className="sec-header">
          <div className="sec-eyebrow">UNCOMPROMISING QUALITY</div>
          <h2 className="sec-title">Engineered Layer-by-Layer for Ultimate Skin Comfort</h2>
          <p className="sec-sub">
            Most sanitary pads use synthetic plastics that trap heat and create friction. PIAX is crafted with
            breathable bio-materials that respect your skin.
          </p>
        </div>

        <div className="anatomy-card">
          <div className="layer-list">
            <div className="layer-item">
              <div className="layer-num">1</div>
              <div className="layer-info">
                <h4>100% GOTS-Certified Organic Cotton</h4>
                <p>
                  Feather-soft, hypoallergenic topsheet allows natural airflow to prevent rashes, heat buildup, and
                  itching.
                </p>
              </div>
            </div>

            <div className="layer-item">
              <div className="layer-num">2</div>
              <div className="layer-info">
                <h4>Natural Anion Anti-Odor Core</h4>
                <p>
                  Inhibits bacterial growth and neutralizes menstrual odor naturally without toxic synthetic fragrances.
                </p>
              </div>
            </div>

            <div className="layer-item">
              <div className="layer-num">3</div>
              <div className="layer-info">
                <h4>Ultra-Thin Japanese SAP Polymer</h4>
                <p>Locks up to 120ml in seconds. Only 2mm thin so you feel virtually weightless freedom all day.</p>
              </div>
            </div>

            <div className="layer-item">
              <div className="layer-num">4</div>
              <div className="layer-info">
                <h4>360° Leak-Lock Airflow Base</h4>
                <p>
                  Micro-porous backsheet lets moisture vapor escape while creating an impervious barrier against leaks.
                </p>
              </div>
            </div>
          </div>

          <div className="anatomy-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/static/img/home_savers_six.png" alt="PIAX Pad Packs" />
            <div style={{ marginTop: '18px', fontSize: '13.5px', fontWeight: 600, color: 'var(--primary-mid)' }}>
              🌿 Dermatologically Approved &bull; Biodegradable Wrapper
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="container comparison-section reveal-on-scroll">
        <div className="sec-header">
          <div className="sec-eyebrow">THE HONEST COMPARISON</div>
          <h2 className="sec-title">Conventional Pads vs. PIAX Organic Care</h2>
          <p className="sec-sub">See why thousands of women have made the switch to cleaner, safer menstrual health.</p>
        </div>

        <div className="table-scroll-cue">
          <span>👈 Swipe table to compare &bull; 100% Organic vs. Plastic 👉</span>
        </div>

        <div className="table-container">
          <table className="comp-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Conventional Commercial Pads</th>
                <th className="highlight-col">PIAX Organic Pads &amp; App</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Surface Material</strong>
                </td>
                <td>
                  <span className="cross-badge">✕</span> Synthetic plastic mesh (causes friction)
                </td>
                <td className="highlight-col">
                  <span className="check-badge">✓</span> 100% GOTS-Certified Organic Cotton
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Bleaching Method</strong>
                </td>
                <td>
                  <span className="cross-badge">✕</span> Chlorine bleaching (traces of dioxin)
                </td>
                <td className="highlight-col">
                  <span className="check-badge">✓</span> Totally Chlorine-Free (TCF) Oxygen wash
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Artificial Fragrance</strong>
                </td>
                <td>
                  <span className="cross-badge">✕</span> Synthetic chemical perfumes
                </td>
                <td className="highlight-col">
                  <span className="check-badge">✓</span> 0% Perfumes, Phthalates, or Toxins
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Skin Reactions</strong>
                </td>
                <td>
                  <span className="cross-badge">✕</span> High risk of rashes, chafing &amp; redness
                </td>
                <td className="highlight-col">
                  <span className="check-badge">✓</span> Dermatologist-tested, 100% Rash-Free
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Cycle Companion</strong>
                </td>
                <td>
                  <span className="cross-badge">✕</span> None (buy off the shelf)
                </td>
                <td className="highlight-col">
                  <span className="check-badge">✓</span> Free Smart Cycle Tracker &amp; Hygiene Timer
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="container testimonials-section">
        <div className="sec-header">
          <div className="sec-eyebrow">COMMUNITY VOICES</div>
          <h2 className="sec-title">Loved by Sensitive Skin Across India</h2>
          <p className="sec-sub">Real experiences from women who said goodbye to rashes and hello to comfort.</p>
        </div>

        <div className="testimonials-grid">
          <div className="review-card">
            <div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;I used to get severe rashes every single cycle from regular plastic pads. PIAX was a game changer for
                me. It feels like wearing nothing and zero rashes since day one.&rdquo;
              </p>
            </div>
            <div className="reviewer-meta">
              <div className="reviewer-avatar">AR</div>
              <div>
                <div className="reviewer-name">Ananya R.</div>
                <div className="reviewer-city">Bengaluru &bull; Verified Buyer</div>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;The app is so clean and respectful. No weird ads or clutter. The pad change reminder is something I
                never thought I needed, but now I can&apos;t live without it at work.&rdquo;
              </p>
            </div>
            <div className="reviewer-meta">
              <div className="reviewer-avatar">PM</div>
              <div>
                <div className="reviewer-name">Pooja M.</div>
                <div className="reviewer-city">Mumbai &bull; App User</div>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;Super ultra thin! I was worried it wouldn&apos;t handle heavy flow, but it absorbed better than the
                bulky pads I used before. Plus the doorstep delivery is super discreet.&rdquo;
              </p>
            </div>
            <div className="reviewer-meta">
              <div className="reviewer-avatar">SK</div>
              <div>
                <div className="reviewer-name">Sneha K.</div>
                <div className="reviewer-city">Delhi &bull; Verified Buyer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container faq-section reveal-on-scroll">
        <div className="sec-header">
          <div className="sec-eyebrow">GOT QUESTIONS?</div>
          <h2 className="sec-title">Frequently Asked Questions</h2>
          <p className="sec-sub">Everything you need to know about our pads, cycle app, and privacy.</p>
        </div>

        <div className="faq-wrap">
          {FAQS.map((faq, idx) => (
            <div key={faq.q} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(idx)}>
                <span>{faq.q}</span>
                <span className="faq-toggle">{activeFaq === idx ? '−' : '+'}</span>
              </div>
              {activeFaq === idx && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Mandatory Google Play Health Policy Disclaimer */}
      <div className="container">
        <div className="med-notice-box">
          <div className="med-title">
            <span>⚠️</span> Health Transparency &amp; Medical Disclaimer
          </div>
          <p className="med-body">
            PIAX is intended for general menstrual tracking, personal hygiene, and educational wellness purposes only.
            PIAX is NOT a medical device, does not provide medical diagnoses, treatment, or clinical advice, and must
            NEVER be used as contraception or birth control. Always consult a licensed doctor, gynecologist, or
            qualified healthcare professional for medical advice or treatment.
          </p>
        </div>
      </div>

      {/* Download App CTA Banner with 3D QR Code Card */}
      <div className="container">
        <div className="cta-banner reveal-on-scroll">
          <div>
            <h2>Step Into Your Healthiest Cycle Yet</h2>
            <p>
              Download PIAX today and experience the blend of pure organic comfort and intelligent cycle care on your
              Android device.
            </p>

            <a
              href="https://play.google.com/store/apps/details?id=in.co.piax"
              className="btn-play"
              style={{ display: 'inline-flex', background: '#000' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.624.226-1.206.609-1.636z"
                  fill="#00E676"
                />
                <path
                  d="M17.218 8.575L13.793 12l3.425 3.425 3.86-2.228c1.098-.635 1.098-1.759 0-2.394l-3.86-2.228z"
                  fill="#FFD600"
                />
                <path
                  d="M13.793 12L3.609 1.814a2.27 2.27 0 0 1 1.706-.329l11.903 6.873-3.425 3.642z"
                  fill="#00B0FF"
                />
                <path
                  d="M13.793 12l3.425 3.425-11.903 6.873c-.567.327-1.19.423-1.706.329L13.793 12z"
                  fill="#FF3D00"
                />
              </svg>
              <div className="play-text-col">
                <small>DOWNLOAD FOR ANDROID</small>
                <strong>Get it on Google Play</strong>
              </div>
            </a>
          </div>

          {/* Scan & Download 3D Card */}
          <div className="qr-card-3d">
            <div className="qr-scan-line"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/static/img/playstore_qr.png"
              alt="Scan QR Code to Download PIAX"
              onError={(e) => {
                e.currentTarget.src = '/static/favicon.svg';
              }}
            />
            <small>📷 Scan with phone camera to install instantly</small>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', marginTop: '6px' }}>
              ✓ Google Play Verified Safe
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="brand-link">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/img/logo_lotus.png"
                  alt="PIAX Logo"
                  className="brand-logo-img"
                  style={{ height: '34px', width: '34px' }}
                  onError={(e) => {
                    e.currentTarget.src = '/static/img/logo_piax_teal.png';
                  }}
                />
                <span className="brand-name">PIAX</span>
              </a>
              <p>
                Luxury organic period care and intelligent cycle companion. 100% certified organic cotton topsheet with negative-ion strip technology.
              </p>
              <div className="footer-cert-pills">
                <span className="footer-cert-pill">BIS IS 5405:2025</span>
                <span className="footer-cert-pill">ISO 11737-1:2018</span>
                <span className="footer-cert-pill">Crafted in India</span>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Products &amp; Care</div>
              <ul className="footer-links-list">
                <li>
                  <a href="#pads">Day Regular Pads (240 mm)</a>
                </li>
                <li>
                  <a href="#pads">Heavy Flow Pads (290 mm)</a>
                </li>
                <li>
                  <a href="#pads">Overnight 360&deg; Pads (330 mm)</a>
                </li>
                <li>
                  <a href="#shop">Shop Pad Multi-Packs</a>
                </li>
                <li>
                  <a href="#anatomy">8-Layer Organic Tech</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Companion App</div>
              <ul className="footer-links-list">
                <li>
                  <a href="#how-it-works">Period &amp; Cycle Predictor</a>
                </li>
                <li>
                  <a href="#app-preview">Smart 4-Hour Pad Timer</a>
                </li>
                <li>
                  <a href="#app-preview">15-Min Emergency Delivery</a>
                </li>
                <li>
                  <a href="#app-preview">AI Wellness Assistants</a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=in.co.piax"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Play Store &rarr;
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Legal &amp; Compliance</div>
              <ul className="footer-links-list">
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/refund">Cancellation &amp; Refund Policy</a>
                </li>
                <li>
                  <a href="/shipping">Shipping &amp; Delivery Policy</a>
                </li>
                <li>
                  <a href="/contact">Contact Support</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>&copy; {new Date().getFullYear()} PIAX Wellness Private Limited. All rights reserved.</div>
            <div>
              Registered in Chennai, Tamil Nadu, India &middot;{' '}
              <a href="mailto:support@piax.co.in" style={{ color: 'inherit', textDecoration: 'underline' }}>
                support@piax.co.in
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification when Item is Added to Bag */}
      {addedToast && (
        <div className="toast-bag-alert" role="status">
          <span>✓ Added {addedToast.name} ({addedToast.size}) to Bag!</span>
          <button
            type="button"
            className="toast-open-btn"
            onClick={() => {
              setAddedToast(null);
              openCart();
            }}
          >
            View Bag →
          </button>
        </div>
      )}
    </>
  );
}
