import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { BMIProvider, useBMI } from "./contexts/BMIContext";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import GoalsPage from "./pages/GoalsPage";
import WorkoutPage from "./pages/WorkoutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactPage from "./pages/ContactPage";
import AboutBMIPage from "./pages/AboutBMIPage";
import HealthTipsPage from "./pages/HealthTipsPage";
import NutritionGuidePage from "./pages/NutritionGuidePage";
import BodyFatPage from "./pages/BodyFatPage";
import CaloriePage from "./pages/CaloriePage";
import MacrosPage from "./pages/MacrosPage";
import SmartBMIPage from "./pages/SmartBMIPage";
import BMIForAthletesPage from "./pages/BMIForAthletesPage";
import BMIForChildrenPage from "./pages/BMIForChildrenPage";
import BMIGuidePage from "./pages/BMIGuidePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PregnancyBMIPage from "./pages/PregnancyBMIPage";
import SeniorBMIPage from "./pages/SeniorBMIPage";
import EthnicityBMIPage from "./pages/EthnicityBMIPage";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/toaster";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
      <p className="text-gray-300">Loading Advanced BMI Calculator...</p>
    </div>
  </div>
);

// App content that requires loaded contexts
const AppContent = () => {
  const { isLoaded: themeLoaded } = useTheme();
  const { isLoaded: bmiLoaded } = useBMI();

  // Show loading while contexts are initializing
  if (!themeLoaded || !bmiLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App min-h-screen transition-colors duration-300">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-bmi" element={<AboutBMIPage />} />
          <Route path="/health-tips" element={<HealthTipsPage />} />
          <Route path="/nutrition-guide" element={<NutritionGuidePage />} />
          <Route path="/body-fat" element={<BodyFatPage />} />
          <Route path="/calories" element={<CaloriePage />} />
          <Route path="/macros" element={<MacrosPage />} />
          <Route path="/smart-bmi" element={<SmartBMIPage />} />
          <Route path="/athletes-bmi" element={<BMIForAthletesPage />} />
          <Route path="/bmi-for-children" element={<BMIForChildrenPage />} />
          <Route path="/bmi-guide" element={<BMIGuidePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/bmi-blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/pregnancy-bmi" element={<PregnancyBMIPage />} />
          <Route path="/senior-bmi" element={<SeniorBMIPage />} />
          <Route path="/ethnicity-bmi" element={<EthnicityBMIPage />} />
          <Route path="/ideal-weight" element={<IdealWeightPage />} />
          <Route path="/waist-height-ratio" element={<WaistHeightRatioPage />} />
          <Route path="/body-surface-area" element={<BSACalculatorPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BMIProvider>
          <AppContent />
        </BMIProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;