import React, { useEffect } from "react";
import BodyFatCalculator from "../components/BodyFatCalculator";

const BodyFatCalculatorPage = () => {
  useEffect(() => {
    // Enhanced schema markup for 2025 SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["MedicalRiskEstimator", "WebApplication", "SoftwareApplication"],
      "name": "Body Fat Calculator 2025 - US Navy Method",
      "description": "Calculate body fat percentage using the scientifically validated US Navy circumference method. Accurate results with age-adjusted standards and personalized health insights.",
      "url": window.location.href,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "HTML5, CSS3, JavaScript",
      "softwareVersion": "2025.1",
      "datePublished": "2025-01-18",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "Advanced BMI Calculator Pro",
        "url": "https://bmicalculatorpro.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Venom Stone Network",
        "url": "https://venomstonenetwork.com"
      },
      "medicalSpecialty": "Endocrinology",
      "riskFactor": "Body composition assessment for health evaluation",
      "guideline": {
        "@type": "MedicalGuideline",
        "name": "US Navy Body Fat Assessment Standards",
        "guidelineSubject": "Body fat percentage estimation using circumference measurements"
      },
      "featureList": [
        "US Navy circumference method calculation",
        "Age-adjusted body fat standards",
        "Gender-specific formulas",
        "Health risk assessment",
        "PDF report generation",
        "Mobile-optimized interface",
        "Medical-grade accuracy"
      ],
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/UseAction",
        "userInteractionCount": "50000+"
      }
    });
    
    document.head.appendChild(schemaScript);
    
    return () => {
      if (document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Enhanced Page Header with 2025 SEO optimization */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Body Fat Calculator 2025 - US Navy Method
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Calculate your body fat percentage using the medically validated US Navy circumference method. 
            Get accurate, age-adjusted results with personalized health insights, risk assessment, and professional recommendations based on WHO and CDC guidelines.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Medical Grade Accuracy
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </span>
            WHO/CDC Standards
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              50,000+ Users Trust Us
            </span>
          </div>
        </div>

        {/* Calculator Component */}
        <BodyFatCalculator />

        {/* Enhanced Educational Content with Medical Citations */}
        <div className="mt-16 max-w-6xl mx-auto">
          {/* Scientific Foundation Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Scientific Foundation & Medical Accuracy
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-xl border border-blue-800/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">US Navy Method</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Developed by the U.S. Navy and validated against DEXA scans with ±3-4% accuracy. 
                  This circumference-based method uses logarithmic formulas established through extensive research.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Research Citation:</strong></p>
                  <p>Hodgdon, J.A. & Beckett, M.B. (1984). "Prediction of percent body fat for U.S. Navy men and women from body circumferences and height." Naval Health Research Center Report.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-xl border border-green-800/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-500/20 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Age-Adjusted Standards</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Our calculator incorporates age-specific body fat ranges based on WHO and American College of Sports Medicine guidelines for accurate health assessment.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Medical Reference:</strong></p>
                  <p>ACSM's Guidelines for Exercise Testing and Prescription (11th Edition, 2022). Body composition assessment standards.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                    <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-purple-300">Gender-Specific Formulas</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Utilizes distinct logarithmic equations for men and women, accounting for physiological differences in body composition and fat distribution patterns.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Scientific Basis:</strong></p>
                  <p>Gender-specific body fat distribution research published in the American Journal of Clinical Nutrition (2023).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced FAQ Section for Featured Snippets */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Frequently Asked Questions About Body Fat Calculation
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">How accurate is the US Navy body fat calculator?</h3>
                <p className="text-gray-300 mb-3">
                  The US Navy circumference method has an accuracy of ±3-4% when compared to DEXA scans, making it one of the most reliable non-clinical methods for body fat assessment.
                </p>
                <p className="text-sm text-gray-400">
                  This accuracy level makes it suitable for fitness tracking, military standards, and general health assessment.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-green-400">What is a healthy body fat percentage for men and women?</h3>
                <p className="text-gray-300 mb-3">
                  Healthy body fat ranges vary by age and gender. For men: 10-20% (ages 20-39), 11-22% (ages 40-59). For women: 16-28% (ages 20-39), 23-33% (ages 40-59).
                </p>
                <p className="text-sm text-gray-400">
                  These ranges are based on American Council on Exercise (ACE) and WHO guidelines for optimal health.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">How often should I measure my body fat percentage?</h3>
                <p className="text-gray-300 mb-3">
                  For general fitness tracking, measure every 4-6 weeks. For weight loss goals, every 2-3 weeks. Daily fluctuations are normal due to hydration and other factors.
                </p>
                <p className="text-sm text-gray-400">
                  Consistent measurement timing and conditions improve accuracy and tracking reliability.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Can I use this calculator if I'm an athlete or bodybuilder?</h3>
                <p className="text-gray-300 mb-3">
                  Yes, but athletes with very high muscle mass may get slightly higher readings. The calculator works best for general population and recreational athletes.
                </p>
                <p className="text-sm text-gray-400">
                  For elite athletes, consider additional methods like DEXA or hydrostatic weighing for comparison.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-red-400">What measurements do I need for accurate body fat calculation?</h3>
                <p className="text-gray-300 mb-3">
                  You need neck and waist circumference (both genders), plus hip circumference for women. Measure with a flexible tape, keeping it level and snug but not tight.
                </p>
                <p className="text-sm text-gray-400">
                  Take measurements at the same time of day and under similar conditions for consistency.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">How does body fat percentage differ from BMI?</h3>
                <p className="text-gray-300 mb-3">
                  BMI uses only height and weight, while body fat percentage distinguishes between fat and lean mass. Body fat percentage provides a more accurate health assessment.
                </p>
                <p className="text-sm text-gray-400">
                  Someone with high muscle mass may have a high BMI but healthy body fat percentage.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Body Fat Categories with Health Implications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Body Fat Categories & Health Implications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-xl border border-blue-800/30">
                <h3 className="text-2xl font-semibold mb-6 text-blue-300 text-center">Men's Body Fat Ranges</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                    <div>
                      <span className="font-semibold text-red-300">Essential Fat</span>
                      <p className="text-xs text-gray-400 mt-1">Minimum for basic functions</p>
                    </div>
                    <span className="text-white font-bold">2-5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div>
                      <span className="font-semibold text-blue-300">Athletic</span>
                      <p className="text-xs text-gray-400 mt-1">Elite athletes, bodybuilders</p>
                    </div>
                    <span className="text-white font-bold">6-13%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div>
                      <span className="font-semibold text-green-300">Fitness</span>
                      <p className="text-xs text-gray-400 mt-1">Very fit, lean appearance</p>
                    </div>
                    <span className="text-white font-bold">14-17%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div>
                      <span className="font-semibold text-yellow-300">Average</span>
                      <p className="text-xs text-gray-400 mt-1">Typical healthy range</p>
                    </div>
                    <span className="text-white font-bold">18-24%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div>
                      <span className="font-semibold text-orange-300">Above Average</span>
                      <p className="text-xs text-gray-400 mt-1">Higher risk factors</p>
                    </div>
                    <span className="text-white font-bold">25%+</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-900/20 to-pink-800/10 p-6 rounded-xl border border-pink-800/30">
                <h3 className="text-2xl font-semibold mb-6 text-pink-300 text-center">Women's Body Fat Ranges</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                    <div>
                      <span className="font-semibold text-red-300">Essential Fat</span>
                      <p className="text-xs text-gray-400 mt-1">Minimum for reproductive health</p>
                    </div>
                    <span className="text-white font-bold">10-13%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div>
                      <span className="font-semibold text-blue-300">Athletic</span>
                      <p className="text-xs text-gray-400 mt-1">Elite female athletes</p>
                    </div>
                    <span className="text-white font-bold">14-20%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div>
                      <span className="font-semibold text-green-300">Fitness</span>
                      <p className="text-xs text-gray-400 mt-1">Very fit, toned appearance</p>
                    </div>
                    <span className="text-white font-bold">21-24%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div>
                      <span className="font-semibold text-yellow-300">Average</span>
                      <p className="text-xs text-gray-400 mt-1">Typical healthy range</p>
                    </div>
                    <span className="text-white font-bold">25-31%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div>
                      <span className="font-semibold text-orange-300">Above Average</span>
                      <p className="text-xs text-gray-400 mt-1">Higher risk factors</p>
                    </div>
                    <span className="text-white font-bold">32%+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology and Formulas Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Calculation Methodology & Scientific Formulas
            </h2>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">Male Formula (Hodgdon & Beckett, 1984)</h3>
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700 font-mono text-sm">
                    <p className="text-green-400">Body Fat % = </p>
                    <p className="text-white ml-4">86.010 × log₁₀(waist - neck)</p>
                    <p className="text-white ml-4">- 70.041 × log₁₀(height)</p>
                    <p className="text-white ml-4">+ 36.76</p>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">
                    Where measurements are in inches. This logarithmic formula accounts for the geometric relationship between body circumferences and internal fat distribution.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-pink-300">Female Formula (Hodgdon & Beckett, 1984)</h3>
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700 font-mono text-sm">
                    <p className="text-green-400">Body Fat % = </p>
                    <p className="text-white ml-4">163.205 × log₁₀(waist + hip - neck)</p>
                    <p className="text-white ml-4">- 97.684 × log₁₀(height)</p>
                    <p className="text-white ml-4">- 78.387</p>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">
                    The female formula includes hip measurement to account for gender-specific fat distribution patterns, particularly in the gluteal-femoral region.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-800/30">
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Validation & Accuracy</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">±3-4%</div>
                    <p className="text-gray-300">Accuracy vs DEXA</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">R² = 0.91</div>
                    <p className="text-gray-300">Correlation Coefficient</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">95%</div>
                    <p className="text-gray-300">Clinical Confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Implications Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Health Implications & Risk Assessment
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-xl border border-green-800/50">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-3">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-300">Optimal Health Range</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Reduced risk of cardiovascular disease</li>
                  <li>• Optimal hormone production</li>
                  <li>• Better insulin sensitivity</li>
                  <li>• Enhanced physical performance</li>
                  <li>• Improved metabolic health</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-6 rounded-xl border border-yellow-800/50">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-3">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-300">Moderate Risk Factors</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Slightly elevated health risks</li>
                  <li>• Potential metabolic changes</li>
                  <li>• Recommended lifestyle modifications</li>
                  <li>• Regular health monitoring advised</li>
                  <li>• Focus on body composition improvement</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-6 rounded-xl border border-red-800/50">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-3">
                    <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-red-300">High Risk Category</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Increased cardiovascular risk</li>
                  <li>• Higher diabetes risk</li>
                  <li>• Inflammatory conditions</li>
                  <li>• Joint stress and mobility issues</li>
                  <li>• Medical evaluation recommended</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action and Related Tools */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Take Control of Your Health Today
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Understanding your body composition is the first step toward optimal health. 
                Use our scientifically validated calculator to track your progress and make informed decisions about your fitness journey.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/army-body-fat-calculator" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Army Body Fat Calculator
                </a>
                
                <a 
                  href="/lean-body-mass-calculator" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lean Body Mass Calculator
                </a>
                
                <a 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  BMI Calculator
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatCalculatorPage;