"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './contact.module.css';
import LeadForm from '@/components/LeadForm';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div>
      <section className={styles.header}>
        <div className="container">
          <h1>{t('nav.contact')}</h1>
          <p>Get in touch with our team of real estate experts.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.grid}`}>
          
          <div className={styles.contactInfo}>
            <h2>We are here to help</h2>
            <p>Whether you're looking for investment opportunities, asset management, or project development, we have the expertise to guide you.</p>

            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <div className={styles.icon}>📍</div>
                <div className={styles.infoText}>
                  <h4>Office Address</h4>
                  <p>Amaliegade 15<br />1256 Copenhagen K<br />Denmark</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.icon}>📞</div>
                <div className={styles.infoText}>
                  <h4>Phone</h4>
                  <p><a href="tel:+4521317771">+45 21 31 77 71</a></p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.icon}>✉️</div>
                <div className={styles.infoText}>
                  <h4>Email</h4>
                  <p><a href="mailto:info@apipropertyfund.dk">info@apipropertyfund.dk</a></p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.icon}>💼</div>
                <div className={styles.infoText}>
                  <h4>LinkedIn</h4>
                  <p><a href="#" target="_blank" rel="noopener noreferrer">API Property Fund on LinkedIn</a></p>
                </div>
              </div>
            </div>

            <div className={styles.mapContainer}>
              {/* Google Maps Embed with Silver theme (via URL params, fallback to standard if not fully supported in simple iframe) */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.206587637856!2d12.593259815926715!3d55.68413998053676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652531818274d89%3A0xc07a8bdfd77a87ea!2sAmaliegade%2015%2C%201256%20K%C3%B8benhavn%20K%2C%20Denmark!5e0!3m2!1sen!2sus!4v1628172938128!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          <div className={styles.formSide}>
            <LeadForm />
          </div>

        </div>
      </section>
    </div>
  );
}
