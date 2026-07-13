"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            API Property Fund
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>{t('nav.home')}</Link>
            <Link href="/portfolio" className={styles.navLink}>{t('nav.portfolio')}</Link>
            <Link href="/about" className={styles.navLink}>{t('nav.about')}</Link>
            <Link href="/investors" className={styles.navLink}>{t('nav.investors')}</Link>
            <Link href="/contact" className={styles.navLink}>{t('nav.contact')}</Link>
          </div>

          <div className={styles.actions}>
            <button onClick={toggleLanguage} className={styles.langToggle} aria-label="Toggle Language">
              {language === 'en' ? 'DA' : 'EN'}
            </button>
            <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* Desktop primary action could go here, but requirements specified mobile bottom bar */}
          </div>
        </div>
      </nav>

      {/* Mobile Contact Bottom Bar */}
      <div className={styles.mobileNavBottom}>
        <Link href="/contact" className="btn btn-primary">
          {t('cta.universal')}
        </Link>
      </div>
    </>
  );
}
