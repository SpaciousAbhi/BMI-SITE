import React from "react";
import BMRCalculator from "../components/BMRCalculator";

const BMRCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            BMR Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your Basal Metabolic Rate using scientifically validated formulas. Understand your body's energy needs at rest and optimize your metabolism.
          </p>
        </div>
      </div>

      {/* Calculator Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BMRCalculator />
      </div>

      {/* Educational Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding BMR</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-300 mb-4">What is BMR?</h3>
                <p className="text-gray-300 mb-4">
                  Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological 
                  functions while at complete rest. This includes breathing, circulation, cell production, nutrient 
                  processing, and protein synthesis.
                </p>
                <p className="text-gray-300">
                  BMR typically accounts for 60-70% of your total daily energy expenditure and forms the foundation 
                  for calculating your complete caloric needs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-300 mb-4">BMR Formula Comparison</h3>
                <ul className="text-gray-300 space-y-3">
                  <li><strong>Mifflin-St Jeor (Recommended):</strong> Most accurate for general population</li>
                  <li><strong>Harris-Benedict:</strong> Classic formula, tends to overestimate by 5%</li>
                  <li><strong>Katch-McArdle:</strong> Most accurate for lean individuals with known body fat%</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-red-900/20 rounded-lg border border-red-800/50">
              <h3 className="text-lg font-semibold text-red-300 mb-3">Factors Affecting BMR</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div>
                  <strong>Body Composition:</strong> Muscle tissue requires more energy than fat tissue. Higher muscle mass = higher BMR.
                </div>
                <div>
                  <strong>Age:</strong> BMR decreases by approximately 2% per decade after age 20 due to muscle loss and hormonal changes.
                </div>
                <div>
                  <strong>Gender:</strong> Men typically have higher BMR due to greater muscle mass and larger body size.
                </div>
                <div>
                  <strong>Genetics:</strong> Some people naturally have faster or slower metabolisms due to genetic factors.
                </div>
                <div>
                  <strong>Hormones:</strong> Thyroid hormones, insulin, and stress hormones significantly impact metabolic rate.
                </div>
                <div>
                  <strong>Temperature:</strong> Cold environments can increase BMR as the body works to maintain temperature.
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Boosting Your BMR Naturally</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <ul className="space-y-2">
                  <li>• <strong>Strength Training:</strong> Build lean muscle mass</li>
                  <li>• <strong>Protein Intake:</strong> Higher thermic effect than carbs/fats</li>
                  <li>• <strong>Stay Hydrated:</strong> Proper hydration supports metabolism</li>
                  <li>• <strong>Get Quality Sleep:</strong> 7-9 hours for optimal hormonal function</li>
                </ul>
                <ul className="space-y-2">
                  <li>• <strong>HIIT Workouts:</strong> Increase post-exercise calorie burn</li>
                  <li>• <strong>Green Tea:</strong> Contains metabolism-boosting compounds</li>
                  <li>• <strong>Spicy Foods:</strong> Capsaicin can temporarily increase BMR</li>
                  <li>• <strong>Manage Stress:</strong> Chronic stress can slow metabolism</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculatorPage;