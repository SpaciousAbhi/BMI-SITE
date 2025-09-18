import React from "react";
import ConceptionCalculator from "../components/ConceptionCalculator";

const ConceptionCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Conception Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate when conception occurred based on your due date, birth date, or last menstrual period. 
            Discover your baby's conception window and understand your fertility timeline.
          </p>
        </div>

        {/* Calculator Component */}
        <ConceptionCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Understanding Conception</h3>
              <p className="text-gray-300 mb-4">
                Conception occurs when a sperm successfully fertilizes an egg, typically during ovulation. 
                This usually happens in the fallopian tube, and the fertilized egg then travels to the 
                uterus for implantation about 6-12 days later.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Occurs during or shortly after ovulation</li>
                <li>• Sperm can survive up to 5 days in reproductive tract</li>
                <li>• Egg is viable for about 24 hours after release</li>
                <li>• Implantation occurs 6-12 days after conception</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Conception vs. Gestational Age</h3>
              <p className="text-gray-300 mb-4">
                There's an important difference between conception age and gestational age. Medical 
                professionals use gestational age (from LMP) because it's more standardized, while 
                conception age (from actual fertilization) is about 2 weeks less.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Gestational age: Counted from last menstrual period</li>
                <li>• Conception age: About 2 weeks less than gestational age</li>
                <li>• Average pregnancy: 280 days from LMP, 266 from conception</li>
                <li>• Both methods are medically accepted</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Conception Timeline and Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">From Conception to Implantation</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="font-medium text-purple-300">Day 0: Conception</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Sperm fertilizes egg in fallopian tube
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
                    <div className="font-medium text-indigo-300">Day 1-6: Cell Division</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Fertilized egg divides and travels to uterus
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-blue-300">Day 6-12: Implantation</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Embryo attaches to uterine wall
                    </div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="font-medium text-green-300">Day 10-14: hCG Production</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Pregnancy hormone becomes detectable
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-indigo-300">Factors Affecting Conception Timing</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-rose-900/20 rounded border border-rose-800/30">
                    <div className="font-medium text-rose-300">Cycle Length Variations</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Ovulation timing varies with cycle length
                    </div>
                  </div>
                  <div className="p-2 bg-orange-900/20 rounded border border-orange-800/30">
                    <div className="font-medium text-orange-300">Ovulation Irregularities</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Stress, illness can affect ovulation timing
                    </div>
                  </div>
                  <div className="p-2 bg-yellow-900/20 rounded border border-yellow-800/30">
                    <div className="font-medium text-yellow-300">Sperm Survival Window</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Intercourse 5 days before ovulation can result in conception
                    </div>
                  </div>
                  <div className="p-2 bg-teal-900/20 rounded border border-teal-800/30">
                    <div className="font-medium text-teal-300">Individual Variations</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Each woman's cycle patterns are unique
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg border border-cyan-800/30">
                  <div className="font-medium text-cyan-300 mb-2">Calculation Accuracy:</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• LMP method: ±7-10 days accuracy</div>
                    <div>• Due date method: ±5-7 days accuracy</div>
                    <div>• Birth date method: ±3-5 days accuracy</div>
                    <div>• Early ultrasound: Most accurate (±3 days)</div>
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
                <h4 className="text-lg font-semibold text-purple-400 mb-2">How accurate is conception date calculation?</h4>
                <p className="text-gray-300 text-sm">
                  Conception date calculations are estimates with varying accuracy depending on the method used. 
                  LMP-based calculations are accurate within 7-10 days, while early ultrasound measurements 
                  (6-12 weeks) can pinpoint conception within 3-5 days. Individual cycle variations affect accuracy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">Can conception occur outside the fertile window?</h4>
                <p className="text-gray-300 text-sm">
                  Conception is highly unlikely outside the fertile window, but it's not impossible due to 
                  cycle irregularities or longer sperm survival. The fertile window includes the 5 days before 
                  ovulation and ovulation day itself, accounting for sperm survival and egg viability.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Why use LMP instead of conception date for pregnancy dating?</h4>
                <p className="text-gray-300 text-sm">
                  Healthcare providers use LMP because most women know their last period date, but conception 
                  timing can be uncertain. Sperm can survive up to 5 days, ovulation timing varies, and couples 
                  may not remember exact intercourse dates. LMP provides a standardized reference point.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">Does conception always occur during ovulation?</h4>
                <p className="text-gray-300 text-sm">
                  Conception typically occurs within 24 hours of ovulation when the egg is viable. However, 
                  if intercourse occurred days earlier, sperm may still be alive when ovulation happens. 
                  The fertilization event itself happens during or shortly after ovulation, but the 
                  "conception window" spans about 6 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptionCalculatorPage;