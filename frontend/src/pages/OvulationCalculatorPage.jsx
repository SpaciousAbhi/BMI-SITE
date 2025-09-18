import React from "react";
import OvulationCalculator from "../components/OvulationCalculator";
import PageTransition from "../components/PageTransition";

const OvulationCalculatorPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <OvulationCalculator />
        
        {/* Enhanced SEO Content Section */}
        <div className="max-w-4xl mx-auto p-6 mt-8">
          
          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions - Ovulation Calculator
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-rose-400 mb-2">
                  How does the ovulation calculator work?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our ovulation calculator uses your last period date and cycle length to predict ovulation using the luteal phase method. Most women ovulate 12-16 days before their next period (average 14 days). The calculator identifies your fertile window (5 days before ovulation plus ovulation day) when conception is most likely to occur. It also tracks cycle phases and provides future cycle predictions.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-rose-400 mb-2">
                  What is the fertile window and when does it occur?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The fertile window is a 6-day period during your cycle when pregnancy is possible. It includes the 5 days before ovulation and ovulation day itself. Sperm can survive in the reproductive tract for up to 5 days, while the egg is viable for about 24 hours. The highest conception probability occurs 1-2 days before ovulation (27-33% chance) and on ovulation day (33% chance).
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-rose-400 mb-2">
                  Can I use this calculator with irregular cycles?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  If your cycles vary by more than 7 days, the calculator provides estimates that may be less accurate. For irregular cycles, consider tracking basal body temperature (BBT), cervical mucus changes, or using ovulation predictor kits (OPKs) for more precise ovulation detection. Conditions like PCOS, stress, illness, or hormonal changes can affect cycle regularity.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-rose-400 mb-2">
                  What are the signs of ovulation I should watch for?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Common ovulation signs include: clear, stretchy cervical mucus (like egg whites), slight increase in basal body temperature (0.5-1°F), mild pelvic pain or cramps (mittelschmerz), increased libido, breast tenderness, and light spotting. Some women also experience heightened senses or mood changes. Tracking these signs alongside the calculator improves accuracy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-rose-400 mb-2">
                  When should I seek medical advice about ovulation?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Consult a healthcare provider if you have very irregular cycles (varying by >7 days), cycles shorter than 21 days or longer than 35 days, absent periods (amenorrhea), extremely painful ovulation, or if you've been trying to conceive for 6-12 months without success. They can perform hormone tests, ultrasounds, or other evaluations to assess ovulation and fertility.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Understanding Ovulation & Fertility Tracking
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-pink-400 mb-3">Menstrual Cycle Phases</h3>
                <ul className="text-gray-300 text-sm space-y-2 mb-4">
                  <li><strong>Menstrual (Days 1-5):</strong> Period occurs, hormone levels low</li>
                  <li><strong>Follicular (Days 1-13):</strong> Follicles develop, estrogen rises</li>
                  <li><strong>Ovulation (Day 14):</strong> Egg released, peak fertility</li>
                  <li><strong>Luteal (Days 15-28):</strong> Post-ovulation, progesterone high</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-pink-400 mb-3">Ovulation Timing</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ovulation typically occurs 12-16 days before your next period, regardless of cycle length. 
                  For a 28-day cycle, this is around day 14. For a 30-day cycle, it's around day 16. 
                  The luteal phase (post-ovulation) is usually consistent at 12-16 days for most women.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Improving Fertility</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Have intercourse every 1-2 days during fertile window</li>
                  <li>• Track cervical mucus consistency changes</li>
                  <li>• Monitor basal body temperature daily</li>
                  <li>• Use ovulation predictor kits for LH surge detection</li>
                  <li>• Maintain healthy weight and diet</li>
                  <li>• Limit alcohol and avoid smoking</li>
                  <li>• Manage stress levels effectively</li>
                  <li>• Take prenatal vitamins with folic acid</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-green-400 mb-3 mt-4">Conception Probability</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><strong>5 days before ovulation:</strong> 5% chance</li>
                  <li><strong>4 days before ovulation:</strong> 10% chance</li>
                  <li><strong>3 days before ovulation:</strong> 15% chance</li>
                  <li><strong>2 days before ovulation:</strong> 27% chance</li>
                  <li><strong>1 day before ovulation:</strong> 30% chance</li>
                  <li><strong>Ovulation day:</strong> 33% chance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Tracking Methods Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Advanced Ovulation Tracking Methods
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-3">Basal Body Temperature (BBT)</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Track your temperature first thing each morning. After ovulation, BBT rises by 0.5-1°F and stays elevated. 
                  This confirms ovulation occurred but doesn't predict it in advance. Use a special BBT thermometer for accuracy.
                </p>
              </div>
              
              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-3">Cervical Mucus Monitoring</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Check cervical mucus daily. Fertile mucus is clear, stretchy, and slippery (like egg whites). 
                  It helps sperm survive and travel. Peak fertility occurs on the last day of stretchy mucus, 
                  typically 1-2 days before ovulation.
                </p>
              </div>
              
              <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">Ovulation Predictor Kits</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  OPKs detect the LH (luteinizing hormone) surge that occurs 12-36 hours before ovulation. 
                  Start testing several days before expected ovulation. A positive result indicates ovulation 
                  will likely occur within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Related Fertility & Women's Health Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/period-calculator" className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg hover:bg-red-900/30 transition-colors">
                <h3 className="text-red-400 font-semibold mb-2">Period Calculator</h3>
                <p className="text-gray-300 text-sm">Track and predict menstrual cycles with fertility insights</p>
              </a>
              
              <a href="/conception-calculator" className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg hover:bg-purple-900/30 transition-colors">
                <h3 className="text-purple-400 font-semibold mb-2">Conception Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate when conception occurred based on due date</p>
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
              "name": "Ovulation Calculator - Fertile Window Tracker",
              "description": "Advanced ovulation calculator to track fertile windows, predict ovulation dates, and optimize conception timing with cycle analysis",
              "url": "https://your-domain.com/ovulation-calculator",
              "medicalSpecialty": "Reproductive Medicine",
              "usageInfo": "Enter last period date and cycle length to predict ovulation and fertile windows",
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
                    "name": "How does the ovulation calculator work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The ovulation calculator uses your last period date and cycle length to predict ovulation using the luteal phase method. It identifies your 6-day fertile window when conception is most likely."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "When is the fertile window during my cycle?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The fertile window is 6 days: 5 days before ovulation plus ovulation day. Conception probability peaks 1-2 days before ovulation (27-33%) and on ovulation day (33%)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the signs of ovulation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ovulation signs include clear stretchy cervical mucus, slight temperature increase, mild pelvic pain, increased libido, and breast tenderness. Track these alongside the calculator for better accuracy."
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

export default OvulationCalculatorPage;