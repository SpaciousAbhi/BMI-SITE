import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Heart, TrendingUp, Calculator, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BMIForChildrenPage = () => {
  const { theme } = useTheme();

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-green-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50';
    }
  };

  const ageGroups = [
    {
      age: "2-5 Years",
      considerations: "Rapid growth phase, BMI percentiles more important than absolute values",
      normalRange: "BMI-for-age 5th-85th percentile"
    },
    {
      age: "6-11 Years", 
      considerations: "School age growth patterns, establishing healthy habits",
      normalRange: "BMI-for-age 5th-85th percentile"
    },
    {
      age: "12-19 Years",
      considerations: "Puberty growth spurts, body composition changes",
      normalRange: "BMI-for-age 5th-85th percentile"
    }
  ];

  const childrenFeatures = [
    {
      icon: <Baby className="h-8 w-8" />,
      title: "Age-Adjusted BMI Percentiles",
      description: "Children's BMI is interpreted differently using age and gender-specific percentile charts rather than adult BMI categories."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Pattern Tracking", 
      description: "Monitor healthy growth patterns over time rather than focusing on single BMI measurements for developing children."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Pediatric Health Focus",
      description: "Emphasis on healthy nutrition and physical activity rather than weight loss for growing children and teenagers."
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="BMI Calculator for Children - Pediatric BMI Percentiles & Child BMI Chart 2025"
        description="Free BMI calculator for children and teens (2-19 years). Calculate pediatric BMI percentiles with age and gender charts. Understand healthy BMI ranges for kids, growth tracking, and child obesity assessment."
        keywords="BMI calculator for children, child BMI calculator, pediatric BMI calculator, kids BMI calculator, BMI percentiles children, child BMI chart, teenage BMI calculator, youth BMI calculator, children obesity calculator"
        canonical="/bmi-for-children"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "BMI Calculator for Children - Pediatric BMI Percentiles",
          "description": "Specialized BMI calculator for children and teenagers with age-adjusted percentile charts and growth tracking.",
          "url": "https://bmicalculator.com/bmi-for-children",
          "applicationCategory": "HealthApplication",
          "audience": {
            "@type": "Audience",
            "audienceType": "Parents, Pediatricians, Child health professionals"
          },
          "featureList": [
            "Age-adjusted BMI percentiles",
            "Pediatric growth charts",
            "Child obesity assessment",
            "Healthy growth tracking",
            "Teen BMI calculation"
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
            BMI Calculator for Children
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-green-400 to-blue-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-green-400 to-blue-500' :
            'bg-gradient-to-r from-green-400 to-blue-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <strong>Pediatric BMI Calculator</strong> with age-adjusted percentiles for children and teens (2-19 years). 
            Track healthy growth patterns using CDC BMI charts for kids and teenagers.
          </p>
        </div>

        {/* Children Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {childrenFeatures.map((feature, index) => (
            <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
              theme === 'white' 
                ? 'bg-white/80 hover:bg-white/90 border-green-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 hover:bg-gray-800/90 border-green-500/20'
                : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
            }`}>
              <CardContent className="p-8 text-center">
                <div className={`flex justify-center mb-6 transition-colors duration-300 ${
                  theme === 'white' ? 'text-green-600' : 'text-green-400'
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

        {/* Age Groups Section */}
        <div className="mb-12 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            BMI Guidelines by Age Group
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ageGroups.map((group, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-lg ${
                theme === 'white' 
                  ? 'bg-gradient-to-br from-green-50 to-blue-50' 
                  : theme === 'dark'
                  ? 'bg-gradient-to-br from-green-900/50 to-blue-900/50'
                  : 'bg-gradient-to-br from-green-900/50 to-blue-900/50'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {group.age}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className={`font-semibold ${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                        Healthy Range: 
                      </span>
                      <span className={`ml-2 text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {group.normalRange}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {group.considerations}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-12 max-w-4xl mx-auto">
          <Card className={`backdrop-blur-md border-0 shadow-xl ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30'
              : 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30'
          }`}>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Shield className={`h-8 w-8 mt-1 flex-shrink-0 ${
                  theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'
                }`} />
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Important: Children's BMI Interpretation
                  </h3>
                  <p className={`mb-4 ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                    Children's BMI is interpreted differently than adults. Always consult with a pediatrician 
                    for proper assessment of your child's growth and health status.
                  </p>
                  <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <strong>BMI Percentile Categories for Children:</strong><br/>
                    • Underweight: Less than 5th percentile<br/>
                    • Healthy weight: 5th-85th percentile<br/>
                    • Overweight: 85th-95th percentile<br/>
                    • Obese: 95th percentile or greater
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <Card className={`backdrop-blur-md border-0 shadow-2xl max-w-2xl mx-auto ${
            theme === 'white' 
              ? 'bg-gradient-to-r from-green-50 to-blue-50' 
              : theme === 'dark'
              ? 'bg-gradient-to-r from-green-900/50 to-blue-900/50'
              : 'bg-gradient-to-r from-green-900/50 to-blue-900/50'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Calculate Your Child's BMI
              </h2>
              <p className={`mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Use our pediatric BMI calculator with age-adjusted percentiles for accurate assessment
              </p>
              <Link to="/">
                <Button className={`transition-all duration-300 hover:scale-105 transform ${
                  theme === 'white'
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                }`}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Start Children BMI Calculator
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
            Children BMI Calculator - FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How is children's BMI different from adults?",
                a: "Children's BMI uses age and gender-specific percentile charts instead of fixed categories. A child's BMI is compared to other children of the same age and gender to determine if they're in a healthy range."
              },
              {
                q: "What age can I start using BMI for my child?",
                a: "BMI can be calculated for children as young as 2 years old. However, BMI percentiles are most meaningful for children 2-19 years old. For younger children, other growth measurements may be more appropriate."
              },
              {
                q: "Should I be concerned if my child's BMI is high?",
                a: "High BMI in children should be discussed with a pediatrician. Unlike adults, children are still growing, so the focus should be on healthy eating habits and physical activity rather than weight loss."
              },
              {
                q: "How often should I check my child's BMI?",
                a: "BMI should be monitored during regular pediatric checkups, typically annually. Frequent BMI checking is not necessary and may create unhealthy focus on weight rather than overall health and growth patterns."
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

export default BMIForChildrenPage;