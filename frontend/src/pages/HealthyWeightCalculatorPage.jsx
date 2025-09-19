import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import HealthyWeightCalculator from "../components/HealthyWeightCalculator";

const HealthyWeightCalculatorPage = () => {
  useEffect(() => {
    // Enhanced JSON-LD Schema Markup for SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalRiskCalculator",
          "@id": "https://bmipro.com/healthy-weight-calculator#calculator",
          "name": "Healthy Weight Calculator - Personalized BMI Range Calculator",
          "description": "Calculate your personalized healthy weight range based on BMI standards, age, activity level, and body frame. Get customized recommendations for optimal weight management with WHO and CDC guidelines.",
          "url": "https://bmipro.com/healthy-weight-calculator",
          "applicationCategory": "Medical Calculator",
          "applicationSubCategory": "Weight Management",
          "operatingSystem": "Any",
          "softwareVersion": "2025.1",
          "datePublished": "2025-01-01",
          "dateModified": "2025-01-15",
          "author": {
            "@type": "Organization",
            "@id": "https://bmipro.com/#organization"
          },
          "publisher": {
            "@type": "Organization", 
            "@id": "https://bmipro.com/#organization"
          },
          "medicalSpecialty": "Preventive Medicine",
          "medicalAudience": ["Patient", "Healthcare Provider", "Nutritionist"],
          "riskFactor": "Obesity",
          "healthCondition": "Weight Management",
          "guideline": {
            "@type": "MedicalGuideline",
            "name": "WHO BMI Classification and CDC Healthy Weight Guidelines",
            "description": "Evidence-based BMI ranges adjusted for age, activity level, and body frame following WHO and CDC standards"
          },
          "featureList": [
            "Age-Adjusted BMI Ranges",
            "Activity Level Considerations", 
            "Body Frame Adjustments",
            "Personalized Weight Targets",
            "WHO & CDC Standards Compliance",
            "Weight Management Goals",
            "Health Risk Assessment",
            "Multi-unit Support (kg/lbs, cm/ft)",
            "PDF Report Generation",
            "Professional Health Analysis"
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://bmipro.com/healthy-weight-calculator#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a healthy weight range and how is it calculated?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A healthy weight range is based on BMI standards (18.5-24.9) adjusted for age, activity level, and body frame. Our calculator uses WHO and CDC guidelines with personalized adjustments: age-based modifications (higher ranges for older adults), activity level bonuses (+1-2 BMI points for active individuals), and frame size considerations (±1 BMI point for large/small frames)."
              }
            },
            {
              "@type": "Question",
              "name": "How does age affect healthy weight ranges?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "Research shows slightly higher BMI ranges may be healthier for older adults. Our calculator adjusts ranges: Young Adults (18-49): BMI 18.5-24.9, Middle-Aged (50-64): BMI 20.0-26.0, Older Adults (65+): BMI 22.0-27.0. Higher ranges for seniors help protect against frailty, support immune function, and maintain bone health."
              }
            },
            {
              "@type": "Question",
              "name": "What's the difference between healthy weight calculator and BMI calculator?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A healthy weight calculator provides personalized weight ranges considering multiple factors (age, activity, frame), while BMI calculators only assess current weight status. Healthy weight calculators give you customized target ranges, whereas BMI calculators categorize your current status. Our tool combines both for comprehensive assessment."
              }
            },
            {
              "@type": "Question",
              "name": "How does activity level affect healthy weight calculations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Activity level significantly impacts healthy weight ranges due to muscle mass differences. Our calculator adjusts: High Activity: +2 BMI points (athletes/muscle mass), Moderate Activity: +1 BMI point (regular exercisers), Low Activity: Standard ranges apply. Active individuals can maintain higher healthy weights due to increased muscle mass."
              }
            },
            {
              "@type": "Question",
              "name": "What is body frame size and how does it affect healthy weight?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Body frame size refers to bone structure and skeletal build. Our calculator adjusts healthy weight ranges: Large Frame: +1 BMI point range (broader bones, larger joints), Medium Frame: Standard ranges, Small Frame: -1 BMI point range (smaller bones, narrower build). Frame size accounts for structural differences in healthy weight targets."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "@id": "https://bmipro.com/healthy-weight-calculator#howto",
          "name": "How to Calculate Your Personalized Healthy Weight Range",
          "description": "Step-by-step guide to determine your healthy weight range using age, activity level, and body frame adjustments",
          "totalTime": "PT5M",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Enter Basic Information",
              "text": "Input your height, age, and gender. These form the foundation for BMI-based calculations and age-appropriate adjustments.",
              "image": "https://bmipro.com/images/basic-info-input.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Select Activity Level",
              "text": "Choose from high (daily intense exercise), moderate (regular exercise 3-4x/week), or low (minimal exercise) to account for muscle mass differences.",
              "image": "https://bmipro.com/images/activity-selection.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Determine Body Frame Size",
              "text": "Select small, medium, or large frame based on bone structure and build to adjust weight ranges for skeletal differences.",
              "image": "https://bmipro.com/images/frame-selection.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Input Current Weight (Optional)",
              "text": "Enter current weight for personalized analysis and recommendations for reaching your healthy weight range.",
              "image": "https://bmipro.com/images/weight-analysis.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Review Personalized Results",
              "text": "Examine your customized healthy weight range, weight management goals, and personalized health recommendations.",
              "image": "https://bmipro.com/images/results-analysis.jpg"
            }
          ]
        },
        {
          "@type": "WebApplication",
          "@id": "https://bmipro.com/healthy-weight-calculator#webapp",
          "name": "Professional Healthy Weight Range Calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "browserRequirements": "Modern web browser with JavaScript support",
          "softwareVersion": "2025.1",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      ]
    };

    // Add schema to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.text.includes('HealthyWeightCalculator')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Healthy Weight Calculator 2025 - Personalized BMI Range Calculator | Age & Activity Adjusted</title>
        <meta name="description" content="Calculate your personalized healthy weight range with age, activity level, and body frame adjustments. Professional BMI calculator following WHO & CDC guidelines with customized recommendations." />
        <meta name="keywords" content="healthy weight calculator, healthy weight range, personalized BMI calculator, age adjusted BMI, healthy weight for height, BMI range calculator, weight management calculator 2025" />
        
        {/* Enhanced Open Graph Tags */}
        <meta property="og:title" content="Healthy Weight Calculator - Personalized BMI Range Calculator 2025" />
        <meta property="og:description" content="Calculate personalized healthy weight ranges with age, activity, and frame adjustments. WHO & CDC guidelines with professional analysis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bmipro.com/healthy-weight-calculator" />
        <meta property="og:image" content="https://bmipro.com/images/healthy-weight-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BMI Pro - Professional Health Calculators" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Healthy Weight Calculator - Personalized BMI Range" />
        <meta name="twitter:description" content="Calculate healthy weight ranges with age, activity, and frame adjustments following WHO & CDC guidelines." />
        <meta name="twitter:image" content="https://bmipro.com/images/healthy-weight-calculator-twitter.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" content="https://bmipro.com/healthy-weight-calculator" />
        <meta name="author" content="BMI Pro Medical Team" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Health-specific Meta Tags */}
        <meta name="medical.condition" content="Weight Management, Obesity Prevention" />
        <meta name="medical.specialty" content="Preventive Medicine, Nutrition" />
        <meta name="health.topic" content="Healthy Weight Range, BMI Standards, Weight Management" />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-4">
          {/* Enhanced SEO-Optimized Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Healthy Weight Calculator - Personalized BMI Range
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
              Calculate Your Personalized Healthy Weight Range with Age, Activity & Body Frame Adjustments
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Professional healthy weight calculator using WHO and CDC guidelines with personalized adjustments for age, 
              activity level, and body frame. Get customized weight ranges and expert recommendations for optimal health.
            </p>
          </div>

          {/* Calculator Component */}
          <HealthyWeightCalculator />

          {/* Enhanced Educational Content with SEO Optimization */}
          <div className="mt-16 max-w-6xl mx-auto">
            
            {/* Quick Reference Section for Featured Snippets */}
            <div className="mb-12 bg-green-900/20 p-6 rounded-xl border border-green-800/50">
              <h2 className="text-2xl font-bold mb-6 text-green-300">Quick Reference: Healthy Weight Ranges by Age</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-800/50">
                      <th className="text-left p-3 text-green-300">Age Group</th>
                      <th className="text-left p-3 text-green-300">BMI Range</th>
                      <th className="text-left p-3 text-green-300">Health Focus</th>
                      <th className="text-left p-3 text-green-300">Considerations</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Young Adults (18-49)</td>
                      <td className="p-3">18.5 - 24.9</td>
                      <td className="p-3">Metabolic optimization</td>
                      <td className="p-3">Lowest chronic disease risk</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Middle-Aged (50-64)</td>
                      <td className="p-3">20.0 - 26.0</td>
                      <td className="p-3">Healthy aging support</td>
                      <td className="p-3">Metabolic changes account</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Older Adults (65+)</td>
                      <td className="p-3">22.0 - 27.0</td>
                      <td className="p-3">Frailty prevention</td>
                      <td className="p-3">Immune & bone health</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scientific Foundation Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-green-400">WHO & CDC Standards Integration</h3>
                <p className="text-gray-300 mb-4">
                  Our healthy weight calculator integrates World Health Organization (WHO) and Centers for Disease Control (CDC) 
                  guidelines with personalized adjustments. These evidence-based standards are derived from extensive population 
                  studies and clinical research spanning multiple decades and diverse global populations.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-green-300">Regulatory Standards:</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• WHO Global Health Observatory data</li>
                    <li>• CDC National Health Statistics</li>
                    <li>• International BMI classifications</li>
                    <li>• Population mortality studies</li>
                    <li>• Chronic disease risk assessments</li>
                    <li>• Evidence-based medical guidelines</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Personalized Health Assessment</h3>
                <p className="text-gray-300 mb-4">
                  Unlike basic BMI calculators, our personalized approach considers age-related metabolic changes, activity-induced 
                  muscle mass variations, and skeletal frame differences. This comprehensive method provides more accurate and 
                  achievable healthy weight targets for individual circumstances.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-blue-300">Personalization Factors:</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Age-adjusted metabolic considerations</li>
                    <li>• Activity level muscle mass accounting</li>
                    <li>• Body frame skeletal structure</li>
                    <li>• Gender-specific health optimizations</li>
                    <li>• Individual health goal alignment</li>
                    <li>• Lifestyle integration recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Age-Adjusted BMI Research Section */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Age-Adjusted Healthy Weight Research</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Scientific research demonstrates that optimal BMI ranges vary by age group. Our calculator incorporates 
                these evidence-based adjustments to provide age-appropriate healthy weight targets that support longevity 
                and quality of life across different life stages.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">Young Adults (18-49 Years)</h3>
                  <div className="text-2xl font-bold text-blue-400 mb-2">BMI: 18.5 - 24.9</div>
                  <p className="text-gray-300 text-sm mb-4">
                    Standard WHO ranges provide optimal metabolic health and lowest chronic disease risk for younger adults 
                    with stable metabolism and active lifestyles.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-300 text-sm">Research Benefits:</h4>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Optimal cardiovascular health</li>
                      <li>• Lowest diabetes risk</li>
                      <li>• Enhanced fertility outcomes</li>
                      <li>• Improved mental health</li>
                      <li>• Higher energy levels</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/30">
                  <h3 className="text-xl font-bold text-green-300 mb-4">Middle-Aged (50-64 Years)</h3>
                  <div className="text-2xl font-bold text-green-400 mb-2">BMI: 20.0 - 26.0</div>
                  <p className="text-gray-300 text-sm mb-4">
                    Slightly elevated ranges account for age-related metabolic changes, hormone fluctuations, and the need 
                    for additional energy reserves during this transition period.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-300 text-sm">Age Considerations:</h4>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Hormonal transition support</li>
                      <li>• Metabolic rate adjustments</li>
                      <li>• Muscle mass preservation</li>
                      <li>• Chronic disease prevention</li>
                      <li>• Energy stability maintenance</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <h3 className="text-xl font-bold text-yellow-300 mb-4">Older Adults (65+ Years)</h3>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">BMI: 22.0 - 27.0</div>
                  <p className="text-gray-300 text-sm mb-4">
                    Higher ranges protect against frailty, support immune function, and provide energy reserves needed 
                    for healthy aging and recovery from illness or injury.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-300 text-sm">Senior Health Benefits:</h4>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Frailty syndrome prevention</li>
                      <li>• Enhanced immune response</li>
                      <li>• Bone health maintenance</li>
                      <li>• Recovery reserve capacity</li>
                      <li>• Longevity optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Activity Level Adjustments */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50">
                  <h3 className="text-lg font-bold text-purple-300 mb-3">Activity Level Adjustments</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">High Activity (Daily Training)</span>
                      <span className="text-purple-400 font-bold">+2.0 BMI Points</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Moderate Activity (3-4x/week)</span>
                      <span className="text-purple-400 font-bold">+1.0 BMI Point</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Low Activity (Minimal Exercise)</span>
                      <span className="text-gray-400">Standard Ranges</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-3">
                    Adjustments account for increased muscle mass and higher metabolic demands in active individuals.
                  </p>
                </div>

                <div className="p-6 bg-indigo-900/20 rounded-lg border border-indigo-800/50">
                  <h3 className="text-lg font-bold text-indigo-300 mb-3">Body Frame Considerations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Large Frame (Broad Build)</span>
                      <span className="text-indigo-400 font-bold">+1.0 BMI Point</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Medium Frame (Average Build)</span>
                      <span className="text-gray-400">Standard Ranges</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Small Frame (Narrow Build)</span>
                      <span className="text-indigo-400 font-bold">-1.0 BMI Point</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-3">
                    Frame adjustments account for skeletal structure and bone density variations.
                  </p>
                </div>
              </div>
            </div>

            {/* Comprehensive FAQ Section for Featured Snippets */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions - Healthy Weight Calculator</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-green-300 mb-3">What is a healthy weight range and how is it calculated?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    A <strong>healthy weight range is based on BMI standards (18.5-24.9)</strong> adjusted for personal factors. Our calculator uses <strong>WHO and CDC guidelines with personalized adjustments</strong>: age-based modifications (higher ranges for older adults), activity level bonuses (+1-2 BMI points for active individuals), and frame size considerations (±1 BMI point for large/small frames). This provides a customized healthy weight target range rather than a one-size-fits-all approach.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">How does age affect healthy weight ranges?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Research shows slightly higher BMI ranges may be healthier for older adults</strong>. Our calculator adjusts ranges: <strong>Young Adults (18-49): BMI 18.5-24.9</strong>, <strong>Middle-Aged (50-64): BMI 20.0-26.0</strong>, <strong>Older Adults (65+): BMI 22.0-27.0</strong>. Higher ranges for seniors help protect against frailty, support immune function, and maintain bone health. Age adjustments are based on longitudinal health studies and mortality research.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">What's the difference between healthy weight calculator and BMI calculator?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    A <strong>healthy weight calculator provides personalized weight ranges</strong> considering multiple factors (age, activity, frame), while <strong>BMI calculators only assess current weight status</strong>. Healthy weight calculators give you customized target ranges and goals, whereas BMI calculators categorize your current status (underweight, normal, overweight, obese). Our tool combines both approaches for comprehensive weight management guidance.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-orange-300 mb-3">How does activity level affect healthy weight calculations?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Activity level significantly impacts healthy weight ranges</strong> due to muscle mass differences. Our calculator adjusts: <strong>High Activity: +2 BMI points</strong> (athletes/daily training), <strong>Moderate Activity: +1 BMI point</strong> (regular exercisers 3-4x/week), <strong>Low Activity: Standard ranges apply</strong>. Active individuals can maintain higher healthy weights due to increased muscle mass, which weighs more than fat tissue but is metabolically beneficial.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-3">What is body frame size and how does it affect healthy weight?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Body frame size refers to bone structure and skeletal build</strong>. Our calculator adjusts healthy weight ranges: <strong>Large Frame: +1 BMI point range</strong> (broader bones, larger joints), <strong>Medium Frame: Standard ranges</strong>, <strong>Small Frame: -1 BMI point range</strong> (smaller bones, narrower build). Frame size accounts for structural differences that affect healthy weight targets, ensuring realistic and achievable goals.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">Can I use healthy weight calculator for weight loss planning?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Yes, healthy weight calculators are excellent for weight loss planning</strong>. They provide personalized target ranges rather than arbitrary goals. <strong>Safe weight loss is 0.5-1kg (1-2 pounds) per week</strong>. Calculate your timeline to reach your healthy weight range, then create a sustainable plan combining caloric management and physical activity. Always consult healthcare providers for personalized weight loss strategies.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-pink-300 mb-3">How accurate are healthy weight range calculations?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Healthy weight calculators provide evidence-based estimates with 85-90% accuracy</strong> for general populations. They're most accurate for average body compositions and less precise for athletes, bodybuilders, or individuals with medical conditions affecting body composition. <strong>Combine with body fat percentage analysis</strong> and professional healthcare consultation for optimal accuracy. Use as guidance tools rather than absolute targets.
                  </p>
                </div>
              </div>
            </div>

            {/* Weight Management Goals Section */}
            <div className="mb-12 bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-800/50">
              <h2 className="text-3xl font-bold mb-6 text-white">Weight Management Goals by Life Stage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50 text-center">
                  <h3 className="text-xl font-bold text-red-300 mb-4">Weight Loss Target</h3>
                  <div className="text-3xl font-bold text-red-400 mb-3">Lower Range</div>
                  <p className="text-gray-300 text-sm mb-4">
                    Target the lower end of your healthy weight range for safe, sustainable weight loss with health benefits.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>• Gradual approach (0.5-1kg/week)</p>
                    <p>• Sustainable lifestyle changes</p>
                    <p>• Professional guidance recommended</p>
                  </div>
                </div>

                <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50 text-center">
                  <h3 className="text-xl font-bold text-green-300 mb-4">Maintenance Target</h3>
                  <div className="text-3xl font-bold text-green-400 mb-3">Mid Range</div>
                  <p className="text-gray-300 text-sm mb-4">
                    Maintain weight in the middle of your healthy range for optimal health and metabolic stability.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>• Balanced nutrition approach</p>
                    <p>• Regular physical activity</p>
                    <p>• Flexible lifestyle maintenance</p>
                  </div>
                </div>

                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50 text-center">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">Muscle Gain Target</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-3">Upper Range</div>
                  <p className="text-gray-300 text-sm mb-4">
                    Target upper healthy range when building lean muscle mass through strength training and proper nutrition.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>• Progressive strength training</p>
                    <p>• Adequate protein intake</p>
                    <p>• Body composition monitoring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators Cross-Linking */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-800/50">
              <h2 className="text-2xl font-bold mb-6 text-white">Related Professional Health Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a href="/ideal-weight-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">Ideal Weight Calculator</h3>
                  <p className="text-gray-400 text-sm">Medical formula-based ideal weight calculation using Devine, Robinson & Miller methods</p>
                </a>
                <a href="/body-type-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2 group-hover:text-purple-300">Body Type Calculator</h3>
                  <p className="text-gray-400 text-sm">Somatotype analysis with personalized fitness and nutrition recommendations</p>
                </a>
                <a href="/bmi-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-green-400 mb-2 group-hover:text-green-300">BMI Calculator</h3>
                  <p className="text-gray-400 text-sm">Body Mass Index calculation with comprehensive health risk analysis</p>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HealthyWeightCalculatorPage;