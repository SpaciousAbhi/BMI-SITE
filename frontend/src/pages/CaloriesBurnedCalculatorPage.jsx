import React, { useEffect } from "react";
import CaloriesBurnedCalculator from "../components/CaloriesBurnedCalculator";

const CaloriesBurnedCalculatorPage = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Advanced Calories Burned Calculator",
      "description": "Calculate precise calorie expenditure with advanced MET values, body composition factors, and personalized recommendations.",
      "url": "https://bmipro.netlify.app/calories-burned-calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "BMI Pro",
        "url": "https://bmipro.netlify.app"
      },
      "featureList": [
        "Advanced MET value calculations",
        "Body composition adjustments",
        "12+ exercise activities supported",
        "Intensity-specific calculations",
        "Fat burn analysis",
        "Personalized recommendations"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.text.includes('Calories Burned Calculator')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Page Header - Enhanced for mobile */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent px-2">
            Advanced Calories Burned Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-3">
            Calculate precise calorie expenditure with advanced MET values, body composition factors, and personalized recommendations for optimal fitness results.
          </p>
        </div>

        {/* Calculator Component */}
        <CaloriesBurnedCalculator />

        {/* Enhanced SEO Content Section */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto space-y-8 sm:space-y-12">
          
          {/* FAQ Section for Featured Snippets */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How accurate are MET values for calorie calculation?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  MET (Metabolic Equivalent of Task) values are scientifically validated and provide accuracy within 10-15% for most individuals. Our calculator uses research-based MET values from the Compendium of Physical Activities, making it one of the most accurate methods available for estimating calorie burn.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What factors affect calorie burn during exercise?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Calorie burn is influenced by body weight, exercise intensity, duration, age, gender, body composition, and fitness level. Our advanced calculator considers all these factors, including optional body fat percentage, for the most personalized and accurate results.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How many calories should I burn per workout?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  For general health, aim to burn 200-300 calories per workout session. For weight loss, target 300-500 calories per session, 4-5 times per week. Our calculator provides personalized recommendations based on your goals and current fitness level.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What's the difference between total calories and fat calories?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Total calories represent all energy expended during exercise, while fat calories specifically indicate energy derived from fat stores. Lower intensity exercises typically burn a higher percentage of calories from fat (40-50%), while higher intensity exercises burn more total calories but rely more on carbohydrates.
                </p>
              </div>
            </div>
          </div>

          {/* Main SEO Content */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About Our Advanced Calories Burned Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our calories burned calculator uses scientifically-validated MET (Metabolic Equivalent of Task) values 
                and advanced formulas to provide the most accurate calorie expenditure estimates. Unlike basic calculators, 
                we factor in body composition, age, gender, and fitness level for truly personalized results.
              </p>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Advanced Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li><strong>Comprehensive Exercise Database:</strong> Over 12 activities with intensity-specific MET values</li>
                  <li><strong>Body Composition Factors:</strong> Optional body fat percentage for enhanced accuracy</li>
                  <li><strong>Age and Gender Adjustments:</strong> Metabolic corrections based on demographics</li>
                </ul>
                <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li><strong>Intensity Levels:</strong> Four intensity levels with detailed descriptions</li>
                  <li><strong>Fat Burning Analysis:</strong> Separate calculation for calories burned from fat</li>
                  <li><strong>Personalized Recommendations:</strong> Tailored advice based on your results</li>
                </ul>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Understanding MET Values:</h3>
              <div className="bg-orange-900/20 border border-orange-800/30 p-4 sm:p-6 rounded-lg mb-6">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  MET (Metabolic Equivalent of Task) represents the energy cost of physical activities as a multiple of 
                  resting metabolic rate. One MET equals the energy expended at rest (approximately 1 calorie per kg of body weight per hour). 
                  Our calculator uses research-based MET values from the Compendium of Physical Activities for maximum accuracy.
                </p>
                <h4 className="text-lg font-semibold text-orange-300 mb-3">MET Value Examples:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <ul className="text-gray-300 space-y-1">
                    <li>• Light Walking (2 mph): 2.5 METs</li>
                    <li>• Moderate Cycling: 8.0 METs</li>
                    <li>• Running (6 mph): 8.3 METs</li>
                    <li>• Swimming: 6.0-13.8 METs</li>
                  </ul>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Weight Lifting: 3.0-8.0 METs</li>
                    <li>• Basketball: 4.5-10.0 METs</li>
                    <li>• Yoga: 2.5-5.0 METs</li>
                    <li>• Tennis: 5.0-10.0 METs</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Supported Activities:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Cardio Activities</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Running (various paces)</li>
                    <li>• Cycling (road and stationary)</li>
                    <li>• Swimming (all strokes)</li>
                    <li>• Walking (different speeds)</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Strength & Sports</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Weight lifting (all intensities)</li>
                    <li>• Basketball (recreational to competitive)</li>
                    <li>• Tennis (singles and doubles)</li>
                    <li>• Soccer (casual to competitive)</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Flexibility & Other</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Yoga (gentle to power yoga)</li>
                    <li>• Dancing (social to aerobic)</li>
                    <li>• Rowing (machine and water)</li>
                    <li>• Hiking (flat to mountain)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">How to Get Accurate Results:</h3>
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg mb-6">
                <ol className="text-gray-300 space-y-3 text-sm sm:text-base">
                  <li><strong>1. Accurate Weight:</strong> Use your current body weight for precise calculations. Weight is the most important factor in calorie burn estimation.</li>
                  <li><strong>2. Honest Intensity Assessment:</strong> Select the intensity level that matches your actual effort during the activity, not your intended effort.</li>
                  <li><strong>3. Precise Duration:</strong> Include warm-up and cool-down in your total time for comprehensive calorie tracking.</li>
                  <li><strong>4. Optional Advanced Details:</strong> Add body fat percentage, age, and gender for enhanced accuracy through body composition analysis.</li>
                </ol>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Fat Burning Zone Analysis:</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our calculator estimates the percentage of calories burned from fat based on exercise intensity. This feature helps you optimize 
                your workouts for specific goals. Lower intensity activities typically burn a higher percentage of calories from fat (40-50%), 
                while higher intensities burn more total calories but rely more on carbohydrates for fuel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-800/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Fat Burning Benefits</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Improves fat oxidation efficiency</li>
                    <li>• Enhances metabolic flexibility</li>
                    <li>• Supports long-term weight management</li>
                    <li>• Builds aerobic fitness base</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 border border-blue-800/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">High-Intensity Benefits</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Burns more total calories per minute</li>
                    <li>• Increases post-exercise calorie burn</li>
                    <li>• Improves cardiovascular fitness</li>
                    <li>• Time-efficient for busy schedules</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/pace-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-blue-400 mb-2">Pace Calculator</h4>
                  <p className="text-gray-300 text-sm">Calculate running pace and get race predictions with VDOT analysis.</p>
                </a>
                <a href="/target-heart-rate-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-red-400 mb-2">Target Heart Rate Calculator</h4>
                  <p className="text-gray-300 text-sm">Find your optimal heart rate zones for different training intensities.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesBurnedCalculatorPage;