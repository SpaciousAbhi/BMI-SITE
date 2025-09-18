import React from "react";
import CarbohydrateCalculator from "../components/CarbohydrateCalculator";

const CarbohydrateCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Carbohydrate Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your optimal daily carbohydrate intake based on activity level, goals, and metabolic needs. Get personalized carb timing and source recommendations.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CarbohydrateCalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding Carbohydrates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-amber-300 mb-4">Types of Carbohydrates</h3>
                <div className="space-y-4">
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                    <h4 className="font-semibold text-green-300 mb-2">Complex Carbs (70%)</h4>
                    <p className="text-gray-300 text-sm">
                      Slow-digesting, provide sustained energy. Include whole grains, vegetables, legumes, and starchy vegetables.
                    </p>
                  </div>
                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-800/30">
                    <h4 className="font-semibold text-orange-300 mb-2">Simple Carbs (20%)</h4>
                    <p className="text-gray-300 text-sm">
                      Quick energy source. Best around workouts. Include fruits and targeted simple sugars for performance.
                    </p>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Fiber-Rich (10%)</h4>
                    <p className="text-gray-300 text-sm">
                      Essential for digestive health. Include vegetables, beans, berries, and high-fiber grains.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-300 mb-4">Carb Requirements by Goal</h3>
                <ul className="text-gray-300 space-y-4">
                  <li>
                    <strong className="text-green-300">General Health:</strong><br/>
                    <span className="text-sm">45-65% of total calories (3-5g per kg body weight)</span>
                  </li>
                  <li>
                    <strong className="text-blue-300">Endurance Athletes:</strong><br/>
                    <span className="text-sm">6-10g per kg body weight for training days</span>
                  </li>
                  <li>
                    <strong className="text-orange-300">Strength Training:</strong><br/>
                    <span className="text-sm">4-7g per kg body weight for muscle building</span>
                  </li>
                  <li>
                    <strong className="text-red-300">Fat Loss:</strong><br/>
                    <span className="text-sm">2-3g per kg body weight (20-30% of calories)</span>
                  </li>
                  <li>
                    <strong className="text-purple-300">Ketogenic:</strong><br/>
                    <span className="text-sm">Under 50g total daily (5-10% of calories)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-900/20 rounded-lg border border-amber-800/50">
              <h3 className="text-lg font-semibold text-amber-300 mb-3">Optimal Carb Timing</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-300">
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Pre-Workout</h4>
                  <p>30-60g carbs<br/>1-2 hours before<br/>Quick-digesting</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">During Workout</h4>
                  <p>15-30g carbs<br/>For sessions >90 min<br/>Sports drinks/gels</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Post-Workout</h4>
                  <p>30-60g carbs<br/>Within 30 minutes<br/>Glycogen replenishment</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Evening</h4>
                  <p>Lower carbs<br/>Focus on fiber<br/>Better sleep quality</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Best Carbohydrate Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Whole Grains</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Brown rice (45g per cup)</li>
                    <li>• Quinoa (39g per cup)</li>
                    <li>• Oats (54g per cup)</li>
                    <li>• Whole wheat bread (24g per 2 slices)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-300 mb-2">Fruits</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Banana (27g medium)</li>
                    <li>• Apple (25g medium)</li>
                    <li>• Berries (15g per cup)</li>
                    <li>• Dates (18g per 2 dates)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Vegetables</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Sweet potato (26g medium)</li>
                    <li>• Regular potato (37g medium)</li>
                    <li>• Beets (13g per cup)</li>
                    <li>• Carrots (12g per cup)</li>
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

export default CarbohydrateCalculatorPage;