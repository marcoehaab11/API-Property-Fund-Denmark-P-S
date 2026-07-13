"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './about.module.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <div>
      <section className={styles.header}>
        <div className="container">
          <h1>{t('nav.about')}</h1>
          <p>Strategic vision. Local expertise. Proven results.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <h2>Our Philosophy</h2>
          <p>
            API Property Fund Denmark P/S is a premier real estate investment and management firm focused exclusively on the dynamic Danish property market. We combine institutional-grade capital allocation with deep local market knowledge to deliver exceptional risk-adjusted returns.
          </p>
          <p>
            Our core belief is that real estate is fundamentally a local business. By maintaining a sharp focus on Copenhagen, Aarhus, and other key growth regions in Denmark, we are uniquely positioned to identify undervalued assets and execute value-add strategies effectively.
          </p>
          
          <h2 style={{ marginTop: '2rem' }}>History in Denmark</h2>
          <p>
            Since our inception, we have built a reputation for transparency, agility, and operational excellence. We have successfully transacted over €1.2 billion in assets, establishing ourselves as a trusted partner for both international institutional investors and local stakeholders.
          </p>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className="container">
          <h2 className="text-center">Leadership Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.photoPlaceholder}>[Photo]</div>
              <div className={styles.teamInfo}>
                <h3>Anders Nielsen</h3>
                <p>Managing Director</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.photoPlaceholder}>[Photo]</div>
              <div className={styles.teamInfo}>
                <h3>Sofie Jensen</h3>
                <p>Head of Asset Management</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.photoPlaceholder}>[Photo]</div>
              <div className={styles.teamInfo}>
                <h3>Lars Rasmussen</h3>
                <p>Chief Investment Officer</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.photoPlaceholder}>[Photo]</div>
              <div className={styles.teamInfo}>
                <h3>Mette Sørensen</h3>
                <p>Director of Project Development</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
