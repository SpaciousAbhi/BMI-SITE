import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import BackButton from "./components/BackButton";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ContactUs from "./pages/ContactUs";
import BodyFatCalculatorPage from "./pages/BodyFatCalculatorPage";
import ArmyBodyFatCalculatorPage from "./pages/ArmyBodyFatCalculatorPage";
import LeanBodyMassCalculatorPage from "./pages/LeanBodyMassCalculatorPage";
import IdealWeightCalculatorPage from "./pages/IdealWeightCalculatorPage";
import HealthyWeightCalculatorPage from "./pages/HealthyWeightCalculatorPage";
import BodyTypeCalculatorPage from "./pages/BodyTypeCalculatorPage";
import BodySurfaceAreaCalculatorPage from "./pages/BodySurfaceAreaCalculatorPage";
import CalorieCalculatorPage from "./pages/CalorieCalculatorPage";
import TDEECalculatorPage from "./pages/TDEECalculatorPage";
import BMRCalculatorPage from "./pages/BMRCalculatorPage";
import MacroCalculatorPage from "./pages/MacroCalculatorPage";
import CarbohydrateCalculatorPage from "./pages/CarbohydrateCalculatorPage";
import ProteinCalculatorPage from "./pages/ProteinCalculatorPage";
import FatIntakeCalculatorPage from "./pages/FatIntakeCalculatorPage";
import PaceCalculatorPage from "./pages/PaceCalculatorPage";
import CaloriesBurnedCalculatorPage from "./pages/CaloriesBurnedCalculatorPage";
import OneRepMaxCalculatorPage from "./pages/OneRepMaxCalculatorPage";
import TargetHeartRateCalculatorPage from "./pages/TargetHeartRateCalculatorPage";
import PregnancyCalculatorPage from "./pages/PregnancyCalculatorPage";
import PregnancyWeightGainCalculatorPage from "./pages/PregnancyWeightGainCalculatorPage";
import DueDateCalculatorPage from "./pages/DueDateCalculatorPage";
import OvulationCalculatorPage from "./pages/OvulationCalculatorPage";
import ConceptionCalculatorPage from "./pages/ConceptionCalculatorPage";
import PeriodCalculatorPage from "./pages/PeriodCalculatorPage";
import GFRCalculatorPage from "./pages/GFRCalculatorPage";
import BACCalculatorPage from "./pages/BACCalculatorPage";
import BlogsArticlesPage from "./pages/BlogsArticlesPage";
import ArticlePage from "./pages/ArticlePage";

