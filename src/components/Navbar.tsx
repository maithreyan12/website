'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { AppLinks } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { CartBagIcon, SparkleIcon, ArrowRightIcon } from './Icons';
import styles from './Navbar.module.css';

interface NavbarProps {
  links?: AppLinks;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { itemCount, openCart, openQuiz } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Build Your Box', href: '#custom-box' },
    { label: 'Shop', href: '#shop' },
    { label: 'Why PIAX', href: '#why-piax' },
    { label: 'Flow Quiz', onClick: openQuiz, isQuiz: true },
    { label: 'Auto-Repeat', href: '#subscriptions' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.navbar}>
          {/* Brand Logo - Clean, bold & elegant without extra tagline clutter */}
          <a href="#" className={styles.logo} aria-label="PIAX Home">
            <Image
              src="/images/logo_lotus.png"
              alt="PIAX Logo"
              width={32}
              height={32}
              className={styles.logoIcon}
              priority
            />
            <span className={styles.brandName}>PIAX</span>
          </a>

          {/* Streamlined Desktop Navigation (Only 4-5 focused links for optimal UX) */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link, idx) =>
              link.onClick ? (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className={`${styles.navLink} ${styles.quizLink}`}
                >
                  <SparkleIcon size={14} color="#D86B52" />
                  <span>{link.label}</span>
                </button>
              ) : (
                <a key={idx} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Actions: Desktop Quiz CTA + Cart Button + Mobile Toggle */}
          <div className={styles.actions}>
            <button
              onClick={openQuiz}
              className={`${styles.actionBtn} btn btn-sm btn-secondary`}
              title="Find Your Personal Pack"
            >
              <SparkleIcon size={13} color="#D86B52" />
              <span>Personalize Pack</span>
            </button>

            <button
              onClick={openCart}
              className={styles.cartButton}
              aria-label="View Shopping Bag"
            >
              <CartBagIcon size={20} color="#0A3D34" />
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </button>

            {/* Mobile hamburger button */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDropdown}>
            <div className={styles.mobileLinksList}>
              {navLinks.map((link, idx) =>
                link.onClick ? (
                  <button
                    key={idx}
                    onClick={() => {
                      link.onClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className={`${styles.mobileNavLink} ${styles.mobileQuizLink}`}
                  >
                    <SparkleIcon size={16} color="#D86B52" />
                    <span>{link.label}</span>
                  </button>
                ) : (
                  <a
                    key={idx}
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            <div className={styles.mobileCta}>
              <button
                onClick={() => {
                  openQuiz();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Take Flow Consultation</span>
                <ArrowRightIcon size={16} color="#FFFFFF" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
