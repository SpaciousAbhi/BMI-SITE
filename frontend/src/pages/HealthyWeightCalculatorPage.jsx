import React from "react";
import HealthyWeightCalculator from "../components/HealthyWeightCalculator";

const HealthyWeightCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Healthy Weight Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your personalized healthy weight range based on BMI standards, age, activity level, and body frame. 
            Get customized recommendations for weight management and health optimization.
          </p>
        </div>

        {/* Calculator Component */}
        <HealthyWeightCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Personalized Assessment</h3>
              <p className="text-gray-300 mb-4">
                Unlike simple BMI calculators, our healthy weight calculator considers multiple personal factors 
                to provide a more accurate and individualized weight range. This comprehensive approach accounts 
                for age-related changes, activity levels, and body frame differences.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Age-adjusted BMI ranges</li>
                <li>• Activity level considerations</li>
                <li>• Body frame adjustments</li>
                <li>• Gender-specific calculations</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">WHO & CDC Standards</h3>
              <p className="text-gray-300 mb-4">
                Our calculations are based on World Health Organization (WHO) and Centers for Disease Control (CDC) 
                guidelines, with adjustments for individual factors. These standards have been established through 
                extensive population studies and clinical research.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Evidence-based BMI ranges</li>
                <li>• Population study validation</li>
                <li>• Regular updates with new research</li>
                <li>• International health standards</li>
              </ul>
            </div>
          </div>

          {/* Age-Adjusted BMI Information */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Age-Adjusted Healthy Weight Ranges</h3>
            <p className="text-gray-300 mb-6">
              Research shows that slightly higher BMI ranges may be healthier for older adults, while younger adults 
              benefit from staying within traditional ranges. Our calculator automatically adjusts for these age-related differences.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Young Adults (18-49)</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-blue-300 mb-1">Standard BMI Range</div>
                    <div className="text-gray-400">18.5 - 24.9</div>
                  </div>
                  <ul className="text-gray-400 text-xs space-y-1 mt-2">
                    <li>• Optimal metabolic health range</li>
                    <li>• Lower chronic disease risk</li>
                    <li>• Best for long-term health</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-300">Middle-Aged (50-64)</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="font-medium text-green-300 mb-1">Adjusted Range</div>
                    <div className="text-gray-400">20.0 - 26.0</div>
                  </div>
                  <ul className="text-gray-400 text-xs space-y-1 mt-2">
                    <li>• Accounts for metabolic changes</li>
                    <li>• Supports healthy aging</li>
                    <li>• Balances longevity and function</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-yellow-300">Older Adults (65+)</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                    <div className="font-medium text-yellow-300 mb-1">Senior Range</div>
                    <div className="text-gray-400">22.0 - 27.0</div>
                  </div>
                  <ul className="text-gray-400 text-xs space-y-1 mt-2">
                    <li>• Protects against frailty</li>
                    <li>• Supports immune function</li>
                    <li>• Maintains bone health</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
                <h5 className="text-sm font-semibold text-purple-300 mb-2">Activity Level Adjustments</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• <strong>High Activity:</strong> +2 BMI points (muscle mass)</li>
                  <li>• <strong>Moderate Activity:</strong> +1 BMI point</li>
                  <li>• <strong>Low Activity:</strong> Standard ranges apply</li>
                </ul>
              </div>
              <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/50">
                <h5 className="text-sm font-semibold text-indigo-300 mb-2">Body Frame Considerations</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• <strong>Large Frame:</strong> +1 BMI point range</li>
                  <li>• <strong>Medium Frame:</strong> Standard ranges</li>
                  <li>• <strong>Small Frame:</strong> -1 BMI point range</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Weight Management Goals */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Weight Management Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-800/50">
                <h4 className="text-lg font-semibold text-red-300 mb-2">Weight Loss Target</h4>
                <p className="text-gray-400 text-sm">Lower end of healthy range for safe, sustainable weight loss</p>
              </div>
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <h4 className="text-lg font-semibold text-green-300 mb-2">Maintenance Target</h4>
                <p className="text-gray-400 text-sm">Middle of healthy range for optimal health maintenance</p>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Muscle Gain Target</h4>
                <p className="text-gray-400 text-sm">Upper healthy range accounting for lean muscle development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyWeightCalculatorPage;