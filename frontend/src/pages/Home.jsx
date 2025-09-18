import React, { useState } from "react";
import BMICalculator from "../components/BMICalculator";
import { Stethoscope, Brain, Users, Shield, Award, TrendingUp, ChevronDown, ChevronUp, Calculator, Heart, Target } from "lucide-react";

const faqData = [
  {
    question: "What is BMI and how is it calculated?",
    answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight that applies to adult men and women. It's calculated using the formula: <strong>BMI = weight (kg) ÷ height (m)²</strong>. For example, if you weigh 70kg and are 1.75m tall, your BMI would be 70 ÷ (1.75 × 1.75) = 22.9."
  },
  {
    question: "What are the different BMI categories and ranges?",
    answer: "According to WHO guidelines: <strong>Underweight:</strong> Below 18.5, <strong>Healthy Weight:</strong> 18.5-24.9, <strong>Overweight:</strong> 25.0-29.9, <strong>Obese Class I:</strong> 30.0-34.9, <strong>Obese Class II:</strong> 35.0-39.9, <strong>Obese Class III:</strong> 40.0 and above. These ranges help assess health risks associated with body weight."
  },
  {
    question: "Is BMI accurate for everyone?",
    answer: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat mass, so athletes or very muscular individuals may have high BMI despite being healthy. Age, gender, ethnicity, and body composition can affect BMI interpretation. It's best used alongside other health assessments."
  },
  {
    question: "How often should I calculate my BMI?",
    answer: "For weight management, calculating BMI weekly or monthly is sufficient. Frequent daily calculations aren't necessary as healthy weight changes occur gradually. Use our BMI calculator to track long-term trends rather than daily fluctuations."
  },
  {
    question: "What should I do if my BMI is outside the healthy range?",
    answer: "If your BMI indicates underweight, overweight, or obesity, consult with a healthcare professional for personalized advice. They can assess your overall health, consider factors BMI doesn't measure, and recommend appropriate diet, exercise, or medical interventions if needed."
  },
  {
    question: "Can I use this BMI calculator for children?",
    answer: "This calculator is designed for adults (18+ years). Children and teens have different BMI calculations that account for age and gender using growth charts. For pediatric BMI assessment, consult your child's healthcare provider or use specialized pediatric BMI tools."
  }
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - SEO Optimized */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
              Free BMI Calculator
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-200 mb-4 font-semibold">
            Calculate Your Body Mass Index & Get Healthy Weight Insights
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Calculate your BMI instantly with our advanced Body Mass Index calculator. Get personalized health insights, 
            ideal weight ranges, and professional recommendations based on WHO & CDC guidelines.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-gray-400">
            <span className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full">
              <Calculator className="h-4 w-4 text-blue-400" />
              WHO Approved Formula
            </span>
            <span className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-green-400" />
              Health Risk Assessment
            </span>
            <span className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full">
              <Target className="h-4 w-4 text-blue-400" />
              Ideal Weight Range
            </span>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <BMICalculator />
        </div>
      </section>

      {/* Additional Calculators Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Additional Body Composition Calculators
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Explore our comprehensive suite of medical-grade body composition calculators for complete health assessment
            </p>
          </div>

          {/* Category: Body Composition & Weight */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Body Composition & Weight Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Body Fat Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-blue-500/10 w-fit mb-3 group-hover:bg-blue-500/20 transition-colors">
                  <Calculator className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Body Fat Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Calculate body fat percentage using the US Navy circumference method for accurate body composition analysis.
                </p>
                <a
                  href="/body-fat-calculator"
                  className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm"
                >
                  Calculate Body Fat →
                </a>
              </div>

              {/* Army Body Fat Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-green-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-green-500/10 w-fit mb-3 group-hover:bg-green-500/20 transition-colors">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Army Body Fat Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Official US Army AR 600-9 body fat calculation using military tape test standards for compliance verification.
                </p>
                <a
                  href="/army-body-fat-calculator"
                  className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm"
                >
                  Military Standard →
                </a>
              </div>

              {/* Lean Body Mass Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-purple-500/10 w-fit mb-3 group-hover:bg-purple-500/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Lean Body Mass Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Calculate lean body mass using validated Boer, James, and Hume formulas for accurate muscle mass assessment.
                </p>
                <a
                  href="/lean-body-mass-calculator"
                  className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-sm"
                >
                  Calculate LBM →
                </a>
              </div>

              {/* Ideal Weight Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-yellow-500/10 w-fit mb-3 group-hover:bg-yellow-500/20 transition-colors">
                  <Target className="h-6 w-6 text-yellow-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Ideal Weight Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Calculate ideal body weight using medical formulas including Devine, Robinson, and Miller methods.
                </p>
                <a
                  href="/ideal-weight-calculator"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-sm"
                >
                  Find Ideal Weight →
                </a>
              </div>

              {/* Healthy Weight Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-teal-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-teal-500/10 w-fit mb-3 group-hover:bg-teal-500/20 transition-colors">
                  <Heart className="h-6 w-6 text-teal-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Healthy Weight Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Get personalized healthy weight range based on BMI, age, activity level, and body frame analysis.
                </p>
                <a
                  href="/healthy-weight-calculator"
                  className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300 text-sm"
                >
                  Healthy Range →
                </a>
              </div>

              {/* Body Type Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-rose-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-rose-500/10 w-fit mb-3 group-hover:bg-rose-500/20 transition-colors">
                  <Users className="h-6 w-6 text-rose-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Body Type Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Discover your somatotype using Heath-Carter analysis for personalized fitness and nutrition recommendations.
                </p>
                <a
                  href="/body-type-calculator"
                  className="inline-block bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-rose-600 hover:to-rose-700 transition-all duration-300 text-sm"
                >
                  Analyze Body Type →
                </a>
              </div>

              {/* Body Surface Area Calculator */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all duration-300 group">
                <div className="p-2 rounded-full bg-orange-500/10 w-fit mb-3 group-hover:bg-orange-500/20 transition-colors">
                  <Stethoscope className="h-6 w-6 text-orange-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Body Surface Area Calculator</h4>
                <p className="text-gray-400 mb-3 text-sm">
                  Calculate BSA using medical formulas including Du Bois, Mosteller, and Haycock methods for medical applications.
                </p>
                <a
                  href="/body-surface-area-calculator"
                  className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-md font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm"
                >
                  Calculate BSA →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Why Choose Advanced BMI Calculator?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade BMI calculation with advanced health insights trusted by thousands worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
          
          {/* Trust Indicators - Professional Horizontal Layout */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">1M+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Users</div>
                </div>
              </div>
              
              <div className="h-8 sm:h-12 w-px bg-gray-700"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">99.9%</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Accuracy</div>
                </div>
              </div>
              
              <div className="h-8 sm:h-12 w-px bg-gray-700"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">24/7</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About BMI Section - Enhanced for SEO */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Understanding Your Body Mass Index (BMI)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">What is BMI and How is it Calculated?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Body Mass Index (BMI) is a widely used health screening tool that measures body fat based on height and weight. 
                  BMI is calculated using the formula: <strong>weight (kg) ÷ height (m)²</strong>. Our BMI calculator makes this 
                  calculation instant and accurate.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  While BMI is an excellent indicator for most adults, it has limitations. It doesn't distinguish between muscle 
                  and fat mass, so athletes or very muscular individuals may have elevated BMI despite being healthy.
                </p>
                
                <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-800/50">
                  <h4 className="text-lg font-semibold mb-3 text-blue-300">WHO & CDC Approved</h4>
                  <p className="text-gray-300 text-sm">
                    Our BMI calculator follows World Health Organization (WHO) and Centers for Disease Control (CDC) 
                    guidelines for accurate health assessment and weight classification.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
                <h4 className="text-xl font-semibold mb-6 text-blue-400 flex items-center">
                  <Stethoscope className="h-6 w-6 mr-2" />
                  BMI Chart & Categories
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-900/20 border border-blue-800/30">
                    <span className="text-blue-300 font-medium">Underweight</span>
                    <span className="text-white font-semibold">Below 18.5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-900/20 border border-green-800/30">
                    <span className="text-green-300 font-medium">Healthy Weight</span>
                    <span className="text-white font-semibold">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-900/20 border border-yellow-800/30">
                    <span className="text-yellow-300 font-medium">Overweight</span>
                    <span className="text-white font-semibold">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-orange-900/20 border border-orange-800/30">
                    <span className="text-orange-300 font-medium">Obese Class I</span>
                    <span className="text-white font-semibold">30.0 - 34.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-900/20 border border-red-800/30">
                    <span className="text-red-300 font-medium">Obese Class II</span>
                    <span className="text-white font-semibold">35.0 - 39.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-900/30 border border-red-700/30">
                    <span className="text-red-200 font-medium">Obese Class III</span>
                    <span className="text-white font-semibold">40.0+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized FAQ Section for Featured Snippets */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Frequently Asked Questions About BMI Calculator
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Healthy Weight Management Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="p-3 rounded-full bg-green-500/10 w-fit mb-4">
                <Heart className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Maintain Healthy Diet</h3>
              <p className="text-gray-400">
                Focus on balanced nutrition with plenty of fruits, vegetables, lean proteins, and whole grains. 
                Limit processed foods and added sugars for optimal BMI maintenance.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="p-3 rounded-full bg-blue-500/10 w-fit mb-4">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Regular Exercise</h3>
              <p className="text-gray-400">
                Aim for at least 150 minutes of moderate aerobic activity weekly. Combine cardio with 
                strength training for effective weight management and improved BMI.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="p-3 rounded-full bg-blue-500/10 w-fit mb-4">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Monitor Progress</h3>
              <p className="text-gray-400">
                Regular BMI calculations help track your progress. Use our BMI calculator weekly to 
                monitor changes and adjust your health goals accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;