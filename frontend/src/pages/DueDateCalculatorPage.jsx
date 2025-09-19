import React from "react";
import DueDateCalculator from "../components/DueDateCalculator";
import PageTransition from "../components/PageTransition";

const DueDateCalculatorPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <DueDateCalculator />
        
        {/* Enhanced SEO Content Section */}
        <div className="max-w-4xl mx-auto p-6 mt-8">
          
          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions - Due Date Calculator
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  How accurate is the due date calculator?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our due date calculator uses Naegele's rule, the standard medical formula used by healthcare providers worldwide. It calculates 280 days (40 weeks) from your last menstrual period (LMP) or 266 days from conception date. While 95% accurate within a 2-week window, only about 5% of babies are born exactly on their due date. Most healthy pregnancies deliver between 37-42 weeks (full-term window).
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  Which calculation method is more accurate: LMP or conception date?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Both methods are medically valid. LMP calculation is the clinical standard used by most healthcare providers, while conception date calculation may be more accurate if you know the exact fertilization date (from IVF or precise ovulation tracking). However, early pregnancy ultrasound (8-13 weeks) is considered the most accurate dating method, especially for women with irregular cycles.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  What is the difference between due date and actual delivery?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Due dates are estimates, not exact predictions. Full-term pregnancy ranges from 37-42 weeks. First-time mothers often deliver 1-2 days after their due date, while women who've had previous pregnancies may deliver slightly earlier. Natural labor onset varies based on baby's readiness, maternal factors, and individual biology. Only about 4-5% of babies arrive exactly on their estimated due date.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  When will my healthcare provider confirm my due date?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your healthcare provider will confirm and possibly adjust your due date during your first prenatal appointment, typically around 8-12 weeks of pregnancy. They'll use ultrasound measurements to verify gestational age, which is most accurate between 8-13 weeks. If there's a significant difference (>7 days) between LMP and ultrasound dating, your provider may adjust your due date accordingly.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  What factors can affect my due date accuracy?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Several factors influence due date accuracy: irregular menstrual cycles, uncertainty about LMP date, late ovulation, multiple pregnancies (twins/triplets often deliver earlier), maternal age, previous pregnancy history, and certain medical conditions. Women with PCOS, long cycles, or those who were breastfeeding when they conceived may have less accurate LMP-based calculations.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Understanding Pregnancy Dating & Delivery Windows
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-3">Pregnancy Term Classifications</h3>
                <ul className="text-gray-300 text-sm space-y-2 mb-4">
                  <li><strong>Early Preterm:</strong> Born before 34 weeks</li>
                  <li><strong>Late Preterm:</strong> Born 34-36 weeks</li>
                  <li><strong>Early Term:</strong> Born 37-38 weeks</li>
                  <li><strong>Full Term:</strong> Born 39-40 weeks (optimal)</li>
                  <li><strong>Late Term:</strong> Born 41-42 weeks</li>
                  <li><strong>Post Term:</strong> Born after 42 weeks</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-indigo-400 mb-3">Key Pregnancy Milestones</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>Week 12:</strong> End of first trimester, reduced miscarriage risk</li>
                  <li><strong>Week 20:</strong> Anatomy scan, halfway point</li>
                  <li><strong>Week 24:</strong> Viability milestone</li>
                  <li><strong>Week 28:</strong> Start of third trimester</li>
                  <li><strong>Week 37:</strong> Full-term begins</li>
                  <li><strong>Week 39-40:</strong> Optimal delivery window</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-teal-400 mb-3">Factors Affecting Delivery Timing</h3>
                <ul className="text-gray-300 text-sm space-y-2 mb-4">
                  <li>• First pregnancy (tends to go past due date)</li>
                  <li>• Previous pregnancy history (may deliver earlier)</li>
                  <li>• Maternal age (&gt;35 may have earlier delivery)</li>
                  <li>• Multiple pregnancies (twins deliver ~36 weeks)</li>
                  <li>• Baby's position and size</li>
                  <li>• Medical conditions or complications</li>
                  <li>• Stress levels and lifestyle factors</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-teal-400 mb-3">Signs Labor May Begin Soon</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Baby "dropping" into pelvis (lightening)</li>
                  <li>• Braxton Hicks contractions increase</li>
                  <li>• Bloody show or mucus plug loss</li>
                  <li>• Water breaking (rupture of membranes)</li>
                  <li>• Regular, increasing contractions</li>
                  <li>• Lower back pain and cramping</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pregnancy Planning Timeline Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Essential Pregnancy Appointment Timeline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-3">First Trimester (Weeks 1-13)</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>6-8 weeks:</strong> First prenatal visit, confirm pregnancy</li>
                  <li><strong>8-10 weeks:</strong> Dating ultrasound if needed</li>
                  <li><strong>11-14 weeks:</strong> NT scan (nuchal translucency)</li>
                  <li><strong>10-13 weeks:</strong> First trimester screening</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">Second Trimester (Weeks 14-27)</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>15-20 weeks:</strong> AFP screening (quad screen)</li>
                  <li><strong>18-22 weeks:</strong> Anatomy scan (detailed ultrasound)</li>
                  <li><strong>24-28 weeks:</strong> Glucose screening test</li>
                  <li><strong>Monthly visits:</strong> Monitor growth and health</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-3">Third Trimester (Weeks 28-40)</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>28-32 weeks:</strong> Growth ultrasound if needed</li>
                  <li><strong>35-37 weeks:</strong> Group B strep test</li>
                  <li><strong>36+ weeks:</strong> Weekly visits begin</li>
                  <li><strong>37-42 weeks:</strong> Monitor for labor signs</li>
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
              <a href="/pregnancy-calculator" className="p-4 bg-pink-900/20 border border-pink-800/30 rounded-lg hover:bg-pink-900/30 transition-colors">
                <h3 className="text-pink-400 font-semibold mb-2">Pregnancy Calculator</h3>
                <p className="text-gray-300 text-sm">Track comprehensive pregnancy progress and milestones</p>
              </a>
              
              <a href="/pregnancy-weight-gain-calculator" className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg hover:bg-green-900/30 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">Weight Gain Calculator</h3>
                <p className="text-gray-300 text-sm">Monitor healthy pregnancy weight gain by trimester</p>
              </a>
              
              <a href="/conception-calculator" className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg hover:bg-purple-900/30 transition-colors">
                <h3 className="text-purple-400 font-semibold mb-2">Conception Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate when conception occurred based on dates</p>
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
              "name": "Due Date Calculator - Pregnancy Due Date Calculator",
              "description": "Medical-grade due date calculator using LMP or conception date with Naegele's rule for accurate pregnancy dating and milestone tracking",
              "url": "https://your-domain.com/due-date-calculator",
              "medicalSpecialty": "Obstetrics and Gynecology",
              "usageInfo": "Enter last menstrual period or conception date to calculate accurate due date and pregnancy milestones",
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
                    "name": "How accurate is the due date calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The due date calculator uses Naegele's rule with 95% accuracy within a 2-week window. Only 5% of babies are born exactly on their due date, with most delivering between 37-42 weeks."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Should I use LMP or conception date for calculation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Both methods are medically valid. LMP is the clinical standard used by healthcare providers. Conception date may be more accurate if you know the exact fertilization date. Early ultrasound is most accurate."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "When is the optimal time for delivery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Full-term pregnancy is 39-40 weeks (optimal delivery window). Early term is 37-38 weeks, late term is 41-42 weeks. Most healthy babies are born within this 37-42 week range."
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

export default DueDateCalculatorPage;