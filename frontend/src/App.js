import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ContactUs from "./pages/ContactUs";

// Enhanced SEO Component for dynamic page titles and meta optimization
function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'BMI Calculator - Free Body Mass Index Calculator | Healthy Weight Tool 2025',
      '/privacy-policy': 'Privacy Policy - BMI Calculator Pro | Data Protection & GDPR Compliance',
      '/terms-conditions': 'Terms & Conditions - BMI Calculator Pro | Legal Terms & Medical Disclaimers',
      '/contact-us': 'Contact BMI Calculator Pro | Support & Feedback | Health Calculator Help'
    };

    const descriptions = {
      '/': 'Calculate your BMI instantly with our advanced Body Mass Index calculator. Get personalized health insights, ideal weight ranges, and professional recommendations. WHO & CDC approved BMI calculation tool.',
      '/privacy-policy': 'Learn how BMI Calculator Pro protects your privacy and handles your personal health data. Comprehensive privacy policy with GDPR compliance and data protection information.',
      '/terms-conditions': 'Read the terms and conditions for using BMI Calculator Pro. Medical disclaimers, usage guidelines, and legal terms for our health calculator tool.',
      '/contact-us': 'Contact BMI Calculator Pro support team. Get help with BMI calculations, provide feedback, or ask questions about healthy weight and body mass index.'
    };

    const keywords = {
      '/': 'BMI calculator, body mass index calculator, calculate BMI, healthy weight calculator, BMI chart, what is BMI, ideal weight calculator, weight loss calculator, BMI calculator adults, healthy BMI range',
      '/privacy-policy': 'BMI calculator privacy policy, health data protection, GDPR compliance, medical data privacy, health calculator privacy',
      '/terms-conditions': 'BMI calculator terms, medical disclaimer, health calculator legal terms, BMI tool conditions, weight calculator terms',
      '/contact-us': 'BMI calculator support, health calculator help, BMI tool contact, weight calculator assistance, body mass index help'
    };

    // Update title
    document.title = titles[location.pathname] || titles['/'];
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    }

    // Update keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords[location.pathname] || keywords['/']);
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://bmipro.com${location.pathname}`);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', titles[location.pathname] || titles['/']);
    if (ogDescription) ogDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    if (ogUrl) ogUrl.setAttribute('content', `https://bmipro.com${location.pathname}`);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');

    if (twitterTitle) twitterTitle.setAttribute('content', titles[location.pathname] || titles['/']);
    if (twitterDescription) twitterDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    if (twitterUrl) twitterUrl.setAttribute('content', `https://bmipro.com${location.pathname}`);

  }, [location]);

  return null;
}

function App() {
  return (
    <div className="App min-h-screen bg-black text-white">
      <BrowserRouter>
        <SEOUpdater />
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;