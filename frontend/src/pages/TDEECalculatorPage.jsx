import React from "react";
import TDEECalculator from "../components/TDEECalculator";

const TDEECalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            TDEE Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your Total Daily Energy Expenditure using advanced metabolic science. Get precise estimates for all activity levels and personalized macronutrient targets.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TDEECalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding TDEE</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Components of TDEE</h3>
                <ul className="text-gray-300 space-y-3">
                  <li><strong>BMR (60-70%):</strong> Basal Metabolic Rate - energy for basic bodily functions</li>
                  <li><strong>TEA (15-30%):</strong> Thermic Effect of Activity - planned exercise and sports</li>
                  <li><strong>NEAT (10-15%):</strong> Non-Exercise Activity Thermogenesis - daily activities</li>
                  <li><strong>TEF (8-15%):</strong> Thermic Effect of Food - energy to digest and process food</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">TDEE Applications</h3>
                <ul className="text-gray-300 space-y-2">
                  <li><strong>Weight Management:</strong> Precise calorie targets for any goal</li>
                  <li><strong>Athletic Performance:</strong> Fuel requirements for training</li>
                  <li><strong>Nutrition Planning:</strong> Macronutrient distribution guidance</li>
                  <li><strong>Health Optimization:</strong> Metabolic health assessment</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Activity Level Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Sedentary (1.2x)</h4>
                  <p>Desk job, minimal walking, no formal exercise. Most time spent sitting or lying down.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Lightly Active (1.375x)</h4>
                  <p>Light exercise 1-3 days/week or physically active job with some walking.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Moderately Active (1.55x)</h4>
                  <p>Moderate exercise 3-5 days/week, regular gym sessions or active lifestyle.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Very Active (1.725x)</h4>
                  <p>Hard exercise 6-7 days/week, intense training or physically demanding job.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TDEECalculatorPage;