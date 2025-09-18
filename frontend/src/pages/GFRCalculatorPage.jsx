import React from 'react';
import GFRCalculator from '../components/GFRCalculator';
import { Activity, AlertCircle, Heart, Stethoscope, Users, TrendingUp } from 'lucide-react';

const GFRCalculatorPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalRiskCalculator",
        "name": "GFR Calculator - Kidney Function Assessment",
        "description": "Calculate estimated glomerular filtration rate (eGFR) using the CKD-EPI equation for accurate kidney function assessment and chronic kidney disease staging.",
        "url": "https://bmipro.netlify.app/gfr-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "isAccessibleForFree": true,
        "creator": {
          "@type": "Organization",
          "name": "BMI Pro - Advanced Health Calculators",
          "url": "https://bmipro.netlify.app"
        },
        "medicalSpecialty": "Nephrology",
        "about": {
          "@type": "MedicalCondition",
          "name": "Chronic Kidney Disease",
          "alternateName": "CKD"
        },
        "featureList": [
          "CKD-EPI equation calculation",
          "Chronic kidney disease staging (G1-G5)",
          "Multiple creatinine units (mg/dL, µmol/L)",
          "Professional medical interpretation",
          "Risk level assessment"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is GFR and why is it important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GFR (Glomerular Filtration Rate) measures how well your kidneys filter blood. It's the best overall indicator of kidney function and helps diagnose chronic kidney disease (CKD). Normal GFR is 90+ mL/min/1.73 m²."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the CKD-EPI equation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The CKD-EPI equation is currently the most accurate formula for estimating GFR, especially for values near-normal or mildly decreased kidney function. It's more precise than the older MDRD equation and is preferred by medical professionals."
            }
          },
          {
            "@type": "Question",
            "name": "What do the different CKD stages mean?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CKD stages range from G1 (normal, ≥90) to G5 (kidney failure, <15). G1-G2 indicate normal to mild decrease, G3a-G3b show moderate decrease, G4 indicates severe decrease, and G5 represents kidney failure requiring treatment."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use this calculator for medical diagnosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, this calculator is for educational purposes only. GFR results should always be interpreted by a qualified healthcare professional alongside clinical symptoms, medical history, and other laboratory tests. Never use for self-diagnosis."
            }
          },
          {
            "@type": "Question",
            "name": "What factors can affect my GFR results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GFR can be affected by age, gender, race, muscle mass, medications, dehydration, recent illness, and certain medical conditions. Always discuss results with your healthcare provider for proper interpretation."
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "GFR Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "permissions": "none",
        "isAccessibleForFree": true,
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
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl mb-6">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GFR Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your estimated glomerular filtration rate (eGFR) using the CKD-EPI equation for accurate kidney function assessment and chronic kidney disease staging.
          </p>
        </div>

        {/* Calculator Component */}
        <GFRCalculator />

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          {/* About GFR Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Understanding GFR & Kidney Function</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">What is GFR?</h3>
                <p className="leading-relaxed">
                  Glomerular Filtration Rate (GFR) measures how well your kidneys filter blood. It's expressed as the volume of filtered fluid per minute, standardized to body surface area (mL/min/1.73 m²). GFR is the best overall indicator of kidney function and is used to diagnose and stage chronic kidney disease (CKD).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Why is GFR Important?</h3>
                <p className="leading-relaxed">
                  GFR helps detect kidney disease early, monitor progression, guide treatment decisions, and assess cardiovascular risk. Early detection of decreased kidney function allows for interventions to slow progression and prevent complications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">CKD-EPI vs MDRD</h3>
                <p className="leading-relaxed">
                  The CKD-EPI equation is more accurate than the older MDRD equation, especially for GFR values near-normal or mildly decreased. It provides better risk stratification and reduces over-diagnosis of CKD in healthier populations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Clinical Applications</h3>
                <p className="leading-relaxed">
                  Healthcare providers use GFR to adjust medication dosing, plan procedures, refer to specialists, and educate patients about kidney health. It's essential for managing diabetes, hypertension, and other conditions affecting kidney function.
                </p>
              </div>
            </div>
          </div>

          {/* CKD Stages Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Chronic Kidney Disease Stages</h2>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                  <h3 className="text-green-400 font-semibold mb-2">Stage G1 (≥90)</h3>
                  <p className="text-gray-300 text-sm">Normal or high kidney function. May have kidney damage with normal GFR.</p>
                </div>
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <h3 className="text-blue-400 font-semibold mb-2">Stage G2 (60-89)</h3>
                  <p className="text-gray-300 text-sm">Mild decrease in kidney function. Monitor for progression.</p>
                </div>
                <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800">
                  <h3 className="text-yellow-400 font-semibold mb-2">Stage G3a (45-59)</h3>
                  <p className="text-gray-300 text-sm">Mild to moderate decrease. Begin CKD management strategies.</p>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800">
                  <h3 className="text-orange-400 font-semibold mb-2">Stage G3b (30-44)</h3>
                  <p className="text-gray-300 text-sm">Moderate to severe decrease. Prepare for renal replacement therapy.</p>
                </div>
                <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
                  <h3 className="text-red-400 font-semibold mb-2">Stage G4 (15-29)</h3>
                  <p className="text-gray-300 text-sm">Severe decrease. Prepare for kidney replacement therapy.</p>
                </div>
                <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
                  <h3 className="text-red-500 font-semibold mb-2">Stage G5 {'(<15)'}</h3>
                  <p className="text-gray-300 text-sm">Kidney failure. Dialysis or transplant needed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  What is GFR and why is it important?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  GFR (Glomerular Filtration Rate) measures how well your kidneys filter blood. It's the best overall indicator of kidney function and helps diagnose chronic kidney disease (CKD). Normal GFR is 90+ mL/min/1.73 m². Lower values indicate decreased kidney function and may require medical attention.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  How accurate is the CKD-EPI equation?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The CKD-EPI equation is currently the most accurate formula for estimating GFR, especially for values near-normal or mildly decreased kidney function. It's more precise than the older MDRD equation and is preferred by medical professionals worldwide for its superior diagnostic and prognostic performance.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  What do the different CKD stages mean?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  CKD stages range from G1 (normal, ≥90) to G5 (kidney failure, &lt;15). G1-G2 indicate normal to mild decrease, G3a-G3b show moderate decrease, G4 indicates severe decrease, and G5 represents kidney failure requiring treatment. Each stage guides different management approaches.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Should I use this calculator for medical diagnosis?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  No, this calculator is for educational purposes only. GFR results should always be interpreted by a qualified healthcare professional alongside clinical symptoms, medical history, and other laboratory tests. Never use for self-diagnosis or treatment decisions.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  What factors can affect my GFR results?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  GFR can be affected by age, gender, race, muscle mass, medications, dehydration, recent illness, and certain medical conditions. Diet, exercise, and hydration status can also influence creatinine levels. Always discuss results with your healthcare provider for proper interpretation.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Related Health Calculators</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/bac-calculator" className="p-4 bg-amber-900/20 rounded-lg border border-amber-800 hover:bg-amber-900/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-amber-400 font-semibold">BAC Calculator</h3>
                </div>
                <p className="text-gray-300 text-sm">Estimate blood alcohol content for safety awareness</p>
              </a>
              <a href="/bmr-calculator" className="p-4 bg-blue-900/20 rounded-lg border border-blue-800 hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-blue-400 font-semibold">BMR Calculator</h3>
                </div>
                <p className="text-gray-300 text-sm">Calculate basal metabolic rate for health planning</p>
              </a>
              <a href="/" className="p-4 bg-green-900/20 rounded-lg border border-green-800 hover:bg-green-900/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-green-400 font-semibold">BMI Calculator</h3>
                </div>
                <p className="text-gray-300 text-sm">Calculate body mass index and health insights</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GFRCalculatorPage;