import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target, TrendingUp, Calculator, Dumbbell, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BMIForAthletesPage = () => {
  const { theme } = useTheme();

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-red-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50';
    }
  };

  const athleteConsiderations = [
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Muscle Mass vs Fat Mass",
      description: "Traditional BMI doesn't distinguish between muscle and fat. Athletes with high muscle mass may have elevated BMI despite low body fat percentage."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Body Fat Percentage Focus", 
      description: "For athletes, body fat percentage is more important than BMI. Our body fat calculator uses waist, neck, and hip measurements for accuracy."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Sport-Specific Analysis",
      description: "Different sports require different body compositions. Powerlifters, marathoners, and gymnasts will have vastly different optimal BMI ranges."
    }
  ];

  const sportsCategories = [
    {
      sport: "Endurance Athletes",
      bmiRange: "18.5-22.0",
      description: "Runners, cyclists, swimmers typically have lower BMI with minimal body fat",
      bodyFat: "Men: 6-13%, Women: 14-20%"
    },
    {
      sport: "Strength Athletes", 
      bmiRange: "25.0-30.0+",
      description: "Powerlifters, bodybuilders may have high BMI due to muscle mass",
      bodyFat: "Men: 10-18%, Women: 16-24%"
    },
    {
      sport: "Team Sports",
      bmiRange: "22.0-27.0",
      description: "Football, basketball, soccer players with varied body compositions",
      bodyFat: "Men: 8-15%, Women: 15-22%"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="BMI Calculator for Athletes - Sports BMI Analysis & Body Fat Calculator 2025"
        description="Specialized BMI calculator for athletes and muscular individuals. Understand BMI limitations for athletes, get accurate body fat calculations, and sport-specific BMI ranges. Free athlete BMI analysis tool."
        keywords="BMI calculator for athletes, athlete BMI, sports BMI calculator, muscular BMI calculator, athlete body fat calculator, BMI for bodybuilders, athlete BMI range, sports nutrition BMI, fitness BMI calculator"
        canonical="/bmi-for-athletes"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "BMI Calculator for Athletes - Sports BMI Analysis",
          "description": "Specialized BMI calculator designed for athletes and muscular individuals with sport-specific analysis and body fat calculations.",
          "url": "https://bmicalculator.com/bmi-for-athletes",
          "applicationCategory": "HealthApplication",
          "audience": {
            "@type": "Audience",
            "audienceType": "Athletes, Fitness enthusiasts, Sports professionals"
          },
          "featureList": [
            "Sport-specific BMI analysis",
            "Muscle mass consideration",
            "Body fat percentage calculation",
            "Athletic performance metrics",
            "Strength vs Endurance comparison"
          ]
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            BMI Calculator for Athletes
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-orange-400 to-red-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-orange-400 to-red-500' :
            'bg-gradient-to-r from-orange-400 to-red-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Specialized BMI Analysis for Athletes</strong> - Understanding BMI limitations for muscular individuals, 
            sport-specific BMI ranges, and accurate body fat calculations for athletic performance.
          </p>
        </div>

        {/* Athlete Considerations Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {athleteConsiderations.map((consideration, index) => (
            <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
              theme === 'white' 
                ? 'bg-white/80 hover:bg-white/90 border-orange-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-orange-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-orange-500/20'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`flex justify-center mb-6 transition-colors duration-300 ${
                  theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                }`}>
                  {consideration.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  {consideration.title}
                </h3>
                <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {consideration.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sport-Specific BMI Ranges */}
        <div className="mb-12 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Sport-Specific BMI Ranges for Athletes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sportsCategories.map((category, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-gradient-to-br from-orange-50 to-red-50' 
                  : theme === 'dark'
                  ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50'
                  : 'bg-gradient-to-br from-orange-900/50 to-red-900/50'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {category.sport}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className={`font-semibold ${theme === 'white' ? 'text-orange-700' : 'text-orange-300'}`}>
                        BMI Range: 
                      </span>
                      <span className={`ml-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {category.bmiRange}
                      </span>
                    </div>
                    <div>
                      <span className={`font-semibold ${theme === 'white' ? 'text-orange-700' : 'text-orange-300'}`}>
                        Body Fat: 
                      </span>
                      <span className={`ml-2 ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {category.bodyFat}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <Card className={`backdrop-blur-md border-0 shadow-2xl max-w-2xl mx-auto ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-orange-50 to-red-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-orange-900/50 to-red-900/50'
              : 'bg-gradient-to-r from-orange-900/50 to-red-900/50'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Get Your Athlete BMI Analysis
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Use our comprehensive calculator with body fat estimation for accurate athletic assessment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl'
                  }`}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate BMI Now
                  </Button>
                </Link>
                <Link to="/body-fat">
                  <Button variant="outline" className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
                      : 'border-orange-500/50 text-orange-300 hover:bg-orange-900/20'
                  }`}>
                    <Target className="h-4 w-4 mr-2" />
                    Body Fat Calculator
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            BMI for Athletes - Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Why is BMI not accurate for athletes?",
                a: "BMI doesn't distinguish between muscle and fat mass. Athletes often have higher muscle mass, which weighs more than fat, leading to elevated BMI scores despite low body fat percentages."
              },
              {
                q: "What BMI range is normal for athletes?",
                a: "Athlete BMI ranges vary by sport: Endurance athletes (18.5-22.0), Team sports (22.0-27.0), Strength athletes (25.0-30.0+). Body fat percentage is more important than BMI for athletes."
              },
              {
                q: "Should athletes use body fat percentage instead of BMI?",
                a: "Yes, body fat percentage is more accurate for athletes. Our body fat calculator uses waist, neck, and hip measurements to provide better health assessment than BMI alone."
              },
              {
                q: "Can bodybuilders have obese BMI but be healthy?",
                a: "Yes, bodybuilders often have BMI in the 'obese' range (30+) due to high muscle mass while maintaining very low body fat (6-12%). This is why body composition analysis is crucial for athletes."
              }
            ].map((faq, index) => (
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
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BMIForAthletesPage;