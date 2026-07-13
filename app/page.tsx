"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img src="/hero.png" alt="API Property Fund Hero" />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className="btn btn-primary">
              {t('cta.primary')}
            </Link>
            <Link href="/portfolio" className="btn btn-outline">
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <h3>€1.2B</h3>
            <p>Assets Under Management</p>
          </div>
          <div className={styles.statItem}>
            <h3>45+</h3>
            <p>Properties in Denmark</p>
          </div>
          <div className={styles.statItem}>
            <h3>98%</h3>
            <p>Occupancy Rate</p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className={`section ${styles.valuePropSection}`}>
        <div className="container">
          <h2 className="text-center">Our Core Services</h2>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <h3>Investment Management</h3>
              <p>Strategic capital allocation in top-tier Danish property markets to secure sustainable, long-term yields.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Asset Management</h3>
              <p>Optimizing property performance, reducing operational costs, and fostering strong tenant relations.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Project Development</h3>
              <p>Modernizing and developing both residential and commercial sites to meet modern institutional standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
