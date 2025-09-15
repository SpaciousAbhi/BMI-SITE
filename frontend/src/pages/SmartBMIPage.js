import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, TrendingUp, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SmartBMIPage = () => {
  const { theme } = useTheme();

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
    }
  };

  const smartFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Enhanced BMI Analysis",
      description: "Advanced algorithms consider age, gender, and body composition for more accurate health insights than standard BMI calculations."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Personalized Health Recommendations", 
      description: "Get tailored advice based on your unique BMI profile, health goals, and demographic factors."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Smart Progress Tracking",
      description: "Monitor BMI changes with intelligent trend analysis and predictive health insights."
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Smart BMI Calculator 2025 - AI-Enhanced Body Mass Index Calculator with Age & Gender"
        description="Advanced Smart BMI Calculator using AI algorithms. Get accurate BMI calculations with age, gender, and body composition analysis. Free smart BMI calculator with personalized health insights and recommendations."
        keywords="smart BMI calculator, AI BMI calculator, BMI calculator with age gender, advanced BMI calculator, smart body mass index calculator, AI health calculator, personalized BMI calculator 2025"
        canonical="/smart-bmi"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Smart BMI Calculator - AI-Enhanced BMI Analysis",
          "description": "Advanced Smart BMI Calculator using AI algorithms for accurate BMI calculations with personalized health insights.",
          "url": "https://bmicalculator.com/smart-bmi",
          "applicationCategory": "HealthApplication",
          "featureList": [
            "AI-Enhanced BMI Analysis",
            "Age and Gender Consideration", 
            "Personalized Health Recommendations",
            "Smart Progress Tracking",
            "Body Composition Analysis"
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
            Smart BMI Calculator 2025
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
            'bg-gradient-to-r from-blue-400 to-purple-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>AI-Enhanced BMI Calculator</strong> with age, gender, and body composition analysis. 
            Get smarter health insights beyond traditional BMI calculations with our advanced algorithm.
          </p>
        </div>

        {/* Smart Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {smartFeatures.map((feature, index) => (
            <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
              theme === 'white' 
                ? 'bg-white/80 hover:bg-white/90 border-blue-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-blue-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-blue-500/20'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`flex justify-center mb-6 transition-colors duration-300 ${
                  theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <Card className={`backdrop-blur-md border-0 shadow-2xl max-w-2xl mx-auto ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-blue-50 to-purple-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50'
              : 'bg-gradient-to-r from-blue-900/50 to-purple-900/50'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Try Smart BMI Analysis?
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Experience the next generation of BMI calculation with AI-enhanced insights
              </p>
              <Link to="/">
                <Button className={`transition-all duration-300 hover:scale-105 transform ${
                  theme === 'white'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }`}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Start Smart BMI Calculator
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Smart BMI Calculator FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How is Smart BMI different from regular BMI?",
                a: "Smart BMI uses AI algorithms to consider age, gender, body composition, and other factors for more accurate health assessment than standard BMI calculations."
              },
              {
                q: "Is the Smart BMI Calculator free?",
                a: "Yes, our Smart BMI Calculator is completely free and provides advanced AI-enhanced health analysis with personalized recommendations."
              },
              {
                q: "How accurate is Smart BMI for athletes?",
                a: "Smart BMI is more accurate for athletes as it considers muscle mass and body composition factors that traditional BMI calculations ignore."
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

export default SmartBMIPage;