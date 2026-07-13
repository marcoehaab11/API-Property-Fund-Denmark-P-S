"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <h3>API Property Fund</h3>
          <p>{t('hero.subtitle')}</p>
        </div>
        
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">{t('nav.home')}</Link></li>
            <li><Link href="/portfolio">{t('nav.portfolio')}</Link></li>
            <li><Link href="/about">{t('nav.about')}</Link></li>
            <li><Link href="/investors">{t('nav.investors')}</Link></li>
            <li><Link href="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div className={styles.contactInfo}>
          <h4>{t('nav.contact')}</h4>
          <p>📍 Copenhagen, Denmark</p>
          <p>📞 +45 21 31 77 71</p>
          <p>✉️ info@apipropertyfund.dk</p>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {t('cta.universal')}
          </Link>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} API Property Fund Denmark P/S. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
