import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Flame, 
  Calculator, 
  Timer, 
  Activity,
  User,
  Users,
  TrendingUp,
  Target,
  Zap,
  Award,
  Search,
  Heart,
  Brain,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  BarChart3,
  PlayCircle,
  Clock
} from 'lucide-react';
import { 
  getActivityCategories, 
  getActivitiesByCategory,
  calculateCaloriesBurned,
  getWeightLossProjections,
  getHealthBenefits
} from '../utils/caloriesBurnedCalculations';

const CaloriesBurnedCalculatorPage = () => {
  const { theme, getBackgroundGradient } = useTheme();
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'lbs',
    duration: '',
    durationUnit: 'minutes',
    selectedCategory: 'cardio',
    selectedActivity: null
  });
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({ 
      ...prev, 
      selectedCategory: category,
      selectedActivity: null 
    }));
  };

  const handleActivitySelect = (activity) => {
    setFormData(prev => ({ ...prev, selectedActivity: activity }));
  };

  const calculateCalories = () => {
    if (!formData.weight || !formData.duration || !formData.selectedActivity) return;

    const caloriesResult = calculateCaloriesBurned(
      parseFloat(formData.weight),
      formData.weightUnit,
      formData.selectedActivity,
      parseFloat(formData.duration),
      formData.durationUnit
    );

    setResult(caloriesResult);
  };

  const clearForm = () => {
    setFormData({
      weight: '',
      weightUnit: 'lbs',
      duration: '',
      durationUnit: 'minutes',
      selectedCategory: 'cardio',
      selectedActivity: null
    });
    setResult(null);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const professionalBadges = [
    { icon: <Flame className="h-4 w-4" />, text: "200+ Activities Database" },
    { icon: <Calculator className="h-4 w-4" />, text: "MET-Based Calculations" },
    { icon: <Target className="h-4 w-4" />, text: "Weight Loss Projections" },
    { icon: <Award className="h-4 w-4" />, text: "Health Benefits Analysis" },
    { icon: <Brain className="h-4 w-4" />, text: "Science-Based Metabolics" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Performance Optimization" }
  ];

  const categories = getActivityCategories();
  const allActivities = getActivitiesByCategory();

  // Filter activities based on search term
  const getFilteredActivities = (categoryId) => {
    const activities = allActivities[categoryId] || [];
    if (!searchTerm) return activities;
    return activities.filter(activity => 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get all activities for search across categories
  const getAllActivities = () => {
    const all = [];
    Object.keys(allActivities).forEach(categoryId => {
      allActivities[categoryId].forEach(activity => {
        all.push({ ...activity, category: categoryId });
      });
    });
    return all;
  };

  const searchActivities = () => {
    if (!searchTerm) return [];
    return getAllActivities().filter(activity =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  };

  // Quick Navigation Menu
  const navigationMenu = [
    { id: 'metabolism-science', label: 'Metabolism Science', icon: <Brain className="h-4 w-4" /> },
    { id: 'met-analysis', label: 'MET Analysis', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'activity-guide', label: 'Activity Guide', icon: <Target className="h-4 w-4" /> },
    { id: 'optimization-strategies', label: 'Optimization', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'expert-faq', label: 'Expert FAQ', icon: <BookOpen className="h-4 w-4" /> }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="World's Best Calories Burned Calculator - Professional Activity Calorie Calculator 2025"
        description="Calculate calories burned with the world's most comprehensive activity calculator. Features 200+ activities, MET-based calculations, weight loss projections, and professional metabolic insights for optimal fitness results."
        keywords="calories burned calculator, exercise calorie calculator, activity calorie burn, calories burned running, calories burned walking, MET calculator, weight loss calculator, metabolic rate calculator, exercise physiology, calorie burn rate, fitness tracker"
        canonical="/calories-burned-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebApplication", "MedicalWebPage"],
          "name": "Professional Calories Burned Calculator - World's Most Comprehensive Activity Database",
          "description": "The world's most advanced calories burned calculator with 200+ activities, scientific MET values, and professional metabolic insights.",
          "url": "https://bmicalculator.com/calories-burned-calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "medicalSpecialty": ["Exercise Physiology", "Sports Medicine", "Nutrition"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "200+ activities with verified MET values",
            "Scientific calorie calculations based on body weight", 
            "Weight loss projections and timelines",
            "Health benefits analysis by intensity",
            "Activity search and filtering system",
            "Food equivalent comparisons",
            "Professional metabolic insights"
          ],
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate are MET-based calorie calculations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MET-based calculations are highly accurate for population averages, typically within 10-20% of actual calorie burn. Individual variations occur due to fitness level, body composition, exercise efficiency, and environmental factors."
                }
              },
              {
                "@type": "Question", 
                "name": "Which activities burn the most calories per hour?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "High-intensity activities like running (10+ mph), swimming butterfly stroke, CrossFit, and boxing can burn 600-1000+ calories per hour for a 150-pound person, depending on intensity and individual factors."
                }
              }
            ]
          }
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              theme === 'white' ? 'bg-gradient-to-br from-orange-100 to-red-100' :
              theme === 'dark' ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50' :
              'bg-gradient-to-br from-orange-900/50 to-red-900/50'
            }`}>
              <Flame className={`h-12 w-12 ${
                theme === 'white' ? 'text-orange-600' :
                theme === 'dark' ? 'text-orange-400' :
                'text-red-400'
              }`} />
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional Calories Burned Calculator
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            The world's most comprehensive calorie burn calculator with scientific MET values for 200+ activities. 
            Get accurate calculations, weight loss projections, and professional metabolic insights for optimal fitness results.
          </p>

          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {professionalBadges.map((badge, index) => (
              <Badge 
                key={index}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  theme === 'white' 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700'
                    : 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
                }`}
              >
                {badge.icon}
                <span className="ml-2">{badge.text}</span>
              </Badge>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {navigationMenu.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 hover:scale-105 ${
                  theme === 'white'
                    ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
                    : 'border-orange-500/30 text-orange-400 hover:bg-orange-900/20'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Calculator Section */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <Card className={`backdrop-blur-md border-0 shadow-2xl ${
              theme === 'white' 
                ? 'bg-white/95' 
                : theme === 'dark'
                ? 'bg-gray-800/95 border border-red-500/20'
                : 'bg-gray-900/95 border border-red-500/20'
            }`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className={`text-2xl font-bold mb-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Calculate Professional Calorie Burn
                  </h2>
                  <p className={`${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Enter your details and select from 200+ activities for accurate calorie calculations
                  </p>
                </div>

                {/* Input Form */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Personal Information
                    </h3>
                    
                    {/* Weight */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <User className="inline h-4 w-4 mr-2" />
                        Weight
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter weight"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                        />
                        <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange('weightUnit', value)}>
                          <SelectTrigger className={`w-20 ${theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lbs">lbs</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Timer className="inline h-4 w-4 mr-2" />
                        Duration
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter duration"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                        />
                        <Select value={formData.durationUnit} onValueChange={(value) => handleInputChange('durationUnit', value)}>
                          <SelectTrigger className={`w-24 ${theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">min</SelectItem>
                            <SelectItem value="hours">hrs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Activity Search */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Find Activity
                    </h3>
                    
                    {/* Search Bar */}
                    <div className="space-y-2">
                      <Label className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
                        <Search className="inline h-4 w-4 mr-2" />
                        Search Activities
                      </Label>
                      <Input
                        type="text"
                        placeholder="Search for activities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={theme === 'white' ? 'border-gray-300' : 'bg-gray-700 border-gray-600 text-white'}
                      />
                    </div>

                    {/* Selected Activity Display */}
                    {formData.selectedActivity && (
                      <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                        <div className="font-semibold text-gray-900">{formData.selectedActivity.name}</div>
                        <div className="text-sm text-gray-600">
                          MET: {formData.selectedActivity.met} | Intensity: {formData.selectedActivity.intensity}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Results */}
                {searchTerm && (
                  <div className="mb-8">
                    <h4 className={`font-semibold mb-4 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Search Results ({searchActivities().length} found)
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                      {searchActivities().map((activity, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleActivitySelect(activity)}
                          className={`text-left justify-start h-auto p-3 ${
                            formData.selectedActivity?.name === activity.name
                              ? 'ring-2 ring-orange-500 bg-orange-50'
                              : ''
                          }`}
                        >
                          <div>
                            <div className="font-medium">{activity.name}</div>
                            <div className="text-xs text-gray-500">
                              MET: {activity.met} | {activity.intensity}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Categories */}
                {!searchTerm && (
                  <div className="mb-8">
                    <h4 className={`font-semibold mb-4 ${theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
                      Browse by Category
                    </h4>
                    
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          variant={formData.selectedCategory === category.id ? "default" : "outline"}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`${
                            formData.selectedCategory === category.id
                              ? 'bg-orange-600 hover:bg-orange-700 text-white'
                              : ''
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </Button>
                      ))}
                    </div>

                    {/* Activities in Selected Category */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getFilteredActivities(formData.selectedCategory).map((activity, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleActivitySelect(activity)}
                          className={`text-left justify-start h-auto p-3 ${
                            formData.selectedActivity?.name === activity.name
                              ? 'ring-2 ring-orange-500 bg-orange-50'
                              : ''
                          }`}
                        >
                          <div>
                            <div className="font-medium">{activity.name}</div>
                            <div className="text-xs text-gray-500">
                              MET: {activity.met} | {activity.intensity}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Calculate Button */}
                <div className="flex gap-4">
                  <Button
                    onClick={calculateCalories}
                    disabled={!formData.weight || !formData.duration || !formData.selectedActivity}
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white'
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white'
                        : theme === 'dark'
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white'
                        : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
                    }`}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Professional Calories
                  </Button>
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className={`px-6 py-3 transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'white'
                        ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Clear
                  </Button>
                </div>

                {/* Results */}
                {result && (
                  <div className="mt-8 space-y-6">
                    {/* Main Results */}
                    <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">Professional Calorie Burn Analysis</h3>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                          <div className="text-3xl font-bold text-orange-600">{result.calories}</div>
                          <div className="text-sm text-gray-600">Total Calories</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                          <div className="text-2xl font-bold text-red-600">{result.caloriesPerMinute}</div>
                          <div className="text-sm text-gray-600">Per Minute</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                          <div className="text-2xl font-bold text-pink-600">{result.met}</div>
                          <div className="text-sm text-gray-600">MET Value</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                          <div className="text-lg font-bold text-purple-600">{result.intensity}</div>
                          <div className="text-sm text-gray-600">Intensity</div>
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="font-semibold">15 Minutes</div>
                          <div className="text-orange-600">{result.breakdown.per15min} calories</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">30 Minutes</div>
                          <div className="text-orange-600">{result.breakdown.per30min} calories</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">1 Hour</div>
                          <div className="text-orange-600">{result.breakdown.perHour} calories</div>
                        </div>
                      </div>

                      {/* Food Equivalents */}
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900">Food Equivalents</h4>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                          {result.breakdown.equivalents.slice(0, 6).map((equiv, index) => (
                            <div key={index} className="text-center p-2 bg-white rounded">
                              <div className="font-medium">{equiv.quantity}</div>
                              <div className="text-gray-600">{equiv.food}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Weight Loss Projections */}
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        Weight Loss Projections (If Done Regularly)
                      </h4>
                      {['3_times_week', '5_times_week', 'daily'].map(frequency => {
                        const projection = getWeightLossProjections(result.calories, frequency);
                        const frequencyLabel = frequency === '3_times_week' ? '3x/week' : 
                                             frequency === '5_times_week' ? '5x/week' : 'Daily';
                        return (
                          <div key={frequency} className="mb-3 p-3 bg-white rounded-lg">
                            <div className="font-medium text-gray-900">{frequencyLabel}</div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Weekly:</span>
                                <span className="font-semibold text-green-600 ml-2">{projection.weekly} lbs</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Monthly:</span>
                                <span className="font-semibold text-green-600 ml-2">{projection.monthly} lbs</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Yearly:</span>
                                <span className="font-semibold text-green-600 ml-2">{projection.yearly} lbs</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <p className="text-xs text-gray-600 mt-2">
                        *Projections based on exercise alone. Combine with healthy diet for best results.
                      </p>
                    </div>

                    {/* Health Benefits */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-blue-500" />
                        Health Benefits
                      </h4>
                      {Object.entries(getHealthBenefits(result.intensity, parseFloat(formData.duration))).map(([system, benefits]) => (
                        <div key={system} className="mb-3">
                          <div className="font-medium text-gray-900 capitalize">{system.replace('_', ' ')}:</div>
                          <ul className="text-sm text-gray-700 ml-4">
                            {benefits.slice(0, 2).map((benefit, index) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Metabolism Science Deep-Dive */}
        <section id="metabolism-science" className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                The Science of Calorie Burn & Metabolism
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
                Understanding the physiological mechanisms behind energy expenditure and metabolic efficiency during physical activity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Energy Systems & ATP Production",
                  icon: <Zap className="h-6 w-6" />,
                  summary: "Your body uses three distinct energy systems to produce ATP, each contributing differently based on exercise intensity and duration.",
                  details: [
                    "Phosphocreatine System: Immediate energy (0-15 seconds), highest power output",
                    "Glycolytic System: Short-term energy (15 seconds-2 minutes), moderate efficiency", 
                    "Oxidative System: Long-term energy (2+ minutes), highest efficiency but lower power",
                    "MET values represent the oxidative system's steady-state energy cost"
                  ]
                },
                {
                  title: "Substrate Utilization & RER",
                  icon: <Target className="h-6 w-6" />,
                  summary: "The respiratory exchange ratio (RER) determines whether you're burning primarily fats or carbohydrates during exercise.",
                  details: [
                    "RER 0.7: 100% fat oxidation, typically at rest and low-intensity exercise",
                    "RER 0.85: Mixed substrate utilization, moderate-intensity aerobic exercise",
                    "RER 1.0: 100% carbohydrate oxidation, high-intensity anaerobic exercise",
                    "Training adaptations shift the crossover point, improving fat oxidation capacity"
                  ]
                },
                {
                  title: "Thermic Effect & NEAT",
                  icon: <Flame className="h-6 w-6" />,
                  summary: "Beyond exercise calories, your body increases energy expenditure through thermic effects and non-exercise activity thermogenesis.",
                  details: [
                    "Exercise Post-Oxygen Consumption (EPOC): 5-15% additional calories for 24-48 hours",
                    "NEAT increases: Fidgeting, posture maintenance, spontaneous muscle activity",
                    "Thermic effect of food: 8-10% of total daily energy expenditure",
                    "Brown adipose tissue activation in cold exposure can increase calorie burn significantly"
                  ]
                },
                {
                  title: "Individual Variation Factors",
                  icon: <Users className="h-6 w-6" />,
                  summary: "Calorie burn varies significantly between individuals due to genetic, physiological, and environmental factors.",
                  details: [
                    "Body composition: Muscle tissue burns 6-7 cal/kg/hr vs fat tissue at 2-3 cal/kg/hr",
                    "Genetic polymorphisms affect metabolic efficiency by 10-15%",
                    "Training status: Trained individuals are more mechanically efficient (lower calorie burn)",
                    "Environmental factors: Temperature, altitude, humidity affect energy cost"
                  ]
                }
              ].map((science, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-orange-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-orange-500/20'
                  }`}
                  onClick={() => toggleSection(`metabolism-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        theme === 'white' ? 'bg-orange-100 text-orange-600' :
                        theme === 'dark' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-orange-900/50 text-orange-400'
                      }`}>
                        {science.icon}
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {science.title}
                      </h3>
                      {expandedSection === `metabolism-${index}` ? 
                        <ChevronUp className="h-5 w-5 ml-auto" /> : 
                        <ChevronDown className="h-5 w-5 ml-auto" />
                      }
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {science.summary}
                    </p>

                    {expandedSection === `metabolism-${index}` && (
                      <div className="space-y-3">
                        {science.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className={`text-sm ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expert FAQ Section */}
        <section id="expert-faq" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Expert Calorie Burn FAQ
              </h2>
              <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Professional insights from exercise physiologists and metabolic specialists
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  category: "Scientific Accuracy",
                  question: "How accurate are MET-based calorie calculations compared to lab testing?",
                  answer: "MET-based calculations are highly accurate for population averages, typically within 10-20% of indirect calorimetry results. Individual variations occur due to mechanical efficiency, fitness level, body composition, and genetic factors. For most people, MET calculations provide reliable estimates for tracking trends and comparing activities, though direct measurement via metabolic cart remains the gold standard."
                },
                {
                  category: "Calorie Burn Optimization", 
                  question: "Which factors have the biggest impact on maximizing calories burned during exercise?",
                  answer: "Exercise intensity has the greatest impact - doubling intensity can triple calorie burn. Body weight is linear (heavier = more calories). Duration scales proportionally. Adding resistance or incline increases energy cost by 20-40%. High-intensity intervals create EPOC effects lasting 24-48 hours. Muscle-building activities increase resting metabolic rate long-term. Cold environment training can increase calorie burn by 15-30%."
                },
                {
                  category: "Individual Variation",
                  question: "Why do some people burn more calories than others doing the same activity?",
                  answer: "Several factors create 20-30% variation between individuals: Body composition (muscle burns more calories), mechanical efficiency (trained athletes are more efficient), genetic polymorphisms in metabolic enzymes, thermoregulation efficiency, movement economy, and substrate utilization preferences. Larger individuals burn more calories due to greater mass to move, while trained individuals may burn fewer calories due to improved efficiency."
                },
                {
                  category: "Activity Selection",
                  question: "What are the most effective activities for sustained weight loss?",
                  answer: "Activities you can sustain long-term are most effective. High-calorie options include running, swimming, cycling, and rowing (8-15 METs). Weight training builds muscle, increasing resting metabolic rate. HIIT provides excellent calorie burn with time efficiency. Daily activities (walking, stairs, household tasks) contribute significantly to total energy expenditure. The best approach combines enjoyable activities with progressive overload and consistency."
                },
                {
                  category: "Metabolic Adaptation",
                  question: "Why does calorie burn decrease as I lose weight and get fitter?",
                  answer: "Three mechanisms reduce calorie burn: 1) Lower body weight means less energy to move the mass, 2) Improved exercise efficiency reduces energy cost of movement, 3) Adaptive thermogenesis lowers resting metabolic rate by 10-25%. Combat this with progressive overload, varied activities, strength training to preserve muscle mass, and periodic diet breaks. This adaptation is normal and expected - adjust expectations and strategies accordingly."
                },
                {
                  category: "Technology & Tracking",
                  question: "How accurate are fitness trackers for calorie burn estimation?",
                  answer: "Consumer fitness trackers typically overestimate calorie burn by 15-30%, especially for high-intensity activities. They're more accurate for walking/running (±10-15%) than strength training or sports (±20-40%). Heart rate-based estimates improve accuracy but are affected by individual HR response variations. Use trackers for trends and motivation rather than absolute values. For precision, combine multiple metrics and consider professional metabolic testing."
                }
              ].map((faq, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/90 hover:bg-white/95' 
                      : theme === 'dark'
                      ? 'bg-gray-800/90 hover:bg-gray-800/95 border border-orange-500/20'
                      : 'bg-gray-900/90 hover:bg-gray-900/95 border border-orange-500/20'
                  }`}
                  onClick={() => toggleSection(`faq-${index}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-orange-100 text-orange-700 text-xs">
                          {faq.category}
                        </Badge>
                        <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {faq.question}
                        </h3>
                      </div>
                      {expandedSection === `faq-${index}` ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </div>
                    
                    {expandedSection === `faq-${index}` && (
                      <p className={`text-sm leading-relaxed ${theme === 'white' ? 'text-gray-700' : 'text-gray-200'}`}>
                        {faq.answer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaloriesBurnedCalculatorPage;