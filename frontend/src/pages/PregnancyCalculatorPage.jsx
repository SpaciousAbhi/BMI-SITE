import React from "react";
import PregnancyCalculator from "../components/PregnancyCalculator";

const PregnancyCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Pregnancy Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your pregnancy journey with precision. Calculate gestational age, due date, and monitor 
            your baby's development milestones with our advanced pregnancy calculator.
          </p>
        </div>

        {/* Calculator Component */}
        <PregnancyCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-pink-400">About Pregnancy Tracking</h3>
              <p className="text-gray-300 mb-4">
                Pregnancy tracking helps you understand your baby's development and prepare for important 
                milestones. Our calculator uses the standard LMP (Last Menstrual Period) method, which is 
                the same approach used by healthcare professionals worldwide.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Calculates gestational age from your last menstrual period</li>
                <li>• Tracks pregnancy progress through all three trimesters</li>
                <li>• Provides developmental milestones for each week</li>
                <li>• Estimates conception and due dates accurately</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Pregnancy Milestones</h3>
              <p className="text-gray-300 mb-4">
                Each week of pregnancy brings new developments. Understanding these milestones helps you 
                connect with your growing baby and know what to expect during your pregnancy journey.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• <strong>Weeks 1-12:</strong> First trimester - organ formation</li>
                <li>• <strong>Weeks 13-26:</strong> Second trimester - rapid growth</li>
                <li>• <strong>Weeks 27-40:</strong> Third trimester - final development</li>
                <li>• <strong>Week 37:</strong> Full-term pregnancy reached</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Understanding Your Pregnancy Calculator Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-pink-300">Gestational Age Calculation</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Gestational age is calculated from the first day of your last menstrual period (LMP), 
                  not from conception. This is the standard medical practice because ovulation and conception 
                  dates can be difficult to determine precisely.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average pregnancy duration:</span>
                    <span className="text-white">280 days (40 weeks)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">From conception:</span>
                    <span className="text-white">266 days (38 weeks)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Full-term range:</span>
                    <span className="text-white">37-42 weeks</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">Trimester Breakdown</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-blue-300">First Trimester (Weeks 1-13)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Critical organ development, morning sickness common, highest miscarriage risk
                    </div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="font-medium text-green-300">Second Trimester (Weeks 14-26)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      "Golden period" - energy returns, anatomy scan, baby movements felt
                    </div>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="font-medium text-purple-300">Third Trimester (Weeks 27-40)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Rapid growth, preparation for birth, regular prenatal visits
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">How accurate is the pregnancy calculator?</h4>
                <p className="text-gray-300 text-sm">
                  Our pregnancy calculator is highly accurate for estimating due dates and gestational age using 
                  the LMP method. However, only about 5% of babies are born exactly on their due date. Normal 
                  delivery can occur anywhere from 37-42 weeks of pregnancy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Why is LMP used instead of conception date?</h4>
                <p className="text-gray-300 text-sm">
                  The LMP method is used because most women know their last period date, but conception timing 
                  can be unclear. Sperm can survive up to 5 days, and ovulation timing varies, making LMP 
                  the most reliable reference point for medical dating.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">What if I have irregular periods?</h4>
                <p className="text-gray-300 text-sm">
                  If you have irregular periods, the LMP method may be less accurate. Your healthcare provider 
                  may recommend an early ultrasound (dating scan) for more precise pregnancy dating, especially 
                  if done before 12 weeks of pregnancy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">How often should I check my pregnancy progress?</h4>
                <p className="text-gray-300 text-sm">
                  You can check your pregnancy progress weekly to see how your baby is developing. However, 
                  remember that this calculator provides estimates. Always follow your healthcare provider's 
                  schedule for prenatal appointments and ultrasounds for official pregnancy monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalculatorPage;