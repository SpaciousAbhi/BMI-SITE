import React from "react";
import BodyFatCalculator from "../components/BodyFatCalculator";

const BodyFatCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Body Fat Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your body fat percentage using the scientifically validated US Navy circumference method. 
            Get accurate results with personalized health insights and recommendations.
          </p>
        </div>

        {/* Calculator Component */}
        <BodyFatCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">About Body Fat Percentage</h3>
              <p className="text-gray-300 mb-4">
                Body fat percentage represents the proportion of your total body weight that consists of fat tissue. 
                Unlike BMI, body fat percentage provides a more accurate assessment of body composition by distinguishing 
                between fat mass and lean mass.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Essential for hormone production and organ protection</li>
                <li>• Varies significantly between men and women</li>
                <li>• Changes with age and fitness level</li>
                <li>• Better indicator than weight alone</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">US Navy Method</h3>
              <p className="text-gray-300 mb-4">
                The US Navy circumference method is a widely accepted technique for estimating body fat percentage 
                using simple body measurements. This method has been validated against more expensive techniques 
                like DEXA scans and underwater weighing.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Accuracy within ±4% of DEXA scans</li>
                <li>• No special equipment required</li>
                <li>• Used by military and healthcare professionals</li>
                <li>• Suitable for ages 18-65</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Understanding Your Body Fat Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">Healthy Ranges by Gender</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Men - Essential Fat:</span>
                    <span className="text-white">2-5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Men - Athletic:</span>
                    <span className="text-white">6-13%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Men - Fitness:</span>
                    <span className="text-white">14-17%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Men - Average:</span>
                    <span className="text-white">18-24%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-300">Female Ranges</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Women - Essential Fat:</span>
                    <span className="text-white">10-13%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Women - Athletic:</span>
                    <span className="text-white">14-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Women - Fitness:</span>
                    <span className="text-white">21-24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Women - Average:</span>
                    <span className="text-white">25-31%</span>
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

export default BodyFatCalculatorPage;