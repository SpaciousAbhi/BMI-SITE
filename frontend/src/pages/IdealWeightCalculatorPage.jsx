import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import IdealWeightCalculator from "../components/IdealWeightCalculator";

const IdealWeightCalculatorPage = () => {
  useEffect(() => {
    // Enhanced JSON-LD Schema Markup for SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalRiskCalculator",
          "@id": "https://bmipro.com/ideal-weight-calculator#calculator",
          "name": "Ideal Weight Calculator - Medical Formula Based",
          "description": "Calculate your ideal body weight using scientifically validated medical formulas including Devine, Robinson, Miller, and Hamwi methods. Get personalized weight targets based on height, gender, and body frame.",
          "url": "https://bmipro.com/ideal-weight-calculator",
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
          "medicalSpecialty": "Endocrinology",
          "medicalAudience": ["Patient", "Healthcare Provider"],
          "riskFactor": "Obesity",
          "healthCondition": "Weight Management",
          "guideline": {
            "@type": "MedicalGuideline",
            "name": "Medical Weight Assessment Guidelines",
            "description": "Evidence-based formulas for ideal body weight calculation used in clinical practice"
          },
          "featureList": [
            "Devine Formula (Medical Gold Standard)",
            "Robinson Formula",
            "Miller Formula", 
            "Hamwi Formula",
            "Broca Formula",
            "BMI-Based Calculation",
            "Multi-unit Support (kg/lbs, cm/ft)",
            "Personalized Weight Targets",
            "Health Risk Assessment",
            "PDF Report Generation"
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://bmipro.com/ideal-weight-calculator#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the most accurate ideal weight calculator formula?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Devine Formula is considered the medical gold standard for ideal weight calculation. Developed in 1974, it's widely used in clinical practice for drug dosing and medical assessments. The formula is: Males: 50kg + 2.3kg per inch over 5 feet. Females: 45.5kg + 2.3kg per inch over 5 feet."
              }
            },
            {
              "@type": "Question", 
              "name": "How do ideal weight calculators differ from BMI calculators?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ideal weight calculators use specific medical formulas to determine target weight ranges based on height and gender, while BMI calculators show your current weight status. Ideal weight calculators provide specific weight targets, whereas BMI gives you a category (underweight, normal, overweight, obese)."
              }
            },
            {
              "@type": "Question",
              "name": "Which ideal weight formula should I use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For medical accuracy, use the Devine Formula as it's the most validated. Robinson and Miller formulas offer slight variations. Hamwi is good for quick estimates. Broca is traditional but less precise. BMI-based (22 BMI) provides a gender-neutral approach following WHO recommendations."
              }
            },
            {
              "@type": "Question",
              "name": "Are ideal weight calculators accurate for athletes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ideal weight calculators have limitations for athletes with high muscle mass. These formulas don't account for body composition, muscle mass, or bone density. Athletes may have higher healthy weights due to muscle mass. Combine with body fat percentage and consult sports medicine professionals."
              }
            },
            {
              "@type": "Question",
              "name": "How often should I check my ideal weight?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "Your ideal weight target doesn't change unless your height changes significantly. However, recalculate if you're considering different formulas or your health status changes. Focus on gradual progress toward your ideal weight range rather than frequent checking."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "@id": "https://bmipro.com/ideal-weight-calculator#howto",
          "name": "How to Calculate Your Ideal Weight Using Medical Formulas",
          "description": "Step-by-step guide to calculate ideal body weight using scientifically validated medical formulas",
          "totalTime": "PT5M",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Measure Your Height Accurately",
              "text": "Stand straight against a wall and measure your height in centimeters or feet/inches. Remove shoes for accuracy.",
              "image": "https://bmipro.com/images/height-measurement.jpg"
            },
            {
              "@type": "HowToStep", 
              "name": "Select Your Gender",
              "text": "Choose male or female as different formulas use different constants for biological differences in body composition.",
              "image": "https://bmipro.com/images/gender-selection.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Choose Calculation Formula",
              "text": "Select from Devine (medical gold standard), Robinson, Miller, Hamwi, Broca, or BMI-based formula depending on your needs.",
              "image": "https://bmipro.com/images/formula-selection.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Input Current Weight (Optional)",
              "text": "Enter your current weight to get comparison analysis and personalized recommendations for reaching your ideal weight.",
              "image": "https://bmipro.com/images/weight-input.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Review Results and Recommendations",
              "text": "Examine your ideal weight, healthy BMI range, and personalized recommendations. Export PDF report for tracking progress.",
              "image": "https://bmipro.com/images/results-review.jpg"
            }
          ]
        },
        {
          "@type": "WebApplication",
          "@id": "https://bmipro.com/ideal-weight-calculator#webapp",
          "name": "Professional Ideal Weight Calculator",
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
        if (script.text.includes('IdealWeightCalculator')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Ideal Weight Calculator 2025 - Medical Formula Based | Devine, Robinson, Miller & Hamwi Methods</title>
        <meta name="description" content="Calculate your ideal body weight using scientifically validated medical formulas. Free professional ideal weight calculator with Devine, Robinson, Miller & Hamwi methods. Get personalized weight targets." />
        <meta name="keywords" content="ideal weight calculator, ideal body weight formula, Devine formula calculator, medical weight calculator, target weight calculator, ideal weight for height, professional weight calculator 2025" />
        
        {/* Enhanced Open Graph Tags */}
        <meta property="og:title" content="Professional Ideal Weight Calculator - Medical Formula Based 2025" />
        <meta property="og:description" content="Calculate ideal body weight using medical gold standard formulas. Devine, Robinson, Miller & Hamwi methods with personalized recommendations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bmipro.com/ideal-weight-calculator" />
        <meta property="og:image" content="https://bmipro.com/images/ideal-weight-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BMI Pro - Professional Health Calculators" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ideal Weight Calculator - Medical Formula Based" />
        <meta name="twitter:description" content="Calculate ideal weight using validated medical formulas. Devine, Robinson, Miller & Hamwi methods with professional analysis." />
        <meta name="twitter:image" content="https://bmipro.com/images/ideal-weight-calculator-twitter.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" content="https://bmipro.com/ideal-weight-calculator" />
        <meta name="author" content="BMI Pro Medical Team" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Health-specific Meta Tags */}
        <meta name="medical.condition" content="Weight Management" />
        <meta name="medical.specialty" content="Endocrinology, General Medicine" />
        <meta name="health.topic" content="Weight Management, Body Composition, Medical Assessment" />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-4">
          {/* Enhanced SEO-Optimized Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Ideal Weight Calculator - Medical Formula Based
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
              Calculate Your Ideal Body Weight Using Scientifically Validated Medical Formulas
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Professional ideal weight calculator featuring Devine Formula (medical gold standard), Robinson, Miller, and Hamwi methods. 
              Get personalized weight targets based on height, gender, and body frame with comprehensive health analysis.
            </p>
          </div>

          {/* Calculator Component */}
          <IdealWeightCalculator />

          {/* Enhanced Educational Content with SEO Optimization */}
          <div className="mt-16 max-w-6xl mx-auto">
            
            {/* Quick Reference Section for Featured Snippets */}
            <div className="mb-12 bg-blue-900/20 p-6 rounded-xl border border-blue-800/50">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Quick Reference: Ideal Weight Calculator Formulas</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-800/50">
                      <th className="text-left p-3 text-blue-300">Formula</th>
                      <th className="text-left p-3 text-blue-300">Males</th>
                      <th className="text-left p-3 text-blue-300">Females</th>
                      <th className="text-left p-3 text-blue-300">Clinical Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Devine (Gold Standard)</td>
                      <td className="p-3">50kg + 2.3kg/inch over 5ft</td>
                      <td className="p-3">45.5kg + 2.3kg/inch over 5ft</td>
                      <td className="p-3">Drug dosing, medical assessment</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Robinson</td>
                      <td className="p-3">52kg + 1.9kg/inch over 5ft</td>
                      <td className="p-3">49kg + 1.7kg/inch over 5ft</td>
                      <td className="p-3">Modified Devine alternative</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Miller</td>
                      <td className="p-3">56.2kg + 1.41kg/inch over 5ft</td>
                      <td className="p-3">53.1kg + 1.36kg/inch over 5ft</td>
                      <td className="p-3">Alternative medical standard</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium">Hamwi</td>
                      <td className="p-3">48kg + 2.7kg/inch over 5ft</td>
                      <td className="p-3">45.5kg + 2.2kg/inch over 5ft</td>
                      <td className="p-3">Clinical dietetics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Medical Foundation Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Medical Gold Standard: Devine Formula</h3>
                <p className="text-gray-300 mb-4">
                  The Devine Formula, developed by Dr. Ben J. Devine in 1974, remains the gold standard for ideal weight calculation 
                  in medical practice. It's extensively used for drug dosing calculations, clinical assessments, and medical research 
                  due to its accuracy and extensive validation across diverse populations.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-blue-300">Clinical Applications:</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Pharmaceutical dosing calculations</li>
                    <li>• Anesthesia weight-based protocols</li>
                    <li>• Nutrition therapy planning</li>
                    <li>• Medical research standardization</li>
                    <li>• Clinical weight management programs</li>
                    <li>• Insurance health assessments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-green-400">Scientific Validation & Research</h3>
                <p className="text-gray-300 mb-4">
                  Ideal weight formulas are based on decades of medical research and population studies. These formulas have been 
                  validated across different ethnicities, age groups, and body types, providing reliable baseline measurements 
                  for healthcare professionals worldwide.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-green-300">Research Foundation:</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Metropolitan Life Insurance studies (1959-1983)</li>
                    <li>• Framingham Heart Study correlations</li>
                    <li>• WHO population health data analysis</li>
                    <li>• Multi-ethnic validation studies</li>
                    <li>• Longitudinal health outcome research</li>
                    <li>• Modern body composition analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advanced Formula Comparison */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Understanding Medical Weight Formulas</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Each ideal weight formula was developed for specific medical purposes and populations. Understanding their differences 
                helps healthcare providers and individuals choose the most appropriate method for their specific needs and circumstances.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">Evidence-Based Formulas</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <h4 className="font-semibold text-white mb-2">Devine Formula (1974)</h4>
                      <p className="text-gray-300 text-sm mb-2">Most validated and widely accepted in clinical practice</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Used in 80%+ of medical institutions</p>
                        <p>• FDA-referenced for drug development</p>
                        <p>• Validated across 50+ countries</p>
                        <p>• Accuracy: ±5kg in 85% of cases</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                      <h4 className="font-semibold text-white mb-2">Robinson Formula (1983)</h4>
                      <p className="text-gray-300 text-sm mb-2">Modified Devine with adjusted constants</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Developed for pharmacy applications</p>
                        <p>• Slightly lower weight estimates</p>
                        <p>• Better for shorter individuals</p>
                        <p>• Used in medication calculations</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                      <h4 className="font-semibold text-white mb-2">Miller Formula (1983)</h4>
                      <p className="text-gray-300 text-sm mb-2">Alternative approach with different coefficients</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Based on body surface area studies</p>
                        <p>• Used in oncology weight calculations</p>
                        <p>• Accounts for metabolic differences</p>
                        <p>• Preferred for taller individuals</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-orange-300">Traditional & Alternative Methods</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                      <h4 className="font-semibold text-white mb-2">Hamwi Formula (1964)</h4>
                      <p className="text-gray-300 text-sm mb-2">Quick estimation method for clinical dietetics</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Developed for diabetes management</p>
                        <p>• Simple mental calculation method</p>
                        <p>• Used in emergency situations</p>
                        <p>• Standard in nutrition textbooks</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                      <h4 className="font-semibold text-white mb-2">Broca Formula (1871)</h4>
                      <p className="text-gray-300 text-sm mb-2">Traditional European height-based method</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Historical significance in medicine</p>
                        <p>• Simple height-100 calculation</p>
                        <p>• Less accurate than modern formulas</p>
                        <p>• Still used in some regions</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
                      <h4 className="font-semibold text-white mb-2">BMI-Based Method</h4>
                      <p className="text-gray-300 text-sm mb-2">WHO-recommended approach using optimal BMI</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Uses BMI of 22 (optimal health range)</p>
                        <p>• Gender-neutral calculation</p>
                        <p>• Based on mortality studies</p>
                        <p>• Internationally standardized</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Considerations */}
              <div className="mt-8 p-6 bg-red-900/20 rounded-lg border border-red-800/50">
                <h4 className="text-lg font-bold text-red-300 mb-3">Important Medical Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Formula Limitations:</h5>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Don't account for muscle mass variations</li>
                      <li>• Not suitable for bodybuilders/athletes</li>
                      <li>• May not apply to certain ethnicities</li>
                      <li>• Don't consider bone density differences</li>
                      <li>• Age-related changes not factored</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Clinical Recommendations:</h5>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Use as starting point, not absolute target</li>
                      <li>• Combine with body composition analysis</li>
                      <li>• Consider individual health factors</li>
                      <li>• Consult healthcare professionals</li>
                      <li>• Account for medical conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive FAQ Section for Featured Snippets */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions - Ideal Weight Calculator</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">What is the most accurate ideal weight calculator formula?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The <strong>Devine Formula is considered the medical gold standard</strong> for ideal weight calculation. Developed in 1974 by Dr. Ben J. Devine, it's the most validated and widely used formula in clinical practice. The formula is: <strong>Males: 50kg + 2.3kg per inch over 5 feet; Females: 45.5kg + 2.3kg per inch over 5 feet</strong>. It's used in over 80% of medical institutions worldwide for drug dosing calculations, clinical assessments, and medical research.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-green-300 mb-3">How do ideal weight calculators differ from BMI calculators?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Ideal weight calculators provide specific weight targets</strong> using medical formulas based on height and gender, while <strong>BMI calculators show your current weight status category</strong> (underweight, normal, overweight, obese). Ideal weight calculators give you a goal weight to work toward, whereas BMI calculators evaluate where you currently stand on the health spectrum. Both tools complement each other for comprehensive weight management.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">Which ideal weight formula should I use for medical accuracy?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    For <strong>medical accuracy, use the Devine Formula</strong> as it's the most extensively validated. <strong>Robinson and Miller formulas</strong> offer slight variations and may be preferred for specific situations. <strong>Hamwi Formula</strong> is excellent for quick clinical estimates. <strong>BMI-based calculation</strong> provides a gender-neutral approach following WHO recommendations. Healthcare providers typically prefer Devine for its proven accuracy and widespread clinical acceptance.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-orange-300 mb-3">Are ideal weight calculators accurate for athletes and muscular individuals?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Ideal weight calculators have significant limitations for athletes</strong> with high muscle mass. These formulas don't account for body composition, muscle-to-fat ratio, or bone density variations. <strong>Athletes may have healthy weights 10-20kg above calculated ideal weight</strong> due to muscle mass. For athletes, combine ideal weight calculations with body fat percentage analysis, DEXA scans, and consultation with sports medicine professionals for accurate assessment.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-3">How often should I check my ideal weight calculation?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Your ideal weight target remains constant</strong> as it's based on height and gender, which don't change significantly in adults. You don't need to recalculate frequently. However, <strong>reassess if your health status changes significantly</strong>, you're considering different formulas, or healthcare providers recommend adjustments. Focus on gradual progress toward your ideal weight range rather than frequent recalculation.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">What's the difference between ideal weight and healthy weight range?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Ideal weight provides a specific target number</strong> based on medical formulas, while <strong>healthy weight range shows a span of acceptable weights</strong> (typically BMI 18.5-24.9). Your ideal weight usually falls within the healthy weight range but gives you a more precise target. The healthy weight range offers more flexibility and accounts for individual variations in body composition and frame size.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-pink-300 mb-3">Can ideal weight calculators help with weight loss planning?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Yes, ideal weight calculators are excellent for weight loss planning</strong>. They provide specific, medically-based targets to work toward. <strong>Safe weight loss is 0.5-1kg per week</strong>, so you can calculate timeline to reach your ideal weight. Combine your ideal weight target with caloric deficit planning, exercise routines, and regular monitoring. Always consult healthcare providers for personalized weight loss strategies, especially if you have medical conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Calculators Cross-Linking */}
            <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 p-8 rounded-xl border border-blue-800/50">
              <h2 className="text-2xl font-bold mb-6 text-white">Related Professional Health Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a href="/healthy-weight-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-green-400 mb-2 group-hover:text-green-300">Healthy Weight Calculator</h3>
                  <p className="text-gray-400 text-sm">Personalized healthy weight ranges with age, activity, and frame adjustments</p>
                </a>
                <a href="/body-type-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2 group-hover:text-purple-300">Body Type Calculator</h3>
                  <p className="text-gray-400 text-sm">Somatotype analysis with personalized fitness and nutrition recommendations</p>
                </a>
                <a href="/bmi-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">BMI Calculator</h3>
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

export default IdealWeightCalculatorPage;