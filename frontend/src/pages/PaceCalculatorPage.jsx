import React, { useEffect } from "react";
import PaceCalculator from "../components/PaceCalculator";

const PaceCalculatorPage = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Advanced Pace Calculator",
      "description": "Calculate running pace, time, or distance with precision. Get race predictions, splits, and VDOT analysis for serious runners.",
      "url": "https://bmipro.netlify.app/pace-calculator",
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
        "Multiple calculation modes (pace, time, distance)",
        "VDOT analysis for running fitness",
        "Race time predictions",
        "Split time calculations",
        "Multiple distance units support",
        "Professional training insights"
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
        if (script.text.includes('Pace Calculator')) {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent px-2">
            Advanced Pace Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-3">
            Calculate running pace, time, or distance with precision. Get race predictions, splits, and VDOT analysis for serious runners and fitness enthusiasts.
          </p>
        </div>

        {/* Calculator Component */}
        <PaceCalculator />

        {/* Enhanced SEO Content Section */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto space-y-8 sm:space-y-12">
          
          {/* FAQ Section for Featured Snippets */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How accurate is the pace calculator?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Our pace calculator is highly accurate for distances and times commonly used in running. It uses precise mathematical formulas and includes VDOT analysis based on Jack Daniels' proven methodology, providing accuracy within 1-2% for most runners.
                </p>
              </div>
              
              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What is VDOT and how is it calculated?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  VDOT is a running fitness metric developed by renowned coach Jack Daniels. It represents your current running fitness level based on your race performance and allows for accurate predictions across different distances. Our calculator uses the official VDOT formula to assess your running capacity.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Can I use this for marathon training?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Absolutely! The pace calculator is perfect for marathon training. It provides race predictions for 5K, 10K, half marathon, and full marathon distances, helping you set realistic goals and plan your training paces for different workout types.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What distance units are supported?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Our calculator supports kilometers, miles, meters, and yards. You can easily switch between units to match your training preferences or race requirements. All calculations maintain precision across different unit systems.
                </p>
              </div>
            </div>
          </div>

          {/* Main SEO Content */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About Our Advanced Pace Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our advanced pace calculator goes beyond basic pace calculations to provide comprehensive running analysis. 
                Whether you're training for a 5K, marathon, or just want to track your fitness progress, this tool provides 
                accurate calculations using proven scientific methods developed by world-class running coaches.
              </p>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Key Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li><strong>Multiple Distance Units:</strong> Calculate with kilometers, miles, meters, or yards</li>
                  <li><strong>Flexible Time Formats:</strong> Input time in hours, minutes, and seconds</li>
                  <li><strong>Race Predictions:</strong> Get predicted times for 5K, 10K, half marathon, and marathon</li>
                </ul>
                <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li><strong>Split Calculations:</strong> Instant split times for common race distances</li>
                  <li><strong>Speed Conversions:</strong> See your pace in km/h, mph, and various pace formats</li>
                  <li><strong>VDOT Analysis:</strong> Scientific assessment of your running fitness level</li>
                </ul>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">How to Use the Pace Calculator:</h3>
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg mb-6">
                <ol className="text-gray-300 space-y-3 text-sm sm:text-base">
                  <li><strong>1. Select Calculation Mode:</strong> Choose whether to calculate pace, time, or distance based on what information you have available.</li>
                  <li><strong>2. Enter Known Values:</strong> Input the distance and time, or pace as required by your selected mode.</li>
                  <li><strong>3. Get Comprehensive Results:</strong> View detailed results including splits, race predictions, and VDOT analysis.</li>
                  <li><strong>4. Plan Your Training:</strong> Use the VDOT predictions and splits to set realistic training goals and race strategies.</li>
                </ol>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Understanding VDOT Running Fitness:</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                VDOT is a revolutionary running fitness metric developed by renowned coach Jack Daniels. It represents your current 
                running fitness level and allows for accurate race time predictions across different distances. Our calculator uses the 
                official VDOT formula to provide scientific-based predictions that have helped thousands of runners achieve their goals.
              </p>

              <div className="bg-blue-900/20 border border-blue-800/30 p-4 sm:p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">VDOT Benefits:</h4>
                <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li>• Accurate race time predictions for any distance</li>
                  <li>• Personalized training pace recommendations</li>
                  <li>• Objective measure of running fitness improvement</li>
                  <li>• Scientifically validated by exercise physiology research</li>
                </ul>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Training Applications:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Race Planning</h4>
                  <p className="text-gray-300 text-sm">Set realistic goals for upcoming races based on your current fitness level and race predictions.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Training Paces</h4>
                  <p className="text-gray-300 text-sm">Determine appropriate paces for different workout types including easy runs, tempo runs, and intervals.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Progress Tracking</h4>
                  <p className="text-gray-300 text-sm">Monitor fitness improvements over time by tracking changes in your VDOT score.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Race Strategy</h4>
                  <p className="text-gray-300 text-sm">Plan pacing strategies for optimal performance in races of any distance.</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calories-burned-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-orange-400 mb-2">Calories Burned Calculator</h4>
                  <p className="text-gray-300 text-sm">Calculate calories burned during your running sessions using advanced MET values.</p>
                </a>
                <a href="/target-heart-rate-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-red-400 mb-2">Target Heart Rate Calculator</h4>
                  <p className="text-gray-300 text-sm">Determine optimal heart rate zones for different training intensities.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaceCalculatorPage;