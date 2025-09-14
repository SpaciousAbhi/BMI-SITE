import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Apple, Wheat, Beef, Droplets, Zap, Clock, Scale, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NutritionGuidePage = () => {
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

  const macronutrients = [
    {
      name: 'Carbohydrates',
      icon: Wheat,
      percentage: '45-65%',
      calories: '4 cal/g',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      darkBgColor: 'bg-yellow-900/30',
      description: 'Primary energy source for your body and brain',
      sources: ['Whole grains', 'Fruits', 'Vegetables', 'Legumes', 'Sweet potatoes'],
      tips: [
        'Choose complex carbs over simple sugars',
        'Include fiber-rich options for better digestion',
        'Time carb intake around workouts for energy'
      ]
    },
    {
      name: 'Proteins',
      icon: Beef,
      percentage: '10-35%',
      calories: '4 cal/g',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      darkBgColor: 'bg-red-900/30',
      description: 'Essential for muscle building and tissue repair',
      sources: ['Lean meats', 'Fish', 'Eggs', 'Beans', 'Greek yogurt', 'Quinoa'],
      tips: [
        'Aim for protein at every meal',
        'Include both animal and plant proteins',
        'Post-workout protein helps muscle recovery'
      ]
    },
    {
      name: 'Fats',
      icon: Droplets,
      percentage: '20-35%',
      calories: '9 cal/g',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      darkBgColor: 'bg-blue-900/30',
      description: 'Important for hormone production and nutrient absorption',
      sources: ['Avocados', 'Nuts', 'Olive oil', 'Salmon', 'Seeds'],
      tips: [
        'Focus on unsaturated fats',
        'Include omega-3 fatty acids',
        'Avoid trans fats completely'
      ]
    }
  ];

  const nutritionByBMI = [
    {
      category: 'Underweight (BMI < 18.5)',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      darkBgColor: 'bg-blue-900/30',
      goal: 'Healthy Weight Gain',
      recommendations: [
        'Increase caloric intake by 300-500 calories above maintenance',
        'Focus on nutrient-dense, calorie-rich foods',
        'Include healthy fats like nuts, avocados, and olive oil',
        'Eat frequent, smaller meals throughout the day',
        'Add protein shakes or smoothies between meals'
      ]
    },
    {
      category: 'Normal Weight (BMI 18.5-24.9)',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      darkBgColor: 'bg-green-900/30',
      goal: 'Maintenance & Optimal Health',
      recommendations: [
        'Maintain current caloric intake with balanced macros',
        'Focus on whole, unprocessed foods',
        'Include variety in fruits and vegetables',
        'Stay hydrated with 8-10 glasses of water daily',
        'Practice portion control and mindful eating'
      ]
    },
    {
      category: 'Overweight (BMI 25-29.9)',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      darkBgColor: 'bg-orange-900/30',
      goal: 'Gradual Weight Loss',
      recommendations: [
        'Create a moderate caloric deficit (300-500 calories)',
        'Increase protein intake to preserve muscle mass',
        'Focus on high-fiber foods for satiety',
        'Reduce processed foods and added sugars',
        'Include regular physical activity'
      ]
    },
    {
      category: 'Obese (BMI ≥ 30)',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      darkBgColor: 'bg-red-900/30',
      goal: 'Structured Weight Loss',
      recommendations: [
        'Consult healthcare provider for personalized plan',
        'Create sustainable caloric deficit',
        'Prioritize protein to maintain muscle during weight loss',
        'Include low-calorie, nutrient-dense foods',
        'Consider meal planning and preparation'
      ]
    }
  ];

  const mealTiming = [
    {
      time: 'Breakfast',
      icon: Clock,
      description: 'Kickstart your metabolism',
      recommendations: [
        'Include protein and complex carbs',
        'Eat within 2 hours of waking',
        'Consider oatmeal, eggs, or Greek yogurt'
      ]
    },
    {
      time: 'Pre-Workout',
      icon: Zap,
      description: '30-60 minutes before exercise',
      recommendations: [
        'Light carbs for quick energy',
        'Avoid heavy or high-fat foods',
        'Banana or apple with small amount of protein'
      ]
    },
    {
      time: 'Post-Workout',
      icon: TrendingUp,
      description: 'Within 30 minutes after exercise',
      recommendations: [
        'Protein for muscle recovery',
        'Carbs to replenish glycogen',
        'Chocolate milk or protein shake work well'
      ]
    }
  ];

  const portionGuide = [
    { food: 'Protein', portion: 'Palm of your hand', example: '3-4 oz chicken breast' },
    { food: 'Vegetables', portion: 'Two cupped hands', example: '1-2 cups mixed vegetables' },
    { food: 'Carbs', portion: 'Cupped hand', example: '1/2 cup rice or 1 slice bread' },
    { food: 'Fats', portion: 'Thumb tip', example: '1 tbsp olive oil or 1/4 avocado' }
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
            <Apple className={`h-12 w-12 ${
              theme === 'white' ? 'text-teal-600' : 
              theme === 'dark' ? 'text-purple-400' : 
              'text-green-400'
            }`} />
            <h1 className={`text-4xl md:text-5xl font-bold transition-colors duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Nutrition Guide
            </h1>
          </div>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Comprehensive nutrition guidance tailored to your BMI category, with practical tips for optimal health and wellness.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Macronutrients Overview */}
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
                <Scale className={`h-6 w-6 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Macronutrients Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                {macronutrients.map((macro, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                      theme === 'white' ? macro.bgColor : macro.darkBgColor
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <macro.icon className={`h-8 w-8 ${macro.color}`} />
                      <div>
                        <h3 className={`text-xl font-bold ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {macro.name}
                        </h3>
                        <div className="flex gap-3">
                          <Badge className={`${macro.bgColor} ${macro.color}`}>
                            {macro.percentage}
                          </Badge>
                          <Badge className={`${macro.bgColor} ${macro.color}`}>
                            {macro.calories}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {macro.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className={`font-semibold mb-2 ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Good Sources:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {macro.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Pro Tips:
                      </h4>
                      <ul className={`text-xs space-y-1 ${
                        theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {macro.tips.map((tip, idx) => (
                          <li key={idx}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nutrition by BMI Category */}
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
                Nutrition by BMI Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {nutritionByBMI.map((category, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transition-all duration-300 hover:scale-[1.01] animate-slide-in ${
                      theme === 'white' ? category.bgColor : category.darkBgColor
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-bold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {category.category}
                      </h3>
                      <Badge className={`${category.bgColor} ${category.color} font-semibold`}>
                        {category.goal}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {category.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg ${
                            theme === 'white' ? 'bg-white/50' : 'bg-black/20'
                          }`}
                        >
                          <p className={`text-sm ${
                            theme === 'white' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            • {rec}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meal Timing & Portion Guide */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Meal Timing */}
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
                  <Clock className={`h-5 w-5 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Meal Timing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mealTiming.map((meal, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                      theme === 'white' ? 'bg-teal-50' : 
                      theme === 'dark' ? 'bg-purple-900/30' : 
                      'bg-green-900/30'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <meal.icon className={`h-5 w-5 ${
                        theme === 'white' ? 'text-teal-600' : 
                        theme === 'dark' ? 'text-purple-400' : 
                        'text-green-400'
                      }`} />
                      <h4 className={`font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {meal.time}
                      </h4>
                    </div>
                    <p className={`text-sm mb-3 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {meal.description}
                    </p>
                    <ul className={`text-xs space-y-1 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {meal.recommendations.map((rec, idx) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Portion Guide */}
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
                  <Scale className={`h-5 w-5 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Portion Control Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {portionGuide.map((portion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                      theme === 'white' ? 'bg-gray-50' : 
                      theme === 'dark' ? 'bg-gray-700/50' : 
                      'bg-gray-900/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-semibold ${
                          theme === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {portion.food}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {portion.portion}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {portion.example}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Important Notes */}
          <Card className={`backdrop-blur-md border-0 shadow-xl glass-effect animate-fade-in ${
            theme === 'white' 
              ? 'bg-orange-50/80 border-orange-200/20' 
              : theme === 'dark'
              ? 'bg-orange-900/20 border-orange-500/20'
              : 'bg-orange-900/30 border-orange-500/20'
          }`}>
            <CardContent className="py-6">
              <div className="flex items-start gap-3">
                <AlertCircle className={`h-6 w-6 mt-1 flex-shrink-0 ${
                  theme === 'white' ? 'text-orange-600' : 'text-orange-400'
                }`} />
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${
                    theme === 'white' ? 'text-orange-800' : 'text-orange-200'
                  }`}>
                    Important Nutrition Notes
                  </h3>
                  <ul className={`text-sm space-y-2 ${
                    theme === 'white' ? 'text-orange-700' : 'text-orange-300'
                  }`}>
                    <li>• Individual nutrition needs vary based on age, gender, activity level, and health conditions</li>
                    <li>• These recommendations are general guidelines - consult a registered dietitian for personalized advice</li>
                    <li>• Stay hydrated by drinking at least 8-10 glasses of water daily</li>
                    <li>• Focus on whole, minimally processed foods whenever possible</li>
                    <li>• Listen to your body's hunger and fullness cues</li>
                  </ul>
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
                  Ready to Apply These Nutrition Principles?
                </h3>
                <p className={`mb-6 ${
                  theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Calculate your BMI to get personalized nutrition recommendations based on your current health status.
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
                    <Link to="/health-tips">Health Tips</Link>
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

export default NutritionGuidePage;