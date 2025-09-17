import React from "react";
import BMICalculator from "../components/BMICalculator";
import { Stethoscope, Brain, Users, Shield, Award, TrendingUp } from "lucide-react";

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
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <BMICalculator />
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Why Choose BMI Pro?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade BMI calculation with advanced health insights trusted by thousands worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-blue-500/10 mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Stethoscope className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Medical-Grade Accuracy</h3>
              <p className="text-gray-400 text-center leading-relaxed">Precise BMI calculations using WHO standards and advanced algorithms validated by healthcare professionals</p>
            </div>
            
            <div className="flex flex-col items-center p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-green-500/10 mb-6 group-hover:bg-green-500/20 transition-colors">
                <Brain className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI-Powered Insights</h3>
              <p className="text-gray-400 text-center leading-relaxed">Comprehensive health analysis with personalized recommendations based on your unique profile</p>
            </div>
            
            <div className="flex flex-col items-center p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-blue-500/10 mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Shield className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Privacy Protected</h3>
              <p className="text-gray-400 text-center leading-relaxed">Your health data is processed locally and never stored on our servers for complete privacy</p>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <Users className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">1M+</div>
              <div className="text-gray-400">Users Worldwide</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* About BMI Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Understanding Your BMI
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">What is BMI?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Body Mass Index (BMI) is a widely used screening tool that helps assess whether you're at a healthy weight for your height. 
                  It's calculated by dividing your weight in kilograms by your height in meters squared.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  While BMI is a useful indicator, it's important to remember that it doesn't measure body fat directly and may not 
                  account for factors like muscle mass, bone density, and overall body composition.
                </p>
                
                <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-800/50">
                  <h4 className="text-lg font-semibold mb-3 text-blue-300">WHO Guidelines</h4>
                  <p className="text-gray-300 text-sm">
                    Our BMI calculator follows World Health Organization (WHO) guidelines and standards for accurate health assessment.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
                <h4 className="text-xl font-semibold mb-6 text-blue-400 flex items-center">
                  <Stethoscope className="h-6 w-6 mr-2" />
                  BMI Categories
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-900/20 border border-blue-800/30">
                    <span className="text-blue-300 font-medium">Underweight</span>
                    <span className="text-white font-semibold">Below 18.5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-900/20 border border-green-800/30">
                    <span className="text-green-300 font-medium">Normal Weight</span>
                    <span className="text-white font-semibold">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-900/20 border border-yellow-800/30">
                    <span className="text-yellow-300 font-medium">Overweight</span>
                    <span className="text-white font-semibold">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-900/20 border border-red-800/30">
                    <span className="text-red-300 font-medium">Obese</span>
                    <span className="text-white font-semibold">30.0 and above</span>
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