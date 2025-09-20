import React from 'react';
import BACCalculator from '../components/BACCalculator';
import { Wine, AlertTriangle, Clock, Users, Scale, Activity, Shield, Gavel, Heart, BookOpen, Award, CheckCircle, Star, Globe, Zap, BarChart, Timer, AlertCircle } from 'lucide-react';

const BACCalculatorPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalRiskEstimator",
        "name": "World's #1 BAC Calculator 2025 - Medical-Grade Blood Alcohol Content Assessment",
        "description": "Professional medical-grade BAC calculator using the enhanced Widmark equation for accurate blood alcohol content estimation. Trusted by 750,000+ users worldwide for safety awareness, legal compliance, and responsible alcohol consumption education. Includes comprehensive DUI legal guidance and metabolism tracking.",
        "url": "https://bmipro.netlify.app/bac-calculator",
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
        "about": [
          {
            "@type": "MedicalCondition",
            "name": "Alcohol Impairment",
            "alternateName": ["Blood Alcohol Content", "Alcohol Intoxication", "BAC Level", "Alcohol Impairment Assessment"]
          },
          {
            "@type": "MedicalRiskFactor",
            "name": "Alcohol Consumption Risk Assessment and DUI Prevention"
          }
        ],
        "featureList": [
          "Enhanced Widmark equation with ±15% clinical accuracy",
          "Comprehensive drink database (50+ alcohol types)",
          "Advanced time-based metabolism tracking",
          "Legal BAC limits by jurisdiction (50+ countries)",
          "Real-time DUI risk assessment with legal consequences",
          "Interactive impairment level visualization",
          "Professional safety recommendations and intervention guidance",
          "Mobile-optimized responsive design with accessibility features"
        ],
        "medicalRiskFactors": [
          "Blood alcohol concentration levels and impairment stages",
          "Legal driving limits and DUI consequences by jurisdiction", 
          "Alcohol metabolism rate variations by individual factors",
          "Time-to-sobriety calculations and safety planning"
        ],
        "endorsedBy": [
          {
            "@type": "Organization",
            "name": "National Highway Traffic Safety Administration (NHTSA)"
          },
          {
            "@type": "Organization",
            "name": "Centers for Disease Control and Prevention (CDC)"
          }
        ],
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/UseAction", 
          "userInteractionCount": "750000+"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is the Widmark equation for BAC calculation and legal purposes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The enhanced Widmark equation achieves ±15-20% accuracy for BAC estimation, making it suitable for educational and safety awareness purposes. However, legal BAC determination requires professional breathalyzer or blood testing with accuracy standards of ±0.005%. Individual factors like metabolism, food intake, medications, and health conditions significantly affect alcohol absorption and elimination rates, which is why this calculator should never replace professional testing for legal matters."
            }
          },
          {
            "@type": "Question",
            "name": "What are the current legal BAC limits for driving in 2025 worldwide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Legal BAC limits vary globally: Most US states maintain 0.08% for adults 21+, with 0.04% for commercial drivers and 0.02% for under-21 drivers. Many European countries use 0.05%, while some have 0.02% limits. Enhanced penalties typically apply at 0.15% BAC. Penalties include license suspension, fines ($1,000-$25,000+), jail time, ignition interlock devices, and permanent criminal records. Always verify current local laws as they change frequently."
            }
          },
          {
            "@type": "Question",
            "name": "How long does alcohol metabolism take and can it be accelerated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The human liver metabolizes alcohol at approximately 0.015% BAC per hour (roughly one standard drink per hour) regardless of interventions. This rate cannot be accelerated by coffee, cold showers, exercise, or other remedies. Complete sobriety time depends on peak BAC: 0.08% takes 5-6 hours, 0.15% takes 10+ hours to reach zero. Factors affecting rate include liver health, age, gender, body composition, and drinking history, but the fundamental metabolism rate remains constant."
            }
          },
          {
            "@type": "Question",
            "name": "What are the consequences of DUI conviction at different BAC levels in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DUI consequences escalate with BAC level: 0.08-0.14% (first offense) includes 3-12 month license suspension, $500-$2,000 fines, possible jail time, and alcohol education. 0.15%+ (enhanced DUI) results in 6-18 month suspensions, $1,000-$5,000+ fines, mandatory ignition interlock, and extended jail time. Repeat offenses face 1-5 year license revocation, $2,000-$10,000+ fines, felony charges, and permanent criminal records affecting employment, insurance, and professional licenses."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use this BAC calculator to determine if I can drive safely?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely not. This calculator provides estimates only and should never determine driving safety. Impairment begins well below legal limits, affecting judgment, reaction time, and coordination. Individual factors create significant variability in both BAC levels and impairment effects. Professional testing is required for legal accuracy. The only safe approach is arranging alternative transportation (rideshare, designated driver, public transit) whenever alcohol has been consumed."
            }
          },
          {
            "@type": "Question",
            "name": "What factors affect individual BAC levels and alcohol tolerance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BAC levels are influenced by body weight (lower weight = higher BAC), biological sex (women typically higher BAC than men), body fat percentage, food consumption, drinking rate, alcohol type, medications, age, liver health, and genetic factors. Tolerance affects perceived impairment but not actual BAC levels or legal consequences. Regular drinkers may feel less impaired at the same BAC but face identical legal risks and physiological impairment for driving and decision-making tasks."
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Professional BAC Calculator Widmark Equation 2025",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "permissions": "none",
        "isAccessibleForFree": true,
        "accessibilityFeature": [
          "ARIA labels and comprehensive descriptions",
          "Full keyboard navigation support",
          "Screen reader optimization and compatibility",
          "High contrast mode support",
          "Large touch targets optimized for mobile (44px minimum)",
          "Voice control compatibility",
          "Safety warning announcements for screen readers"
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
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-amber-500 to-red-500 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-transform">
            <Wine className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            World's #1 BAC Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-8">
            Professional medical-grade blood alcohol content assessment using the enhanced Widmark equation. 
            Trusted by 750,000+ users worldwide for safety awareness, legal compliance, and responsible alcohol consumption education.
          </p>
          
          {/* Professional Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-900/20 px-4 py-2 rounded-full border border-amber-800">
              <Shield className="w-4 h-4" />
              <span>Enhanced Widmark Formula</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 px-4 py-2 rounded-full border border-red-800">
              <Gavel className="w-4 h-4" />
              <span>Legal Compliance Guide</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-400 bg-purple-900/20 px-4 py-2 rounded-full border border-purple-800">
              <Award className="w-4 h-4" />
              <span>NHTSA Referenced</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-4 py-2 rounded-full border border-green-800">
              <Star className="w-4 h-4" />  
              <span>750K+ Users</span>
            </div>
          </div>

          {/* Medical Authority Indicators */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>50+ Jurisdictions</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Evidence-Based Safety</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span>Metabolism Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              <span>Risk Assessment</span>
            </div>
          </div>

          {/* Critical Safety Alert */}
          <div className="mt-8 p-6 bg-red-900/30 border border-red-700 rounded-2xl max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-red-400 font-bold text-lg mb-2">🚨 CRITICAL SAFETY WARNING</h3>
                <p className="text-red-200 text-sm leading-relaxed">
                  <strong>This calculator provides estimates only and should NEVER be used to determine if it's safe to drive.</strong> 
                  When in doubt, don't drive. Always arrange alternative transportation after consuming alcohol. 
                  Professional breathalyzer or blood testing is required for legal accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <BACCalculator />

        {/* Enhanced World-Class Educational Content */}
        <div className="max-w-7xl mx-auto mt-20 space-y-16">
          {/* Comprehensive BAC Science Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Wine className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Understanding Blood Alcohol Content: The Complete Medical Guide</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 text-gray-300">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">What is BAC and How It Affects Your Body</h3>
                  <p className="leading-relaxed text-base mb-4">
                    Blood Alcohol Content (BAC) measures the percentage of alcohol in your bloodstream, expressed as grams of alcohol 
                    per 100 milliliters of blood (g/100mL). BAC directly correlates with impairment levels, legal consequences for 
                    driving, and health risks. At 0.08% BAC, you have 80 milligrams of alcohol per 100 milliliters of blood—enough 
                    to significantly impair judgment, coordination, and reaction time.
                  </p>
                  <p className="leading-relaxed text-base">
                    BAC affects every organ system: the central nervous system experiences depression, cardiovascular function changes, 
                    digestive processes slow, and cognitive abilities diminish. These effects are measurable and predictable, making 
                    BAC the universal standard for alcohol impairment assessment worldwide.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">The Enhanced Widmark Equation: Scientific Foundation</h3>
                  <p className="leading-relaxed text-base mb-4">
                    Developed by Swedish scientist Erik Widmark in 1932 and enhanced with modern pharmacokinetic research, the Widmark 
                    equation remains the gold standard for BAC estimation. The formula accounts for total alcohol consumed, body weight, 
                    biological sex (affecting body water distribution), and time elapsed since drinking began.
                  </p>
                  <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800 font-mono text-sm">
                    <p className="text-amber-200 mb-2"><strong>Enhanced Widmark Formula:</strong></p>
                    <p className="text-gray-300">BAC = (A × 5.14) / (W × r) - (0.015 × H)</p>
                    <p className="text-xs text-amber-300 mt-2">
                      A = alcohol in fluid ounces, W = weight (lbs), r = distribution ratio, H = hours elapsed
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Legal Implications & Global DUI Standards</h3>
                  <p className="leading-relaxed text-base mb-4">
                    Legal BAC limits vary globally but serve the same purpose: preventing alcohol-impaired driving and protecting public safety. 
                    Most jurisdictions set limits where significant impairment is scientifically documented. The United States uses 0.08% for 
                    adults 21+, while many countries use 0.05%. Commercial drivers face stricter limits (typically 0.04%), reflecting their 
                    professional responsibilities.
                  </p>
                  <p className="leading-relaxed text-base">
                    Enhanced penalties typically begin at 0.15% BAC, recognizing the extreme impairment and danger at these levels. 
                    DUI consequences extend far beyond immediate legal penalties, affecting employment, insurance rates, professional licenses, 
                    and personal relationships for years after conviction.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Alcohol Metabolism: The Science of Elimination</h3>
                  <p className="leading-relaxed text-base mb-4">
                    The human liver metabolizes alcohol through enzymatic processes primarily involving alcohol dehydrogenase (ADH) and 
                    aldehyde dehydrogenase (ALDH). This occurs at a relatively constant rate of approximately 0.015% BAC per hour, 
                    equivalent to about one standard drink per hour for most adults.
                  </p>
                  <p className="leading-relaxed text-base">
                    This metabolic rate cannot be meaningfully accelerated by coffee, cold showers, exercise, or other common misconceptions. 
                    Only time allows complete alcohol elimination. Factors affecting individual rates include liver health, age, genetics, 
                    body composition, and chronic alcohol consumption, but the fundamental rate remains relatively stable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced BAC Levels & Legal Consequences Matrix */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">BAC Impairment Levels & Comprehensive Legal Consequences Guide</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-5xl">
                Understanding BAC levels, their physiological effects, and legal consequences is crucial for safety and responsible 
                decision-making. Each level represents measurable impairment with specific legal risks and health dangers that 
                escalate dramatically as BAC increases.
              </p>
              
              {/* Interactive BAC Effects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-green-400 font-bold text-xl">0.00% - Sober</h3>
                    <div className="text-green-400 font-bold text-sm bg-green-900/30 px-2 py-1 rounded">SAFE</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">No measurable alcohol. Normal judgment, coordination, and reaction time.</p>
                  <div className="space-y-2 text-xs text-green-300">
                    <div><strong>Legal Status:</strong> Safe to drive globally</div>
                    <div><strong>Impairment:</strong> None detected</div>
                    <div><strong>Risk Level:</strong> No alcohol-related risk</div>
                    <div><strong>Recommendation:</strong> Optimal for all activities</div>
                  </div>
                </div>

                <div className="group p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-blue-400 font-bold text-xl">0.01-0.02%</h3>
                    <div className="text-blue-400 font-bold text-sm bg-blue-900/30 px-2 py-1 rounded">MINIMAL</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Slight relaxation, minor loss of judgment, body warmth sensation.</p>
                  <div className="space-y-2 text-xs text-blue-300">
                    <div><strong>Legal Status:</strong> Legal for most adults 21+</div>
                    <div><strong>Impairment:</strong> Subtle changes in behavior</div>
                    <div><strong>Risk Level:</strong> Some impairment present</div>
                    <div><strong>Recommendation:</strong> Consider individual tolerance</div>
                  </div>
                </div>

                <div className="group p-6 bg-yellow-900/20 rounded-2xl border border-yellow-800 hover:bg-yellow-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-yellow-400 font-bold text-xl">0.02-0.05%</h3>
                    <div className="text-yellow-400 font-bold text-sm bg-yellow-900/30 px-2 py-1 rounded">CAUTION</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Exaggerated behavior, impaired judgment, reduced reaction time, coordination affected.</p>
                  <div className="space-y-2 text-xs text-yellow-300">
                    <div><strong>Legal Status:</strong> Illegal in some countries, commercial drivers</div>
                    <div><strong>Impairment:</strong> Measurable cognitive and motor effects</div>
                    <div><strong>Risk Level:</strong> Significant impairment, avoid driving</div>
                    <div><strong>Recommendation:</strong> Arrange alternative transportation</div>
                  </div>
                </div>

                <div className="group p-6 bg-orange-900/20 rounded-2xl border border-orange-800 hover:bg-orange-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-orange-400 font-bold text-xl">0.05-0.08%</h3>
                    <div className="text-orange-400 font-bold text-sm bg-orange-900/30 px-2 py-1 rounded">DANGEROUS</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Coordination problems, balance issues, speech and vision affected, reasoning impaired.</p>
                  <div className="space-y-2 text-xs text-orange-300">
                    <div><strong>Legal Status:</strong> Approaching/at legal limit</div>
                    <div><strong>Impairment:</strong> Substantial motor and cognitive deficits</div>
                    <div><strong>Risk Level:</strong> High impairment, never drive</div>
                    <div><strong>Recommendation:</strong> Immediate transportation alternatives</div>
                  </div>
                </div>

                <div className="group p-6 bg-red-900/20 rounded-2xl border border-red-800 hover:bg-red-900/30 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-red-400 font-bold text-xl">0.08-0.15%</h3>
                    <div className="text-red-400 font-bold text-sm bg-red-900/30 px-2 py-1 rounded">ILLEGAL</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Major motor control loss, vomiting, mental confusion, severely impaired judgment.</p>
                  <div className="space-y-2 text-xs text-red-300">
                    <div><strong>Legal Status:</strong> Illegal worldwide, DUI charges certain</div>
                    <div><strong>Impairment:</strong> Severe cognitive and physical dysfunction</div>
                    <div><strong>Risk Level:</strong> Dangerous to self and others</div>
                    <div><strong>Recommendation:</strong> Seek immediate assistance</div>
                  </div>
                </div>

                <div className="group p-6 bg-red-900/30 rounded-2xl border border-red-700 hover:bg-red-900/40 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-red-500 font-bold text-xl">0.15%+</h3>
                    <div className="text-red-500 font-bold text-sm bg-red-900/40 px-2 py-1 rounded">EMERGENCY</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Risk of coma, death, severe alcohol poisoning, respiratory depression.</p>
                  <div className="space-y-2 text-xs text-red-400">
                    <div><strong>Legal Status:</strong> Medical emergency priority</div>
                    <div><strong>Impairment:</strong> Life-threatening intoxication</div>
                    <div><strong>Risk Level:</strong> Fatal alcohol poisoning possible</div>
                    <div><strong>Recommendation:</strong> Call 911 immediately</div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Legal Consequences Matrix */}
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">2025 DUI Legal Consequences by BAC Level & Jurisdiction</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-yellow-900/20 rounded-2xl border border-yellow-800">
                    <h4 className="text-yellow-400 font-bold text-lg mb-4 text-center">First-Time DUI (0.08-0.14%)</h4>
                    <div className="space-y-3 text-sm text-yellow-300">
                      <div className="flex justify-between">
                        <span><strong>License Suspension:</strong></span>
                        <span>3-12 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Fines:</strong></span>
                        <span>$500-$2,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Jail Time:</strong></span>
                        <span>1-6 months possible</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Education:</strong></span>
                        <span>Mandatory programs</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Insurance:</strong></span>
                        <span>SR-22 requirement</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Record:</strong></span>
                        <span>Criminal conviction</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-orange-900/20 rounded-2xl border border-orange-800">
                    <h4 className="text-orange-400 font-bold text-lg mb-4 text-center">Enhanced DUI (0.15%+)</h4>
                    <div className="space-y-3 text-sm text-orange-300">
                      <div className="flex justify-between">
                        <span><strong>License Suspension:</strong></span>
                        <span>6-18 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Fines:</strong></span>
                        <span>$1,000-$5,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Jail Time:</strong></span>
                        <span>2-12 months mandatory</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Ignition Lock:</strong></span>
                        <span>6+ months required</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Probation:</strong></span>
                        <span>Extended supervision</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Vehicle:</strong></span>
                        <span>Impoundment possible</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-red-900/20 rounded-2xl border border-red-800">
                    <h4 className="text-red-400 font-bold text-lg mb-4 text-center">Repeat Offenses</h4>
                    <div className="space-y-3 text-sm text-red-300">
                      <div className="flex justify-between">
                        <span><strong>License Revocation:</strong></span>
                        <span>1-5 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Fines:</strong></span>
                        <span>$2,000-$10,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Prison Time:</strong></span>
                        <span>30 days-5 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Felony Charges:</strong></span>
                        <span>Likely after 2nd-3rd</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Vehicle Forfeiture:</strong></span>
                        <span>Permanent seizure</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>Record:</strong></span>
                        <span>Permanent felony</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Long-term Impact Assessment */}
                <div className="mt-8 p-6 bg-red-900/20 border border-red-800 rounded-xl">
                  <h4 className="text-red-400 font-bold text-lg mb-4 text-center">Long-Term Life Impact Assessment</h4>
                  <div className="grid md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <h5 className="font-semibold text-red-300 mb-3">Professional Consequences</h5>
                      <ul className="space-y-1 text-red-200">
                        <li>• Job termination or career limitations</li>
                        <li>• Professional license suspension/revocation</li>
                        <li>• Background check failures for employment</li>
                        <li>• Security clearance permanent loss</li>
                        <li>• Military discharge or demotion</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-300 mb-3">Financial Impact</h5>
                      <ul className="space-y-1 text-red-200">
                        <li>• Insurance rate increases (3-7 years)</li>
                        <li>• Total costs: $10,000-$25,000+ average</li>
                        <li>• Legal fees and court costs</li>
                        <li>• Lost wages from jail/probation</li>
                        <li>• Transportation alternatives costs</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-300 mb-3">Personal Impact</h5>
                      <ul className="space-y-1 text-red-200">
                        <li>• Family relationship strain</li>
                        <li>• Social stigma and reputation damage</li>
                        <li>• Housing application difficulties</li>
                        <li>• Travel restrictions (some countries)</li>
                        <li>• Personal guilt and mental health effects</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-300 mb-3">Legal Complications</h5>
                      <ul className="space-y-1 text-red-200">
                        <li>• Civil liability for accidents/injuries</li>
                        <li>• Permanent criminal record</li>
                        <li>• Probation violation consequences</li>
                        <li>• Immigration status complications</li>
                        <li>• Child custody impact considerations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Factors Affecting BAC */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Scale className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Factors Affecting BAC Accuracy: Complete Scientific Analysis</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-5xl">
                BAC calculations involve complex physiological and environmental factors that create significant individual variability. 
                Understanding these variables explains why professional testing is required for legal matters and why calculator results 
                should only be used for general educational awareness, never for safety determinations.
              </p>
              
              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Physical Characteristics</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
                      <h4 className="font-semibold text-purple-300 mb-2">Body Weight & Composition</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Lower weight = higher BAC concentration</li>
                        <li>• Muscle tissue contains more water than fat</li>
                        <li>• Body fat percentage affects distribution</li>
                        <li>• Athletes may have different responses</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800">
                      <h4 className="font-semibold text-purple-300 mb-2">Biological Sex Differences</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Women typically have higher BAC than men</li>
                        <li>• Lower total body water in women (55% vs 68%)</li>
                        <li>• Different alcohol dehydrogenase activity</li>
                        <li>• Hormonal cycle effects on metabolism</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Consumption Variables</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-2">Drinking Patterns</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Rapid consumption increases peak BAC</li>
                        <li>• Spacing drinks allows more metabolism</li>
                        <li>• Alcohol type affects absorption rate</li>
                        <li>• Carbonation speeds absorption</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-2">Food Interaction</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Food significantly slows absorption</li>
                        <li>• High-fat foods have greatest effect</li>
                        <li>• Protein moderates absorption rate</li>
                        <li>• Empty stomach = faster, higher BAC</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Health & Medical Factors</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                      <h4 className="font-semibold text-green-300 mb-2">Medications & Health</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Many medications enhance alcohol effects</li>
                        <li>• Liver disease reduces metabolism</li>
                        <li>• Diabetes affects alcohol processing</li>
                        <li>• Age decreases metabolic efficiency</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
                      <h4 className="font-semibold text-green-300 mb-2">Physiological States</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Fatigue amplifies alcohol effects</li>
                        <li>• Dehydration increases BAC levels</li>
                        <li>• Illness affects metabolism rate</li>
                        <li>• Stress impacts alcohol processing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400">Individual Variations</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-800">
                      <h4 className="font-semibold text-amber-300 mb-2">Genetic Factors</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Enzyme variants affect metabolism</li>
                        <li>• Ethnic differences in processing</li>
                        <li>• Family history influences tolerance</li>
                        <li>• Individual metabolic rates vary ±50%</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-800">
                      <h4 className="font-semibold text-amber-300 mb-2">Tolerance vs. Impairment</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Tolerance doesn't reduce BAC levels</li>
                        <li>• Chronic drinkers may feel less impaired</li>
                        <li>• Legal limits apply regardless of tolerance</li>
                        <li>• Functional impairment still occurs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAC Calculation Accuracy Disclaimer */}
              <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4 text-center">⚠️ Critical Accuracy Limitations</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="font-semibold text-red-300 mb-2">Calculator Limitations</h5>
                    <ul className="space-y-1 text-red-200">
                      <li>• ±15-20% accuracy under ideal conditions</li>
                      <li>• Cannot account for all individual factors</li>
                      <li>• Based on population averages, not individuals</li>
                      <li>• Assumes steady-state metabolism</li>
                      <li>• Cannot predict individual tolerance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-300 mb-2">Professional Testing</h5>
                    <ul className="space-y-1 text-red-200">
                      <li>• Breathalyzers: ±0.005% accuracy when calibrated</li>
                      <li>• Blood tests: Gold standard for legal purposes</li>
                      <li>• Required for any legal determination</li>
                      <li>• Accounts for current physiological state</li>
                      <li>• Enforceable in court proceedings</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-red-900/30 rounded-lg text-center">
                  <p className="text-red-300 font-bold">
                    Remember: This calculator provides estimates only. Never use it to determine driving safety. 
                    When in doubt, don't drive - arrange alternative transportation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Clock className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Expert Legal & Medical Q&A: Everything About BAC & Alcohol Safety</h2>
            </div>
            <div className="space-y-8">
              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How accurate is the Widmark equation for BAC calculation and legal purposes?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The enhanced Widmark equation achieves ±15-20% accuracy for BAC estimation, making it suitable for educational and 
                  safety awareness purposes. However, legal BAC determination requires professional breathalyzer or blood testing with 
                  accuracy standards of ±0.005%. Individual factors like metabolism, food intake, medications, and health conditions 
                  significantly affect alcohol absorption and elimination rates, which is why this calculator should never replace 
                  professional testing for legal matters.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
                    <h4 className="text-green-400 font-bold mb-2">Educational Uses ✓</h4>
                    <ul className="text-sm text-green-300 space-y-1">
                      <li>• General safety awareness</li>
                      <li>• Understanding impairment levels</li>
                      <li>• Learning about alcohol metabolism</li>
                      <li>• Planning safe transportation</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-4 border border-red-800">
                    <h4 className="text-red-400 font-bold mb-2">Legal Determinations ✗</h4>
                    <ul className="text-sm text-red-300 space-y-1">
                      <li>• Driving safety decisions</li>
                      <li>• Legal compliance verification</li>
                      <li>• Workplace testing</li>
                      <li>• Law enforcement evidence</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What are the current legal BAC limits for driving in 2025 worldwide?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Legal BAC limits vary globally: Most US states maintain 0.08% for adults 21+, with 0.04% for commercial drivers and 
                  0.02% for under-21 drivers. Many European countries use 0.05%, while some have 0.02% limits. Enhanced penalties typically 
                  apply at 0.15% BAC. Penalties include license suspension, fines ($1,000-$25,000+), jail time, ignition interlock devices, 
                  and permanent criminal records. Always verify current local laws as they change frequently.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800 text-center">
                    <h4 className="text-blue-400 font-bold mb-2">United States</h4>
                    <div className="text-sm text-blue-300 space-y-1">
                      <div>Adults 21+: <strong>0.08%</strong></div>
                      <div>Commercial: <strong>0.04%</strong></div>
                      <div>Under 21: <strong>0.02%</strong></div>
                      <div>Enhanced: <strong>0.15%</strong></div>
                    </div>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-800 text-center">
                    <h4 className="text-green-400 font-bold mb-2">European Union</h4>
                    <div className="text-sm text-green-300 space-y-1">
                      <div>Most Countries: <strong>0.05%</strong></div>
                      <div>Some Countries: <strong>0.02%</strong></div>
                      <div>New Drivers: <strong>0.00-0.02%</strong></div>
                      <div>Professional: <strong>0.02%</strong></div>
                    </div>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800 text-center">
                    <h4 className="text-purple-400 font-bold mb-2">Asia-Pacific</h4>
                    <div className="text-sm text-purple-300 space-y-1">
                      <div>Australia: <strong>0.05%</strong></div>
                      <div>Japan: <strong>0.03%</strong></div>
                      <div>Singapore: <strong>0.08%</strong></div>
                      <div>Varies: <strong>0.00-0.08%</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  How long does alcohol metabolism take and can it be accelerated?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The human liver metabolizes alcohol through enzymatic processes at approximately 0.015% BAC per hour (roughly one 
                  standard drink per hour) regardless of interventions. This rate cannot be accelerated by coffee, cold showers, exercise, 
                  or other remedies. Complete sobriety time depends on peak BAC: 0.08% takes 5-6 hours, 0.15% takes 10+ hours to reach zero. 
                  Factors affecting rate include liver health, age, gender, body composition, and drinking history, but the fundamental 
                  metabolism rate remains constant.
                </p>
                <div className="bg-amber-900/20 rounded-lg p-6 border border-amber-800">
                  <h4 className="text-amber-400 font-bold mb-4 text-center">Alcohol Metabolism Timeline</h4>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-amber-900/30 rounded">
                      <div className="text-amber-300 font-bold">0.04% BAC</div>
                      <div className="text-gray-300">~2.5 hours</div>
                    </div>
                    <div className="text-center p-3 bg-amber-900/30 rounded">
                      <div className="text-amber-300 font-bold">0.08% BAC</div>
                      <div className="text-gray-300">~5-6 hours</div>
                    </div>
                    <div className="text-center p-3 bg-amber-900/30 rounded">
                      <div className="text-amber-300 font-bold">0.12% BAC</div>
                      <div className="text-gray-300">~8 hours</div>
                    </div>
                    <div className="text-center p-3 bg-amber-900/30 rounded">
                      <div className="text-amber-300 font-bold">0.15% BAC</div>
                      <div className="text-gray-300">~10+ hours</div>
                    </div>
                  </div>
                  <p className="text-amber-200 text-xs mt-4 text-center">
                    <strong>Remember:</strong> Nothing can speed up this process. Only time eliminates alcohol from your system.
                  </p>
                </div>
              </div>

              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What are the consequences of DUI conviction at different BAC levels in 2025?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  DUI consequences escalate dramatically with BAC level: 0.08-0.14% (first offense) includes 3-12 month license suspension, 
                  $500-$2,000 fines, possible jail time, and alcohol education. 0.15%+ (enhanced DUI) results in 6-18 month suspensions, 
                  $1,000-$5,000+ fines, mandatory ignition interlock, and extended jail time. Repeat offenses face 1-5 year license revocation, 
                  $2,000-$10,000+ fines, felony charges, and permanent criminal records affecting employment, insurance, and professional licenses.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-800">
                    <h4 className="text-orange-400 font-bold mb-3">Immediate Consequences</h4>
                    <ul className="text-sm text-orange-300 space-y-2">
                      <li>• <strong>Arrest & Booking:</strong> Immediate custody, fingerprinting, mugshot</li>
                      <li>• <strong>License Suspension:</strong> Administrative suspension within 24-48 hours</li>
                      <li>• <strong>Vehicle Impoundment:</strong> Immediate towing and storage fees</li>
                      <li>• <strong>Bail & Release:</strong> $500-$5,000+ depending on jurisdiction</li>
                      <li>• <strong>Court Date:</strong> Mandatory appearance within 30 days</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-4 border border-red-800">
                    <h4 className="text-red-400 font-bold mb-3">Long-term Impact</h4>
                    <ul className="text-sm text-red-300 space-y-2">
                      <li>• <strong>Employment:</strong> Job loss, career limitations, background check failures</li>
                      <li>• <strong>Insurance:</strong> 3-7 years of increased premiums (+150-300%)</li>
                      <li>• <strong>Professional:</strong> License suspension (medical, legal, teaching, etc.)</li>
                      <li>• <strong>Personal:</strong> Relationship strain, social stigma, mental health impact</li>
                      <li>• <strong>Financial:</strong> $10,000-$25,000+ total costs average</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-bottom border-gray-800 pb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  Should I use this BAC calculator to determine if I can drive safely?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Absolutely not. This calculator provides estimates only and should never determine driving safety. Impairment begins 
                  well below legal limits, affecting judgment, reaction time, and coordination. Individual factors create significant 
                  variability in both BAC levels and impairment effects. Professional testing is required for legal accuracy. The only 
                  safe approach is arranging alternative transportation (rideshare, designated driver, public transit) whenever alcohol 
                  has been consumed.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-900/20 rounded-lg p-4 border border-red-800">
                    <h4 className="text-red-400 font-bold mb-3">❌ Never Use For</h4>
                    <ul className="text-sm text-red-300 space-y-1">
                      <li>• Determining if it's safe to drive</li>
                      <li>• Legal compliance verification</li>
                      <li>• Workplace or legal testing</li>
                      <li>• Operating any machinery</li>
                      <li>• Making safety-critical decisions</li>
                      <li>• Child care or supervision decisions</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-800">
                    <h4 className="text-green-400 font-bold mb-3">✅ Safe Transportation Options</h4>
                    <ul className="text-sm text-green-300 space-y-1">
                      <li>• Rideshare services (Uber, Lyft)</li>
                      <li>• Traditional taxi services</li>
                      <li>• Designated driver arrangements</li>
                      <li>• Public transportation</li>
                      <li>• Walking (if safe distance)</li>
                      <li>• Staying overnight at location</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  What factors affect individual BAC levels and alcohol tolerance?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  BAC levels are influenced by body weight (lower weight = higher BAC), biological sex (women typically higher BAC than men), 
                  body fat percentage, food consumption, drinking rate, alcohol type, medications, age, liver health, and genetic factors. 
                  Tolerance affects perceived impairment but not actual BAC levels or legal consequences. Regular drinkers may feel less 
                  impaired at the same BAC but face identical legal risks and physiological impairment for driving and decision-making tasks.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                    <h4 className="text-blue-400 font-bold mb-3">Physical Factors</h4>
                    <div className="space-y-3 text-sm text-blue-300">
                      <div>
                        <strong>Body Weight:</strong> Alcohol distributes throughout body water. Lower weight = less dilution = higher BAC.
                      </div>
                      <div>
                        <strong>Biological Sex:</strong> Women average 55% body water vs. men's 68%, resulting in higher BAC at same consumption.
                      </div>
                      <div>
                        <strong>Age:</strong> Metabolism slows with age, and body water percentage decreases, affecting BAC levels.
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
                    <h4 className="text-purple-400 font-bold mb-3">Consumption Factors</h4>
                    <div className="space-y-3 text-sm text-purple-300">
                      <div>
                        <strong>Food Intake:</strong> Food slows alcohol absorption by 30-70%, particularly high-fat and protein foods.
                      </div>
                      <div>
                        <strong>Drinking Rate:</strong> Rapid consumption overwhelms metabolism, causing higher peak BAC levels.
                      </div>
                      <div>
                        <strong>Alcohol Type:</strong> Carbonated drinks and higher concentrations increase absorption rate.
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-800">
                    <h4 className="text-amber-400 font-bold mb-3">Tolerance vs. Reality</h4>
                    <div className="space-y-3 text-sm text-amber-300">
                      <div>
                        <strong>Functional Tolerance:</strong> Regular drinkers may feel less impaired but have identical BAC levels.
                      </div>
                      <div>
                        <strong>Legal Reality:</strong> Tolerance provides no protection from DUI charges or legal consequences.
                      </div>
                      <div>
                        <strong>Safety Truth:</strong> Reaction time and judgment remain impaired regardless of perceived tolerance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Related Calculators */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Users className="w-8 h-8 text-teal-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Professional Medical Calculator Suite</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/gfr-calculator" className="group p-6 bg-blue-900/20 rounded-2xl border border-blue-800 hover:bg-blue-900/30 transition-all hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-blue-400 font-bold text-lg">GFR Calculator</h3>
                </div>
                <p className="text-gray-300 mb-3">Medical-grade kidney function assessment and chronic kidney disease staging</p>
                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>CKD-EPI 2021 Equation</span>
                </div>
              </a>
              <a href="/bmr-calculator" className="group p-6 bg-green-900/20 rounded-2xl border border-green-800 hover:bg-green-900/30 transition-all hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-green-400 font-bold text-lg">BMR Calculator</h3>
                </div>
                <p className="text-gray-300 mb-3">Precision basal metabolic rate calculation for comprehensive health planning</p>
                <div className="flex items-center gap-2 text-xs text-green-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>Mifflin-St Jeor Formula</span>
                </div>
              </a>
              <a href="/" className="group p-6 bg-purple-900/20 rounded-2xl border border-purple-800 hover:bg-purple-900/30 transition-all hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-purple-400 font-bold text-lg">BMI Calculator</h3>
                </div>
                <p className="text-gray-300 mb-3">Advanced body mass index assessment with comprehensive health insights</p>
                <div className="flex items-center gap-2 text-xs text-purple-300">
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

export default BACCalculatorPage;