import React from "react";
import BodyTypeCalculator from "../components/BodyTypeCalculator";

const BodyTypeCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Body Type Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your somatotype using the Heath-Carter anthropometric method. Get personalized fitness, 
            nutrition, and training recommendations based on your unique body type composition.
          </p>
        </div>

        {/* Calculator Component */}
        <BodyTypeCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Ectomorph</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-400 mb-2">Lean & Linear</div>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Naturally lean with a narrow frame, fast metabolism, and difficulty gaining weight. 
                Ectomorphs typically have low body fat and may struggle to build muscle mass.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-300">Characteristics:</h4>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Narrow shoulders and hips</li>
                  <li>• Small bone structure</li>
                  <li>• Fast metabolism</li>
                  <li>• Low body fat naturally</li>
                  <li>• Difficulty gaining weight</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Mesomorph</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-400 mb-2">Athletic & Muscular</div>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Naturally muscular with an athletic build, moderate metabolism, and the ability to 
                gain muscle and lose fat relatively easily with proper training and nutrition.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-green-300">Characteristics:</h4>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Broad shoulders, narrow waist</li>
                  <li>• Medium bone structure</li>
                  <li>• Naturally muscular</li>
                  <li>• Moderate metabolism</li>
                  <li>• Responds well to exercise</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Endomorph</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-400 mb-2">Soft & Round</div>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Naturally higher body fat with a rounder, softer physique and slower metabolism. 
                Endomorphs gain weight easily but may struggle with fat loss.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-orange-300">Characteristics:</h4>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Wider hips and shoulders</li>
                  <li>• Larger bone structure</li>
                  <li>• Higher body fat tendency</li>
                  <li>• Slower metabolism</li>
                  <li>• Gains weight easily</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Heath-Carter Method */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Heath-Carter Somatotype Method</h3>
            <p className="text-gray-300 mb-6">
              The Heath-Carter method is the gold standard for scientific body type classification. Unlike simple 
              categorization, this method provides numerical scores for each somatotype component, giving you a 
              detailed understanding of your body composition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">Measurement-Based Assessment</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="font-medium text-white mb-1">Anthropometric Data</div>
                    <div className="text-gray-400">Height, weight, and body measurements</div>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="font-medium text-white mb-1">BMI Integration</div>
                    <div className="text-gray-400">Body mass index for initial classification</div>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                    <div className="font-medium text-white mb-1">Ratio Analysis</div>
                    <div className="text-gray-400">Wrist size, shoulder-to-waist, hip-to-waist ratios</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Scientific Applications</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-white mb-1">Sports Science</div>
                    <div className="text-gray-400">Athletic performance and talent identification</div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-white mb-1">Medical Research</div>
                    <div className="text-gray-400">Health risk assessment and population studies</div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-white mb-1">Fitness Planning</div>
                    <div className="text-gray-400">Personalized training and nutrition programs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training and Nutrition by Body Type */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Training & Nutrition by Body Type</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Ectomorph Strategy</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">Training Focus</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Heavy compound movements</li>
                      <li>• Limited cardio</li>
                      <li>• Longer rest periods</li>
                      <li>• 3-4 training days per week</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">Nutrition</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Higher caloric intake</li>
                      <li>• More carbohydrates</li>
                      <li>• Frequent meals</li>
                      <li>• Healthy fats included</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <h4 className="text-lg font-semibold text-green-300 mb-3">Mesomorph Strategy</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">Training Focus</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Balanced approach</li>
                      <li>• Mix of strength and cardio</li>
                      <li>• Variety in exercises</li>
                      <li>• 4-5 training days per week</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">Nutrition</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Balanced macronutrients</li>
                      <li>• Moderate carbohydrates</li>
                      <li>• Adequate protein</li>
                      <li>• Flexible meal timing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800/50">
                <h4 className="text-lg font-semibold text-orange-300 mb-3">Endomorph Strategy</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">Training Focus</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Higher training frequency</li>
                      <li>• Emphasis on cardio</li>
                      <li>• Circuit training</li>
                      <li>• 5-6 training days per week</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">Nutrition</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Lower carbohydrate intake</li>
                      <li>• Higher protein ratio</li>
                      <li>• Nutrient timing important</li>
                      <li>• Avoid processed foods</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <h5 className="text-sm font-semibold text-yellow-300 mb-2">Remember</h5>
              <p className="text-xs text-gray-400">
                Most people are combinations of body types (e.g., ecto-mesomorph, meso-endomorph). 
                Use these guidelines as starting points and adjust based on your individual response 
                to training and nutrition. Consistency and patience are key regardless of body type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyTypeCalculatorPage;