import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calculator, Target, TrendingUp, Activity, Heart, Scale } from 'lucide-react';

const SEOContent = () => {
  const { theme } = useTheme();

  const faqData = [
    {
      question: "What is BMI and how is it calculated?",
      answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated using the formula: BMI = weight (kg) / height (m)². For pounds and inches: BMI = (weight in lbs / height in inches²) × 703. Our free BMI calculator does this calculation instantly and provides detailed health insights."
    },
    {
      question: "What is a healthy BMI range?", 
      answer: "A healthy BMI range for adults is typically 18.5-24.9. BMI categories are: Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), and Obese (30 and above). Our BMI calculator provides personalized recommendations based on your specific results."
    },
    {
      question: "Is this BMI calculator accurate and free?",
      answer: "Yes, our BMI calculator is completely free and uses the standard BMI formula recommended by health organizations worldwide. It provides instant, accurate BMI calculations with additional features like body fat estimation, calorie needs calculation, and personalized health recommendations."
    },
    {
      question: "Can I calculate body fat percentage with BMI?",
      answer: "While BMI doesn't directly measure body fat, our calculator includes body fat estimation using validated formulas that consider BMI, age, and gender. For more accurate body fat calculation, use our dedicated body fat calculator that uses waist, neck, and hip measurements."
    }
  ];

  const healthTips = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Healthy BMI Benefits",
      content: "Maintaining a healthy BMI range (18.5-24.9) is associated with reduced risk of heart disease, diabetes, stroke, and certain cancers. Use our BMI calculator to track your progress toward optimal health."
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "BMI Limitations",
      content: "BMI doesn't distinguish between muscle and fat mass. Athletes may have high BMI due to muscle. Our body fat calculator provides additional insights beyond basic BMI calculations."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "BMI and Weight Goals",
      content: "Use BMI as a starting point for weight management goals. Combine it with our calorie calculator and macros calculator for a comprehensive approach to healthy weight loss or gain."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Beyond BMI Calculation",
      content: "Our platform offers more than just BMI calculation. Access body fat percentage, daily calorie needs, macro nutrient breakdown, and personalized workout recommendations for complete health management."
    }
  ];

  return (
    <div className={`mt-16 max-w-6xl mx-auto space-y-12`}>
      {/* BMI Information Section */}
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
          theme === 'white' ? 'text-gray-900' : 'text-white'
        }`}>
          Understanding BMI: Complete Guide to Body Mass Index
        </h2>
        <p className={`text-lg max-w-4xl mx-auto ${
          theme === 'white' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          Learn everything about BMI calculation, healthy BMI ranges, and how to use our free BMI calculator for better health management.
        </p>
      </div>

      {/* Health Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {healthTips.map((tip, index) => (
          <Card key={index} className={`backdrop-blur-md border-0 shadow-lg transition-all duration-300 hover:scale-105 ${
            theme === 'white' 
              ? 'bg-white/80 hover:bg-white/90' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90'
              : 'bg-black/80 hover:bg-gray-900/50'
          }`}>
            <CardContent className="p-6 text-center">
              <div className={`flex justify-center mb-4 ${
                theme === 'white' ? 'text-teal-600' : 
                theme === 'dark' ? 'text-purple-400' : 
                'text-green-400'
              }`}>
                {tip.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                {tip.title}
              </h3>
              <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                {tip.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section for Featured Snippets */}
      <div className="mb-12">
        <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${
          theme === 'white' ? 'text-gray-900' : 'text-white'
        }`}>
          Frequently Asked Questions About BMI Calculator
        </h3>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
              theme === 'white' 
                ? 'bg-white/80' 
                : theme === 'dark'
                ? 'bg-gray-800/80'
                : 'bg-black/80'
            }`}>
              <CardHeader>
                <CardTitle className={`text-lg ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* BMI Calculator Features Section */}
      <div className="mb-12">
        <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${
          theme === 'white' ? 'text-gray-900' : 'text-white'
        }`}>
          Why Choose Our Free BMI Calculator?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Instant BMI Calculation",
              description: "Get your BMI results instantly with our fast, accurate BMI calculator. No registration required.",
              icon: <Calculator className="h-8 w-8" />
            },
            {
              title: "Body Fat Estimation", 
              description: "Beyond basic BMI calculation, estimate your body fat percentage using advanced algorithms.",
              icon: <Target className="h-8 w-8" />
            },
            {
              title: "Comprehensive Health Analysis",
              description: "Access calorie calculator, macros breakdown, and personalized health recommendations.",
              icon: <Heart className="h-8 w-8" />
            },
            {
              title: "Multiple Unit Systems",
              description: "Calculate BMI using metric (kg/cm), imperial (lbs/feet), or mixed unit systems.",
              icon: <Scale className="h-8 w-8" />
            },
            {
              title: "Progress Tracking",
              description: "Track your BMI changes over time with our built-in history and progress monitoring.",
              icon: <TrendingUp className="h-8 w-8" />
            },
            {
              title: "Mobile Optimized",
              description: "Use our BMI calculator on any device - desktop, tablet, or mobile phone.",
              icon: <Activity className="h-8 w-8" />
            }
          ].map((feature, index) => (
            <Card key={index} className={`backdrop-blur-md border-0 shadow-lg transition-all duration-300 hover:scale-105 ${
              theme === 'white' 
                ? 'bg-white/70' 
                : theme === 'dark'
                ? 'bg-gray-800/70'
                : 'bg-black/70'
            }`}>
              <CardContent className="p-6 text-center">
                <div className={`flex justify-center mb-4 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`}>
                  {feature.icon}
                </div>
                <h4 className={`text-lg font-semibold mb-3 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Takeaways Section */}
      <Card className={`backdrop-blur-md border-0 shadow-xl ${
        theme === 'white' 
          ? 'bg-gradient-to-r from-teal-50 to-cyan-50' 
          : theme === 'dark'
          ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50'
          : 'bg-gradient-to-r from-green-900/50 to-emerald-900/50'
      }`}>
        <CardContent className="p-8">
          <h3 className={`text-2xl font-bold text-center mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            BMI Calculator: Key Health Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-lg font-semibold mb-3 ${
                theme === 'white' ? 'text-gray-800' : 'text-gray-100'
              }`}>
                What BMI Tells You:
              </h4>
              <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                <li>• General indication of healthy weight range</li>
                <li>• Risk assessment for weight-related health issues</li>
                <li>• Starting point for health and fitness goals</li>
                <li>• Progress tracking for weight management</li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-3 ${
                theme === 'white' ? 'text-gray-800' : 'text-gray-100'
              }`}>
                Beyond Basic BMI:
              </h4>
              <ul className={`space-y-2 text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                <li>• Body fat percentage estimation</li>
                <li>• Daily calorie needs calculation</li>
                <li>• Macronutrient breakdown</li>
                <li>• Personalized health recommendations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOContent;