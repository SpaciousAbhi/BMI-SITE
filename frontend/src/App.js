import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ContactUs from "./pages/ContactUs";

// SEO Component for dynamic page titles
function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'BMI Calculator Pro - Free Online Body Mass Index Calculator | Health Insights',
      '/privacy-policy': 'Privacy Policy - BMI Calculator Pro | Data Protection & Privacy',
      '/terms-conditions': 'Terms & Conditions - BMI Calculator Pro | Legal Terms',
      '/contact-us': 'Contact Us - BMI Calculator Pro | Support & Feedback'
    };

    const descriptions = {
      '/': 'Calculate your BMI instantly with our advanced BMI calculator. Get comprehensive health insights, personalized recommendations, and track your body mass index with multiple unit support.',
      '/privacy-policy': 'Learn how BMI Calculator Pro protects your privacy and handles your personal data. Comprehensive privacy policy and data protection information.',
      '/terms-conditions': 'Read the terms and conditions for using BMI Calculator Pro. Legal terms, medical disclaimers, and usage guidelines.',
      '/contact-us': 'Contact BMI Calculator Pro support team. Get help, provide feedback, or ask questions about our BMI calculator and health insights.'
    };

    document.title = titles[location.pathname] || titles['/'];
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    }
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