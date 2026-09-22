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

export const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const { itemCount, openCart, openQuiz } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Build Your Box', href: '/#custom-box' },
    { label: 'Shop', href: '/#shop' },
    { label: 'Why PIAX', href: '/#why-piax' },
    { label: 'Flow Quiz', onClick: openQuiz, isQuiz: true },
    { label: 'Auto-Repeat', href: '/#subscriptions' },
  ];

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.navContainer}>
        <header className={`${styles.navGlass} ${isScrolled ? styles.scrolled : ''}`}>
          {/* Brand Link with Lotus Logo and Brand Name */}
          <a href="/" className={styles.brandLink} aria-label="PIAX Home">
            <Image
              src="/images/logo_lotus.png"
              alt="PIAX Logo"
              width={32}
              height={32}
              className={styles.brandLogoImg}
              priority
            />
            <span className={styles.brandName}>PIAX</span>
          </a>

          {/* Desktop Nav: Inner Capsule Pill Track */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navMenu}>
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className={`${styles.navLink} ${styles.quizLink}`}
                    >
                      <SparkleIcon size={14} color="#D86B52" />
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <a href={link.href} className={styles.navLink}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Desktop Personalize CTA + Cart Bag Button + Adjusted Hamburger Button */}
          <div className={styles.actions}>
            {/* Desktop Personalize Pack CTA (hidden on responsive/mobile) */}
            <button
              onClick={openQuiz}
              className={styles.desktopLiquidBtn}
              title="Find Your Personal Pack"
            >
              <SparkleIcon size={14} color="#FFFFFF" />
              <span>Personalize Pack</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className={styles.cartButton}
              aria-label="View Shopping Bag"
            >
              <CartBagIcon size={20} color="#052620" />
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </button>

            {/* Adjusted Hamburger Menu Button */}
            <button
              className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </header>

        {/* Responsive Mobile Drawer (inside Hamburger Button) */}
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

            {/* Personalize Pack button placed inside the Hamburger Drawer */}
            <div className={styles.mobileCta}>
              <button
                onClick={() => {
                  openQuiz();
                  setMobileMenuOpen(false);
                }}
                className={styles.mobilePersonalizeBtn}
              >
                <SparkleIcon size={16} color="#FFFFFF" />
                <span>Personalize Your Pack</span>
                <ArrowRightIcon size={16} color="#FFFFFF" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