// Enhanced SEO Component for dynamic page titles and meta optimization
function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Enhanced dynamic title updates based on routes
    const routeTitles = {
      '/': 'BMI Calculator - Free Body Mass Index Calculator | Healthy Weight Tool 2025',
      '/body-fat-calculator': 'Body Fat Calculator - Accurate Body Fat Percentage | Health Assessment Tool',
      '/army-body-fat-calculator': 'Army Body Fat Calculator - Military Standard AR 600-9 | Official Tape Test',
      '/lean-body-mass-calculator': 'Lean Body Mass Calculator - Muscle Mass Assessment | Body Composition Tool',
      '/ideal-weight-calculator': 'Ideal Weight Calculator - Find Your Perfect Weight Range | Medical Formulas',
      '/healthy-weight-calculator': 'Healthy Weight Calculator - WHO & CDC Guidelines | Weight Range Tool',
      '/body-type-calculator': 'Body Type Calculator - Ectomorph Mesomorph Endomorph | Fitness Planning',
      '/body-surface-area-calculator': 'Body Surface Area Calculator - Medical BSA Calculation | Dosage Tool',
      '/calorie-calculator': 'Calorie Calculator - Daily Calorie Needs | Weight Management Tool 2025',
      '/tdee-calculator': 'TDEE Calculator - Total Daily Energy Expenditure | Metabolism Calculator',
      '/bmr-calculator': 'BMR Calculator - Basal Metabolic Rate | Resting Metabolism Tool',
      '/macro-calculator': 'Macro Calculator - Macronutrient Distribution | Diet Planning Tool',
      '/carbohydrate-calculator': 'Carbohydrate Calculator - Daily Carb Needs | Nutrition Planning Tool',
      '/protein-calculator': 'Protein Calculator - Daily Protein Requirements | Muscle Building Tool',
      '/fat-intake-calculator': 'Fat Intake Calculator - Healthy Fat Requirements | Nutrition Tool',
      '/pace-calculator': 'Pace Calculator - Running Pace & Speed | Training Tool for Runners',
      '/calories-burned-calculator': 'Calories Burned Calculator - Exercise Energy Expenditure | Fitness Tool',
      '/one-rep-max-calculator': 'One Rep Max Calculator - 1RM Strength Calculator | Powerlifting Tool',
      '/target-heart-rate-calculator': 'Target Heart Rate Calculator - Training Zones | Cardio Optimization',
      '/pregnancy-calculator': 'Pregnancy Calculator - Gestational Age & Milestones | Prenatal Tool',
      '/pregnancy-weight-gain-calculator': 'Pregnancy Weight Gain Calculator - IOM Guidelines | Prenatal Health',
      '/due-date-calculator': 'Due Date Calculator - Pregnancy Due Date | Naegele Rule Calculator',
      '/ovulation-calculator': 'Ovulation Calculator - Fertility Window | Conception Planning Tool',
      '/conception-calculator': 'Conception Calculator - Conception Date Estimation | Pregnancy Planning',
      '/period-calculator': 'Period Calculator - Menstrual Cycle Tracker | Women\'s Health Tool',
      '/gfr-calculator': 'GFR Calculator - Kidney Function Assessment | eGFR Medical Tool',
      '/bac-calculator': 'BAC Calculator - Blood Alcohol Content | Legal Limit Calculator',
      '/health-guides': 'Health Guides & Articles - Medical Calculator Resources | Expert Health Content',
      '/privacy-policy': 'Privacy Policy - Data Protection & DPDP Act Compliance | BMI Calculator Pro',
      '/terms-conditions': 'Terms & Conditions - Usage Guidelines | BMI Calculator Pro Legal',
      '/contact-us': 'Contact Us - Support & Feedback | BMI Calculator Pro Help Center'
    };

    // Enhanced meta descriptions
    const metaDescriptions = {
      '/': 'Free BMI Calculator with WHO-approved formula. Calculate Body Mass Index instantly with personalized health insights, ideal weight recommendations, and comprehensive analysis. Medical-grade accuracy.',
      '/body-fat-calculator': 'Calculate body fat percentage using US Navy method. Professional body composition analysis with skinfold measurements for accurate health assessment and fitness tracking.',
      '/army-body-fat-calculator': 'Official US Army Body Fat Calculator using AR 600-9 standards. Military tape test calculator for body fat compliance verification and fitness assessments.',
      '/lean-body-mass-calculator': 'Calculate lean body mass and muscle mass using validated Boer, James, and Hume formulas. Professional body composition assessment for fitness and health.',
      '/ideal-weight-calculator': 'Find your ideal weight using medical formulas including Devine, Robinson, and Miller methods. Professional weight range calculation with health recommendations.',
      '/healthy-weight-calculator': 'Calculate healthy weight range using WHO and CDC guidelines. Personalized weight assessment based on BMI, age, and health factors with medical accuracy.',
      '/body-type-calculator': 'Determine your body type - ectomorph, mesomorph, or endomorph. Professional body type analysis for personalized fitness and nutrition planning.',
      '/body-surface-area-calculator': 'Medical Body Surface Area (BSA) calculator using Du Bois and Mosteller formulas. Professional tool for medical dosage calculations and treatments.',
      '/health-guides': 'Comprehensive health guides and medical articles covering all health calculators. Expert-written, medically-reviewed content for optimal health and fitness management.',
    };

    const currentTitle = routeTitles[location.pathname] || 'BMI Calculator Pro - Professional Health Assessment Tools';
    const currentDescription = metaDescriptions[location.pathname] || 'Professional health calculators and assessment tools with medical-grade accuracy. Calculate BMI, body fat, calories, and more with expert guidance.';

    document.title = currentTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentDescription);
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', currentDescription);
    }

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://bmipro.com${location.pathname}`);
    }

    // Update Twitter Card tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', currentTitle);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', currentDescription);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://bmipro.com${location.pathname}`);
    }

    // Enhanced keyword optimization
    const routeKeywords = {
      '/': 'BMI calculator, body mass index, calculate BMI, healthy weight, WHO BMI, BMI chart, weight calculator, health assessment',
      '/body-fat-calculator': 'body fat calculator, body fat percentage, skinfold measurement, body composition, health assessment, fitness tracker',
      '/army-body-fat-calculator': 'army body fat calculator, military body fat, AR 600-9, tape test, military fitness, body fat compliance',
      '/health-guides': 'health guides, medical articles, health calculators, BMI guides, fitness articles, nutrition guides, medical resources',
    };

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && routeKeywords[location.pathname]) {
      metaKeywords.setAttribute('content', routeKeywords[location.pathname]);
    }
  }, [location]);

  return null;
}

