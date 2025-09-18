import React from "react";
import BodySurfaceAreaCalculator from "../components/BodySurfaceAreaCalculator";

const BodySurfaceAreaCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Body Surface Area Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your body surface area (BSA) using validated medical formulas including Du Bois, Mosteller, 
            Haycock, and Gehan & George methods. Essential for medical dosing, cardiac assessments, and metabolic calculations.
          </p>
        </div>

        {/* Calculator Component */}
        <BodySurfaceAreaCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">What is Body Surface Area?</h3>
              <p className="text-gray-300 mb-4">
                Body Surface Area (BSA) is the measured or calculated surface area of the human body. 
                It's expressed in square meters (m²) and is used extensively in medical practice for 
                dosing medications, assessing cardiac function, and normalizing physiological measurements.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Measured in square meters (m²)</li>
                <li>• Average adult: 1.7-2.0 m²</li>
                <li>• Correlates with metabolic rate</li>
                <li>• Essential for medical calculations</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Clinical Applications</h3>
              <p className="text-gray-300 mb-4">
                BSA is crucial in clinical medicine for standardizing measurements and dosing across 
                different body sizes. It provides a more accurate basis than weight alone for many 
                medical calculations and assessments.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Chemotherapy dosing</li>
                <li>• Cardiac index calculations</li>
                <li>• Burn assessment (Rule of Nines)</li>
                <li>• Metabolic rate estimation</li>
              </ul>
            </div>
          </div>

          {/* Formula Comparison */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">BSA Formula Comparison</h3>
            <p className="text-gray-300 mb-6">
              Different formulas have been developed over the years, each with specific advantages for 
              certain populations or applications. Understanding these differences helps in choosing 
              the most appropriate method for your needs.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-cyan-300">Classic Formulas</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-800/30">
                    <div className="font-medium text-white mb-2">Du Bois & Du Bois (1916)</div>
                    <div className="text-gray-400 mb-2">The original and most widely used formula</div>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Gold standard for over 100 years</li>
                      <li>• Most validated in clinical practice</li>
                      <li>• Standard for chemotherapy dosing</li>
                      <li>• Best overall accuracy</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-white mb-2">Mosteller (1987)</div>
                    <div className="text-gray-400 mb-2">Simple square root formula</div>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Easy mental calculation</li>
                      <li>• Excellent accuracy</li>
                      <li>• Popular in emergency medicine</li>
                      <li>• Good for quick estimates</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Specialized Formulas</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <div className="font-medium text-white mb-2">Haycock (1978)</div>
                    <div className="text-gray-400 mb-2">Optimized for pediatric populations</div>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Best for infants and children</li>
                      <li>• Validated across age ranges</li>
                      <li>• Pediatric medicine standard</li>
                      <li>• Growth assessment tool</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
                    <div className="font-medium text-white mb-2">Gehan & George (1970)</div>
                    <div className="text-gray-400 mb-2">General population studies</div>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Research applications</li>
                      <li>• Population-based validation</li>
                      <li>• Statistical analyses</li>
                      <li>• Epidemiological studies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Applications Detail */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Medical Applications in Detail</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-800/50">
                <h4 className="text-lg font-semibold text-red-300 mb-3">Chemotherapy Dosing</h4>
                <p className="text-gray-400 text-sm mb-3">
                  BSA-based dosing reduces toxicity while maintaining efficacy across different body sizes.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Standardizes drug concentrations</li>
                  <li>• Reduces toxicity risk</li>
                  <li>• Improves treatment outcomes</li>
                  <li>• International standard protocol</li>
                </ul>
              </div>

              <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                <h4 className="text-lg font-semibold text-green-300 mb-3">Cardiac Assessment</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Cardiac index (CI = Cardiac Output ÷ BSA) normalizes heart function measurements.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Normal CI: 2.5-4.0 L/min/m²</li>
                  <li>• Accounts for body size differences</li>
                  <li>• Critical care monitoring</li>
                  <li>• Heart failure assessment</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Metabolic Calculations</h4>
                <p className="text-gray-400 text-sm mb-3">
                  BSA correlates strongly with basal metabolic rate and energy expenditure.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Basal metabolic rate estimation</li>
                  <li>• Nutritional requirements</li>
                  <li>• Heat loss calculations</li>
                  <li>• Fluid balance assessments</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <h5 className="text-sm font-semibold text-yellow-300 mb-2">Important Medical Note</h5>
              <p className="text-xs text-gray-400">
                BSA calculations are for reference purposes only. All medical applications, especially drug dosing and 
                clinical assessments, must be performed by qualified healthcare professionals. Individual patient factors, 
                medical history, and current condition must always be considered alongside BSA calculations.
              </p>
            </div>
          </div>

          {/* Normal BSA Ranges */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Normal BSA Ranges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-cyan-300">Adults</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="text-gray-400 font-medium">Category</span>
                    <span className="text-white font-medium">BSA Range (m²)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Small Adult</span>
                    <span className="text-white">1.4 - 1.6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Adult</span>
                    <span className="text-white">1.6 - 2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Large Adult</span>
                    <span className="text-white">2.0 - 2.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Very Large Adult</span>
                    <span className="text-white">2.4+</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Children & Adolescents</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="text-gray-400 font-medium">Age Group</span>
                    <span className="text-white font-medium">Typical BSA (m²)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Newborn</span>
                    <span className="text-white">0.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">1 Year</span>
                    <span className="text-white">0.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">5 Years</span>
                    <span className="text-white">0.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">10 Years</span>
                    <span className="text-white">1.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">15 Years</span>
                    <span className="text-white">1.5</span>
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

export default BodySurfaceAreaCalculatorPage;