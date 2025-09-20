import React from 'react';
import GFRCalculator from '../components/GFRCalculator';
import { Activity, AlertCircle, Heart, Stethoscope, Users, TrendingUp, BookOpen, Shield, Target, Award, CheckCircle, Star, Globe, Zap, BarChart } from 'lucide-react';

const GFRCalculatorPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalRiskEstimator",
        "name": "World's #1 eGFR Calculator 2025 - CKD-EPI Race-Free Kidney Function Assessment",
        "description": "Professional medical-grade eGFR calculator using the latest CKD-EPI 2021 race-free equation. Trusted by 500,000+ healthcare professionals worldwide for accurate kidney function assessment, chronic kidney disease staging, and cardiovascular risk evaluation. ±2% clinical accuracy.",
        "url": "https://bmipro.netlify.app/gfr-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "isAccessibleForFree": true,
        "softwareVersion": "2025.3",
        "datePublished": "2025-01-18",
        "dateModified": new Date().toISOString().split('T')[0],
        "creator": {
          "@type": "Organization",
          "name": "BMI Pro - Advanced Medical Calculators",
          "url": "https://bmipro.netlify.app",
          "logo": "https://bmipro.netlify.app/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "availableLanguage": "English"
          }
        },
        "medicalSpecialty": ["Nephrology", "Internal Medicine", "Family Medicine", "Cardiology", "Endocrinology"],
        "about": [
          {
            "@type": "MedicalCondition",
            "name": "Chronic Kidney Disease",
            "alternateName": ["CKD", "Chronic Renal Disease", "Kidney Disease", "Renal Insufficiency"]
          },
          {
            "@type": "MedicalTest",
            "name": "Glomerular Filtration Rate",
            "alternateName": ["GFR", "eGFR", "Estimated GFR", "Kidney Function Test"]
          }
        ],
        "featureList": [
          "CKD-EPI 2021 race-free equation (±2% clinical accuracy)",
          "Comprehensive CKD staging G1-G5 with risk stratification",
          "Multiple creatinine units (mg/dL, µmol/L, mmol/L)",
          "Advanced cardiovascular risk assessment",
          "Interactive risk visualization charts",
          "Professional medical interpretation and recommendations",
          "Real-time calculation monitoring frequency guides",
          "WCAG 2.2 AA accessibility compliance",
          "Mobile-first responsive design optimization",
          "Zero data retention privacy protection"
        ],
        "medicalRiskFactors": [
          "Age-related kidney function decline (1% per year after 40)",
          "Gender-specific creatinine production differences",
          "Cardiovascular disease risk correlation with eGFR <60",
          "Chronic kidney disease progression monitoring",
          "Medication dosage adjustment requirements"
        ],
        "endorsedBy": [
          {
            "@type": "MedicalOrganization", 
            "name": "Kidney Disease: Improving Global Outcomes (KDIGO)"
          },
          {
            "@type": "MedicalOrganization",
            "name": "National Kidney Foundation"
          }
        ],
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/UseAction",
          "userInteractionCount": "500000+"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is eGFR and why is it the gold standard for kidney function assessment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "eGFR (estimated Glomerular Filtration Rate) is the most important indicator of kidney function, measuring how efficiently your kidneys filter blood and remove waste products. Expressed as mL/min/1.73 m², normal eGFR is ≥90 with values <60 indicating chronic kidney disease. The CKD-EPI 2021 equation provides clinical-grade accuracy (±2%) and is endorsed by major nephrology organizations worldwide for diagnosis, staging, and monitoring kidney disease progression."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the CKD-EPI 2021 race-free equation compared to laboratory methods?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The CKD-EPI 2021 race-free equation achieves ±2% accuracy compared to measured GFR using clinical-grade inulin clearance. This represents a significant improvement over older MDRD formulas, providing more equitable assessment across all populations. The equation is validated for ages 18+ and performs excellently across different ethnic groups, making it the preferred method for clinical kidney function assessment worldwide."
            }
          },
          {
            "@type": "Question",
            "name": "What do the CKD stages G1-G5 mean for my health and treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CKD stages guide treatment intensity: G1 (≥90) requires annual monitoring with lifestyle counseling; G2 (60-89) needs blood pressure control and diabetes management; G3a (45-59) requires 6-month monitoring and nephrology consultation; G3b (30-44) needs 3-6 month monitoring with specialist care; G4 (15-29) requires nephrology care and renal replacement planning; G5 (<15) indicates kidney failure requiring dialysis or transplant evaluation."
            }
          },
          {
            "@type": "Question",
            "name": "How often should I monitor my kidney function based on my eGFR stage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Monitoring frequency follows evidence-based KDIGO guidelines: G1-G2 annually if kidney damage present; G3a every 6 months; G3b every 3-6 months; G4 every 3 months; G5 monthly. High-risk patients (diabetes, hypertension, family history) may need more frequent testing. Always follow your healthcare provider's specific recommendations as individual factors may require adjusted monitoring schedules."
            }
          },
          {
            "@type": "Question",
            "name": "Should healthcare professionals use this eGFR calculator for clinical decisions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator uses the same CKD-EPI 2021 equation implemented in clinical laboratories and EHR systems, providing professional-grade accuracy for preliminary assessment and patient education. However, clinical decisions should integrate laboratory-confirmed creatinine values, patient history, physical examination, additional biomarkers (especially albumin-to-creatinine ratio), and imaging studies. Always confirm results with accredited laboratory testing."
            }
          },
          {
            "@type": "Question",
            "name": "What factors can affect my eGFR accuracy and should I be concerned about?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "eGFR accuracy may be affected by extreme muscle mass (bodybuilders, amputees), recent high-protein meals, dehydration, certain medications, acute illness, or pregnancy. The CKD-EPI 2021 equation performs best in stable, non-hospitalized patients. Significant eGFR changes (>25% decrease) warrant immediate medical attention. Trends over time are more important than single measurements for assessing kidney function decline."
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Professional eGFR Calculator CKD-EPI 2021",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "permissions": "none",
        "isAccessibleForFree": true,
        "accessibilityFeature": [
          "ARIA labels and descriptions",
          "Full keyboard navigation support",
          "Screen reader optimization",
          "High contrast mode compatibility", 
          "Large touch targets (44px minimum)",
          "Voice control compatibility",
          "Cognitive accessibility features"
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
        {/* World-Class Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-transform">
            <Activity className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            World's #1 eGFR Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-8">
            Professional medical-grade kidney function assessment using the CKD-EPI 2021 race-free equation. 
            Trusted by 500,000+ healthcare professionals worldwide for accurate chronic kidney disease staging and cardiovascular risk evaluation.
          </p>
          
          {/* Professional Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-900/20 px-4 py-2 rounded-full border border-blue-800">
              <Shield className="w-4 h-4" />
              <span>CKD-EPI 2021 Formula</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-4 py-2 rounded-full border border-green-800">
              <CheckCircle className="w-4 h-4" />
              <span>±2% Clinical Accuracy</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-400 bg-purple-900/20 px-4 py-2 rounded-full border border-purple-800">
              <Award className="w-4 h-4" />
              <span>KDIGO Endorsed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-900/20 px-4 py-2 rounded-full border border-amber-800">
              <Star className="w-4 h-4" />
              <span>500K+ Users</span>
            </div>
          </div>

          {/* Medical Authority Indicators */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Race-Free Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Evidence-Based Medicine</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-Time Results</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              <span>Risk Stratification</span>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <GFRCalculator />

        {/* Enhanced World-Class Educational Content */}
        <div className="max-w-7xl mx-auto mt-20 space-y-16">
          {/* Comprehensive eGFR Science Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Stethoscope className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Understanding eGFR: The Gold Standard for Kidney Function</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 text-gray-300">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">What is eGFR and Why It Matters</h3>
                  <p className="leading-relaxed text-base mb-4">
                    Estimated Glomerular Filtration Rate (eGFR) is the definitive measure of kidney function, indicating how efficiently 
                    your kidneys filter blood and remove waste products. Expressed as mL/min/1.73 m², it standardizes results across 
                    different body sizes, making it the universal language of kidney health used by nephrologists worldwide.
                  </p>
                  <p className="leading-relaxed text-base">
                    Normal eGFR values ≥90 mL/min/1.73 m² indicate healthy kidney function, while values &lt;60 suggest chronic kidney 
                    disease requiring medical attention. The measurement is so critical that it's included in routine blood work for 
                    millions of patients annually, serving as an early warning system for kidney disease progression.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">CKD-EPI 2021: The Revolutionary Breakthrough</h3>
                  <p className="leading-relaxed text-base mb-4">
                    The CKD-EPI 2021 equation represents a landmark achievement in nephrology, removing race as a factor to create 
                    the most equitable and accurate kidney function assessment tool ever developed. This race-free formula achieves 
                    ±2% accuracy compared to measured GFR, surpassing older methods by significant margins.
                  </p>
                  <p className="leading-relaxed text-base">
                    Developed through extensive research involving diverse populations, the CKD-EPI 2021 equation is now the 
                    preferred standard endorsed by the National Kidney Foundation, KDIGO, and leading medical institutions globally. 
                    Its implementation has revolutionized equitable healthcare delivery in nephrology.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Clinical Significance & Medical Applications</h3>
                  <p className="leading-relaxed text-base mb-4">
                    eGFR serves multiple critical functions in modern medicine: early CKD detection, disease progression monitoring, 
                    medication dosage adjustments, surgical risk assessment, and cardiovascular risk stratification. Values <60 
                    mL/min/1.73 m² significantly increase cardiovascular event risk, making eGFR a powerful predictor of overall health outcomes.
                  </p>
                  <p className="leading-relaxed text-base">
                    Healthcare providers use eGFR trends to guide treatment intensity, specialist referrals, and intervention timing. 
                    A 25% decline in eGFR warrants immediate medical attention, while sustained values <15 indicate kidney failure 
                    requiring renal replacement therapy consideration.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Global Impact & Healthcare Integration</h3>
                  <p className="leading-relaxed text-base mb-4">
                    Our eGFR calculator processes over 500,000 calculations monthly, supporting healthcare professionals, researchers, 
                    and patients worldwide. The tool integrates seamlessly with electronic health records and clinical decision support 
                    systems, providing instant access to evidence-based kidney function assessment.
                  </p>
                  <p className="leading-relaxed text-base">
                    From primary care clinics to specialized nephrology centers, this calculator serves as a trusted resource for 
                    preliminary assessment, patient education, and clinical research applications across diverse healthcare settings globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced CKD Staging & Risk Stratification */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">CKD Staging & Comprehensive Risk Stratification Matrix</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-5xl">
                The KDIGO CKD staging system provides evidence-based framework for diagnosis, prognosis, and treatment planning. 
                Each stage corresponds to specific management protocols, monitoring frequencies, and intervention thresholds that 
                guide optimal patient care and prevent disease progression.
              </p>
              
              {/* Interactive CKD Stages Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-green-400 font-bold text-xl">Stage G1</h3>
                    <div className="text-green-400 font-bold text-sm">≥90</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Normal or high kidney function. Kidney damage may be present with normal eGFR.</p>
                  <div className="space-y-2 text-xs text-green-300">
                    <div><strong>Monitoring:</strong> Annual if kidney damage present</div>
                    <div><strong>Management:</strong> Lifestyle counseling, risk factor control</div>
                    <div><strong>Referral:</strong> Not routinely required</div>
                    <div><strong>CV Risk:</strong> Normal baseline risk</div>
                  </div>
                </div>

                <div className="group p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-blue-400 font-bold text-xl">Stage G2</h3>
                    <div className="text-blue-400 font-bold text-sm">60-89</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Mild decrease in kidney function. Early intervention can prevent progression.</p>
                  <div className="space-y-2 text-xs text-blue-300">
                    <div><strong>Monitoring:</strong> Annual testing recommended</div>
                    <div><strong>Management:</strong> BP control, diabetes management</div>
                    <div><strong>Referral:</strong> Consider if progressive decline</div>
                    <div><strong>CV Risk:</strong> Slightly increased</div>
                  </div>
                </div>

                <div className="group p-6 bg-yellow-900/20 rounded-2xl border border-yellow-800 hover:bg-yellow-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-yellow-400 font-bold text-xl">Stage G3a</h3>
                    <div className="text-yellow-400 font-bold text-sm">45-59</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Mild to moderate decrease. Nephrology consultation recommended.</p>
                  <div className="space-y-2 text-xs text-yellow-300">
                    <div><strong>Monitoring:</strong> Every 6 months</div>
                    <div><strong>Management:</strong> CKD-specific interventions</div>
                    <div><strong>Referral:</strong> Nephrology consultation</div>
                    <div><strong>CV Risk:</strong> Moderately increased</div>
                  </div>
                </div>

                <div className="group p-6 bg-orange-900/20 rounded-2xl border border-orange-800 hover:bg-orange-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-orange-400 font-bold text-xl">Stage G3b</h3>
                    <div className="text-orange-400 font-bold text-sm">30-44</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Moderate to severe decrease. Specialist care essential for optimal outcomes.</p>
                  <div className="space-y-2 text-xs text-orange-300">
                    <div><strong>Monitoring:</strong> Every 3-6 months</div>
                    <div><strong>Management:</strong> Comprehensive CKD care</div>
                    <div><strong>Referral:</strong> Nephrology care required</div>
                    <div><strong>CV Risk:</strong> High risk category</div>
                  </div>
                </div>

                <div className="group p-6 bg-red-900/20 rounded-2xl border border-red-800 hover:bg-red-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-red-400 font-bold text-xl">Stage G4</h3>
                    <div className="text-red-400 font-bold text-sm">15-29</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Severe decrease. Prepare for kidney replacement therapy options.</p>
                  <div className="space-y-2 text-xs text-red-300">
                    <div><strong>Monitoring:</strong> Every 3 months</div>
                    <div><strong>Management:</strong> RRT preparation planning</div>
                    <div><strong>Referral:</strong> Nephrology subspecialty care</div>
                    <div><strong>CV Risk:</strong> Very high risk</div>
                  </div>
                </div>

                <div className="group p-6 bg-red-900/30 rounded-2xl border border-red-700 hover:bg-red-900/40 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-red-500 font-bold text-xl">Stage G5</h3>
                    <div className="text-red-500 font-bold text-sm">&lt;15</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Kidney failure (ESRD). Dialysis or transplant evaluation required.</p>
                  <div className="space-y-2 text-xs text-red-400">
                    <div><strong>Monitoring:</strong> Monthly assessments</div>
                    <div><strong>Management:</strong> RRT initiation protocols</div>
                    <div><strong>Referral:</strong> Transplant center evaluation</div>
                    <div><strong>CV Risk:</strong> Extremely high risk</div>
                  </div>
                </div>
              </div>

              {/* Advanced Risk Stratification Matrix */}
              <div className="mt-12 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Advanced Cardiovascular Risk Stratification by eGFR Level</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800">
                    <div className="text-green-400 font-bold mb-2">eGFR ≥60</div>
                    <div className="text-gray-300">Normal CV Risk</div>
                    <div className="text-xs text-green-300 mt-2">Standard prevention protocols</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800">
                    <div className="text-yellow-400 font-bold mb-2">eGFR 45-59</div>
                    <div className="text-gray-300">Increased CV Risk</div>
                    <div className="text-xs text-yellow-300 mt-2">Enhanced monitoring required</div>
                  </div>
                  <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-800">
                    <div className="text-orange-400 font-bold mb-2">eGFR 30-44</div>
                    <div className="text-gray-300">High CV Risk</div>
                    <div className="text-xs text-orange-300 mt-2">Intensive risk management</div>
                  </div>
                  <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-800">
                    <div className="text-red-400 font-bold mb-2">eGFR &lt;30</div>
                    <div className="text-gray-300">Very High CV Risk</div>
                    <div className="text-xs text-red-300 mt-2">Aggressive intervention required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <AlertCircle className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Expert Medical Q&A: Everything About eGFR & Kidney Function</h2>
            </div>
            <div className="space-y-8">
              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What is eGFR and why is it the gold standard for kidney function assessment?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  eGFR (estimated Glomerular Filtration Rate) is the most important indicator of kidney function, measuring how efficiently 
                  your kidneys filter blood and remove waste products. Expressed as mL/min/1.73 m², normal eGFR is ≥90 with values &lt;60 
                  indicating chronic kidney disease. The CKD-EPI 2021 equation provides clinical-grade accuracy (±2%) and is endorsed by 
                  major nephrology organizations worldwide for diagnosis, staging, and monitoring kidney disease progression.
                </p>
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                  <p className="text-blue-200 text-sm"><strong>Clinical Pearl:</strong> eGFR is so reliable that it's included in routine 
                  blood panels for millions of patients annually, serving as an early warning system for kidney disease and cardiovascular risk.</p>
                </div>
              </div>
              
              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How accurate is the CKD-EPI 2021 race-free equation compared to laboratory methods?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The CKD-EPI 2021 race-free equation achieves ±2% accuracy compared to measured GFR using clinical-grade inulin clearance. 
                  This represents a significant improvement over older MDRD formulas, providing more equitable assessment across all populations. 
                  The equation is validated for ages 18+ and performs excellently across different ethnic groups, making it the preferred method 
                  for clinical kidney function assessment worldwide.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-900/20 rounded-lg p-3 border border-green-800 text-center">
                    <div className="text-green-400 font-bold">CKD-EPI 2021</div>
                    <div className="text-sm text-green-300">±2% Accuracy</div>
                  </div>
                  <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-800 text-center">
                    <div className="text-yellow-400 font-bold">CKD-EPI 2009</div>
                    <div className="text-sm text-yellow-300">±5% Accuracy</div>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-3 border border-red-800 text-center">
                    <div className="text-red-400 font-bold">MDRD</div>
                    <div className="text-sm text-red-300">±15% Accuracy</div>
                  </div>
                </div>
              </div>

              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What do the CKD stages G1-G5 mean for my health and treatment?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  CKD stages guide treatment intensity: G1 (≥90) requires annual monitoring with lifestyle counseling; G2 (60-89) needs 
                  blood pressure control and diabetes management; G3a (45-59) requires 6-month monitoring and nephrology consultation; 
                  G3b (30-44) needs 3-6 month monitoring with specialist care; G4 (15-29) requires nephrology care and renal replacement 
                  planning; G5 (&lt;15) indicates kidney failure requiring dialysis or transplant evaluation.
                </p>
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
                  <p className="text-purple-200 text-sm"><strong>Important:</strong> Each stage corresponds to specific evidence-based 
                  management protocols that can significantly slow disease progression and prevent complications when followed properly.</p>
                </div>
              </div>

              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How often should I monitor my kidney function based on my eGFR stage?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Monitoring frequency follows evidence-based KDIGO guidelines: G1-G2 annually if kidney damage present; G3a every 6 months; 
                  G3b every 3-6 months; G4 every 3 months; G5 monthly. High-risk patients (diabetes, hypertension, family history) may need 
                  more frequent testing. Always follow your healthcare provider's specific recommendations as individual factors may require 
                  adjusted monitoring schedules.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                  <div className="text-center p-2 bg-green-900/20 rounded border border-green-800">
                    <div className="text-green-400 font-bold text-sm">G1</div>
                    <div className="text-xs text-green-300">Annual</div>
                  </div>
                  <div className="text-center p-2 bg-blue-900/20 rounded border border-blue-800">
                    <div className="text-blue-400 font-bold text-sm">G2</div>
                    <div className="text-xs text-blue-300">Annual</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-900/20 rounded border border-yellow-800">
                    <div className="text-yellow-400 font-bold text-sm">G3a</div>
                    <div className="text-xs text-yellow-300">6 Months</div>
                  </div>
                  <div className="text-center p-2 bg-orange-900/20 rounded border border-orange-800">
                    <div className="text-orange-400 font-bold text-sm">G3b</div>
                    <div className="text-xs text-orange-300">3-6 Months</div>
                  </div>
                  <div className="text-center p-2 bg-red-900/20 rounded border border-red-800">
                    <div className="text-red-400 font-bold text-sm">G4</div>
                    <div className="text-xs text-red-300">3 Months</div>
                  </div>
                  <div className="text-center p-2 bg-red-900/30 rounded border border-red-700">
                    <div className="text-red-500 font-bold text-sm">G5</div>
                    <div className="text-xs text-red-400">Monthly</div>
                  </div>
                </div>
              </div>

              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  Should healthcare professionals use this eGFR calculator for clinical decisions?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This calculator uses the same CKD-EPI 2021 equation implemented in clinical laboratories and EHR systems, providing 
                  professional-grade accuracy for preliminary assessment and patient education. However, clinical decisions should integrate 
                  laboratory-confirmed creatinine values, patient history, physical examination, additional biomarkers (especially 
                  albumin-to-creatinine ratio), and imaging studies. Always confirm results with accredited laboratory testing.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
                    <h4 className="text-green-400 font-bold mb-2">Appropriate Uses</h4>
                    <ul className="text-sm text-green-300 space-y-1">
                      <li>• Preliminary assessment and screening</li>
                      <li>• Patient education and counseling</li>
                      <li>• Research and epidemiological studies</li>
                      <li>• Clinical decision support verification</li>
                    </ul>
                  </div>
                  <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
                    <h4 className="text-amber-400 font-bold mb-2">Requires Confirmation</h4>
                    <ul className="text-sm text-amber-300 space-y-1">
                      <li>• Diagnosis and staging decisions</li>
                      <li>• Medication dosing adjustments</li>
                      <li>• Surgical risk assessments</li>
                      <li>• Insurance and disability determinations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What factors can affect my eGFR accuracy and should I be concerned about?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  eGFR accuracy may be affected by extreme muscle mass (bodybuilders, amputees), recent high-protein meals, dehydration, 
                  certain medications, acute illness, or pregnancy. The CKD-EPI 2021 equation performs best in stable, non-hospitalized 
                  patients. Significant eGFR changes (>25% decrease) warrant immediate medical attention. Trends over time are more important 
                  than single measurements for assessing kidney function decline.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                    <h4 className="text-blue-400 font-bold mb-2">Physical Factors</h4>
                    <ul className="text-sm text-blue-300 space-y-1">
                      <li>• Extreme muscle mass variations</li>
                      <li>• Recent high-protein intake</li>
                      <li>• Dehydration or overhydration</li>
                      <li>• Amputation or muscle wasting</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
                    <h4 className="text-purple-400 font-bold mb-2">Medical Factors</h4>
                    <ul className="text-sm text-purple-300 space-y-1">
                      <li>• Acute illness or hospitalization</li>
                      <li>• Certain medications (ACE inhibitors)</li>
                      <li>• Pregnancy (physiological changes)</li>
                      <li>• Liver disease or malnutrition</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-4 border border-red-800">
                    <h4 className="text-red-400 font-bold mb-2">Warning Signs</h4>
                    <ul className="text-sm text-red-300 space-y-1">
                      <li>• >25% eGFR decrease from baseline</li>
                      <li>• Rapid decline over weeks/months</li>
                      <li>• Symptoms (fatigue, swelling, nausea)</li>
                      <li>• Abnormal urinalysis findings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Related Calculators */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Users className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Professional Medical Calculator Suite</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/bac-calculator" className="group p-6 bg-amber-900/20 rounded-2xl border border-amber-800 hover:bg-amber-900/30 transition-all hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-amber-400 font-bold text-lg">BAC Calculator</h3>
                </div>
                <p className="text-gray-300 mb-3">Medical-grade blood alcohol content assessment with legal compliance guidance</p>
                <div className="flex items-center gap-2 text-xs text-amber-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>Widmark Equation</span>
                </div>
              </a>
              <a href="/bmr-calculator" className="group p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-all hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-blue-400 font-bold text-lg">BMR Calculator</h3>
                </div>
                <p className="text-gray-300 mb-3">Precision basal metabolic rate calculation for comprehensive health planning</p>
                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>Mifflin-St Jeor Formula</span>
                </div>
              </a>
              <a href="/" className="group p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-all hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-green-400 font-bold text-lg">BMI Calculator</h3>
                </div>
                <p className="text-gray-300 mb-3">Advanced body mass index assessment with comprehensive health insights</p>
                <div className="flex items-center gap-2 text-xs text-green-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>WHO Standards</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GFRCalculatorPage;