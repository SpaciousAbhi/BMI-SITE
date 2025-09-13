import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BMIProvider } from "./contexts/BMIContext";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import GoalsPage from "./pages/GoalsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactPage from "./pages/ContactPage";
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </BMIProvider>
    </ThemeProvider>
  );
}

export default App;