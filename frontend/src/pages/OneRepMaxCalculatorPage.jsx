import React, { useEffect } from "react";
import OneRepMaxCalculator from "../components/OneRepMaxCalculator";

const OneRepMaxCalculatorPage = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Advanced One Rep Max Calculator",
      "description": "Calculate your one-rep maximum using 7 proven formulas. Get training zones, rep ranges, and progressive overload recommendations.",
      "url": "https://bmipro.netlify.app/one-rep-max-calculator",
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
        "7 proven 1RM formulas",
        "Training zone calculations",
        "Progressive overload recommendations",
        "Strength level comparisons",
        "Rep range percentages",
        "Exercise-specific analysis"
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
        if (script.text.includes('One Rep Max Calculator')) {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
            Advanced One Rep Max Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-3">
            Calculate your one-rep maximum using 7 proven formulas. Get training zones, rep ranges, and progressive overload recommendations for optimal strength gains.
          </p>
        </div>

        {/* Calculator Component */}
        <OneRepMaxCalculator />

        {/* Enhanced SEO Content Section */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto space-y-8 sm:space-y-12">
          
          {/* FAQ Section for Featured Snippets */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Which one rep max formula is most accurate?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  The Epley formula is generally considered the most accurate and popular for 1-10 reps, while the Brzycki formula excels for lower rep ranges (2-10 reps). Our calculator uses 7 different formulas and provides an average for the most reliable estimate.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What rep range should I use for 1RM calculation?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  For best accuracy, use 1-10 reps. The calculator accepts up to 15 reps but becomes less accurate with higher rep ranges. Ideally, perform a set to failure in the 3-8 rep range for the most reliable 1RM estimation.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How often should I test my one rep max?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Test your 1RM every 4-6 weeks for beginners, every 6-8 weeks for intermediate lifters, and every 8-12 weeks for advanced lifters. Use our calculator between tests to estimate progress without the stress of maximum lifts.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">What are the different training zones for strength?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Training zones are: Strength Endurance (50-65%, 12-20+ reps), Hypertrophy (65-80%, 6-12 reps), Strength (80-90%, 3-6 reps), and Power/Max Strength (90-100%, 1-3 reps). Each zone targets specific adaptations.
                </p>
              </div>
            </div>
          </div>

          {/* Main SEO Content */}
          <div className="bg-gray-900/30 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About Our Advanced One Rep Max Calculator</h2>
            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our one rep max (1RM) calculator uses seven scientifically-validated formulas to provide the most 
                accurate estimation of your maximum strength. Whether you're a beginner or advanced lifter, this 
                tool helps you plan training loads, track progress, and optimize your strength training program safely and effectively.
              </p>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Seven Proven Formulas:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Most Popular Formulas</h4>
                  <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                    <li><strong>Epley Formula:</strong> Most popular and accurate for 1-10 reps</li>
                    <li><strong>Brzycki Formula:</strong> Excellent for lower rep ranges (2-10 reps)</li>
                    <li><strong>Lander Formula:</strong> Conservative estimates, good for 2-10 reps</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-300 mb-2">Research-Based Formulas</h4>
                  <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                    <li><strong>Lombardi Formula:</strong> Effective for higher rep ranges (1-15 reps)</li>
                    <li><strong>Mayhew Formula:</strong> Research-based, good for 1-15 reps</li>
                    <li><strong>O'Conner Formula:</strong> Conservative approach for 1-15 reps</li>
                    <li><strong>Wathan Formula:</strong> Scientific approach for 1-15 reps</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Training Zones Explained:</h3>
              <div className="space-y-4 text-gray-300 mb-6">
                <div className="p-4 bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <strong className="text-blue-300 text-lg">Strength Endurance (50-65%):</strong>
                  <p className="mt-2 text-sm sm:text-base">12-20+ reps. Builds muscular endurance, promotes recovery, and enhances work capacity. Ideal for beginners and during deload phases.</p>
                </div>
                <div className="p-4 bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <strong className="text-green-300 text-lg">Hypertrophy (65-80%):</strong>
                  <p className="mt-2 text-sm sm:text-base">6-12 reps. Optimal range for muscle growth and size gains. Creates maximum muscle tension and metabolic stress for hypertrophy.</p>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <strong className="text-orange-300 text-lg">Strength (80-90%):</strong>
                  <p className="mt-2 text-sm sm:text-base">3-6 reps. Builds maximum strength and power. Develops neural adaptations and increases force production capacity.</p>
                </div>
                <div className="p-4 bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <strong className="text-red-300 text-lg">Power/Max Strength (90-100%):</strong>
                  <p className="mt-2 text-sm sm:text-base">1-3 reps. Peak strength and neural adaptations. Used for competition preparation and maximum strength development.</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Safety Guidelines for 1RM Testing:</h3>
              <div className="bg-red-900/20 border border-red-800/30 p-4 sm:p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-red-300 mb-3">Essential Safety Protocols:</h4>
                <ol className="text-gray-300 space-y-2 text-sm sm:text-base">
                  <li><strong>1. Proper Warm-up:</strong> Always perform a comprehensive warm-up including general warm-up, dynamic stretching, and progressive loading.</li>
                  <li><strong>2. Use Experienced Spotters:</strong> Have knowledgeable spotters for safety, especially on bench press and squat movements.</li>
                  <li><strong>3. Progressive Testing:</strong> Build up to your max over several weeks, don't attempt a true 1RM without proper preparation.</li>
                  <li><strong>4. Maintain Strict Form:</strong> Never compromise form for heavier weight - this increases injury risk significantly.</li>
                  <li><strong>5. Adequate Recovery:</strong> Allow full recovery (3-5 minutes) between maximum attempts.</li>
                </ol>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-White mt-6 mb-4">Progressive Overload Principles:</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Progressive overload is the gradual increase of stress placed on the body during exercise. Our calculator 
                provides specific recommendations for increasing weight, reps, or volume to ensure continuous progress 
                while minimizing injury risk. This systematic approach is essential for long-term strength development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Weight Progression</h4>
                  <p className="text-gray-300 text-sm">Increase weight by 2.5% when you can complete all prescribed reps with perfect form.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Rep Progression</h4>
                  <p className="text-gray-300 text-sm">Add one rep per week until you reach the top of your target rep range.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Volume Progression</h4>
                  <p className="text-gray-300 text-sm">Gradually increase total training volume through additional sets or frequency.</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Supported Exercises:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Primary Compound Lifts</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Bench Press</li>
                    <li>• Squat</li>
                    <li>• Deadlift</li>
                    <li>• Overhead Press</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Secondary Compound Lifts</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Barbell Row</li>
                    <li>• Incline Bench Press</li>
                    <li>• Dumbbell Press</li>
                    <li>• Leg Press</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Bodyweight & Weighted</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Weighted Pull-ups</li>
                    <li>• Weighted Dips</li>
                    <li>• Close-Grip Bench</li>
                    <li>• Front Squat</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-4">Training Applications:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Program Design</h4>
                  <p className="text-gray-300 text-sm">Set appropriate training loads for different goals using percentage-based programming.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Progress Tracking</h4>
                  <p className="text-gray-300 text-sm">Monitor strength gains over time and adjust training accordingly.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Competition Prep</h4>
                  <p className="text-gray-300 text-sm">Plan attempt selection for powerlifting meets and strength competitions.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Periodization</h4>
                  <p className="text-gray-300 text-sm">Adjust training intensity throughout different phases of your training cycle.</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calories-burned-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-orange-400 mb-2">Calories Burned Calculator</h4>
                  <p className="text-gray-300 text-sm">Calculate calories burned during strength training sessions.</p>
                </a>
                <a href="/target-heart-rate-calculator" className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <h4 className="font-semibold text-red-400 mb-2">Target Heart Rate Calculator</h4>
                  <p className="text-gray-300 text-sm">Monitor cardiovascular intensity during strength training.</p>
                </a>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-800/30 p-4 sm:p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-yellow-300 mb-2 text-lg">Important Safety Notice:</h4>
                <p className="text-sm sm:text-base text-gray-300">
                  Always prioritize safety when testing maximum strength. Use proper spotters, maintain correct form, 
                  and progress gradually. Consult with a qualified trainer if you're new to maximum strength testing. 
                  These calculations are estimates and individual results may vary based on training experience, technique, and other factors.
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