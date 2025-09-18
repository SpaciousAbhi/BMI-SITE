import React from "react";
import CaloriesBurnedCalculator from "../components/CaloriesBurnedCalculator";

const CaloriesBurnedCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Advanced Calories Burned Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate precise calorie expenditure with advanced MET values, body composition factors, and personalized recommendations for optimal fitness results.
          </p>
        </div>

        {/* Calculator Component */}
        <CaloriesBurnedCalculator />

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-900/30 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">About Our Advanced Calories Burned Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Our calories burned calculator uses scientifically-validated MET (Metabolic Equivalent of Task) values 
                and advanced formulas to provide the most accurate calorie expenditure estimates. Unlike basic calculators, 
                we factor in body composition, age, gender, and fitness level for personalized results.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Advanced Features:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Comprehensive Exercise Database:</strong> Over 12 activities with intensity-specific MET values</li>
                <li><strong>Body Composition Factors:</strong> Optional body fat percentage for enhanced accuracy</li>
                <li><strong>Age and Gender Adjustments:</strong> Metabolic corrections based on demographics</li>
                <li><strong>Intensity Levels:</strong> Four intensity levels with detailed descriptions</li>
                <li><strong>Fat Burning Analysis:</strong> Separate calculation for calories burned from fat</li>
                <li><strong>Personalized Recommendations:</strong> Tailored advice based on your results</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Understanding MET Values:</h3>
              <p className="text-gray-300 mb-4">
                MET (Metabolic Equivalent of Task) represents the energy cost of physical activities as a multiple of 
                resting metabolic rate. One MET equals the energy expended at rest. Our calculator uses research-based 
                MET values from the Compendium of Physical Activities for maximum accuracy.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Supported Activities:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <ul className="space-y-1">
                  <li>• Running (various paces)</li>
                  <li>• Cycling (road and stationary)</li>
                  <li>• Swimming (all strokes)</li>
                  <li>• Walking (different speeds)</li>
                  <li>• Weight lifting (all intensities)</li>
                  <li>• Basketball (recreational to competitive)</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Tennis (singles and doubles)</li>
                  <li>• Yoga (gentle to power yoga)</li>
                  <li>• Dancing (social to aerobic)</li>
                  <li>• Rowing (machine and water)</li>
                  <li>• Hiking (flat to mountain)</li>
                  <li>• Soccer (casual to competitive)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">How to Get Accurate Results:</h3>
              <ol className="text-gray-300 space-y-2">
                <li><strong>Accurate Weight:</strong> Use your current body weight for precise calculations</li>
                <li><strong>Honest Intensity:</strong> Select the intensity level that matches your actual effort</li>
                <li><strong>Precise Duration:</strong> Include warm-up and cool-down in your total time</li>
                <li><strong>Optional Details:</strong> Add body fat percentage, age, and gender for enhanced accuracy</li>
              </ol>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Fat Burning Zone:</h3>
              <p className="text-gray-300 mb-4">
                Our calculator estimates the percentage of calories burned from fat based on exercise intensity. 
                Lower intensity activities typically burn a higher percentage of calories from fat, while higher 
                intensities burn more total calories but rely more on carbohydrates for fuel.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-4">Applications:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Weight Management:</strong> Track calorie expenditure for weight loss or maintenance goals</li>
                <li><strong>Training Planning:</strong> Plan workouts based on calorie burn targets</li>
                <li><strong>Nutrition Planning:</strong> Balance calorie intake with exercise expenditure</li>
                <li><strong>Fitness Tracking:</strong> Monitor progress and workout efficiency over time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesBurnedCalculatorPage;