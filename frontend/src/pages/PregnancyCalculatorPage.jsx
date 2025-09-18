import React from "react";
import PregnancyCalculator from "../components/PregnancyCalculator";
import PageTransition from "../components/PageTransition";

const PregnancyCalculatorPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <PregnancyCalculator />
        
        {/* Enhanced SEO Content Section */}
        <div className="max-w-4xl mx-auto p-6 mt-8">
          
          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions - Pregnancy Calculator
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">
                  How accurate is the pregnancy calculator?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our pregnancy calculator uses the standard Naegele's rule, which calculates due dates with approximately 95% accuracy within a 2-week window. The calculator is based on a 280-day pregnancy from your last menstrual period (LMP) and accounts for your average cycle length. However, only about 5% of babies are born exactly on their due date, with most births occurring within 37-42 weeks of gestation.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">
                  What information do I need to use the pregnancy calculator?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  You need the first day of your last menstrual period (LMP) and your average menstrual cycle length (typically 21-35 days, with 28 days being average). The calculator also considers your cycle length to provide more accurate conception date estimates. Make sure to use the first day of your last normal period, not any spotting that might have occurred.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">
                  Can I track different pregnancy milestones?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Yes! Our pregnancy calculator provides comprehensive milestone tracking including trimester progression, gestational age in weeks and days, important developmental milestones, key appointment dates (like anatomy scans), and the full-term birth window (37-42 weeks). Each milestone includes relevant health information and what to expect during that stage of pregnancy.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">
                  When should I see a healthcare provider?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Schedule your first prenatal appointment within 6-8 weeks of your LMP or 2-4 weeks after a positive pregnancy test. Early prenatal care is crucial for monitoring both maternal and fetal health. Your healthcare provider will confirm pregnancy dates through ultrasound, which is more accurate than LMP calculations, especially if you have irregular cycles.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-pink-400 mb-2">
                  What if I have irregular periods?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  If your menstrual cycles are irregular (varying by more than 7 days), LMP-based calculations may be less accurate. In this case, ultrasound dating performed by your healthcare provider will be more reliable. The best time for accurate dating ultrasound is between 8-13 weeks of pregnancy. Our calculator can still provide estimates, but consult your doctor for precise dating.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Understanding Pregnancy Dating & Development
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Gestational Age vs Fetal Age</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Gestational age is calculated from your LMP and includes the 2 weeks before conception. 
                  Fetal age (or conceptional age) is calculated from conception date and is about 2 weeks 
                  less than gestational age. Medical professionals typically use gestational age for 
                  pregnancy dating and milestone tracking.
                </p>
                
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Trimester Breakdown</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>First Trimester (Weeks 1-13):</strong> Organ formation, morning sickness, fatigue</li>
                  <li><strong>Second Trimester (Weeks 14-26):</strong> Energy returns, anatomy scan, movement</li>
                  <li><strong>Third Trimester (Weeks 27-40):</strong> Rapid growth, preparation for birth</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Important Pregnancy Dates</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>6-8 weeks:</strong> First prenatal appointment, heartbeat detection</li>
                  <li><strong>11-14 weeks:</strong> NT scan (nuchal translucency)</li>
                  <li><strong>18-22 weeks:</strong> Anatomy scan, gender determination</li>
                  <li><strong>24-28 weeks:</strong> Glucose screening, viability milestone</li>
                  <li><strong>32-36 weeks:</strong> Growth scans, monitoring position</li>
                  <li><strong>37-42 weeks:</strong> Full-term birth window</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-blue-400 mb-3 mt-4">Prenatal Health Tips</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Take prenatal vitamins with 400-800mcg folic acid</li>
                  <li>• Attend all scheduled prenatal appointments</li>
                  <li>• Avoid alcohol, smoking, and raw foods</li>
                  <li>• Stay hydrated and maintain healthy nutrition</li>
                  <li>• Exercise as recommended by your provider</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Calculators Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Related Pregnancy & Women's Health Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/due-date-calculator" className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg hover:bg-blue-900/30 transition-colors">
                <h3 className="text-blue-400 font-semibold mb-2">Due Date Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate precise due dates using LMP or conception date</p>
              </a>
              
              <a href="/pregnancy-weight-gain-calculator" className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg hover:bg-green-900/30 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">Weight Gain Calculator</h3>
                <p className="text-gray-300 text-sm">Monitor healthy pregnancy weight gain based on BMI</p>
              </a>
              
              <a href="/ovulation-calculator" className="p-4 bg-rose-900/20 border border-rose-800/30 rounded-lg hover:bg-rose-900/30 transition-colors">
                <h3 className="text-rose-400 font-semibold mb-2">Ovulation Calculator</h3>
                <p className="text-gray-300 text-sm">Track fertile windows and optimize conception timing</p>
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
              "name": "Pregnancy Calculator - Track Pregnancy Progress",
              "description": "Advanced pregnancy calculator to track gestational age, due date, and developmental milestones using medical-grade formulas",
              "url": "https://your-domain.com/pregnancy-calculator",
              "medicalSpecialty": "Obstetrics and Gynecology",
              "usageInfo": "Enter last menstrual period date and cycle length for accurate pregnancy tracking",
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
                    "name": "How accurate is the pregnancy calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our pregnancy calculator uses Naegele's rule with approximately 95% accuracy within a 2-week window. Only 5% of babies are born exactly on their due date, with most births occurring within 37-42 weeks."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What information do I need for the pregnancy calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You need your last menstrual period (LMP) first day and average cycle length (21-35 days). This information helps calculate accurate conception dates and due dates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I use this calculator with irregular periods?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "If cycles vary by more than 7 days, ultrasound dating by a healthcare provider will be more accurate than LMP calculations. The calculator provides estimates, but consult a doctor for precise dating."
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

export default PregnancyCalculatorPage;