// Animated Routes Component to handle transitions
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition key="home">
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/privacy-policy" 
          element={
            <PageTransition key="privacy">
              <PrivacyPolicy />
            </PageTransition>
          } 
        />
        <Route 
          path="/terms-conditions" 
          element={
            <PageTransition key="terms">
              <TermsConditions />
            </PageTransition>
          } 
        />
        <Route 
          path="/contact-us" 
          element={
            <PageTransition key="contact">
              <ContactUs />
            </PageTransition>
          } 
        />
        <Route 
          path="/body-fat-calculator" 
          element={
            <PageTransition key="body-fat">
              <BodyFatCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/army-body-fat-calculator" 
          element={
            <PageTransition key="army-body-fat">
              <ArmyBodyFatCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/lean-body-mass-calculator" 
          element={
            <PageTransition key="lean-body-mass">
              <LeanBodyMassCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/ideal-weight-calculator" 
          element={
            <PageTransition key="ideal-weight">
              <IdealWeightCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/healthy-weight-calculator" 
          element={
            <PageTransition key="healthy-weight">
              <HealthyWeightCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/body-type-calculator" 
          element={
            <PageTransition key="body-type">
              <BodyTypeCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/body-surface-area-calculator" 
          element={
            <PageTransition key="body-surface-area">
              <BodySurfaceAreaCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/calorie-calculator" 
          element={
            <PageTransition key="calorie">
              <CalorieCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/tdee-calculator" 
          element={
            <PageTransition key="tdee">
              <TDEECalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/bmr-calculator" 
          element={
            <PageTransition key="bmr">
              <BMRCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/macro-calculator" 
          element={
            <PageTransition key="macro">
              <MacroCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/carbohydrate-calculator" 
          element={
            <PageTransition key="carbohydrate">
              <CarbohydrateCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/protein-calculator" 
          element={
            <PageTransition key="protein">
              <ProteinCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/fat-intake-calculator" 
          element={
            <PageTransition key="fat-intake">
              <FatIntakeCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/pace-calculator" 
          element={
            <PageTransition key="pace">
              <PaceCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/calories-burned-calculator" 
          element={
            <PageTransition key="calories-burned">
              <CaloriesBurnedCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/one-rep-max-calculator" 
          element={
            <PageTransition key="one-rep-max">
              <OneRepMaxCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/target-heart-rate-calculator" 
          element={
            <PageTransition key="target-heart-rate">
              <TargetHeartRateCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/pregnancy-calculator" 
          element={
            <PageTransition key="pregnancy">
              <PregnancyCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/pregnancy-weight-gain-calculator" 
          element={
            <PageTransition key="pregnancy-weight-gain">
              <PregnancyWeightGainCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/due-date-calculator" 
          element={
            <PageTransition key="due-date">
              <DueDateCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/ovulation-calculator" 
          element={
            <PageTransition key="ovulation">
              <OvulationCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/conception-calculator" 
          element={
            <PageTransition key="conception">
              <ConceptionCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/period-calculator" 
          element={
            <PageTransition key="period">
              <PeriodCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/gfr-calculator" 
          element={
            <PageTransition key="gfr">
              <GFRCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/bac-calculator" 
          element={
            <PageTransition key="bac">
              <BACCalculatorPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/health-guides" 
          element={
            <PageTransition key="health-guides">
              <HealthGuidesPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/health-guides/:slug" 
          element={
            <PageTransition key="article">
              <ArticlePage />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Trigger for Netlify prerender plugin
  useEffect(() => {
    // Dispatch custom event after app is fully rendered
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('custom-render-trigger');
        document.dispatchEvent(event);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App min-h-screen bg-black text-white">
      <BrowserRouter>
        <SEOUpdater />
        <ScrollToTop />
        <Header />
        <Breadcrumb />
        <BackButton />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollToTopButton />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;