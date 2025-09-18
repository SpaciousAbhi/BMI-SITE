import React from 'react';
import BACCalculator from '../components/BACCalculator';
import { Wine, AlertTriangle, Clock, Users, Scale, Activity, Shield, Gavel, Heart, BookOpen } from 'lucide-react';

const BACCalculatorPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalRiskEstimator",
        "name": "BAC Calculator - Blood Alcohol Content Estimator with Legal Safety Information",
        "description": "Calculate estimated blood alcohol content (BAC) using the Widmark equation for safety awareness and legal compliance. Includes impairment levels, legal limits by jurisdiction, DUI consequences, and comprehensive safety warnings for responsible alcohol consumption.",
        "url": "https://bmipro.netlify.app/bac-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "isAccessibleForFree": true,
        "creator": {
          "@type": "Organization",
          "name": "BMI Pro - Advanced Health Calculators",
          "url": "https://bmipro.netlify.app"
        },
        "about": [
          {
            "@type": "MedicalCondition",
            "name": "Alcohol Impairment",
            "alternateName": ["Blood Alcohol Content", "Alcohol Intoxication", "BAC Level"]
          },
          {
            "@type": "MedicalRiskFactor",
            "name": "Alcohol Consumption Risk Assessment"
          }
        ],
        "featureList": [
          "Widmark equation calculation with enhanced precision",
          "Multiple drink types and alcohol concentrations",
          "Time-based metabolism calculation",
          "Legal status assessment by jurisdiction",
          "DUI legal limit warnings",
          "Safety recommendations and alternative transportation advice",
          "Enhanced accessibility and mobile optimization"
        ],
        "medicalRiskFactors": [
          "Alcohol impairment levels",
          "Legal blood alcohol limits",
          "DUI consequences and penalties",
          "Alcohol metabolism variations"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate are BAC calculators for determining if I can drive safely?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BAC calculators provide estimates with ±20% variability and should never be used to determine if it's safe to drive. Individual factors like metabolism, food intake, medications, health conditions, and fatigue significantly affect impairment levels. Professional breathalyzer or blood tests are required for legal accuracy. When in doubt, don't drive - always arrange alternative transportation after consuming alcohol."
            }
          },
          {
            "@type": "Question",
            "name": "What is the legal BAC limit for driving in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In most US states, the legal BAC limit is 0.08% for adults 21+ years old. However, limits vary: some states have lower limits (0.05%), commercial drivers face 0.04% limits, and drivers under 21 have zero tolerance policies. Many countries have 0.05% limits. Enhanced penalties apply for BAC levels above 0.15%. Always check local laws as they vary by jurisdiction and can change."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take for BAC to reach zero after drinking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The body metabolizes alcohol at approximately 0.015% BAC per hour (about one standard drink per hour). Time to reach zero depends on peak BAC level. For example, 0.08% BAC would take about 5-6 hours to completely clear. Factors like food, medications, age, and health can affect this rate. Nothing can speed up alcohol metabolism - coffee, cold showers, or exercise don't help."
            }
          },
          {
            "@type": "Question",
            "name": "What are the consequences of driving with elevated BAC levels?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DUI consequences include license suspension, fines ($1,000-$10,000+), jail time, mandatory alcohol education, ignition interlock devices, increased insurance rates, and criminal records. Penalties increase with higher BAC levels and repeat offenses. BAC above 0.15% often results in enhanced penalties. Professional licenses may be affected, and some jobs require disclosure of DUI convictions."
            }
          },
          {
            "@type": "Question",
            "name": "Can I speed up alcohol metabolism to reduce my BAC faster?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you cannot speed up alcohol metabolism. Your liver processes alcohol at a fixed rate of about 0.015% BAC per hour regardless of coffee consumption, cold showers, exercise, vomiting, or other home remedies. Only time allows your body to eliminate alcohol. Attempting to 'sober up quickly' can be dangerous and create false confidence about impairment levels."
            }
          },
          {
            "@type": "Question",
            "name": "Should I rely on this BAC calculator to decide if I can drive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely not. This calculator is for educational purposes only and should never replace professional testing or personal judgment about driving safety. Individual factors affect impairment significantly beyond what any calculator can account for. The safest approach is to never drive after drinking any amount of alcohol. Always arrange alternative transportation like rideshare, taxi, designated driver, or public transportation."
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "BAC Calculator Widmark Equation",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "permissions": "none",
        "isAccessibleForFree": true,
        "accessibilityFeature": [
          "ARIA labels",
          "keyboard navigation",
          "screen reader support",
          "high contrast mode",
          "large touch targets",
          "safety warnings"
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
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 to-red-500 rounded-3xl mb-8 shadow-2xl">
            <Wine className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            BAC Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Estimate your blood alcohol content (BAC) using the Widmark equation for safety awareness and legal compliance. 
            Remember: when in doubt, don't drive.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-amber-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Widmark Equation</span>
            </div>
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4" />
              <span>Legal Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Safety Education</span>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <BACCalculator />

        {/* Enhanced Educational Content */}
        <div className="max-w-7xl mx-auto mt-20 space-y-16">
          {/* About BAC Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Wine className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Understanding Blood Alcohol Content</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10 text-gray-300">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-4">What is BAC?</h3>
                  <p className="leading-relaxed text-base">
                    Blood Alcohol Content (BAC) measures the percentage of alcohol in your bloodstream, expressed as grams of alcohol 
                    per 100 milliliters of blood (g/100mL) or as a percentage. BAC determines your level of impairment, legal 
                    consequences for driving, and health risks. It's the standard measurement used by law enforcement and medical professionals worldwide.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-4">The Widmark Equation</h3>
                  <p className="leading-relaxed text-base">
                    The Widmark equation, developed by Swedish scientist Erik Widmark in 1932, estimates BAC based on alcohol consumed, 
                    body weight, biological sex, and time elapsed. It accounts for body water distribution differences between men and women 
                    and the liver's natural metabolism rate of approximately 0.015% per hour.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-4">Legal Implications & DUI Laws</h3>
                  <p className="leading-relaxed text-base">
                    Legal BAC limits vary by jurisdiction but commonly range from 0.05% to 0.08% for adults. Commercial drivers often face 
                    lower limits (0.04%), and many places enforce zero tolerance for drivers under 21. Penalties escalate with higher BAC levels, 
                    with enhanced charges typically starting at 0.15% BAC or higher.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-4">Critical Safety Considerations</h3>
                  <p className="leading-relaxed text-base">
                    Impairment begins well below legal limits, affecting judgment, reaction time, and coordination. Individual factors like 
                    medications, fatigue, health conditions, and food intake can significantly increase impairment levels. BAC calculators 
                    should never be used to determine driving safety - always choose alternative transportation after drinking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Impairment Levels Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">BAC Levels, Impairment Effects & Legal Consequences</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                Understanding BAC levels and their effects is crucial for safety and legal compliance. Each level brings increasing 
                impairment and legal risks, with severe consequences for driving under the influence.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-colors">
                  <h3 className="text-green-400 font-bold text-lg mb-3">0.00% - Sober</h3>
                  <p className="text-gray-300 text-sm mb-4">No measurable alcohol. Normal judgment, coordination, and reaction time.</p>
                  <div className="text-xs text-green-300">
                    <strong>Legal Status:</strong> Safe to drive everywhere<br />
                    <strong>Risk Level:</strong> None
                  </div>
                </div>
                <div className="p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-colors">
                  <h3 className="text-blue-400 font-bold text-lg mb-3">0.01-0.02% - Minimal</h3>
                  <p className="text-gray-300 text-sm mb-4">Slight relaxation, some loss of judgment. Generally legal to drive in most places.</p>
                  <div className="text-xs text-blue-300">
                    <strong>Legal Status:</strong> Legal for most adults<br />
                    <strong>Risk Level:</strong> Some impairment present
                  </div>
                </div>
                <div className="p-6 bg-yellow-900/20 rounded-2xl border border-yellow-800 hover:bg-yellow-900/30 transition-colors">
                  <h3 className="text-yellow-400 font-bold text-lg mb-3">0.02-0.05% - Mild</h3>
                  <p className="text-gray-300 text-sm mb-4">Exaggerated behavior, impaired judgment, reduced reaction time, coordination affected.</p>
                  <div className="text-xs text-yellow-300">
                    <strong>Legal Status:</strong> Illegal in some countries, commercial drivers<br />
                    <strong>Risk Level:</strong> Significant impairment, avoid driving
                  </div>
                </div>
                <div className="p-6 bg-orange-900/20 rounded-2xl border border-orange-800 hover:bg-orange-900/30 transition-colors">
                  <h3 className="text-orange-400 font-bold text-lg mb-3">0.05-0.08% - Moderate</h3>
                  <p className="text-gray-300 text-sm mb-4">Coordination problems, balance issues, speech and vision affected, reasoning impaired.</p>
                  <div className="text-xs text-orange-300">
                    <strong>Legal Status:</strong> Approaching/at legal limit<br />
                    <strong>Risk Level:</strong> High impairment, never drive
                  </div>
                </div>
                <div className="p-6 bg-red-900/20 rounded-2xl border border-red-800 hover:bg-red-900/30 transition-colors">
                  <h3 className="text-red-400 font-bold text-lg mb-3">0.08-0.15% - Severe</h3>
                  <p className="text-gray-300 text-sm mb-4">Major motor control loss, vomiting, mental confusion, severely impaired judgment.</p>
                  <div className="text-xs text-red-300">
                    <strong>Legal Status:</strong> Illegal everywhere, DUI charges<br />
                    <strong>Risk Level:</strong> Dangerous, seek assistance
                  </div>
                </div>
                <div className="p-6 bg-red-900/30 rounded-2xl border border-red-700 hover:bg-red-900/40 transition-colors">
                  <h3 className="text-red-500 font-bold text-lg mb-3">0.15%+ - Critical</h3>
                  <p className="text-gray-300 text-sm mb-4">Risk of coma, death, alcohol poisoning, respiratory depression.</p>
                  <div className="text-xs text-red-400">
                    <strong>Legal Status:</strong> Medical emergency<br />
                    <strong>Risk Level:</strong> Life-threatening, call 911
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Legal Consequences Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Gavel className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">DUI Legal Consequences & Penalties by BAC Level</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                DUI penalties vary by state and BAC level, but consequences are severe and long-lasting. Understanding these penalties 
                can help emphasize the importance of never driving after drinking.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-yellow-900/20 rounded-2xl border border-yellow-800">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">First-Time DUI (0.08-0.14%)</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• License suspension: 3-12 months</li>
                    <li>• Fines: $500-$2,000+</li>
                    <li>• Possible jail: 1-6 months</li>
                    <li>• Alcohol education programs</li>
                    <li>• SR-22 insurance requirement</li>
                    <li>• Criminal record</li>
                  </ul>
                </div>
                <div className="p-6 bg-orange-900/20 rounded-2xl border border-orange-800">
                  <h3 className="text-orange-400 font-bold text-lg mb-4">Enhanced DUI (0.15%+)</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• License suspension: 6-18 months</li>
                    <li>• Fines: $1,000-$5,000+</li>
                    <li>• Jail time: 2-12 months</li>
                    <li>• Ignition interlock device</li>
                    <li>• Extended probation</li>
                    <li>• Vehicle impoundment</li>
                  </ul>
                </div>
                <div className="p-6 bg-red-900/20 rounded-2xl border border-red-800">
                  <h3 className="text-red-400 font-bold text-lg mb-4">Repeat Offenses</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• License revocation: 1-5 years</li>
                    <li>• Fines: $2,000-$10,000+</li>
                    <li>• Prison time: 30 days-5 years</li>
                    <li>• Felony charges possible</li>
                    <li>• Vehicle forfeiture</li>
                    <li>• Permanent criminal record</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">Additional Long-Term Consequences</h4>
                <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm">
                  <div>
                    <h5 className="font-semibold text-red-300 mb-2">Professional Impact</h5>
                    <ul className="space-y-1">
                      <li>• Job loss or career limitations</li>
                      <li>• Professional license suspension</li>
                      <li>• Background check failures</li>
                      <li>• Security clearance loss</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-300 mb-2">Financial Impact</h5>
                    <ul className="space-y-1">
                      <li>• Insurance rate increases (3-5 years)</li>
                      <li>• Total costs: $10,000-$25,000+</li>
                      <li>• Legal fees and court costs</li>
                      <li>• Lost wages from jail/probation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Factors Affecting BAC */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Scale className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Factors Affecting Blood Alcohol Content Accuracy</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                BAC calculations can vary significantly based on individual factors. Understanding these variables helps explain 
                why calculators provide estimates only and why professional testing is required for legal purposes.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Physical Factors</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li>• <strong>Body Weight:</strong> Lower weight typically results in higher BAC</li>
                    <li>• <strong>Biological Sex:</strong> Women typically have higher BAC than men at same consumption</li>
                    <li>• <strong>Body Fat Percentage:</strong> Higher fat percentage leads to higher BAC</li>
                    <li>• <strong>Age:</strong> Older adults process alcohol more slowly</li>
                    <li>• <strong>Genetics:</strong> Enzyme variations significantly affect metabolism</li>
                    <li>• <strong>Muscle Mass:</strong> Higher muscle mass can affect alcohol distribution</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Consumption Factors</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li>• <strong>Amount Consumed:</strong> More alcohol equals higher peak BAC</li>
                    <li>• <strong>Drinking Rate:</strong> Rapid consumption increases peak BAC</li>
                    <li>• <strong>Alcohol Type:</strong> Different concentrations affect absorption</li>
                    <li>• <strong>Food Intake:</strong> Food significantly slows alcohol absorption</li>
                    <li>• <strong>Carbonation:</strong> Speeds up absorption rate into bloodstream</li>
                    <li>• <strong>Drink Mixing:</strong> Multiple types can affect absorption patterns</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Health & Lifestyle Factors</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li>• <strong>Medications:</strong> Can significantly increase impairment effects</li>
                    <li>• <strong>Fatigue:</strong> Amplifies alcohol effects and impairment</li>
                    <li>• <strong>Illness:</strong> Affects metabolism and alcohol tolerance</li>
                    <li>• <strong>Liver Health:</strong> Directly impacts alcohol processing ability</li>
                    <li>• <strong>Tolerance:</strong> Regular drinkers may feel less impaired</li>
                    <li>• <strong>Hydration:</strong> Dehydration can increase BAC levels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Clock className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How accurate are BAC calculators for determining if I can drive safely?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  BAC calculators provide estimates with ±20% variability and should never be used to determine if it's safe to drive. 
                  Individual factors like metabolism, food intake, medications, health conditions, and fatigue significantly affect impairment levels. 
                  Professional breathalyzer or blood tests are required for legal accuracy. When in doubt, don't drive - always arrange 
                  alternative transportation after consuming alcohol.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What is the legal BAC limit for driving in 2025?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  In most US states, the legal BAC limit is 0.08% for adults 21+ years old. However, limits vary: some states have lower limits (0.05%), 
                  commercial drivers face 0.04% limits, and drivers under 21 have zero tolerance policies. Many countries have 0.05% limits. 
                  Enhanced penalties apply for BAC levels above 0.15%. Always check local laws as they vary by jurisdiction and can change.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How long does it take for BAC to reach zero after drinking?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The body metabolizes alcohol at approximately 0.015% BAC per hour (about one standard drink per hour). Time to reach zero 
                  depends on peak BAC level. For example, 0.08% BAC would take about 5-6 hours to completely clear. Factors like food, 
                  medications, age, and health can affect this rate. Nothing can speed up alcohol metabolism - coffee, cold showers, or exercise don't help.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What are the consequences of driving with elevated BAC levels?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  DUI consequences include license suspension, fines ($1,000-$10,000+), jail time, mandatory alcohol education, ignition interlock devices, 
                  increased insurance rates, and criminal records. Penalties increase with higher BAC levels and repeat offenses. BAC above 0.15% often 
                  results in enhanced penalties. Professional licenses may be affected, and some jobs require disclosure of DUI convictions.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  Can I speed up alcohol metabolism to reduce my BAC faster?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  No, you cannot speed up alcohol metabolism. Your liver processes alcohol at a fixed rate of about 0.015% BAC per hour 
                  regardless of coffee consumption, cold showers, exercise, vomiting, or other home remedies. Only time allows your body to 
                  eliminate alcohol. Attempting to 'sober up quickly' can be dangerous and create false confidence about impairment levels.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Users className="w-8 h-8 text-teal-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Related Medical Calculators</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/gfr-calculator" className="group p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-all hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-blue-400 font-bold text-lg">GFR Calculator</h3>
                </div>
                <p className="text-gray-300">Calculate kidney function and chronic kidney disease staging</p>
              </a>
              <a href="/bmr-calculator" className="group p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-all hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-green-400 font-bold text-lg">BMR Calculator</h3>
                </div>
                <p className="text-gray-300">Calculate basal metabolic rate for comprehensive health planning</p>
              </a>
              <a href="/" className="group p-6 bg-purple-900/20 rounded-2xl border border-purple-800 hover:bg-purple-900/30 transition-all hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-purple-400 font-bold text-lg">BMI Calculator</h3>
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

export default BACCalculatorPage;