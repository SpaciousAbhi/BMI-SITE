import React from "react";
import ArmyBodyFatCalculator from "../components/ArmyBodyFatCalculator";

const ArmyBodyFatCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Army Body Fat Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate body fat percentage using official US Army AR 600-9 standards and the military tape test method. 
            Determine if you meet Army body composition requirements.
          </p>
        </div>

        {/* Calculator Component */}
        <ArmyBodyFatCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Army Regulation AR 600-9</h3>
              <p className="text-gray-300 mb-4">
                The Army Body Composition Program (ABCP) ensures soldiers maintain the appearance, physical readiness, 
                and health required for military service. AR 600-9 establishes the standards and procedures for body 
                composition assessment.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Updated standards implemented in 2023</li>
                <li>• Age and gender-specific requirements</li>
                <li>• Mandatory for all active duty soldiers</li>
                <li>• Used for enlistment and retention decisions</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Military Tape Test</h3>
              <p className="text-gray-300 mb-4">
                The Army tape test uses circumference measurements to estimate body fat percentage. This method 
                was developed specifically for military use and has been refined over decades to ensure accuracy 
                and fairness for all body types.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Standardized measurement procedures</li>
                <li>• Trained personnel required for official tests</li>
                <li>• Appeals process available</li>
                <li>• Regular calibration and validation</li>
              </ul>
            </div>
          </div>

          {/* Army Standards Table */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Army Body Fat Standards (AR 600-9)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-300">Male Standards</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="text-gray-400 font-medium">Age Range</span>
                    <span className="text-white font-medium">Max Body Fat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">17-20 years</span>
                    <span className="text-white">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">21-27 years</span>
                    <span className="text-white">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">28-39 years</span>
                    <span className="text-white">24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">40+ years</span>
                    <span className="text-white">26%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Female Standards</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="text-gray-400 font-medium">Age Range</span>
                    <span className="text-white font-medium">Max Body Fat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">17-20 years</span>
                    <span className="text-white">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">21-27 years</span>
                    <span className="text-white">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">28-39 years</span>
                    <span className="text-white">34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">40+ years</span>
                    <span className="text-white">36%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800/50">
              <p className="text-sm text-gray-300">
                <strong className="text-green-300">Important:</strong> This calculator provides estimates based on AR 600-9 formulas. 
                Official Army body composition assessments must be conducted by qualified military personnel using standardized procedures. 
                Results may vary from official measurements due to measurement technique and individual factors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyBodyFatCalculatorPage;