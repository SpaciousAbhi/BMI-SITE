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

// Enhanced SEO Component for dynamic page titles and meta optimization
function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'BMI Calculator - Free Body Mass Index Calculator | Healthy Weight Tool 2025',
      '/privacy-policy': 'Privacy Policy - BMI Calculator Pro | Data Protection & GDPR Compliance',
      '/terms-conditions': 'Terms & Conditions - BMI Calculator Pro | Legal Terms & Medical Disclaimers',
      '/contact-us': 'Contact BMI Calculator Pro | Support & Feedback | Health Calculator Help',
      '/body-fat-calculator': 'Body Fat Calculator - Free Body Fat Percentage Calculator | US Navy Method 2025',
      '/army-body-fat-calculator': 'Army Body Fat Calculator - Military AR 600-9 Standards | Tape Test 2025',
      '/lean-body-mass-calculator': 'Lean Body Mass Calculator - Free LBM & FFMI Calculator | Medical Formulas',
      '/ideal-weight-calculator': 'Ideal Weight Calculator - Devine Formula | Medical Weight Calculator 2025',
      '/healthy-weight-calculator': 'Healthy Weight Calculator - Personalized Weight Range | BMI Assessment',
      '/body-type-calculator': 'Body Type Calculator - Somatotype Analysis | Ectomorph Mesomorph Endomorph',
      '/body-surface-area-calculator': 'Body Surface Area Calculator - BSA Medical Formula | Du Bois Mosteller',
      '/calorie-calculator': 'Calorie Calculator - Daily Calorie Needs Calculator | Weight Loss & Gain 2025',
      '/tdee-calculator': 'TDEE Calculator - Total Daily Energy Expenditure | Metabolic Rate Calculator',
      '/bmr-calculator': 'BMR Calculator - Basal Metabolic Rate | Mifflin-St Jeor Formula 2025',
      '/macro-calculator': 'Macro Calculator - Macronutrient Calculator | Protein Carbs Fat Distribution',
      '/carbohydrate-calculator': 'Carbohydrate Calculator - Daily Carb Intake | Athletic Performance 2025',
      '/protein-calculator': 'Protein Calculator - Daily Protein Needs | Muscle Building & Weight Loss',
      '/fat-intake-calculator': 'Fat Intake Calculator - Healthy Fat Requirements | Heart Health 2025',
      '/pace-calculator': 'Pace Calculator - Running Pace Calculator | Time Distance Speed Calculator 2025',
      '/calories-burned-calculator': 'Calories Burned Calculator - Exercise Calorie Burn | MET Values 2025',
      '/one-rep-max-calculator': 'One Rep Max Calculator - 1RM Calculator | Strength Training Formulas 2025',
      '/target-heart-rate-calculator': 'Target Heart Rate Calculator - Training Zones | Karvonen Method 2025'
    };

    const descriptions = {
      '/': 'Calculate your BMI instantly with our advanced Body Mass Index calculator. Get personalized health insights, ideal weight ranges, and professional recommendations. WHO & CDC approved BMI calculation tool.',
      '/privacy-policy': 'Learn how BMI Calculator Pro protects your privacy and handles your personal health data. Comprehensive privacy policy with GDPR compliance and data protection information.',
      '/terms-conditions': 'Read the terms and conditions for using BMI Calculator Pro. Medical disclaimers, usage guidelines, and legal terms for our health calculator tool.',
      '/contact-us': 'Contact BMI Calculator Pro support team. Get help with BMI calculations, provide feedback, or ask questions about healthy weight and body mass index.',
      '/body-fat-calculator': 'Calculate your body fat percentage using the US Navy circumference method. Get accurate body composition analysis with personalized health insights and recommendations.',
      '/army-body-fat-calculator': 'Calculate body fat percentage using official US Army AR 600-9 standards. Military tape test method for body composition assessment and compliance verification.',
      '/lean-body-mass-calculator': 'Calculate your lean body mass using validated Boer, James, and Hume formulas. Assess muscle mass, FFMI, and body composition for health and fitness goals.',
      '/ideal-weight-calculator': 'Calculate your ideal body weight using medical formulas including Devine, Robinson, Miller methods. Get personalized weight targets based on height and gender.',
      '/healthy-weight-calculator': 'Calculate your personalized healthy weight range based on BMI, age, activity level, and body frame. Get customized weight management recommendations.',
      '/body-type-calculator': 'Discover your body type using Heath-Carter somatotype analysis. Get personalized fitness and nutrition recommendations for ectomorph, mesomorph, or endomorph.',
      '/body-surface-area-calculator': 'Calculate body surface area using medical formulas including Du Bois, Mosteller, Haycock methods. Essential for medical dosing and cardiac assessments.',
      '/calorie-calculator': 'Calculate your daily calorie needs for weight loss, muscle gain, or maintenance. Advanced TDEE calculator with multiple BMR formulas and activity levels.',
      '/tdee-calculator': 'Calculate Total Daily Energy Expenditure using advanced metabolic science. Get precise TDEE estimates with macronutrient targets and activity-specific calculations.',
      '/bmr-calculator': 'Calculate Basal Metabolic Rate using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas. Understand your metabolic rate and energy needs at rest.',
      '/macro-calculator': 'Calculate optimal macronutrient distribution for protein, carbohydrates, and fats. Get personalized macro ratios based on goals, activity level, and dietary preferences.',
      '/carbohydrate-calculator': 'Calculate daily carbohydrate intake for athletic performance, weight loss, or health goals. Get carb timing recommendations and source guidance.',
      '/protein-calculator': 'Calculate daily protein requirements for muscle building, weight loss, and health. Get personalized protein targets with timing and source recommendations.',
      '/fat-intake-calculator': 'Calculate optimal daily fat intake for health and performance. Get personalized fat type distribution and heart-healthy fat source recommendations.'
    };

    const keywords = {
      '/': 'BMI calculator, body mass index calculator, calculate BMI, healthy weight calculator, BMI chart, what is BMI, ideal weight calculator, weight loss calculator, BMI calculator adults, healthy BMI range',
      '/privacy-policy': 'BMI calculator privacy policy, health data protection, GDPR compliance, medical data privacy, health calculator privacy',
      '/terms-conditions': 'BMI calculator terms, medical disclaimer, health calculator legal terms, BMI tool conditions, weight calculator terms',
      '/contact-us': 'BMI calculator support, health calculator help, BMI tool contact, weight calculator assistance, body mass index help',
      '/body-fat-calculator': 'body fat calculator, body fat percentage, US Navy method, circumference method, body composition, fat mass calculator, lean mass calculator',
      '/army-body-fat-calculator': 'army body fat calculator, military body fat, AR 600-9, army tape test, military fitness standards, army body composition',
      '/lean-body-mass-calculator': 'lean body mass calculator, LBM calculator, fat free mass, FFMI calculator, muscle mass calculator, Boer formula, James formula, Hume formula',
      '/ideal-weight-calculator': 'ideal weight calculator, Devine formula, Robinson formula, Miller formula, ideal body weight, medical weight calculator, target weight',
      '/healthy-weight-calculator': 'healthy weight calculator, healthy weight range, BMI weight calculator, personalized weight, weight management, healthy BMI range',
      '/body-type-calculator': 'body type calculator, somatotype calculator, ectomorph mesomorph endomorph, Heath Carter method, body type analysis, fitness body type',
      '/body-surface-area-calculator': 'body surface area calculator, BSA calculator, Du Bois formula, Mosteller formula, medical BSA, cardiac index calculator',
      '/calorie-calculator': 'calorie calculator, daily calorie needs, TDEE calculator, BMR calculator, weight loss calories, muscle gain calories, calorie requirements',
      '/tdee-calculator': 'TDEE calculator, total daily energy expenditure, metabolic rate calculator, activity level calculator, calorie maintenance, energy expenditure',
      '/bmr-calculator': 'BMR calculator, basal metabolic rate, Mifflin St Jeor, Harris Benedict, Katch McArdle, metabolism calculator, resting metabolic rate',
      '/macro-calculator': 'macro calculator, macronutrient calculator, protein carbs fat calculator, macro distribution, IIFYM calculator, flexible dieting macros',
      '/carbohydrate-calculator': 'carbohydrate calculator, daily carb intake, carb cycling calculator, athletic carbs, low carb calculator, carb timing',
      '/protein-calculator': 'protein calculator, daily protein needs, protein requirements, muscle building protein, weight loss protein, protein intake',
      '/fat-intake-calculator': 'fat intake calculator, healthy fat calculator, daily fat needs, omega 3 calculator, saturated fat calculator, heart healthy fats'
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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-black text-white">
      <BrowserRouter>
        <SEOUpdater />
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;