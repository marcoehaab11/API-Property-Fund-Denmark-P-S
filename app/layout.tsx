import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "API Property Fund Denmark",
  description: "Premier partner for property investment and management in Denmark.",
  keywords: ["Ejendomsfond Danmark", "Property Investment Denmark", "API Property Fund", "Real Estate Asset Management Copenhagen"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "API Property Fund Denmark",
    "image": "https://example.com/logo.png",
    "telephone": "+45 21 31 77 71",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Amaliegade 15",
      "addressLocality": "Copenhagen K",
      "postalCode": "1256",
      "addressCountry": "DK"
    }
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Navigation />
          <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
          <WhatsAppFAB />
        </LanguageProvider>
      </body>
    </html>
  );
}
