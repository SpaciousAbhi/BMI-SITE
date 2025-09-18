import React from "react";
import PeriodCalculator from "../components/PeriodCalculator";

const PeriodCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Period Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track and predict your menstrual cycle with comprehensive period and fertility insights. 
            Plan ahead with accurate predictions and understand your cycle phases.
          </p>
        </div>

        {/* Calculator Component */}
        <PeriodCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Understanding Your Menstrual Cycle</h3>
              <p className="text-gray-300 mb-4">
                The menstrual cycle is a natural process that prepares your body for potential pregnancy 
                each month. A typical cycle lasts 21-35 days, with the average being 28 days. Understanding 
                your cycle helps with family planning, health monitoring, and general well-being.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Average cycle length: 28 days (normal range: 21-35 days)</li>
                <li>• Period duration: 3-7 days (average 5 days)</li>
                <li>• Cycle regularity may vary ±7 days normally</li>
                <li>• Hormone levels fluctuate throughout the cycle</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-pink-400">Cycle Phases Explained</h3>
              <p className="text-gray-300 mb-4">
                Your menstrual cycle consists of four main phases, each with distinct hormonal changes 
                and physical characteristics. Understanding these phases helps you recognize normal 
                patterns and identify any irregularities that may need medical attention.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• <strong>Menstrual Phase:</strong> Shedding of uterine lining (Days 1-5)</li>
                <li>• <strong>Follicular Phase:</strong> Egg development and estrogen rise</li>
                <li>• <strong>Ovulation:</strong> Egg release and peak fertility (around Day 14)</li>
                <li>• <strong>Luteal Phase:</strong> Progesterone dominance (Days 15-28)</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Menstrual Cycle Health and Tracking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-red-300">Normal vs. Irregular Cycles</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="font-medium text-green-300">Regular Cycles</div>
                    <div className="text-gray-400 text-xs mt-1">
                      • 21-35 day length consistently<br/>
                      • Variation of ±7 days is normal<br/>
                      • Predictable symptoms and flow
                    </div>
                  </div>
                  <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div className="font-medium text-orange-300">Irregular Cycles</div>
                    <div className="text-gray-400 text-xs mt-1">
                      • Length varies >9 days between cycles<br/>
                      • Cycles shorter than 21 or longer than 35 days<br/>
                      • Absent periods (amenorrhea)
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div className="font-medium text-yellow-300">When to See a Doctor</div>
                    <div className="text-gray-400 text-xs mt-1">
                      • Sudden changes in cycle pattern<br/>
                      • Severe pain or very heavy bleeding<br/>
                      • Missed periods without pregnancy
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-pink-300">Factors Affecting Your Cycle</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
                    <span className="text-gray-400">Stress:</span>
                    <span className="text-purple-300">Can delay ovulation</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-900/20 rounded">
                    <span className="text-gray-400">Weight changes:</span>
                    <span className="text-blue-300">Affect hormone levels</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-teal-900/20 rounded">
                    <span className="text-gray-400">Exercise:</span>
                    <span className="text-teal-300">Intense training can affect cycles</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-indigo-900/20 rounded">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-indigo-300">Cycles change over time</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-rose-900/20 rounded">
                    <span className="text-gray-400">Medications:</span>
                    <span className="text-rose-300">Birth control affects timing</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg border border-cyan-800/30">
                  <div className="font-medium text-cyan-300 mb-2">Tracking Benefits:</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• Identify fertile windows for conception</div>
                    <div>• Plan activities around energy levels</div>
                    <div>• Monitor cycle health and changes</div>
                    <div>• Prepare for PMS symptoms</div>
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
                <h4 className="text-lg font-semibold text-red-400 mb-2">How accurate are period predictions?</h4>
                <p className="text-gray-300 text-sm">
                  Period predictions are generally accurate within 1-3 days for women with regular cycles. 
                  Accuracy improves after tracking for 3+ cycles. For irregular cycles, predictions are less 
                  reliable and may vary by several days. Stress, illness, and lifestyle changes can affect timing.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">What's considered a normal period?</h4>
                <p className="text-gray-300 text-sm">
                  A normal period lasts 3-7 days with moderate flow that gradually decreases. Color ranges 
                  from bright red to dark brown. You should use 3-6 pads/tampons per day on average. 
                  Severe pain requiring prescription medication or flow requiring hourly changes may indicate problems.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-2">Can I get pregnant during my period?</h4>
                <p className="text-gray-300 text-sm">
                  While uncommon, pregnancy during menstruation is possible, especially with short cycles 
                  or long periods. Sperm can survive up to 5 days, so if you ovulate early after your period 
                  ends, conception could occur. Use contraception consistently if you want to avoid pregnancy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">Why is my cycle suddenly irregular?</h4>
                <p className="text-gray-300 text-sm">
                  Cycle irregularities can result from stress, significant weight changes, intense exercise, 
                  illness, medication changes, or hormonal imbalances. Occasional irregularity is normal, 
                  but persistent changes warrant consultation with a healthcare provider to rule out conditions 
                  like PCOS or thyroid disorders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodCalculatorPage;