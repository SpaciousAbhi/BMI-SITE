import React from "react";
import MacroCalculator from "../components/MacroCalculator";

const MacroCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Macro Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your optimal macronutrient distribution for protein, carbohydrates, and fats. Get personalized ratios based on your goals and lifestyle.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MacroCalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding Macronutrients</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-900/20 p-6 rounded-lg border border-green-800/50">
                <h3 className="text-xl font-semibold text-green-300 mb-4">Protein</h3>
                <p className="text-gray-300 mb-3">
                  <strong>4 calories per gram</strong>
                </p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Muscle building and repair</li>
                  <li>• Immune function support</li>
                  <li>• Hormone production</li>
                  <li>• Satiety and appetite control</li>
                  <li>• Higher thermic effect (20-30%)</li>
                </ul>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-800/50">
                <h3 className="text-xl font-semibold text-orange-300 mb-4">Carbohydrates</h3>
                <p className="text-gray-300 mb-3">
                  <strong>4 calories per gram</strong>
                </p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Primary energy source</li>
                  <li>• Brain and nervous system fuel</li>
                  <li>• Muscle glycogen storage</li>
                  <li>• Athletic performance</li>
                  <li>• Fiber for digestive health</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-800/50">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Fats</h3>
                <p className="text-gray-300 mb-3">
                  <strong>9 calories per gram</strong>
                </p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Hormone production</li>
                  <li>• Vitamin absorption (A,D,E,K)</li>
                  <li>• Cell membrane structure</li>
                  <li>• Long-term energy storage</li>
                  <li>• Essential fatty acids</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-300 mb-4">Popular Macro Distribution Approaches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Balanced (40/30/30)</h4>
                  <p className="text-gray-300 text-sm mb-3">40% carbs, 30% protein, 30% fat - General health and maintenance</p>
                  
                  <h4 className="font-semibold text-white mb-2">High Protein (30/35/35)</h4>
                  <p className="text-gray-300 text-sm mb-3">30% carbs, 35% protein, 35% fat - Muscle building and fat loss</p>

                  <h4 className="font-semibold text-white mb-2">Low Carb (20/30/50)</h4>
                  <p className="text-gray-300 text-sm">20% carbs, 30% protein, 50% fat - Fat loss and metabolic health</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">High Carb (60/20/20)</h4>
                  <p className="text-gray-300 text-sm mb-3">60% carbs, 20% protein, 20% fat - Endurance athletes</p>
                  
                  <h4 className="font-semibold text-white mb-2">Ketogenic (5/25/70)</h4>
                  <p className="text-gray-300 text-sm mb-3">5% carbs, 25% protein, 70% fat - Rapid fat loss, therapeutic</p>

                  <h4 className="font-semibold text-white mb-2">Mediterranean (45/20/35)</h4>
                  <p className="text-gray-300 text-sm">45% carbs, 20% protein, 35% fat - Heart health and longevity</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-green-900/20 rounded-lg border border-green-800/50">
              <h3 className="text-lg font-semibold text-green-300 mb-3">Macro Timing Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Pre-Workout (1-2 hours before)</h4>
                  <p>• Moderate carbs for energy (30-60g)<br/>• Light protein (15-25g)<br/>• Minimal fat to avoid digestive issues</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Post-Workout (within 2 hours)</h4>
                  <p>• Higher carbs to replenish glycogen (30-80g)<br/>• Quality protein for recovery (20-40g)<br/>• Moderate fat for hormone support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroCalculatorPage;