import React from "react";
import TargetHeartRateCalculator from "../components/TargetHeartRateCalculator";

const TargetHeartRateCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Advanced Target Heart Rate Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate precise training zones using Karvonen method with resting heart rate. Get personalized training plans and zone-specific recommendations for optimal cardio training.
          </p>
        </div>

        {/* Calculator Component */}
        <TargetHeartRateCalculator />

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-900/30 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">About Our Advanced Target Heart Rate Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Our target heart rate calculator uses the scientifically-validated Karvonen method, which incorporates 
                your resting heart rate for more accurate and personalized training zones. Whether you're a beginner 
                or elite athlete, this tool provides precise heart rate targets for optimal training effectiveness.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Calculation Methods:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Karvonen Method (Recommended):</strong> Uses resting heart rate for personalized accuracy</li>
                <li><strong>Simple Percentage Method:</strong> Basic percentage-based calculations</li>
                <li><strong>Tanaka Formula:</strong> Age-adjusted maximum heart rate formula</li>
                <li><strong>Gender-Specific Formulas:</strong> Separate calculations for male and female physiology</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Five Training Zones Explained:</h3>
              <div className="space-y-3 text-gray-300">
                <div className="p-3 bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <strong className="text-blue-300">Zone 1 - Active Recovery (50-60%):</strong> Very light activity that promotes recovery and increases blood flow. Perfect for rest days and warm-ups.
                </div>
                <div className="p-3 bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <strong className="text-green-300">Zone 2 - Base/Aerobic (60-70%):</strong> Comfortable pace that builds aerobic base and burns fat efficiently. Foundation of endurance training.
                </div>
                <div className="p-3 bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <strong className="text-yellow-300">Zone 3 - Aerobic Threshold (70-80%):</strong> Moderate intensity that improves cardiovascular efficiency while remaining sustainable.
                </div>
                <div className="p-3 bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <strong className="text-orange-300">Zone 4 - Lactate Threshold (80-90%):</strong> Hard effort that improves lactate buffering and race pace endurance.
                </div>
                <div className="p-3 bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <strong className="text-red-300">Zone 5 - VO2 Max/Anaerobic (90-100%):</strong> Maximum sustainable effort that improves VO2 max and anaerobic power.
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">How to Measure Resting Heart Rate:</h3>
              <ol className="text-gray-300 space-y-2">
                <li><strong>Best Time:</strong> Measure first thing in the morning, before getting out of bed</li>
                <li><strong>Consistent Position:</strong> Lie down or sit quietly for 5 minutes</li>
                <li><strong>Measurement Method:</strong> Use a heart rate monitor or count pulse for 60 seconds</li>
                <li><strong>Multiple Readings:</strong> Take measurements for 3-5 consecutive days and average</li>
                <li><strong>Avoid After:</strong> Caffeine, alcohol, stress, or intense exercise from previous day</li>
              </ol>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Training Applications by Zone:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Fat Burning (Zones 1-2):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 60-70% of calories from fat</li>
                    <li>• Improves fat oxidation</li>
                    <li>• Builds aerobic base</li>
                    <li>• Low stress on body</li>
                    <li>• Can be sustained for hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Performance (Zones 4-5):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Improves race performance</li>
                    <li>• Increases VO2 max</li>
                    <li>• Enhances lactate clearance</li>
                    <li>• High stress, requires recovery</li>
                    <li>• Used sparingly in training</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Fitness Level Considerations:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Beginner:</strong> Focus 80% of training in zones 1-2, gradually add zone 3</li>
                <li><strong>Intermediate:</strong> 70% zones 1-2, 20% zone 3, 10% zones 4-5</li>
                <li><strong>Advanced:</strong> Can handle more zone 4-5 work with proper periodization</li>
                <li><strong>Elite Athletes:</strong> Use specific periodization based on competition calendar</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Age-Related Adjustments:</h3>
              <p className="text-gray-300 mb-4">
                Maximum heart rate naturally decreases with age at approximately 1 beat per year after age 25. 
                Our calculator accounts for this using proven age-prediction formulas. However, individual 
                variation can be significant, so use these as starting points and adjust based on your response.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Weekly Training Distribution:</h3>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Recommended Weekly Structure:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• <strong>80% Easy (Zones 1-2):</strong> Base building and recovery</li>
                  <li>• <strong>15% Moderate (Zone 3):</strong> Aerobic development</li>
                  <li>• <strong>5% Hard (Zones 4-5):</strong> High-intensity training</li>
                </ul>
                <p className="text-xs text-gray-400 mt-2">
                  This 80/15/5 distribution is based on elite endurance athlete training patterns and research.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Common Mistakes to Avoid:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Too Much Intensity:</strong> Spending too much time in zones 3-4 (the "gray zone")</li>
                <li><strong>Ignoring Recovery:</strong> Not enough time in zone 1 for active recovery</li>
                <li><strong>Inconsistent Measurement:</strong> Using different measurement methods or times</li>
                <li><strong>Rigid Adherence:</strong> Not adjusting for individual response and feel</li>
                <li><strong>Neglecting RPE:</strong> Not considering Rate of Perceived Exertion alongside heart rate</li>
              </ul>

              <div className="bg-red-900/20 border border-red-800/30 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-red-300 mb-2">Important Medical Notice:</h4>
                <p className="text-sm text-gray-300">
                  Consult with a healthcare provider before beginning any intensive exercise program, especially if you 
                  have cardiovascular conditions, take medications that affect heart rate, or have been sedentary. 
                  Heart rate zones are guidelines - always listen to your body and adjust accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetHeartRateCalculatorPage;