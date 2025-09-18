import React from "react";
import CalorieCalculator from "../components/CalorieCalculator";

const CalorieCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Daily Calorie Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your precise daily caloric needs using advanced metabolic formulas. Get personalized recommendations for weight loss, muscle gain, or maintenance goals.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CalorieCalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding Daily Calorie Needs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-300 mb-4">What Are Calories?</h3>
                <p className="text-gray-300 mb-4">
                  Calories are units of energy that your body needs to function. Your Total Daily Energy Expenditure (TDEE) 
                  includes energy for basic bodily functions (BMR), physical activity, digestion, and maintaining body temperature.
                </p>
                <p className="text-gray-300">
                  Our calculator uses the most accurate formulas including Mifflin-St Jeor equation, which is considered 
                  the gold standard for BMR calculation in healthy adults.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-300 mb-4">Calorie Balance for Goals</h3>
                <ul className="text-gray-300 space-y-2">
                  <li><strong>Weight Loss:</strong> Create a deficit of 300-500 calories below TDEE</li>
                  <li><strong>Weight Maintenance:</strong> Consume calories equal to your TDEE</li>
                  <li><strong>Weight Gain:</strong> Create a surplus of 300-500 calories above TDEE</li>
                  <li><strong>Muscle Building:</strong> Moderate surplus (300-400 calories) with adequate protein</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-900/20 rounded-lg border border-orange-800/50">
              <h3 className="text-lg font-semibold text-orange-300 mb-3">Important Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div>
                  <strong>Activity Level:</strong> Include all forms of movement, from formal exercise to daily activities like walking and fidgeting.
                </div>
                <div>
                  <strong>Body Composition:</strong> Muscle tissue burns more calories at rest than fat tissue, affecting your BMR.
                </div>
                <div>
                  <strong>Age & Gender:</strong> Metabolism naturally slows with age, and men typically have higher calorie needs than women.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculatorPage;