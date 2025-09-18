import React from "react";
import PeriodCalculator from "../components/PeriodCalculator";
import PageTransition from "../components/PageTransition";

const PeriodCalculatorPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <PeriodCalculator />
        
        {/* Enhanced SEO Content Section */}
        <div className="max-w-4xl mx-auto p-6 mt-8">
          
          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions - Period Calculator
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  How accurate is the period calculator?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our period calculator provides reliable predictions for women with regular cycles (varying by &lt;7 days). It uses your historical cycle data to predict future periods, ovulation, and fertile windows. Accuracy is highest when you have consistent cycle patterns. For irregular cycles due to stress, PCOS, or other factors, predictions may vary and should be used as estimates.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  What is considered a normal menstrual cycle?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  A normal menstrual cycle ranges from 21-35 days, with 28 days being average. Period length typically lasts 3-7 days with 5 days being average. The cycle is counted from the first day of one period to the first day of the next. Slight variations (±2-3 days) month to month are normal, especially during puberty and perimenopause.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Why should I track my menstrual cycle?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Cycle tracking helps you understand your body's patterns, predict periods for planning activities, identify fertile windows for conception or contraception, detect irregularities that may indicate health issues (like PCOS or thyroid problems), and understand how hormones affect mood, energy, and physical symptoms throughout your cycle.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  What factors can affect my menstrual cycle?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Many factors can influence cycle regularity: stress (physical or emotional), significant weight changes, excessive exercise, hormonal birth control, medications, travel/time zone changes, illness, breastfeeding, perimenopause, medical conditions (PCOS, thyroid disorders, endometriosis), and age (cycles often become irregular during puberty and before menopause).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  When should I consult a healthcare provider?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  See a doctor if you experience: absent periods for 3+ months (if not pregnant/breastfeeding), cycles shorter than 21 days or longer than 35 days, extremely heavy bleeding (changing pad/tampon hourly), severe cramping that interferes with daily activities, bleeding between periods, sudden changes in cycle patterns, or concerning symptoms like excessive pain, clotting, or irregular bleeding.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Understanding Your Menstrual Cycle & Hormones
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-pink-400 mb-3">Hormonal Changes Throughout Your Cycle</h3>
                <ul className="text-gray-300 text-sm space-y-2 mb-4">
                  <li><strong>Days 1-7 (Menstrual):</strong> Estrogen & progesterone low, menstruation occurs</li>
                  <li><strong>Days 1-13 (Follicular):</strong> FSH rises, follicles develop, estrogen increases</li>
                  <li><strong>Day 14 (Ovulation):</strong> LH surge triggers egg release, estrogen peaks</li>
                  <li><strong>Days 15-28 (Luteal):</strong> Progesterone rises, prepares uterus for pregnancy</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-pink-400 mb-3">Symptoms by Cycle Phase</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>Menstrual:</strong> Cramping, fatigue, mood changes</li>
                  <li><strong>Follicular:</strong> Energy increases, mood improves</li>
                  <li><strong>Ovulation:</strong> Peak energy, increased libido</li>
                  <li><strong>Luteal:</strong> PMS symptoms, breast tenderness</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Healthy Period Management</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Use appropriate menstrual products (pads, tampons, cups)</li>
                  <li>• Change products every 4-6 hours for hygiene</li>
                  <li>• Apply heat therapy for cramp relief</li>
                  <li>• Stay hydrated and eat iron-rich foods</li>
                  <li>• Exercise gently to reduce symptoms</li>
                  <li>• Get adequate sleep and manage stress</li>
                  <li>• Consider over-the-counter pain relief if needed</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-purple-400 mb-3 mt-4">Red Flags to Watch For</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Bleeding through a pad/tampon every hour</li>
                  <li>• Clots larger than a quarter</li>
                  <li>• Periods lasting longer than 7 days</li>
                  <li>• Severe pain preventing normal activities</li>
                  <li>• Fever during menstruation</li>
                  <li>• Sudden, significant cycle changes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cycle Tracking Benefits Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Benefits of Digital Period Tracking
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-3">Health Monitoring</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Track symptoms, flow intensity, and cycle patterns to identify health issues early. 
                  Share data with healthcare providers for better diagnosis and treatment of conditions 
                  like PCOS, endometriosis, or thyroid disorders.
                </p>
              </div>
              
              <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">Fertility Awareness</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Understand your fertile windows for conception or natural family planning. 
                  Track ovulation patterns and cervical mucus changes to optimize timing for 
                  pregnancy or identify safe days for contraception.
                </p>
              </div>
              
              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-3">Lifestyle Planning</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Plan activities, travel, and exercise around your cycle. Understand how hormones 
                  affect energy, mood, and performance. Prepare for PMS symptoms and adjust 
                  self-care routines based on cycle phases.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Related Women's Health & Fertility Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/ovulation-calculator" className="p-4 bg-rose-900/20 border border-rose-800/30 rounded-lg hover:bg-rose-900/30 transition-colors">
                <h3 className="text-rose-400 font-semibold mb-2">Ovulation Calculator</h3>
                <p className="text-gray-300 text-sm">Track fertile windows and optimize conception timing</p>
              </a>
              
              <a href="/conception-calculator" className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg hover:bg-purple-900/30 transition-colors">
                <h3 className="text-purple-400 font-semibold mb-2">Conception Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate when conception occurred from dates</p>
              </a>
              
              <a href="/pregnancy-calculator" className="p-4 bg-pink-900/20 border border-pink-800/30 rounded-lg hover:bg-pink-900/30 transition-colors">
                <h3 className="text-pink-400 font-semibold mb-2">Pregnancy Calculator</h3>
                <p className="text-gray-300 text-sm">Track pregnancy progress and milestones</p>
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
              "name": "Period Calculator - Menstrual Cycle Tracker",
              "description": "Advanced period calculator to track and predict menstrual cycles with comprehensive fertility insights and cycle analysis",
              "url": "https://your-domain.com/period-calculator",
              "medicalSpecialty": "Gynecology",
              "usageInfo": "Enter last period date and cycle length to predict future periods and fertile windows",
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
                    "name": "What is considered a normal menstrual cycle?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A normal menstrual cycle ranges from 21-35 days with 28 days average. Period length is typically 3-7 days with 5 days average. Slight monthly variations (±2-3 days) are normal."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why should I track my menstrual cycle?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Cycle tracking helps predict periods, identify fertile windows, detect health issues, understand hormonal effects on mood and energy, and plan activities around your cycle."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "When should I see a doctor about my periods?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Consult a doctor for absent periods (3+ months), cycles less than 21 or greater than 35 days, extremely heavy bleeding, severe cramping, bleeding between periods, or sudden cycle changes."
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

export default PeriodCalculatorPage;