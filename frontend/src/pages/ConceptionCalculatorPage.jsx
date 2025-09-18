import React from "react";
import ConceptionCalculator from "../components/ConceptionCalculator";
import PageTransition from "../components/PageTransition";

const ConceptionCalculatorPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <ConceptionCalculator />
        
        {/* Enhanced SEO Content Section */}
        <div className="max-w-4xl mx-auto p-6 mt-8">
          
          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions - Conception Calculator
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  How does the conception calculator work?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our conception calculator works backwards from known dates to estimate when fertilization occurred. It uses medical formulas: conception typically happens 266 days before the due date, 14 days after the last menstrual period (LMP) in a 28-day cycle, or can be calculated from the actual birth date. The calculator accounts for different cycle lengths and provides a conception window since sperm can survive up to 5 days.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  Which method gives the most accurate conception date?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The most accurate method depends on your available information: Due date calculations are precise if the due date was confirmed by early ultrasound (8-13 weeks). Birth date calculations are accurate for completed pregnancies. LMP calculations work best with regular cycles. For IVF pregnancies, the transfer date minus 2-5 days (depending on embryo stage) gives the exact conception date.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  What is the conception window and why is it important?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The conception window spans about 6 days: 5 days before ovulation plus ovulation day. This accounts for sperm survival (up to 5 days) and egg viability (24 hours). Actual fertilization typically occurs within 24 hours of ovulation, but intercourse can happen days earlier and still result in pregnancy. This window helps identify possible conception dates rather than a single day.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  Why might my calculated conception date differ from when I think I conceived?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Several factors can cause discrepancies: irregular cycles affect LMP-based calculations, late or early ovulation shifts the conception window, due dates may have been adjusted by healthcare providers based on ultrasound, multiple encounters during the fertile window make pinpointing difficult, and stress or illness can delay ovulation. Medical dating via ultrasound is typically more accurate than menstrual dating.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  Can this calculator help with paternity questions?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  While the conception calculator can provide estimated conception windows, it should never be used as the sole method for paternity determination. The 6-day fertile window means multiple encounters could result in pregnancy. For legal or medical paternity questions, DNA testing is the only definitive method. The calculator is best used for general pregnancy dating and understanding when conception likely occurred within a timeframe.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Understanding Conception & Fertilization Science
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-3">The Conception Process</h3>
                <ul className="text-gray-300 text-sm space-y-2 mb-4">
                  <li><strong>Ovulation:</strong> Mature egg released from ovary (24-hour window)</li>
                  <li><strong>Fertilization:</strong> Sperm meets egg in fallopian tube</li>
                  <li><strong>Zygote Formation:</strong> Single cell with combined DNA</li>
                  <li><strong>Cell Division:</strong> Embryo develops while traveling to uterus</li>
                  <li><strong>Implantation:</strong> Embryo attaches to uterine wall (6-12 days)</li>
                  <li><strong>hCG Production:</strong> Pregnancy hormone detectable (10-14 days)</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-indigo-400 mb-3">Fertility Timeline</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>5 days before ovulation:</strong> Sperm can survive and wait</li>
                  <li><strong>2-3 days before:</strong> Peak conception probability</li>
                  <li><strong>Ovulation day:</strong> Last chance for conception</li>
                  <li><strong>24 hours after:</strong> Egg no longer viable</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Factors Affecting Conception Timing</h3>
                <ul className="text-gray-300 text-sm space-y-2 mb-4">
                  <li>• <strong>Cycle Length:</strong> Varies from 21-35 days normally</li>
                  <li>• <strong>Ovulation Timing:</strong> Can vary by several days</li>
                  <li>• <strong>Sperm Health:</strong> Affects survival time (3-5 days)</li>
                  <li>• <strong>Cervical Mucus:</strong> Helps or hinders sperm travel</li>
                  <li>• <strong>Stress/Illness:</strong> Can delay ovulation</li>
                  <li>• <strong>Age:</strong> Affects egg quality and cycle regularity</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Pregnancy Confirmation Timeline</h3>
                <ul className="text-Gray-300 text-sm space-y-2">
                  <li><strong>0-6 days:</strong> Fertilization and early development</li>
                  <li><strong>6-12 days:</strong> Implantation occurs</li>
                  <li><strong>10-14 days:</strong> hCG levels rise, positive test</li>
                  <li><strong>4-6 weeks:</strong> Missed period, early symptoms</li>
                  <li><strong>6-8 weeks:</strong> Heartbeat detectable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conception Dating Methods Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Medical Conception Dating Methods
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-3">Ultrasound Dating</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Most accurate method, especially 8-13 weeks. Measures embryo/fetal size to 
                  determine gestational age within 3-5 days accuracy.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Crown-rump length (CRL)</li>
                  <li>• Biparietal diameter</li>
                  <li>• Femur length measurements</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">LMP Method</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Standard clinical method using last menstrual period. Assumes 28-day cycle 
                  with ovulation on day 14.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Naegele's rule (LMP + 280 days)</li>
                  <li>• Adjusted for cycle length</li>
                  <li>• Less accurate with irregular cycles</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-3">Assisted Reproduction</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Most precise for IVF pregnancies since fertilization is controlled 
                  and monitored in laboratory conditions.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• IVF transfer date minus 2-5 days</li>
                  <li>• Intrauterine insemination (IUI) date</li>
                  <li>• Ovulation induction timing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Calculators Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Related Fertility & Pregnancy Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/ovulation-calculator" className="p-4 bg-rose-900/20 border border-rose-800/30 rounded-lg hover:bg-rose-900/30 transition-colors">
                <h3 className="text-rose-400 font-semibold mb-2">Ovulation Calculator</h3>
                <p className="text-gray-300 text-sm">Track fertile windows and optimize conception timing</p>
              </a>
              
              <a href="/due-date-calculator" className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg hover:bg-blue-900/30 transition-colors">
                <h3 className="text-blue-400 font-semibold mb-2">Due Date Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate accurate due dates from LMP or conception</p>
              </a>
              
              <a href="/pregnancy-calculator" className="p-4 bg-pink-900/20 border border-pink-800/30 rounded-lg hover:bg-pink-900/30 transition-colors">
                <h3 className="text-pink-400 font-semibold mb-2">Pregnancy Calculator</h3>
                <p className="text-gray-300 text-sm">Track pregnancy progress and developmental milestones</p>
              </a>
            </div>
          </div>
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalRiskCalculator",
              "name": "Conception Calculator - When Did Conception Occur",
              "description": "Medical-grade conception calculator to determine when fertilization occurred using due date, birth date, or last menstrual period",
              "url": "https://your-domain.com/conception-calculator",
              "medicalSpecialty": "Reproductive Medicine",
              "usageInfo": "Enter due date, birth date, or LMP to calculate when conception occurred with conception window estimation",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Advanced BMI Calculator",
                "url": "https://your-domain.com"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How does the conception calculator work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The conception calculator works backwards from known dates using medical formulas. Conception typically occurs 266 days before due date or 14 days after LMP, accounting for cycle length variations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the conception window?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The conception window spans 6 days: 5 days before ovulation plus ovulation day. This accounts for sperm survival (5 days) and egg viability (24 hours) for possible conception dates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which calculation method is most accurate?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ultrasound-confirmed due dates provide the most accurate conception estimates. IVF pregnancies have exact conception dates. LMP calculations work best with regular cycles."
                    }
                  }
                ]
              }
            })
          }}
        />
      </div>
    </PageTransition>
  );
};

export default ConceptionCalculatorPage;