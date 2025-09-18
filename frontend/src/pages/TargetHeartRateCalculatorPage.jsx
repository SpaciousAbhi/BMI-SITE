import React, { useEffect } from "react";
import TargetHeartRateCalculator from "../components/TargetHeartRateCalculator";

const TargetHeartRateCalculatorPage = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Advanced Target Heart Rate Calculator",
      "description": "Calculate precise training zones using Karvonen method with resting heart rate. Get personalized training plans and zone-specific recommendations.",
      "url": "https://bmipro.netlify.app/target-heart-rate-calculator",
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
        "Karvonen method calculations",
        "Five training zone analysis",
        "Personalized weekly training plans",
        "Age and fitness level adjustments",
        "Multiple calculation methods",
        "Fat burning zone optimization"
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
        if (script.text.includes('Target Heart Rate Calculator')) {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent px-2">
            Advanced Target Heart Rate Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-3">
            Calculate precise training zones using Karvonen method with resting heart rate. Get personalized training plans and zone-specific recommendations for optimal cardio training.
          </p>
        </div>

        {/* Calculator Component */}
        <TargetHeartRateCalculator />

        {/* Enhanced SEO Content Section */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto space-y-8 sm:space-y-12">
          
          {/* FAQ Section for Featured Snippets */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What is the Karvonen method for heart rate?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  The Karvonen method uses your resting heart rate along with age to calculate more personalized and accurate training zones. It's considered superior to simple percentage methods because it accounts for individual fitness levels and provides more precise heart rate targets.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How do I measure my resting heart rate accurately?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Measure your resting heart rate first thing in the morning before getting out of bed. Use a heart rate monitor or count your pulse for 60 seconds. Take measurements for 3-5 consecutive days and use the average for the most accurate results.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What heart rate zone is best for fat burning?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  The fat burning zone is typically 60-70% of your maximum heart rate (Zone 2). At this intensity, your body burns the highest percentage of calories from fat (60-70%) and can sustain the activity for extended periods, making it ideal for fat loss and building aerobic fitness.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How much time should I spend in each heart rate zone?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Follow the 80/15/5 rule: 80% of training in easy zones (Zones 1-2), 15% in moderate intensity (Zone 3), and 5% in high intensity (Zones 4-5). This distribution, used by elite athletes, optimizes fitness gains while preventing overtraining.
                </p>
              </div>
            </div>
          </div>

          {/* Main SEO Content */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About Our Advanced Target Heart Rate Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our target heart rate calculator uses the scientifically-validated Karvonen method, which incorporates 
                your resting heart rate for more accurate and personalized training zones. Whether you're a beginner 
                or elite athlete, this tool provides precise heart rate targets for optimal training effectiveness and safety.
              </p>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Advanced Calculation Methods:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">Karvonen Method (Recommended)</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Uses resting heart rate for personalized accuracy. Formula: ((Max HR - Resting HR) × %Intensity) + Resting HR</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-300 mb-2">Age-Based Formulas</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Includes Tanaka, Gulati (women), and traditional 220-age formulas for different populations and accuracy needs.</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Five Training Zones Explained:</h3>
              <div className="space-y-4 text-gray-300 mb-6">
                <div className="p-4 bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <strong className="text-blue-300 text-lg">Zone 1 - Active Recovery (50-60%):</strong>
                  <p className="mt-2 text-sm sm:text-base">Very light activity that promotes recovery and increases blood flow. Perfect for rest days, warm-ups, and recovery sessions. Duration: 20-60 minutes.</p>
                  <p className="text-sm text-blue-200 mt-1">Activities: Easy walking, gentle yoga, light stretching</p>
                </div>
                <div className="p-4 bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <strong className="text-green-300 text-lg">Zone 2 - Base/Aerobic (60-70%):</strong>
                  <p className="mt-2 text-sm sm:text-base">Comfortable pace that builds aerobic base and burns fat efficiently. Foundation of endurance training and metabolic health. Duration: 30-90 minutes.</p>
                  <p className="text-sm text-green-200 mt-1">Activities: Brisk walking, easy cycling, light jogging</p>
                </div>
                <div className="p-4 bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <strong className="text-yellow-300 text-lg">Zone 3 - Aerobic Threshold (70-80%):</strong>
                  <p className="mt-2 text-sm sm:text-base">Moderate intensity that improves cardiovascular efficiency while remaining sustainable. Builds aerobic power and endurance. Duration: 20-60 minutes.</p>
                  <p className="text-sm text-yellow-200 mt-1">Activities: Moderate cycling, steady jogging, dancing</p>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <strong className="text-orange-300 text-lg">Zone 4 - Lactate Threshold (80-90%):</strong>
                  <p className="mt-2 text-sm sm:text-base">Hard effort that improves lactate buffering and race pace endurance. Develops the ability to sustain higher intensities. Duration: 10-40 minutes.</p>
                  <p className="text-sm text-orange-200 mt-1">Activities: Tempo runs, cycling intervals, competitive sports</p>
                </div>
                <div className="p-4 bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <strong className="text-red-300 text-lg">Zone 5 - VO2 Max/Anaerobic (90-100%):</strong>
                  <p className="mt-2 text-sm sm:text-base">Maximum sustainable effort that improves VO2 max and anaerobic power. Develops speed and maximum oxygen uptake. Duration: 5-15 minutes (intervals).</p>
                  <p className="text-sm text-red-200 mt-1">Activities: High-intensity intervals, sprints, max efforts</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">How to Measure Resting Heart Rate:</h3>
              <div className="bg-blue-900/20 border border-blue-800/30 p-4 sm:p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Step-by-Step Guide:</h4>
                <ol className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li><strong>1. Best Timing:</strong> Measure first thing in the morning, before getting out of bed, when you're most relaxed.</li>
                  <li><strong>2. Preparation:</strong> Lie still for 5 minutes to ensure you're completely at rest and calm.</li>
                  <li><strong>3. Measurement Method:</strong> Use a heart rate monitor for accuracy, or manually count your pulse for 60 seconds.</li>
                  <li><strong>4. Consistency:</strong> Take measurements at the same time for 3-5 consecutive days and calculate the average.</li>
                  <li><strong>5. Avoid After:</strong> Don't measure after caffeine, alcohol, stress, illness, or intense exercise from the previous day.</li>
                </ol>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Training Applications by Zone:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-3">Fat Burning Focus (Zones 1-2)</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 60-70% of calories burned from fat</li>
                    <li>• Improves fat oxidation efficiency</li>
                    <li>• Builds sustainable aerobic base</li>
                    <li>• Low stress on cardiovascular system</li>
                    <li>• Can be sustained for hours</li>
                    <li>• Ideal for weight management</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-3">Performance Focus (Zones 4-5)</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Improves race performance significantly</li>
                    <li>• Increases VO2 max and power output</li>
                    <li>• Enhances lactate clearance ability</li>
                    <li>• High physiological stress</li>
                    <li>• Requires adequate recovery</li>
                    <li>• Used sparingly in training (5-10%)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Fitness Level Training Recommendations:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Beginner/Poor Fitness</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• 80% in Zones 1-2 (recovery/base)</li>
                    <li>• 20% in Zone 3 (moderate)</li>
                    <li>• Avoid Zones 4-5 initially</li>
                    <li>• Focus on building aerobic base</li>
                    <li>• Gradual progression over 4-6 weeks</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Intermediate/Average</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• 70% in Zones 1-2 (base building)</li>
                    <li>• 20% in Zone 3 (moderate intensity)</li>
                    <li>• 10% in Zones 4-5 (high intensity)</li>
                    <li>• Balanced training approach</li>
                    <li>• Can handle more variety</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Advanced/Excellent</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• 65% in Zones 1-2 (active recovery)</li>
                    <li>• 20% in Zone 3 (tempo work)</li>
                    <li>• 15% in Zones 4-5 (high intensity)</li>
                    <li>• Periodized training approach</li>
                    <li>• Peak performance optimization</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Age-Related Heart Rate Adjustments:</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Maximum heart rate naturally decreases with age at approximately 0.7-1 beat per year after age 25. 
                Our calculator accounts for this using proven age-prediction formulas including the Tanaka formula (more accurate than 220-age) 
                and gender-specific formulas. However, individual variation can be significant (±10-15 bpm), so use these as starting points.
              </p>

              <div className="bg-yellow-900/20 border border-yellow-800/30 p-4 sm:p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-yellow-300 mb-3">Age-Specific Training Tips:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-yellow-200">Under 30 Years:</strong>
                    <ul className="text-gray-300 mt-1 space-y-1">
                      <li>• Can handle higher training intensities</li>
                      <li>• Faster recovery between sessions</li>
                      <li>• Focus on building aerobic base</li>
                      <li>• Include some high-intensity work</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-200">Over 50 Years:</strong>
                    <ul className="text-gray-300 mt-1 space-y-1">
                      <li>• Prioritize longer durations in Zones 1-3</li>
                      <li>• Allow more recovery time</li>
                      <li>• Focus on consistency over intensity</li>
                      <li>• Monitor recovery more carefully</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Weekly Training Distribution:</h3>
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-white mb-3">Recommended 80/15/5 Rule:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-300">80%</div>
                    <div className="text-green-200 font-medium">Easy Training</div>
                    <div className="text-gray-400 text-xs mt-1">Zones 1-2</div>
                    <p className="text-gray-300 mt-2">Base building, recovery, fat burning</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-300">15%</div>
                    <div className="text-yellow-200 font-medium">Moderate Training</div>
                    <div className="text-gray-400 text-xs mt-1">Zone 3</div>
                    <p className="text-gray-300 mt-2">Aerobic development, tempo work</p>
                  </div>
                  <div className="text-center p-3 bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-300">5%</div>
                    <div className="text-red-200 font-medium">Hard Training</div>
                    <div className="text-gray-400 text-xs mt-1">Zones 4-5</div>
                    <p className="text-gray-300 mt-2">High-intensity, VO2 max work</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  This distribution is based on elite endurance athlete training patterns and exercise physiology research.
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Common Training Mistakes to Avoid:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-900/20 border border-red-800/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">Training Too Hard</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Spending too much time in Zone 3 (gray zone)</li>
                    <li>• Not enough easy recovery training</li>
                    <li>• Leads to burnout and plateaus</li>
                    <li>• Impairs adaptation and performance</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 border border-blue-800/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">Ignoring Recovery</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Not enough time in Zone 1</li>
                    <li>• Inadequate rest between hard sessions</li>
                    <li>• Poor sleep and stress management</li>
                    <li>• Inconsistent heart rate monitoring</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calories-burned-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-orange-400 mb-2">Calories Burned Calculator</h4>
                  <p className="text-gray-300 text-sm">Calculate calories burned in different heart rate zones during exercise.</p>
                </a>
                <a href="/pace-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-blue-400 mb-2">Pace Calculator</h4>
                  <p className="text-gray-300 text-sm">Determine running paces for different heart rate training zones.</p>
                </a>
              </div>

              <div className="bg-red-900/20 border border-red-800/30 p-4 sm:p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-red-300 mb-2 text-lg">Important Medical Notice:</h4>
                <p className="text-sm sm:text-base text-gray-300">
                  Consult with a healthcare provider before beginning any intensive exercise program, especially if you 
                  have cardiovascular conditions, take medications that affect heart rate, or have been sedentary. 
                  Heart rate zones are guidelines - always listen to your body and adjust accordingly. Individual responses 
                  to exercise can vary significantly based on genetics, fitness level, and health status.
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