import React from 'react';
import GFRCalculator from '../components/GFRCalculator';
import { Activity, AlertCircle, Heart, Stethoscope, Users, TrendingUp, BookOpen, Shield, Target } from 'lucide-react';

const GFRCalculatorPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalRiskEstimator",
        "name": "eGFR Calculator - CKD-EPI 2021 Kidney Function Assessment",
        "description": "Calculate estimated glomerular filtration rate (eGFR) using the latest CKD-EPI 2021 race-free equation for accurate kidney function assessment and chronic kidney disease staging. Professional medical tool for healthcare providers and patient education.",
        "url": "https://bmipro.netlify.app/gfr-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "isAccessibleForFree": true,
        "creator": {
          "@type": "Organization",
          "name": "BMI Pro - Advanced Health Calculators",
          "url": "https://bmipro.netlify.app"
        },
        "medicalSpecialty": ["Nephrology", "Internal Medicine", "Family Medicine"],
        "about": [
          {
            "@type": "MedicalCondition",
            "name": "Chronic Kidney Disease",
            "alternateName": ["CKD", "Chronic Renal Disease", "Kidney Disease"]
          },
          {
            "@type": "MedicalTest",
            "name": "Glomerular Filtration Rate",
            "alternateName": ["GFR", "eGFR", "Estimated GFR"]
          }
        ],
        "featureList": [
          "CKD-EPI 2021 race-free equation calculation",
          "Chronic kidney disease staging (G1-G5)",
          "Multiple creatinine units (mg/dL, µmol/L)",
          "Cardiovascular risk assessment",
          "Professional medical interpretation",
          "Clinical monitoring recommendations",
          "Enhanced accessibility compliance"
        ],
        "medicalRiskFactors": [
          "Age-related kidney function decline",
          "Gender-based creatinine differences",
          "Cardiovascular disease risk",
          "Chronic kidney disease progression"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is eGFR and why is it important for kidney health?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "eGFR (estimated Glomerular Filtration Rate) measures how well your kidneys filter blood and remove waste products. It's the most important indicator of kidney function, expressed as mL/min/1.73 m². Normal eGFR is 90+ mL/min/1.73 m². Lower values indicate decreased kidney function and may require medical attention. eGFR helps diagnose chronic kidney disease (CKD), monitor disease progression, and guide treatment decisions."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the CKD-EPI 2021 equation compared to older formulas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The CKD-EPI 2021 equation is the most accurate and equitable formula for estimating GFR currently available. It removes race as a factor, making it more fair across all populations. Compared to the older MDRD equation, CKD-EPI 2021 is more precise for eGFR values near-normal or mildly decreased kidney function, reducing over-diagnosis of CKD in healthier populations while maintaining accuracy for disease detection."
            }
          },
          {
            "@type": "Question",
            "name": "What do the different chronic kidney disease (CKD) stages mean?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CKD stages are classified from G1 to G5 based on eGFR levels: G1 (≥90) indicates normal or high kidney function with possible kidney damage; G2 (60-89) shows mild decrease; G3a (45-59) indicates mild to moderate decrease; G3b (30-44) shows moderate to severe decrease; G4 (15-29) indicates severe decrease requiring preparation for renal replacement therapy; G5 (&lt;15) represents kidney failure requiring dialysis or transplant. Each stage guides different management approaches and monitoring frequencies."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use this eGFR calculator for medical diagnosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, this calculator is strictly for educational purposes only. eGFR results should always be interpreted by qualified healthcare professionals alongside clinical symptoms, medical history, additional laboratory tests (especially albumin-to-creatinine ratio), and imaging studies. Never use this tool for self-diagnosis or treatment decisions. Always consult your healthcare provider for proper medical evaluation and care."
            }
          },
          {
            "@type": "Question",
            "name": "What factors can affect my eGFR results accuracy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "eGFR accuracy can be affected by multiple factors including age, gender, muscle mass, recent protein intake, medications, dehydration, recent illness, pregnancy, and certain medical conditions. The CKD-EPI 2021 equation accounts for age and gender but may be less accurate in people with very high or low muscle mass, severe malnutrition, or certain ethnic populations. Always discuss results with your healthcare provider for proper interpretation considering your individual circumstances."
            }
          },
          {
            "@type": "Question",
            "name": "How often should I monitor my kidney function with eGFR testing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Monitoring frequency depends on your CKD stage and risk factors: Stage G1-G2 requires annual monitoring if kidney damage is present; Stage G3a needs monitoring every 6 months; Stage G3b requires every 3-6 months; Stage G4 needs every 3 months; Stage G5 requires monthly monitoring. People with diabetes, hypertension, or family history of kidney disease may need more frequent testing as recommended by their healthcare provider."
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "eGFR Calculator CKD-EPI 2021",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "permissions": "none",
        "isAccessibleForFree": true,
        "accessibilityFeature": [
          "ARIA labels",
          "keyboard navigation",
          "screen reader support",
          "high contrast mode",
          "large touch targets"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl mb-8 shadow-2xl">
            <Activity className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            eGFR Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Calculate your estimated glomerular filtration rate (eGFR) using the latest CKD-EPI 2021 race-free equation for accurate kidney function assessment and chronic kidney disease staging.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>CKD-EPI 2021 Formula</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Race-Free Calculation</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Professional Grade</span>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <GFRCalculator />

        {/* Enhanced Educational Content */}
        <div className="max-w-7xl mx-auto mt-20 space-y-16">
          {/* About eGFR Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Stethoscope className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Understanding eGFR & Kidney Function</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10 text-gray-300">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">What is eGFR?</h3>
                  <p className="leading-relaxed text-base">
                    Estimated Glomerular Filtration Rate (eGFR) measures how efficiently your kidneys filter blood and remove waste products. 
                    It's expressed as the volume of filtered fluid per minute, standardized to body surface area (mL/min/1.73 m²). 
                    eGFR is the gold standard for assessing kidney function and is essential for diagnosing and staging chronic kidney disease (CKD).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">CKD-EPI 2021 Revolution</h3>
                  <p className="leading-relaxed text-base">
                    The CKD-EPI 2021 equation represents a major advancement in kidney function assessment by removing race as a variable, 
                    creating a more equitable and accurate formula for all populations. This update addresses healthcare disparities and 
                    provides better clinical decision-making tools for healthcare providers worldwide.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Why is eGFR Critical?</h3>
                  <p className="leading-relaxed text-base">
                    eGFR enables early detection of kidney disease, monitors disease progression, guides treatment decisions, 
                    assesses cardiovascular risk, and helps adjust medication dosing. Early intervention based on eGFR results 
                    can significantly slow disease progression and prevent complications including heart disease and stroke.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Clinical Applications</h3>
                  <p className="leading-relaxed text-base">
                    Healthcare providers use eGFR for medication dosing adjustments, surgical planning, specialist referrals, 
                    cardiovascular risk assessment, and patient education. It's essential for managing diabetes, hypertension, 
                    and other conditions that can affect kidney function over time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CKD Stages Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Chronic Kidney Disease Stages & Management</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                CKD staging helps healthcare providers determine appropriate treatment strategies, monitoring frequencies, 
                and intervention timing. Each stage requires specific management approaches to slow progression and prevent complications.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-colors">
                  <h3 className="text-green-400 font-bold text-lg mb-3">Stage G1 (≥90)</h3>
                  <p className="text-gray-300 text-sm mb-4">Normal or high kidney function. May have kidney damage with normal eGFR.</p>
                  <div className="text-xs text-green-300">
                    <strong>Management:</strong> Annual monitoring, lifestyle counseling, address risk factors
                  </div>
                </div>
                <div className="p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-colors">
                  <h3 className="text-blue-400 font-bold text-lg mb-3">Stage G2 (60-89)</h3>
                  <p className="text-gray-300 text-sm mb-4">Mild decrease in kidney function. Monitor for progression signs.</p>
                  <div className="text-xs text-blue-300">
                    <strong>Management:</strong> Annual monitoring, blood pressure control, diabetes management
                  </div>
                </div>
                <div className="p-6 bg-yellow-900/20 rounded-2xl border border-yellow-800 hover:bg-yellow-900/30 transition-colors">
                  <h3 className="text-yellow-400 font-bold text-lg mb-3">Stage G3a (45-59)</h3>
                  <p className="text-gray-300 text-sm mb-4">Mild to moderate decrease. Begin comprehensive CKD management.</p>
                  <div className="text-xs text-yellow-300">
                    <strong>Management:</strong> 6-month monitoring, nephrology consultation, complication screening
                  </div>
                </div>
                <div className="p-6 bg-orange-900/20 rounded-2xl border border-orange-800 hover:bg-orange-900/30 transition-colors">
                  <h3 className="text-orange-400 font-bold text-lg mb-3">Stage G3b (30-44)</h3>
                  <p className="text-gray-300 text-sm mb-4">Moderate to severe decrease. Nephrology care essential.</p>
                  <div className="text-xs text-orange-300">
                    <strong>Management:</strong> 3-6 month monitoring, specialist care, complication management
                  </div>
                </div>
                <div className="p-6 bg-red-900/20 rounded-2xl border border-red-800 hover:bg-red-900/30 transition-colors">
                  <h3 className="text-red-400 font-bold text-lg mb-3">Stage G4 (15-29)</h3>
                  <p className="text-gray-300 text-sm mb-4">Severe decrease. Prepare for kidney replacement therapy.</p>
                  <div className="text-xs text-red-300">
                    <strong>Management:</strong> 3-month monitoring, renal replacement planning, advanced care
                  </div>
                </div>
                <div className="p-6 bg-red-900/30 rounded-2xl border border-red-700 hover:bg-red-900/40 transition-colors">
                  <h3 className="text-red-500 font-bold text-lg mb-3">Stage G5 ({`<15`})</h3>
                  <p className="text-gray-300 text-sm mb-4">Kidney failure. Dialysis or transplant required.</p>
                  <div className="text-xs text-red-400">
                    <strong>Management:</strong> Monthly monitoring, dialysis/transplant evaluation, palliative care options
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <AlertCircle className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What is eGFR and why is it important for kidney health?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  eGFR (estimated Glomerular Filtration Rate) measures how well your kidneys filter blood and remove waste products. 
                  It's the most important indicator of kidney function, expressed as mL/min/1.73 m². Normal eGFR is 90+ mL/min/1.73 m². 
                  Lower values indicate decreased kidney function and may require medical attention. eGFR helps diagnose chronic kidney disease (CKD), 
                  monitor disease progression, and guide treatment decisions.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How accurate is the CKD-EPI 2021 equation compared to older formulas?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The CKD-EPI 2021 equation is the most accurate and equitable formula for estimating GFR currently available. 
                  It removes race as a factor, making it more fair across all populations. Compared to the older MDRD equation, 
                  CKD-EPI 2021 is more precise for eGFR values near-normal or mildly decreased kidney function, reducing over-diagnosis 
                  of CKD in healthier populations while maintaining accuracy for disease detection.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What do the different chronic kidney disease (CKD) stages mean?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  CKD stages are classified from G1 to G5 based on eGFR levels: G1 (≥90) indicates normal or high kidney function 
                  with possible kidney damage; G2 (60-89) shows mild decrease; G3a (45-59) indicates mild to moderate decrease; 
                  G3b (30-44) shows moderate to severe decrease; G4 (15-29) indicates severe decrease requiring preparation for 
                  renal replacement therapy; G5 (&lt;15) represents kidney failure requiring dialysis or transplant. Each stage guides 
                  different management approaches and monitoring frequencies.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How often should I monitor my kidney function with eGFR testing?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Monitoring frequency depends on your CKD stage and risk factors: Stage G1-G2 requires annual monitoring if kidney damage is present; 
                  Stage G3a needs monitoring every 6 months; Stage G3b requires every 3-6 months; Stage G4 needs every 3 months; 
                  Stage G5 requires monthly monitoring. People with diabetes, hypertension, or family history of kidney disease may need 
                  more frequent testing as recommended by their healthcare provider.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What factors can affect my eGFR results accuracy?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  eGFR accuracy can be affected by multiple factors including age, gender, muscle mass, recent protein intake, medications, 
                  dehydration, recent illness, pregnancy, and certain medical conditions. The CKD-EPI 2021 equation accounts for age and gender 
                  but may be less accurate in people with very high or low muscle mass, severe malnutrition, or certain ethnic populations. 
                  Always discuss results with your healthcare provider for proper interpretation considering your individual circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Users className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Related Medical Calculators</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/bac-calculator" className="group p-6 bg-amber-900/20 rounded-2xl border border-amber-800 hover:bg-amber-900/30 transition-all hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-amber-400 font-bold text-lg">BAC Calculator</h3>
                </div>
                <p className="text-gray-300">Estimate blood alcohol content for safety awareness and legal compliance</p>
              </a>
              <a href="/bmr-calculator" className="group p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-all hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-blue-400 font-bold text-lg">BMR Calculator</h3>
                </div>
                <p className="text-gray-300">Calculate basal metabolic rate for comprehensive health planning</p>
              </a>
              <a href="/" className="group p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-all hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-green-400 font-bold text-lg">BMI Calculator</h3>
                </div>
                <p className="text-gray-300">Calculate body mass index with comprehensive health insights</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GFRCalculatorPage;