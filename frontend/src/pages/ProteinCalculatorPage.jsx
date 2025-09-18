import React from "react";
import ProteinCalculator from "../components/ProteinCalculator";

const ProteinCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
            Protein Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your optimal daily protein intake for muscle building, weight loss, and health. Get personalized recommendations with timing and source guidance.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProteinCalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding Protein Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-300 mb-4">Protein Functions</h3>
                <ul className="text-gray-300 space-y-3">
                  <li><strong>Muscle Building:</strong> Provides amino acids for protein synthesis</li>
                  <li><strong>Repair & Recovery:</strong> Heals damaged tissues from exercise</li>
                  <li><strong>Immune Support:</strong> Produces antibodies and immune cells</li>
                  <li><strong>Hormone Production:</strong> Creates enzymes and hormones</li>
                  <li><strong>Satiety:</strong> Increases fullness and reduces appetite</li>
                  <li><strong>Thermic Effect:</strong> Burns 20-30% of calories during digestion</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-300 mb-4">Protein Quality</h3>
                <div className="space-y-4">
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                    <h4 className="font-semibold text-green-300 mb-2">Complete Proteins</h4>
                    <p className="text-gray-300 text-sm">
                      Contain all 9 essential amino acids. Examples: meat, fish, eggs, dairy, quinoa, soy.
                    </p>
                  </div>
                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-800/30">
                    <h4 className="font-semibold text-orange-300 mb-2">Incomplete Proteins</h4>
                    <p className="text-gray-300 text-sm">
                      Missing one or more essential amino acids. Examples: beans, nuts, grains. Combine for completeness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-red-900/20 rounded-lg border border-red-800/50">
              <h3 className="text-lg font-semibold text-red-300 mb-3">Protein Requirements by Population</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Sedentary Adults</h4>
                  <p className="mb-3">0.8g per kg body weight (RDA minimum)</p>
                  
                  <h4 className="font-semibold text-white mb-2">Active Individuals</h4>
                  <p className="mb-3">1.2-1.6g per kg body weight</p>

                  <h4 className="font-semibold text-white mb-2">Strength Athletes</h4>
                  <p>1.6-2.2g per kg body weight for muscle building</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Endurance Athletes</h4>
                  <p className="mb-3">1.2-1.4g per kg body weight</p>
                  
                  <h4 className="font-semibold text-white mb-2">Weight Loss</h4>
                  <p className="mb-3">1.6-2.4g per kg to preserve muscle</p>

                  <h4 className="font-semibold text-white mb-2">Older Adults (65+)</h4>
                  <p>1.2-1.6g per kg to prevent sarcopenia</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Protein Timing & Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-red-300 mb-2">Daily Distribution</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Breakfast: 25-30g</li>
                    <li>• Lunch: 25-30g</li>
                    <li>• Dinner: 25-30g</li>
                    <li>• Snacks: 10-15g</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-300 mb-2">Pre-Workout</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 15-25g protein</li>
                    <li>• 1-2 hours before</li>
                    <li>• Easy to digest</li>
                    <li>• Whey or egg whites</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-300 mb-2">Post-Workout</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 20-40g protein</li>
                    <li>• Within 2 hours</li>
                    <li>• High leucine content</li>
                    <li>• Whey or complete meal</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-700/30 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">High-Quality Protein Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-semibold text-red-300 mb-2">Animal Sources</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Chicken breast (31g/100g)</li>
                    <li>• Salmon (25g/100g)</li>
                    <li>• Eggs (6g per egg)</li>
                    <li>• Greek yogurt (10g/100g)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Plant Sources</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Lentils (18g/cup)</li>
                    <li>• Tofu (20g/100g)</li>
                    <li>• Quinoa (8g/cup)</li>
                    <li>• Hemp seeds (10g/3tbsp)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Supplements</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Whey protein (25g/scoop)</li>
                    <li>• Casein protein (24g/scoop)</li>
                    <li>• Plant blend (20g/scoop)</li>
                    <li>• Collagen (18g/scoop)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">Quick Options</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Protein bars (15-25g)</li>
                    <li>• Cottage cheese (14g/100g)</li>
                    <li>• String cheese (8g/stick)</li>
                    <li>• Jerky (15g/serving)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinCalculatorPage;