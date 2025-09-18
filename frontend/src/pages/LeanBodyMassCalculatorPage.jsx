import React from "react";
import LeanBodyMassCalculator from "../components/LeanBodyMassCalculator";

const LeanBodyMassCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Lean Body Mass Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your lean body mass and fat-free mass using validated medical formulas including Boer, James, and Hume methods. 
            Understand your body composition for health and fitness goals.
          </p>
        </div>

        {/* Calculator Component */}
        <LeanBodyMassCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">What is Lean Body Mass?</h3>
              <p className="text-gray-300 mb-4">
                Lean Body Mass (LBM) represents the weight of your body minus all fat tissue. It includes muscles, 
                bones, organs, skin, and all other non-fat tissues. LBM is a crucial metric for understanding 
                body composition and metabolic health.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Includes muscle, bone, organs, and water</li>
                <li>• Excludes adipose (fat) tissue</li>
                <li>• Key indicator of metabolic health</li>
                <li>• Important for fitness and nutrition planning</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Medical Formulas</h3>
              <p className="text-gray-300 mb-4">
                Our calculator uses three WHO/CDC referenced formulas developed by leading researchers. Each formula 
                has been validated through clinical studies and provides reliable estimates for different populations 
                and age groups.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Boer Formula: General population standard</li>
                <li>• James Formula: Modified approach</li>
                <li>• Hume Formula: Clinical applications</li>
                <li>• Direct body fat method for highest accuracy</li>
              </ul>
            </div>
          </div>

          {/* Fat-Free Mass Index Information */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Understanding Fat-Free Mass Index (FFMI)</h3>
            <p className="text-gray-300 mb-6">
              Fat-Free Mass Index (FFMI) normalizes lean body mass for height, similar to how BMI normalizes weight. 
              FFMI is particularly useful for assessing muscle mass and body composition beyond what BMI can reveal.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-300">FFMI Ranges - Men</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Below Average:</span>
                    <span className="text-white">Below 17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average:</span>
                    <span className="text-white">17-19</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Above Average:</span>
                    <span className="text-white">19-22</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Excellent:</span>
                    <span className="text-white">22-25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Elite/Natural Limit:</span>
                    <span className="text-white">25+</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">FFMI Ranges - Women</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Below Average:</span>
                    <span className="text-white">Below 14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average:</span>
                    <span className="text-white">14-16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Above Average:</span>
                    <span className="text-white">16-18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Excellent:</span>
                    <span className="text-white">18-20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Elite/Natural Limit:</span>
                    <span className="text-white">20+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">Clinical Applications</h5>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Medication dosing based on lean body mass</li>
                <li>• Nutritional requirements assessment</li>
                <li>• Athletic performance evaluation</li>
                <li>• Metabolic rate calculations</li>
                <li>• Body composition monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeanBodyMassCalculatorPage;