import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Target, User, Zap, ArrowLeft, Download, X, Utensils, Info, ChevronDown, ChevronRight, Heart, Brain, Activity, TrendingUp, Clock, Dumbbell } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  calculateMacros, 
  getDietTypes,
  getMacroRecommendations,
  getFoodSuggestions,
  calculateMealPlan,
  validateMacroInputs
} from '../utils/macroCalculations';

const MacrosPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const [formData, setFormData] = useState({
    calories: '',
    weight: '',
    dietType: 'balanced',
    goal: 'maintain',
    activityLevel: 'moderately_active',
    units: 'metric', // metric or imperial
    meals: 3
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      calories: '',
      weight: '',
      dietType: 'balanced',
      goal: 'maintain',
      activityLevel: 'moderately_active',
      units: formData.units,
      meals: 3
    });
    setResult(null);
  };

  const calculateMacronutrients = async () => {
    // Validation
    const errors = validateMacroInputs(
      parseFloat(formData.calories), 
      formData.weight ? parseFloat(formData.weight) : null, 
      formData.dietType
    );
    
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors[0],
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const macroData = calculateMacros(
          parseFloat(formData.calories),
          formData.dietType,
          formData.weight ? parseFloat(formData.weight) : null,
          formData.units
        );
        
        const recommendations = getMacroRecommendations(
          macroData, 
          formData.goal, 
          formData.activityLevel, 
          25, // default age for recommendations
          'male' // default gender for recommendations
        );
        
        const mealPlan = calculateMealPlan(macroData, parseInt(formData.meals));
        
        const resultData = {
          ...macroData,
          recommendations,
          mealPlan,
          goal: formData.goal,
          activityLevel: formData.activityLevel,
          meals: parseInt(formData.meals),
          weight: formData.weight ? parseFloat(formData.weight) : null,
          units: formData.units
        };
        
        setResult(resultData);
        setLoading(false);
        
        toast({
          title: "Macros Calculated!",
          description: `${macroData.macros.protein.grams}g protein, ${macroData.macros.carbs.grams}g carbs, ${macroData.macros.fat.grams}g fat`,
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Calculation Error",
          description: "Please check your inputs and try again.",
          variant: "destructive",
        });
      }
    }, 800);
  };

  const getDietTypeInfo = (type) => {
    const dietTypes = getDietTypes();
    return dietTypes.find(d => d.type === type);
  };

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

  const MacroBar = ({ macro, percentage, color }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={theme === 'white' ? 'text-gray-700' : 'text-gray-300'}>
          {macro.charAt(0).toUpperCase() + macro.slice(1)}
        </span>
        <span className={theme === 'white' ? 'text-gray-600' : 'text-gray-400'}>
          {percentage}%
        </span>
      </div>
      <div className={`w-full rounded-full h-3 ${theme === 'white' ? 'bg-gray-200' : 'bg-gray-700'}`}>
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Free Macros Calculator | Macronutrient Calculator - Protein, Carbs, Fat"
        description="Free macros calculator for protein, carbs, and fat breakdown. Calculate macronutrients for keto, high protein, low carb, and other diet types. Personalized macro calculator with meal planning."
        keywords="macros calculator, macronutrient calculator, protein calculator, carbs calculator, keto macros, high protein diet, macro breakdown, free macros calculator, diet macros"
        canonical="/macros"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Macros Calculator - Macronutrient Calculator",
          "description": "Calculate your daily macronutrient needs with our free macros calculator. Get protein, carbs, and fat breakdown for your diet goals.",
          "url": "https://bmicalculator.com/macros", 
          "applicationCategory": "HealthApplication"
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:scale-105 ${
            theme === 'white' ? 'text-teal-600 hover:text-teal-700' : 
            theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 
            'text-green-400 hover:text-green-300'
          }`}>
            <ArrowLeft className="h-4 w-4" />
            Back to BMI Calculator
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Macro Calculator
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your ideal macronutrient breakdown (protein, carbs, fats) based on your goals and diet type.
          </p>
          
          {/* Diet Types Preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {getDietTypes().slice(0, 4).map((diet, index) => (
              <Badge 
                key={diet.type}
                variant="secondary" 
                className={`px-3 py-1 text-xs font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800' :
                  theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                  'bg-green-900/50 text-green-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {diet.emoji} {diet.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className={`backdrop-blur-md border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 glass-effect animate-scale-in ${
            theme === 'white' 
              ? 'bg-white/80 hover:bg-white/90 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 hover:bg-gray-800/90 border-purple-500/20'
              : 'bg-black/80 hover:bg-gray-900/50 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <Utensils className={`h-6 w-6 transition-colors duration-500 ${
                  theme === 'white' ? 'text-teal-600' : 
                  theme === 'dark' ? 'text-purple-400' : 
                  'text-green-400'
                }`} />
                Macro Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily Calories Input */}
              <div className="space-y-3">
                <Label htmlFor="calories" className={`flex items-center gap-2 font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  <Zap className={`h-4 w-4 ${
                    theme === 'white' ? 'text-teal-600' : 
                    theme === 'dark' ? 'text-purple-400' : 
                    'text-green-400'
                  }`} />
                  Daily Calories *
                </Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="e.g., 2000 calories"
                  value={formData.calories}
                  onChange={(e) => handleInputChange('calories', e.target.value)}
                  className={`transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                      : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                  }`}
                />
                <div className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                  💡 Use our Calorie Calculator first to find your daily needs
                </div>
              </div>

              {/* Diet Type Select */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Diet Type *
                </Label>
                <Select value={formData.dietType} onValueChange={(value) => handleInputChange('dietType', value)}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDietTypes().map((diet) => (
                      <SelectItem key={diet.type} value={diet.type}>
                        <div className="flex items-center gap-2">
                          <span>{diet.emoji}</span>
                          <div>
                            <div className="font-medium">{diet.title}</div>
                            <div className="text-xs text-gray-500">
                              P:{diet.protein}% C:{diet.carbs}% F:{diet.fat}%
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.dietType && (
                  <div className={`text-xs p-2 rounded ${
                    theme === 'white' ? 'bg-blue-50 text-blue-700' : 
                    theme === 'dark' ? 'bg-blue-900/20 text-blue-300' : 
                    'bg-blue-900/20 text-blue-300'
                  }`}>
                    <Info className="h-3 w-3 inline mr-1" />
                    {getDietTypeInfo(formData.dietType)?.description}
                  </div>
                )}
              </div>

              {/* Weight Input (Optional) */}
              <div className="space-y-3">
                <Label htmlFor="weight" className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Body Weight (Optional)
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder={formData.units === 'metric' ? 'e.g., 70 kg' : 'e.g., 154 lbs'}
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`flex-1 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200 focus:border-teal-400 focus:ring-teal-400/20' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20'
                        : 'bg-gray-900/50 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20'
                    }`}
                  />
                  <Select value={formData.units} onValueChange={(value) => handleInputChange('units', value)}>
                    <SelectTrigger className={`w-20 transition-all duration-300 hover:scale-105 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white'
                        : 'bg-gray-900/50 border-green-500/30 text-white'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">kg</SelectItem>
                      <SelectItem value="imperial">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className={`text-xs ${theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
                  For protein per body weight calculations
                </div>
              </div>

              {/* Meals Per Day */}
              <div className="space-y-3">
                <Label className={`font-medium transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Meals Per Day
                </Label>
                <Select value={formData.meals.toString()} onValueChange={(value) => handleInputChange('meals', parseInt(value))}>
                  <SelectTrigger className={`transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'white' 
                      ? 'bg-white/70 border-teal-200' 
                      : theme === 'dark'
                      ? 'bg-gray-700/50 border-purple-500/30 text-white'
                      : 'bg-gray-900/50 border-green-500/30 text-white'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 meals</SelectItem>
                    <SelectItem value="3">3 meals</SelectItem>
                    <SelectItem value="4">4 meals</SelectItem>
                    <SelectItem value="5">5 meals</SelectItem>
                    <SelectItem value="6">6 meals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={calculateMacronutrients}
                  disabled={loading}
                  className={`transition-all duration-300 hover:scale-105 transform ${
                    theme === 'white'
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                      : theme === 'dark'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearForm}
                  variant="outline"
                  className={`transition-all duration-300 hover:scale-105 ${
                    theme === 'white'
                      ? 'border-teal-300 text-teal-700 hover:bg-teal-50'
                      : theme === 'dark'
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                      : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                  }`}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          {result && (
            <div className="space-y-6">
              <Card className={`backdrop-blur-md border-0 shadow-2xl animate-fade-in ${
                theme === 'white' 
                  ? 'bg-white/80' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80'
                  : 'bg-black/80'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    Your Macro Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Diet Type Info */}
                  <div className={`text-center p-4 rounded-lg ${
                    theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                  }`}>
                    <Badge className={`text-lg px-4 py-2 mb-2 ${
                      theme === 'white' ? 'bg-teal-100 text-teal-800' : 
                      theme === 'dark' ? 'bg-purple-900/50 text-purple-200' : 
                      'bg-green-900/50 text-green-200'
                    }`}>
                      {result.dietType.emoji} {result.dietType.title}
                    </Badge>
                    <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {result.dietType.description}
                    </p>
                  </div>

                  {/* Macro Numbers */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-red-50' : theme === 'dark' ? 'bg-red-900/20' : 'bg-red-900/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-red-600' : 'text-red-400'
                      }`}>
                        {result.macros.protein.grams}g
                      </div>
                      <div className={`text-sm mb-1 ${theme === 'white' ? 'text-red-700' : 'text-red-300'}`}>
                        Protein
                      </div>
                      <div className={`text-xs ${theme === 'white' ? 'text-red-600' : 'text-red-400'}`}>
                        {result.macros.protein.calories} cal ({result.macros.protein.percentage}%)
                      </div>
                      {result.weight && result.macros.protein.perKg && (
                        <div className={`text-xs mt-1 ${theme === 'white' ? 'text-red-500' : 'text-red-400'}`}>
                          {result.macros.protein.perKg}g/kg
                        </div>
                      )}
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        {result.macros.carbs.grams}g
                      </div>
                      <div className={`text-sm mb-1 ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                        Carbs
                      </div>
                      <div className={`text-xs ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                        {result.macros.carbs.calories} cal ({result.macros.carbs.percentage}%)
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${
                      theme === 'white' ? 'bg-yellow-50' : theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-900/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'
                      }`}>
                        {result.macros.fat.grams}g
                      </div>
                      <div className={`text-sm mb-1 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                        Fats
                      </div>
                      <div className={`text-xs ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'}`}>
                        {result.macros.fat.calories} cal ({result.macros.fat.percentage}%)
                      </div>
                    </div>
                  </div>

                  {/* Macro Bars */}
                  <div className="space-y-4">
                    <MacroBar 
                      macro="protein" 
                      percentage={result.macros.protein.percentage} 
                      color="bg-red-500" 
                    />
                    <MacroBar 
                      macro="carbs" 
                      percentage={result.macros.carbs.percentage} 
                      color="bg-blue-500" 
                    />
                    <MacroBar 
                      macro="fats" 
                      percentage={result.macros.fat.percentage} 
                      color="bg-yellow-500" 
                    />
                  </div>

                  {/* Meal Plan */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'white' ? 'bg-green-50' : theme === 'dark' ? 'bg-green-900/20' : 'bg-green-900/20'
                  }`}>
                    <h4 className={`font-medium mb-2 ${theme === 'white' ? 'text-green-900' : 'text-green-300'}`}>
                      Per Meal ({result.mealPlan.mealsPerDay} meals/day)
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Calories: {result.mealPlan.perMeal.calories}
                        </div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Protein: {result.mealPlan.perMeal.protein}g
                        </div>
                      </div>
                      <div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Carbs: {result.mealPlan.perMeal.carbs}g
                        </div>
                        <div className={`${theme === 'white' ? 'text-green-700' : 'text-green-300'}`}>
                          Fats: {result.mealPlan.perMeal.fat}g
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Food Suggestions */}
                  <div className="space-y-4">
                    <h4 className={`font-medium ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Food Suggestions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-red-50' : theme === 'dark' ? 'bg-red-900/20' : 'bg-red-900/20'
                      }`}>
                        <h5 className={`font-medium mb-2 ${theme === 'white' ? 'text-red-700' : 'text-red-300'}`}>
                          Protein Sources
                        </h5>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-red-600' : 'text-red-400'}`}>
                          {getFoodSuggestions('protein').slice(0, 4).map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-blue-50' : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-900/20'
                      }`}>
                        <h5 className={`font-medium mb-2 ${theme === 'white' ? 'text-blue-700' : 'text-blue-300'}`}>
                          Carb Sources
                        </h5>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-blue-600' : 'text-blue-400'}`}>
                          {getFoodSuggestions('carbs').slice(0, 4).map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === 'white' ? 'bg-yellow-50' : theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-900/20'
                      }`}>
                        <h5 className={`font-medium mb-2 ${theme === 'white' ? 'text-yellow-700' : 'text-yellow-300'}`}>
                          Fat Sources
                        </h5>
                        <ul className={`space-y-1 ${theme === 'white' ? 'text-yellow-600' : 'text-yellow-400'}`}>
                          {getFoodSuggestions('fat').slice(0, 4).map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                      Recommendations
                    </h3>
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-gray-50' : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/50'
                      }`}>
                        <h4 className={`font-medium mb-1 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {rec.title}
                        </h4>
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                          {rec.description}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {rec.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* PDF Download Button */}
                  <Button 
                    className={`w-full ${
                      theme === 'white'
                        ? 'bg-teal-600 hover:bg-teal-700'
                        : theme === 'dark'
                        ? 'bg-purple-600 hover:bg-purple-700'  
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => toast({ title: "PDF Generation", description: "Macros PDF report feature coming soon!" })}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MacrosPage;