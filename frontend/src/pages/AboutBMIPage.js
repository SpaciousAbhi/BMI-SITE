import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, TrendingUp, AlertTriangle, CheckCircle, Info, Heart, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutBMIPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const themeConfig = getThemeConfig();

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
    }
  };

  const bmiCategories = [
    { range: 'Below 18.5', category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'May indicate malnutrition or health issues' },
    { range: '18.5 - 24.9', category: 'Normal Weight', color: 'text-green-600', bgColor: 'bg-green-100', description: 'Indicates optimal health weight range' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Increased risk of health conditions' },
    { range: '30.0 - 34.9', category: 'Obese Class I', color: 'text-orange-600', bgColor: 'bg-orange-100', description: 'Moderate risk of health complications' },
    { range: '35.0 - 39.9', category: 'Obese Class II', color: 'text-red-600', bgColor: 'bg-red-100', description: 'High risk of health complications' },
    { range: '40.0+', category: 'Obese Class III', color: 'text-red-800', bgColor: 'bg-red-200', description: 'Very high risk of health complications' }
  ];

  const limitations = [
    { title: 'Muscle Mass', description: 'BMI doesn\'t differentiate between muscle and fat. Athletes may have high BMI due to muscle mass.' },
    { title: 'Age', description: 'BMI may not be as accurate for older adults due to muscle loss and bone density changes.' },
    { title: 'Gender', description: 'Men and women naturally have different body compositions at the same BMI.' },
    { title: 'Ethnicity', description: 'Different ethnic groups may have varying health risks at the same BMI levels.' },
    { title: 'Body Shape', description: 'BMI doesn\'t account for where fat is distributed in the body.' }
  ];

  const benefits = [
    { title: 'Easy Calculation', description: 'Simple formula using only height and weight measurements.' },
    { title: 'Population Screening', description: 'Effective tool for assessing obesity trends in large populations.' },
    { title: 'Health Risk Assessment', description: 'Good predictor of health risks related to weight.' },
    { title: 'Track Progress', description: 'Useful for monitoring weight management over time.' },
    { title: 'Universal Standard', description: 'Widely recognized and used by healthcare professionals globally.' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 animate-fade-in">
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              theme === 'white' ? 'text-teal-600 hover:bg-teal-50' :
              theme === 'dark' ? 'text-purple-400 hover:bg-purple-500/10' :
              'text-green-400 hover:bg-green-500/10'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Calculator
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Scale className={`h-12 w-12 ${
              theme === 'white' ? 'text-teal-600' : 
              theme === 'dark' ? 'text-purple-400' : 
              'text-green-400'
            }`} />
            <h1 className={`text-4xl md:text-5xl font-bold transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              About BMI
            </h1>
          </div>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Understanding Body Mass Index - Your comprehensive guide to BMI calculation, interpretation, and limitations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* What is BMI */}
          <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 border-purple-500/20'
              : 'bg-black/80 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Info className={`h-6 w-6 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                What is BMI?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Body Mass Index (BMI) is a numerical value calculated from your height and weight. It serves as a screening tool 
                to categorize individuals into weight status categories that may be associated with health problems.
              </p>
              
              <div className={`p-6 rounded-xl ${
                theme === 'white' ? 'bg-teal-50' : 
                theme === 'dark' ? 'bg-purple-900/30' : 
                'bg-green-900/30'
              }`}>
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === 'white' ? 'text-teal-800' : 
                  theme === 'dark' ? 'text-purple-200' : 
                  'text-green-200'
                }`}>
                  BMI Formula
                </h3>
                <p className={`text-lg font-mono ${
                  theme === 'white' ? 'text-teal-700' : 
                  theme === 'dark' ? 'text-purple-300' : 
                  'text-green-300'
                }`}>
                  BMI = weight (kg) / height (m)²
                </p>
                <p className={`text-sm mt-2 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`}>
                  For pounds and inches: BMI = (weight × 703) / height²
                </p>
              </div>
            </CardContent>
          </Card>

          {/* BMI Categories */}
          <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 border-purple-500/20'
              : 'bg-black/80 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <TrendingUp className={`h-6 w-6 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                BMI Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {bmiCategories.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                      theme === 'white' ? 'bg-white/50 border-gray-200' : 
                      theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 
                      'bg-gray-900/50 border-gray-700'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge className={`${item.bgColor} ${item.color} font-semibold`}>
                          {item.range}
                        </Badge>
                        <div>
                          <h3 className={`font-semibold text-lg ${
                            theme === 'white' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {item.category}
                          </h3>
                          <p className={`text-sm ${
                            theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits and Limitations */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Benefits */}
            <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-scale-in ${
              theme === 'white' 
                ? 'bg-white/80 border-teal-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 border-purple-500/20'
                : 'bg-black/80 border-green-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-xl transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <CheckCircle className={`h-5 w-5 ${
                    theme === 'white' ? 'text-green-600' : 'text-green-400'
                  }`} />
                  Benefits of BMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <Heart className={`h-5 w-5 mt-1 flex-shrink-0 ${
                      theme === 'white' ? 'text-teal-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    <div>
                      <h4 className={`font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {benefit.title}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-scale-in ${
              theme === 'white' 
                ? 'bg-white/80 border-teal-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 border-purple-500/20'
                : 'bg-black/80 border-green-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-xl transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                  }`} />
                  Limitations of BMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {limitations.map((limitation, index) => (
                  <div key={index} className="flex gap-3 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <Brain className={`h-5 w-5 mt-1 flex-shrink-0 ${
                      theme === 'white' ? 'text-orange-600' : 
                      theme === 'dark' ? 'text-orange-400' : 
                      'text-orange-400'
                    }`} />
                    <div>
                      <h4 className={`font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {limitation.title}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {limitation.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center animate-fade-in">
            <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect ${
              theme === 'white' 
                ? 'bg-white/80 border-teal-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 border-purple-500/20'
                : 'bg-black/80 border-green-500/20'
            }`}>
              <CardContent className="py-8">
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  Ready to Calculate Your BMI?
                </h3>
                <p className={`mb-6 ${
                  theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Use our advanced BMI calculator to get personalized health insights and recommendations.
                </p>
                <Button 
                  asChild
                  className={`font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg ${
                    theme === 'white' 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white' 
                      : theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                  }`}
                >
                  <Link to="/">Calculate BMI Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutBMIPage;