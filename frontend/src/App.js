import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BMIProvider } from "./contexts/BMIContext";
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
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <BMIProvider>
        <div className="App min-h-screen transition-colors duration-300">
          <BrowserRouter>
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
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </BMIProvider>
    </ThemeProvider>
  );
}

export default App;