import React from "react";
import PaceCalculator from "../components/PaceCalculator";

const PaceCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Advanced Pace Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate running pace, time, or distance with precision. Get race predictions, splits, and VDOT analysis for serious runners and fitness enthusiasts.
          </p>
        </div>

        {/* Calculator Component */}
        <PaceCalculator />

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-900/30 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">About Our Advanced Pace Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Our advanced pace calculator goes beyond basic pace calculations to provide comprehensive running analysis. 
                Whether you're training for a 5K, marathon, or just want to track your fitness progress, this tool provides 
                accurate calculations using proven scientific methods.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Key Features:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Multiple Distance Units:</strong> Calculate with kilometers, miles, meters, or yards</li>
                <li><strong>Flexible Time Formats:</strong> Input time in hours, minutes, and seconds</li>
                <li><strong>Race Predictions:</strong> Get predicted times for 5K, 10K, half marathon, and marathon using VDOT analysis</li>
                <li><strong>Split Calculations:</strong> Instant split times for common race distances</li>
                <li><strong>Speed Conversions:</strong> See your pace in km/h, mph, and various pace formats</li>
                <li><strong>VDOT Analysis:</strong> Scientific assessment of your running fitness level</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">How to Use:</h3>
              <ol className="text-gray-300 space-y-2">
                <li><strong>Select Mode:</strong> Choose whether to calculate pace, time, or distance</li>
                <li><strong>Enter Known Values:</strong> Input the distance and time, or pace as required</li>
                <li><strong>Get Results:</strong> View detailed results including splits and race predictions</li>
                <li><strong>Plan Training:</strong> Use the VDOT predictions to set realistic training goals</li>
              </ol>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Understanding VDOT:</h3>
              <p className="text-gray-300 mb-4">
                VDOT is a running fitness metric developed by renowned coach Jack Daniels. It represents your current 
                running fitness level and allows for accurate race time predictions across different distances. Our 
                calculator uses the official VDOT formula to provide scientific-based predictions for your training.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Training Applications:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Race Planning:</strong> Set realistic goals for upcoming races</li>
                <li><strong>Training Paces:</strong> Determine appropriate paces for different workout types</li>
                <li><strong>Progress Tracking:</strong> Monitor fitness improvements over time</li>
                <li><strong>Race Strategy:</strong> Plan pacing strategies for optimal performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaceCalculatorPage;