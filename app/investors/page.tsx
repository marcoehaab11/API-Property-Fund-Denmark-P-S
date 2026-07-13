"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './investors.module.css';

export default function Investors() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for demonstration
    setIsAuthenticated(true);
  };

  return (
    <div>
      <section className={styles.header}>
        <div className="container">
          <h1>{t('nav.investors')}</h1>
          <p>Secure portal for capital partners.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          
          {!isAuthenticated ? (
            <>
              <div className="text-center">
                <h2>Investor Portal Login</h2>
                <p>Please log in to view transparent reporting and portfolio insights.</p>
              </div>
              
              <div className={styles.loginBox}>
                <form onSubmit={handleLogin}>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" className="input-field" placeholder="investor@example.com" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" required />
                  </div>
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                    Access Portal
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h2>Welcome back, Investor</h2>
              <p>Here are the latest reports for your portfolio.</p>

              <div className={styles.reportsGrid}>
                <div className={styles.reportCard}>
                  <div>
                    <h4>Q2 2026 Performance Report</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>PDF - 2.4 MB</span>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Download</button>
                </div>
                <div className={styles.reportCard}>
                  <div>
                    <h4>Annual ESG Summary 2025</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>PDF - 5.1 MB</span>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Download</button>
                </div>
                <div className={styles.reportCard}>
                  <div>
                    <h4>Market Outlook H2 2026</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>PDF - 1.8 MB</span>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Download</button>
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', backgroundColor: 'var(--color-background)', borderRadius: '8px' }}>
            <h3>Prospective Investor?</h3>
            <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
              We are always looking to partner with institutional investors who share our long-term vision for the Danish property market.
            </p>
            <a href="/contact" className="btn btn-primary">Start Dialogue</a>
          </div>
        </div>
      </section>
    </div>
  );
}
