import React from "react";
import FatIntakeCalculator from "../components/FatIntakeCalculator";

const FatIntakeCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            Fat Intake Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your optimal daily fat intake for health, performance, and body composition goals. Get personalized recommendations for fat types and sources.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FatIntakeCalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding Dietary Fats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Types of Dietary Fats</h3>
                <div className="space-y-4">
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                    <h4 className="font-semibold text-green-300 mb-2">Monounsaturated Fats (50%)</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Heart-healthy fats that improve cholesterol levels and reduce inflammation.
                    </p>
                    <p className="text-gray-400 text-xs">Olive oil, avocados, nuts, seeds</p>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Polyunsaturated Fats (30%)</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Essential fatty acids including omega-3 and omega-6 for brain and heart health.
                    </p>
                    <p className="text-gray-400 text-xs">Fish, walnuts, flax seeds, sunflower oil</p>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
                    <h4 className="font-semibold text-red-300 mb-2">Saturated Fats (≤10%)</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Limit to less than 10% of total calories for heart health.
                    </p>
                    <p className="text-gray-400 text-xs">Butter, coconut oil, fatty meats, dairy</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Essential Functions</h3>
                <ul className="text-gray-300 space-y-3">
                  <li><strong>Hormone Production:</strong> Testosterone, estrogen, cortisol synthesis</li>
                  <li><strong>Vitamin Absorption:</strong> Fat-soluble vitamins A, D, E, K</li>
                  <li><strong>Cell Membranes:</strong> Structural integrity and signaling</li>
                  <li><strong>Brain Function:</strong> 60% of brain is fat tissue</li>
                  <li><strong>Energy Storage:</strong> Long-term fuel reserve (9 cal/g)</li>
                  <li><strong>Satiety:</strong> Slow gastric emptying, appetite control</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">Fat Requirements by Goal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">General Health (AMDR)</h4>
                  <p className="mb-3">20-35% of total calories</p>
                  
                  <h4 className="font-semibold text-white mb-2">Weight Loss</h4>
                  <p className="mb-3">20-30% of calories (higher protein priority)</p>

                  <h4 className="font-semibold text-white mb-2">Heart Health</h4>
                  <p>25-30% calories, emphasize unsaturated fats</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Athletic Performance</h4>
                  <p className="mb-3">25-35% for hormone optimization</p>
                  
                  <h4 className="font-semibold text-white mb-2">Ketogenic Diet</h4>
                  <p className="mb-3">70-80% of total calories</p>

                  <h4 className="font-semibold text-white mb-2">Low Fat Approach</h4>
                  <p>15-25% calories (therapeutic purposes)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Omega Fatty Acids</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Omega-3 Fatty Acids</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Anti-inflammatory, support heart and brain health. Target 2-3g daily.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>EPA/DHA:</strong> Fatty fish, fish oil (1-2g daily)</li>
                    <li>• <strong>ALA:</strong> Flax seeds, chia seeds, walnuts</li>
                    <li>• <strong>Benefits:</strong> Reduced inflammation, brain function</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-300 mb-2">Omega-6 Fatty Acids</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Essential but often overconsummed. Aim for 1:4 omega-3 to omega-6 ratio.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Sources:</strong> Vegetable oils, nuts, seeds</li>
                    <li>• <strong>Balance:</strong> Reduce processed foods high in omega-6</li>
                    <li>• <strong>Function:</strong> Immune function, blood clotting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-700/30 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Best Fat Sources by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Cooking Oils</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Extra virgin olive oil</li>
                    <li>• Avocado oil (high heat)</li>
                    <li>• Coconut oil (moderate)</li>
                    <li>• Grass-fed butter</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Omega-3 Rich</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Wild salmon</li>
                    <li>• Sardines, mackerel</li>
                    <li>• Chia seeds</li>
                    <li>• Flax seeds (ground)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-300 mb-2">Nuts & Seeds</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Almonds, walnuts</li>
                    <li>• Hemp seeds</li>
                    <li>• Sunflower seeds</li>
                    <li>• Natural nut butters</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">Whole Food Fats</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Avocados</li>
                    <li>• Olives</li>
                    <li>• Coconut meat</li>
                    <li>• Egg yolks</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900/10 rounded-lg border border-red-800/30">
                <h4 className="font-semibold text-red-300 mb-2">⚠️ Fats to Limit or Avoid</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <strong>Trans Fats (AVOID):</strong> Partially hydrogenated oils, processed foods, margarine
                  </div>
                  <div>
                    <strong>Excessive Saturated Fat:</strong> Limit to less than 10% of calories, choose quality sources
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FatIntakeCalculatorPage;