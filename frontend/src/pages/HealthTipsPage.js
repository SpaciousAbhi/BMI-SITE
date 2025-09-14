import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Activity, Utensils, Moon, Droplets, Brain, Shield, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HealthTipsPage = () => {
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

  const healthTips = [
    {
      category: 'Exercise & Fitness',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      tips: [
        { title: 'Start Small', description: 'Begin with 10-15 minutes of daily activity and gradually increase.' },
        { title: 'Mix Cardio & Strength', description: 'Combine cardiovascular exercise with resistance training for optimal results.' },
        { title: 'Stay Consistent', description: 'Regular moderate exercise is better than occasional intense workouts.' },
        { title: 'Listen to Your Body', description: 'Rest when needed and avoid overexertion to prevent injuries.' },
        { title: 'Find Activities You Enjoy', description: 'You\'re more likely to stick with exercises that are fun and engaging.' }
      ]
    },
    {
      category: 'Nutrition & Diet',
      icon: Utensils,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      tips: [
        { title: 'Eat the Rainbow', description: 'Include colorful fruits and vegetables to ensure varied nutrient intake.' },
        { title: 'Portion Control', description: 'Use smaller plates and listen to hunger cues to avoid overeating.' },
        { title: 'Stay Hydrated', description: 'Drink 8-10 glasses of water daily for optimal body function.' },
        { title: 'Limit Processed Foods', description: 'Choose whole, unprocessed foods whenever possible.' },
        { title: 'Plan Your Meals', description: 'Meal planning helps maintain healthy eating habits and saves time.' }
      ]
    },
    {
      category: 'Mental Health',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      tips: [
        { title: 'Practice Mindfulness', description: 'Spend 5-10 minutes daily in meditation or deep breathing exercises.' },
        { title: 'Stay Connected', description: 'Maintain relationships with family and friends for emotional support.' },
        { title: 'Set Boundaries', description: 'Learn to say no and protect your mental energy from stress.' },
        { title: 'Seek Help When Needed', description: 'Don\'t hesitate to consult professionals for mental health support.' },
        { title: 'Practice Gratitude', description: 'Keep a gratitude journal to focus on positive aspects of life.' }
      ]
    },
    {
      category: 'Sleep & Recovery',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      tips: [
        { title: 'Consistent Sleep Schedule', description: 'Go to bed and wake up at the same time every day.' },
        { title: 'Create a Sleep Sanctuary', description: 'Keep your bedroom cool, dark, and quiet for better sleep quality.' },
        { title: 'Limit Screen Time', description: 'Avoid screens 1-2 hours before bedtime to improve sleep.' },
        { title: 'Wind Down Routine', description: 'Develop a relaxing pre-sleep routine to signal your body it\'s time to rest.' },
        { title: 'Quality Over Quantity', description: 'Focus on deep, restorative sleep rather than just hours in bed.' }
      ]
    },
    {
      category: 'Hydration',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      tips: [
        { title: 'Start Your Day with Water', description: 'Drink a glass of water immediately after waking up.' },
        { title: 'Carry a Water Bottle', description: 'Keep water accessible throughout the day for regular hydration.' },
        { title: 'Monitor Urine Color', description: 'Pale yellow indicates good hydration levels.' },
        { title: 'Eat Water-Rich Foods', description: 'Include fruits and vegetables with high water content in your diet.' },
        { title: 'Set Hydration Reminders', description: 'Use apps or alarms to remind yourself to drink water regularly.' }
      ]
    },
    {
      category: 'Preventive Care',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      tips: [
        { title: 'Regular Check-ups', description: 'Schedule annual health screenings and follow preventive care guidelines.' },
        { title: 'Know Your Numbers', description: 'Monitor blood pressure, cholesterol, and blood sugar levels regularly.' },
        { title: 'Stay Up-to-Date with Vaccines', description: 'Follow vaccination schedules recommended by healthcare providers.' },
        { title: 'Practice Good Hygiene', description: 'Regular handwashing and dental care prevent many health issues.' },
        { title: 'Listen to Your Body', description: 'Pay attention to changes and consult healthcare providers when concerned.' }
      ]
    }
  ];

  const quickTips = [
    { icon: Target, tip: 'Set realistic, achievable health goals', category: 'Goal Setting' },
    { icon: Clock, tip: 'Take breaks every hour if you have a desk job', category: 'Workplace Health' },
    { icon: Heart, tip: 'Practice deep breathing during stressful moments', category: 'Stress Management' },
    { icon: Activity, tip: 'Take the stairs instead of elevators when possible', category: 'Daily Activity' }
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
            <Heart className={`h-12 w-12 ${
              theme === 'white' ? 'text-teal-600' : 
              theme === 'dark' ? 'text-purple-400' : 
              'text-green-400'
            }`} />
            <h1 className={`text-4xl md:text-5xl font-bold transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Health Tips
            </h1>
          </div>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Evidence-based tips and strategies to help you maintain optimal health and wellness in all aspects of life.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Quick Tips */}
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
                <Target className={`h-6 w-6 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Quick Daily Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {quickTips.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                      theme === 'white' ? 'bg-teal-50' : 
                      theme === 'dark' ? 'bg-purple-900/30' : 
                      'bg-green-900/30'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className={`h-6 w-6 flex-shrink-0 ${
                      theme === 'white' ? 'text-teal-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {item.tip}
                      </p>
                      <Badge variant="secondary" className={`text-xs mt-1 ${
                        theme === 'white' ? 'bg-teal-100 text-teal-800' :
                        theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                        'bg-green-900/50 text-green-200'
                      }`}>
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Tips Categories */}
          <div className="grid gap-8">
            {healthTips.map((category, categoryIndex) => (
              <Card 
                key={categoryIndex}
                className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-scale-in ${
                  theme === 'white' 
                    ? 'bg-white/80 border-teal-200/20' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80 border-purple-500/20'
                    : 'bg-black/80 border-green-500/20'
                }`}
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <category.icon className={`h-6 w-6 ${
                      theme === 'white' ? 'text-teal-600' : 
                      theme === 'dark' ? 'text-purple-400' : 
                      'text-green-400'
                    }`} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tips.map((tip, tipIndex) => (
                      <div
                        key={tipIndex}
                        className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                          theme === 'white' ? 'bg-white/50 border-gray-200' : 
                          theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 
                          'bg-gray-900/50 border-gray-700'
                        }`}
                        style={{ animationDelay: `${(categoryIndex * 200) + (tipIndex * 50)}ms` }}
                      >
                        <h4 className={`font-semibold mb-2 ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {tip.title}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-fade-in ${
            theme === 'white' 
              ? 'bg-orange-50/80 border-orange-200/20' 
              : theme === 'dark'
              ? 'bg-orange-900/20 border-orange-500/20'
              : 'bg-orange-900/30 border-orange-500/20'
          }`}>
            <CardContent className="py-6">
              <div className="flex items-start gap-3">
                <Shield className={`h-6 w-6 mt-1 flex-shrink-0 ${
                  theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                }`} />
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${
                    theme === 'white' ? 'text-orange-800' : 'text-orange-200'
                  }`}>
                    Important Health Disclaimer
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'white' ? 'text-orange-700' : 'text-orange-300'
                  }`}>
                    These health tips are for educational purposes only and should not replace professional medical advice. 
                    Always consult with healthcare providers before making significant changes to your diet, exercise routine, 
                    or lifestyle, especially if you have pre-existing health conditions or concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  Start Your Health Journey Today
                </h3>
                <p className={`mb-6 ${
                  theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Calculate your BMI and get personalized health recommendations to begin your wellness journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    <Link to="/">Calculate BMI</Link>
                  </Button>
                  
                  <Button 
                    asChild
                    variant="outline"
                    className={`px-8 py-3 transform hover:scale-105 transition-all duration-300 ${
                      theme === 'white' 
                        ? 'border-teal-200 text-teal-700 hover:bg-teal-50' 
                        : theme === 'dark'
                        ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
                        : 'border-green-500/30 text-green-300 hover:bg-green-500/10'
                    }`}
                  >
                    <Link to="/nutrition-guide">Nutrition Guide</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthTipsPage;