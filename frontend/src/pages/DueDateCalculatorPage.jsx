import React from "react";
import DueDateCalculator from "../components/DueDateCalculator";

const DueDateCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Due Date Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your pregnancy due date with medical precision using your last menstrual period or 
            conception date. Track important pregnancy milestones and birth window estimates.
          </p>
        </div>

        {/* Calculator Component */}
        <DueDateCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Due Date Calculation Methods</h3>
              <p className="text-gray-300 mb-4">
                Our due date calculator uses scientifically proven methods to estimate your baby's arrival. 
                The most common method is Naegele's Rule, which adds 280 days (40 weeks) to your last 
                menstrual period date, assuming a 28-day cycle with ovulation on day 14.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• <strong>LMP Method:</strong> Most commonly used by doctors</li>
                <li>• <strong>Conception Date:</strong> More accurate if known</li>
                <li>• <strong>Ultrasound Dating:</strong> Most precise (especially early pregnancy)</li>
                <li>• <strong>IVF Dating:</strong> Most accurate for assisted pregnancies</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Due Date Accuracy</h3>
              <p className="text-gray-300 mb-4">
                While due dates provide important guidance, only about 5% of babies are born exactly on 
                their due date. Most babies are born within 2 weeks before or after the estimated due date, 
                which is considered normal and full-term.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Only 5% of babies born on exact due date</li>
                <li>• 37-42 weeks is considered full-term</li>
                <li>• First-time mothers often deliver 1-2 days late</li>
                <li>• Subsequent pregnancies may be earlier</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Understanding Your Due Date Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Pregnancy Timeline</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-blue-300">Early Term (37-38 weeks)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Baby is considered full-term but may need extra monitoring
                    </div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="font-medium text-green-300">Full Term (39-40 weeks)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Optimal time for delivery - baby's organs are fully mature
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div className="font-medium text-yellow-300">Late Term (41 weeks)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Still normal but requires closer monitoring
                    </div>
                  </div>
                  <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div className="font-medium text-orange-300">Post Term (42+ weeks)</div>
                    <div className="text-gray-400 text-xs mt-1">
                      May require induction of labor
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-indigo-300">Important Milestones</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Viability (24 weeks):</span>
                    <span className="text-white">50% survival rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Moderate Preterm (32 weeks):</span>
                    <span className="text-white">95% survival rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Late Preterm (34 weeks):</span>
                    <span className="text-white">99% survival rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Early Term (37 weeks):</span>
                    <span className="text-white">Full-term pregnancy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Full Term (39 weeks):</span>
                    <span className="text-white">Optimal delivery time</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                  <div className="font-medium text-purple-300 mb-2">Key Prenatal Appointments:</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• 8-12 weeks: First prenatal visit</div>
                    <div>• 18-22 weeks: Anatomy scan</div>
                    <div>• 24-28 weeks: Glucose screening</div>
                    <div>• 36+ weeks: Weekly visits</div>
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
                <h4 className="text-lg font-semibold text-blue-400 mb-2">How accurate are due date calculations?</h4>
                <p className="text-gray-300 text-sm">
                  Due date calculations are estimates with a margin of error of about ±2 weeks. The accuracy 
                  depends on the method used: LMP-based calculations are accurate within 2 weeks for 90% of 
                  women, while early ultrasounds (6-12 weeks) are accurate within 3-5 days.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">What if I don't remember my last period date?</h4>
                <p className="text-gray-300 text-sm">
                  If you can't remember your last menstrual period, your healthcare provider will likely 
                  recommend an early dating ultrasound (typically between 8-13 weeks). This method measures 
                  the baby's size to estimate gestational age and is very accurate in early pregnancy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Should I be worried if my baby is late?</h4>
                <p className="text-gray-300 text-sm">
                  Not necessarily. About 10% of pregnancies naturally extend beyond 42 weeks. However, 
                  post-term pregnancies require closer monitoring due to increased risks. Your healthcare 
                  provider may recommend induction between 41-42 weeks depending on various factors.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">Can my due date change during pregnancy?</h4>
                <p className="text-gray-300 text-sm">
                  Yes, your due date may be adjusted based on ultrasound measurements, especially if there's 
                  a significant difference (more than 7 days) between your LMP-based date and ultrasound 
                  measurements. Early ultrasounds (before 20 weeks) are most reliable for dating adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueDateCalculatorPage;