import React from "react";
import OneRepMaxCalculator from "../components/OneRepMaxCalculator";

const OneRepMaxCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Advanced One Rep Max Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your one-rep maximum using 7 proven formulas. Get training zones, rep ranges, and progressive overload recommendations for optimal strength gains.
          </p>
        </div>

        {/* Calculator Component */}
        <OneRepMaxCalculator />

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-900/30 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">About Our Advanced One Rep Max Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Our one rep max (1RM) calculator uses seven scientifically-validated formulas to provide the most 
                accurate estimation of your maximum strength. Whether you're a beginner or advanced lifter, this 
                tool helps you plan training loads, track progress, and optimize your strength training program.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Included Formulas:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Epley Formula:</strong> Most popular and accurate for 1-10 reps</li>
                <li><strong>Brzycki Formula:</strong> Excellent for lower rep ranges (2-10 reps)</li>
                <li><strong>Lander Formula:</strong> Conservative estimates, good for 2-10 reps</li>
                <li><strong>Lombardi Formula:</strong> Effective for higher rep ranges (1-15 reps)</li>
                <li><strong>Mayhew Formula:</strong> Research-based, good for 1-15 reps</li>
                <li><strong>O'Conner Formula:</strong> Conservative approach for 1-15 reps</li>
                <li><strong>Wathan Formula:</strong> Scientific approach for 1-15 reps</li>
              </ul>

              <h3 className="text-xl font-semibold text-White mt-6 mb-4">Training Zones Explained:</h3>
              <div className="space-y-3 text-gray-300">
                <div className="p-3 bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <strong className="text-blue-300">Strength Endurance (50-65%):</strong> 12-20+ reps. Builds muscular endurance and promotes recovery.
                </div>
                <div className="p-3 bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <strong className="text-green-300">Hypertrophy (65-80%):</strong> 6-12 reps. Optimal range for muscle growth and size gains.
                </div>
                <div className="p-3 bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <strong className="text-orange-300">Strength (80-90%):</strong> 3-6 reps. Builds maximum strength and power.
                </div>
                <div className="p-3 bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <strong className="text-red-300">Power/Max Strength (90-100%):</strong> 1-3 reps. Peak strength and neural adaptations.
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">How to Use Safely:</h3>
              <ol className="text-gray-300 space-y-2">
                <li><strong>Proper Warm-up:</strong> Always warm up thoroughly before testing</li>
                <li><strong>Use Spotters:</strong> Have experienced spotters for safety, especially on bench press</li>
                <li><strong>Progressive Testing:</strong> Build up to your max over several weeks</li>
                <li><strong>Proper Form:</strong> Maintain strict form even at maximum weights</li>
                <li><strong>Rest Adequately:</strong> Allow full recovery between maximum attempts</li>
              </ol>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Progressive Overload Principles:</h3>
              <p className="text-gray-300 mb-4">
                Progressive overload is the gradual increase of stress placed on the body during exercise. Our calculator 
                provides specific recommendations for increasing weight, reps, or volume to ensure continuous progress 
                while minimizing injury risk.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Supported Exercises:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <ul className="space-y-1">
                  <li>• Bench Press</li>
                  <li>• Squat</li>
                  <li>• Deadlift</li>
                  <li>• Overhead Press</li>
                  <li>• Barbell Row</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Incline Bench Press</li>
                  <li>• Dumbbell Press</li>
                  <li>• Leg Press</li>
                  <li>• Weighted Pull-ups</li>
                  <li>• Weighted Dips</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Accuracy Guidelines:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Best Accuracy:</strong> Use 1-10 reps for most accurate results</li>
                <li><strong>Rep Range Limit:</strong> Maximum 15 reps for reliable estimates</li>
                <li><strong>Exercise Selection:</strong> Choose compound movements for best results</li>
                <li><strong>Consistent Technique:</strong> Use the same form and range of motion</li>
                <li><strong>Training State:</strong> Test when fresh, not fatigued</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Training Applications:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Program Design:</strong> Set appropriate training loads for different goals</li>
                <li><strong>Progress Tracking:</strong> Monitor strength gains over time</li>
                <li><strong>Competition Prep:</strong> Plan attempt selection for powerlifting meets</li>
                <li><strong>Periodization:</strong> Adjust training intensity throughout mesocycles</li>
                <li><strong>Goal Setting:</strong> Set realistic short-term and long-term strength targets</li>
              </ul>

              <div className="bg-yellow-900/20 border border-yellow-800/30 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-yellow-300 mb-2">Safety Notice:</h4>
                <p className="text-sm text-gray-300">
                  Always prioritize safety when testing maximum strength. Use proper spotters, maintain correct form, 
                  and progress gradually. Consult with a qualified trainer if you're new to maximum strength testing. 
                  These calculations are estimates and individual results may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneRepMaxCalculatorPage;