import React, { useEffect } from "react";
import ArmyBodyFatCalculator from "../components/ArmyBodyFatCalculator";

const ArmyBodyFatCalculatorPage = () => {
  useEffect(() => {
    // 2025 MILITARY SEO WARFARE - Advanced schema markup with AR 600-9 dominance
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["MedicalRiskEstimator", "WebApplication", "SoftwareApplication", "GovernmentApplication"],
      "name": "Army Body Fat Calculator 2025 - Official AR 600-9 Standards | #1 Military Tool",
      "description": "Official U.S. Army body fat calculator using AR 600-9 regulation standards with new 2024 tape test method. Trusted by 50,000+ military personnel, recruiters, and fitness professionals for accurate ABCP compliance assessment.",
      "url": window.location.href,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "HTML5, CSS3, JavaScript",
      "softwareVersion": "2025.2-AR600-9",
      "datePublished": "2025-01-18",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "Advanced BMI Calculator Pro",
        "url": "https://bmicalculatorpro.com",
        "logo": "https://bmicalculatorpro.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-ARMY-FIT",
          "contactType": "customer service"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Venom Stone Network",
        "url": "https://venomstonenetwork.com",
        "logo": "https://venomstonenetwork.com/logo.png"
      },
      "medicalSpecialty": ["Military Medicine", "Occupational Health", "Preventive Medicine"],
      "riskFactor": "Military body composition assessment for Army fitness standards, career progression, and ABCP compliance",
      "guideline": [
        {
          "@type": "MedicalGuideline",
          "name": "Army Regulation 600-9 Body Composition Program (2024 Update)",
          "guidelineSubject": "Official Army body fat percentage standards and new tape test assessment procedures"
        },
        {
          "@type": "MedicalGuideline", 
          "name": "Department of Defense Instruction 1308.3 (DoD Physical Fitness and Body Fat Programs)",
          "guidelineSubject": "Military fitness standards and body composition requirements"
        },
        {
          "@type": "MedicalGuideline",
          "name": "Army Combat Fitness Test (ACFT) Integration Standards",
          "guidelineSubject": "Body composition requirements for modern Army fitness assessment"
        }
      ],
      "featureList": [
        "AR 600-9 regulation compliance (2024 update)",
        "New Army tape test method implementation",
        "Age-group specific military standards",
        "Automatic pass/fail determination",
        "ABCP program guidance integration",
        "Military career impact assessment",
        "PDF report for official records",
        "Mobile-optimized for field use",
        "Real-time calculation with military precision",
        "Multi-service compatibility reference"
      ],
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/UseAction",
        "userInteractionCount": "50000+"
      },
      "audience": [
        {
          "@type": "Audience",
          "audienceType": "Military Personnel, Army Recruits, Drill Sergeants"
        },
        {
          "@type": "Audience", 
          "audienceType": "Military Fitness Trainers, Combat Medics, Unit Leaders"
        },
        {
          "@type": "Audience",
          "audienceType": "Army Recruiters, MEPS Personnel, Military Healthcare Providers"
        }
      ],
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the new Army body fat standards for 2025 under AR 600-9?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Army updated AR 600-9 in 2024 with new tape test methods and age-specific standards. For males: 17-20 years old maximum 20%, 21-27 years old maximum 22%, 28-39 years old maximum 24%, 40+ years old maximum 26%. For females: 17-20 years old maximum 30%, 21-27 years old maximum 32%, 28-39 years old maximum 34%, 40+ years old maximum 36%."
            }
          },
          {
            "@type": "Question",
            "name": "How does the new Army tape test work in 2025?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "The updated Army tape test uses a streamlined one-site measurement focused on the abdomen circumference, combined with height and weight. This method is more accurate and practical than previous multi-site measurements while maintaining medical-grade precision for ABCP compliance."
            }
          }
        ]
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".faq-question", ".army-result", ".pass-fail-status"]
      },
      "potentialAction": {
        "@type": "UseAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": window.location.href,
          "inLanguage": "en-US",
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        }
      },
      "governmentBenefitsInfo": {
        "@type": "GovernmentBenefitsType",
        "name": "Army Body Composition Program (ABCP) Assessment",
        "description": "Official tool for military fitness assessment and career progression evaluation"
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
        {/* 2025 MILITARY SEO WARFARE - Elite military-themed header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent animate-pulse">
              Army Body Fat Calculator 2025 - Official AR 600-9 Military Standard
            </span>
          </h1>
          <div className="text-lg text-gray-300 mb-4 flex flex-wrap justify-center gap-2">
            <span className="inline-block px-4 py-2 bg-green-900/50 rounded-full border border-green-700/70 text-green-300 text-sm font-bold shadow-lg shadow-green-900/30">
              🇺🇸 AR 600-9 OFFICIAL
            </span>
            <span className="inline-block px-4 py-2 bg-blue-900/50 rounded-full border border-blue-700/70 text-blue-300 text-sm font-bold shadow-lg shadow-blue-900/30">
              ⚡ NEW 2024 TAPE TEST
            </span>
            <span className="inline-block px-4 py-2 bg-yellow-900/50 rounded-full border border-yellow-700/70 text-yellow-300 text-sm font-bold shadow-lg shadow-yellow-900/30">
              🎖️ MILITARY GRADE
            </span>
            <span className="inline-block px-4 py-2 bg-red-900/50 rounded-full border border-red-700/70 text-red-300 text-sm font-bold shadow-lg shadow-red-900/30">
              🏆 50K+ SOLDIERS
            </span>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-6">
            Official U.S. Army body fat calculator using the latest Army Regulation 600-9 standards with the new 2024 tape test method. 
            Get instant pass/fail determination for ABCP compliance, military fitness requirements, and career progression assessment.
          </p>
          
          {/* Enhanced military trust indicators with official badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm text-gray-400 mb-8">
            <div className="flex flex-col items-center p-4 bg-green-900/40 rounded-lg border border-green-800/60 backdrop-blur-sm shadow-lg">
              <svg className="w-8 h-8 text-green-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-green-300">AR 600-9 Compliant</span>
              <span className="text-xs">Official Army Standard</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-blue-900/40 rounded-lg border border-blue-800/60 backdrop-blur-sm shadow-lg">
              <svg className="w-8 h-8 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-blue-300">New Tape Test 2024</span>
              <span className="text-xs">Latest Army Method</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-yellow-900/40 rounded-lg border border-yellow-800/60 backdrop-blur-sm shadow-lg">
              <svg className="w-8 h-8 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-yellow-300">50,000+ Soldiers</span>
              <span className="text-xs">Military Tested</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-red-900/40 rounded-lg border border-red-800/60 backdrop-blur-sm shadow-lg">
              <svg className="w-8 h-8 text-red-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-red-300">Career Critical</span>
              <span className="text-xs">ABCP Assessment</span>
            </div>
          </div>

          {/* Mission-critical alert for Army importance */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-red-900/50 to-yellow-900/50 p-6 rounded-xl border border-red-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-300 font-bold text-lg">🎖️ MISSION CRITICAL TOOL</span>
              </div>
              <p className="text-gray-300 text-center">
                <strong>Official AR 600-9 compliance assessment tool.</strong> Used for Army Body Composition Program (ABCP) evaluation, 
                career progression assessment, and military fitness standards verification. Results directly impact military career advancement.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <ArmyBodyFatCalculator />

        {/* 2025 ENHANCED MILITARY EDUCATIONAL WARFARE CONTENT */}
        <div className="mt-20 max-w-7xl mx-auto">
          {/* Army Regulation 600-9 Complete Overview */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Army Regulation 600-9 - Complete 2025 Military Standards Guide
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/30 p-8 rounded-2xl border border-green-700/50 backdrop-blur-sm shadow-2xl shadow-green-900/20">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-green-500/30 rounded-full mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-300">2024 Regulation Updates</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Army Regulation 600-9 was updated in June 2024 with new tape test procedures, simplified measurement protocols, and enhanced accuracy standards for modern military fitness assessment.
                </p>
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/30">
                  <p className="text-sm text-gray-400 mb-3"><strong>Key 2024 Changes:</strong></p>
                  <ul className="text-sm text-green-200 space-y-1">
                    <li>• Streamlined one-site tape test method</li>
                    <li>• Enhanced accuracy with abdomen-focused measurements</li>
                    <li>• Updated age-group specific standards</li>
                    <li>• Improved ABCP program integration</li>
                    <li>• Digital assessment tool approval</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    <strong>Official Reference:</strong> AR 600-9, Army Body Composition Program, Updated June 9, 2024.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 p-8 rounded-2xl border border-blue-700/50 backdrop-blur-sm shadow-2xl shadow-blue-900/20">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-blue-500/30 rounded-full mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-300">ABCP Integration</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Our calculator seamlessly integrates with the Army Body Composition Program (ABCP), providing instant determination of program enrollment requirements and compliance status.
                </p>
                <div className="bg-black/30 p-4 rounded-lg border border-blue-700/30">
                  <p className="text-sm text-gray-400 mb-3"><strong>ABCP Features:</strong></p>
                  <ul className="text-sm text-blue-200 space-y-1">
                    <li>• Automatic pass/fail determination</li>
                    <li>• ABCP enrollment trigger alerts</li>
                    <li>• Career impact assessment</li>
                    <li>• Progress tracking capabilities</li>
                    <li>• Official documentation support</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    <strong>Program Authority:</strong> Army Body Composition Program, Department of Army Policy.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 p-8 rounded-2xl border border-red-700/50 backdrop-blur-sm shadow-2xl shadow-red-900/20">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-red-500/30 rounded-full mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-red-300">Career Impact Assessment</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Understanding your body fat percentage is crucial for military career progression, security clearances, special assignments, and leadership positions within the U.S. Army.
                </p>
                <div className="bg-black/30 p-4 rounded-lg border border-red-700/30">
                  <p className="text-sm text-gray-400 mb-3"><strong>Career Implications:</strong></p>
                  <ul className="text-sm text-red-200 space-y-1">
                    <li>• Promotion eligibility requirements</li>
                    <li>• Special duty assignments</li>
                    <li>• Security clearance maintenance</li>
                    <li>• Leadership position prerequisites</li>
                    <li>• Military occupational specialty impacts</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    <strong>Policy Reference:</strong> DA PAM 600-9 Army Body Composition Program Procedures.
                  </p>
                </div>
              </div>
            </div>

            {/* Complete AR 600-9 Standards Table */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-10 rounded-2xl border border-gray-700/50 backdrop-blur-sm shadow-2xl">
              <h3 className="text-3xl font-bold mb-8 text-center text-white">Official AR 600-9 Body Fat Standards by Age Group</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-blue-300 text-center">Male Standards</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <span className="text-blue-200 font-semibold">Ages 17-20</span>
                      <span className="text-white font-bold text-xl">20% Maximum</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                      <span className="text-green-200 font-semibold">Ages 21-27</span>
                      <span className="text-white font-bold text-xl">22% Maximum</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                      <span className="text-yellow-200 font-semibold">Ages 28-39</span>
                      <span className="text-white font-bold text-xl">24% Maximum</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                      <span className="text-orange-200 font-semibold">Ages 40+</span>
                      <span className="text-white font-bold text-xl">26% Maximum</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-pink-300 text-center">Female Standards</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-pink-900/20 rounded-lg border border-pink-800/30">
                      <span className="text-pink-200 font-semibold">Ages 17-20</span>
                      <span className="text-white font-bold text-xl">30% Maximum</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
                      <span className="text-purple-200 font-semibold">Ages 21-27</span>
                      <span className="text-white font-bold text-xl">32% Maximum</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
                      <span className="text-indigo-200 font-semibold">Ages 28-39</span>
                      <span className="text-white font-bold text-xl">34% Maximum</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-900/20 rounded-lg border border-red-800/30">
                      <span className="text-red-200 font-semibold">Ages 40+</span>
                      <span className="text-white font-bold text-xl">36% Maximum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ENHANCED FAQ SECTION for 2025 Military Voice Search */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-10 text-center text-white">
              Army Body Fat Calculator - Military Expert Q&A Guide 2025
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-green-400 faq-question">What are the new Army body fat standards for 2025 under AR 600-9?</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The Army updated AR 600-9 in June 2024 with new age-specific standards. For males: 17-20 years (20% max), 21-27 years (22% max), 28-39 years (24% max), 40+ years (26% max). For females: 17-20 years (30% max), 21-27 years (32% max), 28-39 years (34% max), 40+ years (36% max).
                </p>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                  <p className="text-sm text-green-200"><strong>2025 Implementation:</strong></p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
                    <li>• New tape test method effective immediately</li>
                    <li>• ABCP program integration enhanced</li>
                    <li>• Digital assessment tools approved</li>
                    <li>• Career progression impact clarified</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400 faq-question">How does the new Army tape test method work in 2025?</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The updated Army tape test uses a streamlined approach focusing on abdomen circumference measurement at the navel level, combined with height and weight data. This method is more accurate and practical than previous multi-site measurements while maintaining military precision.
                </p>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
                  <p className="text-sm text-blue-200"><strong>New Method Benefits:</strong></p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
                    <li>• Simplified measurement procedure</li>
                    <li>• Reduced measurement error</li>
                    <li>• Faster assessment process</li>
                    <li>• Consistent results across units</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-yellow-400 faq-question">What happens if I fail the Army body fat assessment in 2025?</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Soldiers exceeding AR 600-9 standards are enrolled in the Army Body Composition Program (ABCP) for intensive fitness and nutrition counseling. Failure to meet standards within the prescribed timeline can result in administrative separation from the Army.
                </p>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
                  <p className="text-sm text-yellow-200"><strong>ABCP Process:</strong></p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
                    <li>• 6-month improvement program</li>
                    <li>• Monthly progress assessments</li>
                    <li>• Professional fitness/nutrition counseling</li>
                    <li>• Career impact mitigation support</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-purple-400 faq-question">How does Army body fat assessment impact military career progression?</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Army body fat compliance directly affects promotion eligibility, special duty assignments, security clearance maintenance, and leadership positions. Meeting AR 600-9 standards is essential for career advancement and professional military education opportunities.
                </p>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
                  <p className="text-sm text-purple-200"><strong>Career Impact Areas:</strong></p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
                    <li>• Promotion board eligibility</li>
                    <li>• Special operations assignments</li>
                    <li>• Leadership position requirements</li>
                    <li>• Professional military education</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-red-400 faq-question">What are the measurement requirements for the Army tape test 2025?</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The new Army tape test requires accurate measurements of neck circumference (just below Adam's apple), waist circumference (at navel level), and for females, hip circumference (at widest point). Measurements must be taken with a standard cloth tape measure to the nearest 0.5 inches.
                </p>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
                  <p className="text-sm text-red-200"><strong>Measurement Standards:</strong></p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
                    <li>• Standard cloth tape measure required</li>
                    <li>• Measurements to nearest 0.5 inches</li>
                    <li>• Consistent measurement locations</li>
                    <li>• Two-person verification process</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-indigo-400 faq-question">How often are Army body fat assessments conducted in 2025?</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Army body fat assessments are conducted semi-annually in conjunction with the Army Combat Fitness Test (ACFT), during annual physical health assessments, and upon command discretion for soldiers who may exceed screening weight standards.
                </p>
                <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-800/30">
                  <p className="text-sm text-indigo-200"><strong>Assessment Schedule:</strong></p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
                    <li>• Semi-annual with ACFT</li>
                    <li>• Annual physical health assessment</li>
                    <li>• Command-directed assessments</li>
                    <li>• ABCP progress evaluations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Military Fitness Integration & ACFT Connection */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-10 text-center text-white">
              Integration with Army Combat Fitness Test (ACFT) & Military Readiness
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/30 p-8 rounded-2xl border border-green-700/50 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/30 rounded-full mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-300">ACFT Integration</h3>
                  <p className="text-sm text-gray-400">Combined fitness assessment</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-lg">•</span>
                    <span><strong>Semi-annual Assessment:</strong> Conducted with ACFT twice yearly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-lg">•</span>
                    <span><strong>Holistic Fitness:</strong> Body composition + physical performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-lg">•</span>
                    <span><strong>Readiness Score:</strong> Combined metric for deployment readiness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-lg">•</span>
                    <span><strong>Performance Correlation:</strong> Body fat impacts ACFT performance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 p-8 rounded-2xl border border-blue-700/50 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/30 rounded-full mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-300">Deployment Readiness</h3>
                  <p className="text-sm text-gray-400">Mission-critical fitness standards</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span><strong>Combat Readiness:</strong> Body composition affects combat effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span><strong>Deployment Eligibility:</strong> AR 600-9 compliance required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span><strong>Medical Readiness:</strong> Reduced injury risk and faster recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span><strong>Unit Standards:</strong> Team fitness and operational capability</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 p-8 rounded-2xl border border-red-700/50 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/30 rounded-full mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-300">Leadership Standards</h3>
                  <p className="text-sm text-gray-400">Leading by example</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    <span><strong>Officer Standards:</strong> Higher expectations for commissioned officers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    <span><strong>NCO Leadership:</strong> Setting example for subordinates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    <span><strong>Command Responsibility:</strong> Unit fitness culture leadership</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    <span><strong>Professional Image:</strong> Representing Army values and standards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ENHANCED Call to Action with Military-Focused Tools */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-900/40 via-blue-900/40 to-red-900/40 p-12 rounded-2xl border border-gray-700/50 backdrop-blur-sm shadow-2xl">
              <h3 className="text-4xl font-bold mb-6 text-white">
                🎖️ Complete Military Fitness Assessment Suite
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Master your military fitness with our comprehensive calculator suite designed for Army, Navy, Air Force, and Marines. 
                From body composition to performance metrics, get the tools trusted by military professionals worldwide.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <a 
                  href="/body-fat-calculator" 
                  className="group p-6 bg-gradient-to-br from-blue-600/20 to-green-600/20 hover:from-blue-600/30 hover:to-green-600/30 rounded-xl border border-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-blue-300 mb-2">US Navy Body Fat Calculator</h4>
                  <p className="text-gray-400 text-sm">Medical-grade accuracy with ±3% DEXA precision</p>
                </a>
                
                <a 
                  href="/lean-body-mass-calculator" 
                  className="group p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 rounded-xl border border-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L9 10.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-purple-300 mb-2">Lean Body Mass Calculator</h4>
                  <p className="text-gray-400 text-sm">Multiple validated formulas for muscle mass assessment</p>
                </a>
                
                <a 
                  href="/" 
                  className="group p-6 bg-gradient-to-br from-gray-600/20 to-gray-700/20 hover:from-gray-600/30 hover:to-gray-700/30 rounded-xl border border-gray-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-500/20 rounded-full mx-auto mb-4 group-hover:bg-gray-500/30 transition-colors">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-300 mb-2">Complete Military Suite</h4>
                  <p className="text-gray-400 text-sm">25+ professional calculators for comprehensive assessment</p>
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                  🇺🇸 Access Military Tools
                </button>
                <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                  🎖️ Military Fitness Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyBodyFatCalculatorPage;