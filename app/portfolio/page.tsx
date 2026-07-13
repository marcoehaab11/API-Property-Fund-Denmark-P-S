"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './portfolio.module.css';

// Mock data
const properties = [
  { id: 1, title: 'Nordhaven Complex', location: 'Copenhagen', type: 'Residential', value: '€45M', size: '12,000 sqm' },
  { id: 2, title: 'Aarhus Tech Hub', location: 'Aarhus', type: 'Commercial', value: '€28M', size: '8,500 sqm' },
  { id: 3, title: 'Odense Logistics Center', location: 'Odense', type: 'Industrial', value: '€15M', size: '20,000 sqm' },
  { id: 4, title: 'Frederiksberg Heights', location: 'Copenhagen', type: 'Residential', value: '€62M', size: '15,000 sqm' },
  { id: 5, title: 'Strøget Retail Plaza', location: 'Copenhagen', type: 'Retail', value: '€35M', size: '5,000 sqm' },
  { id: 6, title: 'Vejle Office Park', location: 'Vejle', type: 'Commercial', value: '€18M', size: '6,200 sqm' },
];

export default function Portfolio() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Retail'];

  const filteredProperties = filter === 'All' 
    ? properties 
    : properties.filter(p => p.type === filter);

  return (
    <div>
      <section className={styles.header}>
        <div className="container">
          <h1>{t('nav.portfolio')}</h1>
          <p>Explore our curated selection of premium Danish real estate assets.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.filters}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filteredProperties.map(property => (
              <div key={property.id} className={styles.card}>
                <div className={styles.imagePlaceholder}>
                  <img 
                    src={property.type === 'Residential' ? '/residential.png' : '/commercial.png'} 
                    alt={property.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{property.title}</h3>
                  <div className={styles.location}>📍 {property.location}</div>
                  <div className={styles.stats}>
                    <div>Type: <span>{property.type}</span></div>
                    <div>Value: <span>{property.value}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
