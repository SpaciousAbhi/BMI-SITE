import React from 'react';
import BACCalculator from '../components/BACCalculator';
import { Wine, AlertTriangle, Clock, Users, Scale, Activity } from 'lucide-react';

const BACCalculatorPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalRiskCalculator",
        "name": "BAC Calculator - Blood Alcohol Content Estimator",
        "description": "Calculate estimated blood alcohol content (BAC) using the Widmark equation for safety awareness and legal compliance. Includes impairment levels and safety warnings.",
        "url": "https://bmipro.netlify.app/bac-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "isAccessibleForFree": true,
        "creator": {
          "@type": "Organization",
          "name": "BMI Pro - Advanced Health Calculators",
          "url": "https://bmipro.netlify.app"
        },
        "about": {
          "@type": "MedicalCondition",
          "name": "Alcohol Impairment",
          "alternateName": "Blood Alcohol Content"
        },
        "featureList": [
          "Widmark equation calculation",
          "Multiple drink types and sizes",
          "Time-based metabolism calculation",
          "Legal status assessment",
          "Safety warnings and recommendations"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate are BAC calculators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BAC calculators provide estimates with ±20% variability due to individual factors like metabolism, food intake, medications, and health conditions. They should never replace professional breathalyzer or blood tests for legal or safety decisions."
            }
          },
          {
            "@type": "Question",
            "name": "What is the legal BAC limit for driving?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In most places, the legal BAC limit is 0.08% for adults 21+ years old. Some jurisdictions have lower limits (0.05%) or zero tolerance policies. Limits may be lower for commercial drivers or those under 21."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take for BAC to reach zero?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The body metabolizes alcohol at approximately 0.015% BAC per hour. Time to reach zero depends on peak BAC level. For example, 0.08% BAC would take about 5-6 hours to completely clear from your system."
            }
          },
          {
            "@type": "Question",
            "name": "Can I speed up alcohol metabolism?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you cannot speed up alcohol metabolism. Coffee, cold showers, exercise, or food do not accelerate the process. Only time allows your liver to process alcohol at its natural rate of about one standard drink per hour."
            }
          },
          {
            "@type": "Question",
            "name": "Should I rely on this calculator to decide if I can drive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely not. This calculator is for educational purposes only. Individual factors affect impairment significantly. When in doubt, don't drive. Always arrange alternative transportation if you've been drinking."
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "BAC Calculator",
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-red-500 rounded-3xl mb-6">
            <Wine className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BAC Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Estimate your blood alcohol content (BAC) using the Widmark equation for safety awareness and legal compliance. Remember: when in doubt, don't drive.
          </p>
        </div>

        {/* Calculator Component */}
        <BACCalculator />

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto mt-16 space-y-12">
          {/* About BAC Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Wine className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Understanding Blood Alcohol Content</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">What is BAC?</h3>
                <p className="leading-relaxed">
                  Blood Alcohol Content (BAC) measures the percentage of alcohol in your bloodstream. It's expressed as grams of alcohol per 100 milliliters of blood (g/100mL) or as a percentage. BAC determines your level of impairment and legal consequences for driving.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">The Widmark Equation</h3>
                <p className="leading-relaxed">
                  The Widmark equation estimates BAC based on alcohol consumed, body weight, gender, and time elapsed. It accounts for the body's water distribution differences between men and women, and the liver's natural metabolism rate of approximately 0.015% per hour.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Legal Implications</h3>
                <p className="leading-relaxed">
                  Legal BAC limits vary by jurisdiction but commonly range from 0.05% to 0.08% for adults. Commercial drivers often face lower limits (0.04%), and many places enforce zero tolerance for drivers under 21. Penalties increase with higher BAC levels.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Safety Considerations</h3>
                <p className="leading-relaxed">
                  Impairment begins well below legal limits. Even small amounts of alcohol affect judgment, reaction time, and coordination. Individual factors like medications, fatigue, and health conditions can significantly increase impairment levels.
                </p>
              </div>
            </div>
          </div>

          {/* Impairment Levels Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">BAC Levels & Impairment Effects</h2>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                  <h3 className="text-green-400 font-semibold mb-2">0.00% - Sober</h3>
                  <p className="text-gray-300 text-sm">No measurable alcohol. Normal judgment and coordination.</p>
                </div>
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <h3 className="text-blue-400 font-semibold mb-2">0.01-0.02% - Minimal</h3>
                  <p className="text-gray-300 text-sm">Slight relaxation, some loss of judgment. Generally legal to drive.</p>
                </div>
                <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800">
                  <h3 className="text-yellow-400 font-semibold mb-2">0.02-0.05% - Mild</h3>
                  <p className="text-gray-300 text-sm">Exaggerated behavior, impaired judgment, reduced reaction time.</p>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800">
                  <h3 className="text-orange-400 font-semibold mb-2">0.05-0.08% - Moderate</h3>
                  <p className="text-gray-300 text-sm">Coordination problems, balance issues, speech and vision affected.</p>
                </div>
                <div className="p-4 bg-red-900/20 rounded-lg border border-red-800">
                  <h3 className="text-red-400 font-semibold mb-2">0.08-0.15% - Severe</h3>
                  <p className="text-gray-300 text-sm">Major motor control loss, vomiting, mental confusion. Illegal everywhere.</p>
                </div>
                <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
                  <h3 className="text-red-500 font-semibold mb-2">0.15%+ - Critical</h3>
                  <p className="text-gray-300 text-sm">Risk of coma, death, alcohol poisoning. Emergency medical attention needed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Factors Affecting BAC */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Factors Affecting Blood Alcohol Content</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Physical Factors</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>Body Weight:</strong> Lower weight = higher BAC</li>
                  <li>• <strong>Gender:</strong> Women typically have higher BAC than men</li>
                  <li>• <strong>Body Fat:</strong> Higher fat percentage = higher BAC</li>
                  <li>• <strong>Age:</strong> Older adults process alcohol more slowly</li>
                  <li>• <strong>Genetics:</strong> Enzyme variations affect metabolism</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Consumption Factors</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>Amount:</strong> More alcohol = higher BAC</li>
                  <li>• <strong>Rate:</strong> Drinking quickly increases peak BAC</li>
                  <li>• <strong>Alcohol Type:</strong> Different concentrations affect absorption</li>
                  <li>• <strong>Food Intake:</strong> Food slows alcohol absorption</li>
                  <li>• <strong>Carbonation:</strong> Speeds up absorption rate</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Health Factors</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>Medications:</strong> Can increase impairment</li>
                  <li>• <strong>Fatigue:</strong> Amplifies alcohol effects</li>
                  <li>• <strong>Illness:</strong> Affects metabolism and tolerance</li>
                  <li>• <strong>Liver Health:</strong> Impacts processing ability</li>
                  <li>• <strong>Tolerance:</strong> Regular drinkers may feel less impaired</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  How accurate are BAC calculators?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  BAC calculators provide estimates with ±20% variability due to individual factors like metabolism, food intake, medications, and health conditions. They should never replace professional breathalyzer or blood tests for legal or safety decisions.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  What is the legal BAC limit for driving?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  In most places, the legal BAC limit is 0.08% for adults 21+ years old. Some jurisdictions have lower limits (0.05%) or zero tolerance policies. Limits may be lower for commercial drivers or those under 21. Always check local laws.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  How long does it take for BAC to reach zero?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The body metabolizes alcohol at approximately 0.015% BAC per hour. Time to reach zero depends on peak BAC level. For example, 0.08% BAC would take about 5-6 hours to completely clear from your system.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Can I speed up alcohol metabolism?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  No, you cannot speed up alcohol metabolism. Coffee, cold showers, exercise, or food do not accelerate the process. Only time allows your liver to process alcohol at its natural rate of about one standard drink per hour.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Should I rely on this calculator to decide if I can drive?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Absolutely not. This calculator is for educational purposes only. Individual factors affect impairment significantly. When in doubt, don't drive. Always arrange alternative transportation if you've been drinking.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-white">Related Health Calculators</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/gfr-calculator" className="p-4 bg-blue-900/20 rounded-lg border border-blue-800 hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-blue-400 font-semibold">GFR Calculator</h3>
                </div>
                <p className="text-gray-300 text-sm">Calculate kidney function and CKD staging</p>
              </a>
              <a href="/bmr-calculator" className="p-4 bg-green-900/20 rounded-lg border border-green-800 hover:bg-green-900/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-green-400 font-semibold">BMR Calculator</h3>
                </div>
                <p className="text-gray-300 text-sm">Calculate basal metabolic rate for health planning</p>
              </a>
              <a href="/" className="p-4 bg-purple-900/20 rounded-lg border border-purple-800 hover:bg-purple-900/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-purple-400 font-semibold">BMI Calculator</h3>
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

export default BACCalculatorPage;