"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LeadForm.module.css';

export default function LeadForm() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    
    // Check honeypot
    if (formData.get('website')) {
      setIsSubmitting(false);
      return; // Silently fail for bots
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(language === 'da' ? "Der opstod en fejl. Prøv igen." : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3>{language === 'da' ? 'Tak for din henvendelse!' : 'Thank you for reaching out!'}</h3>
          <p>{language === 'da' ? 'Vi vender tilbage hurtigst muligt.' : 'We will get back to you as soon as possible.'}</p>
          <a 
            href={`https://wa.me/4521317771?text=${encodeURIComponent("Hej API Property Fund, I just submitted a form and would like to chat.")}`} 
            className="btn btn-outline"
            style={{ marginTop: '1.5rem' }}
          >
            Chat on WhatsApp now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      {errorMsg && <div className="error-message text-center" style={{ marginBottom: '1rem' }}>{errorMsg}</div>}
      
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Honeypot field */}
        <input type="text" name="website" className={styles.honeypot} tabIndex={-1} autoComplete="off" />

        <div className={styles.formGroup}>
          <label>Full Name *</label>
          <input type="text" name="fullName" className="input-field" required minLength={2} />
        </div>
        
        <div className={styles.formGroup}>
          <label>Phone Number *</label>
          <input type="tel" name="phone" className="input-field" defaultValue="+45 " required pattern="^(\+45\s?)?[1-9]\d{7}$" title="Valid Danish phone number required" />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email Address *</label>
          <input type="email" name="email" className="input-field" required />
        </div>
        
        <div className={styles.formGroup}>
          <label>City / Area</label>
          <input type="text" name="city" className="input-field" />
        </div>
        
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Service of Interest *</label>
          <select name="service" className="input-field" required>
            <option value="">Select a service...</option>
            <option value="Investment">Investment Management</option>
            <option value="Management">Asset Management</option>
            <option value="Development">Project Development</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Preferred Date/Time for Call</label>
          <input type="text" name="preferredTime" className="input-field" placeholder="e.g., Next Tuesday morning" />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Message / Notes</label>
          <textarea name="message" className="input-field" rows={4}></textarea>
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={`btn btn-primary ${styles.btnSubmit}`} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : t('cta.universal')}
          </button>
        </div>
      </form>
    </div>
  );
}
