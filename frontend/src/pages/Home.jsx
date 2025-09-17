import React from "react";
import BMICalculator from "../components/BMICalculator";
import { Activity, Target, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
              BMI Calculator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Calculate your Body Mass Index instantly with our advanced, professional-grade calculator. 
            Get comprehensive health insights and personalized recommendations.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <Activity className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Accurate Results</h3>
              <p className="text-gray-400 text-center">Precise BMI calculations using advanced algorithms and health standards</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all duration-300">
              <Target className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Health Insights</h3>
              <p className="text-gray-400 text-center">Comprehensive health analysis with personalized recommendations</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiple Units</h3>
              <p className="text-gray-400 text-center">Support for metric and imperial units for global accessibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <BMICalculator />
        </div>
      </section>

      {/* About BMI Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Understanding Your BMI
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">What is BMI?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Body Mass Index (BMI) is a widely used screening tool that helps assess whether you're at a healthy weight for your height. 
                  It's calculated by dividing your weight in kilograms by your height in meters squared.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  While BMI is a useful indicator, it's important to remember that it doesn't measure body fat directly and may not 
                  account for factors like muscle mass, bone density, and overall body composition.
                </p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 className="text-lg font-semibold mb-4 text-blue-400">BMI Categories</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Underweight</span>
                    <span className="text-gray-400">Below 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Normal Weight</span>
                    <span className="text-gray-400">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Overweight</span>
                    <span className="text-gray-400">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-300">Obese</span>
                    <span className="text-gray-400">30.0 and above</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;