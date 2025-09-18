import React from "react";
import IdealWeightCalculator from "../components/IdealWeightCalculator";

const IdealWeightCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Ideal Weight Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your ideal body weight using medically validated formulas including Devine, Robinson, Miller, and Hamwi methods. 
            Get personalized weight targets based on your height and gender.
          </p>
        </div>

        {/* Calculator Component */}
        <IdealWeightCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Medical Formula Standards</h3>
              <p className="text-gray-300 mb-4">
                Ideal body weight formulas have been used in medical practice for decades to establish baseline 
                weight targets for different heights. These formulas serve as starting points for medical dosing, 
                nutritional planning, and health assessments.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Developed by medical researchers</li>
                <li>• Used in clinical practice worldwide</li>
                <li>• Based on height and gender</li>
                <li>• Validated through population studies</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Devine Formula - Gold Standard</h3>
              <p className="text-gray-300 mb-4">
                The Devine formula, developed in 1974, is considered the gold standard for ideal weight calculation. 
                It's widely used in medical practice for drug dosing and clinical assessments due to its accuracy 
                and extensive validation.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Most validated and accepted formula</li>
                <li>• Used for medical dosing calculations</li>
                <li>• Baseline for other formula variations</li>
                <li>• Recommended by healthcare professionals</li>
              </ul>
            </div>
          </div>

          {/* Formula Comparison */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Understanding Different Formulas</h3>
            <p className="text-gray-300 mb-6">
              Each formula uses a different approach to calculate ideal weight, leading to slight variations in results. 
              Understanding these differences helps you choose the most appropriate method for your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Traditional Formulas</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-white mb-1">Devine Formula</div>
                    <div className="text-gray-400">Medical gold standard, widely used in clinical practice</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-white mb-1">Robinson Formula</div>
                    <div className="text-gray-400">Modified Devine with adjusted constants</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-white mb-1">Miller Formula</div>
                    <div className="text-gray-400">Alternative medical approach with different coefficients</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-300">Alternative Methods</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-white mb-1">Hamwi Formula</div>
                    <div className="text-gray-400">Quick estimation method used in dietetics</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-white mb-1">Broca Formula</div>
                    <div className="text-gray-400">Traditional European method, height-based</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-white mb-1">BMI-Based</div>
                    <div className="text-gray-400">Uses optimal BMI of 22, gender-neutral approach</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <h5 className="text-sm font-semibold text-yellow-300 mb-2">Important Considerations</h5>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Formulas don't account for muscle mass or body frame</li>
                <li>• Results should be combined with BMI ranges for complete assessment</li>
                <li>• Individual health factors may require adjusted targets</li>
                <li>• Consult healthcare providers for personalized weight goals</li>
                <li>• Athletic individuals may have higher healthy weights due to muscle mass</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdealWeightCalculatorPage;