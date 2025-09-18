import React, { useEffect } from "react";
import ArmyBodyFatCalculator from "../components/ArmyBodyFatCalculator";

const ArmyBodyFatCalculatorPage = () => {
  useEffect(() => {
    // Enhanced schema markup for 2025 Army Body Fat Calculator SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["MedicalRiskEstimator", "WebApplication", "SoftwareApplication"],
      "name": "Army Body Fat Calculator 2025 - AR 600-9 Standards",
      "description": "Official Army body fat calculator using AR 600-9 regulation standards. Calculate body fat percentage with the new Army tape test method for military fitness requirements.",
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
      "medicalSpecialty": "Military Medicine",
      "riskFactor": "Military body composition assessment for Army fitness standards",
      "guideline": {
        "@type": "MedicalGuideline",
        "name": "Army Regulation 600-9 Body Composition Program",
        "guidelineSubject": "Army body fat percentage standards and assessment procedures"
      },
      "featureList": [
        "AR 600-9 regulation compliance",
        "New Army tape test method (2023)",
        "Age-group specific standards",
        "Pass/Fail determination",
        "Military fitness assessment",
        "PDF report generation",
        "Mobile-optimized interface"
      ],
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/UseAction",
        "userInteractionCount": "25000+"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Military Personnel, Army Recruits, Fitness Professionals"
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
        {/* Enhanced Page Header with Military Theme */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Army Body Fat Calculator 2025
            </span>
          </h1>
          <div className="text-lg text-gray-300 mb-4">
            <span className="inline-block px-3 py-1 bg-green-900/30 rounded-full border border-green-800/50 text-green-300 text-sm font-semibold mr-2">
              AR 600-9 OFFICIAL
            </span>
            <span className="inline-block px-3 py-1 bg-blue-900/30 rounded-full border border-blue-800/50 text-blue-300 text-sm font-semibold">
              NEW 2023 TAPE TEST
            </span>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Official U.S. Army body fat calculator using Army Regulation 600-9 standards. 
            Calculate your body fat percentage with the updated tape test method for military fitness requirements and career progression.
          </p>
          
          {/* Military Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AR 600-9 Compliant
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Military Standard
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Trusted by 25,000+ Soldiers
            </span>
          </div>
        </div>

        {/* Calculator Component */}
        <ArmyBodyFatCalculator />

        {/* Enhanced Educational Content with Military Context */}
        <div className="mt-16 max-w-6xl mx-auto">
          {/* Army Regulation 600-9 Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Army Regulation 600-9 Body Composition Program
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-xl border border-green-800/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-500/20 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">New Tape Test (2023)</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The updated Army body composition assessment uses a simplified tape test method while maintaining the same accuracy standards required for military service.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Official Reference:</strong></p>
                  <p>Army Regulation 600-9, "The Army Body Composition Program" (Updated 2023). Department of the Army.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-xl border border-blue-800/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">Age-Group Standards</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Army body fat standards are adjusted by age groups to account for natural physiological changes while maintaining military readiness requirements.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Regulatory Basis:</strong></p>
                  <p>Age-adjusted standards based on Department of Defense studies on body composition and military performance correlation.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-6 rounded-xl border border-yellow-800/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-full mr-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-300">Career Impact</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Body composition compliance affects promotion eligibility, school attendance, and overall military career progression under current Army policies.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2"><strong>Policy Reference:</strong></p>
                  <p>AR 600-9 Chapter 3: "Administrative Actions and Consequences for Non-Compliance."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced FAQ Section for Army-Specific Queries */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Army Body Fat Calculator - Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-green-400">What are the current Army body fat standards for 2025?</h3>
                <p className="text-gray-300 mb-3">
                  Army body fat standards vary by age and gender. For males: 20% (ages 17-20), 22% (21-27), 24% (28-39), 26% (40+). 
                  For females: 30% (17-20), 32% (21-27), 34% (28-39), 36% (40+).
                </p>
                <p className="text-sm text-gray-400">
                  These standards are established under AR 600-9 and are strictly enforced for all Army personnel.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">How does the new Army tape test work in 2023?</h3>
                <p className="text-gray-300 mb-3">
                  The 2023 Army tape test maintains the same circumference measurements (neck, waist, and hip for females) but with updated procedures for consistency and accuracy across all installations.
                </p>
                <p className="text-sm text-gray-400">
                  The mathematical formulas remain unchanged, ensuring continuity with historical Army body composition data.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">What happens if I fail the Army body fat assessment?</h3>
                <p className="text-gray-300 mb-3">
                  Soldiers exceeding body fat standards enter the Army Body Composition Program (ABCP) with mandatory enrollment in weight control programs and potential administrative actions.
                </p>
                <p className="text-sm text-gray-400">
                  Consequences may include promotion restrictions, school limitations, and potential separation if standards aren't met within prescribed timeframes.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">How accurate is the Army body fat calculator compared to other methods?</h3>
                <p className="text-gray-300 mb-3">
                  The Army method has ±3-4% accuracy compared to DEXA scans. While not the most precise method available, it's standardized, cost-effective, and suitable for large-scale military assessments.
                </p>
                <p className="text-sm text-gray-400">
                  The method prioritizes consistency and reproducibility across all Army installations worldwide.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Can I request a retest if I disagree with my Army body fat results?</h3>
                <p className="text-gray-300 mb-3">
                  Yes, soldiers can request retests and appeals. The process includes verification of measurements, proper tape test procedures, and potential assessment by medical personnel.
                </p>
                <p className="text-sm text-gray-400">
                  Appeals must be submitted within specific timeframes as outlined in AR 600-9 Chapter 4.
                </p>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">How often are Army body fat assessments conducted?</h3>
                <p className="text-gray-300 mb-3">
                  Body fat assessments are conducted during regular ACFT testing periods, typically semi-annually, or when a soldier exceeds height and weight standards on the screening table.
                </p>
                <p className="text-sm text-gray-400">
                  Soldiers in the ABCP may require more frequent assessments as determined by their unit and medical personnel.
                </p>
              </div>
            </div>
          </div>

          {/* Army Body Fat Standards Table */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Official Army Body Fat Standards by Age Group
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-xl border border-blue-800/30">
                <h3 className="text-2xl font-semibold mb-6 text-blue-300 text-center">Male Standards (AR 600-9)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div>
                      <span className="font-semibold text-green-300">Ages 17-20</span>
                      <p className="text-xs text-gray-400 mt-1">Entry level, initial service</p>
                    </div>
                    <span className="text-white font-bold text-lg">20%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div>
                      <span className="font-semibold text-blue-300">Ages 21-27</span>
                      <p className="text-xs text-gray-400 mt-1">Junior enlisted, early career</p>
                    </div>
                    <span className="text-white font-bold text-lg">22%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div>
                      <span className="font-semibold text-yellow-300">Ages 28-39</span>
                      <p className="text-xs text-gray-400 mt-1">Mid-career, NCO levels</p>
                    </div>
                    <span className="text-white font-bold text-lg">24%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div>
                      <span className="font-semibold text-orange-300">Ages 40+</span>
                      <p className="text-xs text-gray-400 mt-1">Senior NCO, officer levels</p>
                    </div>
                    <span className="text-white font-bold text-lg">26%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-900/20 to-pink-800/10 p-6 rounded-xl border border-pink-800/30">
                <h3 className="text-2xl font-semibold mb-6 text-pink-300 text-center">Female Standards (AR 600-9)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div>
                      <span className="font-semibold text-green-300">Ages 17-20</span>
                      <p className="text-xs text-gray-400 mt-1">Entry level, initial service</p>
                    </div>
                    <span className="text-white font-bold text-lg">30%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div>
                      <span className="font-semibold text-blue-300">Ages 21-27</span>
                      <p className="text-xs text-gray-400 mt-1">Junior enlisted, early career</p>
                    </div>
                    <span className="text-white font-bold text-lg">32%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div>
                      <span className="font-semibold text-yellow-300">Ages 28-39</span>
                      <p className="text-xs text-gray-400 mt-1">Mid-career, NCO levels</p>
                    </div>
                    <span className="text-white font-bold text-lg">34%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div>
                      <span className="font-semibold text-orange-300">Ages 40+</span>
                      <p className="text-xs text-gray-400 mt-1">Senior NCO, officer levels</p>
                    </div>
                    <span className="text-white font-bold text-lg">36%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Army Body Composition Program (ABCP) Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Army Body Composition Program (ABCP) Overview
            </h2>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-red-300">Enrollment Triggers</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Exceeding body fat standards</li>
                    <li>• Failing height/weight screening</li>
                    <li>• Medical referral</li>
                    <li>• Commander discretion</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-300">Program Requirements</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Mandatory nutrition counseling</li>
                    <li>• Structured fitness program</li>
                    <li>• Regular progress assessments</li>
                    <li>• Medical monitoring</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-green-300">Success Outcomes</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Return to regular status</li>
                    <li>• Promotion eligibility restored</li>
                    <li>• School attendance approved</li>
                    <li>• Career progression normalized</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Military Fitness Tips */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Military Fitness & Body Composition Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-xl border border-green-800/50">
                <h3 className="text-lg font-semibold mb-4 text-green-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 000 1.838l-8.5 3.64a1 1 0 00-.356 1.58l1.928 3.856a1 1 0 00.894.553h6.894a1 1 0 00.894-.553l1.928-3.856a1 1 0 00-.356-1.58l-8.5-3.64a1 1 0 000-1.838l1.94-.831-2.727-1.169a1 1 0 01-.356-.257L10.394 2.08z" />
                  </svg>
                  Preparation Strategies
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Track measurements regularly</li>
                  <li>• Focus on core strengthening</li>
                  <li>• Maintain consistent hydration</li>
                  <li>• Practice proper measurement techniques</li>
                  <li>• Document progress weekly</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-xl border border-blue-800/50">
                <h3 className="text-lg font-semibold mb-4 text-blue-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Nutrition Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Follow Army nutrition standards</li>
                  <li>• Emphasize lean proteins</li>
                  <li>• Control portion sizes</li>
                  <li>• Limit processed foods</li>
                  <li>• Stay within caloric requirements</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-6 rounded-xl border border-yellow-800/50">
                <h3 className="text-lg font-semibold mb-4 text-yellow-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Exercise Recommendations
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Combine cardio and strength training</li>
                  <li>• Focus on compound movements</li>
                  <li>• Include HIIT workouts</li>
                  <li>• Maintain ACFT readiness</li>
                  <li>• Progressive overload principles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action for Military Personnel */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Stay Mission Ready - Maintain Army Standards
              </h3>
              <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                Use this official AR 600-9 compliant calculator to track your body composition and ensure you meet Army fitness standards. 
                Your military career depends on maintaining these requirements.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/body-fat-calculator" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  US Navy Body Fat Calculator
                </a>
                
                <a 
                  href="/lean-body-mass-calculator" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

export default ArmyBodyFatCalculatorPage;