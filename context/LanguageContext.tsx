"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "da";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.portfolio": "Portfolio",
    "nav.about": "About Us",
    "nav.investors": "For Investors",
    "nav.contact": "Contact",
    "cta.primary": "Start Dialogue",
    "cta.secondary": "View Portfolio",
    "cta.universal": "Book Consultation",
    "hero.title": "Strategic Property Investment in Denmark",
    "hero.subtitle": "Maximizing returns through modern asset management and development.",
    "footer.rights": "All rights reserved.",
  },
  da: {
    "nav.home": "Hjem",
    "nav.portfolio": "Portefølje",
    "nav.about": "Om Os",
    "nav.investors": "For Investorer",
    "nav.contact": "Kontakt",
    "cta.primary": "Start Dialog",
    "cta.secondary": "Se Portefølje",
    "cta.universal": "Book Konsultation",
    "hero.title": "Strategisk Ejendomsinvestering i Danmark",
    "hero.subtitle": "Maksimering af afkast gennem moderne kapitalforvaltning og udvikling.",
    "footer.rights": "Alle rettigheder forbeholdes.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "da" : "en"));
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
