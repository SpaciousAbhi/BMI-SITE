import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Heart, Calculator, Scale, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BMIGuidePage = () => {
  const { theme } = useTheme();

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50';
    }
  };

  const guideTopics = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "How to Calculate BMI Accurately",
      description: "Step-by-step guide to calculate BMI using metric and imperial units with examples and common mistakes to avoid.",
      content: [
        "BMI Formula: Weight (kg) ÷ Height (m)²",
        "Imperial Formula: (Weight in lbs ÷ Height in inches²) × 703",
        "Use precise measurements for accuracy",
        "Consider time of day for weight measurement"
      ]
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Understanding BMI Categories",
      description: "Comprehensive breakdown of BMI ranges, health implications, and what each category means for your wellness.",
      content: [
        "Underweight: BMI < 18.5 - May indicate malnutrition",
        "Normal: 18.5-24.9 - Optimal health range",
        "Overweight: 25-29.9 - Increased health risks",
        "Obese: ≥30 - Significant health concerns"
      ]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "BMI and Health Risks",
      description: "Learn about the connection between BMI and various health conditions, plus prevention strategies.",
      content: [
        "Heart disease and stroke risk",
        "Type 2 diabetes correlation",
        "Sleep apnea and breathing issues",
        "Joint problems and mobility"
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "BMI Limitations and Alternatives",
      description: "Understanding when BMI isn't accurate and better alternatives for health assessment.",
      content: [
        "Doesn't measure body composition",
        "Inaccurate for athletes and elderly",
        "Body fat percentage alternatives",
        "Waist-to-hip ratio measurements"
      ]
    }
  ];

  const expertTips = [
    "BMI is most accurate for sedentary adults aged 20-65",
    "Combine BMI with waist circumference for better assessment",
    "Track trends over time rather than single measurements",
    "Consult healthcare providers for personalized interpretation",
    "Consider ethnicity-specific BMI ranges when available"
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Complete BMI Guide 2025 - How to Calculate, Understand & Use BMI Effectively"
        description="Ultimate BMI guide covering calculation methods, health implications, limitations, and alternatives. Learn how to calculate BMI accurately, understand BMI categories, and use BMI for health assessment. Expert tips and actionable advice."
        keywords="BMI guide, how to calculate BMI, BMI chart, BMI ranges, BMI health risks, body mass index guide, BMI categories explained, BMI limitations, BMI alternatives, health assessment BMI"
        canonical="/bmi-guide"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Complete BMI Guide 2025 - How to Calculate, Understand & Use BMI Effectively",
          "description": "Comprehensive guide to BMI calculation, interpretation, and health implications with expert tips and alternatives.",
          "author": {
            "@type": "Organization",
            "name": "BMI Calculator Online"
          },
          "publisher": {
            "@type": "Organization",
            "name": "BMI Calculator Online"
          },
          "datePublished": "2025-01-13",
          "dateModified": "2025-01-13",
          "articleSection": "Health & Wellness"
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Complete BMI Guide 2025
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-indigo-400 to-purple-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-indigo-400 to-purple-500' :
            'bg-gradient-to-r from-indigo-400 to-purple-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Master BMI calculation and interpretation</strong> with our comprehensive guide. 
            Learn how to calculate BMI accurately, understand health implications, and use BMI effectively for wellness planning.
          </p>
        </div>

        {/* Guide Topics Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {guideTopics.map((topic, index) => (
            <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transition-all duration-300 hover:scale-105 ${
              theme === 'white' 
                ? 'bg-white/80 hover:bg-white/90 border-indigo-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-indigo-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-indigo-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-xl ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <div className={`transition-colors duration-300 ${
                    theme === 'white' ? 'text-indigo-600' : 'text-indigo-400'
                  }`}>
                    {topic.icon}
                  </div>
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {topic.description}
                </p>
                <ul className="space-y-2">
                  {topic.content.map((item, itemIndex) => (
                    <li key={itemIndex} className={`text-sm flex items-start gap-2 ${
                      theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                    }`}>
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        theme === 'white' ? 'bg-indigo-500' : 'bg-indigo-400'
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expert Tips Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <Card className={`backdrop-blur-md border-0 shadow-xl ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50'
              : 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <BookOpen className={`h-8 w-8 ${
                  theme === 'white' ? 'text-indigo-600' : 'text-indigo-400'
                }`} />
                Expert BMI Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {expertTips.map((tip, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                    theme === 'white' ? 'bg-white/60' : 'bg-gray-800/60'
                  }`}>
                    <span className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      theme === 'white' ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <p className={`${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <Card className={`backdrop-blur-md border-0 shadow-2xl max-w-2xl mx-auto ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50'
              : 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Calculate Your BMI?
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Apply what you've learned with our advanced BMI calculator suite
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                  }`}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate BMI Now
                  </Button>
                </Link>
                <Link to="/smart-bmi">
                  <Button variant="outline" className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-indigo-300 text-indigo-700 hover:bg-indigo-50'
                      : 'border-indigo-500/50 text-indigo-300 hover:bg-indigo-900/20'
                  }`}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Try Smart BMI
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BMIGuidePage;