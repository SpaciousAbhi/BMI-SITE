import React from "react";
import OvulationCalculator from "../components/OvulationCalculator";

const OvulationCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Ovulation Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your fertile window and ovulation dates with precision. Optimize your conception timing 
            with our advanced ovulation calculator based on your menstrual cycle patterns.
          </p>
        </div>

        {/* Calculator Component */}
        <OvulationCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-rose-400">Understanding Ovulation</h3>
              <p className="text-gray-300 mb-4">
                Ovulation is the release of a mature egg from the ovary, typically occurring once per 
                menstrual cycle. The egg survives for about 24 hours, but conception can occur from 
                intercourse up to 5 days before ovulation due to sperm survival.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Occurs approximately 14 days before next period</li>
                <li>• Egg is viable for 12-24 hours after release</li>
                <li>• Sperm can survive up to 5 days in reproductive tract</li>
                <li>• Fertile window spans about 6 days total</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-pink-400">Maximizing Conception Chances</h3>
              <p className="text-gray-300 mb-4">
                The highest probability of conception occurs during the 3 days leading up to and including 
                ovulation day. Having intercourse every 1-2 days during your fertile window maximizes 
                your chances while maintaining healthy sperm quality.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Peak fertility: 2 days before ovulation (30% chance)</li>
                <li>• Ovulation day: High fertility (33% chance)</li>
                <li>• 3-5 days before: Moderate fertility (10-15% chance)</li>
                <li>• Regular intercourse every 2-3 days optimizes chances</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Ovulation Signs and Symptoms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-rose-300">Physical Signs of Ovulation</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-rose-900/20 rounded-lg border border-rose-800/30">
                    <div className="font-medium text-rose-300">Cervical Mucus Changes</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Clear, stretchy, "egg white" consistency - most fertile
                    </div>
                  </div>
                  <div className="p-3 bg-pink-900/20 rounded-lg border border-pink-800/30">
                    <div className="font-medium text-pink-300">Basal Body Temperature</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Slight rise (0.2-0.5°F) after ovulation occurs
                    </div>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="font-medium text-purple-300">LH Surge</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Detectable 12-36 hours before ovulation with test strips
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-blue-300">Ovulation Pain</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Mild cramping on one side (mittelschmerz) - about 20% of women
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-pink-300">Cycle Phase Characteristics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-red-900/20 rounded">
                    <span className="text-gray-400">Menstrual Phase:</span>
                    <span className="text-red-300">Days 1-5</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-900/20 rounded">
                    <span className="text-gray-400">Follicular Phase:</span>
                    <span className="text-blue-300">Days 1-14</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-900/20 rounded">
                    <span className="text-gray-400">Ovulation:</span>
                    <span className="text-green-300">Around Day 14</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
                    <span className="text-gray-400">Luteal Phase:</span>
                    <span className="text-purple-300">Days 15-28</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                  <div className="font-medium text-yellow-300 mb-2">Fertility Tracking Tips:</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• Track cycles for 3+ months for accuracy</div>
                    <div>• Use multiple signs together (mucus + temperature)</div>
                    <div>• Consider ovulation predictor kits</div>
                    <div>• Apps can help but aren't always accurate</div>
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
                <h4 className="text-lg font-semibold text-rose-400 mb-2">How accurate are ovulation calculators?</h4>
                <p className="text-gray-300 text-sm">
                  Ovulation calculators are reasonably accurate for women with regular cycles, estimating 
                  ovulation within 1-2 days for about 70% of women. However, they're less reliable for 
                  irregular cycles. Combining calendar tracking with physical signs increases accuracy significantly.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">What if my cycles are irregular?</h4>
                <p className="text-gray-300 text-sm">
                  For irregular cycles, ovulation calculators are less reliable. Focus on tracking physical 
                  signs like cervical mucus changes, basal body temperature, and use ovulation predictor kits. 
                  Consider consulting a healthcare provider if cycles vary by more than 7-9 days regularly.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-rose-400 mb-2">Can I ovulate more than once per cycle?</h4>
                <p className="text-gray-300 text-sm">
                  While rare, it's possible to release multiple eggs within a 24-hour window (which can lead 
                  to fraternal twins), but you cannot ovulate twice in separate events during the same cycle. 
                  The luteal phase length remains consistent, making the 14-day rule reliable for most women.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">How long should we try before seeking help?</h4>
                <p className="text-gray-300 text-sm">
                  For women under 35, try for 12 months of regular, well-timed intercourse before consulting 
                  a fertility specialist. For women 35+, seek help after 6 months. If you have known conditions 
                  affecting fertility or irregular cycles, consult a healthcare provider sooner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvulationCalculatorPage;